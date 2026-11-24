"""
TOOL:    Vijay_Wiki articles — group 5 (packaging and printing)
FAMILY:  vijay-wiki
VERSION: 1.0.0
DATE:    2026-11-24
CHAT:    claude.ai — Vijay_Wiki: build all suggested topics in groups and upload
CHANGES: 1.0.0 Initial seven articles: blown film, rotogravure, heat sealing, laminates, offset costing, carton dielines, colour & ΔE
"""
import math
import numpy as np
from wiki import plot, flow, bars, fig, table, box, formula

ARTICLES = []

# =====================================================================================
# 27. BLOWN FILM EXTRUSION
# =====================================================================================
Ddie, BUR, tf, gap, vline, rho = 200.0, 2.5, 50.0, 2.0, 30.0, 0.92
Db = Ddie * BUR
LF = math.pi * Db / 2
DDR = gap / (tf / 1000 * BUR)
out = LF / 1000 * 2 * tf * 1e-6 * rho * 1000 * vline * 60

bf_svg = '''<svg viewBox="0 0 900 380" role="img" aria-label="Blown film line">
<rect x="380" y="320" width="140" height="30" fill="var(--blue3)" stroke="var(--blue)" stroke-width="2.5"/><text x="450" y="370" text-anchor="middle" font-size="12.5">annular die (Ø Dd) + air ring</text>
<path d="M400 320 C400 280 330 250 320 200 L320 90 L450 40 L580 90 L580 200 C570 250 500 280 500 320" fill="var(--orange3)" stroke="var(--orange)" stroke-width="3"/>
<line x1="300" y1="215" x2="600" y2="215" stroke="var(--purple)" stroke-width="3" stroke-dasharray="10 6"/><text x="610" y="219" font-size="13" font-weight="700">frost line (crystallisation)</text>
<line x1="320" y1="150" x2="580" y2="150" stroke="var(--ink)" stroke-width="1.5"/><text x="450" y="143" text-anchor="middle" font-size="12.5">bubble Ø Db = BUR × Dd</text>
<rect x="380" y="25" width="140" height="18" fill="var(--blue)"/><text x="450" y="18" text-anchor="middle" font-size="12.5">nip rolls → layflat = π·Db/2</text>
<text x="600" y="300" font-size="13">molten tube stretched</text><text x="600" y="318" font-size="13">across (BUR) and along (DDR)</text>
<text x="80" y="200" font-size="13">collapsing frame →</text><text x="80" y="60" font-size="13">to winder (line speed)</text></svg>'''

ARTICLES.append(dict(
    slug="blown-film-extrusion", group="packaging",
    title="Blown Film Extrusion: Blow-Up Ratio, Draw-Down Ratio, Frost Line and Output",
    short="Blown film extrusion",
    tags=["Blown film", "Polyethylene", "Extrusion", "Packaging"],
    desc="How blown film lines make PE film: blow-up ratio, draw-down ratio, layflat width, frost line, output calculation, resins and how process settings change film properties.",
    blurb="The ratios that set film width, thickness and orientation on a blown film line, and how to calculate output.",
    lead="Most polyethylene packaging film is made by blowing a molten tube from an annular die into a bubble, cooling it with air, and flattening it between nip rolls. The bubble's expansion (blow-up ratio) and the stretch along the machine (draw-down) set width, thickness and the balance of strength between machine and transverse directions.",
    takeaways=[
        "Blow-up ratio BUR = bubble diameter ÷ die diameter, typically 1.5–4; layflat width = π·D<sub>bubble</sub>/2.",
        "Draw-down ratio DDR = die gap ÷ (film thickness × BUR); high DDR gives strong machine-direction orientation.",
        "Balanced MD/TD properties come from matching orientation in both directions; higher BUR improves TD tear and impact.",
        "Output (kg/h) = layflat width × 2 × thickness × density × line speed.",
        "Frost line height (where the melt crystallises) affects clarity and orientation; it is controlled by output and cooling air.",
    ],
    body=f'''
<h2 id="process">1. The process</h2>
{fig(bf_svg, "Figure 1. Blown film line: die and air ring, expanding bubble, frost line, collapsing frame and nip rolls.")}
{formula("BUR = Db / Dd\nLayflat width LF = π · Db / 2\nDDR = die gap / (film thickness · BUR)\nOutput [kg/h] = LF[m] · 2 · t[m] · ρ[kg/m³] · v[m/min] · 60")}

<h2 id="resins">2. Resins</h2>
{table(["Resin","Density (g/cm³)","Character"],[["LDPE","0.918–0.925","Easy processing, clarity, good bubble stability"],["LLDPE (butene/hexene/octene)","0.918–0.940","Toughness, puncture, sealing; less bubble stability"],
["mLLDPE (metallocene)","0.912–0.920","Very tough, low seal initiation, excellent hot tack"],["HDPE","0.940–0.965","Stiff, good moisture barrier, crinkly; high stalk process"]])}

<h2 id="effects">3. Process settings and film properties</h2>
{table(["Change","Effect"],[["Higher BUR","More TD orientation: better TD tear and dart impact, more balanced film; bubble less stable"],["Higher DDR","More MD orientation: higher MD tensile, lower MD tear (splits easily along MD)"],
["Higher frost line","More time to relax: lower orientation, often better clarity for LDPE"],["Faster cooling (chilled air, IBC)","Higher output, lower haze, smaller crystals"],["Higher melt temperature","Lower viscosity; risk of instability; better gloss"]])}
<p>Co-extrusion (3, 5, 7 or more layers) combines skins for sealing and slip with cores for stiffness or barrier (EVOH, PA with tie layers).</p>

<h2 id="example">4. Worked example</h2>
<p>Die Ø{Ddie:.0f} mm, BUR {BUR}, film {tf:.0f} µm, die gap {gap} mm, line speed {vline:.0f} m/min, density {rho}.</p>
{table(["Step","Result"],[["Bubble diameter",f"{Db:.0f} mm"],["Layflat width",f"<b>{LF:.0f} mm</b>"],["DDR",f"{DDR:.1f}"],["Output",f"<b>{out:.0f} kg/h</b>"]],num_cols=(1,))}
''',
    calcs=[dict(id="bf", title="Blown film calculator",
                presets=[dict(label="Worked example", v=dict(Dd=200, BUR=2.5, t=50, gap=2.0, v=30, rho=0.92)), dict(label="HDPE high stalk", v=dict(Dd=120, BUR=4, t=15, gap=1.2, v=60, rho=0.955))],
                inputs=[dict(id="Dd", label="Die diameter (mm)", value=200), dict(id="BUR", label="Blow-up ratio", value=2.5), dict(id="t", label="Film thickness (µm)", value=50), dict(id="gap", label="Die gap (mm)", value=2.0),
                        dict(id="v", label="Line speed (m/min)", value=30), dict(id="rho", label="Density (g/cm³)", value=0.92)],
                js='''var Db=v.Dd*v.BUR,LF=Math.PI*Db/2,DDR=v.gap/(v.t/1000*v.BUR),out=LF/1000*2*v.t*1e-6*v.rho*1000*v.v*60,gsm=v.t*v.rho;
return {rows:[["Bubble diameter",fmt(Db,0)+" mm"],["Layflat width",fmt(LF,0)+" mm"],["Draw-down ratio",fmt(DDR,1)],["Output",fmt(out,1)+" kg/h"],["Film grammage",fmt(gsm,1)+" g/m²"],["Tube length per hour",fmt(v.v*60,0)+" m"]],
verdict:(v.BUR<1.5||v.BUR>4.5)?["caution","BUR outside the usual 1.5–4 range."]:["ok","Ratios within usual ranges."]};''')],
    quiz=[
        dict(q="Blow-up ratio is:", o=["Die gap / film thickness", "Bubble diameter / die diameter", "Line speed / extruder speed", "Layflat / die diameter"], a=1, e="BUR = Db/Dd."),
        dict(q="Layflat width equals:", o=["π·Db", "π·Db/2", "Db", "2·Db"], a=1, e="Half the bubble circumference."),
        dict(q="Raising BUR mainly improves:", o=["MD tensile", "TD strength and balance", "Clarity only", "Output"], a=1, e="More transverse orientation."),
        dict(q="A film that splits easily along the machine direction usually has:", o=["Low DDR", "High DDR / MD orientation", "High BUR", "No orientation"], a=1, e="Strong MD orientation lowers MD tear."),
        dict(q="Which resin gives the lowest seal initiation temperature?", o=["HDPE", "LDPE", "mLLDPE", "PP"], a=2, e="Metallocene LLDPE."),
        dict(q="The frost line is where:", o=["Film is wound", "The melt crystallises and solidifies", "Die is located", "Corona treatment happens"], a=1, e="Visible haze line on the bubble."),
        dict(q="Die 150 mm, BUR 3. Layflat width (mm)?", num=706.9, unit="mm", e="π × 450/2 = 706.9 mm."),
        dict(q="Layflat 0.8 m, 40 µm, density 920 kg/m³, 25 m/min. Output kg/h?", num=88.3, unit="kg/h", e="0.8 × 2 × 40e-6 × 920 × 25 × 60 = 88.3 kg/h."),
    ],
    refs=["Cantor, K., Blown Film Extrusion, 3rd ed., Hanser, 2018.", "Wagner, J. R. (ed.), Multilayer Flexible Packaging, 2nd ed., Elsevier, 2016.", "Rauwendaal, C., Polymer Extrusion, 5th ed., Hanser, 2014."],
    links=[("Wikipedia — Blown film", "https://en.wikipedia.org/wiki/Plastic_film#Blown_film")],
))

