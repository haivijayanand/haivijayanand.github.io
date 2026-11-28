# -*- coding: utf-8 -*-
"""
TOOL:    experiments.py - numerical experiments for the XROTOR review paper (uses pyxr.py)
FAMILY:  technical-papers / xrotor-review
VERSION: 1.1.0
DATE:    2026-11-28
CHAT:    XROTOR code review technical paper (2026-11-28)
CHANGES: 1.1.0 - J sweeps and robustness map at fixed tip speed (170 m/s); Mach study; no-filter mode
         1.0.0 - swirl comparison, ideal limit, J sweeps, discretisation, robustness map, MIL designs,
         formulation error map, loading / free-wake study, aero-model study
"""
__version__ = "1.1.0"
import json, sys, time, os
import numpy as np
from pyxr import Rotor, ParamAero, gradmo, helico, vrtxco
from cases import naca640, CLARKY_PARAM

PI = np.pi
OUT = os.path.join(os.path.dirname(__file__), "..", "data")


def dump(name, obj):
    def conv(o):
        if isinstance(o, np.ndarray): return o.tolist()
        if isinstance(o, (np.floating,)): return float(o)
        if isinstance(o, (np.integer,)): return int(o)
        if isinstance(o, (np.bool_,)): return bool(o)
        raise TypeError(type(o))
    json.dump(obj, open(os.path.join(OUT, name + ".json"), "w"), default=conv, indent=0)


def ga_prop(B=2, wake="pot", II=30, cl=0.6, aero=None, free=True):
    """Design-study rotor: D = 1.8 m, xi0 = 0.12, sea level."""
    return Rotor(B=B, rad=0.9, xi0=0.12, II=II, aero=aero or ParamAero(**CLARKY_PARAM), rho=1.225, vso=340.0,
                 rmu=1.789e-5, vel=60.0, wake=wake, free=free)


# ------------------------------------------------------------------------------------------ A
def exp_swirl():
    out = {}
    for B, lam in ((2, 0.1), (2, 0.3), (4, 0.3)):
        r = ga_prop(B=B, wake="pot"); r.vel = 200.0 * lam          # tip speed held at 200 m/s
        P = 0.5 * 0.4 * 1.225 * r.vel ** 3 * PI * 0.9 ** 2   # power coefficient Pc = 0.4
        r.design(lam, 0.6, pdes=P)
        g = r.gam; adw = r.adw
        out[f"B{B}_l{lam}"] = dict(xi=r.xi, gam=g, adw=adw,
                                   grad=(gradmo(r.xi, r.xv, B, adw)[2] @ g), pot=(helico(r.xi, r.xv, B, adw)[2] @ g),
                                   vrtx=(vrtxco(r.xi, r.xv, B, adw)[2] @ g), mean=B * g / (4 * PI * r.xi))
    dump("swirl", out)


def exp_ideal():
    rows = []
    ideal = dict(CLARKY_PARAM); ideal.update(cdmin=1e-7, dcdcl2=0.0, rexp=0.0)
    for B in (2, 4, 20):
        for lam in (0.05, 0.2):
            for wk in ("grad", "pot"):
                r = ga_prop(B=B, wake=wk, aero=ParamAero(**ideal)); r.xi0 = 0.02; r.setx(); r.ubody = np.zeros(r.II)
                r.vel = 200.0 * lam
                Tc = 1.0                                         # T / (0.5 rho V^2 A) = 1
                T = Tc * 0.5 * r.rho * r.vel ** 2 * PI * r.rad ** 2
                ok = r.design(lam, 0.6, tdes=T)
                res = r.res
                eta = res["TTOT"] / res["PTOT"]
                rows.append(dict(B=B, lam=lam, wake=wk, conv=ok, eta=eta, froude=2 / (1 + np.sqrt(1 + Tc)),
                                 adw_adv=r.adw / lam))
                print(rows[-1], flush=True)
    dump("ideal", rows)


