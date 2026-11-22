/*
TOOL:    class4_maths_ch04
FAMILY:  CBSE_REVISION / Class 4 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 4 Thousands Around Us (4-digit numbers, place value, comparing, rounding on a number line) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'], teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'], tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const w2 = n => n < 10 ? ones[n] : n < 20 ? teens[n - 10] : tens[Math.floor(n / 10)] + (n % 10 ? '-' + ones[n % 10] : '');
  const words = n => [n >= 1000 ? ones[Math.floor(n / 1000)] + ' thousand' : '', n % 1000 >= 100 ? ones[Math.floor(n % 1000 / 100)] + ' hundred' : '', n % 100 ? w2(n % 100) : ''].filter(Boolean).join(' ') || 'zero';
  G9.register({
    no: 4, part: 'All chapters', short: '4-digit numbers', title: 'Thousands Around Us',
    blurb: 'Numbers up to 10 000: thousands, hundreds, tens and ones; reading and writing in words; comparing, ordering and rounding to the nearest ten, hundred and thousand.',
    revise: {
      oneLine: '10 hundreds make 1 thousand. In 4 527 the 4 is worth 4 000, the 5 is 500, the 2 is 20 and the 7 is 7. Compare numbers from the left; round by looking at the next digit (5 or more rounds up).',
      sections: [
        { h: 'Place value', html: `<p>4 527 = 4 000 + 500 + 20 + 7 = four thousand five hundred twenty-seven.</p>` },
        { h: 'Comparing', html: `<p>More digits = bigger. Same digits: compare thousands, then hundreds… 3 498 &lt; 3 512.</p>` },
        { h: 'Rounding', html: `<p>4 527 → nearest hundred 4 500; nearest thousand 5 000.</p>` }
      ],
      formulas: [['1 thousand', '10 hundreds = 100 tens = 1000 ones'], ['Expanded form', '4000 + 500 + 20 + 7'], ['Round', 'next digit ≥ 5 → up'], ['Smallest / largest 4-digit', '1000 / 9999']],
      terms: [['Place value', 'worth of a digit'], ['Expanded form', 'sum of place values'], ['Round', 'nearest easy number']],
      traps: ['Zero as a place holder: 3 045 is not 345.', 'Comparing only the last digits.', 'Rounding 4 450 to the nearest thousand is 4 000.'],
      bridge: '<p>Ch 10 adds and subtracts big census numbers.</p>'
    },
    explore: [
      { title: 'Place-value chart', intro: 'Set each digit; see blocks, expanded form and words.',
        build(el, K) { let d = [4, 5, 2, 7]; const row = K.row(el); ['thousands', 'hundreds', 'tens', 'ones'].forEach((nm, i) => K.slider(row, nm, i ? 0 : 1, 9, 1, d[i], v => { d[i] = v; draw(); })); const rd = K.read(el);
          function draw() { const n = d[0] * 1000 + d[1] * 100 + d[2] * 10 + d[3]; const bx = (k, s, c) => `<span style="display:inline-block;width:${s}px;height:${s}px;background:${c};margin:2px;border-radius:3px"></span>`.repeat(k);
            rd.innerHTML = `<div>${bx(d[0], 40, 'var(--purple,#7c3aed)')} ${bx(d[1], 26, 'var(--blue,#1d4ed8)')} ${'<span style="display:inline-block;width:6px;height:26px;background:var(--sky,#0284c7);margin:2px"></span>'.repeat(d[2])} ${bx(d[3], 7, 'var(--orange,#ea580c)')}</div><b>${n.toLocaleString('en-IN')}</b> = ${d[0] * 1000} + ${d[1] * 100} + ${d[2] * 10} + ${d[3]} · <i>${words(n)}</i>`; } draw(); return null; } },
      { title: 'Rounding on a number line', intro: 'Slide the number; see the nearest hundred and thousand.',
        build(el, K) { let n = 4527; const row = K.row(el); K.slider(row, 'number', 1000, 9999, 1, n, v => { n = v; b.redraw(); }); const b = new K.Board(el, { xmin: -0.5, xmax: 10.5, ymin: -1.2, ymax: 1.4, axes: false, grid: 0, aspect: 0.25 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const th = Math.floor(n / 1000); b.line(0, 0, 10, 0, { color: C.ink, w: 2 }); for (let i = 0; i <= 10; i++) { b.line(i, -0.15, i, 0.15, { color: C.ink, w: 2 }); b.text(i, -0.55, String(th * 1000 + i * 100), { font: '11px' }); }
            const x = (n - th * 1000) / 100, h = Math.round(n / 100) * 100; b.dot(x, 0, { r: 8, color: C.orange }); b.arrow(x, 0.6, (h - th * 1000) / 100, 0.25, { color: C.blue, w: 2 }); b.text(x, 1.0, String(n), { font: 'bold 14px' });
            rd.innerHTML = `${n} → nearest ten <b>${Math.round(n / 10) * 10}</b>, nearest hundred <b>${h}</b>, nearest thousand <b>${Math.round(n / 1000) * 1000}</b>`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Place value', gen(R) { const n = R.int(1000, 9999); const p = R.int(0, 3), nm = ['thousands', 'hundreds', 'tens', 'ones'][p], v = Number(String(n)[p]) * [1000, 100, 10, 1][p]; return { q: `Value of the ${nm} digit in ${n}?`, a: String(v), ans: v }; } },
      { title: 'Expanded form', gen(R) { const n = R.int(1000, 9999); const s = String(n).split('').map((c, i) => Number(c) * [1000, 100, 10, 1][i]).filter(Boolean).join(' + '); return R.chance(.5) ? { q: `Write ${n} in expanded form.`, a: s } : { q: `${s} = ?`, a: String(n), ans: n }; } },
      { title: 'Compare', gen(R) { const a = R.int(1000, 9999), b = R.chance(.5) ? a + R.pick([-100, 100, -10, 10, -1, 1]) : R.int(1000, 9999); return { q: `${a} __ ${b} (<, > or =)`, a: a > b ? '>' : a < b ? '<' : '=' }; } },
      { title: 'Rounding', levels: [2, 3], gen(R) { const n = R.int(1001, 9499); const t = R.pick([['ten', 10], ['hundred', 100], ['thousand', 1000]]); const r = Math.round(n / t[1]) * t[1]; return { q: `Round ${n} to the nearest ${t[0]}.`, a: String(r), ans: r }; } },
      { title: 'Number names', levels: [1, 2], gen(R) { const n = R.int(1000, 9999); return { q: `Write ${n} in words.`, a: words(n) }; } }
    ],
    quiz: [
      { q: '10 hundreds =', o: ['1 thousand', '100', '10 thousand', '1 hundred'], a: 0, e: 'Regroup.' }, { q: 'Value of 5 in 4527', o: ['500', '5', '50', '5000'], a: 0, e: 'Hundreds.' },
      { q: 'Smallest 4-digit number', o: ['1000', '9999', '0', '1111'], a: 0, e: 'One thousand.' }, { q: '3498 vs 3512', o: ['<', '>', '=', 'cannot tell'], a: 0, e: 'Hundreds 4 < 5.' },
      { q: '4527 to nearest hundred', o: ['4500', '4600', '5000', '4530'], a: 0, e: '27 < 50.' }, { q: '6000 + 40 + 3', o: ['6043', '6403', '643', '6430'], a: 0, e: 'Zero hundreds.' },
      { q: 'Largest 4-digit number', o: ['9999', '1000', '9000', '10000'], a: 0, e: 'All nines.' }, { q: '7850 to nearest thousand', o: ['8000', '7000', '7900', '7800'], a: 0, e: '850 ≥ 500.' },
      { q: 'Three thousand and five', o: ['3005', '3500', '305', '3050'], a: 0, e: 'Place holders.' }, { q: 'Next after 4999', o: ['5000', '4000', '49910', '5999'], a: 0, e: 'Regroup.' },
      { q: 'Biggest: 2899, 2989, 2998, 2988', o: ['2998', '2989', '2899', '2988'], a: 0, e: 'Compare tens.' }
    ],
    teach: {
      outcomes: ['Read and write numbers to 10 000', 'Use place value and expanded form', 'Compare and round'],
      periods: [{ t: 'Place value', flow: [['10 min', 'Bundles of 10 hundreds.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Number cards game.']] }, { t: 'Compare and round', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Order city populations.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Missing zero place holders.', 'Rounding down at 5.'], activities: ['Spike abacus.', 'Make the biggest number from 4 digits.'],
      exit: ['Expanded form of 7208.', 'Round 6350 to nearest hundred.', 'Compare 4090 and 4900.'], homework: 'Find 4-digit numbers in a newspaper or calendar; write them in words and round them.'
    },
    slides: [{ t: 'Thousands Around Us', b: ['Place value', 'Expanded form', 'Compare', 'Round'] }, { t: 'Check yourself', b: ['Value of 8 in 8213?', 'Round 3762 to nearest thousand?'] }],
    fs: { groups: [['Place value', [['1000', '10 hundreds'], ['4527', '4000 + 500 + 20 + 7']]], ['Compare', [['From the left', 'thousands first'], ['Range', '1000 to 9999']]], ['Round', [['≥ 5', 'round up'], ['4527', '4500 / 5000']]]],
      ex: [['6000 + 40 + 3', '6043'], ['Round 2349 to hundred', '2300']], rem: ['Zero holds a place.', 'Compare from the left.', 'Look one place to the right to round.'] }
  });
})();
