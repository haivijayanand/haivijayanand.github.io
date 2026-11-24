"""
TOOL:    Vijay_Wiki articles — batch 2 group D (flexible packaging)
FAMILY:  vijay-wiki
VERSION: 1.0.0
DATE:    2026-11-24
CHAT:    claude.ai — Vijay_Wiki: next batch of topics (36 articles)
CHANGES: 1.0.0 Flexo/digital vs gravure, corona and surface energy, COF and slip, lamination, slitting/rewinding, pouch formats and costing
"""
import math
import numpy as np
from wiki import plot, flow, bars, fig, table, box, formula

ARTICLES = []

# ---------------------------------------------------------------- 66 FLEXO / DIGITAL / GRAVURE
setup = {"Gravure": 96000 + 10000, "Flexo": 48000 + 8000, "Digital": 2000}
run = {"Gravure": 1.2, "Flexo": 1.5, "Digital": 12.0}
be_fg = (setup["Gravure"] - setup["Flexo"]) / (run["Flexo"] - run["Gravure"])
be_df = (setup["Flexo"] - setup["Digital"]) / (run["Digital"] - run["Flexo"])
areas = np.linspace(500, 400000, 200)
cplot = plot([dict(pts=[(float(a) / 1000, float((setup[p] + run[p] * a) / a)) for a in areas], label=p, at={"Gravure": 300, "Flexo": 150, "Digital": 20}[p]) for p in ("Gravure", "Flexo", "Digital")],
             "job size (thousand m²)", "cost per m² (₹, example rates)", xlim=(0, 400), ylim=(0, 25), h=300)
ARTICLES.append(dict(
    slug="flexo-digital-and-gravure-compared", group="packaging",
    title="Flexo, Digital and Gravure Printing Compared: Process, Quality and Break-Even Run Length",
    short="Flexo vs digital vs gravure", tags=["Flexography", "Digital printing", "Gravure", "Costing"],
    desc="How flexographic, digital and rotogravure printing differ for flexible packaging: image carriers, anilox volumes, quality, set-up and running costs, and the break-even job size between processes.",
    blurb="What each printing process does best, anilox volume units, and how to find the job size where one becomes cheaper than another.",
    lead="Packaging converters choose between rotogravure, flexography and digital printing for each job. Gravure has the highest set-up cost and the lowest running cost; digital is the reverse; flexo sits between. Quality differences have narrowed, so the decision is often economic: how long is the run, how many versions, and how often will it repeat?",
    takeaways=[
        "Gravure: engraved cylinders, very consistent, best for long runs; cylinders are expensive but last millions of impressions.",
        "Flexo: photopolymer plates and anilox rolls metering ink; cheaper plates, fast changeovers, good quality with HD plates.",
        "Digital (inkjet, liquid toner): no plates, every print can differ; economical for short runs and many versions.",
        "Anilox volume: 1 BCM (billion cubic microns per square inch) ≈ 1.55 cm³/m².",
        "Break-even job size = difference in set-up cost ÷ difference in running cost per unit area.",
    ],
    body=f'''
<h2 id="compare">1. Process comparison</h2>
{table(["Feature","Gravure","Flexo","Digital"],[["Image carrier","Engraved chrome cylinder","Photopolymer plate on sleeve","None (digital file)"],["Ink metering","Cells on cylinder + doctor blade","Anilox roll + doctor/chamber","Printheads or toner"],["Set-up cost","High (cylinders)","Medium (plates)","Very low"],
["Running cost per m²","Lowest","Low","Highest (ink/toner)"],["Typical run length","Long (&gt; 50,000 m)","Medium to long","Short, variable data"],["Consistency over repeats","Excellent","Good","Excellent (colour-managed)"],["Changeover","Slow","Fast","Instant"]])}
{formula("Anilox: 1 BCM/in² ≈ 1.55 cm³/m²      wet ink ≈ volume × transfer (≈ 30–40 % for anilox to plate to web)\nBreak-even size A* = (Setup_A − Setup_B) / (Run_B − Run_A)")}
<h2 id="costs">2. Cost against job size</h2>
{fig(cplot, f"Figure 1. Cost per m² against job size using illustrative rates: set-up ₹{setup['Gravure']:,} / ₹{setup['Flexo']:,} / ₹{setup['Digital']:,} and running ₹{run['Gravure']}/₹{run['Flexo']}/₹{run['Digital']} per m² (gravure/flexo/digital).")}
<p>With these example rates, digital is cheapest below about <b>{be_df:,.0f} m²</b>, flexo between that and about <b>{be_fg:,.0f} m²</b>, and gravure above. Replace the rates with your own: repeat orders change the picture because gravure cylinders and flexo plates are reused.</p>
''',
    calcs=[dict(id="be", title="Break-even job size between two processes",
                presets=[dict(label="Gravure vs flexo", v=dict(sa=106000, ra=1.2, sb=56000, rb=1.5, area=100000, bcm=4)), dict(label="Flexo vs digital", v=dict(sa=56000, ra=1.5, sb=2000, rb=12, area=3000, bcm=4))],
                inputs=[dict(id="sa", label="Process A set-up (₹)", value=106000), dict(id="ra", label="Process A running (₹/m²)", value=1.2), dict(id="sb", label="Process B set-up (₹)", value=56000), dict(id="rb", label="Process B running (₹/m²)", value=1.5),
                        dict(id="area", label="Job size (m²)", value=100000), dict(id="bcm", label="Anilox volume (BCM)", value=4)],
                js='''var be=(v.sa-v.sb)/(v.rb-v.ra),ca=(v.sa+v.ra*v.area)/v.area,cb=(v.sb+v.rb*v.area)/v.area;
return {rows:[["Break-even job size",isFinite(be)&&be>0?fmt(be,0)+" m²":"no crossover"],["Cost per m², A",fmt(ca,3)+" ₹"],["Cost per m², B",fmt(cb,3)+" ₹"],["Cheaper for this job",ca<cb?"A":"B"],["Anilox volume",fmt(v.bcm*1.55,2)+" cm³/m²"]]};''')],
    quiz=[
        dict(q="Which process has the highest set-up cost?", o=["Digital", "Flexo", "Gravure", "All equal"], a=2, e="Engraved cylinders."),
        dict(q="Flexo meters ink with:", o=["Engraved cylinder", "Anilox roll", "Printheads", "Offset blanket"], a=1, e="Anilox."),
        dict(q="Digital printing is most economical for:", o=["Very long runs", "Short runs and many versions", "Metallic inks only", "Solids"], a=1, e="No plates."),
        dict(q="1 BCM equals about:", o=["1 cm³/m²", "1.55 cm³/m²", "10 cm³/m²", "0.155 cm³/m²"], a=1, e="Unit conversion."),
        dict(q="Break-even size depends on:", o=["Only set-up", "Set-up difference ÷ running-cost difference", "Only speed", "Ink colour"], a=1, e="Linear cost model."),
        dict(q="Why do repeat orders favour gravure?", o=["Faster drying", "Cylinders are reused, so set-up cost is not repeated", "Lower ink", "Better register"], a=1, e="Set-up amortised."),
        dict(q="Set-up difference ₹40,000; running difference ₹0.5/m². Break-even (m²)?", num=80000, unit="m²", e="40000/0.5."),
        dict(q="Anilox 3.5 BCM in cm³/m²?", num=5.425, e="3.5 × 1.55."),
    ],
    refs=["FTA (Flexographic Technical Association), FIRST — Flexographic Image Reproduction Specifications & Tolerances.", "Kipphan, H. (ed.), Handbook of Print Media, Springer, 2001.", "ISO 12647-6 (flexographic printing process control).", "Converter industry cost studies (illustrative rates)."],
    links=[("Wikipedia — Flexography", "https://en.wikipedia.org/wiki/Flexography"), ("Wikipedia — Digital printing", "https://en.wikipedia.org/wiki/Digital_printing")],
))

