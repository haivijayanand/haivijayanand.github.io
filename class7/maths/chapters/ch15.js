/*
TOOL:    class7_maths_ch15
FAMILY:  CBSE_REVISION / Class 7 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 15 Finding the Unknown (Part II Ch 7: equations from stories, balance model, solving by undoing, checking, simple linear equations) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const w = n => String(n).replace('-', '−');
  G9.register({
    no: 15, part: 'Part II', short: 'Equations', title: 'Finding the Unknown',
    blurb: 'Part II Chapter 7. Turning stories and puzzles into equations, the balance model, solving by doing the same to both sides (undoing operations in reverse order), checking solutions, and equations with the unknown on both sides.',
    revise: {
      oneLine: 'An equation says two expressions are equal: 3x + 5 = 20. Keep the balance by doing the same thing to both sides: subtract 5 (3x = 15), then divide by 3 (x = 5). Check: 3 × 5 + 5 = 20 ✔. For 5x − 4 = 2x + 11, bring x-terms together: 3x = 15, x = 5.',
      sections: [
        { h: 'Writing equations', html: `<p>"I think of a number, double it and add 7 to get 31" → 2n + 7 = 31.</p>` },
        { h: 'Undoing', html: `<p>Undo in reverse order: last done is first undone. (n − 4) ÷ 3 = 6 → n − 4 = 18 → n = 22.</p>` },
        { h: 'Unknown on both sides', html: `<p>7y + 3 = 4y + 15 → 3y = 12 → y = 4.</p>` }
      ],
      formulas: [['Balance rule', 'same operation on both sides'], ['ax + b = c', 'x = (c − b)/a'], ['Check', 'substitute back'], ['Transpose', '+ becomes −, × becomes ÷']],
      terms: [['Equation', 'statement of equality'], ['Solution', 'value that makes it true'], ['Variable', 'unknown letter-number']],
      traps: ['Doing an operation to only one side.', 'Undoing in the wrong order.', 'Sign errors when moving terms.'],
      bridge: '<p>Class 8 (Algebra Play) solves more equations and puzzles.</p>'
    },
    explore: [
      { title: 'Balance', intro: 'Boxes hold the unknown x; weights are units. Press <kbd>S</kbd> to do the next balancing step.',
        build(el, K) { let a = 3, b = 5, x = 5; const row = K.row(el); K.slider(row, 'boxes (a)', 1, 6, 1, a, v => { a = v; an.reset(); }); K.slider(row, 'extra units (b)', 0, 10, 1, b, v => { b = v; an.reset(); }); K.slider(row, 'secret x', 1, 8, 1, x, v => { x = v; an.reset(); }); const rd = K.read(el); const an = new K.Anim(3, () => draw(), { ms: 900 });
          function draw() { const c = a * x + b, k = an.i; const L = k === 0 ? `${'📦'.repeat(a)} ${'⚪'.repeat(b)}` : k === 1 ? `${'📦'.repeat(a)}` : '📦', R = k === 0 ? `${'⚪'.repeat(Math.min(c, 40))}` : k === 1 ? `${'⚪'.repeat(a * x)}` : `${'⚪'.repeat(x)}`; const eq = [`${a}x + ${b} = ${c}`, `${a}x = ${c - b}`, `x = ${x}`][Math.min(k, 2)];
            rd.innerHTML = `<div style="display:flex;gap:24px;align-items:center;font-size:20px"><div style="border-bottom:4px solid var(--blue,#1d4ed8);min-width:180px;text-align:center">${L}</div><div>⚖️</div><div style="border-bottom:4px solid var(--orange,#ea580c);min-width:180px;text-align:center;word-break:break-all">${R}</div></div><div style="font-size:20px;font-family:Cambria,serif;margin-top:6px"><b>${eq}</b></div>${['start', `remove ${b} units from both pans`, `share both pans into ${a} equal parts`][Math.min(k, 2)]}${k >= 2 ? ` · check: ${a} × ${x} + ${b} = ${c} ✔` : ''}`; }
          K.anim(el, an); draw(); return an; } },
      { title: 'Think of a number', intro: 'Choose the steps; then undo them in reverse.',
        build(el, K) { let m = 3, p = 7, r = 34; const row = K.row(el); K.slider(row, 'multiply by', 2, 9, 1, m, v => { m = v; draw(); }); K.slider(row, 'then add', -10, 20, 1, p, v => { p = v; draw(); }); K.slider(row, 'result', -20, 100, 1, r, v => { r = v; draw(); }); const rd = K.read(el);
          function draw() { const n = (r - p) / m; rd.innerHTML = `<div style="font-size:20px;font-family:Cambria,serif">${m}n ${p < 0 ? '−' : '+'} ${Math.abs(p)} = ${w(r)}</div>undo "add ${w(p)}": ${m}n = ${w(r)} ${p < 0 ? '+' : '−'} ${Math.abs(p)} = ${w(r - p)} · undo "× ${m}": n = ${w(r - p)} ÷ ${m} = <b>${Number.isInteger(n) ? w(n) : w(+n.toFixed(3))}</b>${Number.isInteger(n) ? '' : ' (not a whole number)'}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'One step', gen(R) { const x = R.int(-12, 20), b = R.int(2, 30); return R.chance(.5) ? { q: `x + ${b} = ${w(x + b)}. Find x.`, a: w(x), ans: x } : { q: `x − ${b} = ${w(x - b)}. Find x.`, a: w(x), ans: x }; } },
      { title: 'Two steps', gen(R) { const x = R.int(-9, 15), a = R.int(2, 9), b = R.int(-20, 20); return { q: `${a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${w(a * x + b)}. Find x.`, a: w(x), ans: x }; } },
      { title: 'Word problem', gen(R) { const n = R.int(3, 30), m = R.int(2, 5), p = R.int(1, 20); return { q: `I think of a number, multiply it by ${m} and add ${p}. I get ${m * n + p}. What is my number?`, a: `${m}n + ${p} = ${m * n + p} → n = ${n}`, ans: n }; } },
      { title: 'Both sides', levels: [2, 3], gen(R) { const x = R.int(-6, 10), a = R.int(4, 9), c = R.int(1, a - 1), b = R.int(-10, 10); const d = (a - c) * x + b; return { q: `${a}y ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${c}y ${d < 0 ? '−' : '+'} ${Math.abs(d)}. Find y.`, a: w(x), ans: x }; } },
      { title: 'Brackets', levels: [3], gen(R) { const x = R.int(1, 12), k = R.int(2, 6), b = R.int(1, 9); return { q: `${k}(x + ${b}) = ${k * (x + b)}. Find x.`, a: String(x), ans: x }; } }
    ],
    quiz: [
      { q: '3x + 5 = 20', o: ['x = 5', 'x = 15', 'x = 25/3', 'x = 3'], a: 0, e: '3x = 15.' }, { q: 'Balance rule', o: ['same operation on both sides', 'change one side', 'add to the left only', 'guess'], a: 0, e: 'Keep equal.' },
      { q: '2n + 7 = 31', o: ['n = 12', 'n = 19', 'n = 14', 'n = 24'], a: 0, e: '2n = 24.' }, { q: '(n − 4) ÷ 3 = 6', o: ['n = 22', 'n = 14', 'n = 6', 'n = 18'], a: 0, e: 'Undo ÷ then −.' },
      { q: '7y + 3 = 4y + 15', o: ['y = 4', 'y = 6', 'y = 12', 'y = 3'], a: 0, e: '3y = 12.' }, { q: 'x − 9 = −4', o: ['x = 5', 'x = −13', 'x = 13', 'x = −5'], a: 0, e: 'Add 9.' },
      { q: 'Check a solution by', o: ['substituting it back', 'adding 1', 'drawing a graph only', 'asking'], a: 0, e: 'Verify.' }, { q: '5(x + 2) = 35', o: ['x = 5', 'x = 7', 'x = 33', 'x = 3'], a: 0, e: 'x + 2 = 7.' },
      { q: '−3x = 12', o: ['x = −4', 'x = 4', 'x = 15', 'x = −36'], a: 0, e: '÷ −3.' }, { q: 'x/4 = 9', o: ['x = 36', 'x = 13', 'x = 2.25', 'x = 5'], a: 0, e: '× 4.' },
      { q: 'Undo in', o: ['reverse order', 'the same order', 'any order', 'alphabetical order'], a: 0, e: 'Last done, first undone.' }
    ],
    teach: {
      outcomes: ['Write equations for situations', 'Solve linear equations by balancing', 'Check solutions'],
      periods: [{ t: 'Balance', flow: [['10 min', 'Pan balance with packets.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Two-step equations.']] }, { t: 'Puzzles', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Unknown on both sides.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['One-side operations.', 'Order of undoing.'], activities: ['Think-of-a-number game.', 'Matchbox balance.'],
      exit: ['4x − 7 = 21.', '6y + 2 = 2y + 18.', 'Write and solve an age puzzle.'], homework: 'Make 3 "think of a number" puzzles for your family and write the equations and solutions.'
    },
    slides: [{ t: 'Finding the Unknown', b: ['Equations from stories', 'Balance model', 'Undoing', 'Unknown on both sides', 'Checking'] }, { t: 'Check yourself', b: ['5x − 3 = 32?', '9a + 1 = 4a + 26?'] }],
    fs: { groups: [['Solving', [['Balance', 'same to both sides'], ['Undo', 'reverse order'], ['Both sides', 'collect x on one side']]], ['Examples', [['3x + 5 = 20', 'x = 5'], ['(n − 4) ÷ 3 = 6', 'n = 22'], ['7y + 3 = 4y + 15', 'y = 4']]], ['Check', [['Substitute', 'both sides equal']]]],
      ex: [['2n + 7 = 31', 'n = 12'], ['5x − 4 = 2x + 11', 'x = 5']], rem: ['Write the equation first.', 'One step at a time.', 'Always check.'] }
  });
})();
