"""
TOOL:    Vijay_Wiki articles — batch 2 group F (maths, control and data)
FAMILY:  vijay-wiki
VERSION: 1.0.0
DATE:    2026-11-24
CHAT:    claude.ai — Vijay_Wiki: next batch of topics (36 articles)
CHANGES: 1.0.0 Fourier series, Laplace and transfer functions, PID control, statistics for test data, Python for test data, industrial communication
"""
import math
import numpy as np
from wiki import plot, flow, bars, fig, table, box, formula, esc

ARTICLES = []


def code(s):
    return f"<pre>{esc(s.strip())}</pre>"

# ---------------------------------------------------------------- 78 FOURIER
t = np.linspace(0, 2, 800)
def sq(N):
    return sum(4 / math.pi * np.sin((2 * k - 1) * 2 * np.pi * t) / (2 * k - 1) for k in range(1, N + 1))
fplot = plot([dict(pts=list(zip(t.tolist(), sq(n).tolist())), label=f"{n} terms", at=0.25 + 0.5 * i, width=2.5) for i, n in enumerate([1, 3, 15])],
             "time (periods)", "amplitude", xlim=(0, 2), ylim=(-1.4, 1.4), h=300)
ARTICLES.append(dict(
    slug="fourier-series-and-transform", group="maths",
    title="Fourier Series and the Fourier Transform: Building Signals from Sine Waves",
    short="Fourier series", tags=["Fourier", "Signal processing", "Harmonics", "Maths"],
    desc="Fourier series of periodic signals (square, triangle, sawtooth), harmonic amplitudes, Gibbs phenomenon, Parseval's theorem, the Fourier transform and its link to the DFT/FFT used in vibration analysis, with a waveform synthesiser.",
    blurb="How any periodic signal is a sum of sines, why sharp edges need many harmonics, and how this leads to the FFT.",
    lead="Joseph Fourier showed that any reasonable periodic signal can be written as a sum of sine and cosine waves at multiples of its fundamental frequency. That idea underlies every spectrum analyser: a vibration spectrum is the list of those sine-wave amplitudes. Seeing how square or triangle waves are built from harmonics explains why impacts and clipping produce long rows of harmonics.",
    takeaways=[
        "Periodic x(t) = a₀ + Σ [aₙcos(nω₀t) + bₙsin(nω₀t)], with coefficients from integrals over one period.",
        "Square wave: only odd harmonics, amplitude 4/(πn); triangle wave: odd harmonics falling as 1/n²; sawtooth: all harmonics as 1/n.",
        "Sharp edges need many harmonics; near a jump the partial sum overshoots by about 9 % (Gibbs phenomenon).",
        "Parseval: mean square of the signal = sum of squared harmonic RMS values, the basis of overall RMS from a spectrum.",
        "The Fourier transform extends this to non-periodic signals; the DFT/FFT computes it for sampled data.",
    ],
    body=f'''
<h2 id="series">1. Fourier series</h2>
{formula("x(t) = a0 + Σ [an·cos(nω0t) + bn·sin(nω0t)]\nan = (2/T)·∫ x(t)·cos(nω0t) dt     bn = (2/T)·∫ x(t)·sin(nω0t) dt     (over one period)\nSquare (±1):  x = (4/π)·Σ sin(nω0t)/n,  n odd\nTriangle:     x = (8/π²)·Σ (−1)^k·sin((2k+1)ω0t)/(2k+1)²\nSawtooth:     x = (2/π)·Σ (−1)^(n+1)·sin(nω0t)/n")}
{fig(fplot, "Figure 1. Partial sums of the square-wave series with 1, 3 and 15 terms: edges sharpen, but an overshoot of about 9 % remains near each jump.")}
<h2 id="parseval">2. Parseval and RMS</h2>
{formula("RMS² = a0² + ½·Σ (an² + bn²)  =  Σ (harmonic RMS)²\nOverall RMS from a spectrum = √(Σ line RMS²)")}
<h2 id="transform">3. Transform and DFT</h2>
{formula("X(f) = ∫ x(t)·e^(−j2πft) dt\nDFT:  X_k = Σ_{n=0}^{N−1} x_n·e^(−j2πkn/N),  frequency of bin k = k·Fs/N")}
<p>Engineering consequences: impacts and clipping (sharp edges) create many harmonics; a pure sine creates one line; amplitude modulation creates sidebands; a periodic train of impulses creates a comb of lines at the repetition rate.</p>
''',
    calcs=[dict(id="fs", title="Waveform synthesiser",
                presets=[dict(label="Square, 7 harmonics", v=dict(w="square", N=7, f=1)), dict(label="Triangle, 3 harmonics", v=dict(w="tri", N=3, f=1)), dict(label="Sawtooth, 15 harmonics", v=dict(w="saw", N=15, f=1))],
                inputs=[dict(id="w", label="Waveform", value="square", options=[("square", "Square"), ("tri", "Triangle"), ("saw", "Sawtooth")]), dict(id="N", label="Number of harmonics", value=7), dict(id="f", label="Fundamental (Hz)", value=1)],
                js='''var pts=[],h='<table><tr><th>Harmonic</th><th class=num>Frequency (Hz)</th><th class=num>Amplitude</th></tr>',ms=0,list=[];
for(var k=1;k<=v.N;k++){var n,a;if(v.w==="square"){n=2*k-1;a=4/(Math.PI*n);}else if(v.w==="tri"){n=2*k-1;a=8/(Math.PI*Math.PI*n*n)*(k%2?1:-1);}else{n=k;a=2/Math.PI*(k%2?1:-1)/n;}list.push([n,a]);ms+=a*a/2;h+='<tr><td>'+n+'</td><td class=num>'+fmt(n*v.f,2)+'</td><td class=num>'+fmt(a,4)+'</td></tr>';}
for(var i=0;i<=400;i++){var t=2*i/400/v.f,s=0;list.forEach(function(p){s+=p[1]*Math.sin(2*Math.PI*p[0]*v.f*t);});pts.push([t,s]);}
var trueRms={square:1,tri:1/Math.sqrt(3),saw:1/Math.sqrt(3)}[v.w];
return {rows:[["RMS of partial sum",fmt(Math.sqrt(ms),4)],["RMS of ideal waveform",fmt(trueRms,4)],["Energy captured",fmt(ms/(trueRms*trueRms)*100,2)+" %"]],html:h+'</table>',svg:plotSVG([{pts:pts}],{xlabel:"time (s)",ylabel:"amplitude",ymin:-1.4,ymax:1.4}),caption:"Partial Fourier sum."};''')],
    quiz=[
        dict(q="A square wave contains:", o=["Only even harmonics", "Only odd harmonics", "All harmonics", "No harmonics"], a=1, e="Half-wave symmetry."),
        dict(q="Square-wave harmonic amplitudes fall as:", o=["1/n²", "1/n", "1/√n", "constant"], a=1, e="4/(πn)."),
        dict(q="The Gibbs overshoot near a jump is about:", o=["1 %", "9 %", "50 %", "0 %"], a=1, e="≈ 8.95 % of the jump."),
        dict(q="Parseval's theorem relates:", o=["Phase and frequency", "Signal mean square to the sum of squared harmonic amplitudes", "Time and distance", "Window and resolution"], a=1, e="Energy conservation."),
        dict(q="A periodic train of impacts produces:", o=["One line", "A comb of harmonics at the repetition rate", "No spectrum", "Random noise"], a=1, e="Basis of bearing defect spectra."),
        dict(q="Clipping a sine wave adds:", o=["Nothing", "Harmonics", "DC only", "Lower frequencies only"], a=1, e="Sharp corners."),
        dict(q="Amplitude of the 3rd harmonic of a unit square wave?", num=0.4244, e="4/(3π) = 0.424."),
        dict(q="Bin 50 of a 1024-point DFT at Fs = 2048 Hz. Frequency (Hz)?", num=100, unit="Hz", e="50 × 2048/1024."),
    ],
    refs=["Kreyszig, E., Advanced Engineering Mathematics, 10th ed., Wiley, Ch. 11.", "Bracewell, R. N., The Fourier Transform and Its Applications, 3rd ed., McGraw-Hill, 2000.", "Oppenheim, A. V. and Willsky, A. S., Signals and Systems, 2nd ed., Prentice Hall, 1997."],
    links=[("Wikipedia — Fourier series", "https://en.wikipedia.org/wiki/Fourier_series")],
))

