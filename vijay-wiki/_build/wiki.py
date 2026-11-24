"""
TOOL:    Vijay_Wiki builder (wiki.py) — template, SVG helpers, calculator & quiz engines
FAMILY:  vijay-wiki
VERSION: 1.0.0
DATE:    2026-11-24
CHAT:    claude.ai — Vijay_Wiki: build all suggested topics in groups and upload
CHANGES: 1.0.0 Initial builder: self-contained article pages, index page, SVG plot/flow helpers
"""
__version__ = "1.0.0"

import html, json, math, re

DATE = "2026-11-24"
DATE_LONG = "24 November 2026"
CHAT = "claude.ai — Vijay_Wiki: build all suggested topics in groups and upload (2026-11-24)"

GROUPS = [
    ("rotating", "Rotating machinery and drives"),
    ("vibration", "Vibration and condition monitoring"),
    ("instrumentation", "Instrumentation and data acquisition"),
    ("elements", "Machine elements and mechanisms"),
    ("tribology", "Tribology and lubrication"),
    ("packaging", "Packaging and printing"),
    ("facilities", "Facilities, utilities and power"),
    ("maths", "Maths for engineers"),
    ("computing", "Computing and IT for engineers"),
    ("management", "Management and planning"),
]

# ---------------------------------------------------------------- SVG helpers
C_BLUE, C_ORANGE, C_PURPLE, C_INK = "var(--blue)", "var(--orange)", "var(--purple)", "var(--ink)"
SERIES = [(C_BLUE, ""), (C_ORANGE, "12 7"), (C_PURPLE, "4 5"), (C_INK, "2 4")]


def esc(s):
    return html.escape(str(s), quote=True)


def _nice(lo, hi, n=5):
    span = hi - lo
    if span <= 0:
        return [lo]
    raw = span / n
    mag = 10 ** math.floor(math.log10(raw))
    step = min([1, 2, 2.5, 5, 10], key=lambda m: abs(m * mag - raw)) * mag
    start = math.ceil(lo / step - 1e-9) * step
    out, v = [], start
    while v <= hi + 1e-9:
        out.append(round(v, 10))
        v += step
    return out


def _fmt(v):
    if abs(v) >= 1000:
        return f"{v:,.0f}"
    if v == int(v):
        return str(int(v))
    return f"{v:g}"


def plot(curves, xlabel, ylabel, xlim=None, ylim=None, w=900, h=330, notes=(), xlog=False, ylog=False, points=()):
    """curves: list of dict(pts=[(x,y)], label, color?, dash?, width?, lx?, ly?) ; notes: (x,y,text) in data coords
    points: list of (x,y,label) markers."""
    L, R, T, B = 80, w - 30, 20, h - 55
    xs = [p[0] for c in curves for p in c["pts"]] + [p[0] for p in points]
    ys = [p[1] for c in curves for p in c["pts"]] + [p[1] for p in points]
    x0, x1 = xlim or (min(xs), max(xs))
    y0, y1 = ylim or (min(0, min(ys)), max(ys) * 1.08)
    fx = (lambda x: math.log10(x)) if xlog else (lambda x: x)
    fy = (lambda y: math.log10(y)) if ylog else (lambda y: y)
    X = lambda x: L + (R - L) * (fx(x) - fx(x0)) / (fx(x1) - fx(x0))
    Y = lambda y: B - (B - T) * (fy(max(y, y0 if not ylog else 1e-30)) - fy(y0)) / (fy(y1) - fy(y0))
    o = [f'<svg viewBox="0 0 {w} {h}" role="img" aria-label="{esc(ylabel)} against {esc(xlabel)}">']
    yt = [10 ** k for k in range(math.floor(math.log10(y0)), math.ceil(math.log10(y1)) + 1)] if ylog else _nice(y0, y1)
    xt = [10 ** k for k in range(math.floor(math.log10(x0)), math.ceil(math.log10(x1)) + 1)] if xlog else _nice(x0, x1, 8)
    for v in yt:
        if y0 <= v <= y1:
            o.append(f'<line x1="{L}" y1="{Y(v):.1f}" x2="{R}" y2="{Y(v):.1f}" class="grid"/>'
                     f'<text x="{L-8}" y="{Y(v)+4:.1f}" text-anchor="end" font-size="12">{_fmt(v)}</text>')
    for v in xt:
        if x0 <= v <= x1:
            o.append(f'<line x1="{X(v):.1f}" y1="{B}" x2="{X(v):.1f}" y2="{B+5}" class="ax"/>'
                     f'<text x="{X(v):.1f}" y="{B+20}" text-anchor="middle" font-size="12">{_fmt(v)}</text>')
    o.append(f'<line x1="{L}" y1="{B}" x2="{R}" y2="{B}" class="ax"/><line x1="{L}" y1="{T}" x2="{L}" y2="{B}" class="ax"/>')
    o.append(f'<text x="{(L+R)/2}" y="{h-12}" text-anchor="middle" font-size="13">{esc(xlabel)}</text>')
    o.append(f'<text x="18" y="{(T+B)/2}" text-anchor="middle" font-size="13" transform="rotate(-90 18 {(T+B)/2})">{esc(ylabel)}</text>')
    for i, c in enumerate(curves):
        col, dash = SERIES[i % 4]
        col = c.get("color", col)
        dash = c.get("dash", dash)
        pts = [(x, y) for x, y in c["pts"] if x0 <= x <= x1]
        segs, prev_in = [], False
        for (x, y) in pts:
            inside = y0 <= y <= y1
            if inside:
                segs.append(("L" if prev_in else "M") + f"{X(x):.1f} {Y(y):.1f}")
            prev_in = inside
        d = " ".join(segs)
        pts = [(x, y) for x, y in pts if y0 <= y <= y1] or pts
        o.append(f'<path d="{d}" fill="none" stroke="{col}" stroke-width="{c.get("width", 3.5)}" stroke-dasharray="{dash}"/>')
        if c.get("label"):
            at = c.get("at", pts[int(len(pts) * 0.7)][0])
            if isinstance(at, (int, float)):
                lx, ly = min(pts, key=lambda p: abs(p[0] - at))
            else:
                lx, ly = at
            o.append(f'<text x="{X(lx)+6:.1f}" y="{Y(ly)-8:.1f}" font-size="13" font-weight="700" style="fill:{col}">{esc(c["label"])}</text>')
    for x, y, t in points:
        o.append(f'<rect x="{X(x)-6:.1f}" y="{Y(y)-6:.1f}" width="12" height="12" fill="{C_ORANGE}"/>'
                 f'<text x="{X(x)+10:.1f}" y="{Y(y)-8:.1f}" font-size="12.5" font-weight="700">{esc(t)}</text>')
    for x, y, t in notes:
        o.append(f'<text x="{X(x):.1f}" y="{Y(y):.1f}" font-size="12.5">{esc(t)}</text>')
    o.append("</svg>")
    return "".join(o)


