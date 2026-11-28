# The XROTOR Formulation

This section states the equations that XROTOR 7.55 solves, in the notation of the code. Lengths are scaled by the tip radius $R$, velocities by the flight speed $V$, circulation by $VR$, thrust by $\rho V^2R^2$ and power by $\rho V^3R^2$. The routine that implements each part is named in brackets.

## Blade Discretisation and Velocity Triangle

Each blade is a lifting line divided into $N$ panels (default 30, at most 100). Panel edges $\xi_{v,j}$ and control points $\xi_i$ follow a sine spacing that crowds points toward the tip and, optionally, a cosine spacing that also crowds them at the root [SETX]:
$$
\begin{aligned}&\xi_{v,j} = \sqrt{\sin^2 t_j + \xi_0^2\cos^2 t_j},\qquad t_j=\frac{\pi j}{2N},\\ &\xi_i=\tfrac12(\xi_{v,i-1}+\xi_{v,i}).\end{aligned}
\tag{e:setx}
$$
Here $\xi_0$ is the hub radius. Chord, blade angle and the axial perturbation $u_b$ of a nacelle are splined from the input stations onto the control points. At each station the relative velocity has tangential and axial components [CSCALC]
$$
W_t = \frac{\xi}{\lambda} - v_t - w_t,\qquad W_a = 1 + u_d + u_b + w_a + v_a\,(1+v_d),
\tag{e:triangle}
$$
with $W=\sqrt{W_t^2+W_a^2}$, inflow angle $\phi=\arctan(W_a/W_t)$ and angle of attack $\alpha=\beta+\Delta\beta-\phi$. Here $\lambda=V/(\Omega R)$, $v_a$ and $v_t$ are the self-induced velocities, $w_a$ and $w_t$ are optional prescribed slipstream velocities, and $u_d$, $v_d$ are the duct terms of Section III-F ($u_d=v_d=0$ for a free-tip rotor).

## Circulation and Section Forces

The unknowns are the bound circulations $\Gamma_i$ of one blade. They are tied to the section lift by Kutta–Joukowski, which XROTOR writes as a residual [APITER]:
$$
R_i \equiv c_i\,W_i\,c_l(\alpha_i, M_i)\;-\;2\Gamma_i = 0,\qquad i=1\ldots N.
\tag{e:gamcl}
$$
Thrust and power are summed over the stations. The inviscid parts on the real blade are [TPQ]
$$
T_{inv}=B\sum_i \Gamma_i W_{t,i}\,\Delta\xi_i,\qquad P_{inv}=B\sum_i \Gamma_i W_{a,i}\,\frac{\xi_i}{\lambda}\,\Delta\xi_i,
\tag{e:tinv}
$$
and the profile-drag parts are
$$
\begin{aligned}T_{v}&=-B\sum_i \tfrac12 W_i c_i c_{d,i} W_{a,i}\,\Delta\xi_i,\\ P_{v}&=B\sum_i \tfrac12 W_i c_i c_{d,i} W_{t,i}\,\frac{\xi_i}{\lambda}\,\Delta\xi_i.\end{aligned}
\tag{e:tvis}
$$
The reported totals use the "equivalent propeller" for the inviscid part, $T=T_w+T_v$ and $P=P_w+P_v$ (Section III-E). Torque is $Q=P\lambda$ in units of $\rho V^2R^3$, and the efficiency is $\eta=T/P$.

## Induced Velocity: Three Wake Models

The induced velocities are linear in the circulations, $v_{t,i}=\sum_j A_{ij}(\lambda_w)\,\Gamma_j$, through an influence matrix that depends only on the wake advance ratio $\lambda_w$ [VCALC]. In all three models the axial component follows from the swirl by the helix kinematics of the trailing sheet:
$$
v_{a,i} = v_{t,i}\,\frac{\xi_i}{\lambda_w}.
\tag{e:va}
$$
The user chooses one of three ways to form $A_{ij}$.

