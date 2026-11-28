"""
TOOL: exp_neuralfoil.py - NeuralFoil (xlarge) against XFOIL 6.99 on the convergence matrix, fine-alpha slope and design map
FAMILY: xfoil-improvements-paper
VERSION: 1.0.0
DATE: 2026-11-28
CHAT: XFOIL improvements technical paper (Claude, 2026-11-28)
CHANGES: 1.0.0 - first version
"""
__version__ = "1.0.0"
import json, time, glob, numpy as np
import neuralfoil as nf, aerosandbox as asb

def naca_coords(m, p, t, n=161):
    b = np.linspace(0, np.pi, n); x = 0.5 * (1 - np.cos(b))
    yt = 5 * t * (0.2969 * np.sqrt(x) - 0.1260 * x - 0.3516 * x**2 + 0.2843 * x**3 - 0.1015 * x**4)
    yc = np.where(x < p, m / p**2 * (2 * p * x - x**2), m / (1 - p)**2 * ((1 - 2 * p) + 2 * p * x - x**2))
    dy = np.where(x < p, 2 * m / p**2 * (p - x), 2 * m / (1 - p)**2 * (p - x)); th = np.arctan(dy)
    xu, yu = x - yt * np.sin(th), yc + yt * np.cos(th); xl, yl = x + yt * np.sin(th), yc - yt * np.cos(th)
    return np.c_[np.r_[xu[::-1], xl[1:]], np.r_[yu[::-1], yl[1:]]]

out = {}
# 1. matrix comparison against XFOIL (S3 converged points)
rows = []; t_nf = 0.0
for f in sorted(glob.glob("/home/claude/work/data/exp1/*_S3_robust100.json")):
    d = json.load(open(f)); af = asb.Airfoil("naca" + d["foil"])
    a = np.array([p["alpha"] for p in d["pts"]]); A = np.arange(-6, 20.01, 0.5)
    t = time.time(); r = nf.get_aero_from_airfoil(airfoil=af, alpha=A, Re=d["re"], model_size="xlarge"); t_nf += time.time() - t
    for k, p in enumerate(d["pts"]):
        if p["conv"]:
            rows.append(dict(foil=d["foil"], re=d["re"], alpha=float(A[k]), cl_x=p["cl"], cd_x=p["cd"],
                             cl_n=float(r["CL"][k]), cd_n=float(r["CD"][k]), conf=float(r["analysis_confidence"][k])))
out["matrix"] = rows; out["t_nf_matrix"] = t_nf
# 2. fine alpha for 2412 Re 1e6
A = np.round(np.arange(-2, 8.0001, 0.02), 3)
r = nf.get_aero_from_airfoil(airfoil=asb.Airfoil("naca2412"), alpha=A, Re=1e6, model_size="xlarge")
out["fine"] = dict(alpha=A.tolist(), cd=np.asarray(r["CD"]).tolist(), cl=np.asarray(r["CL"]).tolist())
# 3. design map: thickness/camber scaled NACA 2412 at CL = 0.6, Re 3e5
T = np.linspace(0.75, 1.35, 25); Cm = np.linspace(0.0, 2.5, 25); Al = np.arange(-4, 12.01, 0.05)
Z = np.full((25, 25), np.nan); t = time.time()
for i, cf in enumerate(Cm):
    for j, tf in enumerate(T):
        m = 0.02 * cf; xy = naca_coords(max(m, 1e-6), 0.4, 0.12 * tf)
        r = nf.get_aero_from_coordinates(coordinates=xy, alpha=Al, Re=3e5, model_size="xlarge")
        cl = np.asarray(r["CL"]); cd = np.asarray(r["CD"]); k = int(np.argmax(cl > 0.6))
        if cl[k] > 0.6 and k > 0:
            w = (0.6 - cl[k - 1]) / (cl[k] - cl[k - 1]); Z[i, j] = cd[k - 1] + w * (cd[k] - cd[k - 1])
out["dmap"] = dict(T=T.tolist(), C=Cm.tolist(), Z=Z.tolist(), sec=time.time() - t, n_alpha=len(Al))
json.dump(out, open("/home/claude/work/data/neuralfoil.json", "w"))
R = np.array([[r["cl_x"], r["cl_n"], r["cd_x"], r["cd_n"], r["alpha"], r["conf"]] for r in rows])
pre = (R[:, 4] >= -4) & (R[:, 4] <= 8)
print("points", len(R), "pre-stall", pre.sum(), "time matrix", round(t_nf, 3))
for lab, m in (("all", np.ones(len(R), bool)), ("pre", pre)):
    dcl = np.abs(R[m, 1] - R[m, 0]); dcd = np.abs(np.log(R[m, 3] / R[m, 2]))
    print(lab, "median|dCL|", round(np.median(dcl), 4), "p90", round(np.percentile(dcl, 90), 4),
          "median|dlnCD|", round(np.median(dcd), 4), "p90", round(np.percentile(dcd, 90), 4))
print("dmap nan", int(np.isnan(Z).sum()), "sec", round(out["dmap"]["sec"], 1))
