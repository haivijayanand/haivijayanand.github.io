/*
TOOL:    class2_maths_ch05
FAMILY:  CBSE_REVISION / Class 2 Maths (Joyful Mathematics)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 5 Playing with Lines - revise, 2 explore panels (line types, draw a shape with lines), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const LT = [['straight', 'standing (vertical)'], ['straight', 'sleeping (horizontal)'], ['straight', 'slanting'], ['curved', 'curved'], ['zig-zag', 'zig-zag']];
  G9.register({
    no: 5, part: 'All chapters', short: 'Lines', title: 'Playing with Lines',
    blurb: 'Straight and curved lines; standing (vertical), sleeping (horizontal) and slanting lines; making shapes and pictures from lines.',
    revise: {
      oneLine: 'Lines can be straight or curved. Straight lines can stand up (vertical), lie down (horizontal) or slant. Pictures and shapes are made by joining lines.',
      sections: [
        { h: 'Kinds of lines', html: `<p>Straight —— · curved ⌒ · zig-zag /\\/\\ · wavy ∿.</p>` },
        { h: 'Directions', html: `<p>Standing (vertical) like a flag pole | · sleeping (horizontal) like the floor — · slanting like a slide /.</p>` },
        { h: 'Shapes from lines', html: `<p>3 straight lines make a triangle; 4 make a square or rectangle; a curved line can close into a circle.</p>` }
      ],
      formulas: [['Standing', 'vertical |'], ['Sleeping', 'horizontal —'], ['Slanting', '/ or \\'], ['Curved', 'bends smoothly'], ['Triangle', '3 straight lines']],
      terms: [['Straight line', 'does not bend'], ['Curved line', 'bends smoothly'], ['Vertical', 'standing'], ['Horizontal', 'sleeping']],
      traps: ['A slanting line is still straight.', 'Use a ruler for straight lines.', 'Zig-zag is made of straight pieces.'],
      bridge: '<p>Lines make shapes (Ch 4) and patterns (Ch 6).</p>'
    },
    explore: [
      { title: 'Kinds of lines', intro: 'Press <kbd>S</kbd> to see the next kind of line.',
        build(el, K) { let k = -1; const b = new K.Board(el, { xmin: -4, xmax: 4, ymin: -2.2, ymax: 2.2, axes: false, grid: 0 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const o = { color: C.blue, w: 5 }; [() => b.line(0, -1.8, 0, 1.8, o), () => b.line(-3, 0, 3, 0, o), () => b.line(-2, -1.6, 2, 1.6, o), () => b.fn(x => x < -3 || x > 3 ? NaN : Math.sin(x * 1.2) * 1.2, o), () => { const Z = [[-3, -1], [-2, 1], [-1, -1], [0, 1], [1, -1], [2, 1], [3, -1]]; for (let i = 1; i < Z.length; i++) b.line(...Z[i - 1], ...Z[i], o); }][k]();
            rd.innerHTML = `a <b>${LT[k][1]}</b> line (${LT[k][0]})`; };
          const step = () => { k = (k + 1) % LT.length; b.redraw(); }; const row = K.row(el); K.button(row, 'Next line (S)', step); step(); return { step, play() {}, pause() {} }; } },
      { title: 'Join dots to make shapes', intro: 'Drag the four dots. The lines between them make a shape; the readout says which lines stand, sleep or slant.',
        build(el, K) { const b = new K.Board(el, { xmin: -5, xmax: 5, ymin: -3, ymax: 3 }); const rd = K.read(el);
          const P = [b.addPt(-3, -2, { snap: 1, label: 'A' }), b.addPt(3, -2, { snap: 1, label: 'B' }), b.addPt(3, 2, { snap: 1, label: 'C' }), b.addPt(-3, 2, { snap: 1, label: 'D' })];
          const kind = (p, q) => p.x === q.x ? 'standing' : p.y === q.y ? 'sleeping' : 'slanting';
          b.onDraw = () => { b.base(); b.poly(P.map(p => [p.x, p.y]), { fill: C.blueL, color: C.blue, w: 3 }); b.drawPts(); rd.innerHTML = ['AB', 'BC', 'CD', 'DA'].map((s, i) => `${s}: ${kind(P[i], P[(i + 1) % 4])}`).join(' · '); };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Name the line', gen(R) { const items = [['a flag pole', 'standing (vertical)'], ['the floor', 'sleeping (horizontal)'], ['a slide in the park', 'slanting'], ['a rainbow', 'curved'], ['the edge of a door', 'standing (vertical)'], ['a table top edge', 'sleeping (horizontal)']]; const [q, a] = R.pick(items); return { q: `What kind of line is ${q}?`, a }; } },
      { title: 'Straight or curved', gen(R) { const items = [['the letter L', 'straight'], ['the letter C', 'curved'], ['the letter O', 'curved'], ['the letter T', 'straight'], ['the letter S', 'curved'], ['the letter E', 'straight']]; const [q, a] = R.pick(items); return { q: `Is ${q} made of straight or curved lines?`, a }; } },
      { title: 'Lines in a shape', levels: [2, 3], gen(R) { const items = [['triangle', 3], ['square', 4], ['rectangle', 4], ['pentagon', 5], ['hexagon', 6]]; const [q, a] = R.pick(items); return { q: `How many straight lines make a ${q}?`, a: String(a), ans: a }; } },
      { title: 'Count the lines', levels: [1, 2], gen(R) { const s = R.int(2, 6), c = R.int(1, 4); return { q: `A picture has ${s} straight lines and ${c} curved lines. How many lines in all?`, a: String(s + c), ans: s + c }; } },
      { title: 'Letters with standing lines', levels: [3], gen(R) { const items = [['H', 2], ['E', 1], ['T', 1], ['M', 2], ['L', 1], ['F', 1]]; const [l, n] = R.pick(items); return { q: `How many standing (vertical) lines are in the capital letter ${l}?`, a: String(n), ans: n }; } }
    ],
    quiz: [
      { q: 'A flag pole is a', o: ['standing line', 'sleeping line', 'curved line', 'zig-zag'], a: 0, e: 'Vertical.' }, { q: 'The floor edge is a', o: ['sleeping line', 'standing line', 'curved line', 'slanting'], a: 0, e: 'Horizontal.' },
      { q: 'A rainbow is', o: ['curved', 'straight', 'zig-zag', 'standing'], a: 0, e: 'Bends.' }, { q: 'A slide is', o: ['slanting', 'sleeping', 'curved', 'standing'], a: 0, e: 'Tilted.' },
      { q: 'Lines in a triangle', o: ['3', '4', '2', '5'], a: 0, e: 'Three.' }, { q: 'Letter O has', o: ['a curved line', 'straight lines', 'zig-zag lines', 'no line'], a: 0, e: 'Round.' },
      { q: 'We draw straight lines with a', o: ['ruler', 'eraser', 'sharpener', 'crayon box'], a: 0, e: 'Ruler.' }, { q: 'Zig-zag is made of', o: ['straight pieces', 'curves', 'circles', 'dots only'], a: 0, e: 'Straight bits.' },
      { q: 'Letter H has how many standing lines?', o: ['2', '1', '3', '0'], a: 0, e: 'Two.' }, { q: 'Vertical means', o: ['standing', 'sleeping', 'curved', 'slanting'], a: 0, e: 'Up and down.' },
      { q: 'Lines in a square', o: ['4', '3', '5', '6'], a: 0, e: 'Four.' }
    ],
    teach: {
      outcomes: ['Identify straight and curved lines', 'Name standing, sleeping and slanting lines', 'Make shapes and pictures with lines'],
      periods: [{ t: 'Lines', flow: [['10 min', 'Body lines: stand, lie down, lean.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Draw lines with a ruler.']] }, { t: 'Shapes from lines', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Stick pictures.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Slanting is not straight.'], activities: ['Matchstick pictures.', 'Find lines in the classroom.'],
      exit: ['Draw a sleeping line.', 'Is C straight or curved?', 'Lines in a triangle?'], homework: 'Draw your house using only straight lines and a sun using curved lines.'
    },
    slides: [{ t: 'Playing with Lines', b: ['Straight and curved', 'Standing, sleeping, slanting', 'Shapes from lines'] }, { t: 'Check yourself', b: ['Draw a slanting line.', 'Name a curved letter.'] }],
    fs: { groups: [['Kinds', [['Straight', '—'], ['Curved', '⌒'], ['Zig-zag', '/\\/\\'], ['Wavy', '∿']]], ['Directions', [['Standing (vertical)', '|'], ['Sleeping (horizontal)', '—'], ['Slanting', '/']]], ['Shapes', [['Triangle', '3 lines'], ['Square, rectangle', '4 lines'], ['Circle', 'one curved line']]]],
      ex: [['Letter T', '1 standing + 1 sleeping'], ['Letter S', 'curved']], rem: ['Use a ruler for straight lines.', 'Slanting lines are straight too.', 'Join lines to make shapes.'] }
  });
})();
