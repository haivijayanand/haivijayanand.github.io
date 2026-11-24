"""
TOOL:    Vijay_Wiki articles — group 3 (instrumentation and data acquisition)
FAMILY:  vijay-wiki
VERSION: 1.0.0
DATE:    2026-11-24
CHAT:    claude.ai — Vijay_Wiki: build all suggested topics in groups and upload
CHANGES: 1.0.0 Initial seven articles: accelerometers, temperature, turbine flow, pressure & 4–20 mA, torque, CT & power, interlocks
"""
import math
import numpy as np
from wiki import plot, flow, bars, fig, table, box, formula

ARTICLES = []

# =====================================================================================
# 15. ACCELEROMETERS
# =====================================================================================
fres = 30000.0
fr_pts = [(f, 1 / abs(1 - (f / fres) ** 2 + 1e-9)) for f in [10 * 1.05 ** k for k in range(0, 200) if 10 * 1.05 ** k < 50000]]
fr_pts = [(f, min(a, 30)) for f, a in fr_pts]
accplot = plot([dict(pts=fr_pts, label="relative sensitivity", at=2000)], "frequency (Hz)", "output / true value", xlim=(10, 50000), ylim=(0.5, 3), xlog=True, h=300,
               notes=[(12000, 1.25, "+10 % ≈ fres/3.3"), (300, 0.75, "flat region: use up to ~fres/5 for ±5 %")])
sens, vmax = 100.0, 5.0
rng_g = vmax / (sens / 1000)
f5, f10 = fres * math.sqrt(1 - 1 / 1.05), fres * math.sqrt(1 - 1 / 1.10)

ARTICLES.append(dict(
    slug="accelerometers-for-vibration", group="instrumentation",
    title="Accelerometers for Vibration Measurement: IEPE, Sensitivity, Range, Mounting and Checks",
    short="Accelerometers",
    tags=["Accelerometer", "IEPE", "Sensors", "Vibration"],
    desc="Piezoelectric IEPE, charge and MEMS accelerometers: sensitivity and range, frequency response and mounted resonance, mounting methods, cabling, bias voltage checks and calibration.",
    blurb="Choosing and mounting accelerometers so the measured vibration is the real vibration: range, frequency response, bias checks.",
    lead="Most machinery vibration is measured with piezoelectric accelerometers. They are small, rugged and cover a wide frequency range, but what they report depends on their sensitivity, their mounting and the electronics behind them. A badly mounted sensor or a saturated channel gives a convincing but wrong spectrum.",
    takeaways=[
        "IEPE (ICP-type) sensors have built-in electronics powered by a 2–20 mA constant current; output rides on a bias of about 10–12 V.",
        "Range = output swing ÷ sensitivity: a 100 mV/g sensor with ±5 V swing measures about ±50 g.",
        "The usable upper frequency is about one fifth (±5 %) to one third (±10 %) of the mounted resonance.",
        "Mounting sets the mounted resonance: stud best, adhesive close, magnet lower, hand probe only for low frequencies.",
        "Check the bias output voltage (BOV) on every channel: about 0 V means short, near supply means open circuit.",
    ],
    body=f'''
<h2 id="types">1. Types</h2>
{table(["Type","Principle","Strengths","Limits"],[
["IEPE piezoelectric","Crystal + built-in amplifier, constant-current powered","Low noise, long cables, simple DAQ input","Max ~120 °C (some 175 °C); no DC response"],
["Charge-mode piezoelectric","Crystal only; external charge amplifier","Very high temperature (up to 500+ °C)","Needs low-noise cable and charge amp"],
["MEMS capacitive","Micro-machined mass, capacitance change","DC response (gravity, tilt), cheap","Higher noise, lower frequency range"],
["Piezoresistive","Strain gauges on a micro-mass","DC response, shock (high g)","Lower sensitivity, needs bridge excitation"],
])}

<h2 id="spec">2. Sensitivity, range and resolution</h2>
{formula("Range (g)     = output swing (V) / sensitivity (V/g)\nResolution    = broadband noise floor (g RMS), often 0.0001–0.001 g for 100 mV/g sensors\nTransverse sensitivity &lt; 5 % of main axis")}
{table(["Sensitivity","Typical range","Use"],[["10 mV/g","±500 g","Impacts, gears, high levels"],["100 mV/g","±50 g","General machinery"],["500–1000 mV/g","±5–10 g","Low-level, low-frequency, structures"]])}
<p>A saturated (clipped) signal creates false harmonics and a raised noise floor across the spectrum; always check that time-signal peaks stay well inside the range, including impacts.</p>

<h2 id="frequency">3. Frequency response and mounting</h2>
{fig(accplot, f"Figure 1. Accelerometer response near its mounted resonance of {fres/1000:.0f} kHz (undamped approximation). Output rises above the true value as frequency approaches resonance.")}
{formula("Relative sensitivity ≈ 1 / |1 − (f/f_res)²|\n+5 % at f ≈ 0.22·f_res      +10 % at f ≈ 0.30·f_res")}
{table(["Mounting","Typical usable upper frequency","Notes"],[
["Stud on flat, spot-faced surface with grease","≈ full sensor range (10–20 kHz)","Reference method"],["Adhesive pad / cyanoacrylate","Slightly below stud","Good for permanent installs"],
["Magnet on flat surface","≈ 2–7 kHz","Convenient for route measurements"],["Magnet on curved surface (two-pole)","≈ 1–2 kHz",""],["Hand-held probe tip","&lt; 0.5–1 kHz","Spot checks only"],
])}

<h2 id="practice">4. Cabling, grounding and checks</h2>
<ul><li>Secure cables to avoid triboelectric noise and cable whip; strain-relieve connectors.</li>
<li>Ground at one point only (the DAQ) to avoid ground loops; use isolated sensors on machines with stray currents.</li>
<li>Read the <b>bias output voltage</b>: normal ≈ 8–14 V; ≈ 0 V short; ≈ supply (18–30 V) open or no sensor.</li>
<li>Calibrate against a reference sensor on a shaker (back-to-back), commonly at 159.2 Hz (ω = 1,000 rad/s) or 100 Hz at 1 g RMS.</li>
<li>For triaxial sensors, record the axis orientation relative to the machine.</li></ul>
<h3 id="example">Worked example</h3>
<p>100 mV/g IEPE sensor, ±5 V swing, mounted resonance {fres/1000:.0f} kHz: range ±{rng_g:.0f} g; +5 % error at {f5/1000:.1f} kHz and +10 % at {f10/1000:.1f} kHz.</p>
''',
    calcs=[dict(id="acc", title="Accelerometer range, usable band and bias check",
                presets=[dict(label="100 mV/g, 30 kHz", v=dict(s=100, sw=5, fr=30000, f=8000, bov=11.2)), dict(label="10 mV/g on magnet (5 kHz)", v=dict(s=10, sw=5, fr=5000, f=3000, bov=0.3))],
                inputs=[dict(id="s", label="Sensitivity (mV/g)", value=100), dict(id="sw", label="Output swing ± (V)", value=5), dict(id="fr", label="Mounted resonance (Hz)", value=30000),
                        dict(id="f", label="Frequency of interest (Hz)", value=8000), dict(id="bov", label="Measured bias voltage (V)", value=11.2)],
                js='''var R=v.sw/(v.s/1000),r=v.f/v.fr,err=(1/Math.abs(1-r*r)-1)*100,f5=v.fr*Math.sqrt(1-1/1.05),f10=v.fr*Math.sqrt(1-1/1.1);
var b=v.bov<2?"short circuit or failed sensor":(v.bov>16?"open circuit / no sensor / cable fault":"normal");
return {rows:[["Range",fmt(R,1)+" g"],["Error at "+fmt(v.f,0)+" Hz",fmt(err,1)+" %"],["±5 % limit",fmt(f5,0)+" Hz"],["±10 % limit",fmt(f10,0)+" Hz"],["Bias check",b,fmt(v.bov,1)+" V"]],
verdict:(v.bov<2||v.bov>16)?["bad","Bias voltage abnormal: "+b+"."]:(err>10?["bad","Frequency too close to mounted resonance: error above 10 %."]:(err>5?["caution","Error between 5 and 10 %."]:["ok","Within ±5 % and bias normal."]))};''')],
    quiz=[
        dict(q="IEPE sensors are powered by:", o=["Constant voltage", "Constant current 2–20 mA", "Battery inside", "Charge amplifier"], a=1, e="Constant-current excitation; output rides on a DC bias."),
        dict(q="A bias voltage near 0 V indicates:", o=["Normal", "Short circuit", "Open circuit", "High vibration"], a=1, e="~0 V = short; near supply = open."),
        dict(q="Which mounting gives the highest usable frequency?", o=["Hand probe", "Magnet", "Stud", "Double-sided tape"], a=2, e="Stud mounting keeps mounted resonance highest."),
        dict(q="Which type measures static acceleration (gravity)?", o=["IEPE", "Charge piezo", "MEMS capacitive", "None"], a=2, e="MEMS and piezoresistive have DC response."),
        dict(q="Clipping of the signal causes:", o=["Better resolution", "False harmonics and raised noise floor", "Lower amplitudes only", "Nothing"], a=1, e="Saturation distorts the waveform."),
        dict(q="Ground loops are avoided by:", o=["Grounding at both ends", "Single-point grounding or isolated sensors", "Longer cables", "Higher sensitivity"], a=1, e="One ground reference."),
        dict(q="Sensitivity 50 mV/g, swing ±5 V. Range in g?", num=100, unit="g", e="5/0.05 = 100 g."),
        dict(q="Mounted resonance 20 kHz. Frequency (Hz) for +10 % error?", num=6030, unit="Hz", e="f = 20000 × √(1 − 1/1.1) = 6,030 Hz."),
    ],
    refs=["ISO 16063-21, Methods for the calibration of vibration and shock transducers — Calibration by comparison.", "ISO 5348, Mechanical mounting of accelerometers.",
          "Serridge, M. and Licht, T. R., Piezoelectric Accelerometer and Vibration Preamplifier Handbook, Brüel & Kjær.", "IEEE 1451.4 (TEDS) for smart transducers.", "Accelerometer makers' technical notes (PCB, Brüel & Kjær, Kistler)."],
    links=[("Wikipedia — Accelerometer", "https://en.wikipedia.org/wiki/Accelerometer"), ("Wikipedia — IEPE", "https://en.wikipedia.org/wiki/Integrated_Electronics_Piezo-Electric")],
))

