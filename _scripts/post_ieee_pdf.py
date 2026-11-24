#!/usr/bin/env python3
"""
TOOL:    _scripts/post_ieee_pdf.py
FAMILY:  SITE
VERSION: 1.0.0
DATE:    2026-11-24
CHAT:    Flush valve post - downloadable IEEE two-column PDF with proper older / newer links
CHANGES: 1.0.0 - converts a Jekyll post (_posts/<date-slug>.md) into an IEEE two-column A4 PDF in
                 assets/posts/<date-slug>/<slug>-ieee.pdf; numbered sections, captioned tables and figures,
                 Acknowledgment, References, and an "In this series" box with clickable links to the older and
                 newer items of the Papers & Articles list (papers/_papers.json, by date)
STATUS:  working

Run:   python3 _scripts/post_ieee_pdf.py 2026-05-14-flush-valve-design
Needs: pip install markdown pypdf playwright  &&  python3 -m playwright install chromium
Per-post settings (index terms, table titles, wide figures) are in POSTS below.
Jekyll skips folders that start with "_", so this script is not published.
"""
__version__ = "1.0.0"

import datetime as dt
import html as H
import json
import re
import sys
from pathlib import Path

import markdown

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://haivijayanand.github.io"
ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV"]

POSTS = {
    "2026-05-14-flush-valve-design": {
        "pdf": "flush-valve-design-ieee.pdf",
        "index_terms": "Flush valve, hard water, calcium carbonate scale, salt bridging, knife-edge seat, PTFE coating, "
                       "SS316L, sealing contact stress, water conservation, sanitaryware design.",
        "tables": [
            "Scope of Impact in Indian Households",
            "Rubber Flapper Valve: Merits and Demerits",
            "Tank-Ball Valve: Merits and Demerits",
            "Dual-Flush Siphon Valve: Merits and Demerits",
            "Materials Specification of the Proposed Valve",
            "Cumulative Water Wastage over Ten Years",
        ],
        "wide_figs": {"fig5_analysis_plots", "fig6_comparison_table"},
        "series": "Applied Engineering Design Series, Article 2",
    },
}

