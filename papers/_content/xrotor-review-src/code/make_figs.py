# -*- coding: utf-8 -*-
"""
TOOL:    make_figs.py - figures for the XROTOR review paper (PDF for LaTeX, SVG for the web)
FAMILY:  technical-papers / xrotor-review
VERSION: 1.2.0
DATE:    2026-11-28
CHAT:    XROTOR code review technical paper (2026-11-28)
CHANGES: 1.2.0 - worked designs: 10-inch propeller (f12) and 60 MW wind turbine (f13)
         1.1.0 - robustness map with three iteration modes; Mach study (f11); J sweep marks filter-only failures
         1.0.0 - timeline, solver flow, swirl models, aero model, J sweep, loading, discretisation, robustness map,
         MIL designs, formulation error map; deutan-safe palette with distinct line styles and markers
"""
__version__ = "1.2.0"
import json, os, sys
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "data")
FIG = os.path.join(HERE, "..", "paper", "fig")
os.makedirs(FIG, exist_ok=True)
sys.path.insert(0, HERE)

C = ["#0072B2", "#E69F00", "#000000", "#7f7f7f", "#56B4E9", "#CC79A7", "#332288"]
LS = ["-", "--", "-.", ":", (0, (5, 1, 1, 1)), (0, (3, 1, 1, 1, 1, 1)), (0, (1, 1))]
MK = ["o", "s", "^", "D", "v", "P", "*"]
plt.rcParams.update({"font.size": 8, "font.family": "serif", "axes.linewidth": 0.6,
                     "lines.linewidth": 1.4, "legend.fontsize": 6.8, "legend.frameon": False,
                     "axes.grid": True, "grid.color": "#dddddd", "grid.linewidth": 0.5,
                     "savefig.bbox": "tight", "savefig.pad_inches": 0.03})
FS = (3.4, 2.5)
WK = {"grad": ("Graded momentum (GRAD)", 1), "pot": ("Potential (POT, default)", 0), "vrtx": ("Discrete vortex (VRTX)", 2)}


def save(fig, name):
    fig.savefig(os.path.join(FIG, name + ".pdf")); fig.savefig(os.path.join(FIG, name + ".svg")); plt.close(fig)


def J(name):
    return json.load(open(os.path.join(DATA, name + ".json")))


# ---------------------------------------------------------------- f01 timeline
def f01():
    ev = [(1919, "Betz optimum;\nPrandtl tip factor"), (1929, "Goldstein\nhelicoidal sheet"),
          (1948, "Theodorsen\nmass coefficient"), (1979, "Larrabee\nMIL design"), (1994, "Adkins &\nLiebeck"),
          (1998, "XROTOR 6.7\n(from MIT 6.6)"), (1999, "6.80-6.9: vortex\nwake, rake, sections"),
          (2000, "7.0: Mcrit\ndrag rise"), (2002, "7.2-7.3: duct\nequivalent prop"),
          (2003, "7.42-7.52\nduct design"), (2005, "7.54; DFDC\ntheory draft"), (2007, "QPROP /\nQMIL 1.20"),
          (2009, "XROTOR 7.55"), (2011, "MIT page:\n7.54, 7.55 src"), (2018, "xrotor-python\n(DARcorp)"),
          (2022, "7.69 Windows\nexecutable"), (2026, "C++ and NumPy\nports (active)")]
    fig, ax = plt.subplots(figsize=(7.1, 2.3))
    ax.axhline(0, color="k", lw=0.8)
    xs = np.linspace(0, 1, len(ev))
    for k, (yr, lab) in enumerate(ev):
        x = xs[k]; y = 0.62 if k % 2 == 0 else -0.62
        ax.plot([x, x], [0, y * 0.72], color=C[3], lw=0.6)
        ax.plot(x, 0, "o", color=C[0] if yr >= 1998 else C[2], ms=3)
        ax.text(x, y, f"{yr}\n{lab}", ha="center", va="center", fontsize=5.3,
                bbox=dict(fc="white", ec=C[0] if yr >= 1998 else C[3], lw=0.5, pad=1.0))
    ax.set_xlim(-0.04, 1.04); ax.set_ylim(-1.05, 1.05); ax.axis("off")
    ax.text(0.0, 0.98, "classical theory (black dots)", fontsize=6, transform=ax.transAxes, color=C[2])
    ax.text(0.75, 0.98, "XROTOR family (blue dots)", fontsize=6, transform=ax.transAxes, color=C[0])
    save(fig, "f01_timeline")


