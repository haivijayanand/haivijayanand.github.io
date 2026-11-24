#!/usr/bin/env python3
"""
TOOL:    papers/_content/power-grid-management-src/figs.py
FAMILY:  papers
VERSION: 1.2.0
DATE:    2026-11-24
CHAT:    Power and grid management technical paper
CHANGES: 1.2.0 - loss-of-load expectation figure
         1.1.0 - Figure on transformer insulation ageing rate against hot-spot temperature
         1.0.0 - eleven SVG figures; colour-blind safe (blue / orange / grey / black with hatching, no red-green)
STATUS:  working

Run: python3 calc.py && python3 figs.py   -> writes papers/img/<slug>/*.svg
"""
__version__ = "1.2.0"

import json
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

SLUG = "power-grid-management-worldwide"
HERE = Path(__file__).resolve().parent
OUT = HERE.parents[1] / "img" / SLUG
OUT.mkdir(parents=True, exist_ok=True)
R = json.loads((HERE / "calc_results.json").read_text())

BLUE, LBLUE, ORANGE, GREY, DGREY, BLACK = "#1f5a99", "#9cc3f0", "#e08a1e", "#8f969e", "#4a515c", "#111111"
plt.rcParams.update({
    "font.family": "DejaVu Sans", "font.size": 10, "axes.spines.top": False, "axes.spines.right": False,
    "svg.fonttype": "none", "axes.linewidth": 0.9, "lines.linewidth": 2.4, "hatch.linewidth": 0.8,
    "figure.facecolor": "white", "axes.facecolor": "white", "savefig.facecolor": "white",
})


def save(fig, name):
    fig.savefig(OUT / f"{name}.svg", bbox_inches="tight", pad_inches=0.08)
    plt.close(fig)
    print("wrote", name)


def f_timescales():
    rows = [("Protection (relays, breakers)", 0.02, 0.2, BLACK),
            ("Inertia (stored kinetic energy)", 0.001, 10, GREY),
            ("Primary response (governor droop)", 1, 30, BLUE),
            ("Secondary control (AGC)", 30, 900, BLUE),
            ("Tertiary reserves, re-dispatch", 600, 3600, LBLUE),
            ("Real-time and intraday markets", 300, 86400, LBLUE),
            ("Day-ahead scheduling, unit commitment", 3600 * 12, 86400 * 2, ORANGE),
            ("Outage planning, adequacy", 86400 * 7, 86400 * 365, ORANGE),
            ("Transmission and capacity planning", 86400 * 365, 86400 * 365 * 15, GREY)]
    fig, ax = plt.subplots(figsize=(8.6, 4.2))
    for i, (n, a, b, c) in enumerate(rows):
        ax.barh(i, b - a, left=a, color=c, edgecolor=BLACK, height=0.6, hatch="//" if c == LBLUE else "")
        ax.text(a * 0.8, i, n, ha="right", va="center", fontsize=9)
    ax.set_xscale("log")
    ax.set_yticks([])
    ax.invert_yaxis()
    ticks = [1e-3, 1, 60, 3600, 86400, 86400 * 30, 86400 * 365 * 10]
    ax.set_xticks(ticks, ["1 ms", "1 s", "1 min", "1 h", "1 day", "1 month", "10 yr"])
    ax.set_xlim(1e-7, 1e9)
    ax.spines["left"].set_visible(False)
    ax.set_xlabel("Time scale (log)")
    save(fig, "fig1_timescales")


def f_freq():
    fig, ax = plt.subplots(figsize=(7.4, 3.9))
    for key, col, ls, lab in (("sim_H5.0", BLUE, "-", "System inertia H = 5 s"),
                              ("sim_H2.5", ORANGE, "--", "System inertia H = 2.5 s")):
        t, f = zip(*R[key])
        ax.plot(t, f, color=col, ls=ls, label=lab)
    ax.axhline(49.9, color=GREY, lw=1.2, ls=":")
    ax.text(39.5, 49.905, "49.90 Hz (lower edge of India's normal band)", ha="right", fontsize=8.5, color=DGREY)
    ax.axhline(50.0, color=GREY, lw=0.8)
    ax.set_xlabel("Time after losing 4 GW of generation (s)")
    ax.set_ylabel("Frequency (Hz)")
    ax.set_ylim(49.74, 50.02)
    ax.legend(frameon=False, loc="lower right", fontsize=9)
    save(fig, "fig2_frequency_response")


