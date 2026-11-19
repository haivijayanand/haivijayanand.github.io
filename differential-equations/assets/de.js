/*
TOOL:    differential-equations/assets/de.js — shared engine for the 15-Day Differential Equations Course: page shell, progress, quiz, certificate and the visual labs
FAMILY:  differential-equations
VERSION: 1.0.0
DATE:    2026-11-19
CHAT:    Differential equations are fascinating — make a 15 days course to deeper understanding of differential equations
CHANGES: 1.0.0 - first version; page shell, quiz, certificate, chart helper and keyboard (M F T P S X [ ]) from manufacturing/assets/mf.js 1.0.0;
                 canvas plotting, expression compiler, RK4, marching-squares contours, colour map, Nelder–Mead; labs: slope field, tank,
                 time constant, phase line + bifurcation, Euler/Heun/RK4 race, spring–mass–damper, forced response + FRF, s-plane poles,
                 two-mass modes, linear phase plane + trace–determinant, nonlinear phase plane, Lorenz, Duffing Poincaré, Fourier series,
                 heat rod, vibrating string, Laplace plate, model fitter, finite-difference stability; certificate saves to the site account
STATUS:  working
*/
(function () {
'use strict';
const SW = window.SW = window.SW || {};
SW.version = '1.0.0';
const ND = () => (window.SW_DAYS ? SW_DAYS.length : 15);
const $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const store = {
  get(k, d) { try { const v = localStorage.getItem('de15:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('de15:' + k, JSON.stringify(v)); } catch (e) { } }
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
SW.resetProgress = () => { if (confirm('Clear all progress, ticks and quiz scores stored in this browser?')) { try { Object.keys(localStorage).filter(k => k.startsWith('de15:')).forEach(k => localStorage.removeItem(k)); } catch (e) { } location.reload(); } };

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


/* ---------------- SVG helpers ---------------- */
function arrow(x, y, a, s) { s = s || 9; const p = (dx, dy) => [x + dx * Math.cos(a) - dy * Math.sin(a), y + dx * Math.sin(a) + dy * Math.cos(a)]; const q = [p(0, 0), p(-s, -s / 2.6), p(-s, s / 2.6)]; return `<polygon class="fi" points="${q.map(v => v.join(',')).join(' ')}"/>`; }
function dimL(x1, y1, x2, y2, txt, cls) { const a = Math.atan2(y2 - y1, x2 - x1); const mx = (x1 + x2) / 2, my = (y1 + y2) / 2; return `<line class="d" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>${arrow(x2, y2, a)}${arrow(x1, y1, a + PI)}<text x="${mx}" y="${my - 6}" text-anchor="middle" class="${cls || ''}">${txt}</text>`; }
const HATCH = '<defs><pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" style="fill:var(--code)"/><line x1="0" y1="0" x2="0" y2="8" style="stroke:var(--soft);stroke-width:1.4"/></pattern></defs>';
const pts = a => a.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');

/* ================= LABS ================= */
const W = SW.W = {};
/* flash cards */
W.flash = el => {
  lab(el); const data = JSON.parse($('#' + el.dataset.src).textContent);
  const g = div(el, 'flash', data.map(c => `<div><b>${c[0]}</b><span>${c[1]}</span></div>`).join(''));
  div(el, 'hint', 'Click a card to reveal what it does. Say the answer aloud before you click.');
  g.onclick = e => { const d = e.target.closest('.flash>div'); if (d) d.classList.toggle('flip'); };
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
  const d0 = +(el.dataset.from || 1), d1 = +(el.dataset.to || 15), tot = d1 - d0 + 1, key = el.dataset.key || 'exam';
  const title = el.dataset.title || '15-Day Differential Equations Course', topics = el.dataset.topics || 'differential equations';
  el._upd = () => {
    const dm = doneMap(); let n = 0; for (let i = d0; i <= d1; i++) if (dm[i]) n++;
    const sc = store.get(key + 'score', null);
    card.innerHTML = `<div class="series" style="letter-spacing:.2em;color:var(--soft)">CERTIFICATE OF COMPLETION</div><h2>${esc(title)}</h2><p>This is to certify that</p><div class="nm">${esc(nmIn.value || 'Your name')}</div><p>has worked through <b>${n} of ${tot}</b> days of ${esc(topics)}${sc ? `, and scored <b>${sc[0]} / ${sc[1]}</b> in the final assessment` : ''}.</p><p class="hint">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} · haivijayanand.github.io/differential-equations</p>${n < tot || !sc ? `<p class="hint">(Complete all ${tot} days and the final assessment to make it count.)</p>` : ''}<p class="hint">A course-completion certificate — not an official or university certification.</p>`;
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

/* ---------------- chart helper (linear or log axes) ---------------- */
function ticks(a, b, n) {
  const span = b - a, step0 = span / (n || 5), mag = Math.pow(10, Math.floor(Math.log10(step0))), f = step0 / mag;
  const step = (f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10) * mag, out = [];
  for (let v = Math.ceil(a / step) * step; v <= b + step * 1e-6; v += step) out.push(+v.toFixed(10));
  return out;
}
let chartId = 0;
function chart(o) {
  const W = o.w || 540, H = o.h || 300, L = o.l || 58, R = o.r || 26, T = 14, B = 42;
  const tx = v => o.logx ? Math.log10(v) : v, ty = v => o.logy ? Math.log10(v) : v;
  const X = v => L + (tx(v) - tx(o.x[0])) / (tx(o.x[1]) - tx(o.x[0])) * (W - L - R);
  const Y = v => H - B - (ty(v) - ty(o.y[0])) / (ty(o.y[1]) - ty(o.y[0])) * (H - B - T);
  const id = 'cl' + (++chartId);
  let s = `<svg viewBox="0 0 ${W} ${H}"><defs><clipPath id="${id}"><rect x="${L}" y="${T}" width="${W - L - R}" height="${H - B - T}"/></clipPath></defs>`;
  const xt = o.logx ? decades(o.x) : ticks(o.x[0], o.x[1], o.nx || 6), yt = o.logy ? decades(o.y) : ticks(o.y[0], o.y[1], o.ny || 5);
  xt.forEach(v => { s += `<line x1="${X(v)}" y1="${T}" x2="${X(v)}" y2="${H - B}" style="stroke:var(--rule)"/><text x="${X(v)}" y="${H - B + 16}" text-anchor="middle" class="s">${tk(v)}</text>`; });
  yt.forEach(v => { s += `<line x1="${L}" y1="${Y(v)}" x2="${W - R}" y2="${Y(v)}" style="stroke:var(--rule)"/><text x="${L - 6}" y="${Y(v) + 4}" text-anchor="end" class="s">${tk(v)}</text>`; });
  s += `<line class="d" x1="${L}" y1="${H - B}" x2="${W - R}" y2="${H - B}"/><line class="d" x1="${L}" y1="${T}" x2="${L}" y2="${H - B}"/>`;
  if (o.xl) s += `<text x="${(L + W - R) / 2}" y="${H - 6}" text-anchor="middle" class="s">${o.xl}</text>`;
  if (o.yl) s += `<text x="12" y="${(T + H - B) / 2}" text-anchor="middle" class="s" transform="rotate(-90 12 ${(T + H - B) / 2})">${o.yl}</text>`;
  s += `<g clip-path="url(#${id})">`;
  (o.series || []).forEach(se => { if (se.p.length) s += `<polyline class="${se.c || 'b'}${se.dash ? ' dash' : ''}" style="${se.w ? 'stroke-width:' + se.w : ''}" points="${se.p.filter(p => Number.isFinite(p[0]) && Number.isFinite(p[1])).map(p => X(p[0]).toFixed(1) + ',' + Y(p[1]).toFixed(1)).join(' ')}"/>`; });
  if (o.extra) s += o.extra(X, Y);
  s += `</g>`;
  (o.labels || []).forEach(l => { s += `<text x="${X(l[0]) + (l[3] || 0)}" y="${Y(l[1]) + (l[4] || 0)}" class="${l[5] || 'bt'}" text-anchor="${l[6] || 'start'}">${l[2]}</text>`; });
  (o.pts || []).forEach(p => { s += `<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="${p[2] || 6}" class="${p[3] || 'fa'}" style="stroke:var(--card);stroke-width:2"/>`; });
  return s + '</svg>';
}
function decades(r) { const out = []; for (let e = Math.ceil(Math.log10(r[0]) - 1e-9); e <= Math.log10(r[1]) + 1e-9; e++) out.push(Math.pow(10, e)); return out; }
function tk(v) { const a = Math.abs(v); if (a >= 1e5 || (a > 0 && a < 1e-3)) { const e = Math.round(Math.log10(a)); return Math.abs(v - Math.pow(10, e)) < 1e-9 * a ? '10' + sup(e) : v.toExponential(0); } return (+v.toPrecision(6)).toLocaleString('en-IN'); }
function sup(e) { return String(e).split('').map(c => '⁻⁰¹²³⁴⁵⁶⁷⁸⁹'['-0123456789'.indexOf(c)]).join(''); }
function lin(a, b, n) { const o = []; for (let i = 0; i <= n; i++) o.push(a + (b - a) * i / n); return o; }
function interp(x, xs, ys) { if (x <= xs[0]) return ys[0]; for (let i = 1; i < xs.length; i++) if (x <= xs[i]) return ys[i - 1] + (ys[i] - ys[i - 1]) * (x - xs[i - 1]) / (xs[i] - xs[i - 1]); return ys[ys.length - 1]; }



/* ================= DIFFERENTIAL EQUATIONS: shared helpers ================= */
/* certificate: also save it to the reader's account (site-progress.js) once earned */
const certBase = W.cert;
W.cert = el => {
  certBase(el);
  const c = $('.ctl', el), sb = document.createElement('button'); sb.textContent = '☁ Save to my account'; c.appendChild(sb);
  const msg = div(el, 'hint');
  sb.onclick = () => {
    const dm = doneMap(); let n = 0; for (let i = 1; i <= ND(); i++) if (dm[i]) n++;
    const sc = store.get((el.dataset.key || 'exam') + 'score', null);
    if (!sc || n < ND()) { msg.textContent = `Complete all ${ND()} days and the final assessment first (now ${n} days${sc ? ', exam ' + sc[0] + ' / ' + sc[1] : ', exam not taken'}).`; return; }
    const go = sp => sp.saveCertificate({ course: 'differential-equations', title: '15-Day Differential Equations Course', holderName: store.get('name', '') || undefined, score: `${sc[0]} / ${sc[1]}`, path: '/differential-equations/' })
      .then(r => { if (r) msg.innerHTML = `Saved. Certificate ID <b>${esc(r.certId)}</b> · verify at haivijayanand.github.io/verify/?id=${esc(r.certId)}`; })
      .catch(e => { msg.textContent = 'Could not save: ' + e.message; });
    if (window.SiteProgress) go(window.SiteProgress); else { msg.textContent = 'Account service is still loading — try again in a moment.'; addEventListener('sp:loaded', () => go(window.SiteProgress), { once: true }); }
  };
};

const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
function rng(seed) { let s = (seed % 2147483647 + 2147483647) % 2147483647 || 1; return () => { s = s * 16807 % 2147483647; return (s - 1) / 2147483646; }; }
function gauss(r) { let u = 0, v = 0; while (u === 0) u = r(); while (v === 0) v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * PI * v); }
function kpis(host, list) { host.innerHTML = '<div class="kpis">' + list.map(k => `<div><small>${k[0]}</small><b class="${k[2] || ''}">${k[1]}</b></div>`).join('') + '</div>'; }
const f3 = x => fmt(x, 3), f2 = x => fmt(x, 2);
const sgnf = (x, d) => (x >= 0 ? '+ ' : '− ') + fmt(Math.abs(x), d === undefined ? 3 : d);

/* theme colours read from the CSS variables, so canvases follow light / dark */
function C() {
  const cs = getComputedStyle(document.documentElement), g = n => cs.getPropertyValue(n).trim();
  const dark = document.documentElement.dataset.theme === 'dark';
  return { pri: g('--pri'), acc: g('--acc'), acc2: g('--acc2'), ink: g('--ink'), soft: g('--soft'), rule: g('--rule'), card: g('--card'), bg: g('--bg'), vio: dark ? '#b79cff' : '#7a4fc4', field: dark ? 'rgba(163,175,191,.55)' : 'rgba(86,97,115,.5)', dark };
}
/* every lab registers a redraw so theme, sidebar and full-screen changes repaint it */
const REDRAW = [];
SW.redraw = () => REDRAW.forEach(f => { try { f(); } catch (e) { console.error(e); } });
let rzT = 0; addEventListener('resize', () => { clearTimeout(rzT); rzT = setTimeout(SW.redraw, 120); });

/* HiDPI canvas whose drawing units are CSS pixels */
function canvas(host, cls, cap) {
  const wrap = div(host), c = document.createElement('canvas'); c.className = cls || 'plot'; wrap.appendChild(c);
  if (cap) div(wrap, 'cap', cap);
  const o = { c, wrap, ctx: c.getContext('2d'), w: 0, h: 0 };
  o.fit = () => { const r = c.getBoundingClientRect(), d = window.devicePixelRatio || 1; o.w = Math.max(200, r.width); o.h = Math.max(120, r.height); c.width = Math.round(o.w * d); c.height = Math.round(o.h * d); o.ctx.setTransform(d, 0, 0, d, 0, 0); return o; };
  o.pos = e => { const r = c.getBoundingClientRect(), p = e.touches ? e.touches[0] : e; return [p.clientX - r.left, p.clientY - r.top]; };
  return o;
}
/* axes frame on a canvas: returns pixel maps X(), Y() and inverses */
function frame(cv, xr, yr, o) {
  o = o || {}; const k = C(), x = cv.ctx, W = cv.w, H = cv.h;
  const L = o.l === undefined ? 50 : o.l, R = o.r === undefined ? 14 : o.r, T = o.t === undefined ? 12 : o.t, B = o.b === undefined ? 34 : o.b;
  const X = v => L + (v - xr[0]) / (xr[1] - xr[0]) * (W - L - R), Y = v => H - B - (v - yr[0]) / (yr[1] - yr[0]) * (H - B - T);
  const ix = p => xr[0] + (p - L) / (W - L - R) * (xr[1] - xr[0]), iy = p => yr[0] + (H - B - p) / (H - B - T) * (yr[1] - yr[0]);
  x.fillStyle = k.card; x.fillRect(0, 0, W, H);
  x.font = '12px Inter,sans-serif'; x.lineWidth = 1;
  const xt = ticks(xr[0], xr[1], o.nx || Math.max(3, Math.round((W - L - R) / 80))), yt = ticks(yr[0], yr[1], o.ny || Math.max(3, Math.round((H - B - T) / 55)));
  x.strokeStyle = k.rule; x.fillStyle = k.soft;
  xt.forEach(v => { x.beginPath(); x.moveTo(X(v), T); x.lineTo(X(v), H - B); x.stroke(); x.textAlign = 'center'; x.fillText(tk(v), X(v), H - B + 15); });
  yt.forEach(v => { x.beginPath(); x.moveTo(L, Y(v)); x.lineTo(W - R, Y(v)); x.stroke(); x.textAlign = 'right'; x.fillText(tk(v), L - 5, Y(v) + 4); });
  x.strokeStyle = k.soft; x.lineWidth = 1.4;
  if (xr[0] < 0 && xr[1] > 0) { x.beginPath(); x.moveTo(X(0), T); x.lineTo(X(0), H - B); x.stroke(); }
  if (yr[0] < 0 && yr[1] > 0) { x.beginPath(); x.moveTo(L, Y(0)); x.lineTo(W - R, Y(0)); x.stroke(); }
  x.beginPath(); x.rect(L, T, W - L - R, H - B - T); x.stroke();
  x.fillStyle = k.soft; x.textAlign = 'center';
  if (o.xl) x.fillText(o.xl, (L + W - R) / 2, H - 4);
  if (o.yl) { x.save(); x.translate(12, (T + H - B) / 2); x.rotate(-PI / 2); x.fillText(o.yl, 0, 0); x.restore(); }
  const f = { X, Y, ix, iy, L, R, T, B, W, H, xr, yr, x };
  f.clip = () => { x.save(); x.beginPath(); x.rect(L, T, W - L - R, H - B - T); x.clip(); };
  f.unclip = () => x.restore();
  return f;
}
/* polyline on a frame; st = {c: colour, w: width, dash: [..]} */
function line(f, pts, st) {
  const x = f.x; st = st || {}; x.strokeStyle = st.c || C().pri; x.lineWidth = st.w || 2.6; x.setLineDash(st.dash || []); x.lineJoin = 'round';
  x.beginPath(); let pen = false;
  for (const p of pts) { if (!Number.isFinite(p[0]) || !Number.isFinite(p[1]) || Math.abs(p[1]) > 1e9) { pen = false; continue; } const X = f.X(p[0]), Y = f.Y(p[1]); if (pen) x.lineTo(X, Y); else { x.moveTo(X, Y); pen = true; } }
  x.stroke(); x.setLineDash([]);
}
function dot(f, px, py, r, fill, ring) { const x = f.x; x.beginPath(); x.arc(f.X(px), f.Y(py), r || 5, 0, 2 * PI); if (fill !== null) { x.fillStyle = fill || C().acc; x.fill(); } x.lineWidth = 2; x.strokeStyle = ring || C().card; x.stroke(); }
function label(f, px, py, s, col, align, dx, dy) { const x = f.x; x.font = '600 13px Inter,sans-serif'; x.fillStyle = col || C().ink; x.textAlign = align || 'left'; x.fillText(s, f.X(px) + (dx || 0), f.Y(py) + (dy || 0)); }
function legend(host, items) { host.innerHTML = items.map(i => `<span class="keyline ${i[0]}"></span>${i[1]}`).join(' '); }
function arrowHead(x, X, Y, a, s, col) { x.fillStyle = col; x.beginPath(); x.moveTo(X, Y); x.lineTo(X - s * Math.cos(a - 0.45), Y - s * Math.sin(a - 0.45)); x.lineTo(X - s * Math.cos(a + 0.45), Y - s * Math.sin(a + 0.45)); x.closePath(); x.fill(); }

/* safe-ish expression compiler for the reader's own equations: only maths words are allowed */
const MATHW = new Set(['sin', 'cos', 'tan', 'exp', 'log', 'ln', 'sqrt', 'abs', 'atan', 'asin', 'acos', 'sinh', 'cosh', 'tanh', 'pi', 'e', 'min', 'max', 'pow', 'sign', 'floor', 'heav', 'sq']);
function compile(src, vars) {
  const s = String(src).replace(/\^/g, '**').replace(/π/g, 'pi').replace(/·|×/g, '*').replace(/−/g, '-');
  if (/[^0-9a-zA-Z_+\-*/(). ,]/.test(s)) throw new Error('only numbers, + − * / ^ ( ) and maths functions');
  (s.match(/[a-zA-Z_]\w*/g) || []).forEach(w => { if (!MATHW.has(w) && !vars.includes(w)) throw new Error('unknown word "' + w + '"'); });
  const pre = 'const {sin,cos,tan,exp,sqrt,abs,atan,asin,acos,sinh,cosh,tanh,min,max,pow,sign,floor}=Math,pi=Math.PI,e=Math.E,log=Math.log,ln=Math.log,heav=x=>x>=0?1:0,sq=x=>x*x;';
  const fn = new Function(...vars, pre + 'return (' + s + ');');
  const probe = fn(...vars.map(() => 0.37)); if (typeof probe !== 'number') throw new Error('not a number');
  return fn;
}
/* RK4 step for a system y' = f(t, y) with y an array */
function rk4(f, t, y, h) {
  const n = y.length, k1 = f(t, y), y2 = new Array(n), y3 = new Array(n), y4 = new Array(n);
  for (let i = 0; i < n; i++) y2[i] = y[i] + h / 2 * k1[i];
  const k2 = f(t + h / 2, y2); for (let i = 0; i < n; i++) y3[i] = y[i] + h / 2 * k2[i];
  const k3 = f(t + h / 2, y3); for (let i = 0; i < n; i++) y4[i] = y[i] + h * k3[i];
  const k4 = f(t + h, y4), o = new Array(n);
  for (let i = 0; i < n; i++) o[i] = y[i] + h / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]);
  return o;
}
/* integrate and keep every point: returns [[t, y0, y1, ...], ...] */
function solve(f, t0, y0, t1, h, stop) {
  const out = [[t0, ...y0]]; let t = t0, y = y0.slice(); const n = Math.ceil(Math.abs(t1 - t0) / Math.abs(h)), hh = (t1 - t0) / n;
  for (let i = 0; i < n; i++) { y = rk4(f, t, y, hh); t += hh; if (y.some(v => !Number.isFinite(v))) break; out.push([t, ...y]); if (stop && stop(t, y)) break; }
  return out;
}
/* zero-contour of g(x, y) by marching squares, drawn on frame f */
function contour(f, g, n, st, level) {
  level = level || 0; const nx = n, ny = Math.round(n * (f.H - f.T - f.B) / (f.W - f.L - f.R)) || n;
  const xs = lin(f.xr[0], f.xr[1], nx), ys = lin(f.yr[0], f.yr[1], ny), V = [];
  for (let j = 0; j <= ny; j++) { V.push([]); for (let i = 0; i <= nx; i++) { let v; try { v = g(xs[i], ys[j]) - level; } catch (e) { v = NaN; } V[j].push(v); } }
  const x = f.x; x.strokeStyle = st.c; x.lineWidth = st.w || 2; x.setLineDash(st.dash || []); x.beginPath();
  const ip = (a, b, va, vb) => a + (b - a) * va / (va - vb);
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    const a = V[j][i], b = V[j][i + 1], c = V[j + 1][i + 1], d = V[j + 1][i];
    if (![a, b, c, d].every(Number.isFinite)) continue;
    const P = [];
    if ((a > 0) !== (b > 0)) P.push([ip(xs[i], xs[i + 1], a, b), ys[j]]);
    if ((b > 0) !== (c > 0)) P.push([xs[i + 1], ip(ys[j], ys[j + 1], b, c)]);
    if ((c > 0) !== (d > 0)) P.push([ip(xs[i + 1], xs[i], c, d), ys[j + 1]]);
    if ((d > 0) !== (a > 0)) P.push([xs[i], ip(ys[j + 1], ys[j], d, a)]);
    if (Math.abs(a - b) > 1e6 || Math.abs(b - c) > 1e6) continue;    // skip poles (e.g. 1/y)
    for (let k = 0; k + 1 < P.length; k += 2) { x.moveTo(f.X(P[k][0]), f.Y(P[k][1])); x.lineTo(f.X(P[k + 1][0]), f.Y(P[k + 1][1])); }
  }
  x.stroke(); x.setLineDash([]);
}
/* colour map, deutan-safe: deep blue → pale → orange → dark orange */
const CMAP = [[11, 36, 71], [31, 95, 191], [150, 190, 235], [245, 240, 230], [240, 170, 90], [217, 130, 43], [140, 70, 10]];
function cmap(v) { v = clamp(Number.isFinite(v) ? v : 0, 0, 1) * (CMAP.length - 1); const i = Math.min(CMAP.length - 2, Math.floor(v)), t = v - i, a = CMAP[i], b = CMAP[i + 1]; return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
function cbar(host, lo, hi, unit) { const d = div(host, 'cbar'); d.innerHTML = `<span>${lo}</span><i style="background:linear-gradient(90deg,${CMAP.map(c => `rgb(${c})`).join(',')})"></i><span>${hi}</span>${unit ? '<span>' + unit + '</span>' : ''}`; return d; }
/* paint a 2-D array (rows = y from bottom) into the plotting area of a frame */
function heat(f, A, lo, hi) {
  const ny = A.length, nx = A[0].length, img = f.x.createImageData(nx, ny);
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) { const v = A[j][i], c = cmap((v - lo) / (hi - lo)), k = ((ny - 1 - j) * nx + i) * 4; img.data[k] = c[0]; img.data[k + 1] = c[1]; img.data[k + 2] = c[2]; img.data[k + 3] = Number.isFinite(v) ? 255 : 0; }
  const tmp = document.createElement('canvas'); tmp.width = nx; tmp.height = ny; tmp.getContext('2d').putImageData(img, 0, 0);
  f.x.imageSmoothingEnabled = true; f.x.drawImage(tmp, f.L, f.T, f.W - f.L - f.R, f.H - f.T - f.B);
}
/* Nelder–Mead minimiser, used by the model fitter */
function nelder(fn, x0, step, iters) {
  const n = x0.length; let S = [x0.slice()];
  for (let i = 0; i < n; i++) { const p = x0.slice(); p[i] += step[i]; S.push(p); }
  let F = S.map(fn);
  for (let it = 0; it < (iters || 400); it++) {
    const ix = F.map((v, i) => i).sort((a, b) => F[a] - F[b]); S = ix.map(i => S[i]); F = ix.map(i => F[i]);
    const c = new Array(n).fill(0); for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) c[j] += S[i][j] / n;
    const pt = a => c.map((v, j) => v + a * (S[n][j] - v));
    const r = pt(-1), fr = fn(r);
    if (fr < F[0]) { const e = pt(-2), fe = fn(e); if (fe < fr) { S[n] = e; F[n] = fe; } else { S[n] = r; F[n] = fr; } }
    else if (fr < F[n - 1]) { S[n] = r; F[n] = fr; }
    else { const k = pt(0.5), fk = fn(k); if (fk < F[n]) { S[n] = k; F[n] = fk; } else { for (let i = 1; i <= n; i++) { S[i] = S[i].map((v, j) => S[0][j] + 0.5 * (v - S[0][j])); F[i] = fn(S[i]); } } }
  }
  const i0 = F.indexOf(Math.min(...F)); return { x: S[i0], f: F[i0] };
}
/* small complex helpers */
const cx = { add: (a, b) => [a[0] + b[0], a[1] + b[1]], mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]], abs: a => Math.hypot(a[0], a[1]), div: (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; } };
/* eigenvalues of a real 2×2 matrix [[a, b], [c, d]] → [[re, im], [re, im]] */
function eig2(a, b, c, d) { const tr = a + d, det = a * d - b * c, disc = tr * tr / 4 - det; return disc >= 0 ? [[tr / 2 + Math.sqrt(disc), 0], [tr / 2 - Math.sqrt(disc), 0]] : [[tr / 2, Math.sqrt(-disc)], [tr / 2, -Math.sqrt(-disc)]]; }
const cstr = z => Math.abs(z[1]) < 1e-9 ? fmt(z[0], 3) : `${fmt(z[0], 3)} ${z[1] >= 0 ? '+' : '−'} ${fmt(Math.abs(z[1]), 3)}i`;
/* a lab animation driver that also registers with the P / S / X keys */
function anim(host, tick, opts) {
  const bar = div(host, 'ctl'); const c = animCtl(bar, host, tick, () => { for (let i = 0; i < (opts && opts.stepN || 10); i++) tick(1 / 60); });
  return c;
}
/* draw a coil spring between (x1, y) and (x2, y) */
function spring(x, x1, x2, y, coils, amp, col) {
  const n = coils * 2, L = x2 - x1, e = Math.min(14, Math.abs(L) * 0.12);
  x.strokeStyle = col; x.lineWidth = 2; x.beginPath(); x.moveTo(x1, y); x.lineTo(x1 + e, y);
  for (let i = 1; i < n; i++) x.lineTo(x1 + e + (L - 2 * e) * i / n, y + (i % 2 ? -amp : amp));
  x.lineTo(x2 - e, y); x.lineTo(x2, y); x.stroke();
}
function damper(x, x1, x2, y, col) {
  const m = (x1 + x2) / 2; x.strokeStyle = col; x.lineWidth = 2; x.beginPath();
  x.moveTo(x1, y); x.lineTo(m - 4, y); x.moveTo(m - 14, y - 9); x.lineTo(m + 6, y - 9); x.lineTo(m + 6, y + 9); x.lineTo(m - 14, y + 9);
  x.moveTo(m - 4, y - 6); x.lineTo(m - 4, y + 6); x.moveTo(m - 4, y); x.moveTo(m + 6, y); x.lineTo(x2, y); x.stroke();
}
function wall(x, X, y0, y1, col) { x.strokeStyle = col; x.lineWidth = 3; x.beginPath(); x.moveTo(X, y0); x.lineTo(X, y1); x.stroke(); x.lineWidth = 1.2; for (let y = y0; y < y1; y += 8) { x.beginPath(); x.moveTo(X, y); x.lineTo(X - 7, y + 7); x.stroke(); } }
function block(x, X, y, w, h, fill, ink, txt) { x.fillStyle = fill; x.strokeStyle = ink; x.lineWidth = 2; x.fillRect(X - w / 2, y - h / 2, w, h); x.strokeRect(X - w / 2, y - h / 2, w, h); if (txt) { x.fillStyle = ink; x.font = '600 14px Inter,sans-serif'; x.textAlign = 'center'; x.fillText(txt, X, y + 5); } }

/* ================= WEEK 1 LABS ================= */

/* Day 1: slope field explorer — the equation drawn as a field of tiny tangents; click to grow a solution */
const FIELDS = [
  ['Growth: y′ = 0.5·y', '0.5*y', [0, 8], [-4, 8], [[0, 1], [0, -1], [0, 0.3]]],
  ['Cooling towards 2: y′ = −0.8·(y − 2)', '-0.8*(y-2)', [0, 8], [-1, 6], [[0, 5], [0, 0], [0, 3]]],
  ['Logistic: y′ = y·(1 − y)', 'y*(1-y)', [0, 10], [-0.5, 2], [[0, 0.05], [0, 1.8], [0, 0.5]]],
  ['Chasing a moving target: y′ = t − y', 't - y', [0, 6], [-2, 5], [[0, 3], [0, -1], [0, 0]]],
  ['Driven and damped: y′ = sin(t) − 0.5·y', 'sin(t) - 0.5*y', [0, 15], [-3, 3], [[0, 2.5], [0, -2.5]]],
  ['No formula exists: y′ = y² − t', 'y^2 - t', [-2, 6], [-3, 3], [[-2, 0], [-2, 1], [-2, -1.5]]],
  ['Circles: y′ = −t / y', '-t/y', [-3, 3], [-3, 3], [[0, 1], [0, 2], [0, -2.5]]],
  ['Not unique: y′ = 3·|y|^(2/3)', '3*abs(y)^(2/3)', [-2, 2], [-2, 4], [[-1, -1], [0, 0]]]
];
W.field = el => {
  lab(el);
  const st = form(el, [{ k: 'p', t: 'sel', l: 'Equation', v: '0', o: FIELDS.map((f, i) => [i, f[0]]).concat([['c', 'Your own…']]) }, { k: 'iso', t: 'chk', l: 'show where the slope is zero', v: true }, { k: 'den', t: 'range', l: 'field density', min: 12, max: 36, v: 22 }], k => { if (k === 'p') preset(); draw(); });
  const er = div(el, 'ctl'); er.innerHTML = `<label>y′ = f(t, y) = <input class="expr" type="text"></label><button type="button">Clear curves</button>`;
  const ein = $('input', er), clr = $('button', er), msg = div(el, 'hint');
  const g = div(el, 'grid2'), A = canvas(g, 'plot', 'The slope field: at each point, a short line with slope f(t, y). Click to start a solution there.'), B = canvas(g, 'plot', 'The chosen solution y(t) and its derivative y′(t) = f(t, y(t)).');
  const lg = div(el, 'legend'); legend(lg, [['', 'solution y(t)'], ['o dash', 'derivative y′(t)'], ['o', 'slope zero (isocline f = 0)']]);
  let f = null, tr = [0, 8], yr = [-4, 8], curves = [], sel = -1, at = 0;
  function preset() {
    if (st.p === 'c') { ein.focus(); return; }
    const P = FIELDS[+st.p]; ein.value = P[1]; tr = P[2]; yr = P[3]; build(); curves = P[4].map(s => grow(s[0], s[1])); sel = curves.length - 1; at = 0;
  }
  function build() { try { const fn = compile(ein.value, ['t', 'y']); f = (t, y) => [fn(t, y[0])]; ein.classList.remove('err'); msg.textContent = ''; } catch (e) { ein.classList.add('err'); msg.textContent = 'Cannot read that: ' + e.message; } }
  function grow(t0, y0) {
    const h = (tr[1] - tr[0]) / 700, big = (yr[1] - yr[0]) * 3, stop = (t, y) => Math.abs(y[0]) > big || Math.abs(f(t, y)[0]) > 1e4;
    const fw = solve(f, t0, [y0], tr[1], h, stop), bw = solve(f, t0, [y0], tr[0], -h, stop);
    return { t0, y0, p: bw.reverse().concat(fw.slice(1)) };
  }
  ein.onchange = () => { build(); if (f) { st._el.p.value = 'c'; st.p = 'c'; curves = curves.map(c => grow(c.t0, c.y0)); draw(); } };
  clr.onclick = () => { curves = []; sel = -1; draw(); };
  A.c.addEventListener('click', e => { if (!f || !A.f) return; const p = A.pos(e), t = A.f.ix(p[0]), y = A.f.iy(p[1]); if (t < tr[0] || t > tr[1]) return; curves.push(grow(t, y)); if (curves.length > 10) curves.shift(); sel = curves.length - 1; at = t; draw(); });
  function draw() {
    A.fit(); B.fit(); const k = C(), F = A.f = frame(A, tr, yr, { xl: 't', yl: 'y' }); if (!f) return;
    const n = st.den, sx = (F.W - F.L - F.R) / n, len = sx * 0.62;
    F.x.strokeStyle = k.field; F.x.lineWidth = 1.3;
    for (let i = 0; i < n; i++) for (let j = 0; j < Math.round(n * (F.H - F.T - F.B) / (F.W - F.L - F.R)); j++) {
      const px = F.L + (i + 0.5) * sx, py = F.T + (j + 0.5) * sx, t = F.ix(px), y = F.iy(py); let s; try { s = f(t, [y])[0]; } catch (e) { continue; } if (!Number.isFinite(s)) continue;
      const dx = 1, dy = -s * (F.H - F.T - F.B) / (yr[1] - yr[0]) / ((F.W - F.L - F.R) / (tr[1] - tr[0])), m = Math.hypot(dx, dy);
      F.x.beginPath(); F.x.moveTo(px - dx / m * len / 2, py - dy / m * len / 2); F.x.lineTo(px + dx / m * len / 2, py + dy / m * len / 2); F.x.stroke();
    }
    F.clip();
    if (st.iso) contour(F, (t, y) => f(t, [y])[0], 90, { c: k.acc, w: 2, dash: [7, 5] });
    curves.forEach((c, i) => line(F, c.p.map(q => [q[0], q[1]]), { c: i === sel ? k.pri : k.soft, w: i === sel ? 3.2 : 1.8 }));
    curves.forEach(c => dot(F, c.t0, c.y0, 4, k.ink));
    let cur = null;
    if (sel >= 0) {
      const c = curves[sel], q = c.p.reduce((b, p) => Math.abs(p[0] - at) < Math.abs(b[0] - at) ? p : b, c.p[0]); cur = q;
      const s = f(q[0], [q[1]])[0], w = (tr[1] - tr[0]) * 0.09;
      line(F, [[q[0] - w, q[1] - s * w], [q[0] + w, q[1] + s * w]], { c: k.acc, w: 3 });
      dot(F, q[0], q[1], 6, k.acc);
    }
    F.unclip();
    if (cur) label(F, cur[0], cur[1], `slope = ${fmt(f(cur[0], [cur[1]])[0], 2)}`, k.acc2, 'left', 10, -10);
    /* lower plot: the solution and its derivative */
    if (sel < 0) { frame(B, tr, yr, { xl: 't' }); return; }
    const c = curves[sel], d = c.p.map(q => [q[0], f(q[0], [q[1]])[0]]), all = c.p.map(q => q[1]).concat(d.map(q => q[1])).filter(v => Number.isFinite(v) && Math.abs(v) < 1e3);
    let lo = Math.min(...all), hi = Math.max(...all); if (hi - lo < 1e-6) { lo -= 1; hi += 1; } const pad = (hi - lo) * 0.08;
    const G = frame(B, tr, [lo - pad, hi + pad], { xl: 't', yl: 'y and y′' }); G.clip();
    line(G, d, { c: k.acc, w: 2.4, dash: [8, 5] }); line(G, c.p.map(q => [q[0], q[1]]), { c: k.pri, w: 3 });
    if (cur) { G.x.strokeStyle = k.soft; G.x.setLineDash([3, 4]); G.x.beginPath(); G.x.moveTo(G.X(cur[0]), G.T); G.x.lineTo(G.X(cur[0]), G.H - G.B); G.x.stroke(); G.x.setLineDash([]); dot(G, cur[0], cur[1], 5, k.pri); dot(G, cur[0], f(cur[0], [cur[1]])[0], 5, k.acc); }
    G.unclip();
  }
  anim(el, dt => { if (sel < 0) return; at += dt * (tr[1] - tr[0]) / 8; const c = curves[sel]; if (at > c.p[c.p.length - 1][0]) at = c.p[0][0]; draw(); });
  REDRAW.push(draw); preset(); at = curves.length ? curves[sel].t0 : 0; draw();
};

/* Day 1: a draining tank — rate in minus rate out */
W.tank = el => {
  lab(el);
  const st = form(el, [{ k: 'qin', t: 'range', l: 'Inflow Q<sub>in</sub>', min: 0, max: 120, v: 60, u: 'L/min' }, { k: 'kk', t: 'range', l: 'Outlet coefficient k', min: 20, max: 120, v: 60, u: 'L/min per √m' }, { k: 'A', t: 'range', l: 'Tank area A', min: 0.2, max: 2, s: 0.1, v: 0.5, u: 'm²' }], () => draw());
  const bar = div(el, 'ctl'); bar.innerHTML = '<button type="button">↺ Restart from empty</button>'; $('button', bar).onclick = () => { reset(0); draw(); };
  const g = div(el, 'grid3'), T = canvas(g, 'sq', 'The tank (dashed: the level where in = out)'), H = canvas(g, 'plot', 'Level h(t), m'), D = canvas(g, 'plot', 'Rate of change dh/dt, m/min');
  const out = div(el, 'out');
  let t = 0, h = 0, hist = [];
  const rate = h => (st.qin - st.kk * Math.sqrt(Math.max(h, 0))) / (1000 * st.A);
  function reset(h0) { t = 0; h = h0; hist = [[0, h, rate(h)]]; }
  function adv(dt) { const n = 20, hh = dt / n; for (let i = 0; i < n; i++) { h = rk4((s, y) => [rate(y[0])], t, [h], hh)[0]; h = Math.max(h, 0); t += hh; } hist.push([t, h, rate(h)]); if (hist.length > 3000) hist.shift(); }
  function draw() {
    const k = C(); T.fit(); H.fit(); D.fit();
    const hs = Math.pow(st.qin / st.kk, 2), x = T.ctx, W = T.w, Hh = T.h, top = 30, bot = Hh - 40, tw = W * 0.46, tx = W * 0.27, hmax = 4;
    x.fillStyle = k.card; x.fillRect(0, 0, W, Hh);
    const yOf = v => bot - Math.min(v, hmax) / hmax * (bot - top);
    x.fillStyle = 'rgba(31,95,191,.35)'; x.fillRect(tx, yOf(h), tw, bot - yOf(h));
    x.strokeStyle = k.ink; x.lineWidth = 3; x.beginPath(); x.moveTo(tx, top); x.lineTo(tx, bot); x.lineTo(tx + tw, bot); x.lineTo(tx + tw, top); x.stroke();
    x.strokeStyle = k.acc; x.setLineDash([7, 5]); x.lineWidth = 2; x.beginPath(); x.moveTo(tx - 10, yOf(hs)); x.lineTo(tx + tw + 10, yOf(hs)); x.stroke(); x.setLineDash([]);
    const qo = st.kk * Math.sqrt(h);
    x.fillStyle = k.pri; x.fillRect(tx - 6, top - 18, Math.max(2, st.qin / 120 * 18) + 30, 8); x.fillRect(tx + 20, top - 10, Math.max(2, st.qin / 120 * 16), (yOf(h) - top + 10) * 0.98);
    x.fillRect(tx + tw, bot - 12, 30, 8); x.fillRect(tx + tw + 26, bot - 4, Math.max(2, qo / 120 * 16), 34);
    x.fillStyle = k.ink; x.font = '600 13px Inter,sans-serif'; x.textAlign = 'left';
    x.fillText(`in ${fmt(st.qin, 0)} L/min`, tx - 4, top - 22); x.fillText(`out ${fmt(qo, 0)}`, tx + tw + 4, bot + 26); x.fillText(`h = ${fmt(h, 2)} m`, 8, yOf(h) + 4);
    const t0 = Math.max(0, t - 120), tr = [t0, t0 + 120];
    const F = frame(H, tr, [0, Math.max(2, hs * 1.3, ...hist.map(p => p[1])) ], { xl: 't, min' }); F.clip(); line(F, [[tr[0], hs], [tr[1], hs]], { c: k.acc, w: 1.6, dash: [7, 5] }); line(F, hist.map(p => [p[0], p[1]]), { c: k.pri }); dot(F, t, h, 5, k.pri); F.unclip();
    const dm = Math.max(0.02, ...hist.map(p => Math.abs(p[2]))) * 1.15, G = frame(D, tr, [-dm, dm], { xl: 't, min' }); G.clip(); line(G, hist.map(p => [p[0], p[2]]), { c: k.acc, dash: [8, 5] }); dot(G, t, rate(h), 5, k.acc); G.unclip();
    const tau = hs > 0 ? 2 * 1000 * st.A * Math.sqrt(hs) / st.kk : NaN;
    out.textContent = `dh/dt = (Q_in − k·√h) / (1000·A) = (${fmt(st.qin, 0)} − ${fmt(st.kk, 0)}·√${fmt(h, 3)}) / ${fmt(1000 * st.A, 0)} = ${fmt(rate(h) * 1000, 2)} mm/min\nEquilibrium (rate in = rate out): h* = (Q_in/k)² = ${fmt(hs, 3)} m\nNear h* the tank behaves like a first-order lag with time constant τ = 2·A·√h*/k ≈ ${fmt(tau, 1)} min\nTry: change the inflow while it plays — the level never jumps, only its slope does.`;
  }
  reset(0); for (let i = 0; i < 160; i++) adv(0.25);
  anim(el, dt => { adv(dt * 8); draw(); });
  REDRAW.push(draw); draw();
};

/* Day 2: first-order lag — the time constant made visible */
const TAU_P = {
  oil: ['Gearbox oil warming up', 'min', '°C rise above room', 25, 45, 0, 'step'],
  rc: ['RC circuit charging', 'ms', 'V on the capacitor', 2, 5, 0, 'step'],
  tea: ['Cup of tea cooling', 'min', '°C above room', 8, 0, 60, 'step'],
  tc: ['Thermocouple in an oscillating flow', 's', '°C', 3, 10, 0, 'sine'],
  gen: ['Generic: τ·y′ + y = K·u(t)', 's', 'y', 1, 1, 0, 'step']
};
W.tau = el => {
  lab(el);
  const st = form(el, [{ k: 'p', t: 'sel', l: 'Process', v: 'oil', o: Object.keys(TAU_P).map(k => [k, TAU_P[k][0]]) }, { k: 'u', t: 'seg', l: 'Input u(t)', v: 'step', o: [['step', 'step'], ['ramp', 'ramp'], ['sine', 'sine'], ['pulse', 'pulse']] }],
    kk => { if (kk === 'p') load(); draw(); });
  const st2 = form(el, [{ k: 'tau', t: 'range', l: 'Time constant τ', min: 0.2, max: 40, s: 0.1, v: 25 }, { k: 'K', t: 'range', l: 'Gain K (final value)', min: -10, max: 80, s: 0.5, v: 45 }, { k: 'y0', t: 'range', l: 'Start y(0)', min: -20, max: 80, s: 0.5, v: 0 }, { k: 'w', t: 'range', l: 'Sine: ω·τ', min: 0.05, max: 10, s: 0.05, v: 1 }], () => draw());
  const g = div(el, 'grid2'), A = canvas(g, 'plot', 'Response y(t) (blue) to the input K·u(t) (orange dashed)'), B = canvas(g, 'plot', 'The derivative y′(t) = (K·u − y)/τ: largest at the start, dying away');
  const lg = div(el, 'legend'); legend(lg, [['', 'y(t)'], ['o dash', 'input K·u(t)'], ['k dash', 'initial tangent'], ['o', 'y′(t)']]); const out = div(el, 'out');
  function set(k, v) { st2[k] = v; st2._el[k].value = v; st2._el[k]._show(); }
  function load() { const P = TAU_P[st.p]; set('tau', P[3]); set('K', P[4]); set('y0', P[5]); st.u = P[6]; $$('button', st._el.u).forEach(b => b.classList.toggle('on', b.dataset.v === P[6])); }
  function draw() {
    const k = C(), P = TAU_P[st.p], tau = st2.tau, K = st2.K, y0 = st2.y0, w = st2.w / tau, T = 6 * tau;
    const u = t => st.u === 'step' ? 1 : st.u === 'ramp' ? t / tau : st.u === 'sine' ? Math.sin(w * t) : (t < tau ? 1 : 0);
    const f = (t, y) => [(K * u(t) - y[0]) / tau], sol = solve(f, 0, [y0], T, T / 600);
    const ys = sol.map(p => p[1]), us = sol.map(p => K * u(p[0])), lo = Math.min(0, ...ys, ...us), hi = Math.max(...ys, ...us, 1e-6), pad = (hi - lo) * 0.1 || 1;
    A.fit(); B.fit();
    const F = frame(A, [0, T], [lo - pad, hi + pad], { xl: 't, ' + P[1], yl: P[2] }); F.clip();
    line(F, sol.map(p => [p[0], K * u(p[0])]), { c: k.acc, w: 2, dash: [8, 5] });
    const s0 = (K * u(0) - y0) / tau; line(F, [[0, y0], [tau * 1.6, y0 + s0 * tau * 1.6]], { c: k.ink, w: 1.4, dash: [3, 4] });
    line(F, sol.map(p => [p[0], p[1]]), { c: k.pri, w: 3 });
    if (st.u === 'step') [[1, '63.2 %'], [3, '95 %'], [5, '99.3 %']].forEach(m => { const t = m[0] * tau, y = K + (y0 - K) * Math.exp(-m[0]); dot(F, t, y, 5, k.pri); label(F, t, y, `${m[0]}τ: ${m[1]}`, k.pri, 'left', 6, (y0 < K ? 16 : -8)); });
    F.unclip();
    const ds = sol.map(p => [p[0], f(p[0], [p[1]])[0]]), dm = Math.max(...ds.map(p => Math.abs(p[1])), 1e-6) * 1.15;
    const G = frame(B, [0, T], [-dm, dm], { xl: 't, ' + P[1], yl: 'y′' }); G.clip(); line(G, ds, { c: k.acc, w: 2.6 }); G.unclip();
    let txt = `τ·y′ + y = K·u(t)   with τ = ${fmt(tau, 2)} ${P[1]}, K = ${fmt(K, 1)}, y(0) = ${fmt(y0, 1)}\n`;
    if (st.u === 'step') txt += `Solution: y(t) = K + (y(0) − K)·e^(−t/τ) = ${fmt(K, 1)} ${sgnf(y0 - K, 1)}·e^(−t/${fmt(tau, 2)})\nInitial slope y′(0) = (K − y(0))/τ = ${fmt(s0, 3)} — the dotted tangent reaches the final value at exactly t = τ.\nAfter 1τ: 63.2 % of the change, 3τ: 95 %, 5τ: 99.3 % — whatever the size of K.`;
    else if (st.u === 'sine') txt += `Steady state: y = K·sin(ωt − φ)/√(1 + (ωτ)²)\nωτ = ${fmt(w * tau, 2)} → amplitude ratio ${fmt(1 / Math.sqrt(1 + (w * tau) ** 2), 3)}, lag φ = ${fmt(Math.atan(w * tau) * 180 / PI, 1)}°\nA slow sensor (large τ) reads a fast signal small and late — that is why thermocouples in rigs are thin.`;
    else if (st.u === 'ramp') txt += `For a ramp input the output settles into the same ramp, running τ behind it (here ${fmt(tau, 2)} ${P[1]}) — the classic "velocity lag".`;
    else txt += `Pulse of length τ: the output climbs for one τ (to 63 % if it started from 0), then decays back with the same time constant.`;
    out.textContent = txt;
  }
  REDRAW.push(draw); load(); draw();
};

/* Day 3: phase line and bifurcation diagram for y′ = f(y; p) */
const PL = [
  ['Fishery with harvesting: y′ = y·(1 − y/4) − p', (y, p) => y * (1 - y / 4) - p, [-1, 5], [0, 1.6], 0.5, 'harvest p'],
  ['Saddle-node: y′ = p + y²', (y, p) => p + y * y, [-3, 3], [-2, 1], -1, 'p'],
  ['Transcritical: y′ = p·y − y²', (y, p) => p * y - y * y, [-3, 3], [-2, 2], 1, 'p'],
  ['Pitchfork: y′ = p·y − y³', (y, p) => p * y - y * y * y, [-2.5, 2.5], [-1, 3], 1, 'p'],
  ['Spruce budworm: y′ = p·y·(1 − y/8) − y²/(1 + y²)', (y, p) => p * y * (1 - y / 8) - y * y / (1 + y * y), [-0.5, 8.5], [0.3, 0.7], 0.5, 'growth p']
];
function roots(f, a, b, n) {
  const out = []; let x0 = a, f0 = f(a);
  for (let i = 1; i <= n; i++) {
    const x1 = a + (b - a) * i / n, f1 = f(x1);
    if (f0 === 0) out.push(x0);
    else if (f0 * f1 < 0) { let lo = x0, hi = x1, flo = f0; for (let k = 0; k < 50; k++) { const m = (lo + hi) / 2, fm = f(m); if (flo * fm <= 0) hi = m; else { lo = m; flo = fm; } } out.push((lo + hi) / 2); }
    x0 = x1; f0 = f1;
  }
  return out;
}
W.phaseline = el => {
  lab(el);
  const st = form(el, [{ k: 'm', t: 'sel', l: 'Model', v: '0', o: PL.map((m, i) => [i, m[0]]) }], () => { const m = PL[+st.m]; st.p = m[4]; ps.min = m[3][0]; ps.max = m[3][1]; ps.step = (m[3][1] - m[3][0]) / 200; ps.value = m[4]; show(); draw(); });
  const pc = div(el, 'ctl'); pc.innerHTML = '<label>parameter p <input type="range"> <b class="mono"></b></label>';
  const ps = $('input', pc), pb = $('b', pc), show = () => pb.textContent = fmt(+ps.value, 3);
  ps.oninput = () => { st.p = +ps.value; show(); draw(); };
  const g = div(el, 'grid3'), A = canvas(g, 'plot', 'f(y) against y. Arrows on the axis are the phase line: where f > 0, y rises.'), B = canvas(g, 'plot', 'Solutions y(t) from many starting values'), D = canvas(g, 'plot', 'Bifurcation diagram: equilibria against p (dashed line: current p)');
  const lg = div(el, 'legend'); legend(lg, [['', 'stable equilibrium / f(y)'], ['o dash', 'unstable equilibrium']]); const out = div(el, 'out');
  let dir = 1;
  function eqs(m, p) { const f = y => m[1](y, p), r = roots(f, m[2][0], m[2][1], 600); return r.map(y => { const d = (f(y + 1e-5) - f(y - 1e-5)) / 2e-5; return [y, d < -1e-7 ? 's' : d > 1e-7 ? 'u' : 'h']; }); }
  function draw() {
    const k = C(), m = PL[+st.m], p = st.p, f = y => m[1](y, p), yr = m[2]; A.fit(); B.fit(); D.fit();
    const ys = lin(yr[0], yr[1], 300), fs = ys.map(f), fm = Math.max(...fs.map(Math.abs), 0.1) * 1.15;
    const F = frame(A, yr, [-fm, fm], { xl: 'y', yl: "f(y) = y′" }); F.clip();
    F.x.fillStyle = 'rgba(31,95,191,.10)'; ys.forEach((y, i) => { if (i && fs[i] > 0) F.x.fillRect(F.X(ys[i - 1]), F.Y(fs[i]), F.X(y) - F.X(ys[i - 1]) + 0.5, F.Y(0) - F.Y(fs[i])); });
    line(F, ys.map((y, i) => [y, fs[i]]), { c: k.pri, w: 3 });
    for (let i = 0; i < 9; i++) { const y = yr[0] + (yr[1] - yr[0]) * (i + 0.5) / 9, v = f(y); if (Math.abs(v) < fm * 0.02) continue; arrowHead(F.x, F.X(y) + (v > 0 ? 9 : -9), F.Y(0), v > 0 ? 0 : PI, 12, k.ink); }
    const E = eqs(m, p); E.forEach(e => { if (e[1] === 's') dot(F, e[0], 0, 7, k.pri); else dot(F, e[0], 0, 7, k.card, e[1] === 'u' ? k.acc : k.ink); });
    F.unclip();
    const T = 12, G = frame(B, [0, T], yr, { xl: 't', yl: 'y' }); G.clip();
    E.forEach(e => line(G, [[0, e[0]], [T, e[0]]], { c: e[1] === 's' ? k.pri : k.acc, w: 1.6, dash: e[1] === 's' ? [] : [7, 5] }));
    for (let i = 0; i < 15; i++) { const y0 = yr[0] + (yr[1] - yr[0]) * (i + 0.5) / 15, s = solve((t, y) => [f(y[0])], 0, [y0], T, T / 400, (t, y) => Math.abs(y[0]) > 50); line(G, s.map(q => [q[0], q[1]]), { c: k.soft, w: 1.6 }); }
    G.unclip();
    const H = frame(D, m[3], yr, { xl: m[5], yl: 'equilibrium y*' }); H.clip();
    for (let i = 0; i <= 260; i++) { const pp = m[3][0] + (m[3][1] - m[3][0]) * i / 260; eqs(m, pp).forEach(e => { H.x.fillStyle = e[1] === 's' ? k.pri : k.acc; const r = e[1] === 's' ? 2.4 : 1.5; if (e[1] === 's' || i % 2 === 0) { H.x.beginPath(); H.x.arc(H.X(pp), H.Y(e[0]), r, 0, 2 * PI); H.x.fill(); } }); }
    H.x.strokeStyle = k.ink; H.x.setLineDash([5, 4]); H.x.lineWidth = 1.5; H.x.beginPath(); H.x.moveTo(H.X(p), H.T); H.x.lineTo(H.X(p), H.H - H.B); H.x.stroke(); H.x.setLineDash([]);
    E.forEach(e => dot(H, p, e[0], 6, e[1] === 's' ? k.pri : k.card, e[1] === 's' ? k.card : k.acc));
    H.unclip();
    out.textContent = `p = ${fmt(p, 3)}:  ${E.length ? E.map(e => `y* = ${fmt(e[0], 3)} (${e[1] === 's' ? 'stable — f′ < 0' : e[1] === 'u' ? 'unstable — f′ > 0' : 'half-stable — f′ = 0'})`).join(';  ') : 'no equilibrium — every solution runs off'}\nPress Play to sweep p and watch equilibria meet and vanish: that collision is a bifurcation.`;
  }
  anim(el, dt => { const m = PL[+st.m], sp = (m[3][1] - m[3][0]) / 8; st.p += dir * sp * dt; if (st.p > m[3][1]) { st.p = m[3][1]; dir = -1; } if (st.p < m[3][0]) { st.p = m[3][0]; dir = 1; } ps.value = st.p; show(); draw(); });
  REDRAW.push(draw); st._el.m.onchange({});
  st._el.m.onchange = () => { st.m = st._el.m.value; const m = PL[+st.m]; st.p = m[4]; ps.min = m[3][0]; ps.max = m[3][1]; ps.step = (m[3][1] - m[3][0]) / 200; ps.value = m[4]; show(); draw(); };
  st._el.m.onchange();
};

/* Day 4: Euler vs Heun vs RK4, and how the error shrinks with the step */
const NUM_P = {
  bell: ['y′ = −2·t·y, y(0) = 1 (exact e^(−t²))', (t, y) => [-2 * t * y[0]], [1], 3, t => Math.exp(-t * t)],
  grow: ['y′ = y, y(0) = 1 (exact eᵗ)', (t, y) => [y[0]], [1], 3, t => Math.exp(t)],
  drive: ['y′ = cos t − y, y(0) = 0', (t, y) => [Math.cos(t) - y[0]], [0], 10, t => (Math.cos(t) + Math.sin(t) - Math.exp(-t)) / 2],
  stiff: ['Stiff: y′ = −50·(y − cos t), y(0) = 0', (t, y) => [-50 * (y[0] - Math.cos(t))], [0], 2, t => (2500 * Math.cos(t) + 50 * Math.sin(t)) / 2501 - 2500 / 2501 * Math.exp(-50 * t)],
  osc: ['Oscillator x″ = −x, x(0) = 1 (exact cos t)', (t, y) => [y[1], -y[0]], [1, 0], 20, t => Math.cos(t)]
};
function stepper(m) {
  if (m === 'rk4') return rk4;
  if (m === 'euler') return (f, t, y, h) => { const k = f(t, y); return y.map((v, i) => v + h * k[i]); };
  return (f, t, y, h) => { const k1 = f(t, y), yp = y.map((v, i) => v + h * k1[i]), k2 = f(t + h, yp); return y.map((v, i) => v + h / 2 * (k1[i] + k2[i])); };
}
function march(m, P, h) { const f = P[1], T = P[3], n = Math.max(1, Math.round(T / h)), hh = T / n, s = stepper(m); let y = P[2].slice(), t = 0; const out = [[0, y[0]]]; for (let i = 0; i < n; i++) { y = s(f, t, y, hh); t += hh; out.push([t, y[0]]); if (!Number.isFinite(y[0]) || Math.abs(y[0]) > 1e12) break; } return out; }
W.numerics = el => {
  lab(el);
  const st = form(el, [{ k: 'p', t: 'sel', l: 'Problem', v: 'bell', o: Object.keys(NUM_P).map(k => [k, NUM_P[k][0]]) }, { k: 'e', t: 'range', l: 'Step h = 10^', min: -3, max: -0.1, s: 0.05, v: -0.7 }], () => draw());
  const g = div(el, 'grid2'), A = canvas(g, 'plot', 'Numerical solutions against the exact one'), B = div(g);
  const lg = div(el, 'legend'); legend(lg, [['k dash', 'exact'], ['o', 'Euler (order 1)'], ['v dash', 'Heun / RK2 (order 2)'], ['', 'RK4 (order 4)']]); const out = div(el, 'out');
  function draw() {
    const k = C(), P = NUM_P[st.p], h = Math.pow(10, st.e), T = P[3]; A.fit();
    const ex = lin(0, T, 400).map(t => [t, P[4](t)]), lo = Math.min(...ex.map(p => p[1])), hi = Math.max(...ex.map(p => p[1])), pad = (hi - lo) * 0.25 + 0.1;
    const F = frame(A, [0, T], [lo - pad, hi + pad], { xl: 't', yl: 'y' }); F.clip();
    line(F, ex, { c: k.ink, w: 2, dash: [3, 4] });
    const S = { euler: march('euler', P, h), heun: march('heun', P, h), rk4: march('rk4', P, h) };
    line(F, S.euler, { c: k.acc, w: 2.6 }); line(F, S.heun, { c: k.vio, w: 2.4, dash: [9, 5] }); line(F, S.rk4, { c: k.pri, w: 2.4 });
    if (h > T / 60) [['euler', k.acc], ['heun', k.vio], ['rk4', k.pri]].forEach(m => S[m[0]].forEach(p => dot(F, p[0], p[1], 2.6, m[1], m[1])));
    F.unclip();
    const hs = lin(-3, -0.1, 24).map(e => Math.pow(10, e)), err = m => hs.map(hh => { const s = march(m, P, hh), last = s[s.length - 1]; const e = Math.abs(last[0] < T - 1e-9 ? 1e6 : last[1] - P[4](T)); return [hh, clamp(e, 1e-14, 1e6)]; });
    const E = { euler: err('euler'), heun: err('heun'), rk4: err('rk4') };
    B.innerHTML = chart({ x: [1e-3, 1], y: [1e-14, 1e6], logx: true, logy: true, w: 520, h: 330, xl: 'step h (log)', yl: 'error at the end (log)', series: [{ p: E.euler, c: 'o' }, { p: E.heun, c: 'v', dash: 1 }, { p: E.rk4, c: 'b' }, { p: [[h, 1e-14], [h, 1e6]], c: 'd' }], labels: [[0.002, E.euler[2][1], 'slope 1', 4, -6, 'ot'], [0.002, E.rk4[2][1], 'slope 4', 4, -6, 'bt']] }) + '<div class="cap">On log–log axes the error of an order-p method is a line of slope p. The vertical line is your h.</div>';
    const eN = m => { const s = S[m], l = s[s.length - 1]; return l[0] < T - 1e-9 ? 'blew up' : fmt(Math.abs(l[1] - P[4](T)), 8); };
    out.textContent = `h = ${fmt(h, 4)}  →  ${Math.round(T / h)} steps to t = ${T}\nError at t = ${T}:  Euler ${eN('euler')}   ·   Heun ${eN('heun')}   ·   RK4 ${eN('rk4')}\nWork per step: Euler 1, Heun 2, RK4 4 evaluations of f. Halve h → Euler error halves, RK4 error falls 16×.` + (st.p === 'stiff' ? `\nStiff problem: Euler is stable only if h < 2/50 = 0.04 (10^${fmt(Math.log10(0.04), 2)}). Above that it explodes even though the true solution is smooth.` : st.p === 'osc' ? `\nEuler spirals outwards: every step adds energy. Watch the amplitude grow.` : '');
  }
  REDRAW.push(draw); draw();
};

/* Day 5: spring–mass–damper — animation, time plots, phase portrait and the roots */
W.smd = el => {
  lab(el);
  const st = form(el, [{ k: 'm', t: 'range', l: 'Mass m', min: 0.2, max: 5, s: 0.1, v: 1, u: 'kg' }, { k: 'k', t: 'range', l: 'Stiffness k', min: 1, max: 100, s: 1, v: 40, u: 'N/m' }, { k: 'c', t: 'range', l: 'Damping c', min: 0, max: 30, s: 0.1, v: 1.5, u: 'N·s/m' }, { k: 'x0', t: 'range', l: 'x(0)', min: -1, max: 1, s: 0.05, v: 0.8, u: 'm' }, { k: 'v0', t: 'range', l: 'v(0)', min: -5, max: 5, s: 0.1, v: 0, u: 'm/s' }], () => { at = 0; draw(); });
  const M = canvas(el, 'wide', 'm·x″ + c·x′ + k·x = 0');
  const g = div(el, 'grid3'), A = canvas(g, 'plot', 'Displacement x(t) and velocity scaled by ωn, v(t)/ωn'), P = canvas(g, 'sq', 'Phase portrait: v against x'), S = canvas(g, 'sq', 'Roots of m·s² + c·s + k = 0 in the complex plane');
  const lg = div(el, 'legend'); legend(lg, [['', 'x(t)'], ['o dash', 'v(t)/ωn'], ['k dash', 'decay envelope']]); const out = div(el, 'out');
  let at = 0, sol = [], T = 10;
  function draw() {
    const k = C(), m = st.m, wn = Math.sqrt(st.k / m), z = st.c / (2 * Math.sqrt(st.k * m));
    T = Math.max(4, Math.min(30, 8 * 2 * PI / wn, z > 0 ? 6 / (z * wn) : 30));
    sol = solve((t, y) => [y[1], -(st.c * y[1] + st.k * y[0]) / m], 0, [st.x0, st.v0], T, T / 800);
    M.fit(); A.fit(); P.fit(); S.fit();
    const q = sol[Math.min(sol.length - 1, Math.round(at / T * (sol.length - 1)))], x = M.ctx, W = M.w, H = M.h, mid = H * 0.55, x0 = W * 0.08, xm = W * 0.5 + q[1] * W * 0.3;
    x.fillStyle = k.card; x.fillRect(0, 0, W, H); wall(x, x0, mid - 50, mid + 50, k.ink);
    spring(x, x0, xm - 35, mid - 18, 9, 10, k.pri); damper(x, x0, xm - 35, mid + 22, k.acc2);
    block(x, xm, mid, 70, 70, k.code || k.bg, k.ink, 'm');
    x.strokeStyle = k.soft; x.setLineDash([4, 4]); x.beginPath(); x.moveTo(W * 0.5, mid - 60); x.lineTo(W * 0.5, mid + 60); x.stroke(); x.setLineDash([]);
    x.fillStyle = k.soft; x.font = '12px Inter,sans-serif'; x.textAlign = 'center'; x.fillText('x = 0', W * 0.5, mid + 74);
    x.fillStyle = k.ink; x.font = '600 13px Inter,sans-serif'; x.fillText(`t = ${fmt(q[0], 2)} s   x = ${fmt(q[1], 3)} m   v = ${fmt(q[2], 2)} m/s`, W * 0.5, 18);
    const xm2 = Math.max(...sol.map(p => Math.abs(p[1])), 1e-3), vm = Math.max(...sol.map(p => Math.abs(p[2])), 1e-3), sc = Math.max(xm2, vm / wn) * 1.1;
    const F = frame(A, [0, T], [-sc, sc], { xl: 't, s' }); F.clip();
    if (z < 1 && z > 0) { const amp = Math.hypot(st.x0, (st.v0 + z * wn * st.x0) / (wn * Math.sqrt(1 - z * z))); line(F, lin(0, T, 100).map(t => [t, amp * Math.exp(-z * wn * t)]), { c: k.ink, w: 1.2, dash: [3, 4] }); line(F, lin(0, T, 100).map(t => [t, -amp * Math.exp(-z * wn * t)]), { c: k.ink, w: 1.2, dash: [3, 4] }); }
    line(F, sol.map(p => [p[0], p[2] / wn]), { c: k.acc, w: 2.2, dash: [8, 5] }); line(F, sol.map(p => [p[0], p[1]]), { c: k.pri, w: 3 });
    dot(F, q[0], q[1], 5, k.pri); dot(F, q[0], q[2] / wn, 5, k.acc); F.unclip();
    const G = frame(P, [-xm2 * 1.2, xm2 * 1.2], [-vm * 1.2, vm * 1.2], { xl: 'x', yl: 'v' }); G.clip(); line(G, sol.map(p => [p[1], p[2]]), { c: k.pri, w: 2.4 }); dot(G, q[1], q[2], 6, k.acc); G.unclip();
    const disc = st.c * st.c - 4 * m * st.k, r = disc >= 0 ? [[(-st.c + Math.sqrt(disc)) / (2 * m), 0], [(-st.c - Math.sqrt(disc)) / (2 * m), 0]] : [[-st.c / (2 * m), Math.sqrt(-disc) / (2 * m)], [-st.c / (2 * m), -Math.sqrt(-disc) / (2 * m)]];
    const R = Math.max(wn * 1.3, ...r.map(z => Math.abs(z[0]) * 1.1), 1);
    const Hh = frame(S, [-R, R * 0.4], [-R, R], { xl: 'Re s (decay rate)', yl: 'Im s (frequency)' }); Hh.clip();
    Hh.x.strokeStyle = k.rule; Hh.x.setLineDash([4, 4]); Hh.x.beginPath(); Hh.x.arc(Hh.X(0), Hh.Y(0), Math.abs(Hh.X(wn) - Hh.X(0)), 0, 2 * PI); Hh.x.stroke(); Hh.x.setLineDash([]);
    r.forEach(z => { const X = Hh.X(z[0]), Y = Hh.Y(z[1]); Hh.x.strokeStyle = k.pri; Hh.x.lineWidth = 3; Hh.x.beginPath(); Hh.x.moveTo(X - 7, Y - 7); Hh.x.lineTo(X + 7, Y + 7); Hh.x.moveTo(X + 7, Y - 7); Hh.x.lineTo(X - 7, Y + 7); Hh.x.stroke(); });
    Hh.unclip();
    const reg = st.c === 0 ? 'undamped — oscillates for ever' : z < 1 ? 'under-damped — oscillates and decays' : Math.abs(z - 1) < 0.01 ? 'critically damped — fastest return without overshoot' : 'over-damped — creeps back, no oscillation';
    out.textContent = `ωn = √(k/m) = ${fmt(wn, 3)} rad/s  (fn = ${fmt(wn / 2 / PI, 3)} Hz)     ζ = c / (2√(k·m)) = ${fmt(z, 3)}  →  ${reg}\nRoots s = ${cstr(r[0])},  ${cstr(r[1])}\n` + (z < 1 ? `Solution: x = e^(−${fmt(z * wn, 3)}·t)·(A·cos ${fmt(wn * Math.sqrt(1 - z * z), 3)}t + B·sin ${fmt(wn * Math.sqrt(1 - z * z), 3)}t)   (damped frequency ωd = ωn·√(1 − ζ²))` : `Solution: x = A·e^(${fmt(r[0][0], 3)}·t) + B·e^(${fmt(r[1][0], 3)}·t)`) + `\nThe dashed circle has radius ωn: under-damped roots sit on it; the angle from the imaginary axis is asin ζ.`;
  }
  anim(el, dt => { at += dt; if (at > T) at = 0; draw(); });
  REDRAW.push(draw); draw();
};

/* ================= WEEK 2 LABS ================= */

/* Day 6: forced oscillator — time response, frequency response and phase */
W.forced = el => {
  lab(el);
  const st = form(el, [{ k: 'r', t: 'range', l: 'Frequency ratio r = ω/ωn', min: 0.05, max: 3, s: 0.01, v: 0.9 }, { k: 'z', t: 'range', l: 'Damping ratio ζ', min: 0, max: 1, s: 0.005, v: 0.05 }, { k: 'mode', t: 'seg', l: 'Plot', v: 'x', o: [['x', 'displacement X·k/F₀'], ['tr', 'transmissibility']] }], () => { at = 0; draw(); });
  const M = canvas(el, 'wide', 'x″ + 2ζωn·x′ + ωn²·x = ωn²·cos ωt   (ωn = 2π rad/s, starting at rest)');
  const g = div(el, 'grid3'), A = canvas(g, 'plot', 'x(t): transient + steady state'), B = div(g), D = div(g);
  const lg = div(el, 'legend'); legend(lg, [['', 'total response x(t)'], ['k dash', 'steady state only'], ['o', 'force (scaled)']]); const out = div(el, 'out');
  let at = 0, T = 12, sol = [];
  const mag = (r, z) => 1 / Math.sqrt((1 - r * r) ** 2 + (2 * z * r) ** 2), trn = (r, z) => Math.sqrt(1 + (2 * z * r) ** 2) * mag(r, z), ph = (r, z) => Math.atan2(2 * z * r, 1 - r * r);
  function draw() {
    const k = C(), wn = 2 * PI, w = st.r * wn, z = st.z;
    sol = solve((t, y) => [y[1], wn * wn * Math.cos(w * t) - 2 * z * wn * y[1] - wn * wn * y[0]], 0, [0, 0], T, T / 1500);
    const X = mag(st.r, z), phi = ph(st.r, z), xm = Math.max(1.2, ...sol.map(p => Math.abs(p[1]))) * 1.1;
    M.fit(); A.fit();
    const q = sol[Math.min(sol.length - 1, Math.round(at / T * (sol.length - 1)))], x = M.ctx, Wd = M.w, H = M.h, mid = H * 0.55, x0 = Wd * 0.08, xmB = Wd * 0.5 + q[1] / xm * Wd * 0.3;
    x.fillStyle = k.card; x.fillRect(0, 0, Wd, H); wall(x, x0, mid - 50, mid + 50, k.ink);
    spring(x, x0, xmB - 35, mid - 18, 9, 10, k.pri); damper(x, x0, xmB - 35, mid + 22, k.acc2); block(x, xmB, mid, 70, 70, k.bg, k.ink, 'm');
    const fx = Math.cos(w * q[0]); x.strokeStyle = k.acc; x.lineWidth = 4; x.beginPath(); x.moveTo(xmB + 35, mid); x.lineTo(xmB + 35 + fx * 70, mid); x.stroke(); arrowHead(x, xmB + 35 + fx * 70 + (fx >= 0 ? 6 : -6), mid, fx >= 0 ? 0 : PI, 13, k.acc);
    x.fillStyle = k.ink; x.font = '600 13px Inter,sans-serif'; x.textAlign = 'center'; x.fillText(`t = ${fmt(q[0], 2)} s   x = ${fmt(q[1], 2)}   (static deflection = 1)`, Wd * 0.5, 18);
    const F = frame(A, [0, T], [-xm, xm], { xl: 't, s' }); F.clip();
    line(F, sol.map(p => [p[0], Math.cos(w * p[0]) * Math.min(1, xm * 0.4)]), { c: k.acc, w: 1.4 });
    line(F, sol.map(p => [p[0], X * Math.cos(w * p[0] - phi)]), { c: k.ink, w: 1.4, dash: [3, 4] });
    line(F, sol.map(p => [p[0], p[1]]), { c: k.pri, w: 2.6 }); dot(F, q[0], q[1], 5, k.pri); F.unclip();
    const rs = lin(0.02, 3, 300), fn = st.mode === 'x' ? mag : trn, zs = [0.05, 0.1, 0.2, 0.5, 1];
    B.innerHTML = chart({ x: [0, 3], y: [0.01, 100], logy: true, w: 420, h: 300, xl: 'r = ω/ωn', yl: st.mode === 'x' ? 'amplitude ratio X·k/F₀' : 'force transmissibility', series: zs.map(zz => ({ p: rs.map(r => [r, fn(r, zz)]), c: 'd' })).concat([{ p: rs.map(r => [r, fn(r, Math.max(z, 1e-4))]), c: 'b' }, { p: [[0, 1], [3, 1]], c: 'o', dash: 1 }]), pts: [[st.r, fn(st.r, Math.max(z, 1e-4))]], labels: st.mode === 'tr' ? [[Math.SQRT2, 0.02, '√2', 4, 0, 'ot']] : [] }) + '<div class="cap">Grey: ζ = 0.05, 0.1, 0.2, 0.5, 1. Blue: your ζ.</div>';
    D.innerHTML = chart({ x: [0, 3], y: [0, 180], w: 420, h: 300, xl: 'r = ω/ωn', yl: 'phase lag φ, degrees', series: zs.map(zz => ({ p: rs.map(r => [r, ph(r, zz) * 180 / PI]), c: 'd' })).concat([{ p: rs.map(r => [r, ph(r, Math.max(z, 1e-4)) * 180 / PI]), c: 'b' }, { p: [[0, 90], [3, 90]], c: 'o', dash: 1 }]), pts: [[st.r, phi * 180 / PI]] }) + '<div class="cap">At resonance the response lags the force by exactly 90°, whatever ζ is.</div>';
    const rp = z < 0.707 ? Math.sqrt(1 - 2 * z * z) : NaN;
    out.textContent = `Steady-state amplitude X·k/F₀ = 1/√((1 − r²)² + (2ζr)²) = ${fmt(X, 3)}     phase lag φ = ${fmt(phi * 180 / PI, 1)}°\nAt resonance (r = 1) the amplitude is 1/(2ζ) = ${z > 0 ? fmt(1 / (2 * z), 1) : '∞'}  ·  peak at r = √(1 − 2ζ²) = ${Number.isFinite(rp) ? fmt(rp, 3) : 'none (ζ > 0.707)'}\nTransmissibility = ${fmt(trn(st.r, z), 3)} — isolation (TR < 1) only above r = √2 = 1.414, and more damping makes isolation worse there.` + (z < 0.02 && Math.abs(st.r - 1) < 0.15 && Math.abs(st.r - 1) > 0.01 ? `\nBeats: with little damping near resonance the transient and steady parts swap energy; beat period = 2π/|ω − ωn| = ${fmt(2 * PI / Math.abs(w - wn), 2)} s.` : '');
  }
  anim(el, dt => { at += dt * 0.5; if (at > T) at = 0; draw(); });
  REDRAW.push(draw); draw();
};

/* Day 7: drag the poles (and a zero) in the s-plane and watch the response change */
W.poles = el => {
  lab(el);
  const st = form(el, [{ k: 'sys', t: 'seg', l: 'System', v: 'pair', o: [['pair', 'pole pair'], ['real', 'one real pole'], ['zero', 'pole pair + zero']] }, { k: 'u', t: 'seg', l: 'Input', v: 'step', o: [['step', 'unit step'], ['imp', 'unit impulse']] }], () => draw());
  const g = div(el, 'grid3'), S = canvas(g, 'sq', 'The s-plane: drag the × poles (and the ○ zero). Left half = stable.'), A = canvas(g, 'plot', 'Output y(t)'), B = div(g);
  const lg = div(el, 'legend'); legend(lg, [['', 'y(t)'], ['k dash', 'envelope e^(σt)'], ['o dash', 'input']]); const out = div(el, 'out');
  let sg = -0.8, om = 2.5, zr = -1.5, drag = null, Fs = null;
  const SR = [-6, 2], IR = [-6, 6];
  function model() {
    if (st.sys === 'real') { const a = sg; return { n: 1, f: (t, y, u) => [a * y[0] + u], out: y => Math.abs(a) * y[0], G: w => cx.div([Math.abs(a), 0], [-a, w]), imp: [1] }; }
    const a0 = sg * sg + om * om, a1 = -2 * sg, b1 = st.sys === 'zero' ? -a0 / zr : 0;
    return { n: 2, f: (t, y, u) => [y[1], u - a1 * y[1] - a0 * y[0]], out: y => a0 * y[0] + b1 * y[1], G: w => cx.div([a0, b1 * w], [a0 - w * w, a1 * w]), imp: [0, 1] };
  }
  function draw() {
    const k = C(), m = model(), T = sg < -0.05 ? clamp(6 / -sg, 3, 25) : 8; S.fit(); A.fit();
    const F = Fs = frame(S, SR, IR, { xl: 'σ = Re s', yl: 'jω = Im s' });
    F.x.fillStyle = 'rgba(217,130,43,.10)'; F.x.fillRect(F.X(0), F.T, F.X(SR[1]) - F.X(0), F.H - F.T - F.B);
    F.x.fillStyle = k.soft; F.x.font = '12px Inter,sans-serif'; F.x.textAlign = 'left'; F.x.fillText('unstable', F.X(0.15), F.T + 14); F.x.fillText('stable', F.X(-5.8), F.T + 14);
    const P = st.sys === 'real' ? [[sg, 0]] : [[sg, om], [sg, -om]];
    P.forEach(p => { const X = F.X(p[0]), Y = F.Y(p[1]); F.x.strokeStyle = k.pri; F.x.lineWidth = 3.5; F.x.beginPath(); F.x.moveTo(X - 9, Y - 9); F.x.lineTo(X + 9, Y + 9); F.x.moveTo(X + 9, Y - 9); F.x.lineTo(X - 9, Y + 9); F.x.stroke(); });
    if (st.sys === 'zero') { F.x.strokeStyle = k.acc; F.x.lineWidth = 3; F.x.beginPath(); F.x.arc(F.X(zr), F.Y(0), 9, 0, 2 * PI); F.x.stroke(); }
    if (st.sys !== 'real') { F.x.strokeStyle = k.soft; F.x.setLineDash([4, 4]); F.x.lineWidth = 1.2; F.x.beginPath(); F.x.moveTo(F.X(0), F.Y(0)); F.x.lineTo(F.X(sg), F.Y(om)); F.x.stroke(); F.x.setLineDash([]); }
    const u = st.u === 'step' ? 1 : 0, sol = solve((t, y) => m.f(t, y, u), 0, st.u === 'step' ? new Array(m.n).fill(0) : m.imp, T, T / 800);
    const ys = sol.map(p => [p[0], m.out(p.slice(1))]), mx = Math.max(1.2, ...ys.map(p => Math.abs(p[1])).filter(Number.isFinite).slice(0, 2000)), cap = Math.min(mx, 6);
    const G = frame(A, [0, T], [Math.min(-0.2, -cap * (st.u === 'imp' ? 1 : 0.2)), cap * 1.05], { xl: 't' }); G.clip();
    if (st.u === 'step') line(G, [[0, 1], [T, 1]], { c: k.acc, w: 1.6, dash: [7, 5] });
    const e0 = st.u === 'step' ? Math.hypot(sg, om) / Math.max(om, 1e-3) : Math.hypot(sg, om) ** 2 / Math.max(om, 1e-3);
    if (st.sys === 'pair' && sg < 0) { line(G, lin(0, T, 120).map(t => [t, (st.u === 'step' ? 1 : 0) + e0 * Math.exp(sg * t) * (st.u === 'step' ? 1 : 1)]), { c: k.ink, w: 1.2, dash: [3, 4] }); line(G, lin(0, T, 120).map(t => [t, (st.u === 'step' ? 1 : 0) - e0 * Math.exp(sg * t)]), { c: k.ink, w: 1.2, dash: [3, 4] }); }
    line(G, ys, { c: k.pri, w: 3 }); G.unclip();
    const ws = lin(-2, 2, 200).map(e => Math.pow(10, e)), mg = ws.map(w => [w, clamp(cx.abs(m.G(w)), 1e-3, 1e3)]);
    B.innerHTML = chart({ x: [0.01, 100], y: [1e-3, 1e3], logx: true, logy: true, w: 420, h: 320, xl: 'ω, rad/s (log)', yl: '|G(jω)| (log)', series: [{ p: mg, c: 'b' }, { p: [[0.01, 1], [100, 1]], c: 'd', dash: 1 }], labels: st.sys !== 'real' ? [[Math.max(0.011, om), 1.5e2, 'ω ≈ ' + fmt(om, 2), 0, 0, 'ot', 'middle']] : [] }) + '<div class="cap">Frequency response: a pole pair close to the jω axis gives a tall resonance peak.</div>';
    const wn = Math.hypot(sg, om), z = -sg / wn;
    let txt = st.sys === 'real' ? `G(s) = ${fmt(Math.abs(sg), 2)} / (s ${sgnf(-sg, 2)})    pole at s = ${fmt(sg, 2)}  →  ${sg < 0 ? `decays like e^(${fmt(sg, 2)}t); time constant τ = ${fmt(-1 / sg, 2)}` : 'grows exponentially — unstable'}`
      : `Poles s = ${fmt(sg, 2)} ± ${fmt(om, 2)}j   →   ωn = |s| = ${fmt(wn, 3)},  ζ = −σ/ωn = ${fmt(z, 3)}\nReal part σ sets the decay e^(σt); imaginary part ω sets the ringing frequency.\n` + (sg < 0 ? `Overshoot ≈ ${fmt(100 * Math.exp(-PI * z / Math.sqrt(Math.max(1 - z * z, 1e-9))), 1)} %   peak time ≈ π/ω = ${fmt(PI / om, 2)}   2 % settling ≈ 4/|σ| = ${fmt(4 / -sg, 2)}` : sg > 0 ? 'σ > 0: right half-plane — the oscillation grows. Unstable.' : 'σ = 0: on the axis — undamped, oscillates for ever.');
    if (st.sys === 'zero') txt += `\nZero at s = ${fmt(zr, 2)}: ${zr < 0 ? 'a left-half-plane zero adds a derivative "kick" — more overshoot the closer it is to the poles' : 'a right-half-plane zero makes the step start the WRONG way first (non-minimum phase)'}.`;
    out.textContent = txt;
  }
  const hit = (p, X, Y) => Math.hypot(p[0] - X, p[1] - Y) < 18;
  function down(e) { if (!Fs) return; const p = S.pos(e); if (st.sys === 'zero' && hit(p, Fs.X(zr), Fs.Y(0))) drag = 'z'; else if (hit(p, Fs.X(sg), Fs.Y(om)) || hit(p, Fs.X(sg), Fs.Y(-om)) || (st.sys === 'real' && hit(p, Fs.X(sg), Fs.Y(0)))) drag = 'p'; else { drag = 'p'; move(e); } e.preventDefault(); }
  function move(e) { if (!drag) return; const p = S.pos(e), s = clamp(Fs.ix(p[0]), SR[0] + 0.05, SR[1] - 0.05), w = Math.abs(Fs.iy(p[1])); if (drag === 'z') zr = Math.abs(s) < 0.1 ? 0.1 : s; else { sg = s; om = clamp(w, st.sys === 'real' ? 0 : 0.05, IR[1] - 0.1); } draw(); e.preventDefault(); }
  S.c.addEventListener('mousedown', down); S.c.addEventListener('touchstart', down, { passive: false });
  addEventListener('mousemove', move); addEventListener('touchmove', move, { passive: false });
  addEventListener('mouseup', () => drag = null); addEventListener('touchend', () => drag = null);
  REDRAW.push(draw); draw();
};

/* Day 8: two masses, three springs — mode shapes and natural frequencies */
W.modes = el => {
  lab(el);
  const st = form(el, [{ k: 'm1', t: 'range', l: 'm₁', min: 0.5, max: 4, s: 0.1, v: 1, u: 'kg' }, { k: 'm2', t: 'range', l: 'm₂', min: 0.5, max: 4, s: 0.1, v: 1, u: 'kg' }, { k: 'k1', t: 'range', l: 'k₁', min: 0, max: 60, v: 20, u: 'N/m' }, { k: 'k2', t: 'range', l: 'k₂ (coupling)', min: 1, max: 60, v: 10, u: 'N/m' }, { k: 'k3', t: 'range', l: 'k₃', min: 0, max: 60, v: 20, u: 'N/m' },
    { k: 's', t: 'seg', l: 'Start', v: '1', o: [['1', 'mode 1'], ['2', 'mode 2'], ['p', 'pull m₁ only'], ['b', 'both +0.3']] }], () => { at = 0; draw(); });
  const M = canvas(el, 'wide', 'M·x″ + K·x = 0 with K = [[k₁+k₂, −k₂], [−k₂, k₂+k₃]]');
  const g = div(el, 'grid2'), A = canvas(g, 'plot', 'x₁(t) and x₂(t)'), B = canvas(g, 'plot', 'Mode shapes: how far each mass moves in each mode');
  const lg = div(el, 'legend'); legend(lg, [['', 'x₁(t) — mass 1'], ['o dash', 'x₂(t) — mass 2']]); const out = div(el, 'out');
  let at = 0, T = 10;
  function modes() {
    const { m1, m2, k1, k2, k3 } = st, K11 = k1 + k2, K22 = k2 + k3, a = m1 * m2, b = -(m1 * K22 + m2 * K11), c = K11 * K22 - k2 * k2, d = Math.sqrt(Math.max(b * b - 4 * a * c, 0));
    const L = [(-b - d) / (2 * a), (-b + d) / (2 * a)];
    return L.map(l => { let v = [1, (K11 - l * m1) / k2]; const s = Math.max(Math.abs(v[0]), Math.abs(v[1])); v = v.map(q => q / s); return { w: Math.sqrt(Math.max(l, 0)), v }; });
  }
  function draw() {
    const k = C(), Md = modes(), x0 = st.s === '1' ? Md[0].v.map(v => 0.4 * v) : st.s === '2' ? Md[1].v.map(v => 0.4 * v) : st.s === 'p' ? [0.4, 0] : [0.3, 0.3];
    const det = Md[0].v[0] * Md[1].v[1] - Md[1].v[0] * Md[0].v[1], q = [(x0[0] * Md[1].v[1] - Md[1].v[0] * x0[1]) / det, (Md[0].v[0] * x0[1] - x0[0] * Md[0].v[1]) / det];
    const X = t => [0, 1].map(i => q[0] * Math.cos(Md[0].w * t) * Md[0].v[i] + q[1] * Math.cos(Md[1].w * t) * Md[1].v[i]);
    T = Math.max(6, Math.min(30, 6 * 2 * PI / Math.max(Md[0].w, 0.2)));
    M.fit(); A.fit(); B.fit();
    const x = M.ctx, W = M.w, H = M.h, mid = H * 0.55, xl = W * 0.06, xr = W * 0.94, p = X(at), sc = W * 0.13, c1 = W * 0.36 + p[0] * sc, c2 = W * 0.64 + p[1] * sc, bw = 56;
    x.fillStyle = k.card; x.fillRect(0, 0, W, H); wall(x, xl, mid - 45, mid + 45, k.ink); wall(x, xr, mid - 45, mid + 45, k.ink);
    if (st.k1 > 0) spring(x, xl, c1 - bw / 2, mid, 7, 9, k.pri); spring(x, c1 + bw / 2, c2 - bw / 2, mid, 7, 9, k.acc2); if (st.k3 > 0) spring(x, c2 + bw / 2, xr, mid, 7, 9, k.pri);
    block(x, c1, mid, bw, bw, k.bg, k.pri, 'm₁'); block(x, c2, mid, bw, bw, k.bg, k.acc2, 'm₂');
    x.fillStyle = k.ink; x.font = '600 13px Inter,sans-serif'; x.textAlign = 'center'; x.fillText(`t = ${fmt(at, 2)} s`, W / 2, 18);
    const s = sol => lin(0, T, 600).map(t => [t, X(t)[sol]]), F = frame(A, [0, T], [-0.65, 0.65], { xl: 't, s' }); F.clip();
    line(F, s(0), { c: k.pri, w: 3.2 }); line(F, s(1), { c: k.acc, w: 2.4, dash: [8, 5] }); dot(F, at, p[0], 5, k.pri); dot(F, at, p[1], 5, k.acc); F.unclip();
    const G = frame(B, [0, 3], [-1.25, 1.25], { xl: '', nx: 1 }); G.clip();
    Md.forEach((m, i) => { const xc = i === 0 ? 0.9 : 2.1; [0, 1].forEach(j => { const xx = xc + (j - 0.5) * 0.5; G.x.fillStyle = j ? k.acc : k.pri; const y0 = G.Y(0), y1 = G.Y(m.v[j]); G.x.fillRect(G.X(xx) - 16, Math.min(y0, y1), 32, Math.abs(y1 - y0)); }); line(G, [[xc - 0.25, m.v[0]], [xc + 0.25, m.v[1]]], { c: k.ink, w: 1.6, dash: [3, 4] }); label(G, xc, 1.12, `mode ${i + 1}: ${fmt(m.w, 2)} rad/s`, k.ink, 'center'); label(G, xc, -1.12, m.v[0] * m.v[1] > 0 ? 'in phase' : 'opposite', k.soft, 'center', 0, 8); });
    G.unclip();
    out.textContent = `Natural frequencies ω₁ = ${fmt(Md[0].w, 3)} rad/s (${fmt(Md[0].w / 2 / PI, 3)} Hz),  ω₂ = ${fmt(Md[1].w, 3)} rad/s (${fmt(Md[1].w / 2 / PI, 3)} Hz)\nMode shapes φ₁ = [${fmt(Md[0].v[0], 3)}, ${fmt(Md[0].v[1], 3)}],  φ₂ = [${fmt(Md[1].v[0], 3)}, ${fmt(Md[1].v[1], 3)}]\nThis start = ${fmt(q[0], 3)}·φ₁ ${sgnf(q[1], 3)}·φ₂  →  x(t) = q₁·cos(ω₁t)·φ₁ + q₂·cos(ω₂t)·φ₂\n` + (st.s === 'p' ? 'Pulling one mass excites BOTH modes, so the motion is not periodic unless ω₂/ω₁ is rational. With weak coupling k₂ you will see energy swap between the masses.' : 'Start in a pure mode shape and every mass moves at ONE frequency, in step, for ever: that is what a mode is.');
  }
  anim(el, dt => { at += dt; if (at > T) at = 0; draw(); });
  REDRAW.push(draw); draw();
};

/* Day 9: phase portrait of x′ = A·x and the trace–determinant map */
const LIN_P = [['saddle', [1, 1, 4, -2]], ['stable node', [-2, 1, 0, -1]], ['spiral sink', [-0.5, -2, 2, -0.5]], ['centre', [0, -1, 1.5, 0]], ['spiral source', [0.3, -2, 2, 0.3]], ['unstable node', [1.5, 0.5, 0.5, 1]], ['degenerate (repeated λ)', [-1, 1, 0, -1]], ['line of equilibria (det = 0)', [-1, 2, -0.5, 1]]];
function classify(tr, det) {
  if (Math.abs(det) < 1e-9) return 'line of equilibria (one eigenvalue is zero)';
  if (det < 0) return 'saddle — unstable';
  const d = tr * tr - 4 * det;
  if (Math.abs(tr) < 1e-9) return 'centre — closed orbits (neutrally stable)';
  if (Math.abs(d) < 1e-9) return tr < 0 ? 'degenerate / star node — stable' : 'degenerate / star node — unstable';
  if (d < 0) return tr < 0 ? 'spiral sink — stable focus' : 'spiral source — unstable focus';
  return tr < 0 ? 'stable node' : 'unstable node';
}
function particles(n, xr, yr, seed) { const r = rng(seed || 7), P = []; for (let i = 0; i < n; i++) P.push([xr[0] + r() * (xr[1] - xr[0]), yr[0] + r() * (yr[1] - yr[0]), r() * 4]); P.r = r; return P; }
function fieldArrows(F, f, n, col) {
  const sx = (F.W - F.L - F.R) / n, ny = Math.round((F.H - F.T - F.B) / sx), x = F.x; x.strokeStyle = col; x.fillStyle = col; x.lineWidth = 1.3;
  for (let i = 0; i < n; i++) for (let j = 0; j < ny; j++) {
    const px = F.L + (i + 0.5) * sx, py = F.T + (j + 0.5) * sx; let v; try { v = f(0, [F.ix(px), F.iy(py)]); } catch (e) { continue; }
    const dx = v[0] / (F.xr[1] - F.xr[0]), dy = -v[1] / (F.yr[1] - F.yr[0]), m = Math.hypot(dx, dy); if (!(m > 1e-12)) continue;
    const L = sx * 0.7, ux = dx / m, uy = dy / m; x.beginPath(); x.moveTo(px - ux * L / 2, py - uy * L / 2); x.lineTo(px + ux * L / 2, py + uy * L / 2); x.stroke(); arrowHead(x, px + ux * L / 2, py + uy * L / 2, Math.atan2(uy, ux), 5, col);
  }
}
W.linphase = el => {
  lab(el);
  const st = form(el, [{ k: 'pr', t: 'sel', l: 'Preset', v: '2', o: LIN_P.map((p, i) => [i, p[0]]) }], () => { const v = LIN_P[+st.pr][1];['a', 'b', 'c', 'd'].forEach((n, i) => { m[n] = v[i]; m._el[n].value = v[i]; m._el[n]._show(); }); trajs = []; draw(); });
  const m = form(el, [{ k: 'a', t: 'range', l: 'a', min: -3, max: 3, s: 0.1, v: -0.5 }, { k: 'b', t: 'range', l: 'b', min: -3, max: 3, s: 0.1, v: -2 }, { k: 'c', t: 'range', l: 'c', min: -3, max: 3, s: 0.1, v: 2 }, { k: 'd', t: 'range', l: 'd', min: -3, max: 3, s: 0.1, v: -0.5 }], () => { trajs = []; draw(); });
  const g = div(el, 'grid2'), A = canvas(g, 'sq', 'x′ = a·x + b·y,  y′ = c·x + d·y. Click to add a trajectory; Play to let the flow move.'), B = canvas(g, 'sq', 'Trace–determinant map: where this matrix sits');
  const lg = div(el, 'legend'); legend(lg, [['', 'trajectories'], ['o dash', 'eigenvector directions (straight-line solutions)']]); const out = div(el, 'out');
  const R = [-3, 3]; let trajs = [], P = particles(140, R, R), Fa = null;
  const f = (t, y) => [m.a * y[0] + m.b * y[1], m.c * y[0] + m.d * y[1]];
  const traj = (x0, y0) => { const stop = (t, y) => Math.hypot(y[0], y[1]) > 12; return solve(f, 0, [x0, y0], -8, -0.02, stop).reverse().concat(solve(f, 0, [x0, y0], 8, 0.02, stop).slice(1)); };
  A.c.addEventListener('click', e => { if (!Fa) return; const p = A.pos(e); trajs.push(traj(Fa.ix(p[0]), Fa.iy(p[1]))); if (trajs.length > 12) trajs.shift(); draw(); });
  function draw() {
    const k = C(); A.fit(); B.fit(); const F = Fa = frame(A, R, R, { xl: 'x', yl: 'y' }); fieldArrows(F, f, 19, k.field); F.clip();
    const tr = m.a + m.d, det = m.a * m.d - m.b * m.c, ev = eig2(m.a, m.b, m.c, m.d);
    if (ev[0][1] === 0) ev.forEach(l => { let v = Math.abs(m.b) > 1e-9 ? [m.b, l[0] - m.a] : Math.abs(m.c) > 1e-9 ? [l[0] - m.d, m.c] : (Math.abs(l[0] - m.a) < 1e-9 ? [1, 0] : [0, 1]); const s = 10 / Math.hypot(...v); line(F, [[-v[0] * s, -v[1] * s], [v[0] * s, v[1] * s]], { c: k.acc, w: 2.4, dash: [9, 6] }); });
    const base = []; for (let i = 0; i < 10; i++) base.push(traj(2.7 * Math.cos(i * PI / 5 + 0.2), 2.7 * Math.sin(i * PI / 5 + 0.2)));
    base.forEach(t => line(F, t.map(p => [p[1], p[2]]), { c: k.soft, w: 1.5 })); trajs.forEach(t => line(F, t.map(p => [p[1], p[2]]), { c: k.pri, w: 2.8 }));
    F.x.fillStyle = k.pri; P.forEach(p => { F.x.globalAlpha = Math.min(1, p[2]) * 0.9; F.x.beginPath(); F.x.arc(F.X(p[0]), F.Y(p[1]), 2.6, 0, 2 * PI); F.x.fill(); }); F.x.globalAlpha = 1;
    dot(F, 0, 0, 6, k.ink); F.unclip();
    const G = frame(B, [-6, 6], [-6, 9], { xl: 'trace τ = a + d', yl: 'determinant Δ = ad − bc' }); G.clip();
    line(G, lin(-6, 6, 200).map(t => [t, t * t / 4]), { c: k.acc, w: 2.4, dash: [8, 5] });
    G.x.fillStyle = 'rgba(31,95,191,.08)'; G.x.fillRect(G.X(-6), G.T, G.X(0) - G.X(-6), G.Y(0) - G.T);
    [[-5.8, 2.6, 'stable node'], [3.6, 1.2, 'unstable node'], [-2.6, 6.2, 'spiral sink'], [0.5, 6.2, 'spiral source'], [-1.1, -3, 'saddle'], [-0.55, 8.4, 'centre ↓']].forEach(l => label(G, l[0], l[1], l[2], k.soft, 'left'));
    label(G, 3.1, 3.2, 'Δ = τ²/4', k.acc2, 'left');
    dot(G, clamp(tr, -6, 6), clamp(det, -6, 9), 8, k.pri); G.unclip();
    out.textContent = `A = [[${fmt(m.a, 1)}, ${fmt(m.b, 1)}], [${fmt(m.c, 1)}, ${fmt(m.d, 1)}]]    trace τ = ${fmt(tr, 2)}, determinant Δ = ${fmt(det, 2)}, τ² − 4Δ = ${fmt(tr * tr - 4 * det, 2)}\nEigenvalues λ = ${cstr(ev[0])},  ${cstr(ev[1])}  →  ${classify(tr, det)}\n` + (ev[0][1] === 0 ? `Real eigenvalues: solutions are c₁·e^(λ₁t)·v₁ + c₂·e^(λ₂t)·v₂ — straight-line motion along each eigenvector (dashed).` : `Complex eigenvalues α ± βi: everything rotates at β = ${fmt(Math.abs(ev[0][1]), 3)} rad/s while growing or shrinking like e^(αt), α = ${fmt(ev[0][0], 3)}.`);
  }
  anim(el, dt => { P.forEach(p => { const v = f(0, p); p[0] += v[0] * dt * 0.6; p[1] += v[1] * dt * 0.6; p[2] -= dt * 0.35; if (p[2] <= 0 || Math.abs(p[0]) > 3.2 || Math.abs(p[1]) > 3.2) { p[0] = R[0] + P.r() * 6; p[1] = R[0] + P.r() * 6; p[2] = 1 + P.r() * 3; } }); draw(); }, { stepN: 30 });
  REDRAW.push(draw); draw();
};

/* Day 10: nonlinear phase plane — nullclines, equilibria (classified from the Jacobian), flow and time series */
const NL = [
  ['Damped pendulum: θ′ = ω, ω′ = −sin θ − p·ω', 'y', '-sin(x) - p*y', [-7, 7], [-4, 4], [0, 1.5], 0.25, ['θ', 'ω'], [[0, 2.2], [-6.2, 3.5], [0, 1.2]]],
  ['Predator–prey: x′ = x − 0.5xy, y′ = 0.25xy − p·y', 'x - 0.5*x*y', '0.25*x*y - p*y', [0, 10], [0, 6], [0.2, 1.6], 0.75, ['prey x', 'predator y'], [[1, 1], [5, 3], [2, 4.5]]],
  ['Van der Pol: x′ = y, y′ = p(1 − x²)y − x', 'y', 'p*(1-x^2)*y - x', [-4, 4], [-6, 6], [0, 4], 1, ['x', 'y'], [[0.1, 0], [3.5, 4]]],
  ['Duffing double well: x′ = y, y′ = x − x³ − p·y', 'y', 'x - x^3 - p*y', [-2, 2], [-1.6, 1.6], [0, 1], 0.2, ['x', 'v'], [[-1.9, 0.9], [0.1, 0.05], [1.9, -0.5]]],
  ['Competing species: x′ = x(3 − x − p·y), y′ = y(2 − x − y)', 'x*(3 - x - p*y)', 'y*(2 - x - y)', [0, 3.6], [0, 3], [0.5, 3], 2, ['rabbits x', 'sheep y'], [[0.5, 0.4], [3, 2.5], [0.2, 2.8]]],
  ['Epidemic SIR: S′ = −p·S·I, I′ = p·S·I − 0.1·I', '-p*x*y', 'p*x*y - 0.1*y', [0, 1], [0, 0.6], [0.05, 0.6], 0.3, ['susceptible S', 'infected I'], [[0.99, 0.01], [0.8, 0.02]]]
];
function equilibria(f, xr, yr) {
  const E = [];
  for (let i = 0; i <= 14; i++) for (let j = 0; j <= 14; j++) {
    let p = [xr[0] + (xr[1] - xr[0]) * i / 14, yr[0] + (yr[1] - yr[0]) * j / 14];
    for (let it = 0; it < 40; it++) { const J = jac(f, p), v = f(0, p), d = J[0] * J[3] - J[1] * J[2]; if (!Number.isFinite(d) || Math.abs(d) < 1e-12) break; const dx = (J[3] * v[0] - J[1] * v[1]) / d, dy = (-J[2] * v[0] + J[0] * v[1]) / d; p = [p[0] - dx, p[1] - dy]; if (Math.hypot(dx, dy) < 1e-11) break; }
    const v = f(0, p); if (!(Math.hypot(v[0], v[1]) < 1e-7)) continue;
    const ex = (xr[1] - xr[0]) * 0.02; if (p[0] < xr[0] - ex || p[0] > xr[1] + ex || p[1] < yr[0] - ex || p[1] > yr[1] + ex) continue;
    if (!E.some(e => Math.hypot(e[0] - p[0], e[1] - p[1]) < 1e-4 * (xr[1] - xr[0] + 1))) E.push(p);
  }
  return E.map(p => { const J = jac(f, p), tr = J[0] + J[3], det = J[0] * J[3] - J[1] * J[2]; return { p, J, tr, det, ev: eig2(...J), type: classify(tr, det) }; });
}
function jac(f, p) { const h = 1e-6, a = f(0, [p[0] + h, p[1]]), b = f(0, [p[0] - h, p[1]]), c = f(0, [p[0], p[1] + h]), d = f(0, [p[0], p[1] - h]); return [(a[0] - b[0]) / 2 / h, (c[0] - d[0]) / 2 / h, (a[1] - b[1]) / 2 / h, (c[1] - d[1]) / 2 / h]; }
W.nonlin = el => {
  lab(el);
  const st = form(el, [{ k: 'm', t: 'sel', l: 'Model', v: '0', o: NL.map((m, i) => [i, m[0]]).concat([['c', 'Your own…']]) }, { k: 'nc', t: 'chk', l: 'nullclines', v: true }], k => { if (k === 'm') load(); draw(); });
  const er = div(el, 'ctl'); er.innerHTML = `<label>x′ = <input class="expr" type="text"></label><label>y′ = <input class="expr" type="text"></label>`; const [ex, ey] = $$('input', er);
  const pc = div(el, 'ctl'); pc.innerHTML = '<label>parameter p <input type="range"> <b class="mono"></b></label>'; const ps = $('input', pc), pb = $('b', pc), msg = div(el, 'hint');
  const g = div(el, 'grid2'), A = canvas(g, 'sq', 'Phase plane: click to launch a trajectory; Play to watch the flow.'), B = canvas(g, 'plot', 'The last trajectory in time');
  const lg = div(el, 'legend'); legend(lg, [['', 'trajectory / x(t)'], ['o dash', 'y(t)'], ['dash', 'x-nullcline (x′ = 0)'], ['o', 'y-nullcline (y′ = 0)']]); const out = div(el, 'out');
  let M = NL[0], xr = M[3], yr = M[4], p = M[6], f = null, trajs = [], P = [], Fa = null;
  function build() { try { const fx = compile(ex.value, ['x', 'y', 'p']), fy = compile(ey.value, ['x', 'y', 'p']); f = (t, v) => [fx(v[0], v[1], p), fy(v[0], v[1], p)]; ex.classList.remove('err'); ey.classList.remove('err'); msg.textContent = ''; } catch (e) { ex.classList.add('err'); ey.classList.add('err'); msg.textContent = 'Cannot read that: ' + e.message; } }
  function load() { if (st.m === 'c') { ex.focus(); return; } M = NL[+st.m]; ex.value = M[1]; ey.value = M[2]; xr = M[3]; yr = M[4]; ps.min = M[5][0]; ps.max = M[5][1]; ps.step = (M[5][1] - M[5][0]) / 200; ps.value = p = M[6]; pb.textContent = fmt(p, 3); build(); trajs = M[8].map(s => traj(s[0], s[1])); P = particles(160, xr, yr); }
  const span = () => Math.max(xr[1] - xr[0], yr[1] - yr[0]);
  function traj(x0, y0) { if (!f) return []; const big = span() * 3, stop = (t, y) => Math.abs(y[0] - (xr[0] + xr[1]) / 2) > big || Math.abs(y[1] - (yr[0] + yr[1]) / 2) > big; return solve(f, 0, [x0, y0], 60, 0.02, stop); }
  ps.oninput = () => { p = +ps.value; pb.textContent = fmt(p, 3); trajs = trajs.map(t => traj(t[0][1], t[0][2])); draw(); };
  [ex, ey].forEach(i => i.onchange = () => { build(); st._el.m.value = 'c'; st.m = 'c'; trajs = trajs.map(t => traj(t[0][1], t[0][2])); draw(); });
  A.c.addEventListener('click', e => { if (!Fa) return; const q = A.pos(e); trajs.push(traj(Fa.ix(q[0]), Fa.iy(q[1]))); if (trajs.length > 10) trajs.shift(); draw(); });
  function draw() {
    const k = C(); A.fit(); B.fit(); const F = Fa = frame(A, xr, yr, { xl: M[7][0], yl: M[7][1] }); if (!f) return;
    fieldArrows(F, f, 20, k.field); F.clip();
    if (st.nc) { contour(F, (x, y) => f(0, [x, y])[0], 110, { c: k.pri, w: 2, dash: [3, 4] }); contour(F, (x, y) => f(0, [x, y])[1], 110, { c: k.acc, w: 2, dash: [10, 5] }); }
    trajs.forEach((t, i) => line(F, t.map(q => [q[1], q[2]]), { c: i === trajs.length - 1 ? k.pri : k.ink, w: i === trajs.length - 1 ? 3 : 1.6 }));
    trajs.forEach(t => t.length && dot(F, t[0][1], t[0][2], 4, k.ink));
    F.x.fillStyle = k.pri; P.forEach(q => { F.x.globalAlpha = Math.min(1, q[2]) * 0.85; F.x.beginPath(); F.x.arc(F.X(q[0]), F.Y(q[1]), 2.4, 0, 2 * PI); F.x.fill(); }); F.x.globalAlpha = 1;
    const E = equilibria(f, xr, yr);
    E.forEach(e => { const s = /stable|sink/.test(e.type) && !/unstable/.test(e.type), sad = /saddle/.test(e.type); if (sad) { F.x.strokeStyle = k.acc2; F.x.lineWidth = 3; const X = F.X(e.p[0]), Y = F.Y(e.p[1]); F.x.beginPath(); F.x.moveTo(X - 7, Y - 7); F.x.lineTo(X + 7, Y + 7); F.x.moveTo(X + 7, Y - 7); F.x.lineTo(X - 7, Y + 7); F.x.stroke(); } else dot(F, e.p[0], e.p[1], 7, s ? k.pri : k.card, s ? k.card : (/centre/.test(e.type) ? k.ink : k.acc)); });
    F.unclip();
    const t = trajs[trajs.length - 1] || [], T = t.length ? t[t.length - 1][0] : 1, vals = t.flatMap(q => [q[1], q[2]]), lo = Math.min(...vals, 0), hi = Math.max(...vals, 1e-3), pad = (hi - lo) * 0.08 || 1;
    const G = frame(B, [0, T], [lo - pad, hi + pad], { xl: 't' }); G.clip(); line(G, t.map(q => [q[0], q[2]]), { c: k.acc, w: 2.2, dash: [8, 5] }); line(G, t.map(q => [q[0], q[1]]), { c: k.pri, w: 2.6 }); G.unclip();
    out.textContent = (E.length ? E.map(e => `(${fmt(e.p[0], 3)}, ${fmt(e.p[1], 3)}): J = [[${fmt(e.J[0], 2)}, ${fmt(e.J[1], 2)}], [${fmt(e.J[2], 2)}, ${fmt(e.J[3], 2)}]], λ = ${cstr(e.ev[0])}, ${cstr(e.ev[1])} → ${e.type}`).join('\n') : 'No equilibrium inside this window.') +
      (st.m === '2' ? `\nVan der Pol: the origin is unstable for p > 0, yet nothing escapes — every trajectory is drawn onto one closed loop, the limit cycle. Linearisation cannot see it.` : st.m === '1' ? `\nLotka–Volterra: the centre is only "neutral" in the linear sense; here the nonlinear terms keep the orbits closed (a conserved quantity exists).` : st.m === '0' ? `\nPendulum: equilibria at θ = 0, ±2π (hanging, stable) and ±π (inverted, saddles). Lower p to zero to see the separatrix between swinging and spinning.` : '');
  }
  anim(el, dt => { if (!f) return; const sx = (xr[1] - xr[0]), sy = (yr[1] - yr[0]); P.forEach(q => { const v = f(0, q); if (Number.isFinite(v[0]) && Number.isFinite(v[1])) { const s = Math.min(1, 0.15 * span() / (Math.hypot(v[0] / sx, v[1] / sy) * span() + 1e-9)); q[0] += v[0] * dt * s; q[1] += v[1] * dt * s; } q[2] -= dt * 0.3; if (q[2] <= 0 || q[0] < xr[0] || q[0] > xr[1] || q[1] < yr[0] || q[1] > yr[1]) { q[0] = xr[0] + P.r() * sx; q[1] = yr[0] + P.r() * sy; q[2] = 1 + P.r() * 3; } }); draw(); }, { stepN: 30 });
  REDRAW.push(draw); load(); draw();
};

/* ================= WEEK 3 LABS ================= */

/* Day 11: Lorenz attractor — two runs that start 10⁻⁸ apart */
W.lorenz = el => {
  lab(el);
  const st = form(el, [{ k: 'rho', t: 'range', l: 'ρ (heating)', min: 0.5, max: 40, s: 0.1, v: 28 }, { k: 'e', t: 'range', l: 'second start offset 10^', min: -12, max: -1, v: -8 }], () => restart());
  const bar = div(el, 'ctl'); bar.innerHTML = '<button type="button">↺ Restart</button>'; $('button', bar).onclick = () => restart();
  const g = div(el, 'grid2'), A = canvas(g, 'sq', 'x′ = σ(y − x), y′ = x(ρ − z) − y, z′ = xy − βz   (σ = 10, β = 8/3). Drag to turn it.'), R = div(g), B = canvas(R, 'plot', 'x(t) of both runs'), D = canvas(R, 'plot', 'log₁₀ of the distance between them');
  const lg = div(el, 'legend'); legend(lg, [['', 'run 1'], ['o dash', 'run 2 (started 10⁻⁸ away)'], ['k dash', 'slope of λ ≈ 0.906 per unit time']]); const out = div(el, 'out');
  const sg = 10, be = 8 / 3; let a, b, t, ha, hb, hd, yaw = 0.6, pit = 0.25, drag = null;
  const f = (tt, v) => [sg * (v[1] - v[0]), v[0] * (st.rho - v[2]) - v[1], v[0] * v[1] - be * v[2]];
  function restart() { a = [1, 1, 1]; b = [1 + Math.pow(10, st.e), 1, 1]; t = 0; ha = []; hb = []; hd = [[0, st.e]]; for (let i = 0; i < 3600; i++) adv(); draw(); }
  function adv() { const h = 0.005; a = rk4(f, t, a, h); b = rk4(f, t, b, h); t += h; if (t > 1) { ha.push([t, ...a]); hb.push([t, ...b]); } const d = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]); hd.push([t, Math.log10(Math.max(d, 1e-16))]); if (ha.length > 6000) { ha.shift(); hb.shift(); } if (hd.length > 6000) hd.shift(); }
  function proj(v, F) { const zc = Math.max(st.rho - 1, 1), X = v[0] * Math.cos(yaw) - v[1] * Math.sin(yaw), Y = v[0] * Math.sin(yaw) + v[1] * Math.cos(yaw), Z = v[2] - zc; return [F.w / 2 + X * F.s, F.h / 2 - (Z * Math.cos(pit) - Y * Math.sin(pit)) * F.s]; }
  function draw() {
    const k = C(); A.fit(); B.fit(); D.fit(); const x = A.ctx, F = { w: A.w, h: A.h, s: A.w / 62 };
    x.fillStyle = k.card; x.fillRect(0, 0, A.w, A.h);
    [[0, k.rule], [1, k.rule], [2, k.rule]].forEach((ax, i) => { const e = [0, 0, 0], o = [0, 0, Math.max(st.rho - 1, 1)]; e[i] = 15; const p0 = proj(o, F), p1 = proj([o[0] + e[0], o[1] + e[1], o[2] + e[2]], F); x.strokeStyle = k.soft; x.lineWidth = 1; x.beginPath(); x.moveTo(...p0); x.lineTo(...p1); x.stroke(); x.fillStyle = k.soft; x.font = '12px Inter,sans-serif'; x.fillText('xyz'[i], p1[0] + 3, p1[1]); });
    const path = (H, col, w, dash) => { x.strokeStyle = col; x.lineWidth = w; x.setLineDash(dash || []); x.beginPath(); H.forEach((v, i) => { const p = proj(v.slice(1), F); i ? x.lineTo(...p) : x.moveTo(...p); }); x.stroke(); x.setLineDash([]); };
    path(ha, k.pri, 1.4); path(hb.slice(-1500), k.acc, 1.6, [6, 4]);
    const pa = proj(a, F), pb = proj(b, F); x.fillStyle = k.pri; x.beginPath(); x.arc(...pa, 6, 0, 2 * PI); x.fill(); x.fillStyle = k.acc; x.beginPath(); x.arc(...pb, 5, 0, 2 * PI); x.fill();
    const tw = 25, t0 = Math.max(0, t - tw), G = frame(B, [t0, t0 + tw], [-25, 25], { xl: 't' });
    G.clip(); line(G, ha.filter(v => v[0] >= t0).map(v => [v[0], v[1]]), { c: k.pri, w: 2 }); line(G, hb.filter(v => v[0] >= t0).map(v => [v[0], v[1]]), { c: k.acc, w: 2, dash: [7, 4] }); G.unclip();
    const H = frame(D, [Math.max(0, t - 50), Math.max(50, t)], [-16, 2], { xl: 't', yl: 'log₁₀ |Δ|' }); H.clip();
    line(H, hd.filter((p, i) => i % 3 === 0), { c: k.pri, w: 2 }); line(H, [[0, st.e], [40, st.e + 0.906 * 40 / Math.LN10]], { c: k.ink, w: 1.3, dash: [3, 4] }); H.unclip();
    const d = Math.pow(10, hd[hd.length - 1][1]);
    out.textContent = `t = ${fmt(t, 1)}   run 1 = (${fmt(a[0], 2)}, ${fmt(a[1], 2)}, ${fmt(a[2], 2)})   distance between runs = ${d.toExponential(2)}\n` + (st.rho < 1 ? 'ρ < 1: everything decays to the origin (no convection).' : st.rho < 24.06 ? `ρ = ${fmt(st.rho, 1)}: the two convection states C± = (±${fmt(Math.sqrt(be * (st.rho - 1)), 2)}, ±${fmt(Math.sqrt(be * (st.rho - 1)), 2)}, ${fmt(st.rho - 1, 1)}) are stable — runs settle and the distance shrinks.` : `ρ = ${fmt(st.rho, 1)} > 24.74: chaos. The distance grows like e^(0.9·t) — 10⁻⁸ becomes order 1 after about ${fmt((0 - st.e) * Math.LN10 / 0.906, 0)} time units — yet both stay on the same butterfly.`);
  }
  const dn = e => { drag = A.pos(e); e.preventDefault(); }, mv = e => { if (!drag) return; const p = A.pos(e); yaw += (p[0] - drag[0]) * 0.01; pit = clamp(pit + (p[1] - drag[1]) * 0.01, -1.4, 1.4); drag = p; draw(); e.preventDefault(); };
  A.c.addEventListener('mousedown', dn); A.c.addEventListener('touchstart', dn, { passive: false }); addEventListener('mousemove', mv); addEventListener('touchmove', mv, { passive: false }); addEventListener('mouseup', () => drag = null); addEventListener('touchend', () => drag = null);
  anim(el, dt => { for (let i = 0; i < 4; i++) adv(); yaw += dt * 0.15; draw(); });
  REDRAW.push(draw); restart();
};

