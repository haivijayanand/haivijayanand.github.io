"""
TOOL:    build_samples.py
FAMILY:  VA_Presentation_Template
VERSION: 1.0.1
DATE:    2026-11-28
CHAT:    Rebuild VA A4 landscape PowerPoint template
CHANGES: 1.0.1 - Figures fitted inside placeholder instead of cropped.
         1.0.0 - One sample slide per layout with usage notes, illustrative chart, table, figure.
"""
__version__ = "1.0.1"

import sys
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from pptx import Presentation
from pptx.chart.data import XyChartData, CategoryChartData
from pptx.enum.chart import XL_CHART_TYPE, XL_LEGEND_POSITION
from pptx.util import Pt
from pptx.dml.color import RGBColor
from pptx.oxml.ns import qn

BASE, OUT = sys.argv[1], sys.argv[2]
prs = Presentation(BASE)
LAY = {l.name: l for l in prs.slide_layouts}
NAVY, GOLD, SKY, ORANGE, GREY = "0A1F4E", "F2B705", "2E86C1", "E67E22", "7F8C8D"

# ------------------------------------------------ illustrative figure
J = np.linspace(0.1, 1.0, 60)
fig, ax = plt.subplots(figsize=(7.2, 4.2), dpi=200)
for p, c, ls in [(20, "#0A1F4E", "-"), (25, "#2E86C1", "--"), (30, "#E67E22", "-.")]:
    eta = 0.88 * np.sin(np.pi * (J / (0.55 + p / 100))) * np.exp(-0.3 * J)
    ax.plot(J, np.clip(eta, 0, None), color=c, lw=2.4, ls=ls, label=f"pitch {p}°")
ax.set_xlabel("Advance ratio J"); ax.set_ylabel("Efficiency η")
ax.grid(alpha=0.3); ax.legend(frameon=False)
for s in ("top", "right"): ax.spines[s].set_visible(False)
ax.set_title("Illustrative data", fontsize=9, color="#5B6470", loc="left")
fig.tight_layout(); fig.savefig("/home/claude/build/fig_sample.png"); plt.close(fig)

# ------------------------------------------------ helpers
def fit(picture):
    """Undo placeholder crop; scale the picture to fit inside the placeholder frame, centred."""
    from PIL import Image
    picture.crop_left = picture.crop_right = picture.crop_top = picture.crop_bottom = 0
    iw, ih = Image.open(picture.image.blob and __import__("io").BytesIO(picture.image.blob)).size
    fx, fy, fw, fh = picture.left, picture.top, picture.width, picture.height
    k = min(fw / iw, fh / ih)
    w, h = int(iw * k), int(ih * k)
    picture.left, picture.top, picture.width, picture.height = fx + (fw - w) // 2, fy + (fh - h) // 2, w, h

def slide(layout, notes):
    s = prs.slides.add_slide(LAY[layout])
    s.notes_slide.notes_text_frame.text = notes
    return s

def put(s, idx, lines):
    """lines: str or list of str / (text, level). '_x' subscript, '^x' superscript via {_..} {^..}."""
    tf = s.placeholders[idx].text_frame
    lines = [lines] if isinstance(lines, str) else lines
    for k, item in enumerate(lines):
        text, level = (item, 0) if isinstance(item, str) else item
        p = tf.paragraphs[0] if k == 0 else tf.add_paragraph()
        p.level = level
        for seg, base in parse(text):
            r = p.add_run(); r.text = seg
            if base: r._r.get_or_add_rPr().set("baseline", base)

def parse(t):
    out, buf, i = [], "", 0
    while i < len(t):
        if t[i] == "{" and t[i + 1] in "_^":
            if buf: out.append((buf, None)); buf = ""
            j = t.index("}", i)
            out.append((t[i + 2:j], "-25000" if t[i + 1] == "_" else "30000")); i = j + 1
        else:
            buf += t[i]; i += 1
    if buf: out.append((buf, None))
    return out

# ------------------------------------------------ 1 title
s = slide("VA Title Slide", "Title slide. Title, subtitle, author, series line and date/venue are placeholders. "
          "For GitHub papers the author is K Vijay Anand only.")
