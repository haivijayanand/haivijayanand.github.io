"""
TOOL: me_panel.py - multi-element Hess-Smith panel method (inviscid) for the XFOIL paper
FAMILY: xfoil-improvements-paper
VERSION: 1.0.0
DATE: 2026-11-28
CHAT: XFOIL improvements technical paper (Claude, 2026-11-28)
CHANGES: 1.0.0 - first version: constant source per panel + uniform vortex per element,
         Kutta condition per element, off-body velocity evaluation
"""
__version__ = "1.0.0"
import numpy as np

def naca4(code, n=121):
    m = int(code[0]) / 100; p = int(code[1]) / 10; t = int(code[2:]) / 100
    beta = np.linspace(0, np.pi, n); x = 0.5 * (1 - np.cos(beta))
    yt = 5 * t * (0.2969 * np.sqrt(x) - 0.1260 * x - 0.3516 * x**2 + 0.2843 * x**3 - 0.1036 * x**4)
    if m == 0:
        yc = np.zeros_like(x); dy = np.zeros_like(x)
    else:
        yc = np.where(x < p, m / p**2 * (2 * p * x - x**2), m / (1 - p)**2 * ((1 - 2 * p) + 2 * p * x - x**2))
        dy = np.where(x < p, 2 * m / p**2 * (p - x), 2 * m / (1 - p)**2 * (p - x))
    th = np.arctan(dy)
    xu, yu = x - yt * np.sin(th), yc + yt * np.cos(th)
    xl, yl = x + yt * np.sin(th), yc - yt * np.cos(th)
    X = np.concatenate([xu[::-1], xl[1:]]); Y = np.concatenate([yu[::-1], yl[1:]])
    return X, Y   # TE (upper) -> LE -> TE (lower): counter-clockwise contour

def place(X, Y, chord=1.0, x0=0.0, y0=0.0, deflect_deg=0.0, pivot=(0.0, 0.0)):
    """scale, rotate nose-down by deflect about (pivot in element coords), translate"""
    x = X * chord; y = Y * chord
    px, py = pivot[0] * chord, pivot[1] * chord
    d = -np.radians(deflect_deg)
    xr = px + (x - px) * np.cos(d) - (y - py) * np.sin(d)
    yr = py + (x - px) * np.sin(d) + (y - py) * np.cos(d)
    return xr + x0, yr + y0

def _infl(xc, yc, x1, y1, x2, y2):
    """velocity at (xc,yc) induced by unit-strength constant source and vortex panels"""
    dx = x2 - x1; dy = y2 - y1; L = np.hypot(dx, dy)
    tx, ty = dx / L, dy / L
    rx1 = xc[:, None] - x1[None, :]; ry1 = yc[:, None] - y1[None, :]
    rx2 = xc[:, None] - x2[None, :]; ry2 = yc[:, None] - y2[None, :]
    # local coords
    xl1 = rx1 * tx + ry1 * ty; yl = -rx1 * ty + ry1 * tx
    xl2 = rx2 * tx + ry2 * ty
    r1s = xl1**2 + yl**2; r2s = xl2**2 + yl**2
    th = np.arctan2(yl, xl2) - np.arctan2(yl, xl1)
    # on-panel (self) limit taken from the exterior (right-hand) side of a CCW contour
    th = np.where((np.abs(yl) < 1e-12) & (xl1 * xl2 < 0), -np.pi, th)
    lg = 0.5 * np.log(np.maximum(r1s, 1e-30) / np.maximum(r2s, 1e-30))
    us = lg / (2 * np.pi); vs = th / (2 * np.pi)       # source, local frame
    uv = th / (2 * np.pi); vv = -lg / (2 * np.pi)      # vortex (clockwise positive circulation convention)
    Us = us * tx - vs * ty; Vs = us * ty + vs * tx
    Uv = uv * tx - vv * ty; Vv = uv * ty + vv * tx
    return Us, Vs, Uv, Vv

