/*
TOOL:    eigen/assets/eig.js — engine for "Eigenvalues and Eigenvectors: A 10-Day Course" — shell, quiz, certificate, linear algebra and the 14 labs
FAMILY:  eigen
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    Another tutor on eigen vector and values, can you make it for GitHub. It's applications in different domains with examples. Make it as a 10 days interactive course with certificate
CHANGES: 1.0.0 - first version. Shell, quiz, keyboard (M F T P S X [ ]), certificate + save to account taken from differential-equations-2/assets/de2.js 1.0.0;
                 new linear algebra (Gauss, Jacobi, Hessenberg + shifted QR, inverse iteration, Faddeev–LeVerrier) and labs: transform, charpoly, markov, leslie,
                 mohr, chain, phase, pca, svd, pagerank, fiedler, fdmodes, power, gersh
STATUS:  working
*/
(function () {
'use strict';
const SW = window.SW = window.SW || {};
SW.version = '1.0.0';
const ND = () => (window.SW_DAYS ? SW_DAYS.length : 10);
const $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const store = {
  get(k, d) { try { const v = localStorage.getItem('eig:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('eig:' + k, JSON.stringify(v)); } catch (e) { } }
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
SW.resetProgress = () => { if (confirm('Clear all progress, ticks and quiz scores stored in this browser?')) { try { Object.keys(localStorage).filter(k => k.startsWith('eig:')).forEach(k => localStorage.removeItem(k)); } catch (e) { } location.reload(); } };

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
  const title = el.dataset.title || 'Eigenvalues and Eigenvectors: A 10-Day Course', topics = el.dataset.topics || 'eigenvalues and eigenvectors';
  el._upd = () => {
    const dm = doneMap(); let n = 0; for (let i = d0; i <= d1; i++) if (dm[i]) n++;
    const sc = store.get(key + 'score', null);
    card.innerHTML = `<div class="series" style="letter-spacing:.2em;color:var(--soft)">CERTIFICATE OF COMPLETION</div><h2>${esc(title)}</h2><p>This is to certify that</p><div class="nm">${esc(nmIn.value || 'Your name')}</div><p>has worked through <b>${n} of ${tot}</b> days of ${esc(topics)}${sc ? `, and scored <b>${sc[0]} / ${sc[1]}</b> in the final assessment` : ''}.</p><p class="hint">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} · haivijayanand.github.io/eigen</p>${n < tot || !sc ? `<p class="hint">(Complete all ${tot} days and the final assessment to make it count.)</p>` : ''}<p class="hint">A course-completion certificate — not an official or university certification.</p>`;
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



/* ================= shared helpers ================= */
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
    const go = sp => sp.saveCertificate({ course: el.dataset.course || 'eigen', title: el.dataset.title || 'Eigenvalues and Eigenvectors: A 10-Day Course', holderName: store.get('name', '') || undefined, score: `${sc[0]} / ${sc[1]}`, path: el.dataset.path || '/eigen/' })
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


function niceRange(vals, pad) { const f = vals.filter(v => Number.isFinite(v) && Math.abs(v) < 1e12); if (!f.length) return [-1, 1]; let lo = Math.min(...f), hi = Math.max(...f); if (hi - lo < 1e-9) { lo -= Math.abs(lo) * 0.1 + 1; hi += Math.abs(hi) * 0.1 + 1; } const p = (hi - lo) * (pad === undefined ? 0.08 : pad); return [lo - p, hi + p]; }

/* ================= linear algebra (small dense matrices, all in the browser) ================= */
const LA = SW.LA = {};
LA.zeros = (n, m) => Array.from({ length: n }, () => new Array(m === undefined ? n : m).fill(0));
LA.eye = n => { const I = LA.zeros(n); for (let i = 0; i < n; i++) I[i][i] = 1; return I; };
LA.copy = A => A.map(r => r.slice());
LA.mv = (A, x) => A.map(r => r.reduce((s, a, j) => s + a * x[j], 0));
LA.mm = (A, B) => A.map(r => B[0].map((_, j) => r.reduce((s, a, k) => s + a * B[k][j], 0)));
LA.T = A => A[0].map((_, j) => A.map(r => r[j]));
LA.dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
LA.norm = a => Math.sqrt(LA.dot(a, a));
LA.unit = a => { const n = LA.norm(a) || 1; return a.map(v => v / n); };
LA.trace = A => A.reduce((s, r, i) => s + r[i], 0);
/* Gaussian elimination with partial pivoting; a zero pivot is nudged so inverse iteration still works */
LA.solve = (A0, b0) => {
  const n = A0.length, A = LA.copy(A0), b = b0.slice(); let sc = 0; A.forEach(r => r.forEach(v => sc = Math.max(sc, Math.abs(v)))); sc = sc || 1;
  for (let k = 0; k < n; k++) {
    let p = k; for (let i = k + 1; i < n; i++) if (Math.abs(A[i][k]) > Math.abs(A[p][k])) p = i;
    [A[k], A[p]] = [A[p], A[k]]; [b[k], b[p]] = [b[p], b[k]];
    if (Math.abs(A[k][k]) < 1e-14 * sc) A[k][k] = 1e-14 * sc;
    for (let i = k + 1; i < n; i++) { const f = A[i][k] / A[k][k]; if (!f) continue; for (let j = k; j < n; j++) A[i][j] -= f * A[k][j]; b[i] -= f * b[k]; }
  }
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) { let s = b[i]; for (let j = i + 1; j < n; j++) s -= A[i][j] * x[j]; x[i] = s / A[i][i]; }
  return x;
};
LA.det = A0 => { const n = A0.length, A = LA.copy(A0); let d = 1; for (let k = 0; k < n; k++) { let p = k; for (let i = k + 1; i < n; i++) if (Math.abs(A[i][k]) > Math.abs(A[p][k])) p = i; if (!A[p][k]) return 0; if (p !== k) { [A[k], A[p]] = [A[p], A[k]]; d = -d; } d *= A[k][k]; for (let i = k + 1; i < n; i++) { const f = A[i][k] / A[k][k]; for (let j = k; j < n; j++) A[i][j] -= f * A[k][j]; } } return d; };
/* cyclic Jacobi for a symmetric matrix → eigenvalues ascending, eigenvectors as unit vectors */
LA.jacobi = S0 => {
  const n = S0.length, A = LA.copy(S0), V = LA.eye(n); let sc = 0; A.forEach(r => r.forEach(v => sc += v * v));
  for (let sweep = 0; sweep < 80; sweep++) {
    let off = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += A[i][j] * A[i][j];
    if (off <= 1e-26 * (sc || 1)) break;
    for (let p = 0; p < n - 1; p++) for (let q = p + 1; q < n; q++) {
      const apq = A[p][q]; if (Math.abs(apq) < 1e-300) continue;
      const th = (A[q][q] - A[p][p]) / (2 * apq), t = (th >= 0 ? 1 : -1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
      for (let k = 0; k < n; k++) { const akp = A[k][p], akq = A[k][q]; A[k][p] = c * akp - s * akq; A[k][q] = s * akp + c * akq; }
      for (let k = 0; k < n; k++) { const apk = A[p][k], aqk = A[q][k]; A[p][k] = c * apk - s * aqk; A[q][k] = s * apk + c * aqk; }
      for (let k = 0; k < n; k++) { const vkp = V[k][p], vkq = V[k][q]; V[k][p] = c * vkp - s * vkq; V[k][q] = s * vkp + c * vkq; }
    }
  }
  const ix = A.map((_, i) => i).sort((a, b) => A[a][a] - A[b][b]);
  return { vals: ix.map(i => A[i][i]), vecs: ix.map(i => signFix(V.map(r => r[i]))) };
};
function signFix(v) { let m = 0; v.forEach((x, i) => { if (Math.abs(x) > Math.abs(v[m]) + 1e-9) m = i; }); return v[m] < 0 ? v.map(x => -x) : v; }
/* eigenvalues of any real matrix: reduction to Hessenberg form, then the shifted QR algorithm (after Numerical Recipes elmhes + hqr) */
LA.eig = A0 => {
  const n = A0.length; if (n === 1) return [[A0[0][0], 0]];
  const a = [null].concat(A0.map(r => [null].concat(r.slice())));   // 1-indexed copy
  for (let m = 2; m < n; m++) {
    let x = 0, i = m;
    for (let j = m; j <= n; j++) if (Math.abs(a[j][m - 1]) > Math.abs(x)) { x = a[j][m - 1]; i = j; }
    if (i !== m) { for (let j = m - 1; j <= n; j++) { const t = a[i][j]; a[i][j] = a[m][j]; a[m][j] = t; } for (let j = 1; j <= n; j++) { const t = a[j][i]; a[j][i] = a[j][m]; a[j][m] = t; } }
    if (x) for (i = m + 1; i <= n; i++) { let y = a[i][m - 1]; if (y) { y /= x; a[i][m - 1] = y; for (let j = m; j <= n; j++) a[i][j] -= y * a[m][j]; for (let j = 1; j <= n; j++) a[j][m] += y * a[j][i]; } }
  }
  for (let i = 1; i <= n; i++) for (let j = 1; j < i - 1; j++) a[i][j] = 0;
  const wr = new Array(n + 1).fill(0), wi = new Array(n + 1).fill(0);
  let anorm = 0; for (let i = 1; i <= n; i++) for (let j = Math.max(i - 1, 1); j <= n; j++) anorm += Math.abs(a[i][j]);
  let nn = n, t = 0, p = 0, q = 0, r = 0, s = 0, w = 0, x = 0, y = 0, z = 0, guard = 0;
  while (nn >= 1 && guard++ < 10000) {
    let its = 0, l;
    do {
      for (l = nn; l >= 2; l--) { s = Math.abs(a[l - 1][l - 1]) + Math.abs(a[l][l]); if (s === 0) s = anorm; if (Math.abs(a[l][l - 1]) <= 1e-15 * s) { a[l][l - 1] = 0; break; } }
      x = a[nn][nn];
      if (l === nn) { wr[nn] = x + t; wi[nn--] = 0; }
      else {
        y = a[nn - 1][nn - 1]; w = a[nn][nn - 1] * a[nn - 1][nn];
        if (l === nn - 1) {
          p = 0.5 * (y - x); q = p * p + w; z = Math.sqrt(Math.abs(q)); x += t;
          if (q >= 0) { z = p + (p >= 0 ? Math.abs(z) : -Math.abs(z)); wr[nn - 1] = wr[nn] = x + z; if (z) wr[nn] = x - w / z; wi[nn - 1] = wi[nn] = 0; }
          else { wr[nn - 1] = wr[nn] = x + p; wi[nn - 1] = -(wi[nn] = z); }
          nn -= 2;
        } else {
          if (its === 60) return null;
          if (its === 10 || its === 20) { t += x; for (let i = 1; i <= nn; i++) a[i][i] -= x; s = Math.abs(a[nn][nn - 1]) + Math.abs(a[nn - 1][nn - 2]); y = x = 0.75 * s; w = -0.4375 * s * s; }
          ++its;
          let m;
          for (m = nn - 2; m >= l; m--) {
            z = a[m][m]; r = x - z; s = y - z;
            p = (r * s - w) / a[m + 1][m] + a[m][m + 1]; q = a[m + 1][m + 1] - z - r - s; r = a[m + 2][m + 1];
            s = Math.abs(p) + Math.abs(q) + Math.abs(r); p /= s; q /= s; r /= s;
            if (m === l) break;
            const u = Math.abs(a[m][m - 1]) * (Math.abs(q) + Math.abs(r)), v = Math.abs(p) * (Math.abs(a[m - 1][m - 1]) + Math.abs(z) + Math.abs(a[m + 1][m + 1]));
            if (u <= 1e-15 * v) break;
          }
          for (let i = m + 2; i <= nn; i++) { a[i][i - 2] = 0; if (i !== m + 2) a[i][i - 3] = 0; }
          for (let k = m; k <= nn - 1; k++) {
            if (k !== m) { p = a[k][k - 1]; q = a[k + 1][k - 1]; r = 0; if (k !== nn - 1) r = a[k + 2][k - 1]; if ((x = Math.abs(p) + Math.abs(q) + Math.abs(r)) !== 0) { p /= x; q /= x; r /= x; } }
            s = Math.sqrt(p * p + q * q + r * r); if (p < 0) s = -s;
            if (s !== 0) {
              if (k === m) { if (l !== m) a[k][k - 1] = -a[k][k - 1]; } else a[k][k - 1] = -s * x;
              p += s; x = p / s; y = q / s; z = r / s; q /= p; r /= p;
              for (let j = k; j <= nn; j++) { p = a[k][j] + q * a[k + 1][j]; if (k !== nn - 1) { p += r * a[k + 2][j]; a[k + 2][j] -= p * z; } a[k + 1][j] -= p * y; a[k][j] -= p * x; }
              const mmin = nn < k + 3 ? nn : k + 3;
              for (let i = l; i <= mmin; i++) { p = x * a[i][k] + y * a[i][k + 1]; if (k !== nn - 1) { p += z * a[i][k + 2]; a[i][k + 2] -= p * r; } a[i][k + 1] -= p * q; a[i][k] -= p; }
            }
          }
        }
      }
    } while (l < nn - 1);
  }
  const out = []; for (let i = 1; i <= n; i++) out.push([wr[i], Math.abs(wi[i]) < 1e-12 * (1 + Math.abs(wr[i])) ? 0 : wi[i]]);
  return out.sort((u, v) => (v[0] - u[0]) || (v[1] - u[1]));
};
/* eigenvector for a real eigenvalue by inverse iteration */
LA.eigvec = (A, lam) => {
  const n = A.length, sh = lam + 1e-9 * (1 + Math.abs(lam)), M = A.map((r, i) => r.map((v, j) => v - (i === j ? sh : 0)));
  let x = Array.from({ length: n }, (_, i) => 1 + 0.37 * i);
  for (let it = 0; it < 5; it++) x = LA.unit(LA.solve(M, x));
  return signFix(x);
};
/* characteristic polynomial det(λI − A) = λⁿ + c₁λⁿ⁻¹ + … + cₙ by Faddeev–LeVerrier; returns [1, c₁, …, cₙ] */
LA.charpoly = A => {
  const n = A.length, c = [1]; let M = LA.zeros(n);
  for (let k = 1; k <= n; k++) { const AM = LA.mm(A, M); M = AM.map((r, i) => r.map((v, j) => v + (i === j ? c[k - 1] : 0))); const AMk = LA.mm(A, M); c.push(-LA.trace(AMk) / k); }
  return c;
};
LA.polyval = (c, x) => c.reduce((s, v) => s * x + v, 0);
function polyStr(c) {
  const n = c.length - 1; let s = '';
  c.forEach((v, i) => { const pw = n - i; if (Math.abs(v) < 1e-10 && i) return; const a = Math.abs(v), sg = v < 0 ? ' − ' : (s ? ' + ' : ''); const num = (a === 1 && pw) ? '' : fmt(a, 4); s += sg + num + (pw ? 'λ' + (pw > 1 ? sup(pw) : '') : ''); });
  return s || '0';
}
const vstr = (v, d) => '(' + v.map(x => fmt(Math.abs(x) < 5e-12 ? 0 : x, d === undefined ? 3 : d)).join(', ') + ')';
const lamStr = z => Math.abs(z[1]) < 1e-9 ? fmt(z[0], 4) : `${fmt(z[0], 4)} ${z[1] >= 0 ? '+' : '−'} ${fmt(Math.abs(z[1]), 4)}i`;

/* arrow from (x0, y0) to (x1, y1) on a frame */
function vec(F, x0, y0, x1, y1, col, w, dash) {
  line(F, [[x0, y0], [x1, y1]], { c: col, w: w || 3, dash });
  const X0 = F.X(x0), Y0 = F.Y(y0), X1 = F.X(x1), Y1 = F.Y(y1);
  if (Math.hypot(X1 - X0, Y1 - Y0) > 8) arrowHead(F.x, X1, Y1, Math.atan2(Y1 - Y0, X1 - X0), 13, col);
}
/* editable matrix of number boxes */
function matIn(host, M, cb) {
  const wrap = div(host, 'matwrap'), t = document.createElement('table'); t.className = 'ed mat'; wrap.appendChild(t);
  const o = { M: LA.copy(M) };
  o.render = () => { t.innerHTML = o.M.map((r, i) => '<tr>' + r.map((v, j) => `<td><input type="number" step="any" data-i="${i}" data-j="${j}" value="${+v.toFixed(6)}"></td>`).join('') + '</tr>').join(''); };
  t.addEventListener('input', e => { const i = e.target, v = parseFloat(i.value); if (i.dataset.i !== undefined && Number.isFinite(v)) { o.M[+i.dataset.i][+i.dataset.j] = v; cb && cb(); } });
  o.set = M2 => { o.M = LA.copy(M2); o.render(); cb && cb(); };
  o.wrap = wrap; o.render(); return o;
}
function setSlider(st, k, v) { st[k] = v; const i = st._el[k]; if (i) { i.value = v; i._show && i._show(); } }
function bars(f, vals, opt) {
  const k = C(), x = f.x, n = vals.length, w = (f.X(1) - f.X(0)) * 0.7;
  vals.forEach((v, i) => { const X = f.X(i + 0.5), y0 = f.Y(0), y1 = f.Y(v); x.fillStyle = (opt && opt.cols && opt.cols[i]) || k.pri; x.globalAlpha = (opt && opt.alpha) || 0.85; x.fillRect(X - w / 2, Math.min(y0, y1), w, Math.abs(y1 - y0)); x.globalAlpha = 1; });
}

/* ================= DAY 1: what an eigenvector is ================= */
W.transform = el => {
  lab(el);
  const PRE = { symmetric: [2, 1, 1, 2], stretch: [2, 0, 0, 0.5], shear: [1, 1, 0, 1], general: [1, 2, 0.5, 1], rotation: [0.8, -0.6, 0.6, 0.8], reflection: [0, 1, 1, 0], projection: [1, 0, 0, 0], uniform: [1.5, 0, 0, 1.5] };
  const st = form(el, [{ k: 'pre', t: 'sel', l: 'Matrix', o: [['symmetric', 'Symmetric [2 1; 1 2]'], ['stretch', 'Stretch x, squash y'], ['shear', 'Shear'], ['general', 'General [1 2; 0.5 1]'], ['rotation', 'Rotation by 36.9°'], ['reflection', 'Reflection in y = x'], ['projection', 'Projection onto x'], ['uniform', 'Uniform scaling ×1.5']], v: 'symmetric' },
  { k: 'a', t: 'range', l: 'a', min: -3, max: 3, s: 0.1, v: 2 }, { k: 'b', t: 'range', l: 'b', min: -3, max: 3, s: 0.1, v: 1 }, { k: 'c', t: 'range', l: 'c', min: -3, max: 3, s: 0.1, v: 1 }, { k: 'd', t: 'range', l: 'd', min: -3, max: 3, s: 0.1, v: 2 },
  { k: 'grid', t: 'chk', l: 'show the transformed grid', v: true }], k => { if (k === 'pre') { const p = PRE[st.pre];['a', 'b', 'c', 'd'].forEach((n, i) => setSlider(st, n, p[i])); } draw(); });
  const g = div(el, 'grid2'), cv = canvas(g, 'sq', 'Drag anywhere to move x (blue). Ax is orange dashed. Purple dotted lines are the eigenvector directions.'), out = div(g, 'out');
  const lg = div(el, 'legend'); legend(lg, [['', 'x'], ['o dash', 'Ax'], ['v', 'eigen-directions'], ['k', 'unit circle and its image']]);
  let ph = 0.3, r0 = 1.6, drag = false;
  const set = e => { const f = cv._f; if (!f) return; const p = cv.pos(e), X = f.ix(p[0]), Y = f.iy(p[1]); ph = Math.atan2(Y, X); r0 = clamp(Math.hypot(X, Y), 0.2, 3.8); draw(); };
  cv.c.addEventListener('pointerdown', e => { drag = true; set(e); }); addEventListener('pointerup', () => drag = false); cv.c.addEventListener('pointermove', e => { if (drag) set(e); });
  function draw() {
    const k = C(), A = [[st.a, st.b], [st.c, st.d]]; cv.fit(); const F = cv._f = frame(cv, [-4, 4], [-4, 4], { nx: 8, ny: 8 }); F.clip();
    if (st.grid) { F.x.globalAlpha = 0.35; for (let i = -6; i <= 6; i++) { line(F, [LA.mv(A, [i, -6]), LA.mv(A, [i, 6])], { c: k.vio, w: 1 }); line(F, [LA.mv(A, [-6, i]), LA.mv(A, [6, i])], { c: k.vio, w: 1 }); } F.x.globalAlpha = 1; }
    const circ = lin(0, 2 * PI, 120).map(t => [Math.cos(t), Math.sin(t)]); line(F, circ, { c: k.soft, w: 1.6 }); line(F, circ.map(p => LA.mv(A, p)), { c: k.ink, w: 2 });
    const ev = eig2(st.a, st.b, st.c, st.d); let evs = [];
    if (!ev[0][1]) ev.forEach(z => { const l = z[0]; let v = Math.abs(st.b) > 1e-9 ? [st.b, l - st.a] : Math.abs(st.c) > 1e-9 ? [l - st.d, st.c] : (Math.abs(l - st.a) < 1e-9 ? [1, 0] : [0, 1]); v = LA.unit(v); evs.push([l, v]); line(F, [[-6 * v[0], -6 * v[1]], [6 * v[0], 6 * v[1]]], { c: k.vio, w: 2.4, dash: [2, 5] }); });
    if (!ev[0][1] && Math.abs(ev[0][0] - ev[1][0]) < 1e-9 && Math.abs(st.b) < 1e-9 && Math.abs(st.c) < 1e-9) evs = [[ev[0][0], [1, 0]], [ev[0][0], [0, 1]]];
    const x = [r0 * Math.cos(ph), r0 * Math.sin(ph)], Ax = LA.mv(A, x);
    vec(F, 0, 0, Ax[0], Ax[1], k.acc, 3, [9, 5]); vec(F, 0, 0, x[0], x[1], k.pri, 3.4); dot(F, 0, 0, 3, k.ink);
    label(F, x[0], x[1], 'x', k.pri, 'left', 8, -6); label(F, Ax[0], Ax[1], 'Ax', k.acc2, 'left', 8, -6); F.unclip();
    const ang = deg(Math.atan2(x[0] * Ax[1] - x[1] * Ax[0], x[0] * Ax[0] + x[1] * Ax[1])), ratio = LA.norm(Ax) / LA.norm(x), par = Math.abs(Math.sin(rad(ang))) < 0.035 && LA.norm(Ax) > 1e-6;
    const det = st.a * st.d - st.b * st.c, tr = st.a + st.d;
    out.textContent = `A = [ ${fmt(st.a, 1)}  ${fmt(st.b, 1)} ; ${fmt(st.c, 1)}  ${fmt(st.d, 1)} ]\nx  = ${vstr(x, 2)}\nAx = ${vstr(Ax, 2)}\nAngle from x to Ax: ${fmt(ang, 1)}°   ·   |Ax| / |x| = ${fmt(ratio, 3)}\n` +
      (par ? `★ x is (very nearly) an EIGENVECTOR: Ax = ${fmt(Math.sign(Math.cos(rad(ang))) * ratio, 2)}·x\n` : LA.norm(Ax) < 1e-6 ? '★ Ax = 0: x is an eigenvector with λ = 0 (it is squashed to nothing)\n' : 'Not an eigenvector — the matrix turns it. Drag x onto a purple line.\n') +
      `\nEigenvalues: ${ev.map(lamStr).join('  and  ')}\n` + (ev[0][1] ? 'Complex pair → no real direction survives: every vector is turned.\n' : evs.map((e, i) => `  λ${i + 1} = ${fmt(e[0], 3)}  along ${vstr(e[1], 3)}`).join('\n') + '\n') +
      `trace = ${fmt(tr, 2)} = λ₁ + λ₂   ·   det = ${fmt(det, 2)} = λ₁·λ₂ (area scale factor)`;
  }
  anim(el, dt => { ph += dt * 0.6; draw(); });
  REDRAW.push(draw); draw();
};

/* ================= DAY 2: characteristic polynomial ================= */
W.charpoly = el => {
  lab(el);
  const PRE = {
    2: [['ex', 'Worked example [4 1; 2 3]', [[4, 1], [2, 3]]], ['sym', 'Symmetric [2 −1; −1 2]', [[2, -1], [-1, 2]]], ['rot', 'Rotation-like [0 −1; 1 0]', [[0, -1], [1, 0]]], ['def', 'Defective (shear) [3 1; 0 3]', [[3, 1], [0, 3]]], ['smd', 'Spring–mass–damper [0 1; −4 −1]', [[0, 1], [-4, -1]]]],
    3: [['chain', 'Spring chain [2 −1 0; −1 2 −1; 0 −1 2]', [[2, -1, 0], [-1, 2, -1], [0, -1, 2]]], ['tri', 'Triangular', [[3, 2, 1], [0, 1, 4], [0, 0, -2]]], ['mk', 'Markov (columns sum to 1)', [[0.8, 0.1, 0.1], [0.15, 0.8, 0.2], [0.05, 0.1, 0.7]]], ['rep', 'Repeated eigenvalue', [[2, 1, 0], [0, 2, 0], [0, 0, 3]]], ['rz', 'Rotation about z, scaled', [[0, -2, 0], [2, 0, 0], [0, 0, 1]]]],
    4: [['chain4', 'Spring chain, 4 masses', [[2, -1, 0, 0], [-1, 2, -1, 0], [0, -1, 2, -1], [0, 0, -1, 2]]], ['comp', 'Companion of (λ−1)(λ−2)(λ−3)(λ−4)', [[10, -35, 50, -24], [1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0]]], ['gen', 'General', [[4, -2, 1, 0], [1, 3, 0, 2], [0, 1, 2, -1], [2, 0, 1, 1]]]]
  };
  let n = 2;
  const st = form(el, [{ k: 'n', t: 'seg', l: 'Size', o: [['2', '2 × 2'], ['3', '3 × 3'], ['4', '4 × 4']], v: '2' }, { k: 'pre', t: 'sel', l: 'Example', o: PRE[2].map(p => [p[0], p[1]]), v: 'ex' }], k => {
    if (k === 'n') { n = +st.n; const s = st._el.pre; s.innerHTML = PRE[n].map(p => `<option value="${p[0]}">${p[1]}</option>`).join(''); st.pre = PRE[n][0][0]; s.value = st.pre; }
    m.set(PRE[n].find(p => p[0] === st.pre)[2]);
  });
  const row = div(el, 'row'), left = div(row), m = matIn(left, PRE[2][0][2], () => draw()); div(left, 'hint', 'Type any numbers into the matrix. Everything below updates as you type.');
  const cv = canvas(row, 'plot', 'p(λ) = det(λI − A). Real eigenvalues are where the curve crosses zero (orange dots).');
  const out = div(el, 'out');
  function draw() {
    const A = m.M, k = C(), c = LA.charpoly(A), ev = LA.eig(A) || [];
    const re = ev.map(z => z[0]), xr = niceRange(re.concat(re.map(v => v + 1), re.map(v => v - 1)), 0.15);
    const pts = lin(xr[0], xr[1], 300).map(x => [x, LA.polyval(c, x)]);
    const yv = pts.map(p => p[1]).sort((a, b) => a - b), yr = niceRange([yv[Math.floor(yv.length * 0.05)], yv[Math.floor(yv.length * 0.95)], 0], 0.2);
    cv.fit(); const F = frame(cv, xr, yr, { xl: 'λ', yl: 'p(λ)' }); F.clip(); line(F, pts, { c: k.pri, w: 2.8 }); ev.filter(z => !z[1]).forEach(z => dot(F, z[0], 0, 6, k.acc)); F.unclip();
    const tr = LA.trace(A), det = LA.det(A);
    let s = `Characteristic polynomial  det(λI − A) = ${polyStr(c)}\ntrace = ${fmt(tr, 4)}   ·   det = ${fmt(det, 4)}\n\nEigenvalues:\n`;
    ev.forEach((z, i) => {
      s += `  λ${i + 1} = ${lamStr(z)}`;
      if (!z[1]) { const v = LA.eigvec(A, z[0]), Av = LA.mv(A, v), res = LA.norm(Av.map((x, j) => x - z[0] * v[j])); s += `   v = ${vstr(v, 4)}   (check |Av − λv| = ${res.toExponential(1)})`; }
      else s += '   complex — the matrix rotates in a plane';
      s += '\n';
    });
    const sumL = ev.reduce((a, z) => a + z[0], 0); let pr = [1, 0]; ev.forEach(z => pr = cx.mul(pr, z));
    s += `\nChecks: Σλ = ${fmt(sumL, 4)} (= trace)   ·   Πλ = ${fmt(pr[0], 4)} (= det)`;
    const rep = ev.some((z, i) => ev.some((w, j) => j > i && Math.hypot(z[0] - w[0], z[1] - w[1]) < 1e-6));
    if (rep) { const z = ev.find((z, i) => ev.some((w, j) => j > i && Math.hypot(z[0] - w[0], z[1] - w[1]) < 1e-6)); const M = A.map((r, i) => r.map((v, j) => v - (i === j ? z[0] : 0))); const rk = rank(M); s += `\nRepeated eigenvalue λ = ${fmt(z[0], 3)}: algebraic multiplicity ≥ 2, geometric multiplicity = n − rank(A − λI) = ${n - rk}` + (n - rk < 2 ? ' → DEFECTIVE: not enough eigenvectors to diagonalise.' : ' → enough eigenvectors, still diagonalisable.'); }
    out.textContent = s;
  }
  REDRAW.push(draw); draw();
};
function rank(M0) { const M = LA.copy(M0), n = M.length, m = M[0].length; let r = 0, sc = 0; M.forEach(row => row.forEach(v => sc = Math.max(sc, Math.abs(v)))); for (let c = 0; c < m && r < n; c++) { let p = r; for (let i = r + 1; i < n; i++) if (Math.abs(M[i][c]) > Math.abs(M[p][c])) p = i; if (Math.abs(M[p][c]) < 1e-9 * (sc || 1)) continue; [M[r], M[p]] = [M[p], M[r]]; for (let i = r + 1; i < n; i++) { const f = M[i][c] / M[r][c]; for (let j = c; j < m; j++) M[i][j] -= f * M[r][j]; } r++; } return r; }

/* ================= DAY 3: powers, Markov chains and populations ================= */
W.markov = el => {
  lab(el);
  const SC = {
    brand: { n: ['Brand A', 'Brand B', 'Brand C'], P: [[0.80, 0.10, 0.15], [0.12, 0.75, 0.10], [0.08, 0.15, 0.75]], u: 'customers' },
    weather: { n: ['Sunny', 'Cloudy', 'Rainy'], P: [[0.70, 0.30, 0.20], [0.20, 0.40, 0.40], [0.10, 0.30, 0.40]], u: 'days' },
    machine: { n: ['Good', 'Worn', 'Down'], P: [[0.90, 0.00, 0.60], [0.08, 0.85, 0.00], [0.02, 0.15, 0.40]], u: 'machines' }
  };
  const st = form(el, [{ k: 'sc', t: 'sel', l: 'Scenario', o: [['brand', 'Market share of three brands'], ['weather', 'Weather from day to day'], ['machine', 'Machine condition month to month']], v: 'brand' }, { k: 'x0', t: 'sel', l: 'Start', o: [['0', 'all in state 1'], ['1', 'all in state 2'], ['2', 'all in state 3'], ['e', 'evenly split']], v: '0' }], k => { if (k === 'sc') m.set(SC[st.sc].P); reset(); });
  const left = div(el); div(left, 'hint', 'Transition matrix P: entry (i, j) = probability of moving FROM column j TO row i. Each column must add up to 1 (it is normalised for you).');
  const m = matIn(left, SC.brand.P, () => reset()); const names = div(left, 'hint');
  const g = div(el, 'grid2'), A = canvas(g, 'plot', 'Share in each state after k steps'), B = canvas(g, 'plot', 'History: the shares settle onto the eigenvector for λ = 1');
  const lg = div(el, 'legend'), out = div(el, 'out');
  let x, hist;
  function P() { const M = LA.copy(m.M).map(r => r.map(v => Math.max(0, v))); for (let j = 0; j < 3; j++) { const s = M.reduce((a, r) => a + r[j], 0) || 1; for (let i = 0; i < 3; i++) M[i][j] /= s; } return M; }
  function reset() { x = st.x0 === 'e' ? [1 / 3, 1 / 3, 1 / 3] : [0, 0, 0].map((_, i) => i === +st.x0 ? 1 : 0); hist = [x.slice()]; draw(); }
  function step() { x = LA.mv(P(), x); hist.push(x.slice()); if (hist.length > 60) hist.shift(); draw(); }
  function draw() {
    const k = C(), M = P(), sc = SC[st.sc], cols = [k.pri, k.acc, k.vio], dashes = [[], [9, 5], [2, 5]];
    names.innerHTML = 'States: ' + sc.n.map((s, i) => `<b>${i + 1}</b> = ${s}`).join(' · ');
    legend(lg, [['', sc.n[0]], ['o dash', sc.n[1]], ['v', sc.n[2]]]);
    const ev = LA.eig(M) || [], i1 = ev.reduce((b, z, i) => Math.hypot(z[0] - 1, z[1]) < Math.hypot(ev[b][0] - 1, ev[b][1]) ? i : b, 0);
    let v = LA.eigvec(M, ev[i1][0]); const sv = v.reduce((a, b) => a + b, 0); v = v.map(t => t / sv);
    const others = ev.filter((_, i) => i !== i1), l2 = Math.max(...others.map(z => Math.hypot(z[0], z[1])));
    A.fit(); const F = frame(A, [0, 3], [0, 1], { xl: '', yl: 'share', nx: 3 }); bars(F, x, { cols }); v.forEach((t, i) => line(F, [[i + 0.1, t], [i + 0.9, t]], { c: k.ink, w: 2, dash: [5, 4] }));
    sc.n.forEach((s, i) => label(F, i + 0.5, 0, s, k.ink, 'center', 0, 26));
    B.fit(); const G = frame(B, [0, Math.max(10, hist.length - 1)], [0, 1], { xl: 'step k' }); G.clip(); for (let j = 0; j < 3; j++) line(G, hist.map((h, i) => [i, h[j]]), { c: cols[j], w: 2.6, dash: dashes[j] }); G.unclip();
    const kk = hist.length - 1, nsteps = l2 > 1e-9 && l2 < 1 ? Math.log(0.01) / Math.log(l2) : 0;
    out.textContent = `Step k = ${kk}:   x = ${vstr(x, 3)}\n\nEigenvalues of P: ${ev.map(lamStr).join(', ')}\nSteady state (eigenvector for λ = 1, scaled to add up to 1): ${vstr(v, 3)}  → ${sc.n.map((s, i) => s + ' ' + fmt(100 * v[i], 1) + ' %').join(', ')}\n|λ₂| = ${fmt(l2, 3)}: every step the gap to steady state shrinks by this factor → within 1 % after about ${fmt(nsteps, 0)} steps.\n` + (l2 > 0.999 ? 'A second eigenvalue on the unit circle: the chain does not settle (it is periodic or splits into separate groups).' : 'Press S to take one step, P to run, X to pause. The dashed black marks are the steady state.');
  }
  const a = anim(el, (() => { let acc = 0; return dt => { acc += dt; if (acc > 0.35) { acc = 0; step(); } }; })()); a.step = () => step();
  REDRAW.push(draw); reset();
};

W.leslie = el => {
  lab(el);
  const st = form(el, [{ k: 'f1', t: 'range', l: 'F₁', min: 0, max: 2, s: 0.05, v: 0 }, { k: 'f2', t: 'range', l: 'F₂', min: 0, max: 3, s: 0.05, v: 1.5 }, { k: 'f3', t: 'range', l: 'F₃', min: 0, max: 3, s: 0.05, v: 1.2 }, { k: 'f4', t: 'range', l: 'F₄', min: 0, max: 3, s: 0.05, v: 0.5 },
  { k: 's1', t: 'range', l: 's₁', min: 0, max: 1, s: 0.01, v: 0.5 }, { k: 's2', t: 'range', l: 's₂', min: 0, max: 1, s: 0.01, v: 0.7 }, { k: 's3', t: 'range', l: 's₃', min: 0, max: 1, s: 0.01, v: 0.6 }], () => draw());
  div(el, 'hint', 'F = average offspring per individual in each age class per period · s = fraction surviving into the next age class. Start: 100 newborns only.');
  const g = div(el, 'grid2'), A = canvas(g, 'plot', 'Total population (log scale): after a transient it grows like λ₁ᵏ (dashed)'), B = canvas(g, 'plot', 'Age structure after 30 periods (bars) vs the dominant eigenvector (dashed)');
  const out = div(el, 'out');
  function draw() {
    const k = C(), L = [[st.f1, st.f2, st.f3, st.f4], [st.s1, 0, 0, 0], [0, st.s2, 0, 0], [0, 0, st.s3, 0]];
    const ev = LA.eig(L) || [[0, 0]], l1 = ev.filter(z => !z[1]).reduce((a, z) => Math.max(a, z[0]), 0);
    let v = LA.eigvec(L, l1); const sv = v.reduce((a, b) => a + b, 0); v = v.map(t => t / sv);
    let x = [100, 0, 0, 0]; const tot = [[0, 100]]; for (let t = 1; t <= 30; t++) { x = LA.mv(L, x); tot.push([t, x.reduce((a, b) => a + b, 0)]); }
    const ys = tot.map(p => Math.log10(Math.max(p[1], 1e-6))), ref = tot.map(p => [p[0], Math.log10(tot[30][1] * Math.pow(l1, p[0] - 30))]);
    A.fit(); const F = frame(A, [0, 30], niceRange(ys.concat(ref.map(p => p[1]))), { xl: 'period k', yl: 'log₁₀ total' }); F.clip(); line(F, ref, { c: k.acc, w: 2, dash: [8, 5] }); line(F, tot.map((p, i) => [p[0], ys[i]]), { c: k.pri, w: 2.8 }); F.unclip();
    const s30 = x.reduce((a, b) => a + b, 0) || 1, xs = x.map(t => t / s30);
    B.fit(); const G = frame(B, [0, 4], [0, Math.max(...xs, ...v) * 1.15 || 1], { xl: 'age class', nx: 4 }); bars(G, xs); v.forEach((t, i) => line(G, [[i + 0.1, t], [i + 0.9, t]], { c: k.acc, w: 3, dash: [7, 4] }));
    const R0 = st.f1 + st.s1 * st.f2 + st.s1 * st.s2 * st.f3 + st.s1 * st.s2 * st.s3 * st.f4;
    out.textContent = `Leslie matrix  L = [F₁ F₂ F₃ F₄; s₁ 0 0 0; 0 s₂ 0 0; 0 0 s₃ 0]\nDominant eigenvalue λ₁ = ${fmt(l1, 4)}  →  ${l1 >= 1 ? 'grows' : 'shrinks'} ${fmt(Math.abs(l1 - 1) * 100, 2)} % per period` + (l1 > 1.0001 ? `, doubling every ${fmt(Math.log(2) / Math.log(l1), 1)} periods` : l1 < 0.9999 && l1 > 0 ? `, halving every ${fmt(Math.log(2) / -Math.log(l1), 1)} periods` : '') +
      `\nStable age distribution (eigenvector of λ₁): ${v.map(t => fmt(100 * t, 1) + ' %').join(' · ')}\nNet reproductive number R₀ = F₁ + s₁F₂ + s₁s₂F₃ + s₁s₂s₃F₄ = ${fmt(R0, 3)}   (λ₁ > 1 exactly when R₀ > 1)\nAll eigenvalues: ${ev.map(lamStr).join(', ')}`;
  }
  REDRAW.push(draw); draw();
};

/* ================= DAY 4: symmetric matrices — principal stresses ================= */
W.mohr = el => {
  lab(el);
  const st = form(el, [{ k: 'sx', t: 'range', l: 'σx', min: -200, max: 200, s: 5, v: 80, u: 'MPa' }, { k: 'sy', t: 'range', l: 'σy', min: -200, max: 200, s: 5, v: -20, u: 'MPa' }, { k: 'txy', t: 'range', l: 'τxy', min: -150, max: 150, s: 5, v: 40, u: 'MPa' }, { k: 'th', t: 'range', l: 'Element angle θ', min: 0, max: 180, s: 1, v: 0, u: '°' }], () => draw());
  const g = div(el, 'grid2'), A = canvas(g, 'sq', 'The stress element turned by θ. Blue = normal stress, orange dashed = shear. Purple dotted = principal directions.'), B = canvas(g, 'sq', "Mohr's circle: every face orientation is one point; the principal stresses are where τ = 0.");
  const out = div(el, 'out');
  function draw() {
    const k = C(), sx = st.sx, sy = st.sy, t = st.txy, th = rad(st.th), c = (sx + sy) / 2, R = Math.hypot((sx - sy) / 2, t);
    const S = [[sx, t], [t, sy]], E = LA.jacobi(S), s1 = E.vals[1], s2 = E.vals[0], v1 = E.vecs[1], tp = deg(Math.atan2(v1[1], v1[0]));
    const sn = c + (sx - sy) / 2 * Math.cos(2 * th) + t * Math.sin(2 * th), tn = -(sx - sy) / 2 * Math.sin(2 * th) + t * Math.cos(2 * th);
    const sn2 = c - (sx - sy) / 2 * Math.cos(2 * th) - t * Math.sin(2 * th);
    A.fit(); const F = frame(A, [-3, 3], [-3, 3], { l: 14, b: 14, r: 14, t: 14, nx: 1, ny: 1 }); const x = F.x;
    [E.vecs[0], E.vecs[1]].forEach(v => line(F, [[-3 * v[0], -3 * v[1]], [3 * v[0], 3 * v[1]]], { c: k.vio, w: 2.2, dash: [2, 5] }));
    const ct = Math.cos(th), sth = Math.sin(th), P = (u, w) => [u * ct - w * sth, u * sth + w * ct];
    const sq = [P(-1, -1), P(1, -1), P(1, 1), P(-1, 1), P(-1, -1)]; x.fillStyle = k.bg; x.beginPath(); sq.forEach((p, i) => i ? x.lineTo(F.X(p[0]), F.Y(p[1])) : x.moveTo(F.X(p[0]), F.Y(p[1]))); x.fill(); line(F, sq, { c: k.ink, w: 2.4 });
    const sc = 1.2 / 200, L0 = 1.15;
    [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([u, w]) => {
      const n = P(u, w), trv = LA.mv(S, n), s = LA.dot(n, trv), tv = [trv[0] - s * n[0], trv[1] - s * n[1]], b = [n[0] * L0, n[1] * L0], L = s * sc * 1.6;
      if (Math.abs(L) > 0.02) { if (L > 0) vec(F, b[0], b[1], b[0] + n[0] * L, b[1] + n[1] * L, k.pri, 3); else vec(F, b[0] - n[0] * L, b[1] - n[1] * L, b[0], b[1], k.pri, 3); }
      const m = [n[0] * 1.06, n[1] * 1.06], T = sc * 1.6;
      if (Math.hypot(tv[0], tv[1]) * T > 0.02) vec(F, m[0] - tv[0] * T / 2, m[1] - tv[1] * T / 2, m[0] + tv[0] * T / 2, m[1] + tv[1] * T / 2, k.acc, 2.6, [7, 4]);
    });
    label(F, P(1.3, 0)[0], P(1.3, 0)[1], fmt(sn, 0), k.pri, 'center', 0, -8);
    const lim = Math.max(Math.abs(c) + R, 50) * 1.15;
    B.fit(); const G = frame(B, [-lim, lim], [-lim, lim], { xl: 'σ, MPa', yl: 'τ, MPa' }); G.clip();
    line(G, lin(0, 2 * PI, 160).map(a => [c + R * Math.cos(a), R * Math.sin(a)]), { c: k.ink, w: 2.2 });
    line(G, [[sx, t], [sy, -t]], { c: k.soft, w: 1.4, dash: [4, 4] }); dot(G, sx, t, 5, k.soft); dot(G, sy, -t, 5, k.soft);
    dot(G, s1, 0, 7, k.vio); dot(G, s2, 0, 7, k.vio); dot(G, c, R, 5, k.ink); dot(G, sn, tn, 8, k.pri);
    label(G, s1, 0, 'σ₁', k.vio, 'left', 8, 18); label(G, s2, 0, 'σ₂', k.vio, 'right', -8, 18); label(G, sn, tn, 'face at θ', k.pri, sn > c ? 'right' : 'left', sn > c ? -12 : 12, -10); G.unclip();
    const vm = Math.sqrt(s1 * s1 - s1 * s2 + s2 * s2), tres = Math.max(Math.abs(s1), Math.abs(s2), Math.abs(s1 - s2));
    out.textContent = `Stress tensor  S = [σx τxy; τxy σy] = [${fmt(sx, 0)} ${fmt(t, 0)}; ${fmt(t, 0)} ${fmt(sy, 0)}] MPa\nEigenvalues (principal stresses):  σ₁ = ${fmt(s1, 1)} MPa,  σ₂ = ${fmt(s2, 1)} MPa\nEigenvectors (principal directions): σ₁ along ${vstr(v1, 3)} → θp = ${fmt(tp, 1)}°;  σ₂ at θp + 90°\nCircle: centre (σx + σy)/2 = ${fmt(c, 1)}, radius R = τmax = ${fmt(R, 1)} MPa\nOn the face at θ = ${st.th}°:  σ = ${fmt(sn, 1)},  τ = ${fmt(tn, 1)} MPa   (turn θ to ${fmt(((tp % 180) + 180) % 180, 0)}° and the shear vanishes)\nvon Mises σ_vm = √(σ₁² − σ₁σ₂ + σ₂²) = ${fmt(vm, 1)} MPa  ·  Tresca σ_eq = max(|σ₁|, |σ₂|, |σ₁ − σ₂|) = ${fmt(tres, 1)} MPa`;
  }
  anim(el, dt => { st.th = (st.th + dt * 25) % 180; setSlider(st, 'th', Math.round(st.th * 10) / 10); draw(); });
  REDRAW.push(draw); draw();
};

/* ================= DAY 5: vibration modes ================= */
W.chain = el => {
  lab(el);
  const st = form(el, [{ k: 'sys', t: 'sel', l: 'System', o: [['ff', 'Masses between two walls'], ['fr', 'Fixed at one end, free at the other'], ['bld', 'Shear building (floors on columns)']], v: 'bld' },
  { k: 'n', t: 'range', l: 'Number of masses / floors', min: 2, max: 8, s: 1, v: 4 }, { k: 'm', t: 'range', l: 'Mass each', min: 100, max: 5000, s: 100, v: 2000, u: 'kg' }, { k: 'k', t: 'range', l: 'Stiffness each', min: 50, max: 5000, s: 50, v: 1500, u: 'kN/m' },
  { k: 'taper', t: 'chk', l: 'stiffer at the base (k grows downwards)', v: false }, { k: 'mode', t: 'range', l: 'Mode shown', min: 1, max: 8, s: 1, v: 1 }], () => { setSlider(st, 'mode', Math.min(st.mode, st.n)); solveM(); draw(); });
  const g = div(el, 'grid2'), A = canvas(g, 'sq', 'The selected mode, animated. Press P to play — higher modes move faster.'), B = canvas(g, 'sq', 'All mode shapes φᵢ (selected one thick). Each is an eigenvector of K φ = ω² M φ.');
  const out = div(el, 'out'); let E, t = 0;
  function KM() {
    const n = st.n, ks = Array.from({ length: n }, (_, i) => st.k * 1e3 * (st.taper ? (n - i + 1) / 2 : 1)), K = LA.zeros(n);
    // spring i connects mass i−1 (or ground) to mass i; for 'ff' one extra spring to the far wall
    for (let i = 0; i < n; i++) { K[i][i] += ks[i]; if (i > 0) { K[i - 1][i - 1] += ks[i]; K[i - 1][i] -= ks[i]; K[i][i - 1] -= ks[i]; } }
    if (st.sys === 'ff') K[n - 1][n - 1] += st.k * 1e3;
    return { K, M: Array(n).fill(st.m), ks };
  }
  function solveM() {
    const { K, M } = KM(), n = st.n, S = K.map((r, i) => r.map((v, j) => v / Math.sqrt(M[i] * M[j]))), J = LA.jacobi(S);
    E = { w: J.vals.map(l => Math.sqrt(Math.max(l, 0))), phi: J.vecs.map(v => { const p = v.map((x, i) => x / Math.sqrt(M[i])), mx = p.reduce((a, b) => Math.abs(b) > Math.abs(a) ? b : a, 0); return p.map(x => x / mx); }), K, n };
  }
  function draw() {
    const k = C(), n = st.n, md = Math.min(st.mode, n) - 1, phi = E.phi[md], amp = 0.35 * Math.cos(E.w[md] / E.w[0] * t * 2 * PI * 0.5);
    A.fit(); const x = A.ctx, W0 = A.w, H = A.h; x.fillStyle = k.card; x.fillRect(0, 0, W0, H);
    if (st.sys === 'bld') {
      const base = H - 30, fh = (H - 70) / n, cx0 = W0 / 2, bw = Math.min(200, W0 * 0.45), sw = bw * 0.9;
      x.strokeStyle = k.ink; x.lineWidth = 3; x.beginPath(); x.moveTo(cx0 - bw, base); x.lineTo(cx0 + bw, base); x.stroke();
      let prevX = 0; for (let i = 0; i < n; i++) {
        const dx = phi[i] * amp * sw, y = base - (i + 1) * fh;
        x.strokeStyle = k.pri; x.lineWidth = 3; [-1, 1].forEach(sd => { x.beginPath(); x.moveTo(cx0 + sd * bw * 0.7 + prevX, y + fh); x.bezierCurveTo(cx0 + sd * bw * 0.7 + prevX, y + fh * 0.5, cx0 + sd * bw * 0.7 + dx, y + fh * 0.5, cx0 + sd * bw * 0.7 + dx, y); x.stroke(); });
        block(x, cx0 + dx, y, bw * 1.6, 16, k.bg, k.ink, ''); x.fillStyle = k.soft; x.font = '12px Inter,sans-serif'; x.textAlign = 'left'; x.fillText('floor ' + (i + 1), cx0 + bw * 0.85 + Math.max(dx, 0), y - 10); prevX = dx;
      }
    } else {
      const y = H / 2, L = 40, R = W0 - (st.sys === 'ff' ? 40 : 20), gap = (R - L) / (n + (st.sys === 'ff' ? 1 : 0.6)); wall(x, L, y - 40, y + 40, k.ink); if (st.sys === 'ff') { x.save(); x.translate(2 * R, 0); x.scale(-1, 1); wall(x, R, y - 40, y + 40, k.ink); x.restore(); }
      let px = L; for (let i = 0; i < n; i++) { const X = L + gap * (i + 1) + phi[i] * amp * gap * 0.9; spring(x, px + (i ? 16 : 0), X - 16, y, 5, 8, k.pri); block(x, X, y, 32, 32, k.bg, k.ink, String(i + 1)); px = X; }
      if (st.sys === 'ff') spring(x, px + 16, R, y, 5, 8, k.pri);
      x.fillStyle = k.soft; x.font = '13px Inter,sans-serif'; x.textAlign = 'center'; x.fillText('motion is along the line of springs', W0 / 2, y + 70);
    }
    B.fit(); const F = frame(B, [-1.25, 1.25], [0.5, n + 0.5], { xl: 'mode-shape amplitude', yl: st.sys === 'bld' ? 'floor' : 'mass', ny: Math.min(n, 8) });
    const sty = [{ c: k.pri }, { c: k.acc, dash: [9, 5] }, { c: k.vio, dash: [2, 5] }, { c: k.ink, dash: [12, 4, 3, 4] }];
    E.phi.forEach((p, j) => { const s = sty[j % 4]; line(F, [[0, 0.5]].concat(p.map((v, i) => [v, i + 1])).concat(st.sys === 'ff' ? [[0, n + 0.5]] : []), { c: s.c, dash: s.dash, w: j === md ? 4 : 1.4 }); });
    E.phi[md].forEach((v, i) => dot(F, v, i + 1, 5, k.pri));
    const f = E.w.map(w => w / 2 / PI);
    out.textContent = `K φ = ω² M φ   ·   ${n} masses → ${n} natural frequencies and ${n} mode shapes\n` + f.map((v, i) => `  mode ${i + 1}:  f = ${fmt(v, 2)} Hz   (ω = ${fmt(E.w[i], 1)} rad/s)   φ = ${vstr(E.phi[i], 2)}`).join('\n') +
      `\nMode ${md + 1}: ${md === 0 ? 'all masses move together — the lowest, easiest way to vibrate' : 'has ' + md + ' sign change' + (md > 1 ? 's' : '') + ' (node' + (md > 1 ? 's' : '') + ') — higher mode, higher frequency'}.\nRule: keep forcing frequencies (running speed, gear mesh, wind gusts, footfall) away from every fᵢ.`;
  }
  anim(el, dt => { t += dt; draw(); });
  REDRAW.push(draw); solveM(); draw();
};

/* ================= DAY 6: stability of x′ = A x ================= */
W.phase = el => {
  lab(el);
  const PRE = { saddle: [1, 1, 4, -2], snode: [-2, 1, 0, -1], unode: [2, 0, 1, 1], ssink: [-0.5, -2, 2, -0.5], ssource: [0.3, -2, 2, 0.3], centre: [0, 1, -2, 0], smd: [0, 1, -4, -1], star: [-1, 0, 0, -1], degen: [-1, 1, 0, -1] };
  const st = form(el, [{ k: 'pre', t: 'sel', l: 'Example', o: [['smd', 'Spring–mass–damper (k = 4, c = 1)'], ['saddle', 'Saddle'], ['snode', 'Stable node'], ['unode', 'Unstable node'], ['ssink', 'Stable spiral'], ['ssource', 'Unstable spiral'], ['centre', 'Centre'], ['star', 'Star (repeated λ)'], ['degen', 'Degenerate node']], v: 'smd' },
  { k: 'a', t: 'range', l: 'a', min: -4, max: 4, s: 0.1, v: 0 }, { k: 'b', t: 'range', l: 'b', min: -4, max: 4, s: 0.1, v: 1 }, { k: 'c', t: 'range', l: 'c', min: -4, max: 4, s: 0.1, v: -4 }, { k: 'd', t: 'range', l: 'd', min: -4, max: 4, s: 0.1, v: -1 }], k => { if (k === 'pre') { const p = PRE[st.pre];['a', 'b', 'c', 'd'].forEach((n, i) => setSlider(st, n, p[i])); } extra = []; tt = 0; draw(); });
  const g = div(el, 'grid2'), A = canvas(g, 'sq', 'Phase portrait of x′ = Ax. Click to start a trajectory. Purple dotted = eigenvector lines.'), B = canvas(g, 'sq', 'Trace–determinant plane: where this matrix sits decides the behaviour.');
  const out = div(el, 'out'); let extra = [], tt = 0;
  A.c.addEventListener('pointerdown', e => { const f = A._f; if (!f) return; const p = A.pos(e); extra.push([f.ix(p[0]), f.iy(p[1])]); if (extra.length > 8) extra.shift(); draw(); });
  function draw() {
    const k = C(), M = [[st.a, st.b], [st.c, st.d]], f = (t, y) => LA.mv(M, y), ev = eig2(st.a, st.b, st.c, st.d), tr = st.a + st.d, det = st.a * st.d - st.b * st.c;
    A.fit(); const F = A._f = frame(A, [-3, 3], [-3, 3]); F.clip();
    for (let i = -3; i <= 3; i += 0.5) for (let j = -3; j <= 3; j += 0.5) { const d = LA.mv(M, [i, j]), L = Math.hypot(d[0], d[1]); if (L < 1e-9) continue; const s = 0.18 / L; line(F, [[i, j], [i + d[0] * s, j + d[1] * s]], { c: k.soft, w: 1 }); }
    if (!ev[0][1]) ev.forEach(z => { const l = z[0]; let v = Math.abs(st.b) > 1e-9 ? [st.b, l - st.a] : Math.abs(st.c) > 1e-9 ? [l - st.d, st.c] : null; if (!v) return; v = LA.unit(v); line(F, [[-5 * v[0], -5 * v[1]], [5 * v[0], 5 * v[1]]], { c: k.vio, w: 2.6, dash: [2, 5] }); });
    const starts = lin(0, 2 * PI, 12).slice(0, 12).map(a => [2.7 * Math.cos(a), 2.7 * Math.sin(a)]).concat(extra);
    const maxRe = Math.max(ev[0][0], ev[1][0]), T = 8;
    starts.forEach((s, i) => {
      const fw = solve(f, 0, s, T, 0.02, (t, y) => Math.abs(y[0]) > 8 || Math.abs(y[1]) > 8), bw = solve((t, y) => f(t, y).map(v => -v), 0, s, 3, 0.02, (t, y) => Math.abs(y[0]) > 8 || Math.abs(y[1]) > 8);
      const col = i >= 12 ? k.acc : k.pri; line(F, bw.map(p => [p[1], p[2]]), { c: col, w: 1.4, dash: [3, 4] }); line(F, fw.map(p => [p[1], p[2]]), { c: col, w: 2.2 });
      const q = fw[Math.min(fw.length - 1, Math.round(tt / 0.02))]; dot(F, q[1], q[2], 4.5, col);
    });
    dot(F, 0, 0, 4, k.ink); F.unclip();
    B.fit(); const G = frame(B, [-6, 6], [-4, 10], { xl: 'trace = λ₁ + λ₂', yl: 'det = λ₁·λ₂' }); G.clip();
    line(G, lin(-6, 6, 120).map(x => [x, x * x / 4]), { c: k.ink, w: 2 }); line(G, [[0, 0], [0, 10]], { c: k.ink, w: 2, dash: [6, 4] });
    const lb = (x, y, s) => label(G, x, y, s, k.soft, 'center'); lb(-3.6, 1.2, 'stable node'); lb(3.6, 1.2, 'unstable node'); lb(-1.8, 7, 'stable spiral'); lb(1.8, 7, 'unstable spiral'); lb(0, -2.4, 'saddle (unstable)'); lb(0.55, 9.2, 'centre'); lb(4.4, 5.6, 'det = tr²/4');
    dot(G, tr, det, 8, k.acc); G.unclip();
    let type; const disc = tr * tr / 4 - det;
    if (det < 0) type = 'SADDLE — one eigenvalue positive, one negative: unstable'; else if (Math.abs(det) < 1e-9) type = 'a zero eigenvalue: a whole line of equilibria'; else if (disc < -1e-9) type = tr < -1e-9 ? 'STABLE SPIRAL — complex λ with negative real part: decaying oscillation' : tr > 1e-9 ? 'UNSTABLE SPIRAL — complex λ with positive real part: growing oscillation (flutter, whirl)' : 'CENTRE — pure imaginary λ: undamped oscillation forever'; else type = tr < 0 ? (Math.abs(disc) < 1e-9 ? 'STABLE star / degenerate node (repeated λ)' : 'STABLE NODE — both λ negative: decays without oscillating') : (Math.abs(disc) < 1e-9 ? 'UNSTABLE star / degenerate node' : 'UNSTABLE NODE — both λ positive');
    let s = `x′ = Ax,  A = [${fmt(st.a, 1)} ${fmt(st.b, 1)}; ${fmt(st.c, 1)} ${fmt(st.d, 1)}]   ·   trace = ${fmt(tr, 2)},  det = ${fmt(det, 2)}\nλ = ${ev.map(lamStr).join(',  ')}\n${type}\n`;
    if (ev[0][1]) { const wd = Math.abs(ev[0][1]), wn = Math.sqrt(Math.max(det, 0)); s += `Oscillation: ω_d = ${fmt(wd, 3)} rad/s (period ${fmt(2 * PI / wd, 2)} s)` + (det > 0 ? `,  ω_n = √det = ${fmt(wn, 3)},  damping ratio ζ = −trace/(2ω_n) = ${fmt(-tr / (2 * wn), 3)}` : '') + (Math.abs(ev[0][0]) > 1e-9 ? `,  envelope time constant ${fmt(1 / Math.abs(ev[0][0]), 2)} s` : ''); }
    else s += 'Solution x(t) = c₁ e^(λ₁t) v₁ + c₂ e^(λ₂t) v₂ — each eigen-direction grows or decays on its own' + (ev.every(z => z[0] < 0) ? `; slowest time constant ${fmt(1 / Math.min(...ev.map(z => -z[0])), 2)} s.` : '.');
    out.textContent = s + '\nRule: stable ⇔ every eigenvalue has negative real part ⇔ (for 2 × 2) trace < 0 and det > 0.';
  }
  anim(el, dt => { tt += dt * 1.2; if (tt > 8) tt = 0; draw(); });
  REDRAW.push(draw); draw();
};

/* ================= DAY 7: data — PCA and SVD ================= */
W.pca = el => {
  lab(el);
  const st = form(el, [{ k: 'ds', t: 'sel', l: 'Data', o: [['cloud', 'Correlated measurements (Gaussian cloud)'], ['orbit', 'Shaft orbit from two proximity probes']], v: 'cloud' }, { k: 'n', t: 'range', l: 'Points', min: 30, max: 600, s: 10, v: 250 },
  { k: 's1', t: 'range', l: 'Spread along the main axis', min: 0.2, max: 3, s: 0.05, v: 2 }, { k: 's2', t: 'range', l: 'Spread across it', min: 0.05, max: 2, s: 0.05, v: 0.5 }, { k: 'ang', t: 'range', l: 'True angle', min: 0, max: 180, s: 1, v: 30, u: '°' }], () => { gen(); draw(); });
  const bt = document.createElement('button'); bt.textContent = '🎲 New sample'; bt.onclick = () => { seed++; gen(); draw(); }; $('.ctl', el).appendChild(bt);
  const g = div(el, 'grid2'), A = canvas(g, 'sq', 'Data, the 2σ ellipse of the covariance matrix (purple dotted) and the principal axes: PC1 blue, PC2 orange dashed'), B = canvas(g, 'sq', 'The same data in principal-component coordinates: correlation removed');
  const out = div(el, 'out'); let seed = 3, X = [];
  function gen() { const r = rng(seed * 7919), a = rad(st.ang), c = Math.cos(a), s = Math.sin(a); X = []; for (let i = 0; i < st.n; i++) { let u, w; if (st.ds === 'orbit') { const t = r() * 2 * PI; u = st.s1 * Math.cos(t) + 0.08 * gauss(r); w = st.s2 * Math.sin(t) + 0.08 * gauss(r); } else { u = st.s1 * gauss(r); w = st.s2 * gauss(r); } X.push([0.4 + u * c - w * s, -0.2 + u * s + w * c]); } }
  function draw() {
    const k = C(), n = X.length, mu = [0, 1].map(j => X.reduce((a, p) => a + p[j], 0) / n), D = X.map(p => [p[0] - mu[0], p[1] - mu[1]]);
    const Cv = [[0, 0], [0, 0]]; D.forEach(p => { for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) Cv[i][j] += p[i] * p[j] / (n - 1); });
    const J = LA.jacobi(Cv), l1 = J.vals[1], l2 = J.vals[0], v1 = J.vecs[1], v2 = [-v1[1], v1[0]], tot = l1 + l2;
    A.fit(); const F = frame(A, [-5, 5], [-5, 5]); F.clip();
    X.forEach(p => dot(F, p[0], p[1], 2.6, k.soft, null));
    line(F, lin(0, 2 * PI, 120).map(t => [mu[0] + 2 * Math.sqrt(l1) * Math.cos(t) * v1[0] + 2 * Math.sqrt(l2) * Math.sin(t) * v2[0], mu[1] + 2 * Math.sqrt(l1) * Math.cos(t) * v1[1] + 2 * Math.sqrt(l2) * Math.sin(t) * v2[1]]), { c: k.vio, w: 2.4, dash: [2, 5] });
    vec(F, mu[0], mu[1], mu[0] + 2 * Math.sqrt(l1) * v1[0], mu[1] + 2 * Math.sqrt(l1) * v1[1], k.pri, 3.4); vec(F, mu[0], mu[1], mu[0] + 2 * Math.sqrt(l2) * v2[0], mu[1] + 2 * Math.sqrt(l2) * v2[1], k.acc, 3, [8, 4]);
    label(F, mu[0] + 2 * Math.sqrt(l1) * v1[0], mu[1] + 2 * Math.sqrt(l1) * v1[1], 'PC1', k.pri, 'left', 6, -6); F.unclip();
    B.fit(); const G = frame(B, [-5, 5], [-5, 5], { xl: 'PC1 score', yl: 'PC2 score' }); G.clip(); D.forEach(p => dot(G, LA.dot(p, v1), LA.dot(p, v2), 2.6, k.pri, null)); G.unclip();
    const fa = deg(Math.atan2(v1[1], v1[0])), fa2 = ((fa % 180) + 180) % 180;
    out.textContent = `Covariance matrix  C = [${fmt(Cv[0][0], 3)} ${fmt(Cv[0][1], 3)}; ${fmt(Cv[1][0], 3)} ${fmt(Cv[1][1], 3)}]   (symmetric → real eigenvalues, perpendicular eigenvectors)\nλ₁ = ${fmt(l1, 3)} (variance along PC1),  λ₂ = ${fmt(l2, 3)}\nPC1 direction ${vstr(v1, 3)} → ${fmt(fa2, 1)}°   (true axis ${st.ang}°)\nPC1 explains ${fmt(100 * l1 / tot, 1)} % of the variance` + (l1 / tot > 0.9 ? ' → one number per sample (the PC1 score) keeps almost everything: 2-D data compressed to 1-D.' : ' → both directions matter here.') +
      (st.ds === 'orbit' ? `\nRotor view: PC1 is the major axis of the orbit — the direction of maximum vibration. √(2λ₁) ≈ ${fmt(Math.sqrt(2 * l1), 2)} ≈ semi-major axis, ellipticity ${fmt(Math.sqrt(l2 / l1), 2)} (1 = circular, 0 = flat; a flat orbit hints at misalignment or anisotropic supports).` : '');
  }
  REDRAW.push(draw); gen(); draw();
};

W.svd = el => {
  lab(el);
  const N = 64;
  const st = form(el, [{ k: 'img', t: 'sel', l: 'Image', o: [['gear', 'Gear'], ['text', 'Text and shapes'], ['wave', 'Smooth field (temperature map)'], ['noise', 'Random noise']], v: 'gear' }, { k: 'r', t: 'range', l: 'Keep rank k', min: 1, max: N, s: 1, v: 8 }], kk => { if (kk === 'img') build(); draw(); });
  const g = div(el, 'grid3'), A = canvas(g, 'sq', 'Original 64 × 64 image'), B = canvas(g, 'sq', 'Rank-k approximation Σ σᵢ uᵢ vᵢᵀ'), Cc = canvas(g, 'sq', 'Singular values σᵢ (log scale); orange = the ones kept');
  const out = div(el, 'out'); let IM, S;
  function build() {
    const c = document.createElement('canvas'); c.width = c.height = N; const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, N, N); x.fillStyle = '#000'; x.strokeStyle = '#000';
    if (st.img === 'gear') { x.beginPath(); for (let i = 0; i <= 360; i++) { const a = rad(i), r = 22 + 5 * (Math.sin(14 * a) > 0 ? 1 : 0); x.lineTo(32 + r * Math.cos(a), 32 + r * Math.sin(a)); } x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.arc(32, 32, 8, 0, 2 * PI); x.fill(); x.fillRect(30, 21, 4, 4); }
    else if (st.img === 'text') { x.font = 'bold 34px serif'; x.textAlign = 'center'; x.fillText('λ', 20, 38); x.lineWidth = 4; x.strokeRect(36, 8, 22, 22); x.beginPath(); x.arc(47, 47, 11, 0, 2 * PI); x.stroke(); x.fillRect(4, 52, 30, 6); }
    const d = x.getImageData(0, 0, N, N).data; IM = [];
    for (let i = 0; i < N; i++) { IM.push([]); for (let j = 0; j < N; j++) { let v = 1 - d[(i * N + j) * 4] / 255; if (st.img === 'wave') v = 0.5 + 0.25 * Math.sin(j / 9) * Math.cos(i / 13) + 0.2 * Math.exp(-((i - 40) ** 2 + (j - 20) ** 2) / 120); if (st.img === 'noise') v = rng(i * N + j + 1)(); IM[i].push(v); } }
    const AtA = LA.zeros(N); for (let i = 0; i < N; i++) for (let j = i; j < N; j++) { let s = 0; for (let r = 0; r < N; r++) s += IM[r][i] * IM[r][j]; AtA[i][j] = AtA[j][i] = s; }
    const J = LA.jacobi(AtA), ord = J.vals.map((_, i) => i).reverse();
    S = ord.map(i => { const sg = Math.sqrt(Math.max(J.vals[i], 0)), v = J.vecs[i], u = IM.map(r => LA.dot(r, v) / (sg || 1)); return { s: sg, u, v }; });
  }
  function paint(cv, M) { cv.fit(); const x = cv.ctx, s = Math.min(cv.w, cv.h) / N, ox = (cv.w - s * N) / 2, oy = (cv.h - s * N) / 2, k = C(); x.fillStyle = k.card; x.fillRect(0, 0, cv.w, cv.h); for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { const g = Math.round(255 * (1 - clamp(M[i][j], 0, 1))); x.fillStyle = `rgb(${g},${g},${g})`; x.fillRect(ox + j * s, oy + i * s, s + 0.6, s + 0.6); } }
  function draw() {
    const k = C(), r = st.r, R = LA.zeros(N); for (let q = 0; q < r; q++) { const { s, u, v } = S[q]; for (let i = 0; i < N; i++) { const su = s * u[i]; for (let j = 0; j < N; j++) R[i][j] += su * v[j]; } }
    paint(A, IM); paint(B, R);
    Cc.fit(); const sv = S.map(o => Math.log10(Math.max(o.s, 1e-6))), F = frame(Cc, [0, N + 1], niceRange(sv.filter(v => v > -5)), { xl: 'i', yl: 'log₁₀ σᵢ' }); F.clip(); line(F, sv.map((v, i) => [i + 1, v]), { c: k.pri, w: 2 }); sv.slice(0, r).forEach((v, i) => dot(F, i + 1, v, 3.5, k.acc)); F.unclip();
    const e = S.reduce((a, o) => a + o.s * o.s, 0), ek = S.slice(0, r).reduce((a, o) => a + o.s * o.s, 0); let err = 0, nrm = 0; for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { err += (IM[i][j] - R[i][j]) ** 2; nrm += IM[i][j] ** 2; }
    out.textContent = `A = U Σ Vᵀ.  The σᵢ are the square roots of the eigenvalues of AᵀA; the vᵢ are its eigenvectors (and the uᵢ those of AAᵀ).\nRank ${r}: store ${r} × (64 + 64 + 1) = ${r * 129} numbers instead of 64 × 64 = 4096  → ${fmt(100 * r * 129 / 4096, 1)} % of the original\nEnergy kept Σσᵢ² (i ≤ k) / Σσᵢ² = ${fmt(100 * ek / e, 2)} %   ·   relative error ‖A − A_k‖/‖A‖ = ${fmt(100 * Math.sqrt(err / nrm), 2)} %\nσ₁ = ${fmt(S[0].s, 2)}, σ₂ = ${fmt(S[1].s, 2)}, σ₁₀ = ${fmt(S[9].s, 3)}, σ₃₀ = ${fmt(S[29].s, 3)}` + (st.img === 'noise' ? '\nNoise has no structure: the σᵢ fall slowly and a low rank keeps little. Real images (and real data) are compressible because their σᵢ fall fast.' : '');
  }
  REDRAW.push(draw); build(); draw();
};

/* ================= DAY 8: networks — PageRank and spectral clustering ================= */
W.pagerank = el => {
  lab(el);
  const POS = [[0, 1.7], [1.6, 0.9], [1.5, -1], [0, -1.8], [-1.5, -1], [-1.6, 0.9], [0, 0]], NM = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const PRE = { web: [[0, 1], [0, 6], [1, 2], [1, 6], [2, 6], [3, 2], [3, 4], [4, 6], [5, 0], [5, 4], [6, 0], [6, 3]], farm: [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [0, 6], [6, 1]], dangle: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]], ring: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [6, 0]] };
  const st = form(el, [{ k: 'pre', t: 'sel', l: 'Network', o: [['web', 'A small web'], ['farm', 'Link farm (everyone points to A)'], ['dangle', 'A chain with a dead end'], ['ring', 'A ring plus one page']], v: 'web' }, { k: 'd', t: 'range', l: 'Damping d', min: 0.5, max: 0.99, s: 0.01, v: 0.85 }], kk => { if (kk === 'pre') E = PRE[st.pre].map(e => e.slice()); reset(); });
  const g = div(el, 'grid2'), A = canvas(g, 'sq', 'Click a page, then another, to add or remove a link between them. Circle size ∝ rank.'), B = canvas(g, 'sq', 'Current rank vector (bars) and the exact eigenvector (dashed)');
  const out = div(el, 'out'); let E = PRE.web.map(e => e.slice()), r, it, sel = -1, resid = 0;
  A.c.addEventListener('pointerdown', e => { const f = A._f; if (!f) return; const p = A.pos(e), X = f.ix(p[0]), Y = f.iy(p[1]); const i = POS.findIndex(q => Math.hypot(q[0] - X, q[1] - Y) < 0.35); if (i < 0) { sel = -1; draw(); return; } if (sel < 0) sel = i; else { if (sel !== i) { const j = E.findIndex(e => e[0] === sel && e[1] === i); if (j >= 0) E.splice(j, 1); else E.push([sel, i]); } sel = -1; reset(); return; } draw(); });
  function G() { const n = 7, M = LA.zeros(n), out = Array(n).fill(0); E.forEach(e => out[e[0]]++); E.forEach(e => M[e[1]][e[0]] += 1 / out[e[0]]); for (let j = 0; j < n; j++) if (!out[j]) for (let i = 0; i < n; i++) M[i][j] = 1 / n; return M.map(row => row.map(v => st.d * v + (1 - st.d) / n)); }
  function reset() { r = Array(7).fill(1 / 7); it = 0; resid = 0; draw(); }
  function step() { const r2 = LA.mv(G(), r); resid = r2.reduce((a, v, i) => a + Math.abs(v - r[i]), 0); r = r2; it++; draw(); }
  function draw() {
    const k = C(), Gm = G(), ev = LA.eig(Gm) || [], exact = (() => { let v = LA.eigvec(Gm, 1); const s = v.reduce((a, b) => a + b, 0); return v.map(t => t / s); })();
    A.fit(); const F = A._f = frame(A, [-2.4, 2.4], [-2.4, 2.4], { l: 10, r: 10, t: 10, b: 10, nx: 1, ny: 1 }); const x = F.x;
    E.forEach(([a, b]) => { const p = POS[a], q = POS[b], d = Math.hypot(q[0] - p[0], q[1] - p[1]), ux = (q[0] - p[0]) / d, uy = (q[1] - p[1]) / d, off = E.some(e => e[0] === b && e[1] === a) ? 0.06 : 0; const ox = -uy * off, oy = ux * off, rr = 0.16 + 0.62 * Math.sqrt(r[b]); vec(F, p[0] + ux * 0.2 + ox, p[1] + uy * 0.2 + oy, q[0] - ux * rr + ox, q[1] - uy * rr + oy, k.soft, 1.6); });
    POS.forEach((p, i) => { const rr = 0.16 + 0.62 * Math.sqrt(r[i]); x.beginPath(); x.arc(F.X(p[0]), F.Y(p[1]), Math.abs(F.X(rr) - F.X(0)), 0, 2 * PI); x.fillStyle = k.pri; x.globalAlpha = 0.85; x.fill(); x.globalAlpha = 1; x.lineWidth = i === sel ? 5 : 2; x.strokeStyle = i === sel ? k.acc : k.card; x.stroke(); x.fillStyle = '#fff'; x.font = '700 15px Inter,sans-serif'; x.textAlign = 'center'; x.fillText(NM[i], F.X(p[0]), F.Y(p[1]) + 5); });
    B.fit(); const H = frame(B, [0, 7], [0, Math.max(...r, ...exact) * 1.2], { nx: 7 }); bars(H, r); exact.forEach((t, i) => line(H, [[i + 0.1, t], [i + 0.9, t]], { c: k.acc, w: 3, dash: [7, 4] })); NM.forEach((s, i) => label(H, i + 0.5, 0, s, k.ink, 'center', 0, 26));
    const l2 = ev.map(z => Math.hypot(z[0], z[1])).sort((a, b) => b - a)[1] || 0, order = r.map((v, i) => i).sort((a, b) => r[b] - r[a]);
    out.textContent = `Google matrix  G = d·M + (1 − d)/n · 𝟙   (M: column j shares page j's vote equally among its links; dead ends vote for everyone)\nIteration ${it}:  r ← G r   ·   change ${it ? resid.toExponential(2) : '—'}\nRanking: ${order.map(i => NM[i] + ' ' + fmt(100 * r[i], 1) + ' %').join(' > ')}\nλ₁ = 1 (r is its eigenvector) · |λ₂| = ${fmt(l2, 3)} ≤ d = ${st.d} → error shrinks ×${fmt(l2, 2)} per iteration; about ${l2 > 0 ? fmt(Math.log(1e-6) / Math.log(l2), 0) : 1} iterations for 6 digits.\nS = one iteration, P = run, X = pause.` + (sel >= 0 ? `\nPage ${NM[sel]} selected — click a second page to toggle the link ${NM[sel]} → ?` : '');
  }
  const a = anim(el, (() => { let acc = 0; return dt => { acc += dt; if (acc > 0.4) { acc = 0; step(); } }; })()); a.step = () => step();
  REDRAW.push(draw); reset();
};

W.fiedler = el => {
  lab(el);
  const n = 24;
  const st = form(el, [{ k: 'pin', t: 'range', l: 'Link probability inside a group', min: 0.1, max: 0.9, s: 0.01, v: 0.45 }, { k: 'pout', t: 'range', l: 'between groups', min: 0, max: 0.5, s: 0.01, v: 0.05 }, { k: 'lay', t: 'seg', l: 'Layout', o: [['c', 'mixed circle'], ['s', 'spectral (v₂, v₃)']], v: 'c' }], kk => { if (kk !== 'lay') gen(); else mix = st.lay === 's' ? 1 : 0; tgt = 1 - mix; draw(); });
  const bt = document.createElement('button'); bt.textContent = '🎲 New network'; bt.onclick = () => { seed++; gen(); draw(); }; $('.ctl', el).appendChild(bt);
  const g = div(el, 'grid2'), A = canvas(g, 'sq', 'Nodes coloured by the SIGN of the Fiedler vector v₂: blue circles vs orange squares. Press P to morph into the spectral layout.'), B = canvas(g, 'sq', 'Smallest eigenvalues of the graph Laplacian L = D − A');
  const out = div(el, 'out'); let seed = 5, Adj, Ls, mix = 0, tgt = 1, truth, ord;
  function gen() {
    const r = rng(seed * 104729); truth = Array.from({ length: n }, (_, i) => i < n / 2 ? 0 : 1); Adj = LA.zeros(n);
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (r() < (truth[i] === truth[j] ? st.pin : st.pout)) Adj[i][j] = Adj[j][i] = 1;
    const L = Adj.map((row, i) => row.map((v, j) => i === j ? row.reduce((a, b) => a + b, 0) : -v)); Ls = LA.jacobi(L);
    ord = Array.from({ length: n }, (_, i) => i); for (let i = n - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [ord[i], ord[j]] = [ord[j], ord[i]]; }
  }
  function draw() {
    const k = C(), v2 = Ls.vecs[1], v3 = Ls.vecs[2], s2 = Math.max(...v2.map(Math.abs)) || 1, s3 = Math.max(...v3.map(Math.abs)) || 1;
    const pos = Array.from({ length: n }, (_, i) => { const a = 2 * PI * ord.indexOf(i) / n, c0 = [1.8 * Math.cos(a), 1.8 * Math.sin(a)], s0 = [1.8 * v2[i] / s2, 1.8 * v3[i] / s3]; return [c0[0] + (s0[0] - c0[0]) * mix, c0[1] + (s0[1] - c0[1]) * mix]; });
    A.fit(); const F = frame(A, [-2.3, 2.3], [-2.3, 2.3], { l: 10, r: 10, t: 10, b: 10, nx: 1, ny: 1 }), x = F.x;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (Adj[i][j]) line(F, [pos[i], pos[j]], { c: k.soft, w: (v2[i] > 0) !== (v2[j] > 0) ? 2.2 : 0.9, dash: (v2[i] > 0) !== (v2[j] > 0) ? [4, 3] : [] });
    pos.forEach((p, i) => { const X = F.X(p[0]), Y = F.Y(p[1]); x.lineWidth = 2; x.strokeStyle = k.card; if (v2[i] > 0) { x.fillStyle = k.pri; x.beginPath(); x.arc(X, Y, 8, 0, 2 * PI); x.fill(); x.stroke(); } else { x.fillStyle = k.acc; x.fillRect(X - 8, Y - 8, 16, 16); x.strokeRect(X - 8, Y - 8, 16, 16); } });
    const m = 10, vals = Ls.vals.slice(0, m); B.fit(); const G = frame(B, [0, m], [0, Math.max(...vals) * 1.15 || 1], { xl: 'index i (λ₁ = 0 always)', nx: m }); bars(G, vals, { cols: vals.map((_, i) => i === 1 ? k.acc : k.pri) }); label(G, 1.5, vals[1], 'λ₂', k.acc2, 'center', 0, -8);
    const pred = v2.map(v => v > 0 ? 1 : 0), agree = pred.reduce((a, p, i) => a + (p === truth[i] ? 1 : 0), 0), acc = Math.max(agree, n - agree), cut = (() => { let c = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (Adj[i][j] && pred[i] !== pred[j]) c++; return c; })();
    const comps = Ls.vals.filter(v => v < 1e-8).length;
    out.textContent = `Graph Laplacian L = D − A (degree on the diagonal, −1 for each link). Symmetric, eigenvalues ≥ 0.\nλ₁ = ${fmt(Ls.vals[0], 4)} (always 0, eigenvector all-ones)   ·   λ₂ = ${fmt(Ls.vals[1], 4)} = algebraic connectivity\n` + (comps > 1 ? `${comps} zero eigenvalues → the network is in ${comps} disconnected pieces.\n` : '') + `Split by the sign of v₂: ${pred.filter(p => p).length} + ${pred.filter(p => !p).length} nodes, cutting ${cut} links · matches the hidden groups for ${acc} of ${n} nodes (${fmt(100 * acc / n, 0)} %)\nSmall λ₂ = a weak bottleneck between two well-knit groups — exactly what the Fiedler vector finds.`;
  }
  anim(el, dt => { mix += Math.sign(tgt - mix) * dt * 0.5; if ((tgt === 1 && mix >= 1) || (tgt === 0 && mix <= 0)) { mix = tgt; tgt = 1 - tgt; } draw(); });
  REDRAW.push(draw); gen(); draw();
};

/* ================= DAY 9: continuous systems — buckling, strings and quantum states ================= */
W.fdmodes = el => {
  lab(el);
  const PB = {
    string: { t: 'Guitar string (L = 0.65 m, T = 70 N, μ = 0.4 g/m)', a: 0, b: 0.65, bc: ['D', 'D'], V: null, c: 1, ex: n => (n * PI / 0.65) ** 2, q: l => (Math.sqrt(l * 70 / 0.0004) / 2 / PI).toFixed(1), ql: 'f, Hz' },
    pin: { t: 'Pinned–pinned column (steel rod Ø20 mm, L = 1 m)', a: 0, b: 1, bc: ['D', 'D'], V: null, c: 1, ex: n => (n * PI) ** 2, q: l => (l * 1570.8 / 1000).toFixed(2), ql: 'P, kN' },
    cant: { t: 'Cantilever column (free top), same rod', a: 0, b: 1, bc: ['N', 'D'], V: null, c: 1, ex: n => ((2 * n - 1) * PI / 2) ** 2, q: l => (l * 1570.8 / 1000).toFixed(2), ql: 'P, kN', flip: true },
    box: { t: 'Particle in a box (ħ = m = L = 1)', a: 0, b: 1, bc: ['D', 'D'], V: null, c: 0.5, ex: n => n * n * PI * PI / 2, q: l => (l * 2 / (PI * PI) * 0.376).toFixed(3), ql: 'eV (1 nm)', qm: true },
    ho: { t: 'Harmonic oscillator, V = x²/2 (molecule bond)', a: -6, b: 6, bc: ['D', 'D'], V: x => x * x / 2, c: 0.5, ex: n => n - 0.5, q: l => l.toFixed(4), ql: 'E/ħω', qm: true },
    dw: { t: 'Double well, V = (x² − 3)²/2 (ammonia inversion)', a: -4.5, b: 4.5, bc: ['D', 'D'], V: x => (x * x - 3) ** 2 / 2, c: 0.5, ex: null, q: l => l.toFixed(4), ql: 'E', qm: true }
  };
  const st = form(el, [{ k: 'p', t: 'sel', l: 'Problem', o: Object.keys(PB).map(k => [k, PB[k].t]), v: 'pin' }, { k: 'n', t: 'range', l: 'Grid points N', min: 4, max: 80, s: 1, v: 30 }], () => draw());
  const g = div(el, 'grid2'), A = canvas(g, 'sq', 'First four eigenvectors of the finite-difference matrix = mode shapes / wavefunctions'), out = div(g, 'out');
  const lg = div(el, 'legend');
  function draw() {
    const k = C(), P = PB[st.p], N = st.n, h = (P.b - P.a) / (N + 1 - (P.bc[0] === 'N' ? 1 : 0));
    const x0 = P.bc[0] === 'N' ? P.a : P.a + h, xs = Array.from({ length: N }, (_, i) => x0 + i * h), M = LA.zeros(N);
    for (let i = 0; i < N; i++) { M[i][i] = 2 * P.c / h / h + (P.V ? P.V(xs[i]) : 0); if (i) M[i][i - 1] = M[i - 1][i] = -P.c / h / h; }
    if (P.bc[0] === 'N') { M[0][1] = M[1][0] = -Math.SQRT2 * P.c / h / h; }   // ghost-point Neumann end, symmetrised
    const J = LA.jacobi(M); let modes = J.vecs.slice(0, 4).map(v => { const w = v.slice(); if (P.bc[0] === 'N') w[0] *= Math.SQRT2; return w; });
    const full = modes.map(w => { const pts = (P.bc[0] === 'N' ? [] : [[P.a, 0]]).concat(w.map((v, i) => [xs[i], v])).concat([[P.b, 0]]); const mx = Math.max(...pts.map(p => Math.abs(p[1]))) || 1; return pts.map(p => [p[0], p[1] / mx]); });
    A.fit(); const sty = [{ c: k.pri }, { c: k.acc, dash: [9, 5] }, { c: k.vio, dash: [2, 5] }, { c: k.ink, dash: [12, 4, 3, 4] }];
    if (P.qm) {
      const E = J.vals.slice(0, 4), sp = (E[3] - E[0]) / 3 || 1, ylo = Math.min(0, E[0] - sp), yhi = E[3] + sp * 0.9;
      const F = frame(A, [P.a, P.b], [ylo, yhi], { xl: 'x', yl: 'energy' }); F.clip();
      if (P.V) line(F, lin(P.a, P.b, 200).map(x => [x, P.V(x)]), { c: k.soft, w: 2.4 }); else { line(F, [[P.a, ylo], [P.a, yhi]], { c: k.soft, w: 4 }); line(F, [[P.b, ylo], [P.b, yhi]], { c: k.soft, w: 4 }); }
      full.forEach((pts, j) => { line(F, [[P.a, E[j]], [P.b, E[j]]], { c: k.rule, w: 1 }); line(F, pts.map(p => [p[0], E[j] + p[1] * sp * 0.42]), { c: sty[j].c, w: 2.6, dash: sty[j].dash }); });
      F.unclip();
    } else {
      const F = frame(A, P.flip ? [-4.6, 4.6] : [P.a, P.b], P.flip ? [P.a, P.b] : [-4.6, 4.6], P.flip ? { xl: 'lateral deflection (offset per mode)', yl: 'height x' } : { xl: 'x, m', yl: 'mode (offset)' }); F.clip();
      full.forEach((pts, j) => { const off = 3.3 - j * 2.2; if (P.flip) { const w0 = pts[0][1]; line(F, pts.map(p => [off - 1.2 + (w0 - p[1]) * 0.55 * Math.sign(w0 || 1), p[0]]), { c: sty[j].c, w: 2.6, dash: sty[j].dash }); } else line(F, pts.map(p => [p[0], off + p[1] * 0.95]), { c: sty[j].c, w: 2.6, dash: sty[j].dash }); });
      F.unclip();
    }
    legend(lg, [['', 'mode 1'], ['o dash', 'mode 2'], ['v', 'mode 3'], ['k dash', 'mode 4']]);
    let s = `${P.t}\n${P.qm ? '−(1/2)ψ″ + V(x)ψ = Eψ' : '−y″ = λy  (λ = ω²μ/T for the string, P/EI for the column)'}  →  N × N tridiagonal matrix (h = ${fmt(h, 4)}), its eigenvalues ≈ the λ of the continuous problem\n\n n   numerical    exact     error   ${P.ql}\n`;
    for (let j = 0; j < 4; j++) { const l = J.vals[j], e = P.ex ? P.ex(j + 1) : NaN; const p6 = v => (+v).toPrecision(6); s += ` ${j + 1}  ${p6(l).padStart(10)} ${P.ex ? p6(e).padStart(10) : '         —'} ${P.ex ? ((100 * (l - e) / e).toFixed(2) + ' %').padStart(9) : '         '}   ${P.q(l)}\n`; }
    if (st.p === 'dw') s += `\nThe barrier is 4.5 high; the two lowest levels sit far below it yet are split by only E₂ − E₁ = ${fmt(J.vals[1] - J.vals[0], 4)} (try N = 80): they are the symmetric and antisymmetric mixtures of "left" and "right", and the tiny gap is the tunnelling rate — in ammonia, the 23.87 GHz maser line.`;
    else if (st.p === 'cant') s += `\nCantilever: P₁ = π²EI/(4L²) — a quarter of the pinned value (effective length 2L).`;
    else s += `\nDouble N and the error falls about four times: the error of the 3-point difference is O(h²). Higher modes need more points per wave.`;
    out.textContent = s;
  }
  REDRAW.push(draw); draw();
};

/* ================= DAY 10: computing eigenvalues ================= */
W.power = el => {
  lab(el);
  const PRE = [['sym', 'Symmetric [4 1 0; 1 3 1; 0 1 2]', [[4, 1, 0], [1, 3, 1], [0, 1, 2]]], ['close', 'Two close eigenvalues (5.12 and 4.68)', [[5, 0.2, 0.1], [0.2, 4.8, 0], [0.1, 0, 1]]], ['chain', 'Spring chain [2 −1 0; −1 2 −1; 0 −1 2]', [[2, -1, 0], [-1, 2, -1], [0, -1, 2]]], ['gen', 'Non-symmetric', [[2, 1, 1], [0, 3, 1], [1, 0, 4]]]];
  const st = form(el, [{ k: 'pre', t: 'sel', l: 'Matrix', o: PRE.map(p => [p[0], p[1]]), v: 'sym' }, { k: 'meth', t: 'seg', l: 'Method', o: [['pow', 'Power'], ['inv', 'Inverse (shift σ)'], ['ray', 'Rayleigh quotient']], v: 'pow' }, { k: 'sig', t: 'range', l: 'Shift σ', min: -1, max: 6, s: 0.1, v: 1.5 }], kk => { if (kk === 'pre') m.set(PRE.find(p => p[0] === st.pre)[2]); else reset(); });
  const row = div(el, 'row'), left = div(row); const m = matIn(left, PRE[0][2], () => reset()); div(left, 'hint', 'S = one iteration · P = run · X = pause. Start vector (1, 1, 1).');
  const cv = canvas(row, 'plot', 'log₁₀ |error in λ| against iteration — straight line = linear convergence; the cliff = Rayleigh’s cubic convergence');
  const out = div(el, 'out'); let v, it, hist, est, prev = null, runMeth = 'pow';
  function truth() { return (LA.eig(m.M) || []).filter(z => !z[1]).map(z => z[0]); }
  function reset() { if (hist && hist.length > 1) prev = { h: hist, meth: runMeth }; runMeth = st.meth; v = LA.unit([1, 1, 1]); it = 0; hist = []; est = NaN; draw(); }
  function step() {
    const A = m.M; let w;
    if (st.meth === 'pow') { w = LA.mv(A, v); }
    else if (st.meth === 'inv') { w = LA.solve(A.map((r, i) => r.map((x, j) => x - (i === j ? st.sig : 0))), v); }
    else { const mu = it ? est : st.sig; w = LA.solve(A.map((r, i) => r.map((x, j) => x - (i === j ? mu : 0))), v); }
    v = LA.unit(w); est = LA.dot(v, LA.mv(A, v)); it++;
    const T = truth(), tgt = T.length ? T.reduce((b, t) => Math.abs(t - est) < Math.abs(b - est) ? t : b, T[0]) : NaN; hist.push([it, Math.log10(Math.max(Math.abs(est - tgt), 1e-16))]); draw();
  }
  function draw() {
    const k = C(), T = truth().sort((a, b) => Math.abs(b) - Math.abs(a));
    cv.fit(); const F = frame(cv, [0, Math.max(12, it)], [-16, 1], { xl: 'iteration', yl: 'log₁₀ error' }); F.clip(); if (prev) line(F, prev.h, { c: k.acc, w: 2, dash: [8, 5] }); line(F, hist, { c: k.pri, w: 2.8 }); hist.forEach(p => dot(F, p[0], p[1], 3.5, k.pri)); F.unclip();
    const ord = T.slice().sort((a, b) => Math.abs(b) - Math.abs(a)), r = ord.length > 1 ? Math.abs(ord[1] / ord[0]) : 0;
    const near = T.slice().sort((a, b) => Math.abs(a - st.sig) - Math.abs(b - st.sig)), ri = near.length > 1 ? Math.abs((near[0] - st.sig) / (near[1] - st.sig)) : 0;
    const name = { pow: 'Power iteration: v ← Av/|Av| → the eigenvalue of LARGEST magnitude', inv: `Inverse iteration: solve (A − σI)w = v → the eigenvalue NEAREST σ = ${st.sig}`, ray: 'Rayleigh quotient iteration: σ updated to vᵀAv every step' }[st.meth];
    out.textContent = `${name}\nIteration ${it}:  v = ${vstr(v, 5)}   estimate λ ≈ vᵀAv = ${it ? fmt(est, 10) : '—'}\nTrue eigenvalues: ${T.map(t => fmt(t, 6)).join(', ')}\n` + (st.meth === 'pow' ? `Convergence factor |λ₂/λ₁| = ${fmt(r, 3)} per step (for λ from the Rayleigh quotient on a symmetric matrix the error falls as its square).` : st.meth === 'inv' ? `Convergence factor |λ_near − σ| / |λ_next − σ| = ${fmt(ri, 3)} — a shift close to the eigenvalue converges fast.` : 'Each step the shift jumps closer: digits roughly triple per step for symmetric matrices.') + (prev ? `\nDashed orange = the previous run (${{ pow: 'power', inv: 'inverse', ray: 'Rayleigh' }[prev.meth]}).` : '');
  }
  const a = anim(el, (() => { let acc = 0; return dt => { acc += dt; if (acc > 0.5 && it < 60) { acc = 0; step(); } }; })()); a.step = () => step();
  REDRAW.push(draw); reset();
};

W.gersh = el => {
  lab(el);
  const PRE = { 3: [['dd', 'Diagonally dominant', [[10, 1, -2], [1, 6, 1], [0.5, -1, 2]]], ['chain', 'Spring chain', [[2, -1, 0], [-1, 2, -1], [0, -1, 2]]], ['ns', 'Non-symmetric', [[4, 2, 0.5], [-1, 3, 1], [0, -2, -1]]], ['stab', 'Stability proved by discs', [[-5, 1, 2], [0.5, -4, 1], [1, 0.5, -3]]]], 4: [['dd4', 'Four-mass stiffness', [[3, -1, 0, 0], [-1, 3, -1, 0], [0, -1, 3, -1], [0, 0, -1, 3]]], ['osc', 'Oscillatory system', [[-1, 2, 0, 0], [-2, -1, 0.5, 0], [0, 0.3, -3, 1], [0, 0, -1, -3]]]] };
  let n = 3;
  const st = form(el, [{ k: 'n', t: 'seg', l: 'Size', o: [['3', '3 × 3'], ['4', '4 × 4']], v: '3' }, { k: 'pre', t: 'sel', l: 'Example', o: PRE[3].map(p => [p[0], p[1]]), v: 'dd' }], kk => {
    if (kk === 'n') { n = +st.n; const s = st._el.pre; s.innerHTML = PRE[n].map(p => `<option value="${p[0]}">${p[1]}</option>`).join(''); st.pre = PRE[n][0][0]; s.value = st.pre; }
    m.set(PRE[n].find(p => p[0] === st.pre)[2]);
  });
  const row = div(el, 'row'), left = div(row), m = matIn(left, PRE[3][0][2], () => draw()); div(left, 'hint', 'Each row gives a disc: centre = diagonal entry, radius = sum of |off-diagonal| in that row. Every eigenvalue lies in the union of the discs.');
  const cv = canvas(row, 'sq', 'Complex plane: Gershgorin discs (shaded) and the true eigenvalues (orange)');
  const out = div(el, 'out');
  function draw() {
    const k = C(), A = m.M, N = A.length, D = A.map((r, i) => [r[i], r.reduce((s, v, j) => s + (j === i ? 0 : Math.abs(v)), 0)]), ev = LA.eig(A) || [];
    const xr = niceRange(D.flatMap(d => [d[0] - d[1], d[0] + d[1]]).concat(ev.map(z => z[0])), 0.1), ymax = Math.max(...D.map(d => d[1]), ...ev.map(z => Math.abs(z[1])), 1) * 1.1, span = Math.max(xr[1] - xr[0], 2 * ymax), cxm = (xr[0] + xr[1]) / 2;
    cv.fit(); const F = frame(cv, [cxm - span / 2, cxm + span / 2], [-span / 2, span / 2], { xl: 'real part', yl: 'imaginary part' }); F.clip(); const x = F.x;
    D.forEach((d, i) => { x.beginPath(); x.arc(F.X(d[0]), F.Y(0), Math.abs(F.X(d[1]) - F.X(0)), 0, 2 * PI); x.fillStyle = k.pri; x.globalAlpha = 0.14; x.fill(); x.globalAlpha = 1; x.strokeStyle = k.pri; x.lineWidth = 2; x.stroke(); dot(F, d[0], 0, 3.5, k.pri); label(F, d[0], 0, 'R' + (i + 1), k.pri, 'center', 0, -10); });
    ev.forEach(z => { const X = F.X(z[0]), Y = F.Y(z[1]); x.strokeStyle = k.acc; x.lineWidth = 3.5; x.beginPath(); x.moveTo(X - 7, Y - 7); x.lineTo(X + 7, Y + 7); x.moveTo(X + 7, Y - 7); x.lineTo(X - 7, Y + 7); x.stroke(); });
    F.unclip();
    const dom = D.every(d => Math.abs(d[0]) > d[1]), rhp = D.every(d => d[0] - d[1] > 0), lhp = D.every(d => d[0] + d[1] < 0), sym = A.every((r, i) => r.every((v, j) => Math.abs(v - A[j][i]) < 1e-12));
    out.textContent = D.map((d, i) => `Row ${i + 1}: centre ${fmt(d[0], 3)}, radius ${fmt(d[1], 3)}  → [${fmt(d[0] - d[1], 3)}, ${fmt(d[0] + d[1], 3)}] on the real axis`).join('\n') + `\nEigenvalues: ${ev.map(lamStr).join(',  ')}\n` +
      (dom ? 'Strictly diagonally dominant → 0 is outside every disc → A is invertible.\n' : 'Not diagonally dominant → the discs alone cannot rule out λ = 0.\n') +
      (rhp ? 'All discs in the right half-plane' + (sym ? ' and A symmetric → positive definite (e.g. a stable stiffness matrix).' : ' → every eigenvalue has positive real part.') : lhp ? 'All discs in the left half-plane → every eigenvalue has negative real part: x′ = Ax is STABLE — proved without computing a single eigenvalue.' : '') +
      `\nCost: Gershgorin needs n² additions; the QR algorithm about 10n³ operations — both trivial here, but for n = 10⁶ the bound is often all you can afford.`;
  }
  REDRAW.push(draw); draw();
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
