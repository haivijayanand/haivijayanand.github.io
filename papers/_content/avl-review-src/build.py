"""
TOOL:    build.py - assembles the AVL review paper into web HTML and two-column A4 PDF
FAMILY:  aero-codes
VERSION: 1.0.0
DATE:    2026-11-28
CHAT:    AVL (Athena Vortex Lattice) technical paper - history, usage, improvements, limitations
CHANGES: 1.0.0 - first version: fills tables/numbers from results.json, embeds figures, web + print builds
"""
__version__ = "1.0.0"

import base64
import html
import json
import subprocess

D = "/home/claude/avl_paper"
r = json.load(open(f"{D}/results.json"))
body = "".join(open(f"{D}/content_{i}.html").read() for i in (1, 2, 3, 4) if __import__("os").path.exists(f"{D}/content_{i}.html"))


def img(name):
    return "data:image/png;base64," + base64.b64encode(open(f"{D}/fig/{name}", "rb").read()).decode()


def tconv():
    rows = "".join(f"<tr><td>{c['N']}</td><td>{c['CLa']:.3f}</td><td>{c['Cma']:.3f}</td><td>{c['Xnp']:.4f}</td>"
                   f"<td>{c['Cnb']:.4f}</td><td>{c['Clp']:.4f}</td></tr>" for c in r["convergence"])
    return ('<table class="tbl" id="t5"><caption>TABLE V<br/>Lattice Convergence of Key UAV Derivatives (&alpha; = 2&deg;)</caption>'
            '<thead><tr><th>Panels</th><th>C<sub>L&alpha;</sub></th><th>C<sub>m&alpha;</sub></th><th>X<sub>np</sub> [m]</th>'
            '<th>C<sub>n&beta;</sub></th><th>C<sub>lp</sub></th></tr></thead><tbody>' + rows + '</tbody></table>')


def tderiv():
    d = r["derivs"]; R = 3.141592653589793 / 180
    cols = [("CL", "C<sub>L</sub>"), ("CY", "C<sub>Y</sub>"), ("Cl", "C<sub>l</sub>"), ("Cm", "C<sub>m</sub>"), ("Cn", "C<sub>n</sub>")]
    rowsdef = [("a", "&alpha; [1/rad]", 1), ("b", "&beta; [1/rad]", 1), ("p", "p&#770;", 1), ("q", "q&#770;", 1),
               ("r", "r&#770;", 1), ("aileron", "&delta;<sub>a</sub> [1/deg]", R), ("elevator", "&delta;<sub>e</sub> [1/deg]", R),
               ("rudder", "&delta;<sub>r</sub> [1/deg]", R)]
    out = ""
    for k, lab, f in rowsdef:
        cells = ""
        for c, _ in cols:
            v = d[k][c] * f
            cells += "<td>&ndash;</td>" if abs(v) < 1e-9 else (f"<td>{v:.5f}</td>" if f != 1 else f"<td>{v:.4f}</td>")
        out += f"<tr><td>{lab}</td>{cells}</tr>"
    head = "".join(f"<th>{h}</th>" for _, h in cols)
    return ('<table class="tbl wide" id="t6"><caption>TABLE VI<br/>Stability and Control Derivatives at Trim (Stability Axes, '
            f'&alpha; = {r["trim"]["alpha"]:.2f}&deg;, X<sub>ref</sub> = 0.115 m, 873 Panels)</caption>'
            f'<thead><tr><th>w.r.t.</th>{head}</tr></thead><tbody>{out}</tbody>'
            f'<tfoot><tr><td colspan="6">Neutral point X<sub>np</sub> = {r["Xnp"]:.4f} m; static margin {100*r["static_margin"]:.1f} %; '
            f'CDi (Trefftz) = {r["trim"]["CDff"]:.5f}. &ldquo;&ndash;&rdquo; = zero by symmetry.</td></tr></tfoot></table>')


