# -*- coding: utf-8 -*-
"""
TOOL:    calc_figs.py - worked examples and figures for the airfoil-drag paper
FAMILY:  technical-papers / airfoil-drag-aircraft-performance
VERSION: 1.0.0
DATE:    2026-11-28
CHAT:    Airfoil drag characteristics and aircraft/rotorcraft performance (Aerodynamics Related project)
CHANGES: 1.0.0 - first version: section drag model, transport/turboprop/sailplane/UAV/fighter/rotor examples, 9 figures
"""
__version__ = "1.0.0"
import json, math
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

# deutan-safe palette: blue, orange, black, grey, sky; always paired with distinct line styles
C = ["#0072B2", "#E69F00", "#000000", "#7f7f7f", "#56B4E9"]
LS = ["-", "--", "-.", ":", (0, (5, 1, 1, 1))]
MK = ["o", "s", "^", "D", "v"]
plt.rcParams.update({"font.size": 8, "font.family": "serif", "axes.linewidth": 0.6,
                     "lines.linewidth": 1.6, "legend.fontsize": 7, "legend.frameon": False,
                     "axes.grid": True, "grid.color": "#dddddd", "grid.linewidth": 0.5,
                     "savefig.bbox": "tight", "savefig.pad_inches": 0.03})
FS = (3.4, 2.5)
R = {}
def save(fig, name):
    fig.savefig(f"fig/{name}.pdf"); fig.savefig(f"fig/{name}.svg"); plt.close(fig)

g = 9.80665
def isa(h, dT=0.0):
    T = 288.15 - 0.0065*h if h <= 11000 else 216.65
    p = 101325*(T/288.15)**5.2559 if h <= 11000 else 22632*math.exp(-g*(h-11000)/(287.05*216.65))
    Ta = T + dT
    return p/(287.05*Ta), math.sqrt(1.4*287.05*Ta), Ta

# ---------- 1. section profile drag model ----------
def cf_turb(Re): return 0.455/np.log10(Re)**2.58
def cf_lam(Re): return 1.328/np.sqrt(Re)
def cf_mixed(Re, xtr):
    xtr = np.clip(xtr, 1e-4, 1.0)
    Rt = Re*xtr
    return cf_turb(Re) - xtr*(cf_turb(Rt) - cf_lam(Rt))
def cd_section(Re, xtr_u, xtr_l=None, tc=0.12):
    xtr_l = xtr_u if xtr_l is None else xtr_l
    FF = 1 + 2*tc + 60*tc**4
    return (cf_mixed(Re, xtr_u) + cf_mixed(Re, xtr_l))*FF

fig, ax = plt.subplots(figsize=FS)
x = np.linspace(0.02, 0.7, 120)
for i, Re in enumerate([1e6, 3e6, 1e7, 3e7]):
    ax.plot(x, cd_section(Re, x)*1e4, color=C[i], ls=LS[i], label=f"Re = {Re/1e6:g}$\\times10^6$")
ax.set_xlabel("Transition location $x_{tr}/c$ (both surfaces)")
ax.set_ylabel("Section profile drag $c_d$ (counts)")
ax.legend(); ax.set_xlim(0, 0.7)
save(fig, "f1_cd_transition")
R["sec"] = {f"Re{Re:.0e}": {"turb": round(cd_section(Re, 0.05)*1e4, 1), "lam40": round(cd_section(Re, 0.40)*1e4, 1),
            "lam60": round(cd_section(Re, 0.60)*1e4, 1)} for Re in [1e6, 1.5e6, 3e6, 1e7, 2e7, 3e7]}

# ---------- 2. transport jet ----------
rho, a, _ = isa(10668)  # FL350
M = 0.78; V = M*a; q = 0.5*rho*V**2; Vtr = V
S, AR, e = 122.6, 9.5, 0.82
K = 1/(math.pi*AR*e)
Wmid = 66000*g
CD0, CDwing, CDw = 0.0200, 0.0070, 0.0010
c_tsfc = 0.57/3600  # 1/s
CL = Wmid/(q*S)
def LD(CD0x, CLx=CL): return CLx/(CD0x + CDw + K*CLx**2)
LD0 = LD(CD0)
def fuel_frac(Rng, LDx): return 1 - math.exp(-Rng*c_tsfc*g/(V*LDx)) if False else 1 - math.exp(-Rng*c_tsfc/(V*LDx))
# Breguet with c as weight-specific (1/s): R = V/c * L/D * ln(Wi/Wf)
Rng = 2500e3
W_end = 62000*g
def mission_fuel(LDx):  # fuel burnt (kg) for range Rng ending at W_end
    return (W_end*(math.exp(Rng*c_tsfc/(Vtr*LDx)) - 1))/g
f0 = mission_fuel(LD0)
LD10 = LD(CD0 - 0.1*CDwing); f10 = mission_fuel(LD10)
# laminar wing via section model (Re ~ 2e7 at MAC 4.2 m)
Re_w = rho*V*4.2/1.43e-5
cd_t = cd_section(Re_w, 0.05); cd_l = cd_section(Re_w, 0.40, 0.25)
lam_red = 1 - cd_l/cd_t
LDlam = LD(CD0 - lam_red*CDwing*0.8)   # 80% of wing area treatable (outboard of root, ahead of spars)
flam = mission_fuel(LDlam)
R["transport"] = dict(rho=round(rho, 4), V=round(V, 1), q=round(q), CL=round(CL, 3), K=round(K, 4),
    CDi=round(K*CL**2, 4), CDtot=round(CD0+CDw+K*CL**2, 4), LD0=round(LD0, 2), LD10=round(LD10, 2),
    fuel0=round(f0), fuel10=round(f10), dfuel10=round(f0-f10), dfuel10pct=round(100*(f0-f10)/f0, 2),
    Re_w=f"{Re_w:.3g}", cd_turb=round(cd_t*1e4, 1), cd_lam=round(cd_l*1e4, 1), lam_red=round(100*lam_red, 1),
    LDlam=round(LDlam, 2), fuellam=round(flam), dfuellam=round(f0-flam), dfuellampct=round(100*(f0-flam)/f0, 2),
    annual10_t=round((f0-f10)*1000/1000, 1), annual10_co2=round((f0-f10)*1000*3.16/1000, 1),
    annuallam_t=round((f0-flam)*1000/1000), annuallam_co2=round((f0-flam)*1000*3.16/1000))
