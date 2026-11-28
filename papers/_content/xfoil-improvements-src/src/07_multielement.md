# Multi-Element Airfoils: Will a Panel Method Do?

XFOIL analyses one closed contour. A slat–main–flap system has two or three, separated by slots in which the flow is accelerated, turned and mixed. Can XFOIL's approach (a panel method plus integral boundary layers coupled through transpiration) be extended to such configurations? And if so, how far can it be trusted? The answer has two parts, because the inviscid and viscous parts behave very differently.

## Physics of the High-Lift System

Smith's classic analysis [#smith75] identified five favourable effects of a slotted system. All five are inviscid in origin:

1. the *slat effect*: the circulation of an upstream element lowers the velocity peak on the leading edge of the downstream one;
2. the *circulation effect*: a downstream element raises the circulation of the element ahead of it, by placing its trailing edge in a region of high velocity;
3. the *dumping effect*: the trailing edge of each upstream element discharges at a velocity higher than free stream, which relieves its own pressure recovery;
4. *off-the-surface pressure recovery*: the wake of the upstream element completes its deceleration away from the wall, where it is less likely to separate than a wall boundary layer would be;
5. the *fresh-boundary-layer effect*: each element starts a new, thin boundary layer that can withstand a strong adverse gradient.

Against these act several viscous phenomena. The wake of an upstream element merges with the boundary layer of the next to form a *confluent boundary layer* [#thomas97]. Slot flows are thin and may be dominated by viscous mixing. Slat and flap coves contain recirculating regions. And the decelerating wakes of the main element and flaps can reverse *off the surface* even while every wall boundary layer stays attached. This last effect is called *wake bursting*. It reduces lift and increases drag, depends on Reynolds and Mach number, and has been measured directly behind three-element airfoils [#pomeroy14]. It is now treated as a design constraint in its own right [#pomeroy17]. Maximum lift of a well-designed high-lift system is often set by these off-surface and confluent effects rather than by separation on any one element [#vandam02].

## What the Inviscid Part Captures: a Two-Element Study

To test the inviscid half of the question, a multi-element constant-source/constant-vortex panel method of the Hess–Smith type was written for this study [#hess], [#katz]. It has a Kutta condition on every element. On a single NACA 4412 it reproduces XFOIL's inviscid lift to within 0.5 % ($C_l = 0.512$ against 0.510 at $\alpha = 0$). It was then applied to a main element (NACA 4412, chord $c$) with an external airfoil flap (NACA 4412, $0.30c$) placed below and behind the main trailing edge. The slot gap, measured as the minimum distance from the main trailing edge to the flap, was 0.5–3.7 % of $c$, and flap deflections $\delta_f$ ran from 0 to $40^\circ$.

![Fig. {f:mecp}. Two-element configuration (main NACA 4412 + 30 % chord external NACA 4412 flap, $\delta_f = 20^\circ$, $\alpha = 0$) and inviscid pressure distribution from the multi-element panel method, compared with the isolated main element. The circulation and dumping effects are visible as the much larger suction on the main element and the raised trailing-edge velocity. [wide]](fig/f14_me_cp)

Fig. {f:mecp} shows that the panel method reproduces Smith's circulation and dumping effects without any special treatment. At $\delta_f = 20^\circ$ the main element carries $C_l = 1.88$, compared with $0.51$ for the same element in isolation. The flap's influence has multiplied the main element's lift by 3.7. The main element's trailing-edge velocity rises well above free stream, so its upper-surface pressure recovery is shortened. These are the effects that make slotted flaps work, and a potential-flow method captures them correctly because they are potential-flow effects.

![Fig. {f:mecl}. Inviscid lift of the two-element system and of each element against flap deflection, for three slot gaps. The panel method predicts lift rising almost linearly to $C_l \approx 3.5$–$3.8$ at $40^\circ$ and favours the smallest gap.](fig/f15_me_cl)

Fig. {f:mecl} shows the limits. The inviscid lift rises almost linearly with flap deflection, reaching $C_l = 3.55$–$3.79$ at $40^\circ$, and it increases monotonically as the gap closes. A sealed slot is "best" in inviscid theory. Real slotted flaps behave differently. Lift stops rising once the flap boundary layer or the main-element wake can no longer negotiate the flap's pressure recovery, and every real system has an *optimum* gap, typically a few per cent of chord. Below it, the main-element wake and the flap boundary layer merge and thicken. Above it, the slot no longer energises the flap [#smith75], [#vandam02]. Neither the saturation nor the optimum gap can come from potential flow.

Fig. {f:gapmap} maps the inviscid lift over flap position at $\delta_f = 25^\circ$. The whole map spans only $C_l = 2.45$–$2.66$, a range of 9 %, and its maximum lies at the smallest gap tested (0.4 % of chord) with about 1 % overlap. In potential flow, positioning the flap is a weak, monotonic optimisation that always favours closing the slot. In real flows the same parameters decide whether the flap stalls. Experiments and RANS find distinct optimum gaps of the order of 1–3 % of chord, with lift falling steeply on either side [#smith75], [#vandam02]. Flap positioning is therefore governed by viscous effects that the inviscid method cannot see.

![Fig. {f:gapmap}. Inviscid lift of the two-element system against flap overlap and vertical offset at $\delta_f = 25^\circ$; dashed lines are contours of the minimum slot gap. The star marks the inviscid maximum, which lies at the smallest gap.](fig/f22_gapmap)

![Fig. {f:mewake}. Velocity along the streamline leaving the main-element trailing edge, from the inviscid two-element solution, for flap deflections of $10^\circ$, $20^\circ$ and $30^\circ$. The main-element wake is first accelerated over the flap and then decelerated off the surface; the resulting pressure rise is what drives wake bursting in real flows.](fig/f16_me_wake)

Fig. {f:mewake} makes the viscous problem concrete. Follow the streamline that leaves the main-element trailing edge (the path of the main wake). The inviscid velocity first rises as the flow is drawn over the flap's suction side, to peaks of 1.31, 1.49 and 1.70 times free stream at $\delta_f = 10^\circ$, $20^\circ$ and $30^\circ$. It then falls to about $0.90\,V_\infty$ near the flap trailing edge, an off-surface pressure rise of $\Delta C_p \approx 0.9$, $1.4$ and $2.1$. The wake must survive this pressure rise *away from any wall*, and the required recovery grows rapidly with deflection. An XFOIL-type model treats wakes only as thin shear layers along their own streamline. It has no mechanism for one wake to interact with another body's boundary layer, and no off-surface reversed-flow state. It cannot predict whether the wake bursts.

## The Slat Effect

The same code was applied to a leading-edge slat: a 15 % chord NACA 4412 element ahead of the main NACA 4412, drooped $25^\circ$, with a 2.2 % chord gap between its trailing edge and the main upper surface. Fig. {f:slat} shows the result. At $\alpha = 12^\circ$, the isolated main element has a suction peak of $C_{p,min} = -7.7$. With the slat it is only $-2.1$, and at $\alpha = 20^\circ$ the reduction is from $-20.6$ to $-3.2$. The slat *reduces* the main element's own lift (1.53 against 1.94 at $12^\circ$) while carrying 0.50 itself, so the total rises only 5 % at a given angle. Its benefit is the much milder pressure recovery it leaves for the main-element boundary layer, which lets the system reach far higher angles before separation. Here the inviscid method shows the mechanism clearly but cannot show the benefit itself. Stall delay, and therefore $C_{l,max}$, can only come from a viscous calculation.

![Fig. {f:slat}. Slat effect from the inviscid multi-element panel method: geometry (top left), pressure distribution at α = 12° compared with the isolated main element (top right), and main-element suction peak and lift against angle of attack with and without the slat (bottom). [wide]](fig/f18_slat)

## What the Viscous Part Requires

Coupled methods for multi-element airfoils have existed since the 1970s. Olson's method treated up to four elements with merging confluent boundary layers [#olson76]. Dvorak, Woodward and Maskew extended viscous–potential interaction to three-dimensional multi-element wings with a dedicated confluent-boundary-layer model [#dvorak77]. Cebeci's interactive boundary-layer method handled flap wells and co-flowing regions [#cebeci93]. MSES replaces the panel method by an Euler solver on a streamline grid, so the slot and the wake trajectories are part of the solution. It couples the same integral boundary layers as XFOIL through the global Newton method [#mses]. NASA's conceptual-design high-lift methodology uses exactly this hierarchy. It applies a panel method with integral boundary layers to single-element sections and MSES to multi-element ones [#olson15].

Three requirements separate these methods from a simple extension of XFOIL:

1. **Wake trajectories must be solved for.** In XFOIL the wake follows the inviscid streamline from the trailing edge. That is adequate for one element, but on a multi-element airfoil the main wake passes close to the flap, and its position determines both the flap's loading and its own deceleration. A panel method can iterate the wake position (relaxed-wake methods do this), but it is not part of XFOIL's Newton system.
2. **Confluence needs a different profile family.** A wake merging with a wall layer produces a velocity profile with an inner wall layer and an outer wake deficit. That two-parameter shape lies outside the Falkner–Skan/Swafford families behind ({e:hsl})–({e:cteq}). Confluent models must either carry extra integral variables or switch to a multi-layer description [#olson76], [#dvorak77].
3. **Off-surface reversal must be representable.** Wake bursting is a separated free shear layer. Integral wake equations with $H_k$ clipped near 1 ({e:rlx}) cannot represent it. Volume-grid RANS can, although with known sensitivity to turbulence and transition models [#langtry].

## Verdict

A panel method is *sufficient* for the inviscid part of the multi-element problem. It is fast, it captures every one of Smith's favourable effects, and it is the natural engine for early sizing of gap, overlap and deflection. Paired with a simple separation criterion such as Stratford's, a panel code has been shown to be a fast and reasonably accurate screen for high-lift configurations in preliminary design [#martinez22]. A panel method with XFOIL-style integral boundary layers is *useful* for single-element-like questions on multi-element sections: transition on each element, attached-flow drag, and the onset of trailing-edge separation on the flap. It is *not sufficient* for maximum lift, optimum gap, or any condition where the main wake approaches the flap surface or bursts. Those require at least an MSES-class method with solved wake trajectories, and for final design and $C_{l,max}$, RANS validated against wind-tunnel data. Table {t:hier} summarises this hierarchy.

: TABLE {t:hier}. Suitability of method classes for multi-element airfoil questions. [wide]

| Question | Panel (inviscid) | Panel + IBL (XFOIL-type, extended) | Euler + IBL (MSES) | RANS |
|:---|:---|:---|:---|:---|
| Load split, circulation and dumping effects | Good | Good | Good | Good |
| Gap/overlap trends at moderate $\delta_f$ | Qualitative | Fair | Good | Good |
| Transition and attached-flow drag per element | No | Good | Good | Model-dependent |
| Optimum gap (confluence) | No | Poor | Fair | Good |
| Wake bursting, $C_{l,max}$ | No | No | Fair (to just past stall) | Fair–good, model-dependent |
| Cost per point | ms | 0.1 s | seconds | minutes–hours |