CSS = r"""
@page { size: A4; margin: 17mm 14mm 18mm 14mm; }
body { font-family: 'TeX Gyre Termes','Times New Roman','Liberation Serif',serif; font-size: 10pt; line-height: 1.22; color:#000; margin:0; }
.title { text-align:center; font-size: 22pt; line-height:1.15; margin: 0 0 10px; font-weight: normal; }
.authors { text-align:center; font-size: 11pt; margin: 0 0 2px; }
.series { text-align:center; font-size: 8.5pt; font-style: italic; margin: 0 0 14px; }
.cols { column-count: 2; column-gap: 4.5mm; text-align: justify; hyphens: auto; }
p { margin: 0; text-indent: 1em; orphans: 2; widows: 2; }
.abstract, .index { font-weight: bold; font-size: 9pt; text-indent: 0; margin-bottom: 6px; }
.abstract i, .index i { font-weight: bold; }
.abstract + .abstract { text-indent: 1em; }
h2 { font-size: 10pt; font-weight: normal; font-variant: small-caps; text-align: center; margin: 10px 0 4px; letter-spacing: .3px; break-after: avoid; }
h3 { font-size: 10pt; font-weight: normal; font-style: italic; margin: 6px 0 2px; break-after: avoid; }
ul, ol { margin: 3px 0 4px; padding-left: 16px; }
li { margin-bottom: 1.5px; }
li p { text-indent: 0; }
pre { font-family: 'DejaVu Sans Mono','Liberation Mono',monospace; font-size: 6.9pt; line-height: 1.25; background: #f3f3f3;
      border-left: 1.5px solid #666; padding: 4px 5px; margin: 5px 0 6px; white-space: pre-wrap; break-inside: avoid; text-align: left; }
code { font-family: 'DejaVu Sans Mono','Liberation Mono',monospace; font-size: 8pt; }
pre code { font-size: inherit; }
blockquote { margin: 5px 0; padding: 3px 6px; border: .7px solid #000; break-inside: avoid; }
blockquote p { text-indent: 0; }
.wide { margin: 8px 0 10px; }
.tcap { text-align:center; font-size: 8pt; margin: 6px 0 3px; text-indent: 0; break-after: avoid; }
.tcap .tn { display:block; letter-spacing:.5px; }
.tcap .tt { font-variant: small-caps; font-size: 8.5pt; }
.tblock { break-inside: avoid; margin: 4px 0 8px; }
table { border-collapse: collapse; width: 100%; font-size: 7.8pt; line-height: 1.18; text-align: left; hyphens: auto; }
th, td { padding: 1.6px 3px; vertical-align: top; text-align: left; }
thead th { border-top: 1px solid #000; border-bottom: .6px solid #000; font-weight: normal; font-variant: small-caps; }
tbody tr:last-child td { border-bottom: 1px solid #000; }
tr { break-inside: avoid; }
figure { margin: 6px 0 8px; text-align: center; break-inside: avoid; }
figure img { width: 92%; }
figure.wide img { width: 88%; }
figcaption { font-size: 8pt; text-align: justify; margin-top: 3px; line-height: 1.2; }
.refs { font-size: 7.8pt; text-indent: 0; }
.refs ol { list-style: none; padding-left: 0; counter-reset: r; margin: 0; }
.refs li { counter-increment: r; position: relative; padding-left: 22px; margin-bottom: 2px; text-align: left; word-break: break-word; }
.refs li::before { content: "[" counter(r) "]"; position: absolute; left: 0; }
a { color:#0b3d91; text-decoration:none; }
.seriesbox { border: .8px solid #000; padding: 6px 9px; margin: 12px 0 0; font-size: 8.6pt; line-height: 1.35; break-inside: avoid; }
.seriesbox b.h { display:block; font-variant: small-caps; font-weight: normal; font-size: 9.5pt; letter-spacing:.3px; margin-bottom: 3px; }
.seriesbox table { font-size: 8.6pt; }
.seriesbox td { padding: 1.5px 4px; border: 0 !important; }
.seriesbox td.k { width: 23%; font-variant: small-caps; }
"""


def nice_date(d):
    d = dt.date.fromisoformat(d)
    return f"{d.day} {d.strftime('%B %Y')}"


def series_neighbours(url):
    """Older / newer items around `url` in the Papers & Articles list (papers + articles, by date)."""
    m = json.loads((ROOT / "papers" / "_papers.json").read_text(encoding="utf-8"))
    items = [{"title": a["title"], "url": a["url"], "date": a["date"], "kind": "Article"} for a in m.get("articles", [])]
    items += [{"title": p["title"], "url": f"/papers/{p['slug']}.html", "date": p["date"], "kind": "Technical paper"}
              for p in m["papers"]]
    order = {it["url"]: k for k, it in enumerate(items)}   # stable for same-day items: manifest order
    items.sort(key=lambda it: (it["date"], order[it["url"]]))
    i = next(k for k, it in enumerate(items) if it["url"] == url)
    return (items[i - 1] if i > 0 else None), (items[i + 1] if i + 1 < len(items) else None)


