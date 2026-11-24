"""
TOOL:    Vijay_Wiki articles — batch 2 group E (facilities and electrical)
FAMILY:  vijay-wiki
VERSION: 1.0.0
DATE:    2026-11-24
CHAT:    claude.ai — Vijay_Wiki: next batch of topics (36 articles)
CHANGES: 1.0.0 DG sizing, UPS and batteries, earthing and lightning, HVAC heat load, borewell pumping, PF correction
"""
import math
import numpy as np
from wiki import plot, flow, bars, fig, table, box, formula

ARTICLES = []

# ---------------------------------------------------------------- 72 DG SET SIZING
Prun, pf_dg, Pm, eta_m, pf_m, kst = 120.0, 0.8, 30.0, 0.9, 0.85, 6.0
kva_run = Prun / pf_dg
kva_m = Pm / (eta_m * pf_m)
kva_st = kst * kva_m
kva_need = max(kva_run * 1.2, (kva_run - kva_m) + kva_st / 2)
fuel = 0.25 * Prun
ARTICLES.append(dict(
    slug="diesel-generator-sizing", group="facilities",
    title="Diesel Generator Sizing: kVA, Motor Starting, Derating and Fuel",
    short="DG set sizing", tags=["Diesel generator", "Backup power", "Electrical", "Sizing"],
    desc="Sizing standby diesel generator sets: running kW and kVA, power factor, motor starting kVA and voltage dip, step loading, site derating, minimum loading and fuel consumption estimates.",
    blurb="From running load and the biggest motor to generator kVA, with derating, minimum load and fuel estimates.",
    lead="A diesel generator must carry the steady load and survive the worst step: usually a large motor starting direct-on-line. Generators are rated in kVA at 0.8 power factor; the engine limits kW, the alternator limits kVA. A set that is too small trips or stalls on starting; one that is much too large runs lightly loaded and suffers wet stacking.",
    takeaways=[
        "Generator kVA rating assumes PF 0.8: kW capacity = 0.8 × kVA.",
        "Motor starting kVA ≈ 6–7 × running kVA for direct-on-line starting at low power factor; soft starters and VFDs reduce it sharply.",
        "Rough first check: kVA ≥ base load kVA + ½ × largest motor starting kVA for about 15–20 % voltage dip; confirm with the maker's sizing tool.",
        "Derate for altitude and high ambient temperature as the engine maker specifies.",
        "Keep average load above about 30–40 % of rating to avoid wet stacking; diesel use ≈ 0.25 L/kWh near rated load.",
    ],
    body=f'''
<h2 id="basics">1. Ratings and loads</h2>
{formula("kVA = kW / PF        Motor running kVA = kW_out / (η · PF)\nDOL starting kVA ≈ 6–7 × running kVA  (star-delta ≈ 1/3 of that; soft starter 2–4 ×; VFD ≈ 1–1.5 ×)\nFuel ≈ 0.25 L/kWh at 75–100 % load (≈ 0.28–0.32 at 50 %)")}
{table(["Rating","Meaning"],[["Standby (ESP)","Emergency use, variable load, limited hours per year"],["Prime (PRP)","Unlimited hours, variable load, average ≤ 70–80 % of prime rating"],["Continuous (COP)","Constant load, unlimited hours"]])}
<h2 id="steps">2. Step loading and voltage dip</h2>
<p>Large steps cause voltage and frequency dips. Sequence loads (largest motor first, then smaller ones), use soft starters or drives, and check the dip against what contactors, drives and electronics tolerate (often ≤ 15–20 %). Non-linear loads (VFDs, UPS rectifiers) may need alternator oversizing.</p>
<h2 id="example">3. Worked example</h2>
<p>Running load {Prun:.0f} kW at PF {pf_dg}; largest motor {Pm:.0f} kW DOL (η {eta_m}, PF {pf_m}).</p>
{table(["Step","Result"],[["Running kVA",f"{kva_run:.0f} kVA"],["Motor running kVA",f"{kva_m:.1f} kVA"],["Motor starting kVA (6×)",f"{kva_st:.0f} kVA"],["First-check generator size",f"<b>≥ {kva_need:.0f} kVA</b> → next standard size"],["Fuel at running load",f"≈ {fuel:.0f} L/h"]],num_cols=(1,))}
''',
    calcs=[dict(id="dg", title="Generator size first check",
                presets=[dict(label="Worked example", v=dict(P=120, pf=0.8, M=30, em=90, pm=85, st="6", der=0))],
                inputs=[dict(id="P", label="Running load (kW)", value=120), dict(id="pf", label="Load PF", value=0.8), dict(id="M", label="Largest motor (kW)", value=30), dict(id="em", label="Motor efficiency (%)", value=90),
                        dict(id="pm", label="Motor PF (%)", value=85), dict(id="st", label="Starting method", value="6", options=[("6", "DOL (6×)"), ("2", "Star-delta (2×)"), ("3", "Soft starter (3×)"), ("1.2", "VFD (1.2×)")]), dict(id="der", label="Site derating (%)", value=0)],
                js='''var run=v.P/v.pf,mk=v.M/(v.em/100*v.pm/100),sk=parseFloat(v.st)*mk,need=Math.max(run*1.2,(run-mk)+sk/2)/(1-v.der/100);
var sizes=[62.5,82.5,100,125,160,200,250,320,380,500,625,750,1010,1250,1500,2000],pick=sizes.filter(function(s){return s>=need;})[0]||"> 2000";
return {rows:[["Running kVA",fmt(run,1)],["Motor starting kVA",fmt(sk,0)],["Required kVA (first check)",fmt(need,0)],["Suggested standard size",pick+" kVA"],["Load fraction on that set",typeof pick==="number"?fmt(v.P/(pick*0.8)*100,0)+" %":"—"],["Fuel at running load",fmt(0.25*v.P,1)+" L/h"]],
verdict:(typeof pick==="number"&&v.P/(pick*0.8)<0.3)?["caution","Average load below 30 %: risk of wet stacking; consider smaller set or load bank."]:["ok","Size reasonable for a first check; confirm with maker's tool."]};''')],
    quiz=[
        dict(q="A 250 kVA generator at standard rating can supply about:", o=["250 kW", "200 kW", "312 kW", "125 kW"], a=1, e="0.8 × 250."),
        dict(q="DOL starting kVA is roughly:", o=["1×", "2×", "6–7× running kVA", "20×"], a=2, e="High inrush at low PF."),
        dict(q="Wet stacking is caused by:", o=["Overload", "Prolonged light loading", "High altitude", "Cold start once"], a=1, e="Unburnt fuel accumulates."),
        dict(q="Which starter reduces generator starting demand most?", o=["DOL", "Star-delta", "Soft starter", "VFD"], a=3, e="Current near full-load."),
        dict(q="Approximate diesel consumption near rated load:", o=["0.05 L/kWh", "0.25 L/kWh", "1 L/kWh", "2 L/kWh"], a=1, e="Modern engines ≈ 0.21–0.27."),
        dict(q="Prime rating means:", o=["Emergency only", "Unlimited hours at variable load", "Constant 100 % load", "Test only"], a=1, e="ISO 8528 definitions."),
        dict(q="Load 160 kW at PF 0.8. kVA?", num=200, unit="kVA", e="160/0.8."),
        dict(q="Fuel for 100 kW for 5 h at 0.25 L/kWh (L)?", num=125, unit="L", e="100×5×0.25."),
    ],
    refs=["ISO 8528-1, Reciprocating internal combustion engine driven alternating current generating sets — Application, ratings and performance.", "IEEE 446 (Orange Book), Emergency and Standby Power Systems.", "Generator manufacturers' sizing guides (e.g. Cummins, Caterpillar, Kirloskar)."],
    links=[("Wikipedia — Diesel generator", "https://en.wikipedia.org/wiki/Diesel_generator")],
))

