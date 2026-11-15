"""
TOOL:    software-history/_src/build.py — builds episode pages from _src/NN.html fragments
FAMILY:  software-history
VERSION: 1.3.0
DATE:    2026-11-15
CHAT:    Software history series — start with MS-DOS, publish all episodes
CHANGES: 1.3.0 — Season 4 episodes 21–26 (thinking, research and office tools); 1.2.0 — Season 3 episodes 15–20 (open source on Windows); 1.1.0 — Season 2 episodes 11–14 (DTP, graphics, prepress, packaging prepress); last-episode nav computed; 1.0.0 — fragment (meta lines + body + optional script) to full page with header block, TOC, nav
"""
__version__ = "1.3.0"
import re, sys, pathlib, html
SRC = pathlib.Path(__file__).parent
OUT = SRC.parent
SLUGS = {1:'01-ms-dos',2:'02-windows-1-to-3',3:'03-spreadsheets',4:'04-word-processors',5:'05-dbase-foxpro-access',
         6:'06-os2-vs-windows-nt',7:'07-browser-wars',8:'08-windows-95-to-xp',9:'09-autocad-and-cad',10:'10-turbo-pascal-delphi-vb',
         11:'11-desktop-publishing',12:'12-graphics-software',13:'13-prepress',14:'14-packaging-prepress',
         15:'15-open-source-media',16:'16-editors-dev-tools',17:'17-open-source-utilities',18:'18-office-and-internet',19:'19-engineering-science',20:'20-creative-and-linux-on-windows',
         21:'21-mind-maps-outliners',22:'22-notes-knowledge',23:'23-references-literature-search',24:'24-diagrams-project-planning',25:'25-statistics-research-data',26:'26-office-communication'}
NAMES = {1:'MS-DOS',2:'Windows 1.0 to 3.11',3:'VisiCalc, Lotus 1-2-3 and Excel',4:'WordStar, WordPerfect and Word',
         5:'dBase, FoxPro and Access',6:'OS/2 vs Windows NT',7:'Netscape vs Internet Explorer',8:'Windows 95 to XP',
         9:'AutoCAD and engineering CAD',10:'Turbo Pascal, Delphi and Visual Basic',
         11:'Desktop publishing',12:'Graphics software: vectors, pixels and plugins',13:'Prepress: from film to PDF',14:'Packaging prepress',
         15:'Open-source media: VLC, FFmpeg and friends',16:'Editors and developer tools: Notepad++ and beyond',17:'Utilities: 7-Zip, KeePass, PowerToys and more',18:'Office and internet: LibreOffice, Firefox, Thunderbird',19:'Engineering and science on Windows',20:'Creative tools and Linux on Windows: Blender, Krita, OBS, WSL',
         21:'Mind maps and outliners',22:'Notes and personal knowledge',23:'Reference managers and literature search',24:'Diagrams and project planning',25:'Statistics and research data',26:'Office communication: e-mail to Teams'}

def build(n, version='1.0.0', date='2026-11-15', changes='First release'):
    raw = (SRC / f'{n:02d}.html').read_text()
    head, body = raw.split('\n\n', 1)
    meta = dict(l.split(':', 1) for l in head.splitlines())
    meta = {k.strip(): v.strip() for k, v in meta.items()}
    script = ''
    if '<!--SCRIPT-->' in body:
        body, script = body.split('<!--SCRIPT-->', 1)
    toc = ''.join(f'<a href="#{i}">{t}</a>\n' for i, t in re.findall(r'<section id="([^"]+)" data-toc="([^"]+)"', body))
    prev = f'<a href="{SLUGS[n-1]}.html"><small>← Episode {n-1:02d}</small>{NAMES[n-1]}</a>' if n > 1 else '<a href="./"><small>Series</small>All episodes</a>'
    nxt = f'<a class="nx" href="{SLUGS[n+1]}.html"><small>Next · Episode {n+1:02d}</small>{NAMES[n+1]} →</a>' if n < max(SLUGS) else '<a class="nx" href="./"><small>Series</small>All episodes →</a>'
    page = f'''<!DOCTYPE html>
<!--
TOOL:    software-history/{SLUGS[n]}.html — Software Through the Ages · Episode {n:02d}: {NAMES[n]}
FAMILY:  software-history
VERSION: {version}
DATE:    {date}
CHAT:    Software history series — start with MS-DOS, publish all episodes
CHANGES: {version} — {changes}
STATUS:  published
-->
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Software Through the Ages · {n:02d} · {html.escape(meta['title'])}</title>
<meta name="description" content="{html.escape(meta['desc'])}">
<link rel="stylesheet" href="assets/sh.css">
</head>
<body>
<header class="top">
  <a href="/">← Home</a><a href="./">Series</a><div class="series">Software Through the Ages</div><div class="sp"></div>
  <button id="btnWidth" title="Toggle wide / reading width">Reading width</button>
  <button id="btnFs" title="Full screen (F)">⛶ Full screen</button>
</header>
<div class="wrap">
<div class="hero">
  <div class="ep">EPISODE {n:02d} · {meta['years']}</div>
  <h1>{meta['title']}</h1>
  <p class="lede">{meta['lede']}</p>
  <div class="byline">K Vijay Anand · Software history series · November 2026</div>
</div>
<div class="layout">
<nav class="toc">
<b>Contents</b>
{toc}<a href="#sources">Sources</a>
</nav>
<main>
{body.strip()}
<div class="epnav">{prev}{nxt}</div>
<footer>Software Through the Ages · Episode {n:02d} · v{version} · haivijayanand.github.io</footer>
</main>
</div>
</div>
<script src="assets/sh.js"></script>
<script>
{script.strip()}
</script>
</body>
</html>
'''
    (OUT / f'{SLUGS[n]}.html').write_text(page)
    print('built', SLUGS[n])

if __name__ == '__main__':
    for a in sys.argv[1:]:
        build(int(a))
