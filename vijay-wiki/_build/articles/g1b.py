"""
TOOL:    Vijay_Wiki articles — group 1b (balancing, dynamometers, lube systems & cleanliness, couplings)
FAMILY:  vijay-wiki
VERSION: 1.0.0
DATE:    2026-11-24
CHAT:    claude.ai — Vijay_Wiki: build all suggested topics in groups and upload
CHANGES: 1.0.0 Initial four articles
"""
import math, cmath
from wiki import plot, flow, bars, fig, table, box, formula

ARTICLES = []

# =====================================================================================
# 5. ROTOR BALANCING
# =====================================================================================
mr, nr, G = 25.0, 3000.0, 2.5
w = 2 * math.pi * nr / 60
e_per = G * 1000 / w
U_per = mr * e_per
O = cmath.rect(4.0, math.radians(30)); Tt = cmath.rect(6.0, math.radians(75)); tw = 10.0
effect = (Tt - O) / tw
corr = -O / effect
cm, ca = abs(corr), math.degrees(cmath.phase(corr)) % 360

grades = [0.4, 1, 2.5, 6.3, 16, 40]
gplot = plot([dict(pts=[(n, g * 1000 / (2 * math.pi * n / 60)) for n in [100 * 1.06 ** k for k in range(0, 120)] if n <= 100000], label=f"G{g}",
                   at=3000) for g in grades],
             "maximum service speed (rpm)", "permissible residual unbalance e_per (g·mm/kg = µm)", xlim=(100, 100000), ylim=(0.1, 1000), xlog=True, ylog=True, h=360)

polar = '''<svg viewBox="0 0 900 340" role="img" aria-label="Single-plane balancing vector diagram">
<circle cx="300" cy="170" r="140" fill="none" class="grid" stroke="var(--line)"/><circle cx="300" cy="170" r="70" fill="none" stroke="var(--line)"/>
<line x1="150" y1="170" x2="450" y2="170" class="ax"/><line x1="300" y1="20" x2="300" y2="320" class="ax"/>
<text x="455" y="174" font-size="12">0°</text><text x="292" y="16" font-size="12">90°</text>
<line x1="300" y1="170" x2="397" y2="114" stroke="var(--blue)" stroke-width="4"/><text x="402" y="110" font-size="13" font-weight="700">O (initial 4.0 @ 30°)</text>
<line x1="300" y1="170" x2="343" y2="8" stroke="var(--orange)" stroke-width="4" stroke-dasharray="12 7"/>
<line x1="397" y1="114" x2="343" y2="8" stroke="var(--purple)" stroke-width="3"/>
<text x="230" y="40" font-size="13" font-weight="700">O+T (6.0 @ 75°)</text>
<text x="378" y="60" font-size="13" font-weight="700">effect of trial</text>
<g font-size="13"><text x="560" y="80">1. Measure O (amplitude, phase).</text><text x="560" y="105">2. Add trial mass, measure O+T.</text>
<text x="560" y="130">3. Effect per gram = (O+T − O)/m_trial.</text><text x="560" y="155">4. Correction = −O / effect.</text>
<text x="560" y="180">5. Remove trial (or keep and adjust),</text><text x="560" y="198">fit correction, verify.</text></g>
</svg>'''

