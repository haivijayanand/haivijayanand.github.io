"""
TOOL:    Vijay_Wiki articles — groups 8 and 9 (computing for engineers; management and planning)
FAMILY:  vijay-wiki
VERSION: 1.0.0
DATE:    2026-11-24
CHAT:    claude.ai — Vijay_Wiki: build all suggested topics in groups and upload
CHANGES: 1.0.0 Initial five articles: PowerShell, legacy test PC migration, git versioning, stock management, test programme planning
"""
import math
import numpy as np
from wiki import plot, flow, bars, fig, table, box, formula, esc

ARTICLES = []


def code(s):
    return f"<pre>{esc(s.strip())}</pre>"

# =====================================================================================
# 43. POWERSHELL
# =====================================================================================
ARTICLES.append(dict(
    slug="powershell-for-engineers", group="computing",
    title="PowerShell for Engineers: Files, Inventory, Backups and Safe Automation",
    short="PowerShell",
    tags=["PowerShell", "Windows", "Automation", "Scripting"],
    desc="Practical Windows PowerShell for engineers: objects and the pipeline, finding and cleaning files, duplicate detection by hash, system inventory with CIM, robocopy backups, scheduled tasks and safe-scripting habits.",
    blurb="Everyday PowerShell recipes for test PCs and file stores: inventory, duplicates, backups, scheduling, done safely.",
    lead="PowerShell ships with every modern Windows PC and is the quickest way to automate repetitive admin on lab and office machines: listing what is installed, finding large or duplicate files, backing up data folders, and scheduling jobs. Its key difference from the old command prompt is that commands pass objects, not text, so filtering and sorting are reliable.",
    takeaways=[
        "Commands are Verb-Noun cmdlets (Get-ChildItem, Copy-Item); Get-Help and Get-Command find what you need.",
        "The pipeline passes objects: Get-ChildItem | Where-Object Length -gt 1GB | Sort-Object Length.",
        "Find duplicates reliably by grouping on Get-FileHash, not on names or sizes alone.",
        "Use robocopy for robust backups and mirrors, with logs and retry limits.",
        "Work safely: test with -WhatIf, log with Start-Transcript, stop on errors with try/catch and -ErrorAction Stop, never delete before checking.",
    ],
    body=f'''
<h2 id="basics">1. Basics</h2>
{table(["Task","Command"],[["Help on a command","<code>Get-Help Get-ChildItem -Examples</code>"],["Find commands","<code>Get-Command *Item*</code>"],["See object properties","<code>Get-ChildItem | Get-Member</code>"],["Filter","<code>Where-Object { $_.Length -gt 100MB }</code>"],["Sort and pick","<code>Sort-Object Length -Descending | Select-Object -First 20</code>"],["Export","<code>Export-Csv report.csv -NoTypeInformation</code>"],["Allow local scripts (current user)","<code>Set-ExecutionPolicy -Scope CurrentUser RemoteSigned</code>"]])}

<h2 id="files">2. Files: large, old and duplicate</h2>
{code(r"""
# 20 largest files under D:\Data
Get-ChildItem D:\Data -Recurse -File -ErrorAction SilentlyContinue |
  Sort-Object Length -Descending | Select-Object -First 20 FullName, @{n='MB';e={[math]::Round($_.Length/1MB,1)}}

# Files not modified for 2 years (report only)
$cut = (Get-Date).AddYears(-2)
Get-ChildItem D:\Data -Recurse -File | Where-Object LastWriteTime -lt $cut |
  Export-Csv old_files.csv -NoTypeInformation

# Duplicates by content hash (size first, then hash only same-size files)
Get-ChildItem E:\ -Recurse -File | Group-Object Length | Where-Object Count -gt 1 |
  ForEach-Object { $_.Group | Get-FileHash -Algorithm SHA256 } |
  Group-Object Hash | Where-Object Count -gt 1 |
  ForEach-Object { $_.Group | Select-Object Hash, Path } | Export-Csv duplicates.csv -NoTypeInformation
""")}

<h2 id="inventory">3. System inventory</h2>
{code(r"""
$cs = Get-CimInstance Win32_ComputerSystem
$os = Get-CimInstance Win32_OperatingSystem
[pscustomobject]@{
  Name = $cs.Name; Model = $cs.Model; RAM_GB = [math]::Round($cs.TotalPhysicalMemory/1GB,1)
  OS = $os.Caption; Build = $os.BuildNumber; Arch = $os.OSArchitecture
} | Export-Csv inventory.csv -NoTypeInformation

# Installed programs (registry, faster and safer than Win32_Product)
$keys = 'HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*',
        'HKLM:\Software\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*'
Get-ItemProperty $keys | Where-Object DisplayName |
  Select-Object DisplayName, DisplayVersion, Publisher | Sort-Object DisplayName |
  Export-Csv installed.csv -NoTypeInformation

Get-PnpDevice -PresentOnly | Select-Object Class, FriendlyName, Status | Export-Csv devices.csv -NoTypeInformation
""")}

<h2 id="backup">4. Backups with robocopy</h2>
{code(r"""
# Mirror D:\TestData to a backup drive, retry once, log everything
robocopy D:\TestData F:\Backup\TestData /MIR /R:1 /W:1 /FFT /NP /LOG+:F:\Backup\robocopy.log
# /MIR deletes files at the destination that no longer exist at the source - check the path twice.
""")}
{table(["Switch","Meaning"],[["/E","Copy subfolders including empty ones"],["/MIR","Mirror (= /E + delete extras at destination)"],["/R:n /W:s","Retry count and wait between retries"],["/XO","Exclude older files (incremental)"],["/MT:16","Multi-threaded copy"],["/L","List only — dry run"],["/LOG+:file","Append to a log file"]])}

<h2 id="schedule">5. Scheduling</h2>
{code(r"""
$act = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument '-NoProfile -File C:\Scripts\backup.ps1'
$trg = New-ScheduledTaskTrigger -Daily -At 23:30
Register-ScheduledTask -TaskName 'Nightly data backup' -Action $act -Trigger $trg -RunLevel Highest
""")}

<h2 id="safety">6. Safe habits</h2>
<ul><li>Run destructive commands with <code>-WhatIf</code> first; review the list before removing it.</li>
<li><code>Start-Transcript</code> at the top of scripts to keep a record of what ran.</li>
<li>Use <code>try {{ … }} catch {{ … }}</code> with <code>-ErrorAction Stop</code> so failures are caught instead of scrolling past.</li>
<li>Move files to a "_to_delete" folder rather than deleting outright; delete later after checking.</li>
<li>Keep scripts in version control with a header block (purpose, version, date, changes).</li></ul>
''',
    calcs=[dict(id="ps", title="Command builder",
                note="Fills in a tested pattern with your paths. Review the command before running it; robocopy /MIR deletes extra files at the destination.",
                presets=[dict(label="Large files report", v=dict(task="large", src="D:\\Data", dst="F:\\Backup\\Data", n=20, days=730, ext="*.*")), dict(label="Mirror backup", v=dict(task="mirror", src="D:\\TestData", dst="F:\\Backup\\TestData", n=20, days=730, ext="*.*")),
                         dict(label="Duplicates by hash", v=dict(task="dup", src="E:\\", dst="F:\\", n=20, days=730, ext="*.csv"))],
                inputs=[dict(id="task", label="Task", value="large", options=[("large", "List largest files"), ("old", "List files older than N days"), ("dup", "Find duplicates (hash)"), ("mirror", "Robocopy mirror"), ("dry", "Robocopy dry run (/L)")]),
                        dict(id="src", label="Source folder", value="D:\\Data", text=True), dict(id="dst", label="Destination folder", value="F:\\Backup\\Data", text=True),
                        dict(id="n", label="How many (largest)", value=20), dict(id="days", label="Older than (days)", value=730), dict(id="ext", label="File filter", value="*.*", text=True)],
                js='''function e(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
var c="";
if(v.task==="large")c="Get-ChildItem '"+v.src+"' -Recurse -File -Filter '"+v.ext+"' -ErrorAction SilentlyContinue |\\n  Sort-Object Length -Descending | Select-Object -First "+v.n+" FullName, @{n='MB';e={[math]::Round($_.Length/1MB,1)}}";
if(v.task==="old")c="$cut = (Get-Date).AddDays(-"+v.days+")\\nGet-ChildItem '"+v.src+"' -Recurse -File -Filter '"+v.ext+"' | Where-Object LastWriteTime -lt $cut |\\n  Select-Object FullName, LastWriteTime, Length | Export-Csv old_files.csv -NoTypeInformation";
if(v.task==="dup")c="Get-ChildItem '"+v.src+"' -Recurse -File -Filter '"+v.ext+"' | Group-Object Length | Where-Object Count -gt 1 |\\n  ForEach-Object { $_.Group | Get-FileHash -Algorithm SHA256 } | Group-Object Hash | Where-Object Count -gt 1 |\\n  ForEach-Object { $_.Group | Select-Object Hash, Path } | Export-Csv duplicates.csv -NoTypeInformation";
if(v.task==="mirror")c="robocopy \\""+v.src+"\\" \\""+v.dst+"\\" /MIR /R:1 /W:1 /FFT /NP /LOG+:\\""+v.dst+"_robocopy.log\\"";
if(v.task==="dry")c="robocopy \\""+v.src+"\\" \\""+v.dst+"\\" /MIR /L /R:1 /W:1 /NP /LOG:\\""+v.dst+"_dryrun.log\\"";
return {rows:[["Task",v.task]],html:"<pre>"+e(c)+"</pre>",verdict:v.task==="mirror"?["caution","/MIR removes destination files that are not in the source: run the dry-run version first."]:["ok","Read-only / report command."]};''')],
    quiz=[
        dict(q="PowerShell pipelines pass:", o=["Plain text only", "Objects with properties", "Bytes", "Nothing"], a=1, e="Objects, so filtering by property is reliable."),
        dict(q="The safest way to find duplicate files is by:", o=["File name", "Modified date", "Content hash", "Folder"], a=2, e="Identical content gives identical hashes."),
        dict(q="Which switch previews a PowerShell action without doing it?", o=["-Force", "-WhatIf", "-Recurse", "-Verbose"], a=1, e="-WhatIf shows what would happen."),
        dict(q="robocopy /MIR:", o=["Only copies new files", "Mirrors and deletes extras at the destination", "Compresses", "Encrypts"], a=1, e="Mirror including deletions."),
        dict(q="Why prefer registry uninstall keys over Win32_Product for installed programs?", o=["They are prettier", "Win32_Product is slow and can trigger MSI repairs", "Registry is encrypted", "No reason"], a=1, e="Win32_Product enumerates and re-validates MSI packages."),
        dict(q="Start-Transcript is used to:", o=["Speed up scripts", "Record a log of the session", "Encrypt output", "Schedule tasks"], a=1, e="Keeps a record."),
        dict(q="robocopy /MT:16 means how many threads?", num=16, e="Multi-threaded copy with 16 threads."),
        dict(q="Days in two years (no leap day) used for -AddDays?", num=730, e="2 × 365 = 730."),
    ],
    refs=["Microsoft Learn, PowerShell documentation (about_Pipelines, about_Try_Catch_Finally, Get-FileHash, Get-CimInstance).", "Microsoft Learn, robocopy command reference.", "Jones, D. and Hicks, J., Learn PowerShell in a Month of Lunches, 4th ed., Manning, 2022."],
    links=[("Microsoft Learn — PowerShell", "https://learn.microsoft.com/powershell/"), ("Microsoft Learn — robocopy", "https://learn.microsoft.com/windows-server/administration/windows-commands/robocopy")],
))