/* Day 11: forced Duffing oscillator — strobe it once per forcing period (Poincaré section) */
W.duffing = el => {
  lab(el);
  const st = form(el, [{ k: 'g', t: 'range', l: 'Forcing γ', min: 0.1, max: 0.65, s: 0.005, v: 0.5 }, { k: 'd', t: 'range', l: 'Damping δ', min: 0.1, max: 0.5, s: 0.01, v: 0.3 }], () => restart());
  const g = div(el, 'grid2'), A = canvas(g, 'sq', 'x″ + δ·x′ − x + x³ = γ·cos(1.2·t): the trajectory (grey) and the Poincaré dots'), B = canvas(g, 'plot', 'x(t), last 20 forcing periods');
  const out = div(el, 'out');
  const w = 1.2, Tp = 2 * PI / w, N = 100; let s, t, trail, pts, hist;
  const f = (tt, v) => [v[1], st.g * Math.cos(w * tt) - st.d * v[1] + v[0] - v[0] ** 3];
  function restart() { s = [0.1, 0]; t = 0; trail = []; pts = []; hist = []; for (let i = 0; i < 30; i++) period(false); for (let i = 0; i < 300; i++) period(true); draw(); }
  function period(keep) { const h = Tp / N; for (let i = 0; i < N; i++) { s = rk4(f, t, s, h); t += h; if (keep) { trail.push([s[0], s[1]]); hist.push([t, s[0]]); } } if (keep) pts.push([s[0], s[1]]); if (trail.length > 2500) trail.splice(0, trail.length - 2500); if (hist.length > 20 * N) hist.splice(0, hist.length - 20 * N); if (pts.length > 4000) pts.shift(); }
  function draw() {
    const k = C(); A.fit(); B.fit(); const F = frame(A, [-2, 2], [-1.6, 1.6], { xl: 'x', yl: 'x′' }); F.clip();
    line(F, trail.slice(-1200), { c: k.rule, w: 1 });
    F.x.fillStyle = k.pri; pts.forEach(p => { F.x.beginPath(); F.x.arc(F.X(p[0]), F.Y(p[1]), 1.9, 0, 2 * PI); F.x.fill(); });
    if (pts.length) dot(F, pts[pts.length - 1][0], pts[pts.length - 1][1], 6, k.acc); F.unclip();
    const t0 = hist.length ? hist[0][0] : 0, G = frame(B, [t0, t0 + 20 * Tp], [-2, 2], { xl: 't' }); G.clip(); line(G, hist, { c: k.pri, w: 2 }); G.unclip();
    const last = pts.slice(-64), uniq = []; last.forEach(p => { if (!uniq.some(q => Math.hypot(p[0] - q[0], p[1] - q[1]) < 0.01)) uniq.push(p); });
    out.textContent = `${pts.length} strobe points so far.  The last 64 fall on ${uniq.length < 17 ? uniq.length + ' distinct point(s) → period-' + uniq.length + ' motion' : 'many points → no repeating pattern: chaos (a strange attractor in the section)'}.\nTry γ = 0.20 (period 1), 0.28 (period 2), 0.29 (period 4), 0.37 (period 5), 0.50 (chaos), 0.65 (back to period 2). Damping δ = 0.3.`;
  }
  anim(el, () => { for (let i = 0; i < 4; i++) period(true); draw(); });
  REDRAW.push(draw); restart();
};

