#!/usr/bin/env python3
"""
TOOL:    manufacturing/_src/build.py — builds the 30 day pages and the hub of the 30-Day Manufacturing Course from _src/week1-5.html
FAMILY:  manufacturing
VERSION: 1.1.0
DATE:    2026-11-21
CHAT:    Prepare a 30 days course on manufacturing aspects for engineers and managers (flexible packaging in mind, generic for all)
CHANGES: 1.1.0 - every page loads assets/js/site-theme.js (site-wide light / dark)
         1.0.0 - first version, adapted from machine-design/_src/build.py 1.0.0: manufacturing syllabus of 30 days in 5 weeks,
                 day pages with a flexible-packaging example box, worked example, lab and quiz; hub index.html
STATUS:  working
"""
import json, re, os, html
__version__ = "1.1.0"
HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.dirname(HERE)
DATE = "2026-11-17"
CHAT = "Prepare a 30 days course on manufacturing aspects for engineers and managers"
COURSE = "30-Day Manufacturing Course"
WEEKS = {
    1: ("Week 1 · The factory as a system", "Process types and the product–process matrix, value streams and takt time, capacity and OEE, bottlenecks and line balance, plant layout and material flow, manufacturing cost and break-even"),
    2: ("Week 2 · Planning and control", "Demand forecasting, S&amp;OP and MRP, scheduling and sequencing, inventory and EOQ, changeover reduction (SMED), WIP, Little's Law and Kanban"),
    3: ("Week 3 · Quality", "Quality systems and the cost of quality, SPC control charts, process capability, measurement systems and sampling, structured problem solving, PFMEA, control plans and poka-yoke"),
    4: ("Week 4 · Lean, maintenance, safety and people", "Waste and 5S, maintenance strategy and TPM, condition monitoring and the P–F curve, safety and risk assessment, work study and standard time, energy and utilities"),
    5: ("Week 5 · Supply, sustainability, digital and strategy", "Suppliers and purchasing, yield, scrap and sustainability, data and Industry 4.0, job costing and quoting, KPIs and capital investment, plant improvement capstone"),
}
SYL = [
    (1, "manufacturing-systems", "Manufacturing Systems and Process Types", "Product–process matrix"),
    (1, "value-stream", "Value Streams, Takt Time and Lead Time", "Value stream timeline"),
    (1, "capacity-oee", "Capacity and Overall Equipment Effectiveness (OEE)", "OEE loss waterfall"),
    (1, "bottlenecks", "Bottlenecks, Line Balancing and the Theory of Constraints", "Line flow simulator"),
    (1, "layout-flow", "Plant Layout and Material Flow", "From–to layout planner"),
    (1, "cost-breakeven", "Manufacturing Cost, Machine-Hour Rate and Break-even", "Break-even chart"),
    (2, "forecasting", "Demand Forecasting", "Forecast and error"),
    (2, "sop-mrp", "Sales & Operations Planning and MRP", "MRP explosion"),
    (2, "scheduling", "Scheduling and Sequencing", "Job sequencing Gantt"),
    (2, "inventory", "Inventory Management: EOQ, Safety Stock and ABC", "EOQ and reorder point"),
    (2, "smed", "Changeover Reduction (SMED) and Batch Size", "Changeover analyser"),
    (2, "wip-kanban", "Shop-Floor Control: WIP, Little's Law and Kanban", "Little's Law and Kanban"),
    (3, "quality-systems", "Quality Management Systems and the Cost of Quality", "Cost of quality model"),
    (3, "spc", "Statistical Process Control: Control Charts", "X̄–R chart simulator"),
    (3, "capability", "Process Capability: Cp, Cpk and PPM", "Capability study"),
    (3, "msa-sampling", "Measurement Systems and Acceptance Sampling", "OC curve of a sampling plan"),
    (3, "problem-solving", "Structured Problem Solving: Pareto, Fishbone, 5 Why and 8D", "Pareto chart"),
    (3, "fmea", "PFMEA, Control Plans and Poka-yoke", "PFMEA ranking"),
    (4, "lean-5s", "Lean Thinking, the Eight Wastes and 5S", "5S audit radar"),
    (4, "maintenance", "Maintenance Strategy, TPM, MTBF and MTTR", "Availability and downtime cost"),
    (4, "condition-monitoring", "Condition Monitoring and the P–F Curve", "P–F interval"),
    (4, "safety", "Safety, Hazards and Risk Assessment", "Risk matrix"),
    (4, "work-study", "Work Study, Standard Time and Manpower", "Standard time calculator"),
    (4, "energy-utilities", "Energy and Utilities", "Compressed-air leak cost"),
    (5, "supply-chain", "Suppliers, Purchasing and the Supply Chain", "Supplier scorecard"),
    (5, "yield-sustainability", "Yield, Scrap and Sustainability", "Yield cascade"),
    (5, "industry40", "Data, MES and Industry 4.0", "Live machine data"),
    (5, "costing-quoting", "Job Costing and Quoting", "Laminate cost and quote"),
    (5, "kpi-capex", "KPIs, Daily Management and Capital Investment", "NPV, IRR and payback"),
    (5, "capstone", "Capstone: Improve a Plant, Final Assessment and Certificate", "Exam + certificate"),
]
N = len(SYL)
def fn(n): return "day-%02d-%s.html" % (n, SYL[n - 1][1])
def tag(src, name):
    m = re.search(r"<%s>(.*?)</%s>" % (name, name), src, re.S); return m.group(1).strip() if m else ""