# =====================================================================================
# 44. LEGACY TEST-RIG PC MIGRATION
# =====================================================================================
size_gb, rate = 500, 80
img_h = size_gb * 1024 / rate / 3600
ARTICLES.append(dict(
    slug="migrating-legacy-test-rig-pcs", group="computing",
    title="Migrating Legacy Test-Rig and Controller PCs: Inventory, Imaging, Compatibility and Validation",
    short="Legacy PC migration",
    tags=["Test rigs", "Migration", "DAQ", "Windows"],
    desc="A practical method for moving a test rig or machine controller from an old, failing PC to new hardware: inventory, disk imaging with bad sectors, driver and licence compatibility, migration options, validation and rollback.",
    blurb="How to move a rig's control and acquisition PC to new hardware without losing software, licences, channels or safety functions.",
    lead="Many test rigs and machines are run by a PC that is ten or more years old: an unsupported operating system, an ageing disk, special interface cards and software that nobody has the installer for. When that PC fails, the rig stops. A planned migration starts by capturing everything about the old system, then rebuilds and proves the new one before the old one is retired.",
    takeaways=[
        "Image the old disk first, before any repair attempt; use tools that skip and retry bad sectors.",
        "Inventory everything: OS, software versions, drivers, interface cards (PCI vs PCIe), serial ports, licences and dongles, network settings, configuration files.",
        "Check compatibility early: 32-bit software and drivers, card support on the new OS, software runtime versions.",
        "Options: like-for-like rebuild, upgrade of software versions, or virtualise the application (only when no special hardware cards are needed).",
        "Validate channel by channel and test every interlock and trip before the rig runs a real test; keep the old PC (or its image) as rollback.",
    ],
    body=f'''
<h2 id="plan">1. Plan</h2>
{fig(flow(["Protect|image old disk","Inventory|hardware, software, licences","Decide|rebuild, upgrade, virtualise","Build|new PC, drivers, apps","Validate|channels, timing, interlocks","Cut over|keep rollback"], h=130), "Figure 1. Migration sequence.")}

<h2 id="inventory">2. Inventory checklist</h2>
{table(["Area","Capture"],[["Operating system","Edition, build, 32/64-bit, language, regional settings (decimal separator!)"],["Applications","Names, exact versions, installers, patches, run-time engines, configuration files and their paths"],
["Drivers and cards","DAQ, motion, GPIB, CAN, serial cards: make, model, bus (PCI/PCIe/USB), driver versions"],["Licences","Licence files, activation, dongles, MAC- or disk-bound keys; vendor contact for transfer"],
["Communications","IP addresses, subnet, PLC addresses, COM port numbers and settings, Modbus/OPC configuration"],["Data","Data folders, databases, report templates, calibration files"],["Users and startup","Auto-login, startup programs, scheduled tasks, shortcuts, UPS shutdown software"]])}
<p>Scripts (e.g. PowerShell exporting installed programs, devices, network configuration and services to CSV) make the inventory complete and repeatable.</p>

<h2 id="imaging">3. Imaging a failing disk</h2>
<ul><li>Stop using the disk; every boot risks more damage.</li><li>Connect it as a secondary disk to a working machine or boot a recovery environment.</li>
<li>Use a recovery-aware imager (e.g. GNU ddrescue) that copies good areas first and retries bad sectors later, with a map file to resume.</li>
<li>Work only on the image copy; keep the original disk untouched.</li></ul>
{formula("Imaging time ≈ disk size / sustained read rate   (bad areas can add hours)\nExample: 500 GB at 80 MB/s ≈ 1.8 h")}

<h2 id="options">4. Migration options</h2>
{table(["Option","When it fits","Risks"],[["Like-for-like rebuild on new hardware, same software versions","Software is stable and supported on the new OS","Old drivers may not install on new OS or 64-bit"],
["Upgrade software to current versions","Vendor supports upgrade; time for testing","Behaviour changes; re-validation needed"],["Virtual machine running the old OS","No special interface cards (or USB/Ethernet I/O only)","Timing and passthrough limits; old OS still unsupported"],
["Replace interfaces (e.g. PCI card → Ethernet/USB DAQ)","Old cards unavailable","Software changes for new hardware"]])}

<h2 id="validation">5. Validation and cut-over</h2>
<ul><li>Compare each channel with a known input (calibrator, reference sensor) on old and new systems.</li>
<li>Check sample rates, timing, file formats and naming match what downstream analysis expects.</li>
<li>Test every interlock, trip and E-stop path with the rig in a safe state.</li>
<li>Run a short supervised test; compare data with a previous test at the same condition.</li>
<li>Keep the old PC or its image ready to restore until the new system has run reliably for an agreed period.</li></ul>
''',
    calcs=[dict(id="mig", title="Migration readiness and imaging time",
                presets=[dict(label="Typical starting point", v=dict(img="no", inv="partial", inst="no", lic="unknown", drv="unknown", val="no", rb="no", gb=500, mbps=80))],
                inputs=[dict(id="img", label="Disk image taken?", value="no", options=[("yes", "Yes"), ("no", "No")]), dict(id="inv", label="Inventory complete?", value="partial", options=[("yes", "Yes"), ("partial", "Partial"), ("no", "No")]),
                        dict(id="inst", label="Installers and licences in hand?", value="no", options=[("yes", "Yes"), ("no", "No")]), dict(id="lic", label="Licence transfer agreed with vendor?", value="unknown", options=[("yes", "Yes"), ("unknown", "Unknown"), ("no", "No")]),
                        dict(id="drv", label="Drivers available for new OS?", value="unknown", options=[("yes", "Yes"), ("unknown", "Unknown"), ("no", "No")]), dict(id="val", label="Validation plan written?", value="no", options=[("yes", "Yes"), ("no", "No")]),
                        dict(id="rb", label="Rollback possible?", value="no", options=[("yes", "Yes"), ("no", "No")]), dict(id="gb", label="Disk size (GB)", value=500), dict(id="mbps", label="Read rate (MB/s)", value=80)],
                js='''var w={img:20,inv:15,inst:15,lic:10,drv:15,val:15,rb:10},s=0,miss=[];
function sc(k,val){if(val==="yes")return w[k];if(val==="partial"||val==="unknown")return w[k]/2;return 0;}
var names={img:"disk image",inv:"inventory",inst:"installers/licences",lic:"licence transfer",drv:"drivers",val:"validation plan",rb:"rollback"};
for(var k in w){var x=sc(k,v[k]);s+=x;if(x<w[k])miss.push(names[k]);}
var h=v.gb*1024/v.mbps/3600;
return {rows:[["Readiness score",fmt(s,0)+" / 100"],["Imaging time (healthy disk)",fmt(h,2)+" h"],["Open items",miss.length?miss.join(", "):"none"]],
verdict:v.img!=="yes"?["bad","Take a disk image first: everything else depends on it."]:(s>=80?["ok","Ready to build and validate."]:["caution","Close the open items before cut-over."])};''')],
    quiz=[
        dict(q="The first step with a failing controller PC is:", o=["Reinstall Windows", "Image the disk", "Run disk repair", "Buy new software"], a=1, e="Protect the data before anything else."),
        dict(q="Why use a recovery-aware imager such as ddrescue?", o=["It is faster on good disks", "It skips bad areas first and retries later, with a resumable map", "It encrypts", "It defragments"], a=1, e="Maximises recovered data."),
        dict(q="A virtual machine is a poor choice when the rig uses:", o=["Ethernet I/O", "Internal PCI interface cards", "USB keyboards", "Network printers"], a=1, e="Hardware passthrough is limited."),
        dict(q="Regional settings matter because:", o=["Fonts change", "Decimal separators can break data files and parsing", "Licences depend on them", "They do not matter"], a=1, e="Comma vs point."),
        dict(q="Before the first real test on the new PC you must test:", o=["Wallpaper", "Every interlock, trip and E-stop path", "Printer", "Internet speed"], a=1, e="Safety functions first."),
        dict(q="Rollback means:", o=["Deleting the old system", "Being able to return to the old system quickly", "Undoing a git commit", "Rewinding data"], a=1, e="Keep the old PC or image ready."),
        dict(q="Image 250 GB at 100 MB/s. Time in hours (1 GB = 1024 MB)?", num=0.711, unit="h", e="256,000 MB / 100 / 3600 = 0.71 h."),
        dict(q="Seven checklist items, five complete. Percentage complete?", num=71.43, unit="%", e="5/7 = 71.4 %."),
    ],
    refs=["GNU ddrescue manual, Free Software Foundation.", "NI (National Instruments), operating system and driver compatibility tables for LabVIEW and NI-DAQmx.", "ISO/IEC 25010, Systems and software quality models (maintainability, portability).", "Microsoft Learn, Windows lifecycle and compatibility documentation."],
    links=[("GNU ddrescue", "https://www.gnu.org/software/ddrescue/"), ("Wikipedia — Disk image", "https://en.wikipedia.org/wiki/Disk_image")],
))