# ---------------------------------------------------------------- 79 LAPLACE / TRANSFER FUNCTIONS
wn, zeta = 10.0, 0.3
Mp = math.exp(-math.pi * zeta / math.sqrt(1 - zeta ** 2)) * 100
tp = math.pi / (wn * math.sqrt(1 - zeta ** 2))
ts = 4 / (zeta * wn)
def step2(t, z, w=wn):
    if z < 1:
        wd = w * math.sqrt(1 - z * z)
        return 1 - math.exp(-z * w * t) * (math.cos(wd * t) + z / math.sqrt(1 - z * z) * math.sin(wd * t))
    return 1 - math.exp(-w * t) * (1 + w * t)
tt = np.linspace(0, 2, 300)
splot = plot([dict(pts=[(float(x), step2(x, z)) for x in tt], label=f"ζ = {z}", at={0.1: 0.3, 0.3: 0.55, 0.7: 1.0, 1.0: 1.5}[z]) for z in (0.1, 0.3, 0.7, 1.0)],
             "time (s)", "response", xlim=(0, 2), ylim=(0, 1.9), h=300)
ARTICLES.append(dict(
    slug="laplace-transforms-and-transfer-functions", group="maths",
    title="Laplace Transforms and Transfer Functions: First- and Second-Order Step Responses",
    short="Laplace and transfer functions", tags=["Laplace", "Transfer functions", "Control", "Dynamics"],
    desc="Using Laplace transforms for engineering dynamics: transform pairs, transfer functions, poles, first-order time constants, second-order natural frequency and damping, overshoot, peak and settling times, final value theorem and a step-response calculator.",
    blurb="Turning differential equations into algebra, and reading time constant, overshoot and settling time from a transfer function.",
    lead="The Laplace transform turns linear differential equations into algebraic equations in s. A system's dynamics then fit in one ratio of polynomials, its transfer function. The roots of the denominator (poles) tell you at a glance whether the system is stable, how fast it responds and whether it overshoots, which is the language of control engineering and sensor dynamics.",
    takeaways=[
        "Derivatives become multiplication by s (with initial conditions): L{x′} = sX − x(0).",
        "First order G(s) = K/(τs + 1): step response reaches 63.2 % in τ and about 98 % in 4τ.",
        "Second order G(s) = ω<sub>n</sub>²/(s² + 2ζω<sub>n</sub>s + ω<sub>n</sub>²): overshoot M<sub>p</sub> = e<sup>−πζ/√(1−ζ²)</sup>, settling time ≈ 4/(ζω<sub>n</sub>).",
        "Poles in the left half-plane mean stability; complex poles mean oscillation at ω<sub>d</sub> = ω<sub>n</sub>√(1 − ζ²).",
        "Final value theorem: y(∞) = lim s·Y(s) as s → 0 (for stable systems).",
    ],
    body=f'''
<h2 id="pairs">1. Common transform pairs</h2>
{table(["f(t)","F(s)"],[["Unit impulse δ(t)","1"],["Unit step","1/s"],["Ramp t","1/s²"],["e^(−at)","1/(s + a)"],["sin ωt","ω/(s² + ω²)"],["cos ωt","s/(s² + ω²)"],["e^(−at)·sin ωt","ω/((s + a)² + ω²)"],["f′(t)","sF(s) − f(0)"],["∫f dt","F(s)/s"],["Delay f(t − T)","e^(−sT)·F(s)"]])}
<h2 id="second">2. Second-order systems</h2>
{fig(splot, f"Figure 1. Step responses of a second-order system with ωn = {wn:.0f} rad/s for several damping ratios.")}
{formula("Overshoot Mp = exp(−πζ/√(1 − ζ²))\nPeak time tp = π/(ωn·√(1 − ζ²))\nSettling time (2 %) ts ≈ 4/(ζ·ωn)\nRise time (10–90 %) ≈ (1.8)/ωn  for ζ ≈ 0.5")}
<p>Example: ω<sub>n</sub> = {wn:.0f} rad/s, ζ = {zeta}: overshoot <b>{Mp:.1f} %</b>, peak at {tp:.3f} s, settling ≈ {ts:.2f} s. A sensor or actuator with these dynamics will ring after every step input.</p>
<h2 id="uses">3. Engineering uses</h2>
<ul><li>Sensor dynamics: a thermocouple is roughly first order (τ from sheath size); an accelerometer is second order with a high ω<sub>n</sub>.</li><li>Control loops: plant, controller and sensor transfer functions multiply; closed loop = G/(1 + GH).</li>
<li>Filters: low-pass, band-pass and anti-alias filters are transfer functions in s.</li></ul>
''',
    calcs=[dict(id="so", title="Second-order step response",
                presets=[dict(label="ζ = 0.3, ωn = 10", v=dict(wn=10, z=0.3, K=1)), dict(label="Critically damped", v=dict(wn=10, z=1, K=1))],
                inputs=[dict(id="wn", label="ωn (rad/s)", value=10), dict(id="z", label="Damping ratio ζ", value=0.3), dict(id="K", label="Static gain K", value=1)],
                js='''var z=v.z,w=v.wn,T=Math.max(8/(Math.max(z,0.05)*w),6/w),pts=[];function y(t){if(z<1){var wd=w*Math.sqrt(1-z*z);return v.K*(1-Math.exp(-z*w*t)*(Math.cos(wd*t)+z/Math.sqrt(1-z*z)*Math.sin(wd*t)));}if(z===1)return v.K*(1-Math.exp(-w*t)*(1+w*t));var s1=-w*(z-Math.sqrt(z*z-1)),s2=-w*(z+Math.sqrt(z*z-1));return v.K*(1+(s2*Math.exp(s1*t)-s1*Math.exp(s2*t))/(s1-s2));}
for(var i=0;i<=300;i++){var t=T*i/300;pts.push([t,y(t)]);}var Mp=z<1?Math.exp(-Math.PI*z/Math.sqrt(1-z*z))*100:0;
return {rows:[["Poles",z<1?fmt(-z*w,3)+" ± "+fmt(w*Math.sqrt(1-z*z),3)+" j":"real"],["Overshoot",fmt(Mp,2)+" %"],["Peak time",z<1?fmt(Math.PI/(w*Math.sqrt(1-z*z)),3)+" s":"—"],["Settling time (2 %)",fmt(4/(z*w),3)+" s"]],svg:plotSVG([{pts:pts,label:"y(t)"}],{xlabel:"time (s)",ylabel:"response",xmin:0,ymin:0}),caption:"Unit step response."};''')],
    quiz=[
        dict(q="L{df/dt} equals:", o=["F(s)/s", "sF(s) − f(0)", "s²F(s)", "F(s)"], a=1, e="Differentiation property."),
        dict(q="A first-order system reaches what fraction of its final value in one time constant?", o=["50 %", "63.2 %", "90 %", "100 %"], a=1, e="1 − e⁻¹."),
        dict(q="Poles in the right half-plane mean:", o=["Stable", "Unstable", "Critically damped", "No dynamics"], a=1, e="Growing exponentials."),
        dict(q="Overshoot depends only on:", o=["ωn", "ζ", "K", "Input size"], a=1, e="Mp = f(ζ)."),
        dict(q="A time delay T has transfer function:", o=["1/(Ts + 1)", "e^(−sT)", "Ts", "1/T"], a=1, e="Shift theorem."),
        dict(q="Final value of the step response of 5/(2s + 1)?", o=["1", "2", "5", "0"], a=2, e="s × 5/(2s+1) × 1/s → 5."),
        dict(q="ζ = 0.5. Overshoot (%)?", num=16.3, unit="%", e="exp(−π×0.5/0.866) = 0.163."),
        dict(q="ζ = 0.4, ωn = 5 rad/s. Settling time (2 %) in s?", num=2.0, unit="s", e="4/(0.4×5)."),
    ],
    refs=["Ogata, K., Modern Control Engineering, 5th ed., Pearson, 2010.", "Nise, N. S., Control Systems Engineering, 7th ed., Wiley, 2015.", "Kreyszig, E., Advanced Engineering Mathematics, 10th ed., Ch. 6."],
    links=[("Wikipedia — Laplace transform", "https://en.wikipedia.org/wiki/Laplace_transform"), ("Wikipedia — Transfer function", "https://en.wikipedia.org/wiki/Transfer_function")],
))