def flow(steps, w=1000, h=150, title=None, colors=None):
    """Left-to-right block diagram. steps: list of 'Line1|Line2' strings."""
    n = len(steps)
    gap = 34
    bw = (w - 40 - gap * (n - 1)) / n
    y = 40 if title else 20
    bh = h - y - 20
    o = [f'<svg viewBox="0 0 {w} {h}" role="img" aria-label="block diagram">']
    if title:
        o.append(f'<text x="{w/2}" y="22" text-anchor="middle" font-size="14" font-weight="700">{esc(title)}</text>')
    for i, s in enumerate(steps):
        x = 20 + i * (bw + gap)
        fill = (colors or [])[i] if colors and i < len(colors) else ("var(--blue3)" if i % 2 == 0 else "var(--orange3)")
        o.append(f'<rect x="{x:.1f}" y="{y}" width="{bw:.1f}" height="{bh}" rx="10" fill="{fill}" stroke="var(--blue)" stroke-width="2"/>')
        lines = s.split("|")
        for k, ln in enumerate(lines):
            yy = y + bh / 2 + (k - (len(lines) - 1) / 2) * 17 + 5
            o.append(f'<text x="{x+bw/2:.1f}" y="{yy:.1f}" text-anchor="middle" font-size="13" font-weight="{700 if k==0 else 400}">{esc(ln)}</text>')
        if i < n - 1:
            ax = x + bw + 4
            o.append(f'<line x1="{ax:.1f}" y1="{y+bh/2}" x2="{ax+gap-12:.1f}" y2="{y+bh/2}" stroke="var(--ink)" stroke-width="2.5"/>'
                     f'<polygon points="{ax+gap-12:.1f},{y+bh/2-6} {ax+gap-3:.1f},{y+bh/2} {ax+gap-12:.1f},{y+bh/2+6}" fill="var(--ink)"/>')
    o.append("</svg>")
    return "".join(o)


def bars(items, ylabel, w=900, h=300, unit=""):
    """items: list of (label, value)."""
    L, R, T, B = 70, w - 20, 20, h - 60
    vmax = max(v for _, v in items) * 1.15
    n = len(items)
    bw = (R - L) / n * 0.6
    o = [f'<svg viewBox="0 0 {w} {h}" role="img" aria-label="bar chart">']
    for v in _nice(0, vmax):
        y = B - (B - T) * v / vmax
        o.append(f'<line x1="{L}" y1="{y:.1f}" x2="{R}" y2="{y:.1f}" class="grid"/><text x="{L-8}" y="{y+4:.1f}" text-anchor="end" font-size="12">{_fmt(v)}</text>')
    for i, (lab, v) in enumerate(items):
        x = L + (R - L) / n * (i + 0.2)
        y = B - (B - T) * v / vmax
        fill = C_BLUE if i % 2 == 0 else C_ORANGE
        o.append(f'<rect x="{x:.1f}" y="{y:.1f}" width="{bw:.1f}" height="{B-y:.1f}" fill="{fill}"/>'
                 f'<text x="{x+bw/2:.1f}" y="{y-6:.1f}" text-anchor="middle" font-size="12.5" font-weight="700">{_fmt(v)}{unit}</text>')
        for k, ln in enumerate(lab.split("|")):
            o.append(f'<text x="{x+bw/2:.1f}" y="{B+18+k*15}" text-anchor="middle" font-size="12.5">{esc(ln)}</text>')
    o.append(f'<line x1="{L}" y1="{B}" x2="{R}" y2="{B}" class="ax"/>')
    o.append(f'<text x="16" y="{(T+B)/2}" text-anchor="middle" font-size="13" transform="rotate(-90 16 {(T+B)/2})">{esc(ylabel)}</text></svg>')
    return "".join(o)