/* Day 12: Fourier series builder */
const FS = {
  sq: ['Square wave', n => n % 2 ? [0, 4 / (n * PI)] : [0, 0], 0, x => Math.sign(Math.sin(x))],
  saw: ['Sawtooth', n => [0, 2 * Math.pow(-1, n + 1) / (n * PI)], 0, x => { const u = ((x + PI) % (2 * PI) + 2 * PI) % (2 * PI) - PI; return u / PI; }],
  tri: ['Triangle', n => n % 2 ? [0, 8 / (PI * PI * n * n) * Math.pow(-1, (n - 1) / 2)] : [0, 0], 0, x => 2 / PI * Math.asin(Math.sin(x))],
  rect: ['Half-wave rectified sine', n => n === 1 ? [0, 0.5] : n % 2 === 0 ? [-2 / (PI * (n * n - 1)), 0] : [0, 0], 1 / PI, x => Math.max(0, Math.sin(x))]
};
W.fourier = el => {
  lab(el);
  const st = form(el, [{ k: 'w', t: 'sel', l: 'Wave', v: 'sq', o: Object.keys(FS).map(k => [k, FS[k][0]]) }, { k: 'n', t: 'range', l: 'Number of harmonics N', min: 1, max: 80, v: 5 }, { k: 'h', t: 'chk', l: 'show the separate harmonics', v: true }], () => draw());
  const g = div(el, 'grid2'), A = canvas(g, 'plot', 'Partial sum S_N(x) (blue) against the target (dashed)'), B = canvas(g, 'plot', 'Spectrum: amplitude of each harmonic');
  const out = div(el, 'out');
  function draw() {
    const k = C(), W0 = FS[st.w], N = st.n, xs = lin(-2 * PI, 2 * PI, 1200); A.fit(); B.fit();
    const S = x => { let s = W0[2]; for (let n = 1; n <= N; n++) { const c = W0[1](n); s += c[0] * Math.cos(n * x) + c[1] * Math.sin(n * x); } return s; };
    const F = frame(A, [-2 * PI, 2 * PI], [-1.4, 1.4], { xl: 'x' }); F.clip();
    if (st.h) for (let n = 1; n <= Math.min(N, 6); n++) { const c = W0[1](n); if (Math.hypot(...c) < 1e-9) continue; line(F, xs.map(x => [x, c[0] * Math.cos(n * x) + c[1] * Math.sin(n * x)]), { c: k.acc, w: 1.3 }); }
    line(F, xs.map(x => [x, W0[3](x)]), { c: k.ink, w: 1.6, dash: [5, 4] }); const sv = xs.map(x => [x, S(x)]); line(F, sv, { c: k.pri, w: 2.8 }); F.unclip();
    const M = 30, G = frame(B, [0, M + 1], [0, 1.35], { xl: 'harmonic n', yl: 'amplitude √(aₙ² + bₙ²)' }); G.clip();
    for (let n = 1; n <= M; n++) { const a = Math.hypot(...W0[1](n)); if (a < 1e-9) continue; G.x.strokeStyle = n <= N ? k.pri : k.rule; G.x.lineWidth = 5; G.x.beginPath(); G.x.moveTo(G.X(n), G.Y(0)); G.x.lineTo(G.X(n), G.Y(a)); G.x.stroke(); }
    G.unclip();
    const mx = Math.max(...sv.map(p => p[1])), err = Math.sqrt(xs.reduce((s, x) => s + (S(x) - W0[3](x)) ** 2, 0) / xs.length);
    out.textContent = `S_N(x) = a₀/2 + Σ (aₙ·cos nx + bₙ·sin nx), n = 1…${N}\nRMS error ${fmt(err, 4)}   ·   peak of S_N = ${fmt(mx, 4)}` + (st.w === 'sq' || st.w === 'saw' ? `\nGibbs: next to a jump the partial sum overshoots by about 9 % of the jump (here ${fmt((mx - 1) / 2 * 100, 1)} %) however many terms you add — the overshoot narrows but never shrinks.` : `\nNo jumps, so the coefficients fall like 1/n² and the series converges fast and everywhere — compare the spectrum with the square wave's 1/n.`);
  }
  anim(el, () => { st.n = st.n >= 80 ? 1 : st.n + 1; st._el.n.value = st.n; st._el.n._show(); draw(); }, { stepN: 1 });
  SW.anims[SW.anims.length - 1].play = (orig => function () { let last = 0; const c = this; c._on = true; const loop = t => { if (!c._on) return; if (t - last > 140) { last = t; st.n = st.n >= 80 ? 1 : st.n + 1; st._el.n.value = st.n; st._el.n._show(); draw(); } requestAnimationFrame(loop); }; requestAnimationFrame(loop); })();
  const ac = SW.anims[SW.anims.length - 1], op = ac.pause; ac.pause = () => { ac._on = false; op(); }; ac.step = () => { ac._on = false; st.n = st.n >= 80 ? 1 : st.n + 1; st._el.n.value = st.n; st._el.n._show(); draw(); };
  REDRAW.push(draw); draw();
};

