/*
TOOL:    class3_maths_ch06
FAMILY:  CBSE_REVISION / Class 3 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 6 House of Hundreds - I (numbers to 999, place value) - revise, 2 explore panels (place-value blocks to 999, abacus), 6 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const O = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'], T = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'], TE = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const two = (r) => r < 10 ? O[r] : r < 20 ? TE[r - 10] : T[Math.floor(r / 10)] + (r % 10 ? '-' + O[r % 10] : '');
  const name = (n) => (Math.floor(n / 100) ? O[Math.floor(n / 100)] + ' hundred' : '') + (n % 100 ? (n >= 100 ? ' ' : '') + two(n % 100) : '');
  G9.register({
    no: 6, part: 'All chapters', short: 'Numbers to 999', title: 'House of Hundreds - I',
    blurb: 'Three-digit numbers: hundreds, tens and ones, expanded form, number names, comparing and ordering up to 999.',
    revise: {
      oneLine: 'Ten tens make a hundred; ten hundreds make a thousand. 347 = 3 hundreds + 4 tens + 7 ones = 300 + 40 + 7. Compare from the left.',
      sections: [
        { h: 'Place value', html: `<p>In 347: 3 is worth 300, 4 is worth 40, 7 is worth 7. 0 holds a place: 307 has no tens.</p>` },
        { h: 'Names', html: `<p>347 three hundred forty-seven · 610 six hundred ten · 999 nine hundred ninety-nine.</p>` },
        { h: 'Order', html: `<p>Smallest 3-digit number 100, greatest 999. 503 &gt; 497.</p>` }
      ],
      formulas: [['100', '10 tens'], ['1000', '10 hundreds'], ['347', '300 + 40 + 7'], ['Smallest 3-digit', '100'], ['Greatest 3-digit', '999']],
      terms: [['Hundreds place', 'first of three digits'], ['Expanded form', 'sum of place values'], ['Abacus', 'beads on rods for H, T, O']],
      traps: ['307 vs 370.', 'Reading 340 as "three hundred four".', 'Comparing by number of large digits.'],
      bridge: '<p>Ch 9 adds and subtracts 3-digit numbers.</p>'
    },
    explore: [
      { title: 'Blocks to 999', intro: 'Choose a number; see hundreds flats, ten rods and unit cubes.',
        build(el, K) { let n = 347; const row = K.row(el); K.slider(row, 'number', 100, 999, 1, n, v => { n = v; draw(); }); const rd = K.read(el);
          const flat = '<span style="display:inline-block;width:46px;height:46px;margin:2px;background:repeating-linear-gradient(90deg,var(--purple,#7c3aed) 0 4px,#fff 4px 4.6px),repeating-linear-gradient(var(--purple,#7c3aed) 0 4px,#fff 4px 4.6px);background-blend-mode:multiply;border:1px solid var(--purple,#7c3aed)"></span>';
          const rod = '<span style="display:inline-block;width:8px;height:46px;margin:1px;background:var(--blue,#1d4ed8)"></span>', cube = '<span style="display:inline-block;width:8px;height:8px;margin:1px;background:var(--orange,#ea580c)"></span>';
          function draw() { const h = Math.floor(n / 100), t = Math.floor(n % 100 / 10), o = n % 10; rd.innerHTML = `<div style="display:flex;gap:14px;align-items:flex-end;flex-wrap:wrap"><div>${flat.repeat(h)}</div><div>${rod.repeat(t)}</div><div style="width:60px">${cube.repeat(o)}</div></div><b>${n}</b> = ${h} hundreds + ${t} tens + ${o} ones = ${h * 100} + ${t * 10} + ${o} · <i>${name(n)}</i>`; }
          draw(); return null; } },
      { title: 'Abacus', intro: 'Click a rod to add a bead; shift-click to remove. Read the number.',
        build(el, K) { const v = [3, 4, 7]; const b = new K.Board(el, { xmin: 0, xmax: 6, ymin: -1, ymax: 11, axes: false, grid: 0 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.rect(0.5, 0, 5, 0.4, { fill: '#a16207', color: '#713f12' }); ['H', 'T', 'O'].forEach((s, i) => { const x = 1.5 + 1.5 * i; b.line(x, 0.4, x, 10.5, { color: C.ink, w: 3 }); b.text(x, -0.6, s, { font: 'bold 15px' }); for (let k = 0; k < v[i]; k++) b.circle(x, 0.9 + k * 0.95, 0.42, { fill: [C.purple, C.blue, C.orange][i], color: C.ink, w: 1 }); });
            rd.innerHTML = `${v[0]} hundreds, ${v[1]} tens, ${v[2]} ones = <b>${v[0] * 100 + v[1] * 10 + v[2]}</b>`; };
          b.cv.addEventListener('click', (e) => { const r = b.cv.getBoundingClientRect(); const x = b.ix(e.clientX - r.left); const i = Math.round((x - 1.5) / 1.5); if (i < 0 || i > 2) return; v[i] = Math.max(0, Math.min(9, v[i] + (e.shiftKey ? -1 : 1))); b.redraw(); });
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Place value', gen(R) { const n = R.int(100, 999), k = R.int(0, 2); const d = String(n)[k]; return { q: `What is the value of the digit ${d} in ${n}? (${['hundreds', 'tens', 'ones'][k]} place)`, a: String(+d * [100, 10, 1][k]), ans: +d * [100, 10, 1][k] }; } },
      { title: 'Expanded form', gen(R) { const n = R.int(100, 999); return { q: `Write ${n} in expanded form.`, a: [Math.floor(n / 100) * 100, Math.floor(n % 100 / 10) * 10, n % 10].filter(x => x).join(' + ') }; } },
      { title: 'Number names', gen(R) { const n = R.int(100, 999); return R.chance(.5) ? { q: `Write in words: ${n}`, a: name(n) } : { q: `Write the number: ${name(n)}`, a: String(n), ans: n }; } },
      { title: 'Compare', gen(R) { const a = R.int(100, 999); let b; do { b = R.int(100, 999); } while (b === a); return { q: `${a} __ ${b}`, a: a > b ? '>' : '<' }; } },
      { title: 'Biggest and smallest from digits', levels: [2, 3], gen(R) { const ds = R.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3); const s = [...ds].sort(); return { q: `Using ${ds.join(', ')} once each, make the greatest and smallest 3-digit numbers.`, a: `${[...s].reverse().join('')} and ${s.join('')}` }; } },
      { title: '10 more, 100 more', levels: [2, 3], gen(R) { const n = R.int(100, 889); return R.chance(.5) ? { q: `What is 10 more than ${n}?`, a: String(n + 10), ans: n + 10 } : { q: `What is 100 more than ${n}?`, a: String(n + 100), ans: n + 100 }; } }
    ],
    quiz: [
      { q: '3 hundreds 4 tens 7 ones', o: ['347', '3047', '743', '374'], a: 0, e: '300 + 40 + 7.' }, { q: 'Value of 6 in 362', o: ['60', '6', '600', '62'], a: 0, e: 'Tens place.' },
      { q: 'Smallest 3-digit number', o: ['100', '101', '999', '111'], a: 0, e: 'One hundred.' }, { q: 'Greatest 3-digit number', o: ['999', '900', '1000', '990'], a: 0, e: 'Nine hundred ninety-nine.' },
      { q: '503 __ 497', o: ['>', '<', '=', '+'], a: 0, e: 'Hundreds.' }, { q: '"six hundred ten"', o: ['610', '6010', '601', '160'], a: 0, e: '600 + 10.' },
      { q: '10 hundreds =', o: ['1000', '100', '10', '110'], a: 0, e: 'Thousand.' }, { q: '700 + 5', o: ['705', '750', '7005', '57'], a: 0, e: 'Zero tens.' },
      { q: '100 more than 456', o: ['556', '466', '457', '4556'], a: 0, e: 'Hundreds +1.' }, { q: 'Greatest from 4, 8, 1', o: ['841', '148', '814', '481'], a: 0, e: 'Largest first.' },
      { q: 'Tens in 307', o: ['0', '3', '7', '30'], a: 0, e: 'Place holder.' }
    ],
    teach: {
      outcomes: ['Read, write and name numbers to 999', 'Find place value and expanded form', 'Compare and order 3-digit numbers'],
      periods: [{ t: 'Hundreds', flow: [['10 min', 'Bundle 10 tens into a hundred.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Number names.']] }, { t: 'Abacus and order', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Biggest/smallest digit games.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['307 vs 370.', 'Zero ignored.'], activities: ['Digit cards: make numbers.', 'Paper abacus.'],
      exit: ['Expanded form of 608.', 'Write 452 in words.', '389 or 398?'], homework: 'Find 3 three-digit numbers at home (bills, books) and write them in expanded form.'
    },
    slides: [{ t: 'House of Hundreds - I', b: ['Hundreds, tens, ones', 'Expanded form', 'Comparing to 999'] }, { t: 'Check yourself', b: ['Value of 7 in 573?', 'Greatest from 2, 9, 5?'] }],
    fs: { groups: [['Place value', [['347', '300 + 40 + 7'], ['100', '10 tens'], ['1000', '10 hundreds'], ['Zero', 'holds a place']]], ['Order', [['Smallest', '100'], ['Greatest', '999'], ['Compare', 'from the left']]], ['Digits', [['Greatest number', 'digits big to small'], ['Smallest number', 'digits small to big']]]],
      ex: [['608', '600 + 8, six hundred eight'], ['5, 1, 7', '751 and 157']], rem: ['Zero holds a place.', 'Compare hundreds first.', 'Say the hundreds first.'] }
  });
})();
