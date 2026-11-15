"""
TOOL:    software-history/_src/apps.py — A–Z application index generator for the series hub
FAMILY:  software-history
VERSION: 1.0.0
DATE:    2026-11-15
CHAT:    Software history series — reorder into topic groups and index hidden applications
CHANGES: 1.0.0 — First release: finds the section of each episode that discusses each application and writes assets/apps.js
STATUS:  working
"""
__version__ = "1.0.0"
import re, json, glob
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
SKIP = {'glance', 'versions', 'sources', 'need', 'lessons', 'install'}

# name | first year | status (C current, R retired, M renamed/merged) | note | episodes (ep or ep@section) | search term
APPS = """
MS-DOS|1981|R||01|MS-DOS
CP/M|1974|R||01|CP/M
DR-DOS|1988|R||01|DR-DOS
FreeDOS|1994|C||01|FreeDOS
Windows 1.0 to 3.11|1985|R||02|Windows 3
Windows for Workgroups|1992|R||02@versions,34|Workgroups
OS/2|1987|R||06|OS/2
Windows NT|1993|M|Continues as Windows 10/11 and Windows Server|06,34|NT
Windows 95, 98 and ME|1995|R||08|Windows 95
Windows XP|2001|R||08|XP
Cygwin|1995|C||20|Cygwin
WSL (Windows Subsystem for Linux)|2016|C||20|WSL
NetWare|1983|M|Open Enterprise Server|34|NetWare
LANtastic|1987|R||34|LANtastic
Banyan VINES|1984|R||34|VINES
LAN Manager|1987|R||34|LAN Manager
Active Directory|2000|C||34|Active Directory
Samba|1992|C||34|Samba
VisiCalc|1979|R||03|VisiCalc
Lotus 1-2-3|1983|R||03|1-2-3
Microsoft Excel|1985|C||03|Excel
Quattro Pro|1988|C||03|Quattro
WordStar|1978|R||04|WordStar
WordPerfect|1979|C||04|WordPerfect
Microsoft Word|1983|C||04|Word
dBase|1980|R||05|dBase
Clipper|1985|R||05|Clipper
FoxPro|1989|R||05|FoxPro
Microsoft Access|1992|C||05|Access
StarOffice|1985|R||18|StarOffice
OpenOffice.org|2000|M|Apache OpenOffice; LibreOffice|18|OpenOffice
LibreOffice|2011|C||18|LibreOffice
Tally / TallyPrime|1986|C||31|Tally
Busy||C||31|Busy
Marg ERP|1992|C||31|Marg
QuickBooks|1992|C||31|QuickBooks
Sage|1981|C||31|Sage
SAP R/3|1992|M|S/4HANA|31|SAP
GnuCash||C||31|GnuCash
ERPNext||C||31|ERPNext
Mosaic|1993|R||07|Mosaic
Netscape Navigator|1994|R||07|Netscape
Internet Explorer|1995|R||07|Internet Explorer
Mozilla Firefox|2004|C||07,18|Firefox
Google Chrome|2008|C||07|Chrome
Thunderbird|2003|C||18,26|Thunderbird
Lotus Notes|1989|M|HCL Notes|26|Lotus Notes
Microsoft Outlook|1997|C||26|Outlook
Hotmail|1996|M|Outlook.com|26|Hotmail
Gmail|2004|C||26|Gmail
Skype|2003|R|Retired May 2025; Teams|26|Skype
Zoom|2013|C||26|Zoom
Microsoft Teams|2017|C||26|Teams
Slack|2013|C||26|Slack
WebEx|1995|C||26|WebEx
Jitsi Meet||C||26|Jitsi
Matrix / Element|2014|C||26|Matrix
FileZilla|2001|C||16|FileZilla
PuTTY|1999|C||16|PuTTY
WinSCP|2000|C||16|WinSCP
SumatraPDF||C||18|SumatraPDF
qBittorrent||C||18|qBittorrent
Turbo Pascal|1983|R||10|Turbo Pascal
Delphi|1995|C||10|Delphi
Visual Basic|1991|M|VB.NET|10|Visual Basic
Notepad++|2003|C||16|Notepad++
Vim|1991|C||16|Vim
Visual Studio Code|2015|C||16|VS Code
Git for Windows||C||16|Git
AutoCAD|1982|C||09@inside|AutoCAD
CATIA|1977|C||09,30|CATIA
Pro/ENGINEER|1988|M|Creo|09,30|Pro/ENGINEER
SolidWorks|1995|C||09,30|SolidWorks
Solid Edge|1995|C||30|Solid Edge
Autodesk Inventor|1999|C||30|Inventor
NX (Unigraphics)|1976|C||30|Unigraphics
FreeCAD|2002|C||19,30|FreeCAD
Onshape|2015|C||30|Onshape
Fusion|2013|C||30|Fusion
OpenSCAD|2010|C||19,30|OpenSCAD
LibreCAD||C||19|LibreCAD
KiCad|1992|C||19|KiCad
MATLAB|1984|C||27|MATLAB
Simulink|1990|C||27|Simulink
Mathcad|1986|C||27|Mathcad
Mathematica|1988|C||27|Mathematica
Maple|1982|C||27|Maple
GNU Octave|1994|C||19,27|Octave
Scilab|1994|C||19,27|Scilab
Python scientific stack (NumPy, SciPy, Jupyter)|2006|C||19,27|NumPy
Julia|2012|C||27|Julia
LabVIEW|1986|C||28|LabVIEW
HP VEE / Keysight VEE|1991|C||28|VEE
DASYLab|1993|C||28|DASYLab
DEWESoft||C||28|DEWESoft
NASTRAN|1968|C||29|NASTRAN
ANSYS|1970|C||29|ANSYS
Abaqus|1978|C||29|ABAQUS
LS-DYNA|1987|C||29|LS-DYNA
COMSOL Multiphysics|1998|C||29|COMSOL
Code_Aster|2001|C||29|Code_Aster
CalculiX||C||19,29|CalculiX
OpenFOAM|2004|C||19,29|OpenFOAM
ParaView||C||19|ParaView
QGIS||C||19|QGIS
PageMaker|1985|R||11|PageMaker
Ventura Publisher|1986|R||11|Ventura
QuarkXPress|1987|C||11|QuarkXPress
InDesign|1999|C||11|InDesign
Microsoft Publisher|1991|R||11|Publisher
Canva|2013|C||11|Canva
Shree-Lipi||C||11|Shree-Lipi
Adobe Illustrator|1987|C||12|Illustrator
FreeHand|1988|R||12|FreeHand
CorelDRAW|1989|C||12@corel|CorelDRAW
Photoshop|1990|C||12|Photoshop
GIMP|1996|C||12|GIMP
Inkscape||C||12|Inkscape
Affinity||C||12|Affinity
ArtPro / Esko||C||14|ArtPro
VLC|2001|C||15|VLC
FFmpeg|2000|C||15|FFmpeg
Audacity|2000|C||15|Audacity
HandBrake|2003|C||15|HandBrake
Kodi (XBMC)||C||15|Kodi
Winamp|1997|C||15|Winamp
Blender||C||20|Blender
Krita||C||20|Krita
OBS Studio|2012|C||20|OBS
MindManager|1994|C||21|MindManager
FreeMind|2000|C||21|FreeMind
Freeplane|2007|C||21|Freeplane
XMind|2008|C||21|XMind
Workflowy|2010|C||21|Workflowy
Miro|2011|C||21|Miro
HyperCard|1987|R||22|HyperCard
OneNote|2003|C||22|OneNote
Evernote|2008|C||22|Evernote
Notion|2016|C||22|Notion
Obsidian|2020|C||22|Obsidian
Logseq|2020|C||22|Logseq
Joplin|2017|C||22|Joplin
BibTeX|1985|C||23|BibTeX
EndNote|1988|C||23|EndNote
Zotero|2006|C||23|Zotero
Mendeley|2008|C||23|Mendeley
JabRef|2003|C||23|JabRef
Google Scholar|2004|C||23|Google Scholar
Shodhganga||C||23|Shodhganga
Visio|1992|C||24|Visio
draw.io|2011|C||24|draw.io
Graphviz|1991|C||24|Graphviz
Mermaid|2014|C||24|Mermaid
Microsoft Project|1984|C||24|Microsoft Project
Primavera|1983|C||24|Primavera
GanttProject|2003|C||24|GanttProject
Trello|2011|C||24|Trello
Jira|2002|C||24|Jira
SPSS|1968|C||25|SPSS
SAS|1976|C||25|SAS
Stata|1985|C||25|Stata
Minitab|1972|C||25|Minitab
R and RStudio|1993|C||25|RStudio
JASP|2016|C||25|JASP
jamovi|2017|C||25|jamovi
Origin / GraphPad Prism||C||25|Origin
Norton Utilities|1982|R||33|Norton Utilities
Norton Commander|1986|R||33|Norton Commander
PC Tools|1985|R||33|PC Tools
XTree|1985|R||33|XTree
Total Commander|1993|C||33|Total Commander
PKZIP|1989|C||33|PKZIP
ARJ|1990|R||33|ARJ
WinRAR|1995|C||17,33|WinRAR
WinZip|1991|C||17,33|WinZip
7-Zip|1999|C||17|7-Zip
Stacker|1990|R||33|Stacker
QEMM|1987|R||33|QEMM
KeePass|2003|C||17|KeePass
Rufus||C||17|Rufus
PowerToys||C||17|PowerToys
ShareX||C||17|ShareX
McAfee VirusScan|1987|C||32|McAfee
Norton AntiVirus|1990|C||32|Norton AntiVirus
Kaspersky||C||32|Kaspersky
Avast and AVG|1988|C||32|Avast
Quick Heal|1993|C||32|Quick Heal
K7 Security|1991|C||32|K7
Microsoft Defender|2006|C||32|Defender
"""

