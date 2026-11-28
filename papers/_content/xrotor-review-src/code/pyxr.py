# -*- coding: utf-8 -*-
"""
TOOL:    pyxr.py - double-precision Python port of the XROTOR 7.55 analysis and MIL-design core
FAMILY:  technical-papers / xrotor-review
VERSION: 1.1.0
DATE:    2026-11-28
CHAT:    XROTOR code review technical paper (2026-11-28)
CHANGES: 1.1.0 - xrotor_nofilter iteration mode; design(use_filter=...) to switch off the Gamma filter
         1.0.1 - VRTX lambda_w derivative taken at fixed vortex spacing (as the Fortran derivative)
         1.0.0 - first version: SETX, GRADMO, HELICO, VRTXCO, CLCDCM, CSCALC, SETXW, TPQ, APINIT,
         APITER (relaxation rules copied, Jacobian by finite differences), FILTER, DESINI, DEITER
STATUS:  research port for the paper; residuals follow the Fortran line by line, Jacobian does not

Notation follows the Fortran: velocities scaled by V, lengths by R, ADV = V/(Omega R),
ADW = wake advance ratio, GAM = Gamma/(V R) per blade, as in XROTOR.
"""
__version__ = "1.1.0"

import numpy as np
from scipy.interpolate import CubicSpline
from scipy.linalg import solve_banded

PI = np.pi


# ----------------------------------------------------------------------------------------------
# section aerodynamics
# ----------------------------------------------------------------------------------------------
class ParamAero:
    """XROTOR CLCDCM parametric section model (xaero.f lines 917-1088)."""

    def __init__(self, a0=0.0, dclda=6.28, clmax=1.5, clmin=-0.5, dclda_stall=0.1, dcl_stall=0.1,
                 cdmin=0.013, cldmin=0.5, dcdcl2=0.004, cmcon=-0.1, reref=2e5, rexp=-0.4, mcrit=0.8):
        self.__dict__.update(locals()); del self.__dict__["self"]

    def eval(self, alf, w, rey, vel, vso):
        p = self
        msq = (w * vel / vso) ** 2 if vso > 0 else 0.0
        msq = min(msq, 0.99)
        pg = 1.0 / np.sqrt(1.0 - msq)
        mach = np.sqrt(msq)
        cla = p.dclda * pg * (alf - p.a0)
        cdmfactor, clmfactor, mexp, cdmdd, cdmstall = 10.0, 0.25, 3.0, 0.0020, 0.1000
        dmstall = (cdmstall / cdmfactor) ** (1.0 / mexp)
        clmax = min(p.clmax, max(0.0, (p.mcrit + dmstall - mach) / clmfactor) + p.cldmin)
        clmin = max(p.clmin, min(0.0, -(p.mcrit + dmstall - mach) / clmfactor) + p.cldmin)
        ecmax = np.exp(min(200.0, (cla - clmax) / p.dcl_stall))
        ecmin = np.exp(min(200.0, (clmin - cla) / p.dcl_stall))
        cllim = p.dcl_stall * np.log((1.0 + ecmax) / (1.0 + ecmin))
        fstall = p.dclda_stall / p.dclda
        cl = cla - (1.0 - fstall) * cllim
        cl_alf = p.dclda * pg * (1.0 - (1.0 - fstall) * (ecmax / (1 + ecmax) + ecmin / (1 + ecmin)))
        stall = cl > clmax or cl < clmin
        rcorr = 1.0 if rey <= 0 else (rey / p.reref) ** p.rexp
        cd = (p.cdmin + p.dcdcl2 * (cl - p.cldmin) ** 2) * rcorr
        dcdx = (1.0 - fstall) * cllim / (pg * p.dclda)
        cd += 2.0 * dcdx ** 2
        dmdd = (cdmdd / cdmfactor) ** (1.0 / mexp)
        critmach = p.mcrit - clmfactor * abs(cl - p.cldmin) - dmdd
        if mach >= critmach:
            cd += cdmfactor * (mach - critmach) ** mexp
        return cl, cd, pg * p.cmcon, clmax, clmin, p.dcl_stall, stall, cl_alf


