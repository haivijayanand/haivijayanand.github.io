::: abstract
**Abstract**—XROTOR, by Mark Drela and Harold Youngren of MIT, is one of the most widely used open-source lifting-line codes for designing and analysing propellers, wind turbines and lightly loaded rotors. Its source (version 7.55) is distributed under the GNU General Public License, yet, to the author's knowledge, its formulation and code have never been reviewed in a published paper. This paper traces the theory behind it, from Betz, Prandtl and Goldstein to Larrabee, and its history from the earliest recorded version (6.6, before 1998) to 7.55 and the 2022 Windows build. It also surveys its family: QPROP and QMIL, DFDC, CROTOR, and the Python, C++ and MATLAB ports. The full set of equations is written out as the code implements them, so that each assumption can be traced to a routine. These include the three induced-velocity models (graded momentum, the helicoidal potential solution and a discrete vortex wake), the wake-pitch correction, the "equivalent propeller" and the parametric section model. A line-by-line review of the 20 000-line Fortran 77 source then lists 18 findings. Five are errors in the hand-coded Newton linearisation, two of which are carried unchanged into the Python fork. Others are an uninitialised variable in ducted-rotor design, an inconsistent minimum-induced-loss condition and a dormant section-lookup fault. To test behaviour rather than only read the code, the analysis and design core was ported to Python in double precision, and about 2 600 operating points and 55 designs were solved. On the same blade, graded momentum and the potential solution agree within 0.1 % at advance ratio 0.1. Graded momentum over-predicts thrust by 6 % at 0.3 and by 18 % at 0.5 for two blades, and the three wake models give root swirls that differ sevenfold because each assumes a different hub. On a 364-point map of advance ratio and pitch, graded momentum converges everywhere. The potential formulation converges 91 % of points with XROTOR's relaxation rules but only 25 % with plain Newton, and its failures concentrate in deep stall. Two fixable mechanisms limit robustness. The circulation filter, added in version 7.30, helps in stall but traps the vortex-wake solver and a graded-momentum design in cycles that converge in 6–9 iterations once it is removed. The Mach-dependent stall limits of the section model make the potential solution fail when the tip runs near the critical Mach number. Fifteen improvements are proposed, led by a conditional filter, corrected derivatives, smooth Mach terms, double precision with a residual-based line search, a library interface and adjoint sensitivities.
:::

::: keywords
***Index Terms***—XROTOR, propeller, lifting line, minimum induced loss, Betz condition, Goldstein, helicoidal wake, vortex theory, wind turbine, ducted rotor, Newton method, code review, QPROP, DFDC.
:::

# Nomenclature {.unnumbered}

| Symbol | Meaning |
|:---|:---|
| $B$ | Number of blades |
| $c$ | Blade chord (scaled by $R$) |
| $c_l$, $c_d$ | Section lift and drag coefficients |
| $C_T$, $C_P$ | $T/(\rho n^2 D^4)$, $P/(\rho n^3 D^5)$ |
| $D$, $R$ | Rotor diameter and tip radius |
| $F$ | Prandtl tip-loss factor |
| $J$ | Advance ratio $V/(nD) = \pi\lambda$ |
| $M$, $M_{cr}$ | Section Mach number; critical Mach number |
| $n$, $\Omega$ | Shaft speed (rev/s, rad/s) |
| $N$ | Number of radial stations (II in the code) |
| $T$, $P$, $Q$ | Thrust, shaft power, torque |
| $v_a$, $v_t$ | Induced axial and swirl velocity at the blade (scaled by $V$) |
| $W$, $W_a$, $W_t$ | Total, axial and tangential relative velocity (scaled by $V$) |
| $\alpha$, $\beta$, $\phi$ | Angle of attack, blade angle, inflow angle |
| $\Gamma$ | Bound circulation of one blade (scaled by $VR$) |
| $\eta$, $\eta_i$ | Propulsive and induced (inviscid) efficiency |
| $\lambda$ | Advance ratio $V/(\Omega R)$ (ADV) |
| $\lambda_w$ | Wake advance ratio (ADW) |
| $\xi$, $\xi_w$ | $r/R$ on the real and the equivalent propeller |
| $\omega$ | Newton relaxation factor |

: Nomenclature [nomen]

# Introduction

A propeller designer who wants something better than blade-element momentum theory, but much cheaper than a vortex-particle or RANS solution, usually ends up at XROTOR [#xrotorweb]. The code designs rotors of minimum induced loss for a given thrust or power, analyses arbitrary blades over a wide range of operating points, and adds blade bending, a duct model and a noise footprint. It runs in a fraction of a second per point [#xrotordoc]. Its formulation reaches back to the classical vortex theory of Betz, Prandtl and Goldstein [#betz19], [#goldstein29]. The same team's later codes, QPROP/QMIL for parametric sweeps [#qprop] and DFDC for ducted fans [#dfdc05], share most of its theory, and it is the basis of current Python and C++ ports [#xrotorpy], [#xrotorc]. It is also the reference against which simpler tools are often checked [#klein17].

Yet XROTOR has no published description of its formulation or code. Its user guide was last updated in 2003, and its version notes run from 1998 to 2009 [#xrotordoc]. Users therefore rely on the QPROP document, which its author recommends as a stand-in [#xrotorweb], and on reading the source. The companion papers on XFOIL [#anandxfoil] and AVL [#anandavl] reviewed the other two pillars of Drela's public toolset. This paper does the same for XROTOR, with three aims.

1. *Record where XROTOR came from and where it stands.* Section II traces the classical theory, the version history of the code and its family of related codes and ports.
2. *Write down what the code actually solves.* Section III gives the governing equations in the form the Fortran implements them, routine by routine, because the user guide stops at the level of menus.
3. *Find out where it can mislead or fail, and how to improve it.* Section IV reviews the source line by line. Section V tests its behaviour with a double-precision port of the analysis and design core, solving about 2 600 operating points. Section VI summarises its current use, Section VII sets out limitations and a prioritised improvement plan, and Section VIII gives guidance for present users.

All numerical results come from the port described in Section V-A. The original executable was compiled from the 7.55 source, but its interactive menu could not be scripted in the computing environment used for this study. The port follows the Fortran residuals line by line and copies its relaxation rules. Its Jacobian, however, is formed by finite differences rather than by XROTOR's hand-coded derivatives (Section V-A). The convergence results therefore describe XROTOR's *algorithm* rather than every detail of its executable.