def convert(slug, cfg):
    src = (ROOT / "_posts" / f"{slug}.md").read_text(encoding="utf-8")
    fm, body = re.match(r"---\n(.*?)\n---\n(.*)", src, re.S).groups()
    title = re.search(r'^title:\s*"?(.*?)"?\s*$', fm, re.M).group(1)
    date = re.search(r"^date:\s*(\d{4}-\d{2}-\d{2})", fm, re.M).group(1)
    y, mo, d = date.split("-")
    post_url = f"/{y}/{mo}/{d}/{slug[11:]}.html"

    # drop the byline, rules and the <!-- web-only --> blocks (download links, older / newer table: the PDF has its own series box)
    body = re.sub(r"^\*K Vijay Anand\*\s*$", "", body, flags=re.M)
    body = re.sub(r"<!-- web-only -->.*?<!-- /web-only -->", "", body, flags=re.S)
    body = re.sub(r"^---\s*$", "", body, flags=re.M)
    body = re.sub(r"\{\{.*?\}\}|\{%.*?%\}", "", body)

    h = markdown.Markdown(extensions=["tables", "fenced_code", "sane_lists"]).convert(body)

    # abstract
    m = re.search(r"<h2>Abstract</h2>\s*(.*?)(?=<h2>)", h, re.S)
    paras = re.findall(r"<p>(.*?)</p>", m.group(1), re.S)
    ab = f'<p class="abstract"><i>Abstract</i>&mdash;{paras[0]}</p>' + "".join(f'<p class="abstract">{p}</p>' for p in paras[1:])
    ab += f'<p class="index"><i>Index Terms</i>&mdash;{cfg["index_terms"]}</p>'
    h = h[:m.start()] + ab + h[m.end():]

    # sections: "1. X" -> "I. X", "1.1 X" -> "A. X"
    h = re.sub(r"<h2>(\d+)\.\s+(.*?)</h2>", lambda q: f"<h2>{ROMAN[int(q.group(1))]}. {q.group(2)}</h2>", h)
    h = re.sub(r"<h3>(\d+)\.(\d+)\s+(.*?)</h3>", lambda q: f"<h3>{chr(64 + int(q.group(2)))}. {q.group(3)}</h3>", h)

    # tables with IEEE captions
    n = {"t": 0}

    def tab(q):
        n["t"] += 1
        k = n["t"]
        cap = cfg["tables"][k - 1] if k <= len(cfg["tables"]) else ""
        ncol = len(re.findall(r"<th", re.search(r"<thead>.*?</thead>", q.group(0), re.S).group(0)))
        wide = " wide" if ncol >= 4 else ""
        return (f'<div class="tblock{wide}"><div class="tcap"><span class="tn">TABLE {ROMAN[k]}</span>'
                f'<span class="tt">{cap}</span></div>{q.group(0)}</div>')

    h = re.sub(r"<table>.*?</table>", tab, h, flags=re.S)

    # figures: image paragraph + italic caption paragraph
    def fig(q):
        src, cap = q.group(1), q.group(2)
        key = Path(src).stem
        cap = re.sub(r"^Fig\.\s*(\d+)\s*[—-]\s*", r"Fig.&nbsp;\1.&nbsp; ", cap)
        cls = ' class="wide"' if key in cfg["wide_figs"] else ""
        return f'<figure{cls}><img src="{(ROOT / src.lstrip("/")).as_uri()}" alt=""><figcaption>{cap}</figcaption></figure>'

    h = re.sub(r'<p><img alt="[^"]*" src="([^"]+)"\s*/?>\s*<em>(.*?)</em></p>', fig, h, flags=re.S)
    h = re.sub(r'<p><img alt="[^"]*" src="([^"]+)"\s*/?></p>\s*<p><em>(.*?)</em></p>', fig, h, flags=re.S)

    # acknowledgment before references; references as IEEE list
    ack = ('<h2>Acknowledgment</h2><p>The author acknowledges the assistance of Claude (Anthropic), a large language '
           'model, in drafting the text, generating the figures and preparing this two-column edition. All design '
           'concepts, numbers and conclusions were reviewed by the author, who remains responsible for them.</p>')
    h = h.replace("<h2>References</h2>", ack + "<h2>References</h2>", 1)
    h = re.sub(r"(<h2>References</h2>\s*)<ol>(.*?)</ol>", r'\1<div class="refs"><ol>\2</ol></div>', h, flags=re.S)
    h = re.sub(r"<h2>(Code|References|Acknowledgment)</h2>", lambda q: f"<h2>{q.group(1)}</h2>", h)

    older, newer = series_neighbours(post_url)

    def row(label, it):
        if not it:
            return f'<tr><td class="k">{label}</td><td>&mdash; (none yet)</td></tr>'
        u = SITE + it["url"]
        return (f'<tr><td class="k">{label}</td><td><a href="{u}">{H.escape(it["title"])}</a><br>'
                f'<span style="font-size:7.8pt">{it["kind"]} · {nice_date(it["date"])} · <a href="{u}">{u}</a></span></td></tr>')

    this_u = SITE + post_url
    box = (f'<div class="seriesbox"><b class="h">In this series &mdash; Papers &amp; Articles, haivijayanand.github.io</b><table>'
           f'{row("Older", older)}'
           f'<tr><td class="k">This article</td><td>{H.escape(title)}<br><span style="font-size:7.8pt">Online version: '
           f'<a href="{this_u}">{this_u}</a></span></td></tr>'
           f'{row("Newer", newer)}'
           f'<tr><td class="k">All items</td><td><a href="{SITE}/papers/">{SITE}/papers/</a></td></tr></table></div>')

    # wide tables / figures / series box sit between two-column blocks (Chromium leaves page 1 empty when
    # column-span:all elements sit inside a multi-page multicol block)
    body_html = f'<div class="cols">{h}{box}</div>'
    body_html = re.sub(r'((?:<h2>[^<]*</h2>\s*)?<div class="tblock wide">.*?</table></div>|(?:<h2>[^<]*</h2>\s*)?<figure class="wide">.*?</figure>|<div class="seriesbox">.*?</table></div>)',
                       r'</div>\1<div class="cols">', body_html, flags=re.S)
    body_html = body_html.replace('<div class="cols"></div>', '')

    page = f"""<!DOCTYPE html>
<!--
TOOL:    assets/posts/{slug}/{cfg['pdf'].replace('.pdf', '.html')} (not published; print source)
FAMILY:  SITE
VERSION: {__version__}
DATE:    {dt.date.today().isoformat()}
CHAT:    Flush valve post - downloadable IEEE two-column PDF with proper older / newer links
CHANGES: {__version__} - generated by _scripts/post_ieee_pdf.py
STATUS:  working
-->
<html><head><meta charset="utf-8"><title>{H.escape(title)}</title><style>{CSS}</style></head><body>
<h1 class="title">{H.escape(title)}</h1>
<div class="authors">K Vijay Anand</div>
<div class="series">{cfg['series']} · {nice_date(date)} · <a href="{this_u}">haivijayanand.github.io</a></div>
{body_html}
</body></html>"""
    return page, older, newer


def main():
    slug = sys.argv[1] if len(sys.argv) > 1 else "2026-05-14-flush-valve-design"
    cfg = POSTS[slug]
    page, older, newer = convert(slug, cfg)
    out_dir = ROOT / "assets" / "posts" / slug
    tmp = Path("/tmp") / f"{slug}.ieee.html"
    tmp.write_text(page, encoding="utf-8")
    out_pdf = out_dir / cfg["pdf"]
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page()
        pg.goto(tmp.as_uri(), wait_until="load")
        pg.wait_for_timeout(500)
        pg.pdf(path=str(out_pdf), format="A4", print_background=True, prefer_css_page_size=True,
               display_header_footer=True, header_template="<div></div>",
               footer_template='<div style="width:100%;text-align:center;font-family:serif;font-size:8px">'
                               '<span class="pageNumber"></span></div>')
        b.close()
    from pypdf import PdfReader
    print("wrote", out_pdf.relative_to(ROOT), len(PdfReader(str(out_pdf)).pages), "pages;",
          "older:", older and older["url"], "newer:", newer and newer["url"])


if __name__ == "__main__":
    main()
