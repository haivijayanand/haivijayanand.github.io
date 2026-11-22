/*
TOOL:    class8_maths_ch04
FAMILY:  CBSE_REVISION / Class 8 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class VIII moved into the series
CHANGES: 1.0.0 - Part I Ch 4 Quadrilaterals - revise, 2 explore panels (drag-and-classify with diagonal tests, angle sum by triangles), 6 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num } = G9;
  const d2 = (P, Q) => (P.x - Q.x) ** 2 + (P.y - Q.y) ** 2;
  const ang = (A, B, Cc) => { const u = [A.x - B.x, A.y - B.y], v = [Cc.x - B.x, Cc.y - B.y]; return Math.acos(Math.max(-1, Math.min(1, (u[0] * v[0] + u[1] * v[1]) / Math.sqrt((u[0] ** 2 + u[1] ** 2) * (v[0] ** 2 + v[1] ** 2))))) * 180 / Math.PI; };

  G9.register({
    no: 4, part: 'Part I', short: 'Quadrilaterals', title: 'Quadrilaterals',
    blurb: 'Rectangles, squares, parallelograms, rhombuses, kites and trapeziums — their sides, angles and diagonals, and why the properties are true.',
    revise: {
      oneLine: 'A quadrilateral has four sides, four angles adding to 360° and two diagonals. Special quadrilaterals are recognised by their sides and angles, and many are pinned down by what their diagonals do.',
      sections: [
        { h: 'Angle sum', html: `<p>A diagonal splits any quadrilateral into two triangles, so the angles add to 2 × 180° = <b>360°</b>.</p>` },
        { h: 'The family', html: `<table class="t"><tr><th>Shape</th><th>Sides / angles</th><th>Diagonals</th></tr>
          <tr><td>Parallelogram</td><td>opposite sides parallel and equal; opposite angles equal; adjacent angles add to 180°</td><td>bisect each other</td></tr>
          <tr><td>Rectangle</td><td>parallelogram with all angles 90°</td><td>equal and bisect each other</td></tr>
          <tr><td>Rhombus</td><td>parallelogram with all sides equal</td><td>perpendicular bisectors of each other; bisect the angles</td></tr>
          <tr><td>Square</td><td>rectangle and rhombus</td><td>equal, perpendicular, bisect each other</td></tr>
          <tr><td>Kite</td><td>two pairs of equal adjacent sides</td><td>one diagonal is the perpendicular bisector of the other</td></tr>
          <tr><td>Trapezium</td><td>at least one pair of parallel sides</td><td>isosceles trapezium: equal diagonals</td></tr></table>` },
        { h: 'Reasoning with diagonals', html: `<p>Why do a rectangle's diagonals have equal length? The two triangles they form are congruent (SAS). Converse tests: a quadrilateral whose diagonals bisect each other is a parallelogram; if they are also equal, a rectangle; also perpendicular, a square.</p>` }
      ],
      formulas: [['Angle sum', '360°'], ['Parallelogram', 'adjacent angles add to 180°'], ['Rectangle', 'diagonals equal, bisect each other'], ['Rhombus', 'diagonals perpendicular, bisect each other'], ['Square', 'all of the above'], ['Kite', 'one diagonal ⊥ bisector of the other']],
      terms: [['Diagonal', 'segment joining opposite vertices'], ['Bisect', 'cut into two equal parts'], ['Convex', 'every diagonal lies inside'], ['Isosceles trapezium', 'non-parallel sides equal']],
      traps: ['Every square is a rectangle, not the other way round.', 'A rhombus need not have right angles.', 'Diagonals of a parallelogram are not always equal.', 'A kite is not a parallelogram.'],
      bridge: '<p>Class 9 Ch 12 (Quadrilaterals) proves these with congruence and adds the midpoint theorem.</p>'
    },

    explore: [
      {
        title: 'Drag and classify', intro: 'Drag the four vertices. The sides, angles and diagonals are measured and the most special name is given.',
        build(el, K) {
          const b = new K.Board(el, { xmin: -8, xmax: 8, ymin: -5, ymax: 5 }); const rd = K.read(el);
          const row = K.row(el); const presets = { square: [[-2, -2], [2, -2], [2, 2], [-2, 2]], rectangle: [[-4, -2], [3, -2], [3, 2], [-4, 2]], rhombus: [[0, -3], [3, 0], [0, 3], [-3, 0]], parallelogram: [[-4, -2], [2, -2], [4, 2], [-2, 2]], kite: [[0, -4], [3, 1], [0, 3], [-3, 1]], trapezium: [[-4, -2], [4, -2], [2, 2], [-2, 2]] };
          const P = [b.addPt(-4, -2, { label: 'A', snap: 0.5 }), b.addPt(2, -2, { label: 'B', snap: 0.5 }), b.addPt(4, 2, { label: 'C', snap: 0.5 }), b.addPt(-2, 2, { label: 'D', snap: 0.5 })];
          Object.keys(presets).forEach(k => K.button(row, k, () => { presets[k].forEach((p, i) => { P[i].x = p[0]; P[i].y = p[1]; }); b.redraw(); }));
          b.onDraw = () => { b.base(); const [A, B, Cc, D] = P; b.poly(P.map(p => [p.x, p.y]), { fill: C.blueL, color: C.blue, w: 3 }); b.line(A.x, A.y, Cc.x, Cc.y, { color: C.orange, w: 2, dash: [6, 4] }); b.line(B.x, B.y, D.x, D.y, { color: C.purple, w: 2, dash: [6, 4] });
            const s = [d2(A, B), d2(B, Cc), d2(Cc, D), d2(D, A)], e = (x, y) => Math.abs(x - y) < 1e-6; const an = [ang(D, A, B), ang(A, B, Cc), ang(B, Cc, D), ang(Cc, D, A)];
            const par = (P1, P2, P3, P4) => Math.abs((P2.x - P1.x) * (P4.y - P3.y) - (P2.y - P1.y) * (P4.x - P3.x)) < 1e-6;
            const pAB = par(A, B, D, Cc), pAD = par(A, D, B, Cc); const mid = e(A.x + Cc.x, B.x + D.x) && e(A.y + Cc.y, B.y + D.y), eqd = e(d2(A, Cc), d2(B, D)), perp = Math.abs((Cc.x - A.x) * (D.x - B.x) + (Cc.y - A.y) * (D.y - B.y)) < 1e-6;
            const right = an.every(a => Math.abs(a - 90) < 1e-3), allEq = s.every(x => e(x, s[0]));
            const name = pAB && pAD ? (right && allEq ? 'square' : right ? 'rectangle' : allEq ? 'rhombus' : 'parallelogram') : pAB || pAD ? 'trapezium' : (e(s[0], s[1]) && e(s[2], s[3])) || (e(s[1], s[2]) && e(s[3], s[0])) ? 'kite' : 'general quadrilateral';
            b.drawPts(); rd.innerHTML = `angles ${an.map(a => num(a, 1) + '°').join(', ')} (sum ${num(an.reduce((x, y) => x + y, 0), 1)}°) · sides ${s.map(x => num(Math.sqrt(x), 2)).join(', ')}<br>diagonals: ${mid ? 'bisect each other' : 'do not bisect each other'} · ${eqd ? 'equal' : 'unequal'} · ${perp ? 'perpendicular' : 'not perpendicular'} ⇒ <b>${name}</b>`; };
          b.redraw(); return null;
        }
      },
      {
        title: 'Why 360°?', intro: 'Press <kbd>S</kbd>: a diagonal cuts the quadrilateral into two triangles; their angles make up the quadrilateral\'s angles.',
        build(el, K) {
          const b = new K.Board(el, { xmin: -6, xmax: 6, ymin: -4, ymax: 4 }); const rd = K.read(el); const Q = [[-4, -2.5], [3.5, -3], [4, 2], [-2, 3]];
          const an = new K.Anim(3, () => b.redraw(), { ms: 1200 });
          b.onDraw = () => { b.clear(); const k = an.i; if (k >= 1) { b.poly([Q[0], Q[1], Q[2]], { fill: C.blueL, color: C.blue, w: 2 }); } if (k >= 2) b.poly([Q[0], Q[2], Q[3]], { fill: 'rgba(234,88,12,.25)', color: C.orange, w: 2 }); b.poly(Q, { color: C.ink, w: 3 }); if (k >= 1) b.line(...Q[0], ...Q[2], { color: C.purple, w: 2, dash: [6, 4] });
            rd.innerHTML = ['A quadrilateral ABCD. Press S.', 'Diagonal AC: triangle ABC has angles adding to 180°.', 'Triangle ACD also adds to 180°.', 'Together they make all four angles: 180° + 180° = <b>360°</b>.'][k]; };
          K.anim(el, an); b.redraw(); return an;
        }
      }
    ],

    gens: [
      { title: 'Missing angle', gen(R) {
          const a = R.int(60, 130), b = R.int(50, 120), c = R.int(50, 120); const d = 360 - a - b - c; if (d <= 10 || d >= 250) return this.gen(R);
          return { q: `Three angles of a quadrilateral are ${a}°, ${b}° and ${c}°. Find the fourth.`, a: `${d}°`, ans: d };
        } },
      { title: 'Parallelogram angles', gen(R) {
          const x = R.int(35, 85); return { q: `One angle of a parallelogram is ${x}°. Find the other three.`, a: `${180 - x}°, ${x}°, ${180 - x}°`, s: 'opposite angles equal, adjacent add to 180°' };
        } },
      { title: 'Angles in ratio', levels: [2, 3], gen(R) {
          const r = R.pick([[1, 2, 3, 4], [2, 3, 3, 4], [3, 4, 5, 6], [1, 1, 2, 2], [2, 3, 5, 8]]); const s = r.reduce((x, y) => x + y, 0); const k = 360 / s;
          return { q: `The angles of a quadrilateral are in the ratio ${r.join(' : ')}. Find them.`, a: r.map(v => num(v * k, 2) + '°').join(', ') };
        } },
      { title: 'Rhombus diagonals', levels: [2, 3], gen(R) {
          const T = R.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]]); return { q: `The diagonals of a rhombus are ${2 * T[0]} cm and ${2 * T[1]} cm. Find its side.`, a: `${T[2]} cm`, ans: T[2], s: 'diagonals bisect at right angles: halves form a right triangle' };
        } },
      { title: 'Rectangle diagonals', levels: [1, 2], gen(R) {
          const x = R.int(3, 15); return { q: `In rectangle PQRS the diagonals meet at O. If OP = ${x} cm, find PR and QS.`, a: `PR = QS = ${2 * x} cm`, ans: 2 * x };
        } },
      { title: 'Always, sometimes, never', levels: [1, 2], gen(R) {
          const items = [['A square is a rectangle.', 'always'], ['A rectangle is a square.', 'sometimes'], ['A rhombus has equal diagonals.', 'sometimes (when it is a square)'], ['A parallelogram\'s diagonals bisect each other.', 'always'], ['A kite is a parallelogram.', 'sometimes (only when it is a rhombus)'], ['A trapezium has two pairs of parallel sides.', 'sometimes'], ['The angles of a quadrilateral add to 360°.', 'always'], ['A rhombus has four right angles.', 'sometimes']];
          const [q, a] = R.pick(items); return { q: `Always, sometimes or never true? ${q}`, a };
        } }
    ],

    quiz: [
      { q: 'Angle sum of a quadrilateral', o: ['360°', '180°', '540°', '270°'], a: 0, e: 'Two triangles.' },
      { q: 'Diagonals of a rhombus are', o: ['perpendicular bisectors of each other', 'always equal', 'parallel', 'never meeting'], a: 0, e: 'Property.' },
      { q: 'A rectangle\'s diagonals are', o: ['equal and bisect each other', 'perpendicular', 'unequal', 'parallel'], a: 0, e: 'Congruent triangles.' },
      { q: 'One angle of a parallelogram is 70°; the adjacent angle is', o: ['110°', '70°', '90°', '20°'], a: 0, e: 'Supplementary.' },
      { q: 'Which is always a parallelogram?', o: ['rhombus', 'kite', 'trapezium', 'any quadrilateral'], a: 0, e: 'Opposite sides parallel.' },
      { q: 'A square is', o: ['a rectangle and a rhombus', 'only a rectangle', 'only a rhombus', 'a kite only'], a: 0, e: 'Both.' },
      { q: 'If diagonals bisect each other, the quadrilateral is a', o: ['parallelogram', 'kite', 'trapezium', 'circle'], a: 0, e: 'Converse.' },
      { q: 'A kite has', o: ['two pairs of equal adjacent sides', 'all sides equal', 'opposite sides parallel', 'four right angles'], a: 0, e: 'Definition.' },
      { q: 'Angles 90°, 90°, 100°, x: x =', o: ['80°', '90°', '100°', '70°'], a: 0, e: '360 − 280.' },
      { q: 'A trapezium has', o: ['at least one pair of parallel sides', 'two pairs', 'no parallel sides', 'equal diagonals always'], a: 0, e: 'Definition.' },
      { q: 'Rhombus with diagonals 6 and 8 has side', o: ['5', '7', '10', '14'], a: 0, e: '3-4-5.' }
    ],

    teach: {
      outcomes: ['Use the angle sum of a quadrilateral', 'State and justify properties of special quadrilaterals', 'Classify quadrilaterals by sides, angles and diagonals', 'Use diagonal tests (converses)'],
      periods: [
        { t: 'Angle sum and family tree', flow: [['10 min', 'Explore panel 2: why 360°.'], ['15 min', 'Family tree of quadrilaterals.'], ['15 min', 'Practice.']] },
        { t: 'Diagonals', flow: [['20 min', 'Explore panel 1: drag and classify.'], ['10 min', 'Why the properties hold (congruent triangles).'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Rectangle is a square.', 'Rhombus diagonals equal.', 'Kite is a parallelogram.'],
      activities: ['Straw-and-pin models: push a rectangle into a parallelogram.', 'Fold paper shapes along diagonals.'],
      exit: ['Fourth angle: 80°, 95°, 110°.', 'Name a quadrilateral with perpendicular, equal diagonals.', 'Adjacent angle to 65° in a parallelogram.'],
      homework: 'Show with a figure that if the diagonals of a quadrilateral are equal and bisect each other, it is a rectangle.'
    },

    slides: [
      { t: 'Quadrilaterals', b: ['Angle sum 360°', 'Family of special quadrilaterals', 'Diagonal properties'] },
      { t: 'Parallelogram family', b: ['Parallelogram: diagonals bisect', 'Rectangle: also equal', 'Rhombus: also perpendicular', 'Square: all'] },
      { t: 'Others', b: ['Kite: one diagonal ⊥ bisects the other', 'Trapezium: one pair of parallel sides'] },
      { t: 'Check yourself', b: ['Angles 3:3:5:7?', 'Answer: 60°, 60°, 100°, 140°'] }
    ],

    fs: { groups: [
        ['Basics', [['Angle sum', '360°'], ['Diagonals', 'join opposite vertices']]],
        ['Parallelogram family', [['Parallelogram', 'opp. sides ∥ and =, opp. angles =, diagonals bisect'], ['Rectangle', '+ right angles, diagonals equal'], ['Rhombus', '+ equal sides, diagonals ⊥'], ['Square', 'rectangle + rhombus']]],
        ['Others', [['Kite', 'two pairs of equal adjacent sides; one diagonal ⊥ bisector of the other'], ['Trapezium', 'one pair of parallel sides'], ['Isosceles trapezium', 'equal legs, equal diagonals']]],
        ['Tests', [['Diagonals bisect each other', 'parallelogram'], ['… and are equal', 'rectangle'], ['… and are perpendicular', 'rhombus'], ['… equal and perpendicular', 'square']]]],
      ex: [['Angles in ratio 1:2:3:4', '36°, 72°, 108°, 144°'], ['Rhombus with diagonals 10, 24', 'side 13']],
      rem: ['Draw the diagonals.', 'Squares are rectangles.', 'Adjacent angles of a parallelogram add to 180°.'] }
  });
})();
