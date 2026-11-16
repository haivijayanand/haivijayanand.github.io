#!/usr/bin/env python3
"""
TOOL:    solidworks/_src/build.py — builds the 42 day pages (Part I days 1–28, Part II days 29–42) and the hub of the SolidWorks Course from _src/week1-6.html
FAMILY:  solidworks
VERSION: 1.2.0
DATE:    2026-11-16
CHAT:    28-day SolidWorks course with interactive HTML on GitHub Pages
CHANGES: 1.2.0 - every page loads assets/js/site-progress.js (sign-in, reading progress, activity log)
         1.1.0 - Part II (Days 29–42, weeks 5–6) added; hub shows Part I and Part II
         1.0.0 - syllabus of 28 days in 4 weeks; wraps day sources with header block, toolbar, hero, contents,
                 goals, numbered sections, quiz, done button, pager and footer; writes hub index.html
STATUS:  working
"""
import json, re, os, html
__version__ = "1.2.0"
HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.dirname(HERE)
DATE = "2026-11-16"
CHAT = "28-day SolidWorks course with interactive HTML on GitHub Pages"
WEEKS = {
    1: ("Week 1 · Sketching and basic part modelling", "Interface, sketches, relations, extrude, revolve, fillets and shells, patterns"),
    2: ("Week 2 · Advanced part modelling", "Reference geometry, sweeps, lofts, Hole Wizard, equations, configurations, mass properties"),
    3: ("Week 3 · Moulded parts, assemblies and sheet metal", "Draft and ribs, mates, mechanical mates, Toolbox, top-down design, motion, sheet metal"),
    4: ("Week 4 · Drawings, weldments, surfaces and simulation", "Drawings, GD&T, BOMs, weldments, surfaces, SimulationXpress and the capstone project"),
    5: ("Week 5 · Automation, data and control", "API macros, AI-drafted macros, DriveWorksXpress, PDM, revision logs, file exchange, large assemblies"),
    6: ("Week 6 · Documentation and delivery", "MBD and stack-ups, Costing, AI-assisted design reports, test reports and RFQs, rendering, Part II capstone"),
}
SYL = [
    (1, "interface", "Getting Started: Interface, Files and Navigation", "Explore the window"),
    (1, "sketching", "Sketching Fundamentals and Sketch States", "Degrees of freedom"),
    (1, "relations", "Sketch Relations and Smart Dimensions", "Relation playground"),
    (1, "extrude", "Extruded Boss and Cut: End Conditions", "3D end conditions"),
    (1, "revolve", "Revolved Features and Lathe Parts", "3D revolve + Pappus"),
    (1, "fillet-shell", "Fillets, Chamfers and Shell", "Fillet vs chamfer, 3D shell"),
    (1, "patterns", "Patterns and Mirror", "Pattern builder"),
    (2, "reference-geometry", "Reference Geometry: Planes, Axes, Points", "3D reference planes"),
    (2, "sweep", "Swept Features, Helix and Springs", "3D sweep"),
    (2, "loft", "Lofted Features and Transitions", "3D loft"),
    (2, "hole-wizard", "Hole Wizard, Threads and Cosmetic Threads", "Hole sizes and sections"),
    (2, "equations", "Design Intent, Equations and Global Variables", "Live equation editor"),
    (2, "configurations", "Configurations and Design Tables", "Design table"),
    (2, "mass-properties", "Materials, Appearances and Mass Properties", "Mass calculator"),
    (3, "draft-ribs", "Draft, Ribs and Moulded-Part Design", "Draft analysis"),
    (3, "assembly-mates", "Assembly Basics and Standard Mates", "3D mates and DOF"),
    (3, "mechanical-mates", "Advanced and Mechanical Mates", "Gear mate animation"),
    (3, "toolbox", "Toolbox, Bearings and Smart Fasteners", "Bolt length"),
    (3, "top-down", "Top-Down Design: In-Context, Layouts and Skeletons", "Skeleton-driven parts"),
    (3, "explode-motion", "Interference, Exploded Views and Motion Studies", "3D exploded view"),
    (3, "sheet-metal", "Sheet Metal: Flanges, Bends and Flat Patterns", "Flat length calculator"),
    (4, "drawings", "Drawing Templates, Sheet Formats and Views", "First vs third angle"),
    (4, "gdt", "Dimensions, Tolerances and GD&T", "Feature control frames"),
    (4, "bom", "BOMs, Balloons, Revision and Other Tables", "Three BOM types"),
    (4, "weldments", "Weldments and Cut Lists", "Cut list"),
    (4, "surfaces", "Surface Modelling and Continuity", "G0 / G1 / G2 combs"),
    (4, "simulation", "SimulationXpress and FEA Thinking", "Cantilever + convergence"),
    (4, "capstone", "Capstone Project, Final Assessment and Certificate", "Exam + certificate"),
    (5, "api-macros", "SolidWorks API and VBA Macros", "Macro generator"),
    (5, "ai-macros", "Drafting Macros with an AI Assistant", "Bug hunt"),
    (5, "driveworksxpress", "DriveWorksXpress and Design Checker", "Rules engine"),
    (5, "pdm", "PDM: Vaults, Versions, Workflows and Revisions", "Workflow simulator"),
    (5, "revision-logs", "Revision Logs and ECNs with AI Help", "Revision log builder"),
    (5, "import-formats", "Import, Repair and File Formats", "Format chooser"),
    (5, "large-assemblies", "Large Assemblies and Performance", "Which open mode?"),
    (6, "mbd-stackup", "Model-Based Definition and Tolerance Stack-Ups", "Stack-up calculator"),
    (6, "costing", "Costing and Design for Cost", "Cost estimator"),
    (6, "ai-reports", "Engineering Reports with AI Help", "Number checker"),
    (6, "ai-test-reports", "Test Reports from Logged Data", "Test data to report"),
    (6, "ai-rfq", "Supplier RFQs from the BOM", "RFQ builder"),
    (6, "rendering", "Rendering, Visualize and eDrawings", "Lighting lab"),
    (6, "capstone-2", "Part II Capstone, Assessment and Certificate", "Exam + certificate"),
]
N = len(SYL)
def fn(n): return "day-%02d-%s.html" % (n, SYL[n - 1][1])
def tag(src, name):
    m = re.search(r"<%s>(.*?)</%s>" % (name, name), src, re.S); return m.group(1).strip() if m else ""
