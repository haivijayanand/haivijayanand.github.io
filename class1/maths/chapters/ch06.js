/*
TOOL:    class1_maths_ch06
FAMILY:  CBSE_REVISION / Class 1 Maths (Joyful Mathematics)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 6 Vegetable Farm (adding and subtracting up to 20) - revise, 2 explore panels (number line hops, make-a-ten), 6 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;

  G9.register({
    no: 6, part: 'All chapters', short: 'Add and subtract to 20', title: 'Vegetable Farm',
    blurb: 'Adding and subtracting with numbers up to 20 using the number line, making a ten and doubles.',
    revise: {
      oneLine: 'For bigger sums, hop on a number line, make a ten first (8 + 5 = 8 + 2 + 3 = 13), or use doubles (6 + 6 = 12, so 6 + 7 = 13). Subtraction hops back.',
      sections: [
        { h: 'Number line', html: `<p>9 + 4: start at 9, hop 4 steps forward → 13. 15 − 6: start at 15, hop 6 back → 9.</p>` },
        { h: 'Make a ten', html: `<p>8 + 5: 8 needs 2 to make 10, so split 5 into 2 and 3: 10 + 3 = 13.</p>` },
        { h: 'Doubles', html: `<p>5 + 5 = 10, 6 + 6 = 12, 7 + 7 = 14, 8 + 8 = 16, 9 + 9 = 18. Near doubles: 7 + 8 = 7 + 7 + 1 = 15.</p>` }
      ],
      formulas: [['Hop forward', 'add'], ['Hop back', 'subtract'], ['Make a ten', '8 + 5 = 10 + 3'], ['Doubles', '6 + 6 = 12'], ['Near double', '6 + 7 = 13'], ['Check', '13 − 5 = 8 ⇔ 8 + 5 = 13']],
      terms: [['Number line', 'numbers on a line in order'], ['Double', 'a number added to itself'], ['Difference', 'how many more'], ['Total', 'all together']],
      traps: ['Counting the start point as a hop.', 'Forgetting to carry on past 10.', 'Subtracting in the wrong order.'],
      bridge: '<p>Ch 8 goes to 99; Ch 11 uses repeated addition (multiplication).</p>'
    },

    explore: [
      {
        title: 'Hop on the number line', intro: 'Choose the start and the hops; press <kbd>S</kbd> for each hop.',
        build(el, K) {
          let s = 9, h = 4, dir = 0; const row = K.row(el); K.slider(row, 'start', 0, 20, 1, s, v => { s = v; an.reset(); }); K.slider(row, 'hops', 1, 10, 1, h, v => { h = v; an.reset(); }); K.select(row, 'direction', ['forward (+)', 'back (−)'], i => { dir = i; an.reset(); });
          const b = new K.Board(el, { xmin: -0.8, xmax: 20.8, ymin: -1.4, ymax: 2.2, axes: false, grid: 0, aspect: 0.22 }); const rd = K.read(el); const an = new K.Anim(10, () => b.redraw(), { ms: 500 });
          b.onDraw = () => { b.clear(); b.line(-0.5, 0, 20.5, 0, { color: C.ink, w: 2 }); for (let i = 0; i <= 20; i++) { b.line(i, -0.15, i, 0.15, { color: C.ink }); b.text(i, -0.7, String(i), { font: '13px' }); }
            const sg = dir ? -1 : 1, k = Math.min(an.i, h); let pos = s; for (let j = 0; j < k; j++) { const nx = pos + sg; if (nx < 0 || nx > 20) break; b.arc((pos + nx) / 2, 0, 0.5, 0, Math.PI, { color: C.orange, w: 2 }); pos = nx; }
            b.text(pos, 1.3, '🐰', { font: '24px' }); const end = s + sg * h; rd.innerHTML = end < 0 || end > 20 ? 'Too many hops for this line — choose fewer.' : `${s} ${dir ? '−' : '+'} ${h}: ${k} hop(s) so far, at ${pos}${k === h ? ` · <b>${s} ${dir ? '−' : '+'} ${h} = ${end}</b>` : ''}`; };
          K.anim(el, an); b.redraw(); return an;
        }
      },
      {
        title: 'Make a ten', intro: 'Pick two numbers. The second is split to fill the ten-frame first.',
        build(el, K) {
          let a = 8, c = 5; const row = K.row(el); K.slider(row, 'first', 5, 9, 1, a, v => { a = v; draw(); }); K.slider(row, 'second', 2, 9, 1, c, v => { c = v; draw(); }); const rd = K.read(el);
          function draw() { const need = 10 - a, rest = c - need; rd.innerHTML = rest < 0 ? `${a} + ${c} = ${a + c} (less than 10, no need to make a ten)` : `<div style="font-size:26px">${'🔴'.repeat(a)}${'🔵'.repeat(need)} | ${'🔵'.repeat(rest)}</div>${a} needs ${need} to make 10 · split ${c} into ${need} and ${rest} · 10 + ${rest} = <b>${a + c}</b>`; }
          draw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Add to 20', gen(R) {
          const a = R.int(2, 12), b = R.int(1, 20 - a); return { q: `${a} + ${b} = ?`, a: String(a + b), ans: a + b };
        } },
      { title: 'Subtract within 20', gen(R) {
          const a = R.int(5, 20), b = R.int(1, a); return { q: `${a} − ${b} = ?`, a: String(a - b), ans: a - b };
        } },
      { title: 'Make a ten', levels: [2, 3], gen(R) {
          const a = R.int(6, 9), b = R.int(11 - a, 9); return { q: `${a} + ${b} = ? (make a ten first)`, a: String(a + b), ans: a + b, s: `${a} + ${10 - a} + ${b - (10 - a)}` };
        } },
      { title: 'Doubles', levels: [1, 2], gen(R) {
          const a = R.int(1, 10); return R.chance(.6) ? { q: `${a} + ${a} = ?`, a: String(2 * a), ans: 2 * a } : { q: `${a} + ${a + 1} = ? (near double)`, a: String(2 * a + 1), ans: 2 * a + 1 };
        } },
      { title: 'Farm stories', gen(R) {
          const a = R.int(5, 12), b = R.int(2, 8); return R.chance(.5) ? { q: `The farmer picked ${a} carrots 🥕 and then ${b} more. How many carrots in all?`, a: String(a + b), ans: a + b } : { q: `There were ${a + b} tomatoes 🍅. ${b} were sold. How many are left?`, a: String(a), ans: a };
        } },
      { title: 'How many more?', levels: [3], gen(R) {
          const a = R.int(3, 10), b = a + R.int(1, 9); return { q: `Asha has ${a} beans and Mohan has ${b}. How many more does Mohan have?`, a: String(b - a), ans: b - a, s: `${b} − ${a}` };
        } }
    ],

    quiz: [
      { q: '9 + 4 =', o: ['13', '14', '12', '5'], a: 0, e: '9 + 1 + 3.' },
      { q: '15 − 6 =', o: ['9', '8', '11', '21'], a: 0, e: 'Hop back.' },
      { q: '7 + 7 =', o: ['14', '77', '15', '12'], a: 0, e: 'Double.' },
      { q: '8 + 5: 8 needs __ to make 10', o: ['2', '5', '3', '8'], a: 0, e: '8 + 2.' },
      { q: '6 + 7 =', o: ['13', '12', '14', '1'], a: 0, e: 'Near double.' },
      { q: '20 − 10 =', o: ['10', '30', '0', '2'], a: 0, e: 'One ten left.' },
      { q: 'Start at 12, hop 5 forward', o: ['17', '7', '16', '125'], a: 0, e: '12 + 5.' },
      { q: '11 tomatoes, 4 sold, left', o: ['7', '15', '6', '8'], a: 0, e: '11 − 4.' },
      { q: '9 + 9 =', o: ['18', '19', '99', '16'], a: 0, e: 'Double 9.' },
      { q: 'If 8 + 5 = 13, then 13 − 5 =', o: ['8', '5', '18', '3'], a: 0, e: 'Fact family.' },
      { q: '10 + 7 =', o: ['17', '70', '3', '107'], a: 0, e: 'Ten and seven.' }
    ],

    teach: {
      outcomes: ['Add and subtract within 20 on a number line', 'Use make-a-ten', 'Use doubles and near doubles', 'Solve story problems within 20'],
      periods: [
        { t: 'Number line', flow: [['10 min', 'Floor number line hops.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Practice.']] },
        { t: 'Strategies', flow: [['15 min', 'Explore panel 2: make a ten.'], ['15 min', 'Doubles song; near doubles.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Counting the start.', 'Stuck at 10.'],
      activities: ['Vegetable shop with counters.', 'Double-dice game.'],
      exit: ['7 + 6.', '16 − 9.', 'Double 8.'],
      homework: 'Count vegetables in your kitchen. Make two adding and two subtracting stories up to 20.'
    },

    slides: [
      { t: 'Vegetable Farm', b: ['Number line hops', 'Make a ten', 'Doubles'] },
      { t: 'Strategies', b: ['9 + 4 = 10 + 3', '6 + 7 = 6 + 6 + 1', '15 − 6: hop back'] },
      { t: 'Check yourself', b: ['8 + 7 = ?', '14 − 5 = ?'] }
    ],

    fs: { groups: [
        ['Adding to 20', [['Hop forward', '9 + 4 → 13'], ['Make a ten', '8 + 5 = 10 + 3'], ['Doubles', '5+5=10, 6+6=12, 7+7=14, 8+8=16, 9+9=18'], ['Near doubles', '7 + 8 = 15']]],
        ['Subtracting', [['Hop back', '15 − 6 → 9'], ['Through 10', '13 − 5 = 13 − 3 − 2'], ['Fact family', '8 + 5 = 13, 13 − 5 = 8']]],
        ['Words', [['In all / total', 'add'], ['Left', 'subtract'], ['How many more', 'subtract']]]],
      ex: [['9 + 6', '9 + 1 + 5 = 15'], ['17 − 8', '17 − 7 − 1 = 9']],
      rem: ['Make a ten first.', 'Know your doubles.', 'Check with the opposite operation.'] }
  });
})();