def tmodes():
    names = ["Short period", "Phugoid", "Dutch roll", "Roll subsidence", "Spiral"]
    ms = r["modes_long"] + r["modes_lat"]
    rows = ""
    for n, m in zip(names, ms):
        lam = f"{m['re']:.3f} &plusmn; {m['im']:.3f}i" if m["im"] > 1e-9 else f"{m['re']:.3f}"
        if m["im"] > 1e-9:
            ch = f"&omega;<sub>n</sub> = {m['wn']:.2f} rad/s, &zeta; = {m['zeta']:.3f}, T = {6.2831853/m['im']:.2f} s"
        elif m["re"] < 0:
            ch = f"&tau; = {1/abs(m['re']):.3f} s"
        else:
            ch = f"unstable, T<sub>2</sub> = {m['t_half_or_double']:.1f} s"
        rows += f"<tr><td>{n}</td><td>{lam}</td><td>{ch}</td></tr>"
    return ('<table class="tbl" id="t7"><caption>TABLE VII<br/>Rigid-Body Modes at Trim (V = 18 m/s)</caption>'
            '<thead><tr><th>Mode</th><th>&lambda; [1/s]</th><th>Characteristics</th></tr></thead><tbody>' + rows + '</tbody></table>')


def tsens():
    S = json.load(open(f"{D}/sens.json"))
    lab = {"dihedral": ("Dihedral", "dihedral", "&deg;"), "htail": ("H-tail semi-span", "ht_span", " m"),
           "vtail": ("Fin height", "vt_h", " m")}
    rows = ""
    for k, (nm, kw, u) in lab.items():
        for x in S[k]:
            t2 = (f"{0.6931/x['spiral']:.1f} s" if x["spiral"] > 0 else "stable")
            rows += (f"<tr><td>{nm} {x['kw'][kw]:g}{u}</td><td>{100*x['SM']:.1f}</td><td>{x['de']:.2f}</td>"
                     f"<td>{x['Cmq']:.1f}</td><td>{x['Clb']:.3f}</td><td>{x['Cnb']:.3f}</td><td>{x['Cnr']:.3f}</td>"
                     f"<td>{x['dr_wn']:.2f} / {x['dr_zeta']:.3f}</td><td>{t2}</td></tr>")
    return ('<table class="tbl wide" id="t8"><caption>TABLE IX<br/>Sensitivity of Stability to Dihedral, Tail and Fin Size '
            '(388 Panels; Baseline: 3&deg;, 0.30 m, 0.25 m)</caption><thead><tr><th>Case</th><th>SM [%]</th>'
            '<th>&delta;<sub>e,trim</sub> [deg]</th><th>C<sub>mq</sub></th><th>C<sub>l&beta;</sub></th><th>C<sub>n&beta;</sub></th>'
            '<th>C<sub>nr</sub></th><th>Dutch roll &omega;<sub>n</sub> / &zeta;</th><th>Spiral T<sub>2</sub></th></tr></thead>'
            f'<tbody>{rows}</tbody></table>')


def vlmcode():
    import ast
    src = open(f"{D}/vlm_uav.py").read(); tree = ast.parse(src)
    keep = {"seg_vel", "horseshoe_vel", "rotate"}
    parts = []
    for n in tree.body:
        if isinstance(n, ast.FunctionDef) and n.name in keep:
            parts.append(ast.get_source_segment(src, n))
        if isinstance(n, ast.ClassDef) and n.name == "VLM":
            for m in n.body:
                if isinstance(m, ast.FunctionDef) and m.name == "solve":
                    parts.append("# --- VLM.solve (method) ---\n" + __import__("textwrap").dedent(ast.get_source_segment(src, m)))
    return html.escape("\n\n".join(parts))