def fig(svg, caption):
    return f'<figure>{svg}<figcaption>{caption}</figcaption></figure>'


def table(head, rows, num_cols=()):
    o = ['<div class="tblwrap"><table><tr>']
    o += [f'<th{" class=num" if i in num_cols else ""}>{h}</th>' for i, h in enumerate(head)]
    o.append("</tr>")
    for r in rows:
        o.append("<tr>" + "".join(f'<td{" class=num" if i in num_cols else ""}>{c}</td>' for i, c in enumerate(r)) + "</tr>")
    o.append("</table></div>")
    return "".join(o)


def box(kind, title, body):
    return f'<div class="box {kind}"><h4>{title}</h4>{body}</div>'


def formula(text):
    return f'<div class="formula">{esc(text)}</div>'


# ---------------------------------------------------------------- page template
CSS = r"""
:root{--bg:#f7f8fa;--panel:#ffffff;--ink:#1d2330;--muted:#5b6475;--line:#d9dde5;--blue:#1f5fbf;--blue2:#6f9de0;--blue3:#d6e4f7;--orange:#c96a12;--orange2:#f3c58f;--orange3:#fbe7d0;--purple:#6a4fb3;--purple3:#e6e0f5;--code:#eef1f6;--shadow:0 1px 3px rgba(0,0,0,.08)}
[data-theme="dark"]{--bg:#12151b;--panel:#1b2029;--ink:#e6e9ef;--muted:#9aa3b2;--line:#2e3542;--blue:#7fb0ff;--blue2:#4d7fc9;--blue3:#1e3356;--orange:#ffad5c;--orange2:#a8661f;--orange3:#4a3016;--purple:#b8a3ff;--purple3:#2f2750;--code:#232a36;--shadow:none}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.6 "Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif}
a{color:var(--blue)}
header.top{position:sticky;top:0;z-index:20;display:flex;align-items:center;gap:10px;padding:8px 16px;background:var(--panel);border-bottom:1px solid var(--line);box-shadow:var(--shadow)}
header.top .brand{font-weight:700;white-space:nowrap}header.top .brand span{color:var(--blue)}
header.top .crumb{color:var(--muted);font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1}
.btn{border:1px solid var(--line);background:var(--panel);color:var(--ink);border-radius:6px;padding:5px 10px;font:inherit;font-size:14px;cursor:pointer}
.btn:hover{border-color:var(--blue)}.btn.primary{background:var(--blue);color:#fff;border-color:var(--blue)}[data-theme="dark"] .btn.primary{color:#0d1117}
.layout{display:grid;grid-template-columns:270px minmax(0,1fr);min-height:calc(100vh - 50px)}
body.nosidebar .layout{grid-template-columns:0 minmax(0,1fr)}body.nosidebar nav.side{display:none}
nav.side{position:sticky;top:50px;height:calc(100vh - 50px);overflow:auto;padding:16px 12px;border-right:1px solid var(--line);background:var(--panel);font-size:14px}
nav.side h4{margin:4px 6px 8px;color:var(--muted);text-transform:uppercase;font-size:12px;letter-spacing:.06em}
nav.side a{display:block;padding:4px 8px;border-radius:5px;text-decoration:none;color:var(--ink)}
nav.side a:hover,nav.side a.active{background:var(--blue3)}nav.side a.sub{padding-left:22px;color:var(--muted)}
main{padding:24px clamp(16px,3vw,48px) 80px;max-width:1500px}
h1{font-size:2.05rem;line-height:1.2;margin:.2em 0 .2em}
h2{font-size:1.5rem;margin:2.1em 0 .6em;padding-top:.4em;border-top:2px solid var(--line)}
h3{font-size:1.16rem;margin:1.5em 0 .5em}
.meta{color:var(--muted);font-size:14px}
.tags span{display:inline-block;background:var(--blue3);border-radius:12px;padding:1px 10px;margin:2px 4px 2px 0;font-size:13px}
.lead{font-size:1.07rem}
.box{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:14px 18px;margin:14px 0;box-shadow:var(--shadow)}
.box.key{border-left:5px solid var(--blue)}.box.warn{border-left:5px solid var(--orange)}.box.note{border-left:5px solid var(--purple)}
.box h4{margin:0 0 6px}
.grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(420px,1fr));gap:16px}
table{border-collapse:collapse;width:100%;margin:10px 0 16px;background:var(--panel);font-size:14.5px}
th,td{border:1px solid var(--line);padding:6px 9px;text-align:left;vertical-align:top}th{background:var(--blue3)}
td.num,th.num{text-align:right;font-variant-numeric:tabular-nums}.tblwrap{overflow-x:auto}
figure{margin:16px 0;background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:12px}
figure svg{width:100%;height:auto;display:block}figcaption{color:var(--muted);font-size:13.5px;margin-top:6px}
code{font-family:Consolas,"Courier New",monospace;background:var(--code);padding:1px 5px;border-radius:4px;font-size:.93em}
pre,.formula{font-family:Consolas,"Courier New",monospace;background:var(--code);border-radius:8px;padding:10px 14px;margin:8px 0;overflow-x:auto;white-space:pre;font-size:14px}
svg text{fill:var(--ink);font-family:"Segoe UI",Roboto,Arial,sans-serif}svg .mut{fill:var(--muted)}
svg .ax{stroke:var(--muted);stroke-width:1.5}svg .grid{stroke:var(--line);stroke-width:1}
.calc{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:16px;margin:16px 0;box-shadow:var(--shadow)}
.calc h3{margin-top:0}
.inputs{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px 14px}
.inputs label{display:flex;flex-direction:column;font-size:13.5px;color:var(--muted)}
.inputs input,.inputs select,.inputs textarea{margin-top:3px;padding:6px 8px;border:1px solid var(--line);border-radius:6px;background:var(--bg);color:var(--ink);font:inherit;font-size:15px}
.results{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px;margin-top:14px}
.res{border:1px solid var(--line);border-radius:8px;padding:8px 12px;background:var(--bg)}
.res .k{font-size:12.5px;color:var(--muted)}.res .v{font-size:1.22rem;font-weight:700;font-variant-numeric:tabular-nums}.res .s{font-size:12.5px;color:var(--muted)}
.verdict{margin-top:12px;padding:10px 14px;border-radius:8px;font-weight:600;border:2px solid}
.verdict.ok{border-color:var(--blue);background:var(--blue3)}.verdict.caution{border-color:var(--purple);background:var(--purple3)}.verdict.bad{border-color:var(--orange);background:var(--orange3)}
.presets{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 12px}
.q{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:12px 16px;margin:12px 0}
.q .qt{font-weight:600}.q label.opt{display:block;padding:5px 8px;margin:3px 0;border-radius:6px;border:1px solid transparent;cursor:pointer}
.q label.opt:hover{background:var(--bg)}.q label.opt.right{border:2px solid var(--blue);background:var(--blue3)}.q label.opt.wrong{border:2px dashed var(--orange);background:var(--orange3)}
.q .fb{display:none;margin-top:8px;padding:8px 10px;border-radius:6px;background:var(--bg);font-size:14.5px}.q .fb.show{display:block}
.q input[type=number]{padding:5px 8px;border:1px solid var(--line);border-radius:6px;background:var(--bg);color:var(--ink);font:inherit;width:180px}
.score{position:sticky;bottom:10px;display:inline-block;background:var(--panel);border:2px solid var(--blue);border-radius:20px;padding:6px 16px;font-weight:700;box-shadow:var(--shadow)}
ol.refs li{margin:6px 0}
.related a{display:inline-block;margin:3px 8px 3px 0}
footer{margin-top:50px;padding-top:14px;border-top:1px solid var(--line);color:var(--muted);font-size:13.5px}
@media (max-width:900px){.layout{grid-template-columns:1fr}nav.side{display:none}body.showside nav.side{display:block;position:fixed;left:0;top:50px;width:270px;z-index:30}.grid2{grid-template-columns:1fr}}
@media print{header.top,nav.side,.calc,.presets,.quizsec,.score{display:none!important}.layout{display:block}main{max-width:none;padding:0}}
"""

