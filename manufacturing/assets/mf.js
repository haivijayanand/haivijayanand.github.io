/*
TOOL:    manufacturing/assets/mf.js — shared engine for the 30-Day Manufacturing Course: page shell, progress, quiz, charts and 29 interactive labs
FAMILY:  manufacturing
VERSION: 1.0.0
DATE:    2026-11-17
CHAT:    Prepare a 30 days course on manufacturing aspects for engineers and managers
CHANGES: 1.0.0 - first version; page shell, quiz, certificate, chart helper and keyboard (M F T P S X [ ]) from machine-design/assets/md.js 1.0.0;
                 new labs: product-process matrix, value stream timeline, OEE waterfall, line flow simulator, from-to layout, break-even + MHR,
                 forecasting, MRP explosion, sequencing Gantt, EOQ + ROP, SMED, Little's Law + Kanban, cost of quality, X-bar R simulator,
                 capability, OC curve, Pareto, PFMEA, 5S radar, MTBF/MTTR, P-F interval, risk matrix, standard time, air leaks,
                 supplier scorecard, yield cascade, live machine data, laminate quote, NPV/IRR
STATUS:  working
*/
(function () {
'use strict';
const SW = window.SW = window.SW || {};
SW.version = '1.0.0';
const ND = () => (window.SW_DAYS ? SW_DAYS.length : 30);
const $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const store = {
  get(k, d) { try { const v = localStorage.getItem('mf30:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('mf30:' + k, JSON.stringify(v)); } catch (e) { } }
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
SW.resetProgress = () => { if (confirm('Clear all progress, ticks and quiz scores stored in this browser?')) { try { Object.keys(localStorage).filter(k => k.startsWith('mf30:')).forEach(k => localStorage.removeItem(k)); } catch (e) { } location.reload(); } };

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
  const title = el.dataset.title || '30-Day Manufacturing Course', topics = el.dataset.topics || 'manufacturing systems, planning, quality, lean, maintenance, safety, supply chain, cost and improvement';
  el._upd = () => {
    const dm = doneMap(); let n = 0; for (let i = d0; i <= d1; i++) if (dm[i]) n++;
    const sc = store.get(key + 'score', null);
    card.innerHTML = `<div class="series" style="letter-spacing:.2em;color:var(--soft)">CERTIFICATE OF COMPLETION</div><h2>${esc(title)}</h2><p>This is to certify that</p><div class="nm">${esc(nmIn.value || 'Your name')}</div><p>has worked through <b>${n} of ${tot}</b> days of ${esc(topics)}${sc ? `, and scored <b>${sc[0]} / ${sc[1]}</b> in the final assessment` : ''}.</p><p class="hint">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} · haivijayanand.github.io/manufacturing</p>${n < tot || !sc ? `<p class="hint">(Complete all ${tot} days and the final assessment to make it count.)</p>` : ''}<p class="hint">A course-completion certificate — not an official or university certification.</p>`;
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


/* ================= MANUFACTURING LABS ================= */
const svgW = (w, h, s) => `<svg viewBox="0 0 ${w} ${h}">${s}</svg>`;
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
function rng(seed) { let s = (seed % 2147483647 + 2147483647) % 2147483647 || 1; return () => { s = s * 16807 % 2147483647; return (s - 1) / 2147483646; }; }
function gauss(r) { let u = 0, v = 0; while (u === 0) u = r(); while (v === 0) v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * PI * v); }
function ncdf(z) { const t = 1 / (1 + 0.2316419 * Math.abs(z)), d = 0.3989423 * Math.exp(-z * z / 2); const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; }
const rs = x => '₹ ' + fmt(x, 0);
const lakh = x => '₹ ' + fmt(x / 1e5, 2) + ' lakh';
function kpis(host, list) { host.innerHTML = '<div class="kpis">' + list.map(k => `<div><small>${k[0]}</small><b class="${k[2] || ''}">${k[1]}</b></div>`).join('') + '</div>'; }
/* editable table: cols [{h, t:'text'|'num'|'chk', s}] rows = array of arrays (edited in place) */
function edTable(host, cols, rows, cb, tmpl) {
  const box = div(host);
  function render() {
    box.innerHTML = `<table class="ed"><tr>${cols.map(c => `<th>${c.h}</th>`).join('')}</tr>${rows.map((r, i) => `<tr>${cols.map((c, j) => c.t === 'chk' ? `<td style="text-align:center"><input type="checkbox" data-r="${i}" data-c="${j}" ${r[j] ? 'checked' : ''}></td>` : `<td><input class="${c.t === 'text' ? 'nm' : ''}" type="${c.t === 'num' ? 'number' : 'text'}" step="${c.s || 'any'}" data-r="${i}" data-c="${j}" value="${esc(r[j])}"></td>`).join('')}</tr>`).join('')}</table>`;
    if (tmpl) { const b = document.createElement('button'); b.type = 'button'; b.textContent = '+ Add row'; b.onclick = () => { rows.push(tmpl.slice()); render(); cb(); }; box.appendChild(b); }
  }
  box.addEventListener('input', e => { const i = e.target; if (!i.dataset.r) return; const r = +i.dataset.r, c = +i.dataset.c; rows[r][c] = i.type === 'checkbox' ? i.checked : cols[c].t === 'num' ? (parseFloat(i.value) || 0) : i.value; cb(); });
  box.addEventListener('change', e => { if (e.target.type === 'checkbox') { const i = e.target; rows[+i.dataset.r][+i.dataset.c] = i.checked; cb(); } });
  render(); return box;
}
function bars(items, o) { /* items [[label, value, cls]] horizontal bars */
  o = o || {}; const W = o.w || 560, rh = 26, L = o.l || 150, H = items.length * rh + 30, mx = o.max || Math.max(...items.map(i => Math.abs(i[1])), 1e-9);
  let s = '';
  items.forEach((it, i) => { const y = 10 + i * rh, w = Math.abs(it[1]) / mx * (W - L - 90); s += `<text x="${L - 8}" y="${y + 16}" text-anchor="end">${esc(it[0])}</text><rect x="${L}" y="${y + 3}" width="${Math.max(w, 1)}" height="${rh - 8}" rx="3" class="${it[2] || 'fb'}"/><text x="${L + w + 6}" y="${y + 16}" class="s">${it[3] !== undefined ? it[3] : fmt(it[1], 1)}</text>`; });
  return svgW(W, H, s);
}

/* Day 1: product–process matrix */
const PTYPES = ['Project', 'Job shop', 'Batch', 'Line', 'Continuous'];
W.pmatrix = el => {
  lab(el);
  const st = form(el, [{ k: 'v', t: 'range', l: 'Volume per variant per year (10ˣ units)', min: 0, max: 8, s: 0.1, v: 4.5 }, { k: 'p', t: 'sel', l: 'Made on', o: PTYPES.map((p, i) => [i, p]), v: '2' },
    { k: 'pre', t: 'sel', l: 'Example', o: [['', '— pick an example —'], ['0.2,0', 'New printing press installation'], ['1.5,1', 'Gravure cylinder engraving'], ['4.5,2', 'Printed pouches, 600 SKUs'], ['6.5,3', 'Dedicated sachet line, 1 SKU'], ['7.6,4', 'Blown film, one grade, 24×7'], ['6.8,2', 'Commodity carry bags made in small batches']], v: '' }], k => {
      if (k === 'pre' && st.pre) { const [a, b] = st.pre.split(','); st.v = +a; st.p = b; st._el.v.value = a; st._el.v._show(); st._el.p.value = b; } draw(); });
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  const ideal = x => x < 1 ? 0 : x < 3 ? 1 : x < 5.5 ? 2 : x < 7 ? 3 : 4;
  function draw() {
    const Wd = 560, H = 330, L = 110, T = 20, B = 50, X = x => L + x / 8 * (Wd - L - 20), Y = y => T + (y + 0.5) / 5 * (H - T - B);
    let s = '';
    PTYPES.forEach((p, i) => { s += `<line x1="${L}" y1="${Y(i)}" x2="${Wd - 20}" y2="${Y(i)}" style="stroke:var(--rule)"/><text x="${L - 8}" y="${Y(i) + 4}" text-anchor="end">${p}</text>`; });
    const band = [[0, 0], [1, 0.4], [3, 1.5], [5.5, 2.5], [7, 3.4], [8, 4]];
    s += `<polygon class="fb" style="fill-opacity:.12;stroke:none" points="${band.map(p => X(p[0]) + ',' + Y(p[1] - 0.75)).join(' ')} ${band.slice().reverse().map(p => X(p[0]) + ',' + Y(p[1] + 0.75)).join(' ')}"/>`;
    s += `<polyline class="b dash" points="${band.map(p => X(p[0]) + ',' + Y(p[1])).join(' ')}"/>`;
    ['one-off', '10²', '10⁴', '10⁶', '10⁸'].forEach((t, i) => s += `<text x="${X(i * 2)}" y="${H - B + 18}" text-anchor="middle" class="s">${t}</text>`);
    s += `<text x="${(L + Wd) / 2}" y="${H - 8}" text-anchor="middle" class="s">volume per variant → (more standard)</text>`;
    s += `<circle cx="${X(st.v)}" cy="${Y(+st.p)}" r="10" class="fa" style="stroke:var(--card);stroke-width:2"/>`;
    box.innerHTML = svgW(Wd, H, s);
    const id = ideal(st.v), d = +st.p - id;
    out.textContent = `Volume per variant ≈ ${fmt(Math.pow(10, st.v), 0)} a year\nProcess on the diagonal: ${PTYPES[id]}\nYou make it on: ${PTYPES[+st.p]}\n\n` + (d === 0 ? '✓ On the diagonal — process and volume match.' : d < 0 ? `⚠ Process too flexible for the volume (${-d} step${d < -1 ? 's' : ''}).\nYou pay for flexibility you do not use: long routes, high cost per unit, high WIP.\nConsider a dedicated line, a cell, or a "plant within a plant" for this family.` : `⚠ Process too rigid for the volume (${d} step${d > 1 ? 's' : ''}).\nThe line spends its life changing over; small orders are expensive.\nConsider SMED (Day 11), a flexible cell, or moving the family to a batch area.`);
  }
  draw();
};

/* Day 2: value stream timeline */
W.vsm = el => {
  lab(el);
  const rows = [['Film store', 6, 0, 0], ['Gravure print', 0, 0, 4], ['Lamination', 3, 0, 2], ['Slitting', 2, 2, 1.5], ['Pouch making', 3, 0, 14], ['Finished goods', 2, 0, 0]];
  const st = form(el, [{ k: 'd', t: 'num', l: 'Demand per day', v: 12, u: 't' }, { k: 'h', t: 'num', l: 'Available time per day', v: 22.5, u: 'h' }], draw);
  div(el, 'hint', 'Each row: queue days before the step, necessary wait days (adhesive cure, drying, heat-treatment soak), then processing hours of the order at the step.');
  edTable(el, [{ h: 'Step', t: 'text' }, { h: 'Queue before, days', t: 'num' }, { h: 'Necessary wait, days', t: 'num' }, { h: 'Processing, h', t: 'num' }], rows, draw, ['New step', 1, 0, 1]);
  const box = div(el), out = div(el, 'out');
  function draw() {
    const qD = rows.reduce((a, r) => a + r[1], 0), nD = rows.reduce((a, r) => a + r[2], 0), procH = rows.reduce((a, r) => a + r[3], 0), lt = qD + nD + procH / 24;
    const Wd = 760, L = 10, R = 10, sc = (Wd - L - R) / Math.max(lt, 1e-6); let x = L, s = '', lv = 0;
    rows.forEach(r => {
      [[r[1], 'o', 'queue'], [r[2], 'd', 'cure']].forEach(q => { if (q[0] > 0) { const w = q[0] * sc; s += `<polyline class="${q[1]}" style="${q[1] === 'd' ? 'stroke-width:3' : ''}" points="${x},90 ${x},40 ${x + w},40 ${x + w},90"/><text x="${x + w / 2}" y="34" text-anchor="middle" class="s">${fmt(q[0], 1)} d${q[1] === 'd' ? ' (necessary)' : ''}</text>`; x += w; } });
      const w2 = Math.max(r[3] / 24 * sc, 2);
      if (r[3] > 0) { const tx = clamp(x + w2 / 2, 60, Wd - 60); s += `<rect x="${x}" y="90" width="${w2}" height="16" class="fb"/><line x1="${x + w2 / 2}" y1="106" x2="${tx}" y2="${118 + lv * 16}" class="d"/><text x="${tx}" y="${130 + lv * 16}" text-anchor="middle" class="s">${esc(r[0])} ${fmt(r[3], 1)} h</text>`; lv = (lv + 1) % 3; }
      x += r[3] / 24 * sc;
    });
    box.innerHTML = svgW(Wd, 185, s);
    const takt = st.h * 60 / st.d;
    kpis(out, [['Lead time', fmt(lt, 1) + ' days'], ['Processing time', fmt(procH, 1) + ' h'], ['Value-added ratio', fmt(procH / 24 / lt * 100, 1) + ' %', 'w'], ['Queues', fmt(qD, 1) + ' days'], ['Necessary waits', fmt(nD, 1) + ' days'], ['Takt', fmt(takt, 1) + ' min per t']]);
  }
  draw();
};

/* Day 3: OEE waterfall */
W.oee = el => {
  lab(el);
  const st = form(el, [{ k: 'sh', t: 'num', l: 'Shift', v: 480, u: 'min' }, { k: 'pb', t: 'num', l: 'Planned breaks', v: 30, u: 'min' }, { k: 'co', t: 'num', l: 'Changeover', v: 55, u: 'min' }, { k: 'bd', t: 'num', l: 'Breakdown', v: 20, u: 'min' }, { k: 'rr', t: 'num', l: 'Rated speed', v: 120, u: 'pcs/min' }, { k: 'tc', t: 'num', l: 'Total count', v: 36000 }, { k: 'gc', t: 'num', l: 'Good count', v: 34560 }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row);
  function draw() {
    const pt = st.sh - st.pb, rt = Math.max(pt - st.co - st.bd, 0), ideal = st.tc / st.rr, good = st.gc / st.rr;
    const A = rt / pt, P = rt ? ideal / rt : 0, Q = st.tc ? st.gc / st.tc : 0, speedLoss = rt - ideal, qLoss = ideal - good;
    const steps = [['Planned time', pt, 0, 'fb'], ['Changeover', st.co, pt - st.co, 'fo'], ['Breakdown', st.bd, pt - st.co - st.bd, 'fo'], ['Run time', rt, 0, 'fb'], ['Speed loss', speedLoss, rt - speedLoss, 'fo'], ['Quality loss', qLoss, good, 'fo'], ['Good, full speed', good, 0, 'fb']];
    const Wd = 560, H = 300, L = 50, B = 60, T = 14, Y = v => H - B - v / pt * (H - B - T), bw = (Wd - L - 10) / steps.length;
    let s = `<line class="d" x1="${L}" y1="${H - B}" x2="${Wd}" y2="${H - B}"/>`;
    steps.forEach((p, i) => { const x = L + i * bw + 6; s += `<rect x="${x}" y="${Y(p[2] + p[1])}" width="${bw - 12}" height="${Math.max(Y(p[2]) - Y(p[2] + p[1]), 1)}" class="${p[3]}"/><text x="${x + (bw - 12) / 2}" y="${Y(p[2] + p[1]) - 5}" text-anchor="middle" class="s">${fmt(p[1], 0)}</text><text x="${x + (bw - 12) / 2}" y="${H - B + 16}" text-anchor="middle" class="s" style="font-size:11px">${p[0].split(' ')[0]}</text><text x="${x + (bw - 12) / 2}" y="${H - B + 30}" text-anchor="middle" class="s" style="font-size:11px">${p[0].split(' ').slice(1).join(' ')}</text>`; });
    s += `<text x="12" y="${(H - B) / 2}" class="s" transform="rotate(-90 12 ${(H - B) / 2})" text-anchor="middle">minutes</text>`;
    box.innerHTML = svgW(Wd, H, s);
    kpis(out, [['Availability', fmt(A * 100, 1) + ' %'], ['Performance', fmt(P * 100, 1) + ' %'], ['Quality', fmt(Q * 100, 1) + ' %'], ['OEE', fmt(A * P * Q * 100, 1) + ' %', 'w']]);
    const losses = [['changeover', st.co], ['breakdown', st.bd], ['speed / small stops', speedLoss], ['quality', qLoss]].sort((a, b) => b[1] - a[1]);
    div(out, 'out', `Biggest loss: ${losses[0][0]} (${fmt(losses[0][1], 0)} min equivalent)\nGood, full-speed time ${fmt(good, 0)} of ${pt} planned min.${P > 1 ? '\n⚠ Performance above 100 % — the rated speed is set too low.' : ''}`);
  }
  draw();
};

/* Day 4: line flow simulator */
W.line = el => {
  lab(el);
  const st = form(el, [{ k: 't0', t: 'range', l: 'A', min: 10, max: 80, v: 40, u: 's' }, { k: 't1', t: 'range', l: 'B', min: 10, max: 80, v: 55, u: 's' }, { k: 't2', t: 'range', l: 'C', min: 10, max: 80, v: 35, u: 's' }, { k: 't3', t: 'range', l: 'D', min: 10, max: 80, v: 45, u: 's' }, { k: 'cap', t: 'range', l: 'Buffer size', min: 1, max: 10, v: 3 }, { k: 'var', t: 'range', l: 'Variability', min: 0, max: 60, v: 0, u: '%' }], reset);
  const ctl = div(el, 'ctl'), box = div(el), out = div(el, 'out');
  let S;
  function reset() { S = { t: 0, out: 0, buf: [0, 0, 0, 0], sta: [0, 1, 2, 3].map(() => ({ busy: false, rem: 0, fin: false, bt: 0, blk: 0 })) }; draw(); }
  function times() { return [st.t0, st.t1, st.t2, st.t3]; }
  function sim(dt) {
    const T = times();
    for (let k = 0; k < dt; k += 0.5) {
      S.t += 0.5;
      for (let i = 3; i >= 0; i--) {
        const s = S.sta[i];
        if (s.busy && !s.fin) { s.rem -= 0.5; s.bt += 0.5; if (s.rem <= 0) s.fin = true; }
        if (s.fin) { if (i === 3) { S.out++; s.busy = s.fin = false; } else if (S.buf[i + 1] < st.cap) { S.buf[i + 1]++; s.busy = s.fin = false; } else s.blk += 0.5; }
        if (!s.busy) { if (i === 0 || S.buf[i] > 0) { if (i > 0) S.buf[i]--; s.busy = true; s.fin = false; s.rem = T[i] * (1 + st.var / 100 * (Math.random() * 2 - 1)); } }
      }
    }
    draw();
  }
  function draw() {
    const T = times(), mx = Math.max(...T), Wd = 760, H = 190; let s = '';
    T.forEach((t, i) => {
      const x = 40 + i * 180, s0 = S.sta[i], bott = t === mx;
      if (i > 0) { for (let b = 0; b < st.cap; b++) s += `<rect x="${x - 60 + (b % 5) * 10}" y="${70 + Math.floor(b / 5) * 12}" width="8" height="8" rx="2" class="${b < S.buf[i] ? 'fa' : 'fg'}"/>`; s += `<text x="${x - 37}" y="${116}" text-anchor="middle" class="s">WIP ${S.buf[i]}</text>`; }
      s += `<rect x="${x}" y="40" width="90" height="70" rx="8" class="${bott ? 'fo' : 'fb'}"/><text x="${x + 45}" y="62" text-anchor="middle" class="${bott ? 'ot' : 'bt'}">${'ABCD'[i]}  ${t} s</text>`;
      s += `<rect x="${x + 10}" y="76" width="70" height="10" class="fg"/><rect x="${x + 10}" y="76" width="${s0.busy ? 70 * clamp(1 - s0.rem / t, 0, 1) : 0}" height="10" class="${s0.fin ? 'fo' : 'fb'}"/>`;
      s += `<text x="${x + 45}" y="102" text-anchor="middle" class="s">${s0.fin && i < 3 ? 'blocked' : s0.busy ? 'working' : 'starved'}</text>`;
      const u = S.t ? s0.bt / S.t * 100 : 0; s += `<text x="${x + 45}" y="140" text-anchor="middle" class="s">busy ${fmt(u, 0)} %</text>`;
    });
    s += `<text x="${Wd - 10}" y="30" text-anchor="end" class="bt">out: ${S.out}</text>`;
    box.innerHTML = svgW(Wd, H, s);
    const tp = S.t > 60 ? S.out / S.t * 3600 : NaN, tot = T.reduce((a, b) => a + b, 0);
    out.textContent = `Bottleneck: station ${'ABCD'[T.indexOf(mx)]} at ${mx} s → theoretical throughput ${fmt(3600 / mx, 1)} units/h\nBalance efficiency = ${tot} / (4 × ${mx}) = ${fmt(tot / 4 / mx * 100, 1)} %\nSimulated: ${fmt(S.t / 60, 1)} min, ${S.out} units → ${Number.isFinite(tp) ? fmt(tp, 1) + ' units/h' : 'run for a minute…'}\n${st.var > 0 ? 'With variability, small buffers starve the bottleneck — raise the buffer before it and compare.' : 'Set some variability to see why buffers in front of the bottleneck matter.'}`;
  }
  animCtl(ctl, el, dt => sim(dt * 120), () => sim(10));
  const rb = document.createElement('button'); rb.textContent = '↺ Reset'; rb.onclick = reset; ctl.appendChild(rb);
  reset();
};

/* Day 5: from–to layout planner */
const DEPTS = ['Store', 'Extrusion', 'Printing', 'Lamination', 'Slitting', 'Pouch', 'Dispatch'];
const FLOWS = [[0, 1, 30], [0, 2, 25], [1, 2, 10], [1, 3, 18], [2, 3, 36], [3, 4, 34], [4, 5, 20], [4, 6, 14], [5, 6, 20]];
W.fromto = el => {
  lab(el);
  let pos = [3, 6, 0, 5, 1, 4, 2], sel = -1; /* pos[dept] = bay */
  const bay = b => [70 + (b % 4) * 150, b < 4 ? 70 : 200]; /* bays 0-3 top row, 4-6 bottom */
  const dist = (a, b) => { const p = bay(a), q = bay(b); return (Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1])) / 5; }; /* 1 px = 0.2 m → 150 px = 30 m */
  const ctl = div(el, 'ctl'), box = div(el), out = div(el, 'out');
  ctl.innerHTML = '<button data-a="as">As built</button> <button data-a="fl">Flow order (U-shape)</button> <span class="hint">Click one department, then another, to swap them.</span>';
  ctl.onclick = e => { const a = e.target.dataset.a; if (a === 'as') pos = [3, 6, 0, 5, 1, 4, 2]; if (a === 'fl') pos = [0, 1, 2, 3, 6, 5, 4]; sel = -1; draw(); };
  box.onclick = e => { const g = e.target.closest('[data-d]'); if (!g) return; const d = +g.dataset.d; if (sel < 0) sel = d; else { [pos[sel], pos[d]] = [pos[d], pos[sel]]; sel = -1; } draw(); };
  function total() { return FLOWS.reduce((a, f) => a + f[2] * dist(pos[f[0]], pos[f[1]]), 0); }
  function draw() {
    let s = '';
    FLOWS.forEach(f => { const p = bay(pos[f[0]]), q = bay(pos[f[1]]); s += `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" class="o" style="stroke-width:${1 + f[2] / 6};stroke-opacity:.55"/>`; });
    DEPTS.forEach((d, i) => { const p = bay(pos[i]); s += `<g data-d="${i}" style="cursor:pointer"><rect x="${p[0] - 58}" y="${p[1] - 26}" width="116" height="52" rx="8" style="fill:${sel === i ? 'var(--hi)' : 'var(--card)'};stroke:${sel === i ? 'var(--acc)' : 'var(--pri)'};stroke-width:${sel === i ? 4 : 2}"/><text x="${p[0]}" y="${p[1] + 5}" text-anchor="middle" style="font-weight:700">${d}</text></g>`; });
    box.innerHTML = svgW(620, 260, s);
    const T = total();
    out.textContent = `Total handling = Σ flow × distance = ${fmt(T, 0)} roll·m per day   (bays 30 m apart, rows 26 m apart, rectilinear aisles)\n` + FLOWS.map(f => `${DEPTS[f[0]].padEnd(11)}→ ${DEPTS[f[1]].padEnd(11)} ${String(f[2]).padStart(3)} rolls × ${fmt(dist(pos[f[0]], pos[f[1]]), 0).padStart(3)} m = ${fmt(f[2] * dist(pos[f[0]], pos[f[1]]), 0)}`).join('\n') + '\n\nThick lines are big flows: put their ends next to each other.';
  }
  draw();
};

/* Day 6: break-even and machine-hour rate */
W.breakeven = el => {
  lab(el);
  const st = form(el, [{ k: 'F', t: 'num', l: 'Fixed cost', v: 72, u: '₹ lakh/yr' }, { k: 'p', t: 'num', l: 'Price', v: 1400, u: '₹ per 1 000' }, { k: 'v', t: 'num', l: 'Variable cost', v: 1160, u: '₹ per 1 000' }, { k: 'q', t: 'range', l: 'Volume', min: 0, max: 60, v: 45, u: 'million/yr' }, { k: 'c', t: 'num', l: 'Capacity', v: 55, u: 'million/yr' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  div(el, 'hint', 'Machine-hour rate builder');
  const m = form(el, [{ k: 'P', t: 'num', l: 'Machine price', v: 180, u: '₹ lakh' }, { k: 'L', t: 'num', l: 'Life', v: 10, u: 'yr' }, { k: 'i', t: 'num', l: 'Interest', v: 10, u: '%' }, { k: 'kw', t: 'num', l: 'Power', v: 45, u: 'kW' }, { k: 'tar', t: 'num', l: 'Tariff', v: 8, u: '₹/kWh' }, { k: 'op', t: 'num', l: 'Operators per shift', v: 2 }, { k: 'w', t: 'num', l: 'Cost per operator', v: 30000, u: '₹/month' }, { k: 'mt', t: 'num', l: 'Maintenance', v: 4, u: '% of price/yr' }, { k: 'sp', t: 'num', l: 'Space + overhead share', v: 12, u: '₹ lakh/yr' }, { k: 'h', t: 'num', l: 'Productive hours', v: 5500, u: 'h/yr' }], draw);
  const out2 = div(el, 'out');
  function draw() {
    const cm = (st.p - st.v) / 1000, F = st.F * 1e5, be = cm > 0 ? F / cm / 1e6 : NaN, mx = Math.max(60, st.c * 1.1);
    const pts = lin(0, mx, 30);
    box.innerHTML = chart({ x: [0, mx], y: [0, st.p * mx * 1e3 / 1e7 * 1.05], xl: 'volume, million per year', yl: '₹ crore per year', series: [{ p: pts.map(q => [q, q * 1e6 * st.p / 1000 / 1e7]), c: 'b' }, { p: pts.map(q => [q, (F + q * 1e6 * st.v / 1000) / 1e7]), c: 'o' }, { p: [[0, F / 1e7], [mx, F / 1e7]], c: 'd', dash: 1 }], labels: [[mx * 0.98, mx * st.p / 1e4 * 0.98, 'revenue', 0, -6, 'bt', 'end'], [mx * 0.98, (F + mx * 1e6 * st.v / 1000) / 1e7, 'total cost', 0, 16, 'ot', 'end']], pts: Number.isFinite(be) ? [[be, be * 1e6 * st.p / 1000 / 1e7], [st.q, st.q * 1e6 * st.p / 1000 / 1e7, 5, 'fp']] : [], extra: (X, Y) => `<line x1="${X(st.c)}" y1="${Y(0)}" x2="${X(st.c)}" y2="${Y(1e9)}" class="d dash"/>` });
    const prof = st.q * 1e6 * cm - F;
    out.textContent = `Contribution = ${st.p} − ${st.v} = ₹${fmt(st.p - st.v, 0)} per 1 000 (${fmt((st.p - st.v) / st.p * 100, 1)} % of price)\nBreak-even = ₹${st.F} lakh ÷ ₹${fmt(cm, 3)} = ${fmt(be, 1)} million/yr\nAt ${st.q} million: profit ${lakh(prof)}\nMargin of safety = ${fmt((st.q - be) / st.q * 100, 1)} %\nBreak-even uses ${fmt(be / st.c * 100, 0)} % of capacity (dashed line).`;
    const dep = m.P * 1e5 / m.L, int = m.P * 1e5 / 2 * m.i / 100, pw = m.kw * 0.7 * m.tar * m.h, lab_ = m.op * m.w * 12 * 3, mnt = m.P * 1e5 * m.mt / 100, sp = m.sp * 1e5, tot = dep + int + pw + lab_ + mnt + sp;
    out2.textContent = `Depreciation ${lakh(dep)} · Interest (on half the price) ${lakh(int)} · Power (70 % load) ${lakh(pw)}\nOperators (3 shifts) ${lakh(lab_)} · Maintenance ${lakh(mnt)} · Space and overheads ${lakh(sp)}\nTotal ${lakh(tot)} per year ÷ ${m.h} productive h = MHR ₹ ${fmt(tot / m.h, 0)} per hour\nAt 4 000 productive h the MHR would be ₹ ${fmt(tot / 4000, 0)} — lost OEE raises the rate.`;
  }
  draw();
};

/* Day 7: forecasting */
W.forecast = el => {
  lab(el);
  const st = form(el, [{ k: 'm', t: 'seg', l: 'Method', o: [['ma', 'Moving average'], ['es', 'Exponential smoothing']], v: 'es' }, { k: 'n', t: 'range', l: 'n (MA)', min: 2, max: 12, v: 3 }, { k: 'a', t: 'range', l: 'α (ES)', min: 0.05, max: 0.95, s: 0.05, v: 0.3 }, { k: 'tr', t: 'range', l: 'Trend', min: -3, max: 5, s: 0.5, v: 1.5, u: 't/month' }, { k: 'se', t: 'range', l: 'Season', min: 0, max: 30, v: 12, u: 't' }, { k: 'no', t: 'range', l: 'Noise', min: 0, max: 20, v: 6, u: 't' }, { k: 'sd', t: 'num', l: 'Seed', v: 7, min: 1 }], draw);
  const box = div(el), out = div(el, 'out');
  function draw() {
    const r = rng(st.sd), D = [];
    for (let t = 0; t < 24; t++) D.push(Math.max(0, 120 + st.tr * t + st.se * Math.sin(2 * PI * (t + 2) / 12) + st.no * gauss(r)));
    const F = new Array(25).fill(NaN);
    if (st.m === 'ma') { for (let t = st.n; t <= 24; t++) F[t] = D.slice(t - st.n, t).reduce((a, b) => a + b, 0) / st.n; }
    else { F[1] = D[0]; for (let t = 1; t < 24; t++) F[t + 1] = st.a * D[t] + (1 - st.a) * F[t]; }
    const E = []; for (let t = 0; t < 24; t++) if (Number.isFinite(F[t])) E.push([D[t] - F[t], D[t]]);
    const mad = E.reduce((a, e) => a + Math.abs(e[0]), 0) / E.length, mape = E.reduce((a, e) => a + Math.abs(e[0]) / e[1], 0) / E.length * 100, bias = E.reduce((a, e) => a + e[0], 0);
    const ymax = Math.max(...D, ...F.filter(Number.isFinite)) * 1.1;
    box.innerHTML = chart({ x: [1, 25], y: [0, ymax], w: 900, h: 330, xl: 'month', yl: 'demand, t', series: [{ p: D.map((d, i) => [i + 1, d]), c: 'b' }, { p: F.map((f, i) => [i + 1, f]).filter(p => Number.isFinite(p[1])), c: 'o', dash: 1 }], pts: [[25, F[24], 6, 'fa']], labels: [[2, ymax * 0.95, 'actual', 0, 0, 'bt'], [6, ymax * 0.95, '- - forecast', 0, 0, 'ot']] });
    out.textContent = `Next month (25) forecast: ${fmt(F[24], 1)} t\nMAD ${fmt(mad, 1)} t   MAPE ${fmt(mape, 1)} %   bias Σe ${fmt(bias, 1)} t   tracking signal ${fmt(bias / mad, 1)}${Math.abs(bias / mad) > 4 ? '  ⚠ biased — the method lags the trend' : '  (within ±4)'}\nDemand σ ≈ 1.25 × MAD = ${fmt(1.25 * mad, 1)} t → feeds safety stock (Day 10).\nTry: a strong trend with small α, or a big season with a 12-month MA.`;
  }
  draw();
};

/* Day 8: MRP explosion */
W.mrp = el => {
  lab(el);
  const st = form(el, [{ k: 'q', t: 'num', l: 'Order', v: 10, u: 'lakh pouches' }, { k: 'a', t: 'num', l: 'Laminate per pouch', v: 0.0727, u: 'm²' }, { k: 'yp', t: 'num', l: 'Pouch waste', v: 8, u: '%' }, { k: 'ys', t: 'num', l: 'Slit trim', v: 3, u: '%' }, { k: 'yr', t: 'num', l: 'Print make-ready', v: 5, u: '%' }, { k: 'wk', t: 'num', l: 'Printing starts in week', v: 4 }], draw);
  const rows = [['PET 12 µm', 16.8, 600, 0, 1000, 3], ['Al foil 9 µm', 24.4, 900, 1000, 500, 8], ['PE film 80 µm (in-house)', 73.6, 2500, 0, 1000, 0.5], ['Inks (dry)', 3.0, 120, 0, 50, 1], ['Adhesive (dry, 2 passes)', 5.0, 200, 0, 200, 2]];
  edTable(el, [{ h: 'Material', t: 'text' }, { h: 'g/m²', t: 'num' }, { h: 'On hand, kg', t: 'num' }, { h: 'On order, kg', t: 'num' }, { h: 'Pack / lot, kg', t: 'num' }, { h: 'Lead time, wk', t: 'num' }], rows, draw, ['New material', 1, 0, 0, 100, 1]);
  const out = div(el, 'out');
  function draw() {
    const lam = st.q * 1e5 * st.a * (1 + st.yp / 100), web = lam * (1 + st.ys / 100), pr = web * (1 + st.yr / 100);
    let t = `Laminate needed ${fmt(lam, 0)} m² → slit input ${fmt(web, 0)} m² → printed web ${fmt(pr, 0)} m²\n\n${'Material'.padEnd(26)}${'gross kg'.padStart(9)}${'on hand'.padStart(9)}${'on order'.padStart(9)}${'net kg'.padStart(9)}${'order kg'.padStart(10)}  release\n`;
    rows.forEach(r => {
      const area = /PE film|Adhes/i.test(r[0]) ? web : pr, g = area * r[1] / 1000, net = Math.max(0, g - r[2] - r[3]), ord = net > 0 ? Math.ceil(net / Math.max(r[4], 1)) * Math.max(r[4], 1) : 0, rel = st.wk - r[5];
      t += `${String(r[0]).slice(0, 25).padEnd(26)}${fmt(g, 0).padStart(9)}${fmt(r[2], 0).padStart(9)}${fmt(r[3], 0).padStart(9)}${fmt(net, 0).padStart(9)}${fmt(ord, 0).padStart(10)}  ${ord ? (rel < 1 ? '⚠ week ' + fmt(rel, 1) + ' — late! expedite' : 'week ' + fmt(rel, 1)) : '— covered'}\n`;
    });
    out.textContent = t + '\nPE film and adhesive are applied at lamination, so they use the slit-input area; printed films and inks carry the print make-ready too.';
  }
  draw();
};

/* Day 9: sequencing Gantt */
W.sequence = el => {
  lab(el);
  const rows = [['A', 5, 4, 14], ['B', 2, 6, 10], ['C', 8, 3, 26], ['D', 3, 7, 16], ['E', 6, 2, 30], ['F', 4, 5, 22]];
  const st = form(el, [{ k: 'r', t: 'seg', l: 'Rule', o: [['fifo', 'FIFO'], ['spt', 'SPT'], ['edd', 'EDD'], ['joh', "Johnson's rule"]], v: 'fifo' }], draw);
  edTable(el, [{ h: 'Job', t: 'text' }, { h: 'Print h', t: 'num' }, { h: 'Laminate h', t: 'num' }, { h: 'Due at h', t: 'num' }], rows, draw, ['G', 3, 3, 30]);
  const box = div(el), out = div(el, 'out');
  function order(rule) {
    const ix = rows.map((_, i) => i);
    if (rule === 'spt') ix.sort((a, b) => rows[a][1] + rows[a][2] - rows[b][1] - rows[b][2]);
    if (rule === 'edd') ix.sort((a, b) => rows[a][3] - rows[b][3]);
    if (rule === 'joh') { const f = ix.filter(i => rows[i][1] < rows[i][2]).sort((a, b) => rows[a][1] - rows[b][1]), g = ix.filter(i => rows[i][1] >= rows[i][2]).sort((a, b) => rows[b][2] - rows[a][2]); return f.concat(g); }
    return ix;
  }
  function run(ix) { let t1 = 0, t2 = 0; return ix.map(i => { const s1 = t1; t1 += rows[i][1]; const s2 = Math.max(t1, t2); t2 = s2 + rows[i][2]; return { i, s1, e1: t1, s2, e2: t2 }; }); }
  function stats(g) { const ms = Math.max(...g.map(x => x.e2)), late = g.map(x => x.e2 - rows[x.i][3]); return { ms, flow: g.reduce((a, x) => a + x.e2, 0) / g.length, late: late.filter(l => l > 0).length, mx: Math.max(...late), tard: late.reduce((a, l) => a + Math.max(l, 0), 0) / g.length }; }
  function draw() {
    const g = run(order(st.r)), s0 = stats(g), ms = s0.ms, Wd = 760, L = 90, sc = (Wd - L - 20) / Math.max(ms, 1); let s = '';
    ['Print', 'Laminate'].forEach((m, k) => s += `<text x="${L - 8}" y="${44 + k * 50}" text-anchor="end">${m}</text>`);
    g.forEach((x, n) => { const late = x.e2 > rows[x.i][3]; [[x.s1, x.e1, 22], [x.s2, x.e2, 72]].forEach(b => { s += `<rect x="${L + b[0] * sc}" y="${b[2]}" width="${(b[1] - b[0]) * sc}" height="34" class="${late ? 'fo' : 'fb'}" style="stroke-width:1.5"/><text x="${L + (b[0] + b[1]) / 2 * sc}" y="${b[2] + 22}" text-anchor="middle" style="font-weight:700">${esc(rows[x.i][0])}</text>`; }); });
    for (let h = 0; h <= ms; h += Math.max(1, Math.round(ms / 15))) s += `<line x1="${L + h * sc}" y1="112" x2="${L + h * sc}" y2="118" class="d"/><text x="${L + h * sc}" y="132" text-anchor="middle" class="s">${h}</text>`;
    box.innerHTML = svgW(Wd, 145, s);
    const cmp = ['fifo', 'spt', 'edd', 'joh'].map(r => [r, stats(run(order(r)))]);
    out.textContent = `Sequence: ${g.map(x => rows[x.i][0]).join(' → ')}     (orange = finishes late)\n\nRule      makespan  avg flow  late jobs  max lateness  avg tardiness\n` + cmp.map(c => `${({ fifo: 'FIFO', spt: 'SPT', edd: 'EDD', joh: 'Johnson' })[c[0]].padEnd(9)}${fmt(c[1].ms, 1).padStart(8)}${fmt(c[1].flow, 1).padStart(10)}${String(c[1].late).padStart(11)}${fmt(c[1].mx, 1).padStart(14)}${fmt(c[1].tard, 1).padStart(15)}`).join('\n');
  }
  draw();
};

/* Day 10: EOQ and reorder point */
W.eoq = el => {
  lab(el);
  const st = form(el, [{ k: 'D', t: 'num', l: 'Annual demand', v: 60000, u: 'kg' }, { k: 'S', t: 'num', l: 'Cost per order', v: 4000, u: '₹' }, { k: 'c', t: 'num', l: 'Price', v: 320, u: '₹/kg' }, { k: 'h', t: 'num', l: 'Holding', v: 25, u: '%/yr' }, { k: 'Q', t: 'range', l: 'Order quantity', min: 200, max: 8000, s: 100, v: 2400, u: 'kg' }, { k: 'sd', t: 'num', l: 'Daily σ', v: 50, u: 'kg' }, { k: 'L', t: 'num', l: 'Lead time', v: 10, u: 'days' }, { k: 'z', t: 'sel', l: 'Service', o: [['1.28', '90 %'], ['1.65', '95 %'], ['2.05', '98 %'], ['2.33', '99 %'], ['3.09', '99.9 %']], v: '2.05' }], draw);
  const row = div(el, 'row'), b1 = div(row), b2 = div(row), out = div(el, 'out');
  function draw() {
    const H = st.c * st.h / 100, eoq = Math.sqrt(2 * st.D * st.S / H), tc = q => st.D / q * st.S + q / 2 * H, qm = Math.max(8000, eoq * 2.2), qs = lin(100, qm, 60);
    const k_ = 1000; b1.innerHTML = chart({ x: [0, qm], y: [0, Math.min(tc(100), tc(qm) * 2) / k_], w: 400, h: 260, xl: 'order quantity, kg', yl: '₹ thousand per year', series: [{ p: qs.map(q => [q, st.D / q * st.S / k_]), c: 'o', dash: 1 }, { p: qs.map(q => [q, q / 2 * H / k_]), c: 'b', dash: 1 }, { p: qs.map(q => [q, tc(q) / k_]), c: 'k' }], pts: [[eoq, tc(eoq) / k_, 6, 'fp'], [st.Q, tc(st.Q) / k_]], labels: [[qm * 0.97, qm / 2 * H / k_, 'holding', 0, 16, 'bt', 'end'], [qm * 0.97, st.D / qm * st.S / k_, 'ordering', 0, -6, 'ot', 'end']] });
    const d = st.D / 300, ss = +st.z * st.sd * Math.sqrt(st.L), rop = d * st.L + ss, cyc = st.Q / d, saw = [];
    for (let k = 0; k < 3; k++) { saw.push([k * cyc, ss + st.Q], [(k + 1) * cyc, ss]); }
    b2.innerHTML = chart({ x: [0, 3 * cyc], y: [0, (ss + st.Q) * 1.1], w: 400, h: 260, xl: 'days', yl: 'stock, kg', series: [{ p: saw, c: 'b' }, { p: [[0, rop], [3 * cyc, rop]], c: 'o', dash: 1 }, { p: [[0, ss], [3 * cyc, ss]], c: 'd', dash: 1 }], labels: [[1, rop, 'reorder point', 0, -5, 'ot'], [1, ss, 'safety stock', 0, -5, 's']] });
    out.textContent = `EOQ = √(2 × ${st.D} × ${st.S} ÷ ${fmt(H, 1)}) = ${fmt(eoq, 0)} kg  → total cost ${rs(tc(eoq))}/yr\nYour Q = ${st.Q} kg → ${rs(tc(st.Q))}/yr (${fmt((tc(st.Q) / tc(eoq) - 1) * 100, 1)} % above the minimum) · ${fmt(st.D / st.Q, 1)} orders a year\nDaily use ${fmt(d, 0)} kg (300 days) · safety stock = z·σ·√L = ${st.z} × ${st.sd} × √${st.L} = ${fmt(ss, 0)} kg\nReorder point = ${fmt(d * st.L, 0)} + ${fmt(ss, 0)} = ${fmt(rop, 0)} kg · average stock ${fmt(st.Q / 2 + ss, 0)} kg = ${rs((st.Q / 2 + ss) * st.c)}`;
  }
  draw();
};

/* Day 11: SMED analyser */
W.smed = el => {
  lab(el);
  const rows = [['Fetch dies and tools', 8, true, 0], ['Find hand tools', 5, true, 0], ['Get new film roll', 6, true, 0], ['Remove old seal jaws', 10, false, 4], ['Fit and heat new seal jaws', 12, true, 0], ['Change cutting die', 8, false, 3], ['Set lengths and temperatures', 8, false, 2], ['Thread film', 5, false, 5], ['Trial and adjust to good pouch', 15, false, 9]];
  const st = form(el, [{ k: 'n', t: 'num', l: 'Changeovers per day', v: 5 }, { k: 'av', t: 'num', l: 'Available time per day', v: 1350, u: 'min' }, { k: 'gain', t: 'seg', l: 'Use the time for', o: [['cap', 'more capacity'], ['batch', 'smaller batches']], v: 'cap' }], draw);
  div(el, 'hint', 'Tick "External" for an element that can be done while the machine runs. Set the improved time for internal elements (quick clamps, presets, recipes).');
  edTable(el, [{ h: 'Element', t: 'text' }, { h: 'Now, min', t: 'num' }, { h: 'External?', t: 'chk' }, { h: 'Improved, min', t: 'num' }], rows, draw, ['New element', 5, false, 5]);
  const box = div(el), out = div(el, 'out');
  function draw() {
    const before = rows.reduce((a, r) => a + r[1], 0), after = rows.reduce((a, r) => a + (r[2] ? 0 : r[3]), 0), ext = rows.reduce((a, r) => a + (r[2] ? r[1] : 0), 0);
    box.innerHTML = bars([['Before', before, 'fo', fmt(before, 0) + ' min'], ['After (internal)', after, 'fb', fmt(after, 0) + ' min'], ['Moved outside', ext, 'fg', fmt(ext, 0) + ' min external']], { max: before });
    const lostB = st.n * before, lostA = st.n * after, runB = st.av - lostB, runA = st.av - lostA;
    out.textContent = `Changeover ${fmt(before, 0)} → ${fmt(after, 0)} min (−${fmt((1 - after / before) * 100, 0)} %)\n` + (st.gain === 'cap' ? `Lost per day ${fmt(lostB, 0)} → ${fmt(lostA, 0)} min · running time ${fmt(runB, 0)} → ${fmt(runA, 0)} min = +${fmt((runA / runB - 1) * 100, 1)} % output with the same batches` : `Same changeover minutes per day allow ${fmt(lostB / after, 1)} changeovers instead of ${st.n} → batches ${fmt(after / before * 100, 0)} % of today → cycle stock and WIP lead time fall in the same ratio`);
  }
  draw();
};

/* Day 12: Little's law and Kanban */
W.kanban = el => {
  lab(el);
  const st = form(el, [{ k: 'th', t: 'num', l: 'Throughput', v: 12, u: 't/day' }, { k: 'wip', t: 'range', l: 'WIP', min: 6, max: 200, v: 120, u: 't' }, { k: 'd', t: 'num', l: 'Kanban item use', v: 6, u: 'rolls/day' }, { k: 'L', t: 'num', l: 'Replenish lead time', v: 2, u: 'days' }, { k: 'C', t: 'num', l: 'Container', v: 1, u: 'roll' }, { k: 'a', t: 'range', l: 'Safety', min: 0, max: 50, v: 20, u: '%' }, { k: 'N', t: 'range', l: 'Cards in loop', min: 1, max: 30, v: 15 }, { k: 'var', t: 'range', l: 'Demand swing', min: 0, max: 80, v: 30, u: '%' }], k => { if (k !== 'wip' && k !== 'th') reset(); draw(); });
  const out = div(el, 'out'), ctl = div(el, 'ctl'), box = div(el), out2 = div(el, 'out');
  let S;
  function reset() { S = { t: 0, stock: st.N, used: 0, tr: [], so: 0 }; }
  function sim(dt) { for (let k = 0; k < dt; k += 0.02) { S.t += 0.02; const rate = st.d * (1 + st.var / 100 * Math.sin(S.t * 1.3) * (0.5 + 0.5 * Math.sin(S.t * 0.37))); S.tr = S.tr.filter(x => { if (x <= S.t) { S.stock++; return false; } return true; }); if (S.stock > 0) { S.used += rate * 0.02 / st.C; if (S.used >= 1) { S.used -= 1; S.stock--; S.tr.push(S.t + st.L); } } else S.so += 0.02; } draw(); }
  function draw() {
    const lt = st.wip / st.th, Nreq = st.d * st.L * (1 + st.a / 100) / st.C;
    out.textContent = `Little's Law: lead time = WIP ÷ throughput = ${st.wip} ÷ ${st.th} = ${fmt(lt, 1)} days\nKanban cards N = d × L × (1 + α) ÷ C = ${st.d} × ${st.L} × ${fmt(1 + st.a / 100, 2)} ÷ ${st.C} = ${fmt(Nreq, 1)} → ${Math.ceil(Nreq)} cards`;
    if (!S) return; let s = `<rect x="20" y="40" width="200" height="110" rx="10" class="fb" style="fill-opacity:.1"/><text x="120" y="32" text-anchor="middle" class="bt">Supermarket (full containers)</text><rect x="540" y="40" width="200" height="110" rx="10" class="fo" style="fill-opacity:.15"/><text x="640" y="32" text-anchor="middle" class="ot">Supplying process</text>`;
    for (let i = 0; i < S.stock; i++) s += `<rect x="${32 + (i % 9) * 21}" y="${54 + Math.floor(i / 9) * 22}" width="17" height="17" rx="3" class="fp"/>`;
    S.tr.forEach(x => { const f = clamp(1 - (x - S.t) / st.L, 0, 1), ang = PI * f, cx = 380 - 240 * Math.cos(ang), cy = 165 + 40 * Math.sin(ang); s += `<rect x="${cx - 7}" y="${cy - 5}" width="14" height="10" rx="2" class="fa"/>`; });
    s += `<path d="M140,165 Q380,235 620,165" class="d dash"/><text x="380" y="235" text-anchor="middle" class="s">cards travel to the supplier and come back full after ${st.L} days</text>`;
    s += `<text x="120" y="172" text-anchor="middle">${S.stock} full · ${S.tr.length} in transit</text>`;
    if (S.stock === 0) s += `<text x="120" y="100" text-anchor="middle" class="ot" style="font-size:18px">STOCK-OUT</text>`;
    box.innerHTML = svgW(760, 245, s);
    out2.textContent = `Day ${fmt(S.t, 1)} · stock-out ${fmt(S.t ? S.so / S.t * 100 : 0, 1)} % of the time with ${st.N} cards.\nRemove cards one at a time until stock-outs appear — that is the WIP the loop really needs.`;
  }
  animCtl(ctl, el, dt => sim(dt * 1.5), () => sim(0.5));
  const rb = document.createElement('button'); rb.textContent = '↺ Reset'; rb.onclick = () => { reset(); draw(); }; ctl.appendChild(rb);
  reset(); draw();
};

/* Day 13: cost of quality */
W.coq = el => {
  lab(el);
  const st = form(el, [{ k: 'P', t: 'range', l: 'Prevention spend', min: 0, max: 150, v: 18, u: '₹ lakh/yr' }, { k: 'sales', t: 'num', l: 'Sales', v: 72, u: '₹ crore' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  const A0 = 225 * Math.exp(0.6), fail = p => A0 * Math.exp(-p / 30), appr = p => Math.max(20, 42 - 0.2 * (p - 18)), tot = p => p + appr(p) + fail(p);
  function draw() {
    const ps = lin(0, 150, 60); let best = 0; ps.forEach(p => { if (tot(p) < tot(best)) best = p; });
    box.innerHTML = chart({ x: [0, 150], y: [0, 500], xl: 'prevention spend, ₹ lakh/yr', yl: '₹ lakh per year', series: [{ p: ps.map(p => [p, p]), c: 'b', dash: 1 }, { p: ps.map(p => [p, appr(p)]), c: 'd' }, { p: ps.map(p => [p, fail(p)]), c: 'o' }, { p: ps.map(p => [p, tot(p)]), c: 'k', w: 3 }], pts: [[st.P, tot(st.P)], [best, tot(best), 5, 'fp']], labels: [[110, fail(110) + 14, 'failure', 0, 0, 'ot'], [120, 135, 'prevention', 0, 0, 'bt'], [4, tot(4) - 8, 'total', 8, 0, 'bt']] });
    const f = fail(st.P), T = tot(st.P);
    out.textContent = `Prevention   ₹ ${fmt(st.P, 1)} lakh\nAppraisal    ₹ ${fmt(appr(st.P), 1)} lakh\nInt. failure ₹ ${fmt(f * 0.73, 1)} lakh\nExt. failure ₹ ${fmt(f * 0.27, 1)} lakh\nTotal        ₹ ${fmt(T, 1)} lakh = ${fmt(T / (st.sales * 100) * 100, 2)} % of sales\nFailure share ${fmt(f / T * 100, 0)} %\n\nLowest total in this model at ≈ ₹ ${fmt(best, 0)} lakh of prevention (₹ ${fmt(tot(best), 0)} lakh total).\nThe model is illustrative: in real plants failure costs keep falling as prevention matures — the optimum moves towards prevention.`;
  }
  draw();
};

/* Day 14: X̄–R chart simulator */
W.spc = el => {
  lab(el);
  const ctl = div(el, 'ctl'); ctl.innerHTML = '<button data-m="0" class="on">Normal</button><button data-m="1">Shift mean +1.5σ</button><button data-m="2">Trend (wear)</button><button data-m="3">Double spread</button>';
  let mode = 0, data = [], tr = 0; const mu = 42, sg = 2.06, n = 5;
  ctl.onclick = e => { const b = e.target.closest('button[data-m]'); if (!b) return; mode = +b.dataset.m; tr = 0; $$('button[data-m]', ctl).forEach(x => x.classList.toggle('on', x === b)); };
  const c2 = div(el, 'ctl'), box = div(el), out = div(el, 'out');
  function sub() { const xs = []; tr += mode === 2 ? 0.12 : 0; for (let i = 0; i < n; i++) xs.push(mu + (mode === 1 ? 1.5 * sg : 0) + tr * sg * 0.25 + sg * (mode === 3 ? 2 : 1) * gauss(Math.random)); const m = xs.reduce((a, b) => a + b, 0) / n; data.push([m, Math.max(...xs) - Math.min(...xs)]); if (data.length > 200) data.shift(); draw(); }
  function draw() {
    if (data.length < 20) { box.innerHTML = '<p class="hint">Collecting the first 20 subgroups to set the limits… press ▶ Play or ⏭ Step.</p>'; out.textContent = data.length + ' / 20 subgroups'; return; }
    const base = data.slice(0, 20), Xb = base.reduce((a, d) => a + d[0], 0) / 20, Rb = base.reduce((a, d) => a + d[1], 0) / 20, ucl = Xb + 0.577 * Rb, lcl = Xb - 0.577 * Rb, uR = 2.114 * Rb;
    const last = data.slice(-40), off = data.length - last.length, sig = [], s1 = (ucl - Xb) / 3;
    last.forEach((d, i) => { let f = d[0] > ucl || d[0] < lcl || d[1] > uR; const k = off + i; if (k >= 7) { const w = data.slice(k - 7, k + 1); if (w.every(x => x[0] > Xb) || w.every(x => x[0] < Xb)) f = true; } if (k >= 5) { const w = data.slice(k - 5, k + 1); let up = true, dn = true; for (let j = 1; j < 6; j++) { up = up && w[j][0] > w[j - 1][0]; dn = dn && w[j][0] < w[j - 1][0]; } if (up || dn) f = true; } sig.push(f); });
    const xr = [off + 1, off + 40], yr = [lcl - 3 * s1, ucl + 3 * s1];
    box.innerHTML = chart({ x: xr, y: yr, w: 900, h: 280, xl: '', yl: 'X̄, N/15 mm', series: [{ p: last.map((d, i) => [off + i + 1, d[0]]), c: 'b' }, { p: [[xr[0], ucl], [xr[1], ucl]], c: 'o', dash: 1 }, { p: [[xr[0], lcl], [xr[1], lcl]], c: 'o', dash: 1 }, { p: [[xr[0], Xb], [xr[1], Xb]], c: 'd' }], pts: last.map((d, i) => [off + i + 1, d[0], sig[i] ? 7 : 3.5, sig[i] ? 'fa' : 'fp']), labels: [[xr[1], ucl, 'UCL ' + fmt(ucl, 2), -4, -5, 'ot', 'end'], [xr[1], lcl, 'LCL ' + fmt(lcl, 2), -4, 14, 'ot', 'end']] })
      + chart({ x: xr, y: [0, uR * 1.6], w: 900, h: 200, xl: 'subgroup', yl: 'R', series: [{ p: last.map((d, i) => [off + i + 1, d[1]]), c: 'b' }, { p: [[xr[0], uR], [xr[1], uR]], c: 'o', dash: 1 }, { p: [[xr[0], Rb], [xr[1], Rb]], c: 'd' }], pts: last.map((d, i) => [off + i + 1, d[1], d[1] > uR ? 7 : 3.5, d[1] > uR ? 'fa' : 'fp']) });
    const firstSig = sig.indexOf(true);
    out.textContent = `Limits from subgroups 1–20: X̿ = ${fmt(Xb, 2)}, R̄ = ${fmt(Rb, 2)} → X̄ ${fmt(lcl, 2)} to ${fmt(ucl, 2)} · R up to ${fmt(uR, 2)}\nSignals (big orange points) use: beyond limits, 8 in a row on one side, 6 rising or falling.\n${firstSig >= 0 ? '⚠ Signal at subgroup ' + (off + firstSig + 1) + ' — stop, find the special cause, record it.' : 'No signals in view — leave the process alone.'}`;
  }
  animCtl(c2, el, (() => { let acc = 0; return dt => { acc += dt; if (acc > 0.35) { acc = 0; sub(); } }; })(), sub);
  const rb = document.createElement('button'); rb.textContent = '↺ Reset'; rb.onclick = () => { data = []; tr = 0; draw(); }; c2.appendChild(rb);
  for (let i = 0; i < 20; i++) sub();
};

/* Day 15: capability */
W.capability = el => {
  lab(el);
  const st = form(el, [{ k: 'lsl', t: 'num', l: 'LSL', v: 45, u: 'µm' }, { k: 'usl', t: 'num', l: 'USL', v: 55, u: 'µm' }, { k: 'mu', t: 'range', l: 'Mean', min: 42, max: 58, s: 0.1, v: 51.5 }, { k: 'sg', t: 'range', l: 'σ', min: 0.3, max: 4, s: 0.05, v: 2.5 }, { k: 'pr', t: 'num', l: 'Resin price', v: 120, u: '₹/kg' }, { k: 'ton', t: 'num', l: 'Line output', v: 5000, u: 't/yr' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row);
  const r = rng(11), z = []; for (let i = 0; i < 500; i++) z.push(gauss(r));
  function draw() {
    const xs = z.map(v => st.mu + st.sg * v), lo = Math.min(st.lsl, st.mu - 4 * st.sg) - 1, hi = Math.max(st.usl, st.mu + 4 * st.sg) + 1, nb = 30, bw = (hi - lo) / nb, h = new Array(nb).fill(0);
    xs.forEach(x => { const k = Math.floor((x - lo) / bw); if (k >= 0 && k < nb) h[k]++; });
    const ymax = Math.max(...h, 500 * bw / (st.sg * Math.sqrt(2 * PI))) * 1.15;
    box.innerHTML = chart({ x: [lo, hi], y: [0, ymax], xl: 'thickness, µm', yl: 'count of 500', extra: (X, Y) => h.map((c, k) => `<rect x="${X(lo + k * bw)}" y="${Y(c)}" width="${Math.max(X(lo + (k + 1) * bw) - X(lo + k * bw) - 1, 1)}" height="${Y(0) - Y(c)}" class="${lo + (k + 0.5) * bw < st.lsl || lo + (k + 0.5) * bw > st.usl ? 'fo' : 'fb'}"/>`).join('') + `<line x1="${X(st.lsl)}" y1="${Y(0)}" x2="${X(st.lsl)}" y2="${Y(ymax)}" class="o" style="stroke-width:3"/><line x1="${X(st.usl)}" y1="${Y(0)}" x2="${X(st.usl)}" y2="${Y(ymax)}" class="o" style="stroke-width:3"/>`, series: [{ p: lin(lo, hi, 80).map(x => [x, 500 * bw * Math.exp(-((x - st.mu) ** 2) / (2 * st.sg ** 2)) / (st.sg * Math.sqrt(2 * PI))]), c: 'k' }], labels: [[st.lsl, ymax * 0.95, 'LSL', 4, 0, 'ot'], [st.usl, ymax * 0.95, 'USL', -4, 0, 'ot', 'end']] });
    const cp = (st.usl - st.lsl) / (6 * st.sg), cpk = Math.min(st.usl - st.mu, st.mu - st.lsl) / (3 * st.sg), ppm = (ncdf((st.lsl - st.mu) / st.sg) + 1 - ncdf((st.usl - st.mu) / st.sg)) * 1e6, obs = xs.filter(x => x < st.lsl || x > st.usl).length;
    const nom = (st.usl + st.lsl) / 2, aim = st.lsl + 3 * st.sg, give = (Math.max(aim, nom) - nom) / nom;
    kpis(out, [['Cp', fmt(cp, 2)], ['Cpk', fmt(cpk, 2), cpk < 1.33 ? 'w' : ''], ['Expected PPM', fmt(ppm, 0)], ['Out of 500', obs]]);
    div(out, 'out', `${cpk < 1 ? '⚠ Not capable.' : cpk < 1.33 ? 'Marginal — below the usual 1.33.' : '✓ Capable.'} ${cp - cpk > 0.25 ? 'Cp ≫ Cpk → re-centre first (cheap).' : cp < 1.33 ? 'Cp low → reduce variation.' : ''}\nGive-away: to keep thin spots 3σ above LSL the aim must be ${fmt(aim, 1)} µm vs nominal ${fmt(nom, 1)} µm\n→ ${fmt(give * 100, 1)} % extra resin ≈ ${fmt(give * st.ton, 0)} t/yr ≈ ${lakh(give * st.ton * 1000 * st.pr)}. Cut σ and see it fall.`);
  }
  draw();
};

/* Day 16: OC curve */
function pacc(n, c, p) { if (p <= 0) return 1; if (p >= 1) return c >= n ? 1 : 0; let pk = Math.pow(1 - p, n), s = pk; for (let k = 0; k < c; k++) { pk = pk * (n - k) / (k + 1) * p / (1 - p); s += pk; } return Math.min(1, s); }
W.occurve = el => {
  lab(el);
  const st = form(el, [{ k: 'n', t: 'range', l: 'Sample n', min: 5, max: 315, v: 80 }, { k: 'c', t: 'range', l: 'Accept number c', min: 0, max: 10, v: 2 }, { k: 'aql', t: 'num', l: 'AQL', v: 1, u: '%' }, { k: 'ltpd', t: 'num', l: 'LTPD', v: 6.5, u: '%' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const ps = lin(0, 0.15, 120), a = pacc(st.n, st.c, st.aql / 100), b = pacc(st.n, st.c, st.ltpd / 100);
    box.innerHTML = chart({ x: [0, 15], y: [0, 1], xl: 'lot fraction defective, %', yl: 'probability of acceptance', series: [{ p: ps.map(p => [p * 100, pacc(st.n, st.c, p)]), c: 'b' }], pts: [[st.aql, a, 7, 'fp'], [st.ltpd, b]], extra: (X, Y) => `<line x1="${X(st.aql)}" y1="${Y(0)}" x2="${X(st.aql)}" y2="${Y(a)}" class="d dash"/><line x1="${X(st.ltpd)}" y1="${Y(0)}" x2="${X(st.ltpd)}" y2="${Y(b)}" class="d dash"/>`, labels: [[st.aql, a, 'AQL', 8, -8, 'bt'], [st.ltpd, b, 'LTPD', 8, -8, 'ot']] });
    let p50 = 0; for (let p = 0; p < 0.5; p += 0.0005) if (pacc(st.n, st.c, p) < 0.5) { p50 = p; break; }
    out.textContent = `Plan: inspect ${st.n}, accept if ≤ ${st.c} defectives\nAt AQL ${st.aql} %: P(accept) = ${fmt(a * 100, 1)} % → producer's risk α = ${fmt((1 - a) * 100, 1)} %\nAt LTPD ${st.ltpd} %: P(accept) = ${fmt(b * 100, 1)} % → consumer's risk β = ${fmt(b * 100, 1)} %\nA lot ${fmt(p50 * 100, 1)} % defective is accepted half the time.\n\nUsual targets: α ≈ 5 %, β ≈ 10 %. Bigger n makes the curve steeper; c = 0 makes it strict but rejects good lots too.`;
  }
  draw();
};

/* Day 17: Pareto */
W.pareto = el => {
  lab(el);
  const rows = [['Low bond strength', 46], ['Wrinkles', 18], ['Coat-weight variation', 12], ['Print register', 8], ['Colour (ΔE)', 6], ['Pin-holes', 4], ['Edge damage', 3], ['Others', 3]];
  const st = form(el, [{ k: 'u', t: 'seg', l: 'Values are', o: [['rolls rejected', 'counts'], ['₹ lakh lost', '₹ lakh']], v: 'rolls rejected' }], draw);
  edTable(el, [{ h: 'Defect / cause', t: 'text' }, { h: 'Count or ₹', t: 'num' }], rows, draw, ['New', 1]);
  const box = div(el), out = div(el, 'out');
  function draw() {
    const d = rows.filter(r => r[1] > 0).slice().sort((a, b) => b[1] - a[1]), tot = d.reduce((a, r) => a + r[1], 0); if (!tot) return;
    let cum = 0; const cumP = d.map(r => (cum += r[1]) / tot * 100), vital = cumP.findIndex(c => c >= 80);
    const Wd = 760, H = 320, L = 80, R = 50, T = 14, B = 80, bw = (Wd - L - R) / d.length, mx = d[0][1], Y = v => H - B - v / mx * (H - B - T), Yp = p => H - B - p / 100 * (H - B - T);
    let s = `<line class="d" x1="${L}" y1="${H - B}" x2="${Wd - R}" y2="${H - B}"/><line class="d" x1="${Wd - R}" y1="${T}" x2="${Wd - R}" y2="${H - B}"/><line x1="${L}" y1="${Yp(80)}" x2="${Wd - R}" y2="${Yp(80)}" class="d dash"/><text x="${Wd - R + 4}" y="${Yp(80) + 4}" class="s">80 %</text>`;
    d.forEach((r, i) => { const x = L + i * bw; s += `<rect x="${x + 4}" y="${Y(r[1])}" width="${bw - 8}" height="${H - B - Y(r[1])}" class="${i <= vital ? 'fo' : 'fb'}"/><text x="${x + bw / 2}" y="${Y(r[1]) - 4}" text-anchor="middle" class="s">${fmt(r[1], 0)}</text><text x="${x + bw / 2}" y="${H - B + 14}" text-anchor="end" class="s" transform="rotate(-30 ${x + bw / 2} ${H - B + 14})">${esc(String(r[0]).slice(0, 22))}</text>`; });
    s += `<polyline class="b" points="${cumP.map((p, i) => (L + (i + 0.5) * bw) + ',' + Yp(p)).join(' ')}"/>` + cumP.map((p, i) => `<circle cx="${L + (i + 0.5) * bw}" cy="${Yp(p)}" r="3.5" class="fp"/>`).join('');
    box.innerHTML = svgW(Wd, H, s);
    out.textContent = `Total ${fmt(tot, 0)} ${st.u}. Vital few (orange, up to 80 %): ${d.slice(0, vital + 1).map(r => r[0]).join(', ')} = ${fmt(cumP[vital], 0)} % from ${vital + 1} of ${d.length} categories.\nTry entering cost instead of count — the order often changes.`;
  }
  draw();
};

/* Day 18: PFMEA */
function apOf(S, O, D) { if ((S >= 9 && (O >= 4 || (O >= 2 && D >= 5))) || (S >= 7 && O >= 6) || (S >= 7 && O >= 4 && D >= 7) || (S >= 4 && O >= 8 && D >= 5)) return 'H'; if ((S >= 9 && O >= 2) || (S >= 7 && O >= 4) || (S >= 7 && O >= 2 && D >= 7) || (S >= 4 && O >= 6) || (S >= 2 && O >= 8 && D >= 5)) return 'M'; return 'L'; }
W.fmea = el => {
  lab(el);
  const rows = [['Lamination: mix adhesive', 'Wrong mix ratio', 9, 5, 6], ['Printing: mount cylinders', 'Wrong artwork / cylinder set', 10, 2, 5], ['Printing: drying', 'Residual solvent above limit', 9, 3, 6], ['Slitting: label rolls', 'Mixed rolls of two jobs', 8, 3, 4], ['Pouch: sealing', 'Weak seal, leak', 7, 4, 4], ['Pouch: cutting', 'Dimension out of tolerance', 5, 4, 3], ['Lamination: wind', 'Wrinkles', 4, 6, 2], ['Printing: colour', 'Shade ΔE above limit', 6, 5, 3]];
  edTable(el, [{ h: 'Process step', t: 'text' }, { h: 'Failure mode', t: 'text' }, { h: 'S', t: 'num' }, { h: 'O', t: 'num' }, { h: 'D', t: 'num' }], rows, draw, ['New step', 'New failure mode', 5, 5, 5]);
  const out = div(el, 'out');
  function draw() {
    const r = rows.map(x => { const S = clamp(x[2], 1, 10), O = clamp(x[3], 1, 10), D = clamp(x[4], 1, 10); return [x[0], x[1], S, O, D, S * O * D, apOf(S, O, D)]; });
    const byR = r.slice().sort((a, b) => b[5] - a[5]), apRank = { H: 0, M: 1, L: 2 }, byA = r.slice().sort((a, b) => apRank[a[6]] - apRank[b[6]] || b[2] - a[2] || b[3] - a[3]);
    out.textContent = `Ranked by RPN = S × O × D          | Ranked by action priority (simplified AIAG–VDA)\n` + byR.map((x, i) => { const y = byA[i]; return `${String(x[5]).padStart(4)}  ${(x[1]).slice(0, 26).padEnd(27)}| ${y[6]}  S${y[2]} O${y[3]} D${y[4]}  ${y[1].slice(0, 28)}`; }).join('\n') + `\n\nNote how a severity-9/10 item with modest RPN still gets High priority. Severity falls only by design change; work on O first (prevention), then D.`;
  }
  draw();
};

/* Day 19: 5S radar */
const FIVE = ['Sort', 'Set in order', 'Shine', 'Standardise', 'Sustain'];
W.audit5s = el => {
  lab(el);
  const now = form(el, FIVE.map((f, i) => ({ k: 'a' + i, t: 'range', l: f, min: 0, max: 5, s: 0.5, v: [3, 2, 2.5, 1.5, 1][i] })), draw);
  div(el, 'hint', 'Last month (dashed):');
  const prev = form(el, FIVE.map((f, i) => ({ k: 'a' + i, t: 'range', l: f, min: 0, max: 5, s: 0.5, v: [2, 1.5, 2, 1, 1][i] })), draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const cx = 220, cy = 190, R = 150, P = (i, v) => [cx + R * v / 5 * Math.sin(2 * PI * i / 5), cy - R * v / 5 * Math.cos(2 * PI * i / 5)];
    let s = '';
    for (let g = 1; g <= 5; g++) s += `<polygon points="${FIVE.map((_, i) => P(i, g).join(',')).join(' ')}" style="fill:none;stroke:var(--rule)"/>`;
    FIVE.forEach((f, i) => { const p = P(i, 5.9); s += `<line x1="${cx}" y1="${cy}" x2="${P(i, 5)[0]}" y2="${P(i, 5)[1]}" style="stroke:var(--rule)"/><text x="${p[0]}" y="${p[1] + 4}" text-anchor="middle">${f}</text>`; });
    const a = FIVE.map((_, i) => now['a' + i]), b = FIVE.map((_, i) => prev['a' + i]);
    s += `<polygon points="${b.map((v, i) => P(i, v).join(',')).join(' ')}" class="o dash" style="fill:none"/><polygon points="${a.map((v, i) => P(i, v).join(',')).join(' ')}" class="fb"/>` + a.map((v, i) => `<circle cx="${P(i, v)[0]}" cy="${P(i, v)[1]}" r="4" class="fp"/>`).join('');
    box.innerHTML = svgW(440, 380, s);
    const tot = a.reduce((x, y) => x + y, 0), tp = b.reduce((x, y) => x + y, 0), w = a.indexOf(Math.min(...a));
    out.textContent = `Score ${fmt(tot, 1)} / 25 (${fmt(tot / 25 * 100, 0)} %), last month ${fmt(tp, 1)}\nWeakest: ${FIVE[w]} → next month's focus.\n\nTypical scale: 0 not started · 1 aware · 2 started in places · 3 done, not yet standard · 4 standard and audited · 5 a habit; team improves it unasked.\nSustain is almost always lowest — it depends on leaders checking every week.`;
  }
  draw();
};

/* Day 20: MTBF, MTTR, availability */
W.mtbf = el => {
  lab(el);
  const st = form(el, [{ k: 'h', t: 'num', l: 'Operating hours', v: 4200 }, { k: 'n', t: 'num', l: 'Breakdowns', v: 14 }, { k: 'rep', t: 'num', l: 'Repair time total', v: 35, u: 'h' }, { k: 'wait', t: 'num', l: 'Waiting time total', v: 28, u: 'h' }, { k: 'c', t: 'num', l: 'Contribution', v: 9000, u: '₹/h' }, { k: 'fr', t: 'range', l: 'What-if: fewer failures', min: 0, max: 80, v: 0, u: '%' }, { k: 'wr', t: 'range', l: 'What-if: less waiting', min: 0, max: 100, v: 70, u: '%' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row);
  function calc(n, rep, wait) { const mtbf = st.h / n, mttr = (rep + wait) / n; return { mtbf, mttr, A: mtbf / (mtbf + mttr), down: rep + wait }; }
  function draw() {
    const a = calc(st.n, st.rep, st.wait), n2 = st.n * (1 - st.fr / 100), b = calc(n2, st.rep * (1 - st.fr / 100), st.wait * (1 - st.fr / 100) * (1 - st.wr / 100));
    kpis(out, [['MTBF', fmt(a.mtbf, 0) + ' h'], ['MTTR', fmt(a.mttr, 1) + ' h'], ['Availability', fmt(a.A * 100, 2) + ' %'], ['Downtime cost', lakh(a.down * st.c), 'w']]);
    div(out, 'out', `After the what-if: MTBF ${fmt(b.mtbf, 0)} h · MTTR ${fmt(b.mttr, 1)} h · A ${fmt(b.A * 100, 2)} %\nDowntime ${fmt(a.down, 0)} → ${fmt(b.down, 0)} h → saves ${lakh((a.down - b.down) * st.c)} of contribution.\nWaiting is ${fmt(st.wait / (st.rep + st.wait) * 100, 0)} % of the downtime — spares, people and permits, not spanners.`);
    box.innerHTML = bars([['Repair now', st.rep, 'fb', fmt(st.rep, 0) + ' h'], ['Waiting now', st.wait, 'fo', fmt(st.wait, 0) + ' h'], ['Repair after', st.rep * (1 - st.fr / 100), 'fb', fmt(st.rep * (1 - st.fr / 100), 0) + ' h'], ['Waiting after', st.wait * (1 - st.fr / 100) * (1 - st.wr / 100), 'fo', fmt(st.wait * (1 - st.fr / 100) * (1 - st.wr / 100), 0) + ' h']], { w: 420, l: 110, max: Math.max(st.rep, st.wait) });
  }
  draw();
};

/* Day 21: P–F interval */
W.pf = el => {
  lab(el);
  const st = form(el, [{ k: 'pf', t: 'range', l: 'P–F interval', min: 5, max: 120, v: 56, u: 'days' }, { k: 'ii', t: 'range', l: 'Inspect every', min: 1, max: 90, v: 30, u: 'days' }, { k: 'act', t: 'range', l: 'Time to plan the repair', min: 0, max: 30, v: 7, u: 'days' }], () => { S.c = S.m = 0; draw(); });
  const ctl = div(el, 'ctl'), box = div(el), out = div(el, 'out');
  let S = { c: 0, m: 0, last: null };
  function trial() { const ph = Math.random() * st.ii, ins = []; for (let t = ph; t < st.pf + st.ii; t += st.ii) ins.push(t); const hit = ins.find(t => t <= st.pf - st.act); if (hit !== undefined) S.c++; else S.m++; S.last = { ins, hit }; draw(); }
  function draw() {
    const P = 20, F = 20 + st.pf, tmax = F + 15, L = S.last;
    const cond = t => t < P ? 100 : t > F ? 0 : 100 - 100 * Math.pow((t - P) / (F - P), 2.2) * 0.85 - (t >= F ? 15 : 0);
    box.innerHTML = chart({ x: [0, tmax], y: [0, 110], w: 900, h: 300, xl: 'days', yl: 'condition, %', series: [{ p: lin(0, tmax, 120).map(t => [t, cond(t)]), c: 'b' }], extra: (X, Y) => `<line x1="${X(F - st.act)}" y1="${Y(0)}" x2="${X(F - st.act)}" y2="${Y(110)}" class="o dash"/>` + (L ? L.ins.map(t => `<line x1="${X(P + t)}" y1="${Y(0)}" x2="${X(P + t)}" y2="${Y(14)}" class="${L.hit === t ? 'o' : 'd'}" style="stroke-width:${L.hit === t ? 5 : 2}"/>`).join('') : ''), labels: [[P, 104, 'P — detectable', 2, 0, 'bt'], [F, 8, 'F — failed', 4, 0, 'ot'], [F - st.act, 108, 'last useful catch', -4, 0, 'ot', 'end']] });
    const pr = clamp((st.pf - st.act) / st.ii, 0, 1);
    out.textContent = `Chance of at least one inspection in time = (P–F − planning time) ÷ interval = (${st.pf} − ${st.act}) ÷ ${st.ii} = ${fmt(pr * 100, 0)} %\nRule of thumb: inspect at ≤ half of that window → every ${fmt((st.pf - st.act) / 2, 0)} days, so you get two looks — one reading can be missed, misread or taken at the wrong load.\nTrials: caught ${S.c}, missed ${S.m}${S.c + S.m ? ' (' + fmt(S.c / (S.c + S.m) * 100, 0) + ' % caught)' : ''}. ${L ? (L.hit !== undefined ? 'Last: caught at an inspection (thick tick).' : 'Last: missed — it failed between inspections.') : 'Press P to run many failures.'}`;
  }
  animCtl(ctl, el, (() => { let a = 0; return dt => { a += dt; if (a > 0.4) { a = 0; trial(); } }; })(), trial);
  draw();
};

/* Day 22: risk matrix */
W.risk = el => {
  lab(el);
  const rows = [['Nip while cleaning rollers', 4, 5, 1, 5], ['Solvent fire in dryer', 2, 5, 1, 5], ['Falling roll in handling', 3, 4, 2, 3], ['Knife cut at slitter', 4, 2, 2, 2], ['Burn on seal jaws', 3, 2, 2, 2], ['Noise at granulator', 4, 2, 2, 1]];
  edTable(el, [{ h: 'Hazard', t: 'text' }, { h: 'L before', t: 'num' }, { h: 'S before', t: 'num' }, { h: 'L after', t: 'num' }, { h: 'S after', t: 'num' }], rows, draw, ['New hazard', 3, 3, 2, 3]);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  const band = r => r >= 10 ? 'H' : r >= 5 ? 'M' : 'L';
  function draw() {
    const c = 64, L0 = 70, T0 = 20; let s = '';
    for (let l = 1; l <= 5; l++) for (let sv = 1; sv <= 5; sv++) { const r = l * sv, b = band(r), x = L0 + (sv - 1) * c, y = T0 + (5 - l) * c; s += `<rect x="${x}" y="${y}" width="${c}" height="${c}" style="fill:${b === 'H' ? 'var(--acc)' : b === 'M' ? 'var(--hi)' : 'var(--code)'};fill-opacity:${b === 'H' ? .55 : 1};stroke:var(--card);stroke-width:2"/><text x="${x + c - 6}" y="${y + 14}" text-anchor="end" class="s">${r} ${b}</text>`; }
    for (let i = 1; i <= 5; i++) { s += `<text x="${L0 + (i - 0.5) * c}" y="${T0 + 5 * c + 18}" text-anchor="middle" class="s">${i}</text><text x="${L0 - 10}" y="${T0 + (5 - i + 0.5) * c + 4}" text-anchor="end" class="s">${i}</text>`; }
    s += `<text x="${L0 + 2.5 * c}" y="${T0 + 5 * c + 38}" text-anchor="middle" class="s">severity →</text><text x="20" y="${T0 + 2.5 * c}" text-anchor="middle" class="s" transform="rotate(-90 20 ${T0 + 2.5 * c})">likelihood →</text>`;
    const pos = (l, sv, i, k) => [L0 + (clamp(sv, 1, 5) - 0.5) * c + (i % 3 - 1) * 14 + k * 4, T0 + (5 - clamp(l, 1, 5) + 0.5) * c + (Math.floor(i / 3) % 2) * 14 - 6];
    rows.forEach((r, i) => { const a = pos(r[1], r[2], i, 0), b = pos(r[3], r[4], i, 0); s += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" class="d"/>`; });
    rows.forEach((r, i) => { const a = pos(r[1], r[2], i, 0), b = pos(r[3], r[4], i, 0); s += `<circle cx="${a[0]}" cy="${a[1]}" r="9" class="fa"/><text x="${a[0]}" y="${a[1] + 4}" text-anchor="middle" style="font-size:11px;font-weight:700">${i + 1}</text><circle cx="${b[0]}" cy="${b[1]}" r="9" class="fp"/><text x="${b[0]}" y="${b[1] + 4}" text-anchor="middle" style="font-size:11px;font-weight:700;fill:#fff">${i + 1}</text>`; });
    box.innerHTML = svgW(420, 400, s);
    out.textContent = 'Orange circle = before controls, blue = after.\n\n' + rows.map((r, i) => `${i + 1}. ${String(r[0]).slice(0, 28).padEnd(29)} ${String(r[1] * r[2]).padStart(2)} ${band(r[1] * r[2])} → ${String(r[3] * r[4]).padStart(2)} ${band(r[3] * r[4])}`).join('\n') + '\n\nBands: 1–4 low · 5–9 medium · 10–25 high. Any high residual risk needs more controls before work goes on.';
  }
  draw();
};

/* Day 23: standard time */
W.stdtime = el => {
  lab(el);
  const st = form(el, [{ k: 'ot', t: 'num', l: 'Observed time', v: 2.4, u: 'min/cycle' }, { k: 'r', t: 'range', l: 'Rating', min: 70, max: 130, v: 110, u: '%' }, { k: 'al', t: 'range', l: 'Allowances', min: 5, max: 30, v: 15, u: '%' }, { k: 'dem', t: 'num', l: 'Demand', v: 900, u: 'cycles/day' }, { k: 'sh', t: 'num', l: 'Shift', v: 450, u: 'min' }, { k: 'ef', t: 'range', l: 'Expected efficiency', min: 60, max: 100, v: 85, u: '%' }, { k: 'n', t: 'num', l: 'Shifts per day', v: 3 }], draw);
  const out = div(el);
  function draw() {
    const nt = st.ot * st.r / 100, stt = nt * (1 + st.al / 100), work = stt * st.dem, per = st.sh * st.ef / 100, ops = work / per;
    kpis(out, [['Normal time', fmt(nt, 2) + ' min'], ['Standard time', fmt(stt, 2) + ' min', 'w'], ['Output per operator-shift', fmt(per / stt, 0)], ['Work content', fmt(work / 60, 1) + ' h/day'], ['Operator-shifts needed', fmt(ops, 1)], ['Operators per shift', Math.ceil(ops / st.n) + ' (' + Math.ceil(ops / st.n) * st.n + ' total)']]);
    div(out, 'out', `Normal = ${st.ot} × ${st.r}% = ${fmt(nt, 3)} min;  standard = ${fmt(nt, 3)} × (1 + ${st.al}%) = ${fmt(stt, 3)} min\nWork per day = ${fmt(stt, 2)} × ${st.dem} = ${fmt(work, 0)} min; available per operator = ${st.sh} × ${st.ef}% = ${fmt(per, 0)} min\nRounding up per shift leaves ${fmt((Math.ceil(ops / st.n) * st.n - ops) * per / 60, 1)} h/day of spare time — use it for 5S, training or cover.`);
  }
  draw();
};

/* Day 24: compressed-air leaks */
function leakNm3h(dmm, pbarg) { const A = PI * (dmm / 1000) ** 2 / 4, p0 = (pbarg + 1.013) * 1e5, k = 1.4, R = 287, T = 293, m = 0.65 * A * p0 * Math.sqrt(k / (R * T)) * Math.pow(2 / (k + 1), (k + 1) / (2 * (k - 1))); return m / 1.293 * 3600; }
W.air = el => {
  lab(el);
  const st = form(el, [{ k: 'n', t: 'num', l: 'Number of leaks', v: 40 }, { k: 'd', t: 'range', l: 'Average hole', min: 0.5, max: 5, s: 0.1, v: 1, u: 'mm' }, { k: 'p', t: 'range', l: 'Pressure', min: 4, max: 10, s: 0.5, v: 7, u: 'bar g' }, { k: 'sec', t: 'num', l: 'Compressor SEC', v: 0.11, u: 'kWh/Nm³' }, { k: 'h', t: 'num', l: 'Pressurised hours', v: 8000, u: 'h/yr' }, { k: 'tar', t: 'num', l: 'Tariff', v: 8, u: '₹/kWh' }, { k: 'kw', t: 'num', l: 'Total compressor power', v: 110, u: 'kW' }, { k: 'dp', t: 'range', l: 'Lower pressure by', min: 0, max: 2, s: 0.5, v: 0, u: 'bar' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    const q1 = leakNm3h(st.d, st.p), Q = q1 * st.n, kw = Q * st.sec, kwh = kw * st.h, cost = kwh * st.tar;
    const ds = lin(0.5, 5, 40);
    box.innerHTML = chart({ x: [0.5, 5], y: [0, leakNm3h(5, st.p) * st.sec * st.h * st.tar / 1e5 * 1.05], w: 420, h: 260, xl: 'hole diameter, mm', yl: '₹ lakh per year, one leak', series: [{ p: ds.map(d => [d, leakNm3h(d, st.p) * st.sec * st.h * st.tar / 1e5]), c: 'o' }], pts: [[st.d, q1 * st.sec * st.h * st.tar / 1e5]] });
    const pSave = st.kw * 0.07 * st.dp * st.h * st.tar;
    out.textContent = `One ${st.d} mm leak at ${st.p} bar ≈ ${fmt(q1, 2)} Nm³/h (${fmt(q1 / 0.06, 0)} L/min)\n${st.n} leaks ≈ ${fmt(Q, 0)} Nm³/h → ${fmt(kw, 1)} kW of compressor power\n= ${fmt(kwh, 0)} kWh/yr = ${lakh(cost)} per year\n${st.dp > 0 ? `\nLowering pressure by ${st.dp} bar saves ≈ ${fmt(7 * st.dp, 0)} % of ${st.kw} kW ≈ ${lakh(pSave)}/yr (and leaks shrink too).` : '\nTry lowering the system pressure — each bar saves ≈ 7 % of compressor power.'}\nCost doubles roughly as hole area: a 3 mm leak costs ~9× a 1 mm leak.`;
  }
  draw();
};

/* Day 25: supplier scorecard */
W.supplier = el => {
  lab(el);
  const rows = [['Quality (PPM, film breaks)', 30, 9, 6, 7], ['Total cost of ownership', 25, 6, 9, 7], ['Delivery (OTIF, lead time)', 20, 9, 5, 7], ['Technical support', 10, 8, 5, 6], ['Financial health', 5, 8, 8, 6], ['Supply risk (location, sources)', 10, 8, 4, 7]];
  const names = { a: 'A · domestic mill', b: 'B · importer', c: 'C · regional mill' };
  edTable(el, [{ h: 'Criterion', t: 'text' }, { h: 'Weight %', t: 'num' }, { h: 'Score A (1–10)', t: 'num' }, { h: 'Score B', t: 'num' }, { h: 'Score C', t: 'num' }], rows, draw, ['New criterion', 5, 5, 5, 5]);
  const box = div(el), out = div(el, 'out');
  function draw() {
    const wsum = rows.reduce((a, r) => a + r[1], 0) || 1, tot = [2, 3, 4].map(j => rows.reduce((a, r) => a + r[1] * r[j], 0) / wsum);
    const nm = [names.a, names.b, names.c], best = tot.indexOf(Math.max(...tot));
    box.innerHTML = bars(nm.map((n, i) => [n, tot[i], i === best ? 'fo' : 'fb', fmt(tot[i], 2) + ' / 10']), { max: 10 });
    out.textContent = `Weights add to ${wsum} %${wsum !== 100 ? ' (normalised to 100)' : ''}.\nBest: ${nm[best]}.
Change the weights: does the winner change if price weighs 50 %? If so, the decision is really about price vs risk — say so in the proposal.`;
  }
  draw();
};

/* Day 26: yield cascade */
W.yield = el => {
  lab(el);
  const rows = [['Printing', 95, 190], ['Lamination', 98, 12], ['Slitting', 96, 4], ['Pouch making', 94, 6]];
  const st = form(el, [{ k: 'q', t: 'num', l: 'Good output needed', v: 10, u: 't' }, { k: 'res', t: 'num', l: 'Scrap resale', v: 15, u: '₹/kg' }], draw);
  div(el, 'hint', 'Cost added at each step, ₹/kg: the first step includes the material price.');
  edTable(el, [{ h: 'Step', t: 'text' }, { h: 'Yield %', t: 'num' }, { h: 'Cost added, ₹/kg', t: 'num' }], rows, draw, ['New step', 98, 3]);
  const box = div(el), out = div(el, 'out');
  function draw() {
    let Y = 1; rows.forEach(r => Y *= clamp(r[1], 1, 100) / 100);
    const inp = []; let need = st.q; for (let i = rows.length - 1; i >= 0; i--) { const x = need / (clamp(rows[i][1], 1, 100) / 100); inp[i] = x; need = x; }
    let acc = 0; const items = []; let loss = 0;
    rows.forEach((r, i) => { acc += r[2]; const out_ = i < rows.length - 1 ? inp[i + 1] : st.q, sc = inp[i] - out_, val = sc * 1000 * (acc - st.res); loss += val; items.push([r[0] + ' scrap', sc, 'fo', fmt(sc * 1000, 0) + ' kg · ' + lakh(val)]); });
    box.innerHTML = bars([['Input', inp[0], 'fb', fmt(inp[0], 2) + ' t']].concat(items, [['Good output', st.q, 'fb', fmt(st.q, 2) + ' t']]), { l: 170, max: inp[0] });
    out.textContent = `Overall yield = ${rows.map(r => r[1] + '%').join(' × ')} = ${fmt(Y * 100, 1)} %\nInput needed ${fmt(inp[0], 2)} t for ${st.q} t good → scrap ${fmt(inp[0] - st.q, 2)} t\nValue lost (cost accumulated to each step, less resale) ≈ ${lakh(loss)}\nRaise the LAST step's yield by 2 points and compare with the first step — late scrap is dearer.`;
  }
  draw();
};

/* Day 27: live machine data */
const STOPS = [['Film splice', 0.28], ['Seal-jaw jam', 0.22], ['Sensor trip', 0.18], ['Waiting for film', 0.17], ['Zipper misfeed', 0.15]];
W.iiot = el => {
  lab(el);
  const ctl = div(el, 'ctl'), box = div(el), out = div(el);
  let S;
  function gen() {
    const r = Math.random, m = new Array(450).fill(null).map(() => ({ s: 'run' }));
    const put = (a, len, st, why) => { for (let i = a; i < Math.min(450, a + len); i++) m[i] = { s: st, why }; };
    put(190 + Math.floor(r() * 40), 25 + Math.floor(r() * 20), 'changeover', 'Size change');
    if (r() < 0.7) put(60 + Math.floor(r() * 300), 15 + Math.floor(r() * 25), 'breakdown', 'Drive fault');
    for (let t = 5; t < 445; t += 8 + Math.floor(r() * 25)) if (m[t].s === 'run') { let u = r(), w = STOPS[0][0]; for (const sx of STOPS) { if (u < sx[1]) { w = sx[0]; break; } u -= sx[1]; } put(t, 1 + Math.floor(r() * 6), 'stop', w); }
    m.forEach(x => { if (x.s === 'run') { x.v = 100 + 16 * r() - (r() < 0.1 ? 25 : 0); x.rej = x.v * (0.015 + 0.03 * r()); } else { x.v = 0; x.rej = 0; } });
    S = { m, t: 0 };
  }
  function adv(dt) { S.t = Math.min(450, S.t + dt); draw(); }
  function draw() {
    const n = Math.floor(S.t), seen = S.m.slice(0, n), Wd = 760, H = 170, X = t => 40 + t / 450 * (Wd - 60), Y = v => 130 - v / 130 * 110;
    let s = `<line class="d" x1="40" y1="${Y(0)}" x2="${Wd - 20}" y2="${Y(0)}"/><line x1="40" y1="${Y(120)}" x2="${Wd - 20}" y2="${Y(120)}" class="d dash"/><text x="${Wd - 20}" y="${Y(120) - 4}" text-anchor="end" class="s">rated 120 ppm</text>`;
    seen.forEach((x, i) => { if (x.s !== 'run') s += `<rect x="${X(i)}" y="${Y(128)}" width="${X(1) - X(0) + 0.5}" height="${Y(0) - Y(128)}" class="${x.s === 'stop' ? 'fo' : x.s === 'changeover' ? 'fg' : 'fa'}" style="fill-opacity:${x.s === 'stop' ? .35 : .7};stroke:none"/>`; });
    s += `<polyline class="b" style="stroke-width:1.5" points="${seen.map((x, i) => X(i) + ',' + Y(x.v)).join(' ')}"/>`;
    for (let h = 0; h <= 450; h += 60) s += `<text x="${X(h)}" y="${H - 18}" text-anchor="middle" class="s">${h} min</text>`;
    box.innerHTML = svgW(Wd, H, s);
    const run = seen.filter(x => x.s === 'run').length, tc = seen.reduce((a, x) => a + x.v, 0), rej = seen.reduce((a, x) => a + x.rej, 0), A = n ? run / n : 0, P = run ? tc / (run * 120) : 0, Q = tc ? (tc - rej) / tc : 0;
    const why = {}; let i = 0; while (i < n) { const x = seen[i]; if (x.s !== 'run') { let j = i; while (j < n && seen[j].s === x.s && seen[j].why === x.why) j++; const len = j - i, key = x.s === 'changeover' ? 'Changeover' : x.s === 'breakdown' ? 'Breakdown: ' + x.why : len > 2 ? 'Small stop: ' + x.why : 'Micro stop: ' + x.why; why[key] = (why[key] || 0) + len; i = j; } else i++; }
    const par = Object.entries(why).sort((a, b) => b[1] - a[1]);
    kpis(out, [['Shift time', n + ' / 450 min'], ['Availability', fmt(A * 100, 1) + ' %'], ['Performance', fmt(P * 100, 1) + ' %'], ['Quality', fmt(Q * 100, 1) + ' %'], ['OEE (live)', fmt(A * P * Q * 100, 1) + ' %', 'w'], ['Good pouches', fmt(tc - rej, 0)]]);
    div(out, 'out', 'Stop Pareto (minutes):\n' + (par.length ? par.map(p => `${p[0].padEnd(32)} ${String(p[1]).padStart(4)}  ${'█'.repeat(Math.round(p[1] / Math.max(par[0][1], 1) * 30))}`).join('\n') : '— no stops yet —') + '\n\nOrange bands: short stops · grey: changeover · amber: breakdown. Manual logs typically miss the short ones.');
  }
  animCtl(ctl, el, dt => adv(dt * 20), () => adv(15));
  const rb = document.createElement('button'); rb.textContent = '↺ New shift'; rb.onclick = () => { gen(); draw(); }; ctl.appendChild(rb);
  gen(); draw();
};

/* Day 28: laminate cost and quote */
const MATS = { PET: [1.40, 150], BOPP: [0.91, 155], 'Met BOPP': [0.91, 175], 'Al foil': [2.71, 520], BOPA: [1.15, 330], LDPE: [0.92, 125], CPP: [0.90, 160], Paper: [1.0, 110] };
W.quote = el => {
  lab(el);
  const rows = [['PET', 12, 150], ['Al foil', 9, 520], ['LDPE', 80, 125]];
  div(el, 'hint', 'Layers (material name from: ' + Object.keys(MATS).join(', ') + ') — thickness µm and price ₹/kg.');
  edTable(el, [{ h: 'Material', t: 'text' }, { h: 'µm', t: 'num' }, { h: '₹/kg', t: 'num' }], rows, draw, ['BOPP', 20, 155]);
  const st = form(el, [{ k: 'ink', t: 'num', l: 'Ink (dry)', v: 3, u: 'g/m²' }, { k: 'inkp', t: 'num', l: 'Ink price', v: 600, u: '₹/kg' }, { k: 'adh', t: 'num', l: 'Adhesive per pass (dry)', v: 2.5, u: 'g/m²' }, { k: 'adhp', t: 'num', l: 'Adhesive price', v: 420, u: '₹/kg' },
    { k: 'w', t: 'num', l: 'Pouch width', v: 150, u: 'mm' }, { k: 'h', t: 'num', l: 'Height', v: 220, u: 'mm' }, { k: 'g', t: 'num', l: 'Gusset material', v: 45, u: 'mm' }, { k: 'q', t: 'num', l: 'Order', v: 500, u: 'thousand' }, { k: 'y', t: 'num', l: 'Overall yield', v: 84, u: '%' },
    { k: 'su', t: 'num', l: 'Set-up per order (make-ready, plates share)', v: 60000, u: '₹' }, { k: 'conv', t: 'num', l: 'Run conversion', v: 300, u: '₹ per 1 000' }, { k: 'zip', t: 'num', l: 'Zipper, extras', v: 180, u: '₹ per 1 000' }, { k: 'oh', t: 'num', l: 'Overhead', v: 8, u: '%' }, { k: 'mg', t: 'num', l: 'Margin', v: 12, u: '%' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  function draw() {
    let gsm = 0, cm2 = 0; const lines = [];
    rows.forEach(r => { const m = MATS[String(r[0]).trim()] || [1, r[2]], g = r[1] * m[0]; gsm += g; cm2 += g / 1000 * r[2]; lines.push(`${String(r[0]).padEnd(9)} ${String(r[1]).padStart(4)} µm × ${m[0].toFixed(2)} = ${fmt(g, 1).padStart(6)} g/m² × ₹${r[2]}/kg`); });
    const passes = Math.max(rows.length - 1, 0), ag = st.adh * passes; gsm += st.ink + ag; cm2 += st.ink / 1000 * st.inkp + ag / 1000 * st.adhp;
    const area = st.w * (2 * st.h + st.g) / 1e6, matK = cm2 * area * 1000 / (st.y / 100);
    const price = q => (matK + st.conv + st.zip + st.su / q) * (1 + st.oh / 100) * (1 + st.mg / 100);
    const qs = [50, 100, 200, 500, 1000, 2000, 5000];
    box.innerHTML = chart({ x: [20, 5000], y: [0, price(20) * 1.05], logx: true, w: 420, h: 270, xl: 'order, thousand pouches (log)', yl: '₹ per 1 000 pouches', series: [{ p: lin(Math.log10(20), Math.log10(5000), 50).map(l => [Math.pow(10, l), price(Math.pow(10, l))]), c: 'b' }], pts: [[st.q, price(st.q)]] });
    out.textContent = lines.join('\n') + `\nink ${st.ink} + adhesive ${passes} × ${st.adh} g/m²\nLaminate ${fmt(gsm, 1)} g/m² · ₹${fmt(cm2, 2)}/m² · ₹${fmt(cm2 / gsm * 1000, 1)}/kg\nPouch area ${fmt(area, 4)} m² → material ₹${fmt(matK, 0)} per 1 000 after ${st.y} % yield\nSet-up ₹${fmt(st.su / st.q, 0)} per 1 000 at ${st.q} thousand\nPrice ≈ ₹${fmt(price(st.q), 0)} per 1 000  (₹${fmt(price(st.q) / 1000, 3)} each)\n\nLadder (thousand → ₹/1 000): ` + qs.map(q => `${q}: ${fmt(price(q), 0)}`).join(' · ');
  }
  draw();
};

/* Day 29: NPV, IRR, payback */
W.npv = el => {
  lab(el);
  const st = form(el, [{ k: 'I', t: 'num', l: 'Investment', v: 45, u: '₹ lakh' }, { k: 's', t: 'num', l: 'Net saving', v: 60, u: '₹ lakh/yr' }, { k: 'n', t: 'range', l: 'Life', min: 1, max: 20, v: 8, u: 'yr' }, { k: 'r', t: 'range', l: 'Hurdle rate', min: 0, max: 30, v: 12, u: '%' }, { k: 'k', t: 'range', l: 'Saving actually achieved', min: 20, max: 150, s: 5, v: 100, u: '%' }], draw);
  const row = div(el, 'row'), box = div(row), out = div(row, 'out');
  const npv = (I, s, n, r) => { let v = -I; for (let t = 1; t <= n; t++) v += s / Math.pow(1 + r, t); return v; };
  function irr(I, s, n) { if (npv(I, s, n, 0) < 0) return NaN; let lo = 0, hi = 10; for (let k = 0; k < 100; k++) { const m = (lo + hi) / 2; if (npv(I, s, n, m) > 0) lo = m; else hi = m; } return lo; }
  function draw() {
    const s = st.s * st.k / 100, r = st.r / 100, cum = [[0, -st.I]], und = [[0, -st.I]]; let c = -st.I, u = -st.I, dpb = NaN;
    for (let t = 1; t <= st.n; t++) { const pv = s / Math.pow(1 + r, t), prev = c; c += pv; u += s; cum.push([t, c]); und.push([t, u]); if (prev < 0 && c >= 0) dpb = t - 1 + (-prev) / pv; }
    const ymin = Math.min(-st.I, ...cum.map(p => p[1])) * 1.1, ymax = Math.max(10, ...und.map(p => p[1])) * 1.1;
    box.innerHTML = chart({ x: [0, st.n], y: [ymin, ymax], xl: 'year', yl: 'cumulative cash, ₹ lakh', series: [{ p: und, c: 'o', dash: 1 }, { p: cum, c: 'b' }, { p: [[0, 0], [st.n, 0]], c: 'd' }], labels: [[st.n, und[st.n][1], 'undiscounted', -4, -6, 'ot', 'end'], [st.n, cum[st.n][1], 'discounted', -4, 16, 'bt', 'end']] });
    const N = npv(st.I, s, st.n, r), R = irr(st.I, s, st.n);
    out.textContent = `Saving used: ₹${fmt(s, 1)} lakh/yr (${st.k} % of plan)\nSimple payback = ${st.I} ÷ ${fmt(s, 1)} = ${fmt(st.I / s, 2)} yr\nDiscounted payback ≈ ${Number.isFinite(dpb) ? fmt(dpb, 2) + ' yr' : 'not within life'}\nNPV at ${st.r} % = ₹${fmt(N, 1)} lakh ${N > 0 ? '✓ accept' : '✗ reject'}\nIRR = ${Number.isFinite(R) ? fmt(R * 100, 1) + ' %' : '—'} ${R > r ? '> hurdle ✓' : '≤ hurdle'}\n\nSlide "saving actually achieved" down: at what % does NPV turn negative? That margin is the project's safety.`;
  }
  draw();
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