# figure 2: drag polar & L/D baseline vs reduced profile drag
CLs = np.linspace(0.15, 0.9, 100)
fig, (a1) = plt.subplots(figsize=FS)
for i, (lab, cd0) in enumerate([("Baseline $C_{D0}$ = 0.0200", CD0),
                                 ("Wing profile $-$10%", CD0-0.1*CDwing),
                                 ("Laminar wing (HLFC/NLF)", CD0 - lam_red*CDwing*0.8)]):
    a1.plot(CLs, CLs/(cd0+CDw+K*CLs**2), color=C[i], ls=LS[i], label=lab)
a1.axvline(CL, color=C[3], lw=0.8, ls=":"); a1.text(CL+0.01, 13.2, "mid-cruise $C_L$", fontsize=7)
a1.set_xlabel("Lift coefficient $C_L$"); a1.set_ylabel("Lift-to-drag ratio $L/D$"); a1.legend(loc="lower right")
save(fig, "f2_transport_LD")
# figure 4: fuel saving vs profile drag reduction for ranges
fig, ax = plt.subplots(figsize=FS)
red = np.linspace(0, 0.5, 60)
for i, Rk in enumerate([800e3, 2500e3, 6000e3]):
    out = []
    for r_ in red:
        LDx = LD(CD0 - r_*CDwing)
        f_b = (W_end*(math.exp(Rk*c_tsfc/(V*LD0)) - 1)); f_n = (W_end*(math.exp(Rk*c_tsfc/(V*LDx)) - 1))
        out.append(100*(f_b-f_n)/f_b)
    ax.plot(red*100, out, color=C[i], ls=LS[i], label=f"Cruise range {Rk/1e3:.0f} km")
ax.set_xlabel("Reduction in wing profile drag (%)"); ax.set_ylabel("Cruise fuel saving (%)"); ax.legend()
save(fig, "f4_fuel_saving")
R["transport"]["sens"] = round(100*(LD10/LD0-1)/10, 3)

# ---------- 3. Korn drag divergence ----------
def korn(tc, CLx, Lam, kA): cL = math.cos(math.radians(Lam)); return kA/cL - tc/cL**2 - CLx/(10*cL**3)
fig, ax = plt.subplots(figsize=FS)
tcs = np.linspace(0.08, 0.16, 50)
for i, (kA, lab) in enumerate([(0.87, "Conventional ($\\kappa_A$=0.87)"), (0.95, "Supercritical ($\\kappa_A$=0.95)")]):
    for j, Lam in enumerate([20, 30]):
        ax.plot(tcs, [korn(t, 0.55, Lam, kA) for t in tcs], color=C[i], ls=LS[j], label=f"{lab}, $\\Lambda$={Lam}°")
ax.axhline(0.78, color=C[3], lw=0.8, ls=":")
ax.set_xlabel("Streamwise thickness ratio $t/c$"); ax.set_ylabel("Drag-divergence Mach $M_{DD}$"); ax.set_ylim(0.62, 0.95); ax.legend(fontsize=6.0, loc="upper right")
save(fig, "f3_korn")
def tc_for(Mdd, CLx, Lam, kA): cL = math.cos(math.radians(Lam)); return cL**2*(kA/cL - CLx/(10*cL**3) - Mdd)
R["korn"] = dict(tc_conv=round(tc_for(0.80, 0.55, 25, 0.87), 4), tc_sc=round(tc_for(0.80, 0.55, 25, 0.95), 4),
                 mdd_conv=round(korn(0.11, 0.55, 25, 0.87), 3), mdd_sc=round(korn(0.11, 0.55, 25, 0.95), 3))
def lam_for(Mdd, tc, CLx, kA):
    lo, hi = 0, 45
    for _ in range(60):
        m = (lo+hi)/2
        if korn(tc, CLx, m, kA) < Mdd: lo = m
        else: hi = m
    return m
R["korn"]["lam_conv"] = round(lam_for(0.80, 0.11, 0.55, 0.87), 1); R["korn"]["lam_sc"] = round(lam_for(0.80, 0.11, 0.55, 0.95), 1)
# Lock drag rise for t/c 0.11, sweep 25
Ms = np.linspace(0.6, 0.86, 100)
R["korn"]["lock_note"] = "CDw = 20 (M - Mcr)^4, Mcr = MDD - (0.1/80)^(1/3)"

# ---------- 4. supersonic wave drag ----------
fig, ax = plt.subplots(figsize=FS)
Mss = np.linspace(1.15, 2.5, 100)
for i, tc in enumerate([0.03, 0.045, 0.06]):
    b = np.sqrt(Mss**2-1)
    ax.plot(Mss, 16*tc**2/(3*b)*1e4, color=C[i], ls=LS[i], label=f"Biconvex $t/c$ = {tc:g}")
