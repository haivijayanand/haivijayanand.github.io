"""
TOOL:    Vijay_Wiki articles — group 7 (maths and electronics for engineers)
FAMILY:  vijay-wiki
VERSION: 1.0.0
DATE:    2026-11-24
CHAT:    claude.ai — Vijay_Wiki: build all suggested topics in groups and upload
CHANGES: 1.0.0 Initial three articles: SDOF vibration ODE, eigenvalues and modes, electronics for mechanical engineers
"""
import math
import numpy as np
from wiki import plot, flow, bars, fig, table, box, formula

ARTICLES = []

# =====================================================================================
# 40. SPRING–MASS–DAMPER
# =====================================================================================
m, k, c = 10.0, 40000.0, 40.0
wn = math.sqrt(k / m); fn = wn / (2 * math.pi)
zeta = c / (2 * math.sqrt(k * m))
wd = wn * math.sqrt(1 - zeta ** 2)
delta = 2 * math.pi * zeta / math.sqrt(1 - zeta ** 2)
t = np.linspace(0, 1.0, 600)
x = np.exp(-zeta * wn * t) * np.cos(wd * t)
decay = plot([dict(pts=list(zip(t.tolist(), x.tolist())), label=None, width=2.5),
              dict(pts=list(zip(t.tolist(), np.exp(-zeta * wn * t).tolist())), label="envelope e^(−ζωn t)", at=0.6, width=2)],
             "time (s)", "displacement / initial", xlim=(0, 1), ylim=(-1.05, 1.1), h=280)
rr = np.linspace(0.01, 4, 400)
def Tr(r, z): return np.sqrt(1 + (2 * z * r) ** 2) / np.sqrt((1 - r ** 2) ** 2 + (2 * z * r) ** 2)
trplot = plot([dict(pts=list(zip(rr.tolist(), Tr(rr, z).tolist())), label=f"ζ = {z}", at=a) for z, a in [(0.05, 0.85), (0.2, 1.6), (0.5, 2.4)]] +
              [dict(pts=[(math.sqrt(2), 0), (math.sqrt(2), 6)], label="r = √2", at=math.sqrt(2), width=1.5)],
              "frequency ratio r = f/fn", "transmissibility", xlim=(0, 4), ylim=(0, 6), h=300)
fexc = 25.0
r_ex = fexc / fn
T_ex = float(Tr(r_ex, zeta))

