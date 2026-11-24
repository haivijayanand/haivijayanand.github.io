"""
TOOL:    Vijay_Wiki articles — group 6 (facilities, utilities and power)
FAMILY:  vijay-wiki
VERSION: 1.0.0
DATE:    2026-11-24
CHAT:    claude.ai — Vijay_Wiki: build all suggested topics in groups and upload
CHANGES: 1.0.0 Initial six articles: cooling towers, compressed air, water treatment, electrical load, data-centre PUE, grid frequency
"""
import math
import numpy as np
from wiki import plot, flow, bars, fig, table, box, formula

ARTICLES = []

# =====================================================================================
# 34. COOLING TOWERS
# =====================================================================================
Qct, Rng, Thot, Twb, COC = 100.0, 5.0, 37.0, 27.0, 4.0
Tcold = Thot - Rng
App = Tcold - Twb
eff = Rng / (Rng + App)
heat = Qct * 1000 / 3600 * 4.186 * Rng
E = 0.00153 * Qct * Rng
Bd = E / (COC - 1)
M = E + Bd
ctplot = plot([dict(pts=[(wb, wb + a) for wb in range(18, 31)], label=f"approach {a} K", at=29 - i) for i, a in enumerate([3, 5, 7])],
              "wet-bulb temperature (°C)", "cold water temperature (°C)", xlim=(18, 30), ylim=(18, 38), h=300)

ARTICLES.append(dict(
    slug="cooling-towers", group="facilities",
    title="Cooling Towers: Range, Approach, Heat Load, Evaporation and Blowdown",
    short="Cooling towers",
    tags=["Cooling tower", "Utilities", "Water", "HVAC"],
    desc="Wet cooling tower basics: range, approach and wet-bulb temperature, effectiveness, heat load and tonnage, evaporation, cycles of concentration, blowdown and make-up water.",
    blurb="Range, approach and wet bulb, sizing heat load, and calculating evaporation, blowdown and make-up water.",
    lead="A wet cooling tower cools water mainly by evaporating a small part of it into the air. It can never cool water below the air's wet-bulb temperature, so the local climate sets what is achievable. Water lost by evaporation leaves its dissolved solids behind, which is why towers need blowdown and treated make-up water.",
    takeaways=[
        "Range = hot water − cold water temperature; approach = cold water − wet-bulb temperature.",
        "Heat rejected Q = ṁ·c·range: 100 m³/h through a 5 K range rejects about 580 kW.",
        "Smaller approach needs a much larger tower; 3–5 K is a common design point.",
        "Evaporation ≈ 0.00153 × flow × range (m³/h, flow in m³/h, range in K), roughly 1 % of flow per 6.5 K of range.",
        "Blowdown = evaporation/(COC − 1); make-up = evaporation + blowdown + drift. Higher cycles save water but need better treatment.",
    ],
    body=f'''
<h2 id="terms">1. Range, approach and wet bulb</h2>
{fig(flow(["Hot water in|from process","Tower fill|water film, air contact","Evaporation|latent heat","Basin|cold water","Pump|back to process"], h=130), "Figure 1. Water path in a wet cooling tower. Fans (induced or forced draft) move air through the fill.")}
{formula("Range = T_hot − T_cold\nApproach = T_cold − T_wetbulb\nEffectiveness = Range / (Range + Approach)\nHeat Q [kW] = flow [m³/h] × 1000/3600 × 4.186 × Range\n1 TR (refrigeration) = 3.517 kW; 1 cooling-tower ton ≈ 4.4 kW (includes compressor heat)")}
{fig(ctplot, "Figure 2. Cold water temperature achievable for different approaches as wet bulb changes. Design for the local summer design wet bulb (often 27–29 °C in coastal tropical sites).")}

<h2 id="water">2. Water balance</h2>
{formula("Evaporation E ≈ 0.00153 · Q · Range          (m³/h)\nCycles of concentration COC = TDS_basin / TDS_makeup  (typically 3–6)\nBlowdown B = E / (COC − 1)\nMake-up M = E + B + drift   (drift ≈ 0.001–0.02 % of flow for modern eliminators)")}
{table(["Problem","Cause","Control"],[["Scale","Calcium carbonate, silica at high COC","Limit COC, antiscalants, softened make-up"],["Corrosion","Low pH, oxygen, chlorides","Inhibitors, pH control"],["Biofouling / Legionella","Warm water, nutrients","Biocides, cleaning, drift eliminators"],["Fouling of fill","Suspended solids","Side-stream filtration"]])}

<h2 id="example">3. Worked example</h2>
<p>Flow {Qct:.0f} m³/h, hot {Thot:.0f} °C, cold {Tcold:.0f} °C, wet bulb {Twb:.0f} °C, COC {COC:.0f}.</p>
{table(["Quantity","Value"],[["Range / approach",f"{Rng:.0f} K / {App:.0f} K"],["Effectiveness",f"{eff*100:.0f} %"],["Heat load",f"<b>{heat:.0f} kW</b> ({heat/3.517:.0f} TR)"],["Evaporation",f"{E:.3f} m³/h"],["Blowdown",f"{Bd:.3f} m³/h"],["Make-up",f"<b>{M:.2f} m³/h</b> ≈ {M*24:.0f} m³/day"]],num_cols=(1,))}
''',
    calcs=[dict(id="ct", title="Cooling tower heat and water balance",
                presets=[dict(label="Worked example", v=dict(Q=100, Th=37, Tc=32, Twb=27, coc=4, drift=0.005))],
                inputs=[dict(id="Q", label="Circulation (m³/h)", value=100), dict(id="Th", label="Hot water (°C)", value=37), dict(id="Tc", label="Cold water (°C)", value=32), dict(id="Twb", label="Wet bulb (°C)", value=27),
                        dict(id="coc", label="Cycles of concentration", value=4), dict(id="drift", label="Drift (% of flow)", value=0.005)],
                js='''var R=v.Th-v.Tc,A=v.Tc-v.Twb,q=v.Q*1000/3600*4.186*R,E=0.00153*v.Q*R,B=E/(v.coc-1),D=v.Q*v.drift/100,M=E+B+D;
return {rows:[["Range / approach",fmt(R,1)+" / "+fmt(A,1)+" K"],["Effectiveness",fmt(R/(R+A)*100,1)+" %"],["Heat rejected",fmt(q,0)+" kW",fmt(q/3.517,0)+" TR"],["Evaporation",fmt(E,3)+" m³/h"],["Blowdown",fmt(B,3)+" m³/h"],["Make-up",fmt(M,3)+" m³/h",fmt(M*24,1)+" m³/day"]],
verdict:A<2.5?["caution","Approach below 2.5 K needs a very large tower."]:(v.coc<2?["caution","Low cycles waste water."]:["ok","Typical design values."])};''')],
    quiz=[
        dict(q="Approach is:", o=["Hot − cold water", "Cold water − wet bulb", "Hot water − wet bulb", "Dry bulb − wet bulb"], a=1, e="Approach = T_cold − T_wb."),
        dict(q="A wet tower can never cool water below the:", o=["Dry-bulb temperature", "Wet-bulb temperature", "Dew point", "0 °C"], a=1, e="Wet bulb is the theoretical limit."),
        dict(q="Increasing cycles of concentration:", o=["Increases blowdown", "Reduces blowdown and make-up but raises scaling risk", "Has no effect", "Increases evaporation"], a=1, e="B = E/(COC − 1)."),
        dict(q="1 TR of refrigeration is about:", o=["1 kW", "3.517 kW", "12 kW", "0.75 kW"], a=1, e="12,000 BTU/h = 3.517 kW."),
        dict(q="Drift is:", o=["Evaporated water", "Water droplets carried out with the air", "Blowdown", "Leakage"], a=1, e="Liquid droplets; controlled by eliminators."),
        dict(q="Legionella risk is controlled by:", o=["Higher COC", "Biocides, cleaning and drift eliminators", "Lower fan speed", "Nothing"], a=1, e="Warm water and aerosols require control."),
        dict(q="200 m³/h with 6 K range. Heat load in kW?", num=1395, unit="kW", e="200 × 1000/3600 × 4.186 × 6 = 1,395 kW."),
        dict(q="Evaporation 1.2 m³/h at COC 5. Blowdown in m³/h?", num=0.3, unit="m³/h", e="1.2/(5−1) = 0.3."),
    ],
    refs=["CTI ATC-105, Acceptance Test Code for Water Cooling Towers, Cooling Technology Institute.", "ASHRAE Handbook — HVAC Systems and Equipment, Chapter on Cooling Towers.", "Bureau of Energy Efficiency (India), Energy Efficiency in Electrical Utilities, Cooling Towers chapter.", "Hensley, J. C. (ed.), Cooling Tower Fundamentals, SPX Cooling Technologies."],
    links=[("Wikipedia — Cooling tower", "https://en.wikipedia.org/wiki/Cooling_tower")],
))

