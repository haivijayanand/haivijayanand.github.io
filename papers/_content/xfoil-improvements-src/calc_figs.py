# -*- coding: utf-8 -*-
"""
TOOL:    calc_figs.py - figures and summary numbers for the XFOIL-improvements paper
FAMILY:  technical-papers / xfoil-improvements-convergence-multielement
VERSION: 1.1.0
DATE:    2026-11-28
CHAT:    XFOIL improvements, history, branches and multi-element airfoils (2026-11-28)
CHANGES: 1.0.0 - first version: timeline, solver flow, convergence statistics, panel density, failure
         propagation, Ncrit, output noise, finite-difference gradients, Mach, multi-element figures
         1.1.0 - converged boundary-layer solution, slat effect and design-space drag map; NeuralFoil comparison
"""
__version__ = "1.1.0"
import json, glob, math, os
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch

# deutan-safe palette (blue, orange, black, grey, sky) always paired with distinct line styles / markers
C = ["#0072B2", "#E69F00", "#000000", "#7f7f7f", "#56B4E9", "#CC79A7", "#332288"]
LS = ["-", "--", "-.", ":", (0, (5, 1, 1, 1)), (0, (3, 1, 1, 1, 1, 1)), (0, (1, 1))]
MK = ["o", "s", "^", "D", "v", "P", "*"]
plt.rcParams.update({"font.size": 8, "font.family": "serif", "axes.linewidth": 0.6,
                     "lines.linewidth": 1.4, "legend.fontsize": 6.8, "legend.frameon": False,
                     "axes.grid": True, "grid.color": "#dddddd", "grid.linewidth": 0.5,
                     "savefig.bbox": "tight", "savefig.pad_inches": 0.03})
FS = (3.4, 2.5)
DATA = "data/"
os.makedirs("fig", exist_ok=True)
R = {}

def save(fig, name):
    fig.savefig(f"fig/{name}.pdf"); fig.savefig(f"fig/{name}.svg"); plt.close(fig)

def J(name):
    return json.load(open(DATA + name))

# ---------------------------------------------------------------- f01 timeline
def f01():
    ev = [(1985, "ISES\n(Drela & Giles)"), (1986, "XFOIL 1.0"), (1988, "Daedalus\nDAI airfoils"),
          (1989, "XFOIL method\npaper"), (1994, "6.1-6.4: BL aligned\nwith MSES"), (1996, "RFOIL\n(TU Delft/ECN)"),
          (2000, "6.9 frozen;\n6.91 under GPL"), (2003, "XFLR5", "c. 2003"), (2010, "QBlade", "c. 2010"),
          (2013, "XFOIL 6.99"), (2014, "Xoptfoil"), (2019, "Viiflow"), (2021, "mfoil"), (2023, "NeuralFoil"),
          (2026, "6.996; flow5 open;\nbrowser ports;\nRFOILVogue")]
    fig, ax = plt.subplots(figsize=(7.0, 2.4))
    ax.axhline(0, color="k", lw=0.8)
    heights = [1.0, -1.0, 2.1, -2.1]
    for k, e in enumerate(ev):
        yr, lab = e[0], e[1]; ys = e[2] if len(e) > 2 else str(yr)
        y = heights[k % 4]
        ax.plot([yr, yr], [0, y * 0.78], color=C[3], lw=0.6)
        ax.plot(yr, 0, "o", color=C[0], ms=3)
        ax.text(yr, y, f"{ys}\n{lab}", ha="center", va="center", fontsize=5.4,
                bbox=dict(fc="white", ec=C[3], lw=0.4, pad=1.0))
    for yr in range(1985, 2030, 5):
        ax.text(yr, -0.18, "", fontsize=5)
    ax.set_xlim(1982, 2029.5); ax.set_ylim(-2.9, 2.9); ax.axis("off")
    save(fig, "f01_timeline")

# ---------------------------------------------------------------- f02 solver flow
def f02():
    fig, ax = plt.subplots(figsize=(3.4, 3.3)); ax.axis("off"); ax.set_xlim(0, 10); ax.set_ylim(0, 11)
    def box(x, y, w, h, t, fc="#eef4fa"):
        ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.08", fc=fc, ec=C[0], lw=0.7))
        ax.text(x + w / 2, y + h / 2, t, ha="center", va="center", fontsize=6.3)
    def arr(x1, y1, x2, y2):
        ax.annotate("", xy=(x2, y2), xytext=(x1, y1), arrowprops=dict(arrowstyle="->", lw=0.7, color="k"))
    box(1, 9.6, 8, 1.0, "Geometry, paneling  →  inviscid panel system factorised;\nmass-influence matrix $D_{ij}$")
    box(1, 8.0, 8, 1.0, "Operating point ($\\alpha$ or $C_L$, Re, M, $N_{crit}$): $u_e^{inv}$ by superposition;\nstagnation point, BL stations, initial guess")
    box(1, 6.2, 8, 1.2, "Assemble residuals: momentum, kinetic-energy shape,\namplification or shear-lag equations; closures;\ntransition interval", fc="#fff4e0")
    box(1, 4.6, 8, 1.0, "BLSOLV: block elimination of the Newton system\n(VACC drops small mass-influence terms)", fc="#fff4e0")
    box(1, 3.0, 8, 1.0, "Relaxation: single global $\\omega$, clip $H_k$;\nupdate $u_e$ from $m$, then $C_L$, $C_D$ (Squire–Young)", fc="#fff4e0")
    box(1, 0.6, 3.6, 1.2, "RMS < $10^{-4}$:\nconverged point")
    box(5.4, 0.6, 3.6, 1.2, "ITER exhausted:\n'Convergence failed'\n(state kept!)", fc="#f3f3f3")
    arr(5, 9.6, 5, 9.0); arr(5, 8.0, 5, 7.4); arr(5, 6.2, 5, 5.6); arr(5, 4.6, 5, 4.0)
    arr(3.5, 3.0, 2.8, 1.8); arr(6.5, 3.0, 7.2, 1.8)
    ax.annotate("", xy=(9.15, 6.8), xytext=(9.15, 3.5), arrowprops=dict(arrowstyle="->", lw=0.7, color=C[1],
                connectionstyle="arc3,rad=-0.45"))
    ax.text(9.95, 5.15, "Newton\niteration", fontsize=6, color="k", ha="center", rotation=90)
    save(fig, "f02_arch")

