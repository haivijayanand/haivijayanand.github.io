/*
TOOL:    class2_maths_ch08
FAMILY:  CBSE_REVISION / Class 2 Maths (Joyful Mathematics)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 8 Grouping and Sharing - revise, 2 explore panels (make equal groups, share equally), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 8, part: 'All chapters', short: 'Grouping and sharing', title: 'Grouping and Sharing',
    blurb: 'Equal groups and repeated addition (early multiplication), sharing equally (early division), and leftovers.',
    revise: {
      oneLine: 'Equal groups can be added quickly: 4 groups of 3 = 3 + 3 + 3 + 3 = 12. Sharing equally gives everyone the same: 12 shared by 3 = 4 each. Sometimes some are left over.',
      sections: [
        { h: 'Grouping', html: `<p>4 plates with 3 laddoos each: 3 + 3 + 3 + 3 = 12. We say "4 threes are 12".</p>` },
        { h: 'Sharing', html: `<p>12 laddoos shared by 3 children: give one each again and again → 4 each.</p>` },
        { h: 'Left over', html: `<p>13 shared by 3: 4 each and 1 left over.</p>` }
      ],
      formulas: [['Groups', 'repeated addition'], ['4 threes', '3 + 3 + 3 + 3 = 12'], ['Share', 'one each, again and again'], ['Left over', 'not enough for one more round']],
      terms: [['Equal groups', 'same number in each'], ['Share equally', 'everyone gets the same'], ['Left over', 'what remains']],
      traps: ['Groups must be equal.', 'Counting groups instead of things.', 'Forgetting the leftovers.'],
      bridge: '<p>Class 3 names these as multiplication (×) and division (÷).</p>'
    },
    explore: [
      { title: 'Make equal groups', intro: 'Choose number of groups and how many in each.',
        build(el, K) { let g = 4, n = 3; const row = K.row(el); K.slider(row, 'groups', 1, 8, 1, g, v => { g = v; draw(); }); K.slider(row, 'in each', 1, 6, 1, n, v => { n = v; draw(); }); const rd = K.read(el);
          function draw() { rd.innerHTML = `<div style="font-size:24px">${Array.from({ length: g }, () => `<span style="display:inline-block;border:2px solid var(--blue,#1d4ed8);border-radius:50%;padding:4px 8px;margin:3px">${'🟠'.repeat(n)}</span>`).join('')}</div>${g} groups of ${n} = ${Array(g).fill(n).join(' + ')} = <b>${g * n}</b>`; }
          draw(); return null; } },
      { title: 'Share equally', intro: 'Press <kbd>S</kbd> to give one laddoo to each child in turn.',
        build(el, K) { let n = 13, c = 3; const row = K.row(el); K.slider(row, 'laddoos', 2, 24, 1, n, v => { n = v; an.reset(); }); K.slider(row, 'children', 2, 5, 1, c, v => { c = v; an.reset(); }); const rd = K.read(el);
          const an = new K.Anim(24, () => draw(), { ms: 300 });
          function draw() { const k = Math.min(an.i, n - n % c); const each = Array.from({ length: c }, (_, i) => Math.floor(k / c) + (i < k % c ? 1 : 0));
            rd.innerHTML = `<div style="font-size:22px">${each.map((e, i) => `🧒 ${'🟡'.repeat(e)}`).join('<br>')}</div>given ${k} · on the plate ${n - k}${k === n - n % c ? ` · <b>${Math.floor(n / c)} each</b>${n % c ? `, ${n % c} left over` : ', none left'}` : ''}`; }
          K.anim(el, an); draw(); return an; } }
    ],
    gens: [
      { title: 'Equal groups', gen(R) { const g = R.int(2, 6), n = R.int(2, 5); return { q: `${g} bags with ${n} apples each. How many apples?`, a: String(g * n), ans: g * n, s: Array(g).fill(n).join(' + ') }; } },
      { title: 'Share equally', gen(R) { const c = R.int(2, 5), e = R.int(2, 6); return { q: `${c * e} pencils shared equally by ${c} children. How many each?`, a: String(e), ans: e }; } },
      { title: 'Left over', levels: [2, 3], gen(R) { const c = R.int(2, 5), e = R.int(2, 5), l = R.int(1, c - 1); return { q: `${c * e + l} sweets shared equally by ${c} children. How many each, how many left?`, a: `${e} each, ${l} left over`, ans: e }; } },
      { title: 'How many groups?', levels: [2, 3], gen(R) { const n = R.int(2, 5), g = R.int(2, 6); return { q: `${n * g} flowers are put in bunches of ${n}. How many bunches?`, a: String(g), ans: g }; } },
      { title: 'Repeated addition', gen(R) { const n = R.int(2, 6), g = R.int(2, 5); return { q: `${Array(g).fill(n).join(' + ')} = ?`, a: String(n * g), ans: n * g }; } }
    ],
    quiz: [
      { q: '3 groups of 4', o: ['12', '7', '34', '9'], a: 0, e: '4 + 4 + 4.' }, { q: '10 shared by 2', o: ['5 each', '2 each', '8 each', '10 each'], a: 0, e: 'Equal.' },
      { q: '5 + 5 + 5 =', o: ['15', '10', '555', '20'], a: 0, e: 'Three fives.' }, { q: '7 shared by 2', o: ['3 each, 1 left', '3 each', '4 each', '2 each, 3 left'], a: 0, e: 'Leftover.' },
      { q: '12 in bunches of 3: bunches', o: ['4', '3', '9', '15'], a: 0, e: '3, 6, 9, 12.' }, { q: 'Equal groups have', o: ['the same number in each', 'different numbers', 'one each', 'none'], a: 0, e: 'Definition.' },
      { q: '2 + 2 + 2 + 2 =', o: ['8', '6', '2222', '4'], a: 0, e: 'Four twos.' }, { q: '15 shared by 3', o: ['5 each', '3 each', '12 each', '18 each'], a: 0, e: '5 + 5 + 5.' },
      { q: '4 tables, 4 chairs each', o: ['16', '8', '44', '12'], a: 0, e: '4 fours.' }, { q: 'Sharing equally means', o: ['everyone gets the same', 'biggest gets most', 'first gets all', 'random'], a: 0, e: 'Fair.' },
      { q: '9 shared by 4', o: ['2 each, 1 left', '2 each', '3 each', '1 each, 5 left'], a: 0, e: '8 + 1.' }
    ],
    teach: {
      outcomes: ['Make equal groups and find totals', 'Share equally', 'Find leftovers'],
      periods: [{ t: 'Grouping', flow: [['10 min', 'Laddoo plates story.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Counters in cups.']] }, { t: 'Sharing', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Share pencils; leftovers.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Unequal shares.', 'Leftover ignored.'], activities: ['Share a packet of biscuits fairly.', 'Group children for games.'],
      exit: ['5 groups of 2.', 'Share 14 by 2.', '11 shared by 3?'], homework: 'Share 20 beans equally among 4 family members. Draw what each gets.'
    },
    slides: [{ t: 'Grouping and Sharing', b: ['Equal groups', 'Sharing equally', 'Left over'] }, { t: 'Check yourself', b: ['4 groups of 5?', '18 shared by 3?'] }],
    fs: { groups: [['Grouping', [['3 groups of 4', '4 + 4 + 4 = 12'], ['5 groups of 2', '10']]], ['Sharing', [['12 by 3', '4 each'], ['13 by 3', '4 each, 1 left']]], ['Check', [['Share back', 'each × children + left = total']]]],
      ex: [['6 bags of 3', '18'], ['20 by 4', '5 each']], rem: ['Groups must be equal.', 'Give one at a time.', 'Say what is left over.'] }
  });
})();
