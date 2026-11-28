"""
TOOL: exp1_fill.py - re-runs exp1 jobs that hung, restarting XFOIL after any timed-out point
FAMILY: xfoil-improvements-paper
VERSION: 1.0.0
DATE: 2026-11-28
CHAT: XFOIL improvements technical paper (Claude, 2026-11-28)
CHANGES: 1.0.0 - first version
"""
__version__ = "1.0.0"
import json, os, time, math
import xfdrive as X
from exp1_convergence import STRATS, ALPHAS, OUTD

def cold_safe(foil, re_, binary, trust, it):
    def fresh():
        xf = X.XF(binary, trust=trust, timeout=30); xf.load_naca(foil, 160); xf.oper(re_, itmax=it); return xf
    xf = fresh(); out = []; hung = 0
    for a in ALPHAS:
        try:
            xf.init(); r = xf.alfa(a)
        except TimeoutError:
            xf.p.kill(); hung += 1; xf = fresh()
            r = dict(alpha=a, conv=False, iters=it, cl=math.nan, cd=math.nan, cm=math.nan, hung=True)
        r.pop("rms", None); r["work"] = r["iters"]; out.append(r)
    xf.close()
    return out, hung

for foil, re_ in (("0012", 1e5), ("2412", 2e5)):
    s = "S0_cold"; b, tr, kind, it = STRATS[s]; t = time.time()
    pts, hung = cold_safe(foil, re_, b, tr, it)
    json.dump(dict(foil=foil, re=re_, strat=s, pts=pts, sec=time.time() - t, hung=hung),
              open(OUTD + f"{foil}_{re_:g}_{s}.json", "w"))
    print(foil, re_, sum(p["conv"] for p in pts), "hung", hung)