# ---------------------------------------------------------------- 67 CORONA
wct, vct, dose = 1.3, 150.0, 30.0
Pct = dose * vct * wct / 1000
ARTICLES.append(dict(
    slug="corona-treatment-and-surface-energy", group="packaging",
    title="Corona Treatment and Surface Energy: Dyne Levels, Treatment Dose and Adhesion",
    short="Corona treatment", tags=["Corona", "Surface energy", "Adhesion", "Films"],
    desc="Why polyolefin films need surface treatment, surface energy and dyne tests, corona treatment dose and power, treatment decay and additive bloom, and targets for printing, laminating and coating.",
    blurb="Raising film surface energy so inks and adhesives wet and stick: dyne targets, treatment dose and power.",
    lead="Polyethylene and polypropylene have low surface energy, so inks and adhesives bead up instead of wetting and bonding. Corona treatment uses a high-voltage discharge in air to oxidise the surface, adding polar groups that raise surface energy. The level is checked with dyne liquids or contact angle, and it decays with time and with additives migrating to the surface.",
    takeaways=[
        "A liquid wets a surface when the surface energy exceeds the liquid's surface tension by about 8–10 mN/m.",
        "Untreated PE and PP are around 29–31 mN/m; printing usually needs ≥ 38 and lamination/coating ≥ 40–42 mN/m (dyn/cm).",
        "Treatment dose (W·min/m²) = power ÷ (line speed × treated width).",
        "Treatment decays over days, faster with slip agents and warm storage; treat in line or re-treat before printing.",
        "Over-treatment can cause blocking, odour and weak boundary layers; more is not always better.",
    ],
    body=f'''
<h2 id="energy">1. Surface energy</h2>
{table(["Material","Typical surface energy (mN/m)"],[["PE (untreated)","29–31"],["PP / BOPP (untreated)","29–31"],["PET","42–44"],["Nylon (BOPA)","40–42"],["Aluminium foil (clean)","&gt; 50"],["Water-based inks (surface tension)","≈ 30–40"]],num_cols=(1,))}
{table(["Application","Target (mN/m) at time of use"],[["Solvent-based printing","≥ 38"],["Water-based printing","≥ 40–42"],["Adhesive lamination","≥ 40–42"],["Extrusion coating / metallising","≥ 42–46"]],num_cols=(1,))}
<h2 id="dose">2. Treatment dose and power</h2>
{formula("Dose (W·min/m²) = P (W) / [ v (m/min) · w (m) ]\nP (kW) = dose · v · w / 1000")}
<p>Typical doses: 10–20 W·min/m² for BOPP, 20–50 for PE, depending on additives and target level. Example: width {wct} m, speed {vct:.0f} m/min, dose {dose:.0f} W·min/m² → <b>{Pct:.2f} kW</b> generator output.</p>
<h2 id="testing">3. Testing and decay</h2>
<ul><li><b>Dyne pens / test inks (ASTM D2578, ISO 8296):</b> the highest liquid that stays as a continuous film for about 2 s gives the level.</li><li><b>Contact angle:</b> lower water contact angle → higher surface energy; repeatable and quantitative.</li>
<li><b>Decay:</b> measure at production and before converting; slip agents (erucamide) and antistats bloom to the surface and lower the level.</li><li><b>Back-side treatment:</b> unwanted treatment on the reverse causes blocking and set-off; check both sides.</li></ul>
''',
    calcs=[dict(id="cor", title="Corona power and dose",
                presets=[dict(label="PE 1.3 m at 150 m/min", v=dict(w=1.3, v=150, dose=30, P=6))],
                inputs=[dict(id="w", label="Treated width (m)", value=1.3), dict(id="v", label="Line speed (m/min)", value=150), dict(id="dose", label="Target dose (W·min/m²)", value=30), dict(id="P", label="Available generator power (kW)", value=6)],
                js='''var need=v.dose*v.v*v.w/1000,dd=v.P*1000/(v.v*v.w),vmax=v.P*1000/(v.dose*v.w);
return {rows:[["Power needed",fmt(need,2)+" kW"],["Dose at available power",fmt(dd,1)+" W·min/m²"],["Max speed at target dose",fmt(vmax,0)+" m/min"]],verdict:need>v.P?["bad","Generator power insufficient for this dose at this speed."]:["ok","Power sufficient."]};''')],
    quiz=[
        dict(q="Untreated PE surface energy is about:", o=["20 mN/m", "30 mN/m", "45 mN/m", "72 mN/m"], a=1, e="≈ 29–31."),
        dict(q="Corona treatment raises surface energy by:", o=["Heating", "Oxidising the surface with an electrical discharge", "Adding slip agent", "Coating with ink"], a=1, e="Polar groups formed."),
        dict(q="Dose depends on power, speed and:", o=["Colour", "Treated width", "Thickness", "Ink"], a=1, e="W·min/m²."),
        dict(q="Slip agents tend to:", o=["Raise treatment level", "Lower treatment level as they bloom", "Have no effect", "Increase surface energy"], a=1, e="Migrating amides cover the surface."),
        dict(q="Dyne pen test passes if the liquid:", o=["Beads immediately", "Stays as a continuous film about 2 s", "Evaporates", "Changes colour"], a=1, e="Wetting."),
        dict(q="Over-treatment can cause:", o=["Better adhesion always", "Blocking and weak boundary layers", "Lower dyne", "Nothing"], a=1, e="Low-molecular-weight oxidised material."),
        dict(q="Power for 25 W·min/m² at 200 m/min, 1.0 m width (kW)?", num=5, unit="kW", e="25 × 200 × 1/1000."),
        dict(q="4 kW, 100 m/min, 1.6 m width. Dose?", num=25, unit="W·min/m²", e="4000/160."),
    ],
    refs=["ASTM D2578, Wetting Tension of Polyethylene and Polypropylene Films.", "ISO 8296, Plastics — Film and sheeting — Determination of wetting tension.", "Wolf, R. A., Atmospheric Pressure Plasma for Surface Modification, Wiley-Scrivener, 2012.", "Treater manufacturers' application notes."],
    links=[("Wikipedia — Corona treatment", "https://en.wikipedia.org/wiki/Corona_treatment")],
))

