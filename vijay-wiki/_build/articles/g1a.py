"""
TOOL:    Vijay_Wiki articles — group 1a (rolling bearings, gear rating, splines, shaft alignment)
FAMILY:  vijay-wiki
VERSION: 1.0.0
DATE:    2026-11-24
CHAT:    claude.ai — Vijay_Wiki: build all suggested topics in groups and upload
CHANGES: 1.0.0 Initial four articles
"""
import math
from wiki import plot, flow, bars, fig, table, box, formula

ARTICLES = []

# =====================================================================================
# 1. ROLLING BEARINGS
# =====================================================================================
C, P, n = 32.5, 3.0, 3000
L10 = (C / P) ** 3
L10h = L10 * 1e6 / (60 * n)
Z, db, Dp, al = 9, 11.906, 60.0, 0.0
fr = n / 60
r = db / Dp * math.cos(math.radians(al))
BPFO = Z / 2 * fr * (1 - r); BPFI = Z / 2 * fr * (1 + r)
BSF = Dp / (2 * db) * fr * (1 - r * r); FTF = fr / 2 * (1 - r)
a1_99 = 0.25

bearing_svg = '''<svg viewBox="0 0 900 320" role="img" aria-label="Deep groove ball bearing cross-section">
<rect x="260" y="40" width="220" height="70" rx="8" fill="var(--blue3)" stroke="var(--blue)" stroke-width="2.5"/>
<rect x="260" y="200" width="220" height="70" rx="8" fill="var(--blue3)" stroke="var(--blue)" stroke-width="2.5"/>
<circle cx="370" cy="155" r="52" fill="var(--panel)" stroke="var(--ink)" stroke-width="3"/>
<path d="M318 120 L300 120 L300 190 L318 190" fill="none" stroke="var(--orange)" stroke-width="5"/>
<path d="M422 120 L440 120 L440 190 L422 190" fill="none" stroke="var(--orange)" stroke-width="5"/>
<rect x="262" y="112" width="8" height="86" fill="var(--purple)"/><rect x="470" y="112" width="8" height="86" fill="var(--purple)"/>
<line x1="150" y1="300" x2="620" y2="300" stroke="var(--muted)" stroke-dasharray="10 5"/><text x="628" y="304" font-size="12" class="mut">shaft axis</text>
<line x1="540" y1="155" x2="540" y2="300" stroke="var(--orange)" stroke-width="2.5"/><text x="548" y="230" font-size="13" font-weight="700">D_pw/2 (pitch)</text>
<line x1="370" y1="155" x2="545" y2="155" stroke="var(--orange)" stroke-dasharray="4 3"/>
<line x1="220" y1="40" x2="220" y2="300" stroke="var(--ink)" stroke-width="1.5"/><text x="212" y="120" text-anchor="end" font-size="13" font-weight="700">D/2</text>
<line x1="245" y1="270" x2="245" y2="300" stroke="var(--ink)" stroke-width="1.5"/><text x="238" y="292" text-anchor="end" font-size="13" font-weight="700">d/2</text>
<g font-size="13"><text x="500" y="70">outer ring (raceway inside)</text><text x="500" y="250">inner ring (on shaft)</text>
<text x="640" y="150">ball (diameter D_w)</text><text x="640" y="170">cage holds spacing (orange)</text><text x="640" y="190">shields / seals (purple)</text></g>
<text x="370" y="20" text-anchor="middle" font-size="13" font-weight="700">B (width)</text><line x1="260" y1="28" x2="480" y2="28" stroke="var(--ink)" stroke-width="1.5"/>
</svg>'''

life_curves = plot([
    dict(pts=[(x, x ** 3) for x in [1 + i * 0.1 for i in range(0, 91)]], label="ball bearings: L10 = (C/P)³", at=6.5),
    dict(pts=[(x, x ** (10 / 3)) for x in [1 + i * 0.1 for i in range(0, 91)]], label="roller bearings: L10 = (C/P)^(10/3)", at=2.2),
], "load ratio C/P", "L10 life (millions of revolutions)", xlim=(1, 10), ylim=(1, 3000), ylog=True, h=340)