# ------------------------------------------------------------------------------------------ B
def exp_jsweep():
    Js = np.round(np.arange(0.20, 1.301, 0.05), 3)
    out = {"J": Js}
    for wk in ("grad", "pot", "vrtx"):
        CT, CP, ETA, CONV, IT, CONVNF = [], [], [], [], [], []
        for J in Js:
            r = naca640(wake=wk, J=J)
            ok = r.operate(ispec=4, icon=2, adv=J / PI)
            r2 = naca640(wake=wk, J=J)
            ok2 = r2.operate(ispec=4, icon=2, adv=J / PI, mode="xrotor_nofilter")
            p = r.perf() if ok or not ok2 else r2.perf()
            CT.append(p["CT"]); CP.append(p["CP"]); ETA.append(p["eta"]); CONV.append(ok); IT.append(r.iters)
            CONVNF.append(ok2)
            print(wk, J, ok, ok2, r.iters, round(p["CT"], 5), flush=True)
        out[wk] = dict(CT=CT, CP=CP, eta=ETA, conv=CONV, it=IT, conv_nofilter=CONVNF)
    # table aero with pot for comparison
    CT, CP, ETA, CONV = [], [], [], []
    for J in Js:
        r = naca640(wake="pot", table=True, J=J); ok = r.operate(ispec=4, icon=2, adv=J / PI); p = r.perf()
        CT.append(p["CT"]); CP.append(p["CP"]); ETA.append(p["eta"]); CONV.append(ok)
    out["pot_table"] = dict(CT=CT, CP=CP, eta=ETA, conv=CONV)
    # loading diagnostics with pot: ADW/ADV, blade vs equivalent-prop thrust, rigid wake
    diag = dict(adw_adv=[], ti_tw=[], ct_rigid=[], ct_lin=[], conv_rigid=[])
    for J in Js:
        r = naca640(wake="pot", J=J); r.operate(ispec=4, icon=2, adv=J / PI); res = r.res
        diag["adw_adv"].append(r.adw / r.adv); diag["ti_tw"].append(res["TI"] / res["TW"] - 1)
        rr = naca640(wake="pot", free=False, J=J); ok = rr.operate(ispec=4, icon=2, adv=J / PI)
        diag["ct_rigid"].append(rr.perf()["CT"]); diag["conv_rigid"].append(ok)
        rl = naca640(wake="pot", free=False, J=J)
        x0 = np.concatenate([np.zeros(rl.II), [J / PI, J / PI, 0.0]])
        g0, _ = rl.apinit(J / PI); x0[:rl.II] = g0
        ok = rl.operate(ispec=4, icon=2, adv=J / PI, x0=x0)
        diag["ct_lin"].append(rl.perf()["CT"])
    out["diag"] = diag
    dump("jsweep", out)


# ------------------------------------------------------------------------------------------ C
def exp_disc():
    J = 0.8
    out = {"II": [8, 12, 16, 20, 30, 40, 60, 80, 100]}
    for wk in ("grad", "pot"):
        for sp in (1, 2):
            CT, CP = [], []
            for II in out["II"]:
                r = naca640(wake=wk, II=II, ixspac=sp, J=J); r.operate(ispec=4, icon=2, adv=J / PI); p = r.perf()
                CT.append(p["CT"]); CP.append(p["CP"])
                print(wk, sp, II, p["CT"], flush=True)
            out[f"{wk}_{sp}"] = dict(CT=CT, CP=CP)
    CT, CP = [], []
    for II in (8, 12, 16, 20, 30, 40):
        r = naca640(wake="vrtx", II=II, ixspac=2, J=J); r.operate(ispec=4, icon=2, adv=J / PI); p = r.perf()
        CT.append(p["CT"]); CP.append(p["CP"]); print("vrtx", II, p["CT"], flush=True)
    out["vrtx_2"] = dict(CT=CT, CP=CP, II=[8, 12, 16, 20, 30, 40])
    nn = [8, 16, 32, 64, 128, 256, 512]
    CT, CP = [], []
    for N in nn:
        r = naca640(wake="pot", NN=N, J=J); r.operate(ispec=4, icon=2, adv=J / PI); p = r.perf()
        CT.append(p["CT"]); CP.append(p["CP"])
    out["NN"] = dict(NN=nn, CT=CT, CP=CP)
    # tip and root station angle of attack, sine vs cosine
    st = {}
    for sp in (1, 2):
        r = naca640(wake="pot", ixspac=sp, J=J); r.operate(ispec=4, icon=2, adv=J / PI)
        st[str(sp)] = dict(xi=r.xi, alf=np.degrees(r.res["ALF"]), gam=r.gam, cl=r.res["CL"])
    out["stations"] = st
    dump("disc", out)


