/*
TOOL:    class4_maths_ch01
FAMILY:  CBSE_REVISION / Class 4 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 1 Shapes Around Us (solids, faces-edges-corners, circles) - revise, 2 explore panels (solid shapes viewer, draw a circle with a compass), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const SOL = {
    cube: { v: [[0,0,0],[2,0,0],[2,2,0],[0,2,0],[0,0,2],[2,0,2],[2,2,2],[0,2,2]], e: [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]], f: 6, use: 'dice, ice cube' },
    cuboid: { v: [[0,0,0],[3,0,0],[3,1.6,0],[0,1.6,0],[0,0,1.6],[3,0,1.6],[3,1.6,1.6],[0,1.6,1.6]], e: [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]], f: 6, use: 'brick, matchbox' },
    'square pyramid': { v: [[0,0,0],[2.4,0,0],[2.4,0,2.4],[0,0,2.4],[1.2,2.4,1.2]], e: [[0,1],[1,2],[2,3],[3,0],[0,4],[1,4],[2,4],[3,4]], f: 5, use: 'the pyramids of Egypt' },
    'triangular prism': { v: [[0,0,0],[2.4,0,0],[1.2,1.8,0],[0,0,2.4],[2.4,0,2.4],[1.2,1.8,2.4]], e: [[0,1],[1,2],[2,0],[3,4],[4,5],[5,3],[0,3],[1,4],[2,5]], f: 5, use: 'tent, Toblerone-style box' }
  };
  const P = ([x, y, z]) => [x + 0.55 * z - 1.6, y + 0.35 * z - 1.2];
  G9.register({
    no: 1, part: 'All chapters', short: 'Solids and circles', title: 'Shapes Around Us',
    blurb: 'Solid shapes around us (cube, cuboid, cylinder, cone, sphere, pyramid, prism), their faces, edges and corners, and circles: centre, radius, diameter.',
    revise: {
      oneLine: 'Solid shapes have faces (flat surfaces), edges (where two faces meet) and corners (vertices). A cube has 6 faces, 12 edges, 8 corners. A circle has a centre; the radius goes from centre to edge and the diameter is twice the radius.',
      sections: [
        { h: 'Solids', html: `<p>Cube and cuboid: 6 faces, 12 edges, 8 corners. Cylinder: 2 flat circle faces + 1 curved surface. Cone: 1 flat face, 1 corner (apex). Sphere: only a curved surface.</p>` },
        { h: 'Rolling and sliding', html: `<p>Spheres roll; cubes slide; cylinders and cones can do both.</p>` },
        { h: 'Circles', html: `<p>Draw with a compass or a thread pinned at the centre. Diameter = 2 × radius; all radii of one circle are equal.</p>` }
      ],
      formulas: [['Cube / cuboid', '6 faces, 12 edges, 8 corners'], ['Square pyramid', '5 faces, 8 edges, 5 corners'], ['Diameter', '2 × radius'], ['Faces + corners − edges', '2 for these solids']],
      terms: [['Face', 'flat surface'], ['Edge', 'line where faces meet'], ['Corner (vertex)', 'point where edges meet'], ['Radius', 'centre to circle']],
      traps: ['A cylinder has no corners.', 'Diameter must pass through the centre.', 'Counting hidden edges at the back.'],
      bridge: '<p>Ch 2 looks at shapes from different sides; Class 5 builds nets.</p>'
    },
    explore: [
      { title: 'Solid shapes', intro: 'Choose a solid. Hidden edges are dashed; faces, edges and corners are counted.',
        build(el, K) { const names = Object.keys(SOL); let k = 0; const row = K.row(el); K.select(row, 'solid', names, i => { k = i; b.redraw(); });
          const b = new K.Board(el, { xmin: -3, xmax: 4, ymin: -2, ymax: 3, axes: false, grid: 0 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const s = SOL[names[k]]; s.e.forEach(([i, j]) => { const back = s.v[i][2] > 1.5 && s.v[j][2] > 1.5 && names[k] !== 'square pyramid'; const [x1, y1] = P(s.v[i]), [x2, y2] = P(s.v[j]); b.line(x1, y1, x2, y2, { color: C.blue, w: 3, dash: back ? [6, 5] : null }); }); s.v.forEach(v => { const [x, y] = P(v); b.dot(x, y, { r: 5 }); });
            rd.innerHTML = `<b>${names[k]}</b>: ${s.f} faces, ${s.e.length} edges, ${s.v.length} corners · check ${s.f} + ${s.v.length} − ${s.e.length} = ${s.f + s.v.length - s.e.length} · seen in: ${s.use}`; };
          b.redraw(); return null; } },
      { title: 'Draw a circle', intro: 'Set the radius and press <kbd>P</kbd> to swing the compass.',
        build(el, K) { let r = 2; const row = K.row(el); K.slider(row, 'radius (cm)', 1, 3, 0.5, r, v => { r = v; an.reset(); }); const b = new K.Board(el, { xmin: -4, xmax: 4, ymin: -3.5, ymax: 3.5, axes: false, grid: 1, equal: true }); const rd = K.read(el); const an = new K.Anim(36, () => b.redraw(), { ms: 60 });
          b.onDraw = () => { b.clear(); b.grid && b.grid(); const a = an.i / 36 * 2 * Math.PI; if (an.i > 0) b.arc(0, 0, r, 0, a, { color: C.blue, w: 3 }); b.line(0, 0, r * Math.cos(a), r * Math.sin(a), { color: C.orange, w: 3 }); b.line(-r, -3.1, r, -3.1, { color: C.purple, w: 3 }); b.dot(0, 0, { r: 6, label: 'centre' });
            rd.innerHTML = `radius ${r} cm · diameter = 2 × ${r} = <b>${2 * r} cm</b> (purple bar) ${an.i >= 36 ? '· circle complete' : ''}`; };
          K.anim(el, an); b.redraw(); return an; } }
    ],
    gens: [
      { title: 'Faces, edges, corners', gen(R) { const t = R.pick([['cube', 6, 12, 8], ['cuboid', 6, 12, 8], ['square pyramid', 5, 8, 5], ['triangular prism', 5, 9, 6]]); const w = R.pick(['faces', 'edges', 'corners']); return { q: `How many ${w} does a ${t[0]} have?`, a: String(t[{ faces: 1, edges: 2, corners: 3 }[w]]), ans: t[{ faces: 1, edges: 2, corners: 3 }[w]] }; } },
      { title: 'Radius and diameter', gen(R) { const r = R.int(2, 15); return R.chance(.5) ? { q: `Radius ${r} cm. Diameter?`, a: `${2 * r} cm`, ans: 2 * r } : { q: `Diameter ${2 * r} cm. Radius?`, a: `${r} cm`, ans: r }; } },
      { title: 'Name the solid', gen(R) { const t = R.pick([['a cricket ball', 'sphere'], ['a birthday cap', 'cone'], ['a gas cylinder', 'cylinder'], ['a brick', 'cuboid'], ['a dice', 'cube'], ['a tent', 'triangular prism']]); return { q: `What solid shape is ${t[0]}?`, a: t[1] }; } },
      { title: 'Roll or slide', levels: [1, 2], gen(R) { const t = R.pick([['sphere', 'rolls'], ['cube', 'slides'], ['cylinder', 'rolls and slides'], ['cone', 'rolls (in a circle) and slides'], ['cuboid', 'slides']]); return { q: `Does a ${t[0]} roll, slide or both?`, a: t[1] }; } },
      { title: 'Faces + corners − edges', levels: [3], gen(R) { const t = R.pick([['cube', 6, 8], ['square pyramid', 5, 5], ['triangular prism', 5, 6]]); const e = t[1] + t[2] - 2; return { q: `A ${t[0]} has ${t[1]} faces and ${t[2]} corners. Use faces + corners − edges = 2 to find the edges.`, a: String(e), ans: e }; } }
    ],
    quiz: [
      { q: 'Edges of a cube', o: ['12', '6', '8', '4'], a: 0, e: '4 + 4 + 4.' }, { q: 'Corners of a cuboid', o: ['8', '6', '12', '4'], a: 0, e: '4 top, 4 bottom.' },
      { q: 'A sphere has', o: ['only a curved surface', '6 faces', '1 corner', '2 flat faces'], a: 0, e: 'Ball.' }, { q: 'Diameter when radius is 5 cm', o: ['10 cm', '5 cm', '2.5 cm', '25 cm'], a: 0, e: '2 × r.' },
      { q: 'A cone has how many corners?', o: ['1', '0', '2', '3'], a: 0, e: 'Apex.' }, { q: 'Which can only slide?', o: ['cube', 'sphere', 'cylinder', 'cone'], a: 0, e: 'Flat faces only.' },
      { q: 'Faces of a square pyramid', o: ['5', '4', '6', '8'], a: 0, e: '1 square + 4 triangles.' }, { q: 'The point in the middle of a circle', o: ['centre', 'radius', 'edge', 'corner'], a: 0, e: 'Centre.' },
      { q: 'Flat faces of a cylinder', o: ['2', '1', '0', '3'], a: 0, e: 'Top and bottom.' }, { q: 'All radii of a circle are', o: ['equal', 'different', 'twice the diameter', 'zero'], a: 0, e: 'Same length.' },
      { q: 'A matchbox is a', o: ['cuboid', 'cube', 'cone', 'sphere'], a: 0, e: 'Rectangle faces.' }
    ],
    teach: {
      outcomes: ['Name solids and count faces, edges, corners', 'Draw circles and relate radius and diameter'],
      periods: [{ t: 'Solids', flow: [['10 min', 'Shape hunt in class.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Count with real boxes.']] }, { t: 'Circles', flow: [['10 min', 'Thread-and-pencil circles.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Check quiz.']] }],
      misconceptions: ['Cylinder has corners.', 'Diameter not through centre.'], activities: ['Clay solids.', 'Bangle circles.'],
      exit: ['Faces of a cuboid.', 'Radius 7 cm → diameter?', 'Name a cone at home.'], homework: 'Collect 5 objects at home, name their shapes and count faces, edges, corners.'
    },
    slides: [{ t: 'Shapes Around Us', b: ['Solids: faces, edges, corners', 'Roll or slide', 'Circle: centre, radius, diameter'] }, { t: 'Check yourself', b: ['Edges of a cube?', 'Radius 4 cm → diameter?'] }],
    fs: { groups: [['Solids', [['Cube / cuboid', 'F 6, E 12, C 8'], ['Square pyramid', 'F 5, E 8, C 5'], ['Cylinder', '2 flat + 1 curved'], ['Cone', '1 flat, 1 apex'], ['Sphere', 'curved only']]], ['Circle', [['Radius', 'centre to circle'], ['Diameter', '2 × radius']]]],
      ex: [['Triangular prism', 'F 5, E 9, C 6'], ['r = 6 cm', 'd = 12 cm']], rem: ['Count hidden edges too.', 'Diameter passes through the centre.', 'F + C − E = 2.'] }
  });
})();
