"""
TOOL:    Vijay_Wiki articles — batch 2 group C (machine design)
FAMILY:  vijay-wiki
VERSION: 1.0.0
DATE:    2026-11-24
CHAT:    claude.ai — Vijay_Wiki: next batch of topics (36 articles)
CHANGES: 1.0.0 Shaft fatigue, keys, belts and chains, planetary gears, seals and O-rings, pumps
"""
import math
import numpy as np
from wiki import plot, flow, bars, fig, table, box, formula

ARTICLES = []

# ---------------------------------------------------------------- 60 SHAFT FATIGUE
Sut, Sy, Kf, Kfs, Ma, Tm, nreq = 690.0, 580.0, 1.7, 1.5, 150.0, 200.0, 2.0
ka = 4.51 * Sut ** -0.265
ke = 0.814
d = 40.0
for _ in range(10):
    kb = 1.24 * d ** -0.107 if d <= 51 else 1.51 * d ** -0.157
    Se = ka * kb * ke * 0.5 * Sut
    d = (16 * nreq / math.pi * (2 * Kf * Ma * 1000 / Se + math.sqrt(3) * Kfs * Tm * 1000 / Sut)) ** (1 / 3)
dreq = d
gd = plot([dict(pts=[(0, 0), (Sut, 0), (0, Se)], label=None, width=0.1),
           dict(pts=[(sm, Se * (1 - sm / Sut)) for sm in np.linspace(0, Sut, 50)], label="Goodman line", at=300),
           dict(pts=[(sm, Sy - sm) for sm in np.linspace(0, Sy, 50)], label="first-cycle yield", at=450)],
          "mean stress σm (MPa)", "alternating stress σa (MPa)", xlim=(0, 720), ylim=(0, 400), h=300)
ARTICLES.append(dict(
    slug="shaft-design-for-fatigue", group="elements",
    title="Shaft Design for Fatigue: Endurance Limit, Marin Factors, Stress Concentration and Goodman",
    short="Shaft fatigue", tags=["Shafts", "Fatigue", "Goodman", "Machine design"],
    desc="Designing rotating shafts against fatigue: fully reversed bending with steady torque, endurance limit and Marin factors, notch sensitivity and fatigue stress concentration, DE-Goodman diameter equation and yield check.",
    blurb="Rotating bending plus torque: endurance limit, Marin factors, stress concentration and the DE-Goodman diameter.",
    lead="A rotating shaft carrying a steady bending moment sees fully reversed bending stress every revolution, millions of times. It fails by fatigue, usually at a shoulder, keyway or groove where stress concentrates. Design therefore starts from a corrected endurance limit and combines alternating and mean stresses with a criterion such as Goodman.",
    takeaways=[
        "For a rotating shaft, steady bending moment gives alternating stress; steady torque gives mean stress.",
        "Endurance limit S′e ≈ 0.5·S<sub>ut</sub> (steel, S<sub>ut</sub> ≤ 1400 MPa), reduced by Marin factors for surface, size, load, temperature and reliability.",
        "Fatigue stress concentration K<sub>f</sub> = 1 + q(K<sub>t</sub> − 1); shoulders, keyways and grooves typically give K<sub>f</sub> ≈ 1.5–2.5.",
        "DE-Goodman: d = {16n/π·[√(4(K<sub>f</sub>M<sub>a</sub>)² + 3(K<sub>fs</sub>T<sub>a</sub>)²)/S<sub>e</sub> + √(4(K<sub>f</sub>M<sub>m</sub>)² + 3(K<sub>fs</sub>T<sub>m</sub>)²)/S<sub>ut</sub>]}<sup>1/3</sup>.",
        "Also check first-cycle yield and shaft deflection/slope at bearings and gears.",
    ],
    body=f'''
<h2 id="endurance">1. Endurance limit and Marin factors</h2>
{formula("Se = ka · kb · kc · kd · ke · S'e        S'e = 0.5·Sut (steel)\nka = a·Sut^b  (ground 1.58/−0.085; machined/cold-drawn 4.51/−0.265; hot-rolled 57.7/−0.718; forged 272/−0.995)\nkb = 1.24·d^−0.107 (2.79–51 mm);  1.51·d^−0.157 (51–254 mm)\nkc = 1 bending, 0.85 axial;  ke: 0.868 (95 %), 0.814 (99 %), 0.753 (99.9 %)")}
<h2 id="kf">2. Stress concentration</h2>
{formula("Kf = 1 + q·(Kt − 1)      q from notch sensitivity charts (0.7–0.95 for steels at typical radii)")}
{table(["Feature","Kt bending (typical)","Kts torsion"],[["Sharp shoulder (r/d ≈ 0.02)","2.7","2.2"],["Well-rounded shoulder (r/d ≈ 0.1)","1.7","1.5"],["End-milled keyseat","2.14","3.0"],["Retaining ring groove","5.0","3.0"]],num_cols=(1,2))}
<h2 id="goodman">3. Combining stresses</h2>
{fig(gd, "Figure 1. Goodman diagram for the example material: safe combinations of alternating and mean stress lie below the Goodman line (and the yield line).")}
{formula("σ'a = √[ (32·Kf·Ma/πd³)² + 3·(16·Kfs·Ta/πd³)² ]      σ'm = √[ (32·Kf·Mm/πd³)² + 3·(16·Kfs·Tm/πd³)² ]\nGoodman:  1/n = σ'a/Se + σ'm/Sut")}
<h2 id="example">4. Worked example</h2>
<p>Cold-drawn steel S<sub>ut</sub> = {Sut:.0f} MPa, S<sub>y</sub> = {Sy:.0f} MPa, shoulder K<sub>f</sub> = {Kf}, K<sub>fs</sub> = {Kfs}, M<sub>a</sub> = {Ma:.0f} N·m, T<sub>m</sub> = {Tm:.0f} N·m, 99 % reliability, n = {nreq:.0f}.</p>
{table(["Step","Result"],[["ka (machined)",f"{ka:.3f}"],["kb (iterated)",f"{kb:.3f}"],["ke (99 %)",f"{ke}"],["Se",f"{Se:.0f} MPa"],["Required diameter",f"<b>{dreq:.1f} mm</b> → choose next standard size"]],num_cols=(1,))}
''',
    calcs=[dict(id="sf", title="DE-Goodman shaft diameter",
                presets=[dict(label="Worked example", v=dict(Sut=690, fin="mach", Kf=1.7, Kfs=1.5, Ma=150, Mm=0, Ta=0, Tm=200, n=2, ke="0.814"))],
                inputs=[dict(id="Sut", label="Sut (MPa)", value=690), dict(id="fin", label="Surface", value="mach", options=[("grnd", "Ground"), ("mach", "Machined / cold-drawn"), ("hot", "Hot-rolled"), ("forg", "As forged")]),
                        dict(id="Kf", label="Kf bending", value=1.7), dict(id="Kfs", label="Kfs torsion", value=1.5), dict(id="Ma", label="Alternating moment Ma (N·m)", value=150), dict(id="Mm", label="Mean moment Mm (N·m)", value=0),
                        dict(id="Ta", label="Alternating torque Ta (N·m)", value=0), dict(id="Tm", label="Mean torque Tm (N·m)", value=200), dict(id="n", label="Design factor n", value=2),
                        dict(id="ke", label="Reliability", value="0.814", options=[("1", "50 %"), ("0.868", "95 %"), ("0.814", "99 %"), ("0.753", "99.9 %")])],
                js='''var ab={grnd:[1.58,-0.085],mach:[4.51,-0.265],hot:[57.7,-0.718],forg:[272,-0.995]}[v.fin],ka=ab[0]*Math.pow(v.Sut,ab[1]),ke=parseFloat(v.ke),d=40,kb,Se;
for(var i=0;i<20;i++){kb=d<=51?1.24*Math.pow(d,-0.107):1.51*Math.pow(d,-0.157);Se=ka*kb*ke*0.5*Math.min(v.Sut,1400);
var A=Math.sqrt(4*Math.pow(v.Kf*v.Ma*1000,2)+3*Math.pow(v.Kfs*v.Ta*1000,2)),B=Math.sqrt(4*Math.pow(v.Kf*v.Mm*1000,2)+3*Math.pow(v.Kfs*v.Tm*1000,2));d=Math.cbrt(16*v.n/Math.PI*(A/Se+B/v.Sut));}
return {rows:[["ka",fmt(ka,3)],["kb",fmt(kb,3)],["Endurance limit Se",fmt(Se,0)+" MPa"],["Required diameter",fmt(d,1)+" mm"]]};''')],
    quiz=[
        dict(q="For a rotating shaft with steady bending, the bending stress is:", o=["Steady (mean)", "Fully reversed (alternating)", "Zero", "Compressive only"], a=1, e="Each fibre goes tension→compression each revolution."),
        dict(q="Steel endurance limit estimate S'e is about:", o=["0.1 Sut", "0.5 Sut", "Sut", "Sy"], a=1, e="Up to ~1400 MPa Sut."),
        dict(q="A ground surface compared with as-forged gives:", o=["Lower ka", "Higher ka", "Same", "Zero"], a=1, e="Smoother surface, less reduction."),
        dict(q="Kf = 1 + q(Kt − 1); q = 0 means:", o=["Full notch effect", "No notch sensitivity", "Infinite stress", "Kt = 0"], a=1, e="Kf = 1."),
        dict(q="Goodman relates alternating stress limit to:", o=["Mean stress and Sut", "Only Sy", "Temperature", "Deflection"], a=0, e="Straight line from Se to Sut."),
        dict(q="Larger diameters have endurance limits that are:", o=["Higher", "Lower (size factor)", "Same", "Zero"], a=1, e="kb < 1 grows smaller with size."),
        dict(q="Kt = 2.0, q = 0.8. Kf?", num=1.8, e="1 + 0.8 × 1 = 1.8."),
        dict(q="Sut = 600 MPa, all Marin factors 0.7 combined. Se (MPa)?", num=210, unit="MPa", e="0.7 × 300."),
    ],
    refs=["Budynas, R. G. and Nisbett, J. K., Shigley's Mechanical Engineering Design, 10th ed., Ch. 6–7.", "Peterson, W. D. and Pilkey, D. F., Peterson's Stress Concentration Factors, 3rd ed., Wiley, 2008.", "DIN 743, Calculation of load capacity of shafts and axles.", "ASME B106.1M (withdrawn), Design of Transmission Shafting."],
    links=[("Wikipedia — Fatigue (material)", "https://en.wikipedia.org/wiki/Fatigue_(material)")],
))

