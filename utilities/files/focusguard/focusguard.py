# =============================================================================
# TOOL    : FocusGuard - distraction blocker and screen-time limiter (service)
# FAMILY  : focusguard
# VERSION : 1.6.1
# DATE    : 2026-11-15
# CHAT    : Windows 11 distraction blocker and screen-time limiter
# CHANGES : 1.6.1 - TV pairing: keeps the adb connection open up to 60 s while the TV
#           shows 'Allow USB debugging?' (1.6.0 closed it at once, so the prompt vanished)
#           1.6.0 - simple home page (home.html) for phones: Lock/Unlock TV and
#           'give study time' per child; parent PIN login (home page only);
#           Mi TV video lock over Wi-Fi via adb (apps paused/disabled, casting
#           off, re-locked every 10 min while locked); full panel moved to
#           /admin; adb.exe/fastboot.exe closed for restricted users;
#           new 'pin' and 'tv' commands
#           1.5.0 - 'Online classes today' per account: class window (default
#           07:00-19:00) allowed in forced Study mode, not counted against the
#           daily limit, Windows sign-in opened for it; resets next day;
#           Meet/Zoom/Teams helper domains added to the study list
#           1.4.0 - Study mode is the default (existing configs switched once);
#           /api/mode for one-tap mode change; sign-out falls back to logoff.exe
#           and logs the Windows error when WTSLogoffSession fails
#           1.3.0 - opt-in LAN access to the admin panel (phone/laptop on the same
#           Wi-Fi) with IP allow-list + firewall rule ('lan on/off/status');
#           'extra time' grants that work outside the allowed hours and lift the
#           Windows logon-hours block while they last
#           1.2.0 - new 'music' block category (Spotify, JioSaavn, Gaana, Wynk...),
#           more game sites (Poki, Pokemon, now.gg, itch.io...), music players and
#           game launchers added to blocked programs; existing configs are upgraded
#           once with the new defaults (removals made later are kept)
#           1.1.0 - daily per-account reports (screen time, sites, blocked
#           attempts, apps closed, warnings/sign-outs) kept N days in
#           ProgramData\FocusGuard\reports; opt-in per account; /api/reports
#           1.0.3 - TLS trusts certifi bundle + Windows store (fixes
#           CERTIFICATE_VERIFY_FAILED on portable Python); adapter guard only
#           acts once armed by the installer AND upstream DoH is proven working;
#           background upstream probe; config file hot-reload; upstream errors
#           logged; new 'selftest', 'arm', 'disarm' commands
#           1.0.2 - fix adapter guard under pythonw (stdin=DEVNULL, full
#           System32 paths for powershell/ipconfig/net, error text logged)
#           1.0.1 - loads dnslib/psutil from a private lib folder next to this
#           file, so portable/embeddable Python (no venv, no pip) works
#           1.0.0 - first release: local DNS filter with DoH upstream, study
#           (whitelist) mode, SafeSearch, per-user time windows + daily limits
#           with warn/logoff, logon hours, VPN/portable-browser killer,
#           adapter DNS guard, password-protected admin API on 127.0.0.1:8765
# STATUS  : beta - Windows-specific parts need field testing on the target PC
# =============================================================================
"""FocusGuard service.

Runs as SYSTEM (scheduled task created by install.ps1). Subcommands:
    focusguard.py run                      start the service
    focusguard.py setup --user Kid         create config + admin password
    focusguard.py check youtube.com        show verdict for a domain
    focusguard.py passwd                   change admin password
    focusguard.py selftest                 test the upstream DNS-over-HTTPS servers
    focusguard.py arm | disarm             allow / stop the adapter DNS guard
    focusguard.py report-users A B ...     choose accounts included in reports
    focusguard.py lan on [IP|CIDR|subnet]  open the admin panel to the home Wi-Fi
    focusguard.py lan off | status         close it again / show the setting
    focusguard.py pin [--clear]            set / remove the parent PIN (home page only)
    focusguard.py tv on [IP:PORT] | off    turn TV control on / off
    focusguard.py tv status | lock | unlock  check or change the TV lock now
"""

__version__ = "1.6.1"

import argparse
import ctypes
import datetime as dt
import getpass
import hashlib
import hmac
import ipaddress
import http.client
import http.server
import json
import logging
import logging.handlers
import os
import queue
import re
import secrets
import socket
import socketserver
import ssl
import struct
import subprocess
import sys
import threading
import time
from collections import OrderedDict, deque
from pathlib import Path
from urllib.parse import urlparse

# Private library folder (filled by install.ps1) - works even with embeddable
# Python, whose ._pth file ignores PYTHONPATH and site-packages.
_LIB = os.path.join(os.path.dirname(os.path.abspath(__file__)), "lib")
if os.path.isdir(_LIB) and _LIB not in sys.path:
    sys.path.insert(0, _LIB)

try:
    from dnslib import AAAA, QTYPE, RCODE, RR, A, DNSRecord
except ImportError:  # pragma: no cover
    sys.exit("dnslib is missing - run: pip install dnslib")

try:
    import psutil
except ImportError:  # pragma: no cover
    psutil = None

IS_WIN = os.name == "nt"
PROG_DIR = Path(__file__).resolve().parent
DATA_DIR = Path(os.environ.get(
    "FG_DATA", r"C:\ProgramData\FocusGuard" if IS_WIN else str(PROG_DIR / "fg_data")))
CONFIG_PATH = DATA_DIR / "config.json"
USAGE_PATH = DATA_DIR / "usage.json"
LOG_PATH = DATA_DIR / "focusguard.log"
REPORT_DIR = DATA_DIR / "reports"

DNS_PORT = int(os.environ.get("FG_DNS_PORT", "53"))
DNS_HOSTS = [h.strip() for h in os.environ.get("FG_DNS_HOSTS", "127.0.0.1,::1").split(",") if h.strip()]
HTTP_PORT = int(os.environ.get("FG_HTTP_PORT", "8765"))

DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
NO_WINDOW = 0x08000000  # CREATE_NO_WINDOW

log = logging.getLogger("focusguard")

# -----------------------------------------------------------------------------
# Default lists
# -----------------------------------------------------------------------------
DEFAULT_BLOCKLISTS = {
    "video": {"enabled": True, "domains": [
        "youtube.com", "youtu.be", "youtube-nocookie.com", "youtubekids.com", "googlevideo.com",
        "ytimg.com", "yt3.ggpht.com", "youtubei.googleapis.com", "youtube.googleapis.com",
        "netflix.com", "nflxvideo.net", "nflximg.net", "nflxext.com", "primevideo.com",
        "aiv-cdn.net", "hotstar.com", "jiohotstar.com", "jiocinema.com", "zee5.com", "sonyliv.com",
        "mxplayer.in", "voot.com", "aha.video", "sunnxt.com", "erosnow.com", "vimeo.com",
        "vimeocdn.com", "dailymotion.com", "dmcdn.net", "twitch.tv", "ttvnw.net", "jtvnw.net",
        "kick.com", "rumble.com", "bilibili.com", "bilibili.tv", "crunchyroll.com"]},
    "social": {"enabled": True, "domains": [
        "instagram.com", "cdninstagram.com", "ig.me", "facebook.com", "fb.com", "fbcdn.net",
        "facebook.net", "fb.me", "messenger.com", "threads.net", "threads.com", "tiktok.com",
        "tiktokv.com", "tiktokcdn.com", "byteoversea.com", "ibytedtos.com", "snapchat.com",
        "sc-cdn.net", "twitter.com", "x.com", "twimg.com", "t.co", "reddit.com", "redd.it",
        "redditmedia.com", "redditstatic.com", "pinterest.com", "pinimg.com", "tumblr.com",
        "sharechat.com", "mojapp.in", "myjosh.in", "roposo.com", "discord.com", "discord.gg",
        "discordapp.com", "discordapp.net"]},
    "games": {"enabled": True, "domains": [
        "roblox.com", "rbxcdn.com", "epicgames.com", "fortnite.com", "steampowered.com",
        "steamcommunity.com", "steamstatic.com", "miniclip.com", "poki.com", "crazygames.com",
        "friv.com", "y8.com", "coolmathgames.com", "kongregate.com", "addictinggames.com",
        "krunker.io", "agar.io", "slither.io", "1v1.lol",
        "poki.io", "poki-gdn.com", "pokemon.com", "pokemonshowdown.com", "pokerogue.net",
        "pokemmo.com", "pokemon-gl.com", "pokeclicker.com", "gamezop.com", "mpl.live",
        "ludoking.com", "garena.com", "battlegroundsmobileindia.com", "itch.io", "itch.zone",
        "armorgames.com", "gamejolt.com", "newgrounds.com", "ngfiles.com", "silvergames.com",
        "kizi.com", "gameflare.com", "now.gg", "nowgg.lol", "nowgg.fun", "geforcenow.com",
        "minecraft.net", "minecraftservices.com", "classic.minecraft.net", "eaglercraft.com",
        "lagged.com", "gamepix.com", "gamedistribution.com", "html5games.com", "plays.org",
        "unblocked-games.com", "unblockedgames.com", "tbg95.com", "gameforge.com",
        "battle.net", "blizzard.com", "riotgames.com", "leagueoflegends.com",
        "playvalorant.com", "ea.com", "origin.com", "ubisoft.com", "xbox.com",
        "chess.com", "lichess.org", "subwaysurfers.com", "bitlife.com", "geometrydash.com",
        "cookieclicker.com", "orteil.dashnet.org", "slope-game.com", "retrogames.cc",
        "emulatorjs.org", "playretrogames.com", "happywheels.com"]},
    "music": {"enabled": True, "domains": [
        "spotify.com", "scdn.co", "spotifycdn.com", "spotifycdn.net", "spoti.fi",
        "jiosaavn.com", "saavn.com", "saavncdn.com", "gaana.com", "gaanacdn.com",
        "wynk.in", "wynkmusic.com", "hungama.com", "hungamacdn.com", "resso.com",
        "soundcloud.com", "sndcdn.com", "deezer.com", "dzcdn.net", "tidal.com",
        "pandora.com", "audiomack.com", "anghami.com", "raaga.com", "music.apple.com",
        "music.amazon.com", "music.amazon.in", "amazonmusic.com", "music.youtube.com",
        "napster.com", "last.fm", "bandcamp.com", "mixcloud.com", "tunein.com",
        "radio.garden", "onlineradiobox.com", "radiomirchi.com", "pagalworld.com",
        "pagalworld.pw", "pagalworld.mobi", "masstamilan.in", "masstamilan.dev",
        "isaimini.com", "starmusiq.com", "tamilwire.com", "djpunjab.com", "mr-jatt.com",
        "songspk.com", "smule.com", "starmaker.in", "shazam.com"]},
    "bypass": {"enabled": True, "domains": [
        "dns.google", "dns.google.com", "cloudflare-dns.com", "one.one.one.one",
        "doh.opendns.com", "dns.quad9.net", "nextdns.io", "dns.adguard.com", "dns.adguard-dns.com",
        "doh.cleanbrowsing.org", "dns.sb", "cloudflareclient.com", "torproject.org",
        "protonvpn.com", "windscribe.com", "psiphon.ca", "psiphon3.com", "hotspotshield.com",
        "tunnelbear.com", "nordvpn.com", "expressvpn.com", "surfshark.com", "hide.me",
        "hidemyass.com", "croxyproxy.com", "croxyproxy.rocks", "proxysite.com", "hidester.com",
        "kproxy.com", "4everproxy.com", "proxyium.com", "blockaway.net", "vpnbook.com",
        "ultrasurf.us", "lantern.io", "getlantern.org"]},
}

# Always resolvable, even in study (whitelist) mode - Windows, sign-in, certificates, updates.
ESSENTIAL_ALLOW = [
    "arpa", "local", "localhost", "msftconnecttest.com", "msftncsi.com", "microsoft.com",
    "windowsupdate.com", "windows.com", "windows.net", "live.com", "live.net",
    "microsoftonline.com", "msauth.net", "msftauth.net", "office.com", "office.net",
    "microsoft365.com", "msedge.net", "digicert.com", "lencr.org", "letsencrypt.org", "pki.goog",
    "globalsign.com", "globalsign.net", "sectigo.com", "usertrust.com", "comodoca.com",
    "amazontrust.com", "entrust.net", "identrust.com", "verisign.com", "mozilla.net",
    "mozilla.org", "mozilla.com", "firefox.com", "gvt1.com", "gvt2.com"]

