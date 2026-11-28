"""
TOOL: exp_better_polar.py - stock default polar vs recovered polar with an Ncrit band (illustrates remedies 1, 2, 5, 8)
FAMILY: xfoil-improvements-paper
VERSION: 1.0.0
DATE: 2026-11-28
CHAT: XFOIL improvements technical paper (Claude, 2026-11-28)
CHANGES: 1.0.0 - first version: NACA 6409 and NACA 4412 at Re = 1e5
"""
__version__ = "1.0.0"
import json, numpy as np
import xfdrive as X
B = "/home/claude/runs/xfoil699"
AL = [round(a, 2) for a in np.arange(-4, 16.01, 0.25)]
out = {}
for foil in ("6409", "4412"):
    d = {}
    xf = X.XF(B); xf.load_naca(foil, 160); xf.oper(1e5, itmax=20)
    d["stock20"] = X.sweep_stock(xf, AL); xf.close()
    for nc in (7, 9, 11):
        xf = X.XF(B); xf.load_naca(foil, 200); xf.oper(1e5, ncrit=nc, itmax=100)
        d[f"rob_nc{nc}"] = X.sweep_robust(xf, AL); xf.close()
    for v in d.values():
        for p in v: p.pop("rms", None)
    out[foil] = d
    print(foil, {k: sum(p["conv"] for p in v) for k, v in d.items()}, len(AL))
json.dump(out, open("/home/claude/work/data/better_polar.json", "w"))
