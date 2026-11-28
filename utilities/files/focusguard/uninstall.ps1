# =============================================================================
# TOOL    : FocusGuard uninstaller / emergency reset (run as Administrator)
# FAMILY  : focusguard
# VERSION : 1.0.0
# DATE    : 2026-10-04
# CHAT    : Windows 11 distraction blocker and screen-time limiter
# CHANGES : 1.0.0 - first release: removes task, firewall rules, browser policies,
#           logon hours; restores automatic DNS; optional -KeepData
# STATUS  : beta
# =============================================================================
<#
.SYNOPSIS  Removes FocusGuard and restores normal internet.  .\uninstall.ps1 [-KeepData]
#>
#Requires -RunAsAdministrator
param([switch]$KeepData)
$ErrorActionPreference = 'Continue'
$Dir  = Join-Path $env:ProgramFiles 'FocusGuard'
$Data = Join-Path $env:ProgramData 'FocusGuard'

Write-Host "Stopping FocusGuard..."
Stop-ScheduledTask -TaskName 'FocusGuard' -ErrorAction SilentlyContinue
Unregister-ScheduledTask -TaskName 'FocusGuard' -Confirm:$false -ErrorAction SilentlyContinue
Get-CimInstance Win32_Process -Filter "Name like 'python%'" | Where-Object { $_.CommandLine -like '*focusguard.py*' } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }

Write-Host "Restoring automatic DNS on all adapters..."
Get-NetAdapter -IncludeHidden -ErrorAction SilentlyContinue | ForEach-Object {
    try { Set-DnsClientServerAddress -InterfaceIndex $_.ifIndex -ResetServerAddresses -ErrorAction Stop } catch {} }
Clear-DnsClientCache

Write-Host "Removing firewall rules..."
Get-NetFirewallRule -Group 'FocusGuard' -ErrorAction SilentlyContinue | Remove-NetFirewallRule

Write-Host "Removing browser policies..."
foreach ($p in 'HKLM:\SOFTWARE\Policies\Google\Chrome', 'HKLM:\SOFTWARE\Policies\Microsoft\Edge') {
    Remove-ItemProperty -Path $p -Name 'DnsOverHttpsMode', 'ProxyMode' -ErrorAction SilentlyContinue
    Remove-Item -Path "$p\ExtensionInstallBlocklist" -Recurse -ErrorAction SilentlyContinue
}
Remove-Item 'HKLM:\SOFTWARE\Policies\Mozilla\Firefox\DNSOverHTTPS' -Recurse -ErrorAction SilentlyContinue
Remove-Item 'HKLM:\SOFTWARE\Policies\Mozilla\Firefox\Proxy' -Recurse -ErrorAction SilentlyContinue
Remove-ItemProperty 'HKLM:\SOFTWARE\Policies\Mozilla\Firefox' -Name 'ExtensionSettings' -ErrorAction SilentlyContinue

$cfgPath = Join-Path $Data 'config.json'
if (Test-Path $cfgPath) {
    $cfg = Get-Content $cfgPath -Raw | ConvertFrom-Json
    foreach ($u in $cfg.restricted_users) {
        Write-Host "Removing logon-hour limits for $u..."
        & net user $u /times:all | Out-Null
    }
}

if (-not $KeepData) {
    Remove-Item $Data -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item (Join-Path ([Environment]::GetFolderPath('Desktop')) 'FocusGuard Admin.url') -ErrorAction SilentlyContinue
    if ($PSScriptRoot -ne $Dir) { Remove-Item $Dir -Recurse -Force -ErrorAction SilentlyContinue }
    else { Write-Host "Delete $Dir manually after closing this window." }
}
Write-Host "FocusGuard removed. Internet is back to normal (restart browsers)." -ForegroundColor Green