# =====================================================================================
# 35. COMPRESSED AIR
# =====================================================================================
def leak_Ls(dmm, pbar_g, Cd=0.65, T=293.0):
    A = math.pi / 4 * (dmm / 1000) ** 2
    p0 = (pbar_g + 1.013) * 1e5
    flux = p0 * math.sqrt(1.4 / (287 * T)) * (2 / 2.4) ** 3
    return Cd * A * flux / 1.2 * 1000
SP = 6.5  # kW per m3/min FAD
leak_rows = []
for dh in [1, 2, 3, 5, 10]:
    q = leak_Ls(dh, 7)
    kw = q * 60 / 1000 * SP
    leak_rows.append([f"{dh} mm", f"{q:.1f}", f"{kw:.1f}", f"{kw*8000*8/1e5:.2f}"])
Vrec = 10 * 60 * 1.013 / (7.5 - 6.5) / 60  # placeholder replaced below
Qd, tdur, p1, p2 = 3.0, 20.0, 7.5, 6.5
Vrec = Qd * tdur / 60 * 1.013 / (p1 - p2)
leakplot = bars([(f"{dh} mm", round(leak_Ls(dh, 7) * 60 / 1000 * SP, 1)) for dh in [1, 2, 3, 5, 10]], "power wasted (kW) at 7 bar(g)", h=280)

