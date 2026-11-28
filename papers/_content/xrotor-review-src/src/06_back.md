# Current Use and Extensions

**Design and teaching.** XROTOR remains a standard free tool for designing a minimum-induced-loss propeller and checking it off-design, widely used by model-aircraft and UAV designers and in student projects, often with section data from XFOIL. Its interactive menus make it a good teaching tool for the vortex theory of the propeller. QPROP/QMIL serve the same community where sweeps over motor and propeller combinations matter more than the design menus [#qprop], [#lowe15].

**Research and optimisation frameworks.** The xrotor-python module was written so that a propeller analysis can be called many times inside optimisation and multidisciplinary design frameworks without file input and output [#xrotorpy]. A TU Delft study that compared XROTOR, JavaProp and the Adkins–Liebeck scheme against low-speed propeller data found the Adkins–Liebeck scheme the least reliable and chose XROTOR for the rest of its parametric optimisation work [#klein17]. NASA's Mars-helicopter papers cite XROTOR among the tools used in earlier analyses of the Ingenuity rotor [#koning23]. CROTOR has been used for coaxial drone rotors [#crotor].

**Where it sits among methods.** Blade-element momentum codes with Prandtl's factor, such as CCBlade [#ning14], are faster, more robust (CCBlade has guaranteed convergence) and differentiable, but they correspond to XROTOR's GRAD option. Section V-B shows that this option is accurate to about 2 % only for $\lambda\lesssim0.2$ with two blades. Free-wake vortex-lattice and vortex-particle methods resolve wake contraction, roll-up and blade–wake interaction, at hundreds to thousands of times the cost. XROTOR's potential formulation fills the gap between them: an exact rigid-helix solution for any blade number and advance ratio, at the cost of a fraction of a second per point. For ducted rotors DFDC and DuctAPE have superseded its velocity-ratio model [#dfdc05], [#mehr25]. For marine propellers, OpenProp and Kerwin's codes offer lattice and cavitation features that XROTOR lacks [#epps10], [#kerwin07].

# Limitations and a Prioritised Improvement Plan

## Physical Limitations

1. **Rigid, non-contracting helical wake.** The wake pitch adapts to loading ({e:adw}), but contraction, roll-up and the slipstream's radial velocities do not. At $C_T\approx0.12$ ($\lambda_w/\lambda>1.4$) this is a strong idealisation.
2. **Axial inflow only.** There is no angle of attack, so no in-plane forces, 1P loads or yawed-flow performance, and no unsteady response. Non-uniform inflow can only be axisymmetric (nacelle, slipstream file).
3. **Hub and duct models.** POT's infinite solid hub and the single velocity ratio for a duct are coarse, and Section V-B shows that the hub model alone decides the root loading of a design.
4. **Section model.** Thirteen parameters per section, linear interpolation between sections, no lift drop after stall, no rotational stall delay, a constant pitching moment and a correlation-based drag rise. Tabulated polars (as in xrotor-python) remove the shape restriction but, interpolated linearly, harm convergence (Section V-C).
5. **Compressibility.** Prandtl–Glauert scaling and the empirical drag rise are adequate below $M_{cr}$. Above it, the Mach-dependent stall limits break the potential solution's convergence (Fig. {f:mach}) and transonic tips are not credible.
6. **Lifting-line limits.** There is no chordwise loading, sweep (except constant rake with VRTX) or tip-shape effect, and the tip station sits within $0.0014R$ of the tip vortex.

## Prioritised Improvements

The following list is ordered by benefit for effort. Items A–F are local changes to the existing code; G–O are larger.

A. **Make the circulation filter conditional.** Apply FILTER only when the residual grows, or only in the first few iterations, and never in DEITER. This rescued every VRTX failure at low $J$ and the failed three-blade design (Section V-F) without affecting converged answers.

B. **Correct the five Jacobian errors** (Table {t:findings}, items 1–5), and verify the hand derivatives once against finite differences, as the port did. This also applies to the Python and C++ ports.

C. **Initialise DEFF and fix the design consistency issues** (items 6–8 and 13): use $\xi_w$ in the Betz condition or document why not, check every section's stall limits, and bracket the $\alpha(c_l)$ inversion.

D. **Smooth the section model's Mach terms.** Replace the hard clip at $M=0.99$ and the collapsing $c_{l,max}$, $c_{l,min}$ with smooth, monotone functions, so that transonic-tip points fail physically (large drag) rather than numerically.

E. **Double precision and a residual-based globalisation.** Promote all reals to REAL\*8. Accept a step only if a merit function of the residuals decreases, and back-track otherwise. This replaces the fixed $\omega=0.2$ start and most of the ad hoc limits.

F. **Continuation in sweeps.** Start each point of a sweep from the last converged one and, on failure, restore that state and halve the step in $J$ or $\beta$. The same fix cut XFOIL's failures by 60 % [#anandxfoil].

G. **A re-entrant library interface** with a documented input file, return codes and no COMMON state, as xrotor-python began. This would make batch and optimisation use safe.

H. **Analytic sensitivities.** The Newton Jacobian already exists, so the adjoint of the converged system gives exact derivatives of thrust, power and efficiency with respect to chord, twist and operating point at the cost of one extra linear solve. That is what gradient-based optimisation needs.

I. **Smooth tabulated polars.** Fit splines or monotone cubic curves to XFOIL polars with continuous $\partial c_l/\partial\alpha$, keeping XROTOR's smooth stall limiter as a fallback.

J. **Rotational augmentation and post-stall data** (Du–Selig or similar corrections [#duselig]) for the inner blade at low $J$ and for wind turbines.

K. **A better hub model.** Let the user set the hub boundary condition between solid and free, or model a finite spinner, so that root loading is not an accident of the formulation.

L. **Wake contraction** in the potential formulation, for example by mapping the helicoidal solution onto the momentum-theory slipstream radius, as the equivalent-propeller machinery already does for the nacelle.

M. **Non-axial inflow** through a harmonic-balance or azimuth-stepping extension, for 1P loads and yawed flow.

N. **Coupling with DFDC-type duct models** in the same code base.

O. **Remove dormant code and fix the documentation**: TMOM and PMOM, the unused ADVFACT, the common NN and XINF, and a user guide updated past 2003.

# Practical Guidance for Present Users

* Use POT (the default) for design and analysis. Use GRAD only for quick estimates at $\lambda\lesssim0.2$ with two blades, or $\lambda\lesssim0.3$ with four or more. Use VRTX only for raked blades, and check it against POT on an unraked equivalent.
* Look at the root. Compare designs from POT and VRTX: if the root chord or loading differs a lot, decide which hub condition your spinner resembles, and do not trust the root efficiency to better than the difference.
* Keep 30 stations. Refining to 60 or 100 does not converge POT further, and the station limit is 100.
* When a point fails, it is usually either deep stall at low $J$ and high pitch or a transonic tip near $M_{cr}$. Approach such points gradually from a converged neighbour, and if a point still fails, raise $M_{cr}$ slightly to see whether the section model is the cause.
* Do not trust a point after a failed one. The stored circulation is the start of the next solution; re-initialise (or re-load) after any non-convergence.
* For ducted designs in 7.55, check the convergence history by eye (item 6).
* Fit section parameters to XFOIL polars at the right Reynolds and Mach numbers for each section, and remember that the model does not lose lift after stall.

# Conclusions

XROTOR packages the classical vortex theory of Betz, Prandtl, Goldstein and Theodorsen into a fast, carefully linearised Newton solver for design and analysis. Its core has changed little since 2003. This review traced its history, wrote down its equations and examined its source and its behaviour, and reached five main conclusions.

1. **The method is sound and self-consistent.** Designs re-analyse to their design power exactly, two independent wake models agree within 1 % at mid-span, and the self-deforming wake reproduces the actuator-disk efficiency to within 0.4 points with many blades.
2. **The choice of wake model matters more than the discretisation.** Graded momentum over-predicts thrust by 6 % at $\lambda=0.3$ and 18 % at 0.5 for two blades. The three models embody different hub assumptions and give root swirls that differ by a factor of 7. The default of 30 stations and 128 harmonics is accurate to about 0.2 %.
3. **The source contains small but real faults.** Five errors in the hand-coded Jacobian, two of which the Python port inherited, an uninitialised variable in ducted design and an inconsistent design condition are among 18 findings. None changes a converged analysis answer, but they affect convergence and design.
4. **Robustness is limited by two mechanisms that can be fixed.** First, the circulation filter introduced in 7.30 helps the potential formulation in deep stall but traps vortex-wake analyses and a graded-momentum design in cycles. Second, the Mach-dependent stall limits make the potential solution fail near the sections' critical Mach number. XROTOR's limiters are essential: without them only 25 % of a stall-heavy map converges, against 91 % with them.
5. **It remains a practical design tool at both ends of the scale.** The same code designs a 10-inch UAV propeller and sizes a 441 m, 60 MW wind rotor in seconds. Its results are credible first designs, provided the user checks the root region, the low-Reynolds-number drag and, for windmills, which solution branch was found.
6. **The best improvements are cheap.** A conditional filter, corrected derivatives, smooth Mach terms, double precision with a residual-based line search, and a library interface with adjoint sensitivities would make XROTOR a robust, differentiable component for modern optimisation. Its core formulation would remain unchanged, and that formulation is still the best available at its cost.

# Acknowledgement {.unnumbered}

The author acknowledges the use of Claude (Anthropic), a large language model, which assisted in the literature survey, the source-code review, the porting of the solver, the scripting and running of the numerical experiments, and the drafting of this paper. The author reviewed and takes responsibility for the content. The author also thanks Mark Drela and Harold Youngren for releasing XROTOR under the GNU General Public License, which made a source-level study possible.

# Appendix A: Equations and Source Routines {.unnumbered}

: TABLE {t:code}. Equations of Section III and the XROTOR 7.55 routines that implement them.

| Equation | Routine (file) |
|:---|:---|
| ({e:setx}) station spacing | SETX (xrotor.f) |
| ({e:triangle}) velocity triangle | CSCALC (xoper.f) |
| ({e:gamcl}) Γ–$c_l$ residual | APITER (xoper.f) |
| ({e:tinv}), ({e:tvis}), ({e:tw}) forces | TPQ (xoper.f) |
| ({e:gradmo}) graded momentum | GRADMO (xoper.f) |
| ({e:helico}), ({e:swirl}) potential wake | HELICO (xoper.f) |
| ({e:biot}) vortex wake | VRTXCO, VORSEGVEL (vortex.f) |
| ({e:adw}) wake advance ratio | APITER, DEITER |
| ({e:setxw}) equivalent propeller | SETXW, XWINIT (xoper.f) |
| ({e:cl}), ({e:cd}) section model | CLCDCM, GETCLCDCM, GETALF (xaero.f) |
| ({e:betz}) MIL condition | DEITER, DESINI (xdesi.f) |
| relaxation and filter | APITER, FILTER (xoper.f) |

# Appendix B: Reproducibility {.unnumbered}

The port (pyxr.py), the test cases (cases.py), the experiment driver (experiments.py), the figure script (make_figs.py) and all result files (JSON) are kept with the paper sources on the author's site repository. Every number in Section V can be regenerated with `python3 experiments.py swirl ideal design jsweep disc mach formerr prop10 wt60` and the robustness map with `exp_robust`. Together these runs, with `prop10` and `wt60` for the worked designs, solved about 2 800 operating points and 70 designs. The XROTOR 7.55 source used for the review is the GPL distribution [#xrotorweb], mirrored on GitHub.
