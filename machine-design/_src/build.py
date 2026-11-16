#!/usr/bin/env python3
"""
TOOL:    machine-design/_src/build.py — builds the 30 day pages and the hub of the 30-Day Machine Design Course from _src/week1-5.html
FAMILY:  machine-design
VERSION: 1.0.0
DATE:    2026-11-16
CHAT:    create an interactive html study for mechanical machine design in 30 days
CHANGES: 1.0.0 - first version, adapted from creo/_src/build.py 1.1.0: machine-design syllabus of 30 days in 5 weeks,
                 day pages with formula, worked-example, materials and cost sections; hub index.html
STATUS:  working
"""
import json, re, os, html
__version__ = "1.0.0"
HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.dirname(HERE)
DATE = "2026-11-16"
CHAT = "create an interactive html study for mechanical machine design in 30 days"
COURSE = "30-Day Machine Design Course"
WEEKS = {
    1: ("Week 1 · Foundations", "The design process and standards, preferred numbers, materials and their designations, manufacturing and cost, stresses and Mohr's circle, theories of failure, stress concentration"),
    2: ("Week 2 · Fatigue, fits and joints", "S–N curves and endurance limit, Goodman and Soderberg, ISO limits and fits, bolted joints and preload, welded and riveted joints, power screws"),
    3: ("Week 3 · Shafts, springs, clutches and brakes", "Shafts for strength and rigidity, critical speed, keys and couplings, helical springs, friction clutches, brakes and heat"),
    4: ("Week 4 · Belts, chains and gears", "Flat and V-belts, roller chains and wire ropes, involute geometry and contact ratio, spur gear bending and pitting, helical and bevel gears, worm gears"),
    5: ("Week 5 · Bearings, vessels, flywheels and the whole machine", "Rolling bearings and L10 life, journal bearings and lubrication, thick cylinders and press fits, flywheels, reliability and life-cycle cost, gearbox capstone"),
}
SYL = [
    (1, "design-process", "The Design Process, Standards and Preferred Numbers", "Preferred-number series"),
    (1, "materials", "Engineering Materials and Their Designations", "Material selection chart"),
    (1, "manufacturing-cost", "Manufacturing, Tolerances and the Cost of a Part", "Part cost estimator"),
    (1, "stresses", "Simple and Combined Stresses, Mohr's Circle", "Mohr's circle"),
    (1, "failure-theories", "Theories of Failure and Factor of Safety", "Failure envelopes"),
    (1, "stress-concentration", "Stress Concentration and Notch Sensitivity", "Kt of a stepped shaft"),
    (2, "fatigue", "Fatigue: S–N Curve and Endurance Limit", "Marin factors and S–N curve"),
    (2, "fluctuating", "Fluctuating Stresses: Goodman, Soderberg and Gerber", "Fatigue diagram"),
    (2, "fits", "Limits, Fits, Tolerances and Surface Finish", "ISO 286 fit calculator"),
    (2, "bolted-joints", "Threaded Fasteners and Bolted Joints", "Bolted-joint diagram"),
    (2, "welded-riveted", "Welded and Riveted Joints", "Eccentric fillet weld"),
    (2, "power-screws", "Power Screws and Screw Jacks", "Screw efficiency and self-locking"),
    (3, "shafts", "Shaft Design for Strength", "Shaft diameter calculator"),
    (3, "critical-speed", "Shaft Deflection, Rigidity and Critical Speed", "Dunkerley and Rayleigh"),
    (3, "keys-couplings", "Keys, Splines and Couplings", "Key and flange coupling check"),
    (3, "springs", "Helical Springs", "Spring designer"),
    (3, "clutches", "Friction Clutches", "Plate and cone clutch"),
    (3, "brakes", "Brakes and Heat Dissipation", "Band and block brakes"),
    (4, "belts", "Flat and V-Belt Drives", "Belt power vs speed"),
    (4, "chains-ropes", "Chain Drives and Wire Ropes", "Chain length and polygon effect"),
    (4, "gear-geometry", "Gear Geometry: Involute, Module and Contact Ratio", "Involute and contact ratio"),
    (4, "spur-gears", "Spur Gear Strength: Bending and Pitting", "Lewis, Buckingham and wear"),
    (4, "helical-bevel", "Helical and Bevel Gears", "Gear force resolver"),
    (4, "worm-gears", "Worm Gears: Efficiency and Heat", "Worm efficiency and heat"),
    (5, "rolling-bearings", "Rolling Contact Bearings: Selection and Life", "L10 life calculator"),
    (5, "journal-bearings", "Sliding Bearings and Lubrication", "Petroff, Sommerfeld and viscosity"),
    (5, "cylinders", "Thin and Thick Cylinders, Press and Shrink Fits", "Lamé stresses and press fit"),
    (5, "flywheels", "Flywheels and Energy Fluctuation", "Flywheel sizing"),
    (5, "reliability-cost", "Reliability, DFMA and Life-Cycle Cost", "Reliability and cost of ownership"),
    (5, "capstone", "Capstone: Design a Gearbox, Final Assessment and Certificate", "Exam + certificate"),
]
N = len(SYL)
def fn(n): return "day-%02d-%s.html" % (n, SYL[n - 1][1])
def tag(src, name):
    m = re.search(r"<%s>(.*?)</%s>" % (name, name), src, re.S); return m.group(1).strip() if m else ""
