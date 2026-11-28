# -*- coding: utf-8 -*-
"""
TOOL:    experiments.py - numerical experiments for the XROTOR review paper (uses pyxr.py)
FAMILY:  technical-papers / xrotor-review
VERSION: 1.2.0
DATE:    2026-11-28
CHAT:    XROTOR code review technical paper (2026-11-28)
CHANGES: 1.2.0 - worked designs: 10-inch UAV propeller (exp_prop10) and 60 MW wind turbine (exp_wt60)
         1.1.0 - J sweeps and robustness map at fixed tip speed (170 m/s); Mach study; no-filter mode
         1.0.0 - swirl comparison, ideal limit, J sweeps, discretisation, robustness map, MIL designs,
         formulation error map, loading / free-wake study, aero-model study
"""
__version__ = "1.2.0"
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


# ------------------------------------------------------------------------------------------ worked designs
LOWRE = dict(a0=np.radians(-3.0), dclda=6.0, clmax=1.2, clmin=-0.4, dclda_stall=0.1, dcl_stall=0.1,
             cdmin=0.020, cldmin=0.4, dcdcl2=0.020, cmcon=-0.08, reref=1.0e5, rexp=-0.5, mcrit=0.70)
WT = dict(a0=np.radians(-3.5), dclda=6.3, clmax=1.6, clmin=-0.8, cdmin=0.0065, cldmin=0.6, dcdcl2=0.006,
          cmcon=-0.10, reref=1.0e7, rexp=-0.15, mcrit=0.75)


def reflect(p):
    """XROTOR windmill convention: airfoil 'upside down' (a0, CL and CLmin/CLmax reflected)."""
    return dict(a0=-p["a0"], dclda=p["dclda"], clmax=-p["clmin"], clmin=-p["clmax"], dclda_stall=0.1, dcl_stall=0.1,
                cdmin=p["cdmin"], cldmin=-p["cldmin"], dcdcl2=p["dcdcl2"], cmcon=-p["cmcon"], reref=p["reref"],
                rexp=p["rexp"], mcrit=p["mcrit"])


def exp_prop10():
    """10-inch (254 mm) two-blade UAV propeller: 4.5 N at 15 m/s and 7000 rpm."""
    R, V, rpm, T = 0.127, 15.0, 7000.0, 4.5
    lam = V / (rpm * PI / 30 * R)
    mk = lambda wk, aero=LOWRE: Rotor(B=2, rad=R, xi0=0.10, II=30, aero=ParamAero(**aero), rho=1.225, vso=340.0,
                                      rmu=1.789e-5, vel=V, wake=wk)
    out = {"lam": lam, "J": PI * lam, "designs": {}}
    for wk in ("grad", "pot", "vrtx"):
        r = mk(wk); h = []; ok = r.design(lam, 0.6, tdes=T, history=h); res = r.res
        i = np.argmin(abs(r.xi - 0.75)); pd = PI * r.xi[i] * np.tan(r.beta[i]) / r.xi[i] * 0.75 / 0.75
        pd = PI * 0.75 * np.tan(r.beta[i])
        out["designs"][wk] = dict(conv=ok, it=len(h), xi=r.xi, c_mm=r.ch * R * 1e3, beta=np.degrees(r.beta), gam=r.gam,
                                  eta=res["TTOT"] / res["PTOT"], P=res["PTOT"] * r.rho * V ** 3 * R ** 2, PD=pd,
                                  Re=r.reyn(r.ch, res["W"]), cl=res["CL"], adw=r.adw)
        print("prop10", wk, ok, len(h), out["designs"][wk]["eta"], pd, flush=True)
    # off-design at 7000 rpm, POT
    d = out["designs"]["pot"]; ch = np.array(d["c_mm"]) / 1e3 / R; beta = np.radians(d["beta"])
    sweep = dict(J=[], CT=[], CP=[], eta=[], conv=[], T=[], P=[])
    for J in np.round(np.arange(0.05, 0.801, 0.05), 3):
        a = mk("pot"); a.vel = J / PI * rpm * PI / 30 * R; a.ch = ch.copy(); a.beta = beta.copy()
        ok = a.operate(ispec=4, icon=2, adv=J / PI); p = a.perf()
        for k, v in (("J", J), ("CT", p["CT"]), ("CP", p["CP"]), ("eta", p["eta"]), ("conv", ok), ("T", p["T"]), ("P", p["P"])):
            sweep[k].append(v)
    out["sweep"] = sweep
    # design lift coefficient study (POT)
    cls = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]; eta = []
    for cl in cls:
        r = mk("pot"); ok = r.design(lam, cl, tdes=T); eta.append(r.res["TTOT"] / r.res["PTOT"] if ok else None)
    out["clstudy"] = dict(cl=cls, eta=eta)
    # same blade family without profile drag: induced (ideal) efficiency at the design point
    ideal = dict(LOWRE); ideal.update(cdmin=1e-7, dcdcl2=0.0, rexp=0.0)
    r = mk("pot", ideal); r.design(lam, 0.6, tdes=T); out["eta_ideal"] = r.res["TTOT"] / r.res["PTOT"]
    dump("prop10", out)