ARTICLES.append(dict(
    slug="rotor-balancing", group="rotating",
    title="Rotor Balancing: ISO 21940 Grades, Static and Dynamic Unbalance, Field Balancing",
    short="Rotor balancing",
    tags=["Balancing", "ISO 21940", "Vibration", "Rotors"],
    desc="Static, couple and dynamic unbalance, ISO 21940-11 balance quality grades, permissible residual unbalance and single-plane trial-weight field balancing.",
    blurb="Balance quality grades, permissible residual unbalance and the trial-weight method for single-plane field balancing.",
    lead="Every rotor has some mass centre offset from its axis of rotation. At speed this offset produces a rotating force that grows with the square of speed and shows up as vibration at once per revolution. Balancing reduces the offset to an amount that the bearings and structure can tolerate, which ISO 21940-11 expresses as a balance quality grade.",
    takeaways=[
        "Unbalance force F = U·ω² (U in kg·m). It rises with the square of speed.",
        "ISO 21940-11 grade G = e<sub>per</sub>·ω in mm/s. Permissible residual unbalance U<sub>per</sub> = m·G·1000/ω (g·mm).",
        "Typical grades: G1 precision spindles, G2.5 turbines, compressors and high-speed drives, G6.3 fans, pumps and general machinery.",
        "Narrow rotors (disc-like) need single-plane balancing; long rotors need two planes to remove couple unbalance.",
        "Field balancing uses a trial mass: measure the vibration vector before and after, and calculate the correction from the change.",
    ],
    body=f'''
<h2 id="kinds">1. Kinds of unbalance</h2>
{table(["Kind","Description","Correction"],[
["Static","Mass centre offset parallel to the axis. Rotor rolls to the heavy spot on knife edges.","One plane"],
["Couple","Principal axis tilted about the mass centre; statically balanced but rocks at speed","Two planes, equal and opposite"],
["Dynamic","Combination of static and couple (the general case)","Two planes"],
])}
{formula("Unbalance                  U = m_u · r            (g·mm)\nCentrifugal force          F = U · ω²             (with U in kg·m, ω in rad/s)\nSpecific unbalance         e = U / m_rotor        (g·mm/kg = µm)\nBalance quality grade      G = e · ω              (mm/s)")}

<h2 id="grades">2. Balance quality grades (ISO 21940-11)</h2>
{fig(gplot, "Figure 1. Permissible specific residual unbalance against maximum service speed for common balance grades (log–log). For a given grade, permissible unbalance falls as speed rises.")}
{table(["Grade","Typical rotors"],[
["G0.4","Gyroscopes, precision spindles"],["G1","Grinding spindles, small high-speed electric armatures, tape drives"],
["G2.5","Gas and steam turbines, turbo-compressors, turbine-driven pumps, machine-tool drives, high-speed gearbox shafts"],
["G6.3","Fans, pumps, flywheels, general electric motors, machine-tool parts, process machinery"],
["G16","Drive shafts, crushing machines, agricultural machinery parts"],["G40","Car wheels and rims, slow crankshafts"],
])}
<p>Split U<sub>per</sub> between correction planes in proportion to the bearing loads. For a symmetric rotor between bearings, put half in each plane.</p>
<h3 id="ex-grade">Worked example</h3>
<p>Rotor mass {mr:.0f} kg, service speed {nr:,.0f} rpm, grade G{G}.</p>
{table(["Step","Result"],[["ω = 2πn/60",f"{w:.1f} rad/s"],["e_per = G·1000/ω",f"{e_per:.2f} g·mm/kg"],["U_per = m·e_per",f"<b>{U_per:.0f} g·mm</b>"],
["Per plane (symmetric)",f"{U_per/2:.0f} g·mm"],["As a mass at 50 mm radius, per plane",f"{U_per/2/50:.2f} g"]],num_cols=(1,))}

<h2 id="field">3. Single-plane field balancing (trial-weight method)</h2>
{fig(polar, "Figure 2. Vector method: the change between the initial reading O and the reading with a trial mass gives the rotor's response per gram; the correction cancels O.")}
{formula("Effect per gram   A = (V_trial − V_0) / m_trial      (complex: amplitude ∠ phase)\nCorrection mass   m_c = − V_0 / A\nPlace at angle    ∠m_c measured from the trial mass position, in the rotation/phase convention used")}
<h3 id="ex-field">Worked example</h3>
<p>Initial vibration 4.0 mm/s ∠30°. Trial mass 10 g at 0° gives 6.0 mm/s ∠75°.</p>
{table(["Step","Result"],[["Effect per gram A",f"{abs(effect):.3f} mm/s per g ∠{math.degrees(cmath.phase(effect))%360:.0f}°"],
["Correction m_c = −V0/A",f"<b>{cm:.1f} g at {ca:.0f}°</b> (relative to trial position)"]],num_cols=(1,))}
{box("note","Practical points","Choose a trial mass that changes vibration by at least 30 % in amplitude or 30° in phase. Keep the same speed, sensor position and phase reference for every run. Check that the problem really is unbalance: 1× radial vibration, steady phase, and amplitude rising with the square of speed below resonance.")}
''',
    calcs=[
        dict(id="uper", title="Permissible residual unbalance (ISO 21940-11)",
             presets=[dict(label="25 kg, 3000 rpm, G2.5", v=dict(m=25, n=3000, G="2.5", r=50)), dict(label="2 kg, 24,000 rpm, G1", v=dict(m=2, n=24000, G="1", r=20))],
             inputs=[dict(id="m", label="Rotor mass (kg)", value=25), dict(id="n", label="Max service speed (rpm)", value=3000),
                     dict(id="G", label="Balance grade", value="2.5", options=[(g, f"G{g}") for g in ["0.4", "1", "2.5", "6.3", "16", "40"]]),
                     dict(id="r", label="Correction radius (mm)", value=50)],
             js='''var w=2*Math.PI*v.n/60,G=parseFloat(v.G),e=G*1000/w,U=v.m*e,F=U*1e-6*w*w;
return {rows:[["ω",fmt(w,1)+" rad/s"],["e_per",fmt(e,3)+" g·mm/kg","= µm"],["U_per total",fmt(U,1)+" g·mm"],["Per plane (symmetric)",fmt(U/2,1)+" g·mm"],["Mass per plane at radius",fmt(U/2/v.r,3)+" g"],["Residual force at U_per",fmt(F,1)+" N"]]};'''),
        dict(id="trial", title="Single-plane trial-weight solver",
             presets=[dict(label="Worked example", v=dict(a0=4, p0=30, a1=6, p1=75, mt=10))],
             inputs=[dict(id="a0", label="Initial amplitude", value=4), dict(id="p0", label="Initial phase (°)", value=30),
                     dict(id="a1", label="Amplitude with trial", value=6), dict(id="p1", label="Phase with trial (°)", value=75), dict(id="mt", label="Trial mass (g)", value=10)],
             js='''var r=Math.PI/180,x0=v.a0*Math.cos(v.p0*r),y0=v.a0*Math.sin(v.p0*r),x1=v.a1*Math.cos(v.p1*r),y1=v.a1*Math.sin(v.p1*r);
var ex=(x1-x0)/v.mt,ey=(y1-y0)/v.mt,den=ex*ex+ey*ey;var cx=-(x0*ex+y0*ey)/den,cy=-(y0*ex-x0*ey)/den;
var cm=Math.sqrt(cx*cx+cy*cy),ca=(Math.atan2(cy,cx)/r+360)%360;var chg=Math.abs(v.a1-v.a0)/v.a0;
return {rows:[["Effect per gram",fmt(Math.sqrt(den),4)+" per g",fmt((Math.atan2(ey,ex)/r+360)%360,0)+"°"],["Correction mass",fmt(cm,2)+" g"],["Correction angle",fmt(ca,0)+"°","relative to trial position"]],
verdict:chg<0.3&&Math.abs(v.p1-v.p0)<30?["caution","Trial response is small (< 30 % and < 30°): use a larger trial mass for accuracy."]:["ok","Trial response is large enough for a reliable solution."]};'''),
    ],
    quiz=[
        dict(q="Unbalance force increases with speed:", o=["Linearly", "With the square", "With the cube", "Not at all"], a=1, e="F = U·ω²."),
        dict(q="Balance grade G6.3 is typical for:", o=["Gyroscopes", "Fans and pumps", "Car wheels", "Precision grinding spindles"], a=1, e="G6.3 covers general machinery such as fans, pumps and motors."),
        dict(q="A statically balanced rotor can still vibrate because of:", o=["Couple unbalance", "Gravity", "Static unbalance", "Bearing preload"], a=0, e="Couple unbalance is invisible on knife edges but rocks the rotor at speed."),
        dict(q="Long rotors normally need balancing in:", o=["One plane", "Two planes", "Three planes always", "No planes"], a=1, e="Two planes correct both static and couple unbalance."),
        dict(q="In the trial-weight method the correction mass equals:", o=["The trial mass", "−V0 divided by the effect per gram", "V0 × trial mass", "Effect × V0"], a=1, e="m_c = −V0/A (vector division)."),
        dict(q="A good trial mass changes the reading by at least:", o=["1 %", "30 % or 30°", "100 %", "Any change"], a=1, e="Small changes make the solution sensitive to measurement noise."),
        dict(q="Rotor 10 kg at 6000 rpm, G2.5. Calculate U_per in g·mm.", num=39.8, unit="g·mm", e="ω = 628.3 rad/s; e = 2500/628.3 = 3.98 µm; U = 10 × 3.98 = 39.8 g·mm."),
        dict(q="An unbalance of 100 g·mm at 3000 rpm produces what force in N?", num=9.87, unit="N", e="F = 100e-6 kg·m × 314.16² = 9.87 N."),
    ],
    refs=["ISO 21940-11:2016, Mechanical vibration — Rotor balancing — Part 11: Procedures and tolerances for rotors with rigid behaviour (formerly ISO 1940-1).",
          "ISO 21940-12, Procedures and tolerances for rotors with flexible behaviour.", "Wowk, V., Machinery Vibration: Balancing, McGraw-Hill, 1995.",
          "Rao, J. S., Rotor Dynamics, New Age International.", "Schenck balancing handbooks."],
    links=[("Wikipedia — Balancing machine", "https://en.wikipedia.org/wiki/Balancing_machine")],
))