FONTS = '''<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/md.css">'''
def header(file, what):
    return f'''<!DOCTYPE html>
<!--
TOOL:    machine-design/{file} — {what}
FAMILY:  machine-design
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
FOOT = '<footer>30-Day Machine Design Course · K Vijay Anand · <a href="/">haivijayanand.github.io</a> · A learning resource: check every design against the current standard and your company\'s design data before use.</footer>'

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
    out = header(fn(n), "Machine Design Course, Day %02d: %s" % (n, title)) + f'''
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Day {n}: {html.escape(title)} — Machine Design Course — K Vijay Anand</title>
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
<script src="assets/md.js"></script>
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
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{COURSE} — interactive — K Vijay Anand</title>
<meta name="description" content="A free machine design course in 30 days: design process and standards, materials, cost, stresses, failure theories, fatigue, fits, bolted, welded and riveted joints, power screws, shafts, critical speed, keys, couplings, springs, clutches, brakes, belts, chains, gears, bearings, lubrication, cylinders, flywheels, reliability and a gearbox capstone — with a calculator lab and quiz every day.">
{FONTS}
  <script type="module" src="/assets/js/site-progress.js"></script>
</head>
<body>
{TOOLBAR.format(extra='')}
<header class="hero">
  <div class="series">Free · interactive · five weeks</div>
  <h1>{COURSE}</h1>
  <p>Design of machine elements from first principles to a complete gearbox. Each day takes one family of elements and works through how it fails, the design criteria and formulas, the materials that suit it, what drives its cost, a worked example, a step-by-step design procedure, a live calculator or plot to experiment with, a practice problem and a quiz. Day 30 ends with a two-stage gearbox capstone, a final assessment and a certificate.</p>
  <div class="meta"><span>30 days · ≈ 2–3 h each</span><span>30 interactive labs</span><span>145 quiz questions + 20-question final exam</span><span>SI units · IS / ISO standards</span></div>
</header>
<div class="hubw">
<div id="hubprog"></div>
<div class="cols" style="margin-top:18px">
<div class="box"><b class="t">How each day works</b>1 Read how the element works and fails · 2 Learn the design criteria and formulas · 3 Choose materials and see the cost drivers · 4 Follow the worked example · 5 Play with the lab · 6 Solve the practice problem · 7 Take the quiz and mark the day complete.</div>
<div class="box"><b class="t">What you need</b>Strength of materials and engineering mechanics at diploma or B.E. level, a calculator, and a design data book (PSG Design Data or V B Bhandari's tables are the usual ones in India). Shigley, Bhandari and Norton are the textbooks the methods follow.</div>
<div class="box"><b class="t">Keyboard</b><kbd>M</kbd> contents · <kbd>F</kbd> full screen · <kbd>T</kbd> light/dark · <kbd>P</kbd> play · <kbd>S</kbd> step · <kbd>X</kbd> pause · <kbd>[</kbd> <kbd>]</kbd> previous / next day.</div>
<div class="box"><b class="t">Units and standards</b>SI throughout: N, mm, MPa (N/mm²), kW, rpm. Indian (IS) and ISO standards are named where they apply; AGMA and ASME are mentioned where they are the common reference.</div>
</div>
{weeks}
<p style="margin-top:30px" class="hint">Your progress, ticks and quiz scores are stored in this browser. <button class="btn" onclick="SW.resetProgress()">Reset my progress</button></p>
</div>
{FOOT}
{DAYS_JS}
<script src="assets/md.js"></script>
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
