# Subsonic Jet Transports

## Role of the airfoil

On a jet transport the wing is the largest single contributor to both parasite and wave drag. Its sections are chosen to meet three coupled requirements: low profile drag at cruise $c_l$; a drag-divergence Mach number comfortably above the cruise Mach number at that $c_l$ (the buffet boundary sets a further margin above that); and as much thickness as possible, because thickness carries bending loads, houses fuel and reduces structural weight. Raymer's statistical wing-weight relation for transports, for example, makes wing weight vary roughly as $(t/c)^{-0.4}$ [#raymer]. The airfoil therefore touches the range equation through $L/D$ directly, through structural weight (and hence $W_i/W_f$), and through the aspect ratio that a given thickness permits.

## Worked example A: profile drag and fuel burn

Consider a generic single-aisle transport with wing reference area $S=122.6$ m², aspect ratio $A=9.5$, Oswald factor $e=0.82$ and mid-cruise mass 66 t, cruising at $M=0.78$ at 35 000 ft (10 668 m; $\rho=0.380$ kg/m³, $V=231$ m/s, $q=10\,154$ Pa). Its zero-lift drag coefficient is taken as $C_{D0}=0.0200$, of which the wing profile drag is 0.0070 (35 %), plus 10 counts of wave drag at cruise; TSFC is 0.57 h⁻¹. Table {t:transA} gives the results.

