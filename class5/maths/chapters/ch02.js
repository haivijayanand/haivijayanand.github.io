/*
TOOL:    class5_maths_ch02
FAMILY:  CBSE_REVISION / Class 5 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 2 Fractions (equivalent fractions, comparing, adding and subtracting like fractions, mixed numbers, fraction of a quantity) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 2, part: 'All chapters', short: 'Fractions', title: 'Fractions',
    blurb: 'Equivalent fractions, comparing fractions, adding and subtracting fractions with the same denominator, fractions greater than one (mixed numbers) and fractions of quantities.',
    revise: {
      oneLine: 'Multiply or divide top and bottom by the same number to get an equivalent fraction: 2/3 = 4/6 = 8/12. With the same denominator, add or subtract the numerators: 3/8 + 2/8 = 5/8. 7/4 = 1¾.',
      sections: [
        { h: 'Equivalent fractions', html: `<p>1/2 = 2/4 = 3/6 = 4/8. Simplest form: divide by a common factor: 6/8 = 3/4.</p>` },
        { h: 'Comparing', html: `<p>Same denominator: bigger numerator wins. Same numerator: smaller denominator wins. Otherwise make denominators equal: 2/3 = 8/12 and 3/4 = 9/12, so 2/3 &lt; 3/4.</p>` },
        { h: 'Adding, mixed numbers', html: `<p>5/6 + 3/6 = 8/6 = 1 2/6 = 1 1/3. 2 1/4 = 9/4.</p>` }
      ],
      formulas: [['Equivalent', 'a/b = (a×k)/(b×k)'], ['Same denominator', 'add numerators'], ['Mixed', 'whole + proper fraction'], ['a/b of n', 'n ÷ b × a']],
      terms: [['Equivalent', 'same value'], ['Proper', 'top < bottom'], ['Improper', 'top ≥ bottom'], ['Mixed number', '1 ¾']],
      traps: ['Adding denominators: 1/4 + 1/4 ≠ 2/8.', 'Comparing denominators alone.', 'Changing only the top or only the bottom.'],
      bridge: '<p>Class 6 adds unlike fractions.</p>'
    },
    explore: [
      { title: 'Equivalent fractions', intro: 'Pick a fraction and split each part into more pieces.',
        build(el, K) { let n = 2, d = 3, k = 2; const row = K.row(el); K.slider(row, 'numerator', 1, 5, 1, n, v => { n = Math.min(v, d); b.redraw(); }); K.slider(row, 'denominator', 2, 6, 1, d, v => { d = v; n = Math.min(n, d); b.redraw(); }); K.slider(row, 'split each part into', 1, 4, 1, k, v => { k = v; b.redraw(); });
          const b = new K.Board(el, { xmin: -0.3, xmax: 12.3, ymin: -0.3, ymax: 3.4, axes: false, grid: 0, aspect: 0.3 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); for (let i = 0; i < d; i++) b.rect(12 * i / d, 2, 12 / d, 1, { fill: i < n ? 'rgba(29,78,216,.45)' : '#fff', color: C.blue, w: 3 }); for (let i = 0; i < d * k; i++) b.rect(12 * i / (d * k), 0.3, 12 / (d * k), 1, { fill: i < n * k ? 'rgba(234,88,12,.45)' : '#fff', color: C.orange, w: 2 });
            rd.innerHTML = `<b>${n}/${d}</b> = <b>${n * k}/${d * k}</b> (top and bottom × ${k}) — the shaded lengths are equal`; };
          b.redraw(); return null; } },
      { title: 'Add like fractions', intro: 'Add two fractions with the same denominator on a number line.',
        build(el, K) { let d = 6, a = 5, c = 3; const row = K.row(el); K.slider(row, 'denominator', 2, 10, 1, d, v => { d = v; a = Math.min(a, d); c = Math.min(c, d); b.redraw(); }); K.slider(row, 'first', 1, 10, 1, a, v => { a = Math.min(v, d); b.redraw(); }); K.slider(row, 'second', 1, 10, 1, c, v => { c = Math.min(v, d); b.redraw(); });
          const b = new K.Board(el, { xmin: -0.2, xmax: 2.2, ymin: -0.5, ymax: 0.7, axes: false, grid: 0, aspect: 0.25 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.line(0, 0, 2, 0, { color: C.ink, w: 2 }); for (let i = 0; i <= 2 * d; i++) { b.line(i / d, -0.05, i / d, 0.05, { color: C.ink, w: i % d ? 1 : 3 }); } b.text(0, -0.25, '0'); b.text(1, -0.25, '1'); b.text(2, -0.25, '2');
            b.arrow(0, 0.15, a / d, 0.15, { color: C.blue, w: 4 }); b.arrow(a / d, 0.35, (a + c) / d, 0.35, { color: C.orange, w: 4 });
            const s = a + c, w = Math.floor(s / d), r = s % d; rd.innerHTML = `${a}/${d} + ${c}/${d} = <b>${s}/${d}</b>${w ? ` = ${w}${r ? ` ${r}/${d}` : ''}` : ''}`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Equivalent', gen(R) { const t = R.pick([[1, 2], [1, 3], [2, 3], [3, 4], [2, 5], [3, 5]]), k = R.int(2, 5); return { q: `${t[0]}/${t[1]} = ?/${t[1] * k}`, a: String(t[0] * k), ans: t[0] * k }; } },
      { title: 'Simplest form', gen(R) { const t = R.pick([[1, 2], [2, 3], [3, 4], [1, 3], [2, 5], [4, 5]]), k = R.int(2, 6); return { q: `Write ${t[0] * k}/${t[1] * k} in simplest form.`, a: `${t[0]}/${t[1]}` }; } },
      { title: 'Add or subtract', gen(R) { const d = R.int(4, 12), a = R.int(1, d - 1), b = R.int(1, d - 1); return R.chance(.5) || a === b ? { q: `${a}/${d} + ${b}/${d} = ?`, a: `${a + b}/${d}${a + b >= d ? ` = ${Math.floor((a + b) / d)}${(a + b) % d ? ' ' + ((a + b) % d) + '/' + d : ''}` : ''}` } : { q: `${Math.max(a, b)}/${d} − ${Math.min(a, b)}/${d} = ?`, a: `${Math.abs(a - b)}/${d}` }; } },
      { title: 'Compare', levels: [2, 3], gen(R) { const t = R.pick([[2, 3, 3, 4], [3, 5, 1, 2], [5, 8, 3, 4], [2, 5, 1, 3], [5, 6, 7, 9]]); const x = t[0] / t[1], y = t[2] / t[3]; return { q: `${t[0]}/${t[1]} __ ${t[2]}/${t[3]}`, a: x > y ? '>' : '<' }; } },
      { title: 'Mixed numbers', levels: [2, 3], gen(R) { const d = R.int(2, 8), w = R.int(1, 4), r = R.int(1, d - 1); return R.chance(.5) ? { q: `Write ${w * d + r}/${d} as a mixed number.`, a: `${w} ${r}/${d}` } : { q: `Write ${w} ${r}/${d} as an improper fraction.`, a: `${w * d + r}/${d}` }; } }
    ],
    quiz: [
      { q: '2/3 =', o: ['4/6', '2/6', '3/2', '4/3'], a: 0, e: '× 2.' }, { q: '3/8 + 2/8', o: ['5/8', '5/16', '6/8', '1/8'], a: 0, e: 'Add tops.' },
      { q: '6/8 simplest', o: ['3/4', '2/3', '6/8', '1/2'], a: 0, e: '÷ 2.' }, { q: '7/4 =', o: ['1 3/4', '1 4/7', '7 1/4', '3/4'], a: 0, e: '4 + 3.' },
      { q: 'Bigger: 2/3 or 3/4', o: ['3/4', '2/3', 'equal', 'cannot tell'], a: 0, e: '8/12 < 9/12.' }, { q: '1/4 + 1/4', o: ['1/2', '2/8', '1/8', '2/16'], a: 0, e: '2/4.' },
      { q: '2 1/3 =', o: ['7/3', '5/3', '6/3', '2/3'], a: 0, e: '6 + 1.' }, { q: '5/6 − 1/6', o: ['2/3', '4/0', '1/6', '5/6'], a: 0, e: '4/6.' },
      { q: 'Improper fraction', o: ['9/5', '5/9', '1/2', '3/4'], a: 0, e: 'Top ≥ bottom.' }, { q: '3/5 of 25', o: ['15', '5', '10', '20'], a: 0, e: '5 × 3.' },
      { q: 'Equivalent to 1/2', o: ['5/10', '5/12', '2/3', '1/4'], a: 0, e: '× 5.' }
    ],
    teach: {
      outcomes: ['Make equivalent fractions and simplest forms', 'Compare fractions', 'Add/subtract like fractions', 'Use mixed numbers'],
      periods: [{ t: 'Equivalent', flow: [['10 min', 'Fold strips.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Simplest form.']] }, { t: 'Adding', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Mixed numbers.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Adding denominators.', 'Comparing only denominators.'], activities: ['Fraction wall.', 'Roti sharing stories.'],
      exit: ['3/4 = ?/20.', '7/10 − 3/10.', '11/3 as mixed.'], homework: 'Find a recipe that uses fractions of cups or spoons. Double the recipe and write the new fractions.'
    },
    slides: [{ t: 'Fractions', b: ['Equivalent fractions', 'Comparing', 'Adding like fractions', 'Mixed numbers'] }, { t: 'Check yourself', b: ['2/5 = ?/15', '5/9 + 7/9 ?'] }],
    fs: { groups: [['Equivalent', [['× or ÷ both', '2/3 = 4/6'], ['Simplest', '6/8 = 3/4']]], ['Compare', [['Same bottom', 'bigger top'], ['Same top', 'smaller bottom'], ['Otherwise', 'make bottoms equal']]], ['Add / mixed', [['3/8 + 2/8', '5/8'], ['7/4', '1 3/4']]]],
      ex: [['5/6 + 3/6', '1 1/3'], ['2/3 vs 3/4', '2/3 < 3/4']], rem: ['Never add denominators.', 'Same change top and bottom.', 'Simplify the answer.'] }
  });
})();
