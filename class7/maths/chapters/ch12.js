/*
TOOL:    class7_maths_ch12
FAMILY:  CBSE_REVISION / Class 7 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 12 Another Peek Beyond the Point (Part II Ch 4: multiplying and dividing decimals, by 10, 100, 1000; estimating; units) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toFixed(6)).toString();
  G9.register({
    no: 12, part: 'Part II', short: 'Decimal × and ÷', title: 'Another Peek Beyond the Point',
    blurb: 'Part II Chapter 4. Multiplying and dividing decimals by 10, 100, 1000 and by 0.1, 0.01; multiplying decimals (count decimal places), dividing decimals by whole numbers and by decimals, estimating, and decimals in measurement and money.',
    revise: {
      oneLine: 'Multiplying by 10, 100, 1000 shifts digits left 1, 2, 3 places; dividing shifts them right. To multiply decimals, multiply as whole numbers and put as many decimal places as both factors have together: 1.2 × 0.3 = 0.36. To divide by a decimal, scale both numbers by 10, 100… until the divisor is whole: 4.5 ÷ 0.15 = 450 ÷ 15 = 30.',
      sections: [
        { h: 'Powers of 10', html: `<p>3.47 × 100 = 347; 3.47 ÷ 10 = 0.347; × 0.1 is the same as ÷ 10.</p>` },
        { h: 'Multiplying', html: `<p>2.5 × 1.4: 25 × 14 = 350, 1 + 1 = 2 places → 3.50. Estimate 3 × 1 = 3.</p>` },
        { h: 'Dividing', html: `<p>7.2 ÷ 4 = 1.8. 0.84 ÷ 0.4 = 8.4 ÷ 4 = 2.1.</p>` }
      ],
      formulas: [['× 10ⁿ', 'point moves n places right'], ['÷ 10ⁿ', 'point moves n places left'], ['Decimal places in product', 'sum of places'], ['a ÷ b', '(a × 10ⁿ) ÷ (b × 10ⁿ)']],
      terms: [['Decimal place', 'digit after the point'], ['Estimate', 'round first'], ['Scaling', 'multiply both by 10ⁿ']],
      traps: ['0.2 × 0.3 = 0.06, not 0.6.', 'Multiplying by 0.5 makes a number smaller.', 'Dividing by 0.5 makes it bigger.'],
      bridge: '<p>Class 8 uses decimals in percentages and money.</p>'
    },
    explore: [
      { title: 'Shift the point', intro: 'Multiply or divide by powers of 10 and watch the digits move.',
        build(el, K) { let x = 3.47, k = 2, op = 0; const row = K.row(el); K.slider(row, 'number', 0.01, 99.99, 0.01, x, v => { x = v; draw(); }); K.select(row, 'by', ['10', '100', '1000'], i => { k = i + 1; draw(); }); const s0 = row.querySelector('select'); if (s0) s0.value = 1; K.select(row, 'op', ['×', '÷'], i => { op = i; draw(); }); const rd = K.read(el);
          function draw() { const r = op ? x / 10 ** k : x * 10 ** k; rd.innerHTML = `<div style="font-size:24px;font-family:Consolas">${x.toFixed(2)} ${op ? '÷' : '×'} ${10 ** k} = <b>${f(r)}</b></div>the decimal point moves ${k} place${k > 1 ? 's' : ''} to the ${op ? 'left' : 'right'} (digits shift ${op ? 'right' : 'left'})`; } draw(); return null; } },
      { title: 'Area model for decimals', intro: 'A 1 × 1 square split into hundredths; the product is the overlap.',
        build(el, K) { let a = 0.6, c = 0.3; const row = K.row(el); K.slider(row, 'a', 0.1, 1, 0.1, a, v => { a = v; b.redraw(); }); K.slider(row, 'b', 0.1, 1, 0.1, c, v => { c = v; b.redraw(); }); const b = new K.Board(el, { xmin: -0.1, xmax: 1.1, ymin: -0.1, ymax: 1.1, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); for (let i = 0; i <= 10; i++) { b.line(i / 10, 0, i / 10, 1, { color: C.grid, w: 1 }); b.line(0, i / 10, 1, i / 10, { color: C.grid, w: 1 }); } b.rect(0, 0, a, 1, { fill: 'rgba(29,78,216,.18)', color: 'none' }); b.rect(0, 0, 1, c, { fill: 'rgba(234,88,12,.18)', color: 'none' }); b.rect(0, 0, a, c, { fill: 'rgba(124,58,237,.45)', color: C.purple, w: 2 }); b.rect(0, 0, 1, 1, { color: C.ink, w: 2 });
            rd.innerHTML = `${f(a)} × ${f(c)} = <b>${f(a * c)}</b> → ${Math.round(a * c * 100)} hundredths (purple) · tenths × tenths = hundredths, so 1 + 1 = 2 decimal places`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: '× or ÷ 10, 100, 1000', gen(R) { const x = R.int(1, 9999) / 100, k = R.pick([10, 100, 1000]); return R.chance(.5) ? { q: `${f(x)} × ${k} = ?`, a: f(x * k), ans: x * k, tol: 1e-6 } : { q: `${f(x)} ÷ ${k} = ?`, a: f(x / k), ans: x / k, tol: 1e-9 }; } },
      { title: 'Multiply decimals', gen(R) { const a = R.int(2, 99) / 10, b = R.int(2, 99) / 10; return { q: `${f(a)} × ${f(b)} = ?`, a: f(a * b), ans: a * b, tol: 1e-6 }; } },
      { title: 'Decimal ÷ whole', gen(R) { const d = R.int(2, 9), q = R.int(11, 199) / 10; return { q: `${f(q * d)} ÷ ${d} = ?`, a: f(q), ans: q, tol: 1e-6 }; } },
      { title: 'Divide by a decimal', levels: [2, 3], gen(R) { const d = R.pick([0.2, 0.5, 0.25, 0.4, 0.15, 1.5]), q = R.int(2, 40); return { q: `${f(d * q)} ÷ ${d} = ?`, a: String(q), ans: q }; } },
      { title: 'Money', levels: [2, 3], gen(R) { const p = R.int(1250, 9875) / 100, n = R.int(3, 12); return { q: `One notebook costs ₹${p.toFixed(2)}. Cost of ${n}?`, a: `₹${(p * n).toFixed(2)}`, ans: p * n, tol: 0.005 }; } }
    ],
    quiz: [
      { q: '1.2 × 0.3', o: ['0.36', '3.6', '0.036', '36'], a: 0, e: '2 places.' }, { q: '3.47 × 100', o: ['347', '34.7', '0.0347', '3470'], a: 0, e: 'Two right.' },
      { q: '4.5 ÷ 0.15', o: ['30', '3', '0.3', '300'], a: 0, e: '450 ÷ 15.' }, { q: '0.2 × 0.3', o: ['0.06', '0.6', '6', '0.006'], a: 0, e: 'Hundredths.' },
      { q: '7.2 ÷ 4', o: ['1.8', '18', '0.18', '2.8'], a: 0, e: 'Divide.' }, { q: 'Multiplying by 0.5', o: ['halves the number', 'doubles it', 'adds 0.5', 'nothing'], a: 0, e: 'Half.' },
      { q: '56.3 ÷ 1000', o: ['0.0563', '0.563', '5.63', '56 300'], a: 0, e: 'Three left.' }, { q: 'Dividing by 0.5', o: ['doubles the number', 'halves it', 'subtracts 0.5', 'nothing'], a: 0, e: '× 2.' },
      { q: '× 0.1 is the same as', o: ['÷ 10', '× 10', '÷ 100', '+ 0.1'], a: 0, e: 'Tenth.' }, { q: 'Estimate 4.9 × 3.1', o: ['about 15', 'about 1.5', 'about 150', 'about 8'], a: 0, e: '5 × 3.' },
      { q: '0.84 ÷ 0.4', o: ['2.1', '0.21', '21', '0.021'], a: 0, e: '8.4 ÷ 4.' }
    ],
    teach: {
      outcomes: ['Multiply/divide by powers of 10', 'Multiply decimals', 'Divide decimals by whole numbers and decimals'],
      periods: [{ t: 'Multiplying', flow: [['10 min', 'Price × quantity.'], ['15 min', 'Explore panels 1 and 2.'], ['15 min', 'Decimal places rule.']] }, { t: 'Dividing', flow: [['15 min', 'Scaling divisor to a whole number.'], ['15 min', 'Unit-rate problems.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['0.2 × 0.3 = 0.6.', '× always bigger.'], activities: ['Hundredths grid shading.', 'Market bill with decimals.'],
      exit: ['2.4 × 0.15.', '9.6 ÷ 0.3.', '0.072 × 1000.'], homework: 'From a shop bill, recompute 3 items as quantity × rate with decimals; check the total.'
    },
    slides: [{ t: 'Another Peek Beyond the Point', b: ['× and ÷ by 10, 100, 1000', 'Multiplying decimals', 'Dividing decimals', 'Estimating'] }, { t: 'Check yourself', b: ['0.7 × 0.08?', '1.44 ÷ 0.12?'] }],
    fs: { groups: [['Powers of 10', [['× 100', 'point 2 right'], ['÷ 1000', 'point 3 left'], ['× 0.1', '÷ 10']]], ['Multiply', [['Places', 'add decimal places'], ['1.2 × 0.3', '0.36']]], ['Divide', [['By decimal', 'scale to whole divisor'], ['4.5 ÷ 0.15', '450 ÷ 15 = 30']]]],
      ex: [['2.5 × 1.4', '3.5'], ['0.84 ÷ 0.4', '2.1']], rem: ['Estimate first.', 'Count decimal places.', '× by < 1 makes smaller.'] }
  });
})();
