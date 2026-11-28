#!/data/data/com.termux/files/usr/bin/bash
# TOOL:    home_lock.sh - Lock/unlock the Mi TV and give/stop study time on the kids' PC from a phone (Termux)
# FAMILY:  home-tools
# VERSION: 1.1.0
# DATE:    2026-11-28
# CHAT:    Mi TV clean interface and lock over same Wi-Fi
# CHANGES: 1.1.0 - public edition: settings block marked for each home; TV-only use without
#          FocusGuard (leave the PIN blank at setup and only the TV buttons are made)
#          1.0.0 - first version (replaces tv_lock.sh): TV goes through FocusGuard on the kids' PC
#          when it is on (keeps one lock state), direct adb when the PC is off; PC study time
#          give/stop/status via the FocusGuard parent PIN; home-screen widget buttons
# STATUS:  Usage: bash home_lock.sh setup | status | tv lock|unlock|status | pc give MIN [name] | pc stop [name] | pc status
__version__="1.1.0"

# ---- CHANGE THESE TWO LINES FOR YOUR HOME (reserve both IPs on the router) ----
TV="192.168.1.8:5555"                  # Android / Google TV address, adb port 5555
PC="192.168.1.22:8765"                 # kids' PC running FocusGuard (optional)
CONF="$HOME/.home_lock.conf"           # holds the parent PIN (readable by Termux only)
PIN=""
[ -f "$CONF" ] && . "$CONF"

# Video apps: paused (suspended) when locked; falls back to disable if suspend unsupported
APPS=(
  com.google.android.youtube.tv
  in.startv.hotstar
  com.sonyliv
  com.amazon.amazonvideo.livingroom
  com.graymatrix.did
  com.jio.media.stb.ondemand
  com.netflix.ninja
  com.mxtech.videoplayer.television
  com.mitv.videoplayer
  com.xiaomi.mitv.mediaexplorer
  com.android.vending
)

# Background services (casting / screen mirroring): always disabled when locked
SERVICES=(
  com.google.android.apps.mediashell
  com.xiaomi.mitv.smartshare
  com.mitv.milinkservice
  com.xiaomi.wfdsinkhelperservice
)

A() { adb -s "$TV" "$@"; }

connect() {
  adb connect "$TV" >/dev/null 2>&1
  if adb -s "$TV" get-state 2>&1 | grep -qi "unauthorized"; then
    echo "Look at the TV: tick 'Always allow' and press OK (waiting up to 60 s)..."
    for i in $(seq 1 20); do
      sleep 3
      [ "$(adb -s "$TV" get-state 2>/dev/null)" = "device" ] && break
    done
  fi
  if [ "$(adb -s "$TV" get-state 2>/dev/null)" != "device" ]; then
    echo "TV not reachable or not authorised ($TV)."
    echo "Check TV is on, same Wi-Fi, and accept 'Allow debugging' on TV."
    exit 1
  fi
}

installed() { A shell pm path "$1" >/dev/null 2>&1; }

tv_lock_direct() {
  echo "Locking TV..."
  for p in "${APPS[@]}"; do
    installed "$p" || { echo "  skip     $p"; continue; }
    A shell am force-stop "$p" >/dev/null 2>&1
    if A shell pm suspend "$p" 2>&1 | grep -q "state: true"; then
      echo "  paused   $p"
    else
      A shell pm disable-user --user 0 "$p" >/dev/null 2>&1 && echo "  disabled $p"
    fi
  done
  for p in "${SERVICES[@]}"; do
    installed "$p" || continue
    A shell am force-stop "$p" >/dev/null 2>&1
    A shell pm disable-user --user 0 "$p" >/dev/null 2>&1 && echo "  disabled $p"
  done
  A shell input keyevent KEYCODE_HOME
  echo "TV LOCKED"
}

tv_unlock_direct() {
  echo "Unlocking TV..."
  for p in "${APPS[@]}" "${SERVICES[@]}"; do
    installed "$p" || continue
    A shell pm unsuspend "$p" >/dev/null 2>&1
    A shell pm enable "$p" >/dev/null 2>&1
    echo "  open     $p"
  done
  echo "TV UNLOCKED"
}

tv_status_direct() {
  disabled=$(A shell pm list packages -d 2>/dev/null)
  n=0
  for p in "${APPS[@]}" "${SERVICES[@]}"; do
    installed "$p" || continue
    s="open"
    echo "$disabled" | grep -qx "package:$p" && s="LOCKED (disabled)"
    A shell dumpsys package "$p" 2>/dev/null | grep -q "suspended=true" && s="LOCKED (paused)"
    [ "$s" != "open" ] && n=$((n+1))
    printf "  %-40s %s\n" "$p" "$s"
  done
  [ $n -gt 0 ] && echo "TV is LOCKED ($n items)" || echo "TV is UNLOCKED"
}


# ---------------- FocusGuard on the kids' PC ----------------
TOKEN=""
api() {   # api METHOD PATH [JSON]
  if [ "$1" = GET ]; then
    curl -s -m 8 -H "X-FG-Token: $TOKEN" "http://$PC$2"
  else
    curl -s -m 8 -H "Content-Type: application/json" -H "X-FG-Token: $TOKEN" -d "$3" "http://$PC$2"
  fi
}
jget() { grep -o "\"$1\": *\"[^\"]*\"" | head -1 | sed 's/.*: *"\(.*\)"/\1/'; }