def tbreak():
    B = json.load(open(f"{D}/breakdown.json"))
    spec = [("CL<sub>&alpha;</sub>", "a", "CL", 3), ("C<sub>m&alpha;</sub>", "a", "Cm", 3), ("C<sub>mq</sub>", "q", "Cm", 2),
            ("C<sub>Y&beta;</sub>", "b", "CY", 4), ("C<sub>l&beta;</sub>", "b", "Cl", 4), ("C<sub>n&beta;</sub>", "b", "Cn", 4),
            ("C<sub>lp</sub>", "p", "Cl", 4), ("C<sub>np</sub>", "p", "Cn", 4), ("C<sub>lr</sub>", "r", "Cl", 4), ("C<sub>nr</sub>", "r", "Cn", 4)]
    rows = ""
    for lab, k, c, n in spec:
        vals = [B[t][k][c] for t in ("Wing", "Htail", "Vtail")]
        rows += f"<tr><td>{lab.replace('CL','C<sub>L</sub>').replace('<sub>L</sub><sub>&alpha;</sub>','<sub>L&alpha;</sub>')}</td>" + "".join(
            f"<td>{x:.{n}f}</td>" for x in vals) + f"<td>{sum(vals):.{n}f}</td></tr>"
    return ('<table class="tbl" id="t12"><caption>TABLE XII<br/>Contribution of Each Surface to Key Derivatives (Trim, 873 Panels)</caption>'
            '<thead><tr><th>Derivative</th><th>Wing</th><th>H-tail</th><th>Fin</th><th>Total</th></tr></thead><tbody>'
            + rows + '</tbody></table>')


FW = json.load(open(f"{D}/flying_wing.json"))


def tfw():
    R = 3.141592653589793 / 180
    c, f = r["derivs"], FW["derivs"]
    def m(ms, i):
        x = ms[i]
        return f"{x['wn']:.2f} / {x['zeta']:.3f}" if x["im"] > 1e-9 else (f"&tau; = {1/abs(x['re']):.3f} s" if x["re"] < 0 else f"T<sub>2</sub> = {x['t_half_or_double']:.1f} s")
    rows = [("Static margin [%]", f"{100*r['static_margin']:.1f}", f"{100*(FW['Xnp']-FW['Xcg'])/FW['mac']:.1f}"),
            ("Trim &alpha; / &delta;<sub>e</sub> [deg]", f"{r['trim']['alpha']:.2f} / {r['trim']['elevator']:.2f}", f"{FW['alpha']:.2f} / {FW['de']:.2f}"),
            ("C<sub>L&alpha;</sub>", f"{c['a']['CL']:.3f}", f"{f['a']['CL']:.3f}"), ("C<sub>m&alpha;</sub>", f"{c['a']['Cm']:.3f}", f"{f['a']['Cm']:.3f}"),
            ("C<sub>mq</sub>", f"{c['q']['Cm']:.2f}", f"{f['q']['Cm']:.2f}"),
            ("C<sub>Y&beta;</sub>", f"{c['b']['CY']:.4f}", f"{f['b']['CY']:.4f}"), ("C<sub>l&beta;</sub>", f"{c['b']['Cl']:.4f}", f"{f['b']['Cl']:.4f}"),
            ("C<sub>n&beta;</sub>", f"{c['b']['Cn']:.4f}", f"{f['b']['Cn']:.4f}"), ("C<sub>lp</sub>", f"{c['p']['Cl']:.4f}", f"{f['p']['Cl']:.4f}"),
            ("C<sub>np</sub>", f"{c['p']['Cn']:.4f}", f"{f['p']['Cn']:.4f}"), ("C<sub>lr</sub>", f"{c['r']['Cl']:.4f}", f"{f['r']['Cl']:.4f}"),
            ("C<sub>nr</sub>", f"{c['r']['Cn']:.4f}", f"{f['r']['Cn']:.4f}"),
            ("C<sub>L&delta;e</sub> [1/deg]", f"{c['elevator']['CL']*R:.5f}", f"{f['elevator']['CL']*R:.5f}"),
            ("C<sub>m&delta;e</sub> [1/deg]", f"{c['elevator']['Cm']*R:.5f}", f"{f['elevator']['Cm']*R:.5f}"),
            ("C<sub>l&delta;a</sub> [1/deg]", f"{c['aileron']['Cl']*R:.5f}", f"{f['aileron']['Cl']*R:.5f}"),
            ("C<sub>n&delta;a</sub> [1/deg]", f"{c['aileron']['Cn']*R:.5f}", f"{f['aileron']['Cn']*R:.5f}"),
            ("Short period &omega;<sub>n</sub> / &zeta;", m(r["modes_long"], 0), m(FW["modes_long"], 0)),
            ("Phugoid &omega;<sub>n</sub> / &zeta;", m(r["modes_long"], 1), m(FW["modes_long"], 1)),
            ("Dutch roll &omega;<sub>n</sub> / &zeta;", m(r["modes_lat"], 0), m(FW["modes_lat"], 0)),
            ("Roll mode", m(r["modes_lat"], 1), m(FW["modes_lat"], 1)), ("Spiral", m(r["modes_lat"], 2), m(FW["modes_lat"], 2))]
    body = "".join(f"<tr><td>{a}</td><td>{b}</td><td>{cc}</td></tr>" for a, b, cc in rows)
    return ('<table class="tbl" id="t14"><caption>TABLE XV<br/>Conventional UAV and Flying Wing Compared (Stability Axes)</caption>'
            '<thead><tr><th>Quantity</th><th>Conventional</th><th>Flying wing</th></tr></thead><tbody>' + body + '</tbody></table>')


