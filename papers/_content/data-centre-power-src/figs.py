#!/usr/bin/env python3
"""
TOOL:    papers/_content/data-centre-power-src/figs.py
FAMILY:  papers
VERSION: 1.1.0
DATE:    2026-11-24
CHAT:    Data centre power surge and efficiency technical paper
CHANGES: 1.1.0 - Figure 10 waterfall of the Chennai site case; label fixes
         1.0.0 - ten SVG figures for the paper; colour-blind safe (blue / orange / grey / black + hatching, no red-green)
STATUS:  working

Run: python3 calc.py && python3 figs.py   -> writes papers/img/<slug>/*.svg
"""
__version__ = "1.1.0"

import json
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

SLUG = "data-centre-power-demand-efficiency"
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


# ---------------------------------------------------------------- F1 layers diagram
def f_layers():
    fig, ax = plt.subplots(figsize=(8.6, 4.6))
    ax.set_xlim(0, 100); ax.set_ylim(0, 60); ax.axis("off")
    layers = [
        ("Grid connection", "flexible load, on-site storage,\ngrid-enhancing technologies", GREY),
        ("Power chain", "fewer conversions, 800 V DC,\nhigh-efficiency UPS and PSUs", LBLUE),
        ("Cooling plant", "liquid cooling, warmer water,\nvariable speed, AI control", LBLUE),
        ("IT hardware", "newer chips, retire idle servers,\nraise utilisation", BLUE),
        ("Software and models", "smaller models, batching,\nscheduling, caching", BLUE),
    ]
    y = 50
    for i, (name, lever, col) in enumerate(layers):
        x0 = 4 + i * 2.2
        w = 46 - i * 4.4
        ax.add_patch(FancyBboxPatch((x0, y), w, 8, boxstyle="round,pad=0.25,rounding_size=1.2",
                                    fc=col, ec=BLACK, lw=1.0))
        ax.text(x0 + w / 2, y + 4, name, ha="center", va="center", fontsize=10.5, weight="bold",
                color="white" if col in (BLUE, GREY) else BLACK)
        ax.add_patch(FancyArrowPatch((x0 + w + 1.2, y + 4), (55, y + 4), arrowstyle="-|>", mutation_scale=12,
                                     color=DGREY, lw=1.2))
        ax.text(56, y + 4, lever, ha="left", va="center", fontsize=9.2)
        y -= 10
    ax.text(25, 2.5, "Useful work: computation delivered to users", ha="center", va="center",
            fontsize=10, style="italic")
    ax.add_patch(FancyArrowPatch((25, 9.5), (25, 5), arrowstyle="-|>", mutation_scale=14, color=BLACK, lw=1.4))
    ax.text(56, 59.5, "Where the watts can be won back:", fontsize=10, weight="bold")
    save(fig, "fig1_layers")


# ---------------------------------------------------------------- F2 demand path
def f_demand():
    fig, ax = plt.subplots(figsize=(7.6, 4.0))
    yrs = ["2024", "2025\n(est.)", "2030", "2035"]
    vals = [415, round(415 * 1.17), 945, 1200]
    bars = ax.bar(yrs, vals, color=[BLUE, BLUE, LBLUE, LBLUE], edgecolor=BLACK, width=0.62)
    for b in bars[2:]:
        b.set_hatch("//")
    for b, v in zip(bars, vals):
        ax.text(b.get_x() + b.get_width() / 2, v + 25, f"{v:,}", ha="center", fontsize=10, weight="bold")
    ax.plot([3], [970], marker="v", ms=10, color=ORANGE, ls="none", label="High Efficiency case 2035 (≈970)")
    ax.plot([3], [1700], marker="^", ms=10, color=BLACK, ls="none", label="Lift-Off case 2035 (>1,700)")
    ax.set_ylabel("Data-centre electricity (TWh/yr)")
    ax.set_ylim(0, 1850)
    ax.legend(frameon=False, loc="upper left", fontsize=9)
    ax.set_xlabel("Solid: estimate     Hatched: IEA Base Case projection", fontsize=8.8, color=DGREY)
    save(fig, "fig2_demand")