class MultiElement:
    def __init__(self, elements):
        self.el = elements  # list of (X, Y) clockwise from upper TE
        xs, ys, eid = [], [], []
        for k, (X, Y) in enumerate(elements):
            xs.append(X); ys.append(Y)
        self.nodes = elements
        P = []
        for k, (X, Y) in enumerate(elements):
            for i in range(len(X) - 1):
                P.append((X[i], Y[i], X[i + 1], Y[i + 1], k))
        P = np.array(P)
        self.x1, self.y1, self.x2, self.y2 = P[:, 0], P[:, 1], P[:, 2], P[:, 3]
        self.eid = P[:, 4].astype(int)
        self.xc = 0.5 * (self.x1 + self.x2); self.yc = 0.5 * (self.y1 + self.y2)
        L = np.hypot(self.x2 - self.x1, self.y2 - self.y1)
        self.tx = (self.x2 - self.x1) / L; self.ty = (self.y2 - self.y1) / L
        self.nx, self.ny = self.ty, -self.tx   # outward normal for CCW (upper TE -> LE -> lower TE) ordering
        self.L = L
        self.ne = len(elements); self.np = len(L)
        Us, Vs, Uv, Vv = _infl(self.xc, self.yc, self.x1, self.y1, self.x2, self.y2)
        self.Us, self.Vs, self.Uv, self.Vv = Us, Vs, Uv, Vv

    def solve(self, alpha_deg):
        a = np.radians(alpha_deg); N, E = self.np, self.ne
        A = np.zeros((N + E, N + E)); b = np.zeros(N + E)
        # normal velocity = 0
        An_s = self.Us * self.nx[:, None] + self.Vs * self.ny[:, None]
        An_v = self.Uv * self.nx[:, None] + self.Vv * self.ny[:, None]
        A[:N, :N] = An_s
        for k in range(E):
            A[:N, N + k] = An_v[:, self.eid == k].sum(1)
        b[:N] = -(np.cos(a) * self.nx + np.sin(a) * self.ny)
        # Kutta per element: tangential velocity first panel + last panel = 0 (opposite directions)
        At_s = self.Us * self.tx[:, None] + self.Vs * self.ty[:, None]
        At_v = self.Uv * self.tx[:, None] + self.Vv * self.ty[:, None]
        for k in range(E):
            idx = np.where(self.eid == k)[0]; f, l = idx[0], idx[-1]
            A[N + k, :N] = At_s[f] + At_s[l]
            for j in range(E):
                A[N + k, N + j] = At_v[f, self.eid == j].sum() + At_v[l, self.eid == j].sum()
            b[N + k] = -((np.cos(a) * self.tx[f] + np.sin(a) * self.ty[f]) + (np.cos(a) * self.tx[l] + np.sin(a) * self.ty[l]))
        sol = np.linalg.solve(A, b)
        self.sig = sol[:N]; self.gam = sol[N:]; self.alpha = a
        vt = At_s @ self.sig + sum(At_v[:, self.eid == j].sum(1) * self.gam[j] for j in range(E)) \
             + np.cos(a) * self.tx + np.sin(a) * self.ty
        self.vt = vt; self.cp = 1 - vt**2
        # forces by pressure integration, reference chord = 1
        # with outward normal n, force = -sum cp n dl
        fx = -np.sum(self.cp * self.L * self.nx); fy = -np.sum(self.cp * self.L * self.ny)
        self.cl = fy * np.cos(a) - fx * np.sin(a)
        self.cl_el = []
        for k in range(E):
            m = self.eid == k
            fxk = -np.sum(self.cp[m] * self.L[m] * self.nx[m]); fyk = -np.sum(self.cp[m] * self.L[m] * self.ny[m])
            self.cl_el.append(fyk * np.cos(a) - fxk * np.sin(a))
        return self.cl

    def velocity(self, x, y):
        x = np.atleast_1d(x); y = np.atleast_1d(y)
        Us, Vs, Uv, Vv = _infl(x, y, self.x1, self.y1, self.x2, self.y2)
        u = np.cos(self.alpha) + Us @ self.sig + sum(Uv[:, self.eid == j].sum(1) * self.gam[j] for j in range(self.ne))
        v = np.sin(self.alpha) + Vs @ self.sig + sum(Vv[:, self.eid == j].sum(1) * self.gam[j] for j in range(self.ne))
        return u, v

if __name__ == "__main__":
    X, Y = naca4("4412", 121)
    me = MultiElement([(X, Y)])
    for a in [0, 4, 8]:
        print(a, round(me.solve(a), 4))