FONTS = '''<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/sw.css">'''
def header(file, what):
    return f'''<!DOCTYPE html>
<!--
TOOL:    solidworks/{file} — {what}
FAMILY:  solidworks
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
FOOT = '<footer>28-Day SolidWorks Course · K Vijay Anand · <a href="/">haivijayanand.github.io</a> · SOLIDWORKS is a trademark of Dassault Systèmes; this is an independent learning resource.</footer>'

def load_days():
    days = {}
    for w in range(1, 7):
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
        quiz_html = '<section id="quiz"><h2><span class="n">%d</span>Quick quiz</h2><p>Five questions. Click an answer — you get the explanation straight away.</p><div class="quizbox" data-src="quiz-data"></div><script type="application/json" id="quiz-data">%s</script></section>' % (content.count("<h2>") + 2, json.dumps(qdata, ensure_ascii=False))
    out = header(fn(n), "SolidWorks Course, Day %02d: %s" % (n, title)) + f'''
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Day {n}: {html.escape(title)} — SolidWorks Course — K Vijay Anand</title>
<meta name="description" content="{html.escape(re.sub('<[^>]+>', '', summary))}">
{FONTS}
  <script type="module" src="/assets/js/site-progress.js"></script>
</head>
<body data-day="{n}">
{TOOLBAR.format(extra=nav)}
<header class="hero">
  <div class="series">{'28-Day SolidWorks Course' if n <= 28 else 'SolidWorks Course Part II'} · {WEEKS[wk][0].split(' · ')[0]} · Day {n:02d}</div>
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
<div class="donebar"><button>Mark Day {n} as complete</button><span class="hint">Progress is kept in this browser only.</span></div>
<div class="pager">{prev_}{next_}</div>
</main>
</div>
{FOOT}
{DAYS_JS}
<script src="assets/sw.js"></script>
</body>
</html>
'''
    return out

def hub():
    weeks = ''
    for w in range(1, 7):
        if w == 1: weeks += '<div class="part"><h2>Part I · 28 days of SolidWorks</h2><p>Sketching to simulation — parts, assemblies, drawings, sheet metal, weldments, surfaces.</p></div>'
        if w == 5: weeks += '<div class="part"><h2>Part II · Documentation and automation (14 days)</h2><p>The SolidWorks topics Part I left out, mixed with AI-assisted engineering documentation: macros, PDM, revisions, data exchange, large assemblies, MBD, costing, reports, test reports, RFQs and rendering.</p></div>'
        cards = ''.join(f'<a class="dcard" data-day="{i + 1}" href="{fn(i + 1)}"><div class="no">Day {i + 1:02d}</div><b>{html.escape(s[2])}</b><span>🧪 {html.escape(s[3])}</span></a>' for i, s in enumerate(SYL) if s[0] == w)
        weeks += f'<div class="week"><h2>{WEEKS[w][0]}</h2><p>{WEEKS[w][1]}</p><div class="dgrid">{cards}</div></div>'
    return header("index.html", "28-Day SolidWorks Course: hub page with schedule and progress") + f'''
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SolidWorks Course: 28 days + Part II — interactive — K Vijay Anand</title>
<meta name="description" content="A free SolidWorks course: 28 days of sketching, part modelling, assemblies, drawings, sheet metal, weldments, surfaces and simulation, plus a 14-day Part II on macros, PDM, data exchange, MBD, costing and AI-assisted engineering documentation — a lab, exercise and quiz every day.">
{FONTS}
  <script type="module" src="/assets/js/site-progress.js"></script>
