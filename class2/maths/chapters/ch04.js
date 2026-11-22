/*
TOOL:    class2_maths_ch04
FAMILY:  CBSE_REVISION / Class 2 Maths (Joyful Mathematics)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 4 Shadow Story (2-D shapes) - revise, 2 explore panels (shadows of solids, flat shapes and their sides), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const SH = [['circle', 0], ['triangle', 3], ['square', 4], ['rectangle', 4], ['pentagon', 5], ['hexagon', 6]];
  G9.register({
    no: 4, part: 'All chapters', short: 'Flat shapes', title: 'Shadow Story',
    blurb: 'Flat (2-D) shapes as shadows and tracings of solids: circle, triangle, square, rectangle and more; sides and corners.',
    revise: {
      oneLine: 'A shadow or a tracing of a solid is a flat shape. A can makes a circle or a rectangle, a box makes a rectangle or a square. Flat shapes are named by their sides and corners.',
      sections: [
        { h: 'Shadows and tracings', html: `<p>Trace the bottom of a 🥫 can: a circle. Shine a torch on it from the side: a rectangle. A cone can give a circle or a triangle.</p>` },
        { h: 'Flat shapes', html: `<p>Circle (no sides), triangle (3 sides), square (4 equal sides), rectangle (4 sides, opposite equal), pentagon (5), hexagon (6).</p>` }
      ],
      formulas: [['Triangle', '3 sides, 3 corners'], ['Square', '4 equal sides'], ['Rectangle', '2 long + 2 short sides'], ['Circle', 'no sides, no corners'], ['Hexagon', '6 sides']],
      terms: [['2-D', 'flat shape'], ['3-D', 'solid shape'], ['Side', 'straight line edge'], ['Tracing', 'drawing round a face']],
      traps: ['A square tilted on its corner is still a square.', 'A shadow depends on which way the light shines.', 'Circles have no corners.'],
      bridge: '<p>Builds on Ch 2 (solids). Ch 5 draws lines of different kinds.</p>'
    },
    explore: [
      { title: 'Shadows of a solid', intro: 'Choose a solid and where the light comes from. The shadow is a flat shape.',
        build(el, K) { const S = [['can (cylinder)', 'circle', 'rectangle'], ['box (cuboid)', 'rectangle', 'rectangle'], ['dice (cube)', 'square', 'square'], ['ice-cream cone', 'circle', 'triangle'], ['ball (sphere)', 'circle', 'circle']]; let k = 0, v = 0;
          const row = K.row(el); K.select(row, 'solid', S.map(s => s[0]), i => { k = i; b.redraw(); }); K.select(row, 'light from', ['above', 'the side'], i => { v = i; b.redraw(); });
          const b = new K.Board(el, { xmin: -3, xmax: 3, ymin: -2, ymax: 2, axes: false, grid: 0 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const s = S[k][1 + v], f = { fill: '#334155', color: '#0f172a' }; if (s === 'circle') b.circle(0, 0, 1.4, f); if (s === 'square') b.rect(-1.3, -1.3, 2.6, 2.6, f); if (s === 'rectangle') b.rect(-2, -1, 4, 2, f); if (s === 'triangle') b.poly([[-1.4, -1.3], [1.4, -1.3], [0, 1.5]], f);
            rd.innerHTML = `${S[k][0]} with light from ${v ? 'the side' : 'above'} → shadow is a <b>${s}</b>`; };
          b.redraw(); return null; } },
      { title: 'Sides and corners', intro: 'Choose a shape and count its sides and corners.',
        build(el, K) { let k = 1; const row = K.row(el); K.select(row, 'shape', SH.map(s => s[0]), i => { k = i; b.redraw(); });
          const b = new K.Board(el, { xmin: -3, xmax: 3, ymin: -2, ymax: 2, axes: false, grid: 0 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const [n, s] = SH[k]; if (!s) b.circle(0, 0, 1.6, { fill: C.blueL, color: C.blue, w: 4 }); else { const P = n === 'rectangle' ? [[-2.2, -1.2], [2.2, -1.2], [2.2, 1.2], [-2.2, 1.2]] : Array.from({ length: s }, (_, i) => [1.7 * Math.cos(Math.PI / 2 + 2 * Math.PI * i / s + (s === 4 ? Math.PI / 4 : 0)), 1.7 * Math.sin(Math.PI / 2 + 2 * Math.PI * i / s + (s === 4 ? Math.PI / 4 : 0))]); b.poly(P, { fill: C.blueL, color: C.blue, w: 4 }); P.forEach(p => b.dot(p[0], p[1], { color: C.orange, r: 7 })); }
            rd.innerHTML = `<b>${n}</b>: ${s} sides, ${s} corners`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Sides and corners', gen(R) { const [n, s] = R.pick(SH); return { q: `How many sides does a ${n} have?`, a: String(s), ans: s }; } },
      { title: 'Trace the face', gen(R) { const items = [['the bottom of a glass', 'circle'], ['a face of a dice', 'square'], ['the top of a brick', 'rectangle'], ['the bottom of a cone', 'circle'], ['a face of a matchbox', 'rectangle']]; const [q, a] = R.pick(items); return { q: `What shape do you get when you trace ${q}?`, a }; } },
      { title: 'Shadow', levels: [2, 3], gen(R) { const items = [['a can from above', 'circle'], ['a can from the side', 'rectangle'], ['a cone from the side', 'triangle'], ['a ball from any side', 'circle'], ['a dice from the front', 'square']]; const [q, a] = R.pick(items); return { q: `What shape is the shadow of ${q}?`, a }; } },
      { title: 'Count shapes', gen(R) { const n = { '🔺': R.int(1, 5), '🟦': R.int(1, 5), '⚪': R.int(1, 5) }; const w = R.pick(Object.keys(n)); const s = R.shuffle(Object.entries(n).flatMap(([e, c]) => Array(c).fill(e))).join(' '); return { q: `How many ${w}? ${s}`, a: String(n[w]), ans: n[w] }; } },
      { title: 'Which shape?', levels: [3], gen(R) { const items = [['3 sides', 'triangle'], ['4 equal sides', 'square'], ['no corners', 'circle'], ['6 sides', 'hexagon'], ['5 corners', 'pentagon']]; const [q, a] = R.pick(items); return { q: `Which flat shape has ${q}?`, a }; } }
    ],
    quiz: [
      { q: 'Trace a coin: shape', o: ['circle', 'square', 'triangle', 'rectangle'], a: 0, e: 'Round.' }, { q: 'Sides of a triangle', o: ['3', '4', '0', '5'], a: 0, e: 'Three.' },
      { q: 'Shadow of a can from the side', o: ['rectangle', 'circle', 'triangle', 'square'], a: 0, e: 'Side view.' }, { q: 'Corners of a circle', o: ['0', '1', '4', '2'], a: 0, e: 'None.' },
      { q: 'A face of a dice is a', o: ['square', 'circle', 'triangle', 'hexagon'], a: 0, e: 'Equal sides.' }, { q: 'Sides of a hexagon', o: ['6', '5', '8', '4'], a: 0, e: 'Hex = 6.' },
      { q: 'Cone from the side gives a', o: ['triangle', 'circle', 'square', 'rectangle'], a: 0, e: 'Pointed top.' }, { q: 'Flat shapes are', o: ['2-D', '3-D', 'solids', 'balls'], a: 0, e: 'Two dimensions.' },
      { q: 'A rectangle has', o: ['2 long and 2 short sides', '3 sides', 'no sides', '6 sides'], a: 0, e: 'Opposite equal.' }, { q: 'Shadow of a ball', o: ['circle', 'square', 'triangle', 'line'], a: 0, e: 'Always round.' },
      { q: 'Pentagon corners', o: ['5', '6', '4', '3'], a: 0, e: 'Five.' }
    ],
    teach: {
      outcomes: ['Connect solids with the flat shapes of their faces and shadows', 'Name flat shapes', 'Count sides and corners'],
      periods: [{ t: 'Shadows', flow: [['15 min', 'Torch and objects: shadow play.'], ['15 min', 'Explore panel 1.'], ['10 min', 'Trace faces.']] }, { t: 'Flat shapes', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Shape hunt.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Tilted square.', 'Shadow always same.'], activities: ['Shadow puppets.', 'Stamp faces with paint.'],
      exit: ['Trace a box face — shape?', 'Sides of a pentagon?', 'Draw a triangle.'], homework: 'Trace the faces of 3 objects at home and name the shapes.'
    },
    slides: [{ t: 'Shadow Story', b: ['Shadows and tracings', 'Flat shapes', 'Sides and corners'] }, { t: 'Check yourself', b: ['Shadow of a cone?', 'Sides of a hexagon?'] }],
    fs: { groups: [['Flat shapes', [['⚪ circle', '0 sides'], ['🔺 triangle', '3 sides'], ['🟦 square', '4 equal sides'], ['▭ rectangle', '4 sides'], ['pentagon', '5 sides'], ['hexagon', '6 sides']]], ['From solids', [['Can', 'circle or rectangle'], ['Cone', 'circle or triangle'], ['Dice', 'square'], ['Ball', 'circle']]]],
      ex: [['Trace a brick', 'rectangle'], ['Can from above', 'circle']], rem: ['Count sides by touching them.', 'Shadows change with the light.', 'Turning does not change the name.'] }
  });
})();