ARTICLES.append(dict(
    slug="rolling-bearings-life-and-defect-frequencies", group="rotating",
    title="Rolling Bearings: Types, Designations, Life and Defect Frequencies",
    short="Rolling bearings",
    tags=["Bearings", "ISO 281", "Vibration", "Machine elements"],
    desc="Rolling bearing types, ISO designation codes, L10 rating life, reliability factors and bearing defect frequencies with calculators and a self-test.",
    blurb="Choosing a bearing type, reading its designation, estimating L10 life and predicting the defect frequencies you will see in a vibration spectrum.",
    lead="A rolling bearing carries load through balls or rollers running on hardened raceways. Four questions come up again and again: which type suits the load and speed, what the part number means, how long it will last, and at which frequencies a damaged bearing shows up in vibration data. This article answers all four.",
    takeaways=[
        "Ball bearings suit high speed and light-to-moderate load; roller bearings carry more load at lower speed.",
        "The basic rating life is <b>L10 = (C/P)^p</b> million revolutions, with p = 3 for balls and 10/3 for rollers. Halving the load increases ball-bearing life eight times.",
        "L10 is the life that 90 % of identical bearings reach. For 99 % reliability multiply by about 0.25.",
        "Defect frequencies BPFO, BPFI, BSF and FTF depend only on geometry and shaft speed, and are not whole multiples of running speed.",
        "Most bearings fail early from lubrication, contamination, misalignment or installation, not from true fatigue.",
    ],
    body=f'''
<h2 id="types">1. Anatomy and types</h2>
{fig(bearing_svg, "Figure 1. Deep groove ball bearing: bore d, outside diameter D, width B, ball diameter D<sub>w</sub> and pitch diameter D<sub>pw</sub>.")}
{table(["Type","Radial load","Axial load","Speed","Misalignment","Typical use"],[
["Deep groove ball","Moderate","Moderate, both ways","Very high","Small (≈ 0.1°)","Motors, fans, gearboxes, general"],
["Angular contact ball","Moderate","High, one way (pairs for both)","Very high","Very small","Spindles, pumps, high-speed gearboxes"],
["Cylindrical roller","High","None or small","High","Very small","Gearboxes, motors (non-locating end)"],
["Tapered roller","High","High, one way","Moderate","Very small","Wheel hubs, gear shafts, rolling mills"],
["Spherical roller","Very high","Moderate","Moderate","Large (1–2.5°)","Heavy machinery, vibrating screens"],
["Needle roller","High for size","None","Moderate","Very small","Compact pivots, gear idlers"],
["Thrust ball / roller","None","High","Low–moderate","Small","Vertical shafts, screw jacks"],
])}
<p>Bearings are arranged as a <b>locating</b> bearing that fixes the shaft axially and a <b>non-locating</b> bearing that lets the shaft grow with temperature. A shaft held axially at both ends without allowance for thermal growth overloads its bearings as it warms up.</p>

<h2 id="designation">2. Reading a bearing designation</h2>
<p>Most manufacturers follow the ISO dimension plans, so the basic number tells you the type and size. Example: <code>6208-2RS1/C3</code>.</p>
{table(["Part","Example","Meaning"],[
["Type","6","Deep groove ball (7 = angular contact, N/NU = cylindrical roller, 3 = tapered, 2 = spherical roller, 5 = thrust ball)"],
["Dimension series","2","Width and diameter series: 0 and 1 = light, 2 = light, 3 = medium, 4 = heavy"],
["Bore code","08","For codes 04 to 96, bore = code × 5 mm, so 08 = 40 mm. 00 = 10, 01 = 12, 02 = 15, 03 = 17 mm."],
["Seals / shields","-2RS1, -2Z","2RS = contact seals both sides; 2Z or ZZ = metal shields both sides"],
["Internal clearance","C3","Greater than normal clearance; C2 smaller, CN normal, C4 and C5 larger"],
["Precision","P5, P4","Tolerance class tighter than normal (P0); used for spindles"],
["Contact angle (angular contact)","B, C, AC","Typically B = 40°, AC = 25°, C = 15°"],
])}
<p>Suffixes for cages, heat treatment and lubricant vary between makers, so check the catalogue of the brand you are holding.</p>

<h2 id="life">3. Rating life</h2>
{formula("L10  = (C / P)^p              [million revolutions]   p = 3 (ball), 10/3 (roller)\nL10h = 10^6 · L10 / (60 · n)    [hours]\nP    = X·Fr + Y·Fa              (equivalent dynamic load; X, Y from catalogue)\nLnm  = a1 · aISO · L10          (modified life: reliability a1, lubrication/contamination aISO)")}
{fig(life_curves, "Figure 2. Rating life against load ratio C/P (log scale). A bearing loaded to one tenth of its dynamic rating has a ball-bearing L10 of 1,000 million revolutions.")}
{table(["Reliability","90 %","95 %","96 %","97 %","98 %","99 %"],[["a1 (ISO 281)","1.00","0.64","0.55","0.47","0.37","0.25"]],num_cols=(1,2,3,4,5,6))}
<p>The factor a<sub>ISO</sub> combines the viscosity ratio κ, contamination level and fatigue load limit. Clean, well-lubricated bearings can reach several times L10; contaminated or thin-film bearings can fall to a fraction of it.</p>

<h3 id="ex-life">Worked example: life of a 6208 bearing</h3>
<p>A 6208 deep groove ball bearing (C = {C} kN) carries a pure radial load P = {P} kN at {n:,} rpm.</p>
{table(["Step","Result"],[
["C/P",f"{C/P:.2f}"],
["L10 = (C/P)³",f"{L10:,.0f} million revolutions"],
["L10h = 10⁶·L10/(60·n)",f"<b>{L10h:,.0f} h</b>"],
["For 99 % reliability (a1 = 0.25)",f"{L10h*a1_99:,.0f} h"],
["If the load doubles to 6 kN",f"{L10h/8:,.0f} h (one eighth)"],
],num_cols=(1,))}

<h2 id="frequencies">4. Bearing defect frequencies</h2>
<p>A local defect produces an impact each time a rolling element passes it. The impact rate depends on geometry and shaft speed f<sub>r</sub> (Hz), with D<sub>w</sub> the ball diameter, D<sub>pw</sub> the pitch diameter, Z the number of rolling elements and α the contact angle:</p>
{formula("BPFO = (Z/2) · fr · (1 − Dw/Dpw · cos α)      outer race defect\nBPFI = (Z/2) · fr · (1 + Dw/Dpw · cos α)      inner race defect\nBSF  = (Dpw/2Dw) · fr · (1 − (Dw/Dpw · cos α)²) ball spin (a ball defect shows at 2×BSF)\nFTF  = (fr/2) · (1 − Dw/Dpw · cos α)          cage (fundamental train)")}
<p>Rules of thumb: BPFO ≈ 0.4·Z·f<sub>r</sub>, BPFI ≈ 0.6·Z·f<sub>r</sub>, FTF ≈ 0.4·f<sub>r</sub>. Inner race defects are usually modulated by shaft speed (sidebands at ±f<sub>r</sub>) because the defect rotates in and out of the load zone. Real frequencies differ from calculated ones by 1–2 % because of slip.</p>
<h3 id="ex-freq">Worked example: 6208 at {n:,} rpm</h3>
<p>Z = {Z}, D<sub>w</sub> = {db} mm, D<sub>pw</sub> = {Dp:.0f} mm, α = 0°, f<sub>r</sub> = {fr:.1f} Hz.</p>
{table(["Frequency","Value (Hz)","Order (× shaft speed)"],[
["BPFO",f"{BPFO:.1f}",f"{BPFO/fr:.3f}"],["BPFI",f"{BPFI:.1f}",f"{BPFI/fr:.3f}"],["BSF",f"{BSF:.1f}",f"{BSF/fr:.3f}"],["FTF",f"{FTF:.2f}",f"{FTF/fr:.3f}"]],num_cols=(1,2))}

<h2 id="failures">5. Why bearings fail early</h2>
{table(["Damage","Appearance","Usual cause"],[
["Subsurface fatigue (spalling)","Flakes of material removed from raceway","End of life, or overload"],
["Surface-initiated fatigue","Grey frosted areas, micro-spalls","Thin oil film (κ &lt; 1), contamination"],
["Smearing","Material transferred, torn surface","Skidding under light load at high speed"],
["Indentations","Dents from particles","Contaminated lubricant"],
["False brinelling","Marks at ball spacing","Vibration while stationary"],
["Electrical erosion (fluting)","Washboard pattern","Current through bearing (variable-speed drives)"],
["Corrosion","Rust, pits","Water, condensation"],
["Overheating","Discoloured, hardness loss","Overfill, preload too high, poor cooling"],
])}
{box("note","Inspection tip","Look at the load path pattern on the raceways. Its position shows whether load was purely radial, axial, misaligned or unbalanced, which usually points directly to the root cause.")}
''',
    calcs=[
        dict(id="life", title="Bearing rating life (ISO 281 basic)", note="Enter the dynamic load rating C and equivalent load P in the same unit.",
             presets=[dict(label="6208, 3 kN, 3000 rpm", v=dict(C=32.5, P=3, n=3000, p="3", rel="1")), dict(label="NU 210 roller, 10 kN, 1500 rpm", v=dict(C=73.5, P=10, n=1500, p="3.3333", rel="1"))],
             inputs=[dict(id="C", label="Dynamic rating C (kN)", value=32.5), dict(id="P", label="Equivalent load P (kN)", value=3),
                     dict(id="n", label="Speed n (rpm)", value=3000),
                     dict(id="p", label="Bearing kind", value="3", options=[("3", "Ball (p = 3)"), ("3.3333", "Roller (p = 10/3)")]),
                     dict(id="rel", label="Reliability", value="1", options=[("1", "90 % (a1 = 1)"), ("0.64", "95 %"), ("0.55", "96 %"), ("0.47", "97 %"), ("0.37", "98 %"), ("0.25", "99 %")])],
             js='''var p=parseFloat(v.p),a1=parseFloat(v.rel);var L=Math.pow(v.C/v.P,p),Lh=L*1e6/(60*v.n);
var pts=[];for(var x=1;x<=10.001;x+=0.1)pts.push([x,Math.log10(Math.pow(x,p)*1e6/(60*v.n)*a1)]);
return {rows:[["C/P",fmt(v.C/v.P,2)],["L10",fmt(L,0)+" Mrev","million revolutions"],["L10h",fmt(Lh,0)+" h"],["L"+(a1<1?"n":"10")+"h with a1",fmt(Lh*a1,0)+" h","a1 = "+a1],["Years at 8,000 h/yr",fmt(Lh*a1/8000,1)]],
verdict:Lh*a1>20000?["ok","Long life for general machinery (> 20,000 h)."]:(Lh*a1>5000?["caution","Moderate life: check lubrication and contamination (aISO)."]:["bad","Short life: choose a larger bearing or reduce load."]),
svg:plotSVG([{pts:pts,label:"log10(life h)"}],{xlabel:"C/P",ylabel:"log10 life (h)",marks:[[v.C/v.P,Math.log10(Lh*a1),"this case"]]}),caption:"Life (log10 hours) against C/P for this speed and reliability."};'''),
        dict(id="freq", title="Bearing defect frequency calculator",
             presets=[dict(label="6208 at 3000 rpm", v=dict(n=3000, Z=9, Dw=11.906, Dpw=60, a=0)), dict(label="7009 C at 20,000 rpm", v=dict(n=20000, Z=17, Dw=7.144, Dpw=60, a=15))],
             inputs=[dict(id="n", label="Shaft speed (rpm)", value=3000), dict(id="Z", label="Number of balls/rollers Z", value=9),
                     dict(id="Dw", label="Ball diameter Dw (mm)", value=11.906), dict(id="Dpw", label="Pitch diameter Dpw (mm)", value=60),
                     dict(id="a", label="Contact angle α (°)", value=0)],
             js='''var fr=v.n/60,r=v.Dw/v.Dpw*Math.cos(v.a*Math.PI/180);
var o=v.Z/2*fr*(1-r),i=v.Z/2*fr*(1+r),b=v.Dpw/(2*v.Dw)*fr*(1-r*r),c=fr/2*(1-r);
var h='<table><tr><th>Harmonic</th><th class=num>BPFO</th><th class=num>BPFI</th><th class=num>2×BSF</th><th class=num>FTF</th></tr>';
for(var k=1;k<=4;k++)h+='<tr><td>'+k+'×</td><td class=num>'+fmt(k*o,1)+'</td><td class=num>'+fmt(k*i,1)+'</td><td class=num>'+fmt(k*2*b,1)+'</td><td class=num>'+fmt(k*c,2)+'</td></tr>';
return {rows:[["Shaft frequency fr",fmt(fr,2)+" Hz"],["BPFO",fmt(o,1)+" Hz",fmt(o/fr,3)+" × fr"],["BPFI",fmt(i,1)+" Hz",fmt(i/fr,3)+" × fr"],["BSF",fmt(b,1)+" Hz","ball defect at 2×BSF = "+fmt(2*b,1)],["FTF (cage)",fmt(c,2)+" Hz",fmt(c/fr,3)+" × fr"]],html:h+'</table>'};'''),
    ],
    quiz=[
        dict(q="What is the bore of a 6310 bearing?", o=["10 mm", "31 mm", "50 mm", "100 mm"], a=2, e="Bore code 10 × 5 = 50 mm."),
        dict(q="The life exponent p in L10 = (C/P)^p for ball bearings is:", o=["2", "3", "10/3", "4"], a=1, e="p = 3 for ball bearings, 10/3 for roller bearings."),
        dict(q="If the load on a ball bearing is halved, its L10 life becomes:", o=["2 times", "4 times", "8 times", "Unchanged"], a=2, e="(2)³ = 8."),
        dict(q="L10 is the life that:", o=["All bearings reach", "90 % of identical bearings reach or exceed", "10 % of bearings reach", "The average bearing reaches"], a=1, e="10 % may fail before L10; 90 % survive."),
        dict(q="Which bearing tolerates the most misalignment?", o=["Angular contact ball", "Cylindrical roller", "Spherical roller", "Tapered roller"], a=2, e="Spherical roller bearings self-align by 1–2.5°."),
        dict(q="Suffix C3 on a bearing means:", o=["Precision class 3", "Greater than normal internal clearance", "Three seals", "Ceramic balls"], a=1, e="C3 = clearance larger than normal, used with tight fits or high temperature."),
        dict(q="Inner race defects usually show sidebands at:", o=["± cage frequency", "± shaft speed", "± ball spin", "No sidebands"], a=1, e="The defect rotates with the shaft through the load zone, modulating at shaft speed."),
        dict(q="A washboard pattern on the raceway suggests:", o=["False brinelling", "Electrical current damage", "Overload", "Corrosion"], a=1, e="Fluting comes from current passing through the bearing, often with variable-speed drives."),
        dict(q="Calculate L10h (hours) for C = 20 kN, P = 2 kN, n = 1500 rpm, ball bearing.", num=11111, unit="h", e="(20/2)³ = 1000 Mrev; 10⁹/(60×1500) = 11,111 h."),
        dict(q="Shaft speed 1800 rpm, Z = 8, Dw/Dpw·cosα = 0.2. Calculate BPFO in Hz.", num=96, unit="Hz", e="fr = 30 Hz; BPFO = 4 × 30 × 0.8 = 96 Hz."),
    ],
    glossary=[["BPFO / BPFI", "Ball pass frequency, outer / inner race"], ["BSF", "Ball spin frequency"], ["FTF", "Fundamental train (cage) frequency"],
              ["C, C0", "Dynamic and static load ratings"], ["L10", "Rating life at 90 % reliability"], ["Locating bearing", "Bearing that fixes the shaft axially"]],
    refs=["ISO 281:2007, Rolling bearings — Dynamic load ratings and rating life.", "ISO 15, ISO 355: Rolling bearings — Boundary dimensions.",
          "ISO 15243, Rolling bearings — Damage and failures — Terms, characteristics and causes.",
          "Harris, T. A. and Kotzalas, M. N., Rolling Bearing Analysis, 5th ed., CRC Press, 2006.",
          "Randall, R. B., Vibration-based Condition Monitoring, Wiley, 2011.", "Bearing manufacturers' general catalogues (SKF, Schaeffler, NSK, Timken)."],
    links=[("SKF bearing knowledge", "https://www.skf.com"), ("Wikipedia — Rolling-element bearing", "https://en.wikipedia.org/wiki/Rolling-element_bearing")],
))

