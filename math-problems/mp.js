/*
TOOL:    math-problems/mp.js — shared script for the Interesting Math Problems pages
FAMILY:  interesting-math-problems
VERSION: 1.0.0
DATE:    2026-11-25
CHAT:    Interesting Math Problems group — build all 25 problems in groups and upload
CHANGES: 1.0.0 — first release: theme / sidebar / full-screen buttons, contents built from sections, keyboard
         P (play) S (step) X (pause) M (contents) F (full screen), simulation loop, line / bar chart on canvas
STATUS:  public

Page use:  MP.ctl = MP.loop(stepFn, {batch, interval, after});   // wires P / S / X
           MP.chart(canvas, cfg);  MP.onRedraw(fn);  MP.pct(p);  MP.num(x)
*/
(function () {
  "use strict";
  const $ = id => document.getElementById(id);
  const MP = window.MP = { $ };
  const redraws = [];
  MP.css = v => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  MP.onRedraw = f => { redraws.push(f); };
  MP.redraw = () => redraws.forEach(f => { try { f(); } catch (e) { console.error(e); } });
  MP.pct = (p, d) => {
    if (!isFinite(p)) return "–";
    if (d != null) return (p * 100).toFixed(d) + " %";
    if (p >= 1) return "100 %";
    if (p > 0.99999) return "> 99.999 %";
    if (p >= 0.99 || (p < 0.01 && p > 0)) return (p * 100).toPrecision(3) + " %";
    return (p * 100).toFixed(2) + " %";
  };
  MP.num = (x, d) => {
    if (!isFinite(x)) return "–";
    if (Math.abs(x) >= 1e7 || (Math.abs(x) < 1e-3 && x !== 0)) return x.toExponential(d == null ? 3 : d).replace("e+", " × 10^").replace("e-", " × 10^-");
    return x.toLocaleString("en-IN", { maximumFractionDigits: d == null ? 3 : d });
  };
  MP.rand = n => Math.floor(Math.random() * n);
  MP.shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = MP.rand(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  /* ---------- simulation loop: P play, S step, X pause ---------- */
  MP.loop = function (stepFn, opt) {
    opt = Object.assign({ batch: 1, interval: 60, after: null }, opt || {});
    let timer = null;
    const ctl = {
      play() { if (timer) return; timer = setInterval(() => { const b = typeof opt.batch === "function" ? opt.batch() : opt.batch;
        for (let i = 0; i < b; i++) stepFn(i === b - 1); if (opt.after) opt.after(); }, opt.interval); },
      pause() { clearInterval(timer); timer = null; },
      step() { ctl.pause(); stepFn(true); if (opt.after) opt.after(); },
      get running() { return !!timer; }
    };
    return ctl;
  };

  /* ---------- chart ----------
     cfg = { height, x:{min,max,log,label,fmt}, y:{min,max,log,label,pct},
             series:[{pts:[[x,y]...], color:"--a", dash:[], width:3, step:false}],
             bars:[{x0,x1,y,color,alpha}], hlines:[{y,label,color}], vlines:[{x,label,color}],
             points:[{x,y,color,label,r}] } */
  function nice(min, max, n) {
    const span = max - min || 1, raw = span / n, mag = Math.pow(10, Math.floor(Math.log10(raw)));
    const step = [1, 2, 2.5, 5, 10].map(m => m * mag).find(s => s >= raw) || raw;
    const out = []; for (let v = Math.ceil(min / step) * step; v <= max + step * 1e-9; v += step) out.push(+v.toPrecision(12));
    return out;
  }
  function logTicks(min, max) {
    const out = []; for (let e = Math.floor(Math.log10(min)); e <= Math.ceil(Math.log10(max)); e++)
      [1, 2, 5].forEach(m => { const v = m * Math.pow(10, e); if (v >= min * 0.999 && v <= max * 1.001) out.push(v); });
    return out;
  }
  const tickFmt = v => Math.abs(v) >= 1e6 ? v.toExponential(0).replace("e+", "e") : Math.abs(v) >= 1000 ? (v / 1000) + "k" : String(+v.toPrecision(6));
  MP.chart = function (cv, cfg) {
    const dpr = window.devicePixelRatio || 1, W = cv.clientWidth || 600, H = cfg.height || 380;
    cv.style.height = H + "px"; cv.width = W * dpr; cv.height = H * dpr;
    const g = cv.getContext("2d"); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
    const L = 64, R = 22, T = 18, B = 48, x = cfg.x, y = cfg.y;
    const fx = v => x.log ? Math.log10(v) : v, fy = v => y.log ? Math.log10(v) : v;
    const X = v => L + (fx(v) - fx(x.min)) / (fx(x.max) - fx(x.min)) * (W - L - R);
    const Y = v => T + (1 - (fy(v) - fy(y.min)) / (fy(y.max) - fy(y.min))) * (H - T - B);
    const col = c => c && c.startsWith("--") ? MP.css(c) : (c || MP.css("--a"));
    g.font = "13px Segoe UI, sans-serif"; g.lineWidth = 1;
    const xt = x.ticks || (x.log ? logTicks(x.min, x.max) : nice(x.min, x.max, 8));
    const yt = y.ticks || (y.log ? logTicks(y.min, y.max) : nice(y.min, y.max, 5));
    g.strokeStyle = MP.css("--line"); g.fillStyle = MP.css("--muted");
    xt.forEach(v => { g.beginPath(); g.moveTo(X(v), T); g.lineTo(X(v), H - B); g.stroke(); g.textAlign = "center"; g.fillText(x.fmt ? x.fmt(v) : tickFmt(v), X(v), H - B + 17); });
    yt.forEach(v => { g.beginPath(); g.moveTo(L, Y(v)); g.lineTo(W - R, Y(v)); g.stroke(); g.textAlign = "right";
      g.fillText(y.pct ? (+(v * 100).toPrecision(4)) + " %" : (y.fmt ? y.fmt(v) : tickFmt(v)), L - 6, Y(v) + 4); });
    g.textAlign = "center"; if (x.label) g.fillText(x.label, (L + W - R) / 2, H - 8);
    if (y.label) { g.save(); g.translate(14, (T + H - B) / 2); g.rotate(-Math.PI / 2); g.fillText(y.label, 0, 0); g.restore(); }
    g.save(); g.beginPath(); g.rect(L, T - 2, W - L - R, H - T - B + 4); g.clip();
    (cfg.bars || []).forEach(b => { g.globalAlpha = b.alpha == null ? 0.85 : b.alpha; g.fillStyle = col(b.color);
      const y0 = Y(y.log ? y.min : Math.max(y.min, 0)); g.fillRect(X(b.x0), Math.min(Y(b.y), y0), Math.max(1, X(b.x1) - X(b.x0)), Math.abs(y0 - Y(b.y))); });
    g.globalAlpha = 1;
    (cfg.series || []).forEach(s => {
      g.strokeStyle = col(s.color); g.lineWidth = s.width || 3; g.setLineDash(s.dash || []); g.beginPath();
      let first = true, py = 0;
      s.pts.forEach(([a, b]) => { if (!isFinite(a) || !isFinite(b) || (x.log && a <= 0) || (y.log && b <= 0)) { first = true; return; }
        if (first) { g.moveTo(X(a), Y(b)); first = false; } else { if (s.step) g.lineTo(X(a), py); g.lineTo(X(a), Y(b)); } py = Y(b); });
      g.stroke(); g.setLineDash([]);
    });
    g.restore();
    (cfg.hlines || []).forEach(h => { g.strokeStyle = col(h.color || "--ink"); g.setLineDash([3, 4]); g.lineWidth = 1.5; g.beginPath(); g.moveTo(L, Y(h.y)); g.lineTo(W - R, Y(h.y)); g.stroke(); g.setLineDash([]);
      if (h.label) { g.fillStyle = col(h.color || "--ink"); g.textAlign = "left"; g.fillText(h.label, L + 6, Y(h.y) - 6); } });
    (cfg.vlines || []).forEach(h => { g.strokeStyle = col(h.color || "--muted"); g.setLineDash([3, 4]); g.lineWidth = 1.5; g.beginPath(); g.moveTo(X(h.x), T); g.lineTo(X(h.x), H - B); g.stroke(); g.setLineDash([]);
      if (h.label) { g.fillStyle = col(h.color || "--muted"); g.textAlign = "left"; g.fillText(h.label, X(h.x) + 5, T + 14); } });
    (cfg.points || []).forEach(p => { g.fillStyle = col(p.color); g.beginPath(); g.arc(X(p.x), Y(p.y), p.r || 6, 0, 7); g.fill();
      if (p.label) { g.font = "bold 14px Segoe UI, sans-serif"; g.textAlign = p.align || "center"; g.fillText(p.label, X(p.x) + (p.dx || 0), Y(p.y) + (p.dy == null ? -12 : p.dy)); g.font = "13px Segoe UI, sans-serif"; } });
    return { X, Y, g, W, H };
  };
  /* plain canvas sized to its box, for pictures */
  MP.canvas = function (cv, H) {
    const dpr = window.devicePixelRatio || 1, W = cv.clientWidth || 600; cv.style.height = H + "px";
    cv.width = W * dpr; cv.height = H * dpr; const g = cv.getContext("2d"); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
    return { g, W, H };
  };

  /* ---------- page chrome ---------- */
  function buildSide() {
    const side = $("side"); if (!side) return;
    let h = "";
    document.querySelectorAll("main section[id]").forEach(s => { const t = s.querySelector("h2"); if (t) h += `<a href="#${s.id}">${t.textContent}</a>`; });
    h += `<div class="keys"><b>Keyboard</b><br><kbd>P</kbd> play<br><kbd>S</kbd> one step<br><kbd>X</kbd> pause<br><kbd>M</kbd> hide / show contents<br><kbd>F</kbd> full screen</div>`;
    side.innerHTML = h;
  }
  function toggleFull() { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen().catch(() => {}); }
  function toggleSide() { const s = $("side"); if (s) s.classList.toggle("hidden"); setTimeout(MP.redraw, 30); }
  document.addEventListener("DOMContentLoaded", () => {
    buildSide();
    if ($("themeBtn")) $("themeBtn").onclick = () => { if (window.SiteTheme) SiteTheme.toggle();
      else document.documentElement.dataset.theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark"; setTimeout(MP.redraw, 30); };
    if ($("btnSide")) $("btnSide").onclick = toggleSide;
    if ($("btnFull")) $("btnFull").onclick = toggleFull;
    MP.redraw();
  });
  window.addEventListener("site-theme", () => setTimeout(MP.redraw, 10));
  let rt = null; window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(MP.redraw, 120); });
  document.addEventListener("fullscreenchange", () => setTimeout(MP.redraw, 120));
  document.addEventListener("keydown", e => {
    const t = e.target.tagName; if (t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key.toLowerCase(), c = MP.ctl;
    if (k === "p" && c) c.play(); else if (k === "s" && c) c.step(); else if (k === "x" && c) c.pause();
    else if (k === "m") toggleSide(); else if (k === "f") toggleFull(); else return;
    e.preventDefault();
  });
})();
