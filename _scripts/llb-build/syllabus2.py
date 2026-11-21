#!/usr/bin/env python3
"""
TOOL:    syllabus2.py — builds tools/llb-sem2-syllabus.pdf (Semester II reference syllabus, A4)
FAMILY:  law-explorers
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    Kaavya Study Materials – TNNLU B.Com. LL.B. Semester II explorers (claude.ai, 2026-11-22)
CHANGES: 1.0.0 - first version
"""
__version__ = "1.0.0"
import html, pathlib
from playwright.sync_api import sync_playwright

OUT = pathlib.Path(__file__).resolve().parents[2] / "tools" / "llb-sem2-syllabus.pdf"
C = [
 ("Law of Contracts I", "Core law", "llb-law-of-contracts-1",
  "General principles of contract under the Indian Contract Act, 1872 (sections 1–75) and remedies under the Specific Relief Act, 1963.",
  [("I. Offer and acceptance", "Definitions in s.2; proposal and invitation to treat; general offers; communication, acceptance and revocation (ss.3–9); postal rule; e-contracts (IT Act s.10A)"),
   ("II. Consideration and capacity", "s.2(d); past consideration; privity; s.25 exceptions; minors (Mohori Bibee), persons of unsound mind; necessaries (s.68)"),
   ("III. Free consent", "Coercion, undue influence, fraud, misrepresentation (ss.13–19A); mistake of fact and law (ss.20–22)"),
   ("IV. Lawful object and void agreements", "s.23 public policy; ss.24–30 – restraint of marriage, trade and legal proceedings, uncertainty, wagering; contingent contracts (ss.31–36)"),
   ("V. Performance and discharge", "Who must perform; time; reciprocal promises; appropriation of payments; frustration (s.56); novation, remission; anticipatory breach (s.39)"),
   ("VI. Breach, damages, quasi-contracts", "ss.73–75; remoteness (Hadley v Baxendale); liquidated damages and penalty (Fateh Chand, Kailash Nath); quasi-contracts (ss.68–72); quantum meruit"),
   ("VII. Specific Relief Act, 1963", "Specific performance after the 2018 amendment; ss.14, 16, 20 (substituted performance), 20A; rectification, rescission, cancellation; declarations; injunctions")],
  ["Avtar Singh, Contract & Specific Relief (EBC)", "Pollock & Mulla, Indian Contract and Specific Relief Acts (LexisNexis)", "R.K. Bangia, Indian Contract Act (Allahabad Law Agency)"]),
 ("Family Law I", "Core law", "llb-family-law-1",
  "Hindu family law under the Hindu Code of 1955–56, the secular maintenance remedy, and civil marriage under the Special Marriage Act, 1954.",
  [("I. Sources, schools and application", "Who is a Hindu; shruti, smriti, custom; Mitakshara and Dayabhaga; the Hindu Code"),
   ("II. Hindu marriage", "Nature; conditions (s.5) and ceremonies (s.7); registration; void and voidable marriages (ss.11–12); sapinda and prohibited degrees; legitimacy (s.16)"),
   ("III. Matrimonial remedies", "Restitution (s.9); judicial separation (s.10); divorce grounds (s.13); mutual consent (s.13B); bars (ss.14, 23); irretrievable breakdown and Article 142"),
   ("IV. Maintenance", "HAMA ss.18–23; HMA ss.24–25; BNSS s.144 (old CrPC s.125); Domestic Violence Act s.20; Rajnesh v Neha guidelines"),
   ("V. Adoption", "HAMA ss.6–17 – who may adopt, give and be adopted; conditions and effects; JJ Act, 2015 and CARA"),
   ("VI. Minority and guardianship", "HMGA 1956 – natural, testamentary and court guardians; powers over property; welfare principle; Gita Hariharan"),
   ("VII. Special Marriage Act and choice", "Conditions, notice and objection; consequences; right to choose a partner; Supriyo Chakraborty; Article 44")],
  ["Paras Diwan, Modern Hindu Law (Allahabad Law Agency)", "Kusum, Family Law Lectures: Family Law I (LexisNexis)", "Flavia Agnes, Family Law Vol I and II (OUP)"]),
 ("Business Economics", "Liberal discipline", "llb-business-economics",
  "Microeconomics for business decisions, with an introduction to national income and economic policy.",
  [("I. Demand, supply and markets", "Scarcity and opportunity cost; laws of demand and supply; determinants; equilibrium; price ceilings and floors"),
   ("II. Elasticity", "Price, income and cross elasticity; total revenue test; tax incidence"),
   ("III. Consumer behaviour", "Utility analysis; equi-marginal principle; indifference curves and budget line; consumer surplus"),
   ("IV. Production and costs", "Law of variable proportions; returns to scale; cost curves; revenue; break-even"),
   ("V. Market structures", "Perfect competition, monopoly, monopolistic competition, oligopoly; price discrimination; Competition Act, 2002"),
   ("VI. Factor pricing and macroeconomics", "Rent, wages, interest, profit; national income; inflation; monetary and fiscal policy")],
  ["H.L. Ahuja, Business Economics (S. Chand)", "D.N. Dwivedi, Managerial Economics (Vikas)", "N. Gregory Mankiw, Principles of Economics (Cengage)"]),
 ("Research Tools for Business Decision Making", "Liberal discipline", "llb-research-tools",
  "Research methodology and business statistics for projects and decisions.",
  [("I. Research, data and sampling", "Research process and design; primary and secondary data; questionnaires; scales; sampling methods; errors; ethics"),
   ("II. Describing data and averages", "Classification and tabulation; charts; mean, median, mode; quartiles"),
   ("III. Dispersion and shape", "Range, quartile deviation, mean and standard deviation, coefficient of variation; skewness, kurtosis; box plots"),
   ("IV. Correlation and regression", "Scatter diagrams; Pearson and Spearman coefficients; least-squares regression; r²"),
   ("V. Probability and distributions", "Rules of probability; Bayes' theorem; binomial, Poisson and normal distributions"),
   ("VI. Hypothesis tests, index numbers, time series", "Type I and II errors; z, t and chi-square tests; Laspeyres, Paasche and Fisher indices; time-series components")],
  ["S.P. Gupta, Statistical Methods (Sultan Chand)", "Levin and Rubin, Statistics for Management (Pearson)", "C.R. Kothari and G. Garg, Research Methodology (New Age)"]),
 ("Marketing Management", "Liberal discipline", "llb-marketing-management",
  "Principles of marketing, with the Indian law on brands, labelling, pricing, e-commerce and advertising.",
  [("I. Marketing and its environment", "Core concepts; marketing philosophies; marketing mix (4 Ps / 7 Ps); PESTEL; SWOT"),
   ("II. Consumers, segmentation and positioning", "Buyer decision process and influences; segmentation bases; targeting; positioning"),
   ("III. Product and branding", "Product levels and mix; new product development; product life cycle; BCG matrix; brand equity; packaging and labelling rules"),
   ("IV. Pricing", "Objectives, methods and strategies; markup and margin; Competition Act, MRP and drug price control"),
   ("V. Distribution and retail", "Channels and intermediaries; retail formats; logistics; E-Commerce Rules, 2020"),
   ("VI. Promotion, digital marketing and the law", "Promotion mix; AIDA; digital and influencer marketing; misleading ads, CCPA and dark patterns")],
  ["Kotler, Keller et al., Marketing Management, Indian edition (Pearson)", "Rajan Saxena, Marketing Management (McGraw-Hill)", "Ramaswamy and Namakumari, Marketing Management: Indian Context (SAGE)"]),
 ("Business English II", "Language", "llb-business-english-2",
  "Advanced written and spoken communication for law and business, building on Business English I.",
  [("I. Persuasive and difficult messages", "Direct and indirect plans; bad-news, adjustment and persuasive letters; cover letters and résumés; professional email"),
   ("II. Reports, proposals and referencing", "Analytical reports; executive summaries; describing data; proposals; OSCOLA; plagiarism"),
   ("III. Speaking", "Presentations; group discussions; interviews (STAR); chairing meetings; courtroom manners"),
   ("IV. Legal writing and drafting", "Shall and may; definitions, provisos, non-obstante clauses; gender-neutral language; legal notices and affidavits"),
   ("V. Critical reading and vocabulary", "Arguments, assumptions, fallacies; comprehension; commonly confused words")],
  ["Bovée and Thill, Business Communication Today (Pearson)", "Raman and Singh, Business Communication (OUP)", "Bryan Garner, Legal Writing in Plain English (Chicago)"]),
]