class TableAero:
    """Linear interpolation in an alpha-CL-CD-CM table, as in the xrotor-python fork (no Re, M corrections)."""

    def __init__(self, table_deg):
        t = np.asarray(table_deg, float)
        self.a = np.radians(t[:, 0]); self.cl = t[:, 1]; self.cd = t[:, 2]; self.cm = t[:, 3]
        self.clmax = self.cl.max(); self.clmin = self.cl.min(); self.a0 = np.interp(0.0, self.cl, self.a)

    def eval(self, alf, w, rey, vel, vso):
        a = self.a
        if a[0] < alf < a[-1]:
            k = min(np.searchsorted(a, alf, side="right") - 1, len(a) - 2)
        else:
            k = 0 if alf <= a[0] else len(a) - 2
        f = (alf - a[k]) / (a[k + 1] - a[k])
        cl = self.cl[k] + f * (self.cl[k + 1] - self.cl[k])
        cd = self.cd[k] + f * (self.cd[k + 1] - self.cd[k])
        cm = self.cm[k] + f * (self.cm[k + 1] - self.cm[k])
        cl_alf = (self.cl[k + 1] - self.cl[k]) / (a[k + 1] - a[k])
        stall = cl >= self.clmax or cl <= self.clmin
        return cl, cd, cm, self.clmax, self.clmin, 0.1, stall, cl_alf


# ----------------------------------------------------------------------------------------------
# induced-velocity influence coefficients
# ----------------------------------------------------------------------------------------------
def gradmo(xi, xv, B, adw, duct=False):
    """Graded momentum with Prandtl tip factor (xoper.f GRADMO). Returns VG[3,II,II]."""
    II = len(xi); VG = np.zeros((3, II, II))
    xitip = xv[-1]
    if duct:
        d = B / (4 * PI * xi)
    else:
        sfac = np.sqrt(1.0 + 1.0 / adw ** 2)
        arg = np.minimum(20.0, 0.5 * B * (1.0 - xi / xitip) * sfac)
        ek = np.exp(-arg); fk = np.sqrt(1.0 - ek * ek)
        F = np.arctan2(fk, ek) * 2.0 / PI
        d = B / (4 * PI * F * xi)
    idx = np.arange(II)
    VG[2, idx, idx] = d
    VG[0, idx, idx] = d * xi / adw
    return VG


def helico(xi, xv, B, adw, duct=False, NN=128, xinf_fac=4.0, tail=True):
    """Potential (Goldstein-type) helicoidal-wake coefficients by Fourier/finite difference (xoper.f HELICO)."""
    II = len(xi)
    xi0, xitip = xv[0], xv[-1]
    X = [2 * xi0 - xi[0]] + list(xi) + [2 * xitip - xi[-1]]
    if duct:
        iimax = II + 1
    else:
        xinf = xinf_fac * xitip
        X += [2 * xitip - xi[-2], 2 * xitip - xi[-3], 2 * xitip - xi[-4]]
        xfac = (X[II + 4] - X[II + 3]) / (X[II + 3] - X[II + 2])
        dx = (X[II + 4] - X[II + 3]) * xfac
        while True:
            X.append(X[-1] + dx)
            if X[-1] >= xinf:
                break
            dx *= xfac
        iimax = len(X) - 1
    X = np.array(X)
    adwinv = 1.0 / adw ** 2
    qbsq = 0.25 * B ** 2
    I = np.arange(1, iimax)
    s1 = np.zeros(iimax + 1); s2 = np.zeros(iimax + 1); s3 = np.zeros(iimax + 1)
    s1[I] = (X[I] + X[I - 1]) / (X[I] - X[I - 1])
    s3[I] = (X[I + 1] + X[I]) / (X[I + 1] - X[I])
    s2[I] = qbsq * (1.0 / X[I] + X[I] * adwinv) * (X[I + 1] - X[I - 1])
    s1[iimax] = -1.0 if duct else 1.0
    VZ = np.zeros((II, II))
    last = None
    for n in range(2, NN + 1, 2):
        rn2 = float(n) ** 2
        # banded matrix rows 0..iimax
        N = iimax + 1
        ab = np.zeros((3, N))
        # row 0: A0 - A1 = 0  (dAn/dx = 0)
        ab[1, 0] = 1.0; ab[0, 1] = -1.0
        for i in range(1, iimax):
            ab[2, i - 1] = s1[i]                                   # sub-diagonal (B)
            ab[1, i] = -(s1[i] + s2[i] * rn2 + s3[i])             # diagonal (A)
            ab[0, i + 1] = s3[i]                                   # super-diagonal (C)
        ab[2, iimax - 1] = s1[iimax]; ab[1, iimax] = 1.0
        rhs = np.zeros((N, II))
        rhs[np.arange(1, II + 1), np.arange(II)] = s2[1:II + 1] * rn2
        A = solve_banded((1, 1), ab, rhs)
        last = A[1:II + 1, :]
        VZ += last + np.eye(II)
    if tail and not duct:
        fsum = sum((NN / float(m)) ** 2 for m in range(NN + 2, 4 * NN + 1, 2))
        VZ += (last + np.eye(II)) * fsum
    VZ += 0.5 * np.eye(II)
    VZ *= (B / (2 * PI * X[1:II + 1]))[:, None]
    VG = np.zeros((3, II, II))
    VG[2] = VZ
    VG[0] = VZ * (xi / adw)[:, None]
    return VG