ARTICLES.append(dict(
    slug="compressed-air-systems", group="facilities",
    title="Compressed Air Systems: Demand, Specific Power, Leaks, Receivers and Air Quality",
    short="Compressed air",
    tags=["Compressed air", "Energy", "Utilities", "Leaks"],
    desc="Compressed air system basics: free air delivery, specific power, cost of leaks from orifice flow, pressure reduction savings, receiver sizing, dryers and ISO 8573-1 air quality classes.",
    blurb="What compressed air really costs, how much a leak wastes, how big the receiver should be, and how to specify air quality.",
    lead="Compressed air is one of the most expensive utilities in a plant: only about 10–15 % of the electrical energy reaches the point of use as useful work. Leaks, excessive pressure and poor control often waste a third of the compressor's output. Simple calculations make these losses visible and justify the fixes.",
    takeaways=[
        "Specific power of a good screw compressor at 7 bar(g) is about 6–7 kW per m³/min of free air delivery (FAD).",
        "A 3 mm leak at 7 bar wastes roughly 3 kW continuously: lakhs of rupees per year across a plant.",
        "Every 1 bar reduction in generation pressure saves about 6–8 % of compressor energy.",
        "Receiver volume V = Q·t·p<sub>atm</sub>/(p₁ − p₂) buffers peaks and reduces cycling.",
        "Specify air quality by ISO 8573-1 classes for particles, water (pressure dew point) and oil.",
    ],
    body=f'''
<h2 id="basics">1. Demand and energy</h2>
{formula("FAD = volume flow referred to inlet (atmospheric) conditions\nSpecific power SP = compressor input kW / FAD (m³/min)\nEnergy cost/year = kW × hours × tariff")}
{table(["Compressor type","Typical SP at 7 bar(g) (kW per m³/min)","Notes"],[["Oil-injected screw, fixed speed","6.0–7.0","Good at full load; poor unloaded"],["Oil-injected screw, variable speed","6.0–7.5","Best for variable demand"],["Oil-free screw","6.5–8.0","For oil-free air"],["Reciprocating","6.5–8.5","Small flows, high pressure"],["Centrifugal","5.5–6.5","Large flows, steady demand"]])}

<h2 id="leaks">2. Leaks</h2>
{formula("Choked flow through a hole: ṁ = Cd · A · p0 · √(γ/(R·T)) · (2/(γ+1))^((γ+1)/(2(γ−1)))\nγ = 1.4, R = 287 J/kg·K, Cd ≈ 0.6–0.7;   FAD = ṁ / ρ_atm")}
{table(["Hole diameter","Leak FAD (L/s)","Power wasted (kW)","Cost per year (₹ lakh, 8,000 h at ₹8/kWh)"], leak_rows, num_cols=(1,2,3))}
{fig(leakplot, "Figure 1. Compressor power wasted by single leaks at 7 bar(g), using SP = 6.5 kW per m³/min. Leak flow scales with hole area.")}
<p>Measure total leakage by running the system with no production and timing the compressor's load/unload cycles: leakage % = load time ÷ (load + unload time).</p>

<h2 id="receiver">3. Receivers and pressure</h2>
{formula("V [m³] = Q [m³/min FAD] · t [min] · p_atm / (p1 − p2)       (pressures absolute or gauge difference in bar)")}
<p>Example: supply a peak of {Qd:.0f} m³/min for {tdur:.0f} s while pressure falls from {p1} to {p2} bar → V ≈ {Vrec:.2f} m³ ({Vrec*1000:.0f} L).</p>

<h2 id="quality">4. Air quality (ISO 8573-1)</h2>
{table(["Class","Particles (per m³, 0.1–0.5 µm)","Pressure dew point","Oil (mg/m³)"],[["1","≤ 20,000","≤ −70 °C","≤ 0.01"],["2","≤ 400,000","≤ −40 °C","≤ 0.1"],["3","—","≤ −20 °C","≤ 1"],["4","—","≤ +3 °C","≤ 5"],["5","—","≤ +7 °C","—"]])}
<p>Refrigerated dryers reach about +3 °C pressure dew point (class 4); desiccant dryers reach −40 °C (class 2) or −70 °C (class 1) but consume 15–20 % of the air for purge unless heat-regenerated.</p>
''',
    calcs=[dict(id="air", title="Leak cost, pressure saving and receiver size",
                presets=[dict(label="Ten 3 mm leaks", v=dict(d=3, n=10, p=7, sp=6.5, h=8000, tar=8, dp=1, kw=75, Q=3, t=20, p1=7.5, p2=6.5))],
                inputs=[dict(id="d", label="Leak hole diameter (mm)", value=3), dict(id="n", label="Number of such leaks", value=10), dict(id="p", label="Pressure (bar g)", value=7), dict(id="sp", label="Specific power (kW per m³/min)", value=6.5),
                        dict(id="h", label="Hours per year", value=8000), dict(id="tar", label="Tariff (₹/kWh)", value=8), dict(id="dp", label="Proposed pressure reduction (bar)", value=1), dict(id="kw", label="Compressor average kW", value=75),
                        dict(id="Q", label="Peak demand (m³/min)", value=3), dict(id="t", label="Peak duration (s)", value=20), dict(id="p1", label="Start pressure (bar g)", value=7.5), dict(id="p2", label="Minimum pressure (bar g)", value=6.5)],
                js='''var A=Math.PI/4*Math.pow(v.d/1000,2),p0=(v.p+1.013)*1e5,flux=p0*Math.sqrt(1.4/(287*293))*Math.pow(2/2.4,3),q=0.65*A*flux/1.2*1000*v.n,kw=q*60/1000*v.sp,cost=kw*v.h*v.tar;
var save=v.kw*0.07*v.dp*v.h*v.tar,V=v.Q*v.t/60*1.013/(v.p1-v.p2);
return {rows:[["Leak flow (total)",fmt(q,1)+" L/s",fmt(q*60/1000,2)+" m³/min FAD"],["Power wasted",fmt(kw,1)+" kW"],["Leak cost per year","₹ "+fmt(cost,0)],["Saving from pressure cut","₹ "+fmt(save,0)+" /yr","≈ 7 % per bar"],["Receiver volume",fmt(V,2)+" m³",fmt(V*1000,0)+" L"]]};''')],
    quiz=[
        dict(q="FAD refers to flow at:", o=["Discharge pressure", "Inlet (atmospheric) conditions", "Dew point", "Receiver conditions"], a=1, e="Free air delivery."),
        dict(q="Approximate energy saving per 1 bar pressure reduction:", o=["1 %", "6–8 %", "25 %", "50 %"], a=1, e="Rule of thumb ≈ 7 % per bar."),
        dict(q="Leak flow through a hole scales with:", o=["Diameter", "Hole area (diameter²)", "Diameter³", "Not with size"], a=1, e="Area × pressure."),
        dict(q="A refrigerated dryer typically achieves a pressure dew point of:", o=["−70 °C", "−40 °C", "+3 °C", "+20 °C"], a=2, e="≈ +3 °C (ISO class 4)."),
        dict(q="Why add a receiver?", o=["Increase pressure", "Buffer peaks and reduce compressor cycling", "Dry the air", "Cool the air"], a=1, e="Storage volume."),
        dict(q="Variable-speed compressors save most when demand is:", o=["Constant at full load", "Variable", "Zero", "Very high"], a=1, e="They avoid unloaded running."),
        dict(q="Compressor 45 kW, 6,000 h/yr, ₹8/kWh. Annual energy cost (₹)?", num=2160000, unit="₹", e="45 × 6000 × 8 = ₹21.6 lakh."),
        dict(q="Peak 2 m³/min for 30 s, allowable drop 0.5 bar. Receiver volume (m³, p_atm = 1)?", num=2.0, unit="m³", e="2 × 0.5 min × 1/0.5 = 2 m³."),
    ],
    refs=["ISO 8573-1:2010, Compressed air — Contaminants and purity classes.", "ISO 1217, Displacement compressors — Acceptance tests.", "Bureau of Energy Efficiency (India), Energy Efficiency in Electrical Utilities — Compressed Air System.", "US DOE, Improving Compressed Air System Performance: A Sourcebook for Industry."],
    links=[("Wikipedia — Compressed air", "https://en.wikipedia.org/wiki/Compressed_air")],
))