DEFAULT_STUDY_ALLOW = [
    "google.com", "google.co.in", "gstatic.com", "googleapis.com", "googleusercontent.com",
    "bing.com", "duckduckgo.com", "wikipedia.org", "wikimedia.org", "wiktionary.org",
    "ncert.nic.in", "cbse.gov.in", "cbseacademic.nic.in", "diksha.gov.in", "nios.ac.in",
    "khanacademy.org", "kastatic.org", "kasandbox.org", "britannica.com", "desmos.com",
    "geogebra.org", "wolframalpha.com", "phet.colorado.edu", "nasa.gov", "isro.gov.in",
    "zoom.us", "zoom.com", "jsdelivr.net", "cloudflare.com", "cdnjs.cloudflare.com",
    # online classes: Google Meet / Classroom, Zoom, Teams
    "meet.google.com", "classroom.google.com", "meet.googleapis.com", "zoomgov.com",
    "zoomcdn.com", "zmcdn.com", "zoom.ai", "teams.microsoft.com", "teams.live.com",
    "skype.com", "skypeassets.com", "office.net", "sharepoint.com", "onedrive.com",
    "1drv.com", "live.net"]

DEFAULT_BLOCKED_PROCESSES = [
    "openvpn.exe", "openvpn-gui.exe", "protonvpn.exe", "windscribe.exe", "nordvpn.exe",
    "expressvpn.exe", "surfshark.exe", "psiphon3.exe", "psiphon.exe", "tor.exe",
    "hotspotshield.exe", "hsscp.exe", "tunnelbear.exe", "cyberghost.exe", "cloudflare warp.exe",
    "lantern.exe", "outline.exe", "v2rayn.exe", "v2ray.exe", "xray.exe", "clash.exe",
    "clash for windows.exe", "shadowsocks.exe", "sing-box.exe", "wireguard.exe",
    # music players / music apps
    "spotify.exe", "applemusic.exe", "itunes.exe", "amazon music.exe", "amazonmusic.exe",
    "deezer.exe", "tidal.exe", "jiosaavn.exe", "gaana.exe", "wynk.exe", "soundcloud.exe",
    "wmplayer.exe", "music.ui.exe", "microsoft.media.player.exe", "video.ui.exe",
    "vlc.exe", "winamp.exe", "aimp.exe", "foobar2000.exe", "musicbee.exe", "mediamonkey.exe",
    "potplayermini.exe", "potplayermini64.exe", "kmplayer.exe", "kmplayer64x.exe",
    "mpc-hc.exe", "mpc-hc64.exe", "mpc-be.exe", "mpc-be64.exe", "gom.exe", "smplayer.exe",
    "mpv.exe", "kodi.exe", "plex.exe", "audacious.exe", "dopamine.exe",
    # game launchers / games / android emulators
    "steam.exe", "epicgameslauncher.exe", "robloxplayerbeta.exe", "robloxplayerlauncher.exe",
    "roblox.exe", "minecraft.exe", "minecraftlauncher.exe", "minecraft.windows.exe",
    "battle.net.exe", "riotclientservices.exe", "leagueclient.exe",
    "valorant.exe", "eadesktop.exe", "origin.exe", "upc.exe", "ubisoftconnect.exe",
    "gog galaxy.exe", "galaxyclient.exe", "xboxapp.exe",
    "hd-player.exe", "bluestacks.exe", "ldplayer.exe", "dnplayer.exe", "nox.exe",
    "memu.exe", "gameloop.exe", "androidemulator.exe", "appmarket.exe",
    # Android debug tools (could unlock the TV)
    "adb.exe", "fastboot.exe"]

# Bump when DEFAULT_BLOCKLISTS / DEFAULT_BLOCKED_PROCESSES grow, so saved configs get them once.
DEFAULTS_VERSION = 5   # 3: study mode default; 4: class domains in study list; 5: adb.exe blocked

BROWSER_EXES = {
    "chrome.exe", "msedge.exe", "firefox.exe", "brave.exe", "opera.exe", "vivaldi.exe",
    "browser.exe", "waterfox.exe", "librewolf.exe", "chromium.exe", "thorium.exe", "floorp.exe",
    "palemoon.exe", "maxthon.exe", "ucbrowser.exe", "iridium.exe", "seamonkey.exe"}

SAFESEARCH = {
    "google.com": "forcesafesearch.google.com", "www.google.com": "forcesafesearch.google.com",
    "google.co.in": "forcesafesearch.google.com", "www.google.co.in": "forcesafesearch.google.com",
    "bing.com": "strict.bing.com", "www.bing.com": "strict.bing.com",
    "duckduckgo.com": "safe.duckduckgo.com", "www.duckduckgo.com": "safe.duckduckgo.com"}

FIREFOX_CANARY = "use-application-dns.net"


def default_user_time():
    wk = {"windows": ["16:00-20:30"], "minutes": 120}
    we = {"windows": ["09:00-12:30", "15:00-21:00"], "minutes": 180}
    return {
        "windows": {d: list((we if d in ("sat", "sun") else wk)["windows"]) for d in DAYS},
        "daily_minutes": {d: (we if d in ("sat", "sun") else wk)["minutes"] for d in DAYS},
    }


# Mi TV (Android TV) video lock, driven over Wi-Fi with adb
TV_APPS = [                                     # paused when locked (disabled if pausing fails)
    "com.google.android.youtube.tv", "in.startv.hotstar", "com.sonyliv",
    "com.amazon.amazonvideo.livingroom", "com.graymatrix.did", "com.jio.media.stb.ondemand",
    "com.netflix.ninja", "com.mxtech.videoplayer.television", "com.mitv.videoplayer",
    "com.xiaomi.mitv.mediaexplorer", "com.android.vending"]
TV_SERVICES = [                                 # casting / screen mirroring: disabled when locked
    "com.google.android.apps.mediashell", "com.xiaomi.mitv.smartshare",
    "com.mitv.milinkservice", "com.xiaomi.wfdsinkhelperservice"]
DEFAULT_TV = {"enabled": False, "address": "192.168.1.8:5555", "adb_path": "",
              "apps": TV_APPS, "services": TV_SERVICES}
TV_STATE_PATH = DATA_DIR / "tv.json"
ADB_PORT = int(os.environ.get("FG_ADB_PORT", "15037"))    # private adb server port, killed after use
TV_RELOCK_S = 600
_PKG_RE = re.compile(r"^[A-Za-z][A-Za-z0-9_]*(\.[A-Za-z0-9_]+)+$")
_ADDR_RE = re.compile(r"^[A-Za-z0-9.-]+:\d{1,5}$")

DEFAULT_CONFIG = {
    "version": 1,
    "admin_password_hash": "",
    "parent_pin_hash": "",             # optional PIN that opens the home page only ('pin' command)
    "restricted_users": [],
    "mode": "study",                  # study (whitelist only) | filter | off
    "filter_other_users": False,      # filter even when a non-restricted user is at the console
    "force_safesearch": True,
    "apply_logon_hours": True,
    "enforce_browser_paths": True,
    "warn_minutes": 5,
    "upstream_doh": ["https://1.1.1.1/dns-query", "https://1.0.0.1/dns-query"],
    "blocklists": DEFAULT_BLOCKLISTS,
    "custom_block": [],
    "custom_allow": [],
    "study_allow": DEFAULT_STUDY_ALLOW,
    "study_windows": {d: (["17:00-19:00"] if d not in ("sat", "sun") else []) for d in DAYS},
    "time": {},
    "allowed_browsers": ["chrome.exe", "msedge.exe", "firefox.exe"],
    "blocked_processes": DEFAULT_BLOCKED_PROCESSES,
    "dns_guard_armed": False,          # set by the installer after a passing self-test
    "report_users": [],                # accounts whose activity goes into Reports (opt-in)
    "report_days": 30,                 # how many days of reports to keep
    "defaults_version": DEFAULTS_VERSION,
    "lan_access": False,               # admin panel reachable from other devices (set by 'lan on')
    "lan_allow": [],                   # IPs / CIDRs / "subnet" allowed when lan_access is on
    "class_window": "07:00-19:00",     # hours given by the 'Online classes today' button
    "tv": DEFAULT_TV,                  # TV lock settings (changed only by the 'tv' command)
}

# -----------------------------------------------------------------------------
# Helpers
# -----------------------------------------------------------------------------
_DOMAIN_RE = re.compile(r"^[a-z0-9_]([a-z0-9_.-]*[a-z0-9_])?$")
_WIN_RE = re.compile(r"^\s*(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})\s*$")


def norm_domain(d):
    d = str(d).strip().lower()
    d = re.sub(r"^[a-z]+://", "", d)
    d = d.split("/")[0].split(":")[0]
    while d.startswith("*.") or d.startswith("."):
        d = d[2:] if d.startswith("*.") else d[1:]
    d = d.rstrip(".")
    if not d or not _DOMAIN_RE.match(d) or ".." in d:
        raise ValueError(f"bad domain: {d!r}")
    return d


def norm_domains(items):
    out, seen = [], set()
    for x in items or []:
        if not str(x).strip():
            continue
        d = norm_domain(x)
        if d not in seen:
            seen.add(d)
            out.append(d)
    return out


def domain_in(qname, dset):
    """True if qname or any parent domain is in dset."""
    parts = qname.split(".")
    for i in range(len(parts)):
        if ".".join(parts[i:]) in dset:
            return True
    return False


def parse_window(w):
    m = _WIN_RE.match(str(w))
    if not m:
        raise ValueError(f"bad time window {w!r} (use HH:MM-HH:MM)")
    h1, m1, h2, m2 = map(int, m.groups())
    s, e = h1 * 60 + m1, h2 * 60 + m2
    if m1 > 59 or m2 > 59 or s >= e or e > 1440:
        raise ValueError(f"bad time window {w!r} (start < end, end <= 24:00, no overnight)")
    return s, e


def fmt_window(s, e):
    return f"{s // 60:02d}:{s % 60:02d}-{e // 60:02d}:{e % 60:02d}"


def minute_of_day(now):
    return now.hour * 60 + now.minute + now.second / 60.0


def in_windows(windows, now):
    m = minute_of_day(now)
    return any(s <= m < e for s, e in (parse_window(w) for w in windows))


def minutes_left(ucfg, used_s, bonus_min, now, grant_until=0.0, class_window=None):
    """Minutes the user may still use the PC right now (float, may be <= 0; inf if unlimited).
    An extra-time grant (epoch seconds) allows use until then, even outside the windows.
    class_window ("HH:MM-HH:MM") is an online-class block for today: free use inside it."""
    normal = _normal_left(ucfg, used_s, bonus_min, now)
    if grant_until:
        normal = max(normal, (grant_until - now.timestamp()) / 60.0)
    normal = max(normal, class_left(class_window, now))
    return normal


def class_left(class_window, now):
    """Minutes left in today's class block (0 outside it)."""
    if not class_window:
        return 0.0
    s0, e0 = parse_window(class_window)
    m = minute_of_day(now)
    return (e0 - m) if s0 <= m < e0 else 0.0


def _normal_left(ucfg, used_s, bonus_min, now):
    day = DAYS[now.weekday()]
    m = minute_of_day(now)
    win_left = 0.0
    for w in ucfg.get("windows", {}).get(day, []):
        s, e = parse_window(w)
        if s <= m < e:
            win_left = max(win_left, e - m)
    limit = ucfg.get("daily_minutes", {}).get(day)
    lim_left = float("inf") if limit is None else limit + bonus_min - used_s / 60.0
    return min(win_left, lim_left)


def hash_password(pw, salt=None, rounds=200_000):
    salt = salt or secrets.token_bytes(16)
    h = hashlib.pbkdf2_hmac("sha256", pw.encode(), salt, rounds)
    return f"pbkdf2_sha256${rounds}${salt.hex()}${h.hex()}"


def check_password(pw, stored):
    try:
        _, rounds, salt, h = stored.split("$")
        calc = hashlib.pbkdf2_hmac("sha256", pw.encode(), bytes.fromhex(salt), int(rounds))
        return hmac.compare_digest(calc.hex(), h)
    except Exception:
        return False


def valid_lan_entry(x):
    if x.lower() == "subnet":
        return True
    try:
        ipaddress.ip_network(x, strict=False)
        return True
    except ValueError:
        return False


def local_ipv4_networks():
    """[(address, network)] for this PC's real IPv4 interfaces."""
    out = []
    if psutil is None:
        return out
    try:
        for addrs in psutil.net_if_addrs().values():
            for a in addrs:
                if a.family == socket.AF_INET and a.address and a.netmask:
                    ip = ipaddress.ip_address(a.address)
                    if ip.is_loopback or ip.is_link_local:
                        continue
                    out.append((a.address, ipaddress.ip_network(f"{a.address}/{a.netmask}", strict=False)))
    except Exception:
        pass
    return out


def lan_client_allowed(client_ip, cfg):
    try:
        ip = ipaddress.ip_address(client_ip)
    except ValueError:
        return False
    if getattr(ip, "ipv4_mapped", None):
        ip = ip.ipv4_mapped
    if ip.is_loopback:
        return True
    if not cfg.get("lan_access"):
        return False
    for entry in cfg.get("lan_allow", []):
        if entry.lower() == "subnet":
            if any(ip in net for _, net in local_ipv4_networks()):
                return True
        else:
            try:
                if ip in ipaddress.ip_network(entry, strict=False):
                    return True
            except ValueError:
                continue
    return False