# ---------------------------------------------------------------- f02 solver flow
def f02():
    fig, ax = plt.subplots(figsize=(3.4, 4.3)); ax.axis("off"); ax.set_xlim(0, 10); ax.set_ylim(0, 15)
    boxes = [(7.0 + 6.6, "APINIT: Γ from blade angles without induction;\n10 graded-momentum sweeps for Γ and λw"),
             (12.2, "Influence matrix ∂v/∂Γ at current λw:\nGRADMO | HELICO (default) | VRTXCO"),
             (10.6, "VCALC: axial and swirl velocity at blade; SETXW:\nequivalent-prop radii and swirl (stream-function match)"),
             (9.0, "TPQ: blade, equivalent-prop and viscous\nthrust and power, with sensitivities"),
             (7.4, "Newton matrix (II+3): Γ–CL at each station,\nspecified T/Q/P/λ, wake λw equation, constraint"),
             (5.8, "GAUSS; relaxation: 0.2 for iterations 1–2,\nΔCL limit near stall, Δβ ≤ 0.05 rad, λ, λw limits"),
             (4.2, "If relaxation < 0.2: FILTER smooths Γ\n(tridiagonal, length 0.2·II)"),
             (2.6, "RMS ΔΓ ≤ 1e-7 ?  yes → final TPQ, output;\nno → next iteration (NITERA = 40)")]
    for y, t in boxes:
        ax.add_patch(FancyBboxPatch((0.3, y - 0.62), 9.4, 1.24, boxstyle="round,pad=0.05,rounding_size=0.2",
                                    fc="#eef5fb" if "Newton" not in t else "#fdf1dc", ec=C[0], lw=0.6))
        ax.text(5, y, t, ha="center", va="center", fontsize=5.8)
    ys = [b[0] for b in boxes]
    for a, b in zip(ys[:-1], ys[1:]):
        ax.annotate("", xy=(5, b + 0.66), xytext=(5, a - 0.66), arrowprops=dict(arrowstyle="->", lw=0.7))
    ax.annotate("", xy=(9.75, 12.2), xytext=(9.75, 2.6),
                arrowprops=dict(arrowstyle="->", lw=0.7, ls="--", connectionstyle="arc,angleA=0,angleB=0,armA=8,armB=8,rad=0"))
    ax.text(9.95, 7.4, "loop", rotation=90, fontsize=5.5, va="center")
    save(fig, "f02_flow")


# ---------------------------------------------------------------- f03 swirl models
def f03():
    d = J("swirl")
    keys = [("B2_l0.1", "B = 2, λ = 0.1"), ("B2_l0.3", "B = 2, λ = 0.3"), ("B4_l0.3", "B = 4, λ = 0.3")]
    fig, axs = plt.subplots(1, 3, figsize=(7.1, 2.2), sharey=False)
    for ax, (k, t) in zip(axs, keys):
        e = d[k]; xi = np.array(e["xi"])
        for wk in ("grad", "pot", "vrtx"):
            lab, i = WK[wk]
            ax.plot(xi, e[wk], color=C[i], ls=LS[i], label=lab.split(" (")[0])
        ax.plot(xi, e["mean"], color=C[3], ls=":", lw=1.0, label="Mean swirl BΓ/(4πr)")
        ax.set_title(t, fontsize=7.5); ax.set_xlabel("r/R")
        ax.set_ylim(min(0, np.min(e["pot"][3:-1]) * 1.2), np.max(e["grad"][2:]) * 1.35)
    axs[0].set_ylabel("Swirl at blade $v_t/V$"); axs[0].legend(loc="upper right", fontsize=5.6)
    fig.tight_layout(); save(fig, "f03_swirl")


