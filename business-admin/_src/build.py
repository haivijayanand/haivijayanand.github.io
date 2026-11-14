#!/usr/bin/env python3
"""
TOOL:    business-admin/_src/build.py — builds Business Administration chapter pages and hub from _src/NN.html
FAMILY:  business-admin
VERSION: 1.1.0
DATE:    2026-11-14
CHAT:    Business Administration series — 50 chapters, three levels (school, working, expert), interactive
CHANGES: 1.1.0 - injects shared Kaveri Foods data (kf.js) into Part D chapters; 1.0.0 - syllabus of 50 chapters in 6 parts; wraps chapter sources with header block, toolbar,
                 level switch, contents, pager and footer; writes hub index.html
STATUS:  working
"""
import json, re, os, html, sys
__version__ = "1.1.0"
HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.dirname(HERE)
DATE = "2026-11-14"
PARTS = {
 "A": ("Part A · Understanding Business", "What a business is, who owns it, the world around it and how one starts", "linear-gradient(135deg,#1d3557,#1d5fa6 60%,#d9730d)"),
 "B": ("Part B · The Seven Pillars of Business", "Strategy, marketing, sales, operations, finance, people and customers", "linear-gradient(135deg,#3d2a05,#a87908 55%,#d9730d)"),
 "C": ("Part C · Accounting: Making the Books", "Principles, double entry, journals, ledgers, adjustments and the three statements", "linear-gradient(135deg,#2b1d57,#6a3fa0 55%,#1d5fa6)"),
 "D": ("Part D · Ratios and Financial Analysis", "Reading the statements: liquidity, solvency, profitability, efficiency, valuation, DuPont", "linear-gradient(135deg,#0b2a4a,#1d5fa6 55%,#6a3fa0)"),
 "E": ("Part E · Management Accounting and Finance", "Costs, break-even, budgets, working capital, investment decisions and cost of capital", "linear-gradient(135deg,#3a1d57,#6a3fa0 50%,#d9730d)"),
 "F": ("Part F · Managing and Growing", "Management, law, entrepreneurship and strategy — and a capstone", "linear-gradient(135deg,#0f3b3a,#1d5fa6 60%,#a87908)"),
}
SYL = [
 ("A","what-is-a-business","What Is a Business?"),("A","value-and-profit","Value, Customers and Profit"),
 ("A","forms-of-ownership","Forms of Business Ownership"),("A","business-environment","The Business Environment"),
 ("A","stakeholders-governance","Stakeholders and Governance"),("A","starting-a-business","Starting a Business in India"),
 ("A","business-models","Business Models"),("A","ethics-csr","Ethics and Social Responsibility"),
 ("B","seven-pillars","The Seven Pillars of Business"),("B","strategy-leadership","Pillar 1 · Strategy and Leadership"),
 ("B","marketing","Pillar 2 · Marketing"),("B","sales","Pillar 3 · Sales"),("B","operations","Pillar 4 · Operations"),
 ("B","finance-pillar","Pillar 5 · Finance"),("B","people-hr","Pillar 6 · People"),("B","customer-experience","Pillar 7 · Customer Experience"),
 ("C","why-accounting","Accounting: the Language of Business"),("C","accounting-principles","Accounting Concepts and Principles"),
 ("C","accounting-equation","The Accounting Equation"),("C","debits-credits","Double Entry: Debits and Credits"),
 ("C","journal-ledger","Journal and Ledger"),("C","trial-balance","The Trial Balance and Errors"),
 ("C","cash-book-brs","Cash Book and Bank Reconciliation"),("C","depreciation","Depreciation"),
 ("C","inventory","Inventory Valuation"),("C","adjustments","Adjustments and Final Accounts"),
 ("C","income-statement","The Profit and Loss Statement"),("C","balance-sheet","The Balance Sheet"),
 ("C","cash-flow","The Cash Flow Statement"),("C","company-accounts","Company Accounts and Schedule III"),
 ("C","gst-accounting","GST in the Books"),("C","annual-report","Reading an Annual Report"),
 ("D","financial-analysis","Financial Analysis: Trend and Common-Size"),("D","liquidity-ratios","Liquidity Ratios"),
 ("D","solvency-ratios","Solvency and Leverage Ratios"),("D","profitability-ratios","Profitability Ratios"),
 ("D","efficiency-ratios","Efficiency Ratios and the Cash Cycle"),("D","market-ratios","Market and Valuation Ratios"),
 ("D","dupont","DuPont Analysis"),("D","ratio-case","Ratio Case Study and Limits"),
 ("E","cost-concepts","Cost Concepts"),("E","break-even","Break-Even and CVP"),("E","budgeting","Budgets and Variances"),
 ("E","working-capital","Working Capital Management"),("E","capital-budgeting","Capital Budgeting: NPV and IRR"),
 ("E","cost-of-capital","Cost of Capital and Capital Structure"),
 ("F","management-functions","Management and Organisation"),("F","business-law","Business Law Essentials"),
 ("F","entrepreneurship","Entrepreneurship and the Business Plan"),("F","strategy-capstone","Strategy Tools and Capstone"),
]
def fn(n): p,s,t=SYL[n-1]; return "%02d-%s.html"%(n,s)
def tag(src,name):
    m=re.search(r"<%s>(.*?)</%s>"%(name,name),src,re.S); return m.group(1).strip() if m else ""