# ---------------------------------------------------------------- exp1 convergence statistics
SNAMES = {"S0_cold": "S0 cold start each point", "S1_stock20": "S1 continuation, ITER 20 (default)",
          "S1_stock100": "S1 continuation, ITER 100", "S2_trust100": "S2 = S1 + adaptive step bound",
          "S2b_fixedtight100": "S2b = S1 + fixed tighter bounds (QFoil-like)",
          "S3_robust100": "S3 = S1 + recovery/bisection", "S4_robtrust100": "S4 = S3 + adaptive step bound"}
ORDER = list(SNAMES)

def load_exp1():
    rows = []
    for f in sorted(glob.glob(DATA + "exp1/*.json")):
        rows.append(json.load(open(f)))
    return rows

def f03_f05():
    rows = load_exp1()
    res = sorted({r["re"] for r in rows}); foils = sorted({r["foil"] for r in rows})
    tab = {}
    for s in ORDER:
        for re_ in res:
            rr = [r for r in rows if r["strat"] == s and r["re"] == re_ and "pts" in r]
            n = sum(len(r["pts"]) for r in rr); c = sum(sum(p["conv"] for p in r["pts"]) for r in rr)
            w = sum(sum(p.get("work", p["iters"]) for p in r["pts"]) for r in rr)
            tab[(s, re_)] = (c, n, w)
    R["conv_table"] = {s: {f"{re_:g}": tab[(s, re_)] for re_ in res} for s in ORDER}
    tot = {s: (sum(tab[(s, r)][0] for r in res), sum(tab[(s, r)][1] for r in res), sum(tab[(s, r)][2] for r in res)) for s in ORDER}
    R["conv_total"] = tot
    # f03: converged fraction vs Re
    fig, ax = plt.subplots(figsize=(3.4, 3.3))
    for i, s in enumerate(ORDER):
        ax.plot(res, [100 * tab[(s, r)][0] / tab[(s, r)][1] for r in res], color=C[i], ls=LS[i], marker=MK[i], ms=3.5,
                label=SNAMES[s])
    ax.set_xscale("log"); ax.set_xlabel("Chord Reynolds number"); ax.set_ylabel("Converged points (%)")
    ax.set_ylim(None, 101); ax.legend(loc="upper center", bbox_to_anchor=(0.45, -0.2), fontsize=6, ncol=1)
    save(fig, "f03_conv")
    # f04: failure maps S1_stock100 vs S4
    al = [p["alpha"] for p in rows[0]["pts"]]
    alphas = sorted({round(a * 2) / 2 for r in rows if "pts" in r for a in [p["alpha"] for p in r["pts"]]})
    fig, axs = plt.subplots(1, 2, figsize=(7.0, 2.2), sharey=True)
    for k, s in enumerate(["S1_stock100", "S3_robust100"]):
        M = np.zeros((len(res), 53))
        for i, re_ in enumerate(res):
            for r in rows:
                if r["strat"] == s and r["re"] == re_ and "pts" in r:
                    for j, p in enumerate(r["pts"]):
                        M[i, j] += 0 if p["conv"] else 1
        A = np.arange(-6, 20.01, 0.5)
        im = axs[k].imshow(M.T, origin="lower", aspect="auto", cmap="Blues", vmin=0, vmax=6,
                           extent=[-0.5, len(res) - 0.5, A[0] - 0.25, A[-1] + 0.25])
        axs[k].set_xticks(range(len(res))); axs[k].set_xticklabels([f"{r/1e6:g}M" if r >= 1e6 else f"{r/1e3:g}k" for r in res])
        axs[k].set_title(SNAMES[s], fontsize=7); axs[k].set_xlabel("Re"); axs[k].grid(False)
    axs[0].set_ylabel(r"$\alpha$ (deg)")
    cb = fig.colorbar(im, ax=axs, fraction=0.025, pad=0.01); cb.set_label("airfoils failed (of 6)", fontsize=6.5)
    save(fig, "f04_failmap")
    # f05: work per converged point
    fig, ax = plt.subplots(figsize=FS)
    x = np.arange(len(ORDER))
    conv = [100 * tot[s][0] / tot[s][1] for s in ORDER]
    work = [tot[s][2] / max(tot[s][0], 1) for s in ORDER]
    b = ax.bar(x - 0.2, conv, 0.4, color=C[0], label="converged (%)")
    ax2 = ax.twinx(); b2 = ax2.bar(x + 0.2, work, 0.4, color=C[1], hatch="///", edgecolor="k", lw=0.3,
                                   label="Newton iterations per converged point")
    ax.set_xticks(x); ax.set_xticklabels(["S0", "S1/20", "S1/100", "S2", "S2b", "S3", "S4"], fontsize=7)
    ax.set_ylabel("Converged points (%)"); ax2.set_ylabel("Iterations per converged point"); ax2.grid(False)
    ax.set_ylim(60, 100)
    ax.legend(handles=[b, b2], loc="lower center", bbox_to_anchor=(0.5, 1.0), fontsize=6, ncol=2)
    save(fig, "f05_work")