# ------------------------------------------------------------------------------------------ D
def exp_robust(wakes=("grad", "pot"), modes=("xrotor", "newton"), tag=""):
    Js = np.round(np.arange(0.05, 1.401, 0.05), 3)
    dbs = np.arange(-8, 16.1, 2.0)
    out = {"J": Js, "dbeta": dbs}
    for wk in wakes:
        for mode in modes:
            conv = np.zeros((len(dbs), len(Js)), bool); it = np.zeros_like(conv, int); ct = np.full(conv.shape, np.nan)
            t0 = time.time()
            for a, db in enumerate(dbs):
                for b, J in enumerate(Js):
                    r = naca640(wake=wk, J=J); r.beta = r.beta + np.radians(db)
                    try:
                        ok = r.operate(ispec=4, icon=2, adv=J / PI, mode=mode)
                    except Exception:
                        ok = False
                    conv[a, b] = ok; it[a, b] = r.iters
                    if ok: ct[a, b] = r.perf()["CT"]
            print(wk, mode, conv.mean(), time.time() - t0, flush=True)
            out[f"{wk}_{mode}"] = dict(conv=conv, it=it, CT=ct)
    dump("robust_" + "_".join(wakes) + tag, out)


def exp_mach():
    """Fixed J = 0.6, tip Mach number raised by raising the tip speed (section Mcrit = 0.70)."""
    out = {"Mtip": [], "grad": [], "pot": [], "pot_noMach": []}
    for Mt in np.round(np.arange(0.40, 0.951, 0.05), 3):
        out["Mtip"].append(Mt)
        for key, wk, vso in (("grad", "grad", 340.0), ("pot", "pot", 340.0), ("pot_noMach", "pot", 1e9)):
            r = naca640(wake=wk, J=0.6, utip=Mt * 340.0); r.vso = vso
            ok = r.operate(ispec=4, icon=2, adv=0.6 / PI)
            ok2 = ok or naca640(wake=wk, J=0.6, utip=Mt * 340.0).operate(ispec=4, icon=2, adv=0.6 / PI, mode="newton")
            p = r.perf()
            out[key].append(dict(conv=ok, conv_any=bool(ok2), CT=p["CT"], CP=p["CP"], eta=p["eta"], it=r.iters,
                                 Wtip=r.res["W"][-1]))
            print(Mt, key, ok, r.iters, p["CT"], flush=True)
    dump("mach", out)


# ------------------------------------------------------------------------------------------ E
def exp_design():
    out = {}
    P = 100e3
    for B in (2, 3):
        for wk in ("grad", "pot", "vrtx"):
            r = ga_prop(B=B, wake=wk)
            lam = 60.0 / (2400 * PI / 30 * 0.9)
            h = []
            t0 = time.time(); ok = r.design(lam, 0.6, pdes=P, history=h)
            res = r.res
            out[f"B{B}_{wk}"] = dict(conv=ok, it=len(h), xi=r.xi, ch=r.ch, beta=np.degrees(r.beta), gam=r.gam,
                                     eta=res["TTOT"] / res["PTOT"], T=res["TTOT"] * r.rho * r.vel ** 2 * r.rad ** 2,
                                     effinv=r.effinv, adw=r.adw, lam=lam, hist=[e["rms"] for e in h],
                                     larrabee=r.larrabee["gam"], time=time.time() - t0)
            print(B, wk, ok, len(h), out[f"B{B}_{wk}"]["eta"], flush=True)
    dump("design", out)


def exp_formerr():
    """Design with POT; re-analyse the same blade with GRAD and VRTX at the design point."""
    rows = []
    for B in (2, 3, 4, 6):
        for lam in (0.05, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5):
            r = ga_prop(B=B, wake="pot"); r.vel = 200.0 * lam    # tip speed 200 m/s
            P = 0.5 * 0.5 * 1.225 * r.vel ** 3 * PI * 0.9 ** 2   # Pc = 0.5
            ok = r.design(lam, 0.6, pdes=P)
            if not ok:
                rows.append(dict(B=B, lam=lam, conv=False)); print(rows[-1], flush=True); continue
            ch, beta = r.ch.copy(), r.beta.copy()
            ref = None; rec = dict(B=B, lam=lam, conv=True)
            for wk in ("pot", "grad", "vrtx"):
                a = ga_prop(B=B, wake=wk); a.vel = r.vel; a.ch = ch.copy(); a.beta = beta.copy()
                okk = a.operate(ispec=4, icon=2, adv=lam)
                p = a.perf()
                rec[wk] = dict(conv=okk, CT=p["CT"], CP=p["CP"], eta=p["eta"])
            print(rec, flush=True)
            rows.append(rec)
    dump("formerr", rows)


if __name__ == "__main__":
    for name in sys.argv[1:]:
        t = time.time()
        globals()["exp_" + name]()
        print("done", name, round(time.time() - t, 1), flush=True)
