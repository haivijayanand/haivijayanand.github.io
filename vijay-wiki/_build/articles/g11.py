"""
TOOL:    Vijay_Wiki articles — batch 2 group B (reliability and test engineering)
FAMILY:  vijay-wiki
VERSION: 1.0.0
DATE:    2026-11-24
CHAT:    claude.ai — Vijay_Wiki: next batch of topics (36 articles)
CHANGES: 1.0.0 Weibull, measurement uncertainty, calibration, FMEA/RCA, maintenance strategy, oil analysis
"""
import math
import numpy as np
from wiki import plot, flow, bars, fig, table, box, formula

ARTICLES = []

# ---------------------------------------------------------------- 54 WEIBULL
times = [410, 620, 780, 905, 1040, 1210, 1390, 1650]
n = len(times)
F = [(i + 1 - 0.3) / (n + 0.4) for i in range(n)]
X = np.log(times); Y = np.log(-np.log(1 - np.array(F)))
beta, c0 = np.polyfit(X, Y, 1)
eta = math.exp(-c0 / beta)
B10 = eta * (-math.log(0.9)) ** (1 / beta)
MTTF = eta * math.gamma(1 + 1 / beta)
R2 = np.corrcoef(X, Y)[0, 1] ** 2
wplot = plot([dict(pts=list(zip(X.tolist(), Y.tolist())), label=None, width=0.1),
              dict(pts=[(float(x), float(beta * x + c0)) for x in np.linspace(5.8, 7.6, 20)], label=f"fit: β = {beta:.2f}, η = {eta:.0f} h", at=6.2)],
             "ln(time)", "ln(−ln(1 − F))", xlim=(5.8, 7.6), ylim=(-3, 1.5), h=300, points=[(float(x), float(y), "") for x, y in zip(X, Y)])
ARTICLES.append(dict(
    slug="weibull-analysis", group="reliability",
    title="Weibull Analysis of Failure Data: Shape, Scale, B10 Life and Probability Plots",
    short="Weibull analysis", tags=["Weibull", "Reliability", "Life data", "Statistics"],
    desc="Life data analysis with the two-parameter Weibull distribution: meaning of shape β and scale η, median ranks, rank-regression fitting, B10 life, MTTF, and interpretation of infant mortality, random and wear-out failures.",
    blurb="Fitting failure times to a Weibull distribution and reading β, η, B10 life and MTTF from the result.",
    lead="Failure times from tests or the field rarely follow a normal distribution. The Weibull distribution is flexible enough to describe early failures, random failures and wear-out with a single shape parameter, and it plots as a straight line on special axes. A handful of failures is often enough to estimate life and decide whether failures are design, quality or wear related.",
    takeaways=[
        "F(t) = 1 − exp[−(t/η)^β]; η is the characteristic life (63.2 % failed), β the shape.",
        "β &lt; 1 infant mortality (quality, assembly), β ≈ 1 random (constant rate), β &gt; 1 wear-out; bearings ≈ 1.1–1.5, fatigue 2–4.",
        "Median ranks (Bernard): F ≈ (i − 0.3)/(n + 0.4) for the i-th of n failures in order.",
        "Plot ln t against ln[−ln(1 − F)]: slope = β; η from the intercept.",
        "B10 = η·(−ln 0.9)^(1/β); MTTF = η·Γ(1 + 1/β).",
    ],
    body=f'''
<h2 id="model">1. The model</h2>
{formula("F(t) = 1 − exp[−(t/η)^β]       R(t) = 1 − F(t)\nHazard h(t) = (β/η)·(t/η)^(β−1)\nBx life = η·[−ln(1 − x)]^(1/β)       MTTF = η·Γ(1 + 1/β)\nLinearised: ln[−ln(1 − F)] = β·ln t − β·ln η")}
{table(["β","Failure pattern","Typical causes","Action"],[["&lt; 1","Decreasing rate (infant mortality)","Manufacturing defects, assembly, burn-in","Improve quality control, run-in"],["≈ 1","Constant rate","Random overloads, mixed causes","Preventive replacement does not help"],["1–4","Increasing rate (wear-out)","Fatigue, wear, corrosion","Scheduled replacement can pay"],["&gt; 4","Rapid wear-out","Old age, consistent wear","Replace before the knee"]])}
<h2 id="fit">2. Fitting by median ranks</h2>
<p>Sort failure times, assign median ranks, transform and fit a straight line (rank regression on Y). With suspensions (units still running), use adjusted ranks (Johnson's method) or maximum likelihood. Small samples give wide confidence bounds.</p>
<h2 id="example">3. Worked example</h2>
<p>Failure times (h): {", ".join(str(t) for t in times)}.</p>
{fig(wplot, "Figure 1. Weibull probability plot (linearised axes) with rank-regression fit.")}
{table(["Result","Value"],[["Shape β",f"<b>{beta:.2f}</b> (wear-out)"],["Scale η",f"<b>{eta:.0f} h</b>"],["B10 life",f"{B10:.0f} h"],["MTTF",f"{MTTF:.0f} h"],["R² of fit",f"{R2:.3f}"]],num_cols=(1,))}
''',
    calcs=[dict(id="wb", title="Weibull fit by median-rank regression",
                note="Enter failure times (complete data, no suspensions) separated by spaces or commas.",
                presets=[dict(label="Worked example", v=dict(t="410 620 780 905 1040 1210 1390 1650", x=10)), dict(label="Early failures", v=dict(t="12 30 55 120 260 510 900", x=10))],
                inputs=[dict(id="t", label="Failure times", value="410 620 780 905 1040 1210 1390 1650", text=True), dict(id="x", label="Bx life percentage", value=10)],
                js='''var t=v.t.split(/[\\s,;]+/).map(parseFloat).filter(function(a){return a>0;}).sort(function(a,b){return a-b;}),n=t.length;if(n<3)return {rows:[],verdict:["bad","Enter at least three failure times."]};
var X=[],Y=[];for(var i=0;i<n;i++){var F=(i+1-0.3)/(n+0.4);X.push(Math.log(t[i]));Y.push(Math.log(-Math.log(1-F)));}
var mx=X.reduce(function(a,b){return a+b;})/n,my=Y.reduce(function(a,b){return a+b;})/n,sxy=0,sxx=0,syy=0;for(i=0;i<n;i++){sxy+=(X[i]-mx)*(Y[i]-my);sxx+=(X[i]-mx)*(X[i]-mx);syy+=(Y[i]-my)*(Y[i]-my);}
var b=sxy/sxx,c=my-b*mx,eta=Math.exp(-c/b),r2=sxy*sxy/(sxx*syy);function gam(z){var g=7,p=[0.99999999999980993,676.5203681218851,-1259.1392167224028,771.32342877765313,-176.61502916214059,12.507343278686905,-0.13857109526572012,9.9843695780195716e-6,1.5056327351493116e-7];if(z<0.5)return Math.PI/(Math.sin(Math.PI*z)*gam(1-z));z-=1;var a=p[0],tt=z+g+0.5;for(var k=1;k<9;k++)a+=p[k]/(z+k);return Math.sqrt(2*Math.PI)*Math.pow(tt,z+0.5)*Math.exp(-tt)*a;}
var Bx=eta*Math.pow(-Math.log(1-v.x/100),1/b),mttf=eta*gam(1+1/b),pts=[];for(i=0;i<n;i++)pts.push([X[i],Y[i]]);var ln=[[X[0],b*X[0]+c],[X[n-1],b*X[n-1]+c]];
return {rows:[["Shape β",fmt(b,3),b<0.95?"infant mortality":(b<1.1?"random":"wear-out")],["Scale η",fmt(eta,1)],["B"+v.x+" life",fmt(Bx,1)],["MTTF",fmt(mttf,1)],["R²",fmt(r2,4)],["n",n]],
svg:plotSVG([{pts:ln,label:"fit"},{pts:pts,label:"data"}],{xlabel:"ln t",ylabel:"ln(−ln(1−F))"}),caption:"Linearised Weibull plot: data and fitted line."};''')],
    quiz=[
        dict(q="η in the Weibull distribution is the time by which:", o=["10 % have failed", "50 % have failed", "63.2 % have failed", "All have failed"], a=2, e="F(η) = 1 − e⁻¹."),
        dict(q="β < 1 indicates:", o=["Wear-out", "Infant mortality", "Random failures", "No failures"], a=1, e="Decreasing hazard."),
        dict(q="For β = 1 the Weibull becomes:", o=["Normal", "Exponential", "Lognormal", "Uniform"], a=1, e="Constant hazard."),
        dict(q="Preventive replacement makes sense when:", o=["β < 1", "β = 1", "β > 1", "Never"], a=2, e="Only with increasing hazard."),
        dict(q="Bernard's median rank for i = 1, n = 10:", o=["0.1", "0.067", "0.5", "0.01"], a=1, e="(1 − 0.3)/(10.4) = 0.067."),
        dict(q="On the linearised Weibull plot the slope equals:", o=["η", "β", "MTTF", "R²"], a=1, e="Slope = β."),
        dict(q="η = 1000 h, β = 2. B10 life (h)?", num=324.6, unit="h", e="1000 × (0.10536)^0.5 = 324.6 h."),
        dict(q="η = 500 h, β = 1. MTTF (h)?", num=500, unit="h", e="Γ(2) = 1."),
    ],
    refs=["Abernethy, R. B., The New Weibull Handbook, 5th ed., 2006.", "IEC 61649:2008, Weibull analysis.", "Nelson, W., Applied Life Data Analysis, Wiley, 1982.", "O'Connor, P. D. T. and Kleyner, A., Practical Reliability Engineering, 5th ed., Wiley, 2012."],
    links=[("Wikipedia — Weibull distribution", "https://en.wikipedia.org/wiki/Weibull_distribution")],
))