# ---------------------------------------------------------------- f04 aero model
def f04():
    from cases import clarky, CLARKY_PARAM
    from pyxr import ParamAero
    t = clarky(); p = ParamAero(**CLARKY_PARAM); q = ParamAero(**dict(CLARKY_PARAM, mcrit=0.70))
    a = np.linspace(-12, 24, 200)
    cl = [p.eval(np.radians(x), 1, 1e6, 0, 340)[0] for x in a]; cd = [p.eval(np.radians(x), 1, 1e6, 0, 340)[1] for x in a]
    fig, axs = plt.subplots(1, 3, figsize=(7.1, 2.2))
    axs[0].plot(t[:, 0], t[:, 1], color=C[2], ls="-", lw=1.0, label="Clark-Y table, Re = 10$^6$")
    axs[0].plot(a, cl, color=C[0], ls="--", label="XROTOR model fit")
    axs[0].set_xlabel("α (deg)"); axs[0].set_ylabel("$C_l$"); axs[0].legend(fontsize=5.8)
    axs[1].plot(t[:, 1], t[:, 2], color=C[2], lw=1.0, label="table"); axs[1].plot(cl, cd, color=C[0], ls="--", label="model")
    axs[1].set_xlabel("$C_l$"); axs[1].set_ylabel("$C_d$"); axs[1].set_ylim(0, 0.1); axs[1].set_xlim(-0.8, 1.6)
    M = np.linspace(0.3, 0.95, 80)
    for k, clv in enumerate((0.2, 0.6, 1.0)):
        cdm = []
        for m in M:
            w = m * 340 / 100.0
            a0 = None
            # find alpha for this cl at Mach m
            lo, hi = -0.5, 0.5
            for _ in range(60):
                mid = 0.5 * (lo + hi)
                if q.eval(mid, w, 1e6, 100.0, 340)[0] < clv: lo = mid
                else: hi = mid
            cdm.append(q.eval(lo, w, 1e6, 100.0, 340)[1])
        axs[2].plot(M, cdm, color=C[k], ls=LS[k], label=f"$C_l$ = {clv}")
    axs[2].set_xlabel("Section Mach number"); axs[2].set_ylabel("$C_d$"); axs[2].set_ylim(0, 0.08)
    axs[2].legend(fontsize=5.8); axs[2].set_title("$M_{crit}$ = 0.70", fontsize=7)
    fig.tight_layout(); save(fig, "f04_aero")


# ---------------------------------------------------------------- f05 J sweep
def f05():
    d = J("jsweep"); Js = np.array(d["J"])
    fig, axs = plt.subplots(1, 3, figsize=(7.1, 2.3))
    for wk in ("grad", "pot", "vrtx"):
        lab, i = WK[wk]; e = d[wk]; ok = np.array(e["conv"])
        for ax, q in zip(axs, ("CT", "CP", "eta")):
            okn = np.array(e.get("conv_nofilter", e["conv"]))
            y = np.array(e[q], float); y[~(ok | okn)] = np.nan
            if q == "eta": y[np.array(e["CT"]) <= 0] = np.nan
            ax.plot(Js, y, color=C[i], ls=LS[i], marker=MK[i], ms=2.2, label=lab)
            okn = np.array(e.get("conv_nofilter", e["conv"]))
            bad = (~ok) & okn
            yb = np.array(e[q], float)
            if bad.any():
                ax.plot(Js[bad], yb[bad], ls="none", marker=MK[i], mfc="white", color=C[i], ms=4)
    e = d["pot_table"]; ok = np.array(e["conv"])
    for ax, q in zip(axs, ("CT", "CP", "eta")):
        y = np.array(e[q], float); y[~ok] = np.nan
        if q == "eta": y[np.array(e["CT"]) <= 0] = np.nan
        ax.plot(Js, y, color=C[3], ls=":", lw=1.0, label="POT, Clark-Y table aero")
    axs[0].set_ylabel("$C_T$"); axs[1].set_ylabel("$C_P$"); axs[2].set_ylabel("η")
    axs[2].set_ylim(0.3, 0.95)
    for ax in axs: ax.set_xlabel("Advance ratio J")
    axs[0].legend(fontsize=5.4, loc="lower left")
    fig.tight_layout(); save(fig, "f05_jsweep")