def sys_exe(name):
    """Full path to a Windows system tool (SYSTEM's PATH can't be trusted under pythonw)."""
    if not IS_WIN:
        return name
    root = os.environ.get("SystemRoot", r"C:\Windows")
    sub = {"powershell": r"System32\WindowsPowerShell\v1.0\powershell.exe",
           "ipconfig": r"System32\ipconfig.exe", "net": r"System32\net.exe",
           "logoff": r"System32\logoff.exe"}.get(name)
    path = os.path.join(root, sub) if sub else name
    return path if os.path.exists(path) else name


def run_quiet(args, timeout=60):
    args = [sys_exe(args[0])] + list(args[1:])
    kw = {"capture_output": True, "text": True, "timeout": timeout,
          "stdin": subprocess.DEVNULL}       # pythonw has no valid stdin handle
    if IS_WIN:
        kw["creationflags"] = NO_WINDOW
    try:
        r = subprocess.run(args, **kw)
        return r.returncode, (r.stdout or "") + (r.stderr or "")
    except Exception as e:
        return -1, f"{type(e).__name__}: {e}"


def flush_dns():
    if IS_WIN:
        run_quiet(["ipconfig", "/flushdns"], timeout=20)


def write_json_atomic(path, obj):
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(json.dumps(obj, indent=2), encoding="utf-8")
    os.replace(tmp, path)


# -----------------------------------------------------------------------------
# Config
# -----------------------------------------------------------------------------
def sanitize_config(new, old=None):
    """Validate an incoming config dict. Raises ValueError with a readable message."""
    old = old or DEFAULT_CONFIG
    c = json.loads(json.dumps(DEFAULT_CONFIG))
    c["admin_password_hash"] = old.get("admin_password_hash", "")
    c["parent_pin_hash"] = old.get("parent_pin_hash", "")      # only the 'pin' command sets it

    c["restricted_users"] = [str(u).strip() for u in new.get("restricted_users", old.get("restricted_users", [])) if str(u).strip()]
    mode = new.get("mode", old.get("mode", "study"))
    if mode not in ("filter", "study", "off"):
        raise ValueError("mode must be filter, study or off")
    c["mode"] = mode
    for k in ("filter_other_users", "force_safesearch", "apply_logon_hours", "enforce_browser_paths"):
        c[k] = bool(new.get(k, DEFAULT_CONFIG[k]))
    c["warn_minutes"] = max(1, min(30, int(new.get("warn_minutes", 5))))

    ups = [str(u).strip() for u in new.get("upstream_doh", DEFAULT_CONFIG["upstream_doh"]) if str(u).strip()]
    for u in ups:
        if not u.startswith("https://"):
            raise ValueError(f"upstream must be https:// DoH URL: {u}")
    c["upstream_doh"] = ups or DEFAULT_CONFIG["upstream_doh"]

    bl = {}
    for name, lst in (new.get("blocklists", DEFAULT_BLOCKLISTS) or {}).items():
        name = re.sub(r"[^a-z0-9_-]", "", str(name).lower())[:30]
        if name:
            bl[name] = {"enabled": bool(lst.get("enabled", True)), "domains": norm_domains(lst.get("domains", []))}
    c["blocklists"] = bl
    for k in ("custom_block", "custom_allow", "study_allow"):
        c[k] = norm_domains(new.get(k, DEFAULT_CONFIG[k]))

    def clean_windows(d):
        out = {}
        for day in DAYS:
            ws = [w for w in (d or {}).get(day, []) if str(w).strip()]
            out[day] = [fmt_window(*parse_window(w)) for w in ws]
        return out

    c["study_windows"] = clean_windows(new.get("study_windows"))

    t = {}
    for user, u in (new.get("time") or {}).items():
        user = str(user).strip().lower()
        if not user:
            continue
        dm = {}
        for day in DAYS:
            v = (u.get("daily_minutes") or {}).get(day)
            dm[day] = None if v in (None, "") else max(0, min(1440, int(v)))
        t[user] = {"windows": clean_windows(u.get("windows")), "daily_minutes": dm}
    c["time"] = t

    c["allowed_browsers"] = [str(x).strip().lower() for x in new.get("allowed_browsers", DEFAULT_CONFIG["allowed_browsers"]) if str(x).strip()]
    c["blocked_processes"] = [str(x).strip().lower() for x in new.get("blocked_processes", DEFAULT_BLOCKED_PROCESSES) if str(x).strip()]
    c["dns_guard_armed"] = bool(old.get("dns_guard_armed", False))   # not editable from the panel
    ru = new.get("report_users", old.get("report_users", []))
    restricted_lc = {u.lower() for u in c["restricted_users"]}
    c["report_users"] = [str(u).strip() for u in ru if str(u).strip().lower() in restricted_lc]
    c["report_days"] = max(1, min(365, int(new.get("report_days", old.get("report_days", 30)))))
    c["defaults_version"] = int(old.get("defaults_version", 1)) if old is not DEFAULT_CONFIG else DEFAULTS_VERSION
    # LAN settings are only changed by the 'lan' command on the PC itself, never from the panel
    c["lan_access"] = bool(old.get("lan_access", False))
    c["lan_allow"] = [x for x in (str(v).strip() for v in old.get("lan_allow", [])) if valid_lan_entry(x)]
    cw = str(new.get("class_window", old.get("class_window", "07:00-19:00"))).strip()
    c["class_window"] = fmt_window(*parse_window(cw))
    c["tv"] = clean_tv(old.get("tv", DEFAULT_TV))              # only the 'tv' command changes it
    return c


def clean_tv(t):
    t = t if isinstance(t, dict) else {}
    addr = str(t.get("address", DEFAULT_TV["address"])).strip()
    pk = lambda xs: [x for x in (str(v).strip() for v in xs) if _PKG_RE.match(x)]
    return {"enabled": bool(t.get("enabled", False)),
            "address": addr if _ADDR_RE.match(addr) else DEFAULT_TV["address"],
            "adb_path": str(t.get("adb_path", "")).strip(),
            "apps": pk(t.get("apps", TV_APPS)), "services": pk(t.get("services", TV_SERVICES))}


def upgrade_defaults(cfg):
    """Add new default categories/domains/programs to an older saved config (once)."""
    cfg = json.loads(json.dumps(cfg))
    for name, lst in DEFAULT_BLOCKLISTS.items():
        cur = cfg["blocklists"].setdefault(name, {"enabled": lst["enabled"], "domains": []})
        have = set(cur["domains"])
        cur["domains"] += [d for d in lst["domains"] if d not in have]
    have = set(cfg["blocked_processes"])
    cfg["blocked_processes"] += [p for p in DEFAULT_BLOCKED_PROCESSES if p not in have]
    if cfg.get("defaults_version", 1) < 3:
        cfg["mode"] = "study"
    have = set(cfg.get("study_allow", []))
    cfg["study_allow"] = cfg.get("study_allow", []) + [d for d in DEFAULT_STUDY_ALLOW if d not in have]
    cfg["defaults_version"] = DEFAULTS_VERSION
    log.info("config upgraded to defaults v%d (new block lists / programs added)", DEFAULTS_VERSION)
    return cfg


class ConfigStore:
    def __init__(self, path=CONFIG_PATH):
        self.path = path
        self.lock = threading.Lock()
        self.listeners = []
        self.cfg = self._load()
        self.mtime = self._mtime()

    def _mtime(self):
        try:
            return self.path.stat().st_mtime
        except OSError:
            return 0

    def maybe_reload(self):
        """Pick up edits made by 'focusguard.py setup/arm' while the service runs."""
        m = self._mtime()
        if m and m != self.mtime:
            self.mtime = m
            try:
                cfg = self._load()
            except Exception:
                log.exception("config reload failed")
                return
            with self.lock:
                self.cfg = cfg
            log.info("config file changed - reloaded")
            for fn in self.listeners:
                try:
                    fn(cfg)
                except Exception:
                    log.exception("config listener failed")

    def _load(self):
        if self.path.exists():
            raw = json.loads(self.path.read_text(encoding="utf-8"))
            try:
                cfg = sanitize_config(raw, raw)
                if cfg.get("defaults_version", 1) < DEFAULTS_VERSION:
                    cfg = upgrade_defaults(cfg)
                    try:
                        write_json_atomic(self.path, cfg)
                    except OSError:
                        pass
                return cfg
            except ValueError as e:
                log.error("config invalid (%s) - using defaults with saved password", e)
                return sanitize_config(DEFAULT_CONFIG, raw)
        return sanitize_config(DEFAULT_CONFIG)

    def get(self):
        with self.lock:
            return self.cfg

    def save(self, new_cfg):
        with self.lock:
            write_json_atomic(self.path, new_cfg)
            self.cfg = new_cfg
            self.mtime = self._mtime()
        for fn in self.listeners:
            try:
                fn(new_cfg)
            except Exception:
                log.exception("config listener failed")


# -----------------------------------------------------------------------------
# Usage (per-day seconds used and bonus minutes)
# -----------------------------------------------------------------------------
class UsageStore:
    def __init__(self, path=USAGE_PATH):
        self.path = path
        self.lock = threading.Lock()
        self.data = {}
        self._dirty_at = 0
        try:
            self.data = json.loads(path.read_text(encoding="utf-8"))
        except Exception:
            pass
        self._roll()

    def _roll(self):
        today = dt.date.today().isoformat()
        if self.data.get("date") != today:
            grants = {u: t for u, t in self.data.get("grants", {}).items() if t > time.time()}
            self.data = {"date": today, "users": {}, "grants": grants}
        self.data.setdefault("grants", {})

    def grant_until(self, user):
        with self.lock:
            self._roll()
            t = self.data["grants"].get(user.lower(), 0.0)
            return t if t > time.time() else 0.0

    def active_grants(self):
        with self.lock:
            self._roll()
            now = time.time()
            return {u for u, t in self.data["grants"].items() if t > now}

    def class_today(self, user):
        with self.lock:
            self._roll()
            return user.lower() in self.data.get("classes", [])

    def classes_today(self):
        with self.lock:
            self._roll()
            return set(self.data.get("classes", []))

    def set_class(self, user, on):
        with self.lock:
            self._roll()
            cl = set(self.data.get("classes", []))
            (cl.add if on else cl.discard)(user.lower())
            self.data["classes"] = sorted(cl)
        self.flush(force=True)

    def add_grant(self, user, minutes):
        """minutes > 0 adds extra time from now (or from the end of a running grant); 0 cancels."""
        with self.lock:
            self._roll()
            g = self.data["grants"]
            if minutes <= 0:
                g.pop(user.lower(), None)
                until = 0.0
            else:
                until = max(time.time(), g.get(user.lower(), 0.0)) + minutes * 60
                g[user.lower()] = until
        self.flush(force=True)
        return until

    def get(self, user):
        with self.lock:
            self._roll()
            u = self.data["users"].get(user.lower(), {})
            return u.get("used_s", 0.0), u.get("bonus_min", 0)

    def _u(self, user):
        return self.data["users"].setdefault(user.lower(), {"used_s": 0.0, "bonus_min": 0})

    def add_seconds(self, user, s):
        with self.lock:
            self._roll()
            self._u(user)["used_s"] += s
        self.flush()

    def add_bonus(self, user, m):
        with self.lock:
            self._roll()
            self._u(user)["bonus_min"] += int(m)
        self.flush(force=True)

    def reset(self, user):
        with self.lock:
            self._roll()
            self.data["users"].pop(user.lower(), None)
        self.flush(force=True)

    def flush(self, force=False):
        now = time.time()
        if force or now - self._dirty_at > 30:
            self._dirty_at = now
            with self.lock:
                try:
                    write_json_atomic(self.path, self.data)
                except Exception:
                    log.exception("usage save failed")


# -----------------------------------------------------------------------------
# Reports (opt-in, per account, one JSON file per day)
# -----------------------------------------------------------------------------
REPORT_NOISE = set(ESSENTIAL_ALLOW) | {
    "googleapis.com", "gstatic.com", "googleusercontent.com", "ggpht.com", "gvt1.com", "gvt2.com",
    "doubleclick.net", "googlesyndication.com", "googleadservices.com", "google-analytics.com",
    "googletagmanager.com", "googletagservices.com", "app-measurement.com", "crashlytics.com",
    "akamai.net", "akamaized.net", "akamaiedge.net", "akadns.net", "edgekey.net", "edgesuite.net",
    "cloudfront.net", "fastly.net", "fastly-edge.com", "cloudflare.net", "azureedge.net",
    "azurefd.net", "trafficmanager.net", "footprintdns.com", "aria.microsoft.com", "bing.net",
    "skype.com", "msn.com", "office.com", "sfx.ms", "onedrive.com", "s-microsoft.com",
    "msedge.net", "edgecdn.net", "adobe.io", "adobedtm.com", "scorecardresearch.com",
    "amazon-adsystem.com", "adnxs.com", "criteo.com", "taboola.com", "outbrain.com", "hotjar.com",
    "jsdelivr.net", "cdnjs.cloudflare.com", "unpkg.com", "fonts.net", "typekit.net",
    "nvidia.com", "intel.com", "amd.com", "dell.com", "hp.com", "lenovo.com", "realtek.com",
    "avast.com", "avg.com", "kaspersky.com", "mcafee.com", "norton.com", "quickheal.com",
    "apple.com", "icloud.com", "mozilla.net", "mozilla.org", "firefox.com"}
