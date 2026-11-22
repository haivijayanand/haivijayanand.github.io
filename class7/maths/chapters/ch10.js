/*
TOOL:    class7_maths_ch10
FAMILY:  CBSE_REVISION / Class 7 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 10 Operations with Integers (Part II Ch 2: multiplying and dividing integers, sign rules, properties, patterns) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const m = n => n < 0 ? `(−${-n})` : String(n), w = n => String(n).replace('-', '−');
  G9.register({
    no: 10, part: 'Part II', short: 'Integer × and ÷', title: 'Operations with Integers',
    blurb: 'Part II Chapter 2. Adding and subtracting integers (recap), multiplying integers through patterns and repeated addition, sign rules, dividing integers, and properties (commutative, associative, distributive, multiplying by 0 and 1).',
    revise: {
      oneLine: 'Same signs multiply or divide to a positive; different signs give a negative: (−4) × (−3) = 12, (−12) ÷ 3 = −4. The pattern 3 × (−2) = −6, 2 × (−2) = −4, 1 × (−2) = −2, 0 × (−2) = 0, (−1) × (−2) = 2 explains why a negative times a negative is positive.',
      sections: [
        { h: 'Multiplying', html: `<p>4 × (−3) = −12 (four jumps of −3). (−4) × (−3) = 12.</p>` },
        { h: 'Dividing', html: `<p>Division undoes multiplication: (−20) ÷ (−5) = 4 because 4 × (−5) = −20. Division by 0 is not defined.</p>` },
        { h: 'Properties', html: `<p>a × b = b × a; (a × b) × c = a × (b × c); a × (b + c) = ab + ac. An even number of negative factors gives a positive product.</p>` }
      ],
      formulas: [['(+)(+), (−)(−)', '+'], ['(+)(−), (−)(+)', '−'], ['Same for ÷', 'sign rules'], ['a × 0', '0'], ['a ÷ 0', 'not defined']],
      terms: [['Product', 'result of ×'], ['Quotient', 'result of ÷'], ['Additive inverse', '−a']],
      traps: ['(−3)² = 9 but −3² = −9.', 'Odd number of negatives → negative product.', 'Division by zero.'],
      bridge: '<p>Class 8 uses integers in algebra and exponents.</p>'
    },
    explore: [
      { title: 'Pattern table', intro: 'Rows of products; watch the pattern continue past zero.',
        build(el, K) { let b2 = -2; const row = K.row(el); K.slider(row, 'multiply by', -5, 5, 1, b2, v => { b2 = v; draw(); }); const rd = K.read(el);
          function draw() { rd.innerHTML = `<table style="font-size:18px;font-family:Cambria,serif">${[3, 2, 1, 0, -1, -2, -3].map(a => `<tr><td style="padding:2px 10px;text-align:right">${m(a)} × ${m(b2)}</td><td>=</td><td style="padding:2px 10px;${a < 0 ? 'color:var(--orange,#ea580c);font-weight:bold' : ''}">${w(a * b2 || 0)}</td></tr>`).join('')}</table>each step down changes the product by ${w(-b2)} — so the pattern forces negative × negative = positive`; } draw(); return null; } },
      { title: 'Jumps on a number line', intro: 'a × b as a jumps of size b (negative a: jumps in reverse).',
        build(el, K) { let a = 3, c = -4; const row = K.row(el); K.slider(row, 'a', -5, 5, 1, a, v => { a = v; bd.redraw(); }); K.slider(row, 'b', -5, 5, 1, c, v => { c = v; bd.redraw(); });
          const bd = new K.Board(el, { xmin: -26, xmax: 26, ymin: -2, ymax: 3, axes: false, grid: 0, aspect: 0.18 }); const rd = K.read(el);
          bd.onDraw = () => { bd.clear(); bd.line(-25, 0, 25, 0, { color: C.ink, w: 2 }); for (let i = -25; i <= 25; i++) { bd.line(i, -0.15, i, 0.15, { color: C.ink, w: i % 5 ? 0.6 : 2 }); if (i % 5 === 0) bd.text(i, -0.8, w(i), { font: '10px' }); } const step = a >= 0 ? c : -c; for (let k = 0; k < Math.abs(a); k++) bd.arrow(k * step, 0.6 + 0.25 * (k % 2), (k + 1) * step, 0.6 + 0.25 * (k % 2), { color: a < 0 ? C.orange : C.blue, w: 3 }); bd.dot(a * c, 0, { r: 7, color: C.purple });
            rd.innerHTML = `${m(a)} × ${m(c)} = <b>${w(a * c || 0)}</b> · ${a < 0 ? `${-a} jumps of ${w(-c)} (opposite of ${w(c)})` : `${a} jumps of ${w(c)}`}`; };
          bd.redraw(); return null; } }
    ],
    gens: [
      { title: 'Multiply', gen(R) { const a = R.nz(-12, 12), b = R.nz(-12, 12); return { q: `${m(a)} × ${m(b)} = ?`, a: w(a * b), ans: a * b }; } },
      { title: 'Divide', gen(R) { const q = R.nz(-12, 12), d = R.nz(-9, 9); return { q: `${m(q * d)} ÷ ${m(d)} = ?`, a: w(q), ans: q }; } },
      { title: 'Three factors', levels: [2, 3], gen(R) { const a = R.nz(-6, 6), b = R.nz(-6, 6), c = R.nz(-6, 6); return { q: `${m(a)} × ${m(b)} × ${m(c)} = ?`, a: w(a * b * c), ans: a * b * c }; } },
      { title: 'Distributive', levels: [2, 3], gen(R) { const a = R.nz(-9, 9), b = R.int(10, 99), c = R.nz(-9, 9); return { q: `${m(a)} × ${b} + ${m(a)} × ${m(c)} = ?`, a: `${m(a)} × (${b} + ${m(c)}) = ${w(a * (b + c))}`, ans: a * (b + c) }; } },
      { title: 'Sign of product', gen(R) { const k = R.int(2, 9); return { q: `Product of ${k} negative numbers (none zero): positive or negative?`, a: k % 2 ? 'negative' : 'positive' }; } }
    ],
    quiz: [
      { q: '(−4) × (−3)', o: ['12', '−12', '−7', '7'], a: 0, e: 'Same signs.' }, { q: '(−12) ÷ 3', o: ['−4', '4', '−9', '−36'], a: 0, e: 'Different signs.' },
      { q: '5 × (−6)', o: ['−30', '30', '−11', '1'], a: 0, e: 'Different signs.' }, { q: '(−20) ÷ (−5)', o: ['4', '−4', '−25', '100'], a: 0, e: 'Same signs.' },
      { q: '(−1) × (−1) × (−1)', o: ['−1', '1', '−3', '3'], a: 0, e: 'Odd count.' }, { q: '(−3)²', o: ['9', '−9', '6', '−6'], a: 0, e: 'Same signs.' },
      { q: '7 ÷ 0', o: ['not defined', '0', '7', '∞ (equals)'], a: 0, e: 'Undefined.' }, { q: '(−8) × 0', o: ['0', '−8', '8', '−80'], a: 0, e: 'Zero.' },
      { q: '(−2) × (−3) × (−4) × (−5)', o: ['120', '−120', '−14', '14'], a: 0, e: 'Even count.' }, { q: '(−36) ÷ 9', o: ['−4', '4', '−27', '−45'], a: 0, e: 'Signs differ.' },
      { q: 'a × (b + c)', o: ['ab + ac', 'ab + c', 'a + bc', 'abc'], a: 0, e: 'Distributive.' }
    ],
    teach: {
      outcomes: ['Multiply and divide integers', 'Explain sign rules with patterns', 'Use properties'],
      periods: [{ t: 'Multiplying', flow: [['10 min', 'Pattern tables.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Number-line jumps.']] }, { t: 'Dividing', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Division as inverse.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['(−)(−) = −.', '−3² vs (−3)².'], activities: ['Sign-rule card game.', 'Temperature drop stories.'],
      exit: ['(−7) × 8.', '(−45) ÷ (−9).', 'Sign of a product of 5 negatives.'], homework: 'Write 5 real-life situations with multiplying negative numbers (losses over days, falling temperature).'
    },
    slides: [{ t: 'Operations with Integers', b: ['Patterns for ×', 'Sign rules', 'Division', 'Properties'] }, { t: 'Check yourself', b: ['(−6) × (−7)?', '56 ÷ (−8)?'] }],
    fs: { groups: [['Signs', [['+ × +, − × −', '+'], ['+ × −, − × +', '−'], ['÷', 'same rules']]], ['Special', [['a × 0', '0'], ['a ÷ 0', 'undefined'], ['Even count of −', '+']]], ['Properties', [['Commutative', 'ab = ba'], ['Distributive', 'a(b + c) = ab + ac']]]],
      ex: [['(−4) × (−3)', '12'], ['(−12) ÷ 3', '−4']], rem: ['Count negative signs.', 'Use brackets for negatives.', 'Never divide by zero.'] }
  });
})();
