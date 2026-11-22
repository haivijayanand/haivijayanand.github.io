/*
TOOL:    class7_maths_ch14
FAMILY:  CBSE_REVISION / Class 7 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 14 Constructions and Tilings (Part II Ch 6: constructing triangles SAS, ASA, RHS; parallel lines; regular tilings and polygons around a point) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 14, part: 'Part II', short: 'Constructions and tilings', title: 'Constructions and Tilings',
    blurb: 'Part II Chapter 6. Constructing triangles from SAS, ASA and RHS data, drawing a line parallel to a given line through a point, and tiling the plane: which regular polygons tile alone, and combinations around a point (semi-regular tilings).',
    revise: {
      oneLine: 'With ruler, compass and protractor you can construct a triangle from two sides and the included angle (SAS), two angles and the included side (ASA) or a right angle, hypotenuse and side (RHS). A tiling covers the plane with no gaps or overlaps; at each vertex the angles add to 360°. Only equilateral triangles, squares and regular hexagons tile alone.',
      sections: [
        { h: 'Constructions', html: `<p>SAS: draw a side, measure the angle, mark the second side, join. Parallel line through P: copy a corresponding angle at P.</p>` },
        { h: 'Interior angles', html: `<p>Regular n-gon angle = 180° − 360°/n: triangle 60°, square 90°, pentagon 108°, hexagon 120°, octagon 135°.</p>` },
        { h: 'Combinations', html: `<p>Octagon + octagon + square: 135 + 135 + 90 = 360°. Hexagon + square + square + triangle: 120 + 90 + 90 + 60 = 360°.</p>` }
      ],
      formulas: [['Regular polygon angle', '180° − 360°/n'], ['Tiling vertex', 'angles sum 360°'], ['Tiles alone', '3, 4, 6 sides'], ['8.8.4', '135 + 135 + 90']],
      terms: [['Tiling (tessellation)', 'no gaps or overlaps'], ['Regular polygon', 'equal sides and angles'], ['Vertex arrangement', 'polygons around a point']],
      traps: ['Regular pentagons do not tile.', 'SAS needs the included angle.', 'Check angles add to exactly 360°.'],
      bridge: '<p>Class 8 explores quadrilaterals and their constructions.</p>'
    },
    explore: [
      { title: 'Construct SAS', intro: 'Set two sides and the angle between them; press <kbd>S</kbd> for each step.',
        build(el, K) { let a = 6, c = 4.5, A = 50; const row = K.row(el); K.slider(row, 'AB', 2, 9, 0.5, a, v => { a = v; an.reset(); }); K.slider(row, '∠A (°)', 20, 150, 5, A, v => { A = v; an.reset(); }); K.slider(row, 'AC', 2, 8, 0.5, c, v => { c = v; an.reset(); }); const b = new K.Board(el, { xmin: -6, xmax: 10, ymin: -1, ymax: 8, axes: false, grid: 0, equal: true }); const rd = K.read(el); const an = new K.Anim(4, () => b.redraw(), { ms: 800 });
          b.onDraw = () => { b.clear(); const k = an.i, t = A * Math.PI / 180, Cp = [c * Math.cos(t), c * Math.sin(t)]; if (k >= 1) { b.line(0, 0, a, 0, { color: C.ink, w: 3 }); b.dot(0, 0, { r: 5, label: 'A' }); b.dot(a, 0, { r: 5, label: 'B' }); } if (k >= 2) { b.arc(0, 0, 1, 0, t, { color: C.orange, w: 2 }); b.line(0, 0, 8 * Math.cos(t), 8 * Math.sin(t), { color: C.grey, w: 1.5, dash: [5, 4] }); } if (k >= 3) { b.arc(0, 0, c, t - 0.25, t + 0.25, { color: C.blue, w: 2 }); b.dot(...Cp, { r: 5, label: 'C' }); } if (k >= 4) b.poly([[0, 0], [a, 0], Cp], { fill: C.purpleL, color: C.purple, w: 3 });
            const BC = Math.hypot(a - Cp[0], Cp[1]); rd.innerHTML = ['press S to start', 'step 1: draw AB = ' + a, `step 2: measure ∠A = ${A}° and draw a ray`, `step 3: mark AC = ${c} on the ray`, `step 4: join BC (≈ ${BC.toFixed(2)}) — a unique triangle (SAS)`][Math.min(k, 4)]; };
          K.anim(el, an); b.redraw(); return an; } },
      { title: 'Polygons around a point', intro: 'Choose a vertex arrangement; see whether it closes at 360°.',
        build(el, K) { const ARR = [['3.3.3.3.3.3', [3, 3, 3, 3, 3, 3]], ['4.4.4.4', [4, 4, 4, 4]], ['6.6.6', [6, 6, 6]], ['8.8.4', [8, 8, 4]], ['3.4.6.4', [3, 4, 6, 4]], ['3.3.3.4.4', [3, 3, 3, 4, 4]], ['5.5.5 (fails)', [5, 5, 5]], ['3.12.12', [3, 12, 12]]]; let k = 3; const row = K.row(el); K.select(row, 'arrangement', ARR.map(x => x[0]), i => { k = i; b.redraw(); }); const s0 = row.querySelector('select'); if (s0) s0.value = 3;
          const b = new K.Board(el, { xmin: -3.2, xmax: 3.2, ymin: -3.2, ymax: 3.2, axes: false, grid: 0, equal: true }); const rd = K.read(el); const cols = [C.blueL, C.orangeL, C.purpleL, 'rgba(202,138,4,.25)', 'rgba(2,132,199,.2)', C.orangeL];
          b.onDraw = () => { b.clear(); let dir = 0, tot = 0; ARR[k][1].forEach((n, j) => { const A = Math.PI - 2 * Math.PI / n; const P = [[0, 0]]; let x = 0, y = 0, d = dir; for (let s = 0; s < n - 1; s++) { x += Math.cos(d); y += Math.sin(d); P.push([x, y]); d += Math.PI - A; } b.poly(P, { fill: cols[j % cols.length], color: C.ink, w: 2 }); dir += A; tot += A * 180 / Math.PI; }); b.dot(0, 0, { r: 5, color: C.purple });
            const parts = ARR[k][1].map(n => Math.round(180 - 360 / n)); rd.innerHTML = `${parts.join('° + ')}° = <b>${Math.round(tot)}°</b> → ${Math.abs(tot - 360) < 0.5 ? 'fits exactly around a point' : 'does not close (gap or overlap)'}`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Interior angle', gen(R) { const n = R.pick([3, 4, 5, 6, 8, 9, 10, 12]); return { q: `Each interior angle of a regular ${n}-gon?`, a: `${+(180 - 360 / n).toFixed(2)}°`, ans: 180 - 360 / n, tol: 0.01 }; } },
      { title: 'Tiles alone?', gen(R) { const n = R.pick([3, 4, 5, 6, 7, 8, 10, 12]); return { q: `Does a regular ${n}-gon tile the plane on its own?`, a: [3, 4, 6].includes(n) ? `yes (${360 / (180 - 360 / n)} at each vertex)` : `no (360 ÷ ${+(180 - 360 / n).toFixed(1)} is not a whole number)` }; } },
      { title: 'Around a point', levels: [2, 3], gen(R) { const t = R.pick([[[8, 8], 4], [[12, 12], 3], [[6, 6], 6], [[4, 6], 12], [[3, 3, 3, 3], 6]]); const s = t[0].reduce((x, n) => x + 180 - 360 / n, 0); return { q: `Regular ${t[0].join(', ')}-gons meet at a point. Which regular polygon fills the gap of ${360 - s}°?`, a: `${t[1]}-gon (${180 - 360 / t[1]}°)` }; } },
      { title: 'Which construction?', gen(R) { const t = R.pick([['AB = 5 cm, ∠A = 60°, AC = 4 cm', 'SAS'], ['∠A = 50°, AB = 6 cm, ∠B = 70°', 'ASA'], ['∠C = 90°, hypotenuse AB = 10 cm, AC = 6 cm', 'RHS'], ['AB = 5, BC = 6, CA = 7', 'SSS']]); return { q: `Construction rule for ${t[0]}?`, a: t[1] }; } },
      { title: 'Third angle for ASA', levels: [2, 3], gen(R) { const a = R.int(30, 80), b = R.int(30, 80); return { q: `In ASA construction ∠A = ${a}° and ∠B = ${b}°. What will ∠C measure?`, a: `${180 - a - b}°`, ans: 180 - a - b }; } }
    ],
    quiz: [
      { q: 'Regular hexagon angle', o: ['120°', '108°', '135°', '90°'], a: 0, e: '180 − 60.' }, { q: 'Tiles alone', o: ['square', 'pentagon', 'octagon', 'heptagon'], a: 0, e: '4 × 90.' },
      { q: '8.8.4 works because', o: ['135 + 135 + 90 = 360', '8 + 8 + 4 = 20', 'all are even', 'octagons are big'], a: 0, e: 'Angle sum.' }, { q: 'Regular pentagon angle', o: ['108°', '120°', '72°', '100°'], a: 0, e: '180 − 72.' },
      { q: 'SAS needs', o: ['the included angle', 'any angle', 'three angles', 'a right angle'], a: 0, e: 'Between sides.' }, { q: 'Angles at a tiling vertex add to', o: ['360°', '180°', '540°', '720°'], a: 0, e: 'Full turn.' },
      { q: 'Equilateral triangles at a vertex', o: ['6', '3', '4', '5'], a: 0, e: '6 × 60.' }, { q: 'Regular octagon angle', o: ['135°', '120°', '140°', '150°'], a: 0, e: '180 − 45.' },
      { q: 'Parallel line through P uses', o: ['equal corresponding angles', 'a circle only', 'Pythagoras', 'area'], a: 0, e: 'Copy angle.' }, { q: 'RHS is for', o: ['right triangles', 'equilateral', 'obtuse', 'all'], a: 0, e: 'Right angle.' },
      { q: '3.4.6.4 angles', o: ['60 + 90 + 120 + 90', '60 + 90 + 108 + 90', '3 + 4 + 6 + 4', '60 + 60 + 120 + 120'], a: 0, e: 'Sum 360.' }
    ],
    teach: {
      outcomes: ['Construct triangles from SAS, ASA, RHS', 'Construct parallel lines', 'Explain tilings with angle sums'],
      periods: [{ t: 'Constructions', flow: [['10 min', 'Recap SSS.'], ['15 min', 'Explore panel 1.'], ['15 min', 'ASA and RHS in notebooks.']] }, { t: 'Tilings', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Cut-out polygon tiling.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Non-included angle in SAS.', 'All regular polygons tile.'], activities: ['Pattern-block tilings.', 'Floor tile survey.'],
      exit: ['Construct ASA: 6 cm, 40°, 60°.', 'Angle of a regular 9-gon.', 'Does 4.8.8 tile?'], homework: 'Design a semi-regular tiling on paper using two kinds of regular polygons and show the 360° check at one vertex.'
    },
    slides: [{ t: 'Constructions and Tilings', b: ['SAS, ASA, RHS constructions', 'Parallel lines', 'Regular polygon angles', 'Tilings at a vertex'] }, { t: 'Check yourself', b: ['Regular 12-gon angle?', 'Does 3.12.12 tile?'] }],
    fs: { groups: [['Constructions', [['SAS', 'included angle'], ['ASA', 'included side'], ['RHS', 'right angle, hypotenuse, side'], ['Parallel through P', 'copy corresponding angle']]], ['Polygon angles', [['Triangle', '60°'], ['Square', '90°'], ['Pentagon', '108°'], ['Hexagon', '120°'], ['Octagon', '135°']]], ['Tilings', [['Vertex', '360°'], ['Alone', '3, 4, 6'], ['Mixed', '8.8.4, 3.4.6.4, 3.12.12']]]],
      ex: [['8.8.4', '135 + 135 + 90'], ['Regular 12-gon', '150°']], rem: ['Use a sharp pencil.', 'Mark the included angle.', 'Check 360° at every vertex.'] }
  });
})();