# =====================================================================================
# 6. DYNAMOMETERS
# =====================================================================================
Pd, nd, armL, dTw = 150.0, 12000.0, 0.30, 20.0
Td = Pd * 1000 / (2 * math.pi * nd / 60)
Fd = Td / armL
Qw = Pd * 1000 / (1000 * 4186 * dTw) * 60000
Tmax, Pmax, nmax = 400.0, 200.0, 20000.0
nb = Pmax * 1000 / Tmax / (2 * math.pi / 60)


def env(n):
    if n <= 0:
        return 0
    return min(Tmax * min(1, n / 1500) if n < 1500 else Tmax, Pmax * 1000 / (2 * math.pi * n / 60))


envplot = plot([dict(pts=[(n, env(n)) for n in range(50, int(nmax) + 1, 100)], label="torque limit", at=2500),
                dict(pts=[(n, env(n) * 2 * math.pi * n / 60 / 1000) for n in range(50, int(nmax) + 1, 100)], label="power (kW) on the same axis", at=14000)],
               "speed (rpm)", "torque (N·m) / power (kW)", xlim=(0, 21000), ylim=(0, 450), points=[(nd, Td, f"test point {Td:.0f} N·m @ {nd:,.0f} rpm")], h=340)

ARTICLES.append(dict(
    slug="dynamometers", group="rotating",
    title="Dynamometers: Types, Operating Envelope, Torque Measurement and Cooling",
    short="Dynamometers",
    tags=["Dynamometer", "Testing", "Torque", "Power"],
    desc="Absorption and motoring dynamometers (eddy current, hydraulic, AC), the torque–speed–power envelope, trunnion torque measurement and cooling water requirements.",
    blurb="Choosing a dynamometer, checking the test point against its torque, power and speed limits, and sizing its cooling.",
    lead="A dynamometer loads a machine and measures the torque and speed it delivers, so that power, efficiency and endurance can be measured. Absorbing dynamometers turn the power into heat; regenerative ones return it to the grid. The key selection question is whether every test point lies inside the dynamometer's torque–speed–power envelope.",
    takeaways=[
        "Power P = T·ω: P (kW) = T (N·m) × n (rpm) / 9,549.",
        "Every dynamometer has three limits: maximum torque at low speed, maximum power in the middle, and maximum speed.",
        "Eddy-current dynamometers absorb only and lose torque near zero speed; AC dynamometers can motor and absorb down to standstill.",
        "Trunnion-mounted machines measure torque as reaction force × arm length; inline torque flanges measure it directly in the shaft.",
        "Absorbed power ends up as heat: cooling water flow Q = P/(ρ·c·ΔT), roughly 0.7 L/min per kW at 20 K rise.",
    ],
    body=f'''
<h2 id="types">1. Types</h2>
{table(["Type","Absorb / motor","Strengths","Limitations"],[
["Eddy current","Absorb","Fast control, simple, wide speed range, good at high speed","No torque at zero speed; needs cooling water; cannot drive"],
["Hydraulic (water brake)","Absorb","Very high power density, low inertia, cheap per kW","Slower control, poor at low speed, water quality matters"],
["Friction / prony brake","Absorb","Simple","Wear, poor control; teaching only"],
["Hysteresis","Absorb","Torque at zero speed, smooth","Small power (motors, small devices)"],
["AC (asynchronous / permanent magnet) with drive","Absorb and motor","Four-quadrant, regenerative, full torque at standstill, simulation","Higher cost, higher inertia, needs grid connection"],
["DC with drive","Absorb and motor","Older four-quadrant standard","Brush maintenance"],
])}

<h2 id="envelope">2. The operating envelope</h2>
{fig(envplot, f"Figure 1. Example envelope: {Tmax:.0f} N·m torque limit, {Pmax:.0f} kW power limit (constant power from about {nb:,.0f} rpm), {nmax:,.0f} rpm speed limit. The marked test point lies inside the envelope.")}
{formula("P [kW] = T [N·m] × n [rpm] / 9549\nBase speed (start of constant power)  n_b = P_max / T_max × 9549")}
<p>Check transient points too: acceleration needs extra torque T = J·α, and a test that reverses the power flow (driving the unit under test) needs a motoring machine.</p>

<h2 id="measurement">3. Measuring torque and speed</h2>
{fig(flow(["Unit under test|drives shaft","Inline torque flange|strain gauge, telemetry","Dynamometer rotor|absorbs power","Stator on trunnions|reaction torque","Load cell on arm|F × L = T"], h=140), "Figure 2. Two ways to measure torque: in the shaft (inline flange) or as the reaction on a trunnion-mounted stator.")}
<ul><li><b>Trunnion load cell:</b> T = F × L. Calibrate with dead weights on a calibration arm. Bearing friction in the trunnions and hose stiffness cause small errors.</li>
<li><b>Inline torque flange:</b> measures shaft torque directly, including during transients; no trunnion errors. Accuracy class typically 0.05–0.1 % of full scale.</li>
<li><b>Speed:</b> magnetic pickup on a toothed wheel or encoder. Frequency (Hz) = teeth × rpm / 60.</li></ul>

<h2 id="cooling">4. Cooling</h2>
{formula("Water flow   Q = P / (ρ · c · ΔT)      (ρ = 1000 kg/m³, c = 4186 J/kg·K)\n≈ 0.72 L/min per kW at ΔT = 20 K")}
<p>Eddy-current machines limit outlet temperature (often about 60 °C) and need clean, softened water with a minimum inlet pressure; low flow causes local boiling and loss plate distortion.</p>

<h2 id="example">5. Worked example</h2>
<p>Absorb {Pd:.0f} kW at {nd:,.0f} rpm with a trunnion arm of {armL} m and a 20 K water temperature rise.</p>
{table(["Step","Result"],[["T = P × 9549 / n",f"{Td:.1f} N·m"],["Load cell force F = T/L",f"{Fd:.0f} N"],["Cooling water",f"<b>{Qw:.0f} L/min</b>"],
["Inside envelope?",f"Yes: {Td:.0f} N·m &lt; {Tmax:.0f} N·m and {Pd:.0f} kW &lt; {Pmax:.0f} kW"]],num_cols=(1,))}
''',
    calcs=[dict(id="dyno", title="Dynamometer envelope and cooling check",
                presets=[dict(label="Worked example", v=dict(n=12000, P=150, Tm=400, Pm=200, nm=20000, L=0.3, dT=20)),
                         dict(label="Low-speed high torque", v=dict(n=800, P=40, Tm=400, Pm=200, nm=20000, L=0.3, dT=20))],
                inputs=[dict(id="n", label="Test speed (rpm)", value=12000), dict(id="P", label="Test power (kW)", value=150),
                        dict(id="Tm", label="Dyno max torque (N·m)", value=400), dict(id="Pm", label="Dyno max power (kW)", value=200), dict(id="nm", label="Dyno max speed (rpm)", value=20000),
                        dict(id="L", label="Trunnion arm (m)", value=0.3), dict(id="dT", label="Water ΔT (K)", value=20)],
                js='''var T=v.P*9549/v.n,F=T/v.L,Q=v.P*1000/(1000*4186*v.dT)*60000,nb=v.Pm*9549/v.Tm;
var ok=T<=v.Tm&&v.P<=v.Pm&&v.n<=v.nm;var pts=[],pp=[];for(var n=50;n<=v.nm;n+=v.nm/200){var t=Math.min(v.Tm,v.Pm*9549/n);pts.push([n,t]);}
return {rows:[["Test torque",fmt(T,1)+" N·m"],["Load cell force",fmt(F,0)+" N"],["Base speed of dyno",fmt(nb,0)+" rpm"],["Cooling water",fmt(Q,1)+" L/min"]],
verdict:ok?["ok","Test point inside the torque, power and speed envelope."]:["bad","Outside the envelope: "+(T>v.Tm?"torque ":"")+(v.P>v.Pm?"power ":"")+(v.n>v.nm?"speed ":"")+"limit exceeded."],
svg:plotSVG([{pts:pts,label:"torque limit"}],{xlabel:"speed (rpm)",ylabel:"torque (N·m)",xmin:0,ymin:0,ymax:v.Tm*1.3,marks:[[v.n,T,"test point"]]}),caption:"Dynamometer torque limit and the test point."};''')],
    quiz=[
        dict(q="P (kW) for 100 N·m at 9549 rpm is:", o=["10", "100", "955", "1"], a=1, e="P = 100 × 9549/9549 = 100 kW."),
        dict(q="Which dynamometer cannot produce torque at zero speed?", o=["AC four-quadrant", "Eddy current", "Hysteresis", "DC with drive"], a=1, e="Eddy currents need relative motion."),
        dict(q="Above base speed, the dynamometer is limited by:", o=["Torque", "Power", "Water pressure only", "Nothing"], a=1, e="In the constant-power region, allowable torque falls as 1/n."),
        dict(q="A trunnion dynamometer measures torque as:", o=["Shaft strain", "Reaction force × arm length", "Current × voltage", "Speed × slip"], a=1, e="T = F·L on the stator reaction arm."),
        dict(q="To test a machine that must be driven (motored), you need:", o=["Water brake", "Eddy current", "AC or DC dynamometer with drive", "Prony brake"], a=2, e="Only electrical machines with drives can motor."),
        dict(q="Most absorbed power in an eddy-current dyno ends up as:", o=["Electricity to grid", "Heat in cooling water", "Noise", "Stored energy"], a=1, e="Eddy-current losses heat the loss plates, cooled by water."),
        dict(q="Calculate torque (N·m) at 75 kW and 3000 rpm.", num=238.7, unit="N·m", e="T = 75 × 9549/3000 = 238.7 N·m."),
        dict(q="Cooling water (L/min) for 100 kW at ΔT = 25 K (ρ = 1000, c = 4186)?", num=57.3, unit="L/min", e="Q = 100,000/(1000 × 4186 × 25) × 60,000 = 57.3 L/min."),
    ],
    refs=["Martyr, A. J. and Plint, M. A., Engine Testing: Theory and Practice, 4th ed., Butterworth-Heinemann, 2012.", "Atkins, R. D., An Introduction to Engine Testing and Development, SAE International.",
          "ISO 1585 / SAE J1349: engine power test codes (net power and correction).", "Dynamometer makers' technical data (eddy current, AC and hydraulic machines)."],
    links=[("Wikipedia — Dynamometer", "https://en.wikipedia.org/wiki/Dynamometer")],
))