HEAD='''<!DOCTYPE html>
<!--
TOOL:    business-admin/{file} — Business Administration Chapter {n:02d}: {title_t} (three levels)
FAMILY:  business-admin
VERSION: {ver}
DATE:    {date}
CHAT:    Business Administration series — 50 chapters, three levels (school, working, expert), interactive
CHANGES: {changes}
STATUS:  working
-->
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title} — Business Administration in Three Levels — K Vijay Anand</title>
<meta name="description" content="{desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/ba.css">
</head>
'''
def page(n,src):
    M=json.loads(tag(src,"meta-json")); part,slug,title=SYL[n-1]
    e=html.escape
    out=HEAD.format(file=fn(n),n=n,title_t=title,ver=M.get("version","1.0.0"),date=DATE,changes=M.get("changes","1.0.0 - first version"),
                    title=e(title),desc=e(M["blurb"]))
    out+='<body data-level="school">\n<div class="toolbar">\n  <a href="./">← All chapters</a>\n  <button id="sbBtn" title="Show / hide contents (M)">☰ Contents</button>\n  <button id="themeBtn" title="Light / dark (T)">◐ Theme</button>\n  <button id="fsBtn" title="Full screen (F)">⤢ Full screen</button>\n</div>\n'
    out+='<header>\n  <div class="series">Business Administration · %s · Chapter %02d</div>\n  <h1>%s</h1>\n  <p class="tag">%s</p>\n'%(e(PARTS[part][0].split("·")[0].strip()),n,e(title.split("· ")[-1]),M["tag"])
    out+='  <div class="levels" role="tablist">\n    <button data-l="school" class="on"><span class="k">1</span><b>🎒 School</b><small>%s</small></button>\n    <button data-l="working"><span class="k">2</span><b>💼 Working people</b><small>%s</small></button>\n    <button data-l="expert"><span class="k">3</span><b>🎓 Experts — review</b><small>%s</small></button>\n  </div>\n</header>\n'%(M["l1"],M["l2"],M["l3"])
    out+='\n<div class="wrap">\n<aside id="toc"></aside>\n<main>\n'
    snap=tag(src,"snapshot")
    if snap: out+='<section id="snapshot" style="border-top:4px solid var(--gold)">\n'+snap+'\n</section>\n'
    for lv,who,blurb in (("school","Level 1 · For school students",M["h1"]),("working","Level 2 · For working people",M["h2"]),("expert","Level 3 · For experts — a review",M["h3"])):
        body=tag(src,lv)
        out+='\n<div class="panel%s" id="p-%s">\n  <div class="lvhead"><div class="who">%s</div><p>%s</p></div>\n%s\n'%(" on" if lv=="school" else "",lv,who,blurb,body)
        out+='  <section id="%s-quiz"><h2><span class="n">✎</span>Check yourself</h2><div class="quiz" data-quiz="%s"></div></section>\n</div>\n'%(lv[0],lv)
    srcs=tag(src,"sources")
    if srcs: out+='<section id="sources"><h2>Sources and further reading</h2>\n'+srcs+'\n</section>\n'
    out+='</main>\n</div>\n<nav class="pager">'
    out+=('<a href="%s"><small>← Chapter %02d</small>%s</a>'%(fn(n-1),n-1,e(SYL[n-2][2])) if n>1 else '<a href="./"><small>← Series</small>All chapters</a>')
    out+=('<a class="nx" href="%s"><small>Chapter %02d →</small>%s</a>'%(fn(n+1),n+1,e(SYL[n][2])) if n<len(SYL) else '<a class="nx" href="./"><small>Series →</small>All chapters</a>')
    out+='</nav>\n<footer>\n  Business Administration in Three Levels · Chapter %02d · K Vijay Anand · <a href="./">All chapters</a> · <a href="/finance-economics/">Finance &amp; Economics</a> · <a href="/">Home</a><br>\n  Keys: <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> level · <kbd>M</kbd> contents · <kbd>P</kbd> play · <kbd>S</kbd> next step · <kbd>X</kbd> pause · <kbd>T</kbd> theme · <kbd>F</kbd> full screen.\n  Educational content, not legal, tax or investment advice. Rules and figures as of November 2026.\n</footer>\n'%n
    js=tag(src,"js")
    if "/*KF*/" in js: js=js.replace("/*KF*/",open(os.path.join(HERE,"kf.js"),encoding="utf-8").read())
    out+='<script>\n'+js+'\n</script>\n<script src="assets/ba.js"></script>\n</body>\n</html>\n'
    return out,M