/* Day 12: heat equation on a rod — profile, space-time map and decaying Fourier modes */
W.heat = el => {
  lab(el);
  const st = form(el, [{ k: 'ic', t: 'sel', l: 'Start', v: 'spike', o: [['spike', 'hot spot in the middle'], ['step', 'left half hot'], ['modes', 'sin πx + 0.5·sin 5πx'], ['rand', 'random']] }, { k: 'bc', t: 'sel', l: 'Ends', v: 'dir', o: [['dir', 'both held at 0'], ['neu', 'both insulated'], ['hot', 'left held at 1, right at 0']] }, { k: 'a', t: 'range', l: 'Diffusivity α', min: 0.2, max: 3, s: 0.1, v: 1 }], () => restart());
  const g = div(el, 'grid3'), A = canvas(g, 'plot', 'Temperature u(x, t) along the rod'), B = canvas(g, 'plot', 'Space–time map: x across, time upwards'), D = canvas(g, 'plot', 'Sine-series amplitudes bₙ(t) (outline: at t = 0)');
  cbar(el, 'cold', 'hot'); const out = div(el, 'out');
  const n = 101, dx = 1 / (n - 1); let u, u0, t, rows, tEnd, b0;
  const coef = (v, m) => { let s = 0; for (let i = 0; i < n; i++) s += (i === 0 || i === n - 1 ? 0.5 : 1) * v[i] * Math.sin(m * PI * i * dx); return 2 * s * dx; };
  function restart() {
    const r = rng(42); u = new Array(n).fill(0).map((_, i) => { const x = i * dx; return st.ic === 'spike' ? Math.exp(-(((x - 0.5) / 0.05) ** 2)) : st.ic === 'step' ? (x < 0.5 ? 1 : 0) : st.ic === 'modes' ? Math.sin(PI * x) + 0.5 * Math.sin(5 * PI * x) : r(); });
    bcs(); u0 = u.slice(); t = 0; rows = [u.slice()]; tEnd = 0.25 / st.a; b0 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(m => coef(u0, m)); while (t < 0.06 * tEnd) { adv(tEnd / 160); rows.push(u.slice()); } draw();
  }
  function bcs() { if (st.bc === 'dir') { u[0] = 0; u[n - 1] = 0; } else if (st.bc === 'hot') { u[0] = 1; u[n - 1] = 0; } else { u[0] = u[1]; u[n - 1] = u[n - 2]; } }
  function adv(T) { const dt = 0.4 * dx * dx / st.a; let k = 0; while (T > 1e-12 && k < 4000) { const h = Math.min(dt, T), r = st.a * h / dx / dx, v = u.slice(); for (let i = 1; i < n - 1; i++) v[i] = u[i] + r * (u[i - 1] - 2 * u[i] + u[i + 1]); u = v; bcs(); T -= h; t += h; k++; } }
  function draw() {
    const k = C(); A.fit(); B.fit(); D.fit(); const xs = u.map((_, i) => i * dx);
    const F = frame(A, [0, 1], [-0.6, 1.2], { xl: 'x', yl: 'u' }); F.clip(); line(F, u0.map((v, i) => [xs[i], v]), { c: k.ink, w: 1.4, dash: [4, 4] }); line(F, u.map((v, i) => [xs[i], v]), { c: k.pri, w: 3 }); F.unclip();
    const G = frame(B, [0, 1], [0, tEnd], { xl: 'x', yl: 't' }); if (rows.length > 1) { const pad = rows.slice(); heatRows(G, pad, Math.round(160 * Math.min(1, t / tEnd)) || 1); }
    const H = frame(D, [0, 11], [-1.2, 1.2], { xl: 'mode n', yl: 'bₙ' }); H.clip();
    for (let m = 1; m <= 10; m++) { const b = coef(u, m); H.x.fillStyle = k.pri; const y0 = H.Y(0), y1 = H.Y(b); H.x.fillRect(H.X(m) - 9, Math.min(y0, y1), 18, Math.abs(y1 - y0)); H.x.strokeStyle = k.acc; H.x.lineWidth = 1.6; H.x.strokeRect(H.X(m) - 12, Math.min(y0, H.Y(b0[m - 1])), 24, Math.abs(H.Y(b0[m - 1]) - y0)); }
    H.unclip();
    const b1 = coef(u, 1), b5 = coef(u, 5);
    out.textContent = `t = ${fmt(t, 4)}   (u_t = α·u_xx, α = ${st.a})\n` + (st.bc === 'dir' ? `Each sine mode decays on its own: bₙ(t) = bₙ(0)·e^(−α·n²·π²·t). Mode 1 now ${fmt(b1, 4)}, mode 5 ${fmt(b5, 4)} — mode 5 dies 25× faster, so sharp detail vanishes first.` : st.bc === 'neu' ? 'Insulated ends: no heat leaves, so the average temperature never changes — the rod flattens to that average.' : 'Fixed end temperatures: the rod settles to the straight line u = 1 − x, the steady state where u_xx = 0.');
  }
  function heatRows(G, R, m) { const ny = R.length, A2 = []; for (let j = 0; j < ny; j++) A2.push(R[j].filter((_, i) => i % 2 === 0)); const full = A2.concat(new Array(Math.max(0, 160 - ny)).fill(null).map(() => new Array(A2[0].length).fill(NaN))); G.x.save(); heat(G, full, -0.3, 1); G.x.restore(); }
  anim(el, dt => { if (t >= tEnd) return; adv(tEnd / 8 * dt); if (rows.length < 160 && t >= rows.length * tEnd / 160) rows.push(u.slice()); draw(); });
  REDRAW.push(draw); restart();
};

