#!/usr/bin/env python3
"""
TOOL:    book-review/_build.py
FAMILY:  SITE
VERSION: 1.0.0
DATE:    2026-10-03
CHAT:    Daily management book review on GitHub Pages
CHANGES: 1.0.0 - renders each _content/<slug>.json into <slug>.html (cover, 300-word summary, 10-question quiz) and rebuilds index.html
STATUS:  working

Run:  python3 book-review/_build.py            (checks every content file, rebuilds all pages and the index)
Jekyll skips files that start with "_", so this script, the queue and the content folder are not published.

Content file (_content/<slug>.json):
  slug, title, author, year, day, date (YYYY-MM-DD), theme (one line),
  summary: [paragraphs]  - 280 to 320 words in total,
  takeaway: one sentence,
  questions: 10 x {q, options: [4 strings], answer: 0-3, why}
"""
__version__ = "1.0.0"

import datetime as dt
import hashlib
import html
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
CONTENT = HERE / "_content"
QUEUE = HERE / "_queue.json"

# cover palettes: (background, accent, ink) — picked per book from its slug
PALETTES = [
    ("#1f6f5c", "#f2c14e", "#fdfaf2"), ("#22313f", "#e07a5f", "#f7f3ea"),
    ("#5b2a3c", "#f4d58d", "#fbf5ec"), ("#2b4162", "#f6ae2d", "#f5f5f0"),
    ("#3d405b", "#81b29a", "#f4f1de"), ("#7a3b1f", "#f0d9a7", "#fff8ec"),
    ("#0f4c5c", "#fb8b24", "#f7f7f2"), ("#4a3f6b", "#e9c46a", "#f8f5fb"),
]


def esc(s):
    return html.escape(str(s), quote=True)


def year_text(y):
    return f"c. {abs(y)} BCE" if y < 0 else str(y)


def check(c, name):
    errs = []
    for k in ("slug", "title", "author", "year", "day", "date", "theme", "summary", "takeaway", "questions"):
        if k not in c:
            errs.append(f"missing '{k}'")
    if errs:
        return errs
    words = sum(len(p.split()) for p in c["summary"])
    if not 280 <= words <= 320:
        errs.append(f"summary is {words} words (needs 280-320)")
    if len(c["questions"]) != 10:
        errs.append(f"{len(c['questions'])} questions (needs 10)")
    for i, q in enumerate(c["questions"], 1):
        if len(q.get("options", [])) != 4:
            errs.append(f"Q{i} needs 4 options")
        if q.get("answer") not in (0, 1, 2, 3):
            errs.append(f"Q{i} answer must be 0-3")
        if not q.get("q") or not q.get("why"):
            errs.append(f"Q{i} needs 'q' and 'why'")
    try:
        dt.date.fromisoformat(c["date"])
    except ValueError:
        errs.append("date must be YYYY-MM-DD")
    if c["slug"] != name:
        errs.append(f"slug '{c['slug']}' does not match file name '{name}'")
    return errs


def wrap(text, width):
    """split a title into lines of at most ~width characters"""
    lines, cur = [], ""
    for w in text.split():
        if cur and len(cur) + 1 + len(w) > width:
            lines.append(cur)
            cur = w
        else:
            cur = (cur + " " + w).strip()
    if cur:
        lines.append(cur)
    return lines