# ---------------------------------------------------------------- 68 COF
ARTICLES.append(dict(
    slug="coefficient-of-friction-and-slip", group="packaging",
    title="Coefficient of Friction and Slip in Packaging Films",
    short="COF and slip", tags=["COF", "Slip", "Films", "Machinability"],
    desc="Static and kinetic coefficient of friction of films, ASTM D1894 / ISO 8295 sled tests, inclined plane method, slip and antiblock additives, migration and temperature effects, and COF targets for packaging machines.",
    blurb="Measuring film COF, what slip additives do and what COF range suits form-fill-seal machines.",
    lead="How easily film slides over itself and over machine parts decides whether a form-fill-seal machine runs smoothly. Too high a coefficient of friction (COF) and film drags, stretches or jams; too low and reels telescope, stacks slide and packs will not stay on pallets. COF is controlled with slip and antiblock additives in sealant layers and with coatings.",
    takeaways=[
        "μ = friction force ÷ normal force; static COF (start of motion) is usually higher than kinetic COF (sliding).",
        "ASTM D1894 / ISO 8295 pull a 200 g sled at 150 mm/min; incline method: μ<sub>s</sub> = tan θ at slip.",
        "Typical ranges: high slip 0.1–0.2, medium 0.2–0.35, low slip &gt; 0.4.",
        "Erucamide and oleamide slip agents migrate to the surface over hours to days; heat in sealing jaws and forming collars can change COF (hot slip).",
        "Test film-to-film and film-to-metal, at the temperature the machine runs, and after the same ageing as production rolls.",
    ],
    body=f'''
<h2 id="test">1. Measurement</h2>
{formula("μs = F_static / W      μk = F_kinetic (average) / W\nSled 200 g → W = 1.96 N\nIncline method: μs = tan θ (angle at which the sled starts to slide)")}
{fig(flow(["Film on plane","Sled 200 g|63.5 mm square","Pull at 150 mm/min","Peak force → μs","Average force → μk"], h=120), "Figure 1. Horizontal-plane COF test (ASTM D1894).")}
<h2 id="additives">2. Additives and influences</h2>
{table(["Factor","Effect on COF"],[["Erucamide / oleamide slip agents","Lower COF as they bloom (oleamide fast, erucamide slower and more heat-stable)"],["Antiblock (silica, talc)","Prevents layers sticking; small reduction in COF"],["Corona treatment","Raises COF on the treated side; slip can be lost"],["Temperature","Slip may be lost when film is hot (sealing, forming)"],["Lamination","Slip can migrate into adhesive and core layers, raising COF"],["Ageing and storage temperature","Changes bloom; test after a defined ageing"]])}
<h2 id="targets">3. Targets</h2>
{table(["Use","Typical kinetic COF"],[["Vertical form-fill-seal, film to metal","0.15–0.30"],["Horizontal flow wrap","0.20–0.35"],["Stacking bags (anti-slip)","0.4–0.6"],["Automatic bag opening","Medium, consistent"]],num_cols=(1,))}
''',
    calcs=[dict(id="cof", title="COF from test results",
                presets=[dict(label="Sled test", v=dict(m=200, Fs=0.55, Fk=0.42, ang=15))],
                inputs=[dict(id="m", label="Sled mass (g)", value=200), dict(id="Fs", label="Peak (static) force (N)", value=0.55), dict(id="Fk", label="Average sliding force (N)", value=0.42), dict(id="ang", label="Incline slip angle (°)", value=15)],
                js='''var W=v.m/1000*9.80665,s=v.Fs/W,k=v.Fk/W,t=Math.tan(v.ang*Math.PI/180);var cls=function(x){return x<0.2?"high slip":(x<0.35?"medium slip":(x<0.4?"medium–low":"low slip"));};
return {rows:[["Normal force",fmt(W,3)+" N"],["Static μs",fmt(s,3),cls(s)],["Kinetic μk",fmt(k,3),cls(k)],["Incline μs = tan θ",fmt(t,3)]]};''')],
    quiz=[
        dict(q="Static COF is usually:", o=["Lower than kinetic", "Higher than kinetic", "Equal", "Zero"], a=1, e="Breakaway needs more force."),
        dict(q="ASTM D1894 sled mass is:", o=["50 g", "200 g", "1 kg", "10 g"], a=1, e="200 g."),
        dict(q="Erucamide is a:", o=["Antiblock", "Slip agent", "Antistat", "Pigment"], a=1, e="Fatty amide slip."),
        dict(q="Film COF rising after lamination may be caused by:", o=["More slip", "Slip migrating into adhesive", "Lower temperature", "Corona decay"], a=1, e="Slip leaves the surface."),
        dict(q="Too low COF can cause:", o=["Jamming", "Stacks sliding and reels telescoping", "Poor seals", "Ink rub"], a=1, e="Too slippery."),
        dict(q="Incline method: μs equals:", o=["sin θ", "cos θ", "tan θ", "θ"], a=2, e="Balance of forces."),
        dict(q="Sliding force 0.39 N with 200 g sled. μk?", num=0.199, e="0.39/1.961."),
        dict(q="Slip angle 11.3°. μs?", num=0.1998, e="tan 11.3° = 0.200."),
    ],
    refs=["ASTM D1894, Static and Kinetic Coefficients of Friction of Plastic Film and Sheeting.", "ISO 8295, Plastics — Film and sheeting — Determination of the coefficients of friction.", "Wagner, J. R. (ed.), Multilayer Flexible Packaging, 2nd ed., Elsevier, 2016."],
    links=[("Wikipedia — Friction", "https://en.wikipedia.org/wiki/Friction")],
))

