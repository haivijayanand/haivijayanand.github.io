#!/usr/bin/env python3
"""
TOOL:    speaks/_build.py
FAMILY:  SITE
VERSION: 1.0.1
DATE:    2026-10-05
CHAT:    Blogger to GitHub migration (Vijay Anand Speaks)
CHANGES: 1.0.1 - English/Tamil chips and search now hide rows (CSS [hidden] rule; a.row display:grid was overriding it)
         1.0.0 - renders speaks/_content/*.json into /speaks/<yyyy>/<mm>/<slug>.html and rebuilds /speaks/index.html
STATUS:  working

Run:  python3 speaks/_build.py
Jekyll skips files that start with "_", so this script and the content folder are not published.

Pages keep Blogger's paths (/2026/09/slug.html becomes /speaks/2026/09/slug.html), so old links map one to one.
Comments: create a site on cusdis.com, paste its App ID into CUSDIS_APP_ID below, run the build again.
A blank App ID leaves the comment box out.

Content file (_content/<yyyy>-<mm>-<slug>.json):
  path "yyyy/mm/slug", title, date (ISO, +05:30), lang ("en" or "ta"), tags [..], description,
  hero {card, src, w, h} or null, words, blogger_url, body (cleaned HTML)
"""
__version__ = "1.0.1"

PAGE_VERSION = "1.0.0"
PAGE_DATE = "2026-10-05"
INDEX_VERSION = "1.0.1"
PAGE_CHANGES = ["v1.0.0  moved from vijayanandspeaks.blogspot.com"]

CUSDIS_APP_ID = ""                       # e.g. "a1b2c3d4-...." from cusdis.com → your site → Embed code
SITE = "https://haivijayanand.github.io"
BLOG_TITLE = "Vijay Anand Speaks"
BLOG_TAGLINE = "Inspirational things that I want to share with you."

import datetime as dt
import html
import json
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
CONTENT = HERE / "_content"

FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
         '<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;700&family=Noto+Serif+Tamil:wght@400;700&display=swap" rel="stylesheet">')

BASE_CSS = """
:root{--bg:#f5f2ea;--card:#fffdf8;--ink:#1d2421;--muted:#5d6763;--rule:#ddd6c8;--brand:#1f6f5c;--brand-ink:#fdfaf2;--frame:#ebe6da}
@media (prefers-color-scheme:dark){:root:not([data-theme=light]){--bg:#161a19;--card:#1f2523;--ink:#e8ece9;--muted:#9aa7a2;--rule:#33403b;--brand:#5cc3a6;--brand-ink:#10201b;--frame:#11171a}}
*{box-sizing:border-box}
html,body{margin:0}
body{background:var(--bg);color:var(--ink);font:18px/1.75 Georgia,'Noto Serif Tamil','Times New Roman',serif;-webkit-text-size-adjust:100%}
a{color:var(--brand)}
.ui,nav.top,.meta,.chips,.search,.foot,.pn,.share{font-family:'Segoe UI',system-ui,-apple-system,'Noto Sans Tamil',sans-serif}
.wrap{max-width:760px;margin:0 auto;padding:0 16px}
nav.top{font-size:14px;padding:14px 0;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
nav.top a{text-decoration:none}
:is(article,h1,h3,.pn a):lang(ta){font-family:'Noto Serif Tamil',Georgia,serif}
article:lang(ta){line-height:1.95}
"""

