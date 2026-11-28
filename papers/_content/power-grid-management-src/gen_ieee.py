#!/usr/bin/env python3
"""
TOOL:    papers/_content/power-grid-management-src/gen_ieee.py
FAMILY:  papers
VERSION: 1.0.0
DATE:    2026-11-24
CHAT:    Power and grid management technical paper
CHANGES: 1.0.0 - IEEE two-column A4 edition (adapted from the data-centre paper generator v1.1.0): converts
                 _content/<slug>.md to _content/<slug>.ieee.html and prints pdf/<slug>.pdf
STATUS:  working

Run: python3 assemble.py && python3 gen_ieee.py
"""
__version__ = "1.0.0"

import os
import re
from pathlib import Path

import markdown

SLUG = "power-grid-management-worldwide"
TITLE = "Keeping the Lights On: Grid Management Worldwide, Blackout Lessons and India's Path"
DATE = "24 November 2026"
HERE = Path(__file__).resolve().parent
PAPERS = HERE.parents[1]
SRC = HERE.parent / f"{SLUG}.md"
OUT_HTML = HERE.parent / f"{SLUG}.ieee.html"
OUT_PDF = PAPERS / "pdf" / f"{SLUG}.pdf"
WIDE_FIGS = {"fig1_timescales", "fig5_losses", "fig6_investment_storage", "fig8_india_demand_capacity", "fig2_frequency_response", "fig9_duck_curve", "fig7_us_queue", "fig4_dispatch", "fig11_dlr"}

ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"]

CSS = r"""
@page { size: A4; margin: 17mm 14mm 18mm 14mm; }
body { font-family: 'TeX Gyre Termes','Times New Roman','Liberation Serif',serif; font-size: 10pt; line-height: 1.22; color:#000; margin:0; }
.title { text-align:center; font-size: 21pt; line-height:1.15; margin: 0 0 10px; font-weight: normal; }
.authors { text-align:center; font-size: 11pt; margin: 0 0 2px; }
.series { text-align:center; font-size: 8.5pt; font-style: italic; margin: 0 0 14px; }
.cols { column-count: 2; column-gap: 4.5mm; text-align: justify; hyphens: auto; }
p { margin: 0; text-indent: 1em; orphans: 2; widows: 2; }
h2 + p, h3 + p, .tcap + p, figure + p, .worked + p, .eqn + p, table + p { text-indent: 1em; }
.abstract, .index { font-weight: bold; font-size: 9pt; text-indent: 0; margin-bottom: 6px; }
.abstract i, .index i { font-weight: bold; }
h2 { font-size: 10pt; font-weight: normal; font-variant: small-caps; text-align: center; margin: 10px 0 4px; letter-spacing: .3px; break-after: avoid; }
h3 { font-size: 10pt; font-weight: normal; font-style: italic; margin: 6px 0 2px; break-after: avoid; }
.eqn { text-align: center; text-indent: 0; margin: 5px 0; }
.worked { border: .7px solid #000; padding: 4px 6px 4px; margin: 6px 0 8px; break-inside: avoid; font-size: 9pt; line-height: 1.2; text-align: left; }
.worked p { text-indent: 0; margin: 2px 0; }
.worked .wt { font-weight: bold; font-size: 8.4pt; letter-spacing: .2px; }
.worked .ans { font-weight: bold; }
.worked .eqn { margin: 3px 0; }
.wide { column-span: all; margin: 8px 0 10px; }
.tcap { text-align:center; font-size: 8pt; margin: 6px 0 3px; text-indent: 0; break-after: avoid; }
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
figure img { width: 100%; }
figure.wide img { width: 82%; }
figcaption { font-size: 8pt; text-align: justify; margin-top: 3px; line-height: 1.2; }
.refs { font-size: 7.8pt; text-indent: 0; }
.refs ol { list-style: none; padding-left: 0; counter-reset: r; margin: 0; }
.refs li { counter-increment: r; position: relative; padding-left: 22px; margin-bottom: 2px; text-align: left; word-break: break-word; }
.refs li::before { content: "[" counter(r) "]"; position: absolute; left: 0; }
.refs a { color:#000; text-decoration:none; }
a { color:#000; text-decoration:none; }
"""


def roman_sections(html):
    sec = {"n": 0}

    def h2(m):
        t = m.group(1)
        mm = re.match(r"(\d+)\.\s+(.*)", t)
        if mm:
            n = int(mm.group(1))
            sec["n"] = n
            return f"<h2>{ROMAN[n]}. {mm.group(2)}</h2>"
        return f"<h2>{t}</h2>"

    html = re.sub(r"<h2[^>]*>(.*?)</h2>", h2, html)

    def h3(m):
        t = m.group(1)
        mm = re.match(r"(\d+)\.(\d+)\s+(.*)", t)
        if mm:
            return f"<h3>{chr(64 + int(mm.group(2)))}. {mm.group(3)}</h3>"
        return f"<h3>{t}</h3>"

    return re.sub(r"<h3[^>]*>(.*?)</h3>", h3, html)


