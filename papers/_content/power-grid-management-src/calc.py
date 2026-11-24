#!/usr/bin/env python3
"""
TOOL:    papers/_content/power-grid-management-src/calc.py
FAMILY:  papers
VERSION: 1.3.0
DATE:    2026-11-24
CHAT:    Power and grid management technical paper
CHANGES: 1.3.0 - Ferranti voltage rise on an open-ended line
         1.2.0 - loss-of-load probability, distribution reliability indices, coal technical minimum
         1.1.0 - transformer ageing, black-start auxiliary power and large-load-loss frequency rise
         1.0.0 - worked calculations: RoCoF and inertia, droop, AGC, economic dispatch, line losses vs voltage,
                 frequency-response simulation, blackout figures, duck-curve ramp, curtailment, dynamic line rating,
                 HVDC vs AC losses, BESS sizing, AT&C value, reserves, synthetic inertia
STATUS:  working

Run: python3 calc.py  -> prints results and writes calc_results.json (used by figs.py).
Values marked 'assumed' in the paper are typical engineering figures, not measurements.
"""
__version__ = "1.3.0"

import json
import math
from pathlib import Path

R = {}


def put(k, v, nd=4):
    R[k] = round(v, nd) if isinstance(v, float) else v
    print(f"{k:44s} {R[k]}")


F0 = 50.0

# ---------------- WE1 RoCoF from the swing equation: df/dt = dP * f0 / (2 * H * S)
S, dP = 250.0, 4.0                       # GW online (assumed India-like), GW lost
for H in (5.0, 4.0, 2.5):
    put(f"rocof_H{H}_Hz_per_s", dP * F0 / (2 * H * S), 3)
put("kinetic_energy_H4_GWs", 4.0 * S, 0)

# ---------------- WE2 governor droop
R_droop = 0.05
unit = 500.0
df = 0.2
put("droop_unit_MW_for_0p2Hz", (df / F0) / R_droop * unit, 1)
resp = 150.0                             # GW of responsive capacity (assumed)
put("droop_system_GW_for_0p2Hz", (df / F0) / R_droop * resp, 2)
D = 1.0                                  # load damping, % load per % frequency (assumed)
# beta in GW/Hz: generators resp/(R*f0) + load D*S/f0
beta = resp / (R_droop * F0) + D * S / F0
put("beta_GW_per_Hz", beta, 2)
put("steady_state_df_for_4GW_Hz", dP / beta, 4)

# ---------------- WE3 area control error (US convention, B negative MW/0.1 Hz)
ni_a, ni_s = 1300.0, 1000.0             # MW actual vs scheduled export
fa, fs = 59.98, 60.0
B = -150.0                               # MW/0.1 Hz (assumed)
ace = (ni_a - ni_s) - 10 * B * (fa - fs)
put("ace_MW", ace, 1)

# ---------------- WE4 economic dispatch, three units C_i = a + b P + c P^2 (Rs/h, P in MW)
units = [("Coal A", 2.0, 0.0010, 150, 600), ("Coal B", 2.4, 0.0008, 100, 500), ("Gas C", 4.0, 0.0015, 50, 300)]
# marginal cost b + 2cP (Rs/kWh with P in MW -> scale: use Rs/kWh units directly)
Dem = 900.0


def dispatch(lam):
    out = []
    for n, b, c, pmin, pmax in units:
        p = (lam - b) / (2 * c)
        out.append(min(max(p, pmin), pmax))
    return out


lo, hi = 0.0, 20.0
for _ in range(100):
    mid = (lo + hi) / 2
    if sum(dispatch(mid)) > Dem:
        hi = mid
    else:
        lo = mid
lam = (lo + hi) / 2
ps = dispatch(lam)
put("ed_lambda_Rs_per_kWh", lam, 3)
for (n, *_), p in zip(units, ps):
    put(f"ed_{n.replace(' ', '_')}_MW", p, 1)
cost = sum((b * p + c * p * p) * 1000 for (n, b, c, *_), p in zip(units, ps))   # Rs/h (P MW*1000 kWh)
put("ed_cost_Rs_per_h", cost, 0)
# naive equal split
eq = [Dem / 3] * 3
cost_eq = sum((b * p + c * p * p) * 1000 for (n, b, c, *_), p in zip(units, eq))
put("ed_equal_split_cost_Rs_per_h", cost_eq, 0)
put("ed_saving_Rs_per_h", cost_eq - cost, 0)
R["ed_units"] = units
R["ed_dispatch"] = ps

# ---------------- WE5 line losses vs voltage: 500 MW over 300 km, R = 0.03 ohm/km per phase (assumed)
P, L, r = 500e6, 300, 0.03
for V in (220e3, 400e3, 765e3):
    I = P / (math.sqrt(3) * V * 0.95)
    loss = 3 * I ** 2 * r * L
    put(f"loss_{int(V/1e3)}kV_I_A", I, 0)
    put(f"loss_{int(V/1e3)}kV_MW", loss / 1e6, 2)
    put(f"loss_{int(V/1e3)}kV_pct", loss / P * 100, 2)

