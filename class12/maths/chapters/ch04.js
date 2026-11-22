/*
TOOL:    class12_maths_ch04
FAMILY:  CBSE_REVISION / Class 12 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 4 Determinants - revise, board focus, 2 explore panels (3x3 cofactor expansion stepper, consistency of 2 equations), 7 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num, Q, terms } = G9;
  const M = (A, bar) => `<table style="display:inline-table;vertical-align:middle;border-left:2px solid currentColor;border-right:2px solid currentColor;border-radius:${bar ? 0 : 6}px;border-collapse:separate;border-spacing:8px 2px;margin:2px 3px">${A.map(r => '<tr>' + r.map(v => `<td style="text-align:center;border:0;padding:0 2px">${typeof v === 'number' ? num(v) : v}</td>`).join('') + '</tr>').join('')}</table>`;
  const D = (A) => M(A, true);
  const det2 = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
  const minor = (A, i, j) => A.filter((_, r) => r !== i).map(r => r.filter((_, c) => c !== j));
  const det = (A) => A.length === 2 ? det2(A) : A[0].reduce((s, v, j) => s + (j % 2 ? -1 : 1) * v * det(minor(A, 0, j)), 0);
  const cof = (A, i, j) => ((i + j) % 2 ? -1 : 1) * (A.length === 2 ? minor(A, i, j)[0][0] : det(minor(A, i, j)));
  const adj = (A) => A.map((_, i) => A.map((_, j) => cof(A, j, i)));
  const rnd = (R, n, lo = -4, hi = 5) => Array.from({ length: n }, () => Array.from({ length: n }, () => R.int(lo, hi)));

  G9.register({
    no: 4, part: 'Unit II · Algebra (10 marks)', short: 'Determinants', title: 'Determinants',
    blurb: 'Determinants of order 2 and 3, area of a triangle, minors and cofactors, adjoint and inverse, solving linear systems by the matrix method.',
    revise: {
      oneLine: 'The determinant |A| of a square matrix is a single number; A is invertible exactly when |A| ≠ 0, with A⁻¹ = adj A / |A|. Then the system AX = B has the unique solution X = A⁻¹B.',
      sections: [
        { h: 'Evaluating', html: `<p>|a b; c d| = ad − bc. Order 3: expand along any row or column using cofactors, e.g. |A| = a₁₁A₁₁ + a₁₂A₁₂ + a₁₃A₁₃. Choose the row/column with most zeros.</p>
          <p>Facts: |Aᵀ| = |A|; |AB| = |A||B|; |kA| = kⁿ|A| for order n; swapping two rows changes the sign; two equal rows ⇒ |A| = 0.</p>` },
        { h: 'Area of a triangle', html: `<div class="box m">Δ = ½ |x₁ y₁ 1; x₂ y₂ 1; x₃ y₃ 1| (take the absolute value)</div><p>Δ = 0 ⇔ the three points are collinear; this also gives the equation of a line through two points.</p>` },
        { h: 'Minors, cofactors, adjoint', html: `<p>Minor Mᵢⱼ: determinant left after deleting row i and column j. Cofactor Aᵢⱼ = (−1)<sup>i+j</sup>Mᵢⱼ. adj A = transpose of the cofactor matrix.</p>
          <p>A(adj A) = (adj A)A = |A|I; |adj A| = |A|ⁿ⁻¹. For 2 × 2: adj [a b; c d] = [d −b; −c a].</p>` },
        { h: 'Inverse and systems', html: `<p>A is <b>singular</b> if |A| = 0, non-singular otherwise. A⁻¹ = (1/|A|) adj A.</p>
          <p>AX = B: if |A| ≠ 0, unique solution X = A⁻¹B (consistent). If |A| = 0: find (adj A)B — if it is ≠ O the system is inconsistent; if = O, it may have infinitely many solutions or none.</p>` }
      ],
      formulas: [['2 × 2', 'ad − bc'], ['|kA| (order n)', 'kⁿ|A|'], ['Area', '½ |x₁ y₁ 1; x₂ y₂ 1; x₃ y₃ 1|'], ['Cofactor', 'Aᵢⱼ = (−1)^(i+j) Mᵢⱼ'], ['Inverse', 'A⁻¹ = adj A / |A|'], ['System', 'X = A⁻¹B']],
      terms: [['Singular', '|A| = 0'], ['Minor Mᵢⱼ', 'determinant after deleting row i, column j'], ['Adjoint', 'transpose of cofactor matrix'], ['Consistent system', 'has at least one solution']],
      traps: ['Sign pattern (+ − +) forgotten in cofactors.', 'Forgetting to transpose the cofactor matrix for adj A.', 'Area must be positive (take modulus).', '|2A| = 2|A| is wrong for order 3: it is 8|A|.'],
      board: '<p><b>Unit II (Algebra) — 10 marks</b> with Matrices. Expect: |kA|, |adj A| and properties (1 mark MCQs), area/collinearity (2 marks), and a 5-mark question: find A⁻¹ and solve a system of three equations.</p>',
      bridge: '<p>Uses matrices (Ch 3). Cross product (Ch 10) and scalar triple product are determinant-shaped.</p>'
    },

    explore: [
      {
        title: 'Expanding a 3 × 3 determinant', intro: 'Press <kbd>S</kbd> to step through the expansion along row 1: each entry × its cofactor.',
        build(el, K) {
          let R = G9.rng(G9.newSeed()), A; const rd = K.read(el); const box = document.createElement('div'); box.style.cssText = 'font-size:18px;margin:8px 0'; el.appendChild(box);
          const an = new K.Anim(4, () => draw(), { ms: 1200 });
          const fresh = () => { A = rnd(R, 3, -3, 5); an.reset(); };
          function draw() { const k = an.i; const j = k - 1;
            box.innerHTML = `<table style="display:inline-table;border-left:2px solid currentColor;border-right:2px solid currentColor;border-spacing:8px 3px">${A.map((r, i) => '<tr>' + r.map((v, c) => `<td style="padding:3px 8px;border:0;border-radius:4px;${j >= 0 && j < 3 && i === 0 && c === j ? 'background:var(--orangeL,#ffedd5);font-weight:bold' : j >= 0 && j < 3 && i > 0 && c !== j ? 'background:var(--blueL,#dbeafe)' : ''}">${num(v)}</td>`).join('') + '</tr>').join('')}</table>`;
            const parts = [0, 1, 2].slice(0, Math.min(k, 3)).map(c => `${c % 2 ? '−' : '+'} (${num(A[0][c])})·|${minor(A, 0, c).map(r => r.map(num).join(' ')).join('; ')}| = ${num((c % 2 ? -1 : 1) * A[0][c] * det2(minor(A, 0, c)))}`);
            rd.innerHTML = k === 0 ? 'Press S: expand along row 1 with signs + − +.' : parts.join('<br>') + (k >= 3 ? `<br>|A| = <b>${num(det(A))}</b>${det(A) === 0 ? ' (singular: no inverse)' : ''}` : ''); }
          const row = K.row(el); K.button(row, 'New matrix', () => { fresh(); draw(); });
          fresh(); K.anim(el, an); draw(); return an;
        }
      },
      {
        title: 'Two equations, two lines', intro: 'a₁x + b₁y = c₁ and a₂x + b₂y = c₂. When |A| ≠ 0 the lines cross once; when |A| = 0 they are parallel (no solution) or the same line (infinitely many).',
        build(el, K) {
          let v = { a1: 2, b1: 1, c1: 4, a2: 1, b2: -1, c2: -1 }; const row = K.row(el);
          Object.keys(v).forEach(k => K.slider(row, k, -6, 6, 1, v[k], x => { v[k] = x; bd.redraw(); }));
          const bd = new K.Board(el, { xmin: -8, xmax: 8, ymin: -6, ymax: 6 }); const rd = K.read(el);
          bd.onDraw = () => { bd.base(); const { a1, b1, c1, a2, b2, c2 } = v; if (a1 || b1) bd.infLine(a1, b1, c1, { color: C.blue, w: 3 }); if (a2 || b2) bd.infLine(a2, b2, c2, { color: C.orange, w: 3, dash: [8, 5] });
            const d = a1 * b2 - a2 * b1; let msg = `|A| = ${a1}·${b2} − ${b1}·${a2} = <b>${d}</b> · `;
            if (d !== 0) { const x = (c1 * b2 - c2 * b1) / d, y = (a1 * c2 - a2 * c1) / d; bd.dot(x, y, { color: C.purple, r: 6 }); msg += `unique solution x = ${Q(c1 * b2 - c2 * b1, d)}, y = ${Q(a1 * c2 - a2 * c1, d)} (X = A⁻¹B)`; }
            else { const ax = [b2 * c1 - b1 * c2, -a2 * c1 + a1 * c2]; msg += ax[0] === 0 && ax[1] === 0 ? '(adj A)B = O: same line, infinitely many solutions' : `(adj A)B = (${ax.join(', ')}) ≠ O: parallel lines, inconsistent`; }
            rd.innerHTML = msg; };
          bd.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Evaluate a determinant', gen(R, L) {
          const n = L === 1 ? 2 : 3; const A = rnd(R, n, -4, 6);
          return { q: `Evaluate ${D(A)}.`, a: num(det(A)), ans: det(A), s: n === 2 ? 'ad − bc' : 'expand along a row' };
        } },
      { title: 'Properties: |kA|, |adj A|, |AB|', levels: [1, 2], gen(R) {
          const n = R.int(2, 3), d = R.nz(-5, 6), k = R.int(2, 4), t = R.int(0, 2);
          if (t === 0) return { q: `A is a square matrix of order ${n} with |A| = ${d}. Find |${k}A|.`, a: num(k ** n * d), ans: k ** n * d, s: `kⁿ|A|` };
          if (t === 1) return { q: `A is of order ${n} with |A| = ${d}. Find |adj A|.`, a: num(d ** (n - 1)), ans: d ** (n - 1), s: `|A|ⁿ⁻¹` };
          const e = R.nz(-4, 4); return { q: `|A| = ${d}, |B| = ${e} (same order). Find |AB| and |Aᵀ|.`, a: `${num(d * e)}, ${num(d)}`, ans: d * e };
        } },
      { title: 'Area of a triangle / collinearity', gen(R) {
          const P = Array.from({ length: 3 }, () => [R.int(-6, 6), R.int(-6, 6)]); const a = Math.abs(det(P.map(p => [p[0], p[1], 1]))) / 2;
          if (R.chance(.3)) { const m = R.nz(-2, 2), c = R.int(-3, 3); const xs = R.shuffle([-3, -1, 0, 2, 4]).slice(0, 2); const k = xs[0] + R.int(1, 3);
            return { q: `Find y if (${xs[0]}, ${m * xs[0] + c}), (${xs[1]}, ${m * xs[1] + c}) and (${k}, y) are collinear.`, a: `y = ${m * k + c}`, ans: m * k + c, s: 'area determinant = 0' }; }
          return { q: `Find the area of the triangle with vertices (${P[0]}), (${P[1]}), (${P[2]}).`.replace(/\((-?\d+),(-?\d+)\)/g, '($1, $2)'), a: `${num(a)} sq units`, ans: a, s: '½ |x₁ y₁ 1; x₂ y₂ 1; x₃ y₃ 1|' };
        } },
      { title: 'Minors and cofactors', levels: [2], gen(R) {
          const A = rnd(R, 3, -4, 6), i = R.int(0, 2), j = R.int(0, 2);
          return { q: `For A = ${M(A)}, find the minor M<sub>${i + 1}${j + 1}</sub> and cofactor A<sub>${i + 1}${j + 1}</sub>.`, a: `M = ${num(det2(minor(A, i, j)))}, A = ${num(cof(A, i, j))}`, ans: cof(A, i, j) };
        } },
      { title: 'Adjoint and inverse', gen(R, L) {
          let A; do { A = rnd(R, L === 1 ? 2 : 3, -3, 4); } while (det(A) === 0); const d = det(A);
          return { q: `Find adj A and A⁻¹ for A = ${M(A)}.`, a: `|A| = ${num(d)}; adj A = ${M(adj(A))}; A⁻¹ = (1/${num(d)}) adj A`, s: 'cofactor matrix, then transpose' };
        } },
      { title: 'Solve a system (matrix method)', levels: [2, 3], gen(R, L) {
          const n = L === 3 ? 3 : 2; let A; do { A = rnd(R, n, -3, 4); } while (det(A) === 0); const X = Array.from({ length: n }, () => R.int(-4, 4)); const B = A.map(r => r.reduce((s, v, k) => s + v * X[k], 0)); const vs = ['x', 'y', 'z'];
          return { q: `Solve by the matrix method: ${A.map((r, i) => `${terms(r.map((v, k) => [v, vs[k]]))} = ${B[i]}`).join('; ')}.`, a: vs.slice(0, n).map((v, k) => `${v} = ${X[k]}`).join(', '), s: `|A| = ${det(A)} ≠ 0 ⇒ X = A⁻¹B` };
        } },
      { title: 'Consistent or inconsistent?', levels: [2, 3], gen(R) {
          const a = R.nz(1, 4), b = R.nz(-4, 4), c = R.int(-6, 6), k = R.pick([2, 3, -2]); const t = R.int(0, 2);
          const sys = t === 0 ? [[a, b, c], [k * a, k * b, k * c + R.nz(1, 5)]] : t === 1 ? [[a, b, c], [k * a, k * b, k * c]] : [[a, b, c], [b, a + 1 === b ? a + 2 : a + 1, c + 1]];
          const d = sys[0][0] * sys[1][1] - sys[0][1] * sys[1][0]; if (t === 2 && d === 0) return this.gen(R);
          const ans = d !== 0 ? 'consistent (unique solution)' : t === 0 ? 'inconsistent' : 'consistent (infinitely many solutions)';
          return { q: `Examine the consistency of ${terms([[sys[0][0], 'x'], [sys[0][1], 'y']])} = ${sys[0][2]}, ${terms([[sys[1][0], 'x'], [sys[1][1], 'y']])} = ${sys[1][2]}.`, a: ans, s: `|A| = ${d}` };
        } }
    ],

    quiz: [
      { q: '|2 3; 1 4| =', o: ['5', '11', '8', '−5'], a: 0, e: '8 − 3.' },
      { q: 'If A is 3 × 3 and |A| = 4, |2A| =', o: ['8', '32', '16', '64'], a: 1, e: '2³ × 4.' },
      { q: 'A is singular if', o: ['|A| = 0', '|A| = 1', 'A = I', 'Aᵀ = A'], a: 0, e: 'Definition.' },
      { q: 'A(adj A) =', o: ['I', '|A|I', 'A²', 'O'], a: 1, e: 'Standard result.' },
      { q: '|adj A| for order 3, |A| = 5', o: ['25', '5', '125', '15'], a: 0, e: '|A|².' },
      { q: 'Cofactor sign of a₂₁', o: ['+', '−', 'depends on value', '0'], a: 1, e: '(−1)³.' },
      { q: 'Points are collinear iff the area determinant is', o: ['1', '0', 'negative', '½'], a: 1, e: 'Zero area.' },
      { q: 'adj [[a, b], [c, d]] =', o: ['[[d, −b], [−c, a]]', '[[a, −c], [−b, d]]', '[[d, b], [c, a]]', '[[−d, b], [c, −a]]'], a: 0, e: 'Swap diagonal, negate the others.' },
      { q: 'If |A| ≠ 0, AX = B has', o: ['no solution', 'a unique solution', 'infinitely many', 'two solutions'], a: 1, e: 'X = A⁻¹B.' },
      { q: '|Aᵀ| =', o: ['|A|', '−|A|', '1/|A|', '|A|²'], a: 0, e: 'Property.' },
      { q: 'A determinant with two identical rows equals', o: ['1', '0', 'twice the row', 'undefined'], a: 1, e: 'Property.' }
    ],

    teach: {
      outcomes: ['Evaluate determinants of order 2 and 3', 'Use determinants for area and collinearity', 'Find minors, cofactors, adjoint and inverse', 'Solve systems by the matrix method and test consistency'],
      periods: [
        { t: 'Evaluation and area', flow: [['10 min', 'Area-scale meaning (Ch 3 explore panel 2).'], ['15 min', 'Explore panel 1: 3 × 3 expansion.'], ['15 min', 'Area and collinearity.']] },
        { t: 'Adjoint and inverse', flow: [['20 min', 'Minors, cofactors, adj A, A⁻¹.'], ['20 min', 'Practice with checks A A⁻¹ = I.']] },
        { t: 'Systems', flow: [['15 min', 'Explore panel 2: two lines.'], ['15 min', '3 × 3 system by X = A⁻¹B.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Cofactor signs.', 'adj without transpose.', '|kA| = k|A|.'],
      activities: ['Check A × adj A = |A|I numerically in groups.', 'Map plotting: area of a park from survey points.'],
      exit: ['|1 2 3; 0 1 4; 0 0 2|.', 'adj [[2, 3], [1, 4]].', 'Is 2x + 3y = 5, 4x + 6y = 7 consistent?'],
      homework: 'Use A⁻¹ to solve 2x − 3y + 5z = 11, 3x + 2y − 4z = −5, x + y − 2z = −3.'
    },

    slides: [
      { t: 'Determinants', b: ['Evaluating', 'Area of a triangle', 'Adjoint and inverse', 'Solving systems'] },
      { t: 'Evaluating', b: ['ad − bc', 'Expand along a row with + − +', '|kA| = kⁿ|A|'] },
      { t: 'Inverse', b: ['Aᵢⱼ = (−1)^(i+j)Mᵢⱼ', 'adj A = (cofactor matrix)ᵀ', 'A⁻¹ = adj A/|A|'] },
      { t: 'Systems', b: ['AX = B', '|A| ≠ 0 ⇒ X = A⁻¹B', '|A| = 0: test (adj A)B'] },
      { t: 'Check yourself', b: ['|3 1; 2 4|?', '|3A| for order 2, |A| = 2?', 'Answers: 10 · 18'] }
    ],

    fs: { groups: [
        ['Evaluation', [['2 × 2', 'ad − bc'], ['3 × 3', 'a₁₁A₁₁ + a₁₂A₁₂ + a₁₃A₁₃'], ['Signs', '+ − + / − + − / + − +']]],
        ['Properties', [['|Aᵀ|', '|A|'], ['|AB|', '|A||B|'], ['|kA|', 'kⁿ|A|'], ['Equal rows', '0'], ['Row swap', 'sign changes']]],
        ['Area', [['Triangle', '½ |x₁ y₁ 1; x₂ y₂ 1; x₃ y₃ 1|'], ['Collinear', 'Δ = 0']]],
        ['Adjoint and inverse', [['Cofactor', '(−1)^(i+j) Mᵢⱼ'], ['adj A', 'transpose of cofactor matrix'], ['A adj A', '|A| I'], ['|adj A|', '|A|ⁿ⁻¹'], ['A⁻¹', 'adj A / |A|, |A| ≠ 0']]],
        ['Systems AX = B', [['|A| ≠ 0', 'unique X = A⁻¹B'], ['|A| = 0, (adj A)B ≠ O', 'inconsistent'], ['|A| = 0, (adj A)B = O', 'infinitely many or none']]]],
      ex: [['A = [[2, 3], [1, 4]]', '|A| = 5, A⁻¹ = (1/5)[[4, −3], [−1, 2]]'], ['Area of (1, 0), (6, 0), (4, 3)', '½ × 15 = 7.5']],
      rem: ['Transpose the cofactors.', 'Take |·| for area.', 'Verify AA⁻¹ = I.'] }
  });
})();