def exp_wt60():
    """60 MW three-blade wind turbine: blade designed at TSR 9, sized for 60 MW at 11 m/s with 90 m/s tip speed."""
    Vr, Utip, Pr, rho = 11.0, 90.0, 60e6, 1.225
    aero = reflect(WT)
    tsr_d = 9.0
    R0 = 220.0
    mk = lambda wk, R, V: Rotor(B=3, rad=R, xi0=0.04, II=30, aero=ParamAero(**aero), rho=rho, vso=340.0, rmu=1.8e-5,
                                vel=V, wake=wk)
    out = {"tsr_design": tsr_d, "Vrated": Vr, "Utip": Utip}
    # 1. design-Cp study at TSR 9 (POT): peak Cp of each blade over TSR
    study = []
    for cpt in (0.40, 0.44, 0.47, 0.50, 0.51, 0.52):
        V = Utip / tsr_d; q = 0.5 * rho * PI * R0 ** 2 * V ** 3
        w = mk("pot", R0, V); ok = w.design(1 / tsr_d, -1.1, pdes=-cpt * q)
        rec = dict(cp_target=cpt, conv=ok)
        if ok:
            curve = []
            for tsr in np.arange(5.0, 12.01, 0.5):
                a = mk("pot", R0, Utip / tsr); a.ch = w.ch.copy(); a.beta = w.beta.copy()
                aok = a.operate(ispec=4, icon=2, adv=1 / tsr)
                cp = -a.res["PTOT"] / (0.5 * PI) if aok else None
                curve.append((tsr, cp))
            good = [c for c in curve if c[1] is not None]
            rec.update(peak=max(c[1] for c in good), tsr_peak=max(good, key=lambda c: c[1])[0], curve=curve)
        study.append(rec); print("wt60 study", rec.get("cp_target"), ok, rec.get("peak"), flush=True)
    out["study"] = study
    # 2. final blade: design target Cp 0.50 at TSR 9 (POT), all three models
    V = Utip / tsr_d; q = 0.5 * rho * PI * R0 ** 2 * V ** 3
    des = {}
    for wk in ("grad", "pot", "vrtx"):
        for filt_on in (True, False):
            w = mk(wk, R0, V); h = []; ok = w.design(1 / tsr_d, -1.1, pdes=-0.50 * q, history=h, use_filter=filt_on)
            if ok or not filt_on:
                break
        des[wk] = dict(conv=ok, filter=filt_on, it=len(h), xi=w.xi, c=w.ch, beta=np.degrees(w.beta), gam=w.gam,
                       CT=-w.res["TTOT"] / (0.5 * PI), CP=-w.res["PTOT"] / (0.5 * PI), adw_adv=w.adw * tsr_d)
        if wk == "pot":
            blade = (w.ch.copy(), w.beta.copy())
            dump("wt60_design", dict(xi=w.xi, c=w.ch, beta=np.degrees(w.beta), gam=w.gam))
        print("wt60 design", wk, ok, filt_on, len(h), des[wk]["CP"], des[wk]["CT"], flush=True)
    # 3. Cp-TSR curve of the POT blade, and cross-analysis with GRAD and VRTX
    curves = {}
    for wk in ("pot", "grad"):
        cv = []
        for tsr in np.arange(4.0, 13.01, 0.5):
            a = mk(wk, R0, Utip / tsr); a.ch, a.beta = blade[0].copy(), blade[1].copy()
            aok = a.operate(ispec=4, icon=2, adv=1 / tsr)
            if not aok:
                a = mk(wk, R0, Utip / tsr); a.ch, a.beta = blade[0].copy(), blade[1].copy()
                aok = a.operate(ispec=4, icon=2, adv=1 / tsr, mode="xrotor_nofilter")
            cv.append(dict(tsr=tsr, conv=aok, CP=-a.res["PTOT"] / (0.5 * PI), CT=-a.res["TTOT"] / (0.5 * PI)))
        curves[wk] = cv
    out["curves"] = curves
    pot = [c for c in curves["pot"] if c["conv"]]
    cpmax = max(c["CP"] for c in pot); tsr_opt = max(pot, key=lambda c: c["CP"])["tsr"]
    # 4. size for 60 MW at rated wind with the tip-speed limit (TSR at rated = Utip/Vr)
    tsr_r = Utip / Vr
    cp_r = np.interp(tsr_r, [c["tsr"] for c in pot], [c["CP"] for c in pot])
    R = np.sqrt(Pr / (0.5 * rho * PI * Vr ** 3 * cp_r))
    for _ in range(3):                                   # re-check at the final radius (Reynolds number changes slightly)
        a = mk("pot", R, Vr); a.ch, a.beta = blade[0].copy(), blade[1].copy(); a.operate(ispec=4, icon=2, adv=1 / tsr_r)
        cp_r = -a.res["PTOT"] / (0.5 * PI); R = np.sqrt(Pr / (0.5 * rho * PI * Vr ** 3 * cp_r))
    rated = dict(R=R, D=2 * R, cp=cp_r, ct=-a.res["TTOT"] / (0.5 * PI), rpm=Utip / R * 30 / PI, tsr=tsr_r,
                 T=-a.res["TTOT"] * rho * Vr ** 2 * R ** 2, Q=-a.res["PTOT"] * rho * Vr ** 3 * R ** 2 / (Utip / R),
                 cmax=float(blade[0].max() * R), c_root=float(blade[0][0] * R), c_tip=float(blade[0][-1] * R),
                 Re_tip=float(a.reyn(blade[0][-3], a.res["W"][-3])), Re_max=float(np.max(a.reyn(blade[0], a.res["W"]))),
                 Mtip=float(a.res["W"][-1] * Vr / 340.0), cpmax=cpmax, tsr_opt=tsr_opt)
    out["rated"] = rated; print("wt60 rated", rated, flush=True)
    # 5. power curve: optimum TSR until tip-speed limit, then constant rpm, then pitch to hold 60 MW
    Om = Utip / R; pc = []; last_pitch = 1.0
    for V in np.arange(4.0, 25.01, 1.0):
        rec = dict(V=V)
        if V * tsr_opt <= Utip:
            rec.update(P=cpmax * 0.5 * rho * PI * R ** 2 * V ** 3, mode="optimum TSR", pitch=0.0, rpm=V * tsr_opt / R * 30 / PI)
        else:
            a = mk("pot", R, V); a.ch, a.beta = blade[0].copy(), blade[1].copy()
            a.operate(ispec=4, icon=2, adv=V / Utip)
            P = -a.res["PTOT"] * rho * V ** 3 * R ** 2
            rec.update(P=P, mode="tip-speed limit", pitch=0.0, rpm=Om * 30 / PI, conv=a.conv)
            if P > Pr:
                # cold start (every point from the design pitch, as a user typing the case would) ...
                b = mk("pot", R, V); b.ch, b.beta = blade[0].copy(), blade[1].copy()
                okc = b.operate(ispec=3, icon=1, spec=-Pr, adv=V / Utip)
                rec.update(pitch_cold=float(np.degrees(b.dbeta)), T_cold=-b.res["TTOT"] * rho * V ** 2 * R ** 2, conv_cold=okc)
                # ... and continuation from the previous wind speed's pitch (stays on the feathering branch)
                b = mk("pot", R, V); b.ch, b.beta = blade[0].copy(), blade[1].copy(); b.dbeta = np.radians(last_pitch)
                okp = b.operate(ispec=3, icon=1, spec=-Pr, adv=V / Utip)
                last_pitch = float(np.degrees(b.dbeta))
                rec.update(P=-b.res["PTOT"] * rho * V ** 3 * R ** 2, mode="pitch control", pitch=last_pitch,
                           conv=okp, T=-b.res["TTOT"] * rho * V ** 2 * R ** 2)
            else:
                rec["T"] = -a.res["TTOT"] * rho * V ** 2 * R ** 2
        pc.append(rec); print("wt60 pc", {k: (round(v, 3) if isinstance(v, float) else v) for k, v in rec.items()}, flush=True)
    out["power_curve"] = pc
    dump("wt60", out)


if __name__ == "__main__":
    for name in sys.argv[1:]:
        t = time.time()
        globals()["exp_" + name]()
        print("done", name, round(time.time() - t, 1), flush=True)
