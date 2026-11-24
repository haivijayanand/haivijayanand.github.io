"""
TOOL:    Vijay_Wiki articles — batch 2 group A (rotating machinery and testing)
FAMILY:  vijay-wiki
VERSION: 1.0.0
DATE:    2026-11-24
CHAT:    claude.ai — Vijay_Wiki: next batch of topics (36 articles)
CHANGES: 1.0.0 Rotordynamics, torsional vibration, gearbox diagnostics, order tracking, journal bearings, gearbox heat balance
"""
import math
import numpy as np
from wiki import plot, flow, bars, fig, table, box, formula

ARTICLES = []

# ---------------------------------------------------------------- 48 ROTORDYNAMICS
E, dsh, Lsh, mdisc = 210000.0, 30.0, 500.0, 10.0
I = math.pi * dsh ** 4 / 64
kN = 48 * E * I / Lsh ** 3 * 1000  # N/m
wcr = math.sqrt(kN / mdisc); ncr = wcr * 60 / (2 * math.pi)
rr = np.linspace(0.02, 3, 300)
resp = plot([dict(pts=[(float(r) * ncr, float(r * r / math.sqrt((1 - r * r) ** 2 + (2 * z * r) ** 2))) for r in rr], label=f"ζ = {z}", at=ncr * (0.75 if z == 0.05 else 1.6))
             for z in (0.05, 0.15)], "speed (rpm)", "whirl amplitude / mass eccentricity", xlim=(0, 3 * ncr), ylim=(0, 10), h=300)
ARTICLES.append(dict(
    slug="rotordynamics-critical-speeds", group="rotating",
    title="Rotordynamics Basics: Critical Speeds, the Jeffcott Rotor and Campbell Diagrams",
    short="Rotordynamics", tags=["Rotordynamics", "Critical speed", "Vibration", "Shafts"],
    desc="Introductory rotordynamics: critical speeds of a shaft–disc rotor, unbalance response, separation margins, gyroscopic effects, forward and backward whirl, and Campbell diagrams, with a critical-speed calculator.",
    blurb="Where a rotor's critical speeds lie, what happens when you run through them, and how much margin to keep.",
    lead="A rotating shaft carrying discs or impellers bends under its own unbalance. At certain speeds, the critical speeds, the unbalance excites a natural frequency of the rotor on its bearings and the deflection becomes large. The simplest model, the Jeffcott rotor, explains most of the behaviour and gives a first estimate of the first critical speed.",
    takeaways=[
        "First critical speed of a disc at mid-span on a simply supported shaft: ω<sub>cr</sub> = √(k/m) with k = 48EI/L³.",
        "Below the critical speed the heavy side leads outward; above it the rotor self-centres and whirl amplitude tends to the mass eccentricity.",
        "Keep operating speeds away from criticals: typically at least 15–25 % separation unless the mode is well damped (API 684 sets margins by amplification factor).",
        "Bearing and support flexibility lower the critical speed; gyroscopic effects split modes into forward and backward whirl as speed rises.",
        "A Campbell diagram plots natural frequencies against speed with excitation order lines; crossings are potential critical speeds.",
    ],
    body=f'''
<h2 id="jeffcott">1. The Jeffcott rotor</h2>
{formula("k = 48·E·I / L³ (disc at mid-span, simply supported, massless shaft)     I = π·d⁴/64\nω_cr = √(k/m)          n_cr = ω_cr·60/(2π)\nWhirl amplitude  r_w = e·r² / √[(1 − r²)² + (2ζr)²],   r = ω/ω_cr\nDunkerley (several masses):  1/ω₁² ≈ Σ 1/ωᵢ²")}
{fig(resp, f"Figure 1. Unbalance response of a Jeffcott rotor (first critical ≈ {ncr:,.0f} rpm for the worked example). Above the critical, whirl tends to the mass eccentricity e.")}
<h2 id="margins">2. Separation margins and amplification</h2>
<p>The amplification factor AF ≈ N<sub>cr</sub>/(N₂ − N₁) from the half-power points of the run-up response measures how sharp a critical is. API 684 / API 617 require larger separation margins for sharp (high AF) modes; well-damped modes with AF below about 2.5 need no margin. Rigid rotors run below their first critical; flexible rotors (turbines, compressors) pass through one or more criticals during start-up and need adequate damping and quick acceleration.</p>
<h2 id="supports">3. Bearings, supports and gyroscopic effects</h2>
<ul><li>Shaft and bearing stiffness act in series: 1/k<sub>total</sub> = 1/k<sub>shaft</sub> + 1/k<sub>bearings</sub>. Soft supports lower criticals.</li>
<li>Oil-film and squeeze-film dampers add damping; rolling bearings add very little.</li>
<li>Overhung discs show strong gyroscopic stiffening: forward-whirl frequencies rise with speed, backward-whirl frequencies fall.</li>
<li>Instabilities (oil whirl at ≈ 0.42–0.48×, internal friction, seal cross-coupling) produce sub-synchronous vibration.</li></ul>
<h2 id="example">4. Worked example</h2>
<p>Steel shaft Ø{dsh:.0f} mm, span {Lsh:.0f} mm, {mdisc:.0f} kg disc at mid-span, rigid bearings.</p>
{table(["Step","Result"],[["I = πd⁴/64",f"{I:,.0f} mm⁴"],["k = 48EI/L³",f"{kN/1e6:.2f} MN/m"],["ω_cr",f"{wcr:.0f} rad/s"],["n_cr",f"<b>{ncr:,.0f} rpm</b>"],["Max speed for 20 % margin below",f"{ncr*0.8:,.0f} rpm"]],num_cols=(1,))}
''',
    calcs=[dict(id="rd", title="First critical speed (disc at mid-span)",
                presets=[dict(label="Worked example", v=dict(d=30, L=500, m=10, E=210, kb=0, n=3000)), dict(label="With soft bearings", v=dict(d=30, L=500, m=10, E=210, kb=5, n=3000))],
                inputs=[dict(id="d", label="Shaft diameter (mm)", value=30), dict(id="L", label="Bearing span (mm)", value=500), dict(id="m", label="Disc mass (kg)", value=10), dict(id="E", label="E (GPa)", value=210),
                        dict(id="kb", label="Total bearing stiffness (MN/m, 0 = rigid)", value=0), dict(id="n", label="Operating speed (rpm)", value=3000)],
                js='''var I=Math.PI*Math.pow(v.d,4)/64,ks=48*v.E*1000*I/Math.pow(v.L,3)*1000,k=v.kb>0?1/(1/ks+1/(v.kb*1e6)):ks,w=Math.sqrt(k/v.m),n=w*60/(2*Math.PI),sep=(n-v.n)/n*100;
return {rows:[["Shaft stiffness",fmt(ks/1e6,3)+" MN/m"],["Effective stiffness",fmt(k/1e6,3)+" MN/m"],["First critical",fmt(n,0)+" rpm",fmt(w/(2*Math.PI),1)+" Hz"],["Separation from operating speed",fmt(Math.abs(sep),1)+" %",sep>0?"running below critical":"running above critical"]],
verdict:Math.abs(sep)<20?["bad","Within 20 % of the first critical speed."]:["ok","At least 20 % separation."]};''')],
    quiz=[
        dict(q="The Jeffcott rotor critical speed is:", o=["k/m", "√(k/m)", "√(m/k)", "48EI"], a=1, e="ω = √(k/m)."),
        dict(q="Above the critical speed a lightly damped rotor:", o=["Whirl grows without limit", "Self-centres, amplitude tends to the eccentricity", "Stops whirling", "Doubles in frequency"], a=1, e="Mass centre moves towards the axis."),
        dict(q="Soft bearing supports make the critical speed:", o=["Higher", "Lower", "Unchanged", "Infinite"], a=1, e="Series stiffness falls."),
        dict(q="A Campbell diagram plots:", o=["Stress vs strain", "Natural frequencies vs speed with excitation orders", "Spectrum vs time", "Phase vs amplitude"], a=1, e="Crossings show potential criticals."),
        dict(q="Oil whirl appears at about:", o=["1×", "2×", "0.42–0.48×", "BPFO"], a=2, e="Sub-synchronous, just under half speed."),
        dict(q="Rigid rotors normally operate:", o=["Above the first critical", "Below the first critical", "At the critical", "Between the 2nd and 3rd"], a=1, e="Definition of rigid behaviour."),
        dict(q="k = 2 MN/m, m = 20 kg. First critical in rpm?", num=3019.9, unit="rpm", e="√(1e5) = 316.2 rad/s → 3,020 rpm."),
        dict(q="Doubling shaft diameter (same span) multiplies stiffness by:", num=16, e="I ∝ d⁴."),
    ],
    refs=["Childs, D., Turbomachinery Rotordynamics, Wiley, 1993.", "API Standard 684, Rotordynamic Tutorial, 2nd ed.", "Vance, J., Zeidan, F. and Murphy, B., Machinery Vibration and Rotordynamics, Wiley, 2010.", "Friswell, M. I. et al., Dynamics of Rotating Machines, Cambridge University Press, 2010."],
    links=[("Wikipedia — Rotordynamics", "https://en.wikipedia.org/wiki/Rotordynamics")],
))