put(s, 0, "Template Guide: VA Technical Paper Series")
put(s, 1, "One sample slide for every layout in the rebuilt A4 landscape template")
put(s, 10, "K Vijay Anand")
put(s, 11, "Technical Paper Series  ·  haivijayanand.github.io")
put(s, 12, "November 2026")

# ------------------------------------------------ 2 outline
s = slide("VA Outline", "Outline: numbered list, auto-numbered in red. Keep to 4–7 items.")
put(s, 0, "Outline")
put(s, 1, ["Background and motivation", "Governing equations", "Method and test set-up",
           "Results", "Conclusions and future work"])

# ------------------------------------------------ 3 section
s = slide("VA Section Divider", "Section divider: navy background, gold section number. Use between major parts.")
put(s, 10, "01")
put(s, 0, "Background and Motivation")
put(s, 11, "Why the problem matters and what earlier work left open")

# ------------------------------------------------ 4 content
s = slide("VA Title and Content", "Title and Content: general bullets. Three levels are styled. "
          "The content placeholder also accepts a table, chart or picture.")
put(s, 0, "Title and Content: Bullets in Three Levels")
put(s, 1, ["First-level point in 18 pt Aptos, navy bullet",
           ("Second-level detail in 16 pt with a dash", 1),
           ("Third level in 14 pt grey for supporting notes", 2),
           "Keep to one message per slide and five or six bullets",
           "Headings auto-shrink if they run longer than the header band allows",
           ("Long headings: aim for under 45 characters", 1)])

# ------------------------------------------------ 5 two content
s = slide("VA Two Content", "Two Content: side-by-side text, or text and a table/chart. Each side accepts any content.")
put(s, 0, "Two Content: Compare Approaches")
put(s, 1, ["Panel method", ("Fast, linear, good for attached flow", 1), ("Needs viscous coupling for drag", 1),
           "Strengths", ("Runs in seconds on a laptop", 1)])
put(s, 2, ["CFD (RANS)", ("Handles separation and 3-D effects", 1), ("Mesh and turbulence model dependent", 1),
           "Cost", ("Hours to days per case", 1)])

# ------------------------------------------------ 6 text + figure
s = slide("VA Text and Figure", "Text and Figure: explanation at left, figure at right with a numbered caption below.")
put(s, 0, "Text and Figure")
put(s, 1, ["Efficiency peaks at a higher advance ratio as pitch increases",
           "Peak value falls slightly with pitch",
           ("Curves here are illustrative only", 1),
           "Figure placeholder crops to fit; drag to re-centre"])
fit(s.placeholders[2].insert_picture("/home/claude/build/fig_sample.png"))
put(s, 3, "Fig. 1: Efficiency against advance ratio for three pitch settings (illustrative)")

# ------------------------------------------------ 7 full figure
s = slide("VA Full Figure", "Full Figure: for a large plot, photo or drawing, with a caption.")
put(s, 0, "Full Figure")
fit(s.placeholders[1].insert_picture("/home/claude/build/fig_sample.png"))
put(s, 2, "Fig. 2: Same plot at full width (illustrative data)")

# ------------------------------------------------ 8 table
s = slide("VA Table", "Table: caption above, notes below, IEEE style. Table uses theme style with navy header.")
put(s, 0, "Table")
put(s, 2, "Table 1: Comparison of analysis methods (illustrative)")
rows = [["Method", "Typical run time", "Viscous effects", "Best use"],
        ["Panel + boundary layer", "Seconds", "Coupled", "Early design, polars"],
        ["Vortex lattice", "Seconds", "No", "Wing loading, stability"],
        ["RANS CFD", "Hours", "Yes", "Separated flow, final checks"],
        ["Wind tunnel", "Days", "Yes", "Validation"]]
gf = s.placeholders[1].insert_table(len(rows), len(rows[0]))
tbl = gf.table
for r, row in enumerate(rows):
    for c, val in enumerate(row):
        cell = tbl.cell(r, c); cell.text = val
        for p in cell.text_frame.paragraphs:
            for run in p.runs: run.font.size = Pt(15); run.font.bold = (r == 0)
put(s, 3, "Notes: run times are order-of-magnitude for a single case on a desktop PC.")

# ------------------------------------------------ 9 equations
s = slide("VA Equations", "Equations: equation panel on top, 'where' list below. In PowerPoint use Insert → Equation "
          "inside the panel for proper math typesetting.")
