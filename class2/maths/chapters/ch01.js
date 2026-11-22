/*
TOOL:    class2_maths_ch01
FAMILY:  CBSE_REVISION / Class 2 Maths (Joyful Mathematics)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 1 A Day at the Beach (counting in groups) - revise, 2 explore panels (shells in groups, skip-count hops), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 1, part: 'All chapters', short: 'Counting in groups', title: 'A Day at the Beach',
    blurb: 'Counting many things quickly by making groups of 2, 5 and 10; skip counting; estimating.',
    revise: {
      oneLine: 'Counting one by one is slow. Make groups of 2, 5 or 10 and skip count: 4 groups of 5 shells are 5, 10, 15, 20. Groups of ten make big counts easy.',
      sections: [
        { h: 'Groups', html: `<p>🐚🐚 🐚🐚 🐚🐚 → count 2, 4, 6. Equal groups help us count fast.</p>` },
        { h: 'Skip counting', html: `<p>By 2s: 2, 4, 6, … 20. By 5s: 5, 10, 15, … 50. By 10s: 10, 20, … 100.</p>` },
        { h: 'Estimate', html: `<p>Guess first, then count. A good guess is close to the real count.</p>` }
      ],
      formulas: [['By 2s', '2, 4, 6, 8, 10'], ['By 5s', '5, 10, 15, 20'], ['By 10s', '10, 20, 30, 40'], ['Groups and left over', '3 tens and 4 = 34']],
      terms: [['Group', 'things put together'], ['Skip count', 'jump by the same number'], ['Estimate', 'a sensible guess']],
      traps: ['Groups must have the same number.', 'Do not forget the left-over ones.', 'Count each group only once.'],
      bridge: '<p>Groups of ten lead to place value in Ch 3.</p>'
    },
    explore: [
      { title: 'Shells in groups', intro: 'Choose the group size. The shells are circled in groups; skip count to find the total.',
        build(el, K) {
          let g = 5, n = 23; const row = K.row(el); K.select(row, 'group of', ['2', '5', '10'], i => { g = [2, 5, 10][i]; draw(); }); const sel = row.querySelector('select'); if (sel) sel.value = 1; K.slider(row, 'shells', 5, 50, 1, n, v => { n = v; draw(); }); const rd = K.read(el);
          function draw() { const full = Math.floor(n / g), left = n % g; rd.innerHTML = `<div style="font-size:22px">${Array.from({ length: full }, () => `<span style="display:inline-block;border:2px dashed var(--orange,#ea580c);border-radius:12px;padding:0 4px;margin:2px">${'🐚'.repeat(g)}</span>`).join('')} ${'🐚'.repeat(left)}</div>${full} groups of ${g} and ${left} more · skip count ${Array.from({ length: full }, (_, i) => g * (i + 1)).join(', ')}${left ? ` then count on ${left}` : ''} → <b>${n}</b>`; }
          draw(); return null; } },
      { title: 'Skip-count hops', intro: 'Choose the jump. Press <kbd>S</kbd> for each hop of the crab.',
        build(el, K) {
          let d = 5; const row = K.row(el); K.select(row, 'jump', ['2', '5', '10'], i => { d = [2, 5, 10][i]; an.reset(); });
          const b = new K.Board(el, { xmin: -3, xmax: 103, ymin: -3, ymax: 5, axes: false, grid: 0, equal: false, aspect: 0.2 }); const rd = K.read(el); const an = new K.Anim(10, () => b.redraw(), { ms: 500 });
          b.onDraw = () => { b.clear(); b.line(0, 0, 100, 0, { color: C.ink, w: 2 }); for (let i = 0; i <= 100; i += 10) b.text(i, -2, String(i), { font: '12px' }); const k = Math.min(an.i, Math.floor(100 / d));
            for (let j = 1; j <= k; j++) b.arc(d * (j - 0.5), 0, d / 2, 0, Math.PI, { color: C.orange, w: 2 }); b.text(d * k, 3, '🦀', { font: '22px' }); rd.innerHTML = `hops: ${Array.from({ length: k }, (_, j) => d * (j + 1)).join(', ') || '0'}`; };
          K.anim(el, an); b.redraw(); return an; } }
    ],
    gens: [
      { title: 'Count the groups', gen(R) { const g = R.pick([2, 5, 10]), k = R.int(2, 6); return { q: `${k} groups of ${g} shells. How many shells?`, a: String(g * k), ans: g * k, s: `skip count by ${g}` }; } },
      { title: 'Skip counting', gen(R) { const d = R.pick([2, 5, 10]), s = d * R.int(1, 5), k = R.int(1, 3); const seq = Array.from({ length: 5 }, (_, i) => s + d * i); return { q: `Fill in: ${seq.map((v, i) => i === k ? '__' : v).join(', ')}`, a: String(seq[k]), ans: seq[k] }; } },
      { title: 'Tens and ones', gen(R) { const t = R.int(1, 9), o = R.int(0, 9); return { q: `${t} groups of ten and ${o} more. How many?`, a: String(10 * t + o), ans: 10 * t + o }; } },
      { title: 'Groups and left over', levels: [2, 3], gen(R) { const n = R.int(11, 49), g = R.pick([5, 10]); return { q: `Put ${n} shells in groups of ${g}. How many full groups and how many left over?`, a: `${Math.floor(n / g)} groups, ${n % g} left`, ans: Math.floor(n / g) }; } },
      { title: 'Count by 2s', levels: [1, 2], gen(R) { const p = R.int(3, 12); return { q: `How many eyes do ${p} children have?`, a: String(2 * p), ans: 2 * p, s: 'count by 2s' }; } }
    ],
    quiz: [
      { q: '5, 10, 15, __', o: ['20', '16', '25', '30'], a: 0, e: 'By 5s.' }, { q: '4 groups of 10', o: ['40', '14', '410', '10'], a: 0, e: '10, 20, 30, 40.' },
      { q: '2, 4, 6, __', o: ['8', '7', '10', '12'], a: 0, e: 'By 2s.' }, { q: '3 tens and 5 ones', o: ['35', '53', '8', '305'], a: 0, e: '30 + 5.' },
      { q: 'Legs on 5 birds', o: ['10', '5', '7', '15'], a: 0, e: '2 each.' }, { q: 'Fingers on 4 hands', o: ['20', '9', '16', '40'], a: 0, e: 'By 5s.' },
      { q: '23 = __ tens and 3 ones', o: ['2', '3', '23', '20'], a: 0, e: 'Two tens.' }, { q: 'Why make groups?', o: ['to count faster', 'to lose some', 'to colour', 'no reason'], a: 0, e: 'Skip count.' },
      { q: '10, 20, 30, __, 50', o: ['40', '35', '45', '60'], a: 0, e: 'By 10s.' }, { q: '6 groups of 5', o: ['30', '11', '65', '25'], a: 0, e: '5, …, 30.' },
      { q: 'A good estimate is', o: ['close to the real count', 'any number', 'always 100', 'zero'], a: 0, e: 'Sensible guess.' }
    ],
    teach: {
      outcomes: ['Count large collections by grouping', 'Skip count by 2s, 5s and 10s', 'Estimate and check'],
      periods: [{ t: 'Grouping', flow: [['10 min', 'Beach story; count shells (beans).'], ['15 min', 'Explore panel 1.'], ['15 min', 'Group and skip count.']] }, { t: 'Skip counting', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Estimate jars of beans.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Unequal groups.', 'Left-overs forgotten.'], activities: ['Bean-counting in cups of 10.', 'Clap-skip counting.'],
      exit: ['Count by 5s to 40.', 'How many in 7 tens?', 'Group 18 in fives.'], homework: 'Collect 30–50 small things at home, group them in tens and write how many.'
    },
    slides: [{ t: 'A Day at the Beach', b: ['Counting in groups', 'Skip counting 2s, 5s, 10s', 'Estimating'] }, { t: 'Check yourself', b: ['5 groups of 5?', '10, 20, __?'] }],
    fs: { groups: [['Skip counting', [['by 2s', '2, 4, 6, 8, 10, 12'], ['by 5s', '5, 10, 15, 20, 25'], ['by 10s', '10, 20, 30, 40, 50']]], ['Groups', [['Equal groups', 'same number in each'], ['Left over', 'count on at the end'], ['Tens', '3 tens and 4 = 34']]]],
      ex: [['4 groups of 5', '20'], ['27 in tens', '2 tens and 7']], rem: ['Make equal groups.', 'Skip count, then count on.', 'Estimate first.'] }
  });
})();
