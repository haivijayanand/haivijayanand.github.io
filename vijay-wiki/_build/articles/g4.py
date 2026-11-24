"""
TOOL:    Vijay_Wiki articles — group 4 (machine elements and mechanisms)
FAMILY:  vijay-wiki
VERSION: 1.0.0
DATE:    2026-11-24
CHAT:    claude.ai — Vijay_Wiki: build all suggested topics in groups and upload
CHANGES: 1.0.0 Initial five articles: springs, linkages, ISO 286 fits, GD&T, bolted joints
"""
import math
import numpy as np
from wiki import plot, flow, bars, fig, table, box, formula

ARTICLES = []

# =====================================================================================
# 22. COMPRESSION SPRINGS
# =====================================================================================
d, D, na, G = 2.0, 16.0, 8, 81700.0
C = D / d
k = G * d ** 4 / (8 * D ** 3 * na)
defl = 10.0
F = k * defl
KW = (4 * C - 1) / (4 * C - 4) + 0.615 / C
tau = KW * 8 * F * D / (math.pi * d ** 3)
Sut = 2211 / d ** 0.145
tall = 0.45 * Sut
nt = na + 2
Ls = nt * d

def coil_svg():
    pts = []
    for i in range(0, 161):
        x = 120 + i * 3
        y = 130 + 60 * math.sin(i / 160 * 2 * math.pi * 8)
        pts.append(f"{x:.1f},{y:.1f}")
    return ('<svg viewBox="0 0 900 260" role="img" aria-label="Helical compression spring dimensions">'
            f'<polyline points="{" ".join(pts)}" fill="none" stroke="var(--blue)" stroke-width="5"/>'
            '<line x1="100" y1="60" x2="100" y2="200" stroke="var(--ink)" stroke-width="4"/><line x1="620" y1="60" x2="620" y2="200" stroke="var(--ink)" stroke-width="4"/>'
            '<line x1="100" y1="230" x2="620" y2="230" stroke="var(--ink)" stroke-width="1.5"/><text x="360" y="252" text-anchor="middle" font-size="13" font-weight="700">free length L0</text>'
            '<line x1="660" y1="70" x2="660" y2="190" stroke="var(--orange)" stroke-width="2.5"/><text x="668" y="135" font-size="13" font-weight="700">mean diameter D</text>'
            '<g font-size="13"><text x="660" y="40">wire diameter d</text><text x="660" y="215">active coils na; total nt</text><text x="660" y="235">spring index C = D/d (4–12)</text></g>'
            '<text x="360" y="40" text-anchor="middle" font-size="13">F ←</text></svg>')

fdplot = plot([dict(pts=[(x, k * x) for x in np.linspace(0, 16, 50)], label="F = k·δ", at=8)], "deflection δ (mm)", "force F (N)", xlim=(0, 16), ylim=(0, 90), h=280,
              points=[(defl, F, f"working point {F:.0f} N"), (16, k * 16, "near solid")])

