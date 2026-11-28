"""
TOOL: exp_bl_anatomy.py - boundary-layer distributions (DUMP and CPWR) for one viscous XFOIL solution
FAMILY: xfoil-improvements-paper
VERSION: 1.0.0
DATE: 2026-11-28
CHAT: XFOIL improvements technical paper (Claude, 2026-11-28)
CHANGES: 1.0.0 - first version: NACA 4412, Re = 2e5, alpha = 4 deg, 200 panels
"""
__version__ = "1.0.0"
import json, numpy as np, os
import xfdrive as X
B = "/home/claude/runs/xfoil699"
xf = X.XF(B); xf.load_naca("4412", 200); xf.oper(2e5, itmax=100)
for a in (0, 2, 4):
    r = xf.alfa(a)
for f in ("/tmp/bl.dump", "/tmp/bl.cp"):
    if os.path.exists(f): os.remove(f)
xf.cmd("DUMP /tmp/bl.dump"); xf.cmd("CPWR /tmp/bl.cp"); xf.close()
d = np.genfromtxt("/tmp/bl.dump", comments="#", invalid_raise=False)
cp = np.loadtxt("/tmp/bl.cp", skiprows=3) if open("/tmp/bl.cp").readline().startswith("#") else np.loadtxt("/tmp/bl.cp", skiprows=1)
print(open("/tmp/bl.dump").readline())
out = dict(point=dict(cl=r["cl"], cd=r["cd"], xtr1=r["xtr1"], xtr2=r["xtr2"]), dump=d.tolist(), cp=cp.tolist())
json.dump(out, open("/home/claude/work/data/bl_anatomy.json", "w"))
print(d.shape, cp.shape, r["cl"], r["cd"], r["xtr1"], r["xtr2"])
