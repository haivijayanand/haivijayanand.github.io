/*
TOOL:    class8_maths_ch09
FAMILY:  CBSE_REVISION / Class 8 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class VIII moved into the series
CHANGES: 1.0.0 - Part II Ch 2 The Baudhāyana-Pythagoras Theorem - revise, 2 explore panels (squares on the sides of a draggable triangle, doubling a square), 6 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num } = G9;
  const sq = (n) => { const s = G9.surd(n); return s.i === 1 ? String(s.o) : (s.o === 1 ? '' : s.o) + '√' + s.i; };

  G9.register({
    no: 9, part: 'Part II', short: 'Baudhāyana-Pythagoras', title: 'The Baudhāyana-Pythagoras Theorem',
    blurb: '(Part II Ch 2) Doubling a square, √2, the theorem a² + b² = c², its converse, and Pythagorean triples.',
    revise: {
      oneLine: 'In a right triangle the square on the hypotenuse equals the sum of the squares on the other two sides: a² + b² = c². Baudhāyana\'s Śulba-sūtra (c. 800 BCE) states it for the diagonal of a rectangle, and its converse tests for right angles.',
      sections: [
        { h: 'Doubling a square', html: `<p>The square on the diagonal of a unit square has area 2, so the diagonal is √2 ≈ 1.414. √2 is not a fraction of whole numbers (irrational).</p>` },
        { h: 'The theorem', html: `<div class="box m">Right angle at C ⇒ a² + b² = c² (c = hypotenuse, opposite the right angle)</div>
          <p>Baudhāyana: the diagonal of a rectangle produces as much area as its length and breadth together. Proof idea: four copies of the triangle inside a square of side a + b leave a square of side c: (a + b)² = 4·½ab + c².</p>` },
        { h: 'Converse and triples', html: `<p>If a² + b² = c² then the triangle is right-angled (used by builders with a 3-4-5 rope). Pythagorean triples: (3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25); multiples of a triple are triples; (2m, m² − 1, m² + 1) for any m &gt; 1.</p>
          <p>If a² + b² &gt; c² (c largest), the angle opposite c is acute; if &lt;, obtuse.</p>` }
      ],
      formulas: [['Theorem', 'a² + b² = c²'], ['Hypotenuse', 'c = √(a² + b²)'], ['Leg', 'a = √(c² − b²)'], ['Diagonal of a square', 's√2'], ['Diagonal of a rectangle', '√(l² + b²)'], ['Triples', '(2m, m² − 1, m² + 1)']],
      terms: [['Hypotenuse', 'side opposite the right angle (longest)'], ['Legs', 'the two shorter sides'], ['Pythagorean triple', 'whole numbers with a² + b² = c²'], ['Śulba-sūtras', 'ancient Indian texts on altar construction']],
      traps: ['c must be the longest side.', 'a + b ≠ c.', '√(a² + b²) ≠ a + b.', 'The converse needs the largest side as c.'],
      bridge: '<p>Uses squares and roots (Ch 1). Class 9 uses it for the distance formula; Class 10 for trigonometry.</p>'
    },

    explore: [
      {
        title: 'Squares on the sides', intro: 'Drag B and C. When the angle at C is 90°, the two smaller squares exactly add up to the big one.',
        build(el, K) {
          const b = new K.Board(el, { xmin: -9, xmax: 11, ymin: -8, ymax: 8 }); const rd = K.read(el);
          const A = { x: 0, y: 0, fixed: true }, Bp = b.addPt(4, 0, { label: 'B', snap: 0.5, color: C.blue }), Cp = b.addPt(0, 3, { label: 'C', snap: 0.5, color: C.orange });
          const sqOn = (P, Q, col) => { const dx = Q.x - P.x, dy = Q.y - P.y; const pts = [[P.x, P.y], [Q.x, Q.y], [Q.x + dy, Q.y - dx], [P.x + dy, P.y - dx]]; b.poly(pts, { fill: col + '33', color: col, w: 2 }); };
          b.onDraw = () => { b.base(); const ccw = (Bp.x - A.x) * (Cp.y - A.y) - (Bp.y - A.y) * (Cp.x - A.x) > 0; const [P1, P2, P3] = ccw ? [A, Bp, Cp] : [A, Cp, Bp];
            sqOn(P1, P2, C.blue); sqOn(P2, P3, C.purple); sqOn(P3, P1, C.orange); b.poly([[A.x, A.y], [Bp.x, Bp.y], [Cp.x, Cp.y]], { color: C.ink, w: 3 }); b.dot(0, 0, { label: 'A', r: 4 });
            const ab = Bp.x ** 2 + Bp.y ** 2, ac = Cp.x ** 2 + Cp.y ** 2, bc = (Bp.x - Cp.x) ** 2 + (Bp.y - Cp.y) ** 2; const dotA = Bp.x * Cp.x + Bp.y * Cp.y;
            b.drawPts(); rd.innerHTML = `AB² = ${num(ab)}, AC² = ${num(ac)}, BC² = ${num(bc)} · AB² + AC² = ${num(ab + ac)} ${Math.abs(ab + ac - bc) < 1e-9 ? '= BC² ⇒ <b>right angle at A</b>' : ab + ac > bc ? '> BC² ⇒ angle A is acute' : '< BC² ⇒ angle A is obtuse'} (angle A ≈ ${num(Math.acos(dotA / Math.sqrt(ab * ac)) * 180 / Math.PI, 1)}°)`; };
          b.redraw(); return null;
        }
      },
      {
        title: 'Doubling a square', intro: 'Press <kbd>S</kbd>. Cut a unit square along its diagonal; four such halves make a square of area 2 on the diagonal.',
        build(el, K) {
          const b = new K.Board(el, { xmin: -2.5, xmax: 2.5, ymin: -1.6, ymax: 1.6 }); const rd = K.read(el); const an = new K.Anim(3, () => b.redraw(), { ms: 1200 });
          b.onDraw = () => { b.base(); const k = an.i; b.rect(0, 0, 1, 1, { fill: C.blueL, color: C.blue, w: 3 }); if (k >= 1) b.line(0, 0, 1, 1, { color: C.orange, w: 3 });
            if (k >= 2) b.poly([[0, 0], [1, 1], [0, 2], [-1, 1]].map(p => [p[0] - 0.8, p[1] - 1]), { fill: 'rgba(234,88,12,.25)', color: C.orange, w: 3 });
            if (k >= 2) { b.line(-0.8, -1, -0.8, 1, { color: C.orange, w: 1, dash: [4, 4] }); b.line(-1.8, 0, 0.2, 0, { color: C.orange, w: 1, dash: [4, 4] }); }
            rd.innerHTML = ['A unit square: area 1.', 'Its diagonal splits it into two halves of area ½.', 'Four halves make a square on the diagonal: area 4 × ½ = 2 (shown shifted).', 'So diagonal² = 2, diagonal = √2 ≈ 1.414 — Baudhāyana\'s doubled square.'][k]; };
          K.anim(el, an); b.redraw(); return an;
        }
      }
    ],

    gens: [
      { title: 'Find the hypotenuse', gen(R, L) {
          if (L === 1) { const T = R.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [9, 12, 15]]); return { q: `The legs of a right triangle are ${T[0]} cm and ${T[1]} cm. Find the hypotenuse.`, a: `${T[2]} cm`, ans: T[2] }; }
          const a = R.int(1, 9), b = R.int(1, 9); return { q: `The legs of a right triangle are ${a} and ${b}. Find the hypotenuse (simplest surd form).`, a: sq(a * a + b * b), ans: Math.sqrt(a * a + b * b) };
        } },
      { title: 'Find a leg', gen(R) {
          const T = R.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]]); const k = R.int(1, 3);
          return { q: `The hypotenuse of a right triangle is ${T[2] * k} m and one leg is ${T[0] * k} m. Find the other leg.`, a: `${T[1] * k} m`, ans: T[1] * k };
        } },
      { title: 'Is it a right triangle?', gen(R) {
          const T = R.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]]); const yes = R.chance(.5); const c = yes ? T[2] : T[2] + R.pick([-1, 1]);
          const v = T[0] ** 2 + T[1] ** 2 - c * c; return { q: `Do sides ${T[0]}, ${T[1]}, ${c} form a right triangle? If not, is the largest angle acute or obtuse?`, a: v === 0 ? 'yes, right-angled' : v > 0 ? 'no, acute' : 'no, obtuse', s: `${T[0]}² + ${T[1]}² = ${T[0] ** 2 + T[1] ** 2}, ${c}² = ${c * c}` };
        } },
      { title: 'Ladder and diagonal problems', gen(R) {
          const t = R.int(0, 2), T = R.pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]]);
          if (t === 0) return { q: `A ${T[2]} m ladder rests against a wall with its foot ${T[0]} m from the wall. How high up the wall does it reach?`, a: `${T[1]} m`, ans: T[1] };
          if (t === 1) return { q: `Find the diagonal of a rectangle ${T[0]} cm × ${T[1]} cm.`, a: `${T[2]} cm`, ans: T[2] };
          const s = R.int(2, 12); return { q: `Find the diagonal of a square of side ${s} cm.`, a: `${s}√2 cm ≈ ${num(s * Math.SQRT2, 2)} cm`, ans: s * Math.SQRT2 };
        } },
      { title: 'Generate a triple', levels: [2, 3], gen(R) {
          const m = R.int(2, 15); return { q: `Use (2m, m² − 1, m² + 1) with m = ${m} to write a Pythagorean triple and check it.`, a: `${2 * m}, ${m * m - 1}, ${m * m + 1}: ${(2 * m) ** 2} + ${(m * m - 1) ** 2} = ${(m * m + 1) ** 2}` };
        } },
      { title: 'Rhombus and isosceles triangles', levels: [3], gen(R) {
          const T = R.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]]); return R.chance(.5) ? { q: `The diagonals of a rhombus are ${2 * T[0]} cm and ${2 * T[1]} cm. Find its perimeter.`, a: `${4 * T[2]} cm`, ans: 4 * T[2] } : { q: `An isosceles triangle has equal sides ${T[2]} cm and base ${2 * T[0]} cm. Find its height.`, a: `${T[1]} cm`, ans: T[1] };
        } }
    ],

    quiz: [
      { q: 'Legs 6 and 8: hypotenuse', o: ['10', '14', '12', '√28'], a: 0, e: '36 + 64 = 100.' },
      { q: 'Diagonal of a unit square', o: ['√2', '2', '1', '√3'], a: 0, e: '1 + 1 = 2.' },
      { q: 'Which is a Pythagorean triple?', o: ['5, 12, 13', '4, 5, 6', '2, 3, 4', '6, 7, 8'], a: 0, e: '25 + 144 = 169.' },
      { q: 'Hypotenuse is opposite the', o: ['right angle', 'smallest angle', 'shortest side', 'base'], a: 0, e: 'Longest side.' },
      { q: 'Sides 7, 8, 12: largest angle is', o: ['obtuse', 'right', 'acute', 'cannot tell'], a: 0, e: '49 + 64 < 144.' },
      { q: 'Hypotenuse 13, leg 5: other leg', o: ['12', '8', '18', '√194'], a: 0, e: '169 − 25.' },
      { q: 'Baudhāyana stated the result in the', o: ['Śulba-sūtras', 'Āryabhaṭīya', 'Līlāvatī', 'Elements'], a: 0, e: 'Altar geometry.' },
      { q: 'Diagonal of a 9 × 12 rectangle', o: ['15', '21', '13', '18'], a: 0, e: '3-4-5 × 3.' },
      { q: 'Multiplying a triple by 3 gives', o: ['another triple', 'not a triple', 'a square', 'zero'], a: 0, e: 'Scaling.' },
      { q: 'Square of side s has diagonal', o: ['s√2', '2s', 's²', 's/√2'], a: 0, e: 'Theorem.' },
      { q: '3-4-5 rope is used to', o: ['make a right angle', 'measure area', 'find π', 'make a circle'], a: 0, e: 'Converse.' }
    ],

    teach: {
      outcomes: ['Explain doubling a square and √2', 'State and apply the theorem', 'Use the converse to test right angles', 'Generate Pythagorean triples'],
      periods: [
        { t: 'Doubling the square', flow: [['15 min', 'Explore panel 2; Baudhāyana\'s statement.'], ['15 min', 'Explore panel 1: squares on sides.'], ['10 min', 'Proof by rearrangement.']] },
        { t: 'Applications', flow: [['15 min', 'Ladders, diagonals, rhombus.'], ['15 min', 'Converse, triples.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Any side as c.', 'a + b = c.', 'Converse with wrong side.'],
      activities: ['12-knot rope to make a right angle in the playground.', 'Paper-square rearrangement proof.'],
      exit: ['Hypotenuse of 9, 40.', 'Is 10, 24, 26 right?', 'Diagonal of a 5 cm square.'],
      homework: 'A 15 m ladder reaches a window 12 m high. How far is its foot from the wall? Find three Pythagorean triples with 20 as one member.'
    },

    slides: [
      { t: 'The Baudhāyana-Pythagoras Theorem', b: ['Doubling a square', 'a² + b² = c²', 'Converse', 'Triples'] },
      { t: 'Theorem', b: ['Right angle ⇒ a² + b² = c²', 'c is the hypotenuse', 'Baudhāyana, Śulba-sūtra'] },
      { t: 'Converse and triples', b: ['a² + b² = c² ⇒ right angle', '3-4-5, 5-12-13, 8-15-17', '(2m, m² − 1, m² + 1)'] },
      { t: 'Check yourself', b: ['Legs 20, 21?', 'Answer: 29'] }
    ],

    fs: { groups: [
        ['Theorem', [['Right triangle', 'a² + b² = c²'], ['Hypotenuse', 'c = √(a² + b²)'], ['Leg', 'b = √(c² − a²)']]],
        ['Converse', [['a² + b² = c²', 'right angle opposite c'], ['a² + b² > c²', 'acute'], ['a² + b² < c²', 'obtuse']]],
        ['Triples', [['Common', '3-4-5, 5-12-13, 8-15-17, 7-24-25, 20-21-29'], ['Formula', '(2m, m² − 1, m² + 1)'], ['Multiples', 'k·(a, b, c)']]],
        ['Uses', [['Square diagonal', 's√2'], ['Rectangle diagonal', '√(l² + b²)'], ['Rhombus side', '√((d₁/2)² + (d₂/2)²)']]]],
      ex: [['Ladder 10 m, foot 6 m from wall', 'height 8 m'], ['Rhombus diagonals 16, 30', 'side 17, perimeter 68']],
      rem: ['Find the hypotenuse first.', 'Square, add, then root.', 'Know the common triples.'] }
  });
})();