# =====================================================================================
# 2. GEAR RATING ISO 6336
# =====================================================================================
m, z1, z2, b, T1, KA, Kv, KHb, KFb = 3.0, 25, 50, 30.0, 200.0, 1.25, 1.10, 1.30, 1.25
d1 = m * z1; u = z2 / z1
Ft = 2000 * T1 / d1
ZH, ZE = 2.495, 189.8
ra1 = d1 / 2 + m; rb1 = d1 / 2 * math.cos(math.radians(20)); d2 = m * z2; ra2 = d2 / 2 + m; rb2 = d2 / 2 * math.cos(math.radians(20))
a_c = (d1 + d2) / 2
eps = (math.sqrt(ra1**2 - rb1**2) + math.sqrt(ra2**2 - rb2**2) - a_c * math.sin(math.radians(20))) / (math.pi * m * math.cos(math.radians(20)))
Zeps = math.sqrt((4 - eps) / 3)
sigH = ZH * ZE * Zeps * math.sqrt(Ft / (d1 * b) * (u + 1) / u) * math.sqrt(KA * Kv * KHb)
YFS = 4.6
sigF = Ft / (b * m) * YFS * (0.25 + 0.75 / eps) * KA * Kv * KFb
SH = 1500 / sigH; SF = 500 * 2 / sigF  # sigmaFE = 2*sigFlim, YST=2 included

gear_svg = '''<svg viewBox="0 0 900 340" role="img" aria-label="Gear mesh with pitch circles, line of action and forces">
<circle cx="250" cy="170" r="110" fill="none" stroke="var(--blue)" stroke-width="3"/><circle cx="250" cy="170" r="103" fill="none" stroke="var(--muted)" stroke-dasharray="5 4"/>
<circle cx="580" cy="170" r="220" fill="none" stroke="var(--blue)" stroke-width="3"/>
<circle cx="250" cy="170" r="4" fill="var(--ink)"/><circle cx="580" cy="170" r="4" fill="var(--ink)"/>
<line x1="250" y1="170" x2="580" y2="170" stroke="var(--muted)" stroke-dasharray="8 5"/>
<circle cx="360" cy="170" r="6" fill="var(--orange)"/><text x="366" y="190" font-size="13" font-weight="700">pitch point</text>
<line x1="300" y1="60" x2="420" y2="290" stroke="var(--orange)" stroke-width="3.5"/><text x="425" y="300" font-size="13" font-weight="700">line of action (20°)</text>
<line x1="360" y1="170" x2="360" y2="70" stroke="var(--ink)" stroke-width="3"/><polygon points="354,78 366,78 360,64" fill="var(--ink)"/><text x="368" y="80" font-size="13" font-weight="700">Ft (tangential)</text>
<line x1="360" y1="170" x2="300" y2="170" stroke="var(--purple)" stroke-width="3"/><polygon points="306,164 306,176 294,170" fill="var(--purple)"/><text x="268" y="160" font-size="13" font-weight="700">Fr</text>
<text x="250" y="320" text-anchor="middle" font-size="13">pinion: d1 = m·z1</text><text x="640" y="320" text-anchor="middle" font-size="13">wheel: d2 = m·z2</text>
<text x="120" y="40" font-size="13">a = (d1 + d2)/2</text>
</svg>'''