# ---------------------------------------------------------------- 55 MEASUREMENT UNCERTAINTY
comps = [("Repeatability (Type A, 10 readings, s = 0.012 bar)", 0.012 / math.sqrt(10)), ("Transmitter accuracy ±0.025 bar (rectangular)", 0.025 / math.sqrt(3)),
         ("Calibration certificate U = 0.010 bar (k = 2)", 0.010 / 2), ("Resolution 0.001 bar (rectangular, half-interval)", 0.0005 / math.sqrt(3)), ("Temperature effect ±0.008 bar (rectangular)", 0.008 / math.sqrt(3))]
uc = math.sqrt(sum(u * u for _, u in comps))
U = 2 * uc
ARTICLES.append(dict(
    slug="measurement-uncertainty-gum", group="reliability",
    title="Measurement Uncertainty: Building an Uncertainty Budget (GUM Method)",
    short="Measurement uncertainty", tags=["Uncertainty", "GUM", "Metrology", "Calibration"],
    desc="Evaluating and reporting measurement uncertainty: Type A and Type B components, distributions and divisors, sensitivity coefficients, combined and expanded uncertainty, coverage factor and an uncertainty budget calculator.",
    blurb="Turning repeatability, specifications and calibration certificates into one expanded uncertainty with an uncertainty budget.",
    lead="Every measurement has doubt. The Guide to the Expression of Uncertainty in Measurement (GUM) gives a standard way to quantify it: list every source, convert each to a standard uncertainty, multiply by how strongly it affects the result, combine by root-sum-of-squares, and expand to about 95 % confidence. The result lets you decide whether a reading meets a limit and compare labs fairly.",
    takeaways=[
        "Type A: from repeated readings, u = s/√n. Type B: from specifications, certificates, resolution, experience.",
        "Divisors: rectangular ±a → a/√3; triangular → a/√6; normal with stated k → U/k; resolution r → (r/2)/√3.",
        "Combined u<sub>c</sub> = √Σ(c<sub>i</sub>·u<sub>i</sub>)², with sensitivity coefficients c<sub>i</sub> = ∂y/∂x<sub>i</sub>.",
        "Expanded U = k·u<sub>c</sub>; k = 2 gives about 95 % coverage for many degrees of freedom.",
        "Report as y ± U (k = 2), and look at the budget: the largest one or two components are where improvement pays.",
    ],
    body=f'''
<h2 id="steps">1. Steps</h2>
{fig(flow(["Model|y = f(x1, x2, …)","List sources|instrument, method, environment","Standard uncertainties|Type A and B","Sensitivity|ci = ∂y/∂xi","Combine|RSS","Expand|U = k·uc"], h=130), "Figure 1. The GUM procedure.")}
{table(["Source information","Distribution","Standard uncertainty"],[["Repeated readings, std dev s, n readings","Normal (Type A)","s/√n"],["Specification ±a (no other information)","Rectangular","a/√3"],["±a, values near centre more likely","Triangular","a/√6"],["Certificate U with coverage factor k","Normal","U/k"],["Digital resolution r","Rectangular","(r/2)/√3"]])}
<h2 id="budget">2. Example budget: pressure measurement</h2>
{table(["Component","u (bar)","u² (bar²)"],[[n_,f"{u:.5f}",f"{u*u:.2e}"] for n_,u in comps]+[["Combined u_c",f"<b>{uc:.4f}</b>",""],["Expanded U (k = 2)",f"<b>{U:.4f}</b>",""]],num_cols=(1,2))}
<p>The transmitter accuracy dominates: a better transmitter or a calibration-corrected reading would reduce U more than averaging more readings.</p>
<h2 id="decision">3. Using uncertainty in decisions</h2>
<p>When checking conformity to a limit, guard-band: accept only if the reading is inside the limit by at least U (ISO 14253-1, ILAC G8), or agree a shared-risk rule with the customer. Test uncertainty ratio (TUR) of at least 4:1 between tolerance and calibration uncertainty keeps false accept risk low.</p>
''',
    calcs=[dict(id="unc", title="Uncertainty budget (up to five components)",
                note="For each component give the value, the type of information and the sensitivity coefficient (1 if the source is in the same unit as the result).",
                presets=[dict(label="Pressure example", v=dict(a1=0.012, d1="A10", c1=1, a2=0.025, d2="rect", c2=1, a3=0.010, d3="k2", c3=1, a4=0.001, d4="res", c4=1, a5=0.008, d5="rect", c5=1, k=2))],
                inputs=sum([[dict(id=f"a{i}", label=f"Component {i} value", value=v1), dict(id=f"d{i}", label=f"Component {i} type", value=v2, options=[("A10", "Std dev of 10 readings"), ("A5", "Std dev of 5 readings"), ("rect", "± limit, rectangular"), ("tri", "± limit, triangular"), ("k2", "Certificate U, k = 2"), ("res", "Resolution"), ("none", "Not used")]),
                             dict(id=f"c{i}", label=f"Component {i} sensitivity", value=1)] for i, (v1, v2) in enumerate([(0.012, "A10"), (0.025, "rect"), (0.010, "k2"), (0.001, "res"), (0.008, "rect")], start=1)], []) + [dict(id="k", label="Coverage factor k", value=2)],
                js='''var div={A10:Math.sqrt(10),A5:Math.sqrt(5),rect:Math.sqrt(3),tri:Math.sqrt(6),k2:2,res:2*Math.sqrt(3),none:Infinity},s=0,rows=[],big=0,bi=0;
for(var i=1;i<=5;i++){var u=v["a"+i]/div[v["d"+i]]*Math.abs(v["c"+i]);if(!isFinite(u))u=0;s+=u*u;if(u>big){big=u;bi=i;}}
var uc=Math.sqrt(s),out=[];for(i=1;i<=5;i++){var uu=v["a"+i]/div[v["d"+i]]*Math.abs(v["c"+i]);if(isFinite(uu)&&uu>0)out.push(["u"+i,fmt(uu,5),fmt(100*uu*uu/s,1)+" % of variance"]);}
out.push(["Combined uc",fmt(uc,5)]);out.push(["Expanded U",fmt(v.k*uc,5),"k = "+v.k]);
return {rows:out,verdict:["ok","Largest contributor: component "+bi+"."]};''')],
    quiz=[
        dict(q="Type A uncertainty is evaluated by:", o=["Manufacturer specs", "Statistical analysis of repeated readings", "Calibration certificates", "Judgement"], a=1, e="Statistics of a series."),
        dict(q="A specification ±0.3 with rectangular distribution gives u =", o=["0.3", "0.173", "0.15", "0.1"], a=1, e="0.3/√3."),
        dict(q="Components are combined by:", o=["Adding linearly", "Root-sum-of-squares", "Taking the largest", "Averaging"], a=1, e="RSS of ci·ui."),
        dict(q="k = 2 corresponds to about:", o=["68 %", "95 %", "99.7 %", "50 %"], a=1, e="Normal distribution."),
        dict(q="A certificate states U = 0.04 (k = 2). Standard uncertainty:", o=["0.04", "0.02", "0.08", "0.023"], a=1, e="U/k."),
        dict(q="To reduce U efficiently you should improve:", o=["The smallest component", "The largest components", "All equally", "Only Type A"], a=1, e="RSS is dominated by the largest."),
        dict(q="s = 0.05 over 25 readings. Type A standard uncertainty of the mean?", num=0.01, e="0.05/5 = 0.01."),
        dict(q="u1 = 0.03, u2 = 0.04. Combined uc?", num=0.05, e="√(0.0009 + 0.0016) = 0.05."),
    ],
    refs=["JCGM 100:2008, Evaluation of measurement data — Guide to the expression of uncertainty in measurement (GUM).", "EA-4/02 M:2022, Evaluation of the Uncertainty of Measurement in Calibration.", "ILAC-G8:09/2019, Guidelines on Decision Rules and Statements of Conformity.", "Bell, S., A Beginner's Guide to Uncertainty of Measurement, NPL Good Practice Guide 11."],
    links=[("BIPM — JCGM guides", "https://www.bipm.org/en/committees/jc/jcgm/publications"), ("Wikipedia — Measurement uncertainty", "https://en.wikipedia.org/wiki/Measurement_uncertainty")],
))