# =====================================================================================
# 36. WATER TREATMENT
# =====================================================================================
Cf, rec, rej = 1200.0, 0.75, 0.97
Cp = Cf * (1 - rej)
Cc = (Cf - rec * Cp) / (1 - rec)
fsoft, hard, hrs, cap = 2.0, 300.0, 8.0, 50.0
load_g = fsoft * hrs * hard
resin = load_g / cap
ARTICLES.append(dict(
    slug="industrial-water-treatment", group="facilities",
    title="Industrial Water Treatment: TDS, Hardness, Softening and Reverse Osmosis",
    short="Water treatment",
    tags=["Water treatment", "RO", "Softener", "Utilities"],
    desc="Water quality terms (TDS, conductivity, hardness, pH, SDI), a typical treatment plant train, ion-exchange softener sizing, and reverse osmosis recovery, rejection and concentrate calculations.",
    blurb="Water quality terms and the arithmetic of softeners and RO plants: recovery, rejection, concentrate and resin sizing.",
    lead="Boilers, cooling towers, test rigs and drinking supplies all need water of a defined quality. Raw borewell or municipal water is usually too hard or too salty, so it passes through a treatment train: filtration, softening, and often reverse osmosis. A few balance equations size each stage and predict the reject streams.",
    takeaways=[
        "TDS (mg/L) ≈ 0.55–0.70 × conductivity (µS/cm) for natural waters.",
        "Hardness (calcium + magnesium) is expressed as mg/L CaCO₃; above about 150 mg/L water is considered hard.",
        "Softeners exchange Ca/Mg for Na; resin capacity is roughly 40–60 g CaCO₃ per litre of resin per regeneration.",
        "RO: recovery = permeate/feed (50–85 %); rejection = 1 − C<sub>permeate</sub>/C<sub>feed</sub> (95–99 %).",
        "Concentrate TDS ≈ (C<sub>f</sub> − r·C<sub>p</sub>)/(1 − r): at 75 % recovery the reject is about four times as salty as the feed.",
    ],
    body=f'''
<h2 id="quality">1. Water quality terms</h2>
{table(["Parameter","Meaning","Typical limits"],[["TDS","Total dissolved solids (mg/L)","Drinking (IS 10500): 500 acceptable, 2,000 permissible; boilers: much lower"],["Conductivity","µS/cm; quick TDS proxy","RO permeate often &lt; 50 µS/cm"],
["Total hardness","Ca + Mg as CaCO₃ (mg/L)","Drinking: 200 acceptable, 600 permissible; cooling make-up often softened"],["pH","Acidity","6.5–8.5 typical"],["SDI","Silt density index (fouling potential)","&lt; 3–5 for RO feed"],["Free chlorine","Disinfectant; damages RO membranes","&lt; 0.1 mg/L at RO inlet"]])}

<h2 id="train">2. A typical treatment train</h2>
{fig(flow(["Raw water|borewell / municipal","Pressure sand filter|turbidity","Activated carbon|chlorine, organics","Softener|hardness","Cartridge filter|5 µm","RO|dissolved salts","Product tank|UV / dosing"], h=130), "Figure 1. Typical industrial water treatment train. Softening before RO is optional; antiscalant dosing is the common alternative.")}

<h2 id="softener">3. Softener sizing</h2>
{formula("Hardness load per cycle (g CaCO₃) = flow (m³/h) × hours × hardness (mg/L)\nResin volume (L) = load / capacity (g CaCO₃ per L resin)\nSalt per regeneration ≈ 100–200 g NaCl per L resin")}
<p>Example: {fsoft:.0f} m³/h for {hrs:.0f} h at {hard:.0f} mg/L hardness = {load_g/1000:.1f} kg CaCO₃ per cycle → resin ≈ <b>{resin:.0f} L</b> at {cap:.0f} g/L.</p>

<h2 id="ro">4. Reverse osmosis</h2>
{formula("Recovery r = Qp / Qf\nRejection R = 1 − Cp / Cf\nConcentrate Cc = (Cf − r·Cp) / (1 − r)\nOsmotic pressure ≈ 0.7 bar per 1,000 mg/L TDS (approx., brackish water)")}
{table(["Quantity","Value"],[["Feed TDS",f"{Cf:.0f} mg/L"],["Recovery / rejection",f"{rec*100:.0f} % / {rej*100:.0f} %"],["Permeate TDS",f"<b>{Cp:.0f} mg/L</b>"],["Concentrate TDS",f"<b>{Cc:.0f} mg/L</b>"]],num_cols=(1,))}
<p>Higher recovery saves water but concentrates scale-forming salts (CaCO₃, CaSO₄, silica) in the last membranes; antiscalant dosing and limits on recovery protect the membranes. Reject disposal must meet local discharge rules.</p>
''',
    calcs=[dict(id="ro", title="RO mass balance and softener sizing",
                presets=[dict(label="Worked example", v=dict(Qf=4, Cf=1200, r=75, R=97, fs=2, H=300, h=8, cap=50))],
                inputs=[dict(id="Qf", label="RO feed flow (m³/h)", value=4), dict(id="Cf", label="Feed TDS (mg/L)", value=1200), dict(id="r", label="Recovery (%)", value=75), dict(id="R", label="Rejection (%)", value=97),
                        dict(id="fs", label="Softener flow (m³/h)", value=2), dict(id="H", label="Hardness (mg/L as CaCO₃)", value=300), dict(id="h", label="Hours between regenerations", value=8), dict(id="cap", label="Resin capacity (g/L)", value=50)],
                js='''var r=v.r/100,Cp=v.Cf*(1-v.R/100),Cc=(v.Cf-r*Cp)/(1-r),Qp=v.Qf*r,Qc=v.Qf-Qp,load=v.fs*v.h*v.H,res=load/v.cap;
return {rows:[["Permeate",fmt(Qp,2)+" m³/h",fmt(Cp,0)+" mg/L"],["Concentrate (reject)",fmt(Qc,2)+" m³/h",fmt(Cc,0)+" mg/L"],["Concentration factor",fmt(Cc/v.Cf,2)+" ×"],["Approx. osmotic pressure of reject",fmt(Cc/1000*0.7,1)+" bar"],["Softener hardness load",fmt(load/1000,2)+" kg CaCO₃"],["Resin volume",fmt(res,0)+" L","salt ≈ "+fmt(res*0.15,1)+" kg/regeneration"]],
verdict:r>0.85?["caution","Recovery above 85 %: high scaling risk without careful antiscalant design."]:["ok","Recovery in the usual range."]};''')],
    quiz=[
        dict(q="Hardness is mainly due to:", o=["Sodium and chloride", "Calcium and magnesium", "Iron only", "Silica"], a=1, e="Ca and Mg ions."),
        dict(q="A softener replaces Ca/Mg with:", o=["Hydrogen", "Sodium", "Chloride", "Nothing"], a=1, e="Sodium-cycle ion exchange."),
        dict(q="RO recovery is:", o=["Permeate/feed", "Reject/feed", "Cp/Cf", "1 − rejection"], a=0, e="Fraction of feed that becomes product."),
        dict(q="Free chlorine must be removed before RO because it:", o=["Increases TDS", "Damages polyamide membranes", "Causes scaling", "Lowers pH"], a=1, e="Oxidises the membrane."),
        dict(q="Higher RO recovery mainly increases:", o=["Product TDS only", "Scaling risk in the concentrate", "Membrane life", "Feed flow"], a=1, e="Salts concentrate."),
        dict(q="SDI measures:", o=["Hardness", "Fouling potential from suspended particles", "Salt content", "Bacteria"], a=1, e="Silt density index."),
        dict(q="Conductivity 1500 µS/cm, factor 0.65. TDS (mg/L)?", num=975, unit="mg/L", e="1500 × 0.65 = 975 mg/L."),
        dict(q="Feed 1000 mg/L, recovery 80 %, permeate 20 mg/L. Concentrate TDS?", num=4920, unit="mg/L", e="(1000 − 0.8×20)/0.2 = 4,920 mg/L."),
    ],
    refs=["IS 10500:2012, Drinking Water — Specification, Bureau of Indian Standards.", "Kucera, J., Reverse Osmosis: Industrial Processes and Applications, 2nd ed., Wiley, 2015.", "Dow / DuPont FilmTec Reverse Osmosis Membranes Technical Manual.", "Kemmer, F. N. (ed.), The NALCO Water Handbook, McGraw-Hill."],
    links=[("Wikipedia — Reverse osmosis", "https://en.wikipedia.org/wiki/Reverse_osmosis"), ("Wikipedia — Water softening", "https://en.wikipedia.org/wiki/Water_softening")],
))