# =====================================================================================
# 28. ROTOGRAVURE
# =====================================================================================
rep, vweb, cellv, transfer, cov, solids = 600.0, 200.0, 20.0, 0.5, 0.4, 0.35
Dcyl = rep / math.pi
rpm = vweb * 1000 / rep
wet = cellv * transfer * cov  # cm3/m2 ~ g/m2 at density 1
dry = wet * solids
gr_svg = flow(["Unwind|web tension","Print unit 1|cylinder + doctor","Dryer|hot air","Print unit 2…n|register control","Rewind|or inline lamination"], h=130)
ARTICLES.append(dict(
    slug="rotogravure-printing", group="packaging",
    title="Rotogravure Printing: Cylinders, Cells, Ink Transfer and Register Control",
    short="Rotogravure",
    tags=["Gravure", "Printing", "Register", "Flexible packaging"],
    desc="How rotogravure works: engraved cylinders and cell geometry, screen ruling and cell volume, ink transfer and consumption, drying, and register control on multi-colour presses.",
    blurb="Engraved cells, ink transfer, cylinder size from repeat length, ink consumption and keeping colours in register at speed.",
    lead="Rotogravure prints by filling tiny engraved cells on a chrome-plated cylinder with low-viscosity ink, wiping the surface clean with a doctor blade, and pressing the web against the cylinder with a rubber impression roll. It gives consistent, high-quality images at high speed over long runs, which is why it dominates flexible packaging and decorative printing.",
    takeaways=[
        "Cylinder circumference equals the print repeat length: D = repeat/π.",
        "Cell volume (cm³/m²) sets ink laydown; typically 40–60 % of the cell volume transfers to the web.",
        "Screen ruling of 60–100 lines/cm and stylus angle of about 120–130° are common for packaging.",
        "Register is controlled by scanning marks and adjusting each unit's phase (compensator roll or direct drive) to within about ±0.1 mm.",
        "Register errors come from web tension changes, film stretch with heat, cylinder diameter differences and speed changes.",
    ],
    body=f'''
<h2 id="process">1. Process</h2>
{fig(gr_svg, "Figure 1. Sequence of a multi-colour rotogravure press. Each colour has its own cylinder, ink trough, doctor blade, impression roll and dryer.")}
{table(["Engraving method","Cell shape","Notes"],[["Electromechanical (diamond stylus)","Pyramid / diamond cells; size and depth vary together","Most common for packaging"],["Laser (direct or mask)","Free cell shapes, very consistent","Sharp text, fine detail"],["Chemical etching","Variable depth","Older method"]])}

<h2 id="cells">2. Cells and ink transfer</h2>
{formula("Cylinder diameter       D = repeat / π\nCylinder speed          rpm = web speed / repeat\nWet ink laydown (g/m²) ≈ cell volume (cm³/m²) × transfer fraction × coverage × ink density\nDry ink                  = wet × solids content")}
{table(["Application","Typical cell volume (cm³/m²)"],[["Halftone highlights","2–8"],["Process colours, mid-tones","8–15"],["Solids, text","15–25"],["White ink (opaque) / varnish","25–40"]])}
<p>Ink viscosity is measured in efflux cup seconds (e.g. Zahn #2 or DIN cup); solvent balance controls drying speed and ink flow in the cells.</p>

<h2 id="register">3. Register control</h2>
<ul><li>Each colour prints a small register mark; a scanner reads mark positions relative to a reference colour.</li>
<li>The controller corrects longitudinal register by shifting cylinder phase (electronic line shaft or compensator roll) and lateral register by moving the cylinder sideways.</li>
<li>Typical targets: ±0.1 mm at full speed; errors spike during acceleration, splices and roll changes.</li>
<li>Causes of drift: tension variation, film stretch in hot dryers, ink build-up, cylinder diameter differences (tapers), temperature of cylinders.</li></ul>

<h2 id="example">4. Worked example</h2>
<p>Repeat {rep:.0f} mm, web speed {vweb:.0f} m/min, cell volume {cellv:.0f} cm³/m², {transfer*100:.0f} % transfer, {cov*100:.0f} % average coverage, ink {solids*100:.0f} % solids, density ≈ 1 g/cm³.</p>
{table(["Step","Result"],[["Cylinder diameter",f"{Dcyl:.1f} mm"],["Cylinder speed",f"{rpm:.0f} rpm"],["Register marks per second",f"{rpm/60:.2f}"],["Wet ink laydown",f"{wet:.1f} g/m²"],["Dry ink",f"{dry:.2f} g/m²"],["Wet ink per 1000 m² of printed web",f"{wet:.1f} kg"]],num_cols=(1,))}
''',
    calcs=[dict(id="grv", title="Cylinder size and ink consumption",
                presets=[dict(label="Worked example", v=dict(rep=600, v=200, cell=20, tr=50, cov=40, sol=35, w=1.0, len=10000))],
                inputs=[dict(id="rep", label="Repeat length (mm)", value=600), dict(id="v", label="Web speed (m/min)", value=200), dict(id="cell", label="Cell volume (cm³/m²)", value=20),
                        dict(id="tr", label="Transfer (%)", value=50), dict(id="cov", label="Coverage (%)", value=40), dict(id="sol", label="Ink solids (%)", value=35), dict(id="w", label="Print width (m)", value=1.0), dict(id="len", label="Job length (m)", value=10000)],
                js='''var D=v.rep/Math.PI,rpm=v.v*1000/v.rep,wet=v.cell*v.tr/100*v.cov/100,dry=wet*v.sol/100,area=v.w*v.len;
return {rows:[["Cylinder diameter",fmt(D,1)+" mm"],["Cylinder speed",fmt(rpm,0)+" rpm"],["Repeats per job",fmt(v.len*1000/v.rep,0)],["Wet laydown",fmt(wet,2)+" g/m²"],["Dry laydown",fmt(dry,2)+" g/m²"],["Wet ink for job",fmt(wet*area/1000,1)+" kg"],["Run time",fmt(v.len/v.v,0)+" min"]]};''')],
    quiz=[
        dict(q="In gravure, excess ink is removed from the cylinder surface by:", o=["Anilox roll", "Doctor blade", "Impression roll", "Dryer"], a=1, e="The doctor blade wipes the lands clean."),
        dict(q="Cylinder circumference equals:", o=["Web width", "Repeat length", "Twice the repeat", "Die width"], a=1, e="One revolution prints one repeat."),
        dict(q="Typical fraction of cell volume transferred to the web:", o=["5–10 %", "40–60 %", "90–100 %", "150 %"], a=1, e="About half."),
        dict(q="Longitudinal register is corrected by:", o=["Changing ink viscosity", "Adjusting cylinder phase / compensator rolls", "Changing BUR", "Heating"], a=1, e="Phase shift moves the print along the web."),
        dict(q="Film stretching in a hot dryer causes:", o=["Better register", "Register drift", "No effect", "Higher ink transfer"], a=1, e="Web length between units changes."),
        dict(q="Most common engraving for packaging cylinders:", o=["Laser only", "Electromechanical diamond stylus", "Hand engraving", "Photopolymer"], a=1, e="Electromechanical engraving."),
        dict(q="Repeat 450 mm. Cylinder diameter (mm)?", num=143.24, unit="mm", e="450/π = 143.2 mm."),
        dict(q="Web 250 m/min, repeat 500 mm. Cylinder rpm?", num=500, unit="rpm", e="250,000/500 = 500 rpm."),
    ],
    refs=["Kipphan, H. (ed.), Handbook of Print Media, Springer, 2001.", "Gravure Association of the Americas, Gravure: Process and Technology.", "ISO 12647-4, Process control for the production of half-tone colour separations, proof and production prints — Publication gravure printing."],
    links=[("Wikipedia — Rotogravure", "https://en.wikipedia.org/wiki/Rotogravure")],
))

# =====================================================================================
# 29. HEAT SEALING
# =====================================================================================
from math import erf
Ts, T0, alpha, Lseal = 150.0, 25.0, 1.1e-7, 124e-6
def interface_T(t, L=Lseal, Tsv=Ts):
    xx = L / 2
    return Tsv + (T0 - Tsv) * erf(xx / (2 * math.sqrt(alpha * t)))
tt = np.linspace(0.005, 1.0, 120)
hsplot = plot([dict(pts=[(float(t), interface_T(t)) for t in tt], label="interface temperature", at=0.6),
               dict(pts=[(0, 110), (1, 110)], label="seal initiation (example 110 °C)", at=0.1, width=2)],
              "dwell time (s)", "temperature (°C)", xlim=(0, 1), ylim=(20, 160), h=300)
t_need = next(float(t) for t in np.linspace(0.001, 2, 4000) if interface_T(t) >= 115)