ARTICLES.append(dict(
    slug="compression-springs", group="elements",
    title="Helical Compression Springs: Rate, Stress, Wahl Factor, Solid Length and Buckling",
    short="Compression springs",
    tags=["Springs", "Machine design", "Stress", "Wahl factor"],
    desc="Design of helical compression springs: spring rate, Wahl-corrected shear stress, material strength, end types and solid length, buckling and surge frequency, with a design calculator.",
    blurb="Spring rate from wire and coil sizes, stress with the Wahl factor, allowable stress, solid length and buckling checks.",
    lead="A helical compression spring stores energy by twisting its wire. Its stiffness depends on the fourth power of wire diameter and the cube of coil diameter, so small changes in either make large differences. Good spring design checks four things: rate, stress, solid height and stability.",
    takeaways=[
        "Spring rate k = G·d⁴/(8·D³·n<sub>a</sub>). Doubling wire diameter makes the spring 16 times stiffer.",
        "Shear stress τ = K<sub>W</sub>·8FD/(πd³); the Wahl factor K<sub>W</sub> adds curvature and direct shear effects.",
        "Keep the spring index C = D/d between about 4 and 12 for manufacturability.",
        "Allowable static stress is about 45 % of tensile strength for music wire and oil-tempered wire (set removed).",
        "Check that the spring cannot reach solid height in service and that slender springs (L₀/D &gt; ~2.6 unguided) do not buckle.",
    ],
    body=f'''
<h2 id="geometry">1. Geometry and rate</h2>
{fig(coil_svg(), "Figure 1. Main dimensions of a helical compression spring.")}
{formula("k = G · d⁴ / (8 · D³ · na)              [N/mm]\nC = D / d\nK_W = (4C − 1)/(4C − 4) + 0.615 / C       (Wahl factor)\nτ = K_W · 8 · F · D / (π · d³)            [MPa]")}
{table(["End type","Total coils nt","Solid length"],[["Plain","na","(nt + 1)·d"],["Plain and ground","na + 1","nt·d"],["Squared (closed)","na + 2","(nt + 1)·d"],["Squared and ground","na + 2","nt·d"]])}

<h2 id="materials">2. Materials</h2>
{table(["Material","G (GPa)","Tensile strength (approx.)","Max temperature"],[["Music wire (ASTM A228)","81.7","S<sub>ut</sub> ≈ 2211/d<sup>0.145</sup> MPa","≈ 120 °C"],["Oil-tempered (A229)","77.2","S<sub>ut</sub> ≈ 1855/d<sup>0.187</sup> MPa","≈ 180 °C"],
["Chrome–silicon (A401)","77.2","S<sub>ut</sub> ≈ 1974/d<sup>0.108</sup> MPa","≈ 220 °C"],["Stainless 302 (A313)","69.0","S<sub>ut</sub> ≈ 1867/d<sup>0.146</sup> (d ≤ 2.5 mm)","≈ 260 °C"]])}
<p class="meta">Strength fits from Shigley's Mechanical Engineering Design (d in mm). Fatigue-loaded springs need a Goodman-type check with shot peening improving endurance.</p>

<h2 id="stability">3. Buckling and surge</h2>
<ul><li>An unguided spring with both ends on parallel flat plates is generally stable if L₀/D &lt; 5.26; with one end free to tilt the limit falls to about 2.6. Otherwise guide it on a rod or in a bore.</li>
<li>Surge (natural) frequency for both ends fixed: f = ½·√(k/m), with m the active-coil mass. Keep it above about 15–20 × the operating frequency in cyclic applications (valve springs).</li></ul>

<h2 id="example">4. Worked example</h2>
<p>Music wire d = {d} mm, D = {D:.0f} mm, n<sub>a</sub> = {na}, squared and ground ends, deflection {defl:.0f} mm.</p>
{table(["Step","Result"],[["C = D/d",f"{C:.1f}"],["k",f"<b>{k:.2f} N/mm</b>"],["F at 10 mm",f"{F:.1f} N"],["K_W",f"{KW:.3f}"],["τ",f"<b>{tau:.0f} MPa</b>"],
["S_ut (music wire)",f"{Sut:.0f} MPa"],["Allowable 0.45·S_ut",f"{tall:.0f} MPa → safety {tall/tau:.2f}"],["Solid length nt·d",f"{Ls:.0f} mm"]],num_cols=(1,))}
{fig(fdplot, "Figure 2. Force–deflection line with the working point.")}
''',
    calcs=[dict(id="spr", title="Compression spring design check",
                presets=[dict(label="Worked example", v=dict(d=2, D=16, na=8, G=81.7, x=10, A=2211, m=0.145, L0=40, ends="sg")), dict(label="Chrome-silicon valve spring", v=dict(d=4, D=28, na=6, G=77.2, x=12, A=1974, m=0.108, L0=55, ends="sg"))],
                inputs=[dict(id="d", label="Wire diameter d (mm)", value=2), dict(id="D", label="Mean coil diameter D (mm)", value=16), dict(id="na", label="Active coils na", value=8),
                        dict(id="G", label="Shear modulus G (GPa)", value=81.7), dict(id="x", label="Working deflection (mm)", value=10), dict(id="A", label="Strength constant A (MPa·mm^m)", value=2211),
                        dict(id="m", label="Strength exponent m", value=0.145), dict(id="L0", label="Free length L0 (mm)", value=40),
                        dict(id="ends", label="Ends", value="sg", options=[("p", "Plain"), ("pg", "Plain + ground"), ("s", "Squared"), ("sg", "Squared + ground")])],
                js='''var C=v.D/v.d,k=v.G*1000*Math.pow(v.d,4)/(8*Math.pow(v.D,3)*v.na),F=k*v.x,Kw=(4*C-1)/(4*C-4)+0.615/C,tau=Kw*8*F*v.D/(Math.PI*Math.pow(v.d,3));
var Sut=v.A/Math.pow(v.d,v.m),all=0.45*Sut,nt={p:v.na,pg:v.na+1,s:v.na+2,sg:v.na+2}[v.ends],Ls=(v.ends==="pg"||v.ends==="sg")?nt*v.d:(nt+1)*v.d,maxdef=v.L0-Ls,ratio=v.L0/v.D;
var pts=[];for(var i=0;i<=20;i++){var xx=maxdef*i/20;pts.push([xx,k*xx]);}
var issues=[];if(C<4||C>12)issues.push("index C outside 4–12");if(tau>all)issues.push("stress above allowable");if(v.x>maxdef)issues.push("goes solid before working deflection");if(ratio>5.26)issues.push("may buckle (L0/D > 5.26)");
return {rows:[["Spring index C",fmt(C,2)],["Rate k",fmt(k,3)+" N/mm"],["Force at deflection",fmt(F,1)+" N"],["Wahl factor",fmt(Kw,3)],["Shear stress τ",fmt(tau,0)+" MPa"],["Allowable (0.45 Sut)",fmt(all,0)+" MPa","Sut "+fmt(Sut,0)],["Solid length",fmt(Ls,1)+" mm","max deflection "+fmt(maxdef,1)],["L0/D",fmt(ratio,2)]],
verdict:issues.length?["bad","Check: "+issues.join("; ")+"."]:["ok","Rate, stress, solid length and stability checks passed."],
svg:plotSVG([{pts:pts,label:"F = k·δ to solid"}],{xlabel:"deflection (mm)",ylabel:"force (N)",xmin:0,ymin:0,marks:[[v.x,F,"working"]]}),caption:"Force–deflection up to solid length."};''')],
    quiz=[
        dict(q="If wire diameter doubles (all else equal), spring rate becomes:", o=["2×", "4×", "8×", "16×"], a=3, e="k ∝ d⁴."),
        dict(q="If mean coil diameter doubles, spring rate becomes:", o=["1/2", "1/4", "1/8", "2×"], a=2, e="k ∝ 1/D³."),
        dict(q="The Wahl factor corrects for:", o=["Temperature", "Coil curvature and direct shear", "Buckling", "End type"], a=1, e="Stress is higher on the inside of the coil."),
        dict(q="Recommended spring index range:", o=["1–3", "4–12", "15–25", "Any"], a=1, e="Low C is hard to coil; high C tangles and buckles."),
        dict(q="Squared and ground ends have total coils:", o=["na", "na + 1", "na + 2", "2na"], a=2, e="One dead coil each end."),
        dict(q="A slender unguided spring may:", o=["Overheat", "Buckle", "Rust", "Lose rate"], a=1, e="Check L0/D."),
        dict(q="d = 3 mm, D = 24 mm, na = 10, G = 80 GPa. Rate in N/mm?", num=5.86, unit="N/mm", e="80000 × 81/(8 × 13824 × 10) = 5.86 N/mm."),
        dict(q="Wahl factor for C = 6?", num=1.2525, tol=0.005, e="(23/20) + 0.615/6 = 1.150 + 0.1025 = 1.2525."),
    ],
    refs=["Budynas, R. G. and Nisbett, J. K., Shigley's Mechanical Engineering Design, 10th ed., McGraw-Hill, 2015, Ch. 10.", "EN 13906-1, Cylindrical helical springs made from round wire — Calculation and design — Compression springs.",
          "Wahl, A. M., Mechanical Springs, 2nd ed., McGraw-Hill, 1963.", "Spring Manufacturers Institute (SMI), Handbook of Spring Design."],
    links=[("Wikipedia — Coil spring", "https://en.wikipedia.org/wiki/Coil_spring")],
))

# =====================================================================================
# 23. LINKAGES
# =====================================================================================
r, l, nsl = 50.0, 200.0, 600.0
w = 2 * math.pi * nsl / 60
th = np.radians(np.arange(0, 361, 3))
x = r * np.cos(th) + np.sqrt(l ** 2 - (r * np.sin(th)) ** 2)
vel = -r * w * (np.sin(th) + r * np.sin(2 * th) / (2 * np.sqrt(l ** 2 - (r * np.sin(th)) ** 2)))
acc_max = r * w ** 2 * (1 + r / l) / 1000
scplot = plot([dict(pts=list(zip(np.degrees(th).tolist(), (x - (l - r)).tolist())), label="slider position (mm from BDC)", at=60),
               dict(pts=list(zip(np.degrees(th).tolist(), (vel / 1000 * 20 + 50).tolist())), label="velocity (scaled: 50 + 20·v [m/s])", at=250)],
              "crank angle θ (°)", "mm", xlim=(0, 360), ylim=(-30, 120), h=320)

a1, b1, c1, d1 = 40.0, 120.0, 90.0, 100.0  # crank, coupler, rocker, ground
s_, l_ = min(a1, b1, c1, d1), max(a1, b1, c1, d1)
pq = a1 + b1 + c1 + d1 - s_ - l_
grashof = s_ + l_ <= pq

def fourbar(th2):
    # positions: O2=(0,0), O4=(d,0)
    Ax, Ay = a1 * math.cos(th2), a1 * math.sin(th2)
    dx, dy = d1 - Ax, -Ay
    L = math.hypot(dx, dy)
    cosg = (b1 ** 2 + L ** 2 - c1 ** 2) / (2 * b1 * L)
    if abs(cosg) > 1:
        return None
    ang = math.atan2(dy, dx) + math.acos(cosg)
    Bx, By = Ax + b1 * math.cos(ang), Ay + b1 * math.sin(ang)
    mu = math.degrees(math.acos((b1 ** 2 + c1 ** 2 - L ** 2) / (2 * b1 * c1)))
    return Ax, Ay, Bx, By, mu

