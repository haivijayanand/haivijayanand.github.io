"""
TOOL:    vlm_uav.py - AVL-style extended vortex-lattice solver for the AVL review paper worked example
FAMILY:  aero-codes
VERSION: 1.1.0
DATE:    2026-11-28
CHAT:    AVL (Athena Vortex Lattice) technical paper - history, usage, improvements, limitations
CHANGES: 1.0.0 - first version: horseshoe VLM (AVL formulation), p/q/r rates, normal-vector-tilt controls,
         trim, stability/control derivatives, neutral point, decoupled eigenmodes, validation vs Helmbold
         1.1.0 - several control variables per surface (elevons), summed normal-vector tilts
STATUS:  working
"""
__version__ = "1.1.0"

import json
import numpy as np

# ---------------------------------------------------------------------------
# Geometry is defined in AVL geometry axes (x aft, y right, z up) and converted
# to body axes (x fwd, y right, z down) for all force/moment work.
# ---------------------------------------------------------------------------

def to_body(p):
    p = np.asarray(p, float)
    return np.array([-p[..., 0], p[..., 1], -p[..., 2]]).transpose(
        list(range(1, p.ndim)) + [0]) if p.ndim > 1 else np.array([-p[0], p[1], -p[2]])


def cosspace(n):
    """n intervals, n+1 points on [0,1], cosine clustered at both ends."""
    return 0.5 * (1 - np.cos(np.linspace(0, np.pi, n + 1)))


def naca4_slope(xc, m, p):
    """camber-line slope dz/dx of NACA 4-digit mean line."""
    xc = np.asarray(xc)
    if m == 0:
        return np.zeros_like(xc)
    return np.where(xc < p, 2 * m / p**2 * (p - xc), 2 * m / (1 - p)**2 * (p - xc))


class Surface:
    """Lifting surface between AVL-style sections (Xle, Yle, Zle, chord, ainc)."""

    def __init__(self, name, sections, nchord, nspan, camber=(0.0, 0.4),
                 control=None, ydup=False, vertical=False):
        self.name, self.sections = name, sections
        self.nc, self.ns = nchord, nspan
        self.camber, self.control = camber, control  # control: dict(name, xhinge, gain, sgndup)
        self.ydup, self.vertical = ydup, vertical


def build_lattice(surfaces):
    """Returns dict of panel arrays in body axes."""
    A, B, C, N, CH, TAG, CTRL, SPAN_W = [], [], [], [], [], [], [], []
    for s in surfaces:
        copies = [1, -1] if s.ydup else [1]
        for sgn in copies:
            (x1, y1, z1, c1, a1), (x2, y2, z2, c2, a2) = s.sections
            eta = cosspace(s.ns)
            xi = cosspace(s.nc)
            for j in range(s.ns):
                # spanwise strip edges
                def edge(e):
                    return (x1 + e * (x2 - x1), y1 + e * (y2 - y1), z1 + e * (z2 - z1),
                            c1 + e * (c2 - c1), a1 + e * (a2 - a1))
                L, R = edge(eta[j]), edge(eta[j + 1])
                M = edge(0.5 * (eta[j] + eta[j + 1]))
                for i in range(s.nc):
                    # bound vortex at 1/4 of panel, control point at 3/4
                    xq = xi[i] + 0.25 * (xi[i + 1] - xi[i])
                    xcp = xi[i] + 0.75 * (xi[i + 1] - xi[i])
                    pa = np.array([L[0] + xq * L[3], L[1], L[2]])
                    pb = np.array([R[0] + xq * R[3], R[1], R[2]])
                    pc = np.array([M[0] + xcp * M[3], M[1], M[2]])
                    # geometric normal (AVL axes): perpendicular to strip chord (x) and span vector
                    span = np.array([R[0] - L[0], R[1] - L[1], R[2] - L[2]])
                    span[0] = 0.0
                    nrm = np.cross(np.array([1.0, 0, 0]), span)
                    nrm /= np.linalg.norm(nrm)
                    # camber + incidence by normal tilting about span axis (AVL approach)
                    slope = float(naca4_slope(xcp, *s.camber)) if not s.vertical else 0.0
                    ang = np.radians(M[4]) - np.arctan(slope)  # +ainc = nose up
                    eh = span / np.linalg.norm(span)
                    nrm = rotate(nrm, eh, ang)
                    ctrl = []
                    clist = s.control if isinstance(s.control, list) else ([s.control] if s.control else [])
                    for cc in clist:
                        if xcp >= cc["xhinge"]:
                            ctrl.append((cc["name"], cc["gain"] * (cc["sgndup"] if sgn < 0 else 1.0)))
                    if sgn < 0:  # mirror in y; keep bound-leg direction left->right
                        pa, pb = pb * np.array([1, -1, 1]), pa * np.array([1, -1, 1])
                        pc = pc * np.array([1, -1, 1])
                        nrm = nrm * np.array([1, -1, 1])
                        eh = eh * np.array([1, -1, 1])
                    A.append(to_body(pa)); B.append(to_body(pb)); C.append(to_body(pc))
                    N.append(to_body(nrm)); TAG.append(s.name); CTRL.append(ctrl)
                    CH.append(to_body(eh) * (-1 if sgn < 0 else 1))
    return dict(A=np.array(A), B=np.array(B), C=np.array(C), N=np.array(N),
                H=np.array(CH), tag=TAG, ctrl=CTRL)


