/*
TOOL:    class1_maths_ch05
FAMILY:  CBSE_REVISION / Class 1 Maths (Joyful Mathematics)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 5 How Many? (adding and taking away within 9) - revise, 2 explore panels (put together, take away), 6 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;

  G9.register({
    no: 5, part: 'All chapters', short: 'How many?', title: 'How Many?',
    blurb: 'Adding by putting groups together and subtracting by taking away, with totals up to 9; the signs +, − and =.',
    revise: {
      oneLine: 'Adding means putting together: 3 birds and 2 more birds make 5 birds, 3 + 2 = 5. Subtracting means taking away: 5 birds, 2 fly away, 3 are left, 5 − 2 = 3.',
      sections: [
        { h: 'Putting together', html: `<p>🐦🐦🐦 + 🐦🐦 = 🐦🐦🐦🐦🐦 → 3 + 2 = 5. Start with the bigger number and count on: 5 … 6, 7 for 5 + 2.</p><p>Order does not matter: 3 + 2 = 2 + 3.</p>` },
        { h: 'Taking away', html: `<p>7 balloons, 3 burst: 7 − 3 = 4. Count back: 7 … 6, 5, 4.</p>` },
        { h: 'Signs', html: `<p>+ plus (add) · − minus (take away) · = equals (is the same as).</p>` }
      ],
      formulas: [['Add', 'put together'], ['Subtract', 'take away'], ['Count on', 'start at the bigger number'], ['Count back', 'for taking away'], ['Turn-around', '3 + 2 = 2 + 3'], ['Adding 0', '4 + 0 = 4']],
      terms: [['Plus +', 'add'], ['Minus −', 'take away'], ['Equals =', 'is the same as'], ['Sum', 'answer of adding']],
      traps: ['Counting the starting number again when counting on.', 'Taking away the bigger number from the smaller.', 'Writing = before finishing the sum.'],
      bridge: '<p>Ch 6 adds and subtracts up to 20.</p>'
    },

    explore: [
      {
        title: 'Put together', intro: 'Choose two groups. Press <kbd>S</kbd> to join them and count all.',
        build(el, K) {
          let a = 3, b = 2; const row = K.row(el); K.slider(row, 'first', 0, 5, 1, a, v => { a = v; an.reset(); }); K.slider(row, 'second', 0, 4, 1, b, v => { b = v; an.reset(); });
          const rd = K.read(el); const an = new K.Anim(1, () => draw(), { ms: 800 });
          function draw() { const j = an.i >= 1; rd.innerHTML = `<div style="font-size:40px">${'🐦'.repeat(a)}${j ? '' : ' &nbsp; + &nbsp; '}${'🐤'.repeat(b)}</div>${j ? `${a} + ${b} = <b>${a + b}</b> birds` : `${a} + ${b} = ? (press S)`}`; }
          K.anim(el, an); draw(); return an;
        }
      },
      {
        title: 'Take away', intro: 'Start with some balloons. Press <kbd>S</kbd> to burst one at a time.',
        build(el, K) {
          let n = 7, t = 3; const row = K.row(el); K.slider(row, 'balloons', 1, 9, 1, n, v => { n = v; t = Math.min(t, n); an.reset(); }); K.slider(row, 'burst', 0, 9, 1, t, v => { t = Math.min(v, n); an.reset(); });
          const rd = K.read(el); const an = new K.Anim(9, () => draw(), { ms: 600 });
          function draw() { const k = Math.min(an.i, t); rd.innerHTML = `<div style="font-size:40px">${'🎈'.repeat(n - k)}${'💥'.repeat(k)}</div>${n} − ${k} = <b>${n - k}</b>${k === t ? ` · ${n} − ${t} = ${n - t} balloons are left` : ''}`; }
          K.anim(el, an); draw(); return an;
        }
      }
    ],

    gens: [
      { title: 'Add with pictures', gen(R) {
          const a = R.int(1, 5), b = R.int(1, 9 - a), e = R.pick(['🍎', '🐟', '⭐', '🧁']); return { q: `${e.repeat(a)} + ${e.repeat(b)} = ?`, a: `${a} + ${b} = ${a + b}`, ans: a + b };
        } },
      { title: 'Take away with pictures', gen(R) {
          const a = R.int(3, 9), b = R.int(1, a), e = R.pick(['🎈', '🍪', '🐠', '🌸']); return { q: `There are ${e.repeat(a)}. ${b} go away. How many are left?`, a: `${a} − ${b} = ${a - b}`, ans: a - b };
        } },
      { title: 'Add', gen(R) {
          const a = R.int(0, 9), b = R.int(0, 9 - a); return { q: `${a} + ${b} = ?`, a: String(a + b), ans: a + b };
        } },
      { title: 'Subtract', gen(R) {
          const a = R.int(1, 9), b = R.int(0, a); return { q: `${a} − ${b} = ?`, a: String(a - b), ans: a - b };
        } },
      { title: 'Story sums', levels: [2, 3], gen(R) {
          const a = R.int(2, 6), b = R.int(1, 9 - a); return R.chance(.5) ? { q: `Meena has ${a} pencils. Ravi gives her ${b} more. How many pencils does she have now?`, a: String(a + b), ans: a + b } : { q: `There are ${a + b} birds on a tree. ${b} fly away. How many are left?`, a: String(a), ans: a };
        } },
      { title: 'Missing number', levels: [3], gen(R) {
          const a = R.int(1, 6), b = R.int(1, 9 - a); return { q: `${a} + __ = ${a + b}`, a: String(b), ans: b };
        } }
    ],

    quiz: [
      { q: '3 + 2 =', o: ['5', '1', '6', '32'], a: 0, e: 'Count on 4, 5.' },
      { q: '7 − 3 =', o: ['4', '10', '3', '5'], a: 0, e: 'Count back 6, 5, 4.' },
      { q: '🍎🍎🍎🍎 + 🍎🍎 =', o: ['6', '5', '7', '2'], a: 0, e: '4 + 2.' },
      { q: '5 + 0 =', o: ['5', '0', '50', '6'], a: 0, e: 'Adding nothing.' },
      { q: '9 − 9 =', o: ['0', '9', '18', '1'], a: 0, e: 'All taken away.' },
      { q: '2 + 6 is the same as', o: ['6 + 2', '6 − 2', '2 − 6', '8 − 2'], a: 0, e: 'Turn-around.' },
      { q: 'The sign for take away', o: ['−', '+', '=', '×'], a: 0, e: 'Minus.' },
      { q: '4 + __ = 9', o: ['5', '4', '13', '3'], a: 0, e: '4 + 5 = 9.' },
      { q: '8 birds, 2 fly away. Left?', o: ['6', '10', '2', '8'], a: 0, e: '8 − 2.' },
      { q: '1 + 1 + 1 =', o: ['3', '1', '111', '2'], a: 0, e: 'Three ones.' },
      { q: '= means', o: ['is the same as', 'add', 'take away', 'more'], a: 0, e: 'Equals.' }
    ],

    teach: {
      outcomes: ['Add by putting together and counting on', 'Subtract by taking away and counting back', 'Use +, − and =', 'Solve simple story sums within 9'],
      periods: [
        { t: 'Adding', flow: [['10 min', 'Children join groups in class.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Count on with fingers.']] },
        { t: 'Taking away', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Story sums acted out.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Counting the start number again.', 'Smaller minus bigger.'],
      activities: ['Bus game: children get on and off.', 'Dominoes: add the two sides.'],
      exit: ['4 + 3.', '9 − 5.', 'Tell a story for 6 − 2.'],
      homework: 'Make up two adding stories and two taking-away stories about things at home.'
    },

    slides: [
      { t: 'How Many?', b: ['Putting together (+)', 'Taking away (−)', 'Equals (=)'] },
      { t: 'Tricks', b: ['Count on from the bigger number', 'Count back to take away', '3 + 2 = 2 + 3'] },
      { t: 'Check yourself', b: ['5 + 3 = ?', '8 − 4 = ?'] }
    ],

    fs: { groups: [
        ['Adding', [['Put together', '3 + 2 = 5'], ['Count on', '5 … 6, 7'], ['Turn-around', '2 + 3 = 3 + 2'], ['Add 0', 'same number']]],
        ['Subtracting', [['Take away', '7 − 3 = 4'], ['Count back', '7 … 6, 5, 4'], ['Take away 0', 'same number'], ['Take away all', '0']]],
        ['Signs', [['+', 'plus'], ['−', 'minus'], ['=', 'equals']]]],
      ex: [['🐦🐦🐦 + 🐦🐦', '3 + 2 = 5'], ['🎈🎈🎈🎈🎈🎈, 2 burst', '6 − 2 = 4']],
      rem: ['Start with the bigger number.', 'Check: is the answer sensible?', 'Use fingers or counters.'] }
  });
})();