At the mid-cruise $C_L=0.520$, induced drag is $C_{Di}=0.0110$ and total drag $C_D=0.0320$, giving $L/D=16.2$. A 10 % reduction in wing profile drag (7 counts) raises $L/D$ to 16.6. For a 2 500 km cruise ending at 62 t, ({e:8}) gives a fuel burn of 6 897 kg for the baseline and 6 739 kg for the improved wing: a saving of 159 kg or 2.3 % per flight. Over 1 000 such flights—roughly one year of operation for one aircraft—that is about 159 t of fuel and 500 t of CO₂, using the standard 3.16 kg CO₂ per kg of jet fuel [#icao].

The *sensitivity* is the useful figure: each 1 % of wing profile drag is worth 0.22 % of $L/D$ and slightly more in fuel. Fig. {f:tLD} shows that the gain applies across the cruise $C_L$ range but is largest at the low-$C_L$ end of the polar, i.e. early in a long flight at high weight it is somewhat smaller, and late in the flight or at higher Mach number it is larger.

![Fig. {f:tLD}. Lift-to-drag ratio of the generic transport, baseline and with reduced wing profile drag. The dotted line marks the mid-cruise lift coefficient.](fig/f2_transport_LD)

| Quantity | Baseline | Wing $c_d$ −10 % | Laminar wing |
|:---|---:|---:|---:|
| Wing section $c_d$ (counts) | 61 | 55 | 44 |
| $C_{D0}$ | 0.0200 | 0.0193 | 0.0184 |
| $C_D$ at $C_L=0.520$ | 0.0320 | 0.0313 | 0.0304 |
| $L/D$ | 16.22 | 16.59 | 17.08 |
| Fuel, 2 500 km (kg) | 6 897 | 6 739 | 6 534 |
| Saving per flight | — | 159 kg (2.3 %) | 363 kg (5.3 %) |
| Saving per 1 000 flights | — | 159 t fuel, 500 t CO₂ | 363 t fuel, 1 150 t CO₂ |

: TABLE {t:transA}. Worked example A: generic narrow-body transport at $M$ 0.78, FL350.

## Worked example B: laminar flow

At the wing's mean-chord Reynolds number of $2.6\times10^7$, the section model ({e:3}) gives 61 counts for a fully turbulent 12 % section and 44 counts if transition is held at 40 % chord on the upper surface and 25 % on the lower—a 29 % reduction. Applying this to 80 % of the wing area (excluding the root, the fuselage-junction region and areas behind slats and contaminated zones) raises $L/D$ to 17.1 and reduces trip fuel by 5.3 % (Table {t:transA}).

That figure explains half a century of effort on transport laminar flow [#joslin], [#bushnell]. The obstacles are equally clear. Wing sweep, required for $M_{DD}$, produces crossflow instability that limits natural laminar flow to leading-edge sweeps below roughly 18–20° at transport Reynolds numbers. Hybrid laminar flow control (HLFC) adds leading-edge suction to damp crossflow and uses a favourable pressure gradient further aft; it was flight tested on a Boeing 757 wing glove in the early 1990s [#joslin]. Airbus's BLADE demonstrator first flew natural-laminar outer-wing panels on an A340 in September 2017, to study the manufacturing tolerances needed in practice; the project's stated aims—about half the wing friction drag and up to 5 % lower CO₂—are consistent with the estimate above [#blade]. In both cases the aerodynamic benefit has been established; the remaining issues are surface quality, insect contamination at take-off and landing, ice protection integrated with the suction system, maintenance cost and the weight of the system [#bushnell].

## Transonic drag divergence

For a swept wing the drag-divergence Mach number can be estimated with the Korn equation as extended to sweep [#mason]:

$$M_{DD} = \frac{\kappa_A}{\cos\Lambda} - \frac{t/c}{\cos^2\Lambda} - \frac{C_L}{10\cos^3\Lambda} \tag{e:11}$$

with $\kappa_A\approx0.87$ for conventional (NACA 6-series type) sections and up to about 0.95 for supercritical sections. The wave-drag rise above the critical Mach number is commonly modelled by Lock's fourth-power law, $C_{Dw}=20(M-M_{cr})^4$ with $M_{cr}=M_{DD}-(0.1/80)^{1/3}$ [#mason].

Fig. {f:korn} shows ({e:11}) for $C_L=0.55$. The supercritical airfoil's benefit can be taken in three ways (worked example C): at a sweep of 25° and a target $M_{DD}=0.80$, the maximum thickness rises from 7.1 % for a conventional section to 14.3 % for a supercritical one; alternatively, at 11 % thickness the sweep required falls from 35° to 13°; or, at fixed sweep and thickness, $M_{DD}$ rises from 0.75 to 0.84. Real designs split the benefit, most often taking thickness (for lighter, higher-aspect-ratio wings with more fuel volume) and a little Mach number. This is the main way in which airfoil *drag characteristics*—specifically the wave-drag rise—affect transport performance: indirectly, through the wing's geometry and weight, rather than through a few counts of $c_d$ at cruise [#whitcomb], [#harris], [#torenbeek].

![Fig. {f:korn}. Drag-divergence Mach number from the Korn equation ({e:11}) at $C_L=0.55$ for conventional and supercritical sections at two sweep angles. The dotted line marks $M_{DD}=0.78$.](fig/f3_korn)

## Mission-length dependence

Fig. {f:fuel} generalises example A. The fuel saving for a given profile-drag reduction grows with mission length, because of the exponential in ({e:8}): for a 10 % reduction in wing profile drag the saving is 2.2 % at 800 km and 2.5 % at 6 000 km, and for a 50 % reduction it is 11.1 % and 12.2 % respectively. In practice, on short sectors a larger share of fuel is spent in climb, where higher $C_L$ makes induced drag more important, and the cruise-only figures overstate the benefit; on long-haul sectors they understate it, because the lighter fuel load also reduces induced drag.

## Take-off and climb: the high-lift configuration

Cruise is not the only phase in which section drag matters. At take-off, a twin-engined transport must meet a minimum climb gradient of 2.4 % in the second segment with one engine inoperative. The gradient is approximately $\gamma = T/W - 1/(L/D)$, where $L/D$ is that of the take-off configuration—slats and flaps deployed, at a $C_L$ well above cruise—and is typically only 8–10. On a hot day or at a high airport, this requirement, not runway length, often limits take-off weight. The drag of the multi-element high-lift sections, including slat-cove and flap-gap flows and the confluence of wakes, then enters the payload directly.

For a generic case in which one engine delivers thrust equal to 13.5 % of a 78 t reference weight and the take-off $L/D$ is 9.0, the gradient requirement limits take-off mass to 77.9 t. Raising take-off $L/D$ by 1 % allows 640 kg more (0.82 % per 1 %); raising it by 5 %—through lower-drag flap settings, sealed slats or better high-lift sections—allows 3.2 t (4.1 %). The leverage is three to four times larger than in cruise because the climb gradient is the small difference between two larger numbers. This is consistent with the industry rule of thumb, quoted by van Dam [#vandam], that a 1 % improvement in take-off $L/D$ is worth several thousand pounds of payload on a large twin. Fig. {f:takeoff} shows the relation for three thrust levels.

![Fig. {f:takeoff}. One-engine-inoperative climb-limited take-off mass versus take-off $L/D$ for a generic twin at three levels of available thrust (2.4 % second-segment gradient).](fig/f4b_takeoff)

![Fig. {f:fuel}. Cruise fuel saving versus reduction in wing profile drag for three cruise ranges (generic transport of example A).](fig/f4_fuel_saving)

# Turboprops, General Aviation and Propellers

## Airframe

Turboprop and general-aviation aircraft fly at Mach numbers of 0.2–0.6 with little or no sweep. Wave drag is negligible except near propeller tips, so airfoil profile drag and the extent of laminar flow are the dominant section characteristics. Low sweep and moderate Reynolds numbers ($3\times10^6$–$1.5\times10^7$) make natural laminar flow much more attainable than on jets, and NLF sections such as the NLF(1)-0416 were developed specifically for this class [#somers]. Two practical limits apply: the propeller slipstream, which washes a significant fraction of the span with unsteady, turbulent flow and moves transition forward periodically; and surface quality, particularly rivet heads and joints in metallic structure.

For a generic regional turboprop with $C_{D0}=0.026$ (wing share 0.009), $A=12$, $e=0.80$ and cruise $C_L=0.50$, the cruise $L/D$ is 14.6; a 10 % lower wing profile drag raises it to 15.0, a 2.7 % range improvement from ({e:7}) at constant fuel. The sensitivity is *larger* than for the jet (0.27 % per % versus 0.22 %) because the turboprop cruises further below its $C_L^*$, where parasite drag is a larger share of the total.

## Worked example: speed of a light aircraft

For a piston or turboprop aircraft at full power, the maximum level speed follows from $P\eta_p = DV$. At high speed, parasite drag dominates and $V_{\max}\propto(P\eta_p/C_{D0})^{1/3}$, so speed responds only to the cube root of drag. A generic four-seat light aircraft (1 150 kg, $S=16.2$ m², $A=7.4$, 150 kW, $\eta_p=0.82$, $C_{D0}=0.030$ of which 0.012 is wing) has a maximum speed of 141 kt. A 10 % lower wing profile drag gives 143 kt; a natural-laminar wing that removes 45 counts of wing drag gives 149 kt (+5.7 %). Because power required rises with the cube of speed, the same drag reduction is worth more as *fuel saved at a fixed cruise speed* than as *speed gained at fixed power*, which is how laminar-wing light aircraft and business jets usually express their advantage. Fig. {f:ga} makes the point: at a fixed cruise speed of 130 kt, the laminar wing reduces power and fuel flow by 13 %, more than twice its percentage gain in top speed.

![Fig. {f:ga}. Generic light aircraft: change in maximum level speed at full power, and in power required at 130 kt, as the zero-lift drag coefficient varies around the baseline of 0.030.](fig/f14_ga)

## Propeller blade sections

The propeller is itself a set of rotating airfoils, and the term $\eta_p$ in ({e:7}) depends directly on blade section drag. For a blade element with inflow angle $\phi$ and drag-to-lift angle $\gamma=\tan^{-1}(c_d/c_l)$, the local efficiency, ignoring induced losses, is [#mccormick]

$$\eta_{local} = \frac{\tan\phi}{\tan(\phi+\gamma)} \tag{e:12}$$

which is maximised at $\phi = 45^\circ - \gamma/2$. Fig. {f:prop} shows ({e:12}) for section lift-to-drag ratios of 30–120. At the optimum, raising $c_l/c_d$ from 50 to 80 raises local efficiency from 0.961 to 0.975; at $\phi=20^\circ$—typical of inboard sections in cruise and of the whole blade at climb—the gain from $c_l/c_d=30$ to 80 is from 0.905 to 0.962. Profile losses are thus a few per cent at the design point but grow rapidly away from it, which is why propeller sections are chosen for a wide low-drag range and why variable pitch, which keeps each element near its best $c_l/c_d$, was such an advance.

![Fig. {f:prop}. Blade-element efficiency ({e:12}) versus inflow angle for several section lift-to-drag ratios.](fig/f8_prop_eta)

Near the tip the helical Mach number of a turboprop blade reaches 0.7–0.85 in cruise. Thin sections (4–6 % at the tip) and, on advanced propellers, sweep are used to delay drag divergence—the same transonic physics as Section IV, appearing on a smaller scale. Because the propeller's thrust and the airframe's drag combine multiplicatively in ({e:7}), a 3 % gain in $\eta_p$ from better blade sections is worth as much as a 3 % gain in $L/D$ from the wing; in the generic example the two together would give about 6 %.

# Sailplanes and Long-Endurance Aircraft

## Sailplanes

The sailplane is the purest expression of airfoil-driven performance. There is no engine; performance is measured by the glide ratio $L/D$ and the minimum sink rate, and wing profile drag is typically the largest single drag term at the speeds used for inter-thermal cruise. Sailplane airfoils by Wortmann, Eppler and Althaus, designed with codes in the XFOIL tradition and verified in low-turbulence tunnels, hold laminar flow over 60–95 % of the chord on the lower surface and 50–70 % on the upper, with turbulators to control the laminar separation bubble near transition [#thomas].

Worked example D uses a generic 15 m span sailplane ($S=10.5$ m², $A=21.4$, $e=0.92$, mass 450 kg) with a 15 % thick laminar section operating at a Reynolds number of about $1.2\times10^6$. The section model gives 60 counts with transition at 60 %/70 % chord. If insect debris and rain trip transition to 8 % on the upper surface and 40 % on the lower, the section drag rises to 95 counts. With 35 counts of fuselage and tail drag added, the maximum glide ratio falls from 40.3 to 34.5 (−14 %), the minimum sink rises from 0.65 to 0.70 m/s, and the glide ratio at 100 km/h falls from 39.9 to 34.5 (Fig. {f:sail}). For a competition pilot these differences are decisive, which is why competition sailplanes carry bug-wipers and why the laminar bucket of a sailplane section is made as wide as possible: it must cover the high $c_l$ of thermalling *and* the low $c_l$ of fast cruise, with flaps used to shift the bucket between them.

![Fig. {f:sail}. Sink polar of the generic 15 m sailplane: clean laminar wing and insect/rain-contaminated wing (worked example D).](fig/f9_sailplane)

## Long-endurance UAVs

Medium- and high-altitude long-endurance (MALE/HALE) unmanned aircraft share the sailplane's emphasis on high aspect ratio and laminar sections, but they are optimised for endurance, $C_L^{3/2}/C_D$, rather than glide. As shown in Section III, endurance responds only to the fourth root of $C_{D0}$; the gain from lowering minimum section drag is half as large, in percentage terms, as for range. The section characteristics that matter more are the drag at *high* $c_l$ (1.0–1.4 for loiter), the maximum lift coefficient and gentle stall, and adequate thickness for a very slender, flexible, fuel-carrying wing. At high altitude, low density cuts the chord Reynolds number to $5\times10^5$–$2\times10^6$, close to the range in which laminar separation bubbles become significant, so HALE sections must combine sailplane-like low drag with low-Reynolds-number robustness. Fig. {f:haleRe} shows how quickly this happens. At constant equivalent airspeed, true speed rises as $1/\sqrt{\sigma}$ while density falls as $\sigma$, so the Reynolds number falls as $\sqrt{\sigma}$ and also with the rising viscosity-to-density ratio. A 1 m chord flying at 30 m/s equivalent airspeed has $Re=2.1\times10^6$ at sea level but only $8.1\times10^5$ at 18 km ($\rho=0.121$ kg/m³); a 0.5 m chord at the same condition enters the bubble-sensitive range.

For a generic HALE aircraft with $A=25$, $e=0.9$ and 80 counts of non-wing drag, a 30 % rise in wing section drag at altitude (from 80 to 104 counts, typical of a section designed at too high a Reynolds number) reduces the endurance parameter $(C_L^{3/2}/C_D)_{\max}$ by 3.4 %. The figure is modest because of the fourth-root dependence in ({e:9}), but it is in addition to the loss of maximum lift that usually accompanies the same bubble, which forces the aircraft to loiter at a lower $C_L$ and costs more endurance still.

![Fig. {f:haleRe}. Chord Reynolds number versus altitude at constant equivalent airspeed for three combinations of speed and chord (ISA). The shaded band marks the range in which laminar separation bubbles strongly affect section drag.](fig/f15_hale_re)
