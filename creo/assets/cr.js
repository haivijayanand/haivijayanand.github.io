/*
TOOL:    creo/assets/cr.js — shared engine for the 28-Day Creo Parametric Course: page shell, progress, quiz, 3D viewer and interactive labs
FAMILY:  creo
VERSION: 1.0.0
DATE:    2026-11-16
CHAT:    Same like solidworks, create a GitHub for Creo also
CHANGES: 1.0.0 - first version, adapted from the SolidWorks course engine sw.js 1.1.0; Creo wording in shared labs; new labs: Creo window map, relations editor (IF/ENDIF), family table, parent/child + resolve, mechanism connections, config.pro/mapkey planner
STATUS:  working
*/
(function () {
'use strict';
const SW = window.SW = window.SW || {};
SW.version = '1.0.0';
const ND = () => (window.SW_DAYS ? SW_DAYS.length : 28);
const $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const store = {
  get(k, d) { try { const v = localStorage.getItem('cr28:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('cr28:' + k, JSON.stringify(v)); } catch (e) { } }
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
SW.resetProgress = () => { if (confirm('Clear all progress, ticks and quiz scores stored in this browser?')) { try { Object.keys(localStorage).filter(k => k.startsWith('cr28:')).forEach(k => localStorage.removeItem(k)); } catch (e) { } location.reload(); } };

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
    { k: 'c1', t: 'chk', l: 'Coincident: corner ↔ RIGHT/TOP references', v: false },
    { k: 'c2', t: 'chk', l: 'Width = 80 mm', v: false },
    { k: 'c3', t: 'chk', l: 'Height = 50 mm', v: false },
    { k: 'c4', t: 'chk', l: 'Diagonal = 94.34 mm', v: false },
    { k: 'c5', t: 'chk', l: 'Extra Horizontal on top line', v: false },
    { k: 'c6', t: 'chk', l: 'Lock the corner position', v: false }
  ], draw);
  const row = div(el, 'row'), svgBox = div(row), out = div(row, 'out');
  const ctl = div(el, 'ctl'); let ph = 0;
  const an = animCtl(ctl, el, dt => { ph += dt * 2.2; draw(); }, () => { ph += 0.6; draw(); });
  function calc() {
    let rem = 0; const red = [];
    if (st.c1) rem += 2;
    if (st.c6) { if (st.c1) red.push('Locking repeats what the coincident-to-references constraint already did'); else rem += 2; }
    if (st.c2) rem++; if (st.c3) rem++;
    if (st.c4) { if (st.c2 && st.c3) red.push('Width + height + diagonal = three dimensions for two sizes'); else rem++; }
    if (st.c5) red.push('The top line is already Horizontal (H) — a corner rectangle comes with it');
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
    s += `<line class="d" x1="${X0 - 40}" y1="${Y0}" x2="${X0 + 40}" y2="${Y0}"/><line class="d" x1="${X0}" y1="${Y0 + 30}" x2="${X0}" y2="${Y0 - 40}"/>${arrow(X0 + 40, Y0, 0, 8)}${arrow(X0, Y0 - 40, -PI / 2, 8)}<text x="${X0 - 34}" y="${Y0 + 18}" class="s">References</text>`;
    s += `<rect class="${cls}" x="${x}" y="${y - H2}" width="${W2}" height="${H2}" style="stroke-width:${state === 'full' ? 2.5 : 3.5}"/>`;
    [[x, y], [x + W2, y], [x + W2, y - H2], [x, y - H2]].forEach(p => s += `<circle cx="${p[0]}" cy="${p[1]}" r="4" class="${state === 'full' ? 'fi' : state === 'under' ? 'fp' : 'fa'}"/>`);
    if (st.c2) s += dimL(x, y + 26, x + W2, y + 26, '80');
    if (st.c3) s += dimL(x - 26, y, x - 26, y - H2, '50');
    if (st.c4) s += dimL(x, y, x + W2, y - H2, '94.34');
    if (st.c6) s += `<text x="${x - 6}" y="${y + 16}" class="ot">⚓ Fixed</text>`;
    if (state === 'over') s += `<text x="${x + W2 / 2}" y="${y - H2 - 12}" text-anchor="middle" class="ot" style="font-size:16px">! Resolve Sketch</text>`;
    s += '</svg>'; svgBox.innerHTML = s;
    const lbl = { under: '<span class="badge" style="color:var(--pri)">STILL WEAK</span> Creo never leaves a sketch loose: it adds <b>weak dimensions</b> (lighter, can be replaced at any time) for every missing DOF. Your intent is not captured yet — make the dimensions you care about <b>strong</b>.', full: '<span class="badge" style="color:var(--ink)">ALL STRONG</span> Every DOF is held by a dimension or constraint <b>you</b> chose. Creo keeps no weak dimensions — this is your design intent.', over: '<span class="badge" style="color:var(--acc2)">CONFLICT</span> Creo opens the <b>Resolve Sketch</b> dialog, highlights the clashing items and offers Undo, Delete, Dim &gt; Ref or Explain. It will not let you keep both.' }[state];
    out.style.whiteSpace = 'normal';
    out.innerHTML = `A corner rectangle starts with <b>4 degrees of freedom</b> (x, y of a corner, width, height).<br><br>Remaining DOF: <b style="font-size:22px">${Math.max(0, c.dof)}</b><br>${lbl}${c.red.length ? '<br><br>Redundant: ' + c.red.map(r => '• ' + r).join('<br>') : ''}<br><br><span class="hint">Press <kbd>P</kbd> to drag the sketch: whatever still moves is held only by weak dimensions, which Creo would happily change for you.</span>`;
  }
  draw();
};

/* Day 3: sketch relations */
W.relations = el => {
  lab(el);
  const A = { x1: 70, y1: 270, x2: 270, y2: 200 };
  const init = () => ({ B: { x1: 340, y1: 120, x2: 540, y2: 230 }, C1: { x: 450, y: 290, r: 34 }, C2: { x: 190, y: 105, r: 50 } });
  let S = init(), applied = [], msg = 'Pick a constraint. Line A (black) is fixed; line B and circle C1 (blue) move to obey.';
  const lenA = Math.hypot(A.x2 - A.x1, A.y2 - A.y1), uA = [(A.x2 - A.x1) / lenA, (A.y2 - A.y1) / lenA];
  const lB = B => Math.hypot(B.x2 - B.x1, B.y2 - B.y1);
  const setDir = (B, u, L) => { L = L || lB(B); B.x2 = B.x1 + u[0] * L; B.y2 = B.y1 + u[1] * L; };
  const distLine = (x, y) => ((x - A.x1) * uA[1] - (y - A.y1) * uA[0]);
  const REL = {
    Horizontal: { ap: s => setDir(s.B, [Math.sign(s.B.x2 - s.B.x1) || 1, 0]), ck: s => Math.abs(s.B.y2 - s.B.y1) < .6 },
    Vertical: { ap: s => setDir(s.B, [0, Math.sign(s.B.y2 - s.B.y1) || 1]), ck: s => Math.abs(s.B.x2 - s.B.x1) < .6 },
    Parallel: { ap: s => setDir(s.B, uA), ck: s => { const L = lB(s.B); return Math.abs(((s.B.x2 - s.B.x1) * uA[1] - (s.B.y2 - s.B.y1) * uA[0]) / L) < .01; } },
    Perpendicular: { ap: s => setDir(s.B, [-uA[1], uA[0]]), ck: s => { const L = lB(s.B); return Math.abs(((s.B.x2 - s.B.x1) * uA[0] + (s.B.y2 - s.B.y1) * uA[1]) / L) < .01; } },
    'Coincident (collinear)': { ap: s => { const d = distLine(s.B.x1, s.B.y1); s.B.x1 -= d * uA[1]; s.B.y1 += d * uA[0]; setDir(s.B, uA); }, ck: s => REL.Parallel.ck(s) && Math.abs(distLine(s.B.x1, s.B.y1)) < .6 },
    'Equal (lengths)': { ap: s => { const L = lB(s.B); setDir(s.B, [(s.B.x2 - s.B.x1) / L, (s.B.y2 - s.B.y1) / L], lenA); }, ck: s => Math.abs(lB(s.B) - lenA) < .6 },
    'Coincident (points)': { ap: s => { const dx = A.x2 - s.B.x1, dy = A.y2 - s.B.y1; s.B.x1 += dx; s.B.y1 += dy; s.B.x2 += dx; s.B.y2 += dy; }, ck: s => Math.hypot(A.x2 - s.B.x1, A.y2 - s.B.y1) < .6 },
    'Mid-point': { ap: s => { const mx = (A.x1 + A.x2) / 2, my = (A.y1 + A.y2) / 2, dx = mx - s.B.x1, dy = my - s.B.y1; s.B.x1 += dx; s.B.y1 += dy; s.B.x2 += dx; s.B.y2 += dy; }, ck: s => Math.hypot((A.x1 + A.x2) / 2 - s.B.x1, (A.y1 + A.y2) / 2 - s.B.y1) < .6 },
    Tangent: { ap: s => { const d = distLine(s.C1.x, s.C1.y), sg = Math.sign(d) || 1, k = sg * s.C1.r - d; s.C1.x += k * uA[1]; s.C1.y -= k * uA[0]; }, ck: s => Math.abs(Math.abs(distLine(s.C1.x, s.C1.y)) - s.C1.r) < .6 },
    'Coincident (centres)': { ap: s => { s.C1.x = s.C2.x; s.C1.y = s.C2.y; }, ck: s => Math.hypot(s.C1.x - s.C2.x, s.C1.y - s.C2.y) < .6 },
    'Equal (radii)': { ap: s => { s.C1.r = s.C2.r; }, ck: s => Math.abs(s.C1.r - s.C2.r) < .6 }
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
    if (broken.length) { msg = `<b style="color:var(--acc2)">Conflict:</b> ${r} cannot be satisfied together with ${broken.join(', ')}. Creo would open the <b>Resolve Sketch</b> dialog with both highlighted — delete one, or turn a dimension into a reference (Dim &gt; Ref).`; draw(); return; }
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
    s += `<text x="10" y="370" class="s">Constraints on the sketch: ${applied.length ? applied.join(' · ') : 'none'}</text></svg>`;
    box.innerHTML = s; out.innerHTML = msg;
  }
  draw();
};

/* Day 4: extrude end conditions */
W.extrude = el => {
  lab(el);
  const st = form(el, [
    { k: 'f', t: 'seg', l: 'Feature', o: [['boss', 'Extrude (add material)'], ['cut', 'Extrude ▸ Remove Material']], v: 'boss' },
    { k: 'p', t: 'sel', l: 'Sketch', o: [['c', 'Circle Ø50'], ['r', 'Rectangle 60×36'], ['l', 'L-shape']], v: 'c' },
    { k: 'e', t: 'sel', l: 'Depth option', o: [['blind', 'Blind'], ['mid', 'Symmetric'], ['upto', 'To Selected'], ['thru', 'Through All']], v: 'blind' },
    { k: 'd', t: 'range', l: 'Depth', min: 5, max: 90, v: 40, u: 'mm' },
    { k: 'dr', t: 'range', l: 'Taper (Options tab)', min: 0, max: 15, v: 0, u: '°' },
    { k: 'rev', t: 'chk', l: 'Flip direction (arrow)', v: false }
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
      if (st.e === 'mid') { y0 = BT - D / 2; y1 = BT + D / 2; } else if (st.e === 'thru') { y0 = BT; y1 = BT + D; note = 'Through All is meant for removing material — on an added extrude there is nothing to pass through, so this behaves like Blind here.'; } else { y0 = BT; y1 = BT + dir * D; }
      if (st.rev && st.e === 'blind') note = 'Flipped: the extrude grows down into the base block and merges with it — nothing new appears outside.';
      F.push(...G.box(-70, 70, 0, BT, -45, 45, { c: COL.grey }));
      const off = Math.abs(y1 - y0) * Math.tan(T), Pt = prof(st.p, off);
      const lo = Math.min(y0, y1), hi = Math.max(y0, y1), Pl = y1 > y0 ? P0 : Pt, Ph = y1 > y0 ? Pt : P0;
      F.push(...G.ringLoft(Pl.map(q => [q[0], lo, q[1]]), Ph.map(q => [q[0], hi, q[1]]), { c: COL.part }, true, st.p !== 'c'));
      if (st.e === 'upto') F.push(...G.quad([0, BT + 75, 0], [0, 1, 0], 80, 60, { c: COL.acc, a: 0.3, ec: 'rgba(200,110,30,.9)' }));
      const A0 = area(P0), A1 = area(Pt), h = Math.abs(y1 - y0), V = h / 3 * (A0 + A1 + Math.sqrt(A0 * A1));
      out.textContent = `Extrude height ${fmt(h, 1)} mm${st.e === 'mid' ? ` (${fmt(h / 2, 1)} each side of the sketch plane)` : ''}\nSketch area ${fmt(A0, 0)} mm²${T ? ` · top area after ${st.dr}° taper ${fmt(A1, 0)} mm²` : ''}\nVolume added ≈ ${fmt(V, 0)} mm³${note ? '\n' + note : ''}${st.p === 'l' && st.dr ? '\n(Taper preview is shown on the circle and rectangle only.)' : ''}`;
    } else {
      const D = st.e === 'thru' ? BT : st.e === 'upto' ? 18 : Math.min(st.d, st.e === 'mid' ? 2 * BT : BT), holeTop = BT, holeBot = st.e === 'mid' ? Math.max(0, BT - D / 2) : BT - D;
      const blk = [[-70, -45], [70, -45], [70, 45], [-70, 45]], H = P0.slice().reverse();
      F.push(Object.assign({ e: true, c: COL.grey }, { p: blk.map(q => [q[0], BT, q[1]]), h: [H.map(q => [q[0], BT, q[1]])] }));
      F.push(Object.assign({ e: true, c: COL.grey }, { p: blk.map(q => [q[0], 0, q[1]]), h: holeBot <= 0.01 ? [H.map(q => [q[0], 0, q[1]])] : null }));
      for (let i = 0; i < 4; i++) { const a = blk[i], b = blk[(i + 1) % 4]; F.push({ c: COL.grey, e: true, p: [[a[0], 0, a[1]], [b[0], 0, b[1]], [b[0], BT, b[1]], [a[0], BT, a[1]]] }); }
      F.push(...G.ringLoft(P0.map(q => [q[0], Math.max(0, holeBot), q[1]]), P0.map(q => [q[0], holeTop, q[1]]), { c: COL.acc, zb: -60 }, false));
      if (holeBot > 0.01) F.push({ c: COL.acc, e: true, p: P0.map(q => [q[0], holeBot, q[1]]), zb: -60 });
      if (st.e === 'upto') F.push(...G.quad([0, 18, 0], [0, 1, 0], 80, 55, { c: COL.acc, a: 0.25 }));
      out.textContent = `Cut depth ${fmt(holeTop - Math.max(0, holeBot), 1)} mm into a ${BT} mm block${holeBot <= 0.01 ? ' — goes right through' : ''}.\nVolume removed ≈ ${fmt(area(P0) * (holeTop - Math.max(0, holeBot)), 0)} mm³` + (st.e === 'blind' && st.d > BT ? '\nDepth larger than the block: the cut simply exits the bottom. Use Through All so the cut stays through if the block gets thicker later.' : '') + (st.e === 'mid' ? '\nSymmetric removes half the depth on each side of the sketch plane — the half above the top face removes nothing.' : '') + (st.e === 'upto' ? '\nTo Selected: the cut stops at the selected (orange) surface, wherever it moves.' : '');
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

/* Day 6: round / chamfer 2D */
W.fillet2d = el => {
  lab(el);
  const st = form(el, [
    { k: 'm', t: 'seg', o: [['f', 'Round'], ['cd', 'Chamfer D1 × D2'], ['ca', 'Chamfer Angle × D']], v: 'f' },
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
    out.textContent = (st.m === 'f' ? `Round R${r}: removes (1 − π/4)R² = ${fmt((1 - PI / 4) * r * r, 1)} mm² per corner` : st.m === 'cd' ? `Chamfer ${d1} × ${d2}: removes ½·d1·d2 = ${fmt(0.5 * d1 * d2, 1)} mm² per corner` : `Chamfer ${d1} × ${st.an}°: second leg = d1·tan(angle) = ${fmt(d2, 2)} mm`) + `\nCorners treated: ${n} · area removed ${fmt(removed, 1)} mm² of ${Wd * H} mm²` + (r >= H / 2 && st.m === 'f' ? '\nR = half the height: the ends become full rounds (a slot shape). Any larger and Creo reports that the round cannot be made.' : '');
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
    { k: 'm', t: 'seg', o: [['lin', 'Direction pattern'], ['cir', 'Axis pattern'], ['mir', 'Mirror']], v: 'lin' },
    { k: 'n1', t: 'range', l: 'Instances (Dir 1)', min: 1, max: 12, v: 5 },
    { k: 's1', t: 'range', l: 'Spacing 1', min: 10, max: 80, v: 50, u: 'mm' },
    { k: 'n2', t: 'range', l: 'Instances (Dir 2)', min: 1, max: 8, v: 3 },
    { k: 's2', t: 'range', l: 'Spacing 2', min: 10, max: 80, v: 50, u: 'mm' },
    { k: 'd', t: 'range', l: 'Hole Ø', min: 4, max: 30, v: 14, u: 'mm' },
    { k: 'ang', t: 'range', l: 'Total angle', min: 30, max: 360, s: 15, v: 360, u: '°' },
    { k: 'eq', t: 'chk', l: 'Equal spacing', v: true }
  ], () => { skip.clear(); draw(); });
  const skip = new Set(), box = div(el), out = div(el, 'out');
  div(el, 'hint', 'Direction pattern: click an instance to skip it (in Creo: click its black dot so it turns white). The pattern leader (orange) cannot be skipped.');
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
      txt = `Instances made: ${n} (${st.n1} × ${st.n2} − ${skip.size} skipped)` + (st.s1 < st.d || st.s2 < st.d ? '\nSpacing smaller than the hole: instances overlap and merge into a slot.' : '') + (bad ? `\n${bad} instance(s) run off the plate (dashed orange). Creo still makes them — the cut just removes nothing there — so check your counts.` : '');
    } else if (st.m === 'cir') {
      const cx = 290, cy = 175, OD = 200, PCD = 140; s += `<circle class="fg" cx="${cx}" cy="${cy}" r="${OD / 2 * sc * 0.75}"/><circle class="fg" cx="${cx}" cy="${cy}" r="${30 * sc * 0.75}" style="fill:var(--card)"/><circle class="cl" cx="${cx}" cy="${cy}" r="${PCD / 2 * sc * 0.75}"/>`;
      const n = st.n1, step = st.eq ? (st.ang >= 360 ? 360 / n : n > 1 ? st.ang / (n - 1) : 0) : st.ang;
      for (let i = 0; i < n; i++) { const a = rad(-90 + i * step); s += `<circle cx="${cx + PCD / 2 * sc * 0.75 * Math.cos(a)}" cy="${cy + PCD / 2 * sc * 0.75 * Math.sin(a)}" r="${st.d / 2 * sc * 0.75}" class="${i ? 'fb' : 'fo'}"/>`; }
      txt = `${n} instances on PCD 140 · angular step ${fmt(step, 2)}°` + (st.eq ? (st.ang >= 360 ? ' (360 / N)' : ` (total ${st.ang}° shared between N − 1 gaps)`) : ' (Equal spacing off: the angle box is the step between instances)') + (!st.eq && step * (n - 1) >= 360 ? '\nInstances wrap past 360° and overlap.' : '');
    } else {
      const cx = 290; s += `<rect class="fg" x="${cx - 220}" y="50" width="440" height="240"/><line class="cl" x1="${cx}" y1="30" x2="${cx}" y2="310"/><text x="${cx + 6}" y="44" class="s">RIGHT (mirror plane)</text>`;
      const feat = (x, cls) => `<rect class="${cls}" x="${x - 30}" y="90" width="60" height="22" rx="11"/><circle class="${cls}" cx="${x}" cy="170" r="16"/><circle class="${cls}" cx="${x + (x > cx ? 60 : -60)}" cy="240" r="10"/>`;
      s += feat(cx + 120, 'fo') + (st.eq ? feat(cx - 120, 'fb') : '');
      txt = st.eq ? 'Mirror copies the leader features (orange) across RIGHT. Edit the leader and the copy follows — design intent: "always symmetric".' : 'Tick "Equal spacing" above to switch the mirror on (re-used checkbox in this mode).';
    }
    s += '</svg>'; box.innerHTML = s; out.textContent = txt;
  }
  draw();
};

/* Day 8: reference planes */
W.planes = el => {
  lab(el);
  const st = form(el, [
    { k: 'm', t: 'seg', o: [['off', 'Offset'], ['ang', 'Through edge + Angle'], ['mid', 'Midway (by relation)'], ['tan', 'Tangent to cylinder']], v: 'off' },
    { k: 'd', t: 'range', l: 'Offset', min: -30, max: 80, v: 30, u: 'mm' },
    { k: 'a', t: 'range', l: 'Angle', min: 0, max: 90, v: 35, u: '°' },
    { k: 't', t: 'range', l: 'Tangent position', min: 0, max: 180, v: 45, u: '°' }
  ], () => vw.draw());
  const out = div(el, 'out');
  const vw = Viewer(el, () => {
    const F = [...G.box(-50, 50, 0, 40, -30, 30, { c: COL.part })];
    const cyl = G.revolve([[0, 0], [15, 0], [15, 60], [0, 60]], 2 * PI, 32, { c: COL.light }).map(f => Object.assign({}, f, { p: f.p.map(p => [p[0] + 0, p[2] + 40, p[1] - 30 + 0]) }));
    let P;
    if (st.m === 'off') { P = G.quad([0, 40 + st.d, 0], [0, 1, 0], 65, 42, { c: COL.acc, a: 0.35 }); out.textContent = `Plane parallel to the top face, ${st.d} mm ${st.d >= 0 ? 'above' : 'below'} it.\nModel ▸ Plane → reference: top face, constraint Offset, ${Math.abs(st.d)} mm${st.d < 0 ? ' (flip the arrow to go below)' : ''}.`; }
    else if (st.m === 'ang') { const a = rad(st.a), n = [0, Math.cos(a), Math.sin(a)]; P = G.quad([0, 40 + 40 * Math.sin(a), 30 - 40 * Math.cos(a)], n, 40, 65, { c: COL.acc, a: 0.35 }); out.textContent = `Plane through the top-front edge, rotated ${st.a}° from the top face.\nModel ▸ Plane → Ctrl-pick the front-top edge (Through) and the top face (Angle ${st.a}°). The edge is the hinge.`; }
    else if (st.m === 'mid') { P = G.quad([0, 20, 0], [1, 0, 0], 40, 45, { c: COL.acc, a: 0.35 }); out.textContent = 'Midway: a plane offset from the left face by a dimension driven by the relation  OFFSET = WIDTH / 2  — exactly half-way (50 mm from each).\nIf the block gets wider, the plane stays in the middle. Better still: model the block symmetric about RIGHT so RIGHT is already the mid-plane.'; }
    else { F.push(...cyl); const a = rad(st.t), n = [Math.cos(a), Math.sin(a), 0]; P = G.quad(V3.add([0, 40, 0], V3.mul(n, 15)), n, 38, 40, { c: COL.acc, a: 0.35 }); P = G.move(P, [0, 0, 0]); out.textContent = `Plane tangent to the Ø30 cylinder: first reference the cylindrical face (Tangent), second reference RIGHT (Angle ${st.t}°).`; }
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
    out.textContent = `Path length ≈ ${fmt(L, 1)} mm · profile area ${fmt(A, 1)} mm² · volume ≈ A × L = ${fmt(A * L, 0)} mm³` + (st.pa === 'hel' && 2 * r >= st.p ? '\n⚠ Profile is as big as the pitch: the coils touch/intersect. Creo fails the Helical Sweep with self-intersecting geometry — increase the pitch or reduce the wire.' : '') + (st.tw ? `\nTwist ${st.tw}° (in Creo: a relation such as sd5 = trajpar * angle on the section) — visible on the square profile.` : '');
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
    out.textContent = `Bottom area ${fmt(areas[0], 0)} mm² → top area ${fmt(areas[M], 0)} mm²\nLoft volume (Simpson's rule over ${M} slices) ≈ ${fmt(V, 0)} mm³` + (Math.abs(st.tw) > 45 ? '\nLarge twist: the side faces wrap and can self-intersect. In Creo set the same start point on every section (right-click a vertex ▸ Start Point) and keep the same number of entities in each.' : '') + (st.mid ? '\nThree sections: the loft passes smoothly through the middle profile.' : '');
    return F;
  }, { yaw: -0.6, pitch: 0.35 });
};

/* Day 11: standard holes */
const HOLES = { M3: [3, .5, 2.5, 3.2, 3.4, 3.6, 6.5, 3.4, 6.72], M4: [4, .7, 3.3, 4.3, 4.5, 4.8, 8, 4.4, 8.96], M5: [5, .8, 4.2, 5.3, 5.5, 5.8, 10, 5.4, 11.2], M6: [6, 1, 5, 6.4, 6.6, 7, 11, 6.4, 13.44], M8: [8, 1.25, 6.8, 8.4, 9, 10, 15, 8.6, 17.92], M10: [10, 1.5, 8.5, 10.5, 11, 12, 18, 10.6, 22.4], M12: [12, 1.75, 10.2, 13, 13.5, 14.5, 20, 12.6, 26.88], M16: [16, 2, 14, 17, 17.5, 18.5, 26, 16.6, 33.6], M20: [20, 2.5, 17.5, 21, 22, 24, 33, 20.6, 40.32] };
SW.HOLES = HOLES;
W.hole = el => {
  lab(el);
  const st = form(el, [
    { k: 'ty', t: 'seg', l: 'Hole type', o: [['cl', 'Clearance'], ['cb', 'Counterbore'], ['cs', 'Countersink'], ['tap', 'Tapped']], v: 'cb' },
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
    else if (st.ty === 'cb') { const dd = Math.min(cbH, T - 1); prof = [[cbD / 2, 0], [cbD / 2, dd], [cl / 2, dd], [cl / 2, T]]; txt = `Counterbore for ${st.sz} socket head cap screw (ISO 4762)\nØ${cl} THRU, ⌴ Ø${cbD} ↧ ${fmt(dd, 1)}\n(typical Creo standard-hole values — head sits just below the surface)`; }
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

/* Day 13: configurations / design table */
W.famtab = el => {
  lab(el);
  const rows = [['M6x20', 6, 20, 10, 4, 'Y'], ['M8x25', 8, 25, 13, 5.3, 'Y'], ['M10x30', 10, 30, 16, 6.4, 'Y'], ['M12x40', 12, 40, 18, 7.5, 'N'], ['M16x50', 16, 50, 24, 10, 'Y']];
  const head = ['Instance name', 'd1 (thread Ø)', 'd5 (shank length)', 'd3 (across flats)', 'd2 (head height)', 'F12 [CHAMFER]'];
  let act = 0; const tb = div(el), row = div(el, 'row'), box = div(row), out = div(row, 'out');
  const add = div(el, 'ctl', '<button data-a="add">+ Add instance row</button><span class="hint">Edit any cell. In Creo: Tools ▸ Family Table shows a grid like this. Y = feature present, N = suppressed, * = same as the generic.</span>');
  add.onclick = e => { if (e.target.dataset.a) { rows.push(['M20x60', 20, 60, 30, 12.5, 'Y']); act = rows.length - 1; table(); draw(); } };
  function table() {
    tb.innerHTML = '<table class="mono"><tr>' + head.map(h => `<th>${h}</th>`).join('') + '</tr>' + rows.map((r, i) => `<tr data-i="${i}" style="${i === act ? 'background:var(--hi);font-weight:700' : ''}">` + r.map((c, j) => `<td contenteditable="true" data-j="${j}">${c}</td>`).join('') + '</tr>').join('') + '</table>';
    $$('td', tb).forEach(td => { td.onfocus = () => { act = +td.parentElement.dataset.i; draw(); $$('tr', tb).forEach((t, k) => t.style.cssText = k - 1 === act ? 'background:var(--hi);font-weight:700' : ''); }; td.oninput = () => { const i = +td.parentElement.dataset.i, j = +td.dataset.j, v = td.textContent.trim(); rows[i][j] = j === 0 || j === 5 ? v : parseFloat(v) || 0; draw(); }; });
  }
  function draw() {
    const r = rows[act], D = r[1], L = r[2], S = r[3], K = r[4], ch = String(r[5]).toUpperCase() !== 'N';
    const sc = Math.min(10, 360 / (L + K + 10)), x0 = 40, cy = 110, X = v => x0 + v * sc;
    const E = S / Math.cos(PI / 6);
    let s = `<svg viewBox="0 0 440 220"><rect class="fb" x="${X(0)}" y="${cy - E / 2 * sc}" width="${K * sc}" height="${E * sc}"/><line class="k" x1="${X(0)}" y1="${cy - S / 2 * sc}" x2="${X(K)}" y2="${cy - S / 2 * sc}"/><line class="k" x1="${X(0)}" y1="${cy + S / 2 * sc}" x2="${X(K)}" y2="${cy + S / 2 * sc}"/>`;
    const c = ch ? Math.min(D * 0.12, 1.5) : 0;
    s += `<polygon class="fb" points="${pts([[X(K), cy - D / 2 * sc], [X(K + L - c), cy - D / 2 * sc], [X(K + L), cy - (D / 2 - c) * sc], [X(K + L), cy + (D / 2 - c) * sc], [X(K + L - c), cy + D / 2 * sc], [X(K), cy + D / 2 * sc]])}"/>`;
    const tl = Math.min(L, 2 * D + 6); s += `<line class="k dash" x1="${X(K + L - tl)}" y1="${cy - D / 2 * sc * 0.8}" x2="${X(K + L)}" y2="${cy - D / 2 * sc * 0.8}"/><line class="k dash" x1="${X(K + L - tl)}" y1="${cy + D / 2 * sc * 0.8}" x2="${X(K + L)}" y2="${cy + D / 2 * sc * 0.8}"/>`;
    s += dimL(X(K), cy + E / 2 * sc + 22, X(K + L), cy + E / 2 * sc + 22, 'L ' + L) + `<line class="cl" x1="${X(-5)}" y1="${cy}" x2="${X(K + L + 5)}" y2="${cy}"/></svg>`;
    box.innerHTML = s;
    out.textContent = `Instance shown: ${r[0]}\nThread Ø${D}, length ${L}, head ${S} A/F × ${K}\nChamfer F12 is ${ch ? 'Y — present' : 'N — suppressed in this instance, the end is square'}\nThread length shown ≈ 2d + 6 (ISO 4014 rule for L ≤ 125); ISO 4017 bolts are threaded fully.`;
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
    out.textContent = `Volume        ${fmt(V, 0)} mm³\nSurface area  ${fmt(S, 0)} mm²\nDensity       ${MATS[+st.m][1]} kg/m³ = ${fmt(MATS[+st.m][1] * 1e-6, 5)} g/mm³\nMass          ${fmt(m * 1000, 1)} g  (${fmt(m, 3)} kg)\n${txt}\nPrincipal moments of inertia at the centroid (kg·mm²)\n  ${st.sh === 'blk' ? 'Ix (along L)' : 'I axial'}  ${fmt(I[0], 1)}\n  ${st.sh === 'blk' ? 'Iy (along H)' : 'I transverse'}  ${fmt(I[1], 1)}\n  ${st.sh === 'blk' ? 'Iz (along W)' : 'I transverse'}  ${fmt(I[2], 1)}\nCompare with Analysis ▸ Mass Properties in Creo.`;
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
    ['m2', 'Coincident: bracket hole axis ↔ pin axis', ['Tx', 'Tz', 'Rx', 'Rz']],
    ['m3', 'Parallel: bracket front face ↔ base front face', ['Rx', 'Ry']],
    ['m4', 'Distance 20 mm: bracket front face ↔ base front face', ['Tz', 'Rx', 'Ry']],
    ['m5', 'Coincident: bracket right face ↔ base right face', ['Tx', 'Ry', 'Rz']],
    ['m6', 'Fix (bracket where it is)', ['Tx', 'Ty', 'Tz', 'Rx', 'Ry', 'Rz']]
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
    out.innerHTML = `<b>Free degrees of freedom</b><br>${['Tx', 'Ty', 'Tz', 'Rx', 'Ry', 'Rz'].map(d => `<span class="chip ${c.rem.has(d) ? '' : 'off'}">${d}</span>`).join('')}<br><br>Placement status: <b class="mono">${st === 'over' ? 'Constraints invalid' : st === 'under' ? 'Partially Constrained' : 'Fully Constrained'}</b>` + (c.red.length ? `<br><br>Adds nothing new: ${c.red.join(', ')} (redundant — avoid it).` : '') + (c.conflict ? '<br><br><b style="color:var(--acc2)">Conflict:</b> the pin already fixes X and Z through the hole, so a right-face coincident and a distance on the front face fight it. Creo reports the constraint set as invalid and will not finish the placement.' : '') + '<br><br><span class="hint">Press <kbd>P</kbd> to drag the bracket: anything still free will move. Typical full set: Coincident (faces) + Coincident (axes) + Parallel. If it must turn, use a Pin connection instead (Day 18).</span>';
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
    out.textContent = `Pitch Ø: d1 = m·N1 = ${fmt(m * st.n1, 1)} mm, d2 = m·N2 = ${fmt(m * st.n2, 1)} mm\nCentre distance a = m(N1+N2)/2 = ${fmt(a, 2)} mm\nRatio i = N2/N1 = ${fmt(i, 3)} : 1  → output ${fmt(st.rpm / i, 1)} rpm, torque × ${fmt(i, 3)} (ideal)\nCreo Mechanism gear pair: enter the pitch Ø ${fmt(m * st.n1, 1)} and ${fmt(m * st.n2, 1)} mm for the two Pin connections; Creo works out the ratio.`;
    pose();
  }
  function pose() { const g1 = $('#g1', box), g2 = $('#g2', box); if (!g1) return; const a2 = PI - PI / st.n2 - th * st.n1 / st.n2; $('#g1', box).parentNode.setAttribute('transform', `translate(${geo.cx1},${geo.cy}) scale(${geo.sc}) rotate(${deg(th)})`); g2.parentNode.setAttribute('transform', `translate(${geo.cx2},${geo.cy}) scale(${geo.sc}) rotate(${deg(a2)})`); }
  build();
};

W.topdown = el => {
  lab(el);
  const st = form(el, [
    { k: 'C', t: 'range', l: 'Skeleton: shaft centre distance', min: 70, max: 150, v: 100, u: 'mm' },
    { k: 'D', t: 'sel', l: 'Bearing OD', o: ['32', '35', '40', '47'], v: '35' },
    { k: 'mode', t: 'seg', o: [['td', 'Top-down (Copy Geometry from skeleton)'], ['bu', 'Bottom-up (typed values)']], v: 'td' },
    { k: 'lock', t: 'chk', l: 'Copy Geometry: Dependent off (frozen copy)', v: false }
  ], draw);
  const box = div(el), out = div(el, 'out'); let locked = null;
  function draw() {
    if (st.lock && !locked) locked = { C: st.C, D: +st.D }; if (!st.lock) locked = null;
    const sk = { C: st.C, D: +st.D }, part = st.mode === 'bu' ? { C: 100, D: 35 } : locked || sk;
    const sc = 1.5, ox = 70, cy = 120;
    const plate = (x0, title, p) => { let s = `<rect class="fg" x="${x0}" y="${cy - 55}" width="${(p.C + 80) * sc * 0.75}" height="110" rx="8"/><text x="${x0}" y="${cy - 64}">${title}</text>`; const c1 = x0 + 40 * sc * 0.75; [0, p.C].forEach(dx => s += `<circle cx="${c1 + dx * sc * 0.75}" cy="${cy}" r="${p.D / 2 * sc * 0.75}" class="k" style="fill:var(--card)"/>`); if (p !== sk && (p.C !== sk.C || p.D !== sk.D)) [0, sk.C].forEach(dx => s += `<circle cx="${c1 + dx * sc * 0.75}" cy="${cy}" r="${sk.D / 2 * sc * 0.75}" class="o dash"/>`); return s; };
    let s = `<svg viewBox="0 0 760 260"><text x="10" y="20" class="bt">Skeleton model (datum curves and axes in the assembly)</text><line class="b" x1="${ox}" y1="40" x2="${ox + st.C * sc * 0.75}" y2="40"/><circle cx="${ox}" cy="40" r="4" class="fp"/><circle cx="${ox + st.C * sc * 0.75}" cy="40" r="4" class="fp"/><text x="${ox + st.C * sc * 0.75 + 10}" y="44" class="bt">C = ${st.C}, bearing Ø${st.D}</text>`;
    s += plate(20, 'Housing.SLDPRT' + (st.mode === 'td' ? (st.lock ? ' ->*' : ' ->') : ''), part) + plate(400, 'Cover.SLDPRT' + (st.mode === 'td' ? (st.lock ? ' ->*' : ' ->') : ''), part) + '</svg>';
    box.innerHTML = s;
    const mis = part.C !== sk.C || part.D !== sk.D;
    out.textContent = (st.mode === 'td' ? (st.lock ? `Copy Geometry frozen (Dependent off) at C = ${part.C}, Ø${part.D}. The parts ignore the skeleton until you make the copy dependent again and regenerate.` : 'Each part copied the shaft axes and bearing sizes from the skeleton with a Copy Geometry feature and built its bores on them. Move the slider — they follow when you regenerate.') : 'Bottom-up: each part was drawn with typed numbers (C = 100, Ø35). Change the skeleton and nothing updates.') + (mis ? '\n⚠ Bores (black) no longer match the skeleton (dashed orange): the shafts will not fit.' : '\n✓ Bores match the skeleton.');
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
    { k: 'K', t: 'range', l: 'K-factor (Y = K·π/2)', min: 0.25, max: 0.5, s: 0.01, v: 0.44 },
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
    out.textContent = `Bend allowance  BA = θ·(R + K·T) = ${fmt(BA, 3)} mm\nOutside setback OSSB = tan(θ/2)·(R + T) = ${fmt(OSSB, 3)} mm\nBend deduction  BD = 2·OSSB − BA = ${fmt(BD, 3)} mm\nFlat length = L1 + L2 − BD = ${fmt(flat, 3)} mm\n  = flat 1 (${fmt(a1, 2)}) + BA (${fmt(BA, 2)}) + flat 2 (${fmt(a2, 2)})` + (a1 < 0 || a2 < 0 ? '\n⚠ A flange is shorter than the setback — it cannot be bent.' : '') + `\nCreo uses the Y-factor: Y = K·π/2 = ${fmt(K * PI / 2, 3)} (default 0.50 ⇔ K ≈ 0.32).\nSet it in File ▸ Prepare ▸ Model Properties ▸ Bend Allowance, or use a bend table. Typical K: 0.33 (R < T) to 0.5 (R > 3T).`;
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
    out.textContent = (first ? 'First angle: the object sits between you and the paper. Each view is projected THROUGH the object onto the plane behind it, so the top view lands BELOW and the right view lands on the LEFT.\nSymbol: the cone\'s big end faces the circles.' : 'Third angle: the paper is a glass box between you and the object. Each view is drawn on the side you looked from: top ABOVE, right on the RIGHT.\nSymbol: the cone\'s small end faces the circles.') + '\nThe views themselves are identical — only where they are placed changes. Dashed = hidden edge.\nCreo: detail option projection_type first_angle / third_angle (File ▸ Prepare ▸ Drawing Properties ▸ Detail Options).';
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
    out.innerHTML = `<b>${g[1]}</b> — ${meaning}<br>${err.length ? err.map(e => `<b style="color:var(--acc2)">⚠ ${e}</b>`).join('<br>') : '✓ Valid frame.'}${st.s === 'pos' && st.mod === 'M' ? '<br>At MMC the hole gets a bonus tolerance: the further the actual hole is from its smallest size, the more position error is allowed.' : ''}<br><span class="hint">Creo: Annotate ▸ Geometric Tolerance, attached to a dimension, a surface or a datum feature symbol — in the drawing or in the 3D model.</span>`;
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
    out.textContent = `At the join: tangent angle difference ${fmt(ang, 1)}° · curvature A ${fmt(kA * 1000, 3)} ×10⁻³, B ${fmt(kB * 1000, 3)} ×10⁻³ /px\n` + { '0': 'G0 (contact): the curves touch but the tangent jumps — you see a crease and a reflection break.', '1': 'G1 (tangent): no crease, but the comb jumps in height — a reflection still shows a "kink" in highlights. Creo: Tangent constraint in sketches, Tangent boundary condition in Boundary Blend.', '2': 'G2 (curvature): the comb heights match at the join — smooth reflections. Creo: Curvature boundary condition in Boundary Blend, or curvature-continuous Style (ISDX) curves.' }[st.c];
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
    out.textContent = `Tapered bar, L = 200 mm, area 200 → 50 mm², P = 10 kN, E = 200 GPa\nExact tip displacement  ${fmt(ex, 5)} mm\nFE with ${st.n} element(s)   ${fmt(d, 5)} mm\nError ${fmt((d - ex) / ex * 100, 3)} %\nEach extra element helps less: this is mesh convergence. Creo Simulate does this for you with Multi-Pass Adaptive: it raises the polynomial order of each element until the result changes by less than the set percentage.`;
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
  const title = el.dataset.title || '28-Day Creo Parametric Course', topics = el.dataset.topics || 'sketching, part modelling, design intent, assemblies, mechanisms, drawings, sheetmetal, surfacing and simulation';
  el._upd = () => {
    const dm = doneMap(); let n = 0; for (let i = d0; i <= d1; i++) if (dm[i]) n++;
    const sc = store.get(key + 'score', null);
    card.innerHTML = `<div class="series" style="letter-spacing:.2em;color:var(--soft)">CERTIFICATE OF COMPLETION</div><h2>${esc(title)}</h2><p>This is to certify that</p><div class="nm">${esc(nmIn.value || 'Your name')}</div><p>has worked through <b>${n} of ${tot}</b> days of ${esc(topics)}${sc ? `, and scored <b>${sc[0]} / ${sc[1]}</b> in the final assessment` : ''}.</p><p class="hint">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} · haivijayanand.github.io/creo</p>${n < tot || !sc ? `<p class="hint">(Complete all ${tot} days and the final assessment to make it count.)</p>` : ''}<p class="hint">A course-completion certificate — not an official PTC or Anthropic certification.</p>`;
  };
  nmIn.oninput = () => { store.set('name', nmIn.value); el._upd(); };
  pb.onclick = () => { document.body.classList.add('printcert'); window.print(); setTimeout(() => document.body.classList.remove('printcert'), 500); };
  el._upd();
};

/* ---------------- shared helpers ---------------- */
function copyText(t, btn) { const done = () => { if (btn) { const o = btn.textContent; btn.textContent = '✓ Copied'; setTimeout(() => btn.textContent = o, 1200); } }; try { navigator.clipboard.writeText(t).then(done, () => fallbackCopy(t, done)); } catch (e) { fallbackCopy(t, done); } }
function fallbackCopy(t, done) { const ta = document.createElement('textarea'); ta.value = t; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e) { } ta.remove(); done(); }
function copyButtons() { $$('pre.tpl').forEach(p => { if (p._cb) return; p._cb = 1; const b = document.createElement('button'); b.className = 'btn'; b.textContent = '📋 Copy template'; b.style.margin = '0 0 12px'; b.onclick = () => copyText(p.textContent, b); p.after(b); }); }
function codeBox(host) { const pre = document.createElement('pre'); pre.className = 'code'; host.appendChild(pre); const b = document.createElement('button'); b.className = 'btn'; b.textContent = '📋 Copy'; b.onclick = () => copyText(pre.textContent, b); host.appendChild(b); return pre; }
const today = () => new Date().toISOString().slice(0, 10);

/* ================= CREO-SPECIFIC LABS ================= */

/* Day 1: Creo Parametric window map */
W.uimap = el => {
  lab(el);
  const R = [
    ['Quick Access toolbar + title bar', 'grid-row:1;grid-column:1/4', 'Top strip: New, Open, Save, Undo/Redo, Regenerate, Windows, Close. The title shows the active model name and "(Active)" when several windows are open — only the active window takes commands. Customise it from the small arrow at its right end.'],
    ['Ribbon', 'grid-row:2;grid-column:1/4', 'Tabs change with the mode: in a part you get <b>Model, Analysis, Live Simulation, Annotate, Tools, View, Flexible Modeling, Applications</b>. Sheetmetal, Mechanism, Simulate and Render each bring their own tab. When you start a feature, its <b>dashboard</b> (a feature tab with options and slide-down panels) takes over the ribbon.'],
    ['Navigator tabs', 'grid-row:3;grid-column:1', 'Above the left pane: <b>Model Tree</b>, Folder Browser (your working directory and network places) and Favorites. The Folder Browser is the quickest way to see what is really in the working directory.'],
    ['Graphics toolbar', 'grid-row:3;grid-column:2', 'The in-graphics toolbar: Refit, Zoom In/Out, Repaint, Display Style (Shading with Edges, No Hidden, Wireframe), Saved Orientations, View Manager, Datum Display Filters (planes, axes, points, csys on/off), Annotation Display, Spin Center, and Sketch View while sketching.'],
    ['In-graphics status / Notification', 'grid-row:3/5;grid-column:3', 'On the right of the status bar: the <b>Notification Center</b> (warnings and regeneration failures), the <b>regeneration status</b> light and the <b>Selection Filter</b> (Smart, Geometry, Datum, Quilt, Annotation…). If you cannot pick an edge, check the filter first.'],
    ['Model Tree', 'grid-row:4;grid-column:1', 'The recipe of the model: default datum planes RIGHT, TOP, FRONT and PRT_CSYS_DEF, then every feature in order. The green <b>Insert Here</b> arrow is Creo\'s "rollback bar": drag it up to add features earlier in history. Right-click a feature for Edit Definition, Edit Dimensions, Suppress, Reorder, Information. Tree Filters and Tree Columns (settings icon) add parameters, layer status and failure flags as columns.'],
    ['Graphics window', 'grid-row:4;grid-column:2', 'Middle-drag spins, Shift + middle-drag pans, wheel zooms, Ctrl + middle-drag zooms (vertical) or turns (horizontal). <b>Ctrl+D</b> = standard orientation. Select something and a <b>mini toolbar</b> pops up with the commands that fit it; right-click-and-hold opens the context menu.'],
    ['Message area + status bar', 'grid-row:5;grid-column:1/4', 'Bottom line: prompts tell you what Creo wants next ("Select a plane or surface to define sketch plane") — read them. Also the Navigator and Browser show/hide buttons, the selection count and the filter. Most "Creo is stuck" moments are a prompt nobody read.']
  ];
  const g = div(el, 'uimap', R.map((r, i) => `<div data-i="${i}" style="${r[1]}">${r[0]}</div>`).join(''));
  const info = div(el, 'out', 'Click any area of the window.'); info.style.marginTop = '10px'; info.style.whiteSpace = 'normal';
  g.onclick = e => { const d = e.target.closest('[data-i]'); if (!d) return; $$('div', g).forEach(x => x.classList.toggle('on', x === d)); const r = R[+d.dataset.i]; info.innerHTML = `<b>${r[0]}</b> — ${r[2]}`; };
};

/* Day 12: Creo relations editor (parameters, IF/ELSE/ENDIF, functions in degrees) */
W.crrel = el => {
  lab(el);
  const ta = document.createElement('textarea'); ta.rows = 14; ta.spellcheck = false; ta.style.cssText = 'width:100%;font:14.5px JetBrains Mono,monospace;padding:8px;border-radius:8px;border:1px solid var(--rule);background:var(--card);color:var(--ink)';
  ta.value = `/* Flange — driven by OD and N\nOD = 160\nTHK = 12\nN = 6\nPCD = OD - 40\nBOLT_D = 11\nBORE = OD / 2\nIF N > 8\n  BOLT_D = 9\nENDIF\nPITCH_ANGLE = 360 / N\nLIGAMENT = PCD * sin(PITCH_ANGLE / 2) - BOLT_D\nMASS_G = 7.85E-3 * (pi / 4 * (OD^2 - BORE^2) - N * pi / 4 * BOLT_D^2) * THK`;
  el.appendChild(ta);
  div(el, 'hint', 'Edit the relations — the flange redraws as you type. Names are not case-sensitive. Comments start with /*. Allowed: + − * / ^ ( ), pi, sqrt() abs() floor() ceil() min() max(), sin() cos() tan() in degrees, IF … ELSE … ENDIF with == <> < > <= >= & |. Try N = 10, or PCD = OD - 10.');
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  const D2R = PI / 180;
  const FN = { SQRT: Math.sqrt, ABS: Math.abs, FLOOR: Math.floor, CEIL: Math.ceil, MIN: Math.min, MAX: Math.max, SIN: a => Math.sin(a * D2R), COS: a => Math.cos(a * D2R), TAN: a => Math.tan(a * D2R), ASIN: x => Math.asin(x) / D2R, ACOS: x => Math.acos(x) / D2R, ATAN: x => Math.atan(x) / D2R, LOG: Math.log10, LN: Math.log, EXP: Math.exp };
  function evalExpr(ex, vars) {
    let js = ex.replace(/<>/g, ' != ').replace(/!=/g, ' != ').replace(/==/g, ' === ').replace(/!= /g, '!== ').replace(/&/g, ' && ').replace(/\|/g, ' || ').replace(/\^/g, '**');
    let bad = null;
    js = js.replace(/[A-Za-z_][A-Za-z0-9_]*/g, w => {
      const u = w.toUpperCase();
      if (u === 'E' ) return w;
      if (u === 'PI') return '(' + PI + ')';
      if (u in FN) return 'F.' + u;
      if (u in vars) return '(' + vars[u] + ')';
      bad = bad || w; return '0';
    });
    if (bad) throw new Error(`"${bad}" is not defined yet — relations run top to bottom`);
    if (/[^0-9eE+\-*/().,<>=!&|\sF.A-Z]/.test(js)) throw new Error('unknown symbol');
    const v = Function('F', '"use strict";return (' + js + ')')(FN);
    if (typeof v === 'boolean') return v;
    if (!Number.isFinite(v)) throw new Error('result is not a number');
    return v;
  }
  function run() {
    const vars = {}, rows = [], stack = [];
    const active = () => stack.every(s => s.on);
    ta.value.split('\n').forEach((raw, i) => {
      const ln = raw.replace(/\/\*.*$/, '').trim(); if (!ln) return;
      const lnU = ln.toUpperCase();
      try {
        if (/^IF\b/.test(lnU)) { const c = active() ? !!evalExpr(ln.slice(2), vars) : false; stack.push({ on: c, taken: c, par: active() }); return; }
        if (/^ELSE$/.test(lnU)) { const s = stack[stack.length - 1]; if (!s) throw new Error('ELSE without IF'); s.on = !s.taken; return; }
        if (/^ENDIF$/.test(lnU)) { if (!stack.pop()) throw new Error('ENDIF without IF'); return; }
        const m = ln.match(/^([A-Za-z_][A-Za-z0-9_:]*)\s*=\s*(.+)$/);
        if (!m) throw new Error('expected  NAME = expression');
        if (/==|<>|!=/.test(m[2]) && !/^IF/i.test(ln)) throw new Error('comparison outside an IF');
        if (!active()) { rows.push([m[1], 'skipped (IF condition false)', 1]); return; }
        const v = evalExpr(m[2], vars); vars[m[1].toUpperCase()] = +v; rows.push([m[1], +v]);
      } catch (e) { rows.push([(ln.match(/^[A-Za-z_][A-Za-z0-9_]*/) || ['line ' + (i + 1)])[0], e.message]); }
    });
    if (stack.length) rows.push(['IF', 'missing ENDIF']);
    out.innerHTML = '<table><tr><th>Parameter</th><th>Value / message</th></tr>' + rows.map(r => `<tr><td class="mono">${esc(r[0].toUpperCase())}</td><td>${typeof r[1] === 'number' ? fmt(r[1], 3) : r[2] ? '<span class="hint">' + esc(r[1]) + '</span>' : '<b style="color:var(--acc2)">⚠ ' + esc(r[1]) + '</b>'}</td></tr>`).join('') + '</table>';
    const OD = vars.OD || 160, PCD = vars.PCD || 120, N = Math.max(1, Math.round(vars.N || 6)), BD = vars.BOLT_D || 11, Bo = vars.BORE || 80;
    const sc = 280 / Math.max(OD, 1) * 0.95, cx = 160, cy = 160; let s = `<svg viewBox="0 0 320 330"><circle class="fg" cx="${cx}" cy="${cy}" r="${OD / 2 * sc}"/><circle cx="${cx}" cy="${cy}" r="${Bo / 2 * sc}" style="fill:var(--card)" class="k"/><circle class="cl" cx="${cx}" cy="${cy}" r="${PCD / 2 * sc}"/>`;
    for (let i = 0; i < N; i++) { const a = -PI / 2 + i * 2 * PI / N; s += `<circle class="fb" cx="${cx + PCD / 2 * sc * Math.cos(a)}" cy="${cy + PCD / 2 * sc * Math.sin(a)}" r="${BD / 2 * sc}"/>`; }
    const warn = []; if (PCD / 2 + BD / 2 > OD / 2) warn.push('holes break out of the OD'); if (PCD / 2 - BD / 2 < Bo / 2) warn.push('holes cut into the bore'); if (PCD * Math.sin(PI / N) - BD < 0) warn.push('holes overlap');
    s += `<text x="8" y="322" class="${warn.length ? 'ot' : 's'}">${warn.length ? '⚠ ' + warn.join('; ') : `OD ${fmt(OD, 1)} · PCD ${fmt(PCD, 1)} · ${N} × Ø${fmt(BD, 1)} · bore ${fmt(Bo, 1)}`}</text></svg>`;
    box.innerHTML = s;
  }
  ta.oninput = run; run();
};

/* Day 15: parent/child, failures and resolving them */
W.regen = el => {
  lab(el);
  const F0 = [
    ['RIGHT', 'Datum plane', []], ['TOP', 'Datum plane', []], ['FRONT', 'Datum plane', []],
    ['Extrude 1', 'Base plate 120×80×12 (sketched on TOP)', ['TOP', 'RIGHT', 'FRONT']],
    ['Extrude 2', 'Boss Ø40 × 30 (sketched on the plate top face)', ['Extrude 1']],
    ['Hole 1', 'Ø20 bore on the boss top face, located 60 from RIGHT and 40 from FRONT', ['Extrude 2', 'RIGHT', 'FRONT']],
    ['Chamfer 1', '1×45° on the bore edge', ['Hole 1']],
    ['Round 1', 'R3 at the boss-to-plate edge', ['Extrude 1', 'Extrude 2']],
    ['Hole 2', 'Ø9 mounting hole, linear from RIGHT and FRONT', ['Extrude 1', 'RIGHT', 'FRONT']],
    ['Pattern 1', '2 × 2 pattern of Hole 2', ['Hole 2']]
  ];
  let F, st, sel, msg, failed;
  const reset = () => { F = F0.map(f => ({ n: f[0], d: f[1], p: f[2].slice(), s: 'ok' })); st = {}; sel = 'Extrude 2'; failed = null; msg = 'Click a feature in the tree to see its parents (what it was built on) and children (what is built on it). Then try the actions.'; };
  reset();
  const get = n => F.find(f => f.n === n);
  const kids = n => F.filter(f => f.p.includes(n) && f.s !== 'del').map(f => f.n);
  const allKids = n => { const out = new Set(), q = [n]; while (q.length) { const k = q.shift(); kids(k).forEach(c => { if (!out.has(c)) { out.add(c); q.push(c); } }); } return [...out]; };
  const row = div(el, 'row'), tree = div(row), right = div(row); tree.style.flex = '1 1 300px'; right.style.flex = '2 1 380px';
  const bar = div(right, 'ctl', '<button data-a="sup">Suppress</button><button data-a="del">Delete</button><button data-a="brk">Edit Extrude 2: redraw the boss as a square</button><button data-a="reset">↺ Reset</button>');
  const fix = div(right, 'ctl'); const out = div(right, 'out'); out.style.whiteSpace = 'normal';
  bar.onclick = e => {
    const a = e.target.dataset.a; if (!a) return;
    if (a === 'reset') { reset(); draw(); return; }
    if (failed) { msg = '<b>Resolve the failure first</b> — Creo will not let you carry on building on a failed model without deciding what to do. Pick a fix below.'; draw(); return; }
    const f = get(sel);
    if (a === 'brk') {
      get('Extrude 2').d = 'Boss 40×40 square × 30 (sketch edited)'; failed = 'Round 1'; get('Round 1').s = 'fail';
      msg = '<b>⚠ Regeneration failed: Round 1.</b> The R3 round sat on the <i>circular</i> edge where the boss met the plate. That edge came from the circle you deleted, so Creo cannot find it any more. Hole 1 survives: it sits on the boss <i>top face</i> (a face the extrude always makes, whatever the sketch) and is dimensioned from RIGHT and FRONT — good design intent. Choose how to fix Round 1:';
      draw(); return;
    }
    if (!f || F0.slice(0, 3).some(x => x[0] === f.n)) { msg = 'Pick a solid feature (not a default datum) first.'; draw(); return; }
    const ch = allKids(f.n);
    if (a === 'sup') { f.s = 'sup'; ch.forEach(c => get(c).s = 'sup'); msg = `<b>Suppress ${f.n}</b>${ch.length ? ` — Creo lists its children (${ch.join(', ')}) and suppresses them too, because they cannot exist without their parent.` : ' — it has no children, so only it goes.'} Suppressed features are skipped at regeneration but kept: right-click ▸ <b>Resume</b> brings them back.`; }
    if (a === 'del') { f.s = 'del'; ch.forEach(c => get(c).s = 'del'); msg = `<b>Delete ${f.n}</b>${ch.length ? ` — the dialog highlights the children: ${ch.join(', ')}. Clicking OK deletes them all. Use <b>Options</b> in that dialog to <b>Suspend</b> or <b>Reroute</b> each child instead and keep it.` : '.'}`; }
    draw();
  };
  fix.onclick = e => {
    const a = e.target.dataset.f; if (!a || !failed) return; const r = get('Round 1');
    if (a === 'undo') { get('Extrude 2').d = F0[4][1]; r.s = 'ok'; msg = '<b>Undo Changes</b>: the sketch edit is thrown away and the model goes back to the last good state. Safe, but you lose the change you wanted.'; }
    if (a === 'reroute') { r.s = 'ok'; r.d = 'R3 on the 4 bottom edges of the square boss (rerouted)'; msg = '<b>Edit References (reroute)</b>: Creo shows each missing reference in turn and you pick the new one — here the four bottom edges of the square boss. The round keeps its value and its children.'; }
    if (a === 'redef') { r.s = 'ok'; r.d = 'R3 redefined on the boss bottom edge chain'; msg = '<b>Edit Definition</b>: the Round dashboard opens with the missing edge removed; you pick the new edge chain and click OK. Best when the feature itself needs rethinking.'; }
    if (a === 'sup') { r.s = 'sup'; msg = '<b>Suppress</b> the failed feature: the model regenerates without it. Useful to get going again, but remember to come back to it — a suppressed round is easy to forget and the part goes out with a sharp corner.'; }
    if (a === 'del') { r.s = 'del'; msg = '<b>Delete</b> the failed feature: gone for good. Only do this if you will make it again properly.'; }
    failed = null; draw();
  };
  tree.onclick = e => { const d = e.target.closest('[data-n]'); if (!d) return; sel = d.dataset.n; if (!failed) msg = `Selected <b>${sel}</b>.`; draw(); };
  function draw() {
    const f = get(sel), par = f ? f.p : [], ch = f ? allKids(f.n) : [];
    tree.innerHTML = '<b>Model Tree</b>' + F.map((x, i) => {
      if (x.s === 'del') return '';
      const ic = x.s === 'fail' ? '⚠ ' : x.s === 'sup' ? '▪ ' : i < 3 ? '▱ ' : '◆ ';
      const role = x.n === sel ? 'background:var(--pri);color:#fff' : par.includes(x.n) ? 'background:var(--hi);border-left:5px solid var(--acc)' : ch.includes(x.n) ? 'background:var(--code);border-left:5px solid var(--pri)' : '';
      const tag = x.n === sel ? '' : par.includes(x.n) ? ' <small>(parent)</small>' : ch.includes(x.n) ? ' <small>(child)</small>' : '';
      return `<div data-n="${x.n}" title="${esc(x.d)}" style="cursor:pointer;padding:4px 8px;margin:2px 0;border-radius:6px;${role};${x.s === 'sup' ? 'opacity:.5;text-decoration:line-through' : ''}${x.s === 'fail' ? ';font-weight:700;outline:2px dashed var(--acc2)' : ''}">${ic}${x.n}${x.s === 'fail' ? ' — FAILED' : x.s === 'sup' ? ' (suppressed)' : ''}${tag}</div>`;
    }).join('') + '<div style="padding:4px 8px;color:var(--soft)">➜ Insert Here</div>';
    fix.innerHTML = failed ? '<b>Fix options:</b> <button data-f="undo">Undo Changes</button><button data-f="reroute">Edit References</button><button data-f="redef">Edit Definition</button><button data-f="sup">Suppress</button><button data-f="del">Delete</button>' : '';
    out.innerHTML = (f && f.s !== 'del' ? `<b>${f.n}</b>: ${esc(f.d)}<br>Parents: ${par.length ? par.join(', ') : 'none (default datum)'} · Children: ${ch.length ? ch.join(', ') : 'none'}<br><br>` : '') + msg + '<br><br><span class="hint">Orange edge = parent, blue edge = child. In Creo: Tools ▸ Reference Viewer shows the same graph.</span>';
  }
  draw();
};

/* Day 18: mechanism connections */
W.conn = el => {
  lab(el);
  const C = {
    Rigid: [[], 'No relative motion — like a normal assembly constraint set. Use it for parts that move together.'],
    Pin: [['Ry'], 'Axis alignment + translation (plane) constraint. One rotation about the axis — a shaft in a bearing, a hinge.'],
    Slider: [['Ty'], 'Axis alignment + rotation constraint. One translation along the axis — a piston, a slide on a rail.'],
    Cylinder: [['Ty', 'Ry'], 'Axis alignment only. Rotates about and slides along the axis.'],
    Planar: [['Tx', 'Tz', 'Ry'], 'Planar (coincident planes). Slides in the plane and rotates about its normal — a puck on a table.'],
    Ball: [['Rx', 'Ry', 'Rz'], 'Point alignment. Three rotations about the point — a ball joint.'],
    Bearing: [['Ty', 'Rx', 'Ry', 'Rz'], 'Point on a line: ball joint that can also slide along the line.'],
    Weld: [[], 'Coordinate systems aligned. Locks the parts together, like Rigid, but by csys.'],
    '6DOF': [['Tx', 'Ty', 'Tz', 'Rx', 'Ry', 'Rz'], 'Fully free relative to the parent. Used for a body moved only by forces or by other connections.']
  };
  const st = form(el, [{ k: 'c', t: 'seg', o: Object.keys(C).map(k => [k, k]), v: 'Pin' }], () => vw.draw());
  const row = div(el, 'row'), left = div(row), out = div(row, 'out'); left.style.flex = '2 1 420px'; out.style.whiteSpace = 'normal';
  let ph = 0; animCtl(div(el, 'ctl'), el, dt => { ph += dt * 1.6; vw.draw(); }, () => { ph += 0.5; vw.draw(); });
  const vw = Viewer(left, () => {
    const free = new Set(C[st.c][0]), A = (k, amp, f) => free.has(k) ? amp * Math.sin(ph * f) : 0;
    const F = [...G.box(-60, 60, -10, 0, -40, 40, { c: COL.grey })];
    F.push(...G.revolve([[0, 0], [6, 0], [6, 70], [0, 70]], 2 * PI, 20, { c: COL.dark }));
    let b = G.prism([[-24, -14], [24, -14], [24, 14], [-24, 14]], 0, 16, { c: COL.part }, [G.circ(6.5, 20).reverse()]);
    b = b.concat(G.box(18, 24, 16, 30, -14, 14, { c: COL.acc }));
    if (free.has('Rx')) b = G.rot(b, 'x', A('Rx', 0.35, 1.1), [0, 8, 0]);
    if (free.has('Rz')) b = G.rot(b, 'z', A('Rz', 0.35, 0.9), [0, 8, 0]);
    if (free.has('Ry')) b = G.rot(b, 'y', free.size === 1 ? ph : A('Ry', 0.9, 1.3), [0, 8, 0]);
    b = G.move(b, [A('Tx', 16, 1.2), 22 + A('Ty', 16, 0.8), A('Tz', 14, 1.0)]);
    F.push(...b);
    out.innerHTML = `<b>${st.c}</b> — ${C[st.c][1]}<br><br><b>Free degrees of freedom</b><br>${['Tx', 'Ty', 'Tz', 'Rx', 'Ry', 'Rz'].map(d => `<span class="chip ${free.has(d) ? '' : 'off'}">${d}</span>`).join('')}<br><br>Free DOF: <b>${free.size}</b>${free.size ? ' — press <kbd>P</kbd> to see the motion the connection allows (Y = shaft axis).' : ''}<br><br><span class="hint">In Creo: Model ▸ Assemble, then pick the connection type from the list in the Component Placement dashboard (instead of a user-defined constraint set). Then Applications ▸ Mechanism ▸ Drag Components to test it.</span>`;
    return F;
  }, { yaw: -0.6, pitch: 0.5, fixed: { c: [0, 25, 0], R: 80 } });
};

/* Day 26: config.pro and mapkey planner */
W.cfgpro = el => {
  lab(el);
  const O = [
    ['pro_unit_length', 'unit_mm', 'Default length unit for new models made without a template.', true],
    ['pro_unit_mass', 'unit_kilogram', 'Default mass unit for new models made without a template.', true],
    ['template_solidpart', 'C:\\creo_std\\templates\\mmns_part_solid_abs.prt', 'Template used by File ▸ New ▸ Part ▸ Solid.', true],
    ['template_designasm', 'C:\\creo_std\\templates\\mmns_asm_design_abs.asm', 'Template for new design assemblies.', true],
    ['template_drawing', 'C:\\creo_std\\templates\\a3_drawing.drw', 'Default drawing template.', false],
    ['drawing_setup_file', 'C:\\creo_std\\dtl\\company_iso.dtl', 'Detail options (.dtl) loaded into every new drawing: ISO text height, first-angle projection, arrow style.', true],
    ['pro_format_dir', 'C:\\creo_std\\formats', 'Folder with your drawing formats (.frm) — title blocks A4–A0.', true],
    ['pro_material_dir', 'C:\\creo_std\\materials', 'Folder with your material files (.mtl) with correct densities.', true],
    ['search_path', 'C:\\creo_std\\library', 'Extra folders Creo searches when it opens an assembly. One line per folder.', false],
    ['trail_dir', 'C:\\creo_trails', 'Keeps trail files (the record of every click) out of the working directory.', true],
    ['regen_failure_handling', 'resolve_mode', 'resolve_mode = stop and make you fix a failure; no_resolve_mode = carry on and mark failed features in the tree.', false],
    ['sketcher_dec_places', '2', 'Decimals shown on sketch dimensions.', true],
    ['default_dec', '2', 'Default decimals for new dimensions.', false],
    ['tol_display', 'yes', 'Show tolerances on dimensions.', false],
    ['bell', 'no', 'No beep on every prompt.', true],
    ['display_full_object_path', 'yes', 'Shows the full file path of the model in the title bar — handy when the same name exists in two folders.', false]
  ];
  const on = O.map(o => o[3]), val = O.map(o => o[1]);
  const t = div(el); t.innerHTML = '<table><tr><th></th><th>Option</th><th>Value</th><th>What it does</th></tr>' + O.map((o, i) => `<tr><td><input type="checkbox" data-i="${i}" ${o[3] ? 'checked' : ''}></td><td class="mono">${o[0]}</td><td><input type="text" data-v="${i}" value="${esc(o[1])}" style="width:100%;min-width:140px;font:13px JetBrains Mono,monospace"></td><td>${o[2]}</td></tr>`).join('') + '</table>';
  div(el, '', '<h3>Mapkey plan</h3><p class="hint">Mapkeys are recorded, not typed: File ▸ Options ▸ Environment ▸ Mapkeys Settings ▸ New ▸ Record, do the clicks, Stop, then Save Changed. Plan the keys here first so they do not clash.</p>');
  const mk = document.createElement('textarea'); mk.rows = 5; mk.style.cssText = 'width:100%;font:14px JetBrains Mono,monospace;padding:8px;border-radius:8px;border:1px solid var(--rule);background:var(--card);color:var(--ink)';
  mk.value = 'vf  = view FRONT + refit\nvt  = view TOP + refit\nqq  = save and close window\nem  = erase not displayed\nvf  = datum planes off';
  el.appendChild(mk);
  const res = div(el, 'out'); res.style.whiteSpace = 'normal';
  const pre = codeBox(el);
  function run() {
    const lines = ['! config.pro — generated by the Creo Course, Day 26', '! Put it in your Creo start-in folder (loaded at start-up) or your working directory', ''];
    O.forEach((o, i) => { if (on[i]) lines.push(`${o[0]} ${val[i]}`); });
    const keys = {}, warn = [];
    mk.value.split('\n').forEach(l => { const m = l.match(/^\s*(\S+)\s*=\s*(.+)$/); if (!m) return; const k = m[1].toLowerCase(); if (keys[k]) warn.push(`"${k}" is used twice (${keys[k]} / ${m[2].trim()})`); else keys[k] = m[2].trim(); });
    const ks = Object.keys(keys); ks.forEach(a => ks.forEach(b => { if (a !== b && b.startsWith(a)) warn.push(`"${a}" is the start of "${b}" — Creo may fire "${a}" before you finish typing "${b}". Avoid one key being the start of another.`); }));
    if (ks.some(k => k.length === 1)) warn.push('Single-letter mapkeys fire the moment you type that letter anywhere outside a text box — use two letters or function keys ($F2 …).');
    lines.push('', '! mapkeys are appended below this line when you click "Save Changed" in the Mapkeys dialog');
    ks.forEach(k => lines.push(`! mapkey ${k}  — ${keys[k]}`));
    pre.textContent = lines.join('\n');
    res.innerHTML = (warn.length ? warn.map(w => '<b style="color:var(--acc2)">⚠ ' + esc(w) + '</b>').join('<br>') : '✓ No clashes between your planned mapkeys.') + '<br><span class="hint">Lines starting with ! are comments. Check what Creo actually loaded: File ▸ Options ▸ Configuration Editor shows each option, its value and the file it came from.</span>';
  }
  t.onchange = e => { const i = e.target.dataset.i; if (i !== undefined) { on[+i] = e.target.checked; run(); } };
  t.oninput = e => { const i = e.target.dataset.v; if (i !== undefined) { val[+i] = e.target.value; run(); } };
  mk.oninput = run; run();
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
