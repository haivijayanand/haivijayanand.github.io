#!/usr/bin/env python3
"""
TOOL:    speaks/_build.py
FAMILY:  SITE
VERSION: 1.3.0
DATE:    2026-10-09
CHAT:    Blogger to GitHub migration (Vijay Anand Speaks)
CHANGES: 1.3.0 - index header shrunk to two lines and pinned at the top; Home and Tools links moved into the filter sidebar
         1.2.0 - desktop index (>=1100 px) uses the full width: sticky filter sidebar + responsive card grid
         1.1.0 - topic tags from _topics.json; index gets multi-select language/topic filters (Any/All), sort by date, group by year or topic, shareable URL
         1.0.1 - English/Tamil chips and search now hide rows (CSS [hidden] rule; a.row display:grid was overriding it)
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

Topics (_topics.json): { "<content file name without .json>": ["Management", "Philosophy"], ... }
  "_topics" lists the allowed topics in the order the filter shows them. Every essay needs at least one.
  Kept apart from _content so running _import_blogger.py again does not wipe them.
"""
__version__ = "1.3.0"

PAGE_VERSION = "1.1.0"
PAGE_DATE = "2026-10-09"
INDEX_VERSION = "1.3.0"
PAGE_CHANGES = ["v1.1.0  topic tags that open the list filtered to that topic", "v1.0.0  moved from vijayanandspeaks.blogspot.com"]

CUSDIS_APP_ID = ""                       # e.g. "a1b2c3d4-...." from cusdis.com → your site → Embed code
SITE = "https://haivijayanand.github.io"
BLOG_TITLE = "Vijay Anand Speaks"
BLOG_TAGLINE = "Inspirational things that I want to share with you."

import datetime as dt
import html
import json
import re
import urllib.parse
from pathlib import Path