# ---------------------------------------------------------------- 73 UPS & BATTERY
Pl, tmin, Vdc, eta_i, dod, age, rf = 6000.0, 30.0, 240.0, 0.94, 0.8, 1.25, 0.55
Ah_eff = Pl * tmin / 60 / (Vdc * eta_i * dod) * age
Ah_c20 = Ah_eff / rf
ARTICLES.append(dict(
    slug="ups-and-battery-sizing", group="facilities",
    title="UPS and Battery Sizing: VA vs W, Autonomy, Discharge Rate and Ageing",
    short="UPS and batteries", tags=["UPS", "Batteries", "Backup power", "Electrical"],
    desc="Sizing an uninterruptible power supply and its batteries: VA and watt ratings, topologies, autonomy, battery ampere-hours with inverter efficiency, depth of discharge, ageing and discharge-rate effects, VRLA versus lithium-ion.",
    blurb="Choosing UPS rating and battery ampere-hours for a required backup time, including the effects that catch people out.",
    lead="A UPS bridges mains failures for computers, controllers and instruments, either until the generator starts or long enough for a safe shutdown. Two numbers matter: the UPS rating (both VA and W) and the battery energy for the required autonomy. Battery capacity on a datasheet is usually quoted at a slow 10- or 20-hour rate, so short, heavy discharges deliver much less.",
    takeaways=[
        "Check both limits: UPS VA rating and W rating (W = VA × output PF, typically 0.8–1.0).",
        "Online double-conversion UPS gives the cleanest output for sensitive test and control equipment.",
        "Battery Ah ≈ P·t / (V<sub>dc</sub> · η<sub>inverter</sub> · DoD) × ageing factor (≈ 1.25 for end-of-life capacity).",
        "Short discharges (5–30 min) deliver only about 40–70 % of the 20-hour rated Ah for lead-acid; use manufacturers' constant-power tables.",
        "Lithium-ion (LFP) batteries last longer, tolerate deeper discharge and higher temperature, but need a battery management system.",
    ],
    body=f'''
<h2 id="types">1. UPS topologies</h2>
{table(["Topology","How it works","Use"],[["Offline / standby","Load on mains; switches to inverter on failure (few ms)","PCs, non-critical"],["Line-interactive","Adds voltage regulation (AVR)","Small servers, office"],["Online double conversion","Load always on inverter; rectifier feeds DC bus","Control systems, data acquisition, labs"]])}
<h2 id="sizing">2. Battery sizing</h2>
{formula("Battery energy = P_load · t / (η_inverter · DoD)\nAh_required = energy / V_dc × ageing factor (1.25)\nC20 rating needed ≈ Ah_required / rate factor  (rate factor ≈ 0.5–0.6 at 30 min, 0.4 at 10 min for VRLA)\nTemperature: lead-acid life halves for every ~8–10 °C above 25 °C")}
<h2 id="example">3. Worked example</h2>
<p>Load {Pl/1000:.0f} kW for {tmin:.0f} min, DC bus {Vdc:.0f} V (20 × 12 V), inverter η {eta_i}, DoD {dod}, ageing ×{age}, VRLA 30-min rate factor {rf}.</p>
{table(["Step","Result"],[["Ah needed at 30-min rate",f"{Ah_eff:.1f} Ah"],["Equivalent C20 rating",f"<b>{Ah_c20:.0f} Ah</b> → choose ~40–42 Ah blocks"],["UPS rating","≥ 6 kW and ≥ 6/0.9 = 6.7 kVA → 10 kVA unit with margin"]],num_cols=(1,))}
{table(["Chemistry","Design life","Notes"],[["VRLA (AGM/gel)","3–5 years (5-year design) to 10+ (long-life)","Cheap, sensitive to heat"],["Lithium iron phosphate (LFP)","10–15 years","Lighter, more cycles, BMS required"]])}
''',
    calcs=[dict(id="ups", title="UPS battery sizing",
                presets=[dict(label="Worked example", v=dict(P=6000, t=30, V=240, eta=94, dod=80, age=1.25, rf=0.55, pf=0.9))],
                inputs=[dict(id="P", label="Load (W)", value=6000), dict(id="t", label="Autonomy (min)", value=30), dict(id="V", label="DC bus voltage (V)", value=240), dict(id="eta", label="Inverter efficiency (%)", value=94),
                        dict(id="dod", label="Depth of discharge (%)", value=80), dict(id="age", label="Ageing factor", value=1.25), dict(id="rf", label="Rate factor vs C20", value=0.55), dict(id="pf", label="UPS output PF", value=0.9)],
                js='''var E=v.P*v.t/60/(v.eta/100*v.dod/100),Ah=E/v.V*v.age,c20=Ah/v.rf,kva=v.P/v.pf/1000;
return {rows:[["Energy from battery",fmt(E/1000,2)+" kWh"],["Ah at discharge rate",fmt(Ah,1)+" Ah"],["C20 rating needed",fmt(c20,0)+" Ah"],["Battery current at start",fmt(v.P/(v.eta/100)/v.V,1)+" A"],["Minimum UPS rating",fmt(kva,2)+" kVA / "+fmt(v.P/1000,2)+" kW"]]};''')],
    quiz=[
        dict(q="An online double-conversion UPS:", o=["Switches only on failure", "Always powers the load through the inverter", "Has no battery", "Only regulates voltage"], a=1, e="Zero transfer time."),
        dict(q="A 10 kVA UPS with output PF 0.8 can supply at most:", o=["10 kW", "8 kW", "12.5 kW", "5 kW"], a=1, e="W = VA × PF."),
        dict(q="Short, heavy discharge makes available lead-acid capacity:", o=["Higher than rated", "Lower than the 20-h rating", "The same", "Zero"], a=1, e="Rate effect (Peukert)."),
        dict(q="An ageing factor of 1.25 accounts for:", o=["Temperature", "End-of-life capacity at 80 %", "Inverter losses", "Wiring"], a=1, e="Replace at 80 %."),
        dict(q="Lead-acid life roughly halves for every:", o=["1 °C", "8–10 °C above 25 °C", "50 °C", "Never"], a=1, e="Keep battery rooms cool."),
        dict(q="LFP batteries need:", o=["Water topping", "A battery management system", "No charger", "Daily equalising"], a=1, e="Cell monitoring."),
        dict(q="3 kW for 20 min, 48 V bus, η 0.9, DoD 1. Ah (no ageing)?", num=23.15, unit="Ah", e="3000×(1/3)/(48×0.9) = 23.1 Ah."),
        dict(q="Ah needed 30 at rate factor 0.6. C20 rating?", num=50, unit="Ah", e="30/0.6."),
    ],
    refs=["IEC 62040-3, Uninterruptible power systems — Method of specifying performance and test requirements.", "IEEE 1184, Guide for Batteries for Uninterruptible Power Supply Systems.", "IEEE 485 (vented lead-acid sizing) and IEEE 1189 (VRLA selection).", "Battery manufacturers' constant-power discharge tables."],
    links=[("Wikipedia — Uninterruptible power supply", "https://en.wikipedia.org/wiki/Uninterruptible_power_supply")],
))