ax.axhline(2*cf_turb(3e7)*1e4, color=C[3], ls=":", lw=1.0); ax.text(1.9, 2*cf_turb(3e7)*1e4+3, "turbulent skin friction, Re=3$\\times10^7$", fontsize=6.5)
ax.set_xlabel("Free-stream Mach number"); ax.set_ylabel("Thickness wave drag $c_{d,w}$ (counts)"); ax.legend()
save(fig, "f5_supersonic")
b16 = math.sqrt(1.6**2-1)
R["super"] = {f"tc{tc}": round(16*tc**2/(3*b16)*1e4, 1) for tc in [0.03, 0.04, 0.05, 0.06]}
R["super"]["cf2"] = round(2*cf_turb(3e7)*1e4, 1); R["super"]["beta"] = round(b16, 3)
# fighter sustained turn
rho5, a5, _ = isa(5000); Vf = 0.8*a5; qf = 0.5*rho5*Vf**2
Wf_, Sf, Tf, CD0f, Kf = 10000*g, 40.0, 60e3, 0.020, 0.21
def nsus(CD0x, Kx): CLx = math.sqrt((Tf/(qf*Sf) - CD0x)/Kx); return CLx*qf*Sf/Wf_, CLx
n0, CLn = nsus(CD0f, Kf); n1, _ = nsus(CD0f-0.1*0.008, Kf); n2, _ = nsus(CD0f, 0.9*Kf)
def turnrate(n): return math.degrees(g*math.sqrt(n**2-1)/Vf)
R["fighter"] = dict(rho=round(rho5, 4), V=round(Vf, 1), q=round(qf), n0=round(n0, 2), CL=round(CLn, 3), n_cd=round(n1, 2),
                    n_K=round(n2, 2), w0=round(turnrate(n0), 2), w_cd=round(turnrate(n1), 2), w_K=round(turnrate(n2), 2))

# ---------- 5. propeller blade element efficiency ----------
fig, ax = plt.subplots(figsize=FS)
phis = np.radians(np.linspace(2, 80, 300))
R["prop"] = {}
for i, LDs in enumerate([30, 50, 80, 120]):
    gam = math.atan(1/LDs)
    eta = np.tan(phis)/np.tan(phis+gam)
    ax.plot(np.degrees(phis), eta, color=C[i], ls=LS[i], label=f"$c_l/c_d$ = {LDs}")
    R["prop"][f"LD{LDs}"] = dict(etamax=round(math.tan(math.pi/4-gam/2)/math.tan(math.pi/4+gam/2), 4),
                                  eta20=round(math.tan(math.radians(20))/math.tan(math.radians(20)+gam), 4),
                                  eta60=round(math.tan(math.radians(60))/math.tan(math.radians(60)+gam), 4))
ax.set_ylim(0.8, 1.0); ax.set_xlabel("Local inflow angle $\\phi$ (deg)"); ax.set_ylabel("Local blade-element efficiency"); ax.legend(loc="lower center", ncol=2)
save(fig, "f8_prop_eta")
# turboprop range sensitivity: R ~ eta_p * L/D ; 10% wing cd + prop effect
# regional turboprop: CD0=0.026, wing share 0.009; AR 12, e 0.8; cruise CL 0.5
Kt = 1/(math.pi*12*0.8); CLt = 0.50
LDt0 = CLt/(0.026+Kt*CLt**2); LDt1 = CLt/(0.026-0.0009+Kt*CLt**2)
R["turboprop"] = dict(LD0=round(LDt0, 2), LD1=round(LDt1, 2), dR=round(100*(LDt1/LDt0-1), 2))

# ---------- 6. sailplane ----------
Sg, bg, mg = 10.5, 15.0, 450.0; ARg = bg**2/Sg; eg = 0.92; Kg = 1/(math.pi*ARg*eg)
Re_g = 1.225*25*0.7/1.81e-5
cdc = cd_section(Re_g, 0.60, 0.70, tc=0.15); cdt = cd_section(Re_g, 0.08, 0.40, tc=0.15)
# whole-aircraft CD0: wing profile (based on S) + fuselage/tail 0.0035
CD0g_c = cdc + 0.0035; CD0g_d = cdt + 0.0035
def glide(CD0x, Vv):
    CLx = mg*g/(0.5*1.225*Vv**2*Sg); CDx = CD0x + Kg*CLx**2
    return Vv*CDx/CLx, CLx/CDx
Vg = np.linspace(20, 70, 200)
fig, ax = plt.subplots(figsize=FS)
for i, (lab, cdx) in enumerate([("Clean laminar wing", CD0g_c), ("Insect/rain contaminated", CD0g_d)]):
    ax.plot(Vg*3.6, [glide(cdx, v)[0] for v in Vg], color=C[i], ls=LS[i], label=lab)
ax.invert_yaxis(); ax.set_xlabel("Airspeed (km/h)"); ax.set_ylabel("Sink rate (m/s)"); ax.legend(loc="lower left")
save(fig, "f9_sailplane")
LDg = lambda cdx: 0.5*math.sqrt(1/(cdx*Kg))
def minsink(cdx): return min(glide(cdx, v)[0] for v in np.linspace(15, 80, 3000))
R["sail"] = dict(AR=round(ARg, 1), Re=f"{Re_g:.2g}", cd_clean=round(cdc*1e4, 1), cd_dirty=round(cdt*1e4, 1),
                 LDc=round(LDg(CD0g_c), 1), LDd=round(LDg(CD0g_d), 1), sinkc=round(minsink(CD0g_c), 3), sinkd=round(minsink(CD0g_d), 3),
                 V100c=round(glide(CD0g_c, 100/3.6)[1], 1), V100d=round(glide(CD0g_d, 100/3.6)[1], 1))
# MALE UAV endurance sensitivity: (CL^1.5/CD)max ~ CD0^-1/4 ; range (L/D) ~ CD0^-1/2
R["exponents"] = dict(range=round(100*((0.9)**-0.5-1), 2), endurance=round(100*((0.9)**-0.25-1), 2))