# ---------------------------------------------------------------- 56 CALIBRATION
ARTICLES.append(dict(
    slug="calibration-and-traceability", group="reliability",
    title="Calibration and Traceability: Chains, Intervals, TUR and Decision Rules",
    short="Calibration", tags=["Calibration", "Traceability", "ISO 17025", "Metrology"],
    desc="What calibration means, the traceability chain from SI to working instruments, accredited labs (ISO/IEC 17025), test uncertainty ratio, as-found/as-left results, interval adjustment and guard-banded acceptance.",
    blurb="How instrument readings are tied to national standards, how often to calibrate and how to accept or reject with confidence.",
    lead="Calibration compares an instrument with a reference of known, smaller uncertainty, and records the difference. Traceability means that chain of comparisons reaches back, unbroken, to the SI units realised by a national metrology institute. For test results to be trusted by customers and auditors, every instrument in the measurement chain needs valid, traceable calibration at a sensible interval.",
    takeaways=[
        "Traceability chain: SI → national metrology institute → accredited calibration labs → in-house standards → working instruments.",
        "Use labs accredited to ISO/IEC 17025 for the parameter and range (in India, NABL accreditation).",
        "Aim for a test uncertainty ratio (tolerance ÷ calibration uncertainty) of at least 4:1.",
        "Record as-found results before any adjustment: they reveal drift and whether past measurements were affected.",
        "Adjust intervals from history: extend if instruments are consistently in tolerance, shorten if found out of tolerance.",
    ],
    body=f'''
<h2 id="chain">1. The traceability chain</h2>
{fig(flow(["SI units|definitions","National institute|e.g. NPL India","Accredited lab|ISO/IEC 17025","In-house reference|standards","Working instruments|on the rig"], h=130), "Figure 1. Traceability chain; uncertainty grows at each step.")}
<h2 id="certificate">2. What a certificate should show</h2>
<ul><li>Instrument identity, procedure, environmental conditions, date.</li><li>Reference standards used and their traceability.</li><li>Results at each point: reference value, indication, error, and expanded uncertainty with k.</li><li>As-found and as-left data if adjusted; statement of conformity only with a stated decision rule.</li><li>Accreditation mark and scope reference.</li></ul>
<h2 id="tur">3. TUR and guard bands</h2>
{formula("TUR = (tolerance span, ±T) / (2 · U_cal)  — often simplified to T / U_cal\nGuard-banded acceptance limit A = T − U    (simple guard band, ILAC G8 style)\nAccept if |error| ≤ A; reject if |error| > T + U; between → conditional")}
<h2 id="intervals">4. Calibration intervals</h2>
{table(["Approach","How it works"],[["Fixed interval","Same interval for all (e.g. 12 months): simple, often wasteful"],["Staircase (simple response)","Extend by e.g. 25 % after in-tolerance result; shorten by 50 % after out-of-tolerance"],["Reliability target","Choose interval so that, say, 95 % of instruments are in tolerance at recall (ILAC G24 / NCSL RP-1 methods)"],["Usage-based","After n hours or cycles; also after drops, overloads or repairs"]])}
<p>Between calibrations, intermediate checks (check sources, comparisons between redundant sensors, zero checks) catch drift early.</p>
''',
    calcs=[dict(id="cal", title="TUR, guard band and interval adjustment",
                presets=[dict(label="Pressure transmitter", v=dict(T=0.05, U=0.01, err=0.042, intv=12, res="in")), dict(label="Low TUR", v=dict(T=0.05, U=0.025, err=0.03, intv=12, res="out"))],
                inputs=[dict(id="T", label="Tolerance ± (units)", value=0.05), dict(id="U", label="Calibration expanded uncertainty U", value=0.01), dict(id="err", label="Measured error (as found)", value=0.042),
                        dict(id="intv", label="Current interval (months)", value=12), dict(id="res", label="As-found result", value="in", options=[("in", "In tolerance"), ("out", "Out of tolerance")])],
                js='''var tur=v.T/v.U,A=v.T-v.U,e=Math.abs(v.err),st=e<=A?"pass (inside guard band)":(e>v.T+v.U?"fail":"conditional (inside tolerance ± U zone)");var ni=v.res==="in"?v.intv*1.25:v.intv*0.5;
return {rows:[["TUR",fmt(tur,2)+" : 1"],["Guard-banded acceptance limit","±"+fmt(A,4)],["Decision",st],["Next interval (staircase)",fmt(ni,1)+" months"]],
verdict:tur<4?["caution","TUR below 4:1: higher false-accept risk; use a better reference or guard band."]:["ok","TUR of 4:1 or better."]};''')],
    quiz=[
        dict(q="Traceability means:", o=["The instrument is new", "An unbroken chain of calibrations to SI units with stated uncertainties", "Calibration by the manufacturer", "A sticker on the instrument"], a=1, e="Documented chain."),
        dict(q="Calibration labs should be accredited to:", o=["ISO 9001", "ISO/IEC 17025", "ISO 14001", "ISO 45001"], a=1, e="Competence of testing and calibration labs."),
        dict(q="Recommended minimum TUR:", o=["1:1", "2:1", "4:1", "100:1"], a=2, e="4:1 is the common guideline."),
        dict(q="Why record as-found data?", o=["Cosmetic", "To know whether past measurements were affected by drift", "Required for adjustment only", "No reason"], a=1, e="Impact assessment."),
        dict(q="If an instrument is found out of tolerance, the interval should usually be:", o=["Extended", "Shortened", "Unchanged", "Cancelled"], a=1, e="Staircase response."),
        dict(q="A guard band makes acceptance:", o=["Easier", "Stricter, to limit false accepts", "Random", "Unrelated to uncertainty"], a=1, e="Accept limit = T − U."),
        dict(q="Tolerance ±0.2, U = 0.04. TUR?", num=5, e="0.2/0.04 = 5."),
        dict(q="Tolerance ±0.2, U = 0.04. Guard-banded acceptance limit (±)?", num=0.16, e="0.2 − 0.04."),
    ],
    refs=["ISO/IEC 17025:2017, General requirements for the competence of testing and calibration laboratories.", "ILAC-P10:07/2020, ILAC Policy on Metrological Traceability of Measurement Results.", "ILAC-G24 / OIML D10, Guidelines for the determination of calibration intervals of measuring instruments.", "NABL (India) documents for calibration laboratories."],
    links=[("Wikipedia — Metrological traceability", "https://en.wikipedia.org/wiki/Traceability#Measurement")],
))