def tables(html):
    # caption div + following table -> one block; wide if 4+ columns
    def rep(m):
        n, title, tbl = m.group(1), m.group(2), m.group(3)
        ncol = len(re.findall(r"<th", re.search(r"<thead>.*?</thead>", tbl, re.S).group(0)))
        wide = " wide" if ncol >= 4 else ""
        if tbl.count("<tr") > 11:
            wide += " long"
        cap = (f'<div class="tcap"><span class="tn">TABLE {ROMAN[int(n)]}</span>'
               f'<span class="tt">{title}</span></div>')
        return f'<div class="tblock{wide}">{cap}{tbl}</div>'

    return re.sub(r'<div class="tcap"><b>Table (\d+)\.</b>\s*(.*?)</div>\s*(<table>.*?</table>)', rep, html, flags=re.S)


def figures(html):
    def rep(m):
        src, cap = m.group(1), m.group(2)
        key = Path(src).stem
        cap = re.sub(r'<span class="credit">.*?</span>', "", cap)
        cap = re.sub(r"<b>Figure (\d+)\.</b>", r"Fig.&nbsp;\1.", cap)
        cls = ' class="wide"' if key in WIDE_FIGS else ""
        return f'<figure{cls}><img src="../{src}" alt=""><figcaption>{cap}</figcaption></figure>'

    return re.sub(r'<div class="figrow one"><figure[^>]*><a[^>]*><img src="([^"]+)"[^>]*></a>'
                  r'<figcaption>(.*?)</figcaption></figure></div>', rep, html, flags=re.S)


def main():
    text = SRC.read_text(encoding="utf-8")
    text = re.sub(r"<style>.*?</style>\s*", "", text, flags=re.S)
    md = markdown.Markdown(extensions=["tables", "sane_lists"])
    html = md.convert(text)
    # abstract and index terms
    html = re.sub(r"<h2[^>]*>Abstract</h2>\s*<p>", '<p class="abstract"><i>Abstract</i>&mdash;', html, count=1)
    html = html.replace("<p><b>Index Terms</b>&mdash;", '<p class="index"><i>Index Terms</i>&mdash;', 1)
    html = roman_sections(html)
    html = tables(html)
    html = figures(html)
    html = html.replace("Figure&nbsp;", "Fig.&nbsp;").replace("Figures&nbsp;", "Figs.&nbsp;")
    html = re.sub(r"Table&nbsp;(\d+)", lambda m: f"Table&nbsp;{ROMAN[int(m.group(1))]}", html)
    html = re.sub(r"Section&nbsp;(\d+)\.(\d+)", lambda m: f"Section&nbsp;{ROMAN[int(m.group(1))]}-{chr(64 + int(m.group(2)))}", html)
    html = re.sub(r"Sections&nbsp;(\d+) to (\d+)", lambda m: f"Sections&nbsp;{ROMAN[int(m.group(1))]} to {ROMAN[int(m.group(2))]}", html)
    html = re.sub(r"Section&nbsp;(\d+)(?!\d|\.\d)", lambda m: f"Section&nbsp;{ROMAN[int(m.group(1))]}", html)
    html = re.sub(r"Sections&nbsp;(\d+) and (\d+)", lambda m: f"Sections&nbsp;{ROMAN[int(m.group(1))]} and {ROMAN[int(m.group(2))]}", html)
    # references
    html = re.sub(r"(<h2>References</h2>\s*)<ol>", r'\1<div class="refs"><ol>', html, count=1)
    if '<div class="refs"><ol>' in html:
        i = html.index('<div class="refs"><ol>')
        j = html.index("</ol>", i)
        html = html[:j + 5] + "</div>" + html[j + 5:]
    html = html.replace("<h2>Acknowledgment</h2>", "<h2>Acknowledgment</h2>")
    page = f"""<!DOCTYPE html>
<!--
TOOL:    papers/_content/{SLUG}.ieee.html
FAMILY:  papers
VERSION: 1.0.0
DATE:    2026-11-24
CHAT:    Power and grid management technical paper
CHANGES: 1.0.0 - IEEE two-column A4 source; generated by power-grid-management-src/gen_ieee.py; printed to pdf/{SLUG}.pdf (supplied PDF)
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