# ---------- 7. small UAV (fixed wing, electric) ----------
mU, SU, ARU, eU = 2.5, 0.5, 8.0, 0.8; KU = 1/(math.pi*ARU*eU); cU = math.sqrt(SU/ARU)
E_batt = 100*3600*0.85; eta_tot = 0.55; P_av = 3.0
def uav_best(cd_wing):
    cdmin, kp, clm = cd_wing
    best = None
    for v in np.linspace(6, 30, 3000):
        CLx = mU*g/(0.5*1.225*v**2*SU)
        if CLx > 1.15: continue
        CDx = 0.012 + cdmin + kp*(CLx-clm)**2 + KU*CLx**2
        P = 0.5*1.225*v**3*SU*CDx/eta_tot + P_av
        if best is None or P < best[0]: best = (P, v, CLx)
    return best
U = {}
for lab, cdw in [("good", (0.010, 0.012, 0.6)), ("bubble", (0.014, 0.030, 0.4))]:
    P, v, CLx = uav_best(cdw); U[lab] = dict(cdsec=round((cdw[0]+cdw[1]*(CLx-cdw[2])**2)*1e4), P=round(P, 1), V=round(v, 1), CL=round(CLx, 2), E_min=round(E_batt/P/60, 1),
                                            Re=f"{1.225*v*cU/1.81e-5:.2g}")
R["uav"] = U
# quadcopter
mq, Rq, sig_q, kq = 2.0, 0.127, 0.10, 1.25; Aq = math.pi*Rq**2; Tq = mq*g/4; VT = 80.0
Pi_id = Tq**1.5/math.sqrt(2*1.225*Aq)
Q = {}
for cd0 in [0.015, 0.020, 0.025, 0.035]:
    P0 = sig_q*cd0/8*1.225*Aq*VT**3
    Prot = kq*Pi_id + P0
    Ptot = 4*Prot/0.75 + 5.0
    Q[f"{cd0}"] = dict(P0=round(P0, 2), FM=round(Pi_id/Prot, 3), Ptot=round(Ptot, 1), E=round(74*3600*0.8/Ptot/60, 1))
R["quad"] = dict(Pi_id=round(Pi_id, 2), CT=round(Tq/(1.225*Aq*VT**2), 5), Re=f"{1.225*0.6*VT*0.02/1.81e-5:.2g}", cases=Q)

# ---------- 8. helicopter hover ----------
Rh, VTh, sigh, kh, Nb = 6.6, 215.0, 0.08, 1.15, 4
Ah = math.pi*Rh**2; ch = sigh*math.pi*Rh/Nb
def cd_bailey(al, cd0=0.0087, k1=-0.0216, k2=0.4): return cd0 + k1*al + k2*al**2
def hover_P(T, rho_, cd0, k2=0.4, sc=1.0, clds=0.75):
    CT = T/(rho_*Ah*VTh**2); clm = 6*CT/sigh; al = clm/5.73
    cdm = sc*(cd0 + -0.0216*al*(cd0/0.0087) + k2*al**2 + 1.5*max(0.0, clm-clds)**2)
    Pi = kh*T**1.5/math.sqrt(2*rho_*Ah); P0 = sigh*cdm/8*rho_*Ah*VTh**3
    return Pi, P0, CT, cdm
rho_hh = isa(3000, 20)[0]
W_h = 5500*g
Pi_b, P0_b, CT_b, cdm_b = hover_P(W_h, rho_hh, 0.0087)
Pav = Pi_b + P0_b
def T_for_P(Pt, cd0, sc=1.0):
    lo, hi = 0.5*W_h, 1.5*W_h
    for _ in range(80):
        m = (lo+hi)/2; Pi, P0, *_ = hover_P(m, rho_hh, cd0, sc=sc)
        lo, hi = (m, hi) if Pi+P0 < Pt else (lo, m)
    return m
H = dict(rho=round(rho_hh, 4), CT=round(CT_b, 5), CTs=round(CT_b/sigh, 4), cdm=round(cdm_b, 5), Pi=round(Pi_b/1e3, 1), P0=round(P0_b/1e3, 1),
         Ptot=round(Pav/1e3, 1), FM=round(Pi_b/kh/(Pi_b+P0_b), 3), chord=round(ch, 3))
for lab, cd0 in [("m10", 0.0087*0.9), ("p25", 0.0087*1.25)]:
    Tn = T_for_P(Pav, cd0); H[f"dW_{lab}"] = round((Tn-W_h)/g)
for lab, sc in [("s90", 0.9), ("s125", 1.25)]:
    Tn = T_for_P(Pav, 0.0087, sc); H[f"dW_{lab}"] = round((Tn-W_h)/g)
H["P0share"] = round(100*P0_b/Pav, 1)
R["heli"] = H
# FM vs CT/sigma
fig, ax = plt.subplots(figsize=FS)
cts = np.linspace(0.02, 0.16, 170)
R["fm"] = {}
for i, (lab, cd0, k2, cds) in enumerate([("Advanced section ($c_{d0}$=0.0075)", 0.0075, 0.32, 0.85),
                                     ("NACA 0012 baseline ($c_{d0}$=0.0087)", 0.0087, 0.40, 0.75),
                                     ("Eroded/rough ($c_{d0}$=0.0115)", 0.0115, 0.45, 0.70)]):
    fm = []
    for cs in cts:
        CT = cs*sigh; T = CT*1.225*Ah*VTh**2
        Pi, P0, *_ = hover_P(T, 1.225, cd0, k2, clds=cds)
        fm.append((Pi/kh)/(Pi+P0))
    ax.plot(cts, fm, color=C[i], ls=LS[i], label=lab)
    R["fm"][f"{cd0}"] = dict(fm08=round(float(np.interp(0.08, cts, fm)), 3), fmmax=round(max(fm), 3), ctsmax=round(float(cts[int(np.argmax(fm))]), 3))