# ---------------------------------------------------------------- 57 FMEA & RCA
fish = '''<svg viewBox="0 0 900 300" role="img" aria-label="Fishbone diagram">
<line x1="80" y1="150" x2="760" y2="150" stroke="var(--ink)" stroke-width="4"/><polygon points="760,140 785,150 760,160" fill="var(--ink)"/>
<rect x="790" y="118" width="100" height="64" rx="8" fill="var(--orange3)" stroke="var(--orange)" stroke-width="2"/><text x="840" y="146" text-anchor="middle" font-size="13" font-weight="700">Problem</text><text x="840" y="164" text-anchor="middle" font-size="12">(effect)</text>
''' + "".join(f'<line x1="{x}" y1="{y1}" x2="{x+70}" y2="150" stroke="var(--blue)" stroke-width="3"/><text x="{x-10}" y="{y1-8 if y1<150 else y1+18}" font-size="13" font-weight="700">{t}</text>'
              for x, y1, t in [(150, 50, "Machine"), (360, 50, "Method"), (570, 50, "Material"), (150, 250, "Man (people)"), (360, 250, "Measurement"), (570, 250, "Mother nature (environment)")]) + '</svg>'
ARTICLES.append(dict(
    slug="fmea-and-root-cause-analysis", group="reliability",
    title="FMEA and Root-Cause Analysis: Severity, Occurrence, Detection, 5-Why, Fishbone and Fault Trees",
    short="FMEA and RCA", tags=["FMEA", "Root cause", "Quality", "Reliability"],
    desc="Failure mode and effects analysis (FMEA) with severity, occurrence and detection ratings, RPN and action priority, plus root-cause tools: 5-why, fishbone (Ishikawa) diagrams and simple fault-tree probabilities.",
    blurb="Anticipating failures with FMEA, and finding the real cause after one happens with 5-why, fishbone and fault trees.",
    lead="FMEA looks forward: for each function, how can it fail, what happens, why, and how would we catch it? Root-cause analysis looks back after a failure: why did it really happen, so that the fix prevents recurrence instead of treating the symptom. Both work best as short team exercises with evidence, not as paperwork.",
    takeaways=[
        "FMEA rates Severity, Occurrence and Detection on 1–10 scales; RPN = S × O × D was the classic ranking.",
        "The AIAG–VDA (2019) method replaces RPN ranking with Action Priority (High/Medium/Low), giving severity precedence.",
        "Always act on high-severity modes (9–10) regardless of RPN.",
        "5-why: keep asking why until you reach a cause you can control; check each step with evidence.",
        "Fishbone diagrams organise possible causes (machine, method, material, people, measurement, environment); fault trees quantify combinations with AND/OR logic.",
    ],
    body=f'''
<h2 id="fmea">1. FMEA</h2>
{table(["Column","Content"],[["Item / function","What it must do"],["Failure mode","How it fails to do it"],["Effect","Consequence for system, user, safety"],["Severity S (1–10)","Seriousness of the effect"],["Cause","Why the mode happens"],["Occurrence O (1–10)","Likelihood of the cause"],["Current controls","Prevention and detection in place"],["Detection D (1–10)","Ability to detect before reaching the customer (10 = cannot detect)"],["RPN / Action priority","Ranking for action"],["Actions, owner, date","Recommended actions and re-rating"]])}
<h2 id="rca">2. Root-cause tools</h2>
{fig(fish, "Figure 1. Fishbone (Ishikawa) diagram with six cause categories.")}
<p><b>5-why example:</b> Bearing failed → lubricant starved → oil jet blocked → debris from upstream filter bypass → filter ΔP switch disabled after nuisance alarms → <i>root cause: alarm management practice</i>. The fix is in the process, not only the bearing.</p>
{formula("Fault tree:  OR gate  P = 1 − Π(1 − p_i)        AND gate  P = Π p_i   (independent events)")}
<h2 id="practice">3. Practice tips</h2>
<ul><li>Use a cross-functional team; base ratings on data where possible.</li><li>Separate cause from effect: "high vibration" is an effect.</li><li>Preserve evidence after failures: parts, oil samples, data logs, photographs.</li><li>Verify the root cause by reproducing or by showing the fix removes the failure.</li></ul>
''',
    calcs=[dict(id="fm", title="RPN, simple action priority and fault tree",
                presets=[dict(label="Example", v=dict(S=8, O=4, D=6, p1=0.01, p2=0.02, p3=0.005, gate="or"))],
                inputs=[dict(id="S", label="Severity (1–10)", value=8), dict(id="O", label="Occurrence (1–10)", value=4), dict(id="D", label="Detection (1–10)", value=6),
                        dict(id="p1", label="Event 1 probability", value=0.01), dict(id="p2", label="Event 2 probability", value=0.02), dict(id="p3", label="Event 3 probability (0 = unused)", value=0.005),
                        dict(id="gate", label="Gate", value="or", options=[("or", "OR (any causes top event)"), ("and", "AND (all needed)")])],
                js='''var rpn=v.S*v.O*v.D,ap=(v.S>=9&&v.O>=2)||(v.S>=7&&v.O>=4&&v.D>=4)?"High":((v.S>=5&&v.O>=3)||(v.S>=7&&v.D>=6)?"Medium":"Low");
var ps=[v.p1,v.p2,v.p3].filter(function(p){return p>0;}),P=v.gate==="or"?1-ps.reduce(function(a,p){return a*(1-p);},1):ps.reduce(function(a,p){return a*p;},1);
return {rows:[["RPN",rpn],["Action priority (simplified)",ap],["Top-event probability",P.toExponential(3),v.gate.toUpperCase()+" of "+ps.length+" events"]],verdict:ap==="High"?["bad","High priority: act and re-rate."]:(ap==="Medium"?["caution","Medium priority: action recommended."]:["ok","Low priority."])};''')],
    quiz=[
        dict(q="RPN equals:", o=["S + O + D", "S × O × D", "S × O", "O × D"], a=1, e="Risk priority number."),
        dict(q="A detection rating of 10 means:", o=["Certain detection", "Cannot detect", "Highly severe", "Frequent"], a=1, e="10 = worst detection."),
        dict(q="AIAG–VDA FMEA replaces RPN ranking with:", o=["Pareto charts", "Action Priority (H/M/L)", "Weibull", "Cpk"], a=1, e="Severity-led priority tables."),
        dict(q="High-severity modes (9–10) should be addressed:", o=["Only if RPN > 100", "Regardless of RPN", "Never", "Only after failure"], a=1, e="Safety first."),
        dict(q="Fishbone categories commonly include:", o=["Machine, method, material, man, measurement, environment", "Only cost", "Time only", "Suppliers only"], a=0, e="6M."),
        dict(q="Two independent events both required for failure use a(n):", o=["OR gate", "AND gate", "XOR gate", "NOT gate"], a=1, e="Probability multiplies."),
        dict(q="S = 7, O = 5, D = 4. RPN?", num=140, e="7×5×4 = 140."),
        dict(q="OR gate of p = 0.1 and 0.2 (independent). P(top)?", num=0.28, e="1 − 0.9×0.8 = 0.28."),
    ],
    refs=["AIAG & VDA, FMEA Handbook, 1st ed., 2019.", "IEC 60812:2018, Failure modes and effects analysis (FMEA and FMECA).", "IEC 61025, Fault tree analysis (FTA).", "Andersen, B. and Fagerhaug, T., Root Cause Analysis, 2nd ed., ASQ Quality Press, 2006."],
    links=[("Wikipedia — FMEA", "https://en.wikipedia.org/wiki/Failure_mode_and_effects_analysis"), ("Wikipedia — Ishikawa diagram", "https://en.wikipedia.org/wiki/Ishikawa_diagram")],
))