pc_login() {
  [ -n "$PIN" ] || return 1
  local p=${PIN//\\/\\\\}; p=${p//\"/\\\"}
  TOKEN=$(api POST /api/login "{\"password\": \"$p\"}" | jget token)
  [ -n "$TOKEN" ]
}

kids() { api GET /api/home | grep -o '"name": "[^"]*"' | sed 's/.*: "\(.*\)"/\1/'; }

pc_need() {
  pc_login && return 0
  echo "Kids' PC not reachable (is it on?) or wrong PIN - run: bash home_lock.sh setup"
  exit 1
}

pc_status() {
  local h; h=$(api GET /api/home)
  echo "$h" | grep -o '{"name": [^}]*}' | while read -r k; do
    n=$(echo "$k" | jget name)
    g=$(echo "$k" | grep -o '"grant_until": [0-9.]*' | sed 's/.*: //; s/\..*//')
    si=$(echo "$k" | grep -q '"signed_in": true' && echo "signed in" || echo "not signed in")
    if [ -n "$g" ] && [ "$g" -gt "$(date +%s)" ]; then
      echo "  PC  $n: $si - study time until $(date -d "@$g" +%H:%M)"
    else
      echo "  PC  $n: $si - no study time running"
    fi
  done
}

pc_give() {   # pc_give MINUTES [name]
  pc_need
  local m=$1 who=$2 n
  for n in $(kids); do
    if [ -z "$who" ] || [ "${n,,}" = "${who,,}" ]; then
      r=$(api POST /api/give "{\"user\": \"$n\", \"minutes\": $m}")
      if echo "$r" | grep -q '"ok": true'; then
        [ "$m" = 0 ] && echo "  PC  $n: study time stopped" || echo "  PC  $n: +$m min study time"
      else
        echo "  PC  $n: failed - $(echo "$r" | jget error)"
      fi
    fi
  done
}

# ---------------- TV: through the PC if it is on, else direct ----------------
tv_via_pc() {   # tv_via_pc lock|unlock|check  -> returns 1 if the PC can't do it
  pc_login || return 1
  api GET /api/home | grep -q '"enabled": true' || return 1
  r=$(api POST /api/tv "{\"op\": \"$1\"}")
  echo "$r" | grep -q '"ok": true' || { echo "  PC says: $(echo "$r" | jget error)"; return 1; }
  echo "TV: working through the kids' PC (30-60 s)..."
  for i in $(seq 1 60); do
    sleep 3
    h=$(api GET /api/home)
    echo "$h" | grep -q '"busy": ""' && break
  done
  tvp=$(echo "$h" | grep -o '"tv": {.*}')
  echo "TV is $(echo "$tvp" | jget state | tr a-z A-Z)  ($(echo "$tvp" | jget msg))"
  return 0
}

tv_cmd() {
  case "$1" in
    lock)   tv_via_pc lock   || { echo "PC is off - locking the TV directly";   connect; tv_lock_direct; } ;;
    unlock) tv_via_pc unlock || { echo "PC is off - unlocking the TV directly"; connect; tv_unlock_direct;
              echo "Note: if the PC last had the TV locked, tap Unlock again once the PC is on."; } ;;
    status) tv_via_pc check  || { connect; tv_status_direct; } ;;
    *) usage ;;
  esac
}

setup() {
  read -r -s -p "FocusGuard parent PIN (press Enter if you have no FocusGuard PC): " p; echo
  printf 'PIN=%q\n' "$p" > "$CONF"; chmod 600 "$CONF"
  PIN="$p"
  if [ -z "$PIN" ]; then echo "No PIN - TV-only mode"
  elif pc_login; then echo "PIN OK - connected to the kids' PC"; else echo "Could not sign in now (PC off or wrong PIN) - saved anyway"; fi
  mkdir -p ~/.shortcuts
  me="$(realpath "$0")"
  mk() { printf '#!/data/data/com.termux/files/usr/bin/bash\nbash "%s" %s\nsleep 5\n' "$me" "$2" > ~/.shortcuts/"$1"; chmod +x ~/.shortcuts/"$1"; }
  rm -f ~/.shortcuts/TV_Lock ~/.shortcuts/TV_Unlock ~/.shortcuts/TV_Status
  mk "1_TV_Lock"      "tv lock"
  mk "2_TV_Unlock"    "tv unlock"
  rm -f ~/.shortcuts/3_PC_Study_30 ~/.shortcuts/4_PC_Study_60 ~/.shortcuts/5_PC_Stop
  if [ -n "$PIN" ]; then
    mk "3_PC_Study_30"  "pc give 30"
    mk "4_PC_Study_60"  "pc give 60"
    mk "5_PC_Stop"      "pc stop"
  fi
  mk "6_Status"       "status"
  echo "Widget buttons made in ~/.shortcuts: $(ls ~/.shortcuts | tr '\n' ' ')"
  echo "Add the Termux:Widget widget to the home screen to use them."
}

usage() {
  echo "bash home_lock.sh setup | status"
  echo "                  tv lock | tv unlock | tv status"
  echo "                  pc give MIN [name] | pc stop [name] | pc status"
}

case "$1" in
  setup)  setup ;;
  status) tv_cmd status
          if [ -n "$PIN" ]; then if pc_login; then pc_status; else echo "  PC  off or not reachable"; fi; fi ;;
  tv)     tv_cmd "$2" ;;
  pc)     case "$2" in
            give)   [[ "$3" =~ ^[0-9]+$ ]] && [ "$3" -ge 1 ] && [ "$3" -le 600 ] || { echo "minutes 1-600"; exit 1; }
                    pc_give "$3" "$4" ;;
            stop)   pc_give 0 "$3" ;;
            status) pc_need; pc_status ;;
            *) usage ;;
          esac ;;
  *) usage ;;
esac