# =====================================================================================
# 37. ELECTRICAL LOAD ESTIMATION
# =====================================================================================
loads = [("Test rig drive", 370, 0.9, 0.8), ("Lube and cooling pumps", 45, 0.85, 0.9), ("Compressors", 75, 0.88, 0.7), ("HVAC", 60, 0.85, 0.8), ("Lighting and sockets", 40, 0.95, 0.6), ("Cranes and workshop", 50, 0.8, 0.3)]
kw_dem = sum(k * df for _, k, pf_, df in loads)
kva_dem = sum(k * df / pf_ for _, k, pf_, df in loads)
I_dem = kva_dem * 1000 / (math.sqrt(3) * 415)
tr_kva = kva_dem * 1.25
amp = [(2.5, 25), (4, 32), (6, 41), (10, 57), (16, 76), (25, 101), (35, 125), (50, 151), (70, 192), (95, 232), (120, 269), (150, 309), (185, 353), (240, 415), (300, 473)]
Ic, Lc_, pfc = 150.0, 80.0, 0.85
size = next(a for a, i in amp if i >= Ic)
Rk = 22.5 / size
Vd = math.sqrt(3) * Ic * Lc_ / 1000 * (Rk * pfc + 0.08 * math.sin(math.acos(pfc)))
ARTICLES.append(dict(
    slug="electrical-load-estimation-and-cable-sizing", group="facilities",
    title="Electrical Load Estimation: Demand, kVA, Transformer and Cable Sizing",
    short="Electrical load",
    tags=["Electrical", "Load estimation", "Cables", "Transformers"],
    desc="Estimating plant electrical demand: connected load, demand and diversity factors, kW to kVA, line current, transformer sizing, motor starting, cable ampacity and voltage drop.",
    blurb="From a list of loads to demand kVA, transformer size, feeder current, cable size and voltage drop.",
    lead="Every facility plan needs an electrical load estimate early, to size the transformer, the incoming supply, cables and backup generation. The connected load (everything that could run) is always larger than the maximum demand (what actually runs together), and the gap is captured by demand and diversity factors.",
    takeaways=[
        "Maximum demand = Σ (connected kW × demand factor); further diversity between groups reduces it again.",
        "kVA = kW / power factor; line current I = kVA × 1000/(√3 × V). At 415 V, 1 kVA ≈ 1.39 A.",
        "Size transformers about 20–30 % above maximum demand, and check large motor starting.",
        "Direct-on-line motor starting draws 6–7 × full-load current; soft starters and drives reduce it.",
        "Cable size must satisfy both current rating (with derating) and voltage drop (typically ≤ 3–5 %).",
    ],
    body=f'''
<h2 id="demand">1. From connected load to demand</h2>
{table(["Load","Connected kW","PF","Demand factor","Demand kW","Demand kVA"],[[n,f"{k}",f"{p}",f"{d}",f"{k*d:.0f}",f"{k*d/p:.0f}"] for n,k,p,d in loads]+[["Total","{:.0f}".format(sum(l[1] for l in loads)),"","",f"<b>{kw_dem:.0f}</b>",f"<b>{kva_dem:.0f}</b>"]],num_cols=(1,2,3,4,5))}
{formula("I = kVA × 1000 / (√3 × V_L)\nTransformer ≥ 1.25 × demand kVA (round up to standard size: 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000 kVA)")}
<p>Demand {kva_dem:.0f} kVA → line current {I_dem:.0f} A at 415 V → transformer ≥ {tr_kva:.0f} kVA, so a <b>{min(s for s in [250,315,400,500,630,800,1000,1250,1600,2000] if s >= tr_kva)} kVA</b> unit.</p>

<h2 id="motors">2. Motor starting</h2>
{table(["Starting method","Starting current (× FLC)","Starting torque"],[["Direct-on-line","6–7","Full (1.5–2.5 × FLT)"],["Star–delta","≈ 2–2.5","≈ 1/3 of DOL"],["Autotransformer (65 %)","≈ 2.7","≈ 42 % of DOL"],["Soft starter","2–4 (adjustable)","Reduced"],["Variable-frequency drive","≈ 1–1.5","Full torque at low speed"]])}

<h2 id="cables">3. Cable sizing</h2>
{table(["Cu cable (mm²)","Approx. rating (A)","Cu cable (mm²)","Approx. rating (A)"],[[f"{amp[i][0]}",f"{amp[i][1]}",f"{amp[i+8][0]}" if i+8 < len(amp) else "",f"{amp[i+8][1]}" if i+8 < len(amp) else ""] for i in range(8)],num_cols=(0,1,2,3))}
<p class="meta">Indicative ratings for multicore XLPE copper cables in air at 40 °C. Apply grouping, ground temperature and installation derating factors from the cable maker or IS 3961 / IEC 60364-5-52.</p>
{formula("Voltage drop (3-phase) ΔV = √3 · I · L · (R·cos φ + X·sin φ)     L in km, R and X in Ω/km\nR (Cu, 70–90 °C) ≈ 22.5 / A Ω/km;  X ≈ 0.07–0.09 Ω/km")}
<p>Example: {Ic:.0f} A over {Lc_:.0f} m at PF {pfc}: current rating needs {size} mm²; voltage drop {Vd:.1f} V = {Vd/415*100:.2f} % of 415 V.</p>
''',
    calcs=[dict(id="el", title="Feeder current, transformer, cable and voltage drop",
                presets=[dict(label="Plant feeder", v=dict(kw=420, pf=0.86, V=415, L=80, der=0.8, vd=3)), dict(label="Single motor 55 kW", v=dict(kw=55, pf=0.85, V=415, L=120, der=0.8, vd=3))],
                inputs=[dict(id="kw", label="Demand (kW)", value=420), dict(id="pf", label="Power factor", value=0.86), dict(id="V", label="Line voltage (V)", value=415), dict(id="L", label="Cable length (m)", value=80),
                        dict(id="der", label="Derating factor", value=0.8), dict(id="vd", label="Allowed voltage drop (%)", value=3)],
                js='''var A=[[2.5,25],[4,32],[6,41],[10,57],[16,76],[25,101],[35,125],[50,151],[70,192],[95,232],[120,269],[150,309],[185,353],[240,415],[300,473]];
var kva=v.kw/v.pf,I=kva*1000/(Math.sqrt(3)*v.V),tr=[250,315,400,500,630,800,1000,1250,1600,2000,2500].filter(function(s){return s>=1.25*kva;})[0]||"> 2500";
var sz=null,vdp=0,runs=1;for(runs=1;runs<=6&&!sz;runs++){for(var i=0;i<A.length;i++){if(A[i][1]*v.der*runs>=I){var R=22.5/A[i][0]/runs,X=0.08/runs;var dV=Math.sqrt(3)*I*v.L/1000*(R*v.pf+X*Math.sin(Math.acos(v.pf)));if(dV/v.V*100<=v.vd){sz=A[i][0];vdp=dV/v.V*100;break;}}}}
runs--;
return {rows:[["Demand kVA",fmt(kva,1)],["Line current",fmt(I,1)+" A"],["Transformer (≥ 1.25 × kVA)",tr+" kVA"],["Cable (Cu, per phase)",sz?(runs>1?runs+" × ":"")+sz+" mm²":"over 6 × 300 mm²","meets current and drop"],["Voltage drop",fmt(vdp,2)+" %"],["DOL starting current (6.5×)",fmt(I*6.5,0)+" A","if a single motor"]]};''')],
    quiz=[
        dict(q="Maximum demand is usually:", o=["Equal to connected load", "Less than connected load", "Greater than connected load", "Zero"], a=1, e="Not everything runs at once at full load."),
        dict(q="At 415 V three-phase, 1 kVA corresponds to about:", o=["0.72 A", "1.39 A", "2.4 A", "4.2 A"], a=1, e="1000/(1.732 × 415) = 1.39 A."),
        dict(q="DOL motor starting current is typically:", o=["1–2 × FLC", "6–7 × FLC", "15 × FLC", "Equal to FLC"], a=1, e="High inrush."),
        dict(q="Star–delta starting reduces starting torque to about:", o=["100 %", "1/3", "1/2", "2/3"], a=1, e="Voltage per winding 1/√3 → torque 1/3."),
        dict(q="Cables must be checked for current rating and:", o=["Colour", "Voltage drop", "Weight only", "Price only"], a=1, e="Both criteria."),
        dict(q="Improving power factor from 0.75 to 0.95 reduces current by about:", o=["5 %", "21 %", "50 %", "0 %"], a=1, e="0.75/0.95 = 0.79 → 21 % less."),
        dict(q="200 kW at PF 0.8, 415 V. Line current (A)?", num=347.8, unit="A", e="250 kVA × 1000/(1.732 × 415) = 347.8 A."),
        dict(q="Demand 380 kVA. Minimum transformer kVA with 25 % margin?", num=475, unit="kVA", e="1.25 × 380 = 475 → choose 500 kVA."),
    ],
    refs=["IS 732, Code of Practice for Electrical Wiring Installations.", "IEC 60364-5-52, Low-voltage electrical installations — Selection and erection — Wiring systems.", "IS 3961 / IEC 60287, Current ratings of cables.", "Cable manufacturers' technical data (ratings, resistance, reactance)."],
    links=[("Wikipedia — Power factor", "https://en.wikipedia.org/wiki/Power_factor")],
))