# ---------------- WE6 GB 9 Aug 2019
put("gb_lfdd_kW_per_customer", 973e3 / 1.1e6, 3)

# ---------------- WE7 ERCOT Feb 2021
put("ercot_outage_pct_installed", 52277 / 107514 * 100, 1)
put("ercot_shed_pct_of_unshed_peak", 20.0 / 76.8 * 100, 1)

# ---------------- WE8 system inertia as synchronous share falls
for sync in (0.8, 0.5, 0.3):
    Hs = sync * 5.0          # converters contribute none (assumed)
    put(f"Hsys_sync{int(sync*100)}", Hs, 2)
    put(f"rocof_sync{int(sync*100)}", dP * F0 / (2 * Hs * S), 3)

# ---------------- WE9 duck-curve ramp (India)
ramp_gw, hours = 60.0, 3.0
put("ramp_GW_per_h", ramp_gw / hours, 1)
put("ramp_MW_per_min", ramp_gw / hours * 1000 / 60, 0)
coal_online = 180.0          # GW (assumed)
put("coal_ramp_1pct_MW_per_min", coal_online * 1000 * 0.01, 0)

# ---------------- WE10 curtailment value
put("curtail_10GW_3h_GWh", 10 * 3, 0)
put("curtail_households_equiv_M", 30e6 / 5 / 1e6, 1)     # 5 kWh/day household (assumed)

# ---------------- WE11 dynamic line rating (simplified heat balance, ACSR 'Drake'-like, assumed values)
D_m, Rac = 0.0281, 8.7e-5          # m, ohm/m at 75 C
Tc, Ta = 75.0, 40.0
qs = 0.5 * 1000 * D_m              # W/m solar (absorptivity 0.5, 1000 W/m2)
eps, sig = 0.5, 5.67e-8
qr = eps * sig * math.pi * D_m * ((Tc + 273.15) ** 4 - (Ta + 273.15) ** 4)
kf, nu = 0.0285, 1.8e-5
amps = {}
for v in (0.6, 1.0, 2.0, 4.0):
    Re = v * D_m / nu
    Nu = 0.65 * Re ** 0.2 + 0.23 * Re ** 0.61       # McAdams-style correlation
    qc = Nu * kf * math.pi * (Tc - Ta)
    I = math.sqrt(max(qc + qr - qs, 0) / Rac)
    amps[v] = I
    put(f"dlr_I_at_{v}ms_A", I, 0)
put("dlr_gain_2ms_vs_0p6_pct", (amps[2.0] / amps[0.6] - 1) * 100, 1)
put("dlr_gain_4ms_vs_0p6_pct", (amps[4.0] / amps[0.6] - 1) * 100, 1)
R["dlr"] = {str(k): v for k, v in amps.items()}

# ---------------- WE12 HVDC vs HVAC losses, 3 GW over 1,500 km (assumed conductor resistances)
Pt, Lk = 3000e6, 1500
Vdc = 800e3
Idc = Pt / (2 * Vdc)
rdc = 0.0075                     # ohm/km per pole (6-conductor bundle, assumed)
loss_dc = 2 * Idc ** 2 * rdc * Lk + 2 * 0.007 * Pt   # line + converters (0.7 % per station, assumed)
put("hvdc_I_A", Idc, 0)
put("hvdc_line_loss_MW", 2 * Idc ** 2 * rdc * Lk / 1e6, 1)
put("hvdc_total_loss_pct", loss_dc / Pt * 100, 2)
Vac = 765e3
Iac = Pt / (math.sqrt(3) * Vac * 0.98) / 2           # two circuits
rac = 0.0125                                          # ohm/km per phase (quad bundle, assumed)
loss_ac = 2 * 3 * Iac ** 2 * rac * Lk
put("hvac_I_per_circuit_A", Iac, 0)
put("hvac_line_loss_pct", loss_ac / Pt * 100, 2)

# ---------------- WE13 BESS for India's evening ramp
share, dur = 0.25, 4.0
put("bess_power_GW", ramp_gw * share, 1)
put("bess_energy_GWh", ramp_gw * share * dur, 0)
put("bess_vs_installed_ratio", ramp_gw * share * dur / 8.3, 1)

# ---------------- WE14 value of AT&C loss reduction (assumed input energy and tariff)
E_in, tariff = 1500e9, 6.0            # kWh/yr, Rs/kWh
for pp in (1.0, 7.6):
    put(f"atc_{pp}pp_Rs_crore", E_in * pp / 100 * tariff / 1e7, 0)

# ---------------- WE15 reserve for N-1
largest = 6.0     # GW, a large HVDC bipole (assumed)
put("reserve_N1_GW", largest, 1)
put("reserve_pct_of_250", largest / 250 * 100, 1)