_SLD = {"co", "com", "net", "org", "gov", "ac", "edu", "nic", "res", "gen", "firm", "ind", "mil"}


def site_of(qname):
    """www.en.wikipedia.org -> wikipedia.org ; abc.gov.in -> abc.gov.in"""
    parts = [p for p in qname.split(".") if p]
    if len(parts) <= 2:
        return ".".join(parts)
    if parts[-2] in _SLD and len(parts[-1]) == 2:
        return ".".join(parts[-3:])
    return ".".join(parts[-2:])


def _blank_user_report():
    return {"seconds": 0.0, "sites": {}, "blocked": {}, "apps": {}, "warnings": 0, "logoffs": 0,
            "first": None, "last": None}


class ReportStore:
    MAX_DOMAINS = 400

    def __init__(self, cfgstore, folder=REPORT_DIR):
        self.cfgstore = cfgstore
        self.folder = folder
        self.lock = threading.Lock()
        self.day = None
        self.data = {}
        self.recent = {}            # (user, site) -> last count time, to de-duplicate bursts
        self.saved_at = 0.0
        self._open_today()

    # -- helpers ---------------------------------------------------------------
    def enabled_for(self, user):
        if not user:
            return False
        return user.lower() in {u.lower() for u in self.cfgstore.get().get("report_users", [])}

    def _path(self, day):
        return self.folder / f"{day}.json"

    def _open_today(self):
        today = dt.date.today().isoformat()
        if today == self.day:
            return
        if self.day:
            self._save_locked()
        self.day = today
        self.recent.clear()
        try:
            self.data = json.loads(self._path(today).read_text(encoding="utf-8")).get("users", {})
        except Exception:
            self.data = {}
        self._prune()

    def _prune(self):
        keep = self.cfgstore.get().get("report_days", 30)
        cutoff = (dt.date.today() - dt.timedelta(days=keep)).isoformat()
        try:
            for f in self.folder.glob("*.json"):
                if f.stem < cutoff:
                    f.unlink()
        except OSError:
            pass

    def _u(self, user):
        now = time.strftime("%H:%M")
        r = self.data.setdefault(user.lower(), _blank_user_report())
        r["first"] = r["first"] or now
        r["last"] = now
        return r

    @staticmethod
    def _bump(d, key, cap):
        if key in d or len(d) < cap:
            d[key] = d.get(key, 0) + 1

    # -- recorders (cheap; called from DNS / controller threads) -----------------
    def dns(self, user, qname, verdict):
        if verdict == "nx" or not self.enabled_for(user):
            return
        site = site_of(qname)
        if verdict == "block":
            with self.lock:
                self._open_today()
                self._bump(self._u(user)["blocked"], site, self.MAX_DOMAINS)
            return
        if site in REPORT_NOISE or domain_in(qname, REPORT_NOISE) or "." not in site:
            return
        key, t = (user.lower(), site), time.time()
        if t - self.recent.get(key, 0) < 60:          # count at most once a minute per site
            return
        self.recent[key] = t
        with self.lock:
            self._open_today()
            self._bump(self._u(user)["sites"], site, self.MAX_DOMAINS)

    def seconds(self, user, s):
        if self.enabled_for(user):
            with self.lock:
                self._open_today()
                self._u(user)["seconds"] += s

    def app_closed(self, user, exe):
        if self.enabled_for(user):
            with self.lock:
                self._open_today()
                self._bump(self._u(user)["apps"], exe, 100)

    def count(self, user, field):
        if self.enabled_for(user):
            with self.lock:
                self._open_today()
                self._u(user)[field] += 1

    # -- persistence -------------------------------------------------------------
    def _save_locked(self):
        if self.day and self.data:
            try:
                write_json_atomic(self._path(self.day), {"date": self.day, "users": self.data})
            except Exception:
                log.exception("report save failed")

    def save(self, force=False):
        if force or time.time() - self.saved_at > 60:
            self.saved_at = time.time()
            with self.lock:
                self._open_today()
                self._save_locked()

    def load(self, days):
        """Last `days` days, newest first: [{date, users:{...}}]"""
        self.save(force=True)
        out = []
        for i in range(max(1, min(366, int(days)))):
            d = (dt.date.today() - dt.timedelta(days=i)).isoformat()
            try:
                out.append(json.loads(self._path(d).read_text(encoding="utf-8")))
            except Exception:
                out.append({"date": d, "users": {}})
        return out


# -----------------------------------------------------------------------------
# Shared runtime state
# -----------------------------------------------------------------------------
class State:
    def __init__(self):
        self.policy = "filter"          # fail closed until the first tick
        self.paused_until = 0.0
        self.console_user = None
        self.events = deque(maxlen=300)
        self.blocked = OrderedDict()    # domain -> {count, last, policy}
        self.queries = 0
        self.blocked_count = 0
        self.upstream_ok = 0.0
        self.upstream_err = ""
        self.lock = threading.Lock()

    def event(self, kind, msg):
        self.events.append({"t": time.time(), "kind": kind, "msg": msg})
        log.info("[%s] %s", kind, msg)

    def record_block(self, domain, policy):
        with self.lock:
            self.blocked_count += 1
            b = self.blocked.pop(domain, {"count": 0})
            b.update(count=b["count"] + 1, last=time.time(), policy=policy)
            self.blocked[domain] = b
            while len(self.blocked) > 1000:
                self.blocked.popitem(last=False)


# -----------------------------------------------------------------------------
# DNS
# -----------------------------------------------------------------------------
def make_tls_context():
    """Default context (Windows root store) plus the certifi bundle when present.
    Portable Pythons often see an incomplete Windows store -> CERTIFICATE_VERIFY_FAILED."""
    ctx = ssl.create_default_context()
    try:
        import certifi
        ctx.load_verify_locations(cafile=certifi.where())
    except Exception:
        pass
    return ctx


class DoHClient:
    def __init__(self):
        self.ctx = make_tls_context()
        self.pools = {}
        self.lock = threading.Lock()

    def _pool(self, host):
        with self.lock:
            return self.pools.setdefault(host, queue.LifoQueue())

    def query(self, url, wire):
        u = urlparse(url)
        pool = self._pool(u.netloc)
        for attempt in range(2):
            try:
                conn = pool.get_nowait() if attempt == 0 else None
            except queue.Empty:
                conn = None
            if conn is None:
                conn = http.client.HTTPSConnection(u.netloc, timeout=4, context=self.ctx)
            try:
                conn.request("POST", u.path or "/dns-query", body=wire, headers={
                    "Content-Type": "application/dns-message", "Accept": "application/dns-message"})
                r = conn.getresponse()
                body = r.read()
                if r.status != 200:
                    raise IOError(f"HTTP {r.status}")
                pool.put(conn)
                return body
            except Exception:
                conn.close()
                if attempt == 1:
                    raise
        raise IOError("unreachable")


class DNSEngine:
    def __init__(self, state, upstream_fn=None):
        self.state = state
        self.doh = DoHClient()
        self.upstream_fn = upstream_fn      # test hook: fn(wire) -> wire
        self.reporter = None
        self.block_set = set()
        self.allow_set = set()
        self.study_set = set(ESSENTIAL_ALLOW)
        self.upstreams = []
        self.safesearch = True

    def reload(self, cfg):
        block = set(cfg["custom_block"])
        for lst in cfg["blocklists"].values():
            if lst["enabled"]:
                block.update(lst["domains"])
        self.block_set = block
        self.allow_set = set(cfg["custom_allow"])
        self.study_set = set(cfg["study_allow"]) | set(ESSENTIAL_ALLOW) | self.allow_set
        self.upstreams = list(cfg["upstream_doh"])
        self.safesearch = cfg["force_safesearch"]

    def decide(self, qname, policy):
        if qname == FIREFOX_CANARY or qname.endswith("." + FIREFOX_CANARY):
            return "nx"
        if policy == "off":
            return "pass"
        if domain_in(qname, self.allow_set):
            return "pass"
        if domain_in(qname, self.block_set):
            return "block"
        if policy == "study" and not domain_in(qname, self.study_set):
            return "block"
        return "pass"

    def forward(self, wire):
        if self.upstream_fn:
            return self.upstream_fn(wire)
        buf = bytearray(wire)
        orig_id = bytes(buf[0:2])
        buf[0:2] = b"\x00\x00"              # RFC 8484: id 0 for cache friendliness
        last = None
        for url in self.upstreams:
            try:
                resp = bytearray(self.doh.query(url, bytes(buf)))
                resp[0:2] = orig_id
                self.state.upstream_ok = time.time()
                return bytes(resp)
            except Exception as e:
                last = e
        self.state.upstream_err = f"{time.strftime('%H:%M:%S')} {last}"
        if time.time() - getattr(self, "_err_logged", 0) > 60:
            self._err_logged = time.time()
            self.state.event("upstream", f"DoH lookup failed: {last}")
        raise IOError(f"all upstreams failed: {last}")

    def probe(self):
        """One real upstream lookup; returns (ok, message)."""
        try:
            ans = DNSRecord.parse(self.forward(DNSRecord.question("www.msftconnecttest.com", "A").pack()))
            ips = [str(r.rdata) for r in ans.rr if r.rtype == QTYPE.A]
            return True, ", ".join(ips) or "answered (no A records)"
        except Exception as e:
            return False, str(e)

    def handle(self, data, udp=False):
        try:
            req = DNSRecord.parse(data)
            q = req.q
        except Exception:
            return b""
        qname = str(q.qname).rstrip(".").lower()
        qtype = q.qtype
        policy = self.state.policy
        self.state.queries += 1
        verdict = self.decide(qname, policy)
        if self.reporter is not None:
            try:
                self.reporter.dns(self.state.console_user, qname, verdict)
            except Exception:
                log.debug("report dns failed", exc_info=True)
        try:
            if verdict == "nx":
                reply = req.reply()
                reply.header.rcode = RCODE.NXDOMAIN
                resp = reply.pack()
            elif verdict == "block":
                reply = req.reply()
                if qtype == QTYPE.A:
                    reply.add_answer(RR(q.qname, QTYPE.A, rdata=A("0.0.0.0"), ttl=10))
                elif qtype == QTYPE.AAAA:
                    reply.add_answer(RR(q.qname, QTYPE.AAAA, rdata=AAAA("::"), ttl=10))
                self.state.record_block(qname, policy)
                resp = reply.pack()
            elif policy != "off" and self.safesearch and qname in SAFESEARCH and qtype in (QTYPE.A, QTYPE.AAAA):
                resp = self._safesearch(req, SAFESEARCH[qname])
            else:
                resp = self.forward(data)
        except Exception as e:
            log.debug("resolve %s failed: %s", qname, e)
            reply = req.reply()
            reply.header.rcode = RCODE.SERVFAIL
            resp = reply.pack()
        if udp:
            limit = 512
            for rr in req.ar:
                if rr.rtype == QTYPE.OPT:
                    limit = max(512, rr.rclass)
            if len(resp) > limit:
                reply = req.reply()
                reply.header.tc = 1
                resp = reply.pack()
        return resp

    def _safesearch(self, req, target):
        qtype = req.q.qtype
        sub = DNSRecord.question(target, QTYPE[qtype])
        ans = DNSRecord.parse(self.forward(sub.pack()))
        reply = req.reply()
        for rr in ans.rr:
            if rr.rtype == qtype:
                reply.add_answer(RR(req.q.qname, qtype, rdata=rr.rdata, ttl=min(rr.ttl, 300)))
        return reply.pack()


class _UDPHandler(socketserver.BaseRequestHandler):
    def handle(self):
        data, sock = self.request
        resp = self.server.engine.handle(data, udp=True)
        if resp:
            sock.sendto(resp, self.client_address)


class _TCPHandler(socketserver.BaseRequestHandler):
    def _recv(self, n):
        buf = b""
        while len(buf) < n:
            chunk = self.request.recv(n - len(buf))
            if not chunk:
                return None
            buf += chunk
        return buf

    def handle(self):
        self.request.settimeout(10)
        try:
            while True:
                hdr = self._recv(2)
                if not hdr:
                    return
                data = self._recv(struct.unpack("!H", hdr)[0])
                if data is None:
                    return
                resp = self.server.engine.handle(data)
                self.request.sendall(struct.pack("!H", len(resp)) + resp)
        except (socket.timeout, OSError):
            return


def make_dns_server(kind, host, port, engine):
    fam = socket.AF_INET6 if ":" in host else socket.AF_INET
    base = socketserver.UDPServer if kind == "udp" else socketserver.TCPServer
    handler = _UDPHandler if kind == "udp" else _TCPHandler
    cls = type(f"FG{kind}{fam}", (socketserver.ThreadingMixIn, base),
               {"address_family": fam, "daemon_threads": True, "allow_reuse_address": False})
    srv = cls((host, port), handler)
    srv.engine = engine
    return srv


