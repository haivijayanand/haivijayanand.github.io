/*
TOOL:    class7_maths_ch07
FAMILY:  CBSE_REVISION / Class 7 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 7 A Tale of Three Intersecting Lines (triangles: types, triangle inequality, constructing from three sides, angle sum 180 degrees, altitudes) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 7, part: 'Part I', short: 'Triangles', title: 'A Tale of Three Intersecting Lines',
    blurb: 'Triangles as three intersecting lines: equilateral, isosceles and scalene; acute, right and obtuse; the triangle inequality, constructing a triangle from three sides, the angle sum property (180°), and altitudes.',
    revise: {
      oneLine: 'Three lengths make a triangle only if each is less than the sum of the other two (3, 4, 8 fails: 3 + 4 < 8). The angles of any triangle add to 180°, shown by the parallel line through a vertex (alternate angles). An altitude is the perpendicular from a vertex to the opposite side.',
      sections: [
        { h: 'Types', html: `<p>By sides: equilateral (all equal), isosceles (two equal), scalene. By angles: acute, right, obtuse.</p>` },
        { h: 'Construction (SSS)', html: `<p>Draw one side; arcs of the other two lengths from its ends meet at the third vertex — if the inequality holds.</p>` },
        { h: 'Angle sum', html: `<p>Line through A parallel to BC: alternate angles copy ∠B and ∠C next to ∠A on a straight line → 180°.</p>` }
      ],
      formulas: [['Triangle inequality', 'a + b > c (each pair)'], ['Angle sum', '∠A + ∠B + ∠C = 180°'], ['Equilateral angles', '60° each'], ['Isosceles', 'base angles equal']],
      terms: [['Altitude', 'perpendicular from vertex to opposite side'], ['Scalene', 'no equal sides'], ['Obtuse triangle', 'one angle > 90°']],
      traps: ['a + b = c gives a flat (degenerate) triangle, not a triangle.', 'A triangle can have at most one right or obtuse angle.', 'Altitude may fall outside an obtuse triangle.'],
      bridge: '<p>Ch 9 (Geometric Twins) studies congruent triangles.</p>'
    },
    explore: [
      { title: 'Build from three sides', intro: 'Choose three lengths. Arcs from the ends of the base meet only if the triangle inequality holds.',
        build(el, K) { let a = 6, b2 = 4, c = 5; const row = K.row(el); K.slider(row, 'base AB', 2, 10, 0.5, a, v => { a = v; bd.redraw(); }); K.slider(row, 'AC', 1, 10, 0.5, b2, v => { b2 = v; bd.redraw(); }); K.slider(row, 'BC', 1, 10, 0.5, c, v => { c = v; bd.redraw(); });
          const bd = new K.Board(el, { xmin: -2, xmax: 12, ymin: -2, ymax: 8, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          bd.onDraw = () => { bd.clear(); bd.line(0, 0, a, 0, { color: C.ink, w: 3 }); bd.dot(0, 0, { r: 5, label: 'A' }); bd.dot(a, 0, { r: 5, label: 'B' }); bd.arc(0, 0, b2, 0, Math.PI, { color: C.blue, w: 2 }); bd.arc(a, 0, c, 0, Math.PI, { color: C.orange, w: 2 });
            const ok = b2 + c > a && a + b2 > c && a + c > b2; if (ok) { const x = (a * a + b2 * b2 - c * c) / (2 * a), y = Math.sqrt(Math.max(0, b2 * b2 - x * x)); bd.poly([[0, 0], [a, 0], [x, y]], { fill: C.purpleL, color: C.purple, w: 3 }); bd.dot(x, y, { r: 5, label: 'C' }); const ang = (p, q, r) => Math.acos((q * q + r * r - p * p) / (2 * q * r)) * 180 / Math.PI; const A = ang(c, a, b2), B = ang(b2, a, c);
              rd.innerHTML = `${a} + ${b2} > ${c}, ${a} + ${c} > ${b2}, ${b2} + ${c} > ${a} ✔ · angles ≈ ${A.toFixed(0)}°, ${B.toFixed(0)}°, ${(180 - A - B).toFixed(0)}° (sum 180°)`; }
            else rd.innerHTML = `<b>no triangle</b>: ${[[a, b2, c], [a, c, b2], [b2, c, a]].filter(([p, q, r]) => p + q <= r).map(([p, q, r]) => `${p} + ${q} ≤ ${r}`).join(', ')} — the arcs do not meet above the base`; };
          bd.redraw(); return null; } },
      { title: 'Why 180°?', intro: 'Drag the top vertex; the parallel line through it shows the angle sum.',
        build(el, K) { let px = 2.2, py = 3.6; const row = K.row(el); K.slider(row, 'apex x', -1, 7, 0.1, px, v => { px = v; b.redraw(); }); K.slider(row, 'apex height', 1, 5, 0.1, py, v => { py = v; b.redraw(); });
          const b = new K.Board(el, { xmin: -3, xmax: 9, ymin: -1, ymax: 6, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const A = [0, 0], B = [6, 0], P = [px, py]; b.poly([A, B, P], { fill: 'rgba(29,78,216,.06)', color: C.ink, w: 3 }); b.line(-3, py, 9, py, { color: C.grey, w: 2, dash: [6, 4] });
            const aA = Math.atan2(py, px), aB = Math.atan2(py, 6 - px), aP = Math.PI - aA - aB; b.arc(0, 0, 0.7, 0, aA, { sector: true, fill: C.blueL, color: C.blue }); b.arc(6, 0, 0.7, Math.PI - aB, Math.PI, { sector: true, fill: C.orangeL, color: C.orange });
            b.arc(px, py, 0.7, Math.PI, Math.PI + aA, { sector: true, fill: C.blueL, color: C.blue }); b.arc(px, py, 0.7, -aB, 0, { sector: true, fill: C.orangeL, color: C.orange }); b.arc(px, py, 0.55, Math.PI + aA, 2 * Math.PI - aB, { sector: true, fill: C.purpleL, color: C.purple });
            const d = x => (x * 180 / Math.PI).toFixed(0); rd.innerHTML = `∠A = ${d(aA)}° (blue), ∠B = ${d(aB)}° (orange), ∠C = ${d(aP)}° (purple) · blue and orange are copied at C as alternate angles; together they make a straight line: <b>180°</b>`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Can these make a triangle?', gen(R) { const a = R.int(2, 12), b = R.int(2, 12), c = R.int(2, 20); const ok = a + b > c && a + c > b && b + c > a; return { q: `Can ${a} cm, ${b} cm and ${c} cm form a triangle?`, a: ok ? 'yes' : 'no' }; } },
      { title: 'Third angle', gen(R) { const a = R.int(20, 100), b = R.int(20, 160 - a); return { q: `Two angles of a triangle are ${a}° and ${b}°. Third angle?`, a: `${180 - a - b}°`, ans: 180 - a - b }; } },
      { title: 'Isosceles', levels: [2, 3], gen(R) { const v = R.int(20, 140); return { q: `An isosceles triangle has vertex angle ${v}°. Each base angle?`, a: `${(180 - v) / 2}°`, ans: (180 - v) / 2 }; } },
      { title: 'Range of the third side', levels: [2, 3], gen(R) { const a = R.int(3, 12), b = R.int(3, 12); return { q: `Two sides are ${a} cm and ${b} cm. Between which values must the third side lie?`, a: `between ${Math.abs(a - b)} cm and ${a + b} cm` }; } },
      { title: 'Classify', gen(R) { const a = R.int(20, 110), b = R.int(20, 150 - a), c = 180 - a - b; const m = Math.max(a, b, c); return { q: `Angles ${a}°, ${b}°, ${c}°: acute, right or obtuse triangle?`, a: m < 90 ? 'acute' : m === 90 ? 'right' : 'obtuse' }; } }
    ],
    quiz: [
      { q: 'Angle sum of a triangle', o: ['180°', '360°', '90°', '270°'], a: 0, e: 'Straight line.' }, { q: '3, 4, 8 cm form a triangle?', o: ['no', 'yes', 'only right', 'only isosceles'], a: 0, e: '3 + 4 < 8.' },
      { q: 'Angles 50°, 60°: third', o: ['70°', '80°', '90°', '110°'], a: 0, e: '180 − 110.' }, { q: 'Equilateral triangle angles', o: ['60° each', '90°, 45°, 45°', '30°, 60°, 90°', '120° each'], a: 0, e: '180 ÷ 3.' },
      { q: 'Isosceles vertex 40°: base angles', o: ['70°', '40°', '140°', '50°'], a: 0, e: '140 ÷ 2.' }, { q: 'How many obtuse angles can a triangle have?', o: ['at most 1', '2', '3', '0 always'], a: 0, e: 'Sum 180.' },
      { q: 'Altitude is', o: ['perpendicular from vertex to opposite side', 'a median', 'a side', 'an angle bisector'], a: 0, e: 'Definition.' }, { q: 'Sides 5 and 9: third side could be', o: ['7', '4', '14', '15'], a: 0, e: '4 < x < 14.' },
      { q: 'Angles 30°, 60°, 90°', o: ['right triangle', 'acute', 'obtuse', 'equilateral'], a: 0, e: 'Has 90°.' }, { q: 'Scalene means', o: ['no equal sides', 'two equal sides', 'all equal', 'right angle'], a: 0, e: 'All different.' },
      { q: 'Proof of 180° uses', o: ['a parallel line and alternate angles', 'a circle', 'Pythagoras', 'area'], a: 0, e: 'Parallel line.' }
    ],
    teach: {
      outcomes: ['Classify triangles', 'Apply the triangle inequality', 'Construct triangles (SSS)', 'Prove and use the angle sum'],
      periods: [{ t: 'Triangle inequality', flow: [['10 min', 'Straw triangles.'], ['15 min', 'Explore panel 1.'], ['15 min', 'SSS construction.']] }, { t: 'Angle sum', flow: [['15 min', 'Tear-the-corners activity.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Equality allowed in inequality.', 'Two obtuse angles.'], activities: ['Straw/stick triangles.', 'Corner-tearing proof.'],
      exit: ['2, 5, 6 a triangle?', 'Third angle for 47° and 68°.', 'Base angles for 100° vertex.'], homework: 'Construct triangles with sides (5, 6, 7) and (4, 4, 4). Measure their angles and check the sum.'
    },
    slides: [{ t: 'A Tale of Three Intersecting Lines', b: ['Types of triangles', 'Triangle inequality', 'SSS construction', 'Angle sum 180°'] }, { t: 'Check yourself', b: ['4, 6, 11 a triangle?', 'Angles 35°, 85°, ?'] }],
    fs: { groups: [['Types', [['By sides', 'equilateral, isosceles, scalene'], ['By angles', 'acute, right, obtuse']]], ['Rules', [['Inequality', 'a + b > c'], ['Third side', '|a − b| < x < a + b'], ['Angle sum', '180°']]], ['Special', [['Equilateral', '60° each'], ['Isosceles', 'base angles equal']]]],
      ex: [['3, 4, 8', 'no triangle'], ['50°, 60°', 'third 70°']], rem: ['Check all three pairs.', 'Only one big angle.', 'Use a parallel line to prove 180°.'] }
  });
})();