# ---------------------------------------------------------------- F3 PUE trend
def f_pue():
    fig, ax = plt.subplots(figsize=(7.6, 3.8))
    x = [2007, 2018, 2019, 2025, 2026]
    y = [2.50, 1.58, 1.67, 1.54, 1.52]
    ax.plot(x, y, color=BLUE, marker="o", ms=7, lw=2.2)
    ax.fill_between([2020, 2025], 1.54, 1.59, color=LBLUE, alpha=0.6, lw=0)
    ax.text(2022.5, 1.64, "2020–2025:\n1.54–1.59", ha="center", fontsize=8.5)
    for a, b in zip(x, y):
        if a in (2007, 2018, 2026):
            ax.text(a, b + 0.06, f"{b:.2f}", ha="center", fontsize=9, weight="bold")
    ax.axhline(1.10, color=ORANGE, ls="--", lw=2)
    ax.text(2007.3, 1.13, "efficient hyperscale ≈ 1.1", color=BLACK, fontsize=9)
    ax.axhline(1.0, color=DGREY, lw=1)
    ax.text(2007.3, 1.02, "ideal (all power to IT) = 1.0", fontsize=8.5, color=DGREY)
    ax.set_xlim(2006, 2027.5); ax.set_ylim(0.95, 2.7)
    ax.set_ylabel("Average annual PUE")
    ax.set_xticks([2007, 2010, 2014, 2018, 2022, 2026])
    ax.set_xlabel("Survey year")
    save(fig, "fig3_pue_trend")


# ---------------------------------------------------------------- F4 where energy goes
def f_split():
    cases = [("Legacy enterprise\nPUE 1.80", 1.80), ("Global average\nPUE 1.54", 1.54),
             ("Good new build\nPUE 1.25", 1.25), ("Efficient hyperscale\nPUE 1.10", 1.10)]
    fig, ax = plt.subplots(figsize=(7.8, 3.9))
    for i, (lab, p) in enumerate(cases):
        it = 1 / p * 100
        oh = 100 - it
        cool, pwr, oth = oh * 0.70, oh * 0.20, oh * 0.10
        left = 0
        for val, col, h, name in ((it, BLUE, "", "IT equipment"), (cool, ORANGE, "", "Cooling"),
                                  (pwr, GREY, "//", "Power losses"), (oth, "white", "..", "Lighting, other")):
            ax.barh(i, val, left=left, color=col, edgecolor=BLACK, hatch=h, height=0.62,
                    label=name if i == 0 else None)
            if val > 6:
                ax.text(left + val / 2, i, f"{val:.0f}%", ha="center", va="center", fontsize=9,
                        color="white" if col == BLUE else BLACK, weight="bold")
            left += val
    ax.set_yticks(range(len(cases)), [c[0] for c in cases])
    ax.invert_yaxis()
    ax.set_xlim(0, 100); ax.set_xlabel("Share of facility electricity (%)")
    ax.legend(ncol=4, frameon=False, loc="lower center", bbox_to_anchor=(0.45, -0.38), fontsize=9)
    save(fig, "fig4_energy_split")


# ---------------------------------------------------------------- F5 affinity
def f_affinity():
    import numpy as np
    s = np.linspace(0.3, 1.0, 100)
    hs = 0.30
    fig, ax = plt.subplots(figsize=(7.2, 4.0))
    ax.plot(s * 100, s ** 3 * 100, color=BLUE, label="Fan or pump, no static head:  P ∝ N³")
    ax.plot(s * 100, s * (hs + (1 - hs) * s ** 2) * 100, color=ORANGE, ls="--",
            label="Pump with 30 % static head")
    ax.plot(s * 100, s * 100, color=GREY, ls=":", label="Proportional (for reference)")
    ax.plot([80], [51.2], "o", color=BLACK, ms=8)
    ax.annotate("80 % speed → 51 % power", (80, 51.2), (46, 70), fontsize=9.5,
                arrowprops=dict(arrowstyle="->", color=BLACK))
    ax.plot([100 * 5 / 6], [(5 / 6) ** 3 * 100], "s", color=BLACK, ms=7)
    ax.annotate("N+1: six fans at 83 % share\nthe load of five → 69 % power",
                (100 * 5 / 6, (5 / 6) ** 3 * 100), (84, 22), fontsize=9,
                arrowprops=dict(arrowstyle="->", color=BLACK))
    ax.set_xlabel("Speed or flow (% of design)"); ax.set_ylabel("Shaft power (% of design)")
    ax.set_xlim(30, 102); ax.set_ylim(0, 105)
    ax.legend(frameon=False, loc="upper left", fontsize=9)
    save(fig, "fig5_affinity")


