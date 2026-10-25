#!/usr/bin/env python3
"""
TOOL:    papers/_build.py
FAMILY:  papers
VERSION: 1.0.0
DATE:    2026-10-25
CHAT:    Exoskeleton technical paper — Technical Papers section
CHANGES: 1.0.0 - renders each _content/<slug>.md into <slug>.html (title block, contents sidebar, theme, full screen),
                 prints an A4 PDF of it into pdf/<slug>.pdf, and rebuilds index.html from _papers.json
STATUS:  working

Run:  python3 papers/_build.py              (all papers: HTML + A4 PDF + index)
      python3 papers/_build.py --no-pdf     (HTML + index only; keeps existing PDFs)
Needs: pip install markdown pypdf playwright  &&  python3 -m playwright install chromium

Jekyll skips files and folders that start with "_", so this script, the manifest and the sources are not published.

Adding a paper:
  1. write _content/<slug>.md — start at "## Abstract"; no title, author or date lines (the page adds them)
  2. add an entry at the end of _papers.json: no, slug, title, short, author, date (YYYY-MM-DD), tags, summary
  3. run this script, then git add papers/ && git commit && git push
"""
__version__ = "1.0.0"

PAGE_VERSION = "1.0.0"
PAGE_DATE = "2026-10-25"
PAGE_CHANGES = "1.0.0 - first page template: title block, contents sidebar (M), theme, full screen, A4 PDF download"

import datetime as dt
import html
import json
import os
import re
import sys
from pathlib import Path

import markdown

HERE = Path(__file__).resolve().parent
CONTENT = HERE / "_content"
MANIFEST = HERE / "_papers.json"
PDF_DIR = HERE / "pdf"
SITE = "https://haivijayanand.github.io"
CHAT = "Exoskeleton technical paper — Technical Papers section"


def esc(s):
    return html.escape(str(s), quote=True)


def nice_date(iso):
    d = dt.date.fromisoformat(iso)
    return f"{d.day} {d.strftime('%B %Y')}"


# ---------------------------------------------------------------- shared look
FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n'
         '<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400'
         '&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">')

THEME_CSS = """
  :root{--bg:#fbfaf7;--bg-2:#f2f0ea;--ink:#1d2127;--ink-soft:#4a515c;--ink-faint:#7b828d;
        --accent:#1d4e89;--accent-2:#2f6db3;--rule:#dcd8ce;--tint:rgba(29,78,137,.06)}
  @media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#15181d;--bg-2:#1d2128;--ink:#e6e8ec;
        --ink-soft:#b3b9c3;--ink-faint:#858c97;--accent:#7fb0ea;--accent-2:#9cc3f0;--rule:#323844;--tint:rgba(127,176,234,.08)}}
  :root[data-theme="dark"]{--bg:#15181d;--bg-2:#1d2128;--ink:#e6e8ec;--ink-soft:#b3b9c3;--ink-faint:#858c97;
        --accent:#7fb0ea;--accent-2:#9cc3f0;--rule:#323844;--tint:rgba(127,176,234,.08)}
  *{box-sizing:border-box}
  html{scroll-behavior:smooth;scroll-padding-top:70px}
  body{margin:0;background:var(--bg);color:var(--ink);font-family:Lora,Georgia,"DejaVu Serif",serif;
       font-size:18px;line-height:1.7;-webkit-font-smoothing:antialiased}
  .bar{position:sticky;top:0;z-index:20;display:flex;align-items:center;gap:10px;padding:10px 18px;
       background:color-mix(in srgb,var(--bg) 92%,transparent);backdrop-filter:blur(6px);border-bottom:1px solid var(--rule);
       font-family:Inter,system-ui,sans-serif;font-size:13px}
  .bar .brand{color:var(--ink);text-decoration:none;font-weight:600;margin-right:auto;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .bar .brand span{color:var(--ink-faint);font-weight:400}
  .bar button,.bar a.btn{background:var(--bg-2);color:var(--ink-soft);border:1px solid var(--rule);border-radius:999px;
       padding:6px 12px;cursor:pointer;font:inherit;text-decoration:none;white-space:nowrap}
  .bar button:hover,.bar a.btn:hover{color:var(--ink);border-color:var(--ink-faint)}
  .bar a.btn.primary{background:var(--accent);border-color:var(--accent);color:#fff}
  :root[data-theme="dark"] .bar a.btn.primary{color:#0d1116}
  @media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .bar a.btn.primary{color:#0d1116}}
  @media (max-width:640px){.bar .hide-sm{display:none}}
"""

