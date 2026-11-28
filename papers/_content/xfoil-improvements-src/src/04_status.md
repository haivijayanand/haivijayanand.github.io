# Current Status and Branches

## The Official Code

The MIT XFOIL page still offers version 6.99 (source and a Windows build), the older 6.97, and a 6.996 Unix source update listed in January 2026 [#xfoilweb]. The code remains Fortran 77 with global `COMMON` blocks. It is interactive by design, driven from a menu at a text prompt, with X11 graphics, and it is distributed under the GPL. Linux distributions package it with small patches. The Debian/Ubuntu package used for this study applies fixes for modern gfortran compilers. Its default build traps floating-point exceptions, which made batch runs abort on the very first viscous point here (Section V). A user who wants XFOIL as a *library* (callable from Python, thread-safe, without disk I/O) must therefore turn to a derivative.

## Derivatives and Re-Implementations

Over 35 years, four kinds of descendant have appeared (Table {t:branches}, Fig. {f:timeline}).

- **Ports that keep the solver and add an interface.** XFLR5 translated XFOIL's analysis and inverse-design routines into C++ inside a Qt application, adding wing and aircraft analyses by lifting-line, vortex-lattice and panel methods [#xflr5]. Its successor flow5, described by its author as version 7 of XFLR5, became public and open source on 1 January 2026 [#flow5]. QBlade embeds the XFLR5 implementation for wind-turbine work. libxfoil moves XFOIL's global variables into a structure so that several independent instances can run in parallel, with C, Fortran and Python bindings [#libxfoil]. Several Python packages link the Fortran routines directly to avoid file I/O [#xfoilpy]. Browser ports compile XFOIL to WebAssembly or re-implement it in Rust or JavaScript. Flexcompute's Rust core is being released under the GPL with Drela's approval [#flexfoil], and Vibefoil describes itself as a numerically faithful JavaScript port.
- **Branches that change the physics.** RFOIL, developed at TU Delft with ECN (now TNO) from 1995–96, modified the turbulent closure and shear-lag treatment to improve prediction around maximum lift. It also added a rotational (stall-delay) model for wind-turbine blades [#vanrooij96], [#timmer03]. A 2026 extension, RFOILVogue, adds a vortex-generator source term to the integral equations [#sahoo26]. QFoil, distributed with QBlade, is a modified XFOIL 6.99 [#qfoil]. It tightens the Newton relaxation. The global under-relaxation starts at 0.7 instead of 1.0, the bounds in ({e:rlx}) narrow from $[-0.5,1.5]$ to $[-0.4,1.0]$, and the per-iteration lift change is limited to $\pm0.15$ instead of $\pm0.5$. It also makes the lag constant a function of $H_k$, $K_C = 4.65 - 0.95\tanh[0.5(H_k - 3.5)]$, divides the wake dissipation length by four in the RFOIL manner, and adds a post-stall correction to the Squire–Young drag.
- **Independent re-implementations of the same model.** Fidkowski's mfoil (Matlab and Python, MIT licence) re-derives XFOIL's equations in a single readable class [#fidkowski22], [#fidkowski23]. It changes the solver in instructive ways: an augmented state that includes $\Psi_0$ for better control of the update, a stagnation-point treatment that suppresses leading-edge oscillations of $H_k$, a small positive term that keeps $d\tilde n/d\xi$ from stalling near $N_{crit}$, re-marching of the transition location after each update, and an angle-of-attack continuation strategy. Viiflow solves the boundary layer in inverse form with a Newton coupling and reports better run times than XFOIL at high panel counts [#ranneberg]. Xfoil.jl (in FLOWFoil.jl) re-derives the inviscid part in Julia.
- **Surrogates trained on XFOIL.** NeuralFoil is a physics-informed neural network trained on millions of XFOIL runs [#sharpe25]. Its authors report a mean relative drag error of 0.37 % against XFOIL on simple cases and 2.0 % on a harder test set with post-stall and transitional cases. They also report speed-ups of 8 to 1000 times at equal accuracy and, importantly for optimisation, smooth outputs with no convergence failures. It is the aerodynamic engine of AeroSandbox [#aerosandbox]. Section V-J compares it with XFOIL on the test matrix of this study.

Optimisation front-ends form a fifth, parallel family. Xoptfoil [#xoptfoil] and its successor Xoptfoil2 [#xoptfoil2] wrap XFOIL in particle-swarm, genetic and simplex optimisers with Hicks–Henne or Bézier shape functions. Their features include "retry of unconverged operating points" and "outlier detection of XFOIL results", which show that the optimisation community has had to engineer around XFOIL's convergence behaviour (Section V-I).

: TABLE {t:branches}. Main XFOIL descendants and related codes (status November 2026). [wide]

| Code | Language | Licence | Relation to XFOIL | Main change |
|:---|:---|:---|:---|:---|
| XFOIL 6.99/6.996 | Fortran 77 | GPL | Original | — |
| XFLR5 / flow5 | C++/Qt | GPL-3 | Port of solver | GUI, 3-D wing and plane analyses |
| QBlade / QFoil | C++ / Fortran | GPL | Port / modified 6.99 | Robust relaxation, $H_k$-dependent lag, wake dissipation, post-stall drag |
| RFOIL / RFOILVogue | Fortran | In-house | Modified XFOIL | Stall prediction, rotation, vortex generators |
| libxfoil, xfoil-python | Fortran + C/Python | GPL | Library wrappers | Re-entrant, no disk I/O |
| Flexcompute Foil, Vibefoil | Rust/WASM, JavaScript | GPL (core) | Faithful ports | Browser, real-time visualisation |
| mfoil | Matlab, Python | MIT | Re-implementation | Augmented state, stagnation fix, continuation |
| Viiflow | Python | — | Independent VII | Inverse BL coupling, speed |
| NeuralFoil / AeroSandbox | Python/NumPy | MIT | Trained on XFOIL | Smooth, vectorised, differentiable surrogate |
| Xoptfoil / Xoptfoil2 | Fortran | GPL | Optimiser around XFOIL | PSO/GA, retry and outlier logic |
| MSES | Fortran | Licensed | Sister code | Euler + IBL, multi-element, transonic, sensitivities |

![Fig. {f:timeline}. Timeline of XFOIL and the main codes derived from, or built around, it. Dates are first public appearance where known. [wide]](fig/f01_timeline)

## MSES, the Sister Code

MSES is Drela's multi-element and transonic system. It couples a streamline-grid Euler solver to the same integral boundary-layer formulation and solves the whole system by Newton's method [#mses]. It predicts transitional separation bubbles, shocks and shock-induced separation, and its force predictions are described as accurate to just past stall. It also provides parameter sensitivities, which its LINDOP module uses for single- and multi-point optimisation [#mses]. MSES is licensed rather than open. It is the reference point for Section VII, because it shows what the XFOIL boundary-layer model can do once the inviscid part is no longer limited to a single panel-method body.

## What Has Not Changed

Despite this activity, the core of every open derivative is still the 1987–1996 boundary-layer formulation of Section III. Its transition model is still the simplified envelope method with a single $N_{crit}$, its global solver still uses a fixed-bound step limiter, and no open derivative exposes the analytic sensitivities that the Newton Jacobian makes available. The next section measures the consequences of these choices, and Section VI proposes remedies.
