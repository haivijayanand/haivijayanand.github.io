/*
TOOL:    cbse_maths_core
FAMILY:  CBSE_REVISION / Maths kits (shared engine for every class)
VERSION: 2.1.2
DATE:    2026-11-22
CHAT:    CBSE Revision - Class 9 Maths full build; Class X, XI, XII kits
CHANGES: 2.1.2 - Practice: word questions get 4 answer options to tap (numeric ones keep the answer box); printable worksheet moved to a closed section below
         2.1.1 - home-page formula-sheet link counts the chapters (Class 12 has 13)
         2.1.0 - exam-focus card title from G9_CFG.boardTitle (Class 11/12 use "Exam focus")
         2.0.0 - class-neutral engine: all class/book text from G9_CFG (chapters/config.js), parts grouped from chapter data, optional old-book map, optional board-exam card on Revise
         1.1.0 - links to one-page formula sheets (sidebar, Revise tab, home); keys ignored on pages without the app shell
         1.0.0 - first release: app shell, routing, keyboard scheme (M/P/S/X/F), seeded RNG, maths board,
         animation controller, online practice, seeded worksheet + answer-key printing (class sets),
         quiz, teacher lesson plans and full-screen slide presenter, old-to-new syllabus map
*/
(function () {
  'use strict';
  const G9 = window.G9 = window.G9 || {};
  G9.version = '2.1.2';
  // per-kit settings come from chapters/config.js (window.G9_CFG); defaults keep the Class 9 kit working
  const CFG = G9.CFG = Object.assign({
    short: 'Class 9 Maths', roman: 'IX', brandSmall: 'Ganita Manjari · Revision &amp; Teaching Kit',
    heroTitle: 'Class 9 Mathematics — Ganita Manjari (2026–27)', book: 'the NCERT textbook', site: 'haivijayanand.github.io/class9/',
    oldMap: null, oldMapIntro: '', homeNote: ''
  }, window.G9_CFG || {});
  G9.chapters = [];
  G9.register = c => { G9.chapters.push(c); G9.chapters.sort((a, b) => a.no - b.no); };

  /* ================= maths + text helpers ================= */
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
  G9.gcd = gcd;
  G9.lcm = (a, b) => Math.abs(a * b) / gcd(a, b);
  // HTML fraction (unreduced)
  G9.F = (a, b) => `<span class="fr"><span>${a}</span><span>${b}</span></span>`;
  // reduced fraction n/d as HTML ("-" pulled out); returns integer when d divides n
  G9.Q = (n, d = 1) => {
    if (d < 0) { n = -n; d = -d; }
    const g = gcd(n, d); n /= g; d /= g;
    if (d === 1) return String(n).replace('-', '−');
    return (n < 0 ? '−' : '') + G9.F(Math.abs(n), d);
  };
  // number formatting: trims trailing zeros, uses unicode minus
  G9.num = (x, dp = 2) => {
    if (!isFinite(x)) return String(x);
    let s = (Math.round(x * 10 ** dp) / 10 ** dp).toFixed(dp);
    if (s.includes('.')) s = s.replace(/0+$/, '').replace(/\.$/, '');
    if (s === '-0') s = '0';
    return s.replace('-', '−');
  };
  // polynomial-ish term list -> "3x − 2y + 5"
  G9.terms = (list) => {
    let out = '';
    list.forEach(([c, v]) => {
      if (c === 0) return;
      const neg = c < 0, a = Math.abs(c);
      const coef = (a === 1 && v) ? '' : G9.num(a);
      const t = coef + (v || '');
      if (!out) out = (neg ? '−' : '') + t;
      else out += (neg ? ' − ' : ' + ') + t;
    });
    return out || '0';
  };
  G9.sgn = (c) => (c < 0 ? '− ' + G9.num(-c) : '+ ' + G9.num(c));
  G9.par = (c) => (c < 0 ? '(' + G9.num(c) + ')' : G9.num(c));
  // √n simplified -> {o, i} meaning o√i
  G9.surd = (n) => { let o = 1, i = n; for (let k = 2; k * k <= i; k++) while (i % (k * k) === 0) { i /= k * k; o *= k; } return { o, i }; };
  G9.surdH = (n) => { const s = G9.surd(n); if (s.i === 1) return String(s.o); return (s.o === 1 ? '' : s.o) + '√' + s.i; };
  G9.sup = (x) => `<sup>${x}</sup>`;
  // typographic minus for raw negative numbers in generated text ("-5" -> "−5"); leaves HTML attributes alone
  G9.fixMinus = (t) => t == null ? t : String(t).replace(/(^|[\s(=×÷,;:[\/>])-(\d)/g, '$1−$2').replace(/([−\-+]) −(\d+(?:\.\d+)?)/g, '$1 (−$2)');

  /* ================= seeded RNG ================= */
  function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  G9.rng = (seed) => {
    const r = mulberry32(seed >>> 0);
    const R = {
      r,
      int: (a, b) => a + Math.floor(r() * (b - a + 1)),
      pick: (arr) => arr[Math.floor(r() * arr.length)],
      nz: (a, b) => { let v; do v = R.int(a, b); while (v === 0); return v; },
      sign: () => (r() < 0.5 ? -1 : 1),
      shuffle: (arr) => { const x = arr.slice(); for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x; },
      chance: (p) => r() < p,
      distinct: (n, a, b) => { const s = new Set(); while (s.size < n) s.add(R.int(a, b)); return [...s]; }
    };
    return R;
  };
  G9.newSeed = () => 10000 + Math.floor(Math.random() * 89999);

  /* ================= storage (safe) ================= */
  const store = {
    get(k, d) { try { const v = localStorage.getItem('g9_' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('g9_' + k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
  };
  G9.store = store;

  /* ================= DOM helpers ================= */
  const h = (tag, attrs = {}, html) => {
    const e = document.createElement(tag);
    for (const k in attrs) {
      if (k === 'on') for (const ev in attrs.on) e.addEventListener(ev, attrs.on[ev]);
      else if (k === 'cls') e.className = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    if (html != null) e.innerHTML = html;
    return e;
  };
  G9.h = h;

  /* ================= colours (colour-blind safe) ================= */
  G9.C = {
    blue: '#1d4ed8', blueL: 'rgba(29,78,216,.15)', orange: '#ea580c', orangeL: 'rgba(234,88,12,.16)',
    purple: '#7c3aed', purpleL: 'rgba(124,58,237,.15)', ink: '#0f172a', grey: '#64748b', grid: '#e2e8f0', axis: '#334155', sky: '#0284c7', yellow: '#ca8a04'
  };
  const darkFix = () => {
    const d = document.body.classList.contains('dark');
    G9.C.ink = d ? '#e7ecf7' : '#0f172a'; G9.C.grid = d ? '#25304d' : '#e2e8f0'; G9.C.axis = d ? '#a8b3c9' : '#334155';
    G9.C.blue = d ? '#7aa2ff' : '#1d4ed8'; G9.C.orange = d ? '#ff9a52' : '#ea580c'; G9.C.purple = d ? '#b69cff' : '#7c3aed';
  };

  /* ================= Board: maths canvas ================= */
  class Board {
    constructor(parent, o = {}) {
      this.o = Object.assign({ xmin: -10, xmax: 10, ymin: -7, ymax: 7, aspect: 0.62, grid: 1, axes: true, labels: true, equal: true, maxH: 560 }, o);
      this.cv = h('canvas', { cls: 'cv' });
      parent.appendChild(this.cv);
      this.ctx = this.cv.getContext('2d');
      this.pts = []; this.drag = null; this.onDraw = null; this.onDrag = null;
      this._fit();
      if (window.ResizeObserver) { this.ro = new ResizeObserver(() => { this._fit(); this.redraw(); }); this.ro.observe(parent); }
      const pos = (ev) => { const r = this.cv.getBoundingClientRect(); return [ev.clientX - r.left, ev.clientY - r.top]; };
      this.cv.addEventListener('pointerdown', (ev) => {
        const [px, py] = pos(ev); let best = null, bd = 22;
        this.pts.forEach(p => { if (p.fixed) return; const d = Math.hypot(this.X(p.x) - px, this.Y(p.y) - py); if (d < bd) { bd = d; best = p; } });
        if (best) { this.drag = best; this.cv.setPointerCapture(ev.pointerId); ev.preventDefault(); }
      });
      this.cv.addEventListener('pointermove', (ev) => {
        if (!this.drag) return; const [px, py] = pos(ev); let x = this.ix(px), y = this.iy(py); const p = this.drag;
        if (p.snap) { x = Math.round(x / p.snap) * p.snap; y = Math.round(y / p.snap) * p.snap; }
        x = Math.max(this.o.xmin, Math.min(this.o.xmax, x)); y = Math.max(this.o.ymin, Math.min(this.o.ymax, y));
        if (p.constrain) [x, y] = p.constrain(x, y);
        p.x = x; p.y = y; if (this.onDrag) this.onDrag(p); this.redraw();
      });
      const end = () => { this.drag = null; };
      this.cv.addEventListener('pointerup', end); this.cv.addEventListener('pointercancel', end);
    }
    _fit() {
      const w = Math.max(280, this.cv.parentElement.clientWidth || 600);
      let hh = Math.min(this.o.maxH, w * this.o.aspect);
      const dpr = window.devicePixelRatio || 1;
      this.W = w; this.H = hh;
      this.cv.width = w * dpr; this.cv.height = hh * dpr; this.cv.style.height = hh + 'px';
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // equal scaling: expand range to keep aspect
      const o = this.o; this.xmin = o.xmin; this.xmax = o.xmax; this.ymin = o.ymin; this.ymax = o.ymax;
      if (o.equal) {
        const sx = w / (o.xmax - o.xmin), sy = hh / (o.ymax - o.ymin);
        if (sx > sy) { const ex = (w / sy - (o.xmax - o.xmin)) / 2; this.xmin -= ex; this.xmax += ex; }
        else { const ey = (hh / sx - (o.ymax - o.ymin)) / 2; this.ymin -= ey; this.ymax += ey; }
      }
    }
    setRange(r) { Object.assign(this.o, r); this._fit(); this.redraw(); }
    X(x) { return (x - this.xmin) / (this.xmax - this.xmin) * this.W; }
    Y(y) { return this.H - (y - this.ymin) / (this.ymax - this.ymin) * this.H; }
    ix(px) { return this.xmin + px / this.W * (this.xmax - this.xmin); }
    iy(py) { return this.ymin + (this.H - py) / this.H * (this.ymax - this.ymin); }
    S(d) { return d / (this.xmax - this.xmin) * this.W; } // length to px
    clear() { const c = this.ctx; c.clearRect(0, 0, this.W, this.H); }
    grid() {
      const c = this.ctx, g = this.o.grid; if (!g) return;
      c.lineWidth = 1; c.strokeStyle = G9.C.grid;
      for (let x = Math.ceil(this.xmin / g) * g; x <= this.xmax; x += g) { c.beginPath(); c.moveTo(this.X(x), 0); c.lineTo(this.X(x), this.H); c.stroke(); }
      for (let y = Math.ceil(this.ymin / g) * g; y <= this.ymax; y += g) { c.beginPath(); c.moveTo(0, this.Y(y)); c.lineTo(this.W, this.Y(y)); c.stroke(); }
    }
    axes() {
      if (!this.o.axes) return;
      const c = this.ctx; c.strokeStyle = G9.C.axis; c.lineWidth = 2;
      c.beginPath(); c.moveTo(0, this.Y(0)); c.lineTo(this.W, this.Y(0)); c.moveTo(this.X(0), 0); c.lineTo(this.X(0), this.H); c.stroke();
      if (!this.o.labels) return;
      c.fillStyle = G9.C.axis; c.font = '12px Segoe UI, Arial'; c.textAlign = 'center'; c.textBaseline = 'top';
      const step = this.o.labelStep || Math.max(1, Math.round((this.xmax - this.xmin) / 16));
      for (let x = Math.ceil(this.xmin / step) * step; x <= this.xmax; x += step) if (Math.abs(x) > 1e-9) c.fillText(G9.num(x), this.X(x), this.Y(0) + 4);
      c.textAlign = 'right'; c.textBaseline = 'middle';
      for (let y = Math.ceil(this.ymin / step) * step; y <= this.ymax; y += step) if (Math.abs(y) > 1e-9) c.fillText(G9.num(y), this.X(0) - 5, this.Y(y));
      c.font = 'italic 15px Cambria, serif'; c.textAlign = 'right'; c.fillText('x', this.W - 6, this.Y(0) - 12); c.textAlign = 'left'; c.fillText('y', this.X(0) + 8, 12);
    }
    base() { this.clear(); this.grid(); this.axes(); }
    line(x1, y1, x2, y2, s = {}) {
      const c = this.ctx; c.save(); c.strokeStyle = s.color || G9.C.blue; c.lineWidth = s.w || 3; if (s.dash) c.setLineDash(s.dash);
      c.beginPath(); c.moveTo(this.X(x1), this.Y(y1)); c.lineTo(this.X(x2), this.Y(y2)); c.stroke(); c.restore();
    }
    arrow(x1, y1, x2, y2, s = {}) {
      this.line(x1, y1, x2, y2, s); const c = this.ctx; const a = Math.atan2(this.Y(y2) - this.Y(y1), this.X(x2) - this.X(x1));
      c.save(); c.fillStyle = s.color || G9.C.blue; c.beginPath(); c.moveTo(this.X(x2), this.Y(y2));
      c.lineTo(this.X(x2) - 12 * Math.cos(a - 0.4), this.Y(y2) - 12 * Math.sin(a - 0.4)); c.lineTo(this.X(x2) - 12 * Math.cos(a + 0.4), this.Y(y2) - 12 * Math.sin(a + 0.4)); c.fill(); c.restore();
    }
    infLine(a, b, cc, s = {}) { // ax + by = c over the view
      if (Math.abs(b) > 1e-9) this.line(this.xmin, (cc - a * this.xmin) / b, this.xmax, (cc - a * this.xmax) / b, s);
      else if (Math.abs(a) > 1e-9) this.line(cc / a, this.ymin, cc / a, this.ymax, s);
    }
    fn(f, s = {}) {
      const c = this.ctx; c.save(); c.strokeStyle = s.color || G9.C.blue; c.lineWidth = s.w || 3; c.beginPath(); let st = false;
      for (let px = 0; px <= this.W; px += 2) { const x = this.ix(px), y = f(x); if (!isFinite(y)) { st = false; continue; } const py = this.Y(y); if (!st) { c.moveTo(px, py); st = true; } else c.lineTo(px, py); }
      c.stroke(); c.restore();
    }
    circle(x, y, r, s = {}) {
      const c = this.ctx; c.save(); c.beginPath(); c.arc(this.X(x), this.Y(y), this.S(r), 0, 2 * Math.PI);
      if (s.fill) { c.fillStyle = s.fill; c.fill(); }
      if (s.color !== 'none') { c.strokeStyle = s.color || G9.C.blue; c.lineWidth = s.w || 3; if (s.dash) c.setLineDash(s.dash); c.stroke(); }
      c.restore();
    }
    arc(x, y, r, a1, a2, s = {}) { // angles in radians, maths orientation
      const c = this.ctx; c.save(); c.beginPath(); c.arc(this.X(x), this.Y(y), this.S(r), -a1, -a2, true);
      if (s.sector) { c.lineTo(this.X(x), this.Y(y)); c.closePath(); }
      if (s.fill) { c.fillStyle = s.fill; c.fill(); }
      c.strokeStyle = s.color || G9.C.orange; c.lineWidth = s.w || 2.5; c.stroke(); c.restore();
    }
    poly(P, s = {}) {
      const c = this.ctx; c.save(); c.beginPath(); P.forEach(([x, y], i) => i ? c.lineTo(this.X(x), this.Y(y)) : c.moveTo(this.X(x), this.Y(y)));
      if (s.close !== false) c.closePath();
      if (s.fill) { c.fillStyle = s.fill; c.fill(); }
      if (s.color !== 'none') { c.strokeStyle = s.color || G9.C.blue; c.lineWidth = s.w || 3; if (s.dash) c.setLineDash(s.dash); c.stroke(); }
      c.restore();
    }
    rect(x, y, w, hh, s = {}) { this.poly([[x, y], [x + w, y], [x + w, y + hh], [x, y + hh]], s); }
    dot(x, y, s = {}) {
      const c = this.ctx; c.save(); c.beginPath(); c.arc(this.X(x), this.Y(y), s.r || 6, 0, 2 * Math.PI);
      c.fillStyle = s.color || G9.C.orange; c.fill(); c.lineWidth = 2; c.strokeStyle = '#fff'; c.stroke();
      if (s.label) { c.fillStyle = s.lc || G9.C.ink; c.font = (s.font || 'bold 15px') + ' Segoe UI, Arial'; c.textAlign = 'left'; c.textBaseline = 'bottom'; c.fillText(s.label, this.X(x) + (s.dx ?? 8), this.Y(y) - (s.dy ?? 6)); }
      c.restore();
    }
    text(x, y, str, s = {}) {
      const c = this.ctx; c.save(); c.fillStyle = s.color || G9.C.ink; c.font = (s.font || '15px') + ' Segoe UI, Arial';
      c.textAlign = s.align || 'center'; c.textBaseline = s.base || 'middle'; c.fillText(str, this.X(x), this.Y(y)); c.restore();
    }
    ptext(px, py, str, s = {}) { // pixel text
      const c = this.ctx; c.save(); c.fillStyle = s.color || G9.C.ink; c.font = (s.font || '15px') + ' Segoe UI, Arial';
      c.textAlign = s.align || 'left'; c.textBaseline = s.base || 'top'; c.fillText(str, px, py); c.restore();
    }
    addPt(x, y, o = {}) { const p = Object.assign({ x, y, snap: 0 }, o); this.pts.push(p); return p; }
    drawPts() { this.pts.forEach(p => { if (!p.hidden) this.dot(p.x, p.y, { color: p.color || G9.C.orange, label: p.label, r: p.fixed ? 5 : 8 }); }); }
    redraw() { if (this.onDraw) this.onDraw(); }
  }
  G9.Board = Board;

  /* ================= Animation controller ================= */
  class Anim {
    constructor(n, draw, o = {}) { this.n = n; this.i = 0; this.draw = draw; this.ms = o.ms || 900; this.t = null; this.loop = !!o.loop; this.onState = null; }
    _set() { if (this.onState) this.onState(this); }
    step() { if (this.i < this.n - 1) this.i++; else if (this.loop) this.i = 0; else { this.pause(); return; } this.draw(this.i); this._set(); }
    play() { if (this.t) return; if (this.i >= this.n - 1 && !this.loop) { this.i = 0; this.draw(0); } this.t = setInterval(() => this.step(), this.ms); this._set(); }
    pause() { clearInterval(this.t); this.t = null; this._set(); }
    reset() { this.pause(); this.i = 0; this.draw(0); this._set(); }
    get playing() { return !!this.t; }
  }
  G9.Anim = Anim;

  /* ================= small UI kit for explore widgets ================= */
  const K = {
    Board, Anim, h,
    row(parent) { const d = h('div', { cls: 'ctrl' }); parent.appendChild(d); return d; },
    slider(parent, label, min, max, step, val, fn) {
      const l = h('label', {}, `${label} <input type="range" min="${min}" max="${max}" step="${step}" value="${val}"><b></b>`);
      const inp = l.querySelector('input'), b = l.querySelector('b');
      const upd = () => { b.textContent = G9.num(+inp.value, 3); fn(+inp.value); };
      inp.addEventListener('input', upd); parent.appendChild(l); b.textContent = G9.num(val, 3);
      return { el: inp, get v() { return +inp.value; }, set(v) { inp.value = v; b.textContent = G9.num(+v, 3); } };
    },
    button(parent, label, fn, cls = 'btn ghost') { const b = h('button', { cls }, label); b.addEventListener('click', fn); parent.appendChild(b); return b; },
    select(parent, label, opts, fn) {
      const l = h('label', {}, label + ' '); const s = h('select');
      opts.forEach((o, i) => s.appendChild(h('option', { value: i }, o)));
      s.addEventListener('change', () => fn(+s.value)); l.appendChild(s); parent.appendChild(l); return s;
    },
    check(parent, label, val, fn) { const l = h('label', {}, `<input type="checkbox" ${val ? 'checked' : ''}> ${label}`); const c = l.querySelector('input'); c.addEventListener('change', () => fn(c.checked)); parent.appendChild(l); return c; },
    read(parent) { const d = h('div', { cls: 'read' }); parent.appendChild(d); return d; },
    note(parent) { const d = h('div', { cls: 'stepnote' }); parent.appendChild(d); return d; },
    // attach play/step/pause bar to an Anim
    anim(parent, anim) {
      const bar = h('div', { cls: 'anbar' });
      const bp = K.button(bar, '▶ Play <kbd>P</kbd>', () => anim.play(), 'btn');
      K.button(bar, '⏭ Step <kbd>S</kbd>', () => { anim.pause(); anim.step(); });
      K.button(bar, '⏸ Pause <kbd>X</kbd>', () => anim.pause());
      K.button(bar, '↺ Reset', () => anim.reset());
      const lab = h('span', { cls: 'muted' }); bar.appendChild(lab);
      anim.onState = (a) => { lab.textContent = isFinite(a.n) ? `step ${a.i + 1} / ${a.n}` : `step ${a.i + 1}`; bp.disabled = a.playing; };
      parent.appendChild(bar); anim.onState(anim);
      return bar;
    }
  };
  G9.K = K;

  /* ================= old -> new syllabus map ================= */
  const OLDMAP = () => CFG.oldMap || [];

  /* ================= state + routing ================= */
  const S = { ch: null, tab: 'revise', active: null };
  G9.S = S;
  const TABS = [['revise', 'Revise'], ['explore', 'Explore'], ['practice', 'Practice'], ['check', 'Check'], ['teach', 'Teach']];
  const $ = (s) => document.querySelector(s);

  function parseHash() {
    const p = (location.hash || '#/home').slice(2).split('/');
    if (p[0] === 'ch') return { view: 'ch', no: +p[1], tab: p[2] || 'revise' };
    return { view: p[0] || 'home' };
  }
  G9.go = (hash) => { if (location.hash === hash) route(); else location.hash = hash; };

  function buildShell() {
    document.body.innerHTML = '';
    const app = h('div', { id: 'app' });
    app.innerHTML = `
      <div id="top">
        <button class="tbtn" id="bSide" title="Show/hide chapter list (M)">☰ <kbd>M</kbd></button>
        <div class="brand">${CFG.short} <small>${CFG.brandSmall}</small></div>
        <div class="crumb" id="crumb"></div>
        <button class="tbtn" id="bPresent" title="Present this chapter's slides">🎓 Present</button>
        <button class="tbtn" id="bTheme" title="Light/dark theme">Dark/Light</button>
        <button class="tbtn" id="bFull" title="Full screen (F)">Full screen <kbd>F</kbd></button>
        <button class="tbtn" id="bHelp" title="Help (?)">?</button>
      </div>
      <div id="body"><nav id="side"></nav><main id="main"><div class="wrap" id="view"></div></main></div>`;
    document.body.appendChild(app);
    document.body.appendChild(h('div', { id: 'printArea' }));
    document.body.appendChild(h('div', { id: 'present' }));
    const help = h('div', { id: 'help' });
    help.innerHTML = `<div class="card"><h2>Keyboard</h2>
      <table class="t"><tr><th>Key</th><th>Action</th></tr>
      <tr><td><kbd>M</kbd></td><td>Hide / show the chapter sidebar</td></tr>
      <tr><td><kbd>P</kbd></td><td>Play the active animation (Explore) or auto-advance slides</td></tr>
      <tr><td><kbd>S</kbd></td><td>Next step — one step per press</td></tr>
      <tr><td><kbd>X</kbd></td><td>Pause</td></tr>
      <tr><td><kbd>F</kbd></td><td>Full screen</td></tr>
      <tr><td><kbd>1</kbd>–<kbd>5</kbd></td><td>Revise · Explore · Practice · Check · Teach</td></tr>
      <tr><td><kbd>←</kbd> <kbd>→</kbd></td><td>Previous / next chapter (slides: previous / next)</td></tr>
      <tr><td><kbd>Esc</kbd></td><td>Close slides or this help</td></tr></table>
      <p class="muted">In Explore, click a panel to make it the active one (orange border); the keys drive that panel.</p>
      <button class="btn" onclick="document.getElementById('help').classList.remove('on')">Close</button></div>`;
    document.body.appendChild(help);
    $('#bSide').onclick = () => document.body.classList.toggle('noside');
    $('#bTheme').onclick = () => { document.body.classList.toggle('dark'); store.set('dark', document.body.classList.contains('dark')); darkFix(); route(); };
    $('#bFull').onclick = toggleFull;
    $('#bHelp').onclick = () => $('#help').classList.add('on');
    $('#bPresent').onclick = () => { if (S.ch) present(S.ch); else G9.go('#/home'); };
    if (store.get('dark', false)) { document.body.classList.add('dark'); }
    darkFix();
    buildSide();
  }
  function toggleFull() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen && document.documentElement.requestFullscreen().catch(() => {});
    else document.exitFullscreen && document.exitFullscreen();
  }
  function buildSide() {
    const s = $('#side'); let html = `<a href="#/home" data-k="home"><span class="n">⌂</span>Home</a>
      ${CFG.oldMap ? '<a href="#/map" data-k="map"><span class="n">⇄</span>Old book → New book map</a>' : ''}
      <a href="#/sheets" data-k="sheets"><span class="n">✎</span>Worksheet maker (mixed)</a>
      <a href="formulas.html#all" target="_blank"><span class="n">∑</span>One-page formula sheets</a>`;
    let lastPart = null;
    G9.chapters.forEach(c => {
      if (c.part !== lastPart) { html += `<h4>${c.part}</h4>`; lastPart = c.part; }
      html += `<a href="#/ch/${c.no}/${S.tab}" data-k="ch${c.no}"><span class="n">${c.no}</span>${c.short || c.title}</a>`;
    });
    s.innerHTML = html;
  }
  function markSide(k) { document.querySelectorAll('#side a').forEach(a => a.classList.toggle('on', a.dataset.k === k)); }

  function route() {
    const r = parseHash(); const v = $('#view'); stopActive();
    v.innerHTML = '';
    if (r.view === 'ch') {
      const c = G9.chapters.find(x => x.no === r.no); if (!c) { G9.go('#/home'); return; }
      S.ch = c; S.tab = TABS.some(t => t[0] === r.tab) ? r.tab : 'revise';
      markSide('ch' + c.no); renderChapter(c, v);
      document.querySelectorAll('#side a[data-k^="ch"]').forEach(a => { a.href = `#/ch/${a.dataset.k.slice(2)}/${S.tab}`; });
      $('#crumb').textContent = `${c.part} · Chapter ${c.no} · ${c.title}`;
    } else {
      S.ch = null; markSide(r.view);
      if (r.view === 'map') renderMap(v); else if (r.view === 'sheets') renderSheetsPage(v); else renderHome(v);
      $('#crumb').textContent = r.view === 'map' ? 'Old book → New book' : r.view === 'sheets' ? 'Worksheet maker' : 'Home';
    }
    $('#main').scrollTop = 0;
  }
  function stopActive() { if (S.active && S.active.pause) S.active.pause(); S.active = null; }

  /* ================= home + map ================= */
  function renderHome(v) {
    const best = (no) => { const b = store.get('best' + no, null); return b ? `<span class="pill">Quiz best ${b}</span>` : ''; };
    const parts = []; G9.chapters.forEach(c => { let g = parts.find(p => p.name === c.part); if (!g) parts.push(g = { name: c.part, cards: '' });
      g.cards += `<div class="chcard ${parts.indexOf(g) % 2 ? 'p2' : ''}" onclick="G9.go('#/ch/${c.no}/revise')"><div class="no2">CHAPTER ${c.no}</div><h3>${c.title}</h3><div class="muted" style="font-size:14px">${c.blurb}</div><div style="margin-top:6px">${best(c.no)}</div></div>`; });
    v.innerHTML = `<div class="hero"><h1>${CFG.heroTitle}</h1>
      <div>A revision supplement for students and a teaching kit for class teachers. Every chapter has five tabs:
      <b>Revise</b> (one-page summary) · <b>Explore</b> (interactive figures) · <b>Practice</b> (fresh numbers every time) · <b>Check</b> (10-question quiz) · <b>Teach</b> (lesson plan + slides).</div>
      <div style="margin-top:10px;opacity:.9">Works fully offline. Use alongside ${CFG.book} — not a replacement for it.${CFG.homeNote ? ' ' + CFG.homeNote : ''}</div></div>
      ${parts.map((g, i) => `<h2${i ? ' style="margin-top:22px"' : ''}>${g.name}</h2><div class="chgrid">${g.cards}</div>`).join('')}
      <div class="grid2" style="margin-top:22px">
        <div class="card"><h2>For students</h2><ol>
          <li>Read <b>Revise</b> before and after the class.</li>
          <li>Play with <b>Explore</b> — drag points, move sliders, press <kbd>S</kbd> to step through.</li>
          <li>Do 5–10 questions in <b>Practice</b>. Every "New question" has new numbers.</li>
          <li>Take the <b>Check</b> quiz; aim for 8/10 before moving on.</li></ol></div>
        <div class="card"><h2>For teachers</h2><ol>
          <li><b>Teach</b> has a period-wise lesson plan, misconceptions and board activities.</li>
          <li><b>🎓 Present</b> shows the chapter slides full screen (<kbd>S</kbd> reveals one point at a time). PowerPoint copies are in the <code>ppt</code> folder.</li>
          <li><b>Practice → Worksheet</b> prints a class set: every roll number gets different numbers, with one combined answer key.</li>
          <li>Each sheet carries a <b>code</b>; type it back in to regenerate exactly the same sheet.</li></ol></div>
      </div>
      <p><a class="btn o" style="text-decoration:none" href="formulas.html#all" target="_blank">∑ One-page formula sheets — all ${G9.chapters.length} chapters</a></p>
      <p class="muted">${CFG.oldMap ? 'Not sure where an old-syllabus chapter went? See <a href="#/map">Old book → New book map</a>. ' : ''}Press <kbd>?</kbd> for keyboard shortcuts.</p>`;
  }
  function renderMap(v) {
    v.innerHTML = `<div class="chhead"><h1>Old book → New book</h1></div>
      <p class="muted">${CFG.oldMapIntro}</p>
      <div class="card"><table class="t"><tr><th>Earlier NCERT chapter</th><th>Where it is now</th><th>Notes</th></tr>
      ${OLDMAP().map(r => `<tr><td>${r[0]}</td><td><b>${r[1]}</b></td><td>${r[2]}</td></tr>`).join('')}</table></div>`;
  }

  /* ================= chapter page ================= */
  function renderChapter(c, v) {
    const head = h('div', { cls: 'chhead' }, `<h1>${c.no}. ${c.title}</h1><span class="tag">${c.part}</span>`);
    const tabs = h('div', { cls: 'tabs' });
    TABS.forEach(([k, n], i) => {
      const b = h('button', { cls: k === S.tab ? 'on' : '' }, `${n} <kbd>${i + 1}</kbd>`);
      b.onclick = () => G9.go(`#/ch/${c.no}/${k}`); tabs.appendChild(b);
    });
    const body = h('div');
    v.append(head, tabs, body);
    ({ revise: renderRevise, explore: renderExplore, practice: renderPractice, check: renderCheck, teach: renderTeach })[S.tab](c, body);
  }

  function renderRevise(c, el) {
    const R = c.revise;
    let html = `<div class="box"><b>In one line:</b> ${R.oneLine}</div>
      <div class="ctrl"><a class="btn o" style="text-decoration:none" href="formulas.html#${c.no}" target="_blank">∑ One-page formula sheet (print / PDF)</a></div><div class="grid2"><div>`;
    R.sections.forEach(s => { html += `<div class="card"><h2>${s.h}</h2>${s.html}</div>`; });
    html += `</div><div>`;
    if (R.formulas && R.formulas.length) html += `<div class="card"><h2>Key results &amp; formulas</h2><div class="formula">${R.formulas.map(f => `<div class="fn">${f[0]}</div><div class="fx">${f[1]}</div>`).join('')}</div></div>`;
    if (R.terms) html += `<div class="card"><h2>Key terms</h2><table class="t">${R.terms.map(t => `<tr><td><b>${t[0]}</b></td><td>${t[1]}</td></tr>`).join('')}</table></div>`;
    if (R.traps) html += `<div class="card"><h2>Common mistakes</h2>${R.traps.map(t => `<div class="box o">${t}</div>`).join('')}</div>`;
    if (R.board) html += `<div class="card"><h2>${CFG.boardTitle || 'Board exam focus'}</h2>${R.board}</div>`;
    if (R.bridge) html += `<div class="card"><h2>Connections</h2>${R.bridge}</div>`;
    html += `</div></div>`;
    el.innerHTML = html;
  }

  function renderExplore(c, el) {
    if (!c.explore || !c.explore.length) { el.innerHTML = '<p class="muted">No interactive panels yet.</p>'; return; }
    c.explore.forEach((w, i) => {
      const card = h('div', { cls: 'card wid' });
      card.innerHTML = `<h2>${i + 1}. ${w.title}</h2><p class="muted" style="margin-top:0">${w.intro}</p>`;
      const box = h('div'); card.appendChild(box); el.appendChild(card);
      let ctl = null;
      try { ctl = w.build(box, K) || null; } catch (e) { box.innerHTML = '<p class="no">Panel failed to load: ' + e.message + '</p>'; console.error(e); }
      card.addEventListener('pointerdown', () => setActive(card, ctl));
      if (i === 0) setActive(card, ctl);
    });
  }
  function setActive(card, ctl) {
    document.querySelectorAll('.wid.active').forEach(x => x.classList.remove('active'));
    card.classList.add('active'); if (S.active && S.active !== ctl && S.active.pause) S.active.pause(); S.active = ctl;
  }

  /* ---------------- practice: online + worksheet ---------------- */
  const LEVELS = ['Easy', 'Standard', 'HOTS'];
  function renderPractice(c, el) {
    el.innerHTML = `<div class="card" id="pOnline"></div>
      <details class="card" id="pSheetBox" style="margin-top:14px"><summary style="cursor:pointer;font-weight:700;font-size:1.05em">🖨 Printable worksheet &amp; answer key (PDF) — for teachers and home practice</summary><div id="pSheet" style="margin-top:10px"></div></details>`;
    practiceOnline(c, el.querySelector('#pOnline'));
    const det = el.querySelector('#pSheetBox'); let built = false;
    det.addEventListener('toggle', () => { if (det.open && !built) { built = true; worksheetPanel([c.no], el.querySelector('#pSheet'), true); } });
  }
  // answer options for questions without a numeric answer: the right answer plus up to 3 different
  // answers made by the same question type with other seeds (or the generator's own Q.opts)
  function practiceOptions(g, Q, lvl, seed) {
    const plain = x => String(x).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    const key = plain(Q.a); const seen = new Set([key]); const wrong = [];
    (Q.opts || []).forEach(o => { const k = plain(o); if (!seen.has(k) && wrong.length < 3) { seen.add(k); wrong.push(G9.fixMinus(o)); } });
    const isNum = x => /^[−\-]?[\d.,\/ ]+$/.test(x); const kind = isNum(key); const near = [], far = [];
    for (let i = 1; i <= 60 && near.length + wrong.length < 3; i++) {
      let Q2; try { Q2 = g.gen(G9.rng(seed + i * 7919), lvl); } catch (e) { continue; }
      if (!Q2 || Q2.a == null) continue;
      const k = plain(G9.fixMinus(Q2.a)); if (!k || seen.has(k)) continue;
      seen.add(k); (isNum(k) === kind ? near : far).push(G9.fixMinus(Q2.a));   // same kind of answer first (word with words, number with numbers)
    }
    near.concat(far).forEach(t => { if (wrong.length < 3) wrong.push(t); });
    if (!wrong.length) return null;
    return G9.rng(seed + 17).shuffle([{ t: Q.a, ok: true }].concat(wrong.map(t => ({ t, ok: false }))));
  }
  function practiceOnline(c, box) {
    box.innerHTML = `<h2>Practise on screen</h2>`;
    const row = K.row(box);
    let gi = -1, lvl = 2, seed = G9.newSeed(), done = 0, right = 0;
    K.select(row, 'Topic', ['All topics (mixed)'].concat(c.gens.map(g => g.title)), (i) => { gi = i - 1; next(); });
    const ls = K.select(row, 'Level', LEVELS, (i) => { lvl = i + 1; next(); }); ls.value = 1;
    const area = h('div'); box.appendChild(area);
    const row2 = K.row(box);
    K.button(row2, 'Next question ⟳', () => { seed = G9.newSeed(); next(); }, 'btn');
    K.button(row2, 'Show answer & steps', () => { ansDiv.style.display = 'block'; });
    const tally = h('span', { cls: 'pill p' }); row2.appendChild(tally);
    const sl = h('span', { cls: 'muted' }); row2.appendChild(sl);
    let ansDiv;
    const score = ok => { done++; if (ok) right++; tally.textContent = `Score ${right} / ${done}`; };
    tally.textContent = 'Score 0 / 0';
    function next() {
      const R = G9.rng(seed);
      const gens = c.gens.filter(g => !g.levels || g.levels.includes(lvl));
      const g = gi >= 0 ? c.gens[gi] : R.pick(gens.length ? gens : c.gens);
      const Q = g.gen(R, lvl); ['q', 'a', 's'].forEach(k => { Q[k] = G9.fixMinus(Q[k]); });
      sl.textContent = `question code ${c.no}-${lvl}-${seed}`;
      area.innerHTML = `<div class="pill p">${g.title}</div><div class="q">${Q.q}</div>`;
      let marked = false;
      if (Q.ans != null) {
        const r = h('div', { cls: 'ctrl' }, `<label>Your answer <input type="text" size="12" inputmode="decimal" placeholder="type a number"></label>`);
        const inp = r.querySelector('input'); const fb = h('span');
        K.button(r, 'Check', () => {
          const v = parseAns(inp.value); const tol = Q.tol ?? 0.011 * Math.max(1, Math.abs(Q.ans));
          if (v == null) { fb.innerHTML = '<span class="no">Type a number</span>'; return; }
          const ok = Math.abs(v - Q.ans) <= tol;
          fb.innerHTML = ok ? '<span class="ok">✔ Correct!</span>' : '<span class="no">✘ Not yet — try again or see steps</span>';
          if (!marked) { marked = true; score(ok); }
        }, 'btn o');
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') r.querySelector('.btn').click(); });
        r.appendChild(fb); area.appendChild(r);
        setTimeout(() => inp.focus(), 0);
      } else {
        const opts = practiceOptions(g, Q, lvl, seed);
        const wrap = h('div'); wrap.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:8px;margin:10px 0';
        const fb = h('div', { style: 'min-height:1.4em' });
        if (opts) {
          area.appendChild(h('div', { cls: 'muted' }, 'Choose the right answer:'));
          opts.forEach((o, i) => {
            const b = h('button', { cls: 'btn ghost', style: 'text-align:left;white-space:normal;height:auto;padding:10px 12px' }, `<b>${'ABCD'[i]}.</b> ${o.t}`);
            b.onclick = () => {
              if (marked) return; marked = true; score(o.ok);
              wrap.querySelectorAll('button').forEach((x, j) => { if (opts[j].ok) { x.style.outline = '3px solid var(--blue,#1d4ed8)'; x.style.background = 'rgba(29,78,216,.10)'; } });
              if (!o.ok) { b.style.outline = '3px solid var(--orange,#ea580c)'; b.style.background = 'rgba(234,88,12,.10)'; }
              fb.innerHTML = o.ok ? '<span class="ok">✔ Correct!</span>' : `<span class="no">✘ Not this one — the right answer is outlined in blue.</span>`;
              ansDiv.style.display = 'block';
            };
            wrap.appendChild(b);
          });
          area.appendChild(wrap); area.appendChild(fb);
        } else {
          // no different answers to offer: think first, then reveal and mark yourself
          const r = h('div', { cls: 'ctrl' }, '<span class="muted">Work it out, then tap “Show answer & steps” and mark yourself:</span>');
          K.button(r, '✔ I got it', () => { if (!marked) { marked = true; score(true); } ansDiv.style.display = 'block'; }, 'btn o');
          K.button(r, '✘ Not yet', () => { if (!marked) { marked = true; score(false); } ansDiv.style.display = 'block'; }, 'btn ghost');
          area.appendChild(r);
        }
      }
      ansDiv = h('div', { cls: 'ans' }, `<b>Answer:</b> ${Q.a}${Q.s ? `<div style="margin-top:6px"><b>Steps:</b><br>${Q.s}</div>` : ''}`);
      ansDiv.style.display = 'none'; area.appendChild(ansDiv);
    }
    next();
  }
  function parseAns(s) {
    s = String(s).trim().replace('−', '-').replace(/\s/g, ''); if (!s) return null;
    if (/^-?\d+(\.\d+)?\/-?\d+(\.\d+)?$/.test(s)) { const [a, b] = s.split('/').map(Number); return b ? a / b : null; }
    const v = Number(s); return isFinite(v) ? v : null;
  }
  G9.parseAns = parseAns;

  function renderSheetsPage(v) {
    v.innerHTML = `<div class="chhead"><h1>Worksheet maker — mixed chapters</h1></div>
      <p class="muted">Tick chapters for a unit test or revision sheet. Each roll number gets its own numbers; one answer key covers the whole class.</p>`;
    const card = h('div', { cls: 'card' }); v.appendChild(card);
    worksheetPanel([1], card, false);
  }

  // code format: C1.4.7-L2-N10-S12345
  function sheetCode(chs, lvl, n, seed) { return `C${chs.join('.')}-L${lvl}-N${n}-S${seed}`; }
  function parseCode(code) {
    const m = String(code).trim().toUpperCase().match(/^C([\d.]+)-L([123])-N(\d+)-S(\d+)$/);
    if (!m) return null; return { chs: m[1].split('.').map(Number).filter(x => G9.chapters.some(c => c.no === x)), lvl: +m[2], n: +m[3], seed: +m[4] };
  }
  G9.makeSheet = function (chs, lvl, n, seed) {
    const R = G9.rng(seed); const pool = [];
    chs.forEach(no => { const c = G9.chapters.find(x => x.no === no); if (!c) return; c.gens.forEach(g => { if (!g.levels || g.levels.includes(lvl)) pool.push({ c, g }); }); });
    if (!pool.length) return [];
    let order = R.shuffle(pool); const out = [];
    for (let i = 0; i < n; i++) { if (i && i % order.length === 0) order = R.shuffle(pool); const { c, g } = order[i % order.length]; const Q = g.gen(R, lvl); ['q', 'a', 's'].forEach(k => { Q[k] = G9.fixMinus(Q[k]); }); out.push(Object.assign({ ch: c.no, topic: g.title }, Q)); }
    return out;
  };
  function worksheetPanel(defaultChs, box, single) {
    box.innerHTML = `<h2>Printable worksheet${single ? '' : 's'}</h2>
      <p class="muted" style="margin-top:0">Same settings + same seed = same sheet. For a class set, each roll number uses seed + roll.</p>`;
    const chBox = h('div', { cls: 'ctrl' });
    if (!single) {
      G9.chapters.forEach(c => { const l = h('label', {}, `<input type="checkbox" value="${c.no}" ${defaultChs.includes(c.no) ? 'checked' : ''}> ${c.no}`); chBox.appendChild(l); });
      box.appendChild(chBox);
    }
    const r1 = K.row(box);
    const lvlSel = K.select(r1, 'Level', LEVELS, () => {}); lvlSel.value = 1;
    r1.appendChild(h('label', {}, `Questions <input type="number" id="wsN" min="4" max="30" value="10">`));
    r1.appendChild(h('label', {}, `Seed <input type="number" id="wsSeed" value="${G9.newSeed()}">`));
    K.button(r1, '🎲', () => { r1.querySelector('#wsSeed').value = G9.newSeed(); });
    const r2 = K.row(box);
    r2.appendChild(h('label', {}, `Class set: roll <input type="number" id="wsFrom" min="1" value="1"> to <input type="number" id="wsTo" min="1" value="1">`));
    r2.appendChild(h('label', {}, `School/heading <input type="text" id="wsSchool" size="22" placeholder="optional">`));
    const r3 = K.row(box);
    r3.appendChild(h('label', {}, `Or load a sheet code <input type="text" id="wsCode" size="22" placeholder="C4-L2-N10-S12345">`));
    K.button(r3, 'Load', () => {
      const p = parseCode(box.querySelector('#wsCode').value); if (!p || !p.chs.length) { alert('Code not recognised'); return; }
      lvlSel.value = p.lvl - 1; box.querySelector('#wsN').value = p.n; box.querySelector('#wsSeed').value = p.seed; box.querySelector('#wsFrom').value = 1; box.querySelector('#wsTo').value = 1;
      if (!single) chBox.querySelectorAll('input').forEach(i => { i.checked = p.chs.includes(+i.value); });
      build(p.chs);
    });
    const r4 = K.row(box);
    K.button(r4, 'Preview', () => build(), 'btn');
    K.button(r4, '🖨 Print sheets', () => { build(); doPrint('sheets'); }, 'btn o');
    K.button(r4, '🖨 Print answer key', () => { build(); doPrint('key'); }, 'btn ghost');
    const prev = h('div', { style: 'max-height:520px;overflow:auto;margin-top:10px;border:1px solid var(--line);border-radius:8px;padding:10px;background:#eef1f7' });
    box.appendChild(prev);
    let built = { sheets: '', key: '' };
    function build(forceChs) {
      const chs = forceChs || (single ? defaultChs : [...chBox.querySelectorAll('input:checked')].map(i => +i.value));
      if (!chs.length) { prev.innerHTML = '<p>Tick at least one chapter.</p>'; return; }
      const lvl = +lvlSel.value + 1, n = Math.max(1, Math.min(40, +box.querySelector('#wsN').value || 10));
      const seed0 = +box.querySelector('#wsSeed').value || 1;
      const from = Math.max(1, +box.querySelector('#wsFrom').value || 1), to = Math.max(from, Math.min(from + 79, +box.querySelector('#wsTo').value || from));
      const school = box.querySelector('#wsSchool').value || '';
      const title = chs.length === 1 ? `Chapter ${chs[0]}: ${G9.chapters.find(c => c.no === chs[0]).title}` : `Chapters ${chs.join(', ')}`;
      const space = lvl === 3 ? 5 : lvl === 2 ? 4 : 3;
      let sheets = '', key = '';
      for (let roll = from; roll <= to; roll++) {
        const seed = seed0 + (roll - from); const code = sheetCode(chs, lvl, n, seed); const Qs = G9.makeSheet(chs, lvl, n, seed);
        sheets += `<div class="sheet"><span class="code">${code}</span><h2>${school ? school + ' — ' : ''}Class ${CFG.roman} Mathematics</h2>
          <div><b>${title}</b> · Worksheet (${LEVELS[lvl - 1]})</div>
          <div class="hd"><div>Name: ______________________</div><div>Roll no: ${to > from ? roll : '______'}</div><div>Date: __________</div></div>
          ${Qs.map((q, i) => `<div class="sq"><b>Q${i + 1}.</b> ${q.q}${'<div class="sp"></div>'.repeat(space)}</div>`).join('')}</div>`;
        key += `<div class="keyblock"><h3 style="margin:8px 0 4px">${to > from ? 'Roll ' + roll + ' — ' : ''}${code}</h3>
          ${Qs.map((q, i) => `<div class="keyq"><b>Q${i + 1}.</b> ${q.a}${q.s ? ` <span style="color:#555">— ${q.s}</span>` : ''}</div>`).join('')}</div>`;
      }
      built = { sheets, key: `<div class="sheet"><h2>Answer key — ${title} (${LEVELS[lvl - 1]})</h2>${key}</div>` };
      prev.innerHTML = sheets + built.key;
    }
    function doPrint(which) {
      const pa = document.getElementById('printArea'); pa.innerHTML = which === 'key' ? built.key : built.sheets;
      setTimeout(() => window.print(), 50);
    }
    build();
  }

  /* ---------------- check: quiz ---------------- */
  function renderCheck(c, el) {
    const bank = c.quiz || [];
    el.innerHTML = `<div class="card"><h2>Quick check — ${Math.min(10, bank.length)} questions</h2><div id="qz"></div></div>`;
    const qz = el.querySelector('#qz');
    const R = G9.rng(G9.newSeed());
    const qs = R.shuffle(bank).slice(0, 10).map(q => { const idx = R.shuffle(q.o.map((_, i) => i)); return { q: q.q, o: idx.map(i => q.o[i]), a: idx.indexOf(q.a), e: q.e }; });
    let i = 0, score = 0;
    function show() {
      if (i >= qs.length) {
        const prev = store.get('best' + c.no, null); const best = prev ? Math.max(+prev.split('/')[0], score) : score;
        store.set('best' + c.no, `${best}/${qs.length}`);
        qz.innerHTML = `<h3>Score: ${score} / ${qs.length}</h3><p>${score >= 8 ? 'Excellent — move on to the next chapter or try HOTS practice.' : score >= 5 ? 'Good. Re-read the Revise tab for the ones you missed and try again.' : 'Revise the chapter summary and use Explore, then retry.'}</p>`;
        K.button(qz, 'Try a new set', () => renderCheck(c, el), 'btn'); return;
      }
      const q = qs[i]; qz.innerHTML = `<div class="muted">Question ${i + 1} of ${qs.length} · score ${score}</div><div class="q" style="font-size:17px">${q.q}</div>`;
      const fb = h('div');
      q.o.forEach((o, k) => {
        const b = h('button', { cls: 'opt' }, `<b>${'ABCD'[k]}.</b> ${o}`);
        b.onclick = () => {
          if (qz.dataset.done) return; qz.dataset.done = 1;
          const all = qz.querySelectorAll('.opt'); all[q.a].classList.add('right'); if (k !== q.a) b.classList.add('wrong'); else score++;
          fb.innerHTML = `<div class="ans">${q.e}</div>`; const nx = h('div', { cls: 'ctrl' }); K.button(nx, 'Next →', () => { delete qz.dataset.done; i++; show(); }, 'btn'); fb.appendChild(nx);
        };
        qz.appendChild(b);
      });
      qz.appendChild(fb);
    }
    show();
  }

  /* ---------------- teach ---------------- */
  function renderTeach(c, el) {
    const T = c.teach;
    let html = `<div class="ctrl"><button class="btn o" id="tPres">🎓 Present slides full screen</button>
      <a class="btn ghost" style="text-decoration:none" href="ppt/Ch${String(c.no).padStart(2, '0')}_slides.pptx" download>⬇ PowerPoint (.pptx)</a>
      <span class="muted">Slides: ${c.slides.length} · <kbd>S</kbd> reveals one point at a time</span></div>
      <div class="grid2"><div>`;
    html += `<div class="card"><h2>Learning outcomes</h2><ul>${T.outcomes.map(x => `<li>${x}</li>`).join('')}</ul></div>`;
    T.periods.forEach((p, i) => {
      html += `<div class="card"><h2>Period ${i + 1}: ${p.t} <span class="pill">${p.min || 40} min</span></h2><table class="t">${p.flow.map(f => `<tr><td style="width:80px"><b>${f[0]}</b></td><td>${f[1]}</td></tr>`).join('')}</table></div>`;
    });
    html += `</div><div>`;
    html += `<div class="card"><h2>Watch for these misconceptions</h2>${T.misconceptions.map(x => `<div class="box o">${x}</div>`).join('')}</div>`;
    html += `<div class="card"><h2>Board / hands-on activities</h2><ul>${T.activities.map(x => `<li>${x}</li>`).join('')}</ul></div>`;
    html += `<div class="card"><h2>Exit ticket (last 5 minutes)</h2><ol>${T.exit.map(x => `<li>${x}</li>`).join('')}</ol></div>`;
    html += `<div class="card"><h2>Homework</h2><p>Print a class set from <b>Practice → Printable worksheet</b>: Level <b>Standard</b>, 8–10 questions, roll 1 to class strength. Keep the answer key; sheet codes let you regenerate any student's sheet.</p>${T.homework ? `<p>${T.homework}</p>` : ''}</div>`;
    html += `</div></div>`;
    el.innerHTML = html;
    el.querySelector('#tPres').onclick = () => present(c);
  }

  /* ---------------- present (full-screen slides) ---------------- */
  const P = { on: false, c: null, s: 0, b: 0, t: null };
  function present(c) {
    P.on = true; P.c = c; P.s = 0; P.b = 0; stopActive();
    const el = $('#present'); el.classList.add('on');
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
    drawSlide();
  }
  function drawSlide() {
    const c = P.c, sl = c.slides[P.s]; const el = $('#present');
    el.innerHTML = `<div class="slide"><h1>${sl.t}</h1><ul>${sl.b.map((b, i) => `<li class="${i < P.b ? '' : 'hide'}">${b}</li>`).join('')}</ul></div>
      <div class="pbar"><span>Ch ${c.no} · ${c.title}</span><span><kbd>S</kbd>/→ next · ← back · <kbd>P</kbd> auto · <kbd>X</kbd> pause · Esc exit</span><span>${P.s + 1} / ${c.slides.length}</span></div>`;
  }
  function pNext() { const sl = P.c.slides[P.s]; if (P.b < sl.b.length) P.b++; else if (P.s < P.c.slides.length - 1) { P.s++; P.b = 0; } else { pPause(); return; } drawSlide(); }
  function pPrev() { if (P.b > 0) P.b--; else if (P.s > 0) { P.s--; P.b = P.c.slides[P.s].b.length; } drawSlide(); }
  function pPlay() { if (P.t) return; P.t = setInterval(pNext, 2500); }
  function pPause() { clearInterval(P.t); P.t = null; }
  function pClose() { pPause(); P.on = false; $('#present').classList.remove('on'); }

  /* ================= keyboard ================= */
  document.addEventListener('keydown', (e) => {
    if (!document.getElementById('app')) return; // pages that only borrow the data (e.g. formulas.html)
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key.toLowerCase();
    if (k === 'escape') { if (P.on) pClose(); $('#help').classList.remove('on'); return; }
    if (k === '?') { $('#help').classList.add('on'); return; }
    if (k === 'f') { toggleFull(); return; }
    if (P.on) {
      if (k === 's' || e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); pPause(); pNext(); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { pPause(); pPrev(); }
      else if (k === 'p') pPlay(); else if (k === 'x') pPause();
      return;
    }
    if (k === 'm') { document.body.classList.toggle('noside'); return; }
    if (S.ch && /^[1-5]$/.test(k)) { G9.go(`#/ch/${S.ch.no}/${TABS[+k - 1][0]}`); return; }
    if (S.ch && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
      const i = G9.chapters.indexOf(S.ch) + (e.key === 'ArrowRight' ? 1 : -1);
      if (G9.chapters[i]) G9.go(`#/ch/${G9.chapters[i].no}/${S.tab}`); return;
    }
    const a = S.active; if (!a) return;
    if (k === 'p' && a.play) a.play(); else if (k === 's' && a.step) { a.pause && a.pause(); a.step(); } else if (k === 'x' && a.pause) a.pause();
  });

  G9.start = function () { buildShell(); window.addEventListener('hashchange', route); route(); };
})();