# ---------------------------------------------------------------- 69 LAMINATION
Lm, Wm = 10000.0, 1.0
sl_dry, sb_dry, sb_sol = 2.0, 3.0, 0.35
sl_kg = Lm * Wm * sl_dry / 1000
sb_wet = Lm * Wm * sb_dry / sb_sol / 1000
ARTICLES.append(dict(
    slug="adhesive-lamination", group="packaging",
    title="Adhesive Lamination: Solvent-Based, Solventless and Water-Based, Coat Weight and Curing",
    short="Lamination", tags=["Lamination", "Adhesives", "Flexible packaging", "Curing"],
    desc="Laminating flexible packaging webs: solvent-based, solventless and water-based adhesive systems, coat weight and solids, adhesive and solvent consumption, curing, bond strength, residual solvent and common defects.",
    blurb="Choosing an adhesive system, calculating coat weight and consumption, and getting full cure and bond strength.",
    lead="Most flexible packaging laminates are bonded with polyurethane adhesives applied as a thin film, typically 1.5–3.5 g/m² dry. The choice between solvent-based, solventless and water-based systems affects capital cost, energy, speed, emissions and cure time. Good lamination means the right coat weight, full cure before slitting and pouch making, and bonds strong enough for the pack's life.",
    takeaways=[
        "Coat weight is expressed dry (g/m²); wet weight = dry ÷ solids fraction.",
        "Solventless systems (100 % solids) need no dryer, run fast and emit no solvent, but have low green tack and need careful mixing and temperature control.",
        "Solvent-based adhesives give high green bond and wide compatibility, but need dryers and solvent recovery or incineration.",
        "Cure: isocyanate reaction continues for 1–7 days depending on system and temperature; slit or make pouches only after enough cure.",
        "Check bond strength (N/15 mm), residual solvent and, for food, primary aromatic amine (PAA) migration before release.",
    ],
    body=f'''
<h2 id="systems">1. Adhesive systems</h2>
{table(["System","Solids","Strengths","Limitations"],[["Solvent-based PU","25–45 % applied","High green bond, versatile, retort grades","Dryer energy, solvent emissions, residual solvent"],["Solventless PU","100 %","No solvent, fast, low energy, small footprint","Low green tack, mixing accuracy, curing time, PAA control"],["Water-based (acrylic/PU)","35–50 %","No solvent, good clarity","Drying energy, limited for retort"],["Extrusion lamination (PE melt)","—","No adhesive cure","Thicker, higher temperatures"]])}
<h2 id="consumption">2. Coat weight and consumption</h2>
{formula("Dry adhesive (kg) = area (m²) × dry coat weight (g/m²) / 1000\nWet adhesive (kg) = dry / solids fraction\nSolvent to evaporate (kg) = wet − dry")}
<p>Example: {Lm:,.0f} m × {Wm} m. Solventless at {sl_dry} g/m²: <b>{sl_kg:.0f} kg</b> adhesive. Solvent-based at {sb_dry} g/m² dry and {sb_sol*100:.0f} % solids: <b>{sb_wet:.1f} kg</b> wet, of which {sb_wet - Lm*Wm*sb_dry/1000:.1f} kg is solvent to dry off.</p>
<h2 id="cure">3. Curing and testing</h2>
<ul><li>Cure in a warm room (typically 35–45 °C) for the time the adhesive maker specifies; record roll identity and cure start time.</li><li>Bond strength (T-peel) in N/15 mm; typical targets 1.5–3 N/15 mm for general packs, higher for retort and heavy-duty.</li>
<li>Residual solvent by gas chromatography; limits often a few mg/m² for food packaging (customer and regulation specific).</li><li>PAA migration testing for solventless and PU systems used with food.</li></ul>
{table(["Defect","Likely cause"],[["Tunnelling","Tension mismatch between webs, curl, low green bond"],["Bubbles / dots","Dust, low coat weight, poor wetting, CO₂ from moisture"],["Low bond","Under-cure, low coat weight, low surface energy, slip migration"],["Odour / residual solvent","Insufficient drying, high coat weight, fast speed"]])}
''',
    calcs=[dict(id="lam2", title="Adhesive consumption and cost",
                presets=[dict(label="Solventless", v=dict(L=10000, w=1.0, gsm=2.0, sol=100, price=350)), dict(label="Solvent-based", v=dict(L=10000, w=1.0, gsm=3.0, sol=35, price=180))],
                inputs=[dict(id="L", label="Length (m)", value=10000), dict(id="w", label="Width (m)", value=1.0), dict(id="gsm", label="Dry coat weight (g/m²)", value=2.0), dict(id="sol", label="Solids at application (%)", value=100), dict(id="price", label="Adhesive price per kg as applied (₹)", value=350)],
                js='''var A=v.L*v.w,dry=A*v.gsm/1000,wet=dry/(v.sol/100);
return {rows:[["Area",fmt(A,0)+" m²"],["Dry adhesive",fmt(dry,2)+" kg"],["Wet adhesive",fmt(wet,2)+" kg"],["Solvent to evaporate",fmt(wet-dry,2)+" kg"],["Adhesive cost",fmt(wet*v.price,0)+" ₹",fmt(wet*v.price/A,3)+" ₹/m²"]]};''')],
    quiz=[
        dict(q="Solventless adhesives are applied at:", o=["25 % solids", "50 % solids", "100 % solids", "10 % solids"], a=2, e="No solvent."),
        dict(q="A key drawback of solventless lamination is:", o=["Solvent emissions", "Low green tack", "Dryer energy", "Thick coat weights"], a=1, e="Low initial bond."),
        dict(q="Wet weight equals:", o=["Dry × solids", "Dry ÷ solids fraction", "Dry + 1", "Dry"], a=1, e="Solids fraction scaling."),
        dict(q="Bond strength is usually reported in:", o=["MPa", "N/15 mm", "kg", "g/m²"], a=1, e="T-peel per width."),
        dict(q="Why wait before slitting laminated rolls?", o=["Cooling only", "Adhesive must cure", "Ink drying", "No reason"], a=1, e="Isocyanate reaction."),
        dict(q="Tunnelling is mostly due to:", o=["Tension mismatch / curl", "Too much cure", "High dyne", "Low speed"], a=0, e="Web strain differences."),
        dict(q="5,000 m² at 2.5 g/m² dry. Dry adhesive (kg)?", num=12.5, unit="kg", e="5000 × 2.5/1000."),
        dict(q="Dry 12 kg at 40 % solids. Wet (kg)?", num=30, unit="kg", e="12/0.4."),
    ],
    refs=["Wagner, J. R. (ed.), Multilayer Flexible Packaging, 2nd ed., Elsevier, 2016 (lamination chapters).", "ASTM F904, Comparison of Bond Strength or Ply Adhesion of Similar Laminates.", "EU Regulation 10/2011 on plastic materials in contact with food (migration, including PAA).", "Adhesive suppliers' technical data sheets."],
    links=[("Wikipedia — Lamination", "https://en.wikipedia.org/wiki/Lamination")],
))

