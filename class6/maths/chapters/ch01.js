/*
TOOL:    class6_maths_ch01
FAMILY:  CBSE_REVISION / Class 6 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 1 Patterns in Mathematics (number sequences, triangular and square numbers, sums of odd numbers, shape sequences) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 1, part: 'All chapters', short: 'Patterns', title: 'Patterns in Mathematics',
    blurb: 'Mathematics as the study of patterns: number sequences (counting, odd, even, triangular, square, cube numbers, powers of 2, Virahanka numbers), seeing them as pictures, relations between sequences, and shape sequences.',
    revise: {
      oneLine: 'Famous sequences: odd 1, 3, 5, 7…; triangular 1, 3, 6, 10…; squares 1, 4, 9, 16…; cubes 1, 8, 27…; powers of 2: 1, 2, 4, 8…; Virahanka 1, 2, 3, 5, 8, 13… Adding the first n odd numbers gives n² — the L-shapes build a square.',
      sections: [
        { h: 'Pictures of sequences', html: `<p>Triangular numbers are dots in triangles; square numbers are dots in squares. Two copies of a triangular number make a rectangle: T(n) = n(n + 1)/2.</p>` },
        { h: 'Relations', html: `<p>1 + 3 + 5 + … (n odd numbers) = n². Two consecutive triangular numbers add to a square: 6 + 10 = 16. 1 + 2 + … + n + … + 2 + 1 = n².</p>` },
        { h: 'Shape sequences', html: `<p>Regular polygons (3, 4, 5… sides), stacked squares, the Koch snowflake: count sides, lines or small squares in each step.</p>` }
      ],
      formulas: [['n-th odd number', '2n − 1'], ['Sum of first n odd numbers', 'n²'], ['Triangular T(n)', 'n(n + 1)/2'], ['Virahanka', 'each = sum of previous two']],
      terms: [['Sequence', 'list following a rule'], ['Term', 'one number in it'], ['Triangular number', 'dots in a triangle']],
      traps: ['Guessing a rule from only two terms.', 'n² means n × n, not 2n.', 'Virahanka adds the previous two, not doubles.'],
      bridge: '<p>Ch 5 (Prime Time) and Class 7 algebra describe patterns with letters.</p>'
    },
    explore: [
      { title: 'Dot pictures', intro: 'Choose a sequence and the term number.',
        build(el, K) { let s = 0, n = 4; const row = K.row(el); K.select(row, 'sequence', ['triangular', 'square', 'odd numbers as L-shapes'], i => { s = i; b.redraw(); }); K.slider(row, 'term n', 1, 8, 1, n, v => { n = v; b.redraw(); });
          const b = new K.Board(el, { xmin: -0.5, xmax: 8.5, ymin: -0.5, ymax: 8.5, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const cols = [C.blue, C.orange, C.purple, C.yellow, C.sky];
            if (s === 0) { for (let r = 0; r < n; r++) for (let c = 0; c <= r; c++) b.dot(c + 0.5 + (n - 1 - r) * 0.5, n - r - 0.5, { r: 9, color: C.blue }); rd.innerHTML = `T(${n}) = 1 + 2 + … + ${n} = <b>${n * (n + 1) / 2}</b> = ${n} × ${n + 1} ÷ 2`; }
            else { for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) { const L = Math.max(r, c); b.dot(c + 0.5, r + 0.5, { r: 9, color: s === 2 ? cols[L % 5] : C.orange }); } rd.innerHTML = s === 1 ? `${n}² = ${n} × ${n} = <b>${n * n}</b>` : `${Array.from({ length: n }, (_, i) => 2 * i + 1).join(' + ')} = <b>${n * n}</b> = ${n}² (each colour is one L-shape)`; } };
          b.redraw(); return null; } },
      { title: 'Sequence explorer', intro: 'See the first terms of famous sequences; press <kbd>S</kbd> to reveal one more.',
        build(el, K) { const SQ = [['odd numbers', i => 2 * i + 1], ['triangular', i => (i + 1) * (i + 2) / 2], ['squares', i => (i + 1) ** 2], ['cubes', i => (i + 1) ** 3], ['powers of 2', i => 2 ** i], ['Virahanka', i => { let a = 1, c = 2; for (let k = 0; k < i; k++) [a, c] = [c, a + c]; return a; }]]; let k = 5; const row = K.row(el); K.select(row, 'sequence', SQ.map(s => s[0]), i => { k = i; an.reset(); }); const s0 = row.querySelector('select'); if (s0) s0.value = 5; const rd = K.read(el); const an = new K.Anim(12, () => draw(), { ms: 500 });
          function draw() { const m = Math.max(3, an.i + 3); const t = Array.from({ length: m }, (_, i) => SQ[k][1](i)); const d = t.slice(1).map((x, i) => x - t[i]); rd.innerHTML = `<div style="font-size:22px">${t.join(', ')}, …</div>differences: ${d.join(', ')}`; } K.anim(el, an); draw(); return an; } }
    ],
    gens: [
      { title: 'Next term', gen(R) { const t = R.pick([['odd', i => 2 * i + 1], ['triangular', i => (i + 1) * (i + 2) / 2], ['square', i => (i + 1) ** 2], ['powers of 2', i => 2 ** i], ['Virahanka', i => [1, 2, 3, 5, 8, 13, 21, 34, 55, 89][i]]]); const s = R.int(0, 4); const a = [0, 1, 2, 3].map(i => t[1](s + i)); return { q: `Next term: ${a.join(', ')}, __`, a: String(t[1](s + 4)), ans: t[1](s + 4) }; } },
      { title: 'Sum of odd numbers', gen(R) { const n = R.int(4, 15); return { q: `1 + 3 + 5 + … + ${2 * n - 1} = ?`, a: String(n * n), ans: n * n, s: `${n} odd numbers → ${n}²` }; } },
      { title: 'Triangular numbers', levels: [2, 3], gen(R) { const n = R.int(5, 20); return { q: `1 + 2 + 3 + … + ${n} = ?`, a: String(n * (n + 1) / 2), ans: n * (n + 1) / 2 }; } },
      { title: 'Up and down', levels: [2, 3], gen(R) { const n = R.int(4, 12); return { q: `1 + 2 + … + ${n} + … + 2 + 1 = ?`, a: String(n * n), ans: n * n }; } },
      { title: 'Shape sequence', levels: [3], gen(R) { const n = R.int(5, 12); return R.chance(.5) ? { q: `Regular polygons: triangle, square, pentagon, … How many sides in the ${n}th shape?`, a: String(n + 2), ans: n + 2 } : { q: `Each step joins every pair of ${n} points by a line. How many lines?`, a: String(n * (n - 1) / 2), ans: n * (n - 1) / 2 }; } }
    ],
    quiz: [
      { q: '1 + 3 + 5 + 7 + 9', o: ['25', '20', '30', '16'], a: 0, e: '5².' }, { q: 'Next triangular after 10', o: ['15', '14', '16', '20'], a: 0, e: '+5.' },
      { q: 'Virahanka: 3, 5, 8, __', o: ['13', '11', '16', '12'], a: 0, e: '5 + 8.' }, { q: '6 + 10 =', o: ['16, a square', '15', '17', '60'], a: 0, e: 'Consecutive triangles.' },
      { q: '5th odd number', o: ['9', '10', '11', '5'], a: 0, e: '2 × 5 − 1.' }, { q: 'Cube of 3', o: ['27', '9', '6', '81'], a: 0, e: '3 × 3 × 3.' },
      { q: 'Powers of 2: 16, 32, __', o: ['64', '48', '34', '62'], a: 0, e: 'Double.' }, { q: '1 + 2 + … + 10', o: ['55', '50', '100', '45'], a: 0, e: '10 × 11 ÷ 2.' },
      { q: '7²', o: ['49', '14', '42', '77'], a: 0, e: '7 × 7.' }, { q: '1 + 2 + 3 + 2 + 1', o: ['9', '6', '8', '10'], a: 0, e: '3².' },
      { q: 'Lines joining 4 points (all pairs)', o: ['6', '4', '8', '12'], a: 0, e: '4 × 3 ÷ 2.' }
    ],
    teach: {
      outcomes: ['Recognise and extend famous sequences', 'Visualise sequences with dots', 'Explain relations such as sum of odds = square'],
      periods: [{ t: 'Number sequences', flow: [['10 min', 'Pattern hunt.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Differences.']] }, { t: 'Pictures and relations', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Prove 1+3+5 = n² with counters.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['n² = 2n.', 'Rule from two terms.'], activities: ['Counter triangles and squares.', 'Virahanka with short and long syllables.'],
      exit: ['Sum of first 12 odd numbers.', 'T(8).', 'Next Virahanka after 21, 34.'], homework: 'Find a pattern in a calendar month (diagonals, squares of 4 dates) and explain why it works.'
    },
    slides: [{ t: 'Patterns in Mathematics', b: ['Famous sequences', 'Dot pictures', 'Sum of odd numbers', 'Shape sequences'] }, { t: 'Check yourself', b: ['1 + 3 + … + 19?', 'T(6)?'] }],
    fs: { groups: [['Sequences', [['Odd', '1, 3, 5, 7…'], ['Triangular', '1, 3, 6, 10…'], ['Squares', '1, 4, 9, 16…'], ['Cubes', '1, 8, 27, 64…'], ['Powers of 2', '1, 2, 4, 8…'], ['Virahanka', '1, 2, 3, 5, 8…']]], ['Relations', [['1 + 3 + … (n terms)', 'n²'], ['T(n)', 'n(n + 1)/2'], ['T(n−1) + T(n)', 'n²']]]],
      ex: [['1 + 3 + … + 15', '64'], ['1 + … + 20', '210']], rem: ['Draw the sequence.', 'Check the rule on all terms.', 'Look at differences.'] }
  });
})();
