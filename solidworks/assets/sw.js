/*
TOOL:    solidworks/assets/sw.js — shared engine for the 28-Day SolidWorks Course: page shell, progress, quiz, 3D viewer and interactive labs
FAMILY:  solidworks
VERSION: 1.1.0
DATE:    2026-11-16
CHAT:    28-day SolidWorks course with interactive HTML on GitHub Pages
CHANGES: 1.1.0 - Part II (Days 29–42): 13 new labs (macro generator, macro bug hunt, rules, PDM states, revision log, formats, large-assembly modes, stack-up, costing, number checker, test report, RFQ, rendering), copy buttons, per-part exam/certificate, viewer lighting; 1.0.0 - first version; 3D wireframe/shaded viewer, 30 labs, quiz, exam, certificate, keyboard M/F/T/P/S/X/[ ]
STATUS:  working
*/
(function () {
'use strict';
const SW = window.SW = window.SW || {};
SW.version = '1.1.0';
const ND = () => (window.SW_DAYS ? SW_DAYS.length : 28);
const $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const store = {
  get(k, d) { try { const v = localStorage.getItem('sw28:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('sw28:' + k, JSON.stringify(v)); } catch (e) { } }
};
SW.store = store;
const fmt = (x, d) => { d = d === undefined ? 2 : d; return Number.isFinite(x) ? (+x.toFixed(d)).toLocaleString('en-IN', { maximumFractionDigits: d }) : '—'; };
const PI = Math.PI, rad = a => a * PI / 180, deg = a => a * 180 / PI;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------------- page shell ---------------- */
const DAY = document.body.dataset.day ? +document.body.dataset.day : 0;
function doneMap() { return store.get('done', {}); }
function setTheme(t) { document.documentElement.dataset.theme = t; store.set('theme', t); SW.redraw && SW.redraw(); }
setTheme(store.get('theme', 'light'));
function fullscreen() { if (!document.fullscreenElement) { (document.documentElement.requestFullscreen || function () { }).call(document.documentElement); } else { document.exitFullscreen(); } }
function toggleSidebar() { document.body.classList.toggle('nosb'); store.set('nosb', document.body.classList.contains('nosb')); setTimeout(() => SW.redraw && SW.redraw(), 50); }
if (store.get('nosb', false)) document.body.classList.add('nosb');

function buildToc() {
  const toc = $('#toc'); if (!toc) return;
  const hs = $$('main section > h2');
  let h = '<b>On this page</b>';
  hs.forEach((h2, i) => { const s = h2.parentElement; if (!s.id) s.id = 's' + (i + 1); h += `<a href="#${s.id}">${esc(h2.textContent.replace(/^\d+/, '').trim())}</a>`; });
  if (window.SW_DAYS) {
    const dm = doneMap();
    h += '<b style="margin-top:16px">' + SW_DAYS.length + ' days</b><div class="days">' + SW_DAYS.map((d, i) => `<a href="${d[0]}" title="Day ${i + 1}: ${esc(d[1])}" class="${dm[i + 1] ? 'done' : ''} ${DAY === i + 1 ? 'cur' : ''}">${i + 1}</a>`).join('') + '</div>';
    h += '<p class="hint" style="font-size:12.5px;color:var(--soft);margin-top:12px">Keys: <kbd>M</kbd> contents · <kbd>F</kbd> full screen · <kbd>T</kbd> theme · <kbd>P</kbd> play · <kbd>S</kbd> step · <kbd>X</kbd> pause · <kbd>[</kbd> <kbd>]</kbd> previous / next day</p>';
  }
  toc.innerHTML = h;
  const links = $$('a[href^="#"]', toc);
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id)); } }), { rootMargin: '-40% 0px -55% 0px' });
  hs.forEach(h2 => io.observe(h2.parentElement));
}
function doneBar() {
  $$('.donebar').forEach(b => {
    const btn = $('button', b), upd = () => { const on = !!doneMap()[DAY]; btn.classList.toggle('on', on); btn.textContent = on ? '✓ Day ' + DAY + ' completed — click to undo' : 'Mark Day ' + DAY + ' as complete'; };
    btn.onclick = () => { const m = doneMap(); if (m[DAY]) delete m[DAY]; else m[DAY] = new Date().toISOString().slice(0, 10); store.set('done', m); $$('.donebar button').forEach(() => { }); refreshAll(); };
    b._upd = upd; upd();
  });
}
function refreshAll() { $$('.donebar').forEach(b => b._upd && b._upd()); buildToc(); hub(); const p = $('.toolbar .prog'); if (p) p.textContent = Object.keys(doneMap()).length + ' / ' + ND() + ' days done'; }
function steps() {
  $$('ol.steps').forEach((ol, k) => {
    const key = 'st' + DAY + '_' + k, st = store.get(key, []);
    $$('li', ol).forEach((li, i) => {
      if (st.includes(i)) li.classList.add('done');
      li.title = 'Click to tick this step';
      li.addEventListener('click', e => { if (e.target.closest('a,button,input')) return; li.classList.toggle('done'); const s = $$('li', ol).map((l, j) => l.classList.contains('done') ? j : -1).filter(j => j >= 0); store.set(key, s); });
    });
  });
}
function hub() {
  const dm = doneMap();
  $$('.dcard[data-day]').forEach(c => c.classList.toggle('done', !!dm[c.dataset.day]));
  const n = Object.keys(dm).length, pb = $('#hubprog');
  if (pb) pb.innerHTML = `<div class="pbar"><i style="width:${n / ND() * 100}%"></i></div><p>${n} of ${ND()} days complete${n ? ' · next: <a href="' + nextDay(dm) + '">continue</a>' : ''}</p>`;
}
function nextDay(dm) { if (!window.SW_DAYS) return '#'; for (let i = 0; i < SW_DAYS.length; i++) if (!dm[i + 1]) return SW_DAYS[i][0]; return SW_DAYS[SW_DAYS.length - 1][0]; }
SW.resetProgress = () => { if (confirm('Clear all progress, ticks and quiz scores stored in this browser?')) { try { Object.keys(localStorage).filter(k => k.startsWith('sw28:')).forEach(k => localStorage.removeItem(k)); } catch (e) { } location.reload(); } };

/* ---------------- quiz ---------------- */
function quiz(host, data, key, onScore) {
  host.classList.add('quiz');
  data = data.map(q => { const ix = q.o.map((_, i) => i); for (let i = ix.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [ix[i], ix[j]] = [ix[j], ix[i]]; } return Object.assign({}, q, { o: ix.map(i => q.o[i]), a: ix.indexOf(q.a) }); });
  let got = 0, ans = 0; const prev = store.get(key, null);
  host.innerHTML = data.map((q, i) => `<div class="q" data-i="${i}"><p>${i + 1}. ${q.q}</p>${q.o.map((o, j) => `<button class="o" data-j="${j}">${o}</button>`).join('')}<div class="e">${q.e || ''}</div></div>`).join('') + `<p class="score"></p>${prev !== null ? `<p class="hint">Your best score so far: ${prev} / ${data.length}</p>` : ''}<button class="btn" data-r="1">Try again</button>`;
  const sc = $('.score', host);
  host.addEventListener('click', e => {
    if (e.target.dataset.r) { const n2 = host.cloneNode(false); host.replaceWith(n2); quiz(n2, data, key, onScore); return; }
    const b = e.target.closest('.o'); if (!b) return; const qd = b.closest('.q'); if (qd.classList.contains('ans')) return;
    const q = data[+qd.dataset.i], j = +b.dataset.j; qd.classList.add('ans'); ans++;
    $$('.o', qd).forEach((x, k) => { if (k === q.a) x.classList.add('right'); });
    if (j === q.a) got++; else b.classList.add('wrong');
    sc.textContent = `Score: ${got} / ${ans}` + (ans === data.length ? (got === data.length ? ' — perfect!' : got / data.length >= 0.7 ? ' — well done.' : ' — revise the day and try again.') : '');
    if (ans === data.length) { const best = Math.max(got, store.get(key, 0) || 0); store.set(key, best); onScore && onScore(got, data.length); }
  });
}
function initQuizzes() {
  $$('.quizbox').forEach(h => { const src = $('#' + h.dataset.src); if (!src) return; quiz(h, JSON.parse(src.textContent), 'q' + DAY + (h.dataset.src === 'exam-data' ? 'x' : '')); });
}

/* ---------------- keyboard ---------------- */
SW.anims = [];
function visibleAnim() { const vh = innerHeight; return SW.anims.find(a => { const r = a.el.getBoundingClientRect(); return r.bottom > 60 && r.top < vh; }) || SW.anims[0]; }
document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  const t = e.target; if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return;
  const k = e.key.toLowerCase();
  if (k === 'm') toggleSidebar();
  else if (k === 'f') fullscreen();
  else if (k === 't') setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  else if (k === 'p' || k === 's' || k === 'x') { const a = visibleAnim(); if (a) { if (k === 'p') a.play(); else if (k === 's') a.step(); else a.pause(); } }
  else if ((k === '[' || k === ']') && window.SW_DAYS && DAY) { const n = DAY + (k === ']' ? 1 : -1); if (n >= 1 && n <= SW_DAYS.length) location.href = SW_DAYS[n - 1][0]; }
});
function animCtl(host, el, tick, stepFn) {
  let on = false, last = 0;
  const loop = t => { if (!on) return; const dt = last ? Math.min(0.05, (t - last) / 1000) : 0; last = t; tick(dt); requestAnimationFrame(loop); };
  const c = { el, play() { if (!on) { on = true; last = 0; requestAnimationFrame(loop); } }, pause() { on = false; }, step() { on = false; stepFn(); } };
  const d = document.createElement('span');
  d.innerHTML = '<button title="Play (P)">▶ Play <kbd>P</kbd></button> <button title="Step (S)">⏭ Step <kbd>S</kbd></button> <button title="Pause (X)">⏸ Pause <kbd>X</kbd></button>';
  const bs = $$('button', d); bs[0].onclick = () => c.play(); bs[1].onclick = () => c.step(); bs[2].onclick = () => c.pause();
  host.appendChild(d); SW.anims.push(c); return c;
}

/* ---------------- form helper ---------------- */
function form(host, defs, cb) {
  const st = { _el: {} }, wrap = document.createElement('div'); wrap.className = 'ctl';
  defs.forEach(d => {
    st[d.k] = d.v; const lab = document.createElement('label');
    if (d.t === 'range') {
      lab.innerHTML = `${d.l} <input type="range" min="${d.min}" max="${d.max}" step="${d.s || 1}" value="${d.v}"> <b class="mono"></b>`;
      const i = $('input', lab), b = $('b', lab), show = () => b.textContent = (+i.value) + (d.u ? ' ' + d.u : '');
      show(); i.oninput = () => { st[d.k] = +i.value; show(); cb && cb(d.k); }; st._el[d.k] = i; i._show = show;
    } else if (d.t === 'num') {
      lab.innerHTML = `${d.l} <input type="number" min="${d.min === undefined ? '' : d.min}" max="${d.max === undefined ? '' : d.max}" step="${d.s || 'any'}" value="${d.v}">${d.u ? ' <span class="hint">' + d.u + '</span>' : ''}`;
      const i = $('input', lab); i.oninput = () => { const v = parseFloat(i.value); if (Number.isFinite(v)) { st[d.k] = v; cb && cb(d.k); } }; st._el[d.k] = i;
    } else if (d.t === 'sel') {
      lab.innerHTML = `${d.l} <select>${d.o.map(o => Array.isArray(o) ? `<option value="${o[0]}">${o[1]}</option>` : `<option>${o}</option>`).join('')}</select>`;
      const i = $('select', lab); i.value = d.v; i.onchange = () => { st[d.k] = i.value; cb && cb(d.k); }; st._el[d.k] = i;
    } else if (d.t === 'chk') {
      lab.innerHTML = `<input type="checkbox" ${d.v ? 'checked' : ''}> ${d.l}`;
      const i = $('input', lab); i.onchange = () => { st[d.k] = i.checked; cb && cb(d.k); }; st._el[d.k] = i;
    } else if (d.t === 'seg') {
      lab.innerHTML = (d.l ? d.l + ' ' : '') + d.o.map(o => `<button type="button" data-v="${o[0]}" class="${o[0] == d.v ? 'on' : ''}">${o[1]}</button>`).join(' ');
      lab.onclick = e => { const b = e.target.closest('button'); if (!b) return; e.preventDefault(); st[d.k] = b.dataset.v; $$('button', lab).forEach(x => x.classList.toggle('on', x === b)); cb && cb(d.k); };
      st._el[d.k] = lab;
    }
    wrap.appendChild(lab);
  });
  host.appendChild(wrap); return st;
}
function div(host, cls, html) { const d = document.createElement('div'); if (cls) d.className = cls; if (html) d.innerHTML = html; host.appendChild(d); return d; }
function lab(el) { el.classList.add('lab'); return el; }

/* ---------------- 3D engine ---------------- */
const V3 = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]], sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
  mul: (a, s) => [a[0] * s, a[1] * s, a[2] * s], dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
  nrm: a => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; }
};
const COL = { part: [80, 135, 210], acc: [235, 150, 65], grey: [170, 178, 190], dark: [85, 92, 105], light: [160, 200, 245], cream: [235, 220, 190] };
function newell(ps) { let x = 0, y = 0, z = 0; for (let i = 0; i < ps.length; i++) { const a = ps[i], b = ps[(i + 1) % ps.length]; x += (a[1] - b[1]) * (a[2] + b[2]); y += (a[2] - b[2]) * (a[0] + b[0]); z += (a[0] - b[0]) * (a[1] + b[1]); } return V3.nrm([x, y, z]); }
const G = {
  circ(r, n, cx, cz, a0) { cx = cx || 0; cz = cz || 0; a0 = a0 || 0; const a = []; for (let i = 0; i < n; i++) { const t = a0 + i / n * 2 * PI; a.push([cx + r * Math.cos(t), cz + r * Math.sin(t)]); } return a; },
  ringLoft(A, B, o, caps, sideEdges) {
    const F = [], n = A.length;
    for (let i = 0; i < n; i++) { const j = (i + 1) % n; F.push(Object.assign({}, o, { p: [A[i], A[j], B[j], B[i]], e: !!sideEdges })); }
    if (caps !== false) { F.push(Object.assign({ e: true }, o, { p: A.slice() })); F.push(Object.assign({ e: true }, o, { p: B.slice() })); }
    return F;
  },
  prism(poly, y0, y1, o, holes) {
    o = o || {}; const P = (q, y) => [q[0], y, q[1]], F = [];
    const few = poly.length <= 12;
    F.push(Object.assign({ e: true }, o, { p: poly.map(q => P(q, y0)), h: holes && holes.map(h => h.map(q => P(q, y0))) }));
    F.push(Object.assign({ e: true }, o, { p: poly.map(q => P(q, y1)), h: holes && holes.map(h => h.map(q => P(q, y1))) }));
    const side = (loop, ed) => { for (let i = 0; i < loop.length; i++) { const a = loop[i], b = loop[(i + 1) % loop.length]; F.push(Object.assign({}, o, { p: [P(a, y0), P(b, y0), P(b, y1), P(a, y1)], e: ed && o.e !== false })); } };
    side(poly, few); (holes || []).forEach(h => side(h, false));
    return F;
  },
  box(x0, x1, y0, y1, z0, z1, o) { return G.prism([[x0, z0], [x1, z0], [x1, z1], [x0, z1]], y0, y1, o); },
  revolve(prof, ang, seg, o, closed) {
    closed = closed !== false; const F = [], m = prof.length, pt = (q, t) => [q[0] * Math.cos(t), q[1], q[0] * Math.sin(t)], E = closed ? m : m - 1;
    for (let i = 0; i < E; i++) { const a = prof[i], b = prof[(i + 1) % m]; if (a[0] < 1e-9 && b[0] < 1e-9) continue; for (let k = 0; k < seg; k++) { const t0 = ang * k / seg, t1 = ang * (k + 1) / seg; F.push(Object.assign({}, o, { p: [pt(a, t0), pt(b, t0), pt(b, t1), pt(a, t1)], e: false })); } }
    if (ang < 2 * PI - 1e-6 && closed) { F.push(Object.assign({ e: true }, o, { p: prof.map(q => pt(q, 0)) })); F.push(Object.assign({ e: true }, o, { p: prof.map(q => pt(q, ang)) })); }
    return F;
  },
  sweep(profs, path, o, twist) {
    twist = twist || 0; const n = path.length, T = [];
    for (let i = 0; i < n; i++) { const a = path[Math.max(0, i - 1)], b = path[Math.min(n - 1, i + 1)]; T.push(V3.nrm(V3.sub(b, a))); }
    let up = Math.abs(T[0][1]) < 0.9 ? [0, 1, 0] : [1, 0, 0], N = V3.nrm(V3.cross(T[0], up));
    const ringsets = profs.map(() => []);
    for (let i = 0; i < n; i++) {
      if (i > 0) N = V3.nrm(V3.sub(N, V3.mul(T[i], V3.dot(N, T[i]))));
      const B = V3.cross(T[i], N), tw = twist * i / (n - 1), c = Math.cos(tw), s = Math.sin(tw);
      profs.forEach((pr, k) => ringsets[k].push(pr.map(q => { const u = q[0] * c - q[1] * s, v = q[0] * s + q[1] * c; return V3.add(path[i], V3.add(V3.mul(N, u), V3.mul(B, v))); })));
    }
    const F = [];
    ringsets.forEach(rs => { for (let i = 0; i < n - 1; i++) F.push(...G.ringLoft(rs[i], rs[i + 1], o, false)); });
    const cap = i => { const f = Object.assign({ e: true }, o, { p: ringsets[0][i] }); if (ringsets.length > 1) f.h = ringsets.slice(1).map(r => r[i]); F.push(f); };
    cap(0); cap(n - 1); return F;
  },
  quad(c, nrm, a, b, o) { nrm = V3.nrm(nrm); const ref = Math.abs(nrm[0]) < 0.9 ? [1, 0, 0] : [0, 0, 1]; const u = V3.nrm(V3.cross(nrm, ref)), v = V3.cross(nrm, u); const P = (s, t) => V3.add(c, V3.add(V3.mul(u, s * a), V3.mul(v, t * b))); return [Object.assign({ e: true }, o, { p: [P(-1, -1), P(1, -1), P(1, 1), P(-1, 1)] })]; },
  move(F, d) { const m = p => [p[0] + d[0], p[1] + d[1], p[2] + d[2]]; return F.map(f => Object.assign({}, f, { p: f.p.map(m), h: f.h && f.h.map(h => h.map(m)) })); },
  rot(F, axis, a, c) { c = c || [0, 0, 0]; const co = Math.cos(a), si = Math.sin(a); const r = p => { const x = p[0] - c[0], y = p[1] - c[1], z = p[2] - c[2]; let q; if (axis === 'x') q = [x, co * y - si * z, si * y + co * z]; else if (axis === 'y') q = [co * x + si * z, y, -si * x + co * z]; else q = [co * x - si * y, si * x + co * y, z]; return [q[0] + c[0], q[1] + c[1], q[2] + c[2]]; }; return F.map(f => Object.assign({}, f, { p: f.p.map(r), h: f.h && f.h.map(h => h.map(r)) })); }
};
SW.G = G;
const viewers = [];
SW.redraw = () => viewers.forEach(v => v.draw());
function Viewer(host, sceneFn, opt) {
  opt = opt || {};
  const cv = document.createElement('canvas'); if (opt.h) cv.style.height = opt.h + 'px'; host.appendChild(cv);
  const bar = div(host, 'ctl', '<button data-v="iso">Isometric</button><button data-v="front">Front</button><button data-v="top">Top</button><button data-v="right">Right</button><span class="hint">Drag to rotate · wheel to zoom · double-click to reset</span>');
  bar.style.marginTop = '6px';
  const y0 = opt.yaw === undefined ? -0.75 : opt.yaw, p0 = opt.pitch === undefined ? 0.5 : opt.pitch;
  const V = { yaw: y0, pitch: p0, zoom: 1 };
  const views = { iso: [-PI / 4, 0.6155], front: [0, 0], top: [0, PI / 2 - 0.0001], right: [-PI / 2, 0] };
  bar.onclick = e => { const v = e.target.dataset && e.target.dataset.v; if (v) { V.yaw = views[v][0]; V.pitch = views[v][1]; draw(); } };
  const ctx = cv.getContext('2d'); let drag = null;
  cv.addEventListener('pointerdown', e => { drag = [e.clientX, e.clientY]; cv.setPointerCapture(e.pointerId); cv.style.cursor = 'grabbing'; });
  cv.addEventListener('pointermove', e => { if (!drag) return; V.yaw += (e.clientX - drag[0]) * 0.01; V.pitch = Math.max(-1.57, Math.min(1.57, V.pitch + (e.clientY - drag[1]) * 0.01)); drag = [e.clientX, e.clientY]; draw(); });
  const up = () => { drag = null; cv.style.cursor = 'grab'; }; cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
  cv.addEventListener('wheel', e => { e.preventDefault(); V.zoom *= e.deltaY < 0 ? 1.1 : 1 / 1.1; draw(); }, { passive: false });
  cv.addEventListener('dblclick', () => { V.yaw = y0; V.pitch = p0; V.zoom = 1; draw(); });
  function fit(F) { const mn = [1e9, 1e9, 1e9], mx = [-1e9, -1e9, -1e9]; F.forEach(f => f.p.forEach(p => { for (let i = 0; i < 3; i++) { if (p[i] < mn[i]) mn[i] = p[i]; if (p[i] > mx[i]) mx[i] = p[i]; } })); return { c: [0, 1, 2].map(i => (mn[i] + mx[i]) / 2), R: Math.max(1, Math.hypot(mx[0] - mn[0], mx[1] - mn[1], mx[2] - mn[2]) / 2) }; }
  const L0 = V3.nrm([0.3, 0.6, 0.75]);
  function draw() {
    const d = window.devicePixelRatio || 1, W = Math.round(cv.clientWidth * d), H = Math.round(cv.clientHeight * d);
    if (!W || !H) return; if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
    const L = opt.light ? V3.nrm(opt.light()) : L0, amb = opt.amb ? opt.amb() : 0.42;
    const F = sceneFn(); if (!F.length) { ctx.clearRect(0, 0, W, H); return; }
    const fr = opt.fixed || fit(F), s = Math.min(W, H) * 0.44 / fr.R * V.zoom;
    const cy = Math.cos(V.yaw), sy = Math.sin(V.yaw), cp = Math.cos(V.pitch), sp = Math.sin(V.pitch);
    const R = p => { const x = p[0], y = p[1], z = p[2]; const x1 = cy * x + sy * z, z1 = -sy * x + cy * z; return [x1, cp * y - sp * z1, sp * y + cp * z1]; };
    const T = p => { const q = R([p[0] - fr.c[0], p[1] - fr.c[1], p[2] - fr.c[2]]); return [W / 2 + s * q[0], H / 2 - s * q[1], s * q[2]]; };
    const list = F.map(f => { const tp = f.p.map(T); let z = 0; tp.forEach(q => z += q[2]); return { f, tp, th: f.h ? f.h.map(h => h.map(T)) : null, z: z / tp.length + (f.zb || 0) * s, n: newell(tp.map(q => [q[0], -q[1], q[2]])) }; });
    list.sort((a, b) => a.z - b.z);
    ctx.clearRect(0, 0, W, H); ctx.lineJoin = 'round';
    const path = pts => { pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); };
    for (const o of list) {
      const f = o.f, k = amb + (1 - amb) * Math.abs(V3.dot(o.n, L)), c = f.c || COL.part, a = f.a === undefined ? 1 : f.a;
      const col = `rgba(${c[0] * k | 0},${c[1] * k | 0},${c[2] * k | 0},${a})`;
      ctx.beginPath(); path(o.tp); if (o.th) o.th.forEach(path);
      ctx.fillStyle = col; ctx.fill('evenodd');
      if (a === 1) { ctx.strokeStyle = col; ctx.lineWidth = d; ctx.stroke(); }
      if (f.e) { ctx.strokeStyle = f.ec || 'rgba(20,30,45,.6)'; ctx.lineWidth = (f.ew || 1.3) * d; ctx.stroke(); }
    }
    // triad
    const ox = 46 * d, oy = H - 46 * d, Lx = 28 * d; ctx.font = `bold ${12 * d}px Inter,sans-serif`; ctx.lineWidth = 2.5 * d;
    [['X', [1, 0, 0], '#d9822b'], ['Y', [0, 1, 0], '#1f5fbf'], ['Z', [0, 0, 1], '#6b7685']].forEach(a => { const q = R(a[1]); ctx.strokeStyle = a[2]; ctx.fillStyle = a[2]; ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + Lx * q[0], oy - Lx * q[1]); ctx.stroke(); ctx.fillText(a[0], ox + (Lx + 8 * d) * q[0] - 4 * d, oy - (Lx + 8 * d) * q[1] + 4 * d); });
    if (opt.after) opt.after(ctx, T, W, H, d);
  }
  if (window.ResizeObserver) new ResizeObserver(draw).observe(cv);
  viewers.push({ draw }); setTimeout(draw, 30);
  return { draw, V, cv };
}
SW.Viewer = Viewer;