# ---------------------------------------------------------------- 80 PID
Kpl, tau, theta = 2.0, 20.0, 4.0
lam_ = max(theta, tau / 2)
Kc = tau / (Kpl * (lam_ + theta)); Ti = tau
def simulate(Kc, Ti, Td=0.0, T=150.0, dt=0.1):
    n = int(T / dt); delay = int(theta / dt)
    u_hist = [0.0] * (delay + 1); y = 0.0; integ = 0.0; prev = 0.0; out = []
    for k in range(n):
        tt_ = k * dt; sp = 1.0 if tt_ >= 5 else 0.0
        e = sp - y; integ += e * dt
        d = -(y - prev) / dt if k else 0.0
        u = Kc * (e + integ / Ti + Td * d); u = max(-5, min(5, u)); prev = y
        u_hist.append(u); ud = u_hist[-delay - 1]
        y += dt * (-y + Kpl * ud) / tau
        out.append((tt_, y))
    return out
pidplot = plot([dict(pts=simulate(Kc, Ti), label=f"lambda tuning Kc = {Kc:.2f}, Ti = {Ti:.0f} s", at=90),
                dict(pts=simulate(Kc * 2.2, Ti / 2), label="aggressive (2.2 Kc, Ti/2)", at=30)],
               "time (s)", "process variable", xlim=(0, 150), ylim=(0, 1.6), h=300)