# ---------------------------------------------------------------- 49 TORSIONAL VIBRATION
G, dts, Lts = 80000.0, 40.0, 400.0
Jp = math.pi * dts ** 4 / 32
kt = G * Jp / Lts / 1000  # N·m/rad
J1, J2 = 0.5, 0.2
ftv = math.sqrt(kt * (J1 + J2) / (J1 * J2)) / (2 * math.pi)
orders = [1, 2, 4]
camp = plot([dict(pts=[(n, o * n / 60) for n in range(0, 6001, 100)], label=f"{o}× order", at=5200 if o == 1 else (2600 if o == 2 else 1200)) for o in orders] +
            [dict(pts=[(0, ftv), (6000, ftv)], label=f"torsional mode {ftv:.0f} Hz", at=300, width=2.5)],
            "shaft speed (rpm)", "frequency (Hz)", xlim=(0, 6000), ylim=(0, 450), h=300)
ARTICLES.append(dict(
    slug="torsional-vibration-drive-trains", group="rotating",
    title="Torsional Vibration of Drive Trains: Stiffness, Natural Frequencies and Excitation Orders",
    short="Torsional vibration", tags=["Torsional vibration", "Drive trains", "Couplings", "Resonance"],
    desc="Torsional vibration in motor–coupling–gearbox–load trains: shaft torsional stiffness, two-inertia natural frequency, gear-ratio referral, excitation orders, interference diagrams, measurement and mitigation.",
    blurb="Shaft torsional stiffness, natural frequencies of a drive train and how to keep them clear of excitation orders.",
    lead="Torsional vibration is twisting oscillation along a drive train. It is invisible to ordinary accelerometers on bearing housings, yet it can break couplings, fret splines and crack shafts. Engines, gear mesh errors, variable-frequency drives and process pulsation all excite it. The design task is to keep the train's torsional natural frequencies away from the excitation frequencies over the speed range.",
    takeaways=[
        "Shaft torsional stiffness k = G·J/L with J = πd⁴/32 for a solid shaft.",
        "Two-inertia natural frequency f = (1/2π)√[k(J₁ + J₂)/(J₁J₂)]; the softest element (often the coupling) dominates.",
        "Refer inertias and stiffnesses across a gear ratio i to one shaft: J′ = J·i², k′ = k·i² (i = speed of referred shaft / reference shaft).",
        "Excitation frequency = order × shaft speed; plot orders against speed with the natural frequencies (interference diagram).",
        "Fixes: change coupling stiffness, add inertia or damping (elastomeric couplings, viscous dampers), or avoid the speed range.",
    ],
    body=f'''
<h2 id="stiffness">1. Stiffness and inertia</h2>
{formula("k = G·J / L,  J = π·d⁴/32 (solid),  π·(D⁴ − d⁴)/32 (hollow)\nSeries elements: 1/k_total = Σ 1/k_i\nReferral across gear ratio i:  J' = J·i²,  k' = k·i²\nTwo inertias: f = (1/2π)·√[k·(J1 + J2)/(J1·J2)]")}
<h2 id="excitation">2. Excitation sources</h2>
{table(["Source","Order (× shaft speed)"],[["Unbalance / misalignment (torsional coupling)","1×, 2×"],["Four-stroke engine, n cylinders","n/2 × crank speed and harmonics"],["Gear mesh","teeth × shaft speed"],["Universal joint at an angle","2×"],["VFD (PWM, inverter)","6× and 12× electrical frequency and interharmonics"],["Pumps/compressors","vanes or pistons × speed"]])}
{fig(camp, f"Figure 1. Interference (Campbell) diagram for the worked example: a {ftv:.0f} Hz torsional mode crossed by 1×, 2× and 4× orders. Crossings inside the speed range need checking.")}
<h2 id="measurement">3. Measurement</h2>
<ul><li>Speed fluctuation from a toothed wheel or encoder (instantaneous angular speed); twist between two encoders.</li><li>Strain gauges at ±45° on the shaft with telemetry (dynamic torque).</li><li>Laser torsional vibrometers (non-contact).</li></ul>
<h2 id="example">4. Worked example</h2>
<p>Steel shaft Ø{dts:.0f} mm, {Lts:.0f} mm long, between a {J1} kg·m² motor and a {J2} kg·m² load.</p>
{table(["Step","Result"],[["J = πd⁴/32",f"{Jp:,.0f} mm⁴"],["k = GJ/L",f"{kt:,.0f} N·m/rad"],["Natural frequency",f"<b>{ftv:.0f} Hz</b>"],["Crossing with 1× at",f"{ftv*60:,.0f} rpm"],["Crossing with 2× at",f"{ftv*30:,.0f} rpm"],["Crossing with 4× at",f"{ftv*15:,.0f} rpm"]],num_cols=(1,))}
''',
    calcs=[dict(id="tv", title="Two-inertia torsional frequency and order crossings",
                presets=[dict(label="Worked example", v=dict(d=40, L=400, G=80, kc=0, J1=0.5, J2=0.2, ord="1,2,4", nmax=6000))],
                inputs=[dict(id="d", label="Shaft diameter (mm)", value=40), dict(id="L", label="Shaft length (mm)", value=400), dict(id="G", label="G (GPa)", value=80), dict(id="kc", label="Coupling stiffness in series (kN·m/rad, 0 = none)", value=0),
                        dict(id="J1", label="J1 (kg·m²)", value=0.5), dict(id="J2", label="J2 (kg·m²)", value=0.2), dict(id="ord", label="Excitation orders (comma list)", value="1,2,4", text=True), dict(id="nmax", label="Max speed (rpm)", value=6000)],
                js='''var J=Math.PI*Math.pow(v.d,4)/32,ks=v.G*1000*J/v.L/1000*1000/1000,k=v.kc>0?1/(1/ks+1/(v.kc*1000)):ks,f=Math.sqrt(k*(v.J1+v.J2)/(v.J1*v.J2))/(2*Math.PI);
var os=v.ord.split(",").map(parseFloat).filter(function(x){return x>0;}),rows=[["Shaft stiffness",fmt(ks,0)+" N·m/rad"],["Total stiffness",fmt(k,0)+" N·m/rad"],["Natural frequency",fmt(f,1)+" Hz"]],hit=[];
os.forEach(function(o){var n=f*60/o;rows.push(["Crossing with "+o+"×",fmt(n,0)+" rpm",n<=v.nmax?"inside range":"outside range"]);if(n<=v.nmax)hit.push(o+"×");});
return {rows:rows,verdict:hit.length?["caution","Crossings inside speed range: "+hit.join(", ")+". Check dwell time and damping."]:["ok","No crossings in the speed range."]};''')],
    quiz=[
        dict(q="Torsional stiffness of a solid shaft is proportional to:", o=["d", "d²", "d³", "d⁴"], a=3, e="J ∝ d⁴."),
        dict(q="Ordinary bearing-housing accelerometers usually:", o=["Measure torsional vibration well", "Miss torsional vibration", "Measure only torsion", "Are not affected"], a=1, e="Torsion causes little lateral motion."),
        dict(q="Referring an inertia across a gearbox multiplies it by:", o=["i", "i²", "1/i", "√i"], a=1, e="Kinetic energy equivalence."),
        dict(q="A 4-cylinder four-stroke engine's main firing order is:", o=["1×", "2×", "4×", "0.5×"], a=1, e="n/2 = 2× crank speed."),
        dict(q="Which change most easily lowers a train's torsional frequency?", o=["Stiffer shaft", "Softer (elastomeric) coupling", "Smaller inertia", "Higher speed"], a=1, e="Soft element dominates stiffness."),
        dict(q="Excitation frequency for order n at speed N rpm is:", o=["n·N", "n·N/60 Hz", "N/n", "60/(nN)"], a=1, e="Hz = order × rpm/60."),
        dict(q="Mode at 120 Hz; at what rpm does the 2× order cross it?", num=3600, unit="rpm", e="120 × 60/2 = 3,600 rpm."),
        dict(q="k = 10,000 N·m/rad, J1 = J2 = 0.05 kg·m². Frequency in Hz?", num=100.7, unit="Hz", e="√(10000×0.1/0.0025)/2π = 100.7 Hz."),
    ],
    refs=["Nestorides, E. J. (ed.), A Handbook on Torsional Vibration, BICERA, Cambridge University Press, 1958.", "Wilson, W. K., Practical Solution of Torsional Vibration Problems, Chapman & Hall.", "API 684, Rotordynamic Tutorial (torsional analysis).", "Walker, D. N., Torsional Vibration of Turbomachinery, McGraw-Hill, 2004."],
    links=[("Wikipedia — Torsional vibration", "https://en.wikipedia.org/wiki/Torsional_vibration")],
))