sensitivity = plot([dict(pts=[(bb, ZH*ZE*Zeps*math.sqrt(Ft/(d1*bb)*(u+1)/u)*math.sqrt(KA*Kv*KHb)) for bb in range(10, 81)], label="contact stress σH", at=55),
                    dict(pts=[(bb, Ft/(bb*m)*YFS*(0.25+0.75/eps)*KA*Kv*KFb) for bb in range(10, 81)], label="root stress σF", at=55)],
                   "face width b (mm)", "stress (MPa)", xlim=(10, 80), ylim=(0, 2200), h=320)

ARTICLES.append(dict(
    slug="gear-rating-iso-6336", group="rotating",
    title="Spur and Helical Gear Rating to ISO 6336 (Method B Overview)",
    short="Gear rating ISO 6336",
    tags=["Gears", "ISO 6336", "Machine design", "Power transmission"],
    desc="Gear geometry, tooth forces, contact (pitting) and root bending stresses and safety factors following ISO 6336 Method B, with a rating calculator.",
    blurb="Tooth forces, contact and bending stress, load factors and safety factors for spur and helical gears, the way ISO 6336 does it.",
    lead="A gear pair fails in two main ways: the flanks pit because contact stress is too high, or a tooth breaks because root bending stress is too high. ISO 6336 calculates both, applies load factors for real operating conditions, and compares the result with the material's allowable stress. This article shows the chain of calculation and what each factor means.",
    takeaways=[
        "Module m sets tooth size: pitch diameter d = m·z. Gears mesh only if module and pressure angle match.",
        "Tangential force F<sub>t</sub> = 2000·T/d (T in N·m, d in mm) drives both stress checks.",
        "Contact stress varies with √F<sub>t</sub>; root stress varies with F<sub>t</sub>. Doubling face width cuts root stress in half but contact stress only by 30 %.",
        "Load factors K<sub>A</sub>, K<sub>v</sub>, K<sub>Hβ</sub>, K<sub>Hα</sub> raise the nominal load to the real one. Face load factor K<sub>Hβ</sub> (misalignment) is often the largest.",
        "Typical minimum safety factors: S<sub>H</sub> ≥ 1.0–1.3 for pitting, S<sub>F</sub> ≥ 1.4–2.0 for bending, since a tooth breakage is more serious.",
    ],
    body=f'''
<h2 id="geometry">1. Geometry and forces</h2>
{fig(gear_svg, "Figure 1. External spur gear mesh: pitch circles, pitch point, 20° line of action and the tangential and radial components of tooth force.")}
{table(["Quantity","Formula","Notes"],[
["Pitch diameter","d = m·z (spur); d = m<sub>n</sub>·z / cos β (helical)","m = module (mm)"],
["Centre distance","a = (d1 + d2)/2",""],
["Gear ratio","u = z2/z1 ≥ 1",""],
["Base diameter","d<sub>b</sub> = d·cos α","α = pressure angle, usually 20°"],
["Transverse contact ratio","ε<sub>α</sub> = [√(r<sub>a1</sub>²−r<sub>b1</sub>²) + √(r<sub>a2</sub>²−r<sub>b2</sub>²) − a·sin α] / (π·m·cos α)","&gt; 1.2 recommended; 1.4–1.8 typical"],
["Tangential force","F<sub>t</sub> = 2000·T<sub>1</sub>/d<sub>1</sub>","N, with T in N·m and d in mm"],
["Radial force","F<sub>r</sub> = F<sub>t</sub>·tan α<sub>t</sub>",""],
["Axial force (helical)","F<sub>a</sub> = F<sub>t</sub>·tan β","must be carried by bearings"],
])}

<h2 id="contact">2. Contact (pitting) stress</h2>
{formula("σH  = ZH · ZE · Zε · Zβ · √[ Ft/(d1·b) · (u+1)/u ] · √(KA · Kv · KHβ · KHα)\nσHP = σHlim · ZNT · ZL · Zv · ZR · ZW · ZX / SHmin\nSH  = σHP_without_SHmin / σH")}
<ul>
<li><b>Z<sub>H</sub></b> zone factor: 2.495 for spur gears with α = 20° and no profile shift.</li>
<li><b>Z<sub>E</sub></b> elasticity factor: 189.8 √MPa for steel on steel.</li>
<li><b>Z<sub>ε</sub></b> contact ratio factor: √[(4 − ε<sub>α</sub>)/3] for spur gears.</li>
<li><b>Z<sub>NT</sub>, Z<sub>L</sub>, Z<sub>v</sub>, Z<sub>R</sub></b>: life, lubricant, speed and roughness factors (about 1 for a first estimate at long life).</li>
</ul>

<h2 id="bending">3. Tooth root bending stress</h2>
{formula("σF  = Ft/(b · mn) · YF · YS · Yβ · Yε · KA · Kv · KFβ · KFα\nσFP = σFlim · YST · YNT · YδrelT · YRrelT · YX / SFmin      (YST = 2)\nSF  = σFP_without_SFmin / σF")}
<p>Y<sub>F</sub> (form factor) and Y<sub>S</sub> (stress correction) depend on tooth count and profile shift; their product Y<sub>FS</sub> is about 4.3–4.8 for 20–40 teeth with standard profiles. Y<sub>ε</sub> ≈ 0.25 + 0.75/ε<sub>α</sub>.</p>

<h2 id="factors">4. Load factors and materials</h2>
{table(["Factor","Meaning","Typical range"],[
["K<sub>A</sub> application","Shocks from driver and driven machine","1.0 uniform; 1.25 moderate; 1.5–2 heavy shock"],
["K<sub>v</sub> dynamic","Internal dynamic loads from transmission error and speed","1.02–1.5 (higher for poor accuracy, high speed)"],
["K<sub>Hβ</sub>, K<sub>Fβ</sub> face load","Uneven load across the face from misalignment and deflection","1.1–2.0; reduced by crowning and helix correction"],
["K<sub>Hα</sub>, K<sub>Fα</sub> transverse","Load sharing between tooth pairs","1.0–1.4"],
])}
{table(["Material / treatment","σ<sub>Hlim</sub> (MPa)","σ<sub>Flim</sub> (MPa)"],[
["Through-hardened alloy steel (≈ 300 HB)","≈ 700–800","≈ 280–330"],
["Nitrided steel","≈ 1,000–1,250","≈ 350–430"],
["Case-carburised, high quality (≈ 60 HRC)","≈ 1,500–1,650","≈ 460–525"],
],num_cols=(1,2))}
<p class="meta">Indicative values from ISO 6336-5 quality grades ML–ME. Use the standard's charts for actual design.</p>

<h2 id="example">5. Worked example</h2>
<p>Spur pair, m = {m:.0f} mm, z1 = {z1}, z2 = {z2}, b = {b:.0f} mm, input torque T1 = {T1:.0f} N·m, case-carburised (σ<sub>Hlim</sub> = 1,500 MPa, σ<sub>Flim</sub> = 500 MPa). K<sub>A</sub> = {KA}, K<sub>v</sub> = {Kv}, K<sub>Hβ</sub> = {KHb}, K<sub>Fβ</sub> = {KFb}, K<sub>α</sub> = 1.0, Y<sub>FS</sub> = {YFS}.</p>
{table(["Step","Result"],[
["d1 = m·z1",f"{d1:.0f} mm"],["u",f"{u:.1f}"],["Ft = 2000·T1/d1",f"{Ft:,.0f} N"],
["Contact ratio εα",f"{eps:.2f}"],["Zε",f"{Zeps:.3f}"],
["σH",f"<b>{sigH:,.0f} MPa</b>"],["SH = 1500/σH",f"<b>{SH:.2f}</b>"],
["σF = Ft/(b·m)·YFS·Yε·KA·Kv·KFβ",f"<b>{sigF:,.0f} MPa</b>"],["SF = 2·500/σF",f"<b>{SF:.2f}</b>"],
],num_cols=(1,))}
{fig(sensitivity, "Figure 2. Effect of face width on contact and root stress for the example pair. Root stress falls in proportion to 1/b, contact stress only as 1/√b.")}
{box("key","What it shows",f"Both safety factors are comfortable (S<sub>H</sub> ≈ {SH:.2f}, S<sub>F</sub> ≈ {SF:.2f}). Pitting is the governing failure mode here, which is typical for hardened gears with moderate module. To gain margin, a larger centre distance helps contact stress more than a wider face.")}
''',
    calcs=[dict(id="gear", title="Spur gear rating (simplified ISO 6336 Method B)",
                note="Simplified: Zβ = Yβ = 1 (spur), life, lubrication and size factors = 1, K<sub>Hα</sub> = K<sub>Fα</sub> = 1.",
                presets=[dict(label="Worked example", v=dict(m=3, z1=25, z2=50, b=30, T=200, KA=1.25, Kv=1.1, KHb=1.3, KFb=1.25, sH=1500, sF=500, YFS=4.6))],
                inputs=[dict(id="m", label="Module m (mm)", value=3), dict(id="z1", label="Pinion teeth z1", value=25), dict(id="z2", label="Wheel teeth z2", value=50),
                        dict(id="b", label="Face width b (mm)", value=30), dict(id="T", label="Pinion torque T1 (N·m)", value=200),
                        dict(id="KA", label="KA application", value=1.25), dict(id="Kv", label="Kv dynamic", value=1.1),
                        dict(id="KHb", label="KHβ face (contact)", value=1.3), dict(id="KFb", label="KFβ face (bending)", value=1.25),
                        dict(id="sH", label="σHlim (MPa)", value=1500), dict(id="sF", label="σFlim (MPa)", value=500), dict(id="YFS", label="YF·YS (≈4.3–4.8)", value=4.6)],
                js='''var al=20*Math.PI/180,d1=v.m*v.z1,d2=v.m*v.z2,u=v.z2/v.z1,Ft=2000*v.T/d1,a=(d1+d2)/2;
var ra1=d1/2+v.m,ra2=d2/2+v.m,rb1=d1/2*Math.cos(al),rb2=d2/2*Math.cos(al);
var e=(Math.sqrt(ra1*ra1-rb1*rb1)+Math.sqrt(ra2*ra2-rb2*rb2)-a*Math.sin(al))/(Math.PI*v.m*Math.cos(al));
var Ze=Math.sqrt((4-e)/3),sH=2.495*189.8*Ze*Math.sqrt(Ft/(d1*v.b)*(u+1)/u)*Math.sqrt(v.KA*v.Kv*v.KHb);
var sF=Ft/(v.b*v.m)*v.YFS*(0.25+0.75/e)*v.KA*v.Kv*v.KFb,SH=v.sH/sH,SF=2*v.sF/sF;
var ok=SH>=1.1&&SF>=1.5;
return {rows:[["Pitch diameters",fmt(d1,1)+" / "+fmt(d2,1)+" mm","centre distance "+fmt(a,1)+" mm"],["Tangential force Ft",fmt(Ft,0)+" N","radial "+fmt(Ft*Math.tan(al),0)+" N"],
["Contact ratio εα",fmt(e,2),e<1.2?"low: below 1.2":"ok"],["Contact stress σH",fmt(sH,0)+" MPa"],["Safety SH",fmt(SH,2),"pitting"],["Root stress σF",fmt(sF,0)+" MPa"],["Safety SF",fmt(SF,2),"bending (YST = 2)"]],
verdict:ok?["ok","Both safety factors meet typical minimums (SH ≥ 1.1, SF ≥ 1.5)."]:["bad","Below typical minimum safety: increase width, module or centre distance, or use a stronger material."]};''')],
    quiz=[
        dict(q="A spur gear has module 4 mm and 30 teeth. Its pitch diameter is:", o=["34 mm", "120 mm", "7.5 mm", "60 mm"], a=1, e="d = m·z = 4 × 30 = 120 mm."),
        dict(q="Contact stress σH is proportional to:", o=["Ft", "√Ft", "Ft²", "1/Ft"], a=1, e="Hertzian contact stress varies with the square root of load."),
        dict(q="Which factor accounts for uneven load across the face width?", o=["KA", "Kv", "KHβ", "ZE"], a=2, e="KHβ is the face load factor, driven by misalignment and deflection."),
        dict(q="Why is the minimum bending safety factor usually larger than the pitting one?", o=["Bending is easier to calculate", "Tooth breakage is sudden and serious, pitting progresses slowly", "Pitting never happens", "ISO forbids SH > 1"], a=1, e="A broken tooth stops the machine; pitting gives warning."),
        dict(q="Doubling face width b reduces root bending stress by about:", o=["30 %", "50 %", "75 %", "0 %"], a=1, e="σF ∝ 1/b."),
        dict(q="ZE for steel on steel is about:", o=["2.5", "100 √MPa", "189.8 √MPa", "210 GPa"], a=2, e="ZE = 189.8 √MPa."),
        dict(q="Pinion torque 150 N·m, pitch diameter 60 mm. Calculate Ft in N.", num=5000, unit="N", e="Ft = 2000 × 150/60 = 5,000 N."),
        dict(q="Ft = 5,000 N and pressure angle 20°. Calculate radial force Fr in N.", num=1820, unit="N", e="Fr = 5000 × tan 20° = 1,820 N."),
    ],
    refs=["ISO 6336-1/-2/-3/-5:2019, Calculation of load capacity of spur and helical gears.", "AGMA 2101-D04, Fundamental Rating Factors and Calculation Methods for Involute Spur and Helical Gear Teeth.",
          "Niemann, G. and Winter, H., Maschinenelemente, Band II, Springer.", "Dudley, D. W., Handbook of Practical Gear Design, CRC Press.",
          "Radzevich, S. P., Dudley's Handbook of Practical Gear Design and Manufacture, 3rd ed., CRC Press, 2016."],
    links=[("Wikipedia — Gear", "https://en.wikipedia.org/wiki/Gear"), ("ISO — standards catalogue", "https://www.iso.org")],
))