ARTICLES.append(dict(
    slug="spring-mass-damper-vibration", group="maths",
    title="Differential Equations in Vibration: The Spring–Mass–Damper System",
    short="Spring–mass–damper",
    tags=["Differential equations", "Vibration", "Damping", "Isolation"],
    desc="The single-degree-of-freedom equation m·x'' + c·x' + k·x = F(t): natural frequency, damping ratio, free decay and logarithmic decrement, forced response, resonance and vibration isolation, with a live simulator.",
    blurb="Natural frequency, damping ratio, free decay, forced response and isolation from one second-order ODE, plus a live simulator.",
    lead="The spring–mass–damper is the most useful differential equation in mechanical engineering. Machines on mounts, shafts on bearings, sensors on brackets and even building floors behave, near one resonance, like a mass on a spring with some damping. Solving m·x″ + c·x′ + k·x = F(t) gives natural frequency, how fast vibration dies away, and how much is transmitted to the foundation.",
    takeaways=[
        "Natural frequency ω<sub>n</sub> = √(k/m); f<sub>n</sub> = ω<sub>n</sub>/2π. Stiffer or lighter means higher frequency.",
        "Damping ratio ζ = c/(2√(km)); most structures have ζ ≈ 0.01–0.05; ζ = 1 is critical damping (no oscillation).",
        "Free vibration decays as e<sup>−ζω<sub>n</sub>t</sup>; logarithmic decrement δ = ln(x<sub>n</sub>/x<sub>n+1</sub>) ≈ 2πζ.",
        "Forced response peaks near r = f/f<sub>n</sub> = 1 with amplification ≈ 1/(2ζ).",
        "Isolation needs r &gt; √2: mount natural frequency must be well below the forcing frequency (ideally r ≥ 3).",
    ],
    body=f'''
<h2 id="eqn">1. The equation and its parameters</h2>
{formula("m·x'' + c·x' + k·x = F(t)\nωn = √(k/m)      ζ = c / (2√(k·m))      ωd = ωn·√(1 − ζ²)\nUnderdamped free response: x(t) = e^(−ζωn t)·[x0·cos ωd t + ((v0 + ζωn x0)/ωd)·sin ωd t]")}
{table(["Case","Damping","Behaviour"],[["Undamped","ζ = 0","Oscillates forever at ωn"],["Underdamped","0 &lt; ζ &lt; 1","Decaying oscillation at ωd"],["Critically damped","ζ = 1","Fastest return without overshoot"],["Overdamped","ζ &gt; 1","Slow return, no oscillation"]])}

<h2 id="free">2. Free vibration and damping measurement</h2>
{fig(decay, f"Figure 1. Free decay for m = {m:.0f} kg, k = {k:,.0f} N/m, c = {c:.0f} N·s/m: fn = {fn:.2f} Hz, ζ = {zeta:.4f}.")}
{formula("Logarithmic decrement δ = ln(x_n / x_(n+1)) = 2πζ/√(1 − ζ²)\nζ ≈ δ / 2π  (light damping);   over N cycles: ζ ≈ ln(x_0/x_N)/(2πN)\nHalf-power bandwidth: ζ ≈ (f2 − f1)/(2·fn)")}

<h2 id="forced">3. Forced vibration and isolation</h2>
{formula("Steady-state amplitude  X = (F0/k) / √[(1 − r²)² + (2ζr)²]      r = ω/ωn\nPhase lag  φ = atan[2ζr / (1 − r²)]\nTransmissibility  T = √[1 + (2ζr)²] / √[(1 − r²)² + (2ζr)²]")}
{fig(trplot, "Figure 2. Force (or motion) transmissibility. Above r = √2 the mount isolates; more damping lowers the resonance peak but worsens isolation at high r.")}
<p>Example: the system above (f<sub>n</sub> = {fn:.2f} Hz) excited at {fexc:.0f} Hz has r = {r_ex:.2f} and transmissibility {T_ex:.3f}: only {T_ex*100:.0f} % of the force reaches the floor.</p>

<h2 id="solve">4. Solving numerically</h2>
<p>For any force history, rewrite as two first-order equations and integrate (Runge–Kutta 4 below): x′ = v, v′ = (F(t) − c·v − k·x)/m. Choose a time step at most about 1/20 of the natural period.</p>
''',
    calcs=[dict(id="sdof", title="Spring–mass–damper simulator (RK4)",
                presets=[dict(label="Free decay (worked example)", v=dict(m=10, k=40000, c=40, x0=1, v0=0, F0=0, f=25, T=1)), dict(label="Forced at resonance", v=dict(m=10, k=40000, c=40, x0=0, v0=0, F0=10, f=10.07, T=3)),
                         dict(label="Critically damped", v=dict(m=10, k=40000, c=1264.9, x0=1, v0=0, F0=0, f=25, T=0.5))],
                inputs=[dict(id="m", label="Mass m (kg)", value=10), dict(id="k", label="Stiffness k (N/m)", value=40000), dict(id="c", label="Damping c (N·s/m)", value=40),
                        dict(id="x0", label="Initial displacement (mm)", value=1), dict(id="v0", label="Initial velocity (mm/s)", value=0), dict(id="F0", label="Force amplitude F0 (N)", value=0),
                        dict(id="f", label="Force frequency (Hz)", value=25), dict(id="T", label="Simulation time (s)", value=1)],
                js='''var wn=Math.sqrt(v.k/v.m),fn=wn/(2*Math.PI),z=v.c/(2*Math.sqrt(v.k*v.m)),w=2*Math.PI*v.f,r=w/wn;
var dt=Math.min(1/(fn*40),v.T/2000),x=v.x0/1000,u=v.v0/1000,t=0,pts=[],mx=0,n=Math.ceil(v.T/dt),every=Math.max(1,Math.floor(n/600));
function a(tt,xx,uu){return (v.F0*Math.sin(w*tt)-v.c*uu-v.k*xx)/v.m;}
for(var i=0;i<=n;i++){if(i%every===0)pts.push([t,x*1000]);if(t>v.T*0.7)mx=Math.max(mx,Math.abs(x));
var k1x=u,k1u=a(t,x,u),k2x=u+dt/2*k1u,k2u=a(t+dt/2,x+dt/2*k1x,u+dt/2*k1u),k3x=u+dt/2*k2u,k3u=a(t+dt/2,x+dt/2*k2x,u+dt/2*k2u),k4x=u+dt*k3u,k4u=a(t+dt,x+dt*k3x,u+dt*k3u);
x+=dt/6*(k1x+2*k2x+2*k3x+k4x);u+=dt/6*(k1u+2*k2u+2*k3u+k4u);t+=dt;}
var Xss=v.F0/v.k/Math.sqrt(Math.pow(1-r*r,2)+Math.pow(2*z*r,2)),Tr=Math.sqrt(1+Math.pow(2*z*r,2))/Math.sqrt(Math.pow(1-r*r,2)+Math.pow(2*z*r,2));
return {rows:[["Natural frequency",fmt(fn,3)+" Hz",fmt(wn,2)+" rad/s"],["Damping ratio ζ",fmt(z,4),z<1?"underdamped":(z===1?"critical":"overdamped")],["Damped frequency",z<1?fmt(fn*Math.sqrt(1-z*z),3)+" Hz":"—"],["Frequency ratio r",fmt(r,3)],["Steady amplitude (theory)",fmt(Xss*1000,4)+" mm"],["Transmissibility",fmt(Tr,3),Tr<1?"isolating":"amplifying"]],
svg:plotSVG([{pts:pts,label:"x (mm)"}],{xlabel:"time (s)",ylabel:"displacement (mm)",xmin:0,xmax:v.T}),caption:"Numerical solution (RK4)."};''')],
    quiz=[
        dict(q="Natural frequency of a spring–mass system is:", o=["k/m", "√(k/m)", "√(m/k)", "k·m"], a=1, e="ωn = √(k/m)."),
        dict(q="If mass is quadrupled, natural frequency:", o=["Doubles", "Halves", "Quadruples", "Unchanged"], a=1, e="f ∝ 1/√m."),
        dict(q="Critical damping means:", o=["ζ = 0", "ζ = 1", "ζ = 0.5", "c = k"], a=1, e="Fastest non-oscillating return."),
        dict(q="Vibration isolation begins above r =", o=["1", "√2", "2", "0.5"], a=1, e="T < 1 for r > √2."),
        dict(q="Peak amplification at resonance for light damping is about:", o=["ζ", "1/(2ζ)", "2ζ", "1"], a=1, e="Q = 1/(2ζ)."),
        dict(q="Adding damping to an isolator at high r:", o=["Improves isolation", "Worsens isolation somewhat", "No effect", "Makes T zero"], a=1, e="The 2ζr term raises T above resonance."),
        dict(q="m = 5 kg, k = 20,000 N/m. Natural frequency (Hz)?", num=10.07, unit="Hz", e="√4000 = 63.25 rad/s → 10.07 Hz."),
        dict(q="Amplitudes 10 then 8 on successive cycles. ζ (≈ δ/2π)?", num=0.0355, tol=0.03, e="ln(1.25) = 0.223; /2π = 0.0355."),
    ],
    refs=["Thomson, W. T. and Dahleh, M. D., Theory of Vibration with Applications, 5th ed., Prentice Hall, 1998.", "Rao, S. S., Mechanical Vibrations, 6th ed., Pearson, 2017.", "Inman, D. J., Engineering Vibration, 4th ed., Pearson, 2014.", "Kreyszig, E., Advanced Engineering Mathematics, 10th ed., Wiley (second-order linear ODEs)."],
    links=[("Wikipedia — Harmonic oscillator", "https://en.wikipedia.org/wiki/Harmonic_oscillator"), ("Wikipedia — Vibration isolation", "https://en.wikipedia.org/wiki/Vibration_isolation")],
))

