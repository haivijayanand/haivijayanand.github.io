#!/usr/bin/env python3
"""
TOOL:    tally/_src/build.py — builds the 30 day pages and the hub of the 30-Day TallyPrime Course from _src/week1-5.html
FAMILY:  tally
VERSION: 1.1.0
DATE:    2026-11-28
CHAT:    Learn Tally in 30 days — design a Tally accounting software course for GitHub
CHANGES: 1.1.0 - company chooser on the hub (four profiles + own firm name), company chip on every day page, loads assets/tl-profiles.js
         1.0.0 - first version, adapted from manufacturing/_src/build.py 1.1.0: TallyPrime syllabus of 30 days in 5 weeks for beginners,
                 running case Avani Gearworks Pvt Ltd (a gearbox manufacturer), Practice Desk voucher simulator, quiz every day; hub index.html
STATUS:  working
"""
import json, re, os, html
__version__ = "1.1.0"
HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.dirname(HERE)
DATE = "2026-11-28"
CHAT = "Learn Tally in 30 days — design a Tally accounting software course for GitHub"
COURSE = "30-Day TallyPrime Course"
WEEKS = {
    1: ("Week 1 · Foundations", "What accounting is, double entry and the golden rules, journal → ledger → trial balance, installing TallyPrime and finding your way, creating the company, groups and ledgers"),
    2: ("Week 2 · Vouchers", "Contra, Payment, Receipt and Journal vouchers, Purchase and Sales, Debit and Credit Notes with bill-wise details, banking and bank reconciliation"),
    3: ("Week 3 · Inventory and manufacturing", "Stock groups, units, godowns and items, item invoices, order processing, bill of materials and the manufacturing journal, job work and transfers, stock valuation"),
    4: ("Week 4 · Costing, GST, TDS and payroll", "Cost centres and budgets, GST concepts, GST in TallyPrime, GST returns and ITC set-off, e-invoice and e-way bill, TDS under the Income-tax Act 2025, payroll with PF and ESI"),
    5: ("Week 5 · Reports, control and year-end", "Final accounts, MIS and ratio analysis, interest and foreign currency, security, edit log and backup, year-end closing, a month-end capstone, final assessment and certificate"),
}
SYL = [
    (1, "accounting-basics", "What Accounting Is — and Meet Avani Gearworks", "Transaction sorter"),
    (1, "golden-rules", "Double Entry and the Golden Rules", "Golden rules trainer"),
    (1, "journal-ledger", "Journal, Ledger and Trial Balance", "Posting to T-accounts"),
    (1, "tallyprime-tour", "Installing TallyPrime and Finding Your Way", "Shortcut drill"),
    (1, "company", "Creating the Company: Features (F11) and Configuration (F12)", "Company creation form"),
    (1, "groups-ledgers", "Groups and Ledgers", "Ledger-to-group sorter"),
    (2, "contra", "Vouchers and the Contra Voucher (F4)", "Practice Desk: contra"),
    (2, "payment-receipt", "Payment (F5) and Receipt (F6) Vouchers", "Practice Desk: payments and receipts"),
    (2, "journal", "Journal Voucher (F7): Adjustments and Non-cash Entries", "Practice Desk: journals"),
    (2, "purchase-sales", "Purchase (F9) and Sales (F8) in Accounting Mode", "Practice Desk: purchase and sales"),
    (2, "notes-billwise", "Debit and Credit Notes, Bill-wise Details and Outstandings", "Ageing of receivables"),
    (2, "banking", "Banking: Cheques, Reconciliation and Connected Banking", "Bank reconciliation"),
    (3, "inventory-masters", "Inventory Masters: Stock Groups, Units, Godowns and Items", "Stock group sorter + item creation"),
    (3, "item-invoice", "Purchase and Sales with Inventory (Item Invoice)", "Practice Desk: item invoices"),
    (3, "orders", "Order Processing: Purchase and Sales Orders, Receipt and Delivery Notes", "Order-to-invoice flow"),
    (3, "bom-manufacturing", "Bill of Materials and the Manufacturing Journal", "BOM cost roll-up"),
    (3, "job-work-transfers", "Job Work, Stock Transfers and Physical Stock", "Practice Desk: inventory vouchers"),
    (3, "stock-valuation", "Batches, Price Lists, Reorder Levels and Stock Valuation", "FIFO vs average cost"),
    (4, "cost-centres", "Cost Centres, Cost Categories and Budgets", "Cost-centre allocation"),
    (4, "gst-concepts", "GST Concepts for a Manufacturer", "GST calculator + GSTIN decoder"),
    (4, "gst-tallyprime", "GST in TallyPrime: Setup and GST Invoices", "Practice Desk: GST invoices"),
    (4, "gst-returns", "GST Returns, Reverse Charge, ITC Set-off, E-invoice and E-way Bill", "ITC set-off"),
    (4, "tds-tcs", "TDS and TCS in TallyPrime", "TDS calculator"),
    (4, "payroll", "Payroll: Employees, Pay Heads, PF, ESI and Salary", "Salary and payroll voucher"),
    (5, "final-accounts", "Trial Balance, Profit & Loss and Balance Sheet", "Final accounts builder"),
    (5, "mis-ratios", "MIS Reports and Ratio Analysis", "Ratio dashboard"),
    (5, "interest-forex", "Interest Calculation, Credit Limits and Foreign Currency", "Interest on overdue bills"),
    (5, "security-data", "Security, Edit Log, Backup and Data Exchange", "Flash cards"),
    (5, "year-end", "Year-end Closing: Depreciation, Provisions and the New Year", "SLM vs WDV depreciation"),
    (5, "capstone", "Capstone: A Month at Avani Gearworks, Final Assessment and Certificate", "Exam + certificate"),
]
N = len(SYL)
def fn(n): return "day-%02d-%s.html" % (n, SYL[n - 1][1])
def tag(src, name):
    m = re.search(r"<%s>(.*?)</%s>" % (name, name), src, re.S); return m.group(1).strip() if m else ""
