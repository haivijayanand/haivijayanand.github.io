/*
TOOL:    tally/assets/tl.js — shared engine for the 30-Day TallyPrime Course: page shell, progress, quiz, Practice Desk voucher simulator and labs
FAMILY:  tally
VERSION: 1.1.0
DATE:    2026-11-28
CHAT:    Learn Tally in 30 days — design a Tally accounting software course for GitHub
CHANGES: 1.1.0 - company profiles: the learner picks the firm on the hub; names, parties, items, quantities, BOM, GSTIN and state follow it everywhere
         1.0.0 - first version; page shell, quiz, chart helper and keyboard (M F T P S X [ ]) from manufacturing/assets/mf.js 1.0.0;
                 new: Practice Desk (keyboard voucher simulator with checking, Day Book and trial balance), classifier, golden rules,
                 T-account posting, shortcut drill, master-creation forms, ageing, BRS, order flow, BOM, stock valuation, cost centres,
                 GST and GSTIN, GST set-off, TDS (Income-tax Act 2025), payroll, final accounts, ratios, interest, depreciation,
                 exam + certificate saved to the site account
STATUS:  working
*/
(function () {
'use strict';
const SW = window.SW = window.SW || {};
SW.version = '1.1.0';
const ND = () => (window.SW_DAYS ? SW_DAYS.length : 30);
const $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const store = {
  get(k, d) { try { const v = localStorage.getItem('tl30:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('tl30:' + k, JSON.stringify(v)); } catch (e) { } }
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
SW.resetProgress = () => { if (confirm('Clear all progress, ticks and quiz scores stored in this browser?')) { try { Object.keys(localStorage).filter(k => k.startsWith('tl30:')).forEach(k => localStorage.removeItem(k)); } catch (e) { } location.reload(); } };

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
/* ---------------- shared helpers ---------------- */
function copyText(t, btn) { const done = () => { if (btn) { const o = btn.textContent; btn.textContent = '✓ Copied'; setTimeout(() => btn.textContent = o, 1200); } }; try { navigator.clipboard.writeText(t).then(done, () => fallbackCopy(t, done)); } catch (e) { fallbackCopy(t, done); } }
function fallbackCopy(t, done) { const ta = document.createElement('textarea'); ta.value = t; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e) { } ta.remove(); done(); }
function copyButtons() { $$('pre.tpl').forEach(p => { if (p._cb) return; p._cb = 1; const b = document.createElement('button'); b.className = 'btn'; b.textContent = '📋 Copy template'; b.style.margin = '0 0 12px'; b.onclick = () => copyText(p.textContent, b); p.after(b); }); }
function codeBox(host) { const pre = document.createElement('pre'); pre.className = 'code'; host.appendChild(pre); const b = document.createElement('button'); b.className = 'btn'; b.textContent = '📋 Copy'; b.onclick = () => copyText(pre.textContent, b); host.appendChild(b); return pre; }

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
const svgW = (w, h, s) => `<svg viewBox="0 0 ${w} ${h}">${s}</svg>`;
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
function rng(seed) { let s = (seed % 2147483647 + 2147483647) % 2147483647 || 1; return () => { s = s * 16807 % 2147483647; return (s - 1) / 2147483646; }; }
function gauss(r) { let u = 0, v = 0; while (u === 0) u = r(); while (v === 0) v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * PI * v); }
function ncdf(z) { const t = 1 / (1 + 0.2316419 * Math.abs(z)), d = 0.3989423 * Math.exp(-z * z / 2); const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; }
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

/* ================= TALLY COURSE LABS ================= */
const W = SW.W = {};
const rs = x => '₹ ' + fmt(x, 2);
const r0 = x => '₹ ' + fmt(x, 0);
const n2 = x => Math.round(x * 100) / 100;
const norm = s => String(s || '').toLowerCase().replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim();
const normDate = s => { const p = String(s || '').trim().split(/[-./ ]+/); if (p.length !== 3) return s; let [d, m, y] = p; if (y.length === 2) y = '20' + y; return d.padStart(2, '0') + '-' + m.padStart(2, '0') + '-' + y; };
const J = el => JSON.parse($('#' + el.dataset.src).textContent);

/* ---- the running company: masters used by every Practice Desk ---- */
const CO = { name: 'Avani Gearworks Pvt Ltd', place: 'Ambattur, Chennai · Tamil Nadu (33)', fy: '2026-27' };
const LEDGERS = [
  ['Cash', 'Cash-in-Hand'], ['Petty Cash', 'Cash-in-Hand'], ['SBI Current A/c', 'Bank Accounts'], ['Canara Bank OD A/c', 'Bank OD A/c'],
  ['Share Capital', 'Capital Account'], ['SIDBI Term Loan', 'Secured Loans'], ['Loan from Director', 'Unsecured Loans'],
  ['Plant & Machinery', 'Fixed Assets'], ['Factory Building', 'Fixed Assets'], ['Computers', 'Fixed Assets'], ['Furniture & Fixtures', 'Fixed Assets'], ['Vehicles', 'Fixed Assets'],
  ['Kaveri Pumps Ltd', 'Sundry Debtors'], ['Deccan Tractors Pvt Ltd', 'Sundry Debtors'], ['Malabar Agro Machines', 'Sundry Debtors'],
  ['Sri Murugan Steels', 'Sundry Creditors'], ['Precision Bearings Co', 'Sundry Creditors'], ['Annai Castings', 'Sundry Creditors'], ['Heat-Tech Treaters', 'Sundry Creditors'], ['Lakshmi Tools & Inserts', 'Sundry Creditors'], ['Vel Auditors & Co', 'Sundry Creditors'],
  ['Purchase Account', 'Purchase Accounts'], ['Purchase - GST 18%', 'Purchase Accounts'], ['Purchase - Interstate 18%', 'Purchase Accounts'],
  ['Sales Account', 'Sales Accounts'], ['Sales - GST 18%', 'Sales Accounts'], ['Sales - Interstate 18%', 'Sales Accounts'],
  ['Input CGST', 'Duties & Taxes'], ['Input SGST', 'Duties & Taxes'], ['Input IGST', 'Duties & Taxes'], ['Output CGST', 'Duties & Taxes'], ['Output SGST', 'Duties & Taxes'], ['Output IGST', 'Duties & Taxes'],
  ['TDS Payable - Contractor', 'Duties & Taxes'], ['TDS Payable - Professional', 'Duties & Taxes'], ['PF Payable', 'Current Liabilities'], ['ESI Payable', 'Current Liabilities'], ['Professional Tax Payable', 'Duties & Taxes'],
  ['Salary Payable', 'Provisions'], ['Audit Fees Payable', 'Provisions'], ['Wages Payable', 'Provisions'],
  ['Wages', 'Direct Expenses'], ['Power & Fuel', 'Direct Expenses'], ['Freight Inward', 'Direct Expenses'], ['Job Work Charges', 'Direct Expenses'], ['Consumables', 'Direct Expenses'],
  ['Salaries', 'Indirect Expenses'], ['Employer PF Contribution', 'Indirect Expenses'], ['Employer ESI Contribution', 'Indirect Expenses'], ['Rent', 'Indirect Expenses'], ['Office Expenses', 'Indirect Expenses'], ['Telephone & Internet', 'Indirect Expenses'], ['Printing & Stationery', 'Indirect Expenses'],
  ['Bank Charges', 'Indirect Expenses'], ['Depreciation', 'Indirect Expenses'], ['Interest on Term Loan', 'Indirect Expenses'], ['Audit Fees', 'Indirect Expenses'], ['Repairs & Maintenance', 'Indirect Expenses'],
  ['Travelling Expenses', 'Indirect Expenses'], ['Insurance', 'Indirect Expenses'], ['Freight Outward', 'Indirect Expenses'], ['Discount Allowed', 'Indirect Expenses'], ['Round Off', 'Indirect Expenses'],
  ['Scrap Sales', 'Direct Incomes'], ['Interest Received', 'Indirect Incomes'], ['Discount Received', 'Indirect Incomes'],
  ['Prepaid Insurance', 'Loans & Advances (Asset)'], ['Advance to Staff', 'Loans & Advances (Asset)'], ['Electricity Deposit', 'Deposits (Asset)'], ['Advance Tax', 'Loans & Advances (Asset)']
];
const ITEMS = [
  ['EN19 Steel Bar Dia 60', 'kg'], ['Housing Casting GB-20', 'nos'], ['Bearing 6208', 'nos'], ['Oil Seal 40x62', 'nos'], ['Gear Oil 220', 'ltr'],
  ['Cutting Insert CNMG', 'nos'], ['Gear Blank (machined)', 'nos'], ['Gear Blank (hardened)', 'nos'], ['Gearbox GB-20', 'nos'], ['Spur Gear Set SG-40', 'set'], ['MS Turnings Scrap', 'kg']
];
const GROUP_OF = {}; LEDGERS.forEach(l => GROUP_OF[norm(l[0])] = l[1]);
const VT = [ /* name, key, mode, class */
  ['Contra', 'F4', 'acc', 'Accounting'], ['Payment', 'F5', 'acc', 'Accounting'], ['Receipt', 'F6', 'acc', 'Accounting'], ['Journal', 'F7', 'acc', 'Accounting'],
  ['Sales', 'F8', 'inv', 'Accounting'], ['Purchase', 'F9', 'inv', 'Accounting'], ['Debit Note', 'Alt+F5', 'inv', 'Accounting'], ['Credit Note', 'Alt+F6', 'inv', 'Accounting'],
  ['Stock Journal', 'Alt+F7', 'stk', 'Inventory'], ['Manufacturing Journal', 'F10 list', 'stk', 'Inventory'], ['Delivery Note', 'Alt+F8', 'ord', 'Inventory'], ['Receipt Note', 'Alt+F9', 'ord', 'Inventory'],
  ['Rejections Out', 'Ctrl+F5', 'ord', 'Inventory'], ['Rejections In', 'Ctrl+F6', 'ord', 'Inventory'], ['Physical Stock', 'Ctrl+F7', 'stk', 'Inventory'],
  ['Material Out', 'F10 list', 'ord', 'Inventory'], ['Material In', 'F10 list', 'ord', 'Inventory'],
  ['Sales Order', 'Ctrl+F8', 'ord', 'Order'], ['Purchase Order', 'Ctrl+F9', 'ord', 'Order'], ['Payroll', 'Ctrl+F4', 'acc', 'Payroll']
];
const vtOf = n => VT.find(v => norm(v[0]) === norm(n));

/* ---------------- company profiles (assets/tl-profiles.js) ---------------- */
/* The course is written for the base firm (mfg). A chosen profile renames company, parties and items in one pass over the
   page, scales item quantities by k and rates by 1/k (so every rupee amount stays the same), and swaps in its own BOM. */
const PROFILES = window.TL_PROFILES || {};
const PFID = PROFILES[store.get('profile', 'mfg')] ? store.get('profile', 'mfg') : 'mfg';
const PF = JSON.parse(JSON.stringify(PROFILES[PFID] || { co: {} }));
const BASECO = PROFILES.mfg ? PROFILES.mfg.co : null;
(function () { const nm = String(store.get('pfname', '') || '').trim(); if (nm && PF.co) { PF.co.name = nm; PF.co.short = nm; PF.co.nick = nm; } })();
SW.profile = PFID; SW.PF = PF;
let SUBRE = null, SUBMAP = {};
function buildSubs() {
  const pairs = [];
  if (!BASECO || !PF.co) return;
  ['name', 'short', 'nick', 'addr', 'gstin', 'area', 'pin', 'city', 'city2', 'state', 'abbr'].forEach(k => { if (BASECO[k] && PF.co[k] && BASECO[k] !== PF.co[k]) pairs.push([BASECO[k], PF.co[k]]); });
  if (PF.co.code && BASECO.code !== PF.co.code) { pairs.push(['state code ' + BASECO.code, 'state code ' + PF.co.code]); pairs.push(['(' + BASECO.code + ')', '(' + PF.co.code + ')']); }
  Object.entries(PF.parties || {}).forEach(x => pairs.push(x));
  Object.entries(PF.items || {}).forEach(([k, v]) => pairs.push([k, v[0]]));
  Object.entries(PF.short || {}).forEach(x => pairs.push(x));
  Object.entries(PF.hsn || {}).forEach(x => pairs.push(x));
  (PF.words || []).forEach(x => pairs.push(x));
  pairs.forEach(([a, b]) => { if (!(a in SUBMAP)) SUBMAP[a] = b; });
  const keys = Object.keys(SUBMAP).sort((a, b) => b.length - a.length);
  if (keys.length) SUBRE = new RegExp('(?<![A-Za-z0-9])(' + keys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')(?![A-Za-z0-9])', 'g');
}
const sub = s => (SUBRE && typeof s === 'string') ? s.replace(SUBRE, m => SUBMAP[m]) : s;
const deepSub = o => Array.isArray(o) ? o.map(deepSub) : (o && typeof o === 'object') ? Object.fromEntries(Object.entries(o).map(([k, v]) => [k, deepSub(v)])) : sub(o);
const n4 = x => Math.round(x * 1e4) / 1e4;
const FG = 'Gearbox GB-20';
const pfItem = name => (PF.items || {})[name];
const kOf = name => (pfItem(name) || [0, 0, 1])[2];
const unitOf = name => { const i = ITEMS.find(x => x[0] === name); return i ? i[1] : ''; };
function scaleRows(rows) { return (rows || []).map(r => { const m = pfItem(r[0]); if (!m) return r.slice(); const o = [m[0], r[1] == null ? r[1] : n4(r[1] * m[2])]; if (r.length > 2) o.push(r[2] == null ? r[2] : n4(r[2] / m[2])); return o; }); }
const VERB = { 'Purchase': 'Purchase from', 'Sales': 'Sale to', 'Credit Note': 'Goods returned by', 'Debit Note': 'Goods returned to', 'Purchase Order': 'Purchase Order to', 'Sales Order': 'Sales Order from', 'Receipt Note': 'Receipt Note — goods arrive from', 'Delivery Note': 'Delivery Note — goods dispatched to', 'Rejections Out': 'Rejections Out — faulty goods sent back to', 'Rejections In': 'Rejections In — goods returned by', 'Material Out': 'Material Out — sent for job work to', 'Material In': 'Material In — received back from' };
const qtxt = r => `<b>${fmt(r[1], 4)} ${esc(unitOf(r[0]))}</b> ${esc(r[0])}${r.length > 2 && r[2] != null ? ' @ ₹' + fmt(r[2], 2) : ''}`;
function mapTask(t0) {
  const t = JSON.parse(JSON.stringify(t0)), itemTask = !!(t.items || t.src || t.dst);
  if (!itemTask) return deepSub(t);
  const baseText = t.t;
  if (/manufacturing/i.test(t.vt) && PF.bom && t.dst) {
    const N = n4(t.dst[0][1] * kOf(FG)), fg = pfItem(FG)[0];
    t.src = PF.bom.comps.map(c => [c[0], n4(c[1] * N)]); t.dst = [[fg, N], [PF.bom.scrap[0], n4(PF.bom.scrap[1] * N)]];
  } else { ['items', 'src', 'dst'].forEach(a => { if (t[a]) t[a] = scaleRows(t[a]); }); }
  const T = deepSub({ party: t.party, led: t.led, tax: t.tax, h: t.h, why: t.why, n: t.n }); Object.assign(t, T);
  if (/manufacturing/i.test(t.vt)) {
    const f = t.dst[0], sc = t.dst[1];
    t.t = /yourself/.test(baseText) ? `Production of ${qtxt(f)} — explode the BOM yourself (and ${qtxt(sc)} scrap).` : `Production of ${qtxt(f)}. Source: ${t.src.map(qtxt).join(', ')}. Destination: the ${esc(f[0])} and ${qtxt(sc)}. (Quantities only — rates are optional here.)`;
  } else if (/physical/i.test(t.vt)) { const r = t.dst[0]; t.t = `Physical Stock: the count finds ${qtxt(r)} (the books show ${fmt(n4(r[1] * 240 / 236), 2)}).`; }
  else if (/stock journal/i.test(t.vt)) { t.t = `Stock Journal: move ${qtxt(t.src[0])} from Main Stores to Shop Floor (same item in source and destination).`; }
  else {
    const place = (PF.places || {})[t.party];
    t.t = `${VERB[t.vt] || t.vt} <b>${esc(t.party)}</b>${place ? ' (' + esc(place) + ')' : ''}${t.led ? `, ledger <b>${esc(t.led)}</b>` : ''}: ${t.items.map(qtxt).join(' and ')}${t.tax && t.tax.length ? ', plus GST' : ''}.`;
  }
  return t;
}
function mapJSON(d) {
  if (d && Array.isArray(d.tasks)) return Object.assign(deepSub(d), { tasks: d.tasks.map(mapTask) });
  if (d && d.fg && d.bom) {
    const kf = kOf(FG);
    if (PF.bom) return { n: n4(10 * kf), fg: pfItem(FG)[0], price: n4(d.price / kf), add: PF.bom.add, bom: PF.bom.comps.map(c => c.slice()).concat([[PF.bom.scrap[0], -PF.bom.scrap[1], PF.bom.scrap[2], PF.bom.scrap[3]]]) };
    return { n: n4(10 * kf), fg: sub(d.fg), price: n4(d.price / kf), add: n4(d.add / kf), bom: d.bom.map(r => { const m = pfItem(r[0]); return m ? [m[0], n4(r[1] * m[2]), m[1], n4(r[3] / m[2])] : r; }) };
  }
  const o = deepSub(d);
  if (o && Array.isArray(o.fields) && PF.form && d.fields.some(f => f[1] === FG)) {
    const fgN = pfItem(FG)[0], u = pfItem(FG)[1];
    o.fields.forEach(f => {
      if (/^Units/.test(f[0])) { f[1] = u; f[2] = 'counted in ' + u; if (f[3] && !f[3].includes(u)) f[3].push(u); }
      if (/^HSN/.test(f[0])) { f[1] = PF.form.hsn; f[2] = 'HSN ' + PF.form.hsn + ' for ' + fgN; }
      if (/^Opening quantity/.test(f[0])) { f[1] = PF.form.qty; f[2] = 'opening stock: ' + PF.form.qty + ' ' + u; }
      if (/^Opening rate/.test(f[0])) { f[1] = PF.form.rate; f[2] = 'valued at cost: ₹' + PF.form.rate + ' per ' + u; }
    });
    o.ok = `${fgN} created with ${PF.form.qty} ${u} opening stock worth ₹${fmt(PF.form.qty * PF.form.rate, 0)}.`;
  }
  return o;
}
function applyProfile() {
  ITEMS.forEach(i => { const m = pfItem(i[0]); if (m) { i[0] = m[0]; i[1] = m[1]; } });
  buildSubs();
  if (PF.co && PF.co.name) { CO.name = PF.co.name; CO.place = `${PF.co.city} · ${PF.co.state} (${PF.co.code})`; CO.gstin = PF.co.gstin; CO.code = PF.co.code; }
  $$('[data-pf]').forEach(el => { const h = PF.blocks && PF.blocks[el.dataset.pf]; if (h) { el.innerHTML = h; el.dataset.pfDone = '1'; } });
  if (!SUBRE) return;
  LEDGERS.forEach(l => { l[0] = sub(l[0]); }); Object.keys(GROUP_OF).forEach(k => delete GROUP_OF[k]); LEDGERS.forEach(l => GROUP_OF[norm(l[0])] = l[1]);
  if (window.SW_DAYS) SW_DAYS.forEach(d => d[1] = sub(d[1]));
  document.title = sub(document.title);
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement && n.parentElement.closest('script,style,[data-pf-done],.pfpick') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
  const nodes = []; while (tw.nextNode()) nodes.push(tw.currentNode);
  nodes.forEach(n => { const v = sub(n.nodeValue); if (v !== n.nodeValue) n.nodeValue = v; });
  $$('script[type="application/json"]').forEach(sc => { try { sc.textContent = JSON.stringify(mapJSON(JSON.parse(sc.textContent))); } catch (e) { console.error('profile map', sc.id, e); } });
}
/* company chip on day pages and the chooser on the hub */
function profileUI() {
  const nm = (PF.co && PF.co.name) || CO.name;
  $$('.pfchip').forEach(c => { c.innerHTML = `${PF.icon || '🏭'} Company: <b>${esc(nm)}</b> · <a href="./#company">change</a>`; });
  const hb = $('[data-pf="hub"]'); if (hb && PF.co) hb.innerHTML = `${esc(nm)} (fictional), ${esc(PF.co.area)}, ${esc(PF.co.city)}, ${esc(PF.co.state)}. ${esc(PF.blurb || '')} Products: ${esc(PF.products || '')}. Suppliers in your state and in Maharashtra; customers in your state, Telangana and Kerala — so you meet both CGST + SGST and IGST.`;
  const g = $('#pfgrid'); if (!g) return;
  g.innerHTML = Object.entries(PROFILES).map(([id, p]) => `<button type="button" class="pfc ${id === PFID ? 'on' : ''}" data-id="${id}"><span class="ic">${p.icon}</span><b>${esc(p.label)}</b><i>${esc(p.co.name)} · ${esc(p.co.city)}, ${esc(p.co.state)}</i><span>${esc(p.blurb)}</span><small>Products: ${esc(p.products)}</small>${id === PFID ? '<em>✓ selected</em>' : ''}</button>`).join('');
  g.onclick = e => { const b = e.target.closest('.pfc'); if (!b || b.dataset.id === PFID) return; store.set('profile', b.dataset.id); location.reload(); };
  const ni = $('#pfname'), nb = $('#pfnameBtn');
  if (ni) { ni.value = store.get('pfname', ''); nb.onclick = () => { store.set('pfname', ni.value.trim()); location.reload(); }; ni.onkeydown = e => { if (e.key === 'Enter') nb.click(); }; }
}
function keyName(e) { let k = e.key; if (k.length === 1) k = k.toUpperCase(); return (e.ctrlKey ? 'Ctrl+' : '') + (e.altKey ? 'Alt+' : '') + (e.shiftKey && k.length > 1 && !/^F\d/.test(k) ? 'Shift+' : '') + k; }
function datalists() {
  if ($('#tl-ledgers')) return;
  const d = document.createElement('div'); d.hidden = true;
  d.innerHTML = `<datalist id="tl-ledgers">${LEDGERS.map(l => `<option value="${esc(l[0])}">${esc(l[1])}</option>`).join('')}</datalist><datalist id="tl-items">${ITEMS.map(i => `<option value="${esc(i[0])}">${esc(i[1])}</option>`).join('')}</datalist>`;
  document.body.appendChild(d);
}

/* ---- Practice Desk: the voucher simulator ---- */
/* task: {t, vt, d, mode?, lines:[[Dr|Cr, ledger, amt]], party, led, items:[[item,qty,rate]], tax:[[ledger, amt]], src, dst, n (narration), h (hint), why} */
W.desk = el => {
  lab(el); datalists();
  const data = J(el), tasks = data.tasks, key = 'desk' + DAY + '_' + (el.dataset.src || '') + (PFID === 'mfg' ? '' : '_' + PFID);
  let done = store.get(key, {}), cur = 0, vt = null, book = store.get(key + 'book', []);
  const intro = div(el, 'hint', 'Work in the desk with the keyboard, the way you would in TallyPrime: <b>voucher keys</b> (F4 Contra … F9 Purchase, Alt+F5 Debit Note, Alt+F7 Stock Journal …) pick the voucher type while the cursor is inside the desk, <kbd>Enter</kbd> moves to the next field, <kbd>Ctrl</kbd>+<kbd>A</kbd> accepts. A new line pre-fills the amount still needed to balance. Dates follow Educational-mode practice: only the 1st, 2nd or 31st of a month.');
  const tb = div(el, 'tasks'), tk = div(el, 'task'), desk = div(el, 'desk'); desk.tabIndex = 0;
  const after = div(el, 'row'), bookBox = div(after), balBox = div(after);
  function tabs() { tb.innerHTML = tasks.map((t, i) => `<button class="${done[i] ? 'ok' : ''} ${i === cur ? 'on' : ''}" data-i="${i}" title="${esc(t.t.replace(/<[^>]+>/g, ''))}">${i + 1}</button>`).join('') + `<span class="hint" style="align-self:center">${Object.keys(done).length} / ${tasks.length} entries accepted</span>`; }
  tb.onclick = e => { const b = e.target.closest('button[data-i]'); if (b) { cur = +b.dataset.i; load(); } };
  function load() {
    const t = tasks[cur]; tabs(); fresh();
    tk.innerHTML = `<b>Entry ${cur + 1} of ${tasks.length}</b> · ${t.t}${t.h ? `<br><span class="hint">Hint: ${t.h}</span>` : ''}`;
    setVT(null); render();
  }
  function setVT(name) { vt = name ? vtOf(name) : null; render(); }
  let st;
  function fresh() {
    const m = vt ? (tasks[cur].mode || vt[2]) : 'acc';
    st = { date: '', no: (book.length + 1), narr: '', lines: [['Dr', '', ''], ['Cr', '', '']], party: '', led: '', items: [['', '', '']], tax: [['', '']], src: [['', '', '']], dst: [['', '', '']], mode: m };
  }
  fresh();
  const tot = () => { let d = 0, c = 0; st.lines.forEach(l => { const a = parseFloat(l[2]) || 0; if (l[0] === 'Dr') d += a; else c += a; }); return [n2(d), n2(c)]; };
  const itemsTot = arr => n2(arr.reduce((s, r) => s + (parseFloat(r[1]) || 0) * (parseFloat(r[2]) || 0), 0));
  function render() {
    if (!vt) {
      desk.innerHTML = head() + vts() + `<div class="msg">Click inside the desk, then press a voucher key (or click a type above) to start entry ${cur + 1}.</div>`;
      bind(); return;
    }
    const m = st.mode = tasks[cur].mode || vt[2];
    let h = head() + vts() + `<div class="vh"><span class="vt">${esc(vt[0])}</span><label>No. <input value="${st.no}" size="3" disabled></label><label>Date <input data-f="date" placeholder="dd-mm-yyyy" size="11" value="${esc(st.date)}"></label><span class="hint">${vt[3]} voucher · key ${vt[1]}${m === 'inv' ? ' · Item Invoice mode' : ''}</span></div>`;
    if (m === 'acc') {
      const [d, c] = tot();
      h += `<table><tr><th style="width:70px">Dr/Cr</th><th>Particulars</th><th class="num">Debit ₹</th><th class="num">Credit ₹</th><th></th></tr>` +
        st.lines.map((l, i) => `<tr><td><select data-l="${i}" data-c="0"><option ${l[0] === 'Dr' ? 'selected' : ''}>Dr</option><option ${l[0] === 'Cr' ? 'selected' : ''}>Cr</option></select></td><td><input list="tl-ledgers" data-l="${i}" data-c="1" value="${esc(l[1])}" placeholder="ledger name"></td><td class="amt">${l[0] === 'Dr' ? `<input data-l="${i}" data-c="2" value="${esc(l[2])}" inputmode="decimal">` : ''}</td><td class="amt">${l[0] === 'Cr' ? `<input data-l="${i}" data-c="2" value="${esc(l[2])}" inputmode="decimal">` : ''}</td><td><button type="button" data-del="${i}" title="Remove line (Ctrl+D in TallyPrime)">✕</button></td></tr>`).join('') +
        `<tr class="tot"><td></td><td>Total ${d === c && d > 0 ? '✓ balanced' : d || c ? '— difference ' + fmt(Math.abs(d - c), 2) : ''}</td><td class="num">${fmt(d, 2)}</td><td class="num">${fmt(c, 2)}</td><td></td></tr></table>`;
    } else if (m === 'inv' || m === 'ord') {
      const isInv = m === 'inv', it = itemsTot(st.items), tx = n2(st.tax.reduce((s, r) => s + (parseFloat(r[1]) || 0), 0));
      h += `<div class="vh"><label>Party A/c name <input list="tl-ledgers" data-f="party" value="${esc(st.party)}" size="26"></label>${isInv ? `<label>${/sales|credit/i.test(vt[0]) ? 'Sales' : 'Purchase'} ledger <input list="tl-ledgers" data-f="led" value="${esc(st.led)}" size="22"></label>` : ''}</div>`;
      h += itemTable('items', st.items, 'Name of item') + (isInv ? `<div class="sec">Tax and other ledgers (below the items)</div><table>${st.tax.map((r, i) => `<tr><td><input list="tl-ledgers" data-a="tax" data-r="${i}" data-c="0" value="${esc(r[0])}" placeholder="e.g. Output CGST"></td><td class="amt"><input data-a="tax" data-r="${i}" data-c="1" value="${esc(r[1])}" inputmode="decimal"></td><td><button type="button" data-addrow="tax">+ line</button></td></tr>`).join('')}<tr class="tot"><td>Invoice total (items ${fmt(it, 2)} + ledgers ${fmt(tx, 2)})</td><td class="num">${fmt(it + tx, 2)}</td><td></td></tr></table>` : '');
    } else {
      const two = !/physical/i.test(vt[0]);
      h += (two ? `<div class="sec">Source (consumption) — goods going out</div>` + itemTable('src', st.src, 'Item consumed / sent') : '') + `<div class="sec">${two ? 'Destination (production) — goods coming in' : 'Physical stock counted'}</div>` + itemTable('dst', st.dst, two ? 'Item produced / received' : 'Item counted');
    }
    h += `<div class="vh"><label style="flex:1">Narration <input data-f="narr" value="${esc(st.narr)}" style="width:100%"></label></div>`;
    h += `<div class="foot"><button type="button" data-act="accept" class="on">Accept · Ctrl+A</button><button type="button" data-act="clear">Clear</button><button type="button" data-act="show">Show answer</button><span class="sp"></span><span class="hint">${CO.name}</span></div><div class="msg"></div>`;
    desk.innerHTML = h; bind();
  }
  function itemTable(a, rows, ph) {
    return `<table><tr><th>${ph}</th><th class="num" style="width:110px">Quantity</th><th class="num" style="width:120px">Rate ₹</th><th class="num" style="width:130px">Amount ₹</th><th></th></tr>` +
      rows.map((r, i) => `<tr><td><input list="tl-items" data-a="${a}" data-r="${i}" data-c="0" value="${esc(r[0])}"></td><td class="amt"><input data-a="${a}" data-r="${i}" data-c="1" value="${esc(r[1])}" inputmode="decimal"></td><td class="amt"><input data-a="${a}" data-r="${i}" data-c="2" value="${esc(r[2])}" inputmode="decimal"></td><td class="num">${fmt((parseFloat(r[1]) || 0) * (parseFloat(r[2]) || 0), 2)}</td><td><button type="button" data-addrow="${a}">+ item</button></td></tr>`).join('') + '</table>';
  }
  const head = () => `<div class="dh"><span class="co">Practice Desk · ${CO.name} · FY ${CO.fy}</span><span>${vt ? 'Voucher Creation' : 'Gateway'}</span></div>`;
  const vts = () => `<div class="vts">${VT.filter(v => !data.only || data.only.includes(v[0])).map(v => `<button type="button" data-vt="${esc(v[0])}" class="${vt && vt[0] === v[0] ? 'on' : ''}">${esc(v[0])}<small>${v[1]}</small></button>`).join('')}</div>`;
  function bind() {
    $$('[data-vt]', desk).forEach(b => b.onclick = () => { setVT(b.dataset.vt); focusFirst(); });
    const msg = $('.msg', desk);
    desk.oninput = e => {
      const i = e.target;
      if (i.dataset.f) st[i.dataset.f] = i.value;
      else if (i.dataset.l !== undefined && i.tagName === 'INPUT') { st.lines[+i.dataset.l][+i.dataset.c] = i.value; if (+i.dataset.c === 2) softTot(); }
      else if (i.dataset.a) { st[i.dataset.a][+i.dataset.r][+i.dataset.c] = i.value; if (+i.dataset.c > 0) { const tr = i.closest('tr'), cells = tr.querySelectorAll('td'); const r = st[i.dataset.a][+i.dataset.r]; if (cells[3] && i.dataset.a !== 'tax') cells[3].textContent = fmt((parseFloat(r[1]) || 0) * (parseFloat(r[2]) || 0), 2); } }
    };
    desk.onchange = e => { const i = e.target; if (i.tagName === 'SELECT' && i.dataset.l !== undefined) { st.lines[+i.dataset.l][0] = i.value; keep(() => render(), i); } };
    desk.onclick = e => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.del !== undefined) { st.lines.splice(+b.dataset.del, 1); if (!st.lines.length) st.lines.push(['Dr', '', '']); render(); }
      else if (b.dataset.addrow) { st[b.dataset.addrow].push(b.dataset.addrow === 'tax' ? ['', ''] : ['', '', '']); render(); }
      else if (b.dataset.act === 'accept') accept();
      else if (b.dataset.act === 'clear') { fresh(); render(); }
      else if (b.dataset.act === 'show') { msg.className = 'msg'; msg.innerHTML = answer(tasks[cur]); }
    };
  }
  function softTot() { const [d, c] = tot(), row = $('.tot', desk); if (row) { const td = row.querySelectorAll('td'); td[1].textContent = 'Total ' + (d === c && d > 0 ? '✓ balanced' : d || c ? '— difference ' + fmt(Math.abs(d - c), 2) : ''); td[2].textContent = fmt(d, 2); td[3].textContent = fmt(c, 2); } }
  function keep(fn, i) { const sel = i && i.dataset ? Object.entries(i.dataset).map(([k, v]) => `[data-${k}="${v}"]`).join('') : ''; fn(); if (sel) { const n = $(sel, desk); n && n.focus(); } }
  function focusFirst() { const f = $('input[data-f="date"]', desk); f && f.focus(); }
  desk.addEventListener('keydown', e => {
    const k = keyName(e);
    const v = VT.find(x => x[1] === k);
    if (v && (!data.only || data.only.includes(v[0]))) { e.preventDefault(); setVT(v[0]); focusFirst(); return; }
    if (/^F(5|11|12)$/.test(e.key)) { e.preventDefault(); return; }
    if (k === 'Ctrl+A') { e.preventDefault(); accept(); return; }
    if (e.key === 'Enter' && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT')) {
      e.preventDefault();
      const i = e.target;
      // Tally habit: Enter on the last amount of an unbalanced voucher opens a new line with the balance pre-filled
      if (st.mode === 'acc' && i.dataset.l !== undefined && +i.dataset.c === 2 && +i.dataset.l === st.lines.length - 1) {
        const [d, c] = tot(); if (d !== c) { const side = d > c ? 'Cr' : 'Dr'; st.lines.push([side, '', String(n2(Math.abs(d - c)))]); render(); const ins = $$(`input[data-l="${st.lines.length - 1}"]`, desk); ins[0] && ins[0].focus(); return; }
      }
      const all = $$('input:not([disabled]),select', desk), ix = all.indexOf(i); if (all[ix + 1]) all[ix + 1].focus(); else $('[data-act="accept"]', desk).focus();
    }
  });
  /* ---- checking ---- */
  function agg(lines) { const m = {}; lines.forEach(l => { const n = norm(l[1]); if (!n) return; const k = n + '|' + l[0]; m[k] = n2((m[k] || 0) + (parseFloat(l[2]) || 0)); }); return m; }
  function itemsAgg(rows) { const m = {}; rows.forEach(r => { const n = norm(r[0]); if (!n) return; m[n] = m[n] || [0, null]; m[n][0] = n2(m[n][0] + (parseFloat(r[1]) || 0)); if (r[2] !== '' && r[2] !== undefined && r[2] !== null) m[n][1] = parseFloat(r[2]); }); return m; }
  function cmpItems(exp, got, what, errs, rateMatters) {
    const E = itemsAgg(exp || []), G = itemsAgg(got);
    Object.keys(E).forEach(n => { if (!G[n]) errs.push(`${what}: item "${exp.find(r => norm(r[0]) === n)[0]}" is missing.`); else { if (Math.abs(G[n][0] - E[n][0]) > 0.001) errs.push(`${what}: quantity of "${n}" should be ${E[n][0]}, you have ${G[n][0]}.`); if (rateMatters && E[n][1] !== null && Math.abs((G[n][1] || 0) - E[n][1]) > 0.005) errs.push(`${what}: rate of "${n}" should be ₹${fmt(E[n][1], 2)}.`); } });
    Object.keys(G).forEach(n => { if (!E[n]) errs.push(`${what}: "${n}" does not belong in this entry${ITEMS.some(i => norm(i[0]) === n) ? '' : ' (check the spelling against the item list)'}.`); });
  }
  function check(t) {
    const errs = [], warn = [];
    if (norm(vt[0]) !== norm(t.vt)) errs.push(`Voucher type: this is a ${t.vt} (${vtOf(t.vt)[1]}), not a ${vt[0]}.`);
    if (t.d && normDate(st.date) !== t.d) warn.push(`Date: the task says ${t.d}.`);
    const m = t.mode || vtOf(t.vt)[2];
    if (m === 'acc') {
      const [d, c] = tot(); if (d !== c) errs.push(`Debit total ${fmt(d, 2)} ≠ credit total ${fmt(c, 2)} — TallyPrime will not accept an unbalanced voucher.`);
      const E = agg(t.lines), G = agg(st.lines);
      Object.keys(E).forEach(k => { const [n, s] = k.split('|'), o = s === 'Dr' ? 'Cr' : 'Dr'; const nm = t.lines.find(l => norm(l[1]) === n)[1];
        if (G[k] === undefined) { if (G[n + '|' + o] !== undefined) errs.push(`"${nm}" should be ${s === 'Dr' ? 'debited' : 'credited'}, not ${o === 'Dr' ? 'debited' : 'credited'}.`); else errs.push(`Missing ledger: ${s} "${nm}" ${fmt(E[k], 2)}.`); }
        else if (Math.abs(G[k] - E[k]) > 0.005) errs.push(`Amount for "${nm}" should be ${fmt(E[k], 2)}, you have ${fmt(G[k], 2)}.`); });
      Object.keys(G).forEach(k => { const [n] = k.split('|'); if (!Object.keys(E).some(x => x.split('|')[0] === n)) errs.push(`"${st.lines.find(l => norm(l[1]) === n)[1]}" is not part of this entry${GROUP_OF[n] ? '' : ' (no such ledger — check the spelling)'}.`); });
    } else if (m === 'inv' || m === 'ord') {
      if (norm(st.party) !== norm(t.party)) errs.push(`Party A/c should be "${t.party}".`);
      if (m === 'inv' && norm(st.led) !== norm(t.led)) errs.push(`The sales / purchase ledger should be "${t.led}".`);
      cmpItems(t.items, st.items, 'Items', errs, true);
      if (m === 'inv') { const E = agg((t.tax || []).map(r => ['x', r[0], r[1]])), G = agg(st.tax.map(r => ['x', r[0], r[1]]));
        Object.keys(E).forEach(k => { const n = k.split('|')[0], nm = t.tax.find(r => norm(r[0]) === n)[0]; if (G[k] === undefined) errs.push(`Missing ledger below the items: "${nm}" ${fmt(E[k], 2)}.`); else if (Math.abs(G[k] - E[k]) > 0.005) errs.push(`"${nm}" should be ${fmt(E[k], 2)}, you have ${fmt(G[k], 2)}.`); });
        Object.keys(G).forEach(k => { if (E[k] === undefined) errs.push(`"${st.tax.find(r => norm(r[0]) === k.split('|')[0])[0]}" does not belong below the items.`); }); }
    } else {
      if (!/physical/i.test(t.vt)) cmpItems(t.src, st.src, 'Source', errs, false);
      cmpItems(t.dst, st.dst, /physical/i.test(t.vt) ? 'Counted stock' : 'Destination', errs, false);
    }
    return { errs, warn };
  }
  function effect(t) { /* ledger effect of the (correct) task, for the day book */
    const m = t.mode || vtOf(t.vt)[2];
    if (m === 'acc') return t.lines.map(l => [l[0], l[1], +l[2]]);
    if (m !== 'inv') return [];
    const it = itemsTot(t.items), tx = (t.tax || []).reduce((s, r) => s + +r[1], 0), out = [];
    const sale = /^sales$|debit note/i.test(t.vt);   // party debited for Sales and Debit Note (purchase return)
    out.push([sale ? 'Dr' : 'Cr', t.party, n2(it + tx)]); out.push([sale ? 'Cr' : 'Dr', t.led, it]);
    (t.tax || []).forEach(r => out.push([+r[1] < 0 ? (sale ? 'Dr' : 'Cr') : (sale ? 'Cr' : 'Dr'), r[0], Math.abs(+r[1])]));
    return out;
  }
  function answer(t) {
    const m = t.mode || vtOf(t.vt)[2]; let s = `<b>${esc(t.vt)}</b> (${vtOf(t.vt)[1]})${t.d ? ' · date ' + t.d : ''}\n`;
    if (m === 'acc') s += t.lines.map(l => `${l[0] === 'Dr' ? '<span class="dr">Dr</span>' : '<span class="cr">Cr</span>'}  ${esc(l[1])}  ${fmt(+l[2], 2)}`).join('\n');
    else if (m === 'inv' || m === 'ord') s += `Party: ${esc(t.party)}${t.led ? '\nLedger: ' + esc(t.led) : ''}\n` + t.items.map(r => `  ${esc(r[0])} · ${r[1]} × ₹${fmt(+r[2], 2)} = ${fmt(r[1] * r[2], 2)}`).join('\n') + (t.tax ? '\n' + t.tax.map(r => `  ${esc(r[0])}  ${fmt(+r[1], 2)}`).join('\n') : '');
    else s += (t.src ? 'Source: ' + t.src.map(r => `${esc(r[0])} ${r[1]}`).join(', ') + '\n' : '') + 'Destination: ' + t.dst.map(r => `${esc(r[0])} ${r[1]}`).join(', ');
    if (t.n) s += `\nNarration: ${esc(t.n)}`;
    if (t.why) s += `\n\nWhy: ${t.why}`;
    return s;
  }
  function accept() {
    if (!vt) return; const t = tasks[cur], msg = $('.msg', desk), r = check(t);
    if (r.errs.length) { msg.className = 'msg bad'; msg.innerHTML = '✗ Not yet — TallyPrime would let you save some of these, but the books would be wrong:\n• ' + r.errs.map(esc).join('\n• ') + (r.warn.length ? '\n• ' + r.warn.map(esc).join('\n• ') : ''); return; }
    const first = !done[cur]; done[cur] = 1; store.set(key, done);
    if (first) { book.push({ no: book.length + 1, d: t.d || st.date, vt: t.vt, n: t.n || st.narr, fx: effect(t), task: cur }); store.set(key + 'book', book); }
    msg.className = 'msg ok'; msg.innerHTML = '✓ Accepted. ' + (r.warn.length ? r.warn.map(esc).join(' ') + ' ' : '') + (t.why ? '\n' + t.why : '') + (cur < tasks.length - 1 ? '\nNext entry loads in a moment…' : '\nAll entries done — see the Day Book and balances below.');
    showBook(); tabs();
    if (cur < tasks.length - 1) setTimeout(() => { cur++; load(); }, 1600);
  }
  function showBook() {
    if (!book.length) { bookBox.innerHTML = '<p class="hint">Your Day Book fills up as entries are accepted.</p>'; balBox.innerHTML = ''; return; }
    bookBox.innerHTML = `<b>Day Book (your accepted entries)</b><div class="book"><table><tr><th>No</th><th>Date</th><th>Type</th><th>Particulars</th></tr>${book.map(b => `<tr><td>${b.no}</td><td class="mono">${esc(b.d || '')}</td><td>${esc(b.vt)}</td><td>${b.fx.length ? b.fx.map(f => `<span class="${f[0] === 'Dr' ? 'dr' : 'cr'}">${f[0]}</span> ${esc(f[1])} ${fmt(f[2], 2)}`).join('<br>') : '<span class="hint">inventory only — no ledger effect</span>'}</td></tr>`).join('')}</table></div><button type="button" class="btn">Clear my Day Book</button>`;
    $('button', bookBox).onclick = () => { if (confirm('Clear the accepted entries of this desk?')) { book = []; done = {}; store.set(key, done); store.set(key + 'book', book); showBook(); tabs(); } };
    const bal = {}; book.forEach(b => b.fx.forEach(f => { bal[f[1]] = (bal[f[1]] || 0) + (f[0] === 'Dr' ? f[2] : -f[2]); }));
    const rows = Object.entries(bal).filter(x => Math.abs(x[1]) > 0.004); let D = 0, C = 0;
    balBox.innerHTML = rows.length ? `<b>Trial balance of these entries</b><table><tr><th>Ledger</th><th>Group</th><th class="num">Dr ₹</th><th class="num">Cr ₹</th></tr>${rows.map(([n, v]) => { v > 0 ? D += v : C -= v; return `<tr><td>${esc(n)}</td><td class="hint">${esc(GROUP_OF[norm(n)] || '')}</td><td class="num">${v > 0 ? fmt(v, 2) : ''}</td><td class="num">${v < 0 ? fmt(-v, 2) : ''}</td></tr>`; }).join('')}<tr class="tot"><td colspan="2"><b>Total</b> ${Math.abs(D - C) < 0.01 ? '✓ agrees' : ''}</td><td class="num"><b>${fmt(D, 2)}</b></td><td class="num"><b>${fmt(C, 2)}</b></td></tr></table>` : '';
  }
  load(); showBook();
};

/* ---- classifier: put each item into the right bin ---- */
W.sort = el => {
  lab(el); const d = J(el), key = 'sort' + DAY + el.dataset.src; let sel = null, got = {};
  div(el, 'hint', d.how || 'Click an item, then click the box it belongs to. Number keys 1–9 also drop the selected item into a box.');
  const pool = div(el, 'clsf'), bins = div(el, 'bins'), out = div(el, 'out');
  bins.innerHTML = d.bins.map((b, i) => `<div class="bin" data-b="${i}" tabindex="0"><b>${i + 1}. ${b[0]}</b>${b[1] ? `<small>${b[1]}</small>` : ''}<div></div></div>`).join('');
  function draw() {
    pool.innerHTML = d.items.map((it, i) => got[i] === undefined ? `<span class="it ${sel === i ? 'sel' : ''}" data-i="${i}" tabindex="0">${it[0]}</span>` : '').join('') || '<span class="hint">All placed.</span>';
    $$('.bin', bins).forEach((b, bi) => { $('div', b).innerHTML = Object.keys(got).filter(i => got[i] === bi).map(i => `<span class="it ${d.items[i][1] === bi ? 'ok' : 'no'}" data-i="${i}" title="${esc(d.items[i][2] || '')}">${d.items[i][0]}</span>`).join(''); });
    const n = Object.keys(got).length, ok = Object.keys(got).filter(i => d.items[i][1] === got[i]).length;
    const wrong = Object.keys(got).filter(i => d.items[i][1] !== got[i]).map(i => `✗ ${d.items[i][0].replace(/<[^>]+>/g, '')} → ${d.bins[d.items[i][1]][0]}${d.items[i][2] ? ': ' + d.items[i][2] : ''}`);
    out.innerHTML = `Placed ${n} / ${d.items.length} · correct ${ok}${n === d.items.length ? (ok === n ? ' — perfect!' : '') : ''}${wrong.length ? '\n' + wrong.join('\n') : ''}`;
    if (n === d.items.length) store.set(key, ok);
  }
  pool.onclick = e => { const t = e.target.closest('.it'); if (t) { sel = +t.dataset.i; draw(); } };
  bins.onclick = e => { const it = e.target.closest('.it'); if (it) { delete got[it.dataset.i]; sel = +it.dataset.i; draw(); return; } const b = e.target.closest('.bin'); if (b && sel !== null) { got[sel] = +b.dataset.b; sel = null; draw(); } };
  el.addEventListener('keydown', e => { const n = parseInt(e.key, 10); if (sel !== null && n >= 1 && n <= d.bins.length) { got[sel] = n - 1; sel = null; draw(); e.preventDefault(); } });
  const rb = document.createElement('button'); rb.textContent = 'Start again'; rb.onclick = () => { got = {}; sel = null; draw(); }; el.appendChild(rb);
  draw();
};

/* ---- golden rules: pick the debit and the credit ---- */
W.golden = el => {
  lab(el); const d = J(el); let i = 0, score = 0, seen = 0;
  const q = div(el, 'task'), c = div(el, 'ctl'), out = div(el, 'out');
  const opts = Array.from(new Set(d.flatMap(x => [x[1], x[2]].concat(x[4] || [])))).sort();
  c.innerHTML = `<label>Debit <select data-k="dr"><option value="">— choose —</option>${opts.map(o => `<option>${esc(o)}</option>`).join('')}</select></label><label>Credit <select data-k="cr"><option value="">— choose —</option>${opts.map(o => `<option>${esc(o)}</option>`).join('')}</select></label><button type="button" data-a="chk">Check</button><button type="button" data-a="nx">Next ▶</button>`;
  const [sd, sc] = $$('select', c);
  function show() { const x = d[i]; q.innerHTML = `<b>Transaction ${i + 1} of ${d.length}</b> · ${x[0]}`; sd.value = sc.value = ''; out.textContent = `Score so far: ${score} / ${seen}`; }
  c.onclick = e => {
    const a = e.target.dataset.a; if (!a) return; const x = d[i];
    if (a === 'chk') { const ok = sd.value === x[1] && sc.value === x[2]; seen++; if (ok) score++; out.innerHTML = `${ok ? '✓ Right.' : `✗ Debit <b>${esc(x[1])}</b>, credit <b>${esc(x[2])}</b>.`}\n${x[3]}\n\nScore: ${score} / ${seen}`; }
    if (a === 'nx') { i = (i + 1) % d.length; show(); }
  };
  show();
};

/* ---- journal → ledger posting with T-accounts (P / S / X) ---- */
W.post = el => {
  lab(el); const d = J(el); let k = 0, acc = 0;
  const bar = div(el, 'ctl'), jt = div(el), tacs = div(el, 'tacs'), tb = div(el);
  function draw(last) {
    jt.innerHTML = `<table><tr><th>Date</th><th>Particulars</th><th class="num">Dr ₹</th><th class="num">Cr ₹</th></tr>${d.map((e, i) => e[2].map((l, j) => `<tr style="${i < k ? '' : 'opacity:.45'}${i === k - 1 ? ';background:var(--hi)' : ''}"><td>${j ? '' : e[0]}</td><td>${l[0] === 'Cr' ? '&nbsp;&nbsp;&nbsp;&nbsp;To ' : ''}${esc(l[1])} <span class="${l[0] === 'Dr' ? 'dr' : 'cr'}">${l[0]}</span></td><td class="num">${l[0] === 'Dr' ? fmt(l[2], 0) : ''}</td><td class="num">${l[0] === 'Cr' ? fmt(l[2], 0) : ''}</td></tr>`).join('') + `<tr style="${i < k ? '' : 'opacity:.45'}"><td></td><td colspan="3" class="hint">(${esc(e[1])})</td></tr>`).join('')}</table>`;
    const L = {}; const order = [];
    d.slice(0, k).forEach((e, i) => e[2].forEach(l => { if (!L[l[1]]) { L[l[1]] = { dr: [], cr: [] }; order.push(l[1]); } const other = e[2].filter(x => x[0] !== l[0]).map(x => x[1]); L[l[1]][l[0] === 'Dr' ? 'dr' : 'cr'].push([(l[0] === 'Dr' ? 'To ' : 'By ') + (other.length === 1 ? other[0] : 'Sundries'), l[2], i === k - 1]); }));
    tacs.innerHTML = order.map(n => { const a = L[n], sd = a.dr.reduce((s, x) => s + x[1], 0), sc = a.cr.reduce((s, x) => s + x[1], 0), b = sd - sc;
      return `<div class="tac"><h4>${esc(n)}</h4><div class="tw"><div><small class="dr">Dr</small>${a.dr.map(x => `<p class="${x[2] ? 'new' : ''}"><span>${esc(x[0])}</span><span>${fmt(x[1], 0)}</span></p>`).join('')}</div><div><small class="cr">Cr</small>${a.cr.map(x => `<p class="${x[2] ? 'new' : ''}"><span>${esc(x[0])}</span><span>${fmt(x[1], 0)}</span></p>`).join('')}</div></div><div class="bal">Balance ${fmt(Math.abs(b), 0)} ${b > 0 ? '<span class="dr">Dr</span>' : b < 0 ? '<span class="cr">Cr</span>' : '(nil)'}</div></div>`; }).join('');
    let D = 0, C = 0; const rows = order.map(n => { const a = L[n], b = a.dr.reduce((s, x) => s + x[1], 0) - a.cr.reduce((s, x) => s + x[1], 0); b > 0 ? D += b : C -= b; return [n, b]; }).filter(r => Math.abs(r[1]) > 0);
    tb.innerHTML = k === d.length ? `<h3>Trial balance</h3><table><tr><th>Ledger</th><th class="num">Dr ₹</th><th class="num">Cr ₹</th></tr>${rows.map(r => `<tr><td>${esc(r[0])}</td><td class="num">${r[1] > 0 ? fmt(r[1], 0) : ''}</td><td class="num">${r[1] < 0 ? fmt(-r[1], 0) : ''}</td></tr>`).join('')}<tr class="tot"><td><b>Total</b> ${Math.abs(D - C) < 0.01 ? '✓ the totals agree' : ''}</td><td class="num"><b>${fmt(D, 0)}</b></td><td class="num"><b>${fmt(C, 0)}</b></td></tr></table>` : `<p class="hint">Posted ${k} of ${d.length} entries. Press <kbd>S</kbd> to post the next, <kbd>P</kbd> to post them all one after another.</p>`;
  }
  const step = () => { if (k < d.length) k++; else k = 0; draw(); };
  animCtl(bar, el, dt => { acc += dt; if (acc > 1.4) { acc = 0; if (k < d.length) { k++; draw(); } } }, step);
  const rb = document.createElement('button'); rb.textContent = '↺ Reset'; rb.onclick = () => { k = 0; draw(); }; bar.appendChild(rb);
  draw();
};

/* ---- shortcut drill ---- */
W.keys = el => {
  lab(el); const d = J(el), key = 'keys' + DAY; let order = [], i = 0, sc = 0, n = 0, locked = false;
  const box = div(el, 'drill'), out = div(el, 'out');
  function shuffle() { order = d.map((_, j) => j); for (let j = order.length - 1; j > 0; j--) { const r = Math.floor(Math.random() * (j + 1)); [order[j], order[r]] = [order[r], order[j]]; } i = 0; }
  function ask() {
    locked = false; const x = d[order[i]], pool = d.filter(y => y[0] !== x[0]).map(y => y[0]); const opts = [x[0]];
    while (opts.length < 4 && pool.length) opts.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
    opts.sort(() => Math.random() - .5);
    box.innerHTML = `<div class="hint">Question ${i + 1} of ${d.length}</div><div class="ask">${x[1]}</div><div class="opts">${opts.map(o => `<button type="button" data-k="${esc(o)}">${esc(o)}</button>`).join('')}</div><div class="pad" tabindex="0">…or click here and <b>press the keys</b> (safe keys only — Alt+F4 would close your browser!)</div>`;
  }
  function answer(k) {
    if (locked) return; locked = true; const x = d[order[i]], ok = norm(k) === norm(x[0]); n++; if (ok) sc++;
    $$('.opts button', box).forEach(b => { if (norm(b.dataset.k) === norm(x[0])) b.classList.add('right'); else if (norm(b.dataset.k) === norm(k)) b.classList.add('wrong'); });
    out.textContent = `${ok ? '✓' : '✗ It is ' + x[0] + '.'} ${x[2] || ''}\nScore ${sc} / ${n}`;
    if (n >= d.length) store.set(key, Math.max(sc, store.get(key, 0)));
    setTimeout(() => { i++; if (i >= d.length) { shuffle(); out.textContent += '\nRound complete — a new shuffled round has started.'; sc = 0; n = 0; } ask(); }, 1300);
  }
  box.onclick = e => { const b = e.target.closest('button[data-k]'); if (b) answer(b.dataset.k); };
  box.addEventListener('keydown', e => { if (!e.target.classList.contains('pad')) return; if (['Control', 'Alt', 'Shift', 'Meta'].includes(e.key)) return; if (e.key === 'Tab') return; e.preventDefault(); e.stopPropagation(); answer(keyName(e)); });
  shuffle(); ask();
};

/* ---- fill-in form checked against the expected values (company, ledger, item creation) ---- */
W.form = el => {
  lab(el); const d = J(el);
  const f = div(el); f.innerHTML = `<div class="desk"><div class="dh"><span class="co">${esc(d.title)}</span><span>${esc(d.path || '')}</span></div><table>${d.fields.map((x, i) => `<tr><td style="width:40%">${esc(x[0])}</td><td>${x[3] ? `<select data-i="${i}"><option value="">—</option>${x[3].map(o => `<option>${esc(o)}</option>`).join('')}</select>` : `<input data-i="${i}" style="width:100%" placeholder="${esc(x[4] || '')}">`}</td></tr>`).join('')}</table><div class="foot"><button type="button" class="on">Accept · Ctrl+A</button><button type="button">Show answer</button></div><div class="msg"></div></div>`;
  const [ab, sb] = $$('.foot button', f), msg = $('.msg', f);
  const go = () => { const bad = []; d.fields.forEach((x, i) => { const v = $(`[data-i="${i}"]`, f).value; if (x[1] !== null && norm(v) !== norm(x[1])) bad.push(`${x[0]}: ${x[2] || 'should be ' + x[1]}`); }); msg.className = 'msg ' + (bad.length ? 'bad' : 'ok'); msg.textContent = bad.length ? '✗ Check these fields:\n• ' + bad.join('\n• ') : '✓ ' + (d.ok || 'Accepted.'); };
  ab.onclick = go; sb.onclick = () => { d.fields.forEach((x, i) => { if (x[1] !== null) $(`[data-i="${i}"]`, f).value = x[1]; }); msg.className = 'msg'; msg.textContent = 'Filled in with the expected values. Read each one, then Accept.'; };
  f.addEventListener('keydown', e => { if (keyName(e) === 'Ctrl+A') { e.preventDefault(); go(); } else if (e.key === 'Enter' && e.target.matches('input,select')) { e.preventDefault(); const all = $$('input,select', f), ix = all.indexOf(e.target); (all[ix + 1] || ab).focus(); } });
};

/* ---- bill-wise ageing ---- */
W.ageing = el => {
  lab(el); const d = J(el); const base = new Date(d.from);
  const st = form(el, [{ k: 'day', t: 'range', l: 'Report as on — days after ' + d.from, min: 0, max: 150, v: 61, u: 'days' }, { k: 'cp', t: 'range', l: 'Credit period', min: 0, max: 90, s: 15, v: 30, u: 'days' }], draw);
  const row = div(el, 'row'), tbl = div(row), ch = div(row);
  function draw() {
    const asOn = new Date(base.getTime() + st.day * 864e5), b = [0, 0, 0, 0, 0]; let html = `<p><b>As on ${asOn.toLocaleDateString('en-IN')}</b></p><table><tr><th>Party</th><th>Bill (New Ref)</th><th>Bill date</th><th class="num">Pending ₹</th><th class="num">Age</th><th class="num">Overdue by</th></tr>`;
    d.bills.forEach(x => { const bd = new Date(x[2]); if (bd > asOn) return; const paid = (x[4] || []).filter(p => new Date(p[0]) <= asOn).reduce((s, p) => s + p[1], 0), pend = x[3] - paid; if (pend <= 0) return; const age = Math.round((asOn - bd) / 864e5), od = age - st.cp;
      b[age <= 30 ? 0 : age <= 60 ? 1 : age <= 90 ? 2 : age <= 120 ? 3 : 4] += pend; html += `<tr><td>${esc(x[0])}</td><td>${esc(x[1])}</td><td class="mono">${x[2]}</td><td class="num">${fmt(pend, 0)}${paid ? ` <span class="hint">(${fmt(paid, 0)} received Agst Ref)</span>` : ''}</td><td class="num">${age} d</td><td class="num">${od > 0 ? '<b>' + od + ' d ⚠</b>' : '—'}</td></tr>`; });
    tbl.innerHTML = html + '</table>';
    ch.innerHTML = bars([['0–30 days', b[0]], ['31–60 days', b[1]], ['61–90 days', b[2], 'fo'], ['91–120 days', b[3], 'fo'], ['over 120 days', b[4], 'fo']].map(x => [x[0], x[1], x[2], r0(x[1])]), { l: 110 }) + `<p class="hint">Total outstanding ${r0(b.reduce((s, x) => s + x, 0))} · orange bars = older than 60 days, the ones to chase first.</p>`;
  }
  draw();
};

/* ---- bank reconciliation ---- */
W.brs = el => {
  lab(el); const d = J(el); let sel = null; const m = {};
  div(el, 'hint', 'Click an entry in your books, then the matching line in the bank statement — this is what the <b>Bank Date</b> column does in TallyPrime\'s Bank Reconciliation screen. Unmatched lines are what the BRS explains.');
  const row = div(el, 'row'), A = div(row), B = div(row), out = div(el, 'out');
  function draw() {
    const used = Object.values(m);
    A.innerHTML = `<b>SBI Current A/c — as per company books</b><table><tr><th>Date</th><th>Particulars</th><th class="num">Dr (in) ₹</th><th class="num">Cr (out) ₹</th><th>Bank date</th></tr>${d.book.map((x, i) => `<tr data-a="${i}" style="cursor:pointer;${sel === i ? 'outline:3px solid var(--acc)' : ''}"><td class="mono">${x[0]}</td><td>${esc(x[1])}</td><td class="num">${x[2] > 0 ? fmt(x[2], 0) : ''}</td><td class="num">${x[2] < 0 ? fmt(-x[2], 0) : ''}</td><td class="mono">${m[i] !== undefined ? d.bank[m[i]][0] : ''}</td></tr>`).join('')}</table>`;
    B.innerHTML = `<b>Bank statement</b><table><tr><th>Date</th><th>Description</th><th class="num">Withdrawal ₹</th><th class="num">Deposit ₹</th></tr>${d.bank.map((x, j) => `<tr data-b="${j}" style="cursor:pointer;${used.includes(j) ? 'opacity:.45' : ''}"><td class="mono">${x[0]}</td><td>${esc(x[1])}</td><td class="num">${x[2] < 0 ? fmt(-x[2], 0) : ''}</td><td class="num">${x[2] > 0 ? fmt(x[2], 0) : ''}</td></tr>`).join('')}</table>`;
    const bookBal = d.open + d.book.reduce((s, x) => s + x[2], 0), bankBal = d.bopen + d.bank.reduce((s, x) => s + x[2], 0);
    const notInBank = d.book.filter((x, i) => m[i] === undefined), notInBooks = d.bank.filter((x, j) => !used.includes(j));
    const nb = notInBank.reduce((s, x) => s + x[2], 0), nk = notInBooks.reduce((s, x) => s + x[2], 0);
    const need = d.book.filter(x => d.bank.some(y => Math.abs(y[2] - x[2]) < 0.5)).length, got = Object.keys(m).length;
    out.textContent = `Matched ${got} of ${need} entries that appear in both — ${got >= need ? '✓ BRS complete' : 'keep matching'}\n\nBalance as per company books        ${fmt(bookBal, 0)} Dr\nAmounts not reflected in bank        ${fmt(-nb, 0)}   (${notInBank.map(x => x[1]).join('; ') || 'none'})\nAmounts not reflected in company     ${fmt(nk, 0)}   (${notInBooks.map(x => x[1]).join('; ') || 'none'})\nBalance as per bank                  ${fmt(bookBal - nb + nk, 0)}   (the statement shows ${fmt(bankBal, 0)})\n\nLines only in the bank (charges, interest, direct credits) need a voucher in your books — then they disappear from the BRS.`;
  }
  row.onclick = e => { const a = e.target.closest('[data-a]'), b = e.target.closest('[data-b]');
    if (a) { const i = +a.dataset.a; if (m[i] !== undefined) { delete m[i]; sel = null; } else sel = i; draw(); }
    else if (b && sel !== null) { const j = +b.dataset.b; if (Object.values(m).includes(j)) return; if (Math.abs(d.book[sel][2] - d.bank[j][2]) > 0.5) { out.textContent = '✗ The amounts differ — that is not the same transaction.'; return; } m[sel] = j; sel = null; draw(); } };
  draw();
};

/* ---- order processing flow (P / S / X) ---- */
W.orders = el => {
  lab(el); const d = J(el); let k = 0, acc = 0;
  const bar = div(el, 'ctl'), fl = div(el, 'flow'), tb = div(el), log = div(el, 'out');
  function draw() {
    const shown = d.events.slice(0, k), stg = {}; shown.forEach(e => stg[e[0]] = 1);
    fl.innerHTML = d.stages.map((s, i) => `<div class="st ${stg[i] ? 'done' : ''} ${k && d.events[k - 1][0] === i ? 'on' : ''}"><b>${s[0]}</b><small>${s[1]}</small></div>`).join('');
    const q = {}; d.items.forEach(it => q[it] = { ord: 0, rcv: 0, rej: 0, inv: 0 });
    shown.forEach(e => { if (e[2]) q[e[2]][e[3]] += e[4]; });
    tb.innerHTML = `<table><tr><th>Item</th><th class="num">Ordered</th><th class="num">${d.word} (note)</th><th class="num">Rejected</th><th class="num">Invoiced</th><th class="num">Order pending</th><th class="num">Not yet invoiced</th></tr>${d.items.map(it => { const x = q[it]; return `<tr><td>${esc(it)}</td><td class="num">${x.ord}</td><td class="num">${x.rcv}</td><td class="num">${x.rej}</td><td class="num">${x.inv}</td><td class="num"><b>${x.ord - x.rcv}</b></td><td class="num"><b>${x.rcv - x.rej - x.inv}</b></td></tr>`; }).join('')}</table>`;
    log.textContent = shown.map((e, i) => `${i + 1}. ${e[1]}`).join('\n') || 'Press S to record the first event.';
  }
  animCtl(bar, el, dt => { acc += dt; if (acc > 1.8) { acc = 0; if (k < d.events.length) { k++; draw(); } } }, () => { k = k < d.events.length ? k + 1 : 0; draw(); });
  const rb = document.createElement('button'); rb.textContent = '↺ Reset'; rb.onclick = () => { k = 0; draw(); }; bar.appendChild(rb);
  draw();
};

/* ---- BOM and manufacturing cost ---- */
W.bom = el => {
  lab(el); const d = J(el);
  const st = form(el, [{ k: 'n', t: 'num', l: `${d.fg} — quantity to make`, v: d.n || 10, min: 0 }, { k: 'add', t: 'num', l: 'Additional cost per unit (wages, power, heat treatment)', v: d.add, u: '₹' }], draw);
  const rows = d.bom.map(r => r.slice()); div(el, 'hint', `Edit quantities and rates in the Bill of Materials (per ONE unit of ${esc(d.fg)}). Negative quantity = by-product / scrap that comes back into stock.`);
  edTable(el, [{ h: 'Component', t: 'text' }, { h: 'Qty per unit', t: 'num' }, { h: 'Unit', t: 'text' }, { h: 'Rate ₹', t: 'num' }], rows, draw);
  const out = div(el, 'out');
  function draw() {
    let mat = 0, s = `Manufacturing Journal — Destination: ${d.fg} × ${st.n}\nSource (consumption), exploded from the BOM:\n`;
    rows.forEach(r => { const q = r[1] * st.n, v = q * r[3]; mat += v; s += `  ${(r[0] + '').padEnd(26)} ${fmt(q, 2).padStart(8)} ${r[2]}  @ ${fmt(r[3], 2).padStart(8)} = ${fmt(v, 2).padStart(12)}\n`; });
    const add = st.add * st.n, tot = mat + add;
    s += `\nMaterial cost (net of scrap)   ${rs(mat)}\nAdditional cost                ${rs(add)}\nTotal cost of production       ${rs(tot)}\nCost per ${d.fg}          ${rs(tot / st.n)}\nSelling price ${rs(d.price)} → margin ${rs(d.price - tot / st.n)} per unit (${fmt((d.price - tot / st.n) / d.price * 100, 1)} %)`;
    out.textContent = s;
  }
  draw();
};

/* ---- stock valuation methods ---- */
W.stockval = el => {
  lab(el); const d = J(el);
  const st = form(el, [{ k: 'm', t: 'seg', l: 'Method', o: [['avg', 'Average cost'], ['fifo', 'FIFO'], ['last', 'Last purchase'], ['std', 'Standard cost']], v: 'avg' }, { k: 'std', t: 'num', l: 'Standard cost', v: d.std, u: '₹/kg' }], draw);
  const tbl = div(el), out = div(el, 'out');
  function draw() {
    let lots = d.open[0] ? [[d.open[0], d.open[1]]] : [], qty = d.open[0], val = d.open[0] * d.open[1], issued = 0, cogs = 0, last = d.open[1], h = `<table><tr><th>Date</th><th>Particulars</th><th class="num">In kg</th><th class="num">Rate</th><th class="num">Out kg</th><th class="num">Closing kg</th><th class="num">Closing value ₹</th></tr><tr><td></td><td>Opening</td><td></td><td></td><td></td><td class="num">${qty}</td><td class="num">${fmt(val, 0)}</td></tr>`;
    d.tx.forEach(t => {
      if (t[2] > 0) { lots.push([t[2], t[3]]); qty += t[2]; val += t[2] * t[3]; last = t[3]; }
      else { const q = -t[2]; let c = 0; if (st.m === 'fifo') { let r = q; while (r > 0 && lots.length) { const take = Math.min(r, lots[0][0]); c += take * lots[0][1]; lots[0][0] -= take; r -= take; if (lots[0][0] <= 0) lots.shift(); } } else c = q * (val / qty); qty -= q; val -= c; cogs += c; issued += q; if (st.m !== 'fifo') { lots = [[qty, val / qty]]; } }
      const shown = st.m === 'last' ? qty * last : st.m === 'std' ? qty * st.std : val;
      h += `<tr><td class="mono">${t[0]}</td><td>${esc(t[1])}</td><td class="num">${t[2] > 0 ? t[2] : ''}</td><td class="num">${t[2] > 0 ? fmt(t[3], 2) : ''}</td><td class="num">${t[2] < 0 ? -t[2] : ''}</td><td class="num">${qty}</td><td class="num">${fmt(shown, 0)}</td></tr>`;
    });
    tbl.innerHTML = h + '</table>';
    const close = st.m === 'last' ? qty * last : st.m === 'std' ? qty * st.std : val;
    out.textContent = `Closing stock ${qty} kg valued at ${rs(close)} (${fmt(close / qty, 2)} ₹/kg)\n${st.m === 'fifo' ? 'FIFO: the oldest lots were issued first, so closing stock carries the latest prices.' : st.m === 'avg' ? 'Average cost (TallyPrime default): every issue goes out at the running average rate.' : st.m === 'last' ? 'Last purchase cost: closing quantity × the latest purchase rate — quick, but not an accounting-standard method for final accounts.' : 'Standard cost: a planned rate, useful for costing; differences are variances.'}\nUnder Ind AS 2 / AS 2 only FIFO or weighted average are allowed for the final accounts.`;
  }
  draw();
};

/* ---- cost-centre allocation ---- */
W.cc = el => {
  lab(el); const d = J(el); const rows = d.rows.map(r => r.slice());
  div(el, 'hint', 'Each expense is split across cost centres in %. In TallyPrime this is the Cost Centre allocation that opens when you enter the amount of a ledger with "Cost centres are applicable = Yes".');
  edTable(el, [{ h: 'Expense', t: 'text' }, { h: 'Amount ₹', t: 'num' }].concat(d.cc.map(c => ({ h: c + ' %', t: 'num' }))), rows, draw);
  const row = div(el, 'row'), ch = div(row), out = div(row, 'out');
  function draw() {
    const t = d.cc.map(() => 0); let warn = [];
    rows.forEach(r => { const p = r.slice(2), s = p.reduce((a, b) => a + (+b || 0), 0); if (Math.abs(s - 100) > 0.01) warn.push(`${r[0]}: shares add to ${s} %`); p.forEach((x, i) => t[i] += r[1] * (+x || 0) / 100); });
    ch.innerHTML = bars(d.cc.map((c, i) => [c, t[i], i % 2 ? 'fo' : 'fb', r0(t[i])]), { l: 120 });
    out.textContent = d.cc.map((c, i) => `${c.padEnd(16)} ${r0(t[i]).padStart(14)}${d.units && d.units[i] ? `   ÷ ${d.units[i][0]} ${d.units[i][1]} = ${rs(t[i] / d.units[i][0])} per ${d.units[i][2] || d.units[i][1]}` : ''}`).join('\n') + (warn.length ? '\n\n⚠ ' + warn.join('\n⚠ ') : '\n\n✓ every expense fully allocated');
  }
  draw();
};

/* ---- GST calculator and GSTIN decoder ---- */
const STATES = { '24': 'Gujarat', '27': 'Maharashtra', '29': 'Karnataka', '32': 'Kerala', '33': 'Tamil Nadu', '34': 'Puducherry', '36': 'Telangana', '37': 'Andhra Pradesh', '07': 'Delhi', '09': 'Uttar Pradesh', '19': 'West Bengal' };
W.gst = el => {
  lab(el);
  const st = form(el, [{ k: 'kind', t: 'seg', l: 'We are', o: [['s', 'Selling'], ['p', 'Buying']], v: 's' }, { k: 'from', t: 'sel', l: 'Supplier state', o: Object.entries(STATES).map(([c, n]) => [c, c + ' ' + n]), v: CO.code || '33' }, { k: 'to', t: 'sel', l: 'Place of supply', o: Object.entries(STATES).map(([c, n]) => [c, c + ' ' + n]), v: '36' }, { k: 'tv', t: 'num', l: 'Taxable value', v: 145000, u: '₹' }, { k: 'r', t: 'seg', l: 'Rate', o: [['0', '0 %'], ['5', '5 %'], ['18', '18 %'], ['40', '40 %']], v: '18' }, { k: 'rcm', t: 'chk', l: 'Reverse charge (recipient pays the tax)', v: false }], draw);
  const out = div(el, 'out'); const g = div(el); g.innerHTML = `<h3>GSTIN decoder</h3><label>GSTIN <input type="text" value="${CO.gstin || '33AAKCA4821M1Z6'}" maxlength="15" style="max-width:220px;font-family:JetBrains Mono,monospace"></label><div class="out" style="margin-top:8px"></div>`;
  const gi = $('input', g), go = $('.out', g);
  function dec() { const v = gi.value.toUpperCase().trim(); if (v.length !== 15) { go.textContent = 'A GSTIN has 15 characters.'; return; } go.textContent = `${v.slice(0, 2)}  state code → ${STATES[v.slice(0, 2)] || 'state ' + v.slice(0, 2)}\n${v.slice(2, 12)}  PAN of the business (4th letter ${v[5]} = ${({ C: 'company', P: 'individual', F: 'firm', H: 'HUF', A: 'AOP', T: 'trust' })[v[5]] || 'other'})\n${v[12]}  registration number for this PAN in the state\n${v[13]}  'Z' by default\n${v[14]}  check character`; }
  gi.oninput = dec; dec();
  function draw() {
    const intra = st.from === st.to, tv = st.tv, r = +st.r, tax = tv * r / 100, mine = st.kind === 's' ? 'Output' : 'Input';
    let s = `${intra ? 'Intra-state supply (same state) → CGST + SGST, half each' : 'Inter-state supply (different states) → IGST'}\nTaxable value ${rs(tv)} @ ${r} %\n`;
    s += intra ? `CGST @ ${r / 2} % = ${rs(tax / 2)}\nSGST @ ${r / 2} % = ${rs(tax / 2)}\n` : `IGST @ ${r} % = ${rs(tax)}\n`;
    s += `Invoice value = ${rs(tv + (st.rcm ? 0 : tax))}${st.rcm ? '  (no tax charged on the invoice — reverse charge)' : ''}\n\nLedgers in TallyPrime:\n`;
    const party = st.kind === 's' ? 'Party (debtor)' : 'Party (creditor)';
    if (st.kind === 's') { s += `Dr ${party} ${fmt(tv + tax, 2)}\n  Cr Sales - ${intra ? 'GST' : 'Interstate'} ${r}%  ${fmt(tv, 2)}\n` + (intra ? `  Cr Output CGST ${fmt(tax / 2, 2)}\n  Cr Output SGST ${fmt(tax / 2, 2)}` : `  Cr Output IGST ${fmt(tax, 2)}`); }
    else if (!st.rcm) { s += `Dr Purchase - ${intra ? 'GST' : 'Interstate'} ${r}%  ${fmt(tv, 2)}\n` + (intra ? `Dr Input CGST ${fmt(tax / 2, 2)}\nDr Input SGST ${fmt(tax / 2, 2)}\n` : `Dr Input IGST ${fmt(tax, 2)}\n`) + `  Cr ${party} ${fmt(tv + tax, 2)}`; }
    else s += `Dr Expense / Purchase ${fmt(tv, 2)}\n  Cr ${party} ${fmt(tv, 2)}\n…and the tax you must pay yourself: liability under RCM ${fmt(tax, 2)}, which you can claim as input credit once paid in cash.`;
    s += `\n\n${mine} tax total: ${rs(st.rcm && st.kind === 's' ? 0 : tax)}`;
    out.textContent = s;
  }
  draw();
};

/* ---- GST set-off (GSTR-3B) ---- */
W.setoff = el => {
  lab(el);
  const st = form(el, [{ k: 'oi', t: 'num', l: 'Output IGST', v: 90000 }, { k: 'oc', t: 'num', l: 'Output CGST', v: 62000 }, { k: 'os', t: 'num', l: 'Output SGST', v: 62000 }, { k: 'ii', t: 'num', l: 'ITC IGST', v: 120000 }, { k: 'ic', t: 'num', l: 'ITC CGST', v: 28000 }, { k: 'is', t: 'num', l: 'ITC SGST', v: 28000 }], draw);
  const out = div(el, 'out');
  function draw() {
    let L = { I: st.oi, C: st.oc, S: st.os }, log = [];
    const use = (src, amt, to) => { const u = Math.min(amt, L[to]); L[to] -= u; if (u) log.push(`${src} credit ${fmt(u, 0)} → ${to === 'I' ? 'IGST' : to === 'C' ? 'CGST' : 'SGST'} liability`); return amt - u; };
    let ii = use('IGST', st.ii, 'I');
    // IGST balance may go to CGST and SGST in any proportion: send it where the CGST / SGST credits fall short first
    const needC = Math.max(0, L.C - st.ic), needS = Math.max(0, L.S - st.is);
    const share = needC + needS > 0 ? Math.min(ii, needC + needS) : 0;
    let a = needC + needS > 0 ? Math.round(share * needC / (needC + needS)) : 0, b = share - a;
    ii = ii - a + use('IGST', a, 'C'); ii = ii - b + use('IGST', b, 'S');
    let ic = use('CGST', st.ic, 'C'); ic = use('CGST', ic, 'I');
    let is = use('SGST', st.is, 'S'); is = use('SGST', is, 'I');
    if (ii > 0) { ii = use('IGST', ii, 'C'); ii = use('IGST', ii, 'S'); }
    out.textContent = `Order of set-off (Sec 49 / 49A / Rule 88A):\n1. IGST credit first against IGST, then CGST and SGST in any proportion\n2. CGST credit against CGST, then IGST — never against SGST\n3. SGST credit against SGST, then IGST — never against CGST\n\n${log.join('\n')}\n\nCash to pay: IGST ${r0(L.I)} · CGST ${r0(L.C)} · SGST ${r0(L.S)} · total ${r0(L.I + L.C + L.S)}\nCredit carried forward: IGST ${r0(ii)} · CGST ${r0(ic)} · SGST ${r0(is)}`;
  }
  draw();
};

/* ---- TDS under the Income-tax Act, 2025 (section 393) ---- */
W.tds = el => {
  lab(el);
  const N = { con: ['Payment to contractor (job work, labour)', 'old 194C → s.393(1) Table Sl. 6(i)', 30000, 100000], pro: ['Professional fees (audit, legal, CA)', 'old 194J → s.393(1) Table Sl. 6(iii)', 0, 50000], tec: ['Fees for technical services', 'old 194J → s.393(1) Table Sl. 6(iii)', 0, 50000] };
  const st = form(el, [{ k: 'n', t: 'sel', l: 'Nature', o: Object.entries(N).map(([k, v]) => [k, v[0]]), v: 'con' }, { k: 'who', t: 'seg', l: 'Payee', o: [['ind', 'Individual / HUF'], ['oth', 'Firm / company']], v: 'oth' }, { k: 'amt', t: 'num', l: 'This bill (before GST)', v: 48000, u: '₹' }, { k: 'prev', t: 'num', l: 'Already paid this tax year', v: 70000, u: '₹' }, { k: 'pan', t: 'chk', l: 'PAN available', v: true }], draw);
  const out = div(el, 'out');
  function draw() {
    const x = N[st.n], tot = st.amt + st.prev; let rate = st.n === 'con' ? (st.who === 'ind' ? 1 : 2) : st.n === 'pro' ? 10 : 2;
    const hit = st.n === 'con' ? (st.amt > x[2] || tot > x[3]) : tot > x[3];
    if (!st.pan) rate = 20;
    const crossNow = st.prev <= x[3] && tot > x[3], base = hit ? (crossNow ? tot : st.amt) : 0, tds = Math.round(base * rate / 100);
    out.textContent = `${x[0]}  (${x[1]})\nThresholds: ${st.n === 'con' ? `single bill > ₹${fmt(x[2], 0)} or yearly total > ₹${fmt(x[3], 0)}` : `yearly total > ₹${fmt(x[3], 0)}`}\nYearly total with this bill: ${r0(tot)} → ${hit ? 'TDS applies' : 'below threshold — no TDS yet'}\n${hit ? `Rate ${rate} %${!st.pan ? ' (no PAN → higher rate)' : ''} on ${r0(base)}${base > st.amt ? ' (the yearly limit is crossed with this bill, so the earlier payments are covered too — assuming no TDS was deducted on them)' : ''} = ${r0(tds)}` : ''}\n\nJournal in TallyPrime (on booking the bill):\nDr ${st.n === 'con' ? 'Job Work Charges' : 'Audit Fees'}            ${fmt(st.amt, 2)}\n  Cr Party                       ${fmt(st.amt - tds, 2)}\n${tds ? `  Cr TDS Payable - ${st.n === 'con' ? 'Contractor' : 'Professional'}    ${fmt(tds, 2)}` : ''}\nDeposit the TDS by the 7th of next month; file the quarterly TDS statement.\n(Rates and limits as summarised for tax year 2026-27 — always confirm against the current Act and rules.)`;
  }
  draw();
};

/* ---- payroll for one employee ---- */
W.payroll = el => {
  lab(el);
  const st = form(el, [{ k: 'b', t: 'num', l: 'Basic', v: 14000, u: '₹/month' }, { k: 'da', t: 'num', l: 'DA', v: 3000 }, { k: 'hra', t: 'num', l: 'HRA', v: 3500 }, { k: 'oth', t: 'num', l: 'Conveyance + others', v: 500 }, { k: 'pd', t: 'range', l: 'Days present (of 30)', min: 0, max: 30, v: 28 }, { k: 'cap', t: 'chk', l: 'PF on wages capped at ₹15,000', v: true }, { k: 'pt', t: 'num', l: 'Professional tax this month', v: 0, u: '₹' }], draw);
  const out = div(el, 'out');
  function draw() {
    const f = st.pd / 30, B = st.b * f, D = st.da * f, H = st.hra * f, O = st.oth * f, gross = B + D + H + O;
    const pfw = st.cap ? Math.min(B + D, 15000) : B + D, pfE = Math.round(pfw * .12), eps = Math.round(Math.min(pfw, 15000) * .0833), epf = Math.round(pfw * .12) - eps;
    const esiOn = st.b + st.da + st.hra + st.oth <= 21000, esiE = esiOn ? Math.ceil(gross * .0075) : 0, esiR = esiOn ? Math.ceil(gross * .0325) : 0;
    const ded = pfE + esiE + st.pt, net = gross - ded;
    out.textContent = `Earnings for ${st.pd} of 30 days\n  Basic ${fmt(B, 0)} · DA ${fmt(D, 0)} · HRA ${fmt(H, 0)} · Others ${fmt(O, 0)}\n  Gross ${rs(gross)}\nDeductions\n  Employee PF 12 % of ${fmt(pfw, 0)} = ${fmt(pfE, 0)}\n  Employee ESI 0.75 %${esiOn ? '' : ' (not covered: wages above ₹21,000)'} = ${fmt(esiE, 0)}\n  Professional tax ${fmt(st.pt, 0)}\n  Net pay ${rs(net)}\nEmployer cost\n  PF 12 % = ${fmt(pfE, 0)} (EPS 8.33 % ${fmt(eps, 0)} + EPF ${fmt(epf, 0)}) + EDLI/admin ≈ ${fmt(Math.round(pfw * .01), 0)}\n  ESI 3.25 % = ${fmt(esiR, 0)}\n  Cost to company this month ≈ ${rs(gross + pfE + esiR + Math.round(pfw * .01))}\n\nPayroll voucher (Ctrl+F4) → accounting effect:\nDr Salaries ${fmt(gross, 0)}\nDr Employer PF Contribution ${fmt(pfE + Math.round(pfw * .01), 0)}\nDr Employer ESI Contribution ${fmt(esiR, 0)}\n  Cr PF Payable ${fmt(2 * pfE + Math.round(pfw * .01), 0)}\n  Cr ESI Payable ${fmt(esiE + esiR, 0)}\n${st.pt ? `  Cr Professional Tax Payable ${fmt(st.pt, 0)}\n` : ''}  Cr Salary Payable ${fmt(net, 0)}`;
  }
  draw();
};

/* ---- trial balance → final accounts ---- */
const TRADING = ['Purchase Accounts', 'Direct Expenses', 'Sales Accounts', 'Direct Incomes'], PL = ['Indirect Expenses', 'Indirect Incomes'];
function finals(tb, cs, os) {
  let tr = { dr: [['Opening Stock', os]], cr: [] }, pl = { dr: [], cr: [] }, bs = { L: [], A: [] };
  tb.forEach(([n, g, dr, cr]) => { const v = dr - cr; if (TRADING.includes(g)) (v > 0 ? tr.dr : tr.cr).push([n, Math.abs(v)]); else if (PL.includes(g)) (v > 0 ? pl.dr : pl.cr).push([n, Math.abs(v)]); else (v > 0 ? bs.A : bs.L).push([n, Math.abs(v), g]); });
  tr.cr.push(['Closing Stock', cs]);
  const sum = a => a.reduce((s, x) => s + x[1], 0), gp = sum(tr.cr) - sum(tr.dr); const np = gp + sum(pl.cr) - sum(pl.dr);
  bs.A.push(['Closing Stock', cs, 'Stock-in-Hand']); bs.L.push(['Profit & Loss A/c (this year)', np, 'Capital / Reserves']);
  return { tr, pl, bs, gp, np, sum };
}
const TB = [['Share Capital', 'Capital Account', 0, 5000000], ['Reserves & Surplus', 'Reserves & Surplus', 0, 2400000], ['SIDBI Term Loan', 'Secured Loans', 0, 2400000], ['Plant & Machinery', 'Fixed Assets', 6200000, 0], ['Factory Building', 'Fixed Assets', 1800000, 0], ['Computers', 'Fixed Assets', 260000, 0],
  ['Sundry Debtors', 'Sundry Debtors', 3150000, 0], ['Sundry Creditors', 'Sundry Creditors', 0, 1980000], ['SBI Current A/c', 'Bank Accounts', 640000, 0], ['Cash', 'Cash-in-Hand', 45000, 0], ['Output / Input GST (net)', 'Duties & Taxes', 0, 185000], ['Salary & PF Payable', 'Provisions', 0, 320000],
  ['Purchase - GST 18%', 'Purchase Accounts', 16800000, 0], ['Wages', 'Direct Expenses', 3600000, 0], ['Power & Fuel', 'Direct Expenses', 1450000, 0], ['Job Work Charges', 'Direct Expenses', 980000, 0],
  ['Sales - GST 18%', 'Sales Accounts', 0, 27400000], ['Scrap Sales', 'Direct Incomes', 0, 310000], ['Salaries', 'Indirect Expenses', 1900000, 0], ['Interest on Term Loan', 'Indirect Expenses', 265000, 0], ['Depreciation', 'Indirect Expenses', 720000, 0], ['Office & Admin Expenses', 'Indirect Expenses', 540000, 0], ['Interest Received', 'Indirect Incomes', 0, 55000]];
const OPEN_STOCK = 1700000;
W.finals = el => {
  lab(el);
  // fill the opening-stock gap: TB above excludes opening stock, which sits on the Dr side
  const st = form(el, [{ k: 'cs', t: 'range', l: 'Closing stock (from the stock summary)', min: 800000, max: 3200000, s: 50000, v: 2050000, u: '₹' }], draw);
  const box = div(el);
  function draw() {
    const f = finals(TB, st.cs, OPEN_STOCK), t = (a) => a.map(x => `<tr><td>${esc(x[0])}</td><td class="num">${fmt(x[1], 0)}</td></tr>`).join('');
    const L = f.bs.L, A = f.bs.A, sl = f.sum(L), sa = f.sum(A) ;
    box.innerHTML = `<div class="fs"><div><h3>Trading section</h3><table><tr><th>Dr</th><th class="num">₹</th></tr>${t(f.tr.dr)}<tr><td><b>Gross profit c/o</b></td><td class="num"><b>${fmt(f.gp, 0)}</b></td></tr></table></div><div><h3>&nbsp;</h3><table><tr><th>Cr</th><th class="num">₹</th></tr>${t(f.tr.cr)}</table></div>
<div><h3>Profit &amp; Loss</h3><table><tr><th>Dr</th><th class="num">₹</th></tr>${t(f.pl.dr)}<tr><td><b>Net profit</b></td><td class="num"><b>${fmt(f.np, 0)}</b></td></tr></table></div><div><h3>&nbsp;</h3><table><tr><th>Cr</th><th class="num">₹</th></tr><tr><td>Gross profit b/f</td><td class="num">${fmt(f.gp, 0)}</td></tr>${t(f.pl.cr)}</table></div>
<div><h3>Balance Sheet — Liabilities</h3><table>${t(L)}<tr class="tot"><td>Total</td><td class="num">${fmt(sl, 0)}</td></tr></table></div><div><h3>Assets</h3><table>${t(A)}<tr class="tot"><td>Total</td><td class="num">${fmt(sa, 0)}</td></tr></table></div></div>
<div class="out">Gross profit ${r0(f.gp)} (${fmt(f.gp / 27400000 * 100, 1)} % of sales) · Net profit ${r0(f.np)} (${fmt(f.np / 27400000 * 100, 1)} %)\nBalance sheet ${Math.abs(sl - sa) < 1 ? '✓ tallies' : '✗ difference ' + fmt(sl - sa, 0)} — move the closing-stock slider: every rupee of closing stock is a rupee of profit, which is why stock counts matter at year end.</div>`;
  }
  draw();
};

/* ---- ratio analysis ---- */
W.ratio = el => {
  lab(el);
  const st = form(el, [{ k: 'ca', t: 'num', l: 'Current assets', v: 5885000 }, { k: 'inv', t: 'num', l: '…of which stock', v: 2050000 }, { k: 'cl', t: 'num', l: 'Current liabilities', v: 2485000 }, { k: 'debt', t: 'num', l: 'Long-term debt', v: 2400000 }, { k: 'eq', t: 'num', l: 'Equity (capital + reserves + profit)', v: 9260000 },
    { k: 'sales', t: 'num', l: 'Sales', v: 27400000 }, { k: 'gp', t: 'num', l: 'Gross profit', v: 5230000 }, { k: 'np', t: 'num', l: 'Net profit', v: 1860000 }, { k: 'deb', t: 'num', l: 'Debtors', v: 3150000 }, { k: 'cred', t: 'num', l: 'Creditors', v: 1980000 }, { k: 'pur', t: 'num', l: 'Purchases', v: 16800000 }, { k: 'int', t: 'num', l: 'Interest', v: 265000 }], draw);
  const box = div(el);
  function draw() {
    const cogs = st.sales - st.gp, k = [['Current ratio', fmt(st.ca / st.cl, 2), st.ca / st.cl < 1.2 ? 'w' : ''], ['Quick ratio', fmt((st.ca - st.inv) / st.cl, 2), (st.ca - st.inv) / st.cl < 1 ? 'w' : ''], ['Debt : equity', fmt(st.debt / st.eq, 2), st.debt / st.eq > 2 ? 'w' : ''], ['Working capital', lakh(st.ca - st.cl)],
      ['Gross profit %', fmt(st.gp / st.sales * 100, 1) + ' %'], ['Net profit %', fmt(st.np / st.sales * 100, 1) + ' %'], ['Stock turnover', fmt(cogs / st.inv, 1) + ' ×'], ['Debtor days', fmt(st.deb / st.sales * 365, 0) + ' d', st.deb / st.sales * 365 > 60 ? 'w' : ''], ['Creditor days', fmt(st.cred / st.pur * 365, 0) + ' d'], ['Return on capital', fmt((st.np + st.int) / (st.eq + st.debt) * 100, 1) + ' %'], ['Interest cover', fmt((st.np + st.int) / st.int, 1) + ' ×']];
    kpis(box, k); div(box, 'hint', 'Orange figures need attention. In TallyPrime: Gateway → Ratio Analysis (Alt+G → Ratio Analysis); the same inputs come straight from your books.');
  }
  draw();
};
const lakh = x => '₹ ' + fmt(x / 1e5, 2) + ' L';

/* ---- interest on overdue bills ---- */
W.interest = el => {
  lab(el); const d = J(el);
  const st = form(el, [{ k: 'r', t: 'range', l: 'Interest rate', min: 6, max: 24, s: .5, v: 18, u: '% p.a.' }, { k: 'cp', t: 'range', l: 'Interest starts after', min: 0, max: 60, s: 15, v: 30, u: 'days' }, { k: 'on', t: 'range', l: 'Calculate up to (days after 01-07-2026)', min: 0, max: 150, v: 92 }], draw);
  const tbl = div(el);
  function draw() {
    const asOn = new Date(new Date('2026-07-01').getTime() + st.on * 864e5); let tot = 0;
    tbl.innerHTML = `<p><b>As on ${asOn.toLocaleDateString('en-IN')}</b> · simple interest, 365-day year</p><table><tr><th>Party / bill</th><th>Bill date</th><th class="num">Amount ₹</th><th class="num">Days charged</th><th class="num">Interest ₹</th></tr>${d.map(b => { const bd = new Date(b[1]), days = Math.max(0, Math.round((asOn - bd) / 864e5) - st.cp), i = b[2] * st.r / 100 * days / 365; tot += i; return `<tr><td>${esc(b[0])}</td><td class="mono">${b[1]}</td><td class="num">${fmt(b[2], 0)}</td><td class="num">${days}</td><td class="num">${fmt(i, 2)}</td></tr>`; }).join('')}<tr class="tot"><td colspan="4">Total interest receivable — raise a Debit Note (Alt+F5) or Journal to book it</td><td class="num">${fmt(tot, 2)}</td></tr></table>`;
  }
  draw();
};

/* ---- depreciation SLM vs WDV ---- */
W.dep = el => {
  lab(el);
  const st = form(el, [{ k: 'c', t: 'num', l: 'Cost of the machine', v: 2400000, u: '₹' }, { k: 's', t: 'num', l: 'Residual value', v: 120000, u: '₹' }, { k: 'n', t: 'range', l: 'Useful life', min: 3, max: 20, v: 15, u: 'yr' }, { k: 'half', t: 'chk', l: 'Bought after 30 September (half-year in year 1, Income-tax WDV)', v: false }], draw);
  const row = div(el, 'row'), ch = div(row), out = div(row, 'out');
  function draw() {
    const slm = (st.c - st.s) / st.n, wdvR = 1 - Math.pow(st.s / st.c, 1 / st.n); let a = [[0, st.c]], b = [[0, st.c]], vb = st.c, rows = [];
    for (let y = 1; y <= st.n; y++) { const da = Math.min(slm, a[y - 1][1] - st.s), db = vb * wdvR; a.push([y, a[y - 1][1] - da]); vb -= db; b.push([y, vb]); if (y <= 5) rows.push(`Year ${y}: SLM ${fmt(da, 0)} · WDV ${fmt(db, 0)}`); }
    ch.innerHTML = chart({ x: [0, st.n], y: [0, st.c * 1.05], xl: 'year', yl: 'book value ₹', series: [{ p: a, c: 'b' }, { p: b, c: 'o', dash: 1 }], labels: [[st.n * .55, a[Math.round(st.n * .55)][1], 'SLM (straight line)', 4, -8, 'bt'], [st.n * .25, b[Math.round(st.n * .25)][1], 'WDV (reducing balance)', 4, 18, 'ot']] });
    out.textContent = `SLM: ${rs(slm)} every year (${fmt(slm / st.c * 100, 2)} % of cost)\nWDV: ${fmt(wdvR * 100, 2)} % of the opening book value each year\n${rows.join('\n')}\n\nYear-end journal (F7):\nDr Depreciation ${fmt(slm, 0)}\n  Cr Plant & Machinery ${fmt(slm, 0)}\n(Companies Act Schedule II uses useful lives; the Income-tax Act uses block WDV rates${st.half ? ' — and only half the rate in the year of purchase when the asset is used for less than 180 days' : ''}.)`;
  }
  draw();
};

/* ---- final exam + certificate (saved to the account through site-progress.js) ---- */
W.exam = el => {
  lab(el); const data = J(el), q = div(el), key = el.dataset.key || 'exam';
  quiz(q, data, key, (g, n) => { store.set(key + 'score', [g, n]); cert && cert._upd && cert._upd(); });
};
let cert = null;
W.cert = el => {
  lab(el); cert = el;
  const nmIn = document.createElement('input'); nmIn.type = 'text'; nmIn.placeholder = 'Your name'; nmIn.value = store.get('name', ''); nmIn.style.maxWidth = '300px';
  const c = div(el, 'ctl'); c.appendChild(nmIn); const pb = document.createElement('button'); pb.textContent = '🖨 Print certificate'; c.appendChild(pb); const sv = document.createElement('button'); sv.textContent = '☁ Save to my account'; c.appendChild(sv);
  const msg = div(el, 'hint'), card = div(el, 'cert'), key = el.dataset.key || 'exam';
  el._upd = () => {
    const dm = doneMap(); let n = 0; for (let i = 1; i <= ND(); i++) if (dm[i]) n++;
    const sc = store.get(key + 'score', null);
    card.innerHTML = `<div class="series" style="letter-spacing:.2em;color:var(--soft)">CERTIFICATE OF COMPLETION</div><h2>30-Day TallyPrime Course</h2><p>This is to certify that</p><div class="nm">${esc(nmIn.value || 'Your name')}</div><p>has worked through <b>${n} of ${ND()}</b> days of accounting principles, TallyPrime masters and vouchers, inventory and manufacturing, GST, TDS, payroll, reports and year-end${sc ? `, and scored <b>${sc[0]} / ${sc[1]}</b> in the final assessment` : ''}.</p><p class="hint">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} · haivijayanand.github.io/tally</p>${n < ND() || !sc ? `<p class="hint">(Complete all ${ND()} days and the final assessment to make it count.)</p>` : ''}<p class="hint">A course-completion certificate from an independent learning site — not an official certification of Tally Solutions.</p>`;
  };
  nmIn.oninput = () => { store.set('name', nmIn.value); el._upd(); };
  pb.onclick = () => { document.body.classList.add('printcert'); window.print(); setTimeout(() => document.body.classList.remove('printcert'), 500); };
  sv.onclick = () => {
    const dm = doneMap(); let n = 0; for (let i = 1; i <= ND(); i++) if (dm[i]) n++;
    const sc = store.get(key + 'score', null);
    if (!sc || n < ND()) { msg.textContent = `Complete all ${ND()} days and the final assessment first (now ${n} days${sc ? ', exam ' + sc[0] + ' / ' + sc[1] : ', exam not taken'}).`; return; }
    const go = sp => sp.saveCertificate({ course: 'tally', title: '30-Day TallyPrime Course', holderName: store.get('name', '') || undefined, score: `${sc[0]} / ${sc[1]}`, path: '/tally/' })
      .then(r => { if (r) msg.innerHTML = `Saved. Certificate ID <b>${esc(r.certId)}</b> · verify at haivijayanand.github.io/verify/?id=${esc(r.certId)}`; })
      .catch(e => { msg.textContent = 'Could not save: ' + e.message; });
    if (window.SiteProgress) go(window.SiteProgress); else { msg.textContent = 'Account service is still loading — try again in a moment.'; addEventListener('sp:loaded', () => go(window.SiteProgress), { once: true }); }
  };
  el._upd();
};
/* flash cards */
W.flash = el => {
  lab(el); const data = J(el);
  const g = div(el, 'flash', data.map(c => `<div><b>${c[0]}</b><span>${c[1]}</span></div>`).join(''));
  div(el, 'hint', 'Click a card to reveal the answer. Say it aloud before you click.');
  g.onclick = e => { const d = e.target.closest('.flash>div'); if (d) d.classList.toggle('flip'); };
};

/* ---------------- boot ---------------- */
document.addEventListener('DOMContentLoaded', () => {
  const tb = $('.toolbar');
  if (tb) {
    const b = id => $('#' + id, tb);
    b('sbBtn') && (b('sbBtn').onclick = toggleSidebar); b('themeBtn') && (b('themeBtn').onclick = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark')); b('fsBtn') && (b('fsBtn').onclick = fullscreen);
  }
  try { applyProfile(); } catch (e) { console.error('profile', e); }
  profileUI();
  buildToc(); doneBar(); steps(); initQuizzes(); hub(); refreshAll(); copyButtons();
  $$('.widget').forEach(el => { const f = W[el.dataset.w]; if (!f) return; try { f(el); } catch (e) { el.textContent = 'This lab failed to load: ' + e.message; console.error(e); } });
  document.addEventListener('fullscreenchange', () => setTimeout(SW.redraw, 100));
});
})();