# ---------------------------------------------------------------- rms history example
def f06():
    d = J("rms_hist.json")
    fig, ax = plt.subplots(figsize=FS)
    r = d["stock"]["rms"]
    ax.semilogy(range(1, len(r) + 1), r, color=C[0], ls=LS[0], marker=MK[0], ms=1.8, lw=1.0,
                label="continuation from 10.5° (stalls; 'Convergence failed')")
    r = d["cold"]["rms"]
    ax.semilogy(range(1, len(r) + 1), r, color=C[1], ls=LS[1], marker=MK[1], ms=2.5, label="cold restart at 11° (converges)")
    ax.axhline(1e-4, color=C[3], ls=":", lw=0.8); ax.text(30, 1.5e-4, "tolerance $10^{-4}$", fontsize=6)
    ax.set_xlabel("Newton iteration"); ax.set_ylabel("RMS normalised change"); ax.legend(fontsize=5.8, loc="upper right")
    ax.set_title(d["case"], fontsize=6.5); ax.set_ylim(1e-5, 2)
    R["rms"] = {k: {kk: vv for kk, vv in v.items() if kk != "rms"} for k, v in d.items() if k != "case"}
    R["rms"]["cold_iters"] = len(d["cold"]["rms"])
    save(fig, "f06_rms")

# ---------------------------------------------------------------- panels
def f07():
    d = J("panels.json")
    fig, axs = plt.subplots(1, 2, figsize=(7.0, 2.3))
    cases = [("4412", 2e5, 4.0), ("4412", 2e5, 10.0), ("0012", 3e6, 4.0)]
    for i, (f, re_, a) in enumerate(cases):
        rr = [r for r in d if r["foil"] == f and r["re"] == re_ and r["a"] == a]
        n = np.array([r["n"] for r in rr]); cd = np.array([r["cd"] for r in rr]); cl = np.array([r["cl"] for r in rr])
        ok = np.array([r["conv"] for r in rr])
        lab = f"NACA {f}, Re={re_/1e6:g}M, " + r"$\alpha$" + f"={a:g}°"
        axs[0].plot(n, 100 * (cl / cl[-1] - 1), color=C[i], ls=LS[i], marker=MK[i], ms=3, label=lab)
        axs[1].plot(n, 100 * (cd / cd[-1] - 1), color=C[i], ls=LS[i], marker=MK[i], ms=3, label=lab)
        for ax in axs:
            pass
        bad = n[~ok]
        for b_ in bad:
            axs[1].plot(b_, 100 * (cd[n == b_][0] / cd[-1] - 1), "x", color="k", ms=6, mew=1.2)
    axs[0].set_ylabel(r"$C_l$ change from N=360 (%)"); axs[1].set_ylabel(r"$C_d$ change from N=360 (%)")
    for ax in axs: ax.set_xlabel("Number of panel nodes N")
    axs[1].plot([], [], "x", color="k", label="not converged in 200 iterations")
    axs[1].legend(fontsize=6)
    R["panels"] = [(r["foil"], r["re"], r["a"], r["n"], r["conv"], r["cl"], r["cd"]) for r in d]
    save(fig, "f07_panels")

# ---------------------------------------------------------------- failure propagation
def f08():
    d = J("hysteresis.json")
    fig, axs = plt.subplots(1, 2, figsize=(7.0, 2.3))
    for k, key in enumerate(["4412_200000", "2412_500000"]):
        v = d[key]; ax = axs[k]
        for j, (lab, seq) in enumerate([("upward sweep", v["up"]), ("downward sweep (after failure at 22°)", v["down"])]):
            a = np.array([r["alpha"] for r in seq]); cl = np.array([r["cl"] for r in seq]); ok = np.array([r["conv"] for r in seq])
            a_t = np.arange(0, 22.01, 0.25) if j == 0 else np.arange(0, 22.01, 0.25)[::-1]
            cl_c = np.clip(cl, -0.5, 2.5)
            ax.plot(a_t[ok], cl_c[ok], MK[j], color=C[j], ms=2.6, label=lab + ", converged")
            ax.plot(a_t[~ok], cl_c[~ok], "x", color=C[j] if j == 0 else "k", ms=3.5, mew=0.8, label=lab + ", failed")
        ax.set_xlabel(r"target $\alpha$ (deg)"); ax.set_ylabel(r"$C_l$ (clipped to 2.5)")
        f, re_ = key.split("_"); ax.set_title(f"NACA {f}, Re = {float(re_)/1e3:g}k, 200 panels, ITER 150", fontsize=7)
        ax.set_ylim(-0.6, 2.6)
    axs[0].legend(fontsize=5.6, loc="lower right")
    R["prop"] = {k: (sum(not r["conv"] for r in d[k]["up"]), sum(not r["conv"] for r in d[k]["down"]), len(d[k]["up"])) for k in d}
    save(fig, "f08_failprop")