ARTICLES.append(dict(
    slug="pid-control-and-tuning", group="maths",
    title="PID Control and Tuning: P, I and D Actions, FOPDT Models, Ziegler–Nichols and Lambda Tuning",
    short="PID control", tags=["PID", "Control", "Tuning", "Automation"],
    desc="How PID controllers work, identifying a first-order-plus-dead-time process from a step test, Ziegler–Nichols and lambda (IMC) tuning rules, derivative filtering, anti-windup and a closed-loop PID simulator.",
    blurb="What each PID term does, how to model a process from a bump test, and tuning rules that give a stable, fast loop.",
    lead="PID controllers hold temperatures, pressures, speeds and flows on test rigs and in plants. Most loops are tuned by trial and error and end up either sluggish or oscillating. A short step test that fits a first-order-plus-dead-time model, followed by a tuning rule, gives good settings in minutes and explains why some loops cannot be made fast.",
    takeaways=[
        "u = K<sub>c</sub>·[e + (1/T<sub>i</sub>)∫e dt + T<sub>d</sub>·de/dt]: P reacts to error, I removes offset, D anticipates.",
        "A bump test gives a FOPDT model: gain K, time constant τ and dead time θ; difficulty rises with θ/τ.",
        "Lambda (IMC) tuning: K<sub>c</sub> = τ/(K(λ + θ)), T<sub>i</sub> = τ; choose λ ≥ θ for robustness.",
        "Ziegler–Nichols closed-loop: K<sub>c</sub> = 0.6K<sub>u</sub>, T<sub>i</sub> = P<sub>u</sub>/2, T<sub>d</sub> = P<sub>u</sub>/8; aggressive (quarter-decay) by design.",
        "Use derivative on measurement with filtering, and anti-windup on the integral when the output saturates.",
    ],
    body=f'''
<h2 id="terms">1. The three terms</h2>
{table(["Term","Effect","Too much causes"],[["Proportional (Kc)","Output proportional to error","Oscillation; steady offset if used alone"],["Integral (1/Ti)","Accumulates error to remove offset","Slow oscillation, overshoot, windup"],["Derivative (Td)","Reacts to rate of change; damps","Noise amplification, output chatter"]])}
<h2 id="model">2. Process model from a step test</h2>
{formula("FOPDT:  G(s) = K·e^(−θs)/(τs + 1)\nK = ΔPV/ΔOutput;   θ = time before PV starts to move;   τ = time from start of movement to 63 % of change")}
<h2 id="tuning">3. Tuning rules</h2>
{table(["Rule","Kc","Ti","Td"],[["Lambda / IMC (PI)","τ/(K·(λ + θ))","τ","0"],["Ziegler–Nichols open loop (PID)","1.2τ/(K·θ)","2θ","0.5θ"],["Ziegler–Nichols closed loop (PID)","0.6·Ku","Pu/2","Pu/8"],["Ziegler–Nichols closed loop (PI)","0.45·Ku","Pu/1.2","0"]])}
{fig(pidplot, f"Figure 1. Simulated set-point step for a process with K = {Kpl}, τ = {tau:.0f} s, θ = {theta:.0f} s: lambda tuning (λ = {lam_:.0f} s) gives a smooth, non-overshooting response; doubling the gain and halving Ti causes oscillation.")}
<h2 id="practice">4. Practical points</h2>
<ul><li>Fix mechanical and sensor problems first (valve stiction, sensor noise, wrong scaling).</li><li>Anti-windup: stop integrating when the output saturates, or use back-calculation.</li><li>Bumpless transfer between manual and auto.</li><li>For dead-time-dominant loops (θ/τ &gt; 1), accept slower tuning or use a Smith predictor or feedforward.</li></ul>
''',
    calcs=[dict(id="pid", title="PID loop simulator (FOPDT process)",
                presets=[dict(label="Lambda tuning", v=dict(K=2, tau=20, th=4, Kc=0.208, Ti=20, Td=0, umax=5)), dict(label="Aggressive", v=dict(K=2, tau=20, th=4, Kc=0.46, Ti=10, Td=0, umax=5)), dict(label="With derivative", v=dict(K=2, tau=20, th=4, Kc=0.35, Ti=16, Td=2, umax=5))],
                inputs=[dict(id="K", label="Process gain K", value=2), dict(id="tau", label="Time constant τ (s)", value=20), dict(id="th", label="Dead time θ (s)", value=4),
                        dict(id="Kc", label="Controller gain Kc", value=0.208), dict(id="Ti", label="Integral time Ti (s)", value=20), dict(id="Td", label="Derivative time Td (s)", value=0), dict(id="umax", label="Output limit ±", value=5)],
                js='''var dt=0.1,T=Math.max(150,10*(v.tau+v.th)),n=Math.round(T/dt),del=Math.round(v.th/dt),uh=[],y=0,I=0,prev=0,pts=[],sp=[],mx=0;for(var i=0;i<=del;i++)uh.push(0);
for(var k=0;k<n;k++){var t=k*dt,s=t>=5?1:0,e=s-y,d=k?-(y-prev)/dt:0;var u=v.Kc*(e+I/v.Ti+v.Td*d);if(u>v.umax)u=v.umax;else if(u<-v.umax)u=-v.umax;else I+=e*dt;prev=y;uh.push(u);var ud=uh[uh.length-1-del];y+=dt*(-y+v.K*ud)/v.tau;if(k%5===0){pts.push([t,y]);sp.push([t,s]);}if(t>5)mx=Math.max(mx,y);}
var lam=Math.max(v.th,v.tau/2),kc=v.tau/(v.K*(lam+v.th));
return {rows:[["Overshoot",fmt(Math.max(0,(mx-1)*100),1)+" %"],["θ/τ",fmt(v.th/v.tau,2),v.th/v.tau>1?"dead-time dominant":""],["Lambda suggestion (λ = "+fmt(lam,1)+" s)","Kc = "+fmt(kc,3)+", Ti = "+fmt(v.tau,1)+" s"]],
verdict:mx>1.3?["caution","Large overshoot: reduce Kc or increase Ti."]:["ok","Response well damped."],svg:plotSVG([{pts:pts,label:"PV"},{pts:sp,label:"set point"}],{xlabel:"time (s)",ylabel:"value",xmin:0,ymin:0}),caption:"Closed-loop response to a set-point step at 5 s."};''')],
    quiz=[
        dict(q="Which term removes steady-state offset?", o=["P", "I", "D", "None"], a=1, e="Integral."),
        dict(q="Derivative action mainly:", o=["Removes offset", "Adds damping by reacting to rate of change", "Increases gain", "Filters noise"], a=1, e="Anticipation."),
        dict(q="Integral windup happens when:", o=["Error is zero", "Output saturates while integral keeps growing", "Derivative is large", "Gain is low"], a=1, e="Use anti-windup."),
        dict(q="A loop is harder to control when θ/τ is:", o=["Small", "Large", "Zero", "Negative"], a=1, e="Dead time limits speed."),
        dict(q="Ziegler–Nichols closed-loop PID gain is:", o=["0.6 Ku", "Ku", "0.1 Ku", "2 Ku"], a=0, e="With Ti = Pu/2, Td = Pu/8."),
        dict(q="In lambda tuning, Ti equals:", o=["θ", "τ", "λ", "K"], a=1, e="Cancels process lag."),
        dict(q="K = 1.5, τ = 30 s, θ = 5 s, λ = 15 s. Lambda Kc?", num=1.0, e="30/(1.5 × 20) = 1.0."),
        dict(q="Ku = 4, Pu = 12 s. Z–N PID Ti (s)?", num=6, unit="s", e="Pu/2."),
    ],
    refs=["Åström, K. J. and Hägglund, T., Advanced PID Control, ISA, 2006.", "Ziegler, J. G. and Nichols, N. B., 'Optimum settings for automatic controllers', Trans. ASME, 64, 1942.", "Skogestad, S., 'Simple analytic rules for model reduction and PID controller tuning', J. Process Control, 13, 2003.", "Seborg, D. E. et al., Process Dynamics and Control, 4th ed., Wiley, 2016."],
    links=[("Wikipedia — PID controller", "https://en.wikipedia.org/wiki/PID_controller")],
))

