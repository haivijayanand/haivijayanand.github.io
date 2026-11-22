/*
TOOL:    class6_maths_ch08
FAMILY:  CBSE_REVISION / Class 6 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 8 Playing with Constructions (compass and ruler: circles, perpendiculars, squares and rectangles, diagonals) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 8, part: 'All chapters', short: 'Constructions', title: 'Playing with Constructions',
    blurb: 'Constructions with a ruler and compass: circles and arcs, artwork with curves, the perpendicular bisector of a segment, constructing squares and rectangles and exploring their diagonals.',
    revise: {
      oneLine: 'A compass draws all points at a fixed distance from a centre. Two arcs of equal radius from A and B meet at points equally far from A and B; joining them gives the perpendicular bisector of AB. Rectangles have equal diagonals that bisect each other; in a square they also meet at 90°.',
      sections: [
        { h: 'Circles and arcs', html: `<p>Every point on a circle is at the same distance (radius) from the centre.</p>` },
        { h: 'Perpendicular bisector', html: `<p>Arcs from A and B with radius more than half AB meet at P and Q; line PQ ⟂ AB through its midpoint.</p>` },
        { h: 'Rectangles and squares', html: `<p>Opposite sides equal, all angles 90°. Diagonals are equal and cut each other in half; a square's diagonals are also perpendicular.</p>` }
      ],
      formulas: [['Circle', 'points at radius r from centre'], ['Perpendicular bisector', 'points equidistant from A and B'], ['Rectangle diagonals', 'equal, bisect each other'], ['Square diagonals', 'equal, bisect at 90°']],
      terms: [['Compass', 'draws circles and arcs'], ['Perpendicular', 'at 90°'], ['Bisector', 'cuts into two equal parts']],
      traps: ['Arc radius must be more than half AB.', 'Keep the compass width fixed for both arcs.', 'Rhombus diagonals are not equal.'],
      bridge: '<p>Class 7 constructs triangles from given measures.</p>'
    },
    explore: [
      { title: 'Perpendicular bisector', intro: 'Press <kbd>S</kbd> for each construction step. Change the compass radius.',
        build(el, K) { let r = 2.6; const row = K.row(el); K.slider(row, 'compass radius', 1.6, 4, 0.1, r, v => { r = v; b.redraw(); }); const b = new K.Board(el, { xmin: -5, xmax: 5, ymin: -3.5, ymax: 3.5, axes: false, grid: 0, equal: true }); const rd = K.read(el); const an = new K.Anim(4, () => b.redraw(), { ms: 900 });
          b.onDraw = () => { b.clear(); const A = [-1.8, 0], B = [1.8, 0], k = an.i; b.line(...A, ...B, { color: C.ink, w: 3 }); b.dot(...A, { r: 6, label: 'A' }); b.dot(...B, { r: 6, label: 'B' });
            const ok = r > 1.8; if (k >= 1) b.arc(...A, r, -1.2, 1.2, { color: C.blue, w: 2 }); if (k >= 2) b.arc(...B, r, Math.PI - 1.2, Math.PI + 1.2, { color: C.orange, w: 2 });
            const h = ok ? Math.sqrt(r * r - 1.8 * 1.8) : 0; if (k >= 3 && ok) { b.dot(0, h, { r: 6, color: C.purple, label: 'P' }); b.dot(0, -h, { r: 6, color: C.purple, label: 'Q' }); b.line(0, h + 0.5, 0, -h - 0.5, { color: C.purple, w: 3 }); b.rect(0, 0, 0.25, 0.25, { color: C.purple, w: 1.5 }); }
            rd.innerHTML = !ok ? 'radius too small (must be more than half of AB = 1.8): the arcs do not meet' : ['step 1: draw segment AB', 'step 2: arc from A', 'step 3: same radius, arc from B', 'step 4: join the crossing points P and Q'][Math.min(k, 3)] + (k >= 3 ? ` · PQ meets AB at its midpoint at 90°; PA = PB = ${r.toFixed(1)}` : ''); };
          K.anim(el, an); b.redraw(); return an; } },
      { title: 'Rectangle diagonals', intro: 'Set the sides; compare the diagonals.',
        build(el, K) { let L = 6, W = 3.5; const row = K.row(el); K.slider(row, 'length', 1, 8, 0.5, L, v => { L = v; b.redraw(); }); K.slider(row, 'breadth', 1, 6, 0.5, W, v => { W = v; b.redraw(); }); const b = new K.Board(el, { xmin: -0.8, xmax: 8.8, ymin: -0.8, ymax: 6.8, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.rect(0, 0, L, W, { fill: C.blueL, color: C.blue, w: 3 }); b.line(0, 0, L, W, { color: C.orange, w: 3 }); b.line(0, W, L, 0, { color: C.purple, w: 3 }); b.dot(L / 2, W / 2, { r: 6, label: 'O' });
            const d = Math.hypot(L, W), ang = 2 * Math.atan(W / L) * 180 / Math.PI; rd.innerHTML = `diagonals: both ${d.toFixed(2)} (equal) · they bisect each other at O · angle between them ${ang.toFixed(0)}°${Math.abs(L - W) < 1e-9 ? ' — a <b>square</b>: diagonals perpendicular' : ''}`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Compass radius', gen(R) { const ab = R.int(4, 12); return { q: `To bisect a segment AB of ${ab} cm, the compass radius must be more than?`, a: `${ab / 2} cm`, ans: ab / 2 }; } },
      { title: 'Rectangle facts', gen(R) { const t = R.pick([['Are the diagonals of a rectangle equal?', 'yes'], ['Do the diagonals of a rectangle bisect each other?', 'yes'], ['Are the diagonals of a rectangle always perpendicular?', 'no (only for a square)'], ['Are all angles of a rectangle 90°?', 'yes']]); return { q: t[0], a: t[1] }; } },
      { title: 'Half diagonal', levels: [2, 3], gen(R) { const d = 2 * R.int(3, 12); return { q: `A rectangle has a diagonal of ${d} cm. The diagonals meet at O. Length of OA?`, a: `${d / 2} cm`, ans: d / 2 }; } },
      { title: 'Circle points', gen(R) { const r = R.int(2, 10); return { q: `A circle has radius ${r} cm. A point is ${r} cm from the centre. Where is it?`, a: 'on the circle' }; } },
      { title: 'Equidistant', levels: [3], gen(R) { const a = R.int(3, 9); return { q: `P is on the perpendicular bisector of AB and PA = ${a} cm. PB = ?`, a: `${a} cm`, ans: a }; } }
    ],
    quiz: [
      { q: 'Points on a circle are', o: ['equally far from the centre', 'on a line', 'random', 'inside'], a: 0, e: 'Radius.' }, { q: 'Perpendicular bisector meets AB at', o: ['its midpoint at 90°', 'A', 'B', 'any point'], a: 0, e: 'Bisects.' },
      { q: 'Compass radius for bisecting AB must be', o: ['more than half AB', 'less than half AB', 'exactly AB/4', 'any'], a: 0, e: 'Arcs meet.' }, { q: 'Rectangle diagonals are', o: ['equal', 'unequal', 'perpendicular always', 'parallel'], a: 0, e: 'Equal.' },
      { q: 'Square diagonals meet at', o: ['90°', '60°', '45°', '120°'], a: 0, e: 'Perpendicular.' }, { q: 'Diagonal 10 cm: half', o: ['5 cm', '10 cm', '20 cm', '2.5 cm'], a: 0, e: 'Bisect.' },
      { q: 'Any point on the perpendicular bisector of AB is', o: ['equally far from A and B', 'nearer A', 'nearer B', 'on AB'], a: 0, e: 'Equidistant.' }, { q: 'Tool for arcs', o: ['compass', 'protractor', 'set square', 'eraser'], a: 0, e: 'Compass.' },
      { q: 'A rhombus has diagonals that are', o: ['perpendicular', 'always equal', 'parallel', 'curved'], a: 0, e: 'Not equal in general.' }, { q: 'All angles of a rectangle', o: ['90°', '60°', '45°', '120°'], a: 0, e: 'Right.' },
      { q: 'Keep the compass width', o: ['same for both arcs', 'different', 'zero', 'doubled'], a: 0, e: 'Equal radii.' }
    ],
    teach: {
      outcomes: ['Use compass and ruler', 'Construct perpendicular bisectors', 'Construct rectangles and squares and study diagonals'],
      periods: [{ t: 'Compass', flow: [['10 min', 'Circle art.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Construct bisectors.']] }, { t: 'Rectangles', flow: [['15 min', 'Construct a 6 × 4 rectangle.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Radius too small.', 'Changing compass width.'], activities: ['Rangoli with circles.', 'Fold-to-bisect check.'],
      exit: ['Bisect a 7 cm segment.', 'Construct a 5 cm square.', 'Diagonal facts.'], homework: 'Construct a rectangle 7 cm by 4 cm with ruler and compass; measure its diagonals.'
    },
    slides: [{ t: 'Playing with Constructions', b: ['Circles and arcs', 'Perpendicular bisector', 'Squares and rectangles', 'Diagonals'] }, { t: 'Check yourself', b: ['Minimum radius for AB = 8 cm?', 'Are rectangle diagonals perpendicular?'] }],
    fs: { groups: [['Compass', [['Circle', 'fixed distance from centre'], ['Arc', 'part of a circle']]], ['Perpendicular bisector', [['Radius', '> ½ AB'], ['Result', 'midpoint, 90°'], ['Any point on it', 'PA = PB']]], ['Rectangle / square', [['Diagonals', 'equal, bisect'], ['Square', 'also ⟂']]]],
      ex: [['AB = 8 cm', 'radius > 4 cm'], ['Diagonal 10 cm', 'OA = 5 cm']], rem: ['Same compass width for both arcs.', 'Sharp pencil.', 'Check with a protractor.'] }
  });
})();