def f_inertia():
    sync = [80, 50, 30]
    rocof = [R[f"rocof_sync{s}"] for s in sync]
    fig, ax = plt.subplots(figsize=(6.6, 3.5))
    b = ax.bar([f"{s} % synchronous" for s in sync], rocof, color=[BLUE, LBLUE, ORANGE], edgecolor=BLACK,
               width=0.55)
    b[1].set_hatch("//"); b[2].set_hatch("\\\\")
    for i, v in enumerate(rocof):
        ax.text(i, v + 0.006, f"{v:.2f} Hz/s", ha="center", fontsize=9.5, weight="bold")
    ax.set_ylabel("Initial RoCoF for a 4 GW loss (Hz/s)")
    ax.set_ylim(0, 0.32)
    save(fig, "fig3_inertia_rocof")


def f_dispatch():
    units = R["ed_units"]
    lam = R["ed_lambda_Rs_per_kWh"]
    fig, ax = plt.subplots(figsize=(7.2, 3.8))
    for (n, b, c, pmin, pmax), col, ls in zip(units, (BLUE, ORANGE, BLACK), ("-", "--", ":")):
        p = np.linspace(pmin, pmax, 50)
        ax.plot(p, b + 2 * c * p, color=col, ls=ls, label=f"{n}: {b} + {2*c:.4f}P")
    ax.axhline(lam, color=GREY, lw=1.4)
    ax.text(20, lam + 0.06, f"system marginal cost λ = ₹{lam:.2f}/kWh", fontsize=9)
    for (n, *_), p, col in zip(units, R["ed_dispatch"], (BLUE, ORANGE, BLACK)):
        ax.plot([p], [lam if p > 60 else units[2][1] + 2 * units[2][2] * p], "o", color=col, ms=8)
    ax.set_xlabel("Unit output P (MW)"); ax.set_ylabel("Marginal cost (₹/kWh)")
    ax.set_ylim(1.8, 5.2); ax.set_xlim(0, 620)
    ax.legend(frameon=False, fontsize=8.8, loc="upper right")
    save(fig, "fig4_dispatch")


def f_losses():
    fig, axes = plt.subplots(1, 2, figsize=(8.8, 3.5), gridspec_kw={"wspace": 0.35})
    ax = axes[0]
    v = ["220 kV", "400 kV", "765 kV"]
    p = [R["loss_220kV_pct"], R["loss_400kV_pct"], R["loss_765kV_pct"]]
    b = ax.bar(v, p, color=[GREY, LBLUE, BLUE], edgecolor=BLACK, width=0.55)
    b[1].set_hatch("//")
    for i, x in enumerate(p):
        ax.text(i, x + 0.2, f"{x:.1f} %", ha="center", fontsize=9.5, weight="bold")
    ax.set_ylabel("I²R loss (% of 500 MW)"); ax.set_ylim(0, 12.5)
    ax.set_title("500 MW over 300 km", fontsize=10.5, weight="bold")
    ax = axes[1]
    v = ["765 kV AC\n(2 circuits)", "±800 kV DC\n(incl. converters)"]
    p = [R["hvac_line_loss_pct"], R["hvdc_total_loss_pct"]]
    b = ax.bar(v, p, color=[GREY, BLUE], edgecolor=BLACK, width=0.5)
    for i, x in enumerate(p):
        ax.text(i, x + 0.12, f"{x:.1f} %", ha="center", fontsize=9.5, weight="bold")
    ax.set_ylabel("Loss (% of 3 GW)"); ax.set_ylim(0, 6.5)
    ax.set_title("3 GW over 1,500 km", fontsize=10.5, weight="bold")
    save(fig, "fig5_losses")