# ---------------------------------------------------------------- 81 STATISTICS
xd = np.array([100, 200, 300, 400, 500, 600, 700, 800])
yd = np.array([1.02, 1.05, 1.11, 1.12, 1.18, 1.21, 1.24, 1.31])
sl, ic = np.polyfit(xd, yd, 1)
yhat = sl * xd + ic
r2 = 1 - ((yd - yhat) ** 2).sum() / ((yd - yd.mean()) ** 2).sum()
se = math.sqrt(((yd - yhat) ** 2).sum() / (len(xd) - 2))
se_sl = se / math.sqrt(((xd - xd.mean()) ** 2).sum())
t975_6 = 2.447
stplot = plot([dict(pts=list(zip(xd.tolist(), yhat.tolist())), label=f"fit: y = {ic:.3f} + {sl*1000:.3f}·x/1000", at=120)], "running hours", "vibration (mm/s)", xlim=(0, 900), ylim=(0.9, 1.4), h=280,
              points=[(float(a), float(b), "") for a, b in zip(xd, yd)])
ARTICLES.append(dict(
    slug="statistics-for-test-data", group="maths",
    title="Statistics for Test Data: Mean, Scatter, Confidence Intervals and Linear Regression",
    short="Statistics for test data", tags=["Statistics", "Regression", "Confidence intervals", "Test data"],
    desc="Practical statistics for engineering test data: mean, standard deviation and standard error, t-based confidence intervals, linear regression with slope uncertainty and R², residual checks, outliers and trend significance.",
    blurb="Summarising repeated readings, putting confidence intervals on them, and fitting trends with an honest slope uncertainty.",
    lead="Test data is noisy. Before concluding that a temperature rose or a vibration trend is real, you need to know how much scatter to expect and how confident you can be in a mean or a slope. A handful of statistical tools, used correctly, separate real changes from noise and prevent both false alarms and missed trends.",
    takeaways=[
        "Standard deviation s describes scatter of readings; the standard error s/√n describes uncertainty of the mean.",
        "95 % confidence interval of a mean: x̄ ± t<sub>0.975,n−1</sub>·s/√n (t ≈ 2.0 for large n, larger for small n).",
        "Linear regression gives slope and intercept; report the slope with its standard error or confidence interval, not just R².",
        "A trend is statistically significant at 95 % if the slope's confidence interval does not include zero.",
        "Always plot residuals: curvature, outliers and changing scatter break the assumptions.",
    ],
    body=f'''
<h2 id="descriptive">1. Describing repeated readings</h2>
{formula("Mean x̄ = Σx/n      s = √[Σ(x − x̄)²/(n − 1)]      Standard error SE = s/√n\n95 % CI of mean: x̄ ± t(0.975, n−1)·s/√n")}
{table(["n − 1","1","2","3","4","5","6","8","10","15","20","30","∞"],[["t (95 %, two-sided)","12.71","4.30","3.18","2.78","2.57","2.45","2.31","2.23","2.13","2.09","2.04","1.96"]])}
<h2 id="regression">2. Linear regression</h2>
{formula("Slope b = Σ(x − x̄)(y − ȳ)/Σ(x − x̄)²      Intercept a = ȳ − b·x̄\nResidual std error s_e = √[Σ(y − ŷ)²/(n − 2)]\nSE(b) = s_e/√Σ(x − x̄)²       95 % CI of slope: b ± t(0.975, n−2)·SE(b)\nR² = 1 − Σ(y − ŷ)²/Σ(y − ȳ)²")}
{fig(stplot, "Figure 1. Vibration trend over 800 running hours with least-squares fit.")}
{table(["Result","Value"],[["Slope",f"{sl*1000:.3f} mm/s per 1000 h"],["95 % CI of slope",f"{(sl - t975_6*se_sl)*1000:.3f} to {(sl + t975_6*se_sl)*1000:.3f} per 1000 h"],["R²",f"{r2:.3f}"],["Conclusion","Rising trend is significant (CI excludes zero)"]],num_cols=(1,))}
<h2 id="cautions">3. Cautions</h2>
<ul><li>Correlation is not causation: speed, load and temperature often change together.</li><li>Don't extrapolate far beyond the data range.</li><li>Investigate outliers before removing them; use tests such as Grubbs' only for genuinely normal data.</li><li>Autocorrelated data (consecutive samples from a slow process) overstates confidence: thin the data or use time-series methods.</li></ul>
''',
    calcs=[dict(id="st", title="Mean, confidence interval and linear regression",
                note="Enter x,y pairs separated by spaces, e.g. 100,1.02 200,1.05 … (for a mean only, use any x values).",
                presets=[dict(label="Trend example", v=dict(d="100,1.02 200,1.05 300,1.11 400,1.12 500,1.18 600,1.21 700,1.24 800,1.31"))],
                inputs=[dict(id="d", label="Data (x,y pairs)", value="100,1.02 200,1.05 300,1.11 400,1.12 500,1.18 600,1.21 700,1.24 800,1.31", text=True)],
                js='''var P=v.d.trim().split(/\\s+/).map(function(s){var a=s.split(",");return [parseFloat(a[0]),parseFloat(a[1])];}).filter(function(p){return isFinite(p[0])&&isFinite(p[1]);}),n=P.length;if(n<3)return {rows:[],verdict:["bad","Enter at least three pairs."]};
var T=[0,12.71,4.30,3.18,2.78,2.57,2.45,2.36,2.31,2.26,2.23,2.20,2.18,2.16,2.14,2.13,2.12,2.11,2.10,2.09,2.09,2.08,2.07,2.07,2.06,2.06,2.06,2.05,2.05,2.05,2.04];function t(df){return df<=30?T[df]:(df<=60?2.00:1.98);}
var mx=0,my=0;P.forEach(function(p){mx+=p[0];my+=p[1];});mx/=n;my/=n;var sxx=0,sxy=0,syy=0;P.forEach(function(p){sxx+=(p[0]-mx)*(p[0]-mx);sxy+=(p[0]-mx)*(p[1]-my);syy+=(p[1]-my)*(p[1]-my);});
var b=sxy/sxx,a=my-b*mx,sse=0;P.forEach(function(p){sse+=Math.pow(p[1]-a-b*p[0],2);});var se=Math.sqrt(sse/(n-2)),seb=se/Math.sqrt(sxx),r2=1-sse/syy,sy=Math.sqrt(syy/(n-1)),ci=t(n-1)*sy/Math.sqrt(n),cib=t(n-2)*seb;
var pts=P.map(function(p){return [p[0],p[1]];}).sort(function(x,y){return x[0]-y[0];}),fit=[[pts[0][0],a+b*pts[0][0]],[pts[n-1][0],a+b*pts[n-1][0]]];
return {rows:[["n",n],["Mean y ± 95 % CI",fmt(my,4)+" ± "+fmt(ci,4)],["Std dev y",fmt(sy,4)],["Slope ± 95 % CI",sig(b,4)+" ± "+sig(cib,3)],["Intercept",sig(a,5)],["R²",fmt(r2,4)]],
verdict:Math.abs(b)>cib?["ok","Slope is significantly different from zero (95 %)."]:["caution","Slope not significant at 95 %: the trend may be noise."],svg:plotSVG([{pts:fit,label:"fit"},{pts:pts,label:"data"}],{xlabel:"x",ylabel:"y"}),caption:"Data and least-squares line."};''')],
    quiz=[
        dict(q="Standard error of the mean is:", o=["s", "s/√n", "s·√n", "s/n"], a=1, e="Uncertainty of the mean."),
        dict(q="For n = 5 readings, the 95 % t value is about:", o=["1.96", "2.78", "12.7", "1.0"], a=1, e="df = 4 → 2.78."),
        dict(q="A slope is significant at 95 % when:", o=["R² > 0.5", "Its 95 % CI excludes zero", "n > 3", "It is positive"], a=1, e="Hypothesis test on slope."),
        dict(q="High R² guarantees:", o=["Causation", "A good fit of a straight line to these data only", "Correct extrapolation", "No outliers"], a=1, e="R² says nothing about causation."),
        dict(q="Residual plots help detect:", o=["Units", "Curvature, outliers, changing scatter", "Sample rate", "Nothing"], a=1, e="Model assumptions."),
        dict(q="Autocorrelated samples make confidence intervals look:", o=["Too wide", "Too narrow (over-confident)", "Correct", "Zero"], a=1, e="Effective n is smaller."),
        dict(q="s = 0.4, n = 16. Standard error?", num=0.1, e="0.4/4."),
        dict(q="Mean 10.0, s = 1.0, n = 11 (t = 2.23). 95 % CI half-width?", num=0.672, e="2.23 × 1/√11 = 0.672."),
    ],
    refs=["Montgomery, D. C. and Runger, G. C., Applied Statistics and Probability for Engineers, 7th ed., Wiley, 2018.", "NIST/SEMATECH e-Handbook of Statistical Methods.", "Draper, N. R. and Smith, H., Applied Regression Analysis, 3rd ed., Wiley, 1998."],
    links=[("NIST e-Handbook of Statistical Methods", "https://www.itl.nist.gov/div898/handbook/")],
))