/* ---------------- SVG helpers ---------------- */
function arrow(x, y, a, s) { s = s || 9; const p = (dx, dy) => [x + dx * Math.cos(a) - dy * Math.sin(a), y + dx * Math.sin(a) + dy * Math.cos(a)]; const q = [p(0, 0), p(-s, -s / 2.6), p(-s, s / 2.6)]; return `<polygon class="fi" points="${q.map(v => v.join(',')).join(' ')}"/>`; }
function dimL(x1, y1, x2, y2, txt, cls) { const a = Math.atan2(y2 - y1, x2 - x1); const mx = (x1 + x2) / 2, my = (y1 + y2) / 2; return `<line class="d" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>${arrow(x2, y2, a)}${arrow(x1, y1, a + PI)}<text x="${mx}" y="${my - 6}" text-anchor="middle" class="${cls || ''}">${txt}</text>`; }
const HATCH = '<defs><pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" style="fill:var(--code)"/><line x1="0" y1="0" x2="0" y2="8" style="stroke:var(--soft);stroke-width:1.4"/></pattern></defs>';
const pts = a => a.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');

/* ================= LABS ================= */
const W = SW.W = {};

/* Day 1: interface map */
W.uimap = el => {
  lab(el);
  const R = [
    ['Menu bar', 'grid-row:1;grid-column:1/4', 'File, Edit, View, Insert, Tools, Window, Help. The menus hide behind the SOLIDWORKS logo — hover there and click the push-pin to keep them open. <b>Insert</b> holds every feature; <b>Tools</b> holds Equations, Options, Evaluate commands and Add-Ins.'],
    ['CommandManager', 'grid-row:2;grid-column:1/4', 'The tabbed ribbon: Features, Sketch, Markup, Evaluate, MBD Dimensions, SOLIDWORKS Add-Ins… Tabs change with the document type (part, assembly, drawing). Right-click any tab → <i>Tabs</i> to add Sheet Metal, Weldments, Surfaces or Mold Tools.'],
    ['Manager tabs', 'grid-row:3;grid-column:1', 'Above the left pane: FeatureManager design tree, PropertyManager, ConfigurationManager, DimXpertManager and DisplayManager. Add-ins such as Simulation add their own tabs at the bottom of the graphics area.'],
    ['Heads-up View toolbar', 'grid-row:3;grid-column:2', 'Transparent toolbar at the top of the graphics area: Zoom to Fit, Zoom to Area, Previous View, Section View, View Orientation, Display Style (shaded with edges, hidden lines removed…), Hide/Show Items, Edit Appearance, Apply Scene and View Settings.'],
    ['Task Pane', 'grid-row:3/5;grid-column:3', 'Right-side pane: SOLIDWORKS Resources, Design Library (Toolbox lives here), File Explorer, View Palette (drag views onto drawings), Appearances/Scenes/Decals and Custom Properties.'],
    ['FeatureManager design tree', 'grid-row:4;grid-column:1', 'The recipe of your model, top to bottom: History, Sensors, Annotations, Material, Front/Top/Right Planes, Origin, then every feature in the order it was made. Drag the <b>rollback bar</b> to go back in time; click a feature to Edit Feature or Edit Sketch.'],
    ['Graphics area', 'grid-row:4;grid-column:2', 'Where the model lives. Holds the reference triad (bottom-left), the <b>Confirmation Corner</b> (top-right: ✓ OK / ✗ Cancel while editing), and the origin. Middle-drag rotates, Ctrl + middle-drag pans, wheel zooms. Right-drag gives mouse gestures.'],
    ['Status bar', 'grid-row:5;grid-column:1/4', 'Shows sketch state (Under Defined / Fully Defined / Over Defined), cursor coordinates while sketching, rebuild messages and the unit system (e.g. MMGS). Click the unit system to change it on the spot.']
  ];
  const g = div(el, 'uimap', R.map((r, i) => `<div data-i="${i}" style="${r[1]}">${r[0]}</div>`).join(''));
  const info = div(el, 'out', 'Click any area of the window.'); info.style.marginTop = '10px'; info.style.whiteSpace = 'normal';
  g.onclick = e => { const d = e.target.closest('[data-i]'); if (!d) return; $$('div', g).forEach(x => x.classList.toggle('on', x === d)); const r = R[+d.dataset.i]; info.innerHTML = `<b>${r[0]}</b> — ${r[2]}`; };
};

/* flash cards */
W.flash = el => {
  lab(el); const data = JSON.parse($('#' + el.dataset.src).textContent);
  const g = div(el, 'flash', data.map(c => `<div><b>${c[0]}</b><span>${c[1]}</span></div>`).join(''));
  div(el, 'hint', 'Click a card to reveal what it does. Say the answer aloud before you click.');
  g.onclick = e => { const d = e.target.closest('.flash>div'); if (d) d.classList.toggle('flip'); };
};

/* Day 2: degrees of freedom of a rectangle sketch */
W.dof = el => {
  lab(el);
  const st = form(el, [
    { k: 'c1', t: 'chk', l: 'Coincident: corner ↔ Origin', v: false },
    { k: 'c2', t: 'chk', l: 'Width = 80 mm', v: false },
    { k: 'c3', t: 'chk', l: 'Height = 50 mm', v: false },
    { k: 'c4', t: 'chk', l: 'Diagonal = 94.34 mm', v: false },
    { k: 'c5', t: 'chk', l: 'Extra Horizontal on top line', v: false },
    { k: 'c6', t: 'chk', l: 'Fix the corner', v: false }
  ], draw);
  const row = div(el, 'row'), svgBox = div(row), out = div(row, 'out');
  const ctl = div(el, 'ctl'); let ph = 0;
  const an = animCtl(ctl, el, dt => { ph += dt * 2.2; draw(); }, () => { ph += 0.6; draw(); });
  function calc() {
    let rem = 0; const red = [];
    if (st.c1) rem += 2;
    if (st.c6) { if (st.c1) red.push('Fix repeats what Coincident-to-origin already did'); else rem += 2; }
    if (st.c2) rem++; if (st.c3) rem++;
    if (st.c4) { if (st.c2 && st.c3) red.push('Width + height + diagonal = three dimensions for two sizes'); else rem++; }
    if (st.c5) red.push('The top line is already Horizontal (a corner rectangle comes with it)');
    return { dof: 4 - rem, red };
  }
  function draw() {
    const c = calc(), locFree = !st.c1 && !st.c6, wF = !st.c2 && !(st.c4 && st.c3), hF = !st.c3 && !(st.c4 && st.c2), diagOnly = st.c4 && !st.c2 && !st.c3;
    let w = 80, h = 50, ox = locFree ? 25 : 0, oy = locFree ? 15 : 0;
    if (locFree) { ox += 14 * Math.sin(ph); oy += 9 * Math.cos(ph * 1.3); }
    if (diagOnly) { const D = 94.34, phi = Math.atan2(50, 80) + 0.25 * Math.sin(ph * 1.1); w = D * Math.cos(phi); h = D * Math.sin(phi); }
    else { if (wF) w += 16 * Math.sin(ph * 1.2); if (hF) h += 10 * Math.sin(ph * 0.9 + 1); }
    const sc = 3, X0 = 90, Y0 = 290, x = X0 + ox * sc, y = Y0 - oy * sc, W2 = w * sc, H2 = h * sc;
    const state = c.red.length ? 'over' : c.dof > 0 ? 'under' : 'full';
    const cls = state === 'under' ? 'b dash' : state === 'full' ? 'k' : 'o';
    let s = `<svg viewBox="0 0 470 340">`;
    s += `<line class="d" x1="${X0 - 40}" y1="${Y0}" x2="${X0 + 40}" y2="${Y0}"/><line class="d" x1="${X0}" y1="${Y0 + 30}" x2="${X0}" y2="${Y0 - 40}"/>${arrow(X0 + 40, Y0, 0, 8)}${arrow(X0, Y0 - 40, -PI / 2, 8)}<text x="${X0 - 34}" y="${Y0 + 18}" class="s">Origin</text>`;
    s += `<rect class="${cls}" x="${x}" y="${y - H2}" width="${W2}" height="${H2}" style="stroke-width:${state === 'full' ? 2.5 : 3.5}"/>`;
    [[x, y], [x + W2, y], [x + W2, y - H2], [x, y - H2]].forEach(p => s += `<circle cx="${p[0]}" cy="${p[1]}" r="4" class="${state === 'full' ? 'fi' : state === 'under' ? 'fp' : 'fa'}"/>`);
    if (st.c2) s += dimL(x, y + 26, x + W2, y + 26, '80');
    if (st.c3) s += dimL(x - 26, y, x - 26, y - H2, '50');
    if (st.c4) s += dimL(x, y, x + W2, y - H2, '94.34');
    if (st.c6) s += `<text x="${x - 6}" y="${y + 16}" class="ot">⚓ Fixed</text>`;
    if (state === 'over') s += `<text x="${x + W2 / 2}" y="${y - H2 - 12}" text-anchor="middle" class="ot" style="font-size:16px">! Over defined</text>`;
    s += '</svg>'; svgBox.innerHTML = s;
    const lbl = { under: '<span class="badge" style="color:var(--pri)">UNDER DEFINED</span> SolidWorks draws these lines <b>blue</b>.', full: '<span class="badge" style="color:var(--ink)">FULLY DEFINED</span> SolidWorks draws these lines <b>black</b>.', over: '<span class="badge" style="color:var(--acc2)">OVER DEFINED</span> SolidWorks flags this in <b>red / yellow</b> and the status bar says "Over Defined".' }[state];
    out.style.whiteSpace = 'normal';
    out.innerHTML = `A corner rectangle starts with <b>4 degrees of freedom</b> (x, y of a corner, width, height).<br><br>Remaining DOF: <b style="font-size:22px">${Math.max(0, c.dof)}</b><br>${lbl}${c.red.length ? '<br><br>Redundant: ' + c.red.map(r => '• ' + r).join('<br>') : ''}<br><br><span class="hint">Press <kbd>P</kbd> to "drag" the sketch: whatever still moves is not yet defined.</span>`;
  }
  draw();
};

/* Day 3: sketch relations */
W.relations = el => {
  lab(el);
  const A = { x1: 70, y1: 270, x2: 270, y2: 200 };
  const init = () => ({ B: { x1: 340, y1: 120, x2: 540, y2: 230 }, C1: { x: 450, y: 290, r: 34 }, C2: { x: 190, y: 105, r: 50 } });
  let S = init(), applied = [], msg = 'Pick a relation. Line A (black) is fixed; line B and circle C1 (blue) move to obey.';
  const lenA = Math.hypot(A.x2 - A.x1, A.y2 - A.y1), uA = [(A.x2 - A.x1) / lenA, (A.y2 - A.y1) / lenA];
  const lB = B => Math.hypot(B.x2 - B.x1, B.y2 - B.y1);
  const setDir = (B, u, L) => { L = L || lB(B); B.x2 = B.x1 + u[0] * L; B.y2 = B.y1 + u[1] * L; };
  const distLine = (x, y) => ((x - A.x1) * uA[1] - (y - A.y1) * uA[0]);
  const REL = {
    Horizontal: { ap: s => setDir(s.B, [Math.sign(s.B.x2 - s.B.x1) || 1, 0]), ck: s => Math.abs(s.B.y2 - s.B.y1) < .6 },
    Vertical: { ap: s => setDir(s.B, [0, Math.sign(s.B.y2 - s.B.y1) || 1]), ck: s => Math.abs(s.B.x2 - s.B.x1) < .6 },
    Parallel: { ap: s => setDir(s.B, uA), ck: s => { const L = lB(s.B); return Math.abs(((s.B.x2 - s.B.x1) * uA[1] - (s.B.y2 - s.B.y1) * uA[0]) / L) < .01; } },
    Perpendicular: { ap: s => setDir(s.B, [-uA[1], uA[0]]), ck: s => { const L = lB(s.B); return Math.abs(((s.B.x2 - s.B.x1) * uA[0] + (s.B.y2 - s.B.y1) * uA[1]) / L) < .01; } },
    Collinear: { ap: s => { const d = distLine(s.B.x1, s.B.y1); s.B.x1 -= d * uA[1]; s.B.y1 += d * uA[0]; setDir(s.B, uA); }, ck: s => REL.Parallel.ck(s) && Math.abs(distLine(s.B.x1, s.B.y1)) < .6 },
    Equal: { ap: s => { const L = lB(s.B); setDir(s.B, [(s.B.x2 - s.B.x1) / L, (s.B.y2 - s.B.y1) / L], lenA); }, ck: s => Math.abs(lB(s.B) - lenA) < .6 },
    Coincident: { ap: s => { const dx = A.x2 - s.B.x1, dy = A.y2 - s.B.y1; s.B.x1 += dx; s.B.y1 += dy; s.B.x2 += dx; s.B.y2 += dy; }, ck: s => Math.hypot(A.x2 - s.B.x1, A.y2 - s.B.y1) < .6 },
    Midpoint: { ap: s => { const mx = (A.x1 + A.x2) / 2, my = (A.y1 + A.y2) / 2, dx = mx - s.B.x1, dy = my - s.B.y1; s.B.x1 += dx; s.B.y1 += dy; s.B.x2 += dx; s.B.y2 += dy; }, ck: s => Math.hypot((A.x1 + A.x2) / 2 - s.B.x1, (A.y1 + A.y2) / 2 - s.B.y1) < .6 },
    Tangent: { ap: s => { const d = distLine(s.C1.x, s.C1.y), sg = Math.sign(d) || 1, k = sg * s.C1.r - d; s.C1.x += k * uA[1]; s.C1.y -= k * uA[0]; }, ck: s => Math.abs(Math.abs(distLine(s.C1.x, s.C1.y)) - s.C1.r) < .6 },
    Concentric: { ap: s => { s.C1.x = s.C2.x; s.C1.y = s.C2.y; }, ck: s => Math.hypot(s.C1.x - s.C2.x, s.C1.y - s.C2.y) < .6 },
    'Equal radius': { ap: s => { s.C1.r = s.C2.r; }, ck: s => Math.abs(s.C1.r - s.C2.r) < .6 }
  };
  const bar = div(el, 'ctl', Object.keys(REL).map(k => `<button data-r="${k}">${k}</button>`).join('') + '<button data-r="_reset">↺ Reset</button>');
  const box = div(el), out = div(el, 'out'); out.style.whiteSpace = 'normal';
  let anim = null;
  bar.onclick = e => {
    const r = e.target.dataset.r; if (!r) return;
    if (r === '_reset') { S = init(); applied = []; msg = 'Reset.'; draw(); return; }
    if (applied.includes(r)) { msg = `${r} is already applied.`; draw(); return; }
    const T = JSON.parse(JSON.stringify(S)); REL[r].ap(T);
    const broken = applied.filter(a => !REL[a].ck(T));
    if (broken.length) { msg = `<b style="color:var(--acc2)">Conflict:</b> ${r} cannot be satisfied together with ${broken.join(', ')}. SolidWorks would show the sketch as <b>over defined</b> (red/yellow) — delete one of them.`; draw(); return; }
    applied.push(r); msg = `<b>${r}</b> added. Applied: ${applied.join(' · ')}`;
    const from = JSON.parse(JSON.stringify(S)), t0 = performance.now();
    cancelAnimationFrame(anim);
    const step = t => { const u = Math.min(1, (t - t0) / 450), e2 = u * u * (3 - 2 * u); const L = (a, b) => a + (b - a) * e2; S = { B: {}, C1: {}, C2: T.C2 }; ['x1', 'y1', 'x2', 'y2'].forEach(k => S.B[k] = L(from.B[k], T.B[k])); ['x', 'y', 'r'].forEach(k => S.C1[k] = L(from.C1[k], T.C1[k])); draw(); if (u < 1) anim = requestAnimationFrame(step); else S = T; };
    anim = requestAnimationFrame(step);
  };
  function draw() {
    const B = S.B, C1 = S.C1, C2 = S.C2;
    let s = `<svg viewBox="0 0 640 380">`;
    s += `<line class="k" x1="${A.x1}" y1="${A.y1}" x2="${A.x2}" y2="${A.y2}" style="stroke-width:3.5"/><text x="${A.x1 - 10}" y="${A.y1 + 22}">Line A (fixed)</text>`;
    s += `<line class="b" x1="${B.x1}" y1="${B.y1}" x2="${B.x2}" y2="${B.y2}" style="stroke-width:4"/><text x="${B.x2 + 6}" y="${B.y2}" class="bt">Line B</text>`;
    s += `<circle class="b" cx="${C1.x}" cy="${C1.y}" r="${C1.r}"/><text x="${C1.x + C1.r + 4}" y="${C1.y + 4}" class="bt">C1</text>`;
    s += `<circle class="k" cx="${C2.x}" cy="${C2.y}" r="${C2.r}" style="stroke-width:2.5"/><text x="${C2.x - 10}" y="${C2.y - C2.r - 6}">C2 (fixed)</text>`;
    [[A.x1, A.y1], [A.x2, A.y2], [B.x1, B.y1], [B.x2, B.y2], [C1.x, C1.y], [C2.x, C2.y]].forEach(p => s += `<circle cx="${p[0]}" cy="${p[1]}" r="3.5" class="fi"/>`);
    s += `<text x="10" y="370" class="s">Relations on the sketch: ${applied.length ? applied.join(' · ') : 'none'}</text></svg>`;
    box.innerHTML = s; out.innerHTML = msg;
  }
  draw();
};

/* Day 4: extrude end conditions */
W.extrude = el => {
  lab(el);
  const st = form(el, [
    { k: 'f', t: 'seg', l: 'Feature', o: [['boss', 'Extruded Boss'], ['cut', 'Extruded Cut']], v: 'boss' },
    { k: 'p', t: 'sel', l: 'Sketch', o: [['c', 'Circle Ø50'], ['r', 'Rectangle 60×36'], ['l', 'L-shape']], v: 'c' },
    { k: 'e', t: 'sel', l: 'End condition', o: [['blind', 'Blind'], ['mid', 'Mid Plane'], ['upto', 'Up To Surface'], ['thru', 'Through All']], v: 'blind' },
    { k: 'd', t: 'range', l: 'Depth', min: 5, max: 90, v: 40, u: 'mm' },
    { k: 'dr', t: 'range', l: 'Draft', min: 0, max: 15, v: 0, u: '°' },
    { k: 'rev', t: 'chk', l: 'Reverse direction', v: false }
  ], () => vw.draw());
  const out = div(el, 'out');
  const BT = 30, prof = (p, off) => {
    off = off || 0;
    if (p === 'c') return G.circ(Math.max(1, 25 - off), 40);
    if (p === 'r') { const a = Math.max(1, 30 - off), b = Math.max(1, 18 - off); return [[-a, -b], [a, -b], [a, b], [-a, b]]; }
    return [[-30, -20], [30, -20], [30, -6], [-14, -6], [-14, 20], [-30, 20]];
  };
  const area = poly => { let A = 0; for (let i = 0; i < poly.length; i++) { const a = poly[i], b = poly[(i + 1) % poly.length]; A += a[0] * b[1] - b[0] * a[1]; } return Math.abs(A) / 2; };
  const vw = Viewer(el, () => {
    const F = [], cut = st.f === 'cut', P0 = prof(st.p), T = rad(st.dr) * (st.p === 'l' ? 0 : 1);
    let y0, y1, note = '';
    if (!cut) {
      const dir = st.rev ? -1 : 1, D = st.e === 'upto' ? 75 : st.d;
      if (st.e === 'mid') { y0 = BT - D / 2; y1 = BT + D / 2; } else if (st.e === 'thru') { y0 = BT; y1 = BT + D; note = 'Through All is for cuts — on a boss SolidWorks offers it only when there is geometry to go through, so this behaves like Blind here.'; } else { y0 = BT; y1 = BT + dir * D; }
      if (st.rev && st.e === 'blind') note = 'Reversed: the boss grows down into the base block and merges with it — nothing new appears outside.';
      F.push(...G.box(-70, 70, 0, BT, -45, 45, { c: COL.grey }));
      const off = Math.abs(y1 - y0) * Math.tan(T), Pt = prof(st.p, off);
      const lo = Math.min(y0, y1), hi = Math.max(y0, y1), Pl = y1 > y0 ? P0 : Pt, Ph = y1 > y0 ? Pt : P0;
      F.push(...G.ringLoft(Pl.map(q => [q[0], lo, q[1]]), Ph.map(q => [q[0], hi, q[1]]), { c: COL.part }, true, st.p !== 'c'));
      if (st.e === 'upto') F.push(...G.quad([0, BT + 75, 0], [0, 1, 0], 80, 60, { c: COL.acc, a: 0.3, ec: 'rgba(200,110,30,.9)' }));
      const A0 = area(P0), A1 = area(Pt), h = Math.abs(y1 - y0), V = h / 3 * (A0 + A1 + Math.sqrt(A0 * A1));
      out.textContent = `Boss height ${fmt(h, 1)} mm${st.e === 'mid' ? ` (${fmt(h / 2, 1)} each side of the sketch plane)` : ''}\nSketch area ${fmt(A0, 0)} mm²${T ? ` · top area after ${st.dr}° draft ${fmt(A1, 0)} mm²` : ''}\nVolume added ≈ ${fmt(V, 0)} mm³${note ? '\n' + note : ''}${st.p === 'l' && st.dr ? '\n(Draft preview is shown on the circle and rectangle only.)' : ''}`;
    } else {
      const D = st.e === 'thru' ? BT : st.e === 'upto' ? 18 : Math.min(st.d, st.e === 'mid' ? 2 * BT : BT), holeTop = BT, holeBot = st.e === 'mid' ? Math.max(0, BT - D / 2) : BT - D;
      const blk = [[-70, -45], [70, -45], [70, 45], [-70, 45]], H = P0.slice().reverse();
      F.push(Object.assign({ e: true, c: COL.grey }, { p: blk.map(q => [q[0], BT, q[1]]), h: [H.map(q => [q[0], BT, q[1]])] }));
      F.push(Object.assign({ e: true, c: COL.grey }, { p: blk.map(q => [q[0], 0, q[1]]), h: holeBot <= 0.01 ? [H.map(q => [q[0], 0, q[1]])] : null }));
      for (let i = 0; i < 4; i++) { const a = blk[i], b = blk[(i + 1) % 4]; F.push({ c: COL.grey, e: true, p: [[a[0], 0, a[1]], [b[0], 0, b[1]], [b[0], BT, b[1]], [a[0], BT, a[1]]] }); }
      F.push(...G.ringLoft(P0.map(q => [q[0], Math.max(0, holeBot), q[1]]), P0.map(q => [q[0], holeTop, q[1]]), { c: COL.acc, zb: -60 }, false));
      if (holeBot > 0.01) F.push({ c: COL.acc, e: true, p: P0.map(q => [q[0], holeBot, q[1]]), zb: -60 });
      if (st.e === 'upto') F.push(...G.quad([0, 18, 0], [0, 1, 0], 80, 55, { c: COL.acc, a: 0.25 }));
      out.textContent = `Cut depth ${fmt(holeTop - Math.max(0, holeBot), 1)} mm into a ${BT} mm block${holeBot <= 0.01 ? ' — goes right through' : ''}.\nVolume removed ≈ ${fmt(area(P0) * (holeTop - Math.max(0, holeBot)), 0)} mm³` + (st.e === 'blind' && st.d > BT ? '\nDepth larger than the block: the cut simply exits the bottom. Use Through All so the hole stays through if the block gets thicker later.' : '') + (st.e === 'mid' ? '\nMid Plane cuts half the depth on each side of the sketch plane — the half above the top face removes nothing.' : '') + (st.e === 'upto' ? '\nUp To Surface: the cut stops at the selected (orange) face, wherever it moves.' : '');
    }
    return F;
  }, { yaw: -0.6, pitch: 0.55 });
};

/* Day 5: revolve */
W.revolve = el => {
  lab(el);
  const PR = {
    shaft: { n: 'Stepped shaft (closed, on the axis)', p: [[0, 0], [15, 0], [15, 40], [11, 40], [11, 100], [7, 100], [7, 125], [0, 125]] },
    pulley: { n: 'V-pulley with bore', p: [[8, 0], [42, 0], [42, 6], [32, 15], [42, 24], [42, 30], [8, 30]] },
    ring: { n: 'O-ring (circle off the axis)', p: G.circ(8, 24, 30, 0).map(q => [q[0], q[1] + 10]) },
    cup: { n: 'Cup (open profile + thin feature)', p: [[0, 0], [30, 0], [34, 50], [31, 50], [27.2, 3], [0, 3]] }
  };
  const st = form(el, [
    { k: 'p', t: 'sel', l: 'Profile', o: Object.keys(PR).map(k => [k, PR[k].n]), v: 'shaft' },
    { k: 'a', t: 'range', l: 'Revolve angle', min: 10, max: 360, s: 5, v: 270, u: '°' }
  ], () => { vw.draw(); prof(); });
  const row = div(el, 'row'), left = div(row), right = div(row); left.style.flex = '2 1 420px';
  const svgB = div(right), out = div(right, 'out');
  const vw = Viewer(left, () => { const a = rad(st.a); return G.revolve(PR[st.p].p, a, Math.max(4, Math.round(st.a / 360 * 56)), { c: COL.part }); }, { yaw: -0.5, pitch: 0.35 });
  function prof() {
    const p = PR[st.p].p, sc = 2.2, X0 = 40, Y0 = 300; let s = `<svg viewBox="0 0 280 320"><line class="cl" x1="${X0}" y1="10" x2="${X0}" y2="315"/><text x="${X0 + 4}" y="20" class="s">axis (centreline)</text>`;
    s += `<polygon class="fb" points="${pts(p.map(q => [X0 + q[0] * sc, Y0 - q[1] * sc]))}"/></svg>`; svgB.innerHTML = s;
    let A = 0, cx = 0; for (let i = 0; i < p.length; i++) { const a = p[i], b = p[(i + 1) % p.length], c = a[0] * b[1] - b[0] * a[1]; A += c; cx += (a[0] + b[0]) * c; } A /= 2; cx /= (6 * A); A = Math.abs(A);
    const V = A * 2 * PI * cx * st.a / 360;
    out.textContent = `Profile area A = ${fmt(A, 1)} mm²\nCentroid radius r̄ = ${fmt(cx, 2)} mm\nPappus: V = A × 2π r̄ × (θ/360)\n      = ${fmt(V, 0)} mm³ for ${st.a}°`;
  }
  prof();
};