# =====================================================================================
# 16. TEMPERATURE SENSORS
# =====================================================================================
A, B = 3.9083e-3, -5.775e-7
def Rpt(t, R0): return R0 * (1 + A * t + B * t * t)
R85 = Rpt(85, 1000)
lead = 0.0172 * 10 / 0.5
err100 = 2 * lead / (100 * 0.385)
err1000 = 2 * lead / (1000 * 0.385)
tolplot = plot([dict(pts=[(t, 0.1 + 0.0017 * abs(t)) for t in range(-50, 251, 5)], label="RTD class AA", at=200),
                dict(pts=[(t, 0.15 + 0.002 * abs(t)) for t in range(-50, 451, 5)], label="RTD class A", at=300),
                dict(pts=[(t, 0.3 + 0.005 * abs(t)) for t in range(-50, 601, 5)], label="RTD class B", at=420),
                dict(pts=[(t, max(1.5, 0.004 * abs(t))) for t in range(-40, 1001, 10)], label="Thermocouple K, class 1", at=700)],
               "temperature (°C)", "tolerance ± (°C)", xlim=(-50, 1000), ylim=(0, 5), h=320)

ARTICLES.append(dict(
    slug="temperature-sensors-thermocouples-rtds", group="instrumentation",
    title="Temperature Sensors: Thermocouples and RTDs (Pt100, Pt1000)",
    short="Thermocouples and RTDs",
    tags=["Temperature", "Thermocouple", "RTD", "Pt100"],
    desc="Thermocouple types and cold-junction compensation, Pt100/Pt1000 RTDs with the Callendar–Van Dusen equation, IEC tolerance classes, 2/3/4-wire connections, immersion and response time.",
    blurb="Choosing between thermocouples and RTDs, converting resistance to temperature, tolerance classes and the wiring errors that catch people out.",
    lead="Temperature is the most measured quantity in industry. Thermocouples cover very wide ranges and are rugged and fast; platinum resistance thermometers (RTDs) are more accurate and stable below about 600 °C. Most measurement errors come not from the sensor but from installation: lead resistance, poor immersion, and cold-junction mistakes.",
    takeaways=[
        "Thermocouples generate a voltage from the temperature difference between hot and reference junctions; cold-junction compensation is essential.",
        "Type K (about 41 µV/°C) covers −200 to 1,260 °C; class 1 tolerance is ±1.5 °C or ±0.4 % of reading.",
        "Pt100/Pt1000 follow R = R₀(1 + A·t + B·t²) above 0 °C; class A tolerance is ±(0.15 + 0.002|t|) °C.",
        "Two-wire RTD connections add lead resistance as error: about 2.5 °C per ohm for Pt100. Use 3- or 4-wire, or Pt1000.",
        "Immerse a probe at least 10–15 diameters to avoid stem-conduction errors.",
    ],
    body=f'''
<h2 id="tc">1. Thermocouples</h2>
{table(["Type","Materials","Range (°C)","Approx. sensitivity","Notes"],[
["K","Chromel / Alumel","−200 to 1,260","41 µV/°C","General purpose; most common"],["J","Iron / Constantan","−40 to 750","52 µV/°C","Iron oxidises; older equipment"],
["T","Copper / Constantan","−200 to 350","43 µV/°C","Good at low temperature"],["E","Chromel / Constantan","−200 to 900","68 µV/°C","Highest output"],
["N","Nicrosil / Nisil","−200 to 1,260","39 µV/°C","More stable than K at high temperature"],["R, S","Pt-Rh / Pt","0 to 1,600","10 µV/°C","High temperature, accurate, expensive"],
["B","Pt-30Rh / Pt-6Rh","600 to 1,700","≈ 10 µV/°C at high T","Very high temperature"],
])}
<p>Extension cable must be of matching thermocouple alloy (or compensating cable); every junction of dissimilar metals in the circuit is a thermocouple. The instrument measures the terminal temperature (cold junction) and adds its equivalent EMF.</p>
{table(["IEC 60584-1 tolerance (type K)","Value"],[["Class 1 (−40 to 1,000 °C)","±1.5 °C or ±0.004·|t|, whichever is greater"],["Class 2 (−40 to 1,200 °C)","±2.5 °C or ±0.0075·|t|"]])}

<h2 id="rtd">2. Platinum RTDs</h2>
{formula("Callendar–Van Dusen (IEC 60751), t ≥ 0 °C:\nR(t) = R0 · (1 + A·t + B·t²)      A = 3.9083×10⁻³, B = −5.775×10⁻⁷\n(below 0 °C add C·(t − 100)·t³ with C = −4.183×10⁻¹²)\nSensitivity ≈ 0.385 Ω/°C (Pt100), 3.85 Ω/°C (Pt1000)")}
{table(["IEC 60751 class","Tolerance (°C)","Range (wire-wound)"],[["AA","±(0.10 + 0.0017·|t|)","−50 to 250"],["A","±(0.15 + 0.002·|t|)","−100 to 450"],["B","±(0.30 + 0.005·|t|)","−196 to 600"],["C","±(0.6 + 0.01·|t|)","−196 to 600"]])}
{fig(tolplot, "Figure 1. Tolerance against temperature for RTD classes and a class 1 type K thermocouple.")}

<h2 id="wiring">3. Wiring and installation errors</h2>
{table(["Connection","Lead resistance effect","Use"],[["2-wire","Both leads add directly","Short leads, Pt1000 only"],["3-wire","Compensated if leads are equal","Industrial standard"],["4-wire","Eliminated","Laboratory, calibration"]])}
<ul><li><b>Self-heating:</b> measuring current (≈ 1 mA for Pt100, 0.1–0.3 mA for Pt1000) warms the element; keep power low.</li>
<li><b>Immersion:</b> at least 10–15 × the sheath diameter beyond the wall; otherwise heat conducted along the stem reads low (or high).</li>
<li><b>Response time:</b> thin sheaths and exposed junctions respond fastest; a thermowell slows response many times.</li>
<li><b>Surface temperature:</b> clamp or cement the sensor, insulate over it, and run the leads along the surface first.</li></ul>
<h3 id="example">Worked example</h3>
<p>A Pt1000 at 85 °C reads R = {R85:.2f} Ω. With 10 m of 0.5 mm² copper per lead ({lead:.3f} Ω each) in a 2-wire circuit, the error would be {err100:.2f} °C for a Pt100 but only {err1000:.2f} °C for a Pt1000.</p>
''',
    calcs=[dict(id="rtd", title="RTD resistance ↔ temperature and lead error",
                presets=[dict(label="Pt1000 at 85 °C", v=dict(R0=1000, t=85, R=1328.04, L=10, a=0.5, w="2")), dict(label="Pt100, 3-wire", v=dict(R0=100, t=200, R=175.86, L=50, a=0.75, w="3"))],
                inputs=[dict(id="R0", label="R0 (Ω)", value=1000), dict(id="t", label="Temperature for R (°C)", value=85), dict(id="R", label="Measured resistance (Ω)", value=1328.04),
                        dict(id="L", label="Lead length each (m)", value=10), dict(id="a", label="Lead cross-section (mm²)", value=0.5),
                        dict(id="w", label="Wiring", value="2", options=[("2", "2-wire"), ("3", "3-wire"), ("4", "4-wire")])],
                js='''var A=3.9083e-3,B=-5.775e-7,Rt=v.R0*(1+A*v.t+B*v.t*v.t);
var x=v.R/v.R0,T=(-A+Math.sqrt(A*A-4*B*(1-x)))/(2*B);var Rl=0.0172*v.L/v.a,e=(v.w==="2"?2*Rl:(v.w==="3"?0.05*Rl:0))/(v.R0*0.00385);
return {rows:[["R at "+v.t+" °C",fmt(Rt,3)+" Ω"],["Temperature from R",fmt(T,3)+" °C","valid ≥ 0 °C"],["Lead resistance each",fmt(Rl,4)+" Ω"],["Approx. wiring error",fmt(e,3)+" °C",v.w==="3"?"assumes 5 % lead mismatch":""],["Class A tolerance at T",fmt(0.15+0.002*Math.abs(T),3)+" °C"]],
verdict:e>0.15+0.002*Math.abs(T)?["bad","Wiring error exceeds class A tolerance: use 3/4-wire or Pt1000."]:["ok","Wiring error is below the class A tolerance."]};''')],
    quiz=[
        dict(q="Which thermocouple type is most common for general use up to ~1,200 °C?", o=["T", "K", "B", "S"], a=1, e="Type K."),
        dict(q="Cold-junction compensation corrects for:", o=["Lead resistance", "The temperature of the reference (terminal) junction", "Self-heating", "Noise"], a=1, e="TC voltage depends on the difference between hot and cold junction."),
        dict(q="Pt100 means:", o=["100 °C max", "100 Ω at 0 °C", "100 mV output", "Class 100"], a=1, e="R0 = 100 Ω."),
        dict(q="Which wiring eliminates lead resistance error?", o=["2-wire", "3-wire", "4-wire", "Twisted 2-wire"], a=2, e="4-wire separates current and sense leads."),
        dict(q="Class A RTD tolerance at 100 °C is:", o=["±0.15 °C", "±0.35 °C", "±0.8 °C", "±1.5 °C"], a=1, e="0.15 + 0.002×100 = 0.35 °C."),
        dict(q="Insufficient immersion depth causes:", o=["Self-heating", "Stem conduction error", "Cold-junction error", "No error"], a=1, e="Heat flows along the stem to the colder wall."),
        dict(q="Pt100 R at 100 °C using CVD? (Ω)", num=138.51, unit="Ω", tol=0.002, e="100(1 + 0.39083 − 0.005775) = 138.51 Ω."),
        dict(q="2-wire Pt100 with total lead resistance 1 Ω. Error in °C (0.385 Ω/°C)?", num=2.60, unit="°C", e="1/0.385 = 2.6 °C."),
    ],
    refs=["IEC 60751:2022, Industrial platinum resistance thermometers and platinum temperature sensors.", "IEC 60584-1/-3, Thermocouples — EMF specifications, tolerances and extension cables.",
          "NIST ITS-90 Thermocouple Database (Monograph 175).", "Nicholas, J. V. and White, D. R., Traceable Temperatures, 2nd ed., Wiley, 2001.", "ASTM E230, Standard Specification for Temperature-Electromotive Force Tables for Thermocouples."],
    links=[("NIST ITS-90 thermocouple tables", "https://srdata.nist.gov/its90/main/"), ("Wikipedia — Resistance thermometer", "https://en.wikipedia.org/wiki/Resistance_thermometer")],
))

