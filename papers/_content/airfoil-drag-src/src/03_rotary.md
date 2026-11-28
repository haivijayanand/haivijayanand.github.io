# Small Aircraft and Low-Reynolds-Number Flight

## The laminar separation bubble

Below a chord Reynolds number of about $5\times10^5$, the favourable behaviour of laminar boundary layers turns into a liability. A laminar layer cannot withstand much adverse pressure gradient; it separates, transition then occurs in the free shear layer, and the now-turbulent flow may reattach as a *laminar separation bubble*. The bubble thickens the boundary layer downstream and adds pressure drag. As Reynolds number falls toward $5\times10^4$–$7\times10^4$ the bubble lengthens and may fail to reattach at all, producing large drag increases, loss of lift and hysteresis [#lissaman], [#mueller]. At these Reynolds numbers section drag depends strongly on airfoil shape, surface finish, free-stream turbulence and even propeller noise; thin, cambered sections and trips or turbulators that force transition ahead of laminar separation often outperform "conventional" thick sections [#selig].

## Worked example E: endurance of an electric mini-UAV

Consider an electric fixed-wing UAV of 2.5 kg mass, $S=0.5$ m², $A=8$, $e=0.8$ and chord 0.25 m, with 12 counts of non-wing parasite drag, a 100 Wh battery of which 85 % is usable, an overall propulsive efficiency (motor, controller, propeller) of 0.55 and 3 W of avionics. Its endurance is

$$E = \frac{\eta\,E_{batt}}{P_{req}/\eta_{prop} + P_{av}} \tag{e:13}$$

where $P_{req}=\tfrac12\rho V^3 S C_D$. Two section polars are compared at a Reynolds number of $1.5\times10^5$: a well-chosen low-Reynolds-number section with $c_d = 0.010 + 0.012(c_l-0.6)^2$, and a bubble-prone section with $c_d = 0.014 + 0.030(c_l-0.4)^2$, which represents a thicker airfoil designed for higher Reynolds numbers. At the best-endurance condition ($C_L\approx1.0$, $V\approx9$ m/s), the first section has 121 counts of drag and the aircraft needs 32.4 W, giving 158 min endurance; the second has 226 counts, needs 37.4 W and achieves 136 min—a 14 % loss. Even though endurance responds only to $C_{D0}^{-1/4}$ for a *flat* polar, the bubble penalty is concentrated at high $c_l$, exactly where an endurance aircraft flies, so the loss is much larger than the minimum-drag figures alone suggest. Fig. {f:uavP} shows the power-required curves: the two aircraft differ little at high speed but by 15 % at the slow speeds used for loiter.

![Fig. {f:uavP}. Battery power required by the generic 2.5 kg UAV with a well-chosen low-Reynolds-number section and with a bubble-prone section (worked example E).](fig/f11_uav_power)

The lesson for small aircraft is that the airfoil should be chosen from data at the right Reynolds number and the right $c_l$; catalogue polars at $Re=10^6$ or above are misleading. XFOIL's $e^N$ transition model with a reduced $N$ factor is generally reliable for bubble prediction down to about $Re=10^5$ when the flow reattaches [#drela89], but wind-tunnel data such as those of Selig and co-workers [#selig] remain the reference.

# Combat Aircraft

Combat aircraft operate across the widest range of conditions—subsonic cruise, transonic manoeuvre, supersonic dash—and their airfoils are compromises among them. Three section characteristics dominate: wave drag at supersonic speed, which demands very thin sections; the lift-dependent drag at high $c_l$ in transonic manoeuvre, which depends on how much leading-edge suction the section can sustain; and maximum lift and buffet onset.

## Worked example F: supersonic wave drag

In linearised supersonic flow the drag of a thin airfoil is [#anderson]

$$c_d = \frac{4\alpha^2}{\beta} + \frac{2}{\beta}\left(\overline{\left(\frac{dy_u}{dx}\right)^2}+\overline{\left(\frac{dy_l}{dx}\right)^2}\right), \qquad \beta=\sqrt{M_\infty^2-1} \tag{e:14}$$

For a symmetric biconvex section of thickness ratio $\tau$ the thickness term is $16\tau^2/(3\beta)$. At $M=1.6$ ($\beta=1.249$), this gives 38 counts for a 3 % section, 68 counts for 4 %, 107 for 5 % and 154 for 6 % (Fig. {f:super}). For comparison, the turbulent skin friction of both surfaces at $Re=3\times10^7$ is about 51 counts. Above about 4 % thickness, *wave drag of the section alone exceeds its skin friction*, and it grows with the square of thickness. This is why supersonic wings are thin—typically 3–5 % for fighters—and why the reduction in thickness has to be paid for in structural weight, fuel volume and low-speed maximum lift. The lift-dependent term, which can be written $\beta C_L^2/4$ for a two-dimensional section, is also large; wings are therefore swept so that the leading edge lies inside the Mach cone ("subsonic leading edge"), allowing some leading-edge suction to be recovered with rounded, cambered leading edges inboard.

![Fig. {f:super}. Thickness wave drag of a biconvex section from linear theory ({e:14}), compared with turbulent skin friction of both surfaces.](fig/f5_supersonic)

## Worked example G: sustained turn

Consider a generic light fighter of 10 t mass, $S=40$ m² and available thrust 60 kN at 5 000 m and $M=0.8$ ($q=24\,200$ Pa), with $C_{D0}=0.020$ (of which 0.008 is wing profile drag) and $K=0.21$. From ({e:10}) its sustained load factor is 4.41 at $C_L=0.447$, a turn rate of 9.42 °/s. A 10 % reduction in wing profile drag raises this to only 4.46 g and 9.51 °/s (+1 %). A 10 % reduction in $K$—which a section with better leading-edge suction, a leading-edge flap or variable camber can provide—raises it to 4.65 g and 9.96 °/s (+5.7 %). For manoeuvre, therefore, the airfoil's *drag rise with lift* is roughly five times as important as its minimum drag. This is the aerodynamic logic behind manoeuvre flaps, leading-edge root extensions and the automatic camber scheduling of modern fighters. Fig. {f:fighter} extends the comparison to reductions of up to 30 %: the turn-rate gain from reducing $K$ grows steadily, whereas the gain from wing minimum drag remains small throughout.

![Fig. {f:fighter}. Sustained turn rate of the generic light fighter at $M$ 0.8 and 5 000 m as wing profile drag or the induced-drag factor $K$ is reduced (worked example G).](fig/f12_fighter)

## Transonic buffet and high-incidence drag

Two further section characteristics shape combat aircraft performance. First, in transonic manoeuvre the thin wing section reaches its *buffet onset* boundary—where shock-induced separation becomes unsteady—at a lift coefficient well below its low-speed maximum. Buffet limits usable $C_L$ for tracking and weapon delivery, and the drag rise that accompanies shock-induced separation cuts specific excess power just as the pilot demands it. Sections and wing twist are therefore tailored to delay buffet onset, and variable leading- and trailing-edge flaps are scheduled with Mach number and incidence to keep the section near its best drag-to-lift characteristic.

Second, at high incidence the drag of a thin section is dominated by the loss of leading-edge suction: once the flow separates at the sharp leading edge, the resultant force acts nearly normal to the chord and the drag becomes roughly $C_L\tan\alpha$. Combat aircraft with highly swept leading edges turn this into an advantage through vortex lift, but at the price of very high drag—useful for rapid deceleration but costly for sustained turns. The airfoil's leading-edge radius and camber, together with leading-edge devices, decide how far along this path the aircraft travels before the drag penalty becomes prohibitive.

# Helicopters

## Hover

In hover the rotor's shaft power is the sum of induced and profile power. With the empirical induced-power factor $\kappa$ and a mean blade drag coefficient $\bar c_d$, momentum and blade-element theory give [#leishman], [#johnson]

$$P = \kappa\frac{T^{3/2}}{\sqrt{2\rho A}} + \frac{\sigma\bar c_d}{8}\rho A(\Omega R)^3 \tag{e:15}$$

where $A=\pi R^2$ is disk area, $\sigma$ the solidity and $\Omega R$ tip speed. The figure of merit, the ratio of ideal to actual power, is

$$FM = \frac{C_T^{3/2}/\sqrt2}{\kappa C_T^{3/2}/\sqrt2 + \sigma\bar c_d/8} \tag{e:16}$$

The airfoil appears through $\bar c_d$ evaluated at the mean blade lift coefficient $\bar c_l\approx6C_T/\sigma$. Here the classical polar of Bailey for the NACA 0012, $c_d = 0.0087 - 0.0216\alpha + 0.4\alpha^2$ [#bailey], is used with an empirical drag-rise term beyond the onset of stall. Fig. {f:fm} shows $FM$ as a function of blade loading for three sections: an advanced rotorcraft section ($c_{d0}=0.0075$, later stall), the NACA 0012 baseline and an eroded or rough blade ($c_{d0}=0.0115$, earlier stall). At $C_T/\sigma=0.08$ the figures of merit are 0.73, 0.71 and 0.67. The maximum values are 0.78, 0.75 and 0.73, reached at $C_T/\sigma$ of 0.14, 0.125 and 0.12 respectively. Better sections thus give a higher peak *and* move it to higher blade loading, which allows lower solidity or lower tip speed for the same thrust—both of which reduce profile power further and, through tip speed, reduce noise.

![Fig. {f:fm}. Rotor figure of merit versus blade loading for three blade sections ({e:15})–({e:16}). The fall at high $C_T/\sigma$ represents onset of blade stall.](fig/f6_fm)

## Worked example H: hot-and-high hover payload

Take a generic 5.5 t utility helicopter with a four-bladed main rotor of 6.6 m radius, $\sigma=0.08$ (chord 0.415 m), $\Omega R=215$ m/s and $\kappa=1.15$, hovering out of ground effect at 3 000 m, ISA+20 °C ($\rho=0.846$ kg/m³). Table {t:heliH} gives the results. The blade loading is $C_T/\sigma=0.126$, close to the figure-of-merit peak; induced power is 947 kW and profile power 148 kW, 13.5 % of the main-rotor total of 1 095 kW.

With engine power fixed at this value, the hover-capable gross mass changes as follows: if the whole blade drag polar is 10 % lower, it rises by 47 kg; if it is 25 % higher—typical of moderate leading-edge erosion or sand and dust abrasion—it falls by 127 kg. Against a useful load of perhaps 1.5–2 t, these are 2–3 % and 6–8 % respectively. Small changes in the airfoil's drag therefore translate into substantial changes in what a helicopter can lift at a hot, high landing site, and erosion protection of the blade leading edge is a performance item as much as a maintenance one.

Fig. {f:helipay} generalises the result for blade drag polars between 80 % and 140 % of the baseline. A perhaps surprising feature is that the effect is *larger at sea level* than at the hot-and-high condition: at sea level the same helicopter hovers at a lower blade loading, profile power is 17.6 % of the total rather than 13.5 %, and a 25 % increase in blade drag costs 182 kg rather than 127 kg. The airfoil's drag therefore matters most where the rotor is lightly loaded, and its maximum lift and stall drag rise matter most where it is heavily loaded.

![Fig. {f:helipay}. Change in hover-capable gross mass of the generic 5.5 t helicopter at constant power as the blade drag polar is scaled, at sea level and at 3 000 m ISA+20 °C.](fig/f13_heli_payload)

| Quantity | Value |
|:---|---:|
| Density, 3 000 m ISA+20 (kg/m³) | 0.846 |
| $C_T$; $C_T/\sigma$; mean $\bar c_l$ | 0.0101; 0.126; 0.76 |
| Mean blade $\bar c_d$ | 0.0129 |
| Induced power (kW) | 947 |
| Profile power (kW) | 148 (13.5 %) |
| Main-rotor power (kW) | 1 095 |
| Figure of merit | 0.75 |
| Δ hover mass, blade polar −10 % | +47 kg |
| Δ hover mass, blade polar +25 % | −127 kg |

: TABLE {t:heliH}. Worked example H: generic 5.5 t helicopter in hot-and-high hover.

## Forward flight

In forward flight at advance ratio $\mu=V/\Omega R$, main-rotor power can be written

$$P = \kappa T v_i + \frac{\sigma\bar c_{d}}{8}\rho A(\Omega R)^3(1+4.65\mu^2) + \tfrac12\rho V^3 f \tag{e:17}$$

where $v_i$ is the induced velocity and $f$ the equivalent flat-plate area of the fuselage and hub [#leishman]. The induced term falls with speed, the parasite term rises with its cube, and the profile term rises with $\mu^2$—but ({e:17}) hides the most important airfoil effect. On the advancing side the blade tip sees a Mach number

$$M_{AT} = \frac{\Omega R + V}{a} \tag{e:18}$$

which at 140 kt and sea level reaches 0.84 for the example rotor. A 12 % thick section with a critical Mach number near 0.64 at zero lift is then deep in its drag rise for a large part of each revolution. Meanwhile, on the retreating side, the blade must generate its share of lift at low dynamic pressure; local $c_l$ climbs towards $c_{l,\max}$ and drag rises with lift until retreating-blade stall sets a hard limit. The helicopter's maximum speed, its high-speed range and its vibration level are thus set by the airfoil's drag behaviour at *both* ends of its operating envelope—high Mach number at low $c_l$, and low Mach number at high $c_l$ [#prouty], [#bousman].

## Worked example I: tip section and high-speed power

To capture these effects the profile power was integrated over blade radius and azimuth, with each element's Mach number from ({e:18}) and a Lock-law compressibility drag increment. Two tip sections are compared on the same sea-level rotor with $f=1.8$ m²: a conventional 12 % thick section ($\kappa_A=0.87$, $c_{d0}=0.0087$, $M_{cr}\approx0.64$) and a thin advanced tip section of 8 % thickness with supercritical-style design ($\kappa_A=0.92$, $c_{d0}=0.0080$, $M_{cr}\approx0.73$).

Fig. {f:heli} shows the result. In hover the profile power differs by only 8 % (162 versus 149 kW). At 140 kt, however, it is 261 kW for the conventional tip and 199 kW for the advanced tip—a 24 % difference, almost entirely from compressibility—and total main-rotor power falls from 812 to 750 kW (−7.6 %). Minimum power, at the best-endurance speed of about 78 kt, differs by only 3 %. The best specific range (distance per unit energy) improves by 5.1 %, and the best-range speed rises from 111 to 115 kt, because the advanced tip delays the compressibility penalty that otherwise limits economical cruise. The airfoil's *drag-divergence behaviour* therefore buys high-speed capability, while its *minimum drag* buys hover and endurance.

![Fig. {f:heli}. Main-rotor power versus forward speed for two tip sections (worked example I), with induced and parasite components. Dashed lines show profile power.](fig/f7_heli_fwd)

This is the background to the families of dedicated rotorcraft airfoils developed since the 1970s—the Boeing VR series, Sikorsky SC1095, ONERA OA series and the RAE/Westland sections with the BERP tip, among others [#bousman]. These combine thin, high-$M_{DD}$ outboard sections with thicker, high-$c_{l,\max}$ inboard sections, small pitching moments (because blade torsional loads and control loads depend on $c_m$), and tip planforms that further delay compressibility and stall. A Westland Lynx with BERP blades set the absolute helicopter speed record of 400.87 km/h in 1986. Table {t:rotorreq} summarises how the requirements change along the blade.

| Blade region | Local $M$ (hover / advancing) | $c_l$ range | Section priorities |
|:---|:---|:---|:---|
| Root (0.2–0.5 $R$) | 0.15–0.35 / 0.3–0.6 | 0.4–1.2 | Thickness for structure, $c_{l,\max}$, low drag at moderate $Re$ |
| Mid-span (0.5–0.85 $R$) | 0.35–0.55 / 0.6–0.8 | 0.2–1.3 | High $c_{l,\max}$ at $M\approx0.4$, low $c_m$, wide drag bucket |
| Tip (0.85–1.0 $R$) | 0.55–0.65 / 0.8–0.9 | −0.2–1.0 | Thin, high $M_{DD}$ at low $c_l$, low $c_m$, compatible with tip sweep |

: TABLE {t:rotorreq}. Typical rotor-blade section requirements by radial station (conventional helicopter at high speed). [wide]

## Dynamic stall and vibration

The retreating blade in high-speed or high-thrust flight undergoes large, rapid incidence changes once per revolution. Under these conditions the section does not stall quasi-statically: a leading-edge vortex forms and is shed, producing transient overshoots in lift and very large excursions in drag and nose-down pitching moment [#leishman]. The resulting torsional loads and vibrations, rather than the mean power, usually limit thrust and speed. Static polars, even good ones, therefore underestimate the drag that a rotor experiences near its envelope boundary; sections with gentle trailing-edge stall and a high static $c_{l,\max}$ also tend to delay dynamic stall, which is a further reason why the drag-rise behaviour of the section matters more for rotorcraft than its minimum drag.

# Tiltrotors, Compounds and Multicopters

## Tiltrotors

A tiltrotor's proprotor must be an efficient rotor in hover and an efficient propeller in cruise. The two requirements pull blade twist and section choice in opposite directions: hover favours moderate twist and sections with low drag at $c_l\approx0.5$–0.7, while high-speed cruise at large inflow angles favours much higher twist and thin, high-$M_{DD}$ tip sections. Equation ({e:12}) applies to cruise; Fig. {f:prop} shows that at the large $\phi$ of a tiltrotor in cruise the efficiency penalty of a modest $c_l/c_d$ is small *if* each element is at its best $c_l$, so the difficulty is less the minimum drag than keeping every section near its drag bucket in both modes [#johnson], [#maisel].

The tiltrotor's wing provides a second, less obvious airfoil-drag effect. Because it must be stiff enough to avoid whirl flutter, the wing is very thick (above 20 % on current designs), which raises profile drag and lowers $M_{DD}$, contributing to the cruise-speed ceiling of the configuration. In hover the wing sits in the rotor wake and experiences a *download* of order 10 % of rotor thrust—effectively the drag of the section at about 90° incidence. Deflecting the flaperons to reduce the wing's projected area in the wake reduces this download, and every percentage point of download recovered adds roughly one percentage point of hover-capable gross mass [#maisel]. For a generic 20 t tiltrotor, reducing download from 10 % to 7 % of rotor thrust raises hover-capable gross mass by about 3.3 %, some 670 kg, which may be 10–15 % of the useful payload. Here the relevant "airfoil drag characteristic" is the drag of the wing section at 90° incidence, with and without flap deflection—far outside any conventional polar, but decisive for this configuration.

## Compound helicopters

Compound and lift-offset designs—with auxiliary propulsion and, in some cases, wings—offload the rotor at high speed and slow it to keep the advancing tip below drag divergence. Speeds of 250 kt and above have been demonstrated, for example by the Eurocopter X3, which reached 255 kt in level flight in 2013. Slowing the rotor raises the advance ratio to 0.5–0.8, so a large part of the retreating side lies in reversed flow, where the section meets air from its trailing edge. Airfoil drag characteristics in reverse flow, and at very high and very low local Mach number on the same revolution, therefore become design drivers, and section designs with blunter trailing edges or tailored camber are studied specifically for these rotors.

## Multicopters and eVTOL

Small multicopter drones combine low Reynolds number with high blade loading. Blade chords of 15–25 mm at tip speeds of 60–100 m/s give Reynolds numbers of $3\times10^4$–$1.5\times10^5$, where profile drag coefficients of 0.015–0.035 are typical [#mueller].

Worked example J considers a 2 kg quadcopter with four 254 mm (10 in) two-bladed rotors ($\sigma=0.10$, tip speed 80 m/s, $\kappa=1.25$, representative Reynolds number $6.5\times10^4$), a 74 Wh battery of which 80 % is usable, motor and controller efficiency 0.75 and 5 W of avionics. Table {t:quad} gives the results. As $\bar c_d$ rises from 0.015 to 0.035, the profile power of each rotor more than doubles (6.0 to 13.9 W), the figure of merit falls from 0.69 to 0.59 and hover endurance falls from 14.7 to 12.5 min (−15 %). For multicopters, hover is the dominant flight condition and the airfoil's low-Reynolds-number drag is therefore one of the few aerodynamic parameters with a first-order effect on endurance, beside disk loading.

| Rotor $\bar c_d$ | Profile power per rotor (W) | FM | Total electrical power (W) | Hover endurance (min) |
|:---|---:|---:|---:|---:|
| 0.015 | 6.0 | 0.69 | 242 | 14.7 |
| 0.020 | 8.0 | 0.66 | 253 | 14.0 |
| 0.025 | 9.9 | 0.64 | 263 | 13.5 |
| 0.035 | 13.9 | 0.59 | 285 | 12.5 |

: TABLE {t:quad}. Worked example J: 2 kg quadcopter hover.

Larger electric VTOL aircraft for urban air mobility add a further trade-off: noise regulations push tip speeds down, raising blade $c_l$ for the same thrust and moving the sections towards the high-$c_l$ end of their drag polar. Airfoils that combine low drag at high $c_l$ with benign stall are needed, much as for the endurance UAV of Section VII.

Fig. {f:evtol} illustrates the trade for a generic six-rotor, 2.2 t lift-plus-cruise vehicle with rotors of 1.6 m radius and solidity 0.15 in hover. As tip speed falls from 230 m/s, profile power falls with its cube and the figure of merit rises; but the blade loading rises at the same time, and once the mean blade lift coefficient approaches stall the drag rise reverses the trend. With a conventional section the best figure of merit, 0.78, occurs at a tip speed of about 135 m/s and performance collapses below about 130 m/s; with an advanced section having lower drag and a later drag rise, the optimum moves to about 124 m/s with a figure of merit of 0.80. Since rotor noise falls steeply with tip speed, the section's drag behaviour at high $c_l$ translates directly into how quiet the vehicle can be made without a performance penalty—or, alternatively, how much solidity, and therefore blade weight, must be added to reach a noise target.

![Fig. {f:evtol}. Hover figure of merit versus tip speed for a generic 2.2 t six-rotor eVTOL lift rotor with two blade sections. The fall at low tip speed is caused by blade stall as $C_T/\sigma$ rises.](fig/f16_evtol)

![Fig. {f:quad}. Hover endurance and figure of merit of the generic 2 kg quadcopter versus rotor mean profile drag coefficient (worked example J).](fig/f10_quad)

Fig. {f:quad} shows the trend continuously: each 0.001 of $\bar c_d$ costs about 7 s of hover at this size, and the figure of merit falls almost linearly. Small rotor blades are therefore worth making thin, sharp-edged and smooth, and propeller catalogues that quote static thrust at a single rotational speed hide most of this sensitivity.

# Second-Order Couplings: Moment, Trim and Propulsion Integration

## Pitching moment and trim drag

An airfoil is not described by its drag polar alone; its pitching moment $c_m$ also carries a drag cost. Supercritical and aft-loaded sections, which obtain much of their lift near the trailing edge, have large nose-down moments. On a conventional aircraft the horizontal tail must balance this with a download, so the wing must carry more lift than the aircraft weight. The result is *trim drag*: extra induced drag on the wing, plus the induced and profile drag of the loaded tail. Its size depends on centre-of-gravity position and tail arm, and is commonly of the order of one to a few per cent of cruise drag [#torenbeek]. A section chosen for 2 % lower profile drag can therefore lose part of its advantage at the aircraft level if its moment is much more negative. Fuel-transfer systems that move the centre of gravity aft in cruise are, in effect, a way to recover trim drag created partly by the choice of airfoil.

The constraint is sharper elsewhere. Tailless aircraft and flying wings need sections with near-zero or slightly positive moment (reflexed camber), which generally costs minimum drag and maximum lift. Helicopter blades, as noted in Section IX, need small $c_m$ to limit torsional and control loads; for decades this kept rotorcraft on symmetric sections despite their higher drag, and advanced rotor airfoils use trailing-edge tabs or reflex to keep moments small while recovering lift and drag performance [#bousman].

## Propulsion integration

Propellers and engines change the flow over the airfoil. A tractor propeller slipstream raises the local dynamic pressure on the washed part of the wing and makes the boundary layer periodically turbulent; the profile drag of that part of the wing therefore rises, and laminar-flow benefits are limited to the unwashed span. Distributed electric propulsion, studied for example in NASA's X-57 programme, places many small propellers along the leading edge to increase lift at low speed, so that a smaller, more highly loaded wing—with lower wetted area and profile drag in cruise—can be used. The airfoil must then perform well both in a powerful slipstream at take-off and in clean flow at cruise.

Engine placement also interacts with the section's pressure distribution. Fujino's over-the-wing nacelle for the HondaJet was positioned so that its interference with the wing's supersonic region *reduced* wave drag at cruise, and the same aircraft uses a natural-laminar-flow wing section [#fujino]. Boundary-layer ingestion, in which an engine swallows the low-momentum fluid of a wing or fuselage boundary layer, goes further: part of the energy lost to profile drag is recovered as reduced propulsive power. In such configurations section drag is no longer simply a loss to be minimised but a flow to be managed jointly with the propulsor.

# Case Studies

The worked examples above use generic parameters. The following short case studies show the same principles in real designs; the descriptions are qualitative and drawn from the cited open literature.

## Laminar-flow piston fighters

During the Second World War several designs adopted the new laminar-flow sections in the hope of large drag reductions. In service, achieved laminar extent was limited by manufacturing waviness, rivets, paint, insect contamination and combat damage. Nevertheless, the sections' higher critical Mach number and thinner, more favourable pressure distributions proved valuable at the high diving speeds of the period [#abbott], [#loftin]—an early demonstration that the *compressibility* characteristics of a section can matter more in practice than its minimum drag.

## Natural laminar flow on a business jet

The HondaJet combines a natural-laminar-flow wing section (SHM-1), a natural-laminar-flow fuselage nose and over-the-wing engine mounts [#fujino]. To sustain laminar flow the wing uses an integrally machined metal skin to minimise waviness, steps and gaps. Low sweep, moderate Reynolds number and careful surface engineering—exactly the conditions identified in Sections II and IV—allowed a laminar wing to reach production on a jet aircraft, where transport-size wings with higher sweep and Reynolds number have not yet done so.

## Supersonic transport

Concorde's wing is a very thin, cambered and twisted ogival delta. Its thinness limits supersonic wave drag, in line with ({e:14}); the price is a low-speed regime in which lift comes largely from leading-edge vortices at high incidence, with high induced drag, high take-off power and high noise. The thin section, chosen for its supersonic drag characteristics, effectively sets the aircraft's low-speed performance and community-noise problem.

## High-speed helicopter rotor

The BERP rotor of the Westland Lynx combined advanced rotor sections with a tip planform designed to delay both advancing-blade compressibility and retreating-blade stall. It enabled the 1986 speed record noted in Section IX and illustrates the conclusion of worked example I: for a helicopter, the drag *rise* of the tip sections with Mach number and lift coefficient sets the speed envelope.

## Rotorcraft on Mars

The Ingenuity Mars helicopter flew in an atmosphere with roughly one per cent of Earth's sea-level density. Its rotor blades operated at chord Reynolds numbers of only $10^3$–$10^4$ while the low speed of sound pushed tip Mach numbers towards 0.7 [#balaram], [#koning]. In this regime viscous drag is a large fraction of rotor power, and studies showed that thin cambered plates can outperform conventional airfoils, giving higher maximum thrust and figure of merit [#koning]. This is the extreme limit of the low-Reynolds-number trend shown in Sections VII and X.

## Sailplane evolution

The move from wooden to glass-fibre sailplanes in the 1960s allowed exact, smooth wing contours and made the full laminar potential of the Wortmann and Eppler sections attainable. Maximum glide ratios rose from about 30 to above 40 for standard-class gliders and above 60 for open-class gliders, with laminar section drag, aspect ratio and contamination control as the main levers [#thomas], [#eppler]. Worked example D reproduces the sensitivity behind this history.