ax.set_xlabel("Blade loading $C_T/\\sigma$"); ax.set_ylabel("Figure of merit FM"); ax.legend(loc="lower center"); ax.set_ylim(0.25, 0.8)
save(fig, "f6_fm")
# forward flight with blade-element profile power incl. compressibility
f_eq = 1.8
def fwd_power(V, rho_, a_, cd0, tc, kA, W=5500*g):
    vh = math.sqrt(W/(2*rho_*Ah)); vi = vh
    for _ in range(100): vi = vh**2/math.sqrt(V**2 + vi**2)
    Pi = kh*W*vi
    r = np.linspace(0.2, 1.0, 60)*Rh; psi = np.linspace(0, 2*np.pi, 120, endpoint=False)
    RR, PP = np.meshgrid(r, psi)
    U = (VTh/Rh)*RR + V*np.sin(PP); U = np.clip(U, 0, None)
    Mloc = U/a_
    Mdd = kA - tc; Mcr = Mdd - (0.1/80)**(1/3)
    dcd = np.where(Mloc > Mcr, 20*(Mloc-Mcr)**4, 0.0)
    # mean section cl around 0.45 -> cd from Bailey
    cdloc = cd0*(1+0.12) + dcd
    integrand = 0.5*rho_*U**3*cdloc*ch
    P0 = Nb*np.trapezoid(np.mean(integrand, axis=0), r)
    Pp = 0.5*rho_*V**3*f_eq
    return Pi, P0, Pp
rho0, a0, _ = isa(0)
Vs = np.linspace(0.1, 90, 80)
fig, ax = plt.subplots(figsize=FS)
cases = [("Conventional tip, $t/c$=0.12, $c_{d0}$=0.0087", 0.0087, 0.12, 0.87),
         ("Thin advanced tip, $t/c$=0.08, $c_{d0}$=0.0080", 0.0080, 0.08, 0.92)]
Hf = {}
for i, (lab, cd0, tc, kA) in enumerate(cases):
    tot, pro = [], []
    for V in Vs:
        Pi, P0, Pp = fwd_power(V, rho0, a0, cd0, tc, kA); tot.append((Pi+P0+Pp)/1e3); pro.append(P0/1e3)
    ax.plot(Vs*3.6/1.852, tot, color=C[i], ls="-", label=lab + " (total)")
    ax.plot(Vs*3.6/1.852, pro, color=C[i], ls="--", label="  profile power")
    Hf[f"c{i}"] = dict(P0_hover=round(pro[0], 1), P0_140kt=round(np.interp(140*1.852/3.6, Vs, pro), 1), Ptot_140kt=round(np.interp(140*1.852/3.6, Vs, tot), 1),
                       Pmin=round(min(tot), 1), Vbe_kt=round(Vs[int(np.argmin(tot))]*3.6/1.852))
Pi, P0, Pp = fwd_power(0.1, rho0, a0, 0.0087, 0.12, 0.87)
ax.plot(Vs*3.6/1.852, [ (fwd_power(V, rho0, a0, 0.0087, 0.12, 0.87)[0])/1e3 for V in Vs], color=C[2], ls=":", label="Induced power")
ax.plot(Vs*3.6/1.852, [0.5*rho0*V**3*f_eq/1e3 for V in Vs], color=C[3], ls="-.", label="Parasite power ($f$=1.8 m$^2$)")
ax.set_ylim(0, 1800); ax.set_xlabel("Forward speed (kt)"); ax.set_ylabel("Main-rotor power (kW)"); ax.legend(fontsize=5.8, loc="upper left")
save(fig, "f7_heli_fwd")
Hf["Mtip_140kt"] = round((VTh+140*1.852/3.6)/a0, 3); Hf["Mcr_conv"] = round(0.87-0.12-(0.1/80)**(1/3), 3); Hf["Mcr_adv"] = round(0.92-0.08-(0.1/80)**(1/3), 3)
R["heli_fwd"] = Hf
json.dump(R, open("results.json", "w"), indent=1)
print(json.dumps(R, indent=1))

# ---------- 9. take-off second-segment climb (OEI) ----------
T_oei = 0.135*78000*g   # one-engine thrust available, hot day
def mtow(LDto, grad=0.024): return T_oei/(grad + 1/LDto)/g
m0 = mtow(9.0); m1 = mtow(9.0*1.05); m01 = mtow(9.0*1.01)
R["takeoff"] = dict(m0=round(m0), m1=round(m1), dm=round(m1-m0), dmpct=round(100*(m1/m0-1), 2), dm1pct=round(m01-m0), sens=round(100*(m01/m0-1), 3))
# ---------- 10. helicopter specific range from forward-flight model ----------
SR = {}
for i, (lab, cd0, tc, kA) in enumerate(cases):
    vals = []
    for V in np.linspace(20, 85, 200):
        Pi, P0, Pp = fwd_power(V, rho0, a0, cd0, tc, kA); vals.append((V/(Pi+P0+Pp), V))
    best = max(vals)
    SR[f"c{i}"] = dict(V_br_kt=round(best[1]*3.6/1.852), km_per_MJ=round(best[0]*1e6/1e3, 3))
R["heli_sr"] = SR
json.dump(R, open("results.json", "w"), indent=1)

# ---------- 11. extra figures ----------
# (a) vehicle classes on Re-M map
fig, ax = plt.subplots(figsize=(3.4, 2.9))
boxes = [("Multicopter", 3e4, 2e5, 0.02, 0.3, (3.3e4, 0.33)), ("Small UAV", 5e4, 5e5, 0.02, 0.08, (6e4, 0.014)),
         ("Sailplane / HALE", 5e5, 3e6, 0.05, 0.2, (4.0e5, 0.036)), ("Turboprop / GA", 3e6, 1.5e7, 0.15, 0.6, (1.6e7, 0.2)),
         ("Helicopter blade", 1.5e6, 8e6, 0.25, 0.88, (3e5, 1.0)), ("Jet transport", 1e7, 5e7, 0.72, 0.86, (5.5e7, 0.62)),
         ("Combat", 2e7, 1e8, 0.6, 2.0, (2.2e7, 2.2))]