def hub(metas):
    e=html.escape
    h='''<!DOCTYPE html>
<!--
TOOL:    business-admin/index.html — Business Administration in Three Levels: series hub (50 chapters)
FAMILY:  business-admin
VERSION: 1.0.0
DATE:    %s
CHAT:    Business Administration series — 50 chapters, three levels (school, working, expert), interactive
CHANGES: 1.0.0 - hub with level guide, six parts, %d chapters built of 50
STATUS:  working
-->
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Business Administration in Three Levels — K Vijay Anand</title>
<meta name="description" content="Business administration in 50 chapters, each explained for school students, working people and experts: what a business is, the seven pillars, accounting from the ground up, ratios, management accounting, finance and strategy. Interactive.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/ba.css">
<style>
 header{text-align:center;padding-top:90px}.tag{margin:0 auto}
 .lv{max-width:1500px;margin:26px auto 0;padding:0 5vw;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px}
 .lv div{background:var(--card);border:1px solid var(--rule);border-top:5px solid var(--c);border-radius:10px;padding:14px 18px}
 .lv b{color:var(--c);font-size:18px}.lv p{margin:4px 0 0;color:var(--soft);font-size:15.5px}
 .part{max-width:1500px;margin:40px auto 0;padding:0 5vw}
 .part h2{margin:0}.part>p{color:var(--soft);margin:4px 0 12px}
 .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px}
 .ch{background:var(--card);border:1px solid var(--rule);border-radius:12px;overflow:hidden;transition:transform .12s}
 .ch:hover{transform:translateY(-3px)}
 .cover{display:flex;flex-direction:column;justify-content:flex-end;height:120px;padding:14px 18px;color:#fff;text-decoration:none}
 .cover .t{font-family:"Playfair Display",serif;font-weight:800;font-size:26px;line-height:1.1}
 .cover .no{font-size:12px;letter-spacing:.18em;text-transform:uppercase;opacity:.9}
 .ch .b{padding:12px 18px 16px}.ch .b p{margin:0;color:var(--soft);font-size:15px}
 .chips{margin-top:10px;display:flex;flex-wrap:wrap;gap:6px}
 .chips a{font-size:12.5px;border:1px solid var(--rule);border-radius:999px;padding:2px 10px;color:var(--soft);text-decoration:none}
 .soon{opacity:.55}
 .prog{max-width:1500px;margin:20px auto 0;padding:0 5vw;color:var(--faint);text-align:center}
</style>
</head>
<body class="hub">
<div class="toolbar"><a href="/">← Home</a><button id="themeBtn" title="Light / dark (T)">◐ Theme</button><button id="fsBtn" title="Full screen (F)">⤢ Full screen</button></div>
<header>
  <div class="series">Business Administration</div>
  <h1>How a business works,<br>in three levels</h1>
  <p class="tag">Fifty chapters, from “what is a business?” to reading a balance sheet and judging a company by its ratios. Each chapter explains the same idea three ways on one page. Every chapter has step-by-step animations, sorting exercises, flip cards, calculators and quizzes.</p>
</header>
<div class="lv">
  <div style="--c:var(--l1)"><b>🎒 Level 1 · School</b><p>Plain words and a lemonade-stall or kirana-shop story. A moving picture you control with P, S and X, and a short quiz.</p></div>
  <div style="--c:var(--l2)"><b>💼 Level 2 · Working people</b><p>How the idea works in a real Indian business, with live calculators, worked examples and practice exercises.</p></div>
  <div style="--c:var(--l3)"><b>🎓 Level 3 · Experts</b><p>A compact review: standards (Ind AS, Companies Act), formulas, models, edge cases and debates.</p></div>
</div>
<p class="prog">%d of 50 chapters published · the chapters build on each other, so Parts A to D are best read in order</p>
'''%(DATE,len(metas),len(metas))
    for p in PARTS:
        h+='<div class="part"><h2>%s</h2><p>%s</p><div class="grid">\n'%(e(PARTS[p][0]),e(PARTS[p][1]))
        for i,(pp,slug,title) in enumerate(SYL,1):
            if pp!=p: continue
            M=metas.get(i)
            if M:
                h+='<div class="ch"><a class="cover" href="%s" style="background:%s"><div class="no">Chapter %02d</div><div class="t">%s</div></a><div class="b"><p>%s</p><div class="chips"><a href="%s#school">School</a><a href="%s#working">Working</a><a href="%s#expert">Expert</a></div></div></div>\n'%(fn(i),PARTS[p][2],i,e(title),e(M["blurb"]),fn(i),fn(i),fn(i))
            else:
                h+='<div class="ch soon"><div class="cover" style="background:%s"><div class="no">Chapter %02d · coming</div><div class="t">%s</div></div></div>\n'%(PARTS[p][2],i,e(title))
        h+='</div></div>\n'
    h+='<footer style="margin-top:40px">Business Administration in Three Levels · K Vijay Anand · <a href="/finance-economics/">Finance &amp; Economics</a> · <a href="/">Home</a> · Keys: <kbd>T</kbd> theme · <kbd>F</kbd> full screen. Educational content, not legal, tax or investment advice.</footer>\n<script src="assets/ba.js"></script>\n</body>\n</html>\n'
    return h
if __name__=="__main__":
    metas={}
    for i in range(1,len(SYL)+1):
        p=os.path.join(HERE,"%02d.html"%i)
        if not os.path.exists(p): continue
        out,M=page(i,open(p,encoding="utf-8").read()); metas[i]=M
        open(os.path.join(OUT,fn(i)),"w",encoding="utf-8").write(out)
    open(os.path.join(OUT,"index.html"),"w",encoding="utf-8").write(hub(metas))
    print("built",sorted(metas))