# ---------------------------------------------------------------- 82 PYTHON FOR TEST DATA
ARTICLES.append(dict(
    slug="python-for-test-data", group="computing",
    title="Python for Test Data: pandas, Resampling, Alignment, SQLite and Plots",
    short="Python for test data", tags=["Python", "pandas", "SQLite", "Data analysis"],
    desc="Practical Python for engineering test data: reading CSV logs with pandas, timestamps, resampling and rolling statistics, aligning data from two systems, chunked reading of large files, storing in SQLite or Parquet, FFT with NumPy and plotting.",
    blurb="Recipes for turning raw test logs into clean, aligned, stored and plotted data with pandas, NumPy and SQLite.",
    lead="Spreadsheets struggle beyond a few hundred thousand rows; test rigs produce millions. A few lines of Python with pandas read the logs, fix timestamps, resample to a common rate, align process and vibration data, store them in a database and plot trends. The same script then runs on every new file, which is the real gain.",
    takeaways=[
        "Read CSVs with pandas.read_csv, parse the time column, and set it as the index.",
        "Resample to a common interval (df.resample('1s').mean()) and use rolling windows for moving averages and limits.",
        "Align data from two systems with pandas.merge_asof on timestamps, with a tolerance.",
        "Read huge files in chunks and append results to SQLite or Parquet instead of loading everything into memory.",
        "Memory needed ≈ rows × numeric columns × 8 bytes; one million rows × 20 columns ≈ 160 MB.",
    ],
    body=f'''
<h2 id="read">1. Reading and cleaning</h2>
{code('''
import pandas as pd
df = pd.read_csv("run_2026-11-24.csv", parse_dates=["Time"], dayfirst=True)
df = df.set_index("Time").sort_index()
df = df[~df.index.duplicated()]            # drop duplicate timestamps
df = df.apply(pd.to_numeric, errors="coerce")  # text like "---" becomes NaN
print(df.describe())
''')}
<h2 id="resample">2. Resampling and rolling statistics</h2>
{code('''
one_s = df.resample("1s").mean()                 # 1-second means
one_min = df.resample("1min").agg(["mean", "max"])
one_s["Temp_roll"] = one_s["Oil_Temp"].rolling("10min").mean()
alarms = one_s[one_s["Vib_RMS"] > 2.5]           # rows above a limit
''')}
<h2 id="align">3. Aligning two systems</h2>
{code('''
proc = pd.read_csv("process.csv", parse_dates=["Time"]).sort_values("Time")
vib = pd.read_csv("vibration_features.csv", parse_dates=["Time"]).sort_values("Time")
both = pd.merge_asof(vib, proc, on="Time", direction="nearest", tolerance=pd.Timedelta("1s"))
''')}
<h2 id="big">4. Large files and storage</h2>
{code('''
import sqlite3
con = sqlite3.connect("test_data.db")
for chunk in pd.read_csv("huge_log.csv", parse_dates=["Time"], chunksize=500_000):
    chunk.resample("1s", on="Time").mean().to_sql("features_1s", con, if_exists="append")
q = pd.read_sql("SELECT * FROM features_1s WHERE Time >= '2026-11-24'", con, parse_dates=["Time"])
df.to_parquet("run.parquet")   # compact, fast, keeps types (needs pyarrow)
''')}
<h2 id="analysis">5. Spectrum and plot</h2>
{code('''
import numpy as np, matplotlib.pyplot as plt
x = raw["Acc_X"].to_numpy(); fs = 25600
w = np.hanning(len(x)); X = np.abs(np.fft.rfft(x * w)) * 2 / w.sum()
f = np.fft.rfftfreq(len(x), 1 / fs)
fig, ax = plt.subplots(2, 1, figsize=(12, 6))
one_min["Vib_RMS"]["mean"].plot(ax=ax[0]); ax[0].set_ylabel("mm/s")
ax[1].plot(f, X); ax[1].set_xlim(0, 2000); ax[1].set_xlabel("Hz")
fig.tight_layout(); fig.savefig("report.png", dpi=150)
''')}
''',
    calcs=[dict(id="py", title="Snippet builder and memory estimate",
                presets=[dict(label="1 s means of a CSV log", v=dict(f="run.csv", tc="Time", rs="1s", cols="Oil_Temp,Vib_RMS", rows=2000000, nc=20, db="test_data.db"))],
                inputs=[dict(id="f", label="CSV file", value="run.csv", text=True), dict(id="tc", label="Time column", value="Time", text=True), dict(id="rs", label="Resample interval (e.g. 1s, 10s, 1min)", value="1s", text=True),
                        dict(id="cols", label="Columns to plot (comma list)", value="Oil_Temp,Vib_RMS", text=True), dict(id="rows", label="Rows in file", value=2000000), dict(id="nc", label="Numeric columns", value=20), dict(id="db", label="SQLite file", value="test_data.db", text=True)],
                js='''function e(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}var cols=v.cols.split(",").map(function(c){return '"'+c.trim()+'"';}).join(", ");
var c='import pandas as pd, sqlite3\\nimport matplotlib.pyplot as plt\\n\\ndf = pd.read_csv("'+v.f+'", parse_dates=["'+v.tc+'"]).set_index("'+v.tc+'").sort_index()\\ndf = df.apply(pd.to_numeric, errors="coerce")\\nr = df.resample("'+v.rs+'").mean()\\nr.to_sql("resampled", sqlite3.connect("'+v.db+'"), if_exists="append")\\nr[['+cols+'].plot(subplots=True, figsize=(12, 6))\\nplt.tight_layout(); plt.savefig("trend.png", dpi=150)';
var mb=v.rows*v.nc*8/1e6;return {rows:[["Approx. memory for full file",fmt(mb,0)+" MB"]],html:"<pre>"+e(c)+"</pre>",verdict:mb>2000?["caution","Large: read in chunks (chunksize=500_000) and append results."]:["ok","Fits comfortably in memory on a typical PC."]};''')],
    quiz=[
        dict(q="Which pandas function aligns two time series by nearest timestamp?", o=["merge", "merge_asof", "concat", "join"], a=1, e="merge_asof with tolerance."),
        dict(q="df.resample('1min').mean() requires:", o=["A numeric index", "A datetime index (or on=time column)", "SQLite", "NumPy only"], a=1, e="Time-based resampling."),
        dict(q="To process a 10 GB CSV on a laptop you should:", o=["Open it in a spreadsheet", "Read it in chunks", "Convert to PDF", "Email it"], a=1, e="chunksize."),
        dict(q="errors='coerce' in pd.to_numeric:", o=["Raises errors", "Turns unparseable text into NaN", "Deletes rows", "Rounds"], a=1, e="Cleans text values."),
        dict(q="Parquet files are:", o=["Text", "Compressed columnar binary that keeps types", "Images", "Databases"], a=1, e="Fast and compact."),
        dict(q="Why set the time column as the index?", o=["Looks nicer", "Enables time-based slicing and resampling", "Saves memory", "Required by CSV"], a=1, e="DatetimeIndex features."),
        dict(q="Memory for 5 million rows × 10 float columns (MB)?", num=400, unit="MB", e="5e6 × 10 × 8 B."),
        dict(q="Resampling 25,600 Hz data to 1 s means reduces rows by what factor?", num=25600, e="One row per second."),
    ],
    refs=["McKinney, W., Python for Data Analysis, 3rd ed., O'Reilly, 2022.", "pandas documentation (read_csv, resample, merge_asof, to_sql).", "Python standard library documentation: sqlite3.", "NumPy documentation: numpy.fft."],
    links=[("pandas documentation", "https://pandas.pydata.org/docs/"), ("Python sqlite3", "https://docs.python.org/3/library/sqlite3.html")],
))