# ---------------------------------------------------------------- 61 KEYS
KEYS = [(6, 8, 2, 2, 1.2), (8, 10, 3, 3, 1.8), (10, 12, 4, 4, 2.5), (12, 17, 5, 5, 3.0), (17, 22, 6, 6, 3.5), (22, 30, 8, 7, 4.0), (30, 38, 10, 8, 5.0), (38, 44, 12, 8, 5.0),
        (44, 50, 14, 9, 5.5), (50, 58, 16, 10, 6.0), (58, 65, 18, 11, 7.0), (65, 75, 20, 12, 7.5), (75, 85, 22, 14, 9.0), (85, 95, 25, 14, 9.0)]
dk, Tk, Lk = 40.0, 300.0, 40.0
kk = next(k for k in KEYS if k[0] < dk <= k[1])
tau_k = 2 * Tk * 1000 / (dk * kk[2] * Lk)
sig_k = 2 * Tk * 1000 / (dk * (kk[3] - kk[4]) * Lk)
ARTICLES.append(dict(
    slug="keys-and-shaft-hub-connections", group="elements",
    title="Keys and Shaft–Hub Connections: Parallel Keys, Shear and Bearing Stress, Alternatives",
    short="Keys", tags=["Keys", "Shaft–hub joints", "DIN 6885", "Machine design"],
    desc="Parallel key sizes (DIN 6885 / ISO 773 style), shear and bearing (crushing) stress checks, key length, keyway stress concentration, and alternatives such as splines, interference fits and keyless locking assemblies.",
    blurb="Choosing a key for a shaft size, checking shear and crushing stress, and when to use something better.",
    lead="Parallel keys are the cheapest way to transmit torque between a shaft and a hub. The key size follows from the shaft diameter; the designer chooses the length and checks two stresses: shear across the key and bearing pressure on the side faces, which is usually the limit. Keyways weaken the shaft, so highly loaded or reversing drives often use splines or friction connections instead.",
    takeaways=[
        "Key width and height come from tables by shaft diameter (e.g. 38–44 mm shaft → 12 × 8 key).",
        "Shear stress τ = 2T/(d·b·L); bearing stress σ = 2T/(d·(h − t₁)·L), using the shorter engagement (hub side).",
        "Bearing stress usually governs: allowable about 100–150 MPa for steel hubs, 50–90 MPa for cast iron (steady load).",
        "Keep key length ≤ about 1.5 d; for more torque use two keys at 180° (counting ≈ 1.5 keys) or a spline.",
        "Reversing or shock loads loosen keys and fret keyways; use interference fits, tapered or keyless locking devices.",
    ],
    body=f'''
<h2 id="sizes">1. Standard parallel key sizes (DIN 6885-1 style)</h2>
{table(["Shaft over–to (mm)","b × h (mm)","Shaft groove depth t₁ (mm)"],[[f"{a}–{b}",f"{w} × {h}",f"{t}"] for a,b,w,h,t in KEYS],num_cols=(2,))}
<h2 id="stress">2. Stress checks</h2>
{formula("Shear:     τ = 2·T / (d · b · L)\nBearing:   σ = 2·T / (d · (h − t1) · L)     (hub side engagement h − t1)\nRequired length L = 2·T / (d · (h − t1) · σ_allow)")}
{table(["Hub material and duty","Allowable bearing stress (indicative)"],[["Steel hub, steady load","100–150 MPa"],["Steel hub, light shock","70–100 MPa"],["Cast iron hub","50–90 MPa"],["Sliding (feather) key","10–20 MPa"]])}
<h2 id="alternatives">3. Alternatives</h2>
{table(["Connection","Advantage","Limitation"],[["Spline","High torque, accurate centring, sliding possible","Cost"],["Interference fit","No stress raiser from keyway, high fatigue strength","Assembly/disassembly force"],["Keyless locking assembly (friction)","Easy fitting and adjustment, backlash-free","Space, cost"],["Taper with key","Easy removal, tight","Axial nut needed"],["Woodruff key","Self-aligning in small shafts","Deep groove weakens shaft"]])}
<h2 id="example">4. Worked example</h2>
<p>Shaft Ø{dk:.0f} mm, torque {Tk:.0f} N·m, key length {Lk:.0f} mm → key {kk[2]} × {kk[3]}, t₁ = {kk[4]} mm.</p>
{table(["Check","Result"],[["Shear stress",f"{tau_k:.1f} MPa"],["Bearing stress (hub side)",f"<b>{sig_k:.0f} MPa</b>"],["Verdict","Acceptable for a steel hub under steady load; too high for cast iron"]],num_cols=(1,))}
''',
    calcs=[dict(id="key", title="Parallel key selection and checks",
                presets=[dict(label="Ø40, 300 N·m, L 40", v=dict(d=40, T=300, L=40, sa=120, ta=60))],
                inputs=[dict(id="d", label="Shaft diameter (mm)", value=40), dict(id="T", label="Torque (N·m)", value=300), dict(id="L", label="Key length (mm)", value=40), dict(id="sa", label="Allowable bearing (MPa)", value=120), dict(id="ta", label="Allowable shear (MPa)", value=60)],
                js='''var K=[[6,8,2,2,1.2],[8,10,3,3,1.8],[10,12,4,4,2.5],[12,17,5,5,3.0],[17,22,6,6,3.5],[22,30,8,7,4.0],[30,38,10,8,5.0],[38,44,12,8,5.0],[44,50,14,9,5.5],[50,58,16,10,6.0],[58,65,18,11,7.0],[65,75,20,12,7.5],[75,85,22,14,9.0],[85,95,25,14,9.0]];
var k=K.filter(function(r){return v.d>r[0]&&v.d<=r[1];})[0];if(!k)return {rows:[],verdict:["bad","Diameter outside table (6–95 mm)."]};
var tau=2*v.T*1000/(v.d*k[2]*v.L),sig=2*v.T*1000/(v.d*(k[3]-k[4])*v.L),Lreq=2*v.T*1000/(v.d*(k[3]-k[4])*v.sa);
return {rows:[["Key b × h",k[2]+" × "+k[3]+" mm","t1 = "+k[4]],["Shear stress",fmt(tau,1)+" MPa"],["Bearing stress",fmt(sig,1)+" MPa"],["Length needed (bearing)",fmt(Lreq,1)+" mm",Lreq>1.5*v.d?"exceeds 1.5 d: use two keys or spline":""]],
verdict:(sig>v.sa||tau>v.ta)?["bad","Key overstressed: lengthen, use two keys, or change connection."]:["ok","Key stresses within allowable values."]};''')],
    quiz=[
        dict(q="Key size is chosen mainly from:", o=["Torque", "Shaft diameter", "Hub length", "Material"], a=1, e="Standard tables by diameter."),
        dict(q="Which stress usually governs parallel keys?", o=["Shear", "Bearing (crushing) on the side faces", "Bending", "Torsion of the key"], a=1, e="Smaller area on the hub side."),
        dict(q="Two keys at 180° are usually credited with about:", o=["1 key", "1.5 keys", "2 keys", "3 keys"], a=1, e="Load sharing is imperfect."),
        dict(q="Why avoid keys under reversing shock loads?", o=["Too expensive", "They loosen and fret the keyway", "They are too stiff", "They cannot be machined"], a=1, e="Clearance allows impact."),
        dict(q="A keyless locking assembly transmits torque by:", o=["Shear of a key", "Friction from radial clamping", "Adhesive", "Spline teeth"], a=1, e="Wedge rings create pressure."),
        dict(q="Recommended maximum key length is roughly:", o=["0.5 d", "1.5 d", "5 d", "No limit"], a=1, e="Longer keys load unevenly."),
        dict(q="T = 200 N·m, d = 30, b = 8, L = 30. Shear stress (MPa)?", num=55.6, unit="MPa", e="400,000/(30×8×30) = 55.6."),
        dict(q="T = 200 N·m, d = 30, h − t1 = 3 mm, L = 30. Bearing stress (MPa)?", num=148.1, unit="MPa", e="400,000/(30×3×30) = 148."),
    ],
    refs=["DIN 6885-1, Drive type fastenings without taper action — Parallel keys, keyways, deep pattern.", "ISO/R 773, Rectangular or square parallel keys and their corresponding keyways.", "DIN 6892, Drive type fastenings without taper action — Parallel keys — Calculation and design.", "Budynas, R. G. and Nisbett, J. K., Shigley's Mechanical Engineering Design, Ch. 7."],
    links=[("Wikipedia — Key (engineering)", "https://en.wikipedia.org/wiki/Key_(engineering)")],
))