/* Day 13: the vibrating string — d'Alembert's two travelling halves and the harmonics */
W.wave = el => {
  lab(el);
  const st = form(el, [{ k: 'ic', t: 'sel', l: 'Start', v: 'pluck', o: [['pluck', 'plucked (triangle)'], ['bump', 'small bump'], ['mode', 'pure mode n'], ['hit', 'struck (velocity)']] }, { k: 'p', t: 'range', l: 'Position', min: 0.05, max: 0.95, s: 0.01, v: 0.3 }, { k: 'n', t: 'range', l: 'Mode n', min: 1, max: 8, v: 2 }, { k: 'dmp', t: 'range', l: 'Damping', min: 0, max: 2, s: 0.05, v: 0 }, { k: 'dal', t: 'chk', l: "show d'Alembert halves", v: true }], () => restart());
  const g = div(el, 'grid3'), A = canvas(g, 'plot', 'The string u(x, t)'), B = canvas(g, 'plot', 'Space–time map: the two waves cross and reflect'), D = canvas(g, 'plot', 'Harmonic content |bₙ| — which tones the string sounds');
  const lg = div(el, 'legend'); legend(lg, [['', 'string'], ['o dash', 'right-moving half'], ['k dash', 'left-moving half']]); const out = div(el, 'out');
  const N = 201, dx = 1 / (N - 1), c = 1, dt = 0.9 * dx / c; let u, up, t, F0, rows, bn;
  const ext = x => { const y = ((x % 2) + 2) % 2; return y <= 1 ? F0(y) : -F0(2 - y); };
  function restart() {
    const p = st.p, nn = st.n;
    F0 = st.ic === 'pluck' ? x => (x < p ? x / p : (1 - x) / (1 - p)) * 0.8 : st.ic === 'bump' ? x => 0.8 * Math.exp(-(((x - p) / 0.04) ** 2)) : st.ic === 'mode' ? x => 0.8 * Math.sin(nn * PI * x) : () => 0;
    const V = st.ic === 'hit' ? x => 6 * Math.exp(-(((x - p) / 0.03) ** 2)) : () => 0;
    u = new Array(N).fill(0).map((_, i) => F0(i * dx)); u[0] = u[N - 1] = 0;
    const r2 = (c * dt / dx) ** 2; up = u.map((v, i) => i === 0 || i === N - 1 ? 0 : v - dt * V(i * dx) + 0.5 * r2 * (u[i - 1] - 2 * v + u[i + 1]));
    t = 0; rows = [u.slice()];
    bn = []; for (let m = 1; m <= 16; m++) { let a = 0, b = 0; for (let i = 0; i < N; i++) { const w = (i === 0 || i === N - 1 ? 0.5 : 1) * Math.sin(m * PI * i * dx) * dx * 2; a += F0(i * dx) * w; b += V(i * dx) * w / (m * PI * c); } bn.push(Math.hypot(a, b)); }
    adv(2); draw();
  }
  function adv(T) { const r2 = (c * dt / dx) ** 2, g = st.dmp * dt / 2; while (T > 0) { const un = new Array(N).fill(0); for (let i = 1; i < N - 1; i++) un[i] = (2 * u[i] - (1 - g) * up[i] + r2 * (u[i - 1] - 2 * u[i] + u[i + 1])) / (1 + g); up = u; u = un; t += dt; T -= dt; if (rows.length < 4000) rows.push(u.slice()); } if (rows.length > 300) rows = rows.slice(-300); }
  function draw() {
    const k = C(); A.fit(); B.fit(); D.fit(); const xs = u.map((_, i) => i * dx);
    const F = frame(A, [0, 1], [-1, 1], { xl: 'x', yl: 'u' }); F.clip();
    if (st.dal && st.ic !== 'hit' && st.dmp === 0) { line(F, xs.map(x => [x, 0.5 * ext(x - c * t)]), { c: k.acc, w: 1.8, dash: [7, 4] }); line(F, xs.map(x => [x, 0.5 * ext(x + c * t)]), { c: k.ink, w: 1.4, dash: [3, 4] }); }
    line(F, u.map((v, i) => [xs[i], v]), { c: k.pri, w: 3.2 }); dot(F, 0, 0, 5, k.ink); dot(F, 1, 0, 5, k.ink); F.unclip();
    const G = frame(B, [0, 1], [0, rows.length * dt], { xl: 'x', yl: 'recent t' }); heat(G, rows.map(r => r.filter((_, i) => i % 2 === 0)), -0.8, 0.8);
    const mx = Math.max(...bn, 1e-9), H = frame(D, [0, 17], [0, mx * 1.15], { xl: 'harmonic n  (frequency n·c/2L)' }); H.clip();
    bn.forEach((b, i) => { H.x.fillStyle = k.pri; H.x.fillRect(H.X(i + 1) - 8, H.Y(b), 16, H.Y(0) - H.Y(b)); }); H.unclip();
    const wt = (b, n) => b * (st.ic === 'hit' ? n : n * n), wm = Math.max(...bn.map((b, i) => wt(b, i + 1))), miss = st.ic === 'bump' ? [] : bn.map((b, i) => wt(b, i + 1) < wm * 0.02 ? i + 1 : 0).filter(Boolean).slice(0, 6);
    out.textContent = `u_tt = c²·u_xx, c = 1, L = 1, fixed ends.  t = ${fmt(t, 2)}   (one full cycle = 2L/c = 2)\nAny shape splits into two copies moving left and right at speed c; at a fixed end each flips upside down.\nHarmonics present: frequency fₙ = n·c/(2L). ` + (miss.length ? `Missing (≈ 0): n = ${miss.join(', ')} — ` + (st.ic === 'pluck' || st.ic === 'hit' ? `pluck or strike at x = ${fmt(st.p, 2)} and every mode with a node there stays silent.` : 'a pure mode has only one harmonic.') : 'all are present.');
  }
  anim(el, dt2 => { adv(dt2 * 0.5); draw(); });
  REDRAW.push(draw); restart();
};