# =====================================================================================
# 41. EIGENVALUES AND MODES
# =====================================================================================
m1, m2, k1, k2, k3 = 2.0, 1.0, 1000.0, 1000.0, 0.0
Mm = np.diag([m1, m2]); Kk = np.array([[k1 + k2, -k2], [-k2, k2 + k3]])
lam, vec = np.linalg.eig(np.linalg.solve(Mm, Kk))
lam, vec = np.real(lam), np.real(vec)
order = np.argsort(lam); lam = lam[order]; vec = vec[:, order]
w12 = np.sqrt(lam); f12 = w12 / (2 * math.pi)
shapes = [vec[:, i] / vec[0, i] for i in range(2)]

def mode_svg():
    o = ['<svg viewBox="0 0 900 300" role="img" aria-label="Two-degree-of-freedom mode shapes">']
    for j, (sh, f) in enumerate(zip(shapes, f12)):
        y = 90 + j * 140
        o.append(f'<text x="20" y="{y-40}" font-size="14" font-weight="700">Mode {j+1}: {f:.2f} Hz, shape [1, {sh[1]:.3f}]</text>')
        o.append(f'<rect x="20" y="{y-30}" width="14" height="60" fill="var(--ink)"/>')
        x1, x2 = 220, 470
        d1, d2 = 60 * 1.0, 60 * float(sh[1]) / max(1, abs(float(sh[1])))
        o.append(f'<path d="M34 {y} L{x1-30} {y}" stroke="var(--muted)" stroke-width="2" stroke-dasharray="6 4"/>')
        o.append(f'<rect x="{x1-30}" y="{y-20}" width="60" height="40" fill="var(--blue3)" stroke="var(--blue)" stroke-width="2"/><text x="{x1}" y="{y+5}" text-anchor="middle" font-size="12">m1</text>')
        o.append(f'<rect x="{x2-30}" y="{y-20}" width="60" height="40" fill="var(--orange3)" stroke="var(--orange)" stroke-width="2"/><text x="{x2}" y="{y+5}" text-anchor="middle" font-size="12">m2</text>')
        for xx, dd, col in [(x1, d1, "var(--blue)"), (x2, d2, "var(--orange)")]:
            sx = xx + (32 if dd > 0 else -32)
            o.append(f'<line x1="{sx}" y1="{y}" x2="{sx+dd*1.2:.1f}" y2="{y}" stroke="{col}" stroke-width="5"/><polygon points="{sx+dd*1.2:.1f},{y-7} {sx+dd*1.2+ (10 if dd>0 else -10):.1f},{y} {sx+dd*1.2:.1f},{y+7}" fill="{col}"/>')
        o.append(f'<text x="600" y="{y+5}" font-size="13">{"masses move together (in phase)" if sh[1] > 0 else "masses move against each other (out of phase)"}</text>')
    o.append('</svg>')
    return "".join(o)

