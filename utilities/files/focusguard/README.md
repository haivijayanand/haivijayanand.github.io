<!--
TOOL    : FocusGuard README
FAMILY  : focusguard
VERSION : 1.6.2
DATE    : 2026-11-28
CHAT    : Windows 11 distraction blocker and screen-time limiter
CHANGES : 1.6.2 - public edition for haivijayanand.github.io/utilities: personal paths,
          names and addresses replaced with examples; fresh-install TV steps added
          1.6.1 - TV pairing waits for the TV prompt
          1.6.0 - Home page (TV lock + study time), parent PIN, TV control, update.ps1
          1.5.0 - Online classes today
          1.4.0 - Study mode default; mode switch + study-allow box on Status
          1.3.0 - phone/laptop access over home Wi-Fi; extra-time grants
          1.2.0 - music category, more game sites, music players / game launchers blocked
          1.1.0 - Reports tab (opt-in per account)
          1.0.3 - certifi TLS fix; adapter guard armed only after a passing self-test
          1.0.2 - installer self-test and adapter guard fixes
          1.0.1 - portable/embeddable Python supported (no venv)
          1.0.0 - first release
-->
# FocusGuard 1.6.1

FocusGuard blocks distracting sites and limits computer time for chosen Windows accounts. It is built for **Windows 11 Pro** and works with Chrome, Edge and Firefox.

## What it does

- **DNS filter on 127.0.0.1.** Every app and browser is filtered, not just one browser. The filter sends allowed lookups out over encrypted DNS (DNS-over-HTTPS to Cloudflare 1.1.1.1).
  - Block categories: video (YouTube, Netflix, Hotstar…), social (Instagram, Facebook, Snapchat, X, Reddit…), music (Spotify, JioSaavn, Gaana, Wynk, SoundCloud…), games (Poki, Pokémon, Roblox, now.gg, itch.io…), and bypass sites (VPN/proxy/DoH sites).
  - **Study mode** turns it into a whitelist: only the sites you list work. It can run on a schedule (default weekdays 17:00–19:00) or all day.
  - SafeSearch is forced on Google, Bing and DuckDuckGo.
  - It only filters while a *restricted* account is at the screen. When you sign in with your own account, the internet is normal.
- **Screen time per account.**
  - Set allowed time windows and a daily minute limit for each day of the week.
  - The account gets a warning 5 minutes before time ends. After that, a 1-minute notice, then it is signed out.
  - Windows logon hours (`net user /times`) are also set, so the account cannot sign in outside its windows.
- **Anti-bypass measures.**
  - The firewall blocks outbound DNS (ports 53 and 853) and the well-known public DoH resolvers.
  - Browser policies turn off "secure DNS" and proxies.
  - Network adapters are reset to FocusGuard every 15 s, which catches phone hotspots and USB tethering.
  - VPN/Tor apps, music players (Spotify, VLC, Media Player…), game launchers (Steam, Roblox, Minecraft, BlueStacks…), unapproved browsers and portable browsers are closed for restricted users.
- **Admin panel** at <http://127.0.0.1:8765>, protected by a password.
  - Pause filtering, give bonus minutes, and edit schedules and lists.
  - See which domains were blocked and allow one with a single click.

## Install

1. Make the child's account a **Standard** account: Settings › Accounts › Other users › *name* › Change account type. Keep your own admin account and its password private.
2. You need **Python 3.9+**. A normal python.org install works, and so does a portable or "embeddable" Python; pass its path with `-Python D:\path\python.exe`. If Python is outside Program Files, the installer copies it to `C:\Program Files\FocusGuard\python` so it is there at every boot (add `-KeepPythonInPlace` to skip this). No venv or pip is needed: the two libraries are put in `C:\Program Files\FocusGuard\lib`, downloaded straight from PyPI if pip is missing.
3. Copy this folder to the PC. Open **PowerShell as Administrator** in the folder and run:
   ```powershell
   Set-ExecutionPolicy -Scope Process Bypass -Force
   .\install.ps1 -User Kid
   ```
   Replace `Kid` with the real account name.
   - Add `-LockExtensions` to also block browser extensions (VPN add-ons). This disables existing extensions in Chrome and Edge too.
   - You will be asked for an **admin panel password**. Use your own, not the child's.
4. Restart the browsers. Open the **FocusGuard Admin** shortcut and adjust the **Schedule** tab.

The installer tests the filter before switching DNS. If the test fails, nothing about your DNS is changed.

## Default schedule

The defaults below are written once at install. Change them in the panel.

