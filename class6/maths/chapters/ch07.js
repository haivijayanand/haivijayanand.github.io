/*
TOOL:    class6_maths_ch07
FAMILY:  CBSE_REVISION / Class 6 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 7 Fractions (fractional units, number line, mixed fractions, equivalent fractions, lowest terms, comparing, adding and subtracting unlike fractions) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const gcd = (a, b) => b ? gcd(b, a % b) : a, lcm = (a, b) => a * b / gcd(a, b);
  const simp = (n, d) => { const g = gcd(n, d); return `${n / g}/${d / g}`; };
  G9.register({
    no: 7, part: 'All chapters', short: 'Fractions', title: 'Fractions',
    blurb: 'Fractional units and fractions as equal shares, fractions on the number line, mixed fractions, equivalent fractions and lowest terms, comparing fractions, and adding and subtracting fractions with different denominators (using the LCM).',
    revise: {
      oneLine: '3/5 means three units of 1/5. Equivalent fractions name the same point on the number line: 2/3 = 4/6 = 6/9. To add or compare unlike fractions, rewrite them with a common denominator (the LCM): 2/3 + 1/4 = 8/12 + 3/12 = 11/12.',
      sections: [
        { h: 'Number line', html: `<p>Divide 0–1 into d equal parts; n parts from 0 is n/d. Fractions greater than 1: 7/4 = 1¾.</p>` },
        { h: 'Lowest terms', html: `<p>Divide top and bottom by their HCF: 18/24 = 3/4.</p>` },
        { h: 'Adding and subtracting', html: `<p>5/6 − 1/4 = 10/12 − 3/12 = 7/12.</p>` }
      ],
      formulas: [['Equivalent', 'a/b = ak/bk'], ['Lowest terms', 'divide by HCF'], ['a/b + c/d', 'use LCM of b, d'], ['Compare', 'common denominator or cross-multiply']],
      terms: [['Fractional unit', '1/n'], ['Mixed fraction', 'whole + proper fraction'], ['Lowest terms', 'HCF of top and bottom is 1']],
      traps: ['Adding tops and bottoms: 1/2 + 1/3 ≠ 2/5.', 'Bigger denominator ≠ bigger fraction.', 'Changing only one of numerator/denominator.'],
      bridge: '<p>Class 7 multiplies and divides fractions.</p>'
    },
    explore: [
      { title: 'Fractions on a number line', intro: 'Choose the denominator and numerator; equivalent forms are listed.',
        build(el, K) { let d = 4, n = 7; const row = K.row(el); K.slider(row, 'denominator', 2, 12, 1, d, v => { d = v; b.redraw(); }); K.slider(row, 'numerator', 0, 24, 1, n, v => { n = v; b.redraw(); });
          const b = new K.Board(el, { xmin: -0.1, xmax: 2.1, ymin: -0.5, ymax: 0.6, axes: false, grid: 0, aspect: 0.22 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.line(0, 0, 2, 0, { color: C.ink, w: 2 }); for (let i = 0; i <= 2 * d; i++) b.line(i / d, -0.06, i / d, 0.06, { color: C.ink, w: i % d ? 1 : 3 }); [0, 1, 2].forEach(k => b.text(k, -0.25, String(k), { font: 'bold 13px' })); const x = Math.min(n / d, 2); b.dot(x, 0, { r: 8 }); b.text(x, 0.3, `${n}/${d}`, { font: 'bold 14px' });
            const w = Math.floor(n / d), r = n % d; rd.innerHTML = `${n}/${d}${w && r ? ` = ${w} ${r}/${d}` : w && !r ? ` = ${w}` : ''} · lowest terms ${n ? simp(n, d) : '0'} · equivalent: ${[2, 3, 4].map(k => `${n * k}/${d * k}`).join(', ')}`; };
          b.redraw(); return null; } },
      { title: 'Add unlike fractions', intro: 'Two fractions are rewritten over the LCM of their denominators.',
        build(el, K) { let a = 2, b1 = 3, c = 1, d = 4, op = 0; const row = K.row(el); K.slider(row, 'a', 1, 9, 1, a, v => { a = v; draw(); }); K.slider(row, 'b', 2, 10, 1, b1, v => { b1 = v; draw(); }); K.slider(row, 'c', 1, 9, 1, c, v => { c = v; draw(); }); K.slider(row, 'd', 2, 10, 1, d, v => { d = v; draw(); }); K.select(row, 'op', ['+', '−'], i => { op = i; draw(); }); const rd = K.read(el);
          function draw() { const L = lcm(b1, d), A = a * L / b1, Cc = c * L / d, R = op ? A - Cc : A + Cc; rd.innerHTML = `<div style="font-size:20px">${a}/${b1} ${op ? '−' : '+'} ${c}/${d} = ${A}/${L} ${op ? '−' : '+'} ${Cc}/${L} = <b>${R}/${L}</b>${R && gcd(Math.abs(R), L) > 1 ? ` = <b>${R < 0 ? '−' : ''}${simp(Math.abs(R), L)}</b>` : ''}</div>LCM(${b1}, ${d}) = ${L} · ${a}/${b1} = ${A}/${L}, ${c}/${d} = ${Cc}/${L}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Lowest terms', gen(R) { const t = R.pick([[3, 4], [2, 5], [5, 6], [3, 8], [4, 9], [7, 10]]), k = R.int(2, 9); return { q: `Write ${t[0] * k}/${t[1] * k} in lowest terms.`, a: `${t[0]}/${t[1]}` }; } },
      { title: 'Mixed and improper', gen(R) { const d = R.int(2, 9), w = R.int(1, 5), r = R.int(1, d - 1); return R.chance(.5) ? { q: `${w * d + r}/${d} as a mixed fraction?`, a: `${w} ${r}/${d}` } : { q: `${w} ${r}/${d} as an improper fraction?`, a: `${w * d + r}/${d}` }; } },
      { title: 'Compare', gen(R) { const a = R.int(1, 8), b = R.int(a + 1, 9), c = R.int(1, 8), d = R.int(c + 1, 9); const x = a * d, y = c * b; return { q: `${a}/${b} __ ${c}/${d}`, a: x > y ? '>' : x < y ? '<' : '=', s: `${a} × ${d} = ${x}, ${c} × ${b} = ${y}` }; } },
      { title: 'Add unlike', levels: [2, 3], gen(R) { const b = R.pick([2, 3, 4, 5, 6]), d = R.pick([3, 4, 6, 8]), a = R.int(1, b - 1), c = R.int(1, d - 1); const L = lcm(b, d), N = a * L / b + c * L / d; return { q: `${a}/${b} + ${c}/${d} = ?`, a: simp(N, L), ans: N / L, tol: 1e-6 }; } },
      { title: 'Subtract unlike', levels: [2, 3], gen(R) { const b = R.pick([2, 3, 4, 6]), d = R.pick([4, 5, 8, 12]), a = R.int(1, b - 1), c = R.int(1, d - 1); const L = lcm(b, d); let N = a * L / b - c * L / d; if (N <= 0) return { q: `5/6 − 1/4 = ?`, a: '7/12', ans: 7 / 12, tol: 1e-6 }; return { q: `${a}/${b} − ${c}/${d} = ?`, a: simp(N, L), ans: N / L, tol: 1e-6 }; } }
    ],
    quiz: [
      { q: '2/3 + 1/4', o: ['11/12', '3/7', '3/12', '2/12'], a: 0, e: '8/12 + 3/12.' }, { q: '18/24 lowest', o: ['3/4', '9/12', '6/8', '2/3'], a: 0, e: '÷ 6.' },
      { q: '7/4 =', o: ['1 3/4', '1 4/7', '3/4', '7 1/4'], a: 0, e: '4 + 3.' }, { q: 'Bigger: 3/5 or 5/8', o: ['5/8', '3/5', 'equal', 'cannot tell'], a: 0, e: '24/40 vs 25/40.' },
      { q: '1/2 + 1/3', o: ['5/6', '2/5', '1/5', '2/6'], a: 0, e: '3/6 + 2/6.' }, { q: '5/6 − 1/4', o: ['7/12', '4/2', '1/3', '4/12'], a: 0, e: '10/12 − 3/12.' },
      { q: 'Equivalent to 2/3', o: ['6/9', '4/9', '3/2', '2/6'], a: 0, e: '× 3.' }, { q: '3/5 is how many fifths?', o: ['3', '5', '15', '8'], a: 0, e: 'Units.' },
      { q: 'LCM of 4 and 6', o: ['12', '24', '2', '10'], a: 0, e: 'Smallest common multiple.' }, { q: 'Lowest terms means HCF of top and bottom is', o: ['1', '0', '2', 'the top'], a: 0, e: 'Co-prime.' },
      { q: '2 1/2 =', o: ['5/2', '3/2', '2/5', '21/2'], a: 0, e: '4 + 1.' }
    ],
    teach: {
      outcomes: ['Place fractions on a number line', 'Find equivalent fractions and lowest terms', 'Compare, add and subtract unlike fractions'],
      periods: [{ t: 'Fractions and the number line', flow: [['10 min', 'Fractional units.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Lowest terms.']] }, { t: 'Unlike fractions', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Compare by cross-multiplying.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Adding denominators.', 'Larger denominator larger fraction.'], activities: ['Fraction wall.', 'Number line washing line.'],
      exit: ['3/8 + 1/6.', '20/35 lowest terms.', 'Compare 4/7 and 5/9.'], homework: 'Make a fraction wall for halves to twelfths and use it to find three pairs of equivalent fractions.'
    },
    slides: [{ t: 'Fractions', b: ['Fractional units', 'Number line', 'Equivalent and lowest terms', 'Compare', 'Add and subtract'] }, { t: 'Check yourself', b: ['3/4 + 2/5?', '16/20 lowest?'] }],
    fs: { groups: [['Basics', [['3/5', 'three 1/5 units'], ['7/4', '1 3/4']]], ['Equivalent', [['× or ÷ both', '2/3 = 6/9'], ['Lowest terms', '÷ HCF: 18/24 = 3/4']]], ['Operations', [['Compare', 'common denominator'], ['2/3 + 1/4', '11/12'], ['5/6 − 1/4', '7/12']]]],
      ex: [['1/2 + 1/3', '5/6'], ['3/5 vs 5/8', '3/5 < 5/8']], rem: ['Never add denominators.', 'Use the LCM.', 'Simplify the answer.'] }
  });
})();
