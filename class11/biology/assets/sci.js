/*
TOOL:    cbse_science_widgets
FAMILY:  CBSE_REVISION / Maths and Science kits (shared engine for every class)
VERSION: 1.0.1
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.1 - stage stepper draws through the board's onDraw so the first stage shows after layout
         1.0.0 - science helpers on top of core.js: sorter (click items into groups), stage stepper (cycles and processes), part explorer (labelled diagram), flash cards, pick-question helper for generators
*/
(function () {
  'use strict';
  const G9 = window.G9 = window.G9 || {};
  const S = G9.S9 = {};
  const esc = s => String(s);

  // generator helper: pick one [question, answer] pair
  S.pickQ = (R, list) => { const t = R.pick(list); return { q: t[0], a: t[1] }; };
  // generator helper: 'which group' question from a sorter-style list [[item, groupIndex], ...] with group names
  S.groupQ = (R, items, groups, stem) => { const t = R.pick(items); return { q: (stem || 'Which group does this belong to: ') + t[0] + '?', a: groups[t[1]] }; };

  // Sorter: put each item into the right group. S = reveal the next item's answer.
  S.sorter = (el, K, o) => {
    const groups = o.groups, items = o.items.map((x, i) => ({ t: x[0], g: x[1], note: x[2] || '', i, put: null }));
    let sel = null;
    const pool = K.h('div', { cls: 'ctrl' }); pool.style.flexWrap = 'wrap'; el.appendChild(pool);
    const bins = K.h('div'); bins.style.cssText = `display:grid;grid-template-columns:repeat(${Math.min(groups.length, 4)},1fr);gap:10px;margin-top:8px`; el.appendChild(bins);
    const rd = K.read(el); const row = K.row(el);
    const pal = ['var(--blue,#1d4ed8)', 'var(--orange,#ea580c)', 'var(--purple,#7c3aed)', '#0f766e', '#a16207', '#be185d'];
    function draw(msg) {
      pool.innerHTML = ''; bins.innerHTML = '';
      items.filter(x => x.put === null).forEach(x => { const b = K.h('button', { cls: 'btn ghost' }, esc(x.t)); if (sel === x) b.style.outline = '3px solid var(--orange,#ea580c)'; b.onclick = () => { sel = x; draw(`Now click a group for <b>${x.t}</b>.`); }; pool.appendChild(b); });
      groups.forEach((g, gi) => { const d = K.h('div'); d.style.cssText = `border:2px dashed ${pal[gi % 6]};border-radius:10px;padding:8px;min-height:80px;cursor:pointer`; d.innerHTML = `<b style="color:${pal[gi % 6]}">${g}</b><div style="margin-top:6px;line-height:1.9">${items.filter(x => x.put === gi).map(x => `<span style="display:inline-block;padding:2px 8px;margin:2px;border-radius:6px;background:${x.g === gi ? 'rgba(29,78,216,.12)' : 'rgba(234,88,12,.25)'}">${x.g === gi ? '✔' : '✗'} ${x.t}</span>`).join('')}</div>`;
        d.onclick = () => { if (!sel) { draw('First click an item above.'); return; } sel.put = gi; const x = sel; sel = null; draw(x.g === gi ? `✔ <b>${x.t}</b> — ${groups[gi]}. ${x.note}` : `✗ <b>${x.t}</b> belongs to <b>${groups[x.g]}</b>. ${x.note}`); }; bins.appendChild(d); });
      const done = items.filter(x => x.put !== null), ok = done.filter(x => x.put === x.g).length;
      rd.innerHTML = (msg ? msg + '<br>' : '') + `placed ${done.length} of ${items.length} · correct ${ok}` + (done.length === items.length ? ' · <b>all sorted!</b>' : '');
    }
    const step = () => { const x = items.find(y => y.put === null); if (!x) return; x.put = x.g; sel = null; draw(`<b>${x.t}</b> → ${groups[x.g]}. ${x.note}`); };
    K.button(row, 'Show next answer (S)', step); K.button(row, '↺ Reset', () => { items.forEach(x => x.put = null); sel = null; draw(); });
    draw(o.start || 'Click an item, then click its group.');
    return { step, play() {}, pause() {} };
  };

  // Stage stepper: a sequence of stages, each with a title, text and an optional draw(board, k) function.
  S.stages = (el, K, o) => {
    const b = o.board ? new K.Board(el, o.board) : null; const rd = K.read(el);
    let cur = 0;
    const an = new K.Anim(o.stages.length, k => show(k), { ms: o.ms || 1600, loop: !!o.loop });
    if (b) b.onDraw = () => { const st = o.stages[cur]; b.clear(); if (o.base) o.base(b, cur); if (st[2]) st[2](b, cur); };
    function show(k) { cur = k; const st = o.stages[k]; if (b) b.redraw(); rd.innerHTML = `<b>${k + 1}. ${st[0]}</b> — ${st[1]}`; }
    K.anim(el, an); show(0); return an;
  };

  // Part explorer: buttons for parts; the chosen part is highlighted on the drawing.
  S.parts = (el, K, o) => {
    const row = K.row(el); row.style.flexWrap = 'wrap'; let k = -1;
    const b = new K.Board(el, o.board); const rd = K.read(el);
    const btns = o.parts.map((p, i) => K.button(row, p[0], () => pick(i)));
    function pick(i) { k = i; btns.forEach((x, j) => { x.className = j === i ? 'btn' : 'btn ghost'; }); b.redraw(); }
    b.onDraw = () => { b.clear(); o.draw(b, k); if (k >= 0) { const p = o.parts[k]; if (p[1] !== null && p[1] !== undefined) { b.circle(p[1], p[2], p[4] || 0.35, { color: '#ea580c', w: 4 }); } rd.innerHTML = `<b>${p0(k)}</b>: ${o.parts[k][3]}`; } else rd.innerHTML = o.hint || 'Click a part (or press S) to learn about it.'; };
    const p0 = i => o.parts[i][0];
    const step = () => pick((k + 1) % o.parts.length);
    b.redraw(); return { step, play() {}, pause() {} };
  };

  // Flash cards: front / back; S = next card, click to flip.
  S.cards = (el, K, o) => {
    let k = 0, back = false; const box = K.h('div'); box.style.cssText = 'border:2px solid var(--blue,#1d4ed8);border-radius:14px;min-height:120px;display:flex;align-items:center;justify-content:center;text-align:center;font-size:22px;padding:16px;cursor:pointer;margin:6px 0'; el.appendChild(box);
    const rd = K.read(el); const row = K.row(el);
    function draw() { const c = o.items[k]; box.innerHTML = back ? `<div><div style="font-size:15px;color:var(--orange,#ea580c)">answer</div>${c[1]}</div>` : `<div>${c[0]}</div>`; rd.innerHTML = `card ${k + 1} of ${o.items.length} · click the card to ${back ? 'see the question' : 'flip'}`; }
    box.onclick = () => { back = !back; draw(); };
    const step = () => { if (!back) back = true; else { back = false; k = (k + 1) % o.items.length; } draw(); };
    K.button(row, 'Flip / next (S)', step); draw(); return { step, play() {}, pause() {} };
  };
})();
