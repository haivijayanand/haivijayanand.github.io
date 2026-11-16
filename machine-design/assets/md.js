/*
TOOL:    machine-design/assets/md.js — shared engine for the 30-Day Machine Design Course: page shell, progress, quiz, charts and 29 interactive design labs
FAMILY:  machine-design
VERSION: 1.0.0
DATE:    2026-11-16
CHAT:    create an interactive html study for mechanical machine design in 30 days
CHANGES: 1.0.0 - first version; page shell, quiz, certificate and keyboard (M F T P S X [ ]) adapted from creo/assets/cr.js 1.0.0;
                 new chart helper (linear/log axes) and labs: preferred numbers, Ashby chart, part cost, Mohr, failure envelopes,
                 Kt + notch sensitivity, Marin + S-N, Goodman, ISO 286 fits, bolted joint, eccentric weld, power screw, shaft,
                 critical speed, key + coupling, spring, clutch, brake, belt, chain, involute gear pair, spur strength, gear forces,
                 worm, bearing L10, journal bearing, Lame + press fit, flywheel, reliability + life-cycle cost
STATUS:  working
*/
(function () {
'use strict';
const SW = window.SW = window.SW || {};
SW.version = '1.0.0';
const ND = () => (window.SW_DAYS ? SW_DAYS.length : 30);
const $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const store = {
  get(k, d) { try { const v = localStorage.getItem('md30:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('md30:' + k, JSON.stringify(v)); } catch (e) { } }
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
SW.resetProgress = () => { if (confirm('Clear all progress, ticks and quiz scores stored in this browser?')) { try { Object.keys(localStorage).filter(k => k.startsWith('md30:')).forEach(k => localStorage.removeItem(k)); } catch (e) { } location.reload(); } };

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
  const d0 = +(el.dataset.from || 1), d1 = +(el.dataset.to || 30), tot = d1 - d0 + 1, key = el.dataset.key || 'exam';
  const title = el.dataset.title || '30-Day Machine Design Course', topics = el.dataset.topics || 'design of machine elements: materials, failure theories, fatigue, joints, shafts, springs, clutches, brakes, drives, gears, bearings and flywheels';
  el._upd = () => {
    const dm = doneMap(); let n = 0; for (let i = d0; i <= d1; i++) if (dm[i]) n++;
    const sc = store.get(key + 'score', null);
    card.innerHTML = `<div class="series" style="letter-spacing:.2em;color:var(--soft)">CERTIFICATE OF COMPLETION</div><h2>${esc(title)}</h2><p>This is to certify that</p><div class="nm">${esc(nmIn.value || 'Your name')}</div><p>has worked through <b>${n} of ${tot}</b> days of ${esc(topics)}${sc ? `, and scored <b>${sc[0]} / ${sc[1]}</b> in the final assessment` : ''}.</p><p class="hint">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} · haivijayanand.github.io/machine-design</p>${n < tot || !sc ? `<p class="hint">(Complete all ${tot} days and the final assessment to make it count.)</p>` : ''}<p class="hint">A course-completion certificate — not an official or university certification.</p>`;
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
function verdict(n, lo, hi) { return !Number.isFinite(n) ? '' : n < 1 ? '  ⚠ FAILS' : n < (lo || 1.5) ? '  ⚠ low' : n > (hi || 4) ? '  — over-designed?' : '  ✓ OK'; }
const STD_D = [10, 12, 14, 16, 18, 20, 22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 48, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 110, 120, 125, 130, 140, 150, 160, 170, 180, 190, 200, 220, 240, 250];
const nextStd = d => STD_D.find(v => v >= d - 1e-9) || Math.ceil(d / 10) * 10;
const G = 9.81;

/* Day 1: preferred numbers */
const RSER = { 5: [1, 1.6, 2.5, 4, 6.3], 10: [1, 1.25, 1.6, 2, 2.5, 3.15, 4, 5, 6.3, 8], 20: [1, 1.12, 1.25, 1.4, 1.6, 1.8, 2, 2.24, 2.5, 2.8, 3.15, 3.55, 4, 4.5, 5, 5.6, 6.3, 7.1, 8, 9], 40: [1, 1.06, 1.12, 1.18, 1.25, 1.32, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.12, 2.24, 2.36, 2.5, 2.65, 2.8, 3, 3.15, 3.35, 3.55, 3.75, 4, 4.25, 4.5, 4.75, 5, 5.3, 5.6, 6, 6.3, 6.7, 7.1, 7.5, 8, 8.5, 9, 9.5] };
W.prefnum = el => {
  lab(el);
  const st = form(el, [{ k: 's', t: 'seg', l: 'Series', o: [['5', 'R5'], ['10', 'R10'], ['20', 'R20'], ['40', 'R40']], v: '10' }, { k: 'a', t: 'num', l: 'From', v: 1, min: 0.01 }, { k: 'b', t: 'num', l: 'To', v: 100, min: 0.1 }, { k: 'q', t: 'num', l: 'Snap my value', v: 37, min: 0.01 }], draw);
  const box = div(el), out = div(el, 'out');
  function draw() {
    const n = +st.s, vals = [];
    for (let e = Math.floor(Math.log10(st.a)) - 1; e <= Math.ceil(Math.log10(st.b)); e++) RSER[n].forEach(v => { const x = +(v * Math.pow(10, e)).toPrecision(4); if (x >= st.a * 0.999 && x <= st.b * 1.001) vals.push(x); });
    const near = vals.length ? vals.reduce((p, v) => Math.abs(Math.log(v / st.q)) < Math.abs(Math.log(p / st.q)) ? v : p, vals[0]) : NaN;
    box.innerHTML = chart({ x: [Math.max(st.a, 1e-3) * 0.9, st.b * 1.1], y: [0, 1], logx: true, h: 150, ny: 1, xl: 'value (log scale) — equal steps in ratio, not in difference', extra: (X, Y) => vals.map(v => `<line x1="${X(v)}" y1="${Y(0.15)}" x2="${X(v)}" y2="${Y(0.85)}" class="${v === near ? 'o' : 'b'}" style="stroke-width:${v === near ? 4 : 2}"/>`).join('') + `<line x1="${X(st.q)}" y1="${Y(0)}" x2="${X(st.q)}" y2="${Y(1)}" class="d dash"/>` });
    const r = Math.pow(10, 1 / n);
    out.textContent = `R${n}: ratio between terms = 10^(1/${n}) = ${fmt(r, 4)}  (each step about ${fmt((r - 1) * 100, 1)} % larger)\n${vals.length} values from ${st.a} to ${st.b}:\n${vals.join('  ')}\n\nYour value ${st.q} → nearest R${n} number ${near}\nUse R5 first, then R10, R20, R40 only when the coarser series is too sparse (IS 1076 / ISO 3).`;
  }
  draw();
};

/* Day 2: material selection chart (Ashby style) */
const MATL = [
  ['Mild steel E250 (IS 2062)', 7850, 250, 210, 70, 'steel'], ['C45 / 45C8, normalised', 7850, 380, 210, 85, 'steel'], ['40Cr4, hardened + tempered', 7850, 650, 210, 120, 'steel'],
  ['EN24 (40Ni2Cr1Mo28), H+T', 7850, 800, 210, 220, 'steel'], ['Spring steel 50Cr4V2, hardened', 7850, 1300, 210, 180, 'steel'], ['Stainless 304 (X04Cr19Ni9)', 8000, 215, 193, 260, 'steel'],
  ['Grey cast iron FG 260', 7200, 260, 110, 60, 'iron'], ['SG iron 500/7', 7100, 320, 170, 75, 'iron'], ['Aluminium 6061-T6', 2700, 275, 69, 320, 'light'], ['Aluminium 7075-T6', 2810, 505, 72, 600, 'light'],
  ['Magnesium AZ31', 1770, 200, 45, 500, 'light'], ['Titanium Ti-6Al-4V', 4430, 880, 114, 3500, 'light'], ['Brass CuZn39Pb3', 8500, 250, 97, 600, 'cu'], ['Phosphor bronze', 8800, 300, 110, 900, 'cu'],
  ['Nylon 66', 1140, 80, 2.8, 300, 'poly'], ['Acetal (POM)', 1410, 65, 2.9, 350, 'poly'], ['GFRP laminate', 1900, 400, 25, 400, 'comp'], ['CFRP laminate', 1600, 900, 70, 3000, 'comp']];
const IDX = { tie: ['Tie, strength: σ/ρ', 1, 's'], beam: ['Beam, strength: σ^(2/3)/ρ', 2 / 3, 's'], plate: ['Plate, strength: σ^(1/2)/ρ', 1 / 2, 's'], tieE: ['Tie, stiffness: E/ρ', 1, 'E'], beamE: ['Beam, stiffness: E^(1/2)/ρ', 1 / 2, 'E'] };
W.ashby = el => {
  lab(el);
  const st = form(el, [{ k: 'i', t: 'sel', l: 'Design goal', o: Object.keys(IDX).map(k => [k, IDX[k][0]]), v: 'beam' }, { k: 'c', t: 'chk', l: 'Divide by price (best value per ₹)', v: false }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const I = IDX[st.i], useE = I[2] === 'E', ex = I[1];
    const prop = m => useE ? m[3] : m[2], idx = m => Math.pow(prop(m), ex) / (m[1] / 1000) / (st.c ? m[4] : 1);
    const rank = MATL.slice().sort((a, b) => idx(b) - idx(a)), best = idx(rank[0]);
    const yr = useE ? [1, 400] : [30, 2000];
    box.innerHTML = chart({ x: [1000, 10000], y: yr, logx: true, logy: true, h: 340, xl: 'density ρ, kg/m³', yl: useE ? "Young's modulus E, GPa" : 'strength σ, MPa',
      extra: (X, Y) => { const m0 = rank[0], c0 = Math.pow(prop(m0), ex) / m0[1]; let p = []; for (let r = 800; r <= 12000; r *= 1.2) p.push([r, Math.pow(c0 * r, 1 / ex)]); return st.c ? '' : `<polyline class="o dash" points="${p.map(q => X(q[0]) + ',' + Y(q[1])).join(' ')}"/>`; },
      pts: MATL.map(m => [m[1], prop(m), rank.indexOf(m) < 3 ? 7 : 5, rank.indexOf(m) < 3 ? 'fa' : 'fp']),
      labels: rank.slice(0, 3).map(m => [m[1], prop(m), m[0].split(' (')[0].split(',')[0], 8, -8, 'ot']) });
    out.textContent = `${I[0]}${st.c ? '  per ₹' : ''}\nRank  material                         index  (relative)\n` + rank.map((m, i) => `${String(i + 1).padStart(2)}.  ${m[0].padEnd(32)} ${fmt(idx(m) / best * 100, 0).padStart(4)} %`).join('\n') + `\n\n${st.c ? '' : 'Dashed line: slope of the index through the best material — everything on the line performs equally; above-left is better.\n'}Prices are rough Indian bar-stock figures (₹/kg, 2026) for comparison only.`;
  }
  draw();
};

/* Day 3: part cost estimator */
W.cost = el => {
  lab(el);
  const st = form(el, [
    { k: 'm', t: 'sel', l: 'Material', o: MATL.slice(0, 14).map((m, i) => [i, m[0] + ' · ₹' + m[4] + '/kg']), v: '1' },
    { k: 'D', t: 'num', l: 'Bar Ø', v: 50, u: 'mm' }, { k: 'L', t: 'num', l: 'Length', v: 200, u: 'mm' },
    { k: 't', t: 'num', l: 'Machining', v: 25, u: 'min/part' }, { k: 'r', t: 'num', l: 'Machine-hour rate', v: 900, u: '₹/h' },
    { k: 'su', t: 'num', l: 'Set-up', v: 3, u: 'h/batch' }, { k: 'q', t: 'range', l: 'Batch size', min: 1, max: 1000, v: 50 },
    { k: 'ht', t: 'num', l: 'Heat treatment', v: 45, u: '₹/kg' }, { k: 'oh', t: 'num', l: 'Overhead', v: 25, u: '%' }, { k: 'pr', t: 'num', l: 'Profit', v: 12, u: '%' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function parts(q) {
    const M = MATL[+st.m], kg = M[1] * PI * st.D * st.D / 4 * (st.L + 5) * 1e-9;
    const mat = kg * M[4] * 1.05, mach = st.t / 60 * st.r, setup = st.su * st.r / q, ht = kg * st.ht;
    const sub = mat + mach + setup + ht, oh = sub * st.oh / 100, pr = (sub + oh) * st.pr / 100;
    return { kg, mat, mach, setup, ht, oh, pr, tot: sub + oh + pr };
  }
  function draw() {
    const c = parts(st.q), curve = []; for (let q = 1; q <= 1000; q = Math.ceil(q * 1.25)) curve.push([q, parts(q).tot]);
    box.innerHTML = chart({ x: [1, 1000], y: [0, Math.ceil(parts(1).tot / 500) * 500], logx: true, xl: 'batch size (log)', yl: 'cost per part, ₹', series: [{ p: curve, c: 'b' }], pts: [[st.q, c.tot]] });
    const bar = (v, n) => n.padEnd(15) + ('₹ ' + fmt(v, 0)).padStart(10) + '  ' + '█'.repeat(Math.round(v / c.tot * 40));
    out.textContent = `Blank mass ${fmt(c.kg, 2)} kg (incl. 5 mm parting allowance, 5 % scrap)\n` + [bar(c.mat, 'Material'), bar(c.mach, 'Machining'), bar(c.setup, 'Set-up share'), bar(c.ht, 'Heat treatment'), bar(c.oh, 'Overhead'), bar(c.pr, 'Profit')].join('\n') + `\n${'Price per part'.padEnd(15)}${('₹ ' + fmt(c.tot, 0)).padStart(10)}\n\nSet-up is spread over the batch: one part costs ₹ ${fmt(parts(1).tot, 0)}, a batch of 1000 costs ₹ ${fmt(parts(1000).tot, 0)} each.`;
  }
  draw();
};

/* Day 4: Mohr's circle */
W.mohr = el => {
  lab(el);
  const st = form(el, [{ k: 'sx', t: 'range', l: 'σx', min: -200, max: 200, v: 80, u: 'MPa' }, { k: 'sy', t: 'range', l: 'σy', min: -200, max: 200, v: -20, u: 'MPa' }, { k: 'txy', t: 'range', l: 'τxy', min: -150, max: 150, v: 40, u: 'MPa' }, { k: 'th', t: 'range', l: 'Rotate element θ', min: 0, max: 180, v: 0, u: '°' }], draw);
  const ctl = div(el, 'ctl'); animCtl(ctl, el, dt => { st.th = (st.th + dt * 30) % 180; st._el.th.value = st.th; st._el.th._show(); draw(); }, () => { st.th = (Math.round(st.th) + 5) % 180; st._el.th.value = st.th; st._el.th._show(); draw(); });
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const c = (st.sx + st.sy) / 2, R = Math.hypot((st.sx - st.sy) / 2, st.txy), s1 = c + R, s2 = c - R, a = Math.atan2(st.txy, st.sx - c), t2 = rad(2 * st.th);
    const sxp = c + R * Math.cos(a - t2), txp = R * Math.sin(a - t2), syp = c - R * Math.cos(a - t2);
    const m = Math.max(60, Math.abs(c) + R) * 1.15, thp = deg(Math.atan2(2 * st.txy, st.sx - st.sy)) / 2;
    const svg = chart({ x: [-m, m], y: [-m * 0.62, m * 0.62], w: 540, h: 360, xl: 'normal stress σ, MPa', yl: 'shear stress τ, MPa',
      extra: (X, Y) => { const k = (X(1) - X(0)); return `<line class="d" x1="${X(-m)}" y1="${Y(0)}" x2="${X(m)}" y2="${Y(0)}"/><line class="d" x1="${X(0)}" y1="${Y(-m)}" x2="${X(0)}" y2="${Y(m)}"/><circle cx="${X(c)}" cy="${Y(0)}" r="${R * k}" class="fb"/><line class="k" x1="${X(st.sx)}" y1="${Y(st.txy)}" x2="${X(st.sy)}" y2="${Y(-st.txy)}"/><line class="o" x1="${X(sxp)}" y1="${Y(txp)}" x2="${X(syp)}" y2="${Y(-txp)}"/><circle cx="${X(st.sx)}" cy="${Y(st.txy)}" r="5" class="fi"/><circle cx="${X(sxp)}" cy="${Y(txp)}" r="7" class="fa"/><text x="${X(st.sx) + 8}" y="${Y(st.txy) - 8}">X</text><text x="${X(sxp) + 8}" y="${Y(txp) + 18}" class="ot">X′ (θ=${Math.round(st.th)}°)</text><circle cx="${X(s1)}" cy="${Y(0)}" r="5" class="fp"/><circle cx="${X(s2)}" cy="${Y(0)}" r="5" class="fp"/><text x="${X(s1) + 4}" y="${Y(0) + 18}" class="bt">σ₁</text><text x="${X(s2) - 22}" y="${Y(0) + 18}" class="bt">σ₂</text>`; } });
    const e = 70, cx = 80, cy = 90, r2 = rad(-st.th), P = (x, y) => [cx + x * Math.cos(r2) - y * Math.sin(r2), cy + x * Math.sin(r2) + y * Math.cos(r2)];
    const sq = [P(-30, -30), P(30, -30), P(30, 30), P(-30, 30)];
    let el2 = `<svg viewBox="0 0 160 190"><polygon points="${pts(sq)}" class="fb"/>`;
    const fa = (x, y, v, txt) => { const p0 = P(x * 30, y * 30), p1 = P(x * (30 + (v >= 0 ? 28 : 6)), y * (30 + (v >= 0 ? 28 : 6))), p2 = P(x * (v >= 0 ? 58 : 34), y * (v >= 0 ? 58 : 34)), q0 = v >= 0 ? p0 : p2, q1 = v >= 0 ? p2 : p0; return `<line class="o" x1="${q0[0]}" y1="${q0[1]}" x2="${q1[0]}" y2="${q1[1]}" style="stroke-width:2"/>${arrow(q1[0], q1[1], Math.atan2(q1[1] - q0[1], q1[0] - q0[0]), 7)}`; };
    el2 += fa(1, 0, sxp) + fa(-1, 0, sxp) + `<text x="80" y="172" text-anchor="middle" class="s">σx′ = ${fmt(sxp, 0)} MPa</text><text x="80" y="186" text-anchor="middle" class="s">element turned ${Math.round(st.th)}°</text></svg>`;
    box.innerHTML = `<div style="display:grid;grid-template-columns:3fr 1fr;gap:8px;align-items:start">${svg}${el2}</div>`;
    out.textContent = `Centre C = (σx+σy)/2 = ${fmt(c, 1)} MPa\nRadius R = √(((σx−σy)/2)² + τxy²) = ${fmt(R, 1)} MPa\nσ₁ = C + R = ${fmt(s1, 1)} MPa    σ₂ = C − R = ${fmt(s2, 1)} MPa\nτmax (in plane) = R = ${fmt(R, 1)} MPa    τmax (absolute, σ₃ = 0) = ${fmt(Math.max(R, Math.abs(s1) / 2, Math.abs(s2) / 2), 1)} MPa\nPrincipal plane θp = ½·atan(2τxy/(σx−σy)) = ${fmt(thp, 1)}°\n\nOn the element turned θ: σx′ = ${fmt(sxp, 1)}  σy′ = ${fmt(syp, 1)}  τx′y′ = ${fmt(txp, 1)} MPa\nTurning the element θ moves the point 2θ round the circle.  P plays the rotation.`;
  }
  draw();
};

/* Day 5: failure envelopes */
W.failure = el => {
  lab(el);
  const st = form(el, [{ k: 'sx', t: 'range', l: 'σx', min: -300, max: 300, v: 120, u: 'MPa' }, { k: 'sy', t: 'range', l: 'σy', min: -300, max: 300, v: 40, u: 'MPa' }, { k: 'txy', t: 'range', l: 'τxy', min: -200, max: 200, v: 60, u: 'MPa' }, { k: 'Sy', t: 'num', l: 'Yield strength Sy', v: 250, u: 'MPa' }, { k: 'br', t: 'chk', l: 'Brittle (cast iron): Sut 260, Suc 900', v: false }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const c = (st.sx + st.sy) / 2, R = Math.hypot((st.sx - st.sy) / 2, st.txy), s1 = c + R, s2 = c - R, S = st.Sy, m = Math.max(S, Math.abs(s1), Math.abs(s2), st.br ? 900 : 0) * 1.25;
    const vm = Math.sqrt(s1 * s1 - s1 * s2 + s2 * s2), nR = S / Math.max(Math.abs(s1), Math.abs(s2)), nT = S / Math.max(Math.abs(s1 - s2), Math.abs(s1), Math.abs(s2)), nV = S / vm;
    let ell = []; for (let t = 0; t <= 360; t += 4) { const a = rad(t), u = Math.cos(a), w = Math.sin(a), k = S / Math.sqrt(u * u - u * w + w * w); ell.push([k * u, k * w]); }
    const hex = [[S, 0], [S, S], [0, S], [-S, 0], [-S, -S], [0, -S], [S, 0]], sq = [[S, S], [-S, S], [-S, -S], [S, -S], [S, S]];
    const ser = [{ p: sq, c: 'd', dash: 1 }, { p: hex, c: 'k' }, { p: ell, c: 'b' }, { p: [[0, 0], [s1 * 3, s2 * 3]], c: 'd', dash: 1 }];
    let nCM = NaN, Sut = 260, Suc = 900;
    if (st.br) { ser.push({ p: [[Sut, Sut], [Sut, 0], [0, -Suc], [-Suc, -Suc], [-Suc, 0], [0, Sut], [Sut, Sut]], c: 'o' }); nCM = s1 >= 0 && s2 >= 0 ? Sut / s1 : s1 >= 0 && s2 < 0 ? 1 / (s1 / Sut - s2 / Suc) : s1 < 0 && s2 < 0 ? Suc / -s2 : 1 / (s2 / Sut - s1 / Suc); }
    box.innerHTML = chart({ x: [-m, m], y: [-m, m], w: 440, h: 440, xl: 'σ₁, MPa', yl: 'σ₂, MPa', series: ser, pts: [[s1, s2], [s2, s1, 4, 'fp']] }) + '<div class="legend"><span><i style="background:var(--pri)"></i>von Mises (ellipse)</span><span><i style="background:var(--ink)"></i>Tresca (hexagon)</span><span><i style="border:1px dashed var(--soft)"></i>Rankine (square)</span>' + (st.br ? '<span><i style="background:var(--acc)"></i>Coulomb–Mohr</span>' : '') + '</div>';
    out.textContent = `Principal stresses σ₁ = ${fmt(s1, 1)}, σ₂ = ${fmt(s2, 1)}, σ₃ = 0 MPa\nvon Mises stress σ′ = √(σ₁² − σ₁σ₂ + σ₂²) = ${fmt(vm, 1)} MPa\n\nFactor of safety against yield (Sy = ${S} MPa)\n  Max normal stress (Rankine) ${fmt(nR, 2)}  — not for ductile parts\n  Max shear stress (Tresca)   ${fmt(nT, 2)}${verdict(nT)}\n  Distortion energy (v Mises) ${fmt(nV, 2)}${verdict(nV)}` + (st.br ? `\n  Coulomb–Mohr (brittle)      ${fmt(nCM, 2)}${verdict(nCM, 2)}` : '') + `\n\nTresca is always the safer (lower) of the two ductile theories; they agree on the axes and differ most in pure shear (by 15.5 %).`;
  }
  draw();
};

/* Day 6: Kt of a stepped shaft + notch sensitivity */
const KT_B = [[1.01, .91938, -.17032], [1.02, .96048, -.17711], [1.03, .98061, -.18381], [1.05, .98137, -.19653], [1.07, .97527, -.20958], [1.1, .95120, -.23757], [1.2, .97098, -.21796], [1.5, .93836, -.25759], [2, .90879, -.28598], [3, .89334, -.30860], [6, .87868, -.33243]];
const KT_T = [[1.09, .90337, -.12692], [1.2, .83425, -.21649], [1.33, .84897, -.23161], [2, .86331, -.23865]];
function ktStep(Dd, rd, tors) { const T = tors ? KT_T : KT_B, xs = T.map(r => r[0]); const A = interp(Dd, xs, T.map(r => r[1])), b = interp(Dd, xs, T.map(r => r[2])); return Math.max(1, A * Math.pow(rd, b)); }
function notchQ(Sut, r, tors) { const s = Sut / 6.895 + (tors ? 20 : 0); const ra = (0.246 - 3.08e-3 * s + 1.51e-5 * s * s - 2.67e-8 * s * s * s); return 1 / (1 + Math.max(ra, 0) / Math.sqrt(r / 25.4)); }
SW.ktStep = ktStep; SW.notchQ = notchQ;
W.kt = el => {
  lab(el);
  const st = form(el, [{ k: 'd', t: 'num', l: 'Small Ø d', v: 40, u: 'mm' }, { k: 'D', t: 'range', l: 'Large Ø D', min: 41, max: 120, v: 60, u: 'mm' }, { k: 'r', t: 'range', l: 'Fillet r', min: 0.2, max: 10, s: 0.2, v: 2, u: 'mm' }, { k: 'ld', t: 'seg', l: 'Load', o: [['b', 'Bending'], ['t', 'Torsion']], v: 'b' }, { k: 'Sut', t: 'num', l: 'Sut', v: 620, u: 'MPa' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const tors = st.ld === 't', Dd = st.D / st.d, rd = st.r / st.d, Kt = ktStep(Dd, rd, tors), q = notchQ(st.Sut, st.r, tors), Kf = 1 + q * (Kt - 1);
    const cur = []; for (let x = 0.01; x <= 0.3; x += 0.005) cur.push([x, ktStep(Dd, x, tors)]);
    const g = chart({ x: [0, 0.3], y: [1, 3.2], w: 380, h: 280, xl: 'r / d', yl: 'Kt', series: [{ p: cur }], pts: [[rd, Kt]] });
    const s = 2.2, x0 = 20, y0 = 80, hd = st.d * s / 2 * 0.7, hD = st.D * s / 2 * 0.7, rr = Math.max(1.5, st.r * s * 0.7);
    const sh = `<svg viewBox="0 0 260 170"><path class="fb" d="M${x0} ${y0 - hd} L${130 - rr} ${y0 - hd} Q130 ${y0 - hd} 130 ${y0 - hd - rr} L130 ${y0 - hD} L240 ${y0 - hD} L240 ${y0 + hD} L130 ${y0 + hD} L130 ${y0 + hd + rr} Q130 ${y0 + hd} ${130 - rr} ${y0 + hd} L${x0} ${y0 + hd} Z"/><line class="cl" x1="10" y1="${y0}" x2="250" y2="${y0}"/><circle cx="130" cy="${y0 - hd}" r="9" class="fo"/><text x="138" y="${y0 - hd + 22}" class="ot">Kt ${fmt(Kt, 2)}</text><text x="${x0}" y="165" class="s">d ${st.d}</text><text x="200" y="165" class="s">D ${st.D}</text></svg>`;
    box.innerHTML = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:start">${sh}${g}</div>`;
    out.textContent = `D/d = ${fmt(Dd, 3)}   r/d = ${fmt(rd, 3)}   (${tors ? 'torsion' : 'bending'})\nTheoretical factor Kt = ${fmt(Kt, 2)}   (Peterson chart, curve-fitted)\nNotch sensitivity q = ${fmt(q, 2)}   (Neuber, steel with Sut ${st.Sut} MPa)\nFatigue factor Kf = 1 + q(Kt − 1) = ${fmt(Kf, 2)}\n\nUse Kt for brittle materials (static); Kf for fatigue of ductile parts.\nDoubling r from ${st.r} mm gives Kt ${fmt(ktStep(Dd, 2 * rd, tors), 2)}.`;
  }
  draw();
};

/* Day 7: Marin factors + S–N curve */
const SURF = { ground: [1.58, -0.085, 'Ground'], machined: [4.51, -0.265, 'Machined / cold drawn'], hot: [57.7, -0.718, 'Hot rolled'], forged: [272, -0.995, 'As forged'] };
const RELI = [['50', 1], ['90', 0.897], ['95', 0.868], ['99', 0.814], ['99.9', 0.753], ['99.99', 0.702]];
function marin(o) {
  const Sep = o.Sut <= 1400 ? 0.5 * o.Sut : 700, sf = SURF[o.surf], ka = sf[0] * Math.pow(o.Sut, sf[1]);
  const kb = o.load === 'axial' ? 1 : o.d <= 2.79 ? 1 : o.d <= 51 ? 1.24 * Math.pow(o.d, -0.107) : 1.51 * Math.pow(o.d, -0.157);
  const kc = o.load === 'axial' ? 0.85 : o.load === 'torsion' ? 0.59 : 1, ke = RELI.find(r => r[0] === o.rel)[1];
  return { Sep, ka, kb, kc, ke, Se: Sep * ka * kb * kc * ke };
}
SW.marin = marin;
W.sn = el => {
  lab(el);
  const st = form(el, [{ k: 'Sut', t: 'range', l: 'Sut', min: 300, max: 1500, s: 10, v: 600, u: 'MPa' }, { k: 'surf', t: 'sel', l: 'Surface', o: Object.keys(SURF).map(k => [k, SURF[k][2]]), v: 'machined' }, { k: 'd', t: 'range', l: 'Diameter', min: 5, max: 200, v: 40, u: 'mm' }, { k: 'load', t: 'seg', l: 'Load', o: [['bending', 'Bending'], ['axial', 'Axial'], ['torsion', 'Torsion']], v: 'bending' }, { k: 'rel', t: 'sel', l: 'Reliability %', o: RELI.map(r => r[0]), v: '50' }, { k: 'sa', t: 'range', l: 'Applied σa', min: 50, max: 900, s: 5, v: 250, u: 'MPa' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const m = marin(st), Se = m.Se, f = st.Sut <= 480 ? 0.9 : Math.max(0.77, 0.9 - 0.13 * (st.Sut - 480) / 900), Sf = f * st.Sut;
    const a = Sf * Sf / Se, b = -Math.log10(Sf / Se) / 3, N = st.sa >= Sf ? NaN : st.sa <= Se ? Infinity : Math.pow(st.sa / a, 1 / b);
    box.innerHTML = chart({ x: [1, 1e8], y: [Math.max(10, Se * 0.4), st.Sut * 1.15], logx: true, logy: true, xl: 'cycles N (log)', yl: 'fully reversed strength Sf, MPa',
      series: [{ p: [[1, st.Sut], [1e3, Sf], [1e6, Se], [1e8, Se]], c: 'b' }, { p: [[1, st.sa], [1e8, st.sa]], c: 'o', dash: 1 }],
      pts: Number.isFinite(N) ? [[N, st.sa]] : [], labels: [[1e6, Se, 'Se = ' + fmt(Se, 0), 6, -8], [1e3, Sf, 'f·Sut at 10³', 6, -8]] });
    out.textContent = `Rotating-beam endurance limit Se′ = ${st.Sut <= 1400 ? '0.5 Sut' : '700 MPa'} = ${fmt(m.Sep, 0)} MPa\nka surface      ${fmt(m.ka, 3)}   (a·Sut^b)\nkb size         ${fmt(m.kb, 3)}\nkc load         ${fmt(m.kc, 3)}\nke reliability  ${fmt(m.ke, 3)}\nSe = Se′·ka·kb·kc·ke = ${fmt(Se, 0)} MPa   (${fmt(Se / st.Sut * 100, 0)} % of Sut)\n\nS–N line: Sf = a·N^b with a = ${fmt(a, 0)} MPa, b = ${fmt(b, 4)}\nAt σa = ${st.sa} MPa: ${st.sa >= Sf ? 'above f·Sut — low-cycle region, use strain-life' : st.sa <= Se ? 'below Se — infinite life' : 'life N ≈ ' + Math.round(N).toLocaleString('en-IN') + ' cycles'}`;
  }
  draw();
};

/* Day 8: fatigue diagram */
W.goodman = el => {
  lab(el);
  const st = form(el, [{ k: 'Sut', t: 'num', l: 'Sut', v: 620, u: 'MPa' }, { k: 'Sy', t: 'num', l: 'Sy', v: 380, u: 'MPa' }, { k: 'Se', t: 'num', l: 'Se (corrected)', v: 220, u: 'MPa' }, { k: 'sm', t: 'range', l: 'σm (mean)', min: 0, max: 500, v: 120, u: 'MPa' }, { k: 'sa', t: 'range', l: 'σa (alternating)', min: 0, max: 300, v: 80, u: 'MPa' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const { Sut, Sy, Se, sm, sa } = st, gd = 1 / (sa / Se + sm / Sut), sd = 1 / (sa / Se + sm / Sy), as = 1 / Math.hypot(sa / Se, sm / Sy), ly = Sy / (sa + sm);
    const ge = sm > 0 ? 0.5 * (Sut / sm) ** 2 * (sa / Se) * (-1 + Math.sqrt(1 + (2 * sm * Se / (Sut * sa)) ** 2)) : Se / sa;
    const gp = lin(0, Sut, 40).map(x => [x, Se * (1 - (x / Sut) ** 2)]), ep = lin(0, Sy, 40).map(x => [x, Se * Math.sqrt(Math.max(0, 1 - (x / Sy) ** 2))]);
    box.innerHTML = chart({ x: [0, Sut * 1.05], y: [0, Math.max(Se, Sy) * 1.08], h: 330, xl: 'mean stress σm, MPa', yl: 'alternating stress σa, MPa',
      series: [{ p: [[0, Se], [Sut, 0]], c: 'b' }, { p: [[0, Se], [Sy, 0]], c: 'k' }, { p: gp, c: 'o' }, { p: ep, c: 'd', dash: 1 }, { p: [[0, Sy], [Sy, 0]], c: 'd', w: 2 }, { p: [[0, 0], [sm * 10, sa * 10]], c: 'd', dash: 1 }], pts: [[sm, sa]] }) +
      '<div class="legend"><span><i style="background:var(--pri)"></i>Goodman</span><span><i style="background:var(--ink)"></i>Soderberg</span><span><i style="background:var(--acc)"></i>Gerber</span><span><i style="border:1px dashed var(--soft)"></i>ASME elliptic</span><span><i style="background:var(--soft)"></i>Langer (first-cycle yield)</span></div>';
    out.textContent = `Stress ratio R = σmin/σmax = ${fmt((sm - sa) / (sm + sa), 2)}\n\nFactor of safety along the load line\n  Soderberg     ${fmt(sd, 2)}  (most conservative)\n  Goodman       ${fmt(gd, 2)}${verdict(gd)}\n  ASME elliptic ${fmt(as, 2)}\n  Gerber        ${fmt(ge, 2)}  (closest to test data)\n  Langer yield  ${fmt(ly, 2)}${ly < 1 ? '  ⚠ yields on the first cycle' : ''}\n\nDesign value: the lower of Goodman and Langer = ${fmt(Math.min(gd, ly), 2)}`;
  }
  draw();
};

/* Day 9: ISO 286 fits */
const STEPS = [0, 3, 6, 10, 18, 30, 50, 80, 120, 180, 250, 315, 400, 500];
const ITM = { 5: 7, 6: 10, 7: 16, 8: 25, 9: 40, 10: 64, 11: 100 };
function isoRange(D) { for (let i = 1; i < STEPS.length; i++) if (D <= STEPS[i]) return [STEPS[i - 1], STEPS[i]]; return [400, 500]; }
function isoIT(D, g) { const r = isoRange(D), Dm = Math.sqrt(Math.max(1, r[0]) * r[1]), i = 0.45 * Math.cbrt(Dm) + 0.001 * Dm; return Math.round(ITM[g] * i); }
function shaftDev(D, L, g) {   /* returns [es, ei] in µm */
  const r = isoRange(D), Dm = Math.sqrt(Math.max(1, r[0]) * r[1]), IT = isoIT(D, g);
  let es, ei;
  switch (L) {
    case 'd': es = -16 * Math.pow(Dm, 0.44); break; case 'e': es = -11 * Math.pow(Dm, 0.41); break; case 'f': es = -5.5 * Math.pow(Dm, 0.41); break;
    case 'g': es = -2.5 * Math.pow(Dm, 0.34); break; case 'h': es = 0; break; case 'js': return [IT / 2, -IT / 2];
    case 'k': ei = (g >= 4 && g <= 7) ? 0.6 * Math.cbrt(Dm) : 0; break; case 'm': ei = isoIT(D, 7) - isoIT(D, 6); break; case 'n': ei = 5 * Math.pow(Dm, 0.34); break;
    case 'p': ei = isoIT(D, 7) + Math.min(5, Math.max(0, Math.round(Math.log(Dm) * 0.6 - 0.9))); break;
    case 's': ei = Dm <= 50 ? isoIT(D, 8) + Math.min(4, Math.max(1, Math.round(Dm / 15))) : isoIT(D, 7) + 0.4 * Dm; break;
  }
  if (es !== undefined) { es = Math.round(es); return [es, es - IT]; }
  ei = Math.round(ei); return [ei + IT, ei];
}
function holeDev(D, L, g) { const IT = isoIT(D, g); if (L === 'H') return [IT, 0]; if (L === 'JS') return [IT / 2, -IT / 2]; const s = shaftDev(D, L.toLowerCase(), g); return [-s[0] + IT, -s[0]]; }
SW.iso = { isoIT, shaftDev, holeDev };
W.fits = el => {
  lab(el);
  const st = form(el, [{ k: 'D', t: 'num', l: 'Basic size', v: 40, min: 1, max: 500, u: 'mm' }, { k: 'H', t: 'sel', l: 'Hole', o: ['H', 'G', 'F', 'JS'], v: 'H' }, { k: 'Hg', t: 'sel', l: 'IT', o: ['6', '7', '8', '9', '11'], v: '7' }, { k: 's', t: 'sel', l: 'Shaft', o: ['d', 'e', 'f', 'g', 'h', 'js', 'k', 'm', 'n', 'p', 's'], v: 'g' }, { k: 'sg', t: 'sel', l: 'IT', o: ['5', '6', '7', '8', '9', '11'], v: '6' }, { k: 'pre', t: 'sel', l: 'Common fit', o: [['', '— pick —'], ['H11/c11', 'H11/c11 loose running'], ['H9/d9', 'H9/d9 free running'], ['H8/f7', 'H8/f7 close running'], ['H7/g6', 'H7/g6 sliding'], ['H7/h6', 'H7/h6 locational clearance'], ['H7/k6', 'H7/k6 transition'], ['H7/n6', 'H7/n6 transition (tighter)'], ['H7/p6', 'H7/p6 locational interference'], ['H7/s6', 'H7/s6 press (medium drive)']], v: '' }], k => { if (k === 'pre' && st.pre) { const m = st.pre.match(/([A-Z]+)(\d+)\/([a-z]+)(\d+)/); if (m[3] === 'c') { m[3] = 'd'; } st.H = m[1]; st.Hg = m[2]; st.s = m[3]; st.sg = m[4]; ['H', 'Hg', 's', 'sg'].forEach(q => st._el[q].value = st[q]); } draw(); });
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const D = Math.min(500, Math.max(1, st.D)), h = holeDev(D, st.H, +st.Hg), s = shaftDev(D, st.s, +st.sg);
    const cmax = h[0] - s[1], cmin = h[1] - s[0], type = cmin >= 0 ? 'CLEARANCE fit' : cmax <= 0 ? 'INTERFERENCE fit' : 'TRANSITION fit';
    const lo = Math.min(h[1], s[1], 0) - 10, hi = Math.max(h[0], s[0], 0) + 10;
    box.innerHTML = chart({ x: [0, 4], y: [lo, hi], w: 360, h: 320, nx: 1, yl: 'deviation from basic size, µm', extra: (X, Y) => `<line class="k" x1="${X(0)}" y1="${Y(0)}" x2="${X(4)}" y2="${Y(0)}"/><text x="${X(3.95)}" y="${Y(0) - 5}" text-anchor="end" class="s">zero line = ${D} mm</text><rect x="${X(0.6)}" y="${Y(h[0])}" width="${X(1.8) - X(0.6)}" height="${Math.max(2, Y(h[1]) - Y(h[0]))}" class="fb"/><text x="${X(1.2)}" y="${Y(h[0]) - 6}" text-anchor="middle" class="bt">hole ${st.H}${st.Hg}</text><rect x="${X(2.2)}" y="${Y(s[0])}" width="${X(3.4) - X(2.2)}" height="${Math.max(2, Y(s[1]) - Y(s[0]))}" class="fo"/><text x="${X(2.8)}" y="${Y(s[1]) + 16}" text-anchor="middle" class="ot">shaft ${st.s}${st.sg}</text>` });
    const mm = v => fmt(D + v / 1000, 3);
    out.textContent = `${D} ${st.H}${st.Hg}/${st.s}${st.sg}   (size range ${isoRange(D).join('–')} mm)\nIT${st.Hg} = ${isoIT(D, +st.Hg)} µm   IT${st.sg} = ${isoIT(D, +st.sg)} µm\n\nHole  ${st.H}${st.Hg}: ${h[0] >= 0 ? '+' : ''}${h[0]} / ${h[1] >= 0 ? '+' : ''}${h[1]} µm  →  ${mm(h[1])} … ${mm(h[0])} mm\nShaft ${st.s}${st.sg}: ${s[0] >= 0 ? '+' : ''}${s[0]} / ${s[1] >= 0 ? '+' : ''}${s[1]} µm  →  ${mm(s[1])} … ${mm(s[0])} mm\n\n${type}\nMaximum ${cmax >= 0 ? 'clearance' : 'interference'}  ${Math.abs(cmax)} µm\nMinimum ${cmin >= 0 ? 'clearance' : 'interference'}  ${Math.abs(cmin)} µm\n\nDeviations are computed from the ISO 286-1 formulas and rounded; a printed table can differ by a few µm (most for p and s shafts, whose tables use finer size steps). Check the table before releasing a drawing.`;
  }
  draw();
};

/* Day 10: bolted-joint diagram */
const BOLT = { M6: [6, 1, 20.1], M8: [8, 1.25, 36.6], M10: [10, 1.5, 58], M12: [12, 1.75, 84.3], M16: [16, 2, 157], M20: [20, 2.5, 245], M24: [24, 3, 353], M30: [30, 3.5, 561], M36: [36, 4, 817] };
const GRADE = { '8.8': [600, 640, 800], '10.9': [830, 940, 1040], '12.9': [970, 1100, 1220] };
W.bolt = el => {
  lab(el);
  const st = form(el, [{ k: 'b', t: 'sel', l: 'Bolt', o: Object.keys(BOLT), v: 'M12' }, { k: 'g', t: 'sel', l: 'Property class', o: Object.keys(GRADE), v: '8.8' }, { k: 'pre', t: 'range', l: 'Preload', min: 30, max: 90, v: 75, u: '% of proof' }, { k: 'l', t: 'num', l: 'Grip length', v: 40, u: 'mm' }, { k: 'Em', t: 'sel', l: 'Clamped parts', o: [[207, 'Steel'], [100, 'Cast iron'], [71, 'Aluminium']], v: '207' }, { k: 'P', t: 'range', l: 'External load P per bolt', min: 0, max: 80, s: 0.5, v: 15, u: 'kN' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const [d, p, At] = BOLT[st.b], [Sp0, Sy, Sut] = GRADE[st.g], Sp = st.g === '8.8' && d <= 16 ? 580 : Sp0, E = 207000, Em = +st.Em * 1000, l = st.l, Ad = PI * d * d / 4;
    const lt = Math.min(l, 1.5 * d), ld = l - lt, kb = Ad * At * E / (Ad * lt + At * ld);
    const km = 0.5774 * PI * Em * d / (2 * Math.log(5 * (0.5774 * l + 0.5 * d) / (0.5774 * l + 2.5 * d)));
    const C = kb / (kb + km), Fp = Sp * At, Fi = st.pre / 100 * Fp, P = st.P * 1000, Fb = Fi + C * P, Fm = Fi - (1 - C) * P, P0 = Fi / (1 - C);
    const nL = (Sp * At - Fi) / (C * P), n0 = P0 / P, T = 0.2 * Fi * d / 1000;
    const db = Fi / kb, dm = Fi / km, xmax = (db + dm) * 1.15, ymax = Math.max(Fp, Fb) * 1.15 / 1000, dP = C * P / kb;
    box.innerHTML = chart({ x: [0, xmax * 1000], y: [0, ymax], h: 320, xl: 'deformation, µm', yl: 'force, kN',
      series: [{ p: [[0, 0], [(db + dP) * 1.3e3, (Fi + C * P) * 1.3 / 1000]], c: 'b' }, { p: [[(db - (P - C * P) / km * 0) * 1000, Fi / 1000], [(db + dm) * 1000, 0]], c: 'o' }, { p: [[0, Fp / 1000], [xmax * 1000, Fp / 1000]], c: 'd', dash: 1 }],
      extra: (X, Y) => `<line class="k" x1="${X((db + dP) * 1000)}" y1="${Y(Fb / 1000)}" x2="${X((db + dP) * 1000)}" y2="${Y(Math.max(0, Fm) / 1000)}" style="stroke-width:3"/><text x="${X((db + dP) * 1000) + 6}" y="${Y((Fb + Math.max(0, Fm)) / 2000)}">P</text>`,
      pts: [[db * 1000, Fi / 1000, 5, 'fi'], [(db + dP) * 1000, Fb / 1000]], labels: [[0, Fp / 1000, 'proof load', 4, -6, 's'], [db * 300, Fi / 1000 * 0.4, 'bolt kb', 0, 0, 'bt'], [(db + dm * 0.5) * 1000, Fi / 2000, 'members km', 6, 0, 'ot']] });
    out.textContent = `${st.b}×${p}, class ${st.g}: At = ${At} mm², proof ${Sp} MPa → proof load ${fmt(Fp / 1000, 1)} kN\nPreload Fi = ${st.pre} % = ${fmt(Fi / 1000, 1)} kN    tightening torque ≈ 0.2·Fi·d = ${fmt(T, 0)} N·m\nkb = ${fmt(kb / 1000, 0)} kN/mm   km = ${fmt(km / 1000, 0)} kN/mm   joint constant C = kb/(kb+km) = ${fmt(C, 3)}\n\nBolt force  Fb = Fi + C·P = ${fmt(Fb / 1000, 2)} kN  (bolt sees only ${fmt(C * 100, 0)} % of P)\nMember force Fm = Fi − (1−C)·P = ${fmt(Fm / 1000, 2)} kN\nLoad factor against proof   ${fmt(nL, 2)}${verdict(nL, 1.2)}\nSeparation load P₀ = ${fmt(P0 / 1000, 1)} kN → factor ${fmt(n0, 2)}${n0 < 1 ? '  ⚠ JOINT OPENS' : ''}`;
  }
  draw();
};

/* Day 11: eccentric fillet weld */
W.weld = el => {
  lab(el);
  const st = form(el, [{ k: 'P', t: 'range', l: 'Load P', min: 5, max: 150, v: 40, u: 'kN' }, { k: 'e', t: 'range', l: 'Eccentricity e', min: 0, max: 400, s: 5, v: 150, u: 'mm' }, { k: 'l', t: 'range', l: 'Weld length l (each)', min: 40, max: 300, s: 5, v: 120, u: 'mm' }, { k: 'b', t: 'range', l: 'Spacing b', min: 20, max: 250, s: 5, v: 80, u: 'mm' }, { k: 'h', t: 'range', l: 'Leg size h', min: 3, max: 20, v: 8, u: 'mm' }, { k: 'ta', t: 'num', l: 'Allowable τ', v: 94, u: 'MPa' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const P = st.P * 1000, t = 0.707 * st.h, A = 2 * st.l * t, Ju = st.l * (3 * st.b ** 2 + st.l ** 2) / 6, J = t * Ju, r = Math.hypot(st.b / 2, st.l / 2);
    const t1 = P / A, t2 = P * st.e * r / J, vx = t2 * (st.l / 2) / r, vy = -t2 * (st.b / 2) / r - t1, tr = Math.hypot(vx, vy), hreq = st.h * tr / st.ta;
    const s = 1.1 * Math.min(1, 300 / Math.max(st.b + st.e + 60, st.l + 40)), cx = 140, cy = 150, x1 = cx + st.b / 2 * s, x0 = cx - st.b / 2 * s, yt = cy - st.l / 2 * s, yb = cy + st.l / 2 * s, xp = cx + st.e * s;
    const sc = 60 / Math.max(tr, 1), arr = (x, y, dx, dy, c) => `<line class="${c}" x1="${x}" y1="${y}" x2="${x + dx}" y2="${y + dy}" style="stroke-width:2.5"/>${arrow(x + dx, y + dy, Math.atan2(dy, dx), 8)}`;
    box.innerHTML = `<svg viewBox="0 0 500 300"><rect x="${x0 - 30}" y="${yt - 10}" width="${xp - x0 + 60}" height="${yb - yt + 20}" class="fg" style="opacity:.6"/><line x1="${x0}" y1="${yt}" x2="${x0}" y2="${yb}" class="o" style="stroke-width:7"/><line x1="${x1}" y1="${yt}" x2="${x1}" y2="${yb}" class="o" style="stroke-width:7"/><circle cx="${cx}" cy="${cy}" r="4" class="fi"/><text x="${cx + 6}" y="${cy - 6}" class="s">G</text><line class="k" x1="${xp}" y1="${cy - 90}" x2="${xp}" y2="${cy - 12}"/>${arrow(xp, cy - 10, PI / 2, 11)}<text x="${xp + 6}" y="${cy - 80}" class="ot">P</text>${dimL(cx, cy + st.l / 2 * s + 26, xp, cy + st.l / 2 * s + 26, 'e ' + st.e)}${arr(x1, yt, 0, t1 * sc, 'd')}${arr(x1, yt, vx * sc, -(vy + t1) * sc, 'b')}${arr(x1, yt, vx * sc, -vy * sc, 'o')}<text x="${x1 + 10}" y="${yt - 22}" class="ot">critical corner: ${fmt(tr, 0)} MPa</text></svg><div class="legend"><span><i style="background:var(--soft)"></i>primary τ₁ (direct)</span><span><i style="background:var(--pri)"></i>secondary τ₂ (torsion)</span><span><i style="background:var(--acc)"></i>resultant</span></div>`;
    out.textContent = `Throat t = 0.707 h = ${fmt(t, 2)} mm   throat area A = ${fmt(A, 0)} mm²\nUnit polar moment Ju = l(3b² + l²)/6 = ${fmt(Ju, 0)} mm³   J = t·Ju = ${fmt(J, 0)} mm⁴\nPrimary shear τ₁ = P/A = ${fmt(t1, 1)} MPa\nSecondary shear τ₂ = P·e·r/J = ${fmt(t2, 1)} MPa  (r = ${fmt(r, 1)} mm to the far corner)\nResultant at the corner τ = ${fmt(tr, 1)} MPa  vs allowable ${st.ta} → ${tr <= st.ta ? '✓ OK' : '⚠ too high'}\nLeg size needed: h ≥ ${fmt(hreq, 1)} mm → use ${Math.ceil(hreq)} mm`;
  }
  draw();
};

/* Day 12: power screw */
W.screw = el => {
  lab(el);
  const st = form(el, [{ k: 'ty', t: 'seg', l: 'Thread', o: [['0', 'Square'], ['15', 'Trapezoidal 30°'], ['14.5', 'ACME 29°']], v: '15' }, { k: 'd', t: 'num', l: 'Nominal Ø', v: 40, u: 'mm' }, { k: 'p', t: 'num', l: 'Pitch', v: 7, u: 'mm' }, { k: 'n', t: 'seg', l: 'Starts', o: [['1', '1'], ['2', '2'], ['3', '3']], v: '1' }, { k: 'mu', t: 'range', l: 'Thread μ', min: 0.05, max: 0.25, s: 0.01, v: 0.12 }, { k: 'mc', t: 'range', l: 'Collar μc', min: 0, max: 0.25, s: 0.01, v: 0.12 }, { k: 'dc', t: 'num', l: 'Collar mean Ø', v: 60, u: 'mm' }, { k: 'W', t: 'num', l: 'Load W', v: 50, u: 'kN' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const W2 = st.W * 1000, dm = st.d - st.p / 2, L = st.p * +st.n, lam = Math.atan(L / (PI * dm)), mu = st.mu / Math.cos(rad(+st.ty));
    const Tr = W2 * dm / 2 * (L + PI * mu * dm) / (PI * dm - mu * L), Tl = W2 * dm / 2 * (PI * mu * dm - L) / (PI * dm + mu * L), Tc = W2 * st.mc * st.dc / 2;
    const eta = W2 * L / (2 * PI * (Tr + Tc)), eta0 = W2 * L / (2 * PI * Tr), lock = Tl > 0;
    const curve = lin(1, 60, 60).map(a => { const t = Math.tan(rad(a)); return [a, (1 - mu * t) / (1 + mu / t) * 100]; });
    box.innerHTML = chart({ x: [0, 60], y: [0, 100], xl: 'helix (lead) angle λ, °', yl: 'efficiency η, % (no collar)', series: [{ p: curve }, { p: [[deg(Math.atan(mu)), 0], [deg(Math.atan(mu)), 100]], c: 'o', dash: 1 }], pts: [[deg(lam), eta0 * 100]], labels: [[deg(Math.atan(mu)), 92, 'self-locking below λ = φ', 4, 0, 'ot']] });
    out.textContent = `Mean Ø dm = d − p/2 = ${fmt(dm, 1)} mm   lead = ${L} mm   λ = ${fmt(deg(lam), 2)}°\nEffective μ′ = μ/cos α = ${fmt(mu, 3)}   friction angle φ = ${fmt(deg(Math.atan(mu)), 2)}°\n\nTorque to raise  ${fmt(Tr / 1000, 1)} N·m (thread) + ${fmt(Tc / 1000, 1)} N·m (collar) = ${fmt((Tr + Tc) / 1000, 1)} N·m\nTorque to lower  ${fmt((Tl + Tc) / 1000, 1)} N·m\nEfficiency       ${fmt(eta * 100, 1)} %  (thread alone ${fmt(eta0 * 100, 1)} %)\n${lock ? '✓ Self-locking: the load will not run the screw down (λ < φ).' : '⚠ NOT self-locking: the load will drive the screw down — add a brake.'}\nSelf-locking screws always have η < 50 %.`;
  }
  draw();
};

/* Day 13: shaft diameter */
W.shaft = el => {
  lab(el);
  const st = form(el, [{ k: 'P', t: 'num', l: 'Power', v: 15, u: 'kW' }, { k: 'n', t: 'num', l: 'Speed', v: 720, u: 'rpm' }, { k: 'M', t: 'num', l: 'Max bending moment', v: 450, u: 'N·m' }, { k: 'Kb', t: 'sel', l: 'Shock factor Kb', o: [[1.5, '1.5 gradual'], [2, '2.0 minor shock'], [3, '3.0 heavy shock']], v: '1.5' }, { k: 'Kt', t: 'sel', l: 'Kt', o: [[1, '1.0 gradual'], [1.5, '1.5 minor shock'], [3, '3.0 heavy shock']], v: '1' }, { k: 'Sy', t: 'num', l: 'Syt', v: 380, u: 'MPa' }, { k: 'Su', t: 'num', l: 'Sut', v: 620, u: 'MPa' }, { k: 'kw', t: 'chk', l: 'Keyway at the section (×0.75)', v: true }, { k: 'Se', t: 'num', l: 'Se (for DE-Goodman)', v: 230, u: 'MPa' }, { k: 'Kf', t: 'num', l: 'Kf', v: 1.7 }, { k: 'Kfs', t: 'num', l: 'Kfs', v: 1.5 }, { k: 'nf', t: 'num', l: 'Design factor n', v: 2 }], draw);
  const out = div(el, 'out');
  function draw() {
    const T = st.P * 1000 * 60 / (2 * PI * st.n), M = st.M, ta = Math.min(0.3 * st.Sy, 0.18 * st.Su) * (st.kw ? 0.75 : 1);
    const Te = Math.hypot(+st.Kb * M, +st.Kt * T), d1 = Math.cbrt(16 * Te * 1000 / (PI * ta));
    const d2 = Math.cbrt(16 * st.nf / PI * (2 * st.Kf * M * 1000 / st.Se + Math.sqrt(3) * st.Kfs * T * 1000 / st.Su));
    out.textContent = `Torque T = 60·P/(2πn) = ${fmt(T, 1)} N·m\n\nASME code (static + shock factors)\n  Allowable τ = min(0.30 Syt, 0.18 Sut)${st.kw ? ' × 0.75' : ''} = ${fmt(ta, 1)} MPa\n  Equivalent torque Te = √((Kb·M)² + (Kt·T)²) = ${fmt(Te, 1)} N·m\n  d = (16·Te / (π·τ))^(1/3) = ${fmt(d1, 2)} mm  → standard ${nextStd(d1)} mm\n\nDE-Goodman (fatigue: rotating bending Ma = M, steady torque Tm = T)\n  d = [16n/π · (2·Kf·Ma/Se + √3·Kfs·Tm/Sut)]^(1/3) = ${fmt(d2, 2)} mm  → standard ${nextStd(d2)} mm\n\nGoverns: ${d2 > d1 ? 'fatigue (DE-Goodman)' : 'ASME code'} — choose ${nextStd(Math.max(d1, d2))} mm, then check deflection and critical speed (Day 14).`;
  }
  draw();
};

/* Day 14: critical speed */
W.crit = el => {
  lab(el);
  const st = form(el, [{ k: 'L', t: 'range', l: 'Span L', min: 300, max: 2000, s: 10, v: 900, u: 'mm' }, { k: 'd', t: 'range', l: 'Shaft Ø d', min: 20, max: 120, v: 50, u: 'mm' }, { k: 'm1', t: 'range', l: 'Disc 1 mass', min: 0, max: 100, v: 30, u: 'kg' }, { k: 'a1', t: 'range', l: 'at', min: 5, max: 95, v: 30, u: '% of L' }, { k: 'm2', t: 'range', l: 'Disc 2 mass', min: 0, max: 100, v: 20, u: 'kg' }, { k: 'a2', t: 'range', l: 'at', min: 5, max: 95, v: 70, u: '% of L' }, { k: 'n', t: 'num', l: 'Running speed', v: 1450, u: 'rpm' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const L = st.L / 1000, d = st.d / 1000, E = 207e9, I = PI * d ** 4 / 64, rhoA = 7850 * PI * d * d / 4;
    const alpha = (x, a) => { const b = L - a; return x <= a ? b * x * (L * L - b * b - x * x) / (6 * E * I * L) : a * (L - x) * (L * L - a * a - (L - x) ** 2) / (6 * E * I * L); };
    const ds = [[st.m1, st.a1 / 100 * L], [st.m2, st.a2 / 100 * L]].filter(q => q[0] > 0);
    const y = x => ds.reduce((s, q) => s + q[0] * G * alpha(x, q[1]), 0);
    const ws = PI * PI / (L * L) * Math.sqrt(E * I / rhoA), ys = ds.map(q => y(q[1]));
    const wR = ds.length ? Math.sqrt(G * ds.reduce((s, q, i) => s + q[0] * ys[i], 0) / ds.reduce((s, q, i) => s + q[0] * ys[i] ** 2, 0)) : Infinity;
    const wD = 1 / Math.sqrt(ds.reduce((s, q) => s + q[0] * alpha(q[1], q[1]), 0) + 1 / ws ** 2);
    const wRs = 1 / Math.sqrt(1 / wR ** 2 + 1 / ws ** 2), rpm = w => w * 60 / (2 * PI), nc = rpm(wD), ratio = st.n / nc;
    const shape = lin(0, L, 60).map(x => [x * 1000, y(x) * 1e6]), ym = Math.max(10, ...shape.map(p => p[1])) * 1.3;
    box.innerHTML = chart({ x: [0, st.L], y: [-ym * 0.3, ym], h: 260, xl: 'position along shaft, mm', yl: 'static deflection, µm', series: [{ p: shape }, { p: [[0, 0], [st.L, 0]], c: 'd' }], pts: ds.map((q, i) => [q[1] * 1000, ys[i] * 1e6, 5 + q[0] / 10]), extra: (X, Y) => `<polygon points="${X(0)},${Y(0)} ${X(0) - 10},${Y(0) - 16} ${X(0) + 10},${Y(0) - 16}" class="fg" transform="rotate(180 ${X(0)} ${Y(0)})"/><polygon points="${X(st.L)},${Y(0)} ${X(st.L) - 10},${Y(0) + 16} ${X(st.L) + 10},${Y(0) + 16}" class="fg"/>` });
    out.textContent = `Shaft alone (simply supported): ωs = (π/L)²·√(EI/ρA) → ${fmt(rpm(ws), 0)} rpm\nStatic deflection under discs: ${ys.map(v => fmt(v * 1e6, 1) + ' µm').join(', ')}\n\nRayleigh (discs + shaft by Dunkerley): ${fmt(rpm(wRs), 0)} rpm  (upper estimate)\nDunkerley: 1/ω² = Σ 1/ωi²            ${fmt(nc, 0)} rpm  (lower estimate)\n\nRunning ${st.n} rpm = ${fmt(ratio * 100, 0)} % of the critical speed → ${ratio < 0.7 ? '✓ sub-critical with margin' : ratio < 1.3 ? '⚠ TOO CLOSE to resonance — stiffen the shaft or move the discs' : 'super-critical: run up through resonance quickly, balance well'}`;
  }
  draw();
};

/* Day 15: key + flange coupling */
const KEYS = [[6, 8, 2, 2], [8, 10, 3, 3], [10, 12, 4, 4], [12, 17, 5, 5], [17, 22, 6, 6], [22, 30, 8, 7], [30, 38, 10, 8], [38, 44, 12, 8], [44, 50, 14, 9], [50, 58, 16, 10], [58, 65, 18, 11], [65, 75, 20, 12], [75, 85, 22, 14], [85, 95, 25, 14], [95, 110, 28, 16], [110, 130, 32, 18]];
W.key = el => {
  lab(el);
  const st = form(el, [{ k: 'd', t: 'range', l: 'Shaft Ø', min: 10, max: 130, v: 45, u: 'mm' }, { k: 'T', t: 'num', l: 'Torque', v: 600, u: 'N·m' }, { k: 'l', t: 'range', l: 'Key length', min: 10, max: 200, s: 2, v: 60, u: 'mm' }, { k: 'ts', t: 'num', l: 'Key allowable τ', v: 70, u: 'MPa' }, { k: 'sc', t: 'num', l: 'Allowable crushing σc', v: 140, u: 'MPa' }, { k: 'nb', t: 'sel', l: 'Coupling bolts', o: ['3', '4', '6', '8'], v: '4' }, { k: 'D1', t: 'num', l: 'Bolt PCD', v: 150, u: 'mm' }, { k: 'tb', t: 'num', l: 'Bolt allowable τ', v: 60, u: 'MPa' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const k = KEYS.find(r => st.d > r[0] && st.d <= r[1]) || KEYS[KEYS.length - 1], b = k[2], h = k[3], T = st.T * 1000;
    const tau = 2 * T / (st.d * b * st.l), sig = 4 * T / (st.d * h * st.l), lreq = Math.max(2 * T / (st.d * b * st.ts), 4 * T / (st.d * h * st.sc));
    const n = +st.nb, db = Math.sqrt(8 * T / (PI * st.tb * n * st.D1)), Ms = [6, 8, 10, 12, 16, 20, 24, 30, 36], Mb = Ms.find(m => m * 0.85 >= db) || 42;
    const tsh = 16 * T / (PI * st.d ** 3), s = 2.2, cx = 110, cy = 110, R = st.d / 2 * s * 0.9 > 90 ? 90 : st.d / 2 * s * 0.9, kb = b / st.d * 2 * R, kh = h / st.d * 2 * R;
    box.innerHTML = `<svg viewBox="0 0 220 220"><circle cx="${cx}" cy="${cy}" r="${R * 1.6}" class="fg"/><circle cx="${cx}" cy="${cy}" r="${R}" class="fb"/><rect x="${cx - kb / 2}" y="${cy - R - kh / 2}" width="${kb}" height="${kh}" class="fo"/><text x="${cx}" y="${cy + 6}" text-anchor="middle">Ø${st.d}</text><text x="${cx}" y="${cy - R - kh / 2 - 6}" text-anchor="middle" class="ot">${b}×${h}</text></svg>`;
    out.textContent = `Shaft ${st.d} mm → standard parallel key b×h = ${b}×${h} (IS 2292 / ISO R773)\nShaft torsional stress 16T/πd³ = ${fmt(tsh, 1)} MPa\n\nKey shear     τ = 2T/(d·b·l) = ${fmt(tau, 1)} MPa  (allow ${st.ts}) ${tau <= st.ts ? '✓' : '⚠'}\nKey crushing  σc = 4T/(d·h·l) = ${fmt(sig, 1)} MPa  (allow ${st.sc}) ${sig <= st.sc ? '✓' : '⚠'}\nMinimum key length ${fmt(lreq, 1)} mm  (hub length is usually ≥ 1.5 d = ${fmt(1.5 * st.d, 0)} mm)\n\nFlange coupling, ${n} bolts on PCD ${st.D1} mm (fitted bolts, shear)\n  bolt Ø needed = √(8T/(π·τ·n·D₁)) = ${fmt(db, 2)} mm → use M${Mb}\n  The key and bolts should both be weaker than the shaft, so they fail first.`;
  }
  draw();
};

/* Day 16: helical compression spring */
const WIRE = { music: [2211, 0.145, 'Music wire (patented, cold drawn)'], oq: [1855, 0.187, 'Oil-hardened and tempered'], hd: [1783, 0.190, 'Hard-drawn'], crv: [2005, 0.168, 'Chrome-vanadium'], crsi: [1974, 0.108, 'Chrome-silicon'] };
W.spring = el => {
  lab(el);
  const st = form(el, [{ k: 'w', t: 'sel', l: 'Wire', o: Object.keys(WIRE).map(k => [k, WIRE[k][2]]), v: 'oq' }, { k: 'd', t: 'range', l: 'Wire Ø d', min: 1, max: 12, s: 0.1, v: 4, u: 'mm' }, { k: 'D', t: 'range', l: 'Mean coil Ø D', min: 8, max: 100, v: 32, u: 'mm' }, { k: 'Na', t: 'range', l: 'Active coils Na', min: 2, max: 30, s: 0.5, v: 8 }, { k: 'end', t: 'sel', l: 'Ends', o: [['0', 'Plain'], ['1', 'Plain + ground'], ['2', 'Squared'], ['3', 'Squared + ground']], v: '3' }, { k: 'F', t: 'range', l: 'Working load F', min: 10, max: 3000, s: 10, v: 400, u: 'N' }], draw);
  const ctl = div(el, 'ctl'); let ph = 0; animCtl(ctl, el, dt => { ph += dt * 2; draw(); }, () => { ph += 0.4; draw(); });
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const Gm = 79300, { d, D, Na, F } = st, C = D / d, Kw = (4 * C - 1) / (4 * C - 4) + 0.615 / C, k = Gm * d ** 4 / (8 * D ** 3 * Na), tau = Kw * 8 * F * D / (PI * d ** 3);
    const wr = WIRE[st.w], Sut = wr[0] / Math.pow(d, wr[1]), Ssy = 0.45 * Sut, e = +st.end, Nt = Na + (e >= 2 ? 2 : e === 1 ? 1 : 0), Ls = d * (e === 1 || e === 3 ? Nt : Nt + 1);
    const y = F / k, L0 = Ls + 1.15 * y, fn = d / (2 * PI * D * D * Na) * Math.sqrt(Gm * 1e6 / (2 * 7850)) * 1000, buck = L0 / D, Fs = k * (L0 - Ls), ts = tau * Fs / F;
    const n = Math.round(Nt * 4), comp = 0.5 + 0.5 * Math.sin(ph), Lnow = L0 - comp * y, sx = 300 / Math.max(L0, 1), H = Math.min(90, D * 1.5);
    let p = []; for (let i = 0; i <= n * 8; i++) { const t = i / (n * 8); p.push([20 + t * Lnow * sx, 100 + Math.sin(t * Nt * 2 * PI) * H / 2]); }
    box.innerHTML = `<svg viewBox="0 0 360 200"><line class="k" x1="18" y1="${100 - H / 2 - 10}" x2="18" y2="${100 + H / 2 + 10}" style="stroke-width:4"/><line class="k" x1="${22 + Lnow * sx}" y1="${100 - H / 2 - 10}" x2="${22 + Lnow * sx}" y2="${100 + H / 2 + 10}" style="stroke-width:4"/><polyline class="b" points="${pts(p)}" style="stroke-width:${Math.max(2, d * sx * 0.6)}"/><text x="20" y="190" class="s">length ${fmt(Lnow, 1)} mm (free ${fmt(L0, 1)}, solid ${fmt(Ls, 1)})</text></svg>`;
    out.textContent = `Spring index C = D/d = ${fmt(C, 2)} ${C < 4 ? '⚠ hard to coil' : C > 12 ? '⚠ tangles / buckles' : '✓ (4–12)'}\nWahl factor Kw = ${fmt(Kw, 3)}\nRate k = Gd⁴/(8D³Na) = ${fmt(k, 2)} N/mm\nShear stress at F: τ = Kw·8FD/(πd³) = ${fmt(tau, 0)} MPa\nWire Sut = A/d^m = ${fmt(Sut, 0)} MPa → allowable Ssy ≈ 0.45 Sut = ${fmt(Ssy, 0)} MPa  ${tau <= Ssy ? '✓' : '⚠ overstressed'}\nStress when closed solid ${fmt(ts, 0)} MPa ${ts <= Ssy ? '✓ safe at solid' : '⚠ sets if closed solid'}\n\nDeflection at F ${fmt(y, 1)} mm   total coils ${Nt}   solid length ${fmt(Ls, 1)} mm\nFree length (15 % clash allowance) ${fmt(L0, 1)} mm\nL0/D = ${fmt(buck, 2)} ${buck > 5.26 ? '⚠ will buckle even with fixed ends — use a guide' : buck > 2.63 ? '— needs flat, parallel (fixed) ends' : '✓ stable'}\nSurge frequency ${fmt(fn, 0)} Hz — keep it > 13 × the operating frequency`;
  }
  draw();
};

/* Day 17: plate / cone clutch */
W.clutch = el => {
  lab(el);
  const st = form(el, [{ k: 'Do', t: 'range', l: 'Outer Ø Do', min: 100, max: 500, s: 5, v: 300, u: 'mm' }, { k: 'Di', t: 'range', l: 'Inner Ø Di', min: 40, max: 480, s: 5, v: 180, u: 'mm' }, { k: 'mu', t: 'range', l: 'μ', min: 0.1, max: 0.5, s: 0.01, v: 0.3 }, { k: 'pa', t: 'range', l: 'Max pressure pa', min: 0.1, max: 2, s: 0.05, v: 0.35, u: 'MPa' }, { k: 'ns', t: 'sel', l: 'Friction surfaces', o: ['1', '2', '4', '6', '8'], v: '2' }, { k: 'al', t: 'range', l: 'Cone semi-angle α (90 = plate)', min: 8, max: 90, v: 90, u: '°' }, { k: 'n', t: 'num', l: 'Speed', v: 1440, u: 'rpm' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const Ro = st.Do / 2, Ri = Math.min(st.Di, st.Do - 10) / 2, n = +st.ns, s = Math.sin(rad(st.al)), pa = st.pa;
    const Fw = 2 * PI * pa * Ri * (Ro - Ri), Tw = n * PI * st.mu * pa * Ri * (Ro * Ro - Ri * Ri) / s;
    const Fp = PI * pa * (Ro * Ro - Ri * Ri), Tp = n * 2 / 3 * st.mu * Fp * (Ro ** 3 - Ri ** 3) / (Ro * Ro - Ri * Ri) / s;
    const P = Tw / 1000 * 2 * PI * st.n / 60 / 1000;
    const cw = lin(0.05, 0.98, 60).map(r => [r, n * PI * st.mu * pa * (r * Ro) * (Ro * Ro - (r * Ro) ** 2) / s / 1e6]);
    box.innerHTML = chart({ x: [0, 1], y: [0, Math.max(...cw.map(p => p[1])) * 1.15], xl: 'Ri / Ro', yl: 'torque at pa (uniform wear), kN·m', series: [{ p: cw }, { p: [[0.577, 0], [0.577, 1e6]], c: 'o', dash: 1 }], pts: [[Ri / Ro, Tw / 1e6]], labels: [[0.577, 0, 'optimum 0.577', 4, -8, 'ot']] });
    out.textContent = `${st.al >= 89 ? 'Plate' : 'Cone'} clutch, ${n} friction surface(s)${st.al < 89 ? ', α = ' + st.al + '° (torque ÷ sin α, axial force for engagement is larger)' : ''}\n\nUniform WEAR (worn-in clutch — design on this)\n  Axial force W = 2π·pa·Ri·(Ro−Ri) = ${fmt(Fw / 1000, 2)} kN\n  Torque T = ${fmt(Tw / 1000, 1)} N·m   → power at ${st.n} rpm = ${fmt(P, 1)} kW\nUniform PRESSURE (new clutch)\n  Axial force W = π·pa·(Ro²−Ri²) = ${fmt(Fp / 1000, 2)} kN\n  Torque T = ${fmt(Tp / 1000, 1)} N·m\n\nRi/Ro = ${fmt(Ri / Ro, 3)}; uniform-wear torque is greatest at Ri = 0.577 Ro.`;
  }
  draw();
};

/* Day 18: band brake + temperature rise */
W.brake = el => {
  lab(el);
  const st = form(el, [{ k: 'r', t: 'num', l: 'Drum radius', v: 250, u: 'mm' }, { k: 'th', t: 'range', l: 'Wrap angle', min: 90, max: 330, s: 5, v: 270, u: '°' }, { k: 'mu', t: 'range', l: 'μ', min: 0.1, max: 0.5, s: 0.01, v: 0.3 }, { k: 'T1', t: 'range', l: 'Tight-side tension T1', min: 1, max: 30, s: 0.5, v: 10, u: 'kN' }, { k: 'a', t: 'num', l: 'Slack end to pivot a', v: 60, u: 'mm' }, { k: 'll', t: 'num', l: 'Lever length', v: 600, u: 'mm' }, { k: 'w', t: 'num', l: 'Band width', v: 80, u: 'mm' }, { k: 'I', t: 'num', l: 'Inertia to stop', v: 12, u: 'kg·m²' }, { k: 'n', t: 'num', l: 'from speed', v: 960, u: 'rpm' }, { k: 'md', t: 'num', l: 'Drum mass', v: 40, u: 'kg' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const th = rad(st.th), ef = Math.exp(st.mu * th), T1 = st.T1 * 1000, T2 = T1 / ef, Tq = (T1 - T2) * st.r / 1000, P = T2 * st.a / st.ll, pmax = T1 / (st.w * st.r);
    const w = st.n * 2 * PI / 60, E = 0.5 * st.I * w * w, dT = E / (st.md * 460);
    const cur = lin(0, th, 60).map(t => [deg(t), T2 * Math.exp(st.mu * t) / 1000]);
    box.innerHTML = chart({ x: [0, st.th], y: [0, st.T1 * 1.1], xl: 'angle round the drum from slack end, °', yl: 'band tension, kN', series: [{ p: cur }], pts: [[0, T2 / 1000, 5, 'fp'], [st.th, st.T1]], labels: [[0, T2 / 1000, 'T2', 6, -8], [st.th, st.T1, 'T1', -22, -8, 'ot']] });
    out.textContent = `Tension ratio T1/T2 = e^(μθ) = ${fmt(ef, 2)}\nT1 = ${fmt(T1 / 1000, 2)} kN   T2 = ${fmt(T2 / 1000, 2)} kN\nBraking torque (T1 − T2)·r = ${fmt(Tq, 0)} N·m\nLever force (slack end on lever) P = T2·a/l = ${fmt(P, 0)} N\nMax lining pressure p = T1/(w·r) = ${fmt(pmax, 2)} MPa (at the tight end)\n\nEnergy per stop ½Iω² = ${fmt(E / 1000, 1)} kJ\nDrum temperature rise ΔT = E/(m·c) = ${fmt(dT, 1)} °C per stop ${dT > 50 ? '⚠ hot — add mass, fins or cooling time' : '✓'}\nIf the slack end is on the lever the brake is self-energising in this direction; reverse rotation needs T1·a/l.`;
  }
  draw();
};

/* Day 19: belt power vs speed */
W.belt = el => {
  lab(el);
  const st = form(el, [{ k: 'ty', t: 'seg', l: 'Belt', o: [['flat', 'Flat'], ['v', 'V-belt (2β = 40°)']], v: 'v' }, { k: 'D1', t: 'num', l: 'Driver Ø', v: 150, u: 'mm' }, { k: 'D2', t: 'num', l: 'Driven Ø', v: 400, u: 'mm' }, { k: 'C', t: 'num', l: 'Centre distance', v: 800, u: 'mm' }, { k: 'n1', t: 'range', l: 'Driver speed', min: 100, max: 3000, s: 10, v: 1440, u: 'rpm' }, { k: 'mu', t: 'range', l: 'μ', min: 0.15, max: 0.5, s: 0.01, v: 0.3 }, { k: 'Tm', t: 'num', l: 'Allowable tension', v: 500, u: 'N' }, { k: 'm', t: 'num', l: 'Mass per metre', v: 0.19, u: 'kg/m' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const D1 = Math.min(st.D1, st.D2), D2 = Math.max(st.D1, st.D2), th = PI - 2 * Math.asin((D2 - D1) / (2 * st.C)), mu = st.ty === 'v' ? st.mu / Math.sin(rad(20)) : st.mu;
    const L = 2 * st.C + PI / 2 * (D1 + D2) + (D2 - D1) ** 2 / (4 * st.C), ef = Math.exp(mu * th), k = 1 - 1 / ef;
    const Pv = v => Math.max(0, (st.Tm - st.m * v * v) * k * v / 1000), v = PI * st.D1 * st.n1 / 60000, vopt = Math.sqrt(st.Tm / (3 * st.m)), vmax = Math.sqrt(st.Tm / st.m);
    const cur = lin(0, vmax, 80).map(x => [x, Pv(x)]);
    box.innerHTML = chart({ x: [0, vmax * 1.02], y: [0, Pv(vopt) * 1.2], xl: 'belt speed v, m/s', yl: 'power per belt, kW', series: [{ p: cur }, { p: [[vopt, 0], [vopt, 1e4]], c: 'o', dash: 1 }], pts: [[v, Pv(v)]], labels: [[vopt, 0, 'v_opt = √(T/3m)', 4, -8, 'ot']] });
    const Tc = st.m * v * v, T1 = st.Tm - Tc, T2 = (st.Tm - Tc) / ef + Tc;
    out.textContent = `Angle of lap on the small pulley θ = ${fmt(deg(th), 1)}°\nBelt pitch length L = ${fmt(L, 0)} mm   speed ratio ${fmt(D2 / D1, 2)}\n${st.ty === 'v' ? `Effective μ′ = μ/sin β = ${fmt(mu, 3)} (wedge action)\n` : ''}e^(μθ) = ${fmt(ef, 2)}\n\nAt v = ${fmt(v, 2)} m/s: centrifugal tension m·v² = ${fmt(Tc, 0)} N\n  tight side ${fmt(st.Tm, 0)} N, slack side ${fmt(T2, 0)} N\n  power per belt P = (Tmax − mv²)(1 − e^(−μθ))·v = ${fmt(Pv(v), 2)} kW\nMaximum power at v = ${fmt(vopt, 1)} m/s: ${fmt(Pv(vopt), 2)} kW (there Tc = Tmax/3)\nAbove ${fmt(vmax, 1)} m/s the belt transmits nothing — centrifugal tension uses it all.`;
  }
  draw();
};

/* Day 20: chain length + polygon effect */
const CHAIN = { '08B (12.7)': 12.7, '10B (15.875)': 15.875, '12B (19.05)': 19.05, '16B (25.4)': 25.4, '20B (31.75)': 31.75 };
W.chain = el => {
  lab(el);
  const st = form(el, [{ k: 'c', t: 'sel', l: 'Chain (pitch mm)', o: Object.keys(CHAIN), v: '12B (19.05)' }, { k: 'z1', t: 'range', l: 'Driver teeth z1', min: 9, max: 35, v: 17 }, { k: 'z2', t: 'range', l: 'Driven teeth z2', min: 9, max: 120, v: 51 }, { k: 'a', t: 'range', l: 'Centre distance', min: 20, max: 80, v: 40, u: 'pitches' }, { k: 'n', t: 'num', l: 'Driver speed', v: 720, u: 'rpm' }], draw);
  const ctl = div(el, 'ctl'); let ang = 0; animCtl(ctl, el, dt => { ang += dt * 0.8; draw(); }, () => { ang += PI / st.z1 / 3; draw(); });
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const p = CHAIN[st.c], { z1, z2, a } = st, Ln = 2 * a + (z1 + z2) / 2 + ((z2 - z1) / (2 * PI)) ** 2 / a, Le = Math.ceil(Ln / 2) * 2;
    const v = z1 * p * st.n / 60000, vr = (1 - Math.cos(PI / z1)) * 100, D1 = p / Math.sin(PI / z1);
    const R = 70, cx = 110, cy = 120, step = 2 * PI / z1, ph = ((ang % step) + step) % step - step / 2, top = R * Math.cos(ph);
    let poly = []; for (let i = 0; i < z1; i++) { const t = ang + i * step - PI / 2; poly.push([cx + R * Math.cos(t), cy + R * Math.sin(t)]); }
    const sp = lin(0, 4 * step, 120).map(t => { const q = ((t % step) + step) % step - step / 2; return [deg(t), 100 * Math.cos(q)]; });
    const g = chart({ x: [0, deg(4 * step)], y: [100 - vr * 1.6 - 0.2, 100.2], w: 300, h: 220, l: 52, xl: 'sprocket rotation, °', yl: 'chain speed, % of max', series: [{ p: sp }], pts: [[deg((ang % (4 * step) + 4 * step) % (4 * step)), 100 * Math.cos(ph), 5]] });
    box.innerHTML = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:start"><svg viewBox="0 0 260 220"><polygon points="${pts(poly)}" class="fb"/>${poly.map(q => `<circle cx="${q[0]}" cy="${q[1]}" r="4" class="fi"/>`).join('')}<line class="o" x1="${cx}" y1="${cy - top}" x2="250" y2="${cy - top}" style="stroke-width:4"/><line class="cl" x1="${cx}" y1="${cy - R}" x2="250" y2="${cy - R}"/><circle cx="${cx}" cy="${cy}" r="4" class="fi"/><text x="10" y="212" class="s">chain rises and falls by ${fmt(R * (1 - Math.cos(PI / z1)) / R * D1 / 2, 2)} mm</text></svg>${g}</div>`;
    out.textContent = `Pitch p = ${p} mm   pitch Ø of driver = p/sin(180°/z1) = ${fmt(D1, 1)} mm\nLength in links = 2a/p + (z1+z2)/2 + ((z2−z1)/2π)²·p/a = ${fmt(Ln, 2)} → use ${Le} (even, no offset link)\nRatio ${fmt(z2 / z1, 2)}   driven speed ${fmt(st.n * z1 / z2, 0)} rpm\nChain speed v = z·p·n/60000 = ${fmt(v, 2)} m/s ${v > 12 ? '⚠ above ~12 m/s needs forced lubrication' : ''}\nPolygonal speed variation 1 − cos(180°/z1) = ${fmt(vr, 2)} % ${z1 < 17 ? '⚠ few teeth: rough running — use ≥ 17 (≥ 21 at speed)' : '✓'}\nPress P to watch the chain line rise and fall as the sprocket turns.`;
  }
  draw();
};

/* Day 21: involute gear pair */
function gearOutline(m, z, phi, rot) {
  const r = m * z / 2, rb = r * Math.cos(phi), ra = r + m, rf = r - 1.25 * m, inv = a => Math.tan(a) - a, psi = PI / (2 * z), out = [];
  const flank = []; const r0 = Math.max(rb, rf);
  for (let i = 0; i <= 8; i++) { const rr = r0 + (ra - r0) * i / 8, al = Math.acos(Math.min(1, rb / rr)); flank.push([rr, psi + inv(phi) - inv(al)]); }
  for (let k = 0; k < z; k++) {
    const c = rot + k * 2 * PI / z, P = (rr, t) => [rr * Math.cos(t), rr * Math.sin(t)];
    out.push(P(rf, c - flank[0][1] - (rf < rb ? 0 : 0)));
    flank.forEach(f => out.push(P(f[0], c - f[1])));
    flank.slice().reverse().forEach(f => out.push(P(f[0], c + f[1])));
    out.push(P(rf, c + flank[0][1]));
    const nx = c + 2 * PI / z - flank[0][1]; for (let j = 1; j < 4; j++) out.push(P(rf, c + flank[0][1] + (nx - c - flank[0][1]) * j / 4));
  }
  return out;
}
W.involute = el => {
  lab(el);
  const st = form(el, [{ k: 'm', t: 'sel', l: 'Module', o: ['1', '1.5', '2', '2.5', '3', '4', '5', '6', '8', '10'], v: '4' }, { k: 'z1', t: 'range', l: 'Pinion z1', min: 8, max: 40, v: 18 }, { k: 'z2', t: 'range', l: 'Gear z2', min: 12, max: 80, v: 36 }, { k: 'phi', t: 'seg', l: 'Pressure angle', o: [['14.5', '14½°'], ['20', '20°'], ['25', '25°']], v: '20' }], draw);
  const ctl = div(el, 'ctl'); let th = 0; animCtl(ctl, el, dt => { th += dt * 0.35; draw(); }, () => { th += 2 * PI / st.z1 / 6; draw(); });
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const m = +st.m, z1 = st.z1, z2 = st.z2, phi = rad(+st.phi), r1 = m * z1 / 2, r2 = m * z2 / 2, a = r1 + r2, rb1 = r1 * Math.cos(phi), rb2 = r2 * Math.cos(phi), ra1 = r1 + m, ra2 = r2 + m;
    const Lc = Math.sqrt(ra1 * ra1 - rb1 * rb1) + Math.sqrt(ra2 * ra2 - rb2 * rb2) - a * Math.sin(phi), pb = PI * m * Math.cos(phi), eps = Lc / pb;
    const zmin = 2 / Math.sin(phi) ** 2, k = 1, u = z2 / z1, zminP = 2 * k / ((1 + 2 * u) * Math.sin(phi) ** 2) * (u + Math.sqrt(u * u + (1 + 2 * u) * Math.sin(phi) ** 2));
    const W2 = 600, Hh = 330, s = Math.min((W2 - 40) / (ra1 + a + ra2), (Hh - 20) / (2 * Math.max(ra1, Math.min(ra2, 2 * ra1 + 40)))), px = 20 + ra1 * s, cy = Hh / 2, gx = px + a * s;
    const g1 = gearOutline(m, z1, phi, th).map(p => [px + p[0] * s, cy - p[1] * s]), g2 = gearOutline(m, z2, phi, PI + PI / z2 - th * z1 / z2).map(p => [px + a * s + p[0] * s, cy - p[1] * s]);
    const Ppx = px + r1 * s, lx = Math.cos(phi) * 120, ly = Math.sin(phi) * 120;
    box.innerHTML = `<svg viewBox="0 0 ${W2} ${Hh}"><polygon points="${pts(g2)}" class="fo"/><polygon points="${pts(g1)}" class="fb"/><circle cx="${px}" cy="${cy}" r="${r1 * s}" class="cl"/><circle cx="${gx}" cy="${cy}" r="${r2 * s}" class="cl"/><circle cx="${px}" cy="${cy}" r="${rb1 * s}" class="d dash"/><circle cx="${gx}" cy="${cy}" r="${rb2 * s}" class="d dash"/><line class="k" x1="${Ppx - lx}" y1="${cy - ly}" x2="${Ppx + lx}" y2="${cy + ly}" style="stroke-width:1.5"/><circle cx="${Ppx}" cy="${cy}" r="4" class="fi"/><text x="${Ppx + 6}" y="${cy - 8}" class="s">P (pitch point)</text><circle cx="${px}" cy="${cy}" r="3" class="fi"/><circle cx="${gx}" cy="${cy}" r="3" class="fi"/></svg>`;
    out.textContent = `Pitch Ø d1 = m·z1 = ${fmt(2 * r1, 1)} mm   d2 = ${fmt(2 * r2, 1)} mm   centre distance a = ${fmt(a, 1)} mm\nAddendum m = ${m}  dedendum 1.25m = ${fmt(1.25 * m, 2)}  base Ø db = d·cos φ (${fmt(2 * rb1, 1)}, ${fmt(2 * rb2, 1)})\nCircular pitch p = πm = ${fmt(PI * m, 2)} mm   base pitch pb = ${fmt(pb, 2)} mm\n\nLength of contact = ${fmt(Lc, 2)} mm\nContact ratio ε = ${fmt(eps, 2)} ${eps < 1.2 ? '⚠ below 1.2 — rough, noisy' : eps < 1.4 ? '— acceptable' : '✓ smooth'}\nMinimum pinion teeth to avoid interference: with a rack ${Math.ceil(zmin - 1e-9)}, with this gear ${Math.ceil(zminP - 1e-9)}  ${z1 < Math.ceil(zminP - 1e-9) ? '⚠ INTERFERENCE / undercut — add positive shift or more teeth' : '✓'}\nThe straight line through P is the line of action, inclined at φ. Press P to run the pair.`;
  }
  draw();
};

/* Day 22: spur gear strength */
const GMAT = [['C45 (45C8), normalised', 140, 200], ['40Cr4, hardened + tempered', 230, 300], ['EN24 (40Ni2Cr1Mo28), H+T', 280, 350], ['20MnCr5, case-carburised', 330, 600], ['Grey cast iron FG 260', 70, 200], ['Nylon (dry)', 25, 60]];
W.spur = el => {
  lab(el);
  const st = form(el, [{ k: 'P', t: 'num', l: 'Power', v: 10, u: 'kW' }, { k: 'n', t: 'num', l: 'Pinion speed', v: 1440, u: 'rpm' }, { k: 'z1', t: 'range', l: 'z1', min: 14, max: 40, v: 20 }, { k: 'z2', t: 'range', l: 'z2', min: 18, max: 150, v: 60 }, { k: 'm', t: 'sel', l: 'Module', o: ['1.5', '2', '2.5', '3', '4', '5', '6', '8'], v: '4' }, { k: 'q', t: 'sel', l: 'Tooth quality', o: [['cut', 'Cut, ordinary (Cv = 3/(3+v))'], ['hob', 'Hobbed / shaped (Cv = 6/(6+v))'], ['grd', 'Ground, precision (Cv = 5.6/(5.6+√v))']], v: 'hob' }, { k: 'bm', t: 'range', l: 'Face width b', min: 6, max: 14, v: 10, u: '× m' }, { k: 'mt', t: 'sel', l: 'Material (both)', o: GMAT.map((g, i) => [i, g[0] + ' · σb ' + g[1] + ' MPa · ' + g[2] + ' HB']), v: '1' }, { k: 'Cs', t: 'sel', l: 'Service factor', o: [[1, '1.0 uniform'], [1.25, '1.25 light shock'], [1.5, '1.5 medium shock'], [1.75, '1.75 heavy shock']], v: '1.25' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const m = +st.m, b = st.bm * m, d1 = m * st.z1, v = PI * d1 * st.n / 60000, Ft = st.P * 1000 / v, Y = 0.484 - 2.87 / st.z1, M = GMAT[+st.mt];
    const Cv = st.q === 'cut' ? 3 / (3 + v) : st.q === 'hob' ? 6 / (6 + v) : 5.6 / (5.6 + Math.sqrt(v)), Peff = +st.Cs * Ft / Cv;
    const Sb = M[1] * b * m * Y, Q = 2 * st.z2 / (st.z2 + st.z1), K = 0.16 * (M[2] / 100) ** 2, Sw = b * Q * d1 * K;
    const nb = Sb / Peff, nw = Sw / Peff, mx = Math.max(Sb, Sw, Peff) * 1.15 / 1000;
    const bar = (y, w, c, t) => `<rect x="150" y="${y}" width="${Math.max(2, w / mx / 1000 * 360)}" height="34" class="${c}"/><text x="140" y="${y + 22}" text-anchor="end">${t}</text><text x="${158 + w / mx / 1000 * 360}" y="${y + 22}" class="s">${fmt(w / 1000, 2)} kN</text>`;
    box.innerHTML = `<svg viewBox="0 0 600 190">${bar(20, Peff, 'fo', 'Effective load')}${bar(70, Sb, 'fb', 'Beam strength (Lewis)')}${bar(120, Sw, 'fb', 'Wear strength (Buckingham)')}<line class="k dash" x1="${150 + Peff / mx / 1000 * 360}" y1="10" x2="${150 + Peff / mx / 1000 * 360}" y2="165"/></svg>`;
    out.textContent = `d1 = ${fmt(d1, 0)} mm  b = ${fmt(b, 0)} mm  v = ${fmt(v, 2)} m/s  tangential force Ft = P/v = ${fmt(Ft, 0)} N\nLewis form factor Y = 0.484 − 2.87/z1 = ${fmt(Y, 3)}  (20° full depth)\nVelocity factor Cv (Barth, ${st.q === 'cut' ? 'cut' : st.q === 'hob' ? 'hobbed' : 'ground'} teeth) = ${fmt(Cv, 3)}   effective load Peff = Cs·Ft/Cv = ${fmt(Peff, 0)} N\n\nBeam strength Sb = σb·b·m·Y = ${fmt(Sb, 0)} N → FOS bending ${fmt(nb, 2)}${verdict(nb, 1.5, 5)}\nWear strength Sw = b·Q·d1·K = ${fmt(Sw, 0)} N  (Q = ${fmt(Q, 3)}, K = 0.16(BHN/100)² = ${fmt(K, 3)} MPa)\n  → FOS pitting ${fmt(nw, 2)}${verdict(nw, 1.5, 5)}\n\n${nw < nb ? 'Pitting governs: harden the teeth (case-carburise) before making the gear bigger.' : 'Bending governs: increase the module.'}\nThis is the Lewis/Buckingham method used for preliminary design; size the final gear to ISO 6336 or AGMA 2001.`;
  }
  draw();
};

/* Day 23: gear force resolver */
W.gforce = el => {
  lab(el);
  const st = form(el, [{ k: 'ty', t: 'seg', l: 'Gear', o: [['spur', 'Spur'], ['hel', 'Helical'], ['bev', 'Bevel'], ['worm', 'Worm']], v: 'hel' }, { k: 'T', t: 'num', l: 'Pinion torque', v: 120, u: 'N·m' }, { k: 'd', t: 'num', l: 'Pinion pitch Ø', v: 80, u: 'mm' }, { k: 'phi', t: 'range', l: 'Pressure angle φn', min: 14.5, max: 25, s: 0.5, v: 20, u: '°' }, { k: 'psi', t: 'range', l: 'Helix / lead angle ψ', min: 0, max: 45, s: 0.5, v: 20, u: '°' }, { k: 'g', t: 'range', l: 'Bevel pitch-cone angle γ', min: 10, max: 80, v: 25, u: '°' }, { k: 'mu', t: 'range', l: 'Worm μ', min: 0.01, max: 0.15, s: 0.005, v: 0.04 }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const Ft = 2 * st.T * 1000 / st.d, fn = rad(st.phi), ps = rad(st.psi), g = rad(st.g); let Fr, Fa, note;
    if (st.ty === 'spur') { Fr = Ft * Math.tan(fn); Fa = 0; note = 'Fr = Ft·tan φ; no thrust.'; }
    else if (st.ty === 'hel') { Fr = Ft * Math.tan(fn) / Math.cos(ps); Fa = Ft * Math.tan(ps); note = 'Fr = Ft·tan φn / cos ψ, Fa = Ft·tan ψ. Double-helical (herringbone) cancels Fa.'; }
    else if (st.ty === 'bev') { Fr = Ft * Math.tan(fn) * Math.cos(g); Fa = Ft * Math.tan(fn) * Math.sin(g); note = 'Ft at the mean cone Ø; Fr = Ft·tan φ·cos γ, Fa = Ft·tan φ·sin γ (pushes the pinion away from the apex).'; }
    else { const l = ps, c = Math.cos(fn) * Math.cos(l) - st.mu * Math.sin(l); Fa = Ft * c / (Math.cos(fn) * Math.sin(l) + st.mu * Math.cos(l)); Fr = Ft * Math.sin(fn) / (Math.cos(fn) * Math.sin(l) + st.mu * Math.cos(l)); note = `Worm: Ft (worm) = gear axial; Fa (worm) = gear tangential = ${fmt(Fa, 0)} N, Fr = ${fmt(Fr, 0)} N. Set ψ as the lead angle λ.`; }
    const R = Math.hypot(Ft, Fr, Fa), sc = 120 / Math.max(Ft, Fr, Fa, 1), O = [250, 150], iso = (x, y, z) => [O[0] + (x - z) * 0.87, O[1] - y + (x + z) * 0.5];
    const ar = (v, c, t) => { const p = iso(v[0] * sc, v[1] * sc, v[2] * sc); return `<line class="${c}" x1="${O[0]}" y1="${O[1]}" x2="${p[0]}" y2="${p[1]}" style="stroke-width:3"/>${arrow(p[0], p[1], Math.atan2(p[1] - O[1], p[0] - O[0]), 10)}<text x="${p[0] + 6}" y="${p[1] - 6}" class="${c === 'o' ? 'ot' : 'bt'}">${t}</text>`; };
    box.innerHTML = `<svg viewBox="0 0 500 300"><ellipse cx="${O[0]}" cy="${O[1] + 70}" rx="110" ry="40" class="fg" style="opacity:.5"/>${ar([0, -Ft, 0], 'o', 'Ft ' + fmt(Ft / 1000, 2) + ' kN')}${ar([0, 0, Fr], 'b', 'Fr ' + fmt(Fr / 1000, 2) + ' kN')}${Fa > 1 ? ar([Fa, 0, 0], 'b', 'Fa ' + fmt(Fa / 1000, 2) + ' kN') : ''}<circle cx="${O[0]}" cy="${O[1]}" r="5" class="fi"/><text x="10" y="290" class="s">forces on the pinion at the pitch point (isometric sketch)</text></svg>`;
    out.textContent = `Tangential Ft = 2T/d = ${fmt(Ft, 0)} N   (does the work)\nRadial     Fr = ${fmt(Fr, 0)} N   (pushes the gears apart)\nAxial      Fa = ${fmt(Fa, 0)} N   (thrust — needs a locating bearing)\nResultant  ${fmt(R, 0)} N\n${note}\nThese three components are the input to the shaft (Day 13) and bearing (Day 25) calculations.`;
  }
  draw();
};

/* Day 24: worm efficiency + heat */
W.worm = el => {
  lab(el);
  const st = form(el, [{ k: 'z1', t: 'seg', l: 'Worm starts', o: [['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']], v: '2' }, { k: 'q', t: 'range', l: 'Diameter factor q = d1/m', min: 6, max: 20, s: 0.5, v: 10 }, { k: 'm', t: 'num', l: 'Module', v: 6, u: 'mm' }, { k: 'z2', t: 'num', l: 'Wheel teeth', v: 40 }, { k: 'n', t: 'num', l: 'Worm speed', v: 1440, u: 'rpm' }, { k: 'P', t: 'num', l: 'Input power', v: 7.5, u: 'kW' }, { k: 'phi', t: 'num', l: 'Normal pressure angle', v: 20, u: '°' }, { k: 'A', t: 'num', l: 'Housing area', v: 1.2, u: 'm²' }, { k: 'h', t: 'num', l: 'Heat transfer coeff.', v: 15, u: 'W/m²K' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  const fric = vs => { const V = vs * 196.85; return 0.103 * Math.exp(-0.110 * Math.pow(V, 0.45)) + 0.012; };
  function draw() {
    const lam = Math.atan(+st.z1 / st.q), d1 = st.q * st.m, vs = PI * d1 * st.n / 60000 / Math.cos(lam), mu = fric(vs), fn = rad(st.phi);
    const eff = l => (Math.cos(fn) - mu * Math.tan(l)) / (Math.cos(fn) + mu / Math.tan(l)), eta = eff(lam), Q = st.P * 1000 * (1 - eta), dT = Q / (st.h * st.A);
    const back = (Math.cos(fn) - mu / Math.tan(lam)) / (Math.cos(fn) + mu * Math.tan(lam));
    const cur = lin(1, 45, 60).map(a => [a, eff(rad(a)) * 100]);
    box.innerHTML = chart({ x: [0, 45], y: [0, 100], xl: 'lead angle λ, °', yl: 'efficiency η, %', series: [{ p: cur }], pts: [[deg(lam), eta * 100]] });
    out.textContent = `Lead angle λ = atan(z1/q) = ${fmt(deg(lam), 2)}°   worm pitch Ø d1 = ${fmt(d1, 0)} mm\nRatio ${st.z2}/${st.z1} = ${fmt(st.z2 / st.z1, 1)} : 1   centre distance ${fmt((d1 + st.m * st.z2) / 2, 1)} mm\nSliding velocity vs = ${fmt(vs, 2)} m/s → μ ≈ ${fmt(mu, 3)} (AGMA curve, bronze on hardened steel)\n\nEfficiency η = (cos φn − μ tan λ)/(cos φn + μ cot λ) = ${fmt(eta * 100, 1)} %\nOutput ${fmt(st.P * eta, 2)} kW;  heat to dissipate ${fmt(Q / 1000, 2)} kW\nOil temperature rise ΔT = Q/(h·A) = ${fmt(dT, 0)} °C ${dT > 60 ? '⚠ too hot — add fan/fins, or more starts' : '✓ under ~60 °C'}\nBack-driving efficiency ${back <= 0 ? '≤ 0 → self-locking (not a reliable brake — vibration can let it slip)' : fmt(back * 100, 0) + ' % → the load can drive the worm'}`;
  }
  draw();
};

/* Day 25: rolling bearing life */
const BRG = { '6205 (25×52×15)': [14.8, 7.8], '6206 (30×62×16)': [20.3, 11.2], '6305 (25×62×17)': [23.4, 11.6], '6306 (30×72×19)': [29.6, 16], '6208 (40×80×18)': [32.5, 19], '6308 (40×90×23)': [42.3, 24], 'NU 208 cyl. roller (40×80×18)': [62, 53], '22208 sph. roller (40×80×23)': [96.5, 90] };
const EY = [[0.014, .19, 2.3], [0.021, .21, 2.15], [0.028, .22, 1.99], [0.042, .24, 1.85], [0.056, .26, 1.71], [0.07, .27, 1.63], [0.084, .28, 1.55], [0.11, .3, 1.45], [0.17, .34, 1.31], [0.28, .38, 1.15], [0.42, .42, 1.04], [0.56, .44, 1]];
const A1 = [['90', 1], ['95', 0.64], ['96', 0.55], ['97', 0.47], ['98', 0.37], ['99', 0.25]];
W.bearing = el => {
  lab(el);
  const st = form(el, [{ k: 'b', t: 'sel', l: 'Bearing', o: Object.keys(BRG), v: '6306 (30×72×19)' }, { k: 'Fr', t: 'range', l: 'Radial load Fr', min: 0.1, max: 20, s: 0.1, v: 3.5, u: 'kN' }, { k: 'Fa', t: 'range', l: 'Axial load Fa', min: 0, max: 10, s: 0.1, v: 1.2, u: 'kN' }, { k: 'n', t: 'num', l: 'Speed', v: 1440, u: 'rpm' }, { k: 'fs', t: 'sel', l: 'Load factor', o: [[1, '1.0 smooth'], [1.2, '1.2 gears'], [1.5, '1.5 moderate shock'], [2.5, '2.5 heavy shock']], v: '1.2' }, { k: 'R', t: 'sel', l: 'Reliability %', o: A1.map(a => a[0]), v: '90' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const k = st.b, [C, C0] = BRG[k], roller = /roller/.test(k), p = roller ? 10 / 3 : 3;
    let X = 1, Y = 0, e = NaN;
    if (/cyl/.test(k)) { X = 1; Y = 0; } else if (/sph/.test(k)) { e = 0.28; if (st.Fa / st.Fr > e) { X = 0.67; Y = 3.6; } else { X = 1; Y = 2.4; } }
    else { const r = st.Fa / C0; e = interp(r, EY.map(q => q[0]), EY.map(q => q[1])); if (st.Fa / st.Fr > e) { X = 0.56; Y = interp(r, EY.map(q => q[0]), EY.map(q => q[2])); } }
    const P = (X * st.Fr + Y * st.Fa) * +st.fs, L10 = Math.pow(C / P, p), Lh = L10 * 1e6 / (60 * st.n), a1 = A1.find(a => a[0] === st.R)[1], Ln = a1 * Lh;
    const cur = lin(0.5, 30, 80).map(q => [q, Math.pow(C / q, p) * 1e6 / (60 * st.n) * a1]);
    box.innerHTML = chart({ x: [0.5, 30], y: [100, 1e7], logx: true, logy: true, xl: 'equivalent load P, kN (log)', yl: 'life, hours (log)', series: [{ p: cur }, { p: [[0.5, 20000], [30, 20000]], c: 'o', dash: 1 }], pts: [[P, Ln]], labels: [[0.6, 20000, '20 000 h (8 h/day, 10 years)', 0, -6, 'ot']] });
    out.textContent = `${k}: C = ${C} kN, C0 = ${C0} kN  (typical catalogue values — check the maker's)\n${/cyl/.test(k) ? 'Cylindrical roller NU: takes no axial load — locate the shaft elsewhere.\n' : `Fa/C0 = ${fmt(st.Fa / C0, 3)}  e = ${fmt(e, 2)}  Fa/Fr = ${fmt(st.Fa / st.Fr, 2)} → X = ${X}, Y = ${fmt(Y, 2)}\n`}Equivalent load P = fs·(X·Fr + Y·Fa) = ${fmt(P, 2)} kN\n\nL10 = (C/P)^${roller ? '10/3' : '3'} = ${fmt(L10, 1)} million rev = ${fmt(Lh, 0)} h at ${st.n} rpm\nAt ${st.R} % reliability (a1 = ${a1}): ${fmt(Ln, 0)} h  ${Ln < 20000 ? '⚠ short for general machinery' : '✓'}\nDoubling the load cuts ball-bearing life to 1/8.`;
  }
  draw();
};

/* Day 26: journal bearing */
const VG = { 32: 5.4, 46: 6.8, 68: 8.7, 100: 11.4, 150: 14.7, 220: 19 };
const RB = [[0.00474, 0.03, 0.514], [0.0188, 0.1, 1.05], [0.0446, 0.2, 1.70], [0.121, 0.4, 3.22], [0.264, 0.6, 5.79], [0.631, 0.8, 12.8], [1.33, 0.9, 26.4]];
function viscVG(vg, T) { const n40 = vg, n100 = VG[vg], f = n => Math.log10(Math.log10(n + 0.7)), x = t => Math.log10(t + 273.15), B = (f(n40) - f(n100)) / (x(100) - x(40)), A = f(n40) + B * x(40); return Math.pow(10, Math.pow(10, A - B * x(T))) - 0.7; }
SW.viscVG = viscVG;
W.journal = el => {
  lab(el);
  const st = form(el, [{ k: 'd', t: 'num', l: 'Journal Ø d', v: 60, u: 'mm' }, { k: 'ld', t: 'seg', l: 'l/d', o: [['1', '1 (charts)']], v: '1' }, { k: 'c', t: 'range', l: 'Radial clearance c', min: 0.01, max: 0.15, s: 0.005, v: 0.04, u: 'mm' }, { k: 'W', t: 'range', l: 'Load W', min: 0.5, max: 40, s: 0.5, v: 8, u: 'kN' }, { k: 'n', t: 'range', l: 'Speed', min: 100, max: 6000, s: 50, v: 1500, u: 'rpm' }, { k: 'vg', t: 'sel', l: 'Oil ISO VG', o: Object.keys(VG), v: '68' }, { k: 'T', t: 'range', l: 'Film temperature', min: 30, max: 110, v: 60, u: '°C' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const d = st.d, r = d / 2, l = d, c = st.c, N = st.n / 60, p = st.W * 1000 / (l * d), nu = viscVG(+st.vg, st.T), mu = nu * 870 * 1e-6;
    const S = (r / c) ** 2 * mu * N / (p * 1e6), lS = Math.log10(S), xs = RB.map(q => Math.log10(q[0]));
    const h0c = S > RB[RB.length - 1][0] ? Math.min(1, 0.9 + 0.1 * (lS - xs[xs.length - 1])) : S < RB[0][0] ? 0.03 * S / RB[0][0] : interp(lS, xs, RB.map(q => q[1]));
    const rcf = S < RB[0][0] ? 0.514 : interp(lS, xs, RB.map(q => Math.log10(q[2]))), f = (S < RB[0][0] ? 0.514 : Math.pow(10, rcf)) * c / r, fP = 2 * PI * PI * mu * N / (p * 1e6) * (r / c);
    const h0 = h0c * c * 1000, hmin = (0.005 + 0.00004 * d) * 1000, loss = f * st.W * 1000 * r / 1000 * 2 * PI * N;
    const cur = lin(-2.6, 0.3, 60).map(x => [Math.pow(10, x), interp(x, xs, RB.map(q => q[1]))]);
    box.innerHTML = chart({ x: [0.002, 2], y: [0, 1], logx: true, xl: 'Sommerfeld number S = (r/c)²·μN/P (log)', yl: 'h₀ / c', series: [{ p: cur }], pts: [[Math.min(2, Math.max(0.002, S)), h0c]] });
    out.textContent = `Unit load P = W/(l·d) = ${fmt(p, 2)} MPa ${p > 3 ? '⚠ high for white metal' : ''}\nISO VG ${st.vg} at ${st.T} °C: ν = ${fmt(nu, 1)} cSt → μ = ${fmt(mu * 1000, 1)} mPa·s (ρ = 870 kg/m³)\nr/c = ${fmt(r / c, 0)}   (c/r = ${fmt(c / r * 1000, 2)} ‰; 1–2 ‰ is usual)\n\nSommerfeld number S = ${fmt(S, 4)}\nRaimondi–Boyd (l/d = 1): h₀/c = ${fmt(h0c, 2)} → minimum film h₀ = ${fmt(h0, 1)} µm\n  Trumpler minimum 0.005 + 0.00004·d mm = ${fmt(hmin, 1)} µm → ${h0 >= hmin ? '✓ full film' : '⚠ film too thin — boundary contact'}\nFriction coefficient f = ${fmt(f, 4)} (Petroff, lightly loaded: ${fmt(fP, 4)})\nPower lost in friction ≈ ${fmt(loss, 0)} W — this heat sets the oil temperature: iterate T until heat generated = heat removed.`;
  }
  draw();
};

/* Day 27: thick cylinder + press fit */
W.lame = el => {
  lab(el);
  const st = form(el, [{ k: 'mo', t: 'seg', l: 'Case', o: [['cyl', 'Thick cylinder'], ['fit', 'Press fit (hub on shaft)']], v: 'cyl' }, { k: 'ri', t: 'range', l: 'Inner radius ri', min: 0, max: 100, v: 50, u: 'mm' }, { k: 'R', t: 'range', l: 'Interface radius R (fit)', min: 10, max: 150, v: 60, u: 'mm' }, { k: 'ro', t: 'range', l: 'Outer radius ro', min: 20, max: 250, v: 100, u: 'mm' }, { k: 'pi', t: 'range', l: 'Internal pressure pi', min: 0, max: 200, v: 60, u: 'MPa' }, { k: 'dl', t: 'range', l: 'Diametral interference δ', min: 0, max: 0.2, s: 0.005, v: 0.05, u: 'mm' }, { k: 'L', t: 'num', l: 'Hub length', v: 80, u: 'mm' }, { k: 'mu', t: 'num', l: 'μ at interface', v: 0.15 }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const E = 207000;
    if (st.mo === 'cyl') {
      const a = Math.max(1, st.ri), b = Math.max(a + 2, st.ro), p = st.pi, k = p * a * a / (b * b - a * a), st_ = r => k * (1 + b * b / (r * r)), sr = r => k * (1 - b * b / (r * r));
      const rs = lin(a, b, 50), thin = p * a / (b - a), vm = Math.sqrt(st_(a) ** 2 - st_(a) * sr(a) + sr(a) ** 2);
      box.innerHTML = chart({ x: [a, b], y: [-p * 1.1, st_(a) * 1.15], xl: 'radius r, mm', yl: 'stress, MPa', series: [{ p: rs.map(r => [r, st_(r)]) }, { p: rs.map(r => [r, sr(r)]), c: 'o' }, { p: [[a, thin], [b, thin]], c: 'd', dash: 1 }, { p: [[a, 0], [b, 0]], c: 'd' }], labels: [[a, st_(a), 'hoop σt', 6, 14], [a, sr(a), 'radial σr', 6, -8, 'ot'], [b, thin, 'thin-wall p·r/t', -4, -6, 's', 'end']] });
      out.textContent = `Lamé, open ends: σt = A + B/r², σr = A − B/r²\nAt the bore: σt = ${fmt(st_(a), 1)} MPa, σr = ${fmt(-p, 1)} MPa, von Mises ${fmt(vm, 1)} MPa\nAt the outside: σt = ${fmt(st_(b), 1)} MPa\nThin-wall formula p·r/t gives ${fmt(thin, 1)} MPa — error ${fmt((thin - st_(a)) / st_(a) * 100, 0)} % (t/r = ${fmt((b - a) / a, 2)}; thin theory is fine only below ~0.1)\nThickening the wall helps less and less: as ro → ∞ the bore hoop stress only falls to p.`;
    } else {
      const a = Math.min(st.ri, st.R - 2), R = st.R, b = Math.max(st.ro, R + 5), d = st.dl;
      const p = E * d / (2 * R) * ((b * b - R * R) * (R * R - a * a)) / (2 * R * R * (b * b - a * a));
      const hub = r => p * R * R / (b * b - R * R) * (1 + b * b / (r * r)), sh = r => a > 0 ? -p * R * R / (R * R - a * a) * (1 + a * a / (r * r)) : -p;
      const T = 2 * PI * st.mu * p * R * R * st.L / 1000, F = 2 * PI * st.mu * p * R * st.L;
      box.innerHTML = chart({ x: [Math.max(0, a), b], y: [Math.min(sh(Math.max(a, 1)), -p) * 1.2, hub(R) * 1.2], xl: 'radius r, mm', yl: 'hoop stress σt, MPa', series: [{ p: lin(R, b, 30).map(r => [r, hub(r)]) }, { p: lin(Math.max(a, 1), R, 30).map(r => [r, sh(r)]), c: 'o' }, { p: [[0, 0], [b, 0]], c: 'd' }], labels: [[R, hub(R), 'hub', 6, 14], [R, sh(R), 'shaft', -6, -8, 'ot', 'end']] });
      out.textContent = `Same steel (E = 207 GPa), radial interference δ/2 = ${fmt(d / 2 * 1000, 1)} µm\nInterface pressure p = (E·δ/(2R))·(ro²−R²)(R²−ri²)/(2R²(ro²−ri²)) = ${fmt(p, 1)} MPa\nHub bore hoop stress ${fmt(hub(R), 1)} MPa (tension)   shaft surface ${fmt(sh(R), 1)} MPa (compression)\n\nHolding torque T = 2π·μ·p·R²·L = ${fmt(T, 0)} N·m\nAxial push-off force F = 2π·μ·p·R·L = ${fmt(F / 1000, 1)} kN\nShrink fit: heat the hub by ΔT ≈ (δ + 0.02 mm)/(α·2R) = ${fmt((d + 0.02) / (11.7e-6 * 2 * R), 0)} °C (α = 11.7 µm/m·K)`;
    }
  }
  draw();
};

/* Day 28: flywheel */
W.fly = el => {
  lab(el);
  const st = form(el, [{ k: 'ty', t: 'sel', l: 'Machine', o: [['1', 'Single-cylinder 4-stroke engine'], ['2', 'Two-cylinder 4-stroke'], ['4', 'Four-cylinder 4-stroke'], ['p', 'Punching press (one punch per rev)']], v: '1' }, { k: 'P', t: 'num', l: 'Mean power', v: 7.5, u: 'kW' }, { k: 'N', t: 'num', l: 'Mean speed', v: 600, u: 'rpm' }, { k: 'Cs', t: 'range', l: 'Coeff. of speed fluctuation Cs', min: 0.002, max: 0.2, s: 0.002, v: 0.02 }, { k: 'R', t: 'num', l: 'Rim mean radius', v: 400, u: 'mm' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function torque(t) { switch (st.ty) { case '1': return torque1(t); case '2': return torque1(t) + torque1(t + 2 * PI); case '4': return torque1(t) + torque1(t + PI) + torque1(t + 2 * PI) + torque1(t + 3 * PI); default: { const c = ((t % (2 * PI)) + 2 * PI) % (2 * PI); return c > 4.4 && c < 5.2 ? 16 : 0; } } }
  function torque1(t) { const c = ((t % (4 * PI)) + 4 * PI) % (4 * PI), s = Math.abs(Math.sin(c)); return c < PI ? 20 * s ** 3 : c < 3 * PI ? -0.5 * s : -5 * s * s; }
  function draw() {
    const cyc = st.ty === 'p' ? 2 * PI : 4 * PI, n = 720, th = lin(0, cyc, n), Traw = th.map(t => torque(t));
    const Tm = st.P * 1000 * 60 / (2 * PI * st.N), press = st.ty === 'p';
    const avg = Traw.reduce((s, v) => s + v, 0) / (n + 1), Tr = Traw.map(v => press ? v / avg * Tm : v / avg * Tm);
    let E = 0, Emax = 0, Emin = 0; const sgn = press ? -1 : 1; for (let i = 1; i <= n; i++) { E += sgn * (Tr[i] - Tm) * cyc / n; Emax = Math.max(Emax, E); Emin = Math.min(Emin, E); }
    const dE = Emax - Emin, w = st.N * 2 * PI / 60, I = dE / (w * w * st.Cs), m = I / (st.R / 1000) ** 2, v = w * st.R / 1000, sig = 7200 * v * v / 1e6;
    box.innerHTML = chart({ x: [0, deg(cyc)], y: [Math.min(...Tr, 0) * 1.1, Math.max(...Tr) * 1.1], h: 260, xl: 'crank angle, °', yl: press ? 'load torque, N·m' : 'turning moment, N·m', series: [{ p: th.map((t, i) => [deg(t), Tr[i]]) }, { p: [[0, Tm], [deg(cyc), Tm]], c: 'o', dash: 1 }], labels: [[deg(cyc), Tm, (press ? 'motor torque' : 'mean') + ' ' + fmt(Tm, 0) + ' N·m', -4, -6, 'ot', 'end']] });
    out.textContent = `Mean torque Tm = ${fmt(Tm, 0)} N·m   energy per cycle ${fmt(Tm * cyc / 1000, 2)} kJ\nMaximum fluctuation of energy ΔE = ${fmt(dE / 1000, 3)} kJ  (Ce = ΔE / energy per cycle = ${fmt(dE / (Tm * cyc), 2)})\nRequired inertia I = ΔE/(ω²·Cs) = ${fmt(I, 2)} kg·m²\nRim flywheel at R = ${st.R} mm: rim mass ≈ I/R² = ${fmt(m, 1)} kg (arms and hub add ~10 %)\nRim speed v = ${fmt(v, 1)} m/s → hoop stress ρv² = ${fmt(sig, 1)} MPa ${v > 30 ? '⚠ above ~30 m/s cast iron rims are unsafe — use steel' : '✓ (cast iron rims up to ~30 m/s)'}\nHalving Cs doubles the flywheel; doubling R quarters the mass.`;
  }
  draw();
};

/* Day 29: reliability + life-cycle cost */
W.relcost = el => {
  lab(el);
  const st = form(el, [{ k: 'beta', t: 'range', l: 'Weibull shape β', min: 0.5, max: 4, s: 0.1, v: 1.5 }, { k: 'eta', t: 'num', l: 'Characteristic life η', v: 20000, u: 'h' }, { k: 't', t: 'num', l: 'Mission time', v: 5000, u: 'h' }, { k: 'n', t: 'range', l: 'Parts in series', min: 1, max: 20, v: 6 }, { k: 'red', t: 'chk', l: 'Duplicate the weakest part (parallel pair)', v: false }, { k: 'c1', t: 'num', l: 'Option A price', v: 60000, u: '₹' }, { k: 'e1', t: 'num', l: 'A efficiency', v: 88, u: '%' }, { k: 'c2', t: 'num', l: 'Option B price', v: 85000, u: '₹' }, { k: 'e2', t: 'num', l: 'B efficiency', v: 93, u: '%' }, { k: 'kw', t: 'num', l: 'Output power', v: 15, u: 'kW' }, { k: 'hr', t: 'num', l: 'Running', v: 4000, u: 'h/year' }, { k: 'tar', t: 'num', l: 'Tariff', v: 8, u: '₹/kWh' }, { k: 'dr', t: 'num', l: 'Discount rate', v: 10, u: '%' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const R1 = Math.exp(-Math.pow(st.t / st.eta, st.beta)), Rp = 1 - (1 - R1) ** 2, Rs = st.red ? Math.pow(R1, st.n - 1) * Rp : Math.pow(R1, st.n);
    const years = 10, cost = (c, e) => { let s = c, a = []; for (let y = 0; y <= years; y++) { if (y > 0) s += st.kw / (e / 100) * st.hr * st.tar / Math.pow(1 + st.dr / 100, y); a.push([y, s / 1e5]); } return a; };
    const A = cost(st.c1, st.e1), B = cost(st.c2, st.e2);
    const rc = lin(0, st.eta * 2, 60).map(t => [t, Math.exp(-Math.pow(t / st.eta, st.beta)) ** st.n * 100]);
    box.innerHTML = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:start">' + chart({ x: [0, st.eta * 2], y: [0, 100], w: 330, h: 250, nx: 3, xl: 'hours', yl: 'system reliability, %', series: [{ p: rc }], pts: [[st.t, Rs * 100]] }) + chart({ x: [0, years], y: [0, Math.max(A[years][1], B[years][1]) * 1.1], w: 330, h: 250, xl: 'years', yl: 'cumulative cost (NPV), ₹ lakh', series: [{ p: A, c: 'o' }, { p: B, c: 'b' }], labels: [[years, A[years][1], 'A', -10, -6, 'ot'], [years, B[years][1], 'B', -10, 14, 'bt']] }) + '</div>';
    const pay = B.find((b, i) => b[1] <= A[i][1]);
    out.textContent = `One part: R(t) = exp(−(t/η)^β) = ${fmt(R1 * 100, 2)} % at ${st.t} h ${st.beta < 1 ? '(β < 1: infant mortality)' : st.beta < 1.2 ? '(β ≈ 1: random failures)' : '(β > 1: wear-out)'}\n${st.n} parts in series: R = R₁ⁿ = ${fmt(Math.pow(R1, st.n) * 100, 2)} %${st.red ? `\nWith one part duplicated in parallel: ${fmt(Rs * 100, 2)} %` : ''}\nMean life of one part ≈ η·Γ(1+1/β) = ${fmt(st.eta * gammaF(1 + 1 / st.beta), 0)} h\n\nLife-cycle cost over ${years} years (purchase + discounted energy)\n  A: ₹ ${fmt(A[years][1], 2)} lakh   B: ₹ ${fmt(B[years][1], 2)} lakh\n  ${pay ? 'B pays back its higher price in year ' + pay[0] : 'A stays cheaper over ' + years + ' years'} — energy is usually 90 %+ of a motor's lifetime cost.`;
  }
  draw();
};
function gammaF(x) { const g = [676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7]; if (x < 0.5) return PI / (Math.sin(PI * x) * gammaF(1 - x)); x -= 1; let a = 0.99999999999980993; const t = x + 7.5; for (let i = 0; i < 8; i++) a += g[i] / (x + i + 1); return Math.sqrt(2 * PI) * Math.pow(t, x + 0.5) * Math.exp(-t) * a; }

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
