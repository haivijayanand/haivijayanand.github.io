::: abstract
**Abstract**—XFOIL, written by Mark Drela in 1986 and frozen at version 6.9 in 2000, is still the most widely used tool for subsonic airfoil analysis and design, and its predictions now train machine-learned surrogates. This paper reviews its history and its present family of ports, physics branches, re-implementations and surrogates. It sets out the complete governing equations of version 6.99: the linear-vorticity panel method, mass-defect coupling, the integral momentum, kinetic-energy, shear-lag and amplification equations with all closures, and the global Newton system. It then measures XFOIL's weaknesses directly, using 13 356 operating-point solutions on six NACA sections between $Re = 5\times10^4$ and $3\times10^6$. With the default iteration limit, 10.7 % of operating points fail to converge; with 100 iterations, 3.8 % still fail. Failures are numerical rather than physical. A stalled point sat within 0.1 % of its answer, locked in a cycle at the transition station. A single failure can corrupt every later point of a sweep, while converged solutions show no hysteresis. Changing the Newton step limiter alone made matters worse, but restoring the last converged state and re-approaching the target in smaller steps cut failures from 72 to 28 of 1908 points. The study further shows that drag varies by ±10 % over a plausible range of the transition parameter $N_{crit}$, and that the drag slope carries a 20–30 % saw-tooth from discrete transition. XFOIL also keeps returning converged answers above the critical Mach number, and finite-difference gradients through its five-decimal output are wrong by more than 100 % at relative steps of $10^{-3}$ and below. Sixteen improvements are proposed, from state restoration, residual-based globalisation and smooth transition to adjoint sensitivities and a re-entrant library interface. A two-element panel study shows that potential-flow methods capture Smith's circulation and dumping effects (the flap multiplies the main element's lift 3.7-fold at $20^\circ$). However, they predict ever-rising lift and a zero optimum gap, and they cannot represent confluent boundary layers or wake bursting. Panel methods are therefore suitable for sizing multi-element airfoils but not for their maximum lift, which needs MSES-class or RANS methods.
:::

::: keywords
***Index Terms***—XFOIL, airfoil analysis, viscous–inviscid interaction, integral boundary layer, panel method, $e^N$ transition, Newton method, convergence, continuation, adjoint, airfoil optimization, MSES, RFOIL, mfoil, NeuralFoil, multi-element airfoil, high lift, wake bursting.
:::

# Nomenclature {.unnumbered}

| Symbol | Meaning |
|:---|:---|
| $C_d$, $C_{d,f}$, $C_{d,p}$ | Section drag; friction and pressure parts |
| $C_D$ | Boundary-layer dissipation coefficient |
| $C_f$ | Skin-friction coefficient |
| $C_l$, $C_m$ | Section lift and moment coefficients |
| $C_p$, $C_p^*$ | Pressure coefficient; sonic value |
| $C_\tau$, $C_{\tau,eq}$ | Maximum shear-stress coefficient; equilibrium value |
| $D_{ij}$ | Mass-defect influence matrix |
| $H$, $H_k$ | Shape parameter $\delta^*/\theta$; kinematic shape parameter |
| $H^*$, $H^{**}$ | Kinetic-energy and density-flux shape parameters |
| $M$, $M_e$, $M_{cr}$ | Free-stream, edge and critical Mach numbers |
| $m$ | Mass defect $u_e\delta^*$ |
| $N$, $N_{crit}$ | Number of panel nodes; critical amplification exponent |
| $\tilde n$ | Amplification exponent of Tollmien–Schlichting waves |
| $Re$, $Re_\theta$ | Chord and momentum-thickness Reynolds numbers |
| $\mathbf R$, $\mathbf U$ | Residual vector; vector of boundary-layer unknowns |
| $Tu$ | Free-stream turbulence intensity |
| $u_e$, $U_s$ | Edge velocity; normalised wall slip velocity |
| $\alpha$ | Angle of attack |
| $\gamma$, $\sigma$ | Panel vortex and source strengths |
| $\delta$, $\delta^*$, $\theta$ | Boundary-layer, displacement and momentum thicknesses |
| $\delta_f$ | Flap deflection |
| $\xi$ | Arc length from the stagnation point |
| $\Psi$, $\Psi_0$ | Stream function; its surface value |
| $\omega$ | Newton under-relaxation factor |

: Nomenclature [nomen]

# Introduction

More than 35 years after its first version, XFOIL [#drela89] remains the reference tool for the analysis and design of subsonic airfoils. It is used to design sailplane, model-aircraft, propeller, UAV, wind-turbine and marine-turbine sections [#timmer03], [#fidkowski22]. It is taught in aerodynamics courses everywhere. It sits inside XFLR5, QBlade and a family of optimisers, and its outputs are the training data for machine-learned surrogates such as NeuralFoil [#sharpe25]. Yet its authors declared it frozen in 2000 [#xfoildoc]. Its numerics date from 1987–1996, and its users have long worked around convergence failures, "jagged" polars and an ill-defined transition parameter.

This paper asks three questions.

1. *Where did XFOIL come from, and where does it stand today?* Section II traces its origin in the ISES code and the MIT Daedalus project and its evolution to version 6.99. Section IV surveys the current official code and its branches: ports, physics modifications, re-implementations and surrogates.
2. *What exactly limits its results and its convergence, and how can it be improved, including for optimisation?* Section III sets out the full governing equations, so that each weakness can be traced to a specific term. Section V measures those weaknesses with more than 13 000 XFOIL runs: convergence statistics, anatomy of a failure, failure propagation, panel and solver sensitivity, transition-parameter sensitivity, the compressibility limit and the smoothness of the outputs. Section VI proposes sixteen improvements tied to that evidence.
3. *Can the panel-method approach be extended to multi-element airfoils?* Section VII answers this with the physics of high-lift systems and a two-element panel computation.

Section VIII gives practical guidance for current users, Section IX a prioritised roadmap and Section X the conclusions. The experiments use the unmodified XFOIL 6.99 source, two small instrumented variants and an independent multi-element panel code. All scripts and results are listed in the Appendix so that every number can be reproduced.
