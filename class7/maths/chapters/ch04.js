/*
TOOL:    class7_maths_ch04
FAMILY:  CBSE_REVISION / Class 7 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 4 Expressions using Letter-Numbers (letters for numbers, writing and evaluating algebraic expressions, like terms, simplifying) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 4, part: 'Part I', short: 'Algebraic expressions', title: 'Expressions using Letter-Numbers',
    blurb: 'Letters standing for numbers (letter-numbers), writing expressions for rules and situations, evaluating for given values, like and unlike terms, simplifying expressions and patterns described with letters.',
    revise: {
      oneLine: 'If a pencil costs ₹p, 5 pencils cost 5p. Expressions like 3n + 2 describe patterns: for n = 4 it is 14. Like terms (3x and 5x) can be combined: 3x + 5x = 8x; unlike terms (3x and 5y) cannot. a − (b − c) = a − b + c works for letters too.',
      sections: [
        { h: 'Writing expressions', html: `<p>"4 more than twice a number" → 2n + 4. Perimeter of a square of side s → 4s.</p>` },
        { h: 'Evaluating', html: `<p>For a = 3, b = 2: 5a − 2b = 15 − 4 = 11.</p>` },
        { h: 'Simplifying', html: `<p>7x + 3y − 2x + y = 5x + 4y. 4(2m + 3) = 8m + 12.</p>` }
      ],
      formulas: [['Like terms', 'same letter part, add coefficients'], ['a(b + c)', 'ab + ac'], ['Matchstick pattern', '3n + 1'], ['Evaluate', 'substitute, then order of operations']],
      terms: [['Letter-number (variable)', 'stands for any number'], ['Coefficient', 'number multiplying the letter'], ['Like terms', 'same letters']],
      traps: ['3x + 2y ≠ 5xy.', '2n means 2 × n, not 2 followed by n.', 'Sign errors removing brackets.'],
      bridge: '<p>Ch 15 solves equations like 3x + 5 = 20.</p>'
    },
    explore: [
      { title: 'Matchstick rule', intro: 'Choose the pattern and n; the rule with letters gives the count.',
        build(el, K) { const P = [['squares in a row', n => 3 * n + 1, '3n + 1'], ['triangles in a row', n => 2 * n + 1, '2n + 1'], ['separate squares', n => 4 * n, '4n']]; let k = 0, n = 4; const row = K.row(el); K.select(row, 'pattern', P.map(p => p[0]), i => { k = i; b.redraw(); }); K.slider(row, 'n', 1, 10, 1, n, v => { n = v; b.redraw(); });
          const b = new K.Board(el, { xmin: -0.5, xmax: 15.5, ymin: -0.8, ymax: 1.8, axes: false, grid: 0, aspect: 0.18 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const o = { color: C.orange, w: 3 }; if (k === 0) { b.line(0, 0, 0, 1, o); for (let i = 0; i < n; i++) { b.line(i, 0, i + 1, 0, o); b.line(i, 1, i + 1, 1, o); b.line(i + 1, 0, i + 1, 1, o); } } else if (k === 1) { for (let i = 0; i < n; i++) { const x = i * 0.5; if (i % 2 === 0) { b.line(x, 0, x + 1, 0, o); b.line(x + 1, 0, x + 0.5, 1, o); if (i === 0) b.line(x, 0, x + 0.5, 1, o); } else { b.line(x, 1, x + 1, 1, o); b.line(x + 1, 1, x + 0.5, 0, o); } } } else for (let i = 0; i < n; i++) b.rect(i * 1.5, 0, 1, 1, o);
            rd.innerHTML = `rule ${P[k][2]} · n = ${n} → <b>${P[k][1](n)}</b> matchsticks`; };
          b.redraw(); return null; } },
      { title: 'Combine like terms', intro: 'Set the coefficients; like terms are grouped by colour.',
        build(el, K) { let a = 7, c = 3, d = -2, e = 1; const row = K.row(el); K.slider(row, 'x terms: a', -9, 9, 1, a, v => { a = v; draw(); }); K.slider(row, 'y terms: b', -9, 9, 1, c, v => { c = v; draw(); }); K.slider(row, 'x terms: c', -9, 9, 1, d, v => { d = v; draw(); }); K.slider(row, 'y terms: d', -9, 9, 1, e, v => { e = v; draw(); }); const rd = K.read(el);
          const t = (k, l, first) => { const s = k < 0 ? '− ' : first ? '' : '+ '; const m = Math.abs(k) === 1 ? '' : Math.abs(k); return k === 0 ? '' : `${s}${m}${l} `; };
          function draw() { const X = a + d, Y = c + e; const L = `<span style="color:var(--blue,#1d4ed8)">${t(a, 'x', true)}</span><span style="color:var(--orange,#ea580c)">${t(c, 'y', !a)}</span><span style="color:var(--blue,#1d4ed8)">${t(d, 'x', false)}</span><span style="color:var(--orange,#ea580c)">${t(e, 'y', false)}</span>`; const Rr = (t(X, 'x', true) + t(Y, 'y', !X)).trim() || '0'; rd.innerHTML = `<div style="font-size:22px;font-family:Cambria,serif">${L}= <b>${Rr}</b></div>x terms: ${a} + (${d}) = ${X}; y terms: ${c} + (${e}) = ${Y}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Write an expression', gen(R) { const t = R.pick([['5 more than a number n', 'n + 5'], ['3 times a number x, minus 4', '3x − 4'], ['cost of k pens at ₹12 each', '12k'], ['perimeter of a square of side s', '4s'], ['half of a number m', 'm/2'], ['the number 7 less than twice y', '2y − 7']]); return { q: `Write an expression for: ${t[0]}.`, a: t[1] }; } },
      { title: 'Evaluate', gen(R) { const a = R.int(1, 9), b = R.int(1, 9), p = R.int(2, 6), q = R.int(2, 6); return { q: `Find ${p}a − ${q}b + 5 for a = ${a}, b = ${b}.`, a: String(p * a - q * b + 5), ans: p * a - q * b + 5 }; } },
      { title: 'Simplify', gen(R) { const a = R.int(2, 9), b = R.int(1, 9), c = R.int(1, a - 1), d = R.int(1, 9); return { q: `Simplify ${a}x + ${b}y − ${c}x + ${d}y.`, a: `${a - c === 1 ? '' : a - c}x + ${b + d}y` }; } },
      { title: 'Expand', levels: [2, 3], gen(R) { const k = R.int(2, 9), a = R.int(2, 6), b = R.int(1, 9); return { q: `Expand ${k}(${a}m + ${b}).`, a: `${k * a}m + ${k * b}` }; } },
      { title: 'Pattern rule', levels: [2, 3], gen(R) { const m = R.int(2, 6), c = R.int(1, 5), n = R.int(10, 30); const s = [1, 2, 3, 4].map(i => m * i + c); return { q: `A pattern goes ${s.join(', ')}, … Write the rule for the n-th term and find the ${n}th.`, a: `${m}n + ${c}; ${m * n + c}`, ans: m * n + c }; } }
    ],
    quiz: [
      { q: '3x + 5x', o: ['8x', '8x²', '15x', '8'], a: 0, e: 'Like terms.' }, { q: '3x + 2y', o: ['cannot be combined', '5xy', '5x', '6xy'], a: 0, e: 'Unlike.' },
      { q: '5a − 2b for a = 3, b = 2', o: ['11', '13', '19', '9'], a: 0, e: '15 − 4.' }, { q: '4(2m + 3)', o: ['8m + 12', '8m + 3', '6m + 7', '2m + 12'], a: 0, e: 'Distribute.' },
      { q: '"4 more than twice n"', o: ['2n + 4', '4n + 2', '2(n + 4)', 'n + 8'], a: 0, e: 'Twice, then add.' }, { q: 'Coefficient in −7y', o: ['−7', '7', 'y', '−y'], a: 0, e: 'Number part.' },
      { q: '7x + 3y − 2x + y', o: ['5x + 4y', '9x + 4y', '5x + 3y', '9xy'], a: 0, e: 'Group.' }, { q: '3n + 1 for n = 5', o: ['16', '15', '31', '9'], a: 0, e: '15 + 1.' },
      { q: 'Cost of k pens at ₹12', o: ['12k', 'k + 12', '12/k', 'k − 12'], a: 0, e: 'Multiply.' }, { q: 'a − (b − c)', o: ['a − b + c', 'a − b − c', 'a + b − c', 'a + b + c'], a: 0, e: 'Signs flip.' },
      { q: '2n means', o: ['2 × n', '2 + n', '20 + n', 'n²'], a: 0, e: 'Product.' }
    ],
    teach: {
      outcomes: ['Use letters for numbers', 'Write and evaluate expressions', 'Combine like terms and expand'],
      periods: [{ t: 'Letter-numbers', flow: [['10 min', 'Age puzzles.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Write rules.']] }, { t: 'Simplifying', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Expanding brackets.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['3x + 2y = 5xy.', '2n as 20-something.'], activities: ['Matchstick patterns.', 'Algebra tiles.'],
      exit: ['Rule for 5, 9, 13…', 'Simplify 6p − 2q + p + 5q.', 'Evaluate 3m² for m = 4.'], homework: 'Find a pattern in a calendar and describe it with a letter (e.g., n, n + 1, n + 7, n + 8 add to 4n + 16).'
    },
    slides: [{ t: 'Expressions using Letter-Numbers', b: ['Letters for numbers', 'Writing expressions', 'Evaluating', 'Like terms', 'Expanding'] }, { t: 'Check yourself', b: ['Simplify 9a − 4a + 2b?', 'Expand 3(4x − 1)?'] }],
    fs: { groups: [['Writing', [['5 more than n', 'n + 5'], ['twice n minus 3', '2n − 3'], ['square of side s', '4s']]], ['Simplifying', [['Like terms', '3x + 5x = 8x'], ['Unlike', '3x + 2y stays'], ['a(b + c)', 'ab + ac']]], ['Evaluating', [['Substitute', 'then order of operations']]]],
      ex: [['5a − 2b, a = 3, b = 2', '11'], ['7x + 3y − 2x + y', '5x + 4y']], rem: ['Only like terms combine.', '2n = 2 × n.', 'Check by substituting a number.'] }
  });
})();