ARTICLES.append(dict(
    slug="heat-sealing-flexible-packaging", group="packaging",
    title="Heat Sealing of Flexible Packaging: Temperature, Pressure, Dwell and Seal Windows",
    short="Heat sealing",
    tags=["Heat sealing", "Packaging", "Hot tack", "Pouches"],
    desc="Heat sealing of films and laminates: the temperature–pressure–dwell window, seal initiation temperatures of sealants, hot tack, heat conduction through layers, seal testing and common defects.",
    blurb="Why seals need the interface (not the jaw) to reach temperature, how long that takes, and how to find and keep a seal window.",
    lead="A heat seal forms when the sealant layers of two webs melt at their interface, interdiffuse under pressure, and cool while held together. The jaw temperature is easy to set, but what matters is the temperature reached at the interface, which depends on dwell time and on how much material the heat must cross. That is why thick laminates need longer dwell or hotter jaws than thin films.",
    takeaways=[
        "Seal quality depends on three variables: jaw temperature, dwell time and pressure. Temperature and time dominate.",
        "Seal initiation temperature (SIT) depends on the sealant: about 90–100 °C for mLLDPE and ionomers, 105–115 °C for LDPE, 125–140 °C for CPP.",
        "Heat must conduct through outer layers; interface heating time scales with thickness² / thermal diffusivity.",
        "Hot tack (strength while still hot) matters on vertical form-fill-seal lines where product drops on a fresh seal.",
        "Measure seal strength by ASTM F88 / EN 868-5 (N per 15 mm or 25 mm) and plot strength against temperature to find the window.",
    ],
    body=f'''
<h2 id="window">1. The seal window</h2>
{table(["Sealant","Approx. seal initiation (°C)","Notes"],[["Ionomer","85–95","Seals through contamination, excellent hot tack"],["EVA (high VA)","80–95","Low temperature, soft"],["mLLDPE","90–100","Strong hot tack, low SIT"],["LDPE","105–115","General purpose"],["LLDPE","110–120","Tougher than LDPE"],
["Heat-seal coated BOPP","105–125","Narrow window; acrylic or terpolymer coatings"],["CPP","125–140","Retort and higher temperature"],["PET (APET, sealable)","140–160","Special grades"]])}
<p>The upper limit of the window is set by distortion, burn-through, shrinkage of the outer film or degradation; outer films such as PET and BOPP must tolerate jaw temperature without sticking.</p>

<h2 id="heat">2. Getting heat to the interface</h2>
{formula("Semi-infinite slab with surface at Ts:  T(x, t) = Ts + (T0 − Ts) · erf( x / (2√(α·t)) )\nBoth jaws heated: interface at x = total thickness / 2\nα (polymers) ≈ 1×10⁻⁷ m²/s.  Time to heat scales with (thickness)²")}
{fig(hsplot, f"Figure 1. Estimated interface temperature against dwell for a 124 µm two-ply seal (both jaws at {Ts:.0f} °C). The interface passes 115 °C after about {t_need*1000:.0f} ms.")}

<h2 id="types">3. Sealing methods</h2>
{table(["Method","Principle","Use"],[["Constant-heat bars (jaws)","Heated metal jaws, serrated or flat","Pouches, VFFS, HFFS"],["Impulse","Ribbon heated briefly then cooled under pressure","PE bags, thick films"],["Hot air / hot wedge","Air or wedge melts surfaces","Large bags, geomembranes"],["Ultrasonic","Vibration heats the interface directly","Through product contamination, low energy"],["Induction (foil)","Eddy currents heat aluminium foil","Cap liners, foil laminates"]])}

<h2 id="defects">4. Defects and causes</h2>
{table(["Defect","Likely cause"],[["Weak / peelable seal","Interface too cold: dwell short, jaw cold, thick laminate"],["Burnt, shrunk, wrinkled seal","Temperature too high, outer film not heat-resistant"],["Channel leaks","Wrinkles, gussets, uneven pressure, worn jaws"],["Seal through product fails","Contamination: use ionomer/mLLDPE or ultrasonic"],["Delamination near seal","Laminate bond weak or adhesive not cured"]])}
''',
    calcs=[dict(id="seal", title="Interface temperature estimate",
                note="One-dimensional conduction estimate with both jaws at the set temperature and good contact. Real seals lose heat to the jaw faces and need calibration on the machine.",
                presets=[dict(label="PET12/PE50 × 2 (124 µm)", v=dict(Ts=150, T0=25, L=124, a=1.1, t=0.3, sit=110)), dict(label="PET/Al/PE 2 × 100 µm", v=dict(Ts=180, T0=25, L=200, a=1.3, t=0.5, sit=120))],
                inputs=[dict(id="Ts", label="Jaw temperature (°C)", value=150), dict(id="T0", label="Initial temperature (°C)", value=25), dict(id="L", label="Total thickness both webs (µm)", value=124),
                        dict(id="a", label="Thermal diffusivity (×10⁻⁷ m²/s)", value=1.1), dict(id="t", label="Dwell time (s)", value=0.3), dict(id="sit", label="Seal initiation temperature (°C)", value=110)],
                js='''function erf(x){var s=x<0?-1:1;x=Math.abs(x);var t=1/(1+0.3275911*x);var y=1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-0.284496736)*t+0.254829592)*t*Math.exp(-x*x);return s*y;}
var al=v.a*1e-7,x=v.L*1e-6/2;function T(tt){return v.Ts+(v.T0-v.Ts)*erf(x/(2*Math.sqrt(al*tt)));}
var pts=[],tn=NaN;for(var i=1;i<=150;i++){var tt=i/150*Math.max(1,2*v.t);var TT=T(tt);pts.push([tt,TT]);if(isNaN(tn)&&TT>=v.sit+5)tn=tt;}
var Ti=T(v.t);
return {rows:[["Interface temperature at dwell",fmt(Ti,1)+" °C"],["Margin over SIT",fmt(Ti-v.sit,1)+" K"],["Dwell to reach SIT + 5 K",isNaN(tn)?"not reached":fmt(tn*1000,0)+" ms"]],
verdict:Ti<v.sit?["bad","Interface below seal initiation: increase dwell or temperature."]:(Ti<v.sit+5?["caution","Marginal: little temperature margin."]:["ok","Interface comfortably above seal initiation."]),
svg:plotSVG([{pts:pts,label:"interface °C"}],{xlabel:"dwell (s)",ylabel:"°C",xmin:0,marks:[[v.t,Ti,"set dwell"]]}),caption:"Interface temperature against dwell time."};''')],
    quiz=[
        dict(q="The temperature that matters for a good seal is:", o=["Jaw set point", "Interface temperature of the sealant layers", "Room temperature", "Outer film temperature"], a=1, e="The sealants must melt where they meet."),
        dict(q="Doubling laminate thickness increases heating time by roughly:", o=["2×", "4×", "No change", "0.5×"], a=1, e="Time ∝ thickness²."),
        dict(q="Hot tack is important when:", o=["Seals are tested after a day", "Product loads the seal before it cools (VFFS)", "Printing", "Storage"], a=1, e="Strength while still hot."),
        dict(q="Which sealant seals through contamination best?", o=["HDPE", "Ionomer", "PET", "Nylon"], a=1, e="Ionomers flow around contaminants."),
        dict(q="Channel leaks are usually caused by:", o=["Too much time", "Wrinkles and uneven pressure", "Too low SIT", "Ink"], a=1, e="Gaps along creases or gussets."),
        dict(q="ASTM F88 measures:", o=["Hot tack", "Seal (peel) strength", "OTR", "COF"], a=1, e="Tensile seal strength of flexible barrier materials."),
        dict(q="If 100 µm needs 0.2 s, estimate time (s) for 150 µm.", num=0.45, unit="s", e="0.2 × (1.5)² = 0.45 s."),
        dict(q="Seal strength 30 N over 15 mm width. In N/25 mm?", num=50, unit="N/25 mm", e="30 × 25/15 = 50."),
    ],
    refs=["ASTM F88/F88M, Standard Test Method for Seal Strength of Flexible Barrier Materials.", "ASTM F1921, Hot Seal Strength (Hot Tack) of Thermoplastic Polymers.",
          "Hishinuma, K., Heat Sealing Technology and Engineering for Packaging, DEStech, 2009.", "Selke, S. E. M. and Culter, J. D., Plastics Packaging, 3rd ed., Hanser, 2016."],
    links=[("Wikipedia — Heat sealer", "https://en.wikipedia.org/wiki/Heat_sealer")],
))

# =====================================================================================
# 30. LAMINATES
# =====================================================================================
layers = [("PET", 12, 1.40, 110, 45), ("Ink", 1.5, 1.0, None, None), ("Adhesive", 3, 1.0, None, None), ("LDPE", 50, 0.92, 3000, 8)]
gsm = sum(t * dn if name not in ("Ink", "Adhesive") else t for name, t, dn, _, _ in layers)
otr = 1 / sum(1 / o for _, _, _, o, _ in layers if o)
wvtr = 1 / sum(1 / w for _, _, _, _, w in layers if w)
stack = '''<svg viewBox="0 0 900 230" role="img" aria-label="Laminate layer stack">
<rect x="120" y="30" width="420" height="34" fill="var(--blue3)" stroke="var(--blue)" stroke-width="2"/><text x="330" y="52" text-anchor="middle" font-size="13" font-weight="700">PET 12 µm (print side, outer)</text>
<rect x="120" y="64" width="420" height="12" fill="var(--purple3)" stroke="var(--purple)" stroke-width="1.5"/><text x="560" y="74" font-size="12.5">reverse-printed ink</text>
<rect x="120" y="76" width="420" height="12" fill="var(--orange3)" stroke="var(--orange)" stroke-width="1.5"/><text x="560" y="86" font-size="12.5">laminating adhesive (2–3 g/m²)</text>
<rect x="120" y="88" width="420" height="100" fill="var(--blue3)" stroke="var(--blue)" stroke-width="2"/><text x="330" y="143" text-anchor="middle" font-size="13" font-weight="700">LDPE 50 µm (sealant, inner)</text>
<text x="560" y="140" font-size="12.5">product contact side</text></svg>'''

