/*
TOOL:    class10_maths_ch10
FAMILY:  CBSE_REVISION / Class 10 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 10 Circles (tangents) - revise, board focus, 2 explore panels (tangents from an external point, circumscribed quadrilateral), 7 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { num, C, surdH } = G9;

  G9.register({
    no: 10, part: 'Unit IV · Geometry (15 marks)', short: 'Circles (tangents)', title: 'Circles',
    blurb: 'Tangent to a circle, tangent ⟂ radius, number of tangents from a point, equal tangent lengths.',
    revise: {
      oneLine: 'A tangent touches the circle at exactly one point and is perpendicular to the radius there. From an external point exactly two tangents can be drawn, and they are equal in length.',
      sections: [
        { h: 'Tangent and secant', html: `<p>A line can miss a circle, cut it at two points (<b>secant</b>) or touch it at exactly one point (<b>tangent</b>; the point is the <b>point of contact</b>). At any point of a circle there is exactly one tangent.</p>` },
        { h: 'Theorem 1: tangent ⟂ radius', html: `<p>The tangent at any point of a circle is perpendicular to the radius through the point of contact.</p>
          <p>Proof idea: every other point Q of the tangent lies outside the circle, so OQ &gt; OP; OP is the shortest distance from O to the line, hence perpendicular.</p>` },
        { h: 'Number of tangents from a point', html: `<ul><li>Point inside the circle: none.</li><li>Point on the circle: exactly one.</li><li>Point outside: exactly two.</li></ul>` },
        { h: 'Theorem 2: equal tangents', html: `<p>The lengths of the two tangents from an external point to a circle are equal: PA = PB.</p>
          <p>Proof: △OAP ≅ △OBP (RHS: OA = OB radii, OP common, right angles at A and B). Consequences: OP bisects ∠APB and ∠AOB; ∠APB + ∠AOB = 180°.</p>
          <p>Tangent length: PA = √(OP² − r²).</p>` },
        { h: 'Standard results', html: `<ul><li>A quadrilateral circumscribing a circle: AB + CD = AD + BC.</li><li>A parallelogram circumscribing a circle is a rhombus.</li><li>Chord of the larger of two concentric circles touching the smaller one: length 2√(R² − r²), bisected at the point of contact.</li><li>Tangents at the ends of a diameter are parallel.</li></ul>` }
      ],
      formulas: [['Tangent ⟂ radius', '∠OAP = 90°'], ['Tangent length', 'PA = √(OP² − r²)'], ['Equal tangents', 'PA = PB'], ['Angles', '∠APB + ∠AOB = 180°'], ['Circumscribed quadrilateral', 'AB + CD = AD + BC'], ['Concentric circles chord', '2√(R² − r²)']],
      terms: [['Tangent', 'line meeting the circle at exactly one point'], ['Point of contact', 'where the tangent touches'], ['Secant', 'line cutting the circle at two points'], ['External point', 'point outside the circle']],
      traps: ['Forgetting the 90° at the point of contact.', 'Using OP² = PA² + r² wrongly as PA² = OP² + r².', 'In circumscribed figures, pairing tangents from different vertices.', '∠APB and ∠AOB are supplementary, not equal.'],
      board: '<p><b>Unit IV (Geometry) — 15 marks</b> with Ch 6. Both theorems (tangent ⟂ radius; equal tangent lengths) are frequently asked as 3–5 mark proofs. Also: 1–2 mark tangent-length and angle questions, and AB + CD = AD + BC.</p>',
      bridge: '<p>Uses Pythagoras and congruence (RHS). Ch 11 computes areas of sectors and segments of circles.</p>'
    },

    explore: [
      {
        title: 'Two tangents from an external point', intro: 'Drag P. When P is outside, the two tangents PA and PB are always equal, and ∠APB + ∠AOB = 180°.',
        build(el, K) {
          const r = 3; const b = new K.Board(el, { xmin: -6, xmax: 12, ymin: -6, ymax: 6, axes: false }); const rd = K.read(el);
          const P = b.addPt(8, 2, { label: 'P', snap: 0.25 });
          b.onDraw = () => {
            b.base(); b.circle(0, 0, r, { color: C.blue }); b.dot(0, 0, { color: C.ink, r: 4, label: 'O' });
            const d = Math.hypot(P.x, P.y);
            if (d <= r + 1e-9) { b.drawPts(); rd.innerHTML = d < r ? 'P is <b>inside</b>: no tangent can be drawn.' : 'P is <b>on</b> the circle: exactly one tangent.'; return; }
            const phi = Math.atan2(P.y, P.x), a = Math.acos(r / d); const A = [r * Math.cos(phi + a), r * Math.sin(phi + a)], B = [r * Math.cos(phi - a), r * Math.sin(phi - a)];
            b.line(P.x, P.y, A[0], A[1], { color: C.orange, w: 3 }); b.line(P.x, P.y, B[0], B[1], { color: C.orange, w: 3 });
            b.line(0, 0, A[0], A[1], { color: C.purple, w: 2 }); b.line(0, 0, B[0], B[1], { color: C.purple, w: 2 }); b.line(0, 0, P.x, P.y, { color: C.grey, w: 1.5, dash: [5, 4] });
            b.dot(A[0], A[1], { color: C.purple, label: 'A', r: 4 }); b.dot(B[0], B[1], { color: C.purple, label: 'B', r: 4 }); b.drawPts();
            const t = Math.sqrt(d * d - r * r), aob = 2 * a * 180 / Math.PI;
            rd.innerHTML = `OP = ${num(d)}, r = ${r} ⇒ PA = PB = √(OP² − r²) = <b>${num(t)}</b> · ∠OAP = ∠OBP = 90° · ∠AOB = ${num(aob, 1)}°, ∠APB = ${num(180 - aob, 1)}°, sum = 180°`;
          };
          b.redraw(); return null;
        }
      },
      {
        title: 'Quadrilateral around a circle', intro: 'Change the four tangent lengths from the vertices. Sides are sums of tangent lengths, so AB + CD = AD + BC always.',
        build(el, K) {
          const t = [3, 4, 5, 2]; const row = K.row(el); const rd = K.read(el);
          'abcd'.split('').forEach((l, i) => K.slider(row, `tangent from ${l.toUpperCase()}`, 1, 9, 1, t[i], v => { t[i] = v; draw(); }));
          function draw() { const [a, b, c, d] = t; rd.innerHTML = `AB = ${a} + ${b} = ${a + b}, BC = ${b} + ${c} = ${b + c}, CD = ${c} + ${d} = ${c + d}, DA = ${d} + ${a} = ${d + a}<br>AB + CD = <b>${a + b + c + d}</b> = BC + DA = <b>${a + b + c + d}</b> — each sum uses every tangent length exactly once.`; }
          draw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Tangent length', gen(R) {
          const T = R.pick([[5, 12, 13], [3, 4, 5], [8, 15, 17], [7, 24, 25], [9, 12, 15], [20, 21, 29]]);
          const t = R.int(0, 2);
          if (t === 0) return { q: `From a point Q, the length of the tangent to a circle is ${T[1]} cm and the distance of Q from the centre is ${T[2]} cm. Find the radius.`, a: `${T[0]} cm`, ans: T[0], s: `r = √(${T[2]}² − ${T[1]}²)` };
          if (t === 1) return { q: `A circle has radius ${T[0]} cm. A point P is ${T[2]} cm from the centre. Find the length of the tangent from P.`, a: `${T[1]} cm`, ans: T[1], s: `√(${T[2]}² − ${T[0]}²)` };
          return { q: `The tangent from P to a circle of radius ${T[0]} cm has length ${T[1]} cm. How far is P from the centre?`, a: `${T[2]} cm`, ans: T[2], s: `OP = √(${T[0]}² + ${T[1]}²)` };
        } },
      { title: 'Angle between tangents', gen(R) {
          const x = R.int(20, 160);
          return R.chance(.5) ? { q: `PA and PB are tangents from P to a circle with centre O. If ∠APB = ${x}°, find ∠AOB.`, a: `${180 - x}°`, ans: 180 - x, s: '∠OAP = ∠OBP = 90° ⇒ ∠APB + ∠AOB = 180°' }
            : { q: `PA and PB are tangents to a circle with centre O. If ∠AOB = ${x}°, find ∠APB and ∠OPA.`, a: `∠APB = ${180 - x}°, ∠OPA = ${(180 - x) / 2}°`, s: 'OP bisects ∠APB' };
        } },
      { title: 'Angle PAB in the isosceles triangle', levels: [2, 3], gen(R) {
          const x = R.int(20, 140) & ~1;
          return { q: `PA and PB are tangents from P with ∠APB = ${x}°. Find ∠PAB and the angle between the chord AB and the radius OA.`, a: `∠PAB = ${(180 - x) / 2}°, ∠OAB = ${x / 2}°`, s: `PA = PB ⇒ ∠PAB = ∠PBA = (180 − ${x})/2; ∠OAB = 90° − ∠PAB` };
        } },
      { title: 'Circumscribed quadrilateral', gen(R) {
          const t = [R.int(2, 9), R.int(2, 9), R.int(2, 9), R.int(2, 9)]; const AB = t[0] + t[1], BC = t[1] + t[2], CD = t[2] + t[3], DA = t[3] + t[0];
          return { q: `A quadrilateral ABCD is drawn to circumscribe a circle. If AB = ${AB} cm, BC = ${BC} cm and CD = ${CD} cm, find AD.`, a: `${DA} cm`, ans: DA, s: `AB + CD = AD + BC ⇒ AD = ${AB} + ${CD} − ${BC}` };
        } },
      { title: 'Concentric circles', levels: [2, 3], gen(R) {
          const T = R.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]]);
          return { q: `Two concentric circles have radii ${T[2]} cm and ${T[0]} cm. Find the length of the chord of the larger circle that touches the smaller circle.`, a: `${2 * T[1]} cm`, ans: 2 * T[1], s: `half-chord = √(${T[2]}² − ${T[0]}²) = ${T[1]}; the radius to the contact point is ⟂ to the chord, so it bisects it` };
        } },
      { title: 'Triangle with an incircle', levels: [3], gen(R) {
          const x = R.int(2, 8), y = R.int(2, 8), z = R.int(2, 8);
          return { q: `A circle is inscribed in △ABC, touching AB, BC, CA at P, Q, R. If AB = ${x + y} cm, BC = ${y + z} cm and CA = ${z + x} cm, find AP, BQ and CR.`, a: `AP = ${x} cm, BQ = ${y} cm, CR = ${z} cm`, s: `AP = AR = x, BP = BQ = y, CQ = CR = z; x + y = ${x + y}, y + z = ${y + z}, z + x = ${z + x}` };
        } },
      { title: 'How many tangents?', levels: [1], gen(R) {
          const r = R.int(3, 9), d = R.pick([r - 1, r, r + R.int(1, 5)]);
          return { q: `A circle has radius ${r} cm. How many tangents can be drawn to it from a point ${d} cm from its centre?`, a: d < r ? 'None (point inside)' : d === r ? 'Exactly one (point on the circle)' : 'Exactly two (point outside)', s: 'Compare the distance with the radius.' };
        } }
    ],

    quiz: [
      { q: 'The tangent at a point of a circle is ____ to the radius through that point.', o: ['parallel', 'perpendicular', 'equal', 'inclined at 45°'], a: 1, e: 'Theorem 1.' },
      { q: 'Number of tangents from a point inside a circle', o: ['0', '1', '2', 'infinitely many'], a: 0, e: 'Every line through it is a secant.' },
      { q: 'Tangent length from a point 13 cm from the centre of a circle of radius 5 cm', o: ['12 cm', '8 cm', '18 cm', '√194 cm'], a: 0, e: '√(169 − 25).' },
      { q: 'If ∠APB = 80° between two tangents, ∠AOB =', o: ['80°', '100°', '40°', '160°'], a: 1, e: 'Supplementary.' },
      { q: 'A parallelogram circumscribing a circle is a', o: ['rectangle', 'rhombus', 'square only', 'trapezium'], a: 1, e: 'AB + CD = AD + BC with AB = CD, AD = BC ⇒ all equal.' },
      { q: 'Tangents at the ends of a diameter are', o: ['perpendicular', 'parallel', 'intersecting at the centre', 'equal to the diameter'], a: 1, e: 'Both ⟂ to the diameter.' },
      { q: 'Concentric circles radii 5 and 3: chord of the larger touching the smaller has length', o: ['8', '4', '6', '10'], a: 0, e: '2√(25 − 9).' },
      { q: 'Lengths of tangents from an external point are', o: ['equal', 'unequal', 'perpendicular', 'parallel'], a: 0, e: 'Theorem 2.' },
      { q: 'A line meeting a circle at two points is a', o: ['tangent', 'secant', 'radius', 'diameter'], a: 1, e: 'Definition.' },
      { q: 'Quadrilateral ABCD circumscribes a circle; AB = 6, BC = 7, CD = 4. AD =', o: ['3', '5', '9', '17'], a: 0, e: '6 + 4 − 7.' },
      { q: 'Congruence rule used in proving equal tangents', o: ['SAS', 'ASA', 'RHS', 'SSS'], a: 2, e: 'Right angles, common hypotenuse OP, equal radii.' }
    ],

    teach: {
      outcomes: ['Distinguish tangents and secants', 'Prove tangent ⟂ radius', 'Prove equal tangent lengths and use their consequences', 'Solve tangent length, angle and circumscribed-figure problems'],
      periods: [
        { t: 'Tangent ⟂ radius', flow: [['10 min', 'Ruler sliding across a coin: secant → tangent.'], ['15 min', 'Proof of Theorem 1.'], ['15 min', 'Tangent length via Pythagoras.']] },
        { t: 'Equal tangents', flow: [['15 min', 'Explore panel 1; proof by RHS.'], ['15 min', 'Angle problems: ∠APB + ∠AOB = 180°.'], ['10 min', 'Practice: Standard.']] },
        { t: 'Standard results', flow: [['15 min', 'Explore panel 2: AB + CD = AD + BC.'], ['15 min', 'Concentric circles, incircle tangents.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Missing right angle at the contact point.', 'Sign error in PA² = OP² − r².', 'Mixing tangent pairs from different vertices.'],
      activities: ['String from a pin to a circular lid: equal tangents.', 'Proof card sort for Theorem 2.'],
      exit: ['Tangent length: r = 6, OP = 10.', '∠APB = 70°: ∠AOB?', 'Prove AB + CD = AD + BC.'],
      homework: 'Prove that the angle between the two tangents from an external point is supplementary to the angle subtended by the line segment joining the points of contact at the centre.'
    },

    slides: [
      { t: 'Circles: Tangents', b: ['Tangent and secant', 'Tangent ⟂ radius', 'Equal tangent lengths'] },
      { t: 'Theorem 1', b: ['Tangent at P ⟂ OP', 'OP is the shortest distance from O to the tangent'] },
      { t: 'Number of tangents', b: ['Inside: 0', 'On the circle: 1', 'Outside: 2'] },
      { t: 'Theorem 2', b: ['PA = PB (RHS congruence)', 'OP bisects ∠APB', '∠APB + ∠AOB = 180°', 'PA = √(OP² − r²)'] },
      { t: 'Standard results', b: ['AB + CD = AD + BC', 'Parallelogram around a circle is a rhombus', 'Concentric chord = 2√(R² − r²)'] },
      { t: 'Check yourself', b: ['r = 7, OP = 25: tangent?', 'Answer: 24'] }
    ],

    fs: { groups: [
        ['Basics', [['Tangent', 'meets circle at exactly one point'], ['Secant', 'cuts circle at two points'], ['Tangents from a point', 'inside 0, on 1, outside 2']]],
        ['Theorems', [['Tangent ⟂ radius', '∠OAP = 90°'], ['Equal tangents', 'PA = PB'], ['Tangent length', '√(OP² − r²)'], ['Bisector', 'OP bisects ∠APB and ∠AOB'], ['Angles', '∠APB + ∠AOB = 180°']]],
        ['Standard results', [['Circumscribed quadrilateral', 'AB + CD = AD + BC'], ['Parallelogram around circle', 'rhombus'], ['Concentric circles chord', '2√(R² − r²)'], ['Tangents at ends of diameter', 'parallel'], ['Incircle of a triangle', 'tangent lengths x, y, z with x + y = c etc.']]]],
      ex: [['r = 5, OP = 13', 'tangent = √(169 − 25) = 12'], ['∠APB = 60°', '∠AOB = 120°, ∠OPA = 30°']],
      rem: ['Mark the right angle at the point of contact.', 'Use RHS for equal tangents.', 'Each vertex contributes two equal tangent lengths.'] }
  });
})();