# =====================================================================================
# 38. DATA-CENTRE POWER AND PUE
# =====================================================================================
IT, PUE1, PUE2, tar = 1000.0, 1.6, 1.3, 8.0
E1, E2 = IT * PUE1 * 8760 / 1000, IT * PUE2 * 8760 / 1000
rack, dTa = 10.0, 12.0
airflow = rack * 1000 / (1.2 * 1005 * dTa) * 3600
pueb = bars([("IT load", IT), ("Cooling", IT * 0.42), ("UPS / distribution losses", IT * 0.12), ("Lighting / other", IT * 0.06)], "kW at PUE 1.6 (1 MW IT)", h=280)
ARTICLES.append(dict(
    slug="data-centre-power-and-pue", group="facilities",
    title="Data-Centre Power: PUE, Cooling Airflow, UPS Losses and Efficiency Gains",
    short="Data-centre PUE",
    tags=["Data centre", "PUE", "Energy efficiency", "Cooling"],
    desc="Power usage effectiveness (PUE), where data-centre energy goes, rack heat and cooling airflow, UPS and distribution losses, free cooling and the value of efficiency improvements.",
    blurb="What PUE measures, where the non-IT energy goes, how much air a rack needs, and what a better PUE is worth.",
    lead="Every watt drawn by servers ends up as heat that the facility must remove, and the facility itself consumes power for cooling, power conversion and lighting. Power usage effectiveness (PUE) is the ratio of total facility power to IT power: the closer to 1, the less overhead. With AI workloads driving rack densities up sharply, the overhead matters more than ever.",
    takeaways=[
        "PUE = total facility energy ÷ IT equipment energy. Typical existing sites 1.5–2.0; efficient modern sites 1.1–1.3.",
        "Cooling is usually the largest overhead, then UPS and distribution losses (5–10 %).",
        "Rack airflow Q = P/(ρ·c·ΔT): a 10 kW rack with 12 K air temperature rise needs about 2,500 m³/h.",
        "Raising supply air temperature (ASHRAE recommended 18–27 °C), hot/cold aisle containment and free cooling cut cooling energy.",
        "High-density racks (30–100+ kW) move to liquid cooling: direct-to-chip or immersion.",
    ],
    body=f'''
<h2 id="pue">1. PUE and where the energy goes</h2>
{formula("PUE = P_total / P_IT          DCiE = 1/PUE\nWUE = annual water (L) / IT energy (kWh)")}
{fig(pueb, "Figure 1. Illustrative breakdown for a 1 MW IT load at PUE 1.6.")}

<h2 id="cooling">2. Cooling</h2>
{formula("Airflow Q [m³/s] = P [W] / (ρ · c · ΔT)     ρ ≈ 1.2 kg/m³, c ≈ 1005 J/kg·K")}
<p>A {rack:.0f} kW rack with {dTa:.0f} K air temperature rise needs <b>{airflow:,.0f} m³/h</b>. Bypass air (cold air not passing through servers) and recirculation (hot exhaust drawn back) waste fan and chiller energy; containment fixes both.</p>
{table(["Measure","Typical effect"],[["Hot/cold aisle containment","Allows higher supply temperature; 10–20 % cooling saving"],["Raise supply air to 24–27 °C","Fewer chiller hours, more free cooling"],["Air-side or water-side economiser","Large savings in cool or dry climates"],["Variable-speed fans and pumps","Cube-law savings at part load"],["Liquid cooling (direct-to-chip, immersion)","Enables 50–100+ kW racks; heat reuse possible"]])}

<h2 id="power">3. Power chain</h2>
{fig(flow(["Grid / HV|substation","Transformer|≈ 98–99 %","UPS|≈ 94–97 % (eco 98–99 %)","PDU / busway|≈ 98–99 %","Server PSU|≈ 92–96 % (Titanium)","IT load"], h=130), "Figure 2. Power conversion chain; losses multiply along it.")}

<h2 id="example">4. Worked example</h2>
<p>IT load {IT:.0f} kW running all year; PUE improved from {PUE1} to {PUE2}; tariff ₹{tar:.0f}/kWh.</p>
{table(["Quantity","Value"],[["Annual energy at PUE 1.6",f"{E1:,.0f} MWh"],["Annual energy at PUE 1.3",f"{E2:,.0f} MWh"],["Saving",f"<b>{E1-E2:,.0f} MWh/yr</b>"],["Value",f"₹ {(E1-E2)*1000*tar/1e7:.1f} crore per year"]],num_cols=(1,))}
''',
    calcs=[dict(id="dc", title="PUE, energy and rack airflow",
                presets=[dict(label="1 MW, 1.6 → 1.3", v=dict(it=1000, p1=1.6, p2=1.3, tar=8, rk=10, dT=12)), dict(label="AI hall 5 MW, 1.4 → 1.15", v=dict(it=5000, p1=1.4, p2=1.15, tar=7, rk=60, dT=15))],
                inputs=[dict(id="it", label="IT load (kW)", value=1000), dict(id="p1", label="Current PUE", value=1.6), dict(id="p2", label="Target PUE", value=1.3), dict(id="tar", label="Tariff (₹/kWh)", value=8),
                        dict(id="rk", label="Rack power (kW)", value=10), dict(id="dT", label="Air ΔT across rack (K)", value=12)],
                js='''var e1=v.it*v.p1*8.76,e2=v.it*v.p2*8.76,s=e1-e2,Q=v.rk*1000/(1.2*1005*v.dT);
return {rows:[["Facility power now",fmt(v.it*v.p1,0)+" kW","overhead "+fmt(v.it*(v.p1-1),0)+" kW"],["Annual energy now",fmt(e1,0)+" MWh"],["Annual energy at target",fmt(e2,0)+" MWh"],["Saving",fmt(s,0)+" MWh/yr","₹ "+fmt(s*1000*v.tar/1e7,2)+" crore/yr"],["Rack airflow",fmt(Q*3600,0)+" m³/h",fmt(Q*2118.9,0)+" CFM"]],
verdict:v.rk>30?["caution","Above ~30 kW per rack, air cooling becomes difficult: consider liquid cooling."]:["ok","Air cooling practical at this rack density."]};''')],
    quiz=[
        dict(q="PUE is defined as:", o=["IT power / total power", "Total facility power / IT power", "Cooling power / IT power", "IT power − losses"], a=1, e="Total over IT."),
        dict(q="A PUE of 1.0 would mean:", o=["No IT load", "Zero overhead: all power goes to IT", "Double the energy", "Impossible to compute"], a=1, e="Ideal, unreachable."),
        dict(q="The largest non-IT load is usually:", o=["Lighting", "Cooling", "Security", "Offices"], a=1, e="Chillers, CRAH fans, pumps."),
        dict(q="Hot/cold aisle containment mainly prevents:", o=["Dust", "Mixing of hot exhaust and cold supply air", "Fire", "Noise"], a=1, e="Stops bypass and recirculation."),
        dict(q="Above roughly what rack density is liquid cooling usually needed?", o=["2 kW", "5 kW", "30–40 kW", "500 kW"], a=2, e="Air struggles beyond ~30–40 kW."),
        dict(q="Variable-speed fans save energy because fan power scales with:", o=["Speed", "Speed²", "Speed³", "Not speed"], a=2, e="Affinity laws."),
        dict(q="IT load 500 kW, facility 700 kW. PUE?", num=1.4, e="700/500 = 1.4."),
        dict(q="Airflow (m³/h) for a 6 kW rack with ΔT 10 K (ρ = 1.2, c = 1005)?", num=1791, unit="m³/h", e="6000/(1.2×1005×10) × 3600 = 1,791 m³/h."),
    ],
    refs=["ISO/IEC 30134-2:2016, Data centres — Key performance indicators — Power usage effectiveness (PUE).", "ASHRAE TC 9.9, Thermal Guidelines for Data Processing Environments, 5th ed.", "The Green Grid, PUE: A Comprehensive Examination of the Metric (White Paper 49).", "Uptime Institute, Annual Global Data Center Survey."],
    links=[("Wikipedia — Power usage effectiveness", "https://en.wikipedia.org/wiki/Power_usage_effectiveness")],
))

