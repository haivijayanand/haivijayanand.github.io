"""
TOOL: xfdrive.py - interactive Python driver for XFOIL 6.99 (pipe-based)
FAMILY: xfoil-improvements-paper
VERSION: 1.5.0
DATE: 2026-11-28
CHAT: XFOIL improvements technical paper (Claude, 2026-11-28)
CHANGES: 1.0.0 - first version: prompt-synchronised session, per-alpha result parsing,
         stock/cold/robust sweep strategies
         1.1.0 - parse full-precision HPREC line (CL, CD) from the instrumented build
         1.2.0 - init(): INIT is a toggle in XFOIL, so re-issue it when it reports "assumed to be initialized"
         1.3.0 - VACC is sent inside the VPAR menu (it is not an OPER command)
         1.4.0 - trust argument selects relaxation variant 0/1/2 of the modified build
         1.5.0 - a hung ALFA is killed, XFOIL restarted with its recorded set-up, and the point marked failed
"""
__version__ = "1.5.0"

import os, re, select, subprocess, time, math

PROMPT = re.compile(rb"c>\s*$")
RE_IT = re.compile(r"^\s*(\d+)\s+rms:\s*([0-9.Ee+-]+)", re.M)
RE_A = re.compile(r"a =\s*([-0-9.]+)\s+CL =\s*([-0-9.]+)")
RE_CD = re.compile(r"Cm =\s*([-0-9.]+)\s+CD =\s*([-0-9.]+)")
RE_HP = re.compile(r"HPREC\s+([-0-9.Ee+]+)\s+([-0-9.Ee+]+)")
RE_TR = re.compile(r"Side (\d)\s+\w+\s+transition at x/c =\s*([0-9.]+)")


class XF:
    def __init__(self, binary, trust=False, timeout=60):
        self.args = (binary, trust, timeout); self.log = []; self._replay = False
        self._spawn()

    def _spawn(self):
        binary, trust, timeout = self.args
        env = dict(os.environ, GFORTRAN_UNBUFFERED_ALL="1")
        env["XF_TRUST"] = str(int(trust))   # 0 stock, 1 adaptive step bound, 2 fixed tighter bounds (QFoil-like)
        self.p = subprocess.Popen([binary], stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                                  stderr=subprocess.STDOUT, env=env, bufsize=0)
        self.timeout = timeout
        self.read()
        self.cmd("PLOP"); self.cmd("G F"); self.cmd("")

    def read(self):
        buf = b""; t0 = time.time()
        fd = self.p.stdout.fileno()
        while True:
            r, _, _ = select.select([fd], [], [], 0.5)
            if r:
                chunk = os.read(fd, 65536)
                if not chunk:
                    break
                buf += chunk
                if PROMPT.search(buf[-40:]) or buf.rstrip().endswith(b"s>") or buf.rstrip().endswith(b"i>") or buf.rstrip().endswith(b"r>"):
                    # crude: any XFOIL prompt
                    time.sleep(0.002)
                    r2, _, _ = select.select([fd], [], [], 0.01)
                    if not r2:
                        break
            if time.time() - t0 > self.timeout:
                raise TimeoutError(buf[-500:].decode(errors="ignore"))
        return buf.decode(errors="ignore")

    def cmd(self, s, record=True):
        if record and not self._replay:
            self.log.append(s)
        self.p.stdin.write((s + "\n").encode())
        return self.read()

    def restart(self):
        """kill a hung XFOIL and rebuild its set-up (airfoil, paneling, OPER settings) from the command log"""
        try:
            self.p.kill()
        except Exception:
            pass
        setup = [c for c in self.log if not c.startswith(("ALFA", "CL ", "INIT"))]
        self._spawn(); self._replay = True
        for c in setup[3:]:                 # first three are PLOP / G F / blank, issued by _spawn
            self.cmd(c)
        self._replay = False

    def close(self):
        try:
            self.p.stdin.write(b"\n\n\nQUIT\n"); self.p.stdin.flush()
            self.p.wait(timeout=5)
        except Exception:
            self.p.kill()

    # ---- setup helpers
    def load_naca(self, code, npan=160):
        self.cmd(f"NACA {code}")
        self.panels(npan)

    def load_file(self, path, npan=160):
        self.cmd(f"LOAD {path}")
        self.panels(npan)

    def panels(self, npan):
        self.cmd("PPAR"); self.cmd(f"N {npan}"); self.cmd(""); self.cmd("")

    def oper(self, re_, mach=0.0, ncrit=9.0, itmax=100, vacc=None):
        self.cmd("OPER")
        if re_:
            self.cmd(f"VISC {re_:g}")
        self.cmd(f"MACH {mach:g}")
        self.cmd("VPAR"); self.cmd(f"N {ncrit:g}")
        if vacc is not None:
            self.cmd(f"VACC {vacc:g}")      # VACC lives in the VPAR menu, not OPER
        self.cmd("")
        self.cmd(f"ITER {itmax}")

    def init(self):
        """INIT is a toggle in XFOIL; make sure the BLs WILL be re-initialised on the next point."""
        o = self.cmd("INIT")
        if "assumed to be initialized" in o:
            self.cmd("INIT")

    def alfa(self, a):
        try:
            out = self.cmd(f"ALFA {a:.4f}")
        except TimeoutError:
            self.restart()
            return dict(alpha=a, conv=False, iters=0, rms=[], cl=math.nan, cd=math.nan, cm=math.nan,
                        xtr1=math.nan, xtr2=math.nan, cl_hp=math.nan, cd_hp=math.nan, hung=True)
        return parse_point(out, a)

    def cl(self, c):
        out = self.cmd(f"CL {c:.4f}")
        return parse_point(out, None)