def rotate(v, k, th):
    """Rodrigues rotation of v about unit axis k by angle th."""
    k = k / np.linalg.norm(k)
    return v * np.cos(th) + np.cross(k, v) * np.sin(th) + k * np.dot(k, v) * (1 - np.cos(th))


def seg_vel(P, P1, P2, rcore=1e-6):
    """Velocity at points P (m,3) from unit-strength segments P1->P2 (n,3); returns (m,n,3)."""
    r1 = P[:, None, :] - P1[None, :, :]
    r2 = P[:, None, :] - P2[None, :, :]
    r0 = P2 - P1
    cr = np.cross(r1, r2)
    cr2 = np.sum(cr**2, axis=2)
    n1 = np.linalg.norm(r1, axis=2); n2 = np.linalg.norm(r2, axis=2)
    l0 = np.linalg.norm(r0, axis=1)[None, :]
    mask = cr2 < (rcore * l0)**2
    cr2 = np.where(mask, 1.0, cr2)
    k = np.einsum('nk,mnk->mn', r0, r1 / np.maximum(n1, 1e-12)[..., None]
                  - r2 / np.maximum(n2, 1e-12)[..., None]) / (4 * np.pi * cr2)
    k = np.where(mask, 0.0, k)
    return cr * k[..., None]


def horseshoe_vel(P, lat, far=1e4, bound=True):
    """Induced velocity per unit Gamma of every horseshoe at points P; trailing legs to -x_body (aft)."""
    A, B = lat["A"], lat["B"]
    t = np.array([-far, 0, 0])
    v = seg_vel(P, A + t, A) + seg_vel(P, B, B + t)
    if bound:
        v = v + seg_vel(P, A, B)
    return v