ARTICLES.append(dict(
    slug="laminate-structures-and-barrier", group="packaging",
    title="Flexible Laminate Structures: Layers, Grammage, Yield and Barrier (OTR, WVTR)",
    short="Laminates and barrier",
    tags=["Laminates", "Barrier", "OTR", "WVTR"],
    desc="Common flexible packaging laminates (PET, BOPP, metallised films, foil, nylon, PE, CPP), layer roles, grammage and yield, combining oxygen and water vapour transmission rates, and costing per square metre.",
    blurb="Why each layer is there, how to calculate grammage, yield and cost, and how to combine barrier values of the layers.",
    lead="A flexible laminate combines films so that each does one job: an outer film for printing, stiffness and heat resistance; a barrier layer against oxygen, moisture and light; and an inner sealant that makes the pack. Understanding grammage, yield and barrier arithmetic lets you compare structures and costs quickly.",
    takeaways=[
        "Grammage (g/m²) = thickness (µm) × density (g/cm³); add 2–3 g/m² per adhesive layer and 1–2 g/m² for ink.",
        "Yield (m²/kg) = 1,000 / total grammage. Cost per m² = Σ(layer grammage × price per kg)/1,000.",
        "Barrier layers in series add resistances: 1/OTR<sub>total</sub> = Σ 1/OTR<sub>i</sub> (same for WVTR).",
        "Metallised films cut OTR and WVTR by 10–100× compared with plain films; aluminium foil is near-total barrier when pinhole-free.",
        "Transmission rates depend strongly on temperature and humidity: always quote test conditions (e.g. 23 °C, 0 % RH for OTR; 38 °C, 90 % RH for WVTR).",
    ],
    body=f'''
<h2 id="roles">1. Layers and their jobs</h2>
{fig(stack, "Figure 1. A two-ply laminate: reverse-printed PET bonded to an LDPE sealant.")}
{table(["Film","Density (g/cm³)","Strengths","Typical role"],[["PET (polyester)","1.39–1.40","Stiff, heat resistant, clear, good print","Outer print web"],["BOPP","0.905–0.91","Moisture barrier, cheap, clear or pearlised","Outer or barrier in snacks"],
["Metallised PET / BOPP","as base","Light, oxygen and moisture barrier","Barrier layer"],["Aluminium foil","2.71","Total barrier (if no pinholes)","Barrier in retort, pharma"],["BOPA (nylon)","1.14","Puncture, toughness, oxygen barrier","Vacuum and retort packs"],
["LDPE / LLDPE","0.92","Sealant, tough","Inner sealant"],["CPP","0.90","Higher-temperature sealant, stiff","Retort, hot fill"],["EVOH (in coex)","1.14–1.20","Very high oxygen barrier when dry","Coextruded barrier"]])}

<h2 id="structures">2. Typical structures</h2>
{table(["Application","Structure"],[["Snacks","BOPP 20 / ink / adh / MBOPP 18"],["Tea, coffee, powders","PET 12 / ink / adh / MPET 12 / adh / LDPE 50–70"],["Retort pouches","PET 12 / Al 7–9 / BOPA 15 / CPP 70–80"],
["Detergent / liquid stand-up","PET 12 / ink / adh / LLDPE 100–150"],["Vacuum meat packs","BOPA 15 / PE 60–90 (or coex PA/EVOH/PE)"],["Pharma blister lidding","Al 20 / heat-seal lacquer"]])}

<h2 id="barrier">3. Barrier values (indicative)</h2>
{table(["Film","OTR (cm³/m²·day, 23 °C, 0 % RH)","WVTR (g/m²·day, 38 °C, 90 % RH)"],[["PET 12 µm","100–120","40–50"],["BOPP 20 µm","1,500–2,000","4–6"],["MPET 12 µm","0.5–2","0.5–1.5"],["MBOPP 18–20 µm","20–150","0.2–1"],
["BOPA 15 µm","30–40 (dry)","250–300"],["LDPE 50 µm","3,000–4,000","8–10"],["Al foil 9 µm","&lt; 0.01","&lt; 0.01"],["EVOH (32 mol% ethylene) 5 µm","&lt; 1 (dry)","high"]],num_cols=())}
{formula("Layers in series:   1/OTR_total = Σ (1/OTR_i)        1/WVTR_total = Σ (1/WVTR_i)")}

<h2 id="example">4. Worked example</h2>
<p>PET 12 / ink 1.5 g/m² / adhesive 3 g/m² / LDPE 50:</p>
{table(["Quantity","Value"],[["Grammage",f"{gsm:.1f} g/m²"],["Yield",f"{1000/gsm:.1f} m²/kg"],["OTR (series)",f"{otr:.0f} cm³/m²·day"],["WVTR (series)",f"{wvtr:.1f} g/m²·day"]],num_cols=(1,))}
''',
    calcs=[dict(id="lam", title="Laminate builder: grammage, yield, cost and barrier",
                note="Enter up to four layers. For ink and adhesive set density = 1 and enter grammage as 'thickness'. Leave OTR/WVTR as 0 for layers that add no barrier.",
                presets=[dict(label="PET/PE", v=dict(t1=12, d1=1.40, o1=110, w1=45, p1=160, t2=4.5, d2=1, o2=0, w2=0, p2=350, t3=50, d3=0.92, o3=3000, w3=8, p3=120, t4=0, d4=1, o4=0, w4=0, p4=0)),
                         dict(label="PET/MPET/PE", v=dict(t1=12, d1=1.40, o1=110, w1=45, p1=160, t2=7, d2=1, o2=0, w2=0, p2=350, t3=12, d3=1.40, o3=1, w3=1, p3=210, t4=60, d4=0.92, o4=3000, w4=8, p4=120))],
                inputs=sum([[dict(id=f"t{i}", label=f"Layer {i} thickness µm (or g/m²)", value=v1), dict(id=f"d{i}", label=f"Layer {i} density", value=v2),
                             dict(id=f"o{i}", label=f"Layer {i} OTR", value=v3), dict(id=f"w{i}", label=f"Layer {i} WVTR", value=v4), dict(id=f"p{i}", label=f"Layer {i} price per kg", value=v5)]
                            for i, (v1, v2, v3, v4, v5) in enumerate([(12, 1.40, 110, 45, 160), (4.5, 1, 0, 0, 350), (50, 0.92, 3000, 8, 120), (0, 1, 0, 0, 0)], start=1)], []),
                js='''var g=0,c=0,ro=0,rw=0,rows=[];for(var i=1;i<=4;i++){var gg=v["t"+i]*v["d"+i];g+=gg;c+=gg*v["p"+i]/1000;if(v["o"+i]>0)ro+=1/v["o"+i];if(v["w"+i]>0)rw+=1/v["w"+i];}
return {rows:[["Total grammage",fmt(g,1)+" g/m²"],["Yield",fmt(1000/g,2)+" m²/kg"],["Material cost",fmt(c,3)+" per m²",fmt(c*1000/g,1)+" per kg"],["OTR (series)",ro>0?fmt(1/ro,2)+" cm³/m²·day":"—"],["WVTR (series)",rw>0?fmt(1/rw,3)+" g/m²·day":"—"]]};''')],
    quiz=[
        dict(q="Grammage of 20 µm BOPP (density 0.91)?", o=["9.1 g/m²", "18.2 g/m²", "20 g/m²", "22 g/m²"], a=1, e="20 × 0.91 = 18.2 g/m²."),
        dict(q="Yield of a 100 g/m² laminate:", o=["1 m²/kg", "10 m²/kg", "100 m²/kg", "0.1 m²/kg"], a=1, e="1000/100 = 10 m²/kg."),
        dict(q="Which layer gives near-total barrier?", o=["LDPE", "BOPP", "Aluminium foil", "PET"], a=2, e="Pinhole-free foil."),
        dict(q="Barrier layers combine like:", o=["Adding OTRs", "Resistances in series: 1/OTR adds", "Taking the maximum", "Averaging"], a=1, e="Reciprocal sum."),
        dict(q="Why is PET usually the outer layer?", o=["Seals well", "Stiff, heat resistant and printable", "Cheapest", "Best moisture barrier"], a=1, e="It survives sealing jaws and holds print."),
        dict(q="Nylon (BOPA) is added mainly for:", o=["Moisture barrier", "Puncture resistance and toughness", "Sealing", "Gloss"], a=1, e="Vacuum and bone-in packs."),
        dict(q="PET 12 (1.4) + adhesive 3 g/m² + LDPE 60 (0.92). Grammage?", num=74.0, unit="g/m²", e="16.8 + 3 + 55.2 = 75.0? → 16.8+3+55.2 = 75.0", tol=0.02),
        dict(q="Two layers with OTR 100 and 3000 in series. Total OTR?", num=96.8, unit="cm³/m²·day", e="1/(0.01 + 0.000333) = 96.8."),
    ],
    refs=["ASTM D3985 (OTR, coulometric) and ASTM F1249 (WVTR, modulated IR).", "Wagner, J. R. (ed.), Multilayer Flexible Packaging, 2nd ed., Elsevier, 2016.", "Robertson, G. L., Food Packaging: Principles and Practice, 3rd ed., CRC Press, 2012.",
          "Film suppliers' technical data sheets (PET, BOPP, BOPA, metallised films)."],
    links=[("Wikipedia — Laminated packaging", "https://en.wikipedia.org/wiki/Flexible_packaging")],
))
# fix the arithmetic of one quiz item explicitly
ARTICLES[-1]["quiz"][6] = dict(q="PET 12 (1.4) + adhesive 3 g/m² + LDPE 60 (0.92). Grammage in g/m²?", num=75.0, unit="g/m²", e="16.8 + 3 + 55.2 = 75.0 g/m².")