# ---------------------------------------------------------------- Ncrit
def f09():
    d = J("ncrit.json")
    fig, axs = plt.subplots(1, 2, figsize=(7.0, 2.4))
    for k, (foil, re_) in enumerate([("4412", 2e5), ("4412", 2e6)]):
        ax = axs[k]
        for i, nc in enumerate([1, 5, 9, 13]):
            c = [x for x in d if x["foil"] == foil and x["re"] == re_ and x["ncrit"] == nc][0]
            p = [r for r in c["pts"] if r["conv"]]
            ax.plot([r["cd"] * 1e4 for r in p], [r["cl"] for r in p], color=C[i], ls=LS[i], label=f"$N_{{crit}}$ = {nc}")
        ax.set_xlabel(r"$C_d$ (counts)"); ax.set_ylabel(r"$C_l$"); ax.set_title(f"NACA {foil}, Re = {re_/1e6:g}M", fontsize=7)
        ax.set_xlim(0, 300 if re_ < 1e6 else 200)
    axs[0].legend(fontsize=6)
    tab = {}
    for c in d:
        p = [r for r in c["pts"] if r["conv"]]
        cl = np.array([r["cl"] for r in p]); cd = np.array([r["cd"] for r in p])
        i = np.argmax(cl); o = np.argsort(cl[:i + 1])
        cd06 = float(np.interp(0.6, cl[:i + 1][o], cd[:i + 1][o]))
        tab[f"{c['foil']}_{c['re']:g}_{c['ncrit']}"] = (round(float(cl.max()), 3), round(float(cd.min()), 5), round(cd06, 5))
    R["ncrit"] = tab
    save(fig, "f09_ncrit")

# ---------------------------------------------------------------- noise in alpha
def f10():
    d = J("noise.json")
    fig, axs = plt.subplots(1, 2, figsize=(7.0, 2.3))
    out = {}
    for i, key in enumerate(["2412_1e+06", "4412_200000"]):
        p = [r for r in d[key] if r["conv"]]
        a = np.array([r["alpha"] for r in p]); cd = np.array([r.get("cd_hp", r["cd"]) for r in p])
        cd5 = np.array([r["cd"] for r in p])
        g = np.diff(cd) / np.diff(a); am = 0.5 * (a[1:] + a[:-1])
        axs[0].plot(a, cd * 1e4, color=C[i], ls=LS[i], lw=1.0, label=key.replace("_", ", Re=").replace("1e+06", "1M").replace("200000", "200k"))
        axs[1].plot(am, g * 1e4, color=C[i], lw=0.6, ls=LS[i], label=key.replace("_", ", Re=").replace("1e+06", "1M").replace("200000", "200k"))
        # smooth reference: 15-point moving average of the gradient
        k = 15; gs = np.convolve(g, np.ones(k) / k, mode="same")
        jag = g - gs
        out[key] = dict(n=len(d[key]), nconv=len(p), g_std=float(np.std(jag[k:-k])), g_med=float(np.median(np.abs(gs[k:-k]))),
                        g_min=float(g.min()), g_max=float(g.max()), neg_frac=float(np.mean(g[(am > 0) & (am < 6)] < 0)))
    axs[0].set_xlabel(r"$\alpha$ (deg)"); axs[0].set_ylabel(r"$C_d$ (counts)"); axs[0].legend(fontsize=6, title="NACA", title_fontsize=6)
    axs[1].set_xlabel(r"$\alpha$ (deg)"); axs[1].set_ylabel(r"$dC_d/d\alpha$ (counts/deg), $\Delta\alpha$ = 0.02°")
    R["noise"] = out
    save(fig, "f10_noise")

# ---------------------------------------------------------------- thickness scan and FD gradients
def f11_f12():
    d = J("thickness_scan.json")
    fig, ax = plt.subplots(figsize=FS)
    out = {}
    for i, (k, lab) in enumerate([("re1e6_cl0.5", "Re = 1M"), ("re3e5_cl0.5", "Re = 300k")]):
        p = [r for r in d[k] if r["conv"]]
        t = np.array([r["tfac"] for r in p]) * 12; cd = np.array([r["cd_hp"] for r in p])
        ax.plot(t, cd * 1e4, color=C[i], ls=LS[i], marker=MK[i], ms=1.6, lw=0.8, label=lab)
        g = np.diff(cd) / np.diff(t); signchg = int(np.sum(np.diff(np.sign(g)) != 0))
        out[k] = dict(n=len(d[k]), nconv=len(p), sign_changes=signchg, cd_min=float(cd.min()), cd_max=float(cd.max()))
    ax.set_xlabel("Maximum thickness (% chord), NACA 24xx family via TFAC"); ax.set_ylabel(r"$C_d$ (counts) at $C_l$ = 0.5")
    ax.legend(fontsize=6.5)
    R["tscan"] = out
    save(fig, "f11_tscan")
    g = J("fd_gradient.json")
    fig, ax = plt.subplots(figsize=FS)
    for i, re_ in enumerate([1e6, 3e5]):
        rr = [r for r in g if r["re"] == re_]
        h = np.array([r["h"] for r in rr]); gg = np.array([r["g"] for r in rr]); g5 = np.array([r["g5"] for r in rr])
        ax.semilogx(h, gg * 1e4 / 12, color=C[i], ls=LS[i], marker=MK[i], ms=3, label=f"Re = {re_/1e6:g}M, full precision")
        ax.semilogx(h, g5 * 1e4 / 12, color=C[i], ls=":", marker="x", ms=3, lw=0.8, label=f"Re = {re_/1e6:g}M, 5-decimal output")
    ax.set_xlabel("Relative finite-difference step h in thickness"); ax.set_ylabel(r"$dC_d/d(t/c)$ (counts per % chord)")
    ax.set_ylim(-20, 30); ax.legend(fontsize=5.8)
    R["fd"] = g
    save(fig, "f12_fd")