THEME_JS = """
(function(){
  var root=document.documentElement, KEY="papers-theme";
  try{var t=localStorage.getItem(KEY); if(t) root.setAttribute("data-theme",t);}catch(e){}
  var tb=document.getElementById("themeBtn");
  if(tb) tb.onclick=function(){
    var dark=root.getAttribute("data-theme")==="dark"||(!root.getAttribute("data-theme")&&matchMedia("(prefers-color-scheme: dark)").matches);
    var n=dark?"light":"dark"; root.setAttribute("data-theme",n);
    try{localStorage.setItem(KEY,n);}catch(e){}
  };
  var fb=document.getElementById("fsBtn");
  if(fb) fb.onclick=function(){
    if(!document.fullscreenElement){(root.requestFullscreen||function(){}).call(root);}
    else{document.exitFullscreen();}
  };
})();
"""

# ---------------------------------------------------------------- paper page
PAGE = """<!DOCTYPE html>
<!--
TOOL:    papers/@@SLUG@@.html — Technical Paper No. @@NO@@: @@TITLE_TXT@@
FAMILY:  papers
VERSION: @@PAGE_VERSION@@
DATE:    @@PAGE_DATE@@
CHAT:    @@CHAT@@
CHANGES: @@PAGE_CHANGES@@
STATUS:  generated by papers/_build.py v@@BUILD_VERSION@@ — edit _content/@@SLUG@@.md, not this file
-->
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>@@TITLE@@ — K Vijay Anand</title>
<meta name="description" content="@@SUMMARY@@">
<meta name="author" content="@@AUTHOR@@">
<meta property="og:title" content="@@TITLE@@">
<meta property="og:description" content="@@SUMMARY@@">
<meta property="og:type" content="article">
<meta property="og:url" content="@@URL@@">
<link rel="canonical" href="@@URL@@">
@@FONTS@@
<style>
@@THEME_CSS@@
  .layout{display:grid;grid-template-columns:290px minmax(0,1fr);gap:0;max-width:1500px;margin:0 auto}
  body.toc-off .layout{grid-template-columns:0 minmax(0,1fr)}
  body.toc-off .toc{visibility:hidden}
  .toc{position:sticky;top:53px;align-self:start;max-height:calc(100vh - 53px);overflow:auto;padding:26px 14px 40px 22px;
       border-right:1px solid var(--rule);font-family:Inter,system-ui,sans-serif;font-size:13px;line-height:1.45}
  .toc b{display:block;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-faint);margin:0 0 12px}
  .toc ul{list-style:none;margin:0;padding:0}
  .toc ul ul{padding-left:12px;margin:2px 0 6px}
  .toc a{display:block;padding:3px 8px;border-radius:6px;color:var(--ink-soft);text-decoration:none}
  .toc a:hover{background:var(--tint);color:var(--ink)}
  .toc a.on{color:var(--accent);background:var(--tint);font-weight:600}
  .paper{padding:40px 48px 70px;min-width:0}
  .paper>*{max-width:880px;margin-left:auto;margin-right:auto}
  .paper .wide{max-width:1120px}
  .kicker{font-family:Inter,system-ui,sans-serif;font-size:12px;letter-spacing:.24em;text-transform:uppercase;color:var(--accent);margin-bottom:14px}
  h1{font-size:clamp(30px,4vw,44px);line-height:1.15;margin:0 0 18px;font-weight:700;letter-spacing:-.01em}
  .byline{font-family:Inter,system-ui,sans-serif;font-size:14px;color:var(--ink-soft);display:flex;flex-wrap:wrap;gap:6px 18px;align-items:center}
  .byline .who{color:var(--ink);font-weight:600;font-size:15px}
  .tags{display:flex;flex-wrap:wrap;gap:6px;margin:14px auto 0}
  .tags span{font-family:Inter,sans-serif;font-size:12px;color:var(--ink-soft);border:1px solid var(--rule);border-radius:999px;padding:2px 10px}
  .actions{display:flex;flex-wrap:wrap;gap:10px;margin:22px auto 8px;font-family:Inter,sans-serif;font-size:14px}
  .actions a{border:1px solid var(--rule);border-radius:8px;padding:9px 14px;text-decoration:none;color:var(--ink)}
  .actions a.pdf{background:var(--accent);border-color:var(--accent);color:#fff;font-weight:600}
  :root[data-theme="dark"] .actions a.pdf{color:#0d1116}
  @media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .actions a.pdf{color:#0d1116}}
  .actions small{display:block;font-weight:400;opacity:.85;font-size:12px}
  .print-only{display:none}
  hr.top{border:0;border-top:1px solid var(--rule);margin:26px auto 10px}
  article h2{font-size:27px;line-height:1.25;margin:48px auto 12px;padding-top:6px;border-top:2px solid var(--rule)}
  article h3{font-size:21px;margin:30px auto 8px;color:var(--ink)}
  article p,article li{color:var(--ink)}
  article a{color:var(--accent);text-decoration-thickness:1px;text-underline-offset:2px}
  article a.cite{font-family:Inter,sans-serif;font-size:.72em;vertical-align:super;line-height:0;text-decoration:none;padding:0 1px}
  article a.cite:hover{text-decoration:underline}
  article ul,article ol{padding-left:1.4em}
  article li{margin:4px 0}
  article #abstract + p, article .abstract{background:var(--tint);border-left:4px solid var(--accent);padding:16px 20px;border-radius:0 8px 8px 0}
  .tbl{overflow-x:auto;margin:18px auto 22px;border:1px solid var(--rule);border-radius:8px}
  table{border-collapse:collapse;width:100%;font-family:Inter,system-ui,sans-serif;font-size:14px;line-height:1.5}
  th,td{text-align:left;vertical-align:top;padding:9px 12px;border-bottom:1px solid var(--rule)}
  th{background:var(--bg-2);font-weight:600;color:var(--ink);white-space:nowrap}
  tr:last-child td{border-bottom:0}
  article h2#abstract{border-top:0;margin-top:20px}
  article ol.refs{font-size:15px;line-height:1.55;padding-left:2.4em}
  article ol.refs li{margin:6px 0;word-break:break-word}
  .endnav{display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap;border-top:1px solid var(--rule);margin-top:50px;padding-top:20px;
       font-family:Inter,sans-serif;font-size:14px}
  .endnav a{color:var(--accent);text-decoration:none}
  footer.site{font-family:Inter,sans-serif;font-size:13px;color:var(--ink-faint);margin-top:26px}
  footer.site a{color:var(--ink-soft)}
  @media (max-width:1000px){
    .layout,body.toc-off .layout{grid-template-columns:minmax(0,1fr)}
    .toc{display:none;position:fixed;top:53px;left:0;bottom:0;width:min(300px,86vw);z-index:15;background:var(--bg);box-shadow:0 0 30px rgba(0,0,0,.25)}
    body.toc-open .toc{display:block}
    .paper{padding:28px 16px 60px}
    body{font-size:17px}
  }

  /* ---------- A4 print / PDF ---------- */
  @page{size:A4;margin:17mm 16mm 18mm 16mm}
  @media print{
    :root,:root[data-theme="dark"]{--bg:#fff;--bg-2:#f1f3f6;--ink:#111;--ink-soft:#333;--ink-faint:#666;--accent:#173f70;--rule:#c9ced6;--tint:#eef3f9}
    body{font-size:10.4pt;line-height:1.5;background:#fff}
    .bar,.toc,.actions,.endnav,footer.site,.screen-only{display:none!important}
    .layout{display:block}
    .paper{padding:0}
    .paper>*,.paper .wide{max-width:none}
    .print-only{display:block}
    .kicker{font-size:8pt;margin-bottom:6pt}
    h1{font-size:20pt;margin:0 0 8pt}
    .byline{font-size:9.5pt}
    .byline .who{font-size:10.5pt}
    .tags{display:none}
    .online{font-family:Inter,sans-serif;font-size:8.5pt;color:var(--ink-soft);margin-top:4pt}
    hr.top{margin:10pt 0 4pt}
    article h2{font-size:13.5pt;margin:16pt 0 5pt;padding-top:3pt;border-top:1.2pt solid var(--rule);break-after:avoid;page-break-after:avoid}
    article h3{font-size:11.2pt;margin:10pt 0 4pt;break-after:avoid;page-break-after:avoid}
    article p{margin:0 0 6pt;orphans:3;widows:3}
    article li{margin:2pt 0}
    article a{text-decoration:none;color:var(--accent)}
    article a.cite{font-size:6.8pt}
    article #abstract + p{padding:7pt 10pt}
    .tbl{border:0.6pt solid var(--rule);border-radius:0;margin:6pt 0 10pt;overflow:visible}
    table{font-size:7.9pt;line-height:1.35}
    th,td{padding:3.5pt 5pt;border-bottom:0.5pt solid var(--rule)}
    th{white-space:normal}
    tr{break-inside:avoid;page-break-inside:avoid}
    thead{display:table-header-group}
    article h2#abstract{border-top:0;margin-top:8pt}
    article h2#references{break-before:page;page-break-before:always}
    article ol.refs{font-size:8.3pt;line-height:1.4;padding-left:2.4em}
    article ol.refs li{margin:1.5pt 0}
  }
</style>
</head>
<body>
<div class="bar">
  <a class="brand" href="./">Technical Papers <span>· K Vijay Anand</span></a>
  <button id="tocBtn" title="Show or hide the contents (M)">☰ Contents</button>
  <button id="themeBtn" title="Toggle light / dark" class="hide-sm">◐ Theme</button>
  <button id="fsBtn" title="Full screen" class="hide-sm">⤢ Full screen</button>
  <a class="btn primary" href="pdf/@@SLUG@@.pdf" download>⬇ PDF (A4)</a>
</div>
<div class="layout">
  <nav class="toc" id="toc" aria-label="Contents">
    <b>Contents</b>
@@TOC@@
  </nav>
  <main class="paper">
    <div class="kicker">Technical Paper No. @@NO@@</div>
    <h1>@@TITLE@@</h1>
    <div class="byline">
      <span class="who">@@AUTHOR@@</span>
      <span>@@DATE_NICE@@</span>
      <span class="screen-only">@@MINUTES@@ min read · @@WORDS@@ words</span>
    </div>
    <div class="online print-only">Online version: @@URL@@</div>
    <div class="tags">@@TAGS@@</div>
    <div class="actions">
      <a class="pdf" href="pdf/@@SLUG@@.pdf" download>Download PDF<small>A4 · @@PDF_INFO@@</small></a>
      <a href="./">All technical papers<small>@@COUNT@@ in the series</small></a>
    </div>
    <hr class="top">
    <article>
@@BODY@@
    </article>
    <div class="endnav">
      <span>@@PREV@@</span>
      <span>@@NEXT@@</span>
    </div>
    <footer class="site">© @@YEAR@@ K Vijay Anand · <a href="/">haivijayanand.github.io</a> · <a href="./">Technical Papers</a></footer>
  </main>
</div>
<script>
@@THEME_JS@@
(function(){
  var b=document.body, mq=matchMedia("(max-width:1000px)");
  function toggle(){ if(mq.matches){b.classList.toggle("toc-open");} else {b.classList.toggle("toc-off");} }
  document.getElementById("tocBtn").onclick=toggle;
  document.addEventListener("keydown",function(e){
    if((e.key==="m"||e.key==="M")&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!/INPUT|TEXTAREA/.test(document.activeElement.tagName)){toggle();}
  });
  document.querySelectorAll(".toc a").forEach(function(a){a.addEventListener("click",function(){if(mq.matches)b.classList.remove("toc-open");});});
  var links=[].slice.call(document.querySelectorAll(".toc a"));
  var heads=links.map(function(a){return document.getElementById(a.getAttribute("href").slice(1));}).filter(Boolean);
  function spy(){
    var cur=null; heads.forEach(function(h){ if(h.getBoundingClientRect().top<120) cur=h; });
    links.forEach(function(a){a.classList.toggle("on",cur&&a.getAttribute("href")==="#"+cur.id);});
  }
  addEventListener("scroll",spy,{passive:true}); spy();
})();
</script>
</body>
</html>
"""

