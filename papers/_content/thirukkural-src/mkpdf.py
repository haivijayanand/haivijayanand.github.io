"""
TOOL:    mkpdf.py — prints the IEEE HTML source of a paper to an A4 PDF with page numbers
FAMILY:  papers
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    Thirukkural Ulaga Pothu Marai technical paper
CHANGES: 1.0.0 - Chromium print with page-number footer
"""
__version__ = "1.0.0"
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright
src, out = Path(sys.argv[1]).resolve(), Path(sys.argv[2]).resolve()
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page()
    pg.goto(src.as_uri()); pg.wait_for_load_state("networkidle")
    pg.pdf(path=str(out), format="A4", prefer_css_page_size=True, print_background=True, display_header_footer=True,
           header_template="<span></span>",
           footer_template='<div style="width:100%;text-align:center;font-family:Liberation Serif,serif;font-size:8px"><span class="pageNumber"></span></div>')
    b.close()
from pypdf import PdfReader
print(len(PdfReader(str(out)).pages), "pages")
