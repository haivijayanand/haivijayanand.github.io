"""
TOOL:    Vijay_Wiki articles — group 2 (vibration and condition monitoring)
FAMILY:  vijay-wiki
VERSION: 1.0.0
DATE:    2026-11-24
CHAT:    claude.ai — Vijay_Wiki: build all suggested topics in groups and upload
CHANGES: 1.0.0 Initial six articles: fundamentals, FFT, PSD, envelope, phase, CM data handling
"""
import math
import numpy as np
from wiki import plot, flow, bars, fig, table, box, formula

ARTICLES = []
G0 = 9.80665

# =====================================================================================
# 9. VIBRATION FUNDAMENTALS
# =====================================================================================
vr, fv = 7.1, 50.0
vpk = vr * math.sqrt(2)
xpp = 2 * vpk / (2 * math.pi * fv) * 1000  # µm
apk = 2 * math.pi * fv * vpk / 1000 / G0
arms = apk / math.sqrt(2)

freqs = [2 * 1.08 ** k for k in range(0, 90) if 2 * 1.08 ** k <= 2000]
unitplot = plot([
    dict(pts=[(f, 2 * 4.5 * math.sqrt(2) / (2 * math.pi * f) * 1000) for f in freqs], label="displacement (µm p-p)", at=5),
    dict(pts=[(f, 4.5) for f in freqs], label="velocity (mm/s RMS)", at=300),
    dict(pts=[(f, 2 * math.pi * f * 4.5 / 1000 / G0 * 100) for f in freqs], label="acceleration (g RMS × 100)", at=150),
], "frequency (Hz)", "amplitude", xlim=(2, 2000), ylim=(0.1, 1000), xlog=True, ylog=True, h=340)

ARTICLES.append(dict(
    slug="vibration-fundamentals", group="vibration",
    title="Vibration Fundamentals: Displacement, Velocity, Acceleration and ISO 20816 Zones",
    short="Vibration fundamentals",
    tags=["Vibration", "ISO 20816", "Condition monitoring", "Units"],
    desc="Vibration quantities and units, peak/RMS/crest factor, conversions between displacement, velocity and acceleration, ISO 20816 evaluation zones and common fault frequencies.",
    blurb="Units, conversions, RMS and peak, which quantity to use at which frequency, and ISO 20816 severity zones.",
    lead="Vibration is the most informative single measurement on rotating machinery. The same motion can be expressed as displacement, velocity or acceleration, each emphasising a different frequency range. Knowing how to convert between them, and which severity limits apply, is the foundation of every condition-monitoring programme.",
    takeaways=[
        "For a sine wave: v = 2πf·x and a = 2πf·v. Displacement emphasises low frequencies, acceleration high ones.",
        "RMS = 0.707 × peak and peak-to-peak = 2 × peak for a sine; crest factor = peak / RMS (1.41 for a sine, higher for impacts).",
        "Velocity RMS (10–1,000 Hz) is the usual overall severity measure; ISO 20816 zones A–D grade it by machine class and support.",
        "Use displacement for shaft relative motion and low speeds, velocity for general machinery, acceleration for bearings and gears.",
        "Every fault has a frequency signature: unbalance 1×, misalignment 1× and 2× with axial, gear mesh z × f, bearings at non-integer orders.",
    ],
    body=f'''
<h2 id="quantities">1. Quantities and units</h2>
{formula("x(t) = X·sin(2πft)\nv(t) = 2πf·X·cos(2πft)          V = 2πf·X\na(t) = −(2πf)²·X·sin(2πft)      A = 2πf·V\nRMS = peak/√2 (sine)   peak-to-peak = 2·peak   1 g = 9.80665 m/s²\nCrest factor = peak / RMS        dB = 20·log10(level / reference)")}
{table(["Quantity","Usual unit","Detector","Best for"],[
["Displacement","µm or mils","peak-to-peak","Shaft relative motion (proximity probes), low speed (&lt; 10 Hz), clearances"],
["Velocity","mm/s or in/s","RMS (ISO) or peak (US practice)","General machine condition, 10–1,000 Hz"],
["Acceleration","g or m/s²","RMS or peak","Bearings, gears, high frequencies (&gt; 1 kHz), impacts"],
])}
{fig(unitplot, "Figure 1. A constant 4.5 mm/s RMS velocity expressed as displacement and acceleration (log–log). Displacement is large at low frequency and tiny at high frequency; acceleration is the opposite.")}

<h2 id="severity">2. Severity zones (ISO 20816 / ISO 10816-3)</h2>
{table(["Machine group","Support","A/B (mm/s RMS)","B/C","C/D"],[
["Group 1: large machines 300 kW – 50 MW","Rigid","2.3","4.5","7.1"],["Group 1","Flexible","3.5","7.1","11.0"],
["Group 2: medium machines 15 – 300 kW","Rigid","1.4","2.8","4.5"],["Group 2","Flexible","2.3","4.5","7.1"],
],num_cols=(2,3,4))}
<p>Zone A: newly commissioned machines. B: acceptable for long-term operation. C: unsatisfactory for long-term operation; plan action. D: severe enough to cause damage. Changes in a machine's own trend often matter more than the absolute zone: a step change of 25 % deserves attention even within zone B.</p>

<h2 id="faults">3. Fault frequencies</h2>
{table(["Fault","Main frequency","Clues"],[
["Unbalance","1× running speed, radial","Steady phase; amplitude ∝ speed² below resonance; H and V ≈ 90° apart"],
["Misalignment","1×, 2× (sometimes 3×)","High axial; 180° phase across coupling"],
["Mechanical looseness","Many harmonics, 0.5× subharmonics","Truncated waveform; erratic phase"],
["Rolling bearing defects","BPFO, BPFI, BSF, FTF (non-integer)","Envelope spectrum; high-frequency noise floor"],
["Gear mesh","z × running speed and harmonics","Sidebands at shaft speeds show eccentricity or damage"],
["Blade / vane pass","blades × running speed","Flow-related; changes with load"],
["Electrical (induction motors)","2 × line frequency (100 Hz on 50 Hz supply)","Disappears immediately when power is cut"],
["Resonance","Natural frequency","Large amplitude at a fixed frequency; 90° phase shift through it"],
])}

<h2 id="example">4. Worked example</h2>
<p>A velocity reading of {vr} mm/s RMS at a single frequency of {fv:.0f} Hz:</p>
{table(["Quantity","Value"],[["Velocity peak",f"{vpk:.2f} mm/s"],["Displacement peak-to-peak",f"{xpp:.1f} µm"],["Acceleration peak",f"{apk:.3f} g"],["Acceleration RMS",f"{arms:.3f} g"],
["ISO zone (Group 2, rigid)","D (above 4.5 mm/s)"]],num_cols=(1,))}
''',
    calcs=[dict(id="conv", title="Vibration unit converter (single frequency) and ISO zone",
                presets=[dict(label="7.1 mm/s at 50 Hz", v=dict(val=7.1, q="v", det="rms", f=50, grp="2r")), dict(label="0.5 g at 1 kHz", v=dict(val=0.5, q="a", det="rms", f=1000, grp="2r"))],
                inputs=[dict(id="val", label="Value", value=7.1), dict(id="q", label="Quantity", value="v", options=[("x", "Displacement (µm)"), ("v", "Velocity (mm/s)"), ("a", "Acceleration (g)")]),
                        dict(id="det", label="Detector", value="rms", options=[("rms", "RMS"), ("pk", "Peak"), ("pp", "Peak-to-peak")]),
                        dict(id="f", label="Frequency (Hz)", value=50),
                        dict(id="grp", label="ISO class", value="2r", options=[("1r", "Group 1, rigid"), ("1f", "Group 1, flexible"), ("2r", "Group 2, rigid"), ("2f", "Group 2, flexible")])],
                js='''var k=v.det==="rms"?Math.SQRT2:(v.det==="pp"?0.5:1),pk=v.val*k,w=2*Math.PI*v.f,g=9.80665;
var vpk=v.q==="x"?pk*1e-3*w:(v.q==="v"?pk:pk*g*1000/w);
var xpk=vpk/w*1000,apk=vpk*w/1000/g,vr=vpk/Math.SQRT2;
var Z={"1r":[2.3,4.5,7.1],"1f":[3.5,7.1,11],"2r":[1.4,2.8,4.5],"2f":[2.3,4.5,7.1]}[v.grp];
var zone=vr<=Z[0]?"A":vr<=Z[1]?"B":vr<=Z[2]?"C":"D";
return {rows:[["Displacement",fmt(2*xpk,2)+" µm p-p",fmt(xpk,2)+" µm peak"],["Velocity",fmt(vr,3)+" mm/s RMS",fmt(vpk,3)+" mm/s peak"],["Acceleration",fmt(apk/Math.SQRT2,4)+" g RMS",fmt(apk,4)+" g peak · "+fmt(apk*g,2)+" m/s²"],["ISO zone",zone,"limits "+Z.join(" / ")+" mm/s"]],
verdict:zone==="A"||zone==="B"?["ok","Zone "+zone+": acceptable for long-term operation."]:zone==="C"?["caution","Zone C: unsatisfactory for long-term operation; plan corrective action."]:["bad","Zone D: severe; risk of damage."]};''')],
    quiz=[
        dict(q="For a sine wave, RMS equals:", o=["2 × peak", "0.707 × peak", "1.41 × peak", "0.5 × peak"], a=1, e="RMS = peak/√2."),
        dict(q="Which quantity best reveals high-frequency bearing and gear problems?", o=["Displacement", "Velocity", "Acceleration", "Temperature"], a=2, e="Acceleration grows with frequency, emphasising high-frequency content."),
        dict(q="Electrical faults in a 50 Hz induction motor show strongly at:", o=["50 Hz", "100 Hz", "25 Hz", "Bearing frequencies"], a=1, e="Twice line frequency (100 Hz)."),
        dict(q="Misalignment is suggested by:", o=["Only 0.5×", "High axial 1× and 2×", "Random spectrum", "Gear mesh only"], a=1, e="High axial vibration at 1× and 2× is typical."),
        dict(q="Zone C in ISO 20816 means:", o=["New machine", "Long-term acceptable", "Unsatisfactory for long-term operation", "Immediate shutdown always"], a=2, e="C = plan corrective action."),
        dict(q="Crest factor of a pure sine is:", o=["1.0", "1.41", "2.0", "3.0"], a=1, e="peak/RMS = √2."),
        dict(q="Velocity 10 mm/s peak at 100 Hz. Displacement peak in µm?", num=15.92, unit="µm", e="X = V/(2πf) = 10/(628.3) mm = 15.9 µm."),
        dict(q="Velocity 5 mm/s RMS at 200 Hz. Acceleration RMS in g?", num=0.6406, unit="g", e="A = 2π × 200 × 5 mm/s = 6.283 m/s² = 0.641 g."),
    ],
    refs=["ISO 20816-1:2016, Mechanical vibration — Measurement and evaluation of machine vibration — General guidelines.", "ISO 10816-3:2009, Industrial machines with nominal power above 15 kW.",
          "Scheffer, C. and Girdhar, P., Practical Machinery Vibration Analysis and Predictive Maintenance, Newnes, 2004.", "Taylor, J. I., The Vibration Analysis Handbook, VCI.", "Randall, R. B., Vibration-based Condition Monitoring, Wiley, 2011."],
    links=[("Wikipedia — Vibration", "https://en.wikipedia.org/wiki/Vibration")],
))