/* Day 6: fillet / chamfer 2D */
W.fillet2d = el => {
  lab(el);
  const st = form(el, [
    { k: 'm', t: 'seg', o: [['f', 'Fillet'], ['cd', 'Chamfer distance-distance'], ['ca', 'Chamfer angle-distance']], v: 'f' },
    { k: 'r', t: 'range', l: 'Size (R or d1)', min: 0, max: 50, v: 20, u: 'mm' },
    { k: 'd2', t: 'range', l: 'd2', min: 0, max: 50, v: 10, u: 'mm' },
    { k: 'an', t: 'range', l: 'Angle', min: 15, max: 75, v: 30, u: '°' },
    { k: 'w', t: 'sel', l: 'Corners', o: [['all', 'All four'], ['top', 'Top two only']], v: 'all' }
  ], draw);
  const box = div(el), out = div(el, 'out');
  function draw() {
    const Wd = 200, H = 120, sc = 1.8, ox = 40, oy = 30, C = [[0, 0], [Wd, 0], [Wd, H], [0, H]], r = Math.min(st.r, H / 2);
    let d1 = r, d2 = st.m === 'cd' ? st.d2 : st.m === 'ca' ? r * Math.tan(rad(st.an)) : r; d2 = Math.min(d2, H / 2);
    const S = q => (ox + q[0] * sc).toFixed(1) + ',' + (oy + q[1] * sc).toFixed(1), u = (a, b) => { const l = Math.hypot(b[0] - a[0], b[1] - a[1]); return [(b[0] - a[0]) / l, (b[1] - a[1]) / l]; };
    let d = '';
    C.forEach((c, i) => {
      const p = C[(i + 3) % 4], n = C[(i + 1) % 4], ui = u(p, c), uo = u(c, n), use = (st.w === 'all' || i < 2) && r > 0;
      if (!use) { d += (i ? 'L' : 'M') + S(c); return; }
      const s1 = st.m === 'f' ? r : d1, s2 = st.m === 'f' ? r : d2, a = [c[0] - ui[0] * s1, c[1] - ui[1] * s1], b = [c[0] + uo[0] * s2, c[1] + uo[1] * s2];
      d += (i ? 'L' : 'M') + S(a) + (st.m === 'f' ? `A${r * sc},${r * sc} 0 0 1 ${S(b)}` : 'L' + S(b));
    });
    d += 'Z';
    box.innerHTML = `<svg viewBox="0 0 440 290"><rect class="d dash" x="${ox}" y="${oy}" width="${Wd * sc}" height="${H * sc}"/><path class="fb" d="${d}"/></svg>`;
    const n = st.w === 'all' ? 4 : 2;
    const removed = st.m === 'f' ? n * (1 - PI / 4) * r * r : n * 0.5 * d1 * d2;
    out.textContent = (st.m === 'f' ? `Fillet R${r}: removes (1 − π/4)R² = ${fmt((1 - PI / 4) * r * r, 1)} mm² per corner` : st.m === 'cd' ? `Chamfer ${d1} × ${d2}: removes ½·d1·d2 = ${fmt(0.5 * d1 * d2, 1)} mm² per corner` : `Chamfer ${d1} × ${st.an}°: second leg = d1·tan(angle) = ${fmt(d2, 2)} mm`) + `\nCorners treated: ${n} · area removed ${fmt(removed, 1)} mm² of ${Wd * H} mm²` + (r >= H / 2 && st.m === 'f' ? '\nR = half the height: the ends become full rounds (a slot shape). Any larger and SolidWorks reports the fillet cannot be made.' : '');
  }
  draw();
};

/* Day 6: shell */
W.shell = el => {
  lab(el);
  const st = form(el, [
    { k: 't', t: 'range', l: 'Thickness', min: 1, max: 20, v: 4, u: 'mm' },
    { k: 'o', t: 'sel', l: 'Faces to remove', o: [['top', 'Top face'], ['tf', 'Top + front faces'], ['none', 'None (hollow inside)']], v: 'top' },
    { k: 'out', t: 'chk', l: 'Shell outward', v: false }
  ], () => vw.draw());
  const out = div(el, 'out');
  const L = 120, Wd = 80, H = 60;
  const vw = Viewer(el, () => {
    const t = st.t, F = [], g = st.out ? t : 0, x0 = -L / 2 - g, x1 = L / 2 + g, z0 = -Wd / 2 - g, z1 = Wd / 2 + g, y0 = -g, y1 = H;
    const c = { c: COL.part };
    if (st.o === 'none') { F.push(...G.box(x0, x1, y0, y1 + g, z0, z1, { c: COL.part, a: 0.35 })); F.push(...G.box(x0 + t, x1 - t, y0 + t, y1 + g - t, z0 + t, z1 - t, { c: COL.acc })); }
    else {
      F.push(...G.box(x0, x1, y0, y0 + t, z0, z1, c));
      F.push(...G.box(x0, x0 + t, y0 + t, y1, z0, z1, c)); F.push(...G.box(x1 - t, x1, y0 + t, y1, z0, z1, c));
      F.push(...G.box(x0 + t, x1 - t, y0 + t, y1, z0, z0 + t, c));
      if (st.o === 'top') F.push(...G.box(x0 + t, x1 - t, y0 + t, y1, z1 - t, z1, c));
    }
    const Vs = (x1 - x0) * (y1 - y0 + (st.o === 'none' ? g : 0)) * (z1 - z0), Vin = st.o === 'none' ? (x1 - x0 - 2 * t) * (y1 + g - y0 - 2 * t) * (z1 - z0 - 2 * t) : (x1 - x0 - 2 * t) * (y1 - y0 - t) * (z1 - z0 - (st.o === 'top' ? 2 * t : t));
    out.textContent = `Outside size ${fmt(x1 - x0, 0)} × ${fmt(z1 - z0, 0)} × ${fmt(y1 - y0 + (st.o === 'none' ? g : 0), 0)} mm ${st.out ? '(grew by the thickness — shell outward keeps the original as the inside)' : '(original size kept — shell inward)'}\nSolid volume ${fmt(Vs, 0)} mm³ → shelled ${fmt(Vs - Vin, 0)} mm³ (${fmt((Vs - Vin) / Vs * 100, 1)} % of solid)` + (st.o === 'none' ? '\nNo face removed: the result is a sealed hollow body (shown cut-away). Useful for floats and rotationally moulded parts.' : '');
    return F;
  }, { yaw: -0.65, pitch: 0.6 });
};

/* Day 7: patterns */
W.pattern = el => {
  lab(el);
  const st = form(el, [
    { k: 'm', t: 'seg', o: [['lin', 'Linear pattern'], ['cir', 'Circular pattern'], ['mir', 'Mirror']], v: 'lin' },
    { k: 'n1', t: 'range', l: 'Instances (Dir 1)', min: 1, max: 12, v: 5 },
    { k: 's1', t: 'range', l: 'Spacing 1', min: 10, max: 80, v: 50, u: 'mm' },
    { k: 'n2', t: 'range', l: 'Instances (Dir 2)', min: 1, max: 8, v: 3 },
    { k: 's2', t: 'range', l: 'Spacing 2', min: 10, max: 80, v: 50, u: 'mm' },
    { k: 'd', t: 'range', l: 'Hole Ø', min: 4, max: 30, v: 14, u: 'mm' },
    { k: 'ang', t: 'range', l: 'Total angle', min: 30, max: 360, s: 15, v: 360, u: '°' },
    { k: 'eq', t: 'chk', l: 'Equal spacing', v: true }
  ], () => { skip.clear(); draw(); });
  const skip = new Set(), box = div(el), out = div(el, 'out');
  div(el, 'hint', 'Linear pattern: click an instance to skip it (Instances to Skip). The seed feature (orange) cannot be skipped.');
  box.onclick = e => { const c = e.target.closest('[data-k]'); if (!c || c.dataset.k === '0,0') return; const k = c.dataset.k; skip.has(k) ? skip.delete(k) : skip.add(k); draw(); };
  function draw() {
    const sc = 1.6, PX = 40, PY = 30, PW = 300, PH = 180; let s = `<svg viewBox="0 0 580 380">`, txt = '';
    if (st.m === 'lin') {
      s += `<rect class="fg" x="${PX}" y="${PY}" width="${PW * sc}" height="${PH * sc}"/>`;
      let n = 0, bad = 0;
      for (let j = 0; j < st.n2; j++) for (let i = 0; i < st.n1; i++) {
        const x = 25 + i * st.s1, y = 25 + j * st.s2, k = i + ',' + j, sk = skip.has(k), off = x + st.d / 2 > PW || y + st.d / 2 > PH;
        if (!sk) { n++; if (off) bad++; }
        s += `<circle data-k="${k}" cx="${PX + x * sc}" cy="${PY + y * sc}" r="${st.d / 2 * sc}" class="${k === '0,0' ? 'fo' : sk ? 'd dash' : off ? 'o dash' : 'fb'}" style="cursor:pointer"/>`;
      }
      s += dimL(PX + 25 * sc, PY + PH * sc + 18, PX + (25 + st.s1) * sc, PY + PH * sc + 18, st.s1 + '') + `<text x="${PX}" y="${PY + PH * sc + 44}" class="s">Plate 300 × 180 mm · seed hole at (25, 25)</text>`;
      txt = `Instances made: ${n} (${st.n1} × ${st.n2} − ${skip.size} skipped)` + (st.s1 < st.d || st.s2 < st.d ? '\nSpacing smaller than the hole: instances overlap and merge into a slot.' : '') + (bad ? `\n${bad} instance(s) run off the plate (dashed orange). SolidWorks still makes them — the cut just removes nothing there — so check your counts.` : '');
    } else if (st.m === 'cir') {
      const cx = 290, cy = 175, OD = 200, PCD = 140; s += `<circle class="fg" cx="${cx}" cy="${cy}" r="${OD / 2 * sc * 0.75}"/><circle class="fg" cx="${cx}" cy="${cy}" r="${30 * sc * 0.75}" style="fill:var(--card)"/><circle class="cl" cx="${cx}" cy="${cy}" r="${PCD / 2 * sc * 0.75}"/>`;
      const n = st.n1, step = st.eq ? (st.ang >= 360 ? 360 / n : n > 1 ? st.ang / (n - 1) : 0) : st.ang;
      for (let i = 0; i < n; i++) { const a = rad(-90 + i * step); s += `<circle cx="${cx + PCD / 2 * sc * 0.75 * Math.cos(a)}" cy="${cy + PCD / 2 * sc * 0.75 * Math.sin(a)}" r="${st.d / 2 * sc * 0.75}" class="${i ? 'fb' : 'fo'}"/>`; }
      txt = `${n} instances on PCD 140 · angular step ${fmt(step, 2)}°` + (st.eq ? (st.ang >= 360 ? ' (360 / N)' : ` (total ${st.ang}° shared between N − 1 gaps)`) : ' (Equal spacing off: the angle box is the step between instances)') + (!st.eq && step * (n - 1) >= 360 ? '\nInstances wrap past 360° and overlap.' : '');
    } else {
      const cx = 290; s += `<rect class="fg" x="${cx - 220}" y="50" width="440" height="240"/><line class="cl" x1="${cx}" y1="30" x2="${cx}" y2="310"/><text x="${cx + 6}" y="44" class="s">Right Plane (mirror plane)</text>`;
      const feat = (x, cls) => `<rect class="${cls}" x="${x - 30}" y="90" width="60" height="22" rx="11"/><circle class="${cls}" cx="${x}" cy="170" r="16"/><circle class="${cls}" cx="${x + (x > cx ? 60 : -60)}" cy="240" r="10"/>`;
      s += feat(cx + 120, 'fo') + (st.eq ? feat(cx - 120, 'fb') : '');
      txt = st.eq ? 'Mirror copies the seed features (orange) across the Right Plane. Edit the seed and the copy follows — design intent: "always symmetric".' : 'Tick "Equal spacing" above to switch the mirror on (re-used checkbox in this mode).';
    }
    s += '</svg>'; box.innerHTML = s; out.textContent = txt;
  }
  draw();
};

/* Day 8: reference planes */
W.planes = el => {
  lab(el);
  const st = form(el, [
    { k: 'm', t: 'seg', o: [['off', 'Offset distance'], ['ang', 'At angle'], ['mid', 'Mid Plane'], ['tan', 'Tangent to cylinder']], v: 'off' },
    { k: 'd', t: 'range', l: 'Offset', min: -30, max: 80, v: 30, u: 'mm' },
    { k: 'a', t: 'range', l: 'Angle', min: 0, max: 90, v: 35, u: '°' },
    { k: 't', t: 'range', l: 'Tangent position', min: 0, max: 180, v: 45, u: '°' }
  ], () => vw.draw());
  const out = div(el, 'out');
  const vw = Viewer(el, () => {
    const F = [...G.box(-50, 50, 0, 40, -30, 30, { c: COL.part })];
    const cyl = G.revolve([[0, 0], [15, 0], [15, 60], [0, 60]], 2 * PI, 32, { c: COL.light }).map(f => Object.assign({}, f, { p: f.p.map(p => [p[0] + 0, p[2] + 40, p[1] - 30 + 0]) }));
    let P;
    if (st.m === 'off') { P = G.quad([0, 40 + st.d, 0], [0, 1, 0], 65, 42, { c: COL.acc, a: 0.35 }); out.textContent = `Plane parallel to the top face, ${st.d} mm ${st.d >= 0 ? 'above' : 'below'} it.\nInsert ▸ Reference Geometry ▸ Plane → first reference: top face → Offset distance ${Math.abs(st.d)} mm${st.d < 0 ? ' with Flip offset' : ''}.`; }
    else if (st.m === 'ang') { const a = rad(st.a), n = [0, Math.cos(a), Math.sin(a)]; P = G.quad([0, 40 + 40 * Math.sin(a), 30 - 40 * Math.cos(a)], n, 40, 65, { c: COL.acc, a: 0.35 }); out.textContent = `Plane through the top-front edge, rotated ${st.a}° from the top face.\nFirst reference: top face (At angle ${st.a}°) · Second reference: the front-top edge (it becomes the hinge).`; }
    else if (st.m === 'mid') { P = G.quad([0, 20, 0], [1, 0, 0], 40, 45, { c: COL.acc, a: 0.35 }); out.textContent = 'Mid Plane: select the left face and the right face → a plane exactly half-way (50 mm from each).\nIf the block gets wider, the plane stays in the middle. Great for mirroring.'; }
    else { F.push(...cyl); const a = rad(st.t), n = [Math.cos(a), Math.sin(a), 0]; P = G.quad(V3.add([0, 40, 0], V3.mul(n, 15)), n, 38, 40, { c: COL.acc, a: 0.35 }); P = G.move(P, [0, 0, 0]); out.textContent = `Plane tangent to the Ø30 cylinder: first reference the cylindrical face (Tangent), second reference the Right Plane rotated ${st.t}°.`; }
    return F.concat(P);
  }, { yaw: -0.7, pitch: 0.45 });
};

/* Day 9: sweep */
W.sweep = el => {
  lab(el);
  const st = form(el, [
    { k: 'pa', t: 'sel', l: 'Path', o: [['hel', 'Helix (spring)'], ['s', 'S-bend pipe'], ['u', 'U-bend handle']], v: 'hel' },
    { k: 'pr', t: 'sel', l: 'Profile', o: [['c', 'Circle'], ['tube', 'Tube (thin)'], ['sq', 'Square']], v: 'c' },
    { k: 'r', t: 'range', l: 'Profile size (r or a/2)', min: 1, max: 14, v: 4, u: 'mm' },
    { k: 'p', t: 'range', l: 'Helix pitch', min: 4, max: 40, v: 14, u: 'mm' },
    { k: 'n', t: 'range', l: 'Turns', min: 1, max: 10, s: 0.5, v: 5 },
    { k: 'tw', t: 'range', l: 'Twist along path', min: 0, max: 720, s: 15, v: 0, u: '°' }
  ], () => vw.draw());
  const out = div(el, 'out');
  const vw = Viewer(el, () => {
    let path = [];
    if (st.pa === 'hel') { const N = Math.round(st.n * 36), R = 25; for (let i = 0; i <= N; i++) { const t = i / N * st.n * 2 * PI; path.push([R * Math.cos(t), st.p * t / (2 * PI), R * Math.sin(t)]); } }
    else if (st.pa === 's') { for (let i = 0; i <= 60; i++) { const u = i / 60; path.push([u * 160 - 80, 30 * Math.sin(u * PI) * 0, 35 * Math.tanh((u - 0.5) * 6)]); } }
    else { for (let i = 0; i <= 12; i++) path.push([-30, 60 - i * 5, 0]); for (let i = 1; i <= 24; i++) { const t = PI - i / 24 * PI; path.push([30 * Math.cos(t), -30 * Math.sin(t) * 0.0 + 0 - 30 * Math.sin(i / 24 * PI), 0]); } for (let i = 1; i <= 12; i++) path.push([30, i * 5, 0]); }
    const r = st.r; let prof;
    if (st.pr === 'sq') prof = [[[-r, -r], [r, -r], [r, r], [-r, r]]];
    else if (st.pr === 'tube') prof = [G.circ(r, 20), G.circ(Math.max(0.5, r * 0.75), 20).reverse()];
    else prof = [G.circ(r, 20)];
    let L = 0; for (let i = 1; i < path.length; i++) L += Math.hypot(...V3.sub(path[i], path[i - 1]));
    const A = st.pr === 'sq' ? 4 * r * r : st.pr === 'tube' ? PI * (r * r - (r * 0.75) ** 2) : PI * r * r;
    out.textContent = `Path length ≈ ${fmt(L, 1)} mm · profile area ${fmt(A, 1)} mm² · volume ≈ A × L = ${fmt(A * L, 0)} mm³` + (st.pa === 'hel' && 2 * r >= st.p ? '\n⚠ Profile is as big as the pitch: the coils touch/intersect. SolidWorks gives a self-intersection error — increase pitch or reduce the wire.' : '') + (st.tw ? `\nTwist ${st.tw}° (Profile orientation: Twist along path) — visible on the square profile.` : '');
    return G.sweep(prof, path, { c: COL.part }, rad(st.tw));
  }, { yaw: -0.5, pitch: 0.35 });
};

/* Day 10: loft */
W.loft = el => {
  lab(el);
  const SH = [['sq', 'Square 60'], ['c', 'Circle Ø60'], ['hex', 'Hexagon 60 A/F'], ['rect', 'Rectangle 90×40'], ['c30', 'Circle Ø30']];
  const st = form(el, [
    { k: 'a', t: 'sel', l: 'Bottom section', o: SH, v: 'sq' },
    { k: 'b', t: 'sel', l: 'Top section', o: SH, v: 'c' },
    { k: 'h', t: 'range', l: 'Height', min: 20, max: 160, v: 90, u: 'mm' },
    { k: 'tw', t: 'range', l: 'Twist (connector)', min: -90, max: 90, s: 5, v: 0, u: '°' },
    { k: 'mid', t: 'chk', l: 'Add middle section', v: false },
    { k: 'ms', t: 'range', l: 'Middle scale', min: 30, max: 200, s: 5, v: 60, u: '%' }
  ], () => vw.draw());
  const out = div(el, 'out'), N = 64;
  const resample = (poly, n) => { const L = [0]; for (let i = 1; i <= poly.length; i++) L.push(L[i - 1] + Math.hypot(poly[i % poly.length][0] - poly[i - 1][0], poly[i % poly.length][1] - poly[i - 1][1])); const T = L[L.length - 1], r = []; let j = 0; for (let k = 0; k < n; k++) { const d = k / n * T; while (L[j + 1] < d) j++; const u = (d - L[j]) / (L[j + 1] - L[j]), a = poly[j], b = poly[(j + 1) % poly.length]; r.push([a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u]); } return r; };
  const shape = k => {
    const a0 = -3 * PI / 4;
    if (k === 'sq') return resample([[-30, -30], [30, -30], [30, 30], [-30, 30]], N);
    if (k === 'rect') return resample([[-45, -20], [45, -20], [45, 20], [-45, 20]], N);
    if (k === 'hex') { const R = 30 / Math.cos(PI / 6), p = []; for (let i = 0; i < 6; i++) p.push([R * Math.cos(a0 + i * PI / 3), R * Math.sin(a0 + i * PI / 3)]); return resample(p, N); }
    const r = k === 'c' ? 30 : 15; return G.circ(r, N, 0, 0, a0);
  };
  const ar = p => { let A = 0; for (let i = 0; i < p.length; i++) { const a = p[i], b = p[(i + 1) % p.length]; A += a[0] * b[1] - b[0] * a[1]; } return Math.abs(A) / 2; };
  const vw = Viewer(el, () => {
    const A = shape(st.a), B = shape(st.b), M = 24, rings = [], tw = rad(st.tw), mS = st.ms / 100;
    const Mid = A.map((p, i) => [(p[0] + B[i][0]) / 2 * mS, (p[1] + B[i][1]) / 2 * mS]);
    for (let k = 0; k <= M; k++) {
      const t = k / M, a = tw * t, c = Math.cos(a), s = Math.sin(a);
      rings.push(A.map((p, i) => { let x, z; if (st.mid) { const l0 = (2 * t - 1) * (t - 1), l1 = -4 * t * (t - 1), l2 = t * (2 * t - 1); x = p[0] * l0 + Mid[i][0] * l1 + B[i][0] * l2; z = p[1] * l0 + Mid[i][1] * l1 + B[i][1] * l2; } else { x = p[0] + (B[i][0] - p[0]) * t; z = p[1] + (B[i][1] - p[1]) * t; } return [x * c - z * s, t * st.h, x * s + z * c]; }));
    }
    const F = []; for (let k = 0; k < M; k++) F.push(...G.ringLoft(rings[k], rings[k + 1], { c: COL.part }, false));
    F.push({ c: COL.part, e: true, p: rings[0] }, { c: COL.part, e: true, p: rings[M] });
    let V = 0; const areas = rings.map(r => ar(r.map(q => [q[0], q[2]]))); for (let k = 0; k < M; k += 2) V += st.h / M / 3 * (areas[k] + 4 * areas[k + 1] + areas[k + 2]);
    out.textContent = `Bottom area ${fmt(areas[0], 0)} mm² → top area ${fmt(areas[M], 0)} mm²\nLoft volume (Simpson's rule over ${M} slices) ≈ ${fmt(V, 0)} mm³` + (Math.abs(st.tw) > 45 ? '\nLarge twist: the side faces wrap and can self-intersect. In SolidWorks drag the green connector dots to control which points join.' : '') + (st.mid ? '\nThree sections: the loft passes smoothly through the middle profile.' : '');
    return F;
  }, { yaw: -0.6, pitch: 0.35 });
};

