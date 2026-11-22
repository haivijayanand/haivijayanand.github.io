/*
TOOL:    class3_maths_ch07
FAMILY:  CBSE_REVISION / Class 3 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 7 Raksha Bandhan (multiplication) - revise, 2 explore panels (arrays of rakhis, times-table builder), 6 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 7, part: 'All chapters', short: 'Multiplication', title: 'Raksha Bandhan',
    blurb: 'Equal groups and arrays, the × sign, multiplication as repeated addition, tables of 2, 3, 4, 5 and 10, turn-around facts.',
    revise: {
      oneLine: 'Multiplication is a quick way to add equal groups: 4 sisters each tie 3 rakhis → 4 × 3 = 3 + 3 + 3 + 3 = 12. An array shows it as rows and columns, and turning it round shows 4 × 3 = 3 × 4.',
      sections: [
        { h: 'Equal groups', html: `<p>4 groups of 3 = 4 × 3 = 12. "×" is read "times".</p>` },
        { h: 'Arrays', html: `<p>Rows × columns: 3 rows of 5 sweets = 15. Turned round: 5 rows of 3 = 15.</p>` },
        { h: 'Tables', html: `<p>×2 doubles; ×5 ends in 0 or 5; ×10 adds a 0; × 1 keeps the number; × 0 gives 0.</p>` }
      ],
      formulas: [['a × b', 'a groups of b'], ['Turn-around', 'a × b = b × a'], ['× 1', 'same number'], ['× 0', '0'], ['× 10', 'add a zero']],
      terms: [['Multiply', 'add equal groups'], ['Array', 'objects in rows and columns'], ['Product', 'answer of multiplying']],
      traps: ['Adding the two numbers instead of multiplying.', 'Groups must be equal.', '× 0 is 0, not the number.'],
      bridge: '<p>Ch 10 (division) undoes multiplication.</p>'
    },
    explore: [
      { title: 'Arrays of rakhis', intro: 'Choose rows and columns. Press Turn to swap them — the total stays the same.',
        build(el, K) { let r = 3, c = 5; const row = K.row(el); K.slider(row, 'rows', 1, 8, 1, r, v => { r = v; draw(); }); K.slider(row, 'in each row', 1, 10, 1, c, v => { c = v; draw(); }); K.button(row, 'Turn', () => { [r, c] = [c, r]; draw(); }); const rd = K.read(el);
          function draw() { rd.innerHTML = `<div style="font-size:22px;line-height:1.3">${Array.from({ length: r }, () => '🎀'.repeat(c)).join('<br>')}</div>${r} rows of ${c} = ${r} × ${c} = ${Array(r).fill(c).join(' + ')} = <b>${r * c}</b> · turn-around: ${c} × ${r} = ${r * c}`; }
          draw(); return null; } },
      { title: 'Build a times table', intro: 'Choose a table; press <kbd>S</kbd> to add one more group each time.',
        build(el, K) { let t = 3; const row = K.row(el); K.slider(row, 'table of', 2, 10, 1, t, v => { t = v; an.reset(); }); const rd = K.read(el); const an = new K.Anim(10, () => draw(), { ms: 500 });
          function draw() { rd.innerHTML = Array.from({ length: an.i }, (_, i) => `${t} × ${i + 1} = <b>${t * (i + 1)}</b>`).join('<br>') || 'Press S.'; } K.anim(el, an); draw(); return an; } }
    ],
    gens: [
      { title: 'Equal groups', gen(R) { const g = R.int(2, 6), n = R.int(2, 5); return { q: `${g} sisters each tie ${n} rakhis. How many rakhis? Write as ×.`, a: `${g} × ${n} = ${g * n}`, ans: g * n }; } },
      { title: 'Multiplication facts', gen(R, L) { const a = R.pick(L === 1 ? [2, 5, 10] : [2, 3, 4, 5, 10]), b = R.int(0, 10); return { q: `${a} × ${b} = ?`, a: String(a * b), ans: a * b }; } },
      { title: 'Repeated addition', gen(R) { const n = R.int(2, 9), k = R.int(2, 5); return { q: `Write ${Array(k).fill(n).join(' + ')} as multiplication and find it.`, a: `${k} × ${n} = ${k * n}`, ans: k * n }; } },
      { title: 'Arrays', levels: [2, 3], gen(R) { const r = R.int(2, 6), c = R.int(2, 8); return { q: `Sweets are arranged in ${r} rows of ${c}. How many sweets?`, a: String(r * c), ans: r * c }; } },
      { title: 'Turn-around', levels: [2, 3], gen(R) { const a = R.int(2, 10), b = R.int(2, 10); return { q: `${a} × ${b} = ${a * b}. What is ${b} × ${a}?`, a: String(a * b), ans: a * b }; } },
      { title: 'Word problems', levels: [3], gen(R) { const items = [[R.int(3, 9), 'packets', 5, 'sweets'], [R.int(2, 8), 'bikes', 2, 'wheels'], [R.int(2, 6), 'autos', 3, 'wheels'], [R.int(2, 9), 'tables', 4, 'legs']]; const [n, a, k, b] = R.pick(items); return { q: `How many ${b} on ${n} ${a} if each has ${k}?`, a: String(n * k), ans: n * k }; } }
    ],
    quiz: [
      { q: '4 × 3 =', o: ['12', '7', '43', '1'], a: 0, e: '3 + 3 + 3 + 3.' }, { q: '5 × 6 =', o: ['30', '11', '56', '25'], a: 0, e: 'Count by 5s.' },
      { q: '7 × 0 =', o: ['0', '7', '70', '1'], a: 0, e: 'Zero groups.' }, { q: '10 × 8 =', o: ['80', '18', '108', '8'], a: 0, e: 'Add a zero.' },
      { q: '3 rows of 4', o: ['12', '7', '34', '9'], a: 0, e: 'Array.' }, { q: 'If 6 × 4 = 24, then 4 × 6 =', o: ['24', '10', '46', '20'], a: 0, e: 'Turn-around.' },
      { q: '2 + 2 + 2 + 2 + 2 as ×', o: ['5 × 2', '2 × 2', '5 + 2', '10 × 5'], a: 0, e: 'Five twos.' }, { q: 'Wheels on 3 autos', o: ['9', '6', '12', '3'], a: 0, e: '3 × 3.' },
      { q: '9 × 1 =', o: ['9', '1', '10', '0'], a: 0, e: 'One group.' }, { q: 'Legs on 5 tables', o: ['20', '9', '25', '15'], a: 0, e: '5 × 4.' },
      { q: '× is read', o: ['times', 'plus', 'minus', 'equals'], a: 0, e: 'Times.' }
    ],
    teach: {
      outcomes: ['Use × for equal groups and arrays', 'Know tables of 2, 3, 4, 5, 10', 'Use turn-around, ×1 and ×0'],
      periods: [{ t: 'Equal groups', flow: [['10 min', 'Raksha Bandhan story.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Arrays with counters.']] }, { t: 'Tables', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Table games.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Add instead of multiply.', '×0 = number.'], activities: ['Egg-tray arrays.', 'Skip-counting relay.'],
      exit: ['6 × 5.', 'Draw 3 × 4 as an array.', '8 × 0.'], homework: 'Find 3 arrays at home (window panes, tiles, egg trays) and write the multiplication.'
    },
    slides: [{ t: 'Raksha Bandhan', b: ['Equal groups', 'Arrays', 'Tables', 'Turn-around'] }, { t: 'Check yourself', b: ['4 × 5?', '3 × 7 = 7 × ?'] }],
    fs: { groups: [['Meaning', [['a × b', 'a groups of b'], ['Array', 'rows × columns'], ['Repeated addition', '3 + 3 + 3 + 3 = 4 × 3']]], ['Rules', [['Turn-around', 'a × b = b × a'], ['× 1', 'same'], ['× 0', '0'], ['× 10', 'add 0']]], ['Tables', [['× 2', '2, 4, 6, 8, 10, …'], ['× 5', '5, 10, 15, 20, …'], ['× 3, × 4', '3, 6, 9 … / 4, 8, 12 …']]]],
      ex: [['5 packets of 4', '20'], ['6 × 3', '18']], rem: ['Groups must be equal.', 'Use arrays to check.', 'Turn around to make it easier.'] }
  });
})();