# =====================================================================================
# 10. FFT AND SPECTRA
# =====================================================================================
Fs, N = 25600.0, 16384
fs_demo = 2048
t = np.arange(4096) / fs_demo
sig = 1.0 * np.sin(2 * np.pi * 50 * t) + 0.5 * np.sin(2 * np.pi * 100 * t) + 0.3 * np.sin(2 * np.pi * 312.5 * t) + 0.05 * np.random.default_rng(1).standard_normal(len(t))
win = np.hanning(len(t))
sp = np.abs(np.fft.rfft(sig * win)) * 2 / win.sum() / math.sqrt(2)
fq = np.fft.rfftfreq(len(t), 1 / fs_demo)
spec_pts = [(float(f), float(a)) for f, a in zip(fq, sp) if f <= 400]
specplot = plot([dict(pts=spec_pts, label=None, width=2)], "frequency (Hz)", "amplitude (RMS)", xlim=(0, 400), ylim=(0, 0.8), h=320,
                notes=[(52, 0.74, "1× = 50 Hz"), (102, 0.39, "2× = 100 Hz"), (300, 0.27, "312.5 Hz")])

ARTICLES.append(dict(
    slug="fft-and-spectrum-analysis", group="vibration",
    title="FFT and Spectrum Analysis: Sampling, Resolution, Windows and Averaging",
    short="FFT and spectra",
    tags=["FFT", "Signal processing", "Vibration", "Data acquisition"],
    desc="Practical FFT set-up for vibration: sampling rate, Nyquist and aliasing, lines of resolution, record length, window functions, averaging and overlap, with an interactive spectrum demo.",
    blurb="Choosing sample rate, lines, window and averaging so a spectrum shows what is really there.",
    lead="The fast Fourier transform turns a time signal into a spectrum, so that each machine fault appears at its own frequency. Getting a trustworthy spectrum depends on a few set-up choices: how fast to sample, how long to record, which window to apply and how many averages to take. These choices trade frequency resolution against time and amplitude accuracy.",
    takeaways=[
        "Sample at least 2.56 × the highest frequency of interest (F<sub>max</sub>) with an anti-alias filter; Nyquist is F<sub>s</sub>/2.",
        "Resolution Δf = F<sub>s</sub>/N = 1/T. Finer resolution needs a longer record: 0.1 Hz needs 10 s of data.",
        "Lines of resolution = N/2.56. A 3,200-line spectrum to 1 kHz has Δf = 0.3125 Hz.",
        "Use a Hanning window for general vibration, flat-top for accurate amplitudes, rectangular only for transients or order-tracked signals.",
        "Averaging reduces random noise; overlap (50–67 %) shortens measurement time without losing data.",
    ],
    body=f'''
<h2 id="sampling">1. Sampling and aliasing</h2>
{formula("Nyquist frequency   f_N = Fs / 2\nPractical rule       Fs = 2.56 · Fmax   (anti-alias filter roll-off)\nRecord length        T = N / Fs\nResolution           Δf = 1 / T = Fs / N\nLines                L = N / 2.56   (= Fmax / Δf)")}
<p>A frequency above F<sub>s</sub>/2 that reaches the digitiser folds back and appears as a false lower frequency (aliasing). It cannot be removed afterwards, so an analogue anti-alias filter must act before the converter. Delta-sigma converters include this filter automatically.</p>
{table(["Fmax","Lines","Fs","N","Record T","Δf"],[
["1 kHz","800","2.56 kHz","2,048","0.8 s","1.25 Hz"],["1 kHz","3,200","2.56 kHz","8,192","3.2 s","0.3125 Hz"],
["10 kHz","6,400","25.6 kHz","16,384","0.64 s","1.5625 Hz"],["10 kHz","25,600","25.6 kHz","65,536","2.56 s","0.39 Hz"],
],num_cols=(1,3))}

<h2 id="windows">2. Window functions</h2>
<p>The FFT assumes the record repeats forever. If the signal does not complete a whole number of cycles, the ends do not join and energy leaks into neighbouring lines. A window tapers the ends to reduce leakage at the cost of a wider peak.</p>
{table(["Window","Main use","Max amplitude error","Noise bandwidth (bins)"],[
["Rectangular (uniform)","Transients that fit the record, order-tracked or synchronous data","−3.9 dB (36 %)","1.00"],
["Hanning","General vibration, steady signals","−1.4 dB (15 %)","1.50"],
["Flat top","Accurate amplitude of tones, calibration","&lt; 0.1 dB","3.77"],
["Exponential / force","Impact (modal) testing","—","—"],
])}

<h2 id="averaging">3. Averaging and overlap</h2>
<ul><li><b>Linear (RMS) averaging</b> of spectra reduces the variance of random noise; 4–16 averages is common.</li>
<li><b>Peak hold</b> keeps the maximum in each line: useful for run-ups and intermittent events.</li>
<li><b>Time-synchronous averaging</b> (triggered by a tachometer) removes everything not locked to shaft speed, isolating gear and shaft signals.</li>
<li><b>Overlap</b> of 50–67 % with Hanning uses data efficiently; total time ≈ T·[1 + (n−1)(1 − overlap)].</li></ul>

<h2 id="example">4. Example spectrum</h2>
{fig(specplot, "Figure 1. Spectrum of a synthetic signal: 1.0 at 50 Hz, 0.5 at 100 Hz and 0.3 at 312.5 Hz plus noise; Fs = 2,048 Hz, N = 4,096, Hanning window. Amplitudes are RMS (peak/√2).")}
{fig(flow(["Sensor|accelerometer","Anti-alias filter|analogue","ADC|Fs, bits","Window|Hanning","FFT|N points","Average|n, overlap","Spectrum|Δf, Fmax"], h=130), "Figure 2. Signal chain from sensor to averaged spectrum.")}
''',
    calcs=[
        dict(id="fft", title="FFT set-up calculator", presets=[dict(label="1 kHz, 3200 lines", v=dict(fmax=1000, lines=3200, avg=8, ov=50)), dict(label="10 kHz, 6400 lines", v=dict(fmax=10000, lines=6400, avg=4, ov=50))],
             inputs=[dict(id="fmax", label="Fmax (Hz)", value=1000), dict(id="lines", label="Lines", value=3200), dict(id="avg", label="Averages", value=8), dict(id="ov", label="Overlap (%)", value=50)],
             js='''var Fs=2.56*v.fmax,N=v.lines*2.56,T=N/Fs,df=1/T,tot=T*(1+(v.avg-1)*(1-v.ov/100));
return {rows:[["Sample rate Fs",fmt(Fs,0)+" Hz"],["Block size N",fmt(N,0)],["Record length T",fmt(T,3)+" s"],["Resolution Δf",fmt(df,4)+" Hz"],["Total time",fmt(tot,2)+" s",v.avg+" averages, "+v.ov+" % overlap"]]};'''),
        dict(id="demo", title="Interactive spectrum demo (two tones + noise)", note="A 1,024-point record is generated and transformed in the browser. Change the window and see leakage.",
             presets=[dict(label="Tone between bins, rectangular", v=dict(f1=51.3, a1=1, f2=120, a2=0.2, fs=1024, win="rect", noise=0.02)), dict(label="Same with Hanning", v=dict(f1=51.3, a1=1, f2=120, a2=0.2, fs=1024, win="hann", noise=0.02))],
             inputs=[dict(id="f1", label="Tone 1 frequency (Hz)", value=51.3), dict(id="a1", label="Tone 1 peak amplitude", value=1), dict(id="f2", label="Tone 2 frequency (Hz)", value=120),
                     dict(id="a2", label="Tone 2 peak amplitude", value=0.2), dict(id="fs", label="Sample rate (Hz)", value=1024), dict(id="noise", label="Noise RMS", value=0.02),
                     dict(id="win", label="Window", value="hann", options=[("rect", "Rectangular"), ("hann", "Hanning"), ("flat", "Flat top")])],
             js='''var N=1024,x=[],w=[],s=0,seed=7;function rnd(){seed=(seed*16807)%2147483647;return seed/2147483647-0.5;}
for(var n=0;n<N;n++){var tt=n/v.fs;var ww=v.win==="rect"?1:(v.win==="hann"?0.5-0.5*Math.cos(2*Math.PI*n/(N-1)):(0.21557895-0.41663158*Math.cos(2*Math.PI*n/(N-1))+0.277263158*Math.cos(4*Math.PI*n/(N-1))-0.083578947*Math.cos(6*Math.PI*n/(N-1))+0.006947368*Math.cos(8*Math.PI*n/(N-1))));
w.push(ww);s+=ww;x.push((v.a1*Math.sin(2*Math.PI*v.f1*tt)+v.a2*Math.sin(2*Math.PI*v.f2*tt)+v.noise*3.46*rnd())*ww);}
var pts=[],pk=0,pf=0;for(var k=0;k<N/2;k++){var re=0,im=0;for(var n2=0;n2<N;n2++){var an=2*Math.PI*k*n2/N;re+=x[n2]*Math.cos(an);im-=x[n2]*Math.sin(an);}
var amp=2*Math.sqrt(re*re+im*im)/s;pts.push([k*v.fs/N,amp]);if(amp>pk){pk=amp;pf=k*v.fs/N;}}
var fn=v.fs/2;return {rows:[["Resolution Δf",fmt(v.fs/N,3)+" Hz"],["Nyquist",fmt(fn,0)+" Hz",(v.f1>fn||v.f2>fn)?"a tone is above Nyquist: it will alias":"tones below Nyquist"],["Highest peak",fmt(pk,3)+" (peak)","at "+fmt(pf,2)+" Hz; true "+v.a1]],
svg:plotSVG([{pts:pts}],{xlabel:"frequency (Hz)",ylabel:"amplitude (peak)",xmin:0,xmax:fn,ymin:0}),caption:"Computed amplitude spectrum (peak scaling). Compare peak height and skirt width between windows."};'''),
    ],
    quiz=[
        dict(q="With Fs = 10,240 Hz the Nyquist frequency is:", o=["10,240 Hz", "5,120 Hz", "4,000 Hz", "2,560 Hz"], a=1, e="f_N = Fs/2."),
        dict(q="Frequency resolution depends on:", o=["Sample rate only", "Record length T (Δf = 1/T)", "Window only", "Number of averages"], a=1, e="Δf = 1/T = Fs/N."),
        dict(q="Which window gives the most accurate amplitude for a steady tone?", o=["Rectangular", "Hanning", "Flat top", "Exponential"], a=2, e="Flat top has < 0.1 dB scalloping error."),
        dict(q="Aliasing is prevented by:", o=["More averages", "An analogue anti-alias filter before the ADC", "A Hanning window", "Longer records"], a=1, e="Once aliased, a signal cannot be separated digitally."),
        dict(q="Time-synchronous averaging keeps components that are:", o=["Random", "Locked to the tachometer (shaft) rotation", "Above Nyquist", "Electrical"], a=1, e="Non-synchronous components average away."),
        dict(q="Why use overlap with a Hanning window?", o=["To increase resolution", "To use the tapered data at block ends and save time", "To remove noise", "To avoid aliasing"], a=1, e="Overlap recovers information attenuated by the window taper."),
        dict(q="Fmax 2 kHz, 1,600 lines. Resolution Δf in Hz?", num=1.25, unit="Hz", e="Δf = 2000/1600 = 1.25 Hz."),
        dict(q="Δf of 0.1 Hz requires a record length of how many seconds?", num=10, unit="s", e="T = 1/Δf = 10 s."),
    ],
    refs=["Randall, R. B., Frequency Analysis, Brüel & Kjær, 1987.", "Harris, F. J., 'On the use of windows for harmonic analysis with the DFT', Proc. IEEE, 66(1), 1978.",
          "Bendat, J. S. and Piersol, A. G., Random Data: Analysis and Measurement Procedures, 4th ed., Wiley, 2010.", "ISO 18431-1/-2, Mechanical vibration and shock — Signal processing."],
    links=[("Wikipedia — Fast Fourier transform", "https://en.wikipedia.org/wiki/Fast_Fourier_transform"), ("Wikipedia — Window function", "https://en.wikipedia.org/wiki/Window_function")],
))