# =====================================================================================
# 3. INVOLUTE SPLINES
# =====================================================================================
Tsp, ms, zs, dB, Lsp, Ksh = 300.0, 1.25, 22, 30.0, 25.0, 0.75
dps = ms * zs
hw = 0.9 * ms
psp = 2 * Tsp * 1000 / (dps * zs * hw * Lsp * Ksh)
dr = dB - 2.2 * ms
tau = 16 * Tsp * 1000 / (math.pi * dr ** 3)


def spline_svg():
    import math as M
    cx, cy, Ro, Ri, z = 220, 170, 130, 112, 18
    pts = []
    for k in range(z):
        a0 = 2 * M.pi * k / z
        for da, R in [(0, Ri), (0.09, Ro), (0.22, Ro), (0.31, Ri)]:
            a = a0 + da * 2 * M.pi / z * 3.2 / 1
            pts.append(f"{cx + R * M.cos(a):.1f},{cy + R * M.sin(a):.1f}")
    return ('<svg viewBox="0 0 900 340" role="img" aria-label="External spline cross section and coupling">'
            f'<polygon points="{" ".join(pts)}" fill="var(--blue3)" stroke="var(--blue)" stroke-width="2.5"/>'
            f'<circle cx="{cx}" cy="{cy}" r="121" fill="none" stroke="var(--orange)" stroke-dasharray="6 4" stroke-width="2"/>'
            f'<text x="{cx}" y="{cy+5}" text-anchor="middle" font-size="13" font-weight="700">shaft (W)</text>'
            f'<text x="{cx}" y="325" text-anchor="middle" font-size="13">pitch circle d = m·z (dashed)</text>'
            '<g transform="translate(470,60)"><rect x="0" y="40" width="160" height="140" fill="var(--blue3)" stroke="var(--blue)" stroke-width="2"/>'
            '<rect x="120" y="20" width="260" height="180" fill="none" stroke="var(--ink)" stroke-width="2.5"/>'
            '<rect x="140" y="60" width="120" height="100" fill="var(--orange3)" stroke="var(--orange)" stroke-width="2"/>'
            '<text x="200" y="105" text-anchor="middle" font-size="12.5">engagement</text><text x="200" y="122" text-anchor="middle" font-size="12.5">length L</text>'
            '<text x="60" y="215" text-anchor="middle" font-size="13">male (shaft)</text><text x="300" y="220" text-anchor="middle" font-size="13">female (hub)</text>'
            '<path d="M140 50 Q200 40 260 50" fill="none" stroke="var(--purple)" stroke-width="3"/><text x="200" y="12" text-anchor="middle" font-size="12.5">crowning lets the joint tilt</text></g>'
            '</svg>')