# =====================================================================================
# 39. POWER GRID FREQUENCY
# =====================================================================================
f0, Sys, H, dP = 50.0, 200000.0, 4.0, 1000.0
rocof = dP * f0 / (2 * H * Sys)
Pgov, Rdr = 50000.0, 0.05
beta = Pgov / (Rdr * f0) + 1.0 * Sys / f0
dfss = dP / beta

def sim(dP=dP, H=H, S=Sys, Pg=Pgov, R=Rdr, Tg=6.0, D=1.0, T=40.0, dt=0.02):
    df, pm, out = 0.0, 0.0, []
    for k in range(int(T / dt)):
        t = k * dt
        load_damp = D * S / 100 * df / f0 * 100 / 100  # D % load per % freq
        ddf = (pm - dP - D * S * df / f0) * f0 / (2 * H * S)
        pref = -Pg / R * df / f0
        pm += (pref - pm) / Tg * dt
        df += ddf * dt
        out.append((t, f0 + df))
    return out
fplot = plot([dict(pts=sim(), label="frequency after 1,000 MW loss", at=25)], "time (s)", "frequency (Hz)", xlim=(0, 40), ylim=(49.7, 50.05), h=300,
             notes=[(1, 49.72, "nadir set by inertia and governor speed; settling value by droop")])

