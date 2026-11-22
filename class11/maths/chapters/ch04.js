/*
TOOL:    class11_maths_ch04
FAMILY:  CBSE_REVISION / Class 11 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 4 Complex Numbers and Quadratic Equations - revise, exam focus, 2 explore panels (Argand plane, powers of i), 7 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { F, Q, C, num, gcd } = G9;
  const cx = (a, b) => { if (b === 0) return num(a); const bs = Math.abs(b) === 1 ? 'i' : num(Math.abs(b)) + 'i'; if (a === 0) return (b < 0 ? '−' : '') + bs; return `${num(a)} ${b < 0 ? '−' : '+'} ${bs}`; };
  const cxQ = (an, bn, d) => { // (an + bn i)/d reduced
    const ra = Q(an, d), rb = Q(Math.abs(bn), d); if (bn === 0) return ra; return `${an === 0 ? '' : ra + ' '}${bn < 0 ? '−' : an === 0 ? '' : '+'} ${rb === '1' ? '' : rb}i`.trim(); };

  G9.register({
    no: 4, part: 'Unit II · Algebra (25 marks)', short: 'Complex numbers', title: 'Complex Numbers and Quadratic Equations',
    blurb: 'i² = −1, algebra of complex numbers, conjugate, modulus, Argand plane, quadratics with negative discriminant.',
    revise: {
      oneLine: 'Adding a number i with i² = −1 gives the complex numbers a + ib. They can be added, multiplied and divided like binomials, plotted as points of a plane, and they let every quadratic equation have roots.',
      sections: [
        { h: 'Complex numbers', html: `<p>z = a + ib: a = Re z, b = Im z. Two complex numbers are equal when both real and imaginary parts are equal.</p>
          <p>Powers of i repeat with period 4: i, −1, −i, 1. So i<sup>4k+r</sup> = i<sup>r</sup>.</p>
          <p>Caution: √a·√b = √(ab) fails when both a, b are negative: √(−4)·√(−9) = 2i·3i = −6, not 6.</p>` },
        { h: 'Algebra', html: `<p>(a + ib) ± (c + id) = (a ± c) + i(b ± d); (a + ib)(c + id) = (ac − bd) + i(ad + bc).</p>
          <p><b>Conjugate</b> z̄ = a − ib; z·z̄ = a² + b² = |z|². <b>Inverse</b>: 1/z = z̄/|z|². To divide, multiply top and bottom by the conjugate of the denominator.</p>` },
        { h: 'Modulus and Argand plane', html: `<p>Plot z = a + ib as the point (a, b). |z| = √(a² + b²) is its distance from the origin; z̄ is the mirror image in the real axis. |z₁z₂| = |z₁||z₂|.</p>
          <p>Polar form (useful): z = r(cos θ + i sin θ), r = |z|, θ = arg z with tan θ = b/a, choosing θ by the quadrant of (a, b).</p>` },
        { h: 'Quadratic equations', html: `<p>For ax² + bx + c = 0 with real coefficients and D = b² − 4ac &lt; 0:</p><div class="box m">x = ${F('−b ± i√(4ac − b²)', '2a')}</div><p>The roots are conjugates of each other.</p>` }
      ],
      formulas: [['i²', '−1; powers repeat every 4'], ['Product', '(a + ib)(c + id) = (ac − bd) + i(ad + bc)'], ['Conjugate', 'z̄ = a − ib, z z̄ = |z|²'], ['Inverse', '1/z = z̄/|z|²'], ['Modulus', '|a + ib| = √(a² + b²)'], ['Roots (D < 0)', '(−b ± i√(−D))/2a']],
      terms: [['Real part / imaginary part', 'a and b in a + ib'], ['Purely imaginary', 'a = 0, b ≠ 0'], ['Argand plane', 'complex plane: real axis and imaginary axis'], ['Conjugate', 'a − ib']],
      traps: ['i² = −1, not 1.', '√(−a)·√(−b) ≠ √(ab).', 'The imaginary part of 3 − 4i is −4, not −4i.', 'Dividing without multiplying by the conjugate of the denominator.'],
      board: '<p><b>Unit II (Algebra) — 25 marks</b> (Ch 4–8). Expect: powers of i, simplifying products/quotients to a + ib, modulus and conjugate (1–3 marks), and solving quadratics with D &lt; 0.</p>',
      bridge: '<p>Class 10 Ch 4 said "no real roots" when D &lt; 0 — here those roots are complex.</p>'
    },

    explore: [
      {
        title: 'Argand plane', intro: 'Drag z₁ and z₂. See the conjugate, the modulus, the sum (parallelogram) and the product (lengths multiply, angles add).',
        build(el, K) {
          const b = new K.Board(el, { xmin: -8, xmax: 8, ymin: -6, ymax: 6 }); const rd = K.read(el);
          const z1 = b.addPt(3, 2, { label: 'z₁', snap: 0.5, color: C.blue }), z2 = b.addPt(1, -2, { label: 'z₂', snap: 0.5 });
          let mode = 0; const row = K.row(el); K.select(row, 'Show', ['conjugate and modulus', 'sum z₁ + z₂', 'product z₁ z₂'], i => { mode = i; b.redraw(); });
          b.onDraw = () => {
            b.base(); const [a, c] = [z1.x, z1.y], [p, q] = [z2.x, z2.y];
            b.line(0, 0, a, c, { color: C.blue, w: 2 }); b.line(0, 0, p, q, { color: C.orange, w: 2 });
            let msg = `z₁ = ${cx(a, c)}, z₂ = ${cx(p, q)} · |z₁| = ${num(Math.hypot(a, c), 3)}, |z₂| = ${num(Math.hypot(p, q), 3)}<br>`;
            if (mode === 0) { b.dot(a, -c, { color: C.purple, label: 'z̄₁', r: 5 }); b.line(a, c, a, -c, { color: C.grey, w: 1, dash: [4, 4] }); msg += `z̄₁ = ${cx(a, -c)} (mirror in the real axis) · z₁z̄₁ = ${num(a * a + c * c)} = |z₁|²`; }
            if (mode === 1) { b.poly([[0, 0], [a, c], [a + p, c + q], [p, q]], { color: C.grey, w: 1, dash: [4, 4] }); b.dot(a + p, c + q, { color: C.purple, label: 'z₁ + z₂', r: 5 }); msg += `z₁ + z₂ = ${cx(a + p, c + q)} (parallelogram rule)`; }
            if (mode === 2) { const re = a * p - c * q, im = a * q + c * p; b.dot(re, im, { color: C.purple, label: 'z₁z₂', r: 5 }); b.line(0, 0, re, im, { color: C.purple, w: 2 });
              const ar = (x, y) => num(Math.atan2(y, x) * 180 / Math.PI, 1); msg += `z₁z₂ = ${cx(re, im)} · |z₁z₂| = ${num(Math.hypot(re, im), 3)} = |z₁||z₂| · arg: ${ar(a, c)}° + ${ar(p, q)}° = ${ar(re, im)}° (mod 360°)`; }
            b.drawPts(); rd.innerHTML = msg;
          };
          b.redraw(); return null;
        }
      },
      {
        title: 'Powers of i go round in a circle', intro: 'Each <kbd>S</kbd> multiplies by i — a quarter turn anticlockwise.',
        build(el, K) {
          const b = new K.Board(el, { xmin: -2, xmax: 2, ymin: -1.6, ymax: 1.6, axes: true, grid: 0.5 }); const rd = K.read(el);
          const an = new K.Anim(12, () => b.redraw(), { ms: 800 }); const vals = [[1, 0, '1'], [0, 1, 'i'], [-1, 0, '−1'], [0, -1, '−i']];
          b.onDraw = () => { b.base(); b.circle(0, 0, 1, { color: C.grey, w: 1.5 }); const k = an.i % 4; vals.forEach((v, j) => b.dot(v[0], v[1], { color: j === k ? C.orange : C.grey, r: j === k ? 8 : 4, label: v[2] }));
            rd.innerHTML = `i<sup>${an.i}</sup> = <b>${vals[k][2]}</b> · exponent ${an.i} leaves remainder ${k} on division by 4`; };
          K.anim(el, an); b.redraw(); return an;
        }
      }
    ],

    gens: [
      { title: 'Powers of i', levels: [1, 2], gen(R) {
          const n = R.int(5, 120) * R.pick([1, -1]); const r = ((n % 4) + 4) % 4; const v = ['1', 'i', '−1', '−i'][r];
          return { q: `Evaluate i<sup>${n}</sup>.`, a: v, s: `${n} = 4k + ${r}` };
        } },
      { title: 'Add and multiply', gen(R) {
          const a = R.int(-6, 6), b = R.nz(-6, 6), c = R.int(-6, 6), d = R.nz(-6, 6);
          return { q: `Express in the form a + ib: (${cx(a, b)})(${cx(c, d)}) and (${cx(a, b)}) − (${cx(c, d)}).`, a: `${cx(a * c - b * d, a * d + b * c)}; ${cx(a - c, b - d)}`, s: `(ac − bd) + i(ad + bc)` };
        } },
      { title: 'Divide / inverse', levels: [2, 3], gen(R) {
          const a = R.int(-5, 5), b = R.nz(-5, 5), c = R.int(-5, 5), d = R.nz(-5, 5); const m = c * c + d * d;
          if (R.chance(.4)) { const m2 = a * a + b * b; return { q: `Find the multiplicative inverse of ${cx(a, b)}.`, a: cxQ(a, -b, m2), s: `z̄/|z|² = (${cx(a, -b)})/${m2}` }; }
          return { q: `Express (${cx(a, b)}) ÷ (${cx(c, d)}) in the form a + ib.`, a: cxQ(a * c + b * d, b * c - a * d, m), s: `multiply by (${cx(c, -d)}); denominator ${m}` };
        } },
      { title: 'Modulus and conjugate', gen(R) {
          const T = R.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]]); const a = T[0] * R.sign(), b = T[1] * R.sign();
          return { q: `For z = ${cx(a, b)}, find z̄, |z| and z z̄.`, a: `z̄ = ${cx(a, -b)}, |z| = ${T[2]}, z z̄ = ${T[2] * T[2]}`, ans: T[2], s: `√(${a * a} + ${b * b})` };
        } },
      { title: 'Quadratic with D < 0', gen(R, L) {
          let a, b, c, D; do { a = R.int(1, L === 1 ? 1 : 3); b = R.int(-6, 6); c = R.int(1, 12); D = b * b - 4 * a * c; } while (D >= 0);
          const s = G9.surd(-D); const g = gcd(gcd(Math.abs(b), s.o), 2 * a); const im = (s.o / g === 1 ? '' : s.o / g) + (s.i === 1 ? '' : '√' + s.i);
          return { q: `Solve ${G9.terms([[a, 'x²'], [b, 'x'], [c, '']])} = 0.`, a: `x = ${F(`${-b / g === 0 ? '' : num(-b / g) + ' '}± ${im || 1}i`, 2 * a / g)}`.replace('<span><span>', '<span><span>'), s: `D = ${D} < 0; x = (${-b} ± i√${-D}) / ${2 * a}` };
        } },
      { title: 'Equality of complex numbers', levels: [2, 3], gen(R) {
          const x = R.int(-5, 5), y = R.int(-5, 5), p = R.int(1, 4), q = R.int(1, 4);
          return { q: `Find real x and y if (${p}x + ${q}) + i(${q}y − ${p}) = ${cx(p * x + q, q * y - p)}.`, a: `x = ${x}, y = ${y}`, s: 'Equate real parts and imaginary parts.' };
        } },
      { title: 'Square root pitfall', levels: [1], gen(R) {
          const a = R.int(2, 6), b = R.int(2, 6);
          return { q: `Evaluate √(−${a * a}) × √(−${b * b}).`, a: `${-a * b} (not ${a * b})`, ans: -a * b, s: `${a}i × ${b}i = ${a * b}i² = ${-a * b}` };
        } }
    ],

    quiz: [
      { q: 'i⁹⁹ =', o: ['i', '−1', '−i', '1'], a: 2, e: '99 = 4·24 + 3.' },
      { q: '(2 + 3i)(1 − i) =', o: ['5 + i', '−1 + i', '5 − i', '2 − 3i'], a: 0, e: '2 − 2i + 3i − 3i² = 5 + i.' },
      { q: '|3 − 4i| =', o: ['5', '7', '1', '25'], a: 0, e: '√(9 + 16).' },
      { q: 'Conjugate of −2 + 5i', o: ['2 − 5i', '−2 − 5i', '2 + 5i', '5 − 2i'], a: 1, e: 'Change the sign of the imaginary part.' },
      { q: '1/i =', o: ['i', '−i', '1', '−1'], a: 1, e: 'Multiply by −i/−i.' },
      { q: 'Roots of x² + 4 = 0', o: ['±2', '±2i', '±4i', '2, −4'], a: 1, e: 'x² = −4.' },
      { q: 'z z̄ for z = a + ib equals', o: ['a² − b²', 'a² + b²', '2a', '2ib'], a: 1, e: '|z|².' },
      { q: 'Imaginary part of 4 − 7i', o: ['−7i', '−7', '7', '4'], a: 1, e: 'A real number.' },
      { q: '√(−9) × √(−16) =', o: ['12', '−12', '12i', '−12i'], a: 1, e: '3i × 4i.' },
      { q: 'In the Argand plane, z̄ is the reflection of z in', o: ['the imaginary axis', 'the real axis', 'the origin', 'y = x'], a: 1, e: '(a, b) → (a, −b).' },
      { q: 'If D < 0 for a quadratic with real coefficients, the roots are', o: ['real and equal', 'complex conjugates', 'irrational', 'zero'], a: 1, e: '(−b ± i√−D)/2a.' }
    ],

    teach: {
      outcomes: ['Use i² = −1 and powers of i', 'Add, multiply and divide complex numbers', 'Find conjugate, modulus and plot in the Argand plane', 'Solve quadratics with negative discriminant'],
      periods: [
        { t: 'The number i', flow: [['10 min', 'Why x² + 1 = 0 needs a new number.'], ['15 min', 'Explore panel 2: powers of i.'], ['15 min', 'Equality and addition.']] },
        { t: 'Algebra and the plane', flow: [['15 min', 'Multiplication and division by the conjugate.'], ['15 min', 'Explore panel 1: Argand plane.'], ['10 min', 'Practice.']] },
        { t: 'Quadratics', flow: [['20 min', 'Solving with D < 0.'], ['10 min', 'Square-root pitfall.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['i² = 1.', '√(−a)√(−b) = √(ab).', 'Imaginary part includes i.'],
      activities: ['Rotation by 90° on graph paper = multiplication by i.', 'Card sort: z, z̄, |z| triples.'],
      exit: ['i⁵⁷.', '(1 + i)/(1 − i) as a + ib.', 'Solve x² + x + 1 = 0.'],
      homework: 'Show that (1 + i)⁴ = −4 and hence find (1 + i)⁸.'
    },

    slides: [
      { t: 'Complex Numbers and Quadratic Equations', b: ['i² = −1', 'Algebra of complex numbers', 'Modulus, conjugate, Argand plane', 'Quadratics with D < 0'] },
      { t: 'Algebra', b: ['(a + ib)(c + id) = (ac − bd) + i(ad + bc)', 'Divide: multiply by the conjugate', '1/z = z̄/|z|²'] },
      { t: 'Argand plane', b: ['z = a + ib ↔ (a, b)', '|z| = distance from O', 'z̄: mirror in the real axis'] },
      { t: 'Quadratics', b: ['D < 0 ⇒ x = (−b ± i√−D)/2a', 'Roots are conjugates'] },
      { t: 'Check yourself', b: ['i¹⁰²?', '|−5 + 12i|?', 'Answers: −1 · 13'] }
    ],

    fs: { groups: [
        ['Basics', [['i', 'i² = −1'], ['Powers', 'i, −1, −i, 1 repeat (period 4)'], ['z = a + ib', 'Re z = a, Im z = b'], ['Equality', 'real and imaginary parts equal']]],
        ['Operations', [['Sum', '(a + c) + i(b + d)'], ['Product', '(ac − bd) + i(ad + bc)'], ['Quotient', 'multiply by conjugate of denominator'], ['Inverse', '1/z = z̄/|z|²']]],
        ['Conjugate and modulus', [['z̄', 'a − ib'], ['|z|', '√(a² + b²)'], ['z z̄', '|z|²'], ['|z₁z₂|', '|z₁||z₂|'], ['Polar form', 'r(cos θ + i sin θ)']]],
        ['Quadratics', [['D < 0', 'x = (−b ± i√(−D))/2a'], ['Roots', 'complex conjugate pair'], ['Pitfall', '√(−a)√(−b) = −√(ab) for a, b > 0']]]],
      ex: [['(3 + 2i)/(1 − i)', '(3 + 2i)(1 + i)/2 = (1 + 5i)/2'], ['x² + 2x + 5 = 0', 'x = −1 ± 2i']],
      rem: ['Always end in the form a + ib.', 'Im(a + ib) is b (no i).', 'Divide by multiplying with the conjugate.'] }
  });
})();