# =====================================================================================
# 7. LUBRICATION SYSTEMS & CLEANLINESS
# =====================================================================================
Pin, eta, dTo, rho_o, c_o = 100.0, 0.97, 10.0, 870.0, 2000.0
Ploss = Pin * (1 - eta) * 1000
Qo = Ploss / (rho_o * c_o * dTo) * 60000
tank = 3 * Qo
beta = 200
ISO = [(0.01, 0.02), (0.02, 0.04), (0.04, 0.08), (0.08, 0.16), (0.16, 0.32), (0.32, 0.64), (0.64, 1.3), (1.3, 2.5), (2.5, 5), (5, 10), (10, 20), (20, 40),
       (40, 80), (80, 160), (160, 320), (320, 640), (640, 1300), (1300, 2500), (2500, 5000), (5000, 10000), (10000, 20000), (20000, 40000), (40000, 80000)]
iso_rows = [[str(i + 1), f"{lo:g}", f"{hi:g}"] for i, (lo, hi) in enumerate(ISO) if i + 1 >= 8]

ARTICLES.append(dict(
    slug="lubrication-systems-and-oil-cleanliness", group="tribology",
    title="Circulating Oil Systems: Heat Balance, Filtration and ISO 4406 Cleanliness",
    short="Oil systems and cleanliness",
    tags=["Lubrication", "ISO 4406", "Filtration", "Gearboxes"],
    desc="Circulating lubrication systems for gearboxes and bearings: oil flow from heat balance, tank sizing, filter beta ratios, ISO 4406 cleanliness codes and oil life.",
    blurb="Sizing oil flow from the heat to be removed, choosing filtration by beta ratio, and reading ISO 4406 cleanliness codes.",
    lead="In high-speed gearboxes and test rigs, oil does three jobs: it separates surfaces, carries heat away and carries dirt to the filter. Most lubrication-related failures come from too little flow, too hot oil, or too many particles. This article covers the heat balance, filtration and cleanliness targets that keep a circulating system healthy.",
    takeaways=[
        "Oil flow is set by heat: Q = P<sub>loss</sub>/(ρ·c·ΔT). A 3 kW loss with 10 K rise needs about 10 L/min.",
        "Industrial tanks hold 3–5 minutes of flow so air and particles can settle; compact (mobile, airborne) systems hold far less and rely on de-aeration and fine filters.",
        "Filter beta ratio β<sub>x</sub> = particles upstream ÷ downstream at size x µm. β = 200 means 99.5 % capture.",
        "ISO 4406 gives three code numbers for particles ≥ 4, ≥ 6 and ≥ 14 µm(c) per mL. Each step up doubles the count.",
        "Oil oxidises about twice as fast for every 10 °C above about 60 °C; keep bulk temperature controlled.",
    ],
    body=f'''
<h2 id="layout">1. System layout</h2>
{fig(flow(["Tank|settling, de-aeration","Pump|positive displacement","Relief valve|limits pressure","Filter|β rating, ΔP switch","Cooler|oil–water / oil–air","Distribution|jets, orifices","Machine|returns to tank"], h=140), "Figure 1. Typical circulating lubrication system. Instruments: inlet pressure and temperature, filter differential pressure, return temperature, tank level, particle and water monitoring.")}
{table(["Element","Design points"],[
["Pump","Size for required flow plus 20–30 % margin for wear and viscosity change"],
["Relief / pressure control","Protects pump and filter; sets jet pressure (often 1–4 bar for gears and bearings)"],
["Filter","Full-flow pressure filter, 10–25 µm for gearboxes, 3–10 µm for bearings and servo systems; bypass and ΔP indicator"],
["Cooler","Sized for full loss at maximum ambient; thermostatic valve to reach operating temperature quickly"],
["Jets / orifices","Aim at the mesh outlet for cooling and the inlet for lubrication; bearings fed at the cage side"],
["Tank","3–5 × flow per minute for industrial systems; return below oil level; baffles; breather with desiccant"],
])}

<h2 id="heat">2. Heat balance</h2>
{formula("P_loss = P_in · (1 − η)\nQ      = P_loss / (ρ · c · ΔT)      ρ ≈ 850–900 kg/m³, c ≈ 1900–2100 J/kg·K\nRule of thumb: ≈ 3.5 L/min per kW of loss at ΔT = 10 K")}
<h3 id="ex-heat">Worked example</h3>
<p>A gearbox transmits {Pin:.0f} kW at {eta*100:.0f} % efficiency; oil may warm by {dTo:.0f} K.</p>
{table(["Step","Result"],[["Loss",f"{Ploss/1000:.1f} kW"],["Flow",f"<b>{Qo:.1f} L/min</b>"],["Tank (3 min)",f"{tank:.0f} L"],["Filter β₁₀ = 200",f"captures {100*(1-1/beta):.1f} % of ≥10 µm particles per pass"]],num_cols=(1,))}

<h2 id="iso4406">3. ISO 4406 cleanliness code</h2>
<p>Automatic particle counters report particles per mL larger than 4, 6 and 14 µm(c). Each count is converted to a scale number; the code is written as three numbers, e.g. <b>17/15/12</b>.</p>
{table(["Scale number","More than (per mL)","Up to (per mL)"], iso_rows, num_cols=(0,1,2))}
{table(["Component","Typical target code"],[
["Servo and proportional valves","16/14/11"],["Rolling bearings","16/14/12"],["Journal bearings, turbines","17/15/12"],
["Industrial gearboxes","17/15/12 – 18/16/13"],["New oil from drum (often)","20/18/15 or worse: filter before use"],
])}
<p>Improving cleanliness by two or three code steps can extend bearing and hydraulic component life two to five times, according to published life-extension tables.</p>

<h2 id="filters">4. Filters and beta ratio</h2>
{formula("β_x = N_upstream(≥x) / N_downstream(≥x)\nEfficiency = 1 − 1/β_x        β = 2 → 50 %, 20 → 95 %, 75 → 98.7 %, 200 → 99.5 %, 1000 → 99.9 %")}

<h2 id="oil">5. Oil condition</h2>
{table(["Check","Warning sign","Action"],[
["Viscosity at 40 °C","Change &gt; ±10 % from new","Find cause (contamination, shear, wrong top-up)"],
["Water","&gt; 200–500 ppm (mineral oils)","Fix seals/breathers; dry with vacuum or coalescer"],
["Acid number (TAN)","Rise &gt; 0.5–1 mg KOH/g","Oxidation; plan oil change"],
["Wear metals (Fe, Cu, Cr…)","Rising trend","Investigate gear, bearing or cage wear"],
["Particle code","Rising by ≥ 2 steps","Check filter, bypass, ingress"],
])}
<p>Oxidation rate roughly doubles every 10 °C above about 60 °C (Arrhenius rule), so a system running at 80 °C ages oil about four times faster than one at 60 °C.</p>
''',
    calcs=[dict(id="oil", title="Oil flow, tank size and filter efficiency",
                presets=[dict(label="Worked example", v=dict(P=100, eta=97, dT=10, rho=870, c=2000, tmin=3, beta=200))],
                inputs=[dict(id="P", label="Transmitted power (kW)", value=100), dict(id="eta", label="Efficiency (%)", value=97), dict(id="dT", label="Oil temperature rise (K)", value=10),
                        dict(id="rho", label="Density (kg/m³)", value=870), dict(id="c", label="Specific heat (J/kg·K)", value=2000), dict(id="tmin", label="Tank residence (min)", value=3),
                        dict(id="beta", label="Filter β ratio", value=200)],
                js='''var L=v.P*(1-v.eta/100)*1000,Q=L/(v.rho*v.c*v.dT)*60000;
return {rows:[["Heat loss",fmt(L/1000,2)+" kW"],["Oil flow",fmt(Q,1)+" L/min"],["Tank volume",fmt(Q*v.tmin,0)+" L"],["Filter efficiency",fmt(100*(1-1/v.beta),2)+" %"]]};'''),
           dict(id="iso", title="ISO 4406 code from particle counts",
                presets=[dict(label="Clean bearing oil", v=dict(c4=900, c6=250, c14=30)), dict(label="New oil from drum", v=dict(c4=9000, c6=2000, c14=150))],
                inputs=[dict(id="c4", label="Particles ≥ 4 µm per mL", value=900), dict(id="c6", label="≥ 6 µm per mL", value=250), dict(id="c14", label="≥ 14 µm per mL", value=30)],
                js='''var lim=[0.01,0.02,0.04,0.08,0.16,0.32,0.64,1.3,2.5,5,10,20,40,80,160,320,640,1300,2500,5000,10000,20000,40000,80000,160000,320000];
function code(x){for(var i=0;i<lim.length-1;i++){if(x<=lim[i+1])return i+1;}return 25;}
var a=code(v.c4),b=code(v.c6),c=code(v.c14);
return {rows:[["ISO 4406 code",a+"/"+b+"/"+c]],verdict:(a<=16&&b<=14&&c<=12)?["ok","Meets a typical rolling-bearing target (16/14/12)."]:(a<=18&&b<=16&&c<=13?["caution","Acceptable for many gearboxes, not for bearings or servo valves."]:["bad","Dirty: filter the oil and find the ingress source."])};''')],
    quiz=[
        dict(q="In an ISO 4406 code 18/16/13, the middle number refers to particles larger than:", o=["4 µm", "6 µm", "14 µm", "25 µm"], a=1, e="The three numbers are ≥4, ≥6 and ≥14 µm(c)."),
        dict(q="Going up one ISO 4406 scale number means the particle count roughly:", o=["Increases by 10 %", "Doubles", "Increases ten times", "Halves"], a=1, e="Each step is a factor of two."),
        dict(q="A filter with β₁₀ = 200 removes what fraction of ≥10 µm particles per pass?", o=["50 %", "95 %", "99.5 %", "99.99 %"], a=2, e="1 − 1/200 = 99.5 %."),
        dict(q="Why do industrial tanks hold several minutes of flow?", o=["To store spare oil", "To let air escape and particles settle", "To reduce pump size", "Regulations"], a=1, e="Residence time allows de-aeration and settling."),
        dict(q="Oil oxidation rate roughly doubles for every:", o=["1 °C", "10 °C", "50 °C", "100 °C"], a=1, e="The Arrhenius rule of thumb: ×2 per 10 °C."),
        dict(q="Typical cleanliness target for rolling bearings:", o=["22/20/17", "20/18/15", "16/14/12", "10/8/5"], a=2, e="16/14/12 is a common bearing target."),
        dict(q="Loss 5 kW, ΔT 10 K, ρ = 870 kg/m³, c = 2000 J/kg·K. Oil flow in L/min?", num=17.24, unit="L/min", e="Q = 5000/(870×2000×10) × 60,000 = 17.2 L/min."),
        dict(q="A filter has β = 75. What is its efficiency in %?", num=98.67, unit="%", tol=0.005, e="1 − 1/75 = 98.67 %."),
    ],
    refs=["ISO 4406:2021, Hydraulic fluid power — Fluids — Method for coding the level of contamination by solid particles.", "ISO 16889, Multi-pass method for evaluating filtration performance (β ratio).",
          "ISO 11500, Automatic particle counting.", "Fitch, J. C., Proactive Maintenance for Mechanical Systems, Noria.", "Bloch, H. P., Practical Lubrication for Industrial Facilities, 3rd ed., Fairmont Press."],
    links=[("Wikipedia — ISO 4406", "https://en.wikipedia.org/wiki/ISO_4406")],
))