ARTICLES.append(dict(
    slug="power-grid-frequency-control", group="facilities",
    title="Power Grid Frequency Control: Inertia, RoCoF, Droop, Reserves and Blackouts",
    short="Grid frequency",
    tags=["Power systems", "Frequency", "Grid", "Renewables"],
    desc="How power grids hold 50 Hz: system inertia and rate of change of frequency, governor droop, primary/secondary/tertiary reserves, under-frequency load shedding, falling inertia with renewables and lessons from major blackouts.",
    blurb="Why frequency falls when generation trips, how fast and how far, and how inertia, droop and reserves bring it back.",
    lead="On an AC grid, generation and demand must balance every instant. Any imbalance shows up as a change in frequency: losing a large generator makes frequency fall at a rate set by the rotating inertia of all synchronous machines, until governors raise output. Understanding this chain explains reserve requirements, load-shedding schemes and why grids with many inverter-based renewables need new kinds of support.",
    takeaways=[
        "Frequency is common to the whole synchronous grid: 50 Hz in India, with the operating band 49.90–50.05 Hz under the Indian Electricity Grid Code.",
        "Initial rate of change of frequency RoCoF = ΔP·f₀/(2·H·S); more inertia (H) means slower fall.",
        "Governor droop (typically 4–5 %) shares load changes between generators and sets the steady-state frequency deviation.",
        "Primary response acts in seconds, secondary (AGC) over minutes restores 50 Hz, tertiary reserves replace them.",
        "Under-frequency load shedding is the last automatic defence before collapse; large blackouts usually start with overloads and cascading trips.",
    ],
    body=f'''
<h2 id="inertia">1. Inertia and RoCoF</h2>
{formula("Swing equation (aggregate):  (2·H·S / f0) · d(Δf)/dt = ΔP_mech − ΔP_load − D·Δf\nInitial RoCoF = ΔP · f0 / (2 · H · S)\nH = stored kinetic energy / rating (s): 2–9 s for synchronous machines; ≈ 0 for inverter-based plant")}
<p>Example: losing {dP:,.0f} MW in a {Sys/1000:.0f} GW system with H = {H:.0f} s gives RoCoF ≈ <b>{rocof:.3f} Hz/s</b>.</p>

<h2 id="droop">2. Governor droop</h2>
{formula("Droop R:  Δf/f0 = −R · ΔP/P_rated       (R = 0.04–0.05)\nSystem stiffness β ≈ Σ P_rated/(R·f0) + load damping     (MW/Hz)\nSteady-state Δf = ΔP / β")}
<p>With {Pgov/1000:.0f} GW of generation on 5 % droop plus 1 % load damping, β ≈ {beta:,.0f} MW/Hz, so the {dP:,.0f} MW loss settles about {dfss:.3f} Hz low until secondary control restores 50 Hz.</p>
{fig(fplot, "Figure 1. Simulated frequency after losing 1,000 MW in a 200 GW system (H = 4 s, 50 GW of governors with 5 % droop and 6 s time constant, 1 % load damping). Frequency drops, reaches a nadir, then settles below 50 Hz.")}

<h2 id="reserves">3. Control layers</h2>
{table(["Layer","Time frame","Mechanism"],[["Inertial response","0–few seconds","Kinetic energy of rotating machines (automatic, physical)"],["Primary (governor) response","Seconds to ~30 s","Droop control on generators, fast batteries"],["Secondary (AGC / LFC)","30 s – 15 min","Central control restores frequency and tie-line flows"],["Tertiary","15 min – hours","Re-dispatch to restore reserves"],["Under-frequency load shedding","Emergency stages (e.g. 49.4, 49.2, 49.0 Hz)","Disconnect blocks of load to arrest decline"]])}

<h2 id="blackouts">4. Lessons from major blackouts</h2>
{table(["Event","What happened (summary)","Lesson"],[["Northern & Eastern India, 30–31 July 2012","Heavy inter-regional flows and overdrawal; line trips led to grid separation and collapse affecting several hundred million people","Discipline on schedules, protection coordination, adequate transmission margins"],
["North-east USA and Canada, 14 Aug 2003","Lines sagged into trees; alarm software failure left operators unaware; cascading trips","Situational awareness, vegetation management, reliability standards"],["Italy, 28 Sep 2003","Loss of import lines from Switzerland; frequency collapse","Coordination between neighbouring operators, defence plans"],
["Great Britain, 9 Aug 2019","Near-simultaneous loss of offshore wind and gas plant after a lightning strike; low-frequency demand disconnection","Inertia and RoCoF settings of distributed generation; fast reserves"]])}
<p>As synchronous plant is replaced by solar and wind (inverter-based), system inertia falls and RoCoF rises. Grids respond with synchronous condensers, fast frequency response from batteries, grid-forming inverters and minimum-inertia constraints in dispatch.</p>
''',
    calcs=[dict(id="grid", title="Frequency response after a generation loss",
                presets=[dict(label="Worked example", v=dict(dP=1000, S=200000, H=4, Pg=50000, R=5, Tg=6, D=1)), dict(label="Low inertia (H = 2 s)", v=dict(dP=1000, S=200000, H=2, Pg=50000, R=5, Tg=6, D=1))],
                inputs=[dict(id="dP", label="Generation lost (MW)", value=1000), dict(id="S", label="System size (MW online)", value=200000), dict(id="H", label="Inertia constant H (s)", value=4),
                        dict(id="Pg", label="Generation with governors (MW)", value=50000), dict(id="R", label="Droop (%)", value=5), dict(id="Tg", label="Governor time constant (s)", value=6), dict(id="D", label="Load damping (% per %)", value=1)],
                js='''var f0=50,R=v.R/100,df=0,pm=0,dt=0.02,pts=[],nad=50,tn=0;
for(var k=0;k<3000;k++){var t=k*dt;var ddf=(pm-v.dP-v.D*v.S*df/f0)*f0/(2*v.H*v.S);var pref=-v.Pg/R*df/f0;pm+=(pref-pm)/v.Tg*dt;df+=ddf*dt;if(k%10===0)pts.push([t,f0+df]);if(f0+df<nad){nad=f0+df;tn=t;}}
var rocof=v.dP*f0/(2*v.H*v.S),beta=v.Pg/(R*f0)+v.D*v.S/f0,ss=v.dP/beta;
return {rows:[["Initial RoCoF",fmt(rocof,4)+" Hz/s"],["Nadir",fmt(nad,3)+" Hz","at "+fmt(tn,1)+" s"],["Stiffness β",fmt(beta,0)+" MW/Hz"],["Settling frequency",fmt(50-ss,3)+" Hz","before secondary control"]],
verdict:nad<49.4?["bad","Nadir below 49.4 Hz: load shedding stages would operate."]:(nad<49.9?["caution","Frequency leaves the normal operating band."]:["ok","Frequency stays close to the normal band."]),
svg:plotSVG([{pts:pts,label:"frequency"}],{xlabel:"time (s)",ylabel:"Hz",xmin:0,xmax:60}),caption:"Simulated system frequency (single-area model)."};''')],
    quiz=[
        dict(q="When a large generator trips, grid frequency:", o=["Rises", "Falls", "Stays constant", "Becomes DC"], a=1, e="Load exceeds generation; rotating machines slow."),
        dict(q="Higher system inertia makes RoCoF:", o=["Larger", "Smaller", "Unchanged", "Negative"], a=1, e="RoCoF ∝ 1/H."),
        dict(q="Governor droop of 5 % means a frequency drop of 5 % gives:", o=["5 % more output", "100 % change in output", "No change", "Shutdown"], a=1, e="Full rated change over 5 % frequency change."),
        dict(q="Which control restores frequency to exactly 50 Hz?", o=["Inertia", "Primary droop", "Secondary control (AGC)", "Load shedding"], a=2, e="Primary leaves a steady-state error."),
        dict(q="Inverter-based solar and wind plants without special control provide:", o=["Large inertia", "Almost no inertia", "Infinite inertia", "Negative inertia"], a=1, e="No rotating mass coupled to the grid."),
        dict(q="Under-frequency load shedding is:", o=["Normal daily control", "An emergency defence to arrest frequency decline", "A billing method", "Voltage control"], a=1, e="Last automatic line of defence."),
        dict(q="Lose 500 MW in a 100 GW system with H = 5 s at 50 Hz. RoCoF (Hz/s)?", num=0.025, unit="Hz/s", e="500 × 50/(2 × 5 × 100,000) = 0.025 Hz/s."),
        dict(q="β = 25,000 MW/Hz; loss 1,500 MW. Steady-state Δf (Hz)?", num=0.06, unit="Hz", e="1500/25000 = 0.06 Hz."),
    ],
    refs=["Kundur, P., Power System Stability and Control, McGraw-Hill, 1994.", "Central Electricity Regulatory Commission, Indian Electricity Grid Code (IEGC) 2023.", "Enquiry Committee report on grid disturbances in Northern and Eastern regions, July 2012 (Ministry of Power, India).",
          "US–Canada Power System Outage Task Force, Final Report on the August 14, 2003 Blackout, 2004.", "Ofgem / National Grid ESO, Technical report on the events of 9 August 2019."],
    links=[("Wikipedia — Utility frequency", "https://en.wikipedia.org/wiki/Utility_frequency"), ("Wikipedia — 2012 India blackouts", "https://en.wikipedia.org/wiki/2012_India_blackouts")],
))
