# =============================================================================
# TOOL    : FocusGuard installer (run as Administrator)
# FAMILY  : focusguard
# VERSION : 1.0.4
# DATE    : 2026-11-15
# CHAT    : Windows 11 distraction blocker and screen-time limiter
# CHANGES : 1.0.4 - also copies home.html (simple home page, FocusGuard 1.6.0)
#           1.0.3 - installs certifi; keeps the adapter guard disarmed until the
#           self-test passes, then arms it; prints a direct DoH diagnosis on failure
#           1.0.2 - self-test fixed: checks the local DNS answers (filtering is
#           correctly OFF while the admin is at the screen) + shows list verdicts
#           1.0.1 - no venv needed: works with portable/embeddable Python;
#           copies Python off non-system drives into Program Files; installs
#           deps into a private lib folder via pip --target, or straight from
#           PyPI wheels when pip is missing
#           1.0.0 - first release: venv + deps, locked data folder, admin
#           password setup, SYSTEM scheduled task with auto-restart, DNS port
#           firewall rules, DoH-resolver block, Chrome/Edge/Firefox policies,
#           self-test before switching adapters to 127.0.0.1
# STATUS  : beta
# =============================================================================
<#
.SYNOPSIS
  Installs FocusGuard. Run from an elevated PowerShell in the folder holding the files:
    Set-ExecutionPolicy -Scope Process Bypass -Force
    .\install.ps1 -User Kid
.PARAMETER User            Windows account to restrict (a Standard, non-admin account).
.PARAMETER Python          Full path to python.exe (auto-detected if omitted).
.PARAMETER KeepPythonInPlace  Run Python from where it is instead of copying it to
                           Program Files (only safe if that drive is always present at boot).
.PARAMETER LockExtensions  Also block browser extension installs (stops VPN/proxy add-ons;
                           NOTE: disables existing extensions in Chrome/Edge too).
#>
#Requires -RunAsAdministrator
param(
    [Parameter(Mandatory = $true)][string]$User,
    [string]$Python,
    [switch]$LockExtensions,
    [switch]$KeepPythonInPlace
)
$ErrorActionPreference = 'Stop'
$Dir  = Join-Path $env:ProgramFiles 'FocusGuard'
$Data = Join-Path $env:ProgramData 'FocusGuard'
$Src  = $PSScriptRoot

function Step($m) { Write-Host "`n==> $m" -ForegroundColor Cyan }
function Warn($m) { Write-Host "    ! $m" -ForegroundColor Yellow }
function Ok($m)   { Write-Host "    $m" -ForegroundColor Green }

# ---------------------------------------------------------------- 1. checks
Step "Checking account '$User'"
$acct = Get-LocalUser -Name $User -ErrorAction SilentlyContinue
if (-not $acct) { throw "Local account '$User' not found. Create it first (Settings > Accounts > Other users)." }
$admins = Get-LocalGroupMember -SID 'S-1-5-32-544' -ErrorAction SilentlyContinue | ForEach-Object { ($_.Name -split '\\')[-1] }
if ($admins -contains $User) {
    Warn "'$User' is an ADMINISTRATOR - it could undo every block."
    Warn "Change it to Standard: Settings > Accounts > Other users > $User > Change account type."
    if ((Read-Host "    Continue anyway? (y/N)") -ne 'y') { exit 1 }
} else { Ok "'$User' is a standard account" }
foreach ($f in 'focusguard.py', 'admin.html', 'home.html') {
    if (-not (Test-Path (Join-Path $Src $f))) { throw "$f not found next to install.ps1" }
}

# ---------------------------------------------------------------- 2. python
Step "Finding Python 3.9+"
if (-not $Python) {
    try { $Python = (& py -3 -c "import sys;print(sys.executable)" 2>$null | Select-Object -First 1) } catch {}
    if (-not $Python) { $c = Get-Command python.exe -ErrorAction SilentlyContinue; if ($c) { $Python = $c.Source } }
}
if (-not $Python -or $Python -like '*WindowsApps*' -or -not (Test-Path $Python)) {
    throw "Python not found. Install Python 3.11+ from python.org with 'Install for all users' ticked, or pass -Python C:\path\python.exe"
}
$ver = & $Python -c "import sys;print('%d.%d'%sys.version_info[:2])"
if ([version]$ver -lt [version]'3.9') { throw "Python $ver is too old (need 3.9+)" }
if ($Python -like "$env:USERPROFILE*") { Warn "Python lives in your user profile; 'all users' install is more robust." }
Ok "$Python (Python $ver)"