def cover_svg(c):
    h = int(hashlib.md5(c["slug"].encode()).hexdigest(), 16)
    bg, acc, ink = PALETTES[h % len(PALETTES)]
    motif = (h >> 8) % 3
    lines = wrap(c["title"], 14)
    size = 46 if len(lines) <= 2 else (38 if len(lines) == 3 else 32)
    y0 = 250 - (len(lines) - 1) * size * 0.55
    title = "".join(
        f'<text x="40" y="{y0 + i * size * 1.12:.0f}" font-size="{size}" font-weight="700" fill="{ink}">{esc(l)}</text>'
        for i, l in enumerate(lines))
    if motif == 0:      # stacked bars, like a rising chart
        art = "".join(f'<rect x="{230 + i * 26}" y="{120 - i * 18}" width="16" height="{30 + i * 18}" rx="2" fill="{acc}" opacity="{0.45 + i * 0.13:.2f}"/>' for i, _ in enumerate(range(5)))
    elif motif == 1:    # concentric circles, like a target
        art = "".join(f'<circle cx="300" cy="100" r="{r}" fill="none" stroke="{acc}" stroke-width="3" opacity="{0.35 + k * 0.2:.2f}"/>' for k, r in enumerate((62, 44, 26))) + f'<circle cx="300" cy="100" r="9" fill="{acc}"/>'
    else:               # arrow staircase
        art = f'<path d="M226 150 h30 v-26 h30 v-26 h30 v-26 h30" fill="none" stroke="{acc}" stroke-width="5" stroke-linejoin="round"/><path d="M346 72 l14 0 l-7 -12 z" fill="{acc}"/>'
    authors = wrap(c["author"], 30)
    auth = "".join(f'<text x="40" y="{470 + i * 24}" font-size="19" fill="{ink}" opacity=".92">{esc(a)}</text>' for i, a in enumerate(authors))
    return f'''<svg class="cover-art" viewBox="0 0 400 600" role="img" aria-label="Cover for {esc(c['title'])} by {esc(c['author'])}" xmlns="http://www.w3.org/2000/svg" font-family="Georgia, 'Times New Roman', serif">
<rect width="400" height="600" fill="{bg}"/>
<rect x="18" y="18" width="364" height="564" fill="none" stroke="{acc}" stroke-width="1.5" opacity=".7"/>
{art}
<text x="40" y="60" font-size="13" letter-spacing="3" fill="{acc}" font-family="Verdana, sans-serif">BOOK REVIEW · DAY {c['day']}</text>
<line x1="40" y1="{y0 - size - 4:.0f}" x2="120" y2="{y0 - size - 4:.0f}" stroke="{acc}" stroke-width="4"/>
{title}
<line x1="40" y1="440" x2="360" y2="440" stroke="{ink}" stroke-width="1" opacity=".4"/>
{auth}
<text x="40" y="556" font-size="14" fill="{acc}" font-family="Verdana, sans-serif">{esc(year_text(c['year']))}</text>
<text x="360" y="556" font-size="12" fill="{ink}" opacity=".7" text-anchor="end" font-family="Verdana, sans-serif">haivijayanand.github.io</text>
</svg>''', bg


STYLE = """
:root{--bg:#f5f2ea;--card:#fffdf8;--ink:#1d2421;--muted:#5d6763;--rule:#ddd6c8;--brand:#1f6f5c;--good:#2e7d4f;--bad:#b23a2a}
@media (prefers-color-scheme:dark){:root:not([data-theme=light]){--bg:#161a19;--card:#1f2523;--ink:#e8ece9;--muted:#9aa7a2;--rule:#33403b;--brand:#5cc3a6;--good:#6fcf97;--bad:#ff8a7a}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.65 Georgia,'Times New Roman',serif}
a{color:var(--brand)}
.wrap{max-width:780px;margin:0 auto;padding:16px}
nav.top{font:14px/1.4 Verdana,sans-serif;padding:10px 0 18px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
.cover{min-height:92vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:12px 0 28px;border-bottom:1px solid var(--rule)}
.cover-art{width:min(340px,82vw);height:auto;box-shadow:0 18px 40px rgba(0,0,0,.28),0 2px 6px rgba(0,0,0,.2);border-radius:3px 8px 8px 3px}
.cover .meta{text-align:center;font:15px/1.5 Verdana,sans-serif;color:var(--muted)}
.cover .meta b{color:var(--ink)}
.scroll{font:13px Verdana,sans-serif;color:var(--muted);text-decoration:none}
h1{font-size:1.9em;line-height:1.2;margin:34px 0 4px}
.byline{font:14px/1.5 Verdana,sans-serif;color:var(--muted);margin:0 0 22px}
.theme{border-left:4px solid var(--brand);padding:6px 14px;background:var(--card);font-style:italic;margin:0 0 20px}
h2{font:700 15px/1.3 Verdana,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--brand);margin:36px 0 10px}
.take{background:var(--card);border:1px solid var(--rule);border-radius:8px;padding:12px 16px;margin:18px 0}
.wc{font:12px Verdana,sans-serif;color:var(--muted)}
ol.quiz{padding-left:0;list-style:none;counter-reset:q}
ol.quiz>li{counter-increment:q;background:var(--card);border:1px solid var(--rule);border-radius:10px;padding:14px 16px;margin:0 0 14px}
ol.quiz>li>p{margin:0 0 10px;font-weight:700}
ol.quiz>li>p::before{content:counter(q) ". ";color:var(--brand)}
.opt{display:block;width:100%;text-align:left;font:15px/1.45 Verdana,sans-serif;color:var(--ink);background:transparent;border:1px solid var(--rule);border-radius:7px;padding:9px 12px;margin:6px 0;cursor:pointer}
.opt:hover{border-color:var(--brand)}
.opt.right{border-color:var(--good);background:color-mix(in srgb,var(--good) 14%,transparent)}
.opt.wrong{border-color:var(--bad);background:color-mix(in srgb,var(--bad) 12%,transparent)}
.opt:disabled{cursor:default}
.why{display:none;font:14px/1.5 Verdana,sans-serif;color:var(--muted);margin:8px 2px 0}
li.done .why{display:block}
.score{font:15px Verdana,sans-serif;position:sticky;bottom:0;background:var(--bg);padding:10px 0;border-top:1px solid var(--rule);display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}
.score button{font:14px Verdana,sans-serif;background:var(--brand);color:#fff;border:0;border-radius:6px;padding:7px 12px;cursor:pointer}
footer{font:13px/1.5 Verdana,sans-serif;color:var(--muted);padding:26px 0 40px}
@media print{.cover{min-height:auto;page-break-after:always}.score,nav.top,.scroll{display:none}.why{display:block}body{background:#fff}}
"""

