"""
TOOL:    flying_wing.py - second worked example (tailless swept flying wing with elevons) for the AVL review paper
FAMILY:  aero-codes
VERSION: 1.0.0
DATE:    2026-11-28
CHAT:    AVL (Athena Vortex Lattice) technical paper - history, usage, improvements, limitations
CHANGES: 1.0.0 - first version: geometry, neutral point, trim, derivatives, modes, elevon-pitch vs roll power
"""
__version__ = "1.0.0"
import json, numpy as np
import vlm_uav as V

t25 = np.tan(np.radians(25.0))
def surfaces(scale=1.0):
    ns, nc = int(10*scale), int(10*scale)
    inner = V.Surface("Wing", [(0,0,0,0.40,2.0),(0.32*t25,0.32,0,0.32,0.0)], nc, ns, camber=(0.0,0.4), ydup=True)
    outer = V.Surface("Wing", [(0.32*t25,0.32,0,0.32,0.0),(0.80*t25,0.80,0,0.20,-3.0)], nc, int(14*scale), camber=(0.0,0.4), ydup=True,
                      control=[dict(name="elevator", xhinge=0.75, gain=1.0, sgndup=1.0),
                               dict(name="aileron", xhinge=0.75, gain=1.0, sgndup=-1.0)])
    fin = V.Surface("Vtail", [(0.80*t25+0.02,0.80,0,0.18,0),(0.80*t25+0.10,0.80,0.14,0.10,0)], int(6*scale), int(5*scale),
                    vertical=True, ydup=True)
    return [inner, outer, fin]

cr, ct, b = 0.40, 0.20, 1.6
S = 0.5*(cr+ct)*b; lam = ct/cr; mac = 2/3*cr*(1+lam+lam**2)/(1+lam)
ymac = b/6*(1+2*lam)/(1+lam); xle_mac = ymac*t25
out = dict(S=S, mac=mac, xle_mac=xle_mac)
# neutral point first with arbitrary ref
v0 = V.VLM(surfaces(1.5), S, mac, b, (0.2,0,0))
r1, r0 = v0.solve(alpha=3), v0.solve(alpha=1)
cla = (r1["CL"]-r0["CL"])/np.radians(2); cma = (r1["Cm"]-r0["Cm"])/np.radians(2)
xnp = 0.2 - cma/cla*mac
xcg = xnp - 0.08*mac   # 8 % static margin
out.update(Xnp=xnp, Xcg=xcg)
V.REF.update(Sref=S, cref=mac, bref=b, xref=(xcg,0,0))
V.MASS.update(m=1.6, Ixx=0.12, Iyy=0.06, Izz=0.17)
V.FLIGHT.update(V=16.0, CD0=0.020)
v = V.VLM(surfaces(1.5), S, mac, b, (xcg,0,0))
W = 1.6*9.81; Q = 0.5*V.FLIGHT["rho"]*16**2
a, de, rt = V.trim(v, W/(Q*S))
base, d = V.derivatives(v, a, {"elevator": de})
lo, la, _, _ = V.eigen(d, base, a)
out.update(N=v.AIC.shape[0], CLreq=W/(Q*S), alpha=a, de=de, CDff=rt["CDff"],
           e=rt["CL"]**2/(np.pi*b**2/S*rt["CDff"]),
           derivs={k:{kk:float(vv) for kk,vv in dd.items()} for k,dd in d.items()},
           modes_long=V.describe(lo), modes_lat=V.describe(la))
json.dump(out, open("flying_wing.json","w"), indent=1, default=float)
print({k:(round(x,4) if isinstance(x,float) else x) for k,x in out.items() if k not in ("derivs","modes_long","modes_lat")})
for k,dd in out["derivs"].items(): print(k,{kk:round(vv,4) for kk,vv in dd.items()})
for m in out["modes_long"]+out["modes_lat"]: print({k:round(float(x),3) for k,x in m.items()})