POST_CSS = """
h1{font-size:clamp(1.6em,5vw,2.2em);line-height:1.25;margin:10px 0 8px;letter-spacing:-.01em}
.meta{font-size:14px;color:var(--muted);margin:0 0 24px;display:flex;flex-wrap:wrap;gap:4px 14px}
.tag{background:var(--card);border:1px solid var(--rule);border-radius:999px;padding:0 10px;font-size:12.5px}
article h2{font-size:1.3em;line-height:1.35;margin:1.8em 0 .5em}
article h3{font-size:1.1em;margin:1.5em 0 .4em}
article p,article li{overflow-wrap:anywhere}
article blockquote{margin:1.2em 0;padding:.4em 1.1em;border-left:4px solid var(--brand);background:var(--card)}
article hr{border:0;border-top:1px solid var(--rule);margin:2em 0}
figure{margin:0 0 1.6em;background:var(--frame);border-radius:10px;overflow:hidden;display:flex;justify-content:center}
figure img{display:block;width:100%;height:auto;max-height:78vh;object-fit:contain}
article figure:not(:first-child){margin-top:1.6em}
.tbl{overflow-x:auto;margin:1.2em 0;border:1px solid var(--rule);border-radius:8px}
.tbl table{border-collapse:collapse;font:14.5px/1.5 'Segoe UI',system-ui,sans-serif;min-width:640px;width:100%}
.tbl th,.tbl td{padding:8px 10px;border-bottom:1px solid var(--rule);vertical-align:top;text-align:left}
.tbl th{background:var(--card);position:sticky;top:0}
.share{display:flex;gap:10px;flex-wrap:wrap;margin:2.4em 0 1em}
.share button,.share a{font-size:14px;border:1px solid var(--rule);background:var(--card);color:var(--ink);border-radius:999px;padding:7px 14px;cursor:pointer;text-decoration:none}
.pn{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:1.5em 0;font-size:14px}
.pn a{display:block;border:1px solid var(--rule);background:var(--card);border-radius:10px;padding:10px 14px;text-decoration:none;color:var(--ink)}
.pn small{display:block;color:var(--muted)}
.pn .next{text-align:right;grid-column:2}
#comments{margin:2em 0}
.foot{font-size:13px;color:var(--muted);border-top:1px solid var(--rule);padding:16px 0 40px;margin-top:2em}
@media (max-width:560px){body{font-size:17px}.pn{grid-template-columns:1fr}.pn .next{grid-column:1}}
"""

INDEX_CSS = """
.band{background:linear-gradient(120deg,#123c33,#1f6f5c);color:#eaf4f0}
.band .wrap{padding:28px 16px 24px}
.band h1{font-size:clamp(28px,6vw,40px);margin:0 0 4px;line-height:1.15}
.band p{margin:0;color:#b8d4cb;font-size:16px}
.band nav.top a{color:#eaf4f0}
.tools{position:sticky;top:0;z-index:2;background:var(--bg);border-bottom:1px solid var(--rule);padding:12px 0}
.search{width:100%;font-size:16px;color:var(--ink);background:var(--card);border:1px solid var(--rule);border-radius:10px;padding:10px 14px}
[hidden]{display:none!important}
.chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;font-size:13.5px}
.chips button{border:1px solid var(--rule);background:var(--card);color:var(--ink);border-radius:999px;padding:4px 12px;cursor:pointer}
.chips button[aria-pressed=true]{background:var(--brand);border-color:var(--brand);color:var(--brand-ink)}
.count{font:13px 'Segoe UI',system-ui,sans-serif;color:var(--muted);margin:14px 0 0}
h2.year{font:700 14px 'Segoe UI',system-ui,sans-serif;letter-spacing:.1em;color:var(--brand);margin:28px 0 8px;border-bottom:1px solid var(--rule);padding-bottom:6px}
a.row{display:grid;grid-template-columns:168px 1fr;gap:16px;align-items:start;text-decoration:none;color:var(--ink);padding:12px 0;border-bottom:1px solid var(--rule)}
a.row:hover h3{color:var(--brand)}
.thumb{aspect-ratio:1200/630;border-radius:8px;overflow:hidden;background:var(--frame)}
.thumb img{width:100%;height:100%;object-fit:cover;display:block}
.thumb.none{display:flex;align-items:center;justify-content:center;font:700 40px Georgia,'Noto Serif Tamil',serif;color:var(--brand);background:linear-gradient(135deg,var(--card),var(--frame))}
a.row h3{font-size:19px;line-height:1.35;margin:0 0 4px}
a.row .meta{font-size:13px;color:var(--muted);margin:0 0 4px}
a.row p{margin:0;font-size:15px;line-height:1.55;color:var(--muted);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
@media (max-width:560px){a.row{grid-template-columns:104px 1fr;gap:12px}a.row h3{font-size:16.5px}a.row p{display:none}}
.foot{font:13px 'Segoe UI',system-ui,sans-serif;color:var(--muted);padding:24px 0 40px}
"""


def esc(s):
    return html.escape(str(s), quote=True)


def load():
    items = []
    for f in sorted(CONTENT.glob("*.json")):
        c = json.loads(f.read_text(encoding="utf-8"))
        for k in ("path", "title", "date", "lang", "body"):
            if k not in c:
                raise SystemExit(f"{f.name}: missing '{k}'")
        c["dt"] = dt.datetime.fromisoformat(c["date"])
        c["url"] = f"/speaks/{c['path']}.html"
        items.append(c)
    items.sort(key=lambda c: c["dt"])
    return items