# ---------------------------------------------------------------- Mach
def f13():
    d = J("mach.json")
    inv = [r for r in d if not r["visc"]]; vis = [r for r in d if r["visc"]]
    M = np.array([r["M"] for r in inv]); cl = np.array([r["cl"] for r in inv]); cpm = np.array([r["cpmin"] for r in inv])
    cps = np.array([r["cpstar"] for r in inv])
    fig, axs = plt.subplots(1, 2, figsize=(7.0, 2.3))
    axs[0].plot(M, cl, color=C[0], marker="o", ms=2.5, label="XFOIL inviscid (Kármán–Tsien)")
    axs[0].plot(M, cl[0] / np.sqrt(1 - M**2), color=C[1], ls="--", label="Prandtl–Glauert from M = 0")
    axs[0].plot([r["M"] for r in vis], [r["cl"] for r in vis], color=C[2], ls="-.", marker="s", ms=2.2, label="XFOIL viscous, Re = 3M")
    axs[0].set_xlabel(r"$M_\infty$"); axs[0].set_ylabel(r"$C_l$, NACA 0012, $\alpha$ = 2°"); axs[0].legend(fontsize=6)
    axs[1].plot(M[1:], -cpm[1:], color=C[0], marker="o", ms=2.5, label=r"$-C_{p,min}$ (XFOIL)")
    axs[1].plot(M[1:], -cps[1:], color=C[1], ls="--", label=r"$-C_p^*$ (sonic)")
    axs[1].set_ylim(0, 4); axs[1].set_xlabel(r"$M_\infty$"); axs[1].set_ylabel("Pressure coefficient (negated)")
    # critical Mach
    f = -cpm + cps
    i = np.where(np.diff(np.sign(cpm - cps)) != 0)[0]
    Mc = None
    if len(i):
        i = i[0]; Mc = float(M[i] + (M[i + 1] - M[i]) * (cpm[i] - cps[i]) / ((cpm[i] - cps[i]) - (cpm[i + 1] - cps[i + 1])))
        for ax in axs: ax.axvline(Mc, color=C[3], ls=":", lw=0.8)
        axs[1].text(Mc + 0.01, 3.4, f"$M_{{cr}}$ ≈ {Mc:.2f}", fontsize=6.5)
    axs[1].legend(fontsize=6)
    R["mach"] = dict(Mcr=Mc, cl=[(float(a), float(b)) for a, b in zip(M, cl)], nconv_visc=sum(r["conv"] for r in vis), n=len(vis))
    save(fig, "f13_mach")

# ---------------------------------------------------------------- multi-element
def f14_f16():
    d = J("multielement.json")
    fig, axs = plt.subplots(1, 2, figsize=(7.0, 2.4), gridspec_kw=dict(width_ratios=[1.0, 1.25]))
    g = d["cp20"]["geom"]
    for k, (x, y) in enumerate(g):
        axs[0].fill(x, y, color=["#cfe0f0", "#fde3b0"][k], ec="k", lw=0.6)
    w = d["wake"]; axs[0].plot(w["x"], w["y"], color=C[2], ls="--", lw=0.8, label="main-element TE streamline")
    axs[0].set_aspect("equal"); axs[0].set_xlim(-0.05, 1.5); axs[0].set_ylim(-0.3, 0.2); axs[0].legend(fontsize=6, loc="upper right")
    axs[0].set_xlabel("x/c"); axs[0].set_ylabel("y/c")
    x = np.array(d["cp20"]["x"]); cp = np.array(d["cp20"]["cp"]); e = np.array(d["cp20"]["eid"])
    axs[1].plot(x[e == 0], cp[e == 0], color=C[0], lw=1.2, label="main element, with flap")
    axs[1].plot(x[e == 1], cp[e == 1], color=C[1], ls="--", lw=1.2, label="flap")
    axs[1].plot(d["iso_cp"]["x"], d["iso_cp"]["cp"], color=C[2], ls=":", lw=1.0, label="main element alone")
    axs[1].invert_yaxis(); axs[1].set_xlabel("x/c"); axs[1].set_ylabel(r"$C_p$"); axs[1].legend(fontsize=6)
    save(fig, "f14_me_cp")
    fig, ax = plt.subplots(figsize=FS)
    out = {}
    for i, gap in enumerate(["0.01", "0.02", "0.04"]):
        rows = d["sweep"][gap]
        dd = [r["defl"] for r in rows]
        gm = np.mean([r["gmin"] for r in rows])
        ax.plot(dd, [r["cl"] for r in rows], color=C[i], ls=LS[i], marker=MK[i], ms=3, label=f"total, gap ≈ {100*gm:.1f}% c")
        if gap == "0.02":
            ax.plot(dd, [r["cl_main"] for r in rows], color=C[3], ls=":", lw=1.0, label="main element (gap ≈ 1.5% c)")
            ax.plot(dd, [r["cl_flap"] for r in rows], color=C[4], ls=(0, (5, 1, 1, 1)), lw=1.0, label="flap (gap ≈ 1.5% c)")
        out[gap] = [(r["defl"], round(r["cl"], 3), round(r["cl_main"], 3), round(r["cl_flap"], 3), round(r["gmin"], 4)) for r in rows]
    ax.set_xlabel(r"Flap deflection $\delta_f$ (deg)"); ax.set_ylabel(r"$C_l$ (ref. main chord), $\alpha$ = 0"); ax.legend(fontsize=5.8)
    R["me"] = dict(sweep=out, iso=d["iso_cl"])
    save(fig, "f15_me_cl")
    fig, ax = plt.subplots(figsize=FS)
    wk = {}
    for i, k in enumerate(["wake10", "wake", "wake30"]):
        w = d[k]; s = np.concatenate([[0], np.cumsum(np.hypot(np.diff(w["x"]), np.diff(w["y"])))])
        q = np.array(w["q"])
        ax.plot(np.array(w["x"]), q, color=C[i], ls=LS[i], label=r"$\delta_f$ = " + {"wake10": "10°", "wake": "20°", "wake30": "30°"}[k])
        im = int(np.argmax(q)); jm = im + int(np.argmin(q[im:]))
        wk[k] = dict(q_te=float(q[0]), q_max=float(q.max()), x_qmax=float(w["x"][im]), q_min_after=float(q[jm]),
                     x_qmin=float(w["x"][jm]), q_end=float(q[-1]), dcp=float(q.max()**2 - q[jm]**2))
    ax.axhline(1.0, color=C[3], lw=0.6)
    ax.axvspan(1.0, 1.30, color="#eeeeee", zorder=0); ax.text(1.02, 0.62, "flap chord\nregion", fontsize=6)
    ax.set_xlabel("x/c along the main-element TE streamline"); ax.set_ylabel(r"$|V|/V_\infty$ (inviscid)"); ax.legend(fontsize=6.5)
    R["wake"] = wk
    save(fig, "f16_me_wake")

