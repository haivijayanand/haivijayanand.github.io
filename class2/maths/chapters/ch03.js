/*
TOOL:    class2_maths_ch03
FAMILY:  CBSE_REVISION / Class 2 Maths (Joyful Mathematics)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 3 Fun with Numbers (numbers to 100) - revise, 2 explore panels (place-value blocks, number line jumps of 10), 6 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'], TENS = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'], TEEN = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const name = (n) => n === 100 ? 'one hundred' : n < 10 ? ONES[n] : n < 20 ? TEEN[n - 10] : TENS[Math.floor(n / 10)] + (n % 10 ? '-' + ONES[n % 10] : '');
  G9.register({
    no: 3, part: 'All chapters', short: 'Numbers to 100', title: 'Fun with Numbers',
    blurb: 'Numbers up to 100: tens and ones, number names, expanded form, before/after/between, comparing and ordering, even and odd.',
    revise: {
      oneLine: 'A two-digit number is tens and ones: 68 = 6 tens + 8 ones = 60 + 8. Compare tens first. Ten tens make one hundred. Even numbers end in 0, 2, 4, 6, 8.',
      sections: [
        { h: 'Place value', html: `<p>68: 6 is in the tens place (60), 8 in the ones place (8). Expanded form 68 = 60 + 8.</p>` },
        { h: 'Order and compare', html: `<p>Just before 70 is 69; just after 70 is 71. 54 &gt; 45; 72 &lt; 76.</p>` },
        { h: 'Even and odd', html: `<p>Even numbers can be put in pairs with none left: 2, 4, 6, 8, 10 … Odd numbers have one left over: 1, 3, 5, 7, 9 …</p>` },
        { h: '100', html: `<p>10 tens = 100. After 99 comes 100 (one hundred).</p>` }
      ],
      formulas: [['Tens and ones', '68 = 6 tens 8 ones'], ['Expanded', '68 = 60 + 8'], ['Compare', 'tens first'], ['Even', 'ends in 0, 2, 4, 6, 8'], ['100', '10 tens']],
      terms: [['Place value', 'value of a digit by its place'], ['Expanded form', 'tens + ones'], ['Even', 'pairs with none left'], ['Odd', 'one left over']],
      traps: ['86 and 68 are different.', 'Compare tens before ones.', '0 ones still matter: 70 ≠ 7.'],
      bridge: '<p>Ch 6 adds and subtracts these numbers.</p>'
    },
    explore: [
      { title: 'Place-value blocks', intro: 'Choose a number; it is shown as ten-rods and unit cubes.',
        build(el, K) { let n = 68; const row = K.row(el); K.slider(row, 'number', 1, 100, 1, n, v => { n = v; draw(); }); const rd = K.read(el);
          function draw() { const t = Math.floor(n / 10), o = n % 10; const rod = '<span style="display:inline-block;width:14px;height:110px;margin:2px;background:repeating-linear-gradient(var(--blue,#1d4ed8) 0 10px,#fff 10px 11px);border:1px solid var(--blue,#1d4ed8)"></span>', cube = '<span style="display:inline-block;width:12px;height:12px;margin:1px;background:var(--orange,#ea580c)"></span>';
            rd.innerHTML = `<div style="display:flex;align-items:flex-end;gap:12px;flex-wrap:wrap"><div>${rod.repeat(t)}</div><div style="width:70px">${cube.repeat(o)}</div></div><b>${n}</b> = ${t} tens and ${o} ones = ${t * 10} + ${o} · <i>${name(n)}</i> · ${n % 2 ? 'odd' : 'even'}`; }
          draw(); return null; } },
      { title: 'Jumps of ten', intro: 'Start anywhere and press <kbd>S</kbd> to jump 10 at a time: the ones digit stays the same.',
        build(el, K) { let s = 7; const row = K.row(el); K.slider(row, 'start', 0, 9, 1, s, v => { s = v; an.reset(); });
          const b = new K.Board(el, { xmin: -3, xmax: 103, ymin: -3, ymax: 5, axes: false, grid: 0, equal: false, aspect: 0.2 }); const rd = K.read(el); const an = new K.Anim(9, () => b.redraw(), { ms: 500 });
          b.onDraw = () => { b.clear(); b.line(0, 0, 100, 0, { color: C.ink, w: 2 }); for (let i = 0; i <= 100; i += 10) { b.line(i, -0.6, i, 0.6, { color: C.ink }); b.text(i, -2, String(i), { font: '12px' }); }
            const k = an.i; for (let j = 1; j <= k; j++) b.arc(s + 10 * j - 5, 0, 5, 0, Math.PI, { color: C.orange, w: 2 }); b.dot(s + 10 * k, 0, { color: C.orange, r: 6 }); rd.innerHTML = Array.from({ length: k + 1 }, (_, j) => s + 10 * j).join(' → '); };
          K.anim(el, an); b.redraw(); return an; } }
    ],
    gens: [
      { title: 'Tens and ones', gen(R) { const n = R.int(11, 99); return R.chance(.5) ? { q: `Write ${n} in tens and ones.`, a: `${Math.floor(n / 10)} tens ${n % 10} ones` } : { q: `Expanded form of ${n}?`, a: `${n - n % 10} + ${n % 10}` }; } },
      { title: 'Number names', gen(R) { const n = R.int(11, 100); return R.chance(.5) ? { q: `Write in words: ${n}`, a: name(n) } : { q: `Write the number: ${name(n)}`, a: String(n), ans: n }; } },
      { title: 'Before, after, between', gen(R) { const n = R.int(2, 98), t = R.int(0, 2); return { q: [`Just after ${n}?`, `Just before ${n}?`, `Between ${n - 1} and ${n + 1}?`][t], a: String([n + 1, n - 1, n][t]), ans: [n + 1, n - 1, n][t] }; } },
      { title: 'Compare', gen(R) { const a = R.int(10, 99); let b; do { b = R.int(10, 99); } while (b === a); return { q: `${a} __ ${b} (> or <)`, a: a > b ? '>' : '<' }; } },
      { title: 'Even or odd', levels: [2, 3], gen(R) { const n = R.int(1, 99); return { q: `Is ${n} even or odd?`, a: n % 2 ? 'odd' : 'even' }; } },
      { title: 'Order', levels: [3], gen(R) { const xs = Array.from({ length: 4 }, () => R.int(10, 99)); return { q: `Arrange from greatest to smallest: ${xs.join(', ')}`, a: [...xs].sort((a, b) => b - a).join(', ') }; } }
    ],
    quiz: [
      { q: '6 tens 8 ones', o: ['68', '86', '14', '608'], a: 0, e: '60 + 8.' }, { q: 'Just after 99', o: ['100', '90', '98', '910'], a: 0, e: 'One hundred.' },
      { q: '54 __ 45', o: ['>', '<', '=', '+'], a: 0, e: 'Tens first.' }, { q: 'Which is even?', o: ['36', '27', '15', '9'], a: 0, e: 'Ends in 6.' },
      { q: '73 = 70 + __', o: ['3', '7', '73', '30'], a: 0, e: 'Ones.' }, { q: '"Forty-two"', o: ['42', '24', '402', '4'], a: 0, e: '40 + 2.' },
      { q: 'Between 59 and 61', o: ['60', '58', '62', '50'], a: 0, e: 'Middle.' }, { q: '10 tens =', o: ['100', '10', '1000', '20'], a: 0, e: 'Hundred.' },
      { q: 'Value of 8 in 85', o: ['80', '8', '5', '85'], a: 0, e: 'Tens place.' }, { q: 'Which is odd?', o: ['47', '40', '52', '18'], a: 0, e: 'Ends in 7.' },
      { q: 'Greatest: 39, 93, 63, 36', o: ['93', '63', '39', '36'], a: 0, e: '9 tens.' }
    ],
    teach: {
      outcomes: ['Read, write and name numbers to 100', 'Use tens and ones and expanded form', 'Compare and order', 'Tell even from odd'],
      periods: [{ t: 'Place value', flow: [['15 min', 'Bundles and rods; explore panel 1.'], ['15 min', 'Number names.'], ['10 min', 'Practice.']] }, { t: 'Order and parity', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Even/odd by pairing.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['86 vs 68.', 'Comparing by ones.'], activities: ['Number cards: make the biggest number.', 'Pair up children: even or odd?'],
      exit: ['Write 57 in words.', '48 or 84 — bigger?', 'Is 31 even?'], homework: 'Find 5 numbers on calendars or packets; write each in tens and ones.'
    },
    slides: [{ t: 'Fun with Numbers', b: ['Tens and ones', 'Compare and order', 'Even and odd', '100 = 10 tens'] }, { t: 'Check yourself', b: ['7 tens 4 ones?', 'Even or odd: 25?'] }],
    fs: { groups: [['Place value', [['Tens', 'left digit'], ['Ones', 'right digit'], ['Expanded', '68 = 60 + 8'], ['100', '10 tens']]], ['Compare', [['Tens first', '54 > 45'], ['Then ones', '72 < 76']]], ['Even and odd', [['Even', '0, 2, 4, 6, 8 at the end'], ['Odd', '1, 3, 5, 7, 9 at the end']]]],
      ex: [['91', '9 tens 1 one, ninety-one, odd'], ['Between 79 and 81', '80']], rem: ['Tens before ones.', 'Zero holds a place.', 'Pairs: even.'] }
  });
})();
