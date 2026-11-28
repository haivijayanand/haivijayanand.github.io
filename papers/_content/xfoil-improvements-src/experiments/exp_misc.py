"""
TOOL: exp_misc.py - panel-density, hysteresis, Ncrit, noise, finite-difference, Mach and VACC studies
FAMILY: xfoil-improvements-paper
VERSION: 1.2.0
DATE: 2026-11-28
CHAT: XFOIL improvements technical paper (Claude, 2026-11-28)
CHANGES: 1.0.0 - first version
         1.1.0 - thickness scan / FD gradients use the full-precision build (xfoil_hp)
         1.2.0 - fine-alpha noise study also uses xfoil_hp; VACC range 0-0.2
"""
__version__ = "1.2.0"
import json, sys, os, re, math, numpy as np
import xfdrive as X
from concurrent.futures import ProcessPoolExecutor
B = "/home/claude/runs/xfoil699"
HP = "/home/claude/runs/xfoil_hp"
D = "/home/claude/work/data/"

def panels():
    out = []
    for foil, re_, a in (("4412", 2e5, 4.0), ("0012", 3e6, 4.0), ("4412", 2e5, 10.0)):
        for n in (60, 80, 100, 120, 140, 160, 200, 240, 280, 320, 360):
            xf = X.XF(B); xf.load_naca(foil, n); xf.oper(re_, itmax=200)
            # approach the target through a short continuation
            for aa in np.linspace(0, a, 5)[1:-1]:
                xf.alfa(aa)
            r = xf.alfa(a); xf.close(); r.pop("rms")
            out.append(dict(foil=foil, re=re_, a=a, n=n, **r))
    return out

def hysteresis():
    out = {}
    for foil, re_ in (("4412", 2e5), ("0012", 1e6), ("0018", 1e6), ("2412", 5e5)):
        up = [round(a, 2) for a in np.arange(0, 22.01, 0.25)]
        xf = X.XF(B); xf.load_naca(foil, 200); xf.oper(re_, itmax=150)
        ru = [xf.alfa(a) for a in up]
        rd = [xf.alfa(a) for a in up[::-1]]
        xf.close()
        for r in ru + rd: r.pop("rms")
        out[f"{foil}_{re_:g}"] = dict(up=ru, down=rd)
    return out

def ncrit():
    out = []
    for foil, re_ in (("4412", 2e5), ("4412", 2e6), ("0012", 1e6)):
        for nc in (1, 3, 5, 7, 9, 11, 13):
            xf = X.XF(B); xf.load_naca(foil, 200); xf.oper(re_, ncrit=nc, itmax=150)
            pts = []
            for a in np.arange(0, 18.01, 0.5):
                r = xf.alfa(a); r.pop("rms"); pts.append(r)
            xf.close()
            out.append(dict(foil=foil, re=re_, ncrit=nc, pts=pts))
    return out

def noise():
    out = {}
    for foil, re_ in (("2412", 1e6), ("4412", 2e5)):
        al = [round(a, 3) for a in np.arange(-2, 8.0001, 0.02)]
        xf = X.XF(HP); xf.load_naca(foil, 200); xf.oper(re_, itmax=150)
        rs = [xf.alfa(a) for a in al]; xf.close()
        for r in rs: r.pop("rms")
        out[f"{foil}_{re_:g}"] = rs
    return out

def tscan_point(args):
    f, re_, clt = args
    xf = X.XF(HP); xf.cmd("NACA 2412"); xf.cmd("GDES"); xf.cmd(f"TFAC {f:.5f} 1.0")
    xf.cmd("EXEC"); xf.cmd(""); xf.panels(200); xf.oper(re_, itmax=200)
    for c in (0.2, 0.35):
        xf.cl(c)
    r = xf.cl(clt); xf.close(); r.pop("rms"); r["tfac"] = f
    return r

