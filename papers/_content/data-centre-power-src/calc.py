#!/usr/bin/env python3
"""
TOOL:    papers/_content/data-centre-power-src/calc.py
FAMILY:  papers
VERSION: 1.1.0
DATE:    2026-11-24
CHAT:    Data centre power surge and efficiency technical paper
CHANGES: 1.1.0 - site case study (4 MW Chennai hall) and cooling-load measurement / low delta-T checks
         1.0.0 - worked calculations for the paper (PUE, affinity laws, chiller COP, power chain,
                 conductor losses, idle servers, consolidation, flexibility, heat reuse, water, India, wedges)
STATUS:  working

Run: python3 calc.py   -> prints every worked result and writes calc_results.json next to this file.
All inputs are stated in the paper; values marked 'assumed' are typical engineering values, not measurements.
"""
__version__ = "1.1.0"

import json
import math
from pathlib import Path

R = {}
H = 8760.0


def put(k, v, nd=4):
    R[k] = round(v, nd) if isinstance(v, float) else v
    print(f"{k:42s} {R[k]}")


# ---------------- C1 demand (IEA)
d24, d30, d35 = 415.0, 945.0, 1200.0
put("growth_24_30_TWh", d30 - d24)
put("cagr_24_30_pct", ((d30 / d24) ** (1 / 6) - 1) * 100, 2)
put("avg_power_2030_GW", d30 * 1e3 / H, 1)       # TWh -> GWh / h
put("avg_power_2024_GW", d24 * 1e3 / H, 1)

# ---------------- C2 PUE
def pue_saving(a, b):
    return 1 - b / a

put("pue_154_to_130_pct", pue_saving(1.54, 1.30) * 100, 2)
put("pue_154_to_120_pct", pue_saving(1.54, 1.20) * 100, 2)
it24 = d24 / 1.54
put("IT_2024_at_154_TWh", it24, 1)
put("saving_2024_at_130_TWh", d24 - it24 * 1.30, 1)
put("overhead_share_154_pct", (0.54 / 1.54) * 100, 1)
put("overhead_share_130_pct", (0.30 / 1.30) * 100, 1)
# 10 MW IT hall, annual
it_mw = 10.0
put("hall_10MW_154_vs_130_MWh", it_mw * (1.54 - 1.30) * H, 0)

# ---------------- C3 fan affinity
put("fan_80pct_speed_power_pct", 0.8 ** 3 * 100, 1)
# N+1 fans: 6 fans share load of 5
n_run, n_inst = 5, 6
ratio = n_inst * (n_run / n_inst) ** 3 / n_run
put("nplus1_all_running_power_ratio", ratio, 4)
put("nplus1_saving_pct", (1 - ratio) * 100, 1)
fan_kw = 0.06 * it_mw * 1000         # assumed: air-side fans 6 % of IT
put("hall_fan_kW", fan_kw, 0)
put("hall_fan_saving_MWh", fan_kw * (1 - ratio) * H / 1000, 0)
# pump with static head: system curve H = Hs + k Q^2 ; Hs = 30 % of design head (assumed)
hs = 0.30
q = 0.7
h = hs + (1 - hs) * q ** 2
put("pump_70pct_flow_power_pct_with_static", q * h * 100, 1)   # P ~ Q*H at const eff
put("pump_70pct_flow_power_pct_pure_cube", q ** 3 * 100, 1)

# ---------------- C4 chiller (Chennai condensing 40 C)
Tc = 40 + 273.15
for name, te in (("evap_5C", 5.0), ("evap_16C", 16.0)):
    Te = te + 273.15
    put(f"carnot_cop_{name}", Te / (Tc - Te), 2)