# ---------------------------------------------------------------- 50 GEARBOX DIAGNOSTICS
z1, z2, nin = 23, 51, 3000.0
fin = nin / 60; fout = fin * z1 / z2
gmf = z1 * fin
Na = math.gcd(z1, z2)
fht = gmf * Na / (z1 * z2)
fq = np.linspace(0, 2600, 2601)
spec = np.zeros_like(fq)
def add(f, a):
    i = int(round(f));
    if 0 <= i < len(spec): spec[i] += a
for h, a in [(1, 1.0), (2, 0.45)]:
    add(h * gmf, a)
    for k in range(1, 4):
        add(h * gmf + k * fin, 0.18 / k); add(h * gmf - k * fin, 0.18 / k)
        add(h * gmf + k * fout, 0.1 / k); add(h * gmf - k * fout, 0.1 / k)
add(fin, 0.3); add(fout, 0.2)
gplot = plot([dict(pts=[(float(f), float(a)) for f, a in zip(fq, spec)], width=1.6)], "frequency (Hz)", "amplitude (arb.)", xlim=(0, 2600), ylim=(0, 1.1), h=300,
             notes=[(gmf + 15, 1.02, f"GMF {gmf:.0f} Hz"), (2 * gmf + 15, 0.5, "2×GMF"), (gmf - 300, 0.3, "sidebands at ± shaft speeds")])
