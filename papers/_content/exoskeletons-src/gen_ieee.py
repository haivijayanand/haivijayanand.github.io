#!/usr/bin/env python3
"""
TOOL:    papers/_content/exoskeletons-src/gen_ieee.py
FAMILY:  papers
VERSION: 1.0.0
DATE:    2026-11-24
CHAT:    Exoskeletons paper - IEEE two-column PDF
CHANGES: 1.0.0 - IEEE two-column A4 edition of the exoskeletons paper (adapted from power-grid gen_ieee.py v1.0.0):
                 converts _content/<slug>.md (with !fig markers) to _content/<slug>.ieee.html and prints pdf/<slug>.pdf
STATUS:  working

Run: python3 papers/_content/exoskeletons-src/gen_ieee.py   then   python3 papers/_build.py --no-pdf
"""
__version__ = "1.0.0"

import os
import re
import sys
from pathlib import Path

import markdown

SLUG = "exoskeletons-history-industry-future"
TITLE = "Exoskeletons: History, Commercialisation, Industry Landscape and Future Outlook"
DATE = "25 October 2026"
HERE = Path(__file__).resolve().parent
PAPERS = HERE.parents[1]
SRC = HERE.parent / f"{SLUG}.md"
OUT_HTML = HERE.parent / f"{SLUG}.ieee.html"
OUT_PDF = PAPERS / "pdf" / f"{SLUG}.pdf"

sys.path.insert(0, str(PAPERS))
from _build import apply_figures  # noqa: E402  (same figure numbering and credits as the web page)

ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV"]

