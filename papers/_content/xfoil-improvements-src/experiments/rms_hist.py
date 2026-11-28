"""
TOOL: rms_hist.py - Newton RMS histories for one failing point: continuation (stalls) vs cold restart (converges)
FAMILY: xfoil-improvements-paper
VERSION: 1.1.0
DATE: 2026-11-28
CHAT: XFOIL improvements technical paper (Claude, 2026-11-28)
CHANGES: 1.0.0 - first version
         1.1.0 - compares the stalled continuation with a cold restart at the same alpha; records the
                 station of maximum change and the transition station
"""
__version__ = "1.1.0"
import json, re, numpy as np
import xfdrive as X
B = "/home/claude/runs/xfoil699"
foil, re_, a_t = "4412", 2e5, 11.0
xf = X.XF(B); xf.load_naca(foil, 160); xf.oper(re_, itmax=100); xf.init()
for a in np.arange(0, a_t, 0.5):
    xf.alfa(a)
o = xf.cmd(f"ALFA {a_t}"); stock = X.parse_point(o, a_t)
mx = re.findall(r"max:\s*\S+\s+(\w) at\s+(\d+)\s+(\d)", o)[-1]
tr = re.findall(r"Side 1\s+\w+\s+transition at x/c =\s*([0-9.]+)\s+(\d+)", o)[-1]
xf.close()
xf = X.XF(B); xf.load_naca(foil, 160); xf.oper(re_, itmax=100); xf.init()
cold = xf.alfa(a_t); xf.close()
out = dict(case=f"NACA {foil}, Re = 200k, " + r"$\alpha$" + " = 11° (after 0.5° steps from 0°)",
           stock=dict(rms=stock["rms"], conv=stock["conv"], maxvar=mx[0], maxsta=int(mx[1]), side=int(mx[2]),
                      tr_x=float(tr[0]), tr_sta=int(tr[1])),
           cold=dict(rms=cold["rms"], conv=cold["conv"], cl=cold["cl"], cd=cold["cd"]))
json.dump(out, open("/home/claude/work/data/rms_hist.json", "w"))
print(json.dumps({k: (v if k == "case" else {kk: vv for kk, vv in v.items() if kk != "rms"}) for k, v in out.items()}))
print(len(cold["rms"]), [round(x, 5) for x in cold["rms"]])