# =====================================================================================
# 17. TURBINE FLOW METERS
# =====================================================================================
Kf, fq = 3200.0, 800.0
Qf = 60 * fq / Kf
kplot = plot([dict(pts=[(q, 3200 * (1 + 0.012 * math.exp(-((q - 6) / 3) ** 2) - 0.02 * math.exp(-q / 1.2))) for q in np.linspace(1, 40, 120)], label="K-factor (pulses/L)", at=25)],
             "flow rate (L/min)", "K-factor (pulses per litre)", xlim=(0, 40), ylim=(3100, 3260), h=300, notes=[(12, 3110, "linear range: ±0.5 % band"), (1.2, 3245, "hump at low flow")])

ARTICLES.append(dict(
    slug="turbine-flow-meters", group="instrumentation",
    title="Turbine Flow Meters: K-Factor, Calibration, Viscosity Effects and Installation",
    short="Turbine flow meters",
    tags=["Flow", "Turbine meter", "K-factor", "Lubrication"],
    desc="How turbine flow meters work, converting pulses to flow with the K-factor, linearity and the universal viscosity curve, installation rules and comparison with other flow meters.",
    blurb="Pulses to litres per minute: K-factor, viscosity effects on oil service, installation straight runs and choosing a meter type.",
    lead="A turbine flow meter has a free-spinning rotor whose speed is proportional to the velocity of the liquid. A pickup counts blade passes, giving a pulse frequency proportional to volume flow. Turbine meters are accurate and fast, but their calibration factor depends on viscosity, so a meter calibrated on water can read wrongly on oil unless the calibration matches the fluid.",
    takeaways=[
        "Q (L/min) = 60 · f / K, where K is pulses per litre and f the pulse frequency in Hz.",
        "Typical linearity ±0.5–1 % over a 10:1 range; repeatability ±0.05–0.1 %.",
        "K changes with viscosity: calibrate on the actual oil at operating temperature, or use the universal viscosity curve (K vs f/ν).",
        "Install with about 10 diameters straight upstream and 5 downstream, filtered fluid, and no air.",
        "Electromagnetic meters cannot measure oils (non-conductive); use turbine, gear (positive displacement), Coriolis or ultrasonic meters.",
    ],
    body=f'''
<h2 id="principle">1. Principle</h2>
{fig(flow(["Flow straightener|upstream","Rotor|speed ∝ velocity","Magnetic / Hall pickup|pulse per blade","Conditioner|square wave","Counter / DAQ|f → Q = 60f/K"], h=130), "Figure 1. Turbine flow meter signal chain.")}
{formula("Q [L/min] = 60 · f [Hz] / K [pulses/L]\nf = K · Q / 60\nMass flow = ρ · Q")}

<h2 id="kfactor">2. K-factor and linearity</h2>
{fig(kplot, "Figure 2. Illustrative calibration curve: the K-factor is nearly constant over the linear range but rises in a 'hump' and then falls at low flow, where bearing friction and viscous drag dominate.")}
<p>Calibration certificates list K at several flows; the instrument uses either an average K (simple) or a multi-point linearisation (better). Use the meter only within its stated range; below minimum flow the rotor may stall.</p>

<h2 id="viscosity">3. Viscosity effects</h2>
<p>Higher viscosity increases drag on the rotor and changes the velocity profile, so K shifts. Manufacturers characterise this with a <b>universal viscosity curve</b> (UVC): K plotted against f/ν (pulse frequency divided by kinematic viscosity). For a given f/ν, K is the same for any fluid. If a meter must work on oil whose viscosity changes with temperature, measure oil temperature and correct K from the UVC, or calibrate at the operating temperature.</p>

<h2 id="install">4. Installation</h2>
<ul><li>Straight run: about 10 D upstream and 5 D downstream, more after two bends out of plane or a partially open valve; or use a flow conditioner.</li>
<li>Filter upstream (typically 40–100 µm) to protect bearings; keep the line full and free of air.</li>
<li>Mount so that a flow control valve is downstream, not upstream, of the meter.</li>
<li>Pressure drop is typically 0.1–0.3 bar at full flow.</li></ul>

<h2 id="compare">5. Choosing a flow meter</h2>
{table(["Meter","Fluids","Accuracy (typ.)","Notes"],[
["Turbine","Clean low-viscosity liquids, gases","±0.5–1 %","Fast response; viscosity sensitive"],["Oval gear / positive displacement","Oils, viscous liquids","±0.5 %","Better at high viscosity; pressure drop"],
["Coriolis","Any liquid, gas","±0.1–0.2 % mass","Measures mass and density; expensive"],["Electromagnetic","Conductive liquids only","±0.2–0.5 %","Not for oil"],
["Vortex","Liquids, gases, steam","±0.75–1 %","Needs Reynolds number above a minimum"],["Ultrasonic (clamp-on)","Liquids","±1–2 %","Non-invasive"],["Variable area","Liquids, gases","±2–5 %","Local visual indication"],
])}
<h3 id="example">Worked example</h3>
<p>K = {Kf:,.0f} pulses/L, measured frequency {fq:.0f} Hz → Q = 60 × {fq:.0f} / {Kf:,.0f} = <b>{Qf:.1f} L/min</b>.</p>
''',
    calcs=[dict(id="tfm", title="Turbine meter conversion",
                presets=[dict(label="K 3200, 800 Hz", v=dict(K=3200, f=800, Q=15, rho=870, nu=30)), dict(label="K 283, 50 L/min", v=dict(K=283, f=236, Q=50, rho=870, nu=30))],
                inputs=[dict(id="K", label="K-factor (pulses/L)", value=3200), dict(id="f", label="Measured frequency (Hz)", value=800), dict(id="Q", label="Flow for frequency check (L/min)", value=15),
                        dict(id="rho", label="Density (kg/m³)", value=870), dict(id="nu", label="Kinematic viscosity (cSt)", value=30)],
                js='''var Q=60*v.f/v.K,f=v.K*v.Q/60;
return {rows:[["Flow from frequency",fmt(Q,3)+" L/min",fmt(Q/60,4)+" L/s"],["Mass flow",fmt(Q/60*v.rho/1000,4)+" kg/s"],["Frequency at "+v.Q+" L/min",fmt(f,1)+" Hz"],["f/ν (for UVC)",fmt(v.f/v.nu,2)+" Hz/cSt"]]};''')],
    quiz=[
        dict(q="K-factor of a turbine meter is expressed in:", o=["L/min", "pulses per litre", "Hz/bar", "cSt"], a=1, e="Pulses per unit volume."),
        dict(q="Why can a water-calibrated turbine meter read wrong on oil?", o=["Density", "Viscosity changes K", "Colour", "Conductivity"], a=1, e="K depends on f/ν (Reynolds effects)."),
        dict(q="Which meter cannot measure oil flow?", o=["Turbine", "Oval gear", "Electromagnetic", "Coriolis"], a=2, e="Mag meters need a conductive fluid."),
        dict(q="Typical upstream straight run for a turbine meter:", o=["1 D", "10 D", "50 D", "None"], a=1, e="About 10 diameters upstream, 5 downstream."),
        dict(q="A universal viscosity curve plots K against:", o=["Flow", "f/ν", "Pressure", "Temperature"], a=1, e="Same K at the same f/ν for any fluid."),
        dict(q="Which meter measures mass flow directly?", o=["Turbine", "Coriolis", "Variable area", "Vortex"], a=1, e="Coriolis senses mass flow."),
        dict(q="K = 1500 p/L, f = 250 Hz. Flow in L/min?", num=10, unit="L/min", e="60 × 250/1500 = 10 L/min."),
        dict(q="K = 3279 p/L at 20 L/min. Frequency in Hz?", num=1093, unit="Hz", e="3279 × 20/60 = 1,093 Hz."),
    ],
    refs=["ISO 9951, Measurement of gas flow in closed conduits — Turbine meters.", "API MPMS Chapter 5.3, Measurement of Liquid Hydrocarbons by Turbine Meters.",
          "Baker, R. C., Flow Measurement Handbook, 2nd ed., Cambridge University Press, 2016.", "Miller, R. W., Flow Measurement Engineering Handbook, 3rd ed., McGraw-Hill."],
    links=[("Wikipedia — Flow measurement", "https://en.wikipedia.org/wiki/Flow_measurement")],
))

