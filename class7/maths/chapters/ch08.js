/*
TOOL:    class7_maths_ch08
FAMILY:  CBSE_REVISION / Class 7 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 8 Working with Fractions (fraction of a fraction, multiplying fractions, area model, dividing fractions, reciprocals) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const gcd = (a, b) => b ? gcd(b, a % b) : a; const S = (n, d) => { const g = gcd(n, d); return d / g === 1 ? `${n / g}` : `${n / g}/${d / g}`; };
  G9.register({
    no: 8, part: 'Part I', short: 'Fraction × and ÷', title: 'Working with Fractions',
    blurb: 'Multiplying a fraction by a whole number, fraction of a fraction (area model), multiplying fractions, the effect of multiplying by a fraction, reciprocals and dividing by fractions, and word problems.',
    revise: {
      oneLine: 'a/b × c/d = (a × c)/(b × d): 2/3 × 3/4 = 6/12 = 1/2 (the area model shows 2/3 of 3/4). Multiplying by a proper fraction makes a number smaller. To divide by a fraction, multiply by its reciprocal: 3/4 ÷ 1/8 = 3/4 × 8 = 6 (how many eighths in three-quarters).',
      sections: [
        { h: 'Whole × fraction', html: `<p>5 × 2/3 = 10/3 = 3 1/3.</p>` },
        { h: 'Fraction of a fraction', html: `<p>1/2 of 3/5 = 3/10. "of" means ×.</p>` },
        { h: 'Division', html: `<p>Reciprocal of 3/5 is 5/3. 2 ÷ 2/5 = 2 × 5/2 = 5 (five pieces of 2/5 make 2).</p>` }
      ],
      formulas: [['a/b × c/d', 'ac/bd'], ['Reciprocal of a/b', 'b/a'], ['a/b ÷ c/d', 'a/b × d/c'], ['n × a/b', 'na/b']],
      terms: [['Reciprocal', 'flip: product with it is 1'], ['Proper fraction', 'less than 1'], ['"of"', 'multiply']],
      traps: ['Multiplying never "always makes bigger".', 'Flip the divisor, not the dividend.', 'Simplify before multiplying to keep numbers small.'],
      bridge: '<p>Class 8 uses fractions in percentages and proportional reasoning.</p>'
    },
    explore: [
      { title: 'Area model', intro: 'Shade a/b one way and c/d the other; the overlap is the product.',
        build(el, K) { let a = 2, b = 3, c = 3, d = 4; const row = K.row(el); K.slider(row, 'a', 1, 8, 1, a, v => { a = Math.min(v, b); g.redraw(); }); K.slider(row, 'b', 2, 8, 1, b, v => { b = v; a = Math.min(a, b); g.redraw(); }); K.slider(row, 'c', 1, 8, 1, c, v => { c = Math.min(v, d); g.redraw(); }); K.slider(row, 'd', 2, 8, 1, d, v => { d = v; c = Math.min(c, d); g.redraw(); });
          const g = new K.Board(el, { xmin: -0.5, xmax: 8.5, ymin: -0.5, ymax: 8.5, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          g.onDraw = () => { g.clear(); const W = 8; g.rect(0, 0, W, W, { color: C.ink, w: 2 }); g.rect(0, 0, W * c / d, W, { fill: 'rgba(234,88,12,.25)', color: 'none' }); g.rect(0, W - W * a / b, W, W * a / b, { fill: 'rgba(29,78,216,.25)', color: 'none' }); g.rect(0, W - W * a / b, W * c / d, W * a / b, { fill: 'rgba(124,58,237,.45)', color: C.purple, w: 2 }); for (let i = 1; i < d; i++) g.line(W * i / d, 0, W * i / d, W, { color: C.grey, w: 1 }); for (let j = 1; j < b; j++) g.line(0, W * j / b, W, W * j / b, { color: C.grey, w: 1 });
            rd.innerHTML = `${a}/${b} × ${c}/${d} = ${a * c}/${b * d}${gcd(a * c, b * d) > 1 ? ' = <b>' + S(a * c, b * d) + '</b>' : ''} · purple cells: ${a * c} of ${b * d}`; };
          g.redraw(); return null; } },
      { title: 'How many pieces fit?', intro: 'Division as "how many of these fit into that".',
        build(el, K) { let n = 3, dd = 4, p = 1, q = 8; const row = K.row(el); K.slider(row, 'amount (top)', 1, 8, 1, n, v => { n = v; b.redraw(); }); K.slider(row, 'amount (bottom)', 1, 8, 1, dd, v => { dd = v; b.redraw(); }); K.slider(row, 'piece (top)', 1, 4, 1, p, v => { p = v; b.redraw(); }); K.slider(row, 'piece (bottom)', 2, 12, 1, q, v => { q = v; b.redraw(); });
          const b = new K.Board(el, { xmin: -0.2, xmax: 8.4, ymin: -0.7, ymax: 1.6, axes: false, grid: 0, aspect: 0.2 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const A = n / dd, P = p / q, k = A / P; for (let i = 0; i <= 8; i++) { b.line(i, -0.1, i, 0.1, { color: C.ink, w: 2 }); b.text(i, -0.45, String(i), { font: '11px' }); } b.line(0, 0, 8, 0, { color: C.ink, w: 1 }); b.rect(0, 0.2, Math.min(A, 8), 0.5, { fill: C.blueL, color: C.blue, w: 2 }); for (let i = 0; i < Math.min(Math.ceil(k), 200) && i * P < 8; i++) b.rect(i * P, 0.85, Math.min(P, Math.max(0, A - i * P)), 0.5, { fill: i % 2 ? C.orangeL : 'rgba(234,88,12,.4)', color: C.orange, w: 1 });
            rd.innerHTML = `${n}/${dd} ÷ ${p}/${q} = ${n}/${dd} × ${q}/${p} = ${n * q}/${dd * p} = <b>${S(n * q, dd * p)}</b> · that many pieces of ${p}/${q} fit into ${n}/${dd}`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Whole × fraction', gen(R) { const n = R.int(2, 9), a = R.int(1, 5), b = R.int(a + 1, 9); return { q: `${n} × ${a}/${b} = ?`, a: S(n * a, b), ans: n * a / b, tol: 1e-6 }; } },
      { title: 'Multiply fractions', gen(R) { const a = R.int(1, 8), b = R.int(a + 1, 9), c = R.int(1, 8), d = R.int(c + 1, 9); return { q: `${a}/${b} × ${c}/${d} = ?`, a: S(a * c, b * d), ans: a * c / (b * d), tol: 1e-6 }; } },
      { title: 'Fraction of a quantity', gen(R) { const d = R.pick([3, 4, 5, 6, 8]), n = R.int(1, d - 1), k = R.int(2, 12); return { q: `${n}/${d} of ${d * k} kg = ?`, a: `${n * k} kg`, ans: n * k }; } },
      { title: 'Reciprocal and divide', levels: [2, 3], gen(R) { const a = R.int(1, 8), b = R.int(a + 1, 9), c = R.int(1, 6), d = R.int(c + 1, 9); return { q: `${a}/${b} ÷ ${c}/${d} = ?`, a: S(a * d, b * c), ans: a * d / (b * c), tol: 1e-6, s: `${a}/${b} × ${d}/${c}` }; } },
      { title: 'How many pieces', levels: [2, 3], gen(R) { const L = R.int(2, 9), q = R.pick([2, 3, 4]); return { q: `A ${L} m ribbon is cut into pieces of 1/${q} m. How many pieces?`, a: String(L * q), ans: L * q }; } }
    ],
    quiz: [
      { q: '2/3 × 3/4', o: ['1/2', '6/7', '5/12', '8/9'], a: 0, e: '6/12.' }, { q: '1/2 of 3/5', o: ['3/10', '3/5', '4/7', '6/5'], a: 0, e: 'Multiply.' },
      { q: 'Reciprocal of 3/5', o: ['5/3', '3/5', '−3/5', '15'], a: 0, e: 'Flip.' }, { q: '3/4 ÷ 1/8', o: ['6', '3/32', '1/6', '24'], a: 0, e: '3/4 × 8.' },
      { q: '5 × 2/3', o: ['10/3', '10/15', '7/3', '5/3'], a: 0, e: 'Multiply top.' }, { q: 'Multiplying 12 by 3/4 gives', o: ['a smaller number', 'a bigger number', '12', '0'], a: 0, e: 'Proper fraction.' },
      { q: '2 ÷ 2/5', o: ['5', '4/5', '1/5', '10'], a: 0, e: '2 × 5/2.' }, { q: 'a/b ÷ c/d =', o: ['a/b × d/c', 'a/b × c/d', 'b/a × c/d', 'ac/bd'], a: 0, e: 'Flip divisor.' },
      { q: '3/4 of 20', o: ['15', '5', '12', '16'], a: 0, e: '20 ÷ 4 × 3.' }, { q: 'Pieces of 1/4 m in 3 m', o: ['12', '3/4', '7', '4'], a: 0, e: '3 × 4.' },
      { q: '(4/9) × (3/8)', o: ['1/6', '12/17', '7/17', '1/3'], a: 0, e: '12/72.' }
    ],
    teach: {
      outcomes: ['Multiply fractions using the area model', 'Find fractions of quantities', 'Divide by fractions using reciprocals'],
      periods: [{ t: 'Multiplying', flow: [['10 min', 'Paper folding: half of a third.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Word problems.']] }, { t: 'Dividing', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Reciprocals.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['× always bigger.', 'Flipping the wrong fraction.'], activities: ['Paper-fold area model.', 'Ribbon cutting.'],
      exit: ['5/6 × 3/10.', '7/8 ÷ 1/4.', '2/5 of 35.'], homework: 'Halve a recipe that uses 3/4 cup of rice and 1 1/2 cups of water. Write the new amounts.'
    },
    slides: [{ t: 'Working with Fractions', b: ['Whole × fraction', 'Fraction of a fraction', 'Area model', 'Reciprocals and division'] }, { t: 'Check yourself', b: ['3/5 × 10/9?', '4/5 ÷ 2/15?'] }],
    fs: { groups: [['Multiplying', [['a/b × c/d', 'ac/bd'], ['"of"', '×'], ['× proper fraction', 'smaller']]], ['Dividing', [['Reciprocal of a/b', 'b/a'], ['a/b ÷ c/d', 'a/b × d/c'], ['Meaning', 'how many fit']]]],
      ex: [['2/3 × 3/4', '1/2'], ['3/4 ÷ 1/8', '6']], rem: ['Cancel before multiplying.', 'Flip only the divisor.', 'Check if the answer is sensible.'] }
  });
})();