# ---------------------------------------------------------------- 3. stop old copy, restore DNS for downloads
Step "Preparing (stopping any previous FocusGuard)"
$old = Get-ScheduledTask -TaskName 'FocusGuard' -ErrorAction SilentlyContinue
if ($old) { Stop-ScheduledTask -InputObject $old -ErrorAction SilentlyContinue }
Get-CimInstance Win32_Process -Filter "Name like 'python%'" | Where-Object { $_.CommandLine -like '*focusguard.py*' } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
Get-NetFirewallRule -Group 'FocusGuard' -ErrorAction SilentlyContinue | Remove-NetFirewallRule
Get-NetAdapter -IncludeHidden -ErrorAction SilentlyContinue | ForEach-Object {
    try { Set-DnsClientServerAddress -InterfaceIndex $_.ifIndex -ResetServerAddresses -ErrorAction Stop } catch {} }
Clear-DnsClientCache

# ---------------------------------------------------------------- 4. files + python runtime + libraries
Step "Copying files to $Dir"
New-Item -ItemType Directory -Force -Path $Dir | Out-Null
Copy-Item (Join-Path $Src 'focusguard.py'), (Join-Path $Src 'admin.html'), (Join-Path $Src 'home.html') $Dir -Force
if (Test-Path (Join-Path $Src 'uninstall.ps1')) { Copy-Item (Join-Path $Src 'uninstall.ps1') $Dir -Force }
if (Test-Path (Join-Path $Src 'README.md'))     { Copy-Item (Join-Path $Src 'README.md') $Dir -Force }