# ---------------------------------------------------------------- 74 EARTHING & LIGHTNING
rho, Lr, dr = 100.0, 3.0, 0.016
R1 = rho / (2 * math.pi * Lr) * (math.log(8 * Lr / dr) - 1)
nrods = 4
Rn = R1 / nrods * 1.3
ARTICLES.append(dict(
    slug="earthing-and-lightning-protection", group="facilities",
    title="Earthing (Grounding) and Lightning Protection: Electrode Resistance, Soil Resistivity and Rolling Sphere",
    short="Earthing and lightning", tags=["Earthing", "Grounding", "Lightning", "Electrical safety"],
    desc="Why and how installations are earthed: earthing systems, electrode resistance of rods, soil resistivity by the Wenner method, parallel rods, equipotential bonding, instrument earths, and lightning protection levels with rolling sphere and mesh sizes.",
    blurb="Estimating rod earth resistance from soil resistivity, measuring resistivity, and the basics of lightning protection design.",
    lead="Earthing protects people by making fault currents trip protective devices quickly and by keeping touch voltages low. It also gives a stable reference for sensitive instruments and a path for lightning and surge currents. Electrode resistance depends mostly on soil resistivity, which varies widely with moisture and season, so measurement comes first.",
    takeaways=[
        "Single rod resistance R ≈ (ρ/2πL)·[ln(8L/d) − 1]; doubling length lowers R much more than doubling diameter.",
        "Measure soil resistivity with the Wenner four-pin method: ρ = 2π·a·R.",
        "Parallel rods spaced at least their length apart reduce resistance, but not in proportion (mutual interference factor ≈ 1.2–1.5).",
        "Bond all metalwork to a common earth (equipotential bonding); keep instrument earths connected to the same system at one point to avoid loops.",
        "IEC 62305 lightning protection levels I–IV use rolling-sphere radii of 20, 30, 45 and 60 m and mesh sizes of 5, 10, 15 and 20 m.",
    ],
    body=f'''
<h2 id="systems">1. Earthing systems</h2>
{table(["System","Description","Note"],[["TN-S","Separate neutral and protective conductors from the source","Common in modern installations"],["TN-C-S","Combined PEN conductor up to the installation, then separate","Typical utility supply"],["TT","Installation has its own earth electrode","Needs RCDs"],["IT","Source isolated or high-impedance earthed","Continuity of supply (hospitals, some process plants)"]])}
<h2 id="electrodes">2. Electrode resistance and soil resistivity</h2>
{formula("Rod:  R = ρ/(2πL) · [ln(8L/d) − 1]          ρ in Ω·m, L and d in m\nWenner:  ρ = 2π·a·R   (four equally spaced pins, spacing a ≈ depth of interest)\nn rods in parallel (spacing ≥ L):  R_n ≈ (R1/n) · (1.2 … 1.5)")}
{table(["Soil","Typical resistivity (Ω·m)"],[["Wet clay / marsh","5–50"],["Loam, garden soil","20–200"],["Sand, gravel (moist)","100–1,000"],["Dry sand, rock","1,000–10,000+"]],num_cols=(1,))}
<p>Example: ρ = {rho:.0f} Ω·m, rod {Lr:.0f} m × {dr*1000:.0f} mm → R ≈ <b>{R1:.1f} Ω</b>; {nrods} rods in parallel ≈ <b>{Rn:.1f} Ω</b>.</p>
<h2 id="lightning">3. Lightning protection (IEC 62305)</h2>
{table(["Protection level","Rolling sphere radius (m)","Mesh size (m)","Typical down-conductor spacing (m)"],[["I","20","5 × 5","10"],["II","30","10 × 10","10"],["III","45","15 × 15","15"],["IV","60","20 × 20","20"]],num_cols=(1,3))}
<p>Combine an external system (air terminals, down conductors, earth termination) with surge protective devices (SPDs) on power, signal and data lines entering the building, and equipotential bonding at entry points.</p>
''',
    calcs=[dict(id="earth", title="Rod resistance, parallel rods and Wenner resistivity",
                presets=[dict(label="Example", v=dict(rho=100, L=3, d=16, n=4, f=1.3, a=3, Rw=5.3)), dict(label="Dry site", v=dict(rho=800, L=3, d=16, n=6, f=1.4, a=3, Rw=42))],
                inputs=[dict(id="rho", label="Soil resistivity ρ (Ω·m)", value=100), dict(id="L", label="Rod length (m)", value=3), dict(id="d", label="Rod diameter (mm)", value=16), dict(id="n", label="Number of rods", value=4), dict(id="f", label="Mutual factor", value=1.3),
                        dict(id="a", label="Wenner pin spacing (m)", value=3), dict(id="Rw", label="Wenner measured R (Ω)", value=5.3)],
                js='''var R=v.rho/(2*Math.PI*v.L)*(Math.log(8*v.L/(v.d/1000))-1),Rn=R/v.n*v.f,rw=2*Math.PI*v.a*v.Rw;
return {rows:[["Single rod",fmt(R,2)+" Ω"],[v.n+" rods in parallel",fmt(Rn,2)+" Ω"],["Soil resistivity from Wenner",fmt(rw,1)+" Ω·m"]],verdict:Rn>10?["caution","Above 10 Ω: add rods, use longer rods, or improve soil contact."]:["ok","Below 10 Ω (check the target for your system)."]};''')],
    quiz=[
        dict(q="Earth electrode resistance depends mostly on:", o=["Rod material", "Soil resistivity", "Rod colour", "Cable size"], a=1, e="ρ dominates."),
        dict(q="Which lowers rod resistance more?", o=["Doubling diameter", "Doubling length", "Painting", "Shortening"], a=1, e="R ∝ 1/L roughly; diameter only in log."),
        dict(q="Wenner method formula:", o=["ρ = R/a", "ρ = 2π·a·R", "ρ = πa²R", "ρ = R·L"], a=1, e="Equal spacing four-pin."),
        dict(q="Parallel rods should be spaced at least:", o=["0.1 m", "Their own length", "100 m", "Touching"], a=1, e="To limit mutual interference."),
        dict(q="IEC 62305 LPL I rolling sphere radius:", o=["20 m", "45 m", "60 m", "100 m"], a=0, e="Most stringent level."),
        dict(q="SPDs protect against:", o=["Earth faults", "Surges on incoming lines", "Overloads", "Low PF"], a=1, e="Surge protective devices."),
        dict(q="Wenner: a = 2 m, R = 8 Ω. ρ (Ω·m)?", num=100.5, unit="Ω·m", e="2π × 2 × 8 = 100.5."),
        dict(q="Single rod 20 Ω; 3 rods with factor 1.2. Combined (Ω)?", num=8, unit="Ω", e="20/3 × 1.2 = 8."),
    ],
    refs=["IS 3043:2018, Code of Practice for Earthing.", "IEEE 80, Guide for Safety in AC Substation Grounding; IEEE 142 (Green Book).", "IEC 62305-1 to -4, Protection against lightning.", "IEC 60364-5-54, Earthing arrangements and protective conductors."],
    links=[("Wikipedia — Ground (electricity)", "https://en.wikipedia.org/wiki/Ground_(electricity)"), ("Wikipedia — Lightning rod", "https://en.wikipedia.org/wiki/Lightning_rod")],
))

