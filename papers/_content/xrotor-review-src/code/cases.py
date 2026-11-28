# -*- coding: utf-8 -*-
"""
TOOL:    cases.py - test cases for the XROTOR review (NACA Report 640 5868-9 propeller, Clark-Y table)
FAMILY:  technical-papers / xrotor-review
VERSION: 1.0.0
DATE:    2026-11-28
CHAT:    XROTOR code review technical paper (2026-11-28)
CHANGES: 1.0.0 - geometry and Clark-Y polar as used in the xrotor-python unit test
"""
__version__ = "1.0.0"
import numpy as np
import re, os
from pyxr import Rotor, TableAero, ParamAero

GEOM = np.array([
    [0.2000, 0.0759, 0.7977, 45.6410], [0.2500, 0.0904, 0.5492, 43.9615], [0.3000, 0.1062, 0.3635, 41.8157],
    [0.3500, 0.1226, 0.2405, 39.4593], [0.4000, 0.1382, 0.1748, 36.8433], [0.4500, 0.1480, 0.1366, 34.1065],
    [0.5000, 0.1520, 0.1182, 31.8362], [0.5500, 0.1503, 0.1078, 29.9828], [0.6000, 0.1461, 0.1015, 28.3983],
    [0.6500, 0.1393, 0.0955, 27.0601], [0.7000, 0.1313, 0.0915, 25.9288], [0.7500, 0.1224, 0.0884, 24.9254],
    [0.8000, 0.1121, 0.0855, 24.0828], [0.8500, 0.1010, 0.0839, 23.3286], [0.9000, 0.0886, 0.0818, 22.6380],
    [0.9500, 0.0752, 0.0812, 22.1021]])

def clarky():
    txt = open(os.path.join(os.path.dirname(__file__), "clarky.txt")).read()
    return np.array([[float(v) for v in row] for row in re.findall(r"\[\s*(-?[\d.]+),\s*(-?[\d.]+),\s*(-?[\d.]+),\s*(-?[\d.]+)\]", txt)])

# XROTOR parametric section fitted to the Clark-Y table (Re = 1e6): zero-lift angle, slope, stall CLs, drag polar
CLARKY_PARAM = dict(a0=np.radians(-3.24), dclda=6.59, clmax=1.45, clmin=-0.65, dclda_stall=0.1, dcl_stall=0.1,
                    cdmin=0.0116, cldmin=0.25, dcdcl2=0.0057, cmcon=-0.08, reref=1.0e6, rexp=-0.2, mcrit=0.70)

def naca640(wake="pot", II=30, ixspac=2, NN=128, free=True, B=2, table=False, J=None, utip=170.0):
    """J given: flight speed set from a fixed tip speed utip (fixed-rpm sweep, as in a wind tunnel)."""
    aero = TableAero(clarky()) if table else ParamAero(**CLARKY_PARAM)
    r = Rotor(B=B, rad=1.524, xi0=0.305 / 1.524, xw0=0.0, II=II, ixspac=ixspac, aero=aero,
              rho=1.225, vso=340.0, rmu=1.789e-5, vel=35.56, wake=wake, free=free, NN=NN)
    r.set_geometry(GEOM[:, 0], GEOM[:, 1], GEOM[:, 3])
    if J is not None:
        r.vel = J / np.pi * utip
    return r
