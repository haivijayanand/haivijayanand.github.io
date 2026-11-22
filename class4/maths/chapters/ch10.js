/*
TOOL:    class4_maths_ch10
FAMILY:  CBSE_REVISION / Class 4 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 10 Elephants, Tigers and Leopards (big-number addition and subtraction, animal census, addition chart patterns, reverse-and-add, NIM game) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 10, part: 'All chapters', short: 'Big-number add and subtract', title: 'Elephants, Tigers and Leopards',
    blurb: 'Adding and subtracting large numbers using animal counts from wildlife census data, approximating totals, patterns in an addition chart, the reverse-and-add puzzle and the NIM game.',
    revise: {
      oneLine: 'Wildlife counts like tigers in Madhya Pradesh (785) or elephants in states (about 6 000 and 3 000) are added, compared and subtracted. Round to estimate totals. Puzzles: a 2-digit number plus its reverse is always 11 × (sum of digits).',
      sections: [
        { h: 'Census numbers', html: `<p>About 6 000 + 3 000 = 9 000 elephants. Difference between 785 and 563 tigers = 222.</p>` },
        { h: 'Patterns', html: `<p>Counting on by 25: 7 595, 7 620, 7 645, 7 670. Addition chart: moving one step right adds 1, one step down adds 10.</p>` },
        { h: 'Reverse and add', html: `<p>27 + 72 = 99 = 11 × 9. Which numbers make 55? 14 + 41, 23 + 32 (digits add to 5).</p>` }
      ],
      formulas: [['Estimate total', 'round, then add'], ['How many more', 'bigger − smaller'], ['ab + ba', '11 × (a + b)'], ['NIM (take 1-3)', 'leave a multiple of 4']],
      terms: [['Census', 'counting a population'], ['Approximately', 'about, rounded'], ['Reverse', 'digits in the opposite order']],
      traps: ['Exact vs approximate answers.', 'Lining up places with numbers of different lengths.'],
      bridge: '<p>Ch 14 shows census-like data in bar graphs.</p>'
    },
    explore: [
      { title: 'Reverse and add', intro: 'Choose a two-digit number; it is added to its reverse.',
        build(el, K) { let n = 27; const row = K.row(el); K.slider(row, 'number', 10, 99, 1, n, v => { n = v; draw(); }); const rd = K.read(el);
          function draw() { const a = Math.floor(n / 10), b = n % 10, r = 10 * b + a; rd.innerHTML = `<div style="font-size:24px">${n} + ${String(r).padStart(2, '0')} = <b>${n + r}</b></div>digits ${a} + ${b} = ${a + b} · 11 × ${a + b} = ${11 * (a + b)} ✔ · difference ${Math.max(n, r)} − ${Math.min(n, r)} = ${Math.abs(n - r)} = 9 × ${Math.abs(a - b)}`; } draw(); return null; } },
      { title: 'NIM: take 1, 2 or 3', intro: 'Twenty sticks. Take 1, 2 or 3; the computer replies. Whoever takes the last stick wins. Press <kbd>S</kbd> for the computer to move first.',
        build(el, K) { let n = 20, msg = 'your turn'; const row = K.row(el); const rd = K.read(el);
          function draw() { rd.innerHTML = `<div style="font-size:24px;letter-spacing:2px">${'🪵'.repeat(n)}</div>${n} left · ${msg} · tip: try to leave a multiple of 4`; }
          function cpu() { if (n === 0) return; const t = n % 4 || 1; n -= t; msg = n === 0 ? `computer took ${t} and wins` : `computer took ${t}; your turn`; draw(); }
          [1, 2, 3].forEach(t => K.button(row, `Take ${t}`, () => { if (n === 0 || t > n) return; n -= t; if (n === 0) { msg = 'you took the last stick and win!'; draw(); return; } cpu(); }));
          K.button(row, 'Restart', () => { n = 20; msg = 'your turn'; draw(); }); draw(); return { step: cpu, play() {}, pause() {} }; } }
    ],
    gens: [
      { title: 'Add census numbers', gen(R) { const a = R.int(300, 3000), b = R.int(300, 3000); const an = R.pick(['tigers', 'leopards', 'elephants']); return { q: `State A has ${a} ${an} and State B has ${b}. How many together?`, a: String(a + b), ans: a + b }; } },
      { title: 'How many more', gen(R) { const a = R.int(1000, 9000), b = R.int(100, a - 100); return { q: `A park has ${a} deer and ${b} sambar. How many more deer?`, a: String(a - b), ans: a - b }; } },
      { title: 'Estimate', levels: [2, 3], gen(R) { const a = R.int(1100, 6900), b = R.int(1100, 2900); const e = Math.round(a / 1000) * 1000 + Math.round(b / 1000) * 1000; return { q: `About how many: ${a} + ${b}? (nearest thousand)`, a: `about ${e} (exact ${a + b})`, ans: e, tol: 1000 }; } },
      { title: 'Count on pattern', gen(R) { const s = R.int(20, 90) * 100 + R.pick([0, 25, 50, 75]), d = R.pick([25, 50, 100, 250]); return { q: `${s}, ${s + d}, ${s + 2 * d}, __`, a: String(s + 3 * d), ans: s + 3 * d }; } },
      { title: 'Reverse and add', levels: [2, 3], gen(R) { const k = R.int(2, 9); return { q: `Find all 2-digit numbers that, added to their reverse, give ${11 * k}.`, a: Array.from({ length: k + 1 }, (_, a) => a).filter(a => a >= 1 && a <= 9 && k - a >= 1 && k - a <= 9).map(a => 10 * a + (k - a)).join(', ') }; } }
    ],
    quiz: [
      { q: 'About 6000 + 3000', o: ['9000', '3000', '6300', '90 000'], a: 0, e: 'Add thousands.' }, { q: '785 − 563', o: ['222', '322', '232', '1348'], a: 0, e: 'Subtract.' },
      { q: '27 + 72', o: ['99', '89', '109', '72'], a: 0, e: '11 × 9.' }, { q: 'Next: 7595, 7620, 7645, __', o: ['7670', '7650', '7700', '7665'], a: 0, e: '+25.' },
      { q: 'Addition chart: one step down adds', o: ['10', '1', '100', '0'], a: 0, e: 'Next row.' }, { q: '14 + 41', o: ['55', '45', '65', '54'], a: 0, e: '11 × 5.' },
      { q: 'NIM: leave your friend', o: ['a multiple of 4', 'an odd number', '1 stick', '3 sticks'], a: 0, e: 'Winning position.' }, { q: '3456 + 2544', o: ['6000', '5990', '6100', '5000'], a: 0, e: 'Pairs to 10.' },
      { q: '"Approximately" means', o: ['about', 'exactly', 'more than', 'less than'], a: 0, e: 'Rounded.' }, { q: '5000 − 2750', o: ['2250', '3250', '2350', '2750'], a: 0, e: 'Count up.' },
      { q: '63 − 36', o: ['27', '33', '99', '9'], a: 0, e: '9 × 3.' }
    ],
    teach: {
      outcomes: ['Add and subtract large numbers in context', 'Estimate totals', 'Explore number puzzles and patterns'],
      periods: [{ t: 'Census', flow: [['10 min', 'Animal census story.'], ['15 min', 'Add and compare counts.'], ['15 min', 'Explore panel 1.']] }, { t: 'Games', flow: [['15 min', 'Explore panel 2: NIM.'], ['15 min', 'Addition chart patterns.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Exact when asked approximate.', 'Misaligned places.'], activities: ['NIM with pebbles.', 'Make a state-wise animal table.'],
      exit: ['3478 + 1689.', 'Numbers giving 66 by reverse-add.', 'Strategy for NIM.'], homework: 'Play NIM at home and write how you win. Find the tiger count in your state and compare with a neighbour state.'
    },
    slides: [{ t: 'Elephants, Tigers and Leopards', b: ['Census numbers', 'Estimate totals', 'Reverse and add', 'NIM'] }, { t: 'Check yourself', b: ['About 4890 + 3120?', '38 + 83?'] }],
    fs: { groups: [['Census maths', [['Total', 'add'], ['How many more', 'subtract'], ['About', 'round first']]], ['Puzzles', [['ab + ba', '11 × (a + b)'], ['ab − ba', '9 × (a − b)'], ['NIM 1-3', 'leave 4, 8, 12, 16']]]],
      ex: [['6000 + 3000', '9000'], ['27 + 72', '99']], rem: ['Line up places.', 'Say "about" for estimates.', 'Look for patterns.'] }
  });
})();