QUIZ_JS = """
(function(){
  var KEY=window.QUIZ_KEY,total=KEY.length,got=0,done=0;
  var out=document.getElementById('score');
  function show(){out.textContent='Score: '+got+' / '+done+' answered, '+total+' questions';}
  document.querySelectorAll('ol.quiz>li').forEach(function(li,i){
    li.querySelectorAll('.opt').forEach(function(b,j){
      b.addEventListener('click',function(){
        if(li.classList.contains('done'))return;
        li.classList.add('done');done++;
        if(j===KEY[i]){got++;b.classList.add('right');}
        else{b.classList.add('wrong');li.querySelectorAll('.opt')[KEY[i]].classList.add('right');}
        li.querySelectorAll('.opt').forEach(function(x){x.disabled=true;});
        show();
      });
    });
  });
  document.getElementById('reset').addEventListener('click',function(){
    got=0;done=0;
    document.querySelectorAll('ol.quiz>li').forEach(function(li){
      li.classList.remove('done');
      li.querySelectorAll('.opt').forEach(function(x){x.disabled=false;x.classList.remove('right','wrong');});
    });
    show();
  });
  show();
})();
"""


def header(path, version, chat, changes, date=None):
    return (f"<!DOCTYPE html>\n<!--\nTOOL    : {path}\nFAMILY  : SITE\nVERSION : {version}\n"
            f"DATE    : {date or dt.date.today().isoformat()}\nCHAT    : {chat}\nCHANGES : {changes}\nSTATUS  : working\n"
            f"BUILT BY: book-review/_build.py v{__version__}\n-->\n")


def render_page(c, prev_c, next_c):
    svg, bg = cover_svg(c)
    words = sum(len(p.split()) for p in c["summary"])
    paras = "\n".join(f"<p>{esc(p)}</p>" for p in c["summary"])
    qs = []
    for q in c["questions"]:
        opts = "".join(f'<button class="opt" type="button">{"ABCD"[k]}. {esc(o)}</button>' for k, o in enumerate(q["options"]))
        qs.append(f'<li><p>{esc(q["q"])}</p>{opts}<div class="why"><b>Answer {"ABCD"[q["answer"]]}.</b> {esc(q["why"])}</div></li>')
    key = json.dumps([q["answer"] for q in c["questions"]])
    when = dt.date.fromisoformat(c["date"]).strftime("%d %B %Y").lstrip("0")
    prev = f'<a href="{prev_c["slug"]}.html">← Day {prev_c["day"]}: {esc(prev_c["title"])}</a>' if prev_c else "<span></span>"
    nxt = f'<a href="{next_c["slug"]}.html">Day {next_c["day"]}: {esc(next_c["title"])} →</a>' if next_c else "<span></span>"
    return header(f"book-review/{c['slug']}.html — Book Review Day {c['day']}: {c['title']}", "1.0.0",
                  "Daily management book review on GitHub Pages", f"v1.0.0  review of {c['title']} ({c['author']})", c["date"]) + f"""<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(c['title'])} — Book Review Day {c['day']}</title>
<meta name="description" content="{esc(c['theme'])}">
<meta name="theme-color" content="{bg}">
<style>{STYLE}</style>
</head>
<body>
<div class="wrap">
<nav class="top"><a href="./">← All book reviews</a><a href="/">K Vijay Anand</a></nav>

<section class="cover">
{svg}
<div class="meta"><b>{esc(c['title'])}</b><br>{esc(c['author'])} · {esc(year_text(c['year']))}<br>Day {c['day']} · {when}</div>
<a class="scroll" href="#summary">Read the summary ↓</a>
</section>

<article>
<h1 id="summary">{esc(c['title'])}</h1>
<p class="byline">{esc(c['author'])} · first published {esc(year_text(c['year']))} · reviewed by K Vijay Anand</p>
<p class="theme">{esc(c['theme'])}</p>

<h2>Summary</h2>
{paras}
<p class="wc">{words} words</p>
<div class="take"><b>One-line takeaway:</b> {esc(c['takeaway'])}</div>

<h2>Test yourself — 10 questions</h2>
<p class="wc">Tap an option to check it. Each answer shows a short reason.</p>
<ol class="quiz">
{chr(10).join(qs)}
</ol>
<div class="score"><span id="score"></span><button id="reset" type="button">Try again</button></div>
</article>

<nav class="top" style="padding-top:22px">{prev}{nxt}</nav>
<footer>A short personal summary written for study and discussion. The cover above is an original design for this page, not the publisher's cover. Read the book itself for the full argument.</footer>
</div>
<script>window.QUIZ_KEY={key};{QUIZ_JS}</script>
</body>
</html>
"""


