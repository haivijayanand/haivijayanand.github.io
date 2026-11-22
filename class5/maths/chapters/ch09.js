/*
TOOL:    class5_maths_ch09
FAMILY:  CBSE_REVISION / Class 5 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 9 Coconut Farm (division: sharing and packing, long division by 1-digit numbers, remainders, checking) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 9, part: 'All chapters', short: 'Division', title: 'Coconut Farm',
    blurb: 'Division on a coconut farm: packing coconuts in sacks, sharing harvests, long division of 2- and 3-digit numbers by 1-digit numbers, remainders and checking by multiplication.',
    revise: {
      oneLine: 'Divide from the left: 756 ÷ 6 → 7 ÷ 6 = 1 r 1; 15 ÷ 6 = 2 r 3; 36 ÷ 6 = 6 → 126. Check: 126 × 6 = 756. If 100 coconuts go in sacks of 8: 100 ÷ 8 = 12 r 4, so 12 full sacks and 4 left.',
      sections: [
        { h: 'Steps', html: `<p>Divide, multiply, subtract, bring down — repeat.</p>` },
        { h: 'Remainders', html: `<p>The remainder is always less than the divisor. In stories, decide: drop it, round up, or say what is left.</p>` },
        { h: 'Check', html: `<p>quotient × divisor + remainder = dividend.</p>` }
      ],
      formulas: [['Dividend', 'divisor × quotient + remainder'], ['Remainder', '< divisor'], ['÷ 10', 'remove a zero (if it ends in 0)'], ['Halving twice', '÷ 4']],
      terms: [['Dividend', 'number divided'], ['Divisor', 'number dividing'], ['Quotient', 'answer'], ['Remainder', 'left over']],
      traps: ['Forgetting a 0 in the quotient (618 ÷ 6 = 103).', 'Remainder bigger than divisor.', 'Not bringing down every digit.'],
      bridge: '<p>Class 6 divides by 2-digit numbers.</p>'
    },
    explore: [
      { title: 'Long division step by step', intro: 'Choose numbers; press <kbd>S</kbd> for each step.',
        build(el, K) { let N = 756, d = 6; const row = K.row(el); K.slider(row, 'dividend', 100, 999, 1, N, v => { N = v; an.reset(); }); K.slider(row, 'divisor', 2, 9, 1, d, v => { d = v; an.reset(); }); const rd = K.read(el); const an = new K.Anim(3, () => draw(), { ms: 900 });
          function draw() { const s = String(N); let r = 0, q = '', lines = []; for (let i = 0; i < 3; i++) { const cur = r * 10 + Number(s[i]); const qd = Math.floor(cur / d); r = cur - qd * d; q += qd; lines.push(`bring down ${s[i]} → ${cur}; ${cur} ÷ ${d} = <b>${qd}</b>, ${qd} × ${d} = ${qd * d}, remainder ${r}`); }
            const k = Math.min(an.i, 3); rd.innerHTML = `${lines.slice(0, k).map(x => '<div>' + x + '</div>').join('')}${k === 3 ? `<div style="margin-top:6px">${N} ÷ ${d} = <b>${Number(q)}</b>${r ? ` remainder <b>${r}</b>` : ''} · check ${Number(q)} × ${d}${r ? ' + ' + r : ''} = ${Number(q) * d + r}</div>` : '<div>press S for the next step</div>'}`; }
          K.anim(el, an); draw(); return an; } },
      { title: 'Pack the coconuts', intro: 'How many full sacks?',
        build(el, K) { let n = 100, s = 8; const row = K.row(el); K.slider(row, 'coconuts', 20, 200, 1, n, v => { n = v; draw(); }); K.slider(row, 'per sack', 4, 25, 1, s, v => { s = v; draw(); }); const rd = K.read(el);
          function draw() { const k = Math.floor(n / s), r = n % s; rd.innerHTML = `<div style="font-size:20px">${'🧺'.repeat(Math.min(k, 40))} ${'🥥'.repeat(r)}</div>${n} ÷ ${s} = <b>${k}</b> full sacks, <b>${r}</b> left · sacks needed for all: ${k + (r ? 1 : 0)}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Divide', gen(R) { const d = R.int(2, 9), q = R.int(12, 99); return { q: `${d * q} ÷ ${d} = ?`, a: String(q), ans: q }; } },
      { title: 'With remainder', gen(R) { const d = R.int(3, 9), q = R.int(11, 99), r = R.int(1, d - 1); return { q: `${d * q + r} ÷ ${d} = ?`, a: `${q} remainder ${r}`, ans: q }; } },
      { title: '3-digit ÷ 1-digit', levels: [2, 3], gen(R) { const d = R.int(2, 9), q = R.int(101, Math.floor(999 / d)); return { q: `${d * q} ÷ ${d} = ?`, a: String(q), ans: q }; } },
      { title: 'Coconut stories', gen(R) { const s = R.int(6, 15), k = R.int(8, 30), r = R.int(1, s - 1); return { q: `${s * k + r} coconuts are packed ${s} to a sack. Full sacks? Left over?`, a: `${k} sacks, ${r} left`, ans: k }; } },
      { title: 'Zero in the quotient', levels: [3], gen(R) { const d = R.int(2, 9), q = R.pick([102, 103, 105, 108, 201, 204, 305]); if (d * q > 999) return { q: `${2 * 104} ÷ 2 = ?`, a: '104', ans: 104 }; return { q: `${d * q} ÷ ${d} = ?`, a: String(q), ans: q }; } }
    ],
    quiz: [
      { q: '756 ÷ 6', o: ['126', '125', '136', '116'], a: 0, e: 'Long division.' }, { q: '100 ÷ 8', o: ['12 r 4', '12', '13 r 2', '11 r 12'], a: 0, e: '96 + 4.' },
      { q: '618 ÷ 6', o: ['103', '13', '113', '130'], a: 0, e: 'Zero in quotient.' }, { q: 'Remainder must be', o: ['less than the divisor', 'more', 'equal', 'any'], a: 0, e: 'Rule.' },
      { q: 'Check 45 r 3 for ÷ 7', o: ['45 × 7 + 3', '45 + 7 + 3', '45 × 3 + 7', '7 × 3'], a: 0, e: 'q × d + r.' }, { q: '840 ÷ 10', o: ['84', '840', '8400', '8.4'], a: 0, e: 'Remove 0.' },
      { q: '96 ÷ 4', o: ['24', '23', '25', '22'], a: 0, e: 'Halve twice.' }, { q: 'Dividend in 50 ÷ 5', o: ['50', '5', '10', '0'], a: 0, e: 'Being divided.' },
      { q: '75 coconuts, 10 per sack, sacks needed', o: ['8', '7', '7.5', '10'], a: 0, e: 'Round up.' }, { q: '999 ÷ 9', o: ['111', '110', '101', '99'], a: 0, e: 'Each 9.' },
      { q: '0 ÷ 7', o: ['0', '7', '1', 'not possible'], a: 0, e: 'Nothing.' }
    ],
    teach: {
      outcomes: ['Divide 3-digit by 1-digit numbers', 'Interpret remainders', 'Check by multiplying'],
      periods: [{ t: 'Long division', flow: [['10 min', 'Coconut farm story.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Practice with checks.']] }, { t: 'Stories', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Remainder decisions.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Missing quotient zero.', 'Big remainders.'], activities: ['Pack counters into bags.', 'Division relay.'],
      exit: ['847 ÷ 7.', '230 ÷ 9.', 'Buses for 150 at 40 each.'], homework: 'Share a packet of biscuits equally among family members; write the division with remainder.'
    },
    slides: [{ t: 'Coconut Farm', b: ['Divide, multiply, subtract, bring down', 'Remainders', 'Zeros in quotients', 'Checking'] }, { t: 'Check yourself', b: ['936 ÷ 8?', '412 ÷ 4?'] }],
    fs: { groups: [['Steps', [['D M S B', 'divide, multiply, subtract, bring down']]], ['Parts', [['Dividend', 'd × q + r'], ['Remainder', '< divisor']]], ['Stories', [['Full groups', 'quotient'], ['Groups for all', 'round up']]]],
      ex: [['756 ÷ 6', '126'], ['100 ÷ 8', '12 r 4']], rem: ['Write 0 in the quotient when needed.', 'Check with ×.', 'Decide what the remainder means.'] }
  });
})();