# =====================================================================================
# 45. VERSIONING CODE WITH GIT
# =====================================================================================
ARTICLES.append(dict(
    slug="versioning-and-cataloguing-code", group="computing",
    title="Versioning and Cataloguing Engineering Code: Header Blocks, Semantic Versions and Git",
    short="Versioning code",
    tags=["Git", "Version control", "Semantic versioning", "Documentation"],
    desc="Keeping engineering scripts and tools under control: standard header blocks, semantic versioning rules, a minimal git workflow, repository layout by tool family, portable relative paths, generated catalogues and backups.",
    blurb="Header blocks, MAJOR.MINOR.PATCH rules and a simple git routine that keep dozens of scripts and HTML tools findable and trustworthy.",
    lead="Engineers accumulate scripts and small tools quickly: data converters, calculators, rig controllers, report generators. Without discipline, copies multiply on laptops and pen drives, and nobody knows which is current. A small set of habits fixes this: a header block in every file, semantic version numbers, git history, a predictable folder layout, and a catalogue generated from the headers.",
    takeaways=[
        "Put a header block at the top of every file: tool name, family, version, date, origin and a changes line.",
        "Semantic versioning MAJOR.MINOR.PATCH: breaking change → MAJOR, new feature → MINOR, fix → PATCH.",
        "Git gives history and safe experiments: commit small logical changes with clear messages; tag releases.",
        "Group tools into family repositories under one portable root and use relative links so the root can move between drives.",
        "Generate a catalogue (index page) by scanning headers, and keep three copies on two media types, one off-site (3-2-1).",
    ],
    body=f'''
<h2 id="header">1. Header blocks</h2>
{code('''<!DOCTYPE html>
<!--
TOOL:    Spring Rate Calculator
FAMILY:  spring-tools
VERSION: 2.3.1
DATE:    2026-11-24
CHAT:    origin / discussion reference
CHANGES: 2.3.1 Fixed unit conversion for N/mm to lbf/in
STATUS:  Released
-->''')}
<p>In Python, use a module docstring or comment block with the same fields and keep <code>__version__</code> in step with VERSION. A catalogue script can then read every file's header without running it.</p>

<h2 id="semver">2. Semantic versioning</h2>
{table(["Change","Bump","Example"],[["Breaking change: inputs, outputs or file format no longer compatible","MAJOR","1.4.2 → 2.0.0"],["New feature, backward compatible","MINOR","1.4.2 → 1.5.0"],["Bug fix, no new feature","PATCH","1.4.2 → 1.4.3"],["Pre-release","suffix","2.0.0-rc.1"]])}

<h2 id="git">3. A minimal git routine</h2>
{code('''git init                              # once per repository
git add spring_calc.html
git commit -m "spring-tools 2.3.1: fix N/mm to lbf/in conversion"
git tag v2.3.1                         # mark a release
git log --oneline --graph              # history
git switch -c try-new-layout           # experiment safely on a branch
git switch main && git merge try-new-layout
git push origin main --tags            # if a remote (e.g. GitHub, private) is used''')}
{table(["Good practice","Why"],[["One logical change per commit","Easy to review and undo"],["Message: what and why, with version","History reads like a change log"],[".gitignore for outputs, data, secrets","Keeps repos small and safe"],["Tags for releases","Exact version can be rebuilt"],["Private remote or second disk","Backup and access from other machines"]])}

<h2 id="layout">4. Layout and catalogue</h2>
{fig(flow(["Portable root|e.g. CODE_BASE","Family repos|spring-tools, vib-tools…","Each tool|header + version","Catalogue script|scan headers","index.html|relative links"], h=130), "Figure 1. A portable code base: one root, family repositories, and a generated index with relative links.")}
<ul><li>Use relative links (<code>spring-tools/spring_calc.html</code>), never drive letters, so the root works from any drive or path.</li>
<li>The catalogue script reads TOOL, FAMILY, VERSION, DATE and CHANGES, warns about files without headers or with duplicate names, and writes the index.</li>
<li>Backups: 3 copies, 2 media types, 1 off-site (for example: working drive, external drive, private cloud repository).</li></ul>
''',
    calcs=[dict(id="ver", title="Version bump and header block generator",
                presets=[dict(label="Patch fix", v=dict(cur="2.3.0", kind="patch", tool="Spring Rate Calculator", fam="spring-tools", date="2026-11-24", chg="Fixed unit conversion", lang="html")),
                         dict(label="Breaking change, Python", v=dict(cur="1.7.4", kind="major", tool="Data Converter", fam="vib-tools", date="2026-11-24", chg="New output file format", lang="py"))],
                inputs=[dict(id="cur", label="Current version", value="2.3.0", text=True), dict(id="kind", label="Change type", value="patch", options=[("major", "Breaking (MAJOR)"), ("minor", "Feature (MINOR)"), ("patch", "Fix (PATCH)")]),
                        dict(id="tool", label="Tool name", value="Spring Rate Calculator", text=True), dict(id="fam", label="Family", value="spring-tools", text=True), dict(id="date", label="Date", value="2026-11-24", text=True),
                        dict(id="chg", label="Change summary", value="Fixed unit conversion", text=True), dict(id="lang", label="File type", value="html", options=[("html", "HTML"), ("py", "Python")])],
                js='''var p=v.cur.split(".").map(function(x){return parseInt(x,10)||0;});while(p.length<3)p.push(0);
if(v.kind==="major"){p[0]++;p[1]=0;p[2]=0;}else if(v.kind==="minor"){p[1]++;p[2]=0;}else p[2]++;var nv=p.join(".");
function e(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
var body="TOOL:    "+v.tool+"\\nFAMILY:  "+v.fam+"\\nVERSION: "+nv+"\\nDATE:    "+v.date+"\\nCHAT:    (origin / discussion reference)\\nCHANGES: "+nv+" "+v.chg;
var h=v.lang==="html"?"<!DOCTYPE html>\\n<!--\\n"+body+"\\n-->":'"""\\n'+body+'\\n"""\\n__version__ = "'+nv+'"';
return {rows:[["New version",nv],["Git tag","v"+nv],["Commit message",v.fam+" "+nv+": "+v.chg]],html:"<pre>"+e(h)+"</pre>"};''')],
    quiz=[
        dict(q="A bug fix with no new features changes version 3.2.5 to:", o=["4.0.0", "3.3.0", "3.2.6", "3.2.5.1"], a=2, e="PATCH bump."),
        dict(q="A change that breaks existing input files should bump:", o=["PATCH", "MINOR", "MAJOR", "Nothing"], a=2, e="Incompatible change."),
        dict(q="Why use relative links in a code base index?", o=["Shorter", "The root folder can move to another drive or machine", "Git needs them", "Faster"], a=1, e="Portability."),
        dict(q="git tag is used to:", o=["Delete commits", "Mark a release version", "Create a branch", "Push"], a=1, e="Named pointer to a commit."),
        dict(q="The 3-2-1 backup rule means:", o=["3 backups per day", "3 copies, 2 media types, 1 off-site", "3 disks in RAID", "Every 3 days"], a=1, e="Resilient backup."),
        dict(q="Files that should normally go in .gitignore:", o=["Source code", "Generated outputs, large data and secrets", "README", "Header blocks"], a=1, e="Keep repos small and safe."),
        dict(q="Version 1.9.9 gets a new feature. What MINOR number results (enter it)?", num=10, e="1.10.0 — minor goes 9 → 10, patch resets."),
        dict(q="Version 2.4.7 gets a breaking change. Enter the new MAJOR number.", num=3, e="3.0.0."),
    ],
    refs=["Preston-Werner, T., Semantic Versioning 2.0.0, semver.org.", "Chacon, S. and Straub, B., Pro Git, 2nd ed., Apress, 2014 (free online).", "Wilson, G. et al., 'Good enough practices in scientific computing', PLOS Computational Biology, 13(6), 2017."],
    links=[("Semantic Versioning", "https://semver.org"), ("Pro Git book", "https://git-scm.com/book/en/v2")],
))

# =====================================================================================
# 46. STOCK MANAGEMENT
# =====================================================================================
D, S, Hc = 12000.0, 1500.0, 20.0
EOQ = math.sqrt(2 * D * S / Hc)
d, sd, LT, z = 40.0, 10.0, 9.0, 1.65
SS = z * sd * math.sqrt(LT)
ROP = d * LT + SS
qq = np.linspace(200, 4000, 200)
costplot = plot([dict(pts=[(float(q), float(D / q * S)) for q in qq], label="ordering cost D·S/Q", at=500),
                 dict(pts=[(float(q), float(q / 2 * Hc)) for q in qq], label="holding cost Q·H/2", at=3200),
                 dict(pts=[(float(q), float(D / q * S + q / 2 * Hc)) for q in qq], label="total", at=2500)],
                "order quantity Q (units)", "annual cost (₹)", xlim=(200, 4000), ylim=(0, 60000), h=320, points=[(EOQ, D / EOQ * S + EOQ / 2 * Hc, f"EOQ ≈ {EOQ:.0f}")])

ARTICLES.append(dict(
    slug="stock-management-eoq-safety-stock", group="management",
    title="Stock Management: EOQ, Safety Stock, Reorder Point and ABC Analysis",
    short="Stock management",
    tags=["Inventory", "EOQ", "Safety stock", "Operations"],
    desc="Inventory control basics: economic order quantity, safety stock from demand variability and lead time, reorder point, service levels, ABC classification and inventory turns.",
    blurb="How much to order, when to order, and how much buffer to hold, with EOQ, safety stock and reorder point.",
    lead="Holding stock costs money (capital, space, obsolescence); running out costs more (lost production, urgent freight). Three numbers balance these: the economic order quantity, the safety stock that absorbs variation in demand and supply, and the reorder point that triggers each order. ABC analysis tells you where to spend management attention.",
    takeaways=[
        "EOQ = √(2·D·S/H): D annual demand, S cost per order, H holding cost per unit per year.",
        "At EOQ, annual ordering cost equals annual holding cost; total cost is flat near the optimum, so rounding is cheap.",
        "Safety stock SS = z·σ<sub>d</sub>·√LT for demand variability (z = 1.65 for 95 % cycle service level).",
        "Reorder point ROP = average demand during lead time + safety stock.",
        "ABC: about 20 % of items (A) carry about 80 % of value; control them tightly.",
    ],
    body=f'''
<h2 id="eoq">1. Economic order quantity</h2>
{formula("Annual cost = (D/Q)·S + (Q/2)·H\nEOQ = √(2·D·S / H)\nOrders per year = D / EOQ;   cycle time = EOQ / daily demand")}
{fig(costplot, "Figure 1. Annual ordering, holding and total cost against order quantity. The total curve is flat near the EOQ.")}

<h2 id="safety">2. Safety stock and reorder point</h2>
{formula("SS = z · σ_d · √LT                     (demand variability, constant lead time)\nSS = z · √(LT·σ_d² + d²·σ_LT²)         (demand and lead-time variability)\nROP = d · LT + SS")}
{table(["Cycle service level","z"],[["90 %","1.28"],["95 %","1.65"],["97.5 %","1.96"],["98 %","2.05"],["99 %","2.33"],["99.9 %","3.09"]],num_cols=(1,))}

<h2 id="abc">3. ABC analysis and KPIs</h2>
{table(["Class","Share of items","Share of annual value","Control"],[["A","≈ 10–20 %","≈ 70–80 %","Tight: frequent review, accurate forecasts, low safety stock in value terms"],["B","≈ 30 %","≈ 15–25 %","Moderate"],["C","≈ 50–60 %","≈ 5 %","Simple rules, larger buffers, bulk ordering"]])}
<p>Inventory turnover = annual cost of goods used ÷ average inventory value; days of stock = 365 ÷ turns. Combine ABC with criticality (VED: vital, essential, desirable) for spares.</p>

<h2 id="example">4. Worked example</h2>
<p>D = {D:,.0f} units/yr, S = ₹{S:,.0f} per order, H = ₹{Hc:.0f}/unit/yr; daily demand {d:.0f} ± {sd:.0f} (σ), lead time {LT:.0f} days, 95 % service.</p>
{table(["Quantity","Value"],[["EOQ",f"<b>{EOQ:,.0f} units</b>"],["Orders per year",f"{D/EOQ:.1f}"],["Safety stock",f"{SS:.0f} units"],["Reorder point",f"<b>{ROP:.0f} units</b>"],["Average stock",f"{EOQ/2+SS:,.0f} units"]],num_cols=(1,))}
''',
    calcs=[dict(id="inv", title="EOQ, safety stock and reorder point",
                presets=[dict(label="Worked example", v=dict(D=12000, S=1500, H=20, d=40, sd=10, LT=9, sLT=0, z="1.65"))],
                inputs=[dict(id="D", label="Annual demand D", value=12000), dict(id="S", label="Cost per order S (₹)", value=1500), dict(id="H", label="Holding cost per unit per year H (₹)", value=20),
                        dict(id="d", label="Average daily demand", value=40), dict(id="sd", label="Std dev of daily demand", value=10), dict(id="LT", label="Lead time (days)", value=9), dict(id="sLT", label="Std dev of lead time (days)", value=0),
                        dict(id="z", label="Service level", value="1.65", options=[("1.28", "90 %"), ("1.65", "95 %"), ("1.96", "97.5 %"), ("2.05", "98 %"), ("2.33", "99 %"), ("3.09", "99.9 %")])],
                js='''var z=parseFloat(v.z),Q=Math.sqrt(2*v.D*v.S/v.H),SS=z*Math.sqrt(v.LT*v.sd*v.sd+v.d*v.d*v.sLT*v.sLT),R=v.d*v.LT+SS,TC=v.D/Q*v.S+Q/2*v.H;
var pts=[];for(var q=Q/5;q<=Q*3;q+=Q/40)pts.push([q,v.D/q*v.S+q/2*v.H]);
return {rows:[["EOQ",fmt(Q,0)+" units"],["Orders per year",fmt(v.D/Q,1)],["Annual ordering + holding",fmt(TC,0)+" ₹"],["Safety stock",fmt(SS,0)+" units"],["Reorder point",fmt(R,0)+" units"],["Average inventory",fmt(Q/2+SS,0)+" units"]],
svg:plotSVG([{pts:pts,label:"total cost"}],{xlabel:"order quantity",ylabel:"₹/yr",ymin:0,marks:[[Q,TC,"EOQ"]]}),caption:"Total annual cost against order quantity."};''')],
    quiz=[
        dict(q="At the EOQ, annual ordering cost is:", o=["Zero", "Equal to annual holding cost", "Twice holding cost", "Maximum"], a=1, e="The two cost lines cross at the optimum."),
        dict(q="If ordering cost S quadruples, EOQ:", o=["Quadruples", "Doubles", "Halves", "Unchanged"], a=1, e="EOQ ∝ √S."),
        dict(q="Safety stock protects against:", o=["Price rises", "Variability in demand and lead time", "Theft", "Obsolescence"], a=1, e="Buffer for uncertainty."),
        dict(q="z for 95 % cycle service level:", o=["1.28", "1.65", "2.33", "3.0"], a=1, e="One-sided 95 %."),
        dict(q="Class A items in ABC analysis are:", o=["Most numerous", "Highest annual value, few in number", "Cheapest", "Obsolete"], a=1, e="Pareto principle."),
        dict(q="Reorder point equals:", o=["EOQ", "Lead-time demand + safety stock", "Safety stock only", "Annual demand / 12"], a=1, e="ROP = d·LT + SS."),
        dict(q="D = 5000/yr, S = ₹400, H = ₹10. EOQ?", num=632.5, unit="units", e="√(2×5000×400/10) = √400,000 = 632."),
        dict(q="d = 20/day, LT = 10 days, SS = 50. Reorder point?", num=250, unit="units", e="200 + 50 = 250."),
    ],
    refs=["Silver, E. A., Pyke, D. F. and Thomas, D. J., Inventory and Production Management in Supply Chains, 4th ed., CRC Press, 2016.", "Chopra, S. and Meindl, P., Supply Chain Management, 7th ed., Pearson.", "Harris, F. W., 'How many parts to make at once', Factory, The Magazine of Management, 1913 (original EOQ)."],
    links=[("Wikipedia — Economic order quantity", "https://en.wikipedia.org/wiki/Economic_order_quantity"), ("Wikipedia — Safety stock", "https://en.wikipedia.org/wiki/Safety_stock")],
))

# =====================================================================================
# 47. TEST PROGRAMME PLANNING
# =====================================================================================
Ttest, logh2, logh3, insp_every, insp_h = 1000.0, 15.5, 18.0, 100.0, 8.0
def cal_days(Tt, logh, avail=0.95, every=insp_every, ih=insp_h):
    run_days = Tt / (logh * avail)
    insp_days = math.floor(Tt / every) * ih / 24 * 1.0
    return run_days + insp_days
d1, d2, d3 = cal_days(Ttest, 7.5), cal_days(Ttest, logh2), cal_days(Ttest, logh3)
C, theta = 0.9, 500.0
Tdemo = -math.log(1 - C) * theta
cum = plot([dict(pts=[(day, min(Ttest, day * lh * 0.95)) for day in range(0, 200)], label=lab, at=at) for lh, lab, at in [(7.5, "1 shift (≈ 7.5 h/day)", 150), (logh2, "2 shifts (≈ 15.5 h/day)", 50), (logh3, "3 shifts (≈ 18 h/day logged)", 25)]],
           "calendar day", "accumulated test hours", xlim=(0, 200), ylim=(0, 1100), h=320)

ARTICLES.append(dict(
    slug="test-programme-planning", group="management",
    title="Planning Long-Duration Test Programmes: Test Hours, Shifts, Availability and Reliability Demonstration",
    short="Test programme planning",
    tags=["Testing", "Planning", "Reliability", "Endurance"],
    desc="Planning endurance and qualification test programmes: accounting for test hours, shift patterns, logging efficiency, availability and planned inspections, calendar duration, and zero-failure reliability demonstration test time.",
    blurb="Turning a required number of test hours into a realistic calendar plan, and how long a test must run to demonstrate an MTBF.",
    lead="A specification may call for 1,000 hours of endurance running, but the calendar time depends on shifts, how many of the running hours are actually logged, unplanned stoppages and planned inspections. Honest test-hour accounting gives schedules that hold. Reliability statistics then say what a given amount of failure-free running actually demonstrates.",
    takeaways=[
        "Separate calendar hours, available hours, running hours and logged (valid) test hours; only valid hours count towards the requirement.",
        "Logging efficiency = logged ÷ running hours; availability = running ÷ planned hours. Automation of start-up, checks and logging raises both.",
        "Calendar days ≈ required hours ÷ (valid hours per day × availability) + planned inspection days.",
        "Moving from one to two shifts roughly halves calendar time; the third shift adds less if night running is limited or poorly logged.",
        "Zero-failure demonstration: T = −ln(1 − C)·θ. Showing 500 h MTBF at 90 % confidence needs about 1,150 h without failure.",
    ],
    body=f'''
<h2 id="accounting">1. Test-hour accounting</h2>
{table(["Category","Definition","Typical loss"],[["Calendar hours","24 h × days",""],["Planned hours","Shift hours scheduled","Holidays, other tests"],["Running hours","Rig actually running at test condition","Start-up, warm-up, stoppages, faults"],
["Valid (logged) hours","Running hours with data recorded and conditions in tolerance","Logging gaps, out-of-tolerance periods"]])}
{formula("Availability A = running / planned\nLogging efficiency η = valid / running\nValid hours per day = shift hours × A × η")}

<h2 id="schedule">2. Calendar estimate</h2>
{fig(cum, f"Figure 1. Accumulation of valid test hours for a {Ttest:,.0f} h test with 95 % availability under three shift patterns (inspections not shown).")}
{table(["Pattern","Valid h/day","Calendar days incl. inspections"],[["1 shift","7.5",f"{d1:.0f}"],["2 shifts",f"{logh2}",f"<b>{d2:.0f}</b>"],["3 shifts",f"{logh3}",f"{d3:.0f}"]],num_cols=(1,2))}
<p>Assumes an {insp_h:.0f} h inspection every {insp_every:.0f} test hours and 95 % availability. Two well-automated shifts often deliver nearly the valid hours of three manual ones, because start-up checks, condition holding and logging no longer eat into running time.</p>

<h2 id="reliability">3. Reliability demonstration</h2>
{formula("Zero failures, exponential life:   T = −ln(1 − C) · θ\nWith r failures:   θ_lower = 2T / χ²(C; 2r + 2)")}
{table(["Confidence C","Test time as multiple of target MTBF (zero failures)"],[["60 %","0.92"],["80 %","1.61"],["90 %","2.30"],["95 %","3.00"]],num_cols=(1,))}
<p>Example: demonstrating θ = {theta:.0f} h at {C*100:.0f} % confidence needs <b>{Tdemo:,.0f} h</b> of failure-free testing (shared across units if several are tested).</p>

<h2 id="tips">4. Practical tips</h2>
<ul><li>Write the test-hour definition (what counts as valid) into the test plan before starting.</li><li>Automate start-up sequences, condition checks and logging; review data daily.</li>
<li>Plan inspections at fixed test-hour intervals and keep spares for the parts most likely to need replacement.</li><li>Track a daily chart of planned versus achieved valid hours; react when the gap grows.</li></ul>
''',
    calcs=[dict(id="tp", title="Test duration planner and reliability demonstration",
                presets=[dict(label="1000 h, 2 shifts", v=dict(T=1000, sh=16, A=95, eta=97, every=100, ih=8, C=90, th=500)), dict(label="1000 h, 3 shifts manual", v=dict(T=1000, sh=24, A=85, eta=88, every=100, ih=8, C=90, th=500))],
                inputs=[dict(id="T", label="Required valid test hours", value=1000), dict(id="sh", label="Planned hours per day", value=16), dict(id="A", label="Availability (%)", value=95), dict(id="eta", label="Logging efficiency (%)", value=97),
                        dict(id="every", label="Inspection every (test h)", value=100), dict(id="ih", label="Inspection duration (h)", value=8), dict(id="C", label="Confidence (%)", value=90), dict(id="th", label="Target MTBF θ (h)", value=500)],
                js='''var vpd=v.sh*v.A/100*v.eta/100,run=v.T/vpd,ins=Math.floor(v.T/v.every)*v.ih/24,tot=run+ins,Td=-Math.log(1-v.C/100)*v.th;
var pts=[];for(var d=0;d<=tot*1.1;d+=Math.max(1,tot/100))pts.push([d,Math.min(v.T,d*vpd*(run/(run+ins)))]);
return {rows:[["Valid hours per day",fmt(vpd,2)+" h"],["Running days",fmt(run,1)],["Inspection days",fmt(ins,1)],["Calendar days",fmt(tot,0),"≈ "+fmt(tot/7,1)+" weeks"],["Zero-failure test time for θ",fmt(Td,0)+" h","at "+v.C+" % confidence"]],
svg:plotSVG([{pts:pts,label:"valid hours"}],{xlabel:"calendar day",ylabel:"valid test hours",xmin:0,ymin:0,ymax:v.T*1.1}),caption:"Accumulated valid hours (inspections spread evenly)."};''')],
    quiz=[
        dict(q="Only which hours count towards a test requirement?", o=["Calendar hours", "Planned hours", "Valid (logged, in-tolerance) running hours", "Shift hours"], a=2, e="Define validity in the test plan."),
        dict(q="Logging efficiency is:", o=["Running / planned", "Valid / running", "Calendar / valid", "Planned / calendar"], a=1, e="η = valid/running."),
        dict(q="Why can two automated shifts match three manual ones?", o=["Night is faster", "Automation recovers time lost to start-up, checks and logging gaps", "Fewer inspections", "It cannot"], a=1, e="Higher availability and logging efficiency."),
        dict(q="Zero-failure test time to show MTBF θ at 90 % confidence is about:", o=["θ", "1.6 θ", "2.3 θ", "5 θ"], a=2, e="−ln(0.1) = 2.303."),
        dict(q="Testing several units in parallel:", o=["Cannot count", "Adds unit-hours towards the demonstration (exponential assumption)", "Halves confidence", "Doubles θ"], a=1, e="Total accumulated hours count."),
        dict(q="A daily chart of planned vs achieved valid hours helps to:", o=["Decorate reports", "Detect schedule slip early", "Replace data", "Calibrate sensors"], a=1, e="Early reaction."),
        dict(q="1,000 h at 15 valid h/day. Running days?", num=66.67, unit="days", e="1000/15 = 66.7 days."),
        dict(q="Demonstrate θ = 200 h at 95 % confidence, zero failures. Test hours?", num=599.1, unit="h", e="−ln(0.05) × 200 = 599 h."),
    ],
    refs=["MIL-HDBK-781A, Handbook for Reliability Test Methods, Plans and Environments for Engineering, Development, Qualification and Production.", "IEC 61124, Reliability testing — Compliance tests for constant failure rate and constant failure intensity.",
          "O'Connor, P. D. T. and Kleyner, A., Practical Reliability Engineering, 5th ed., Wiley, 2012.", "Nelson, W., Accelerated Testing: Statistical Models, Test Plans and Data Analyses, Wiley, 1990."],
    links=[("Wikipedia — Reliability engineering", "https://en.wikipedia.org/wiki/Reliability_engineering")],
))