# =====================================================================================
# 31. OFFSET PRINTING COSTING
# =====================================================================================
qty, ups, wastep, sw, sh, gsm_p, rate_kg = 5000, 4, 10, 450, 640, 130, 90.0
sheets = math.ceil(qty / ups * (1 + wastep / 100))
paper_kg = sheets * sw / 1000 * sh / 1000 * gsm_p / 1000
paper_cost = paper_kg * rate_kg
plates = 8 * 450
imp = sheets * 2
print_cost = max(imp / 1000, 1) * 250 * 4
total = paper_cost + plates + print_cost + 1200
ARTICLES.append(dict(
    slug="offset-printing-costing", group="packaging",
    title="Offset Printing Costing Basics: Ups, Sheets, Paper Weight, Plates and Impressions",
    short="Offset costing",
    tags=["Offset printing", "Costing", "Paper", "Estimating"],
    desc="Estimating sheet-fed offset print jobs: ups per sheet, wastage, paper weight and cost, plates, make-ready, impressions, finishing, overheads and margin, with a worked estimate and calculator.",
    blurb="Turning a print enquiry into a price: ups, sheets with wastage, paper kilograms, plates, impressions and finishing.",
    lead="Every offset quote follows the same chain: how many copies fit on a press sheet, how many sheets are needed including wastage, what the paper weighs and costs, how many plates and impressions the job needs, and what finishing adds. Getting the chain right, and knowing which items are fixed and which scale with quantity, is what makes estimates competitive and safe.",
    takeaways=[
        "Ups = how many finished pieces fit on one press sheet (try both orientations, allow bleed and gripper).",
        "Sheets = quantity ÷ ups × (1 + wastage). Wastage is typically 5–10 % for short runs plus fixed make-ready sheets.",
        "Paper kg = sheets × sheet area (m²) × gsm / 1,000. A ream is 500 sheets.",
        "Plates and make-ready are fixed costs per job; impressions, paper and ink scale with quantity, so unit cost falls with quantity.",
        "Impressions are counted per side per pass; a 4-colour press prints four colours in one pass.",
    ],
    body=f'''
<h2 id="chain">1. The estimating chain</h2>
{fig(flow(["Enquiry|size, qty, colours","Ups and sheets|wastage","Paper|kg × rate","Plates|colours × sides","Printing|impressions, make-ready","Finishing|cut, fold, laminate","Overheads + margin|quote"], h=130), "Figure 1. Elements of an offset print estimate.")}
{formula("Ups = max( ⌊SW/w⌋·⌊SH/h⌋ , ⌊SW/h⌋·⌊SH/w⌋ )    (after removing gripper and margins)\nSheets = ceil( qty / ups · (1 + wastage) )\nPaper kg = sheets · (SW·SH in m²) · gsm / 1000\nPlates = colours × sides (or colours × 1 for work-and-turn)\nImpressions = sheets × passes per sheet")}

<h2 id="paper">2. Paper</h2>
{table(["Common paper","gsm","Use"],[["Maplitho / uncoated","70–120","Letterheads, books, forms"],["Art paper (coated gloss / matt)","90–170","Brochures, leaflets, catalogues"],["Art card","210–350","Covers, cards, folders"],["Duplex / SBS board","230–450","Cartons"]])}
<p>Standard Indian sheet sizes include 23×36", 25×36" and 18×23" / 20×30" families; metric equivalents such as 450×640 mm or 720×1020 mm suit modern presses. Check grain direction for folding.</p>

<h2 id="example">3. Worked example</h2>
<p>{qty:,} A4 leaflets, 4/4 colours, {gsm_p} gsm art paper at ₹{rate_kg:.0f}/kg, sheet {sw}×{sh} mm (4 ups), {wastep} % wastage, plates ₹450 each, printing ₹250 per 1,000 impressions per colour, cutting ₹1,200 (example rates).</p>
{table(["Item","Calculation","Amount"],[["Sheets",f"{qty:,}/4 × 1.10","{:,}".format(sheets)],["Paper",f"{sheets:,} × 0.288 m² × 130/1000 = {paper_kg:.1f} kg",f"₹{paper_cost:,.0f}"],["Plates","4 colours × 2 sides × ₹450",f"₹{plates:,}"],
["Printing",f"{imp:,} impressions × 4 colours × ₹250/1000",f"₹{print_cost:,.0f}"],["Cutting","fixed",f"₹1,200"],["Total before overheads and margin","",f"<b>₹{total:,.0f}</b>"],["Per leaflet","",f"₹{total/qty:.2f}"]],num_cols=(2,))}
''',
    calcs=[dict(id="off", title="Offset job estimator (example rates editable)",
                presets=[dict(label="Worked example", v=dict(q=5000, w=210, h=297, SW=450, SH=640, gr=10, gsm=130, rk=90, col=4, sides=2, pl=450, imp=250, fin=1200, ovh=15, mar=15))],
                inputs=[dict(id="q", label="Quantity", value=5000), dict(id="w", label="Finished width (mm)", value=210), dict(id="h", label="Finished height (mm)", value=297), dict(id="SW", label="Sheet width (mm)", value=450), dict(id="SH", label="Sheet height (mm)", value=640),
                        dict(id="gr", label="Gripper + margins (mm)", value=10), dict(id="gsm", label="Paper gsm", value=130), dict(id="rk", label="Paper rate (per kg)", value=90), dict(id="col", label="Colours", value=4), dict(id="sides", label="Sides printed", value=2),
                        dict(id="pl", label="Plate cost each", value=450), dict(id="imp", label="Rate per 1000 impressions per colour", value=250), dict(id="fin", label="Finishing (fixed)", value=1200), dict(id="ovh", label="Overheads (%)", value=15), dict(id="mar", label="Margin (%)", value=15)],
                js='''var W=v.SW-v.gr,H=v.SH-v.gr,u1=Math.floor(W/v.w)*Math.floor(H/v.h),u2=Math.floor(W/v.h)*Math.floor(H/v.w),ups=Math.max(u1,u2,1);
var sh=Math.ceil(v.q/ups*1.1),kg=sh*v.SW*v.SH/1e6*v.gsm/1000,paper=kg*v.rk,plates=v.col*v.sides*v.pl,imps=sh*v.sides,pr=Math.max(imps/1000,1)*v.imp*v.col;
var base=paper+plates+pr+v.fin,tot=base*(1+v.ovh/100)*(1+v.mar/100);
return {rows:[["Ups per sheet",ups,(u2>u1?"rotated":"straight")+" layout"],["Sheets (10 % wastage)",fmt(sh,0)],["Paper",fmt(kg,1)+" kg",fmt(paper,0)],["Plates",fmt(plates,0)],["Printing",fmt(pr,0),fmt(imps,0)+" impressions"],["Price incl. overheads and margin",fmt(tot,0),fmt(tot/v.q,2)+" per piece"]]};''')],
    quiz=[
        dict(q="Ups means:", o=["Number of colours", "Number of finished pieces per press sheet", "Plates per job", "Sheets per ream"], a=1, e="Pieces imposed on one sheet."),
        dict(q="A ream contains:", o=["100 sheets", "250 sheets", "500 sheets", "1000 sheets"], a=2, e="500 sheets (sometimes 480 historically)."),
        dict(q="Which costs are fixed per job?", o=["Paper", "Plates and make-ready", "Impressions", "Ink"], a=1, e="They do not change with quantity."),
        dict(q="Why does unit cost fall with quantity?", o=["Paper gets cheaper", "Fixed costs are spread over more pieces", "Press runs faster", "Ink is free"], a=1, e="Fixed costs amortised."),
        dict(q="Plates for a 4/4 job on a sheet-fed press (sheetwise):", o=["4", "8", "2", "1"], a=1, e="4 colours × 2 sides."),
        dict(q="Grain direction matters most for:", o=["Colour", "Folding and creasing quality", "Price", "Plates"], a=1, e="Fold parallel to grain."),
        dict(q="Paper kg for 2,000 sheets of 0.5 m², 100 gsm?", num=100, unit="kg", e="2000 × 0.5 × 100/1000 = 100 kg."),
        dict(q="10,000 pieces, 8 ups, 5 % wastage. Sheets?", num=1313, e="10000/8 × 1.05 = 1,312.5 → 1,313."),
    ],
    refs=["Kipphan, H. (ed.), Handbook of Print Media, Springer, 2001.", "Printing Industries of America, Print Estimating handbooks.", "ISO 216 (paper sizes) and ISO 536 (grammage determination)."],
    links=[("Wikipedia — Offset printing", "https://en.wikipedia.org/wiki/Offset_printing")],
))

