#!/usr/bin/env python3
"""
TOOL:    syllabus_ba.py — builds tools/llb-ba-sem1-syllabus.pdf and tools/llb-ba-sem2-syllabus.pdf (B.A. LL.B. reference syllabus, A4)
FAMILY:  law-explorers
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    Kaavya Study Materials – TNNLU B.A. LL.B. Semester I and II explorers (claude.ai, 2026-11-22)
CHANGES: 1.0.0 - first version: unit lists are read from each explorer page (UNITS), so the PDF always matches the pages
usage:   python3 _scripts/llb-build/syllabus_ba.py      (needs Playwright + Chromium; serves the repo on localhost:8766)
"""
__version__ = "1.0.0"
import html, pathlib, subprocess, sys, time
from playwright.sync_api import sync_playwright

REPO = pathlib.Path(__file__).resolve().parents[2]
SEMS = {
 "I": [
  ("English I", "Language", "ba-english-1", "General English and legal language: grammar, vocabulary, comprehension, composition and plain legal English.",
   ["Wren and Martin, High School English Grammar and Composition (S. Chand)", "S.C. Tripathi, Legal Language, Legal Writing and General English (Central Law Publications)", "Bryan Garner, Legal Writing in Plain English (Chicago)"]),
  ("Political Science I – Political Theory and Organisation", "Liberal discipline", "ba-political-science-1", "Political science and its approaches, the State, sovereignty, political values, forms and organs of government, parties and elections.",
   ["O.P. Gauba, An Introduction to Political Theory (National Paperbacks)", "Bhargava and Acharya (eds), Political Theory: An Introduction (Pearson)", "A.C. Kapur, Principles of Political Science (S. Chand)"]),
  ("Sociology I – Sociology: A Critical Introduction", "Liberal discipline", "sociology", "The society that law regulates – institutions, inequality, social control and change – linked to Indian law.",
   ["M. Haralambos and R.M. Heald, Sociology: Themes and Perspectives (OUP)", "T.B. Bottomore, Sociology (Blackie)", "M.N. Srinivas, Social Change in Modern India"]),
  ("Economics I – Principles of Economics", "Liberal discipline", "ba-economics-1", "Micro foundations and an introduction to macroeconomics, money, banking and public finance.",
   ["N. Gregory Mankiw, Principles of Economics (Cengage)", "H.L. Ahuja, Principles of Microeconomics (S. Chand)", "Ramesh Singh, Indian Economy (McGraw-Hill)"]),
  ("Legal Methods", "Core law", "legal-methods", "What law is, where it comes from, how courts are arranged, and how to read statutes and judgments.",
   ["Glanville Williams, Learning the Law (Sweet & Maxwell)", "ILI, Legal Research and Methodology", "M.P. Jain, Outlines of Indian Legal and Constitutional History (LexisNexis)"]),
  ("Law of Torts", "Core law", "law-of-torts", "Civil wrongs and their remedies, including negligence, nuisance, defamation, strict and absolute liability and State liability.",
   ["Ratanlal & Dhirajlal, The Law of Torts (LexisNexis)", "R.K. Bangia, Law of Torts (Allahabad Law Agency)", "Winfield & Jolowicz on Tort (Sweet & Maxwell)"]),
 ],
 "II": [
  ("English II", "Language", "ba-english-2", "Reading judgments, academic and legal writing, advocacy, drafting fundamentals, and law and literature.",
   ["Glanville Williams, Learning the Law (Sweet & Maxwell)", "OSCOLA, 4th edition (Oxford)", "Shakespeare, The Merchant of Venice"]),
  ("Political Science II – Political Obligations", "Liberal discipline", "ba-political-science-2", "Why obey the law: consent, idealist, utilitarian and radical theories; civil disobedience; rights, duties and citizenship; obligation in constitutional India.",
   ["O.P. Gauba, An Introduction to Political Theory (National Paperbacks)", "A. John Simmons, Moral Principles and Political Obligations (Princeton)", "Thoreau, Civil Disobedience; Gandhi, Hind Swaraj"]),
  ("Sociology II – Research Methods in Social Sciences", "Liberal discipline", "ba-sociology-2", "Scientific method, doctrinal and empirical research, design, sampling, data collection, measurement, analysis, ethics and reporting.",
   ["Ram Ahuja, Research Methods (Rawat)", "C.R. Kothari and G. Garg, Research Methodology (New Age)", "Goode and Hatt, Methods in Social Research (McGraw-Hill)"]),
  ("History I – Indian History", "Liberal discipline", "ba-history-1", "Indian history from the Harappan cities to Independence, with attention to governance, law and Tamil Nadu.",
   ["Upinder Singh, A History of Ancient and Early Medieval India (Pearson)", "Satish Chandra, History of Medieval India (Orient BlackSwan)", "Sekhar Bandyopadhyay, From Plassey to Partition (Orient BlackSwan)"]),
  ("Law of Contracts I", "Core law", "law-of-contracts-1", "General principles of the Indian Contract Act, 1872 (sections 1–75) and the Specific Relief Act, 1963.",
   ["Avtar Singh, Contract & Specific Relief (EBC)", "Pollock & Mulla, Indian Contract and Specific Relief Acts (LexisNexis)", "R.K. Bangia, Indian Contract Act (Allahabad Law Agency)"]),
  ("Family Law I", "Core law", "family-law-1", "Hindu family law under the Hindu Code, BNSS s.144 maintenance, and the Special Marriage Act, 1954.",
   ["Paras Diwan, Modern Hindu Law (Allahabad Law Agency)", "Kusum, Family Law Lectures: Family Law I (LexisNexis)", "Flavia Agnes, Family Law (OUP)"]),
 ]}

