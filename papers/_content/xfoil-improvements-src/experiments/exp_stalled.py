"""
TOOL: exp_stalled.py - how close are XFOIL's 'failed' points to the converged answer?
FAMILY: xfoil-improvements-paper
VERSION: 1.0.0
DATE: 2026-11-28
CHAT: XFOIL improvements technical paper (Claude, 2026-11-28)
CHANGES: 1.0.0 - first version: re-runs S1/100 keeping the final RMS of failed points, compares with S3 answers
"""
__version__ = "1.0.0"
import json, math
from concurrent.futures import ProcessPoolExecutor
import xfdrive as X
from exp1_convergence import FOILS, RES, ALPHAS, OUTD

def job(args):
    foil, re_ = args
    xf = X.XF("/home/claude/runs/xfoil699", timeout=60); xf.load_naca(foil, 160); xf.oper(re_, itmax=100)
    up = [a for a in ALPHAS if a >= 0]; dn = [a for a in ALPHAS if a < 0][::-1]
    res = {}
    for seq in (up, dn):
        xf.init()
        for a in seq:
            r = xf.alfa(a)
            rms = r["rms"]
            res[a] = dict(conv=r["conv"], cl=r["cl"], cd=r["cd"], last=rms[-1] if rms else math.nan,
                          tail=(max(rms[-10:]) / max(min(rms[-10:]), 1e-30)) if len(rms) >= 10 else math.nan)
    xf.close()
    ref = json.load(open(OUTD + f"{foil}_{re_:g}_S3_robust100.json"))["pts"]
    out = []
    for a, p in zip(ALPHAS, ref):
        s = res[a]
        if not s["conv"]:
            out.append(dict(foil=foil, re=re_, alpha=a, last=s["last"], tail=s["tail"], cl=s["cl"], cd=s["cd"],
                            ref_conv=p["conv"], ref_cl=p["cl"], ref_cd=p["cd"]))
    return out

if __name__ == "__main__":
    with ProcessPoolExecutor(2) as ex:
        rows = [r for o in ex.map(job, [(f, r) for f in FOILS for r in RES]) for r in o]
    json.dump(rows, open("/home/claude/work/data/stalled.json", "w"))
    print(len(rows))