def _thetspc(adw):
    dth1, rad1 = PI / 60., 2.0; th1 = rad1 / adw
    dth2, rad2 = PI / 20., 4.0; th2 = rad2 / adw
    dth3, rad3 = PI / 8., 50.0; th3 = rad3 / adw
    n1 = int(2.0 * th1 / (dth2 + dth1)); n2 = int(2.0 * (th2 - th1) / (dth3 + dth2))
    dd1 = (dth2 - dth1) / (n1 - 1); dd2 = (dth3 - dth2) / (n2 - 1)
    out = []; t = 0.0; d = dth1
    while len(out) < 5000:
        if t < th1:
            out.append(t); t += d; d += dd1
        elif t < th2:
            out.append(t); t += d; d += dd2
        elif t < th3:
            out.append(t); d = dth3; t += d
        else:
            break
    return np.array(out)


def vrtxco(xi, xv, B, adw, duct=False, rake=0.0, th=None):
    """Discrete helical vortex wake (vortex.f VRTXCO), rigid helix of pitch ADW, truncated at 50 R.
    th: optional fixed angle spacing (used for the lambda_w derivative, as the Fortran analytic derivative does)."""
    II = len(xi)
    if duct:
        return gradmo(xi, xv, B, adw, duct=True)
    th = _thetspc(adw) if th is None else th
    tanr = np.tan(rake)
    VG = np.zeros((3, II, II))
    off = 2 * PI * np.arange(B) / B
    T = th[None, :] + off[:, None]                       # (B, L)
    for i in range(II):
        r0 = np.array([xi[i] * tanr, xi[i], 0.0])
        for j in range(II + 1):
            rv = xv[j]
            P = np.stack([rv * tanr + th[None, :] * adw + 0 * T, rv * np.cos(T), rv * np.sin(T)], -1) - r0
            a = P[:, :-1, :]; b = P[:, 1:, :]
            am = np.linalg.norm(a, axis=-1); bm = np.linalg.norm(b, axis=-1)
            axb = np.cross(a, b)
            den = am * bm + np.sum(a * b, -1)
            t = (1 / am + 1 / bm) / den
            v = (axb * t[..., None]).sum(axis=(0, 1)) / (4 * PI)
            v[2] = -v[2]
            if j < II:
                VG[:, i, j] -= v
            if j > 0:
                VG[:, i, j - 1] += v
    return VG


def filt(q, smlen):
    n = len(q); con = smlen ** 2
    ab = np.zeros((3, n))
    ab[1, :] = 2 * con + 1; ab[1, 0] = 1; ab[1, -1] = 1
    ab[0, 1:] = -con; ab[0, 1] = 0.0                 # C(1)=0
    ab[2, :-1] = -con; ab[2, -2] = 0.0               # B(N)=0
    return solve_banded((1, 1), ab, q)