# ---------------------------------------------------------------- 75 HVAC HEAT LOAD
Aenv, Uenv, dTo = 100.0, 1.5, 10.0
ppl, Alight, Weq, vol, ach = 6, 80.0, 5000.0, 280.0, 0.5
q_cond = Uenv * Aenv * dTo
q_ppl = ppl * 130
q_l = 10 * Alight
q_vent = 1.2 * 1005 * (vol * ach / 3600) * dTo
q_tot = (q_cond + q_ppl + q_l + Weq + q_vent) * 1.1
hb = bars([("Envelope", q_cond / 1000), ("People", q_ppl / 1000), ("Lighting", q_l / 1000), ("Equipment", Weq / 1000), ("Ventilation", q_vent / 1000)], "heat gain (kW)", h=260)
ARTICLES.append(dict(
    slug="hvac-heat-load-estimation", group="facilities",
    title="HVAC Heat-Load Estimation for Labs and Control Rooms",
    short="HVAC heat load", tags=["HVAC", "Cooling load", "Air conditioning", "Facilities"],
    desc="Estimating cooling load for rooms, labs and control rooms: conduction through the envelope, solar gains, people, lighting, equipment and ventilation, sensible and latent heat, safety margin and conversion to tons of refrigeration.",
    blurb="Adding up heat from walls, people, lights, equipment and fresh air to size air conditioning for a room or lab.",
    lead="Air conditioning must remove all the heat that enters or is generated in a space. In test labs and control rooms, equipment heat usually dominates, so a quick load estimate from nameplates and diversity is often more accurate than rules of thumb per square metre. The method sums sensible gains (raise temperature) and latent gains (add moisture).",
    takeaways=[
        "Envelope conduction Q = U·A·ΔT; add solar gain through glazing and sunlit roofs separately.",
        "People: about 75 W sensible + 55 W latent each when seated; more for active work.",
        "Lighting and equipment: count actual power with diversity; nearly all electrical input becomes heat in the room.",
        "Fresh air: Q<sub>s</sub> = 1.2·1005·V̇·ΔT (W, V̇ in m³/s) plus a latent part in humid climates.",
        "Add 10–20 % margin; 1 TR = 3.517 kW. Typical offices need about 1 TR per 10–15 m²; equipment-heavy labs much more.",
    ],
    body=f'''
<h2 id="components">1. Load components</h2>
{formula("Envelope:   Q = U·A·ΔT       (U ≈ 0.3–0.6 insulated, 1.5–3 W/m²K uninsulated walls/roofs; glass 3–6)\nPeople:     ≈ 75 W sensible + 55 W latent (seated)\nLighting:   W installed × usage factor\nEquipment:  nameplate × load/diversity factor\nVentilation sensible: Q = ρ·cp·V̇·ΔT = 1.2 × 1005 × V̇ × ΔT\nTR = kW / 3.517")}
<h2 id="example">2. Worked example: a 10 × 8 × 3.5 m lab</h2>
<p>Envelope {Aenv:.0f} m² at U = {Uenv}, ΔT {dTo:.0f} K; {ppl} people; lighting 10 W/m² over {Alight:.0f} m²; equipment {Weq/1000:.0f} kW; fresh air {ach} air changes per hour of {vol:.0f} m³; 10 % margin.</p>
{fig(hb, "Figure 1. Heat gains by source for the example lab: equipment dominates.")}
{table(["Component","W"],[["Envelope",f"{q_cond:.0f}"],["People",f"{q_ppl:.0f}"],["Lighting",f"{q_l:.0f}"],["Equipment",f"{Weq:.0f}"],["Ventilation (sensible)",f"{q_vent:.0f}"],["Total with 10 % margin",f"<b>{q_tot:.0f}</b>"],["Tons of refrigeration",f"<b>{q_tot/3517:.2f} TR</b>"]],num_cols=(1,))}
<h2 id="tips">3. Practical tips</h2>
<ul><li>For server racks and test equipment, use measured power where possible; nameplates often overstate.</li><li>Keep equipment exhaust away from thermostats; consider spot cooling for hot equipment.</li><li>Provide N+1 redundancy for critical rooms (control rooms, data acquisition) so maintenance does not stop tests.</li></ul>
''',
    calcs=[dict(id="hvac", title="Room cooling load",
                presets=[dict(label="Worked example", v=dict(A=100, U=1.5, dT=10, p=6, lw=800, eq=5000, vol=280, ach=0.5, m=10))],
                inputs=[dict(id="A", label="Envelope area (m²)", value=100), dict(id="U", label="U-value (W/m²K)", value=1.5), dict(id="dT", label="Outside–inside ΔT (K)", value=10), dict(id="p", label="People", value=6),
                        dict(id="lw", label="Lighting (W)", value=800), dict(id="eq", label="Equipment (W)", value=5000), dict(id="vol", label="Room volume (m³)", value=280), dict(id="ach", label="Fresh air changes per hour", value=0.5), dict(id="m", label="Margin (%)", value=10)],
                js='''var c=v.U*v.A*v.dT,pp=v.p*130,ve=1.2*1005*(v.vol*v.ach/3600)*v.dT,t=(c+pp+v.lw+v.eq+ve)*(1+v.m/100);
return {rows:[["Envelope",fmt(c,0)+" W"],["People (sens + lat)",fmt(pp,0)+" W"],["Ventilation (sensible)",fmt(ve,0)+" W"],["Total",fmt(t,0)+" W"],["Cooling",fmt(t/3517,2)+" TR"]]};''')],
    quiz=[
        dict(q="One ton of refrigeration equals:", o=["1 kW", "3.517 kW", "12 kW", "0.75 kW"], a=1, e="12,000 BTU/h."),
        dict(q="Sensible heat per seated person is about:", o=["10 W", "75 W", "500 W", "1 kW"], a=1, e="Plus ~55 W latent."),
        dict(q="In a lab with many instruments, the largest load is usually:", o=["People", "Equipment", "Walls", "Lighting"], a=1, e="Electrical input becomes heat."),
        dict(q="Latent heat changes the room's:", o=["Temperature", "Moisture content", "Pressure", "Light"], a=1, e="Humidity."),
        dict(q="Envelope conduction is:", o=["U·A·ΔT", "ρ·cp·V", "P/η", "A/U"], a=0, e="Steady conduction."),
        dict(q="Why add N+1 units for critical rooms?", o=["Lower cost", "Cooling continues when one unit fails or is serviced", "More humidity", "Code requirement always"], a=1, e="Redundancy."),
        dict(q="U = 2, A = 50 m², ΔT = 8 K. Q (W)?", num=800, unit="W", e="2×50×8."),
        dict(q="Load 10.55 kW. Tons of refrigeration?", num=3.0, unit="TR", e="10.55/3.517."),
    ],
    refs=["ASHRAE Handbook — Fundamentals, chapters on load calculations.", "ISHRAE (India), HVAC Handbook.", "Bureau of Indian Standards, National Building Code of India 2016, Part 8 (building services)."],
    links=[("Wikipedia — Cooling load", "https://en.wikipedia.org/wiki/Cooling_load")],
))