# ---------------------------------------------------------------- 70 SLITTING & REWINDING
core, OD, tfilm, wsl, gsm_sl = 76.0, 600.0, 50.0, 0.5, 46.0
Lroll = math.pi * ((OD / 1000) ** 2 - (core / 1000) ** 2) / (4 * tfilm * 1e-6)
Wroll = Lroll * wsl * gsm_sl / 1000
ARTICLES.append(dict(
    slug="slitting-and-rewinding", group="packaging",
    title="Slitting and Rewinding: Roll Length, Tension, Taper and Roll Defects",
    short="Slitting and rewinding", tags=["Slitting", "Winding", "Tension", "Converting"],
    desc="Converting master rolls into customer rolls: slitting methods, roll length and weight from diameter, web tension and taper tension, winding modes and common roll defects with causes.",
    blurb="Roll length from diameter, setting tension and taper, choosing a slitting method, and diagnosing roll defects.",
    lead="Slitter-rewinders cut wide master rolls into narrow customer rolls. Roll quality depends on clean edges, the right tension, appropriate taper as the roll builds, and good lay-on pressure. Many defects that appear later on the customer's machine, such as telescoping or blocking, are created at this stage.",
    takeaways=[
        "Roll length L = π(D² − d²)/(4t); weight = length × width × grammage.",
        "Razor slitting suits thin films, shear slitting gives the best edges for most laminates, crush (score) slitting suits thick or nonwoven webs.",
        "Set tension as a small fraction (often 5–15 %) of the film's yield stress × cross-section; too high stretches or blocks, too low telescopes.",
        "Taper tension reduces winding tension as diameter grows (e.g. 20–50 % from core to full roll) to avoid crushed cores and starring.",
        "Use lay-on (nip) rolls to exclude air; centre winding for soft films, surface winding for heavy or stiff webs.",
    ],
    body=f'''
<h2 id="slitting">1. Slitting methods</h2>
{table(["Method","Best for","Notes"],[["Razor (in air or grooved roll)","Thin films, low cost","Blade wear, dust; edge quality varies"],["Shear (rotary knives, top and bottom)","Laminates, paper, foil","Best edge; set overlap, cant angle and side load"],["Crush / score","Thick films, nonwovens, tapes","Simple; edges can be crushed"]])}
<h2 id="roll">2. Roll arithmetic</h2>
{formula("L = π · (D² − d²) / (4·t)\nD = √(d² + 4·L·t/π)\nWeight = L · w · gsm / 1000      (kg, L in m, w in m)")}
<p>Example: core {core:.0f} mm, OD {OD:.0f} mm, {tfilm:.0f} µm film → <b>{Lroll:,.0f} m</b>; at {wsl} m width and {gsm_sl:.0f} g/m² the roll weighs about <b>{Wroll:.0f} kg</b>.</p>
<h2 id="tension">3. Tension and taper</h2>
{formula("Tension (N) ≈ k · σ_yield · t · w      k ≈ 0.05–0.15\nTaper:  T(D) = T0 · [1 − taper% · (D − d)/(Dmax − d)]")}
<h2 id="defects">4. Roll defects</h2>
{table(["Defect","Likely cause","Remedy"],[["Telescoping","Low tension, low COF, soft core","More tension at start, better cores, slip control"],["Starring / buckling","Too much taper or high inner tension","Adjust taper, lay-on pressure"],["Blocking","High tension, warm storage, over-treatment","Lower tension, cool before winding, antiblock"],["Gauge bands / ridges","Thickness profile variations","Oscillate, improve film profile"],["Baggy edges / camber","Uneven thickness or stretch","Fix upstream, spreader rolls"],["Dished or coned rolls","Misaligned shafts, side load on knives","Align, adjust knives"]])}
''',
    calcs=[dict(id="roll", title="Roll length, diameter, weight and tension",
                presets=[dict(label="PE 50 µm", v=dict(d=76, D=600, t=50, w=500, gsm=46, sy=12, k=8, L=0)), dict(label="Find OD for 3000 m PET 12", v=dict(d=76, D=0, t=12, w=600, gsm=16.8, sy=100, k=8, L=3000))],
                inputs=[dict(id="d", label="Core OD (mm)", value=76), dict(id="D", label="Roll OD (mm, 0 = compute from length)", value=600), dict(id="t", label="Thickness (µm)", value=50), dict(id="w", label="Width (mm)", value=500),
                        dict(id="gsm", label="Grammage (g/m²)", value=46), dict(id="sy", label="Yield stress (MPa)", value=12), dict(id="k", label="Tension fraction of yield (%)", value=8), dict(id="L", label="Required length (m)", value=0)],
                js='''var t=v.t*1e-6,d=v.d/1000,D=v.D>0?v.D/1000:Math.sqrt(d*d+4*v.L*t/Math.PI),L=Math.PI*(D*D-d*d)/(4*t),W=L*v.w/1000*v.gsm/1000,T=v.k/100*v.sy*v.t/1000*v.w;
return {rows:[["Roll OD",fmt(D*1000,0)+" mm"],["Length",fmt(L,0)+" m"],["Weight",fmt(W,1)+" kg"],["Suggested winding tension",fmt(T,0)+" N",fmt(T/v.w*10,2)+" N/cm"]]};''')],
    quiz=[
        dict(q="The best edge quality on laminates is usually from:", o=["Razor", "Shear slitting", "Crush", "Laser only"], a=1, e="Rotary shear."),
        dict(q="Roll length depends on:", o=["D² − d² and thickness", "Only D", "Only width", "Speed"], a=0, e="Area of annulus ÷ thickness."),
        dict(q="Taper tension means:", o=["Raising tension as roll grows", "Reducing tension as roll grows", "Constant", "Zero tension"], a=1, e="Prevents crushing inner wraps."),
        dict(q="Telescoping is typically caused by:", o=["Too much tension", "Too little tension or low COF", "Corona", "Thick film"], a=1, e="Layers slide."),
        dict(q="Blocking is made worse by:", o=["Cool storage", "High tension and warm storage", "Antiblock", "Low speed"], a=1, e="Layers stick."),
        dict(q="Lay-on rolls mainly:", o=["Cut film", "Exclude air from the roll", "Treat surface", "Measure thickness"], a=1, e="Prevent air entrainment."),
        dict(q="Core 76 mm, OD 400 mm, 20 µm film. Length (m)?", num=6056, unit="m", e="π(0.16 − 0.005776)/(8e-5) = 6,056 m."),
        dict(q="2000 m × 0.3 m × 40 g/m². Weight (kg)?", num=24, unit="kg", e="2000×0.3×0.04."),
    ],
    refs=["Roisum, D. R., The Mechanics of Winding, TAPPI Press, 1994.", "Roisum, D. R., The Mechanics of Slitting, TAPPI Press, 1998.", "Smith, R. D. (ed.), Roll and Web Defect Terminology, TAPPI Press."],
    links=[("Wikipedia — Slitting (metalworking)", "https://en.wikipedia.org/wiki/Slitting_(metalworking)")],
))