FONTS = '''<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/tl.css">'''
def header(file, what):
    return f'''<!DOCTYPE html>
<!--
TOOL:    tally/{file} — {what}
FAMILY:  tally
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
FOOT = '<footer>30-Day TallyPrime Course · K Vijay Anand · <a href="/">haivijayanand.github.io</a> · An independent learning resource, not affiliated with Tally Solutions. TallyPrime is a trademark of its owner. Tax rates and limits change — confirm them against current law before you file.</footer>'

def load_days():
    days = {}
    for w in range(1, 6):
        p = os.path.join(HERE, "week%d.html" % w)
        if not os.path.exists(p): continue
        src = open(p, encoding="utf-8").read()
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
    out = header(fn(n), "TallyPrime Course, Day %02d: %s" % (n, title)) + f'''
<html lang="en" data-theme="light">
<head>
<script src="/assets/js/site-theme.js"></script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Day {n}: {html.escape(title)} — TallyPrime Course — K Vijay Anand</title>
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
  <div class="meta"><span>⏱ about 2 hours</span><span>🧪 Lab: {html.escape(labname)}</span>{'<span>❓ ' + str(len(qdata)) + '-question quiz</span>' if qdata else '<span>🎓 Final assessment</span>'}<span class="pfchip"></span></div>
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
<script src="assets/tl-profiles.js"></script>
<script src="assets/tl.js"></script>
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
<title>{COURSE} — learn Tally accounting from zero — K Vijay Anand</title>
<meta name="description" content="A free 30-day TallyPrime course for beginners: accounting basics and the golden rules, company creation, groups and ledgers, all voucher types, bill-wise details, bank reconciliation, inventory, orders, bill of materials and manufacturing journal, job work, stock valuation, cost centres, GST, e-invoice and e-way bill, TDS, payroll, final accounts, ratios, security and year-end — with a keyboard voucher simulator and a quiz every day, built around a fictional gearbox manufacturer.">
{FONTS}
  <script type="module" src="/assets/js/site-progress.js"></script>