mus = [fourbar(math.radians(t))[4] for t in range(0, 361, 2)]
mu_min, mu_max = min(mus), max(mus)
Ax, Ay, Bx, By, _ = fourbar(math.radians(60))
S, ox, oy = 2.2, 250, 230
fb_svg = (f'<svg viewBox="0 0 900 330" role="img" aria-label="Four-bar linkage">'
          f'<line x1="{ox}" y1="{oy}" x2="{ox+d1*S}" y2="{oy}" stroke="var(--muted)" stroke-width="5" stroke-dasharray="10 6"/>'
          f'<line x1="{ox}" y1="{oy}" x2="{ox+Ax*S:.1f}" y2="{oy-Ay*S:.1f}" stroke="var(--orange)" stroke-width="7"/>'
          f'<line x1="{ox+Ax*S:.1f}" y1="{oy-Ay*S:.1f}" x2="{ox+Bx*S:.1f}" y2="{oy-By*S:.1f}" stroke="var(--blue)" stroke-width="7"/>'
          f'<line x1="{ox+d1*S}" y1="{oy}" x2="{ox+Bx*S:.1f}" y2="{oy-By*S:.1f}" stroke="var(--purple)" stroke-width="7"/>'
          + "".join(f'<circle cx="{px:.1f}" cy="{py:.1f}" r="7" fill="var(--panel)" stroke="var(--ink)" stroke-width="3"/>' for px, py in [(ox, oy), (ox + d1 * S, oy), (ox + Ax * S, oy - Ay * S), (ox + Bx * S, oy - By * S)])
          + f'<text x="{ox+d1*S/2}" y="{oy+25}" text-anchor="middle" font-size="13">ground d = {d1:.0f}</text>'
          f'<text x="{ox+Ax*S/2-70}" y="{oy-Ay*S/2}" font-size="13" font-weight="700">crank a = {a1:.0f}</text>'
          f'<text x="{ox+(Ax+Bx)*S/2}" y="{oy-(Ay+By)*S/2-14}" text-anchor="middle" font-size="13" font-weight="700">coupler b = {b1:.0f}</text>'
          f'<text x="{ox+d1*S+15}" y="{oy-By*S/2}" font-size="13" font-weight="700">rocker c = {c1:.0f}</text>'
          f'<text x="680" y="60" font-size="13">Grashof: s + l ≤ p + q</text><text x="680" y="82" font-size="13">{s_:.0f} + {l_:.0f} ≤ {pq:.0f} → {"yes" if grashof else "no"}</text>'
          f'<text x="680" y="110" font-size="13">transmission angle μ:</text><text x="680" y="132" font-size="13">{mu_min:.0f}° to {mu_max:.0f}°</text></svg>')

ARTICLES.append(dict(
    slug="four-bar-and-slider-crank-linkages", group="elements",
    title="Four-Bar and Slider-Crank Linkages: Grashof Condition, Transmission Angle and Kinematics",
    short="Linkages",
    tags=["Mechanisms", "Kinematics", "Four-bar", "Slider-crank"],
    desc="Planar linkage basics: mobility, Grashof's condition and four-bar types, transmission angle limits, slider-crank position, velocity and acceleration, with an interactive four-bar analyser.",
    blurb="Classifying four-bar linkages, keeping transmission angles healthy, and slider-crank motion for engines, pumps and presses.",
    lead="Linkages convert one motion into another using rigid links and pin or slider joints. The four-bar linkage and the slider-crank are the building blocks of engines, pumps, presses, wipers and countless machines. A few simple checks decide whether a linkage can rotate fully, how well it transmits force, and how fast its parts accelerate.",
    takeaways=[
        "Planar mobility (Grübler): M = 3(n − 1) − 2j₁ − j₂. A four-bar has M = 1: one input drives it.",
        "Grashof: if s + l ≤ p + q, at least one link can rotate fully; the shortest link's position decides the type.",
        "Keep the transmission angle μ between about 40° and 140°; near 0° or 180° the linkage locks or needs huge forces.",
        "Slider-crank: x = r·cos θ + √(l² − r²·sin² θ); peak acceleration ≈ r·ω²·(1 + r/l) at top dead centre.",
        "Short connecting rods (small l/r) add strong second-order (2×) acceleration and vibration.",
    ],
    body=f'''
<h2 id="mobility">1. Mobility</h2>
{formula("M = 3·(n − 1) − 2·j1 − j2     n = links (incl. ground), j1 = full joints (pin, slider), j2 = half joints (cam, gear contact)")}

<h2 id="fourbar">2. The four-bar linkage</h2>
{fig(fb_svg, "Figure 1. Four-bar linkage drawn to scale at θ = 60°, with its Grashof check and transmission angle range over a full crank turn.")}
{table(["Grashof case (s + l ≤ p + q)","Shortest link is","Type"],[["Yes","Crank (adjacent to ground)","Crank–rocker"],["Yes","Ground","Double crank (drag link)"],["Yes","Coupler","Double rocker"],["No (s + l &gt; p + q)","Any","Triple rocker: no link rotates fully"],["s + l = p + q","—","Change-point: can flip branch; avoid or guide"]])}
<p><b>Transmission angle</b> μ is the angle between coupler and output link. Force transmitted to the output is proportional to sin μ, so designers keep μ<sub>min</sub> ≥ 40° (≥ 30° for light loads).</p>

<h2 id="slider">3. The slider-crank</h2>
{formula("x(θ) = r·cos θ + √(l² − r²·sin² θ)\nv ≈ −r·ω·(sin θ + (r/2l)·sin 2θ)\na ≈ −r·ω²·(cos θ + (r/l)·cos 2θ)      peak ≈ r·ω²·(1 + r/l) at θ = 0")}
{fig(scplot, f"Figure 2. Slider position and (scaled) velocity for r = {r:.0f} mm, l = {l:.0f} mm at {nsl:.0f} rpm. The motion is not sinusoidal because of the finite rod length.")}
<p>Example: r = {r:.0f} mm, l = {l:.0f} mm, {nsl:.0f} rpm → ω = {w:.1f} rad/s, stroke {2*r:.0f} mm, peak acceleration ≈ <b>{acc_max:.0f} m/s²</b> ({acc_max/9.81:.0f} g). Inertia force = mass × acceleration, which is why piston mass and speed limit engine and compressor design.</p>

<h2 id="design">4. Design tips</h2>
<ul><li>Use the crank–rocker for converting rotation into oscillation (wipers, rocking conveyors); check μ<sub>min</sub> and the time ratio of forward and return strokes.</li>
<li>Toggle positions (μ near 0° or 180°) give huge mechanical advantage: used deliberately in clamps and presses.</li>
<li>Coupler points trace complex curves (coupler curves) useful for path generation.</li>
<li>Balance reciprocating masses with counterweights; first-order forces can be balanced on the crank, second-order needs balance shafts.</li></ul>
''',
    calcs=[dict(id="fb", title="Four-bar analyser (Grashof, transmission angle, output angle)",
                presets=[dict(label="Crank–rocker 40/120/90/100", v=dict(a=40, b=120, c=90, d=100, th=60)), dict(label="Drag link 100/120/110/40", v=dict(a=100, b=120, c=110, d=40, th=60)), dict(label="Non-Grashof 80/60/70/100", v=dict(a=80, b=60, c=70, d=100, th=60))],
                inputs=[dict(id="a", label="Input link a (mm)", value=40), dict(id="b", label="Coupler b (mm)", value=120), dict(id="c", label="Output link c (mm)", value=90), dict(id="d", label="Ground d (mm)", value=100), dict(id="th", label="Input angle θ (°)", value=60)],
                js='''var L=[v.a,v.b,v.c,v.d],s=Math.min.apply(null,L),l=Math.max.apply(null,L),pq=v.a+v.b+v.c+v.d-s-l,g=s+l<=pq+1e-9;
var type=!g?"triple rocker (non-Grashof)":(s===v.a?"crank–rocker":(s===v.d?"double crank":(s===v.b?"double rocker":"rocker–crank")));
function pos(t){var Ax=v.a*Math.cos(t),Ay=v.a*Math.sin(t),dx=v.d-Ax,dy=-Ay,D=Math.hypot(dx,dy),cg=(v.b*v.b+D*D-v.c*v.c)/(2*v.b*D);if(Math.abs(cg)>1)return null;
var an=Math.atan2(dy,dx)+Math.acos(cg),Bx=Ax+v.b*Math.cos(an),By=Ay+v.b*Math.sin(an),mu=Math.acos((v.b*v.b+v.c*v.c-D*D)/(2*v.b*v.c))*180/Math.PI,out=Math.atan2(By,Bx-v.d)*180/Math.PI;return [mu,out];}
var pts=[],po=[],mn=999,mx=-999,miss=0;for(var t=0;t<=360;t+=2){var p=pos(t*Math.PI/180);if(p){pts.push([t,p[0]]);po.push([t,p[1]]);mn=Math.min(mn,p[0]);mx=Math.max(mx,p[0]);}else miss++;}
var cur=pos(v.th*Math.PI/180);
return {rows:[["Grashof",g?"yes":"no",fmt(s,0)+" + "+fmt(l,0)+" vs "+fmt(pq,0)],["Type",type],["μ at θ",cur?fmt(cur[0],1)+"°":"cannot assemble"],["Output angle at θ",cur?fmt(cur[1],1)+"°":"—"],["μ range (reachable)",fmt(mn,1)+"° – "+fmt(mx,1)+"°",miss?("input cannot reach "+miss*2+"° of the circle"):"full input rotation"]],
verdict:(mn<40||mx>140)?["caution","Transmission angle goes outside 40–140°: expect poor force transmission there."]:["ok","Transmission angle stays within 40–140°."],
svg:plotSVG([{pts:pts,label:"μ (°)"},{pts:po,label:"output angle (°)"}],{xlabel:"input angle θ (°)",ylabel:"degrees",xmin:0,xmax:360}),caption:"Transmission angle and output link angle over the input rotation."};''')],
    quiz=[
        dict(q="Mobility of a four-bar linkage is:", o=["0", "1", "2", "3"], a=1, e="M = 3(4−1) − 2×4 = 1."),
        dict(q="Grashof's condition is:", o=["s + l ≥ p + q", "s + l ≤ p + q", "s = l", "p = q"], a=1, e="At least one link fully rotates when s + l ≤ p + q."),
        dict(q="In a Grashof linkage, if the shortest link is the ground, the type is:", o=["Crank–rocker", "Double crank", "Double rocker", "Triple rocker"], a=1, e="Both side links rotate fully."),
        dict(q="Recommended minimum transmission angle:", o=["5°", "20°", "40°", "90°"], a=2, e="≈ 40° or more."),
        dict(q="A short connecting rod (small l/r) increases:", o=["First-order forces only", "Second-order (2×) acceleration", "Stroke", "Mobility"], a=1, e="The r/l term multiplies cos 2θ."),
        dict(q="Toggle positions are used in clamps because:", o=["They move fast", "They give very high mechanical advantage", "They are light", "They reduce wear"], a=1, e="Near μ = 0/180° small input force gives large output."),
        dict(q="Links 30, 70, 60, 80. Is s + l (110) ≤ p + q? Enter p + q.", num=130, e="70 + 60 = 130 ≥ 110 → Grashof."),
        dict(q="r = 40 mm, l = 160 mm, 1500 rpm. Peak slider acceleration (m/s²)?", num=1233.7, unit="m/s²", e="ω = 157.1; 0.04 × 157.1² × 1.25 = 1,234 m/s²."),
    ],
    refs=["Norton, R. L., Design of Machinery, 6th ed., McGraw-Hill, 2019.", "Uicker, J. J., Pennock, G. R. and Shigley, J. E., Theory of Machines and Mechanisms, 5th ed., Oxford University Press, 2017.",
          "Erdman, A. G. and Sandor, G. N., Mechanism Design: Analysis and Synthesis, Prentice Hall.", "Rattan, S. S., Theory of Machines, McGraw-Hill Education (India)."],
    links=[("Wikipedia — Four-bar linkage", "https://en.wikipedia.org/wiki/Four-bar_linkage"), ("Wikipedia — Slider-crank linkage", "https://en.wikipedia.org/wiki/Slider-crank_linkage")],
))

