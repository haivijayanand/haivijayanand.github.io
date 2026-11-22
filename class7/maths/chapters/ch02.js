/*
TOOL:    class7_maths_ch02
FAMILY:  CBSE_REVISION / Class 7 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 2 Arithmetic Expressions (writing and evaluating expressions, terms, brackets, order of operations, comparing expressions) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 2, part: 'Part I', short: 'Arithmetic expressions', title: 'Arithmetic Expressions',
    blurb: 'Writing arithmetic expressions for situations, terms of an expression, brackets, the order of operations, swapping and grouping terms, removing brackets with a minus sign, and comparing expressions without evaluating.',
    revise: {
      oneLine: 'An expression like 30 − 5 × 4 + (8 + 2) is evaluated as brackets first, then multiplication/division, then addition/subtraction from left to right: 30 − 20 + 10 = 20. Write it as a sum of terms (30, −5 × 4, (8 + 2)); terms can be added in any order.',
      sections: [
        { h: 'Terms', html: `<p>13 − 2 + 6 has terms 13, −2, +6. 5 × 4 − 3 has terms 5 × 4 and −3. Swapping or grouping terms does not change the value.</p>` },
        { h: 'Brackets and minus', html: `<p>a − (b + c) = a − b − c; a − (b − c) = a − b + c. 200 − (40 + 30) = 200 − 40 − 30 = 130.</p>` },
        { h: 'Distributive', html: `<p>4 × (25 + 3) = 4 × 25 + 4 × 3 = 112. 98 × 7 = (100 − 2) × 7 = 686.</p>` }
      ],
      formulas: [['Order', 'brackets → × ÷ → + − (left to right)'], ['a − (b + c)', 'a − b − c'], ['a − (b − c)', 'a − b + c'], ['a × (b + c)', 'a × b + a × c']],
      terms: [['Expression', 'numbers with operations'], ['Term', 'parts joined by + or −'], ['Value', 'result of evaluating']],
      traps: ['Working left to right ignoring × before +.', 'Sign change when removing brackets after −.', '6 − 2 + 1 is 5, not 3.'],
      bridge: '<p>Ch 4 uses letters in place of numbers.</p>'
    },
    explore: [
      { title: 'Order of operations', intro: 'Press <kbd>S</kbd> to evaluate one step at a time.',
        build(el, K) { const E = [['30 − 5 × 4 + (8 + 2)', ['30 − 5 × 4 + 10', '30 − 20 + 10', '10 + 10', '20']], ['48 ÷ (2 + 6) × 3 − 1', ['48 ÷ 8 × 3 − 1', '6 × 3 − 1', '18 − 1', '17']], ['100 − (40 − 15) + 2 × 7', ['100 − 25 + 2 × 7', '100 − 25 + 14', '75 + 14', '89']], ['6 − 2 + 1', ['4 + 1', '5']]]; let k = 0; const row = K.row(el); K.select(row, 'expression', E.map(e => e[0]), i => { k = i; an.reset(); }); const rd = K.read(el); const an = new K.Anim(4, () => draw(), { ms: 900 });
          function draw() { const s = E[k][1], m = Math.min(an.i, s.length); rd.innerHTML = `<div style="font-size:22px;font-family:Cambria,serif">${E[k][0]}</div>${s.slice(0, m).map(x => `<div style="font-size:20px;font-family:Cambria,serif">= ${x}</div>`).join('')}${m === s.length ? '<div>done: brackets, then × and ÷, then + and − from the left</div>' : ''}`; } K.anim(el, an); draw(); return an; } },
      { title: 'Removing brackets', intro: 'See a − (b + c) and a − (b − c) as subtractions of terms.',
        build(el, K) { let a = 200, b = 40, c = 30, op = 0; const row = K.row(el); K.slider(row, 'a', 50, 300, 10, a, v => { a = v; draw(); }); K.slider(row, 'b', 5, 90, 5, b, v => { b = v; draw(); }); K.slider(row, 'c', 5, 60, 5, c, v => { c = v; draw(); }); K.select(row, 'inside', ['b + c', 'b − c'], i => { op = i; draw(); }); const rd = K.read(el);
          function draw() { const inner = op ? b - c : b + c; rd.innerHTML = `<div style="font-size:20px;font-family:Cambria,serif">${a} − (${b} ${op ? '−' : '+'} ${c}) = ${a} − ${inner} = <b>${a - inner}</b></div><div style="font-size:20px;font-family:Cambria,serif">${a} − ${b} ${op ? '+' : '−'} ${c} = <b>${op ? a - b + c : a - b - c}</b></div>a minus sign before brackets changes the sign of every term inside`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Evaluate', gen(R) { const a = R.int(10, 60), b = R.int(2, 9), c = R.int(2, 9), d = R.int(1, 20); return { q: `${a} − ${b} × ${c} + ${d} = ?`, a: String(a - b * c + d), ans: a - b * c + d }; } },
      { title: 'With brackets', gen(R) { const a = R.int(2, 9), b = R.int(2, 12), c = R.int(2, 12), d = R.int(1, 30); return { q: `${a} × (${b} + ${c}) − ${d} = ?`, a: String(a * (b + c) - d), ans: a * (b + c) - d }; } },
      { title: 'Remove brackets', gen(R) { const a = R.int(100, 500), b = R.int(10, 90), c = R.int(5, 60); return R.chance(.5) ? { q: `Write without brackets and evaluate: ${a} − (${b} + ${c})`, a: `${a} − ${b} − ${c} = ${a - b - c}`, ans: a - b - c } : { q: `Write without brackets and evaluate: ${a} − (${b} − ${c})`, a: `${a} − ${b} + ${c} = ${a - b + c}`, ans: a - b + c }; } },
      { title: 'Smart multiplication', levels: [2, 3], gen(R) { const n = R.pick([98, 99, 101, 102, 199, 201]), m = R.int(3, 9); const base = Math.round(n / 100) * 100, diff = n - base; return { q: `Compute ${n} × ${m} smartly.`, a: `(${base} ${diff < 0 ? '−' : '+'} ${Math.abs(diff)}) × ${m} = ${base * m} ${diff < 0 ? '−' : '+'} ${Math.abs(diff) * m} = ${n * m}`, ans: n * m }; } },
      { title: 'Compare without computing', levels: [3], gen(R) { const a = R.int(100, 400), b = R.int(10, 90), c = R.int(1, 9); return { q: `Which is bigger: ${a} − ${b} + ${c} or ${a} − (${b} + ${c})? By how much?`, a: `${a} − ${b} + ${c}, by ${2 * c}`, ans: 2 * c }; } }
    ],
    quiz: [
      { q: '30 − 5 × 4 + (8 + 2)', o: ['20', '110', '0', '40'], a: 0, e: '30 − 20 + 10.' }, { q: '6 − 2 + 1', o: ['5', '3', '9', '4'], a: 0, e: 'Left to right.' },
      { q: '200 − (40 + 30) =', o: ['200 − 40 − 30', '200 − 40 + 30', '200 + 40 − 30', '160 + 30'], a: 0, e: 'Signs flip.' }, { q: '100 − (40 − 15)', o: ['75', '45', '55', '125'], a: 0, e: '100 − 25.' },
      { q: '98 × 7', o: ['686', '696', '676', '700'], a: 0, e: '700 − 14.' }, { q: 'Terms of 13 − 2 + 6', o: ['13, −2, +6', '13, 2, 6', '11, 6', '17'], a: 0, e: 'With signs.' },
      { q: '48 ÷ (2 + 6) × 3', o: ['18', '2', '72', '6'], a: 0, e: '6 × 3.' }, { q: '4 × (25 + 3)', o: ['112', '103', '100', '28'], a: 0, e: '100 + 12.' },
      { q: 'Multiplication before', o: ['addition', 'brackets', 'nothing', 'division always'], a: 0, e: 'Order.' }, { q: '5 + 3 × 2', o: ['11', '16', '13', '10'], a: 0, e: '5 + 6.' },
      { q: 'a − (b − c) =', o: ['a − b + c', 'a − b − c', 'a + b − c', 'a + b + c'], a: 0, e: 'Signs flip.' }
    ],
    teach: {
      outcomes: ['Write expressions for situations', 'Evaluate with correct order', 'Remove brackets and use distributivity'],
      periods: [{ t: 'Order of operations', flow: [['10 min', 'Shopping-bill expressions.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Terms.']] }, { t: 'Brackets', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Smart multiplication.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Left-to-right only.', 'Bracket sign errors.'], activities: ['Make 24 from 4 numbers.', 'Expression matching cards.'],
      exit: ['50 − 4 × (6 + 3).', 'Remove brackets: 90 − (35 − 12).', '99 × 8 smartly.'], homework: 'Write an expression for a family grocery bill with discounts and evaluate it two ways.'
    },
    slides: [{ t: 'Arithmetic Expressions', b: ['Expressions and terms', 'Order of operations', 'Brackets with minus', 'Distributivity'] }, { t: 'Check yourself', b: ['7 + 3 × (10 − 4)?', '500 − (120 − 20) without brackets?'] }],
    fs: { groups: [['Order', [['1', 'brackets'], ['2', '× and ÷'], ['3', '+ and − from the left']]], ['Brackets', [['a − (b + c)', 'a − b − c'], ['a − (b − c)', 'a − b + c'], ['a(b + c)', 'ab + ac']]], ['Terms', [['13 − 2 + 6', 'terms 13, −2, 6'], ['Swap/group', 'value unchanged']]]],
      ex: [['30 − 5 × 4 + (8 + 2)', '20'], ['98 × 7', '686']], rem: ['× before +.', 'Flip signs after a minus.', 'Use distributivity to compute fast.'] }
  });
})();