</head>
<body>
{TOOLBAR.format(extra='')}
<header class="hero">
  <div class="series">Free · interactive · five weeks · for complete beginners</div>
  <h1>{COURSE}</h1>
  <p>Learn accounting and TallyPrime together, from your first transaction to the Balance Sheet. No accounting background is assumed: Week 1 teaches the ideas behind every entry, then each day adds one part of TallyPrime and practises it on the books of <b>Avani Gearworks Pvt Ltd</b>, a small gearbox manufacturer in Chennai — buying steel, castings and bearings, machining and assembling gearboxes, sending gears out for heat treatment, selling across states with GST, paying wages and closing the year. The <b>Practice Desk</b> on most days is a keyboard voucher simulator in your browser that checks every entry; each day also gives the same entries to make in real TallyPrime in its free Educational mode.</p>
  <div class="meta"><span>30 days · ≈ 2 h each</span><span>Practice Desk voucher simulator</span><span>290 quiz questions + 20-question final exam</span><span>TallyPrime 7.x · GST · TDS · payroll</span></div>
</header>
<div class="hubw">
<div id="hubprog"></div>
<div id="company" class="pfpick">
<h2>Choose the company whose books you will keep</h2>
<p class="hint">Pick the kind of firm closest to yours. Every day's examples, Practice Desk entries, items, parties, bill of materials, GSTIN and state switch to it — the accounting and every rupee amount stay the same, so the course works identically for all of them. You can change it any time; your desk entries are kept separately for each company.</p>
<div id="pfgrid" class="pfgrid"></div>
<p class="hint" style="margin-top:12px"><label>Or use your own firm's name for the chosen profile: <input id="pfname" type="text" placeholder="e.g. Sri Balaji Packaging Pvt Ltd" style="min-width:280px"></label> <button type="button" id="pfnameBtn" class="btn">Apply name</button> <span>(leave empty and Apply to go back to the profile's name)</span></p>
</div>
<div class="cols" style="margin-top:18px">
<div class="box"><b class="t">How each day works</b>1 Read the idea in plain words · 2 See it in Avani Gearworks' books · 3 Follow the TallyPrime steps · 4 Practise in the lab or the Practice Desk · 5 Repeat the entries in your own TallyPrime · 6 Take the 10-question quiz and mark the day complete.</div>
<div class="box"><b class="t">What you need</b>A Windows PC with TallyPrime installed (free download; without a licence it runs in <b>Educational mode</b>, where vouchers can be dated only the 1st, 2nd or 31st of a month — every practice entry in this course uses those dates). Phones and tablets can do all the reading, labs and quizzes.</div>
<div class="box"><b class="t">Keyboard</b><kbd>M</kbd> contents · <kbd>F</kbd> full screen · <kbd>T</kbd> light/dark · <kbd>P</kbd> play · <kbd>S</kbd> step · <kbd>X</kbd> pause · <kbd>[</kbd> <kbd>]</kbd> previous / next day. Inside the Practice Desk the TallyPrime keys work: <kbd>F4</kbd>–<kbd>F9</kbd>, <kbd>Alt</kbd>+<kbd>F5</kbd>…, <kbd>Enter</kbd>, <kbd>Ctrl</kbd>+<kbd>A</kbd>.</div>

<div class="box"><b class="t">The running example</b><span data-pf="hub">Avani Gearworks Pvt Ltd (fictional), Ambattur, Chennai, Tamil Nadu — 40 people, CNC machining and assembly of the GB-20 gearbox and SG-40 gear sets. Suppliers in Chennai, Coimbatore and Pune; customers in Tamil Nadu, Telangana and Kerala, so you meet both CGST + SGST and IGST.</span></div>
</div>
{weeks}
<p style="margin-top:30px" class="hint">Your progress, ticks, Practice Desk entries and quiz scores are stored in this browser (and in your account when you sign in). <button class="btn" onclick="SW.resetProgress()">Reset my progress</button></p>
</div>
{FOOT}
{DAYS_JS}
<script src="assets/tl-profiles.js"></script>
<script src="assets/tl.js"></script>
</body>
</html>
'''

if __name__ == "__main__":
    days = load_days()
    missing = [n for n in range(1, N + 1) if n not in days]
    if missing: print("WARNING: days missing from the week sources:", missing)
    for n in sorted(days):
        open(os.path.join(OUT, fn(n)), "w", encoding="utf-8").write(page(n, days[n]))
    open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(hub())
    print("built %d days + index" % len(days))
