/*
TOOL:    class7_maths_ch03
FAMILY:  CBSE_REVISION / Class 7 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 3 A Peek Beyond the Point (decimals: tenths, hundredths, place value, number line, comparing, adding and subtracting, units) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f2 = x => (+x.toFixed(3)).toString();
  G9.register({
    no: 3, part: 'Part I', short: 'Decimals', title: 'A Peek Beyond the Point',
    blurb: 'Decimals as an extension of place value: tenths, hundredths and thousandths, decimals on a number line, comparing and ordering, adding and subtracting decimals, and decimals in measurement (cm, m, kg, ₹).',
    revise: {
      oneLine: 'Each place is one-tenth of the place to its left: 3.47 = 3 + 4/10 + 7/100. Line up the decimal points to add or subtract (fill gaps with 0): 5.6 − 2.35 = 5.60 − 2.35 = 3.25. Compare digit by digit from the left: 0.5 > 0.45.',
      sections: [
        { h: 'Place value', html: `<p>Tenths, hundredths, thousandths. 0.07 = 7/100; 2.305 = 2 + 3/10 + 0/100 + 5/1000.</p>` },
        { h: 'Comparing', html: `<p>0.5 = 0.50 &gt; 0.45. More digits does not mean bigger.</p>` },
        { h: 'Measures', html: `<p>1 cm = 0.01 m; 250 g = 0.25 kg; ₹12.75 = 12 rupees 75 paise.</p>` }
      ],
      formulas: [['1/10', '0.1'], ['1/100', '0.01'], ['1/1000', '0.001'], ['Add/subtract', 'line up the points'], ['m → cm', '× 100']],
      terms: [['Decimal point', 'separates whole and parts'], ['Tenth', 'one of 10 equal parts'], ['Hundredth', 'one of 100']],
      traps: ['0.45 > 0.5 is false.', 'Not lining up decimal points.', '0.07 is not 0.7.'],
      bridge: '<p>Ch 12 multiplies and divides decimals.</p>'
    },
    explore: [
      { title: 'Zoom into the number line', intro: 'Slide the number; zoom shows tenths, then hundredths.',
        build(el, K) { let x = 3.47; const row = K.row(el); K.slider(row, 'number', 0, 9.99, 0.01, x, v => { x = v; b.redraw(); }); const b = new K.Board(el, { xmin: -0.3, xmax: 10.3, ymin: -3.2, ymax: 1, axes: false, grid: 0, aspect: 0.35 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const w = Math.floor(x), t = Math.floor(x * 10 + 1e-9) / 10;
            b.line(0, 0, 10, 0, { color: C.ink, w: 2 }); for (let i = 0; i <= 10; i++) { b.line(i, -0.1, i, 0.1, { color: C.ink, w: 2 }); b.text(i, 0.45, String(i), { font: '11px' }); } b.dot(x, 0, { r: 6 });
            b.line(0, -1.3, 10, -1.3, { color: C.blue, w: 2 }); for (let i = 0; i <= 10; i++) { b.line(i, -1.4, i, -1.2, { color: C.blue, w: 1.5 }); b.text(i, -0.95, f2(w + i / 10), { font: '10px', color: C.blue }); } b.dot((x - w) * 10, -1.3, { r: 6 });
            b.line(0, -2.6, 10, -2.6, { color: C.orange, w: 2 }); for (let i = 0; i <= 10; i++) { b.line(i, -2.7, i, -2.5, { color: C.orange, w: 1.5 }); b.text(i, -2.25, f2(t + i / 100), { font: '10px', color: C.orange }); } b.dot((x - t) * 100, -2.6, { r: 6 });
            b.line(w, -0.1, 0, -1.2, { color: C.grey, w: 1, dash: [3, 3] }); b.line(w + 1, -0.1, 10, -1.2, { color: C.grey, w: 1, dash: [3, 3] });
            const d = x.toFixed(2).split('.'); rd.innerHTML = `<b>${x.toFixed(2)}</b> = ${d[0]} + ${d[1][0]}/10 + ${d[1][1]}/100 · between ${t.toFixed(1)} and ${(t + 0.1).toFixed(1)}`; };
          b.redraw(); return null; } },
      { title: 'Line up the points', intro: 'Add or subtract two decimals.',
        build(el, K) { let a = 5.6, c = 2.35, op = 1; const row = K.row(el); K.slider(row, 'first', 0.1, 20, 0.01, a, v => { a = v; draw(); }); K.slider(row, 'second', 0.01, 10, 0.01, c, v => { c = v; draw(); }); K.select(row, 'op', ['+', '−'], i => { op = i; draw(); }); const s0 = row.querySelector('select'); if (s0) s0.value = 1; const rd = K.read(el);
          function draw() { const r = op ? a - c : a + c, w = 7; const f = v => (v < 0 ? '−' : '') + Math.abs(v).toFixed(2).padStart(w - 1, ' '); rd.innerHTML = `<pre style="font:22px Consolas;line-height:1.3;margin:6px 0">  ${f(a)}\n${op ? '−' : '+'} ${f(c)}\n  ${'─'.repeat(w - 1)}\n  ${f(r)}</pre>points in one column; empty places filled with 0`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Fraction to decimal', gen(R) { const t = R.pick([[7, 10], [3, 100], [47, 100], [5, 1000], [125, 1000], [9, 10]]); return { q: `${t[0]}/${t[1]} as a decimal?`, a: f2(t[0] / t[1]) }; } },
      { title: 'Compare', gen(R) { const a = R.int(1, 99) / 100, b = R.int(1, 9) / 10; return { q: `${f2(a)} __ ${f2(b)}`, a: a > b ? '>' : a < b ? '<' : '=' }; } },
      { title: 'Add', gen(R) { const a = R.int(100, 2000) / 100, b = R.int(10, 900) / 100; return { q: `${f2(a)} + ${f2(b)} = ?`, a: f2(a + b), ans: a + b, tol: 1e-6 }; } },
      { title: 'Subtract', gen(R) { const a = R.int(300, 2000) / 100, b = R.int(10, 290) / 100; return { q: `${f2(a)} − ${f2(b)} = ?`, a: f2(a - b), ans: a - b, tol: 1e-6 }; } },
      { title: 'Units', levels: [2, 3], gen(R) { const t = R.pick([['cm', 'm', 100], ['g', 'kg', 1000], ['paise', '₹', 100], ['m', 'km', 1000]]), n = R.int(5, 950); return { q: `${n} ${t[0]} in ${t[1]}?`, a: `${f2(n / t[2])} ${t[1]}`, ans: n / t[2], tol: 1e-6 }; } }
    ],
    quiz: [
      { q: '3.47 =', o: ['3 + 4/10 + 7/100', '3 + 47/10', '34/10 + 7', '3 + 4/100 + 7/10'], a: 0, e: 'Places.' }, { q: 'Bigger: 0.5 or 0.45', o: ['0.5', '0.45', 'equal', 'cannot tell'], a: 0, e: '0.50 > 0.45.' },
      { q: '5.6 − 2.35', o: ['3.25', '3.35', '2.25', '3.75'], a: 0, e: '5.60 − 2.35.' }, { q: '7/100 =', o: ['0.07', '0.7', '7.00', '0.007'], a: 0, e: 'Hundredths.' },
      { q: '250 g =', o: ['0.25 kg', '2.5 kg', '0.025 kg', '25 kg'], a: 0, e: '÷ 1000.' }, { q: '1.2 + 0.08', o: ['1.28', '1.10', '2.0', '0.20'], a: 0, e: 'Line up.' },
      { q: '45 cm =', o: ['0.45 m', '4.5 m', '0.045 m', '45 m'], a: 0, e: '÷ 100.' }, { q: 'Order: 0.3, 0.25, 0.305', o: ['0.25 < 0.3 < 0.305', '0.3 < 0.25 < 0.305', '0.305 < 0.3 < 0.25', '0.25 < 0.305 < 0.3'], a: 0, e: 'Compare tenths, then hundredths.' },
      { q: '₹12.75 means', o: ['12 rupees 75 paise', '1275 rupees', '12 rupees 7 paise', '75 rupees'], a: 0, e: 'Paise.' }, { q: '0.1 × 10 =', o: ['1', '0.01', '10', '0.1'], a: 0, e: 'Tenths × 10.' },
      { q: 'Tenths digit of 6.39', o: ['3', '9', '6', '0'], a: 0, e: 'First after point.' }
    ],
    teach: {
      outcomes: ['Read and write decimals', 'Place them on a number line', 'Compare, add and subtract decimals', 'Use decimals in measures'],
      periods: [{ t: 'Place value', flow: [['10 min', 'Measuring tape cm to m.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Compare and order.']] }, { t: 'Operations', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Shopping bills.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Longer decimal bigger.', 'Misaligned points.'], activities: ['Decimal number line on the floor.', 'Price-tag shop.'],
      exit: ['3.06 vs 3.6.', '12.5 − 4.75.', '780 g in kg.'], homework: 'Measure the heights of family members in m and cm; write them as decimals of a metre and order them.'
    },
    slides: [{ t: 'A Peek Beyond the Point', b: ['Tenths and hundredths', 'Number line', 'Comparing', 'Adding and subtracting', 'Units'] }, { t: 'Check yourself', b: ['0.6 vs 0.58?', '7.2 − 3.45?'] }],
    fs: { groups: [['Place value', [['0.1', '1/10'], ['0.01', '1/100'], ['0.001', '1/1000'], ['3.47', '3 + 4/10 + 7/100']]], ['Compare / operate', [['0.5 vs 0.45', '0.50 > 0.45'], ['Add / subtract', 'line up points, fill zeros']]], ['Units', [['1 cm', '0.01 m'], ['1 g', '0.001 kg'], ['1 paisa', '₹0.01']]]],
      ex: [['5.6 − 2.35', '3.25'], ['250 g', '0.25 kg']], rem: ['Zeros can be added after the last digit.', 'Points in one column.', 'Compare from the left.'] }
  });
})();