# =====================================================================================
# 24. ISO 286 FITS
# =====================================================================================
dn = 50.0
fits = [("H7/g6 sliding", (0, 25), (-25, -9)), ("H7/h6 locating", (0, 25), (-16, 0)), ("H7/k6 transition", (0, 25), (2, 18)), ("H7/p6 interference", (0, 25), (26, 42))]
fitrows = []
for name, h, s in fits:
    mx_cl = h[1] - s[0]
    mn_cl = h[0] - s[1]
    fitrows.append([name, f"H7: 0 / +25", f"{s[0]:+d} / {s[1]:+d}", f"{mn_cl:+d}", f"{mx_cl:+d}"])

def zone_svg():
    o = ['<svg viewBox="0 0 900 300" role="img" aria-label="Tolerance zones for 50 mm fits">']
    Y0, scale = 170, 2.6
    o.append(f'<line x1="40" y1="{Y0}" x2="860" y2="{Y0}" stroke="var(--ink)" stroke-width="2"/><text x="855" y="{Y0+18}" text-anchor="end" font-size="12.5">zero line (50.000 mm)</text>')
    for i, (name, h, s) in enumerate(fits):
        x = 120 + i * 190
        o.append(f'<rect x="{x}" y="{Y0-h[1]*scale}" width="60" height="{(h[1]-h[0])*scale}" fill="var(--blue3)" stroke="var(--blue)" stroke-width="2"/>')
        o.append(f'<rect x="{x+70}" y="{Y0-s[1]*scale}" width="60" height="{(s[1]-s[0])*scale}" fill="var(--orange3)" stroke="var(--orange)" stroke-width="2"/>')
        o.append(f'<text x="{x+65}" y="280" text-anchor="middle" font-size="13" font-weight="700">{name}</text>')
        o.append(f'<text x="{x+30}" y="{Y0-h[1]*scale-6}" text-anchor="middle" font-size="11.5">hole</text><text x="{x+100}" y="{Y0-s[1]*scale-6}" text-anchor="middle" font-size="11.5">shaft</text>')
    o.append('<text x="860" y="30" text-anchor="end" font-size="12.5">deviations in µm, 1 µm = 2.6 px</text></svg>')
    return "".join(o)

dpf, dlt, Do, Lf, mu_f, E = 50.0, 0.030, 100.0, 40.0, 0.15, 210000.0
pfit = E * dlt / (2 * dpf) * (1 - (dpf / Do) ** 2)
Tfit = mu_f * pfit * math.pi * dpf * Lf * dpf / 2 / 1000

