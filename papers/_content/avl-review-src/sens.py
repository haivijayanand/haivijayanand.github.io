"""
TOOL:    sens.py - parametric sensitivity runs (dihedral, tail size, CG) for the AVL review paper
FAMILY:  aero-codes
VERSION: 1.0.0
DATE:    2026-11-28
CHAT:    AVL (Athena Vortex Lattice) technical paper - history, usage, improvements, limitations
CHANGES: 1.0.0 - first version
"""
__version__ = "1.0.0"
import json, numpy as np
import vlm_uav as V

def surfaces(dihedral=3.0, ht_span=0.30, vt_h=0.25, scale=1.0):
    t = np.tan(np.radians(dihedral)); nsw=int(16*scale); ncw=int(8*scale)
    wi = V.Surface("Wing", [(0,0,0,0.26,2.0),(0.02,0.5,0.5*t,0.22,1.0)], ncw, nsw//2, camber=(0.02,0.4), ydup=True)
    wo = V.Surface("Wing", [(0.02,0.5,0.5*t,0.22,1.0),(0.04,1.0,1.0*t,0.18,0.0)], ncw, nsw//2, camber=(0.02,0.4), ydup=True,
                   control=dict(name="aileron", xhinge=0.75, gain=1.0, sgndup=-1.0))
    ht = V.Surface("Htail", [(0.95,0,0.05,0.14,-1.0),(0.97,ht_span,0.05,0.11,-1.0)], 6, 8, ydup=True,
                   control=dict(name="elevator", xhinge=0.6, gain=1.0, sgndup=1.0))
    vt = V.Surface("Vtail", [(0.93,0,0.05,0.20,0),(1.00,0,0.05+vt_h,0.12,0)], 6, 6, vertical=True,
                   control=dict(name="rudder", xhinge=0.6, gain=1.0, sgndup=1.0))
    return [wi, wo, ht, vt]

def run(**kw):
    v = V.VLM(surfaces(**kw), V.REF["Sref"], V.REF["cref"], V.REF["bref"], V.REF["xref"])
    W = V.MASS["m"]*V.FLIGHT["g"]; Q = 0.5*V.FLIGHT["rho"]*V.FLIGHT["V"]**2
    a, de, rt = V.trim(v, W/(Q*V.REF["Sref"]))
    base, d = V.derivatives(v, a, {"elevator": de})
    lo, la, _, _ = V.eigen(d, base, a)
    ml, mt = V.describe(lo), V.describe(la)
    xnp = V.REF["xref"][0] - d["a"]["Cm"]/d["a"]["CL"]*V.REF["cref"]
    return dict(kw=kw, alpha=a, de=de, Clb=d["b"]["Cl"], Cnb=d["b"]["Cn"], Cmq=d["q"]["Cm"], Cnr=d["r"]["Cn"],
                SM=(xnp-V.REF["xref"][0])/V.REF["cref"], sp_zeta=ml[0]["zeta"], dr_zeta=mt[0]["zeta"], dr_wn=mt[0]["wn"],
                spiral=mt[2]["re"], roll_tau=1/abs(mt[1]["re"]))

out = {"dihedral": [run(dihedral=g) for g in [0.0, 3.0, 6.0]],
       "htail": [run(ht_span=s) for s in [0.25, 0.30, 0.36]],
       "vtail": [run(vt_h=h) for h in [0.20, 0.25, 0.30]]}
json.dump(out, open("sens.json","w"), indent=1)
for k, rows in out.items():
    print(k)
    for x in rows: print({kk:(round(vv,4) if isinstance(vv,float) else vv) for kk,vv in x.items()})