def parse_point(out, a_target):
    its = [(int(m.group(1)), float(m.group(2))) for m in RE_IT.finditer(out)]
    A = RE_A.findall(out); C = RE_CD.findall(out); T = RE_TR.findall(out)
    failed = ("Convergence failed" in out and "VISCAL" in out) or not its
    res = dict(alpha=a_target, conv=False, iters=len(its), rms=[r for _, r in its],
               cl=math.nan, cd=math.nan, cm=math.nan, xtr1=math.nan, xtr2=math.nan)
    if A:
        res["alpha"] = float(A[-1][0]); res["cl"] = float(A[-1][1])
    if C:
        res["cm"] = float(C[-1][0]); res["cd"] = float(C[-1][1])
    H = RE_HP.findall(out)
    res["cl_hp"] = float(H[-1][0]) if H else math.nan
    res["cd_hp"] = float(H[-1][1]) if H else math.nan
    for side, x in T[-2:]:
        res["xtr" + side] = float(x)
    bad = any(map(lambda v: not math.isfinite(v), [res["cl"], res["cd"]]))
    res["conv"] = (not failed) and (not bad) and its and its[-1][1] < 1e-4
    res["conv"] = bool(res["conv"])
    return res


# ---------------- sweep strategies ----------------
def sweep_cold(xf, alphas):
    out = []
    for a in alphas:
        xf.init(); r = xf.alfa(a); r["work"] = r["iters"]; out.append(r)
    return out


def _march(xf, seq):
    return [xf.alfa(a) for a in seq]


def sweep_stock(xf, alphas, a0=0.0):
    """Plain continuation (what ASEQ does): march up from a0 and down from a0,
    no recovery after a failed point."""
    up = [a for a in alphas if a >= a0]; dn = [a for a in alphas if a < a0][::-1]
    res = {}
    for seq in (up, dn):
        xf.init()
        for a in seq:
            r = xf.alfa(a); r["work"] = r["iters"]; res[a] = r
    return [res[a] for a in alphas]


def sweep_robust(xf, alphas, a0=0.0, depth=4):
    """Continuation with recovery: on failure, re-converge from the last good point
    (cold restart there if needed) and bisect the step down to 2**-depth of it."""
    up = [a for a in alphas if a >= a0]; dn = [a for a in alphas if a < a0][::-1]
    res = {}
    for seq in (up, dn):
        xf.init(); good = None
        for a in seq:
            r = xf.alfa(a); calls = r["iters"]
            if not r["conv"] and good is not None:
                ok = False
                for d in range(1, depth + 1):
                    # restore last good state
                    rg = xf.alfa(good); calls += rg["iters"]
                    if not rg["conv"]:
                        xf.init(); rg = xf.alfa(good); calls += rg["iters"]
                        if not rg["conv"]:
                            break
                    n = 2 ** d; step = (a - good) / n; okk = True
                    for k in range(1, n + 1):
                        rr = xf.alfa(good + k * step); calls += rr["iters"]
                        if not rr["conv"]:
                            okk = False; break
                    if okk:
                        r = rr; ok = True; break
                if not ok:
                    xf.init(); r = xf.alfa(a); calls += r["iters"]   # last resort: cold
            elif not r["conv"]:
                xf.init(); r = xf.alfa(a); calls += r["iters"]
            r["work"] = calls
            res[a] = r
            if r["conv"]:
                good = a
    return [res[a] for a in alphas]
