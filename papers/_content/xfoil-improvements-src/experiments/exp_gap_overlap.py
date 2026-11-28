"""
TOOL: exp_gap_overlap.py - inviscid lift of the two-element system over flap gap and overlap
FAMILY: xfoil-improvements-paper
VERSION: 1.0.0
DATE: 2026-11-28
CHAT: XFOIL improvements technical paper (Claude, 2026-11-28)
CHANGES: 1.0.0 - first version: delta_f = 25 deg, alpha = 0, gap offset 0.5-5 % c, overlap -3 to +4 % c
"""
__version__ = "1.0.0"
import json, numpy as np
from matplotlib.path import Path
import me_panel as M
from exp_multielement import config, min_gap
G = np.linspace(0.005, 0.05, 10); O = np.linspace(-0.03, 0.04, 8)
Z = np.full((len(G), len(O)), np.nan); GM = np.full_like(Z, np.nan)
for i, g in enumerate(G):
    for j, o in enumerate(O):
        m, f = config(25, g, overlap=o)
        if Path(np.c_[m[0], m[1]]).contains_points(np.c_[f[0], f[1]]).any():
            continue
        me = M.MultiElement([m, f]); Z[i, j] = me.solve(0.0); GM[i, j] = min_gap(m, f)
json.dump(dict(G=G.tolist(), O=O.tolist(), CL=Z.tolist(), GM=GM.tolist()), open("/home/claude/work/data/gap_overlap.json", "w"))
print(np.round(Z, 3)); print(np.round(GM, 4))