ARTICLES.append(dict(
    slug="involute-spline-couplings", group="rotating",
    title="Involute Spline Couplings: Standards, Fits, Load Capacity and Wear",
    short="Involute splines",
    tags=["Splines", "DIN 5480", "ISO 4156", "Fretting"],
    desc="Involute spline types and standards (DIN 5480, ISO 4156, ANSI B92.1), designation, fits, flank pressure and shear checks, crowning and fretting wear.",
    blurb="How involute splines are specified, sized for torque and kept alive against fretting wear when they run misaligned.",
    lead="A spline transmits torque between a shaft and a hub through many teeth at once. Involute splines centre themselves under load and are easy to make with gear-cutting methods, which is why they dominate in gearboxes and drive shafts. Their usual problem is not breakage but wear: misalignment makes the teeth slide, and sliding under load causes fretting.",
    takeaways=[
        "Involute splines (DIN 5480, ISO 4156, ANSI B92.1) use 30° pressure angle in most standards; DIN 5480 is based on a reference diameter.",
        "Flank-centred fits are self-centring under torque; diameter-centred fits are used where running accuracy matters without load.",
        "Size by flank pressure and shaft shear. Only part of the teeth carry load: a load-sharing factor of 0.5–0.75 is common.",
        "Misaligned splines slide axially every revolution. Crowning the male teeth, hard surfaces and good lubrication control fretting wear.",
        "Oil-flooded splines wear far less than grease-packed or dry ones.",
    ],
    body=f'''
<h2 id="standards">1. Types and standards</h2>
{fig(spline_svg(), "Figure 1. External (male) spline section and a male–female spline coupling. Crowning on the male teeth allows angular misalignment.")}
{table(["Standard","Basis","Pressure angle","Notes"],[
["DIN 5480","Reference diameter d<sub>B</sub> (e.g. 30 mm), module series","30°","Common in Europe; designation W (shaft) / N (hub)"],
["ISO 4156","Module, tooth count","30°, 37.5°, 45°","International; flat-root or fillet-root"],
["ANSI B92.1 / SAE","Diametral pitch (inch)","30°, 37.5°, 45°","US practice, aerospace"],
["DIN ISO 14 (straight-sided)","Number × minor × major diameter","—","Parallel-sided keys; machine tools"],
["DIN 5481 (serrations)","Fine teeth","≈ 60°","Small torque, clamped joints"],
])}
<p><b>Designation example (DIN 5480):</b> <code>DIN 5480 – W 30 × 1.25 × 22 × 8f</code> means shaft spline, reference diameter 30 mm, module 1.25 mm, 22 teeth, tolerance quality 8 with fit position f. The hub would be <code>N 30 × 1.25 × 22 × 9H</code>.</p>

<h2 id="fits">2. Fits and centring</h2>
{table(["Centring","How it works","Use"],[
["Flank (side) fit","Teeth flanks centre the parts under torque","Most power transmission; self-centring under load"],
["Major / minor diameter fit","Tip or root diameter centres the hub","Better running accuracy at low torque; sliding gears"],
["Fixed (clamped, interference)","No relative motion","Hubs that must not wear; needs press-fit or clamping"],
["Flexible (sliding, misaligned)","Teeth slide axially with misalignment","Drive shafts, couplings; wear is the design limit"],
])}

<h2 id="capacity">3. Load capacity checks</h2>
{formula("Flank pressure:   p = 2·T / (d · z · h_w · L · K)        [MPa, T in N·mm]\n  d = pitch diameter m·z, h_w ≈ 0.9·m (working depth), L = engagement length,\n  K = load-sharing factor (0.5–0.75; 1.0 only for perfectly aligned, accurate splines)\nShaft shear:      τ = 16·T / (π · d_r³)                  d_r ≈ root diameter\nTooth shear at pitch line (rarely critical): τ_t = 4·T/(d·z·s·L·K), s = tooth thickness")}
{table(["Spline condition","Indicative allowable flank pressure"],[
["Fixed, hardened (≥ 50 HRC), aligned","100–200 MPa"],
["Fixed, through-hardened","60–100 MPa"],
["Flexible / sliding under load, hardened and lubricated","20–40 MPa (wear-limited)"],
["Sliding under load, unhardened","5–15 MPa"],
],num_cols=())}
<p class="meta">Allowable values vary widely with hardness, lubrication and life. Use them as a first screen and confirm against test experience or a detailed method (e.g. Dudley's spline rating).</p>

<h2 id="wear">4. Misalignment, crowning and fretting</h2>
<ul>
<li>With angular misalignment θ, each tooth slides axially by roughly ±(d/2)·θ per revolution. At high speed this is millions of small strokes per hour: classic fretting conditions.</li>
<li><b>Crowning</b> the male teeth (a slight barrel shape along the length) lets the coupling tilt without loading the tooth ends. It reduces edge pressure but shortens the effective contact length, so flank pressure rises.</li>
<li><b>Lubrication:</b> continuous oil flow removes debris and heat and gives the lowest wear. Grease works for low-speed or intermittent duty with regular re-packing. Dry splines need hard, coated surfaces (nitriding, DLC, MoS₂ films).</li>
<li><b>Warning signs:</b> red-brown oxide ("cocoa") at the spline ends, step wear on flanks, rising backlash, and a growing 1× and 2× shaft vibration component.</li>
</ul>

<h2 id="example">5. Worked example</h2>
<p>DIN 5480 W 30 × 1.25 × 22, engagement L = {Lsp:.0f} mm, torque T = {Tsp:.0f} N·m, load sharing K = {Ksh}.</p>
{table(["Step","Result"],[
["Pitch diameter d = m·z",f"{dps:.1f} mm"],["Working depth h_w ≈ 0.9·m",f"{hw:.3f} mm"],
["Flank pressure p",f"<b>{psp:.0f} MPa</b>"],["Root diameter d_r ≈ d_B − 2.2·m",f"{dr:.2f} mm"],["Shaft shear τ = 16T/(π·d_r³)",f"<b>{tau:.0f} MPa</b>"],
],num_cols=(1,))}
{box("key","What it shows",f"A flank pressure near {psp:.0f} MPa is acceptable for a fixed, hardened spline but too high for a sliding, misaligned one, where 20–40 MPa is typical. For a flexible coupling at this torque, lengthen the engagement, increase the diameter, or ensure oil-flooded lubrication and hard surfaces. The shaft shear stress of {tau:.0f} MPa is moderate for a hardened alloy steel.")}
''',
    calcs=[dict(id="spl", title="Spline flank pressure and shaft shear",
                presets=[dict(label="W 30×1.25×22, 300 N·m", v=dict(T=300, m=1.25, z=22, dB=30, L=25, K=0.75, pall=40)),
                         dict(label="W 45×2×21, 800 N·m", v=dict(T=800, m=2, z=21, dB=45, L=35, K=0.75, pall=40))],
                inputs=[dict(id="T", label="Torque T (N·m)", value=300), dict(id="m", label="Module m (mm)", value=1.25), dict(id="z", label="Teeth z", value=22),
                        dict(id="dB", label="Reference / major diameter (mm)", value=30), dict(id="L", label="Engagement length L (mm)", value=25),
                        dict(id="K", label="Load sharing K (0.5–1)", value=0.75), dict(id="pall", label="Allowable flank pressure (MPa)", value=40)],
                js='''var d=v.m*v.z,h=0.9*v.m,p=2*v.T*1000/(d*v.z*h*v.L*v.K),dr=v.dB-2.2*v.m,tau=16*v.T*1000/(Math.PI*Math.pow(dr,3));
var Lneed=2*v.T*1000/(d*v.z*h*v.pall*v.K);
return {rows:[["Pitch diameter",fmt(d,2)+" mm"],["Flank pressure p",fmt(p,1)+" MPa","allowable "+fmt(v.pall,0)],["Length needed for allowable",fmt(Lneed,1)+" mm"],["Root diameter (approx.)",fmt(dr,2)+" mm"],["Shaft shear τ",fmt(tau,0)+" MPa"]],
verdict:p<=v.pall?["ok","Flank pressure within the allowable value."]:["bad","Flank pressure exceeds allowable: lengthen engagement to about "+fmt(Lneed,0)+" mm or enlarge the spline."]};''')],
    quiz=[
        dict(q="Most involute spline standards use a pressure angle of:", o=["14.5°", "20°", "30°", "60°"], a=2, e="30° is standard for DIN 5480 and the common ISO 4156 / ANSI series."),
        dict(q="In DIN 5480, 'W' in the designation means:", o=["Width", "Shaft (external) spline", "Hub (internal)", "Wear resistant"], a=1, e="W = Welle (shaft); N = Nabe (hub)."),
        dict(q="Why is a load-sharing factor below 1 used?", o=["Material is weaker", "Not all teeth carry equal load due to errors and misalignment", "To add safety for corrosion", "Because of centrifugal force"], a=1, e="Spacing errors and misalignment mean only part of the teeth carry the load."),
        dict(q="Crowning the male spline teeth mainly:", o=["Increases torque capacity", "Allows angular misalignment without edge loading", "Prevents corrosion", "Reduces cost"], a=1, e="It avoids loading the tooth ends when the joint tilts."),
        dict(q="Red-brown powder at spline ends indicates:", o=["Overheating", "Fretting wear (iron oxide debris)", "Grease breakdown only", "Paint"], a=1, e="Fretting produces fine red iron oxide ('cocoa')."),
        dict(q="Which lubrication gives the lowest spline wear at high speed?", o=["Dry", "Grease packed once", "Continuous oil flow", "Anti-seize paste"], a=2, e="Oil removes debris and heat and keeps a film."),
        dict(q="T = 200 N·m, d = 25 mm, z = 20, h_w = 1.0 mm, L = 20 mm, K = 0.5. Calculate flank pressure (MPa).", num=80, unit="MPa", e="p = 2×200,000/(25×20×1×20×0.5) = 80 MPa."),
        dict(q="Shaft root diameter 20 mm carries 150 N·m. Calculate the shear stress in MPa.", num=95.5, unit="MPa", e="τ = 16×150,000/(π×20³) = 95.5 MPa."),
    ],
    refs=["DIN 5480-1/-2, Involute splines based on reference diameters.", "ISO 4156-1/-2/-3, Straight cylindrical involute splines — Metric module, side fit.",
          "ANSI B92.1, Involute Splines and Inspection.", "Dudley, D. W., 'When splines need stress control', Product Engineering, 1957; and Dudley's Handbook of Practical Gear Design.",
          "Medina, S. and Olver, A. V., 'Regimes of contact in spline couplings', ASME J. Tribology, 2002.", "Ku, P. M. and Valtierra, M. L., 'Spline wear — effects of design and lubrication', ASME J. Eng. Industry, 1975."],
    links=[("Wikipedia — Spline (mechanical)", "https://en.wikipedia.org/wiki/Spline_(mechanical)")],
))