def f_invest():
    fig, axes = plt.subplots(1, 2, figsize=(8.8, 3.6), gridspec_kw={"wspace": 0.35})
    ax = axes[0]
    yrs, val = ["2015", "2025", "2026e"], [315, 450, 550]
    b = ax.bar(yrs, val, color=[GREY, BLUE, LBLUE], edgecolor=BLACK, width=0.55)
    b[2].set_hatch("//")
    for i, x in enumerate(val):
        ax.text(i, x + 10, f"${x} bn", ha="center", fontsize=9.5, weight="bold")
    ax.set_ylabel("Global grid investment (USD bn)"); ax.set_ylim(0, 640)
    ax.set_title("Grids", fontsize=10.5, weight="bold")
    ax = axes[1]
    yrs, val = ["2023", "2024", "2025", "2026f"], [44, 76, 112, 158]
    b = ax.bar(yrs, val, color=[GREY, GREY, BLUE, LBLUE], edgecolor=BLACK, width=0.55)
    b[3].set_hatch("//")
    for i, x in enumerate(val):
        ax.text(i, x + 3, f"{x} GW", ha="center", fontsize=9.5, weight="bold")
    ax.set_ylabel("Storage added (GW, excl. pumped hydro)"); ax.set_ylim(0, 185)
    ax.set_title("Battery storage", fontsize=10.5, weight="bold")
    save(fig, "fig6_investment_storage")


def f_queue():
    fig, ax = plt.subplots(figsize=(7.0, 3.3))
    t = ["Solar", "Storage", "Natural gas", "Wind", "Other"]
    v = [773, 749, 253, 220, 2061 - 773 - 749 - 253 - 220]
    b = ax.barh(t, v, color=[ORANGE, BLUE, GREY, LBLUE, "white"], edgecolor=BLACK)
    b[3].set_hatch("//"); b[4].set_hatch("..")
    for i, x in enumerate(v):
        ax.text(x + 10, i, f"{x} GW", va="center", fontsize=9.5, weight="bold")
    ax.invert_yaxis(); ax.set_xlim(0, 900)
    ax.set_xlabel("Active US interconnection queue, end-2025 (GW; total 2,061 GW)")
    save(fig, "fig7_us_queue")


def f_india():
    fig, axes = plt.subplots(1, 2, figsize=(9.2, 3.8), gridspec_kw={"width_ratios": [1.1, 1], "wspace": 0.45})
    ax = axes[0]
    labs = ["Sep 2023", "May 2024", "Apr 2026", "May 2026"]
    vals = [243.27, 250.0, 256.1, 270.8]
    ax.plot(range(4), vals, color=BLUE, marker="o", ms=8)
    for i, v in enumerate(vals):
        ax.text(i, v + 1.5, f"{v:g}", ha="center", fontsize=9.5, weight="bold")
    ax.set_xticks(range(4), labs, fontsize=9)
    ax.set_ylim(238, 280); ax.set_ylabel("All-India peak demand met (GW)")
    ax.set_title("Peak demand records", fontsize=10.5, weight="bold")
    ax = axes[1]
    names = ["Solar", "Wind", "Hydro", "Bio", "Nuclear", "Fossil"]
    vals = [164.59, 58.14, 57.24, 11.75, 8.78, 552 - 300.5]
    cols = [ORANGE, LBLUE, BLUE, GREY, BLACK, DGREY]
    b = ax.barh(names, vals, color=cols, edgecolor=BLACK)
    b[1].set_hatch("//"); b[5].set_hatch("..")
    for i, v in enumerate(vals):
        ax.text(v + 3, i, f"{v:.0f}", va="center", fontsize=9, weight="bold")
    ax.invert_yaxis(); ax.set_xlim(0, 300); ax.set_xlabel("GW (31 Jul 2026)")
    ax.set_title("Installed capacity ≈ 552 GW", fontsize=10.5, weight="bold")
    save(fig, "fig8_india_demand_capacity")


def f_duck():
    h = np.arange(0, 24.01, 0.25)
    demand = 200 + 45 * np.exp(-((h - 15) / 4.0) ** 2) + 20 * np.exp(-((h - 20.5) / 2.0) ** 2) \
        - 15 * np.exp(-((h - 3.5) / 3) ** 2)
    solar = 56 * np.clip(np.sin((h - 6.2) / 12.6 * np.pi), 0, None) ** 1.3
    net = demand - solar
    fig, ax = plt.subplots(figsize=(7.6, 3.9))
    ax.plot(h, demand, color=BLUE, label="Demand")
    ax.plot(h, net, color=ORANGE, ls="--", label="Net demand (demand − solar)")
    ax.fill_between(h, net, demand, color=LBLUE, alpha=0.5, lw=0, label="Solar")
    i1, i2 = np.argmin(net[40:76]) + 40, np.argmax(net[72:90]) + 72
    ax.annotate("", (h[i2], net[i2]), (h[i1], net[i1]), arrowprops=dict(arrowstyle="->", lw=1.6))
    ax.text(h[i1] + 3.4, net[i1] + 4, f"evening ramp\n≈{net[i2]-net[i1]:.0f} GW", fontsize=9)
    ax.set_xticks(range(0, 25, 3)); ax.set_xlim(0, 24)
    ax.set_xlabel("Hour of day"); ax.set_ylabel("GW")
    ax.legend(frameon=False, fontsize=9, loc="lower left")
    save(fig, "fig9_duck_curve")
    R["duck_ramp"] = float(net[i2] - net[i1])


