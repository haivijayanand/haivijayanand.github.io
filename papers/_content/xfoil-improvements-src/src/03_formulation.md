# The XFOIL Formulation: Governing Equations

This section sets out the complete equation set that XFOIL 6.99 solves. The notation follows [#drela89], [#drela87] and the source code of version 6.99 (files `xpanel.f`, `xblsys.f`, `xbl.f` and `xsolve.f`), from which every constant below has been checked. Fidkowski's re-derivation [#fidkowski22] uses the same models and is a useful companion. The equations are needed later, because almost every improvement proposed in Section VI is a change to one identifiable part of this system.

## Inviscid Flow: Linear-Vorticity Stream-Function Panel Method

The airfoil surface is discretised into $N$ nodes $(x_i, y_i)$ ordered from the upper trailing edge, round the leading edge, to the lower trailing edge. Each panel carries a vortex sheet whose strength $\gamma$ varies linearly between nodes, and (for the viscous solution) a constant-strength source sheet $\sigma$. The wake is a further $N_w$ panels carrying source only. The stream function at any field point is

$$\begin{aligned}\Psi(x,y) ={}& u_\infty y - v_\infty x + \frac{1}{2\pi}\oint \gamma(s)\,\ln r(s;x,y)\,ds\\ &+ \frac{1}{2\pi}\int \sigma(s)\,\theta(s;x,y)\,ds\end{aligned} \tag{e:psi}$$

where $u_\infty = Q_\infty\cos\alpha$, $v_\infty = Q_\infty\sin\alpha$, and $r$ and $\theta$ are the distance and angle from the sheet element to the field point. The surface is made a streamline by requiring the stream function at every node to equal a single unknown constant $\Psi_0$:

$$\begin{aligned}\sum_{j=1}^{N} a_{ij}\gamma_j - \Psi_0 ={}& -u_\infty y_i + v_\infty x_i - \sum_{j=1}^{N+N_w-1} b_{ij}\sigma_j ,\\ & i = 1,\dots,N\end{aligned} \tag{e:panel}$$

The influence coefficients follow in closed form. For the panel from node $j$ to node $j+1$, let the field point have coordinates $(x_1, \bar y)$ in a frame aligned with the panel and centred on node $j$, and $(x_2, \bar y)$ in the same frame centred on node $j+1$. With $r_k^2 = x_k^2 + \bar y^2$, $g_k = \ln r_k^2$ and $t_k = \operatorname{atan2}(\bar y, x_k)$, the vortex panel contributes

$$\Psi_j = \frac{1}{4\pi}\Big[(\gamma_j + \gamma_{j+1})\,\Psi^{+} + (\gamma_{j+1} - \gamma_j)\,\Psi^{-}\Big] , \tag{e:psilin}$$

$$\begin{aligned}\Psi^{+} &= \tfrac12 x_1 g_1 - \tfrac12 x_2 g_2 + x_2 - x_1 + \bar y\,(t_1 - t_2),\\ \Psi^{-} &= \frac{(x_1 + x_2)\Psi^{+} + \tfrac12\left(r_2^2 g_2 - r_1^2 g_1 + x_1^2 - x_2^2\right)}{x_1 - x_2} .\end{aligned}$$

$\Psi^{+}$ is the stream function of a uniform sheet and $\Psi^{-}$ that of the linearly varying part. The source panels have analogous expressions (each split into two half-panels with linear variation), XFOIL also codes the derivatives of these expressions analytically to obtain velocities. Extending that hand-differentiation to the node coordinates is the main step needed for the geometric sensitivities discussed in Section VI-C.

The Kutta condition closes the system:

$$\gamma_1 + \gamma_N = 0 . \tag{e:kutta}$$

For a finite-thickness (blunt) trailing edge, the gap between nodes $N$ and $1$ is closed by a panel carrying both source and vorticity whose strengths are set from $\gamma_1$ and $\gamma_N$ and the bisector geometry. For a sharp trailing edge, the equation at node $N$ is redundant. Since version 6.9 it has been replaced by the requirement that the velocity component along the bisector vanishes at an internal point one-tenth of the smallest panel length ahead of the trailing edge [#xfoildoc]. That change removed a long-standing source of noise in sharp-trailing-edge solutions.

Because $a_{ij}$ depends only on geometry, the $(N+1)\times(N+1)$ system ({e:panel})–({e:kutta}) is factorised once. Solutions for $\alpha = 0^\circ$ and $90^\circ$ are superposed for any other angle:

$$\gamma_i(\alpha) = \gamma_{0,i}\cos\alpha + \gamma_{90,i}\sin\alpha . \tag{e:super}$$

The surface speed is $q_i = \gamma_i$, and the lift and moment follow by integrating the surface pressure.

## Compressibility Correction

XFOIL applies the Kármán–Tsien correction to the incompressible surface speeds [#tsien]. With $\beta = \sqrt{1-M_\infty^2}$ and $\lambda = M_\infty^2/(1+\beta)^2$,

$$\begin{aligned} q &= \frac{q_{inc}\,(1-\lambda)}{1-\lambda\left(q_{inc}/Q_\infty\right)^2},\\ C_p &= \frac{C_{p,inc}}{\beta + \lambda(1+\beta)\,C_{p,inc}/2} .\end{aligned} \tag{e:kt}$$

The correction is valid only while the flow is everywhere subsonic. It becomes singular as the local speed approaches sonic, and Section V-H quantifies where it breaks down.

## Viscous–Inviscid Coupling Through the Mass Defect

The viscous layer displaces the outer flow. XFOIL represents this by wall transpiration, using source strengths equal to the streamwise gradient of the mass defect

$$m = u_e\,\delta^* , \qquad \sigma = \frac{dm}{d\xi} , \tag{e:mass}$$

where $\xi$ is arc length from the stagnation point and $u_e$ the edge velocity. Since ({e:panel}) is linear in $\sigma$, the edge velocity at every boundary-layer node is an explicit linear function of the mass defect at every node on the airfoil *and wake*:

$$u_{e,i} = u_{e,i}^{inv} + \sum_{j=1}^{N+N_w} D_{ij}\, m_j . \tag{e:dij}$$

The mass-influence matrix $D_{ij}$ is computed once per geometry. Equation ({e:dij}) is the heart of XFOIL's robustness. It lets the boundary-layer and inviscid problems be solved *simultaneously* by a single Newton method, rather than iterated in turn, which converged poorly near separation in earlier "direct" and "inverse" coupling schemes [#drela87], [#veldman].

## Integral Boundary-Layer Equations

Each surface, and the single wake, is described by three ordinary differential equations in $\xi$. The **von Kármán momentum integral equation** is

$$\frac{\xi}{\theta}\frac{d\theta}{d\xi} + \left(2 + H - M_e^2\right)\frac{\xi}{u_e}\frac{du_e}{d\xi} = \frac{\xi}{\theta}\,\frac{C_f}{2} . \tag{e:mom}$$

The **kinetic-energy (shape-parameter) equation** is obtained by combining the kinetic-energy integral with ({e:mom}):

$$\begin{aligned}\frac{\xi}{H^*}\frac{dH^*}{d\xi} &+ \left(\frac{2H^{**}}{H^*} + 1 - H\right)\frac{\xi}{u_e}\frac{du_e}{d\xi}\\ &= \frac{\xi}{\theta}\left(\frac{2C_D}{H^*} - \frac{C_f}{2}\right) .\end{aligned} \tag{e:ke}$$

Here $\theta$, $\delta^*$ and $\theta^*$ are the momentum, displacement and kinetic-energy thicknesses. $H = \delta^*/\theta$ and $H^* = \theta^*/\theta$ are shape parameters, $H^{**} = \delta^{**}/\theta$ is the density-flux shape parameter, $C_f$ the skin-friction coefficient and $C_D$ the dissipation coefficient. The third equation depends on the state of the layer. In **laminar** flow it is the **amplification equation** for the envelope of Tollmien–Schlichting wave growth

$$\frac{d\tilde n}{d\xi} = \frac{d\tilde n}{d\xi}\left(H_k, \theta, Re_\theta\right) . \tag{e:amp}$$

In **turbulent** flow and in the wake it is the **shear-lag equation**, which carries the maximum shear-stress coefficient $C_\tau$ as a lagged response to its equilibrium value, after Green's lag-entrainment method [#green]:

$$\begin{aligned}\frac{2\delta}{\sqrt{C_\tau}}\frac{d\sqrt{C_\tau}}{d\xi} ={}& \frac{K_C}{G_B\,(1+U_s)}\left(\sqrt{C_{\tau,eq}} - \lambda_D\sqrt{C_\tau}\right)\\ &+ 2\delta\left(u_q - \frac{1}{u_e}\frac{du_e}{d\xi}\right) .\end{aligned} \tag{e:lag}$$

The constants are $K_C = 5.6$ and $G_B = 0.75$. The dissipation-length factor is $\lambda_D = 1$ on the airfoil and $0.9$ in the wake. The equilibrium-gradient term is

$$u_q = \frac{1}{G_B\,\delta^*}\left[\frac{C_f}{2} - \left(\frac{H_k - 1 - G_C/Re_\theta}{G_A\,\lambda_D\,H_k}\right)^{2}\right] , \tag{e:uq}$$

with $G_A = 6.7$, and $G_C = 18$ on the airfoil and $0$ in the wake. XFOIL 6.99 added a `LAG` command that lets the user change $K_C$ and $\lambda_D$ [#xfoildoc]. That is the only closure constant exposed to the user.

The equations are discretised between adjacent nodes "1" and "2" with logarithmic differences. For example, the momentum residual is

$$\begin{aligned}R_\theta = \ln\frac{\theta_2}{\theta_1} &+ \left(2 + \bar H - \bar M_e^2\right)\ln\frac{u_{e2}}{u_{e1}}\\ &- \frac{\bar\xi}{\bar\theta}\,\frac{\bar C_f}{2}\,\ln\frac{\xi_2}{\xi_1} = 0 ,\end{aligned} \tag{e:disc}$$

where overbars denote interval averages. In regions of rapid change (typically just after transition), XFOIL automatically biases these averages towards the downstream node. This adds the minimum upwinding needed to suppress the oscillations that the second-order trapezoidal scheme otherwise produces [#xfoildoc].

## Closure Relations

The kinematic shape parameter $H_k$ removes the density-profile effect from $H$, and $H^{**}$ follows from it:

$$\begin{aligned} H_k &= \frac{H - 0.29M_e^2}{1 + 0.113M_e^2},\\ H^{**} &= \left(\frac{0.064}{H_k - 0.8} + 0.251\right)M_e^2 .\end{aligned} \tag{e:hk}$$

**Laminar closures** are fits to the Falkner–Skan profile family [#drela87]. With $\tilde H = H_k - 4.35$,

$$H^* = 1.528 + \begin{cases} \dfrac{0.0111\tilde H^2 - 0.0278\tilde H^3}{H_k + 1}\\ \quad - 0.0002\left(\tilde H H_k\right)^2, & H_k < 4.35,\\[2mm] 0.015\,\tilde H^2/H_k, & H_k \ge 4.35, \end{cases} \tag{e:hsl}$$

$$Re_\theta\, C_f = \begin{cases} 0.0727\,\dfrac{(5.5 - H_k)^3}{H_k + 1} - 0.07, & H_k < 5.5,\\[2mm] 0.015\left(1 - \dfrac{1}{H_k - 4.5}\right)^2 - 0.07, & H_k \ge 5.5, \end{cases} \tag{e:cfl}$$

$$Re_\theta\,\frac{2C_D}{H^*} = \begin{cases} 0.00205\,(4 - H_k)^{5.5} + 0.207, & H_k < 4,\\[2mm] 0.207 - \dfrac{0.0016\,(H_k - 4)^2}{1 + 0.02\,(H_k - 4)^2}, & H_k \ge 4. \end{cases} \tag{e:dil}$$

**Turbulent closures** are fits to Swafford's velocity profiles and to equilibrium-layer data. The skin friction is

$$\begin{aligned} F_c\,C_f ={}& 0.3\,e^{-1.33H_k}\left(\frac{\ln(Re_\theta/F_c)}{\ln 10}\right)^{-1.74 - 0.31H_k}\\ &+ 1.1\times10^{-4}\left[\tanh\!\left(4 - \frac{H_k}{0.875}\right) - 1\right] ,\end{aligned} \tag{e:cft}$$

with $F_c = \sqrt{1 + \tfrac12(\gamma-1)M_e^2}$. The kinetic-energy shape parameter is defined about $H_0 = \min(3 + 400/Re_\theta,\ 4)$, with $Re_z = \max(Re_\theta, 200)$:

$$\begin{aligned} H^*_{inc} ={}& 1.5 + \frac{4}{Re_z} + \left(0.5 - \frac{4}{Re_z}\right)\left(\frac{H_0 - H_k}{H_0 - 1}\right)^2\frac{1.5}{H_k + 0.5}, && H_k < H_0,\\ H^*_{inc} ={}& 1.5 + \frac{4}{Re_z} + (H_k - H_0)^2\\ &\times\left[\frac{0.007\ln Re_z}{\left(H_k - H_0 + 4/\ln Re_z\right)^2} + \frac{0.015}{H_k}\right], && H_k \ge H_0,\end{aligned} \tag{e:hst}$$

and $H^* = (H^*_{inc} + 0.028M_e^2)/(1 + 0.014M_e^2)$. The turbulent dissipation is the sum of a wall-layer part, an outer-layer part driven by the lagged shear stress, and a small laminar-stress part:

$$\begin{aligned} C_D ={}& \frac{C_f}{2}U_s\,\frac{1+\tanh\!\left(\frac{H_k-1}{H_{min}-1}\right)}{2}\\ &+ C_\tau\left(0.995 - U_s\right) + \frac{0.15\,(0.995 - U_s)^2}{Re_\theta} ,\end{aligned} \tag{e:dit}$$

with $H_{min} = 1 + 2.1/\ln Re_\theta$. The wall term is omitted in the wake. In both cases the result is not allowed to fall below the laminar value. The normalised wall slip velocity and the equilibrium shear stress are

$$\begin{aligned} U_s &= \frac{H^*}{2}\left(1 - \frac{H_k - 1}{G_B H}\right),\\ C_{\tau,eq} &= \frac{H^*}{2G_A^2G_B}\,\frac{(H_k - 1)\left(H_k - 1 - G_C/Re_\theta\right)^2}{(1 - U_s)\,H\,H_k^2} ,\end{aligned} \tag{e:cteq}$$

with $U_s \le 0.98$ on the airfoil and $U_s \le 0.99995$ in the wake. The boundary-layer thickness used in ({e:lag}) is $\delta = \min\left[(3.15 + 1.72/(H_k - 1))\,\theta + \delta^*,\ 12\theta\right]$. In the wake $C_f = 0$, and the wake thickness includes the trailing-edge gap, decaying downstream over about $2.5$ gap heights for a blunt trailing edge [#drela89te].

## Transition: the Simplified $e^N$ Envelope Method

Transition is predicted by integrating ({e:amp}) from the instability point. XFOIL does not track individual frequencies. Instead, it uses an envelope of the Orr–Sommerfeld amplification curves of the Falkner–Skan family, expressed in terms of $H_k$ and $Re_\theta$ only [#drela87]. With $\hat h = 1/(H_k - 1)$, the critical (instability) Reynolds number is

$$\log_{10}Re_{\theta,0} = 2.492\,\hat h^{0.43} + 0.7\left[\tanh\left(14\hat h - 9.24\right) + 1\right] , \tag{e:recrit}$$

and the amplification rate above it is

$$\begin{aligned}\frac{d\tilde n}{d\xi} ={}& \frac{r}{\theta}\left[0.028(H_k - 1) - 0.0345\,e^{-(3.87\hat h - 2.52)^2}\right]\\ &\times\left[-0.05 + 2.7\hat h - 5.5\hat h^2 + 3\hat h^3\right] ,\end{aligned} \tag{e:dndx}$$

where $r$ is a cubic ramp from 0 to 1 across $\log_{10}Re_\theta = \log_{10}Re_{\theta,0} \pm 0.08$. The first bracket is the envelope slope $d\tilde n/dRe_\theta$ and the second is $\tfrac12\,\theta\,(dRe_\theta/d\xi)$ re-expressed through the Falkner–Skan relations. Transition occurs where $\tilde n$ reaches the user-set $N_{crit}$. It is located to sub-interval accuracy, and the transition interval is split into laminar and turbulent parts whose residuals are summed. The shear stress then starts from

$$\sqrt{C_{\tau,tr}} = 1.8\,\exp\!\left(-\frac{3.3}{H_k - 1}\right)\sqrt{C_{\tau,eq}} . \tag{e:ctr}$$

Mack's correlation [#mack] links $N_{crit}$ to the free-stream turbulence intensity $Tu$ (as a fraction):

$$N_{crit} = -8.43 - 2.4\ln Tu , \tag{e:mack}$$

so $N_{crit} = 9$ corresponds to $Tu \approx 0.07\,\%$. The user guide suggests 12–14 for sailplanes, 10–12 for a clean wind tunnel, 9 for an average tunnel and 4–8 for a "dirty" one [#xfoildoc].

## Drag

Profile drag is taken from the far-wake momentum deficit, extrapolated from the last wake station by the Squire–Young formula [#squire]:

$$C_d = 2\,\theta_{w}\left(\frac{u_{e,w}}{Q_\infty}\right)^{(5 + H_w)/2} . \tag{e:sy}$$

Friction drag $C_{d,f}$ is integrated from $C_f$, and pressure drag is the difference $C_{d,p} = C_d - C_{d,f}$.

## The Global Newton System

At each boundary-layer station $i$ the unknowns are $(\tilde n \text{ or } \sqrt{C_\tau},\ \theta,\ m)_i$. The edge velocity is eliminated through ({e:dij}). The three residuals ({e:mom}), ({e:ke}) and ({e:amp}) or ({e:lag}) at all $N_{BL}$ stations form a system of $3N_{BL}$ nonlinear equations. One more unknown is the angle of attack (when $C_L$ is prescribed) or the Reynolds number (for "type 2" fixed-lift polars). Linearising gives

$$\begin{bmatrix} A_1 & & & \\ B_2 & A_2 & & \\ & \ddots & \ddots & \\ & & B_n & A_n \end{bmatrix}\delta\mathbf{U} + \mathbf{D}\,\delta\mathbf{m} = -\mathbf{R} , \tag{e:newton}$$

where $A_i$ and $B_i$ are $3\times3$ blocks from the local differencing, and the dense columns $\mathbf{D}$ carry the mass-defect influence of every station on every other. A special block couples the two trailing-edge stations to the first wake station. The custom solver `BLSOLV` performs block Gaussian elimination that exploits this structure. Mass-influence entries smaller than a threshold `VACCEL` (default 0.01) are dropped during elimination to save work. That speeds up each iteration but makes the Newton step approximate.

The Newton update is under-relaxed by a single global factor $\omega \le 1$, chosen so that no normalised change exceeds fixed bounds:

$$\omega\,\frac{\Delta\theta}{\theta},\ \omega\,\frac{\Delta\delta^*}{\delta^*},\ \omega\,\frac{\Delta C_\tau}{C_\tau},\ \omega\,\frac{\Delta\tilde n}{10},\ \omega\,\frac{|\Delta u_e|}{0.25} \in [-0.5,\ 1.5] , \tag{e:rlx}$$

and with limits of $\pm0.5$ on the change in $C_L$, or $\pm0.5^\circ$ on the change in $\alpha$, per iteration. After the update, $H_k$ is clipped to at least 1.02 on the airfoil and 1.00005 in the wake, and "islands" of negative $u_e$ are removed. Convergence is declared when the RMS of the normalised changes falls below $10^{-4}$. If this has not happened within the user's iteration limit (`ITER`, default 20), XFOIL reports "Convergence failed" and keeps the unconverged state as the starting point for the next request.

## Design Modes

XFOIL's two inverse modes reuse the same machinery. In the **full-inverse** mode (QDES), the airfoil is the conformal image of a circle, and the user prescribes the surface speed $q_s(\phi)$ as a function of the circle angle at one angle of attack. A prescribed speed does not in general give a closed airfoil in a uniform stream. Lighthill showed that three integral constraints must hold [#lighthill], so XFOIL adds free parameters to $q_s$ and solves for them together with the mapping coefficients. In the **mixed-inverse** mode (MDES), only a segment of the surface is redesigned. On that segment the vortex strength is prescribed,

$$\gamma_i = q_{s,i} + A_1 f_1(s_i) + A_2 f_2(s_i) , \tag{e:mdes}$$

and the normal displacements $\delta n_i$ of the nodes become the unknowns instead of $\gamma_i$. The two shape functions $f_1, f_2$ with free amplitudes $A_1, A_2$ allow the new contour to join the fixed one with continuous slope at both ends. The stream-function equations ({e:panel}) are linearised in $\delta n_i$ and solved by Newton iteration. Both modes are *inviscid*. The designer shapes the inviscid speed distribution so that the viscous solution, checked afterwards in OPER, behaves well. This is the "design by pressure distribution" workflow for which XFOIL was built [#drela90]. It is still the fastest way to tailor a laminar bucket or a pressure recovery, and it complements the black-box optimisation discussed in Section VI-C.

![Fig. {f:arch}. Structure of one XFOIL viscous operating point: the panel solution and the mass-influence matrix are formed once per geometry; each Newton iteration assembles the boundary-layer residuals, solves the block system by BLSOLV, applies the relaxation rule ({e:rlx}) and updates the edge velocity by ({e:dij}).](fig/f02_arch)

Fig. {f:arch} summarises the solution flow. Two features matter for what follows. First, the method is a *pure* Newton method with a crude step limiter and no globalisation (line search, trust region or continuation). Robustness therefore depends heavily on the starting guess, which is usually the previous converged point. Second, the Jacobian of all residuals with respect to all unknowns, including $\alpha$, is formed exactly at every iteration. Its LU factors are available at convergence, so the *sensitivities* of $C_l$, $C_d$ and $C_m$ to any input are almost free. XFOIL itself never exploits this, but MSES does [#mses].
