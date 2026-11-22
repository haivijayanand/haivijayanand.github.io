/*
TOOL:    class5_maths_ch07
FAMILY:  CBSE_REVISION / Class 5 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 7 Shapes and Patterns (polygons, sides and angles, tiling and tessellations, shape patterns) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 7, part: 'All chapters', short: 'Shapes and tilings', title: 'Shapes and Patterns',
    blurb: 'Polygons and their sides and corners, regular shapes, shapes that tile a floor without gaps (tessellations) and patterns made by repeating, turning and growing shapes.',
    revise: {
      oneLine: 'A polygon is a closed shape of straight sides: triangle 3, quadrilateral 4, pentagon 5, hexagon 6. Squares, equilateral triangles and regular hexagons tile a floor with no gaps, because their corners fit exactly around a point (360°).',
      sections: [
        { h: 'Polygons', html: `<p>Regular polygon: all sides and angles equal. A circle is not a polygon (no straight sides).</p>` },
        { h: 'Tiling', html: `<p>Around a point: 4 squares (4 × 90°), 6 triangles (6 × 60°), 3 hexagons (3 × 120°) = 360°. Regular pentagons leave gaps.</p>` },
        { h: 'Shape patterns', html: `<p>Growing pattern: 1, 3, 5, 7 matchsticks… or squares 1, 4, 9, 16.</p>` }
      ],
      formulas: [['Triangle', '3 sides'], ['Quadrilateral', '4 sides'], ['Pentagon / hexagon', '5 / 6 sides'], ['Tile around a point', 'angles add to 360°']],
      terms: [['Polygon', 'closed, straight sides'], ['Regular', 'equal sides and angles'], ['Tessellation', 'tiling with no gaps or overlaps']],
      traps: ['A circle is not a polygon.', 'Regular pentagons do not tile.', 'Open shapes are not polygons.'],
      bridge: '<p>Ch 10 looks at symmetry in designs.</p>'
    },
    explore: [
      { title: 'Which shapes tile?', intro: 'Choose a regular shape; copies are placed around a point.',
        build(el, K) { let n = 6; const row = K.row(el); K.select(row, 'shape', ['triangle (3)', 'square (4)', 'pentagon (5)', 'hexagon (6)', 'octagon (8)'], i => { n = [3, 4, 5, 6, 8][i]; b.redraw(); }); const s0 = row.querySelector('select'); if (s0) s0.value = 3; const b = new K.Board(el, { xmin: -2.6, xmax: 2.6, ymin: -2.4, ymax: 2.4, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const A = 180 - 360 / n, k = Math.floor(360 / A + 1e-9), cols = [C.blueL, C.orangeL, C.purpleL, 'rgba(202,138,4,.2)']; for (let j = 0; j < k; j++) { const t0 = j * A * Math.PI / 180, P = [[0, 0]]; let x = 0, y = 0, dir = t0; for (let s = 0; s < n - 1; s++) { x += Math.cos(dir); y += Math.sin(dir); P.push([x, y]); dir += Math.PI - A * Math.PI / 180; dir = dir; } b.poly(P, { fill: cols[j % 4], color: C.ink, w: 2 }); }
            const gap = 360 - k * A; rd.innerHTML = `each corner ${A.toFixed(0)}° · ${k} fit around a point = ${(k * A).toFixed(0)}° · ${Math.abs(gap) < 1e-6 ? '<b>tiles with no gap</b>' : `gap of ${gap.toFixed(0)}° — <b>does not tile alone</b>`}`; };
          b.redraw(); return null; } },
      { title: 'Growing matchstick pattern', intro: 'Press <kbd>S</kbd> to add the next square in a row.',
        build(el, K) { const b = new K.Board(el, { xmin: -0.5, xmax: 10.5, ymin: -0.8, ymax: 1.8, axes: false, grid: 0, aspect: 0.25 }); const rd = K.read(el); const an = new K.Anim(10, () => b.redraw(), { ms: 600 });
          b.onDraw = () => { b.clear(); const n = Math.max(1, an.i); for (let i = 0; i < n; i++) { b.line(i, 0, i + 1, 0, { color: C.orange, w: 4 }); b.line(i, 1, i + 1, 1, { color: C.orange, w: 4 }); b.line(i + 1, 0, i + 1, 1, { color: C.orange, w: 4 }); } b.line(0, 0, 0, 1, { color: C.orange, w: 4 });
            rd.innerHTML = `${n} square${n === 1 ? '' : 's'} → <b>${3 * n + 1}</b> matchsticks (rule: 3 × squares + 1)`; };
          K.anim(el, an); b.redraw(); return an; } }
    ],
    gens: [
      { title: 'Name by sides', gen(R) { const t = R.pick([[3, 'triangle'], [4, 'quadrilateral'], [5, 'pentagon'], [6, 'hexagon'], [8, 'octagon']]); return { q: `A polygon with ${t[0]} sides is a?`, a: t[1] }; } },
      { title: 'Does it tile?', gen(R) { const t = R.pick([['square', 'yes'], ['equilateral triangle', 'yes'], ['regular hexagon', 'yes'], ['regular pentagon', 'no'], ['regular octagon', 'no (needs squares too)'], ['circle', 'no']]); return { q: `Can a ${t[0]} tile a floor on its own?`, a: t[1] }; } },
      { title: 'Matchsticks', levels: [2, 3], gen(R) { const n = R.int(4, 15); return { q: `Squares in a row use 4, 7, 10, … matchsticks. How many for ${n} squares?`, a: String(3 * n + 1), ans: 3 * n + 1 }; } },
      { title: 'Around a point', levels: [2, 3], gen(R) { const t = R.pick([[90, 4], [60, 6], [120, 3]]); return { q: `Tiles with ${t[0]}° corners. How many fit around a point?`, a: String(t[1]), ans: t[1] }; } },
      { title: 'Polygon or not', levels: [1], gen(R) { const t = R.pick([['a circle', 'no'], ['a triangle', 'yes'], ['the letter C', 'no (open, curved)'], ['a square', 'yes']]); return { q: `Is ${t[0]} a polygon?`, a: t[1] }; } }
    ],
    quiz: [
      { q: 'Hexagon sides', o: ['6', '5', '8', '7'], a: 0, e: 'Hex = 6.' }, { q: 'Does a regular pentagon tile alone?', o: ['no', 'yes', 'only big ones', 'only red'], a: 0, e: 'Gap.' },
      { q: 'Squares around a point', o: ['4', '3', '6', '5'], a: 0, e: '4 × 90.' }, { q: 'A circle is', o: ['not a polygon', 'a polygon', 'a hexagon', 'a square'], a: 0, e: 'Curved.' },
      { q: 'Equilateral triangles around a point', o: ['6', '3', '4', '8'], a: 0, e: '6 × 60.' }, { q: 'Regular means', o: ['equal sides and angles', 'big', 'coloured', 'four sides'], a: 0, e: 'Equal.' },
      { q: 'Matchsticks for 5 squares in a row', o: ['16', '20', '15', '21'], a: 0, e: '3 × 5 + 1.' }, { q: 'Angles around a point', o: ['360°', '180°', '90°', '100°'], a: 0, e: 'Full turn.' },
      { q: 'Quadrilateral sides', o: ['4', '3', '5', '6'], a: 0, e: 'Quad.' }, { q: 'Honeycomb shape', o: ['hexagon', 'pentagon', 'circle', 'octagon'], a: 0, e: 'Bees.' },
      { q: 'Tessellation has', o: ['no gaps or overlaps', 'gaps', 'only circles', 'overlaps'], a: 0, e: 'Tiling.' }
    ],
    teach: {
      outcomes: ['Name polygons', 'Explain which shapes tile', 'Find rules for growing shape patterns'],
      periods: [{ t: 'Polygons and tiles', flow: [['10 min', 'Floor tile hunt.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Cut-out tiling.']] }, { t: 'Patterns', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Growing patterns.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Circle as polygon.', 'All shapes tile.'], activities: ['Pattern blocks.', 'Matchstick patterns.'],
      exit: ['Sides of an octagon.', 'Why hexagons tile.', 'Matchsticks for 8 squares.'], homework: 'Photograph or draw 3 tile patterns at home or school and name the shapes used.'
    },
    slides: [{ t: 'Shapes and Patterns', b: ['Polygons', 'Regular shapes', 'Tiling: 360° at a point', 'Growing patterns'] }, { t: 'Check yourself', b: ['Do pentagons tile?', 'Matchsticks for 6 squares?'] }],
    fs: { groups: [['Polygons', [['3', 'triangle'], ['4', 'quadrilateral'], ['5', 'pentagon'], ['6', 'hexagon'], ['8', 'octagon']]], ['Tiling', [['Squares', '4 × 90° = 360°'], ['Triangles', '6 × 60°'], ['Hexagons', '3 × 120°'], ['Pentagons', 'gap']]]],
      ex: [['Matchsticks, n squares', '3n + 1'], ['10 squares', '31']], rem: ['Polygons: straight, closed.', 'Corners must add to 360° to tile.', 'Find the rule, then extend.'] }
  });
})();