# =====================================================================================
# 18. PRESSURE TRANSDUCERS & 4–20 mA
# =====================================================================================
Imeas, P0, P1 = 13.6, 0.0, 10.0
Pread = P0 + (Imeas - 4) / 16 * (P1 - P0)
Vs, Vmin = 24.0, 10.0
Rmax = (Vs - Vmin) / 0.020

loop_svg = '''<svg viewBox="0 0 900 230" role="img" aria-label="Two-wire 4-20 mA loop">
<rect x="40" y="70" width="150" height="80" rx="8" fill="var(--blue3)" stroke="var(--blue)" stroke-width="2.5"/><text x="115" y="105" text-anchor="middle" font-size="13" font-weight="700">24 V DC supply</text><text x="115" y="125" text-anchor="middle" font-size="12">loop power</text>
<rect x="360" y="70" width="170" height="80" rx="8" fill="var(--orange3)" stroke="var(--orange)" stroke-width="2.5"/><text x="445" y="105" text-anchor="middle" font-size="13" font-weight="700">2-wire transmitter</text><text x="445" y="125" text-anchor="middle" font-size="12">needs ≥ Vmin to work</text>
<rect x="680" y="70" width="170" height="80" rx="8" fill="var(--purple3)" stroke="var(--purple)" stroke-width="2.5"/><text x="765" y="100" text-anchor="middle" font-size="13" font-weight="700">DAQ input</text><text x="765" y="120" text-anchor="middle" font-size="12">250 Ω → 1–5 V</text><text x="765" y="138" text-anchor="middle" font-size="12">(burden)</text>
<path d="M190 90 H360 M530 90 H680 M680 130 H600 V190 H120 V150" fill="none" stroke="var(--ink)" stroke-width="2.5"/>
<text x="275" y="80" text-anchor="middle" font-size="12.5">+</text><text x="600" y="80" text-anchor="middle" font-size="12.5">I = 4–20 mA</text>
<text x="350" y="210" text-anchor="middle" font-size="12.5">Vs ≥ Vmin + I_max · (R_burden + R_cable)</text></svg>'''