# ---------------------------------------------------------------- 62 BELTS AND CHAINS
db_, Db_, Cc, n_b, Pb, mu_b, beta_g = 150.0, 300.0, 600.0, 1450.0, 7.5, 0.3, 40.0
Lb = 2 * Cc + math.pi * (Db_ + db_) / 2 + (Db_ - db_) ** 2 / (4 * Cc)
wrap = 180 - 2 * math.degrees(math.asin((Db_ - db_) / (2 * Cc)))
vb = math.pi * db_ / 1000 * n_b / 60
Fe = Pb * 1000 / vb
mup = mu_b / math.sin(math.radians(beta_g / 2))
ratio = math.exp(mup * math.radians(wrap))
T2 = Fe / (ratio - 1); T1 = T2 + Fe
zc = 17
chordal = (1 - math.cos(math.radians(180 / zc))) * 100
ARTICLES.append(dict(
    slug="belt-and-chain-drives", group="elements",
    title="Belt and Chain Drives: Length, Wrap Angle, Tensions, Speed and Chordal Action",
    short="Belts and chains", tags=["Belts", "Chains", "Power transmission", "Drives"],
    desc="Flat, V and synchronous belts and roller chains: speed ratio, belt length and wrap angle, the capstan tension ratio for V-belts, effective pull and power, chain pitch and length in links, chordal action and selection tips.",
    blurb="Belt length, wrap angle and tensions from the capstan equation, plus chain length and chordal speed variation.",
    lead="Belts and chains transmit power over longer distances than gears, cheaply and with some tolerance for misalignment. Belts rely on friction (or teeth, for synchronous belts) and need correct tension; chains are positive but suffer chordal speed variation and wear elongation. A few formulas cover most layout and tension checks.",
    takeaways=[
        "Open-belt length L = 2C + π(D + d)/2 + (D − d)²/(4C); wrap on the small pulley θ = 180° − 2·asin[(D − d)/2C].",
        "Capstan equation: T₁/T₂ = e<sup>μ′θ</sup>, with μ′ = μ/sin(β/2) for V-belts (wedge effect raises grip about 3×).",
        "Power P = (T₁ − T₂)·v; belt speeds of 5–30 m/s are typical for V-belts.",
        "Chain speed varies by 1 − cos(180°/z) per tooth pass: use at least 17–19 teeth on the small sprocket for smooth running.",
        "Synchronous (toothed) belts give fixed ratio without lubrication; chains need lubrication and tensioning as they wear.",
    ],
    body=f'''
<h2 id="belts">1. Belt geometry and tensions</h2>
{formula("Ratio i = D/d = n1/n2 (ignoring slip ≈ 1–2 %)\nL = 2C + π(D + d)/2 + (D − d)²/(4C)\nθ_small = 180° − 2·asin[(D − d)/(2C)]\nT1/T2 = e^(μ'·θ),  μ' = μ/sin(β/2)   (β = groove angle, ≈ 34–40°)\nP = (T1 − T2)·v,   v = π·d·n/60")}
{table(["Belt type","Speed","Notes"],[["Flat","up to 50+ m/s","High speed, efficient, needs higher tension"],["Classical / narrow V (SPZ, SPA, SPB…)","5–30 m/s","Wedge grip, compact, most common industrial"],["Poly-V (ribbed)","up to 60 m/s","Small pulleys, smooth"],["Synchronous (timing)","up to 40–80 m/s","No slip, positioning, no lubrication"]])}
<h2 id="chains">2. Roller chains</h2>
{formula("Pitch diameter D = p / sin(180°/z)\nChain length (links) Lp = 2C/p + (z1 + z2)/2 + p·(z2 − z1)² / (4π²·C)   (round up to even)\nChordal speed variation = 1 − cos(180°/z)")}
<p>With z = {zc}, chordal speed variation is {chordal:.2f} %. Chains elongate with pin and bush wear; replace at about 1.5–3 % elongation (sprocket-size dependent).</p>
<h2 id="example">3. Worked example: V-belt drive</h2>
<p>Pulleys {db_:.0f} and {Db_:.0f} mm, centres {Cc:.0f} mm, {n_b:,.0f} rpm, {Pb} kW, μ = {mu_b}, groove angle {beta_g:.0f}°.</p>
{table(["Quantity","Value"],[["Belt length",f"{Lb:,.0f} mm"],["Wrap on small pulley",f"{wrap:.1f}°"],["Belt speed",f"{vb:.2f} m/s"],["Effective pull T1 − T2",f"{Fe:.0f} N"],["Tension ratio",f"{ratio:.1f}"],["T1 / T2",f"<b>{T1:.0f} N / {T2:.0f} N</b> (excluding centrifugal tension)"]],num_cols=(1,))}
''',
    calcs=[dict(id="belt", title="Belt drive: length, wrap and tensions; chain chordal action",
                presets=[dict(label="Worked example", v=dict(d=150, D=300, C=600, n=1450, P=7.5, mu=0.3, beta=40, z=17))],
                inputs=[dict(id="d", label="Small pulley (mm)", value=150), dict(id="D", label="Large pulley (mm)", value=300), dict(id="C", label="Centre distance (mm)", value=600), dict(id="n", label="Small pulley speed (rpm)", value=1450),
                        dict(id="P", label="Power (kW)", value=7.5), dict(id="mu", label="Friction μ", value=0.3), dict(id="beta", label="Groove angle (° , 180 = flat)", value=40), dict(id="z", label="Chain sprocket teeth (for chordal check)", value=17)],
                js='''var L=2*v.C+Math.PI*(v.D+v.d)/2+Math.pow(v.D-v.d,2)/(4*v.C),th=180-2*Math.asin((v.D-v.d)/(2*v.C))*180/Math.PI,vb=Math.PI*v.d/1000*v.n/60,Fe=v.P*1000/vb;
var mup=v.beta>=179?v.mu:v.mu/Math.sin(v.beta/2*Math.PI/180),r=Math.exp(mup*th*Math.PI/180),T2=Fe/(r-1),T1=T2+Fe,ch=(1-Math.cos(Math.PI/v.z))*100;
return {rows:[["Belt length",fmt(L,0)+" mm"],["Wrap angle",fmt(th,1)+"°"],["Belt speed",fmt(vb,2)+" m/s"],["Effective pull",fmt(Fe,0)+" N"],["T1 / T2",fmt(T1,0)+" / "+fmt(T2,0)+" N","ratio "+fmt(r,2)],["Output speed",fmt(v.n*v.d/v.D,0)+" rpm"],["Chain chordal variation",fmt(ch,2)+" %","z = "+v.z]],
verdict:th<120?["bad","Wrap angle below 120°: increase centre distance or add idler."]:(vb>30?["caution","Belt speed above 30 m/s: check belt rating."]:["ok","Geometry within usual limits."])};''')],
    quiz=[
        dict(q="Why do V-belts grip better than flat belts?", o=["Thicker", "Wedge action raises effective friction μ/sin(β/2)", "Rubber is softer", "Higher speed"], a=1, e="Wedging in the groove."),
        dict(q="The capstan equation gives:", o=["Belt length", "Ratio of tight to slack side tension", "Speed ratio", "Power"], a=1, e="T1/T2 = e^(μθ)."),
        dict(q="Small wrap angle causes:", o=["More grip", "Slip", "Longer belt life", "Higher speed"], a=1, e="Less contact."),
        dict(q="Which drive needs no lubrication and keeps exact ratio?", o=["Roller chain", "V-belt", "Synchronous belt", "Flat belt"], a=2, e="Toothed belt."),
        dict(q="Chordal action in chains is reduced by:", o=["Fewer teeth", "More teeth on the small sprocket", "Longer chain", "Less lubrication"], a=1, e="1 − cos(180°/z) falls."),
        dict(q="Power transmitted by a belt is:", o=["T1·v", "(T1 − T2)·v", "T2·v", "(T1 + T2)·v"], a=1, e="Effective pull × speed."),
        dict(q="d = 100 mm at 1500 rpm. Belt speed (m/s)?", num=7.854, unit="m/s", e="π × 0.1 × 25 = 7.85 m/s."),
        dict(q="Chordal variation for z = 12 (%)?", num=3.41, unit="%", e="1 − cos 15° = 3.41 %."),
    ],
    refs=["ISO 4183 / ISO 5292 (V-belt and pulley dimensions and power ratings).", "ISO 606, Short-pitch transmission precision roller and bush chains.", "Budynas, R. G. and Nisbett, J. K., Shigley's Mechanical Engineering Design, Ch. 17.", "Belt and chain makers' design manuals (e.g. Gates, Optibelt, Renold, Tsubaki)."],
    links=[("Wikipedia — Belt (mechanical)", "https://en.wikipedia.org/wiki/Belt_(mechanical)"), ("Wikipedia — Roller chain", "https://en.wikipedia.org/wiki/Roller_chain")],
))