FONTS = '''<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/mf.css">'''
def header(file, what):
    return f'''<!DOCTYPE html>
<!--
TOOL:    manufacturing/{file} — {what}
FAMILY:  manufacturing
VERSION: {__version__}
DATE:    {DATE}
CHAT:    {CHAT}
CHANGES: {__version__} - generated by _src/build.py from the week sources
STATUS:  working
-->'''
TOOLBAR = '''<div class="toolbar">
  <a href="./">← All days</a>
  <button id="sbBtn" title="Show / hide contents (M)">☰ Contents</button>
  <button id="themeBtn" title="Light / dark (T)">◐ Theme</button>
  <button id="fsBtn" title="Full screen (F)">⤢ Full screen</button>
  <span class="sp"></span><span class="prog"></span>{extra}
</div>'''
DAYS_JS = "<script>window.SW_DAYS=" + json.dumps([[fn(i + 1), s[2]] for i, s in enumerate(SYL)], ensure_ascii=False) + ";</script>"
FOOT = '<footer>30-Day Manufacturing Course · K Vijay Anand · <a href="/">haivijayanand.github.io</a> · A learning resource: adapt the numbers to your own plant, data and the law that applies to you.</footer>'

def load_days():
    days = {}
    for w in range(1, 6):
        src = open(os.path.join(HERE, "week%d.html" % w), encoding="utf-8").read()
        for m in re.finditer(r'<day n="(\d+)">(.*?)</day>', src, re.S):
            days[int(m.group(1))] = m.group(2)
    return days

def number_h2(content):
    k = [0]
    def rep(m):
        k[0] += 1; return '<h2><span class="n">%d</span>' % (k[0] + 1)
    return re.sub(r"<h2>", rep, content)

def page(n, src):
    wk, slug, title, labname = SYL[n - 1]
    summary = tag(src, "summary"); goals = tag(src, "goals"); content = tag(src, "content"); quiz = tag(src, "quiz")
    qdata = json.loads(quiz) if quiz else []
    prev_ = '<a class="pv" href="%s"><small>← Day %d</small>%s</a>' % (fn(n - 1), n - 1, html.escape(SYL[n - 2][2])) if n > 1 else '<a class="pv" href="./"><small>← Course home</small>All days</a>'
    next_ = '<a class="nx" href="%s"><small>Day %d →</small>%s</a>' % (fn(n + 1), n + 1, html.escape(SYL[n][2])) if n < N else '<a class="nx" href="./"><small>Course home →</small>All days</a>'
    nav = ''
    if n > 1: nav += '<a href="%s" title="Previous day ([)">◀ Day %d</a>' % (fn(n - 1), n - 1)
    if n < N: nav += '<a href="%s" title="Next day (])">Day %d ▶</a>' % (fn(n + 1), n + 1)
    quiz_html = ''
    if qdata:
        quiz_html = '<section id="quiz"><h2><span class="n">%d</span>Quick quiz</h2><p>%d questions. Click an answer — you get the explanation straight away.</p><div class="quizbox" data-src="quiz-data"></div><script type="application/json" id="quiz-data">%s</script></section>' % (content.count("<h2>") + 2, len(qdata), json.dumps(qdata, ensure_ascii=False))
    out = header(fn(n), "Manufacturing Course, Day %02d: %s" % (n, title)) + f'''
<html lang="en" data-theme="light">
<head>
<script src="/assets/js/site-theme.js"></script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Day {n}: {html.escape(title)} — Manufacturing Course — K Vijay Anand</title>
<meta name="description" content="{html.escape(re.sub('<[^>]+>', '', summary))}">
{FONTS}
  <script type="module" src="/assets/js/site-progress.js"></script>
</head>
<body data-day="{n}">
{TOOLBAR.format(extra=nav)}
<header class="hero">
  <div class="series">{COURSE} · {WEEKS[wk][0].split(' · ')[0]} · Day {n:02d}</div>
  <h1>{html.escape(title)}</h1>
  <p>{summary}</p>
  <div class="meta"><span>⏱ about 2–3 hours</span><span>🧪 Lab: {html.escape(labname)}</span>{'<span>❓ ' + str(len(qdata)) + '-question quiz</span>' if qdata else '<span>🎓 Final assessment</span>'}</div>
</header>
<div class="wrap">
<aside id="toc"></aside>
<main>
<section id="goals"><h2><span class="n">1</span>Today's goals</h2><ul class="goals">{goals}</ul></section>
{number_h2(content)}
{quiz_html}
<div class="donebar"><button>Mark Day {n} as complete</button><span class="hint">Progress is kept in this browser (and in your account when signed in).</span></div>
<div class="pager">{prev_}{next_}</div>
</main>
</div>
{FOOT}
{DAYS_JS}
<script src="assets/mf.js"></script>
</body>
</html>
'''
    return out