ENGINE = r"""
(function(){
"use strict";
var $=function(id){return document.getElementById(id);};
window.fmt=function(x,dp){if(x===null||x===undefined||!isFinite(x))return "—";dp=(dp===undefined)?2:dp;return Number(x).toLocaleString("en-IN",{maximumFractionDigits:dp,minimumFractionDigits:dp});};
window.sig=function(x,n){if(!isFinite(x))return "—";if(x===0)return "0";n=n||3;var d=Math.max(0,n-1-Math.floor(Math.log10(Math.abs(x))));return fmt(x,Math.min(d,6));};
function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v);}catch(e){return null;}}
if(store("vw-theme")==="dark")document.documentElement.setAttribute("data-theme","dark");
$("btnTheme").onclick=function(){var d=document.documentElement.getAttribute("data-theme")==="dark";document.documentElement.setAttribute("data-theme",d?"light":"dark");store("vw-theme",d?"light":"dark");};
function toggleSide(){if(window.innerWidth<=900)document.body.classList.toggle("showside");else document.body.classList.toggle("nosidebar");}
$("btnSide").onclick=toggleSide;
function toggleFull(){if(!document.fullscreenElement){if(document.documentElement.requestFullscreen)document.documentElement.requestFullscreen();}else if(document.exitFullscreen)document.exitFullscreen();}
$("btnFull").onclick=toggleFull;
document.addEventListener("keydown",function(e){var t=e.target.tagName;if(t==="INPUT"||t==="SELECT"||t==="TEXTAREA")return;if(e.key==="m"||e.key==="M")toggleSide();if(e.key==="f"||e.key==="F")toggleFull();});
var links=[].slice.call(document.querySelectorAll("nav.side a"));
var secs=links.map(function(a){return document.querySelector(a.getAttribute("href"));});
window.addEventListener("scroll",function(){var y=window.scrollY+120,cur=0;secs.forEach(function(s,i){if(s&&s.offsetTop<=y)cur=i;});links.forEach(function(a,i){a.classList.toggle("active",i===cur);});});

/* ---- small dynamic plot helper for calculators ---- */
window.plotSVG=function(series,o){
  o=o||{};var W=o.w||560,H=o.h||260,L=62,R=W-18,T=16,B=H-42;
  var xs=[],ys=[];series.forEach(function(s){s.pts.forEach(function(p){if(isFinite(p[0])&&isFinite(p[1])){xs.push(p[0]);ys.push(p[1]);}});});
  if(!xs.length)return "";
  var x0=o.xmin!==undefined?o.xmin:Math.min.apply(null,xs),x1=o.xmax!==undefined?o.xmax:Math.max.apply(null,xs);
  var y0=o.ymin!==undefined?o.ymin:Math.min(0,Math.min.apply(null,ys)),y1=o.ymax!==undefined?o.ymax:Math.max.apply(null,ys)*1.08;
  if(x1===x0)x1=x0+1;if(y1===y0)y1=y0+1;
  var X=function(x){return L+(R-L)*(x-x0)/(x1-x0);},Y=function(y){return B-(B-T)*(Math.min(Math.max(y,y0),y1)-y0)/(y1-y0);};
  var s='<svg viewBox="0 0 '+W+' '+H+'">';
  for(var i=0;i<=4;i++){var yv=y0+(y1-y0)*i/4;s+='<line x1="'+L+'" y1="'+Y(yv)+'" x2="'+R+'" y2="'+Y(yv)+'" class="grid"/><text x="'+(L-6)+'" y="'+(Y(yv)+4)+'" text-anchor="end" font-size="11">'+sig(yv,3)+'</text>';}
  for(var j=0;j<=5;j++){var xv=x0+(x1-x0)*j/5;s+='<text x="'+X(xv)+'" y="'+(B+16)+'" text-anchor="middle" font-size="11">'+sig(xv,3)+'</text>';}
  s+='<line x1="'+L+'" y1="'+B+'" x2="'+R+'" y2="'+B+'" class="ax"/><line x1="'+L+'" y1="'+T+'" x2="'+L+'" y2="'+B+'" class="ax"/>';
  s+='<text x="'+((L+R)/2)+'" y="'+(H-6)+'" text-anchor="middle" font-size="12">'+(o.xlabel||"")+'</text>';
  s+='<text x="14" y="'+((T+B)/2)+'" text-anchor="middle" font-size="12" transform="rotate(-90 14 '+((T+B)/2)+')">'+(o.ylabel||"")+'</text>';
  var cols=["var(--blue)","var(--orange)","var(--purple)","var(--ink)"],dash=["","10 6","4 5","2 4"];
  series.forEach(function(se,k){var d="";se.pts.forEach(function(p,i){if(isFinite(p[1]))d+=(d?"L":"M")+X(p[0]).toFixed(1)+" "+Y(p[1]).toFixed(1)+" ";});
    s+='<path d="'+d+'" fill="none" stroke="'+cols[k%4]+'" stroke-width="3" stroke-dasharray="'+dash[k%4]+'"/>';
    if(se.label){var q=se.pts[Math.floor(se.pts.length*0.75)];if(q)s+='<text x="'+(X(q[0])+5)+'" y="'+(Y(q[1])-7)+'" font-size="12" font-weight="700" style="fill:'+cols[k%4]+'">'+se.label+'</text>';}});
  (o.marks||[]).forEach(function(m){s+='<rect x="'+(X(m[0])-6)+'" y="'+(Y(m[1])-6)+'" width="12" height="12" fill="var(--orange)"/><text x="'+Math.min(X(m[0])+9,R-110)+'" y="'+(Y(m[1])-9)+'" font-size="12" font-weight="700">'+(m[2]||"")+'</text>';});
  return s+'</svg>';
};

/* ---- calculators ---- */
function card(r){return '<div class="res"><div class="k">'+r[0]+'</div><div class="v">'+r[1]+'</div><div class="s">'+(r[2]||"")+'</div></div>';}
(window.CALCS||[]).forEach(function(c){
  var root=$("calc-"+c.id); if(!root)return;
  var ids=c.inputs.map(function(i){return i.id;});
  function read(){var v={};c.inputs.forEach(function(i){var e=$(c.id+"_"+i.id);v[i.id]=(i.options||i.text)?e.value:parseFloat(e.value);});return v;}
  function run(){var out;try{out=c.compute(read());}catch(err){out={rows:[],verdict:["bad","Check the inputs ("+err.message+")"]};}
    root.querySelector(".results").innerHTML=(out.rows||[]).map(card).join("");
    var vd=root.querySelector(".verdict");if(out.verdict){vd.style.display="";vd.className="verdict "+out.verdict[0];vd.textContent=({ok:"✔ ",caution:"◆ ",bad:"✖ "}[out.verdict[0]]||"")+out.verdict[1];}else vd.style.display="none";
    var ch=root.querySelector(".chart");if(out.svg){ch.style.display="";ch.querySelector(".svgbox").innerHTML=out.svg;ch.querySelector("figcaption").textContent=out.caption||"";}else ch.style.display="none";
    var tb=root.querySelector(".tbl");tb.innerHTML=out.html||"";}
  ids.forEach(function(id){var e=$(c.id+"_"+id);e.addEventListener("input",run);e.addEventListener("change",run);});
  [].forEach.call(root.querySelectorAll("[data-preset]"),function(b){b.onclick=function(){var p=c.presets[+b.getAttribute("data-preset")].v;for(var k in p){$(c.id+"_"+k).value=p[k];}run();};});
  run();
});

/* ---- quiz ---- */
var Q=window.QUIZ||[],state=[];
function render(){var box=$("quizBox");if(!box)return;box.innerHTML="";state=Q.map(function(){return null;});
  Q.forEach(function(it,i){var d=document.createElement("div");d.className="q";
    var h='<div class="qt">'+(i+1)+". "+it.q+"</div>";
    if(it.num!==undefined){h+='<div style="margin-top:6px"><input type="number" step="any" id="qn'+i+'"> '+(it.unit||"")+' <button class="btn primary" data-qn="'+i+'">Check</button></div>';}
    else it.o.forEach(function(o,j){h+='<label class="opt"><input type="radio" name="q'+i+'" value="'+j+'"> '+o+"</label>";});
    h+='<div class="fb" id="fb'+i+'"></div>';d.innerHTML=h;box.appendChild(d);
    function show(ok){var fb=$("fb"+i);fb.className="fb show";fb.style.border="2px "+(ok?"solid var(--blue)":"dashed var(--orange)");fb.innerHTML=(ok?"<b>✔ Correct.</b> ":"<b>✖ Not quite.</b> "+(it.num===undefined?"The right answer is highlighted. ":""))+it.e;score();}
    if(it.num!==undefined){d.querySelector("[data-qn]").onclick=function(){var v=parseFloat($("qn"+i).value);if(!isFinite(v))return;var tol=it.tol||0.03;var ok=Math.abs(v-it.num)<=Math.abs(it.num)*tol+1e-12;state[i]=ok;show(ok);};}
    else[].forEach.call(d.querySelectorAll("input[type=radio]"),function(r){r.onchange=function(){if(state[i]!==null)return;var j=+r.value,ok=j===it.a;state[i]=ok;var labs=d.querySelectorAll("label.opt");labs[it.a].classList.add("right");if(!ok)labs[j].classList.add("wrong");[].forEach.call(d.querySelectorAll("input[type=radio]"),function(x){x.disabled=true;});show(ok);};});
  });score();}
function score(){var s=$("score");if(!s)return;var done=state.filter(function(x){return x!==null;}).length,ok=state.filter(function(x){return x===true;}).length;s.textContent="Score: "+ok+" / "+done+(done===Q.length?"  — finished ("+Math.round(100*ok/Q.length)+" %)":"  (of "+Q.length+")");}
if($("btnReset"))$("btnReset").onclick=render;render();
})();
"""