def thickness_scan():
    fs = [round(f, 4) for f in np.arange(0.80, 1.30001, 0.0025)]
    out = {}
    with ProcessPoolExecutor(2) as ex:
        out["re1e6_cl0.5"] = list(ex.map(tscan_point, [(f, 1e6, 0.5) for f in fs]))
        out["re3e5_cl0.5"] = list(ex.map(tscan_point, [(f, 3e5, 0.5) for f in fs]))
    return out

def fd_gradient():
    """central finite-difference dCd/dt at t-factor 1.0 for decreasing step h"""
    out = []
    for re_ in (1e6, 3e5):
        for h in (0.1, 0.05, 0.02, 0.01, 0.005, 0.002, 0.001, 5e-4, 2e-4, 1e-4, 5e-5, 1e-5):
            rp = tscan_point((1.0 + h, re_, 0.5)); rm = tscan_point((1.0 - h, re_, 0.5))
            ok = rp["conv"] and rm["conv"]
            g = (rp["cd_hp"] - rm["cd_hp"]) / (2 * h) if ok else math.nan
            g5 = (rp["cd"] - rm["cd"]) / (2 * h) if ok else math.nan
            out.append(dict(re=re_, h=h, g=g, g5=g5, cdp=rp["cd_hp"], cdm=rm["cd_hp"]))
    return out

def mach():
    out = []
    for visc in (False, True):
        for M in np.arange(0.0, 0.801, 0.05):
            xf = X.XF(B); xf.load_naca("0012", 200)
            xf.oper(3e6 if visc else 0, mach=float(M), itmax=150)
            if not visc:
                xf.cmd("PACC"); xf.cmd("/tmp/m.pol"); xf.cmd("")
            o = xf.cmd("ALFA 2")
            r = X.parse_point(o, 2.0) if visc else {}
            cps = re.findall(r"Sonic Cp =\s*([-0-9.]+)", xf.p and o)
            xf.cmd("CPWR /tmp/cp.txt")
            try:
                cp = np.loadtxt("/tmp/cp.txt", skiprows=1)[:, -1]; cpmin = float(cp.min())
            except Exception:
                cpmin = math.nan
            if not visc:
                xf.cmd("PACC")
            xf.close()
            cl = r.get("cl", math.nan)
            if not visc:
                try:
                    cl = float(open("/tmp/m.pol").read().split("\n")[-2].split()[1]); os.remove("/tmp/m.pol")
                except Exception:
                    cl = math.nan
            Mf = float(M)
            cpstar = (2 / (1.4 * Mf**2)) * (((2 + 0.4 * Mf**2) / 2.4) ** 3.5 - 1) if Mf > 0 else -math.inf
            out.append(dict(visc=visc, M=Mf, cl=cl, conv=r.get("conv", True), cpmin=cpmin, cpstar=cpstar))
    return out

def vacc():
    out = []
    alphas = [round(a, 2) for a in np.arange(-4, 18.01, 0.5)]
    for foil, re_ in (("4412", 1e5), ("6409", 1e5), ("0012", 5e4)):
        for v in (0.0, 0.01, 0.05, 0.1, 0.2):
            xf = X.XF(B, timeout=30); xf.load_naca(foil, 160); xf.oper(re_, itmax=100, vacc=v)
            try:
                rs = X.sweep_stock(xf, alphas); xf.close()
                out.append(dict(foil=foil, re=re_, vacc=v, nconv=sum(r["conv"] for r in rs), n=len(rs),
                                work=sum(r["iters"] for r in rs)))
            except TimeoutError:
                xf.p.kill()
                out.append(dict(foil=foil, re=re_, vacc=v, nconv=None, n=len(alphas), work=None, hung=True))
            print(out[-1], flush=True)
    return out

if __name__ == "__main__":
    for name in sys.argv[1:]:
        res = globals()[name]()
        json.dump(res, open(D + f"{name}.json", "w"))
        print(name, "done")