/* Day 11: Hole Wizard */
const HOLES = { M3: [3, .5, 2.5, 3.2, 3.4, 3.6, 6.5, 3.4, 6.72], M4: [4, .7, 3.3, 4.3, 4.5, 4.8, 8, 4.4, 8.96], M5: [5, .8, 4.2, 5.3, 5.5, 5.8, 10, 5.4, 11.2], M6: [6, 1, 5, 6.4, 6.6, 7, 11, 6.4, 13.44], M8: [8, 1.25, 6.8, 8.4, 9, 10, 15, 8.6, 17.92], M10: [10, 1.5, 8.5, 10.5, 11, 12, 18, 10.6, 22.4], M12: [12, 1.75, 10.2, 13, 13.5, 14.5, 20, 12.6, 26.88], M16: [16, 2, 14, 17, 17.5, 18.5, 26, 16.6, 33.6], M20: [20, 2.5, 17.5, 21, 22, 24, 33, 20.6, 40.32] };
SW.HOLES = HOLES;
W.hole = el => {
  lab(el);
  const st = form(el, [
    { k: 'ty', t: 'seg', l: 'Hole type', o: [['cl', 'Hole (clearance)'], ['cb', 'Counterbore'], ['cs', 'Countersink'], ['tap', 'Straight Tap']], v: 'cb' },
    { k: 'sz', t: 'sel', l: 'Size', o: Object.keys(HOLES), v: 'M8' },
    { k: 'fit', t: 'sel', l: 'Fit', o: [['3', 'Close'], ['4', 'Normal'], ['5', 'Loose']], v: '4' },
    { k: 'T', t: 'range', l: 'Plate thickness', min: 6, max: 40, v: 20, u: 'mm' },
    { k: 'td', t: 'range', l: 'Thread depth (×d)', min: 1, max: 2.5, s: 0.25, v: 1.5 }
  ], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const h = HOLES[st.sz], d = h[0], P = h[1], tap = h[2], cl = h[+st.fit], cbD = h[6], cbH = h[7], csD = h[8] + 0.3, T = st.T;
    const sc = Math.min(9, 260 / Math.max(T * 1.3, cbD * 2.2)), cx = 230, top = 40;
    const X = v => cx + v * sc, Y = v => top + v * sc;
    let prof, txt, extra = '';
    if (st.ty === 'cl') { prof = [[cl / 2, 0], [cl / 2, T]]; txt = `Clearance hole for ${st.sz} (${['', '', '', 'close', 'normal', 'loose'][+st.fit]} fit, ISO 273): Ø${cl} THRU`; }
    else if (st.ty === 'cb') { const dd = Math.min(cbH, T - 1); prof = [[cbD / 2, 0], [cbD / 2, dd], [cl / 2, dd], [cl / 2, T]]; txt = `Counterbore for ${st.sz} socket head cap screw (ISO 4762)\nØ${cl} THRU, ⌴ Ø${cbD} ↧ ${fmt(dd, 1)}\n(typical Hole Wizard values — head sits just below the surface)`; }
    else if (st.ty === 'cs') { const dd = (csD - cl) / 2; prof = [[csD / 2, 0], [cl / 2, dd], [cl / 2, T]]; txt = `Countersink for ${st.sz} flat head screw (ISO 10642, 90°)\nØ${cl} THRU, ⌵ Ø${fmt(csD, 1)} × 90°  (countersink depth ${fmt(dd, 2)} mm)`; }
    else { const td = Math.min(st.td * d, T - 1), dr = Math.min(T, td + 3 * P), tip = (tap / 2) / Math.tan(rad(59)); prof = [[tap / 2, 0], [tap / 2, dr], [0, dr + tip]]; extra = `<line class="b dash" x1="${X(-d / 2)}" y1="${Y(0)}" x2="${X(-d / 2)}" y2="${Y(td)}"/><line class="b dash" x1="${X(d / 2)}" y1="${Y(0)}" x2="${X(d / 2)}" y2="${Y(td)}"/>`; txt = `Tapped hole ${st.sz}×${P} (coarse)\nTap drill Ø${tap}, drill depth ${fmt(dr, 1)} (+118° drill point)\nThread depth ${fmt(td, 1)} mm (${st.td}×d) — shown as thin dashed lines at the major Ø${d} (cosmetic thread)` + (dr >= T ? '\nDrill breaks through the plate: make it Through All or a thicker boss.' : ''); }
        const W0 = X(-Math.max(cbD, csD) * 1.4), W1 = X(Math.max(cbD, csD) * 1.4);
    let s = `<svg viewBox="0 0 540 ${Y(T) + 70}">${HATCH}`;
    const last = prof[prof.length - 1], yb = Math.min(T, last[1]);
    s += `<polygon class="fh" points="${pts([[W0, Y(0)], ...prof.map(p => [X(-p[0]), Y(Math.min(T, p[1]))]), [X(-last[0]), Y(T)], [W0, Y(T)]])}"/>`;
    s += `<polygon class="fh" points="${pts([[W1, Y(0)], ...prof.map(p => [X(p[0]), Y(Math.min(T, p[1]))]), [X(last[0]), Y(T)], [W1, Y(T)]])}"/>`;
    s += extra + `<line class="cl" x1="${cx}" y1="${top - 20}" x2="${cx}" y2="${Y(T) + 20}"/>`;
    s += dimL(W1 + 18, Y(0), W1 + 18, Y(T), '') + `<text x="${W1 + 24}" y="${Y(T / 2)}">T ${T}</text>`;
    s += `<text x="10" y="${Y(T) + 50}" class="s">Section through the hole (hatched = material)</text></svg>`;
    box.innerHTML = s; out.textContent = txt;
  }
  draw();
};

/* Day 12: equations */
W.equations = el => {
  lab(el);
  const ta = document.createElement('textarea'); ta.rows = 9; ta.style.cssText = 'width:100%;font:14.5px JetBrains Mono,monospace;padding:8px;border-radius:8px;border:1px solid var(--rule);background:var(--card);color:var(--ink)';
  ta.value = `"OD" = 160\n"Thk" = 12\n"N" = 6\n"PCD" = "OD" - 40\n"BoltD" = 11\n"Bore" = "OD" / 2\n"Mass_g" = 7.85e-3 * ( pi / 4 * ( "OD" ^ 2 - "Bore" ^ 2 ) - "N" * pi / 4 * "BoltD" ^ 2 ) * "Thk"`;
  el.appendChild(ta); div(el, 'hint', 'Edit the equations — the flange redraws as you type. Global variables are in "double quotes". Allowed: + − × / ^ ( ) pi sqrt() abs() int() iif(a>b, x, y). Try "N" = 8 or "PCD" = "OD" - 10.');
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  const F = { sqrt: Math.sqrt, abs: Math.abs, int: Math.trunc, iif: (c, a, b) => c ? a : b, pi: PI };
  function run() {
    const vars = {}, rows = [];
    ta.value.split('\n').forEach((ln, i) => {
      if (!ln.trim()) return; const m = ln.match(/^\s*"([^"]+)"\s*=\s*(.+)$/);
      if (!m) { rows.push([ln, 'syntax: "Name" = expression']); return; }
      let ex = m[2], miss = null;
      ex = ex.replace(/"([^"]+)"/g, (a, n) => { if (!(n in vars)) { miss = miss || n; return '0'; } return '(' + vars[n] + ')'; });
      if (miss) { rows.push([m[1], `"${miss}" is not defined above — reorder, or tick "Automatically solve order"`]); return; }
      ex = ex.replace(/\^/g, '**');
      const words = ex.match(/[a-z_]+/gi) || [];
      if (words.some(w => !(w in F) && !/^e$/i.test(w)) || /[^0-9a-z_+\-*/().,<>=\s]/i.test(ex)) { rows.push([m[1], 'unknown name or symbol']); return; }
      try { const v = Function(...Object.keys(F), '"use strict";return (' + ex + ')')(...Object.values(F)); if (!Number.isFinite(v)) throw 0; vars[m[1]] = v; rows.push([m[1], v]); } catch (e) { rows.push([m[1], 'cannot evaluate']); }
    });
    out.innerHTML = '<table><tr><th>Name</th><th>Value / error</th></tr>' + rows.map(r => `<tr><td>"${esc(r[0])}"</td><td>${typeof r[1] === 'number' ? fmt(r[1], 3) : '<b style="color:var(--acc2)">⚠ ' + esc(r[1]) + '</b>'}</td></tr>`).join('') + '</table>';
    const OD = vars.OD || 160, PCD = vars.PCD || 120, N = Math.max(1, Math.round(vars.N || 6)), BD = vars.BoltD || 11, Bo = vars.Bore || 80;
    const sc = 280 / Math.max(OD, 1) * 0.95, cx = 160, cy = 160; let s = `<svg viewBox="0 0 320 330"><circle class="fg" cx="${cx}" cy="${cy}" r="${OD / 2 * sc}"/><circle cx="${cx}" cy="${cy}" r="${Bo / 2 * sc}" style="fill:var(--card)" class="k"/><circle class="cl" cx="${cx}" cy="${cy}" r="${PCD / 2 * sc}"/>`;
    for (let i = 0; i < N; i++) { const a = -PI / 2 + i * 2 * PI / N; s += `<circle class="fb" cx="${cx + PCD / 2 * sc * Math.cos(a)}" cy="${cy + PCD / 2 * sc * Math.sin(a)}" r="${BD / 2 * sc}"/>`; }
    const warn = []; if (PCD / 2 + BD / 2 > OD / 2) warn.push('bolt holes break out of the OD'); if (PCD / 2 - BD / 2 < Bo / 2) warn.push('bolt holes cut into the bore'); if (N * BD > PI * PCD) warn.push('holes overlap each other');
    s += `<text x="8" y="322" class="${warn.length ? 'ot' : 's'}">${warn.length ? '⚠ ' + warn.join('; ') : `OD ${fmt(OD, 1)} · PCD ${fmt(PCD, 1)} · ${N} × Ø${fmt(BD, 1)} · bore ${fmt(Bo, 1)}`}</text></svg>`;
    box.innerHTML = s;
  }
  ta.oninput = run; run();
};

/* Day 13: configurations / design table */
W.config = el => {
  lab(el);
  const rows = [['M6x20', 6, 20, 10, 4, 'U'], ['M8x25', 8, 25, 13, 5.3, 'U'], ['M10x30', 10, 30, 16, 6.4, 'U'], ['M12x40', 12, 40, 18, 7.5, 'S'], ['M16x50', 16, 50, 24, 10, 'U']];
  const head = ['$CONFIGURATION', 'D@Sketch1 (thread Ø)', 'L@Boss-Extrude2', 'S@Sketch2 (across flats)', 'K@Boss-Extrude1 (head)', '$STATE@Chamfer1'];
  let act = 0; const tb = div(el), row = div(el, 'row'), box = div(row), out = div(row, 'out');
  const add = div(el, 'ctl', '<button data-a="add">+ Add configuration row</button><span class="hint">Edit any cell. In SolidWorks: Insert ▸ Tables ▸ Design Table opens an embedded Excel sheet like this.</span>');
  add.onclick = e => { if (e.target.dataset.a) { rows.push(['M20x60', 20, 60, 30, 12.5, 'U']); act = rows.length - 1; table(); draw(); } };
  function table() {
    tb.innerHTML = '<table class="mono"><tr>' + head.map(h => `<th>${h}</th>`).join('') + '</tr>' + rows.map((r, i) => `<tr data-i="${i}" style="${i === act ? 'background:var(--hi);font-weight:700' : ''}">` + r.map((c, j) => `<td contenteditable="true" data-j="${j}">${c}</td>`).join('') + '</tr>').join('') + '</table>';
    $$('td', tb).forEach(td => { td.onfocus = () => { act = +td.parentElement.dataset.i; draw(); $$('tr', tb).forEach((t, k) => t.style.cssText = k - 1 === act ? 'background:var(--hi);font-weight:700' : ''); }; td.oninput = () => { const i = +td.parentElement.dataset.i, j = +td.dataset.j, v = td.textContent.trim(); rows[i][j] = j === 0 || j === 5 ? v : parseFloat(v) || 0; draw(); }; });
  }
  function draw() {
    const r = rows[act], D = r[1], L = r[2], S = r[3], K = r[4], ch = String(r[5]).toUpperCase() !== 'S';
    const sc = Math.min(10, 360 / (L + K + 10)), x0 = 40, cy = 110, X = v => x0 + v * sc;
    const E = S / Math.cos(PI / 6);
    let s = `<svg viewBox="0 0 440 220"><rect class="fb" x="${X(0)}" y="${cy - E / 2 * sc}" width="${K * sc}" height="${E * sc}"/><line class="k" x1="${X(0)}" y1="${cy - S / 2 * sc}" x2="${X(K)}" y2="${cy - S / 2 * sc}"/><line class="k" x1="${X(0)}" y1="${cy + S / 2 * sc}" x2="${X(K)}" y2="${cy + S / 2 * sc}"/>`;
    const c = ch ? Math.min(D * 0.12, 1.5) : 0;
    s += `<polygon class="fb" points="${pts([[X(K), cy - D / 2 * sc], [X(K + L - c), cy - D / 2 * sc], [X(K + L), cy - (D / 2 - c) * sc], [X(K + L), cy + (D / 2 - c) * sc], [X(K + L - c), cy + D / 2 * sc], [X(K), cy + D / 2 * sc]])}"/>`;
    const tl = Math.min(L, 2 * D + 6); s += `<line class="k dash" x1="${X(K + L - tl)}" y1="${cy - D / 2 * sc * 0.8}" x2="${X(K + L)}" y2="${cy - D / 2 * sc * 0.8}"/><line class="k dash" x1="${X(K + L - tl)}" y1="${cy + D / 2 * sc * 0.8}" x2="${X(K + L)}" y2="${cy + D / 2 * sc * 0.8}"/>`;
    s += dimL(X(K), cy + E / 2 * sc + 22, X(K + L), cy + E / 2 * sc + 22, 'L ' + L) + `<line class="cl" x1="${X(-5)}" y1="${cy}" x2="${X(K + L + 5)}" y2="${cy}"/></svg>`;
    box.innerHTML = s;
    out.textContent = `Active configuration: ${r[0]}\nThread Ø${D}, length ${L}, head ${S} A/F × ${K}\nChamfer1 is ${ch ? 'Unsuppressed (U)' : 'Suppressed (S) — the end is square'}\nThread length shown ≈ 2d + 6 (ISO 4014 rule for L ≤ 125); ISO 4017 bolts are threaded fully.`;
  }
  table(); draw();
};

/* Day 14: mass properties */
const MATS = [['Plain Carbon Steel', 7800], ['AISI 304 stainless', 8000], ['6061-T6 aluminium', 2700], ['Ti-6Al-4V titanium', 4430], ['Brass', 8500], ['Grey cast iron', 7200], ['ABS plastic', 1020], ['Nylon 6/10', 1400]];
W.mass = el => {
  lab(el);
  const st = form(el, [
    { k: 'sh', t: 'seg', o: [['blk', 'Block'], ['cyl', 'Solid cylinder'], ['tube', 'Tube']], v: 'blk' },
    { k: 'a', t: 'num', l: 'L (or length)', v: 120, min: 1, u: 'mm' },
    { k: 'b', t: 'num', l: 'W (or OD)', v: 60, min: 1, u: 'mm' },
    { k: 'c', t: 'num', l: 'H (or ID)', v: 30, min: 0, u: 'mm' },
    { k: 'm', t: 'sel', l: 'Material', o: MATS.map((m, i) => [i, m[0] + ' (' + m[1] + ' kg/m³)']), v: '0' }
  ], () => vw.draw());
  const row = div(el, 'row'), left = div(row), out = div(row, 'out');
  const vw = Viewer(left, () => {
    const rho = MATS[+st.m][1] * 1e-9, L = st.a, A = st.b, B = st.c; let V, S, I, txt, F;
    if (st.sh === 'blk') { V = L * A * B; S = 2 * (L * A + L * B + A * B); const m = rho * V; I = [m / 12 * (A * A + B * B), m / 12 * (L * L + A * A), m / 12 * (L * L + B * B)]; txt = `CoG at (${fmt(L / 2, 1)}, ${fmt(B / 2, 1)}, ${fmt(A / 2, 1)}) from the corner`; F = G.box(0, L, 0, B, 0, A, { c: COL.part }); }
    else { const ro = A / 2, ri = st.sh === 'tube' ? Math.min(B / 2, ro - 0.5) : 0; V = PI * (ro * ro - ri * ri) * L; S = 2 * PI * (ro + ri) * L + 2 * PI * (ro * ro - ri * ri); const m = rho * V; I = [m / 2 * (ro * ro + ri * ri), m / 12 * (3 * (ro * ro + ri * ri) + L * L), m / 12 * (3 * (ro * ro + ri * ri) + L * L)]; txt = `CoG on the axis, ${fmt(L / 2, 1)} mm along it`; F = G.rot(G.revolve(ri > 0 ? [[ri, 0], [ro, 0], [ro, L], [ri, L]] : [[0, 0], [ro, 0], [ro, L], [0, L]], 2 * PI, 40, { c: COL.part }), 'z', -PI / 2); }
    const m = rho * V;
    out.textContent = `Volume        ${fmt(V, 0)} mm³\nSurface area  ${fmt(S, 0)} mm²\nDensity       ${MATS[+st.m][1]} kg/m³ = ${fmt(MATS[+st.m][1] * 1e-6, 5)} g/mm³\nMass          ${fmt(m * 1000, 1)} g  (${fmt(m, 3)} kg)\n${txt}\nPrincipal moments of inertia at the centroid (kg·mm²)\n  ${st.sh === 'blk' ? 'Ix (along L)' : 'I axial'}  ${fmt(I[0], 1)}\n  ${st.sh === 'blk' ? 'Iy (along H)' : 'I transverse'}  ${fmt(I[1], 1)}\n  ${st.sh === 'blk' ? 'Iz (along W)' : 'I transverse'}  ${fmt(I[2], 1)}\nCompare with Evaluate ▸ Mass Properties in SolidWorks.`;
    return F;
  }, { yaw: -0.7, pitch: 0.45 });
};

/* Day 15: draft analysis */
W.draft = el => {
  lab(el);
  const st = form(el, [
    { k: 'a', t: 'range', l: 'Draft angle on walls', min: 0, max: 5, s: 0.25, v: 1, u: '°' },
    { k: 'req', t: 'range', l: 'Required draft (analysis)', min: 0.25, max: 3, s: 0.25, v: 1, u: '°' },
    { k: 'h', t: 'range', l: 'Cup height', min: 20, max: 120, v: 80, u: 'mm' },
    { k: 't', t: 'range', l: 'Wall', min: 1, max: 5, s: 0.5, v: 2.5, u: 'mm' },
    { k: 'rt', t: 'range', l: 'Rib thickness', min: 0.5, max: 5, s: 0.25, v: 1.5, u: 'mm' }
  ], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const a = rad(st.a), h = st.h, t = st.t, Wt = 100, sc = 2.2, cx = 230, by = 300, top = by - h * sc;
    const off = h * Math.tan(a), ob = Wt / 2 - off; // outer half width at bottom
    const cls = ang => ang + 1e-9 >= st.req ? 'pos' : ang <= -st.req + 1e-9 ? 'neg' : 'req';
    const wallOuter = cls(-st.a), wallInner = cls(st.a);
    const sty = { pos: 'stroke:var(--pri);stroke-width:7', neg: 'stroke:var(--acc);stroke-width:7', req: 'stroke:var(--soft);stroke-width:7;stroke-dasharray:4 4' };
    const X = v => cx + v * sc;
    const oL = [[X(-Wt / 2), top], [X(-ob), by]], oR = [[X(Wt / 2), top], [X(ob), by]];
    const ib = ob - t, it = Wt / 2 - t; const iL = [[X(-it), top], [X(-ib), by - t * sc]], iR = [[X(it), top], [X(ib), by - t * sc]];
    let s = `<svg viewBox="0 0 470 360">${HATCH}<polygon class="fh" points="${pts([oL[0], oL[1], oR[1], oR[0], iR[0], iR[1], iL[1], iL[0]])}"/>`;
    const ln = (p, st2) => `<line x1="${p[0][0]}" y1="${p[0][1]}" x2="${p[1][0]}" y2="${p[1][1]}" style="${st2}"/>`;
    s += ln(oL, sty[wallOuter]) + ln(oR, sty[wallOuter]) + ln(iL, sty[wallInner]) + ln(iR, sty[wallInner]);
    s += ln([[X(-ob), by], [X(ob), by]], sty.neg) + ln([[X(-ib), by - t * sc], [X(ib), by - t * sc]], sty.pos) + ln([[X(-Wt / 2), top], [X(-it), top]], sty.pos) + ln([[X(it), top], [X(Wt / 2), top]], sty.pos);
    s += `<line class="b" x1="40" y1="${by}" x2="40" y2="${top - 10}"/>${arrow(40, top - 14, -PI / 2, 12)}<text x="48" y="${top}" class="bt">Direction of pull</text>`;
    s += `<text x="${X(Wt / 2) + 8}" y="${(top + by) / 2}" class="s">outer wall</text><text x="${X(-it) + 6}" y="${(top + by) / 2 + 24}" class="s">inner wall</text></svg>`;
    box.innerHTML = s;
    const word = { pos: 'POSITIVE draft (SW: green) — shown solid blue', neg: 'NEGATIVE draft (SW: red) — shown solid orange', req: 'REQUIRES DRAFT (SW: yellow) — shown grey dashed' };
    const ratio = st.rt / t;
    out.style.whiteSpace = 'normal';
    out.innerHTML = `Inner (core) walls: <b>${word[wallInner]}</b><br>Outer (cavity) walls: <b>${word[wallOuter]}</b><br>Outer width ${Wt} mm at the rim → ${fmt(2 * ob, 2)} mm at the base (each wall moves in by h·tanθ = ${fmt(off, 2)} mm).<br><br>Rib ${st.rt} mm on a ${t} mm wall = <b>${fmt(ratio * 100, 0)} %</b> of wall: ${ratio <= 0.6 ? 'good — little risk of sink marks.' : ratio <= 0.75 ? 'acceptable for low-shrink materials; watch for sink.' : 'too thick — sink marks likely on the opposite face. Keep ribs at 50–60 % of the wall.'}<br><span class="hint">Rule of thumb: rib height ≤ 3 × wall, draft 0.5–1° per side, root radius 0.25–0.5 × wall.</span>`;
  }
  draw();
};

/* Day 16: assembly mates and degrees of freedom */
W.mates = el => {
  lab(el);
  const M = [
    ['m1', 'Coincident: bracket bottom face ↔ base top face', ['Ty', 'Rx', 'Rz']],
    ['m2', 'Concentric: bracket hole ↔ pin', ['Tx', 'Tz', 'Rx', 'Rz']],
    ['m3', 'Parallel: bracket front face ↔ base front face', ['Rx', 'Ry']],
    ['m4', 'Distance 20 mm: bracket front face ↔ base front face', ['Tz', 'Rx', 'Ry']],
    ['m5', 'Coincident: bracket right face ↔ base right face', ['Tx', 'Ry', 'Rz']],
    ['m6', 'Lock (bracket to base)', ['Tx', 'Ty', 'Tz', 'Rx', 'Ry', 'Rz']]
  ];
  const on = new Set();
  const bar = div(el, 'ctl', M.map(m => `<label><input type="checkbox" data-m="${m[0]}"> ${m[1]}</label>`).join(''));
  const row = div(el, 'row'), left = div(row), out = div(row, 'out'); left.style.flex = '2 1 420px'; out.style.whiteSpace = 'normal';
  let ph = 0; const an = animCtl(div(el, 'ctl'), el, dt => { ph += dt * 1.6; vw.draw(); }, () => { ph += 0.5; vw.draw(); });
  function calc() {
    const rem = new Set(['Tx', 'Ty', 'Tz', 'Rx', 'Ry', 'Rz']), red = [];
    M.forEach(m => { if (!on.has(m[0])) return; const before = rem.size; m[2].forEach(d => rem.delete(d)); if (rem.size === before) red.push(m[1].split(':')[0]); });
    const conflict = on.has('m4') && on.has('m5') && on.has('m2');
    return { rem, red, conflict };
  }
  bar.onchange = e => { const k = e.target.dataset.m; e.target.checked ? on.add(k) : on.delete(k); vw.draw(); };
  const vw = Viewer(left, () => {
    const c = calc(), F = [...G.box(-70, 70, -10, 0, -45, 45, { c: COL.grey })];
    F.push(...G.revolve([[0, 0], [5, 0], [5, 35], [0, 35]], 2 * PI, 20, { c: COL.dark }));
    let br = G.prism([[-20, -15], [20, -15], [20, 15], [-20, 15]], 0, 14, { c: COL.part }, [G.circ(5.5, 20).reverse()]);
    const A = (k, amp, f) => c.rem.has(k) ? amp * Math.sin(ph * f) : 0;
    const base = on.size ? [0, 0, 0] : [35, 25, 10];
    if (c.rem.has('Rx')) br = G.rot(br, 'x', A('Rx', 0.35, 1.1), [0, 7, 0]);
    if (c.rem.has('Rz')) br = G.rot(br, 'z', A('Rz', 0.35, 0.9), [0, 7, 0]);
    if (c.rem.has('Ry')) br = G.rot(br, 'y', A('Ry', 0.6, 1.3), [0, 7, 0]);
    br = G.move(br, [base[0] + A('Tx', 18, 1.2), base[1] + A('Ty', 12, 0.8), base[2] + A('Tz', 15, 1.0)]);
    F.push(...br);
    const st = c.conflict ? 'over' : c.rem.size ? 'under' : 'full';
    out.innerHTML = `<b>Free degrees of freedom</b><br>${['Tx', 'Ty', 'Tz', 'Rx', 'Ry', 'Rz'].map(d => `<span class="chip ${c.rem.has(d) ? '' : 'off'}">${d}</span>`).join('')}<br><br>FeatureManager shows: <b class="mono">${st === 'over' ? '(+) Bracket<1>  — over defined' : st === 'under' ? '(-) Bracket<1>  — under defined' : 'Bracket<1>  — fully defined'}</b>` + (c.red.length ? `<br><br>Adds nothing new: ${c.red.join(', ')} (redundant — avoid it).` : '') + (c.conflict ? '<br><br><b style="color:var(--acc2)">Conflict:</b> the pin already fixes X and Z through the hole, so a right-face coincident and a distance on the front face fight it. SolidWorks flags the mates with errors.' : '') + '<br><br><span class="hint">Press <kbd>P</kbd> to drag the bracket: anything still free will move. Typical full definition: Coincident + Concentric + Parallel.</span>';
    return F;
  }, { yaw: -0.6, pitch: 0.5, fixed: { c: [0, 10, 0], R: 85 } });
};