class VLM:
    def __init__(self, surfaces, Sref, cref, bref, xref_avl):
        self.lat = build_lattice(surfaces)
        self.S, self.c, self.b = Sref, cref, bref
        self.rref = to_body(np.array(xref_avl, float))
        lat = self.lat
        self.VC = horseshoe_vel(lat["C"], lat)
        self.AIC = np.einsum('mnk,mk->mn', self.VC, lat["N"])
        self.mid = 0.5 * (lat["A"] + lat["B"])
        self.Vmid = horseshoe_vel(self.mid, lat)  # (m,n,3) for force evaluation

    def normals(self, deflections):
        lat = self.lat
        N = lat["N"].copy()
        for i, cl in enumerate(lat["ctrl"]):
            d = sum(np.radians(deflections[nm] * g) for nm, g in cl if nm in deflections)
            if d != 0:
                N[i] = rotate(N[i], lat["H"][i], d)  # AVL: + deflection = trailing edge down
        return N

    def solve(self, alpha=0.0, beta=0.0, p=0.0, q=0.0, r=0.0, defl=None, mach=0.0):
        """alpha,beta deg; p,q,r nondimensional pb/2V, qc/2V, rb/2V (stability-axis rates, AVL style)."""
        defl = defl or {}
        lat = self.lat
        a, b = np.radians(alpha), np.radians(beta)
        Vac = np.array([np.cos(a) * np.cos(b), np.sin(b), np.sin(a) * np.cos(b)])  # aircraft vel, body
        # stability-axis rates -> body rates
        ps, qs, rs = 2 * p / self.b, 2 * q / self.c, 2 * r / self.b
        om = np.array([ps * np.cos(a) - rs * np.sin(a), qs, ps * np.sin(a) + rs * np.cos(a)])
        N = self.normals(defl)
        AIC = self.AIC if not defl else np.einsum('mnk,mk->mn', self.VC, N)

        def Vair(P):
            return -(Vac[None, :] + np.cross(om[None, :], P - self.rref[None, :]))
        rhs = -np.sum(Vair(lat["C"]) * N, axis=1)
        G = np.linalg.solve(AIC, rhs)
        Vloc = Vair(self.mid) + np.einsum('mnk,n->mk', self.Vmid, G)
        dl = lat["B"] - lat["A"]
        F = G[:, None] * np.cross(Vloc, dl)  # rho = 1, V = 1
        Ft = F.sum(0)
        Mt = np.cross(self.mid - self.rref[None, :], F).sum(0)
        qS = 0.5 * self.S
        # Trefftz-plane induced drag: trailing legs only, evaluated far downstream (full wake velocity)
        PT = self.mid + np.array([-5e3, 0, 0])
        wT = np.einsum('mnk,n->mk', horseshoe_vel(PT, lat, bound=False), G)
        dhat = -Vac / np.linalg.norm(Vac)  # drag acts along air velocity
        CDff = 0.5 * np.sum(G[:, None] * np.cross(wT, dl) * dhat[None, :]) / qS
        # stability axes
        ca, sa = np.cos(a), np.sin(a)
        Xs = Ft[0] * ca + Ft[2] * sa; Zs = -Ft[0] * sa + Ft[2] * ca
        Ls = Mt[0] * ca + Mt[2] * sa; Ns = -Mt[0] * sa + Mt[2] * ca
        # wind axes for drag/side force
        CL = -Zs / qS
        CDi = (-(Xs * np.cos(b) + Ft[1] * np.sin(b))) / qS
        CY = (-Xs * np.sin(b) + Ft[1] * np.cos(b)) / qS
        return dict(CL=CL, CD=CDi, CDff=CDff, CY=CY, Cl=Ls / (qS * self.b), Cm=Mt[1] / (qS * self.c),
                    Cn=Ns / (qS * self.b), G=G, F=F)


def derivatives(v, alpha, defl, h=0.5, hr=0.01):
    keys = ["CL", "CD", "CY", "Cl", "Cm", "Cn"]
    base = v.solve(alpha=alpha, defl=defl)

    def cd(f_plus, f_minus, step):
        return {k: (f_plus[k] - f_minus[k]) / (2 * step) for k in keys}
    d = {}
    d["a"] = cd(v.solve(alpha + h, 0, defl=defl), v.solve(alpha - h, 0, defl=defl), np.radians(h))
    d["b"] = cd(v.solve(alpha, h, defl=defl), v.solve(alpha, -h, defl=defl), np.radians(h))
    for rk in ["p", "q", "r"]:
        d[rk] = cd(v.solve(alpha, **{rk: hr}, defl=defl), v.solve(alpha, **{rk: -hr}, defl=defl), hr)
    for cn in ["elevator", "aileron", "rudder"]:
        dp = dict(defl); dm = dict(defl)
        dp[cn] = defl.get(cn, 0) + 1.0; dm[cn] = defl.get(cn, 0) - 1.0
        d[cn] = cd(v.solve(alpha, defl=dp), v.solve(alpha, defl=dm), np.radians(1.0))
    return base, d


# ---------------------------------------------------------------------------
# Worked-example UAV (AVL geometry axes, metres). Matches demo_uav.avl.
# ---------------------------------------------------------------------------

