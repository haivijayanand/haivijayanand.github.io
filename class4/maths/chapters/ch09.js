/*
TOOL:    class4_maths_ch09
FAMILY:  CBSE_REVISION / Class 4 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 9 Equal Groups (multiplication as equal groups and arrays, multiples, division as grouping) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 9, part: 'All chapters', short: 'Equal groups', title: 'Equal Groups',
    blurb: 'Multiplication as equal groups and arrays, skip counting and multiples, the order property, and division as making equal groups.',
    revise: {
      oneLine: '6 groups of 4 = 6 × 4 = 24. An array of 6 rows and 4 columns shows the same, and turning it shows 4 × 6 = 24. Multiples of 4 are 4, 8, 12, 16… Division asks how many groups: 24 ÷ 4 = 6.',
      sections: [
        { h: 'Groups and arrays', html: `<p>Rows × columns = total. Order does not matter: 3 × 7 = 7 × 3.</p>` },
        { h: 'Multiples', html: `<p>Skip counting by 6: 6, 12, 18, 24… Common multiples of 4 and 6: 12, 24, 36…</p>` },
        { h: 'Division', html: `<p>35 beads in strings of 5 → 35 ÷ 5 = 7 strings. Check: 7 × 5 = 35.</p>` }
      ],
      formulas: [['Groups × in each', 'total'], ['a × b', 'b × a'], ['n × 1', 'n'], ['n × 0', '0'], ['total ÷ group size', 'number of groups']],
      terms: [['Multiple', 'in a times table'], ['Array', 'rows and columns'], ['Product', 'answer of ×']],
      traps: ['Groups must be equal.', 'n × 0 is 0, not n.', 'Remainder must be less than the divisor.'],
      bridge: '<p>Ch 13 multiplies bigger numbers by splitting.</p>'
    },
    explore: [
      { title: 'Array', intro: 'Choose rows and columns. Press <kbd>S</kbd> to turn the array.',
        build(el, K) { let r = 4, c = 6, t = false; const row = K.row(el); K.slider(row, 'rows', 1, 10, 1, r, v => { r = v; b.redraw(); }); K.slider(row, 'columns', 1, 10, 1, c, v => { c = v; b.redraw(); });
          const b = new K.Board(el, { xmin: -0.5, xmax: 10.5, ymin: -0.5, ymax: 10.5, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const R = t ? c : r, Cc = t ? r : c; for (let i = 0; i < R; i++) for (let j = 0; j < Cc; j++) b.circle(j + 0.5, 9.5 - i, 0.35, { fill: i % 2 ? C.orangeL : C.blueL, color: i % 2 ? C.orange : C.blue, w: 2 });
            rd.innerHTML = `${R} rows × ${Cc} columns = <b>${R * Cc}</b> · same as ${Cc} × ${R} · ${R * Cc} ÷ ${Cc} = ${R}`; };
          const step = () => { t = !t; b.redraw(); }; K.button(row, 'Turn (S)', step); b.redraw(); return { step, play() {}, pause() {} }; } },
      { title: 'Multiples on a 100 grid', intro: 'Choose two numbers. Common multiples are purple.',
        build(el, K) { let p = 4, q = 6; const row = K.row(el); K.slider(row, 'first', 2, 10, 1, p, v => { p = v; draw(); }); K.slider(row, 'second', 2, 10, 1, q, v => { q = v; draw(); }); const box = document.createElement('div'); box.style.cssText = 'display:grid;grid-template-columns:repeat(10,40px);gap:2px;margin:8px 0'; el.appendChild(box); const rd = K.read(el);
          function draw() { box.innerHTML = Array.from({ length: 100 }, (_, i) => i + 1).map(n => { const a = n % p === 0, bb = n % q === 0; return `<div style="text-align:center;padding:4px 0;border-radius:4px;border:1px solid var(--rule,#cbd5e1);${a && bb ? 'background:var(--purple,#7c3aed);color:#fff' : a ? 'background:var(--blueL,#dbeafe)' : bb ? 'background:var(--orangeL,#ffedd5)' : ''}">${n}</div>`; }).join('');
            const cm = []; for (let n = 1; n <= 100; n++) if (n % p === 0 && n % q === 0) cm.push(n); rd.innerHTML = `multiples of ${p} (blue), of ${q} (orange) · common: <b>${cm.join(', ') || 'none up to 100'}</b>`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Equal groups', gen(R) { const g = R.int(3, 9), n = R.int(3, 9); return { q: `${g} plates with ${n} idlis each. How many idlis?`, a: String(g * n), ans: g * n }; } },
      { title: 'Array', gen(R) { const r = R.int(2, 10), c = R.int(2, 10); return { q: `An array has ${r} rows and ${c} columns. How many in all?`, a: String(r * c), ans: r * c }; } },
      { title: 'Multiples', gen(R) { const n = R.int(3, 9); return { q: `Write the first five multiples of ${n}.`, a: [1, 2, 3, 4, 5].map(k => k * n).join(', ') }; } },
      { title: 'Make groups (÷)', gen(R) { const g = R.int(2, 9), k = R.int(2, 10); return { q: `${g * k} beads, ${g} on each string. How many strings?`, a: String(k), ans: k }; } },
      { title: 'Common multiples', levels: [3], gen(R) { const t = R.pick([[2, 3, 6], [3, 4, 12], [4, 6, 12], [2, 5, 10], [6, 8, 24], [3, 5, 15]]); return { q: `Smallest common multiple of ${t[0]} and ${t[1]}?`, a: String(t[2]), ans: t[2] }; } }
    ],
    quiz: [
      { q: '6 groups of 4', o: ['24', '10', '64', '20'], a: 0, e: '6 × 4.' }, { q: '3 × 7 = 7 × ?', o: ['3', '7', '21', '10'], a: 0, e: 'Order.' },
      { q: '9 × 0', o: ['0', '9', '1', '90'], a: 0, e: 'Zero groups.' }, { q: 'Multiple of 6', o: ['42', '40', '26', '15'], a: 0, e: '6 × 7.' },
      { q: '35 ÷ 5', o: ['7', '6', '30', '40'], a: 0, e: '5 × 7.' }, { q: 'Array 5 by 8', o: ['40', '13', '58', '35'], a: 0, e: 'Multiply.' },
      { q: 'Common multiple of 3 and 4', o: ['12', '7', '9', '16'], a: 0, e: 'In both tables.' }, { q: '8 × 1', o: ['8', '1', '9', '0'], a: 0, e: 'One group.' },
      { q: 'Groups in multiplication must be', o: ['equal', 'different', 'odd', 'small'], a: 0, e: 'Equal.' }, { q: '48 ÷ 6', o: ['8', '6', '7', '9'], a: 0, e: '6 × 8.' },
      { q: 'Skip count by 7: 7, 14, 21, __', o: ['28', '27', '22', '35'], a: 0, e: '+7.' }
    ],
    teach: {
      outcomes: ['Use groups and arrays for ×', 'Find multiples and common multiples', 'Divide by grouping'],
      periods: [{ t: 'Groups and arrays', flow: [['10 min', 'Seating arrays.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Turn-around facts.']] }, { t: 'Multiples', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Division as grouping.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['n × 0 = n.', 'Unequal groups.'], activities: ['Egg tray arrays.', 'Fizz-buzz multiples game.'],
      exit: ['7 × 8.', 'First 4 multiples of 9.', '56 ÷ 7.'], homework: 'Find 3 arrays at home (window grills, tiles, egg trays) and write the multiplication for each.'
    },
    slides: [{ t: 'Equal Groups', b: ['Groups and arrays', 'Order property', 'Multiples', 'Division as grouping'] }, { t: 'Check yourself', b: ['8 rows of 6?', 'Common multiple of 4 and 5?'] }],
    fs: { groups: [['Multiplying', [['groups × each', 'total'], ['a × b', 'b × a'], ['× 0', '0'], ['× 1', 'same']]], ['Multiples', [['of 4', '4, 8, 12, 16'], ['Common of 4, 6', '12, 24, 36']]], ['Dividing', [['total ÷ size', 'groups'], ['Check', 'groups × size']]]],
      ex: [['9 × 6', '54'], ['63 ÷ 9', '7']], rem: ['Equal groups only.', 'Turn arrays to swap.', 'Use tables to divide.'] }
  });
})();