ARTICLES.append(dict(
    slug="gearbox-vibration-diagnostics", group="vibration",
    title="Gearbox Vibration Diagnostics: Mesh Frequencies, Sidebands, Hunting Tooth and TSA",
    short="Gearbox diagnostics", tags=["Gears", "Vibration", "Diagnostics", "TSA"],
    desc="Reading gearbox vibration spectra: gear mesh frequency and harmonics, sidebands from each shaft, hunting tooth and assembly phase frequencies, time-synchronous averaging, residual signals and condition indicators.",
    blurb="Gear mesh frequency, sidebands and hunting tooth frequency, and how time-synchronous averaging separates each gear's signal.",
    lead="A gearbox produces vibration at the gear mesh frequency even when healthy, because tooth stiffness changes as teeth enter and leave mesh. Faults show up as changes around that frequency: sidebands at shaft speeds when a gear is eccentric or has a damaged tooth, rising harmonics with wear, and impulses once per revolution for a cracked or broken tooth.",
    takeaways=[
        "Gear mesh frequency GMF = teeth × shaft frequency, the same for both gears in mesh.",
        "Sidebands at ± input and ± output shaft frequencies around GMF point to the gear that is modulating the mesh.",
        "Hunting tooth frequency f<sub>HT</sub> = GMF·N<sub>A</sub>/(z₁z₂), where N<sub>A</sub> = greatest common divisor of the tooth counts.",
        "Tooth counts with no common factor spread wear evenly; ratios like 25:50 make the same teeth meet every revolution.",
        "Time-synchronous averaging (TSA) isolates one shaft's gear signal; residual and difference signals plus metrics (FM0, FM4, NA4) flag local damage.",
    ],
    body=f'''
<h2 id="freq">1. Characteristic frequencies</h2>
{formula("GMF = z1·f1 = z2·f2\nSidebands: GMF ± k·f1 and GMF ± k·f2\nAssembly phase factor N_A = gcd(z1, z2)\nHunting tooth frequency f_HT = GMF·N_A/(z1·z2)\nAssembly phase frequency = GMF/N_A")}
{fig(gplot, f"Figure 1. Synthetic gearbox spectrum for z₁ = {z1}, z₂ = {z2} at {nin:,.0f} rpm input: GMF = {gmf:.0f} Hz with sidebands at ±{fin:.0f} Hz (input) and ±{fout:.1f} Hz (output).")}
<h2 id="faults">2. Fault patterns</h2>
{table(["Pattern","Likely cause"],[["Raised GMF and harmonics, few sidebands","Uniform wear, misalignment, load change"],["Sidebands at input speed around GMF","Eccentric or damaged input gear"],["Sidebands at output speed","Output gear problem"],["Once-per-rev impulse in TSA of one shaft","Cracked, chipped or broken tooth"],
["Peak at hunting tooth frequency, often low","Faulty tooth pair meeting (manufacturing or damage on both)"],["Ghost components (non-mesh, fixed frequency)","Gear cutting machine index errors"],["Gear natural frequencies excited with sidebands","Severe impacting"]])}
<h2 id="tsa">3. Time-synchronous averaging</h2>
<p>With a once-per-revolution tachometer, the signal is resampled to a fixed number of samples per revolution and averaged over many revolutions. Components not synchronous with that shaft average away. Removing the regular mesh harmonics leaves the <b>residual</b>; removing also the first-order sidebands leaves the <b>difference signal</b>. Kurtosis of the difference signal (FM4) rises sharply with a single damaged tooth.</p>
<h2 id="example">4. Worked example</h2>
{table(["Quantity","Value"],[["Input / output speed",f"{fin:.1f} / {fout:.2f} Hz"],["GMF",f"<b>{gmf:.0f} Hz</b>"],["gcd(z1, z2) = N_A",f"{Na}"],["Hunting tooth frequency",f"<b>{fht:.3f} Hz</b> (every {1/fht:.1f} s)"]],num_cols=(1,))}
''',
    calcs=[dict(id="gd", title="Gear mesh, sideband and hunting tooth calculator",
                presets=[dict(label="23/51 at 3000 rpm", v=dict(z1=23, z2=51, n=3000)), dict(label="25/50 (common factor)", v=dict(z1=25, z2=50, n=3000))],
                inputs=[dict(id="z1", label="Pinion teeth z1", value=23), dict(id="z2", label="Wheel teeth z2", value=51), dict(id="n", label="Pinion speed (rpm)", value=3000)],
                js='''function g(a,b){return b?g(b,a%b):a;}var f1=v.n/60,f2=f1*v.z1/v.z2,G=v.z1*f1,Na=g(v.z1,v.z2),ht=G*Na/(v.z1*v.z2);
var h='<table><tr><th>Harmonic</th><th class=num>GMF</th><th class=num>−f1</th><th class=num>+f1</th><th class=num>−f2</th><th class=num>+f2</th></tr>';for(var k=1;k<=3;k++)h+='<tr><td>'+k+'×</td><td class=num>'+fmt(k*G,1)+'</td><td class=num>'+fmt(k*G-f1,1)+'</td><td class=num>'+fmt(k*G+f1,1)+'</td><td class=num>'+fmt(k*G-f2,1)+'</td><td class=num>'+fmt(k*G+f2,1)+'</td></tr>';
return {rows:[["Input / output",fmt(f1,2)+" / "+fmt(f2,3)+" Hz"],["GMF",fmt(G,1)+" Hz"],["N_A = gcd",Na],["Hunting tooth",fmt(ht,4)+" Hz","period "+fmt(1/ht,2)+" s"]],html:h+'</table>',
verdict:Na>1?["caution","Tooth counts share a factor: the same teeth meet repeatedly (wear concentrates)."]:["ok","No common factor: every tooth meets every tooth (hunting design)."]};''')],
    quiz=[
        dict(q="GMF for a 30-tooth pinion at 25 Hz:", o=["25 Hz", "750 Hz", "30 Hz", "55 Hz"], a=1, e="30 × 25."),
        dict(q="Is GMF the same for both gears in a mesh?", o=["Yes", "No, it differs by the ratio", "Only for spur gears", "Only at low speed"], a=0, e="z1·f1 = z2·f2."),
        dict(q="Sidebands at the output shaft frequency suggest a problem on:", o=["Input gear", "Output gear", "Bearing outer race", "Motor"], a=1, e="The modulating shaft identifies the gear."),
        dict(q="TSA requires:", o=["A once-per-rev reference", "A microphone", "No sensors", "A strain gauge"], a=0, e="Synchronous resampling needs a tachometer."),
        dict(q="Why avoid tooth counts with a common factor?", o=["Noise only", "The same teeth always meet, concentrating wear", "Lower ratio", "Cheaper"], a=1, e="Hunting tooth designs spread wear."),
        dict(q="FM4 is essentially:", o=["RMS", "Kurtosis of the difference signal", "Crest factor of raw signal", "Peak frequency"], a=1, e="Sensitive to single-tooth damage."),
        dict(q="z1 = 20, z2 = 45, GMF 1000 Hz. Hunting tooth frequency (Hz)?", num=5.556, unit="Hz", e="gcd = 5 → 1000×5/900 = 5.56 Hz."),
        dict(q="Pinion 24 teeth at 1800 rpm. GMF in Hz?", num=720, unit="Hz", e="24 × 30 = 720 Hz."),
    ],
    refs=["Randall, R. B., Vibration-based Condition Monitoring, Wiley, 2011, Ch. on gear diagnostics.", "McFadden, P. D., 'Examination of a technique for the early detection of failure in gears by signal processing of the time domain average', MSSP, 1987.",
          "Lebold, M. et al., 'Review of vibration analysis methods for gearbox diagnostics and prognostics', Proc. MFPT, 2000.", "ISO 13373-9, Diagnostic techniques for gearboxes (vibration condition monitoring)."],
    links=[("Wikipedia — Gear mesh frequency", "https://en.wikipedia.org/wiki/Gear")],
))