ARTICLES.append(dict(
    slug="eigenvalues-natural-frequencies-and-modes", group="maths",
    title="Eigenvalues and Mode Shapes: Natural Frequencies of Multi-Degree-of-Freedom Systems",
    short="Eigenvalues and modes",
    tags=["Eigenvalues", "Modal analysis", "Linear algebra", "Vibration"],
    desc="From M·x'' + K·x = 0 to the eigenvalue problem: natural frequencies, mode shapes, orthogonality, modal superposition and tuned absorbers, with a two-degree-of-freedom solver and a 2×2 eigenvalue calculator.",
    blurb="How the eigenvalue problem gives natural frequencies and mode shapes, worked for a two-mass system with a live solver.",
    lead="A structure with many masses and springs has as many natural frequencies as degrees of freedom, each with its own pattern of motion called a mode shape. Finding them is an eigenvalue problem: the eigenvalues are the squared natural frequencies and the eigenvectors are the mode shapes. Finite-element modal analysis does exactly this, for thousands of degrees of freedom.",
    takeaways=[
        "Free vibration M·ẍ + K·x = 0 with x = φ·sin ωt gives (K − ω²M)·φ = 0, an eigenvalue problem.",
        "Natural frequencies come from det(K − ω²M) = 0; mode shapes φ from substituting each ω² back.",
        "Modes are orthogonal with respect to M and K, so any motion is a sum of independent modal responses.",
        "The lowest mode usually has all parts moving in phase; higher modes have nodes and opposite motion.",
        "A tuned absorber (small mass and spring tuned to a troublesome frequency) splits one resonance into two away from the forcing frequency.",
    ],
    body=f'''
<h2 id="problem">1. The eigenvalue problem</h2>
{formula("M·ẍ + K·x = 0,   x = φ·sin(ωt)   ⇒   (K − ω²·M)·φ = 0\ndet(K − λ·M) = 0,   λ = ω²\nFor a general matrix A:  A·v = λ·v,   det(A − λI) = 0")}
<p>For a 2×2 matrix A = [[a, b], [c, d]]: λ² − (a + d)·λ + (ad − bc) = 0, so λ = (tr ± √(tr² − 4·det))/2. The sum of eigenvalues equals the trace and their product equals the determinant.</p>

<h2 id="example">2. Worked example: two masses in a chain</h2>
<p>Wall – k1 – m1 – k2 – m2, with m1 = {m1:.0f} kg, m2 = {m2:.0f} kg, k1 = k2 = {k1:,.0f} N/m.</p>
{formula(f"M = [[{m1:.0f}, 0], [0, {m2:.0f}]]     K = [[{k1+k2:.0f}, {-k2:.0f}], [{-k2:.0f}, {k2:.0f}]]\ndet(K − λM) = 0  ⇒  {m1*m2:.0f}λ² − {(k1+k2)*m2 + k2*m1:.0f}λ + {(k1+k2)*k2 - k2*k2:,.0f} = 0")}
{table(["Mode","λ = ω² (rad²/s²)","ω (rad/s)","f (Hz)","Shape [x1, x2]"],[[str(i+1),f"{lam[i]:.1f}",f"{w12[i]:.2f}",f"<b>{f12[i]:.3f}</b>",f"[1, {shapes[i][1]:.3f}]"] for i in range(2)],num_cols=(1,2,3))}
{fig(mode_svg(), "Figure 1. Mode shapes of the two-mass chain: mode 1 in phase, mode 2 out of phase.")}

<h2 id="properties">3. Useful properties</h2>
<ul><li><b>Orthogonality:</b> φᵢᵀ·M·φⱼ = 0 and φᵢᵀ·K·φⱼ = 0 for i ≠ j. Using modal coordinates decouples the equations into independent single-degree-of-freedom systems.</li>
<li><b>Rayleigh quotient:</b> ω² ≈ (φᵀKφ)/(φᵀMφ) for any guessed shape; it gives an upper bound on the lowest frequency and is very accurate with a reasonable guess.</li>
<li><b>Rotors:</b> natural frequencies change with speed (gyroscopic effects); a Campbell diagram plots them against speed to find critical speeds where they cross excitation orders.</li>
<li><b>Experimental modal analysis:</b> impact or shaker tests measure frequency response functions; curve fitting extracts frequencies, damping and shapes to validate finite-element models.</li></ul>

<h2 id="absorber">4. Tuned vibration absorber</h2>
<p>Adding a small mass m<sub>a</sub> on a spring k<sub>a</sub> with √(k<sub>a</sub>/m<sub>a</sub>) equal to the forcing frequency makes the main mass stand still at that frequency: the absorber moves instead. The original resonance splits into two peaks either side; damping in the absorber broadens its useful range.</p>
''',
    calcs=[dict(id="eig2", title="Two-degree-of-freedom natural frequencies and mode shapes",
                note="Chain: wall – k1 – m1 – k2 – m2 – k3 – wall (set k3 = 0 for a free end).",
                presets=[dict(label="Worked example", v=dict(m1=2, m2=1, k1=1000, k2=1000, k3=0)), dict(label="Symmetric, both ends fixed", v=dict(m1=1, m2=1, k1=1000, k2=1000, k3=1000)), dict(label="Main mass + absorber", v=dict(m1=10, m2=0.5, k1=40000, k2=2000, k3=0))],
                inputs=[dict(id="m1", label="m1 (kg)", value=2), dict(id="m2", label="m2 (kg)", value=1), dict(id="k1", label="k1 (N/m)", value=1000), dict(id="k2", label="k2 (N/m)", value=1000), dict(id="k3", label="k3 (N/m)", value=0)],
                js='''var a=v.m1*v.m2,b=-((v.k1+v.k2)*v.m2+(v.k2+v.k3)*v.m1),c=(v.k1+v.k2)*(v.k2+v.k3)-v.k2*v.k2,D=Math.sqrt(b*b-4*a*c);
var l1=(-b-D)/(2*a),l2=(-b+D)/(2*a);function sh(l){return ((v.k1+v.k2)-l*v.m1)/v.k2;}
return {rows:[["λ1, λ2",fmt(l1,2)+", "+fmt(l2,2)],["Mode 1",fmt(Math.sqrt(l1)/(2*Math.PI),3)+" Hz","shape [1, "+fmt(sh(l1),3)+"]"],["Mode 2",fmt(Math.sqrt(l2)/(2*Math.PI),3)+" Hz","shape [1, "+fmt(sh(l2),3)+"]"],["Frequency ratio",fmt(Math.sqrt(l2/l1),3)]]};'''),
           dict(id="eigA", title="Eigenvalues of a 2×2 matrix",
                presets=[dict(label="[[2,1],[1,2]]", v=dict(a=2, b=1, c=1, d=2)), dict(label="Rotation-like [[0,−1],[1,0]]", v=dict(a=0, b=-1, c=1, d=0))],
                inputs=[dict(id="a", label="a (row 1, col 1)", value=2), dict(id="b", label="b (row 1, col 2)", value=1), dict(id="c", label="c (row 2, col 1)", value=1), dict(id="d", label="d (row 2, col 2)", value=2)],
                js='''var tr=v.a+v.d,det=v.a*v.d-v.b*v.c,disc=tr*tr-4*det;
if(disc>=0){var l1=(tr+Math.sqrt(disc))/2,l2=(tr-Math.sqrt(disc))/2;function ev(l){return Math.abs(v.b)>1e-12?"[1, "+fmt((l-v.a)/v.b,3)+"]":(Math.abs(v.c)>1e-12?"["+fmt((l-v.d)/v.c,3)+", 1]":(Math.abs(l-v.a)<1e-12?"[1, 0]":"[0, 1]"));}
return {rows:[["Trace / determinant",fmt(tr,3)+" / "+fmt(det,3)],["λ1",fmt(l1,4),"v1 = "+ev(l1)],["λ2",fmt(l2,4),"v2 = "+ev(l2)]]};}
return {rows:[["Trace / determinant",fmt(tr,3)+" / "+fmt(det,3)],["λ (complex pair)",fmt(tr/2,4)+" ± "+fmt(Math.sqrt(-disc)/2,4)+" i","rotation-type behaviour"]]};''')],
    quiz=[
        dict(q="In (K − ω²M)φ = 0, the eigenvalues give:", o=["Mode shapes", "Squared natural frequencies", "Damping", "Forces"], a=1, e="λ = ω²."),
        dict(q="A 3-degree-of-freedom system has how many natural frequencies?", o=["1", "2", "3", "Infinite"], a=2, e="One per degree of freedom."),
        dict(q="The sum of the eigenvalues of a matrix equals its:", o=["Determinant", "Trace", "Rank", "Norm"], a=1, e="Trace = Σλ."),
        dict(q="Mode orthogonality allows:", o=["Ignoring mass", "Decoupling into independent SDOF equations", "Removing damping", "Doubling frequency"], a=1, e="Modal superposition."),
        dict(q="The Rayleigh quotient with an approximate shape gives:", o=["A lower bound", "An upper bound on the fundamental frequency", "The exact value always", "Damping"], a=1, e="Upper bound, often very close."),
        dict(q="A Campbell diagram plots:", o=["Mode shapes", "Natural frequencies against rotor speed", "Stress against strain", "Spectrum against time"], a=1, e="Used for critical speeds."),
        dict(q="Eigenvalues of [[4,1],[2,3]]: enter the larger one.", num=5, e="λ² − 7λ + 10 = 0 → 5 and 2."),
        dict(q="Determinant of [[2,1],[1,2]] (= product of eigenvalues)?", num=3, e="4 − 1 = 3; eigenvalues 3 and 1."),
    ],
    refs=["Strang, G., Introduction to Linear Algebra, 5th ed., Wellesley-Cambridge Press, 2016.", "Meirovitch, L., Fundamentals of Vibrations, McGraw-Hill, 2001.", "Ewins, D. J., Modal Testing: Theory, Practice and Application, 2nd ed., Research Studies Press, 2000.", "Den Hartog, J. P., Mechanical Vibrations, Dover (tuned absorbers)."],
    links=[("Wikipedia — Eigenvalues and eigenvectors", "https://en.wikipedia.org/wiki/Eigenvalues_and_eigenvectors"), ("Wikipedia — Normal mode", "https://en.wikipedia.org/wiki/Normal_mode")],
))

