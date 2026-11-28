# Practical Guidance for Current Users

Until such changes reach the code, most of the benefit can be obtained by how XFOIL is used. Table {t:guide} collects the settings and checks that the experiments of Section V support.

: TABLE {t:guide}. Recommended practice with XFOIL 6.99 and its ports. [wide]

| Topic | Recommendation | Basis |
|:---|:---|:---|
| Iterations | Set `ITER` to 100–150; the default 20 loses about 10 % of points | Table {t:conv} |
| Sweeps | Start each sweep near zero lift and march outwards in steps ≤ 0.5°; run separate upward and downward sweeps | Fig. {f:failmap} |
| After a failure | Do not continue from the failed state: re-solve the last good point (or `INIT` there), then approach the target in smaller steps; try a cold start at the target last | Figs. {f:rms}, {f:failprop} |
| Paneling | ≥ 160 nodes at low $Re$; ≥ 200 for drag at $Re \gtrsim 10^6$; refine if $H_k$ drops by > 1 per node after transition | Figs. {f:bl}, {f:panels} |
| `VACC` | Leave at 0.01 or set to 0; never increase it for speed | Section V-F |
| $N_{crit}$ | Choose from the expected turbulence level by ({e:mack}); report results for a range (for example 7–11), not one value | Fig. {f:ncrit} |
| Mach number | Check $C_{p,min}$ against $C_p^*$; discard results above $M_{cr}$ | Fig. {f:mach} |
| Wrappers | Read full-precision values (or polar files with care); never finite-difference five-decimal output with relative steps below about $10^{-2}$ | Fig. {f:fd} |
| Optimisation | Treat non-converged points explicitly (retry, then penalise); constrain curvature; use several operating points and $N_{crit}$ values | Section V-I |
| Multi-element | Use panel-type tools only for inviscid load split and early gap/deflection sizing; use MSES or RANS for $C_{l,max}$ | Section VII |

# A Prioritised Roadmap

The improvements of Section VI differ widely in cost. Table {t:roadmap} orders them into three stages, so that each stage is useful on its own and none needs the next.

: TABLE {t:roadmap}. Suggested order of work.

| Stage | Contents (Section VI item) | What the user gains |
|:---|:---|:---|
| 1. Weeks | Restore last converged state, bisection continuation, ITER ≥ 100, stagnation flag, exact BLSOLV (1, 2, 5, 6); supercritical warning (10); full-precision API output (15) | About 60 % fewer failures; no silent transonic data; usable finite differences |
| 2. Months | Residual line search or pseudo-transient continuation (3); smooth transition (4); adaptive paneling (7); $N_{crit}$ from $Tu$ with uncertainty bands (8); re-entrant library and regression suite (15, 16) | Smooth, robust polars; honest drag bands; parallel batch use |
| 3. Longer | Adjoint sensitivities (12); stall, wake and source-term physics (9, 11); multi-fidelity optimisation workflow (13, 14); Euler or MSES-class coupling for transonic and multi-element work (10, Section VII) | Gradient-based design; better $C_{l,max}$; wider envelope |

Stage 1 needs no change to the physics or to the Newton system. Every item in it can be implemented around the existing routines, as the external driver of this study shows, and the benefits were measured in Section V. Stage 2 changes the numerics of the boundary-layer system. Its effects must be verified against the regression suite so that drag predictions do not drift. Stage 3 is research. Its value is greatest for optimisation, where XFOIL's formulation already contains almost everything needed for exact gradients.

# Conclusions

1. **History.** XFOIL combined a high-order panel method with the fully coupled viscous–inviscid Newton method of ISES in an interactive program (1986). Its boundary-layer formulation was aligned with MSES by 1994 and it was frozen in 2000. Since then it has been preserved mainly through ports (XFLR5, flow5, QBlade, browser versions), physics branches (RFOIL, QFoil, RFOILVogue), re-implementations (mfoil, Viiflow), surrogates (NeuralFoil) and optimisers (Xoptfoil, Xoptfoil2). The official code received a source update (6.996) in January 2026.
2. **Convergence.** With default settings about one operating point in ten fails, and with 100 iterations about one in 26. The failures are numerical. Converged solutions are path-independent, failed points can lie within 0.1 % of the answer, and the dominant mechanism observed is a lock-up at the transition station. A failed state carried forward can corrupt an entire sweep. Tightening or adapting the step limiter does not help. Restoring the last converged state and re-approaching the target in smaller steps reduces failures by 61 % at twice the iterations per point.
3. **Accuracy.** Over a plausible range of $N_{crit}$, drag varies by ±10 % and $C_{l,max}$ by several per cent, which is comparable to the differences XFOIL is asked to resolve. Drag needs at least 200 panels at $Re \approx 3\times10^6$ to come within 0.3 % of the fine-paneling value. XFOIL silently returns converged answers beyond the critical Mach number.
4. **Optimisation.** The converged response to shape changes is smooth, and full-precision finite differences are stable down to tiny steps. The practical noise comes from five-decimal output, from roughly 5 % convergence failures and from the saw-tooth caused by discrete transition. The exact Newton Jacobian makes adjoint gradients available at the cost of one extra linear solve.
5. **Multi-element airfoils.** A panel method captures the inviscid mechanisms of slotted high-lift systems (slat, circulation and dumping effects), and it is the right tool for early sizing of gaps and deflections. It cannot predict maximum lift, the optimum gap, confluent boundary layers or wake bursting. In the two-element example, inviscid lift rose almost linearly to $C_l \approx 3.7$ at $40^\circ$ deflection and favoured a sealed slot, while the main-element wake had to recover $\Delta C_p \approx 2$ off the surface at $30^\circ$. An XFOIL-type extension is useful for transition and attached-flow drag on each element. Maximum lift requires solved wake trajectories and confluent-layer modelling (MSES) or RANS.