def minutes(c):
    rate = 120 if c["lang"] == "ta" else 200
    return max(1, round(c.get("words", 0) / rate))


def nice_date(d):
    return d.strftime("%d %b %Y").lstrip("0")


def header(tool, title, changes, built_by=True, version=None):
    lines = [f"TOOL    : {tool}", "FAMILY  : SITE", f"VERSION : {version or PAGE_VERSION}", f"DATE    : {PAGE_DATE}",
             "CHAT    : Blogger to GitHub migration (Vijay Anand Speaks)",
             "CHANGES : " + "\n          ".join(changes), "STATUS  : working"]
    if built_by:
        lines.append(f"BUILT BY: speaks/_build.py v{__version__}")
    return "<!DOCTYPE html>\n<!--\n" + "\n".join(lines) + "\n-->\n"


def head(title, desc, url, image, extra_css, lang):
    og_img = f'<meta property="og:image" content="{SITE}{image}"><meta name="twitter:card" content="summary_large_image">' if image else ""
    return f"""<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="{SITE}{url}">
<meta property="og:type" content="article"><meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}"><meta property="og:url" content="{SITE}{url}">{og_img}
<meta name="theme-color" content="#1f6f5c">
{FONTS}
<style>{BASE_CSS}{extra_css}</style>
</head>
"""


def comments(c):
    if not CUSDIS_APP_ID:
        return ""
    return (f'<section id="comments" class="ui"><h2 style="font-size:1.1em">Comments</h2>'
            f'<div id="cusdis_thread" data-host="https://cusdis.com" data-app-id="{esc(CUSDIS_APP_ID)}" '
            f'data-page-id="{esc(c["path"])}" data-page-url="{SITE}{c["url"]}" data-page-title="{esc(c["title"])}" data-theme="auto"></div>'
            '<script async defer src="https://cusdis.com/js/cusdis.es.js"></script></section>')


def render_post(c, prev, nxt):
    tags = "".join(f'<span class="tag">{esc(t)}</span>' for t in c.get("tags", []))
    lang_label = '<span class="tag">தமிழ்</span>' if c["lang"] == "ta" else ""
    pn = ""
    if prev:
        pn += f'<a class="prev" href="{prev["url"]}"><small>← Older</small>{esc(prev["title"])}</a>'
    if nxt:
        pn += f'<a class="next" href="{nxt["url"]}"><small>Newer →</small>{esc(nxt["title"])}</a>'
    image = (c.get("hero") or {}).get("card")
    first = nice_date(c["dt"])
    return (header(f"speaks/{c['path']}.html — {c['title']}", c["title"], [PAGE_CHANGES[0]])
            + head(f"{c['title']} — {BLOG_TITLE}", c.get("description", ""), c["url"], image, POST_CSS, c["lang"])
            + f"""<body>
<div class="wrap">
<nav class="top"><a href="/speaks/">← {BLOG_TITLE}</a><a href="/">K Vijay Anand</a></nav>
<h1>{esc(c['title'])}</h1>
<p class="meta"><time datetime="{c['date']}">{first}</time><span>{minutes(c)} min read</span>{lang_label}{tags}</p>
<article>
{c['body']}
</article>
<div class="share"><button type="button" id="share">Share</button><a id="wa" href="https://wa.me/?text={esc(html.escape(c['title']) + ' ' + SITE + c['url'])}" target="_blank" rel="noopener">WhatsApp</a><button type="button" id="copy">Copy link</button></div>
<nav class="pn">{pn}</nav>
{comments(c)}
<p class="foot">By K Vijay Anand · first published {first} on vijayanandspeaks.blogspot.com</p>
</div>
<script>
(function(){{
  var u=location.href.split('#')[0], t=document.title;
  var s=document.getElementById('share');
  if(!navigator.share) s.style.display='none';
  s.onclick=function(){{navigator.share({{title:t,url:u}}).catch(function(){{}})}};
  document.getElementById('copy').onclick=function(){{
    var b=this; (navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(function(){{b.textContent='Copied'}},function(){{prompt('Copy this link',u)}});
  }};
}})();
</script>
</body>
</html>
""")