HERE = Path(__file__).resolve().parent
CONTENT = HERE / "_content"
TOPICS_FILE = HERE / "_topics.json"

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
a.tag{color:var(--brand);text-decoration:none}
a.tag:hover{border-color:var(--brand)}
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
.wrap.wide{max-width:960px}
.band{background:linear-gradient(120deg,#123c33,#1f6f5c);color:#eaf4f0;position:sticky;top:0;z-index:5;box-shadow:0 2px 8px rgba(0,0,0,.12)}
.band .wrap{padding:10px 16px 11px}
.band h1{font-size:clamp(22px,4.5vw,28px);margin:0;line-height:1.25}
.band p{margin:1px 0 0;color:#b8d4cb;font-size:14.5px;line-height:1.4}
.band h1,.band p{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.links{display:flex;gap:8px;margin-bottom:12px;font-size:13.5px}
.links a{border:1px solid var(--rule);background:var(--card);color:var(--brand);border-radius:999px;padding:4px 14px;text-decoration:none}
.links a:hover{border-color:var(--brand)}
.tools{background:var(--bg);border-bottom:1px solid var(--rule);padding:12px 0;font-family:'Segoe UI',system-ui,-apple-system,'Noto Sans Tamil',sans-serif}
@media (min-width:900px){.tools{position:sticky;top:var(--bh,64px);z-index:2}}
.search{width:100%;font-size:16px;color:var(--ink);background:var(--card);border:1px solid var(--rule);border-radius:10px;padding:10px 14px}
[hidden]{display:none!important}
.frow{display:flex;gap:8px 12px;align-items:baseline;margin-top:10px;font-size:13.5px}
.frow>.lbl{flex:0 0 74px;color:var(--muted);font-size:12px;letter-spacing:.06em;text-transform:uppercase}
.chips{display:flex;gap:6px 8px;flex-wrap:wrap;flex:1}
.chips button,.seg button,.clear{font:inherit;border:1px solid var(--rule);background:var(--card);color:var(--ink);border-radius:999px;padding:4px 12px;cursor:pointer}
.chips button small{color:var(--muted);margin-left:3px}
.chips button[aria-pressed=true]{background:var(--brand);border-color:var(--brand);color:var(--brand-ink)}
.chips button[aria-pressed=true] small{color:inherit;opacity:.8}
.chips button.zero{opacity:.45}
.seg{display:inline-flex;border:1px solid var(--rule);border-radius:999px;overflow:hidden;flex:0 0 auto}
.seg button{border:0;border-radius:0;padding:4px 11px}
.seg button+button{border-left:1px solid var(--rule)}
.seg button[aria-pressed=true]{background:var(--brand);color:var(--brand-ink)}
.view{flex-wrap:wrap}
.view .grp{display:flex;gap:8px;align-items:center;margin-right:10px}
.view .grp span{color:var(--muted);font-size:12px;letter-spacing:.06em;text-transform:uppercase}
.clear{margin-left:auto;color:var(--brand)}
.count{font:13px 'Segoe UI',system-ui,sans-serif;color:var(--muted);margin:14px 0 0}
h2.grp{font:700 14px 'Segoe UI',system-ui,sans-serif;letter-spacing:.1em;color:var(--brand);margin:28px 0 8px;border-bottom:1px solid var(--rule);padding-bottom:6px;display:flex;justify-content:space-between}
h2.grp small{font-weight:400;letter-spacing:0;color:var(--muted)}
a.row{display:grid;grid-template-columns:168px 1fr;gap:16px;align-items:start;text-decoration:none;color:var(--ink);padding:12px 0;border-bottom:1px solid var(--rule)}
a.row:hover h3{color:var(--brand)}
.thumb{aspect-ratio:1200/630;border-radius:8px;overflow:hidden;background:var(--frame)}
.thumb img{width:100%;height:100%;object-fit:cover;display:block}
.thumb.none{display:flex;align-items:center;justify-content:center;font:700 40px Georgia,'Noto Serif Tamil',serif;color:var(--brand);background:linear-gradient(135deg,var(--card),var(--frame))}
a.row h3{font-size:19px;line-height:1.35;margin:0 0 4px}
a.row .meta{font-size:13px;color:var(--muted);margin:0 0 4px}
a.row .tp{color:var(--brand)}
a.row p{margin:0;font-size:15px;line-height:1.55;color:var(--muted);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.empty{font:15px 'Segoe UI',system-ui,sans-serif;color:var(--muted);padding:30px 0}
@media (max-width:560px){a.row{grid-template-columns:104px 1fr;gap:12px}a.row h3{font-size:16.5px}a.row p{display:none}
  .frow{flex-direction:column;align-items:stretch;gap:6px}.frow>.lbl{flex:none}.clear{margin-left:0;align-self:flex-start}}
.foot{font:13px 'Segoe UI',system-ui,sans-serif;color:var(--muted);padding:24px 0 40px}
@media (min-width:1100px){
  .wrap.wide{max-width:1840px;padding:0 32px}
  .band .wrap{padding:10px 32px 11px}
  .layout{display:grid;grid-template-columns:272px minmax(0,1fr);gap:40px;align-items:start}
  .tools{position:sticky;top:var(--bh,64px);z-index:2;max-height:calc(100vh - var(--bh,64px));overflow-y:auto;border:0;padding:22px 4px 24px 0;scrollbar-width:thin}
  .tools .frow{flex-direction:column;align-items:stretch;gap:8px;margin-top:20px}
  .frow>.lbl{flex:none}
  #langs button{flex:1;text-align:center}
  #topics{flex-direction:column;gap:3px}
  #topics button{display:flex;justify-content:space-between;align-items:baseline;border-radius:8px;text-align:left;padding:4px 12px;border-color:transparent;background:transparent}
  #topics button:hover{background:var(--card);border-color:var(--rule)}
  #topics button[aria-pressed=true]{background:var(--brand);border-color:var(--brand)}
  .seg{display:flex}.seg button{flex:1;padding:5px 8px}
  .view .grp{flex-direction:column;align-items:stretch;gap:5px;margin:0 0 6px}
  .clear{margin:4px 0 0;align-self:stretch}
  .count{margin:26px 0 0}
  #list{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:22px;margin-top:4px}
  h2.grp{grid-column:1/-1;margin:16px 0 -4px}
  a.row{display:flex;flex-direction:column;padding:0;border:1px solid var(--rule);border-radius:12px;background:var(--card);overflow:hidden;transition:transform .15s,box-shadow .15s,border-color .15s}
  a.row:hover{transform:translateY(-2px);border-color:var(--brand);box-shadow:0 6px 18px rgba(0,0,0,.08)}
  a.row .thumb{border-radius:0;width:100%;flex:none}
  a.row>div:last-child{padding:12px 16px 16px;display:flex;flex-direction:column;gap:2px}
  a.row h3{font-size:18px}
  a.row p{-webkit-line-clamp:3}
}
"""


def esc(s):
    return html.escape(str(s), quote=True)


def load_topics():
    t = json.loads(TOPICS_FILE.read_text(encoding="utf-8"))
    order = t["_topics"]
    return order, {k: v for k, v in t.items() if not k.startswith("_")}


def load():
    order, tmap = load_topics()
    items, untagged = [], []
    for f in sorted(CONTENT.glob("*.json")):
        c = json.loads(f.read_text(encoding="utf-8"))
        for k in ("path", "title", "date", "lang", "body"):
            if k not in c:
                raise SystemExit(f"{f.name}: missing '{k}'")
        c["dt"] = dt.datetime.fromisoformat(c["date"])
        c["url"] = f"/speaks/{c['path']}.html"
        c["topics"] = tmap.get(f.stem, [])
        for t in c["topics"]:
            if t not in order:
                raise SystemExit(f"_topics.json: '{t}' on {f.stem} is not in _topics")
        if not c["topics"]:
            untagged.append(f.stem)
        items.append(c)
    if untagged:
        print(f"warning: {len(untagged)} essays have no topic in _topics.json: " + ", ".join(untagged))
    items.sort(key=lambda c: c["dt"])
    return items, order


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
    tags = "".join(f'<a class="tag" href="/speaks/?t={urllib.parse.quote(t)}">{esc(t)}</a>' for t in c["topics"])
    lang_label = '<span class="tag">தமிழ்</span>' if c["lang"] == "ta" else ""
    pn = ""
    if prev:
        pn += f'<a class="prev" href="{prev["url"]}"><small>← Older</small>{esc(prev["title"])}</a>'
    if nxt:
        pn += f'<a class="next" href="{nxt["url"]}"><small>Newer →</small>{esc(nxt["title"])}</a>'
    image = (c.get("hero") or {}).get("card")
    first = nice_date(c["dt"])
    return (header(f"speaks/{c['path']}.html — {c['title']}", c["title"], PAGE_CHANGES)
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


def render_index(items, order):
    rows = []
    for c in reversed(items):
        hero = c.get("hero")
        if hero:
            thumb = f'<div class="thumb"><img src="{hero["card"]}" alt="" loading="lazy" width="1200" height="630"></div>'
        else:
            thumb = f'<div class="thumb none" aria-hidden="true">{esc(c["title"][:1])}</div>'
        hay = " ".join([c["title"], c.get("description", ""), " ".join(c.get("tags", [])), " ".join(c["topics"])]).lower()
        tp = f' · <span class="tp">{esc(" · ".join(c["topics"]))}</span>' if c["topics"] else ""
        rows.append(
            f'<a class="row" href="{c["url"]}" data-lang="{c["lang"]}" data-d="{c["date"]}" data-t="{esc("|".join(c["topics"]))}" data-s="{esc(hay)}" lang="{c["lang"]}">{thumb}'
            f'<div><h3>{esc(c["title"])}</h3><p class="meta">{nice_date(c["dt"])} · {minutes(c)} min{tp}</p>'
            f'<p>{esc(c.get("description", ""))}</p></div></a>')
    n, ta = len(items), sum(1 for c in items if c["lang"] == "ta")
    first, last = items[0]["dt"].year, items[-1]["dt"].year
    tcount = {t: sum(1 for c in items if t in c["topics"]) for t in order}
    topic_chips = "".join(f'<button type="button" data-t="{esc(t)}" aria-pressed="false">{esc(t)}<small>{tcount[t]}</small></button>'
                          for t in order if tcount[t])
    desc = f"{n} essays by K Vijay Anand on life, family, work and leadership, {first}–{last}, in English and Tamil."
    built = dt.date.today().isoformat()
    return (header("speaks/index.html — list of Vijay Anand Speaks essays", "",
                   [f"v{INDEX_VERSION}  {n} essays ({ta} Tamil), rebuilt {built}; multi-select language and topic filters (Any/All), sort by date, group by year or topic",
                    "v1.0.1  English/Tamil filter and search hide essays", "v1.0.0  first list"], version=INDEX_VERSION)
            + head(f"{BLOG_TITLE} — K Vijay Anand", desc, "/speaks/", items[-1].get("hero", {}).get("card") if items[-1].get("hero") else None, INDEX_CSS, "en")
            + f"""<body>
<header class="band" id="band"><div class="wrap wide">
<h1>{BLOG_TITLE}</h1>
<p>{BLOG_TAGLINE} {n} essays, {first}–{last}.</p>
</div></header>
<div class="wrap wide layout"><aside class="tools" aria-label="Filters">
<nav class="links" aria-label="Site"><a href="/">← Home</a><a href="/tools/">Tools</a></nav>
<input class="search" id="q" type="search" placeholder="Search essays" aria-label="Search essays" autocomplete="off">
<div class="frow"><span class="lbl">Language</span><div class="chips" id="langs" role="group" aria-label="Language"><button type="button" data-l="en" aria-pressed="false">English<small>{n - ta}</small></button><button type="button" data-l="ta" aria-pressed="false" lang="ta">தமிழ்<small>{ta}</small></button></div></div>
<div class="frow"><span class="lbl">Topics</span><div class="chips" id="topics" role="group" aria-label="Topics">{topic_chips}</div>
<div class="seg" id="match" role="group" aria-label="Topic match" title="Any: essay has at least one chosen topic. All: essay has every chosen topic."><button type="button" data-m="any" aria-pressed="true">Any</button><button type="button" data-m="all" aria-pressed="false">All</button></div></div>
<div class="frow view"><span class="lbl">View</span>
<div class="grp"><span>Sort</span><div class="seg" id="sort" role="group" aria-label="Sort by date"><button type="button" data-s="new" aria-pressed="true">Newest</button><button type="button" data-s="old" aria-pressed="false">Oldest</button></div></div>
<div class="grp"><span>Group</span><div class="seg" id="group" role="group" aria-label="Group by"><button type="button" data-g="year" aria-pressed="true">Year</button><button type="button" data-g="topic" aria-pressed="false">Topic</button><button type="button" data-g="none" aria-pressed="false">None</button></div></div>
<button type="button" class="clear" id="clear" hidden>Clear filters</button></div>
</aside>
<main>
<p class="count" id="count" aria-live="polite"></p>
<div id="list">
{chr(10).join(rows)}
</div>
<p class="empty" id="empty" hidden>No essays match these filters.</p>
<p class="foot">Moved from vijayanandspeaks.blogspot.com · K Vijay Anand, Chennai</p>
</main></div>
<script>
(function(){{
  var $=function(id){{return document.getElementById(id)}}, each=function(l,f){{[].forEach.call(l,f)}};
  var list=$('list'), q=$('q'), count=$('count'), empty=$('empty'), clear=$('clear');
  var ORDER={json.dumps([t for t in order if tcount[t]], ensure_ascii=False)};
  var rows=[].slice.call(list.querySelectorAll('a.row')).map(function(r){{
    return {{el:r, lang:r.dataset.lang, d:r.dataset.d, t:r.dataset.t?r.dataset.t.split('|'):[], s:r.dataset.s}};
  }});
  var st={{langs:[], topics:[], match:'any', sort:'new', group:'year'}};

  function press(box,attr,vals){{each($(box).children,function(b){{b.setAttribute('aria-pressed',vals.indexOf(b.dataset[attr])>=0)}})}}
  function multi(box,attr,key){{
    each($(box).children,function(b){{b.onclick=function(){{
      var v=b.dataset[attr], a=st[key], i=a.indexOf(v); if(i>=0)a.splice(i,1); else a.push(v); run();
    }}}});
  }}
  function single(box,attr,key){{
    each($(box).children,function(b){{b.onclick=function(){{st[key]=b.dataset[attr]; run()}}}});
  }}
  multi('langs','l','langs'); multi('topics','t','topics');
  single('match','m','match'); single('sort','s','sort'); single('group','g','group');
  q.addEventListener('input',run);
  clear.onclick=function(){{q.value=''; st.langs=[]; st.topics=[]; run()}};

  function words(){{return q.value.trim().toLowerCase().split(/\\s+/).filter(Boolean)}}
  function passText(r,w){{return w.every(function(x){{return r.s.indexOf(x)>=0}})}}
  function passLang(r){{return !st.langs.length||st.langs.indexOf(r.lang)>=0}}
  function passTopic(r){{
    if(!st.topics.length) return true;
    var has=function(t){{return r.t.indexOf(t)>=0}};
    return st.match==='all'?st.topics.every(has):st.topics.some(has);
  }}
  function head(label,n){{
    var h=document.createElement('h2'); h.className='grp';
    h.innerHTML='<span></span><small></small>'; h.firstChild.textContent=label;
    h.lastChild.textContent=n+(n===1?' essay':' essays'); return h;
  }}

  function run(){{
    var w=words();
    var hit=rows.filter(function(r){{return passText(r,w)&&passLang(r)&&passTopic(r)}});
    hit.sort(function(a,b){{return st.sort==='new'?(a.d<b.d?1:-1):(a.d<b.d?-1:1)}});

    // topic chip counts reflect the other filters, so empty combinations are visible before clicking
    var base=rows.filter(function(r){{return passText(r,w)&&passLang(r)}});
    each($('topics').children,function(b){{
      var t=b.dataset.t, c=base.filter(function(r){{return r.t.indexOf(t)>=0}}).length;
      b.querySelector('small').textContent=c; b.classList.toggle('zero',!c);
    }});

    var frag=document.createDocumentFragment(), used={{}};
    function put(r){{frag.appendChild(used[r.d+r.el.href]?r.el.cloneNode(true):r.el); used[r.d+r.el.href]=1}}
    if(st.group==='year'){{
      var by={{}}, keys=[];
      hit.forEach(function(r){{var y=r.d.slice(0,4); if(!by[y]){{by[y]=[];keys.push(y)}} by[y].push(r)}});
      keys.forEach(function(y){{frag.appendChild(head(y,by[y].length)); by[y].forEach(put)}});
    }} else if(st.group==='topic'){{
      var tops=st.topics.length?ORDER.filter(function(t){{return st.topics.indexOf(t)>=0}}):ORDER;
      tops.forEach(function(t){{
        var g=hit.filter(function(r){{return r.t.indexOf(t)>=0}});
        if(g.length){{frag.appendChild(head(t,g.length)); g.forEach(put)}}
      }});
    }} else hit.forEach(put);
    list.textContent=''; list.appendChild(frag);

    press('langs','l',st.langs); press('topics','t',st.topics);
    press('match','m',[st.match]); press('sort','s',[st.sort]); press('group','g',[st.group]);
    $('match').hidden=st.topics.length<2;
    var filtered=w.length||st.langs.length||st.topics.length;
    clear.hidden=!filtered; empty.hidden=!!hit.length;
    count.textContent=filtered?hit.length+' of '+rows.length+' essays':rows.length+' essays';
    save();
  }}

  // filters live in the address so a filtered list can be bookmarked or shared
  function save(){{
    var p=new URLSearchParams();
    if(q.value.trim()) p.set('q',q.value.trim());
    if(st.langs.length) p.set('l',st.langs.join(','));
    if(st.topics.length) p.set('t',st.topics.join(','));
    if(st.match!=='any') p.set('m',st.match);
    if(st.sort!=='new') p.set('s',st.sort);
    if(st.group!=='year') p.set('g',st.group);
    var s=p.toString().replace(/%2C/g,',');
    try{{history.replaceState(null,'',location.pathname+(s?'?'+s:''))}}catch(e){{}}
  }}
  function load(){{
    var p=new URLSearchParams(location.search), sp=function(k){{return (p.get(k)||'').split(',').filter(Boolean)}};
    q.value=p.get('q')||'';
    st.langs=sp('l').filter(function(l){{return l==='en'||l==='ta'}});
    st.topics=sp('t').filter(function(t){{return ORDER.indexOf(t)>=0}});
    if(p.get('m')==='all') st.match='all';
    if(p.get('s')==='old') st.sort='old';
    if(['topic','none'].indexOf(p.get('g'))>=0) st.group=p.get('g');
  }}
  var band=$('band');
  function bh(){{document.documentElement.style.setProperty('--bh',band.offsetHeight+'px')}}
  bh(); addEventListener('resize',bh);
  load(); run();
}})();
</script>
</body>
</html>
""")


def main():
    items, order = load()
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
    (HERE / "index.html").write_text(render_index(items, order), encoding="utf-8")
    print(f"built {len(items)} essays and speaks/index.html" + ("" if CUSDIS_APP_ID else "  (comments off: CUSDIS_APP_ID is blank)"))


if __name__ == "__main__":
    main()