for i, (lab, r0, r1, m0_, m1_, pos) in enumerate(boxes):
    col = C[i % 4]; ls = ["-", "--", "-.", ":"][i % 4]
    ax.add_patch(plt.Rectangle((r0, m0_), r1-r0, m1_-m0_, fill=False, ec=col, ls=ls, lw=1.4))
    ax.text(pos[0], pos[1], lab, fontsize=6.3, color="#000", bbox=dict(fc="white", ec="none", pad=0.6))
ax.set_xscale("log"); ax.set_yscale("log"); ax.set_xlim(1e4, 1e9); ax.set_ylim(0.01, 4.0)
ax.set_xlabel("Chord Reynolds number $Re$"); ax.set_ylabel("Mach number $M$")
save(fig, "f0_re_mach_map")
# (b) illustrative section polars
fig, ax = plt.subplots(figsize=FS)
cl = np.linspace(-0.2, 1.45, 300)
lam = 0.0045 + 0.0004*cl**2 + np.where(np.abs(cl-0.45) > 0.35, 0.03*np.clip(np.abs(cl-0.45)-0.35, 0, None)**1.2, 0) + 0.02*np.clip(cl-1.15, 0, None)**2*10
turb = 0.0080 + 0.004*(cl-0.3)**2 + 0.02*np.clip(cl-1.25, 0, None)**2*10
lowre = 0.0130 + 0.010*(cl-0.55)**2 + 0.012*np.clip(0.3-cl, 0, None) + 0.05*np.clip(cl-1.05, 0, None)**2*10
for i, (y, lab) in enumerate([(lam, "Laminar (NLF) section, $Re\\approx6\\times10^6$"), (turb, "Turbulent section, $Re\\approx6\\times10^6$"),
                              (lowre, "Low-$Re$ section, $Re\\approx10^5$")]):
    ax.plot(y*1e4, cl, color=C[i], ls=LS[i], label=lab)
ax.set_xlim(0, 300); ax.set_xlabel("Section drag $c_d$ (counts)"); ax.set_ylabel("Section lift $c_l$")
ax.legend(loc="upper center", bbox_to_anchor=(0.5, -0.2), fontsize=6.3, ncol=1)
save(fig, "f0b_polars")
# (c) take-off mass vs take-off L/D
fig, ax = plt.subplots(figsize=FS)
LDs = np.linspace(7.5, 11, 100)
for i, tw in enumerate([0.125, 0.135, 0.145]):
    Tq_ = tw*78000*g
    ax.plot(LDs, [Tq_/(0.024+1/l)/g/1000 for l in LDs], color=C[i], ls=LS[i], label=f"$T_{{OEI}}$ = {tw:.3f} $W_{{ref}}$")
ax.set_xlabel("Take-off configuration $L/D$"); ax.set_ylabel("Climb-limited take-off mass (t)"); ax.legend()
save(fig, "f4b_takeoff")
# (d) quadcopter endurance & FM vs cd
fig, ax = plt.subplots(figsize=FS)
cds = np.linspace(0.010, 0.040, 60)
FMs, Es = [], []
for cd0 in cds:
    P0 = sig_q*cd0/8*1.225*Aq*VT**3; Prot = kq*Pi_id + P0; Ptot = 4*Prot/0.75 + 5.0
    FMs.append(Pi_id/Prot); Es.append(74*3600*0.8/Ptot/60)
ax.plot(cds, Es, color=C[0], ls="-")
for cdm_ in (0.012, 0.02, 0.028, 0.036):
    j = int(np.argmin(abs(cds-cdm_))); ax.plot(cds[j], Es[j], "o", color=C[1], ms=4)
    ax.annotate(f"FM={FMs[j]:.2f}", (cds[j], Es[j]), textcoords="offset points", xytext=(4, 5), fontsize=6.5)
ax.set_xlabel("Rotor mean profile drag coefficient $\\bar c_d$"); ax.set_ylabel("Hover endurance (min)")
save(fig, "f10_quad")
# GA light aircraft top speed: V ~ (P eta / (0.5 rho S CD0))^(1/3) approximately (induced small)
Pga, etag, Sga, Wga = 150e3, 0.82, 16.2, 1150*g
def vmax(cd0):
    v = 60
    for _ in range(200):
        CLx = Wga/(0.5*1.225*v**2*Sga); D = 0.5*1.225*v**2*Sga*(cd0 + CLx**2/(math.pi*7.4*0.78))
        v = v*(Pga*etag/(D*v))**(1/3)
    return v
R["ga"] = dict(v_turb=round(vmax(0.0300)*1.944, 1), v_lam=round(vmax(0.0300-0.0045)*1.944, 1), v_10=round(vmax(0.0300-0.0012)*1.944, 1))
# value of one drag count
VC = {}
VC["transport_fuel_kg"] = round(mission_fuel(LD0) - mission_fuel(LD(CD0-0.0001)), 1)
VC["transport_pct"] = round(100*(mission_fuel(LD0) - mission_fuel(LD(CD0-0.0001)))/mission_fuel(LD0), 3)
VC["sail_LD"] = round(LDg(CD0g_c-0.0001)-LDg(CD0g_c), 3)
VC["fighter_n"] = round(nsus(CD0f-0.0001, Kf)[0]-n0, 4)
VC["turboprop_pct"] = round(100*((CLt/(0.026-0.0001+Kt*CLt**2))/LDt0-1), 3)
Pi_x, P0_x, *_ = hover_P(W_h, rho_hh, 0.0087); Pt = Pi_x + P0_x
lo, hi = 0.9*W_h, 1.1*W_h
for _ in range(80):
    mm = (lo+hi)/2; a_, b_, *_r = hover_P(mm, rho_hh, 0.0087); cdm_ = _r[1]
    # replace mean cd by (cdm - 0.0001)
    CTm = mm/(rho_hh*Ah*VTh**2); P0n = sigh*(cdm_-0.0001)/8*rho_hh*Ah*VTh**3
    lo, hi = (mm, hi) if a_ + P0n < Pt else (lo, mm)