/* Day 13: Laplace's equation — steady temperature in a plate, relaxed by SOR */
W.plate = el => {
  lab(el);
  const st = form(el, [{ k: 'T', t: 'range', l: 'Top edge', min: 0, max: 100, v: 100, u: '°C' }, { k: 'Bo', t: 'range', l: 'Bottom', min: 0, max: 100, v: 0, u: '°C' }, { k: 'Le', t: 'range', l: 'Left', min: 0, max: 100, v: 0, u: '°C' }, { k: 'Ri', t: 'range', l: 'Right', min: 0, max: 100, v: 0, u: '°C' }, { k: 'obj', t: 'sel', l: 'Inside', v: 'none', o: [['none', 'nothing'], ['hot', 'hot pipe 100 °C'], ['cold', 'cold pipe 0 °C']] }, { k: 'q', t: 'chk', l: 'heat-flow arrows', v: false }], () => restart());
  const g = div(el, 'grid2'), A = canvas(g, 'sq', 'u(x, y) with isotherms every 10 °C'), B = canvas(g, 'plot', 'Convergence: largest change per sweep (log)');
  cbar(el, '0 °C', '100 °C'); const out = div(el, 'out');
  const n = 41; let u, fix, it, res, ac;
  function restart() {
    u = []; fix = []; it = 0; res = [];
    for (let j = 0; j < n; j++) { u.push(new Array(n).fill(0)); fix.push(new Array(n).fill(false)); }
    for (let i = 0; i < n; i++) { u[n - 1][i] = st.T; u[0][i] = st.Bo; fix[n - 1][i] = fix[0][i] = true; }
    for (let j = 1; j < n - 1; j++) { u[j][0] = st.Le; u[j][n - 1] = st.Ri; fix[j][0] = fix[j][n - 1] = true; }
    if (st.obj !== 'none') for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) if (Math.hypot(i - 20, j - 18) < 4.5) { u[j][i] = st.obj === 'hot' ? 100 : 0; fix[j][i] = true; }
    draw(); if (ac) ac.play();
  }
  function sweep() { let m = 0; const w = 1.85; for (let j = 1; j < n - 1; j++) for (let i = 1; i < n - 1; i++) { if (fix[j][i]) continue; const nv = (u[j][i - 1] + u[j][i + 1] + u[j - 1][i] + u[j + 1][i]) / 4, d = w * (nv - u[j][i]); u[j][i] += d; m = Math.max(m, Math.abs(d)); } it++; res.push([it, Math.max(m, 1e-12)]); return m; }
  const bil = (x, y) => { const X = clamp(x * (n - 1), 0, n - 1.0001), Y = clamp(y * (n - 1), 0, n - 1.0001), i = Math.floor(X), j = Math.floor(Y), a = X - i, b = Y - j; return u[j][i] * (1 - a) * (1 - b) + u[j][i + 1] * a * (1 - b) + u[j + 1][i] * (1 - a) * b + u[j + 1][i + 1] * a * b; };
  function draw() {
    const k = C(); A.fit(); B.fit(); const F = frame(A, [0, 1], [0, 1], { xl: 'x', yl: 'y' }); heat(F, u, 0, 100);
    for (let L = 10; L < 100; L += 10) contour(F, bil, 80, { c: L === 50 ? k.ink : 'rgba(23,32,43,.55)', w: L === 50 ? 2 : 1 }, L);
    if (st.q) { F.x.strokeStyle = k.ink; F.x.fillStyle = k.ink; F.x.lineWidth = 1.4; for (let j = 3; j < n - 1; j += 4) for (let i = 3; i < n - 1; i += 4) { const gx = -(u[j][i + 1] - u[j][i - 1]), gy = -(u[j + 1][i] - u[j - 1][i]), m = Math.hypot(gx, gy); if (m < 0.5) continue; const X = F.X(i / (n - 1)), Y = F.Y(j / (n - 1)), L2 = Math.min(16, 4 + m * 0.6), ang = Math.atan2(-gy, gx); F.x.beginPath(); F.x.moveTo(X, Y); F.x.lineTo(X + L2 * Math.cos(ang), Y + L2 * Math.sin(ang)); F.x.stroke(); arrowHead(F.x, X + L2 * Math.cos(ang), Y + L2 * Math.sin(ang), ang, 6, k.ink); } }
    const G = frame(B, [0, Math.max(50, it)], [-8, 2.5], { xl: 'sweep', yl: 'log₁₀ max change' }); G.clip(); line(G, res.map(r => [r[0], Math.log10(r[1])]), { c: k.pri, w: 2.4 }); G.unclip();
    const mid = u[(n - 1) / 2][(n - 1) / 2], last = res.length ? res[res.length - 1][1] : NaN;
    out.textContent = `∂²u/∂x² + ∂²u/∂y² = 0: every inside point equals the average of its four neighbours.\nSweeps ${it}, last change ${Number.isFinite(last) ? last.toExponential(1) : '—'} °C ${last < 1e-3 ? '→ converged ✓' : ''}   ·   centre temperature ${fmt(mid, 2)} °C` + (st.obj === 'none' ? `\nCheck: the centre equals the average of the four edges = ${fmt((st.T + st.Bo + st.Le + st.Ri) / 4, 2)} °C (superposition + symmetry).` : '') + `\nThere is never a hot spot inside unless you put a source there: the maximum of a harmonic function sits on the boundary.`;
  }
  ac = anim(el, () => { for (let i = 0; i < 6; i++) if (sweep() < 1e-4 && it > 10) { ac.pause(); break; } draw(); });
  REDRAW.push(draw); restart();
};