# ----------------------------------------------------------------------------------------------
# rotor
# ----------------------------------------------------------------------------------------------
class Rotor:
    def __init__(self, B=2, rad=1.0, xi0=0.15, xw0=0.0, II=30, ixspac=2, aero=None, rho=1.226, vso=340.0,
                 rmu=1.78e-5, vel=10.0, wake="pot", free=True, duct=False, urduct=1.0, NN=128):
        self.B = B; self.rad = rad; self.xi0 = xi0; self.xw0 = xw0; self.II = II; self.ixspac = ixspac
        self.aero = aero or ParamAero(); self.rho = rho; self.vso = vso; self.rmu = rmu; self.vel = vel
        self.wake = wake; self.free = free; self.duct = duct; self.urduct = urduct; self.NN = NN
        self.setx()
        self.ubody = np.zeros(II)
        self.ch = np.zeros(II); self.beta = np.zeros(II)
        self.dbeta = 0.0

    # SETX
    def setx(self):
        II = self.II; xi0 = self.xi0; xitip = 1.0
        dt = 0.5 * PI / II
        xm = xi0; xi = np.zeros(II); dxi = np.zeros(II); xv = np.zeros(II + 1); xv[0] = xi0
        for i in range(1, II + 1):
            tp = dt * i
            if self.ixspac == 2:
                xp = np.sqrt(xitip * np.sin(tp) ** 2 + (xi0 * np.cos(tp)) ** 2)
            else:
                xp = 0.5 * (1.0 - np.cos(2.0 * tp)) * (xitip - xi0) + xi0
            xi[i - 1] = 0.5 * (xp + xm); dxi[i - 1] = xp - xm; xm = xp; xv[i] = xp
        xv[-1] = xitip
        self.xi, self.dxi, self.xv = xi, dxi, xv

    def set_geometry(self, r, c, b_deg):
        cs_c = CubicSpline(r, c, bc_type="natural"); cs_b = CubicSpline(r, np.radians(b_deg), bc_type="natural")
        self.ch = cs_c(self.xi); self.beta = cs_b(self.xi); self.dbeta = 0.0

    def coeffs(self, adw, adw_spacing=None):
        if self.wake == "grad":
            return gradmo(self.xi, self.xv, self.B, adw, self.duct)
        if self.wake == "vrtx":
            th = None if adw_spacing is None else _thetspc(adw_spacing)
            return vrtxco(self.xi, self.xv, self.B, adw, self.duct, th=th)
        return helico(self.xi, self.xv, self.B, adw, self.duct, NN=self.NN)

    def aerof(self, i, alf, w, rey):
        return self.aero.eval(alf, w, rey, self.vel, self.vso)

    # CSCALC (vectorised over stations)
    def cscalc(self, vind, adv):
        ud = self.urduct - 1.0 if self.duct else 0.0
        vdva = 2.0 * self.urduct if self.duct else 1.0
        VT = vind[2]; VA = vind[0]; VD = VA * (vdva - 1.0)
        utot = 1.0 + ud + self.ubody
        CI = self.xi / adv - VT
        SI = utot + VA + VD
        W = np.sqrt(CI ** 2 + SI ** 2); PHI = np.arctan2(SI, CI)
        return VT, VA, VD, CI, SI, W, PHI

    # SETXW (equivalent prop)
    def setxw(self, VT, SI, adw):
        xwm = self.xw0; ud = self.urduct - 1.0 if self.duct else 0.0
        XW = np.zeros(self.II); DXW = np.zeros(self.II); VW = np.zeros(self.II)
        for i in range(self.II):
            xdx = self.xi[i] * self.dxi[i]
            utot = 1.0 + ud + self.ubody[i]
            xwo = xwm + 0.5 * (np.sqrt(xwm ** 2 + 2.0 * utot * xdx) - xwm)
            for _ in range(30):
                vw = VT[i] * self.xi[i] / xwo
                sw = self.urduct + vw * xwo / adw
                rez = sw * xwo * 2.0 * (xwo - xwm) - SI[i] * xdx
                rez_x = sw * 2.0 * (2.0 * xwo - xwm)
                d = -rez / rez_x
                rlx = 1.0
                if abs(d) > 0.2 * (xwo - xwm):
                    rlx = 0.2 * (xwo - xwm) / abs(d)
                xwo += rlx * d
                if abs(d) < 1e-12:
                    break
            VW[i] = VT[i] * self.xi[i] / xwo; XW[i] = xwo; DXW[i] = 2 * (xwo - xwm); xwm = 2 * xwo - xwm
        return XW, DXW, VW

    def reyn(self, ch, w):
        return ch * np.abs(w) * self.rho * self.vel * self.rad / self.rmu

    # TPQ(1): analysis
    def tpq(self, gam, adv, adw, VG, beta=None, ch=None, itype=1, cldes=None):
        B = self.B; vind = np.einsum("kij,j->ki", VG, gam)
        VT, VA, VD, CI, SI, W, PHI = self.cscalc(vind, adv)
        XW, DXW, VW = self.setxw(VT, SI, adw)
        ch = self.ch if ch is None else ch
        beta = (self.beta + self.dbeta) if beta is None else beta
        CL = np.zeros(self.II); CD = np.zeros(self.II); ALF = np.zeros(self.II); STALL = np.zeros(self.II, bool)
        CH = ch.copy(); BET = beta.copy()
        for i in range(self.II):
            if itype == 1:
                ALF[i] = beta[i] - PHI[i]
            else:
                CL[i] = cldes[i]; ALF[i] = self.getalf(i, cldes[i], W[i])
                c = 2 * gam[i] / (W[i] * cldes[i])
                CH[i] = c if c > 0 else np.nan
                BET[i] = ALF[i] + PHI[i]
        if itype != 1 and np.any(np.isnan(CH)):
            ok = ~np.isnan(CH); CH[~ok] = np.interp(self.xi[~ok], self.xi[ok], CH[ok])
        for i in range(self.II):
            re = self.reyn(CH[i], W[i])
            cl, cd, *_r = self.aerof(i, ALF[i], W[i], re)
            CL[i] = cl if itype == 1 else CL[i]; CD[i] = cd; STALL[i] = _r[4]
        bdx = B * self.dxi
        TV = np.sum(-0.5 * W * CH * CD * SI * bdx)
        PV = np.sum(0.5 * W * CH * CD * CI * bdx * self.xi / adv)
        TI = np.sum(gam * CI * bdx); PI_ = np.sum(gam * SI * bdx * self.xi / adv)
        CW = XW / adv - VW
        TW = np.sum(gam * CW * B * DXW); PW = PI_
        TM = np.sum(2 * PI * self.xi * self.dxi * SI * 2 * VA)
        return dict(TV=TV, PV=PV, TI=TI, PI=PI_, TW=TW, PW=PW, TM=TM, CL=CL, CD=CD, ALF=ALF, W=W, CI=CI, SI=SI,
                    PHI=PHI, VT=VT, VA=VA, XW=XW, DXW=DXW, VW=VW, CH=CH, BETA=BET, STALL=STALL,
                    TTOT=TW + TV, PTOT=PW + PV)

    def getalf(self, i, cl, w):
        a = getattr(self.aero, "a0", 0.0)
        for _ in range(30):
            c, _cd, _cm, _x, _n, _d, _s, ca = self.aerof(i, a, w, 0.0)
            da = -(c - cl) / ca; a += da
            if abs(da) < 1e-10:
                break
        return a

    # ------------------------------------------------------------------ analysis (APER/APITER)
    def residual(self, x, VG, ispec, icon, spec, adv0, adw0, dbeta0):
        II = self.II; gam = x[:II]; adv, adw, dbet = x[II], x[II + 1], x[II + 2]
        r = self.tpq(gam, adv, adw, VG, beta=self.beta + dbet)
        R = np.zeros(II + 3)
        R[:II] = r["CH"] * r["CL"] * r["W"] - 2 * gam
        if ispec == 1:
            R[II] = r["TTOT"] - spec
        elif ispec == 2:
            R[II] = r["PTOT"] * adv - spec
        elif ispec == 3:
            R[II] = r["PTOT"] - spec
        else:
            R[II] = adv - adv0
        R[II + 1] = (adw * r["TW"] / r["PW"] - adv) if self.free else (adw - adw0)
        R[II + 2] = (adv - adv0) if icon == 1 else (dbet - dbeta0)
        if ispec == 4 and icon == 1:
            R[II + 2] = dbet - dbeta0
        return R, r

    def jac(self, x, ispec, icon, spec, adv0, adw0, dbeta0):
        II = self.II
        VG = self.coeffs(x[II + 1])
        R0, r0 = self.residual(x, VG, ispec, icon, spec, adv0, adw0, dbeta0)
        J = np.zeros((II + 3, II + 3))
        for k in range(II + 3):
            h = 1e-7 * max(1.0, abs(x[k])) if k < II else 1e-7 * max(1e-3, abs(x[k]))
            xp = x.copy(); xp[k] += h
            VGp = self.coeffs(xp[II + 1], adw_spacing=x[II + 1]) if k == II + 1 else VG
            Rp, _ = self.residual(xp, VGp, ispec, icon, spec, adv0, adw0, dbeta0)
            J[:, k] = (Rp - R0) / h
        return R0, J, r0, VG

    def apinit(self, adv):
        """APINIT: Gamma without induction, momentum ADW, then 10 graded-momentum sweeps."""
        II = self.II; B = self.B
        gam = np.zeros(II); tsum = 0.0
        beta = self.beta + self.dbeta
        for i in range(II):
            si = 1.0 + self.ubody[i]; ci = self.xi[i] / adv
            w = np.hypot(ci, si); phi = np.arctan2(si, ci)
            cl = self.aerof(i, beta[i] - phi, w, self.reyn(self.ch[i], w))[0]
            gam[i] = 0.5 * cl * w * self.ch[i]; tsum += B * gam[i] * ci * self.dxi[i]
        vhsq = max(0.5 * tsum / PI, -0.25)
        adw = adv * 0.5 * (1 + np.sqrt(1 + 4 * vhsq))
        for _ in range(10):
            VG = gradmo(self.xi, self.xv, B, adw, self.duct)
            tsum = 0.0; t_adw = 0.0; dclmax = 0.0; rlxmin = 1.0
            for i in range(II):
                vt_g = VG[2, i, i]; va_g = VG[0, i, i]
                vt = vt_g * gam[i]; va = va_g * gam[i]
                ci = self.xi[i] / adv - vt; si = 1.0 + self.ubody[i] + va
                w = np.hypot(ci, si); phi = np.arctan2(si, ci)
                re = self.reyn(self.ch[i], w)
                out = self.aerof(i, beta[i] - phi, w, re); cl, cl_al = out[0], out[7]
                rez = self.ch[i] * cl * w - 2 * gam[i]
                # derivative of residual wrt gam (Fortran chain): Z_G
                w_vt = -ci / w; w_va = si / w
                p_vt = si / w ** 2; p_va = ci / w ** 2
                z_cl = self.ch[i] * w; z_w = self.ch[i] * cl
                z_vt = z_w * w_vt + z_cl * cl_al * (-p_vt)
                z_va = z_w * w_va + z_cl * cl_al * (-p_va)
                z_g = z_vt * vt_g + z_va * va_g - 2.0
                delg = -rez / z_g; dcl = 2 * delg / (self.ch[i] * w)
                rlx = 1.0
                if abs(dcl) > 0.2 and dcl != 0:
                    rlx = min(1.0, 0.2 / abs(dcl))
                dclmax = max(dclmax, abs(dcl)); rlxmin = min(rlxmin, rlx)
                gam[i] += rlx * delg
                tsum += B * gam[i] * ci * self.dxi[i]
            vhsq = max(0.5 * tsum / PI, -0.2499)
            adw_new = adv * 0.5 * (1 + np.sqrt(1 + 4 * vhsq))
            dadw = np.clip(adw_new - adw, -0.9 * adw, 10 * adw)
            adw += dadw
            if rlxmin < 0.2:
                gam = filt(gam, 0.2 * II)
            if dclmax < 0.001:
                break
        return gam, adw

    def operate(self, ispec=4, icon=2, spec=None, adv=None, nitera=40, eps=1e-7, mode="xrotor",
                init=True, x0=None, history=None, maxit=None):
        """mode='xrotor': APITER relaxation rules incl. FILTER; 'xrotor_nofilter': same limits, no Gamma smoothing;
        mode='newton': undamped Newton (steps only shortened to keep lambda, lambda_w positive)."""
        II = self.II
        if adv is None:
            adv = self.adv
        if spec is not None and ispec in (1, 2, 3):
            spec = {1: spec / (self.rho * self.vel ** 2 * self.rad ** 2),
                    2: spec / (self.rho * self.vel ** 2 * self.rad ** 3),
                    3: spec / (self.rho * self.vel ** 3 * self.rad ** 2)}[ispec]
        if x0 is not None:
            x = x0.copy()
        else:
            gam, adw = self.apinit(adv) if init else (np.zeros(II), adv)
            x = np.concatenate([gam, [adv, adw, self.dbeta]])
        adv0, adw0, db0 = x[II], x[II + 1], x[II + 2]
        dgamold = np.zeros(II)
        self.conv = False; self.iters = 0
        for it in range(1, (maxit or nitera) + 1):
            R, J, r, VG = self.jac(x, ispec, icon, spec, adv0, adw0, db0)
            if not np.all(np.isfinite(R)) or not np.all(np.isfinite(J)):
                break
            try:
                dx = np.linalg.solve(J, -R)
            except np.linalg.LinAlgError:
                break
            dgam = dx[:II]; dadv, dadw, dbet = dx[II], dx[II + 1], dx[II + 2]
            rlx = 1.0
            if mode.startswith("xrotor"):
                if it <= 2:
                    rlx = 0.2
                W = r["W"]
                for i in range(II):
                    out = self.aerof(i, r["ALF"][i], W[i], self.reyn(self.ch[i], W[i]))
                    cl, clmax, clmin, dcls = out[0], out[3], out[4], out[5]
                    dcl = 2 * dgam[i] / (self.ch[i] * W[i])
                    dclmn = max(1.5 * dcls, abs(cl - clmin)); dclmx = max(1.5 * dcls, abs(clmax - cl))
                    lim = max(min(0.5, dclmn, dclmx), 0.01)
                    if rlx * abs(dcl) > lim:
                        rlx = min(rlx, lim / abs(dcl))
                    if dgam[i] * dgamold[i] < 0 and abs(dgam[i]) > 0.2 * abs(dgamold[i]):
                        rlx = min(rlx, 0.2)
                if rlx * dbet > 0.05: rlx = min(rlx, 0.05 / dbet)
                if rlx * dbet < -0.05: rlx = min(rlx, -0.05 / dbet)
                adv_, adw_ = x[II], x[II + 1]
                if rlx * dadv > 0.5 * adv_: rlx = min(rlx, 0.5 * adv_ / dadv)
                if rlx * dadv < -0.3 * adv_: rlx = min(rlx, -0.3 * adv_ / dadv)
                if rlx * dadw > 0.5 * adw_: rlx = min(rlx, 0.5 * adw_ / dadw)
                if rlx * dadw < -0.3 * adw_: rlx = min(rlx, -0.3 * adw_ / dadw)
            else:
                # keep advance ratios positive
                for k, lim in ((II, x[II]), (II + 1, x[II + 1])):
                    if dx[k] * rlx < -0.9 * lim:
                        rlx = -0.9 * lim / dx[k]
            x = x + rlx * dx
            dgamold = dgam.copy()
            rms = np.sqrt(np.sum(dgam ** 2 / (1 + 1 / x[II] ** 2)) / II)
            if mode == "xrotor" and rlx < 0.2:
                x[:II] = filt(x[:II], 0.2 * II)          # 'xrotor_nofilter' skips the Gamma smoothing
            if history is not None:
                history.append(dict(it=it, rms=rms, rlx=rlx, adv=x[II], adw=x[II + 1], resmax=np.abs(R).max()))
            self.iters = it
            if rms <= eps:
                self.conv = True
                break
        self.x = x
        self.adv = x[II]; self.dbeta = x[II + 2]
        self.gam = x[:II]; self.adw = x[II + 1]
        VG = self.coeffs(self.adw)
        self.res = self.tpq(self.gam, self.adv, self.adw, VG, beta=self.beta + self.dbeta)
        self.VG = VG
        return self.conv

    def perf(self):
        r = self.res; rho, V, R = self.rho, self.vel, self.rad
        T = r["TTOT"] * rho * V ** 2 * R ** 2; P = r["PTOT"] * rho * V ** 3 * R ** 2
        Q = r["PTOT"] * self.adv * rho * V ** 2 * R ** 3
        rpm = V / (R * self.adv) * 30 / PI
        n = rpm / 60.0; D = 2 * R
        return dict(T=T, P=P, Q=Q, rpm=rpm, eta=r["TTOT"] / r["PTOT"], J=V / (n * D),
                    CT=T / (rho * n ** 2 * D ** 4), CP=P / (rho * n ** 3 * D ** 5),
                    Tinv=r["TI"] * rho * V ** 2 * R ** 2, Twak=r["TW"] * rho * V ** 2 * R ** 2,
                    Tmom=r["TM"] * rho * V ** 2 * R ** 2)

    # ------------------------------------------------------------------ design (DESGEN/DESINI/DEITER)
    def design(self, adv, cldes, tdes=None, pdes=None, nitd=60, eps=5e-7, history=None, use_filter=True):
        """MIL design at fixed advance ratio for given thrust (N) or power (W). cldes: array or scalar."""
        II = self.II; B = self.B
        cl = np.full(II, cldes) if np.isscalar(cldes) else np.asarray(cldes, float)
        dest = tdes is not None
        TD = tdes / (self.rho * self.vel ** 2 * self.rad ** 2) if dest else None
        PD = pdes / (self.rho * self.vel ** 3 * self.rad ** 2) if not dest else None
        effinv = 1.0
        if self.free and dest: effinv = 0.5 * np.sqrt(abs(1 + TD * 2 / PI)) + 0.5
        if self.free and not dest: effinv = 0.25 * np.sqrt(abs(1 + PD * 4 / PI)) + 0.75
        adw = effinv * adv
        # XWINIT with zero induced velocity
        xm = self.xw0; DXW = np.zeros(II); XW = np.zeros(II)
        for i in range(II):
            DXW[i] = np.sqrt(xm ** 2 + 2 * self.xi[i] * self.dxi[i]) - xm; XW[i] = xm + 0.5 * DXW[i]; xm += DXW[i]
        xwtip = xm
        # DESINI: elliptic chord for CD, Larrabee F-based Gamma
        ch = 0.1 * (self.xi / adv) ** 2 * np.sqrt(1 - self.xi ** 2) / (1 + (self.xi / adv) ** 2)
        CD = np.zeros(II)
        for i in range(II):
            w = np.sqrt(1 + (self.xi[i] / adv) ** 2)
            a = self.getalf(i, cl[i], w)
            CD[i] = self.aerof(i, a, w, self.reyn(ch[i], w))[1]
        sfac = np.sqrt(1 + 1 / adw ** 2)
        YY = XW / adv; yyinv = 1 / (1 + YY ** 2); dol = CD / cl
        if self.duct:
            F = np.ones(II)
        else:
            arg = np.minimum(20, 0.5 * B * (1 - XW / xwtip) * sfac); ek = np.exp(-arg)
            F = np.arctan2(np.sqrt(1 - ek * ek), ek) * 2 / PI
        G = F * YY ** 2 * yyinv
        RI1 = np.sum(4 * XW * G * (1 - dol / YY) * DXW); RI2 = np.sum(2 * XW * G * (1 - dol / YY) * DXW * yyinv)
        RJ1 = np.sum(4 * XW * G * (1 + dol * YY) * DXW); RJ2 = np.sum(2 * XW * G * (1 + dol * YY) * DXW * YY ** 2 * yyinv)
        if dest:
            disc = max(0.0, 1 - 8 / PI * TD * RI2 / RI1 ** 2); zeta = 0.5 * RI1 / RI2 * (1 - np.sqrt(disc))
        else:
            disc = max(0.0, 1 + 8 / PI * PD * RJ2 / RJ1 ** 2); zeta = 0.5 * RJ1 / RJ2 * (np.sqrt(disc) - 1)
        gam = G * (2 * PI * adv / B) * zeta
        effinv = 1 + 0.5 * zeta
        if self.free: adw = adv * effinv
        if self.wake != "grad":
            VG = self.coeffs(adw)
            rhs = 0.5 * zeta * YY / (1 + YY ** 2)
            gam = np.linalg.solve(VG[2], rhs)
        self.larrabee = dict(zeta=zeta, gam=gam.copy())
        x = np.concatenate([gam, [effinv, adw]])

        def resid(x, VG):
            g = x[:II]; ei, aw = x[II], x[II + 1]
            r = self.tpq(g, adv, aw, VG, itype=2, cldes=cl)
            CW = self.xi / adv - r["VW"]; SW = self.urduct + r["VW"] * r["XW"] / aw
            eil = (SW / CW) * (self.xi / adv)
            R = np.zeros(II + 2)
            R[:II] = (g - (self.gamdes if False else 0)) if self.duct else eil - ei
            R[II] = (r["TTOT"] - TD) if dest else (r["PTOT"] - PD)
            R[II + 1] = (aw * r["TW"] / r["PW"] - adv) if self.free else 0.0
            return R, r

        self.conv = False
        for it in range(1, nitd + 1):
            VG = self.coeffs(x[II + 1])
            R0, r0 = resid(x, VG)
            J = np.zeros((II + 2, II + 2))
            for k in range(II + 2):
                h = 1e-7 * max(1e-3, abs(x[k]))
                xp = x.copy(); xp[k] += h
                VGp = self.coeffs(xp[II + 1], adw_spacing=x[II + 1]) if k == II + 1 else VG
                J[:, k] = (resid(xp, VGp)[0] - R0) / h
            if not self.free:
                J[II + 1, :] = 0; J[II + 1, II + 1] = 1; R0[II + 1] = 0
            dx = np.linalg.solve(J, -R0)
            rlx = 0.2 if it <= 2 else 1.0
            dg = dx[:II]
            for i in range(II):
                if rlx * dg[i] / x[i] < -0.3: rlx = -0.3 * x[i] / dg[i]
                if rlx * dg[i] / x[i] > 0.3: rlx = 0.3 * x[i] / dg[i]
            dadw = dx[II + 1]
            if rlx * dadw > 0.5 * x[II + 1]: rlx = min(rlx, 0.5 * x[II + 1] / dadw)
            if rlx * dadw < -0.3 * x[II + 1]: rlx = min(rlx, -0.3 * x[II + 1] / dadw)
            x = x + rlx * dx
            rms = np.sqrt(np.sum(dg ** 2 / (1 + 1 / adv ** 2)) / II)
            if rlx < 0.2 and use_filter:
                x[:II] = filt(x[:II], 0.2 * II)
            if history is not None:
                history.append(dict(it=it, rms=rms, rlx=rlx, effinv=x[II], adw=x[II + 1]))
            if max(rms, abs(dadw)) <= eps and abs(dx[II]) <= eps * x[II]:
                self.conv = True
                break
        self.gam = x[:II]; self.adw = x[II + 1]; self.adv = adv; self.effinv = x[II]
        VG = self.coeffs(self.adw)
        r = self.tpq(self.gam, adv, self.adw, VG, itype=2, cldes=cl)
        self.ch = r["CH"]; self.beta = r["BETA"]; self.dbeta = 0.0
        self.res = r; self.VG = VG
        return self.conv
