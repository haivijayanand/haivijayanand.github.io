# Code Review

## Architecture

XROTOR 7.55 is about 20 500 lines of Fortran 77 in 23 source files and one include file, plus a 10 000-line X11/PostScript plot library shared with XFOIL. Table {t:files} lists the files that carry the physics. About 31 % of the lines are comments; the code is terse but readable, and the long derivative chains are commented step by step. All state lives in one include file, XROTOR.INC, with 27 COMMON blocks and fixed array limits: 100 radial stations, 20 aero sections, 100 stored cases. Variables are typed implicitly, all reals are single precision (REAL\*4), and control flow uses 493 GO TO statements. Program structure follows the pattern of XFOIL: a top-level menu dispatches to sub-menus (OPER, DESI, MODI, AERO, BEND, NOIS, PLOT), each reading four-letter commands from the terminal.

: TABLE {t:files}. Source files of XROTOR 7.55 that contain the physics (lines including comments). [wide]

| File | Lines | Routines | Content |
|:---|---:|---:|:---|
| xrotor.f | 1672 | 19 | main program, menus, defaults, atmosphere, nacelle, station spacing, output |
| xoper.f | 3228 | 17 | OPER menu; APINIT, APITER, CSCALC, SETXW, TPQ, GRADMO, HELICO, FILTER |
| xdesi.f | 1234 | 8 | DESI menu; DESGEN, DESINI (Larrabee start), DEITER (MIL Newton) |
| xmodi.f | 666 | 4 | MODI menu; geometry changes and twist optimisation |
| xaero.f | 1354 | 11 | aero sections; CLCDCM section model, GETALF inversion |
| vortex.f | 350 | 2 | VRTXCO discrete helical wake, VORSEGVEL Biot–Savart |
| xbend.f | 1646 | 16 | non-linear beam: loads, deflections, stresses |
| xnoise.f | 1605 | 12 | acoustic pressure histories and footprints |
| xio.f | 612 | 5 | save and load files |
| spline.f, xutils.f | 1073 | 22 | splines, Gaussian elimination, LU |
| plotting (6 files) | 4672 | 32 | rotor, polar, case and map plots |

The analysis and design solvers are compact: the routines in Fig. {f:flow} total about 1 800 lines. Each carries the partial derivatives of its outputs with respect to $\Gamma_j$, $\lambda$, $\lambda_w$ and $\Delta\beta$, so the Newton matrix is assembled by the chain rule. This gives fast quadratic convergence when the derivatives are right, but every term must be maintained by hand. Several findings below are errors in such terms.

## Findings

Table {t:findings} lists what the review found. Each item was traced through the source and, where possible, checked in the port. Items 1–5 are errors in the *linearisation* only. They do not change a converged answer, but they degrade the Newton direction and therefore convergence. Items 6–9 can change results or behaviour. Items 10–18 are dormant faults, inconsistencies and constraints that a maintainer or a porter should know about.

: TABLE {t:findings}. Findings of the source review of XROTOR 7.55 (file and line numbers of the 7.55 distribution). [wide]