# =====================================================================================
# 11. PSD AND RANDOM VIBRATION
# =====================================================================================
prof = [(20, 0.01), (80, 0.04), (350, 0.04), (2000, 0.007)]


def seg_area(f1, p1, f2, p2):
    m = math.log10(p2 / p1) / math.log10(f2 / f1)
    if abs(m + 1) < 1e-9:
        return p1 * f1 * math.log(f2 / f1)
    return p1 * f1 / (m + 1) * ((f2 / f1) ** (m + 1) - 1)


area = sum(seg_area(*prof[i], *prof[i + 1]) for i in range(len(prof) - 1))
grms = math.sqrt(area)
slopes = [10 * math.log10(prof[i + 1][1] / prof[i][1]) / math.log2(prof[i + 1][0] / prof[i][0]) for i in range(len(prof) - 1)]
fnm, Qm = 200.0, 10.0
miles = math.sqrt(math.pi / 2 * fnm * Qm * 0.04)
psdplot = plot([dict(pts=[(f, p) for f, p in prof], label="test profile", at=200)], "frequency (Hz)", "PSD (g²/Hz)", xlim=(10, 3000), ylim=(0.001, 0.1), xlog=True, ylog=True, h=320,
               notes=[(25, 0.02, f"+{slopes[0]:.1f} dB/oct"), (700, 0.03, f"{slopes[2]:.1f} dB/oct"), (100, 0.05, "flat 0.04 g²/Hz")])

