/*
TOOL:    class3_maths_ch09
FAMILY:  CBSE_REVISION / Class 3 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 9 House of Hundreds - II (adding and subtracting 3-digit numbers) - revise, 2 explore panels (column addition with regrouping, column subtraction), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const col = (a, b, op) => { const A = String(a).padStart(3, ' '), B = String(b).padStart(3, ' '), Cc = String(op ? a - b : a + b).padStart(3, ' '); return `<pre style="font:20px Consolas;line-height:1.3;margin:6px 0">  H T O\n  ${A.split('').join(' ')}\n${op ? '−' : '+'} ${B.split('').join(' ')}\n  ─────\n  ${Cc.split('').join(' ')}</pre>`; };
  G9.register({
    no: 9, part: 'All chapters', short: '3-digit add and subtract', title: 'House of Hundreds - II',
    blurb: 'Adding and subtracting three-digit numbers in columns with regrouping (carrying and borrowing), estimating and checking.',
    revise: {
      oneLine: 'Write hundreds under hundreds, tens under tens, ones under ones. Add from the ones: 10 ones become 1 ten, 10 tens become 1 hundred. To subtract, borrow 1 ten as 10 ones when needed.',
      sections: [
        { h: 'Adding', html: `<p>358 + 274: ones 8 + 4 = 12 → write 2, carry 1 ten; tens 5 + 7 + 1 = 13 → write 3, carry 1 hundred; hundreds 3 + 2 + 1 = 6 → 632.</p>` },
        { h: 'Subtracting', html: `<p>532 − 278: 2 − 8 cannot, borrow → 12 − 8 = 4; tens 2 − 7 cannot, borrow → 12 − 7 = 5; hundreds 4 − 2 = 2 → 254.</p>` },
        { h: 'Check and estimate', html: `<p>254 + 278 = 532 ✔. Estimate 358 + 274 ≈ 360 + 270 = 630.</p>` }
      ],
      formulas: [['Carry', '10 ones → 1 ten; 10 tens → 1 hundred'], ['Borrow', '1 ten → 10 ones'], ['Check', 'difference + subtracted = start'], ['Estimate', 'round to tens or hundreds']],
      terms: [['Regroup', 'carry or borrow'], ['Column', 'digits of the same place'], ['Estimate', 'nearby easy numbers']],
      traps: ['Forgetting the carried 1.', 'Subtracting smaller digit from bigger regardless of position.', 'Not lining up places.'],
      bridge: '<p>Ch 12 (Give and Take) practises these in stories.</p>'
    },
    explore: [
      { title: 'Column addition', intro: 'Choose two numbers; the carries are shown.',
        build(el, K) { let a = 358, b = 274; const row = K.row(el); K.slider(row, 'first', 100, 600, 1, a, v => { a = v; draw(); }); K.slider(row, 'second', 100, 399, 1, b, v => { b = v; draw(); }); const rd = K.read(el);
          function draw() { const o = a % 10 + b % 10, t = Math.floor(a / 10) % 10 + Math.floor(b / 10) % 10 + (o > 9 ? 1 : 0); rd.innerHTML = `${col(a, b, 0)}ones ${a % 10} + ${b % 10} = ${o}${o > 9 ? ' → carry 1 ten' : ''} · tens ${t}${t > 9 ? ' → carry 1 hundred' : ''} · total <b>${a + b}</b>`; } draw(); return null; } },
      { title: 'Column subtraction', intro: 'Choose two numbers; borrowing is explained.',
        build(el, K) { let a = 532, b = 278; const row = K.row(el); K.slider(row, 'from', 200, 999, 1, a, v => { a = v; b = Math.min(b, a); draw(); }); K.slider(row, 'take away', 100, 999, 1, b, v => { b = Math.min(v, a); draw(); }); const rd = K.read(el);
          function draw() { const bo = a % 10 < b % 10, bt = Math.floor(a / 10) % 10 - (bo ? 1 : 0) < Math.floor(b / 10) % 10; rd.innerHTML = `${col(a, b, 1)}${bo ? 'ones: borrow 1 ten · ' : ''}${bt ? 'tens: borrow 1 hundred · ' : ''}difference <b>${a - b}</b> · check ${a - b} + ${b} = ${a}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Add 3-digit numbers', gen(R, L) { const a = R.int(100, 499), b = L === 1 ? R.int(100, 400) : R.int(150, 499); if (L === 1 && (a % 10 + b % 10 > 9 || Math.floor(a / 10) % 10 + Math.floor(b / 10) % 10 > 9)) return this.gen(R, L); return { q: `${a} + ${b} = ?`, a: String(a + b), ans: a + b }; } },
      { title: 'Subtract 3-digit numbers', gen(R) { const a = R.int(300, 999), b = R.int(100, a - 50); return { q: `${a} − ${b} = ?`, a: String(a - b), ans: a - b }; } },
      { title: 'Story problem', gen(R) { const a = R.int(150, 500), b = R.int(100, 400); return R.chance(.5) ? { q: `A school has ${a} boys and ${b} girls. How many children?`, a: String(a + b), ans: a + b } : { q: `A farmer had ${a + b} mangoes and sold ${b}. How many left?`, a: String(a), ans: a }; } },
      { title: 'Estimate', levels: [2, 3], gen(R) { const a = R.int(110, 490), b = R.int(110, 490); const e = Math.round(a / 100) * 100 + Math.round(b / 100) * 100; return { q: `Estimate ${a} + ${b} to the nearest hundred.`, a: `about ${e} (exact ${a + b})`, ans: e, tol: 100 }; } },
      { title: 'Find the mistake', levels: [3], gen(R) { const a = R.int(300, 800), b = R.int(100, a - 100); const w = a - b + R.pick([10, 100, -10]); return { q: `Neha wrote ${a} − ${b} = ${w}. Is she right? Check by adding.`, a: `No: ${w} + ${b} = ${w + b}, not ${a}. Correct: ${a - b}` }; } }
    ],
    quiz: [
      { q: '358 + 274', o: ['632', '522', '532', '6312'], a: 0, e: 'Carry twice.' }, { q: '532 − 278', o: ['254', '354', '346', '264'], a: 0, e: 'Borrow twice.' },
      { q: '10 tens =', o: ['1 hundred', '1 ten', '10 ones', '1000'], a: 0, e: 'Regroup.' }, { q: '400 + 300', o: ['700', '7000', '70', '43'], a: 0, e: 'Hundreds.' },
      { q: '900 − 1', o: ['899', '800', '901', '890'], a: 0, e: 'Count back.' }, { q: 'Check 600 − 245 = 355 by', o: ['355 + 245', '600 + 245', '355 − 245', '600 − 355'], a: 0, e: 'Add back.' },
      { q: 'Estimate 398 + 205', o: ['about 600', 'about 500', 'about 700', 'about 400'], a: 0, e: '400 + 200.' }, { q: '250 + 250', o: ['500', '400', '450', '2500'], a: 0, e: 'Double.' },
      { q: '1 hundred = ', o: ['10 tens', '100 tens', '1 ten', '10 hundreds'], a: 0, e: 'Regroup.' }, { q: '705 − 300', o: ['405', '305', '1005', '402'], a: 0, e: 'Hundreds.' },
      { q: '199 + 1', o: ['200', '1910', '190', '210'], a: 0, e: 'Next hundred.' }
    ],
    teach: {
      outcomes: ['Add and subtract 3-digit numbers with regrouping', 'Estimate and check'],
      periods: [{ t: 'Adding', flow: [['10 min', 'Blocks: carry a ten.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Practice.']] }, { t: 'Subtracting', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Check by adding.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Carry forgotten.', 'Bigger-from-smaller digit.'], activities: ['Place-value mat with blocks.', 'Shopkeeper bills.'],
      exit: ['467 + 285.', '603 − 247.', 'Estimate 512 + 389.'], homework: 'Make two adding and two subtracting problems with 3-digit numbers about your school.'
    },
    slides: [{ t: 'House of Hundreds - II', b: ['Column addition', 'Carry and borrow', 'Check and estimate'] }, { t: 'Check yourself', b: ['276 + 158?', '500 − 236?'] }],
    fs: { groups: [['Adding', [['Line up', 'H under H, T under T, O under O'], ['Carry', '10 ones → 1 ten']]], ['Subtracting', [['Borrow', '1 ten → 10 ones'], ['Across zero', '500 − 236: borrow from hundreds']]], ['Check', [['Add back', 'difference + subtracted'], ['Estimate', 'round to hundreds']]]],
      ex: [['358 + 274', '632'], ['532 − 278', '254']], rem: ['Start from the ones.', 'Write the carry.', 'Check by adding.'] }
  });
})();