VC["heli_kg"] = round((mm-W_h)/g, 1)
P0a = sig_q*0.0200/8*1.225*Aq*VT**3; P0b = sig_q*0.0199/8*1.225*Aq*VT**3
Ea = 74*3600*0.8/(4*(kq*Pi_id+P0a)/0.75+5); Eb = 74*3600*0.8/(4*(kq*Pi_id+P0b)/0.75+5)
VC["quad_s"] = round(Eb-Ea, 2)
R["count"] = VC
json.dump(R, open("results.json", "w"), indent=1)

# ---------- 12. more figures and robustness checks ----------
# (a) UAV power vs speed for two polars
fig, ax = plt.subplots(figsize=FS)
vv = np.linspace(7, 22, 200)
for i, (lab, (cdmin, kp, clm)) in enumerate([("Low-$Re$ section", (0.010, 0.012, 0.6)), ("Bubble-prone section", (0.014, 0.030, 0.4))]):
    P = []
    for v in vv:
        CLx = mU*g/(0.5*1.225*v**2*SU)
        CDx = 0.012 + cdmin + kp*(CLx-clm)**2 + KU*CLx**2
        P.append(0.5*1.225*v**3*SU*CDx/eta_tot + P_av if CLx <= 1.15 else np.nan)
    ax.plot(vv, P, color=C[i], ls=LS[i], label=lab)
ax.set_xlabel("Airspeed (m/s)"); ax.set_ylabel("Battery power required (W)"); ax.legend(); ax.set_ylim(25, 90); ax.set_xlim(8, 20)
save(fig, "f11_uav_power")
# (b) fighter turn rate vs reduction in CD0-wing or K
fig, ax = plt.subplots(figsize=FS)
rr = np.linspace(0, 0.3, 50)
ax.plot(rr*100, [turnrate(nsus(CD0f - r_*0.008, Kf)[0]) for r_ in rr], color=C[0], ls="-", label="Wing profile drag reduced")
ax.plot(rr*100, [turnrate(nsus(CD0f, Kf*(1-r_))[0]) for r_ in rr], color=C[1], ls="--", label="Induced-drag factor $K$ reduced")
ax.set_xlabel("Reduction (%)"); ax.set_ylabel("Sustained turn rate (deg/s)"); ax.legend()
save(fig, "f12_fighter")
# (c) hover mass change vs blade drag scale for two atmospheres
fig, ax = plt.subplots(figsize=FS)
scs = np.linspace(0.8, 1.4, 40)
for i, (lab, rho_x) in enumerate([("Sea level ISA", isa(0)[0]), ("3 000 m ISA+20 °C", rho_hh)]):
    Pi_b2, P0_b2, *_ = hover_P(W_h, rho_x, 0.0087); Pt2 = Pi_b2 + P0_b2
    out = []
    for sc_ in scs:
        lo, hi = 0.7*W_h, 1.3*W_h
        for _ in range(60):
            mm = (lo+hi)/2; a_, b_, *_r = hover_P(mm, rho_x, 0.0087, sc=sc_)
            lo, hi = (mm, hi) if a_+b_ < Pt2 else (lo, mm)
        out.append((mm-W_h)/g)
    ax.plot(scs, out, color=C[i], ls=LS[i], label=lab)
    R.setdefault("heli_atm", {})[lab] = dict(P0share=round(100*P0_b2/Pt2, 1), d125=round(float(np.interp(1.25, scs, out))))
ax.axhline(0, color=C[3], lw=0.8); ax.set_xlabel("Blade drag polar scale factor"); ax.set_ylabel("Change in hover-capable mass (kg)"); ax.legend()
save(fig, "f13_heli_payload")
# (d) GA: Vmax and fuel-at-fixed-speed vs CD0
fig, ax = plt.subplots(figsize=FS)
cd0s = np.linspace(0.022, 0.034, 40)
vm = [vmax(c)*1.944 for c in cd0s]
def p_at(cd0, vkt=130):
    v = vkt/1.944; CLx = Wga/(0.5*1.225*v**2*Sga); return 0.5*1.225*v**3*Sga*(cd0 + CLx**2/(math.pi*7.4*0.78))/etag
pref = p_at(0.030)
ax.plot(cd0s, [100*(x/vmax(0.030)/1.944-1) for x in vm], color=C[0], ls="-", label="Change in $V_{max}$ at full power")
ax.plot(cd0s, [100*(p_at(c)/pref-1) for c in cd0s], color=C[1], ls="--", label="Change in power (fuel flow) at 130 kt")
ax.axvline(0.030, color=C[3], lw=0.8, ls=":"); ax.set_xlabel("Zero-lift drag coefficient $C_{D0}$"); ax.set_ylabel("Change from baseline (%)"); ax.legend(fontsize=6.3)
save(fig, "f14_ga")
R["ga"]["p130_lam"] = round(100*(p_at(0.030-0.0045)/pref-1), 1)
# robustness of transport sensitivity
rob = {}
def fuel_sav(AR_=9.5, wshare=0.35, tsfc=0.57, clf=1.0):
    K_ = 1/(math.pi*AR_*0.82); CL_ = CL*clf; cdw = 0.02*wshare
    ld0 = CL_/(0.02+0.001+K_*CL_**2); ld1 = CL_/(0.02-0.1*cdw+0.001+K_*CL_**2)
    c_ = tsfc/3600
    f0_ = math.exp(Rng*c_/(Vtr*ld0))-1; f1_ = math.exp(Rng*c_/(Vtr*ld1))-1
    return round(100*(f0_-f1_)/f0_, 2)