# ---------------------------------------------------------------- 58 MAINTENANCE STRATEGIES
mtbf, mttr = 600.0, 8.0
Av = mtbf / (mtbf + mttr)
A_, P_, Q_ = 0.90, 0.95, 0.99
OEE = A_ * P_ * Q_
pf = plot([dict(pts=[(t, 100 if t < 40 else 100 - (t - 40) ** 2 / 36) for t in np.linspace(0, 100, 101)], label="condition", at=20)],
          "time", "condition (%)", xlim=(0, 100), ylim=(0, 110), h=280, points=[(40, 100, "P: potential failure detectable"), (100, 0, "F: functional failure")],
          notes=[(55, 70, "P–F interval: inspect at less than this")])
ARTICLES.append(dict(
    slug="maintenance-strategies-rcm-oee", group="reliability",
    title="Maintenance Strategies: Reactive, Preventive, Predictive, RCM, Availability and OEE",
    short="Maintenance strategies", tags=["Maintenance", "RCM", "OEE", "Availability"],
    desc="Choosing maintenance strategies: run-to-failure, time-based, condition-based and reliability-centred maintenance; the P–F interval; MTBF, MTTR and availability; and overall equipment effectiveness.",
    blurb="Matching maintenance strategy to failure behaviour, using the P–F interval, and measuring availability and OEE.",
    lead="No single maintenance strategy is right for every item. Cheap, non-critical parts can run to failure; wear-out parts with predictable life suit scheduled replacement; most rotating machinery fails randomly with warning signs, which suits condition monitoring. Reliability-centred maintenance (RCM) is the structured way to choose, item by item.",
    takeaways=[
        "Only items with wear-out behaviour (Weibull β &gt; 1) benefit from time-based replacement.",
        "Condition-based maintenance relies on the P–F interval: inspect more often than the time between detectable onset (P) and failure (F).",
        "Availability A = MTBF/(MTBF + MTTR); reduce MTTR with spares, procedures and access.",
        "OEE = Availability × Performance × Quality; about 85 % is considered world class for discrete manufacturing.",
        "RCM asks seven questions per function, ending with the most cost-effective task or a redesign.",
    ],
    body=f'''
<h2 id="strategies">1. Strategies</h2>
{table(["Strategy","When it fits","Example"],[["Run to failure","Failure cheap, safe and non-critical","Lamps, small fans with spares"],["Time-based (preventive)","Clear wear-out life, β > 1","Belts, filters, lubricant changes"],["Condition-based (predictive)","Detectable warning and adequate P–F interval","Vibration, oil, thermography, ultrasound"],["Failure-finding","Hidden failures of protective devices","Testing trips, relief valves"],["Redesign","No task is effective and consequence is high","Upgrade component, add redundancy"]])}
<h2 id="pf">2. The P–F interval</h2>
{fig(pf, "Figure 1. P–F curve: once a developing fault becomes detectable (P), there is a finite time before functional failure (F). Inspection interval should be well within the P–F interval, often half of it.")}
<h2 id="metrics">3. Metrics</h2>
{formula("MTBF = operating time / number of failures       MTTR = repair time / number of repairs\nAvailability A = MTBF / (MTBF + MTTR)\nOEE = Availability × Performance × Quality")}
<p>Example: MTBF {mtbf:.0f} h and MTTR {mttr:.0f} h give A = <b>{Av*100:.2f} %</b>. A plant with {A_*100:.0f} % availability, {P_*100:.0f} % performance and {Q_*100:.0f} % quality has OEE = <b>{OEE*100:.1f} %</b>.</p>
<h2 id="rcm">4. RCM's seven questions</h2>
<ol><li>What are the functions and performance standards?</li><li>How can it fail to fulfil them?</li><li>What causes each failure?</li><li>What happens when it fails?</li><li>Why does each failure matter (safety, environment, operations, cost)?</li><li>What can be done to predict or prevent it?</li><li>What if no suitable task exists (failure finding, redesign, run to failure)?</li></ol>
''',
    calcs=[dict(id="mt", title="Availability and OEE",
                presets=[dict(label="Example", v=dict(mtbf=600, mttr=8, plan=480, down=48, ideal=1.0, count=400, good=396))],
                inputs=[dict(id="mtbf", label="MTBF (h)", value=600), dict(id="mttr", label="MTTR (h)", value=8), dict(id="plan", label="Planned production time (min)", value=480), dict(id="down", label="Downtime (min)", value=48),
                        dict(id="ideal", label="Ideal cycle time (min/unit)", value=1.0), dict(id="count", label="Total units", value=400), dict(id="good", label="Good units", value=396)],
                js='''var A=v.mtbf/(v.mtbf+v.mttr),run=v.plan-v.down,Av=run/v.plan,Pf=v.ideal*v.count/run,Q=v.good/v.count,O=Av*Pf*Q;
return {rows:[["Inherent availability",fmt(A*100,2)+" %"],["OEE availability",fmt(Av*100,1)+" %"],["Performance",fmt(Pf*100,1)+" %"],["Quality",fmt(Q*100,1)+" %"],["OEE",fmt(O*100,1)+" %"]],
verdict:O>=0.85?["ok","World-class OEE (≥ 85 %)."]:(O>=0.6?["caution","Typical OEE; find the biggest loss."]:["bad","Low OEE."])};''')],
    quiz=[
        dict(q="Time-based replacement is effective only when:", o=["Failures are random", "There is wear-out (increasing hazard)", "Parts are cheap", "Always"], a=1, e="β > 1."),
        dict(q="The P–F interval is:", o=["Time between purchases", "Time from detectable onset to functional failure", "MTTR", "MTBF"], a=1, e="Window for condition monitoring."),
        dict(q="Availability equals:", o=["MTTR/MTBF", "MTBF/(MTBF + MTTR)", "MTBF × MTTR", "1 − MTBF"], a=1, e="Uptime fraction."),
        dict(q="OEE is the product of:", o=["Availability, performance, quality", "Cost, time, quality", "MTBF, MTTR, OEE", "Speed, torque, power"], a=0, e="Three factors."),
        dict(q="Failure-finding tasks target:", o=["Visible failures", "Hidden failures of protective devices", "Wear-out", "Lubrication"], a=1, e="Protective functions fail silently."),
        dict(q="A typical world-class OEE figure is:", o=["50 %", "65 %", "85 %", "100 %"], a=2, e="≈ 85 %."),
        dict(q="MTBF 1000 h, MTTR 10 h. Availability (%)?", num=99.01, unit="%", tol=0.001, e="1000/1010."),
        dict(q="A = 0.9, P = 0.9, Q = 0.98. OEE (%)?", num=79.38, unit="%", e="0.9 × 0.9 × 0.98 = 79.4 %."),
    ],
    refs=["Moubray, J., Reliability-Centred Maintenance, 2nd ed., Butterworth-Heinemann, 1997.", "SAE JA1011, Evaluation Criteria for RCM Processes.", "Nakajima, S., Introduction to TPM, Productivity Press, 1988.", "EN 13306, Maintenance terminology."],
    links=[("Wikipedia — Reliability-centered maintenance", "https://en.wikipedia.org/wiki/Reliability-centered_maintenance"), ("Wikipedia — OEE", "https://en.wikipedia.org/wiki/Overall_equipment_effectiveness")],
))

