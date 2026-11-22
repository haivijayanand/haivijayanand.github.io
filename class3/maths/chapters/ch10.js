/*
TOOL:    class3_maths_ch10
FAMILY:  CBSE_REVISION / Class 3 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 10 Fun at Class Party! (division as sharing and grouping) - revise, 2 explore panels (share the snacks, make groups), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 10, part: 'All chapters', short: 'Division', title: 'Fun at Class Party!',
    blurb: 'Division as equal sharing and as making equal groups, the ÷ sign, connection with multiplication, remainders.',
    revise: {
      oneLine: 'At a party we share snacks equally (24 samosas among 6 children → 24 ÷ 6 = 4 each) or make groups (24 samosas, 4 on each plate → 6 plates). Division undoes multiplication: 6 × 4 = 24 so 24 ÷ 6 = 4.',
      sections: [
        { h: 'Sharing', html: `<p>How many each? 15 ÷ 3 = 5 (three children, 5 each).</p>` },
        { h: 'Grouping', html: `<p>How many groups? 15 sweets in bags of 5 → 15 ÷ 5 = 3 bags.</p>` },
        { h: 'Using tables', html: `<p>24 ÷ 4: which number × 4 = 24? 6. Left-overs: 14 ÷ 4 = 3, remainder 2.</p>` }
      ],
      formulas: [['Share', 'total ÷ number of people = each'], ['Group', 'total ÷ group size = groups'], ['Check', 'answer × divisor = total'], ['Remainder', 'what is left over']],
      terms: [['Divide ÷', 'share or group equally'], ['Remainder', 'left over'], ['Quotient', 'answer of dividing']],
      traps: ['Sharing must be equal.', 'Remainder must be smaller than the divisor.', '24 ÷ 6 is not 6 ÷ 24.'],
      bridge: '<p>Builds on Ch 7 (multiplication) and Ch 8 (fair share).</p>'
    },
    explore: [
      { title: 'Share the snacks', intro: 'Press <kbd>S</kbd> to deal one samosa to each child in turn.',
        build(el, K) { let n = 24, c = 6; const row = K.row(el); K.slider(row, 'samosas', 4, 30, 1, n, v => { n = v; an.reset(); }); K.slider(row, 'children', 2, 6, 1, c, v => { c = v; an.reset(); }); const rd = K.read(el); const an = new K.Anim(30, () => draw(), { ms: 250 });
          function draw() { const k = Math.min(an.i, n - n % c); const each = Array.from({ length: c }, (_, i) => Math.floor(k / c) + (i < k % c ? 1 : 0)); rd.innerHTML = `<div style="font-size:20px">${each.map(e => '🧒 ' + '🥟'.repeat(e)).join('<br>')}</div>${k === n - n % c ? `${n} ÷ ${c} = <b>${Math.floor(n / c)}</b> each${n % c ? `, remainder ${n % c}` : ''}` : `dealt ${k}`}`; } K.anim(el, an); draw(); return an; } },
      { title: 'Make groups', intro: 'Choose the total and the group size.',
        build(el, K) { let n = 18, g = 3; const row = K.row(el); K.slider(row, 'balloons', 4, 30, 1, n, v => { n = v; draw(); }); K.slider(row, 'in each bunch', 2, 6, 1, g, v => { g = v; draw(); }); const rd = K.read(el);
          function draw() { const k = Math.floor(n / g), r = n % g; rd.innerHTML = `<div style="font-size:20px">${Array.from({ length: k }, () => `<span style="display:inline-block;border:2px dashed var(--orange,#ea580c);border-radius:10px;padding:2px 5px;margin:2px">${'🎈'.repeat(g)}</span>`).join('')} ${'🎈'.repeat(r)}</div>${n} ÷ ${g} = <b>${k}</b> bunches${r ? `, ${r} left` : ''} · check ${k} × ${g}${r ? ` + ${r}` : ''} = ${n}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Share equally', gen(R) { const c = R.int(2, 9), e = R.int(2, 9); return { q: `${c * e} sweets shared equally among ${c} children. How many each?`, a: String(e), ans: e }; } },
      { title: 'Make groups', gen(R) { const g = R.int(2, 9), k = R.int(2, 9); return { q: `${g * k} balloons in bunches of ${g}. How many bunches?`, a: String(k), ans: k }; } },
      { title: 'Division facts', gen(R) { const d = R.pick([2, 3, 4, 5, 10]), q = R.int(1, 10); return { q: `${d * q} ÷ ${d} = ?`, a: String(q), ans: q }; } },
      { title: 'With remainder', levels: [2, 3], gen(R) { const d = R.int(2, 6), q = R.int(2, 8), r = R.int(1, d - 1); return { q: `${d * q + r} ÷ ${d} = ? (with remainder)`, a: `${q} remainder ${r}`, ans: q }; } },
      { title: 'Fact family', levels: [3], gen(R) { const a = R.int(2, 9), b = R.int(2, 9); return { q: `${a} × ${b} = ${a * b}. Write the two division facts.`, a: `${a * b} ÷ ${a} = ${b}, ${a * b} ÷ ${b} = ${a}` }; } }
    ],
    quiz: [
      { q: '24 ÷ 6', o: ['4', '6', '18', '30'], a: 0, e: '6 × 4.' }, { q: '15 ÷ 3', o: ['5', '3', '12', '45'], a: 0, e: 'Share.' },
      { q: '20 balloons in bunches of 5', o: ['4 bunches', '5 bunches', '15 bunches', '25'], a: 0, e: 'Group.' }, { q: '14 ÷ 4', o: ['3 remainder 2', '3', '4 remainder 2', '2 remainder 3'], a: 0, e: '12 + 2.' },
      { q: 'If 7 × 3 = 21, then 21 ÷ 7 =', o: ['3', '7', '21', '14'], a: 0, e: 'Undo.' }, { q: '10 ÷ 10', o: ['1', '0', '10', '100'], a: 0, e: 'One group.' },
      { q: 'Remainder must be', o: ['less than the divisor', 'bigger', 'zero always', 'any number'], a: 0, e: 'Otherwise share more.' }, { q: '30 ÷ 5', o: ['6', '5', '25', '35'], a: 0, e: '5 × 6.' },
      { q: '÷ means', o: ['divide', 'add', 'multiply', 'equals'], a: 0, e: 'Divide.' }, { q: '0 ÷ 4', o: ['0', '4', '1', 'not possible'], a: 0, e: 'Nothing to share.' },
      { q: '18 shared by 2', o: ['9', '8', '16', '36'], a: 0, e: 'Half.' }
    ],
    teach: {
      outcomes: ['Divide by sharing and grouping', 'Use ÷ and relate to ×', 'Find remainders'],
      periods: [{ t: 'Sharing', flow: [['10 min', 'Class party story.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Share counters.']] }, { t: 'Grouping', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Fact families × and ÷.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Unequal shares.', 'Remainder too big.'], activities: ['Party plate grouping.', 'Division bingo.'],
      exit: ['28 ÷ 4.', '17 ÷ 5.', 'Write ÷ facts for 3 × 8.'], homework: 'Plan a party for 6 friends with 30 sweets. How many each? Any left?'
    },
    slides: [{ t: 'Fun at Class Party!', b: ['Sharing', 'Grouping', '÷ and ×', 'Remainders'] }, { t: 'Check yourself', b: ['32 ÷ 4?', '19 ÷ 3?'] }],
    fs: { groups: [['Meanings', [['Share', 'how many each'], ['Group', 'how many groups']]], ['Facts', [['From ×', '6 × 4 = 24 ⇒ 24 ÷ 6 = 4'], ['÷ 1', 'same'], ['0 ÷ n', '0']]], ['Remainder', [['14 ÷ 4', '3 r 2'], ['Check', '3 × 4 + 2 = 14']]]],
      ex: [['35 ÷ 5', '7'], ['22 ÷ 4', '5 r 2']], rem: ['Use tables.', 'Remainder < divisor.', 'Check with ×.'] }
  });
})();