ARTICLES.append(dict(
    slug="pressure-transducers-and-4-20ma", group="instrumentation",
    title="Pressure Transducers and Analogue Signals: 4–20 mA, 0–10 V, Scaling and Loop Design",
    short="Pressure and 4–20 mA",
    tags=["Pressure", "4–20 mA", "Signals", "Transmitters"],
    desc="Pressure sensor types and references (gauge, absolute, differential), accuracy terms, 4–20 mA and 0–10 V signals, scaling, loop power and burden, and NAMUR fault levels.",
    blurb="Pressure sensor basics and the arithmetic of 4–20 mA and 0–10 V signals: scaling, loop voltage budget and fault detection.",
    lead="Pressure transmitters turn a diaphragm's deflection into an electrical signal. The signal standard matters as much as the sensor: 4–20 mA loops carry measurements over long cables with little error and reveal broken wires, while voltage outputs are simpler but more sensitive to noise and cable drop.",
    takeaways=[
        "Gauge pressure is relative to atmosphere, absolute to vacuum, differential between two ports: 1 bar(g) ≈ 2.013 bar(a) at sea level.",
        "Scaling: value = low + (signal − signal_low)/(span of signal) × (high − low). For 4–20 mA: P = P₀ + (I − 4)/16 × range.",
        "4 mA 'live zero' lets the receiver detect a broken loop; NAMUR NE 43 uses &lt; 3.6 mA and &gt; 21 mA as fault levels.",
        "Loop budget: supply ≥ transmitter minimum voltage + 20 mA × (burden + cable resistance).",
        "Accuracy specifications usually combine non-linearity, hysteresis and repeatability as % of full scale; temperature effects add to that.",
    ],
    body=f'''
<h2 id="types">1. Sensor types and references</h2>
{table(["Technology","Typical use"],[["Bonded/thin-film strain gauge on steel diaphragm","Industrial transmitters, hydraulics"],["Piezoresistive silicon","General purpose, compact, low cost"],
["Capacitive","Low pressures, high stability, differential"],["Piezoelectric","Dynamic pressure (combustion, pulsation); no static measurement"],["Resonant (silicon or quartz)","Highest accuracy references"]])}
{table(["Reference","Zero point","Example"],[["Gauge (g)","Local atmosphere","Lube oil pressure 3 bar(g)"],["Absolute (a)","Perfect vacuum","Altitude chamber, vapour pressure"],["Sealed gauge","Sealed reference ≈ 1 atm","High ranges, outdoor"],["Differential (d)","Second port","Filter ΔP, flow orifice"]])}

<h2 id="signals">2. Analogue signal standards</h2>
{table(["Signal","Strengths","Weaknesses"],[["4–20 mA (2-wire)","Immune to cable resistance; long distance; live zero detects faults; loop-powered","Needs loop voltage budget; one signal per loop"],
["0–10 V / 0–5 V","Simple, cheap","Cable drop and noise; 0 V = valid reading so broken wire is not detected"],["1–5 V (from 4–20 mA via 250 Ω)","Live zero preserved","Burden resistor tolerance adds error"],["Digital (HART, Modbus, IO-Link)","Diagnostics, multivariable","Configuration needed"]])}
{formula("Scaling:  value = V_lo + (S − S_lo) / (S_hi − S_lo) · (V_hi − V_lo)\n4–20 mA:  P = P0 + (I − 4) / 16 · (P1 − P0)\nNAMUR NE 43: 3.8–20.5 mA measuring range; ≤ 3.6 or ≥ 21 mA = failure signal")}

<h2 id="loop">3. Loop design</h2>
{fig(loop_svg, "Figure 1. Two-wire 4–20 mA loop: supply, transmitter and receiver burden in series.")}
{formula("R_max (total loop) = (V_supply − V_min_transmitter) / 0.020 A")}
<p>Example: a 24 V supply and a transmitter needing 10 V allow {Rmax:.0f} Ω in the loop: a 250 Ω input plus several hundred ohms of cable. Isolate loops that share a common ground with other circuits to avoid ground loops.</p>

<h2 id="accuracy">4. Accuracy terms</h2>
<ul><li><b>Non-linearity, hysteresis, repeatability (NLHR):</b> often combined as "accuracy ±0.25 % FS".</li><li><b>Thermal zero and span shifts:</b> e.g. ±0.02 % FS/K; can dominate outdoors.</li>
<li><b>Long-term stability:</b> e.g. ±0.1 % FS per year; recalibrate periodically.</li><li><b>Total error band</b> is the honest figure: the worst error over the stated temperature range.</li></ul>
<h3 id="example">Worked example</h3>
<p>A 0–10 bar transmitter reads {Imeas} mA → P = 0 + ({Imeas} − 4)/16 × 10 = <b>{Pread:.2f} bar</b>.</p>
''',
    calcs=[dict(id="scale", title="Signal scaling and loop budget",
                presets=[dict(label="0–10 bar, 13.6 mA", v=dict(lo=0, hi=10, s=13.6, slo=4, shi=20, Vs=24, Vm=10, Rb=250, Rc=20)), dict(label="0–10 V input, 6.2 V", v=dict(lo=0, hi=10, s=6.2, slo=0, shi=10, Vs=24, Vm=10, Rb=250, Rc=20))],
                inputs=[dict(id="lo", label="Range low (eng. units)", value=0), dict(id="hi", label="Range high", value=10), dict(id="s", label="Measured signal (mA or V)", value=13.6),
                        dict(id="slo", label="Signal low (4 or 0)", value=4), dict(id="shi", label="Signal high (20 or 10)", value=20),
                        dict(id="Vs", label="Loop supply (V)", value=24), dict(id="Vm", label="Transmitter min voltage (V)", value=10), dict(id="Rb", label="Burden resistor (Ω)", value=250), dict(id="Rc", label="Cable resistance, loop (Ω)", value=20)],
                js='''var val=v.lo+(v.s-v.slo)/(v.shi-v.slo)*(v.hi-v.lo),Rmax=(v.Vs-v.Vm)/0.02,need=v.Vm+0.02*(v.Rb+v.Rc),fault=(v.slo===4)&&(v.s<3.6||v.s>21);
return {rows:[["Engineering value",fmt(val,4)],["% of span",fmt((v.s-v.slo)/(v.shi-v.slo)*100,2)+" %"],["Max loop resistance",fmt(Rmax,0)+" Ω"],["Supply needed at 20 mA",fmt(need,2)+" V"],["Burden voltage at 20 mA",fmt(0.02*v.Rb,2)+" V"]],
verdict:fault?["bad","Signal outside NAMUR NE 43 limits: sensor or loop fault."]:(need>v.Vs?["bad","Loop supply too low for 20 mA through this resistance."]:["ok","Signal valid and loop voltage budget adequate."])};''')],
    quiz=[
        dict(q="The main advantage of 4–20 mA over 0–10 V is:", o=["Lower cost", "Immunity to cable resistance and broken-wire detection", "Higher resolution", "No power needed"], a=1, e="Current is the same around the loop; 0 mA signals a fault."),
        dict(q="Under NAMUR NE 43 a current below 3.6 mA means:", o=["Zero pressure", "Failure signal", "Overrange", "Calibration mode"], a=1, e="≤ 3.6 mA indicates a fault."),
        dict(q="Gauge pressure is measured relative to:", o=["Vacuum", "Local atmosphere", "Second port", "Sea level only"], a=1, e="Gauge = relative to ambient."),
        dict(q="Which sensor cannot measure static pressure?", o=["Strain gauge", "Piezoresistive", "Piezoelectric", "Capacitive"], a=2, e="Piezoelectric charge leaks away; dynamic only."),
        dict(q="A 250 Ω resistor converts 4–20 mA into:", o=["0–5 V", "1–5 V", "0–10 V", "2–10 V"], a=1, e="4 mA × 250 = 1 V; 20 mA × 250 = 5 V."),
        dict(q="Filter differential pressure is measured with a sensor of type:", o=["Absolute", "Gauge", "Differential", "Sealed"], a=2, e="ΔP across two ports."),
        dict(q="0–16 bar transmitter reads 10 mA. Pressure in bar?", num=6, unit="bar", e="(10 − 4)/16 × 16 = 6 bar."),
        dict(q="Supply 24 V, transmitter min 12 V. Max loop resistance (Ω)?", num=600, unit="Ω", e="(24 − 12)/0.02 = 600 Ω."),
    ],
    refs=["IEC 60381-1, Analogue signals for process control systems — Direct current signals.", "NAMUR NE 43, Standardization of the signal level for the failure information of digital transmitters.",
          "IEC 61298, Process measurement and control devices — Methods for evaluating performance.", "Liptak, B. G. (ed.), Instrument Engineers' Handbook, Vol. 1: Process Measurement and Analysis, CRC Press."],
    links=[("Wikipedia — Current loop", "https://en.wikipedia.org/wiki/Current_loop"), ("Wikipedia — Pressure sensor", "https://en.wikipedia.org/wiki/Pressure_sensor")],
))

# =====================================================================================
# 19. TORQUE MEASUREMENT
# =====================================================================================
dsh, Tq, Gs, GF, Vex = 40.0, 500.0, 80e3, 2.0, 10.0
tau_t = 16 * Tq * 1000 / (math.pi * dsh ** 3)
gamma = tau_t / Gs
eps45 = gamma / 2
vout = GF * eps45 * 1000  # mV/V
torque_svg = '''<svg viewBox="0 0 900 260" role="img" aria-label="Torsion strain gauges on shaft">
<rect x="80" y="90" width="460" height="80" rx="10" fill="var(--blue3)" stroke="var(--blue)" stroke-width="2.5"/>
<g transform="translate(240,130) rotate(-45)"><rect x="-22" y="-8" width="44" height="16" fill="var(--orange)" /></g>
<g transform="translate(320,130) rotate(45)"><rect x="-22" y="-8" width="44" height="16" fill="var(--purple)" /></g>
<text x="240" y="80" text-anchor="middle" font-size="12.5">gauge at +45° (tension)</text><text x="330" y="200" text-anchor="middle" font-size="12.5">gauge at −45° (compression)</text>
<path d="M60 130 a 20 40 0 1 0 0 1" fill="none" stroke="var(--ink)" stroke-width="2.5"/><text x="40" y="70" font-size="13" font-weight="700">T</text>
<path d="M560 130 a 20 40 0 1 1 0 -1" fill="none" stroke="var(--ink)" stroke-width="2.5"/><text x="575" y="70" font-size="13" font-weight="700">T</text>
<g font-size="13"><text x="610" y="100">Four gauges (two pairs at ±45°,</text><text x="610" y="120">opposite sides) form a full bridge:</text><text x="610" y="145">bending and axial strain cancel,</text><text x="610" y="165">temperature effects cancel,</text><text x="610" y="185">output = GF · ε45 (mV/V).</text></g>
</svg>'''