# -----------------------------------------------------------------------------
# Windows sessions (WTS API)
# -----------------------------------------------------------------------------
class Session:
    def __init__(self, sid, user, active, locked):
        self.sid, self.user, self.active, self.locked = sid, user, active, locked


if IS_WIN:
    from ctypes import wintypes

    _wts = ctypes.WinDLL("wtsapi32", use_last_error=True)
    _k32 = ctypes.WinDLL("kernel32", use_last_error=True)

    class _WTS_SESSION_INFOW(ctypes.Structure):
        _fields_ = [("SessionId", wintypes.DWORD), ("pWinStationName", wintypes.LPWSTR),
                    ("State", ctypes.c_int)]

    class _WTSINFOEX_LEVEL1_W(ctypes.Structure):
        _fields_ = [("SessionId", wintypes.ULONG), ("SessionState", ctypes.c_int),
                    ("SessionFlags", wintypes.LONG), ("WinStationName", wintypes.WCHAR * 33),
                    ("UserName", wintypes.WCHAR * 21), ("DomainName", wintypes.WCHAR * 18),
                    ("LogonTime", ctypes.c_longlong), ("ConnectTime", ctypes.c_longlong),
                    ("DisconnectTime", ctypes.c_longlong), ("LastInputTime", ctypes.c_longlong),
                    ("CurrentTime", ctypes.c_longlong), ("IncomingBytes", wintypes.DWORD),
                    ("OutgoingBytes", wintypes.DWORD), ("IncomingFrames", wintypes.DWORD),
                    ("OutgoingFrames", wintypes.DWORD), ("IncomingCompressedBytes", wintypes.DWORD),
                    ("OutgoingCompressedBytes", wintypes.DWORD)]

    class _WTSINFOEX_LEVEL_W(ctypes.Union):
        _fields_ = [("Level1", _WTSINFOEX_LEVEL1_W)]

    class _WTSINFOEXW(ctypes.Structure):
        _fields_ = [("Level", wintypes.DWORD), ("Data", _WTSINFOEX_LEVEL_W)]

    _wts.WTSSendMessageW.argtypes = [wintypes.HANDLE, wintypes.DWORD, wintypes.LPWSTR, wintypes.DWORD,
                                     wintypes.LPWSTR, wintypes.DWORD, wintypes.DWORD, wintypes.DWORD,
                                     ctypes.POINTER(wintypes.DWORD), wintypes.BOOL]
    _wts.WTSLogoffSession.argtypes = [wintypes.HANDLE, wintypes.DWORD, wintypes.BOOL]
    _k32.WTSGetActiveConsoleSessionId.restype = wintypes.DWORD


def wts_sessions():
    if not IS_WIN:
        return []
    out = []
    ptr = ctypes.POINTER(_WTS_SESSION_INFOW)()
    count = wintypes.DWORD()
    if not _wts.WTSEnumerateSessionsW(None, 0, 1, ctypes.byref(ptr), ctypes.byref(count)):
        return out
    try:
        for i in range(count.value):
            sid, state = ptr[i].SessionId, ptr[i].State
            buf, n = ctypes.c_void_p(), wintypes.DWORD()
            if not _wts.WTSQuerySessionInformationW(None, sid, 25, ctypes.byref(buf), ctypes.byref(n)):
                continue
            try:
                info = ctypes.cast(buf, ctypes.POINTER(_WTSINFOEXW)).contents.Data.Level1
                user, flags = info.UserName, info.SessionFlags
            finally:
                _wts.WTSFreeMemory(buf)
            if user:
                # state 0 = WTSActive; SessionFlags 0 = locked, 1 = unlocked (Win10+)
                out.append(Session(sid, user, state == 0, flags == 0))
    finally:
        _wts.WTSFreeMemory(ptr)
    return out


def console_user(sessions):
    if not IS_WIN:
        return os.environ.get("FG_FAKE_CONSOLE_USER")
    sid = _k32.WTSGetActiveConsoleSessionId()
    for s in sessions:
        if s.sid == sid:
            return s.user
    return None


def wts_message(sid, text, timeout=60):
    if not IS_WIN:
        log.info("MSG to session %s: %s", sid, text)
        return
    title = "FocusGuard"
    resp = wintypes.DWORD()
    style = 0x30 | 0x1000 | 0x10000          # MB_ICONWARNING | MB_SYSTEMMODAL | MB_SETFOREGROUND
    _wts.WTSSendMessageW(None, sid, title, len(title) * 2, text, len(text) * 2, style, timeout,
                         ctypes.byref(resp), False)


def wts_logoff(sid):
    """Sign a session out. Returns (ok, detail)."""
    if not IS_WIN:
        log.info("LOGOFF session %s", sid)
        return True, "test"
    if _wts.WTSLogoffSession(None, sid, False):
        return True, "WTSLogoffSession"
    err = ctypes.get_last_error()
    rc, out = run_quiet(["logoff", str(sid)], timeout=30)
    if rc == 0:
        return True, f"logoff.exe (WTSLogoffSession error {err})"
    return False, f"WTSLogoffSession error {err}; logoff.exe rc={rc} {' '.join(out.split())[:150]}"


# -----------------------------------------------------------------------------
# Logon hours (net user /times) - hour granularity, so windows are rounded outward
# -----------------------------------------------------------------------------
_NET_DAYS = {"mon": "M", "tue": "T", "wed": "W", "thu": "Th", "fri": "F", "sat": "Sa", "sun": "Su"}


