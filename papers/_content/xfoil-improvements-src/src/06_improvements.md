# Proposed Improvements

The improvements below are grouped by goal: robustness and convergence, physical accuracy, optimisation, and software. Each is tied to the evidence of Section V and to the equation it changes in Section III. Table {t:improve} at the end summarises them.

## Robustness and Convergence

**1. Never continue from a failed state.** The single most effective change is also the simplest. XFOIL already knows whether the current state is converged (its `LVCONV` flag). It should keep a copy of the last converged boundary-layer state and restore it automatically after a failure, instead of using the unconverged state as the next initial guess. Section V-E showed one failure making 89 subsequent points fail. The recovery strategy S3, which does this from outside the code, raised convergence from 96.2 % to 98.5 % (Table {t:conv}).

**2. Adaptive continuation with step bisection.** After a failure, the request should be approached again in progressively smaller steps from the restored state, with a cold start at the target as a last resort. This is the rest of S3, and mfoil uses a similar continuation strategy [#fidkowski22]. Continuation theory gives a sounder basis than ad-hoc halving. Arc-length continuation [#allgower] can follow a polar through its maximum-lift fold, and a lift-prescribed solve (XFOIL's `CL` mode) cannot do that.

**3. Globalise Newton with a residual merit function.** Fixed or adaptive bounds on the *step* (S2, S2b) did not help, because XFOIL's step norm is a poor measure of progress. The natural alternative is a backtracking line search, or a dogleg trust region, on the *residual* norm $\phi(\mathbf U) = \tfrac12\|\mathbf R(\mathbf U)\|^2$ [#nocedal]. A step $\omega\,\delta\mathbf U$ is accepted only if

$$\phi(\mathbf U + \omega\,\delta\mathbf U) \le (1 - 2c\,\omega)\,\phi(\mathbf U), \qquad c \approx 10^{-4} , \tag{e:armijo}$$

with $\omega$ halved otherwise. Each trial costs one residual evaluation, much cheaper than a Jacobian factorisation. For starts far from the solution, *pseudo-transient continuation* adds a vanishing time-like diagonal to the Jacobian,

$$\begin{aligned}&\left(\frac{1}{\Delta\tau_k}\mathbf I + \frac{\partial\mathbf R}{\partial\mathbf U}\right)\delta\mathbf U = -\mathbf R,\\ &\Delta\tau_{k+1} = \Delta\tau_k\,\frac{\|\mathbf R_{k-1}\|}{\|\mathbf R_k\|} ,\end{aligned} \tag{e:ptc}$$

and has a convergence theory for exactly this kind of steady problem with poor initial guesses [#kelley]. It would replace both the cold-start initialisation and the step limiter ({e:rlx}).

**4. Smooth the transition switch.** Section V-D traced a stalled iteration to the transition station, and Section V-I traced the saw-tooth in $dC_d/d\alpha$ to transition moving between stations. Both come from the discrete switch between ({e:amp}) and ({e:lag}). A smooth alternative blends the laminar and turbulent closures over a short distance with an intermittency $\gamma_{tr}(\xi)$. For example,

$$\begin{aligned} C_f &= (1 - \gamma_{tr})\,C_{f,lam} + \gamma_{tr}\,C_{f,turb},\\ \gamma_{tr} &= \tfrac12\left[1 + \tanh\frac{\xi - \xi_{tr}}{\Delta_{tr}}\right] ,\end{aligned} \tag{e:interm}$$

with $\xi_{tr}$ a continuous unknown, located by $\tilde n(\xi_{tr}) = N_{crit}$, and $\Delta_{tr}$ a few momentum thicknesses. Then every residual is differentiable in the transition location. mfoil's re-marching of the transition point after each update and its small positive term $\epsilon_{\tilde n}$ that keeps $d\tilde n/d\xi$ from stalling are steps in this direction [#fidkowski22].

**5. Detect stagnation and report quality.** The point in Fig. {f:rms} sat within 0.1 % of its converged answer for 97 iterations and was then discarded. XFOIL should recognise a stalled RMS (no decrease over several iterations, with the maximum change at the transition station) and either apply remedies 3–4 or return the result flagged as "stalled" with its residual. The user can then decide. Section V-D shows that a simple threshold works: failed points that stall with an RMS below $10^{-2}$ were within 1 % of the converged answer in 14 of 15 cases. The default iteration limit should rise from 20 to at least 100, which on its own removed 65 % of failures (Section V-C).

**6. Solve the Newton system exactly.** With $N \approx 200$ nodes the Newton system has about 600 unknowns. Today it is solved in a few milliseconds by dense LU, so the `VACC` approximation (Section V-F) saves little and costs robustness. Exact elimination, or `VACC` $\le 0.01$, should be the default.

**7. Adaptive paneling.** The user guide already states the resolution rule for bubbles: $H_k$ should not fall by more than 1.0, and $u_e$ should not change by more than 0.05, between nodes after transition [#xfoildoc]. These checks can be automated. After convergence, nodes are added where the rule is violated and the point is re-solved. That also removes the non-monotonic robustness with $N$ seen in Fig. {f:panels}. Adding a stagnation-point formulation like mfoil's [#fidkowski22] would suppress leading-edge oscillations in $H_k$ at fine paneling.

## Physical Accuracy

**8. Tie $N_{crit}$ to the environment and quantify its uncertainty.** Section V-G showed drag changing by ±10 % over a plausible $N_{crit}$ range (7–11), and $C_{l,max}$ by up to ±6 % over $N_{crit}$ = 1–13. XFOIL should accept a turbulence intensity and convert it by ({e:mack}), and it should report polars as bands over an $N_{crit}$ interval rather than single curves. A bypass-transition criterion for high-turbulence or rough-surface cases, such as wind and marine turbines, propellers in slipstreams and eroded blades, would replace the advice to "set $N_{crit}$ to 1 or less" [#xfoildoc]. The Abu-Ghannam–Shaw correlation [#ags] is a natural candidate. It gives the transition momentum-thickness Reynolds number from $Tu$ (in per cent) and the pressure-gradient parameter $\lambda_\theta = (\theta^2/\nu)\,du_e/dx$:

$$\begin{aligned} Re_{\theta,tr} &= 163 + \exp\!\left[F(\lambda_\theta)\left(1 - \frac{Tu}{6.91}\right)\right],\\ F(\lambda_\theta) &= \begin{cases} 6.91 + 12.75\lambda_\theta + 63.64\lambda_\theta^2, & \lambda_\theta < 0,\\ 6.91 + 2.48\lambda_\theta - 12.27\lambda_\theta^2, & \lambda_\theta \ge 0. \end{cases}\end{aligned} \tag{e:ags}$$

Transition would then be taken at whichever comes first, $\tilde n = N_{crit}$ or $Re_\theta = Re_{\theta,tr}$. Both inputs are already available at every station. The Orr–Sommerfeld database shipped with XFOIL is used only by a post-processing plot of individual-frequency amplification. It could support a frequency-resolved $e^N$ option in the solver itself, so that the envelope simplification in ({e:dndx}) becomes a choice rather than a necessity.

**9. Better stall and post-stall prediction.** XFOIL, like RFOIL, over-predicts lift on thick sections for a wide range of angles, partly because the wake geometry is taken from the inviscid solution [#tnowake]. Three established changes address this. The first makes the lag constant in ({e:lag}) depend on $H_k$ (QFoil: $K_C = 4.65 - 0.95\tanh[0.5(H_k - 3.5)]$). The second strengthens wake dissipation (RFOIL, QFoil). The third displaces the wake trajectory by the viscous displacement thickness [#vanrooij96], [#qfoil]. Beyond these, deep stall needs a model that admits large-$H_k$ reversed-flow profiles without the clipping of Section III-H, or an explicit separated-wake (free-streamline) model, and it should be validated against data rather than tuned to it.

**10. Respect the compressibility limit.** XFOIL should warn when $C_{p,min}$ passes $C_p^*$ (Fig. {f:mach}) and refuse to report drag beyond a small supersonic margin. For transonic sections, the coupled Euler formulation of ISES and MSES [#drela87], [#mses] or a full-potential outer flow is the proper upgrade. The Kármán–Tsien correction cannot be patched to cover shocks.

**11. Source terms for real-world effects.** Several practical effects can be added as source terms or modified closures in the integral equations. Examples are vortex generators (RFOILVogue [#sahoo26]), rotational augmentation on rotor blades (RFOIL [#vanrooij96]; Du–Selig-type stall delay [#duselig]), roughness and erosion (modified $C_f$ and transition), and suction or blowing (a wall mass-flux term in ({e:mom})). Each keeps the cost of the method unchanged.

## Optimisation

**12. Analytic sensitivities by the adjoint method.** At convergence XFOIL holds the exact Jacobian $\partial\mathbf R/\partial\mathbf U$ of ({e:newton}). For any output $f$ (such as $C_d$ at fixed $C_l$) and design variables $\mathbf x$ (shape parameters), one extra linear solve with the transposed Jacobian,

$$\begin{aligned}\left(\frac{\partial\mathbf R}{\partial\mathbf U}\right)^{\!T}\boldsymbol\lambda &= \left(\frac{\partial f}{\partial\mathbf U}\right)^{\!T},\\ \frac{df}{d\mathbf x} &= \frac{\partial f}{\partial\mathbf x} - \boldsymbol\lambda^T\frac{\partial\mathbf R}{\partial\mathbf x} ,\end{aligned} \tag{e:adjoint}$$

gives the gradient with respect to *all* design variables at once [#jameson]. The geometric terms $\partial\mathbf R/\partial\mathbf x$ come from differentiating the panel influence coefficients and arc lengths, either by hand or by algorithmic differentiation of the Fortran. MSES already provides such sensitivities to its optimiser [#mses], and differentiable re-implementations (AeroSandbox, Julia codes) show that the same is practical for XFOIL's model [#aerosandbox]. Fig. {f:fd} shows why this matters. Finite differences through XFOIL's text output are unreliable below a relative step of about $10^{-2}$ and useless at $10^{-3}$, and even full-precision differences need two solves per variable.

**13. Make the objective smooth before optimising it.** Analytic gradients of a non-smooth function are still unhelpful. Remedy 4 (smooth transition) and remedy 7 (adaptive paneling) remove the saw-tooth of Fig. {f:noise}. Returning doubles through an API (remedy 15) removes output quantisation. Point optimisation also tends to produce small bumps that exploit the separation-bubble model [#drela98]. Curvature constraints, as in Xoptfoil2 [#xoptfoil2], and multi-point or robust objectives (averaged over $N_{crit}$ and $Re$) counter this.

**14. Use surrogates for exploration, XFOIL for verification.** Smooth learned surrogates such as NeuralFoil are 8 to 1000 times faster and never fail to converge [#sharpe25]. A multi-fidelity workflow follows naturally. Global exploration with a surrogate, using CST [#kulfan], Bézier or Hicks–Henne [#hicks] parameters, is followed by gradient-based refinement with an adjoint-enabled XFOIL, and then by verification with MSES or RANS. Because the surrogates inherit XFOIL's physics, improvements 8–11 propagate to them when they are retrained.

## Software

**15. A library, not only a program.** The global `COMMON` state should be moved into a structure, as libxfoil has done [#libxfoil], so that several analyses can run concurrently. A small C/Fortran API should return full-precision coefficients, distributions, convergence diagnostics and error codes, with Python bindings. This removes the disk and text-parsing overheads that wrappers currently pay. The experiments in this paper needed a prompt-synchronised text driver, two instrumented builds and workarounds for three interface traps: `INIT` is a toggle, `VACC` lives in a different menu from `ITER`, and the packaged binary traps floating-point exceptions. A library would avoid all of these.

**16. Tests and validation in the open.** A public regression suite should cover reference airfoils at several $Re$, $M$ and $N_{crit}$, with stored polars and convergence statistics like Table {t:conv}, plus a validation set of wind-tunnel data. Then branch developers (RFOIL, QFoil, browser ports) could show that a change improves accuracy or robustness without regressions.

## What the First Improvements Change in Practice

Fig. {f:better} shows what items 1, 2, 5 and 8 change for a user, using the thin, highly cambered NACA 6409 at $Re = 10^5$, $\alpha = -4^\circ$ to $16^\circ$ in $0.25^\circ$ steps. With default settings (160 nodes, `ITER` 20, plain continuation), 74 of 81 points converge. The failures cluster at the negative-angle end and near $13^\circ$, exactly where a designer wants to know the drag rise and the stall. With 200 nodes, 100 iterations and the recovery procedure, all 81 points converge at $N_{crit} = 9$. Repeating the sweep at $N_{crit} = 7$ and 11 then gives the band that the environment justifies. Minimum drag ranges from 144 to 238 counts and $C_{l,max}$ from 1.49 to 1.63, compared with 183 counts and 1.54 at the nominal value. The band is far wider than the differences that are often used to choose between low-Reynolds-number sections. Reporting it is the honest output. The $N_{crit} = 11$ curve also shows a sudden lift drop near $7^\circ$ where its bubble changes character, a feature that a single nominal polar would hide.

![Fig. {f:better}. NACA 6409 at Re = 100 000: default XFOIL settings (dots; crosses mark the angles that failed) against continuation with recovery at three values of $N_{crit}$ (lines), showing complete polars and the spread due to the transition parameter. [wide]](fig/f21_better)

: TABLE {t:improve}. Summary of proposed improvements. [wide]

| # | Improvement | Evidence | Changes | Effort | Expected benefit |
|:---|:---|:---|:---|:---|:---|
| 1–2 | Restore last converged state; bisection continuation | Figs. {f:conv}, {f:failprop} | Driver logic | Low | Failures 72 → 28 of 1908 |
| 3 | Residual line search / pseudo-transient continuation | S2, S2b results | ({e:rlx}) | Medium | Robust cold starts, fewer stalls |
| 4 | Smooth transition (intermittency) | Figs. {f:rms}, {f:noise} | ({e:amp})–({e:lag}), ({e:ctr}) | Medium | Removes stalls and gradient saw-tooth |
| 5 | Stagnation detection; ITER ≥ 100 | Fig. {f:rms}, Table {t:conv} | Driver | Low | Failures 204 → 72 |
| 6 | Exact Newton elimination | VACC study | BLSOLV | Low | Robustness at no practical cost |
| 7 | Adaptive paneling, stagnation fix | Fig. {f:panels} | Paneling | Medium | Drag accuracy; fewer anomalies |
| 8 | $N_{crit}$ from $Tu$; bands; bypass transition | Fig. {f:ncrit} | ({e:mack}) | Low–medium | Honest ±10 % drag bands |
| 9 | Stall/post-stall closure and wake changes | [#tnowake], [#qfoil] | ({e:lag}), ({e:dit}), wake | Medium–high | Better $C_{l,max}$, post-stall |
| 10 | Supercritical warning; Euler option | Fig. {f:mach} | ({e:kt}) | Low / high | No silent transonic errors |
| 11 | Source terms (VG, rotation, roughness) | [#sahoo26], [#vanrooij96] | ({e:mom})–({e:lag}) | Medium | Wider applicability |
| 12 | Adjoint sensitivities | Fig. {f:fd} | New solve with ({e:newton}) | Medium | Exact gradients for all variables |
| 13–14 | Smooth objectives; surrogate + XFOIL workflow | Figs. {f:noise}, {f:tscan} | Workflow | Low | Reliable optimisation |
| 15–16 | Re-entrant library API; open tests | Section V-A | Code structure | Medium | Parallel use, reproducibility |
