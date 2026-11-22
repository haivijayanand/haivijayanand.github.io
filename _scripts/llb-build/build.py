#!/usr/bin/env python3
"""
TOOL:    build.py — assembles a B.A. LL.B. / B.Com. LL.B. explorer page from the shared engine + a course content file
FAMILY:  law-explorers
VERSION: 1.1.0
DATE:    2026-11-22
CHAT:    Kaavya Study Materials – TNNLU B.Com. LL.B. Semester II explorers (claude.ai, 2026-11-22)
CHANGES: 1.1.0 - course.json may set "prog" ("ba" or "bcom", default bcom), "shared" (course common to both) and "chat"; "pre" lists helper files placed before the content
         1.0.0 - first version: engine, CSS and revision views taken from llb-law-of-torts.html
usage:   python3 _scripts/llb-build/build.py _scripts/llb-build/<course>/course.json
         (the engine, CSS and revision views are copied from tools/llb-law-of-torts.html)
"""
__version__ = "1.1.0"
import json, sys, re, pathlib

REPO = pathlib.Path(__file__).resolve().parents[2]   # repo root (this file lives in _scripts/llb-build/)
TPL = (REPO / "tools/llb-law-of-torts.html").read_text(encoding="utf-8")

def between(s, a, b, inc_a=True):
    i = s.index(a); j = s.index(b, i + len(a))
    return s[i if inc_a else i + len(a): j]

CSS = between(TPL, "<style>", "</style>", inc_a=False)
ENGINE = between(TPL, "/* ============================================================\n   STATE", "VIEWS.home = {")
REVISE = between(TPL, "/* ---------------- CASES", "/* ---------------- REFERENCES")
EVENTS = between(TPL, "/* ============================================================\n   EVENTS", "</script>")

def build(cfg_path):
    cfg = json.loads(pathlib.Path(cfg_path).read_text(encoding="utf-8"))
    base = pathlib.Path(cfg_path).parent
    content = "".join((base / f).read_text(encoding="utf-8") + "\n" for f in cfg.get("pre", [])) + (base / cfg["content"]).read_text(encoding="utf-8")
    extra_css = "".join((base / cfg[k]).read_text(encoding="utf-8") for k in ("css", "css2") if cfg.get(k))
    eng = re.sub(r'const KEY = "[^"]+", SBKEY = "[^"]+";',
                 f'const KEY = "{cfg["key"]}", SBKEY = "{cfg["key"]}_sidebar";', ENGINE)
    assert cfg["key"] in eng
    changes = "\n         ".join(cfg["changes"])
    PROGS = {"ba": "B.A. LL.B. (Hons.)", "bcom": "B.Com. LL.B. (Hons.)"}
    pk = cfg.get("prog", "bcom")
    prog = "B.A. LL.B. / B.Com. LL.B. (Hons.)" if cfg.get("shared") else PROGS[pk]
    progshort = "B.A. LL.B. / B.Com. LL.B." if cfg.get("shared") else PROGS[pk].replace(" (Hons.)", "")
    chat = cfg.get("chat", "Kaavya Study Materials – TNNLU B.Com. LL.B. Semester II explorers (claude.ai, 2026-11-22)")
    pattr = ' data-shared="1"' if cfg.get("shared") else f' data-prog="{pk}"'
    hub = "/llb/" if cfg.get("shared") else f"/llb/#{pk}"
    html = f"""<!DOCTYPE html>
<!--
TOOL:    {cfg['course']} – {progshort} {cfg['sem']}
FAMILY:  law-explorers
VERSION: {cfg['version']}
DATE:    {cfg['date']}
CHAT:    {chat}
CHANGES: {changes}
STATUS:  {cfg['status']}
-->
<html lang="en">
<head>
<script src="/assets/js/site-theme.js"></script>
<meta charset="utf-8">
<meta name="sp-track" content="off">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="{cfg['description']}">
<title>{cfg['course']} – {cfg['sem']}</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>{cfg['emoji']}</text></svg>">
<style>{CSS}{extra_css}
</style>
  <script type="module" src="/assets/js/site-progress.js"></script>
</head>
<body>
<header id="top">
  <button class="tbtn" id="sbBtn" title="Show or hide the unit list (M)">☰<kbd>M</kbd></button>
  <h1>{cfg['emoji']} {cfg['course']} <small>{prog} · {cfg['sem']}</small></h1>
  <span id="prog"></span>
  <a class="tbtn" href="{hub}" title="All {progshort} courses" style="text-decoration:none">⌂ Courses</a>
  <button class="tbtn" id="themeBtn" title="Light or dark theme">☾ Theme</button>
  <button class="tbtn" id="fsBtn" title="Full screen (F)">⛶ Full screen</button>
</header>
<div id="wrap">
  <nav id="side" aria-label="Units"></nav>
  <main id="main"><div class="inner" id="view"></div></main>
</div>
<div class="toast" id="toast"></div>
<script>
"use strict";
/* ============================================================
   DATA AND UNIT PAGES ({cfg['course']})
   ============================================================ */
"""
    # content file holds everything course-specific, split by a marker:
    #   ...data (UNITS, EXTRAS, FLASH, MAXIMS, CASES, QUIZ, ...)
    #   //@@VIEWS
    #   ...VIEWS.home, unit views, extra views, VIEWS.refs, footer()
    data, views = content.split("//@@VIEWS", 1)
    html = html.replace("\n<script>\n\"use strict\";", "\n<script>\n\"use strict\";", 1)
    html += data + "\n" + eng + views + "\n" + REVISE + EVENTS + "</script>\n"
    html += f'<script src="/assets/js/llb-progress.js" data-course="{cfg["course"]}" data-sem="{cfg["sem"]}" data-slug="{cfg["slug"]}"{pattr}></script>\n</body>\n</html>\n'
    out = REPO / "tools" / f"llb-{cfg['slug']}.html"
    out.write_text(html, encoding="utf-8")
    print(out, len(html), "bytes")

if __name__ == "__main__":
    build(sys.argv[1])
