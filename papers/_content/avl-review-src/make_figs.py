"""
TOOL:    make_figs.py - figures and AVL input files for the AVL review paper
FAMILY:  aero-codes
VERSION: 1.1.0
DATE:    2026-11-28
CHAT:    AVL (Athena Vortex Lattice) technical paper - history, usage, improvements, limitations
CHANGES: 1.1.0 - added Fig. 6 flying-wing lattice
         1.0.0 - first version: 5 figures (deutan-safe blue/orange/black + markers), demo_uav.avl/.mass/.run
"""
__version__ = "1.1.0"

import json
import os
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

OUT = "/home/claude/avl_paper/fig"
os.makedirs(OUT, exist_ok=True)
r = json.load(open("/home/claude/avl_paper/results.json"))
BLUE, ORANGE, BLACK, GREY = "#1f4e9c", "#e08a00", "#111111", "#888888"
plt.rcParams.update({"font.family": "serif", "font.size": 9, "axes.linewidth": 0.8,
                     "lines.linewidth": 1.8, "savefig.dpi": 220, "axes.grid": True,
                     "grid.color": "#dddddd", "grid.linewidth": 0.6})

# Fig 1 - planform of the demo UAV (top view) with lattice outline
from vlm_uav import uav_surfaces, VLM, REF
v = VLM(uav_surfaces(scale=1.0), REF["Sref"], REF["cref"], REF["bref"], REF["xref"])
fig, ax = plt.subplots(figsize=(3.4, 2.6))
lat = v.lat
for i in range(len(lat["A"])):
    if lat["tag"][i] == "Vtail":
        continue
    A, B, C = lat["A"][i], lat["B"][i], lat["C"][i]
    col = ORANGE if lat["ctrl"][i] else BLUE
    ax.plot([A[1], B[1]], [A[0], B[0]], color=col, lw=0.5)
    ax.plot(C[1], C[0], ".", color=BLACK, ms=1.2)
xn = r["Xnp"]
ax.plot(0, -REF["xref"][0], "o", color=BLACK, ms=5, label="CG / Xref")
ax.plot(0, -xn, "s", mfc="white", mec=BLACK, ms=5, label="Neutral point")
ax.set_xlabel("y  [m]"); ax.set_ylabel("x (fwd)  [m]")
ax.set_aspect("equal"); ax.legend(fontsize=7, loc="lower right")
ax.set_title("Bound vortices (blue), control panels (orange)", fontsize=8)
fig.tight_layout(); fig.savefig(f"{OUT}/fig1_lattice.png"); plt.close(fig)

# Fig 2 - validation: elliptic & rectangular AR 6 convergence
fig, ax = plt.subplots(1, 2, figsize=(3.4, 2.3))
rows = r["validation"]["rows"]; ell = r["validation"]["elliptic"]
ax[0].plot([x["ns"] * x["nc"] for x in rows], [x["CLa"] for x in rows], "o-", color=BLUE, label="Rect. AR 6")
ax[0].plot([2 * x["ns"] * x["nc"] for x in ell], [x["CLa"] for x in ell], "s--", color=ORANGE, label="Ellip. AR 6")
ax[0].axhline(r["validation"]["helmbold"], color=BLACK, ls=":", lw=1.2, label="Helmbold")
ax[0].set_xscale("log"); ax[0].set_xlabel("panels"); ax[0].set_ylabel(r"$C_{L\alpha}$ [1/rad]")
ax[0].legend(fontsize=6)
ax[1].plot([x["ns"] * x["nc"] for x in rows], [x["e"] for x in rows], "o-", color=BLUE)
ax[1].plot([2 * x["ns"] * x["nc"] for x in ell], [x["e"] for x in ell], "s--", color=ORANGE)
ax[1].axhline(1.0, color=BLACK, ls=":", lw=1.2)
ax[1].set_xscale("log"); ax[1].set_xlabel("panels"); ax[1].set_ylabel("span efficiency e")
fig.tight_layout(); fig.savefig(f"{OUT}/fig2_validation.png"); plt.close(fig)

# Fig 3 - CL, Cm vs alpha (linear by construction) with trim point
sw = r["sweep"]; al = [x["alpha"] for x in sw]
fig, ax = plt.subplots(figsize=(3.4, 2.3))
ax.plot(al, [x["CL"] for x in sw], "o-", color=BLUE, ms=3, label=r"$C_L$")
ax2 = ax.twinx(); ax2.grid(False)
ax2.plot(al, [x["Cm"] for x in sw], "s--", color=ORANGE, ms=3, label=r"$C_m$")
ax.axvline(r["trim"]["alpha"], color=BLACK, lw=1.0, ls=":")
ax.set_xlabel(r"$\alpha$ [deg]"); ax.set_ylabel(r"$C_L$", color=BLUE); ax2.set_ylabel(r"$C_m$", color=ORANGE)
ax.text(r["trim"]["alpha"] + 0.3, 0.05, "trim", fontsize=7)
fig.tight_layout(); fig.savefig(f"{OUT}/fig3_alpha_sweep.png"); plt.close(fig)

