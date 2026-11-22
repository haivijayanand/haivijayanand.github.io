/*
TOOL:    class10_maths_ch04
FAMILY:  CBSE_REVISION / Class 10 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 4 Quadratic Equations - revise, board focus, 2 explore panels (discriminant and parabola, quadratic formula steps), 8 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { F, Q, num, C, terms, gcd, surd } = G9;
  const quad = (a, b, c) => terms([[a, 'x²'], [b, 'x'], [c, '']]);
  const rootsH = (a, b, c) => { const D = b * b - 4 * a * c; if (D < 0) return 'no real roots'; const s = surd(D); if (s.i === 1) { return `${Q(-b + s.o, 2 * a)} and ${Q(-b - s.o, 2 * a)}`; }
    let A2 = 2 * a, B2 = -b; if (A2 < 0) { A2 = -A2; B2 = -B2; } const g = gcd(gcd(Math.abs(B2), s.o), A2); const sq = (s.o / g === 1 ? '' : s.o / g) + '√' + s.i; const den = A2 / g, nb = B2 / g;
    return den === 1 ? `${nb} ± ${sq}` : `${F(`${nb === 0 ? '' : nb + ' '}± ${sq}`, den)}`.replace('(-', '(−'); };

  G9.register({
    no: 4, part: 'Unit II · Algebra (20 marks)', short: 'Quadratic equations', title: 'Quadratic Equations',
    blurb: 'Standard form, solving by factorisation and by the quadratic formula, nature of roots, word problems.',
    revise: {
      oneLine: 'A quadratic equation ax² + bx + c = 0 (a ≠ 0) has at most two roots. Factorise if you can; otherwise use x = (−b ± √D)/2a, where D = b² − 4ac also tells the nature of the roots.',
      sections: [
        { h: 'Standard form', html: `<p>ax² + bx + c = 0 with a ≠ 0. Check by simplifying first: (x + 1)² = 2(x − 3) → x² + 4 = 0 is quadratic; (x − 2)² + 1 = 2x − 3 → x² − 6x + 8 = 0.</p>` },
        { h: 'By factorisation', html: `<p>Split the middle term: find two numbers with product <b>ac</b> and sum <b>b</b>.</p>
          <p class="m">6x² − x − 2 = 0 → ac = −12, numbers −4 and 3 → 6x² − 4x + 3x − 2 = 2x(3x − 2) + 1(3x − 2) = (2x + 1)(3x − 2) ⇒ x = −½, ⅔</p>` },
        { h: 'Quadratic formula', html: `<div class="box m">x = ${F('−b ± √(b² − 4ac)', '2a')}</div>
          <p>Write a, b, c with their signs first, compute D, then substitute.</p>` },
        { h: 'Nature of roots', html: `<table class="t"><tr><th>D = b² − 4ac</th><th>Roots</th></tr><tr><td>D &gt; 0</td><td>two distinct real roots</td></tr><tr><td>D = 0</td><td>two equal real roots, −b/2a</td></tr><tr><td>D &lt; 0</td><td>no real roots</td></tr></table>
          <p>Graphically: the parabola cuts, touches or misses the x-axis.</p>` },
        { h: 'Word problems', html: `<ul><li>Consecutive integers: x, x + 1. Consecutive odd/even: x, x + 2.</li><li>Rectangle: length × breadth = area. Right triangle: Pythagoras.</li><li>Speed/time: time = distance ÷ speed; "takes 1 hour less" gives d/x − d/(x + k) = 1.</li><li>Reject roots that make no sense (negative lengths, ages).</li></ul>` }
      ],
      formulas: [['Standard form', 'ax² + bx + c = 0, a ≠ 0'], ['Discriminant', 'D = b² − 4ac'], ['Roots', 'x = (−b ± √D)/2a'], ['Equal roots', 'D = 0, x = −b/2a'], ['Sum / product of roots', '−b/a, c/a']],
      terms: [['Root', 'value of x that satisfies the equation'], ['Discriminant', 'b² − 4ac'], ['Real roots', 'D ≥ 0'], ['Splitting the middle term', 'writing bx as a sum using product ac']],
      traps: ['Forgetting the sign of b in −b.', 'Dividing both sides by x and losing the root x = 0.', 'Not rejecting a negative length or age.', 'Calling an equation quadratic before simplifying (x² terms may cancel).'],
      board: '<p><b>Unit II (Algebra) — 20 marks.</b> Expect: 1-mark MCQ on nature of roots or k for equal roots; 2–3 marks solving by factorisation/formula; a 3–5 mark word problem (speed–time, area, consecutive numbers). State which root is rejected and why.</p>',
      bridge: '<p>Roots of ax² + bx + c = 0 are the zeroes of the polynomial in Ch 2. Ch 5 uses quadratics to find the number of terms of an AP for a given sum.</p>'
    },

    explore: [
      {
        title: 'Discriminant and the parabola', intro: 'Change a, b, c. D > 0: the curve cuts the x-axis twice; D = 0: touches; D < 0: misses.',
        build(el, K) {
          let a = 1, b_ = -2, c = -3; const row = K.row(el);
          const b = new K.Board(el, { xmin: -8, xmax: 8, ymin: -10, ymax: 10, equal: false, labelStep: 2 }); const rd = K.read(el);
          K.slider(row, 'a', -3, 3, 0.5, a, v => { a = v; b.redraw(); }); K.slider(row, 'b', -8, 8, 1, b_, v => { b_ = v; b.redraw(); }); K.slider(row, 'c', -10, 10, 1, c, v => { c = v; b.redraw(); });
          b.onDraw = () => {
            b.base(); if (a === 0) { rd.innerHTML = 'a = 0 is not a quadratic.'; return; }
            const D = b_ * b_ - 4 * a * c; b.fn(x => a * x * x + b_ * x + c, { color: D > 0 ? C.blue : D === 0 ? C.purple : C.orange });
            if (D >= 0) { const r1 = (-b_ - Math.sqrt(D)) / (2 * a), r2 = (-b_ + Math.sqrt(D)) / (2 * a); b.dot(r1, 0, { label: num(r1) }); if (D > 0) b.dot(r2, 0, { label: num(r2) }); }
            rd.innerHTML = `${quad(a, b_, c)} = 0 &nbsp;·&nbsp; D = (${num(b_)})² − 4(${num(a)})(${num(c)}) = <b>${num(D)}</b> ⇒ ${D > 0 ? 'two distinct real roots' : D === 0 ? 'two equal real roots' : 'no real roots'}${D >= 0 ? `: x = ${rootsH(a, b_, c)}` : ''}`;
          };
          b.redraw(); return null;
        }
      },
      {
        title: 'Quadratic formula, step by step', intro: 'Press <kbd>S</kbd> for each step on a new equation.',
        build(el, K) {
          const rd = K.read(el); rd.style.fontSize = '18px'; let R = G9.rng(G9.newSeed()), e = { a: 2, b: -7, c: 3 };
          const an = new K.Anim(5, () => draw(), { ms: 1300 });
          const make = () => { do { e = { a: R.nz(-3, 4), b: R.int(-9, 9), c: R.int(-9, 9) }; } while (e.b * e.b - 4 * e.a * e.c < 0); an.reset(); };
          function draw() { const { a, b, c } = e, D = b * b - 4 * a * c;
            const st = [`${quad(a, b, c)} = 0`, `a = ${a}, b = ${b}, c = ${c}`, `D = b² − 4ac = ${b * b} − ${G9.par(4 * a * c)} = <b>${D}</b> ${D > 0 ? '> 0' : '= 0'}`,
              `x = ${F(`−(${b}) ± √${D}`, `2 × ${G9.par(a)}`)}`, `x = <b>${rootsH(a, b, c)}</b>`];
            rd.innerHTML = st.slice(0, an.i + 1).join('<br>'); }
          const row = K.row(el); K.button(row, 'New equation', make, 'btn'); K.anim(el, an); draw(); return an;
        }
      }
    ],

    gens: [
      { title: 'Is it quadratic?', levels: [1], gen(R) {
          const items = [['(x + 1)² = 2(x − 3)', 'Yes: x² + 4 = 0'], ['x(x + 1) + 8 = (x + 2)(x − 2)', 'No: x + 12 = 0 (linear)'], ['(x − 2)(x + 1) = (x − 1)(x + 3)', 'No: 3x − 1 = 0 (linear)'], ['x² − 2x = (−2)(3 − x)', 'Yes: x² − 4x + 6 = 0'], ['(x + 2)³ = x³ − 4', 'Yes: 6x² + 12x + 12 = 0'], ['x³ − 4x² − x + 1 = (x − 2)³', 'Yes: 2x² − 13x + 9 = 0']];
          const [q, a] = R.pick(items); return { q: `Check whether this is a quadratic equation: ${q}`, a, s: 'Simplify fully, then look at the highest power.' };
        } },
      { title: 'Solve by factorisation', gen(R, L) {
          let p = 1, r = 1, q, s; if (L > 1) { p = R.int(1, 4); r = R.int(1, 3); } do { q = R.nz(-7, 7); s = R.nz(-7, 7); } while (gcd(p, Math.abs(q)) > 1 || gcd(r, Math.abs(s)) > 1);
          return { q: `Solve by factorisation: ${quad(p * r, p * s + q * r, q * s)} = 0.`, a: `x = ${Q(-q, p)}, ${Q(-s, r)}`, s: `(${terms([[p, 'x'], [q, '']])})(${terms([[r, 'x'], [s, '']])}) = 0` };
        } },
      { title: 'Quadratic formula', gen(R, L) {
          let a, b, c, D; do { a = R.nz(-3, 4); b = R.int(-9, 9); c = R.int(-9, 9); D = b * b - 4 * a * c; } while (D <= 0 || (L === 1 && Math.sqrt(D) % 1));
          return { q: `Solve using the quadratic formula: ${quad(a, b, c)} = 0.`, a: `x = ${rootsH(a, b, c)}`, s: `D = ${D}; x = (−(${b}) ± √${D}) / ${2 * a}` };
        } },
      { title: 'Nature of roots', gen(R) {
          const a = R.nz(-4, 4), b = R.int(-8, 8), c = R.int(-8, 8), D = b * b - 4 * a * c;
          return { q: `Find the nature of the roots of ${quad(a, b, c)} = 0.`, a: `D = ${D}: ${D > 0 ? 'two distinct real roots' : D === 0 ? 'two equal real roots' : 'no real roots'}`, ans: D, s: 'D = b² − 4ac' };
        } },
      { title: 'k for equal roots', levels: [2, 3], gen(R, L) {
          const a = R.int(1, 4), c = R.int(1, 9) ** 2 * a;
          if (L === 2) { const k = 2 * Math.sqrt(a * c); return { q: `Find the positive value of k for which ${a}x² + kx + ${c} = 0 has equal roots.`, a: `k = ${k}`, ans: k, s: `k² − 4·${a}·${c} = 0` }; }
          const m = R.int(2, 6); return { q: `Find k if kx(x − ${m}) + ${m * m} = 0 has equal roots (k ≠ 0).`, a: `k = 4`, ans: 4, s: `kx² − ${m}kx + ${m * m} = 0; D = ${m * m}k² − ${4 * m * m}k = 0 ⇒ k = 4` };
        } },
      { title: 'Consecutive numbers', gen(R) {
          const x = R.int(5, 25), odd = R.chance(.5);
          return odd ? { q: `Find two consecutive positive odd integers whose product is ${x * 2 + 1 === 0 ? 0 : (2 * x + 1) * (2 * x + 3)}.`, a: `${2 * x + 1} and ${2 * x + 3}`, s: `x(x + 2) = ${(2 * x + 1) * (2 * x + 3)}; reject the negative root` }
            : { q: `The product of two consecutive positive integers is ${x * (x + 1)}. Find them.`, a: `${x} and ${x + 1}`, ans: x, s: `x² + x − ${x * (x + 1)} = 0 ⇒ (x − ${x})(x + ${x + 1}) = 0` };
        } },
      { title: 'Rectangle / right triangle', levels: [2, 3], gen(R) {
          const b = R.int(3, 20), d = R.int(1, 10), l = b + d;
          if (R.chance(.5)) return { q: `The length of a rectangular plot is ${d} m more than its breadth and its area is ${l * b} m². Find its length and breadth.`, a: `length ${l} m, breadth ${b} m`, s: `x(x + ${d}) = ${l * b}` };
          const T = R.pick([[5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]]);
          return { q: `The hypotenuse of a right triangle is ${T[2]} cm and one side is ${T[1] - T[0]} cm longer than the other. Find the two sides.`, a: `${T[0]} cm and ${T[1]} cm`, s: `x² + (x + ${T[1] - T[0]})² = ${T[2] * T[2]}` };
        } },
      { title: 'Speed and time', levels: [3], gen(R) {
          const opts = [[360, 5, 1, 40], [480, 8, 1, 40], [90, 15, 0.5, 45], [132, 11, 1, 22], [200, 10, 1, 40], [300, 10, 1, 50]]; const [d, k, t, x] = R.pick(opts);
          if (d / x - d / (x + k) !== t) return this.gen(R);
          return { q: `A train travels ${d} km at a uniform speed. If the speed had been ${k} km/h more, it would have taken ${t === 1 ? '1 hour' : t + ' hour'} less. Find the speed.`, a: `${x} km/h`, ans: x, s: `${d}/x − ${d}/(x + ${k}) = ${t}` };
        } }
    ],

    quiz: [
      { q: 'Roots of x² − 5x + 6 = 0', o: ['2, 3', '−2, −3', '1, 6', '−1, 6'], a: 0, e: '(x − 2)(x − 3).' },
      { q: 'Discriminant of 2x² − 4x + 3 = 0', o: ['−8', '8', '40', '−40'], a: 0, e: '16 − 24.' },
      { q: 'x² + 4x + 4 = 0 has', o: ['two distinct real roots', 'two equal real roots', 'no real roots', 'three roots'], a: 1, e: 'D = 0.' },
      { q: 'For equal roots of x² + kx + 9 = 0 (k > 0), k =', o: ['3', '6', '9', '18'], a: 1, e: 'k² = 36.' },
      { q: 'Which is a quadratic equation?', o: ['x + 1/x = 3 (x ≠ 0) after clearing fractions', 'x³ − x = 0', '2x + 3 = 0', '(x + 1)² = x² + 2'], a: 0, e: 'x² − 3x + 1 = 0.' },
      { q: 'Roots of 2x² − 3x = 0', o: ['0, 3/2', '0, −3/2', '3/2 only', '2, 3'], a: 0, e: 'x(2x − 3) = 0.' },
      { q: 'x² + 1 = 0 has', o: ['two real roots', 'one real root', 'no real roots', 'root 1'], a: 2, e: 'D = −4.' },
      { q: 'If one root of x² − 7x + k = 0 is 3, k =', o: ['10', '12', '21', '4'], a: 1, e: '9 − 21 + k = 0.' },
      { q: 'Sum of the roots of 3x² + 6x − 9 = 0', o: ['2', '−2', '−3', '3'], a: 1, e: '−b/a.' },
      { q: 'Product of two consecutive positive integers is 306. The smaller is', o: ['16', '17', '18', '15'], a: 1, e: '17 × 18.' },
      { q: 'Quadratic formula gives x =', o: ['(−b ± √D)/2a', '(b ± √D)/2a', '(−b ± D)/2a', '−b/2a ± D'], a: 0, e: 'Standard formula.' }
    ],

    teach: {
      outcomes: ['Recognise quadratic equations', 'Solve by factorisation and by the quadratic formula', 'Use the discriminant to find the nature of roots and unknown coefficients', 'Model word problems and reject meaningless roots'],
      periods: [
        { t: 'Factorisation', flow: [['10 min', 'Area puzzle leading to x² + 3x = 40.'], ['20 min', 'Splitting the middle term; practice.'], ['10 min', 'Is-it-quadratic card sort.']] },
        { t: 'Formula and discriminant', flow: [['15 min', 'Explore panel 2: formula steps.'], ['15 min', 'Explore panel 1: D and the parabola; equal-roots problems.'], ['10 min', 'Practice: Standard.']] },
        { t: 'Word problems', flow: [['20 min', 'Consecutive integers, rectangles, speed–time.'], ['10 min', 'Rejecting roots.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['−b sign error.', 'Dividing by x.', 'Keeping negative lengths.'],
      activities: ['Rectangle area puzzles with grid paper.', 'Speed–time table to build the equation.'],
      exit: ['Solve 2x² + x − 6 = 0.', 'Nature of roots of 3x² − 2x + 1 = 0.', 'k for equal roots of 2x² + kx + 3 = 0.'],
      homework: 'A motorboat with still-water speed 18 km/h takes 1 hour more upstream than downstream for 24 km. Find the speed of the stream.'
    },

    slides: [
      { t: 'Quadratic Equations', b: ['ax² + bx + c = 0, a ≠ 0', 'Factorisation', 'Quadratic formula', 'Nature of roots'] },
      { t: 'Factorisation', b: ['Product ac, sum b', '6x² − x − 2: −4 and 3', '(2x + 1)(3x − 2) = 0 ⇒ x = −½, ⅔'] },
      { t: 'Quadratic formula', b: ['D = b² − 4ac', 'x = (−b ± √D)/2a'] },
      { t: 'Nature of roots', b: ['D > 0: two distinct real', 'D = 0: two equal real', 'D < 0: no real roots'] },
      { t: 'Word problems', b: ['Consecutive: x, x + 1', 'Area: l × b', 'Speed: time = distance ÷ speed', 'Reject meaningless roots'] },
      { t: 'Check yourself', b: ['Solve x² − 3x − 10 = 0', 'D of x² + x + 1', 'Answers: 5, −2 · −3 (no real roots)'] }
    ],

    fs: { groups: [
        ['Form', [['Quadratic equation', 'ax² + bx + c = 0, a ≠ 0'], ['Simplify first', 'x² terms may cancel']]],
        ['Solving', [['Factorisation', 'split b using product ac'], ['Formula', 'x = (−b ± √(b² − 4ac))/2a'], ['Discriminant', 'D = b² − 4ac']]],
        ['Nature of roots', [['D > 0', 'two distinct real roots'], ['D = 0', 'two equal real roots = −b/2a'], ['D < 0', 'no real roots'], ['Equal roots ⇒', 'b² = 4ac']]],
        ['Roots α, β', [['α + β', '−b/a'], ['αβ', 'c/a'], ['Equation from roots', 'x² − (α + β)x + αβ = 0']]],
        ['Word problems', [['Consecutive integers', 'x, x + 1'], ['Consecutive odd / even', 'x, x + 2'], ['Speed', 'd/x − d/(x + k) = t'], ['Right triangle', 'x² + (x + d)² = h²']]]],
      ex: [['2x² − 7x + 3 = 0', 'D = 25 ⇒ x = (7 ± 5)/4 = 3, ½'], ['k for equal roots: x² + kx + 16 = 0', 'k² = 64 ⇒ k = ±8']],
      rem: ['Write a, b, c with signs before substituting.', 'Never divide by x — you lose x = 0.', 'Reject negative lengths, ages, speeds.'] }
  });
})();
