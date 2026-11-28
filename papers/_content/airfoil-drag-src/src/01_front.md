::: abstract
**Abstract**—The drag characteristics of the two-dimensional airfoil section—its minimum profile drag, the width and position of its low-drag range, its behaviour with Reynolds number, transition, Mach number and surface condition—propagate into every first-order measure of aircraft performance: range, endurance, climb, ceiling, manoeuvre, hover capability and payload. This paper traces that propagation for the main classes of fixed-wing aircraft and rotorcraft: subsonic transports, turboprops, sailplanes and long-endurance unmanned aircraft, small low-Reynolds-number drones, combat aircraft, helicopters, tiltrotors, compounds and multicopters. A common framework is built from a simple but calibrated section-drag model (mixed laminar–turbulent skin friction with a thickness form factor), the parabolic drag polar, the Breguet range and endurance relations, the Korn drag-divergence relation, linear supersonic theory and blade-element momentum theory for rotors and propellers. Ten worked examples (A–J), with supporting turboprop and propeller cases, quantify the sensitivities. For a generic narrow-body transport, a 10 % reduction in wing profile drag reduces cruise fuel by 2.3 % on a 2 500 km sector, and a hybrid-laminar wing that cuts section drag by about 29 % saves 5.3 %. For a utility helicopter in hot-and-high hover, a 10 % lower blade drag polar adds about 47 kg of hover-capable mass, while a 25 % degradation from leading-edge erosion removes about 127 kg. For a small quadcopter, raising the rotor profile drag coefficient from 0.015 to 0.035 lowers figure of merit from 0.69 to 0.59 and endurance by 15 %. The results show that the *same* section drag change has very different consequences depending on whether the vehicle is range-, endurance-, power- or Mach-limited, and that for rotorcraft and supersonic aircraft it is often the drag *rise* (with lift coefficient or Mach number), rather than the minimum drag, that sets the performance boundary. The paper closes with a synthesis table, design guidance and a note on the prediction tools—XFOIL-type viscous–inviscid codes, RANS and wind-tunnel data—needed to quantify these effects.
:::

::: keywords
***Index Terms***—airfoil, profile drag, drag polar, laminar flow, transonic drag divergence, wave drag, Breguet range, endurance, helicopter performance, figure of merit, propeller efficiency, low Reynolds number, UAV.
:::

# Nomenclature {.unnumbered}

| Symbol | Meaning |
|:---|:---|
| $A$ | Aspect ratio (wing); disk area $\pi R^2$ (rotor) |
| $a$ | Speed of sound |
| $c$ | Chord; thrust-specific fuel consumption (jet) |
| $c_p$ | Power-specific fuel consumption |
| $c_d$, $c_l$ | Section drag and lift coefficients |
| $C_D$, $C_L$, $C_{D0}$ | Aircraft drag, lift and zero-lift drag coefficients |
| $C_f$ | Mean skin-friction coefficient |
| $C_T$ | Rotor thrust coefficient $T/(\rho A(\Omega R)^2)$ |
| $e$ | Oswald span-efficiency factor |
| $f$ | Equivalent flat-plate area |
| $FM$ | Rotor figure of merit |
| $K$ | Induced-drag factor $1/(\pi A e)$ |
| $M$, $M_{cr}$, $M_{DD}$ | Mach number; critical and drag-divergence Mach numbers |
| $q$ | Dynamic pressure $\tfrac12\rho V^2$ |
| $R$ | Range; rotor radius |
| $Re$ | Reynolds number based on chord |
| $S$ | Wing reference area |
| $t/c$, $\tau$ | Thickness-to-chord ratio |
| $T$, $W$, $V$ | Thrust, weight, flight speed |
| $x_{tr}$ | Transition location |
| $\beta$ | $\sqrt{M^2-1}$ |
| $\eta_p$ | Propulsive efficiency |
| $\kappa$, $\kappa_A$ | Induced-power factor (rotor); Korn technology factor |
| $\Lambda$ | Sweep angle |
| $\mu$ | Rotor advance ratio $V/\Omega R$ |
| $\rho$ | Air density |
| $\sigma$ | Rotor solidity |
| $\phi$ | Blade-element inflow angle |
| $\Omega R$ | Rotor tip speed |