# =====================================================================================
# 32. CARTON DIELINES
# =====================================================================================
Lc, Wc, Dc, glue, tuck = 60.0, 40.0, 150.0, 15.0, 15.0
bw = 2 * Lc + 2 * Wc + glue
bh = Dc + 2 * (Wc + tuck)
SWc, SHc, grip, gut = 720.0, 1020.0, 12.0, 4.0
u1 = math.floor((SWc - grip) / (bw + gut)) * math.floor(SHc / (bh + gut))
u2 = math.floor((SWc - grip) / (bh + gut)) * math.floor(SHc / (bw + gut))
upsc = max(u1, u2)
util = upsc * bw * bh / (SWc * SHc) * 100

def dieline_svg():
    S = 1.3
    x0, y0 = 60, 20
    o = [f'<svg viewBox="0 0 900 380" role="img" aria-label="Reverse tuck end carton dieline">']
    xs = [0, glue, glue + Lc, glue + Lc + Wc, glue + 2 * Lc + Wc, glue + 2 * Lc + 2 * Wc]
    names = ["G", "front L", "side W", "back L", "side W"]
    top = Wc + tuck
    for i in range(5):
        x, w = x0 + xs[i] * S, (xs[i + 1] - xs[i]) * S
        o.append(f'<rect x="{x:.1f}" y="{y0+top*S:.1f}" width="{w:.1f}" height="{Dc*S:.1f}" fill="{"var(--orange3)" if i==0 else "var(--blue3)"}" stroke="var(--blue)" stroke-width="2"/>')
        o.append(f'<text x="{x+w/2:.1f}" y="{y0+(top+Dc/2)*S:.1f}" text-anchor="middle" font-size="12">{names[i]}</text>')
    # top closure on back panel (index 3), bottom closure on front (index 1) for RTE
    for idx, ytop in [(3, y0), (1, y0 + (top + Dc) * S)]:
        x, w = x0 + xs[idx] * S, (xs[idx + 1] - xs[idx]) * S
        yy = ytop if idx == 3 else ytop
        if idx == 3:
            o.append(f'<rect x="{x:.1f}" y="{y0+tuck*S:.1f}" width="{w:.1f}" height="{Wc*S:.1f}" fill="var(--blue3)" stroke="var(--blue)" stroke-width="2"/>')
            o.append(f'<path d="M{x+4:.1f} {y0+tuck*S:.1f} Q{x+w/2:.1f} {y0:.1f} {x+w-4:.1f} {y0+tuck*S:.1f}" fill="var(--purple3)" stroke="var(--purple)" stroke-width="2"/>')
        else:
            o.append(f'<rect x="{x:.1f}" y="{yy:.1f}" width="{w:.1f}" height="{Wc*S:.1f}" fill="var(--blue3)" stroke="var(--blue)" stroke-width="2"/>')
            o.append(f'<path d="M{x+4:.1f} {yy+Wc*S:.1f} Q{x+w/2:.1f} {yy+(Wc+tuck)*S:.1f} {x+w-4:.1f} {yy+Wc*S:.1f}" fill="var(--purple3)" stroke="var(--purple)" stroke-width="2"/>')
    for idx in (2, 4):
        x, w = x0 + xs[idx] * S, (xs[idx + 1] - xs[idx]) * S
        o.append(f'<path d="M{x:.1f} {y0+top*S:.1f} L{x+6:.1f} {y0+(top-Wc*0.7)*S:.1f} L{x+w-6:.1f} {y0+(top-Wc*0.7)*S:.1f} L{x+w:.1f} {y0+top*S:.1f}" fill="var(--orange3)" stroke="var(--orange)" stroke-width="1.5"/>')
        o.append(f'<path d="M{x:.1f} {y0+(top+Dc)*S:.1f} L{x+6:.1f} {y0+(top+Dc+Wc*0.7)*S:.1f} L{x+w-6:.1f} {y0+(top+Dc+Wc*0.7)*S:.1f} L{x+w:.1f} {y0+(top+Dc)*S:.1f}" fill="var(--orange3)" stroke="var(--orange)" stroke-width="1.5"/>')
    o.append(f'<g font-size="13"><text x="520" y="60">Inside {Lc:.0f} × {Wc:.0f} × {Dc:.0f} mm</text><text x="520" y="82">Blank width = 2L + 2W + glue = {bw:.0f} mm</text><text x="520" y="104">Blank height = D + 2(W + tuck) = {bh:.0f} mm</text>'
             f'<text x="520" y="140">blue: panels · orange: glue flap and dust flaps</text><text x="520" y="162">purple: tuck flaps (top on back, bottom on front)</text></g></svg>')
    return "".join(o)

