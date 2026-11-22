/*
TOOL:    class3_maths_ch08
FAMILY:  CBSE_REVISION / Class 3 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 8 Fair Share (halves, quarters, fair sharing) - revise, 2 explore panels (cut the roti, half and quarter of a group), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 8, part: 'All chapters', short: 'Halves and quarters', title: 'Fair Share',
    blurb: 'Sharing a whole fairly: halves, quarters (one-fourth), three-quarters; equal and unequal parts; half and quarter of a group of things.',
    revise: {
      oneLine: 'A fair share means equal parts. Cut a roti into 2 equal parts: each is a half (½). Into 4 equal parts: each is a quarter (¼); three of them are three-quarters (¾). Half of 12 laddoos is 6.',
      sections: [
        { h: 'Equal parts', html: `<p>Only equal parts can be called halves or quarters. Two unequal pieces are not halves.</p>` },
        { h: 'Halves and quarters', html: `<p>½ + ½ = 1 whole. ¼ + ¼ + ¼ + ¼ = 1 whole. Two quarters make a half.</p>` },
        { h: 'Of a group', html: `<p>Half of 10 = 5 (share into 2). Quarter of 12 = 3 (share into 4).</p>` }
      ],
      formulas: [['Half', '½ — 2 equal parts'], ['Quarter', '¼ — 4 equal parts'], ['Three-quarters', '¾'], ['2 quarters', '1 half'], ['Half of n', 'n ÷ 2']],
      terms: [['Whole', 'the complete thing'], ['Half', 'one of 2 equal parts'], ['Quarter', 'one of 4 equal parts']],
      traps: ['Unequal pieces are not halves.', 'A quarter is smaller than a half.', 'Half of a group is about sharing, not cutting objects.'],
      bridge: '<p>Class 4 and 5 extend to other fractions.</p>'
    },
    explore: [
      { title: 'Cut the roti', intro: 'Choose how many equal parts and how many to shade.',
        build(el, K) { let n = 4, s = 3; const row = K.row(el); K.select(row, 'parts', ['2', '4', '8'], i => { n = [2, 4, 8][i]; s = Math.min(s, n); b.redraw(); }); const sel = row.querySelector('select'); if (sel) sel.value = 1; K.slider(row, 'shaded', 0, 8, 1, s, v => { s = Math.min(v, n); b.redraw(); });
          const b = new K.Board(el, { xmin: -2, xmax: 2, ymin: -1.5, ymax: 1.5, axes: false, grid: 0 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); for (let i = 0; i < n; i++) b.arc(0, 0, 1.3, Math.PI / 2 - (i + 1) * 2 * Math.PI / n, Math.PI / 2 - i * 2 * Math.PI / n, { sector: true, fill: i < s ? 'rgba(234,88,12,.55)' : '#fde68a', color: '#a16207', w: 2 });
            const nm = { '1/2': 'one half', '1/4': 'one quarter', '2/4': 'two quarters = one half', '3/4': 'three quarters', '4/4': 'one whole', '2/2': 'one whole' }[`${s}/${n}`] || ''; rd.innerHTML = `${s} of ${n} equal parts = <b>${s}/${n}</b> ${nm ? '(' + nm + ')' : ''}`; };
          b.redraw(); return null; } },
      { title: 'Half and quarter of a group', intro: 'Choose a number of laddoos and share into 2 or 4.',
        build(el, K) { let n = 12, p = 2; const row = K.row(el); K.slider(row, 'laddoos', 4, 24, 4, n, v => { n = v; draw(); }); K.select(row, 'share into', ['2 (half)', '4 (quarter)'], i => { p = [2, 4][i]; draw(); }); const rd = K.read(el);
          function draw() { rd.innerHTML = `<div style="font-size:20px">${Array.from({ length: p }, () => `<span style="display:inline-block;border:2px dashed var(--blue,#1d4ed8);border-radius:10px;padding:2px 6px;margin:3px">${'🟡'.repeat(n / p)}</span>`).join('')}</div>${p === 2 ? 'half' : 'quarter'} of ${n} = <b>${n / p}</b>`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Half of a group', gen(R) { const n = 2 * R.int(2, 15); return { q: `Half of ${n} = ?`, a: String(n / 2), ans: n / 2 }; } },
      { title: 'Quarter of a group', gen(R) { const n = 4 * R.int(1, 8); return { q: `A quarter of ${n} = ?`, a: String(n / 4), ans: n / 4 }; } },
      { title: 'Name the part', gen(R) { const items = [['1 of 2 equal parts', 'one half (½)'], ['1 of 4 equal parts', 'one quarter (¼)'], ['3 of 4 equal parts', 'three quarters (¾)'], ['2 of 4 equal parts', 'two quarters = one half']]; const [q, a] = R.pick(items); return { q: `What do we call ${q}?`, a }; } },
      { title: 'Fair or not?', levels: [2, 3], gen(R) { const items = [['a roti cut into 2 pieces of different sizes', 'not fair: not halves'], ['a paper folded exactly in the middle', 'fair: halves'], ['an orange with 8 equal segments shared by 4 children, 2 each', 'fair: quarters'], ['12 laddoos shared as 5 and 7', 'not fair']]; const [q, a] = R.pick(items); return { q: `Is this a fair share: ${q}?`, a }; } },
      { title: 'Three quarters', levels: [3], gen(R) { const n = 4 * R.int(1, 6); return { q: `Three quarters of ${n} = ?`, a: String(3 * n / 4), ans: 3 * n / 4, s: `quarter is ${n / 4}, three of them` }; } }
    ],
    quiz: [
      { q: 'Half of 10', o: ['5', '2', '20', '8'], a: 0, e: 'Share in 2.' }, { q: 'A quarter means', o: ['1 of 4 equal parts', '1 of 2 parts', '4 parts', 'any part'], a: 0, e: 'Quarter.' },
      { q: '2 quarters =', o: ['1 half', '1 whole', '1 quarter', '4 halves'], a: 0, e: '2/4 = 1/2.' }, { q: 'Quarter of 20', o: ['5', '4', '10', '80'], a: 0, e: '20 ÷ 4.' },
      { q: 'Bigger: half or quarter?', o: ['half', 'quarter', 'same', 'cannot tell'], a: 0, e: 'Fewer parts, bigger.' }, { q: 'Unequal parts are', o: ['not halves', 'halves', 'quarters', 'wholes'], a: 0, e: 'Must be equal.' },
      { q: '¾ of 8', o: ['6', '3', '4', '2'], a: 0, e: '2 × 3.' }, { q: '½ + ½ =', o: ['1 whole', '2 halves of nothing', '¼', '0'], a: 0, e: 'Whole.' },
      { q: 'Half of 18', o: ['9', '8', '36', '6'], a: 0, e: 'Share in 2.' }, { q: 'How many quarters in a whole?', o: ['4', '2', '1', '8'], a: 0, e: 'Four.' },
      { q: 'A paper folded exactly in the middle gives', o: ['halves', 'quarters', 'thirds', 'nothing'], a: 0, e: 'Two equal parts.' }
    ],
    teach: {
      outcomes: ['Recognise equal parts', 'Use half, quarter and three-quarters', 'Find half and quarter of a group'],
      periods: [{ t: 'Parts of a whole', flow: [['10 min', 'Fold paper into halves, quarters.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Fair or not?']] }, { t: 'Parts of a group', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Share counters.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Unequal halves.', 'Quarter bigger than half.'], activities: ['Paper folding.', 'Share fruit fairly.'],
      exit: ['Half of 14.', 'Shade ¾ of a circle.', 'Quarter of 16.'], homework: 'Cut a chapati or paper circle into quarters. Shade three-quarters.'
    },
    slides: [{ t: 'Fair Share', b: ['Equal parts', 'Half and quarter', 'Part of a group'] }, { t: 'Check yourself', b: ['Half of 16?', 'Quarter of 12?'] }],
    fs: { groups: [['Parts of a whole', [['½', '1 of 2 equal parts'], ['¼', '1 of 4 equal parts'], ['¾', '3 of 4 equal parts'], ['2/4', '= ½']]], ['Parts of a group', [['Half of 12', '6'], ['Quarter of 12', '3'], ['¾ of 12', '9']]]],
      ex: [['Half of 24', '12'], ['¾ of 16', '12']], rem: ['Parts must be equal.', 'Half is bigger than a quarter.', 'Share to find part of a group.'] }
  });
})();