def f_freqdist():
    fig, ax = plt.subplots(figsize=(6.4, 3.2))
    lab = ["Below 49.90 Hz", "49.90–50.05 Hz", "Above 50.05 Hz"]
    v = [4.58, 78.26, 17.16]
    b = ax.bar(lab, v, color=[GREY, BLUE, ORANGE], edgecolor=BLACK, width=0.55)
    b[2].set_hatch("//")
    for i, x in enumerate(v):
        ax.text(i, x + 1.5, f"{x:.1f} %", ha="center", fontsize=9.5, weight="bold")
    ax.set_ylabel("Share of time, January 2026"); ax.set_ylim(0, 92)
    save(fig, "fig10_india_frequency")


def f_dlr():
    d = R["dlr"]
    v = [float(k) for k in d]
    a = [d[k] for k in d]
    fig, ax = plt.subplots(figsize=(6.6, 3.5))
    ax.plot(v, a, color=BLUE, marker="o", ms=7)
    ax.axhline(a[0], color=GREY, ls=":", lw=1.4)
    ax.text(3.9, a[0] + 15, "static rating (0.6 m/s assumed)", ha="right", fontsize=8.8, color=DGREY)
    for x, y in zip(v, a):
        ax.text(x, y + 25, f"{y:.0f} A", ha="center", fontsize=9)
    ax.set_xlabel("Perpendicular wind speed (m/s)"); ax.set_ylabel("Ampacity at 75 °C (A)")
    ax.set_ylim(650, 1500)
    save(fig, "fig11_dlr")


def f_ageing():
    th = np.linspace(80, 125, 100)
    V = 2 ** ((th - 98) / 6)
    fig, ax = plt.subplots(figsize=(6.8, 3.6))
    ax.semilogy(th, V, color=BLUE)
    for t in (98, 104, 110, 116):
        v = 2 ** ((t - 98) / 6)
        ax.plot([t], [v], "o", color=ORANGE if t > 98 else BLACK, ms=7)
        ax.text(t - 0.6, v * 1.35, f"{v:g}\u00d7", ha="right", fontsize=9, weight="bold")
    ax.axvline(98, color=GREY, ls=":", lw=1.3)
    ax.text(98.5, 0.12, "98 \u00b0C: normal\nageing rate", fontsize=8.8, color=DGREY)
    ax.set_xlabel("Winding hot-spot temperature (\u00b0C)")
    ax.set_ylabel("Relative ageing rate V (log)")
    ax.set_ylim(0.08, 60)
    save(fig, "fig12_transformer_ageing")


def f_lolp():
    d = R["lolp"]
    n = list(d)
    v = [d[k] * 8760 for k in n]
    fig, ax = plt.subplots(figsize=(6.4, 3.4))
    b = ax.bar([f"{k} units\n({int(k)*100} MW)" for k in n], v, color=[ORANGE, LBLUE, BLUE], edgecolor=BLACK, width=0.5)
    b[1].set_hatch("//")
    ax.set_yscale("log")
    for i, x in enumerate(v):
        ax.text(i, x * 1.25, f"{x:.1f} h/yr", ha="center", fontsize=9.5, weight="bold")
    ax.set_ylabel("Expected hours of shortfall (log)")
    ax.set_ylim(0.5, 800)
    save(fig, "fig13_lolp")


for f in (f_lolp, f_ageing, f_timescales, f_freq, f_inertia, f_dispatch, f_losses, f_invest, f_queue, f_india, f_duck, f_freqdist,
          f_dlr):
    f()
print("duck ramp", round(R["duck_ramp"], 1))