ad = r["alphadot"]; t = r["trim"]
subs = {"{{FIG1}}": img("fig1_lattice.png"), "{{FIG2}}": img("fig2_validation.png"), "{{FIG3}}": img("fig3_alpha_sweep.png"),
        "{{FIG4}}": img("fig4_spanload.png"), "{{FIG5}}": img("fig5_eigen.png"),
        "{{TABLE_CONV}}": tconv(), "{{TABLE_SENS}}": tsens(), "{{TABLE_FW}}": tfw(), "{{FIG6}}": img("fig6_flying_wing.png"),
        "{{FW_ALPHA}}": f"{FW['alpha']:.2f}", "{{FW_E}}": f"{FW['e']:.2f}",
        "{{FW_SP}}": f"&zeta; = {FW['modes_long'][0]['zeta']:.2f}", "{{FW_DR}}": f"&zeta; = {FW['modes_lat'][0]['zeta']:.3f}", "{{TABLE_BREAK}}": tbreak(), "{{VLMCODE}}": vlmcode(), "{{TABLE_DERIV}}": tderiv(), "{{TABLE_MODES}}": tmodes(),
        "{{CLREQ}}": f"{t['CLreq']:.3f}", "{{ALPHA}}": f"{t['alpha']:.2f}", "{{DE}}": f"{t['elevator']:.2f}",
        "{{CDI}}": f"{t['CDff']:.4f}", "{{XNP}}": f"{r['Xnp']:.3f}", "{{SM}}": f"{100*r['static_margin']:.1f}",
        "{{AT}}": f"{ad['at']:.2f}", "{{VH}}": f"{ad['VH']:.2f}", "{{LTC}}": f"{ad['lt']/0.222:.2f}",
        "{{DEDA}}": f"{ad['dedA']:.2f}", "{{CMAD}}": f"{ad['Cmad']:.1f}", "{{SPZ}}": f"{ad['sp_zeta']:.2f}",
        "{{AVLFILE}}": html.escape(open(f"{D}/demo_uav.avl").read()),
        "{{MASSFILE}}": html.escape(open(f"{D}/demo_uav.mass").read())}
for k, v in subs.items():
    body = body.replace(k, v)
import re
ROM = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV"]
ids = re.findall(r'<table class="tbl[^"]*" id="([^"]+)">\s*<caption>TABLE [IVX]+<br/>', body)
num = {i: ROM[k] for k, i in enumerate(ids)}
body = re.sub(r'(<table class="tbl[^"]*" id="([^"]+)">\s*<caption>)TABLE [IVX]+<br/>',
              lambda m: f"{m.group(1)}TABLE {num[m.group(2)]}<br/>", body)
body = re.sub(r'\{\{T:([a-z0-9]+)\}\}', lambda m: f"Table {num[m.group(1)]}", body)
assert "{{" not in body, body[body.index("{{"):body.index("{{") + 40]