# ---------------------------------------------------------------- 76 BOREWELL PUMPING
Qb, Dp_, Lp_, Cw, swl, dd, hdel, resid = 0.003, 0.05, 120.0, 140.0, 60.0, 10.0, 10.0, 5.0
hf = 10.67 * Lp_ * Qb ** 1.852 / (Cw ** 1.852 * Dp_ ** 4.87)
Htot = swl + dd + hdel + hf + resid
Pw = 1000 * 9.81 * Qb * Htot / (0.6 * 0.8) / 1000
ARTICLES.append(dict(
    slug="borewell-pumping-systems", group="facilities",
    title="Borewell Pumping Systems: Total Head, Pipe Friction, Pump Power and Yield",
    short="Borewell pumping", tags=["Borewell", "Pumps", "Water supply", "Hazen–Williams"],
    desc="Designing a submersible borewell pumping system: static water level, drawdown, delivery head, pipe friction by Hazen–Williams, total dynamic head, pump and motor power, yield testing and sustainable pumping rates.",
    blurb="Adding up the heads a submersible pump must overcome, pipe friction, power, and how to judge a borewell's yield.",
    lead="A submersible pump in a borewell must lift water from the pumping water level (static level plus drawdown), up the rising main, to the delivery point and pressure, while overcoming pipe friction. Choosing it well needs a yield test: pumping harder than the borewell can recharge lowers the water level until the pump runs dry.",
    takeaways=[
        "Total dynamic head = static water level + drawdown + height to delivery + friction losses + required residual pressure head.",
        "Hazen–Williams friction: h<sub>f</sub> = 10.67·L·Q<sup>1.852</sup>/(C<sup>1.852</sup>·d<sup>4.87</sup>) (SI units); C ≈ 140–150 for HDPE/PVC.",
        "Friction rises steeply with smaller pipe: halving diameter multiplies friction about 29 times.",
        "Input power = ρgQH/(η<sub>pump</sub>·η<sub>motor</sub>); submersible sets often have combined efficiency 40–55 %.",
        "Specific capacity (yield per metre of drawdown) from a step test sets the safe pumping rate; keep the pump intake well below the lowest pumping level.",
    ],
    body=f'''
<h2 id="head">1. Total head</h2>
{fig(flow(["Static water level|below ground","Drawdown|while pumping","Rising main friction|Hazen–Williams","Lift to tank / delivery","Residual pressure|if required"], h=130), "Figure 1. Components of total dynamic head for a borewell pump.")}
{formula("H_total = SWL + drawdown + h_delivery + h_f + h_residual\nh_f = 10.67·L·Q^1.852 / (C^1.852 · d^4.87)      (Q m³/s, d m, L m)\nP_input = ρ·g·Q·H / (η_pump · η_motor)")}
<h2 id="yield">2. Yield and testing</h2>
<ul><li>Step-drawdown test: pump at increasing rates, record stable drawdown at each; specific capacity = Q/s.</li><li>Constant-rate test (e.g. 8–24 h) and recovery test show whether the aquifer sustains the rate.</li>
<li>Set the pump intake several metres below the lowest expected pumping level and above the bottom to avoid silt; use dry-run protection.</li><li>Seasonal water level changes can be tens of metres in hard-rock areas: design for the summer level.</li></ul>
<h2 id="example">3. Worked example</h2>
<p>Q = {Qb*1000:.0f} L/s ({Qb*3600:.1f} m³/h), {Dp_*1000:.0f} mm HDPE (C = {Cw:.0f}) total {Lp_:.0f} m, SWL {swl:.0f} m, drawdown {dd:.0f} m, delivery height {hdel:.0f} m, residual {resid:.0f} m, η<sub>pump</sub> 0.6, η<sub>motor</sub> 0.8.</p>
{table(["Quantity","Value"],[["Pipe friction",f"{hf:.2f} m"],["Total head",f"<b>{Htot:.1f} m</b>"],["Input power",f"<b>{Pw:.2f} kW</b>"],["Energy per m³",f"{Pw/(Qb*3600):.2f} kWh/m³"]],num_cols=(1,))}
''',
    calcs=[dict(id="bw", title="Borewell pump head and power",
                presets=[dict(label="Worked example", v=dict(Q=3, d=50, L=120, C=140, swl=60, dd=10, h=10, res=5, ep=60, em=80))],
                inputs=[dict(id="Q", label="Flow (L/s)", value=3), dict(id="d", label="Pipe inner diameter (mm)", value=50), dict(id="L", label="Total pipe length (m)", value=120), dict(id="C", label="Hazen–Williams C", value=140),
                        dict(id="swl", label="Static water level (m)", value=60), dict(id="dd", label="Drawdown (m)", value=10), dict(id="h", label="Height to delivery (m)", value=10), dict(id="res", label="Residual pressure head (m)", value=5),
                        dict(id="ep", label="Pump efficiency (%)", value=60), dict(id="em", label="Motor efficiency (%)", value=80)],
                js='''var Q=v.Q/1000,d=v.d/1000,hf=10.67*v.L*Math.pow(Q,1.852)/(Math.pow(v.C,1.852)*Math.pow(d,4.87)),H=v.swl+v.dd+v.h+hf+v.res,P=1000*9.81*Q*H/(v.ep/100*v.em/100)/1000,vel=Q/(Math.PI*d*d/4);
return {rows:[["Pipe velocity",fmt(vel,2)+" m/s"],["Friction loss",fmt(hf,2)+" m"],["Total head",fmt(H,1)+" m"],["Input power",fmt(P,2)+" kW",fmt(P/0.746,1)+" hp"],["Energy per m³",fmt(P/(Q*3600),3)+" kWh/m³"]],
verdict:vel>2?["caution","Velocity above 2 m/s: high friction; consider a larger pipe."]:["ok","Pipe velocity reasonable."]};''')],
    quiz=[
        dict(q="Total dynamic head includes:", o=["Only static water level", "SWL, drawdown, delivery height, friction and residual pressure", "Only friction", "Pump efficiency"], a=1, e="All heads the pump must overcome."),
        dict(q="Halving pipe diameter multiplies friction by about:", o=["2", "4", "29", "100"], a=2, e="d^4.87 → 2^4.87 ≈ 29."),
        dict(q="Specific capacity is:", o=["Pump power / flow", "Yield per metre of drawdown", "Tank volume", "Static level"], a=1, e="Q/s."),
        dict(q="Why design for the summer water level?", o=["Cheaper", "Water levels fall seasonally", "Code", "No reason"], a=1, e="Lowest level sets the head and intake position."),
        dict(q="Dry-run protection prevents:", o=["Overpressure", "Pump damage when water level falls below intake", "Leaks", "Frost"], a=1, e="Pump cooling and lubrication by water."),
        dict(q="Hazen–Williams C for new plastic pipe is about:", o=["60", "100", "140–150", "300"], a=2, e="Smooth pipe."),
        dict(q="Q = 2 L/s, H = 80 m, combined efficiency 0.5. Input power (kW)?", num=3.139, unit="kW", e="1000×9.81×0.002×80/0.5 = 3.14 kW."),
        dict(q="SWL 40, drawdown 8, delivery 12, friction 3, residual 0. Total head (m)?", num=63, unit="m", e="Sum."),
    ],
    refs=["Driscoll, F. G., Groundwater and Wells, 2nd ed., Johnson Screens, 1986.", "IS 8034, Submersible pumpsets — Specification.", "CGWB (Central Ground Water Board, India) manuals on pumping tests.", "Hazen, A. and Williams, G. S., Hydraulic Tables, 1905."],
    links=[("Wikipedia — Hazen–Williams equation", "https://en.wikipedia.org/wiki/Hazen%E2%80%93Williams_equation"), ("Wikipedia — Submersible pump", "https://en.wikipedia.org/wiki/Submersible_pump")],
))

