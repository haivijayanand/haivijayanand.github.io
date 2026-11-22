/*
TOOL:    class3_maths_ch12
FAMILY:  CBSE_REVISION / Class 3 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 12 Give and Take (addition and subtraction practice) - revise, 2 explore panels (bar model, number puzzles), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 12, part: 'All chapters', short: 'Give and take', title: 'Give and Take',
    blurb: 'Choosing to add or subtract in word problems, bar models, missing numbers, two-step problems and number puzzles.',
    revise: {
      oneLine: 'Read the story: "give" or "altogether" means add; "take", "left" or "how many more" means subtract. A bar model shows the whole and its parts, so you can see which operation to use.',
      sections: [
        { h: 'Bar model', html: `<p>Whole = part + part. If the whole is missing, add. If a part is missing, subtract it from the whole.</p>` },
        { h: 'Two steps', html: `<p>Ravi had 250 marbles, won 125, then gave away 80: 250 + 125 − 80 = 295.</p>` },
        { h: 'Puzzles', html: `<p>Magic triangle: put 1–6 on a triangle so each side adds to the same number.</p>` }
      ],
      formulas: [['Whole missing', 'add parts'], ['Part missing', 'whole − other part'], ['How many more', 'bigger − smaller'], ['Two steps', 'one at a time']],
      terms: [['Whole', 'total'], ['Part', 'piece of the total'], ['Bar model', 'drawing of whole and parts']],
      traps: ['Subtracting when the whole is missing.', 'Doing only one step of a two-step problem.'],
      bridge: '<p>Uses Ch 9 column methods.</p>'
    },
    explore: [
      { title: 'Bar model', intro: 'Set the two parts. Choose which one is hidden; the bar tells you to add or subtract.',
        build(el, K) { let a = 240, b = 160, h = 0; const row = K.row(el); K.slider(row, 'part A', 10, 500, 10, a, v => { a = v; draw(); }); K.slider(row, 'part B', 10, 400, 10, b, v => { b = v; draw(); }); K.select(row, 'hidden', ['the whole', 'part B'], i => { h = i; draw(); }); const rd = K.read(el);
          function draw() { const W = 600, wa = a / (a + b) * W; rd.innerHTML = `<div style="width:${W}px;max-width:100%;border:2px solid var(--ink,#0f172a);text-align:center;padding:4px;font-weight:bold">${h === 0 ? '?' : a + b}</div><div style="display:flex;width:${W}px;max-width:100%"><div style="width:${wa}px;background:var(--blueL,#dbeafe);border:2px solid var(--blue,#1d4ed8);text-align:center;padding:4px">${a}</div><div style="flex:1;background:var(--orangeL,#ffedd5);border:2px solid var(--orange,#ea580c);text-align:center;padding:4px">${h === 1 ? '?' : b}</div></div>${h === 0 ? `whole missing → add: ${a} + ${b} = <b>${a + b}</b>` : `part missing → subtract: ${a + b} − ${a} = <b>${b}</b>`}`; }
          draw(); return null; } },
      { title: 'Magic triangle', intro: 'Press <kbd>S</kbd> for a solution: 1–6 on a triangle with equal side sums.',
        build(el, K) { const sols = [[1, 6, 2, 4, 3, 5, 9], [4, 2, 6, 1, 5, 3, 12], [6, 2, 4, 3, 5, 1, 12], [1, 5, 3, 4, 2, 6, 9]]; let k = -1; const b = new K.Board(el, { xmin: -3, xmax: 3, ymin: -2.7, ymax: 2.6, axes: false, grid: 0 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const s = sols[k]; const P = [[0, 2], [-1.25, -0.1], [-2.5, -2], [0, -2], [2.5, -2], [1.25, -0.1]]; b.poly([P[0], P[2], P[4]], { color: C.blue, w: 3 }); P.forEach((p, i) => { b.circle(p[0], p[1], 0.35, { fill: '#fff', color: C.orange, w: 3 }); b.text(p[0], p[1], String(s[i]), { font: 'bold 18px' }); });
            rd.innerHTML = `each side adds to <b>${s[6]}</b>: ${s[0]} + ${s[1]} + ${s[2]}, ${s[2]} + ${s[3]} + ${s[4]}, ${s[4]} + ${s[5]} + ${s[0]}`; };
          const step = () => { k = (k + 1) % sols.length; b.redraw(); }; const row = K.row(el); K.button(row, 'Another (S)', step); step(); return { step, play() {}, pause() {} }; } }
    ],
    gens: [
      { title: 'Add or subtract?', gen(R) { const a = R.int(100, 500), b = R.int(50, 300); const t = R.int(0, 2); const qs = [[`A shop had ${a} pens and got ${b} more. How many now?`, a + b], [`A bus had ${a + b} passengers; ${b} got off. How many on the bus?`, a], [`Team A scored ${a + b} and team B ${a}. How many more did A score?`, b]]; return { q: qs[t][0], a: String(qs[t][1]), ans: qs[t][1] }; } },
      { title: 'Missing number', gen(R) { const a = R.int(100, 500), b = R.int(100, 400); return R.chance(.5) ? { q: `${a} + __ = ${a + b}`, a: String(b), ans: b } : { q: `__ − ${b} = ${a}`, a: String(a + b), ans: a + b }; } },
      { title: 'Two-step', levels: [2, 3], gen(R) { const a = R.int(150, 400), b = R.int(50, 200), c = R.int(20, 150); return { q: `Ravi had ${a} marbles, won ${b} and then gave away ${c}. How many now?`, a: String(a + b - c), ans: a + b - c }; } },
      { title: 'Bar model', gen(R) { const a = R.int(50, 400), b = R.int(50, 400); return { q: `Whole ${a + b}, one part ${a}. Other part?`, a: String(b), ans: b }; } },
      { title: 'Number puzzle', levels: [3], gen(R) { const n = R.int(100, 500), k = R.int(10, 90); return { q: `I think of a number, add ${k} and get ${n + k}. What is my number?`, a: String(n), ans: n }; } }
    ],
    quiz: [
      { q: '"Altogether" usually means', o: ['add', 'subtract', 'divide', 'compare'], a: 0, e: 'Total.' }, { q: '"How many left" means', o: ['subtract', 'add', 'multiply', 'share'], a: 0, e: 'Take away.' },
      { q: 'Whole 500, part 320, other part', o: ['180', '820', '220', '280'], a: 0, e: '500 − 320.' }, { q: '250 + 125 − 80', o: ['295', '455', '305', '195'], a: 0, e: 'Two steps.' },
      { q: '__ + 150 = 400', o: ['250', '550', '350', '150'], a: 0, e: '400 − 150.' }, { q: 'A scored 420, B 380. More by A', o: ['40', '800', '80', '20'], a: 0, e: 'Difference.' },
      { q: 'Bar model: whole missing →', o: ['add', 'subtract', 'divide', 'guess'], a: 0, e: 'Add parts.' }, { q: '__ − 60 = 140', o: ['200', '80', '140', '260'], a: 0, e: 'Add back.' },
      { q: 'Magic triangle with 1–6 uses each number', o: ['once', 'twice', 'never', 'three times'], a: 0, e: 'Once.' }, { q: '300 − 1', o: ['299', '301', '290', '200'], a: 0, e: 'Count back.' },
      { q: '"Gave away" means', o: ['subtract', 'add', 'multiply', 'double'], a: 0, e: 'Less now.' }
    ],
    teach: {
      outcomes: ['Choose addition or subtraction', 'Use bar models', 'Solve two-step problems and missing numbers'],
      periods: [{ t: 'Bar models', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Draw bars for stories.'], ['10 min', 'Practice.']] }, { t: 'Puzzles', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Two-step stories.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Keyword guessing without thinking.'], activities: ['Story cards: add or subtract?', 'Magic triangles on paper.'],
      exit: ['Draw a bar for 350 = 200 + ?', 'Solve a two-step story.', '__ − 45 = 120.'], homework: 'Write a give-and-take story about money at home and solve it with a bar model.'
    },
    slides: [{ t: 'Give and Take', b: ['Add or subtract?', 'Bar models', 'Two steps', 'Puzzles'] }, { t: 'Check yourself', b: ['Whole 600, part 250?', '__ + 99 = 300?'] }],
    fs: { groups: [['Which operation', [['altogether, in all, more (got)', 'add'], ['left, gave away, how many more', 'subtract']]], ['Bar model', [['Whole missing', 'add'], ['Part missing', 'subtract']]], ['Check', [['Add back', 'part + part = whole']]]],
      ex: [['400 = 175 + ?', '225'], ['120 + 80 − 50', '150']], rem: ['Draw a bar.', 'One step at a time.', 'Check the answer makes sense.'] }
  });
})();