# ---------------------------------------------------------------- F6 chiller COP
def f_chiller():
    import numpy as np
    chw = np.linspace(6, 24, 50)
    fig, ax = plt.subplots(figsize=(7.2, 3.9))
    for tc, col, ls in ((35, BLUE, "-"), (40, ORANGE, "--"), (45, BLACK, ":")):
        te = chw - 2 + 273.15
        cop = 0.5 * te / (tc + 273.15 - te)
        ax.plot(chw, cop, color=col, ls=ls, label=f"condensing {tc} °C")
    ax.axvspan(6, 8, color=LBLUE, alpha=0.5, lw=0)
    ax.text(7, 9.6, "classic\n7 °C", ha="center", fontsize=8.5)
    ax.axvspan(17, 19, color=LBLUE, alpha=0.5, lw=0)
    ax.text(18, 9.6, "warm\n18 °C", ha="center", fontsize=8.5)
    ax.set_xlabel("Chilled-water supply temperature (°C)")
    ax.set_ylabel("Chiller COP (50 % of Carnot)")
    ax.set_ylim(2, 11)
    ax.legend(frameon=False, loc="upper left", bbox_to_anchor=(0.12, 1.0), fontsize=9)
    save(fig, "fig6_chiller_cop")


# ---------------------------------------------------------------- F7 power chain
def f_chain():
    fig, axes = plt.subplots(1, 2, figsize=(8.8, 3.6), sharey=True)
    for ax, key, title in ((axes[0], "chain_legacy", "Legacy AC chain"),
                           (axes[1], "chain_upgraded", "Upgraded chain")):
        st = R[key]
        level = 100.0
        names, vals = ["Grid input"], [level]
        for n, e in st.items():
            level *= e
            names.append(n)
            vals.append(level)
        cols = [GREY] + [BLUE] * (len(vals) - 1)
        b = ax.bar(range(len(vals)), vals, color=cols, edgecolor=BLACK, width=0.66)
        for i, v in enumerate(vals):
            ax.text(i, v + 1.2, f"{v:.1f}", ha="center", fontsize=8.8, weight="bold")
        ax.set_xticks(range(len(vals)), names, rotation=32, ha="right", fontsize=8.4)
        ax.set_ylim(70, 104)
        ax.set_title(title, fontsize=10.5, weight="bold")
    axes[0].set_ylabel("Power remaining (% of grid input)")
    save(fig, "fig7_power_chain")


# ---------------------------------------------------------------- F8 server model
def f_server():
    import numpy as np
    u = np.linspace(0.02, 1, 100)
    p = 180 + 220 * u
    fig, ax = plt.subplots(figsize=(7.2, 3.9))
    ax.plot(u * 100, p, color=BLUE, label="Server power (W), left axis")
    ax.set_xlabel("CPU utilisation (%)"); ax.set_ylabel("Server power (W)")
    ax.set_ylim(0, 420)
    ax2 = ax.twinx()
    ax2.spines["right"].set_visible(True)
    ax2.plot(u * 100, p / (u * 100), color=ORANGE, ls="--", label="Energy per unit of work, right axis")
    ax2.set_ylabel("W per % utilisation")
    ax2.set_ylim(0, 40)
    for uu in (12, 50):
        ax2.plot([uu], [(180 + 2.2 * uu) / uu], "o", color=BLACK, ms=7)
    ax2.annotate("at 12 %: 17.2 W per %", (12, 17.2), (20, 27), fontsize=9, arrowprops=dict(arrowstyle="->"))
    ax2.annotate("at 50 %: 5.8 W per %", (50, 5.8), (56, 14), fontsize=9, arrowprops=dict(arrowstyle="->"))
    h1, l1 = ax.get_legend_handles_labels(); h2, l2 = ax2.get_legend_handles_labels()
    ax.legend(h1 + h2, l1 + l2, frameon=False, loc="lower center", bbox_to_anchor=(0.5, -0.38), ncol=2, fontsize=9)
    save(fig, "fig8_server_model")


# ---------------------------------------------------------------- F9 India
def f_india():
    fig, axes = plt.subplots(1, 2, figsize=(9.0, 3.8), gridspec_kw={"width_ratios": [1.25, 1], "wspace": 0.42})
    ax = axes[0]
    x = [2016, 2020, 2025, 2026.5]
    y = [296, 375, 1500, 1789]
    ax.plot(x, y, color=BLUE, marker="o", ms=7)
    ax.plot([2026.5, 2030], [1789, 4000], color=BLUE, ls="--", lw=2)
    ax.plot([2030], [4000], marker="^", color=ORANGE, ms=10, ls="none")
    for a, b, t in ((2016, 296, "296"), (2020, 375, "375"), (2025, 1500, "≈1,500"),
                    (2026.5, 1789, "1,789\n(H1 2026)"), (2030, 4000, ">4,000\n(projected)")):
        ax.text(a, b + 180, t, ha="center", fontsize=8.6)
    ax.set_xticks([2016, 2020, 2024, 2028])
    ax.set_ylabel("Operational IT capacity (MW)"); ax.set_xlim(2015, 2031.5); ax.set_ylim(0, 4900)
    ax.set_title("India: capacity growth", fontsize=10.5, weight="bold")
    ax = axes[1]
    cities = ["Mumbai", "Chennai", "Bengaluru", "Hyderabad", "Delhi-NCR"]
    mw = [790, 305, 182, 152, 76]
    b = ax.barh(cities, mw, color=[GREY, ORANGE, GREY, GREY, GREY], edgecolor=BLACK)
    b[1].set_hatch("//")
    for i, v in enumerate(mw):
        ax.text(v + 15, i, f"{v}", va="center", fontsize=9, weight="bold")
    ax.invert_yaxis(); ax.set_xlabel("MW (2025)"); ax.set_xlim(0, 950)
    ax.set_title("By city, 2025", fontsize=10.5, weight="bold")
    save(fig, "fig9_india")