cop_a = 278.15 / (Tc - 278.15)
cop_b = 289.15 / (Tc - 289.15)
eta = 0.5   # assumed fraction of Carnot reached by a real centrifugal chiller
put("real_cop_5C", eta * cop_a, 2)
put("real_cop_16C", eta * cop_b, 2)
put("compressor_power_drop_pct", (1 - cop_a / cop_b) * 100, 1)
put("drop_per_K_pct", (1 - (cop_a / cop_b) ** (1 / 11)) * 100, 2)
# 10 MW of heat to remove
put("chiller_kW_5C", 10000 / (eta * cop_a), 0)
put("chiller_kW_16C", 10000 / (eta * cop_b), 0)

# ---------------- C5 power chain (assumed typical stage efficiencies)
legacy = {"MV/LV transformer": 0.985, "Double-conversion UPS": 0.94,
          "PDU transformer": 0.975, "Server PSU (AC-DC)": 0.92}
upgr = {"MV/LV transformer (amorphous)": 0.99, "UPS (eco-mode / SiC)": 0.985,
        "LV busway": 0.995, "PSU Titanium class": 0.965}
eL = math.prod(legacy.values())
eU = math.prod(upgr.values())
put("chain_eff_legacy_pct", eL * 100, 2)
put("chain_eff_upgraded_pct", eU * 100, 2)
# grid draw needed to deliver 100 MW to the server boards
put("grid_MW_legacy_for_100MW", 100 / eL, 2)
put("grid_MW_upgraded_for_100MW", 100 / eU, 2)
put("loss_saving_MW", 100 / eL - 100 / eU, 2)
put("loss_saving_GWh_yr", (100 / eL - 100 / eU) * H / 1000, 1)
# losses become heat: extra cooling at overhead 0.25 kW/kW
put("cooling_bonus_MW", (100 / eL - 100 / eU) * 0.25, 2)
R["chain_legacy"] = legacy
R["chain_upgraded"] = upgr

# ---------------- C6 conductor losses 415 VAC vs 800 VDC, same per-conductor R
P = 1e6
Iac = P / (math.sqrt(3) * 415 * 0.95)
Idc = P / 800
put("I_ac_415_A", Iac, 1)
put("I_dc_800_A", Idc, 1)
put("loss_ratio_dc_over_ac", (2 * Idc ** 2) / (3 * Iac ** 2), 3)
put("copper_ratio_dc_over_ac_same_size", 2 / 3, 3)
# in-rack 200 kW at 54 V vs 800 V
put("I_rack_54V_A", 200e3 / 54, 0)
put("I_rack_800V_A", 200e3 / 800, 0)
put("I2R_ratio_54_over_800", (800 / 54) ** 2, 0)

# ---------------- C7 idle (comatose) servers, enterprise site
n_srv, frac_z, p_idle = 4000, 0.25, 180.0
pue_ent = 1.7
kw_it = n_srv * frac_z * p_idle / 1000
put("zombie_IT_kW", kw_it, 0)
put("zombie_site_kW", kw_it * pue_ent, 0)
mwh = kw_it * pue_ent * H / 1000
put("zombie_MWh_yr", mwh, 0)
tariff = 8.0   # assumed Rs/kWh, Indian HT commercial order of magnitude
put("zombie_Rs_crore_yr", mwh * 1000 * tariff / 1e7, 2)

# ---------------- C8 consolidation (linear power model)
p_i, p_m = 180.0, 400.0
def srv(u):
    return p_i + (p_m - p_i) * u
before = 100 * srv(0.12)
work = 100 * 0.12
n_after = math.ceil(work / 0.5)
after = n_after * srv(work / n_after)
put("consol_before_kW", before / 1000, 2)
put("consol_servers_after", n_after)
put("consol_after_kW", after / 1000, 2)
put("consol_saving_pct", (1 - after / before) * 100, 1)
put("energy_per_unit_work_ratio_12_vs_50", (srv(0.12) / 0.12) / (srv(0.5) / 0.5), 2)

# ---------------- C9 flexibility (Duke) and BESS
put("curtail_0p25pct_hours", 0.0025 * H, 1)
put("curtail_0p5pct_hours", 0.005 * H, 1)
put("curtail_1pct_hours", 0.01 * H, 1)
put("bess_MWh_100MW_25pct_4h", 100 * 0.25 * 4)

