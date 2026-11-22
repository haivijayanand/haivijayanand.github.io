/*
TOOL:    class2_maths_ch02
FAMILY:  CBSE_REVISION / Class 2 Maths (Joyful Mathematics)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 2 Shapes Around Us (3-D shapes) - revise, 2 explore panels (solid shapes spinner, which solid am I?), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const SOL = [['cube', '🎲 dice', 6, 'flat', 'slides, stacks'], ['cuboid', '📦 box, brick', 6, 'flat', 'slides, stacks'], ['cylinder', '🥫 can, pipe', 3, 'two flat, one curved', 'rolls and stacks'], ['cone', '🍦 ice-cream cone', 2, 'one flat, one curved', 'rolls in a circle'], ['sphere', '⚽ ball', 1, 'curved', 'rolls']];
  G9.register({
    no: 2, part: 'All chapters', short: '3-D shapes', title: 'Shapes Around Us',
    blurb: 'Solid shapes around us — cube, cuboid, cylinder, cone and sphere — their flat and curved faces, edges and corners, and whether they roll or slide.',
    revise: {
      oneLine: 'Things around us have solid (3-D) shapes. A dice is a cube, a box a cuboid, a can a cylinder, an ice-cream cone a cone and a ball a sphere. Flat faces let things slide and stack; curved faces let them roll.',
      sections: [
        { h: 'Five solids', html: `<p>🎲 cube (6 equal square faces) · 📦 cuboid (6 rectangular faces) · 🥫 cylinder (2 flat circles + 1 curved face) · 🍦 cone (1 flat circle + 1 curved face + a point) · ⚽ sphere (curved all over).</p>` },
        { h: 'Faces, edges, corners', html: `<p>A face is a surface, an edge is where two faces meet, a corner is where edges meet. A cube has 6 faces, 12 edges, 8 corners.</p>` },
        { h: 'Roll or slide', html: `<p>Sphere rolls; cube and cuboid slide; cylinder rolls on its side and slides on its flat face.</p>` }
      ],
      formulas: [['Cube', '6 faces, 12 edges, 8 corners'], ['Cuboid', '6 faces, 12 edges, 8 corners'], ['Cylinder', '2 flat + 1 curved face'], ['Cone', '1 flat + 1 curved face'], ['Sphere', '1 curved face']],
      terms: [['Face', 'flat or curved surface'], ['Edge', 'where two faces meet'], ['Corner (vertex)', 'where edges meet'], ['Solid', '3-D shape']],
      traps: ['A cube is a special cuboid, not every cuboid is a cube.', 'A cone has a point, not a corner like a box.', 'A circle is flat (2-D); a sphere is solid.'],
      bridge: '<p>Ch 4 (Shadow Story) looks at the flat shapes (2-D) that solids make.</p>'
    },
    explore: [
      { title: 'Meet the solids', intro: 'Press <kbd>S</kbd> to see the next solid and its faces.',
        build(el, K) { let k = -1; const rd = K.read(el); const b = new K.Board(el, { xmin: -3, xmax: 3, ymin: -2.2, ymax: 2.2, axes: false, grid: 0 });
          b.onDraw = () => { b.clear(); if (k < 0) return; const n = SOL[k][0], c = b.ctx;
            if (n === 'cube' || n === 'cuboid') { const w = n === 'cube' ? 1.6 : 2.4, h = 1.6, d = 0.8; b.poly([[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]], { fill: C.blueL, color: C.blue, w: 3 }); b.poly([[-w / 2, h / 2], [-w / 2 + d, h / 2 + d * 0.6], [w / 2 + d, h / 2 + d * 0.6], [w / 2, h / 2]], { fill: 'rgba(234,88,12,.2)', color: C.blue, w: 3 }); b.poly([[w / 2, -h / 2], [w / 2 + d, -h / 2 + d * 0.6], [w / 2 + d, h / 2 + d * 0.6], [w / 2, h / 2]], { fill: 'rgba(124,58,237,.2)', color: C.blue, w: 3 }); }
            if (n === 'cylinder') { c.save(); c.strokeStyle = C.blue; c.lineWidth = 3; c.fillStyle = C.blueL; c.beginPath(); c.ellipse(b.X(0), b.Y(-1.2), 60, 20, 0, 0, 7); c.fill(); c.stroke(); c.beginPath(); c.ellipse(b.X(0), b.Y(1.2), 60, 20, 0, 0, 7); c.fill(); c.stroke(); c.restore(); b.line(-0.9, -1.2, -0.9, 1.2, { color: C.blue, w: 3 }); b.line(0.9, -1.2, 0.9, 1.2, { color: C.blue, w: 3 }); }
            if (n === 'cone') { c.save(); c.strokeStyle = C.blue; c.lineWidth = 3; c.fillStyle = C.blueL; c.beginPath(); c.ellipse(b.X(0), b.Y(-1.2), 70, 22, 0, 0, 7); c.fill(); c.stroke(); c.restore(); b.line(-1.05, -1.2, 0, 1.6, { color: C.blue, w: 3 }); b.line(1.05, -1.2, 0, 1.6, { color: C.blue, w: 3 }); }
            if (n === 'sphere') b.circle(0, 0, 1.5, { fill: C.blueL, color: C.blue, w: 3 });
            rd.innerHTML = `<b>${n}</b> — like a ${SOL[k][1]} · faces: ${SOL[k][3]} (${SOL[k][2]}) · ${SOL[k][4]}`; };
          const step = () => { k = (k + 1) % SOL.length; b.redraw(); }; const row = K.row(el); K.button(row, 'Next solid (S)', step); step(); return { step, play() {}, pause() {} }; } },
      { title: 'Which solid am I?', intro: 'Read the clue, think, then press Reveal. <kbd>S</kbd> gives a new clue.',
        build(el, K) { const clues = [['I have 6 square faces, all the same.', 'cube'], ['I roll in every direction and have no flat face.', 'sphere'], ['I have one flat circle and a pointed top.', 'cone'], ['I have two flat circles and can roll on my side.', 'cylinder'], ['I look like a brick.', 'cuboid']]; const R = G9.rng(G9.newSeed()); let c, show = false; const rd = K.read(el);
          const draw = () => { rd.innerHTML = `${c[0]}${show ? ` — <b>${c[1]}</b>` : ''}`; }; const step = () => { c = R.pick(clues); show = false; draw(); };
          const row = K.row(el); K.button(row, 'Reveal', () => { show = true; draw(); }, 'btn o'); K.button(row, 'New clue (S)', step); step(); return { step, play() {}, pause() {} }; } }
    ],
    gens: [
      { title: 'Name the shape', gen(R) { const s = R.pick(SOL); return { q: `What solid shape is a ${s[1].split(' ').slice(1).join(' ')}?`, a: s[0] }; } },
      { title: 'Roll or slide', gen(R) { const s = R.pick(SOL); return { q: `Can a ${s[0]} roll, slide or both?`, a: s[4] }; } },
      { title: 'Count faces, edges, corners', levels: [2, 3], gen(R) { const t = R.int(0, 2); return { q: `How many ${['faces', 'edges', 'corners'][t]} does a cube have?`, a: String([6, 12, 8][t]), ans: [6, 12, 8][t] }; } },
      { title: 'Find in the classroom', levels: [1, 2], gen(R) { const items = [['a chalk box', 'cuboid'], ['a ball', 'sphere'], ['a pipe', 'cylinder'], ['a birthday cap', 'cone'], ['a dice', 'cube'], ['a duster', 'cuboid']]; const [q, a] = R.pick(items); return { q: `What shape is ${q}?`, a }; } },
      { title: 'Flat or curved', levels: [3], gen(R) { const s = R.pick(SOL); return { q: `Describe the faces of a ${s[0]}.`, a: s[3] }; } }
    ],
    quiz: [
      { q: 'A ball is a', o: ['sphere', 'cube', 'cone', 'cylinder'], a: 0, e: 'Round all over.' }, { q: 'A dice is a', o: ['cube', 'sphere', 'cone', 'cylinder'], a: 0, e: '6 equal faces.' },
      { q: 'Which can roll and stack?', o: ['cylinder', 'sphere', 'cube', 'cone'], a: 0, e: 'Curved side, flat ends.' }, { q: 'A brick is a', o: ['cuboid', 'sphere', 'cone', 'cylinder'], a: 0, e: 'Rectangular faces.' },
      { q: 'Faces of a cube', o: ['6', '4', '8', '12'], a: 0, e: 'Six.' }, { q: 'An ice-cream cone has', o: ['1 flat face and a point', '6 faces', 'no faces', '2 flat faces'], a: 0, e: 'Cone.' },
      { q: 'Which has no flat face?', o: ['sphere', 'cube', 'cylinder', 'cone'], a: 0, e: 'Curved all over.' }, { q: 'Corners of a cuboid', o: ['8', '6', '12', '4'], a: 0, e: 'Eight.' },
      { q: 'A can of juice is a', o: ['cylinder', 'cone', 'cube', 'sphere'], a: 0, e: 'Two circles.' }, { q: 'Where two faces meet is an', o: ['edge', 'corner', 'face', 'circle'], a: 0, e: 'Edge.' },
      { q: 'Which slides but does not roll?', o: ['cube', 'sphere', 'cylinder on its side', 'ball'], a: 0, e: 'All flat faces.' }
    ],
    teach: {
      outcomes: ['Name cube, cuboid, cylinder, cone, sphere', 'Describe faces, edges, corners', 'Tell which solids roll or slide'],
      periods: [{ t: 'Solids around us', flow: [['10 min', 'Feely bag: guess the solid.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Sort classroom objects.']] }, { t: 'Faces and rolling', flow: [['15 min', 'Ramp test: roll or slide.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Circle vs sphere.', 'Every box is a cube.'], activities: ['Feely bag.', 'Build with blocks; count faces.'],
      exit: ['Name a sphere at home.', 'Faces of a cuboid.', 'Does a cone roll?'], homework: 'Find one object for each of the five solids at home and draw them.'
    },
    slides: [{ t: 'Shapes Around Us', b: ['cube, cuboid, cylinder, cone, sphere', 'faces, edges, corners', 'roll or slide'] }, { t: 'Check yourself', b: ['Shape of a ball?', 'Faces of a dice?'] }],
    fs: { groups: [['Solids', [['🎲 cube', '6 equal squares'], ['📦 cuboid', '6 rectangles'], ['🥫 cylinder', '2 circles + curved'], ['🍦 cone', '1 circle + curved + point'], ['⚽ sphere', 'curved only']]], ['Parts', [['Face', 'surface'], ['Edge', 'faces meet'], ['Corner', 'edges meet'], ['Cube', '6, 12, 8']]], ['Moving', [['Roll', 'sphere, cylinder, cone'], ['Slide/stack', 'cube, cuboid, cylinder']]]],
      ex: [['Chalk box', 'cuboid'], ['Pipe', 'cylinder']], rem: ['Flat faces slide.', 'Curved faces roll.', 'A cube is a special cuboid.'] }
  });
})();