| No. | Location | Finding | Consequence |
|---:|:---|:---|:---|
| 1 | xoper.f 2575, 2606 (TPQ) | $\partial T_v/\partial\lambda_w$ and $\partial P_v/\partial\lambda_w$ are assigned inside the station loop instead of accumulated, so only the outermost station contributes | Wrong $\lambda_w$ column of the Jacobian whenever thrust, torque or power is specified; carried unchanged into xrotor-python |
| 2 | xaero.f 1068–1069 (CLCDCM) | Derivative of the drag rise $10(M-M_{cr,e})^3$ divides by $M$ and by $M_{cr,e}$ instead of by $(M-M_{cr,e})$ | Wrong $\partial c_d/\partial W$, $\partial c_d/\partial\alpha$ above $M_{cr}$; carried into the Python and C++ ports |
| 3 | xaero.f 1051–1052 | In the derivative of the stall drag $2x^2$ the Prandtl–Glauert term is multiplied by the drag $2x^2$ instead of by its argument $x$ | Wrong $\partial c_d/\partial W$ in stall at $M>0$ |
| 4 | xaero.f 1060–1061 | $\partial M_{cr,e}/\partial\alpha=-0.25\,|\partial c_l/\partial\alpha|$ ignores the sign of $c_l-c_{l,d}$ | Wrong sign for $c_l<c_{l,d}$ |
| 5 | xoper.f 3104 (HELICO) | Right-hand side of the $\lambda_w$-sensitivity problem reads GAM(I) for I > N, outside the blade | Uses whatever is stored there; stale values after the station count is reduced |
| 6 | xdesi.f 1016–1020, 1073–1074 (DEITER) | DEFF is set only for free-tip rotors but tested for convergence in every case | Uninitialised (or stale) variable in the convergence test of ducted designs |
| 7 | xdesi.f 894 vs xoper.f 2676 | Betz condition ({e:betz}) uses $\xi_i/\lambda$ for the equivalent propeller's tangential speed, TPQ uses $\xi_{w,i}/\lambda$; the $\xi_w$ derivative is commented out | Design condition and analysis forces are not the same propeller; small without nacelle or duct |
| 8 | xdesi.f 587–599 (DESGEN) | Design $c_l$ is checked against the stall limits of section 1 only | Multi-section blades may be rejected or accepted wrongly |
| 9 | xoper.f 1985–1989, xdesi.f 1067–1070 | Circulation filter whenever $\omega<0.2$; it fixes the end values and smooths the interior | Can hold the iteration in a cycle (Section V-F) |
| 10 | xaero.f 774–792 (GETCLCDCM) | Fall-back section search jumps out with the index *past* the bracket; a station outboard of the last section is reset to section 1 | Dormant: SETIAERO normally sets the indices first |
| 11 | xoper.f 1728–1731 (APITER) | Correction factor for $v_t$ in the wake equation is computed and then overwritten with 1.0 ("for now") | Dead code; documents an open modelling choice |
| 12 | xoper.f 1666; xdesi.f 835 | Convergence tolerances $10^{-7}$ and $5\times10^{-7}$ on r.m.s. $\Delta\Gamma$ in single precision (machine epsilon $1.2\times10^{-7}$) | Can stop just short of convergence on fine grids or large circulations |
| 13 | xaero.f 870–906 (GETALF) | Newton inversion of $c_l(\alpha)$ starts at $\alpha_0$ of section 1 with no bracketing; fails for $c_l>c_{l,max}$ | Design can diverge when Mach-reduced $c_{l,max}$ falls below the design $c_l$ |
| 14 | xoper.f 2375, 2551, 2618 | Rake: $\cos(\text{rake})$ applied to local efficiencies but set to 1 for viscous and inviscid forces | Inconsistent treatment of raked blades |
| 15 | vortex.f 73–110 | Number of wake segments depends on $\lambda_w$ | Residual is discontinuous in $\lambda_w$; one line printed per call |
| 16 | xoper.f 2750–2757 | "Momentum" thrust and power use the blade-local $v_a$ | Not a momentum check for finite $B$ (unused, debug only) |
| 17 | xrotor.f 1076 vs 1117 | SETX uses $\xi_{tip}\sin^2t$, TINVRT $(\xi_{tip}\sin t)^2$ | Harmless while $\xi_{tip}=1$ |
| 18 | XROTOR.INC; HELICO | Common NN = 32 and XINF = 3 are overridden by local NN = 128 and $\xi_\infty=4$; fixed IX = 100, IDIM = 150, 5 000 wake segments | Misleading parameters; hard limits for fine discretisations |

Three comments put the list in context. First, items 1–5 are typical of hand-derived Jacobians: each is a one-line slip that no converged result can reveal, because the Newton method still converges, only more slowly or less reliably. Automatic differentiation or a finite-difference check during development would catch them. Second, item 6 matters only for ducted designs. A Fortran compiler that keeps local variables in static storage, as many F77 compilers did, would carry DEFF over from an earlier free-tip design, so behaviour depends on the session history. Third, item 7 may be deliberate (the comment "EI_XW" is commented out rather than deleted). Without a nacelle or duct, $\xi_w$ differs from $\xi$ only by the small contraction of the equivalent stream tube, which explains why it has gone unnoticed.

## Software Engineering

The interactive design is XROTOR's strength in teaching and exploratory design and its weakness everywhere else. There is no batch input format apart from piping keystrokes, no library interface, and no error status beyond printed text. The circulation and wake state persists between commands, so results depend on what was run before: an unconverged point leaves its $\Gamma$ as the start of the next. The same pattern caused the failure propagation found in XFOIL [#anandxfoil]. Wrappers such as propeller_design_tools [#pdt] or the xrotor-python module [#xrotorpy] exist to work around this. The Python module replaced the COMMON blocks with a derived type for the same reason. Fixed-size arrays limit the radial resolution to 100 stations. The single-precision arithmetic is adequate for the converged physics but leaves little margin for the convergence test (item 12).