ARTICLES.append(dict(
    slug="torque-measurement", group="instrumentation",
    title="Torque Measurement: Strain-Gauge Shafts, Torque Flanges and Reaction Methods",
    short="Torque measurement",
    tags=["Torque", "Strain gauge", "Wheatstone bridge", "Testing"],
    desc="Measuring shaft torque with ±45° strain-gauge full bridges, telemetry and torque flanges, reaction torque, calibration, accuracy classes and the arithmetic from torque to mV/V.",
    blurb="From torque to shear strain to bridge output: strain-gauge torque shafts, rotary torque flanges and reaction measurement.",
    lead="Torque is measured either in the rotating shaft or as the reaction on a stationary housing. In-line methods use strain gauges bonded at ±45° to the shaft axis, where torsion produces pure tension and compression. Commercial torque flanges package the same principle with contactless power and signal transfer and a calibrated accuracy class.",
    takeaways=[
        "Torsional shear stress τ = 16T/(πd³) for a solid shaft; principal strains at ±45° are ±γ/2 = ±τ/(2G).",
        "A full bridge of four gauges at ±45° gives output V<sub>o</sub>/V<sub>ex</sub> = GF·ε (about 2 mV/V at 1,000 µε) and cancels bending, axial load and temperature.",
        "Rotating signals are transferred by slip rings (old), radio telemetry, or inductive/optical coupling in torque flanges.",
        "Reaction (trunnion) torque includes bearing friction and misses inertia effects during acceleration.",
        "Calibrate with a lever and dead weights or a reference transducer, traceable to national standards.",
    ],
    body=f'''
<h2 id="principle">1. Principle</h2>
{fig(torque_svg, "Figure 1. Strain gauges at ±45° on a shaft in torsion.")}
{formula("τ = 16·T / (π·d³)          (solid shaft; hollow: τ = 16·T·D / (π·(D⁴ − d⁴)))\nγ = τ / G                  G ≈ 80 GPa (steel)\nε(±45°) = ± γ / 2\nFull bridge (4 active):  Vo / Vex = GF · ε45       GF ≈ 2.0")}

<h2 id="methods">2. Methods compared</h2>
{table(["Method","Accuracy (typ.)","Notes"],[["Rotary torque flange (contactless)","±0.05–0.1 % FS","Compact, high speed, speed sensor often built in"],["Strain-gauged test shaft + telemetry","±0.2–0.5 %","Measures in the actual shaft; needs calibration"],
["Slip-ring shaft transducer","±0.1–0.2 %","Brush wear and noise; older systems"],["Reaction torque (trunnion / load cell)","±0.1–0.25 %","Includes bearing friction; no inertia torque"],["Motor current estimate","±2–10 %","Only for rough monitoring"]])}

<h2 id="practice">3. Practical points</h2>
<ul><li>Design the measuring section for 1,000–1,500 µε at rated torque: enough signal, well below fatigue limits.</li>
<li>Protect gauges from oil and temperature; use temperature-compensated gauges matched to the shaft material.</li>
<li>Check zero with no torque before every test; record zero drift with temperature.</li>
<li>Bandwidth: torsional vibration can exceed the average torque by a large margin; choose an amplifier bandwidth that captures it.</li>
<li>Power: P [kW] = T [N·m] × n [rpm] / 9,549.</li></ul>

<h2 id="example">4. Worked example</h2>
<p>Steel shaft d = {dsh:.0f} mm, torque {Tq:.0f} N·m, G = 80 GPa, GF = 2.0, excitation {Vex:.0f} V.</p>
{table(["Step","Result"],[["τ = 16T/(πd³)",f"{tau_t:.1f} MPa"],["γ = τ/G",f"{gamma*1e6:.0f} µrad"],["ε45 = γ/2",f"{eps45*1e6:.0f} µε"],["Bridge output",f"{vout:.3f} mV/V"],["At 10 V excitation",f"<b>{vout*Vex:.2f} mV</b>"]],num_cols=(1,))}
<p>The strain is low ({eps45*1e6:.0f} µε); a hollow or reduced-diameter measuring section would give a stronger signal.</p>
''',
    calcs=[dict(id="trq", title="Torque shaft strain and bridge output",
                presets=[dict(label="Ø40 steel, 500 N·m", v=dict(T=500, D=40, di=0, G=80, GF=2, Vex=10, n=3000)), dict(label="Hollow Ø30/20, 150 N·m", v=dict(T=150, D=30, di=20, G=80, GF=2.1, Vex=5, n=12000))],
                inputs=[dict(id="T", label="Torque (N·m)", value=500), dict(id="D", label="Outer diameter (mm)", value=40), dict(id="di", label="Bore (mm, 0 = solid)", value=0),
                        dict(id="G", label="Shear modulus G (GPa)", value=80), dict(id="GF", label="Gauge factor", value=2), dict(id="Vex", label="Excitation (V)", value=10), dict(id="n", label="Speed (rpm)", value=3000)],
                js='''var tau=16*v.T*1000*v.D/(Math.PI*(Math.pow(v.D,4)-Math.pow(v.di,4))),g=tau/(v.G*1000),e=g/2,o=v.GF*e*1000;
return {rows:[["Shear stress τ",fmt(tau,1)+" MPa"],["Strain at ±45°",fmt(e*1e6,0)+" µε"],["Bridge output",fmt(o,4)+" mV/V"],["Signal at excitation",fmt(o*v.Vex,3)+" mV"],["Power",fmt(v.T*v.n/9549,2)+" kW"]],
verdict:e*1e6<500?["caution","Low strain (< 500 µε): small signal; consider a smaller section."]:(e*1e6>2000?["bad","High strain (> 2000 µε): check fatigue strength."]:["ok","Strain in the usual 500–2000 µε design range."])};''')],
    quiz=[
        dict(q="Torsion strain gauges are placed at:", o=["0° to the axis", "90°", "±45°", "30°"], a=2, e="Principal strains under pure torsion are at ±45°."),
        dict(q="A full bridge on a torque shaft cancels:", o=["Torque", "Bending, axial strain and temperature effects", "Speed", "Nothing"], a=1, e="Symmetric arrangement cancels unwanted strains."),
        dict(q="Reaction torque measurement misses:", o=["Steady torque", "Inertia torque during acceleration", "Power", "Speed"], a=1, e="Housing reaction excludes rotor inertia torque."),
        dict(q="Shear stress in a solid shaft is:", o=["32T/(πd³)", "16T/(πd³)", "4T/(πd²)", "T/d"], a=1, e="τ = 16T/(πd³)."),
        dict(q="Typical gauge factor of metal foil gauges:", o=["0.5", "2", "50", "100"], a=1, e="≈ 2.0–2.1."),
        dict(q="Contactless torque flanges transfer the signal by:", o=["Slip rings", "Inductive or radio telemetry", "Hydraulics", "Optical fibre only"], a=1, e="No wear parts."),
        dict(q="T = 200 N·m, solid shaft 30 mm. τ in MPa?", num=37.7, unit="MPa", e="16 × 200,000/(π × 27,000) = 37.7 MPa."),
        dict(q="ε45 = 500 µε, GF = 2. Full-bridge output in mV/V?", num=1.0, unit="mV/V", e="2 × 500e-6 = 1.0 mV/V."),
    ],
    refs=["Hoffmann, K., An Introduction to Measurements Using Strain Gages, HBM, 1989.", "DIN 51309, Materials testing machines — Calibration of static torque measuring devices.",
          "EURAMET cg-14, Guidelines on the Calibration of Static Torque Measuring Devices.", "Window, A. L. (ed.), Strain Gauge Technology, 2nd ed., Elsevier."],
    links=[("Wikipedia — Torque sensor", "https://en.wikipedia.org/wiki/Torque_sensor"), ("Wikipedia — Strain gauge", "https://en.wikipedia.org/wiki/Strain_gauge")],
))

# =====================================================================================
# 20. CTs AND THREE-PHASE POWER
# =====================================================================================
VL, IL, pf = 415.0, 100.0, 0.86
Pp = math.sqrt(3) * VL * IL * pf / 1000
Sp = math.sqrt(3) * VL * IL / 1000
Qp = math.sqrt(Sp ** 2 - Pp ** 2)
ctp, cts = 200, 5
Isec = IL * cts / ctp
Rl = 2 * 20 * 0.0172 / 2.5
burden = cts ** 2 * Rl + 1.0
phasor = '''<svg viewBox="0 0 900 300" role="img" aria-label="Power triangle">
<line x1="120" y1="240" x2="520" y2="240" stroke="var(--blue)" stroke-width="5"/><text x="320" y="268" text-anchor="middle" font-size="14" font-weight="700">P (kW) — real power</text>
<line x1="520" y1="240" x2="520" y2="35" stroke="var(--orange)" stroke-width="5" stroke-dasharray="12 7"/><text x="530" y="140" font-size="14" font-weight="700">Q (kvar) — reactive</text>
<line x1="120" y1="240" x2="520" y2="35" stroke="var(--purple)" stroke-width="5" stroke-dasharray="4 5"/><text x="250" y="120" font-size="14" font-weight="700">S (kVA) — apparent</text>
<path d="M190 240 A 70 70 0 0 0 182 208" fill="none" stroke="var(--ink)" stroke-width="2"/><text x="200" y="225" font-size="14" font-weight="700">φ</text>
<g font-size="13"><text x="620" y="90">S = √3 · V_L · I_L</text><text x="620" y="115">P = S · cos φ</text><text x="620" y="140">Q = S · sin φ</text><text x="620" y="165">PF = P / S</text></g></svg>'''

