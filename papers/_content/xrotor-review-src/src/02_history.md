# Lineage and History

## Classical Vortex Theory of the Propeller

XROTOR is a modern implementation of a theory that was essentially complete by 1930. In 1919 Betz showed that a lightly loaded propeller has minimum induced loss when its trailing vortex sheets leave as rigid helicoidal surfaces moving aft at a uniform "displacement velocity" [#betz19]. In an appendix to the same paper, Prandtl gave the approximate tip-loss factor $F$ that still appears in every blade-element code. Goldstein then solved the potential flow about such a helicoidal sheet exactly for two and four blades [#goldstein29]. Glauert's 1935 survey fixed the blade-element and momentum notation [#glauert35]. Theodorsen extended the theory to heavy loading through the "mass coefficient" of the contracted wake [#theodorsen48].

Practical design methods followed much later. In 1979 Larrabee recast the Betz–Prandtl theory into a short, explicit procedure for designing propellers of minimum induced loss (MIL) at a given thrust or power. He also showed how to predict their off-design performance [#larrabee79]. Adkins and Liebeck in 1994 removed his small-angle and light-loading approximations and added the profile-drag terms consistently [#adkins94]. Their method, together with Larrabee's, underlies most spreadsheet-level propeller tools in use today. Wald's review summarises this classical line [#wald06], and in marine propulsion Kerwin's lifting-line and lattice codes form a parallel lineage that led to OpenProp [#kerwin07], [#epps10].

XROTOR's user guide credits Larrabee for reviving the graded-momentum formulation. It describes its own potential formulation as "an extension of Goldstein's 2 and 4 blade solution to all blade numbers and arbitrary radial load distributions" [#xrotordoc]. The wake-pitch correction it calls "the core of Theodorsen's theory" is credited in the same guide to similar work by David Munro on propeller noise at MIT around 1980.

## The Code and Its Versions

The early history of XROTOR is not documented publicly. The first dated record is the version-notes file, which opens in June 1998 with version 6.7, "started as the MIT version 6.6" and modified by Harold Youngren to compile on more workstations [#xrotordoc]. MIT's Industrial Liaison Program listed the code in 2002 as a propeller and windmill design and analysis program with an exact helicoidal-wake potential solution, a first-order correction for the pitch of the trailing sheets and a non-linear beam structural model [#ilp02]. The notes then record the changes of Table {t:versions}.

: TABLE {t:versions}. XROTOR versions recorded in the version-notes file distributed with 7.55 [#xrotordoc] and on the MIT page [#xrotorweb]. [wide]

| Version | Date | Main changes |
|:---|:---|:---|
| 6.6 | before 1998 | MIT version (starting point of the notes) |
| 6.7 | Jun 1998 | Makefiles for most workstations; cursor input for $c_l$, chord and blade angle |
| 6.80 | Mar 1999 | New $c_l$ limiter section model; discrete vortex wake; constant blade rake; structure with rake |
| 6.9 | 1999 | Several aerodynamic sections along the blade; new relaxation parameters; hover outputs |
| 7.0 | Jul 2000 | Critical Mach number, drag rise and Mach-reduced $c_{l,max}$ for every section |
| 7.10 | Mar 2001 | Drag-rise correlation readjusted; plot labels; induced-velocity plot scaling fixed |
| 7.20 | May 2002 | Equivalent-prop force bug fixed (mainly ducted rotors); blade-data plots |
| 7.30 | Jul 2002 | Equivalent-prop formulation revised for ducts; circulation filtering added to APINIT and APITER |
| 7.42 | Jan 2003 | Duct design and OPTI initialisation fixed; slipstream velocities include viscous swirl |
| 7.5x | Apr 2003 | Duct axial velocity from equivalent-prop thrust; momentum and blade thrust found to differ for highly loaded props |
| 7.52 | Nov 2003 | Duct design thrust fixed; ducted design uses constant circulation (free vortex) |
| 7.53 | Feb 2004 | Duct free-stream velocity for area ratio ≠ 1 fixed |
| 7.54 | Apr 2005 | Undeclared STALLF fixed; derivative fix in the section model |
| 7.55 | Nov 2009 | Graphics on/off flag (Drela) |
| 7.69 | Feb 2022 | Windows executable only (Youngren); no source published |

Three features of this history matter for what follows. First, most changes after 2000 concern the duct and the "equivalent propeller", the device that lets XROTOR treat non-uniform inflow (Section III-E). Second, version 7.30 introduced the circulation filter that Section V-F identifies as the main cause of non-convergence. Third, the notes themselves admit that momentum and blade thrust disagree for highly loaded free-tip propellers, which Section V-D quantifies. The present MIT page was created in February 2011 with version 7.54, and 7.55 followed in March 2011, both under the GNU General Public License [#xrotorweb]. The archive on the page is named 7.57 but is described as version 7.55, the version studied here. A 7.69 Windows executable was added in February 2022 without source.

## The XROTOR Family

**QPROP and QMIL** (2007) are Drela's later programs for propeller–motor matching and MIL design. They use almost the same formulation and are intended for large parametric sweeps driven by text files [#qprop]. They are not a replacement for XROTOR's design-modification, structural and acoustic menus, but their documentation is the best available description of the shared theory, and they have been compared with wind-tunnel data for small UAV propellers [#lowe15].

**DFDC** (Ducted Fan Design Code), by Youngren, Drela and Sanders, developed under DARPA sponsorship,, replaces XROTOR's simple duct model with an axisymmetric panel model of duct and centre-body, coupled to lifting-line rotors and stators [#dfdc05], [#dfdcweb]. Its theory document states that XROTOR's duct treatment "ignores the details of the duct velocity field and the effect of losses". DuctAPE, an optimisation-ready re-implementation of the DFDC approach in Julia, matches DFDC within half a percent [#mehr25].

**CROTOR** is a modified XROTOR that automates the design and analysis of contra-rotating pairs, approximately modelling the effect of each rotor on the other. It has been used, for example, to optimise coaxial drone rotors [#crotor].

**Ports and wrappers.** DARcorporation's *xrotor-python* (2018 onwards) is a stripped-down Fortran 90 version without design, modification and graphics, compiled as a Python module so that optimisation frameworks can call it without file input and output [#xrotorpy]. It replaces the parametric section model with tabulated polars. A C++ translation of the same stripped-down code [#xrotorc], an unofficial NumPy port [#pyxrotor], a MATLAB coupling [#xrotormatlab] and several scripting wrappers that drive the executable through its text menus [#pdt] complete the family. Fig. {f:timeline} places these events on one time line.

![Fig. {f:timeline}. Time line of the classical vortex theory of the propeller and of XROTOR and its family. Dates for XROTOR versions are those of the version-notes file; the present MIT download page dates from 2011. [wide]](fig/f01_timeline)