# ---------------------------------------------------------------- 83 INDUSTRIAL COMMS
baud, nreg = 19200, 20
char_t = 11 / baud
req = 8 * char_t; resp = (5 + 2 * nreg) * char_t
gap = 3.5 * char_t
cycle = req + resp + 2 * gap
ARTICLES.append(dict(
    slug="industrial-communication-modbus-rs485-can", group="computing",
    title="Industrial Communication: Modbus RTU/TCP, RS-485, CAN and OPC UA",
    short="Modbus, RS-485, CAN", tags=["Modbus", "RS-485", "CAN", "OPC UA"],
    desc="Connecting instruments, drives and PLCs: Modbus function codes and register addressing, 32-bit floats and word order, RS-485 wiring, termination and biasing, CAN bit rate versus length, OPC UA overview, and timing estimates.",
    blurb="Reading registers over Modbus, decoding floats in the right word order, wiring RS-485 properly, and CAN and OPC UA basics.",
    lead="Test rigs connect dynamometer controllers, drives, power meters and PLCs over a handful of standard links. Most problems are simple once you know the conventions: which register numbering the manual uses, which word order a 32-bit float has, and whether the RS-485 line is terminated and biased. This article collects those conventions in one place.",
    takeaways=[
        "Modbus holding register 40001 is address 0 in the protocol (function 03); manuals mix 0- and 1-based numbering.",
        "A 32-bit float spans two 16-bit registers; word order varies (ABCD, CDAB, BADC, DCBA): try swaps if values look absurd.",
        "RS-485: daisy-chain topology, 120 Ω termination at both ends, failsafe biasing, common ground reference, up to 32 unit loads and about 1,200 m at low baud rates.",
        "Modbus RTU frames are separated by 3.5 character times of silence; at 19,200 baud reading 20 registers takes about 30 ms.",
        "CAN trades speed for distance (1 Mbit/s to about 40 m, 125 kbit/s to about 500 m); OPC UA provides secure, modelled data over Ethernet.",
    ],
    body=f'''
<h2 id="modbus">1. Modbus</h2>
{table(["Function code","Action","Data"],[["01","Read coils","Bits (outputs)"],["02","Read discrete inputs","Bits (inputs)"],["03","Read holding registers","16-bit words (read/write)"],["04","Read input registers","16-bit words (read only)"],["05 / 06","Write single coil / register",""],["15 / 16","Write multiple coils / registers",""]])}
{table(["Reference (manual)","Table","Protocol address"],[["00001–09999","Coils","0–9998"],["10001–19999","Discrete inputs","0–9998"],["30001–39999","Input registers","0–9998"],["40001–49999","Holding registers","0–9998"]])}
{formula("Float32 = registers R(n), R(n+1)  → bytes A B C D\nOrders: ABCD (big-endian), CDAB (word swap), BADC (byte swap), DCBA (little-endian)\nRTU character = 11 bits (start + 8 data + parity/stop + stop); frame gap ≥ 3.5 characters")}
<p>Example timing at {baud:,} baud reading {nreg} registers: request {req*1000:.1f} ms, response {resp*1000:.1f} ms, gaps {2*gap*1000:.1f} ms → about <b>{cycle*1000:.0f} ms</b> per poll before device response delay.</p>
<h2 id="rs485">2. RS-485 wiring</h2>
{fig(flow(["Master|PC / PLC","Device 1|short stub","Device 2","…","Device n|last on line","120 Ω|terminator"], h=120), "Figure 1. RS-485 daisy chain: one line, terminations at both physical ends, no star wiring.")}
<ul><li>Twisted pair with shield; connect signal ground (common) between devices.</li><li>Termination 120 Ω at both ends; failsafe bias resistors at one point so the idle line is defined.</li><li>Unique addresses 1–247; all devices at the same baud rate, parity and stop bits.</li><li>USB-to-RS-485 adapters: check automatic direction control and isolation.</li></ul>
<h2 id="can">3. CAN and OPC UA</h2>
{table(["CAN bit rate","Approx. max bus length"],[["1 Mbit/s","40 m"],["500 kbit/s","100 m"],["250 kbit/s","250 m"],["125 kbit/s","500 m"],["50 kbit/s","1,000 m"]],num_cols=(1,))}
<p>OPC UA runs over Ethernet with encryption, user authentication and an information model (variables with units, ranges and structure). It suits connecting PLCs, data acquisition and higher-level systems without vendor-specific drivers.</p>
''',
    calcs=[dict(id="mb", title="Modbus float decoder and poll time",
                presets=[dict(label="0x42F6, 0xE979 (ABCD)", v=dict(r1="42F6", r2="E979", ord="ABCD", baud=19200, n=20)), dict(label="Same value, word-swapped device", v=dict(r1="E979", r2="42F6", ord="CDAB", baud=19200, n=20))],
                inputs=[dict(id="r1", label="Register n (hex)", value="42F6", text=True), dict(id="r2", label="Register n+1 (hex)", value="E979", text=True),
                        dict(id="ord", label="Word/byte order", value="ABCD", options=[("ABCD", "ABCD (big-endian)"), ("CDAB", "CDAB (word swap)"), ("BADC", "BADC (byte swap)"), ("DCBA", "DCBA (little-endian)")]),
                        dict(id="baud", label="Baud rate", value=19200), dict(id="n", label="Registers per poll", value=20)],
                js='''var a=parseInt(v.r1,16)&0xFFFF,b=parseInt(v.r2,16)&0xFFFF,by=[a>>8,a&255,b>>8,b&255],m={ABCD:[0,1,2,3],CDAB:[2,3,0,1],BADC:[1,0,3,2],DCBA:[3,2,1,0]};
function dec(o){var dv=new DataView(new ArrayBuffer(4));for(var i=0;i<4;i++)dv.setUint8(i,by[m[o][i]]);return dv.getFloat32(0,false);}
var c=11/v.baud,t=(8+5+2*v.n+7)*c;var rows=[["Value ("+v.ord+")",sig(dec(v.ord),7)]];["ABCD","CDAB","BADC","DCBA"].forEach(function(o){if(o!==v.ord)rows.push(["If "+o,sig(dec(o),7)]);});rows.push(["Poll time (excl. device delay)",fmt(t*1000,1)+" ms"]);
return {rows:rows};''')],
    quiz=[
        dict(q="Modbus holding register 40001 corresponds to protocol address:", o=["40001", "1", "0", "40000"], a=2, e="Zero-based on the wire."),
        dict(q="Function code 03 reads:", o=["Coils", "Input registers", "Holding registers", "Discrete inputs"], a=2, e="Holding registers."),
        dict(q="A float read as nonsense often means:", o=["Wrong baud", "Wrong word order", "Too many devices", "No termination"], a=1, e="Try CDAB etc."),
        dict(q="RS-485 termination resistors go:", o=["At every device", "At both physical ends of the line", "Only at master", "Nowhere"], a=1, e="Match cable impedance."),
        dict(q="RS-485 topology should be:", o=["Star", "Daisy chain (bus)", "Ring", "Random"], a=1, e="Avoid stubs and stars."),
        dict(q="Increasing CAN bit rate:", o=["Increases max length", "Decreases max length", "No effect", "Removes termination"], a=1, e="Propagation delay limits length."),
        dict(q="Character time at 9,600 baud with 11 bits (ms)?", num=1.146, unit="ms", e="11/9600 s."),
        dict(q="0x42C80000 (ABCD) as float32?", num=100, e="IEEE-754: 100.0."),
    ],
    refs=["Modbus Organization, Modbus Application Protocol Specification V1.1b3 and Modbus over Serial Line V1.02.", "TIA/EIA-485-A, Electrical Characteristics of Generators and Receivers for Balanced Digital Multipoint Systems.", "ISO 11898-1/-2, Road vehicles — Controller area network (CAN).", "IEC 62541, OPC Unified Architecture."],
    links=[("Modbus Organization", "https://www.modbus.org"), ("Wikipedia — RS-485", "https://en.wikipedia.org/wiki/RS-485"), ("OPC Foundation", "https://opcfoundation.org")],
))