# ---------------------------------------------------------------- converged BL solution
def f17():
    d = J("bl_anatomy.json"); D = np.array(d["dump"]); cp = np.array(d["cp"])
    x, cf, H, ue = D[:, 1], D[:, 6], D[:, 7], D[:, 3]
    i0 = int(np.argmin(np.abs(ue)))
    fig, axs = plt.subplots(1, 2, figsize=(7.0, 2.3))
    axs[0].plot(cp[:, 0], cp[:, 1], color=C[0]); axs[0].invert_yaxis()
    axs[0].set_xlabel("x/c"); axs[0].set_ylabel(r"$C_p$")
    xt = d["point"]["xtr1"]
    for ax in axs: ax.axvline(xt, color=C[3], ls=":", lw=0.8)
    axs[0].text(xt + 0.01, -1.0, f"transition\nx/c = {xt:.3f}", fontsize=6)
    xu, Hu, cfu = x[:i0 + 1], H[:i0 + 1], cf[:i0 + 1]
    axs[1].plot(xu, Hu, color=C[0], label="$H$ (upper surface)")
    ax2 = axs[1].twinx(); ax2.plot(xu, cfu * 1e3, color=C[1], ls="--", label=r"$C_f\times10^3$ (upper)")
    ax2.axhline(0, color=C[1], lw=0.5); ax2.grid(False); ax2.set_ylim(-2, 12)
    axs[1].set_xlabel("x/c"); axs[1].set_ylabel("H"); ax2.set_ylabel(r"$C_f \times 10^3$")
    neg = xu[cfu < 0]
    axs[1].axvspan(neg.min(), neg.max(), color="#eeeeee", zorder=0)
    axs[1].text(neg.min() + 0.005, 6.4, "separation bubble", fontsize=6)
    h1, l1 = axs[1].get_legend_handles_labels(); h2, l2 = ax2.get_legend_handles_labels()
    axs[1].legend(h1 + h2, l1 + l2, fontsize=6, loc="upper right")
    R["bl"] = dict(point=d["point"], sep=(float(neg.min()), float(neg.max())), Hmax=float(Hu.max()))
    save(fig, "f17_bl")

# ---------------------------------------------------------------- slat
def f18():
    d = J("slat.json")
    fig = plt.figure(figsize=(7.0, 4.4))
    a1 = fig.add_subplot(2, 2, 1); a2 = fig.add_subplot(2, 2, 2); a3 = fig.add_subplot(2, 1, 2)
    for k, (x, y) in enumerate(d["geom"]):
        a1.fill(x, y, color=["#cfe0f0", "#fde3b0"][k], ec="k", lw=0.6)
    a1.set_aspect("equal"); a1.set_xlim(-0.2, 1.05); a1.set_xlabel("x/c"); a1.set_ylabel("y/c")
    x = np.array(d["cp12"]["x"]); cp = np.array(d["cp12"]["cp"]); e = np.array(d["cp12"]["eid"])
    a2.plot(d["iso12"]["x"], d["iso12"]["cp"], color=C[2], ls=":", label="main alone")
    a2.plot(x[e == 0], cp[e == 0], color=C[0], label="main, with slat")
    a2.plot(x[e == 1], cp[e == 1], color=C[1], ls="--", label="slat")
    a2.set_ylim(2, -10); a2.text(-0.12, -9.3, "slat peak off scale", fontsize=5.5); a2.set_xlabel("x/c"); a2.set_ylabel(r"$C_p$ at $\alpha$ = 12°"); a2.legend(fontsize=6)
    rows = d["rows"]; a = [r["alpha"] for r in rows]
    a3.plot(a, [-r["cpmin_iso"] for r in rows], color=C[2], ls=":", marker="o", ms=2.5, label=r"$-C_{p,min}$ main alone")
    a3.plot(a, [-r["cpmin_main"] for r in rows], color=C[0], marker="s", ms=2.5, label=r"$-C_{p,min}$ main with slat")
    b3 = a3.twinx(); b3.grid(False)
    b3.plot(a, [r["cl_iso"] for r in rows], color=C[3], ls="-.", label=r"$C_l$ main alone")
    b3.plot(a, [r["cl_two"] for r in rows], color=C[1], ls="--", label=r"$C_l$ total with slat")
    b3.plot(a, [r["cl_main"] for r in rows], color=C[4], ls=(0, (5, 1, 1, 1)), label=r"$C_l$ main element with slat")
    a3.set_xlabel(r"$\alpha$ (deg)"); a3.set_ylabel(r"$-C_{p,min}$ on main element"); b3.set_ylabel(r"$C_l$")
    h1, l1 = a3.get_legend_handles_labels(); h2, l2 = b3.get_legend_handles_labels()
    a3.legend(h1 + h2, l1 + l2, fontsize=6, loc="upper left")
    fig.tight_layout()
    R["slat"] = dict(gap=d["gap"], rows=rows)
    save(fig, "f18_slat")