rob["base"] = fuel_sav(); rob["AR10.5"] = fuel_sav(AR_=10.5); rob["AR8.5"] = fuel_sav(AR_=8.5)
rob["w30"] = fuel_sav(wshare=0.30); rob["w40"] = fuel_sav(wshare=0.40)
rob["tsfc0.53"] = fuel_sav(tsfc=0.53); rob["tsfc0.62"] = fuel_sav(tsfc=0.62)
rob["CL0.9"] = fuel_sav(clf=0.9); rob["CL1.1"] = fuel_sav(clf=1.1)
R["robust"] = rob
json.dump(R, open("results.json", "w"), indent=1)

# ---------- 13. HALE Reynolds number vs altitude, eVTOL FM vs tip speed ----------
def mu_suth(T): return 1.458e-6*T**1.5/(T+110.4)
fig, ax = plt.subplots(figsize=FS)
hs = np.linspace(0, 20000, 100)
for i, (eas, ch) in enumerate([(30, 1.0), (60, 1.0), (30, 0.5)]):
    re = []
    for h in hs:
        r_, a_, T_ = isa(h); v_ = eas/math.sqrt(r_/1.225); re.append(r_*v_*ch/mu_suth(T_))
    ax.plot(hs/1000, re, color=C[i], ls=LS[i], label=f"EAS {eas} m/s, chord {ch} m")
ax.axhspan(5e4, 5e5, color="#bbbbbb", alpha=0.25); ax.text(11, 7e4, "bubble-sensitive range", fontsize=6.5)
ax.set_yscale("log"); ax.set_xlabel("Altitude (km)"); ax.set_ylabel("Chord Reynolds number"); ax.set_ylim(4e4, 1e7); ax.legend(fontsize=6.3, loc="upper right", ncol=1)
save(fig, "f15_hale_re")
r18, a18, T18 = isa(18000); R["hale"] = dict(rho18=round(r18, 4), re18=f"{r18*(30/math.sqrt(r18/1.225))*1.0/mu_suth(T18):.2g}",
                                            re0=f"{1.225*30*1.0/mu_suth(288.15):.2g}")
# HALE endurance sensitivity: AR 25, e .9, CD0 other 0.008, wing cd 0.008 vs 0.0104 (+30%) at loiter
K_h = 1/(math.pi*25*0.9)
def end_par(cdw): CD0x = 0.008+cdw; return (3*CD0x/K_h)**0.75/(4*CD0x)
R["hale"]["E_loss_pct"] = round(100*(1-end_par(0.0104)/end_par(0.008)), 2)
R["hale"]["LDmax"] = round(0.5/math.sqrt((0.016)*K_h), 1)
# eVTOL lift rotor: fixed thrust, tip speed varied; sigma fixed -> CT/sigma rises
fig, ax = plt.subplots(figsize=FS)
Te, Re_, sige, ke = 2200*g/6, 1.6, 0.15, 1.15
Ae = math.pi*Re_**2
tips = np.linspace(120, 230, 80)
R["evtol"] = {}
for i, (lab, cd0, k2, cds_) in enumerate([("Advanced section", 0.0080, 0.30, 0.95), ("Conventional section", 0.0095, 0.40, 0.80)]):
    fmv = []
    for vt in tips:
        CT = Te/(1.225*Ae*vt**2); clm = 6*CT/sige; al = clm/5.73
        cdm = cd0 - 0.0216*al*(cd0/0.0087) + k2*al**2 + 1.5*max(0, clm-cds_)**2
        Pi = ke*Te**1.5/math.sqrt(2*1.225*Ae); P0 = sige*cdm/8*1.225*Ae*vt**3
        fmv.append((Pi/ke)/(Pi+P0))
    ax.plot(tips, fmv, color=C[i], ls=LS[i], label=lab)
    j = int(np.argmax(fmv)); R["evtol"][lab] = dict(vt_best=round(float(tips[j])), fm_best=round(fmv[j], 3), fm140=round(float(np.interp(140, tips, fmv)), 3),
                                                     fm200=round(float(np.interp(200, tips, fmv)), 3))
ax.set_xlabel("Tip speed (m/s)"); ax.set_ylabel("Figure of merit"); ax.legend(loc="lower center")
save(fig, "f16_evtol")
json.dump(R, open("results.json", "w"), indent=1)

# ---------- 14. sensitivity summary bar chart ----------
items = [("Jet transport: fuel (A)", 0.23), ("Turboprop: range", 0.27), ("Sailplane: $(L/D)_{max}$ (D)", 0.25),
         ("Mini-UAV: endurance (E)", 0.16), ("Light aircraft: $V_{max}$", 0.14), ("Fighter: turn rate, $c_{d,min}$ (G)", 0.10),
         ("Fighter: turn rate, $K$ (G)", 0.57), ("Helicopter: hover mass (H)", 0.085), ("Quadcopter: endurance (J)", 0.11)]
fig, ax = plt.subplots(figsize=(3.4, 2.7))
ys = np.arange(len(items))[::-1]
ax.barh(ys, [v for _, v in items], color=[C[1] if "K" in n else C[0] for n, _ in items], height=0.6)
for y_, (n, v) in zip(ys, items): ax.text(v+0.01, y_, f"{v:.2f}", va="center", fontsize=6.5)
ax.set_yticks(ys); ax.set_yticklabels([n for n, _ in items], fontsize=6.5); ax.set_xlim(0, 0.7)
ax.set_xlabel("% change in metric per 1 % change in drag quantity"); ax.grid(axis="y", visible=False)
save(fig, "f17_sens")
# economic value of a drag count: transport
R["econ"] = dict(t_per_count_per_1000=round(R["count"]["transport_fuel_kg"]*1000/1000, 1))
json.dump(R, open("results.json", "w"), indent=1)
