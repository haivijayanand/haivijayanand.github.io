"""
TOOL: exp_multielement.py - two-element (main + external aerofoil flap) inviscid study
FAMILY: xfoil-improvements-paper
VERSION: 1.0.0
DATE: 2026-11-28
CHAT: XFOIL improvements technical paper (Claude, 2026-11-28)
CHANGES: 1.0.0 - first version: CL vs flap angle and gap, element loads, wake-path deceleration
"""
__version__ = "1.0.0"
import json, numpy as np
import me_panel as M

def config(defl, gap, overlap=0.0, cf=0.30, n=101):
    Xm, Ym = M.naca4("4412", n)
    Xf, Yf = M.naca4("4412", n)
    # flap LE placed below main TE: x = 1 - overlap, y = yTE_main - gap ; rotate about its LE
    xf, yf = M.place(Xf, Yf, chord=cf, x0=1.0 - overlap, y0=-gap, deflect_deg=defl, pivot=(0.0, 0.0))
    return (Xm, Ym), (xf, yf)

def min_gap(main, flap):
    (Xm, Ym), (xf, yf) = main, flap
    return float(np.min(np.hypot(xf - Xm[0], yf - Ym[0])))

def trace(me, x0, y0, ds=0.002, smax=0.9):
    pts = [(x0, y0)]; x, y = x0, y0; s = 0
    while s < smax:
        u, v = me.velocity(x, y); q = np.hypot(u, v)[0]
        k1 = (u[0] / q, v[0] / q)
        u2, v2 = me.velocity(x + 0.5 * ds * k1[0], y + 0.5 * ds * k1[1]); q2 = np.hypot(u2, v2)[0]
        x += ds * u2[0] / q2; y += ds * v2[0] / q2; s += ds; pts.append((x, y))
    P = np.array(pts); u, v = me.velocity(P[:, 0], P[:, 1]); q = np.hypot(u, v)
    return P, q

if __name__ == "__main__":
    out = {}
    # 1. isolated main element
    Xm, Ym = M.naca4("4412", 101); iso = M.MultiElement([(Xm, Ym)])
    out["iso_cl"] = {a: iso.solve(a) for a in (0, 4, 8)}
    iso.solve(0); out["iso_cp"] = dict(x=iso.xc.tolist(), cp=iso.cp.tolist())
    # 2. CL vs deflection for three gaps
    out["sweep"] = {}
    for gap in (0.01, 0.02, 0.04):
        rows = []
        for d in range(0, 45, 5):
            m, f = config(d, gap); me = M.MultiElement([m, f]); cl = me.solve(0.0)
            rows.append(dict(defl=d, cl=cl, cl_main=me.cl_el[0], cl_flap=me.cl_el[1], gmin=min_gap(m, f)))
        out["sweep"][gap] = rows
    # 3. Cp and wake-path at 20 deg, gap 0.02
    m, f = config(20, 0.02); me = M.MultiElement([m, f]); me.solve(0.0)
    out["cp20"] = dict(x=me.xc.tolist(), cp=me.cp.tolist(), eid=me.eid.tolist(),
                      geom=[[m[0].tolist(), m[1].tolist()], [f[0].tolist(), f[1].tolist()]])
    # wake path from main TE (bisector, just downstream)
    P, q = trace(me, 1.0005, Ym[0] - 0.0005)
    out["wake"] = dict(x=P[:, 0].tolist(), y=P[:, 1].tolist(), q=q.tolist())
    for d in (10, 30):
        m2, f2 = config(d, 0.02); me2 = M.MultiElement([m2, f2]); me2.solve(0.0)
        P2, q2 = trace(me2, 1.0005, Ym[0] - 0.0005)
        out[f"wake{d}"] = dict(x=P2[:, 0].tolist(), y=P2[:, 1].tolist(), q=q2.tolist())
    json.dump(out, open("/home/claude/work/data/multielement.json", "w"))
    print("iso", out["iso_cl"])
    for g, rows in out["sweep"].items():
        print(g, [(r["defl"], round(r["cl"], 3), round(r["cl_main"], 3), round(r["cl_flap"], 3), round(r["gmin"], 4)) for r in rows])
    w = out["wake"]; q = np.array(w["q"]); print("wake q: TE", q[0], "min", q.min(), "max", q.max(), "end", q[-1])