# ---------------------------------------------------------------- 51 ORDER TRACKING
fn_modes = [180.0, 420.0]
ordplot = plot([dict(pts=[(n, o * n / 60) for n in range(0, 12001, 200)], label=f"{o}×", at=min(11500, 800 * 60 / o * 0.95)) for o in (1, 2, 4, 6)] +
               [dict(pts=[(0, f), (12000, f)], label=f"structural mode {f:.0f} Hz", at=500, width=2, color="var(--ink)", dash="3 4") for f in fn_modes],
               "speed (rpm)", "frequency (Hz)", xlim=(0, 12000), ylim=(0, 900), h=320)
ARTICLES.append(dict(
    slug="order-tracking-run-up-analysis", group="vibration",
    title="Order Tracking and Run-Up / Coast-Down Analysis",
    short="Order tracking", tags=["Order tracking", "Run-up", "Signal processing", "Resonance"],
    desc="Analysing machines whose speed changes: orders, computed (angle-domain) order tracking, order resolution and maximum order, waterfall and colour-map plots, Bode and polar plots, and resonance identification.",
    blurb="Following vibration in orders instead of hertz while speed changes, and finding resonances from run-ups and coast-downs.",
    lead="When speed changes, every speed-related component moves across the frequency axis and a normal FFT smears it. Order tracking measures vibration in orders (multiples of running speed) by sampling at fixed shaft angles instead of fixed times. Plotted against speed, order components show which excitation hits which resonance during run-up and coast-down.",
    takeaways=[
        "Order = frequency ÷ shaft rotation frequency. 1× is unbalance, 2× misalignment, z× gear mesh.",
        "Computed order tracking resamples the time signal to equal angle increments using a tachometer or encoder.",
        "Order resolution Δo = 1/(number of revolutions analysed); maximum order = samples per revolution ÷ 2.56.",
        "In a waterfall or colour map, order lines run diagonally and resonances appear as fixed-frequency bands where order lines brighten.",
        "Bode (amplitude and phase versus speed) and polar plots of 1× locate critical speeds: peak amplitude with 90° phase shift.",
    ],
    body=f'''
<h2 id="orders">1. Orders and the angle domain</h2>
{formula("Order o = f / f_shaft\nComputed order tracking: tacho → shaft angle θ(t) → resample signal at Δθ = 2π / N_rev_samples\nMax order = N_rev_samples / 2.56      Order resolution Δo = 1 / revolutions per block")}
{fig(ordplot, "Figure 1. Order lines and fixed structural modes against speed. Resonance excitation occurs where an order line crosses a mode, e.g. 2× crossing 420 Hz at 12,600 rpm (outside range) and 4× crossing 420 Hz at 6,300 rpm.")}
<h2 id="setup">2. Set-up</h2>
{table(["Setting","Guidance"],[["Tachometer","Once per rev (optical tape, keyphasor) or encoder for many pulses per rev"],["Max order","Above the highest order of interest (e.g. 3–4× gear mesh order for gearboxes)"],["Revolutions per block","More revolutions = finer order resolution but more speed change within a block"],["Run-up rate","Slow enough that resonances are excited fully (sweep rate affects peak amplitude)"],["Display","Waterfall, colour map (speed vs frequency or order), Bode, polar, order cuts"]])}
<h2 id="reading">3. Reading results</h2>
<ul><li>A component that follows an order line is speed-related; one that stays at fixed frequency is a resonance or external source.</li><li>Large 1× near a speed with 90° phase change → rotor critical speed.</li><li>Fixed-frequency bright band crossed by several orders → structural resonance of casing or support.</li><li>Sub-synchronous components that appear above a threshold speed → instability (e.g. oil whirl).</li></ul>
''',
    calcs=[dict(id="ot", title="Order tracking set-up",
                presets=[dict(label="Up to 12,000 rpm, 40 orders", v=dict(nmin=600, nmax=12000, omax=40, revs=64, rate=200)), dict(label="Gearbox, 120 orders", v=dict(nmin=1000, nmax=6000, omax=120, revs=32, rate=500))],
                inputs=[dict(id="nmin", label="Min speed (rpm)", value=600), dict(id="nmax", label="Max speed (rpm)", value=12000), dict(id="omax", label="Max order wanted", value=40),
                        dict(id="revs", label="Revolutions per block", value=64), dict(id="rate", label="Run-up rate (rpm/s)", value=200)],
                js='''var spr=Math.pow(2,Math.ceil(Math.log2(2.56*v.omax))),fs=spr*v.nmax/60,dO=1/v.revs,tblock=v.revs/(v.nmax/60),dn=v.rate*tblock,tlow=v.revs/(v.nmin/60);
return {rows:[["Samples per revolution",spr],["Raw sample rate needed",fmt(fs,0)+" Hz","at max speed"],["Order resolution",fmt(dO,4)+" orders"],["Block time at max speed",fmt(tblock,3)+" s"],["Block time at min speed",fmt(tlow,2)+" s"],["Speed change within block (max speed)",fmt(dn,1)+" rpm"],["Sweep duration",fmt((v.nmax-v.nmin)/v.rate,1)+" s"]],
verdict:dn/v.nmax>0.02?["caution","Speed changes more than 2 % within a block at max speed: reduce revolutions or slow the run-up."]:["ok","Speed change within a block is small."]};''')],
    quiz=[
        dict(q="An order is:", o=["A frequency in Hz", "A multiple of running speed", "A filter", "A window"], a=1, e="f / f_shaft."),
        dict(q="Computed order tracking resamples the signal at equal:", o=["Time steps", "Shaft angle increments", "Frequency steps", "Amplitudes"], a=1, e="Angle domain."),
        dict(q="Order resolution improves by:", o=["Higher sample rate", "More revolutions per block", "More channels", "Shorter blocks"], a=1, e="Δo = 1/revs."),
        dict(q="A fixed-frequency band in a colour map is likely:", o=["Unbalance", "A structural resonance", "Gear mesh", "Electrical 2×"], a=1, e="It does not move with speed."),
        dict(q="At a rotor critical speed the 1× phase changes by about:", o=["0°", "90°", "360°", "45°"], a=1, e="90° at resonance."),
        dict(q="Sub-synchronous vibration appearing above a speed suggests:", o=["Unbalance", "Instability such as oil whirl", "Misalignment", "Looseness only"], a=1, e="Onset at threshold speed."),
        dict(q="4× order crossing a 300 Hz mode: speed in rpm?", num=4500, unit="rpm", e="300 × 60/4 = 4,500 rpm."),
        dict(q="Max order 50 with 2.56 rule: minimum samples per revolution?", num=128, e="2.56 × 50 = 128."),
    ],
    refs=["Brandt, A., Noise and Vibration Analysis: Signal Analysis and Experimental Procedures, Wiley, 2011.", "Fyfe, K. R. and Munck, E. D. S., 'Analysis of computed order tracking', MSSP, 11(2), 1997.", "ISO 13373-3, Guidelines for vibration diagnosis.", "Bently, D. E. and Hatch, C. T., Fundamentals of Rotating Machinery Diagnostics, 2002."],
    links=[("Wikipedia — Order tracking", "https://en.wikipedia.org/wiki/Order_tracking")],
))