ARTICLES.append(dict(
    slug="iso-286-fits-and-tolerances", group="elements",
    title="ISO 286 Limits and Fits: IT Grades, Fundamental Deviations and Choosing a Fit",
    short="ISO 286 fits",
    tags=["Tolerances", "ISO 286", "Fits", "Drawing"],
    desc="ISO 286 system of limits and fits: IT grades, fundamental deviations, hole-basis fits from clearance to interference, a fit calculator and press-fit pressure and torque.",
    blurb="Reading H7/g6 and friends: IT grades, deviations, clearance and interference, and what holding torque a press fit gives.",
    lead="A fit describes how a shaft and a hole go together: free to run, located snugly, or pressed. ISO 286 codes this with a letter for the position of the tolerance zone and a number for its size (the IT grade). Knowing a handful of standard fits covers most machine design.",
    takeaways=[
        "Capital letters are holes, small letters are shafts; H (hole) and h (shaft) have zero fundamental deviation.",
        "The IT number sets the tolerance width: IT6 ≈ 16 µm and IT7 ≈ 25 µm at 50 mm. Each IT step is about 1.6 ×.",
        "Hole-basis system (H holes) is preferred because reamers and plug gauges are standardised.",
        "Common choices: H7/g6 sliding, H7/h6 locating, H7/k6 transition (bearings on shafts), H7/p6 light press, H7/s6 press.",
        "Interference pressure p ≈ E·δ/(2d)·(1 − (d/D<sub>o</sub>)²) for equal materials; holding torque T = μ·p·π·d·L·d/2.",
    ],
    body=f'''
<h2 id="system">1. The system</h2>
{formula("Standard tolerance factor  i = 0.45·∛D + 0.001·D     (µm, D = geometric mean of size range in mm)\nIT5 = 7i   IT6 = 10i   IT7 = 16i   IT8 = 25i   IT9 = 40i   IT10 = 64i   IT11 = 100i\nShaft: es = upper deviation, ei = lower;  Hole: ES, EI.   ei = es − IT,  ES = EI + IT")}
{table(["Size range (mm)","IT6","IT7","IT8","IT9","IT11"],[["10–18","11","18","27","43","110"],["18–30","13","21","33","52","130"],["30–50","16","25","39","62","160"],["50–80","19","30","46","74","190"],["80–120","22","35","54","87","220"],["120–180","25","40","63","100","250"]],num_cols=(1,2,3,4,5))}

<h2 id="fits">2. Common hole-basis fits</h2>
{table(["Fit","Type","Typical use"],[["H11/c11","Loose running","Agricultural, dirty conditions"],["H9/d9","Free running","Large temperature variations, idlers"],["H8/f7","Close running","Gearbox shafts in plain bearings"],["H7/g6","Sliding","Spigots, locating pins that must slide"],
["H7/h6","Locational clearance","Parts assembled by hand, accurately located"],["H7/k6","Transition","Rolling bearings on rotating shafts (light loads), gears, couplings"],["H7/n6","Transition (tighter)","Firm location, mallet assembly"],
["H7/p6","Light interference","Bushes, locating without torque transmission"],["H7/s6","Medium press","Permanent hubs, torque by friction"],["H7/u6","Heavy / shrink","Shrink fits; heating required"]])}

<h2 id="example">3. Worked example at 50 mm</h2>
{fig(zone_svg(), "Figure 1. Tolerance zones for four 50 mm fits drawn to scale: hole (blue, H7) and shaft (orange). Gaps are clearance; overlaps are possible interference.")}
{table(["Fit","Hole limits (µm)","Shaft limits (µm)","Min clearance (µm)","Max clearance (µm)"], fitrows, num_cols=(3,4))}
<p>Negative clearance is interference. H7/k6 can give either a small clearance or a small interference depending on the actual parts.</p>

<h2 id="pressfit">4. Press-fit pressure and torque</h2>
{formula("p = E·δ / (2·d) · (1 − (d/Do)²)         (solid steel shaft, steel hub of outside diameter Do)\nT = μ · p · π · d · L · d/2               μ ≈ 0.1–0.2 (dry steel, pressed)\nAssembly force F ≈ μ · p · π · d · L;  heating the hub by ΔT = δ/(α·d) + clearance allows shrink fitting")}
<p>Example: d = {dpf:.0f} mm, interference δ = {dlt*1000:.0f} µm, hub D<sub>o</sub> = {Do:.0f} mm, length {Lf:.0f} mm, μ = {mu_f}: p = <b>{pfit:.1f} MPa</b>, holding torque ≈ <b>{Tfit:.0f} N·m</b>.</p>
''',
    calcs=[dict(id="fit", title="ISO 286 fit calculator (formula-based) and press-fit torque",
                note="Deviations are computed from the ISO 286 formulae and may differ from the printed tables by 1–2 µm; confirm critical fits against the standard's tables.",
                presets=[dict(label="50 H7/g6", v=dict(D=50, hit="7", sh="g", sit="6", Do=100, L=40, mu=0.15)), dict(label="50 H7/k6", v=dict(D=50, hit="7", sh="k", sit="6", Do=100, L=40, mu=0.15)), dict(label="80 H7/s6", v=dict(D=80, hit="7", sh="s", sit="6", Do=140, L=60, mu=0.15))],
                inputs=[dict(id="D", label="Nominal size (mm)", value=50), dict(id="hit", label="Hole H grade IT", value="7", options=[(str(i), f"H{i}") for i in [6, 7, 8, 9, 11]]),
                        dict(id="sh", label="Shaft letter", value="g", options=[("c", "c"), ("d", "d"), ("f", "f"), ("g", "g"), ("h", "h"), ("js", "js"), ("k", "k"), ("n", "n"), ("p", "p"), ("s", "s")]),
                        dict(id="sit", label="Shaft IT grade", value="6", options=[(str(i), f"IT{i}") for i in [5, 6, 7, 8, 9, 11]]),
                        dict(id="Do", label="Hub outside diameter (mm)", value=100), dict(id="L", label="Fit length (mm)", value=40), dict(id="mu", label="Friction μ", value=0.15)],
                js='''var R=[1,3,6,10,18,30,50,80,120,180,250,315,400,500],lo=1,hi=3;for(var i=0;i<R.length-1;i++){if(v.D>R[i]&&v.D<=R[i+1]){lo=R[i];hi=R[i+1];}}if(v.D<=3){lo=1;hi=3;}
var Dm=Math.sqrt(lo*hi),ii=0.45*Math.cbrt(Dm)+0.001*Dm,mult={5:7,6:10,7:16,8:25,9:40,11:100};function IT(n){return mult[n]*ii;}
var H=IT(+v.hit),Ts=IT(+v.sit),es,ei;
switch(v.sh){case"c":es=Dm<=40?-52*Math.pow(Dm,0.2):-(95+0.8*Dm);ei=es-Ts;break;case"d":es=-16*Math.pow(Dm,0.44);ei=es-Ts;break;case"f":es=-5.5*Math.pow(Dm,0.41);ei=es-Ts;break;
case"g":es=-2.5*Math.pow(Dm,0.34);ei=es-Ts;break;case"h":es=0;ei=-Ts;break;case"js":es=Ts/2;ei=-Ts/2;break;case"k":ei=(+v.sit>=4&&+v.sit<=7)?0.6*Math.cbrt(Dm):0;es=ei+Ts;break;
case"n":ei=5*Math.pow(Dm,0.34);es=ei+Ts;break;case"p":ei=IT(7)+(Dm<=50?1:(Dm<=180?2:3));es=ei+Ts;break;case"s":ei=Dm<=50?IT(8)+2:IT(7)+0.4*Dm;es=ei+Ts;break;}
var cmax=H-ei,cmin=0-es,kind=cmin>=0?"clearance":(cmax<=0?"interference":"transition");
var dl=Math.max(-cmin,0)/1000,p=210000*dl/(2*v.D)*(1-Math.pow(v.D/v.Do,2)),T=v.mu*p*Math.PI*v.D*v.L*v.D/2/1000;
return {rows:[["Hole H"+v.hit,"0 / +"+fmt(H,0)+" µm"],["Shaft "+v.sh+v.sit,fmt(ei,0)+" / "+fmt(es,0)+" µm","ei / es"],["Max clearance",fmt(cmax,0)+" µm"],["Min clearance",fmt(cmin,0)+" µm","negative = interference"],["Fit type",kind],["Press pressure (max interference)",kind==="clearance"?"—":fmt(p,1)+" MPa"],["Holding torque (max interference)",kind==="clearance"?"—":fmt(T,0)+" N·m"]]};''')],
    quiz=[
        dict(q="In 'H7/g6', the H7 refers to:", o=["The shaft", "The hole", "Surface finish", "Material"], a=1, e="Capital letter = hole."),
        dict(q="The fundamental deviation of an H hole is:", o=["Positive", "Zero (lower limit = nominal)", "Negative", "Depends on IT"], a=1, e="EI = 0 for H."),
        dict(q="Which fit is typical for a rolling bearing inner ring on a rotating shaft (light load)?", o=["H7/c11", "H7/g6", "k6 / js6 shaft", "H11/d9"], a=2, e="A light interference/transition fit prevents creep."),
        dict(q="A transition fit can produce:", o=["Only clearance", "Only interference", "Either clearance or interference", "Neither"], a=2, e="Zones overlap."),
        dict(q="Why is the hole-basis system preferred?", o=["Holes are easier to gauge and ream to standard sizes", "Shafts are cheaper", "ISO forbids shaft basis", "No reason"], a=0, e="Standard reamers and plug gauges."),
        dict(q="Going from IT6 to IT7 widens the tolerance by about:", o=["10 %", "60 %", "200 %", "Not at all"], a=1, e="16i/10i = 1.6."),
        dict(q="At 50 mm, H7 (0/+25) and g6 (−25/−9). Maximum clearance in µm?", num=50, unit="µm", e="25 − (−25) = 50 µm."),
        dict(q="Steel hub, d = 40 mm, Do = 80 mm, δ = 0.02 mm. Contact pressure (MPa)?", num=39.375, unit="MPa", e="210000 × 0.02/80 × 0.75 = 39.4 MPa."),
    ],
    refs=["ISO 286-1:2010 and ISO 286-2:2010, Geometrical product specifications — ISO code system for tolerances on linear sizes.", "BS EN 20286 / ANSI B4.2, Preferred metric limits and fits.",
          "Budynas, R. G. and Nisbett, J. K., Shigley's Mechanical Engineering Design, 10th ed., Ch. 7 (limits and fits).", "Machinery's Handbook, 31st ed., Industrial Press."],
    links=[("Wikipedia — Engineering fit", "https://en.wikipedia.org/wiki/Engineering_fit")],
))