def _calc_html(c):
    o = [f'<div class="calc" id="calc-{c["id"]}"><h3>{c["title"]}</h3>']
    if c.get("note"):
        o.append(f'<p class="meta">{c["note"]}</p>')
    if c.get("presets"):
        o.append('<div class="presets">' + "".join(
            f'<button class="btn" data-preset="{i}">{esc(p["label"])}</button>' for i, p in enumerate(c["presets"])) + "</div>")
    o.append('<div class="inputs">')
    for i in c["inputs"]:
        iid = f'{c["id"]}_{i["id"]}'
        if i.get("options"):
            opts = "".join(f'<option value="{esc(v)}"{" selected" if str(v)==str(i.get("value")) else ""}>{esc(l)}</option>' for v, l in i["options"])
            o.append(f'<label>{i["label"]}<select id="{iid}">{opts}</select></label>')
        elif i.get("text"):
            o.append(f'<label>{i["label"]}<input id="{iid}" type="text" value="{esc(i["value"])}"></label>')
        else:
            o.append(f'<label>{i["label"]}<input id="{iid}" type="number" step="any" value="{i["value"]}"></label>')
    o.append('</div><div class="results"></div><div class="verdict" style="display:none"></div>'
             '<div class="tbl"></div><figure class="chart" style="display:none"><div class="svgbox"></div><figcaption></figcaption></figure></div>')
    return "".join(o)