put(s, 0, "Governing Equations")
put(s, 1, ["C{_T} = T / (ρ n{^2} D{^4})        C{_P} = P / (ρ n{^3} D{^5})",
           "η = J · C{_T} / C{_P},    J = V / (n D)"])
put(s, 2, ["where", ("T thrust (N), P shaft power (W), ρ air density (kg/m³)", 1),
           ("n rotational speed (rev/s), D diameter (m), V axial velocity (m/s)", 1)])

# ------------------------------------------------ 10 key result
s = slide("VA Key Result", "Key Result: native chart at left; takeaway panel with one big number and a short message.")
put(s, 0, "Key Result")
cd = CategoryChartData()
cd.categories = ["Baseline", "Pitch +2°", "Pitch +4°", "Tip twist"]
cd.add_series("Efficiency (%)", (78, 81, 83, 87))
gf = s.placeholders[1].insert_chart(XL_CHART_TYPE.COLUMN_CLUSTERED, cd)
ch = gf.chart
ch.has_legend = False
ch.font.size = Pt(13)
plot = ch.plots[0]; plot.has_data_labels = True
plot.data_labels.font.size = Pt(13); plot.data_labels.number_format = '0"%"'; plot.data_labels.number_format_is_linked = False
plot.gap_width = 80
ser = plot.series[0]
ser.format.fill.solid(); ser.format.fill.fore_color.rgb = RGBColor.from_string(NAVY)
pt = ser.points[3]; pt.format.fill.solid(); pt.format.fill.fore_color.rgb = RGBColor.from_string(GOLD)
va = ch.value_axis; va.has_major_gridlines = True; va.maximum_scale = 100; va.minimum_scale = 0
va.major_gridlines.format.line.color.rgb = RGBColor.from_string("D9DDE3")
va.format.line.fill.background()
ch.has_title = True; ch.chart_title.text_frame.text = "Efficiency by configuration (illustrative)"
ch.chart_title.text_frame.paragraphs[0].runs[0].font.size = Pt(14)
put(s, 2, "+9 pts")
put(s, 3, ["Tip twist gives the largest gain over the baseline.", "Pitch changes alone recover less than half of it."])

# ------------------------------------------------ 11 conclusions
s = slide("VA Conclusions", "Conclusions: two cards, conclusions (navy bullets) and future work (gold bullets).")
put(s, 0, "Conclusions")
put(s, 10, "Conclusions")
put(s, 1, ["Main finding stated in one line", "Second finding with the number that supports it",
           "Limits of the method stated plainly"])
put(s, 11, "Future work")
put(s, 2, ["Validate against test data", "Extend to the next operating range", "Release the scripts on GitHub"])

# ------------------------------------------------ 12 references
s = slide("VA References", "References: IEEE style in two columns, 12 pt, hanging indent. Type [n] manually.")
put(s, 0, "References")
put(s, 1, ["[1] A. Author and B. Author, “Title of the journal article,” Journal Name, vol. 12, no. 3, pp. 45–67, 2020.",
           "[2] C. Author, Title of the Book, 2nd ed. City, Country: Publisher, 2018.",
           "[3] D. Author, “Title of the conference paper,” in Proc. Conference Name, City, 2021, pp. 1–8.",
           "[4] E. Author, “Title of the report,” Organisation, Tech. Rep. TR-01, 2019.",
           "[5] Software name, version x.y. [Online]. Available: https://example.org",
           "[6] F. Author, “Title of the thesis,” Ph.D. dissertation, University, City, 2015."])

# ------------------------------------------------ 13 title only
s = slide("VA Title Only", "Title Only: free canvas under the heading for diagrams, flowcharts or custom arrangements.")
put(s, 0, "Title Only: Free Canvas for Diagrams")

# ------------------------------------------------ 14 blank
s = slide("VA Blank", "Blank: header band and footer stay; no heading. For full-page images or custom slides.")

# ------------------------------------------------ 15 thanks
s = slide("VA Thank You", "Closing slide.")
put(s, 0, "Thank You")
put(s, 1, "Questions and discussion")
put(s, 10, "haivijayanand.github.io  ·  haivijayanand@gmail.com")

prs.core_properties.title = "VA Technical Paper Series Template"
prs.core_properties.author = "K Vijay Anand"
prs.save(OUT)
print("saved", OUT, len(prs.slides), "slides")