# the markdown tables carry no captions; titles in order of appearance
TABLE_TITLES = [
    "Classification of Exoskeletons",
    "Milestones of the Commercial Era",
    "Enabling Subsystems and Their Trade-offs",
    "FDA Clearances of Powered Exoskeletons",
    "Medical Rehabilitation and Personal Mobility Players",
    "Industrial and Occupational Players",
    "Military and Defence Programmes",
    "Consumer and Sport Players",
    "Published Market Estimates",
    "Outlook by Application Segment",
]

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
h2 { font-size: 10pt; font-weight: normal; font-variant: small-caps; text-align: center; margin: 10px 0 4px; letter-spacing: .3px; break-after: avoid; }
h3 { font-size: 10pt; font-weight: normal; font-style: italic; margin: 6px 0 2px; break-after: avoid; }
ul, ol { margin: 3px 0 4px; padding-left: 14px; }
li { margin: 1px 0; }
.wide { column-span: all; margin: 8px 0 10px; }
.tcap { caption-side: top; text-align:center; font-size: 8pt; margin: 6px 0 3px; text-indent: 0; break-after: avoid; }
.tcap .tn { display:block; letter-spacing:.5px; }
.tcap .tt { font-variant: small-caps; font-size: 8.5pt; }
.tblock { break-inside: avoid; margin: 4px 0 8px; }
.tblock.long { break-inside: auto; }
table { border-collapse: collapse; width: 100%; font-size: 7.8pt; line-height: 1.18; text-align: left; hyphens: auto; }
th, td { padding: 1.6px 3px; vertical-align: top; text-align: left; }
thead th { border-top: 1px solid #000; border-bottom: .6px solid #000; font-weight: normal; font-variant: small-caps; }
tbody tr:last-child td { border-bottom: 1px solid #000; }
tr { break-inside: avoid; }
figure { margin: 6px 0 8px; text-align: center; break-inside: avoid; }
figure img { max-width: 100%; max-height: 62mm; }
.figpair { display: flex; gap: 5mm; align-items: flex-start; break-inside: avoid; }
.figpair figure { flex: 1; margin: 0; }
.figpair figure img { max-height: 70mm; }
figcaption { font-size: 8pt; text-align: justify; margin-top: 3px; line-height: 1.2; }
.refs { font-size: 7.5pt; line-height: 1.15; }
.refs ol { list-style: none; padding-left: 0; counter-reset: r; margin: 0; }
.refs li { counter-increment: r; position: relative; padding-left: 20px; margin-bottom: 1px; text-align: left; word-break: break-word; }
.refs li::before { content: "[" counter(r) "]"; position: absolute; left: 0; }
.small, .small li { font-size: 7.8pt; text-align: left; }
.small p { text-indent: 0; }
a { color:#000; text-decoration:none; }
"""


def roman_sections(html):
    def h2(m):
        mm = re.match(r"(\d+)\.\s+(.*)", m.group(1))
        return f"<h2>{ROMAN[int(mm.group(1))]}. {mm.group(2)}</h2>" if mm else f"<h2>{m.group(1)}</h2>"

    def h3(m):
        mm = re.match(r"(\d+)\.(\d+)\s+(.*)", m.group(1))
        return f"<h3>{chr(64 + int(mm.group(2)))}. {mm.group(3)}</h3>" if mm else f"<h3>{m.group(1)}</h3>"

    html = re.sub(r"<h2[^>]*>(.*?)</h2>", h2, html)
    return re.sub(r"<h3[^>]*>(.*?)</h3>", h3, html)


def tables(html):
    n = {"i": 0}

    def rep(m):
        tbl = m.group(0)
        n["i"] += 1
        i = n["i"]
        ncol = len(re.findall(r"<th[ >]", re.search(r"<thead>.*?</thead>", tbl, re.S).group(0)))
        cells = [re.sub(r"<[^>]+>", "", c) for c in re.findall(r"<td>(.*?)</td>", tbl, re.S)]
        avg = sum(map(len, cells)) / max(len(cells), 1)
        cls = " wide" if ncol >= 4 or avg > 45 else ""  # short 3-column tables stay in one column
        if tbl.count("<tr") > 9:
            cls += " long"
        # caption inside the table so it never parts from it at a column or page break
        cap = (f'<caption class="tcap"><span class="tn">TABLE {ROMAN[i]}</span>'
               f'<span class="tt">{TABLE_TITLES[i - 1]}</span></caption>')
        return f'<div class="tblock{cls}">' + tbl.replace("<table>", "<table>" + cap, 1) + "</div>"

    html = re.sub(r"<table>.*?</table>", rep, html, flags=re.S)
    if n["i"] != len(TABLE_TITLES):
        raise SystemExit(f"found {n['i']} tables but {len(TABLE_TITLES)} titles")
    return html


def figures(html):
    def fig(f):
        img = re.search(r'<img src="([^"]+)"', f).group(1)
        cap = re.search(r"<figcaption>(.*?)</figcaption>", f, re.S).group(1)
        cap = re.sub(r'<span class="credit">.*?</span>', "", cap)
        cap = re.sub(r"<b>Figure (\d+)\.</b>", r"Fig.&nbsp;\1.", cap)
        return f'<figure><img src="../{img}" alt=""><figcaption>{cap}</figcaption></figure>'

    def row(m):
        cls, inner = m.group(1), m.group(2)
        figs = [fig(f) for f in re.findall(r"<figure.*?</figure>", inner, re.S)]
        if cls == "figrow one":
            return figs[0]
        return '<div class="wide figpair">' + "".join(figs) + "</div>"

    return re.sub(r'<div class="(figrow(?: one)?)">(.*?)</div>', row, html, flags=re.S)


def main():
    text = SRC.read_text(encoding="utf-8")
    text = apply_figures(SLUG, text)
    html = markdown.Markdown(extensions=["tables", "sane_lists"]).convert(text)
    # cited links [\[n\]](url) -> plain [n]
    html = re.sub(r'<a href="[^"]+">\[(\d+)\]</a>', r"[\1]", html)
    html = re.sub(r"<h2[^>]*>Abstract</h2>\s*<p>", '<p class="abstract"><i>Abstract</i>&mdash;', html, count=1)
    html = re.sub(r"<p><strong>Keywords:</strong>\s*", '<p class="index"><i>Index Terms</i>&mdash;', html, count=1)
    html = roman_sections(html)
    html = tables(html)
    html = figures(html)
    html = re.sub(r"Section (\d+)\.(\d+)", lambda m: f"Section&nbsp;{ROMAN[int(m.group(1))]}-{chr(64 + int(m.group(2)))}", html)
    html = re.sub(r"Section (\d+)(?![\d.])", lambda m: f"Section&nbsp;{ROMAN[int(m.group(1))]}", html)
    html = re.sub(r"\(Section&nbsp;", "(Section&nbsp;", html)
    m = re.search(r"<p><strong>Further reading:</strong>.*?</p>\s*$", html, re.S)
    if m:
        html = html[:m.start()].rstrip()
        html = html.replace("<h2>References</h2>", '<div class="small">' + m.group(0) + "</div><h2>References</h2>", 1)
    # figure credits and references in small type
    html = re.sub(r"(<h2>Figure credits</h2>)(.*?)(?=<h2>)", r'\1<div class="small">\2</div>', html, count=1, flags=re.S)
    html = re.sub(r"(<h2>References</h2>\s*)<ol>(.*?)</ol>(.*)$", r'\1<div class="refs"><ol>\2</ol></div><div class="small">\3</div>',
                  html, count=1, flags=re.S)
    page = f"""<!DOCTYPE html>
<!--
TOOL:    papers/_content/{SLUG}.ieee.html
FAMILY:  papers
VERSION: 1.0.0
DATE:    2026-11-24
CHAT:    Exoskeletons paper - IEEE two-column PDF
CHANGES: 1.0.0 - IEEE two-column A4 source; generated by exoskeletons-src/gen_ieee.py; printed to pdf/{SLUG}.pdf (supplied PDF)
STATUS:  working
-->
<html><head><meta charset="utf-8">
<title>{TITLE}</title>
<style>{CSS}</style></head>
<body>
<h1 class="title">{TITLE}</h1>
<div class="authors">K Vijay Anand</div>
<div class="series">Technical Papers · {DATE} · haivijayanand.github.io/papers</div>
<div class="cols">
{html}
</div>
</body></html>
"""
    OUT_HTML.write_text(page, encoding="utf-8")
    print("wrote", OUT_HTML.name)

    from playwright.sync_api import sync_playwright
    if Path("/opt/pw-browsers").exists():
        os.environ.setdefault("PLAYWRIGHT_BROWSERS_PATH", "/opt/pw-browsers")
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page()
        pg.goto(OUT_HTML.as_uri(), wait_until="load")
        pg.evaluate("document.fonts.ready")
        pg.wait_for_timeout(500)
        pg.pdf(path=str(OUT_PDF), format="A4", print_background=True, prefer_css_page_size=True,
               display_header_footer=True, header_template="<div></div>",
               footer_template='<div style="width:100%;text-align:center;font-family:serif;font-size:8px">'
                               '<span class="pageNumber"></span></div>')
        b.close()
    from pypdf import PdfReader
    print("wrote", OUT_PDF.name, len(PdfReader(str(OUT_PDF)).pages), "pages")


if __name__ == "__main__":
    main()