ARTICLES.append(dict(
    slug="carton-dielines-and-board-nesting", group="packaging",
    title="Folding Carton Dielines and Board Nesting: Blank Size, Ups and Yield",
    short="Carton dielines",
    tags=["Cartons", "Dieline", "Board", "Nesting"],
    desc="Folding carton styles, calculating the flat blank of a reverse tuck end carton, board caliper allowances, grain direction, nesting ups on a sheet with gripper and gutters, and board consumption.",
    blurb="From inside dimensions to flat blank, then how many blanks fit on a sheet and how much board each carton uses.",
    lead="A folding carton starts as a flat blank cut and creased from a printed board sheet. The dieline sets panel sizes from the inside dimensions of the pack, plus glue flap, tucks and dust flaps. How tightly blanks nest on the sheet decides board consumption, which is usually the largest cost in a carton.",
    takeaways=[
        "Specify cartons by inside dimensions L × W × D (length and width of the opening, depth along the tuck).",
        "Reverse tuck end blank ≈ (2L + 2W + glue flap) × (D + 2W + 2 tucks), with small caliper allowances on creases.",
        "Board grain should usually run parallel to the depth (D) for panel stiffness and good creasing.",
        "Ups depend on blank size, sheet size, gripper margin and gutters; interlocking (nesting) shapes improve yield.",
        "Board per carton = sheet area × gsm ÷ ups (plus wastage), not just blank area.",
    ],
    body=f'''
<h2 id="styles">1. Common styles</h2>
{table(["Style","Closure","Use"],[["Reverse tuck end (RTE)","Top tuck on back panel, bottom tuck on front","Cosmetics, pharma, light products"],["Straight tuck end (STE)","Both tucks on the same panel","Windows, display fronts"],["Crash-lock (auto-bottom)","Pre-glued bottom snaps open","Heavier products, fast packing"],
["Seal end","Glued flaps","Cereal, automatic cartoners"],["Sleeve / wrap","Open ends","Multipacks, outer sleeves"]])}

<h2 id="blank">2. From inside dimensions to blank</h2>
{fig(dieline_svg(), "Figure 1. Simplified reverse tuck end dieline. Creases run along panel edges; real dielines add caliper allowances, tuck slits and locking features.")}
{formula("Blank width  ≈ 2L + 2W + glue flap (12–20 mm)\nBlank height ≈ D + 2·(W + tuck)     (tuck ≈ 12–20 mm)\nAllowance: add about 1 × board caliper per crease that wraps around another panel")}
{table(["Board","Typical gsm","Caliper (µm)"],[["SBS / FBB (folding boxboard)","230–350","300–550"],["Duplex grey back","230–450","300–600"],["Kraft liner board","200–350","250–450"]])}

<h2 id="nesting">3. Nesting on the sheet</h2>
{formula("Ups = ⌊(SW − gripper)/(bw + gutter)⌋ · ⌊SH/(bh + gutter)⌋   (try rotated too)\nSheet utilisation = ups · blank area / sheet area\nBoard per carton (g) = sheet area (m²) · gsm / ups · (1 + wastage)")}
<p>Real nesting interlocks the tuck and dust flaps of neighbouring blanks ("tumble" or "nested" layouts), often adding one or two ups over the rectangular estimate.</p>

<h2 id="example">4. Worked example</h2>
<p>RTE carton {Lc:.0f} × {Wc:.0f} × {Dc:.0f} mm, sheet {SWc:.0f} × {SHc:.0f} mm, gripper {grip:.0f} mm, gutter {gut:.0f} mm, 350 gsm board.</p>
{table(["Step","Result"],[["Blank",f"{bw:.0f} × {bh:.0f} mm"],["Ups (rectangular)",f"<b>{upsc}</b>"],["Sheet utilisation",f"{util:.0f} %"],["Board per carton",f"{SWc*SHc/1e6*350/upsc:.1f} g (before wastage)"]],num_cols=(1,))}
''',
    calcs=[dict(id="crt", title="RTE blank size and sheet nesting",
                presets=[dict(label="Worked example", v=dict(L=60, W=40, D=150, glue=15, tuck=15, SW=720, SH=1020, grip=12, gut=4, gsm=350, waste=5)), dict(label="Small pharma carton", v=dict(L=50, W=20, D=100, glue=12, tuck=12, SW=640, SH=900, grip=12, gut=3, gsm=300, waste=5))],
                inputs=[dict(id="L", label="Inside length L (mm)", value=60), dict(id="W", label="Inside width W (mm)", value=40), dict(id="D", label="Inside depth D (mm)", value=150), dict(id="glue", label="Glue flap (mm)", value=15), dict(id="tuck", label="Tuck (mm)", value=15),
                        dict(id="SW", label="Sheet width (mm)", value=720), dict(id="SH", label="Sheet height (mm)", value=1020), dict(id="grip", label="Gripper (mm)", value=12), dict(id="gut", label="Gutter (mm)", value=4), dict(id="gsm", label="Board gsm", value=350), dict(id="waste", label="Wastage (%)", value=5)],
                js='''var bw=2*v.L+2*v.W+v.glue,bh=v.D+2*(v.W+v.tuck),W=v.SW-v.grip,u1=Math.floor(W/(bw+v.gut))*Math.floor(v.SH/(bh+v.gut)),u2=Math.floor(W/(bh+v.gut))*Math.floor(v.SH/(bw+v.gut)),u=Math.max(u1,u2);
var util=u*bw*bh/(v.SW*v.SH)*100,g=u>0?v.SW*v.SH/1e6*v.gsm/u*(1+v.waste/100):NaN;
return {rows:[["Blank size",fmt(bw,0)+" × "+fmt(bh,0)+" mm"],["Ups",u,u2>u1?"rotated":"straight"],["Sheet utilisation",fmt(util,1)+" %"],["Board per carton",fmt(g,2)+" g","incl. wastage"],["Cartons per 1000 sheets",fmt(u*1000/(1+v.waste/100),0)]],
verdict:u===0?["bad","Blank does not fit the sheet."]:(util<60?["caution","Low utilisation: try another sheet size or a nested layout."]:["ok","Reasonable utilisation."])};''')],
    quiz=[
        dict(q="Carton dimensions are normally specified as:", o=["Outside dimensions", "Inside dimensions L × W × D", "Blank size", "Sheet size"], a=1, e="Inside dimensions define what fits."),
        dict(q="In a reverse tuck end carton the tucks are:", o=["On the same panel", "On opposite panels (top on back, bottom on front)", "Glued", "Absent"], a=1, e="Reverse = opposite panels."),
        dict(q="Board grain should usually run:", o=["Parallel to the depth D", "Across D", "Diagonally", "Does not matter"], a=0, e="Stiffer panels, better creases."),
        dict(q="Board per carton is calculated from:", o=["Blank area only", "Sheet area × gsm ÷ ups", "Inside volume", "Print area"], a=1, e="The whole sheet is consumed."),
        dict(q="Nesting blanks closely mainly reduces:", o=["Ink", "Board consumption", "Glue", "Plates"], a=1, e="More ups per sheet."),
        dict(q="Gripper margin is needed for:", o=["Glue", "The press to hold the sheet", "Creasing", "Varnish"], a=1, e="Unprintable edge."),
        dict(q="Inside 50 × 30 × 120, glue 15. Blank width (mm)?", num=175, unit="mm", e="2×50 + 2×30 + 15 = 175 mm."),
        dict(q="Sheet 0.7 m², 300 gsm, 10 ups. Board per carton (g, no wastage)?", num=21, unit="g", e="0.7 × 300/10 = 21 g."),
    ],
    refs=["ECMA Code — The European Standard for Folding Cartons (style codes).", "Kirwan, M. J. (ed.), Handbook of Paper and Paperboard Packaging Technology, 2nd ed., Wiley-Blackwell, 2013.", "Soroka, W., Fundamentals of Packaging Technology, 5th ed., IoPP."],
    links=[("Wikipedia — Folding carton", "https://en.wikipedia.org/wiki/Folding_carton")],
))

# =====================================================================================
# 33. COLOUR AND ΔE
# =====================================================================================
def de2000(L1, a1, b1, L2, a2, b2):
    C1, C2 = math.hypot(a1, b1), math.hypot(a2, b2)
    Cb = (C1 + C2) / 2
    G = 0.5 * (1 - math.sqrt(Cb ** 7 / (Cb ** 7 + 25 ** 7)))
    a1p, a2p = (1 + G) * a1, (1 + G) * a2
    C1p, C2p = math.hypot(a1p, b1), math.hypot(a2p, b2)
    hp = lambda b, ap: 0 if (b == 0 and ap == 0) else math.degrees(math.atan2(b, ap)) % 360
    h1p, h2p = hp(b1, a1p), hp(b2, a2p)
    dLp, dCp = L2 - L1, C2p - C1p
    if C1p * C2p == 0:
        dhp = 0
    else:
        dhp = h2p - h1p
        dhp = dhp - 360 if dhp > 180 else (dhp + 360 if dhp < -180 else dhp)
    dHp = 2 * math.sqrt(C1p * C2p) * math.sin(math.radians(dhp / 2))
    Lbp, Cbp = (L1 + L2) / 2, (C1p + C2p) / 2
    if C1p * C2p == 0:
        hbp = h1p + h2p
    elif abs(h1p - h2p) <= 180:
        hbp = (h1p + h2p) / 2
    else:
        hbp = (h1p + h2p + 360) / 2 if h1p + h2p < 360 else (h1p + h2p - 360) / 2
    T = 1 - 0.17 * math.cos(math.radians(hbp - 30)) + 0.24 * math.cos(math.radians(2 * hbp)) + 0.32 * math.cos(math.radians(3 * hbp + 6)) - 0.20 * math.cos(math.radians(4 * hbp - 63))
    dth = 30 * math.exp(-((hbp - 275) / 25) ** 2)
    Rc = 2 * math.sqrt(Cbp ** 7 / (Cbp ** 7 + 25 ** 7))
    SL = 1 + 0.015 * (Lbp - 50) ** 2 / math.sqrt(20 + (Lbp - 50) ** 2)
    SC, SH = 1 + 0.045 * Cbp, 1 + 0.015 * Cbp * T
    RT = -math.sin(math.radians(2 * dth)) * Rc
    return math.sqrt((dLp / SL) ** 2 + (dCp / SC) ** 2 + (dHp / SH) ** 2 + RT * (dCp / SC) * (dHp / SH))

assert abs(de2000(50, 2.6772, -79.7751, 50, 0, -82.7485) - 2.0425) < 1e-3
s1, s2 = (50, 20, -10), (52, 18, -8)
de76 = math.dist(s1, s2)
de00 = de2000(*s1, *s2)

ab_svg = '''<svg viewBox="0 0 900 330" role="img" aria-label="CIELAB a* b* plane">
<line x1="160" y1="165" x2="460" y2="165" class="ax"/><line x1="310" y1="20" x2="310" y2="310" class="ax"/>
<text x="468" y="170" font-size="13" font-weight="700">+a* (red)</text><text x="70" y="170" font-size="13" font-weight="700">−a* (green)</text><text x="318" y="18" font-size="13" font-weight="700">+b* (yellow)</text><text x="318" y="325" font-size="13" font-weight="700">−b* (blue)</text>
<polygon points="310,60 410,110 430,190 330,280 220,250 190,150 240,80" fill="none" stroke="var(--blue)" stroke-width="3"/>
<polygon points="310,50 425,100 450,190 345,295 205,262 170,150 235,68" fill="none" stroke="var(--orange)" stroke-width="3" stroke-dasharray="10 6"/>
<g font-size="13"><text x="560" y="80">L* = lightness (0 black … 100 white)</text><text x="560" y="105">a*, b* = opponent colour axes</text><text x="560" y="130">Chroma C* = √(a*² + b*²)</text><text x="560" y="155">Hue h = atan2(b*, a*)</text>
<text x="560" y="195">solid line: CMYK gamut (schematic)</text><text x="560" y="217">dashed: extended gamut (CMYK + OGV)</text></g></svg>'''