def hub():
    weeks = ''
    for w in range(1, 6):
        cards = ''.join(f'<a class="dcard" data-day="{i + 1}" href="{fn(i + 1)}"><div class="no">Day {i + 1:02d}</div><b>{html.escape(s[2])}</b><span>🧪 {html.escape(s[3])}</span></a>' for i, s in enumerate(SYL) if s[0] == w)
        weeks += f'<div class="week"><h2>{WEEKS[w][0]}</h2><p>{WEEKS[w][1]}</p><div class="dgrid">{cards}</div></div>'
    return header("index.html", COURSE + ": hub page with schedule and progress") + f'''
<html lang="en" data-theme="light">
<head>
<script src="/assets/js/site-theme.js"></script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{COURSE} — interactive — K Vijay Anand</title>
<meta name="description" content="A free manufacturing course in 30 days for engineers and managers: process types, value streams, OEE, bottlenecks, layout, cost and break-even, forecasting, MRP, scheduling, inventory, SMED, Kanban, quality systems, SPC, capability, MSA, problem solving, FMEA, lean and 5S, TPM, condition monitoring, safety, work study, energy, suppliers, yield and sustainability, Industry 4.0, job costing, KPIs and capital investment — with a live lab and quiz every day and a flexible-packaging example throughout.">
{FONTS}
  <script type="module" src="/assets/js/site-progress.js"></script>
</head>
<body>
{TOOLBAR.format(extra='')}
<header class="hero">
  <div class="series">Free · interactive · five weeks</div>
  <h1>{COURSE}</h1>
  <p>How a factory really works — and how to make it work better. Written for engineers who run lines and managers who run plants, the course moves from the factory as a system to planning, quality, lean, maintenance, safety, people, energy, suppliers, sustainability, data, costing and investment. Every day explains the idea, gives the formula or method, shows it on a <b>flexible packaging plant</b> (extrusion, printing, lamination, slitting and bag making) and on other industries, works an example, and lets you experiment in a live lab. Day 30 is a plant-improvement capstone, a final assessment and a certificate.</p>
  <div class="meta"><span>30 days · ≈ 2–3 h each</span><span>30 interactive labs</span><span>145 quiz questions + 20-question final exam</span><span>For engineers and managers · any industry</span></div>
</header>
<div class="hubw">
<div id="hubprog"></div>
<div class="cols" style="margin-top:18px">
<div class="box"><b class="t">How each day works</b>1 Read the idea and why it matters · 2 Learn the method or formula · 3 See it in a flexible packaging plant and elsewhere · 4 Follow the worked example · 5 Experiment in the lab · 6 Try it on your own plant · 7 Take the quiz and mark the day complete.</div>
<div class="box"><b class="t">Who it is for</b>Graduate and diploma engineers in production, quality, maintenance, planning and projects; supervisors moving into management; and managers and owners who want the engineering behind the numbers. School arithmetic and a spreadsheet are enough — every formula is explained.</div>
<div class="box"><b class="t">Keyboard</b><kbd>M</kbd> contents · <kbd>F</kbd> full screen · <kbd>T</kbd> light/dark · <kbd>P</kbd> play · <kbd>S</kbd> step · <kbd>X</kbd> pause · <kbd>[</kbd> <kbd>]</kbd> previous / next day.</div>
<div class="box"><b class="t">The running example</b>A mid-sized flexible packaging plant: blown-film extrusion, flexo and rotogravure printing, solvent-less and solvent-based lamination, slitting and pouch / bag making. Each day also gives examples from machining, assembly, food and process plants, so the method carries over to any factory.</div>
</div>
{weeks}
<p style="margin-top:30px" class="hint">Your progress, ticks and quiz scores are stored in this browser. <button class="btn" onclick="SW.resetProgress()">Reset my progress</button></p>
</div>
{FOOT}
{DAYS_JS}
<script src="assets/mf.js"></script>
</body>
</html>
'''

if __name__ == "__main__":
    days = load_days()
    assert sorted(days) == list(range(1, N + 1)), sorted(days)
    for n in range(1, N + 1):
        open(os.path.join(OUT, fn(n)), "w", encoding="utf-8").write(page(n, days[n]))
    open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(hub())
    print("built %d days + index" % N)