# ---------------------------------------------------------------- f06 loading
def f06():
    d = J("jsweep"); Js = np.array(d["J"]); g = d["diag"]; pot = np.array(d["pot"]["CT"])
    fig, axs = plt.subplots(1, 2, figsize=(7.1, 2.3))
    m = Js <= 1.05
    axs[0].plot(Js[m], np.array(g["adw_adv"])[m], color=C[0], marker="o", ms=2.5, label="λw/λ (free wake)")
    ax2 = axs[0].twinx(); ax2.grid(False)
    ax2.plot(Js[m], 100 * np.array(g["ti_tw"])[m], color=C[1], ls="--", marker="s", ms=2.5, label="blade vs equivalent-prop thrust")
    axs[0].set_xlabel("Advance ratio J"); axs[0].set_ylabel("λw / λ"); ax2.set_ylabel("$T_{blade}/T_{equiv} - 1$ (%)")
    h1, l1 = axs[0].get_legend_handles_labels(); h2, l2 = ax2.get_legend_handles_labels()
    axs[0].legend(h1 + h2, l1 + l2, fontsize=5.8, loc="upper right")
    rig = np.array(g["ct_rigid"]); lin = np.array(g["ct_lin"]); m = Js <= 1.05
    axs[1].plot(Js[m], 100 * (rig[m] / pot[m] - 1), color=C[0], marker="o", ms=2.5, label="rigid wake, λw from APINIT")
    axs[1].plot(Js[m], 100 * (lin[m] / pot[m] - 1), color=C[1], ls="--", marker="s", ms=2.5, label="rigid wake, λw = λ")
    axs[1].set_xlabel("Advance ratio J"); axs[1].set_ylabel("$C_T$ change vs free wake (%)"); axs[1].legend(fontsize=5.8)
    fig.tight_layout(); save(fig, "f06_loading")


# ---------------------------------------------------------------- f07 discretisation
def f07():
    d = J("disc"); II = np.array(d["II"])
    fig, axs = plt.subplots(1, 2, figsize=(7.1, 2.3))
    for k, (wk, sp) in enumerate((("pot", 2), ("pot", 1), ("grad", 2), ("grad", 1))):
        e = d[f"{wk}_{sp}"]; ct = np.array(e["CT"]); ref = ct[-1]
        axs[0].loglog(II[:-1], np.abs(ct[:-1] / ref - 1) * 100 + 1e-6, color=C[k], ls=LS[k], marker=MK[k], ms=2.5,
                      label=f"{wk.upper()}, {'sine' if sp == 2 else 'cosine'} spacing")
    e = d["vrtx_2"]; ct = np.array(e["CT"]); ref = ct[-1]
    axs[0].loglog(np.array(e["II"][:-1]), np.abs(ct[:-1] / ref - 1) * 100 + 1e-6, color=C[4], ls=LS[4], marker=MK[4],
                  ms=2.5, label="VRTX, sine (ref. II = 40)")
    axs[0].set_xlabel("Radial stations II"); axs[0].set_ylabel("|Δ$C_T$| vs finest (%)"); axs[0].legend(fontsize=5.0)
    n = d["NN"]; ct = np.array(n["CT"]); cp = np.array(n["CP"])
    axs[1].semilogx(n["NN"], (ct / ct[-1] - 1) * 100, color=C[0], marker="o", ms=2.5, label="$C_T$")
    axs[1].semilogx(n["NN"], (cp / cp[-1] - 1) * 100, color=C[1], ls="--", marker="s", ms=2.5, label="$C_P$")
    axs[1].axvline(128, color=C[3], lw=0.8, ls=":"); axs[1].text(140, 0.0, "XROTOR\nNN = 128", fontsize=5.5)
    axs[1].set_xlabel("Fourier harmonics NN (HELICO)"); axs[1].set_ylabel("Change vs NN = 512 (%)"); axs[1].legend(fontsize=6)
    from matplotlib.ticker import FixedLocator, NullFormatter, ScalarFormatter
    axs[0].xaxis.set_major_locator(FixedLocator([8, 10, 20, 40, 80])); axs[0].xaxis.set_minor_formatter(NullFormatter())
    axs[0].xaxis.set_major_formatter(ScalarFormatter())
    fig.tight_layout(); save(fig, "f07_disc")