# =====================================================================================
# 8. COUPLINGS
# =====================================================================================
Pc, ncpl, SFc = 30.0, 1500.0, 1.5
Tc = Pc * 9549 / ncpl; Tdes = Tc * SFc
kt, J1, J2 = 50e3, 0.2, 0.05
fn = 1 / (2 * math.pi) * math.sqrt(kt * (J1 + J2) / (J1 * J2))
klat, offc = 2000.0, 0.1
Fr_c = klat * offc

ARTICLES.append(dict(
    slug="shaft-couplings", group="rotating",
    title="Shaft Couplings: Types, Selection, Misalignment Forces and Torsional Stiffness",
    short="Shaft couplings",
    tags=["Couplings", "Power transmission", "Torsional vibration", "Selection"],
    desc="Rigid, gear, disc, diaphragm, elastomeric and grid couplings compared; service factors, misalignment capacity and reaction forces, and torsional natural frequency.",
    blurb="Which coupling to use, how to size it with a service factor, and how its stiffness sets reaction forces and torsional natural frequency.",
    lead="A coupling joins two shafts, transmits torque, and accommodates the misalignment that will always exist between two machines. Its stiffness also decides the forces pushed into the bearings and the torsional natural frequencies of the drive train. Selecting a coupling is therefore a dynamics decision as well as a torque decision.",
    takeaways=[
        "Design torque = nominal torque × service factor (1.0 for smooth motors and fans, up to 2–3 for shock loads).",
        "Metallic flexible-element couplings (disc, diaphragm) need no lubrication and suit high speed; gear couplings carry the most torque for their size but need lubrication.",
        "Elastomeric couplings damp shocks and torsional vibration but have temperature and speed limits.",
        "Misalignment produces reaction forces and moments in the bearings: F ≈ k<sub>lateral</sub> × offset.",
        "Two-inertia torsional natural frequency f = (1/2π)√[k(J₁+J₂)/(J₁J₂)]; keep it away from running speed and its main harmonics.",
    ],
    body=f'''
<h2 id="types">1. Coupling types</h2>
{table(["Type","Misalignment","Lubrication","Speed","Notes"],[
["Rigid (flange, sleeve)","None","No","Any","Needs near-perfect alignment"],
["Gear","Angular ~0.5–1.5° per mesh, offset with two meshes","Grease or oil","High","Highest torque density; friction causes reaction moments; wear"],
["Disc pack","~0.5–1° per pack","None","High","Standard for process machinery (API 610/671)"],
["Diaphragm","~0.25–0.5° per element","None","Very high","Aero-derivative and high-speed turbomachinery"],
["Elastomeric (jaw, tyre, pin-bush)","1–4°","None","Moderate","Damping, electrical insulation; rubber ages"],
["Grid (steel spring)","~0.25°","Grease","Moderate","Shock absorbing, compact"],
["Oldham","Offset","Light","Low","Small drives, encoders"],
["Universal (Cardan) joint","Large angles","Grease","Low–moderate","Speed fluctuation unless used in pairs"],
])}
{fig('''<svg viewBox="0 0 900 220" role="img" aria-label="Two-inertia torsional model">
<rect x="80" y="70" width="140" height="80" rx="8" fill="var(--blue3)" stroke="var(--blue)" stroke-width="2.5"/><text x="150" y="105" text-anchor="middle" font-size="14" font-weight="700">J1</text><text x="150" y="125" text-anchor="middle" font-size="12.5">motor rotor</text>
<path d="M220 110 l20 -20 l20 40 l20 -40 l20 40 l20 -40 l20 40 l20 -40 l20 40 l20 -20" fill="none" stroke="var(--orange)" stroke-width="3.5"/>
<text x="330" y="60" text-anchor="middle" font-size="13" font-weight="700">coupling stiffness k (N·m/rad)</text>
<rect x="440" y="80" width="110" height="60" rx="8" fill="var(--orange3)" stroke="var(--orange)" stroke-width="2.5"/><text x="495" y="115" text-anchor="middle" font-size="14" font-weight="700">J2</text><text x="495" y="160" text-anchor="middle" font-size="12.5">driven rotor</text>
<text x="600" y="95" font-size="13">f = (1/2π) · √[ k (J1 + J2) / (J1 J2) ]</text><text x="600" y="120" font-size="13">Keep f away from 1× and 2× running speed</text><text x="600" y="145" font-size="13">and from motor / gear excitation orders.</text>
</svg>''', "Figure 1. The simplest torsional model: two inertias joined by the coupling stiffness.")}

<h2 id="selection">2. Selection procedure</h2>
<ol><li>Nominal torque T = P × 9549 / n (N·m).</li><li>Apply a service factor: about 1.0 for electric motor to fan or generator, 1.25–1.5 for pumps and compressors, 2–3 for crushers, mills and reciprocating machines.</li>
<li>Check maximum speed, bore range and keyway or interference-fit capacity.</li><li>Check misalignment capacity against expected offset, angle and axial movement, including thermal growth.</li>
<li>Check the reaction forces and moments on the bearings and the torsional natural frequencies of the train.</li></ol>

<h2 id="forces">3. Misalignment reaction forces</h2>
{formula("Flexible element:   F_r ≈ k_lateral · offset          M ≈ k_angular · angle\nGear coupling:      M ≈ μ · T · (friction between teeth),  μ ≈ 0.1–0.3 (rises as lubrication degrades)")}
<p>Gear-coupling friction moments can push surprising loads into the bearings and are a classic cause of axial vibration when the coupling locks up from poor lubrication.</p>

<h2 id="example">4. Worked example</h2>
<p>{Pc:.0f} kW motor at {ncpl:,.0f} rpm drives a pump; service factor {SFc}. Coupling torsional stiffness {kt/1000:.0f} kN·m/rad, motor inertia {J1} kg·m², pump inertia {J2} kg·m², lateral stiffness {klat:.0f} N/mm, offset {offc} mm.</p>
{table(["Step","Result"],[["Nominal torque",f"{Tc:.0f} N·m"],["Design torque",f"<b>{Tdes:.0f} N·m</b>"],["Torsional natural frequency",f"<b>{fn:.0f} Hz</b> ({fn*60:,.0f} cpm)"],
["Running speed",f"{ncpl/60:.0f} Hz → separation ratio {fn/(ncpl/60):.1f}"],["Reaction force from offset",f"{Fr_c:.0f} N"]],num_cols=(1,))}
''',
    calcs=[dict(id="cpl", title="Coupling sizing and torsional natural frequency",
                presets=[dict(label="Worked example", v=dict(P=30, n=1500, SF=1.5, k=50000, J1=0.2, J2=0.05, kl=2000, off=0.1))],
                inputs=[dict(id="P", label="Power (kW)", value=30), dict(id="n", label="Speed (rpm)", value=1500), dict(id="SF", label="Service factor", value=1.5),
                        dict(id="k", label="Torsional stiffness (N·m/rad)", value=50000), dict(id="J1", label="Inertia J1 (kg·m²)", value=0.2), dict(id="J2", label="Inertia J2 (kg·m²)", value=0.05),
                        dict(id="kl", label="Lateral stiffness (N/mm)", value=2000), dict(id="off", label="Offset (mm)", value=0.1)],
                js='''var T=v.P*9549/v.n,f=Math.sqrt(v.k*(v.J1+v.J2)/(v.J1*v.J2))/(2*Math.PI),fr=v.n/60,r=f/fr;
var near=Math.min(Math.abs(r-1),Math.abs(r-2));
return {rows:[["Nominal torque",fmt(T,1)+" N·m"],["Design torque",fmt(T*v.SF,1)+" N·m"],["Torsional natural frequency",fmt(f,1)+" Hz"],["Running frequency",fmt(fr,1)+" Hz","ratio "+fmt(r,2)],["Reaction force",fmt(v.kl*v.off,0)+" N"]],
verdict:near<0.15?["bad","Torsional natural frequency within 15 % of 1× or 2× running speed: change stiffness or inertia."]:["ok","Torsional natural frequency is clear of 1× and 2× running speed by more than 15 %."]};''')],
    quiz=[
        dict(q="Which coupling needs regular lubrication?", o=["Disc pack", "Diaphragm", "Gear", "Jaw (elastomeric)"], a=2, e="Gear teeth slide and need grease or oil."),
        dict(q="Design torque equals:", o=["Nominal torque ÷ service factor", "Nominal torque × service factor", "Power × speed", "Peak torque only"], a=1, e="T_design = T_nominal × SF."),
        dict(q="Why are diaphragm couplings used in high-speed turbomachinery?", o=["Cheapest", "No lubrication, low weight, good balance, high speed capability", "Largest misalignment", "Best damping"], a=1, e="They are lubrication-free and stable at high speed."),
        dict(q="A single Cardan joint at an angle causes:", o=["Constant output speed", "Speed fluctuation twice per revolution", "No torque transmission", "Axial thrust only"], a=1, e="Use two joints in phase to cancel the fluctuation."),
        dict(q="Increasing coupling torsional stiffness:", o=["Lowers torsional natural frequency", "Raises torsional natural frequency", "Has no effect", "Removes misalignment"], a=1, e="f ∝ √k."),
        dict(q="Gear coupling lock-up from poor lubrication often shows as:", o=["High axial vibration", "Lower power", "Quieter running", "Lower temperature"], a=0, e="Friction prevents sliding, transmitting axial forces and moments."),
        dict(q="Torque (N·m) of a 55 kW motor at 1480 rpm?", num=354.9, unit="N·m", e="55 × 9549/1480 = 354.9 N·m."),
        dict(q="k = 20,000 N·m/rad, J1 = J2 = 0.1 kg·m². Torsional natural frequency in Hz?", num=100.7, unit="Hz", e="f = (1/2π)√(20000 × 0.2/0.01) = 100.7 Hz."),
    ],
    refs=["API 671, Special-purpose Couplings for Petroleum, Chemical and Gas Industry Services.", "Mancuso, J. R., Couplings and Joints: Design, Selection and Application, 2nd ed., Marcel Dekker, 1999.",
          "Wilson, W. K., Practical Solution of Torsional Vibration Problems, Chapman & Hall.", "Coupling makers' selection catalogues (service factors, misalignment and stiffness data)."],
    links=[("Wikipedia — Coupling", "https://en.wikipedia.org/wiki/Coupling")],
))