# ---------------------------------------------------------------- 63 PLANETARY GEARS
zs, zp, Np = 24, 24, 3
zr = zs + 2 * zp
iratio = 1 + zr / zs
asm = (zs + zr) / Np
nsun = 3000.0
ncar = nsun / iratio
fmesh = zr * ncar / 60
def plan_svg():
    cx, cy = 250, 160
    o = ['<svg viewBox="0 0 900 320" role="img" aria-label="Planetary gear set">',
         f'<circle cx="{cx}" cy="{cy}" r="145" fill="none" stroke="var(--purple)" stroke-width="8"/>',
         f'<circle cx="{cx}" cy="{cy}" r="48" fill="var(--blue3)" stroke="var(--blue)" stroke-width="3"/><text x="{cx}" y="{cy+5}" text-anchor="middle" font-size="13" font-weight="700">sun</text>']
    for k in range(3):
        a = math.radians(90 + 120 * k)
        x, y = cx + 96 * math.cos(a), cy - 96 * math.sin(a)
        o.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="46" fill="var(--orange3)" stroke="var(--orange)" stroke-width="3"/><text x="{x:.1f}" y="{y+5:.1f}" text-anchor="middle" font-size="12">planet</text>')
        o.append(f'<line x1="{cx}" y1="{cy}" x2="{x:.1f}" y2="{y:.1f}" stroke="var(--ink)" stroke-width="3" stroke-dasharray="6 4"/>')
    o.append('<g font-size="13"><text x="440" y="70">ring (purple), fixed or rotating</text><text x="440" y="95">planets (orange) on a carrier (dashed)</text><text x="440" y="130">Willis: (ns − nc)/(nr − nc) = −zr/zs</text>'
             '<text x="440" y="155">Ring fixed: i = 1 + zr/zs (sun in, carrier out)</text><text x="440" y="180">Geometry: zr = zs + 2·zp</text><text x="440" y="205">Assembly: (zs + zr)/Np = integer</text></g></svg>')
    return "".join(o)