def units_of(pg, slug):
    pg.goto(f"http://localhost:8766/tools/llb-{slug}.html", wait_until="load"); pg.wait_for_timeout(250)
    return pg.evaluate("UNITS.map(u=>[u.n,u.title,u.short])")

def build(sem, courses, pg, b):
    e = html.escape
    roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"]
    data = [(c, units_of(pg, c[2])) for c in courses]
    rows = "".join(f"<tr><td>{i+1}</td><td>{e(c[0])}</td><td>{e(c[1])}</td><td>{len(u)}</td></tr>" for i, (c, u) in enumerate(data))
    secs = ""
    for i, ((name, kind, slug, intro, books), units) in enumerate(data):
        shared = "" if slug.startswith("ba-") else " · common to B.A. LL.B. and B.Com. LL.B."
        secs += f"""<section><h2>{i+1}. {e(name)}</h2><p class="k">{e(kind)}{shared} · Explorer: haivijayanand.github.io/tools/llb-{slug}.html</p><p>{e(intro)}</p>
<table><tr><th style="width:32%">Unit</th><th>Topics</th></tr>{''.join(f'<tr><td><b>{roman[n-1]}. {e(t)}</b></td><td>{e(s)}</td></tr>' for n, t, s in units)}</table>
<p class="b"><b>Key books:</b> {'; '.join(e(b) for b in books)}.</p></section>"""
    title = f"TNNLU B.A. LL.B. (Hons.) — Semester {sem} Syllabus"
    doc = f"""<!DOCTYPE html><html><head><meta charset="utf-8"><title>{title}</title><style>
@page{{size:A4;margin:16mm 16mm 18mm}}
body{{font:10.8pt/1.45 "Segoe UI",Arial,sans-serif;color:#1f1b16}}
h1{{font:bold 21pt Georgia,serif;color:#7a1f2b;margin:0 0 4px}} h2{{font:bold 15pt Georgia,serif;color:#7a1f2b;margin:0 0 2px}}
.sub{{color:#6b6257;margin:0 0 12px}} .k{{color:#6b6257;font-size:9.5pt;margin:0 0 6px}}
table{{border-collapse:collapse;width:100%;margin:6px 0}} th,td{{border:1px solid #d9cfbd;padding:5px 7px;text-align:left;vertical-align:top}} th{{background:#efe6d6}}
section{{break-inside:auto;margin-top:16px}} section+section{{break-before:page}}
.box{{background:#f6e7c1;border-left:4px solid #9a7412;padding:8px 12px;margin:10px 0}} .b{{font-size:10pt}}
</style></head><body>
<h1>{title}</h1><p class="sub">Reference syllabus · 22 November 2026 · Law Study Explorers, haivijayanand.github.io/llb/</p>
<div class="box"><b>How to use this.</b> This is a reference syllabus for the six Semester {sem} courses of TNNLU's five-year B.A. LL.B. (Hons.), as named on the university's undergraduate programme page. TNNLU's own unit-wise outlines are issued by faculty each semester and are not published online. The units follow standard Indian law-university syllabi; the law courses are shared with the B.Com. LL.B. When the official outline for a paper arrives, compare it with the matching section and mark what differs.</div>
<table><tr><th>#</th><th>Course</th><th>Type</th><th>Units</th></tr>{rows}</table>
<p>Each course has an interactive explorer with labs, animations, flashcards, a quiz, a progress bar and a certificate of completion (all units done and 70% or more in the mixed quiz).</p>
{secs}</body></html>"""
    out = REPO / "tools" / f"llb-ba-sem{1 if sem == 'I' else 2}-syllabus.pdf"
    p2 = b.new_page(); p2.set_content(doc); p2.wait_for_timeout(300)
    p2.pdf(path=str(out), format="A4", print_background=True, display_header_footer=True, header_template="<span></span>",
           footer_template=f'<div style="font-size:8pt;width:100%;text-align:center;color:#888">{title} · Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
           margin={"top": "16mm", "bottom": "18mm", "left": "16mm", "right": "16mm"})
    p2.close()
    print(out, out.stat().st_size)

srv = subprocess.Popen([sys.executable, "-m", "http.server", "8766", "-d", str(REPO)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1)
try:
    with sync_playwright() as p:
        b = p.chromium.launch(args=["--no-sandbox"]); pg = b.new_page()
        for sem, courses in SEMS.items(): build(sem, courses, pg, b)
        b.close()
finally:
    srv.terminate()