# ---------------------------------------------------------------- f08 robustness
def f08():
    d = J("robust_grad_pot")
    modes = (("xrotor", "XROTOR rules"), ("xrotor_nofilter", "no Γ filter"), ("newton", "plain Newton"))
    fig, axs = plt.subplots(2, 3, figsize=(7.1, 3.7), sharex=True, sharey=True)
    Js = np.array(d["J"]); db = np.array(d["dbeta"])
    for r, wk in enumerate(("grad", "pot")):
        for c, (mode, title) in enumerate(modes):
            e = d[f"{wk}_{mode}"]; conv = np.array(e["conv"], bool); it = np.array(e["it"], float)
            ax = axs[r, c]
            im = ax.pcolormesh(Js, db, np.where(conv, it, np.nan), cmap="Blues", vmin=0, vmax=40, shading="nearest")
            yy, xx = np.where(~conv)
            ax.plot(Js[xx], db[yy], "x", color=C[1], ms=3.2, mew=1.0)
            ax.set_title(f"{wk.upper()}, {title}: {100 * conv.mean():.1f} %", fontsize=6.3)
            ax.grid(False)
        axs[r, 0].set_ylabel("Pitch change Δβ (deg)")
    for ax in axs[1]: ax.set_xlabel("Advance ratio J")
    cb = fig.colorbar(im, ax=axs, shrink=0.85, pad=0.02); cb.set_label("Iterations (orange × = not converged)", fontsize=7)
    save(fig, "f08_robust")


# ---------------------------------------------------------------- f11 Mach
def f11():
    d = J("mach"); M = np.array(d["Mtip"])
    fig, axs = plt.subplots(1, 2, figsize=(7.1, 2.3))
    for key, lab, k in (("grad", "GRAD", 1), ("pot", "POT", 0), ("pot_noMach", "POT, Mach effects off", 2)):
        e = d[key]; ok = np.array([x["conv"] for x in e]); ct = np.array([x["CT"] for x in e]); et = np.array([x["eta"] for x in e])
        y = np.where(ok, ct, np.nan); z = np.where(ok, et, np.nan)
        axs[0].plot(M, y, color=C[k], ls=LS[k], marker=MK[k], ms=2.8, label=lab)
        axs[1].plot(M, z, color=C[k], ls=LS[k], marker=MK[k], ms=2.8, label=lab)
        if (~ok).any():
            axs[0].plot(M[~ok], np.full((~ok).sum(), 0.07), "x", color=C[k], ms=5, mew=1.2)
    axs[0].text(0.645, 0.0725, "POT not converged", fontsize=6, color=C[0])
    axs[0].set_ylim(0.065, 0.12)
    axs[0].set_ylabel("$C_T$"); axs[1].set_ylabel("η")
    for ax in axs: ax.set_xlabel("Rotational tip Mach number"); ax.axvline(0.70, color=C[3], ls=":", lw=0.8)
    axs[1].text(0.705, 0.45, "section $M_{cr}$", fontsize=6, rotation=90)
    axs[0].legend(fontsize=6, loc="lower left")
    fig.tight_layout(); save(fig, "f11_mach")