| | Allowed windows | Daily limit | Study mode |
|---|---|---|---|
| Mon–Fri | 16:00–20:30 | 120 min | 17:00–19:00 |
| Sat–Sun | 09:00–12:30, 15:00–21:00 | 180 min | none |

- **Time windows** are `HH:MM-HH:MM`. A window cannot cross midnight.
- **An empty day** means no access that day. Use `00:00-24:00` for the whole day.
- **A blank daily limit** means no minute limit.
- **Logon hours** in Windows can only be whole hours, so they are rounded outward. FocusGuard itself enforces the exact minutes.
- **Bonus minutes** raise only today's minute limit; they do not extend a time window. Use **Pause** for that.

## Phone / laptop access (same Wi-Fi)

The admin panel normally answers only on the PC itself. To use it from your phone or laptop, open an **Administrator PowerShell on the PC** and run:

```powershell
& "C:\Program Files\FocusGuard\python\python.exe" "C:\Program Files\FocusGuard\focusguard.py" lan on
```

- With no address, any device on the home network can reach the login page. To allow one device only, add its IP: `lan on 192.168.1.25`. Fix that IP with a DHCP reservation on the router so it doesn't change.
- `lan status` prints the address to open on the phone, for example `http://192.168.1.10:8765`.
- `lan off` closes it again.
- The command also adds the Windows Firewall rule. This setting can't be changed from the panel itself.

The connection is plain HTTP on your own Wi-Fi. Use a strong admin password that the children don't know. After five wrong tries the login is locked for 5 minutes.

## Home page (phones) - new in 1.6.0

Opening `http://<PC address>:8765/` now shows a simple page with two things only:

- **TV: Lock / Unlock.** Lock pauses YouTube, Hotstar, SonyLIV, Prime Video, ZEE5, Jio, Netflix, MX Player, the Mi video player, the USB media player and the Play Store on the TV, and switches off casting and screen mirroring. Whatever is playing stops and the TV goes to its home screen. Unlock brings everything back. It takes about 30-60 seconds and the TV must be on.
  - While the TV is meant to be locked, FocusGuard locks it again every 10 minutes. This catches a TV that was off when you pressed Lock, or apps switched back on from the TV's Settings.
  - TV inputs (HDMI set-top box) are not affected.
- **Study time on PC.** For each child, pick 15/30/45/60 minutes or type a number, then tap **Give time**. This is the same as "Extra time" in the full panel, and it always runs in Study mode. If the mode was Filter or Off, giving time switches it to Study. **Stop** ends the time early.

**Sign-in:**

- **Parent PIN** (set with `focusguard.py pin`) opens the home page only. Give this one to other parents.
- **Admin password** opens the home page too, plus an **Advanced** button for the full panel (now at `/admin`).

### Setting up the TV lock (once)

1. On the TV, turn on Developer options and USB debugging, and reserve its IP on the router.
2. Put the Android **platform-tools** folder in `C:\platform-tools` on the PC.
3. Run `update.ps1 -TV <TV-IP>:5555` as Administrator in this folder (see **Updating** below), using your TV's reserved address. It copies adb into `C:\ProgramData\FocusGuard\platform-tools`, which only SYSTEM and Administrators can open, and turns TV control on for that address. On a **fresh install**, run `install.ps1` first and then `update.ps1`; update.ps1 is also the step that sets up the TV and the parent PIN.
4. When the TV shows **Allow USB debugging?** for this PC, tick **Always allow** and press OK.

Commands (Administrator):

```
focusguard.py tv on <TV-IP>:5555         # turn TV control on (or 'tv off')
focusguard.py tv status                  # read the TV now
focusguard.py tv lock | unlock           # change it from the PC
focusguard.py pin                        # set the parent PIN (pin --clear removes it)
```

**Safety:**

- The adb key is kept in the locked data folder.
- adb runs on a private port and is shut down after every job.
- `adb.exe` and `fastboot.exe` are closed if a child's account starts them.

## Updating from 1.5.0

Copy the new folder to the PC, open **PowerShell as Administrator** in it, and run:

```powershell
Set-ExecutionPolicy -Scope Process Bypass -Force
.\update.ps1                 # add -NoTV on a PC that should not control the TV
```

It does the following, without touching DNS, firewall or browser settings:

- stops FocusGuard and copies the new files
- copies adb and turns TV control on
- asks for the parent PIN
- restarts FocusGuard and checks the TV

For the other parent's phone, either add its IP to the allowed list with `lan on`, or use `lan on subnet`; the PIN is still needed.

## Mode (Status tab)