# =====================================================================================
# 25. GD&T BASICS
# =====================================================================================
gdt_svg = '''<svg viewBox="0 0 900 300" role="img" aria-label="Feature control frame and tolerance zones">
<g transform="translate(40,40)"><rect x="0" y="0" width="60" height="44" fill="var(--panel)" stroke="var(--ink)" stroke-width="2"/><text x="30" y="30" text-anchor="middle" font-size="24">⌖</text>
<rect x="60" y="0" width="130" height="44" fill="var(--panel)" stroke="var(--ink)" stroke-width="2"/><text x="125" y="29" text-anchor="middle" font-size="18">⌀0.2 Ⓜ</text>
<rect x="190" y="0" width="44" height="44" fill="var(--panel)" stroke="var(--ink)" stroke-width="2"/><text x="212" y="29" text-anchor="middle" font-size="18">A</text>
<rect x="234" y="0" width="44" height="44" fill="var(--panel)" stroke="var(--ink)" stroke-width="2"/><text x="256" y="29" text-anchor="middle" font-size="18">B</text>
<rect x="278" y="0" width="44" height="44" fill="var(--panel)" stroke="var(--ink)" stroke-width="2"/><text x="300" y="29" text-anchor="middle" font-size="18">C</text>
<g font-size="12.5"><text x="30" y="65" text-anchor="middle">symbol</text><text x="125" y="65" text-anchor="middle">zone ⌀, modifier</text><text x="256" y="65" text-anchor="middle">datums (order matters)</text></g></g>
<g transform="translate(520,30)"><rect x="0" y="40" width="140" height="140" fill="var(--orange3)" stroke="var(--orange)" stroke-width="2.5"/><circle cx="70" cy="110" r="99" fill="none" stroke="var(--blue)" stroke-width="3"/>
<circle cx="70" cy="110" r="4" fill="var(--ink)"/><text x="70" y="235" text-anchor="middle" font-size="12.5">±0.1 square zone (orange)</text><text x="70" y="254" text-anchor="middle" font-size="12.5">⌀0.28 circle through its corners (blue): +57 % area</text>
<text x="210" y="90" font-size="13">Positional deviation</text><text x="210" y="110" font-size="13">= 2·√(Δx² + Δy²)</text></g>
</svg>'''

hole, mmc, ptol = 10.08, 10.0, 0.2
bonus = hole - mmc
allowed = ptol + bonus
dx, dy = 0.06, 0.09
dev = 2 * math.hypot(dx, dy)