# ---------------------------------------------------------------- design space
def f19():
    d = J("design_space.json")
    T = sorted({r["tf"] for r in d}); Cm = sorted({r["cf"] for r in d})
    Z = np.full((len(Cm), len(T)), np.nan); F = np.zeros_like(Z)
    for r in d:
        i = Cm.index(r["cf"]); j = T.index(r["tf"])
        if r["conv"]:
            Z[i, j] = r["cd_hp"] * 1e4
        else:
            F[i, j] = 1
    fig, ax = plt.subplots(figsize=(3.4, 2.8))
    tt = np.array(T) * 12; cc = np.array(Cm) * 2
    cs = ax.contourf(tt, cc, Z, levels=14, cmap="Blues")
    ax.contour(tt, cc, Z, levels=14, colors="k", linewidths=0.3)
    ii, jj = np.where(F == 1)
    ax.plot(tt[jj], cc[ii], "x", color=C[1], ms=3.5, mew=1.0, label="not converged")
    cb = fig.colorbar(cs, ax=ax); cb.set_label(r"$C_d$ (counts) at $C_l$ = 0.6", fontsize=6.5)
    ax.set_xlabel("Maximum thickness (% chord)"); ax.set_ylabel("Maximum camber (% chord)")
    ax.legend(fontsize=6, loc="upper right"); ax.grid(False)
    k = np.nanargmin(Z); i, j = np.unravel_index(k, Z.shape)
    ax.plot(tt[j], cc[i], "*", color="k", ms=7)
    R["ds"] = dict(n=len(d), nfail=int(F.sum()), cd_min=float(np.nanmin(Z)), t_opt=float(tt[j]), c_opt=float(cc[i]),
                   fail_pts=[(float(tt[b]), float(cc[a])) for a, b in zip(ii, jj)])
    save(fig, "f19_dspace")

# ---------------------------------------------------------------- NeuralFoil comparison
def f20():
    d = J("neuralfoil.json"); rows = d["matrix"]
    res = sorted({r["re"] for r in rows})
    fig, axs = plt.subplots(1, 3, figsize=(7.0, 2.3))
    stats = {}
    for i, re_ in enumerate(res):
        rr = [r for r in rows if r["re"] == re_]
        cx = np.array([r["cd_x"] for r in rr]); cn = np.array([r["cd_n"] for r in rr])
        lx = np.array([r["cl_x"] for r in rr]); ln = np.array([r["cl_n"] for r in rr])
        lab = f"{re_/1e6:g}M" if re_ >= 1e6 else f"{re_/1e3:g}k"
        axs[0].plot(lx, ln, MK[i % 7], color=C[i % 7], ms=1.6, alpha=0.7, label=lab)
        axs[1].loglog(cx * 1e4, cn * 1e4, MK[i % 7], color=C[i % 7], ms=1.6, alpha=0.7, label=lab)
        stats[f"{re_:g}"] = dict(n=len(rr), med_dcl=float(np.median(np.abs(ln - lx))), med_dlncd=float(np.median(np.abs(np.log(cn / cx)))),
                                 p90_dlncd=float(np.percentile(np.abs(np.log(cn / cx)), 90)))
    for ax, lo, hi in ((axs[0], -1.0, 2.0), (axs[1], 30, 3000)):
        ax.plot([lo, hi], [lo, hi], color="k", lw=0.6)
    axs[0].set_xlabel(r"$C_l$ XFOIL"); axs[0].set_ylabel(r"$C_l$ NeuralFoil"); axs[0].legend(fontsize=5.5, markerscale=2, title="Re", title_fontsize=6)
    axs[1].set_xlabel(r"$C_d$ XFOIL (counts)"); axs[1].set_ylabel(r"$C_d$ NeuralFoil (counts)")
    # fine-alpha slope comparison
    nz = J("noise.json")["2412_1e+06"]; p = [r for r in nz if r["conv"]]
    a = np.array([r["alpha"] for r in p]); cd = np.array([r["cd_hp"] for r in p])
    g = np.diff(cd) / np.diff(a); am = 0.5 * (a[1:] + a[:-1])
    axs[2].plot(am, g * 1e4, color=C[0], lw=0.6, label="XFOIL 6.99")
    fa = np.array(d["fine"]["alpha"]); fc = np.array(d["fine"]["cd"])
    gn = np.diff(fc) / np.diff(fa); axs[2].plot(0.5 * (fa[1:] + fa[:-1]), gn * 1e4, color=C[1], ls="--", lw=1.2, label="NeuralFoil")
    axs[2].set_xlabel(r"$\alpha$ (deg)"); axs[2].set_ylabel(r"$dC_d/d\alpha$ (counts/deg)"); axs[2].legend(fontsize=6)
    axs[2].set_title("NACA 2412, Re = 1M", fontsize=7)
    R["nf"] = dict(stats=stats, t_matrix=d["t_nf_matrix"], dmap_sec=d["dmap"]["sec"], n=len(rows))
    fig.tight_layout()
    save(fig, "f20_neuralfoil")

