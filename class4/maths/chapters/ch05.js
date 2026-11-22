/*
TOOL:    class4_maths_ch05
FAMILY:  CBSE_REVISION / Class 4 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 5 Sharing and Measuring (fractions: halves, thirds, quarters, sixths, eighths; fraction of a collection) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 5, part: 'All chapters', short: 'Fractions', title: 'Sharing and Measuring',
    blurb: 'Fractions from fair sharing: halves, thirds, quarters, sixths, eighths; fractions of a length and of a collection; comparing unit fractions; equal fractions.',
    revise: {
      oneLine: 'A fraction names equal parts of a whole: 3/4 means 4 equal parts, 3 taken. The more parts, the smaller each part: 1/8 < 1/4 < 1/2. To find 2/3 of 12, find 1/3 (12 ÷ 3 = 4) and take 2 of them (8).',
      sections: [
        { h: 'Parts of a whole', html: `<p>Numerator (top) = parts taken; denominator (bottom) = equal parts in the whole.</p>` },
        { h: 'Comparing', html: `<p>Unit fractions: 1/2 > 1/3 > 1/4. Equal fractions: 1/2 = 2/4 = 4/8.</p>` },
        { h: 'Of a collection', html: `<p>3/4 of 20: 20 ÷ 4 = 5, 5 × 3 = 15.</p>` }
      ],
      formulas: [['a/b', 'b equal parts, a taken'], ['1 whole', 'b/b'], ['a/b of n', '(n ÷ b) × a'], ['Equal fractions', '1/2 = 2/4 = 4/8']],
      terms: [['Numerator', 'parts taken'], ['Denominator', 'equal parts in all'], ['Unit fraction', 'numerator 1']],
      traps: ['Bigger denominator does not mean bigger fraction.', 'Parts must be equal.', 'Forgetting to multiply by the numerator.'],
      bridge: '<p>Class 5 compares and adds fractions.</p>'
    },
    explore: [
      { title: 'Fraction strips', intro: 'Two strips of the same length. Compare the shaded parts.',
        build(el, K) { let a = [3, 4], c = [5, 8]; const row = K.row(el); K.slider(row, 'top: parts', 2, 8, 1, a[1], v => { a[1] = v; a[0] = Math.min(a[0], v); b.redraw(); }); K.slider(row, 'top: shaded', 0, 8, 1, a[0], v => { a[0] = Math.min(v, a[1]); b.redraw(); }); const row2 = K.row(el); K.slider(row2, 'bottom: parts', 2, 8, 1, c[1], v => { c[1] = v; c[0] = Math.min(c[0], v); b.redraw(); }); K.slider(row2, 'bottom: shaded', 0, 8, 1, c[0], v => { c[0] = Math.min(v, c[1]); b.redraw(); });
          const b = new K.Board(el, { xmin: -0.3, xmax: 10.3, ymin: -0.3, ymax: 3.3, axes: false, grid: 0, aspect: 0.32 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); [[a, 2, C.blue, 'rgba(29,78,216,.45)'], [c, 0.3, C.orange, 'rgba(234,88,12,.45)']].forEach(([f, y, col, fill]) => { for (let i = 0; i < f[1]; i++) b.rect(10 * i / f[1], y, 10 / f[1], 1, { fill: i < f[0] ? fill : '#fff', color: col, w: 2 }); });
            const x = a[0] / a[1], y = c[0] / c[1]; rd.innerHTML = `<b>${a[0]}/${a[1]}</b> ${Math.abs(x - y) < 1e-9 ? '=' : x > y ? '>' : '<'} <b>${c[0]}/${c[1]}</b>${Math.abs(x - y) < 1e-9 ? ' (equal fractions)' : ''}`; };
          b.redraw(); return null; } },
      { title: 'Fraction of a collection', intro: 'Choose the collection and the fraction.',
        build(el, K) { let n = 24, den = 4, num = 3; const row = K.row(el); K.select(row, 'fraction', ['1/2', '1/3', '2/3', '1/4', '3/4', '1/6', '5/6', '3/8'], i => { [num, den] = ['1/2', '1/3', '2/3', '1/4', '3/4', '1/6', '5/6', '3/8'][i].split('/').map(Number); draw(); }); const s0 = row.querySelector('select'); if (s0) s0.value = 4; K.slider(row, 'marbles', 24, 48, 24, n, v => { n = v; draw(); }); const rd = K.read(el);
          function draw() { const g = n / den; rd.innerHTML = `<div style="font-size:18px">${Array.from({ length: den }, (_, i) => `<span style="display:inline-block;border:2px dashed var(--blue,#1d4ed8);border-radius:8px;padding:2px 4px;margin:2px;${i < num ? 'background:var(--orangeL,rgba(234,88,12,.16))' : ''}">${'●'.repeat(g)}</span>`).join('')}</div>${num}/${den} of ${n}: ${n} ÷ ${den} = ${g}, ${g} × ${num} = <b>${g * num}</b>`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Name the fraction', gen(R) { const d = R.pick([2, 3, 4, 6, 8]), n = R.int(1, d - 1); return { q: `A roti is cut into ${d} equal parts and ${n} are eaten. What fraction is eaten?`, a: `${n}/${d}` }; } },
      { title: 'Unit fraction of a number', gen(R) { const d = R.pick([2, 3, 4, 5, 6, 8]), k = R.int(2, 10); return { q: `1/${d} of ${d * k} = ?`, a: String(k), ans: k }; } },
      { title: 'Fraction of a number', levels: [2, 3], gen(R) { const d = R.pick([3, 4, 6, 8]), n = R.int(2, d - 1), k = R.int(2, 8); return { q: `${n}/${d} of ${d * k} = ?`, a: String(n * k), ans: n * k, s: `${d * k} ÷ ${d} = ${k}, × ${n}` }; } },
      { title: 'Compare unit fractions', gen(R) { let a = R.pick([2, 3, 4, 6, 8]), b = R.pick([2, 3, 4, 6, 8]); if (a === b) b = a === 8 ? 2 : 8; return { q: `1/${a} __ 1/${b}`, a: a < b ? '>' : '<' }; } },
      { title: 'Equal fractions', levels: [3], gen(R) { const t = R.pick([[1, 2], [1, 3], [3, 4], [1, 4], [2, 3]]), k = R.int(2, 4); return { q: `${t[0]}/${t[1]} = __/${t[1] * k}`, a: String(t[0] * k), ans: t[0] * k }; } }
    ],
    quiz: [
      { q: '3/4 means', o: ['4 equal parts, 3 taken', '3 parts, 4 taken', '34', '3 + 4'], a: 0, e: 'Denominator 4.' }, { q: 'Bigger: 1/3 or 1/6', o: ['1/3', '1/6', 'equal', 'cannot tell'], a: 0, e: 'Fewer parts.' },
      { q: '1/4 of 20', o: ['5', '4', '80', '16'], a: 0, e: '20 ÷ 4.' }, { q: '3/4 of 20', o: ['15', '5', '12', '60'], a: 0, e: '5 × 3.' },
      { q: '1/2 =', o: ['2/4', '1/4', '2/2', '1/3'], a: 0, e: 'Equal fraction.' }, { q: 'Whole =', o: ['4/4', '1/4', '0/4', '4/1 only'], a: 0, e: 'All parts.' },
      { q: 'Denominator of 5/8', o: ['8', '5', '13', '3'], a: 0, e: 'Bottom.' }, { q: '2/3 of 12', o: ['8', '4', '6', '18'], a: 0, e: '4 × 2.' },
      { q: 'Smallest: 1/2, 1/4, 1/8, 1/3', o: ['1/8', '1/2', '1/4', '1/3'], a: 0, e: 'Most parts.' }, { q: 'Unequal pieces can be called fractions?', o: ['no', 'yes', 'only halves', 'only in maths'], a: 0, e: 'Must be equal.' },
      { q: '4/8 =', o: ['1/2', '1/4', '4', '2/8'], a: 0, e: 'Half.' }
    ],
    teach: {
      outcomes: ['Name fractions of a whole and a collection', 'Compare unit fractions', 'Spot equal fractions'],
      periods: [{ t: 'Fractions of a whole', flow: [['10 min', 'Paper strip folding.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Compare strips.']] }, { t: 'Of a collection', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Share counters.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['1/8 > 1/4 because 8 > 4.', 'Unequal parts.'], activities: ['Fraction wall.', 'Share sweets in groups.'],
      exit: ['3/8 of 24.', 'Compare 1/5 and 1/3.', '2/3 = ?/6.'], homework: 'Fold a paper strip into 2, 4 and 8 parts and show 1/2 = 2/4 = 4/8.'
    },
    slides: [{ t: 'Sharing and Measuring', b: ['Equal parts', 'Numerator and denominator', 'Compare', 'Fraction of a number'] }, { t: 'Check yourself', b: ['2/5 of 30?', 'Bigger: 1/4 or 1/6?'] }],
    fs: { groups: [['Fraction', [['a/b', 'b equal parts, a taken'], ['Whole', 'b/b']]], ['Compare', [['Unit fractions', 'more parts → smaller'], ['Equal', '1/2 = 2/4 = 4/8']]], ['Of a number', [['a/b of n', 'n ÷ b × a'], ['3/4 of 20', '15']]]],
      ex: [['2/3 of 18', '12'], ['1/3 vs 1/5', '1/3 bigger']], rem: ['Parts must be equal.', 'Divide by the bottom, multiply by the top.', 'Use strips to compare.'] }
  });
})();