</head>
<body>
{TOOLBAR.format(extra='')}
<header class="hero">
  <div class="series">Free · interactive · Part I 28 days + Part II 14 days</div>
  <h1>SolidWorks Course</h1>
  <p>From your first sketch to drawings, assemblies, sheet metal, weldments, surfaces and simulation. Every day has a clear goal, step-by-step work to do in SolidWorks, an interactive lab — most of them in 3D — pro tips, a practice part and a quiz. Day 28 ends with a capstone project, a final assessment and a certificate. Part II adds 14 days on automation and documentation, including using an AI assistant safely for macros, change notices, reports, test reports and RFQs.</p>
  <div class="meta"><span>42 days · ≈ 2–3 h each</span><span>42 interactive labs</span><span>200 quiz questions + two final exams</span><span>works offline once loaded</span></div>
</header>
<div class="hubw">
<div id="hubprog"></div>
<div class="cols" style="margin-top:18px">
<div class="box"><b class="t">How each day works</b>1 Read the idea · 2 Do the steps in SolidWorks (click a step to tick it) · 3 Play with the lab · 4 Read the tips · 5 Make the practice part · 6 Take the quiz · 7 Mark the day complete.</div>
<div class="box"><b class="t">What you need</b>SolidWorks 2020 or newer (any edition for Weeks 1–2 and most of 3–4). Toolbox needs Professional or Premium; Motion Analysis and full Simulation need Premium or Simulation licences — SimulationXpress is in every edition.</div>
<div class="box"><b class="t">Keyboard</b><kbd>M</kbd> contents · <kbd>F</kbd> full screen · <kbd>T</kbd> light/dark · <kbd>P</kbd> play · <kbd>S</kbd> step · <kbd>X</kbd> pause · <kbd>[</kbd> <kbd>]</kbd> previous / next day. In 3D labs: drag to rotate, wheel to zoom, double-click to reset.</div>
<div class="box"><b class="t">Units and standards</b>Millimetres (MMGS), ISO standards and first-angle projection as used in India — third angle is covered too. Menu paths follow recent SolidWorks releases; older ones may differ slightly.</div>
</div>
{weeks}
<p style="margin-top:30px" class="hint">Your progress, ticks and quiz scores are stored only in this browser. <button class="btn" onclick="SW.resetProgress()">Reset my progress</button></p>
</div>
{FOOT}
{DAYS_JS}
<script src="assets/sw.js"></script>
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