ARTICLES.append(dict(
    slug="planetary-gear-trains", group="elements",
    title="Planetary (Epicyclic) Gear Trains: Willis Equation, Ratios, Assembly and Mesh Frequencies",
    short="Planetary gears", tags=["Planetary gears", "Gear trains", "Kinematics", "Vibration"],
    desc="Planetary gear trains: sun, planets, ring and carrier, the Willis equation, ratios for different fixed members, geometric and assembly conditions, load sharing, and planetary mesh and fault frequencies.",
    blurb="Ratios from the Willis equation, the conditions for planets to fit, and the frequencies a planetary gearbox produces.",
    lead="A planetary gear set packs a high ratio into a small, coaxial package by sharing load between several planets. Its kinematics look complicated but follow from one relation, the Willis equation. Fixing a different member (ring, carrier or sun) gives different ratios, which is how automatic transmissions shift.",
    takeaways=[
        "Willis: (n<sub>s</sub> − n<sub>c</sub>)/(n<sub>r</sub> − n<sub>c</sub>) = −z<sub>r</sub>/z<sub>s</sub>.",
        "Ring fixed, sun input, carrier output: i = 1 + z<sub>r</sub>/z<sub>s</sub> (typically 3–10 per stage).",
        "Geometry: z<sub>r</sub> = z<sub>s</sub> + 2z<sub>p</sub> (standard gears); assembly with N<sub>p</sub> equally spaced planets needs (z<sub>s</sub> + z<sub>r</sub>)/N<sub>p</sub> to be an integer.",
        "Load sharing between planets is never perfect: floating sun or flexible pins help; design with a mesh load factor (e.g. 1.1–1.3 for 3 planets).",
        "Mesh frequency (ring fixed) = z<sub>r</sub> × carrier speed; faults on planets and sun appear with sidebands at carrier and planet-pass frequencies.",
    ],
    body=f'''
<h2 id="layout">1. Layout and Willis equation</h2>
{fig(plan_svg(), "Figure 1. Planetary set with three planets.")}
{table(["Fixed member","Input","Output","Ratio (input/output)"],[["Ring","Sun","Carrier","1 + zr/zs"],["Carrier","Sun","Ring","−zr/zs (reverses)"],["Sun","Ring","Carrier","1 + zs/zr"],["Sun","Carrier","Ring","zr/(zr + zs)  (overdrive)"]])}
<h2 id="freq">2. Frequencies for diagnostics (ring fixed)</h2>
{formula("Carrier speed  fc = fs·zs/(zs + zr)\nMesh frequency  fm = zr·fc\nPlanet-pass frequency = Np·fc\nPlanet speed relative to carrier fp = fm/zp\nSun fault frequency ≈ Np·fm/zs  ;  planet fault ≈ fm/zp (×2 for both meshes)")}
<h2 id="example">3. Worked example</h2>
<p>z<sub>s</sub> = {zs}, z<sub>p</sub> = {zp}, {Np} planets, sun input {nsun:,.0f} rpm, ring fixed.</p>
{table(["Quantity","Value"],[["Ring teeth zr",f"{zr}"],["Ratio",f"<b>{iratio:.2f}</b>"],["Assembly check (zs + zr)/Np",f"{asm:.2f} → {'OK' if asm == int(asm) else 'not integer'}"],["Carrier speed",f"{ncar:.0f} rpm"],["Mesh frequency",f"{fmesh:.0f} Hz"],["Planet-pass frequency",f"{Np*ncar/60:.1f} Hz"]],num_cols=(1,))}
''',
    calcs=[dict(id="pl", title="Planetary set calculator",
                presets=[dict(label="24/24/72, 3 planets", v=dict(zs=24, zp=24, Np=3, n=3000, fix="ring")), dict(label="Carrier fixed", v=dict(zs=20, zp=25, Np=5, n=1500, fix="carrier"))],
                inputs=[dict(id="zs", label="Sun teeth", value=24), dict(id="zp", label="Planet teeth", value=24), dict(id="Np", label="Number of planets", value=3), dict(id="n", label="Input speed (rpm)", value=3000),
                        dict(id="fix", label="Fixed member", value="ring", options=[("ring", "Ring fixed (sun in → carrier out)"), ("carrier", "Carrier fixed (sun in → ring out)"), ("sun", "Sun fixed (ring in → carrier out)")])],
                js='''var zr=v.zs+2*v.zp,asm=(v.zs+zr)/v.Np,ok=Math.abs(asm-Math.round(asm))<1e-9,i,out,fm,fc;
if(v.fix==="ring"){i=1+zr/v.zs;out=v.n/i;fc=out/60;fm=zr*fc;}else if(v.fix==="carrier"){i=-zr/v.zs;out=v.n/i;fc=0;fm=v.zs*v.n/60;}else{i=1+v.zs/zr;out=v.n/i;fc=out/60;fm=v.zs*fc;}
var clear=2*(v.zs/2+v.zp/2)*Math.sin(Math.PI/v.Np)>v.zp+2;
return {rows:[["Ring teeth",zr],["Ratio",fmt(i,3)],["Output speed",fmt(out,1)+" rpm"],["Mesh frequency",fmt(fm,1)+" Hz"],["Assembly (zs+zr)/Np",fmt(asm,3),ok?"integer":"not integer"],["Planets clear each other",clear?"yes":"no (too many planets)"]],
verdict:(!ok||!clear)?["bad","Planets cannot be equally spaced or overlap: change teeth or planet count."]:["ok","Geometry and assembly conditions satisfied."]};''')],
    quiz=[
        dict(q="With the ring fixed, sun input and carrier output, the ratio is:", o=["zr/zs", "1 + zr/zs", "1 + zs/zr", "zs/zr"], a=1, e="Willis equation with nr = 0."),
        dict(q="With the carrier fixed, the ring:", o=["Turns in the same direction as the sun", "Turns opposite to the sun", "Stops", "Turns at sun speed"], a=1, e="Simple idler train."),
        dict(q="Standard-gear geometric condition:", o=["zr = zs + zp", "zr = zs + 2zp", "zr = 2zs", "zp = zs"], a=1, e="Ring pitch diameter = sun + 2 planets."),
        dict(q="Equal spacing assembly condition:", o=["zp/Np integer", "(zs + zr)/Np integer", "zr/zs integer", "None"], a=1, e="Planets must mesh simultaneously."),
        dict(q="Why use several planets?", o=["Higher ratio", "Share load and balance radial forces", "Lower cost", "Reduce noise only"], a=1, e="Compact, high torque."),
        dict(q="Mesh frequency with ring fixed is:", o=["zs × sun speed", "zr × carrier speed", "zp × planet speed", "Np × carrier speed"], a=1, e="Mesh relative to fixed ring."),
        dict(q="zs = 20, zr = 80, ring fixed. Ratio?", num=5, e="1 + 4."),
        dict(q="zs = 30, zp = 21. Ring teeth?", num=72, e="30 + 42."),
    ],
    refs=["Müller, H. W., Epicyclic Drive Trains, Wayne State University Press, 1982.", "Lynwander, P., Gear Drive Systems: Design and Application, Marcel Dekker, 1983.", "McFadden, P. D. and Smith, J. D., 'An explanation for the asymmetry of the modulation sidebands about the tooth meshing frequency in epicyclic gear vibration', Proc. IMechE C, 1985.", "ISO 6336 and AGMA 6123 (load sharing in planetary gears)."],
    links=[("Wikipedia — Epicyclic gearing", "https://en.wikipedia.org/wiki/Epicyclic_gearing")],
))

