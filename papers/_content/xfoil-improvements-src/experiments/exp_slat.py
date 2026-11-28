"""
TOOL: exp_slat.py - slat effect: main-element suction peak with and without a leading-edge slat (inviscid)
FAMILY: xfoil-improvements-paper
VERSION: 1.0.0
DATE: 2026-11-28
CHAT: XFOIL improvements technical paper (Claude, 2026-11-28)
CHANGES: 1.0.0 - first version: NACA 4412 main + 15 % chord NACA 4412 slat, TE gap 2.2 % c, droop 25 deg
"""
__version__ = "1.0.0"
import json, numpy as np
import me_panel as M
Xm, Ym = M.naca4("4412", 101)
xte = 0.03; yu = np.interp(xte, Xm[:101][::-1], Ym[:101][::-1])
Xs, Ys = M.naca4("4412", 61)
xs, ys = M.place(Xs, Ys, chord=0.15, x0=xte - 0.15, y0=yu + 0.025, deflect_deg=-25, pivot=(1.0, 0.0))
gap = float(np.min(np.hypot(xs[0] - Xm, ys[0] - Ym)))
two = M.MultiElement([(Xm, Ym), (xs, ys)]); iso = M.MultiElement([(Xm, Ym)])
rows = []
for a in range(0, 22, 2):
    two.solve(a); iso.solve(a)
    rows.append(dict(alpha=a, cl_two=float(two.cl), cl_main=float(two.cl_el[0]), cl_slat=float(two.cl_el[1]),
                     cpmin_main=float(two.cp[two.eid == 0].min()), cl_iso=float(iso.cl), cpmin_iso=float(iso.cp.min())))
two.solve(12); iso.solve(12)
out = dict(gap=gap, rows=rows, geom=[[Xm.tolist(), Ym.tolist()], [xs.tolist(), ys.tolist()]],
           cp12=dict(x=two.xc.tolist(), cp=two.cp.tolist(), eid=two.eid.tolist()),
           iso12=dict(x=iso.xc.tolist(), cp=iso.cp.tolist()))
json.dump(out, open("/home/claude/work/data/slat.json", "w"))
print("gap", round(gap, 4))
for r in rows: print({k: round(v, 3) for k, v in r.items()})
