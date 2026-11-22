/*
TOOL:    class4_maths_ch07
FAMILY:  CBSE_REVISION / Class 4 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 7 The Cleanest Village (adding and subtracting 4-digit numbers, estimating, smart strategies) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const col = (a, b, op) => { const r = op ? a - b : a + b, w = Math.max(String(a).length, String(b).length, String(r).length); const f = n => String(n).padStart(w, ' ').split('').join(' '); return `<pre style="font:20px Consolas;line-height:1.3;margin:6px 0">  ${f(a)}\n${op ? '−' : '+'} ${f(b)}\n  ${'─'.repeat(2 * w - 1)}\n  ${f(r)}</pre>`; };
  G9.register({
    no: 7, part: 'All chapters', short: 'Add and subtract', title: 'The Cleanest Village',
    blurb: 'Adding and subtracting numbers up to 10 000 with regrouping, using stories of a village clean-up (waste collected, trees planted), smart mental strategies and estimation.',
    revise: {
      oneLine: 'Line up the places and add or subtract from the ones, carrying or borrowing as needed. Estimate first by rounding to hundreds, and check subtraction by adding back. Mental tricks: 2 999 + 1 456 = 3 000 + 1 456 − 1.',
      sections: [
        { h: 'Column method', html: `<p>2 765 + 1 488 = 4 253 (carry in ones, tens, hundreds). 5 000 − 1 736 = 3 264 (borrow across zeros).</p>` },
        { h: 'Smart strategies', html: `<p>Round and adjust: 3 998 + 245 = 4 000 + 245 − 2 = 4 243. Count up to subtract: 5 000 − 4 875 → 125.</p>` },
        { h: 'Estimate and check', html: `<p>2 765 + 1 488 ≈ 2 800 + 1 500 = 4 300. Check 3 264 + 1 736 = 5 000.</p>` }
      ],
      formulas: [['Carry', '10 in a place → 1 to the next'], ['Borrow', '1 from the next place → 10'], ['Check', 'difference + subtracted = start'], ['Round and adjust', '+ 2 999 = + 3 000 − 1']],
      terms: [['Sum', 'answer of adding'], ['Difference', 'answer of subtracting'], ['Estimate', 'nearby easy answer']],
      traps: ['Borrowing across zeros (5 000 − 1 736).', 'Forgetting a carry into thousands.', 'Misaligned places.'],
      bridge: '<p>Ch 10 uses these with big census numbers.</p>'
    },
    explore: [
      { title: 'Column add and subtract', intro: 'Pick numbers and the operation.',
        build(el, K) { let a = 2765, b = 1488, op = 0; const row = K.row(el); K.slider(row, 'first', 1000, 9000, 1, a, v => { a = v; draw(); }); K.slider(row, 'second', 100, 5000, 1, b, v => { b = v; draw(); }); K.select(row, 'operation', ['add', 'subtract'], i => { op = i; draw(); }); const rd = K.read(el);
          function draw() { const bb = op ? Math.min(b, a) : b, r = op ? a - bb : a + bb; const est = op ? Math.round(a / 100) * 100 - Math.round(bb / 100) * 100 : Math.round(a / 100) * 100 + Math.round(bb / 100) * 100; rd.innerHTML = `${col(a, bb, op)}estimate (nearest hundreds): ${est} · exact <b>${r}</b>${op ? ` · check ${r} + ${bb} = ${r + bb}` : ''}`; } draw(); return null; } },
      { title: 'Village clean-up tally', intro: 'Press <kbd>S</kbd> to add a day of waste collected (kg).',
        build(el, K) { const days = [1245, 980, 1530, 870, 1610, 1325, 1150]; const rd = K.read(el); const an = new K.Anim(7, () => draw(), { ms: 700 });
          function draw() { const k = an.i, t = days.slice(0, k).reduce((s, x) => s + x, 0); rd.innerHTML = `<div style="font-size:16px">${days.slice(0, k).map((d, i) => `day ${i + 1}: <b>${d}</b> kg`).join(' · ') || 'no days yet'}</div><div style="margin-top:6px">running total: <b>${t} kg</b>${k ? ` · goal 8 000 kg: ${t >= 8000 ? 'reached, ' + (t - 8000) + ' kg extra' : (8000 - t) + ' kg to go'}` : ''}</div>`; } K.anim(el, an); draw(); return an; } }
    ],
    gens: [
      { title: 'Add', gen(R) { const a = R.int(1000, 5999), b = R.int(1000, 3999); return { q: `${a} + ${b} = ?`, a: String(a + b), ans: a + b }; } },
      { title: 'Subtract', gen(R) { const a = R.int(3000, 9999), b = R.int(1000, a - 500); return { q: `${a} − ${b} = ?`, a: String(a - b), ans: a - b }; } },
      { title: 'Across zeros', levels: [2, 3], gen(R) { const a = R.int(2, 9) * 1000, b = R.int(101, a - 101); return { q: `${a} − ${b} = ?`, a: String(a - b), ans: a - b }; } },
      { title: 'Round and adjust', levels: [2, 3], gen(R) { const k = R.int(2, 7) * 1000, d = R.int(1, 3), b = R.int(120, 2500); return { q: `Use a smart way: ${k - d} + ${b}`, a: `${k} + ${b} − ${d} = ${k - d + b}`, ans: k - d + b }; } },
      { title: 'Story', gen(R) { const a = R.int(1200, 4000), b = R.int(800, 3000); return R.chance(.5) ? { q: `Ward A collected ${a} kg of waste and Ward B ${b} kg. Total?`, a: `${a + b} kg`, ans: a + b } : { q: `The village planted ${a + b} saplings; ${b} were neem. How many were others?`, a: String(a), ans: a }; } }
    ],
    quiz: [
      { q: '2765 + 1488', o: ['4253', '3253', '4243', '4153'], a: 0, e: 'Carry thrice.' }, { q: '5000 − 1736', o: ['3264', '3364', '4736', '3274'], a: 0, e: 'Borrow across zeros.' },
      { q: '3998 + 245 smartly', o: ['4000 + 245 − 2', '4000 + 245 + 2', '3998 − 245', '4000 − 245'], a: 0, e: 'Round and adjust.' }, { q: 'Check 6000 − 2450 = 3550 by', o: ['3550 + 2450', '6000 + 2450', '3550 − 2450', '6000 − 3550 only'], a: 0, e: 'Add back.' },
      { q: 'Estimate 4890 + 2120', o: ['about 7000', 'about 6000', 'about 8000', 'about 2000'], a: 0, e: '4900 + 2100.' }, { q: '7000 − 1', o: ['6999', '6000', '7001', '6990'], a: 0, e: 'Count back.' },
      { q: '1500 + 1500', o: ['3000', '2500', '15 001', '1000'], a: 0, e: 'Double.' }, { q: 'Sum means', o: ['answer of adding', 'answer of subtracting', 'a big number', 'a guess'], a: 0, e: 'Add.' },
      { q: '9999 + 1', o: ['10 000', '9910', '1000', '99 991'], a: 0, e: 'Next.' }, { q: '4000 − 3875 (count up)', o: ['125', '135', '225', '875'], a: 0, e: '3875 → 4000.' },
      { q: 'Difference of 5000 and 3000', o: ['2000', '8000', '3000', '5000'], a: 0, e: 'Subtract.' }
    ],
    teach: {
      outcomes: ['Add and subtract 4-digit numbers', 'Estimate, check and use smart strategies'],
      periods: [{ t: 'Column methods', flow: [['10 min', 'Clean-up story.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Across-zero subtraction.']] }, { t: 'Strategies', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Round and adjust.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Borrowing across zeros.', 'Lost carries.'], activities: ['Clean-up data sheet.', 'Estimate before calculating race.'],
      exit: ['3478 + 2596.', '8000 − 2367.', 'Smart: 1999 + 2345.'], homework: 'Record your family\'s waste (dry and wet) for a week in grams; add the totals.'
    },
    slides: [{ t: 'The Cleanest Village', b: ['Add with carrying', 'Subtract across zeros', 'Smart strategies', 'Estimate and check'] }, { t: 'Check yourself', b: ['4567 + 2848?', '6000 − 3459?'] }],
    fs: { groups: [['Column', [['Carry', '10 → 1 to the left'], ['Borrow', '1 from left → 10']]], ['Smart', [['Round and adjust', '2999 + n = 3000 + n − 1'], ['Count up', '5000 − 4875 = 125']]], ['Check', [['Estimate', 'nearest hundred'], ['Add back', 'difference + subtracted']]]],
      ex: [['2765 + 1488', '4253'], ['5000 − 1736', '3264']], rem: ['Line up places.', 'Estimate first.', 'Check by adding back.'] }
  });
})();
