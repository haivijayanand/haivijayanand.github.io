<style>
.tcap{font-family:Inter,system-ui,sans-serif;font-size:13.5px;color:var(--ink-soft);margin:22px auto 6px}
.eq{text-align:center;font-size:1.05em;margin:14px 0;overflow-x:auto}
pre.code{font-size:12px;line-height:1.35;overflow-x:auto;padding:10px;border:1px solid var(--line,#ccc);border-radius:6px}
</style>
## Abstract

<p>AVL (Athena Vortex Lattice) is a small, free program from MIT that has become one of the most widely used tools for the early aerodynamic and flight-dynamic analysis of fixed-wing aircraft and unmanned air vehicles (UAVs). It was first written by Harold Youngren around 1988 for MIT's Project Athena teaching computers and was then developed for more than three decades by Mark Drela and Youngren. AVL combines an extended vortex-lattice model of the lifting surfaces with a slender-body model of fuselages, trims the aircraft, returns a full set of stability and control derivatives in seconds, and performs a rigid-body eigenmode analysis. This paper traces the lineage of the vortex-lattice method from Prandtl and Falkner to AVL, records the release history of AVL itself, explains its formulation and the practical workflow for derivative extraction, and surveys how the code is used today in teaching, UAV development, open-source autopilot simulation and conceptual-design frameworks. It then reviews the improvements made by other researchers: scripting wrappers, automatic-differentiation versions for gradient-based optimisation, sister codes for blown lift and flexible aircraft, nonlinear post-stall corrections, compressibility and propeller-slipstream extensions. A complete worked example on a 2 m span, 3.2 kg conventional UAV is given, with validation of the lattice formulation against lifting-surface theory, a lattice-convergence study, trim, the derivative matrix, neutral point, dynamic modes, design sensitivities and a surface-by-surface breakdown, followed by a second example on a tailless flying wing. The limitations of AVL are listed in a form that can be used as a checklist, and a research roadmap is proposed.</p>
<p><b>Index Terms</b>&mdash;AVL, vortex lattice method, stability derivatives, control derivatives, flight dynamics, UAV, neutral point, eigenmode analysis, conceptual design, low-order aerodynamics.</p>

## 1. Introduction

<p>Every aircraft programme needs numbers for lift-curve slope, pitching-moment slope, neutral point, roll and yaw damping, control power and the cross-coupling terms long before a wind-tunnel model exists. The traditional sources were the USAF DATCOM handbook and its digital version, Digital DATCOM, which rely on correlations from conventional configurations. Computational fluid dynamics (CFD) gives far richer information, but each Reynolds-averaged Navier&ndash;Stokes (RANS) case costs hours, and a full stability-derivative set needs many cases with rotating frames or prescribed motion.</p>
<p>Between these two extremes sit low-order potential-flow methods. Among them, the vortex lattice method (VLM) is the workhorse: it represents each thin lifting surface by a grid of horseshoe vortices, solves a small linear system and integrates the loads. AVL is a particularly capable and robust implementation. Its input is a short, readable text file; it runs in a fraction of a second on any computer; and it directly prints the stability-axis derivative matrix including rate and control derivatives. For these reasons it is the default first tool in many university design courses, student competitions, small-UAV companies and research groups, and it is embedded in several open-source design frameworks.</p>
<p>The author's own use of AVL has been for determining stability derivatives of aircraft and UAV configurations. Experience shows that the program is easy to run but easy to misuse: the reference quantities, the sign conventions, the treatment of fuselages and the limits of the quasi-steady, inviscid, linear model all need care. The aim of this paper is therefore practical as well as historical. It brings together, in one place:</p>
<ul>
<li>the lineage of the vortex lattice method and the history of AVL (Sections&nbsp;2&ndash;3);</li>
<li>the formulation and the derivative-extraction workflow (Sections&nbsp;4&ndash;5);</li>
<li>current usage and published validation experience (Section&nbsp;6);</li>
<li>improvements and extensions by other researchers (Section&nbsp;7);</li>
<li>two worked UAV examples, conventional and tailless, with validation, convergence, trim, derivatives, modes and sensitivities (Section&nbsp;8);</li>
<li>the limitations, as a usable checklist (Section&nbsp;9), and a way ahead (Section&nbsp;10).</li>
</ul>

## 2. Lineage of the Vortex Lattice Method

### 2.1 From lifting line to the lattice

<p>The VLM is a discrete form of lifting-surface theory. Prandtl's lifting-line theory (1918&ndash;1923) replaced a high-aspect-ratio wing by a single bound vortex along the quarter-chord line, shedding a sheet of trailing vorticity whose downwash reduces the effective angle of attack and produces induced drag [1]. Lifting-line theory is excellent for straight, high-aspect-ratio wings but cannot capture chordwise loading, sweep effects at low aspect ratio, or interference between several surfaces.</p>
<p>The step to a lattice was taken in Britain during the Second World War. Falkner used a grid of horseshoe vortices distributed over the wing planform and introduced the name &ldquo;vortex lattice&rdquo; in 1943 [2]; with hand calculation and mechanical desk calculators, solutions with of the order of a hundred vortices were already standard. The arrangement used today&mdash;bound vortex on the panel quarter-chord, control (collocation) point at the panel three-quarter chord, trailing legs to downstream infinity&mdash;was established by Hedman in 1965 for digital computers, with compressibility handled through the Prandtl&ndash;Glauert transformation [3]. The quarter-chord/three-quarter-chord rule (sometimes called the Pistolesi or &ldquo;1/4&ndash;3/4&rdquo; rule) is what makes a single vortex per chordwise panel reproduce the thin-aerofoil lift-curve slope of 2&pi; exactly.</p>

### 2.2 The NASA and industry codes of the 1970s

<p>The 1970s saw an explosion of VLM codes. At NASA Langley, J. E. Lamar developed vortex-lattice programs for interacting lifting surfaces and for the vortex lift of slender, sharp-edged wings using the leading-edge suction analogy [4]. C. Edward Lan introduced the quasi-vortex-lattice method (QVLM), which places vortices and control points using a Chebyshev-type distribution to resolve leading-edge singularities and leading-edge thrust more accurately [5]. At Lockheed, L. R. Miranda, R. D. Elliott and W. M. Baker produced VORLAX, a generalised vortex-lattice code for subsonic and supersonic flow that could also model thickness through a &ldquo;sandwich&rdquo; of two lattices [6], [7]. Albano and Rodden extended the lattice idea to oscillating surfaces in the doublet-lattice method (DLM) [8], which is still the standard unsteady aerodynamic model in flutter analysis. The state of the art of that period was recorded in the 1976 NASA Langley workshop on vortex-lattice utilisation, NASA SP-405 [9]. Textbook accounts appear in Katz and Plotkin [10], Bertin and Smith, Anderson, and Drela's <i>Flight Vehicle Aerodynamics</i> [11].</p>

### 2.3 What a VLM gives and does not give

<p>A VLM solves Laplace's equation for incompressible (or Prandtl&ndash;Glauert-corrected), inviscid, irrotational flow. Lifting surfaces are represented as zero-thickness vortex sheets, and the boundary condition of zero normal velocity is applied on the mean surface. The method therefore yields lift, induced drag, pitching, rolling and yawing moments, span loading and chordwise load distribution, but not viscous drag, thickness effects or flow separation [12]. These properties make it ideal for stability derivatives in the linear range, which depend primarily on the lifting-surface geometry and on the interference of downwash and sidewash between surfaces.</p>

## 3. History of AVL

### 3.1 Project Athena and the original code

<p>The name &ldquo;Athena&rdquo; comes from MIT's Project Athena, a joint programme of MIT, Digital Equipment Corporation and IBM, launched in May 1983 and run until 30 June 1991, whose purpose was to put a campus-wide, Unix-based distributed computing environment into undergraduate education [13]. The project cost about US$100 million over eight years and gave the world, among other things, the X Window System and the Kerberos authentication system [14].</p>
<p>According to the AVL documentation, AVL 1.0 was written by Harold Youngren circa 1988 as part of the &ldquo;MIT Athena TODOR&rdquo; collection of aerodynamic teaching software. The code drew on the classical work of Lamar (NASA), Lan and Miranda (VORLAX) and others. Since then Mark Drela and Harold Youngren have added so many modifications that, in the documentation's words, only &ldquo;stubborn traces&rdquo; of the original Athena code remain [15]. Drela, Professor of Fluid Dynamics at MIT and the author of XFOIL, MSES/MISES and ASWING, was elected to the US National Academy of Engineering in 2009 for aircraft designs and design software that enabled operation in new flight regimes [16]. Youngren was associated with Aerocraft, Inc.</p>

### 3.2 Release history

<p>The public web page for AVL was created on 1 September 2004 with version 3.14. Table&nbsp;1 summarises the main releases recorded on that page [17]. Two points are notable. First, development has been steady and conservative: most releases fix bugs or clarify output, so results from different 3.xx versions are generally consistent. Second, the 2014 release (3.35) added second-order right-hand-side terms to the vortex-lattice system, improving trim convergence and eigenmode results at large control deflections. The current version, 3.40b, was released on 18 April 2022 by Steven Allmaras; it adds output options and switches the matrix solver to LAPACK.</p>

<div class="tcap"><b>Table 1.</b> Main Public Releases of AVL [17]</div>

<table>
<thead><tr><th>Date</th><th>Version</th><th>Notable change</th></tr></thead>
<tbody>
<tr><td>c. 1988</td><td>1.0</td><td>Written by H. Youngren for MIT Athena TODOR collection</td></tr>
<tr><td>Sep 2004</td><td>3.14</td><td>Public web page created</td></tr>
<tr><td>Oct 2004</td><td>3.15&ndash;3.16</td><td>Compilation fixes; first Windows executable</td></tr>
<tr><td>Aug 2005</td><td>3.18</td><td>Side-force (CY) constraint added</td></tr>
<tr><td>Oct&ndash;Nov 2005</td><td>3.20&ndash;3.22</td><td>Stability-axis yaw-rate printing and Cl/Cn axis-transformation fixes; derivative output clarified</td></tr>
<tr><td>Apr 2006</td><td>3.26</td><td>Leading-edge-flap hinge moment fix</td></tr>
<tr><td>May 2008</td><td>3.27</td><td>CLAF influence removed from zero-lift angle</td></tr>
<tr><td>Apr 2011</td><td>3.31</td><td>Linux build; run-case directory</td></tr>
<tr><td>Dec 2012</td><td>3.32</td><td>Strip centre-of-pressure post-processing fixed</td></tr>
<tr><td>Feb 2014</td><td>3.35</td><td>Second-order RHS: better trim and eigenmodes at large deflections</td></tr>
<tr><td>Feb 2017</td><td>3.36</td><td>Fixes and tweaks; widely used reference version</td></tr>
<tr><td>Apr 2022</td><td>3.40b</td><td>S. Allmaras: more output, LAPACK solver</td></tr>
</tbody></table>

### 3.3 Licence and distribution

<p>AVL is distributed as Fortran and C source with executables for Linux, Windows and macOS. The web page allows anyone to copy, modify and redistribute AVL or modified versions, provided redistribution is under the terms of the GNU General Public License [17]. This licence is the reason so many derived codes and wrappers (Section&nbsp;7) can exist openly.</p>

### 3.4 The AVL family

<p>Two later MIT codes share AVL's structure and file conventions. ASWING analyses aircraft with flexible wings and fuselages of moderate to high aspect ratio, coupling aerodynamics, nonlinear beam structures and control response; it is licensed commercially through the MIT Technology Licensing Office [18]. JVL (Jet Vortex Lattice), whose page was created in May 2024, extends AVL to blown-lift configurations by modelling jet sheets of finite thickness that extend ahead of and contact the wing, together with the forces of the propulsors that create them [19]. JVL grew out of MIT's research on distributed-electric-propulsion super-short take-off and landing aircraft, where subscale flight tests demonstrated lift coefficients above 10 [20].</p>

### 3.5 Timeline

<p>Table&nbsp;2 places AVL in the wider chronology of the vortex-lattice method and the tools built around it.</p>

<div class="tcap"><b>Table 2.</b> Chronology of the Vortex-Lattice Method and the AVL Ecosystem</div>

<table>
<thead><tr><th>Year</th><th>Event</th></tr></thead>
<tbody>
<tr><td>1918&ndash;23</td><td>Prandtl lifting-line theory [1]</td></tr>
<tr><td>1943</td><td>Falkner names the &ldquo;vortex lattice&rdquo; [2]</td></tr>
<tr><td>1965</td><td>Hedman: digital VLM with 1/4&ndash;3/4 rule and Prandtl&ndash;Glauert [3]</td></tr>
<tr><td>1969</td><td>Albano &amp; Rodden doublet-lattice method [8]</td></tr>
<tr><td>1974&ndash;77</td><td>Lan QVLM [5]; Lamar codes [4]; VORLAX [6]</td></tr>
<tr><td>1976</td><td>NASA SP-405 vortex-lattice workshop [9]</td></tr>
<tr><td>1983&ndash;91</td><td>MIT Project Athena [13]</td></tr>
<tr><td>c. 1988</td><td>AVL 1.0 (Youngren) [15]</td></tr>
<tr><td>2000</td><td>Tornado VLM (Melin, KTH) [42]</td></tr>
<tr><td>2004</td><td>AVL 3.14 public web release [17]</td></tr>
<tr><td>2006</td><td>Decambering for post-stall multi-surface VLM [46]</td></tr>
<tr><td>2014</td><td>AVL 3.35: second-order RHS [17]</td></tr>
<tr><td>2015</td><td>SUAVE with AVL stability module [25]</td></tr>
<tr><td>2017</td><td>AVL 3.36 [17]</td></tr>
<tr><td>2018</td><td>PyTornado (Airinnova) [43]</td></tr>
<tr><td>2019&ndash;23</td><td>avlwrapper releases [36]</td></tr>
<tr><td>2022</td><td>AVL 3.40b (Allmaras, LAPACK) [17]</td></tr>
<tr><td>2020s</td><td>pyAVL, then OptVL with AD derivatives [21], [38]</td></tr>
<tr><td>2024</td><td>JVL for blown lift [19]</td></tr>
<tr><td>2025</td><td>ASWING Extended User Manual (ISAE) [41]</td></tr>
</tbody></table>

## 4. Formulation of AVL

### 4.1 Geometry description

<p>AVL uses a keyword-driven text file. Each <i>surface</i> is defined by two or more <i>sections</i>, each section giving the leading-edge position (X<sub>le</sub>, Y<sub>le</sub>, Z<sub>le</sub>), chord and incidence. Geometry is interpolated linearly between sections. Camber comes from a NACA four-digit designation or an aerofoil coordinate file. Surfaces can be scaled, translated, rotated, and mirrored about the y = 0 plane with <code>YDUPLICATE</code>. Fuselages and nacelles are entered as <i>bodies</i> with a radius distribution. Panel counts and spacing (uniform, sine, cosine or blended) are given per surface or section [15].</p>
<p>AVL's geometry axes have x pointing aft, y to the right wing and z up. Derivatives and moments are reported with the usual flight-dynamics sign conventions (positive roll right wing down, positive pitch nose up, positive yaw nose right).</p>

### 4.2 Singularities and boundary condition

<p>Each lifting-surface panel carries a horseshoe vortex: a bound segment along the panel quarter-chord and two trailing legs that run to downstream infinity <i>parallel to the x axis</i>. The flow-tangency condition is imposed at the three-quarter-chord control point of each panel:</p>
<p class="eq">(<b>V</b><sub>&infin;</sub> + <b>&Omega;</b> &times; <b>r</b> + &Sigma;<sub>j</sub> <b>v</b><sub>ij</sub> &Gamma;<sub>j</sub>) &middot; <b>n</b><sub>i</sub> = 0,&nbsp;&nbsp;&nbsp; i = 1 &hellip; N &nbsp;&nbsp;&nbsp;(1)</p>
<p>where <b>v</b><sub>ij</sub> is the velocity induced at control point i by a unit-strength horseshoe j (Biot&ndash;Savart law), <b>&Omega;</b> = (p, q, r) is the body rotation rate and <b>n</b><sub>i</sub> the panel normal. Note the sign of the rotation term depends on whether the velocity of the air relative to the aircraft or of the aircraft relative to the air is used; AVL works with the former. A key feature of AVL is that camber, incidence and control deflections are <i>not</i> modelled by moving the panels; instead the normal vector <b>n</b><sub>i</sub> is tilted. This keeps the influence matrix fixed for a given geometry, so control derivatives and trimmed solutions are obtained cheaply. Hinge lines may be placed independently of the panel grid [15].</p>
<p>Bodies are modelled by source and doublet line singularities along their axes (slender-body theory), and a finite-core option prevents singular velocities when a trailing leg passes close to a control point. Image surfaces, which see only perturbation velocities, are used for ground effect, wind-tunnel walls or a neighbouring aircraft.</p>

### 4.3 Forces, Trefftz plane and drag

<p>Once the circulations &Gamma;<sub>j</sub> are found from the N &times; N linear system (1), forces on each bound segment follow from the Kutta&ndash;Joukowski law,</p>
<p class="eq"><b>F</b><sub>i</sub> = &rho; &Gamma;<sub>i</sub> (<b>V</b><sub>local,i</sub> &times; <b>l</b><sub>i</sub>)&nbsp;&nbsp;&nbsp;(2)</p>
<p>where <b>l</b><sub>i</sub> is the bound-segment vector and <b>V</b><sub>local</sub> includes free stream, rotation and all induced velocities. Moments are summed about the reference point (X<sub>ref</sub>, Y<sub>ref</sub>, Z<sub>ref</sub>). Induced drag is also evaluated in the Trefftz plane far downstream, where it depends only on the trailing vorticity; the AVL documentation notes that the Trefftz-plane value CDi is generally more reliable than drag from surface-force integration [15]. Profile drag can be added through a parabolic CD(CL) polar (<code>CDCL</code>) given per section, with rapid drag rise outside the specified CL range to mimic stall, and through a constant CDp.</p>

### 4.4 Compressibility

<p>Subsonic compressibility is handled with the Prandtl&ndash;Glauert transformation: the geometry is stretched in x by 1/&beta;, &beta; = (1 &minus; M<sup>2</sup>)<sup>1/2</sup>, the incompressible problem is solved, and the results are scaled back. The AVL primer rates this treatment as valid up to about Mach 0.6, suspect at 0.7, unreliable at 0.8 and hopeless at 0.9, with the wing-perpendicular Mach number M&nbsp;cos&Lambda; as the relevant parameter for swept wings [15].</p>

### 4.5 Trim, derivatives and eigenmodes

<p>The <code>OPER</code> menu sets operating variables (&alpha;, &beta;, p&#770;, q&#770;, r&#770;, control deflections) directly or through constraints such as CL = value or Cm = 0, so trimmed states, banked turns and steady pull-ups can be computed. The <code>ST</code> command prints the stability-axis derivative matrix; <code>SB</code> prints body-axis derivatives [15]. Rate derivatives use the non-dimensional rates</p>
<p class="eq">p&#770; = pb/2V,&nbsp;&nbsp; q&#770; = qc/2V,&nbsp;&nbsp; r&#770; = rb/2V&nbsp;&nbsp;&nbsp;(3)</p>
<p>and control derivatives are given per degree of deflection. Because AVL differentiates its own linear solution analytically, the derivatives are free from finite-difference step error. The neutral point X<sub>np</sub> is printed with the <code>ST</code> output; for a configuration with a single dominant lifting surface it is equivalent to</p>
<p class="eq">X<sub>np</sub> = X<sub>ref</sub> &minus; c<sub>ref</sub> &middot; C<sub>m&alpha;</sub> / C<sub>L&alpha;</sub>&nbsp;&nbsp;&nbsp;(4)</p>
<p>and the static margin is (X<sub>np</sub> &minus; X<sub>cg</sub>)/c<sub>ref</sub>. With an optional mass file giving component masses, positions and inertias, the <code>MODE</code> menu linearises the rigid-body equations about the run case as <b>u&#775;</b> = A<b>u</b> + B<b>&delta;</b> with a 12-state vector, computes eigenvalues and eigenvectors, plots root loci against a parameter, animates the modes, and writes the A and B matrices for control-law design [15].</p>

### 4.6 Mathematical details

<p><i>Biot&ndash;Savart law for a straight segment.</i> A straight vortex filament of strength &Gamma; running from point <b>P</b><sub>1</sub> to <b>P</b><sub>2</sub> induces at a field point <b>P</b> the velocity</p>
<p class="eq"><b>v</b> = (&Gamma;/4&pi;) [(<b>r</b><sub>1</sub> &times; <b>r</b><sub>2</sub>)/|<b>r</b><sub>1</sub> &times; <b>r</b><sub>2</sub>|<sup>2</sup>] <b>r</b><sub>0</sub> &middot; (<b>r</b><sub>1</sub>/|<b>r</b><sub>1</sub>| &minus; <b>r</b><sub>2</sub>/|<b>r</b><sub>2</sub>|)&nbsp;&nbsp;&nbsp;(5)</p>
<p>with <b>r</b><sub>0</sub> = <b>P</b><sub>2</sub> &minus; <b>P</b><sub>1</sub>, <b>r</b><sub>1</sub> = <b>P</b> &minus; <b>P</b><sub>1</sub> and <b>r</b><sub>2</sub> = <b>P</b> &minus; <b>P</b><sub>2</sub> [10]. A horseshoe vortex is the sum of three such segments: a semi-infinite trailing leg arriving at the left end of the bound segment, the bound segment itself, and a semi-infinite trailing leg leaving its right end. The expression is singular on the filament line itself; AVL removes the singularity with a finite vortex core, whose size can be controlled by the user, and evaluates the semi-infinite legs in closed form.</p>
<p><i>Linear superposition and exact derivatives.</i> Writing the right-hand side of (1) explicitly, the circulation vector satisfies</p>
<p class="eq">A&Gamma; = &minus;[<b>V</b><sub>&infin;</sub> + <b>&Omega;</b> &times; (<b>r</b><sub>c</sub> &minus; <b>r</b><sub>ref</sub>)] &middot; <b>n</b>(&delta;)&nbsp;&nbsp;&nbsp;(6)</p>
<p>where A is the N &times; N aerodynamic influence coefficient matrix A<sub>ij</sub> = <b>v</b><sub>ij</sub> &middot; <b>n</b><sub>i</sub>. Because the right-hand side is linear in the three free-stream components and the three rotation components, AVL factors A once and solves for six &ldquo;unit&rdquo; circulation distributions. Any flight state is then a linear combination of these, and derivatives of &Gamma; with respect to &alpha;, &beta;, p, q, r follow by the chain rule without finite differencing. Control deflections enter through the tilted normals <b>n</b>(&delta;); to first order the tilt adds a right-hand-side term proportional to &delta;, so control derivatives are likewise obtained from additional unit solutions. The 2014 change to second-order right-hand sides keeps more terms of this expansion, which matters at large deflections [17].</p>
<p><i>Trefftz-plane drag.</i> Far downstream the trailing vortex sheet produces only cross-flow velocities. If &Gamma;(s) is the net circulation along the trace of the wake in the Trefftz plane and w<sub>n</sub>(s) the normal velocity it induces there, the induced drag is</p>
<p class="eq">D<sub>i</sub> = &minus;(&rho;/2) &int; &Gamma;(s) w<sub>n</sub>(s) ds,&nbsp;&nbsp;&nbsp; CD<sub>i</sub> = CL<sup>2</sup>/(&pi;Ae)&nbsp;&nbsp;&nbsp;(7)</p>
<p>which defines the span efficiency e. The far-field evaluation does not involve the large, nearly cancelling suction and pressure forces of the near field, which explains why it is more reliable than surface integration.</p>
<p><i>Slender bodies.</i> For a body of local cross-sectional area S<sub>b</sub>(x) in a cross-flow, slender-body theory gives a local normal-force distribution proportional to d(S<sub>b</sub>V<sub>n</sub>)/dx. AVL represents the body by a line of sources (for displacement) and doublets (for cross-flow), and the body influences and is influenced by the lattice. A well-known consequence of slender-body theory is that a closed body produces no net normal force but a destabilising pitching and yawing moment; this is the main reason that adding a fuselage moves the neutral point forward and reduces C<sub>n&beta;</sub>.</p>

### 4.7 Cost

<p>The cost of the method is dominated by forming and factoring A, O(N<sup>2</sup>) and O(N<sup>3</sup>) respectively. For typical UAV and aircraft models with 500&ndash;3000 vortices, a complete run including all derivative unit solutions takes well under a second on a current laptop, which is why AVL is suitable for interactive design and for inner loops of optimisation.</p>

## 5. Using AVL to Obtain Stability Derivatives

### 5.1 Workflow

<p>The working sequence that the author and most users follow is shown below. It is simple, but each step has a known trap.</p>
<ol>
<li><b>Choose reference quantities.</b> S<sub>ref</sub>, c<sub>ref</sub> (mean aerodynamic chord) and b<sub>ref</sub> must match those used in the flight-dynamics model that will consume the derivatives. A mismatch silently rescales every coefficient.</li>
<li><b>Set the moment reference.</b> X<sub>ref</sub> is normally the centre of gravity of the loading case under study. Moment derivatives (C<sub>m&alpha;</sub>, C<sub>mq</sub>, C<sub>n&beta;</sub>, C<sub>nr</sub> &hellip;) depend on it; force derivatives do not.</li>
<li><b>Model the surfaces.</b> Wing, horizontal and vertical tails, canards, winglets, with control surfaces defined by <code>CONTROL</code> lines (hinge position as a fraction of chord, gain and sign of duplicate: &minus;1 for ailerons, +1 for elevator).</li>
<li><b>Decide on the fuselage.</b> Either a slender body, or&mdash;as the primer recommends when the fuselage has little aerodynamic influence&mdash;omit it but carry the wing lattice across the centreline [15].</li>
<li><b>Lay out the lattice.</b> Cosine spacing chordwise and spanwise; cluster at tips, taper breaks and control-surface edges; align spanwise stations of surfaces that lie one behind the other so that trailing legs do not pass near downstream control points [15].</li>
<li><b>Trim.</b> In <code>OPER</code>, constrain CL to W/(qS) and Cm to zero with the elevator; for lateral cases constrain bank, roll and yaw moments.</li>
<li><b>Extract derivatives.</b> <code>ST</code> (stability axes) or <code>SB</code> (body axes); save to file for parsing.</li>
<li><b>Check convergence</b> by repeating with about twice the panel count.</li>
<li><b>Run modes</b> with a mass file, or transfer the derivatives to an external six-degree-of-freedom simulation.</li>
</ol>

### 5.2 Typical output and its meaning

<p>The <code>ST</code> listing gives, about the trimmed state, the derivatives of CL, CY, Cl, Cm and Cn with respect to &alpha; and &beta;, with respect to p&#770;, q&#770;, r&#770; and with respect to every control variable, plus the neutral point. Table&nbsp;3 summarises how these are used.</p>

<div class="tcap"><b>Table 3.</b> Key AVL Derivatives and Their Use</div>

<table>
<thead><tr><th>Derivative</th><th>Physical meaning</th><th>Used for</th></tr></thead>
<tbody>
<tr><td>C<sub>L&alpha;</sub>, C<sub>m&alpha;</sub></td><td>lift and pitch stiffness</td><td>neutral point, short-period frequency</td></tr>
<tr><td>C<sub>Lq</sub>, C<sub>mq</sub></td><td>pitch damping (tail)</td><td>short-period damping</td></tr>
<tr><td>C<sub>Y&beta;</sub>, C<sub>n&beta;</sub></td><td>side force, weathercock stability</td><td>Dutch-roll frequency</td></tr>
<tr><td>C<sub>l&beta;</sub></td><td>dihedral effect</td><td>spiral, Dutch roll</td></tr>
<tr><td>C<sub>lp</sub></td><td>roll damping</td><td>roll-mode time constant</td></tr>
<tr><td>C<sub>np</sub>, C<sub>lr</sub></td><td>yaw-due-to-roll, roll-due-to-yaw</td><td>spiral and Dutch-roll coupling</td></tr>
<tr><td>C<sub>nr</sub></td><td>yaw damping</td><td>Dutch-roll damping, spiral</td></tr>
<tr><td>C<sub>m&delta;e</sub>, C<sub>l&delta;a</sub>, C<sub>n&delta;r</sub></td><td>control power</td><td>trim, manoeuvre, actuator sizing</td></tr>
<tr><td>C<sub>n&delta;a</sub></td><td>adverse aileron yaw</td><td>coordination, rudder sizing</td></tr>
</tbody></table>

### 5.3 Practical cautions

<p>Several recurring errors are worth recording. (i) AVL's rate derivatives are per unit of p&#770; = pb/2V, so dimensional derivatives need the factor b/2V or c/2V. (ii) Stability-axis and body-axis derivatives differ when &alpha; is not small; external simulations usually want one or the other consistently. (iii) Control derivatives are per degree and the sign follows the hinge-vector convention; a positive deflection with the default hinge vector is trailing edge down. (iv) The &alpha;&#775; and &beta;&#775; derivatives are <i>not</i> produced, because AVL is quasi-steady; they must be estimated separately (Section&nbsp;8.6). (v) The AVL primer gives validity ranges for the rotation rates of about |p&#770;| &lt; 0.10, |q&#770;| &lt; 0.03 and |r&#770;| &lt; 0.25 [15]. (vi) Output files print about four significant digits, which is inadequate for finite-difference gradients in optimisation [21].</p>

### 5.4 Modelling guidelines for particular configurations

<p><i>Conventional tail-aft aircraft.</i> The main risk is the horizontal tail lying in or very near the plane of the wing wake. Because AVL's trailing legs are straight and parallel to x, a tail in the wing plane sees trailing legs passing through or very close to its control points. The remedies listed in the primer&mdash;matching spanwise spacing so that trailing legs fall between control points, using finite cores, or giving wing and tail the same <code>COMPONENT</code> index so they are treated as one lattice&mdash;should be applied, and the vertical offset of the tail should be modelled correctly [15]. A small vertical offset changes the downwash at the tail noticeably and hence C<sub>m&alpha;</sub>.</p>
<p><i>T-tails and V-tails.</i> T-tails are handled well because the horizontal surface sits clear of the wing wake and its end-plate interaction with the fin is captured by the lattice. V-tails (ruddervators) should be modelled as two inclined surfaces with a single control variable whose gain on the duplicated side is &plusmn;1 depending on whether the pitch or the yaw function is being represented; two separate control variables (one symmetric, one antisymmetric) with appropriate gains are clearer.</p>
<p><i>Flying wings and tailless aircraft.</i> AVL is well suited to flying wings because the stability derivatives depend on sweep, twist and the span load, all of which the lattice resolves. Elevons are defined with two control variables using <code>SgnDup</code> = +1 (pitch) and &minus;1 (roll). Winglets and fins at the tips should be lattices of their own with spacing matched at the junction. Because the static margin of a flying wing is small, C<sub>m&alpha;</sub> must be converged carefully, and the influence of a centre body (if any) on C<sub>m&alpha;</sub> is significant.</p>
<p><i>Canards and tandem wings.</i> The canard wake strikes the main wing; with straight, x-parallel trailing legs this interaction can be over- or under-predicted depending on the vertical gap. Results for close-coupled canards at moderate &alpha; should be checked against higher-fidelity tools.</p>
<p><i>High-lift and multi-surface controls.</i> Flaps, flaperons, spoilers modelled as negative camber, and differential elevators are all possible with additional control variables. Hinge moments are printed per control variable and are useful for actuator sizing, with the caveat that viscous effects on hinge moments are large.</p>
<p><i>Fuselage decisions.</i> For small UAVs with slender pods, the author's practice and the primer's advice coincide: omit the body, continue the wing through the centreline, and add empirical fuselage increments to C<sub>m&alpha;</sub> and C<sub>n&beta;</sub> from handbook methods. For transport aircraft with large fuselages, include the slender body and compare with a panel or CFD solution at least once.</p>
<p><i>Ground effect and wind-tunnel walls.</i> Setting the symmetry flag about a z-plane (<code>IZsym</code>, <code>Zsym</code>) introduces an image aircraft for ground effect; image surfaces can also represent wind-tunnel walls when AVL is used to correct or plan tunnel tests [15].</p>

### 5.5 From AVL derivatives to a six-degree-of-freedom model

<p>AVL derivatives are non-dimensional. For a simulation or a linear model in the conventional form X = m(u&#775; + &hellip;), the dimensional derivatives are obtained with the dynamic pressure Q = &frac12;&rho;V<sup>2</sup>. For example, in stability axes [54]:</p>
<p class="eq">Z<sub>w</sub> = &minus;QS(C<sub>L&alpha;</sub> + C<sub>D</sub>)/(mV),&nbsp;&nbsp; M<sub>w</sub> = QS c C<sub>m&alpha;</sub>/(I<sub>yy</sub>V)&nbsp;&nbsp;&nbsp;(8)</p>
<p class="eq">M<sub>q</sub> = QS c<sup>2</sup> C<sub>mq</sub>/(2I<sub>yy</sub>V),&nbsp;&nbsp; L<sub>p</sub> = QS b<sup>2</sup> C<sub>lp</sub>/(2I<sub>xx</sub>V)&nbsp;&nbsp;&nbsp;(9)</p>
<p>where the factor 2 in (9) comes from the non-dimensional rates (3). Three further points are important when transferring AVL data. First, the drag model must be completed: AVL's CDi plus a profile-drag polar from aerofoil data or handbook estimates. Second, the speed derivatives (C<sub>Lu</sub>, C<sub>mu</sub>) are zero in AVL's incompressible, rigid, power-off model; compressibility, aeroelastic and thrust effects that create them must be added if relevant. Third, for nonlinear simulation it is common to run AVL over a grid of &alpha;, &beta; and control deflections and store the results as lookup tables, accepting that the tables remain linear in the physics and must be blended with stall models at high &alpha;. The PX4 Advanced Lift Drag plugin is an example of exactly this blending: AVL supplies the attached-flow coefficients and the user supplies stall parameters [22].</p>

### 5.6 Physical origin of the derivatives in a vortex-lattice model

<p>It helps to know where each derivative comes from inside the lattice, because that tells the user which geometric feature controls it and which physics AVL may be missing.</p>
<p><i>Pitch stiffness C<sub>m&alpha;</sub>.</i> It is the sum of a wing term, normally destabilising when the CG lies aft of the wing aerodynamic centre, and a tail term reduced by the downwash gradient d&epsilon;/d&alpha; at the tail. The VLM computes the downwash directly from the wing's trailing legs, which is one of its main advantages over handbook methods; but because the legs are straight and in the x direction, the vertical position of the tail relative to the real, deflected wake is approximate.</p>
<p><i>Pitch damping C<sub>mq</sub>.</i> In a steady pitch rate, each panel sees an additional normal velocity proportional to its distance from the CG. The tail, far aft, sees the largest change in angle of attack and produces almost all the damping; the wing contribution is small. The lag of the wing downwash at the tail during unsteady pitching is the separate C<sub>m&alpha;&#775;</sub> term that AVL omits.</p>
<p><i>Roll damping C<sub>lp</sub>.</i> A rolling wing has an antisymmetric angle-of-attack distribution increasing linearly to the tips, and the resulting antisymmetric lift opposes the roll. A lattice resolves the antisymmetric span load and its induced velocities accurately, so C<sub>lp</sub> is usually one of AVL's best derivatives.</p>
<p><i>Dihedral effect C<sub>l&beta;</sub>.</i> In sideslip, geometric dihedral gives the leading wing a higher normal velocity component and hence more lift; sweep adds a similar effect proportional to C<sub>L</sub>; a fin above the roll axis adds a further negative contribution. AVL captures these. The large effect of wing vertical position on the fuselage (high wing stabilising, low wing destabilising) is a fuselage cross-flow effect and is not captured unless a body is modelled.</p>
<p><i>Weathercock stability C<sub>n&beta;</sub> and yaw damping C<sub>nr</sub>.</i> These are dominated by the fin. The fin's effectiveness depends on its aspect ratio, including the end-plate effect of the horizontal tail and fuselage, and on the sidewash, all of which the lattice models. The fuselage's destabilising yaw moment and the wing's profile-drag contribution to C<sub>nr</sub> are missing.</p>
<p><i>Cross derivatives C<sub>np</sub> and C<sub>lr</sub>.</i> In a roll, the down-going wing's lift vector tilts forward and the up-going wing's tilts aft (induced-drag asymmetry), producing adverse yaw C<sub>np</sub>; in yaw the advancing wing sees higher dynamic pressure, giving C<sub>lr</sub> &asymp; C<sub>L</sub>/4 for a straight wing. Both are lift-dependent and are captured, but the profile-drag parts are not.</p>

## 6. Current Usage

### 6.1 Education and student design

<p>AVL's origin as teaching software has persisted. It is widely used in university aircraft-design, flight-mechanics and capstone courses, as well as in student competitions where teams must size tails and controls of small aircraft. Its text interface makes the link between geometry, derivatives and modes transparent in a way that a graphical CFD package often hides.</p>

### 6.2 UAV development and flight simulation

<p>For small UAVs, wind-tunnel testing is often unaffordable and flight-test identification is difficult because light aircraft are sensitive to gusts and carry low-cost instrumentation. AVL is therefore commonly the primary source of the aerodynamic model used for autopilot tuning and simulation. A recent example in the open-source world is PX4: its Gazebo &ldquo;Advanced Lift Drag&rdquo; plugin for fixed-wing simulation can be populated by an automation tool that writes an AVL geometry from a few user parameters, runs AVL 3.36, and parses the stability- and body-axis derivative files into the plugin's coefficients [22]. The PX4 documentation is candid that AVL cannot predict stall, so stall values must be estimated another way, and that the generated parameters have not been verified by an expert [22]. Researchers have also used AVL to build high-fidelity stochastic flight simulators for autonomous fixed-wing aircraft [23], and VLM-derived damping derivatives often provide the starting values for system identification from flight tests, as in the NTNU modelling of the Skywalker X8 [24].</p>

### 6.3 Conceptual design frameworks

<p>AVL is called from several multidisciplinary design environments. Stanford's SUAVE (now continued as RCAIDE) uses AVL for stability analysis within a multi-fidelity conceptual design framework [25], and SUAVE-based flight-simulator studies at Imperial College have used it to assess conceptual transport designs [26]. AeroSandbox from MIT provides both its own differentiable VLM and an interface that writes AVL input, runs it and parses the results [27], [28]. Theses continue to apply AVL to configurations as varied as a Boeing 737-800 stability study [29] and the flight-mechanics database of a fifth-generation fighter concept [30].</p>

### 6.4 Validation experience reported in the literature

<p>Many studies compare AVL with wind-tunnel, flight or CFD data. A comparison for a power-off propeller-driven cargo aircraft found good agreement of the static longitudinal and lateral-directional derivatives with wind-tunnel data [31]. A University of Minnesota study evaluated VLM and Digital DATCOM (within the CEASIOM suite) against wind-tunnel data for the Ultra Stick 120 UAV [32]. A TU Munich study on the T-FLEX UAV compared AVL, XFLR5, Tornado, PyTornado, VSPAERO, PAWAT and the panel code FlightStream against STAR-CCM+ RANS as reference; it notes as an advantage of AVL its slender-body fuselage model and as an intrinsic limitation its restriction to inviscid flow [33]. A comparison of VLM codes for joined-wing and closed-wing configurations found AVL to give the most correct results, with Tornado providing useful supplementary information [34]. In the author's reading of these studies and of his own experience, the picture is consistent: lift and moment slopes, neutral point, roll damping and control effectiveness in the linear range typically agree with experiment to within about 5&ndash;15 %, while yaw-related derivatives (C<sub>n&beta;</sub>, C<sub>nr</sub>) and anything influenced by the fuselage, propeller slipstream or separation show the largest scatter. Work on the Flying-V subscale model at TU Delft likewise concluded that VLM and panel tools cannot reproduce the nonlinearities seen in the wind tunnel [35].</p>

### 6.5 Where AVL sits among the available methods

<p>Table&nbsp;4 places AVL among the methods used to estimate stability and control derivatives. Each has its place in a programme; the choice depends on what quantity is needed, at what stage, and with what confidence.</p>

<div class="tcap"><b>Table 4.</b> Methods for Stability and Control Derivatives &ndash; Indicative Comparison</div>

<table>
<thead><tr><th>Method</th><th>Typical cost per case</th><th>Captures</th><th>Misses</th><th>Best use</th></tr></thead>
<tbody>
<tr><td>Handbook (DATCOM, ESDU)</td><td>seconds</td><td>empirical fuselage, stall and power effects for conventional layouts</td><td>novel configurations, interference outside database</td><td>first estimates, fuselage increments, cross-checks</td></tr>
<tr><td>Lifting line / strip</td><td>milliseconds</td><td>span load, roll damping of straight wings</td><td>sweep, low AR, surface interference</td><td>quick sizing, rotor and propeller blades</td></tr>
<tr><td>VLM (AVL)</td><td>&lt; 1 s</td><td>planform, sweep, dihedral, twist, multi-surface interference, controls, rates</td><td>viscosity, thickness, separation, unsteady terms</td><td>configuration development, tail and control sizing, linear models</td></tr>
<tr><td>3D panel (FlightStream, VSPAERO panel, PANAIR)</td><td>seconds&ndash;minutes</td><td>thickness, fuselage and nacelle shape</td><td>viscosity (unless coupled), separation</td><td>body-dominated configurations, pressure loads</td></tr>
<tr><td>Euler / RANS CFD</td><td>hours per case</td><td>compressibility, viscous drag, separation onset</td><td>cost limits number of cases; dynamic derivatives need special methods</td><td>critical points, nonlinear regime, validation of low-order data</td></tr>
<tr><td>Wind tunnel (static, forced oscillation)</td><td>weeks</td><td>all physics at model scale</td><td>Reynolds scaling, support interference</td><td>design freeze, simulator database</td></tr>
<tr><td>Flight-test identification</td><td>months</td><td>full-scale real aircraft</td><td>poorly excited terms; noisy for small UAVs</td><td>final model, certification, controller tuning</td></tr>
</tbody></table>

<p>The pattern that results is a fidelity ladder in which AVL occupies the widest band of the early programme. In practice it is used to set geometry, then corrected with handbook fuselage terms and spot CFD, and finally replaced, term by term, by tunnel and flight data. The value of keeping an AVL model alive throughout is that it explains <i>why</i> a derivative has its value and how it would change with a geometric modification, which test data alone cannot do.</p>

## 7. Improvements and Extensions by Other Researchers

<p>Because AVL is open and GPL-licensed, and because the VLM itself is well understood, a substantial ecosystem has grown around it. The contributions fall into five groups.</p>

### 7.1 Scripting and automation wrappers

<p>AVL's interactive menu interface is efficient for a single case but awkward for sweeps of hundreds of cases. Several Python wrappers drive the executable through command scripts and parse its output: <i>avlwrapper</i> (released from 2019, version 0.4.0 in 2023) provides geometry definition, case definition, running and result parsing [36]; <i>avl-aero-tables</i> generates aerodynamic lookup tables for simulation by driving AVL through standard input and parsing the <code>.st</code> files [37]; AeroSandbox and SUAVE include their own AVL interfaces [27], [25]. These wrappers are simple and robust but inherit the I/O bottleneck and four-digit output precision.</p>

### 7.2 Compiled Python interfaces and automatic differentiation

<p>A deeper improvement was made by J. Anibal. <i>pyAVL</i> wrapped a stripped-down AVL in Python through f2py, giving direct access to all internal data in full double precision rather than the four digits of the text output [21]. Its successor <i>OptVL</i> is described as a modified version of AVL with a Python wrapper and algorithmic-differentiation routines; it provides total derivatives of forces, control-surface derivatives and stability derivatives with respect to geometric and aerodynamic design variables, intended for gradient-based optimisation through SciPy or OpenMDAO, and post-processing through ParaView and Tecplot [38], [39]. This turns AVL from an analysis code into an optimisation component, for example to size a tail for a prescribed static margin and Dutch-roll damping in one gradient-based run.</p>

### 7.3 Sister and successor codes

<p>Within MIT, ASWING [18] couples the same type of lifting-line/vortex aerodynamics with geometrically nonlinear beams to treat very flexible aircraft&mdash;a class whose importance was underlined by the 2003 break-up of NASA's Helios solar UAV [40]. Recent independent documentation and validation of ASWING from ISAE-SUPAERO has broadened its use [41]. JVL [19] adds jet-sheet modelling for blown lift. Outside MIT, Tornado (Melin, KTH, MATLAB, from 2000) offered a high-level-language VLM with a seven-segment horseshoe and was later re-implemented in a platform-independent C/Python form at Airinnova as PyTornado [42], [43]. XFLR5 combines XFOIL-based aerofoil polars with VLM and 3D panel methods in a graphical tool popular for model aircraft and sailplanes. NASA's VSPAERO, built into OpenVSP, runs vortex-lattice or panel solutions directly from parametric CAD geometry and can perform unsteady oscillation cases; in its unsteady q and r analyses it returns the combined damping terms (C<sub>mq</sub> + C<sub>m&alpha;&#775;</sub>), something AVL cannot provide [44], [45].</p>

### 7.4 Physics extensions in the vortex-lattice framework

<p><i>Nonlinear and post-stall aerodynamics.</i> The most active line of work couples the VLM with two-dimensional viscous section data. In the &ldquo;decambering&rdquo; approach developed at North Carolina State University by Gopalarathnam and co-workers, separation is represented as an effective loss of camber in each strip, iterated until the VLM section lift matches the viscous section curve at the effective angle of attack; it predicts lift beyond stall for wing&ndash;tail and wing&ndash;canard configurations [46], [47], and later versions predict the separation pattern itself [48]. An Airbus study generalised the van Dam &alpha;-method to compute complete empennage polars up to and beyond stall using 2.5D polars derived from 2D data [49]. Unsteady VLMs with decambering have been developed for dynamic post-stall prediction [50].</p>
<p><i>Compressibility.</i> Melin and Isikveren proposed a Prandtl&ndash;Glauert-based correction specifically for induced drag in VLMs at high subsonic Mach numbers, noting that higher-order corrections need surface pressure coefficients that a thin-surface VLM does not provide [51].</p>
<p><i>Thickness.</i> VORLAX-type double lattices can represent thickness effects that single-sheet codes such as AVL neglect, a point argued strongly by Takahashi for transonic and high-speed configurations [7].</p>
<p><i>Propeller slipstream.</i> TU Delft researchers have developed improved VLMs coupled to slipstream-tube models, including corrections for the finite slipstream height seen by wing sections, to predict propeller&ndash;wing interaction in distributed-propulsion aircraft [52].</p>
<p><i>Unsteady wakes and rotors.</i> Unsteady VLMs with free wakes, sometimes coupled to vortex-particle methods, are now used for rotors and multirotors [53]&mdash;a regime far outside AVL's fixed-wake, quasi-steady model.</p>

### 7.5 Fusion with experiment and identification

<p>Practitioners increasingly treat AVL as a prior rather than the final answer: VLM derivatives seed system identification from flight data, and only the poorly predicted terms (typically yaw damping and some cross derivatives) are updated from tests [24]. This &ldquo;grey-box&rdquo; use plays to AVL's strengths in the linear terms while accepting its limits.</p>

<div class="tcap"><b>Table 5.</b> AVL and Related Low-Order Codes Compared</div>

<table>
<thead><tr><th>Code</th><th>Origin</th><th>Method</th><th>Strengths</th><th>Limitations</th></tr></thead>
<tbody>
<tr><td>AVL 3.40b</td><td>MIT (Drela, Youngren)</td><td>VLM + slender body</td><td>robust, fast, full derivative matrix, trim, eigenmodes, GPL</td><td>quasi-steady, inviscid, x-parallel wake, text I/O</td></tr>
<tr><td>pyAVL / OptVL</td><td>J. Anibal</td><td>AVL core in Python</td><td>double precision; AD design sensitivities</td><td>same physics as AVL</td></tr>
<tr><td>JVL</td><td>MIT</td><td>AVL + jet sheets</td><td>blown lift, propulsor forces</td><td>new; limited validation base</td></tr>
<tr><td>ASWING</td><td>MIT</td><td>lifting line + nonlinear beams</td><td>flexible aircraft, gusts, ROM output</td><td>commercial licence</td></tr>
<tr><td>Tornado / PyTornado</td><td>KTH / Airinnova</td><td>VLM</td><td>high-level language, teaching</td><td>slower; no slender body</td></tr>
<tr><td>XFLR5</td><td>open source</td><td>LLT, VLM, 3D panel + XFOIL</td><td>viscous polars, GUI</td><td>limited scripting</td></tr>
<tr><td>VSPAERO</td><td>NASA / OpenVSP</td><td>VLM or panel</td><td>CAD integration, unsteady damping</td><td>robustness and speed criticised in early versions [27]</td></tr>
<tr><td>AeroSandbox</td><td>MIT (Sharpe)</td><td>differentiable VLM, LLT</td><td>end-to-end AD design optimisation</td><td>own solvers less validated than AVL</td></tr>
</tbody></table>

## 8. Worked Example: Stability Derivatives of a Small UAV

### 8.1 Configuration

<p>A conventional small UAV representative of survey and mapping aircraft was chosen (Table&nbsp;6). The wing has 2 m span, root chord 0.26 m, tip chord 0.18 m, 3&deg; dihedral, NACA 2410 camber, 2&deg; root incidence washing out to 0&deg; at the tip, and plain ailerons on the outer half span aft of 75 % chord. The horizontal tail (0.6 m span, set at &minus;1&deg;) carries a 40 %-chord elevator; the vertical tail carries a 40 %-chord rudder. The fuselage is omitted and the wing lattice carried across the centreline, as the AVL primer recommends for a fuselage of small aerodynamic influence [15]. The complete AVL input file is listed in Appendix A, so the case can be rerun in AVL directly.</p>

<div class="figrow one"><figure id="fig-1"><a class="zoom" href="img/avl-athena-vortex-lattice-review/fig1_lattice.png" target="_blank" rel="noopener"><img src="img/avl-athena-vortex-lattice-review/fig1_lattice.png" alt="Top view of the 388-panel UAV lattice: bound vortices (blue), control-surface panels (orange), control points (dots), CG and neutral point." loading="lazy" style="background:#fff;width:100%;max-width:640px"></a><figcaption><b>Figure 1.</b> Top view of the 388-panel UAV lattice: bound vortices (blue), control-surface panels (orange), control points (dots), CG and neutral point.<span class="credit">Chart by the author</span></figcaption></figure></div>

<div class="tcap"><b>Table 6.</b> Worked-Example UAV Data</div>

<table>
<thead><tr><th>Quantity</th><th>Value</th></tr></thead>
<tbody>
<tr><td>Mass m</td><td>3.2 kg</td></tr>
<tr><td>S<sub>ref</sub>, c<sub>ref</sub>, b<sub>ref</sub></td><td>0.44 m<sup>2</sup>, 0.222 m, 2.0 m</td></tr>
<tr><td>Aspect ratio</td><td>9.1</td></tr>
<tr><td>CG (X<sub>ref</sub>, AVL axes)</td><td>0.115 m aft of wing root LE</td></tr>
<tr><td>I<sub>xx</sub>, I<sub>yy</sub>, I<sub>zz</sub></td><td>0.32, 0.22, 0.52 kg m<sup>2</sup></td></tr>
<tr><td>Flight condition</td><td>V = 18 m/s, &rho; = 1.15 kg/m<sup>3</sup></td></tr>
<tr><td>Profile drag (assumed)</td><td>CD<sub>0</sub> = 0.032</td></tr>
<tr><td>Horizontal tail volume V<sub>H</sub></td><td>&asymp; 0.67</td></tr>
</tbody></table>

### 8.2 Computational note

<p>The AVL executable could not be run in the environment where this paper was prepared. The numbers below were therefore computed with an independent Python implementation written for this paper (<code>vlm_uav.py</code>) that follows AVL's formulation exactly as described in Section&nbsp;4: horseshoe vortices with bound legs on the panel quarter-chord and trailing legs parallel to the body x axis; control points at three-quarter chord; camber, incidence and control deflections by normal-vector tilting about the panel spanwise axis; rotation rates in stability axes non-dimensionalised as in (3); Kutta&ndash;Joukowski forces using the full local velocity on each bound leg; Trefftz-plane induced drag; and cosine spacing. Derivatives were obtained by central differences of &plusmn;0.5&deg; in &alpha; and &beta;, &plusmn;0.01 in the non-dimensional rates and &plusmn;1&deg; in controls, which for a linear model reproduces the analytical derivatives to round-off. Readers with AVL 3.40b can run Appendix A and should see differences of the order of the lattice-convergence error in Table&nbsp;7; a slender-body fuselage, if added, would shift C<sub>m&alpha;</sub> and C<sub>n&beta;</sub> noticeably in the destabilising direction.</p>

### 8.3 Validation of the lattice formulation

<p>Before trusting derivatives, the solver was checked against classical results for an untwisted flat wing of aspect ratio 6 (Figure&nbsp;2). For the elliptic planform the computed lift-curve slope converges from above towards about 4.42 per radian, within 2.5 % of Helmbold's lifting-surface estimate C<sub>L&alpha;</sub> = 2&pi;A/[2 + (A<sup>2</sup> + 4)<sup>1/2</sup>] = 4.53, and the Trefftz span efficiency converges towards the theoretical value e = 1 (1.081, 1.039, 1.018 as panels are doubled and redoubled, halving the error each time). The rectangular planform converges to a lower slope of about 4.27, as expected for a planform with more tip loss. Note that a coarse lattice <i>over-predicts</i> span efficiency&mdash;consistent with the primer's warning that crude spacing overpredicts span efficiency and converges slowly [15]&mdash;so induced-drag estimates from coarse AVL models should be treated with suspicion.</p>

<div class="figrow one"><figure id="fig-2"><a class="zoom" href="img/avl-athena-vortex-lattice-review/fig2_validation.png" target="_blank" rel="noopener"><img src="img/avl-athena-vortex-lattice-review/fig2_validation.png" alt="Convergence of lift-curve slope and Trefftz span efficiency for flat AR 6 wings against Helmbold&#x27;s estimate and e = 1." loading="lazy" style="background:#fff;width:100%;max-width:640px"></a><figcaption><b>Figure 2.</b> Convergence of lift-curve slope and Trefftz span efficiency for flat AR 6 wings against Helmbold's estimate and e = 1.<span class="credit">Chart by the author</span></figcaption></figure></div>

### 8.4 Lattice convergence for the UAV

<p>Table&nbsp;7 gives the key derivatives for four lattices from 97 to 1552 panels (Figure&nbsp;1 shows the 388-panel layout). The neutral point moves by about 1 mm between the second and fourth lattice (3 mm over the whole range), and C<sub>lp</sub> by 2 %. C<sub>m&alpha;</sub> is the most mesh-sensitive term because it is a small difference of large wing and tail contributions; this is a general feature and a reason always to report the static margin together with a convergence check. The 873-panel lattice was used for the results that follow.</p>

<div class="tcap"><b>Table 7.</b> Lattice Convergence of Key UAV Derivatives (&alpha; = 2&deg;)</div>

<table><thead><tr><th>Panels</th><th>C<sub>L&alpha;</sub></th><th>C<sub>m&alpha;</sub></th><th>X<sub>np</sub> [m]</th><th>C<sub>n&beta;</sub></th><th>C<sub>lp</sub></th></tr></thead><tbody><tr><td>97</td><td>5.474</td><td>-1.017</td><td>0.1562</td><td>0.1247</td><td>-0.5829</td></tr><tr><td>388</td><td>5.391</td><td>-0.956</td><td>0.1544</td><td>0.1190</td><td>-0.5625</td></tr><tr><td>873</td><td>5.357</td><td>-0.929</td><td>0.1535</td><td>0.1171</td><td>-0.5545</td></tr><tr><td>1552</td><td>5.339</td><td>-0.916</td><td>0.1531</td><td>0.1162</td><td>-0.5502</td></tr></tbody></table>

### 8.5 Trim and derivative matrix

<p>At 18 m/s the required lift coefficient is CL = W/(qS) = 0.383. Trimming CL and Cm with the elevator gives &alpha; = 1.19&deg; and &delta;<sub>e</sub> = 2.72&deg; (trailing edge down), with Trefftz induced drag CDi = 0.0051. The neutral point is at X<sub>np</sub> = 0.153 m, giving a static margin of 17.0 % of c<sub>ref</sub>&mdash;a comfortable value for a small UAV. Figure&nbsp;3 shows the linear CL and Cm variation (AVL is linear by construction; stall must come from elsewhere), and Figure&nbsp;4 shows that the washed-out, tapered wing produces a span load close to elliptic.</p>

<div class="figrow one"><figure id="fig-3"><a class="zoom" href="img/avl-athena-vortex-lattice-review/fig3_alpha_sweep.png" target="_blank" rel="noopener"><img src="img/avl-athena-vortex-lattice-review/fig3_alpha_sweep.png" alt="CL and Cm against  at the trim elevator setting. The dotted line marks the trim angle." loading="lazy" style="background:#fff;width:100%;max-width:640px"></a><figcaption><b>Figure 3.</b> CL and Cm against &alpha; at the trim elevator setting. The dotted line marks the trim angle.<span class="credit">Chart by the author</span></figcaption></figure></div>

<div class="figrow one"><figure id="fig-4"><a class="zoom" href="img/avl-athena-vortex-lattice-review/fig4_spanload.png" target="_blank" rel="noopener"><img src="img/avl-athena-vortex-lattice-review/fig4_spanload.png" alt="Wing span load at trim compared with an elliptic distribution." loading="lazy" style="background:#fff;width:100%;max-width:640px"></a><figcaption><b>Figure 4.</b> Wing span load at trim compared with an elliptic distribution.<span class="credit">Chart by the author</span></figcaption></figure></div>

<p>Table&nbsp;8 lists the derivative set in the format of an AVL <code>ST</code> listing (stability axes; rate derivatives per unit non-dimensional rate; control derivatives per degree). All signs are physically consistent: positive weathercock stability C<sub>n&beta;</sub>, stable dihedral effect C<sub>l&beta;</sub> &lt; 0 from the 3&deg; dihedral, strong roll damping C<sub>lp</sub> from the AR 9 wing, positive C<sub>lr</sub> from the asymmetric lift in a yawing turn, and adverse aileron yaw C<sub>n&delta;a</sub> &gt; 0.</p>

<div class="tcap"><b>Table 8.</b> Stability and Control Derivatives at Trim (Stability Axes, &alpha; = 1.19&deg;, X<sub>ref</sub> = 0.115 m, 873 Panels)</div>

<table><thead><tr><th>w.r.t.</th><th>C<sub>L</sub></th><th>C<sub>Y</sub></th><th>C<sub>l</sub></th><th>C<sub>m</sub></th><th>C<sub>n</sub></th></tr></thead><tbody><tr><td>&alpha; [1/rad]</td><td>5.3648</td><td>&ndash;</td><td>&ndash;</td><td>-0.9130</td><td>&ndash;</td></tr><tr><td>&beta; [1/rad]</td><td>&ndash;</td><td>-0.2786</td><td>-0.0602</td><td>&ndash;</td><td>0.1190</td></tr><tr><td>p&#770;</td><td>&ndash;</td><td>-0.0647</td><td>-0.5555</td><td>&ndash;</td><td>-0.0389</td></tr><tr><td>q&#770;</td><td>9.0168</td><td>&ndash;</td><td>&ndash;</td><td>-22.4388</td><td>&ndash;</td></tr><tr><td>r&#770;</td><td>&ndash;</td><td>0.2847</td><td>0.1024</td><td>&ndash;</td><td>-0.1213</td></tr><tr><td>&delta;<sub>a</sub> [1/deg]</td><td>&ndash;</td><td>-0.00063</td><td>-0.00661</td><td>&ndash;</td><td>0.00009</td></tr><tr><td>&delta;<sub>e</sub> [1/deg]</td><td>0.00948</td><td>&ndash;</td><td>&ndash;</td><td>-0.03641</td><td>&ndash;</td></tr><tr><td>&delta;<sub>r</sub> [1/deg]</td><td>&ndash;</td><td>-0.00370</td><td>-0.00019</td><td>&ndash;</td><td>0.00171</td></tr></tbody><tfoot><tr><td colspan="6">Neutral point X<sub>np</sub> = 0.1528 m; static margin 17.0 %; CDi (Trefftz) = 0.00510. &ldquo;&ndash;&rdquo; = zero by symmetry.</td></tr></tfoot></table>

### 8.6 Dynamic modes

<p>The derivatives were inserted into the standard decoupled small-perturbation equations in stability axes (u, w, q, &theta; and v, p, r, &phi;) [54] with CD = CD<sub>0</sub> + CDi. The resulting modes are listed in Table&nbsp;9 and plotted in Figure&nbsp;5. The short-period mode is well damped (&zeta; &asymp; 0.76), the phugoid is lightly damped with a period of about 12 s, the roll mode is very fast (time constant about 0.06 s), the Dutch roll has &zeta; &asymp; 0.20, and the spiral mode is slightly divergent with a time to double of about 18 s. The last is typical of a small aircraft with modest dihedral and a large fin, and is easily handled by an autopilot. Against the spiral-divergence limits commonly quoted from MIL-F-8785C for Class I aircraft, it meets the 12 s Level 1 limit for Category A flight phases but falls just short of the 20 s limit for Categories B and C; a little more dihedral would remedy this.</p>

<div class="tcap"><b>Table 9.</b> Rigid-Body Modes at Trim (V = 18 m/s)</div>

<table><thead><tr><th>Mode</th><th>&lambda; [1/s]</th><th>Characteristics</th></tr></thead><tbody><tr><td>Short period</td><td>-9.571 &plusmn; 8.135i</td><td>&omega;<sub>n</sub> = 12.56 rad/s, &zeta; = 0.762, T = 0.77 s</td></tr><tr><td>Phugoid</td><td>-0.049 &plusmn; 0.531i</td><td>&omega;<sub>n</sub> = 0.53 rad/s, &zeta; = 0.092, T = 11.83 s</td></tr><tr><td>Dutch roll</td><td>-1.257 &plusmn; 6.201i</td><td>&omega;<sub>n</sub> = 6.33 rad/s, &zeta; = 0.199, T = 1.01 s</td></tr><tr><td>Roll subsidence</td><td>-15.856</td><td>&tau; = 0.063 s</td></tr><tr><td>Spiral</td><td>0.038</td><td>unstable, T<sub>2</sub> = 18.4 s</td></tr></tbody></table>

<div class="figrow one"><figure id="fig-5"><a class="zoom" href="img/avl-athena-vortex-lattice-review/fig5_eigen.png" target="_blank" rel="noopener"><img src="img/avl-athena-vortex-lattice-review/fig5_eigen.png" alt="Eigenvalues of the longitudinal (circles) and lateral-directional (crosses) modes." loading="lazy" style="background:#fff;width:100%;max-width:640px"></a><figcaption><b>Figure 5.</b> Eigenvalues of the longitudinal (circles) and lateral-directional (crosses) modes.<span class="credit">Chart by the author</span></figcaption></figure></div>

<p><i>Effect of the missing &alpha;&#775; derivative.</i> To show what the quasi-steady assumption omits, the downwash-lag contribution was estimated with the classical tail formula C<sub>m&alpha;&#775;</sub> &asymp; &minus;2a<sub>t</sub>V<sub>H</sub>(l<sub>t</sub>/c)(d&epsilon;/d&alpha;) [54], with a<sub>t</sub> = 4.19 /rad (Helmbold, tail AR 4.8), V<sub>H</sub> = 0.67, l<sub>t</sub>/c = 3.95 and d&epsilon;/d&alpha; &asymp; 2C<sub>L&alpha;w</sub>/(&pi;A) = 0.35. This gives C<sub>m&alpha;&#775;</sub> &asymp; -7.8, about 35 % of the AVL value of C<sub>mq</sub>. Adding it raises the short-period damping ratio from 0.76 to 0.91 while leaving the natural frequency almost unchanged. The lesson is general: AVL-based models tend to <i>under-predict</i> pitch damping, and for aircraft with a short tail arm or marginal short-period damping the &alpha;&#775; term must be added from a handbook, an unsteady VLM such as VSPAERO, or tests.</p>

### 8.7 Design sensitivity studies

<p>The real power of AVL in a design office is not a single derivative set but the ability to ask &ldquo;what if&rdquo; questions in seconds. Three one-parameter studies were run on the 388-panel lattice (so the baseline values differ slightly from Table&nbsp;8); each case was re-trimmed before derivatives and modes were computed. The results are in Table&nbsp;10.</p>

<div class="tcap"><b>Table 10.</b> Sensitivity of Stability to Dihedral, Tail and Fin Size (388 Panels; Baseline: 3&deg;, 0.30 m, 0.25 m)</div>

<table><thead><tr><th>Case</th><th>SM [%]</th><th>&delta;<sub>e,trim</sub> [deg]</th><th>C<sub>mq</sub></th><th>C<sub>l&beta;</sub></th><th>C<sub>n&beta;</sub></th><th>C<sub>nr</sub></th><th>Dutch roll &omega;<sub>n</sub> / &zeta;</th><th>Spiral T<sub>2</sub></th></tr></thead><tbody><tr><td>Dihedral 0&deg;</td><td>17.0</td><td>2.52</td><td>-22.7</td><td>-0.014</td><td>0.127</td><td>-0.123</td><td>6.41 / 0.211</td><td>8.5 s</td></tr><tr><td>Dihedral 3&deg;</td><td>17.4</td><td>2.57</td><td>-22.7</td><td>-0.061</td><td>0.121</td><td>-0.123</td><td>6.38 / 0.200</td><td>18.6 s</td></tr><tr><td>Dihedral 6&deg;</td><td>17.9</td><td>2.62</td><td>-22.7</td><td>-0.109</td><td>0.115</td><td>-0.123</td><td>6.34 / 0.190</td><td>stable</td></tr><tr><td>H-tail semi-span 0.25 m</td><td>9.9</td><td>2.75</td><td>-17.6</td><td>-0.063</td><td>0.121</td><td>-0.123</td><td>6.38 / 0.200</td><td>18.8 s</td></tr><tr><td>H-tail semi-span 0.3 m</td><td>17.4</td><td>2.57</td><td>-22.7</td><td>-0.061</td><td>0.121</td><td>-0.123</td><td>6.38 / 0.200</td><td>18.6 s</td></tr><tr><td>H-tail semi-span 0.36 m</td><td>26.2</td><td>2.44</td><td>-29.0</td><td>-0.059</td><td>0.121</td><td>-0.123</td><td>6.37 / 0.201</td><td>18.4 s</td></tr><tr><td>Fin height 0.2 m</td><td>17.4</td><td>2.57</td><td>-22.7</td><td>-0.054</td><td>0.085</td><td>-0.088</td><td>5.39 / 0.170</td><td>19.2 s</td></tr><tr><td>Fin height 0.25 m</td><td>17.4</td><td>2.57</td><td>-22.7</td><td>-0.061</td><td>0.121</td><td>-0.123</td><td>6.38 / 0.200</td><td>18.6 s</td></tr><tr><td>Fin height 0.3 m</td><td>17.4</td><td>2.57</td><td>-22.7</td><td>-0.071</td><td>0.159</td><td>-0.161</td><td>7.28 / 0.228</td><td>18.3 s</td></tr></tbody></table>

<p><i>Wing dihedral.</i> Dihedral has almost no effect on the longitudinal results but changes the dihedral effect C<sub>l&beta;</sub> roughly in proportion: from &minus;0.014 with a flat wing (the residual comes from the high-mounted fin and the wing&ndash;fin interference) to &minus;0.109 at 6&deg;. The spiral mode responds strongly: divergent with a time to double of about 8.5 s at 0&deg;, about 19 s at 3&deg;, and stable at 6&deg;. Dutch-roll damping falls slightly as dihedral increases, the classical trade-off between spiral stability and Dutch-roll damping.</p>
<p><i>Horizontal tail size.</i> Increasing the tail semi-span from 0.25 m to 0.36 m (tail area +44 %) raises the static margin from about 10 % to 26 % and C<sub>mq</sub> from &minus;17.6 to &minus;29.0, while the elevator angle needed to trim falls. The short-period damping ratio changes little, because frequency and damping both increase.</p>
<p><i>Vertical tail height.</i> Increasing the fin height from 0.20 m to 0.30 m nearly doubles C<sub>n&beta;</sub> (0.085 to 0.159) and increases yaw damping C<sub>nr</sub> correspondingly. Dutch-roll frequency rises from 5.4 to 7.3 rad/s and damping from 0.17 to 0.23. The spiral mode is almost unchanged here because the fin also adds to C<sub>l&beta;</sub> and C<sub>lr</sub>; in general a larger fin tends to worsen spiral stability, and this coupling is exactly what a quick AVL study exposes.</p>
<p>Studies of this kind, each costing a few seconds, are how tail volumes, dihedral and control-surface sizes are settled in practice, long before the first wind-tunnel model.</p>

### 8.8 Contribution of each surface and a fuselage correction

<p>Because the lattice forces are available panel by panel, the derivatives can be split by surface. Table&nbsp;11 does this for the trimmed 873-panel case. It quantifies the physical picture of Section&nbsp;5.6 and is a very useful diagnostic when a derivative looks wrong.</p>

<div class="tcap"><b>Table 11.</b> Contribution of Each Surface to Key Derivatives (Trim, 873 Panels)</div>

<table><thead><tr><th>Derivative</th><th>Wing</th><th>H-tail</th><th>Fin</th><th>Total</th></tr></thead><tbody><tr><td>C<sub>L&alpha;</sub></td><td>4.909</td><td>0.460</td><td>0.000</td><td>5.370</td></tr><tr><td>C<sub>m&alpha;</sub></td><td>0.899</td><td>-1.812</td><td>-0.000</td><td>-0.913</td></tr><tr><td>C<sub>mq</sub></td><td>-0.12</td><td>-22.32</td><td>-0.00</td><td>-22.44</td></tr><tr><td>C<sub>Y&beta;</sub></td><td>-0.0092</td><td>0.0001</td><td>-0.2745</td><td>-0.2837</td></tr><tr><td>C<sub>l&beta;</sub></td><td>-0.0477</td><td>0.0073</td><td>-0.0198</td><td>-0.0602</td></tr><tr><td>C<sub>n&beta;</sub></td><td>-0.0026</td><td>-0.0002</td><td>0.1218</td><td>0.1190</td></tr><tr><td>C<sub>lp</sub></td><td>-0.5528</td><td>-0.0040</td><td>0.0013</td><td>-0.5555</td></tr><tr><td>C<sub>np</sub></td><td>-0.0280</td><td>0.0001</td><td>-0.0110</td><td>-0.0389</td></tr><tr><td>C<sub>lr</sub></td><td>0.0890</td><td>-0.0060</td><td>0.0194</td><td>0.1024</td></tr><tr><td>C<sub>nr</sub></td><td>-0.0016</td><td>0.0002</td><td>-0.1199</td><td>-0.1213</td></tr></tbody></table>

<p>Several points stand out. The wing alone is longitudinally unstable about this CG (C<sub>m&alpha;,wing</sub> = +0.90), and the horizontal tail, despite carrying only 9 % of the total C<sub>L&alpha;</sub>, provides a stabilising &minus;1.81. The tail provides over 99 % of the pitch damping and the fin essentially all of C<sub>n&beta;</sub> and 99 % of C<sub>nr</sub>. Roll damping is almost entirely a wing property. Most revealing is the wing's tiny yaw damping (C<sub>nr,wing</sub> &asymp; &minus;0.002): in AVL it comes only from induced-drag asymmetry. The classical strip-theory profile-drag contribution for a rectangular wing is about &minus;C<sub>D0,wing</sub>/3 [54]; with a wing profile-drag coefficient of about 0.012 this adds roughly &minus;0.004, i.e. a few per cent of the total. On aircraft with smaller fins, or with large drag devices deployed, this neglected term matters more, and it is one reason AVL tends to under-predict yaw damping.</p>
<p><i>Fuselage increment.</i> If the UAV has a pod fuselage of length L<sub>f</sub> = 0.9 m and maximum width w<sub>f</sub> = 0.12 m, the classical Multhopp-type estimate C<sub>m&alpha;,fus</sub> = K<sub>f</sub>w<sub>f</sub><sup>2</sup>L<sub>f</sub>/(c S) per degree, with an empirical factor K<sub>f</sub> of about 0.01 for a wing near 25&ndash;30 % of fuselage length [55], gives about +0.0013 per degree, or +0.076 per radian. This moves the neutral point forward by 0.076/5.37 &asymp; 1.4 % of c<sub>ref</sub>&mdash;small for a slender pod, which supports omitting it in AVL. For a transport fuselage, whose w<sub>f</sub><sup>2</sup>L<sub>f</sub> is a much larger fraction of cS, the same formula typically gives a shift of several per cent of MAC, and the body must not be ignored.</p>

### 8.9 Second example: a tailless flying wing

<p>Flying wings are popular for small UAVs and are a configuration where AVL is particularly useful, because their stability depends entirely on sweep, twist and span loading. A second model was therefore built: span 1.6 m, root chord 0.40 m, tip chord 0.20 m, 25&deg; leading-edge sweep, symmetrical section, 2&deg; root incidence washing out to &minus;3&deg; at the tip, elevons on the outer 60 % of each semi-span aft of 75 % chord, and small vertical winglet fins at the tips (Figure&nbsp;6). The elevons are defined, as in AVL, by two control variables on the same panels: &ldquo;elevator&rdquo; with SgnDup = +1 and &ldquo;aileron&rdquo; with SgnDup = &minus;1. The neutral point was computed first and the CG placed for an 8 % static margin; mass 1.6 kg, I<sub>xx</sub>, I<sub>yy</sub>, I<sub>zz</sub> = 0.12, 0.06, 0.17 kg m<sup>2</sup>, V = 16 m/s.</p>

<div class="figrow one"><figure id="fig-6"><a class="zoom" href="img/avl-athena-vortex-lattice-review/fig6_flying_wing.png" target="_blank" rel="noopener"><img src="img/avl-athena-vortex-lattice-review/fig6_flying_wing.png" alt="Flying-wing lattice: bound vortices (blue), elevon panels (orange), CG and neutral point (8 % static margin)." loading="lazy" style="background:#fff;width:100%;max-width:640px"></a><figcaption><b>Figure 6.</b> Flying-wing lattice: bound vortices (blue), elevon panels (orange), CG and neutral point (8 % static margin).<span class="credit">Chart by the author</span></figcaption></figure></div>

<p>Table&nbsp;12 compares the two aircraft. The flying wing trims at &alpha; = 3.10&deg; with almost neutral elevons, thanks to the washout, and its Trefftz span efficiency is 0.99. The differences from the conventional aircraft are instructive and entirely as expected physically: pitch damping is about fifteen times smaller because there is no tail arm; directional stability and yaw damping from the small winglet fins are roughly one fifth and one tenth of the conventional values; and the elevon pitch power per degree is less than a third of a dedicated elevator's, while a trailing-edge-down elevon adds lift&mdash;the familiar reason that tailless aircraft lose lift when they trim nose-up. Adverse aileron yaw is comparable in size to the directional stiffness, so coordinated turns need either differential elevons, split-drag rudders or yaw-damping by the autopilot.</p>

<div class="tcap"><b>Table 12.</b> Conventional UAV and Flying Wing Compared (Stability Axes)</div>

<table><thead><tr><th>Quantity</th><th>Conventional</th><th>Flying wing</th></tr></thead><tbody><tr><td>Static margin [%]</td><td>17.0</td><td>8.0</td></tr><tr><td>Trim &alpha; / &delta;<sub>e</sub> [deg]</td><td>1.19 / 2.72</td><td>3.10 / 0.10</td></tr><tr><td>C<sub>L&alpha;</sub></td><td>5.365</td><td>4.299</td></tr><tr><td>C<sub>m&alpha;</sub></td><td>-0.913</td><td>-0.348</td></tr><tr><td>C<sub>mq</sub></td><td>-22.44</td><td>-1.45</td></tr><tr><td>C<sub>Y&beta;</sub></td><td>-0.2786</td><td>-0.1735</td></tr><tr><td>C<sub>l&beta;</sub></td><td>-0.0602</td><td>-0.0798</td></tr><tr><td>C<sub>n&beta;</sub></td><td>0.1190</td><td>0.0241</td></tr><tr><td>C<sub>lp</sub></td><td>-0.5555</td><td>-0.4563</td></tr><tr><td>C<sub>np</sub></td><td>-0.0389</td><td>0.0024</td></tr><tr><td>C<sub>lr</sub></td><td>0.1024</td><td>0.0620</td></tr><tr><td>C<sub>nr</sub></td><td>-0.1213</td><td>-0.0117</td></tr><tr><td>C<sub>L&delta;e</sub> [1/deg]</td><td>0.00948</td><td>0.02278</td></tr><tr><td>C<sub>m&delta;e</sub> [1/deg]</td><td>-0.03641</td><td>-0.01032</td></tr><tr><td>C<sub>l&delta;a</sub> [1/deg]</td><td>-0.00661</td><td>-0.00635</td></tr><tr><td>C<sub>n&delta;a</sub> [1/deg]</td><td>0.00009</td><td>0.00032</td></tr><tr><td>Short period &omega;<sub>n</sub> / &zeta;</td><td>12.56 / 0.762</td><td>13.16 / 0.651</td></tr><tr><td>Phugoid &omega;<sub>n</sub> / &zeta;</td><td>0.53 / 0.092</td><td>0.74 / 0.057</td></tr><tr><td>Dutch roll &omega;<sub>n</sub> / &zeta;</td><td>6.33 / 0.199</td><td>4.23 / 0.089</td></tr><tr><td>Roll mode</td><td>&tau; = 0.063 s</td><td>&tau; = 0.046 s</td></tr><tr><td>Spiral</td><td>T<sub>2</sub> = 18.4 s</td><td>T<sub>2</sub> = 24.7 s</td></tr></tbody></table>

<p>The modes follow from these derivatives: a well-damped short period (&zeta; = 0.65), a very lightly damped Dutch roll (&zeta; = 0.089) caused by the small fins and tiny C<sub>nr</sub>, a very fast roll mode, and a slowly divergent spiral. This is a typical flying-wing picture and shows why autopilot yaw damping is almost always used on such UAVs. It also illustrates a caution: on a flying wing the C<sub>m&alpha;</sub> margin is small, so the lattice-convergence check and an honest allowance for any centre-body should be applied before the CG limit is set.</p>

### 8.10 What these examples teach

<ul>
<li>A complete, physically consistent derivative set and mode picture can be produced from a 65-line input file in seconds, for conventional and tailless layouts alike.</li>
<li>A convergence check is essential, especially for C<sub>m&alpha;</sub> and induced drag.</li>
<li>The results are only as good as the reference quantities and CG location; changing X<sub>ref</sub> from 0.115 m to 0.14 m in this model reduces the static margin from 17 % to about 6 %.</li>
<li>Terms outside AVL's model (&alpha;&#775;, fuselage, propeller, viscous drag, stall) must be added explicitly and their source recorded.</li>
</ul>

## 9. Limitations of AVL

<p>The limitations below are grouped as a checklist. Items marked [P] are stated in the AVL primer [15]; the others follow from the formulation or from the literature reviewed above.</p>

### 9.1 Physical model

<ol>
<li><b>Inviscid flow.</b> No boundary layers, no separation, no stall, no viscous drag except what the user supplies through CDCL or CDp. C<sub>L,max</sub>, post-stall behaviour, spin and departure cannot be predicted.</li>
<li><b>Thin surfaces.</b> Thickness is ignored; thickness effects on lift slope, on C<sub>m0</sub> and on fuselage&ndash;wing interference are lost. Suitability is greatest for configurations made mainly of thin lifting surfaces at small angles of attack and sideslip [P].</li>
<li><b>Linear, fixed wake.</b> Trailing legs are parallel to the x axis, so the free stream must be at a small angle to x [P]. Wake roll-up, wake deflection at high &alpha; or with flaps, and tail immersion in the deflected wake are not represented; tails close behind and in line with the wing can give unreliable downwash.</li>
<li><b>Quasi-steady.</b> Unsteady vorticity shedding is neglected, so &alpha;&#775; and &beta;&#775; derivatives are absent and rate derivatives are valid only for small rates (|p&#770;| &lt; 0.10, |q&#770;| &lt; 0.03, |r&#770;| &lt; 0.25) [P]. Gust response, flutter and high-frequency control are outside scope.</li>
<li><b>Compressibility.</b> Prandtl&ndash;Glauert only: valid to about M 0.6, unreliable above 0.8 (using M cos&Lambda; for swept wings) [P]. No transonic shocks or supersonic flow.</li>
<li><b>Fuselages and nacelles.</b> Slender-body theory is approximate and experience with it is limited [P]. Fuselage contributions to C<sub>m&alpha;</sub> and C<sub>n&beta;</sub> (destabilising) and to sidewash at the fin are only crudely captured; wing&ndash;body carry-over lift depends on modelling choices.</li>
<li><b>Propulsion.</b> No propeller slipstream, normal force, swirl or jet effects (JVL addresses jets; slipstream VLMs exist in the literature [52]). For tractor UAVs with tails in the slipstream, power-on and power-off derivatives can differ significantly.</li>
<li><b>Rigid aircraft.</b> No aeroelastic deformation; ASWING or coupled tools are required for flexible, high-aspect-ratio aircraft.</li>
<li><b>Control surfaces.</b> Deflection is modelled by normal tilting, which is linear; effectiveness at large deflection, gap and seal effects, and flow separation over the flap are not modelled; the 3.35 update improved but did not remove this limitation.</li>
</ol>

### 9.2 Numerical and practical

<ol start="10">
<li><b>Lattice sensitivity.</b> Results depend on spacing; trailing legs passing close to downstream control points give spurious loads unless surfaces share spanwise spacing, use finite cores or the same COMPONENT index [P]. Uniform spacing overpredicts span efficiency [P].</li>
<li><b>Induced drag.</b> Surface-integrated drag is less reliable than the Trefftz value [P]; even the Trefftz value is sensitive to coarse lattices (Section&nbsp;8.3).</li>
<li><b>Precision and I/O.</b> Text output with about four significant digits limits use in gradient-based optimisation [21]; the menu-driven interface makes large sweeps cumbersome without wrappers.</li>
<li><b>Legacy code base.</b> Fortran 77-style source, X11 graphics and a small group of maintainers; builds on modern Windows are less convenient than on Linux.</li>
<li><b>No uncertainty information.</b> AVL returns a single number for each derivative with no indication of confidence, which users must supply from validation experience.</li>
</ol>

### 9.3 Reliability of individual derivatives

<p>Not all AVL outputs deserve the same confidence. Table&nbsp;13 gives the author's assessment, based on the literature reviewed in Section&nbsp;6 and on practical experience, of how much each group of derivatives can be trusted for a conventional small aircraft in attached flow, together with the main source of error and a practical remedy. The ratings are qualitative and should be refined against data for each configuration class.</p>

<div class="tcap"><b>Table 13.</b> Indicative Reliability of AVL Derivatives (Conventional Aircraft, Attached Flow)</div>

<table>
<thead><tr><th>Derivative group</th><th>Reliability</th><th>Main error source</th><th>Practical remedy</th></tr></thead>
<tbody>
<tr><td>C<sub>L&alpha;</sub>, C<sub>L&delta;e</sub></td><td>good</td><td>thickness, viscous decambering near TE</td><td>scale by ratio of measured to thin-aerofoil section slope</td></tr>
<tr><td>C<sub>m&alpha;</sub>, X<sub>np</sub></td><td>good without fuselage; fair with</td><td>fuselage moment, tail downwash, lattice</td><td>add handbook fuselage increment; converge lattice</td></tr>
<tr><td>C<sub>mq</sub>, C<sub>Lq</sub></td><td>good (quasi-steady part)</td><td>missing C<sub>m&alpha;&#775;</sub></td><td>add downwash-lag estimate or unsteady VLM result</td></tr>
<tr><td>C<sub>lp</sub></td><td>good</td><td>tip separation at high &alpha;</td><td>usually none needed in cruise</td></tr>
<tr><td>C<sub>l&beta;</sub></td><td>fair</td><td>wing&ndash;fuselage height effect not modelled without body</td><td>handbook wing-position increment</td></tr>
<tr><td>C<sub>Y&beta;</sub>, C<sub>n&beta;</sub></td><td>fair</td><td>fuselage side force and destabilising yaw, fin sidewash, propeller</td><td>handbook fuselage terms; CFD check</td></tr>
<tr><td>C<sub>nr</sub>, C<sub>np</sub>, C<sub>lr</sub></td><td>fair to poor</td><td>profile-drag contribution absent; fuselage damping</td><td>add strip-theory profile-drag terms; flight identification</td></tr>
<tr><td>C<sub>l&delta;a</sub>, C<sub>n&delta;r</sub></td><td>good at small &delta;</td><td>gap, viscous effectiveness loss, large &delta;</td><td>effectiveness factors 0.7&ndash;0.9 from data</td></tr>
<tr><td>C<sub>n&delta;a</sub> (adverse yaw)</td><td>fair</td><td>profile drag of deflected aileron absent</td><td>add viscous drag-due-to-deflection estimate</td></tr>
<tr><td>CD<sub>i</sub></td><td>good if converged (Trefftz)</td><td>coarse lattice over-predicts e</td><td>convergence study</td></tr>
<tr><td>CD<sub>0</sub>, C<sub>L,max</sub>, stall</td><td>not predicted</td><td>inviscid model</td><td>XFOIL/handbook/CFD/tests</td></tr>
</tbody></table>

### 9.4 A practitioner's checklist

<p>The limitations above translate into a short checklist that the author recommends be attached to every AVL derivative set released to a flight-dynamics or flight-control team:</p>
<ol>
<li>Reference area, chord, span and moment reference stated and consistent with the receiving model.</li>
<li>Mass, CG and inertias stated, with the loading case.</li>
<li>Geometry file version-controlled and plotted (AVL <code>G</code> command) to check dihedral, incidence and control-surface extents.</li>
<li>Lattice convergence shown for C<sub>m&alpha;</sub>, X<sub>np</sub>, C<sub>n&beta;</sub>, C<sub>lp</sub> and CD<sub>i</sub>.</li>
<li>Run case recorded: V, &rho;, Mach, &alpha;, &beta;, control settings, trim constraints.</li>
<li>Axis system (stability or body) and units of rate and control derivatives declared.</li>
<li>Terms not modelled (C<sub>m&alpha;&#775;</sub>, C<sub>n&beta;&#775;</sub>, fuselage, propeller, profile drag, speed derivatives) listed, with the sources of any corrections added.</li>
<li>Validity range declared: attached flow, |&alpha;| and |&beta;| below about 10&deg;, M &lt; 0.6, rates within the primer limits.</li>
<li>At least one cross-check against an independent method (handbook, panel code, CFD or test).</li>
<li>Version of AVL and of any wrapper recorded, because output conventions have changed between versions [17].</li>
</ol>

## 10. The Way Ahead

<p>AVL's longevity shows that a well-chosen low-order model, delivered in a robust and transparent tool, remains valuable even in an age of routine CFD. The following developments would extend that value. Several have already been demonstrated in isolation by the researchers cited in Section&nbsp;7; the opportunity lies in integrating them while keeping AVL's speed and simplicity.</p>
<ol>
<li><b>A modern, library-style core.</b> Double-precision, thread-safe, callable from Python, MATLAB and C, with a stable API&mdash;pyAVL and OptVL show the way [21], [38]&mdash;and with the classic text interface retained for teaching.</li>
<li><b>Design sensitivities as standard.</b> Algorithmic differentiation or adjoints in the mainline, so that tail sizing, control allocation and stability constraints can be included directly in multidisciplinary optimisation.</li>
<li><b>Unsteady and &alpha;&#775; derivatives.</b> An optional time-domain wake or a frequency-domain doublet-lattice module to provide C<sub>m&alpha;&#775;</sub>, C<sub>n&beta;&#775;</sub> and gust transfer functions, closing the gap identified in Section&nbsp;8.6.</li>
<li><b>Viscous coupling.</b> Strip-wise coupling with aerofoil polars from XFOIL or a database, using decambering or the &alpha;-method [46]&ndash;[49], to give realistic C<sub>L,max</sub>, profile drag and stall progression for flight-simulation tables over the full envelope.</li>
<li><b>Better body and propulsion models.</b> Panel or source-sink bodies, empirical fuselage corrections (DATCOM-style C<sub>n&beta;</sub> and C<sub>m&alpha;</sub> increments), and an actuator-disc or slipstream-tube propeller model.</li>
<li><b>Wake relaxation.</b> Aligning the wake with the local flow at higher &alpha; and with high-lift systems, at modest cost.</li>
<li><b>Geometry integration.</b> Robust import from parametric CAD and OpenVSP, so that the AVL model is always consistent with the design geometry.</li>
<li><b>Uncertainty quantification and data fusion.</b> Attaching confidence intervals to each derivative from validation databases, and Bayesian updating with wind-tunnel and flight-identification data, so that the model improves as the programme matures.</li>
<li><b>Machine-learning corrections.</b> Surrogate models trained on CFD to correct AVL derivatives for fuselage, nonlinear and viscous effects while preserving AVL's speed and physical structure.</li>
<li><b>Open benchmark set.</b> A public collection of UAV and aircraft geometries with wind-tunnel and flight-identified derivatives, against which AVL and its successors can be tested consistently.</li>
</ol>

<p>These items can be grouped into a phased roadmap (Table&nbsp;14). The near-term items are largely engineering work on existing open code; the longer-term items are research problems in their own right.</p>

<div class="tcap"><b>Table 14.</b> Proposed Roadmap for AVL-Class Tools</div>

<table>
<thead><tr><th>Horizon</th><th>Development</th><th>Benefit</th><th>Building blocks already available</th></tr></thead>
<tbody>
<tr><td>Near term (1&ndash;2 years)</td><td>Python/C library core; double-precision output; standard JSON/HDF5 results; Windows builds</td><td>automation, reproducibility, integration with MDO and simulators</td><td>pyAVL, OptVL, avlwrapper, AeroSandbox interface [21], [36], [38]</td></tr>
<tr><td>Near term</td><td>Automatic convergence check and derivative uncertainty flag</td><td>avoids unconverged C<sub>m&alpha;</sub> and CDi</td><td>simple lattice doubling as in Section&nbsp;8.4</td></tr>
<tr><td>Medium term (2&ndash;5 years)</td><td>Strip-wise viscous coupling with XFOIL polars; decambering for post-stall</td><td>full-envelope simulator tables; realistic stall and drag</td><td>NCSU decambering, Airbus &alpha;-method [46]&ndash;[49]</td></tr>
<tr><td>Medium term</td><td>Unsteady wake or DLM module for &alpha;&#775;, &beta;&#775; and gust derivatives</td><td>correct pitch and yaw damping; gust loads</td><td>VSPAERO unsteady, DLM [8], [44]</td></tr>
<tr><td>Medium term</td><td>Propeller slipstream and body panel models</td><td>power-on stability of tractor UAVs and DEP aircraft</td><td>JVL, slipstream VLMs [19], [52]</td></tr>
<tr><td>Long term (5+ years)</td><td>Aeroelastic coupling and reduced-order models as standard</td><td>flexible, high-AR UAVs and HALE aircraft</td><td>ASWING [18], [41]</td></tr>
<tr><td>Long term</td><td>CFD-trained corrections and Bayesian fusion with test data</td><td>low-order speed with quantified, improving accuracy</td><td>system-identification practice [24]</td></tr>
</tbody></table>

## 11. Conclusions

<p>AVL began as a modest teaching code on MIT's Athena workstations around 1988 and has grown, through more than three decades of careful development by Drela and Youngren and a 2022 update by Allmaras, into a de facto standard for early stability and control analysis of fixed-wing aircraft and UAVs. Its strengths are a sound extended vortex-lattice formulation, normal-vector-tilting for controls and camber, exact linear derivatives in both stability and body axes, built-in trim and eigenmode analysis, and an open GPL licence that has encouraged a large ecosystem of wrappers, differentiable versions, sister codes and physics extensions.</p>
<p>The two worked UAV examples show that a validated, converged, physically consistent set of derivatives, neutral point and modes can be obtained in minutes, and also shows where care is needed: convergence of C<sub>m&alpha;</sub> and induced drag, choice of reference quantities and CG, and the explicit addition of terms AVL does not model, of which the &alpha;&#775; derivative alone changed the short-period damping ratio from 0.76 to about 0.9. Used within its limits&mdash;thin surfaces, small angles, subsonic attached flow, rigid airframe, low rates&mdash;and backed by validation data, AVL remains one of the most cost-effective tools in aircraft design. The way ahead lies not in replacing it but in surrounding its fast linear core with sensitivities, unsteady and viscous corrections, better body and propulsion models, and quantified uncertainty.</p>

## Acknowledgment

<p>The author acknowledges the use of Claude, a large language model (LLM) assistant from Anthropic, for literature search, drafting assistance, and for writing and running the Python vortex-lattice implementation used in the worked example. All content was reviewed by the author, who remains responsible for it. The author also thanks Mark Drela and Harold Youngren for making AVL freely available.</p>

## References

1. L. Prandtl, &ldquo;Applications of modern hydrodynamics to aeronautics,&rdquo; NACA Report 116, 1923.
2. V. M. Falkner, &ldquo;The calculation of aerodynamic loading on surfaces of any shape,&rdquo; Aeronautical Research Council R&amp;M 1910, 1943.
3. S. G. Hedman, &ldquo;Vortex lattice method for calculation of quasi steady state loadings on thin elastic wings in subsonic flow,&rdquo; FFA Report 105, Aeronautical Research Institute of Sweden, 1965.
4. J. E. Lamar and B. B. Gloss, &ldquo;Subsonic aerodynamic characteristics of interacting lifting surfaces with separated flow around sharp edges predicted by a vortex-lattice method,&rdquo; NASA TN D-7921, 1975.
5. C. E. Lan, &ldquo;A quasi-vortex-lattice method in thin wing theory,&rdquo; <i>J. Aircraft</i>, vol. 11, no. 9, pp. 518&ndash;527, 1974.
6. L. R. Miranda, R. D. Elliott and W. M. Baker, &ldquo;A generalized vortex lattice method for subsonic and supersonic flow applications,&rdquo; NASA CR-2865, 1977.
7. T. T. Takahashi, AIAA Paper 2020-0276, AIAA SciTech Forum, 2020 [discussion of VORLAX and thickness modelling in vortex-lattice methods]. [Online]. Available: labs.engineering.asu.edu/aircraft-design
8. E. Albano and W. P. Rodden, &ldquo;A doublet-lattice method for calculating lift distributions on oscillating surfaces in subsonic flows,&rdquo; <i>AIAA J.</i>, vol. 7, no. 2, pp. 279&ndash;285, 1969.
9. NASA Langley Research Center, <i>Vortex-Lattice Utilization</i>, NASA SP-405, 1976.
10. J. Katz and A. Plotkin, <i>Low-Speed Aerodynamics</i>, 2nd ed. Cambridge Univ. Press, 2001.
11. M. Drela, <i>Flight Vehicle Aerodynamics</i>. MIT Press, 2014.
12. &ldquo;Vortex lattice method,&rdquo; Wikipedia. [Online]. Available: https://en.wikipedia.org/wiki/Vortex_lattice_method
13. &ldquo;Project Athena,&rdquo; Wikipedia. [Online]. Available: https://en.wikipedia.org/wiki/Project_Athena
14. MIT News, &ldquo;Project Athena update,&rdquo; 1992; MIT Museum, &ldquo;Project Athena&rdquo; collection. [Online]. Available: https://mitmuseum.mit.edu/collections/subject/project-athena-628
15. M. Drela and H. Youngren, <i>AVL 3.36 User Primer</i>, MIT. [Online]. Available: https://web.mit.edu/drela/Public/web/avl/AVL_User_Primer.pdf
16. &ldquo;Mark Drela,&rdquo; Wikipedia. [Online]. Available: https://en.wikipedia.org/wiki/Mark_Drela
17. M. Drela and H. Youngren, &ldquo;AVL overview and page revisions,&rdquo; MIT. [Online]. Available: https://web.mit.edu/drela/Public/web/avl/
18. M. Drela, &ldquo;ASWING overview,&rdquo; MIT. [Online]. Available: https://web.mit.edu/drela/Public/web/aswing/
19. M. Drela and H. Youngren, &ldquo;JVL overview,&rdquo; MIT, 2024. [Online]. Available: https://web.mit.edu/drela/Public/web/jvl/
20. C. Courtin, R. J. Hansman and M. Drela, &ldquo;Flight test results of a subscale super-STOL aircraft,&rdquo; AIAA SciTech Forum, 2020; MIT ICAT Report 2020-01.
21. J. Anibal, &ldquo;pyAVL: a direct Python interface for AVL.&rdquo; [Online]. Available: https://github.com/joanibal/pyAVL ; https://pypi.org/project/pyavl-wrapper/
22. PX4 Autopilot, &ldquo;Advanced Lift Drag (AVL) automation tool,&rdquo; PX4 User Guide. [Online]. Available: https://docs.px4.io/main/en/sim_gazebo_gz/tools_avl_automation
23. &ldquo;Stochastic high fidelity autonomous fixed wing aircraft flight simulator,&rdquo; arXiv:2305.02016, 2023.
24. D. Reinhardt, K. Gryte and T. A. Johansen, &ldquo;Modeling of the Skywalker X8 fixed-wing UAV: flight tests and system identification,&rdquo; in <i>Proc. Int. Conf. Unmanned Aircraft Systems (ICUAS)</i>, NTNU.
25. T. Lukaczyk <i>et al.</i>, &ldquo;SUAVE: an open-source environment for multi-fidelity conceptual vehicle design,&rdquo; AIAA Paper 2015-3087, 2015.
26. K. S. Hon, S. Karpuk, D. Yang and A. Elham, &ldquo;Development of a flight simulator for conceptual aircraft design and sizing,&rdquo; <i>Transactions on Aerospace Research</i>, 2022.
27. P. D. Sharpe, &ldquo;AeroSandbox,&rdquo; MIT. [Online]. Available: https://github.com/peterdsharpe/AeroSandbox
28. AeroSandbox documentation, &ldquo;aerosandbox.aerodynamics.aero_3D.avl.&rdquo; [Online]. Available: https://aerosandbox.readthedocs.io
29. &ldquo;Stability analysis of a Boeing 737-800,&rdquo; arXiv:1912.03099, 2019.
30. A. K&#305;rkar, &ldquo;An aircraft design and analysis tool for a fifth-generation fighter jet: a flight mechanics perspective,&rdquo; M.S. thesis, Middle East Technical Univ., 2025.
31. K. Biber, &ldquo;Wind tunnel and computational stability derivatives for a propeller-driven airplane,&rdquo; <i>Int. J. Sustainable Aviation</i>, vol. 3, no. 3, 2017.
32. R. Ritchie, &ldquo;Comparative evaluation of computational techniques for estimating UAV aerodynamic, stability and control derivatives,&rdquo; Univ. of Minnesota, 2013.
33. [Comparison of AVL, XFLR5, Tornado, PyTornado, VSPAERO, PAWAT and FlightStream with STAR-CCM+ for the T-FLEX UAV], Technical Univ. of Munich, mediaTUM document 1693069.
34. [Comparative investigation of VLM codes for joined-wing configurations]. [Online]. Available: typeset.io.
35. S. Asaro <i>et al.</i>, [comparison of wind-tunnel, flight-test, VLM, panel and RANS aerodynamic data for the Flying-V subscale aircraft], TU Delft Repository.
36. &ldquo;avlwrapper: Python interface for MIT AVL,&rdquo; PyPI, v0.4.0, 2023. [Online]. Available: https://pypi.org/project/avlwrapper/
37. &ldquo;avl-aero-tables,&rdquo; PyPI, v1.0.1. [Online]. Available: https://pypi.org/project/avl-aero-tables/
38. J. Anibal, &ldquo;OptVL: AVL + Python + optimization.&rdquo; [Online]. Available: https://github.com/joanibal/OptVL
39. J. Anibal, &ldquo;OptVL optimization overview.&rdquo; [Online]. Available: https://joanibal.github.io/OptVL/optimization_overview
40. [Review of nonlinear aeroelastic and flight-dynamic solvers for HALE aircraft, including ASWING and the Helios mishap], DTIC report ADA546429.
41. L. Avoni, <i>ASWING Extended User Manual</i>, v1.0, ISAE-SUPAERO/ENAC, Sept. 2025.
42. T. Melin, &ldquo;A vortex lattice MATLAB implementation for linear aerodynamic wing applications,&rdquo; M.Sc. thesis, KTH, 2000.
43. T. Melin, A. A. Gastaldi and M. Zhang, &ldquo;Implementation of a vortex lattice method in a heterogeneous programming language environment,&rdquo; in <i>Proc. 31st ICAS Congress</i>, 2018.
44. OpenVSP user forum, &ldquo;VSPAERO stability analysis&rdquo; and &ldquo;Further explanation on dynamic analysis.&rdquo; [Online]. Available: https://groups.google.com/g/openvsp
45. V. S. Sarode, &ldquo;Investigating aerodynamic coefficients and stability derivatives for truss-braced wing aircraft using OpenVSP,&rdquo; M.S. thesis, Virginia Tech, 2022.
46. R. Mukherjee and A. Gopalarathnam, &ldquo;Poststall prediction of multiple-lifting-surface configurations using a decambering approach,&rdquo; <i>J. Aircraft</i>, vol. 43, no. 3, pp. 660&ndash;668, 2006.
47. R. Paul, J. Murua and A. Gopalarathnam, &ldquo;Unsteady and post-stall aerodynamic modeling for flight dynamics simulation,&rdquo; AIAA Paper 2014-0729, 2014.
48. &ldquo;A low-order method for prediction of separation and stall on unswept wings,&rdquo; arXiv:2006.00107, 2020.
49. H. Goitia and R. Llamas, &ldquo;Nonlinear vortex lattice method for stall prediction,&rdquo; <i>MATEC Web of Conf.</i>, vol. 304, 02006, 2019.
50. [Unsteady vortex lattice method coupled with decambering for post-stall aerodynamics], <i>S&#257;dhan&#257;</i>, 2018, doi:10.1007/s12046-018-0894-y.
51. T. Melin and A. T. Isikveren, &ldquo;Induced-drag compressibility correction for three-dimensional vortex-lattice methods,&rdquo; <i>J. Aircraft</i>, Engineering Note.
52. R. Nederlof <i>et al.</i>, [improved vortex lattice method with slipstream-tube model for propeller&ndash;wing interaction], <i>J. Aircraft</i>, published online Feb. 2025; TU Delft Repository.
53. J. Fu and E. Laurendeau, &ldquo;Assessment of a nonlinear unsteady vortex lattice&ndash;vortex particle method for predicting helicopter rotor/multirotor aerodynamics,&rdquo; arXiv:2511.11430, 2025.
54. B. Etkin and L. D. Reid, <i>Dynamics of Flight: Stability and Control</i>, 3rd ed. Wiley, 1996.
55. D. P. Raymer, <i>Aircraft Design: A Conceptual Approach</i>, 6th ed. AIAA, 2018.

## Appendix A: AVL Input File for the Worked Example

<pre class="code">Demo UAV - AVL review paper worked example
#Mach
0.0
#IYsym  IZsym  Zsym
 0       0      0.0
#Sref    Cref    Bref
 0.44    0.222   2.0
#Xref    Yref    Zref
 0.115   0.0     0.0
#CDp
 0.032
#==============================================================
SURFACE
Wing
#Nchord  Cspace
 12      1.0
YDUPLICATE
 0.0
#--------------------------------------------------------------
SECTION
#Xle    Yle    Zle     Chord   Ainc   Nspan  Sspace
 0.0    0.0    0.0     0.26    2.0    12     1.0
NACA
2410
SECTION
 0.02   0.5    0.0262  0.22    1.0    12     1.0
NACA
2410
CONTROL
#Cname    Cgain  Xhinge  HingeVec  SgnDup
aileron   1.0    0.75    0 0 0     -1
SECTION
 0.04   1.0    0.0524  0.18    0.0
NACA
2410
CONTROL
aileron   1.0    0.75    0 0 0     -1
#==============================================================
SURFACE
Htail
 9       1.0
YDUPLICATE
 0.0
ANGLE
 -1.0
SECTION
 0.95   0.0    0.05    0.14    0.0    12     1.0
CONTROL
elevator  1.0    0.60    0 0 0      1
SECTION
 0.97   0.30   0.05    0.11    0.0
CONTROL
elevator  1.0    0.60    0 0 0      1
#==============================================================
SURFACE
Vtail
 9       1.0
SECTION
 0.93   0.0    0.05    0.20    0.0    9      1.0
CONTROL
rudder    1.0    0.60    0 0 0      1
SECTION
 1.00   0.0    0.30    0.12    0.0
CONTROL
rudder    1.0    0.60    0 0 0      1
</pre>
<p>Mass file (<code>demo_uav.mass</code>):</p>
<pre class="code"># demo_uav.mass  - lumped mass properties (SI)
Lunit = 1.0 m
Munit = 1.0 kg
Tunit = 1.0 s
g   = 9.81
rho = 1.15
#  mass    x      y     z     Ixx    Iyy    Izz
   3.2    0.115  0.0   0.0   0.32   0.22   0.52
</pre>

## Appendix B: AVL Session for Trim and Derivatives

<p>Control variables are numbered D1, D2, D3 in order of first appearance in the geometry file&mdash;here aileron, elevator, rudder&mdash;so the elevator is D2.</p>
<pre class="code">avl demo_uav            ! loads demo_uav.avl
MASS demo_uav.mass      ! load mass file
MSET 0                  ! apply mass, g and rho to all run cases
OPER
 A C 0.383              ! set alpha by the constraint CL = 0.383
 D2 PM 0                ! elevator (D2) trims pitching moment Cm = 0
 X                      ! execute run case
 FT                     ! total forces, Trefftz CDi
 ST demo_uav.st         ! stability-axis derivatives (+ Xnp) to file
 SB demo_uav.sb         ! body-axis derivatives to file
&#160;
MODE
 N                      ! eigenmodes of the current run case
 W demo_uav.eig         ! write eigenvalues
 S                      ! list system matrices A, B</pre>

## Appendix C: Glossary of Derivatives and Conventions

<p>AVL notation is used, with the derivative written as the coefficient followed by the variable (for example Cma = &part;C<sub>m</sub>/&part;&alpha;, per radian).</p>

<div class="tcap"><b>Table 15.</b> AVL Derivative Notation</div>

<table>
<thead><tr><th>AVL name</th><th>Symbol</th><th>Per</th><th>Normal sign (stable aircraft)</th></tr></thead>
<tbody>
<tr><td>CLa, Cma</td><td>C<sub>L&alpha;</sub>, C<sub>m&alpha;</sub></td><td>rad</td><td>+, &minus;</td></tr>
<tr><td>CYb, Clb, Cnb</td><td>C<sub>Y&beta;</sub>, C<sub>l&beta;</sub>, C<sub>n&beta;</sub></td><td>rad</td><td>&minus;, &minus;, +</td></tr>
<tr><td>CYp, Clp, Cnp</td><td>C<sub>Yp</sub>, C<sub>lp</sub>, C<sub>np</sub></td><td>pb/2V</td><td>small, &minus;, usually &minus; at low C<sub>L</sub></td></tr>
<tr><td>CLq, Cmq</td><td>C<sub>Lq</sub>, C<sub>mq</sub></td><td>qc/2V</td><td>+, &minus;</td></tr>
<tr><td>CYr, Clr, Cnr</td><td>C<sub>Yr</sub>, C<sub>lr</sub>, C<sub>nr</sub></td><td>rb/2V</td><td>+, +, &minus;</td></tr>
<tr><td>CLd<i>n</i>, Cmd<i>n</i></td><td>C<sub>L&delta;</sub>, C<sub>m&delta;</sub></td><td>deg</td><td>elevator: +, &minus; (TE down)</td></tr>
<tr><td>Cld<i>n</i>, Cnd<i>n</i></td><td>C<sub>l&delta;</sub>, C<sub>n&delta;</sub></td><td>deg</td><td>depends on gain and SgnDup</td></tr>
<tr><td>Xnp</td><td>X<sub>np</sub></td><td>length</td><td>aft of CG for static stability</td></tr>
<tr><td>e (Trefftz)</td><td>span efficiency</td><td>&ndash;</td><td>0.7&ndash;1.0 for real configurations</td></tr>
</tbody></table>

<p><i>Axes.</i> Geometry: x aft, y right, z up. Stability axes: x along the projection of the free stream in the aircraft plane of symmetry. Body axes in the <code>SB</code> output use AVL's geometry orientation; check signs before importing into a simulation that uses x forward, z down.</p>

## Appendix D: Core of the Python Vortex-Lattice Solver

<p>The essential lines of <code>vlm_uav.py</code> used in Section&nbsp;8 are reproduced below (geometry set-up, plotting and mode routines omitted). Body axes are x forward, y right, z down; &rho; = V = 1.</p>
<pre class="code">def rotate(v, k, th):
    &quot;&quot;&quot;Rodrigues rotation of v about unit axis k by angle th.&quot;&quot;&quot;
    k = k / np.linalg.norm(k)
    return v * np.cos(th) + np.cross(k, v) * np.sin(th) + k * np.dot(k, v) * (1 - np.cos(th))
&#160;
def seg_vel(P, P1, P2, rcore=1e-6):
    &quot;&quot;&quot;Velocity at points P (m,3) from unit-strength segments P1-&gt;P2 (n,3); returns (m,n,3).&quot;&quot;&quot;
    r1 = P[:, None, :] - P1[None, :, :]
    r2 = P[:, None, :] - P2[None, :, :]
    r0 = P2 - P1
    cr = np.cross(r1, r2)
    cr2 = np.sum(cr**2, axis=2)
    n1 = np.linalg.norm(r1, axis=2); n2 = np.linalg.norm(r2, axis=2)
    l0 = np.linalg.norm(r0, axis=1)[None, :]
    mask = cr2 &lt; (rcore * l0)**2
    cr2 = np.where(mask, 1.0, cr2)
    k = np.einsum(&#x27;nk,mnk-&gt;mn&#x27;, r0, r1 / np.maximum(n1, 1e-12)[..., None]
                  - r2 / np.maximum(n2, 1e-12)[..., None]) / (4 * np.pi * cr2)
    k = np.where(mask, 0.0, k)
    return cr * k[..., None]
&#160;
def horseshoe_vel(P, lat, far=1e4, bound=True):
    &quot;&quot;&quot;Induced velocity per unit Gamma of every horseshoe at points P; trailing legs to -x_body (aft).&quot;&quot;&quot;
    A, B = lat[&quot;A&quot;], lat[&quot;B&quot;]
    t = np.array([-far, 0, 0])
    v = seg_vel(P, A + t, A) + seg_vel(P, B, B + t)
    if bound:
        v = v + seg_vel(P, A, B)
    return v
&#160;
# --- VLM.solve (method) ---
def solve(self, alpha=0.0, beta=0.0, p=0.0, q=0.0, r=0.0, defl=None, mach=0.0):
        &quot;&quot;&quot;alpha,beta deg; p,q,r nondimensional pb/2V, qc/2V, rb/2V (stability-axis rates, AVL style).&quot;&quot;&quot;
        defl = defl or {}
        lat = self.lat
        a, b = np.radians(alpha), np.radians(beta)
        Vac = np.array([np.cos(a) * np.cos(b), np.sin(b), np.sin(a) * np.cos(b)])  # aircraft vel, body
        # stability-axis rates -&gt; body rates
        ps, qs, rs = 2 * p / self.b, 2 * q / self.c, 2 * r / self.b
        om = np.array([ps * np.cos(a) - rs * np.sin(a), qs, ps * np.sin(a) + rs * np.cos(a)])
        N = self.normals(defl)
        AIC = self.AIC if not defl else np.einsum(&#x27;mnk,mk-&gt;mn&#x27;, self.VC, N)
&#160;
        def Vair(P):
            return -(Vac[None, :] + np.cross(om[None, :], P - self.rref[None, :]))
        rhs = -np.sum(Vair(lat[&quot;C&quot;]) * N, axis=1)
        G = np.linalg.solve(AIC, rhs)
        Vloc = Vair(self.mid) + np.einsum(&#x27;mnk,n-&gt;mk&#x27;, self.Vmid, G)
        dl = lat[&quot;B&quot;] - lat[&quot;A&quot;]
        F = G[:, None] * np.cross(Vloc, dl)  # rho = 1, V = 1
        Ft = F.sum(0)
        Mt = np.cross(self.mid - self.rref[None, :], F).sum(0)
        qS = 0.5 * self.S
        # Trefftz-plane induced drag: trailing legs only, evaluated far downstream (full wake velocity)
        PT = self.mid + np.array([-5e3, 0, 0])
        wT = np.einsum(&#x27;mnk,n-&gt;mk&#x27;, horseshoe_vel(PT, lat, bound=False), G)
        dhat = -Vac / np.linalg.norm(Vac)  # drag acts along air velocity
        CDff = 0.5 * np.sum(G[:, None] * np.cross(wT, dl) * dhat[None, :]) / qS
        # stability axes
        ca, sa = np.cos(a), np.sin(a)
        Xs = Ft[0] * ca + Ft[2] * sa; Zs = -Ft[0] * sa + Ft[2] * ca
        Ls = Mt[0] * ca + Mt[2] * sa; Ns = -Mt[0] * sa + Mt[2] * ca
        # wind axes for drag/side force
        CL = -Zs / qS
        CDi = (-(Xs * np.cos(b) + Ft[1] * np.sin(b))) / qS
        CY = (-Xs * np.sin(b) + Ft[1] * np.cos(b)) / qS
        return dict(CL=CL, CD=CDi, CDff=CDff, CY=CY, Cl=Ls / (qS * self.b), Cm=Mt[1] / (qS * self.c),
                    Cn=Ns / (qS * self.b), G=G, F=F)</pre>