# ---------------------------------------------------------------- stock vs improved polar
def f21():
    d = J("better_polar.json")["6409"]
    AL = np.arange(-4, 16.01, 0.25)
    fig, axs = plt.subplots(1, 2, figsize=(7.0, 2.5))
    st = d["stock20"]; ok = np.array([p["conv"] for p in st])
    cl = np.array([p["cl"] for p in st]); cd = np.array([p["cd"] for p in st])
    def curve(key):
        v = d[key]; m = np.array([p["conv"] for p in v])
        return AL[m], np.array([p["cl"] for p in v])[m], np.array([p["cd"] for p in v])[m]
    for i, (k, lab, ls) in enumerate([("rob_nc7", "$N_{crit}$ = 7", "--"), ("rob_nc9", "$N_{crit}$ = 9", "-"), ("rob_nc11", "$N_{crit}$ = 11", "-.")]):
        a, l, c = curve(k)
        axs[0].plot(a, l, color=[C[4], C[0], C[6]][i], ls=ls, lw=1.1, label="recovery, " + lab)
        axs[1].plot(c * 1e4, l, color=[C[4], C[0], C[6]][i], ls=ls, lw=1.1, label="recovery, " + lab)
    axs[0].plot(AL[ok], cl[ok], "o", color=C[1], ms=2.2, label="default (ITER 20), converged")
    axs[0].plot(AL[~ok], np.full((~ok).sum(), -0.45), "x", color="k", ms=4, label="default, failed (position only)")
    axs[1].plot(cd[ok] * 1e4, cl[ok], "o", color=C[1], ms=2.2)
    axs[0].set_xlabel(r"$\alpha$ (deg)"); axs[0].set_ylabel(r"$C_l$"); axs[0].set_ylim(-0.6, 1.8)
    axs[1].set_xlabel(r"$C_d$ (counts)"); axs[1].set_ylabel(r"$C_l$"); axs[1].set_xlim(0, 400); axs[1].set_ylim(-0.6, 1.8)
    axs[0].legend(fontsize=5.6, loc="lower right")
    fig.suptitle("NACA 6409, Re = 100 000", fontsize=7, y=0.99)
    R["better"] = {k: int(sum(p["conv"] for p in v)) for k, v in d.items()}
    a7, l7, c7 = curve("rob_nc7"); a11, l11, c11 = curve("rob_nc11")
    cmn = np.intersect1d(a7, a11)
    sel7 = np.isin(a7, cmn); sel11 = np.isin(a11, cmn)
    R["better_band"] = dict(clmax7=float(l7.max()), clmax9=float(curve("rob_nc9")[1].max()), clmax11=float(l11.max()),
                            cdmin7=float(c7.min()), cdmin9=float(curve("rob_nc9")[2].min()), cdmin11=float(c11.min()))
    save(fig, "f21_better")

# ---------------------------------------------------------------- gap / overlap map
def f22():
    d = J("gap_overlap.json")
    G = np.array(d["G"]) * 100; O = np.array(d["O"]) * 100; Z = np.array(d["CL"]); GM = np.array(d["GM"]) * 100
    fig, ax = plt.subplots(figsize=(3.4, 2.7))
    cs = ax.contourf(O, G, Z, levels=12, cmap="Blues")
    cl = ax.contour(O, G, GM, levels=[0.5, 1, 2, 3, 4], colors="k", linestyles="--", linewidths=0.6)
    ax.clabel(cl, fmt="gap %.1f%%", fontsize=5.5)
    cb = fig.colorbar(cs, ax=ax); cb.set_label(r"inviscid $C_l$, $\delta_f$ = 25°, $\alpha$ = 0", fontsize=6.5)
    i, j = np.unravel_index(np.nanargmax(Z), Z.shape); ax.plot(O[j], G[i], "*", color=C[1], ms=8, mec="k", mew=0.4)
    ax.set_xlabel("Flap overlap (% c)"); ax.set_ylabel("Flap vertical offset (% c)"); ax.grid(False)
    R["gapmap"] = dict(clmax=float(np.nanmax(Z)), clmin=float(np.nanmin(Z)), at_overlap=float(O[j]), at_offset=float(G[i]),
                       gap_at_max=float(GM[i, j]))
    save(fig, "f22_gapmap")

if __name__ == "__main__":
    import sys
    which = sys.argv[1:] or ["f01", "f02", "f03_f05", "f06", "f07", "f08", "f09", "f10", "f11_f12", "f13", "f14_f16", "f17", "f18", "f19", "f20", "f21", "f22"]
    for w in which:
        try:
            globals()[w](); print("ok", w)
        except Exception as ex:
            print("FAILED", w, repr(ex))
    old = json.load(open("results.json")) if os.path.exists("results.json") else {}
    old.update(R)
    json.dump(old, open("results.json", "w"), indent=1, default=str)
