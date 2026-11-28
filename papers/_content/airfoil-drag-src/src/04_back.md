# In-Service Degradation of Airfoil Drag

The airfoil drag that a vehicle experiences in service is rarely the drag of the clean, as-designed section. Several mechanisms degrade it, and their importance varies with vehicle type in a way that mirrors the sensitivities found above.

*Contamination and roughness.* Insect debris collected near the ground, rain, dust and paint degradation all promote early transition. For laminar sections the effect is large—worked example D showed a 14 % loss of glide ratio—while for sections already turbulent the penalty is the smaller increase of turbulent skin friction with roughness height. The permissible roughness for laminar flow is a small fraction of the local boundary-layer thickness, so surface standards for laminar wings are far tighter than for conventional ones [#joslin], [#bushnell].

*Manufacturing tolerances.* Steps, gaps and waviness at panel joints, fastener heads and leading-edge attachments can cause premature transition. Experience from laminar-flow flight programmes shows that achievable production tolerances, rather than aerodynamic design, now limit how much laminar flow can be relied upon [#joslin], [#blade].

*Icing.* Ice accretion changes the leading-edge geometry. Even thin roughness-type ice raises drag considerably and lowers maximum lift; horn and ridge ice can raise section drag several-fold and cause early stall [#bragg]. For fixed-wing aircraft this reduces climb and stall margins; for helicopters it raises rotor torque and can exhaust the power margin in hover. Ice protection systems are certified against these performance losses.

*Erosion.* Helicopter rotor blades, propellers and fan blades operating in sand, dust and rain suffer leading-edge erosion that roughens and reshapes the section. Worked example H showed that a 25 % increase in blade drag costs about 127 kg of hot-and-high hover capability on a 5.5 t helicopter. Protective erosion strips (nickel, titanium) and polyurethane tapes are therefore performance items as well as maintenance items, and their own effect on section shape near the leading edge must be considered.

*Aeroelastic deformation.* Flexible wings and blades twist and bend under load, changing the local $c_l$ at which each section operates and moving it within or out of its drag bucket. This is significant for very high-aspect-ratio wings and for rotor blades, whose elastic twist varies around the azimuth.

# Predicting Airfoil Drag

Reliable performance prediction depends on reliable section drag, and the methods available differ in cost and fidelity.

*Handbook and empirical methods* such as ({e:2})–({e:3}), Hoerner's data [#hoerner] and component build-up methods [#raymer], [#gur] are adequate for conceptual design and for trend studies such as those in this paper. They do not capture pressure-gradient effects on transition, laminar separation bubbles or detailed compressibility behaviour.

*Viscous–inviscid interaction codes* couple a panel or Euler solution of the outer flow to an integral boundary-layer formulation with $e^N$ transition prediction. XFOIL [#drela89] for incompressible and weakly compressible flow, and ISES/MSES [#drela87] for transonic flow, are the standard tools; they predict minimum drag and drag-bucket behaviour of attached-flow sections typically within a few drag counts, and laminar separation bubbles reasonably well down to $Re\approx10^5$. Their limitations—at and beyond maximum lift, in massive separation, at very low Reynolds number and in unsteady conditions such as the oscillating incidence of a rotor blade—are the regions where performance is often most sensitive to the airfoil (Sections VII–IX). Extending such codes, for example with roughness and contamination models, improved post-stall correlations or rotor-relevant unsteady corrections, is a productive direction for improvement.

*RANS CFD with transition models* (for example the correlation-based $\gamma$–$Re_\theta$ model [#langtry]) handles complex geometry, shocks and separation, but predicted drag remains sensitive to grid and turbulence modelling, and transition modelling in particular is still under development. *Large-eddy and direct simulation* resolve bubbles and transition physics but remain research tools for sections.

*Wind-tunnel and flight measurement*, by wake-rake momentum deficit in low-turbulence tunnels and by flight-test wake surveys, remain the reference for section drag, especially at low Reynolds number [#selig] and for laminar sections whose behaviour depends on free-stream turbulence. A sound design process uses fast codes to explore, higher-fidelity CFD to check, and test data to calibrate. Table {t:methods} summarises the trade-offs.

| Method | Cost per polar | Strengths | Weak regimes |
|:---|:---|:---|:---|
| Handbook build-up, eqs. ({e:2})–({e:3}) | Negligible | Trends, conceptual sizing | Pressure-gradient effects, bubbles, stall, transonic |
| Viscous–inviscid (XFOIL, MSES) | Seconds | Minimum drag, drag bucket, transition, bubbles to $Re\approx10^5$, optimisation | Post-stall, massive separation, very low $Re$, unsteady |
| RANS with transition model | Hours | Shocks, separation, 3-D geometry, high-lift systems | Transition and separation sensitivity to models and grids |
| LES / DNS | Days to weeks | Bubble and transition physics | Cost; design use limited |
| Wind tunnel (wake rake) | Days, high cost | Reference data, real surfaces, low-$Re$ | Tunnel turbulence, wall corrections, $Re$ scaling |
| Flight test | Very high | True operating environment, contamination | Limited conditions, instrumentation |

: TABLE {t:methods}. Methods for obtaining section drag data. [wide]

# Airfoil Selection and Multi-Point Design

The results above suggest that the classical practice of selecting an airfoil for a single design point—minimum drag at the cruise $c_l$, say—is inadequate for most vehicles. A better formulation weights the section drag by the time, energy or power that each operating condition accounts for. For a fixed-wing aircraft a natural objective is

$$J = \sum_i w_i\, c_d(c_{l,i}, Re_i, M_i) \tag{e:J}$$

where the conditions $i$ cover climb, cruise at several weights, loiter and descent, and the weights $w_i$ reflect fuel burned (or energy used) in each, multiplied by the local sensitivity of fuel to drag derived in Section III. For a rotor blade the natural weighting is by the cube of the local velocity, because profile power at a blade element is proportional to $U^3 c_d$; the objective is then an integral over radius and azimuth,

$$J_{rotor} = \int_0^{2\pi}\!\!\int_{r_0}^{R} U(r,\psi)^3\, c_d\big(c_l(r,\psi), Re, M(r,\psi)\big)\, c(r)\,dr\,d\psi \tag{e:Jr}$$

which automatically emphasises the advancing tip and penalises compressibility drag there, as worked example I showed.

Such objectives must be accompanied by constraints that encode the other roles of the section: minimum thickness (for structure, fuel or stiffness), maximum lift and stall behaviour (for take-off, landing, retreating blade or manoeuvre), pitching moment (for trim drag or control loads), buffet margin, and robustness to roughness. The last is particularly important: a section optimised for the clean condition can be fragile, losing much of its advantage when transition is forced. A robust formulation evaluates the drag at both free and fixed transition and penalises the difference, or optimises the expected drag over a distribution of surface conditions.

Viscous–inviscid codes such as XFOIL are well suited to these multi-point formulations because each evaluation takes a fraction of a second, allowing thousands of candidate shapes to be assessed with gradient-based or evolutionary optimisers. The weak points, as noted in Section XIV, are high-lift, post-stall and strongly unsteady conditions, so multi-point optimisations usually verify the final shapes with RANS or wind-tunnel data in those regions. Extending open codes so that the mission-weighted objectives ({e:J})–({e:Jr}) and the robustness constraints can be expressed directly would make them considerably more useful for vehicle-level design.

# Synthesis and Design Guidance

Table {t:synth} collects the results of the worked examples. The final column normalises each result, where meaningful, to the performance change per 1 % change of section drag.

| Ex. | Vehicle | Change in airfoil characteristic | Performance effect | Per 1 % section drag |
|:---|:---|:---|:---|:---|
| A | Jet transport | Wing profile drag −10 % | Trip fuel −2.3 % (2 500 km) | ≈0.23 % fuel |
| B | Jet transport | Laminar wing: section $c_d$ −29 % on 80 % of area | Trip fuel −5.3 % | ≈0.23 % fuel |
| C | Jet transport | Supercritical vs conventional section | $t/c$ 7.1 % → 14.3 % at $M_{DD}$ 0.80, or sweep 35° → 13° | Indirect: weight, $A$ |
| — | Jet transport, take-off | Take-off $L/D$ +1 % / +5 % (high-lift sections) | OEI-limited take-off mass +640 kg / +3.2 t | ≈0.8 % mass per 1 % $L/D$ |
| — | Light aircraft | Wing profile drag −10 %; laminar wing (−45 counts) | $V_{\max}$ +1.4 %; +5.7 % | ≈0.14 % speed |
| — | Turboprop | Wing profile drag −10 % | Range +2.7 % | ≈0.27 % range |
| — | Propeller | Blade $c_l/c_d$ 50 → 80 | Local efficiency +1.5 points at optimum | — |
| D | Sailplane | Contamination: section $c_d$ +58 % | $(L/D)_{\max}$ 40.3 → 34.5 (−14 %) | ≈0.25 % glide ratio |
| E | Mini-UAV | Bubble-prone section ($c_d$ +87 % at loiter $c_l$) | Endurance −14 % | ≈0.16 % endurance |
| F | Supersonic | Section $t/c$ 4 % → 3 % at $M$ 1.6 | Wave drag 68 → 38 counts | $\propto (t/c)^2$ |
| G | Fighter | Wing profile drag −10 %; or $K$ −10 % | Turn rate +1.0 %; or +5.7 % | ≈0.1 %; $K$ ≈0.6 % |
| H | Helicopter, hover | Blade polar −10 % / +25 % | +47 kg / −127 kg hover mass | ≈0.09 % of gross mass |
| I | Helicopter, 140 kt | Thin high-$M_{DD}$ tip section | Rotor power −7.6 %; best specific range +5.1 % | Mach-driven |
| J | Quadcopter | Rotor $\bar c_d$ 0.015 → 0.035 | FM 0.69 → 0.59; endurance −15 % | ≈0.11 % endurance |

: TABLE {t:synth}. Summary of worked examples. [wide]

A complementary view is the *value of one drag count*, which designers use to set priorities among competing refinements. Table {t:count} gives it for the generic vehicles.

| Vehicle (example) | One count of | Value |
|:---|:---|:---|
| Jet transport (A) | Aircraft $C_D$ | 22.7 kg fuel per 2 500 km flight (0.33 %) |
| Regional turboprop | Aircraft $C_D$ | 0.29 % range |
| Sailplane (D) | Aircraft $C_D$ | +0.21 in $(L/D)_{\max}$ |
| Light fighter (G) | Aircraft $C_D$ | +0.005 g sustained load factor |
| Helicopter, hot-and-high (H) | Blade mean $\bar c_d$ | 3.7 kg hover-capable mass |
| Quadcopter (J) | Rotor mean $\bar c_d$ | 0.7 s hover endurance |

: TABLE {t:count}. Value of one drag count ($\Delta C_D$ or $\Delta \bar c_d$ = 0.0001) for the generic vehicles.

Fig. {f:sens} presents the same normalised sensitivities graphically. Only one bar—the fighter's response to the lift-dependent drag factor $K$—stands well clear of the others, which reinforces the point that for manoeuvre-limited aircraft the *shape* of the section polar at high lift matters more than its minimum.

![Fig. {f:sens}. Normalised sensitivity of the main performance metric of each generic vehicle to the drag quantity governed by the airfoil (per cent change in metric per per cent change in drag).](fig/f17_sens)

## Economic interpretation

Sensitivities become decisions when they are converted into value. For the generic transport of example A, one drag count costs 22.7 kg of fuel per 2 500 km flight, or about 23 t of fuel and 72 t of CO~2~ per 1 000 flights. At an illustrative fuel price of USD 800 per tonne, that is of the order of USD 18 000 per aircraft per year for each count, and nearly USD 2 million per year for a fleet of 100 aircraft. It is this arithmetic that justifies the engineering effort spent on a few counts of wing drag, and also sets the ceiling on what a laminar-flow system may cost in weight, maintenance and complexity. For the helicopter of example H, the corresponding currency is payload at the hottest and highest landing site in the mission: 3.7 kg per count of blade drag, or 127 kg for the erosion case, may decide whether a mission can be flown with one aircraft or needs two. For small drones the currency is flight time, and a minute of hover endurance can be the difference between completing a survey line and returning early.

## Robustness of the results

Because the worked examples use generic parameters, it is worth checking how sensitive the conclusions are to those parameters. Table {t:robust} repeats worked example A—the fuel saving from a 10 % reduction in wing profile drag—with the main assumptions varied one at a time. The result ranges from 2.0 % to 2.6 %. The largest single influence is the wing's share of zero-lift drag, which the airfoil designer does not control; aspect ratio, cruise lift coefficient and TSFC have smaller effects. The *magnitude* of the sensitivity, about a quarter of a per cent of fuel per per cent of wing profile drag, is therefore robust; its precise value for a particular aircraft needs that aircraft's drag breakdown. Similar checks on the other examples give the same picture: the numbers move by 10–25 %, but the ranking of what matters for each vehicle class does not change.

| Assumption varied | Value | Fuel saving (%) |
|:---|:---|---:|
| Baseline | — | 2.30 |
| Aspect ratio | 8.5 / 10.5 | 2.21 / 2.37 |
| Wing share of $C_{D0}$ | 30 % / 40 % | 1.97 / 2.63 |
| TSFC (h^−1^) | 0.53 / 0.62 | 2.29 / 2.31 |
| Cruise $C_L$ | −10 % / +10 % | 2.46 / 2.14 |

: TABLE {t:robust}. Robustness of worked example A: cruise fuel saving for a 10 % reduction in wing profile drag (2 500 km).

Five general conclusions follow.

1. **The limiting performance regime determines which airfoil characteristic matters.** Range-limited aircraft cruising below $C_L^*$ (jets, turboprops) respond to minimum profile drag and its extent; endurance-limited aircraft (MALE UAVs, small drones) respond to drag at high $c_l$; manoeuvre-limited aircraft respond to the lift-dependent drag rise; Mach-limited aircraft (transports, helicopter advancing blades, supersonic aircraft) respond to drag divergence and wave drag.

2. **Sensitivities are of similar magnitude—about 0.1–0.3 % of the performance metric per 1 % of section drag—across very different vehicles**, because the wing or rotor profile drag is typically 15–40 % of the relevant total. The exceptions are regimes where the airfoil's drag *rise* is triggered—transonic, supersonic and stall-limited—where effects are far larger and more abrupt.

3. **Indirect effects often exceed direct ones.** For the transport, the supercritical airfoil's value lies more in the thicker, lighter, higher-aspect-ratio wing it permits than in the drag counts it saves at cruise. For the helicopter, a better section allows lower solidity or tip speed, saving more profile power and reducing noise.

4. **Laminar flow is the largest single opportunity and the most fragile.** It can halve section skin friction, but its value depends on maintaining it in service against contamination, manufacturing tolerances and sweep.

5. **Scale matters.** As vehicles shrink—small UAVs, multicopters, rotor blade tips at low Reynolds number—the airfoil moves into a regime where drag depends strongly on transition behaviour and laminar separation, and high-Reynolds-number data become misleading.

For designers, these conclusions suggest a practical procedure. Identify which regime limits the vehicle's key mission metric. Determine the section $c_l$, $Re$ and $M$ range actually encountered, including azimuthal variation for rotors and climb and loiter conditions for fixed wings. Select or design sections for that range, not for a single design point. Then estimate the sensitivity of the mission metric to section drag with relations of the kind used here, so that aerodynamic, structural and operational trade-offs—laminar flow versus maintenance, thickness versus weight, tip speed versus noise—can be made on a common basis.

# Conclusions

This paper has traced how the drag characteristics of the two-dimensional airfoil section propagate into the performance of fixed-wing aircraft and rotorcraft. Using a common set of simple, calibrated relations—a mixed-boundary-layer section-drag model, the parabolic polar, the Breguet relations, the Korn and Lock transonic relations, linear supersonic theory and blade-element momentum theory—ten worked examples were evaluated for transports, turboprops and propellers, sailplanes, small UAVs, combat aircraft, helicopters and multicopters.

The main findings are that a 10 % change in airfoil profile drag typically changes range, endurance or hover capability by 1–3 %; that a laminar transport wing could save about 5 % of trip fuel; that in-service contamination and erosion can cost more performance than many design refinements gain; and that, for rotorcraft and high-speed aircraft, the drag *rise* with Mach number and lift coefficient matters more than minimum drag, because it sets the performance boundary. The analysis also shows where better prediction tools are most valuable: near maximum lift, at low Reynolds number, in transonic flow and in the unsteady environment of a rotor. These are the natural targets for improving open airfoil analysis codes.

Several research directions follow from this analysis. *Robust laminar flow*—sections and surfaces that retain much of their laminar benefit when contaminated or manufactured to realistic tolerances—would move the transport result of worked example B closer to practice. *Passive and active skin-friction reduction*, such as riblets for turbulent regions and suction or plasma actuation for transition control, attacks the same term in ({e:2}). *Variable geometry*, from conventional flaps to continuous trailing-edge morphing, allows a section to keep its drag bucket aligned with a moving operating point, which Sections VI, IX and X showed to be as valuable as lowering the bucket itself. *Rotor-specific design*, including sections for reverse flow on slowed compound rotors and for very low Reynolds numbers on small and planetary rotors, remains comparatively immature. Finally, *mission-weighted, robust multi-point design tools* of the kind outlined in Section XV would make it easier to turn these airfoil-level gains into the vehicle-level benefits that this paper has quantified.

# Acknowledgement {.unnumbered}

The author acknowledges the use of Claude, a large language model developed by Anthropic, for assistance in drafting the text, organising the literature and preparing the worked-example calculations and figures. The author reviewed and takes responsibility for the content. The worked examples use generic, representative parameters and are not models of any specific aircraft.

# Appendix A: Parameters of the Worked Examples {.unnumbered}

| Ex. | Main parameters |
|:---|:---|
| A, B | $S$=122.6 m², $A$=9.5, $e$=0.82, mid-cruise mass 66 t, $M$=0.78, FL350, $C_{D0}$=0.0200 (wing 0.0070), $C_{Dw}$=0.0010, TSFC 0.57 h⁻¹, 2 500 km cruise ending at 62 t; laminar: transition 40 %/25 %, $Re$=2.6×10⁷, 80 % of wing treated |
| C | Korn equation, $C_L$=0.55, $\Lambda$=25°, $\kappa_A$=0.87/0.95 |
| Turboprop | $C_{D0}$=0.026 (wing 0.009), $A$=12, $e$=0.80, $C_L$=0.50 |
| D | $b$=15 m, $S$=10.5 m², $e$=0.92, 450 kg, $t/c$=15 %, $Re$=1.2×10⁶, clean transition 60 %/70 %, contaminated 8 %/40 %, other drag 0.0035 |
| E | 2.5 kg, $S$=0.5 m², $A$=8, $e$=0.8, other drag 0.012, 100 Wh (85 % usable), $\eta$=0.55, avionics 3 W |
| F | Biconvex section, linear theory, $M$=1.6 |
| G | 10 t, $S$=40 m², $T$=60 kN, 5 000 m, $M$=0.8, $C_{D0}$=0.020 (wing 0.008), $K$=0.21 |
| H | 5.5 t, $R$=6.6 m, 4 blades, $\sigma$=0.08, $\Omega R$=215 m/s, $\kappa$=1.15, 3 000 m ISA+20, Bailey NACA 0012 polar with stall drag rise |
| I | As H at sea level, $f$=1.8 m², blade-element profile power over radius and azimuth, Lock compressibility increment |
| J | 2 kg, 4 rotors $R$=0.127 m, $\sigma$=0.10, $\Omega R$=80 m/s, $\kappa$=1.25, 74 Wh (80 % usable), $\eta$=0.75, avionics 5 W |

: TABLE {t:params}. Parameters used in the worked examples (all generic and representative). [wide]

# Appendix B: Analytical Sensitivities {.unnumbered}

The numerical results can be checked against simple logarithmic derivatives of the governing relations. Writing $\epsilon_x^y = \partial\ln y/\partial\ln x$ for the sensitivity of a metric $y$ to a drag quantity $x$:

*Lift-to-drag ratio at fixed $C_L$.* Since $L/D=C_L/C_D$, a change in the wing profile drag contribution $C_{D,w}$ gives $\epsilon^{L/D}_{C_{D,w}} = -C_{D,w}/C_D$. For example A this is $-0.0070/0.0320 = -0.22$, matching the numerical result.

*Fuel at fixed range.* From ({e:8}), with $x = Rc/(V\,L/D)$, $\epsilon^{W_{fuel}}_{L/D} = -x e^x/(e^x-1)$. For example A, $x=0.105$ and the factor is $-1.05$; combined with the previous result, each 1 % of wing profile drag costs 0.23 % of trip fuel.

*Optimum-point metrics.* From ({e:5}) and ({e:9}), $\epsilon^{(L/D)_{\max}}_{C_{D0}} = -\tfrac12$ and $\epsilon^{(C_L^{3/2}/C_D)_{\max}}_{C_{D0}} = -\tfrac14$; from $P\eta_p = DV$ at high speed, $\epsilon^{V_{\max}}_{C_{D0}} \approx -\tfrac13$.

*Sustained turn.* From ({e:10}), $\partial n_{sus}/\partial C_{D0} = -n_{sus}/[2(T/qS - C_{D0})]$ and $\epsilon^{n_{sus}}_{K} = -\tfrac12$. For example G, one drag count changes $n_{sus}$ by 0.005, and 10 % of $K$ changes it by about 5 %, as computed.

*Climb-limited take-off weight.* With $\gamma = T/W - (L/D)^{-1}$ held at the regulatory minimum, $\epsilon^{W}_{L/D} = (L/D)^{-1}/[\gamma + (L/D)^{-1}]$, which is 0.82 for $\gamma=0.024$ and $L/D=9$.

*Hover at fixed power.* From ({e:15}) with $P = aT^{3/2} + b\bar c_d$ held constant, $\epsilon^{T}_{\bar c_d} = -\tfrac23 P_0/P_i$. For example H, $P_0/P_i = 148/947$, so each 1 % of blade drag costs about 0.10 % of hover thrust; the full calculation gives a slightly smaller figure because $\bar c_d$ itself falls as $C_T$ falls.

*Multicopter endurance.* With electrical power proportional to $P_i + P_0$ plus a fixed avionics load, $\epsilon^{E}_{\bar c_d} \approx -P_0/(P_i+P_0+P_{av}')$, where $P_{av}'$ is the avionics load referred to the shaft. For example J at $\bar c_d=0.02$, this is about $-0.17$ near the baseline, consistent with the 0.7 s per count of Table {t:count}.

These expressions show compactly why the sensitivities in Table {t:synth} cluster between 0.1 and 0.3: the relevant drag share ($C_{D,w}/C_D$, $P_0/P$, and so on) is typically 15–35 %, and the exponent multiplying it is of order one.

# Appendix C: Step-by-Step Calculation for Worked Example A {.unnumbered}

The following steps reproduce the baseline and improved results of Table {t:transA}.

1. *Atmosphere.* At 10 668 m in the ISA, $T=218.8$ K, $\rho=0.3796$ kg/m³ and $a=296.5$ m/s. At $M=0.78$, $V=231.3$ m/s and $q=\tfrac12\rho V^2=10\,154$ Pa.
2. *Lift coefficient.* $C_L = W/(qS) = 66\,000\times9.807/(10\,154\times122.6) = 0.520$.
3. *Induced drag.* $K = 1/(\pi\times9.5\times0.82)=0.0409$, so $C_{Di}=KC_L^2=0.0110$.
4. *Total drag and $L/D$.* $C_D = 0.0200 + 0.0010 + 0.0110 = 0.0320$ and $L/D = 0.520/0.0320 = 16.22$.
5. *Fuel.* With $c = 0.57/3600 = 1.583\times10^{-4}$ s⁻¹, $x = Rc/(V\,L/D) = 2.5\times10^6\times1.583\times10^{-4}/(231.3\times16.22) = 0.1055$, and from ({e:8}) $W_{fuel}/g = 62\,000\,(e^{x}-1) = 6\,897$ kg.
6. *Improved wing.* Reducing wing profile drag by 10 % lowers $C_{D0}$ by 0.0007 to 0.0193, giving $C_D=0.0313$, $L/D=16.59$, $x=0.1032$ and 6 739 kg of fuel: a saving of 159 kg (2.3 %).
7. *Laminar wing.* The section model gives 61.1 counts turbulent and 43.6 counts with transition at 40 %/25 % at $Re=2.6\times10^7$, a 28.6 % reduction; applied to 80 % of the wing it lowers $C_{D0}$ by 0.0016 to 0.0184, giving $L/D=17.08$ and 6 534 kg of fuel.

# Appendix D: Reproducibility {.unnumbered}

All numerical results and figures in this paper were produced by a single Python script (calc_figs.py, using NumPy and Matplotlib) that implements equations ({e:1})–({e:Jr}) and the blade-element integration of worked example I, writes every computed value to a results file, and draws each figure. The paper itself is assembled from Markdown sources by a build script that numbers equations, figures, tables and references and produces both the web version and this two-column PDF. Readers wishing to apply the method to a specific aircraft need only replace the generic parameters of Table {t:params} with that aircraft's data and drag breakdown.