e = html.escape
rows = "".join(f"<tr><td>{i+1}</td><td>{e(c[0])}</td><td>{e(c[1])}</td><td>{len(c[4])}</td></tr>" for i, c in enumerate(C))
secs = ""
for i, (name, kind, slug, intro, units, books) in enumerate(C):
    secs += f"""<section><h2>{i+1}. {e(name)}</h2><p class="k">{e(kind)} · Explorer: haivijayanand.github.io/tools/{slug}.html</p><p>{e(intro)}</p>
<table><tr><th style="width:32%">Unit</th><th>Topics</th></tr>{''.join(f'<tr><td><b>{e(u)}</b></td><td>{e(t)}</td></tr>' for u, t in units)}</table>
<p class="b"><b>Key books:</b> {'; '.join(e(b) for b in books)}.</p></section>"""

doc = f"""<!DOCTYPE html><html><head><meta charset="utf-8"><title>TNNLU B.Com. LL.B. (Hons.) — Semester II Syllabus</title><style>
@page{{size:A4;margin:16mm 16mm 18mm}}
body{{font:10.8pt/1.45 "Segoe UI",Arial,sans-serif;color:#1f1b16}}
h1{{font:bold 21pt Georgia,serif;color:#7a1f2b;margin:0 0 4px}} h2{{font:bold 15pt Georgia,serif;color:#7a1f2b;margin:0 0 2px}}
.sub{{color:#6b6257;margin:0 0 12px}} .k{{color:#6b6257;font-size:9.5pt;margin:0 0 6px}}
table{{border-collapse:collapse;width:100%;margin:6px 0}} th,td{{border:1px solid #d9cfbd;padding:5px 7px;text-align:left;vertical-align:top}} th{{background:#efe6d6}}
section{{break-inside:auto;margin-top:16px}} section+section{{break-before:page}}
.box{{background:#f6e7c1;border-left:4px solid #9a7412;padding:8px 12px;margin:10px 0}} .b{{font-size:10pt}}
</style></head><body>
<h1>TNNLU B.Com. LL.B. (Hons.) — Semester II Syllabus</h1><p class="sub">Reference syllabus · 22 November 2026 · Law Study Explorers, haivijayanand.github.io/llb/</p>
<div class="box"><b>How to use this.</b> This is a reference syllabus for the six Semester II courses listed in TNNLU's 2025 Admissions Brochure. TNNLU's own unit-wise outlines are issued by faculty each semester and are not published online. The units follow standard Indian law-university and B.Com. syllabi. When the official outline for a paper arrives, compare it with the matching section and mark what differs.</div>
<table><tr><th>#</th><th>Course</th><th>Type</th><th>Units</th></tr>{rows}</table>
<p>Each course has an interactive explorer with labs, animations, flashcards, a quiz, a progress bar and a certificate of completion (all units done and 70% or more in the mixed quiz).</p>
{secs}</body></html>"""

with sync_playwright() as p:
    b = p.chromium.launch(args=["--no-sandbox"])
    pg = b.new_page(); pg.set_content(doc); pg.wait_for_timeout(300)
    pg.pdf(path=str(OUT), format="A4", print_background=True, display_header_footer=True,
           header_template="<span></span>",
           footer_template='<div style="font-size:8pt;width:100%;text-align:center;color:#888">TNNLU B.Com. LL.B. (Hons.) — Semester II Syllabus · Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
           margin={"top": "16mm", "bottom": "18mm", "left": "16mm", "right": "16mm"})
    b.close()
print(OUT, OUT.stat().st_size)
