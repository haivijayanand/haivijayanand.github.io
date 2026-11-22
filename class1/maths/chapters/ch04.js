/*
TOOL:    class1_maths_ch04
FAMILY:  CBSE_REVISION / Class 1 Maths (Joyful Mathematics)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 4 Making 10 (zero, ten, numbers to 20) - revise, 2 explore panels (ten-frame, ten and ones), 6 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const tf = (n, col = '🔴') => { let h = '<span style="display:inline-grid;grid-template-columns:repeat(5,30px);gap:3px;border:2px solid currentColor;padding:4px;border-radius:6px;vertical-align:middle">'; for (let i = 0; i < 10; i++) h += `<span style="text-align:center;font-size:20px;border:1px solid var(--rule,#cbd5e1)">${i < n ? col : '&nbsp;'}</span>`; return h + '</span>'; };

  G9.register({
    no: 4, part: 'All chapters', short: 'Making 10', title: 'Making 10',
    blurb: 'Zero, ten as a group, pairs that make 10, numbers 11 to 20 as ten and some more, using ten-frames.',
    revise: {
      oneLine: 'Zero means none. Ten ones make one ten. Pairs like 6 and 4 make 10, and numbers from 11 to 20 are "ten and some more": 14 is one ten and 4 ones.',
      sections: [
        { h: 'Zero', html: `<p>0 means nothing is there. An empty plate has 0 laddoos. 0 comes just before 1.</p>` },
        { h: 'Making 10', html: `<p>A ten-frame has 10 boxes. 1 + 9, 2 + 8, 3 + 7, 4 + 6, 5 + 5 all make 10.</p>` },
        { h: 'Ten and more', html: `<p>11 = 10 + 1, 12 = 10 + 2, … 19 = 10 + 9, 20 = two tens. In 15, the 1 means one ten and the 5 means five ones.</p>` }
      ],
      formulas: [['0', 'none'], ['10', '1 ten = 10 ones'], ['Pairs for 10', '1+9, 2+8, 3+7, 4+6, 5+5'], ['11 to 19', '1 ten and some ones'], ['20', '2 tens']],
      terms: [['Zero', 'nothing'], ['Ten', 'a group of 10'], ['Ones', 'single things'], ['Ten-frame', '2 rows of 5 boxes']],
      traps: ['Writing 14 as 41.', 'Thinking 0 is the same as the letter O.', 'Counting a full ten-frame one by one instead of seeing 10.'],
      bridge: '<p>Ch 6 adds and subtracts up to 20; Ch 8 goes to 99 with tens and ones.</p>'
    },

    explore: [
      {
        title: 'Fill the ten-frame', intro: 'Set how many red counters. The empty boxes show how many more make 10.',
        build(el, K) {
          let n = 6; const row = K.row(el); K.slider(row, 'red counters', 0, 10, 1, n, v => { n = v; draw(); }); const rd = K.read(el);
          function draw() { rd.innerHTML = `${tf(n)}<br><br><b>${n}</b> and <b>${10 - n}</b> make 10 · ${n} + ${10 - n} = 10${n === 0 ? ' (zero: the frame is empty)' : ''}`; }
          draw(); return null;
        }
      },
      {
        title: 'Ten and some more', intro: 'Choose a number from 10 to 20. It is shown as one full ten-frame and some ones.',
        build(el, K) {
          let n = 14; const row = K.row(el); K.slider(row, 'number', 10, 20, 1, n, v => { n = v; draw(); }); const rd = K.read(el);
          function draw() { const t = Math.floor(n / 10), o = n % 10; rd.innerHTML = `${tf(10, '🔵')} ${n === 20 ? tf(10, '🔵') : tf(o)}<br><br><b>${n}</b> = ${t} ten${t > 1 ? 's' : ''}${o ? ` and ${o} one${o > 1 ? 's' : ''}` : ''} = ${t * 10} + ${o}`; }
          draw(); return null;
        }
      }
    ],

    gens: [
      { title: 'How many more make 10?', gen(R) {
          const n = R.int(1, 9); return { q: `I have ${n}. How many more make 10? ${'🔴'.repeat(n)}`, a: String(10 - n), ans: 10 - n };
        } },
      { title: 'Zero', levels: [1], gen(R) {
          const items = [['How many legs does a fish have?', '0'], ['A plate had 3 laddoos. All 3 were eaten. How many are left?', '0'], ['What comes just before 1?', '0']];
          const [q, a] = R.pick(items); return { q, a, ans: 0 };
        } },
      { title: 'Ten and ones', gen(R) {
          const n = R.int(11, 19); return R.chance(.5) ? { q: `${n} = 1 ten and how many ones?`, a: String(n - 10), ans: n - 10 } : { q: `1 ten and ${n - 10} ones make which number?`, a: String(n), ans: n };
        } },
      { title: 'Count to 20', gen(R) {
          const n = R.int(10, 20), e = R.pick(['🌟', '🍬', '🐞']); return { q: `How many? ${e.repeat(n)}`, a: String(n), ans: n, s: 'make a group of 10 first' };
        } },
      { title: 'Before and after (to 20)', levels: [2, 3], gen(R) {
          const n = R.int(11, 19); return R.chance(.5) ? { q: `What comes just after ${n}?`, a: String(n + 1), ans: n + 1 } : { q: `What comes just before ${n}?`, a: String(n - 1), ans: n - 1 };
        } },
      { title: 'Pairs that make 10', levels: [2, 3], gen(R) {
          const a = R.int(0, 10); return { q: `${a} + __ = 10`, a: String(10 - a), ans: 10 - a };
        } }
    ],

    quiz: [
      { q: 'How many more make 10? 🔴🔴🔴🔴🔴🔴🔴', o: ['3', '7', '4', '2'], a: 0, e: '7 + 3.' },
      { q: '0 means', o: ['none', 'one', 'ten', 'many'], a: 0, e: 'Nothing.' },
      { q: '15 = 1 ten and', o: ['5 ones', '1 one', '15 ones', '50 ones'], a: 0, e: '10 + 5.' },
      { q: '10 ones make', o: ['1 ten', '10 tens', '1 one', '0'], a: 0, e: 'A group of ten.' },
      { q: '6 + __ = 10', o: ['4', '5', '6', '3'], a: 0, e: 'Pair.' },
      { q: 'What comes after 19?', o: ['20', '18', '21', '10'], a: 0, e: 'Two tens.' },
      { q: '1 ten and 7 ones', o: ['17', '71', '8', '7'], a: 0, e: '10 + 7.' },
      { q: 'A ten-frame has how many boxes?', o: ['10', '5', '20', '9'], a: 0, e: 'Two rows of five.' },
      { q: 'What comes before 1?', o: ['0', '2', '10', '11'], a: 0, e: 'Zero.' },
      { q: '5 + 5 =', o: ['10', '55', '9', '11'], a: 0, e: 'Double five.' },
      { q: '20 is', o: ['2 tens', '20 tens', '1 ten', '2 ones'], a: 0, e: 'Two tens.' }
    ],

    teach: {
      outcomes: ['Understand zero', 'Make 10 in different ways', 'See 11–20 as ten and some ones', 'Count up to 20'],
      periods: [
        { t: 'Zero and ten', flow: [['10 min', 'Empty plate story for zero.'], ['15 min', 'Explore panel 1: ten-frame pairs.'], ['15 min', 'Finger pairs for 10.']] },
        { t: 'Up to 20', flow: [['15 min', 'Bundle 10 sticks with a rubber band.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Writing 41 for 14.', 'Zero = nothing to write.'],
      activities: ['Bundle sticks into tens.', 'Ten-frame bingo.'],
      exit: ['Show 10 with two hands.', '7 and __ make 10.', 'Show 13 with a bundle and sticks.'],
      homework: 'Make bundles of 10 with ice-cream sticks or straws. Show 16 to your family.'
    },

    slides: [
      { t: 'Making 10', b: ['Zero', 'Pairs that make 10', 'Ten and some more'] },
      { t: 'Pairs for 10', b: ['1 + 9, 2 + 8', '3 + 7, 4 + 6', '5 + 5'] },
      { t: 'Check yourself', b: ['8 and __ make 10?', '12 = 1 ten and __ ones?'] }
    ],

    fs: { groups: [
        ['Zero and ten', [['0', 'none'], ['10', 'one ten'], ['Ten-frame', '2 rows of 5']]],
        ['Pairs that make 10', [['1 + 9', '9 + 1'], ['2 + 8', '8 + 2'], ['3 + 7', '7 + 3'], ['4 + 6', '6 + 4'], ['5 + 5', 'double 5']]],
        ['11 to 20', [['11', '10 + 1'], ['15', '10 + 5'], ['19', '10 + 9'], ['20', '2 tens']]]],
      ex: [['🔴🔴🔴🔴', '4 + 6 = 10'], ['17', '1 ten and 7 ones']],
      rem: ['Make a ten first, then count on.', 'Tens digit on the left.', 'Zero means none.'] }
  });
})();