def render_index(items):
    rows, year = [], None
    for c in reversed(items):
        if c["dt"].year != year:
            year = c["dt"].year
            rows.append(f'<h2 class="year" data-year="{year}">{year}</h2>')
        hero = c.get("hero")
        if hero:
            thumb = f'<div class="thumb"><img src="{hero["card"]}" alt="" loading="lazy" width="1200" height="630"></div>'
        else:
            thumb = f'<div class="thumb none" aria-hidden="true">{esc(c["title"][:1])}</div>'
        hay = " ".join([c["title"], c.get("description", ""), " ".join(c.get("tags", []))]).lower()
        rows.append(
            f'<a class="row" href="{c["url"]}" data-lang="{c["lang"]}" data-year="{year}" data-s="{esc(hay)}" lang="{c["lang"]}">{thumb}'
            f'<div><h3>{esc(c["title"])}</h3><p class="meta">{nice_date(c["dt"])} · {minutes(c)} min</p>'
            f'<p>{esc(c.get("description", ""))}</p></div></a>')
    n, ta = len(items), sum(1 for c in items if c["lang"] == "ta")
    first, last = items[0]["dt"].year, items[-1]["dt"].year
    desc = f"{n} essays by K Vijay Anand on life, family, work and leadership, {first}–{last}, in English and Tamil."
    built = dt.date.today().isoformat()
    return (header("speaks/index.html — list of Vijay Anand Speaks essays", "", [f"v{INDEX_VERSION}  {n} essays ({ta} Tamil), rebuilt {built}; English/Tamil filter and search now hide essays", "v1.0.0  first list"], version=INDEX_VERSION)
            + head(f"{BLOG_TITLE} — K Vijay Anand", desc, "/speaks/", items[-1].get("hero", {}).get("card") if items[-1].get("hero") else None, INDEX_CSS, "en")
            + f"""<body>
<header class="band"><div class="wrap">
<nav class="top"><a href="/">← K Vijay Anand</a><a href="/tools/">Tools</a></nav>
<h1>{BLOG_TITLE}</h1>
<p>{BLOG_TAGLINE} {n} essays, {first}–{last}.</p>
</div></header>
<div class="tools"><div class="wrap">
<input class="search" id="q" type="search" placeholder="Search titles and summaries" aria-label="Search essays" autocomplete="off">
<div class="chips" role="group" aria-label="Language"><button type="button" data-l="" aria-pressed="true">All {n}</button><button type="button" data-l="en" aria-pressed="false">English {n - ta}</button><button type="button" data-l="ta" aria-pressed="false" lang="ta">தமிழ் {ta}</button></div>
</div></div>
<main class="wrap">
<p class="count" id="count"></p>
{chr(10).join(rows)}
<p class="foot">Moved from vijayanandspeaks.blogspot.com · K Vijay Anand, Chennai</p>
</main>
<script>
(function(){{
  var q=document.getElementById('q'), lang='', rows=[].slice.call(document.querySelectorAll('a.row')),
      years=[].slice.call(document.querySelectorAll('h2.year')), count=document.getElementById('count');
  function run(){{
    var w=q.value.trim().toLowerCase().split(/\\s+/).filter(Boolean), shown=0, seen={{}};
    rows.forEach(function(r){{
      var ok=(!lang||r.dataset.lang===lang)&&w.every(function(x){{return r.dataset.s.indexOf(x)>=0}});
      r.hidden=!ok; if(ok){{shown++; seen[r.dataset.year]=1}}
    }});
    years.forEach(function(h){{h.hidden=!seen[h.dataset.year]}});
    count.textContent=(w.length||lang)?shown+' of '+rows.length+' essays':'';
  }}
  q.addEventListener('input',run);
  [].forEach.call(document.querySelectorAll('.chips button'),function(b){{
    b.onclick=function(){{lang=b.dataset.l;[].forEach.call(b.parentNode.children,function(x){{x.setAttribute('aria-pressed',x===b)}});run()}};
  }});
}})();
</script>
</body>
</html>
""")


def main():
    items = load()
    out_paths = set()
    for i, c in enumerate(items):
        dest = HERE / f"{c['path']}.html"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(render_post(c, items[i - 1] if i else None, items[i + 1] if i + 1 < len(items) else None), encoding="utf-8")
        out_paths.add(dest)
    # drop pages whose content file was removed
    for f in HERE.glob("[0-9][0-9][0-9][0-9]/*/*.html"):
        if f not in out_paths:
            f.unlink()
    (HERE / "index.html").write_text(render_index(items), encoding="utf-8")
    print(f"built {len(items)} essays and speaks/index.html" + ("" if CUSDIS_APP_ID else "  (comments off: CUSDIS_APP_ID is blank)"))


if __name__ == "__main__":
    main()