# ---------------- C10 heat reuse
it_h = 20.0
cap = 0.75
q_src = it_h * cap
cop_hp = 4.0  # assumed, 45 -> 70 C lift
q_del = q_src * cop_hp / (cop_hp - 1)
put("hr_source_MW", q_src, 1)
put("hr_hp_elec_MW", q_del - q_src, 2)
put("hr_delivered_MW", q_del, 2)
put("hr_delivered_GWh_yr", q_del * H / 1000 * 0.95, 0)   # 95 % availability assumed
# adsorption chiller alternative (India)
cop_ads = 0.55
put("ads_cooling_MW_from_15MW", q_src * cop_ads, 2)

# ---------------- C11 water
it_w = 100.0
e_it = it_w * H  # MWh
for w in (1.8, 0.4, 0.1):
    lit = e_it * 1000 * w
    put(f"water_ML_yr_WUE_{w}", lit / 1e6, 0)
    put(f"water_ML_day_WUE_{w}", lit / 1e6 / 365, 2)
put("people_equiv_WUE_1.8", e_it * 1000 * 1.8 / 365 / 135, 0)

# ---------------- C12 India
ind30 = 57.0
for a, b in ((1.6, 1.3), (1.6, 1.4)):
    s = pue_saving(a, b)
    put(f"india_{a}_{b}_pct", s * 100, 2)
    put(f"india_{a}_{b}_TWh", ind30 * s, 2)
    put(f"india_{a}_{b}_avg_GW", ind30 * s * 1e3 / H, 2)
    put(f"india_{a}_{b}_coal_GW_at_PLF85", ind30 * s * 1e3 / H / 0.85, 2)
put("india_2030_avg_GW", ind30 * 1e3 / H, 2)
put("mumbai_250MW_GWh_yr", 250 * H / 1000, 0)

# ---------------- C13 wedges (author's indicative estimate for 2030)
base = d30
pue0 = 1.45
cases = {}
for tag, p1, chain, conv_cut, ai_cut in (("low", 1.35, 0.02, 0.10, 0.10),
                                          ("high", 1.25, 0.05, 0.20, 0.25)):
    it = base / pue0
    conv_it, ai_it = 0.5 * it, 0.5 * it   # assumed 50/50 split of IT energy in 2030
    w_it = (conv_it * conv_cut + ai_it * ai_cut) / it
    it_new = it * (1 - w_it) * (1 - chain)
    total_new = it_new * p1
    w = {
        "Conventional servers: idle removal, consolidation": conv_it * conv_cut * pue0,
        "AI serving: utilisation, smaller models, batching": ai_it * ai_cut * pue0,
        "Power chain: fewer conversions, better PSUs": it * (1 - w_it) * chain * pue0,
        "Cooling and facility (PUE)": it_new * (pue0 - p1),
    }
    cases[tag] = {"total_new": total_new, "saving": base - total_new,
                  "share_of_growth_pct": (base - total_new) / (d30 - d24) * 100,
                  "wedges": w, "sum_wedges": sum(w.values())}
    put(f"wedge_{tag}_total_TWh", total_new, 1)
    put(f"wedge_{tag}_saving_TWh", base - total_new, 1)
    put(f"wedge_{tag}_share_growth_pct", cases[tag]["share_of_growth_pct"], 1)
    for k, v in w.items():
        put(f"  {tag}: {k}", v, 1)
R["wedges"] = cases

Path(__file__).with_name("calc_results.json").write_text(json.dumps(R, indent=1))