def render_index(items):
    cards = []
    for c in reversed(items):
        svg, _ = cover_svg(c)
        when = dt.date.fromisoformat(c["date"]).strftime("%d %b %Y").lstrip("0")
        cards.append(f'<a class="card" href="{c["slug"]}.html">{svg}<span class="t">{esc(c["title"])}</span>'
                     f'<span class="a">{esc(c["author"])}</span><span class="d">Day {c["day"]} · {when}</span>'
                     f'<span class="s">{esc(c["theme"])}</span></a>')
    return header("book-review/index.html — list of daily management book reviews", f"1.0.{len(items)}",
                  "Daily management book review on GitHub Pages", f"v1.0.{len(items)}  {len(items)} reviews listed") + f"""<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Book Review — K Vijay Anand</title>
<meta name="description" content="One famous management book a day: a 300-word summary and ten questions.">
<style>{STYLE}
.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:18px;margin:22px 0}}
.card{{display:flex;flex-direction:column;gap:3px;text-decoration:none;color:var(--ink);background:var(--card);border:1px solid var(--rule);border-radius:10px;padding:12px}}
.card:hover{{border-color:var(--brand)}}
.card .cover-art{{width:100%;box-shadow:0 6px 14px rgba(0,0,0,.2);margin-bottom:8px}}
.card .t{{font-weight:700;line-height:1.3}}
.card .a,.card .d{{font:13px Verdana,sans-serif;color:var(--muted)}}
.card .s{{font:13px/1.45 Verdana,sans-serif;margin-top:4px}}
#q{{width:100%;font:15px Verdana,sans-serif;padding:9px 12px;border:1px solid var(--rule);border-radius:7px;background:var(--card);color:var(--ink)}}
</style>
</head>
<body>
<div class="wrap" style="max-width:1100px">
<nav class="top"><a href="/">← K Vijay Anand</a><a href="/tools/">Tools</a></nav>
<h1 style="margin-top:6px">Book Review</h1>
<p class="byline">One famous management book a day — a 300-word summary and ten questions to test yourself. {len(items)} reviewed so far, newest first.</p>
<input id="q" type="search" placeholder="Search by title, author or idea…" aria-label="Search reviews">
<div class="grid" id="grid">
{chr(10).join(cards)}
</div>
<footer>Covers on this site are original designs made for each review, not the publishers' covers.</footer>
</div>
<script>
document.getElementById('q').addEventListener('input',function(e){{
  var t=e.target.value.toLowerCase();
  document.querySelectorAll('#grid .card').forEach(function(c){{c.style.display=c.textContent.toLowerCase().indexOf(t)>=0?'':'none';}});
}});
</script>
</body>
</html>
"""


def main():
    items, bad = [], False
    for f in sorted(CONTENT.glob("*.json")):
        c = json.loads(f.read_text(encoding="utf-8"))
        errs = check(c, f.stem)
        if errs:
            bad = True
            print(f"ERROR {f.name}: " + "; ".join(errs))
        items.append(c)
    if bad:
        sys.exit(1)
    items.sort(key=lambda c: c["day"])
    days = [c["day"] for c in items]
    if len(set(days)) != len(days):
        sys.exit("ERROR: two reviews share a day number")
    for i, c in enumerate(items):
        page = render_page(c, items[i - 1] if i else None, items[i + 1] if i + 1 < len(items) else None)
        (HERE / f"{c['slug']}.html").write_text(page, encoding="utf-8")
    (HERE / "index.html").write_text(render_index(items), encoding="utf-8")
    print(f"built {len(items)} review page(s) and index.html")


if __name__ == "__main__":
    main()
