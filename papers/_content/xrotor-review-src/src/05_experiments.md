# Numerical Experiments

## The Port and Its Checks

The analysis and design core of XROTOR 7.55 was ported to Python with NumPy and SciPy (about 600 lines). The port includes station spacing (SETX), the three wake models (GRADMO, HELICO with $N_n=128$ and the $n^{-2}$ tail, VRTXCO with the same segment spacing), the section model (CLCDCM), the velocity triangle (CSCALC), the equivalent propeller (SETXW), forces (TPQ), the initial guess (APINIT), the analysis iteration with all of APITER's relaxation limits and the filter (FILTER), and the design start and iteration (DESINI, DEITER). The arithmetic is double precision. The one deliberate difference is the Jacobian: the port differentiates the residuals by finite differences, holding the vortex spacing fixed for the $\lambda_w$ column as XROTOR's analytic derivative implicitly does. The port therefore has *correct* derivatives where XROTOR has the slips of Table {t:findings}, items 1–5. Its convergence results are, if anything, slightly optimistic about XROTOR's own.

Three checks support the port.

1. *Design–analysis consistency.* A blade designed for 100 kW and then analysed at the design point absorbs 100.000 kW, with identical efficiency, for all three wake models.
2. *Agreement of independent wake models.* For a given circulation, the potential solution (a Fourier–finite-difference method) and the vortex wake (Biot–Savart sums along helices) are entirely different numerical methods. Their swirl at mid-span agrees within 0.3–1 % (Fig. {f:swirl}).
3. *The actuator-disk limit.* With zero profile drag, many blades and a small advance ratio, the self-deforming wake should reproduce the actuator disk [#xrotordoc]. Table {t:ideal} shows designs at a thrust coefficient $T_c=T/(\tfrac12\rho V^2\pi R^2)=1$, where Froude's ideal efficiency is 0.828. With $B=20$ and $\lambda=0.05$ both formulations give 0.824, and $\lambda_w/\lambda=1.213$ against the momentum value $1+a=1.207$. The remaining 0.4 points are swirl and hub losses. At $\lambda=0.2$ swirl costs another 3–10 points, more for fewer blades, as classical theory predicts.

: TABLE {t:ideal}. Induced efficiency of minimum-induced-loss designs with zero profile drag at $T_c = 1$ (Froude limit 0.828), hub radius 0.02.

| $B$ | $\lambda$ | GRAD | POT | $\lambda_w/\lambda$ (POT) |
|---:|---:|---:|---:|---:|
| 2 | 0.05 | 0.815 | 0.814 | 1.228 |
| 2 | 0.20 | 0.742 | 0.723 | 1.384 |
| 4 | 0.05 | 0.820 | 0.820 | 1.219 |
| 4 | 0.20 | 0.770 | 0.766 | 1.305 |
| 20 | 0.05 | 0.824 | 0.824 | 1.213 |
| 20 | 0.20 | 0.794 | 0.794 | 1.259 |

The test cases are the two-blade NACA Report 640 propeller (5868-9 blade, 3.05 m diameter, 25° at $0.75R$, Clark-Y sections), whose geometry is distributed with the xrotor-python tests [#xrotorpy], and a family of MIL designs of 1.8 m diameter. The Clark-Y polar was fitted with XROTOR's section model (Fig. {f:aero}). Unless stated otherwise, advance-ratio sweeps keep the rotational tip speed at 170 m/s (tip Mach 0.5) and vary the flight speed, as in a wind-tunnel test at fixed rpm. All operating points use $N=30$ stations with sine spacing, the free wake, and XROTOR's relaxation rules with a 40-iteration limit.

## Three Wake Models for the Same Circulation

Fig. {f:swirl} applies the three influence matrices to the same circulation, taken from a two- or four-blade POT design. Three differences stand out.

* **Mid-span.** POT and VRTX agree closely. GRAD agrees at $\lambda=0.1$ but under-predicts the swirl by about 16 % between $0.75R$ and $0.9R$ for two blades at $\lambda=0.3$, and by 6 % for four blades. This is the Prandtl factor's small-advance-ratio assumption failing, as the user guide warns.
* **Root.** Each model makes a different assumption. GRAD has no hub loss and gives the mean swirl $B\Gamma/(4\pi\xi)$. POT, with its solid-hub condition, cuts the swirl at the first station to 29 % of that value for two blades at $\lambda=0.3$. VRTX trails a free root vortex and more than doubles it. None of these is "right": a real spinner and nacelle lie between the infinite solid hub and the free root vortex. Root-region loads therefore depend on the user's choice of model more than on any other input.
* **Tip.** The outermost station sits within $0.0014R$ of the tip trailing vortex with the default spacing. There, the swirl in VRTX is sensitive to the segment spacing, and in all models it is sensitive to the last few circulations.

![Fig. {f:swirl}. Swirl at the blade computed by the three XROTOR wake models from the same circulation (from a POT design with hub radius 0.125). Graded momentum (GRAD), potential formulation (POT) and discrete vortex wake (VRTX) agree at mid-span for small advance ratios but differ strongly at the root, where they embody different hub models. [wide]](fig/f03_swirl)

Fig. {f:formerr} turns the swirl differences into performance. Each blade was designed with POT at a power coefficient $P_c=0.5$ and then analysed at its design point with each model. GRAD's thrust error is below 0.1 % at $\lambda\le0.1$ for all blade numbers. It grows to +1.7 % at $\lambda=0.2$, +5.8 % at 0.3 and +17.9 % at 0.5 for two blades, and to +2.6 % at 0.5 for six blades. The efficiency error is smaller, at most +1.7 points, because GRAD over-predicts power as well. VRTX stays within −2 % to +0.4 % of POT where it converges. It failed to converge, with or without the filter, for four heavily loaded cases at $\lambda\ge0.4$ (two blades at 0.4 and 0.5, three and four blades at 0.5). The user guide's warning not to use GRAD above $\lambda\approx0.5$ is therefore generous for two- and three-blade propellers: a 2 % thrust error is reached at $\lambda\approx0.21$ for two blades and $\lambda\approx0.26$ for three.

![Fig. {f:formerr}. Error of the graded-momentum (lines) and vortex-wake (open symbols) models relative to the potential formulation, for blades designed with POT and re-analysed at their design point. [wide]](fig/f10_formerr)

## Off-Design Sweeps

Fig. {f:jsweep} shows the NACA 640 propeller from $J=0.2$ (deep stall at the root) to windmilling. The three models give the same shape of curve. GRAD is 1–4 % high in thrust and 1–3 % high in power between $J=0.5$ and 0.9 (more as thrust falls toward zero), and peaks at $\eta=0.862$ against 0.847 for POT and 0.849 for VRTX. With the parametric section model all GRAD and POT points converge. VRTX fails at six of the 23 advance ratios ($J\le0.4$ and $J=1.2$) with XROTOR's relaxation. Without the circulation filter, the five at $J\le0.4$ converge in 6–9 iterations (Section V-F); the sixth, at almost zero thrust, fails either way.

![Fig. {f:jsweep}. NACA Report 640 propeller (two blades, 25° at $0.75R$) at fixed tip speed: thrust and power coefficients and efficiency for the three wake models. Open symbols: VRTX points that converge only without the circulation filter. Dotted: POT with the original Clark-Y table instead of the parametric section model. [wide]](fig/f05_jsweep)

The dotted curve repeats the POT sweep with the original Clark-Y table interpolated linearly, as the xrotor-python fork does. Four of the 23 points fail to converge, and the converged curve shows kinks where stations cross the table's breakpoints near stall. XROTOR's smooth parametric model is therefore not only a convenience: it keeps $\partial c_l/\partial\alpha$ continuous, which the Newton method needs. The price is that the model holds $c_l$ at $c_{l,max}$ after stall (Fig. {f:aero}). At $J=0.25$–0.35, where the inner blade is stalled, it gives 3–4 % more thrust than the table.

## Loading and the Wake Pitch

The self-deforming wake is XROTOR's main departure from light-loading theory. Fig. {f:loading} (left) shows that $\lambda_w/\lambda$ rises from 1.11 at the peak-efficiency point to 1.42 at $J=0.5$ and 2.39 at $J=0.2$. At such loadings the wake should also contract strongly, which the model ignores. Freezing the wake pitch (WAKE off) at the value from the initial guess changes thrust by less than 1.2 %, because APINIT already estimates $\lambda_w$ from momentum theory. Setting $\lambda_w=\lambda$, the true light-loading assumption, under-predicts thrust by up to 3.5 %.

The notes for version 7.5x report that momentum and blade thrust disagree for highly loaded propellers [#xrotordoc]. In the port the blade thrust ({e:tinv}) and the equivalent-propeller thrust ({e:tw}) differ by less than 0.7 % wherever $C_T>0.045$, and by 1–3 % only as thrust falls toward zero (Fig. {f:loading}, right axis). The disagreement noted by the authors therefore concerns the "momentum" thrust, which item 16 of Table {t:findings} shows to be computed from blade-local rather than azimuth-averaged velocities. It does not affect the force used for results.

![Fig. {f:loading}. Wake pitch and loading for the NACA 640 propeller (POT): ratio of wake to rotor advance ratio and relative difference between blade and equivalent-propeller thrust (left); thrust change if the wake pitch is frozen at the APINIT estimate or at the rotor advance ratio (right). [wide]](fig/f06_loading)

## Radial Resolution and Harmonics

Fig. {f:disc} shows how thrust at $J=0.8$ changes with the number of stations. GRAD converges smoothly and monotonically: 30 stations are within 0.05 % of 100. POT is not monotonic. Its thrust falls until about 30 stations and then rises again by 0.2 % up to 100 stations, for both spacings. This drift probably comes from the fixed outer domain and the mirrored points beyond the tip in HELICO, whose spacing changes with $N$. VRTX converges slowly, 0.23 % between 30 and 40 stations, because the near-tip segments are coarse compared with the closely spaced tip stations. The default $N=30$ is therefore adequate to about 0.2 % for POT, but users should not expect refining to 60 or 100 stations to improve the answer.

With $N_n=128$ harmonics the potential solution is within 0.2 % of 512 harmonics, thanks to the $n^{-2}$ tail correction. Using the common-block default of 32 harmonics would cost about 1 % (Fig. {f:disc}, right).

![Fig. {f:disc}. Discretisation at $J = 0.8$: change in thrust coefficient with the number of radial stations for each wake model and spacing (left), and with the number of Fourier harmonics in HELICO (right). [wide]](fig/f07_disc)

## Robustness and the Circulation Filter

To map convergence, the NACA 640 blade was run at 28 advance ratios ($J=0.05$–1.4) and 13 uniform pitch changes ($\Delta\beta=-8°$ to $+16°$), 364 points per configuration. Each point started from APINIT. Three iteration strategies were compared: XROTOR's rules, the same rules without the circulation filter, and plain Newton with full steps. Fig. {f:robust} and Table {t:robust} give the results.

: TABLE {t:robust}. Converged points out of 364 (tip speed 170 m/s) and mean iterations per converged point.

| Strategy | GRAD | POT |
|:---|---:|---:|
| XROTOR relaxation (with filter) | 364 (5.5) | 332 (9.0) |
| XROTOR relaxation, no filter | 364 (5.5) | 309 (7.7) |
| Plain Newton | 364 (3.3) | 92 (6.1) |

GRAD converges everywhere with any strategy, because its diagonal influence matrix decouples the stations. POT is much harder. Plain Newton converges only 25 % of the points, so XROTOR's limiters on $\Delta c_l$, $\Delta\beta$ and sign reversal are essential, and with them 91 % converge. Almost all failures lie in one region: $J\le0.45$ combined with pitch increased by 4° or more. There most of the blade is stalled, and the soft $c_{l,max}$ limiter changes $\partial c_l/\partial\alpha$ by a factor of 66 (the ratio of attached to stalled slope) within a few degrees.

The filter's role is double-edged. Switching it off rescues 7 POT points but loses 30 others, so for POT it is a net help in stall. For the other two solvers the balance reverses. In VRTX five of the six filtered failures of Fig. {f:jsweep} converge without the filter. In design, the three-blade GRAD design of Section V-H never converges with the filter (60 iterations, r.m.s. change stuck at $1.5\times10^{-2}$), but converges in 7 iterations without it.

The mechanism is the same each time. The step limits push $\omega$ below 0.2, the filter then smooths $\Gamma$ over six stations while keeping its end values, and the next Newton step restores the sharp tip gradient that the filter removed. The iteration then repeats a fixed cycle of identical steps.

![Fig. {f:robust}. Convergence maps for the NACA 640 blade over advance ratio and uniform pitch change: shading shows Newton iterations, orange crosses mark points that did not converge in 40 iterations. Rows: GRAD and POT; columns: XROTOR's relaxation rules, the same without the circulation filter, and plain Newton. [wide]](fig/f08_robust)

A second, separate failure mechanism appears when the tip runs near the sections' critical Mach number. Fig. {f:mach} raises the tip speed at fixed $J=0.6$. GRAD converges at every Mach number. POT fails between tip Mach 0.65 and 0.85, where $M_{cr}=0.70$ lies inside the tip region, and it fails even with plain Newton except at 0.85. With the Mach terms of the section model switched off, every point converges in 8 iterations. In the failing iterates the outermost one or two stations alternate between two states. In a transonic-tip case examined in detail, one of these states put the local Mach number of the last station above 0.99. There the section model clips $M$, and its Mach-reduced $c_{l,max}$ and $c_{l,min}$ collapse onto each other, so that $c_l$ is no longer defined sensibly. The Mach-dependent stall limits of version 7.0 make the residual non-smooth exactly where the potential solution couples the tip stations most strongly. An early sweep in this study, run at constant flight speed so that the tip went transonic at low $J$, failed for this reason alone in a band $0.35<J<0.6$.

![Fig. {f:mach}. Effect of tip Mach number at $J = 0.6$ (section $M_{cr} = 0.70$): thrust coefficient and efficiency for GRAD, POT and POT with the Mach terms of the section model switched off. POT does not converge between tip Mach 0.65 and 0.85 (crosses). [wide]](fig/f11_mach)

## Minimum-Induced-Loss Design

Fig. {f:design} shows two-blade designs for 100 kW at 60 m/s and 2 400 rpm (1.8 m diameter, $\lambda=0.265$, $c_l=0.6$). Blade angles agree within 0.25° outboard of $0.3R$, and the three designs differ mainly at the root. POT's solid hub allows a root circulation ten times GRAD's, and hence a root chord of $0.215R$ instead of $0.022R$. VRTX lies between them. GRAD predicts its own blade to be 0.8 points more efficient (0.846) than POT predicts for its blade (0.838), partly because GRAD under-predicts the outboard induced loss (Section V-B).

Re-analysed with POT at the same power, the GRAD blade reaches $\eta=0.843$: lower than GRAD claims, but 0.5 points *above* POT's own design. The reason is profile drag. MIL design minimises only the induced loss, and POT's solid-hub assumption loads the root heavily, giving a wide root that carries drag but little thrust. The design condition therefore inherits the hub model's assumption, and a designer using POT should check whether a real spinner justifies that root loading. All designs at the design point re-analyse to exactly 100 kW. POT and VRTX converge in 5 iterations and GRAD in 8. The three-blade GRAD design is the filter failure discussed above.

![Fig. {f:design}. Minimum-induced-loss designs for two blades, 100 kW, 60 m/s, 2 400 rpm, $c_l = 0.6$, with the three wake models: chord, blade angle and circulation. The dotted line is the initial guess of DESINI (Larrabee's design followed by one Goldstein solve). [wide]](fig/f09_design)

## Limitations of This Study

The tests used the ported algorithm, not the Fortran executable. They covered two blade families, one section type, open rotors and axial inflow. Ducted rotors, nacelle effects, raked blades, the structural and acoustic modules, and validation against wind-tunnel data were outside their scope. For validation, the literature reports comparisons of XROTOR and QPROP with tunnel tests of UAV and model propellers [#lowe15], [#klein17]. The results here characterise the *method*: its internal consistency, its sensitivity to modelling choices and the robustness of its iteration.