# ---------------------------------------------------------------- f09 MIL designs
def f09():
    d = J("design")
    fig, axs = plt.subplots(1, 3, figsize=(7.1, 2.3))
    for wk in ("grad", "pot", "vrtx"):
        e = d[f"B2_{wk}"]; lab, i = WK[wk]; xi = np.array(e["xi"])
        axs[0].plot(xi, e["ch"], color=C[i], ls=LS[i], label=f"{lab.split(' (')[0]}, η = {e['eta']:.3f}")
        axs[1].plot(xi, e["beta"], color=C[i], ls=LS[i])
        axs[2].plot(xi, np.array(e["gam"]), color=C[i], ls=LS[i])
    e = d["B2_pot"]
    axs[2].plot(e["xi"], e["larrabee"], color=C[3], ls=":", lw=1.0, label="Initial guess (POT)")
    axs[0].set_ylabel("Chord c/R"); axs[1].set_ylabel("Blade angle β (deg)"); axs[2].set_ylabel("Γ/(VR)")
    for ax in axs: ax.set_xlabel("r/R")
    axs[0].legend(fontsize=5.6); axs[2].legend(fontsize=5.8)
    fig.tight_layout(); save(fig, "f09_design")


# ---------------------------------------------------------------- f10 formulation error
def f10():
    rows = [r for r in J("formerr") if r.get("conv")]
    fig, axs = plt.subplots(1, 2, figsize=(7.1, 2.3))
    for k, B in enumerate((2, 3, 4, 6)):
        rr = [r for r in rows if r["B"] == B and r["grad"]["conv"]]
        lam = [r["lam"] for r in rr]
        axs[0].plot(lam, [100 * (r["grad"]["CT"] / r["pot"]["CT"] - 1) for r in rr], color=C[k], ls=LS[k],
                    marker=MK[k], ms=2.5, label=f"B = {B}")
        axs[1].plot(lam, [100 * (r["grad"]["eta"] - r["pot"]["eta"]) for r in rr], color=C[k], ls=LS[k],
                    marker=MK[k], ms=2.5, label=f"B = {B}")
        rv = [r for r in rows if r["B"] == B and r.get("vrtx", {}).get("conv")]
        axs[0].plot([r["lam"] for r in rv], [100 * (r["vrtx"]["CT"] / r["pot"]["CT"] - 1) for r in rv], color=C[k],
                    ls="none", marker=MK[k], mfc="none", ms=4)
    axs[0].set_ylabel("$C_T$: GRAD (lines), VRTX (open) vs POT (%)"); axs[1].set_ylabel("η: GRAD − POT (points)")
    for ax in axs: ax.set_xlabel("Advance ratio λ = V/ΩR"); ax.axhline(0, color="k", lw=0.6)
    axs[0].legend(fontsize=6)
    fig.tight_layout(); save(fig, "f10_formerr")


# ---------------------------------------------------------------- f12 10-inch propeller
def f12():
    d = J("prop10")
    fig, axs = plt.subplots(1, 3, figsize=(7.1, 2.3))
    for wk in ("grad", "pot", "vrtx"):
        e = d["designs"][wk]; lab, i = WK[wk]; xi = np.array(e["xi"])
        axs[0].plot(xi * 127, e["c_mm"], color=C[i], ls=LS[i], label=f"{lab.split(' (')[0]}, η = {e['eta']:.3f}")
        axs[1].plot(xi * 127, e["beta"], color=C[i], ls=LS[i])
    axs[0].set_xlabel("Radius (mm)"); axs[0].set_ylabel("Chord (mm)"); axs[0].legend(fontsize=5.6)
    axs[1].set_xlabel("Radius (mm)"); axs[1].set_ylabel("Blade angle β (deg)")
    sw = d["sweep"]; Jv = np.array(sw["J"])
    axs[2].plot(Jv, sw["eta"], color=C[0], marker="o", ms=2.5, label="η")
    ax2 = axs[2].twinx(); ax2.grid(False)
    ax2.plot(Jv, sw["T"], color=C[1], ls="--", marker="s", ms=2.5, label="Thrust (N)")
    axs[2].axvline(d["J"], color=C[3], ls=":", lw=0.8); axs[2].text(d["J"] + 0.01, 0.05, "design", fontsize=6)
    axs[2].set_xlabel("Advance ratio J (7000 rpm)"); axs[2].set_ylabel("η"); ax2.set_ylabel("Thrust (N)")
    h1, l1 = axs[2].get_legend_handles_labels(); h2, l2 = ax2.get_legend_handles_labels()
    axs[2].legend(h1 + h2, l1 + l2, fontsize=6, loc="center left")
    fig.tight_layout(); save(fig, "f12_prop10")