: Nomenclature [nomen]

# Introduction

Every aircraft converts stored energy into distance, time aloft or useful work against gravity, and drag is the principal tax on that conversion. Within the total drag of an aircraft, the contribution of the lifting surfaces' *sections*—the airfoils—occupies a special place. It is the part of the drag that the designer selects early, often from a catalogue or a code such as XFOIL [#drela89], and it then constrains wing or blade thickness, structural weight, maximum lift, buffet margin, propulsive efficiency and operating Mach number for the life of the design.

The influence of airfoil drag is far from uniform across aircraft types. On a jet transport the wing section is chosen chiefly for its *drag-divergence Mach number* at a given thickness and lift coefficient, and its subsonic profile drag accounts for perhaps a third of zero-lift drag [#raymer], [#torenbeek]. On a sailplane the profile drag of a laminar airfoil is the dominant single term in the glide polar, and losing laminar flow to insect debris can cost more glide performance than any other operational factor [#thomas]. On a helicopter, profile power is only 10–30 % of the total in hover but it is the term that grows fastest at high forward speed, and the airfoil's drag rise with Mach number on the advancing blade and with lift coefficient on the retreating blade defines the flight envelope [#leishman], [#johnson], [#prouty]. On small drones the airfoil operates at Reynolds numbers where laminar separation bubbles can double the section drag [#lissaman], [#selig], [#mueller].

This paper asks a simple question: *how does a change in airfoil drag characteristics change the performance of the whole vehicle, and why does the answer differ between aircraft types?* It does so by:

1. reviewing the physics of section drag and the parameters that control it (Section II);
2. setting out the performance relations that connect section drag to vehicle metrics, and deriving their sensitivities (Section III);
3. examining, with worked numerical examples, subsonic jet transports (Section IV), turboprops, light aircraft and propellers (Section V), sailplanes and long-endurance aircraft (Section VI), small low-Reynolds-number aircraft (Section VII), combat aircraft (Section VIII), helicopters (Section IX), and tiltrotors, compounds and multicopters (Section X);
4. considering second-order couplings through pitching moment and propulsion integration (Section XI) and illustrative case studies (Section XII);
5. discussing in-service degradation (Section XIII), prediction methods (Section XIV) and multi-point airfoil selection (Section XV); and
6. drawing the results together in a synthesis and design guidance (Section XVI) and conclusions (Section XVII), with the example parameters and analytical sensitivities in two appendices.

All numerical examples use generic, representative parameters drawn from open textbook data; they are not models of any specific aircraft. They are intended to show *orders of magnitude and trends*, and are computed with a single open script so that each number can be reproduced and varied.

## Historical perspective

The link between airfoil drag and aircraft performance has driven airfoil development since the earliest days of flight. The thin, highly cambered sections of the first aeroplanes were chosen for lift, not drag; their poor $c_l/c_d$ and abrupt stall contributed to the low speeds and short ranges of the period. The Göttingen and NACA wind-tunnel programmes of the 1920s and 1930s showed that thicker, rounded-nose sections had *lower* drag as well as higher maximum lift, and allowed cantilever monoplane wings whose lower parasite drag transformed cruise speed and range. The NACA four- and five-digit families systematised this knowledge [#abbott].

The next step was deliberate control of transition. The NACA 6-series sections of the late 1930s and 1940s were shaped to hold a favourable pressure gradient over a large part of the chord, producing the low-drag bucket described in Section II. In practice the laminar extent achieved on production aircraft of that era was limited by surface quality, and the main lasting benefit was often the sections' higher critical Mach number—an early example of a drag characteristic other than minimum drag proving decisive [#abbott], [#loftin].

The jet age moved the emphasis to compressibility. Sweep raised drag-divergence Mach numbers but at a cost in structural weight and low-speed handling. Whitcomb's supercritical airfoil of the mid-1960s [#whitcomb], [#harris] showed that careful shaping of the upper-surface supersonic region could raise $M_{DD}$ at a given thickness, or allow a thicker section at a given $M_{DD}$; it is now the basis of every transport wing. In parallel, sailplane designers such as Wortmann and Eppler, using early computer methods, pushed natural laminar flow to its practical limits at moderate Reynolds number [#eppler], [#thomas], and NASA's NLF programme of the 1980s brought such sections to general aviation [#somers].

Rotorcraft followed a somewhat separate path. For decades helicopter blades used symmetric NACA 0012-type sections because of their small pitching moment. From the 1970s, dedicated rotorcraft airfoil families were developed to combine high $c_{l,\max}$ at low Mach number (for the retreating blade) with high drag-divergence Mach number at low lift (for the advancing blade) while keeping pitching moments small [#bousman], [#leishman]. Over the same period, the rise of small unmanned aircraft revived interest in the low-Reynolds-number regime that had been studied for model aircraft, and dedicated low-Reynolds-number airfoil data sets were produced [#selig], [#mueller].

Loftin's survey of aircraft performance evolution [#loftin] shows the outcome of this history: maximum lift-to-drag ratios rose from below 10 for the biplanes of the First World War to around 15–20 for modern transports and above 40 for modern sailplanes. Airfoil drag reduction was one strand in that progress, together with higher aspect ratio, cleaner configurations and better propulsion. The present paper looks at the same history from the opposite direction: given a change in the airfoil, how much does the vehicle gain?

# Airfoil Drag: Components and Controlling Parameters

## Decomposition of section drag

The drag of a two-dimensional airfoil section per unit span is expressed as a coefficient $c_d = D'/(q_\infty c)$, where $q_\infty$ is the dynamic pressure and $c$ the chord. It is conventionally divided into three parts:

$$c_d = c_{d,f} + c_{d,p} + c_{d,w} \tag{e:1}$$

The *skin-friction drag* $c_{d,f}$ is the integrated wall shear stress. The *pressure* or *form drag* $c_{d,p}$ arises because the boundary layer displaces the outer flow and, near the trailing edge, prevents full pressure recovery; it rises sharply once the flow separates. Together these make up the *profile drag*. The *wave drag* $c_{d,w}$ appears only when the local flow becomes supersonic and shock waves form—above the critical Mach number in transonic flow, and everywhere in supersonic flight [#anderson], [#schlichting].

In the language of performance, a "drag count" is $\Delta c_d = 0.0001$. A modern turbulent transport wing section at cruise has a profile drag of roughly 55–70 counts; a good laminar sailplane section 45–60 counts; a helicopter blade section 80–130 counts averaged over the operating range; and a small-drone airfoil at a Reynolds number of $10^5$ commonly 120–250 counts [#leishman], [#abbott], [#selig].

## Reynolds number and transition

Skin friction depends first on Reynolds number $Re = \rho V c/\mu$ and on whether the boundary layer is laminar or turbulent. A laminar layer has a skin-friction coefficient several times lower than a turbulent one at the same Reynolds number. A widely used engineering estimate of the mean skin friction of a surface with transition at $x_{tr}/c$ combines the Blasius laminar and Prandtl–Schlichting turbulent results [#schlichting]:

$$\bar C_f = C_{f,t}(Re) - \frac{x_{tr}}{c}\left[C_{f,t}(Re_{tr}) - C_{f,l}(Re_{tr})\right] \tag{e:2}$$

with $C_{f,l}=1.328/\sqrt{Re}$, $C_{f,t}=0.455/(\log_{10}Re)^{2.58}$ and $Re_{tr}=Re\,x_{tr}/c$. Pressure drag of an attached-flow section is accounted for by a thickness form factor, giving a section profile drag of [#hoerner], [#raymer]

$$c_d \approx \left(\bar C_{f,\text{upper}}+\bar C_{f,\text{lower}}\right)\left[1+2\frac{t}{c}+60\left(\frac{t}{c}\right)^4\right] \tag{e:3}$$

Fig. {f:cdtr} shows ({e:3}) for a 12 % thick section. Two effects dominate. First, at a fixed transition position, drag falls with Reynolds number—by about 45 % between $Re=10^6$ and $3\times10^7$ for a fully turbulent section—so small aircraft and rotor blades pay a scale penalty. Second, moving transition from near the leading edge to 60 % chord reduces drag by 40–55 % at every Reynolds number. This is the prize of *natural laminar flow* (NLF) airfoils such as the NACA 6-series and the NLF(1)-0416 [#abbott], [#somers], and of *laminar flow control* (LFC) [#joslin].

![Fig. {f:cdtr}. Section profile drag of a 12 % thick airfoil from ({e:2})–({e:3}) as a function of transition location, for Reynolds numbers typical of drones ($10^6$), light aircraft and rotor blades ($3\times10^6$), and transports ($10^7$–$3\times10^7$).](fig/f1_cd_transition)

Table {t:sec} lists values from the model. The model is deliberately simple: it ignores the pressure-gradient effects that real airfoils exploit, but it reproduces the drag of well-designed attached-flow sections to within 10–15 % and, more importantly, captures the *relative* effect of Reynolds number and transition that the later examples rely on.

| $Re$ | Turbulent ($x_{tr}$=0.05) | $x_{tr}$=0.40 | $x_{tr}$=0.60 |
|:---|---:|---:|---:|
| $1\times10^6$ | 109 | 80 | 64 |
| $3\times10^6$ | 88 | 61 | 47 |
| $1\times10^7$ | 71 | 47 | 34 |
| $3\times10^7$ | 60 | 38 | 27 |

: TABLE {t:sec}. Model section profile drag $c_d$ (counts) of a 12 % thick section, equations ({e:2})–({e:3}).

Whether transition actually occurs late depends on the pressure distribution (a favourable gradient stabilises the layer), on surface waviness, steps, gaps and roughness, on free-stream turbulence, on leading-edge sweep (which introduces crossflow and attachment-line instabilities) and on contamination by insects, rain or ice. In practice, transition is predicted with the $e^N$ method, in which the amplification of Tollmien–Schlichting waves is tracked until a critical factor—typically $N=9$ in flight and lower in a turbulent wind tunnel—is reached [#drela89], [#schlichting].

## Variation with lift coefficient: the drag bucket

The section drag polar $c_d(c_l)$ is not flat. Laminar sections show a *drag bucket*: a range of $c_l$ over which favourable gradients on both surfaces hold transition aft and drag is low. Outside the bucket, transition jumps forward on one surface and drag rises abruptly. Conventional turbulent sections have a broader, shallower minimum. At high $c_l$ all sections show a steep rise as trailing-edge separation develops ahead of stall. For performance, the location of the bucket relative to the vehicle's operating $c_l$—cruise, climb, loiter or, for a rotor, the azimuthally varying blade $c_l$—matters as much as the minimum drag itself.

Fig. {f:polars} illustrates the three characteristic shapes. The laminar section has the lowest drag inside its bucket but the sharpest rise outside it; the turbulent section has higher minimum drag but a broader, more forgiving polar; and the low-Reynolds-number section has both higher minimum drag and a narrower useful range, because laminar separation bubbles add drag at the ends of its operating range. Which of these is "best" depends entirely on where the vehicle operates on the $c_l$ axis and how widely that operating point moves.

![Fig. {f:polars}. Illustrative section drag polars (stylised from published trends) for a natural-laminar-flow section, a conventional turbulent section and a low-Reynolds-number section.](fig/f0b_polars)

## Compressibility and wave drag

As free-stream Mach number $M_\infty$ increases, the suction peak on the upper surface reaches sonic speed at the critical Mach number $M_{cr}$. A little above it, a shock forms, wave drag appears and the shock can trigger boundary-layer separation. The *drag-divergence Mach number* $M_{DD}$, usually defined where $dc_d/dM = 0.1$, marks the practical limit for efficient cruise. $M_{DD}$ falls with thickness and lift coefficient and rises with sweep and with *supercritical* section design, which shapes the upper surface to decelerate the supersonic pocket gently, with a weak or no shock [#whitcomb], [#harris]. In supersonic flight wave drag is present at all lift coefficients and scales with the square of thickness ratio (Section VIII).

## Profile drag from the wake: the Squire–Young relation

Profile drag can be obtained from the state of the boundary layer at the trailing edge. Far downstream, the drag per unit span equals the momentum deficit of the wake, $c_d = 2\theta_\infty/c$, where $\theta_\infty$ is the far-wake momentum thickness. Squire and Young related this to the trailing-edge values of momentum thickness $\theta_{TE}$, shape factor $H_{TE}$ and edge velocity $U_{e,TE}$ [#schlichting]:

$$c_d = \frac{2\theta_{TE}}{c}\left(\frac{U_{e,TE}}{U_\infty}\right)^{(H_{TE}+5)/2} \tag{e:sy}$$

The relation, or its equivalent, is used by viscous–inviscid codes such as XFOIL [#drela89] to evaluate drag, and it makes the physical levers explicit. Drag rises with the momentum thickness accumulated along each surface—which is small for a laminar layer and large for a turbulent one—and with the shape factor at the trailing edge, which grows as the layer approaches separation. A section that keeps the layer laminar for longer, and brings it to the trailing edge with a moderate adverse gradient so that $H_{TE}$ stays low, has low drag. A section with a steep pressure recovery, or one operating near stall, pays through both $\theta_{TE}$ and $H_{TE}$.

## Transition on swept wings and rotating blades

On an unswept wing in a quiet free stream, transition is governed mainly by Tollmien–Schlichting waves, which a favourable pressure gradient suppresses. Sweep introduces two further mechanisms [#joslin]. *Crossflow instability* arises because the curved streamlines in a swept boundary layer create a velocity component normal to the inviscid streamline; it is *amplified* by the strong favourable gradient near the leading edge that stabilises Tollmien–Schlichting waves, so the two must be balanced. *Attachment-line contamination* occurs when turbulence from the fuselage junction travels along the leading-edge attachment line; above a critical attachment-line Reynolds number it cannot be stopped without devices such as a leading-edge bump or suction. Together these mechanisms make laminar flow increasingly difficult as sweep and Reynolds number increase, which is why natural laminar flow is common on sailplanes and business jets but has not yet entered service on large transport wings.

Rotor blades add rotation and unsteadiness. Each blade section passes through the wake of the preceding blade and sees periodic changes in incidence and Mach number, so transition moves back and forth around the azimuth. In practice, outboard rotor sections are often treated as largely turbulent for performance prediction, although measurable laminar runs exist on smooth composite blades in hover.

## From section drag to wing and blade drag

A finite wing adds induced drag, the cost of producing lift with a finite span, and interference and junction drag. The section characteristics enter the three-dimensional drag in two ways: through the *zero-lift* or *parasite* contribution of the wing, approximately $c_d$ times the exposed-to-reference area ratio, and through the *lift-dependent* part of profile drag, which the parabolic polar absorbs into the Oswald factor $e$. For a rotor, the section polar is integrated over radius and azimuth, with each element operating at its own Reynolds number, Mach number and $c_l$ (Section IX). Table {t:where} summarises which drag mechanism dominates for each vehicle class and therefore which airfoil characteristic matters most. Fig. {f:remap} places the same classes on a Reynolds–Mach map; the spread covers four decades of Reynolds number and two of Mach number, which is why no single airfoil family, and no single drag figure, serves all of them.

![Fig. {f:remap}. Approximate operating ranges of chord Reynolds number and Mach number for the vehicle classes considered.](fig/f0_re_mach_map)

| Vehicle class | Typical $Re$ | Typical $M$ | Dominant section characteristic | Main performance lever |
|:---|:---|:---|:---|:---|
| Jet transport | $1$–$4\times10^7$ | 0.75–0.85 | $M_{DD}$ at given $t/c$, $c_l$; turbulent $c_{d,\min}$ | Range, fuel burn, wing weight |
| Turboprop / GA | $3\times10^6$–$10^7$ | 0.2–0.6 | $c_{d,\min}$, bucket, NLF extent | Range, climb, prop efficiency |
| Sailplane / HALE | $5\times10^5$–$3\times10^6$ | <0.2 | Laminar bucket, low-$c_l$ and high-$c_l$ drag | Glide ratio, sink, endurance |
| Small UAV | $5\times10^4$–$5\times10^5$ | <0.1 | Laminar separation bubble, $c_l^{3/2}/c_d$ | Endurance (battery) |
| Combat aircraft | $2\times10^7$–$10^8$ | 0.6–2.0 | Thin-section wave drag, LE suction at high $c_l$ | Sustained turn, supersonic acceleration |
| Helicopter | $2$–$8\times10^6$ | 0.3–0.85 | $c_{d0}$, drag rise with $M$ (advancing) and $c_l$ (retreating) | Hover payload, speed, range |
| Multicopter | $3\times10^4$–$2\times10^5$ | <0.35 | Low-$Re$ $c_{d0}$, $c_{l,\max}$ | Hover endurance |

: TABLE {t:where}. Where airfoil drag matters, by vehicle class. [wide]

# Linking Section Drag to Vehicle Performance

## The drag polar and maximum lift-to-drag ratio

For performance analysis the aircraft drag is usually approximated by the parabolic polar

$$C_D = C_{D0} + K C_L^2, \qquad K = \frac{1}{\pi A e} \tag{e:4}$$

where $A$ is aspect ratio and $e$ the span efficiency (Oswald) factor. $C_{D0}$ is built up from the parasite drag of each component, $C_{D0}\approx\sum C_{f,i}\,FF_i\,Q_i\,S_{wet,i}/S_{ref}$ [#raymer], [#gur]; the wing term is the one controlled by the airfoil. The maximum lift-to-drag ratio and the lift coefficient at which it occurs are

$$\left(\frac{L}{D}\right)_{\max} = \frac{1}{2\sqrt{C_{D0}K}}, \qquad C_L^* = \sqrt{\frac{C_{D0}}{K}} \tag{e:5}$$

## Range

For a jet with thrust-specific fuel consumption $c$ (per unit time, weight basis), the Breguet range at constant $V$, $L/D$ and $c$ is

$$R = \frac{V}{c}\,\frac{L}{D}\,\ln\frac{W_i}{W_f} \tag{e:6}$$

and for a propeller aircraft with power-specific fuel consumption $c_p$ and propulsive efficiency $\eta_p$,

$$R = \frac{\eta_p}{c_p}\,\frac{L}{D}\,\ln\frac{W_i}{W_f} \tag{e:7}$$

For a fixed mission range $R$ ending at weight $W_f$, the fuel burned is

$$W_{fuel} = W_f\left[\exp\!\left(\frac{R\,c}{V\,(L/D)}\right)-1\right] \tag{e:8}$$

so fuel depends on $L/D$ slightly more than inversely: a 1 % improvement in $L/D$ saves a little more than 1 % of trip fuel because less fuel need be carried to carry the fuel.

## Endurance

Endurance for a jet is maximised at $(L/D)_{\max}$. For propeller and electric aircraft, where power rather than thrust is consumed, endurance scales with $C_L^{3/2}/C_D$, whose maximum from ({e:4}) is

$$\left(\frac{C_L^{3/2}}{C_D}\right)_{\max} = \frac{1}{4}\left(\frac{3}{K}\right)^{3/4} C_{D0}^{-1/4} \tag{e:9}$$

occurring at $C_L=\sqrt{3C_{D0}/K}$, where induced drag is three times the parasite drag.

## Sensitivity exponents

Equations ({e:5}) and ({e:9}) give a compact and important result. Near the optimum, $(L/D)_{\max}\propto C_{D0}^{-1/2}$ but $(C_L^{3/2}/C_D)_{\max}\propto C_{D0}^{-1/4}$. A 10 % reduction in $C_{D0}$ therefore raises the maximum $L/D$ (and hence range for an aircraft flying at $C_L^*$) by 5.4 %, but raises maximum propeller or electric endurance by only 2.7 %. Endurance aircraft fly at high $C_L$, where induced drag dominates; the airfoil influences them less through minimum drag and more through the *shape* of the section polar at high $c_l$, and through enabling high aspect ratio. Conversely, an aircraft forced to cruise *below* $C_L^*$—at high speed or low altitude—is *more* sensitive to $C_{D0}$, because parasite drag then dominates.

## Climb, ceiling and manoeuvre

Specific excess power $P_s = V(T-D)/W$ governs rate of climb, ceiling and energy manoeuvrability. At high speed $D$ is mostly parasite drag; at the ceiling and in a sustained turn, it is mostly lift-dependent drag. For a sustained turn at load factor $n$ with thrust $T$:

$$n_{sus} = \frac{qS}{W}\sqrt{\frac{T/(qS) - C_{D0}}{K}} \tag{e:10}$$

In this regime the section characteristic that matters is the lift-dependent part of profile drag—how much *leading-edge suction* the section can sustain before separation—rather than $c_{d,\min}$.

## The airfoil's share of the drag budget

A useful rule follows from these relations. For small changes, the fractional change in a performance metric is approximately the product of two factors: the *share* of total drag (or power) that the airfoil's profile drag represents at the limiting condition, and an *exponent* of order one that depends on the metric—about 1 for fuel at fixed range, $\tfrac12$ for maximum $L/D$, $\tfrac13$ for top speed and $\tfrac23 P_0/P_i$-type ratios for hover thrust (Appendix B). Table {t:share} lists the shares for the generic vehicles used in this paper. They range from about 13 % for a fighter in a sustained turn to about 32 % for a sailplane at best glide, which already explains most of the spread in sensitivities found later.

| Vehicle and condition | Airfoil profile share |
|:---|---:|
| Jet transport, mid-cruise (A) | 22 % of drag |
| Regional turboprop, cruise | 26 % of drag |
| Sailplane at $(L/D)_{\max}$ (D) | 32 % of drag |
| Mini-UAV at best endurance (E) | 16 % of drag |
| Light fighter, sustained turn (G) | 13 % of drag |
| Helicopter hover, 3 000 m ISA+20 (H) | 13.5 % of rotor power |
| Helicopter hover, sea level | 17.6 % of rotor power |
| Quadcopter hover (J) | 17 % of rotor power |

: TABLE {t:share}. Share of total drag or rotor power due to wing or blade section profile drag in the generic examples.

## Rotors and propellers

For rotors and propellers the airfoil acts directly on the conversion of shaft power into thrust, through the profile power term and through the blade-element efficiency. These relations are developed in Sections V and IX. The key point is that the airfoil drag here multiplies the *cube* of the local blade speed, so it is weighted strongly towards the blade tip, where Mach number and compressibility effects are largest.
