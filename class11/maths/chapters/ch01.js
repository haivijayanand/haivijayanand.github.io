/*
TOOL:    class11_maths_ch01
FAMILY:  CBSE_REVISION / Class 11 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 1 Sets - revise, exam focus, 2 explore panels (Venn counts, operation shader), 8 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num } = G9;
  const setH = (a) => `{${a.join(', ')}}`;

  G9.register({
    no: 1, part: 'Unit I · Sets and Functions (23 marks)', short: 'Sets', title: 'Sets',
    blurb: 'Roster and set-builder forms, subsets, power set, intervals, Venn diagrams, operations, counting.',
    revise: {
      oneLine: 'A set is a well-defined collection. Union, intersection, difference and complement build new sets; Venn diagrams make them visible, and n(A ∪ B) = n(A) + n(B) − n(A ∩ B) counts them.',
      sections: [
        { h: 'Describing sets', html: `<ul><li><b>Roster</b>: list the elements, {1, 2, 3}. Order and repetition do not matter.</li><li><b>Set-builder</b>: {x : x is a natural number less than 4}.</li>
          <li>Empty set ∅ = { }; finite / infinite sets; equal sets have exactly the same elements.</li><li>Standard sets: N ⊂ Z ⊂ Q ⊂ R; T = irrationals.</li></ul>` },
        { h: 'Subsets, power set, intervals', html: `<p>A ⊆ B if every element of A is in B. ∅ and A itself are subsets of A. A set with n elements has <b>2ⁿ subsets</b>; the set of all subsets is the <b>power set</b> P(A).</p>
          <p>Intervals: (a, b) = {x : a &lt; x &lt; b}, [a, b] includes both ends, [a, b) and (a, b] include one. Length b − a.</p>` },
        { h: 'Operations', html: `<ul><li>A ∪ B: in A <b>or</b> B. A ∩ B: in <b>both</b>. Disjoint if A ∩ B = ∅.</li><li>A − B: in A but not in B.</li><li>Complement A′ = U − A.</li></ul>
          <p><b>Laws:</b> commutative, associative, distributive A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C), <b>De Morgan</b>: (A ∪ B)′ = A′ ∩ B′, (A ∩ B)′ = A′ ∪ B′.</p>` },
        { h: 'Counting', html: `<div class="box m">n(A ∪ B) = n(A) + n(B) − n(A ∩ B)</div>
          <p>Three sets: n(A ∪ B ∪ C) = n(A) + n(B) + n(C) − n(A ∩ B) − n(B ∩ C) − n(C ∩ A) + n(A ∩ B ∩ C).</p>
          <p>"Only A" = n(A) − n(A ∩ B). "Neither" = n(U) − n(A ∪ B).</p>` }
      ],
      formulas: [['Subsets of n-element set', '2ⁿ'], ['Proper subsets', '2ⁿ − 1'], ['Union count', 'n(A ∪ B) = n(A) + n(B) − n(A ∩ B)'], ['De Morgan', "(A ∪ B)′ = A′ ∩ B′, (A ∩ B)′ = A′ ∪ B′"], ['Difference', 'A − B = A ∩ B′']],
      terms: [['Universal set U', 'contains all sets under discussion'], ['Power set', 'set of all subsets'], ['Disjoint sets', 'no common element'], ['Singleton', 'set with one element']],
      traps: ['{∅} is not empty — it has one element.', 'Writing repeated elements in roster form.', '"Neither" means outside A ∪ B, not outside A ∩ B.', 'Interval (2, 5] excludes 2 and includes 5.'],
      board: '<p><b>Unit I — 23 marks</b> (Sets, Relations and Functions, Trigonometric Functions). Expect 1-mark questions on subsets/power set/intervals, 2–3 marks on operations and Venn problems, and a word problem on n(A ∪ B).</p>',
      bridge: '<p>Ch 2 builds relations and functions on Cartesian products of sets; Ch 14 (Probability) uses events as sets.</p>'
    },

    explore: [
      {
        title: 'Venn diagram counting', intro: 'Set the region counts; every formula follows from the picture.',
        build(el, K) {
          let a = 12, ab = 5, b = 8, ne = 10; const row = K.row(el);
          [['only A', 0, 30, v => a = v, a], ['A ∩ B', 0, 20, v => ab = v, ab], ['only B', 0, 30, v => b = v, b], ['neither', 0, 30, v => ne = v, ne]].forEach(s => K.slider(row, s[0], s[1], s[2], 1, s[4], v => { s[3](v); bd.redraw(); }));
          const bd = new K.Board(el, { xmin: 0, xmax: 100, ymin: 0, ymax: 50, axes: false, grid: 0 }); const rd = K.read(el);
          bd.onDraw = () => {
            bd.clear(); bd.rect(2, 2, 96, 46, { color: C.ink, w: 2 }); bd.text(6, 45, 'U', { font: 'bold 16px' });
            bd.circle(40, 25, 17, { fill: C.blueL, color: C.blue }); bd.circle(60, 25, 17, { fill: C.orangeL, color: C.orange });
            bd.text(31, 25, String(a), { font: 'bold 20px' }); bd.text(50, 25, String(ab), { font: 'bold 20px', color: C.purple }); bd.text(69, 25, String(b), { font: 'bold 20px' }); bd.text(90, 8, String(ne), { font: 'bold 18px' });
            bd.text(30, 45, 'A', { font: 'bold 16px', color: C.blue }); bd.text(70, 45, 'B', { font: 'bold 16px', color: C.orange });
            rd.innerHTML = `n(A) = ${a + ab}, n(B) = ${b + ab}, n(A ∩ B) = ${ab} ⇒ n(A ∪ B) = ${a + ab} + ${b + ab} − ${ab} = <b>${a + ab + b}</b> · n(U) = ${a + ab + b + ne} · n((A ∪ B)′) = ${ne} · n(A − B) = ${a}`;
          };
          bd.redraw(); return null;
        }
      },
      {
        title: 'Shade an operation', intro: 'Pick an operation; the matching region is shaded. Compare (A ∪ B)′ with A′ ∩ B′ to see De Morgan.',
        build(el, K) {
          const ops = [['A ∪ B', (x, y) => x || y], ['A ∩ B', (x, y) => x && y], ['A − B', (x, y) => x && !y], ['B − A', (x, y) => y && !x], ["A′", (x) => !x], ["(A ∪ B)′", (x, y) => !(x || y)], ["A′ ∩ B′", (x, y) => !x && !y], ["(A ∩ B)′", (x, y) => !(x && y)], ['symmetric difference', (x, y) => x !== y]];
          let o = 0; const row = K.row(el); K.select(row, 'Operation', ops.map(x => x[0]), i => { o = i; bd.redraw(); });
          const bd = new K.Board(el, { xmin: 0, xmax: 100, ymin: 0, ymax: 50, axes: false, grid: 0 }); const rd = K.read(el);
          bd.onDraw = () => {
            bd.clear(); const c = bd.ctx, f = ops[o][1];
            for (let px = bd.X(2); px < bd.X(98); px += 3) for (let py = bd.Y(48); py < bd.Y(2); py += 3) { const x = bd.ix(px), y = bd.iy(py); const inA = (x - 40) ** 2 + (y - 25) ** 2 < 289, inB = (x - 60) ** 2 + (y - 25) ** 2 < 289; if (f(inA, inB)) { c.fillStyle = 'rgba(234,88,12,.45)'; c.fillRect(px, py, 3, 3); } }
            bd.rect(2, 2, 96, 46, { color: C.ink, w: 2 }); bd.circle(40, 25, 17, { color: C.blue, w: 3 }); bd.circle(60, 25, 17, { color: C.purple, w: 3 });
            bd.text(30, 45, 'A', { font: 'bold 16px', color: C.blue }); bd.text(70, 45, 'B', { font: 'bold 16px', color: C.purple }); bd.text(6, 45, 'U', { font: 'bold 16px' });
            rd.innerHTML = `Shaded: <b>${ops[o][0]}</b>${o === 5 || o === 6 ? ' — De Morgan: (A ∪ B)′ = A′ ∩ B′' : o === 7 ? ' — De Morgan: (A ∩ B)′ = A′ ∪ B′' : o === 8 ? ' = (A − B) ∪ (B − A)' : ''}`;
          };
          bd.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Roster and set-builder', levels: [1, 2], gen(R) {
          const items = [['{x : x is a natural number and x² < 30}', '{1, 2, 3, 4, 5}'], ['{x : x is a prime factor of 60}', '{2, 3, 5}'], ['{x : x is an integer and −2 < x ≤ 3}', '{−1, 0, 1, 2, 3}'], ['{x : x is a letter of the word "SCHOOL"}', '{S, C, H, O, L}'], ['{x : x = 2n − 1, n ∈ N, n ≤ 5}', '{1, 3, 5, 7, 9}'], ['{x : x ∈ N, x is a factor of 18}', '{1, 2, 3, 6, 9, 18}']];
          const [q, a] = R.pick(items); return { q: `Write in roster form: ${q}`, a };
        } },
      { title: 'Subsets and power set', gen(R) {
          const n = R.int(1, 7); return { q: `A set has ${n} element${n > 1 ? 's' : ''}. How many subsets and how many proper subsets does it have? How many elements does P(P(A)) have?`, a: `${2 ** n} subsets, ${2 ** n - 1} proper subsets; n(P(P(A))) = 2^${2 ** n}`, ans: 2 ** n, s: '2ⁿ subsets' };
        } },
      { title: 'Union, intersection, difference', gen(R) {
          const U = Array.from({ length: 10 }, (_, i) => i + 1); const A = R.shuffle(U).slice(0, R.int(3, 6)).sort((x, y) => x - y), B = R.shuffle(U).slice(0, R.int(3, 6)).sort((x, y) => x - y);
          const un = U.filter(x => A.includes(x) || B.includes(x)), in_ = A.filter(x => B.includes(x)), d = A.filter(x => !B.includes(x)), comp = U.filter(x => !A.includes(x));
          return { q: `U = {1, 2, …, 10}, A = ${setH(A)}, B = ${setH(B)}. Find A ∪ B, A ∩ B, A − B and A′.`, a: `A ∪ B = ${setH(un)}, A ∩ B = ${in_.length ? setH(in_) : '∅'}, A − B = ${d.length ? setH(d) : '∅'}, A′ = ${setH(comp)}` };
        } },
      { title: 'Counting with n(A ∪ B)', gen(R, L) {
          const ab = R.int(5, 25), a = ab + R.int(5, 30), b = ab + R.int(5, 30), tot = a + b - ab + R.int(0, 20);
          const sub = R.pick([['tea', 'coffee'], ['Hindi', 'English'], ['cricket', 'football'], ['Physics', 'Chemistry']]);
          return L === 1 ? { q: `In a group, ${a} like ${sub[0]}, ${b} like ${sub[1]} and ${ab} like both. How many like at least one?`, a: String(a + b - ab), ans: a + b - ab, s: `n(A ∪ B) = ${a} + ${b} − ${ab}` }
            : { q: `In a survey of ${tot} people, ${a} like ${sub[0]}, ${b} like ${sub[1]} and ${ab} like both. How many like (i) only ${sub[0]} (ii) neither?`, a: `(i) ${a - ab} (ii) ${tot - (a + b - ab)}`, s: `only A = ${a} − ${ab}; neither = ${tot} − ${a + b - ab}` };
        } },
      { title: 'Intervals', levels: [1, 2], gen(R) {
          const a = R.int(-6, 4), b = a + R.int(2, 8), t = R.int(0, 3);
          const forms = [[`{x : ${a} < x < ${b}}`, `(${a}, ${b})`], [`{x : ${a} ≤ x ≤ ${b}}`, `[${a}, ${b}]`], [`{x : ${a} ≤ x < ${b}}`, `[${a}, ${b})`], [`{x : ${a} < x ≤ ${b}}`, `(${a}, ${b}]`]][t];
          return { q: `Write as an interval: ${forms[0]}. What is its length?`, a: `${forms[1]}, length ${b - a}` };
        } },
      { title: 'Three sets', levels: [3], gen(R) {
          const abc = R.int(2, 6), ab = abc + R.int(2, 8), bc = abc + R.int(2, 8), ca = abc + R.int(2, 8), a = ab + ca - abc + R.int(5, 15), b = ab + bc - abc + R.int(5, 15), c = bc + ca - abc + R.int(5, 15);
          const u = a + b + c - ab - bc - ca + abc;
          return { q: `In a class, ${a} study Maths, ${b} Physics and ${c} Chemistry; ${ab} study Maths and Physics, ${bc} Physics and Chemistry, ${ca} Chemistry and Maths, and ${abc} study all three. How many study at least one subject?`, a: String(u), ans: u, s: `${a} + ${b} + ${c} − ${ab} − ${bc} − ${ca} + ${abc}` };
        } },
      { title: 'Is it a subset? / equal sets', levels: [1, 2], gen(R) {
          const items = [['{a, b} ⊂ {b, c, a}', 'True'], ['{a} ∈ {a, b, c}', 'False ({a} is a subset, a is the element)'], ['∅ ⊂ every set', 'True'], ['{1, 2, 3} = {3, 1, 2, 2}', 'True (order and repetition do not matter)'], ['{x : x + 5 = 5} = ∅', 'False (it is {0})'], ['{2, 3} ⊂ {x : x is prime}', 'True']];
          const [q, a] = R.pick(items); return { q: `True or false: ${q}`, a };
        } },
      { title: 'De Morgan check', levels: [2, 3], gen(R) {
          const U = [1, 2, 3, 4, 5, 6, 7, 8]; const A = R.shuffle(U).slice(0, 4).sort((x, y) => x - y), B = R.shuffle(U).slice(0, 3).sort((x, y) => x - y);
          const l = U.filter(x => !(A.includes(x) || B.includes(x)));
          return { q: `U = {1, …, 8}, A = ${setH(A)}, B = ${setH(B)}. Verify (A ∪ B)′ = A′ ∩ B′.`, a: `Both sides = ${l.length ? setH(l) : '∅'}` };
        } }
    ],

    quiz: [
      { q: 'Number of subsets of {1, 2, 3, 4}', o: ['8', '16', '4', '15'], a: 1, e: '2⁴.' },
      { q: '(A ∪ B)′ =', o: ["A′ ∪ B′", "A′ ∩ B′", 'A ∩ B', "A − B′"], a: 1, e: 'De Morgan.' },
      { q: 'n(A) = 20, n(B) = 15, n(A ∩ B) = 5. n(A ∪ B) =', o: ['30', '35', '40', '25'], a: 0, e: '20 + 15 − 5.' },
      { q: 'Which is the empty set?', o: ['{0}', '{∅}', '{x : x ∈ N, x < 1}', '{x : x² = 1}'], a: 2, e: 'No natural number is less than 1.' },
      { q: 'A − B equals', o: ["A ∩ B′", "A′ ∩ B", 'A ∪ B', "B − A"], a: 0, e: 'In A, not in B.' },
      { q: 'Interval form of {x : −3 < x ≤ 4}', o: ['(−3, 4]', '[−3, 4)', '(−3, 4)', '[−3, 4]'], a: 0, e: 'Open at −3, closed at 4.' },
      { q: 'If A ⊂ B then A ∪ B =', o: ['A', 'B', '∅', 'A ∩ B'], a: 1, e: 'Everything in A is in B.' },
      { q: 'Number of elements of P(∅)', o: ['0', '1', '2', 'undefined'], a: 1, e: 'P(∅) = {∅}.' },
      { q: 'Two sets with no common element are', o: ['equal', 'disjoint', 'equivalent', 'universal'], a: 1, e: 'Definition.' },
      { q: 'A ∪ (B ∩ C) =', o: ['(A ∪ B) ∩ (A ∪ C)', '(A ∩ B) ∪ C', 'A ∩ B ∩ C', '(A ∪ B) ∪ C'], a: 0, e: 'Distributive law.' },
      { q: 'If n(U) = 50, n(A ∪ B) = 38, then n(A′ ∩ B′) =', o: ['12', '88', '38', '50'], a: 0, e: '= n((A ∪ B)′).' }
    ],

    teach: {
      outcomes: ['Represent sets in roster and set-builder form', 'Find subsets, power sets and intervals', 'Perform set operations and use De Morgan laws', 'Solve counting problems with Venn diagrams'],
      periods: [
        { t: 'Describing sets', flow: [['10 min', 'Well-defined vs not ("good students" is not a set).'], ['15 min', 'Roster/set-builder conversions; empty, finite, equal sets.'], ['15 min', 'Subsets, power sets, intervals.']] },
        { t: 'Operations', flow: [['15 min', 'Explore panel 2: shade operations; De Morgan.'], ['15 min', 'Laws with Venn diagrams.'], ['10 min', 'Practice.']] },
        { t: 'Counting', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Survey problems, three sets.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['∈ vs ⊂.', '{∅} treated as empty.', '"Neither" region mis-identified.'],
      activities: ['Class survey (two hobbies) → Venn diagram on the board.', 'Hula-hoop Venn diagram with students standing in regions.'],
      exit: ['Subsets of {a, b, c}?', 'n(A) = 30, n(B) = 25, n(A ∪ B) = 45: n(A ∩ B)?', 'Shade (A ∩ B)′.'],
      homework: 'In a town of 10 000 families, 40% buy newspaper A, 20% buy B, 10% buy C, 5% A and B, 3% B and C, 4% A and C, 2% all three. How many buy only A? How many buy none?'
    },

    slides: [
      { t: 'Sets', b: ['Well-defined collections', 'Roster and set-builder', 'Subsets, power set, intervals', 'Operations and counting'] },
      { t: 'Subsets', b: ['A ⊆ B: every element of A is in B', 'n elements ⇒ 2ⁿ subsets', 'Power set P(A)'] },
      { t: 'Operations', b: ['A ∪ B, A ∩ B, A − B, A′', 'Disjoint: A ∩ B = ∅', "De Morgan: (A ∪ B)′ = A′ ∩ B′"] },
      { t: 'Counting', b: ['n(A ∪ B) = n(A) + n(B) − n(A ∩ B)', 'Only A = n(A) − n(A ∩ B)', 'Neither = n(U) − n(A ∪ B)'] },
      { t: 'Check yourself', b: ['Subsets of a 5-element set?', 'n(A) = 10, n(B) = 8, n(A ∩ B) = 3: n(A ∪ B)?', 'Answers: 32 · 15'] }
    ],

    fs: { groups: [
        ['Basics', [['Roster', 'list elements {1, 2, 3}'], ['Set-builder', '{x : property}'], ['Empty set', '∅ = { }'], ['N ⊂ Z ⊂ Q ⊂ R', 'standard sets']]],
        ['Subsets', [['A ⊆ B', 'every element of A is in B'], ['Number of subsets', '2ⁿ'], ['Proper subsets', '2ⁿ − 1'], ['Power set', 'P(A), n = 2ⁿ']]],
        ['Intervals', [['(a, b)', 'a < x < b'], ['[a, b]', 'a ≤ x ≤ b'], ['[a, b), (a, b]', 'one end included'], ['Length', 'b − a']]],
        ['Operations and laws', [['A − B', "A ∩ B′"], ['Distributive', 'A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)'], ['De Morgan', "(A ∪ B)′ = A′ ∩ B′, (A ∩ B)′ = A′ ∪ B′"], ['A ∪ A′', 'U'], ['A ∩ A′', '∅']]],
        ['Counting', [['Two sets', 'n(A ∪ B) = n(A) + n(B) − n(A ∩ B)'], ['Three sets', 'Σn(A) − Σn(A ∩ B) + n(A ∩ B ∩ C)'], ['Neither', 'n(U) − n(A ∪ B)']]]],
      ex: [['n(A) = 40, n(B) = 30, n(A ∩ B) = 10', 'n(A ∪ B) = 60, only A = 30'], ['Subsets of {a, b, c, d}', '2⁴ = 16']],
      rem: ['∈ is for elements, ⊂ for sets.', '{∅} has one element.', 'Draw the Venn diagram first.'] }
  });
})();