# ---------------------------------------------------------------- f13 60 MW wind turbine
def f13():
    d = J("wt60"); r = d["rated"]; R = r["R"]
    import pickle
    fig, axs = plt.subplots(1, 3, figsize=(7.1, 2.4))
    # blade from the POT curves file is not stored; rebuild from design json
    des = J("wt60_design") if os.path.exists(os.path.join(DATA, "wt60_design.json")) else None
    if des:
        xi = np.array(des["xi"]); axs[0].plot(xi, np.array(des["c"]) * R, color=C[0], label="Chord (m)")
        ax2 = axs[0].twinx(); ax2.grid(False)
        ax2.plot(xi, des["beta"], color=C[1], ls="--", label="Blade angle (deg)")
        ax2.set_ylabel("Blade angle β (deg)")
        h1, l1 = axs[0].get_legend_handles_labels(); h2, l2 = ax2.get_legend_handles_labels()
        axs[0].legend(h1 + h2, l1 + l2, fontsize=6, loc="upper right")
    axs[0].set_xlabel("r/R"); axs[0].set_ylabel("Chord (m)")
    for k, wk in enumerate(("pot", "grad")):
        cv = [c for c in d["curves"][wk] if c["conv"]]
        axs[1].plot([c["tsr"] for c in cv], [c["CP"] for c in cv], color=C[WK[wk][1]], ls=LS[WK[wk][1]],
                    marker=MK[WK[wk][1]], ms=2.3, label=wk.upper())
    axs[1].axhline(16 / 27, color=C[3], ls=":", lw=0.9); axs[1].text(4.2, 0.57, "Betz 16/27", fontsize=6)
    axs[1].axvline(r["tsr"], color=C[3], ls=":", lw=0.7); axs[1].text(r["tsr"] - 1.6, 0.12, "rated\n(tip-speed limit)", fontsize=5.6)
    axs[1].set_xlabel("Tip-speed ratio ΩR/V"); axs[1].set_ylabel("$C_P$"); axs[1].set_ylim(0.1, 0.62); axs[1].legend(fontsize=6, loc="lower right")
    pc = d["power_curve"]; V = np.array([p["V"] for p in pc]); P = np.array([p["P"] for p in pc]) / 1e6
    pit = np.array([p.get("pitch", 0.0) for p in pc]); T = np.array([p.get("T", np.nan) for p in pc]) / 1e6
    axs[2].plot(V, P, color=C[0], marker="o", ms=2.3, label="Power (MW)")
    axs[2].plot(V, pit, color=C[1], ls="--", marker="s", ms=2.3, label="Pitch to feather (deg)")
    axs[2].plot(V, T * 10, color=C[2], ls="-.", lw=1.0, label="Thrust (MN × 10)")
    axs[2].set_xlabel("Wind speed at hub (m/s)"); axs[2].set_ylabel("MW, deg, MN × 10"); axs[2].legend(fontsize=5.8, loc="center right")
    fig.tight_layout(); save(fig, "f13_wt60")


if __name__ == "__main__":
    for n in (sys.argv[1:] or ["f01", "f02", "f03", "f04", "f05", "f06", "f07", "f08", "f09", "f10", "f11", "f12", "f13"]):
        try:
            globals()[n](); print("ok", n)
        except Exception as ex:
            print("FAIL", n, ex)
