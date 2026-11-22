/*
TOOL:    class5_maths_ch06
FAMILY:  CBSE_REVISION / Class 5 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 6 The Dairy Farm (multiplying 2- and 3-digit numbers: area model and column method, estimating products) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const IN = n => n.toLocaleString('en-IN');
  G9.register({
    no: 6, part: 'All chapters', short: 'Multiplication', title: 'The Dairy Farm',
    blurb: 'Multiplication on a dairy farm: litres of milk per cow per day, weekly and monthly totals; multiplying 2- and 3-digit numbers by splitting (area model) and in columns; estimating products.',
    revise: {
      oneLine: 'Split numbers into tens and ones and multiply each part: 23 × 14 = 20 × 10 + 20 × 4 + 3 × 10 + 3 × 4 = 200 + 80 + 30 + 12 = 322. Column method: 23 × 4 = 92, 23 × 10 = 230, add: 322.',
      sections: [
        { h: 'Area model', html: `<p>Draw a rectangle 23 by 14, split into four parts, add the parts.</p>` },
        { h: 'Column method', html: `<p>Multiply by the ones, then by the tens (put a 0), then add the rows.</p>` },
        { h: 'Estimate', html: `<p>48 × 31 ≈ 50 × 30 = 1500; exact 1488.</p>` }
      ],
      formulas: [['× 10 / × 100', 'add one / two zeros'], ['Split', '(a + b) × c = a × c + b × c'], ['Order', 'a × b = b × a'], ['Estimate', 'round each, multiply']],
      terms: [['Product', 'answer'], ['Partial products', 'pieces to add'], ['Estimate', 'close easy answer']],
      traps: ['Forgetting the 0 when multiplying by tens.', 'Missing a part in the area model.', 'Adding the rows wrongly.'],
      bridge: '<p>Ch 9 divides; Class 6 multiplies larger numbers.</p>'
    },
    explore: [
      { title: 'Area model', intro: 'Choose two numbers; the rectangle splits into four parts.',
        build(el, K) { let a = 23, b = 14; const row = K.row(el); K.slider(row, 'first', 11, 49, 1, a, v => { a = v; bd.redraw(); }); K.slider(row, 'second', 11, 39, 1, b, v => { b = v; bd.redraw(); }); const bd = new K.Board(el, { xmin: -3, xmax: 52, ymin: -3, ymax: 42, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          bd.onDraw = () => { bd.clear(); const at = Math.floor(a / 10) * 10, ao = a % 10, bt = Math.floor(b / 10) * 10, bo = b % 10; const P = [[0, 0, at, bt, C.blueL, C.blue], [at, 0, ao, bt, C.orangeL, C.orange], [0, bt, at, bo, C.purpleL, C.purple], [at, bt, ao, bo, 'rgba(202,138,4,.2)', C.yellow]];
            P.forEach(([x, y, w, h, f, c]) => { if (w && h) { bd.rect(x, y, w, h, { fill: f, color: c, w: 2 }); bd.text(x + w / 2, y + h / 2, String(w * h), { font: 'bold 13px' }); } }); bd.text(at / 2, -1.5, String(at), { font: '12px' }); if (ao) bd.text(at + ao / 2, -1.5, String(ao), { font: '12px' }); bd.text(-1.5, bt / 2, String(bt), { font: '12px' }); if (bo) bd.text(-1.5, bt + bo / 2, String(bo), { font: '12px' });
            rd.innerHTML = `${a} × ${b} = ${at * bt} + ${ao * bt} + ${at * bo} + ${ao * bo} = <b>${a * b}</b>`; };
          bd.redraw(); return null; } },
      { title: 'Milk on the farm', intro: 'Set cows, litres per cow per day and days.',
        build(el, K) { let c = 24, l = 12, d = 30; const row = K.row(el); K.slider(row, 'cows', 5, 60, 1, c, v => { c = v; draw(); }); K.slider(row, 'litres per cow per day', 5, 20, 1, l, v => { l = v; draw(); }); K.slider(row, 'days', 1, 31, 1, d, v => { d = v; draw(); }); const rd = K.read(el);
          function draw() { const day = c * l; rd.innerHTML = `<div style="font-size:20px">${'🐄'.repeat(Math.min(c, 30))}${c > 30 ? '…' : ''}</div>per day: ${c} × ${l} = <b>${IN(day)} L</b> · in ${d} days: ${IN(day)} × ${d} = <b>${IN(day * d)} L</b> · estimate ${IN(Math.round(day / 100) * 100 * Math.round(d / 10) * 10 || day * d)} L`; } draw(); return null; } }
    ],
    gens: [
      { title: '× 10, × 100', gen(R) { const n = R.int(12, 999), k = R.pick([10, 100]); return { q: `${n} × ${k} = ?`, a: IN(n * k), ans: n * k }; } },
      { title: '2-digit × 1-digit', gen(R) { const a = R.int(12, 99), b = R.int(3, 9); return { q: `${a} × ${b} = ?`, a: String(a * b), ans: a * b }; } },
      { title: '2-digit × 2-digit', gen(R) { const a = R.int(12, 89), b = R.int(11, 49); return { q: `${a} × ${b} = ?`, a: IN(a * b), ans: a * b, s: `${a} × ${b % 10} + ${a} × ${b - b % 10}` }; } },
      { title: 'Milk problem', levels: [2, 3], gen(R) { const c = R.int(12, 48), l = R.int(8, 15); return { q: `A farm has ${c} cows; each gives ${l} litres a day. Milk in a day? In a week?`, a: `${c * l} L; ${IN(c * l * 7)} L`, ans: c * l }; } },
      { title: '3-digit × 2-digit', levels: [3], gen(R) { const a = R.int(102, 499), b = R.int(11, 39); return { q: `${a} × ${b} = ?`, a: IN(a * b), ans: a * b }; } }
    ],
    quiz: [
      { q: '23 × 14', o: ['322', '312', '332', '222'], a: 0, e: '230 + 92.' }, { q: '45 × 10', o: ['450', '4500', '55', '405'], a: 0, e: 'Add a zero.' },
      { q: '48 × 31 estimate', o: ['about 1500', 'about 1200', 'about 150', 'about 15 000'], a: 0, e: '50 × 30.' }, { q: 'When multiplying by tens, the row starts with', o: ['0', '1', '10', 'nothing'], a: 0, e: 'Place holder.' },
      { q: '25 × 4', o: ['100', '90', '125', '29'], a: 0, e: 'Quarters.' }, { q: '12 × 12', o: ['144', '124', '132', '24'], a: 0, e: '120 + 24.' },
      { q: '30 cows × 10 L', o: ['300 L', '40 L', '3000 L', '310 L'], a: 0, e: 'Multiply.' }, { q: '99 × 5', o: ['495', '445', '595', '500'], a: 0, e: '500 − 5.' },
      { q: '(20 + 3) × 4 =', o: ['80 + 12', '20 + 12', '80 + 3', '23 + 4'], a: 0, e: 'Split.' }, { q: '15 × 20', o: ['300', '35', '3000', '150'], a: 0, e: '15 × 2 × 10.' },
      { q: '16 × 25', o: ['400', '350', '41', '425'], a: 0, e: '4 × 100.' }
    ],
    teach: {
      outcomes: ['Multiply 2- and 3-digit numbers', 'Use area model and columns', 'Estimate products'],
      periods: [{ t: 'Area model', flow: [['10 min', 'Dairy farm story.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Squared-paper products.']] }, { t: 'Columns', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Column method.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Missing 0 in tens row.', 'Lost partial product.'], activities: ['Milk-record table.', 'Lattice multiplication.'],
      exit: ['34 × 26.', 'Estimate 59 × 41.', '128 × 10.'], homework: 'Find how much milk (or water) your family uses in a day; multiply to find a month and a year.'
    },
    slides: [{ t: 'The Dairy Farm', b: ['× 10 and × 100', 'Area model', 'Column method', 'Estimating'] }, { t: 'Check yourself', b: ['37 × 24?', 'Estimate 62 × 48?'] }],
    fs: { groups: [['Shortcuts', [['× 10', 'add 0'], ['× 100', 'add 00'], ['× 25', '× 100 ÷ 4']]], ['Methods', [['Area model', '4 parts'], ['Column', 'ones row + tens row (0)']]], ['Estimate', [['Round both', '48 × 31 ≈ 1500']]]],
      ex: [['23 × 14', '322'], ['45 × 32', '1440']], rem: ['Put the 0 in the tens row.', 'Add partial products carefully.', 'Estimate first.'] }
  });
})();