TOPICS = [
 ('os', 'Operating systems and platforms', ['01', '02', '06', '08', '20']),
 ('office', 'Office productivity and business', ['03', '04', '05', '18', '31']),
 ('net', 'Internet, communication and networks', ['07', '26', '34']),
 ('dev', 'Programming and developer tools', ['10', '16']),
 ('eng', 'Engineering and science', ['09', '30', '29', '27', '28', '19']),
 ('design', 'Design, print and media', ['11', '12', '13', '14', '15', '20']),
 ('think', 'Thinking, research and data', ['21', '22', '23', '24', '25']),
 ('util', 'Utilities and security', ['33', '17', '32']),
 ('auto', 'Macros and automation', ['35', '36', '37', '38', '39']),
]


def sections(path):
    html = path.read_text()
    out = []
    for m in re.finditer(r'<section id="([^"]+)"[^>]*>(.*?)</section>', html, re.S):
        out.append((m.group(1), re.sub(r'<[^>]+>', ' ', m.group(2))))
    if not out:  # hand-written Episode 01: split on id-bearing headings/sections
        parts = re.split(r'(<(?:section|h2|div)[^>]*\sid="(?:glance|need|birth|inside|memory|versions|apps|rivals|retire|replace|legacy|try|lessons|sources)")', html)
        cur = None
        for p in parts:
            m = re.search(r'id="([^"]+)"', p) if p.startswith('<') else None
            if m:
                cur = m.group(1)
            elif cur:
                out.append((cur, re.sub(r'<[^>]+>', ' ', p)))
    return out