# ---------------------------------------------------------------- 64 SEALS AND O-RINGS
cs, gd_, gw = 3.53, 2.80, 4.80
squeeze = (cs - gd_) / cs * 100
fill = math.pi / 4 * cs ** 2 / (gd_ * gw) * 100
dls, nls = 50.0, 3000.0
vls = math.pi * dls / 1000 * nls / 60
ARTICLES.append(dict(
    slug="seals-and-o-ring-design", group="elements",
    title="Seals: Radial Lip Seals, Mechanical Seals and O-Ring Groove Design",
    short="Seals and O-rings", tags=["Seals", "O-rings", "Lip seals", "Elastomers"],
    desc="Sealing basics for rotating and static joints: radial lip seals and shaft requirements, mechanical face seals, labyrinths, elastomer selection, and O-ring groove design by squeeze, fill and stretch.",
    blurb="Choosing a seal type, the shaft conditions a lip seal needs, and getting O-ring squeeze, gland fill and stretch right.",
    lead="Most leaks come from a few avoidable errors: the wrong elastomer for the fluid or temperature, a shaft that is too rough or too fast for a lip seal, or an O-ring groove with too little squeeze or too much fill. The rules below cover selection and the key geometry checks.",
    takeaways=[
        "O-ring squeeze: about 15–30 % for static seals, 10–20 % for dynamic; gland fill below about 85 % to allow swell and expansion.",
        "Installed stretch of an O-ring on its inner diameter should stay below about 5 %; compression on the OD below about 3 %.",
        "Radial lip seals need a hardened (≥ 45 HRC), plunge-ground shaft with Ra about 0.2–0.8 µm and no machining lead.",
        "Surface speed limits for lip seals: roughly 10–15 m/s for NBR, higher for FKM and PTFE designs, with adequate lubrication.",
        "Choose the elastomer for fluid and temperature: NBR for mineral oils, FKM for higher temperatures and synthetic oils/fuels, EPDM for water and brake fluids (not oils), VMQ for wide temperature (static).",
    ],
    body=f'''
<h2 id="types">1. Seal types</h2>
{table(["Seal","Use","Notes"],[["O-ring (static)","Flanges, covers, plugs","Cheapest, reliable when groove is right"],["O-ring (dynamic)","Slow reciprocating rods and pistons","Use back-up rings at high pressure"],["Radial lip seal","Rotating shafts with oil or grease","Garter spring; low pressure (&lt; 0.5 bar typical)"],
["Mechanical face seal","Pumps, higher pressure and speed","Balanced designs for high pressure; needs flushing"],["Labyrinth / non-contact","Very high speed, gearboxes, turbines","Leaks a little by design; no wear"],["Lip seal with PTFE lip","High speed, dry running, chemicals","Special installation"]])}
<h2 id="elastomers">2. Elastomers</h2>
{table(["Material","Temperature (approx.)","Good with","Avoid"],[["NBR (nitrile)","−30 to 100 °C","Mineral oils, greases, fuels","Ozone, brake fluid, ketones"],["HNBR","−30 to 150 °C","Oils, better heat","Strong acids"],["FKM (fluorocarbon)","−20 to 200 °C","Synthetic oils, fuels, high temperature","Ketones, hot water/steam (some grades)"],
["EPDM","−50 to 150 °C","Water, steam, glycol, brake fluid","Mineral oils and fuels"],["VMQ (silicone)","−60 to 200 °C","Wide temperature, static","Abrasion, fuels, dynamic"],["FFKM (perfluoro)","up to 300 °C","Almost everything","Cost"]])}
<h2 id="oring">3. O-ring groove design</h2>
{formula("Squeeze % = (CS − groove depth) / CS × 100\nGland fill % = (π/4·CS²) / (depth × width) × 100\nStretch % = (groove ID − O-ring ID) / O-ring ID × 100")}
<p>Example: CS {cs} mm in a {gd_} × {gw} mm groove → squeeze <b>{squeeze:.1f} %</b>, fill <b>{fill:.1f} %</b> (good for a static seal).</p>
<h2 id="lip">4. Radial lip seal shaft requirements</h2>
<ul><li>Hardness ≥ 45 HRC (≥ 55 HRC with abrasive contamination); plunge-ground, no lead; Ra 0.2–0.8 µm.</li>
<li>Lead-in chamfer 15–25° on the shaft; install with a sleeve over keyways and threads.</li><li>Run-out and eccentricity within the seal maker's limits; lubricate the lip at assembly.</li>
<li>Example: Ø{dls:.0f} mm at {nls:,.0f} rpm → surface speed {vls:.2f} m/s (fine for NBR).</li></ul>
''',
    calcs=[dict(id="or", title="O-ring groove check and lip seal speed",
                presets=[dict(label="Static, CS 3.53", v=dict(cs=3.53, dep=2.8, wid=4.8, id=50.39, gid=51.5, duty="static", d=50, n=3000)), dict(label="Dynamic, CS 2.62", v=dict(cs=2.62, dep=2.25, wid=3.6, id=29.82, gid=30.5, duty="dyn", d=30, n=6000))],
                inputs=[dict(id="cs", label="O-ring cross-section CS (mm)", value=3.53), dict(id="dep", label="Groove depth (mm)", value=2.8), dict(id="wid", label="Groove width (mm)", value=4.8), dict(id="id", label="O-ring ID (mm)", value=50.39),
                        dict(id="gid", label="Groove inner diameter (mm)", value=51.5), dict(id="duty", label="Duty", value="static", options=[("static", "Static"), ("dyn", "Dynamic")]), dict(id="d", label="Lip seal shaft Ø (mm)", value=50), dict(id="n", label="Shaft speed (rpm)", value=3000)],
                js='''var sq=(v.cs-v.dep)/v.cs*100,fl=Math.PI/4*v.cs*v.cs/(v.dep*v.wid)*100,st=(v.gid-v.id)/v.id*100,vs=Math.PI*v.d/1000*v.n/60;var lo=v.duty==="static"?15:10,hi=v.duty==="static"?30:20,iss=[];
if(sq<lo||sq>hi)iss.push("squeeze outside "+lo+"–"+hi+" %");if(fl>85)iss.push("gland fill above 85 %");if(st>5)iss.push("stretch above 5 %");
return {rows:[["Squeeze",fmt(sq,1)+" %"],["Gland fill",fmt(fl,1)+" %"],["Stretch",fmt(st,2)+" %"],["Lip seal surface speed",fmt(vs,2)+" m/s",vs>15?"above NBR guide":"OK for NBR"]],verdict:iss.length?["bad","Check: "+iss.join("; ")+"."]:["ok","O-ring groove within guidelines."]};''')],
    quiz=[
        dict(q="Typical static O-ring squeeze is:", o=["2–5 %", "15–30 %", "50 %", "70 %"], a=1, e="Enough to seal, not overstress."),
        dict(q="Why keep gland fill below about 85 %?", o=["Cost", "Room for swell and thermal expansion", "Easier machining", "Colour"], a=1, e="Overfilled glands extrude and crack."),
        dict(q="Which elastomer for hot synthetic oil at 160 °C?", o=["NBR", "EPDM", "FKM", "Natural rubber"], a=2, e="FKM handles heat and synthetics."),
        dict(q="EPDM should not be used with:", o=["Water", "Mineral oil", "Steam", "Glycol"], a=1, e="It swells in hydrocarbons."),
        dict(q="A lip seal shaft should be:", o=["Soft and turned", "Hardened and plunge-ground", "Knurled", "Painted"], a=1, e="Lead from turning pumps oil out."),
        dict(q="Very high-speed shafts with no contact allowed use:", o=["O-rings", "Labyrinth seals", "Felt", "Gaskets"], a=1, e="Non-contact."),
        dict(q="CS = 2.62 mm, groove depth 2.10 mm. Squeeze (%)?", num=19.85, unit="%", e="0.52/2.62 = 19.8 %."),
        dict(q="Shaft 80 mm at 2,500 rpm. Surface speed (m/s)?", num=10.47, unit="m/s", e="π × 0.08 × 41.67 = 10.5 m/s."),
    ],
    refs=["ISO 3601-1/-2, Fluid power systems — O-rings: dimensions and housing design.", "ISO 6194, Rotary shaft lip-type seals incorporating elastomeric sealing elements.", "Parker Hannifin, O-Ring Handbook (ORD 5700).", "Flitney, R. K., Seals and Sealing Handbook, 6th ed., Elsevier, 2014."],
    links=[("Wikipedia — O-ring", "https://en.wikipedia.org/wiki/O-ring"), ("Wikipedia — Radial shaft seal", "https://en.wikipedia.org/wiki/Radial_shaft_seal")],
))