# ---------------- WE16 synthetic inertia from grid-forming BESS
bess_mw, H_em = 1000.0, 4.0
put("gfm_equiv_MWs", bess_mw * H_em, 0)
put("gfm_equiv_sync_GW_at_H4", bess_mw * H_em / 4.0 / 1000, 2)

# ---------------- frequency-response simulation for figure (aggregated single-area model)
def simulate(H, loss=4.0, S=250.0, R=0.05, resp=150.0, Tg=9.0, D=1.5, t_end=40.0, dt=0.01, lfdd=None):
    f, pm, t = 0.0, 0.0, 0.0
    out = []
    shed = 0.0
    while t <= t_end:
        damping = D * S * (f / F0)        # GW (load relief, D=1 %/%)
        dfdt = (pm - loss + shed - damping) * F0 / (2 * H * S)
        target = -(f / F0) / R * resp
        pm += (target - pm) / Tg * dt
        f += dfdt * dt
        if lfdd and f <= lfdd[0] and shed == 0:
            shed = lfdd[1]
        out.append((round(t, 2), round(F0 + f, 4)))
        t += dt
    return out


for H in (5.0, 2.5):
    sim = simulate(H)
    nadir = min(v for _, v in sim)
    put(f"sim_nadir_H{H}", nadir, 3)
    R[f"sim_H{H}"] = sim[::10]

Path(__file__).with_name("calc_results.json").write_text(json.dumps(R, indent=1))

# ---------------- WE17 transformer insulation ageing (IEC 60076-7, non-thermally-upgraded paper)
for th in (98.0, 104.0, 110.0, 116.0):
    put(f"ageing_V_at_{int(th)}C", 2 ** ((th - 98.0) / 6.0), 3)
put("days_life_per_day_at_110C", 2 ** ((110.0 - 98.0) / 6.0), 2)

# ---------------- WE18 black start from a battery (assumed auxiliary share)
unit_mw, aux = 500.0, 0.07
put("blackstart_aux_MW", unit_mw * aux, 1)

# ---------------- WE19 sudden large-load loss: frequency rise in a large interconnection (assumed)
S_ei, H_ei, dL = 600.0, 4.0, 1.5      # GW online, s, GW lost
put("loadloss_rocof_mHz_per_s", dL * 60.0 / (2 * H_ei * S_ei) * 1000, 2)
beta_ei = 600.0 / (0.05 * 60.0) * 0.5 + 1.0 * 600.0 / 60.0     # half the fleet on governor (assumed)
put("loadloss_beta_GW_per_Hz", beta_ei, 1)
put("loadloss_df_mHz", dL / beta_ei * 1000, 1)
Path(__file__).with_name("calc_results.json").write_text(json.dumps(R, indent=1))

# ---------------- WE20 loss-of-load probability with identical units (binomial)
from math import comb
FOR, cap, load = 0.05, 100.0, 400.0
lolp = {}
for n in (5, 6, 7):
    p = sum(comb(n, k) * FOR ** k * (1 - FOR) ** (n - k) for k in range(n + 1) if (n - k) * cap < load)
    lolp[n] = p
    put(f"lolp_{n}units_pct", p * 100, 3)
    put(f"lolp_{n}units_hours_per_year", p * 8760, 1)
R["lolp"] = {str(k): v for k, v in lolp.items()}

# ---------------- WE21 distribution reliability indices
cust = 2000
events = [(1200, 2.0), (800, 1.5), (2000, 4.0)]
saifi = sum(c for c, _ in events) / cust
saidi = sum(c * h for c, h in events) / cust
put("saifi", saifi, 2)
put("saidi_h", saidi, 2)
put("caidi_h", saidi / saifi, 2)
# with feeder automation halving customers affected by the two longest events (assumed)
events2 = [(1200, 2.0), (400, 1.5), (1000, 4.0)]
put("saidi_auto_h", sum(c * h for c, h in events2) / cust, 2)

# ---------------- WE22 coal technical minimum and room for solar
coal = 200.0
for tm in (0.55, 0.40):
    put(f"coal_min_GW_at_{int(tm*100)}", coal * tm, 0)
put("solar_room_gain_GW", coal * (0.55 - 0.40), 0)
Path(__file__).with_name("calc_results.json").write_text(json.dumps(R, indent=1))

# ---------------- WE27 Ferranti effect on an open-ended 400 km line (lossless, wavelength 6,000 km at 50 Hz)
import math as _m
bl = 2 * _m.pi * 400 / 6000
put("ferranti_rise_pct", (1 / _m.cos(bl) - 1) * 100, 1)
put("ferranti_charging_Mvar", 400 * 0.55, 0)      # 0.55 Mvar/km at 400 kV (assumed)
Path(__file__).with_name("calc_results.json").write_text(json.dumps(R, indent=1))