# ---------------------------------------------------------------- 77 PF CORRECTION
Ppf, pf1, pf2, tariff = 200.0, 0.75, 0.95, 350.0
kvar = Ppf * (math.tan(math.acos(pf1)) - math.tan(math.acos(pf2)))
kva1, kva2 = Ppf / pf1, Ppf / pf2
save = (kva1 - kva2) * tariff
ARTICLES.append(dict(
    slug="power-factor-correction", group="facilities",
    title="Power-Factor Correction: kvar Sizing, APFC Panels, Detuned Reactors and Savings",
    short="PF correction", tags=["Power factor", "Capacitors", "Harmonics", "Energy"],
    desc="Correcting low power factor with capacitor banks: kvar calculation, reduction in kVA and current, automatic power factor control panels, harmonics and detuned reactors, motor-terminal correction and demand-charge savings.",
    blurb="How much capacitor kvar is needed, what it saves in kVA, current and demand charges, and when to use detuned reactors.",
    lead="Induction motors and transformers draw reactive power that does no useful work but loads cables, transformers and the supply. Capacitor banks supply that reactive power locally, raising the power factor, reducing current and kVA demand, and often avoiding utility penalties. With harmonic-producing loads such as drives, capacitors must be detuned to avoid resonance.",
    takeaways=[
        "Required kvar = P·(tan φ₁ − tan φ₂), where φ = acos(PF).",
        "Raising PF from 0.75 to 0.95 cuts kVA and current by about 21 % for the same kW.",
        "Automatic power factor control (APFC) panels switch capacitor steps to follow the load.",
        "With VFDs and other non-linear loads, use detuned reactors (typically 7 % for 189 Hz tuning on 50 Hz systems) to avoid harmonic resonance.",
        "Savings come from kVA-based demand charges, PF incentives/penalties and lower losses in cables and transformers.",
    ],
    body=f'''
<h2 id="calc">1. Sizing</h2>
{formula("Q_c (kvar) = P (kW) · [tan(acos PF1) − tan(acos PF2)]\nkVA = kW / PF\nCurrent reduction = 1 − PF1/PF2")}
<h2 id="where">2. Where to correct</h2>
{table(["Location","Pros","Cons"],[["Central (main LV panel, APFC)","Fewest capacitors, automatic","Internal cables still carry reactive current"],["Group (MCC)","Reduces feeder losses","More panels"],["Individual motor terminals","Maximum loss reduction; switched with motor","Must not exceed motor magnetising kvar (self-excitation risk)"]])}
<h2 id="harmonics">3. Harmonics and detuning</h2>
<p>Capacitors and system inductance form a resonant circuit. If its frequency is near a harmonic produced by drives (5th, 7th…), currents and voltages amplify, blowing fuses and capacitors. A series reactor of p % detunes the bank: resonance f = f₁/√p, so 7 % on 50 Hz gives about 189 Hz, below the 5th harmonic (250 Hz). Detuned banks need capacitors rated for the voltage rise across the reactor.</p>
<h2 id="example">4. Worked example</h2>
<p>Load {Ppf:.0f} kW at PF {pf1}, target {pf2}, demand charge ₹{tariff:.0f} per kVA per month (example).</p>
{table(["Quantity","Value"],[["Capacitor required",f"<b>{kvar:.1f} kvar</b>"],["kVA before / after",f"{kva1:.1f} / {kva2:.1f}"],["Current reduction",f"{(1-pf1/pf2)*100:.1f} %"],["Demand saving",f"<b>₹{save:,.0f} per month</b>"]],num_cols=(1,))}
''',
    calcs=[dict(id="pfc", title="Capacitor kvar and savings",
                presets=[dict(label="Worked example", v=dict(P=200, pf1=0.75, pf2=0.95, V=415, tar=350, p=7))],
                inputs=[dict(id="P", label="Load (kW)", value=200), dict(id="pf1", label="Existing PF", value=0.75), dict(id="pf2", label="Target PF", value=0.95), dict(id="V", label="Line voltage (V)", value=415),
                        dict(id="tar", label="Demand charge (₹/kVA/month)", value=350), dict(id="p", label="Detuning reactor (%)", value=7)],
                js='''var t1=Math.tan(Math.acos(v.pf1)),t2=Math.tan(Math.acos(v.pf2)),q=v.P*(t1-t2),k1=v.P/v.pf1,k2=v.P/v.pf2,I1=k1*1000/(Math.sqrt(3)*v.V),I2=k2*1000/(Math.sqrt(3)*v.V),fr=v.p>0?50/Math.sqrt(v.p/100):Infinity;
return {rows:[["Capacitor",fmt(q,1)+" kvar"],["kVA",fmt(k1,1)+" → "+fmt(k2,1)],["Current",fmt(I1,0)+" → "+fmt(I2,0)+" A"],["Monthly demand saving","₹ "+fmt((k1-k2)*v.tar,0)],["Detuned resonance",isFinite(fr)?fmt(fr,0)+" Hz":"not detuned"]],
verdict:(isFinite(fr)&&fr>230)?["caution","Resonance close to the 5th harmonic (250 Hz): increase reactor percentage."]:["ok","Detuning keeps resonance below the 5th harmonic."]};''')],
    quiz=[
        dict(q="Capacitors improve PF by supplying:", o=["Real power", "Reactive power locally", "Harmonics", "Voltage only"], a=1, e="kvar compensation."),
        dict(q="Raising PF from 0.8 to 1.0 for the same kW reduces current by:", o=["0 %", "20 %", "50 %", "80 %"], a=1, e="1 − 0.8."),
        dict(q="A 7 % detuned reactor on 50 Hz tunes the bank to about:", o=["50 Hz", "189 Hz", "250 Hz", "350 Hz"], a=1, e="50/√0.07."),
        dict(q="Why detune with VFD loads?", o=["Lower cost", "Avoid resonance with harmonics", "Raise PF to 1", "Reduce kW"], a=1, e="Harmonic amplification."),
        dict(q="APFC panels:", o=["Fix capacitors permanently", "Switch capacitor steps to follow load", "Generate kW", "Filter all harmonics"], a=1, e="Automatic control."),
        dict(q="Motor-terminal capacitors must not exceed:", o=["Motor kW", "Motor no-load magnetising kvar", "Transformer rating", "1 kvar"], a=1, e="Self-excitation risk."),
        dict(q="P = 100 kW, PF 0.8 → 1.0. kvar needed?", num=75, unit="kvar", e="100 × 0.75."),
        dict(q="300 kW at PF 0.9. kVA?", num=333.3, unit="kVA", e="300/0.9."),
    ],
    refs=["IEC 60831-1/-2, Shunt power capacitors of the self-healing type for AC systems up to 1 kV.", "IEEE 1036, Guide for Application of Shunt Power Capacitors.", "IEEE 519, Harmonic Control in Electric Power Systems.", "Bureau of Energy Efficiency (India), Energy Efficiency in Electrical Utilities — Electrical system chapter."],
    links=[("Wikipedia — Power factor", "https://en.wikipedia.org/wiki/Power_factor")],
))