# ---------------------------------------------------------------- index page
INDEX = """<!DOCTYPE html>
<!--
TOOL:    papers/index.html — list of Technical Papers
FAMILY:  papers
VERSION: @@PAGE_VERSION@@
DATE:    @@PAGE_DATE@@
CHAT:    @@CHAT@@
CHANGES: 1.0.0 - first list: Paper 01, Exoskeletons
STATUS:  generated by papers/_build.py v@@BUILD_VERSION@@ — edit _papers.json, not this file
-->
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Technical Papers — K Vijay Anand</title>
<meta name="description" content="Technical Papers by K Vijay Anand: longer reviews of engineering topics, each readable online and downloadable as an A4 PDF.">
@@FONTS@@
<style>
@@THEME_CSS@@
  header{max-width:1100px;margin:0 auto;padding:64px 22px 26px}
  .kicker{font-family:Inter,system-ui,sans-serif;font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:var(--accent);margin-bottom:14px}
  h1{font-size:clamp(36px,6vw,58px);line-height:1.05;margin:0 0 14px;font-weight:700;letter-spacing:-.015em}
  header p{color:var(--ink-soft);max-width:62ch;margin:0}
  .find{max-width:1100px;margin:0 auto;padding:6px 22px 18px;display:flex;gap:12px;align-items:center;font-family:Inter,sans-serif;font-size:14px}
  .find input{flex:1;max-width:420px;padding:10px 14px;border-radius:8px;border:1px solid var(--rule);background:var(--bg-2);color:var(--ink);font:inherit}
  .find span{color:var(--ink-faint)}
  main{max-width:1100px;margin:0 auto;padding:6px 22px 50px;display:flex;flex-direction:column;gap:16px}
  .card{display:grid;grid-template-columns:86px minmax(0,1fr);gap:20px;border:1px solid var(--rule);border-radius:10px;padding:22px 24px;background:var(--bg-2)}
  .card .no{font-family:Inter,sans-serif;font-weight:600;font-size:34px;line-height:1;color:var(--accent);opacity:.9}
  .card .no small{display:block;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--ink-faint);font-weight:500;margin-bottom:6px}
  .card h2{font-size:24px;line-height:1.25;margin:0 0 6px}
  .card h2 a{color:var(--ink);text-decoration:none}
  .card h2 a:hover{color:var(--accent)}
  .meta{font-family:Inter,sans-serif;font-size:13px;color:var(--ink-faint);margin-bottom:10px}
  .card p{margin:0 0 14px;color:var(--ink-soft)}
  .tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}
  .tags span{font-family:Inter,sans-serif;font-size:12px;color:var(--ink-soft);border:1px solid var(--rule);border-radius:999px;padding:2px 10px}
  .links{display:flex;flex-wrap:wrap;gap:10px;font-family:Inter,sans-serif;font-size:14px}
  .links a{border:1px solid var(--rule);border-radius:8px;padding:8px 14px;text-decoration:none;color:var(--ink);background:var(--bg)}
  .links a.pdf{background:var(--accent);border-color:var(--accent);color:#fff;font-weight:600}
  :root[data-theme="dark"] .links a.pdf{color:#0d1116}
  @media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .links a.pdf{color:#0d1116}}
  .empty{display:none;color:var(--ink-faint);font-family:Inter,sans-serif}
  footer{max-width:1100px;margin:0 auto;padding:24px 22px 60px;border-top:1px solid var(--rule);font-family:Inter,sans-serif;font-size:13px;color:var(--ink-faint)}
  footer a{color:var(--ink-soft)}
  @media (max-width:640px){.card{grid-template-columns:1fr;gap:6px;padding:18px}.card .no{font-size:26px}}
</style>
</head>
<body>
<div class="bar">
  <a class="brand" href="/">K Vijay Anand <span>· haivijayanand.github.io</span></a>
  <button id="themeBtn" title="Toggle light / dark">◐ Theme</button>
  <button id="fsBtn" title="Full screen" class="hide-sm">⤢ Full screen</button>
</div>
<header>
  <div class="kicker">Technical Papers</div>
  <h1>Technical Papers</h1>
  <p>Longer, referenced reviews of engineering and technology topics. Read each paper online, or download it as an A4 PDF to print or share.</p>
</header>
<div class="find">
  <input id="q" type="search" placeholder="Search titles, topics and tags" aria-label="Search papers">
  <span id="count">@@COUNT_TEXT@@</span>
</div>
<main id="list">
@@CARDS@@
  <p class="empty" id="empty">No paper matches that search.</p>
</main>
<footer>© @@YEAR@@ K Vijay Anand · <a href="/">Home</a> · <a href="/engineering/">Engineering Articles</a> · <a href="/tools/">Tools</a></footer>
<script>
@@THEME_JS@@
(function(){
  var q=document.getElementById("q"), cards=[].slice.call(document.querySelectorAll(".card")), empty=document.getElementById("empty"), count=document.getElementById("count");
  q.addEventListener("input",function(){
    var t=q.value.trim().toLowerCase(), n=0;
    cards.forEach(function(c){ var hit=!t||c.textContent.toLowerCase().indexOf(t)>=0; c.style.display=hit?"":"none"; if(hit)n++; });
    empty.style.display=n?"none":"block";
    count.textContent=n+(n===1?" paper":" papers");
  });
})();
</script>
</body>
</html>
"""