ARTICLES.append(dict(
    slug="psd-and-random-vibration", group="vibration",
    title="PSD and Random Vibration: g²/Hz, Grms, dB/octave Slopes and Miles' Equation",
    short="PSD and random vibration",
    tags=["PSD", "Random vibration", "Environmental testing", "Grms"],
    desc="Power spectral density for random vibration: units, Grms from a breakpoint profile with dB/octave slopes, 3-sigma peaks, and Miles' equation for single-degree-of-freedom response.",
    blurb="Reading and building random vibration profiles, getting Grms from the area under the PSD, and estimating resonant response with Miles' equation.",
    lead="Random vibration, such as that from engines, road, rail or airflow, has no single frequency. It is described by its power spectral density (PSD): the mean-square acceleration per hertz. Test specifications give a PSD profile as breakpoints joined by straight lines on log–log axes. The overall level, Grms, is the square root of the area under that curve.",
    takeaways=[
        "PSD in g²/Hz is mean-square acceleration per unit bandwidth; it is independent of analyser resolution.",
        "Grms = √(area under the PSD curve). Integrate each sloped segment analytically on log–log axes.",
        "Slopes are given in dB/octave: +3 dB/oct doubles the PSD per octave, +6 dB/oct quadruples it.",
        "For Gaussian random vibration, peaks reach 3σ (= 3 × Grms) about 0.3 % of the time; shakers are usually clipped at 3σ.",
        "Miles' equation estimates an SDOF response: G<sub>rms</sub> ≈ √(π/2 · f<sub>n</sub> · Q · PSD(f<sub>n</sub>)).",
    ],
    body=f'''
<h2 id="psd">1. What a PSD is</h2>
{formula("PSD(f) = lim (Δf→0) [ mean square of x in band Δf ] / Δf          units g²/Hz\nGrms   = √( ∫ PSD(f) df )\nOn log–log axes a straight segment is PSD = P1·(f/f1)^m,   m = log(P2/P1)/log(f2/f1)\nArea of segment = P1·f1/(m+1)·[(f2/f1)^(m+1) − 1]      (m ≠ −1)\n                = P1·f1·ln(f2/f1)                     (m = −1)\nSlope in dB/oct = 10·log10(P2/P1) / log2(f2/f1)")}

<h2 id="profile">2. Example profile</h2>
{fig(psdplot, "Figure 1. Random vibration test profile on log–log axes with sloped and flat segments.")}
{table(["Breakpoint","Frequency (Hz)","PSD (g²/Hz)"],[[str(i+1),str(f),f"{p}"] for i,(f,p) in enumerate(prof)],num_cols=(1,2))}
{table(["Segment","Slope (dB/oct)","Area (g²)"],[[f"{prof[i][0]}–{prof[i+1][0]} Hz",f"{slopes[i]:+.2f}",f"{seg_area(*prof[i],*prof[i+1]):.3f}"] for i in range(len(prof)-1)]+[["Total","",f"<b>{area:.3f}</b>"]],num_cols=(1,2))}
<p><b>Grms = √{area:.3f} = {grms:.2f} g.</b> A shaker running this profile reaches 3σ peaks of about {3*grms:.1f} g.</p>

<h2 id="stats">3. Statistics of random vibration</h2>
{table(["Level","Fraction of time exceeded (Gaussian)"],[["1σ","31.7 %"],["2σ","4.6 %"],["3σ","0.27 %"],["4σ","0.006 %"]],num_cols=(1,))}
<p>Fatigue under random loading is often estimated with the three-band technique: 68 % of cycles at 1σ, 27 % at 2σ and 4 % at 3σ, combined with the S–N curve using Miner's rule.</p>

<h2 id="miles">4. Response of a resonant part: Miles' equation</h2>
{formula("Grms_response ≈ √( (π/2) · fn · Q · PSD_input(fn) )     Q = 1/(2ζ)")}
<p>Valid when the input PSD is roughly flat around f<sub>n</sub> and the system behaves as a single degree of freedom. Example: f<sub>n</sub> = {fnm:.0f} Hz, Q = {Qm:.0f}, input 0.04 g²/Hz → response ≈ <b>{miles:.1f} g RMS</b>, with 3σ peaks near {3*miles:.0f} g.</p>
{box("note","Measurement tips","Use enough averages (typically 50–100 degrees of freedom per line or more) for a smooth PSD; resolution of 1–5 Hz is common for test control. A PSD computed with a different Δf has the same g²/Hz but a different-looking amplitude spectrum.")}
''',
    calcs=[dict(id="psd", title="Grms from a PSD breakpoint table, plus Miles' equation",
                note="Enter breakpoints as frequency:PSD pairs separated by spaces, e.g. 20:0.01 80:0.04 350:0.04 2000:0.007.",
                presets=[dict(label="Example profile", v=dict(tbl="20:0.01 80:0.04 350:0.04 2000:0.007", fn=200, Q=10)),
                         dict(label="Flat 20–2000 Hz, 0.04", v=dict(tbl="20:0.04 2000:0.04", fn=150, Q=15))],
                inputs=[dict(id="tbl", label="Breakpoints f:PSD", value="20:0.01 80:0.04 350:0.04 2000:0.007", text=True), dict(id="fn", label="Part natural frequency fn (Hz)", value=200), dict(id="Q", label="Amplification Q", value=10)],
                js='''var bp=v.tbl.trim().split(/\\s+/).map(function(s){var a=s.split(":");return [parseFloat(a[0]),parseFloat(a[1])];}).filter(function(p){return p[0]>0&&p[1]>0;});
bp.sort(function(a,b){return a[0]-b[0];});var A=0,h='<table><tr><th>Segment</th><th class=num>dB/oct</th><th class=num>Area g²</th></tr>',pts=[];
for(var i=0;i<bp.length-1;i++){var f1=bp[i][0],p1=bp[i][1],f2=bp[i+1][0],p2=bp[i+1][1],m=Math.log(p2/p1)/Math.log(f2/f1);
var a=Math.abs(m+1)<1e-9?p1*f1*Math.log(f2/f1):p1*f1/(m+1)*(Math.pow(f2/f1,m+1)-1);A+=a;h+='<tr><td>'+f1+'–'+f2+' Hz</td><td class=num>'+fmt(10*Math.log10(p2/p1)/Math.log2(f2/f1),2)+'</td><td class=num>'+fmt(a,4)+'</td></tr>';}
var pin=NaN;for(var j=0;j<bp.length-1;j++){if(v.fn>=bp[j][0]&&v.fn<=bp[j+1][0]){var mm=Math.log(bp[j+1][1]/bp[j][1])/Math.log(bp[j+1][0]/bp[j][0]);pin=bp[j][1]*Math.pow(v.fn/bp[j][0],mm);}}
bp.forEach(function(p){pts.push([Math.log10(p[0]),Math.log10(p[1])]);});var g=Math.sqrt(A),mi=Math.sqrt(Math.PI/2*v.fn*v.Q*pin);
return {rows:[["Area",fmt(A,4)+" g²"],["Grms",fmt(g,3)+" g"],["3σ peak",fmt(3*g,2)+" g"],["PSD at fn",isFinite(pin)?fmt(pin,4)+" g²/Hz":"fn outside profile"],["Miles response",isFinite(mi)?fmt(mi,2)+" g RMS":"—",isFinite(mi)?"3σ ≈ "+fmt(3*mi,1)+" g":""]],html:h+'</table>',
svg:plotSVG([{pts:pts,label:"profile"}],{xlabel:"log10 frequency (Hz)",ylabel:"log10 PSD (g²/Hz)",ymin:Math.min.apply(null,pts.map(function(p){return p[1];}))-0.3,ymax:Math.max.apply(null,pts.map(function(p){return p[1];}))+0.3}),caption:"Profile on log–log axes."};''')],
    quiz=[
        dict(q="The units of acceleration PSD are:", o=["g", "g/Hz", "g²/Hz", "g·Hz"], a=2, e="Mean-square per hertz."),
        dict(q="Grms of a flat PSD of 0.01 g²/Hz from 0 to 1,000 Hz is about:", o=["10 g", "3.16 g", "1 g", "0.1 g"], a=1, e="√(0.01 × 1000) = √10 = 3.16 g."),
        dict(q="A slope of +6 dB/octave means the PSD:", o=["Doubles each octave", "Quadruples each octave", "Is constant", "Halves each octave"], a=1, e="10·log10(4) = 6 dB."),
        dict(q="For Gaussian random vibration, the fraction of time above 3σ is about:", o=["32 %", "5 %", "0.3 %", "0 %"], a=2, e="≈ 0.27 %."),
        dict(q="Miles' equation assumes:", o=["Multi-mode response", "SDOF system with roughly flat input PSD near fn", "Sine input", "No damping"], a=1, e="It is an SDOF approximation."),
        dict(q="If Q doubles, the Miles response increases by:", o=["2×", "√2 ×", "4×", "Unchanged"], a=1, e="Response ∝ √Q."),
        dict(q="Flat PSD 0.02 g²/Hz from 20 to 2,000 Hz. Calculate Grms.", num=6.29, unit="g", e="√(0.02 × 1980) = √39.6 = 6.29 g."),
        dict(q="Miles: fn = 100 Hz, Q = 20, PSD = 0.01 g²/Hz. Response Grms?", num=5.60, unit="g", e="√(π/2 × 100 × 20 × 0.01) = √31.4 = 5.60 g."),
    ],
    refs=["MIL-STD-810H, Environmental Engineering Considerations and Laboratory Tests, Method 514.8 Vibration.", "IEC 60068-2-64, Environmental testing — Test Fh: Vibration, broadband random.",
          "Steinberg, D. S., Vibration Analysis for Electronic Equipment, 3rd ed., Wiley, 2000.", "Miles, J. W., 'On structural fatigue under random loading', J. Aeronautical Sciences, 21, 1954.",
          "Bendat, J. S. and Piersol, A. G., Random Data, 4th ed., Wiley, 2010."],
    links=[("Wikipedia — Spectral density", "https://en.wikipedia.org/wiki/Spectral_density")],
))