ARTICLES.append(dict(
    slug="gdt-basics", group="elements",
    title="GD&T Basics: Symbols, Datums, Feature Control Frames, MMC and Bonus Tolerance",
    short="GD&T basics",
    tags=["GD&T", "ASME Y14.5", "ISO 1101", "Drawing"],
    desc="Geometric dimensioning and tolerancing essentials: the 14 characteristic symbols, datum reference frames, reading a feature control frame, position tolerance, MMC bonus and fastener formulas.",
    blurb="The symbols, datums and feature control frames of GD&T, with position tolerance, MMC bonus and the floating/fixed fastener formulas.",
    lead="Plus-minus dimensions control size well but describe form, orientation and location poorly: a ±0.1 mm square zone for a hole position is both too strict at the corners and ambiguous about where measurement starts. Geometric dimensioning and tolerancing (ASME Y14.5, ISO GPS/ISO 1101) defines tolerance zones relative to datums, so the drawing states exactly what the function needs.",
    takeaways=[
        "Four control types: form (no datum), orientation, location and runout (all need datums); profile can be either.",
        "Datums A, B, C build a reference frame (3-2-1 contact): primary constrains three degrees of freedom, secondary two, tertiary one.",
        "A diametral position zone (⌀) has 57 % more area than the equivalent ± square zone and matches how round parts fit.",
        "At MMC (Ⓜ) the tolerance grows by the amount the feature departs from its maximum material size: bonus tolerance.",
        "Fastener formulas: floating T = H − F; fixed T = (H − F)/2, with H the hole MMC and F the fastener MMC.",
    ],
    body=f'''
<h2 id="symbols">1. The characteristic symbols</h2>
{table(["Type","Characteristic","Symbol","Datum needed?"],[["Form","Straightness","⏤","No"],["Form","Flatness","⏥","No"],["Form","Circularity (roundness)","○","No"],["Form","Cylindricity","⌭","No"],
["Profile","Profile of a line","⌒","Optional"],["Profile","Profile of a surface","⌓","Optional"],["Orientation","Perpendicularity","⟂","Yes"],["Orientation","Angularity","∠","Yes"],["Orientation","Parallelism","∥","Yes"],
["Location","Position","⌖","Usually"],["Location","Concentricity / symmetry","◎ / ⌯","Yes (removed in ASME Y14.5-2018; still in ISO)"],["Runout","Circular runout","↗","Yes"],["Runout","Total runout","⌰","Yes"]])}

<h2 id="fcf">2. Reading a feature control frame</h2>
{fig(gdt_svg, "Figure 1. A feature control frame for position, and why a diametral zone suits holes better than a ± square zone.")}
<p>Read it as: "The axis of this hole must lie within a cylindrical zone ⌀0.2 at maximum material condition, located at its basic (theoretically exact, boxed) dimensions from datums A, then B, then C."</p>
{table(["Modifier","Meaning"],[["Ⓜ MMC","Maximum material condition: smallest hole / largest pin. Bonus tolerance as the feature departs from MMC."],["Ⓛ LMC","Least material condition: protects minimum wall thickness."],["(none) RFS","Regardless of feature size: no bonus (default in ASME Y14.5-2009 onward)."],["Ⓟ","Projected tolerance zone (threaded holes for studs)"],["Ⓕ","Free state (flexible parts)"],["CZ","Combined zone across several features"]])}

<h2 id="datums">3. Datums</h2>
<p>Datum features are real surfaces; datums are the perfect planes, axes or points simulated from them by inspection equipment. Choose datums that match how the part is located in assembly: the mounting face as A, a locating bore or edge as B, an anti-rotation feature as C.</p>

<h2 id="example">4. Worked example: position with MMC bonus</h2>
<p>Hole ⌀10.0 +0.1/0 with position ⌀0.2 Ⓜ. Measured hole size ⌀{hole}, centre offsets Δx = {dx}, Δy = {dy} mm from true position.</p>
{table(["Step","Result"],[["Bonus = actual − MMC",f"{bonus:.2f} mm"],["Allowed position tolerance",f"⌀{allowed:.2f}"],["Actual positional deviation 2√(Δx²+Δy²)",f"⌀{dev:.3f}"],["Verdict",f"<b>{'accept' if dev <= allowed else 'reject'}</b> ({dev:.3f} ≤ {allowed:.2f})"]],num_cols=(1,))}
{formula("Floating fastener (clearance holes in both parts):  T = H − F\nFixed fastener (one part threaded):                T = (H − F) / 2\nVirtual condition (hole) = MMC size − geometric tolerance at MMC")}
''',
    calcs=[dict(id="pos", title="Position check with MMC bonus, and fastener tolerance",
                presets=[dict(label="Worked example", v=dict(mmc=10.0, act=10.08, tol=0.2, dx=0.06, dy=0.09, H=10.0, F=9.6, mode="float")), dict(label="Fixed fastener M8", v=dict(mmc=9.0, act=9.05, tol=0.3, dx=0.1, dy=0.08, H=9.0, F=8.0, mode="fixed"))],
                inputs=[dict(id="mmc", label="Hole MMC size (mm)", value=10.0), dict(id="act", label="Actual hole size (mm)", value=10.08), dict(id="tol", label="Position tolerance at MMC ⌀ (mm)", value=0.2),
                        dict(id="dx", label="Measured Δx (mm)", value=0.06), dict(id="dy", label="Measured Δy (mm)", value=0.09), dict(id="H", label="Hole MMC H for fastener (mm)", value=10.0), dict(id="F", label="Fastener MMC F (mm)", value=9.6),
                        dict(id="mode", label="Fastener case", value="float", options=[("float", "Floating"), ("fixed", "Fixed")])],
                js='''var b=Math.max(v.act-v.mmc,0),al=v.tol+b,dev=2*Math.hypot(v.dx,v.dy),T=v.mode==="float"?v.H-v.F:(v.H-v.F)/2,sq=al/Math.SQRT2;
return {rows:[["Bonus tolerance",fmt(b,3)+" mm"],["Allowed ⌀",fmt(al,3)+" mm"],["Actual deviation ⌀",fmt(dev,3)+" mm"],["Equivalent ± square (inscribed)","±"+fmt(sq/2,3)+" mm"],["Fastener formula tolerance ⌀",fmt(T,3)+" mm",v.mode]],
verdict:v.act<v.mmc?["bad","Hole is undersize (below MMC): reject on size."]:(dev<=al?["ok","Position within tolerance including bonus."]:["bad","Position out of tolerance."])};''')],
    quiz=[
        dict(q="Which control never uses a datum?", o=["Position", "Flatness", "Perpendicularity", "Runout"], a=1, e="Form controls stand alone."),
        dict(q="The primary datum constrains how many degrees of freedom (prismatic part)?", o=["1", "2", "3", "6"], a=2, e="3-2-1 rule."),
        dict(q="MMC of a hole is its:", o=["Largest size", "Smallest size", "Nominal size", "Average size"], a=1, e="Most material = smallest hole."),
        dict(q="Bonus tolerance applies when:", o=["RFS is specified", "MMC is specified and the feature departs from MMC", "Always", "Never"], a=1, e="Only with Ⓜ (or Ⓛ)."),
        dict(q="A diametral zone vs a ± square zone of the same width across flats has:", o=["Less area", "57 % more area", "Same area", "Double area"], a=1, e="Circle through the square's corners."),
        dict(q="Boxed (basic) dimensions are:", o=["Toleranced ±0.1", "Theoretically exact, toleranced by GD&T", "Reference only", "Optional"], a=1, e="They locate the tolerance zone."),
        dict(q="Δx = 0.03, Δy = 0.04 mm. Positional deviation (diametral)?", num=0.10, unit="mm", e="2 × 0.05 = 0.10."),
        dict(q="Floating fastener: hole MMC 6.6, bolt 6.0. Position tolerance?", num=0.6, unit="mm", e="T = H − F = 0.6 mm."),
    ],
    refs=["ASME Y14.5-2018, Dimensioning and Tolerancing.", "ISO 1101:2017, Geometrical product specifications (GPS) — Geometrical tolerancing.", "ISO 5459, GPS — Datums and datum systems.",
          "Krulikowski, A., Fundamentals of Geometric Dimensioning and Tolerancing, 3rd ed., Delmar.", "Henzold, G., Geometrical Dimensioning and Tolerancing for Design, Manufacturing and Inspection, 3rd ed., Butterworth-Heinemann."],
    links=[("Wikipedia — Geometric dimensioning and tolerancing", "https://en.wikipedia.org/wiki/Geometric_dimensioning_and_tolerancing")],
))

# =====================================================================================
# 26. BOLTED JOINTS
# =====================================================================================
db, pitch, proof, Kt = 12.0, 1.75, 580.0, 0.20
As = math.pi / 4 * (db - 0.9382 * pitch) ** 2
Fp = As * proof / 1000
Fi = 0.75 * Fp
Tq_b = Kt * Fi * 1000 * db / 1000
Cj = 0.25
Fsep = Fi / (1 - Cj)
jd = plot([dict(pts=[(0, 0), (Fi / 300, Fi)], label="bolt (stretches)", at=Fi / 600),
           dict(pts=[(Fi / 300, Fi), (Fi / 300 + Fi / 100, 0)], label="clamped parts (compress)", at=Fi / 300 + Fi / 200)],
          "deformation (arbitrary units)", "force (kN)", xlim=(0, Fi / 300 + Fi / 100 + 0.02), ylim=(0, Fi * 1.3), h=300,
          points=[(Fi / 300, Fi, f"preload Fi = {Fi:.1f} kN")])