def fill(tpl, values):
    for k, v in values.items():
        tpl = tpl.replace("@@" + k + "@@", str(v))
    left = re.findall(r"@@[A-Z_]+@@", tpl)
    if left:
        raise SystemExit(f"template placeholders not filled: {sorted(set(left))}")
    return tpl


def render_md(text):
    md = markdown.Markdown(extensions=["tables", "sane_lists", "toc"],
                           extension_configs={"toc": {"toc_depth": "2-3"}})
    body = md.convert(text)
    toc = md.toc
    # numbered citation links like [12] -> small superscript-style links
    body = re.sub(r'<a href="([^"]+)">\[(\d+)\]</a>',
                  r'<a class="cite" href="\1" target="_blank" rel="noopener" title="Source [\2]">[\2]</a>', body)
    # other external links open in a new tab
    body = re.sub(r'<a href="(https?://[^"]+)">', r'<a href="\1" target="_blank" rel="noopener">', body)
    # tables scroll sideways on small screens
    body = body.replace("<table>", '<div class="tbl wide"><table>').replace("</table>", "</table></div>")
    # the references list gets its own style
    body = re.sub(r'(<h2 id="references">References</h2>.*?)<ol>', r'\1<ol class="refs">', body, count=1, flags=re.S)
    toc = re.sub(r'^<div class="toc">\s*', "", toc.strip())
    toc = re.sub(r"\s*</div>$", "", toc)
    words = len(re.sub(r"<[^>]+>", " ", body).split())
    return body, toc, words