- **Study** (default): only sites in the study list open.
- **Filter**: everything is allowed except the block lists.
- **Off**: no site blocking. Time limits still apply.

To allow a site in study mode, type it in the box under the mode buttons. If a site opens only partly, check **Log › Recently blocked** and click **Study-allow** on the helper domains it needs.

## Online classes today

On a rainy day, a school holiday or an online-class day, tap **Online classes today** on a child's card, or **Start online classes for all children** at the top of Status. For that day only:

- The child can use the PC during the class hours, 07:00–19:00 by default. Change the hours in **Settings › Accounts**.
- **Study mode is forced** during those hours, whatever mode is selected. Google Meet, Google Classroom, Zoom and Teams work. YouTube and anything else outside the study list stay blocked.
- Class time is **not counted** against the daily limit, so the normal evening allowance is still there after the classes.
- Windows sign-in hours are opened from the class start time for that day.
- Next day everything is back to the normal schedule automatically. **End online classes** stops it early.

## Extra time vs Pause

- **Extra time (+15 / +30 / +1 hour)** on a child's card lets that account use the PC for that much longer, starting now. It works even outside the allowed hours, and it lifts the Windows sign-in-hours block for that time. Filtering stays on. Pressing it again adds more. **Cancel extra** ends it.
- **Pause** switches filtering and time limits off for everyone, for the chosen minutes.

## Reports

The **Reports** tab shows, for each account you opt in under **Settings › Reports**:

- screen time per day
- the most-used sites
- blocked attempts
- apps that were closed
- time-up sign-outs

You can view today, the last 7 days or the last 30 days, and print the page.

- **Nothing is recorded for unticked accounts.** Reporting is off for everyone until you tick them.
- **Storage:** one file per day in `C:\ProgramData\FocusGuard\reports`, kept for 30 days by default.
- **What "sites" means:** a site is counted at most once a minute while it is in use. Ads, CDNs and Windows background traffic are left out. It is a guide to what was used, not an exact visit count.
- **Command line:** `focusguard.py report-users Kid1 Kid2` sets the opted-in accounts.

## Day-to-day

- **Study mode breaks a site:** open the Log tab. Find the helper domains it needed and click **Study-allow**.
- **A site is wrongly blocked:** click **Allow** in the Log tab, or add it under Block lists › Always allowed.
- **You need the PC unrestricted:** sign in with your own account, or use **Pause**.

## Emergency: internet not working

The service has probably stopped. It normally restarts itself within about a minute. If it doesn't:

```powershell
# as Administrator
Start-ScheduledTask -TaskName FocusGuard            # try restarting first
# or remove it completely:
& "C:\Program Files\FocusGuard\uninstall.ps1"
```

The log is at `C:\ProgramData\FocusGuard\focusguard.log`.

## Known limits

No software blocker is perfect. These gaps remain:

- **Admin access.** An administrator account can remove anything. This is why the child's account must be Standard.
- **Other devices.** A phone or tablet is not covered. Use router parental controls or NextDNS on those.
- **Tethering.** Plugging in a phone hotspot works for at most about 15 s before the adapter guard resets it. The firewall rule usually stops DNS on it straight away.
- **Determined users.** Someone could rename a VPN program, use an obscure DoH server over port 443, or use a web proxy site not on the list. The Log and Events tabs help you spot this.
- **Shared DNS.** Filtering is per PC, not per browser tab. While a restricted account is at the screen, every app on the PC is filtered.
- **Untested here.** The Windows-specific parts (session detection, logoff, adapter guard) were written for Windows 11 but could not be tested in the build environment. Check them on the target PC on the first day.

## Files

| File | Role |
|---|---|
| `focusguard.py` | The service (DNS filter, time limits, guards, admin API) |
| `home.html` | The simple home page (TV lock + study time), served at `/` |
| `admin.html` | The full admin panel, served at `/admin` |
| `update.ps1` | Updates an existing install (files, adb, TV control, parent PIN) |
| `install.ps1` / `uninstall.ps1` | Setup and removal |
| `C:\ProgramData\FocusGuard\config.json` | Settings (SYSTEM and Administrators only) |
| `C:\ProgramData\FocusGuard\usage.json` | Today's usage |

Command-line helpers (run as Administrator; if you used `-KeepPythonInPlace`, use your own python.exe path):

```
"C:\Program Files\FocusGuard\python\python.exe" "C:\Program Files\FocusGuard\focusguard.py" check youtube.com wikipedia.org
"C:\Program Files\FocusGuard\python\python.exe" "C:\Program Files\FocusGuard\focusguard.py" passwd
```