# =====================================================================================
# 4. SHAFT ALIGNMENT
# =====================================================================================
rim, face, dial_d, A, Bd = 0.30, 0.08, 120.0, 200.0, 700.0  # rim TIR, face TIR, dial dia, coupling to front foot, coupling to back foot
off = rim / 2
ang = face / dial_d  # mm/mm
corr_f = off + ang * A
corr_b = off + ang * Bd
alpha_st, Lh, dT = 11.7e-6, 600.0, 40.0
growth = alpha_st * Lh * dT

align_svg = '''<svg viewBox="0 0 900 300" role="img" aria-label="Offset and angular misalignment">
<g><text x="200" y="24" text-anchor="middle" font-size="14" font-weight="700">Offset (parallel)</text>
<rect x="40" y="90" width="150" height="40" fill="var(--blue3)" stroke="var(--blue)" stroke-width="2"/>
<rect x="200" y="120" width="150" height="40" fill="var(--orange3)" stroke="var(--orange)" stroke-width="2"/>
<line x1="20" y1="110" x2="380" y2="110" stroke="var(--blue)" stroke-dasharray="8 5"/><line x1="20" y1="140" x2="380" y2="140" stroke="var(--orange)" stroke-dasharray="8 5"/>
<line x1="365" y1="110" x2="365" y2="140" stroke="var(--ink)" stroke-width="2"/><text x="372" y="130" font-size="13" font-weight="700">offset</text>
<text x="115" y="80" text-anchor="middle" font-size="12.5">stationary</text><text x="275" y="185" text-anchor="middle" font-size="12.5">movable</text></g>
<g transform="translate(450,0)"><text x="200" y="24" text-anchor="middle" font-size="14" font-weight="700">Angularity (gap)</text>
<rect x="40" y="100" width="150" height="40" fill="var(--blue3)" stroke="var(--blue)" stroke-width="2"/>
<g transform="rotate(-6 200 120)"><rect x="200" y="100" width="150" height="40" fill="var(--orange3)" stroke="var(--orange)" stroke-width="2"/></g>
<line x1="20" y1="120" x2="400" y2="120" stroke="var(--blue)" stroke-dasharray="8 5"/>
<text x="200" y="185" text-anchor="middle" font-size="12.5">angle = gap difference / coupling diameter</text></g>
<g transform="translate(0,200)"><line x1="40" y1="60" x2="860" y2="60" class="ax"/>
<rect x="420" y="20" width="300" height="40" fill="var(--orange3)" stroke="var(--orange)" stroke-width="2"/><text x="570" y="45" text-anchor="middle" font-size="12.5">movable machine</text>
<rect x="440" y="60" width="20" height="16" fill="var(--ink)"/><rect x="680" y="60" width="20" height="16" fill="var(--ink)"/>
<line x1="380" y1="10" x2="380" y2="90" stroke="var(--purple)" stroke-width="2.5"/><text x="300" y="20" font-size="12.5">coupling plane</text>
<text x="450" y="92" text-anchor="middle" font-size="12.5">front foot (A)</text><text x="690" y="92" text-anchor="middle" font-size="12.5">back foot (B)</text></g>
</svg>'''

