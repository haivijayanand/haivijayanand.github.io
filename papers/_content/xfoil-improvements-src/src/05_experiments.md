# Where XFOIL Falls Short: Numerical Evidence

The weaknesses of XFOIL are often described anecdotally ("it doesn't converge near stall", "drag is noisy"). This section measures them with XFOIL 6.99 itself, so that each proposed improvement in Section VI rests on a reproducible observation.

## Test Set-Up

XFOIL 6.99 was compiled from the Debian source package with gfortran in double precision, with floating-point trapping disabled. (The distribution binary, which traps floating-point exceptions, aborted on its first viscous point.) A Python driver talks to the unmodified program through its text interface, waiting for each prompt, and parses the iteration history, coefficients and transition locations of every point. Two instrumented builds were also made. One prints $C_l$ and $C_d$ to full double precision; the other offers two alternative relaxation rules, selected by an environment variable. All scripts and data are listed in the Appendix.

The main test matrix comprises six NACA sections of different thickness and camber (0012, 0018, 2412, 4412, 23012 and the thin, highly cambered 6409), six chord Reynolds numbers ($5\times10^4$, $10^5$, $2\times10^5$, $5\times10^5$, $10^6$, $3\times10^6$), and angles of attack from $-6^\circ$ to $20^\circ$ in $0.5^\circ$ steps. That gives 1908 operating points per strategy, with 160 panels, $N_{crit} = 9$ and $M = 0$. A point counts as converged only if XFOIL reports convergence (RMS change $< 10^{-4}$) with finite coefficients.

## A Converged Solution in Detail

Before looking at failures, it helps to see what a successful solution contains. Fig. {f:bl} shows NACA 4412 at $Re = 2\times10^5$ and $\alpha = 4^\circ$ ($C_l = 0.906$, $C_d = 0.01266$, 200 panels). On the upper surface, the laminar layer separates at $x/c \approx 0.40$ in the adverse pressure gradient behind the suction peak. $H$ rises to 6.2 inside the separation bubble while $C_f$ is negative. The envelope amplification reaches $N_{crit} = 9$ at $x/c = 0.585$. The newly turbulent layer then reattaches at $x/c \approx 0.60$ and $H$ falls rapidly to turbulent values. The lower surface stays laminar to the trailing edge. The whole bubble, which spans 20 % of the chord and dominates the drag at this Reynolds number, is captured by the integral equations of Section III without any special treatment. That is the main reason XFOIL is so successful at low Reynolds numbers. The figure also shows where the solution is most sensitive: Just after transition, $H$ falls by up to 1.35 between adjacent stations, beyond the user guide's limit of 1.0 per station even at 200 panels. This is the region the paneling rule addresses, and it is where the failures examined below originate.

![Fig. {f:bl}. Converged XFOIL solution for NACA 4412, Re = 200 000, α = 4°: pressure distribution (left) and upper-surface shape parameter and skin friction (right), showing laminar separation, transition inside the bubble and turbulent reattachment. [wide]](fig/f17_bl)

## Convergence Statistics

Seven solution strategies were compared on the same matrix:

