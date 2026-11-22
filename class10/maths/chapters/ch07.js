/*
TOOL:    class10_maths_ch07
FAMILY:  CBSE_REVISION / Class 10 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 7 Coordinate Geometry - revise, board focus, 2 explore panels (section formula, distance), 8 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { F, Q, num, C, surdH, gcd } = G9;
  const P = (x, y) => `(${num(x)}, ${num(y)})`;
  const PQ = (xn, xd, yn, yd) => `(${Q(xn, xd)}, ${Q(yn, yd)})`;

  G9.register({
    no: 7, part: 'Unit III · Coordinate Geometry (6 marks)', short: 'Coordinate geometry', title: 'Coordinate Geometry',
    blurb: 'Distance formula and section formula (internal division), midpoints, trisection points, collinearity.',
    revise: {
      oneLine: 'The distance formula measures lengths on the plane; the section formula finds the point that divides a segment in a given ratio — together they let you prove facts about figures with algebra.',
      sections: [
        { h: 'Distance formula', html: `<div class="box m">PQ = √[(x₂ − x₁)² + (y₂ − y₁)²] &nbsp;&nbsp; OP = √(x² + y²)</div>
          <p>Uses: show a triangle is isosceles/equilateral/right-angled, a quadrilateral is a square/rhombus/rectangle/parallelogram, or that three points are collinear (AB + BC = AC).</p>` },
        { h: 'Section formula (internal division)', html: `<p>The point P dividing A(x₁, y₁) and B(x₂, y₂) internally in the ratio m₁ : m₂ is</p>
          <div class="box m">P = ( ${F('m₁x₂ + m₂x₁', 'm₁ + m₂')} , ${F('m₁y₂ + m₂y₁', 'm₁ + m₂')} )</div>
          <p>Midpoint (1 : 1): ((x₁ + x₂)/2, (y₁ + y₂)/2). Trisection points: ratios 1 : 2 and 2 : 1.</p>
          <p>Memory aid: "cross-multiply" — m₁ goes with the far end B.</p>` },
        { h: 'Finding the ratio', html: `<p>Take the ratio as <b>k : 1</b>. Then P = ((kx₂ + x₁)/(k + 1), (ky₂ + y₁)/(k + 1)); equate one coordinate and solve for k.</p>
          <p>Ratio in which the <b>x-axis</b> divides AB: put y = 0 ⇒ k = −y₁/y₂. For the <b>y-axis</b>: put x = 0.</p>` },
        { h: 'Figures', html: `<ul><li>Parallelogram: diagonals bisect each other ⇒ midpoint of AC = midpoint of BD (finds a missing vertex).</li><li>Centroid of a triangle (useful extra): ((x₁ + x₂ + x₃)/3, (y₁ + y₂ + y₃)/3).</li></ul>` }
      ],
      formulas: [['Distance', '√[(x₂ − x₁)² + (y₂ − y₁)²]'], ['Section (m₁ : m₂)', '((m₁x₂ + m₂x₁)/(m₁ + m₂), (m₁y₂ + m₂y₁)/(m₁ + m₂))'], ['Midpoint', '((x₁ + x₂)/2, (y₁ + y₂)/2)'], ['Ratio k : 1 by x-axis', 'k = −y₁/y₂'], ['Centroid', '((x₁ + x₂ + x₃)/3, (y₁ + y₂ + y₃)/3)']],
      terms: [['Section formula', 'coordinates of a point dividing a segment in a ratio'], ['Trisection points', 'divide a segment into three equal parts'], ['Collinear', 'lying on one line'], ['Centroid', 'meeting point of the medians']],
      traps: ['Pairing m₁ with x₁ instead of x₂.', 'Forgetting to square the differences (or the square root at the end).', 'Using "parallelogram" when only one pair of sides is checked.', 'Ratio k : 1 — remember to write the final ratio, not just k.'],
      board: '<p><b>Unit III — 6 marks.</b> Expect: 1-mark on distance or midpoint; 2–3 marks on the section formula, ratio of division, trisection points, missing vertex of a parallelogram, or showing a figure is a square/rhombus.</p>',
      bridge: '<p>Builds on Class 9 coordinates; similar triangles (Ch 6) explain why the section formula works.</p>'
    },

    explore: [
      {
        title: 'Section formula', intro: 'Drag A and B and change m₁ : m₂. P always sits m₁ parts from A and m₂ parts from B.',
        build(el, K) {
          let m1 = 2, m2 = 3; const row = K.row(el);
          const b = new K.Board(el, { xmin: -9, xmax: 9, ymin: -6, ymax: 6 }); const rd = K.read(el);
          const A = b.addPt(-6, -3, { label: 'A', snap: 1, color: C.blue }), B = b.addPt(6, 4, { label: 'B', snap: 1, color: C.blue });
          K.slider(row, 'm₁', 1, 6, 1, m1, v => { m1 = v; b.redraw(); }); K.slider(row, 'm₂', 1, 6, 1, m2, v => { m2 = v; b.redraw(); });
          b.onDraw = () => {
            b.base(); b.line(A.x, A.y, B.x, B.y, { color: C.grey, w: 2 }); const n = m1 + m2;
            for (let k = 1; k < n; k++) b.dot(A.x + (B.x - A.x) * k / n, A.y + (B.y - A.y) * k / n, { color: C.grey, r: 3 });
            const px = (m1 * B.x + m2 * A.x) / n, py = (m1 * B.y + m2 * A.y) / n;
            b.line(A.x, A.y, px, py, { color: C.blue, w: 4 }); b.line(px, py, B.x, B.y, { color: C.orange, w: 4 }); b.dot(px, py, { color: C.purple, label: 'P' }); b.drawPts();
            rd.innerHTML = `P = (${F(`${m1}×${G9.par(B.x)} + ${m2}×${G9.par(A.x)}`, n)}, ${F(`${m1}×${G9.par(B.y)} + ${m2}×${G9.par(A.y)}`, n)}) = <b>${PQ(m1 * B.x + m2 * A.x, n, m1 * B.y + m2 * A.y, n)}</b> · AP : PB = ${m1} : ${m2}`;
          };
          b.redraw(); return null;
        }
      },
      {
        title: 'What shape is it? (distances)', intro: 'Drag the four vertices (snap to grid). The side and diagonal lengths decide the shape.',
        build(el, K) {
          const b = new K.Board(el, { xmin: -8, xmax: 8, ymin: -6, ymax: 6 }); const rd = K.read(el);
          const V = [[-3, -2], [2, -2], [2, 3], [-3, 3]].map(([x, y], i) => b.addPt(x, y, { label: 'ABCD'[i], snap: 1 }));
          b.onDraw = () => {
            b.base(); b.poly(V.map(p => [p.x, p.y]), { fill: C.blueL, color: C.blue }); b.line(V[0].x, V[0].y, V[2].x, V[2].y, { color: C.grey, w: 1.5, dash: [5, 4] }); b.line(V[1].x, V[1].y, V[3].x, V[3].y, { color: C.grey, w: 1.5, dash: [5, 4] }); b.drawPts();
            const d2 = (p, q) => (p.x - q.x) ** 2 + (p.y - q.y) ** 2, s = [0, 1, 2, 3].map(i => d2(V[i], V[(i + 1) % 4])), dg = [d2(V[0], V[2]), d2(V[1], V[3])];
            const allS = s.every(v => v === s[0]), oppS = s[0] === s[2] && s[1] === s[3], eqD = dg[0] === dg[1];
            const name = allS && eqD ? 'square' : allS ? 'rhombus' : oppS && eqD ? 'rectangle' : oppS ? 'parallelogram' : 'quadrilateral (no special type)';
            rd.innerHTML = `AB = ${surdH(s[0])}, BC = ${surdH(s[1])}, CD = ${surdH(s[2])}, DA = ${surdH(s[3])} · AC = ${surdH(dg[0])}, BD = ${surdH(dg[1])}<br>⇒ <b>${name}</b>`;
          };
          b.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Distance between two points', gen(R, L) {
          const x1 = R.int(-7, 7), y1 = R.int(-7, 7); let dx, dy; if (L === 1) { const t = R.pick([[3, 4], [6, 8], [5, 12], [8, 15]]); dx = t[0] * R.sign(); dy = t[1] * R.sign(); } else { dx = R.nz(-8, 8); dy = R.nz(-8, 8); }
          const d2 = dx * dx + dy * dy;
          return { q: `Find the distance between ${P(x1, y1)} and ${P(x1 + dx, y1 + dy)}.`, a: surdH(d2), ans: Math.sqrt(d2), tol: 0.02, s: `√(${dx * dx} + ${dy * dy}) = √${d2}` };
        } },
      { title: 'Point dividing in a ratio', gen(R, L) {
          const m1 = R.int(1, 5), m2 = R.int(1, 5), x1 = R.int(-8, 8), y1 = R.int(-8, 8), x2 = R.int(-8, 8), y2 = R.int(-8, 8);
          return { q: `Find the point that divides the join of A${P(x1, y1)} and B${P(x2, y2)} internally in the ratio ${m1} : ${m2}.`, a: PQ(m1 * x2 + m2 * x1, m1 + m2, m1 * y2 + m2 * y1, m1 + m2), s: `((${m1}×${G9.par(x2)} + ${m2}×${G9.par(x1)})/${m1 + m2}, (${m1}×${G9.par(y2)} + ${m2}×${G9.par(y1)})/${m1 + m2})` };
        } },
      { title: 'Find the ratio', levels: [2, 3], gen(R) {
          const k1 = R.int(1, 5), k2 = R.int(1, 5), x1 = R.int(-8, 8), y1 = R.int(-8, 8), x2 = R.int(-8, 8), y2 = R.int(-8, 8); if (x1 === x2) return this.gen(R);
          const n = k1 + k2, px = (k1 * x2 + k2 * x1) / n, py = (k1 * y2 + k2 * y1) / n, g = gcd(k1, k2);
          return { q: `In what ratio does the point ${PQ(k1 * x2 + k2 * x1, n, k1 * y2 + k2 * y1, n)} divide the segment joining ${P(x1, y1)} and ${P(x2, y2)}?`, a: `${k1 / g} : ${k2 / g}`, s: `Take k : 1: (k×${G9.par(x2)} + ${G9.par(x1)})/(k + 1) = ${num(px)} ⇒ k = ${Q(k1, k2)}` };
        } },
      { title: 'Ratio by an axis', levels: [2, 3], gen(R) {
          const xaxis = R.chance(.5); let y1 = R.int(-8, -1), y2 = R.int(1, 8), x1 = R.int(-8, 8), x2 = R.int(-8, 8); if (R.chance(.5)) [y1, y2] = [y2, y1];
          const k = Q(-y1, y2).replace('−', ''); // y-values have opposite signs
          if (xaxis) return { q: `Find the ratio in which the x-axis divides the segment joining ${P(x1, y1)} and ${P(x2, y2)}, and the point of division.`, a: `${Math.abs(y1) / gcd(Math.abs(y1), Math.abs(y2))} : ${Math.abs(y2) / gcd(Math.abs(y1), Math.abs(y2))}; point (${Q(Math.abs(y1) * x2 + Math.abs(y2) * x1, Math.abs(y1) + Math.abs(y2))}, 0)`, s: `k : 1 with y = 0 ⇒ k = ${k}` };
          return { q: `Find the ratio in which the y-axis divides the segment joining ${P(y1, x1)} and ${P(y2, x2)}, and the point of division.`, a: `${Math.abs(y1) / gcd(Math.abs(y1), Math.abs(y2))} : ${Math.abs(y2) / gcd(Math.abs(y1), Math.abs(y2))}; point (0, ${Q(Math.abs(y1) * x2 + Math.abs(y2) * x1, Math.abs(y1) + Math.abs(y2))})`, s: `k : 1 with x = 0 ⇒ k = ${k}` };
        } },
      { title: 'Trisection points', levels: [2, 3], gen(R) {
          const x1 = R.int(-8, 8), y1 = R.int(-8, 8), dx = R.int(-3, 3) * 3, dy = R.int(-3, 3) * 3; if (!dx && !dy) return this.gen(R);
          return { q: `Find the points of trisection of the segment joining ${P(x1, y1)} and ${P(x1 + dx, y1 + dy)}.`, a: `${P(x1 + dx / 3, y1 + dy / 3)} and ${P(x1 + 2 * dx / 3, y1 + 2 * dy / 3)}`, s: 'Ratios 1 : 2 and 2 : 1' };
        } },
      { title: 'Fourth vertex of a parallelogram', levels: [2, 3], gen(R) {
          const A = [R.int(-6, 2), R.int(-6, 2)], u = [R.int(2, 6), R.int(-2, 3)], v = [R.int(-2, 2), R.int(2, 6)]; const B = [A[0] + u[0], A[1] + u[1]], D = [A[0] + v[0], A[1] + v[1]], Cc = [B[0] + v[0], B[1] + v[1]];
          return { q: `A${P(...A)}, B${P(...B)} and C${P(...Cc)} are three vertices of parallelogram ABCD. Find D.`, a: P(...D), s: 'Midpoint of AC = midpoint of BD ⇒ D = A + C − B' };
        } },
      { title: 'Point equidistant / on an axis', levels: [3], gen(R) {
          const x1 = R.int(-6, 6), y1 = R.nz(-6, 6), x2 = R.int(-6, 6), y2 = R.nz(-6, 6); if (y1 === y2) return this.gen(R);
          const num_ = x2 * x2 + y2 * y2 - x1 * x1 - y1 * y1, den = 2 * (y2 - y1);
          return { q: `Find the point on the y-axis equidistant from ${P(x1, y1)} and ${P(x2, y2)}.`, a: `(0, ${Q(num_, den)})`, ans: num_ / den, s: `(0, y): ${x1 * x1} + (y − ${G9.par(y1)})² = ${x2 * x2} + (y − ${G9.par(y2)})² ⇒ ${den}y = ${num_}` };
        } },
      { title: 'Collinear or not?', levels: [1, 2], gen(R) {
          const x = R.int(-5, 2), y = R.int(-5, 2), dx = R.int(1, 3), dy = R.int(-3, 3), col = R.chance(.5);
          const A = [x, y], B = [x + dx, y + dy], Cc = [x + 2 * dx + (col ? 0 : 1), y + 2 * dy];
          return { q: `Check whether A${P(...A)}, B${P(...B)} and C${P(...Cc)} are collinear.`, a: col ? 'Collinear: AB + BC = AC' : 'Not collinear', s: 'Compare AB + BC with AC (or check equal steps).' };
        } }
    ],

    quiz: [
      { q: 'Distance between (2, 3) and (4, 1)', o: ['2√2', '4', '√2', '8'], a: 0, e: '√(4 + 4).' },
      { q: 'Midpoint of (−1, 7) and (3, −3)', o: ['(1, 2)', '(2, 5)', '(1, 5)', '(2, 2)'], a: 0, e: '((−1 + 3)/2, (7 − 3)/2).' },
      { q: 'Point dividing (−1, 7) and (4, −3) in ratio 2 : 3', o: ['(1, 3)', '(2, 1)', '(1, 2)', '(3, 1)'], a: 0, e: '((8 − 3)/5, (−6 + 21)/5).' },
      { q: 'Ratio in which the x-axis divides (2, −3) and (5, 6)', o: ['1 : 2', '2 : 1', '3 : 6', '1 : 3'], a: 0, e: 'k = 3/6.' },
      { q: 'Distance of (−6, 8) from the origin', o: ['10', '14', '2', '100'], a: 0, e: '√(36 + 64).' },
      { q: 'If (1, 2), (4, y), (x, 6), (3, 5) are vertices of a parallelogram in order, x and y are', o: ['6, 3', '3, 6', '5, 4', '2, 3'], a: 0, e: 'Midpoints of diagonals equal: (1 + x)/2 = 7/2, (2 + 6)/2 = (y + 5)/2.' },
      { q: 'Trisection points of (0, 0) and (6, 9) are', o: ['(2, 3), (4, 6)', '(3, 4.5)', '(1, 2), (2, 4)', '(2, 4), (4, 8)'], a: 0, e: 'Thirds of the way.' },
      { q: 'A(0, 0), B(3, 0), C(3, 3), D(0, 3) is a', o: ['rectangle (not square)', 'square', 'rhombus (not square)', 'trapezium'], a: 1, e: 'Equal sides and equal diagonals.' },
      { q: 'The point on the x-axis has coordinates of the form', o: ['(0, y)', '(x, 0)', '(x, x)', '(1, 0)'], a: 1, e: 'y = 0.' },
      { q: 'If the distance between (x, 0) and (0, 4) is 5, x =', o: ['±3', '3 only', '±9', '1'], a: 0, e: 'x² + 16 = 25.' },
      { q: 'Centroid of (0, 0), (6, 0), (0, 9) is', o: ['(2, 3)', '(3, 4.5)', '(6, 9)', '(2, 4)'], a: 0, e: 'Average of vertices.' }
    ],

    teach: {
      outcomes: ['Use the distance formula to classify figures', 'Use the section formula for internal division and midpoints', 'Find the ratio of division and trisection points', 'Find missing vertices using midpoints'],
      periods: [
        { t: 'Distance formula', flow: [['10 min', 'Recall from Class 9; quick drill.'], ['20 min', 'Explore panel 2: what shape is it?'], ['10 min', 'Practice: distance.']] },
        { t: 'Section formula', flow: [['15 min', 'Derive with similar triangles; Explore panel 1.'], ['15 min', 'Points of division, midpoints, trisection.'], ['10 min', 'Practice: Standard.']] },
        { t: 'Ratio problems', flow: [['15 min', 'k : 1 method; axes.'], ['15 min', 'Parallelogram vertices.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['m₁ paired with x₁.', 'Missing square root.', 'Final ratio left as a fraction.'],
      activities: ['Classroom map on a grid; find midpoint meeting spots.', 'Rope divided in a ratio with knots.'],
      exit: ['Distance between (−5, 7) and (−1, 3).', 'Point dividing (4, −3), (8, 5) in 3 : 1.', 'Ratio in which (−4, 6) divides (−6, 10), (3, −8).'],
      homework: 'Show that (1, 7), (4, 2), (−1, −1), (−4, 4) are the vertices of a square.'
    },

    slides: [
      { t: 'Coordinate Geometry', b: ['Distance formula', 'Section formula', 'Ratio of division', 'Figures with coordinates'] },
      { t: 'Distance formula', b: ['√[(x₂ − x₁)² + (y₂ − y₁)²]', 'Classify triangles and quadrilaterals', 'Collinear: AB + BC = AC'] },
      { t: 'Section formula', b: ['((m₁x₂ + m₂x₁)/(m₁ + m₂), (m₁y₂ + m₂y₁)/(m₁ + m₂))', 'Midpoint: 1 : 1', 'Trisection: 1 : 2 and 2 : 1'] },
      { t: 'Finding the ratio', b: ['Take k : 1', 'Equate one coordinate', 'x-axis: k = −y₁/y₂'] },
      { t: 'Check yourself', b: ['Distance (0, 0)–(5, 12)?', 'Midpoint of (2, 3), (6, 7)?', 'Answers: 13 · (4, 5)'] }
    ],

    fs: { groups: [
        ['Distance', [['Two points', '√[(x₂ − x₁)² + (y₂ − y₁)²]'], ['From origin', '√(x² + y²)'], ['Collinear', 'AB + BC = AC']]],
        ['Section formula', [['Internal m₁ : m₂', '((m₁x₂ + m₂x₁)/(m₁ + m₂), (m₁y₂ + m₂y₁)/(m₁ + m₂))'], ['Midpoint', '((x₁ + x₂)/2, (y₁ + y₂)/2)'], ['Trisection', 'ratios 1 : 2 and 2 : 1'], ['Find ratio', 'take k : 1, equate a coordinate'], ['By x-axis / y-axis', 'k = −y₁/y₂ / k = −x₁/x₂']]],
        ['Figures', [['Parallelogram', 'midpoint AC = midpoint BD; D = A + C − B'], ['Rhombus', 'all sides equal'], ['Rectangle', 'opposite sides equal, diagonals equal'], ['Square', 'all sides and diagonals equal'], ['Centroid', '((x₁ + x₂ + x₃)/3, (y₁ + y₂ + y₃)/3)']]]],
      ex: [['Divide (−1, 7), (4, −3) in 2 : 3', '((8 − 3)/5, (−6 + 21)/5) = (1, 3)'], ['Ratio by x-axis: (1, −5), (−4, 5)', 'k = 5/5 ⇒ 1 : 1, point (−3/2, 0)']],
      rem: ['m₁ goes with the far point (x₂, y₂).', 'Distance needs the square root.', 'Give the final ratio as m : n.'] }
  });
})();
