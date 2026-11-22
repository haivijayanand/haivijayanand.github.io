/*
TOOL:    class5_maths_ch04
FAMILY:  CBSE_REVISION / Class 5 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 4 We the Travellers - II (adding and subtracting large numbers, estimating travel totals, budgets) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const IN = n => n.toLocaleString('en-IN');
  G9.register({
    no: 4, part: 'All chapters', short: 'Add and subtract large numbers', title: 'We the Travellers - II',
    blurb: 'Adding and subtracting numbers up to a lakh while planning trips: distances, fares and budgets; estimating by rounding; checking answers.',
    revise: {
      oneLine: 'Line up places and work from the ones, carrying and borrowing as needed. Estimate first by rounding to thousands, and check subtraction by adding back. A trip budget: add all costs, subtract from money available.',
      sections: [
        { h: 'Adding', html: `<p>24,685 + 38,947 = 63,632.</p>` },
        { h: 'Subtracting', html: `<p>60,000 − 27,384 = 32,616 (borrow across zeros). Check 32,616 + 27,384 = 60,000.</p>` },
        { h: 'Estimating', html: `<p>24,685 + 38,947 ≈ 25,000 + 39,000 = 64,000 — close to the exact answer.</p>` }
      ],
      formulas: [['Estimate', 'round to thousands'], ['Check', 'difference + subtracted'], ['Money left', 'budget − spent'], ['Return trip', '2 × one way']],
      terms: [['Budget', 'money planned to spend'], ['Fare', 'ticket cost'], ['Estimate', 'close easy answer']],
      traps: ['Across-zero borrowing.', 'Misaligned 4- and 5-digit numbers.', 'Forgetting one cost in a total.'],
      bridge: '<p>Ch 6 multiplies; Class 6 extends to crores.</p>'
    },
    explore: [
      { title: 'Trip budget', intro: 'Choose costs; see the total and the money left from ₹50,000.',
        build(el, K) { let t = 18450, h = 15600, f = 8240; const row = K.row(el); K.slider(row, 'train fare', 5000, 25000, 50, t, v => { t = v; draw(); }); K.slider(row, 'hotel', 5000, 25000, 100, h, v => { h = v; draw(); }); K.slider(row, 'food', 2000, 15000, 10, f, v => { f = v; draw(); }); const rd = K.read(el);
          function draw() { const s = t + h + f; rd.innerHTML = `₹${IN(t)} + ₹${IN(h)} + ₹${IN(f)} = <b>₹${IN(s)}</b> · estimate ₹${IN(Math.round(t / 1000) * 1000 + Math.round(h / 1000) * 1000 + Math.round(f / 1000) * 1000)} · ${s <= 50000 ? `left from ₹50,000: <b>₹${IN(50000 - s)}</b>` : `over budget by ₹${IN(s - 50000)}`}`; } draw(); return null; } },
      { title: 'Column method', intro: 'Pick two numbers and the operation.',
        build(el, K) { let a = 60000, b = 27384, op = 1; const row = K.row(el); K.slider(row, 'first', 10000, 99000, 1, a, v => { a = v; draw(); }); K.slider(row, 'second', 1000, 60000, 1, b, v => { b = v; draw(); }); K.select(row, 'operation', ['add', 'subtract'], i => { op = i; draw(); }); const s1 = row.querySelector('select'); if (s1) s1.value = 1; const rd = K.read(el);
          function draw() { const bb = op ? Math.min(a, b) : Math.min(b, 99999 - a), r = op ? a - bb : a + bb, w = String(Math.max(a, r)).length, f = n => String(n).padStart(w, ' ').split('').join(' '); rd.innerHTML = `<pre style="font:20px Consolas;line-height:1.3;margin:6px 0">  ${f(a)}\n${op ? '−' : '+'} ${f(bb)}\n  ${'─'.repeat(2 * w - 1)}\n  ${f(r)}</pre>${op ? `check ${IN(r)} + ${IN(bb)} = ${IN(r + bb)}` : `estimate ${IN(Math.round(a / 1000) * 1000 + Math.round(bb / 1000) * 1000)}`} · answer <b>${IN(r)}</b>`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Add', gen(R) { const a = R.int(10000, 59999), b = R.int(10000, 39999); return { q: `${IN(a)} + ${IN(b)} = ?`, a: IN(a + b), ans: a + b }; } },
      { title: 'Subtract', gen(R) { const a = R.int(30000, 99999), b = R.int(10000, a - 1000); return { q: `${IN(a)} − ${IN(b)} = ?`, a: IN(a - b), ans: a - b }; } },
      { title: 'Across zeros', levels: [2, 3], gen(R) { const a = R.int(2, 9) * 10000, b = R.int(1001, a - 1001); return { q: `${IN(a)} − ${IN(b)} = ?`, a: IN(a - b), ans: a - b }; } },
      { title: 'Budget', gen(R) { const m = R.int(3, 9) * 10000, s = [R.int(2000, 9000), R.int(2000, 9000), R.int(1000, 5000)]; const t = s.reduce((x, y) => x + y, 0); return { q: `A family has ₹${IN(m)}. They spend ₹${IN(s[0])} on tickets, ₹${IN(s[1])} on stay and ₹${IN(s[2])} on food. Money left?`, a: `₹${IN(m - t)}`, ans: m - t }; } },
      { title: 'Estimate', levels: [2, 3], gen(R) { const a = R.int(11000, 59000), b = R.int(11000, 39000); const e = Math.round(a / 1000) * 1000 + Math.round(b / 1000) * 1000; return { q: `Estimate ${IN(a)} + ${IN(b)} to the nearest thousand.`, a: `about ${IN(e)} (exact ${IN(a + b)})`, ans: e, tol: 2000 }; } }
    ],
    quiz: [
      { q: '24,685 + 38,947', o: ['63,632', '62,632', '63,532', '53,632'], a: 0, e: 'Carry.' }, { q: '60,000 − 27,384', o: ['32,616', '33,616', '32,626', '42,616'], a: 0, e: 'Borrow across zeros.' },
      { q: 'Check a subtraction by', o: ['adding back', 'subtracting again', 'multiplying', 'guessing'], a: 0, e: 'Inverse.' }, { q: 'Estimate 39,800 + 20,300', o: ['about 60,000', 'about 50,000', 'about 70,000', 'about 19,000'], a: 0, e: '40,000 + 20,000.' },
      { q: '99,999 + 1', o: ['1,00,000', '99,910', '10,000', '1,000,00'], a: 0, e: 'One lakh.' }, { q: 'Budget ₹40,000, spent ₹27,500: left', o: ['₹12,500', '₹13,500', '₹67,500', '₹2,500'], a: 0, e: 'Subtract.' },
      { q: 'One way 1,250 km; return trip', o: ['2,500 km', '1,250 km', '3,750 km', '125 km'], a: 0, e: 'Double.' }, { q: '50,000 − 1', o: ['49,999', '49,000', '50,001', '4,999'], a: 0, e: 'Count back.' },
      { q: '45,000 + 55,000', o: ['1,00,000', '90,000', '1,10,000', '10,000'], a: 0, e: 'Lakh.' }, { q: 'Fare total: 3 tickets of ₹1,500', o: ['₹4,500', '₹3,500', '₹1,503', '₹15,003'], a: 0, e: 'Add thrice.' },
      { q: '72,400 − 2,400', o: ['70,000', '74,800', '48,400', '72,000'], a: 0, e: 'Easy subtract.' }
    ],
    teach: {
      outcomes: ['Add and subtract to a lakh', 'Estimate and check', 'Solve budget problems'],
      periods: [{ t: 'Methods', flow: [['10 min', 'Travel story.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Across zeros.']] }, { t: 'Budgets', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Plan a class trip.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Across-zero borrowing.', 'Missed costs.'], activities: ['Trip planner with railway fares.', 'Estimation race.'],
      exit: ['45,678 + 29,345.', '80,000 − 36,459.', 'Budget problem.'], homework: 'Plan a family trip with a budget; list costs, total them and find money left.'
    },
    slides: [{ t: 'We the Travellers - II', b: ['Adding large numbers', 'Subtracting across zeros', 'Estimating', 'Budgets'] }, { t: 'Check yourself', b: ['36,789 + 45,678?', '70,000 − 28,456?'] }],
    fs: { groups: [['Methods', [['Line up', 'ones under ones'], ['Carry / borrow', 'one place at a time']]], ['Checks', [['Estimate', 'round to thousands'], ['Add back', 'difference + subtracted']]], ['Budgets', [['Total', 'add costs'], ['Left', 'money − total']]]],
      ex: [['24,685 + 38,947', '63,632'], ['60,000 − 27,384', '32,616']], rem: ['Estimate before calculating.', 'Borrow across zeros carefully.', 'List every cost.'] }
  });
})();