def logon_hour_ranges(ucfg):
    """{day: [(start_hour, end_hour), ...]} merged, hour granular."""
    out = {}
    for day in DAYS:
        hrs = sorted((s // 60, -(-e // 60)) for s, e in (parse_window(w) for w in ucfg["windows"].get(day, [])))
        merged = []
        for s, e in hrs:
            if merged and s <= merged[-1][1]:
                merged[-1] = (merged[-1][0], max(merged[-1][1], e))
            else:
                merged.append((s, e))
        out[day] = merged
    return out


def net_times_strings(ucfg):
    """Return candidate /times values (24h first, 12h fallback)."""
    ranges = logon_hour_ranges(ucfg)
    if all(r == [(0, 24)] for r in ranges.values()):
        return ["all"]

    def h12(h):
        h %= 24
        return "12AM" if h == 0 else "12PM" if h == 12 else f"{h}AM" if h < 12 else f"{h - 12}PM"

    s24 = ";".join(f"{_NET_DAYS[d]},{s:02d}:00-{e:02d}:00" for d in DAYS for s, e in ranges[d])
    s12 = ";".join(f"{_NET_DAYS[d]},{h12(s)}-{h12(e)}" for d in DAYS for s, e in ranges[d])
    return [s24, s12]          # empty string = never allowed to sign in


# -----------------------------------------------------------------------------
# Controller (policy, time limits, process guard, adapter guard)
# -----------------------------------------------------------------------------
class Controller:
    def __init__(self, cfgstore, usage, state, engine):
        self.cfgstore, self.usage, self.state, self.engine = cfgstore, usage, state, engine
        self.reporter = None
        self.tracks = {}            # sid -> {"warned": bool, "deadline": float|None}
        self.kill_seen = {}
        self.next_proc = 0.0
        self.next_adapter = 0.0
        self.adapter_backoff = 15.0

    # ---- policy -------------------------------------------------------------
    def in_class(self, cfg, user, now):
        return bool(user and self.usage and self.usage.class_today(user)
                    and class_left(cfg.get("class_window"), now) > 0)

    def compute_policy(self, cfg, now, cuser):
        if time.time() < self.state.paused_until:
            return "off"
        if self.in_class(cfg, cuser, now):
            return "study"                      # class hours: whitelist only, whatever the mode
        if cfg["mode"] == "off":
            return "off"
        restricted = {u.lower() for u in cfg["restricted_users"]}
        if cuser and cuser.lower() not in restricted and not cfg["filter_other_users"]:
            return "off"
        if cfg["mode"] == "study":
            return "study"
        day = DAYS[now.weekday()]
        if in_windows(cfg["study_windows"].get(day, []), now):
            return "study"
        return "filter"

    def _maybe_probe(self):
        t = time.time()
        if t - self.state.upstream_ok > 240 and t >= getattr(self, "next_probe", 0) and not getattr(self, "probing", False):
            self.next_probe = t + 60
            self.probing = True

            def run():
                try:
                    self.engine.probe()
                finally:
                    self.probing = False
            threading.Thread(target=run, daemon=True, name="probe").start()

    def tick(self, dt_s):
        self.cfgstore.maybe_reload()
        if self.reporter:
            self.reporter.save()
        self._maybe_probe()
        cfg = self.cfgstore.get()
        now = dt.datetime.now()
        sessions = wts_sessions()
        cuser = console_user(sessions)
        self.state.console_user = cuser
        pol = self.compute_policy(cfg, now, cuser)
        if pol != self.state.policy:
            self.state.event("policy", f"{self.state.policy} -> {pol} (console: {cuser or 'none'})")
            self.state.policy = pol
            flush_dns()
        paused = time.time() < self.state.paused_until
        key = ((frozenset(self.usage.active_grants()), frozenset(self.usage.classes_today()),
                dt.date.today()) if self.usage else None)
        if key != getattr(self, "_logon_key", None):
            first = not hasattr(self, "_logon_key")
            self._logon_key = key
            if not first:                       # startup already applies logon hours once
                threading.Thread(target=self.apply_logon_hours, args=(cfg,), daemon=True).start()
        self.enforce_time(cfg, sessions, now, dt_s, paused)
        t = time.time()
        if t >= self.next_proc:
            self.next_proc = t + 3
            if not paused:
                self.enforce_processes(cfg)
        if t >= self.next_adapter:
            self.guard_adapters()

    # ---- time limits ---------------------------------------------------------
    def enforce_time(self, cfg, sessions, now, dt_s, paused):
        restricted = {u.lower() for u in cfg["restricted_users"]}
        seen = set()
        warn = cfg["warn_minutes"]
        for s in sessions:
            u = s.user.lower()
            if u not in restricted:
                continue
            seen.add(s.sid)
            if s.active and not s.locked:
                if not self.in_class(cfg, u, now):      # class time does not use up the daily limit
                    self.usage.add_seconds(u, dt_s)
                if self.reporter:
                    self.reporter.seconds(s.user, dt_s)
            ucfg = cfg["time"].get(u)
            tr = self.tracks.setdefault(s.sid, {"warned": False, "deadline": None})
            if paused or not ucfg:
                tr.update(warned=False, deadline=None)
                continue
            used, bonus = self.usage.get(u)
            cw = cfg.get("class_window") if self.usage.class_today(u) else None
            left = minutes_left(ucfg, used, bonus, now, self.usage.grant_until(u), cw)
            if left > warn:
                if tr["deadline"]:
                    self.state.event("time", f"{s.user}: time extended, logoff cancelled")
                tr.update(warned=False, deadline=None)
            elif left > 0:
                if tr["deadline"]:
                    tr["deadline"] = None
                if not tr["warned"] and s.active and not s.locked:
                    wts_message(s.sid, f"{int(left) + 1} minute(s) of computer time left.\nPlease save your work.", 30)
                    self.state.event("warn", f"{s.user}: {left:.1f} min left")
                    if self.reporter:
                        self.reporter.count(s.user, "warnings")
                    tr["warned"] = True
            else:
                if not tr["deadline"]:
                    grace = 60 if (s.active and not s.locked) else 0
                    tr["deadline"] = time.time() + grace
                    if grace:
                        wts_message(s.sid, "Computer time is over.\nYou will be signed out in 1 minute.", 55)
                    self.state.event("time", f"{s.user}: time over, logoff in {grace}s")
                elif time.time() >= tr["deadline"]:
                    ok, detail = wts_logoff(s.sid)
                    self.state.event("logoff", f"{s.user} (session {s.sid}) signed out: "
                                               f"{'ok' if ok else 'FAILED'} [{detail}]")
                    if self.reporter and ok:
                        self.reporter.count(s.user, "logoffs")
                    tr["deadline"] = time.time() + 30      # retry later if it failed
        for sid in list(self.tracks):
            if sid not in seen:
                del self.tracks[sid]

    # ---- processes -----------------------------------------------------------
    def enforce_processes(self, cfg):
        if psutil is None:
            return
        restricted = {u.lower() for u in cfg["restricted_users"]}
        blocked = set(cfg["blocked_processes"])
        allowed_browsers = set(cfg["allowed_browsers"])
        roots = [os.environ.get(k, "").lower() for k in ("ProgramFiles", "ProgramFiles(x86)", "SystemRoot")]
        roots = [r.rstrip("\\") + "\\" for r in roots if r]
        for p in psutil.process_iter(["pid", "name", "exe", "username"]):
            try:
                user = (p.info.get("username") or "").split("\\")[-1].lower()
                if user not in restricted:
                    continue
                name = (p.info.get("name") or "").lower()
                reason = None
                if name in blocked:
                    reason = "blocked app"
                elif name in BROWSER_EXES:
                    if name not in allowed_browsers:
                        reason = "unapproved browser"
                    elif cfg["enforce_browser_paths"]:
                        exe = (p.info.get("exe") or "").lower()
                        if exe and not any(exe.startswith(r) for r in roots):
                            reason = f"portable browser ({exe})"
                if reason:
                    p.kill()
                    if self.reporter:
                        self.reporter.app_closed(user, name)
                    key = (user, name)
                    if time.time() - self.kill_seen.get(key, 0) > 60:
                        self.kill_seen[key] = time.time()
                        self.state.event("kill", f"{user}: {name} - {reason}")
            except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
                continue

    # ---- adapter DNS guard -----------------------------------------------------
    def _dns_settings_ok(self):
        import winreg
        checks = [(r"SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces", "127.0.0.1"),
                  (r"SYSTEM\CurrentControlSet\Services\Tcpip6\Parameters\Interfaces", "::1")]
        for base, want in checks:
            try:
                root = winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, base)
            except OSError:
                continue
            i = 0
            while True:
                try:
                    sub = winreg.EnumKey(root, i)
                except OSError:
                    break
                i += 1
                try:
                    k = winreg.OpenKey(root, sub)
                except OSError:
                    continue

                def val(name):
                    try:
                        return str(winreg.QueryValueEx(k, name)[0]).strip()
                    except OSError:
                        return ""
                static, dhcp = val("NameServer"), val("DhcpNameServer")
                servers = [x for x in re.split(r"[ ,]+", static) if x]
                if (static or dhcp) and servers[:1] != [want]:
                    return False
                if static and any(x not in ("127.0.0.1", "::1") for x in servers):
                    return False
        return True

    def guard_adapters(self):
        if not IS_WIN:
            self.next_adapter = time.time() + 3600
            return
        self.next_adapter = time.time() + 15
        # Never point the PC at ourselves unless the installer armed us AND we can
        # actually resolve names - otherwise we would cut the internet off.
        if not self.cfgstore.get().get("dns_guard_armed"):
            return
        if time.time() - self.state.upstream_ok > 600:
            if not getattr(self, "_guard_hold_logged", False):
                self._guard_hold_logged = True
                self.state.event("dns-fix", "adapter guard on hold - upstream DoH not working")
            return
        self._guard_hold_logged = False
        try:
            ok = self._dns_settings_ok()
        except Exception:
            log.exception("dns check failed")
            ok = False
        if ok:
            self.adapter_backoff = 15.0
            return
        ps = ("Get-NetAdapter -IncludeHidden -ErrorAction SilentlyContinue | ForEach-Object { "
              "try { Set-DnsClientServerAddress -InterfaceIndex $_.ifIndex "
              "-ServerAddresses ('127.0.0.1','::1') -ErrorAction Stop } catch {} }; Clear-DnsClientCache")
        rc, out = run_quiet(["powershell", "-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-Command", ps])
        msg = f"adapter DNS reset to 127.0.0.1/::1 (rc={rc})"
        if rc != 0:
            msg += " - " + " ".join(out.split())[:300]
        self.state.event("dns-fix", msg)
        self.next_adapter = time.time() + self.adapter_backoff
        self.adapter_backoff = min(self.adapter_backoff * 2, 300)

    # ---- logon hours -----------------------------------------------------------
    def apply_logon_hours(self, cfg):
        if not IS_WIN:
            return
        granted = self.usage.active_grants() if self.usage else set()
        classes = self.usage.classes_today() if self.usage else set()
        today = DAYS[dt.date.today().weekday()]
        for user in cfg["restricted_users"]:
            ucfg = cfg["time"].get(user.lower())
            if ucfg and user.lower() in classes:   # open today's sign-in hours for the class block
                ucfg = json.loads(json.dumps(ucfg))
                ucfg["windows"][today] = ucfg["windows"].get(today, []) + [cfg.get("class_window", "07:00-19:00")]
            limited = cfg["apply_logon_hours"] and ucfg and user.lower() not in granted
            cands = net_times_strings(ucfg) if limited else ["all"]
            for c in dict.fromkeys(cands):
                rc, out = run_quiet(["net", "user", user, f"/times:{c}"])
                if rc == 0:
                    self.state.event("logon-hours", f"{user}: /times:{c}")
                    break
            else:
                self.state.event("error", f"net user {user} /times failed: {out.strip()[:200]}")


# -----------------------------------------------------------------------------
# TV lock (Android TV over Wi-Fi, adb)
# -----------------------------------------------------------------------------
class TVControl:
    """Locks / unlocks video apps on the TV. One job at a time, run in a thread.

    The adb key lives in ProgramData\\FocusGuard\\adb (SYSTEM + Administrators only) and the
    adb server runs on a private port and is killed after every job, so a child's account
    cannot reuse it."""

    def __init__(self, cfgstore, state):
        self.cfgstore, self.state = cfgstore, state
        self.lock = threading.Lock()
        self.busy = ""
        self.info = {"state": "unknown", "msg": "", "at": 0.0, "locked": [], "open": []}
        self.want = ""
        self.verbose = False
        self.last_auto = time.time()
        try:
            self.want = json.loads(TV_STATE_PATH.read_text(encoding="utf-8")).get("want", "")
        except Exception:
            pass

    def cfg(self):
        return self.cfgstore.get().get("tv", DEFAULT_TV)

    def adb_path(self):
        return self.cfg().get("adb_path") or str(DATA_DIR / "platform-tools" / "adb.exe")

    def _adb(self, args, timeout=60, capture=True):
        home = DATA_DIR / "adb"
        (home / ".android").mkdir(parents=True, exist_ok=True)
        env = dict(os.environ, ANDROID_SDK_HOME=str(home), ANDROID_USER_HOME=str(home / ".android"))
        kw = {"timeout": timeout, "stdin": subprocess.DEVNULL, "env": env}
        if capture:
            kw.update(capture_output=True, text=True)
        else:                                   # server start: no pipes for the daemon to inherit
            kw.update(stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        if IS_WIN:
            kw["creationflags"] = NO_WINDOW
        try:
            r = subprocess.run([self.adb_path(), "-P", str(ADB_PORT)] + list(args), **kw)
            return r.returncode, ((r.stdout or "") + (r.stderr or "")) if capture else ""
        except subprocess.TimeoutExpired:
            return -1, "adb timed out"
        except Exception as e:
            return -1, f"{type(e).__name__}: {e}"

    def _script(self, op, home=True):
        t = self.cfg()
        apps, svcs = " ".join(t["apps"]), " ".join(t["services"])
        if op == "lock":
            return ("for p in " + apps + "; do pm path $p >/dev/null 2>&1 || continue; "
                    "am force-stop $p; if pm suspend $p 2>&1 | grep -q 'state: true'; then echo \"P $p\"; "
                    "else pm disable-user --user 0 $p >/dev/null 2>&1 && echo \"D $p\"; fi; done; "
                    "for p in " + svcs + "; do pm path $p >/dev/null 2>&1 || continue; am force-stop $p; "
                    "pm disable-user --user 0 $p >/dev/null 2>&1 && echo \"D $p\"; done; "
                    + ("input keyevent KEYCODE_HOME; " if home else "") + "echo FG_DONE")
        if op == "unlock":
            return ("for p in " + apps + " " + svcs + "; do pm path $p >/dev/null 2>&1 || continue; "
                    "pm unsuspend $p >/dev/null 2>&1; pm enable $p >/dev/null 2>&1; done; echo FG_DONE")
        return ("d=$(pm list packages -d); for p in " + apps + " " + svcs + "; do "
                "if ! pm path $p >/dev/null 2>&1; then echo \"N $p\"; "
                "elif dumpsys package $p | grep -q 'suspended=true'; then echo \"L $p\"; "
                "elif echo \"$d\" | grep -qx \"package:$p\"; then echo \"L $p\"; "
                "else echo \"O $p\"; fi; done; echo FG_DONE")

    def _save_want(self, want):
        self.want = want
        try:
            write_json_atomic(TV_STATE_PATH, {"want": want, "at": time.time()})
        except Exception:
            log.exception("tv state save failed")

    def run(self, op, who="", auto=False):
        """op: lock | unlock | check. Returns (ok, message). Blocks until done."""
        if op in ("lock", "unlock") and not auto:
            self._save_want("locked" if op == "lock" else "unlocked")
        with self.lock:
            self.busy = op
            try:
                if not os.path.isfile(self.adb_path()):
                    raise RuntimeError(f"adb.exe not found at {self.adb_path()}")
                addr = self.cfg()["address"]
                self._adb(["start-server"], 30, capture=False)
                _, out = self._adb(["connect", addr], 30)
                _, st = self._adb(["-s", addr, "get-state"], 20)
                both = (out + " " + st).lower()
                if ("unauthorized" in both or "authenticate" in both) and not auto:
                    self.info = dict(self.info, msg="Allow this PC on the TV: tick 'Always allow' and press OK",
                                     at=time.time())
                    if self.verbose:
                        print("Look at the TV now: tick 'Always allow' and press OK (waiting up to 60 s)...",
                              flush=True)
                    for _ in range(20):
                        time.sleep(3)
                        _, st = self._adb(["-s", addr, "get-state"], 20)
                        if st.strip() == "device":
                            break
                        if "offline" in st or "not found" in st:
                            self._adb(["connect", addr], 30)
                    both = st.lower()
                if "unauthorized" in both or "authenticate" in both:
                    raise RuntimeError("the TV is asking to allow this PC - press OK on the TV "
                                       "(tick 'Always allow'), then try again")
                if st.strip() != "device":
                    raise RuntimeError(f"TV not reachable at {addr} - is it switched on?")
                if op in ("lock", "unlock"):
                    _, out = self._adb(["-s", addr, "shell", self._script(op, home=not auto)], 240)
                    if "FG_DONE" not in out:
                        raise RuntimeError("TV did not finish: " + out.strip()[-200:])
                _, out = self._adb(["-s", addr, "shell", self._script("check")], 120)
                if "FG_DONE" not in out:
                    raise RuntimeError("TV status check failed: " + out.strip()[-200:])
                locked = [l[2:].strip() for l in out.splitlines() if l.startswith("L ")]
                opened = [l[2:].strip() for l in out.splitlines() if l.startswith("O ")]
                stt = "locked" if locked and not opened else "unlocked" if opened and not locked else \
                      "partly locked" if locked else "unknown"
                msg = {"lock": "TV locked", "unlock": "TV unlocked", "check": "TV checked"}[op]
                self.info = {"state": stt, "msg": msg, "at": time.time(), "locked": locked, "open": opened}
                if op != "check" and not auto:
                    self.state.event("tv", f"{msg} ({who})" if who else msg)
                return True, msg
            except Exception as e:
                self.info = dict(self.info, msg=str(e), at=time.time())
                if not auto:
                    self.state.event("tv", f"{op} failed: {e}")
                return False, str(e)
            finally:
                self._adb(["kill-server"], 15)
                self.busy = ""

    def start(self, op, who=""):
        if op not in ("lock", "unlock", "check"):
            raise ValueError("op must be lock, unlock or check")
        if not self.cfg().get("enabled"):
            raise ValueError("TV control is off - run 'focusguard.py tv on' on the PC")
        if self.busy:
            raise ValueError(f"TV is busy ({self.busy}) - wait a moment")
        self.busy = op
        threading.Thread(target=self.run, args=(op, who), daemon=True, name="tv").start()

    def tick(self):
        """While the TV should be locked, lock it again every 10 minutes (catches a TV that was
        off at lock time, or apps switched back on from the TV's own Settings)."""
        if (self.want == "locked" and self.cfg().get("enabled") and not self.busy
                and time.time() - self.last_auto > TV_RELOCK_S):
            self.last_auto = time.time()
            self.busy = "lock"
            threading.Thread(target=self.run, args=("lock", "", True), daemon=True, name="tv-auto").start()

    def public(self):
        t = self.cfg()
        return dict(self.info, enabled=bool(t.get("enabled")), busy=self.busy, want=self.want,
                    address=t.get("address", ""))


# -----------------------------------------------------------------------------
# Admin web API (127.0.0.1 only)
# -----------------------------------------------------------------------------
class AdminApp:
    def __init__(self, cfgstore, usage, state, engine, controller):
        self.cfgstore, self.usage, self.state, self.engine, self.ctl = cfgstore, usage, state, engine, controller
        self.reporter = getattr(controller, "reporter", None)
        self.tv = None
        self.tokens = {}                # token -> (expiry, role)  role: admin | parent
        self.fails = 0
        self.lock_until = 0.0

    def auth(self, token, need="admin"):
        exp, role = self.tokens.get(token or "", (0, ""))
        if exp > time.time() and (role == "admin" or role == need):
            self.tokens[token] = (time.time() + 1800, role)
            return role
        return None

    def login(self, pw):
        if time.time() < self.lock_until:
            raise PermissionError(f"too many attempts - wait {int(self.lock_until - time.time())} s")
        cfg = self.cfgstore.get()
        role = ("admin" if check_password(pw, cfg["admin_password_hash"]) else
                "parent" if cfg.get("parent_pin_hash") and check_password(pw, cfg["parent_pin_hash"]) else "")
        if role:
            self.fails = 0
            tok = secrets.token_urlsafe(24)
            self.tokens[tok] = (time.time() + 1800, role)
            return tok, role
        self.fails += 1
        self.state.event("login-fail", f"wrong admin password ({self.fails})")
        if self.fails >= 5:
            self.lock_until = time.time() + 300
            self.fails = 0
        raise PermissionError("wrong password")

    def status(self):
        cfg = self.cfgstore.get()
        now = dt.datetime.now()
        day = DAYS[now.weekday()]
        sessions = wts_sessions()
        users = []
        for u in cfg["restricted_users"]:
            ucfg = cfg["time"].get(u.lower())
            used, bonus = self.usage.get(u)
            grant = self.usage.grant_until(u)
            cls = self.usage.class_today(u)
            left = minutes_left(ucfg, used, bonus, now, grant, cfg["class_window"] if cls else None) if ucfg else None
            users.append({
                "class_today": cls, "class_window": cfg["class_window"],
                "grant_until": grant,
                "name": u, "used_min": round(used / 60, 1), "bonus_min": bonus,
                "left_min": None if left is None or left == float("inf") else round(max(left, 0), 1),
                "limit_today": ucfg["daily_minutes"][day] if ucfg else None,
                "windows_today": ucfg["windows"][day] if ucfg else [],
                "signed_in": any(s.user.lower() == u.lower() for s in sessions),
            })
        with self.state.lock:
            blocked = [dict(domain=d, **v) for d, v in reversed(self.state.blocked.items())][:300]
        return {
            "version": __version__, "policy": self.state.policy, "mode": cfg["mode"],
            "paused_until": self.state.paused_until if self.state.paused_until > time.time() else 0,
            "console_user": self.state.console_user, "queries": self.state.queries,
            "blocked_count": self.state.blocked_count, "upstream_ok": self.state.upstream_ok,
            "upstream_err": self.state.upstream_err, "users": users,
            "events": list(reversed(self.state.events))[:150], "blocked": blocked, "now": time.time(),
            "lan_access": cfg.get("lan_access", False), "lan_allow": cfg.get("lan_allow", []),
            "lan_urls": [f"http://{a}:{HTTP_PORT}/" for a, _ in local_ipv4_networks()],
            "hostname": socket.gethostname(),
        }

    def home(self, role):
        """Small status for the home page (parents' phones)."""
        cfg = self.cfgstore.get()
        now = dt.datetime.now()
        sessions = wts_sessions()
        kids = []
        for u in cfg["restricted_users"]:
            ucfg = cfg["time"].get(u.lower())
            used, bonus = self.usage.get(u)
            grant = self.usage.grant_until(u)
            cls = self.usage.class_today(u)
            left = minutes_left(ucfg, used, bonus, now, grant, cfg["class_window"] if cls else None) if ucfg else None
            kids.append({"name": u, "signed_in": any(s.user.lower() == u.lower() for s in sessions),
                         "grant_until": grant, "class_today": cls,
                         "left_min": None if left is None or left == float("inf") else round(max(left, 0), 1)})
        return {"version": __version__, "role": role, "mode": cfg["mode"], "kids": kids,
                "tv": self.tv.public() if self.tv else {"enabled": False}, "now": time.time()}

    def give_study_time(self, user, minutes, who):
        names = {u.lower(): u for u in self.cfgstore.get()["restricted_users"]}
        if str(user).lower() not in names:
            raise ValueError("unknown child account")
        user = names[str(user).lower()]
        m = max(0, min(600, int(minutes)))
        until = self.usage.add_grant(user, m)
        if m and self.cfgstore.get()["mode"] != "study":
            self.set_mode("study")              # given time is study time - never free time
        self.state.event("grant", f"{user}: study time stopped ({who})" if not until else
                         f"{user}: +{m} min study time, until "
                         f"{time.strftime('%H:%M', time.localtime(until))} ({who})")
        return until

    def public_config(self):
        c = dict(self.cfgstore.get())
        c.pop("admin_password_hash", None)
        c.pop("parent_pin_hash", None)
        return c

    def save_config(self, new):
        old = self.cfgstore.get()
        clean = sanitize_config(new, old)
        self.cfgstore.save(clean)
        self.state.event("config", "configuration saved")

    def quick_list(self, action, domain):
        d = norm_domain(domain)
        cfg = json.loads(json.dumps(self.cfgstore.get()))
        key = {"allow": "custom_allow", "block": "custom_block", "study": "study_allow"}[action]
        if d not in cfg[key]:
            cfg[key].append(d)
        if action == "allow" and d in cfg["custom_block"]:
            cfg["custom_block"].remove(d)
        if action == "block" and d in cfg["custom_allow"]:
            cfg["custom_allow"].remove(d)
        self.cfgstore.save(sanitize_config(cfg, cfg))
        self.state.event("config", f"{d} added to {key}")

    def set_mode(self, mode):
        if mode not in ("study", "filter", "off"):
            raise ValueError("mode must be study, filter or off")
        cfg = json.loads(json.dumps(self.cfgstore.get()))
        cfg["mode"] = mode
        self.cfgstore.save(sanitize_config(cfg, cfg))
        self.state.event("mode", f"mode set to {mode}")

    def pause(self, minutes):
        minutes = max(0, min(600, int(minutes)))
        self.state.paused_until = time.time() + minutes * 60 if minutes else 0
        self.state.event("pause", f"paused for {minutes} min" if minutes else "resumed")

    def change_password(self, old, new):
        if not check_password(old, self.cfgstore.get()["admin_password_hash"]):
            raise PermissionError("current password is wrong")
        if len(new) < 6:
            raise ValueError("new password must be at least 6 characters")
        cfg = dict(self.cfgstore.get())
        cfg["admin_password_hash"] = hash_password(new)
        self.cfgstore.save(cfg)
        self.tokens.clear()
        self.state.event("config", "admin password changed")


def make_http_handler(app):
    allowed_hosts = {f"127.0.0.1:{HTTP_PORT}", f"localhost:{HTTP_PORT}"}
    hostname = socket.gethostname().lower()

    def lan_host_ok(host):
        name, _, port = host.rpartition(":")
        if port != str(HTTP_PORT) or not name:
            return False
        name = name.lower()
        try:
            return ipaddress.ip_address(name).version == 4
        except ValueError:
            return name in (hostname, hostname + ".local", hostname + ".lan", hostname + ".home")

    class H(http.server.BaseHTTPRequestHandler):
        server_version = "FocusGuard"

        def log_message(self, fmt, *a):
            pass

        def _send(self, code, body, ctype="application/json"):
            data = body if isinstance(body, bytes) else json.dumps(body).encode()
            self.send_response(code)
            self.send_header("Content-Type", ctype)
            self.send_header("Content-Length", str(len(data)))
            self.send_header("Cache-Control", "no-store")
            self.send_header("X-Frame-Options", "DENY")
            self.send_header("X-Content-Type-Options", "nosniff")
            self.end_headers()
            self.wfile.write(data)

        def _guard(self):
            client = self.client_address[0]
            if not lan_client_allowed(client, app.cfgstore.get()):
                self._send(403, {"error": "this device is not allowed - run 'focusguard.py lan on' on the PC"})
                return False
            host = self.headers.get("Host", "")
            loop = client.startswith("127.") or client in ("::1", "::ffff:127.0.0.1")
            if host not in allowed_hosts and (loop or not lan_host_ok(host)):
                self._send(403, {"error": "bad host"})
                return False
            return True

        def _body(self):
            n = min(int(self.headers.get("Content-Length") or 0), 2_000_000)
            return json.loads(self.rfile.read(n) or b"{}")

        def _authed(self, need="admin"):
            role = app.auth(self.headers.get("X-FG-Token"), need)
            if role:
                return role
            self._send(401, {"error": "login required"})
            return None

        def do_GET(self):
            if not self._guard():
                return
            path = urlparse(self.path).path
            if path in ("/", "/index.html", "/admin", "/admin/"):
                page = "admin.html" if path.startswith("/admin") else "home.html"
                try:
                    self._send(200, (PROG_DIR / page).read_bytes(), "text/html; charset=utf-8")
                except OSError:
                    self._send(500, {"error": f"{page} missing"})
            elif path == "/api/home":
                role = self._authed("parent")
                if role:
                    self._send(200, app.home(role))
            elif path == "/api/status":
                if self._authed():
                    self._send(200, app.status())
            elif path == "/api/config":
                if self._authed():
                    self._send(200, app.public_config())
            elif path == "/api/reports":
                if self._authed():
                    q = dict(x.split("=", 1) for x in (urlparse(self.path).query or "").split("&") if "=" in x)
                    try:
                        days = int(q.get("days", 7))
                    except ValueError:
                        days = 7
                    if app.reporter is None:
                        self._send(200, {"days": [], "report_users": []})
                    else:
                        self._send(200, {"days": app.reporter.load(days),
                                         "report_users": app.cfgstore.get().get("report_users", [])})
            else:
                self._send(404, {"error": "not found"})

        def do_POST(self):
            if not self._guard():
                return
            path = urlparse(self.path).path
            try:
                body = self._body()
                if path == "/api/login":
                    tok, role = app.login(str(body.get("password", "")))
                    self._send(200, {"token": tok, "role": role})
                    return
                if path in ("/api/tv", "/api/give"):
                    role = self._authed("parent")
                    if not role:
                        return
                    who = f"{role} {self.client_address[0]}"
                    if path == "/api/tv":
                        if app.tv is None:
                            raise ValueError("TV control not available")
                        app.tv.start(str(body.get("op", "")), who)
                        self._send(200, {"ok": True})
                    else:
                        until = app.give_study_time(str(body.get("user", "")), body.get("minutes", 0), who)
                        self._send(200, {"ok": True, "until": until})
                    return
                if not self._authed():
                    return
                if path == "/api/config":
                    app.save_config(body)
                elif path == "/api/mode":
                    app.set_mode(str(body.get("mode", "")))
                elif path == "/api/pause":
                    app.pause(body.get("minutes", 0))
                elif path == "/api/classes":
                    who = str(body.get("user", ""))
                    on = bool(body.get("on", True))
                    targets = app.cfgstore.get()["restricted_users"] if who == "*" else [who]
                    for t in targets:
                        app.usage.set_class(t, on)
                    app.state.event("classes", f"online classes today {'ON' if on else 'off'} for "
                                    f"{'all' if who == '*' else who} ({app.cfgstore.get()['class_window']})")
                elif path == "/api/grant":
                    m = max(0, min(600, int(body["minutes"])))
                    until = app.usage.add_grant(str(body["user"]), m)
                    app.state.event("grant", f"{body['user']}: extra time cancelled" if not until else
                                    f"{body['user']}: +{m} min, allowed until {time.strftime('%H:%M', time.localtime(until))}"
                                    f" (from {self.client_address[0]})")
                elif path == "/api/bonus":
                    app.usage.add_bonus(str(body["user"]), int(body["minutes"]))
                    app.state.event("bonus", f"{body['user']}: +{int(body['minutes'])} min today")
                elif path == "/api/reset_usage":
                    app.usage.reset(str(body["user"]))
                    app.state.event("bonus", f"{body['user']}: today's usage reset")
                elif path == "/api/list":
                    app.quick_list(body["action"], body["domain"])
                elif path == "/api/check":
                    d = norm_domain(body["domain"])
                    self._send(200, {"domain": d, "policy": app.state.policy,
                                     "verdict": app.engine.decide(d, app.state.policy)})
                    return
                elif path == "/api/password":
                    app.change_password(str(body.get("old", "")), str(body.get("new", "")))
                else:
                    self._send(404, {"error": "not found"})
                    return
                self._send(200, {"ok": True})
            except PermissionError as e:
                self._send(403, {"error": str(e)})
            except (ValueError, KeyError, TypeError) as e:
                self._send(400, {"error": str(e)})
            except Exception as e:
                log.exception("api error")
                self._send(500, {"error": str(e)})

    return H


# -----------------------------------------------------------------------------
# Entry points
# -----------------------------------------------------------------------------
def setup_logging(verbose=False):
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    log.setLevel(logging.DEBUG if verbose else logging.INFO)
    fh = logging.handlers.RotatingFileHandler(LOG_PATH, maxBytes=2_000_000, backupCount=3, encoding="utf-8")
    fh.setFormatter(logging.Formatter("%(asctime)s %(levelname)s %(message)s"))
    log.addHandler(fh)
    if sys.stdout and sys.stdout.isatty():
        log.addHandler(logging.StreamHandler())


def start_dns(engine, state):
    servers = []
    for host in DNS_HOSTS:
        for kind in ("udp", "tcp"):
            while True:
                try:
                    srv = make_dns_server(kind, host, DNS_PORT, engine)
                    break
                except OSError as e:
                    if host == DNS_HOSTS[0]:
                        state.event("error", f"cannot bind DNS {kind} {host}:{DNS_PORT} ({e}) - retrying")
                        time.sleep(10)
                        continue
                    state.event("error", f"DNS {kind} on {host} unavailable ({e})")
                    srv = None
                    break
            if srv:
                threading.Thread(target=srv.serve_forever, daemon=True, name=f"dns-{kind}-{host}").start()
                servers.append(srv)
    return servers


class AdminServer:
    """Admin HTTP server; listens on 127.0.0.1, or on all interfaces when LAN access is on."""

    def __init__(self, app):
        self.app = app
        self.httpd = None
        self.host = None
        self.lock = threading.Lock()

    def apply(self, cfg):
        host = "0.0.0.0" if cfg.get("lan_access") else "127.0.0.1"
        with self.lock:
            if host == self.host and self.httpd:
                return
            if self.httpd:
                self.httpd.shutdown()
                self.httpd.server_close()
                self.httpd = None
            while True:
                try:
                    self.httpd = http.server.ThreadingHTTPServer((host, HTTP_PORT), make_http_handler(self.app))
                    break
                except OSError as e:
                    self.app.state.event("error", f"admin panel cannot listen on {host}:{HTTP_PORT} ({e}) - retrying")
                    time.sleep(5)
            self.host = host
            threading.Thread(target=self.httpd.serve_forever, daemon=True, name="admin-http").start()
            self.app.state.event("admin", "admin panel open to the home network" if host == "0.0.0.0"
                                 else "admin panel on this PC only (127.0.0.1)")


def cmd_run(args):
    setup_logging(args.verbose)
    state = State()
    cfgstore = ConfigStore()
    if not cfgstore.get()["admin_password_hash"]:
        log.error("no admin password set - run 'focusguard.py setup' first")
        sys.exit(2)
    usage = UsageStore()
    engine = DNSEngine(state)
    engine.reload(cfgstore.get())
    ctl = Controller(cfgstore, usage, state, engine)
    reporter = ReportStore(cfgstore)
    engine.reporter = ctl.reporter = reporter
    cfgstore.listeners.append(engine.reload)
    cfgstore.listeners.append(lambda c: threading.Thread(target=ctl.apply_logon_hours, args=(c,), daemon=True).start())
    cfgstore.listeners.append(lambda c: flush_dns())
    state.event("start", f"FocusGuard {__version__} starting (pid {os.getpid()})")

    start_dns(engine, state)
    app = AdminApp(cfgstore, usage, state, engine, ctl)
    app.tv = TVControl(cfgstore, state)
    admin = AdminServer(app)
    admin.apply(cfgstore.get())
    cfgstore.listeners.append(admin.apply)
    threading.Thread(target=ctl.apply_logon_hours, args=(cfgstore.get(),), daemon=True).start()
    flush_dns()

    last = time.monotonic()
    while True:
        now = time.monotonic()
        dt_s, last = min(now - last, 30.0), now
        try:
            ctl.tick(dt_s)
            app.tv.tick()
        except Exception:
            log.exception("tick failed")
        usage.flush()
        time.sleep(5)


def _ask_password():
    while True:
        p1 = getpass.getpass("New admin panel password (min 6 chars): ")
        p2 = getpass.getpass("Repeat password: ")
        if len(p1) >= 6 and p1 == p2:
            return p1
        print("Passwords empty/short or do not match - try again.")


def cmd_setup(args):
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    store = ConfigStore()
    cfg = json.loads(json.dumps(store.get()))
    for u in args.user or []:
        if u.lower() not in [x.lower() for x in cfg["restricted_users"]]:
            cfg["restricted_users"].append(u)
        cfg["time"].setdefault(u.lower(), default_user_time())
    if not cfg["admin_password_hash"] or args.reset_password:
        cfg["admin_password_hash"] = hash_password(_ask_password())
    clean = sanitize_config(cfg, cfg)
    write_json_atomic(CONFIG_PATH, clean)
    print(f"Config written to {CONFIG_PATH}")
    print(f"Restricted users: {', '.join(clean['restricted_users']) or '(none)'}")


def cmd_passwd(args):
    store = ConfigStore()
    cfg = dict(store.get())
    cfg["admin_password_hash"] = hash_password(_ask_password())
    write_json_atomic(CONFIG_PATH, cfg)
    print("Password changed. Restart the FocusGuard task (or reboot) to apply.")


def cmd_pin(args):
    store = ConfigStore()
    cfg = dict(store.get())
    if args.clear:
        cfg["parent_pin_hash"] = ""
        write_json_atomic(CONFIG_PATH, cfg)
        print("Parent PIN removed - the home page now needs the admin password.")
        return
    while True:
        p1 = getpass.getpass("Parent PIN for the home page (6+ digits or characters): ")
        p2 = getpass.getpass("Repeat PIN: ")
        if len(p1) >= 6 and p1 == p2:
            break
        print("PINs differ or are shorter than 6 - try again.")
    if check_password(p1, cfg["admin_password_hash"]):
        sys.exit("The PIN must be different from the admin password.")
    cfg["parent_pin_hash"] = hash_password(p1)
    write_json_atomic(CONFIG_PATH, cfg)
    print("Parent PIN set. It opens the home page only (TV lock + study time), not the full panel.")


def cmd_tv(args):
    store = ConfigStore()
    cfg = json.loads(json.dumps(store.get()))
    t = cfg.setdefault("tv", dict(DEFAULT_TV))
    if args.action in ("on", "off"):
        t["enabled"] = args.action == "on"
        if args.address:
            if not _ADDR_RE.match(args.address):
                sys.exit("address must look like 192.168.1.8:5555")
            t["address"] = args.address
        if args.adb:
            t["adb_path"] = args.adb
        cfg["tv"] = clean_tv(t)
        write_json_atomic(CONFIG_PATH, cfg)
        print(f"TV control {'ON' if cfg['tv']['enabled'] else 'off'}  ({cfg['tv']['address']})")
        if cfg["tv"]["enabled"]:
            adb = cfg["tv"]["adb_path"] or str(DATA_DIR / "platform-tools" / "adb.exe")
            print(f"adb.exe        : {adb}  ({'found' if os.path.isfile(adb) else 'NOT FOUND'})")
            print("Next: 'focusguard.py tv status' - press OK on the TV when it asks to allow this PC.")
        return
    tv = TVControl(store, State())
    tv.verbose = True
    ok, msg = tv.run({"status": "check"}.get(args.action, args.action), who="command line")
    i = tv.info
    print(f"{'OK  ' if ok else 'FAIL'} {msg}")
    print(f"TV state       : {i['state']}")
    if i["locked"]:
        print(f"locked         : {', '.join(i['locked'])}")
    if i["open"]:
        print(f"open           : {', '.join(i['open'])}")
    sys.exit(0 if ok else 1)


def cmd_check(args):
    cfg = ConfigStore().get()
    eng = DNSEngine(State())
    eng.reload(cfg)
    for d in args.domains:
        d = norm_domain(d)
        print(f"{d:40s} filter={eng.decide(d, 'filter'):6s} study={eng.decide(d, 'study')}")


def cmd_selftest(args):
    """Check upstream DoH directly (no service needed)."""
    cfg = ConfigStore().get()
    eng = DNSEngine(State())
    eng.reload(cfg)
    try:
        import certifi
        print(f"certifi bundle : {certifi.where()}")
    except Exception:
        print("certifi bundle : not installed (using Windows store only)")
    ok_any = False
    for url in cfg["upstream_doh"]:
        eng.upstreams = [url]
        ok, msg = eng.probe()
        ok_any |= ok
        print(f"{'OK  ' if ok else 'FAIL'} {url}  ->  {msg}")
    sys.exit(0 if ok_any else 1)


def _set_armed(value):
    store = ConfigStore()
    cfg = dict(store.get())
    cfg["dns_guard_armed"] = value
    write_json_atomic(CONFIG_PATH, cfg)
    print(f"adapter DNS guard {'ARMED' if value else 'DISARMED'}")


FW_LAN_RULE = "FocusGuard - admin panel (LAN)"


def cmd_lan(args):
    store = ConfigStore()
    cfg = dict(store.get())
    if args.action == "status":
        print(f"LAN access : {'ON' if cfg.get('lan_access') else 'off'}")
        print(f"Allowed    : {', '.join(cfg.get('lan_allow', [])) or '-'}")
        for a, net in local_ipv4_networks():
            print(f"This PC    : http://{a}:{HTTP_PORT}/   (network {net})")
        return
    if args.action == "on":
        entries = args.addresses or ["subnet"]
        bad = [e for e in entries if not valid_lan_entry(e)]
        if bad:
            sys.exit(f"not an IP address / network: {', '.join(bad)}")
        cfg["lan_access"], cfg["lan_allow"] = True, entries
    else:
        cfg["lan_access"], cfg["lan_allow"] = False, []
    write_json_atomic(CONFIG_PATH, cfg)
    if IS_WIN:
        ps = f"Remove-NetFirewallRule -DisplayName '{FW_LAN_RULE}' -ErrorAction SilentlyContinue"
        if cfg["lan_access"]:
            remote = ",".join("'LocalSubnet'" if e.lower() == "subnet" else f"'{e}'" for e in cfg["lan_allow"])
            ps += (f"; New-NetFirewallRule -DisplayName '{FW_LAN_RULE}' -Group 'FocusGuard' -Direction Inbound "
                   f"-Protocol TCP -LocalPort {HTTP_PORT} -RemoteAddress {remote} -Action Allow -Profile Any | Out-Null")
        rc, out = run_quiet(["powershell", "-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-Command", ps])
        if rc != 0:
            print("firewall rule update failed (run this from an Administrator PowerShell):", out.strip()[:300])
    if cfg["lan_access"]:
        print(f"LAN access ON for: {', '.join(cfg['lan_allow'])}")
        for a, _ in local_ipv4_networks():
            print(f"Open on your phone/laptop: http://{a}:{HTTP_PORT}/")
        print("The running service switches over within about 5 seconds.")
    else:
        print("LAN access OFF - admin panel is reachable on this PC only.")


def cmd_report_users(args):
    store = ConfigStore()
    cfg = dict(store.get())
    cfg["report_users"] = args.users
    clean = sanitize_config(cfg, cfg)
    write_json_atomic(CONFIG_PATH, clean)
    print(f"Reports on for: {', '.join(clean['report_users']) or '(nobody)'}")
    dropped = set(u.lower() for u in args.users) - set(u.lower() for u in clean["report_users"])
    if dropped:
        print(f"Ignored (not restricted accounts): {', '.join(sorted(dropped))}")


def cmd_arm(args):
    _set_armed(True)


def cmd_disarm(args):
    _set_armed(False)


def main(argv=None):
    ap = argparse.ArgumentParser(prog="focusguard", description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--version", action="version", version=__version__)
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("run")
    p.add_argument("-v", "--verbose", action="store_true")
    p.set_defaults(fn=cmd_run)
    p = sub.add_parser("setup")
    p.add_argument("--user", action="append", help="Windows account to restrict (repeatable)")
    p.add_argument("--reset-password", action="store_true")
    p.set_defaults(fn=cmd_setup)
    p = sub.add_parser("passwd")
    p.set_defaults(fn=cmd_passwd)
    p = sub.add_parser("check")
    p.add_argument("domains", nargs="+")
    p.set_defaults(fn=cmd_check)
    sub.add_parser("selftest").set_defaults(fn=cmd_selftest)
    sub.add_parser("arm").set_defaults(fn=cmd_arm)
    sub.add_parser("disarm").set_defaults(fn=cmd_disarm)
    p = sub.add_parser("report-users")
    p.add_argument("users", nargs="*")
    p.set_defaults(fn=cmd_report_users)
    p = sub.add_parser("pin")
    p.add_argument("--clear", action="store_true", help="remove the parent PIN")
    p.set_defaults(fn=cmd_pin)
    p = sub.add_parser("tv")
    p.add_argument("action", choices=["on", "off", "status", "lock", "unlock"])
    p.add_argument("address", nargs="?", help="TV address, e.g. 192.168.1.8:5555 (with 'on')")
    p.add_argument("--adb", help="full path to adb.exe (default ProgramData\\FocusGuard\\platform-tools)")
    p.set_defaults(fn=cmd_tv)
    p = sub.add_parser("lan")
    p.add_argument("action", choices=["on", "off", "status"])
    p.add_argument("addresses", nargs="*", help="IPs, networks (192.168.1.0/24) or 'subnet' (default)")
    p.set_defaults(fn=cmd_lan)
    args = ap.parse_args(argv)
    args.fn(args)


if __name__ == "__main__":
    main()