ARTICLES.append(dict(
    slug="bolted-joints-preload-and-torque", group="elements",
    title="Bolted Joints: Preload, Tightening Torque, Joint Stiffness and Separation",
    short="Bolted joints",
    tags=["Bolts", "Preload", "VDI 2230", "Fasteners"],
    desc="Bolted joint basics: tensile stress area, property classes, target preload, torque–tension relationship and nut factor, joint diagram, load sharing, separation and tightening scatter.",
    blurb="How much preload a bolt needs, what torque gives it, how external load is shared, and why tightening method matters.",
    lead="A bolted joint works by clamping. The bolt is stretched like a stiff spring and the parts are compressed; external loads mostly change the clamp force rather than the bolt force, as long as the joint stays closed. Getting the preload right, and knowing how uncertain it is, is the heart of joint design.",
    takeaways=[
        "Tensile stress area A<sub>s</sub> = (π/4)(d − 0.9382p)² for metric threads.",
        "Target preload is usually 70–90 % of proof load (proof stress × A<sub>s</sub>): 75 % for re-usable joints.",
        "Torque T = K·F<sub>i</sub>·d, with nut factor K ≈ 0.2 dry and 0.12–0.16 lubricated. Most torque is lost to friction.",
        "Torque tightening scatters preload by ±25–30 %; angle or yield control and direct tension methods are far better.",
        "With joint stiffness factor C, the bolt sees only C × external load; the joint separates at F<sub>i</sub>/(1 − C).",
    ],
    body=f'''
<h2 id="bolts">1. Bolt strength</h2>
{formula("As = (π/4) · (d − 0.9382·p)²         (mm², metric coarse/fine)\nProof load Fp = Sp · As\nTarget preload Fi ≈ 0.75·Fp (re-used) … 0.90·Fp (permanent)")}
{table(["Property class (ISO 898-1)","Proof stress S<sub>p</sub> (MPa)","Yield (MPa)","Tensile (MPa)"],[["4.6","225","240","400"],["8.8 (d ≤ 16)","580","640","800"],["8.8 (d &gt; 16)","600","660","830"],["10.9","830","940","1,040"],["12.9","970","1,100","1,220"]],num_cols=(1,2,3))}

<h2 id="torque">2. Torque and preload</h2>
{formula("T = K · Fi · d          K ≈ 0.20 dry steel, 0.15–0.16 oiled, 0.10–0.12 with MoS₂ paste")}
<p>Typically about 50 % of the tightening torque overcomes friction under the head or nut, 40 % thread friction, and only about 10 % actually stretches the bolt. Small changes in friction change preload a lot.</p>
{table(["Method","Preload scatter (≈)","Tightening factor αA (VDI 2230)"],[["Impact wrench","±60 %","2.5–4"],["Torque wrench, estimated friction","±25–30 %","1.6–1.8"],["Torque wrench, friction measured on the parts","±15–20 %","1.4–1.6"],
["Angle-controlled / yield-controlled","±7–10 %","1.1–1.2"],["Hydraulic tensioner, ultrasonic elongation","±5–10 %","1.1–1.2"]])}

<h2 id="diagram">3. The joint diagram</h2>
{fig(jd, "Figure 1. Joint diagram: the stiff bolt line rises with stretch; the even stiffer clamped parts line falls with compression. They meet at the preload.")}
{formula("C = kb / (kb + km)              joint stiffness factor (typically 0.1–0.4)\nBolt force   Fb = Fi + C · P\nClamp force  Fm = Fi − (1 − C) · P\nSeparation   P_sep = Fi / (1 − C)")}
<p>Because C is small, most of the external load reduces clamp force rather than raising bolt force, which is why a properly preloaded bolt survives fatigue loads that would break an unpreloaded one.</p>

<h2 id="example">4. Worked example</h2>
<p>M12 × 1.75, class 8.8, dry (K = {Kt}), joint factor C = {Cj}.</p>
{table(["Step","Result"],[["A_s",f"{As:.1f} mm²"],["Proof load",f"{Fp:.1f} kN"],["Preload 0.75·F_p",f"<b>{Fi:.1f} kN</b>"],["Torque T = K·F_i·d",f"<b>{Tq_b:.0f} N·m</b>"],["External load to separate",f"{Fsep:.1f} kN"]],num_cols=(1,))}
{box("note","Loss of preload","Embedding (settling of surface roughness, typically a few µm per interface), gasket creep, thermal differences and vibration-induced loosening all reduce preload. Use hardened washers, adequate grip length (long bolts lose less preload to embedding), and locking methods suited to transverse vibration.")}
''',
    calcs=[dict(id="bolt", title="Bolt preload, torque and joint separation",
                presets=[dict(label="M12 8.8 dry", v=dict(d=12, p=1.75, Sp=580, pct=75, K=0.2, C=0.25, P=10)), dict(label="M16 10.9 oiled", v=dict(d=16, p=2, Sp=830, pct=75, K=0.15, C=0.2, P=30))],
                inputs=[dict(id="d", label="Nominal diameter d (mm)", value=12), dict(id="p", label="Pitch p (mm)", value=1.75), dict(id="Sp", label="Proof stress (MPa)", value=580),
                        dict(id="pct", label="Preload % of proof", value=75), dict(id="K", label="Nut factor K", value=0.2), dict(id="C", label="Joint stiffness factor C", value=0.25), dict(id="P", label="External axial load per bolt (kN)", value=10)],
                js='''var As=Math.PI/4*Math.pow(v.d-0.9382*v.p,2),Fp=As*v.Sp/1000,Fi=Fp*v.pct/100,T=v.K*Fi*v.d,Fb=Fi+v.C*v.P,Fm=Fi-(1-v.C)*v.P,Ps=Fi/(1-v.C);
return {rows:[["Stress area As",fmt(As,1)+" mm²"],["Proof load",fmt(Fp,2)+" kN"],["Preload Fi",fmt(Fi,2)+" kN"],["Tightening torque",fmt(T,1)+" N·m"],["Bolt force with load",fmt(Fb,2)+" kN",fmt(Fb/Fp*100,0)+" % of proof"],["Remaining clamp",fmt(Fm,2)+" kN"],["Separation load",fmt(Ps,2)+" kN"]],
verdict:Fm<=0?["bad","Joint separates under this load: increase preload or bolt size."]:(Fb>Fp?["bad","Bolt force exceeds proof load."]:["ok","Joint stays closed and bolt stays below proof load."])};''')],
    quiz=[
        dict(q="Property class 8.8 means tensile strength of about:", o=["88 MPa", "800 MPa", "880 MPa", "8,800 MPa"], a=1, e="First number × 100 = nominal tensile strength (MPa)."),
        dict(q="Most tightening torque is used to:", o=["Stretch the bolt", "Overcome friction", "Heat the bolt", "Deform the nut"], a=1, e="≈ 90 % goes to friction."),
        dict(q="Lubricating the threads for the same torque:", o=["Lowers preload", "Raises preload", "No change", "Breaks the bolt always"], a=1, e="Lower friction → more stretch per N·m (risk of overload if K not adjusted)."),
        dict(q="Which method gives the smallest preload scatter?", o=["Impact wrench", "Torque wrench", "Angle/yield control or tensioning", "Hand tight"], a=2, e="±5–10 %."),
        dict(q="With C = 0.2, an external load of 10 kN adds what to the bolt force?", o=["10 kN", "8 kN", "2 kN", "0 kN"], a=2, e="C × P = 2 kN."),
        dict(q="Joint separation load is:", o=["Fi", "Fi/(1 − C)", "C·Fi", "Fp"], a=1, e="Clamp force reaches zero."),
        dict(q="Tensile stress area of M10 × 1.5 (mm²)?", num=57.99, unit="mm²", e="π/4 × (10 − 1.407)² = 58.0 mm²."),
        dict(q="Preload 20 kN on M10, K = 0.2. Torque in N·m?", num=40, unit="N·m", e="0.2 × 20,000 × 0.010 = 40 N·m."),
    ],
    refs=["VDI 2230 Part 1:2015, Systematic calculation of highly stressed bolted joints.", "ISO 898-1:2013, Mechanical properties of fasteners made of carbon steel and alloy steel — Bolts, screws and studs.",
          "Bickford, J. H., An Introduction to the Design and Behavior of Bolted Joints, 4th ed., CRC Press, 2007.", "Budynas, R. G. and Nisbett, J. K., Shigley's Mechanical Engineering Design, 10th ed., Ch. 8."],
    links=[("Wikipedia — Bolted joint", "https://en.wikipedia.org/wiki/Bolted_joint")],
))
