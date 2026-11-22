/*
TOOL:    class11_maths_ch11
FAMILY:  CBSE_REVISION / Class 11 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 11 Introduction to Three Dimensional Geometry - revise, exam focus, 2 explore panels (rotatable 3-D point, octants), 5 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { Q, C, num } = G9;
  const sq = (n) => { const s = G9.surd(n); return s.i === 1 ? String(s.o) : (s.o === 1 ? '' : s.o) + '√' + s.i; };
  // octant numbering (NCERT): I(+,+,+) II(−,+,+) III(−,−,+) IV(+,−,+) V(+,+,−) VI(−,+,−) VII(−,−,−) VIII(+,−,−)
  const octN = (x, y, z) => { const t = { '+++': 'I', '-++': 'II', '--+': 'III', '+-+': 'IV', '++-': 'V', '-+-': 'VI', '---': 'VII', '+--': 'VIII' }; return t[(x < 0 ? '-' : '+') + (y < 0 ? '-' : '+') + (z < 0 ? '-' : '+')]; };

  G9.register({
    no: 11, part: 'Unit III · Coordinate Geometry (12 marks)', short: '3-D geometry', title: 'Introduction to Three Dimensional Geometry',
    blurb: 'Axes and planes in space, octants, coordinates of a point, distance formula in three dimensions.',
    revise: {
      oneLine: 'Three mutually perpendicular axes split space into eight octants; a point is (x, y, z). Distances follow from Pythagoras applied twice: PQ = √((x₂ − x₁)² + (y₂ − y₁)² + (z₂ − z₁)²).',
      sections: [
        { h: 'Axes, planes and octants', html: `<p>The x-, y- and z-axes meet at O. Coordinate planes: XY (z = 0), YZ (x = 0), ZX (y = 0). They divide space into <b>8 octants</b>; signs of (x, y, z) decide the octant: I (+, +, +), II (−, +, +), III (−, −, +), IV (+, −, +), V (+, +, −), VI (−, +, −), VII (−, −, −), VIII (+, −, −).</p>
          <p>On the x-axis: (x, 0, 0). In the XY-plane: (x, y, 0). The x-coordinate is the distance from the YZ-plane.</p>` },
        { h: 'Distance formula', html: `<div class="box m">PQ = √((x₂ − x₁)² + (y₂ − y₁)² + (z₂ − z₁)²); OP = √(x² + y² + z²)</div>
          <p>Use it to test collinearity (PQ + QR = PR), right angles (Pythagoras) and types of triangles, and to find loci such as points equidistant from two points.</p>` },
        { h: 'Section formula (useful)', html: `<p>The point dividing PQ internally in ratio m : n: ((mx₂ + nx₁)/(m + n), (my₂ + ny₁)/(m + n), (mz₂ + nz₁)/(m + n)). Midpoint: average the coordinates.</p>` }
      ],
      formulas: [['Distance', '√(Δx² + Δy² + Δz²)'], ['From origin', '√(x² + y² + z²)'], ['Midpoint', '((x₁ + x₂)/2, (y₁ + y₂)/2, (z₁ + z₂)/2)'], ['Point on z-axis', '(0, 0, z)'], ['Point in XY-plane', '(x, y, 0)']],
      terms: [['Octant', 'one of the eight regions of space'], ['Coordinate plane', 'XY, YZ or ZX plane'], ['Locus', 'set of points satisfying a condition']],
      traps: ['On the y-axis both x and z are 0.', 'Sign patterns for octants V–VIII.', 'Dropping the z-difference in the distance formula.'],
      board: '<p><b>Unit III (Coordinate Geometry) — 12 marks.</b> Usually 1–3 marks from this chapter: octant of a point, coordinates on axes/planes, distance between points, and showing points are collinear or form a right/isosceles triangle.</p>',
      bridge: '<p>Class 12 Vectors and Three Dimensional Geometry continue with direction cosines, lines and planes.</p>'
    },

    explore: [
      {
        title: 'Plot a point in space', intro: 'Set x, y, z and rotate the view. The dashed box shows how the coordinates are measured; the octant is named.',
        build(el, K) {
          let x = 3, y = 4, z = 2, rot = 0.6; const row = K.row(el); const rd = K.read(el);
          [['x', v => x = v, x], ['y', v => y = v, y], ['z', v => z = v, z]].forEach(s => K.slider(row, s[0], -5, 5, 1, s[2], v => { s[1](v); bd.redraw(); }));
          K.slider(row, 'view', 0, 6.28, 0.05, rot, v => { rot = v; an.pause(); bd.redraw(); });
          const bd = new K.Board(el, { xmin: -7, xmax: 7, ymin: -5.2, ymax: 6.8, axes: false, grid: 0 });
          const an = new K.Anim(Infinity, () => { rot = (rot + 0.02) % 6.283; bd.redraw(); }, { ms: 40 });
          const pr = (X, Y, Z) => { const c = Math.cos(rot), s = Math.sin(rot); const u = X * c - Y * s, v = X * s * 0.45 + Y * c * 0.45; return [u, Z + v * -0.6 + 0]; };
          const L = (p, q, o) => bd.line(...pr(...p), ...pr(...q), o);
          bd.onDraw = () => { bd.clear(); L([-6, 0, 0], [6, 0, 0], { color: C.blue, w: 2 }); L([0, -6, 0], [0, 6, 0], { color: C.orange, w: 2 }); L([0, 0, -5], [0, 0, 6], { color: C.purple, w: 2 });
            bd.text(...pr(6.6, 0, 0), 'X', { color: C.blue, font: 'bold 15px' }); bd.text(...pr(0, 6.6, 0), 'Y', { color: C.orange, font: 'bold 15px' }); bd.text(...pr(0, 0, 6.5), 'Z', { color: C.purple, font: 'bold 15px' });
            const d = { color: C.grey, w: 1.5, dash: [4, 4] }; L([x, 0, 0], [x, y, 0], d); L([0, y, 0], [x, y, 0], d); L([x, y, 0], [x, y, z], { color: C.ink, w: 2, dash: [4, 4] }); L([0, 0, 0], [x, y, z], { color: C.ink, w: 1 });
            bd.dot(...pr(x, y, z), { color: C.orange, r: 6, label: `P(${x}, ${y}, ${z})` }); bd.dot(...pr(x, y, 0), { color: C.grey, r: 3 });
            const where = (x === 0) + (y === 0) + (z === 0) >= 2 ? 'on an axis' : x === 0 ? 'in the YZ-plane' : y === 0 ? 'in the ZX-plane' : z === 0 ? 'in the XY-plane' : `in octant <b>${octN(x, y, z)}</b>`;
            rd.innerHTML = `P(${x}, ${y}, ${z}) lies ${where} · OP = √(${x * x} + ${y * y} + ${z * z}) = ${sq(x * x + y * y + z * z)} ≈ ${num(Math.hypot(x, y, z), 3)}`; };
          K.anim(el, an); bd.redraw(); return an;
        }
      },
      {
        title: 'Distance in 3-D: Pythagoras twice', intro: 'Two points; the horizontal distance comes first, then the vertical step.',
        build(el, K) {
          let R = G9.rng(G9.newSeed()); const rd = K.read(el); let P, Qp;
          const make = () => { P = [R.int(-4, 4), R.int(-4, 4), R.int(-4, 4)]; Qp = [R.int(-4, 4), R.int(-4, 4), R.int(-4, 4)]; const dx = Qp[0] - P[0], dy = Qp[1] - P[1], dz = Qp[2] - P[2];
            rd.innerHTML = `P(${P.join(', ')}), Q(${Qp.join(', ')})<br>Δx = ${dx}, Δy = ${dy}, Δz = ${dz}<br>horizontal: √(${dx * dx} + ${dy * dy}) = ${sq(dx * dx + dy * dy)} · then PQ = √(${dx * dx + dy * dy} + ${dz * dz}) = <b>${sq(dx * dx + dy * dy + dz * dz)}</b> ≈ ${num(Math.hypot(dx, dy, dz), 3)}`; };
          const row = K.row(el); K.button(row, 'New points (S)', make); make(); return { step: make, play() {}, pause() {} };
        }
      }
    ],

    gens: [
      { title: 'Octant of a point', levels: [1, 2], gen(R) {
          const x = R.nz(-7, 7), y = R.nz(-7, 7), z = R.nz(-7, 7);
          return { q: `In which octant does the point (${x}, ${y}, ${z}) lie?`, a: `Octant ${octN(x, y, z)}`, s: `signs (${x < 0 ? '−' : '+'}, ${y < 0 ? '−' : '+'}, ${z < 0 ? '−' : '+'})` };
        } },
      { title: 'Points on axes and planes', levels: [1], gen(R) {
          const items = [['a point on the x-axis', '(x, 0, 0)'], ['a point on the y-axis', '(0, y, 0)'], ['a point on the z-axis', '(0, 0, z)'], ['a point in the XY-plane', '(x, y, 0)'], ['a point in the YZ-plane', '(0, y, z)'], ['a point in the ZX-plane', '(x, 0, z)']];
          const [q, a] = R.pick(items); return { q: `Write the general coordinates of ${q}.`, a };
        } },
      { title: 'Distance between two points', gen(R) {
          const P = [R.int(-5, 5), R.int(-5, 5), R.int(-5, 5)], d = R.pick([[1, 2, 2], [2, 3, 6], [1, 4, 8], [2, 6, 9], [R.int(-4, 4), R.int(-4, 4), R.int(-4, 4)]]).map(v => v * R.sign());
          const Qp = P.map((v, i) => v + d[i]); const s2 = d.reduce((s, v) => s + v * v, 0);
          return { q: `Find the distance between (${P.join(', ')}) and (${Qp.join(', ')}).`, a: sq(s2), ans: Math.sqrt(s2), s: `√(${d.map(v => v * v).join(' + ')})` };
        } },
      { title: 'Collinear / triangle type', levels: [2, 3], gen(R) {
          const A = [R.int(-3, 3), R.int(-3, 3), R.int(-3, 3)], d = [R.nz(-2, 2), R.nz(-2, 2), R.nz(-2, 2)], k = R.int(1, 3);
          const B = A.map((v, i) => v + d[i]), Cp = A.map((v, i) => v + (k + 1) * d[i]); const n = Math.sqrt(d.reduce((s, v) => s + v * v, 0));
          const s2 = d.reduce((s, v) => s + v * v, 0);
          return { q: `Show that A(${A.join(', ')}), B(${B.join(', ')}), C(${Cp.join(', ')}) are collinear.`, a: `AB = ${sq(s2)}, BC = ${sq(k * k * s2)}, AC = ${sq((k + 1) * (k + 1) * s2)}; AB + BC = AC`, s: 'Check AB + BC = AC.' };
        } },
      { title: 'Equidistant locus / midpoint', levels: [2, 3], gen(R) {
          if (R.chance(.5)) { const P = [R.int(-6, 6), R.int(-6, 6), R.int(-6, 6)], Qp = [R.int(-6, 6), R.int(-6, 6), R.int(-6, 6)];
            return { q: `Find the midpoint of the segment joining (${P.join(', ')}) and (${Qp.join(', ')}).`, a: `(${P.map((v, i) => Q(v + Qp[i], 2)).join(', ')})` }; }
          const a = R.int(1, 5), b = R.int(1, 5);
          return { q: `Find the equation of the set of points equidistant from (${a}, 0, 0) and (−${a}, 0, 0), and of the set of points whose distance from (0, 0, 0) is ${b}.`, a: `x = 0 (the YZ-plane); x² + y² + z² = ${b * b}`, s: 'square both distances and equate' };
        } }
    ],

    quiz: [
      { q: 'Point (−3, 1, 2) lies in octant', o: ['I', 'II', 'III', 'VI'], a: 1, e: '(−, +, +).' },
      { q: 'Point (4, −2, −5) lies in octant', o: ['IV', 'VII', 'VIII', 'V'], a: 2, e: '(+, −, −).' },
      { q: 'Any point on the y-axis has the form', o: ['(x, 0, 0)', '(0, y, 0)', '(0, 0, z)', '(x, y, 0)'], a: 1, e: 'x = z = 0.' },
      { q: 'Equation of the XY-plane', o: ['x = 0', 'y = 0', 'z = 0', 'x = y'], a: 2, e: 'z-coordinate 0.' },
      { q: 'Distance of (2, 3, 6) from the origin', o: ['7', '11', '49', '√11'], a: 0, e: '√(4 + 9 + 36).' },
      { q: 'Distance between (1, 2, 3) and (4, 6, 3)', o: ['5', '7', '25', '√7'], a: 0, e: '√(9 + 16 + 0).' },
      { q: 'Number of octants', o: ['4', '6', '8', '3'], a: 2, e: 'Three planes.' },
      { q: 'The x-coordinate of a point is its distance from the', o: ['YZ-plane', 'XY-plane', 'ZX-plane', 'x-axis'], a: 0, e: 'Perpendicular distance.' },
      { q: 'Midpoint of (2, 4, 6) and (4, 0, −2)', o: ['(3, 2, 2)', '(6, 4, 4)', '(1, 2, 4)', '(3, 2, 4)'], a: 0, e: 'Average coordinates.' },
      { q: 'Foot of perpendicular from (3, 4, 5) on the XY-plane', o: ['(3, 4, 0)', '(0, 0, 5)', '(3, 0, 5)', '(0, 4, 5)'], a: 0, e: 'Set z = 0.' },
      { q: 'Distance of (3, 4, 5) from the z-axis', o: ['5', '√41', '√34', '3'], a: 0, e: '√(x² + y²).' }
    ],

    teach: {
      outcomes: ['Describe axes, coordinate planes and octants', 'Locate points and give coordinates on axes and planes', 'Use the distance formula in 3-D', 'Test collinearity and triangle types'],
      periods: [
        { t: 'Coordinates in space', flow: [['10 min', 'Corner of the classroom as origin; walls as planes.'], ['20 min', 'Explore panel 1: octants and coordinates.'], ['10 min', 'Practice.']] },
        { t: 'Distance', flow: [['15 min', 'Explore panel 2: Pythagoras twice.'], ['15 min', 'Collinearity, triangle problems, loci.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Points on axes vs planes.', 'Octant numbering beyond IV.', 'Missing Δz.'],
      activities: ['Three metre sticks taped at a corner to model axes.', 'Find a "fly in the room" position given distances from walls.'],
      exit: ['Octant of (−2, −3, 4).', 'Distance between (1, −1, 2) and (3, 1, 3).', 'Coordinates of a point in the ZX-plane.'],
      homework: 'Show that (−2, 3, 5), (1, 2, 3) and (7, 0, −1) are collinear. Find the locus of points whose sum of distances from (4, 0, 0) and (−4, 0, 0) is 10.'
    },

    slides: [
      { t: 'Introduction to 3-D Geometry', b: ['Axes and planes', 'Octants', 'Coordinates of a point', 'Distance formula'] },
      { t: 'Octants', b: ['Three planes ⇒ 8 octants', 'Signs of (x, y, z) decide the octant', 'I: (+, +, +), VII: (−, −, −)'] },
      { t: 'Distance', b: ['PQ = √(Δx² + Δy² + Δz²)', 'OP = √(x² + y² + z²)'] },
      { t: 'Check yourself', b: ['Octant of (1, −2, 3)?', 'Distance of (1, 2, 2) from O?', 'Answers: IV · 3'] }
    ],

    fs: { groups: [
        ['Planes and axes', [['XY-plane', 'z = 0'], ['YZ-plane', 'x = 0'], ['ZX-plane', 'y = 0'], ['x-axis', '(x, 0, 0)'], ['y-axis', '(0, y, 0)'], ['z-axis', '(0, 0, z)']]],
        ['Octants', [['I, II, III, IV', '(+,+,+), (−,+,+), (−,−,+), (+,−,+)'], ['V, VI, VII, VIII', '(+,+,−), (−,+,−), (−,−,−), (+,−,−)']]],
        ['Formulas', [['Distance', '√((x₂ − x₁)² + (y₂ − y₁)² + (z₂ − z₁)²)'], ['From origin', '√(x² + y² + z²)'], ['Midpoint', 'average of coordinates'], ['Section m : n', '((mx₂ + nx₁)/(m + n), …)'], ['From z-axis', '√(x² + y²)']]]],
      ex: [['(2, −1, 3) and (−2, 1, 3)', '√(16 + 4 + 0) = 2√5'], ['Octant of (−4, 2, −5)', 'VI']],
      rem: ['Write the sign pattern first.', 'Three differences under the root.', 'Collinear: AB + BC = AC.'] }
  });
})();