# =====================================================================================
# 12. ENVELOPE ANALYSIS
# =====================================================================================
fsE = 20000
tE = np.arange(0, 0.06, 1 / fsE)
bpfo = 107.0
sigE = np.zeros_like(tE)
for k in range(10):
    t0 = k / bpfo
    m = tE >= t0
    sigE[m] += np.exp(-(tE[m] - t0) * 900) * np.sin(2 * np.pi * 3000 * (tE[m] - t0))
envE = np.abs(sigE)
step = 1
wave_pts = [(float(a) * 1000, float(b)) for a, b in zip(tE[::step], sigE[::step])]
env_pts = [(float(tE[i]) * 1000, float(envE[max(0, i - 12):i + 12].max())) for i in range(0, len(tE), step)]
waveplot = plot([dict(pts=wave_pts, width=1.5), dict(pts=env_pts, label="envelope", width=3, at=30)], "time (ms)", "acceleration (arbitrary)", xlim=(0, 60), ylim=(-1.1, 1.3), h=300,
                notes=[(3, 1.15, f"impacts every 1/BPFO = {1000/bpfo:.2f} ms ringing a 3 kHz resonance")])

ARTICLES.append(dict(
    slug="envelope-analysis-bearing-faults", group="vibration",
    title="Envelope Analysis for Rolling Bearing Faults",
    short="Envelope analysis",
    tags=["Envelope", "Demodulation", "Bearings", "Condition monitoring"],
    desc="How envelope (demodulation) analysis finds early bearing defects: impacts exciting resonances, band-pass filtering, Hilbert envelope, envelope spectrum, band selection and kurtosis.",
    blurb="Why bearing impacts hide in ordinary spectra and how band-pass filtering plus demodulation reveals them at the defect frequencies.",
    lead="An early bearing defect produces tiny impacts that hardly change the overall vibration level. Each impact rings a high-frequency resonance of the bearing and housing, and the ringing repeats at the defect frequency. Envelope analysis isolates that resonance band, extracts the repetition rate, and shows the defect frequency clearly, often months before the fault is visible in a normal spectrum.",
    takeaways=[
        "Impacts excite structural resonances (typically 1–20 kHz); the defect frequency appears as the repetition rate of the ringing.",
        "Steps: band-pass around a resonance → rectify or Hilbert transform → low-pass → FFT of the envelope.",
        "Choose the band where impacts dominate: spectral kurtosis or a kurtogram finds it objectively.",
        "Look for BPFO, BPFI (with shaft-speed sidebands), 2×BSF (with FTF sidebands) and their harmonics in the envelope spectrum.",
        "Commercial variants include spike energy (gSE), PeakVue, HFD and shock pulse methods; the principle is the same.",
    ],
    body=f'''
<h2 id="why">1. Why ordinary spectra miss early defects</h2>
<p>A small spall generates impacts with little energy at the defect frequency itself. Most of their energy appears as bursts of ringing at a resonance, smeared across many spectral lines and buried under gear mesh, unbalance and noise. Demodulation recovers the timing of the bursts.</p>
{fig(waveplot, f"Figure 1. Synthetic outer-race signal: impacts every 1/BPFO ({1000/bpfo:.2f} ms) ring a 3 kHz resonance. The envelope (thick line) repeats at BPFO = {bpfo:.0f} Hz.")}

<h2 id="method">2. The method</h2>
{fig(flow(["Raw acceleration|high Fs","Band-pass filter|around resonance","Hilbert envelope|magnitude of analytic signal","Low-pass + decimate","FFT of envelope|0–10× BPFI","Match peaks|BPFO, BPFI, BSF"], h=130), "Figure 2. Envelope analysis chain.")}
{table(["Setting","Guidance"],[
["Sample rate","At least 2.56 × upper band edge (e.g. 51.2 kHz for a 20 kHz band)"],
["Band-pass","Centred on an excited resonance; width ≥ 2 × (highest defect frequency + sidebands), typically 1–5 kHz wide"],
["Envelope spectrum Fmax","Cover at least 3–4 harmonics of BPFI plus sidebands (often 10–20 × shaft speed)"],
["Resolution","Fine enough to separate shaft-speed sidebands: Δf ≤ shaft speed / 10"],
["Averages","4–8; use the same speed and load each time for trending"],
])}

<h2 id="reading">3. Reading the envelope spectrum</h2>
{table(["Pattern","Likely fault"],[
["BPFO and harmonics, no sidebands","Outer race defect (stationary in load zone)"],
["BPFI and harmonics with ±1× shaft speed sidebands","Inner race defect (rotating with shaft)"],
["2×BSF with ±FTF sidebands","Rolling element defect"],
["FTF and harmonics","Cage problem"],
["1× shaft speed and harmonics only","Rubbing, looseness, or no bearing fault"],
["Raised envelope noise floor, no clear lines","Lubrication problem, generalised roughness"],
])}

<h2 id="band">4. Choosing the band: kurtosis and kurtogram</h2>
<p>Impulsive signals have high kurtosis (about 3 for Gaussian noise, much higher with impacts). Spectral kurtosis computes kurtosis in many frequency bands; the kurtogram plots it against centre frequency and bandwidth and the maximum suggests the best demodulation band.</p>
{box("note","Practical tips","Mount the accelerometer stiffly (stud or adhesive) close to the load zone: a magnet base can cut response above a few kHz. Keep the same sensor, mounting and settings for trend comparisons. Confirm by checking that peaks move with shaft speed in the expected ratio.")}
''',
    calcs=[dict(id="env", title="Envelope analysis set-up helper",
                presets=[dict(label="6208 at 3000 rpm", v=dict(n=3000, Z=9, Dw=11.906, Dpw=60, a=0, fres=3000)), dict(label="Fast bearing, 20,000 rpm", v=dict(n=20000, Z=17, Dw=7.144, Dpw=60, a=15, fres=12000))],
                inputs=[dict(id="n", label="Shaft speed (rpm)", value=3000), dict(id="Z", label="Rolling elements Z", value=9), dict(id="Dw", label="Ball diameter (mm)", value=11.906),
                        dict(id="Dpw", label="Pitch diameter (mm)", value=60), dict(id="a", label="Contact angle (°)", value=0), dict(id="fres", label="Resonance centre (Hz)", value=3000)],
                js='''var fr=v.n/60,r=v.Dw/v.Dpw*Math.cos(v.a*Math.PI/180),o=v.Z/2*fr*(1-r),i=v.Z/2*fr*(1+r),b=v.Dpw/(2*v.Dw)*fr*(1-r*r),c=fr/2*(1-r);
var bw=Math.max(2*(4*i+2*fr),500),lo=Math.max(v.fres-bw/2,0),hi=v.fres+bw/2,fmax=Math.ceil((4*i+2*fr)/100)*100,df=fr/10;
return {rows:[["BPFO / BPFI",fmt(o,1)+" / "+fmt(i,1)+" Hz"],["2×BSF / FTF",fmt(2*b,1)+" / "+fmt(c,2)+" Hz"],["Suggested band-pass",fmt(lo,0)+" – "+fmt(hi,0)+" Hz","width ≥ 2 × (4·BPFI + sidebands)"],
["Sample rate ≥",fmt(2.56*hi,0)+" Hz"],["Envelope spectrum Fmax",fmt(fmax,0)+" Hz"],["Envelope resolution ≤",fmt(df,2)+" Hz","lines ≈ "+fmt(fmax/df,0)]]};''')],
    quiz=[
        dict(q="Envelope analysis works because bearing impacts:", o=["Occur at 1× speed", "Excite high-frequency resonances repeatedly at the defect rate", "Are purely low frequency", "Change the shaft speed"], a=1, e="The ringing bursts repeat at the defect frequency."),
        dict(q="The first processing step is usually:", o=["FFT", "Band-pass filtering around a resonance", "Integration to velocity", "Averaging"], a=1, e="Isolate the band where impacts dominate."),
        dict(q="An inner race defect typically shows BPFI with sidebands at:", o=["FTF", "1× shaft speed", "2× line frequency", "None"], a=1, e="The defect rotates through the load zone once per revolution."),
        dict(q="Kurtosis of Gaussian noise is about:", o=["0", "1", "3", "10"], a=2, e="Impulsive signals have kurtosis well above 3."),
        dict(q="A magnetic sensor mount mainly limits:", o=["Low-frequency response", "High-frequency response", "Temperature range", "Phase accuracy"], a=1, e="The mounted resonance drops, cutting high frequencies."),
        dict(q="Rolling element defects appear in the envelope at:", o=["BSF exactly", "2 × BSF with FTF sidebands", "BPFO", "Shaft speed"], a=1, e="A ball defect hits both races each spin cycle."),
        dict(q="BPFO is 180 Hz. What impact interval (ms) do you expect?", num=5.556, unit="ms", e="1/180 s = 5.56 ms."),
        dict(q="Band-pass upper edge 12 kHz. Minimum sample rate (Hz) using 2.56×?", num=30720, unit="Hz", e="2.56 × 12,000 = 30,720 Hz."),
    ],
    refs=["Randall, R. B. and Antoni, J., 'Rolling element bearing diagnostics — A tutorial', Mechanical Systems and Signal Processing, 25(2), 2011.",
          "Antoni, J., 'Fast computation of the kurtogram for the detection of transient faults', MSSP, 21(1), 2007.", "McFadden, P. D. and Smith, J. D., 'Vibration monitoring of rolling element bearings by the high-frequency resonance technique — a review', Tribology International, 17(1), 1984.",
          "ISO 13373-3, Condition monitoring and diagnostics of machines — Vibration condition monitoring — Part 3: Guidelines for vibration diagnosis."],
    links=[("Wikipedia — Envelope detector", "https://en.wikipedia.org/wiki/Envelope_detector")],
))