/* Day 14: fit an ODE model to data */
const FIT_M = {
  lag: { name: 'First-order lag  y′ = (y∞ − y)/τ', ps: [['yi', 'y∞ (final value)', 70], ['tau', 'τ (time constant)', 15], ['y0', 'y(0)', 32]], f: (P, y) => [(P.yi - y[0]) / P.tau], y0: P => [P.y0], rate: (P, y) => (P.yi - y) / P.tau },
  cool: { name: "Newton cooling  y′ = −k·(y − 27)", ps: [['k', 'k (per min)', 0.05], ['y0', 'y(0)', 85]], f: (P, y) => [-P.k * (y[0] - 27)], y0: P => [P.y0], rate: (P, y) => -P.k * (y - 27) },
  logi: { name: 'Logistic  y′ = r·y·(1 − y/K)', ps: [['r', 'r (growth rate)', 0.3], ['K', 'K (capacity)', 900], ['y0', 'y(0)', 25]], f: (P, y) => [P.r * y[0] * (1 - y[0] / P.K)], y0: P => [P.y0], rate: (P, y) => P.r * y * (1 - y / P.K) },
  sir: { name: 'SIR epidemic (N = 10 000)  S′ = −βSI/N, I′ = βSI/N − γI', ps: [['b', 'β (contact rate)', 0.3], ['g', 'γ (recovery rate)', 0.12], ['y0', 'I(0)', 5]], f: (P, y) => { const N = 1e4, inf = P.b * y[0] * y[1] / N; return [-inf, inf - P.g * y[1]]; }, y0: P => [1e4 - P.y0, P.y0], out: 1 },
  run: { name: "Rotor run-down  ω′ = −a − b·ω²", ps: [['a', 'a (friction)', 1], ['bb', 'b·10⁴ (windage)', 5], ['y0', 'ω(0)', 150]], f: (P, y) => [y[0] > 0 ? -P.a - P.bb * 1e-4 * y[0] * y[0] : 0], y0: P => [P.y0], rate: (P, y) => y > 0 ? -P.a - P.bb * 1e-4 * y * y : 0 }
};
const FIT_D = {
  oil: ['Gearbox oil temperature in an endurance run (°C, min)', 'lag', { yi: 78, tau: 22, y0: 32 }, 120, 3, 0.6, 1],
  tea: ['Cup of tea on the desk (°C, min)', 'cool', { k: 0.043, y0: 88 }, 60, 2, 0.5, 2],
  logi: ['Users of a new app (thousands-scale, days)', 'logi', { r: 0.35, K: 1000, y0: 20 }, 30, 1, 18, 3],
  sir: ['Infected people in a town of 10 000 (days)', 'sir', { b: 0.32, g: 0.1, y0: 8 }, 120, 3, 0.06, 4],
  run: ['Rotor coasting down after power-off (rad/s, s)', 'run', { a: 0.8, bb: 6, y0: 157 }, 120, 3, 1.2, 5],
  own: ['Your own data (paste below)', 'lag', null]
};
function simModel(M, P, ts) { const T = ts[ts.length - 1], h = Math.max(T / 800, 1e-4), s = solve((t, y) => M.f(P, y), 0, M.y0(P), T, h), idx = M.out || 0; const xs = s.map(q => q[0]), ys = s.map(q => q[1 + idx]); return { xs, ys, at: ts.map(t => interp(t, xs, ys)) }; }
W.fit = el => {
  lab(el);
  const st = form(el, [{ k: 'd', t: 'sel', l: 'Data set', v: 'oil', o: Object.keys(FIT_D).map(k => [k, FIT_D[k][0]]) }, { k: 'm', t: 'sel', l: 'Model', v: 'lag', o: Object.keys(FIT_M).map(k => [k, FIT_M[k].name]) }], k => { if (k === 'd') loadData(); else { M = FIT_M[st.m]; makeSliders(); } draw(); });
  const ta = document.createElement('textarea'); ta.rows = 4; ta.style.cssText = 'width:100%;font:13px JetBrains Mono,monospace;display:none'; ta.placeholder = 't, y — one pair per line (comma, space or tab). Headers are skipped.'; el.appendChild(ta);
  const pbox = div(el), bar = div(el, 'ctl'); bar.innerHTML = '<button type="button">⚙ Auto-fit (least squares)</button> <span class="hint">Nelder–Mead search on the sum of squared errors</span>'; const fb = $('button', bar);
  const g = div(el, 'grid3'), A = canvas(g, 'plot', 'Data (dots) and the model'), B = canvas(g, 'plot', 'Rate plot: slope of the data (dots) against y, with the model\'s f(y)'), D = canvas(g, 'plot', 'Residuals: data − model');
  const out = div(el, 'out');
  let M = FIT_M.lag, P = {}, data = [], ps = null, fitting = 0, best = null;
  function makeSliders() { pbox.innerHTML = ''; P = {}; ps = form(pbox, M.ps.map(q => { const v = P[q[0]] !== undefined ? P[q[0]] : q[2]; P[q[0]] = v; return { k: q[0], t: 'num', l: q[1], v: +v.toPrecision(4) }; }), kk => { P[kk] = ps[kk]; draw(); }); }
  function setP(Q) { Object.keys(Q).forEach(k => { P[k] = Q[k]; if (ps && ps._el[k]) ps._el[k].value = +Q[k].toPrecision(5); }); }
  function loadData() {
    const D0 = FIT_D[st.d]; ta.style.display = st.d === 'own' ? 'block' : 'none';
    if (st.d === 'own') { M = FIT_M.lag; st.m = 'lag'; st._el.m.value = 'lag'; makeSliders(); if (!ta.value.trim()) ta.value = '0, 31.8\n10, 45.2\n20, 55.0\n30, 61.3\n45, 68.4\n60, 72.6\n90, 76.3\n120, 77.4'; parse(); return; }
    M = FIT_M[D0[1]]; st.m = D0[1]; st._el.m.value = D0[1]; makeSliders();
    const r = rng(D0[6] * 97 + 11), truth = simModel(M, D0[2], lin(0, D0[3], Math.round(D0[3] / D0[4])));
    data = lin(0, D0[3], Math.round(D0[3] / D0[4])).map((t, i) => [t, D0[1] === 'sir' ? Math.max(0, truth.at[i] * (1 + D0[5] * gauss(r))) : truth.at[i] + D0[5] * gauss(r)]);
    if (D0[1] === 'run') data = data.filter((p, i) => p[1] > 0 || i < 2);
    const guess = {}; M.ps.forEach(q => guess[q[0]] = q[2]); guess.y0 = data[0][1] || guess.y0; if (D0[1] === 'sir') guess.y0 = 5; setP(guess);
  }
  function parse() { data = ta.value.split(/\n/).map(l => l.trim().split(/[\s,;]+/).map(Number)).filter(a => a.length >= 2 && Number.isFinite(a[0]) && Number.isFinite(a[1])).map(a => [a[0] - 0, a[1]]); data.sort((a, b) => a[0] - b[0]); if (data.length) { const t0 = data[0][0]; data = data.map(p => [p[0] - t0, p[1]]); setP({ y0: data[0][1] }); } draw(); }
  ta.oninput = () => parse();
  const sse = Q => { if (Object.values(Q).some(v => !Number.isFinite(v))) return 1e30; const s = simModel(M, Q, data.map(p => p[0])); let e = 0; s.at.forEach((v, i) => { const d = v - data[i][1]; e += d * d; }); return Number.isFinite(e) ? e : 1e30; };
  fb.onclick = () => {
    if (data.length < 3) return; const keys = M.ps.map(q => q[0]), x0 = keys.map(k => Math.log(Math.max(Math.abs(P[k]), 1e-6))), sg = keys.map(k => Math.sign(P[k]) || 1);
    const toQ = x => { const Q = {}; keys.forEach((k, i) => Q[k] = sg[i] * Math.exp(x[i])); return Q; };
    let x = x0, round = 0; fitting = 1;
    const step = () => { const r = nelder(z => sse(toQ(z)), x, x.map(() => round ? 0.05 : 0.3), 60); x = r.x; setP(toQ(x)); draw(); if (++round < 12 && fitting) requestAnimationFrame(step); else fitting = 0; };
    step();
  };
  function draw() {
    const k = C(); A.fit(); B.fit(); D.fit(); if (!data.length) return;
    const T = data[data.length - 1][0] || 1, s = simModel(M, P, data.map(p => p[0])), ys = data.map(p => p[1]).concat(s.ys), lo = Math.min(...ys), hi = Math.max(...ys), pad = (hi - lo) * 0.08 || 1;
    const F = frame(A, [0, T], [lo - pad, hi + pad], { xl: 't' }); F.clip(); line(F, s.xs.map((t, i) => [t, s.ys[i]]), { c: k.pri, w: 3 }); data.forEach(p => dot(F, p[0], p[1], 4, k.acc, k.card)); F.unclip();
    const res = data.map((p, i) => [p[0], p[1] - s.at[i]]), rm = Math.max(...res.map(r => Math.abs(r[1])), 1e-6) * 1.2;
    const G = frame(D, [0, T], [-rm, rm], { xl: 't' }); G.clip(); res.forEach(r => { G.x.strokeStyle = k.pri; G.x.lineWidth = 3; G.x.beginPath(); G.x.moveTo(G.X(r[0]), G.Y(0)); G.x.lineTo(G.X(r[0]), G.Y(r[1])); G.x.stroke(); dot(G, r[0], r[1], 3.5, k.pri); }); G.unclip();
    if (M.rate) {
      const sl = []; for (let i = 1; i < data.length - 1; i++) { const dt = data[i + 1][0] - data[i - 1][0]; if (dt > 0) sl.push([data[i][1], (data[i + 1][1] - data[i - 1][1]) / dt]); }
      const yr = [Math.min(...data.map(p => p[1])), Math.max(...data.map(p => p[1]))], fy = lin(yr[0], yr[1], 100).map(y => [y, M.rate(P, y)]), vs = sl.map(q => q[1]).concat(fy.map(q => q[1])), a = Math.min(...vs, 0), b = Math.max(...vs, 0), pd = (b - a) * 0.1 || 1;
      const H = frame(B, [yr[0] - (yr[1] - yr[0]) * 0.05, yr[1] + (yr[1] - yr[0]) * 0.05], [a - pd, b + pd], { xl: 'y', yl: 'dy/dt' }); H.clip(); line(H, fy, { c: k.pri, w: 3 }); sl.forEach(q => dot(H, q[0], q[1], 3.5, k.acc, k.card)); H.unclip();
    } else { const H = frame(B, [0, 1], [0, 1]); label(H, 0.5, 0.5, 'Two-variable model: no single rate curve', k.soft, 'center'); }
    const e = sse(P), n = data.length, mean = data.reduce((q, p) => q + p[1], 0) / n, tot = data.reduce((q, p) => q + (p[1] - mean) ** 2, 0);
    let txt = `${M.name}\n` + M.ps.map(q => `${q[1]} = ${fmt(P[q[0]], 4)}`).join('   ·   ') + `\nRMS error ${fmt(Math.sqrt(e / n), 4)}   ·   R² = ${fmt(1 - e / tot, 4)}   ·   ${n} points`;
    if (st.m === 'sir') txt += `\nR₀ = β/γ = ${fmt(P.b / P.g, 2)}  →  herd-immunity fraction 1 − 1/R₀ = ${fmt(100 * (1 - P.g / P.b), 1)} %`;
    if (st.m === 'lag') txt += `\nReady by ≈ 3τ = ${fmt(3 * P.tau, 1)}: 95 % of the rise done. From the first ${fmt(Math.min(T, 2 * P.tau), 0)} units of data you could already predict the final ${fmt(P.yi, 1)}.`;
    txt += `\nResiduals should look like noise. A pattern (a smile, a wave) means the model is missing physics.`;
    out.textContent = txt;
  }
  REDRAW.push(draw); loadData(); draw();
};

