/*
TOOL:    class5_maths_ch10
FAMILY:  CBSE_REVISION / Class 5 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 10 Symmetrical Designs (reflection symmetry, turn (rotational) symmetry, order of turn symmetry, designs) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 10, part: 'All chapters', short: 'Symmetry', title: 'Symmetrical Designs',
    blurb: 'Mirror (reflection) symmetry and turn (rotational) symmetry in designs, rangoli, wheels and logos; lines of symmetry and the order of turn symmetry.',
    revise: {
      oneLine: 'A design has mirror symmetry if a line divides it into matching halves. It has turn symmetry if it looks the same after a turn of less than a full turn. The number of times it matches in one full turn is its order: a square has order 4.',
      sections: [
        { h: 'Mirror symmetry', html: `<p>Fold or use a mirror. A rectangle has 2 lines; a square 4.</p>` },
        { h: 'Turn symmetry', html: `<p>Turn a square by 90°: it looks the same. Matches 4 times in a full turn → order 4. The letter S has order 2 (turn 180°).</p>` },
        { h: 'Both or one', html: `<p>A pinwheel may have turn symmetry but no mirror symmetry.</p>` }
      ],
      formulas: [['Order', 'matches in a full turn'], ['Smallest turn', '360° ÷ order'], ['Regular n-gon', 'n lines, order n'], ['Order 1', 'no turn symmetry']],
      terms: [['Reflection symmetry', 'mirror halves match'], ['Rotational symmetry', 'same after a turn'], ['Centre of turn', 'fixed point']],
      traps: ['Every shape matches after a full turn — that is order 1, not symmetry.', 'Turn symmetry does not need a mirror line.'],
      bridge: '<p>Class 6 studies symmetry formally.</p>'
    },
    explore: [
      { title: 'Turn the design', intro: 'Choose a design; press <kbd>S</kbd> to turn it by its smallest turn. The orange dot shows how far it has turned.',
        build(el, K) { const D = [['pinwheel', 4, false], ['square', 4, true], ['letter S shape', 2, false], ['equilateral triangle', 3, true], ['hexagon flower', 6, true]]; let k = 0, t = 0; const row = K.row(el); K.select(row, 'design', D.map(d => d[0]), i => { k = i; t = 0; b.redraw(); });
          const b = new K.Board(el, { xmin: -1.6, xmax: 1.6, ymin: -1.4, ymax: 1.4, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          const shape = (i, rot) => { const R = (x, y) => [x * Math.cos(rot) - y * Math.sin(rot), x * Math.sin(rot) + y * Math.cos(rot)]; const out = []; if (i === 0) for (let j = 0; j < 4; j++) { const a = j * Math.PI / 2; out.push([[0, 0], [Math.cos(a), Math.sin(a)], [0.6 * Math.cos(a + 0.6), 0.6 * Math.sin(a + 0.6)]].map(p => R(p[0] * Math.cos(0) - 0, p[1]))); } else if (i === 1) out.push([[-0.8, -0.8], [0.8, -0.8], [0.8, 0.8], [-0.8, 0.8]].map(p => R(...p))); else if (i === 2) { out.push([[-0.8, 0.9], [0.4, 0.9], [0.4, 0.5], [-0.4, 0.5], [-0.4, 0.2], [0.2, 0.2], [0.2, 0.0], [-0.8, 0.0]].map(p => R(...p))); out.push([[0.8, -0.9], [-0.4, -0.9], [-0.4, -0.5], [0.4, -0.5], [0.4, -0.2], [-0.2, -0.2], [-0.2, 0.0], [0.8, 0.0]].map(p => R(...p))); } else if (i === 3) out.push([0, 1, 2].map(j => R(Math.cos(Math.PI / 2 + j * 2 * Math.PI / 3), Math.sin(Math.PI / 2 + j * 2 * Math.PI / 3)))); else for (let j = 0; j < 6; j++) { const a = j * Math.PI / 3; out.push([[0, 0], [0.5 * Math.cos(a - 0.35), 0.5 * Math.sin(a - 0.35)], [Math.cos(a), Math.sin(a)], [0.5 * Math.cos(a + 0.35), 0.5 * Math.sin(a + 0.35)]].map(p => R(...p))); } return out; };
          b.onDraw = () => { b.clear(); const o = D[k][1], rot = t * 2 * Math.PI / o; shape(k, rot).forEach((P, j) => b.poly(P, { fill: C.blueL, color: C.blue, w: 3 })); b.dot(0, 0, { r: 5, color: C.purple }); { const m = 1.25, a = Math.PI / 2 + rot; b.dot(m * Math.cos(a), m * Math.sin(a), { r: 6, color: C.orange }); }
            rd.innerHTML = `${D[k][0]}: turned ${t * 360 / o}° — looks the same · order of turn symmetry <b>${o}</b> (smallest turn ${360 / o}°) · mirror symmetry: ${D[k][2] ? 'yes' : 'no'}`; };
          const step = () => { t = (t + 1) % D[k][1]; b.redraw(); }; K.button(row, 'Turn (S)', step); b.redraw(); return { step, play() {}, pause() {} }; } },
      { title: 'Four-way mirror design', intro: 'Click squares in the top-left quarter; two mirror lines copy them.',
        build(el, K) { const on = new Set(['0,0', '1,1', '2,2', '0,3', '3,1']); const box = document.createElement('div'); box.style.cssText = 'display:grid;grid-template-columns:repeat(10,30px);gap:2px;margin:8px 0'; el.appendChild(box); const rd = K.read(el);
          function draw() { let h = ''; for (let r = 0; r < 10; r++) for (let c = 0; c < 10; c++) { const rr = r < 5 ? r : 9 - r, cc = c < 5 ? c : 9 - c, k = `${rr},${cc}`, src = r < 5 && c < 5; h += `<div data-k="${src ? k : ''}" style="height:30px;cursor:${src ? 'pointer' : 'default'};border:1px solid var(--rule,#cbd5e1);${c === 4 ? 'border-right:3px solid var(--purple,#7c3aed);' : ''}${r === 4 ? 'border-bottom:3px solid var(--purple,#7c3aed);' : ''}background:${on.has(k) ? (src ? 'var(--blue,#1d4ed8)' : 'var(--orange,#ea580c)') : 'transparent'}"></div>`; } box.innerHTML = h;
            box.querySelectorAll('[data-k]').forEach(d => { if (d.dataset.k) d.onclick = () => { on.has(d.dataset.k) ? on.delete(d.dataset.k) : on.add(d.dataset.k); draw(); }; }); rd.innerHTML = `${on.size} squares × 4 = ${4 * on.size} · 2 lines of symmetry (purple) and turn symmetry of order 2`; }
          draw(); return null; } }
    ],
    gens: [
      { title: 'Order of turn symmetry', gen(R) { const t = R.pick([['square', 4], ['equilateral triangle', 3], ['rectangle', 2], ['regular hexagon', 6], ['letter S', 2], ['letter Z', 2], ['letter A', 1]]); return { q: `Order of turn symmetry of a ${t[0]}?`, a: String(t[1]), ans: t[1] }; } },
      { title: 'Smallest turn', gen(R) { const o = R.pick([2, 3, 4, 5, 6, 8]); return { q: `A design has turn symmetry of order ${o}. Smallest turn that matches?`, a: `${360 / o}°`, ans: 360 / o }; } },
      { title: 'Lines of symmetry', gen(R) { const t = R.pick([['square', 4], ['rectangle', 2], ['equilateral triangle', 3], ['regular pentagon', 5], ['letter H', 2], ['letter N', 0]]); return { q: `Lines of symmetry of ${t[0]}?`, a: String(t[1]), ans: t[1] }; } },
      { title: 'Which symmetry?', levels: [2, 3], gen(R) { const t = R.pick([['a pinwheel', 'turn symmetry only'], ['the letter H', 'both'], ['the letter A', 'mirror only'], ['the letter S', 'turn symmetry only'], ['a square', 'both']]); return { q: `What symmetry does ${t[0]} have?`, a: t[1] }; } },
      { title: 'Regular shapes', levels: [3], gen(R) { const n = R.int(3, 12); return { q: `Regular ${n}-sided shape: lines of symmetry and order of turn symmetry?`, a: `${n} lines, order ${n}` }; } }
    ],
    quiz: [
      { q: 'Order of a square', o: ['4', '2', '1', '8'], a: 0, e: '90° turns.' }, { q: 'Letter S has', o: ['turn symmetry, order 2', 'mirror symmetry', 'order 4', 'no symmetry'], a: 0, e: '180°.' },
      { q: 'Smallest turn for order 6', o: ['60°', '90°', '30°', '120°'], a: 0, e: '360 ÷ 6.' }, { q: 'Rectangle lines of symmetry', o: ['2', '4', '1', '0'], a: 0, e: 'Not diagonals.' },
      { q: 'Equilateral triangle order', o: ['3', '1', '6', '2'], a: 0, e: '120°.' }, { q: 'Order 1 means', o: ['no turn symmetry', 'one line', 'full symmetry', 'order 2'], a: 0, e: 'Only full turn.' },
      { q: 'A pinwheel usually has', o: ['turn but not mirror symmetry', 'mirror only', 'none', 'only one line'], a: 0, e: 'Blades lean.' }, { q: 'Regular hexagon lines', o: ['6', '3', '12', '4'], a: 0, e: 'n lines.' },
      { q: 'Letter H has', o: ['both kinds', 'mirror only', 'turn only', 'none'], a: 0, e: '2 lines, order 2.' }, { q: 'Turn symmetry needs a', o: ['centre of turn', 'mirror', 'ruler', 'colour'], a: 0, e: 'Fixed point.' },
      { q: 'Order 4 smallest turn', o: ['90°', '45°', '180°', '360°'], a: 0, e: 'Quarter.' }
    ],
    teach: {
      outcomes: ['Find lines of symmetry', 'Find order of turn symmetry', 'Make symmetric designs'],
      periods: [{ t: 'Turn symmetry', flow: [['10 min', 'Trace and turn a shape.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Letters and logos.']] }, { t: 'Designs', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Rangoli design.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Full turn counted as symmetry.', 'Turn = mirror.'], activities: ['Tracing-paper turns.', 'Paper pinwheels.'],
      exit: ['Order of a regular pentagon.', 'Smallest turn for order 3.', 'Symmetry of Z.'], homework: 'Design a rangoli with 4 lines of symmetry and order 4 turn symmetry.'
    },
    slides: [{ t: 'Symmetrical Designs', b: ['Mirror symmetry', 'Turn symmetry', 'Order and smallest turn', 'Designs'] }, { t: 'Check yourself', b: ['Order of an equilateral triangle?', 'Symmetry of S?'] }],
    fs: { groups: [['Mirror', [['Square', '4 lines'], ['Rectangle', '2 lines'], ['Regular n-gon', 'n lines']]], ['Turn', [['Order', 'matches in 360°'], ['Smallest turn', '360° ÷ order'], ['S, Z', 'order 2'], ['Square', 'order 4']]]],
      ex: [['Order 5', '72° turn'], ['Letter H', '2 lines, order 2']], rem: ['Use tracing paper.', 'Full turn alone is order 1.', 'Some designs have only one kind.'] }
  });
})();
