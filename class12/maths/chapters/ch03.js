/*
TOOL:    class12_maths_ch03
FAMILY:  CBSE_REVISION / Class 12 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 3 Matrices - revise, board focus, 2 explore panels (row-by-column multiplication, 2x2 matrix as a transformation), 7 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num } = G9;
  const M = (A) => `<table style="display:inline-table;vertical-align:middle;border-left:2px solid currentColor;border-right:2px solid currentColor;border-radius:6px;border-collapse:separate;border-spacing:8px 2px;margin:2px 3px">${A.map(r => '<tr>' + r.map(v => `<td style="text-align:center;border:0;padding:0 2px">${typeof v === 'number' ? num(v) : v}</td>`).join('') + '</tr>').join('')}</table>`;
  const mul = (A, B) => A.map(r => B[0].map((_, j) => r.reduce((s, v, k) => s + v * B[k][j], 0)));
  const add = (A, B, s = 1) => A.map((r, i) => r.map((v, j) => v + s * B[i][j]));
  const sc = (k, A) => A.map(r => r.map(v => k * v));
  const T = (A) => A[0].map((_, j) => A.map(r => r[j]));
  const rnd = (R, m, n, lo = -5, hi = 5) => Array.from({ length: m }, () => Array.from({ length: n }, () => R.int(lo, hi)));

  G9.register({
    no: 3, part: 'Unit II · Algebra (10 marks)', short: 'Matrices', title: 'Matrices',
    blurb: 'Types and order of matrices, equality, addition, scalar and matrix multiplication, transpose, symmetric and skew-symmetric matrices, invertible matrices.',
    revise: {
      oneLine: 'A matrix is a rectangular array of numbers. Matrices of the same order add entry by entry; AB is defined when the columns of A equal the rows of B, and its (i, j) entry is row i of A times column j of B.',
      sections: [
        { h: 'Order and types', html: `<p>An m × n matrix has m rows and n columns; aᵢⱼ is the entry in row i, column j. Types: row, column, square, diagonal, scalar, identity I, zero O.</p>
          <p>Equal matrices: same order and equal corresponding entries (used to solve for unknowns).</p>` },
        { h: 'Operations', html: `<ul><li>A ± B: same order, entry by entry. kA: multiply every entry.</li><li><b>AB</b>: A is m × n, B is n × p ⇒ AB is m × p, (AB)ᵢⱼ = Σₖ aᵢₖbₖⱼ.</li>
          <li>AB ≠ BA in general; AB = O does not imply A = O or B = O. A(BC) = (AB)C, A(B + C) = AB + AC, AI = IA = A.</li></ul>` },
        { h: 'Transpose and symmetry', html: `<p>Aᵀ (or A′): rows become columns. (Aᵀ)ᵀ = A, (A + B)ᵀ = Aᵀ + Bᵀ, (kA)ᵀ = kAᵀ, <b>(AB)ᵀ = BᵀAᵀ</b>.</p>
          <p>Symmetric: Aᵀ = A. Skew-symmetric: Aᵀ = −A (diagonal entries are 0). Every square matrix A = ½(A + Aᵀ) + ½(A − Aᵀ), a symmetric plus a skew-symmetric part.</p>` },
        { h: 'Invertible matrices', html: `<p>A square matrix A is invertible if there is B with AB = BA = I; then B = A⁻¹ (unique). (AB)⁻¹ = B⁻¹A⁻¹. Finding A⁻¹ is done in Ch 4 using adj A / |A|.</p>` }
      ],
      formulas: [['Order of AB', '(m × n)(n × p) = m × p'], ['(AB)ᵢⱼ', 'Σ aᵢₖ bₖⱼ'], ['(AB)ᵀ', 'BᵀAᵀ'], ['Symmetric', 'Aᵀ = A'], ['Skew-symmetric', 'Aᵀ = −A'], ['Split', 'A = ½(A + Aᵀ) + ½(A − Aᵀ)']],
      terms: [['Order', 'rows × columns'], ['Identity matrix', 'square, 1 on diagonal, 0 elsewhere'], ['Transpose', 'interchange rows and columns'], ['Skew-symmetric', 'aᵢⱼ = −aⱼᵢ']],
      traps: ['Multiplying entry by entry instead of row × column.', 'Assuming AB = BA.', '(AB)ᵀ = AᵀBᵀ (wrong order).', 'Adding matrices of different orders.'],
      board: '<p><b>Unit II (Algebra) — 10 marks</b> with Determinants. Expect: order/type MCQs, constructing aᵢⱼ from a rule, products and A² − kA + I = O checks (2–3 marks), symmetric + skew-symmetric decomposition (3 marks).</p>',
      bridge: '<p>Ch 4 (Determinants) gives inverses and solves systems of equations AX = B.</p>'
    },

    explore: [
      {
        title: 'Row-by-column multiplication', intro: 'Press <kbd>S</kbd> to compute AB one entry at a time; the row of A and the column of B in use are highlighted.',
        build(el, K) {
          let R = G9.rng(G9.newSeed()), A, B; const rd = K.read(el);
          const box = document.createElement('div'); box.style.cssText = 'font-size:18px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin:8px 0'; el.appendChild(box);
          const an = new K.Anim(4, () => draw(), { ms: 900 });
          const fresh = () => { A = rnd(R, 2, 3, -3, 4); B = rnd(R, 3, 2, -3, 4); an.reset(); };
          const hl = (A, fn) => `<table style="display:inline-table;border-left:2px solid currentColor;border-right:2px solid currentColor;border-radius:6px;border-spacing:6px 2px">${A.map((r, i) => '<tr>' + r.map((v, j) => `<td style="padding:2px 6px;border:0;border-radius:4px;${fn(i, j)}">${v === null ? '?' : num(v)}</td>`).join('') + '</tr>').join('')}</table>`;
          function draw() { const n = Math.min(an.i, 4); const P = mul(A, B); const cur = n > 0 ? n - 1 : -1; const ci = Math.floor(cur / 2), cj = cur % 2;
            const shown = P.map((r, i) => r.map((v, j) => i * 2 + j < n ? v : null));
            box.innerHTML = 'A = ' + hl(A, (i) => i === ci && cur >= 0 ? 'background:var(--blueL,#dbeafe);font-weight:bold' : '') + ' B = ' + hl(B, (i, j) => j === cj && cur >= 0 ? 'background:var(--orangeL,#ffedd5);font-weight:bold' : '') + ' AB = ' + hl(shown, (i, j) => i === ci && j === cj ? 'background:var(--purpleL,#ede9fe);font-weight:bold' : '');
            rd.innerHTML = cur < 0 ? 'A is 2 × 3, B is 3 × 2 ⇒ AB is 2 × 2. Press S.' : `(AB)<sub>${ci + 1}${cj + 1}</sub> = ${A[ci].map((v, k) => `(${num(v)})(${num(B[k][cj])})`).join(' + ')} = <b>${num(P[ci][cj])}</b>${n >= 4 ? ' · done. Note BA is 3 × 3, so AB ≠ BA.' : ''}`; }
          const row = K.row(el); K.button(row, 'New matrices', () => { fresh(); draw(); });
          fresh(); K.anim(el, an); draw(); return an;
        }
      },
      {
        title: 'A 2 × 2 matrix moves the plane', intro: 'Set the entries. The unit square (blue) is mapped to the parallelogram (orange) with sides given by the columns of A.',
        build(el, K) {
          let a = 2, b = 1, c = 0, d = 1; const row = K.row(el); [['a', v => a = v, a], ['b', v => b = v, b], ['c', v => c = v, c], ['d', v => d = v, d]].forEach(s => K.slider(row, s[0], -3, 3, 0.5, s[2], v => { s[1](v); bd.redraw(); }));
          const bd = new K.Board(el, { xmin: -6, xmax: 6, ymin: -4.5, ymax: 4.5 }); const rd = K.read(el);
          bd.onDraw = () => { bd.base(); bd.poly([[0, 0], [1, 0], [1, 1], [0, 1]], { fill: C.blueL, color: C.blue, w: 2 }); const P = [[0, 0], [a, c], [a + b, c + d], [b, d]];
            bd.poly(P, { fill: 'rgba(234,88,12,.25)', color: C.orange, w: 3 }); bd.dot(a, c, { label: '(a, c)', color: C.orange }); bd.dot(b, d, { label: '(b, d)', color: C.purple });
            rd.innerHTML = `A = ${M([[a, b], [c, d]])} · A(1, 0)ᵀ = (${num(a)}, ${num(c)}), A(0, 1)ᵀ = (${num(b)}, ${num(d)}) · area scale = |ad − bc| = <b>${num(Math.abs(a * d - b * c))}</b>${a * d - b * c === 0 ? ' (square collapses: A is not invertible)' : ''}`; };
          bd.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Construct from aᵢⱼ', levels: [1, 2], gen(R) {
          const rules = [['(i + j)²/2', (i, j) => (i + j) ** 2 / 2], ['i/j', (i, j) => i / j], ['|2i − 3j|', (i, j) => Math.abs(2 * i - 3 * j)], ['2i − j', (i, j) => 2 * i - j], ['i·j', (i, j) => i * j]];
          const [r, f] = R.pick(rules), m = R.int(2, 3), n = R.int(2, 3);
          const A = Array.from({ length: m }, (_, i) => Array.from({ length: n }, (_, j) => { const v = f(i + 1, j + 1); return Number.isInteger(v) ? v : G9.Q(Math.round(v * 6), 6); }));
          return { q: `Construct a ${m} × ${n} matrix with aᵢⱼ = ${r}.`, a: M(A) };
        } },
      { title: 'Add, subtract, scalar', gen(R) {
          const A = rnd(R, 2, 2), B = rnd(R, 2, 2), p = R.nz(-3, 3), q = R.nz(-3, 3);
          return { q: `A = ${M(A)}, B = ${M(B)}. Find ${p}A ${q < 0 ? '−' : '+'} ${Math.abs(q)}B.`, a: M(add(sc(p, A), sc(q, B))) };
        } },
      { title: 'Multiply', gen(R, L) {
          const m = L === 1 ? 2 : R.int(2, 3), n = R.int(2, 3), p = L === 1 ? 2 : R.int(1, 3); const A = rnd(R, m, n, -3, 4), B = rnd(R, n, p, -3, 4);
          return { q: `Find AB for A = ${M(A)} and B = ${M(B)}.`, a: M(mul(A, B)), s: `(${m} × ${n})(${n} × ${p}) ⇒ ${m} × ${p}` };
        } },
      { title: 'Equality of matrices', levels: [1, 2], gen(R) {
          const x = R.int(-5, 5), y = R.int(-5, 5), z = R.int(-5, 5);
          return { q: `Find x, y, z if ${M([['x + y', 'z'], ['x − y', 4]])} = ${M([[x + y, z], [x - y, 4]])}.`, a: `x = ${x}, y = ${y}, z = ${z}` };
        } },
      { title: 'Transpose and (AB)ᵀ', levels: [2, 3], gen(R) {
          const A = rnd(R, 2, 3, -3, 4), B = rnd(R, 3, 2, -3, 4);
          return { q: `For A = ${M(A)}, B = ${M(B)}, find (AB)ᵀ and verify it equals BᵀAᵀ.`, a: M(T(mul(A, B))), s: '(AB)ᵀ = BᵀAᵀ' };
        } },
      { title: 'Symmetric + skew-symmetric', levels: [2, 3], gen(R) {
          const A = rnd(R, 2, 2, -5, 6); const S = A.map((r, i) => r.map((v, j) => G9.Q(v + A[j][i], 2))), K2 = A.map((r, i) => r.map((v, j) => G9.Q(v - A[j][i], 2)));
          return { q: `Express A = ${M(A)} as the sum of a symmetric and a skew-symmetric matrix.`, a: `P = ½(A + Aᵀ) = ${M(S)}, Q = ½(A − Aᵀ) = ${M(K2)}` };
        } },
      { title: 'Matrix polynomial', levels: [3], gen(R) {
          const a = R.int(-3, 4), b = R.nz(-3, 3), c = R.nz(-3, 3), d = R.int(-3, 4); const A = [[a, b], [c, d]]; const tr = a + d, det = a * d - b * c;
          return { q: `For A = ${M(A)}, find k and m such that A² − kA + mI = O.`, a: `k = ${tr}, m = ${det}`, s: `A² = ${M(mul(A, A))}; compare with kA − mI` };
        } }
    ],

    quiz: [
      { q: 'Order of AB if A is 2 × 3 and B is 3 × 4', o: ['2 × 4', '3 × 3', '4 × 2', 'not defined'], a: 0, e: 'm × p.' },
      { q: 'If A is 3 × 2, then Aᵀ is', o: ['3 × 2', '2 × 3', '3 × 3', '2 × 2'], a: 1, e: 'Rows ↔ columns.' },
      { q: '(AB)ᵀ =', o: ['AᵀBᵀ', 'BᵀAᵀ', 'BA', 'AB'], a: 1, e: 'Order reverses.' },
      { q: 'Diagonal entries of a skew-symmetric matrix are', o: ['1', '0', 'equal', 'any'], a: 1, e: 'aᵢᵢ = −aᵢᵢ.' },
      { q: 'Number of possible orders of a matrix with 6 entries', o: ['4', '2', '6', '3'], a: 0, e: '1×6, 6×1, 2×3, 3×2.' },
      { q: 'For square A, A + Aᵀ is', o: ['symmetric', 'skew-symmetric', 'zero', 'identity'], a: 0, e: 'Its transpose is itself.' },
      { q: 'AB = BA holds', o: ['always', 'not always', 'never', 'only for 2 × 2'], a: 1, e: 'Matrix product is not commutative in general.' },
      { q: 'If A = [[1, 0], [0, 1]], A² =', o: ['I', '2I', 'O', '−I'], a: 0, e: 'Identity.' },
      { q: 'Matrix with aᵢⱼ = 0 for i ≠ j is', o: ['diagonal', 'zero', 'row', 'skew'], a: 0, e: 'Definition.' },
      { q: 'If A is m × n and B is p × q, AB is defined when', o: ['n = p', 'm = q', 'm = p', 'n = q'], a: 0, e: 'Columns of A = rows of B.' },
      { q: '(A − Aᵀ) is', o: ['symmetric', 'skew-symmetric', 'diagonal', 'scalar'], a: 1, e: 'Transpose gives the negative.' }
    ],

    teach: {
      outcomes: ['Identify order and type of matrices', 'Add, scale and multiply matrices', 'Use transpose rules', 'Write a square matrix as symmetric + skew-symmetric'],
      periods: [
        { t: 'Matrices and operations', flow: [['10 min', 'Shop stock table as a matrix.'], ['15 min', 'Types, equality, addition, scalar.'], ['15 min', 'Practice.']] },
        { t: 'Multiplication', flow: [['15 min', 'Explore panel 1: row by column.'], ['10 min', 'Explore panel 2: matrices as transformations.'], ['15 min', 'Non-commutativity; A² − kA + I.']] },
        { t: 'Transpose', flow: [['15 min', 'Rules incl. (AB)ᵀ.'], ['15 min', 'Symmetric/skew decomposition.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Entry-wise multiplication.', 'AB = BA.', '(AB)ᵀ order.'],
      activities: ['Price × quantity matrix product for a canteen bill.', 'Students hold row and column cards to "multiply".'],
      exit: ['Order of AB for 3 × 1 and 1 × 3.', 'Transpose of [[1, 2], [3, 4]].', 'Is [[0, 2], [−2, 0]] skew-symmetric?'],
      homework: 'If A = [[3, −2], [4, −2]], find k so that A² = kA − 2I.'
    },

    slides: [
      { t: 'Matrices', b: ['Order and types', 'Operations', 'Transpose', 'Symmetric and skew-symmetric'] },
      { t: 'Multiplication', b: ['(m × n)(n × p) = m × p', 'Row of A · column of B', 'AB ≠ BA in general'] },
      { t: 'Transpose', b: ['(Aᵀ)ᵀ = A', '(A + B)ᵀ = Aᵀ + Bᵀ', '(AB)ᵀ = BᵀAᵀ'] },
      { t: 'Symmetric and skew', b: ['Aᵀ = A / Aᵀ = −A', 'A = ½(A + Aᵀ) + ½(A − Aᵀ)'] },
      { t: 'Check yourself', b: ['Order of AB, A 3×2, B 2×5?', 'Diagonal of a skew matrix?', 'Answers: 3 × 5 · zeros'] }
    ],

    fs: { groups: [
        ['Basics', [['Order', 'm × n (rows × columns)'], ['Equal', 'same order, equal entries'], ['Identity I', '1 on diagonal'], ['Scalar matrix', 'kI']]],
        ['Operations', [['A ± B', 'entry-wise, same order'], ['kA', 'every entry × k'], ['AB', '(m × n)(n × p) → m × p'], ['(AB)ᵢⱼ', 'Σₖ aᵢₖ bₖⱼ'], ['Laws', 'A(BC) = (AB)C, A(B + C) = AB + AC; AB ≠ BA']]],
        ['Transpose', [['(Aᵀ)ᵀ', 'A'], ['(A + B)ᵀ', 'Aᵀ + Bᵀ'], ['(kA)ᵀ', 'kAᵀ'], ['(AB)ᵀ', 'BᵀAᵀ']]],
        ['Symmetry and inverse', [['Symmetric', 'Aᵀ = A'], ['Skew-symmetric', 'Aᵀ = −A, aᵢᵢ = 0'], ['Decomposition', '½(A + Aᵀ) + ½(A − Aᵀ)'], ['Inverse', 'AB = BA = I; (AB)⁻¹ = B⁻¹A⁻¹']]]],
      ex: [['[[1, 2], [3, 4]] [[0, 1], [1, 0]]', '[[2, 1], [4, 3]]'], ['A = [[3, 5], [1, −1]]', 'P = [[3, 3], [3, −1]], Q = [[0, 2], [−2, 0]]']],
      rem: ['Check orders before multiplying.', 'Transpose of a product reverses order.', 'Skew-symmetric diagonals are 0.'] }
  });
})();
