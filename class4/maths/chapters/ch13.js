/*
TOOL:    class4_maths_ch13
FAMILY:  CBSE_REVISION / Class 4 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 13 The Transport Museum (times tables, times 10, multiplying by splitting, dividing with remainders) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 13, part: 'All chapters', short: 'Multiply and divide', title: 'The Transport Museum',
    blurb: 'Multiplication and division with vehicles, tickets and passengers: building tables, times 10, splitting to multiply (26 × 15 = 26 × 10 + 26 × 5), mystery matrices and division with remainders.',
    revise: {
      oneLine: 'Times 10 puts a 0 at the end: 26 × 10 = 260. Split a hard product into easy ones: 26 × 15 = 26 × 10 + 26 × 5 = 260 + 130 = 390. Division shares or groups; what is left is the remainder: 75 ÷ 8 = 9 remainder 3.',
      sections: [
        { h: 'Splitting', html: `<p>5 × 15 = 5 × 10 + 5 × 5 = 50 + 25 = 75 (cut the array into two parts).</p>` },
        { h: 'Building tables', html: `<p>× 4 = double, double. × 8 = double three times. × 9 = × 10 − 1 group.</p>` },
        { h: 'Division', html: `<p>Each bus holds 40; 130 children need 130 ÷ 40 = 3 remainder 10 → 4 buses.</p>` }
      ],
      formulas: [['× 10', 'add a zero'], ['Split', 'a × (b + c) = a × b + a × c'], ['× 9', '× 10 − × 1'], ['Check ÷', 'q × d + r = total']],
      terms: [['Product', 'answer of ×'], ['Quotient', 'answer of ÷'], ['Remainder', 'left over']],
      traps: ['Forgetting one part of the split.', 'Remainder ≥ divisor.', 'Rounding up when every item needs a place (buses).'],
      bridge: '<p>Class 5 multiplies 3-digit numbers and divides by 2-digit numbers.</p>'
    },
    explore: [
      { title: 'Split the array', intro: 'Choose the product; the array splits into tens and ones.',
        build(el, K) { let a = 6, n = 15; const row = K.row(el); K.slider(row, 'rows', 2, 9, 1, a, v => { a = v; b.redraw(); }); K.slider(row, 'columns', 11, 29, 1, n, v => { n = v; b.redraw(); }); const b = new K.Board(el, { xmin: -0.5, xmax: 30, ymin: -1.5, ymax: 10, axes: false, grid: 0 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const t = Math.floor(n / 10) * 10, o = n - t; b.rect(0, 0, t, a, { fill: C.blueL, color: C.blue, w: 3 }); b.rect(t + 0.4, 0, o, a, { fill: C.orangeL, color: C.orange, w: 3 }); for (let i = 1; i < a; i++) { b.line(0, i, t, i, { color: C.blue, w: 0.6 }); b.line(t + 0.4, i, t + 0.4 + o, i, { color: C.orange, w: 0.6 }); }
            b.text(t / 2, a / 2, `${a} × ${t} = ${a * t}`, { font: 'bold 15px' }); if (o) b.text(t + 0.4 + o / 2, a + 0.7, `${a} × ${o} = ${a * o}`, { font: 'bold 13px' });
            rd.innerHTML = `${a} × ${n} = ${a} × ${t} + ${a} × ${o} = ${a * t} + ${a * o} = <b>${a * n}</b>`; };
          b.redraw(); return null; } },
      { title: 'Buses for a school trip', intro: 'How many buses are needed? Press <kbd>S</kbd> to fill one bus at a time.',
        build(el, K) { let ch = 130, cap = 40; const row = K.row(el); K.slider(row, 'children', 20, 250, 5, ch, v => { ch = v; an.reset(); }); K.slider(row, 'seats per bus', 20, 60, 5, cap, v => { cap = v; an.reset(); }); const rd = K.read(el); const an = new K.Anim(13, () => draw(), { ms: 500 });
          function draw() { const full = Math.floor(ch / cap), r = ch % cap, need = full + (r ? 1 : 0), k = Math.min(an.i, need); rd.innerHTML = `<div style="font-size:20px">${Array.from({ length: k }, (_, i) => `🚌<small>${i < full ? cap : r}</small>`).join(' ')}</div>${ch} ÷ ${cap} = ${full} remainder ${r} → <b>${need} bus${need === 1 ? '' : 'es'}</b>${r ? ` (the last carries ${r})` : ''}`; } K.anim(el, an); draw(); return an; } }
    ],
    gens: [
      { title: 'Times 10', gen(R) { const n = R.int(11, 99); return { q: `${n} × 10 = ?`, a: String(n * 10), ans: n * 10 }; } },
      { title: 'Split to multiply', gen(R) { const a = R.int(3, 9), n = R.int(12, 29); const t = Math.floor(n / 10) * 10; return { q: `${a} × ${n} = ?`, a: String(a * n), ans: a * n, s: `${a} × ${t} + ${a} × ${n - t}` }; } },
      { title: 'Tickets', levels: [2, 3], gen(R) { const p = R.int(12, 35), k = R.int(11, 19); return { q: `A museum ticket costs ₹${p}. Cost of ${k} tickets?`, a: `₹${p * k}`, ans: p * k, s: `${p} × 10 + ${p} × ${k - 10}` }; } },
      { title: 'Divide with remainder', gen(R) { const d = R.int(3, 9), q = R.int(4, 12), r = R.int(0, d - 1); return { q: `${d * q + r} ÷ ${d} = ?`, a: r ? `${q} remainder ${r}` : String(q), ans: q }; } },
      { title: 'How many vehicles', levels: [2, 3], gen(R) { const cap = R.pick([4, 6, 8, 40, 50]), n = cap * R.int(2, 6) + R.int(1, cap - 1); const need = Math.ceil(n / cap); return { q: `${n} people; each ${cap > 10 ? 'bus' : 'car'} takes ${cap}. How many are needed?`, a: String(need), ans: need }; } }
    ],
    quiz: [
      { q: '26 × 10', o: ['260', '2600', '36', '206'], a: 0, e: 'Add a zero.' }, { q: '26 × 15', o: ['390', '260', '130', '410'], a: 0, e: '260 + 130.' },
      { q: '5 × 15', o: ['75', '50', '25', '65'], a: 0, e: '50 + 25.' }, { q: '75 ÷ 8', o: ['9 r 3', '9', '8 r 11', '10 r 5'], a: 0, e: '72 + 3.' },
      { q: '130 children, 40 per bus', o: ['4 buses', '3 buses', '3.25 buses', '5 buses'], a: 0, e: 'Round up.' }, { q: '× 4 is', o: ['double, double', 'add 4', 'half', '× 10 − 4'], a: 0, e: 'Twice doubled.' },
      { q: '7 × 9', o: ['63', '72', '56', '79'], a: 0, e: '70 − 7.' }, { q: '8 × 25', o: ['200', '180', '225', '250'], a: 0, e: '4 quarters × 2.' },
      { q: 'Remainder must be', o: ['less than the divisor', 'more', 'zero', 'any'], a: 0, e: 'Otherwise share more.' }, { q: '12 × 12', o: ['144', '124', '122', '154'], a: 0, e: '120 + 24.' },
      { q: 'Check 9 r 3 for ÷ 8', o: ['9 × 8 + 3', '9 × 3 + 8', '9 + 8 + 3', '8 × 3'], a: 0, e: 'q × d + r.' }
    ],
    teach: {
      outcomes: ['Use × 10 and splitting', 'Build tables from known facts', 'Divide with remainders and interpret them'],
      periods: [{ t: 'Multiplying', flow: [['10 min', 'Transport museum story.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Ticket problems.']] }, { t: 'Dividing', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Remainder stories.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Split part missed.', 'Remainder ignored in context.'], activities: ['Mystery matrix puzzles.', 'Plan a class trip.'],
      exit: ['7 × 18 by splitting.', '95 ÷ 6.', 'Buses for 170 at 45 each.'], homework: 'Count wheels on vehicles in your street. Use multiplication to find the total.'
    },
    slides: [{ t: 'The Transport Museum', b: ['× 10', 'Splitting', 'Building tables', 'Remainders'] }, { t: 'Check yourself', b: ['8 × 23?', '100 ÷ 7?'] }],
    fs: { groups: [['Multiply', [['× 10', 'add 0'], ['Split', '6 × 15 = 60 + 30'], ['× 9', '× 10 − × 1']]], ['Divide', [['75 ÷ 8', '9 r 3'], ['Check', '9 × 8 + 3 = 75'], ['Every person needs a seat', 'round up']]]],
      ex: [['26 × 15', '390'], ['130 ÷ 40', '3 r 10 → 4 buses']], rem: ['Split into tens and ones.', 'Remainder < divisor.', 'Think what the remainder means.'] }
  });
})();
