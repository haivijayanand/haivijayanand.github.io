# A Short History of XFOIL

## Before XFOIL

By the early 1980s, airfoil designers had two kinds of tool. Panel methods, descended from the Hess–Smith source method [#hess], gave accurate inviscid pressure distributions for arbitrary shapes in seconds. Viscous effects were added afterwards by marching a boundary-layer method along the inviscid pressure distribution and, at best, iterating the displacement effect back into the panel solution. Eppler's code [#eppler80] combined conformal-mapping design with integral boundary-layer analysis and became the standard for laminar sections. However, its boundary layer did not feed back into the pressure distribution, so it could not resolve separation bubbles or trailing-edge separation self-consistently. "Direct" coupling (inviscid solution gives $u_e$, boundary layer gives $\delta^*$) diverges at separation, where the boundary-layer equations become singular in that direction. "Inverse" and "semi-inverse" schemes [#veldman] removed the singularity but converged slowly.

## ISES, Daedalus and XFOIL 1.0

Mark Drela's doctoral work at MIT produced ISES, a two-dimensional Euler solver on a streamline grid, fully coupled to integral boundary-layer equations and solved by a single global Newton method [#drelaphd], [#drela87]. The key idea was to treat boundary-layer and inviscid unknowns as one nonlinear system. That removed the direct/inverse distinction and gave quadratic convergence through separation bubbles and mild trailing-edge separation. The ISES boundary-layer formulation introduced the closures, the lag equation and the envelope $e^N$ transition model of Section III. It was published with Giles in 1987 [#drela87].

The immediate application was the MIT Daedalus human-powered aircraft. Its wing operated at chord Reynolds numbers of a few hundred thousand, where laminar separation bubbles dominate drag. Drela designed the DAI series of airfoils for it [#drela88]. In April 1988, Daedalus 88 flew 115 km from Crete to Santorini, a human-powered distance record.

XFOIL 1.0 was written by Drela in 1986. Its stated aim was to combine the speed and accuracy of a high-order panel method with the fully coupled viscous–inviscid method of ISES, inside a fully interactive program rather than a batch CFD code [#xfoildoc]. Inverse design modes were added early. These were a full-inverse mode based on conformal mapping (QDES) and a mixed-inverse mode that modifies the panel solution locally (MDES). A geometry manipulator (GDES) followed, making XFOIL an airfoil *development system* rather than an analysis code. The method was presented at the 1989 Notre Dame conference on low-Reynolds-number aerodynamics [#drela89], and the blunt-trailing-edge extension followed the same year [#drela89te].

## Evolution to Version 6.99

Table {t:versions} lists the documented milestones, taken from the version notes and source comments distributed with the code. Two points stand out. First, the core numerics were essentially complete by 1994–1996: the boundary-layer formulation was aligned with that of MSES in version 6.3, and the second-order transition treatment and low-Reynolds-number limiters arrived in 6.4. Second, the authors declared version 6.9 "frozen" in February 2000. Their user guide states that no further development was planned and that method extensions would go into a completely new code [#xfoildoc]. Version 6.91 (December 2000) was the first web release under the GNU General Public License. Later versions mainly fixed bugs and improved usability. Harold Youngren's Xplot11 graphics library and polar-plotting work were incorporated along the way.

: TABLE {t:versions}. Milestones of XFOIL development (from [#xfoildoc], [#xfoilweb] and source comments).

| Date | Version | Milestone |
|:---|:---|:---|
| 1985–87 | ISES | Fully coupled Euler/integral-BL Newton method [#drelaphd], [#drela87] |
| 1986 | 1.0 | Linear-vorticity panel method + ISES boundary layer; interactive |
| 1988 | — | Daedalus airfoils (DAI series) designed [#drela88] |
| 1989 | — | Method paper [#drela89]; blunt trailing edge [#drela89te] |
| Apr 1994 | 6.1 | New plot library; optional second-order amplification equation |
| Oct 1994 | 6.3 | Viscous formulation brought into line with MSES 2.6 (single-layer wake) |
| Dec 1994 | 6.4 | Second-order transition (TRCHEK2) made default; low-$Re_\theta$ limiters, valid down to $Re \approx 10^3$ |
| Aug 1996 | 6.8 | Better conditioning for sharp trailing edges with large angles |
| Nov 1996 | — | Modified envelope amplification rate (DAMPL2) added as an option |
| Feb 2000 | 6.9 | "New and final" features; sharp-TE regularity condition; code declared frozen |
| Dec 2000 | 6.91 | First web release under GPL |
| 2001–08 | 6.92–6.98 | Polar plotting, Windows builds, BL plotting, bug fixes |
| Jun/Dec 2013 | 6.99 | Drag-to-edit inverse modes; LAG command exposes lag constants |
| Jan 2026 | 6.996 | Source update for Unix listed on the MIT page [#xfoilweb] |

## Why It Endured

Several features explain why XFOIL survived so long. It was free, and from 2000 open. It ran interactively on any machine. It predicted laminar separation bubbles, transition and drag with an accuracy that matched wind-tunnel data closely in the attached and mildly separated regime. And it combined analysis, inverse design and geometry editing in one program. Its global Newton solver was more robust than the alternatives of its day for a difficult, stiff problem [#fidkowski22]. Generations of students learned airfoil aerodynamics with it. Sailplane, model-aircraft, propeller, wind-turbine, UAV and marine-turbine airfoils have been designed with it [#timmer03], [#fidkowski22]. Its predictions have even become the training data for machine-learned surrogates [#sharpe25].