ARTICLES.append(dict(
    slug="shaft-alignment", group="rotating",
    title="Shaft Alignment: Offset, Angularity, Tolerances and Shim Corrections",
    short="Shaft alignment",
    tags=["Alignment", "Couplings", "Maintenance", "Vibration"],
    desc="Offset and angular misalignment, tolerance guidance by speed, rim-and-face and laser methods, soft foot, thermal growth and shim correction calculations.",
    blurb="Measuring offset and angularity, judging them against speed-based tolerances, and turning dial readings into shim corrections at the feet.",
    lead="Misalignment between coupled shafts is one of the commonest causes of vibration, bearing and seal failure. Good alignment means the two shaft centrelines are collinear at running temperature. This article covers what to measure, what tolerance to aim for, and how to convert readings into moves at the machine feet.",
    takeaways=[
        "Misalignment has two parts, offset and angularity, in both the vertical and horizontal planes.",
        "Tolerances tighten with speed: around 0.05 mm offset and 0.05 mm/100 mm angularity is typical at 3,000 rpm.",
        "With rim-and-face readings: offset = rim TIR/2, angularity = face TIR ÷ dial circle diameter.",
        "Shim correction at a foot = offset + angularity × distance from the coupling to that foot.",
        "Fix soft foot first and allow for thermal growth, or the cold alignment will be wrong when hot.",
    ],
    body=f'''
<h2 id="types">1. Offset and angularity</h2>
{fig(align_svg, "Figure 1. Offset and angular misalignment, and the distances from the coupling plane to the front and back feet of the movable machine.")}
<p>Measure both components in the vertical plane (corrected with shims) and the horizontal plane (corrected by sliding the machine). Always move the <b>movable</b> machine, usually the motor, and leave the driven machine as reference.</p>
<p>Typical vibration symptoms: high 1× and 2× running-speed components, high axial vibration, and 180° phase difference across the coupling.</p>

<h2 id="tolerances">2. Tolerance guidance</h2>
{table(["Speed (rpm)","Offset, excellent (mm)","Offset, acceptable (mm)","Angularity, excellent (mm/100 mm)","Angularity, acceptable (mm/100 mm)"],[
["600","0.09","0.13","0.07","0.10"],["900","0.07","0.10","0.05","0.07"],["1,200","0.06","0.09","0.04","0.06"],
["1,800","0.04","0.07","0.03","0.05"],["3,600","0.02","0.04","0.02","0.03"],["7,200","0.01","0.02","0.01","0.02"],
],num_cols=(0,1,2,3,4))}
<p class="meta">Indicative short flexible-coupling tolerances in the style published by alignment-system makers; use the coupling or machine maker's values where given. Spacer couplings are judged by angle per coupling end.</p>

<h2 id="methods">3. Measuring methods</h2>
{table(["Method","Accuracy","Notes"],[
["Straightedge and feeler gauge","≈ 0.1 mm","Rough pre-alignment only"],
["Rim and face dial indicators","≈ 0.01 mm","Good for large couplings; needs bracket sag check"],
["Reverse indicator (two rims)","≈ 0.01 mm","Better for long spacers; no axial float error"],
["Laser systems","≈ 0.001 mm","Fast, computes feet corrections; standard today"],
])}
<p><b>Bracket sag:</b> the indicator bracket bends under its own weight. Measure it on a pipe with the same span and add it to rim readings.</p>
<p><b>Soft foot:</b> a foot that does not sit flat distorts the frame when bolted. Loosen each bolt in turn with a dial indicator on the foot; more than about 0.05 mm movement needs shims before aligning.</p>

<h2 id="corrections">4. From readings to shim corrections</h2>
{formula("Offset at coupling          o = rim TIR / 2\nAngularity                  θ = face TIR / D_dial           (mm per mm)\nCorrection at front foot    C_A = o + θ · A               A = coupling plane to front foot\nCorrection at back foot     C_B = o + θ · B               B = coupling plane to back foot\nSign: follow the direction of the readings (raise or lower the movable machine)")}
<h3 id="thermal">Thermal growth</h3>
{formula("ΔH = α · H · ΔT      α ≈ 11.7×10⁻⁶ /K for steel, H = foot-to-centreline height")}
<p>Set the cold alignment so that the shafts become collinear at operating temperature: if the motor grows {growth:.2f} mm more than the pump, set it that much lower when cold.</p>

<h2 id="example">5. Worked example</h2>
<p>Rim TIR = {rim} mm (movable machine high), face TIR = {face} mm on a {dial_d:.0f} mm dial circle (opening at top), A = {A:.0f} mm, B = {Bd:.0f} mm.</p>
{table(["Step","Result"],[
["Offset o = 0.30/2",f"{off:.3f} mm"],["Angularity θ = 0.08/120",f"{ang*100:.3f} mm per 100 mm"],
["Front foot C_A = o + θ·A",f"<b>{corr_f:.3f} mm</b>"],["Back foot C_B = o + θ·B",f"<b>{corr_b:.3f} mm</b>"],
["Motor centreline height 600 mm, 40 K warmer: growth",f"{growth:.3f} mm"],
],num_cols=(1,))}
{box("key","What it shows","Removing about 0.28 mm of shims at the front feet and 0.62 mm at the back feet brings the motor level with the driven machine. If the motor runs 40 K hotter than the pump, set it about 0.28 mm low when cold.")}
''',
    calcs=[dict(id="al", title="Rim-and-face to shim corrections",
                note="Readings are total indicator readings (TIR) over 180°. Positive result = amount to lower (or move) the movable machine at that foot, following the reading direction.",
                presets=[dict(label="Worked example", v=dict(rim=0.30, face=0.08, D=120, A=200, B=700, rpm=1500, H=600, dT=40))],
                inputs=[dict(id="rim", label="Rim TIR (mm)", value=0.30), dict(id="face", label="Face TIR (mm)", value=0.08), dict(id="D", label="Dial circle diameter (mm)", value=120),
                        dict(id="A", label="Coupling to front foot A (mm)", value=200), dict(id="B", label="Coupling to back foot B (mm)", value=700),
                        dict(id="rpm", label="Speed (rpm)", value=1500), dict(id="H", label="Centreline height above feet (mm)", value=600), dict(id="dT", label="Temperature rise ΔT (K)", value=40)],
                js='''var o=v.rim/2,th=v.face/v.D,ca=o+th*v.A,cb=o+th*v.B,g=11.7e-6*v.H*v.dT;
var tolO=v.rpm<=750?0.13:v.rpm<=1000?0.10:v.rpm<=1500?0.08:v.rpm<=3000?0.05:v.rpm<=4500?0.04:0.02;
var tolA=(v.rpm<=750?0.10:v.rpm<=1000?0.08:v.rpm<=1500?0.07:v.rpm<=3000?0.05:v.rpm<=4500?0.03:0.02);
var okk=o<=tolO&&th*100<=tolA;
return {rows:[["Offset",fmt(o,3)+" mm","guide ≤ "+tolO+" mm"],["Angularity",fmt(th*100,3)+" mm/100 mm","guide ≤ "+tolA],["Front foot correction",fmt(ca,3)+" mm"],["Back foot correction",fmt(cb,3)+" mm"],["Thermal growth",fmt(g,3)+" mm","α = 11.7e-6/K"]],
verdict:okk?["ok","Within typical acceptable tolerance for this speed."]:["bad","Outside typical tolerance: apply the corrections and re-measure."]};''')],
    quiz=[
        dict(q="Rim TIR of 0.20 mm means the offset is:", o=["0.20 mm", "0.10 mm", "0.40 mm", "0.05 mm"], a=1, e="The indicator sees twice the offset over 180°."),
        dict(q="Which machine is normally moved during alignment?", o=["The heavier one", "The driven machine", "The movable machine, usually the motor", "Both equally"], a=2, e="The driven machine is kept as reference; the motor is shimmed and moved."),
        dict(q="Alignment tolerances become tighter when:", o=["Speed increases", "Speed decreases", "Coupling is larger", "Never change"], a=0, e="Higher speed → smaller allowable offset and angle."),
        dict(q="Soft foot should be corrected:", o=["After alignment", "Before alignment", "Only if vibration is high", "Never"], a=1, e="Bolting a soft foot distorts the frame and spoils readings."),
        dict(q="A typical vibration sign of misalignment is:", o=["Only 0.5× component", "High 1× and 2× with high axial vibration", "Bearing defect frequencies only", "Random noise"], a=1, e="Misalignment shows as 1× and 2× with significant axial levels."),
        dict(q="Bracket sag affects mainly:", o=["Face readings", "Rim readings in the vertical plane", "Horizontal readings", "Thermal growth"], a=1, e="Sag adds a constant error to vertical rim readings."),
        dict(q="Offset 0.10 mm, angularity 0.0005 mm/mm, back foot at 800 mm. Correction at back foot (mm)?", num=0.5, unit="mm", e="0.10 + 0.0005 × 800 = 0.50 mm."),
        dict(q="Steel frame height 500 mm warms by 30 K. Thermal growth in mm (α = 11.7e-6)?", num=0.1755, unit="mm", e="11.7e-6 × 500 × 30 = 0.176 mm."),
    ],
    refs=["Piotrowski, J., Shaft Alignment Handbook, 3rd ed., CRC Press, 2006.", "ANSI/ASA S2.75-2017, Shaft Alignment Methodology.",
          "API 686, Recommended Practice for Machinery Installation and Installation Design.", "Alignment-system makers' handbooks (e.g. Prüftechnik, SKF, Easy-Laser)."],
    links=[("Wikipedia — Shaft alignment", "https://en.wikipedia.org/wiki/Shaft_alignment")],
))
