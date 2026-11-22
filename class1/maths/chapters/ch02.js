/*
TOOL:    class1_maths_ch02
FAMILY:  CBSE_REVISION / Class 1 Maths (Joyful Mathematics)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 2 What is Long? What is Round? (shapes) - revise, 2 explore panels (roll, slide or stack; shape spotter), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const SOL = [['ball ⚽', 'rolls', 'round all over'], ['box 📦', 'slides and stacks', 'flat faces, corners'], ['can 🥫', 'rolls and stacks', 'round and flat faces'], ['dice 🎲', 'slides and stacks', 'flat faces, corners'], ['party hat 🥳', 'rolls in a circle', 'pointed top, round bottom'], ['orange 🍊', 'rolls', 'round all over']];

  G9.register({
    no: 2, part: 'All chapters', short: 'Long and round', title: 'What is Long? What is Round?',
    blurb: 'Shapes around us: long and short, round and flat, things that roll, slide or stack; circles, triangles, squares and rectangles.',
    revise: {
      oneLine: 'Things around us have shapes. Round things roll; things with flat faces slide and stack. Flat shapes like circles, triangles, squares and rectangles are found on the faces of objects.',
      sections: [
        { h: 'Long and short, round and flat', html: `<p>A pencil is long and thin; an eraser is short. A ball is round. A book has flat faces.</p>` },
        { h: 'Roll, slide, stack', html: `<p>⚽ rolls. 📦 slides and can be stacked. 🥫 can roll on its side and stack on its flat face.</p>` },
        { h: 'Flat shapes', html: `<p>⚪ circle — round, no corners. 🔺 triangle — 3 sides, 3 corners. 🟥 square — 4 equal sides, 4 corners. ▭ rectangle — 4 sides, opposite sides equal, 4 corners.</p>` }
      ],
      formulas: [['Circle', 'round, no corners'], ['Triangle', '3 sides, 3 corners'], ['Square', '4 equal sides'], ['Rectangle', '4 sides, 2 long and 2 short'], ['Rolls', 'round things'], ['Stacks', 'things with flat faces']],
      terms: [['Corner', 'where two sides meet'], ['Side', 'straight edge of a shape'], ['Round', 'curved all around'], ['Flat', 'smooth and level']],
      traps: ['A tilted square is still a square.', 'A rectangle is not a square unless all sides are equal.', 'A can is round on its side but flat on its ends.'],
      bridge: '<p>Shapes come back in patterns (Ch 9) and in Class 2 "Shapes Around Us".</p>'
    },

    explore: [
      {
        title: 'Roll, slide or stack?', intro: 'Press <kbd>S</kbd> to see the next object and what it can do.',
        build(el, K) {
          const rd = K.read(el); let k = -1; const box = document.createElement('div'); box.style.cssText = 'font-size:72px;text-align:center;margin:10px 0'; el.appendChild(box);
          const step = () => { k = (k + 1) % SOL.length; const [n, d, f] = SOL[k]; box.textContent = n.split(' ')[1]; rd.innerHTML = `A <b>${n.split(' ')[0]}</b> ${d} — it is ${f}.`; };
          const row = K.row(el); K.button(row, 'Next object (S)', step); step(); return { step, play() {}, pause() {} };
        }
      },
      {
        title: 'Shape spotter', intro: 'Choose a shape. Count its sides and corners.',
        build(el, K) {
          const sh = [['circle', 0], ['triangle', 3], ['square', 4], ['rectangle', 4]]; let k = 1; const row = K.row(el); K.select(row, 'shape', sh.map(s => s[0]), i => { k = i; b.redraw(); });
          const b = new K.Board(el, { xmin: -5, xmax: 5, ymin: -3.5, ymax: 3.5, axes: false, grid: 0 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const P = [null, [[-3, -2.5], [3, -2.5], [0, 2.8]], [[-2.5, -2.5], [2.5, -2.5], [2.5, 2.5], [-2.5, 2.5]], [[-4, -2], [4, -2], [4, 2], [-4, 2]]][k];
            if (!P) b.circle(0, 0, 2.8, { fill: C.blueL, color: C.blue, w: 4 }); else { b.poly(P, { fill: C.blueL, color: C.blue, w: 4 }); P.forEach(p => b.dot(p[0], p[1], { color: C.orange, r: 8 })); }
            rd.innerHTML = `A <b>${sh[k][0]}</b> has ${sh[k][1] || 'no'} sides and ${sh[k][1] || 'no'} corners (orange dots).${k === 0 ? ' It is round.' : ''}`; };
          b.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Count sides and corners', gen(R) {
          const s = R.pick([['🔺 triangle', 3], ['🟥 square', 4], ['▭ rectangle', 4], ['⚪ circle', 0]]); return { q: `How many corners does a ${s[1] ? '' : ''}${s[0]} have?`, a: String(s[1]), ans: s[1] };
        } },
      { title: 'Roll or slide?', gen(R) {
          const s = R.pick(SOL); return { q: `Does a ${s[0]} roll, slide or stack?`, a: s[1] };
        } },
      { title: 'Long or short', levels: [1, 2], gen(R) {
          const items = [['a train 🚆 or a car 🚗 — which is longer?', 'train'], ['a snake 🐍 or a worm 🪱 — which is longer?', 'snake'], ['a ruler or an eraser — which is shorter?', 'eraser'], ['a bus 🚌 or a bicycle 🚲 — which is longer?', 'bus']];
          const [q, a] = R.pick(items); return { q: `Which is it: ${q}`, a };
        } },
      { title: 'Find the shape', levels: [2, 3], gen(R) {
          const items = [['the face of a coin', 'circle'], ['the top of a table', 'rectangle'], ['a slice of pizza', 'triangle'], ['a carrom board', 'square'], ['the face of a clock', 'circle'], ['a door', 'rectangle'], ['a chess board', 'square']];
          const [q, a] = R.pick(items); return { q: `What shape is ${q}?`, a };
        } },
      { title: 'How many shapes?', levels: [3], gen(R) {
          const n = { '🔺': R.int(1, 5), '⚪': R.int(1, 5), '🟥': R.int(1, 5) }; const w = R.pick(Object.keys(n)); const s = R.shuffle(Object.entries(n).flatMap(([e, c]) => Array(c).fill(e))).join(' ');
          return { q: `How many ${w} are there? ${s}`, a: String(n[w]), ans: n[w] };
        } }
    ],

    quiz: [
      { q: 'Which can roll?', o: ['⚽', '📦', '📕', '🎲'], a: 0, e: 'Round things roll.' },
      { q: 'A triangle has how many corners?', o: ['3', '4', '0', '2'], a: 0, e: 'Tri = three.' },
      { q: 'A circle has how many corners?', o: ['0', '1', '4', '3'], a: 0, e: 'Round.' },
      { q: 'The face of a coin is a', o: ['circle', 'square', 'triangle', 'rectangle'], a: 0, e: 'Round and flat.' },
      { q: 'Which can be stacked easily?', o: ['📦', '⚽', '🍊', '🥚'], a: 0, e: 'Flat faces.' },
      { q: 'A square has', o: ['4 equal sides', '3 sides', 'no sides', '2 sides'], a: 0, e: 'Four equal sides.' },
      { q: 'Which is longer?', o: ['🚆 train', '🚗 car', '🛵 scooter', '🚲 cycle'], a: 0, e: 'Train.' },
      { q: 'A door is shaped like a', o: ['rectangle', 'circle', 'triangle', 'ball'], a: 0, e: '2 long, 2 short sides.' },
      { q: 'A can 🥫 can', o: ['roll and stack', 'only roll', 'only stack', 'do neither'], a: 0, e: 'Round side, flat ends.' },
      { q: 'A slice of pizza looks like a', o: ['triangle', 'square', 'circle', 'rectangle'], a: 0, e: 'Three corners.' },
      { q: 'How many sides does a rectangle have?', o: ['4', '3', '5', '6'], a: 0, e: 'Four.' }
    ],

    teach: {
      outcomes: ['Compare long and short objects', 'Tell which objects roll, slide or stack', 'Name circle, triangle, square, rectangle', 'Count sides and corners'],
      periods: [
        { t: 'Roll and slide', flow: [['15 min', 'Roll real objects down a book ramp.'], ['10 min', 'Explore panel 1.'], ['15 min', 'Sort: rollers and sliders.']] },
        { t: 'Flat shapes', flow: [['15 min', 'Trace faces of boxes and cans.'], ['15 min', 'Explore panel 2: sides and corners.'], ['10 min', 'Shape hunt in class.']] }
      ],
      misconceptions: ['Tilted square called a diamond.', 'All four-sided shapes are squares.'],
      activities: ['Shape walk: find 5 circles in school.', 'Make shapes with sticks and clay.'],
      exit: ['Show something that rolls.', 'Draw a triangle.', 'How many corners in a square?'],
      homework: 'Find 2 round things and 2 things with flat faces at home. Trace one face of each.'
    },

    slides: [
      { t: 'What is Long? What is Round?', b: ['Long and short', 'Roll, slide, stack', 'Circle, triangle, square, rectangle'] },
      { t: 'Shapes', b: ['⚪ circle: no corners', '🔺 triangle: 3 corners', '🟥 square: 4 equal sides', '▭ rectangle: 4 sides'] },
      { t: 'Check yourself', b: ['Name something that rolls.', 'How many corners in a triangle?'] }
    ],

    fs: { groups: [
        ['Objects', [['Roll', '⚽ 🍊 🥫'], ['Slide and stack', '📦 🎲 📕'], ['Long', '🚆 🐍 ruler'], ['Short', 'eraser, 🐜']]],
        ['Flat shapes', [['⚪ Circle', 'round, 0 corners'], ['🔺 Triangle', '3 sides, 3 corners'], ['🟥 Square', '4 equal sides, 4 corners'], ['▭ Rectangle', '4 sides, 4 corners']]],
        ['Around us', [['Coin, clock', 'circle'], ['Door, book', 'rectangle'], ['Carrom board', 'square'], ['Pizza slice', 'triangle']]]],
      ex: [['🥫 can', 'rolls on its side, stacks on its end'], ['🔺', '3 sides, 3 corners']],
      rem: ['Count corners by touching each one.', 'Round things roll.', 'Turn a shape — its name stays the same.'] }
  });
})();
