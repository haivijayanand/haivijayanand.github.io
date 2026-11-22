/*
TOOL:    class3_maths_ch04
FAMILY:  CBSE_REVISION / Class 3 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 4 Vacation with My Nani Maa (addition and subtraction in daily life) - revise, 2 explore panels (number line add/subtract, fact families), 6 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 4, part: 'All chapters', short: 'Add and subtract', title: 'Vacation with My Nani Maa',
    blurb: 'Adding and subtracting in daily-life situations: mental strategies, number line jumps, fact families, and estimating.',
    revise: {
      oneLine: 'During a village holiday we count hens, mangoes and steps: adding puts together, subtracting takes away or finds a difference. Break numbers into tens and ones, jump on a number line, and check with the fact family.',
      sections: [
        { h: 'Mental strategies', html: `<p>47 + 25 = 47 + 3 + 22 = 50 + 22 = 72. 63 − 18 = 63 − 20 + 2 = 45.</p>` },
        { h: 'Fact families', html: `<p>25 + 47 = 72, 47 + 25 = 72, 72 − 47 = 25, 72 − 25 = 47.</p>` },
        { h: 'Estimate', html: `<p>38 + 41 is about 40 + 40 = 80.</p>` }
      ],
      formulas: [['Make a ten', '47 + 3 = 50'], ['Round and adjust', '63 − 20 + 2'], ['Fact family', 'a + b = c ⇒ c − a = b'], ['Difference', 'bigger − smaller']],
      terms: [['Sum', 'total'], ['Difference', 'how much more'], ['Estimate', 'close guess']],
      traps: ['Adjusting in the wrong direction (63 − 20 − 2).', 'Difference is always bigger − smaller.'],
      bridge: '<p>Ch 9 and Ch 12 add and subtract 3-digit numbers.</p>'
    },
    explore: [
      { title: 'Jumps on the number line', intro: 'Add or subtract by jumping tens, then ones. Press <kbd>S</kbd>.',
        build(el, K) { let a = 47, b = 25, op = 0; const row = K.row(el); K.slider(row, 'start', 10, 99, 1, a, v => { a = v; an.reset(); }); K.slider(row, 'number', 1, 50, 1, b, v => { b = v; an.reset(); }); K.select(row, 'op', ['+', '−'], i => { op = i; an.reset(); });
          const bd = new K.Board(el, { xmin: -3, xmax: 153, ymin: -3, ymax: 6, axes: false, grid: 0, equal: false, aspect: 0.22 }); const rd = K.read(el); const an = new K.Anim(2, () => bd.redraw(), { ms: 900 });
          bd.onDraw = () => { bd.clear(); bd.line(0, 0, 150, 0, { color: C.ink, w: 2 }); for (let i = 0; i <= 150; i += 10) bd.text(i, -2, String(i), { font: '11px' }); const s = op ? -1 : 1, t = b - b % 10, m = a + s * t, e = a + s * b;
            if (e < 0) { rd.innerHTML = 'Choose a smaller number to take away.'; return; } bd.dot(a, 0, { r: 5 }); if (an.i >= 1 && t) bd.arc((a + m) / 2, 0, t / 2, 0, Math.PI, { color: C.blue, w: 3 }); if (an.i >= 2 && b % 10) bd.arc((m + e) / 2, 0, (b % 10) / 2, 0, Math.PI, { color: C.orange, w: 3 });
            rd.innerHTML = `${a} ${op ? '−' : '+'} ${t} = ${m}${an.i >= 2 ? `, ${m} ${op ? '−' : '+'} ${b % 10} = <b>${e}</b>` : ''}`; };
          K.anim(el, an); bd.redraw(); return an; } },
      { title: 'Fact family', intro: 'Pick two numbers; the four related facts are shown.',
        build(el, K) { let a = 25, b = 47; const row = K.row(el); K.slider(row, 'a', 1, 60, 1, a, v => { a = v; draw(); }); K.slider(row, 'b', 1, 60, 1, b, v => { b = v; draw(); }); const rd = K.read(el);
          function draw() { const c = a + b; rd.innerHTML = `<div style="font-size:20px;line-height:1.7">${a} + ${b} = ${c}<br>${b} + ${a} = ${c}<br>${c} − ${a} = ${b}<br>${c} − ${b} = ${a}</div>`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Add', gen(R) { const a = R.int(12, 70), b = R.int(5, 99 - a); return { q: `${a} + ${b} = ?`, a: String(a + b), ans: a + b }; } },
      { title: 'Subtract', gen(R) { const a = R.int(30, 99), b = R.int(5, a - 1); return { q: `${a} − ${b} = ?`, a: String(a - b), ans: a - b }; } },
      { title: 'Village stories', gen(R) { const a = R.int(20, 60), b = R.int(10, 35); const t = R.int(0, 2); const qs = [[`Nani has ${a} hens and buys ${b} more. How many hens?`, a + b], [`There were ${a + b} mangoes. We ate ${b}. How many are left?`, a], [`The well is ${a + b} steps away and the temple ${a} steps. How many more steps to the well?`, b]]; return { q: qs[t][0], a: String(qs[t][1]), ans: qs[t][1] }; } },
      { title: 'Estimate', levels: [2, 3], gen(R) { const a = R.int(21, 69), b = R.int(21, 29); const e = Math.round(a / 10) * 10 + Math.round(b / 10) * 10; return { q: `Estimate ${a} + ${b} by rounding to tens.`, a: `about ${e} (exact ${a + b})`, ans: e, tol: 10 }; } },
      { title: 'Fact family', levels: [2, 3], gen(R) { const a = R.int(10, 50), b = R.int(10, 49); return { q: `${a} + ${b} = ${a + b}. Write the two subtraction facts.`, a: `${a + b} − ${a} = ${b}, ${a + b} − ${b} = ${a}` }; } },
      { title: 'Missing number', levels: [3], gen(R) { const a = R.int(10, 60), b = R.int(10, 39); return { q: `__ − ${b} = ${a}`, a: String(a + b), ans: a + b }; } }
    ],
    quiz: [
      { q: '47 + 25', o: ['72', '62', '82', '722'], a: 0, e: '50 + 22.' }, { q: '63 − 18', o: ['45', '55', '81', '35'], a: 0, e: '63 − 20 + 2.' },
      { q: '30 + 40', o: ['70', '7', '34', '700'], a: 0, e: 'Tens.' }, { q: 'If 25 + 47 = 72, then 72 − 25 =', o: ['47', '97', '25', '50'], a: 0, e: 'Fact family.' },
      { q: 'Estimate 38 + 41', o: ['about 80', 'about 70', 'about 100', 'about 30'], a: 0, e: '40 + 40.' }, { q: '90 − 35', o: ['55', '65', '45', '125'], a: 0, e: 'Count up.' },
      { q: '56 hens, 19 sold: left', o: ['37', '47', '75', '33'], a: 0, e: '56 − 19.' }, { q: 'Difference of 80 and 52', o: ['28', '32', '132', '38'], a: 0, e: '80 − 52.' },
      { q: '__ − 20 = 35', o: ['55', '15', '45', '25'], a: 0, e: '35 + 20.' }, { q: '99 + 1 =', o: ['100', '991', '90', '98'], a: 0, e: 'Hundred.' },
      { q: '45 + 45', o: ['90', '80', '85', '100'], a: 0, e: 'Double.' }
    ],
    teach: {
      outcomes: ['Add and subtract within 100 mentally and on a number line', 'Use fact families', 'Estimate sums', 'Solve daily-life problems'],
      periods: [{ t: 'Strategies', flow: [['10 min', 'Nani\'s village story.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Practice.']] }, { t: 'Families and estimates', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Estimate then check.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Wrong adjustment direction.'], activities: ['Village market role-play.', 'Fact family triangles.'],
      exit: ['58 + 27.', '81 − 46.', 'Write a fact family for 30, 45, 75.'], homework: 'Make three word problems from a holiday or a visit to relatives.'
    },
    slides: [{ t: 'Vacation with My Nani Maa', b: ['Add and subtract mentally', 'Number line jumps', 'Fact families', 'Estimating'] }, { t: 'Check yourself', b: ['36 + 48?', '70 − 27?'] }],
    fs: { groups: [['Adding', [['Make a ten', '47 + 3 + 22'], ['Tens then ones', '47 + 20 + 5']]], ['Subtracting', [['Round and adjust', '63 − 20 + 2'], ['Count up', '52 → 80 is 28']]], ['Check', [['Fact family', '4 related facts'], ['Estimate', 'round to tens']]]],
      ex: [['58 + 34', '92'], ['72 − 38', '34']], rem: ['Make tens.', 'Check with the fact family.', 'Estimate first.'] }
  });
})();
