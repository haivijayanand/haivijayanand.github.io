"""
TOOL:    Vijay_Wiki build script (build.py) — renders all article modules to self-contained HTML
FAMILY:  vijay-wiki
VERSION: 1.0.0
DATE:    2026-11-24
CHAT:    claude.ai — Vijay_Wiki: build all suggested topics in groups and upload
CHANGES: 1.0.0 Initial: loads articles/g*.py, writes <slug>.html and index.html to the output folder
"""
__version__ = "1.0.0"

import importlib.util, glob, os, sys, re
sys.path.insert(0, os.path.dirname(__file__))
import wiki

OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), "out")
os.makedirs(OUT, exist_ok=True)

EXTRA = [dict(slug="grease-and-high-speed-bearings", title="Grease: History, Nomenclature and High-Speed Bearings", group="tribology",
              blurb="From tallow on chariot axles to PFPE greases. NLGI and DIN 51825 codes, test methods, and how to lubricate bearings at 20,000–50,000 rpm.",
              tags=["Tribology", "Bearings", "Grease", "Aerospace"], feat="9 diagrams · 4 worked examples · lubrication workbench · 17-question self-test")]

arts = []
for f in sorted(glob.glob(os.path.join(os.path.dirname(__file__), "articles", "g*.py"))):
    spec = importlib.util.spec_from_file_location(os.path.basename(f)[:-3], f)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    arts += m.ARTICLES

slugs = set()
for a in arts:
    assert a["slug"] not in slugs, a["slug"]
    slugs.add(a["slug"])
    for k in ("title", "short", "group", "tags", "desc", "blurb", "lead", "takeaways", "body", "calcs", "quiz", "refs"):
        assert k in a, (a["slug"], k)
    for q in a["quiz"]:
        assert ("num" in q) or (0 <= q["a"] < len(q["o"])), (a["slug"], q["q"])

everything = EXTRA + arts
for a in arts:
    rel = [b for b in everything if b["group"] == a["group"] and b["slug"] != a["slug"]]
    rel_html = " · ".join(f'<a href="{b["slug"]}.html">{wiki.esc(b["title"])}</a>' for b in rel)
    a.setdefault("feat", f'{a["body"].count("<figure")} diagram{"s" if a["body"].count("<figure")!=1 else ""} · {len(a["calcs"])} calculator{"s" if len(a["calcs"])!=1 else ""} · {len(a["quiz"])}-question self-test')
    with open(os.path.join(OUT, a["slug"] + ".html"), "w", encoding="utf-8") as fh:
        fh.write(wiki.page(a, rel_html))

with open(os.path.join(OUT, "index.html"), "w", encoding="utf-8") as fh:
    fh.write(wiki.index_page(arts, EXTRA))
print(f"built {len(arts)} articles + index into {OUT}")