$pyHome = Split-Path $Python
$pyExe  = Split-Path $Python -Leaf
if (-not $KeepPythonInPlace -and -not $pyHome.StartsWith($env:ProgramFiles, [StringComparison]::OrdinalIgnoreCase)) {
    $sizeMB = [math]::Round(((Get-ChildItem $pyHome -Recurse -File -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum) / 1MB)
    Step "Copying Python ($sizeMB MB) from $pyHome to $Dir\python (so FocusGuard starts at boot without drive $($pyHome.Substring(0,2)))"
    if ($sizeMB -gt 500) {
        Warn "That is large. Copy anyway? (y = copy, n = run it from $pyHome)"
        if ((Read-Host "    y/N") -ne 'y') { $KeepPythonInPlace = $true }
    }
    if (-not $KeepPythonInPlace) {
        & robocopy $pyHome (Join-Path $Dir 'python') /MIR /R:1 /W:1 /NFL /NDL /NJH /NJS /NP | Out-Null
        if ($LASTEXITCODE -ge 8) { throw "copying Python failed (robocopy code $LASTEXITCODE)" }
        $Python = Join-Path (Join-Path $Dir 'python') $pyExe
        Ok "Python copied - FocusGuard will use $Python"
    }
}
if ($KeepPythonInPlace) { Warn "Using Python in place at $Python - that drive must be present at every boot or the internet will stop." }
$pyw = Join-Path (Split-Path $Python) 'pythonw.exe'
if (-not (Test-Path $pyw)) { $pyw = $Python }

Step "Installing dnslib + psutil + certifi into $Dir\lib"
$lib = Join-Path $Dir 'lib'
if (Test-Path $lib) { Remove-Item $lib -Recurse -Force }
New-Item -ItemType Directory -Force -Path $lib | Out-Null
[Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12

& $Python -m pip --version *> $null
$viaPip = $false
if ($LASTEXITCODE -eq 0) {
    & $Python -m pip install --disable-pip-version-check -q --target $lib dnslib psutil certifi
    $viaPip = ($LASTEXITCODE -eq 0)
    if (-not $viaPip) { Warn "pip failed - downloading the wheels directly instead" }
} else { Ok "no pip in this Python - downloading the wheels directly from PyPI" }

if (-not $viaPip) {
    function Get-Wheel([string]$Pkg, [string[]]$Patterns) {
        $meta = Invoke-RestMethod "https://pypi.org/pypi/$Pkg/json" -UseBasicParsing
        $whl = $null
        foreach ($pat in $Patterns) {
            $whl = $meta.urls | Where-Object { $_.packagetype -eq 'bdist_wheel' -and $_.filename -like $pat } | Select-Object -First 1
            if ($whl) { break }
        }
        if (-not $whl) { throw "no suitable wheel found for $Pkg" }
        $tmp = Join-Path $env:TEMP ($whl.filename + '.zip')
        Invoke-WebRequest $whl.url -OutFile $tmp -UseBasicParsing
        Expand-Archive $tmp -DestinationPath $lib -Force
        Remove-Item $tmp -Force
        Ok "$($whl.filename)"
    }
    $bits = & $Python -c "import struct;print(struct.calcsize('P')*8)"
    $plat = if ($bits -eq '64') { 'win_amd64' } else { 'win32' }
    Get-Wheel 'dnslib' @('*py3-none-any.whl')
    Get-Wheel 'certifi' @('*py3-none-any.whl')
    try { Get-Wheel 'psutil' @("*abi3-$plat.whl", "*$plat.whl") }
    catch { Warn "psutil unavailable ($_) - blocking still works, but VPN/portable-browser killing is off" }
}
$check = & $Python -c "import sys; sys.path.insert(0, r'$lib'); import dnslib; print('dnslib', dnslib.version if hasattr(dnslib,'version') else 'ok')" 2>&1
if ($LASTEXITCODE) { throw "dnslib still cannot be imported: $check" }
Ok "libraries ready ($check)"


# ---------------------------------------------------------------- 5. locked data folder + config
Step "Locking data folder $Data (SYSTEM + Administrators only)"
New-Item -ItemType Directory -Force -Path $Data | Out-Null
& icacls $Data /inheritance:r /grant:r '*S-1-5-18:(OI)(CI)F' '*S-1-5-32-544:(OI)(CI)F' | Out-Null
Ok "done"

Step "Creating configuration - choose the ADMIN PANEL password (not the child's)"
& $Python (Join-Path $Dir 'focusguard.py') setup --user $User
if ($LASTEXITCODE) { throw "setup failed" }
& $Python (Join-Path $Dir 'focusguard.py') disarm | Out-Null   # guard stays off until the self-test passes

Step "Checking encrypted DNS (DoH) from this Python"
& $Python (Join-Path $Dir 'focusguard.py') selftest | ForEach-Object { Ok $_ }
if ($LASTEXITCODE) {
    Warn "Python cannot reach the DoH servers - see the FAIL lines above. Nothing on the network was changed."
    exit 2
}

# ---------------------------------------------------------------- 6. browser policies
Step "Applying browser policies (no secure-DNS bypass, no proxies)"
function Set-Pol([string]$Path, [string]$Name, $Value, [string]$Type = 'String') {
    if (-not (Test-Path $Path)) { New-Item -Path $Path -Force | Out-Null }
    New-ItemProperty -Path $Path -Name $Name -Value $Value -PropertyType $Type -Force | Out-Null
}
foreach ($p in 'HKLM:\SOFTWARE\Policies\Google\Chrome', 'HKLM:\SOFTWARE\Policies\Microsoft\Edge') {
    Set-Pol $p 'DnsOverHttpsMode' 'off'
    Set-Pol $p 'ProxyMode' 'direct'
    if ($LockExtensions) { Set-Pol "$p\ExtensionInstallBlocklist" '1' '*' }
}
Set-Pol 'HKLM:\SOFTWARE\Policies\Mozilla\Firefox\DNSOverHTTPS' 'Enabled' 0 'DWord'
Set-Pol 'HKLM:\SOFTWARE\Policies\Mozilla\Firefox\DNSOverHTTPS' 'Locked' 1 'DWord'
Set-Pol 'HKLM:\SOFTWARE\Policies\Mozilla\Firefox\Proxy' 'Mode' 'none'
Set-Pol 'HKLM:\SOFTWARE\Policies\Mozilla\Firefox\Proxy' 'Locked' 1 'DWord'
if ($LockExtensions) { Set-Pol 'HKLM:\SOFTWARE\Policies\Mozilla\Firefox' 'ExtensionSettings' '{"*":{"installation_mode":"blocked"}}' }
Ok "Chrome, Edge and Firefox policies set (restart the browsers; check chrome://policy, edge://policy, about:policies)"

# ---------------------------------------------------------------- 7. scheduled task (runs as SYSTEM)
Step "Registering the FocusGuard task (SYSTEM, starts at boot, auto-restarts)"
$action = New-ScheduledTaskAction -Execute $pyw -Argument "`"$Dir\focusguard.py`" run" -WorkingDirectory $Dir
$trigBoot = New-ScheduledTaskTrigger -AtStartup
$trigKeep = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(2) -RepetitionInterval (New-TimeSpan -Minutes 5)
$principal = New-ScheduledTaskPrincipal -UserId 'SYSTEM' -LogonType ServiceAccount -RunLevel Highest
$settings = New-ScheduledTaskSettingsSet -MultipleInstances IgnoreNew -RestartCount 999 `
    -RestartInterval (New-TimeSpan -Minutes 1) -ExecutionTimeLimit ([TimeSpan]::Zero) `
    -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable -DontStopOnIdleEnd
Register-ScheduledTask -TaskName 'FocusGuard' -Action $action -Trigger $trigBoot, $trigKeep `
    -Principal $principal -Settings $settings -Force | Out-Null
Start-ScheduledTask -TaskName 'FocusGuard'

# ---------------------------------------------------------------- 8. self-test
Step "Testing the local DNS filter"
$ready = $false; $lastErr = ''
for ($i = 0; $i -lt 20 -and -not $ready; $i++) {
    Start-Sleep -Seconds 2
    try {
        $r = Resolve-DnsName 'www.wikipedia.org' -Server 127.0.0.1 -Type A -DnsOnly -QuickTimeout -ErrorAction Stop
        $ip = $r | Where-Object IPAddress | Select-Object -First 1
        if ($ip) { $ready = $true }
    } catch { $lastErr = $_.Exception.Message }
}
if (-not $ready) {
    Warn "FocusGuard did not give a working answer on 127.0.0.1:53 ($lastErr)."
    Warn "Your DNS settings were NOT changed. See $Data\focusguard.log and send it for a fix."
    Get-Content (Join-Path $Data 'focusguard.log') -Tail 15 -ErrorAction SilentlyContinue | ForEach-Object { Warn $_ }
    exit 2
}
Ok "FocusGuard answers on 127.0.0.1 (wikipedia.org -> $($ip.IPAddress), upstream DoH works)"
& $Python (Join-Path $Dir 'focusguard.py') check www.youtube.com www.instagram.com en.wikipedia.org | ForEach-Object { Ok $_ }
Ok "Filtering is OFF while you ($env:USERNAME) are at the screen and ON when a restricted account signs in."

# ---------------------------------------------------------------- 9. point adapters at FocusGuard + firewall
Step "Pointing all network adapters to FocusGuard (127.0.0.1 / ::1)"
Get-NetAdapter -IncludeHidden -ErrorAction SilentlyContinue | ForEach-Object {
    try { Set-DnsClientServerAddress -InterfaceIndex $_.ifIndex -ServerAddresses ('127.0.0.1', '::1') -ErrorAction Stop } catch {} }
Clear-DnsClientCache
Ok "done"

Step "Adding firewall rules (no DNS to the outside except via FocusGuard)"
$remote = @('0.0.0.0-126.255.255.255', '128.0.0.0-255.255.255.255', '::2-ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff')
foreach ($proto in 'UDP', 'TCP') {
    foreach ($port in 53, 853) {
        New-NetFirewallRule -DisplayName "FocusGuard - block outbound $proto $port" -Group 'FocusGuard' `
            -Direction Outbound -Protocol $proto -RemotePort $port -RemoteAddress $remote -Action Block | Out-Null
    }
}
$doh = @('8.8.8.8', '8.8.4.4', '9.9.9.9', '149.112.112.112', '208.67.222.222', '208.67.220.220',
         '94.140.14.14', '94.140.15.15', '45.90.28.0/24', '45.90.30.0/24', '185.228.168.168',
         '185.228.169.168', '76.76.2.0/24', '2001:4860:4860::8888', '2001:4860:4860::8844',
         '2620:fe::fe', '2620:fe::9')
New-NetFirewallRule -DisplayName 'FocusGuard - block public DoH resolvers' -Group 'FocusGuard' `
    -Direction Outbound -RemoteAddress $doh -Action Block | Out-Null
Ok "firewall rules added"

& $Python (Join-Path $Dir 'focusguard.py') arm | ForEach-Object { Ok $_ }

# ---------------------------------------------------------------- 10. shortcut
$lnk = Join-Path ([Environment]::GetFolderPath('Desktop')) 'FocusGuard Admin.url'
"[InternetShortcut]`r`nURL=http://127.0.0.1:8765/" | Set-Content -Path $lnk -Encoding ASCII

Write-Host "`nFocusGuard is installed and running." -ForegroundColor Green
Write-Host "  Admin panel : http://127.0.0.1:8765  (shortcut on this desktop)"
Write-Host "  Restricted  : $User"
Write-Host "  Log         : $Data\focusguard.log"
Write-Host "  Uninstall   : $Dir\uninstall.ps1"
Write-Host "Restart Chrome/Edge/Firefox so the new policies apply, then sign in as $User to test."
Start-Process 'http://127.0.0.1:8765/'