# =====================================================================================
# 13. PHASE ANALYSIS
# =====================================================================================
rr = np.linspace(0.05, 3, 300)
amp_curves, ph_curves = [], []
for z, lab in [(0.05, "ζ = 0.05"), (0.1, "ζ = 0.1"), (0.3, "ζ = 0.3")]:
    H = 1 / np.sqrt((1 - rr ** 2) ** 2 + (2 * z * rr) ** 2)
    P = np.degrees(np.arctan2(2 * z * rr, 1 - rr ** 2))
    amp_curves.append(dict(pts=list(zip(rr.tolist(), H.tolist())), label=lab, at=1.0 if z == 0.05 else (1.4 if z == 0.1 else 2.0)))
    ph_curves.append(dict(pts=list(zip(rr.tolist(), P.tolist())), label=lab, at=0.6 if z == 0.05 else (1.2 if z == 0.1 else 2.2)))
ampplot = plot(amp_curves, "frequency ratio r = f / fn", "amplification", xlim=(0, 3), ylim=(0, 11), h=300)
phplot = plot(ph_curves, "frequency ratio r = f / fn", "phase lag (°)", xlim=(0, 3), ylim=(0, 180), h=300)

ARTICLES.append(dict(
    slug="phase-analysis-vibration-diagnostics", group="vibration",
    title="Phase Analysis in Vibration Diagnostics: Triaxial Sensors, Cross-Phase and Resonance",
    short="Phase analysis",
    tags=["Phase", "Diagnostics", "Resonance", "Triaxial accelerometers"],
    desc="Using vibration phase to tell unbalance, misalignment, bent shafts, looseness and resonance apart; triaxial sensor arrays, cross-channel phase, Bode plots and operating deflection shapes.",
    blurb="How the phase relationship between sensors and directions separates faults that look identical in an amplitude spectrum.",
    lead="Unbalance, misalignment, a bent shaft and resonance can all produce a large 1× peak. Amplitude alone cannot tell them apart; phase can. By comparing the timing of vibration at different points and directions, measured relative to a tachometer or between sensors, the pattern of motion becomes visible and the root cause usually follows.",
    takeaways=[
        "Absolute phase is measured against a once-per-revolution reference; relative (cross) phase between two sensors needs no tachometer.",
        "Unbalance: radial horizontal and vertical about 90° apart; phase steady; similar across the coupling.",
        "Misalignment: about 180° phase difference across the coupling, axially and often radially.",
        "Resonance: phase shifts by 90° at the natural frequency and nearly 180° through it; amplitude peaks there.",
        "Triaxial sensor arrays let you build operating deflection shapes (ODS) showing how the whole machine moves.",
    ],
    body=f'''
<h2 id="basics">1. Measuring phase</h2>
{formula("Absolute phase: angle between the tachometer pulse and the vibration peak at 1× (filtered)\nCross phase:    φ = arg(G_xy) from the cross-spectrum of two channels at the frequency of interest\nTime delay:     φ = 360° · f · Δt")}
<p>Keep sensor orientation and sign convention consistent: a triaxial accelerometer reversed on one bearing adds 180° and can fake a misalignment pattern. Record which direction each axis points (e.g. X horizontal towards the motor, Y vertical up, Z axial).</p>

<h2 id="patterns">2. Diagnostic phase patterns</h2>
{table(["Fault","Radial phase H vs V (same bearing)","Across coupling / rotor","Axial phase"],[
["Static unbalance","≈ 90° (±30°)","In phase (≈ 0°) across the rotor","Low amplitude"],
["Couple unbalance","≈ 90°","≈ 180° end to end","Low"],
["Angular misalignment","—","—","≈ 180° across the coupling"],
["Parallel misalignment","≈ 0° or 180° (straight-line motion)","≈ 180° radially across coupling","Varies"],
["Bent shaft","—","—","≈ 180° end to end of the rotor"],
["Mechanical looseness / soft foot","Erratic, unsteady","Large differences between foot and frame","—"],
["Eccentric pulley / rotor","0° or 180° (directional)","—","—"],
])}

<h2 id="resonance">3. Resonance and the Bode plot</h2>
{fig(ampplot, "Figure 1. Single-degree-of-freedom amplification against frequency ratio for three damping ratios.")}
{fig(phplot, "Figure 2. Phase lag against frequency ratio: 90° at resonance whatever the damping, approaching 180° above it.")}
<p>During a run-up or coast-down, plotting 1× amplitude and phase against speed (Bode plot) or as a polar (Nyquist) plot identifies critical speeds: amplitude peaks and phase passes through 90°. A machine running near resonance shows high 1× vibration that balancing alone cannot fix: change stiffness or mass, or move the speed.</p>

<h2 id="ods">4. Triaxial arrays and operating deflection shapes</h2>
<ul><li>Place triaxial sensors at each bearing housing, the machine feet and the base frame.</li>
<li>Measure all points simultaneously, or move one sensor while keeping a fixed reference, and compute the cross-phase of each point to the reference at the frequency of interest.</li>
<li>Animate amplitude and phase on a wire-frame model: the ODS. Rocking of the frame, a soft foot, or a twisting base become obvious.</li>
<li>Use the same frequency line (e.g. exactly 1×) for all points, ideally with order tracking.</li></ul>
''',
    calcs=[dict(id="sdof", title="SDOF amplification and phase; time delay to phase",
                presets=[dict(label="Near resonance", v=dict(f=48, fn=50, z=0.05, fa=50, dt=5)), dict(label="Well above resonance", v=dict(f=150, fn=50, z=0.1, fa=150, dt=1))],
                inputs=[dict(id="f", label="Excitation frequency (Hz)", value=48), dict(id="fn", label="Natural frequency (Hz)", value=50), dict(id="z", label="Damping ratio ζ", value=0.05),
                        dict(id="fa", label="Frequency for time-delay phase (Hz)", value=50), dict(id="dt", label="Time delay between channels (ms)", value=5)],
                js='''var r=v.f/v.fn,H=1/Math.sqrt(Math.pow(1-r*r,2)+Math.pow(2*v.z*r,2)),P=Math.atan2(2*v.z*r,1-r*r)*180/Math.PI,ph=(360*v.fa*v.dt/1000)%360;
var pts=[],pp=[];for(var x=0.05;x<=3;x+=0.02){pts.push([x,1/Math.sqrt(Math.pow(1-x*x,2)+Math.pow(2*v.z*x,2))]);}
return {rows:[["Frequency ratio r",fmt(r,3)],["Amplification",fmt(H,2)],["Phase lag",fmt(P,1)+"°"],["Q ≈ 1/(2ζ)",fmt(1/(2*v.z),1)],["Phase from time delay",fmt(ph,1)+"°"]],
verdict:Math.abs(r-1)<0.15?["bad","Within ±15 % of resonance: large amplification and phase near 90°."]:["ok","Clear of resonance by more than 15 %."],
svg:plotSVG([{pts:pts,label:"amplification"}],{xlabel:"r = f/fn",ylabel:"amplification",xmin:0,xmax:3,ymin:0,marks:[[r,H,"operating point"]]}),caption:"SDOF amplification curve for this damping."};''')],
    quiz=[
        dict(q="Phase is especially useful because:", o=["It measures amplitude better", "It separates faults that give the same 1× amplitude", "It replaces the FFT", "It needs no sensors"], a=1, e="Motion patterns differ even when amplitudes are equal."),
        dict(q="Pure unbalance typically shows horizontal and vertical phase about:", o=["0° apart", "90° apart", "180° apart", "Random"], a=1, e="Circular/elliptical orbit → ~90°."),
        dict(q="About 180° axial phase difference across a coupling suggests:", o=["Unbalance", "Misalignment", "Looseness", "Electrical fault"], a=1, e="Classic misalignment indicator."),
        dict(q="At resonance the phase lag of an SDOF system is:", o=["0°", "45°", "90°", "180°"], a=2, e="90° regardless of damping."),
        dict(q="A Bode plot shows:", o=["Amplitude and phase versus speed", "Spectrum versus time", "Orbit", "Trend"], a=0, e="Used in run-up/coast-down."),
        dict(q="Reversing a sensor's mounting direction changes phase by:", o=["0°", "90°", "180°", "360°"], a=2, e="Sign reversal = 180°."),
        dict(q="Two channels at 50 Hz differ by 2.5 ms. Phase difference in degrees?", num=45, unit="°", e="360 × 50 × 0.0025 = 45°."),
        dict(q="ζ = 0.05. What is Q?", num=10, e="Q = 1/(2ζ) = 10."),
    ],
    refs=["ISO 13373-2/-3, Condition monitoring and diagnostics of machines — Vibration condition monitoring.", "Bently, D. E. and Hatch, C. T., Fundamentals of Rotating Machinery Diagnostics, Bently Pressurized Bearing Press, 2002.",
          "Richardson, M. H., 'Is it a mode shape, or an operating deflection shape?', Sound and Vibration, 1997.", "Thomson, W. T., Theory of Vibration with Applications, Prentice Hall."],
    links=[("Wikipedia — Operating deflection shape", "https://en.wikipedia.org/wiki/Operational_deflection_shape"), ("Wikipedia — Bode plot", "https://en.wikipedia.org/wiki/Bode_plot")],
))