ARTICLES.append(dict(
    slug="current-transformers-and-three-phase-power", group="instrumentation",
    title="Current Transformers and Three-Phase Power Measurement",
    short="CTs and 3-phase power",
    tags=["Electrical", "Current transformer", "Power", "Power factor"],
    desc="Current transformer ratios, burden and accuracy classes, open-secondary hazards, three-phase real, reactive and apparent power, power factor, wattmeter methods and harmonics.",
    blurb="Using CTs correctly (ratio, burden, class, safety) and calculating three-phase kW, kVA, kvar and power factor.",
    lead="Large currents are measured through current transformers (CTs) that scale them down to 1 A or 5 A for meters. Combined with voltage, they give real power, reactive power and power factor, which matter for energy accounting, motor and drive testing, and sizing supplies. A CT is simple, but its burden limit and the danger of an open secondary are often overlooked.",
    takeaways=[
        "CT ratio e.g. 200/5: secondary current = primary × 5/200. Never open-circuit a loaded CT secondary: dangerous voltages appear.",
        "The burden (VA) of meter plus wiring must not exceed the CT rating, or accuracy degrades.",
        "Classes: 0.2/0.5/1 for metering; 5P10, 10P20 etc. for protection (accuracy limit at multiples of rated current).",
        "Three-phase balanced: S = √3·V<sub>L</sub>·I<sub>L</sub>, P = S·cos φ, Q = S·sin φ.",
        "With variable-speed drives, use true-RMS, wide-bandwidth power analysers; harmonics distort current and power factor.",
    ],
    body=f'''
<h2 id="ct">1. Current transformers</h2>
{table(["Item","Meaning"],[["Ratio 200/5 A","5 A secondary at 200 A primary"],["Rated burden 5 VA","Max load (meter + leads) for stated accuracy"],["Class 0.5","±0.5 % ratio error at rated current (metering)"],
["Class 5P10","±5 % composite error up to 10 × rated current (protection)"],["Rated secondary 1 A vs 5 A","1 A greatly reduces lead burden on long runs (I²R)"]])}
{formula("Lead burden (VA) = I_s² · R_loop        R_loop = 2 · L · ρ / A      (ρ_Cu = 0.0172 Ω·mm²/m)\nTotal burden = lead burden + instrument burden ≤ CT rated VA")}
{box("warn","Safety","Short the CT secondary (shorting link or test block) before disconnecting a meter. An open secondary drives the core into saturation and can produce kilovolt peaks, damaging insulation and endangering people.")}

<h2 id="power">2. Three-phase power</h2>
{fig(phasor, "Figure 1. Power triangle: real, reactive and apparent power and the power factor angle φ.")}
{table(["Method","Use"],[["Three-wattmeter (3 CTs + 3 VTs, star)","Four-wire systems; any imbalance"],["Two-wattmeter (Aron)","Three-wire systems; P = W1 + W2"],["Single-phase × 3","Balanced loads only (estimate)"]])}
<p><b>Harmonics:</b> drive and rectifier currents contain 5th, 7th, 11th… harmonics. True power factor = P/S includes them; displacement power factor cos φ counts only the fundamental. Measure with a power analyser of adequate bandwidth.</p>

<h2 id="example">3. Worked example</h2>
<p>{VL:.0f} V line voltage, {IL:.0f} A line current, PF {pf}. CT {ctp}/{cts} A with 20 m of 2.5 mm² leads each way and a 1 VA meter.</p>
{table(["Step","Result"],[["S = √3·V·I",f"{Sp:.1f} kVA"],["P = S·PF",f"<b>{Pp:.1f} kW</b>"],["Q",f"{Qp:.1f} kvar"],["Secondary current",f"{Isec:.2f} A"],
["Lead loop resistance",f"{Rl:.3f} Ω"],["Total burden at rated 5 A",f"<b>{burden:.1f} VA</b>: exceeds a 5 VA CT; use 10 VA or a 1 A CT"]],num_cols=(1,))}
''',
    calcs=[dict(id="pwr", title="Three-phase power and CT burden check",
                presets=[dict(label="Worked example", v=dict(V=415, I=100, pf=0.86, p=200, s="5", L=20, A=2.5, m=1, va=5))],
                inputs=[dict(id="V", label="Line voltage (V)", value=415), dict(id="I", label="Line current (A)", value=100), dict(id="pf", label="Power factor", value=0.86),
                        dict(id="p", label="CT primary (A)", value=200), dict(id="s", label="CT secondary", value="5", options=[("5", "5 A"), ("1", "1 A")]),
                        dict(id="L", label="Lead length one way (m)", value=20), dict(id="A", label="Lead cross-section (mm²)", value=2.5), dict(id="m", label="Instrument burden (VA)", value=1), dict(id="va", label="CT rated burden (VA)", value=5)],
                js='''var s=parseFloat(v.s),S=Math.sqrt(3)*v.V*v.I/1000,P=S*v.pf,Q=Math.sqrt(Math.max(S*S-P*P,0)),Is=v.I*s/v.p,R=2*v.L*0.0172/v.A,B=s*s*R+v.m;
return {rows:[["Apparent power S",fmt(S,2)+" kVA"],["Real power P",fmt(P,2)+" kW"],["Reactive power Q",fmt(Q,2)+" kvar"],["CT secondary current",fmt(Is,3)+" A"],["Burden at rated current",fmt(B,2)+" VA","leads "+fmt(s*s*R,2)+" VA"]],
verdict:B>v.va?["bad","Burden exceeds CT rating: use a higher-VA CT, thicker leads or a 1 A secondary."]:["ok","Burden within CT rating."]};''')],
    quiz=[
        dict(q="What must never be done to a CT carrying primary current?", o=["Short the secondary", "Open the secondary circuit", "Measure secondary current", "Earth one secondary terminal"], a=1, e="Open secondary → dangerous high voltage."),
        dict(q="CT class 5P10 is intended for:", o=["Revenue metering", "Protection relays", "Laboratory calibration", "DC measurement"], a=1, e="P = protection; 5 % error up to 10× rated."),
        dict(q="Why choose 1 A secondary CTs for long cable runs?", o=["Cheaper", "Lead burden I²R is 25 times smaller than with 5 A", "More accurate primary", "Lighter"], a=1, e="(1/5)² = 1/25."),
        dict(q="In a balanced 3-phase system, S equals:", o=["V·I", "√3·V_L·I_L", "3·V_L·I_L", "V_L·I_L/√3"], a=1, e="Line quantities."),
        dict(q="The two-wattmeter method works for:", o=["Three-wire systems", "Only balanced four-wire", "DC", "Single phase"], a=0, e="Aron connection for 3-wire."),
        dict(q="Displacement PF differs from true PF when:", o=["Load is resistive", "Harmonics are present", "Voltage is high", "Never"], a=1, e="Harmonic currents reduce true PF."),
        dict(q="415 V, 50 A, PF 0.9: real power in kW?", num=32.35, unit="kW", e="1.732 × 415 × 50 × 0.9 = 32.3 kW."),
        dict(q="CT 300/5 with 180 A primary. Secondary current (A)?", num=3.0, unit="A", e="180 × 5/300 = 3 A."),
    ],
    refs=["IEC 61869-2, Instrument transformers — Additional requirements for current transformers.", "IEC 61000-4-7 and -4-30, Harmonics and power quality measurement methods.",
          "IEEE 1459-2010, Definitions for the Measurement of Electric Power Quantities Under Sinusoidal, Nonsinusoidal, Balanced, or Unbalanced Conditions.", "Hughes, E., Electrical and Electronic Technology, Pearson."],
    links=[("Wikipedia — Current transformer", "https://en.wikipedia.org/wiki/Current_transformer"), ("Wikipedia — Three-phase electric power", "https://en.wikipedia.org/wiki/Three-phase_electric_power")],
))

# =====================================================================================
# 21. PLC INTERLOCKS AND TEST-RIG SAFETY LOGIC
# =====================================================================================
lam, Ti = 2e-6, 8760.0
pfd1 = lam * Ti / 2
pfd2 = (lam * Ti) ** 2 / 3
ladder = '''<svg viewBox="0 0 900 230" role="img" aria-label="Start-stop seal-in ladder rung">
<line x1="40" y1="20" x2="40" y2="210" stroke="var(--ink)" stroke-width="4"/><line x1="860" y1="20" x2="860" y2="210" stroke="var(--ink)" stroke-width="4"/>
<line x1="40" y1="80" x2="860" y2="80" stroke="var(--ink)" stroke-width="2"/>
<g font-size="12.5"><rect x="110" y="64" width="18" height="32" fill="var(--panel)"/><line x1="110" y1="62" x2="110" y2="98" stroke="var(--ink)" stroke-width="3"/><line x1="128" y1="62" x2="128" y2="98" stroke="var(--ink)" stroke-width="3"/><text x="119" y="50" text-anchor="middle">STOP OK</text><text x="119" y="118" text-anchor="middle" font-size="11">(NC button wired)</text>
<rect x="230" y="64" width="18" height="32" fill="var(--panel)"/><line x1="230" y1="62" x2="230" y2="98" stroke="var(--ink)" stroke-width="3"/><line x1="248" y1="62" x2="248" y2="98" stroke="var(--ink)" stroke-width="3"/><text x="239" y="50" text-anchor="middle">E-STOP RELAY OK</text>
<rect x="350" y="64" width="18" height="32" fill="var(--panel)"/><line x1="350" y1="62" x2="350" y2="98" stroke="var(--ink)" stroke-width="3"/><line x1="368" y1="62" x2="368" y2="98" stroke="var(--ink)" stroke-width="3"/><text x="359" y="50" text-anchor="middle">LUBE P OK</text>
<rect x="470" y="64" width="18" height="32" fill="var(--panel)"/><line x1="470" y1="62" x2="470" y2="98" stroke="var(--ink)" stroke-width="3"/><line x1="488" y1="62" x2="488" y2="98" stroke="var(--ink)" stroke-width="3"/><text x="479" y="50" text-anchor="middle">START (NO)</text>
<circle cx="760" cy="80" r="22" fill="var(--blue3)" stroke="var(--blue)" stroke-width="3"/><text x="760" y="85" text-anchor="middle" font-weight="700">RUN</text>
<path d="M420 80 V160 H530 V80" fill="none" stroke="var(--ink)" stroke-width="2"/><rect x="465" y="144" width="18" height="32" fill="var(--panel)"/><line x1="465" y1="142" x2="465" y2="178" stroke="var(--ink)" stroke-width="3"/><line x1="483" y1="142" x2="483" y2="178" stroke="var(--ink)" stroke-width="3"/><text x="474" y="200" text-anchor="middle">RUN (seal-in)</text></g>
</svg>'''