/* Day 17: gear mate */
W.gears = el => {
  lab(el);
  const st = form(el, [
    { k: 'n1', t: 'range', l: 'Pinion teeth N1', min: 10, max: 40, v: 17 },
    { k: 'n2', t: 'range', l: 'Gear teeth N2', min: 10, max: 80, v: 42 },
    { k: 'm', t: 'sel', l: 'Module', o: ['1', '1.5', '2', '2.5', '3'], v: '2' },
    { k: 'rpm', t: 'num', l: 'Pinion speed', v: 1450, min: 1, u: 'rpm' }
  ], build);
  const box = div(el), out = div(el, 'out'); let th = 0, P1 = '', P2 = '', geo = {};
  animCtl(div(el, 'ctl'), el, dt => { th += dt * 1.2; pose(); }, () => { th += 2 * PI / st.n1; pose(); });
  const gp = (N, m) => { const r = m * N / 2, ra = r + m, rr = r - 1.25 * m, tau = 2 * PI / N; let d = ''; for (let i = 0; i < N; i++) { const a = i * tau; [[rr, -0.5], [rr, -0.27], [ra, -0.13], [ra, 0.13], [rr, 0.27]].forEach((q, j) => { const t = a + q[1] * tau, x = q[0] * Math.cos(t), y = q[0] * Math.sin(t); d += (i === 0 && j === 0 ? 'M' : 'L') + x.toFixed(2) + ',' + y.toFixed(2); }); } return d + 'Z'; };
  function build() {
    const m = +st.m, r1 = m * st.n1 / 2, r2 = m * st.n2 / 2, a = r1 + r2, sc = 560 / (2 * (r1 + r2) + 4 * m);
    geo = { m, r1, r2, a, sc, cx1: 20 + (r1 + m) * sc, cy: (Math.max(r1, r2) + m) * sc + 15 }; geo.cx2 = geo.cx1 + a * sc; geo.H = geo.cy * 2;
    box.innerHTML = `<svg viewBox="0 0 600 ${geo.H}"><g transform="translate(${geo.cx1},${geo.cy}) scale(${sc})"><path id="g1" class="fb" style="stroke-width:${2 / sc}" d="${gp(st.n1, m)}"/><line x1="0" y1="0" x2="${r1 * 0.7}" y2="0" style="stroke:var(--acc);stroke-width:${4 / sc}" id="k1"/><circle r="${m * 2}" class="fi"/></g><g transform="translate(${geo.cx2},${geo.cy}) scale(${sc})"><path id="g2" class="fg" style="stroke-width:${2 / sc}" d="${gp(st.n2, m)}"/><line x1="0" y1="0" x2="${-r2 * 0.7}" y2="0" style="stroke:var(--acc);stroke-width:${4 / sc}" id="k2"/><circle r="${m * 2}" class="fi"/></g><circle class="cl" cx="${geo.cx1}" cy="${geo.cy}" r="${r1 * sc}"/><circle class="cl" cx="${geo.cx2}" cy="${geo.cy}" r="${r2 * sc}"/></svg>`;
    const i = st.n2 / st.n1;
    out.textContent = `Pitch Ø: d1 = m·N1 = ${fmt(m * st.n1, 1)} mm, d2 = m·N2 = ${fmt(m * st.n2, 1)} mm\nCentre distance a = m(N1+N2)/2 = ${fmt(a, 2)} mm\nRatio i = N2/N1 = ${fmt(i, 3)} : 1  → output ${fmt(st.rpm / i, 1)} rpm, torque × ${fmt(i, 3)} (ideal)\nGear mate ratio in SolidWorks: ${fmt(m * st.n1, 1)} mm : ${fmt(m * st.n2, 1)} mm (pitch diameters), "Reverse" unticked for external gears.`;
    pose();
  }
  function pose() { const g1 = $('#g1', box), g2 = $('#g2', box); if (!g1) return; const a2 = PI - PI / st.n2 - th * st.n1 / st.n2; $('#g1', box).parentNode.setAttribute('transform', `translate(${geo.cx1},${geo.cy}) scale(${geo.sc}) rotate(${deg(th)})`); g2.parentNode.setAttribute('transform', `translate(${geo.cx2},${geo.cy}) scale(${geo.sc}) rotate(${deg(a2)})`); }
  build();
};

/* Day 18: bolt length */
const NUTM = { M6: 5.2, M8: 6.8, M10: 8.4, M12: 10.8, M16: 14.8, M20: 18 }, WASH = { M6: 1.6, M8: 1.6, M10: 2, M12: 2.5, M16: 3, M20: 3 }, LSTD = [10, 12, 16, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 180, 200];
W.boltlen = el => {
  lab(el);
  const st = form(el, [
    { k: 'j', t: 'seg', o: [['nut', 'Bolt + nut (through)'], ['tap', 'Screw into tapped hole']], v: 'nut' },
    { k: 'sz', t: 'sel', l: 'Size', o: Object.keys(NUTM), v: 'M10' },
    { k: 'g', t: 'range', l: 'Clamped thickness', min: 4, max: 80, v: 24, u: 'mm' },
    { k: 'w', t: 'chk', l: 'Washer under head', v: true },
    { k: 'w2', t: 'chk', l: 'Washer under nut', v: true },
    { k: 'mat', t: 'sel', l: 'Tapped material', o: [['1', 'Steel (1.0 d)'], ['1.5', 'Cast iron (1.5 d)'], ['2', 'Aluminium (2.0 d)']], v: '1' }
  ], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const h = HOLES[st.sz], d = h[0], P = h[1], wt = WASH[st.sz], m = NUTM[st.sz];
    let need, L, eng, txt;
    if (st.j === 'nut') { need = st.g + (st.w ? wt : 0) + (st.w2 ? wt : 0) + m + 2 * P; L = LSTD.find(v => v >= need) || 200; txt = `Minimum length = clamp ${st.g} + washers ${fmt((st.w ? wt : 0) + (st.w2 ? wt : 0), 1)} + nut ${m} + 2 pitches ${fmt(2 * P, 2)} = ${fmt(need, 2)} mm\n→ choose standard length ${st.sz}×${L} (protrudes ${fmt(L - need + 2 * P, 2)} mm beyond the nut)`; }
    else { eng = +st.mat * d; need = st.g + (st.w ? wt : 0) + eng; L = LSTD.find(v => v >= need) || 200; const actual = L - st.g - (st.w ? wt : 0); txt = `Engagement wanted ${st.mat} × d = ${fmt(eng, 1)} mm → minimum length ${fmt(need, 1)} mm\n→ choose ${st.sz}×${L}: actual engagement ${fmt(actual, 1)} mm\nTapped thread depth should be ≥ ${fmt(actual + 2 * P, 1)} mm (engagement + 2P) so the screw never bottoms out.`; }
    const sc = Math.min(4, 300 / (L + 20)), x = 200, y0 = 30, Y = v => y0 + v * sc, hd = 0.7 * d;
    let s = `<svg viewBox="0 0 420 ${Y(L + hd + 30)}">${HATCH}<rect class="fb" x="${x - d * 0.85 * sc}" y="${Y(0)}" width="${d * 1.7 * sc}" height="${hd * sc}"/>`;
    let yy = hd; if (st.w) { s += `<rect class="fg" x="${x - d * sc}" y="${Y(yy)}" width="${2 * d * sc}" height="${wt * sc}"/>`; yy += wt; }
    s += `<rect class="fh" x="${x - 3 * d * sc}" y="${Y(yy)}" width="${6 * d * sc}" height="${(st.j === 'nut' ? st.g : st.g + 3 * d) * sc}"/><line class="k" x1="${x - 3 * d * sc}" y1="${Y(yy + st.g)}" x2="${x + 3 * d * sc}" y2="${Y(yy + st.g)}" style="stroke-width:2.5"/>`;
    s += `<rect class="fb" x="${x - d / 2 * sc}" y="${Y(hd)}" width="${d * sc}" height="${L * sc}"/>`;
    yy += st.g;
    if (st.j === 'nut') { if (st.w2) { s += `<rect class="fg" x="${x - d * sc}" y="${Y(yy)}" width="${2 * d * sc}" height="${wt * sc}"/>`; yy += wt; } s += `<rect class="fo" x="${x - d * 0.85 * sc}" y="${Y(yy)}" width="${d * 1.7 * sc}" height="${m * sc}"/>`; }
    s += dimL(x + 3 * d * sc + 20, Y(hd), x + 3 * d * sc + 20, Y(hd + L), '') + `<text x="${x + 3 * d * sc + 26}" y="${Y(hd + L / 2)}">L ${L}</text></svg>`;
    box.innerHTML = s; out.textContent = txt + `\nNut thickness m (ISO 4032) ${m} mm · washer (ISO 7089) ${wt} mm · coarse pitch ${P} mm`;
  }
  draw();
};

/* Day 19: top-down design */
W.topdown = el => {
  lab(el);
  const st = form(el, [
    { k: 'C', t: 'range', l: 'Skeleton: shaft centre distance', min: 70, max: 150, v: 100, u: 'mm' },
    { k: 'D', t: 'sel', l: 'Bearing OD', o: ['32', '35', '40', '47'], v: '35' },
    { k: 'mode', t: 'seg', o: [['td', 'Top-down (in-context)'], ['bu', 'Bottom-up (typed values)']], v: 'td' },
    { k: 'lock', t: 'chk', l: 'Lock external references', v: false }
  ], draw);
  const box = div(el), out = div(el, 'out'); let locked = null;
  function draw() {
    if (st.lock && !locked) locked = { C: st.C, D: +st.D }; if (!st.lock) locked = null;
    const sk = { C: st.C, D: +st.D }, part = st.mode === 'bu' ? { C: 100, D: 35 } : locked || sk;
    const sc = 1.5, ox = 70, cy = 120;
    const plate = (x0, title, p) => { let s = `<rect class="fg" x="${x0}" y="${cy - 55}" width="${(p.C + 80) * sc * 0.75}" height="110" rx="8"/><text x="${x0}" y="${cy - 64}">${title}</text>`; const c1 = x0 + 40 * sc * 0.75; [0, p.C].forEach(dx => s += `<circle cx="${c1 + dx * sc * 0.75}" cy="${cy}" r="${p.D / 2 * sc * 0.75}" class="k" style="fill:var(--card)"/>`); if (p !== sk && (p.C !== sk.C || p.D !== sk.D)) [0, sk.C].forEach(dx => s += `<circle cx="${c1 + dx * sc * 0.75}" cy="${cy}" r="${sk.D / 2 * sc * 0.75}" class="o dash"/>`); return s; };
    let s = `<svg viewBox="0 0 760 260"><text x="10" y="20" class="bt">Skeleton (layout sketch in the assembly)</text><line class="b" x1="${ox}" y1="40" x2="${ox + st.C * sc * 0.75}" y2="40"/><circle cx="${ox}" cy="40" r="4" class="fp"/><circle cx="${ox + st.C * sc * 0.75}" cy="40" r="4" class="fp"/><text x="${ox + st.C * sc * 0.75 + 10}" y="44" class="bt">C = ${st.C}, bearing Ø${st.D}</text>`;
    s += plate(20, 'Housing.SLDPRT' + (st.mode === 'td' ? (st.lock ? ' ->*' : ' ->') : ''), part) + plate(400, 'Cover.SLDPRT' + (st.mode === 'td' ? (st.lock ? ' ->*' : ' ->') : ''), part) + '</svg>';
    box.innerHTML = s;
    const mis = part.C !== sk.C || part.D !== sk.D;
    out.textContent = (st.mode === 'td' ? (st.lock ? `References locked (->*) at C = ${part.C}, Ø${part.D}. The parts ignore the skeleton until you unlock (List External Refs ▸ Unlock All).` : 'Both parts were sketched in the context of the assembly, so their bores reference the skeleton (-> after the name). Move the slider — they follow.') : 'Bottom-up: each part was drawn with typed numbers (C = 100, Ø35). Change the skeleton and nothing updates.') + (mis ? '\n⚠ Bores (black) no longer match the skeleton (dashed orange): the shafts will not fit.' : '\n✓ Bores match the skeleton.');
  }
  draw();
};

/* Day 20: exploded view */
W.explode = el => {
  lab(el);
  const st = form(el, [{ k: 'e', t: 'range', l: 'Explode', min: 0, max: 100, v: 0, u: '%' }], () => vw.draw());
  let e = 0, dir = 1; const ctl = div(el, 'ctl');
  animCtl(ctl, el, dt => { e += dir * dt * 0.5; if (e > 1) { e = 1; dir = -1; } if (e < 0) { e = 0; dir = 1; } sync(); }, () => { e = Math.round((e + 0.25) * 4) / 4; if (e > 1) e = 0; sync(); });
  const sync = () => { st.e = Math.round(e * 100); st._el.e.value = st.e; st._el.e._show(); vw.draw(); };
  div(el, 'legend', '<span><i style="background:rgb(170,178,190)"></i>Housing</span><span><i style="background:rgb(80,135,210)"></i>Bearing 6204</span><span><i style="background:rgb(235,150,65)"></i>Shaft</span><span><i style="background:rgb(160,200,245)"></i>Cover</span><span><i style="background:rgb(85,92,105)"></i>Cap screws ×4</span>');
  const parts = [
    [G.revolve([[21, 0], [56, 0], [56, 8], [33, 8], [33, 36], [21, 36]], 2 * PI, 40, { c: COL.grey }), 0],
    [G.revolve([[10, 14], [21, 14], [21, 28], [10, 28]], 2 * PI, 32, { c: COL.part }), 45],
    [G.revolve([[0, -30], [10, -30], [10, 60], [7, 60], [7, 90], [0, 90]], 2 * PI, 28, { c: COL.acc }), -70],
    [G.revolve([[12, 36], [42, 36], [42, 42], [12, 42]], 2 * PI, 36, { c: COL.light }), 85]
  ];
  for (let k = 0; k < 4; k++) { const a = PI / 4 + k * PI / 2; parts.push([G.move(G.revolve([[0, 8], [3, 8], [3, -12], [0, -12]].map(q => q).concat([]), 2 * PI, 10, { c: COL.dark }).concat(G.revolve([[0, 8], [5, 8], [5, 13], [0, 13]], 2 * PI, 12, { c: COL.dark })), [46 * Math.cos(a), 0, 46 * Math.sin(a)]), 125]); }
  const vw = Viewer(el, () => { const f = st.e / 100; let F = []; parts.forEach(p => F = F.concat(G.move(p[0], [0, p[1] * f, 0]))); return F; }, { yaw: -0.6, pitch: 0.4, fixed: { c: [0, 25, 0], R: 125 } });
};

/* Day 21: sheet metal */
W.sheet = el => {
  lab(el);
  const st = form(el, [
    { k: 'T', t: 'range', l: 'Thickness T', min: 0.5, max: 6, s: 0.1, v: 2, u: 'mm' },
    { k: 'R', t: 'range', l: 'Inside radius R', min: 0.5, max: 10, s: 0.5, v: 2, u: 'mm' },
    { k: 'A', t: 'range', l: 'Bend angle', min: 15, max: 150, v: 90, u: '°' },
    { k: 'K', t: 'range', l: 'K-factor', min: 0.25, max: 0.5, s: 0.01, v: 0.44 },
    { k: 'L1', t: 'range', l: 'Flange 1 (to virtual sharp)', min: 10, max: 120, v: 50, u: 'mm' },
    { k: 'L2', t: 'range', l: 'Flange 2 (to virtual sharp)', min: 10, max: 120, v: 30, u: 'mm' }
  ], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const { T, R, K, L1, L2 } = st, A = rad(st.A), BA = A * (R + K * T), OSSB = Math.tan(A / 2) * (R + T), BD = 2 * OSSB - BA, a1 = L1 - OSSB, a2 = L2 - OSSB, flat = L1 + L2 - BD;
    const sc = Math.min(3.2, 300 / (L1 + L2)), ox = 40, oy = 200;
    const P = (x, y) => [ox + x * sc, oy - y * sc];
    const inner = [], outer = [];
    const n = 16, cxy = [a1, R];
    inner.push(P(0, 0)); outer.push(P(0, -T));
    for (let i = 0; i <= n; i++) { const t = -PI / 2 + A * i / n; inner.push(P(cxy[0] + R * Math.cos(t), cxy[1] + R * Math.sin(t))); outer.push(P(cxy[0] + (R + T) * Math.cos(t), cxy[1] + (R + T) * Math.sin(t))); }
    const e1 = [cxy[0] + R * Math.cos(A - PI / 2), cxy[1] + R * Math.sin(A - PI / 2)], e2 = [cxy[0] + (R + T) * Math.cos(A - PI / 2), cxy[1] + (R + T) * Math.sin(A - PI / 2)], dv = [Math.cos(A), Math.sin(A)];
    inner.push(P(e1[0] + dv[0] * Math.max(0, a2), e1[1] + dv[1] * Math.max(0, a2))); outer.push(P(e2[0] + dv[0] * Math.max(0, a2), e2[1] + dv[1] * Math.max(0, a2)));
    let s = `<svg viewBox="0 0 460 380"><text x="10" y="18" class="s">Bent part (side view)</text><polygon class="fb" points="${pts(inner.concat(outer.reverse()))}"/>`;
    const vs = P(L1, -T); s += `<circle cx="${vs[0]}" cy="${vs[1]}" r="4" class="fa"/><text x="${vs[0] + 6}" y="${vs[1] + 14}" class="ot">virtual sharp</text>`;
    const fy = 300, fs = Math.min(3.2, 400 / flat); s += `<text x="10" y="${fy - 12}" class="s">Flat pattern (length ${fmt(flat, 2)} mm)</text><rect class="fg" x="20" y="${fy}" width="${flat * fs}" height="40"/><rect class="fo" x="${20 + a1 * fs}" y="${fy}" width="${BA * fs}" height="40"/><line class="cl" x1="${20 + (a1 + BA / 2) * fs}" y1="${fy - 6}" x2="${20 + (a1 + BA / 2) * fs}" y2="${fy + 46}"/></svg>`;
    box.innerHTML = s;
    out.textContent = `Bend allowance  BA = θ·(R + K·T) = ${fmt(BA, 3)} mm\nOutside setback OSSB = tan(θ/2)·(R + T) = ${fmt(OSSB, 3)} mm\nBend deduction  BD = 2·OSSB − BA = ${fmt(BD, 3)} mm\nFlat length = L1 + L2 − BD = ${fmt(flat, 3)} mm\n  = flat 1 (${fmt(a1, 2)}) + BA (${fmt(BA, 2)}) + flat 2 (${fmt(a2, 2)})` + (a1 < 0 || a2 < 0 ? '\n⚠ A flange is shorter than the setback — it cannot be bent.' : '') + `\nSolidWorks: Sheet-Metal feature ▸ Bend Allowance ▸ K-Factor ${K}. Typical K: 0.33 (soft, R < T) to 0.5 (R > 3T).`;
  }
  draw();
};

/* Day 22: orthographic projection */
W.proj = el => {
  lab(el);
  const st = form(el, [{ k: 'p', t: 'seg', o: [['1', 'First angle (ISO · India, IS SP 46)'], ['3', 'Third angle (ASME · USA)']], v: '1' }, { k: 'lb', t: 'chk', l: 'Show view names', v: true }], draw);
  const box = div(el), out = div(el, 'out');
  const sc = 2.2;
  const front = [[0, 0], [60, 0], [60, 15], [20, 15], [20, 40], [0, 40]];
  function view(x, y, type, name, pos) {
    const P = q => [x + q[0] * sc, y - q[1] * sc]; let s = '';
    if (type === 'front') s += `<polygon class="fb" points="${pts(front.map(P))}"/>`;
    if (type === 'top') { s += `<rect class="fb" x="${x}" y="${y - 30 * sc}" width="${60 * sc}" height="${30 * sc}"/><line class="k" x1="${x + 20 * sc}" y1="${y - 30 * sc}" x2="${x + 20 * sc}" y2="${y}"/>`; }
    if (type === 'right' || type === 'left') { s += `<rect class="fb" x="${x}" y="${y - 40 * sc}" width="${30 * sc}" height="${40 * sc}"/><line class="k ${type === 'left' ? 'dash' : ''}" x1="${x}" y1="${y - 15 * sc}" x2="${x + 30 * sc}" y2="${y - 15 * sc}"/>`; }
    if (st.lb) s += `<text x="${x}" y="${y + 18}" class="bt">${name}</text><text x="${x}" y="${y + 33}" class="s">${pos || ''}</text>`; return s;
  }
  function symbol(x, y, first) {
    const tr = first ? [[0, 8], [0, 32], [40, 38], [40, 2]] : [[0, 2], [0, 38], [40, 32], [40, 8]];
    const tx = first ? x : x, cx = x + 70;
    return `<polygon class="k" points="${pts(tr.map(q => [tx + q[0], y + q[1]]))}"/><circle class="k" cx="${cx}" cy="${y + 20}" r="18"/><circle class="k" cx="${cx}" cy="${y + 20}" r="12"/><line class="cl" x1="${x - 6}" y1="${y + 20}" x2="${cx + 24}" y2="${y + 20}"/>`;
  }
  function draw() {
    const fx = 300, fy = 240, first = st.p === '1', gap = 110; let s = `<svg viewBox="0 0 760 450">`;
    s += view(fx, fy, 'front', 'Front view', 'centre');
    const L = fx - gap - 30 * sc, Rr = fx + 60 * sc + gap;
    if (first) { s += view(fx, fy + 55 + 30 * sc, 'top', 'Top view', 'below the front'); s += view(L, fy, 'right', 'Right view', 'on the LEFT'); s += view(Rr, fy, 'left', 'Left view', 'on the RIGHT'); }
    else { s += view(fx, fy - 40 * sc - 55, 'top', 'Top view', 'above the front'); s += view(Rr, fy, 'right', 'Right view', 'on the right'); s += view(L, fy, 'left', 'Left view', 'on the left'); }
    s += symbol(620, 370, first) + `<text x="600" y="435" class="s">${first ? 'First-angle symbol' : 'Third-angle symbol'}</text></svg>`;
    box.innerHTML = s;
    out.textContent = (first ? 'First angle: the object sits between you and the paper. Each view is projected THROUGH the object onto the plane behind it, so the top view lands BELOW and the right view lands on the LEFT.\nSymbol: the cone\'s big end faces the circles.' : 'Third angle: the paper is a glass box between you and the object. Each view is drawn on the side you looked from: top ABOVE, right on the RIGHT.\nSymbol: the cone\'s small end faces the circles.') + '\nThe views themselves are identical — only where they are placed changes. Dashed = hidden edge.\nSolidWorks: right-click the sheet ▸ Properties ▸ Type of projection.';
  }
  draw();
};