def _calc_js(c):
    spec = {"id": c["id"], "inputs": [{k: v for k, v in i.items() if k in ("id", "options", "text")} for i in c["inputs"]],
            "presets": [{"v": p["v"]} for p in c.get("presets", [])]}
    return f'(function(){{var s={json.dumps(spec)};s.compute=function(v){{{c["js"]}}};window.CALCS=window.CALCS||[];window.CALCS.push(s);}})();'


def _toc(body):
    out = []
    for m in re.finditer(r'<h([23]) id="([^"]+)">(.*?)</h\1>', body):
        lvl, i, t = m.groups()
        t = re.sub("<[^>]+>", "", t)
        out.append(f'<a{" class=\"sub\"" if lvl=="3" else ""} href="#{i}">{t}</a>')
    return "".join(out)


def page(a, related_html=""):
    n = len(re.findall(r"<h2 id=", a["body"]))
    calcs = a.get("calcs", [])
    tail = []
    k = n + 1
    tail.append(f'<h2 id="calculators">{k}. Calculators</h2>' + "".join(_calc_html(c) for c in calcs))
    k += 1
    tail.append(f'<h2 id="quiz" class="quizsec">{k}. Self-test: check your understanding</h2>'
                '<p class="quizsec">Pick an answer to see the explanation. Numerical answers are accepted within the stated tolerance (±3 % unless noted).</p>'
                '<div id="quizBox" class="quizsec"></div><div class="quizsec" style="display:flex;gap:10px;align-items:center;margin-top:10px">'
                '<span class="score" id="score">Score</span><button class="btn" id="btnReset">Reset quiz</button></div>')
    k += 1
    if a.get("glossary"):
        tail.append(f'<h2 id="glossary">{k}. Glossary</h2>' + table(["Term", "Meaning"], a["glossary"]))
        k += 1
    refs = "".join(f"<li>{r}</li>" for r in a["refs"])
    tail.append(f'<h2 id="references">{k}. References and further reading</h2><ol class="refs">{refs}</ol>')
    if a.get("links"):
        tail.append("<h3>Web pages</h3><ul>" + "".join(
            f'<li><a href="{u}" target="_blank" rel="noopener">{esc(t)}</a></li>' for t, u in a["links"]) + "</ul>")
    tail.append(box("warn", "Disclaimer", "This article is for education and quick reference. Formulas are simplified first estimates and examples use typical data. For design, safety and maintenance decisions use manufacturers' data and the applicable standards."))
    if related_html:
        tail.append(f'<h3>Related Vijay_Wiki articles</h3><p class="related">{related_html}</p>')
    full_body = a["body"] + "".join(tail)
    toc = '<a href="#summary">Key takeaways</a>' + _toc(full_body)
    group_title = dict(GROUPS)[a["group"]]
    takeaways = "".join(f"<li>{t}</li>" for t in a["takeaways"])
    tags = "".join(f"<span>{esc(t)}</span>" for t in a["tags"])
    js = "".join(_calc_js(c) for c in calcs) + "window.QUIZ=" + json.dumps(a["quiz"]) + ";" + a.get("extra_js", "")
    header = (f'<!--\nTOOL:    Vijay_Wiki — {a["title"]}\nFAMILY:  vijay-wiki\nVERSION: {a.get("version","1.0.0")}\nDATE:    {DATE}\n'
              f'CHAT:    {CHAT}\nCHANGES: {a.get("changes","1.0.0 Initial release: article, diagrams, worked examples, calculators, self-test, references")}\nSTATUS:  Published reference article\n-->')
    return f"""<!DOCTYPE html>
{header}
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(a["title"])} — Vijay_Wiki</title>
<meta name="description" content="{esc(a["desc"])}">
<style>{CSS}</style>
</head>
<body>
<header class="top">
  <button class="btn" id="btnSide" title="Show / hide contents (M)">☰ Contents</button>
  <div class="brand"><a href="index.html" style="text-decoration:none;color:inherit">Vijay<span>_Wiki</span></a></div>
  <div class="crumb">/ {esc(group_title)} / {esc(a["short"])}</div>
  <button class="btn" id="btnTheme" title="Light / dark theme">◐ Theme</button>
  <button class="btn" id="btnFull" title="Full screen (F)">⛶ Full screen</button>
</header>
<div class="layout">
<nav class="side" id="side"><h4>Contents</h4>{toc}</nav>
<main>
<h1>{esc(a["title"])}</h1>
<div class="meta">K Vijay Anand · Vijay_Wiki quick-reference article · {DATE_LONG}</div>
<div class="tags">{tags}</div>
<p class="lead">{a["lead"]}</p>
<div class="box key" id="summary"><h4>Key takeaways</h4><ul>{takeaways}</ul></div>
{full_body}
<footer>
<p><b>K Vijay Anand</b> · Vijay_Wiki · Version {a.get("version","1.0.0")}, {DATE_LONG}</p>
<p>Acknowledgement: this article was drafted with the assistance of Claude, a large language model by Anthropic, and reviewed by the author. Worked-example numbers were computed by script.</p>
<p><a href="index.html">← Vijay_Wiki home</a> · <a href="#">Back to top ↑</a></p>
</footer>
</main>
</div>
<script>{js}</script>
<script>{ENGINE}</script>
</body>
</html>
"""