ARTICLES.append(dict(
    slug="colour-cmyk-extended-gamut-and-delta-e", group="packaging",
    title="Colour for Print: CMYK, Extended Gamut, CIELAB and ΔE Tolerances",
    short="Colour and ΔE",
    tags=["Colour", "CIELAB", "Delta E", "Printing"],
    desc="Additive and subtractive colour, CIELAB coordinates, ΔE*ab and CIEDE2000 colour differences with tolerances, tone value increase, process standards, and extended-gamut CMYKOGV printing.",
    blurb="How print colour is specified and checked numerically: Lab values, ΔE76 versus ΔE2000, tolerances and extended gamut.",
    lead="Printed colour is judged by eye but controlled by numbers. A spectrophotometer reports each colour as CIELAB coordinates; the difference between target and print is a single number, ΔE. Knowing which ΔE formula is in use and what tolerance is realistic avoids arguments between brand owners, designers and printers.",
    takeaways=[
        "Print is subtractive (CMY plus black K); screens are additive (RGB). Their gamuts differ, so some screen colours cannot be printed.",
        "CIELAB describes colour by L* (lightness), a* (green–red) and b* (blue–yellow), designed to be roughly perceptually uniform.",
        "ΔE*ab (1976) is the straight-line distance in Lab; CIEDE2000 corrects for known non-uniformities and is preferred for tolerances.",
        "Typical acceptance: ΔE00 ≤ 2 for brand colours, ≤ 3 for general process work; about 1 is a just-noticeable difference side by side.",
        "Extended gamut (CMYK + orange, green, violet) reproduces most spot colours from a fixed ink set, saving changeovers and inventory.",
    ],
    body=f'''
<h2 id="models">1. Colour models</h2>
{table(["Model","Basis","Use"],[["RGB","Additive light","Screens, cameras"],["CMYK","Subtractive inks (cyan, magenta, yellow, black)","Process printing"],["Spot (Pantone-type)","Pre-mixed inks","Brand colours, solids"],["CIELAB","Device-independent perceptual space","Measurement and tolerances"],["CMYKOGV","Process + orange, green, violet","Extended gamut packaging"]])}
{fig(ab_svg, "Figure 1. The a*–b* plane of CIELAB with schematic gamuts. Extended gamut printing enlarges the printable area, especially in oranges, greens and violets.")}

<h2 id="deltae">2. Colour difference</h2>
{formula("ΔE*ab (1976) = √(ΔL*² + Δa*² + Δb*²)\nCIEDE2000: ΔE00 = √[(ΔL'/SL)² + (ΔC'/SC)² + (ΔH'/SH)² + RT·(ΔC'/SC)·(ΔH'/SH)]\n(weightings depend on lightness, chroma and hue; see CIE 142-2001)")}
{table(["ΔE00","Typical interpretation"],[["&lt; 1","Not perceptible side by side for most observers"],["1–2","Perceptible on close inspection; brand colour tolerance"],["2–3.5","Perceptible; acceptable for many process jobs"],["3.5–5","Clear difference"],["&gt; 5","Different colour"]])}
<p>Example: target L* = {s1[0]}, a* = {s1[1]}, b* = {s1[2]}; print {s2[0]}, {s2[1]}, {s2[2]} → ΔE*ab = <b>{de76:.2f}</b>, ΔE00 = <b>{de00:.2f}</b>. The 1976 formula overstates this difference.</p>

<h2 id="process">3. Process control</h2>
<ul><li><b>Solid density / Lab of primaries</b> within tolerance (ISO 12647-2 for offset, -4 for gravure, -6 for flexo).</li>
<li><b>Tone value increase (dot gain):</b> printed tone minus file tone at 50 % (e.g. 50 % file prints as 64–68 %); compensate with curves in plate making.</li>
<li><b>Grey balance</b> (e.g. G7 method) keeps neutral greys neutral across devices.</li>
<li><b>Measurement conditions:</b> state M0/M1/M2, D50 illuminant and 2° observer, and the backing (white or black).</li></ul>

<h2 id="egp">4. Extended gamut printing</h2>
<p>Instead of mixing a special ink for every brand colour, a fixed set of seven inks (CMYK + orange, green, violet) is used for every job. Benefits: no ink changeovers between jobs, smaller ink inventory, ganging of different designs on one press run. Requirements: tight process control, accurate colour management (multicolour ICC profiles), and stable substrate and ink. Not every spot colour can be reached; very saturated or metallic colours may still need a spot ink.</p>
''',
    calcs=[dict(id="de", title="ΔE calculator (CIE76 and CIEDE2000)",
                presets=[dict(label="Example", v=dict(L1=50, a1=20, b1=-10, L2=52, a2=18, b2=-8, tol=2)), dict(label="CIE test pair", v=dict(L1=50, a1=2.6772, b1=-79.7751, L2=50, a2=0, b2=-82.7485, tol=2))],
                inputs=[dict(id="L1", label="Target L*", value=50), dict(id="a1", label="Target a*", value=20), dict(id="b1", label="Target b*", value=-10), dict(id="L2", label="Sample L*", value=52), dict(id="a2", label="Sample a*", value=18), dict(id="b2", label="Sample b*", value=-8), dict(id="tol", label="Tolerance ΔE00", value=2)],
                js='''function rad(d){return d*Math.PI/180;}function deg(r){return r*180/Math.PI;}
var L1=v.L1,a1=v.a1,b1=v.b1,L2=v.L2,a2=v.a2,b2=v.b2,C1=Math.hypot(a1,b1),C2=Math.hypot(a2,b2),Cb=(C1+C2)/2,G=0.5*(1-Math.sqrt(Math.pow(Cb,7)/(Math.pow(Cb,7)+Math.pow(25,7))));
var a1p=(1+G)*a1,a2p=(1+G)*a2,C1p=Math.hypot(a1p,b1),C2p=Math.hypot(a2p,b2);function hp(b,ap){if(b===0&&ap===0)return 0;var h=deg(Math.atan2(b,ap));return h<0?h+360:h;}
var h1=hp(b1,a1p),h2=hp(b2,a2p),dL=L2-L1,dC=C2p-C1p,dh;if(C1p*C2p===0)dh=0;else{dh=h2-h1;if(dh>180)dh-=360;else if(dh<-180)dh+=360;}
var dH=2*Math.sqrt(C1p*C2p)*Math.sin(rad(dh/2)),Lb=(L1+L2)/2,Cbp=(C1p+C2p)/2,hb;if(C1p*C2p===0)hb=h1+h2;else if(Math.abs(h1-h2)<=180)hb=(h1+h2)/2;else hb=(h1+h2<360)?(h1+h2+360)/2:(h1+h2-360)/2;
var T=1-0.17*Math.cos(rad(hb-30))+0.24*Math.cos(rad(2*hb))+0.32*Math.cos(rad(3*hb+6))-0.20*Math.cos(rad(4*hb-63)),dth=30*Math.exp(-Math.pow((hb-275)/25,2)),Rc=2*Math.sqrt(Math.pow(Cbp,7)/(Math.pow(Cbp,7)+Math.pow(25,7)));
var SL=1+0.015*Math.pow(Lb-50,2)/Math.sqrt(20+Math.pow(Lb-50,2)),SC=1+0.045*Cbp,SH=1+0.015*Cbp*T,RT=-Math.sin(rad(2*dth))*Rc;
var d00=Math.sqrt(Math.pow(dL/SL,2)+Math.pow(dC/SC,2)+Math.pow(dH/SH,2)+RT*(dC/SC)*(dH/SH)),d76=Math.sqrt(Math.pow(L2-L1,2)+Math.pow(a2-a1,2)+Math.pow(b2-b1,2));
return {rows:[["ΔE*ab (1976)",fmt(d76,3)],["ΔE00 (CIEDE2000)",fmt(d00,3)],["ΔL*",fmt(L2-L1,2),L2>L1?"sample lighter":"sample darker"],["ΔC*",fmt(C2-C1,2),C2>C1?"more saturated":"less saturated"],["Hue angles",fmt(h1,1)+"° → "+fmt(h2,1)+"°"]],
verdict:d00<=v.tol?["ok","Within tolerance (ΔE00 ≤ "+v.tol+")."]:["bad","Outside tolerance (ΔE00 > "+v.tol+")."]};''')],
    quiz=[
        dict(q="Printing with inks is a(n):", o=["Additive colour process", "Subtractive colour process", "Neither", "Both equally"], a=1, e="Inks absorb (subtract) light."),
        dict(q="In CIELAB, L* represents:", o=["Hue", "Lightness", "Chroma", "Saturation only"], a=1, e="0 black to 100 white."),
        dict(q="Positive b* means:", o=["Bluer", "Yellower", "Redder", "Greener"], a=1, e="+b* = yellow direction."),
        dict(q="Which ΔE formula is preferred for tolerances today?", o=["ΔE*ab 1976", "CIEDE2000", "ΔE CMC only", "None"], a=1, e="CIEDE2000 corrects non-uniformities."),
        dict(q="Extended gamut printing adds which inks to CMYK?", o=["Red, green, blue", "Orange, green, violet", "White and silver", "Gold"], a=1, e="CMYKOGV."),
        dict(q="Tone value increase means:", o=["Lighter print", "Printed dots larger than in the file", "More colours", "Faster drying"], a=1, e="Dot gain."),
        dict(q="ΔL = 1, Δa = 2, Δb = 2. ΔE*ab?", num=3, e="√(1+4+4) = 3."),
        dict(q="Chroma for a* = 30, b* = 40?", num=50, e="√(900 + 1600) = 50."),
    ],
    refs=["CIE 015:2018, Colorimetry, 4th ed.", "CIE 142-2001, Improvement to industrial colour-difference evaluation (CIEDE2000).", "Sharma, G., Wu, W. and Dalal, E. N., 'The CIEDE2000 color-difference formula: implementation notes', Color Research & Application, 30(1), 2005.",
          "ISO 12647 series, Process control for the production of half-tone colour separations, proof and production prints.", "ISO 13655, Spectral measurement and colorimetric computation for graphic arts images."],
    links=[("Wikipedia — CIELAB colour space", "https://en.wikipedia.org/wiki/CIELAB_color_space"), ("Wikipedia — Color difference", "https://en.wikipedia.org/wiki/Color_difference")],
))