# =====================================================================================
# 42. ELECTRONICS FOR MECHANICAL ENGINEERS
# =====================================================================================
R1, R2, C5 = 1000.0, 10000.0, 10e-6
f555 = 1.44 / ((R1 + 2 * R2) * C5)
duty = (R1 + R2) / (R1 + 2 * R2) * 100
Rf, Cf = 10e3, 0.1e-6
fc = 1 / (2 * math.pi * Rf * Cf)
lsb = 20 / 2 ** 16 * 1e6
f_ = np.logspace(0, 4, 200)
lp = plot([dict(pts=[(float(ff), float(20 * np.log10(1 / np.sqrt(1 + (ff / fc) ** 2)))) for ff in f_], label=f"RC low-pass, fc = {fc:.0f} Hz", at=20)],
          "frequency (Hz)", "gain (dB)", xlim=(1, 10000), ylim=(-40, 3), xlog=True, h=280, notes=[(fc * 1.1, -2.5, "−3 dB at fc")])

ARTICLES.append(dict(
    slug="electronics-for-mechanical-engineers", group="maths",
    title="Electronics for Mechanical Engineers: Dividers, Filters, Op-Amps, ADCs and the 555 Timer",
    short="Electronics basics",
    tags=["Electronics", "Signal conditioning", "555 timer", "Sensors"],
    desc="Practical electronics for test and machine work: Ohm's law and dividers, RC filters, op-amp gain stages and instrumentation amplifiers, ADC resolution, switching loads safely, and 555 timer astable and monostable circuits.",
    blurb="The handful of circuits a mechanical engineer meets most: dividers, RC filters, op-amps, ADC resolution, switching relays and the 555.",
    lead="Sensors produce small, noisy signals; actuators need more current than a logic pin can give. Between them sits a small set of standard circuits: voltage dividers, RC filters, op-amp amplifiers, transistor or relay drivers, and timers. Knowing their equations lets you read a datasheet, size a resistor or check why a reading is noisy.",
    takeaways=[
        "Ohm's law V = I·R and the divider V<sub>out</sub> = V<sub>in</sub>·R₂/(R₁ + R₂) cover most sensor interfacing.",
        "An RC low-pass has cut-off f<sub>c</sub> = 1/(2πRC) and falls at 20 dB per decade; use it before an ADC as an anti-alias filter.",
        "Non-inverting op-amp gain = 1 + R<sub>f</sub>/R<sub>g</sub>; instrumentation amplifiers amplify bridge signals and reject common-mode noise.",
        "ADC resolution: LSB = full-scale range / 2ⁿ; a 16-bit ±10 V converter resolves about 305 µV.",
        "555 astable: f = 1.44/((R₁ + 2R₂)·C); monostable pulse t = 1.1·R·C. Always put a flyback diode across relay coils.",
    ],
    body=f'''
<h2 id="basics">1. Basics</h2>
{formula("V = I·R         P = V·I = I²R         Series R = R1 + R2         Parallel R = R1·R2/(R1 + R2)\nDivider: Vout = Vin · R2/(R1 + R2)\nRC time constant τ = R·C (63 % of final value after τ, 99 % after 5τ)")}

<h2 id="filters">2. Filtering</h2>
{fig(lp, "Figure 1. First-order RC low-pass filter response (10 kΩ, 0.1 µF): flat below fc, −20 dB/decade above.")}
<p>Higher-order active filters (Butterworth, Bessel) fall faster: a 4th-order filter falls at 80 dB/decade. Use them before an ADC to stop aliasing, choosing f<sub>c</sub> below half the sample rate.</p>

<h2 id="opamps">3. Op-amp circuits</h2>
{table(["Circuit","Gain","Use"],[["Voltage follower (buffer)","1","Isolate a high-impedance source"],["Non-inverting amplifier","1 + Rf/Rg","Amplify sensor voltages"],["Inverting amplifier","−Rf/Rin","Summing, scaling"],["Difference amplifier","R2/R1 (matched)","Remove common voltage"],["Instrumentation amplifier","1 + 2R/Rg (typical 3-op-amp)","Strain-gauge bridges, thermocouples"],["Integrator / differentiator","1/(sRC), sRC","Acceleration to velocity, rate signals"]])}

<h2 id="adc">4. Analogue-to-digital conversion</h2>
{formula("LSB = (V_max − V_min) / 2^n\nIdeal SNR ≈ 6.02·n + 1.76 dB\nDynamic range of a 24-bit sigma-delta DAQ ≈ 110–120 dB in practice")}
<p>A 16-bit converter on ±10 V has an LSB of {lsb:.0f} µV. Match the input range to the signal: a 10 mV signal on a ±10 V range uses only 33 codes.</p>

<h2 id="switching">5. Switching loads</h2>
<ul><li><b>Transistor switch:</b> choose base current I<sub>B</sub> ≈ I<sub>C</sub>/10 for saturation; R<sub>B</sub> = (V<sub>logic</sub> − 0.7)/I<sub>B</sub>. Logic-level MOSFETs need no base current.</li>
<li><b>Relays and solenoids:</b> put a diode across the coil (cathode to +) to clamp the inductive spike when switching off.</li>
<li><b>Optocouplers:</b> isolate PLC or DAQ inputs from noisy field wiring.</li>
<li><b>Contact bounce:</b> mechanical switches bounce for 1–10 ms; debounce with an RC + Schmitt trigger or in software.</li></ul>

<h2 id="timer">6. The 555 timer and counters</h2>
{fig(flow(["555 astable|clock pulses","CD4017|decade counter","10 outputs|one high at a time","Drivers|LEDs, relays"], h=120), "Figure 2. Classic sequencer: a 555 clock stepping a CD4017 decade counter (running lights, sequencing tests).")}
{formula("Astable:   f = 1.44 / ((R1 + 2·R2)·C)     duty = (R1 + R2)/(R1 + 2·R2)\nMonostable: t = 1.1 · R · C")}
<p>Example: R₁ = 1 kΩ, R₂ = 10 kΩ, C = 10 µF → f = <b>{f555:.2f} Hz</b>, duty {duty:.1f} %.</p>
''',
    calcs=[dict(id="el", title="555 timer, RC filter and ADC resolution",
                presets=[dict(label="Worked example", v=dict(R1=1000, R2=10000, C=10, Rf=10000, Cf=0.1, bits=16, fs=20, Rm=100000, Cm=10))],
                inputs=[dict(id="R1", label="555 R1 (Ω)", value=1000), dict(id="R2", label="555 R2 (Ω)", value=10000), dict(id="C", label="555 C (µF)", value=10),
                        dict(id="Rf", label="Filter R (Ω)", value=10000), dict(id="Cf", label="Filter C (µF)", value=0.1), dict(id="bits", label="ADC bits", value=16), dict(id="fs", label="ADC full-scale span (V)", value=20),
                        dict(id="Rm", label="Monostable R (Ω)", value=100000), dict(id="Cm", label="Monostable C (µF)", value=10)],
                js='''var f=1.44/((v.R1+2*v.R2)*v.C*1e-6),d=(v.R1+v.R2)/(v.R1+2*v.R2)*100,fc=1/(2*Math.PI*v.Rf*v.Cf*1e-6),lsb=v.fs/Math.pow(2,v.bits),t=1.1*v.Rm*v.Cm*1e-6;
return {rows:[["555 astable frequency",fmt(f,3)+" Hz","period "+fmt(1000/f,2)+" ms"],["Duty cycle",fmt(d,1)+" %"],["Monostable pulse",fmt(t,3)+" s"],["RC cut-off fc",fmt(fc,1)+" Hz","τ = "+fmt(v.Rf*v.Cf*1e-6*1000,3)+" ms"],["ADC LSB",fmt(lsb*1e6,2)+" µV",v.bits+" bits over "+v.fs+" V"],["Ideal SNR",fmt(6.02*v.bits+1.76,1)+" dB"]]};''')],
    quiz=[
        dict(q="Vout of a divider with R1 = R2 and Vin = 10 V:", o=["10 V", "5 V", "2.5 V", "0 V"], a=1, e="Half."),
        dict(q="An RC low-pass falls above fc at:", o=["6 dB/decade", "20 dB/decade", "40 dB/decade", "It does not fall"], a=1, e="First order: 20 dB/decade."),
        dict(q="Non-inverting gain with Rf = 9 kΩ, Rg = 1 kΩ:", o=["9", "10", "0.9", "−9"], a=1, e="1 + 9 = 10."),
        dict(q="Why add a diode across a relay coil?", o=["Increase speed", "Clamp the inductive voltage spike at switch-off", "Reduce current", "Polarity check"], a=1, e="Protects the driver transistor."),
        dict(q="For strain-gauge bridges the best amplifier is:", o=["Voltage follower", "Instrumentation amplifier", "Integrator", "Comparator"], a=1, e="High common-mode rejection."),
        dict(q="A CD4017 is a:", o=["Timer", "Decade counter with 10 decoded outputs", "Op-amp", "ADC"], a=1, e="Johnson counter, one-of-ten outputs."),
        dict(q="12-bit ADC over 0–5 V. LSB in mV?", num=1.221, unit="mV", e="5/4096 = 1.22 mV."),
        dict(q="RC filter R = 1 kΩ, C = 1 µF. fc in Hz?", num=159.2, unit="Hz", e="1/(2π × 1e-3) = 159 Hz."),
    ],
    refs=["Horowitz, P. and Hill, W., The Art of Electronics, 3rd ed., Cambridge University Press, 2015.", "Texas Instruments, NE555 / LM555 datasheet; CD4017B datasheet.", "Analog Devices, A Designer's Guide to Instrumentation Amplifiers, 3rd ed.", "Kester, W. (ed.), Data Conversion Handbook, Analog Devices / Newnes, 2005."],
    links=[("Wikipedia — 555 timer IC", "https://en.wikipedia.org/wiki/555_timer_IC"), ("Wikipedia — Operational amplifier", "https://en.wikipedia.org/wiki/Operational_amplifier")],
))
