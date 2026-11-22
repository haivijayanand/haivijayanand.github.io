/*
TOOL:    class3_maths_ch05
FAMILY:  CBSE_REVISION / Class 3 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 5 Fun with Shapes (2-D shapes, corners, tangram) - revise, 2 explore panels (shape on a dot grid, square corners), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 5, part: 'All chapters', short: 'Flat shapes', title: 'Fun with Shapes',
    blurb: 'Flat shapes: sides, corners, square corners (right angles), straight and curved edges, making shapes on a dot grid and with tangram pieces.',
    revise: {
      oneLine: 'Flat shapes have straight or curved edges. Count sides and corners to name them. A square corner (like the corner of a page) is special: squares and rectangles have four of them.',
      sections: [
        { h: 'Sides and corners', html: `<p>Triangle 3, quadrilateral 4, pentagon 5, hexagon 6. A circle has a curved edge and no corners.</p>` },
        { h: 'Square corners', html: `<p>Fold a paper twice to make a square-corner tester. Squares and rectangles have 4 square corners; most triangles have none (a right triangle has one).</p>` },
        { h: 'Making shapes', html: `<p>Join dots on a dot grid. Tangram: 7 pieces make a square, a cat, a boat…</p>` }
      ],
      formulas: [['Triangle', '3 sides, 3 corners'], ['Quadrilateral', '4 sides'], ['Square', '4 equal sides, 4 square corners'], ['Rectangle', '4 square corners'], ['Pentagon, hexagon', '5, 6 sides']],
      terms: [['Square corner', 'right angle'], ['Edge', 'side of a flat shape'], ['Tangram', '7-piece puzzle']],
      traps: ['A tilted square is still a square.', 'Rectangles need square corners.', 'A shape with curved edges is not a polygon.'],
      bridge: '<p>Class 4 studies angles and symmetry.</p>'
    },
    explore: [
      { title: 'Make a shape on the dot grid', intro: 'Drag the corners. Sides, square corners and the shape name update.',
        build(el, K) { const b = new K.Board(el, { xmin: -1, xmax: 9, ymin: -1, ymax: 6 }); const rd = K.read(el); let n = 4;
          const all = [[1, 1], [5, 1], [5, 4], [1, 4], [3, 5.5], [0, 2.5]].map((p, i) => b.addPt(p[0], p[1], { snap: 1, label: 'ABCDEF'[i] }));
          const row = K.row(el); K.slider(row, 'corners', 3, 6, 1, n, v => { n = v; b.redraw(); });
          b.onDraw = () => { b.base(); const P = all.slice(0, n); all.forEach((p, i) => p.fixed = i >= n); b.poly(P.map(p => [p.x, p.y]), { fill: C.blueL, color: C.blue, w: 3 });
            let sq = 0; P.forEach((p, i) => { const a = P[(i + n - 1) % n], c = P[(i + 1) % n]; if ((a.x - p.x) * (c.x - p.x) + (a.y - p.y) * (c.y - p.y) === 0) { sq++; b.rect(p.x - 0.15, p.y - 0.15, 0.3, 0.3, { color: C.orange, w: 2 }); } });
            P.forEach(p => b.dot(p.x, p.y, { r: 6, label: p.label })); const sides = P.map((p, i) => (p.x - P[(i + 1) % n].x) ** 2 + (p.y - P[(i + 1) % n].y) ** 2); const eq = sides.every(s => s === sides[0]);
            const nm = n === 3 ? 'triangle' : n === 5 ? 'pentagon' : n === 6 ? 'hexagon' : sq === 4 ? (eq ? 'square' : 'rectangle') : 'quadrilateral';
            rd.innerHTML = `${n} sides, ${n} corners, ${sq} square corner(s) (orange) ⇒ <b>${nm}</b>`; };
          b.redraw(); return null; } },
      { title: 'Square corners around us', intro: 'Press <kbd>S</kbd> for the next object: does it have square corners?',
        build(el, K) { const O = [['📕 book cover', 4], ['🔺 slice of pizza', 0], ['🚪 door', 4], ['📐 set square', 1], ['⚪ plate', 0], ['🟦 tile', 4]]; let k = -1; const rd = K.read(el);
          const step = () => { k = (k + 1) % O.length; rd.innerHTML = `<span style="font-size:36px">${O[k][0].split(' ')[0]}</span> ${O[k][0].split(' ').slice(1).join(' ')}: <b>${O[k][1]}</b> square corner${O[k][1] === 1 ? '' : 's'}`; };
          const row = K.row(el); K.button(row, 'Next (S)', step); step(); return { step, play() {}, pause() {} }; } }
    ],
    gens: [
      { title: 'Sides and corners', gen(R) { const s = R.pick([['triangle', 3], ['square', 4], ['rectangle', 4], ['pentagon', 5], ['hexagon', 6], ['circle', 0]]); return { q: `How many corners does a ${s[0]} have?`, a: String(s[1]), ans: s[1] }; } },
      { title: 'Square corners', gen(R) { const s = R.pick([['square', 4], ['rectangle', 4], ['book cover', 4], ['circle', 0], ['right triangle', 1]]); return { q: `How many square corners does a ${s[0]} have?`, a: String(s[1]), ans: s[1] }; } },
      { title: 'Name the shape', gen(R) { const s = R.pick([['3 sides', 'triangle'], ['6 sides', 'hexagon'], ['4 equal sides and 4 square corners', 'square'], ['5 corners', 'pentagon'], ['a curved edge and no corners', 'circle']]); return { q: `Which shape has ${s[0]}?`, a: s[1] }; } },
      { title: 'Count triangles', levels: [2, 3], gen(R) { const items = [['a square cut along one diagonal', 2], ['a square cut along both diagonals', 4], ['a rectangle cut into 2 squares and each square cut along a diagonal', 4]]; const [q, a] = R.pick(items); return { q: `How many triangles do you get from ${q}?`, a: String(a), ans: a }; } },
      { title: 'Tangram', levels: [3], gen(R) { return { q: 'How many pieces are in a tangram, and which shapes are they?', a: '7 pieces: 5 triangles, 1 square, 1 parallelogram' }; } }
    ],
    quiz: [
      { q: 'Corners of a hexagon', o: ['6', '5', '8', '4'], a: 0, e: 'Hex = 6.' }, { q: 'A book cover has how many square corners?', o: ['4', '2', '0', '1'], a: 0, e: 'Rectangle.' },
      { q: 'Which has a curved edge?', o: ['circle', 'square', 'triangle', 'pentagon'], a: 0, e: 'Round.' }, { q: 'A square corner is also called', o: ['a right angle', 'a curve', 'a side', 'a point'], a: 0, e: 'Right angle.' },
      { q: 'Tangram pieces', o: ['7', '5', '4', '10'], a: 0, e: 'Seven.' }, { q: 'Sides of a pentagon', o: ['5', '6', '4', '3'], a: 0, e: 'Five.' },
      { q: 'A square cut on one diagonal gives', o: ['2 triangles', '2 squares', '4 triangles', '1 circle'], a: 0, e: 'Halves.' }, { q: 'A rectangle has', o: ['4 square corners', '3 sides', 'no corners', 'curved edges'], a: 0, e: 'Right angles.' },
      { q: 'Which is not a polygon?', o: ['circle', 'triangle', 'square', 'hexagon'], a: 0, e: 'Curved.' }, { q: 'A tilted square is', o: ['still a square', 'a circle', 'a triangle', 'not a shape'], a: 0, e: 'Same shape.' },
      { q: 'Square corners in a circle', o: ['0', '1', '4', '2'], a: 0, e: 'None.' }
    ],
    teach: {
      outcomes: ['Count sides and corners', 'Find square corners', 'Make shapes on dot grids and with tangrams'],
      periods: [{ t: 'Shapes', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Paper square-corner tester.'], ['10 min', 'Shape hunt.']] }, { t: 'Tangram', flow: [['20 min', 'Make tangram pictures.'], ['10 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Tilted square.', 'Rectangle without right angles.'], activities: ['Tangram from paper.', 'Geoboard with rubber bands.'],
      exit: ['Draw a pentagon.', 'Corners of a book?', 'Make a triangle with a square corner.'], homework: 'Find 5 square corners at home. Make a tangram animal.'
    },
    slides: [{ t: 'Fun with Shapes', b: ['Sides and corners', 'Square corners', 'Tangram'] }, { t: 'Check yourself', b: ['Corners of a hexagon?', 'Square corners of a door?'] }],
    fs: { groups: [['Shapes', [['Triangle', '3'], ['Quadrilateral', '4'], ['Pentagon', '5'], ['Hexagon', '6'], ['Circle', 'curved, 0 corners']]], ['Square corners', [['Square, rectangle', '4'], ['Right triangle', '1'], ['Tester', 'paper folded twice']]], ['Tangram', [['Pieces', '7: 5 triangles, square, parallelogram']]]],
      ex: [['Door', 'rectangle, 4 square corners'], ['Square on a diagonal', '2 triangles']], rem: ['Count corners by touching.', 'Test corners with folded paper.', 'Turning does not change the shape.'] }
  });
})();
