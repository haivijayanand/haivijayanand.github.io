/*
TOOL:    class10_maths_ch02
FAMILY:  CBSE_REVISION / Class 10 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 2 Polynomials - revise, board focus, 2 explore panels (quadratic zeroes, counting zeroes from graphs), 7 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { F, Q, num, C, terms, gcd } = G9;
  const quad = (a, b, c) => terms([[a, 'x²'], [b, 'x'], [c, '']]);

  G9.register({
    no: 2, part: 'Unit II · Algebra (20 marks)', short: 'Polynomials', title: 'Polynomials',
    blurb: 'Zeroes of a polynomial, their meaning on the graph, and the relation between zeroes and coefficients.',
    revise: {
      oneLine: 'The zeroes of p(x) are the x-coordinates where the graph of y = p(x) meets the x-axis. For a quadratic ax² + bx + c the zeroes α, β satisfy α + β = −b/a and αβ = c/a.',
      sections: [
        { h: 'Degree and zeroes', html: `<p>Linear (degree 1): ax + b. Quadratic (degree 2): ax² + bx + c. Cubic (degree 3).</p>
          <p>A <b>zero</b> of p(x) is a number k with p(k) = 0. A polynomial of degree n has <b>at most n</b> zeroes.</p>` },
        { h: 'Geometrical meaning', html: `<p>Zeroes = x-coordinates of the points where y = p(x) cuts or touches the x-axis.</p>
          <ul><li>Line y = ax + b: exactly one zero, −b/a.</li><li>Parabola y = ax² + bx + c: 2, 1 or 0 zeroes (opens up if a &gt; 0, down if a &lt; 0).</li><li>Cubic: 1, 2 or 3 zeroes.</li></ul>
          <p>To count zeroes from a graph, count the meeting points with the x-axis.</p>` },
        { h: 'Zeroes and coefficients (quadratic)', html: `<div class="box m">α + β = −${F('b', 'a')} = −${F('coefficient of x', 'coefficient of x²')} &nbsp;&nbsp; αβ = ${F('c', 'a')} = ${F('constant term', 'coefficient of x²')}</div>
          <p>Example: 6x² − 7x − 3 = (2x − 3)(3x + 1) → zeroes 3/2 and −1/3. Sum = 7/6 = −(−7)/6 ✔, product = −1/2 = −3/6 ✔.</p>` },
        { h: 'Building a quadratic from its zeroes', html: `<p>If the sum of zeroes is S and the product is P, a quadratic is <span class="m">k[x² − Sx + P]</span> (any k ≠ 0).</p>
          <p>Useful: α² + β² = (α + β)² − 2αβ; ${F(1, 'α')} + ${F(1, 'β')} = ${F('α + β', 'αβ')}; (α − β)² = (α + β)² − 4αβ.</p>` }
      ],
      formulas: [['Sum of zeroes', 'α + β = −b/a'], ['Product of zeroes', 'αβ = c/a'], ['Quadratic from S, P', 'k(x² − Sx + P)'], ['α² + β²', '(α + β)² − 2αβ'], ['Max zeroes', 'degree n ⇒ at most n zeroes']],
      terms: [['Zero', 'value of x making p(x) = 0'], ['Degree', 'highest power of x'], ['Parabola', 'graph of a quadratic'], ['Coefficient', 'number multiplying a power of x']],
      traps: ['Sum of zeroes is −b/a, not b/a.', 'Counting points where the graph meets the y-axis instead of the x-axis.', 'Forgetting that a quadratic can have no real zeroes (graph above or below the axis).', 'Writing the quadratic as x² + Sx + P (sign of S).'],
      board: '<p><b>Unit II (Algebra) — 20 marks</b> across Ch 2–5. From this chapter: 1-mark MCQs on number of zeroes from a graph and on sum/product; 2–3 marks on finding zeroes and verifying the relation, or forming a quadratic from given sum and product.</p>',
      bridge: '<p>Ch 4 solves quadratic equations — the zeroes of ax² + bx + c are its roots.</p>'
    },

    explore: [
      {
        title: 'Zeroes of y = ax² + bx + c', intro: 'Move the sliders. Zeroes are where the parabola meets the x-axis; check α + β = −b/a and αβ = c/a.',
        build(el, K) {
          let a = 1, b_ = -1, c = -6; const row = K.row(el);
          const b = new K.Board(el, { xmin: -8, xmax: 8, ymin: -10, ymax: 10, equal: false, labelStep: 2 }); const rd = K.read(el);
          K.slider(row, 'a', -3, 3, 0.5, a, v => { a = v; b.redraw(); }); K.slider(row, 'b', -8, 8, 1, b_, v => { b_ = v; b.redraw(); }); K.slider(row, 'c', -10, 10, 1, c, v => { c = v; b.redraw(); });
          b.onDraw = () => {
            b.base(); if (a === 0) { rd.innerHTML = 'a = 0: not quadratic.'; b.fn(x => b_ * x + c, { color: C.blue }); return; }
            b.fn(x => a * x * x + b_ * x + c, { color: C.blue }); const D = b_ * b_ - 4 * a * c;
            let msg = `y = ${quad(a, b_, c)} &nbsp;·&nbsp; D = b² − 4ac = ${num(D)}<br>`;
            if (D < 0) msg += '<b>No real zeroes</b> — the parabola does not meet the x-axis.';
            else { const r1 = (-b_ - Math.sqrt(D)) / (2 * a), r2 = (-b_ + Math.sqrt(D)) / (2 * a); [r1, r2].forEach(r => b.dot(r, 0, { color: C.orange, label: num(r) }));
              msg += `${D === 0 ? 'One (repeated) zero' : 'Two zeroes'}: α = ${num(r1, 3)}, β = ${num(r2, 3)}<br>α + β = ${num(r1 + r2, 3)} and −b/a = ${num(-b_ / a, 3)} · αβ = ${num(r1 * r2, 3)} and c/a = ${num(c / a, 3)}`; }
            rd.innerHTML = msg;
          };
          b.redraw(); return null;
        }
      },
      {
        title: 'How many zeroes? (read the graph)', intro: 'Press <kbd>S</kbd> for a new random graph. Count the points where it meets the x-axis before revealing.',
        build(el, K) {
          const b = new K.Board(el, { xmin: -6, xmax: 6, ymin: -8, ymax: 8, equal: false, labelStep: 2 }); const rd = K.read(el);
          let R = G9.rng(G9.newSeed()), f, n, reveal = false, kind;
          const make = () => { reveal = false; const t = R.int(0, 4);
            if (t === 0) { const r = R.int(-4, 4); f = x => 1.2 * (x - r); n = 1; kind = 'linear'; }
            else if (t === 1) { const p = R.int(-4, 0), q = R.int(1, 4); const s = R.sign(); f = x => s * 0.6 * (x - p) * (x - q); n = 2; kind = 'quadratic'; }
            else if (t === 2) { const h = R.int(-3, 3), k = R.int(1, 4) * R.sign(); f = x => Math.sign(k) * 0.5 * (x - h) ** 2 + k; n = 0; kind = 'quadratic'; }
            else if (t === 3) { const h = R.int(-3, 3); f = x => 0.6 * (x - h) ** 2; n = 1; kind = 'quadratic (touches)'; }
            else { const [p, q, r] = [R.int(-5, -2), R.int(-1, 1), R.int(2, 5)]; f = x => 0.12 * (x - p) * (x - q) * (x - r); n = 3; kind = 'cubic'; }
            b.redraw(); };
          b.onDraw = () => { b.base(); b.fn(f, { color: C.blue }); rd.innerHTML = reveal ? `<b>${n}</b> zero${n === 1 ? '' : 's'} (${kind}).` : 'How many zeroes? Click "Reveal".'; };
          const row = K.row(el); K.button(row, 'Reveal', () => { reveal = true; b.redraw(); }, 'btn o'); K.button(row, 'New graph (S)', make);
          make(); return { step: make, play() {}, pause() {} };
        }
      }
    ],

    gens: [
      { title: 'Find zeroes and verify', gen(R, L) {
          let a, p, q, r, s; // (p x + q)(r x + s)
          if (L === 1) { a = 1; p = 1; r = 1; q = R.nz(-8, 8); s = R.nz(-8, 8); } else { p = R.int(1, 4); r = R.int(1, 4); q = R.nz(-6, 6); s = R.nz(-6, 6); if (gcd(p, Math.abs(q)) > 1 || gcd(r, Math.abs(s)) > 1) return this.gen(R, L); }
          const A = p * r, B = p * s + q * r, Cc = q * s;
          return { q: `Find the zeroes of ${quad(A, B, Cc)} and verify the relationship between the zeroes and the coefficients.`, a: `${Q(-q, p)} and ${Q(-s, r)}; sum ${Q(-B, A)} = −b/a, product ${Q(Cc, A)} = c/a`, s: `= (${terms([[p, 'x'], [q, '']])})(${terms([[r, 'x'], [s, '']])})` };
        } },
      { title: 'Quadratic from sum and product', gen(R, L) {
          if (L === 1) { const S = R.int(-9, 9), P = R.int(-12, 12); return { q: `Find a quadratic polynomial whose sum and product of zeroes are ${S} and ${P}.`, a: `${quad(1, -S, P)} (or any multiple)`, s: 'x² − (sum)x + product' }; }
          const s1 = R.nz(-5, 5), s2 = R.int(2, 4), p1 = R.nz(-5, 5), p2 = R.int(2, 4); // S = s1/s2, P = p1/p2
          const L_ = s2 * p2 / gcd(s2, p2);
          return { q: `Find a quadratic polynomial whose sum and product of zeroes are ${Q(s1, s2)} and ${Q(p1, p2)}.`, a: `${quad(L_, -s1 * L_ / s2, p1 * L_ / p2)}`, s: `k[x² − (${Q(s1, s2)})x + (${Q(p1, p2)})] with k = ${L_}` };
        } },
      { title: 'Expressions in α and β', levels: [2, 3], gen(R) {
          const a = R.int(1, 3), al = R.nz(-5, 5), be = R.nz(-5, 5); const B = -a * (al + be), Cc = a * al * be; const S = al + be, P = al * be;
          const k = R.int(0, 2);
          const opts = [[`α² + β²`, S * S - 2 * P, `(α + β)² − 2αβ = ${S * S} − ${G9.par(2 * P)}`], [`${F(1, 'α')} + ${F(1, 'β')}`, null, `(α + β)/αβ = ${Q(S, P)}`], [`(α − β)²`, S * S - 4 * P, `(α + β)² − 4αβ`]][k];
          return { q: `If α and β are the zeroes of ${quad(a, B, Cc)}, find ${opts[0]}.`, a: opts[1] == null ? Q(S, P) : String(opts[1]), ans: opts[1] == null ? S / P : opts[1], s: `α + β = ${S}, αβ = ${P}; ${opts[2]}` };
        } },
      { title: 'Find k from a given zero', levels: [2, 3], gen(R) {
          const z = R.nz(-4, 4), a = R.int(1, 3), b = R.int(-6, 6); const k = -(a * z * z + b * z);
          return { q: `If ${z} is a zero of ${terms([[a, 'x²'], [b, 'x']])} + k, find k.`, a: `k = ${k}`, ans: k, s: `p(${z}) = ${a * z * z} ${G9.sgn(b * z)} + k = 0` };
        } },
      { title: 'Number of zeroes from a description', levels: [1], gen(R) {
          const items = [['A parabola opening upwards with its vertex at (2, 3).', '0'], ['A straight line crossing the x-axis at (−4, 0).', '1'], ['A parabola that touches the x-axis only at (1, 0).', '1'], ['A cubic curve crossing the x-axis at x = −2, 0 and 3.', '3'], ['A parabola opening downwards with vertex (0, 5).', '2'], ['A parabola opening downwards with vertex (−1, −2).', '0']];
          const [q, a] = R.pick(items); return { q: `How many zeroes does the polynomial have? ${q}`, a, ans: +a, s: 'Count the meeting points with the x-axis.' };
        } },
      { title: 'Zeroes with a given relation', levels: [3], gen(R) {
          const r = R.int(2, 5);
          return { q: `The zeroes of x² + kx + ${2 * r * r} are in the ratio 1 : 2 and k < 0. Find the zeroes and k.`, a: `zeroes ${r} and ${2 * r}; k = −${3 * r}`, ans: -3 * r, s: `Let zeroes be m, 2m: 2m² = ${2 * r * r} ⇒ m = ${r}; sum 3m = −k` };
        } },
      { title: 'Zeroes of a linear polynomial / graph', levels: [1, 2], gen(R) {
          const a = R.nz(-6, 6), b = R.int(-12, 12);
          return { q: `At which point does the graph of y = ${terms([[a, 'x'], [b, '']])} meet the x-axis? What is the zero of the polynomial?`, a: `(${Q(-b, a)}, 0); zero = ${Q(-b, a)}`, ans: -b / a, s: `${terms([[a, 'x'], [b, '']])} = 0` };
        } }
    ],

    quiz: [
      { q: 'The zeroes of x² − 3x − 10 are', o: ['5, −2', '−5, 2', '5, 2', '−5, −2'], a: 0, e: '(x − 5)(x + 2).' },
      { q: 'Sum of zeroes of 3x² − 5x + 2 is', o: ['5/3', '−5/3', '2/3', '3/5'], a: 0, e: '−b/a = 5/3.' },
      { q: 'A quadratic whose zeroes have sum 4 and product 3 is', o: ['x² + 4x + 3', 'x² − 4x + 3', 'x² − 3x + 4', 'x² + 3x − 4'], a: 1, e: 'x² − Sx + P.' },
      { q: 'A parabola y = p(x) lies entirely above the x-axis. Number of zeroes:', o: ['0', '1', '2', '3'], a: 0, e: 'It never meets the axis.' },
      { q: 'Maximum number of zeroes of a cubic polynomial', o: ['1', '2', '3', '4'], a: 2, e: 'At most the degree.' },
      { q: 'Product of zeroes of x² − 9 is', o: ['9', '−9', '0', '3'], a: 1, e: 'c/a = −9 (zeroes ±3).' },
      { q: 'If α, β are zeroes of x² − 5x + 6, then α² + β² =', o: ['13', '25', '19', '11'], a: 0, e: '25 − 12.' },
      { q: 'If 2 is a zero of x² + kx − 6, then k =', o: ['1', '−1', '2', '5'], a: 0, e: '4 + 2k − 6 = 0.' },
      { q: 'Zero of 3x − 6 is', o: ['3', '2', '−2', '6'], a: 1, e: '3x = 6.' },
      { q: 'If the sum of zeroes of kx² + 2x + 3k equals their product, then k =', o: ['−2/3', '2/3', '1/3', '−3/2'], a: 0, e: '−2/k = 3 ⇒ k = −2/3.' },
      { q: 'The graph of a polynomial meets the x-axis at 3 points. Its degree is', o: ['exactly 3', 'at least 3', 'at most 3', '2'], a: 1, e: 'n zeroes need degree ≥ n.' }
    ],

    teach: {
      outcomes: ['Find zeroes of linear and quadratic polynomials', 'Read the number of zeroes from a graph', 'Verify and use α + β = −b/a, αβ = c/a', 'Form a quadratic from given sum and product of zeroes'],
      periods: [
        { t: 'Zeroes and graphs', flow: [['10 min', 'Plot y = x² − x − 6 from a table on the board.'], ['15 min', 'Explore panel 2: count zeroes from graphs (class quiz).'], ['15 min', 'Linear, quadratic, cubic shapes.']] },
        { t: 'Zeroes and coefficients', flow: [['15 min', 'Explore panel 1; discover α + β and αβ.'], ['15 min', 'Factorise and verify (Practice).'], ['10 min', 'Exit ticket.']] },
        { t: 'Forming quadratics', flow: [['15 min', 'k(x² − Sx + P); fractional S and P.'], ['15 min', 'α² + β², 1/α + 1/β, find k.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Sign of α + β.', 'Zeroes read from the y-axis.', 'Every quadratic has two real zeroes.'],
      activities: ['Graph-paper parabolas with different c; watch zeroes appear/disappear.', 'Card match: polynomial ↔ graph ↔ zeroes.'],
      exit: ['Zeroes of x² + 7x + 10.', 'Quadratic with sum −3, product 2.', 'Number of zeroes of a parabola touching the x-axis.'],
      homework: 'If α, β are zeroes of 2x² − 5x + 3, find a quadratic whose zeroes are 2α and 2β.'
    },

    slides: [
      { t: 'Polynomials', b: ['Degree and zeroes', 'Zeroes on the graph', 'Zeroes and coefficients'] },
      { t: 'Zeroes on the graph', b: ['Zero = x where the graph meets the x-axis', 'Line: 1 · Parabola: 0, 1 or 2 · Cubic: 1, 2 or 3'] },
      { t: 'Zeroes and coefficients', b: ['ax² + bx + c with zeroes α, β', 'α + β = −b/a', 'αβ = c/a'] },
      { t: 'Forming a quadratic', b: ['k(x² − Sx + P)', 'S = sum, P = product of zeroes'] },
      { t: 'Useful results', b: ['α² + β² = (α + β)² − 2αβ', '1/α + 1/β = (α + β)/αβ'] },
      { t: 'Check yourself', b: ['Zeroes of x² − 2x − 8?', 'Quadratic with sum 5, product 6?', 'Answers: 4, −2 · x² − 5x + 6'] }
    ],

    fs: { groups: [
        ['Polynomials', [['Linear / quadratic / cubic', 'degree 1 / 2 / 3'], ['Zero k', 'p(k) = 0'], ['Degree n', 'at most n zeroes']]],
        ['Graphs', [['Zeroes', 'x-coordinates where graph meets x-axis'], ['y = ax + b', 'one zero −b/a'], ['y = ax² + bx + c', '0, 1 or 2 zeroes; up if a > 0'], ['Cubic', '1, 2 or 3 zeroes']]],
        ['Quadratic ax² + bx + c', [['α + β', '−b/a'], ['αβ', 'c/a'], ['From S and P', 'k[x² − Sx + P]'], ['α² + β²', '(α + β)² − 2αβ'], ['1/α + 1/β', '(α + β)/αβ'], ['(α − β)²', '(α + β)² − 4αβ']]]],
      ex: [['Zeroes of 6x² − 7x − 3', '(2x − 3)(3x + 1) ⇒ 3/2, −1/3; sum 7/6, product −1/2'], ['Sum 1/4, product −1', '4x² − x − 4']],
      rem: ['Sum = −b/a (mind the minus).', 'Count crossings with the x-axis, not the y-axis.', 'Verify the relation after finding the zeroes.'] }
  });
})();