HEADER = """<!--
TOOL:    avl-athena-vortex-lattice-review.html - technical paper (web edition)
FAMILY:  technical-papers
VERSION: 1.0.0
DATE:    2026-11-28
CHAT:    AVL (Athena Vortex Lattice) technical paper - history, usage, improvements, limitations
CHANGES: 1.0.0 - first draft: 11 sections, worked UAV example, sensitivity study, flying-wing example, 6 figures, 16 tables, 54 references, 4 appendices
STATUS:  draft for review
-->"""

COMMON_CSS = """
.tbl{border-collapse:collapse;margin:10px auto;font-size:.86em}
.tbl caption{font-variant:small-caps;font-size:.92em;margin-bottom:4px;line-height:1.25}
.tbl th,.tbl td{border-top:1px solid #999;border-bottom:1px solid #999;padding:3px 6px;text-align:left;vertical-align:top}
.tbl thead th{border-bottom:1.5px solid #333;border-top:1.5px solid #333}
.tbl tfoot td{font-size:.9em;border-bottom:1.5px solid #333}
figure{margin:10px 0;text-align:center} figure img{max-width:100%}
figcaption{font-size:.85em;text-align:left;margin-top:3px}
.eq{text-align:center;margin:8px 0}
pre.code{font-family:'DejaVu Sans Mono',Consolas,monospace;font-size:.72em;background:#f5f5f2;border:1px solid #ddd;padding:6px;white-space:pre-wrap;line-height:1.25}
code{font-family:'DejaVu Sans Mono',Consolas,monospace;font-size:.88em}
ol.refs{font-size:.82em;padding-left:2.2em} ol.refs li{margin-bottom:2px;word-break:break-word}
"""

WEB = f"""<!DOCTYPE html>
{HEADER}
<html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>AVL in Practice: Strengths, Limits and Extensions of the Athena Vortex Lattice Code</title>
<style>
:root{{--bg:#fff;--fg:#1b1b1b;--accent:#1f4e9c;--side:#f3f5f9}}
body.dark{{--bg:#16181d;--fg:#e6e6e6;--accent:#8fb3ff;--side:#1f232b}}
body{{margin:0;background:var(--bg);color:var(--fg);font-family:'TeX Gyre Termes','Times New Roman',Georgia,serif;font-size:17px;line-height:1.55}}
#bar{{position:sticky;top:0;z-index:5;display:flex;gap:8px;align-items:center;padding:6px 14px;background:var(--side);border-bottom:1px solid #ccc;font-family:Arial,sans-serif;font-size:14px}}
#bar button,#bar a{{padding:4px 10px;border:1px solid #888;border-radius:4px;background:transparent;color:var(--fg);cursor:pointer;text-decoration:none}}
#wrap{{display:flex;max-width:1600px;margin:0 auto}}
#toc{{width:260px;flex:none;position:sticky;top:42px;height:calc(100vh - 42px);overflow:auto;padding:14px;background:var(--side);font-family:Arial,sans-serif;font-size:13px}}
#toc a{{display:block;color:var(--fg);text-decoration:none;padding:3px 0}} #toc a:hover{{color:var(--accent)}}
body.notoc #toc{{display:none}}
main{{flex:1;padding:20px 48px 60px;max-width:1150px}}
h1.title{{font-size:2em;text-align:center;margin:.3em 0 .1em}} .subtitle{{text-align:center;font-style:italic}}
.author,.date{{text-align:center;margin:.2em}} .author{{font-size:1.15em}}
h2{{color:var(--accent);font-variant:small-caps;border-bottom:1px solid #ccc;margin-top:1.6em}}
.abstract{{background:var(--side);padding:10px 18px;border-left:4px solid var(--accent)}}
figure img{{max-width:620px;background:#fff}}
body.dark .tbl th,body.dark .tbl td{{border-color:#666}} body.dark pre.code{{background:#22262e;border-color:#444}}
{COMMON_CSS}
@media(max-width:900px){{#toc{{display:none}} main{{padding:12px}}}}
</style></head>
<body>
<div id="bar"><button onclick="document.body.classList.toggle('notoc')" title="Hide/show contents (M)">&#9776; Contents</button>
<button onclick="fs()" title="Full screen (F)">&#x26F6; Full screen</button>
<button onclick="document.body.classList.toggle('dark')">&#9680; Theme</button>
<a href="avl-athena-vortex-lattice-review.pdf" download>&#11015; PDF (two-column, A4)</a></div>
<div id="wrap"><nav id="toc"><b>Contents</b>
<a href="#s1">I. Introduction</a><a href="#s2">II. Lineage of the VLM</a><a href="#s3">III. History of AVL</a>
<a href="#s4">IV. Formulation</a><a href="#s5">V. Obtaining derivatives</a><a href="#s6">VI. Current usage</a>
<a href="#s7">VII. Improvements by others</a><a href="#s8">VIII. Worked UAV example</a><a href="#s9">IX. Limitations</a>
<a href="#s10">X. The way ahead</a><a href="#s11">XI. Conclusions</a></nav>
<main>{body}</main></div>
<script>
function fs(){{if(!document.fullscreenElement)document.documentElement.requestFullscreen();else document.exitFullscreen();}}
document.addEventListener('keydown',e=>{{if(e.target.tagName==='INPUT')return;const k=e.key.toLowerCase();
if(k==='m')document.body.classList.toggle('notoc');if(k==='f')fs();}});
</script></body></html>"""
open(f"{D}/avl-athena-vortex-lattice-review.html", "w").write(WEB)