# =====================================================================================
# 14. CONDITION-MONITORING DATA HANDLING
# =====================================================================================
fsd, ch, byt, hrs = 25600.0, 16, 4, 1000.0
gbh = fsd * ch * byt * 3600 / 1e9
total_tb = gbh * hrs / 1000
feat_per_s, nfeat = 2, 12
feat_gb = ch * nfeat * feat_per_s * 4 * 3600 * hrs / 1e9
rng = np.random.default_rng(3)
hours = np.arange(0, 1000, 5)
trend = 1.0 + 0.0003 * hours + 0.04 * rng.standard_normal(len(hours))
trend[hours > 820] += (hours[hours > 820] - 820) * 0.006
trendplot = plot([dict(pts=list(zip(hours.tolist(), trend.tolist())), label="band RMS trend", at=400, width=2.5),
                  dict(pts=[(0, 1.6), (1000, 1.6)], label="alert (baseline × 1.6)", at=120, width=2),
                  dict(pts=[(0, 2.5), (1000, 2.5)], label="alarm (baseline × 2.5)", at=120, width=2)],
                 "running hours", "vibration (g RMS)", xlim=(0, 1000), ylim=(0, 3), h=320)

ARTICLES.append(dict(
    slug="condition-monitoring-data-handling", group="vibration",
    title="Handling Long-Duration Test Data: Volumes, Reduction, Storage and Trending",
    short="CM data handling",
    tags=["Data acquisition", "Condition monitoring", "Data management", "Trending"],
    desc="Planning data for long endurance tests: raw data volumes at high sample rates, feature extraction and burst capture, file formats and naming, metadata, alert and alarm thresholds.",
    blurb="How much data a long, fast-sampled test produces, and how to reduce, store, name and trend it so it stays useful.",
    lead="A thousand-hour endurance test with vibration sampled at tens of kilohertz on many channels produces terabytes of raw data. Keeping everything is expensive and nobody looks at it; keeping too little loses the evidence when something fails. A good plan keeps compact features continuously, raw bursts periodically, and full raw data around events.",
    takeaways=[
        "Raw volume = sample rate × channels × bytes per sample × time: 25.6 kS/s × 16 channels × 4 bytes ≈ 5.9 GB per hour.",
        "Store features (RMS, peak, crest factor, kurtosis, band RMS, order amplitudes) every 0.5–1 s: thousands of times smaller.",
        "Add periodic raw bursts (e.g. 10 s every 10–30 min) and event-triggered raw capture with pre-trigger.",
        "Use self-describing binary or columnar formats, consistent file naming, synchronised clocks and metadata with every file.",
        "Set alert and alarm thresholds from each channel's own baseline statistics, and watch the trend slope, not only the level.",
    ],
    body=f'''
<h2 id="volume">1. How much data?</h2>
{formula("Raw rate [bytes/s] = Fs × channels × bytes_per_sample\nPer hour [GB] = rate × 3600 / 10⁹")}
{table(["Case","Value"],[["Fs, channels, bytes",f"{fsd:,.0f} S/s, {ch}, {byt} (float32)"],["Raw per hour",f"<b>{gbh:.2f} GB</b>"],[f"Raw for {hrs:,.0f} h test",f"<b>{total_tb:.2f} TB</b>"],
[f"Features: {nfeat} per channel, {feat_per_s} per second",f"{feat_gb:.2f} GB for the whole test"],["Reduction factor",f"≈ {total_tb*1000/feat_gb:,.0f} : 1"]],num_cols=(1,))}

<h2 id="reduction">2. Reduction strategy</h2>
{table(["Layer","Content","Typical rate","Purpose"],[
["Process data","Temperatures, pressures, flows, speed, torque, power","1–10 Hz","Operating condition, limits"],
["Vibration features","Overall RMS, peak, crest factor, kurtosis, band RMS, 1×/2× amplitude and phase, gear mesh, bearing bands","0.5–2 per s","Continuous trending and alarms"],
["Raw bursts","Full-rate waveform, all channels","10 s every 10–30 min","Spectra, envelope and re-analysis later"],
["Event capture","Full-rate waveform around a trigger (alarm, trip, speed change)","Pre- and post-trigger","Root cause of incidents"],
["Daily summary","Statistics per channel per shift/day","1 per day","Reports"],
])}

<h2 id="storage">3. Formats, naming and metadata</h2>
<ul><li>Use binary formats with embedded metadata (e.g. TDMS, HDF5, vendor formats) for raw data; columnar formats (Parquet) or a database (SQLite, PostgreSQL) for features.</li>
<li>Name files with test, rig, date-time in ISO 8601 and type: <code>TEST01_RIGA_20261124T0830_raw.h5</code>.</li>
<li>Store with every file: sample rate, channel names, sensor serials and sensitivities, units, orientation, speed reference, software version.</li>
<li>Synchronise clocks (NTP or PTP) across acquisition systems so process and vibration data align.</li>
<li>Keep two copies on different media; checksum on transfer; write once, never edit raw files.</li></ul>

<h2 id="trending">4. Trending and thresholds</h2>
{fig(trendplot, "Figure 1. Synthetic band-RMS trend over a 1,000-hour test with alert and alarm thresholds set from the baseline. The rise after about 820 h is the early warning.")}
{table(["Method","Rule"],[
["Ratio to baseline","Alert at 1.5–2 × baseline, alarm at 2.5–4 ×"],
["Statistical","Alert at mean + 3σ of the baseline period; alarm at mean + 6σ"],
["Absolute","ISO 20816 zone boundaries or manufacturer limits"],
["Rate of change","Alarm on slope, e.g. more than 20 % rise in 24 h"],
])}
{box("key","Practical rule","Decide before the test what will be kept, at what rate, with which thresholds, and who looks at it each day. Data nobody reviews provides no protection.")}
''',
    calcs=[dict(id="vol", title="Test data volume estimator",
                presets=[dict(label="25.6 kS/s, 16 ch, 1000 h", v=dict(fs=25600, ch=16, b=4, h=1000, nf=12, fr=2, bl=10, bi=15))],
                inputs=[dict(id="fs", label="Sample rate (S/s)", value=25600), dict(id="ch", label="Channels", value=16), dict(id="b", label="Bytes per sample", value=4),
                        dict(id="h", label="Test hours", value=1000), dict(id="nf", label="Features per channel", value=12), dict(id="fr", label="Feature rate (per s)", value=2),
                        dict(id="bl", label="Raw burst length (s)", value=10), dict(id="bi", label="Burst interval (min)", value=15)],
                js='''var raw=v.fs*v.ch*v.b,ph=raw*3600/1e9,tot=ph*v.h,feat=v.ch*v.nf*v.fr*4*3600*v.h/1e9,burst=raw*v.bl*(60/v.bi)*v.h/1e9;
return {rows:[["Raw rate",fmt(raw/1e6,2)+" MB/s"],["Raw per hour",fmt(ph,2)+" GB"],["Raw, whole test",fmt(tot/1000,2)+" TB"],["Features, whole test",fmt(feat,2)+" GB"],["Bursts, whole test",fmt(burst,1)+" GB"],["Reduced total",fmt(feat+burst,1)+" GB","≈ "+fmt(tot/(feat+burst),0)+" : 1 reduction"]]};''')],
    quiz=[
        dict(q="Raw data rate depends on:", o=["Channels only", "Sample rate × channels × bytes per sample", "Number of features", "File format only"], a=1, e="Multiply all three."),
        dict(q="Which is best for continuous trending?", o=["Full raw data", "Compact features every 0.5–1 s", "One file per day", "Screenshots"], a=1, e="Features are small and directly trendable."),
        dict(q="Event-triggered capture should include:", o=["Only post-trigger data", "Pre-trigger data", "Only features", "Nothing"], a=1, e="Pre-trigger shows what led up to the event."),
        dict(q="A good file name includes:", o=["Random number", "Test, rig, ISO date-time and data type", "Operator's initials only", "Nothing"], a=1, e="Makes data sortable and traceable."),
        dict(q="A statistical alert threshold might be:", o=["Baseline mean + 3σ", "Zero", "Twice the sensor range", "Last value"], a=0, e="Based on baseline variation."),
        dict(q="Why synchronise clocks between systems?", o=["Lower cost", "To align process and vibration data in time", "To compress files", "Not needed"], a=1, e="Correlation needs common time."),
        dict(q="Raw GB per hour for 10,240 S/s, 8 channels, 4 bytes?", num=1.180, unit="GB", e="10240 × 8 × 4 × 3600 / 1e9 = 1.18 GB."),
        dict(q="12 features × 16 channels × 2 per s × 4 bytes for 1 hour, in MB?", num=5.53, unit="MB", e="1536 B/s × 3600 = 5.53 MB."),
    ],
    refs=["ISO 13374-1/-2, Condition monitoring and diagnostics of machines — Data processing, communication and presentation.", "ISO 17359, Condition monitoring and diagnostics of machines — General guidelines.",
          "ISO 13379-1, Data interpretation and diagnostics techniques.", "The HDF Group, HDF5 documentation.", "Apache Parquet documentation."],
    links=[("Wikipedia — Condition monitoring", "https://en.wikipedia.org/wiki/Condition_monitoring"), ("Wikipedia — ISO 8601", "https://en.wikipedia.org/wiki/ISO_8601")],
))