# ---------------------------------------------------------------- 71 POUCH FORMATS & COSTING
Wp, Hp, Gp, rate, waste, conv, zip_ = 0.16, 0.23, 0.04, 25.0, 8.0, 0.60, 0.45
area_sup = 2 * Wp * Hp + Wp * 2 * Gp
cost_p = area_sup * rate * (1 + waste / 100) + conv + zip_
fmts = '''<svg viewBox="0 0 900 230" role="img" aria-label="Pouch formats">
''' + "".join(f'<g transform="translate({x},30)"><rect x="0" y="0" width="{w}" height="{h}" rx="4" fill="var(--blue3)" stroke="var(--blue)" stroke-width="2.5"/>{extra}<text x="{w/2}" y="{h+22}" text-anchor="middle" font-size="12.5" font-weight="700">{t}</text></g>'
               for x, w, h, t, extra in [(30, 100, 140, "3-side seal", '<rect x="0" y="0" width="100" height="10" fill="var(--orange2)"/><rect x="0" y="0" width="10" height="140" fill="var(--orange2)"/><rect x="90" y="0" width="10" height="140" fill="var(--orange2)"/>'),
                                         (190, 100, 140, "centre seal (pillow)", '<rect x="45" y="0" width="10" height="140" fill="var(--orange2)"/><rect x="0" y="0" width="100" height="10" fill="var(--orange2)"/><rect x="0" y="130" width="100" height="10" fill="var(--orange2)"/>'),
                                         (350, 110, 150, "stand-up (Doypack)", '<path d="M0 150 Q55 120 110 150" fill="none" stroke="var(--orange)" stroke-width="3"/><rect x="0" y="20" width="110" height="6" fill="var(--purple)"/>'),
                                         (520, 110, 150, "side gusset", '<line x1="18" y1="0" x2="18" y2="150" stroke="var(--orange)" stroke-width="3" stroke-dasharray="6 4"/><line x1="92" y1="0" x2="92" y2="150" stroke="var(--orange)" stroke-width="3" stroke-dasharray="6 4"/>'),
                                         (690, 120, 150, "flat bottom (box)", '<rect x="0" y="130" width="120" height="20" fill="var(--orange2)"/><line x1="20" y1="0" x2="20" y2="130" stroke="var(--orange)" stroke-width="2" stroke-dasharray="6 4"/><line x1="100" y1="0" x2="100" y2="130" stroke="var(--orange)" stroke-width="2" stroke-dasharray="6 4"/>')]) + "</svg>"