# Fig 4 - spanwise lift at trim
sl = sorted(r["spanload"], key=lambda z: z["y"])
y = np.array([z["y"] for z in sl]); L = np.array([z["lift"] for z in sl])
fig, ax = plt.subplots(figsize=(3.4, 2.1))
ax.plot(y, L / L.max(), "o-", color=BLUE, ms=2.5, label="VLM span load (norm.)")
yy = np.linspace(-1, 1, 200)
ax.plot(yy, np.sqrt(1 - yy**2) * (L.max() / L.max()), "--", color=BLACK, lw=1.2, label="elliptic shape")
ax.set_xlabel("y [m]"); ax.set_ylabel("lift per unit span / max"); ax.legend(fontsize=6, loc="lower center")
fig.tight_layout(); fig.savefig(f"{OUT}/fig4_spanload.png"); plt.close(fig)

# Fig 5 - eigenvalue map
fig, ax = plt.subplots(figsize=(3.4, 2.5))
names_l = ["Short period", "Phugoid"]; names_t = ["Dutch roll", "Roll", "Spiral"]
for m, n in zip(r["modes_long"], names_l):
    ax.plot([m["re"], m["re"]], [m["im"], -m["im"]], "o", color=BLUE, ms=6)
    ax.annotate(n, (m["re"], m["im"]), textcoords="offset points", xytext=(4, 4), fontsize=7)
for m, n in zip(r["modes_lat"], names_t):
    ax.plot([m["re"], m["re"]], [m["im"], -m["im"]], "x", color=ORANGE, ms=7, mew=2)
    ax.annotate(n, (m["re"], m["im"]), textcoords="offset points", xytext=(4, -10), fontsize=7)
ax.axvline(0, color=BLACK, lw=0.8)
ax.set_xlim(-18, 2); ax.set_ylim(-11, 11)
ax.set_xlabel(r"Re($\lambda$) [1/s]"); ax.set_ylabel(r"Im($\lambda$) [rad/s]")
ax.set_title("o longitudinal   x lateral-directional", fontsize=8)
fig.tight_layout(); fig.savefig(f"{OUT}/fig5_eigen.png"); plt.close(fig)

# AVL input files that reproduce the geometry
t3 = np.tan(np.radians(3))
avl = f"""Demo UAV - AVL review paper worked example
#Mach
0.0
#IYsym  IZsym  Zsym
 0       0      0.0
#Sref    Cref    Bref
 {REF['Sref']}    {REF['cref']}   {REF['bref']}
#Xref    Yref    Zref
 {REF['xref'][0]}   0.0     0.0
#CDp
 0.032
#==============================================================
SURFACE
Wing
#Nchord  Cspace
 12      1.0
YDUPLICATE
 0.0
#--------------------------------------------------------------
SECTION
#Xle    Yle    Zle     Chord   Ainc   Nspan  Sspace
 0.0    0.0    0.0     0.26    2.0    12     1.0
NACA
2410
SECTION
 0.02   0.5    {0.5*t3:.4f}  0.22    1.0    12     1.0
NACA
2410
CONTROL
#Cname    Cgain  Xhinge  HingeVec  SgnDup
aileron   1.0    0.75    0 0 0     -1
SECTION
 0.04   1.0    {1.0*t3:.4f}  0.18    0.0
NACA
2410
CONTROL
aileron   1.0    0.75    0 0 0     -1
#==============================================================
SURFACE
Htail
 9       1.0
YDUPLICATE
 0.0
ANGLE
 -1.0
SECTION
 0.95   0.0    0.05    0.14    0.0    12     1.0
CONTROL
elevator  1.0    0.60    0 0 0      1
SECTION
 0.97   0.30   0.05    0.11    0.0
CONTROL
elevator  1.0    0.60    0 0 0      1
#==============================================================
SURFACE
Vtail
 9       1.0
SECTION
 0.93   0.0    0.05    0.20    0.0    9      1.0
CONTROL
rudder    1.0    0.60    0 0 0      1
SECTION
 1.00   0.0    0.30    0.12    0.0
CONTROL
rudder    1.0    0.60    0 0 0      1
"""
open("/home/claude/avl_paper/demo_uav.avl", "w").write(avl)
mass = """# demo_uav.mass  - lumped mass properties (SI)
Lunit = 1.0 m
Munit = 1.0 kg
Tunit = 1.0 s
g   = 9.81
rho = 1.15
#  mass    x      y     z     Ixx    Iyy    Izz
   3.2    0.115  0.0   0.0   0.32   0.22   0.52
"""
open("/home/claude/avl_paper/demo_uav.mass", "w").write(mass)
print("figs + avl files written")

# Fig 6 - flying-wing lattice (added in 1.1.0)
import flying_wing as FW  # noqa: E402  (re-runs the small study; cheap)
vf = VLM(FW.surfaces(1.0), FW.S, FW.mac, FW.b, (FW.xcg, 0, 0))
fig, ax = plt.subplots(figsize=(3.4, 1.9))
lf = vf.lat
for i in range(len(lf["A"])):
    if lf["tag"][i] == "Vtail":
        continue
    A, B, C = lf["A"][i], lf["B"][i], lf["C"][i]
    ax.plot([A[1], B[1]], [A[0], B[0]], color=ORANGE if lf["ctrl"][i] else BLUE, lw=0.5)
    ax.plot(C[1], C[0], ".", color=BLACK, ms=1.0)
ax.plot(0, -FW.xcg, "o", color=BLACK, ms=5, label="CG")
ax.plot(0, -FW.xnp, "s", mfc="white", mec=BLACK, ms=5, label="Neutral point")
ax.set_aspect("equal"); ax.set_xlabel("y [m]"); ax.set_ylabel("x (fwd) [m]"); ax.legend(fontsize=6, loc="lower center")
fig.tight_layout(); fig.savefig(f"{OUT}/fig6_flying_wing.png"); plt.close(fig)