def index_page(articles, extra):
    """articles: list of dicts (slug,title,group,blurb,tags,feat); extra: hand-made entries same shape"""
    allart = list(extra) + list(articles)
    secs = []
    for gid, gt in GROUPS:
        items = [a for a in allart if a["group"] == gid]
        if not items:
            continue
        cards = "".join(
            f'<a class="card" href="{a["slug"]}.html" data-k="{esc(" ".join(a["tags"]).lower())}"><h3>{esc(a["title"])}</h3>'
            f'<div>{esc(a["blurb"])}</div><div>{"".join(f"<span class=tag>{esc(t)}</span>" for t in a["tags"][:4])}</div>'
            f'<div class="feat">{esc(a.get("feat",""))}</div></a>' for a in items)
        secs.append(f'<h2 id="{gid}">{esc(gt)} <span class="muted" style="font-size:.85rem">({len(items)})</span></h2><div class="cards">{cards}</div>')
    chips = "".join(f'<a class="chip" href="#{g}">{esc(t)}</a>' for g, t in GROUPS if any(a["group"] == g for a in allart))
    return f"""<!DOCTYPE html>
<!--
TOOL:    Vijay_Wiki — Home / article index
FAMILY:  vijay-wiki
VERSION: 2.0.0
DATE:    {DATE}
CHAT:    {CHAT}
CHANGES: 2.0.0 Index generated by wiki.py: {len(allart)} articles in {len([1 for s in secs])} groups with jump chips and search; 1.0.0 Initial wiki home with first article
-->
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Vijay_Wiki — Engineering quick reference</title>
<meta name="description" content="Vijay_Wiki: short engineering quick-reference articles with diagrams, worked examples, calculators and self-test questions.">
<style>
:root{{--bg:#f7f8fa;--panel:#fff;--ink:#1d2330;--muted:#5b6475;--line:#d9dde5;--blue:#1f5fbf;--blue3:#d6e4f7;--orange:#c96a12}}
[data-theme="dark"]{{--bg:#12151b;--panel:#1b2029;--ink:#e6e9ef;--muted:#9aa3b2;--line:#2e3542;--blue:#7fb0ff;--blue3:#1e3356;--orange:#ffad5c}}
*{{box-sizing:border-box}}html{{scroll-behavior:smooth}}
body{{margin:0;background:var(--bg);color:var(--ink);font:16px/1.6 "Segoe UI",Roboto,Arial,sans-serif}}
header{{position:sticky;top:0;z-index:5;display:flex;gap:10px;align-items:center;padding:8px 16px;background:var(--panel);border-bottom:1px solid var(--line)}}
header .brand{{font-weight:700;font-size:18px;flex:1}}header .brand span{{color:var(--blue)}}
.btn{{border:1px solid var(--line);background:var(--panel);color:var(--ink);border-radius:6px;padding:5px 10px;font:inherit;font-size:14px;cursor:pointer}}
main{{padding:28px clamp(16px,3vw,48px);max-width:1600px}}
h1{{margin:0 0 4px}}.muted{{color:var(--muted)}}
input.search{{width:100%;max-width:520px;padding:9px 12px;border:1px solid var(--line);border-radius:8px;background:var(--panel);color:var(--ink);font:inherit;margin:14px 0 10px}}
.chips{{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}}a.chip{{text-decoration:none;color:var(--ink);background:var(--blue3);border-radius:14px;padding:3px 12px;font-size:14px}}
h2{{font-size:1.2rem;margin:28px 0 10px;border-bottom:2px solid var(--line);padding-bottom:4px}}
.cards{{display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:14px}}
a.card{{display:block;text-decoration:none;color:inherit;background:var(--panel);border:1px solid var(--line);border-left:5px solid var(--blue);border-radius:10px;padding:12px 15px}}
a.card:hover{{border-color:var(--blue)}}a.card h3{{margin:0 0 6px;color:var(--blue);font-size:1.05rem}}
.tag{{display:inline-block;background:var(--blue3);border-radius:12px;padding:0 9px;margin:4px 4px 0 0;font-size:12.5px}}
.feat{{font-size:13px;color:var(--muted);margin-top:6px}}
footer{{margin-top:40px;color:var(--muted);font-size:13.5px;border-top:1px solid var(--line);padding-top:12px}}
</style>
</head>
<body>
<header>
  <div class="brand">Vijay<span>_Wiki</span></div>
  <button class="btn" id="btnTheme">◐ Theme</button>
  <button class="btn" id="btnFull" title="Full screen (F)">⛶ Full screen</button>
</header>
<main>
<h1>Vijay_Wiki</h1>
<div class="muted">{len(allart)} short engineering quick-reference articles. Each has diagrams, worked examples, calculators and a self-test at the end.</div>
<input class="search" id="q" type="search" placeholder="Search articles…">
<div class="chips">{chips}</div>
{"".join(secs)}
<footer>K Vijay Anand · Vijay_Wiki · Articles drafted with the assistance of Claude (Anthropic) and reviewed by the author. For education and quick reference.</footer>
</main>
<script>
(function(){{
function store(k,v){{try{{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v);}}catch(e){{return null;}}}}
if(store("vw-theme")==="dark")document.documentElement.setAttribute("data-theme","dark");
document.getElementById("btnTheme").onclick=function(){{var d=document.documentElement.getAttribute("data-theme")==="dark";document.documentElement.setAttribute("data-theme",d?"light":"dark");store("vw-theme",d?"light":"dark");}};
function full(){{if(!document.fullscreenElement){{if(document.documentElement.requestFullscreen)document.documentElement.requestFullscreen();}}else if(document.exitFullscreen)document.exitFullscreen();}}
document.getElementById("btnFull").onclick=full;
document.addEventListener("keydown",function(e){{if(e.target.tagName!=="INPUT"&&(e.key==="f"||e.key==="F"))full();}});
document.getElementById("q").addEventListener("input",function(){{var q=this.value.toLowerCase();
  [].forEach.call(document.querySelectorAll("a.card"),function(c){{c.style.display=(c.textContent+" "+c.getAttribute("data-k")).toLowerCase().indexOf(q)>=0?"":"none";}});
  [].forEach.call(document.querySelectorAll("h2"),function(h){{var g=h.nextElementSibling;var any=[].some.call(g.querySelectorAll("a.card"),function(c){{return c.style.display!=="none";}});h.style.display=any?"":"none";g.style.display=any?"":"none";}});}});
}})();
</script>
</body>
</html>
"""