ARTICLES.append(dict(
    slug="pouch-formats-and-costing", group="packaging",
    title="Pouch Formats and Costing: Film Area, Wastage, Conversion and Accessories",
    short="Pouch costing", tags=["Pouches", "Costing", "Bag making", "Flexible packaging"],
    desc="Common flexible pouch formats (three-side seal, centre seal, stand-up, gusseted, flat-bottom), film area per pouch, laminate cost per square metre, wastage, conversion cost and accessories such as zippers and spouts, with a pouch cost calculator.",
    blurb="Working out film area and cost for a pouch format, including wastage, conversion and zippers.",
    lead="A pouch price is mostly material: the area of laminate it consumes multiplied by the laminate's cost per square metre, plus wastage. Conversion (bag making), accessories (zippers, spouts, valves) and margins add the rest. Quick, consistent area formulas per format make quotations fast and comparable.",
    takeaways=[
        "Film area per pouch depends on format: front + back panels plus gussets, seals and trims.",
        "Laminate cost per m² = Σ layer grammage × price per kg ÷ 1,000 (see laminate builder article).",
        "Wastage (start-up, trims, print waste) is typically 5–15 %; short runs carry more.",
        "Stand-up and flat-bottom pouches cost more to make (slower machines) and often carry zippers or spouts.",
        "Quote per thousand pouches and state dimensions as width × height (+ gusset) consistently.",
    ],
    body=f'''
<h2 id="formats">1. Formats</h2>
{fig(fmts, "Figure 1. Common pouch formats (seals shown in orange, zipper in purple).")}
{table(["Format","Approximate film area per pouch"],[["Three-side seal","2·W·H (+ trims)"],["Centre seal (pillow)","(2·W + 2·fin)·H"],["Stand-up with bottom gusset G","2·W·H + W·2G"],["Side gusset (each side G)","2·(W + 2G)·H"],["Flat bottom","2·(W + 2G)·H + bottom panel"]])}
<h2 id="cost">2. Cost build-up</h2>
{formula("Material = area × laminate cost per m² × (1 + wastage)\nPouch cost = material + conversion + accessories\nPrice = cost × (1 + overhead) × (1 + margin)")}
<h2 id="example">3. Worked example</h2>
<p>Stand-up pouch {Wp*1000:.0f} × {Hp*1000:.0f} mm with {Gp*1000:.0f} mm bottom gusset (80 mm folded), laminate ₹{rate:.0f}/m², {waste:.0f} % wastage, conversion ₹{conv:.2f}, zipper ₹{zip_:.2f} (example rates).</p>
{table(["Item","Value"],[["Film area",f"{area_sup*1e4:.0f} cm² ({area_sup:.4f} m²)"],["Material incl. wastage",f"₹{area_sup*rate*(1+waste/100):.2f}"],["Conversion + zipper",f"₹{conv+zip_:.2f}"],["Cost per pouch",f"<b>₹{cost_p:.2f}</b> (₹{cost_p*1000:,.0f} per thousand)"]],num_cols=(1,))}
''',
    calcs=[dict(id="pch", title="Pouch cost calculator",
                presets=[dict(label="Stand-up 160×230+40", v=dict(fmt="sup", W=160, H=230, G=40, fin=10, rate=25, waste=8, conv=0.6, acc=0.45, ovh=10, mar=15)), dict(label="Pillow 120×180", v=dict(fmt="cs", W=120, H=180, G=0, fin=10, rate=14, waste=6, conv=0.15, acc=0, ovh=10, mar=12))],
                inputs=[dict(id="fmt", label="Format", value="sup", options=[("3ss", "Three-side seal"), ("cs", "Centre seal (pillow)"), ("sup", "Stand-up (bottom gusset)"), ("sg", "Side gusset"), ("fb", "Flat bottom")]),
                        dict(id="W", label="Width W (mm)", value=160), dict(id="H", label="Height H (mm)", value=230), dict(id="G", label="Gusset G (mm)", value=40), dict(id="fin", label="Fin seal width (mm)", value=10),
                        dict(id="rate", label="Laminate cost (₹/m²)", value=25), dict(id="waste", label="Wastage (%)", value=8), dict(id="conv", label="Conversion per pouch (₹)", value=0.6), dict(id="acc", label="Accessories per pouch (₹)", value=0.45),
                        dict(id="ovh", label="Overheads (%)", value=10), dict(id="mar", label="Margin (%)", value=15)],
                js='''var W=v.W/1000,H=v.H/1000,G=v.G/1000,f=v.fin/1000,A={"3ss":2*W*H,"cs":(2*W+2*f)*H,"sup":2*W*H+W*2*G,"sg":2*(W+2*G)*H,"fb":2*(W+2*G)*H+(W*2*G)}[v.fmt];
var mat=A*v.rate*(1+v.waste/100),cost=mat+v.conv+v.acc,price=cost*(1+v.ovh/100)*(1+v.mar/100);
return {rows:[["Film area",fmt(A*1e4,1)+" cm²"],["Material",fmt(mat,3)+" ₹"],["Cost per pouch",fmt(cost,3)+" ₹"],["Price per pouch",fmt(price,3)+" ₹"],["Price per 1000",fmt(price*1000,0)+" ₹"],["Pouches per kg of laminate (at 100 g/m²)",fmt(1/(A*0.1*(1+v.waste/100)),0)]]};''')],
    quiz=[
        dict(q="The largest part of a pouch's cost is usually:", o=["Conversion", "Material (laminate)", "Zipper", "Freight"], a=1, e="Film area × cost per m²."),
        dict(q="Film area of a three-side seal pouch W × H is about:", o=["W·H", "2·W·H", "4·W·H", "W + H"], a=1, e="Front and back."),
        dict(q="A Doypack is a:", o=["Pillow pouch", "Stand-up pouch with bottom gusset", "Side-gusset bag", "Sachet"], a=1, e="Stand-up."),
        dict(q="Short runs usually have:", o=["Lower wastage %", "Higher wastage %", "No wastage", "Same as long runs"], a=1, e="Fixed start-up waste."),
        dict(q="Centre-seal pouches are typically made on:", o=["Three-side seal machines", "Form-fill-seal / flow wrap", "Spout fitters", "Slitters"], a=1, e="Pillow packs."),
        dict(q="Prices are often quoted per:", o=["Kilogram only", "Thousand pouches", "Metre", "Roll"], a=1, e="Per 1000."),
        dict(q="3SS pouch 100 × 150 mm. Film area (cm²)?", num=300, unit="cm²", e="2 × 10 × 15."),
        dict(q="Area 0.05 m², ₹20/m², 10 % wastage. Material cost (₹)?", num=1.1, unit="₹", e="0.05×20×1.1."),
    ],
    refs=["Soroka, W., Fundamentals of Packaging Technology, 5th ed., IoPP.", "Wagner, J. R. (ed.), Multilayer Flexible Packaging, 2nd ed., Elsevier, 2016.", "Pouch machine makers' format guides."],
    links=[("Wikipedia — Stand-up pouch", "https://en.wikipedia.org/wiki/Stand-up_pouch")],
))