/* Day 23: feature control frame builder */
const GDT = [
  ['straight', 'Straightness', 'form', 'no'], ['flat', 'Flatness', 'form', 'no'], ['circ', 'Circularity (roundness)', 'form', 'no'], ['cyl', 'Cylindricity', 'form', 'no'],
  ['pline', 'Profile of a line', 'profile', 'opt'], ['psurf', 'Profile of a surface', 'profile', 'opt'],
  ['ang', 'Angularity', 'orientation', 'yes'], ['perp', 'Perpendicularity', 'orientation', 'yes'], ['par', 'Parallelism', 'orientation', 'yes'],
  ['pos', 'Position', 'location', 'yes'], ['conc', 'Concentricity (ISO; removed in ASME Y14.5-2018)', 'location', 'yes'], ['sym', 'Symmetry (ISO; removed in ASME Y14.5-2018)', 'location', 'yes'],
  ['crun', 'Circular runout', 'runout', 'yes'], ['trun', 'Total runout', 'runout', 'yes']
];
function gsym(k, x, y) {
  const S = 'class="k" style="stroke-width:2"';
  switch (k) {
    case 'straight': return `<line ${S} x1="${x - 10}" y1="${y}" x2="${x + 10}" y2="${y}"/>`;
    case 'flat': return `<polygon ${S} points="${x - 11},${y + 6} ${x + 5},${y + 6} ${x + 11},${y - 6} ${x - 5},${y - 6}"/>`;
    case 'circ': return `<circle ${S} cx="${x}" cy="${y}" r="9"/>`;
    case 'cyl': return `<circle ${S} cx="${x}" cy="${y}" r="7"/><line ${S} x1="${x - 11}" y1="${y + 9}" x2="${x - 3}" y2="${y - 9}"/><line ${S} x1="${x + 3}" y1="${y + 9}" x2="${x + 11}" y2="${y - 9}"/>`;
    case 'pline': return `<path ${S} d="M${x - 10},${y + 6} A10,10 0 0 1 ${x + 10},${y + 6}"/>`;
    case 'psurf': return `<path ${S} d="M${x - 10},${y + 6} A10,10 0 0 1 ${x + 10},${y + 6} Z"/>`;
    case 'ang': return `<path ${S} d="M${x + 10},${y + 8} L${x - 10},${y + 8} L${x + 8},${y - 8}"/>`;
    case 'perp': return `<path ${S} d="M${x - 10},${y + 8} L${x + 10},${y + 8} M${x},${y + 8} L${x},${y - 10}"/>`;
    case 'par': return `<path ${S} d="M${x - 9},${y + 8} L${x - 1},${y - 8} M${x + 1},${y + 8} L${x + 9},${y - 8}"/>`;
    case 'pos': return `<circle ${S} cx="${x}" cy="${y}" r="6"/><path ${S} d="M${x - 11},${y} L${x + 11},${y} M${x},${y - 11} L${x},${y + 11}"/>`;
    case 'conc': return `<circle ${S} cx="${x}" cy="${y}" r="9"/><circle ${S} cx="${x}" cy="${y}" r="4"/>`;
    case 'sym': return `<path ${S} d="M${x - 6},${y - 7} L${x + 6},${y - 7} M${x - 11},${y} L${x + 11},${y} M${x - 6},${y + 7} L${x + 6},${y + 7}"/>`;
    case 'crun': return `<path ${S} d="M${x - 7},${y + 9} L${x + 7},${y - 7}"/>${arrow(x + 8, y - 8, -PI / 4, 8)}`;
    case 'trun': return `<path ${S} d="M${x - 11},${y + 9} L${x + 9},${y + 9} M${x - 9},${y + 9} L${x + 1},${y - 5} M${x - 1},${y + 9} L${x + 9},${y - 5}"/>${arrow(x + 2, y - 6, -PI / 4, 7)}${arrow(x + 10, y - 6, -PI / 4, 7)}`;
  }
  return '';
}
W.fcf = el => {
  lab(el);
  const st = form(el, [
    { k: 's', t: 'sel', l: 'Characteristic', o: GDT.map(g => [g[0], g[1]]), v: 'pos' },
    { k: 'dia', t: 'chk', l: 'Ø zone', v: true },
    { k: 'tol', t: 'num', l: 'Tolerance', v: 0.1, min: 0, s: 0.005 },
    { k: 'mod', t: 'sel', l: 'Material condition', o: [['', 'RFS (none)'], ['M', 'Ⓜ MMC'], ['L', 'Ⓛ LMC']], v: 'M' },
    { k: 'd1', t: 'sel', l: 'Primary datum', o: ['', 'A', 'B', 'C'], v: 'A' },
    { k: 'd2', t: 'sel', l: 'Secondary', o: ['', 'A', 'B', 'C'], v: 'B' },
    { k: 'd3', t: 'sel', l: 'Tertiary', o: ['', 'A', 'B', 'C'], v: 'C' }
  ], draw);
  const box = div(el), out = div(el, 'out'); out.style.whiteSpace = 'normal';
  function draw() {
    const g = GDT.find(x => x[0] === st.s), datums = [st.d1, st.d2, st.d3].filter(Boolean);
    let x = 20, y = 30, H = 40, s = `<svg viewBox="0 0 520 110">`;
    const cell = (w, inner) => { const r = `<rect class="k" x="${x}" y="${y}" width="${w}" height="${H}" style="fill:var(--card)"/>` + inner(x + w / 2, y + H / 2); x += w; return r; };
    s += cell(46, (cx, cy) => gsym(st.s, cx, cy));
    const t = (st.dia ? 'Ø' : '') + st.tol;
    s += cell(40 + t.length * 9 + (st.mod ? 26 : 0), (cx, cy) => `<text x="${cx - (st.mod ? 12 : 0)}" y="${cy + 6}" text-anchor="middle" style="font-size:18px">${t}</text>` + (st.mod ? `<circle class="k" cx="${cx + t.length * 4.5 + 4}" cy="${cy}" r="10" style="stroke-width:1.5"/><text x="${cx + t.length * 4.5 + 4}" y="${cy + 5}" text-anchor="middle" style="font-size:13px;font-weight:700">${st.mod}</text>` : ''));
    datums.forEach(d => s += cell(40, (cx, cy) => `<text x="${cx}" y="${cy + 6}" text-anchor="middle" style="font-size:18px">${d}</text>`));
    s += '</svg>'; box.innerHTML = s;
    const err = [];
    if (g[3] === 'no' && datums.length) err.push(`${g[1]} is a form tolerance — it controls the feature by itself and must not reference datums.`);
    if (g[3] === 'yes' && !datums.length) err.push(`${g[1]} needs at least one datum reference.`);
    if (new Set(datums).size !== datums.length) err.push('The same datum letter is repeated.');
    if (st.mod && (g[2] === 'runout' || ['flat', 'circ', 'cyl', 'pline', 'psurf'].includes(g[0]))) err.push(`Ⓜ/Ⓛ cannot be applied to ${g[1].toLowerCase()} — it controls surfaces, not features of size.`);
    if (st.dia && ['flat', 'circ', 'cyl', 'pline', 'psurf', 'crun', 'trun', 'sym'].includes(g[0])) err.push(`A Ø tolerance zone does not apply to ${g[1].toLowerCase()} (its zone is between two lines, surfaces or circles).`);
    const meaning = { form: 'Form: controls the shape of a single feature — no datums.', profile: 'Profile: controls a line or surface against its true (basic) profile; datums optional.', orientation: 'Orientation: controls tilt relative to datums, not location.', location: 'Location: controls where a feature is relative to the datum reference frame.', runout: 'Runout: controls a surface as the part rotates about a datum axis.' }[g[2]];
    out.innerHTML = `<b>${g[1]}</b> — ${meaning}<br>${err.length ? err.map(e => `<b style="color:var(--acc2)">⚠ ${e}</b>`).join('<br>') : '✓ Valid frame.'}${st.s === 'pos' && st.mod === 'M' ? '<br>At MMC the hole gets a bonus tolerance: the further the actual hole is from its smallest size, the more position error is allowed.' : ''}<br><span class="hint">SolidWorks: Annotation ▸ Geometric Tolerance, then attach to a dimension or a face.</span>`;
  }
  draw();
};

/* Day 24: BOM types */
W.bom = el => {
  lab(el);
  const T = ['Gearbox assembly', 'GB-000', '', [
    ['Housing', 'GB-101', 'Grey cast iron', 1], ['Cover', 'GB-102', '6061-T6', 1],
    ['Input shaft sub-assembly', 'GB-200', '', 1, [['Input shaft', 'GB-201', 'EN19', 1], ['Bearing 6205', 'BRG-6205', 'Bought out', 2], ['Pinion 17T', 'GB-202', '20MnCr5', 1]]],
    ['Output shaft sub-assembly', 'GB-300', '', 1, [['Output shaft', 'GB-301', 'EN19', 1], ['Bearing 6206', 'BRG-6206', 'Bought out', 2], ['Gear 42T', 'GB-302', '20MnCr5', 1]]],
    ['Hex bolt M8×25', 'ISO 4017', 'Steel 8.8', 8], ['Plain washer M8', 'ISO 7089', 'Steel', 8], ['Bearing 6205', 'BRG-6205', 'Bought out', 1]]];
  const st = form(el, [{ k: 't', t: 'seg', o: [['top', 'Top-level only'], ['parts', 'Parts only'], ['ind', 'Indented']], v: 'ind' }], draw);
  const box = div(el), out = div(el, 'out');
  function draw() {
    let rows = [];
    if (st.t === 'top') T[3].forEach((r, i) => rows.push([i + 1, r[0], r[1], r[2] || 'Assembly', r[3]]));
    else if (st.t === 'parts') { const acc = {}, order = []; const walk = (list, mult) => list.forEach(r => { if (r[4]) walk(r[4], mult * r[3]); else { if (!acc[r[1]]) { acc[r[1]] = [r[0], r[1], r[2], 0]; order.push(r[1]); } acc[r[1]][3] += mult * r[3]; } }); walk(T[3], 1); rows = order.map((k, i) => [i + 1, ...acc[k]]); }
    else { T[3].forEach((r, i) => { rows.push([i + 1, (r[4] ? '▾ ' : '') + r[0], r[1], r[2] || 'Assembly', r[3]]); if (r[4]) r[4].forEach((c, j) => rows.push([`${i + 1}.${j + 1}`, '&nbsp;&nbsp;&nbsp;&nbsp;' + c[0], c[1], c[2], c[3]])); }); }
    box.innerHTML = '<table><tr><th>ITEM NO.</th><th>DESCRIPTION</th><th>PART NUMBER</th><th>MATERIAL</th><th>QTY.</th></tr>' + rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td class="mono">${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td></tr>`).join('') + '</table>';
    out.textContent = { top: 'Top-level only: just the components directly in the top assembly. Sub-assemblies appear as one line each — good for the assembly shop.', parts: 'Parts only: every part, sub-assemblies dissolved and quantities rolled up. Bearing 6205 = 2 (inside input shaft) + 1 (spare at top level) = 3. Good for purchase and stores.', ind: 'Indented: shows the structure with item numbers 3.1, 3.2… Good for planning and for the drawing of the full assembly.' }[st.t];
  }
  draw();
};

/* Day 25: weldment cut list */
W.cutlist = el => {
  lab(el);
  const PROF = [['25', '25×25×2.5', 25, 2.5], ['40', '40×40×3.0', 40, 3], ['50', '50×50×4.0', 50, 4], ['60', '60×60×4.0', 60, 4]];
  const st = form(el, [
    { k: 'W', t: 'range', l: 'Frame width', min: 300, max: 2000, s: 10, v: 1200, u: 'mm' },
    { k: 'H', t: 'range', l: 'Frame depth', min: 300, max: 1500, s: 10, v: 600, u: 'mm' },
    { k: 'p', t: 'sel', l: 'SHS profile', o: PROF.map(p => [p[0], p[1]]), v: '40' },
    { k: 'c', t: 'seg', l: 'Corner treatment', o: [['mit', 'End miter'], ['b1', 'End butt 1'], ['b2', 'End butt 2']], v: 'mit' },
    { k: 'leg', t: 'range', l: 'Legs (0 = none)', min: 0, max: 1000, s: 10, v: 750, u: 'mm' }
  ], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const P = PROF.find(p => p[0] === st.p), b = P[2], t = P[3], A = b * b - (b - 2 * t) * (b - 2 * t), kgm = A * 1e-6 * 7850;
    const W0 = st.W, H0 = st.H, items = [];
    if (st.c === 'mit') { items.push(['Long side', W0, '45° / 45°', 2], ['Short side', H0, '45° / 45°', 2]); }
    else if (st.c === 'b1') { items.push(['Long side', W0, '0° / 0°', 2], ['Short side', H0 - 2 * b, '0° / 0°', 2]); }
    else { items.push(['Long side', W0 - 2 * b, '0° / 0°', 2], ['Short side', H0, '0° / 0°', 2]); }
    if (st.leg > 0) items.push(['Leg', st.leg, '0° / 0°', 4]);
    const tot = items.reduce((s, i) => s + i[1] * i[3], 0);
    const sc = Math.min(300 / W0, 200 / H0), x0 = 20, y0 = 20, B = b * sc;
    let s = `<svg viewBox="0 0 ${W0 * sc + 40} ${H0 * sc + 40}">`;
    const r = (x, y, w, h, c) => `<rect class="${c}" x="${x0 + x * sc}" y="${y0 + y * sc}" width="${w * sc}" height="${h * sc}"/>`;
    if (st.c === 'mit') { const q = (a) => `<polygon class="fb" points="${pts(a.map(p => [x0 + p[0] * sc, y0 + p[1] * sc]))}"/>`; s += q([[0, 0], [W0, 0], [W0 - b, b], [b, b]]) + q([[0, H0], [W0, H0], [W0 - b, H0 - b], [b, H0 - b]]) + q([[0, 0], [b, b], [b, H0 - b], [0, H0]]).replace('fb', 'fo') + q([[W0, 0], [W0 - b, b], [W0 - b, H0 - b], [W0, H0]]).replace('fb', 'fo'); }
    else if (st.c === 'b1') { s += r(0, 0, W0, b, 'fb') + r(0, H0 - b, W0, b, 'fb') + r(0, b, b, H0 - 2 * b, 'fo') + r(W0 - b, b, b, H0 - 2 * b, 'fo'); }
    else { s += r(b, 0, W0 - 2 * b, b, 'fb') + r(b, H0 - b, W0 - 2 * b, b, 'fb') + r(0, 0, b, H0, 'fo') + r(W0 - b, 0, b, H0, 'fo'); }
    s += '</svg>'; box.innerHTML = s;
    out.textContent = `Cut list — ${P[1]} SHS, ${fmt(kgm, 2)} kg/m (A = ${fmt(A, 0)} mm², square corners)\n` + items.map((i, k) => `${k + 1}. ${i[0].padEnd(11)} ×${i[3]}  L = ${fmt(i[1], 0).padStart(6)} mm  ends ${i[2]}`).join('\n') + `\nTotal length ${fmt(tot / 1000, 2)} m · mass ≈ ${fmt(tot / 1000 * kgm, 2)} kg\n(Real tubes have corner radii, so the catalogue mass is ~3–5 % lower.)`;
  }
  draw();
};

/* Day 26: curve continuity */
W.cont = el => {
  lab(el);
  const st = form(el, [
    { k: 'c', t: 'seg', l: 'Join', o: [['0', 'G0 contact'], ['1', 'G1 tangent'], ['2', 'G2 curvature']], v: '1' },
    { k: 'lam', t: 'range', l: 'Tangent weight', min: 30, max: 160, v: 80 },
    { k: 'mu', t: 'range', l: 'Second handle', min: 20, max: 160, v: 70 },
    { k: 'kink', t: 'range', l: 'G0 kink', min: -60, max: 60, v: 35, u: '°' },
    { k: 'cs', t: 'range', l: 'Comb scale', min: 500, max: 8000, s: 100, v: 3000 }
  ], draw);
  const box = div(el), out = div(el, 'out');
  const A = [[60, 280], [150, 80], [300, 90], [360, 200]], B3 = [660, 170];
  const bz = (P, t) => { const u = 1 - t; return [u * u * u * P[0][0] + 3 * u * u * t * P[1][0] + 3 * u * t * t * P[2][0] + t * t * t * P[3][0], u * u * u * P[0][1] + 3 * u * u * t * P[1][1] + 3 * u * t * t * P[2][1] + t * t * t * P[3][1]]; };
  const k = (P, t) => { const u = 1 - t, d1 = [0, 1].map(i => 3 * (u * u * (P[1][i] - P[0][i]) + 2 * u * t * (P[2][i] - P[1][i]) + t * t * (P[3][i] - P[2][i]))), d2 = [0, 1].map(i => 6 * (u * (P[2][i] - 2 * P[1][i] + P[0][i]) + t * (P[3][i] - 2 * P[2][i] + P[1][i]))); const sp = Math.hypot(d1[0], d1[1]); return { k: (d1[0] * d2[1] - d1[1] * d2[0]) / sp ** 3, n: [-d1[1] / sp, d1[0] / sp] }; };
  function draw() {
    const P3 = A[3], tl = Math.hypot(P3[0] - A[2][0], P3[1] - A[2][1]), tv = [(P3[0] - A[2][0]) / tl, (P3[1] - A[2][1]) / tl], nv = [-tv[1], tv[0]];
    let B1, B2;
    if (st.c === '0') { const a = rad(st.kink), d = [tv[0] * Math.cos(a) - tv[1] * Math.sin(a), tv[0] * Math.sin(a) + tv[1] * Math.cos(a)]; B1 = [P3[0] + d[0] * st.lam, P3[1] + d[1] * st.lam]; B2 = [B1[0] + d[0] * st.mu, B1[1] + d[1] * st.mu + 40]; }
    else { B1 = [P3[0] + tv[0] * st.lam, P3[1] + tv[1] * st.lam]; let h = 60; if (st.c === '2') { const kA = k(A, 1).k; h = 1.5 * kA * st.lam * st.lam; } B2 = [B1[0] + tv[0] * st.mu + nv[0] * h, B1[1] + tv[1] * st.mu + nv[1] * h]; }
    const B = [P3, B1, B2, B3];
    let s = `<svg viewBox="0 0 720 360">`;
    const comb = (P) => { let tips = [], ln = ''; for (let i = 0; i <= 40; i++) { const t = i / 40, p = bz(P, t), q = k(P, t), L = -q.k * st.cs, tp = [p[0] + q.n[0] * L, p[1] + q.n[1] * L]; tips.push(tp); ln += `<line class="d" x1="${p[0]}" y1="${p[1]}" x2="${tp[0]}" y2="${tp[1]}" style="stroke:var(--acc)"/>`; } return ln + `<polyline points="${pts(tips)}" style="fill:none;stroke:var(--acc);stroke-width:1.5"/>`; };
    s += comb(A) + comb(B);
    const curve = P => `<path class="b" d="M${P[0]} C${P[1]} ${P[2]} ${P[3]}"/>`;
    s += curve(A).replace('class="b"', 'class="k" style="stroke-width:3.5"') + curve(B);
    [A, B].forEach(P => s += `<polyline class="d dash" points="${pts(P)}"/>` + P.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="4" class="fi"/>`).join(''));
    s += `<text x="20" y="345" class="s">Black = curve A · blue = curve B · orange = curvature comb · dashed = control polygon</text></svg>`;
    box.innerHTML = s;
    const kA = k(A, 1).k, kB = k(B, 0).k, dB = [B1[0] - P3[0], B1[1] - P3[1]], ang = deg(Math.acos(Math.max(-1, Math.min(1, (dB[0] * tv[0] + dB[1] * tv[1]) / Math.hypot(dB[0], dB[1])))));
    out.textContent = `At the join: tangent angle difference ${fmt(ang, 1)}° · curvature A ${fmt(kA * 1000, 3)} ×10⁻³, B ${fmt(kB * 1000, 3)} ×10⁻³ /px\n` + { '0': 'G0 (contact): the curves touch but the tangent jumps — you see a crease and a reflection break.', '1': 'G1 (tangent): no crease, but the comb jumps in height — a reflection still shows a "kink" in highlights. SolidWorks: Tangent relation / Tangent end condition.', '2': 'G2 (curvature): the comb heights match at the join — smooth reflections. SolidWorks: Equal curvature relation, Curvature to face end condition, or Boundary Surface with Curvature continuous.' }[st.c];
  }
  draw();
};