- **S0**: a cold start at every point (boundary layers re-initialised, `INIT`), with 100 iterations allowed.
- **S1/20**: standard continuation, as performed by `ASEQ`, marching from $0^\circ$ upwards and from $0^\circ$ downwards with XFOIL's default limit of 20 iterations.
- **S1/100**: the same continuation with 100 iterations.
- **S2**: S1/100 with an *adaptive* step bound. The limits in ({e:rlx}) are halved whenever the RMS change fails to fall by 10 %, and are restored gradually otherwise.
- **S2b**: S1/100 with *fixed* tighter limits $[-0.4, 1.0]$, as used in QFoil [#qfoil].
- **S3**: S1/100 plus a recovery procedure. After a failed point, the solver re-converges at the last good angle (with a cold start there if necessary) and approaches the target again in 2, 4, 8 and 16 sub-steps. As a last resort it tries a cold start at the target.
- **S4**: S3 combined with the adaptive bound of S2.

![Fig. {f:conv}. Percentage of the 318 operating points per Reynolds number (six airfoils × 53 angles) that converged, for the seven strategies. The default iteration limit loses up to 15 % of points; continuation with recovery (S3) converges 96.5–99.4 % at every Reynolds number.](fig/f03_conv)

: TABLE {t:conv}. Convergence over the full matrix (1908 points per strategy). [wide]

| Strategy | Converged | Failed | Newton iterations per converged point |
|:---|---:|---:|---:|
| S0 cold start each point | 93.5 % | 124 | 22.0 |
| S1/20 continuation, default ITER | 89.3 % | 204 | 8.3 |
| S1/100 continuation | 96.2 % | 72 | 11.3 |
| S2 adaptive step bound | 91.9 % | 155 | 16.7 |
| S2b fixed tighter bounds | 95.0 % | 95 | 12.4 |
| S3 continuation + recovery | **98.5 %** | **28** | 24.5 |
| S4 = S3 + adaptive bound | 96.0 % | 76 | 43.4 |

Fig. {f:conv} and Table {t:conv} give the results. Five observations follow.

1. **The default iteration limit is too low.** With 20 iterations, more than one point in ten fails. At $Re = 10^6$ the failure rate reaches 15 %, most likely because transition moves rapidly forward on these sections and the first point after each jump needs more than 20 iterations. Raising the limit to 100 cuts failures from 204 to 72, at only 36 % more iterations per converged point.
2. **Continuation beats cold starts.** Re-initialising the boundary layer at every point (S0) is both less reliable (93.5 %) and twice as expensive. The previous solution is a far better initial guess than XFOIL's own marching initialisation.
3. **Changing the step limiter does not help.** The adaptive bound (S2) *reduced* convergence to 91.9 %, and the fixed QFoil-style bounds (S2b) reduced it slightly, to 95.0 %. The reason is visible in the iteration logs. XFOIL's RMS change is often non-monotonic during the first few iterations of a successful solve (for example 0.41, 0.42, 0.31, …), so a monotonicity test shrinks the step precisely when the iteration is about to take off. Section VI-A argues that a proper merit function is needed instead.
4. **State management is what matters.** The recovery procedure S3 converts 61 % of the remaining failures into converged points (72 → 28) and is the best strategy at every Reynolds number (Fig. {f:conv}). It costs about twice the iterations per converged point. At roughly 0.15 s per point here, that is a few seconds for a complete polar.
5. **Difficulty is concentrated.** Fig. {f:failmap} shows that failures cluster at the lowest Reynolds numbers near stall and at negative angles, where laminar separation bubbles form or burst. The thin cambered NACA 6409 is the hardest section (92.5 % with S1/100, 98.4 % with S3).

![Fig. {f:failmap}. Number of the six airfoils that failed to converge at each Reynolds number and angle of attack, for plain continuation (left) and continuation with recovery (right). [wide]](fig/f04_failmap)

![Fig. {f:work}. Converged fraction (bars, left axis) and Newton iterations per converged point (hatched bars, right axis) for each strategy.](fig/f05_work)

## Anatomy of a Failure: the Transition Station

Fig. {f:rms} shows a typical failure in detail. The case is NACA 4412 at $Re = 2\times10^5$, approached in $0.5^\circ$ steps to $\alpha = 11^\circ$. The RMS change falls from 0.115 to $8.2\times10^{-3}$ in three iterations and then stays at $8.0\times10^{-3}$ for the remaining 97. XFOIL's diagnostic shows that the largest change is always in the shear-stress/amplification variable at station 37 on the upper surface, and station 37 is exactly where transition sits ($x/c = 0.099$). The iteration has locked into a cycle in which the transition point and the shear stress of the first turbulent station keep correcting each other. A cold restart at $11^\circ$ converges in 12 iterations to $C_l = 1.3657$, $C_d = 0.02976$. The "failed" state ($C_l = 1.365$, $C_d = 0.02978$) was already within 0.1 % of this answer. The non-smoothness of the transition treatment, not any physical difficulty, prevented convergence. A user, or an optimiser, would have discarded a correct point.

How common is this? All 72 points that failed under S1/100 were re-run while recording their final RMS, and compared with the converged answers that S3 found at the same conditions. Of the 43 failed points with a converged reference and finite coefficients, 14 (one in three) were within 1 % of the correct $C_l$ and $C_d$, and 10 were within 0.1 %. Their final RMS distinguishes them well. Of the 15 failed points that ended with an RMS below $10^{-2}$, 14 were within 1 % of the answer. The median failed point, in contrast, ended with an RMS of 0.15, and those points were genuinely wrong.

![Fig. {f:rms}. Newton RMS change for a failed point (continuation from 10.5°, stalls at $8\times10^{-3}$ with the largest change at the transition station) and for a cold restart at the same angle (converges in 12 iterations).](fig/f06_rms)

## Failure Propagation and Path Dependence

When a point fails, XFOIL keeps the unconverged state as the starting guess for the next request. Fig. {f:failprop} shows the consequence. Each airfoil was swept up from $0^\circ$ to $22^\circ$ in $0.25^\circ$ steps and immediately back down. For NACA 4412 at $Re = 2\times10^5$, one failure at the top of the upward sweep poisoned the solution so badly ($C_l$ values near 80) that *all* 89 points of the downward sweep failed. For NACA 2412 at $Re = 5\times10^5$, 23 consecutive points failed before the solution recovered. NACA 0012 and 0018 at $Re = 10^6$ were unaffected.

Wherever both sweeps converged, the results were identical to within $10^{-3}$ in $C_l$ and $2\times10^{-5}$ in $C_d$. XFOIL's converged steady solutions showed no hysteresis in these cases. The path dependence users experience is therefore numerical, not physical. That is good news, because it can be removed by better state management (S3) rather than requiring a different physical model.

![Fig. {f:failprop}. Upward then downward $\alpha$ sweeps. Converged points (dots) coincide on both sweeps; after a failure at 22°, the stored unconverged state makes every downward point fail for NACA 4412 at Re = 200 000 (left) and 23 points fail for NACA 2412 at Re = 500 000 (right). [wide]](fig/f08_failprop)

## Panel Density and the Mass-Influence Approximation

Fig. {f:panels} shows the sensitivity to the number of panel nodes $N$. Lift is converged to 0.1 % by $N \approx 140$. Drag at $Re = 3\times10^6$ is under-predicted by 3.2 % at $N = 60$, 1.9 % at $N = 100$ and 0.8 % at $N = 140$, and comes within 0.3 % of the $N = 360$ value only for $N \ge 200$. The default of 160 nodes is therefore adequate for low Reynolds numbers but marginal for drag at higher ones. This agrees with the user guide's warning that moderate Reynolds numbers, with small bubbles, need the finest paneling [#xfoildoc]. More striking, $N = 120$ *failed* to converge in 200 iterations for two of the three cases, while $N = 100$ and $N = 140$ converged in 4–8 iterations. Robustness is not monotonic in resolution. The likely reason is again the discrete position of transition relative to the nodes.

![Fig. {f:panels}. Change in $C_l$ and $C_d$ relative to N = 360 as the number of panel nodes is varied; crosses mark non-converged results. [wide]](fig/f07_panels)

The `VACC` parameter, which drops small mass-influence terms in `BLSOLV` (Section III-H), behaves similarly. With the default of 0.01, the three hardest low-Reynolds-number sweeps of 45 points converged 45, 43 and 44 points. Exact elimination ($0$) converged 44, 44 and 43 points. At 0.05 they converged 44, 35 and 28 points with up to four times the iterations. At 0.1–0.2, two sweeps hung outright and the others converged only 25–36 of 45 points. The approximate Newton step buys speed at the cost of robustness, and the default sits at the edge of the safe range.

## Transition Model Sensitivity

The simplified envelope $e^N$ method has one free parameter, $N_{crit}$, and the user must choose it. Fig. {f:ncrit} shows its influence. For NACA 4412 at $Re = 2\times10^6$, drag at $C_l = 0.6$ falls from 83 counts at $N_{crit} = 1$ to 60 at 9 and 49 at 13. Between $N_{crit} = 7$ and 11, which by ({e:mack}) corresponds to free-stream turbulence between 0.16 % and 0.03 %, it varies by ±10 % (66 to 54 counts). For NACA 0012 at $Re = 10^6$, $C_{l,max}$ ranges from 1.47 to 1.31 over the same span of $N_{crit}$. At $Re = 2\times10^5$ the trend is not even monotonic: drag at $C_l = 0.6$ is lowest at $N_{crit} \approx 7$ (103 counts) and rises both for earlier transition (133 counts at $N_{crit} = 1$) and for later transition (117 counts at 13), because a later transition lengthens the laminar separation bubble. A single, user-chosen scalar therefore controls drag predictions to ±10 % or more. That is comparable to the differences between competing airfoils that XFOIL is used to rank.

![Fig. {f:ncrit}. Drag polars of NACA 4412 at Re = 200 000 and 2 000 000 for four values of $N_{crit}$. [wide]](fig/f09_ncrit)

## Compressibility Limit

Fig. {f:mach} shows NACA 0012 at $\alpha = 2^\circ$ as the Mach number increases. XFOIL's minimum pressure coefficient reaches the sonic value $C_p^*$ at $M_{cr} \approx 0.63$. Beyond this the Kármán–Tsien correction ({e:kt}) has no physical basis, because the real flow contains a supersonic pocket and a shock. Yet XFOIL continued to return converged solutions, inviscid and viscous, up to $M = 0.8$ with no warning. The inviscid lift reached 0.50, twice the incompressible value. XFOIL does compute and display the sonic $C_p$, but it neither flags nor refuses supercritical cases, so a batch user can silently obtain meaningless transonic data.

![Fig. {f:mach}. NACA 0012 at α = 2°: lift against Mach number (left) and minimum pressure coefficient against the sonic value (right). XFOIL keeps converging beyond the critical Mach number of about 0.63. [wide]](fig/f13_mach)

## Output Smoothness and Gradients

Optimisers need smooth objectives. Fig. {f:noise} shows drag and its derivative for NACA 2412 at $Re = 10^6$ and NACA 4412 at $Re = 2\times10^5$, computed in $0.02^\circ$ steps with the full-precision build. The drag curve looks smooth, but its derivative carries a saw-tooth whose period matches the movement of the transition point from one boundary-layer station to the next. Measured against a 15-point moving average, the oscillation has a standard deviation of 1.8 counts per degree. That is about 30 % of the typical gradient for the 2412 and 20 % for the 4412. Near the drag minimum of the 2412, the local slope changes sign nine times where the smoothed slope changes sign once. The function is continuous but not smooth, because the transition location moves in discrete jumps.

![Fig. {f:noise}. Drag (left) and finite-difference drag slope with Δα = 0.02° (right): the saw-tooth in the slope comes from transition moving between discrete boundary-layer stations. [wide]](fig/f10_noise)

The response to a smooth geometric change is better behaved. Fig. {f:tscan} scans the thickness of NACA 2412 from 9.6 % to 15.6 % in 201 steps (using `GDES TFAC`) at fixed $C_l = 0.5$. At full precision the drag rises monotonically, without a single sign change of its slope. However, 11 of the 201 cases at $Re = 10^6$ (5.5 %) failed to converge. Fig. {f:fd} shows central finite-difference derivatives against step size. With full-precision output they are stable down to a relative step of $10^{-5}$, to four digits at $Re = 3\times10^5$ and to about 2 % at $10^6$. With XFOIL's printed output of five decimal places, the same derivatives are already wrong by 30 % at a relative step of $5\times10^{-3}$ and by more than 100 % at $10^{-3}$ and below, and at $Re = 3\times10^5$ they become exactly zero for steps of $5\times10^{-4}$ or less.

![Fig. {f:tscan}. Drag at $C_l$ = 0.5 against thickness for NACA 2412 scaled with TFAC: smooth at full precision, but with scattered non-converged cases (missing points).](fig/f11_tscan)

![Fig. {f:fd}. Central finite-difference derivative of drag with respect to thickness against relative step size, from full-precision values and from XFOIL's five-decimal output.](fig/f12_fd)

Fig. {f:dspace} extends the scan to two design variables. Thickness and camber of NACA 2412 were scaled together over a $25\times25$ grid (9–16 % thickness, 0–5 % camber) at $C_l = 0.6$ and $Re = 3\times10^5$. The converged drag field is smooth, with its minimum at the thin, highly cambered corner. But 17 of the 625 points (2.7 %) failed, and the failures are scattered across the interior of the space, not confined to its edges. A gradient-based optimiser crossing this space would meet a hole roughly every 37 evaluations. A population-based one would see random penalties that are unrelated to aerodynamics.

![Fig. {f:dspace}. Drag at $C_l$ = 0.6 and Re = 300 000 over a thickness–camber grid of NACA 2412 derivatives (625 XFOIL solutions). Crosses mark the 17 non-converged designs, which lie inside the space; the star marks the grid minimum.](fig/f19_dspace)

These results separate three sources of "noise" that are often confused. The first is *truncated output*, which is entirely an interface problem and is solved by passing doubles instead of text. The second is *convergence failures*, about 5 % of design points, which an optimiser sees as holes or penalties. The third is *genuine non-smoothness* from discrete transition, which matters most for derivatives with respect to angle of attack or lift coefficient and for points near the ends of a laminar bucket. NeuralFoil's smooth outputs remove all three by construction [#sharpe25]. Xoptfoil2's "retry" and "outlier detection" features address the second and third heuristically [#xoptfoil2]. Section VI proposes remedies at the source.

## Comparison with a Learned Surrogate

Because NeuralFoil is trained on XFOIL [#sharpe25], it offers a useful check on how much of XFOIL's behaviour is physics and how much is numerics. Its largest ("xlarge") model was run over the same matrix and compared with the 1880 points that XFOIL converged with strategy S3 (Fig. {f:nf}). Lift agrees to a median of 0.006–0.012, and drag to a median of 1.3–2.5 %, depending on Reynolds number. The 90th-percentile drag difference is 7–11 %, concentrated near stall and at the lowest Reynolds numbers, where XFOIL's own solutions are least certain. NeuralFoil evaluated the whole matrix in 0.26 s, against roughly 290 s of XFOIL time (more than a thousandfold faster), and returned the 625-point design map of Fig. {f:dspace} in 10 s without a single failure. Most telling is the drag slope in the right panel of Fig. {f:nf}. NeuralFoil reproduces XFOIL's mean trend but not its saw-tooth. The surrogate has effectively learned XFOIL's physics while averaging out its discretisation artefacts, which is exactly what remedies 4 and 7 of Section VI aim to do inside XFOIL itself.

![Fig. {f:nf}. NeuralFoil (xlarge) against XFOIL 6.99 over the convergence matrix: lift (left) and drag (centre) for all points converged by XFOIL, and the fine-α drag slope for NACA 2412 at Re = 1 000 000 (right). [wide]](fig/f20_neuralfoil)

## Limitations of This Study

The experiments compare XFOIL with itself, with variants of itself and with a surrogate trained on it. They measure *numerical* behaviour (convergence, smoothness, sensitivity) and say nothing about how close XFOIL is to wind-tunnel data. For that, the extensive published validation of XFOIL and RFOIL should be consulted [#drela89], [#timmer03], [#tnowake]. The test sections are all NACA four- and five-digit airfoils. Modern laminar and low-Reynolds-number sections with long pressure recoveries may behave differently, although the mechanisms identified (transition-station lock-up, failure propagation) are generic. Only one paneling (160 nodes) was used for the convergence matrix, and Section V-F showed that robustness depends on it in a non-monotonic way. Finally, the recovery strategy S3 was implemented outside XFOIL. A built-in version could restore the state exactly rather than by re-solving, and would be cheaper.