# ---------------------------------------------------------------- 52 JOURNAL BEARINGS
Dj, Lj, cj, Wj, nj, eta = 50.0, 40.0, 0.025, 5000.0, 3000.0, 0.0172
Rj = Dj / 2
wj = 2 * math.pi * nj / 60
def Wocv(e):
    return eta * wj * (Rj / 1000) * (Lj / 1000) ** 3 / (4 * (cj / 1000) ** 2) * e * math.sqrt(math.pi ** 2 * (1 - e * e) + 16 * e * e) / (1 - e * e) ** 2
lo, hi = 1e-6, 0.999
for _ in range(100):
    mid = (lo + hi) / 2
    if Wocv(mid) < Wj: lo = mid
    else: hi = mid
ej = (lo + hi) / 2
h0 = cj * (1 - ej) * 1000
Pj = Wj / (Dj * Lj)
S = (Rj / cj) ** 2 * eta * (nj / 60) / (Pj * 1e6)
Ploss = eta * (Rj / 1000) ** 3 * wj ** 2 * 2 * math.pi * (Lj / 1000) / (cj / 1000)
ARTICLES.append(dict(
    slug="journal-bearings-hydrodynamic", group="tribology",
    title="Hydrodynamic Journal Bearings: Sommerfeld Number, Eccentricity and Minimum Film",
    short="Journal bearings", tags=["Journal bearings", "Hydrodynamic lubrication", "Tribology", "Sommerfeld"],
    desc="Plain (journal) bearing basics: hydrodynamic film formation, clearance ratio, Sommerfeld number, short-bearing (Ocvirk) load capacity, eccentricity, minimum film thickness, Petroff friction and design limits.",
    blurb="How a rotating journal pumps its own oil film, and how to estimate eccentricity, minimum film and friction loss.",
    lead="In a hydrodynamic journal bearing the shaft drags oil into a converging wedge and builds pressure that lifts it off the bearing surface. No rolling elements are needed, so these bearings carry high loads at high speed with excellent damping. Their design revolves around one dimensionless group, the Sommerfeld number, and one critical output, the minimum oil-film thickness.",
    takeaways=[
        "Film forms only with relative speed, viscosity and a converging gap; at start/stop the surfaces touch (boundary lubrication).",
        "Radial clearance ratio c/R is typically 0.001 (1 µm per mm of radius); L/D usually 0.5–1.0.",
        "Sommerfeld number S = (R/c)²·μN/P; low S means heavy load, high eccentricity, thin film.",
        "Minimum film h₀ = c(1 − ε) should exceed several times the combined surface roughness (often ≥ 10–25 µm in machinery).",
        "Friction loss (Petroff) ≈ 2π³μ R³ N² L / c (W, N in rev/s); oil flow must carry it away.",
    ],
    body=f'''
<h2 id="principle">1. Principle</h2>
{formula("Unit load P = W/(L·D)\nSommerfeld number S = (R/c)² · μ·N / P        (N in rev/s, μ in Pa·s, P in Pa)\nEccentricity ratio ε = e/c;  minimum film h0 = c·(1 − ε)\nShort-bearing (Ocvirk) load: W = μ·ω·R·L³/(4c²) · ε·√[π²(1−ε²) + 16ε²]/(1−ε²)²")}
{table(["Design parameter","Typical range"],[["Unit load P","1–4 MPa (turbines, motors), up to 10+ MPa (engines)"],["L/D","0.5–1.0"],["Clearance ratio c/R","0.0005–0.0015"],["Minimum film h0","≥ 10–25 µm (machinery); ≥ 5 × composite roughness"],["Max babbitt temperature","≈ 110–130 °C"]])}
<h2 id="stability">2. Dynamics</h2>
<p>Oil films have stiffness and damping, which makes plain bearings excellent for vibration control, but lightly loaded plain cylindrical bearings can become unstable (oil whirl at about 0.42–0.48× speed, oil whip when that frequency locks to a critical speed). Tilting-pad, lemon-bore and pressure-dam bearings resist this.</p>
<h2 id="example">3. Worked example</h2>
<p>D = {Dj:.0f} mm, L = {Lj:.0f} mm, radial clearance c = {cj*1000:.0f} µm, load {Wj:,.0f} N, {nj:,.0f} rpm, oil μ = {eta} Pa·s (ISO VG 46 near 60 °C).</p>
{table(["Quantity","Value"],[["Unit load",f"{Pj:.2f} MPa"],["Sommerfeld number",f"{S:.3f}"],["Eccentricity ε (Ocvirk)",f"{ej:.3f}"],["Minimum film h0",f"<b>{h0:.1f} µm</b>"],["Petroff friction loss (concentric estimate)",f"{Ploss:.0f} W"]],num_cols=(1,))}
''',
    calcs=[dict(id="jb", title="Short journal bearing estimate (Ocvirk)",
                presets=[dict(label="Worked example", v=dict(D=50, L=40, c=25, W=5000, n=3000, mu=17.2)), dict(label="Heavier load", v=dict(D=50, L=40, c=25, W=15000, n=1500, mu=17.2))],
                inputs=[dict(id="D", label="Diameter D (mm)", value=50), dict(id="L", label="Length L (mm)", value=40), dict(id="c", label="Radial clearance c (µm)", value=25), dict(id="W", label="Load W (N)", value=5000),
                        dict(id="n", label="Speed (rpm)", value=3000), dict(id="mu", label="Viscosity μ (mPa·s)", value=17.2)],
                js='''var R=v.D/2000,L=v.L/1000,c=v.c*1e-6,mu=v.mu/1000,w=2*Math.PI*v.n/60;function Wf(e){return mu*w*R*Math.pow(L,3)/(4*c*c)*e*Math.sqrt(Math.PI*Math.PI*(1-e*e)+16*e*e)/Math.pow(1-e*e,2);}
var lo=1e-6,hi=0.9999;for(var i=0;i<100;i++){var m=(lo+hi)/2;if(Wf(m)<v.W)lo=m;else hi=m;}var e=(lo+hi)/2,h0=c*(1-e)*1e6,P=v.W/(v.D*v.L),S=Math.pow(R/c,2)*mu*(v.n/60)/(P*1e6),Pl=mu*Math.pow(R,3)*w*w*2*Math.PI*L/c;
return {rows:[["Unit load",fmt(P,2)+" MPa"],["Sommerfeld S",fmt(S,4)],["L/D",fmt(v.L/v.D,2),"Ocvirk valid for L/D ≲ 1"],["Eccentricity ε",fmt(e,3)],["Minimum film h0",fmt(h0,1)+" µm"],["Friction loss (Petroff)",fmt(Pl,0)+" W"]],
verdict:h0<10?["bad","Minimum film below 10 µm: increase viscosity, speed, length or diameter."]:["ok","Minimum film adequate for typical machinery finishes."]};''')],
    quiz=[
        dict(q="A hydrodynamic film needs:", o=["External pump pressure only", "Relative motion, viscosity and a converging gap", "Rolling elements", "Grease"], a=1, e="The wedge effect."),
        dict(q="A low Sommerfeld number means:", o=["Light load, thick film", "Heavy load, high eccentricity", "No rotation", "High clearance"], a=1, e="S ∝ μN/P."),
        dict(q="Typical clearance ratio c/R:", o=["0.1", "0.01", "0.001", "0.00001"], a=2, e="About 1 µm per mm radius."),
        dict(q="Minimum film thickness equals:", o=["c·ε", "c·(1 − ε)", "c/ε", "R − c"], a=1, e="h0 = c(1 − ε)."),
        dict(q="Oil whirl frequency is about:", o=["2×", "1×", "0.42–0.48×", "BPFO"], a=2, e="Just under half running speed."),
        dict(q="When are plain bearings most at risk of surface contact?", o=["Full speed", "Start-up and shut-down", "Steady load", "Never"], a=1, e="Film needs speed."),
        dict(q="W = 4000 N, D = 40 mm, L = 30 mm. Unit load (MPa)?", num=3.333, unit="MPa", e="4000/(40×30) = 3.33 MPa."),
        dict(q="c = 30 µm, ε = 0.6. Minimum film (µm)?", num=12, unit="µm", e="30 × 0.4 = 12 µm."),
    ],
    refs=["Hamrock, B. J., Schmid, S. R. and Jacobson, B. O., Fundamentals of Fluid Film Lubrication, 2nd ed., CRC Press, 2004.", "Raimondi, A. A. and Boyd, J., 'A solution for the finite journal bearing and its application to analysis and design', ASLE Trans., 1958.",
          "Khonsari, M. M. and Booser, E. R., Applied Tribology: Bearing Design and Lubrication, 3rd ed., Wiley, 2017.", "Budynas, R. G. and Nisbett, J. K., Shigley's Mechanical Engineering Design, Ch. 12."],
    links=[("Wikipedia — Fluid bearing", "https://en.wikipedia.org/wiki/Fluid_bearing")],
))

