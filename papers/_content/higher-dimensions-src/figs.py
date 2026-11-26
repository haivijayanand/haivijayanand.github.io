#!/usr/bin/env python3
"""
TOOL:    papers/_content/higher-dimensions-src/figs.py
FAMILY:  papers
VERSION: 1.0.2
DATE:    2026-11-26
CHAT:    Higher dimensions technical paper
CHANGES: 1.0.2 - more room between timeline rows; dark-dimension label left of its bar
         1.0.1 - timeline labels placed by hand with leader lines; length-scale labels beside their bars
         1.0.0 - two charts: timeline of key papers by strand (fig1) and length scales of proposed extra
                 dimensions against experimental reach (fig2); blue / orange / grey with marker shapes
                 (deutan-safe, no red-green pairs)
STATUS:  working

Run: python3 figs.py   (writes img/higher-dimensions-physics-review/fig1_timeline.svg, fig2_length_scales.svg)
"""
__version__ = "1.0.2"

from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

HERE = Path(__file__).resolve().parent
OUT = HERE.parents[1] / "img" / "higher-dimensions-physics-review"
OUT.mkdir(parents=True, exist_ok=True)

BLUE, ORANGE, GREY, DARK = "#1f5fa8", "#e08a00", "#7a7a7a", "#222222"
plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 9, "svg.fonttype": "none"})

# ------------------------------------------------------------------ fig 1: timeline
# (year, label, label-centre year, +1 above / -1 below)
STRANDS = [
    ("Geometry and\ndimensionality", [(1854, "Riemann 1854", 1854, 1), (1884, "Flatland 1884", 1884, -1), (1917, "Ehrenfest 1917", 1917, 1), (1997, "Tegmark 1997", 1990, -1)]),
    ("Spacetime and\nKaluza\u2013Klein", [(1908, "Minkowski 1908", 1897, 1), (1914, "Nordstr\u00f6m 1914", 1903, -1), (1916, "GR 1916", 1917, 1),
                                        (1921, "Kaluza 1921", 1926, -1), (1926, "Klein 1926", 1935, 1)]),
    ("Possibility\nspaces", [(1957, "Everett 1957", 1957, 1), (1970, "DeWitt 1970", 1970, -1), (2003, "Tegmark levels 2003", 2003, 1)]),
    ("Supergravity,\nstrings, M-theory", [(1971, "D = 26 1971", 1958, 1), (1978, "11D SUGRA 1978", 1958, -1), (1984, "Green\u2013Schwarz 1984", 1981, 1),
                                         (1985, "Calabi\u2013Yau 1985", 1982, -1), (1995, "M-theory 1995", 2005, 1), (1997, "AdS/CFT 1997", 2009, -1)]),
    ("Brane worlds", [(1998, "ADD 1998", 1988, 1), (1999, "Randall\u2013Sundrum 1999", 1993, -1), (2022, "Dark dimension 2022", 2020, 1)]),
    ("Landscape and\nswampland", [(2000, "Bousso\u2013Polchinski 2000", 1978, 1), (2003, "KKLT 2003", 1989, -1), (2005, "Swampland 2005", 2007, 1),
                                  (2018, "dS conjecture 2018", 2013, -1), (2025, "DESI link 2025", 2029, 1)]),
    ("Experiment", [(2004, "E\u00f6t-Wash 2004", 1991, 1), (2018, "GW170817 2018", 2006, -1), (2020, "52 \u00b5m test 2020", 2015, 1), (2024, "LHC 13 TeV 2024", 2029, -1)]),
]
MARK = ["o", "s", "D", "^", "v", "P", "X"]
COL = [GREY, BLUE, GREY, BLUE, ORANGE, ORANGE, DARK]

GAP = 1.45
fig, ax = plt.subplots(figsize=(8.4, 5.6))
for i, (name, pts) in enumerate(STRANDS):
    y = (len(STRANDS) - 1 - i) * GAP
    ax.axhline(y, color="#dddddd", lw=0.8, zorder=0)
    for yr, lab, tx, side in pts:
        ty = y + 0.34 * side
        ax.plot([yr, tx], [y + 0.06 * side, ty - 0.08 * side], color="#9a9a9a", lw=0.5, zorder=1)
        ax.text(tx, ty, lab, ha="center", va="bottom" if side > 0 else "top", fontsize=6.5, color=DARK)
    ax.scatter([p[0] for p in pts], [y] * len(pts), marker=MARK[i], s=44, color=COL[i], zorder=3, edgecolor="white", linewidth=0.6)
ax.set_yticks([k * GAP for k in range(len(STRANDS))])
ax.set_yticklabels([s[0] for s in reversed(STRANDS)], fontsize=7.6)
ax.set_xlim(1840, 2042)
ax.set_ylim(-0.75, (len(STRANDS) - 1) * GAP + 0.75)
ax.set_xlabel("Year of publication")
for s in ("top", "right", "left"):
    ax.spines[s].set_visible(False)
ax.tick_params(axis="y", length=0)
ax.axvspan(1995, 2026, color=BLUE, alpha=0.06, zorder=0)
fig.tight_layout()
fig.savefig(OUT / "fig1_timeline.svg")
plt.close(fig)

# ------------------------------------------------------------------ fig 2: length scales
fig, ax = plt.subplots(figsize=(8.4, 3.2))
ax.set_xscale("log")
ax.set_xlim(1e-36, 1e-1)
rows = [
    ("Planck length", 1.6e-35, 1.6e-35, GREY, "point"),
    ("String / Calabi–Yau size (typical)", 1.6e-35, 1e-32, GREY, "band"),
    ("Randall–Sundrum (TeV⁻¹ scale)", 1e-20, 1e-19, BLUE, "band"),
    ("Dark dimension (predicted, 0.1\u201310 \u00b5m)", 1e-7, 1e-5, ORANGE, "band"),
    ("ADD, n = 2 (1998 proposal)", 1e-4, 1e-3, GREY, "band"),
]
for i, (lab, lo, hi, c, kind) in enumerate(rows):
    y = len(rows) - i
    if kind == "point":
        ax.scatter([lo], [y], marker="D", s=40, color=c, zorder=3)
    else:
        ax.plot([lo, hi], [y, y], color=c, lw=7, solid_capstyle="butt", zorder=3)
    if lo > 1e-8:
        ax.text(lo / 30, y, lab, va="center", ha="right", fontsize=7.6, color=DARK)
    else:
        ax.text(hi * 30, y, lab, va="center", ha="left", fontsize=7.6, color=DARK)
# experimental reach
ax.axvspan(4e-5, 1e-1, color=BLUE, alpha=0.10, zorder=0)
ax.text(5e-5, 0.35, "excluded by torsion\nbalances (≈ 40 µm and up)", fontsize=6.8, color=BLUE, va="bottom")
ax.axvline(2e-20, color=DARK, lw=0.9, ls="--")
ax.text(3e-20, 0.35, "LHC probes ≈ 10 TeV⁻¹ ≈ 2×10⁻²⁰ m", fontsize=6.8, color=DARK, va="bottom")
ax.set_ylim(0, len(rows) + 0.8)
ax.set_yticks([])
ax.set_xlabel("Size of the extra dimension (m, log scale)")
for s in ("top", "right", "left"):
    ax.spines[s].set_visible(False)
fig.tight_layout()
fig.savefig(OUT / "fig2_length_scales.svg")
plt.close(fig)
print("wrote", sorted(p.name for p in OUT.iterdir()))