PRINT = f"""<!DOCTYPE html>
{HEADER.replace('web edition', 'print edition for PDF')}
<html lang="en"><head><meta charset="utf-8"/><title>AVL review</title>
<style>
@page{{size:A4;margin:17mm 14mm 18mm 14mm;@bottom-center{{content:counter(page);font-size:9pt}}}}
body{{font-family:'TeX Gyre Termes','Times New Roman',serif;font-size:10pt;line-height:1.24;color:#000;margin:0}}
.paper-head,.abstract{{column-span:all}}
main{{column-count:2;column-gap:6mm;text-align:justify;hyphens:auto}}
h1.title{{font-size:20pt;text-align:center;margin:0 0 4pt;line-height:1.15;font-weight:normal}}
.subtitle{{text-align:center;font-style:italic;font-size:10pt;margin:0 0 6pt}}
.author{{text-align:center;font-size:11pt;margin:2pt}} .date{{text-align:center;font-size:9pt;margin:0 0 8pt}}
.abstract{{font-size:9pt;margin-bottom:8pt;text-align:justify}} .abstract p{{margin:3pt 0}}
h2{{font-size:9.6pt;font-variant:small-caps;font-weight:normal;text-align:center;margin:9pt 0 3pt;break-after:avoid}}
h3{{font-size:9.6pt;font-style:italic;font-weight:normal;margin:6pt 0 2pt;break-after:avoid}}
p{{margin:0 0 3pt;text-indent:1em}} li p{{text-indent:0}}
ul,ol{{margin:2pt 0 4pt;padding-left:1.4em}} li{{margin-bottom:1pt}}
figure{{break-inside:avoid;margin:5pt 0}} figure img{{width:100%}}
.tbl{{break-inside:avoid;width:100%;font-size:7.6pt}} .tbl.wide{{column-span:all}}
pre.code{{font-size:6.6pt;break-inside:auto}}
.eq{{text-indent:0}}
ol.refs{{font-size:7.4pt;text-align:left}}
{COMMON_CSS}
.tbl{{font-size:7.6pt}}
</style></head><body><main>{body}</main></body></html>"""
open(f"{D}/print.html", "w").write(PRINT)
subprocess.run(["google-chrome", "--headless", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer",
                f"--print-to-pdf={D}/avl-athena-vortex-lattice-review.pdf", f"file://{D}/print.html"],
               check=True, capture_output=True, timeout=120)
print("built")