# ---------------------------------------------------------------- 53 GEARBOX HEAT BALANCE
Pin, nst, mesh, brg, P0 = 100.0, 2, 0.5, 0.3, 1.0
Lmesh = Pin * mesh / 100 * nst
Lbrg = Pin * brg / 100
Ltot = Lmesh + Lbrg + P0
Ahs, hconv, dTh = 2.0, 18.0, 50.0
Qh = hconv * Ahs * dTh / 1000
loads = np.linspace(0, 1, 21)
lplot = plot([dict(pts=[(float(l) * 100, float(P0 + l * Pin * (mesh * nst + brg) / 100)) for l in loads], label="total loss", at=60),
              dict(pts=[(float(l) * 100, P0) for l in loads], label="no-load part (churning, windage, seals)", at=20, width=2)],
             "load (% of rated)", "loss (kW)", xlim=(0, 100), ylim=(0, 3.2), h=280)
effplot = plot([dict(pts=[(float(l) * 100, float(100 * (1 - (P0 + l * Pin * (mesh * nst + brg) / 100) / (l * Pin)))) for l in loads if l >= 0.1], label="efficiency", at=60)],
               "load (% of rated)", "efficiency (%)", xlim=(0, 100), ylim=(80, 100), h=260)
ARTICLES.append(dict(
    slug="gearbox-losses-and-heat-balance", group="tribology",
    title="Gearbox Losses, Efficiency and Heat Balance",
    short="Gearbox heat balance", tags=["Gearboxes", "Efficiency", "Heat transfer", "Lubrication"],
    desc="Where gearbox power losses come from (mesh, bearings, churning, windage, seals), load-dependent versus no-load losses, efficiency across the load range, housing heat dissipation and when oil cooling is needed.",
    blurb="Splitting gearbox losses into load-dependent and no-load parts, and checking whether the housing can shed the heat.",
    lead="Even an efficient gearbox turns a few percent of its power into heat. Some losses grow with load (tooth friction, bearing friction under load); others depend mainly on speed and oil (churning, windage, seals, pump drag). The balance between the heat generated and what the housing can dissipate sets the oil temperature, and decides whether a cooler is needed.",
    takeaways=[
        "Spur/helical meshes lose about 0.5–1 % each; bearings 0.1–0.5 %; churning and windage can dominate at high speed and light load.",
        "No-load losses make efficiency poor at part load even when full-load efficiency is 98–99 %.",
        "Natural-convection housings dissipate roughly 15–25 W/m²K; fan cooling roughly doubles this.",
        "Check: generated loss ≤ h·A·ΔT at the allowable oil temperature; otherwise add oil cooling (ISO/TR 14179 gives detailed methods).",
        "Reduce churning with lower oil level, jet lubrication, baffles and lower viscosity where film thickness allows.",
    ],
    body=f'''
<h2 id="losses">1. Loss components</h2>
{table(["Loss","Depends on","Typical size"],[["Tooth mesh (sliding friction)","Load, speed, μ, geometry","0.5–1 % per mesh"],["Bearings (load-dependent)","Load, bearing type","0.1–0.5 % total"],["Churning / oil drag","Immersion depth, viscosity, speed","Can reach 1–3 % at high speed"],["Windage","Peripheral speed, enclosure","Significant above ~ 25 m/s"],["Seals","Shaft speed, seal type","Tens to hundreds of W"],["Oil pump (if driven)","Flow and pressure","Small–moderate"]])}
{fig(lplot, "Figure 1. Losses against load for the example: the no-load part stays constant.")}
{fig(effplot, "Figure 2. Efficiency against load: high at full load, falling sharply below about 30 % load as no-load losses dominate.")}
<h2 id="heat">2. Heat balance</h2>
{formula("Generated:  P_loss = P_in·(1 − η)\nDissipated by housing:  Q = h·A·(T_oil − T_ambient)       h ≈ 15–25 W/m²K natural, 30–50 forced air\nIf P_loss > Q at the allowable oil temperature: add cooler with Q_cooler = P_loss − Q")}
<h2 id="example">3. Worked example</h2>
<p>Two-stage gearbox, {Pin:.0f} kW, {mesh} % per mesh, {brg} % bearings, {P0:.0f} kW no-load loss; housing area {Ahs:.0f} m², h = {hconv:.0f} W/m²K, allowable rise {dTh:.0f} K.</p>
{table(["Quantity","Value"],[["Mesh losses",f"{Lmesh:.1f} kW"],["Bearing losses",f"{Lbrg:.1f} kW"],["No-load losses",f"{P0:.1f} kW"],["Total",f"<b>{Ltot:.1f} kW</b> (η = {100*(1-Ltot/Pin):.1f} %)"],["Housing dissipation",f"{Qh:.2f} kW"],["Cooler needed",f"<b>{Ltot-Qh:.1f} kW</b>"]],num_cols=(1,))}
''',
    calcs=[dict(id="gh", title="Gearbox loss and heat balance",
                presets=[dict(label="Worked example", v=dict(P=100, st=2, m=0.5, b=0.3, p0=1, A=2, h=18, dT=50, load=100))],
                inputs=[dict(id="P", label="Rated power (kW)", value=100), dict(id="st", label="Number of meshes", value=2), dict(id="m", label="Loss per mesh (%)", value=0.5), dict(id="b", label="Bearing loss (%)", value=0.3),
                        dict(id="p0", label="No-load loss (kW)", value=1), dict(id="A", label="Housing area (m²)", value=2), dict(id="h", label="h (W/m²K)", value=18), dict(id="dT", label="Allowable oil rise (K)", value=50), dict(id="load", label="Load (%)", value=100)],
                js='''var l=v.load/100,L=v.p0+l*v.P*(v.st*v.m+v.b)/100,Q=v.h*v.A*v.dT/1000,eta=l>0?100*(1-L/(l*v.P)):0,Tr=L*1000/(v.h*v.A);
return {rows:[["Total loss",fmt(L,2)+" kW"],["Efficiency",fmt(eta,2)+" %"],["Housing dissipation at allowable rise",fmt(Q,2)+" kW"],["Oil rise without cooler",fmt(Tr,0)+" K"],["Cooler duty",fmt(Math.max(L-Q,0),2)+" kW"]],
verdict:L>Q?["caution","Housing alone cannot hold the oil temperature: add a cooler or forced cooling."]:["ok","Natural cooling sufficient."]};''')],
    quiz=[
        dict(q="Which losses exist even with no load?", o=["Tooth friction", "Churning, windage and seal losses", "Bearing load losses", "None"], a=1, e="Speed and oil dependent."),
        dict(q="Typical loss per spur/helical mesh:", o=["0.01 %", "0.5–1 %", "5 %", "10 %"], a=1, e="Good gears ≈ 98–99.5 % per mesh."),
        dict(q="Why is part-load efficiency lower?", o=["Gears slip", "Fixed no-load losses are a larger share", "Oil thins", "Less speed"], a=1, e="Constant losses over smaller power."),
        dict(q="Churning losses can be reduced by:", o=["Raising oil level", "Jet lubrication with low oil level and baffles", "Higher viscosity", "Faster speed"], a=1, e="Less immersion drag."),
        dict(q="Natural-convection housing heat transfer coefficient is about:", o=["1–2 W/m²K", "15–25 W/m²K", "500 W/m²K", "5000 W/m²K"], a=1, e="Order of tens."),
        dict(q="If losses exceed housing dissipation, oil temperature:", o=["Falls", "Rises until balance or limit", "Stays constant", "Oscillates"], a=1, e="Needs cooling."),
        dict(q="150 kW gearbox at 98 % efficiency. Heat loss (kW)?", num=3, unit="kW", e="150 × 0.02 = 3 kW."),
        dict(q="h = 20 W/m²K, A = 1.5 m², ΔT = 40 K. Dissipation (W)?", num=1200, unit="W", e="20 × 1.5 × 40 = 1,200 W."),
    ],
    refs=["ISO/TR 14179-1 and -2, Gears — Thermal capacity.", "ISO/TR 14179-2: Thermal load-carrying capacity (loss calculation).", "Höhn, B.-R., Michaelis, K. and Hinterstoißer, M., 'Optimization of gearbox efficiency', Goriva i maziva, 2009.", "AGMA 6123 / AGMA 925 (lubrication and losses)."],
    links=[("Wikipedia — Gearbox", "https://en.wikipedia.org/wiki/Transmission_(mechanical_device)")],
))