# ---------------------------------------------------------------- 65 PUMPS
H0, a_p, Hs, ks_, eta_p = 40.0, 0.005, 15.0, 0.003, 0.70
Qop = math.sqrt((H0 - Hs) / (a_p + ks_))
Hop = Hs + ks_ * Qop ** 2
Pop = 1000 * 9.81 * Qop / 3600 * Hop / eta_p / 1000
Qt = 45.0
s = math.sqrt((Hs + ks_ * Qt ** 2 + a_p * Qt ** 2) / H0)
Pv30 = 4246.0
NPSHa = (101325 - Pv30) / (1000 * 9.81) - 3.0 - 1.0
qq = np.linspace(0, 85, 100)
pp = plot([dict(pts=[(float(q), float(H0 - a_p * q * q)) for q in qq], label="pump curve (full speed)", at=20),
           dict(pts=[(float(q), float(H0 * s * s - a_p * q * q)) for q in qq], label=f"pump at {s*100:.0f} % speed", at=10),
           dict(pts=[(float(q), float(Hs + ks_ * q * q)) for q in qq], label="system curve", at=70)],
          "flow Q (m³/h)", "head H (m)", xlim=(0, 85), ylim=(0, 45), h=320, points=[(Qop, Hop, f"operating point {Qop:.1f} m³/h"), (Qt, Hs + ks_ * Qt ** 2, "45 m³/h by VFD")])
