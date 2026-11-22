/*
TOOL:    class6_maths_ch09
FAMILY:  CBSE_REVISION / Class 6 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 9 Symmetry (line symmetry, reflections on a grid, rotational symmetry, angle and order of symmetry) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 9, part: 'All chapters', short: 'Symmetry', title: 'Symmetry',
    blurb: 'Line (reflection) symmetry, finding lines of symmetry, reflecting shapes on a grid in vertical, horizontal and diagonal lines, rotational symmetry, angles of symmetry and order.',
    revise: {
      oneLine: 'A line of symmetry divides a figure into mirror halves. Reflection in a line keeps each point the same distance from the line on the other side. A figure has rotational symmetry if a turn of less than 360° leaves it looking the same; the smallest such turn is its angle of symmetry, and 360° ÷ that angle is its order.',
      sections: [
        { h: 'Reflection on a grid', html: `<p>In the y-axis (vertical line) (x, y) → (−x, y); in a horizontal line y → −y; in the diagonal y = x, (x, y) → (y, x).</p>` },
        { h: 'Rotational symmetry', html: `<p>Square: angles 90°, 180°, 270°, 360° → order 4. Equilateral triangle: 120° → order 3. Rectangle: 180° → order 2.</p>` },
        { h: 'Both', html: `<p>A regular n-gon has n lines of symmetry and rotational order n.</p>` }
      ],
      formulas: [['Order', '360° ÷ smallest angle'], ['Regular n-gon', 'n lines, order n'], ['Reflect in vertical line', 'same distance on the other side'], ['Circle', 'every angle works']],
      terms: [['Line of symmetry', 'mirror line'], ['Angle of symmetry', 'smallest matching turn'], ['Order', 'number of matches in 360°']],
      traps: ['Rectangle diagonals are not lines of symmetry.', 'Every figure matches at 360° — that alone is not rotational symmetry.', 'Reflect each vertex, not the whole shape by eye.'],
      bridge: '<p>Class 7 extends to transformations.</p>'
    },
    explore: [
      { title: 'Reflect a shape', intro: 'Choose the mirror line; the orange shape is the reflection of the blue one.',
        build(el, K) { let m = 0; const row = K.row(el); K.select(row, 'mirror', ['vertical (x = 0)', 'horizontal (y = 0)', 'diagonal (y = x)'], i => { m = i; b.redraw(); }); const S = [[1, 1], [4, 1], [4, 2], [2, 2], [2, 4], [1, 4]];
          const b = new K.Board(el, { xmin: -5.5, xmax: 5.5, ymin: -5.5, ymax: 5.5, axes: true, grid: 1, equal: true }); const rd = K.read(el);
          b.onDraw = () => { b.base(); const f = [p => [-p[0], p[1]], p => [p[0], -p[1]], p => [p[1], p[0]]][m]; if (m === 0) b.line(0, -5.5, 0, 5.5, { color: C.purple, w: 3, dash: [6, 4] }); if (m === 1) b.line(-5.5, 0, 5.5, 0, { color: C.purple, w: 3, dash: [6, 4] }); if (m === 2) b.line(-5.5, -5.5, 5.5, 5.5, { color: C.purple, w: 3, dash: [6, 4] });
            const T = S.map(f); b.poly(S, { fill: C.blueL, color: C.blue, w: 3 }); b.poly(T, { fill: C.orangeL, color: C.orange, w: 3 }); b.dot(...S[1], { r: 5, color: C.blue }); b.dot(...T[1], { r: 5, color: C.orange }); b.line(...S[1], ...T[1], { color: C.grey, w: 1, dash: [3, 3] });
            rd.innerHTML = `vertex (4, 1) → (${T[1].join(', ')}) · rule: ${['(x, y) → (−x, y)', '(x, y) → (x, −y)', '(x, y) → (y, x)'][m]} · each point is equally far from the mirror, on the other side`; };
          b.redraw(); return null; } },
      { title: 'Rotational symmetry', intro: 'Choose a regular polygon; press <kbd>P</kbd> to rotate it. Matches are counted.',
        build(el, K) { let n = 5; const row = K.row(el); K.slider(row, 'sides', 3, 10, 1, n, v => { n = v; an.reset(); }); const b = new K.Board(el, { xmin: -1.5, xmax: 1.5, ymin: -1.3, ymax: 1.3, axes: false, grid: 0, equal: true }); const rd = K.read(el); const an = new K.Anim(72, () => b.redraw(), { ms: 70 });
          b.onDraw = () => { b.clear(); const t = an.i * 5, r = t * Math.PI / 180; const P = Array.from({ length: n }, (_, i) => [Math.cos(Math.PI / 2 + 2 * Math.PI * i / n), Math.sin(Math.PI / 2 + 2 * Math.PI * i / n)]); b.poly(P, { color: C.grid, w: 6 }); b.poly(P.map(([x, y]) => [x * Math.cos(r) - y * Math.sin(r), x * Math.sin(r) + y * Math.cos(r)]), { fill: C.blueL, color: C.blue, w: 3 }); b.dot(-Math.sin(r) * 1, Math.cos(r) * 1, { r: 6, color: C.orange });
            const ang = 360 / n, hits = Math.floor(t / ang + 1e-9); rd.innerHTML = `turned ${t}° · ${Math.abs(t / ang - Math.round(t / ang)) < 1e-9 && t > 0 ? '<b>matches!</b> · ' : ''}angle of symmetry ${+ang.toFixed(2)}° · order <b>${n}</b> · matches so far ${hits}`; };
          K.anim(el, an); b.redraw(); return an; } }
    ],
    gens: [
      { title: 'Lines of symmetry', gen(R) { const t = R.pick([['square', 4], ['rectangle', 2], ['equilateral triangle', 3], ['isosceles triangle', 1], ['scalene triangle', 0], ['regular hexagon', 6], ['rhombus', 2]]); return { q: `Number of lines of symmetry of a ${t[0]}?`, a: String(t[1]), ans: t[1] }; } },
      { title: 'Order and angle', gen(R) { const o = R.pick([2, 3, 4, 5, 6, 8, 9, 10, 12]); return R.chance(.5) ? { q: `Rotational order ${o}: angle of symmetry?`, a: `${360 / o}°`, ans: 360 / o } : { q: `Angle of symmetry ${360 / o}°: order?`, a: String(o), ans: o }; } },
      { title: 'Reflect a point', gen(R) { const x = R.int(-6, 6) || 2, y = R.int(-6, 6) || 3, m = R.int(0, 2); const T = [[-x, y], [x, -y], [y, x]][m]; return { q: `Reflect (${x}, ${y}) in ${['the y-axis (vertical)', 'the x-axis (horizontal)', 'the line y = x'][m]}.`, a: `(${T.join(', ')})` }; } },
      { title: 'Which symmetry', levels: [2, 3], gen(R) { const t = R.pick([['letter Z', 'rotational only (order 2)'], ['letter H', 'both (2 lines, order 2)'], ['letter A', 'line only (1 line)'], ['parallelogram (not a rectangle)', 'rotational only (order 2)'], ['letter F', 'none']]); return { q: `What symmetry does a ${t[0]} have?`, a: t[1] }; } },
      { title: 'Regular polygons', levels: [3], gen(R) { const n = R.int(3, 12); return { q: `Regular ${n}-gon: lines of symmetry, order, angle?`, a: `${n}, ${n}, ${+(360 / n).toFixed(2)}°` }; } }
    ],
    quiz: [
      { q: 'Lines of symmetry of a rectangle', o: ['2', '4', '1', '0'], a: 0, e: 'Not diagonals.' }, { q: 'Order of an equilateral triangle', o: ['3', '1', '6', '2'], a: 0, e: '120°.' },
      { q: 'Reflect (3, 2) in the y-axis', o: ['(−3, 2)', '(3, −2)', '(2, 3)', '(−3, −2)'], a: 0, e: 'x flips.' }, { q: 'Angle of symmetry, order 8', o: ['45°', '8°', '90°', '30°'], a: 0, e: '360 ÷ 8.' },
      { q: 'Letter Z has', o: ['rotational symmetry only', 'line symmetry only', 'both', 'none'], a: 0, e: '180°.' }, { q: 'Scalene triangle lines', o: ['0', '1', '2', '3'], a: 0, e: 'All sides differ.' },
      { q: 'Regular hexagon order', o: ['6', '3', '2', '12'], a: 0, e: 'n.' }, { q: 'Reflect (2, 5) in y = x', o: ['(5, 2)', '(−2, 5)', '(2, −5)', '(−5, −2)'], a: 0, e: 'Swap.' },
      { q: 'Parallelogram (not rectangle) has', o: ['order 2, no lines', '2 lines', '4 lines', 'nothing'], a: 0, e: 'Half turn.' }, { q: 'Order 1 means', o: ['no rotational symmetry', 'one line', 'full symmetry', 'order 2'], a: 0, e: 'Only 360°.' },
      { q: 'Rhombus lines of symmetry', o: ['2', '4', '0', '1'], a: 0, e: 'Diagonals.' }
    ],
    teach: {
      outcomes: ['Find lines of symmetry', 'Reflect shapes on a grid', 'Find angle and order of rotational symmetry'],
      periods: [{ t: 'Reflection', flow: [['10 min', 'Ink blots, mirrors.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Grid reflections.']] }, { t: 'Rotation', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Tracing-paper turns.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Rectangle diagonals.', '360° counted as symmetry.'], activities: ['Rangoli with order 4.', 'Logo symmetry hunt.'],
      exit: ['Reflect (−2, 4) in the x-axis.', 'Order for angle 72°.', 'Lines in a regular octagon.'], homework: 'Design a logo with exactly 2 lines of symmetry and order 2. Describe its symmetry.'
    },
    slides: [{ t: 'Symmetry', b: ['Lines of symmetry', 'Reflections on a grid', 'Rotational symmetry', 'Angle and order'] }, { t: 'Check yourself', b: ['Reflect (4, −1) in y-axis?', 'Order for 60°?'] }],
    fs: { groups: [['Line symmetry', [['Square', '4'], ['Rectangle', '2'], ['Equilateral triangle', '3'], ['Rhombus', '2'], ['Regular n-gon', 'n']]], ['Reflection', [['y-axis', '(x, y) → (−x, y)'], ['x-axis', '(x, y) → (x, −y)'], ['y = x', '(x, y) → (y, x)']]], ['Rotation', [['Order', '360° ÷ angle'], ['Rectangle', '180°, order 2']]]],
      ex: [['Order 5', '72°'], ['(3, 2) in y-axis', '(−3, 2)']], rem: ['Reflect vertex by vertex.', '360° alone is not symmetry.', 'Use tracing paper.'] }
  });
})();
