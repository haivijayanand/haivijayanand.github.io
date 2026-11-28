"""
TOOL: exp_design_space.py - drag over a 2-D design space (thickness x camber factor) at fixed lift
FAMILY: xfoil-improvements-paper
VERSION: 1.0.0
DATE: 2026-11-28
CHAT: XFOIL improvements technical paper (Claude, 2026-11-28)
CHANGES: 1.0.0 - first version: NACA 2412 scaled by GDES TFAC, Cl = 0.6, Re = 3e5, full-precision build
"""
__version__ = "1.0.0"
import json, numpy as np
from concurrent.futures import ProcessPoolExecutor
import xfdrive as X
HP = "/home/claude/runs/xfoil_hp"

def point(args):
    tf, cf = args
    try:
        xf = X.XF(HP, timeout=30); xf.cmd("NACA 2412"); xf.cmd("GDES"); xf.cmd(f"TFAC {tf:.4f} {cf:.4f}")
        xf.cmd("EXEC"); xf.cmd(""); xf.panels(200); xf.oper(3e5, itmax=150)
        for c in (0.2, 0.4):
            xf.cl(c)
        r = xf.cl(0.6); xf.close(); r.pop("rms")
    except TimeoutError:
        xf.p.kill(); r = dict(conv=False, cd_hp=float("nan"), hung=True)
    r["tf"] = tf; r["cf"] = cf
    return r

if __name__ == "__main__":
    T = np.round(np.linspace(0.75, 1.35, 25), 4); Cm = np.round(np.linspace(0.0, 2.5, 25), 4)
    jobs = [(t, c) for c in Cm for t in T]
    with ProcessPoolExecutor(2) as ex:
        out = list(ex.map(point, jobs))
    json.dump(out, open("/home/claude/work/data/design_space.json", "w"))
    print("done", sum(r["conv"] for r in out), len(out))