ARTICLES.append(dict(
    slug="centrifugal-pumps-curves-npsh", group="elements",
    title="Centrifugal Pumps: Pump and System Curves, Affinity Laws, Power and NPSH",
    short="Pumps", tags=["Pumps", "NPSH", "Affinity laws", "Fluid systems"],
    desc="Selecting and operating centrifugal pumps: head and flow, pump and system curves, operating point, affinity laws and variable-speed control, hydraulic and shaft power, efficiency, NPSH available versus required and cavitation.",
    blurb="Finding where a pump will run, what power it takes, how speed control changes it, and whether it will cavitate.",
    lead="A centrifugal pump does not decide its own flow: it runs where its head–flow curve crosses the system curve. Changing speed, impeller diameter or the system (valves, pipe size, static head) moves that point. Two other checks matter: shaft power, which sets motor size and running cost, and suction conditions, which decide whether the pump cavitates.",
    takeaways=[
        "System curve H = H<sub>static</sub> + kQ² (friction rises with the square of flow).",
        "Affinity laws at constant impeller: Q ∝ n, H ∝ n², P ∝ n³. With static head, flow does not fall in proportion to speed.",
        "Hydraulic power P = ρgQH; shaft power = ρgQH/η.",
        "NPSH<sub>a</sub> = (p<sub>atm</sub> − p<sub>v</sub>)/ρg + static suction head − suction losses; keep NPSH<sub>a</sub> ≥ NPSH<sub>r</sub> + margin (often 1 m or 1.1–1.3 ×).",
        "Run near the best efficiency point (about 80–110 % of BEP flow) for low vibration and long seal and bearing life.",
    ],
    body=f'''
<h2 id="curves">1. Pump and system curves</h2>
{fig(pp, "Figure 1. Pump curves at full and reduced speed with a system curve that has 15 m static head.")}
{formula("System: H = H_static + k·Q²\nAffinity: Q2/Q1 = n2/n1,  H2/H1 = (n2/n1)²,  P2/P1 = (n2/n1)³\nShaft power P = ρ·g·Q·H / η")}
<h2 id="npsh">2. NPSH and cavitation</h2>
{formula("NPSHa = (p_atm − p_vapour)/(ρ·g) + z_suction − h_f,suction\n(z_suction negative for suction lift)")}
<p>Cavitation sounds like gravel in the pump, erodes impellers and causes broadband vibration and falling head. Raise NPSH<sub>a</sub> by lowering the pump, enlarging suction pipes, reducing suction losses or cooling the liquid.</p>
<h2 id="example">3. Worked example</h2>
<p>Pump H = {H0:.0f} − {a_p}·Q², system H = {Hs:.0f} + {ks_}·Q² (Q in m³/h), efficiency {eta_p*100:.0f} %, water at 30 °C, suction lift 3 m with 1 m suction loss.</p>
{table(["Quantity","Value"],[["Operating point",f"<b>{Qop:.1f} m³/h at {Hop:.1f} m</b>"],["Shaft power",f"{Pop:.2f} kW"],["Speed for 45 m³/h",f"{s*100:.1f} % of full speed"],["NPSHa",f"{NPSHa:.2f} m (compare with NPSHr from the pump curve)"]],num_cols=(1,))}
''',
    calcs=[dict(id="pump", title="Operating point, power, speed for target flow and NPSHa",
                presets=[dict(label="Worked example", v=dict(H0=40, a=0.005, Hs=15, k=0.003, eta=70, Qt=45, z=-3, hf=1, pv=4.246, npr=3))],
                inputs=[dict(id="H0", label="Pump shut-off head H0 (m)", value=40), dict(id="a", label="Pump curve coefficient a (m per (m³/h)²)", value=0.005), dict(id="Hs", label="Static head (m)", value=15), dict(id="k", label="System k (m per (m³/h)²)", value=0.003),
                        dict(id="eta", label="Pump efficiency (%)", value=70), dict(id="Qt", label="Target flow (m³/h)", value=45), dict(id="z", label="Suction static head (m, negative = lift)", value=-3), dict(id="hf", label="Suction losses (m)", value=1),
                        dict(id="pv", label="Vapour pressure (kPa)", value=4.246), dict(id="npr", label="NPSHr (m)", value=3)],
                js='''var Q=Math.sqrt((v.H0-v.Hs)/(v.a+v.k)),H=v.Hs+v.k*Q*Q,P=1000*9.81*Q/3600*H/(v.eta/100)/1000,s=Math.sqrt((v.Hs+(v.k+v.a)*v.Qt*v.Qt)/v.H0),na=(101.325-v.pv)*1000/(1000*9.81)+v.z-v.hf;
var p1=[],p2=[],p3=[];for(var q=0;q<=Q*1.6;q+=Q/40){p1.push([q,v.H0-v.a*q*q]);p2.push([q,v.H0*s*s-v.a*q*q]);p3.push([q,v.Hs+v.k*q*q]);}
return {rows:[["Operating flow",fmt(Q,2)+" m³/h"],["Operating head",fmt(H,2)+" m"],["Shaft power",fmt(P,2)+" kW"],["Speed for target flow",fmt(s*100,1)+" %","power ≈ "+fmt(1000*9.81*v.Qt/3600*(v.Hs+v.k*v.Qt*v.Qt)/(v.eta/100)/1000,2)+" kW"],["NPSHa",fmt(na,2)+" m","margin "+fmt(na-v.npr,2)+" m"]],
verdict:na<v.npr+1?["bad","NPSH margin below 1 m: cavitation risk."]:["ok","NPSH margin adequate."],
svg:plotSVG([{pts:p1,label:"pump"},{pts:p2,label:"reduced speed"},{pts:p3,label:"system"}],{xlabel:"Q (m³/h)",ylabel:"H (m)",xmin:0,ymin:0}),caption:"Pump curves and system curve."};''')],
    quiz=[
        dict(q="A pump operates where:", o=["Its BEP is", "Its curve crosses the system curve", "The motor rating is", "Flow is maximum"], a=1, e="Intersection."),
        dict(q="Halving pump speed (no static head) reduces power to about:", o=["1/2", "1/4", "1/8", "Same"], a=2, e="P ∝ n³."),
        dict(q="Friction head in a pipe rises with:", o=["Q", "Q²", "Q³", "√Q"], a=1, e="Turbulent flow."),
        dict(q="Cavitation occurs when:", o=["NPSHa > NPSHr", "NPSHa < NPSHr", "Head is high", "Flow is low only"], a=1, e="Local pressure falls below vapour pressure."),
        dict(q="Which increases NPSHa?", o=["Raising the pump above the tank", "Lowering the pump / reducing suction losses", "Heating the liquid", "Smaller suction pipe"], a=1, e="More suction head, less loss."),
        dict(q="Running far from BEP causes:", o=["Better efficiency", "Recirculation, vibration and seal/bearing wear", "Nothing", "Lower power always"], a=1, e="Off-design operation."),
        dict(q="Q = 36 m³/h, H = 30 m, η = 0.75, water. Shaft power (kW)?", num=3.924, unit="kW", e="1000×9.81×0.01×30/0.75 = 3.92 kW."),
        dict(q="Speed from 1450 to 1160 rpm. New flow fraction (no static head)?", num=0.8, e="1160/1450 = 0.8."),
    ],
    refs=["Karassik, I. J. et al., Pump Handbook, 4th ed., McGraw-Hill, 2008.", "Gülich, J. F., Centrifugal Pumps, 3rd ed., Springer, 2014.", "ANSI/HI 9.6.1, Rotodynamic Pumps Guideline for NPSH Margin.", "ISO 9906, Rotodynamic pumps — Hydraulic performance acceptance tests."],
    links=[("Wikipedia — Centrifugal pump", "https://en.wikipedia.org/wiki/Centrifugal_pump"), ("Wikipedia — Affinity laws", "https://en.wikipedia.org/wiki/Affinity_laws")],
))