def pdf_info(path):
    if not path.exists():
        return "PDF"
    kb = path.stat().st_size / 1024
    size = f"{kb / 1024:.1f} MB" if kb >= 1024 else f"{kb:.0f} KB"
    try:
        from pypdf import PdfReader
        return f"{len(PdfReader(str(path)).pages)} pages · {size}"
    except Exception:
        return size


def make_pdfs(papers):
    from playwright.sync_api import sync_playwright
    if not os.environ.get("PLAYWRIGHT_BROWSERS_PATH") and Path("/opt/pw-browsers").exists():
        os.environ["PLAYWRIGHT_BROWSERS_PATH"] = "/opt/pw-browsers"
    PDF_DIR.mkdir(exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        for pp in papers:
            src = HERE / f"{pp['slug']}.html"
            out = PDF_DIR / f"{pp['slug']}.pdf"
            page.goto(src.as_uri(), wait_until="load", timeout=60000)
            page.emulate_media(media="print")
            page.evaluate("document.fonts.ready")
            foot = ('<div style="width:100%;font-family:Inter,sans-serif;font-size:7.5px;color:#666;padding:0 16mm;'
                    'display:flex;justify-content:space-between">'
                    f'<span>{esc(pp["author"])} · Technical Paper No. {pp["no"]:02d} · {esc(pp["short"])}</span>'
                    '<span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>')
            page.pdf(path=str(out), format="A4", print_background=True, prefer_css_page_size=True,
                     display_header_footer=True, header_template="<div></div>", footer_template=foot)
            print(f"  pdf  {out.relative_to(HERE.parent)}  ({pdf_info(out)})")
        browser.close()


def build(do_pdf=True):
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    papers = data["papers"]
    seen = set()
    for pp in papers:
        for k in ("no", "slug", "title", "short", "author", "date", "tags", "summary"):
            if k not in pp:
                raise SystemExit(f"paper {pp.get('slug', '?')}: missing '{k}' in _papers.json")
        if pp["slug"] in seen:
            raise SystemExit(f"duplicate slug {pp['slug']}")
        seen.add(pp["slug"])
        if not (CONTENT / f"{pp['slug']}.md").exists():
            raise SystemExit(f"missing _content/{pp['slug']}.md")
    year = dt.date.today().year
    count = len(papers)

    def page_for(i, pass_no):
        pp = papers[i]
        body, toc, words = render_md((CONTENT / f"{pp['slug']}.md").read_text(encoding="utf-8"))
        prev = f'<a href="{papers[i-1]["slug"]}.html">← No. {papers[i-1]["no"]:02d} · {esc(papers[i-1]["short"])}</a>' if i > 0 else '<a href="./">← All technical papers</a>'
        nxt = f'<a href="{papers[i+1]["slug"]}.html">No. {papers[i+1]["no"]:02d} · {esc(papers[i+1]["short"])} →</a>' if i + 1 < count else ""
        html_out = fill(PAGE, {
            "SLUG": pp["slug"], "NO": f'{pp["no"]:02d}', "TITLE_TXT": pp["title"], "TITLE": esc(pp["title"]),
            "PAGE_VERSION": PAGE_VERSION, "PAGE_DATE": PAGE_DATE, "PAGE_CHANGES": PAGE_CHANGES, "CHAT": CHAT,
            "BUILD_VERSION": __version__, "SUMMARY": esc(pp["summary"]), "AUTHOR": esc(pp["author"]),
            "URL": f"{SITE}/papers/{pp['slug']}.html", "FONTS": FONTS, "THEME_CSS": THEME_CSS, "THEME_JS": THEME_JS,
            "TOC": toc, "DATE_NICE": nice_date(pp["date"]), "MINUTES": max(1, round(words / 230)),
            "WORDS": f"{words:,}", "TAGS": "".join(f"<span>{esc(t)}</span>" for t in pp["tags"]),
            "PDF_INFO": pdf_info(PDF_DIR / f"{pp['slug']}.pdf"), "COUNT": f"{count} paper" + ("" if count == 1 else "s"),
            "BODY": body, "PREV": prev, "NEXT": nxt, "YEAR": year,
        })
        (HERE / f"{pp['slug']}.html").write_text(html_out, encoding="utf-8")
        if pass_no == 1:
            print(f"  html papers/{pp['slug']}.html  ({words:,} words)")
        return words

    words_by = {}
    for i in range(count):
        words_by[papers[i]["slug"]] = page_for(i, 1)
    if do_pdf:
        make_pdfs(papers)
        for i in range(count):          # second pass writes the real page count and size into each page
            page_for(i, 2)

    cards = []
    for pp in reversed(papers):         # newest first
        w = words_by[pp["slug"]]
        cards.append(f"""  <section class="card">
    <div class="no"><small>Paper</small>{pp['no']:02d}</div>
    <div>
      <h2><a href="{pp['slug']}.html">{esc(pp['title'])}</a></h2>
      <div class="meta">{esc(pp['author'])} · {nice_date(pp['date'])} · {max(1, round(w / 230))} min read</div>
      <p>{esc(pp['summary'])}</p>
      <div class="tags">{''.join(f'<span>{esc(t)}</span>' for t in pp['tags'])}</div>
      <div class="links"><a href="{pp['slug']}.html">Read online</a><a class="pdf" href="pdf/{pp['slug']}.pdf" download>Download PDF · A4 · {pdf_info(PDF_DIR / (pp['slug'] + '.pdf'))}</a></div>
    </div>
  </section>""")
    idx = fill(INDEX, {"PAGE_VERSION": PAGE_VERSION, "PAGE_DATE": PAGE_DATE, "CHAT": CHAT, "BUILD_VERSION": __version__,
                       "FONTS": FONTS, "THEME_CSS": THEME_CSS, "THEME_JS": THEME_JS, "YEAR": year,
                       "COUNT_TEXT": f"{count} paper" + ("" if count == 1 else "s"), "CARDS": "\n".join(cards)})
    (HERE / "index.html").write_text(idx, encoding="utf-8")
    print(f"  html papers/index.html  ({count} paper{'s' if count != 1 else ''})")


if __name__ == "__main__":
    build(do_pdf="--no-pdf" not in sys.argv)