**Graded momentum (GRAD)** [GRADMO]. Each annulus is treated independently, with Prandtl's factor for a finite number of blades:
$$
\begin{aligned}&A_{ii}=\frac{B}{4\pi F_i\,\xi_i},\qquad F_i=\frac{2}{\pi}\arccos e^{-f_i},\\ &f_i=\frac{B}{2}\Big(1-\frac{\xi_i}{\xi_{tip}}\Big)\sqrt{1+\frac{1}{\lambda_w^2}},\end{aligned}
\tag{e:gradmo}
$$
and $A_{ij}=0$ for $i\neq j$. The matrix is diagonal, so the method is very cheap. The user guide warns that it is not suitable for advance ratios above about 0.5 [#xrotordoc].

**Potential formulation (POT, default)** [HELICO]. The perturbation potential of a rigid helicoidal wake with $B$ sheets is expanded in Fourier harmonics around the azimuth. For each even harmonic number $n=2,4,\ldots,N_n$ ($N_n=128$) the radial amplitude $A_n(\xi)$ satisfies a modified Bessel equation,
$$
\begin{aligned}&\frac{d}{d\xi}\Big(\xi\frac{dA_n}{d\xi}\Big) - n^2K(\xi)\,A_n = n^2K(\xi)\,\Gamma(\xi),\\ &K=\Big(\frac{B}{2}\Big)^2\Big(\frac1\xi+\frac{\xi}{\lambda_w^2}\Big),\end{aligned}
\tag{e:helico}
$$
with $dA_n/d\xi=0$ at the hub, $A_n=0$ at $\xi=4$ for a free tip and $dA_n/d\xi=0$ at the casing for a duct. Each equation is discretised by finite differences on the control points (with mirrored and stretched points outside the tip) and solved as a tridiagonal system for all columns of $A_{ij}$ at once. The swirl at the blade is then assembled as
$$
v_{t,i}=\frac{B}{2\pi\xi_i}\Big[\sum_{n}\big(A_n(\xi_i)+\Gamma_i\big)+\tfrac12\Gamma_i\Big],
\tag{e:swirl}
$$
where the half-circulation term is the "sawtooth" self-influence and the tail of the series beyond $N_n$ is added by assuming that $A_n+\Gamma$ decays as $n^{-2}$ up to $4N_n$. The hub condition makes the hub a solid, infinitely long cylinder. That is how the formulation "treats finite radius rotor hubs" [#xrotordoc], and Section V-B shows its large effect on the root swirl.

**Discrete vortex wake (VRTX)** [VRTXCO]. Each of the $N+1$ trailing legs is a rigid helix of pitch $\lambda_w$ starting at $\xi_{v,j}$, $x=\lambda_w\theta$, $(y,z)=\xi_{v,j}(\cos\theta_k,\sin\theta_k)$ with $\theta_k=\theta+2\pi k/B$. It is cut into straight segments, with angular steps growing from $\pi/60$ near the blade to $\pi/8$ far downstream, and truncated 50 radii aft. The velocity of each segment comes from the Biot–Savart formula for a straight vortex of unit strength [VORSEGVEL]:
$$
\mathbf u=\frac{1}{4\pi}\,\frac{(\mathbf a\times\mathbf b)\,(1/|\mathbf a|+1/|\mathbf b|)}{|\mathbf a||\mathbf b|+\mathbf a\cdot\mathbf b},
\tag{e:biot}
$$
where $\mathbf a$ and $\mathbf b$ run from the control point to the segment ends. This model was added for raked blades [#xrotordoc]. It has no hub cylinder, so the root vortex trails freely.

## Wake Pitch: the Self-Deforming Wake

In light-loading theory the sheets trail at the blade's own advance ratio, $\lambda_w=\lambda$. XROTOR's default "self-deforming" wake instead sets the sheet pitch from the induced efficiency, following Theodorsen [#theodorsen48], [#xrotordoc]:
$$
\lambda_w\,\frac{T_w}{P_w}=\lambda\quad\Longleftrightarrow\quad\lambda_w=\frac{\lambda}{\eta_i}.
\tag{e:adw}
$$
The guide notes that this makes the method consistent with the actuator disk at zero advance ratio and zero profile drag. The wake still neither contracts nor rolls up. With the WAKE toggle off ("rigid" wake), $\lambda_w$ is frozen at its initial value (Section V-D).

## The Equivalent Propeller

To handle a nacelle, a duct or a prescribed slipstream, XROTOR maps the real blade onto an *equivalent* free propeller in uniform flow [SETXW]. For each station the equivalent radius $\xi_w$ is found by matching the axial mass flux through the annulus and the angular momentum:
$$
\begin{aligned}&W_{a,w}\,\xi_w\,\Delta\xi_w = W_a\,\xi\,\Delta\xi,\qquad V_w\,\xi_w = v_t\,\xi,\\ &W_{a,w}=u_r + V_w\,\frac{\xi_w}{\lambda_w},\end{aligned}
\tag{e:setxw}
$$
solved by a local Newton iteration. The equivalent propeller then supplies the inviscid thrust and power used in the totals and in the wake equation ({e:adw}):
$$
T_w=B\sum_i\Gamma_i\Big(\frac{\xi_{w,i}}{\lambda}-V_{w,i}\Big)\Delta\xi_{w,i},\qquad P_w=P_{inv}.
\tag{e:tw}
$$
For an open rotor without a nacelle $T_w$ and $T_{inv}$ should agree closely; Section V-D tests this.

## Duct Model

A duct is represented only by a velocity ratio $u_r$ (VRAT) between the flow at the rotor disk and the free stream. This sets $u_d=u_r-1$ and $1+v_d=2u_r$ in ({e:triangle}), and switches the outer boundary of ({e:helico}) to a solid casing. In GRAD and VRTX it reduces the influence to the mean swirl $B\Gamma/(4\pi\xi)$. Duct thrust, losses and the distribution of the duct-induced velocity are not modelled; DFDC was written to do this [#dfdc05].

## Section Aerodynamics

XROTOR does not read airfoil polars. Each of up to 20 radial sections is described by 13 numbers, between which lift and drag are interpolated linearly [GETCLCDCM]. The lift coefficient is a Prandtl–Glauert-scaled straight line, blended smoothly into a stalled slope by a soft limiter [CLCDCM]:
$$
\begin{aligned}&c_{l} = c_{l,a}-(1-f_s)\,\Delta c_s\ln\frac{1+e^{(c_{l,a}-c_{l,max})/\Delta c_s}}{1+e^{(c_{l,min}-c_{l,a})/\Delta c_s}},\\ &c_{l,a}=\frac{a_0(\alpha-\alpha_0)}{\sqrt{1-M^2}},\end{aligned}
\tag{e:cl}
$$
where $f_s$ is the ratio of the post-stall to the attached lift-curve slope and $\Delta c_s$ the width of the stall transition. The drag coefficient is
$$
\begin{aligned}c_d={}&\big[c_{d,min}+k\,(c_l-c_{l,d})^2\big]\Big(\frac{Re}{Re_{ref}}\Big)^{e}\\ &+2\Big[\frac{(1-f_s)\,c_{l,lim}}{a_0/\sqrt{1-M^2}}\Big]^2+10\,(M-M_{cr,e})^3_+,\end{aligned}
\tag{e:cd}
$$
with $M_{cr,e}=M_{cr}-0.25\,|c_l-c_{l,d}|-0.0585$. Here $c_{l,lim}$ is the logarithmic limiter term of ({e:cl}). The three drag terms are a parabolic polar scaled by Reynolds number, a stall drag that grows with the lift lost to the limiter, and a cubic drag rise above an effective critical Mach number. Near and above $M_{cr}$, $c_{l,max}$ and $c_{l,min}$ are also reduced. The pitching moment is a constant scaled by Prandtl–Glauert. Fig. {f:aero} compares the model, fitted to a Clark-Y table at $Re=10^6$, with the table itself.

![Fig. {f:aero}. XROTOR section model fitted to a tabulated Clark-Y polar at $Re = 10^6$: lift curve (left), drag polar (centre) and the built-in drag rise for three lift coefficients with $M_{cr} = 0.70$ (right). The model holds $c_l$ at $c_{l,max}$ after stall instead of letting it fall. [wide]](fig/f04_aero)

## Analysis: the Global Newton System

For an operating point XROTOR solves $N+3$ equations for $\Gamma_1\ldots\Gamma_N$, $\lambda$, $\lambda_w$ and a uniform pitch change $\Delta\beta$ [APITER]. These are the $N$ residuals ({e:gamcl}), one specification equation (thrust, torque, power, advance ratio or an engine power–speed line), the wake equation ({e:adw}) and one constraint (fixed speed or fixed pitch). The Jacobian is formed analytically. Every routine carries the partial derivatives of its outputs, for example $\partial W/\partial v_t$, $\partial c_l/\partial\alpha$ and $\partial T_w/\partial\lambda_w$, and the system is solved by Gaussian elimination [GAUSS]. The update is relaxed by a factor $\omega$, which is

* 0.2 on the first two iterations;
* reduced so that no section changes $c_l$ by more than a limit of 0.01–0.5 that tightens near $c_{l,max}$ and $c_{l,min}$;
* reduced to 0.2 if any $\Delta\Gamma_i$ reverses sign and exceeds 20 % of its previous value;
* limited so that $|\Delta\beta|\le0.05$ rad and $\lambda$, $\lambda_w$ change by at most +50 % / −30 %.

If $\omega<0.2$, the circulation is smoothed by an implicit filter over $0.2N$ stations [FILTER]. Convergence is declared when the r.m.s. circulation change, weighted by $1/(1+\lambda^{-2})$, falls below $10^{-7}$; the limit is 40 iterations. The initial guess [APINIT] takes $\Gamma$ from the blade angles without induction and then performs ten graded-momentum sweeps that also update $\lambda_w$ from momentum theory. Fig. {f:flow} summarises the procedure.

![Fig. {f:flow}. Solution procedure of the XROTOR OPER command (routines APER, APINIT and APITER in xoper.f).](fig/f02_flow)

## Design: Minimum Induced Loss

For design [DESGEN, DESINI, DEITER] the user fixes the radius, hub, speed, rotation rate, number of blades, thrust or power and a design $c_l$ distribution. The unknowns are $\Gamma_i$, the inverse induced efficiency $\eta_i^{-1}$ and $\lambda_w$. The Betz condition is imposed on the equivalent propeller at every station,
$$
\frac{W_{a,w,i}}{W_{t,w,i}}\,\frac{\xi_i}{\lambda}=\eta_i^{-1},\qquad i=1\ldots N,
\tag{e:betz}
$$
that is, $\xi\tan\phi_w$ is the same at all radii, together with the thrust or power equation and the wake equation ({e:adw}). Chord and blade angle then follow from $c_i=2\Gamma_i/(W_ic_{l,i})$ and $\beta_i=\phi_i+\alpha(c_{l,i})$, where $\alpha(c_l)$ is found by inverting ({e:cl}) [GETALF]. The iteration starts from Larrabee's closed-form design with the Prandtl factor [#larrabee79]. When POT is selected, this is followed by a Goldstein distribution obtained from one solve with $A_{ij}$. For a ducted rotor, ({e:betz}) is replaced by constant circulation (a free-vortex rotor), as of version 7.52. The same machinery optimises the twist of an existing planform (MODI/OPTI) and designs windmills with negative thrust or power.

## Other Modules

BEND solves a non-linear beam for each blade under aerodynamic and centrifugal loads and can correct the blade angles for elastic twist. NOIS computes the acoustic pressure history at chosen observer positions from rotating loading (near and far field) and thickness sources, with its harmonics and a ground decibel footprint, and JMAP produces the classical $C_P$–$J$ map with efficiency and blade-angle contours. These modules use the converged circulation but do not feed back into the aerodynamic solution, except for the optional twist correction. They are outside the scope of the numerical tests below.