/* Day 27: FEA */
const FEAMAT = [['Plain carbon steel', 210, 220], ['AISI 304', 193, 207], ['6061-T6 aluminium', 69, 275], ['Ti-6Al-4V', 114, 880]];
W.fea = el => {
  lab(el);
  const st = form(el, [
    { k: 'L', t: 'range', l: 'Length L', min: 50, max: 500, s: 10, v: 200, u: 'mm' },
    { k: 'b', t: 'range', l: 'Width b', min: 5, max: 60, v: 20, u: 'mm' },
    { k: 'h', t: 'range', l: 'Depth h', min: 5, max: 60, v: 10, u: 'mm' },
    { k: 'P', t: 'range', l: 'Tip load P', min: 10, max: 5000, s: 10, v: 300, u: 'N' },
    { k: 'm', t: 'sel', l: 'Material', o: FEAMAT.map((m, i) => [i, `${m[0]} (E ${m[1]} GPa, Sy ${m[2]} MPa)`]), v: '0' }
  ], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  const vir = t => { const C = [[68, 1, 84], [59, 82, 139], [33, 145, 140], [94, 201, 98], [253, 231, 37]]; t = Math.max(0, Math.min(1, t)) * 4; const i = Math.min(3, Math.floor(t)), f = t - i; return `rgb(${C[i].map((c, j) => Math.round(c + (C[i + 1][j] - c) * f)).join(',')})`; };
  function draw() {
    const M = FEAMAT[+st.m], E = M[1] * 1000, I = st.b * st.h ** 3 / 12, sig = 6 * st.P * st.L / (st.b * st.h * st.h), del = st.P * st.L ** 3 / (3 * E * I), fos = M[2] / sig;
    const x0 = 60, y0 = 120, Ls = 360, Hs = Math.max(8, st.h / st.L * Ls), ex = Math.min(80, del / st.L * Ls * 40);
    let s = `<svg viewBox="0 0 500 270"><defs><linearGradient id="vg">${[0, .25, .5, .75, 1].map(t => `<stop offset="${t}" stop-color="${vir(1 - t)}"/>`).join('')}</linearGradient></defs>${HATCH}<rect class="fh" x="${x0 - 22}" y="${y0 - 50}" width="22" height="${100 + Hs}"/>`;
    let top = [], bot = []; for (let i = 0; i <= 30; i++) { const x = i / 30, w = ex * x * x * (3 - x) / 2; top.push([x0 + x * Ls, y0 + w]); bot.push([x0 + x * Ls, y0 + Hs + w]); }
    s += `<rect class="d dash" x="${x0}" y="${y0}" width="${Ls}" height="${Hs}"/><polygon points="${pts(top.concat(bot.reverse()))}" style="fill:url(#vg);stroke:var(--ink);stroke-width:1.5"/>`;
    const tip = top[top.length - 1]; s += `<line class="o" x1="${tip[0]}" y1="${tip[1] - 50}" x2="${tip[0]}" y2="${tip[1] - 4}"/>${arrow(tip[0], tip[1] - 2, PI / 2, 12)}<text x="${tip[0] - 30}" y="${tip[1] - 56}" class="ot">P = ${st.P} N</text>`;
    s += `<rect x="${x0}" y="225" width="200" height="12" style="fill:url(#vg)"/><text x="${x0}" y="255" class="s">σ max ${fmt(sig, 1)} MPa</text><text x="${x0 + 200}" y="255" text-anchor="end" class="s">0</text><text x="${x0 + 210}" y="236" class="s">deflection exaggerated</text></svg>`;
    box.innerHTML = s;
    out.textContent = `I = bh³/12 = ${fmt(I, 0)} mm⁴\nσ max = 6PL/(bh²) = ${fmt(sig, 1)} MPa  (at the fixed end, top and bottom fibres)\nδ tip = PL³/(3EI) = ${fmt(del, 3)} mm\nFactor of safety = Sy/σ = ${fmt(fos, 2)}  ${fos < 1 ? '⚠ yields!' : fos < 1.5 ? '— too low for most designs' : fos < 3 ? '— reasonable for static loads' : '— conservative'}\nSimulationXpress on the same beam should agree within a few % once the mesh is fine enough.`;
  }
  draw();
};
W.converge = el => {
  lab(el);
  const st = form(el, [{ k: 'n', t: 'range', l: 'Elements n', min: 1, max: 40, v: 2 }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  const L = 200, A0 = 200, A1 = 50, P = 10000, E = 200000, ex = P * L * Math.log(A0 / A1) / (E * (A0 - A1));
  const fe = n => { let d = 0; for (let i = 0; i < n; i++) { const xm = (i + 0.5) / n * L, A = A0 + (A1 - A0) * xm / L; d += P * (L / n) / (E * A); } return d; };
  function draw() {
    const W2 = 460, H2 = 220, x0 = 50, y0 = 20, ymin = fe(1) * 0.985, ymax = ex * 1.008;
    const X = n => x0 + (n - 1) / 39 * (W2 - x0 - 10), Y = v => y0 + (ymax - v) / (ymax - ymin) * (H2 - y0 - 30);
    let s = `<svg viewBox="0 0 ${W2} ${H2}"><line class="d" x1="${x0}" y1="${Y(ex)}" x2="${W2 - 10}" y2="${Y(ex)}" style="stroke:var(--acc);stroke-width:2;stroke-dasharray:6 4"/><text x="${W2 - 10}" y="${Y(ex) + 16}" text-anchor="end" class="ot">exact ${fmt(ex, 5)} mm</text>`;
    let pl = []; for (let n = 1; n <= 40; n++) pl.push([X(n), Y(fe(n))]);
    s += `<polyline class="b" points="${pts(pl)}" style="stroke-width:2"/><circle cx="${X(st.n)}" cy="${Y(fe(st.n))}" r="6" class="fp"/><line class="d" x1="${x0}" y1="${y0}" x2="${x0}" y2="${H2 - 30}"/><line class="d" x1="${x0}" y1="${H2 - 30}" x2="${W2 - 10}" y2="${H2 - 30}"/><text x="${x0}" y="${H2 - 10}" class="s">1 element</text><text x="${W2 - 10}" y="${H2 - 10}" text-anchor="end" class="s">40 elements</text></svg>`;
    box.innerHTML = s; const d = fe(st.n);
    out.textContent = `Tapered bar, L = 200 mm, area 200 → 50 mm², P = 10 kN, E = 200 GPa\nExact tip displacement  ${fmt(ex, 5)} mm\nFE with ${st.n} element(s)   ${fmt(d, 5)} mm\nError ${fmt((d - ex) / ex * 100, 3)} %\nEach extra element helps less: this is mesh convergence. In SolidWorks, refine the mesh until the result stops changing (≤ 2–5 %).`;
  }
  draw();
};

/* Day 28: exam + certificate */
W.exam = el => {
  lab(el); const data = JSON.parse($('#' + el.dataset.src).textContent), q = div(el);
  const key = el.dataset.key || 'exam';
  quiz(q, data, key, (g, n) => { store.set(key + 'score', [g, n]); cert && cert._upd && cert._upd(); });
};
let cert = null;
W.cert = el => {
  lab(el); cert = el;
  const nmIn = document.createElement('input'); nmIn.type = 'text'; nmIn.placeholder = 'Your name'; nmIn.value = store.get('name', ''); nmIn.style.maxWidth = '300px';
  const c = div(el, 'ctl'); c.appendChild(nmIn); const pb = document.createElement('button'); pb.textContent = '🖨 Print certificate'; c.appendChild(pb);
  const card = div(el, 'cert');
  const d0 = +(el.dataset.from || 1), d1 = +(el.dataset.to || 28), tot = d1 - d0 + 1, key = el.dataset.key || 'exam';
  const title = el.dataset.title || '28-Day SolidWorks Course', topics = el.dataset.topics || 'part modelling, assemblies, drawings, sheet metal, weldments, surfaces and simulation';
  el._upd = () => {
    const dm = doneMap(); let n = 0; for (let i = d0; i <= d1; i++) if (dm[i]) n++;
    const sc = store.get(key + 'score', null);
    card.innerHTML = `<div class="series" style="letter-spacing:.2em;color:var(--soft)">CERTIFICATE OF COMPLETION</div><h2>${esc(title)}</h2><p>This is to certify that</p><div class="nm">${esc(nmIn.value || 'Your name')}</div><p>has worked through <b>${n} of ${tot}</b> days of ${esc(topics)}${sc ? `, and scored <b>${sc[0]} / ${sc[1]}</b> in the final assessment` : ''}.</p><p class="hint">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} · haivijayanand.github.io/solidworks</p>${n < tot || !sc ? `<p class="hint">(Complete all ${tot} days and the final assessment to make it count.)</p>` : ''}<p class="hint">A course-completion certificate — not an official SOLIDWORKS or Anthropic certification.</p>`;
  };
  nmIn.oninput = () => { store.set('name', nmIn.value); el._upd(); };
  pb.onclick = () => { document.body.classList.add('printcert'); window.print(); setTimeout(() => document.body.classList.remove('printcert'), 500); };
  el._upd();
};

/* ================= PART II LABS (Days 29–42) ================= */
function copyText(t, btn) { const done = () => { if (btn) { const o = btn.textContent; btn.textContent = '✓ Copied'; setTimeout(() => btn.textContent = o, 1200); } }; try { navigator.clipboard.writeText(t).then(done, () => fallbackCopy(t, done)); } catch (e) { fallbackCopy(t, done); } }
function fallbackCopy(t, done) { const ta = document.createElement('textarea'); ta.value = t; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e) { } ta.remove(); done(); }
function copyButtons() { $$('pre.tpl').forEach(p => { if (p._cb) return; p._cb = 1; const b = document.createElement('button'); b.className = 'btn'; b.textContent = '📋 Copy template'; b.style.margin = '0 0 12px'; b.onclick = () => copyText(p.textContent, b); p.after(b); }); }
function codeBox(host) { const pre = document.createElement('pre'); pre.className = 'code'; host.appendChild(pre); const b = document.createElement('button'); b.className = 'btn'; b.textContent = '📋 Copy'; b.onclick = () => copyText(pre.textContent, b); host.appendChild(b); return pre; }
const today = () => new Date().toISOString().slice(0, 10);

/* Day 29: macro generator with line-by-line explanation */
W.macrogen = el => {
  lab(el);
  const st = form(el, [
    { k: 'job', t: 'seg', l: 'Macro', o: [['step', 'Parts → STEP'], ['xt', 'Parts → Parasolid'], ['pdf', 'Drawings → PDF (all sheets)'], ['dxf', 'Drawings → DXF'], ['prop', 'Write custom properties']], v: 'step' }
  ], draw);
  const fl = document.createElement('label'); fl.innerHTML = 'Folder <input type="text" value="C:\\Work\\Project\\" style="max-width:260px">'; $('.ctl', el).appendChild(fl);
  const pl = document.createElement('label'); pl.innerHTML = 'Properties (name=value per line)<br><textarea rows="3" style="width:260px;font:13px JetBrains Mono,monospace">Description=Bearing housing\nMaterial="SW-Material@@FILE@"\nDrawnBy=KVA</textarea>'; $('.ctl', el).appendChild(pl);
  const row = div(el, 'row'), left = div(row), info = div(row, 'out'); left.style.flex = '2 1 520px'; info.style.whiteSpace = 'normal';
  const pre = codeBox(left); pre.style.cursor = 'pointer';
  div(el, 'hint', 'Click any line of the code to see what it does. In SolidWorks: Tools ▸ Macro ▸ New, save as .swp, paste, then Tools ▸ Macro ▸ Run (or F5 in the editor).');
  $('input', fl).oninput = draw; $('textarea', pl).oninput = draw;
  let lines = [];
  pre.onclick = e => { const sp = e.target.closest('[data-i]'); if (!sp) return; $$('[data-i]', pre).forEach(x => x.style.background = ''); sp.style.background = 'var(--hi)'; info.innerHTML = '<b>Line ' + (+sp.dataset.i + 1) + '</b><br>' + lines[+sp.dataset.i][1]; };
  function draw() {
    let folder = $('input', fl).value.trim(); if (folder && !folder.endsWith('\\')) folder += '\\';
    pl.style.display = st.job === 'prop' ? '' : 'none'; fl.style.display = st.job === 'prop' ? 'none' : '';
    const L = (c, e) => lines.push([c, e || '']);
    lines = [];
    const part = st.job === 'step' || st.job === 'xt', ext = { step: '.step', xt: '.x_t', pdf: '.pdf', dxf: '.dxf' }[st.job];
    L("' Generated by the SolidWorks Course, Day 29 — test on copies first", 'A comment. Everything after an apostrophe is ignored by VBA. Always run new macros on a copy of your files.');
    L('Option Explicit', 'Forces you to declare every variable — catches typing mistakes in variable names.');
    L('Dim swApp As SldWorks.SldWorks', 'The SolidWorks application object. Every API call starts from it.');
    L('');
    L('Sub main()', 'SolidWorks runs the Sub called main when you run the macro.');
    if (st.job === 'prop') {
      L('    Dim swModel As SldWorks.ModelDoc2', 'ModelDoc2 = any open document (part, assembly or drawing).');
      L('    Dim cpm As SldWorks.CustomPropertyManager', 'The object that reads and writes File ▸ Properties.');
      L('    Set swApp = Application.SldWorks', 'Connects to the running SolidWorks session.');
      L('    Set swModel = swApp.ActiveDoc', 'The document in the active window.');
      L('    If swModel Is Nothing Then MsgBox "Open a document first": Exit Sub', 'Defensive check — without it the next line fails with "Object variable not set".');
      L('    Set cpm = swModel.Extension.CustomPropertyManager("")', '"" = the file-level Custom tab. Pass a configuration name instead for configuration-specific properties.');
      $('textarea', pl).value.split('\n').forEach(t => { const m = t.match(/^\s*([^=]+?)\s*=\s*(.*)$/); if (!m) return; const v = m[2].replace(/"/g, '""').replace('@FILE@', '" & swModel.GetTitle & "'); L(`    cpm.Add3 "${m[1].replace(/"/g, '')}", swCustomInfoText, "${v}", swCustomPropertyReplaceValue`, `Adds the property <code>${esc(m[1])}</code> as text, or replaces its value if it already exists (swCustomPropertyReplaceValue). A value in "double quotes" with @ (like "SW-Material@Part.SLDPRT") becomes a linked property.`); });
      L('    swModel.ForceRebuild3 False', 'Rebuilds so linked values (mass, material) refresh.');
      L('    MsgBox "Properties written to " & swModel.GetTitle', 'Tells you it finished. Save the file yourself after checking.');
    } else {
      L('    Dim swModel As SldWorks.ModelDoc2', 'Each file we open.');
      if (!part) L('    Dim swDraw As SldWorks.DrawingDoc', 'The same document seen as a drawing, so drawing-only methods are available.');
      if (st.job === 'pdf') L('    Dim swPdf As SldWorks.ExportPdfData', 'Holds PDF export options (which sheets).');
      L('    Dim folder As String, fileName As String, outName As String', 'Text variables for the paths.');
      L('    Dim errs As Long, warns As Long, ok As Boolean', 'The API reports problems through these instead of stopping.');
      L('    Set swApp = Application.SldWorks', 'Connects to the running SolidWorks session.');
      L(`    folder = "${folder}"`, 'The folder to process. It must end with a backslash, because the file name is added straight after it.');
      L(`    fileName = Dir(folder & "*.${part ? 'SLDPRT' : 'SLDDRW'}")`, 'VBA Dir() returns the first matching file name in the folder (or "" if none).');
      L('    Do While fileName <> ""', 'Loop until Dir() runs out of files.');
      L(`        Set swModel = swApp.OpenDoc6(folder & fileName, ${part ? 'swDocPART' : 'swDocDRAWING'}, swOpenDocOptions_Silent, "", errs, warns)`, 'Opens the file without dialogs. The document type must match the file type, or it returns Nothing. "" = last-saved configuration.');
      L('        If Not swModel Is Nothing Then', 'Skip files that failed to open (errs tells you why).');
      L(`            outName = folder & Left(fileName, Len(fileName) - 7) & "${ext}"`, 'Removes the 7-character extension (.SLDPRT / .SLDDRW) and adds the new one. The extension decides the export format.');
      if (st.job === 'pdf') {
        L('            Set swDraw = swModel', 'Treat the open document as a drawing.');
        L('            Set swPdf = swApp.GetExportFileData(swExportPdfData)', 'Gets a PDF options object.');
        L('            swPdf.SetSheets swExportData_ExportAllSheets, swDraw.GetSheetNames', 'Without this, only the active sheet is exported.');
        L('            ok = swModel.Extension.SaveAs(outName, swSaveAsCurrentVersion, swSaveAsOptions_Silent, swPdf, errs, warns)', 'Exports the PDF using the options above.');
      } else {
        L('            ok = swModel.Extension.SaveAs(outName, swSaveAsCurrentVersion, swSaveAsOptions_Silent, Nothing, errs, warns)', `Save As with the ${ext} extension = export. Export options (STEP AP214/AP242, DXF scale…) come from Tools ▸ Options ▸ System Options ▸ Export. Newer API versions add SaveAs3; SaveAs still works.`);
      }
      L('            Debug.Print fileName, IIf(ok, "OK", "FAILED " & errs)', 'Writes a log line to the Immediate window (View ▸ Immediate Window in the VBA editor).');
      L('            swApp.CloseDoc swModel.GetTitle', 'Closes the file so memory does not fill up on big folders.');
      L('        End If', '');
      L('        fileName = Dir', 'Dir with no argument returns the NEXT file. Forget this line and the loop never ends.');
      L('    Loop', '');
      L('    MsgBox "Export finished"', 'Tells you it is done.');
    }
    L('End Sub', '');
    pre.innerHTML = lines.map((l, i) => `<span data-i="${i}" style="display:block">${esc(l[0]) || ' '}</span>`).join('');
  }
  draw();
};

/* Day 30: bug hunt in an AI-drafted macro */
W.bughunt = el => {
  lab(el);
  const code = [
    ["' AI draft: export every part in a folder to STEP", 0],
    ['Dim swApp As SldWorks.SldWorks', 0],
    ['Sub main()', 0],
    ['    Dim swModel As SldWorks.ModelDoc2', 0],
    ['    Dim folder As String, fileName As String', 0],
    ['    Dim errs As Long, warns As Long', 0],
    ['    Set swApp = Application.SldWorks', 0],
    ['    folder = "C:\\Work\\Parts"', 'Missing trailing backslash: Dir("C:\\Work\\Parts*.SLDPRT") looks in C:\\Work for files starting with "Parts".'],
    ['    fileName = Dir(folder & "*.SLDPRT")', 0],
    ['    Do While fileName <> ""', 0],
    ['        Set swModel = swApp.OpenDoc6(folder & fileName, swDocASSEMBLY, swOpenDocOptions_Silent, "", errs, warns)', 'Wrong document type: parts need swDocPART. With swDocASSEMBLY OpenDoc6 returns Nothing.'],
    ['        swModel.ExportToStep folder & fileName & ".step"', 'Invented method: ModelDoc2 has no ExportToStep. Export is Extension.SaveAs with a .step file name. AI tools invent plausible API names — check every call in the API Help.'],
    ['        swApp.CloseDoc swModel.GetTitle', 0],
    ['    Loop', 'Missing fileName = Dir before Loop: the same file is processed for ever (infinite loop).'],
    ['    MsgBox "Done"', 0],
    ['End Sub', 0]
  ];
  const nb = code.filter(c => c[1]).length, sel = new Set();
  div(el, 'hint', `This macro was drafted by an AI assistant. It has ${nb} real bugs. Click the lines you think are wrong, then press Check.`);
  const pre = document.createElement('pre'); pre.className = 'code'; el.appendChild(pre);
  const bar = div(el, 'ctl', '<button data-a="chk">✓ Check</button><button data-a="show">Show all bugs</button><button data-a="rst">↺ Reset</button>');
  const out = div(el, 'out'); out.style.whiteSpace = 'normal';
  function draw(show) {
    pre.innerHTML = code.map((c, i) => { const s = sel.has(i), b = !!c[1]; let st = 'display:block;cursor:pointer;'; if (show) { if (b && s) st += 'background:var(--hi);border-left:5px solid var(--pri)'; else if (b) st += 'border-left:5px solid var(--acc);background:var(--hi)'; else if (s) st += 'border-left:5px dashed var(--soft);opacity:.7'; } else if (s) st += 'background:var(--hi);border-left:5px solid var(--pri)'; return `<span data-i="${i}" style="${st}">${esc(c[0])}${show && b ? (s ? '   ✓ found' : '   ← missed') : ''}</span>`; }).join('');
  }
  pre.onclick = e => { const sp = e.target.closest('[data-i]'); if (!sp) return; const i = +sp.dataset.i; sel.has(i) ? sel.delete(i) : sel.add(i); draw(false); };
  bar.onclick = e => {
    const a = e.target.dataset.a; if (!a) return;
    if (a === 'rst') { sel.clear(); out.innerHTML = ''; draw(false); return; }
    if (a === 'show') code.forEach((c, i) => { if (c[1]) sel.add(i); });
    const hit = code.filter((c, i) => c[1] && sel.has(i)).length, fp = [...sel].filter(i => !code[i][1]).length;
    draw(true);
    out.innerHTML = `<b>Found ${hit} of ${nb}</b>${fp ? ` · ${fp} line(s) marked that are fine` : ''}<br><br>` + code.map((c, i) => c[1] ? `<b>Line ${i + 1}:</b> ${esc(c[1])}` : '').filter(Boolean).join('<br>');
  };
  draw(false);
};

/* Day 31: DriveWorksXpress-style rules */
W.rules = el => {
  lab(el);
  const st = form(el, [
    { k: 'load', t: 'range', l: 'Load', min: 100, max: 3000, s: 50, v: 800, u: 'N' },
    { k: 'w', t: 'range', l: 'Width', min: 60, max: 400, s: 10, v: 200, u: 'mm' },
    { k: 'm', t: 'sel', l: 'Material', o: [['ST', 'Steel'], ['AL', 'Aluminium']], v: 'ST' }
  ], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out'); out.style.whiteSpace = 'normal';
  const STOCK = [5, 6, 8, 10, 12, 16, 20];
  function draw() {
    let t0 = st.load > 2000 ? 12 : st.load > 1000 ? 10 : st.load > 400 ? 8 : 6;
    const t = st.m === 'AL' ? STOCK.find(v => v >= t0 * 1.5) || 20 : t0;
    const n = Math.ceil(st.w / 100) + 1, hd = st.load > 1500 ? 13.5 : 11, bolt = hd > 12 ? 'M12' : 'M10', H = 80, name = `BRK-W${st.w}-T${t}-${st.m}`;
    const sc = Math.min(1.6, 420 / st.w), x0 = 30, y0 = 40;
    let s = `<svg viewBox="0 0 ${st.w * sc + 60} ${H * sc + 90}"><rect class="fb" x="${x0}" y="${y0}" width="${st.w * sc}" height="${H * sc}" rx="${t * sc}"/>`;
    for (let i = 0; i < n; i++) { const x = x0 + (25 + i * (st.w - 50) / Math.max(1, n - 1)) * sc; s += `<circle class="fg" cx="${x}" cy="${y0 + H / 2 * sc}" r="${hd / 2 * sc}"/>`; }
    s += dimL(x0, y0 + H * sc + 22, x0 + st.w * sc, y0 + H * sc + 22, 'W ' + st.w) + `<text x="${x0}" y="${y0 - 12}" class="bt">${name}.SLDPRT · thickness ${t}</text></svg>`;
    box.innerHTML = s;
    out.innerHTML = `<table><tr><th>Rule (as in DriveWorksXpress)</th><th>Result</th></tr>
<tr><td class="mono">Thickness = IF(Load&gt;2000,12,IF(Load&gt;1000,10,IF(Load&gt;400,8,6)))</td><td>${t0}</td></tr>
<tr><td class="mono">If aluminium: next stock size ≥ 1.5 × thickness</td><td>${t}</td></tr>
<tr><td class="mono">Holes = ROUNDUP(Width/100,0)+1</td><td>${n}</td></tr>
<tr><td class="mono">Hole Ø = IF(Load&gt;1500,13.5,11)</td><td>Ø${hd} (${bolt} clearance)</td></tr>
<tr><td class="mono">Fillet R = Thickness</td><td>R${t}</td></tr>
<tr><td class="mono">File name = "BRK-W"&amp;Width&amp;"-T"&amp;Thk&amp;"-"&amp;Mat</td><td>${name}</td></tr></table><span class="hint">The rules are illustrative engineering choices, not a design standard — your own rules come from your calculations.</span>`;
  }
  draw();
};

/* Day 32: PDM workflow state machine */
W.pdm = el => {
  lab(el);
  const skip = new Set(['I', 'O', 'Q', 'S', 'X', 'Z']), letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(c => !skip.has(c));
  let S = { state: 'Work in Progress', out: false, dirty: false, ver: 1, rev: '', revN: -1 }, log = [['Created', 'Version 1, Work in Progress']];
  const bar = div(el, 'ctl', ['Check out', 'Edit & save locally', 'Check in', 'Submit for approval', 'Approve', 'Reject', 'Change request'].map(b => `<button data-a="${b}">${b}</button>`).join('') + '<button data-a="rst">↺ Reset</button>');
  const row = div(el, 'row'), box = div(row), out = div(row, 'out'); out.style.whiteSpace = 'normal';
  const msg = m => log.unshift([m[0], m[1]]);
  bar.onclick = e => {
    const a = e.target.dataset.a; if (!a) return;
    if (a === 'rst') { S = { state: 'Work in Progress', out: false, dirty: false, ver: 1, rev: '', revN: -1 }; log = [['Created', 'Version 1, Work in Progress']]; draw(); return; }
    const no = t => msg(['✗ ' + a, t]);
    if (a === 'Check out') { if (S.state !== 'Work in Progress') no('Only files in Work in Progress can be checked out for editing. Released files need a Change request first.'); else if (S.out) no('Already checked out to you.'); else { S.out = true; msg([a, 'You now have write access; others see it as checked out by you.']); } }
    else if (a === 'Edit & save locally') { if (!S.out) no('The file is read-only — check it out first.'); else { S.dirty = true; msg([a, 'Saved in your local cache only. The vault still holds version ' + S.ver + '.']); } }
    else if (a === 'Check in') { if (!S.out) no('Nothing checked out.'); else { if (S.dirty) S.ver++; S.out = false; msg([a, S.dirty ? 'New version ' + S.ver + ' stored in the vault.' : 'No changes — version stays ' + S.ver + '.']); S.dirty = false; } }
    else if (a === 'Submit for approval') { if (S.out) no('Check the file in before submitting.'); else if (S.state !== 'Work in Progress') no('Only Work in Progress files can be submitted.'); else { S.state = 'Pending Approval'; msg([a, 'Reviewer notified. File is locked while it is reviewed.']); } }
    else if (a === 'Approve') { if (S.state !== 'Pending Approval') no('Nothing is waiting for approval.'); else { S.revN++; S.rev = letters[S.revN] || '?'; S.state = 'Released'; msg([a, `Released as revision ${S.rev} (version ${S.ver}). Revision table and title block update automatically.`]); } }
    else if (a === 'Reject') { if (S.state !== 'Pending Approval') no('Nothing is waiting for approval.'); else { S.state = 'Work in Progress'; msg([a, 'Back to Work in Progress with the reviewer\'s comment.']); } }
    else if (a === 'Change request') { if (S.state !== 'Released') no('Change requests start from a Released file.'); else { S.state = 'Work in Progress'; msg([a, `Revision ${S.rev} stays valid in the shop until the next revision is released.`]); } }
    draw();
  };
  function draw() {
    const states = ['Work in Progress', 'Pending Approval', 'Released'];
    let s = '<svg viewBox="0 0 560 170">';
    states.forEach((t, i) => { const x = 20 + i * 185, on = S.state === t; s += `<rect x="${x}" y="40" width="150" height="60" rx="12" class="${on ? 'fo' : 'fg'}" style="stroke-width:${on ? 4 : 1.5}"/><text x="${x + 75}" y="75" text-anchor="middle" style="font-weight:${on ? 700 : 400}">${t}</text>`; if (i < 2) s += `<line class="k" x1="${x + 152}" y1="70" x2="${x + 182}" y2="70"/>${arrow(x + 184, 70, 0)}`; });
    s += `<path class="d" d="M465,102 C465,150 95,150 95,104"/>${arrow(95, 103, -PI / 2)}<text x="280" y="160" text-anchor="middle" class="s">Change request / Reject</text>`;
    s += `<text x="20" y="22">${S.out ? '🔓 Checked out to you' : '🔒 Checked in'}${S.dirty ? ' · unsaved changes in local cache' : ''}</text></svg>`;
    box.innerHTML = s;
    out.innerHTML = `<b>Housing.SLDPRT</b> · version <b>${S.ver}</b> · revision <b>${S.rev || '—'}</b><br><span class="hint">Version = every check-in. Revision = every release. Letters skip I, O, Q, S, X, Z (ASME Y14.35 practice).</span><br><br>` + log.slice(0, 8).map(l => `<b>${esc(l[0])}</b> — ${esc(l[1])}`).join('<br>');
  }
  draw();
};

/* Day 33: revision log / ECN builder */
W.revlog = el => {
  lab(el);
  const P = [['Base thickness', '20', '25'], ['Material', 'FG 200 grey cast iron', 'FG 260 grey cast iron'], ['Mounting holes', '2 × Ø14 thru', '2 × M12 counterbore'], ['Bore', 'Ø40 H7', 'Ø40 H7'], ['Oil hole', 'Ø8', 'Ø8 + M8 grease nipple']];
  const st = form(el, [
    { k: 'rev', t: 'sel', l: 'Current revision', o: ['A', 'B', 'C', 'D'], v: 'A' },
    { k: 'disp', t: 'sel', l: 'Stock disposition', o: ['Use as is', 'Rework', 'Scrap', 'Use up existing stock first'], v: 'Rework' }
  ], draw);
  const extra = div(el, 'ctl', 'ECN no. <input type="text" value="ECN-2026-014" style="max-width:150px"> Reason <input type="text" value="Base flexing in vibration test; bolts upgraded" style="max-width:360px;width:360px">');
  const tb = div(el), out = div(el); const pre = codeBox(out);
  function table() { tb.innerHTML = '<table><tr><th>Item</th><th>Before</th><th>After (edit)</th></tr>' + P.map((p, i) => `<tr><td>${p[0]}</td><td>${esc(p[1])}</td><td contenteditable="true" data-i="${i}">${esc(p[2])}</td></tr>`).join('') + '</table>'; $$('td[data-i]', tb).forEach(td => td.oninput = () => { P[+td.dataset.i][2] = td.textContent.trim(); draw(); }); }
  $$('input', extra).forEach(i => i.oninput = draw);
  function draw() {
    const ch = P.filter(p => p[1] !== p[2]), nx = String.fromCharCode(st.rev.charCodeAt(0) + 1), [ecn, why] = $$('input', extra).map(i => i.value);
    const desc = ch.map(p => `${p[0].toUpperCase()} ${p[1]} WAS → ${p[2]}`).join('; ') || '(no changes)';
    pre.textContent = `REVISION TABLE ROW\nREV | DESCRIPTION | DATE | APPROVED\n${nx} | ${ecn}: ${desc} | ${today()} | ______\n\nECN DRAFT (check every line before issue)\nECN: ${ecn}    Part: Pillow block HSG-101    Rev ${st.rev} → ${nx}\nReason: ${why}\nChanges:\n${ch.map((p, i) => `  ${i + 1}. ${p[0]}: ${p[1]} → ${p[2]}`).join('\n') || '  none'}\nUnchanged and checked: ${P.filter(p => p[1] === p[2]).map(p => p[0]).join(', ') || '—'}\nAffected documents: part HSG-101, drawing HSG-101 sheet 1, assembly GB-000 (where-used)\nStock disposition: ${st.disp}\nEffectivity: from next production batch\n\nPROMPT FOR THE AI (paste with the text above)\nRewrite this ECN in our company format. Do not change, add or round any number,\nsize or material grade. List anything that looks missing (fits, tolerances,\nfinish, heat treatment) as questions at the end instead of inventing it.`;
  }
  table(); draw();
};

/* Day 34: file format matrix */
W.formats = el => {
  lab(el);
  const F = [
    ['Parasolid (.x_t / .x_b)', '✓', '✗', '✓', '✓', '✗', 'SolidWorks\' own geometry kernel: the cleanest neutral exchange between Parasolid-based CAD systems.'],
    ['STEP AP203', '✓', '✗', '✓', 'partly', '✗', 'Oldest STEP protocol; colours limited. Fine for plain geometry.'],
    ['STEP AP214', '✓', '✗', '✓', '✓', '✗', 'The everyday choice for suppliers: geometry, assembly structure and colours.'],
    ['STEP AP242', '✓', '✗', '✓', '✓', '✓', 'Adds semantic PMI (3D tolerances) when you export MBD data — Day 36.'],
    ['IGES (.igs)', 'partly', '✗', 'partly', '✓', '✗', 'Old surface format; solids often arrive as loose surfaces you must knit.'],
    ['Native via 3D Interconnect', '✓', '✗', '✓', '✓', 'partly', 'Opens Creo, NX, Inventor, CATIA V5, Solid Edge files directly and keeps a link: update when the source changes.'],
    ['STL', '✗ mesh', '✗', '✗', '✗', '✗', 'Triangles only — for 3D printing, not for engineering exchange.'],
    ['3MF', '✗ mesh', '✗', 'partly', '✓', '✗', 'Modern 3D printing format: mesh plus colours and materials.'],
    ['DXF / DWG', '2D', '✗', '✗', 'partly', 'partly', 'For drawings and sheet-metal flat patterns (laser / punch).'],
    ['eDrawings (.eprt/.easm/.edrw)', 'view', '✗', '✓', '✓', '✓', 'For viewing, measuring and marking up — not for re-modelling.']
  ];
  const H = ['Format', 'Exact geometry', 'Feature history', 'Assembly structure', 'Colours', 'PMI / annotations'];
  const tb = div(el), out = div(el, 'out'); out.style.whiteSpace = 'normal';
  tb.innerHTML = '<table><tr>' + H.map(h => `<th>${h}</th>`).join('') + '</tr>' + F.map((f, i) => `<tr data-i="${i}" style="cursor:pointer">${f.slice(0, 6).map(c => `<td>${c}</td>`).join('')}</tr>`).join('') + '</table><p class="hint">✓ yes · partly · ✗ no. Click a row. No neutral format carries the feature tree — that is what FeatureWorks (Recognize Features) is for.</p>';
  tb.onclick = e => { const r = e.target.closest('tr[data-i]'); if (!r) return; $$('tr[data-i]', tb).forEach(x => x.style.background = x === r ? 'var(--hi)' : ''); const f = F[+r.dataset.i]; out.innerHTML = `<b>${f[0]}</b> — ${f[6]}`; };
  out.textContent = 'Click a format to read when to use it.';
};

/* Day 35: large assembly mode helper */
W.lamode = el => {
  lab(el);
  const st = form(el, [
    { k: 'n', t: 'range', l: 'Components', min: 10, max: 20000, s: 10, v: 3000 },
    { k: 'task', t: 'sel', l: 'What you need to do', o: [['view', 'Review, measure, section, walk through'], ['mate', 'Add or edit mates, move parts'], ['edit', 'Edit one part in context'], ['dwg', 'Add notes or dimensions to an existing drawing'], ['bom', 'Check quantities / BOM only']], v: 'view' },
    { k: 'hw', t: 'chk', l: 'Older PC (≤ 16 GB RAM)', v: false }
  ], draw);
  const out = div(el, 'out'); out.style.whiteSpace = 'normal';
  function draw() {
    const big = st.n > (st.hw ? 300 : 500), huge = st.n > 5000; let m, why, tips = [];
    if (st.task === 'view') { m = big ? 'Large Design Review' : 'Resolved'; why = big ? 'Opens in seconds by loading only graphics data; you can still measure, section, walk-through and use Edit Assembly for simple mates.' : 'Small enough to open fully.'; }
    else if (st.task === 'mate') { m = big ? 'Lightweight (+ Large Assembly Settings)' : 'Resolved'; why = big ? 'Lightweight loads a subset of the model data; parts resolve automatically when you select their faces for mates.' : 'Small enough to open fully.'; if (huge) tips.push('Open only the sub-assembly you are working on.'); }
    else if (st.task === 'edit') { m = 'Open the part in its own window, or Lightweight assembly + resolve that part only'; why = 'Editing in context resolves the references; keep everything else lightweight or suppressed.'; }
    else if (st.task === 'dwg') { m = big ? 'Detailing mode (drawings)' : 'Resolved drawing'; why = big ? 'Detailing mode opens the drawing without loading the models, for adding annotations and dimensions to existing views.' : 'Small enough to open normally.'; }
    else { m = 'Large Design Review or the assembly\'s BOM in a drawing'; why = 'Quantities come from the assembly structure — no need to load geometry.'; }
    if (big) tips.push('SpeedPak configurations for sub-assemblies you only need to look at', 'Defeature (Tools) to make a light, IP-safe version for customers and layouts', 'Hide or suppress fasteners; show threads as cosmetic, not modelled', 'Assembly Visualization: sort components by rebuild time or graphics triangles to find the heavy ones', 'Performance Evaluation (Evaluate tab) to find circular references, in-context links and slow mates');
    if (st.hw) tips.push('Turn off RealView, shadows and anti-aliasing; lower image quality for big assemblies');
    out.innerHTML = `<b>Suggested way to open:</b> <span class="badge" style="color:var(--pri)">${m}</span><br>${why}${tips.length ? '<br><br><b>Also:</b><br>' + tips.map(t => '• ' + t).join('<br>') : ''}<br><br><span class="hint">The component counts where modes help are rules of thumb; your PC and models decide. SolidWorks applies Large Assembly Settings above the threshold set in System Options ▸ Assemblies.</span>`;
  }
  draw();
};

/* Day 36: tolerance stack-up */
W.stack = el => {
  lab(el);
  const R = [['A Housing bore depth', 60, 0.1, 0.1, 1], ['B Bearing width (6205)', 15, 0, 0.12, -1], ['C Spacer', 30, 0.05, 0.05, -1], ['D Bearing width (6205)', 15, 0, 0.12, -1]];
  const tb = div(el), row = div(el, 'row'), box = div(row), out = div(row, 'out');
  const add = div(el, 'ctl', '<button data-a="add">+ Add dimension</button><span class="hint">Direction +1 adds to the gap, −1 subtracts. Tolerances are + upper / − lower deviation.</span>');
  add.onclick = e => { if (e.target.dataset.a) { R.push(['New dim', 10, 0.05, 0.05, -1]); table(); draw(); } };
  function table() {
    tb.innerHTML = '<table class="mono"><tr><th>Dimension</th><th>Nominal</th><th>+ tol</th><th>− tol</th><th>Dir (±1)</th></tr>' + R.map((r, i) => `<tr>${r.map((c, j) => `<td contenteditable="true" data-i="${i}" data-j="${j}">${c}</td>`).join('')}</tr>`).join('') + '</table>';
    $$('td', tb).forEach(td => td.oninput = () => { const i = +td.dataset.i, j = +td.dataset.j, v = td.textContent.trim(); R[i][j] = j === 0 ? v : (parseFloat(v) || 0); if (j === 4) R[i][4] = R[i][4] < 0 ? -1 : 1; draw(); });
  }
  function draw() {
    let nom = 0, wmax = 0, wmin = 0, mean = 0, ss = 0; const ht = [];
    R.forEach(r => { const [n, up, lo, d] = [r[1], r[2], r[3], r[4]]; nom += d * n; const hi = n + up, lw = n - lo; if (d > 0) { wmax += hi; wmin += lw; } else { wmax -= lw; wmin -= hi; } const m = (hi + lw) / 2, t = (up + lo) / 2; mean += d * m; ss += t * t; ht.push(t); });
    const rss = Math.sqrt(ss);
    out.textContent = `Nominal gap      ${fmt(nom, 3)} mm\nWorst case       ${fmt(wmin, 3)} … ${fmt(wmax, 3)} mm  (range ${fmt(wmax - wmin, 3)})\nRSS (statistical) ${fmt(mean - rss, 3)} … ${fmt(mean + rss, 3)} mm  (±${fmt(rss, 3)} about ${fmt(mean, 3)})\n` + (wmin < 0 ? '⚠ Worst case can go negative: parts may not assemble (interference).' : '✓ Worst case gap stays positive.') + '\nRSS assumes independent, centred, normally distributed sizes — use worst case for small batches and safety-critical fits.';
    const W2 = 420; let s = `<svg viewBox="0 0 ${W2} ${30 + R.length * 30}"><text x="0" y="16" class="s">Contribution to variance (t² / Σt²)</text>`;
    R.forEach((r, i) => { const f = ss ? ht[i] * ht[i] / ss : 0; s += `<rect class="fb" x="160" y="${26 + i * 30}" width="${f * 240}" height="18"/><text x="0" y="${40 + i * 30}">${esc(String(r[0])).slice(0, 22)}</text><text x="${166 + f * 240}" y="${40 + i * 30}" class="s">${fmt(f * 100, 0)} %</text>`; });
    box.innerHTML = s + '</svg>';
  }
  table(); draw();
};

/* Day 37: cost estimator */
W.cost = el => {
  lab(el);
  const st = form(el, [
    { k: 'q', t: 'range', l: 'Batch quantity', min: 1, max: 1000, v: 50 },
    { k: 'rm', t: 'num', l: 'Bar stock mass', v: 3.2, s: 0.1, u: 'kg/part' },
    { k: 'rate', t: 'num', l: 'Material', v: 95, u: '₹/kg' },
    { k: 'ht', t: 'chk', l: 'Heat treatment (₹40/kg)', v: true },
    { k: 'oh', t: 'range', l: 'Overhead + profit', min: 0, max: 50, v: 20, u: '%' }
  ], draw);
  const OPS = [['Saw cutting', 10, 2, 400], ['CNC turning', 45, 14, 900], ['VMC keyway', 30, 6, 1100], ['Grinding bearing seats', 30, 8, 1000], ['Inspection', 0, 4, 600]];
  const tb = div(el), row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function table() { tb.innerHTML = '<table class="mono"><tr><th>Operation</th><th>Setup min (per batch)</th><th>Cycle min (per part)</th><th>Rate ₹/h</th></tr>' + OPS.map((o, i) => `<tr>${o.map((c, j) => `<td contenteditable="true" data-i="${i}" data-j="${j}">${c}</td>`).join('')}</tr>`).join('') + '</table>'; $$('td', tb).forEach(td => td.oninput = () => { const i = +td.dataset.i, j = +td.dataset.j; OPS[i][j] = j ? (parseFloat(td.textContent) || 0) : td.textContent; draw(); }); }
  const unit = q => { const mat = st.rm * st.rate + (st.ht ? st.rm * 0.7 * 40 : 0); let setup = 0, cyc = 0; OPS.forEach(o => { setup += o[1] / 60 * o[3]; cyc += o[2] / 60 * o[3]; }); const base = mat + cyc + setup / q; return { mat, cyc, setup: setup / q, tot: base * (1 + st.oh / 100) }; };
  function draw() {
    const u = unit(st.q);
    out.textContent = `Material (incl. heat treatment)  ₹${fmt(u.mat, 0)}\nMachining cycle                   ₹${fmt(u.cyc, 0)}\nSetup shared over ${st.q} part(s)  ₹${fmt(u.setup, 0)}\nUnit cost with ${st.oh}% overhead     ₹${fmt(u.tot, 0)}\nBatch total                       ₹${fmt(u.tot * st.q, 0)}\nRates are example values — use your shop's.`;
    const qs = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000], mx = unit(1).tot, mn = unit(1000).tot, X = q => 50 + Math.log10(q) / 3 * 360, Y = v => 20 + (mx - v) / (mx - mn || 1) * 150;
    let s = `<svg viewBox="0 0 430 210"><polyline class="b" points="${pts(qs.map(q => [X(q), Y(unit(q).tot)]))}"/><circle class="fa" cx="${X(st.q)}" cy="${Y(u.tot)}" r="6"/>`;
    [1, 10, 100, 1000].forEach(q => s += `<text x="${X(q)}" y="200" text-anchor="middle" class="s">${q}</text>`);
    s += `<text x="50" y="14" class="s">Unit cost vs batch size (log scale): ₹${fmt(mx, 0)} → ₹${fmt(mn, 0)}</text></svg>`; box.innerHTML = s;
  }
  table(); draw();
};

/* Day 38: number checker for AI-written reports */
W.numcheck = el => {
  lab(el);
  div(el, 'hint', 'Left: the source data you gave the AI (from Mass Properties, Simulation, Interference). Right: the AI\'s draft. Every number in the draft that is not in the source is flagged.');
  const row = div(el, 'row'), a = document.createElement('textarea'), b = document.createElement('textarea');
  [a, b].forEach(t => { t.rows = 12; t.style.cssText = 'width:100%;font:13.5px JetBrains Mono,monospace;padding:8px;border-radius:8px;border:1px solid var(--rule);background:var(--card);color:var(--ink)'; div(row).appendChild(t); t.oninput = run; });
  a.value = 'Part: Bearing housing HSG-101\nMaterial: FG 260 grey cast iron\nMass: 4.82 kg\nCentre of mass height: 31.6 mm\nLoad case: 2400 N radial on bore\nMax von Mises stress: 38.4 MPa\nTensile strength: 260 MPa\nMax displacement: 0.012 mm\nInterferences: 2 (bearing press fits, intended)';
  b.value = 'The FG 260 housing (mass 4.82 kg) was analysed under a 2400 N radial bearing load. The maximum von Mises stress of 38.4 MPa gives a factor of safety of 6.8 against the 260 MPa tensile strength. Maximum displacement is 0.12 mm. Interference detection found 3 interferences, all intended press fits.';
  const out = div(el, 'out'); out.style.whiteSpace = 'normal';
  const nums = t => (t.match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
  function run() {
    const src = nums(a.value), ok = v => src.some(x => Math.abs(x - v) <= Math.max(1e-9, Math.abs(x) * 0.005));
    let bad = 0, derived = 0;
    const html = esc(b.value).replace(/-?\d+(?:\.\d+)?/g, m => { const v = +m; if (ok(v)) return `<b style="border-bottom:3px solid var(--pri)">${m}</b>`; const d = Math.abs(v) >= 1 && src.some(x => src.some(y => y && Math.abs(x / y - v) <= Math.abs(v) * 0.01)); if (d) { derived++; return `<b style="border-bottom:3px dashed var(--pri)">${m}</b>`; } bad++; return `<b style="background:var(--hi);border:2px solid var(--acc);padding:0 3px">${m} ⚠</b>`; });
    out.innerHTML = html + `<br><br><b>${bad}</b> number(s) not found in the source ⚠ · <b>${derived}</b> look like a ratio of two source values (dashed — check the arithmetic) · solid underline = matches the source.<br><span class="hint">In the sample, 0.12 should be 0.012 and the interference count is wrong. 6.8 = 260 / 38.4 — a derived value you must recompute yourself.</span>`;
  }
  run();
};

/* Day 39: test data to report */
W.testrep = el => {
  lab(el);
  const gen = () => { const r = ['time_h,speed_rpm,oil_C,vib_mms']; let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647; for (let i = 0; i <= 60; i++) { const t = i / 6, oil = 40 + 52 * (1 - Math.exp(-t / 1.6)) + (rnd() - 0.5) * 1.5, vib = 3.2 + 0.25 * t + (rnd() - 0.5) * 0.4 + (Math.abs(t - 7.5) < 0.2 ? 3.6 : 0), sp = 8000 + (rnd() - 0.5) * 30; r.push([t.toFixed(2), sp.toFixed(0), oil.toFixed(1), vib.toFixed(2)].join(',')); } return r.join('\n'); };
  const st = form(el, [
    { k: 'ch', t: 'sel', l: 'Plot channel', o: [['1', 'speed_rpm'], ['2', 'oil_C'], ['3', 'vib_mms']], v: '3' },
    { k: 'lo', t: 'num', l: 'Oil temp limit', v: 110, u: '°C' },
    { k: 'lv', t: 'num', l: 'Vibration alarm', v: 6.5, u: 'mm/s' }
  ], run);
  const ta = document.createElement('textarea'); ta.rows = 5; ta.style.cssText = 'width:100%;font:13px JetBrains Mono,monospace;border-radius:8px;border:1px solid var(--rule);background:var(--card);color:var(--ink)'; ta.value = gen(); el.appendChild(ta); ta.oninput = run;
  div(el, 'hint', 'Sample: a 10-hour run logged every 10 minutes. Paste your own CSV with the same four columns (header row first).');
  const row = div(el, 'row'), box = div(row), out = div(el); const pre = codeBox(out);
  function run() {
    const L = ta.value.trim().split(/\r?\n/).slice(1).map(l => l.split(',').map(Number)).filter(r => r.length >= 4 && r.every(Number.isFinite));
    if (L.length < 2) { pre.textContent = 'Need at least two data rows.'; return; }
    const col = j => L.map(r => r[j]), stat = a => ({ min: Math.min(...a), max: Math.max(...a), mean: a.reduce((s, v) => s + v, 0) / a.length });
    const S = [1, 2, 3].map(j => stat(col(j))), dur = L[L.length - 1][0] - L[0][0];
    const exO = L.filter(r => r[2] > st.lo), exV = L.filter(r => r[3] > st.lv);
    const j = +st.ch, a = col(j), mn = Math.min(...a), mx = Math.max(...a), X = t => 40 + (t - L[0][0]) / (dur || 1) * 380, Y = v => 15 + (mx - v) / ((mx - mn) || 1) * 160;
    const lim = j === 2 ? st.lo : j === 3 ? st.lv : null;
    let s = `<svg viewBox="0 0 440 210"><polyline class="b" points="${pts(L.map(r => [X(r[0]), Y(r[j])]))}" style="stroke-width:2"/>`;
    if (lim !== null && lim <= mx * 1.2) s += `<line x1="40" x2="420" y1="${Math.max(5, Y(lim))}" y2="${Math.max(5, Y(lim))}" style="stroke:var(--acc);stroke-width:2;stroke-dasharray:6 4"/><text x="420" y="${Math.max(5, Y(lim)) - 4}" text-anchor="end" class="ot">limit ${lim}</text>`;
    s += `<text x="40" y="205" class="s">${fmt(L[0][0], 1)} h</text><text x="420" y="205" text-anchor="end" class="s">${fmt(L[L.length - 1][0], 1)} h</text><text x="4" y="20" class="s">${fmt(mx, 1)}</text><text x="4" y="178" class="s">${fmt(mn, 1)}</text></svg>`;
    box.innerHTML = s;
    const nm = ['Speed (rpm)', 'Oil temperature (°C)', 'Vibration (mm/s)'];
    pre.textContent = `DATA SUMMARY (computed here — give this to the AI, never let it compute)\nDuration ${fmt(dur, 2)} h, ${L.length} samples\n` + S.map((x, i) => `${nm[i].padEnd(22)} min ${fmt(x.min, 2)}  mean ${fmt(x.mean, 2)}  max ${fmt(x.max, 2)}`).join('\n') + `\nOil above ${st.lo} °C: ${exO.length} sample(s)${exO.length ? ' from ' + exO[0][0] + ' h' : ''}\nVibration above ${st.lv} mm/s: ${exV.length} sample(s)${exV.length ? ' at ' + exV.map(r => r[0] + ' h (' + r[3] + ')').join(', ') : ''}\n\nPROMPT\nWrite section 5 "Test results" of a test report in formal third person, past tense.\nUse ONLY the numbers in the data summary above, with their units. Do not round\nfurther. State each limit exceedance with its time. Do not give causes — list\nquestions for the test engineer instead. End with a table: channel, min, mean,\nmax, limit, status.`;
  }
  run();
};

/* Day 40: RFQ generator */
W.rfq = el => {
  lab(el);
  const ITEMS = [['GB-101', 'Housing', 'FG 260 grey cast iron', 'Casting + machining', 'Bores Ø52 H7 / Ø62 H7, Ra 1.6'], ['GB-102', 'Cover', 'Al 6061-T6', 'CNC machining', 'General ISO 2768-mK'], ['GB-201', 'Input shaft', 'EN19 (42CrMo4)', 'Turning + grinding', 'Bearing seats Ø25 k6'], ['GB-301', 'Output shaft', 'EN19 (42CrMo4)', 'Turning + grinding', 'Bearing seats Ø30 k6'], ['GB-202', 'Pinion 17T m2', '20MnCr5', 'Hobbing + case hardening + grinding', 'ISO 1328 grade 6, case 0.6–0.8 mm, 58–62 HRC'], ['GB-302', 'Gear 42T m2', '20MnCr5', 'Hobbing + case hardening + grinding', 'ISO 1328 grade 6, case 0.6–0.8 mm, 58–62 HRC']];
  const sel = new Set([0, 4, 5]);
  const st = form(el, [
    { k: 'q', t: 'num', l: 'Sets', v: 25, min: 1 },
    { k: 'wk', t: 'num', l: 'Delivery', v: 8, min: 1, u: 'weeks' },
    { k: 'mtc', t: 'chk', l: 'Material test certificate (EN 10204 3.1)', v: true },
    { k: 'dim', t: 'chk', l: 'Dimensional report', v: true },
    { k: 'fai', t: 'chk', l: 'First article inspection', v: false },
    { k: 'rev', t: 'chk', l: 'Drawing revisions listed', v: true },
    { k: 'conf', t: 'chk', l: 'NDA / confidentiality note', v: true }
  ], draw);
  const tb = div(el); tb.innerHTML = '<div class="ctl">' + ITEMS.map((it, i) => `<label><input type="checkbox" data-i="${i}" ${sel.has(i) ? 'checked' : ''}> ${it[0]} ${it[1]}</label>`).join('') + '</div>';
  tb.onchange = e => { const i = +e.target.dataset.i; e.target.checked ? sel.add(i) : sel.delete(i); draw(); };
  const row = div(el, 'row'), left = div(row), out = div(row, 'out'); left.style.flex = '2 1 520px'; out.style.whiteSpace = 'normal';
  const pre = codeBox(left);
  function draw() {
    const its = [...sel].sort().map(i => ITEMS[i]);
    pre.textContent = `Subject: RFQ — gear reducer parts, ${st.q} sets — quote by ${new Date(Date.now() + 10 * 864e5).toISOString().slice(0, 10)}\n\nDear Sir/Madam,\n\nPlease quote for the following parts as per the attached drawings:\n\n` + its.map((it, k) => `${k + 1}. ${it[0]}${st.rev ? ' Rev A' : ''} — ${it[1]}\n   Material: ${it[2]} · Process: ${it[3]}\n   Key requirements: ${it[4]}\n   Quantity: ${st.q} nos`).join('\n') + `\n\nDelivery: ${st.wk} weeks from purchase order, ex-works.\nDocuments with supply: ${[st.mtc && 'material test certificate EN 10204 3.1', st.dim && 'dimensional inspection report', st.fai && 'first article inspection report'].filter(Boolean).join(', ') || 'none'}.\nPlease state unit price, tooling/pattern cost separately, validity, payment terms and any deviations from the drawing.\n${st.conf ? 'The drawings are confidential and are shared only for this quotation.\n' : ''}\nRegards,\n[Name], [Company], [Phone]`;
    const chk = [[its.length > 0, 'At least one part selected'], [st.rev, 'Drawing numbers with revision'], [its.every(i => i[2]), 'Material grade for every part'], [true, 'Heat treatment and hardness stated for gears'], [st.q > 0, 'Quantity'], [st.wk > 0, 'Delivery time'], [st.mtc || st.dim, 'Inspection documents'], [st.conf, 'Confidentiality note'], [true, 'Tooling/pattern cost asked separately']];
    const sc = chk.filter(c => c[0]).length;
    out.innerHTML = `<b>RFQ completeness ${sc} / ${chk.length}</b><br>` + chk.map(c => (c[0] ? '✓ ' : '✗ ') + c[1]).join('<br>') + '<br><br><span class="hint">Send the drawings, not just this text. Before using an AI to polish an RFQ, remove anything your organisation does not allow outside — part numbers, customer names, defence or export-controlled data.</span>';
  }
  draw();
};

/* Day 41: rendering lights */
W.render = el => {
  lab(el);
  const MAT = { steel: [175, 182, 192], blue: [60, 110, 200], orange: [235, 140, 50], black: [70, 74, 82], white: [235, 236, 238] };
  const st = form(el, [
    { k: 'm', t: 'sel', l: 'Appearance', o: [['steel', 'Machined steel'], ['blue', 'Blue powder coat'], ['orange', 'Orange plastic'], ['black', 'Black anodised'], ['white', 'White plastic']], v: 'blue' },
    { k: 'az', t: 'range', l: 'Key light azimuth', min: -180, max: 180, v: 35, u: '°' },
    { k: 'el', t: 'range', l: 'Key light elevation', min: -10, max: 90, v: 40, u: '°' },
    { k: 'amb', t: 'range', l: 'Fill / environment', min: 0, max: 90, v: 40, u: '%' }
  ], () => vw.draw());
  const prof = [[8, 0], [42, 0], [42, 6], [32, 15], [42, 24], [42, 30], [20, 30], [20, 44], [8, 44]];
  const vw = Viewer(el, () => G.revolve(prof, 2 * PI, 48, { c: MAT[st.m] }), { yaw: -0.5, pitch: 0.45, light: () => { const a = rad(st.az), e = rad(st.el); return [Math.sin(a) * Math.cos(e), Math.sin(e), Math.cos(a) * Math.cos(e)]; }, amb: () => st.amb / 100 });
  div(el, 'hint', 'Lighting here is relative to the camera, as in a studio. Low fill gives drama but hides detail; high fill flattens the shape. Product shots usually use a key light 30–45° up and to one side, plus fill.');
};

/* ---------------- boot ---------------- */
document.addEventListener('DOMContentLoaded', () => {
  const tb = $('.toolbar');
  if (tb) {
    const b = id => $('#' + id, tb);
    b('sbBtn') && (b('sbBtn').onclick = toggleSidebar); b('themeBtn') && (b('themeBtn').onclick = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark')); b('fsBtn') && (b('fsBtn').onclick = fullscreen);
  }
  buildToc(); doneBar(); steps(); initQuizzes(); hub(); refreshAll(); copyButtons();
  $$('.widget').forEach(el => { const f = W[el.dataset.w]; if (!f) return; try { f(el); } catch (e) { el.textContent = 'This lab failed to load: ' + e.message; console.error(e); } });
  document.addEventListener('fullscreenchange', () => setTimeout(SW.redraw, 100));
});
})();
