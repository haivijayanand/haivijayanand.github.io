/*
TOOL:    class8_maths_ch06
FAMILY:  CBSE_REVISION / Class 8 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class VIII moved into the series
CHANGES: 1.0.0 - Part I Ch 6 We Distribute, Yet Things Multiply - revise, 2 explore panels (area model of identities, quick multiplication), 7 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num, terms } = G9;

  G9.register({
    no: 6, part: 'Part I', short: 'Distributive law', title: 'We Distribute, Yet Things Multiply',
    blurb: 'The distributive property a(b + c) = ab + ac, how products change, quick multiplication, and the identities (a + b)², (a − b)², (a + b)(a − b).',
    revise: {
      oneLine: 'One rule, a(b + c) = ab + ac, multiplies sums. Applied twice it gives (a + b)(c + d) = ac + ad + bc + bd and the three identities that make mental multiplication and squaring fast.',
      sections: [
        { h: 'Distributing', html: `<p>a(b + c) = ab + ac; a(b − c) = ab − ac. (a + b)(c + d) = ac + ad + bc + bd — every term of one bracket times every term of the other (area of a rectangle cut into four parts).</p>
          <p>How products change: (a + 1)b = ab + b — increasing one factor by 1 adds the other factor.</p>` },
        { h: 'Identities', html: `<div class="box m">(a + b)² = a² + 2ab + b² · (a − b)² = a² − 2ab + b² · (a + b)(a − b) = a² − b²</div>
          <p>(x + a)(x + b) = x² + (a + b)x + ab.</p>` },
        { h: 'Quick calculation', html: `<p>103² = (100 + 3)² = 10000 + 600 + 9 = 10609. 98 × 102 = 100² − 2² = 9996. 47² = (50 − 3)² = 2500 − 300 + 9 = 2209. 25 × 48 = 25 × 4 × 12 = 1200.</p>` }
      ],
      formulas: [['Distributive', 'a(b + c) = ab + ac'], ['Two brackets', '(a + b)(c + d) = ac + ad + bc + bd'], ['(a + b)²', 'a² + 2ab + b²'], ['(a − b)²', 'a² − 2ab + b²'], ['(a + b)(a − b)', 'a² − b²'], ['(x + a)(x + b)', 'x² + (a + b)x + ab']],
      terms: [['Expand', 'remove brackets by multiplying out'], ['Identity', 'true for every value of the letters'], ['Like terms', 'same letters and powers'], ['Coefficient', 'number multiplying a term']],
      traps: ['(a + b)² ≠ a² + b² — the 2ab term is missing.', 'Sign errors: −(b − c) = −b + c.', '(a − b)² ≠ a² − b².', 'Forgetting to multiply the second term of the first bracket.'],
      bridge: '<p>Class 9 Ch 4 (Algebraic Identities) adds three-term and cubic identities and factorisation.</p>'
    },

    explore: [
      {
        title: 'Area model of the identities', intro: 'Set a and b. The square of side a + b splits into a², b² and two rectangles ab. Switch to (a + b)(a − b).',
        build(el, K) {
          let a = 5, b = 2, m = 0; const row = K.row(el); K.slider(row, 'a', 2, 8, 1, a, v => { a = v; bd.redraw(); }); K.slider(row, 'b', 1, 4, 1, b, v => { b = v; bd.redraw(); }); K.select(row, 'identity', ['(a + b)²', '(a − b)²', '(a + b)(a − b)'], i => { m = i; bd.redraw(); });
          const bd = new K.Board(el, { xmin: -1, xmax: 14, ymin: -1, ymax: 13, axes: false, grid: 0 }); const rd = K.read(el);
          bd.onDraw = () => { bd.clear();
            if (m === 0) { bd.rect(0, 0, a, a, { fill: C.blueL, color: C.blue, w: 2 }); bd.rect(a, 0, b, a, { fill: 'rgba(234,88,12,.25)', color: C.orange, w: 2 }); bd.rect(0, a, a, b, { fill: 'rgba(234,88,12,.25)', color: C.orange, w: 2 }); bd.rect(a, a, b, b, { fill: 'rgba(124,58,237,.25)', color: C.purple, w: 2 });
              bd.text(a / 2, a / 2, 'a²', { font: 'bold 18px' }); bd.text(a + b / 2, a / 2, 'ab', { font: 'bold 14px' }); bd.text(a / 2, a + b / 2, 'ab', { font: 'bold 14px' }); bd.text(a + b / 2, a + b / 2, 'b²', { font: 'bold 14px' });
              rd.innerHTML = `(${a} + ${b})² = ${a}² + 2·${a}·${b} + ${b}² = ${a * a} + ${2 * a * b} + ${b * b} = <b>${(a + b) ** 2}</b>`; }
            if (m === 1) { bd.rect(0, 0, a, a, { color: C.ink, w: 2 }); bd.rect(0, 0, a - b, a - b, { fill: C.blueL, color: C.blue, w: 3 }); bd.rect(a - b, 0, b, a, { fill: 'rgba(234,88,12,.2)', color: C.orange, w: 2 }); bd.rect(0, a - b, a, b, { fill: 'rgba(234,88,12,.2)', color: C.orange, w: 2, dash: [5, 3] });
              rd.innerHTML = `(a − b)² = a² − 2ab + b²: from the big square remove two strips ab (they overlap in b², so add it back) · (${a} − ${b})² = ${a * a} − ${2 * a * b} + ${b * b} = <b>${(a - b) ** 2}</b>`; }
            if (m === 2) { bd.rect(0, 0, a, a, { color: C.ink, w: 1, dash: [4, 4] }); bd.rect(a - b, a - b, b, b, { fill: 'rgba(124,58,237,.25)', color: C.purple, w: 2 }); bd.rect(0, 0, a, a - b, { fill: C.blueL, color: C.blue, w: 2 }); bd.rect(0, a - b, a - b, b, { fill: 'rgba(234,88,12,.25)', color: C.orange, w: 2 });
              rd.innerHTML = `a² − b² (blue + orange) rearranges into a rectangle (a + b) × (a − b): move the orange strip to the right of the blue one · ${a}² − ${b}² = ${a * a - b * b} = ${a + b} × ${a - b}`; }
          };
          bd.redraw(); return null;
        }
      },
      {
        title: 'Quick multiplication', intro: 'Press <kbd>S</kbd> for a new product near a round number; the identity used is shown.',
        build(el, K) {
          const rd = K.read(el); const R = G9.rng(G9.newSeed());
          const make = () => { const base = R.pick([20, 30, 50, 100, 1000]), d = R.int(1, base >= 100 ? 9 : 4), t = R.int(0, 2);
            if (t === 0) { const n = base + d * R.sign(); const dd = n - base; rd.innerHTML = `${n}² = (${base} ${dd < 0 ? '−' : '+'} ${Math.abs(dd)})² = ${base * base} ${dd < 0 ? '−' : '+'} ${Math.abs(2 * base * dd)} + ${dd * dd} = <b>${n * n}</b>`; }
            else if (t === 1) rd.innerHTML = `${base + d} × ${base - d} = ${base}² − ${d}² = ${base * base} − ${d * d} = <b>${(base + d) * (base - d)}</b>`;
            else { const e = R.int(1, 9); rd.innerHTML = `${base + d} × ${base + e} = ${base}² + (${d} + ${e})×${base} + ${d}×${e} = <b>${(base + d) * (base + e)}</b>`; } };
          const row = K.row(el); K.button(row, 'New product (S)', make); make(); return { step: make, play() {}, pause() {} };
        }
      }
    ],

    gens: [
      { title: 'Expand a(b + c)', levels: [1], gen(R) {
          const a = R.nz(-6, 6), b = R.nz(-6, 6), c = R.nz(-9, 9);
          return { q: `Expand ${a}x(${terms([[b, 'x'], [c, '']])}).`, a: terms([[a * b, 'x²'], [a * c, 'x']]) };
        } },
      { title: 'Two brackets', gen(R) {
          const a = R.nz(-5, 5), b = R.nz(-5, 5), c = R.int(1, 3), d = R.nz(-5, 5);
          return { q: `Expand (${terms([[1, 'x'], [a, '']])})(${terms([[c, 'x'], [d, '']])}).`, a: terms([[c, 'x²'], [d + a * c, 'x'], [a * d, '']]) };
        } },
      { title: 'Use an identity', gen(R) {
          const a = R.int(1, 5), b = R.int(1, 9), t = R.int(0, 2); const A = a === 1 ? 'x' : a + 'x';
          if (t === 0) return { q: `Expand (${A} + ${b})².`, a: terms([[a * a, 'x²'], [2 * a * b, 'x'], [b * b, '']]), s: '(a + b)² = a² + 2ab + b²' };
          if (t === 1) return { q: `Expand (${A} − ${b})².`, a: terms([[a * a, 'x²'], [-2 * a * b, 'x'], [b * b, '']]), s: '(a − b)² = a² − 2ab + b²' };
          return { q: `Expand (${A} + ${b})(${A} − ${b}).`, a: terms([[a * a, 'x²'], [-b * b, '']]), s: 'a² − b²' };
        } },
      { title: 'Square mentally', gen(R) {
          const base = R.pick([30, 50, 70, 100, 200]), d = R.int(1, 5) * R.sign(); const n = base + d;
          return { q: `Find ${n}² using an identity.`, a: String(n * n), ans: n * n, s: `(${base} ${d < 0 ? '−' : '+'} ${Math.abs(d)})²` };
        } },
      { title: 'Product of a sum and a difference', gen(R) {
          const base = R.pick([20, 40, 50, 60, 100]), d = R.int(1, 9);
          return { q: `Evaluate ${base + d} × ${base - d} using an identity.`, a: String(base * base - d * d), ans: base * base - d * d, s: `${base}² − ${d}²` };
        } },
      { title: 'Difference of squares', levels: [2, 3], gen(R) {
          const a = R.int(30, 99), b = R.int(10, a - 1); return { q: `Evaluate ${a}² − ${b}².`, a: String(a * a - b * b), ans: a * a - b * b, s: `(${a} + ${b})(${a} − ${b}) = ${a + b} × ${a - b}` };
        } },
      { title: 'Use given values', levels: [3], gen(R) {
          const a = R.int(2, 9), b = R.int(1, a - 1); const s = a + b, p = a * b;
          return R.chance(.5) ? { q: `If a + b = ${s} and ab = ${p}, find a² + b².`, a: String(s * s - 2 * p), ans: s * s - 2 * p, s: '(a + b)² − 2ab' }
            : { q: `If a − b = ${a - b} and ab = ${p}, find a² + b².`, a: String((a - b) ** 2 + 2 * p), ans: (a - b) ** 2 + 2 * p, s: '(a − b)² + 2ab' };
        } }
    ],

    quiz: [
      { q: '(a + b)² =', o: ['a² + 2ab + b²', 'a² + b²', 'a² + ab + b²', '2a + 2b'], a: 0, e: 'Area model.' },
      { q: '(x − 3)² =', o: ['x² − 6x + 9', 'x² − 9', 'x² + 9', 'x² − 3x + 9'], a: 0, e: 'Identity.' },
      { q: '(a + b)(a − b) =', o: ['a² − b²', 'a² + b²', '(a − b)²', '2ab'], a: 0, e: 'Identity.' },
      { q: '99 × 101 =', o: ['9999', '10001', '9899', '10099'], a: 0, e: '100² − 1.' },
      { q: '3x(2x − 5) =', o: ['6x² − 15x', '6x − 15', '5x² − 15x', '6x² − 5'], a: 0, e: 'Distribute.' },
      { q: '52² =', o: ['2704', '2504', '2604', '2804'], a: 0, e: '2500 + 200 + 4.' },
      { q: '(x + 2)(x + 5) =', o: ['x² + 7x + 10', 'x² + 10x + 7', 'x² + 7', 'x² + 10'], a: 0, e: 'x² + (a + b)x + ab.' },
      { q: '65² − 35² =', o: ['3000', '900', '1000', '2500'], a: 0, e: '100 × 30.' },
      { q: 'If a + b = 7, ab = 10, then a² + b² =', o: ['29', '49', '39', '20'], a: 0, e: '49 − 20.' },
      { q: '(a + 1)b − ab =', o: ['b', 'a', '1', 'ab'], a: 0, e: 'Distribute.' },
      { q: '−(x − y) =', o: ['−x + y', '−x − y', 'x − y', 'x + y'], a: 0, e: 'Distribute −1.' }
    ],

    teach: {
      outcomes: ['Apply the distributive law', 'Multiply two binomials', 'Use the three standard identities', 'Calculate mentally with identities'],
      periods: [
        { t: 'Distributive law', flow: [['10 min', 'Rectangle areas cut into parts.'], ['15 min', 'Expansions and sign rules.'], ['15 min', 'Practice.']] },
        { t: 'Identities', flow: [['15 min', 'Explore panel 1: area models.'], ['15 min', 'Explore panel 2: quick products.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['(a + b)² = a² + b².', 'Sign errors with negative brackets.'],
      activities: ['Paper-cutting proof of (a + b)².', 'Mental maths race with identities.'],
      exit: ['Expand (2x + 3)².', '104 × 96.', '(x + 4)(x − 7).'],
      homework: 'Show that (3x + 7)² − 84x = (3x − 7)². Use identities to find 9.8² and 1.02 × 0.98.'
    },

    slides: [
      { t: 'We Distribute, Yet Things Multiply', b: ['Distributive law', 'Multiplying brackets', 'Identities', 'Quick calculation'] },
      { t: 'Identities', b: ['(a + b)² = a² + 2ab + b²', '(a − b)² = a² − 2ab + b²', '(a + b)(a − b) = a² − b²'] },
      { t: 'Mental maths', b: ['103² = 10609', '98 × 102 = 9996', '47² = 2209'] },
      { t: 'Check yourself', b: ['(x + 6)²?', '51 × 49?', 'Answers: x² + 12x + 36 · 2499'] }
    ],

    fs: { groups: [
        ['Distributive law', [['a(b + c)', 'ab + ac'], ['a(b − c)', 'ab − ac'], ['(a + b)(c + d)', 'ac + ad + bc + bd'], ['−(b − c)', '−b + c']]],
        ['Identities', [['(a + b)²', 'a² + 2ab + b²'], ['(a − b)²', 'a² − 2ab + b²'], ['(a + b)(a − b)', 'a² − b²'], ['(x + a)(x + b)', 'x² + (a + b)x + ab']]],
        ['Useful forms', [['a² + b²', '(a + b)² − 2ab = (a − b)² + 2ab'], ['(a + b)² − (a − b)²', '4ab']]],
        ['Quick products', [['(100 + d)²', '10000 + 200d + d²'], ['(n + d)(n − d)', 'n² − d²'], ['a² − b²', '(a + b)(a − b)']]]],
      ex: [['(2x − 5)²', '4x² − 20x + 25'], ['997 × 1003', '10⁶ − 9 = 999 991']],
      rem: ['Square of a sum has a middle term.', 'Watch the signs.', 'Look for a round number.'] }
  });
})();