def uav_surfaces(ns_w=16, nc_w=8, scale=1.0):
    nsw, ncw = int(ns_w * scale), int(nc_w * scale)
    wing = Surface("Wing", [(0.0, 0.0, 0.0, 0.26, 2.0), (0.04, 1.0, 1.0 * np.tan(np.radians(3)), 0.18, 0.0)],
                   ncw, nsw, camber=(0.02, 0.4), ydup=True)
    # aileron on outer wing modelled on the outboard half via a separate surface
    wing_in = Surface("Wing", [(0.0, 0.0, 0.0, 0.26, 2.0), (0.02, 0.5, 0.5 * np.tan(np.radians(3)), 0.22, 1.0)],
                      ncw, max(nsw // 2, 2), camber=(0.02, 0.4), ydup=True)
    wing_out = Surface("Wing", [(0.02, 0.5, 0.5 * np.tan(np.radians(3)), 0.22, 1.0),
                                (0.04, 1.0, 1.0 * np.tan(np.radians(3)), 0.18, 0.0)],
                       ncw, max(nsw // 2, 2), camber=(0.02, 0.4), ydup=True,
                       control=dict(name="aileron", xhinge=0.75, gain=1.0, sgndup=-1.0))
    htail = Surface("Htail", [(0.95, 0.0, 0.05, 0.14, -1.0), (0.97, 0.30, 0.05, 0.11, -1.0)],
                    max(int(6 * scale), 2), max(int(8 * scale), 2), camber=(0.0, 0.4), ydup=True,
                    control=dict(name="elevator", xhinge=0.6, gain=1.0, sgndup=1.0))
    vtail = Surface("Vtail", [(0.93, 0.0, 0.05, 0.20, 0.0), (1.00, 0.0, 0.30, 0.12, 0.0)],
                    max(int(6 * scale), 2), max(int(6 * scale), 2), vertical=True,
                    control=dict(name="rudder", xhinge=0.6, gain=1.0, sgndup=1.0))
    return [wing_in, wing_out, htail, vtail]


REF = dict(Sref=0.44, cref=0.222, bref=2.0, xref=(0.115, 0.0, 0.0))
MASS = dict(m=3.2, Ixx=0.32, Iyy=0.22, Izz=0.52, Ixz=0.0)
FLIGHT = dict(V=18.0, rho=1.15, g=9.81, CD0=0.032)  # rho at ~ 1000 m, Chennai-day ~ hot


def helmbold(AR):
    return 2 * np.pi * AR / (2 + np.sqrt(AR**2 + 4))


def validation_rect_wing(AR=6.0):
    rows = []
    for ns, nc in [(4, 2), (8, 4), (16, 6), (24, 8), (32, 10), (48, 12)]:
        w = Surface("W", [(0, 0, 0, 1.0, 0.0), (0, AR / 2, 0, 1.0, 0.0)], nc, ns // 2,
                    camber=(0.0, 0.4), ydup=True)
        v = VLM([w], AR, 1.0, AR, (0.25, 0, 0))
        r1 = v.solve(alpha=2.0); r0 = v.solve(alpha=-2.0)
        cla = (r1["CL"] - r0["CL"]) / np.radians(4.0)
        e = r1["CL"]**2 / (np.pi * AR * r1["CDff"])
        e_nf = r1["CL"]**2 / (np.pi * AR * r1["CD"])
        rows.append(dict(ns=ns, nc=nc, N=len(v.lat["G"]) if "G" in v.lat else v.AIC.shape[0],
                         CLa=cla, e=e, e_nearfield=e_nf))
    return rows, helmbold(AR)


def elliptic_wing(AR=6.0, ns=24, nc=8, c0=1.0):
    b = AR * np.pi * c0 / 4.0  # S = pi*b*c0/4 -> AR = 4b/(pi c0)
    ye = 0.5 * b * np.sin(0.5 * np.pi * np.linspace(0, 1, ns + 1))  # cluster to tip
    surfs = []
    for j in range(ns):
        c1 = c0 * np.sqrt(max(1 - (2 * ye[j] / b)**2, 0)); c2 = c0 * np.sqrt(max(1 - (2 * ye[j + 1] / b)**2, 0))
        surfs.append(Surface("W", [(-0.25 * c1, ye[j], 0, c1, 0.0), (-0.25 * c2, ye[j + 1], 0, max(c2, 1e-4), 0.0)],
                             nc, 1, camber=(0.0, 0.4), ydup=True))
    S = np.pi * b * c0 / 4
    v = VLM(surfs, S, S / b, b, (0, 0, 0))
    r1 = v.solve(alpha=2.0); r0 = v.solve(alpha=-2.0)
    return dict(ns=ns, nc=nc, CLa=(r1["CL"] - r0["CL"]) / np.radians(4), e=r1["CL"]**2 / (np.pi * AR * r1["CDff"]))


def trim(v, CLreq):
    """solve alpha, elevator for CL=CLreq, Cm=0 (linear, two Newton passes)."""
    a, de = 2.0, 0.0
    for _ in range(4):
        r = v.solve(alpha=a, defl={"elevator": de})
        ra = v.solve(alpha=a + 0.5, defl={"elevator": de})
        rd = v.solve(alpha=a, defl={"elevator": de + 0.5})
        J = np.array([[ra["CL"] - r["CL"], rd["CL"] - r["CL"]],
                      [ra["Cm"] - r["Cm"], rd["Cm"] - r["Cm"]]]) / 0.5
        dx = np.linalg.solve(J, -np.array([r["CL"] - CLreq, r["Cm"]]))
        a += dx[0]; de += dx[1]
    return a, de, v.solve(alpha=a, defl={"elevator": de})


def eigen(d, base, alpha_deg):
    m, Ixx, Iyy, Izz = MASS["m"], MASS["Ixx"], MASS["Iyy"], MASS["Izz"]
    V, rho, g, CD0 = FLIGHT["V"], FLIGHT["rho"], FLIGHT["g"], FLIGHT["CD0"]
    S, c, b = REF["Sref"], REF["cref"], REF["bref"]
    Q = 0.5 * rho * V**2
    CL0 = base["CL"]; CD = CD0 + base["CD"]
    CLa, CDa, Cma = d["a"]["CL"], d["a"]["CD"], d["a"]["Cm"]
    CLq, Cmq = d["q"]["CL"], d["q"]["Cm"]
    # stability-axis longitudinal (u, w, q, theta), alpha_dot terms neglected as in AVL
    Xu = -Q * S * 2 * CD / (m * V); Zu = -Q * S * 2 * CL0 / (m * V)
    Xw = Q * S * (CL0 - CDa) / (m * V); Zw = -Q * S * (CLa + CD) / (m * V)
    Mw = Q * S * c * Cma / (Iyy * V)
    Zq = -Q * S * c * CLq / (2 * m * V); Mq = Q * S * c**2 * Cmq / (2 * Iyy * V)
    Along = np.array([[Xu, Xw, 0, -g],
                      [Zu, Zw, V + Zq, 0],
                      [0, Mw, Mq, 0],
                      [0, 0, 1, 0]])
    # lateral (v, p, r, phi)
    Yv = Q * S * d["b"]["CY"] / (m * V); Lv = Q * S * b * d["b"]["Cl"] / (Ixx * V)
    Nv = Q * S * b * d["b"]["Cn"] / (Izz * V)
    Yp = Q * S * b * d["p"]["CY"] / (2 * m * V); Yr = Q * S * b * d["r"]["CY"] / (2 * m * V)
    Lp = Q * S * b**2 * d["p"]["Cl"] / (2 * Ixx * V); Lr = Q * S * b**2 * d["r"]["Cl"] / (2 * Ixx * V)
    Np = Q * S * b**2 * d["p"]["Cn"] / (2 * Izz * V); Nr = Q * S * b**2 * d["r"]["Cn"] / (2 * Izz * V)
    Alat = np.array([[Yv, Yp, Yr - V, g],
                     [Lv, Lp, Lr, 0],
                     [Nv, Np, Nr, 0],
                     [0, 1, 0, 0]])
    return np.linalg.eigvals(Along), np.linalg.eigvals(Alat), Along, Alat


def describe(ev):
    out = []
    for lam in sorted(ev, key=lambda z: (abs(z.imag) < 1e-9, -abs(z))):
        if lam.imag < -1e-9:
            continue
        wn = abs(lam); zeta = -lam.real / wn if wn > 0 else 0
        T = (np.log(2) / abs(lam.real)) if abs(lam.real) > 1e-9 else np.inf
        out.append(dict(re=lam.real, im=lam.imag, wn=wn, zeta=zeta,
                        t_half_or_double=T, unstable=lam.real > 0))
    return out


if __name__ == "__main__":
    res = {}
    # 1. validation
    rows, cla_h = validation_rect_wing(6.0)
    res["validation"] = dict(rows=rows, helmbold=cla_h,
                             elliptic=[elliptic_wing(6.0, ns, nc) for ns, nc in [(8, 4), (16, 6), (32, 8)]])
    # 2. lattice convergence for UAV
    conv = []
    for sc in [0.5, 1.0, 1.5, 2.0]:
        v = VLM(uav_surfaces(scale=sc), REF["Sref"], REF["cref"], REF["bref"], REF["xref"])
        r1 = v.solve(alpha=3.0); r0 = v.solve(alpha=1.0)
        cla = (r1["CL"] - r0["CL"]) / np.radians(2); cma = (r1["Cm"] - r0["Cm"]) / np.radians(2)
        rb = v.solve(alpha=2.0, beta=1.0); rbm = v.solve(alpha=2.0, beta=-1.0)
        rp = v.solve(alpha=2.0, p=0.01); rpm = v.solve(alpha=2.0, p=-0.01)
        conv.append(dict(scale=sc, N=v.AIC.shape[0], CLa=cla, Cma=cma,
                         Cnb=(rb["Cn"] - rbm["Cn"]) / np.radians(2), Clp=(rp["Cl"] - rpm["Cl"]) / 0.02,
                         Xnp=REF["xref"][0] - cma / cla * REF["cref"]))
    res["convergence"] = conv
    # 3. trimmed analysis on the scale-1.5 lattice
    v = VLM(uav_surfaces(scale=1.5), REF["Sref"], REF["cref"], REF["bref"], REF["xref"])
    W = MASS["m"] * FLIGHT["g"]; Q = 0.5 * FLIGHT["rho"] * FLIGHT["V"]**2
    CLreq = W / (Q * REF["Sref"])
    a, de, rt = trim(v, CLreq)
    base, d = derivatives(v, a, {"elevator": de})
    res["trim"] = dict(CLreq=CLreq, alpha=a, elevator=de, CL=rt["CL"], Cm=rt["Cm"], CDi=rt["CD"],
                       CDff=rt["CDff"], e=rt["CL"]**2 / (np.pi * REF["bref"]**2 / REF["Sref"] * rt["CDff"]),
                       N=v.AIC.shape[0])
    res["derivs"] = {k: {kk: float(vv) for kk, vv in dd.items()} for k, dd in d.items()}
    res["Xnp"] = REF["xref"][0] - d["a"]["Cm"] / d["a"]["CL"] * REF["cref"]
    res["static_margin"] = (res["Xnp"] - REF["xref"][0]) / REF["cref"]
    elo, ela, Al, At = eigen(d, base, a)
    res["modes_long"] = describe(elo); res["modes_lat"] = describe(ela)
    # 4. alpha sweep
    sweep = []
    for al in np.arange(-4, 12.1, 1.0):
        r = v.solve(alpha=al, defl={"elevator": de})
        sweep.append(dict(alpha=al, CL=r["CL"], Cm=r["Cm"], CDi=r["CD"], CDff=r["CDff"]))
    res["sweep"] = sweep
    # spanwise load at trim
    lat = v.lat
    wing = [i for i, t in enumerate(lat["tag"]) if t == "Wing"]
    ys = 0.5 * (lat["A"][wing, 1] + lat["B"][wing, 1])
    Fz = -rt["F"][wing, 2]
    yu = np.unique(np.round(ys, 5))
    wid = np.abs(lat["B"][wing, 1] - lat["A"][wing, 1])
    load = [dict(y=float(y), lift=float(Fz[np.isclose(ys, y, atol=1e-5)].sum()
                                         / wid[np.isclose(ys, y, atol=1e-5)][0])) for y in yu]
    res["spanload"] = load
    json.dump(res, open("/home/claude/avl_paper/results.json", "w"), indent=1, default=float)
    print(json.dumps({k: res[k] for k in ["validation", "convergence", "trim", "Xnp", "static_margin",
                                          "modes_long", "modes_lat"]}, indent=1, default=float))
    print(json.dumps(res["derivs"], indent=1))