# ---------------------------------------------------------------- 59 OIL ANALYSIS
hrs = [0, 100, 200, 300, 400, 500, 600, 700]
fe = [3, 6, 9, 12, 14, 18, 27, 41]
rates = [(fe[i] - fe[i - 1]) for i in range(1, len(fe))]
oplot = plot([dict(pts=list(zip(hrs, fe)), label="iron (ppm)", at=500), dict(pts=[(0, 25), (700, 25)], label="alert 25 ppm", at=100, width=2), dict(pts=[(0, 40), (700, 40)], label="alarm 40 ppm", at=100, width=2)],
             "test hours", "Fe (ppm)", xlim=(0, 700), ylim=(0, 50), h=280)
ARTICLES.append(dict(
    slug="oil-analysis-and-wear-debris", group="reliability",
    title="Oil Analysis and Wear Debris Monitoring: Tests, Elements, Trends and Chip Detectors",
    short="Oil analysis", tags=["Oil analysis", "Wear debris", "Condition monitoring", "Lubrication"],
    desc="Using lubricant analysis for condition monitoring: viscosity, acid number, water, particle counts, elemental spectroscopy and element sources, ferrography and PQ index, magnetic chip detectors, sampling practice and trending.",
    blurb="What each oil test tells you, where each wear metal comes from, and how to trend results into early warnings.",
    lead="The lubricant carries evidence of what is happening inside a machine: wear particles from gears and bearings, dirt from outside, water and coolant from leaks, and chemical change of the oil itself. Regular, consistent samples trended over time often reveal problems before vibration does, especially slow wear and contamination.",
    takeaways=[
        "Three questions: is the oil healthy (viscosity, acid number, additives), is it contaminated (water, particles, silicon), is the machine wearing (Fe, Cu, Cr… and particle size)?",
        "Spectroscopy (ICP/RDE) sees particles below about 5–10 µm; large wear debris needs ferrography, PQ index or chip detectors.",
        "Rate of change matters more than absolute ppm: trend against running hours and correct for oil top-ups and changes.",
        "Take samples from a running, warm system at the same live point (upstream of the filter), into clean bottles.",
        "Magnetic chip detectors in gearboxes and engines give early warning of fatigue spalls with large flakes.",
    ],
    body=f'''
<h2 id="tests">1. Tests</h2>
{table(["Test","Indicates","Warning sign (typical)"],[["Kinematic viscosity (40/100 °C)","Wrong oil, shear, oxidation, fuel dilution","±10 % from new"],["Acid number (TAN)","Oxidation","Rise of 0.5–1 mg KOH/g"],["Water (Karl Fischer)","Seal leaks, condensation","&gt; 200–500 ppm"],["Particle count (ISO 4406)","Contamination, filtration health","Rise of 2 code steps"],
["Elemental spectroscopy (ppm)","Wear metals, dirt, additives, coolant","Rising trend"],["PQ index / ferrous density","Total ferrous debris including large particles","Step change"],["Analytical ferrography","Particle shape → wear mechanism","Large fatigue or cutting particles"],["FTIR","Oxidation, nitration, glycol, additive depletion","Trend"]])}
<h2 id="elements">2. Where elements come from</h2>
{table(["Element","Typical source"],[["Fe","Gears, bearings, shafts, housings"],["Cr","Bearing steels, chrome-plated parts"],["Ni","Alloy steels, some bearings"],["Cu, Sn, Pb","Bronze bushes, cages, babbitt bearings, coolers"],["Al","Housings, pistons, some cages"],["Ag","Silver-plated parts (aero engines, some bearings)"],["Si","Dirt (with Al), antifoam additive"],["Na, K, B","Coolant ingress (glycol) or additives"],["Zn, P, Ca, Mg, Mo","Additives (should stay near new-oil levels)"]])}
<h2 id="trend">3. Trending</h2>
{fig(oplot, "Figure 1. Iron trend over a test: steady wear rate, then acceleration after 500 h. The rate of rise is the warning, before the alarm level is reached.")}
<p>Wear rate per 100 h in the example: {", ".join(str(r) for r in rates)} ppm. The jump from about 3–4 to 9 and 14 ppm per 100 h is the signal to inspect (chip detector, filter, borescope).</p>
<h2 id="sampling">4. Sampling practice</h2>
<ul><li>Sample from a dedicated valve in a turbulent, live line upstream of filters, with the system at operating temperature.</li><li>Flush the valve and use clean, labelled bottles; record hours, oil hours and top-up volume.</li><li>Keep the interval and point constant so trends are comparable.</li><li>Correct concentrations for top-ups: added clean oil dilutes ppm values.</li></ul>
''',
    calcs=[dict(id="oa", title="Wear rate trend and alarm projection",
                presets=[dict(label="Example", v=dict(h1=600, c1=27, h2=700, c2=41, alarm=40, vol=20, top=2))],
                inputs=[dict(id="h1", label="Previous sample hours", value=600), dict(id="c1", label="Previous Fe (ppm)", value=27), dict(id="h2", label="Latest sample hours", value=700), dict(id="c2", label="Latest Fe (ppm)", value=41),
                        dict(id="alarm", label="Alarm level (ppm)", value=40), dict(id="vol", label="System oil volume (L)", value=20), dict(id="top", label="Top-up between samples (L)", value=2)],
                js='''var corr=v.c2*v.vol/(v.vol-v.top),rate=(corr-v.c1)/(v.h2-v.h1)*100,toA=rate>0?(v.alarm-v.c2)/(rate/100):Infinity;
return {rows:[["Fe corrected for top-up",fmt(corr,1)+" ppm"],["Wear rate",fmt(rate,2)+" ppm per 100 h"],["Hours to alarm at this rate",isFinite(toA)?(toA<=0?"already above":fmt(toA,0)+" h"):"not rising"]],
verdict:v.c2>=v.alarm?["bad","Above alarm level: inspect."]:(rate>5?["caution","Rising quickly: increase sampling and check chip detector/filter."]:["ok","Stable trend."])};''')],
    quiz=[
        dict(q="Spectroscopy (ICP/RDE) mainly detects particles:", o=["Above 100 µm", "Below about 5–10 µm", "Only water", "Only additives"], a=1, e="Large debris is under-reported."),
        dict(q="Silicon together with aluminium usually indicates:", o=["Additives", "Dirt ingress", "Bearing wear", "Coolant"], a=1, e="Silica and alumina in dust."),
        dict(q="Sodium and potassium rising may indicate:", o=["Gear wear", "Coolant (glycol) ingress", "Oxidation", "Viscosity loss"], a=1, e="Coolant inhibitors."),
        dict(q="Where should oil samples be taken?", o=["Tank bottom drain", "Live turbulent line upstream of filters", "Downstream of filters", "Top of the tank"], a=1, e="Representative of circulating oil."),
        dict(q="More important than absolute ppm is:", o=["Colour", "Rate of change", "Bottle size", "Lab name"], a=1, e="Trends reveal change."),
        dict(q="Magnetic chip detectors catch:", o=["Water", "Large ferrous flakes from fatigue", "Silicon", "Acids"], a=1, e="Early spall warning."),
        dict(q="Fe 20 ppm at 300 h, 32 ppm at 500 h. Rate per 100 h?", num=6, unit="ppm", e="12/2 = 6."),
        dict(q="Sample 40 ppm after adding 5 L to a 50 L system. Corrected ppm?", num=44.44, unit="ppm", e="40 × 50/45 = 44.4."),
    ],
    refs=["Fitch, J. C. (ed.), Oil Analysis Handbook, Noria.", "ASTM D7720, Guide for Statistically Evaluating Measurand Alarm Limits when Using Oil Analysis to Monitor Equipment.", "ASTM D5185 (ICP-AES elements), D6595 (RDE), D664 (acid number), D6304 (Karl Fischer water).", "Roylance, B. J., 'Ferrography — then and now', Tribology International, 38, 2005."],
    links=[("Wikipedia — Oil analysis", "https://en.wikipedia.org/wiki/Oil_analysis")],
))
