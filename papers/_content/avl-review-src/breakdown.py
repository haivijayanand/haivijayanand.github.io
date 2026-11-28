"""
TOOL:    breakdown.py - per-surface contributions to key derivatives for the AVL review paper
FAMILY:  aero-codes
VERSION: 1.0.0
DATE:    2026-11-28
CHAT:    AVL (Athena Vortex Lattice) technical paper - history, usage, improvements, limitations
CHANGES: 1.0.0 - first version
"""
__version__ = "1.0.0"
import json, numpy as np
import vlm_uav as V
r = json.load(open("results.json"))
v = V.VLM(V.uav_surfaces(scale=1.5), V.REF["Sref"], V.REF["cref"], V.REF["bref"], V.REF["xref"])
a, de = r["trim"]["alpha"], r["trim"]["elevator"]; defl = {"elevator": de}
tags = np.array(v.lat["tag"]); qS = 0.5 * v.S
def coeffs(res, mask):
    F = res["F"][mask]; mid = v.mid[mask]
    M = np.cross(mid - v.rref, F).sum(0); Ft = F.sum(0); al = np.radians(a)
    ca, sa = np.cos(al), np.sin(al)
    return dict(CL=-(-Ft[0]*sa + Ft[2]*ca)/qS, Cm=M[1]/(qS*v.c), Cl=(M[0]*ca+M[2]*sa)/(qS*v.b),
                Cn=(-M[0]*sa+M[2]*ca)/(qS*v.b), CY=Ft[1]/qS)
out = {}
pert = {"a": (dict(alpha=a+0.5), dict(alpha=a-0.5), np.radians(1.0)),
        "b": (dict(alpha=a, beta=0.5), dict(alpha=a, beta=-0.5), np.radians(1.0)),
        "p": (dict(alpha=a, p=0.01), dict(alpha=a, p=-0.01), 0.02),
        "q": (dict(alpha=a, q=0.01), dict(alpha=a, q=-0.01), 0.02),
        "r": (dict(alpha=a, r=0.01), dict(alpha=a, r=-0.01), 0.02)}
res = {k: (v.solve(**p, defl=defl), v.solve(**m, defl=defl), h) for k, (p, m, h) in pert.items()}
for t in ["Wing", "Htail", "Vtail"]:
    mask = tags == t; out[t] = {}
    for k, (rp, rm, h) in res.items():
        cp, cm = coeffs(rp, mask), coeffs(rm, mask)
        out[t][k] = {c: (cp[c] - cm[c]) / h for c in cp}
json.dump(out, open("breakdown.json", "w"), indent=1)
for t in out:
    o = out[t]
    print(t, "CLa %.3f Cma %.3f Clb %.4f Cnb %.4f CYb %.4f Clp %.4f Cnp %.4f Cmq %.2f Cnr %.4f Clr %.4f" % (
        o["a"]["CL"], o["a"]["Cm"], o["b"]["Cl"], o["b"]["Cn"], o["b"]["CY"], o["p"]["Cl"], o["p"]["Cn"], o["q"]["Cm"], o["r"]["Cn"], o["r"]["Cl"]))
