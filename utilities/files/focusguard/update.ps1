# =============================================================================
# TOOL    : FocusGuard updater (run as Administrator on a PC that already has FocusGuard)
# FAMILY  : focusguard
# VERSION : 1.0.1
# DATE    : 2026-11-28
# CHAT    : Mi TV clean interface and lock over same Wi-Fi
# CHANGES : 1.0.1 - public edition: neutral wording for the parent PIN prompt; -TV help says
#           to pass your own TV address
#           1.0.0 - first version: copies the 1.6.0 files over an existing install,
#           puts adb (platform-tools) in the locked data folder, turns on TV control,
#           sets the parent PIN, restarts the service and checks the TV
# STATUS  : beta
# =============================================================================
<#
.SYNOPSIS
  Updates an installed FocusGuard to 1.6.0 (home page + TV lock) without reinstalling.
    Set-ExecutionPolicy -Scope Process Bypass -Force
    .\update.ps1
.PARAMETER AdbDir  Folder holding adb.exe (Android SDK platform-tools). Default C:\platform-tools
.PARAMETER TV      TV address (IP:5555) - pass your own TV's reserved address. Default 192.168.1.8:5555
.PARAMETER NoTV    Update the files only; leave TV control off (e.g. on a PC with no TV to control).
.PARAMETER SkipPin Do not ask for the parent PIN now (set it later with 'focusguard.py pin').
#>
#Requires -RunAsAdministrator
param(
    [string]$AdbDir = 'C:\platform-tools',
    [string]$TV = '192.168.1.8:5555',
    [switch]$NoTV,
    [switch]$SkipPin
)
$ErrorActionPreference = 'Stop'
$Dir  = Join-Path $env:ProgramFiles 'FocusGuard'
$Data = Join-Path $env:ProgramData 'FocusGuard'
$Src  = $PSScriptRoot
function Step($m) { Write-Host "`n==> $m" -ForegroundColor Cyan }
function Warn($m) { Write-Host "    ! $m" -ForegroundColor Yellow }
function Ok($m)   { Write-Host "    $m" -ForegroundColor Green }

Step "Checking the existing install"
$task = Get-ScheduledTask -TaskName 'FocusGuard' -ErrorAction SilentlyContinue
if (-not $task) { throw "FocusGuard is not installed here - use install.ps1 instead." }
$pyw = $task.Actions[0].Execute.Trim('"')
$py  = Join-Path (Split-Path $pyw) 'python.exe'
if (-not (Test-Path $py)) { throw "python.exe not found next to $pyw" }
foreach ($f in 'focusguard.py', 'admin.html', 'home.html') {
    if (-not (Test-Path (Join-Path $Src $f))) { throw "$f not found next to update.ps1" }
}
Ok "Python: $py"

Step "Stopping FocusGuard (internet pauses for a few seconds)"
Stop-ScheduledTask -InputObject $task -ErrorAction SilentlyContinue
Get-CimInstance Win32_Process -Filter "Name like 'python%'" | Where-Object { $_.CommandLine -like '*focusguard.py*' } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
Ok "stopped"

Step "Copying files to $Dir"
foreach ($f in 'focusguard.py', 'admin.html', 'home.html', 'README.md', 'uninstall.ps1') {
    $p = Join-Path $Src $f
    if (Test-Path $p) { Copy-Item $p $Dir -Force; Ok $f }
}

if (-not $NoTV) {
    Step "Putting adb in $Data\platform-tools (SYSTEM + Administrators only)"
    if (Test-Path (Join-Path $AdbDir 'adb.exe')) {
        $dst = Join-Path $Data 'platform-tools'
        New-Item -ItemType Directory -Force -Path $dst | Out-Null
        Copy-Item (Join-Path $AdbDir '*') $dst -Recurse -Force
        Ok "copied from $AdbDir"
    } else {
        Warn "adb.exe not found in $AdbDir - copy platform-tools there and run update.ps1 again"
    }
    & $py (Join-Path $Dir 'focusguard.py') tv on $TV | ForEach-Object { Ok $_ }
}

if (-not $SkipPin) {
    Step "Parent PIN for the home page (give this to the other parent; NOT the admin password)"
    & $py (Join-Path $Dir 'focusguard.py') pin
}

Step "Starting FocusGuard"
Start-ScheduledTask -InputObject $task
Start-Sleep -Seconds 5
Ok "running"

if (-not $NoTV) {
    Step "Checking the TV - if the TV shows 'Allow USB debugging?', tick 'Always allow' and press OK"
    & $py (Join-Path $Dir 'focusguard.py') tv status
    if ($LASTEXITCODE) {
        Warn "If the TV just asked to allow this PC, accept it and run:"
        Warn "  & '$py' '$Dir\focusguard.py' tv status"
    }
}

Step "Phone access"
& $py (Join-Path $Dir 'focusguard.py') lan status | ForEach-Object { Ok $_ }
Write-Host "`nTo let any phone on the home Wi-Fi open the page (PIN still needed):" -ForegroundColor Cyan
Write-Host "  & '$py' '$Dir\focusguard.py' lan on subnet"
Write-Host "Done. Open the address shown above (http://<this PC IP>:8765/) on the phones." -ForegroundColor Green