# ---------------- C14 site case study: 4 MW IT colocation hall, Chennai (all step effects assumed)
it0, cool0, pwr0, oth0 = 4000.0, 0.55, 0.15, 0.05      # kW IT; overhead per kW IT
tariff_c, ef = 8.0, 0.727                            # Rs/kWh (assumed); tCO2/MWh (CEA, FY2023-24)
steps = [
    ("Baseline", None),
    ("Remove comatose servers, consolidate (IT -8 %)", ("it", 0.08)),
    ("Containment, blanking, raise set points (cooling -15 %)", ("cool", 0.15)),
    ("Run N+1 fans slow, VSDs, pump pressure reset (cooling -15 %)", ("cool", 0.15)),
    ("Chilled water 7 -> 15 C, chiller sequencing (cooling -15 %)", ("cool", 0.15)),
    ("Modular UPS in eco-mode, Titanium PSUs (losses 0.15 -> 0.08; IT -2 %)", ("pwr", None)),
    ("Condition monitoring and set-point analytics (cooling -5 %)", ("cool", 0.05)),
    ("LED lighting, controls (other 0.05 -> 0.04)", ("oth", None)),
]
it, cool, pwr, oth = it0, cool0, pwr0, oth0
case = []
for name, act in steps:
    if act:
        k, v = act
        if k == "it":
            it *= 1 - v
        elif k == "cool":
            cool *= 1 - v
        elif k == "pwr":
            pwr = 0.08
            it *= 0.98
        elif k == "oth":
            oth = 0.04
    pue = 1 + cool + pwr + oth
    site = it * pue
    case.append({"step": name, "it_kW": round(it, 1), "pue": round(pue, 3), "site_kW": round(site, 1)})
base_site = case[0]["site_kW"]
for c in case:
    c["saving_kW"] = round(base_site - c["site_kW"], 1)
    print(f"{c['step'][:60]:60s} IT {c['it_kW']:7.1f}  PUE {c['pue']:.3f}  site {c['site_kW']:7.1f}  saved {c['saving_kW']:6.1f}")
fin = case[-1]
sav_kw = base_site - fin["site_kW"]
put("case_base_site_kW", base_site, 1)
put("case_final_site_kW", fin["site_kW"], 1)
put("case_final_pue", fin["pue"], 3)
put("case_saving_kW", sav_kw, 1)
put("case_saving_pct", sav_kw / base_site * 100, 1)
put("case_saving_MWh", sav_kw * H / 1000, 0)
put("case_saving_Rs_crore", sav_kw * H * tariff_c / 1e7, 2)
put("case_saving_tCO2", sav_kw * H / 1000 * ef, 0)
put("case_new_IT_kW_in_same_grid", base_site / fin["pue"] - fin["it_kW"], 0)
R["case"] = case
Path(__file__).with_name("calc_results.json").write_text(json.dumps(R, indent=1))

# ---------------- C15 cooling-load measurement and low delta-T
mdot, cp, dT, p_ch = 120.0, 4.186, 6.0, 600.0
q = mdot * cp * dT
put("meas_Q_kW", q, 1)
put("meas_COP", q / p_ch, 2)
put("meas_kW_per_TR", p_ch / (q / 3.517), 2)
put("lowdT_flow_ratio", 6.0 / 4.0, 2)
put("lowdT_pump_power_ratio_cube", (6.0 / 4.0) ** 3, 3)
put("lowdT_pump_power_ratio_static30", 1.5 * (0.3 + 0.7 * 1.5 ** 2), 3)
Path(__file__).with_name("calc_results.json").write_text(json.dumps(R, indent=1))

# ---------------- C16 Chennai cluster against the Tamil Nadu peak (load factor and PUE assumed)
tn_peak = 21724.0
for it_mw in (305.0, 900.0):
    site = it_mw * 0.8 * 1.6
    put(f"chennai_{int(it_mw)}MW_site_MW", site, 0)
    put(f"chennai_{int(it_mw)}MW_share_TN_peak_pct", site / tn_peak * 100, 2)
put("chennai_900_pue_16_to_13_MW", 900 * 0.8 * 0.3, 0)
put("chennai_900_flex15_MW", 0.15 * 900 * 0.8 * 1.6, 0)
Path(__file__).with_name("calc_results.json").write_text(json.dumps(R, indent=1))