# ---------------------------------------------------------------- F10 wedges
def f_wedges():
    fig, ax = plt.subplots(figsize=(8.4, 4.4))
    cols = [BLUE, LBLUE, GREY, ORANGE]
    hatches = ["", "//", "..", "\\\\"]
    ax.bar(0, 415, color=DGREY, edgecolor=BLACK, width=0.6)
    ax.text(0, 430, "415", ha="center", weight="bold")
    ax.bar(1, 945, color=DGREY, edgecolor=BLACK, width=0.6)
    ax.text(1, 960, "945", ha="center", weight="bold")
    for xi, tag in ((2, "low"), (3, "high")):
        c = R["wedges"][tag]
        tot = c["total_new"]
        ax.bar(xi, tot, color=DGREY, edgecolor=BLACK, width=0.6)
        bottom = tot
        for (name, v), col, h in zip(c["wedges"].items(), cols, hatches):
            ax.bar(xi, v, bottom=bottom, color=col, edgecolor=BLACK, hatch=h, width=0.6,
                   label=name if tag == "low" else None)
            bottom += v
        ax.text(xi, tot / 2, f"{tot:.0f}", ha="center", color="white", weight="bold")
        ax.text(xi, 960, f"−{c['saving']:.0f}\n({c['share_of_growth_pct']:.0f} % of growth)",
                ha="center", fontsize=8.8)
    ax.set_xticks(range(4), ["2024\nactual", "2030\nIEA Base", "2030 with\nlow efficiency\npush",
                             "2030 with\nhigh efficiency\npush"])
    ax.set_ylabel("TWh/yr"); ax.set_ylim(0, 1120)
    ax.legend(frameon=False, fontsize=8.8, loc="upper center", bbox_to_anchor=(0.5, -0.22), ncol=2)
    save(fig, "fig10_wedges")


# ---------------------------------------------------------------- F11 site case waterfall
def f_case():
    case = R["case"]
    labels = ["Baseline", "Idle servers,\nconsolidation", "Containment,\nset points", "Fans, VSDs,\npumps",
              "Warmer chilled\nwater", "UPS, PSUs", "Condition\nmonitoring", "Lighting,\ncontrols", "After"]
    fig, ax = plt.subplots(figsize=(9.6, 4.2))
    prev = case[0]["site_kW"]
    ax.bar(0, prev, color=DGREY, edgecolor=BLACK, width=0.62)
    ax.text(0, prev + 80, f"{prev:,.0f}\nPUE {case[0]['pue']:.2f}", ha="center", fontsize=9, weight="bold")
    for i, c in enumerate(case[1:], 1):
        d = prev - c["site_kW"]
        ax.bar(i, d, bottom=c["site_kW"], color=ORANGE if i in (2, 3, 4, 6) else (BLUE if i in (1, 5) else GREY),
               edgecolor=BLACK, width=0.62, hatch="//" if i in (2, 3, 4, 6) else "")
        ax.text(i, prev + 80, f"\u2212{d:,.0f}", ha="center", fontsize=8.6)
        prev = c["site_kW"]
    n = len(case)
    ax.bar(n, prev, color=BLUE, edgecolor=BLACK, width=0.62)
    ax.text(n, prev + 80, f"{prev:,.0f}\nPUE {case[-1]['pue']:.2f}", ha="center", fontsize=9, weight="bold")
    ax.set_xticks(range(n + 1), labels, fontsize=8.2, rotation=35, ha="right")
    ax.set_ylabel("Site power (kW)"); ax.set_ylim(4000, 7800)
    save(fig, "fig11_site_case")


for f in (f_case, f_layers, f_demand, f_pue, f_split, f_affinity, f_chiller, f_chain, f_server, f_india, f_wedges):
    f()