ARTICLES.append(dict(
    slug="plc-interlocks-and-test-rig-safety", group="instrumentation",
    title="PLC Interlocks and Test-Rig Safety Logic: Fail-Safe Design, Trips and SIL/PL",
    short="Interlocks and safety logic",
    tags=["PLC", "Interlocks", "Functional safety", "Test rigs"],
    desc="Designing interlocks for machinery test rigs: permissives and trips, fail-safe wiring, stop categories, cause-and-effect matrices, alarm delays and hysteresis, and SIL/PL reliability basics.",
    blurb="Permissives, trips and fail-safe wiring for test rigs, written up as a cause-and-effect matrix, with SIL/PL reliability basics.",
    lead="A test rig runs machines at their limits, often unattended for long hours. Its control system must stop the rig safely whenever something goes wrong: lubrication lost, overspeed, overtemperature, guard opened. Good interlock design is mostly about clear logic and fail-safe principles; the reliability mathematics of functional safety confirms that the design is good enough.",
    takeaways=[
        "Permissives must be true before starting; trips stop the rig while running. Keep them separate and documented in a cause-and-effect matrix.",
        "Fail-safe: normally-closed contacts and de-energise-to-trip, so a broken wire or lost power stops the rig.",
        "Emergency stops are hard-wired through safety relays or a safety PLC; ordinary PLC logic is not a safety function by itself.",
        "Alarms come before trips; use time delays and hysteresis to avoid nuisance trips, and first-out indication to know what tripped first.",
        "Reliability: PFD<sub>avg</sub> ≈ λ<sub>DU</sub>·T/2 for a single channel; redundancy (1oo2) and frequent proof tests reduce it.",
    ],
    body=f'''
<h2 id="concepts">1. Permissives, alarms and trips</h2>
{table(["Kind","When checked","Example"],[["Permissive","Before start","Lube pressure &gt; 2 bar, guard closed, coolant flow OK, no active trip"],["Alarm","Running","Oil temperature &gt; 85 °C, vibration &gt; alert level"],["Trip","Running","Oil pressure &lt; 1 bar for 2 s, overspeed &gt; 110 %, vibration &gt; alarm level, E-stop"]])}
{fig(ladder, "Figure 1. Start/stop seal-in rung with permissives in series: any open contact drops the RUN coil, and a restart needs a new START command.")}

<h2 id="failsafe">2. Fail-safe principles</h2>
<ul><li>Use normally-closed (break) contacts for stop and trip inputs; a broken wire then looks like a trip.</li>
<li>Outputs de-energise to trip (spring-return valves, contactors drop out).</li>
<li>Monitor analogue signals for out-of-range (e.g. &lt; 3.6 mA) and treat as a trip or alarm.</li>
<li>Use a watchdog: if the PLC stops scanning, a hardware relay drops the drive.</li>
<li>Require a manual reset after a trip; never auto-restart.</li></ul>
{table(["IEC 60204-1 stop category","Action"],[["0","Immediate removal of power (uncontrolled stop)"],["1","Controlled stop with power, then power removed"],["2","Controlled stop, power left on"]])}

<h2 id="matrix">3. Cause-and-effect matrix (example rig)</h2>
{table(["Cause","Setting","Delay","Effect"],[
["E-stop pressed","—","0","Cat 0 or 1 stop; drive enable off via safety relay"],["Guard or hood open","—","0","Trip; inhibit start"],
["Lube oil pressure low","&lt; 1.0 bar","2 s","Trip drive; keep lube pump on for run-down"],["Lube oil temperature high","&gt; 85 °C alarm / &gt; 95 °C trip","10 s","Alarm, then trip"],
["Overspeed","&gt; 105 % alarm / &gt; 110 % trip","0","Trip"],["Vibration high","&gt; alert / &gt; alarm","5 s","Alarm, then controlled stop"],
["Cooling water flow low","&lt; set flow","10 s","Alarm, then controlled stop"],["Phase failure / earth fault","Relay","0","Trip"],["Sensor fault (&lt; 3.6 mA)","—","1 s","Treat as trip for that function"],
])}
<p>Use hysteresis (e.g. reset 3–5 % below the alarm level) and short time delays so that noise does not cause nuisance trips, but keep delays short for fast-acting hazards.</p>

<h2 id="sil">4. Functional safety in brief</h2>
{formula("Single channel (1oo1):  PFDavg ≈ λDU · T / 2\nRedundant (1oo2):       PFDavg ≈ (λDU · T)² / 3          (ignoring common cause)\nSIL 1: 10⁻² – 10⁻¹    SIL 2: 10⁻³ – 10⁻²    SIL 3: 10⁻⁴ – 10⁻³   (low demand)")}
<p>ISO 13849-1 uses Performance Levels PL a–e based on architecture (category), MTTFd, diagnostic coverage and common-cause failures; IEC 62061 uses SIL for machinery. Example: λ<sub>DU</sub> = {lam:.0e}/h, proof test yearly: 1oo1 PFD ≈ {pfd1:.1e} (SIL 2 band); 1oo2 ≈ {pfd2:.1e}.</p>
''',
    calcs=[dict(id="pfd", title="Average probability of failure on demand",
                presets=[dict(label="λ 2e-6/h, yearly test", v=dict(lam=2e-6, T=8760, beta=5)), dict(label="λ 1e-5/h, monthly test", v=dict(lam=1e-5, T=730, beta=10))],
                inputs=[dict(id="lam", label="Dangerous undetected failure rate λDU (/h)", value=2e-6), dict(id="T", label="Proof test interval (h)", value=8760), dict(id="beta", label="Common cause β (%)", value=5)],
                js='''var p1=v.lam*v.T/2,p2=Math.pow((1-v.beta/100)*v.lam*v.T,2)/3+(v.beta/100)*v.lam*v.T/2;
function sil(p){return p<1e-4?"better than SIL 3":p<1e-3?"SIL 3":p<1e-2?"SIL 2":p<1e-1?"SIL 1":"below SIL 1";}
return {rows:[["1oo1 PFDavg",p1.toExponential(2),sil(p1)],["1oo2 PFDavg (with β)",p2.toExponential(2),sil(p2)],["Risk reduction 1oo1",fmt(1/p1,0)+" ×"],["Risk reduction 1oo2",fmt(1/p2,0)+" ×"]]};''')],
    quiz=[
        dict(q="A permissive is checked:", o=["Only after a trip", "Before starting", "Only during shutdown", "Never"], a=1, e="Permissives must be satisfied before start."),
        dict(q="Fail-safe trip inputs normally use:", o=["Normally-open contacts", "Normally-closed contacts", "Analogue only", "Software flags"], a=1, e="Wire break = trip."),
        dict(q="IEC 60204-1 stop category 0 means:", o=["Controlled stop, power on", "Immediate removal of power", "Controlled stop then power off", "No stop"], a=1, e="Uncontrolled stop."),
        dict(q="First-out indication tells you:", o=["The last alarm", "Which trip occurred first", "The number of trips", "Nothing"], a=1, e="Essential when one trip causes others."),
        dict(q="Hysteresis on an alarm prevents:", o=["Alarms", "Chattering on and off near the threshold", "Trips", "Data logging"], a=1, e="Reset at a lower level."),
        dict(q="After a trip, the rig should:", o=["Restart automatically", "Require a manual reset", "Ignore it", "Restart after 1 minute"], a=1, e="Never auto-restart."),
        dict(q="λDU = 1e-6/h, test interval 8760 h. PFDavg 1oo1?", num=0.00438, tol=0.02, e="1e-6 × 8760/2 = 4.38e-3."),
        dict(q="Alarm at 85 °C with 4 % hysteresis. Reset temperature (°C)?", num=81.6, unit="°C", e="85 × 0.96 = 81.6 °C."),
    ],
    refs=["IEC 60204-1, Safety of machinery — Electrical equipment of machines.", "ISO 13849-1, Safety-related parts of control systems — General principles for design.",
          "IEC 62061, Safety of machinery — Functional safety of safety-related control systems.", "IEC 61508 / IEC 61511, Functional safety.", "ISA-18.2 / IEC 62682, Management of alarm systems for the process industries."],
    links=[("Wikipedia — Safety integrity level", "https://en.wikipedia.org/wiki/Safety_integrity_level"), ("Wikipedia — Ladder logic", "https://en.wikipedia.org/wiki/Ladder_logic")],
))
