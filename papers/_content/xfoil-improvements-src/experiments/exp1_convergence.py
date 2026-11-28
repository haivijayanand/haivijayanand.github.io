"""
TOOL: exp1_convergence.py - convergence-rate experiment over airfoils x Re x alpha x strategy
FAMILY: xfoil-improvements-paper
VERSION: 1.2.0
DATE: 2026-11-28
CHAT: XFOIL improvements technical paper (Claude, 2026-11-28)
CHANGES: 1.0.0 - first version
         1.1.0 - one JSON file per job (restartable), 2 workers, timing per point
         1.2.0 - added S2b: stock continuation with fixed tighter relaxation bounds (1.0, -0.4) as in QFoil
"""
__version__ = "1.2.0"
import json, sys, time, numpy as np
from concurrent.futures import ProcessPoolExecutor
import xfdrive as X

STOCK = "/home/claude/runs/xfoil699"; TR = "/home/claude/runs/xfoil_tr"
FOILS = ["0012", "2412", "4412", "23012", "0018", "6409"]
RES = [5e4, 1e5, 2e5, 5e5, 1e6, 3e6]
ALPHAS = [round(a, 2) for a in np.arange(-6, 20.01, 0.5)]
STRATS = {
    "S0_cold":        (STOCK, False, "cold", 100),
    "S1_stock20":     (STOCK, False, "stock", 20),
    "S1_stock100":    (STOCK, False, "stock", 100),
    "S2_trust100":    (TR, True, "stock", 100),
    "S3_robust100":   (STOCK, False, "robust", 100),
    "S4_robtrust100": (TR, True, "robust", 100),
    "S2b_fixedtight100": ("/home/claude/runs/xfoil_mod", 2, "stock", 100),
}

import os
OUTD = "/home/claude/work/data/exp1/"

def job(args):
    foil, re_, sname = args
    fn = OUTD + f"{foil}_{re_:g}_{sname}.json"
    if os.path.exists(fn):
        return None
    binary, trust, kind, it = STRATS[sname]
    t = time.time()
    try:
        xf = X.XF(binary, trust=trust, timeout=120)
        xf.load_naca(foil, 160); xf.oper(re_, itmax=it)
        f = {"cold": X.sweep_cold, "stock": X.sweep_stock, "robust": X.sweep_robust}[kind]
        r = f(xf, ALPHAS); xf.close()
    except Exception as e:
        return dict(foil=foil, re=re_, strat=sname, error=str(e)[:200])
    for p in r:
        p.pop("rms", None)
    d = dict(foil=foil, re=re_, strat=sname, pts=r, sec=time.time() - t)
    json.dump(d, open(fn, "w"))
    return None

if __name__ == "__main__":
    jobs = [(f, r, s) for f in FOILS for r in RES for s in STRATS]
    os.makedirs(OUTD, exist_ok=True)
    with ProcessPoolExecutor(2) as ex:
        out = [o for o in ex.map(job, jobs) if o]
    print("done", len(out), "errors", out[:3])