The method in XFOIL is not obsolete. Most of its weaknesses lie in a few identifiable places (state management, the transition switch, the step limiter and the program interface), and they can be fixed without giving up the speed and physical fidelity that made it the standard.

# Acknowledgement {.unnumbered}

The author acknowledges the use of Claude (Anthropic), a large language model, which assisted in the literature survey, the derivation checks against the XFOIL source code, the scripting and running of the numerical experiments, and the drafting of this paper. The author reviewed and takes responsibility for the content. The author also thanks Mark Drela and Harold Youngren for releasing XFOIL under the GNU General Public License, which made the source-level study possible.

# Appendix A: Equations and Source Routines {.unnumbered}

Table {t:code} maps each equation of Section III to the XFOIL 6.99 routine that implements it, as a guide for anyone modifying the code.

: TABLE {t:code}. Equations of Section III and the XFOIL 6.99 routines that implement them.

| Equation | Content | Routine (file) |
|:---|:---|:---|
| ({e:psi})–({e:super}) | Panel stream function, Kutta, superposition | PSILIN, GGCALC (xpanel.f) |
| ({e:kt}) | Kármán–Tsien correction | CPCALC (xfoil.f) |
| ({e:mass})–({e:dij}) | Mass defect, wake, influence matrix | XYWAKE, QDCALC, UESET, QVFUE (xpanel.f) |
| ({e:mom})–({e:disc}) | Integral equations, discretisation | BLDIF (xblsys.f) |
| ({e:hk})–({e:cteq}) | Closures | BLVAR, HKIN, HSL, HST, HCT, CFL, CFT, DIL, DILW (xblsys.f) |
| ({e:recrit})–({e:ctr}) | Amplification, transition interval | AXSET, DAMPL, DAMPL2, TRCHEK2, TRDIF (xblsys.f) |
| ({e:sy}) | Squire–Young drag | CDCALC (xfoil.f) |
| ({e:newton}) | Newton assembly and solution | SETBL (xbl.f), BLSOLV (xsolve.f), TESYS (xblsys.f) |
| ({e:rlx}) | Under-relaxation, update | UPDATE (xbl.f) |
| — | Initial marching, iteration loop | MRCHUE, MRCHDU (xbl.f), VISCAL (xoper.f) |

# Appendix B: Reproducibility {.unnumbered}

All experiments used XFOIL 6.99 (Debian source package 6.99.dfsg+1-3) compiled with `gfortran -O2 -fdefault-real-8 -std=legacy`, without floating-point trapping, on Linux. The scripts and raw results are kept with the paper's source in the site's GitHub repository (folder `papers/_content/xfoil-improvements-src`, subfolders `experiments/` and `data/`):

- `xfdrive.py`: prompt-synchronised driver, result parser, and the cold, continuation and recovery strategies (S0, S1, S3);
- `exp1_convergence.py`, `exp1_fill.py`, `exp_stalled.py`: the 1908-point matrix for each strategy, and the closeness of failed points to the converged answers;
- `exp_misc.py`: panel density, failure propagation, $N_{crit}$, fine-$\alpha$ smoothness, thickness scan, finite-difference gradients, Mach and `VACC` studies;
- `rms_hist.py`: the stalled-point histories of Fig. {f:rms};
- `exp_bl_anatomy.py`, `exp_design_space.py`: the converged solution of Fig. {f:bl} and the thickness–camber map of Fig. {f:dspace};
- `me_panel.py`, `exp_multielement.py`, `exp_slat.py`: the multi-element Hess–Smith panel code, the two-element flap study and the slat study;
- `xfoil-6.99-instrumented.patch`: the two variant builds. The first adds a full-precision output line. The second adds a relaxation switch (`XF_TRUST` = 0 stock, 1 adaptive step bound, 2 fixed bounds $[-0.4, 1.0]$);
- `calc_figs.py` and `data/`: all figures and summary numbers.

The instrumented changes add no physics. With `XF_TRUST` unset, the variant builds reproduce the stock results exactly.
