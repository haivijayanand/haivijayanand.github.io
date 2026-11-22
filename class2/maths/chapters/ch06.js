/*
TOOL:    class2_maths_ch06
FAMILY:  CBSE_REVISION / Class 2 Maths (Joyful Mathematics)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 6 Decoration for Festival (addition and subtraction) - revise, 2 explore panels (add tens and ones, subtract by jumping back), 6 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 6, part: 'All chapters', short: 'Add and subtract', title: 'Decoration for Festival',
    blurb: 'Adding and subtracting two-digit numbers (up to 99) by tens and ones, with and without regrouping, and story sums about festival decorations.',
    revise: {
      oneLine: 'Add or subtract tens with tens and ones with ones: 34 + 25 = 50 + 9 = 59. If the ones make more than 9, make a new ten (regroup). Subtraction can be checked by adding back.',
      sections: [
        { h: 'Adding', html: `<p>34 + 25: tens 30 + 20 = 50, ones 4 + 5 = 9 → 59. 38 + 25: ones 8 + 5 = 13 = 1 ten 3 ones → 50 + 10 + 3 = 63.</p>` },
        { h: 'Subtracting', html: `<p>57 − 23: tens 50 − 20 = 30, ones 7 − 3 = 4 → 34. 52 − 17: jump back 10 to 42, then 7 to 35.</p>` },
        { h: 'Check', html: `<p>35 + 17 = 52, so 52 − 17 = 35 is right.</p>` }
      ],
      formulas: [['Add', 'tens + tens, ones + ones'], ['Regroup', '10 ones = 1 ten'], ['Subtract', 'tens − tens, ones − ones'], ['Jump back', '52 − 17 = 52 − 10 − 7'], ['Check', 'answer + subtracted = start']],
      terms: [['Sum', 'answer of adding'], ['Difference', 'answer of subtracting'], ['Regroup', 'change 10 ones to 1 ten (or back)']],
      traps: ['Writing 13 in the ones place.', 'Taking the smaller ones digit from the bigger one regardless of order (52 − 17 ≠ 45).', 'Lining up digits wrongly.'],
      bridge: '<p>Ch 10 uses adding and subtracting with money.</p>'
    },
    explore: [
      { title: 'Add with tens and ones', intro: 'Choose two numbers. Tens and ones are added separately; 10 ones become a new ten.',
        build(el, K) { let a = 38, b = 25; const row = K.row(el); K.slider(row, 'first', 10, 89, 1, a, v => { a = v; draw(); }); K.slider(row, 'second', 1, 60, 1, b, v => { b = v; draw(); }); const rd = K.read(el);
          function draw() { const ta = Math.floor(a / 10), oa = a % 10, tb = Math.floor(b / 10), ob = b % 10, o = oa + ob; rd.innerHTML = a + b > 99 ? 'Keep the total under 100.' : `tens: ${ta} + ${tb} = ${ta + tb} · ones: ${oa} + ${ob} = ${o}${o > 9 ? ` = 1 ten ${o - 10} ones (regroup)` : ''}<br>${a} + ${b} = <b>${a + b}</b>`; }
          draw(); return null; } },
      { title: 'Subtract by jumping back', intro: 'Press <kbd>S</kbd>: jump back the tens first, then the ones.',
        build(el, K) { let a = 52, b = 17; const row = K.row(el); K.slider(row, 'start', 20, 99, 1, a, v => { a = v; b = Math.min(b, a); an.reset(); }); K.slider(row, 'take away', 1, 50, 1, b, v => { b = Math.min(v, a); an.reset(); });
          const bd = new K.Board(el, { xmin: -3, xmax: 103, ymin: -3, ymax: 6, axes: false, grid: 0, equal: false, aspect: 0.22 }); const rd = K.read(el); const an = new K.Anim(2, () => bd.redraw(), { ms: 900 });
          bd.onDraw = () => { bd.clear(); bd.line(0, 0, 100, 0, { color: C.ink, w: 2 }); for (let i = 0; i <= 100; i += 10) bd.text(i, -2, String(i), { font: '12px' }); const t = b - b % 10, mid = a - t, end = a - b;
            bd.dot(a, 0, { r: 5 }); if (an.i >= 1 && t) bd.arc((a + mid) / 2, 0, t / 2, 0, Math.PI, { color: C.blue, w: 3 }); if (an.i >= 2 && b % 10) bd.arc((mid + end) / 2, 0, (b % 10) / 2, 0, Math.PI, { color: C.orange, w: 3 });
            rd.innerHTML = `${a} − ${t} = ${mid}${an.i >= 2 ? ` · ${mid} − ${b % 10} = <b>${end}</b> · check: ${end} + ${b} = ${a}` : ' (press S)'}`; };
          K.anim(el, an); bd.redraw(); return an; } }
    ],
    gens: [
      { title: 'Add without regrouping', gen(R) { const a = R.int(1, 7) * 10 + R.int(0, 5), b = R.int(1, 9 - Math.floor(a / 10)) * 10 + R.int(0, 4); if (a + b > 99) return this.gen(R); return { q: `${a} + ${b} = ?`, a: String(a + b), ans: a + b }; } },
      { title: 'Add with regrouping', levels: [2, 3], gen(R) { const a = R.int(1, 6) * 10 + R.int(5, 9), b = R.int(1, 2) * 10 + R.int(5, 9); return { q: `${a} + ${b} = ?`, a: String(a + b), ans: a + b, s: 'ones make a new ten' }; } },
      { title: 'Subtract', gen(R, L) { const a = R.int(30, 99), b = L === 1 ? R.int(1, a % 10 || 1) + 10 * R.int(0, Math.floor(a / 10) - 1) : R.int(11, a - 1); return { q: `${a} − ${b} = ?`, a: String(a - b), ans: a - b }; } },
      { title: 'Festival stories', gen(R) { const a = R.int(15, 50), b = R.int(10, 40); return R.chance(.5) ? { q: `Riya made ${a} paper flowers and her brother made ${b}. How many flowers for the decoration?`, a: String(a + b), ans: a + b } : { q: `There were ${a + b} diyas. ${b} were lit. How many are not lit?`, a: String(a), ans: a }; } },
      { title: 'Missing number', levels: [3], gen(R) { const a = R.int(10, 50), b = R.int(10, 49); return { q: `${a} + __ = ${a + b}`, a: String(b), ans: b, s: `${a + b} − ${a}` }; } },
      { title: 'Check by adding', levels: [2, 3], gen(R) { const a = R.int(40, 99), b = R.int(10, a - 5); const wrong = R.chance(.5); const d = a - b + (wrong ? R.pick([-10, 10, 1]) : 0); return { q: `Is ${a} − ${b} = ${d} correct? Check by adding.`, a: wrong ? `no (${d} + ${b} = ${d + b}); correct answer ${a - b}` : `yes (${d} + ${b} = ${a})` }; } }
    ],
    quiz: [
      { q: '34 + 25 =', o: ['59', '69', '49', '9'], a: 0, e: '50 + 9.' }, { q: '38 + 25 =', o: ['63', '53', '513', '73'], a: 0, e: 'Regroup.' },
      { q: '57 − 23 =', o: ['34', '80', '24', '44'], a: 0, e: '30 + 4.' }, { q: '52 − 17 =', o: ['35', '45', '25', '69'], a: 0, e: 'Jump back.' },
      { q: '10 ones =', o: ['1 ten', '10 tens', '100', '0'], a: 0, e: 'Regroup.' }, { q: '40 + 30 =', o: ['70', '7', '43', '700'], a: 0, e: 'Tens.' },
      { q: '90 − 40 =', o: ['50', '5', '130', '40'], a: 0, e: 'Tens.' }, { q: '25 + __ = 40', o: ['15', '25', '65', '10'], a: 0, e: '40 − 25.' },
      { q: '48 flowers, 19 used. Left?', o: ['29', '67', '39', '31'], a: 0, e: '48 − 19.' }, { q: '46 + 46 =', o: ['92', '82', '96', '86'], a: 0, e: 'Double.' },
      { q: 'To check 60 − 24 = 36, add', o: ['36 + 24', '60 + 24', '36 + 60', '24 − 36'], a: 0, e: 'Back to 60.' }
    ],
    teach: {
      outcomes: ['Add and subtract two-digit numbers', 'Regroup ones and tens', 'Check subtraction by addition', 'Solve story sums'],
      periods: [{ t: 'Adding', flow: [['10 min', 'Festival decoration story.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Practice with bundles.']] }, { t: 'Subtracting', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Check by adding.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['13 in ones place.', 'Smaller-from-bigger digit error.'], activities: ['Bundle sticks to regroup.', 'Decoration shop with price cards.'],
      exit: ['47 + 36.', '63 − 28.', 'Check your answer.'], homework: 'Count decorations or lights at home on two days and find the total and the difference.'
    },
    slides: [{ t: 'Decoration for Festival', b: ['Add tens and ones', 'Regroup', 'Subtract and check'] }, { t: 'Check yourself', b: ['27 + 45?', '81 − 36?'] }],
    fs: { groups: [['Adding', [['Tens + tens', '30 + 20 = 50'], ['Ones + ones', '4 + 5 = 9'], ['Regroup', '13 ones = 1 ten 3 ones']]], ['Subtracting', [['Tens − tens', '50 − 20'], ['Jump back', '52 − 10 − 7'], ['Check', 'add back']]]],
      ex: [['38 + 25', '63'], ['52 − 17', '35']], rem: ['Line up tens and ones.', 'Regroup when ones pass 9.', 'Check with addition.'] }
  });
})();