/* Day 15: finite differences for the heat equation — stability made visible */
W.fdm = el => {
  lab(el);
  const st = form(el, [{ k: 's', t: 'seg', l: 'Scheme', v: 'ex', o: [['ex', 'explicit (FTCS)'], ['im', 'implicit'], ['cn', 'Crank–Nicolson']] }, { k: 'r', t: 'range', l: 'r = Δt/Δx²', min: 0.1, max: 2, s: 0.01, v: 0.48 }, { k: 'n', t: 'range', l: 'Intervals N', min: 8, max: 60, v: 20 }], () => restart());
  const g = div(el, 'grid2'), A = canvas(g, 'plot', 'Numerical (dots) against exact (dashed)'), B = canvas(g, 'plot', 'Amplification factor G per step for each wave number');
  const lg = div(el, 'legend'); legend(lg, [['', 'numerical u'], ['k dash', 'exact u'], ['o dash', '|G| = 1 (stability limit)']]); const out = div(el, 'out');
  let u, t, steps, dx, dt;
  const ex = (x, t) => Math.exp(-PI * PI * t) * Math.sin(PI * x) + 0.3 * Math.exp(-9 * PI * PI * t) * Math.sin(3 * PI * x);
  function restart() { const N = st.n; dx = 1 / N; dt = st.r * dx * dx; const r = rng(3); u = lin(0, 1, N).map((x, i) => i === 0 || i === N ? 0 : ex(x, 0) + 1e-6 * (r() - 0.5)); t = 0; steps = 0; draw(); }
  function tri(a, b, c, d) { const n = d.length, cp = new Array(n), dp = new Array(n); cp[0] = c / b; dp[0] = d[0] / b; for (let i = 1; i < n; i++) { const m = b - a * cp[i - 1]; cp[i] = c / m; dp[i] = (d[i] - a * dp[i - 1]) / m; } const x = new Array(n); x[n - 1] = dp[n - 1]; for (let i = n - 2; i >= 0; i--) x[i] = dp[i] - cp[i] * x[i + 1]; return x; }
  function step() {
    const N = st.n, r = st.r, v = u.slice();
    if (st.s === 'ex') for (let i = 1; i < N; i++) v[i] = u[i] + r * (u[i - 1] - 2 * u[i] + u[i + 1]);
    else { const th = st.s === 'im' ? 1 : 0.5, rhs = []; for (let i = 1; i < N; i++) rhs.push(u[i] + (1 - th) * r * (u[i - 1] - 2 * u[i] + u[i + 1])); const s = tri(-th * r, 1 + 2 * th * r, -th * r, rhs); for (let i = 1; i < N; i++) v[i] = s[i - 1]; }
    u = v; t += dt; steps++;
  }
  const G = (kd, r) => st.s === 'ex' ? 1 - 4 * r * Math.sin(kd / 2) ** 2 : st.s === 'im' ? 1 / (1 + 4 * r * Math.sin(kd / 2) ** 2) : (1 - 2 * r * Math.sin(kd / 2) ** 2) / (1 + 2 * r * Math.sin(kd / 2) ** 2);
  function draw() {
    const k = C(); A.fit(); B.fit(); const N = st.n, xs = lin(0, 1, N);
    const F = frame(A, [0, 1], [-1.3, 1.5], { xl: 'x', yl: 'u' }); F.clip(); line(F, lin(0, 1, 200).map(x => [x, ex(x, t)]), { c: k.ink, w: 1.6, dash: [4, 4] }); const pts = xs.map((x, i) => [x, clamp(u[i], -1e3, 1e3)]); line(F, pts, { c: k.pri, w: 2.4 }); pts.forEach(p => dot(F, p[0], p[1], 3.5, k.pri)); F.unclip();
    const kd = lin(0, PI, 200), H = frame(B, [0, PI], [-3, 1.2], { xl: 'wave number k·Δx (π = shortest wave the grid can hold)', yl: 'G' }); H.clip();
    H.x.fillStyle = 'rgba(31,95,191,.08)'; H.x.fillRect(H.L, H.Y(1), H.W - H.L - H.R, H.Y(-1) - H.Y(1));
    line(H, [[0, 1], [PI, 1]], { c: k.acc, w: 1.6, dash: [7, 5] }); line(H, [[0, -1], [PI, -1]], { c: k.acc, w: 1.6, dash: [7, 5] });
    line(H, kd.map(q => [q, Math.exp(-st.r * q * q)]), { c: k.ink, w: 1.4, dash: [3, 4] }); line(H, kd.map(q => [q, G(q, st.r)]), { c: k.pri, w: 3 }); H.unclip();
    const err = Math.max(...xs.map((x, i) => Math.abs(u[i] - ex(x, t)))), worst = G(PI * (N - 1) / N, st.r);
    out.textContent = `Δx = ${fmt(dx, 4)}, Δt = r·Δx² = ${dt.toExponential(2)}, steps ${steps}, t = ${fmt(t, 4)}, max error ${err > 1e3 ? '> 1000 (blown up)' : err.toExponential(2)}\nWorst mode amplification G = ${fmt(worst, 3)} per step ${Math.abs(worst) > 1 ? '→ |G| > 1: the zig-zag mode grows every step — UNSTABLE' : '→ |G| ≤ 1: stable'}\n` + (st.s === 'ex' ? 'Explicit FTCS is stable only for r ≤ ½. Push r just past 0.5 and play: a saw-tooth appears out of round-off and swamps the answer.' : st.s === 'im' ? 'Implicit (backward Euler in time): stable for any r, first-order accurate in time. Needs a tridiagonal solve each step.' : 'Crank–Nicolson: stable for any r and second-order in time, but for large r the shortest waves get G ≈ −1 and flicker instead of dying.') + '\nDashed black in the right plot: the true decay e^(−r·(kΔx)²) a perfect scheme would give.';
  }
  anim(el, () => { if (t < 0.12) { for (let i = 0; i < Math.max(1, Math.round(0.0006 / dt)); i++) step(); } draw(); });
  REDRAW.push(draw); restart();
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