def find(ep, term):
    f = next(ROOT.glob(f'{ep}-*.html'))
    secs = sections(f)
    rx = re.compile(r'(?<![A-Za-z0-9])' + re.escape(term) + r'(?![A-Za-z])')
    for sid, text in secs:
        if sid not in SKIP and rx.search(text):
            return f.name, sid
    for sid, text in secs:
        if rx.search(text):
            return f.name, sid
    return f.name, None


def main():
    rows, missing = [], []
    for line in APPS.strip().splitlines():
        name, year, st, note, eps, term = (line.split('|') + [''] * 6)[:6]
        locs = []
        for ep in eps.split(','):
            ep, _, forced = ep.partition('@')
            fn, sid = find(ep, term or name)
            if forced:
                sid = forced
            if sid is None:
                missing.append(f'{name} in {ep}')
            locs.append([ep, fn + ('#' + sid if sid else '')])
        rows.append([name, year, st, note, locs])
    rows.sort(key=lambda r: r[0].lower())
    js = ('/* Generated by _src/apps.py ' + __version__ + ' — do not edit by hand */\n'
          'const APPS=' + json.dumps(rows, ensure_ascii=False) + ';\n'
          'const TOPICS=' + json.dumps(TOPICS, ensure_ascii=False) + ';\n')
    (ROOT / 'assets' / 'apps.js').write_text(js)
    print(len(rows), 'applications;', 'missing:', missing or 'none')


if __name__ == '__main__':
    main()
