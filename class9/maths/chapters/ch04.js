/*
TOOL:    class9_maths_ch04
FAMILY:  CBSE_REVISION / Class 9 Maths (Ganita Manjari)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class 9 Maths full build
CHANGES: 1.0.0 - Ch 4 Exploring Algebraic Identities - revise, 4 explore panels (area models, difference of squares, product rectangle, mental maths), 9 generators, quiz, lesson plan, slides
*/
(function () {
  const { F, num, terms, C, par } = G9;
  const sq = (s) => `${s}<sup>2</sup>`;
  const mono = (c, v) => terms([[c, v]]);

  G9.register({
    no: 4, part: 'Part I', short: 'Algebraic identities', title: 'Exploring Algebraic Identities',
    blurb: 'Standard identities, expansion, factorisation, geometric models, mental arithmetic.',
    revise: {
      oneLine: 'An identity is an equality that is true for every value of its variables. The standard identities are shortcuts for expanding, factorising and quick calculation — and each one is a picture of areas or volumes.',
      sections: [
        { h: 'Equation vs identity', html: `<p>2x + 3 = 11 is an <b>equation</b> (true only for x = 4). (x + 1)² = x² + 2x + 1 is an <b>identity</b> (true for all x). Check an identity by expanding, or by its area picture.</p>` },
        { h: 'The square identities', html: `<div class="box m">(a + b)² = a² + 2ab + b²<br>(a − b)² = a² − 2ab + b²<br>(a + b)(a − b) = a² − b²<br>(x + a)(x + b) = x² + (a + b)x + ab</div>
          <p><b>Picture</b>: a square of side a + b splits into a², b² and two a×b rectangles. Hence the "2ab", which students often forget.</p>` },
        { h: 'Three terms and cubes', html: `<div class="box m">(a + b + c)² = a² + b² + c² + 2ab + 2bc + 2ca<br>(a + b)³ = a³ + b³ + 3ab(a + b)<br>(a − b)³ = a³ − b³ − 3ab(a − b)<br>a³ + b³ = (a + b)(a² − ab + b²)<br>a³ − b³ = (a − b)(a² + ab + b²)<br>a³ + b³ + c³ − 3abc = (a + b + c)(a² + b² + c² − ab − bc − ca)</div>
          <p>Special case: if a + b + c = 0, then <b>a³ + b³ + c³ = 3abc</b>.</p>` },
        { h: 'Factorisation', html: `<ul><li>Common factor first: 6x² − 9x = 3x(2x − 3).</li>
          <li>Difference of squares: 49p² − 25 = (7p − 5)(7p + 5).</li>
          <li>Perfect square: 4x² + 12x + 9 = (2x + 3)².</li>
          <li>Trinomial x² + px + q: find two numbers with sum p and product q. x² + 7x + 12 = (x + 3)(x + 4).</li>
          <li>ax² + bx + c: split the middle term using two numbers with product ac and sum b.</li></ul>` },
        { h: 'Mental arithmetic with identities', html: `<p>103² = (100 + 3)² = 10000 + 600 + 9 = 10609 &nbsp;·&nbsp; 98 × 102 = 100² − 2² = 9996 &nbsp;·&nbsp; 47² − 43² = (47 − 43)(47 + 43) = 360.</p>
          <p>If x + ${F(1, 'x')} = k then x² + ${F(1, 'x²')} = k² − 2 and x³ + ${F(1, 'x³')} = k³ − 3k.</p>` }
      ],
      formulas: [['(a + b)²', 'a² + 2ab + b²'], ['(a − b)²', 'a² − 2ab + b²'], ['(a + b)(a − b)', 'a² − b²'], ['(x + a)(x + b)', 'x² + (a + b)x + ab'], ['(a + b + c)²', 'a² + b² + c² + 2ab + 2bc + 2ca'], ['(a ± b)³', 'a³ ± b³ ± 3ab(a ± b)'], ['a³ ± b³', '(a ± b)(a² ∓ ab + b²)'], ['If a + b + c = 0', 'a³ + b³ + c³ = 3abc']],
      terms: [['Identity', 'true for all values of the variables'], ['Expansion', 'removing brackets by multiplying out'], ['Factorisation', 'writing an expression as a product'], ['Perfect square', 'an expression equal to (something)²']],
      traps: ['(a + b)² = a² + b² — the 2ab is missing! Check with a = b = 1: 4 ≠ 2.', '(3x)² = 3x² — no, it is 9x².', '(a − b)² has + b² at the end, not − b².', 'a² + b² cannot be factorised over real numbers the way a² − b² can.'],
      bridge: '<p>Ch 3 uses (a + b)(a − b) to rationalise denominators. Ch 6 uses area models. Ch 13 uses factorised forms to find where lines meet the axes.</p>'
    },

    explore: [
      {
        title: '(a + b)² as areas', intro: 'A square of side a + b is cut into four pieces. Step to reveal each piece.',
        build(el, K) {
          let a = 5, bb = 3; const row = K.row(el);
          const b = new K.Board(el, { xmin: -1, xmax: 15, ymin: -1, ymax: 10, axes: false, grid: 0, aspect: 0.55 });
          const rd = K.read(el); const an = new K.Anim(5, () => b.redraw(), { ms: 900 }); an.i = 4;
          K.slider(row, 'a', 1, 8, 1, a, v => { a = v; b.redraw(); });
          K.slider(row, 'b', 1, 6, 1, bb, v => { bb = v; b.redraw(); });
          b.onDraw = () => {
            b.clear(); const s = 9 / (a + bb), A = a * s, B = bb * s, x0 = 0, y0 = 0, i = an.i;
            b.rect(x0, y0, A + B, A + B, { color: C.ink, w: 2 });
            if (i >= 1) { b.rect(x0, y0 + B, A, A, { fill: C.blueL, color: C.blue }); b.text(x0 + A / 2, y0 + B + A / 2, 'a²', { font: 'bold 22px', color: C.blue }); }
            if (i >= 2) { b.rect(x0 + A, y0 + B, B, A, { fill: C.orangeL, color: C.orange }); b.text(x0 + A + B / 2, y0 + B + A / 2, 'ab', { font: 'bold 18px', color: C.orange }); }
            if (i >= 3) { b.rect(x0, y0, A, B, { fill: C.orangeL, color: C.orange }); b.text(x0 + A / 2, y0 + B / 2, 'ab', { font: 'bold 18px', color: C.orange }); }
            if (i >= 4) { b.rect(x0 + A, y0, B, B, { fill: C.purpleL, color: C.purple }); b.text(x0 + A + B / 2, y0 + B / 2, 'b²', { font: 'bold 18px', color: C.purple }); }
            b.text(x0 + A / 2, y0 + A + B + 0.5, 'a', { font: 'italic 18px' }); b.text(x0 + A + B / 2, y0 + A + B + 0.5, 'b', { font: 'italic 18px' });
            b.text(x0 - 0.5, y0 + B + A / 2, 'a', { font: 'italic 18px' }); b.text(x0 - 0.5, y0 + B / 2, 'b', { font: 'italic 18px' });
            const lines = ['Whole square: side a + b', '+ a² (top-left)', '+ ab (top-right)', '+ ab (bottom-left)', '+ b² (bottom-right)'];
            rd.innerHTML = `(a + b)² = a² + 2ab + b² &nbsp;→&nbsp; (${a} + ${bb})² = ${a * a} + 2·${a}·${bb} + ${bb * bb} = <b>${(a + bb) ** 2}</b> &nbsp;·&nbsp; step: ${lines[i]}`;
          };
          K.anim(el, an); b.redraw(); return an;
        }
      },
      {
        title: 'Difference of squares: cut and slide', intro: 'Remove b² from a², cut the leftover L-shape and slide one strip to form a rectangle (a + b) × (a − b).',
        build(el, K) {
          let a = 7, bb = 3; const row = K.row(el);
          const b = new K.Board(el, { xmin: -1, xmax: 22, ymin: -1, ymax: 9, axes: false, grid: 0, aspect: 0.42 });
          const rd = K.read(el); const an = new K.Anim(4, () => b.redraw(), { ms: 1100 });
          K.slider(row, 'a', 3, 9, 1, a, v => { a = v; if (bb >= a) bb = a - 1; b.redraw(); });
          K.slider(row, 'b', 1, 6, 1, bb, v => { bb = Math.min(v, a - 1); b.redraw(); });
          b.onDraw = () => {
            b.clear(); const s = 8 / a, A = a * s, B = bb * s, i = an.i;
            if (i === 0) { b.rect(0, 0, A, A, { fill: C.blueL, color: C.blue }); b.text(A / 2, A / 2, 'a²', { font: 'bold 22px', color: C.blue }); }
            if (i >= 1) {
              // strip 1: bottom (a × (a−b)) ; strip 2: top-left ((a−b) × b)
              b.rect(0, 0, A, A - B, { fill: C.blueL, color: C.blue });
              if (i < 3) { b.rect(0, A - B, A - B, B, { fill: C.orangeL, color: C.orange }); }
              if (i === 1) { b.rect(A - B, A - B, B, B, { color: C.grey, dash: [6, 4], w: 2 }); b.text(A - B / 2, A - B / 2, 'b² removed', { font: '12px', color: C.grey }); }
              if (i === 2) b.text(A / 2, A + 0.5, 'cut along the dashed line', { font: '14px', color: C.purple });
              if (i >= 3) { b.rect(A, 0, B, A - B, { fill: C.orangeL, color: C.orange }); b.text((A + B) / 2, -0.5, 'a + b', { font: 'italic bold 16px' }); b.text(A + B + 0.8, (A - B) / 2, 'a − b', { font: 'italic bold 16px' }); }
            }
            const msg = ['Start with a square of area a²', 'Remove a b × b square: area a² − b²', 'Cut the L-shape into two strips', 'Slide the top strip to the side: a rectangle (a + b)(a − b)'];
            rd.innerHTML = `${msg[i]}<br>a² − b² = (a + b)(a − b) &nbsp;→&nbsp; ${a * a} − ${bb * bb} = ${a + bb} × ${a - bb} = <b>${a * a - bb * bb}</b>`;
          };
          K.anim(el, an); b.redraw(); return an;
        }
      },
      {
        title: '(x + a)(x + b) — product rectangle', intro: 'Split a rectangle of sides x + a and x + b into x², ax, bx and ab. Negative a or b means removing area.',
        build(el, K) {
          let a = 3, c = 2; const row = K.row(el);
          const rd = K.read(el);
          const draw = () => {
            const sum = a + c, prod = a * c;
            rd.innerHTML = `<table class="t" style="width:auto;font-size:18px"><tr><th>×</th><th>x</th><th>${G9.sgn(a)}</th></tr><tr><th>x</th><td>x²</td><td>${mono(a, 'x')}</td></tr><tr><th>${G9.sgn(c)}</th><td>${mono(c, 'x')}</td><td>${num(prod)}</td></tr></table>
              (x ${G9.sgn(a)})(x ${G9.sgn(c)}) = x² + (${num(a)} ${G9.sgn(c)})x ${G9.sgn(prod)} = <b>${terms([[1, 'x²'], [sum, 'x'], [prod, '']])}</b><br>
              Reverse (factorise): two numbers with sum ${num(sum)} and product ${num(prod)} are ${num(a)} and ${num(c)}.`;
          };
          K.slider(row, 'a', -9, 9, 1, a, v => { a = v; draw(); });
          K.slider(row, 'b', -9, 9, 1, c, v => { c = v; draw(); });
          draw(); return null;
        }
      },
      {
        title: 'Mental maths machine', intro: 'Type a number near 100, 1000, 50… The machine picks an identity and shows the shortcut.',
        build(el, K) {
          const row = K.row(el); const rd = K.read(el);
          row.innerHTML = '<label>Square of <input type="number" id="mmA" value="103"></label><label>or product <input type="number" id="mmB" value="98"> × <input type="number" id="mmC" value="102"></label>';
          const go = () => {
            const n = +row.querySelector('#mmA').value, p = +row.querySelector('#mmB').value, q = +row.querySelector('#mmC').value;
            const base = [10, 20, 50, 100, 200, 500, 1000].reduce((m, v) => Math.abs(n - v) < Math.abs(n - m) ? v : m, 10), d = n - base;
            let s = `${n}² = (${base} ${G9.sgn(d)})² = ${base * base} ${G9.sgn(2 * base * d)} + ${d * d} = <b>${n * n}</b>`;
            if ((p + q) % 2 === 0) { const m = (p + q) / 2, e = Math.abs(q - m); s += `<br>${p} × ${q} = (${m} − ${e})(${m} + ${e}) = ${m}² − ${e}² = ${m * m} − ${e * e} = <b>${p * q}</b>`; }
            else s += `<br>${p} × ${q}: numbers must have an even sum to use (a + b)(a − b) directly. Try ${p} × ${q + 1}.`;
            rd.innerHTML = s;
          };
          row.querySelectorAll('input').forEach(i => i.addEventListener('input', go)); go(); return null;
        }
      }
    ],

    gens: [
      { title: 'Expand a square', gen(R, L) {
          const p = R.int(1, 6), q = R.nz(-7, 7), v = R.pick(['x', 'a', 'm', 'p']), w = L === 1 ? '' : R.pick(['y', 'b', 'n']);
          const A = mono(p, v), Bt = L === 1 ? num(Math.abs(q)) : mono(Math.abs(q), w);
          const res = L === 1 ? terms([[p * p, v + '²'], [2 * p * q, v], [q * q, '']]) : terms([[p * p, v + '²'], [2 * p * q, v + w], [q * q, w + '²']]);
          return { q: `Expand (${A} ${q < 0 ? '−' : '+'} ${Bt})².`, a: res, s: `(${A})² ${q < 0 ? '−' : '+'} 2(${A})(${Bt}) + (${Bt})²` };
        } },
      { title: 'Expand (x + a)(x + b)', levels: [1, 2], gen(R) {
          const a = R.nz(-9, 9), c = R.nz(-9, 9);
          return { q: `Expand (x ${G9.sgn(a)})(x ${G9.sgn(c)}).`, a: terms([[1, 'x²'], [a + c, 'x'], [a * c, '']]), s: `x² + (${num(a)} ${G9.sgn(c)})x + (${num(a)})(${num(c)})` };
        } },
      { title: 'Evaluate using an identity', gen(R, L) {
          const base = L === 1 ? 100 : R.pick([100, 1000, 50, 200]), d = R.nz(-6, 6);
          if (R.chance(.5)) { const n = base + d; return { q: `Use a suitable identity to find ${n}².`, a: String(n * n), ans: n * n, s: `(${base} ${G9.sgn(d)})² = ${base * base} ${G9.sgn(2 * base * d)} + ${d * d}` }; }
          const e = R.int(1, 9); return { q: `Use an identity to find ${base - e} × ${base + e}.`, a: String(base * base - e * e), ans: base * base - e * e, s: `(${base} − ${e})(${base} + ${e}) = ${base}² − ${e}²` };
        } },
      { title: 'Factorise: difference of squares', gen(R, L) {
          const p = R.int(1, 9), q = R.int(1, 9), v = R.pick(['x', 'a', 'p']), w = R.pick(['y', 'b', '']);
          if (L === 3) { const k = R.int(2, 5); return { q: `Factorise ${k * p * p}${v}² − ${k * q * q}${w || ''}${w ? '²' : ''}.`, a: `${k}(${mono(p, v)} − ${w ? mono(q, w) : q})(${mono(p, v)} + ${w ? mono(q, w) : q})`, s: `Take out ${k}, then use a² − b².` }; }
          return { q: `Factorise ${p * p === 1 ? '' : p * p}${v}² − ${q * q}${w}${w ? '²' : ''}.`, a: `(${mono(p, v)} − ${w ? mono(q, w) : q})(${mono(p, v)} + ${w ? mono(q, w) : q})`, s: `(${mono(p, v)})² − (${w ? mono(q, w) : q})²` };
        } },
      { title: 'Factorise a trinomial', gen(R, L) {
          if (L < 3) { const a = R.nz(-9, 9), c = R.nz(-9, 9); return { q: `Factorise x² ${G9.sgn(a + c)}x ${G9.sgn(a * c)}.`.replace('+ 0x ', '').replace('+ 1x', '+ x').replace('− 1x', '− x'), a: `(x ${G9.sgn(a)})(x ${G9.sgn(c)})`, s: `Two numbers with sum ${a + c} and product ${a * c}: ${a} and ${c}.` }; }
          const p = R.int(2, 4), c = R.nz(-6, 6); let a; do a = R.nz(-6, 6); while (G9.gcd(p, a) !== 1); // (px + a)(x + c)
          const B = p * c + a, Cc = a * c;
          return { q: `Factorise ${p}x² ${G9.sgn(B)}x ${G9.sgn(Cc)}.`.replace(' + 0x', '').replace('+ 1x', '+ x').replace('− 1x', '− x'), a: `(${p}x ${G9.sgn(a)})(x ${G9.sgn(c)})`, s: `Split the middle term: product ${p * Cc}, sum ${B} ⇒ ${p * c} and ${a}.` };
        } },
      { title: 'Use a + b and ab', levels: [2, 3], gen(R, L) {
          const a = R.int(-6, 9), b = R.int(-6, 9), s = a + b, p = a * b;
          if (L === 2) return { q: `If a + b = ${s} and ab = ${p}, find a² + b².`, a: String(a * a + b * b), ans: a * a + b * b, s: `a² + b² = (a + b)² − 2ab = ${s * s} − ${2 * p}` };
          return { q: `If a + b = ${s} and ab = ${p}, find a³ + b³.`, a: String(a ** 3 + b ** 3), ans: a ** 3 + b ** 3, s: `a³ + b³ = (a + b)³ − 3ab(a + b) = ${s ** 3} − ${G9.par(3 * p * s)}` };
        } },
      { title: 'x + 1/x = k', levels: [3], gen(R) {
          const k = R.int(2, 7); const two = R.chance(.5);
          return two ? { q: `If x + ${F(1, 'x')} = ${k}, find x² + ${F(1, 'x²')}.`, a: String(k * k - 2), ans: k * k - 2, s: `Square both sides: x² + 2 + ${F(1, 'x²')} = ${k * k}` }
            : { q: `If x + ${F(1, 'x')} = ${k}, find x³ + ${F(1, 'x³')}.`, a: String(k ** 3 - 3 * k), ans: k ** 3 - 3 * k, s: `Cube: x³ + ${F(1, 'x³')} + 3(x + ${F(1, 'x')}) = ${k ** 3}` };
        } },
      { title: 'a + b + c = 0 shortcut', levels: [2, 3], gen(R) {
          const a = R.nz(-15, 15), b = R.nz(-15, 15), c = -(a + b); if (c === 0) return this.gen(R);
          return { q: `Without cubing, find (${num(a)})³ + (${num(b)})³ + (${num(c)})³.`, a: String(3 * a * b * c), ans: 3 * a * b * c, s: `${num(a)} ${G9.sgn(b)} ${G9.sgn(c)} = 0, so the sum is 3abc = 3 × ${par(a)} × ${par(b)} × ${par(c)}` };
        } },
      { title: 'Expand a cube', levels: [2, 3], gen(R) {
          const p = R.int(1, 4), q = R.nz(-4, 4);
          return { q: `Expand (${mono(p, 'x')} ${G9.sgn(q)})³.`, a: terms([[p ** 3, 'x³'], [3 * p * p * q, 'x²'], [3 * p * q * q, 'x'], [q ** 3, '']]), s: `(a + b)³ = a³ + 3a²b + 3ab² + b³ with a = ${mono(p, 'x')}, b = ${num(q)}` };
        } }
    ],

    quiz: [
      { q: '(x + 5)² =', o: ['x² + 25', 'x² + 10x + 25', 'x² + 5x + 25', '2x + 10'], a: 1, e: 'a² + 2ab + b² with a = x, b = 5.' },
      { q: '99 × 101 =', o: ['9999', '10001', '9899', '10099'], a: 0, e: '100² − 1² = 9999.' },
      { q: 'Factorise 16y² − 9', o: ['(4y − 3)²', '(4y − 3)(4y + 3)', '(16y − 9)(y + 1)', '(8y − 3)(2y + 3)'], a: 1, e: 'Difference of squares.' },
      { q: 'x² − 5x + 6 =', o: ['(x − 2)(x − 3)', '(x + 2)(x + 3)', '(x − 1)(x − 6)', '(x − 6)(x + 1)'], a: 0, e: 'Sum −5, product 6: −2, −3.' },
      { q: 'If a + b = 7, ab = 10, then a² + b² =', o: ['49', '29', '39', '69'], a: 1, e: '49 − 20 = 29.' },
      { q: '(−5)³ + 2³ + 3³ =', o: ['−90', '90', '−30', '0'], a: 0, e: 'Sum is 0 ⇒ 3abc = 3(−5)(2)(3) = −90.' },
      { q: 'Which is an identity?', o: ['2x + 1 = 7', '(x − 1)² = x² − 2x + 1', 'x² = 4', 'x + 1 = x'], a: 1, e: 'True for every x.' },
      { q: '(2a − 3b)² =', o: ['4a² − 9b²', '4a² − 12ab + 9b²', '4a² + 12ab + 9b²', '2a² − 6ab + 3b²'], a: 1, e: '(2a)² − 2(2a)(3b) + (3b)².' },
      { q: 'x³ − 27 factorises as', o: ['(x − 3)³', '(x − 3)(x² + 3x + 9)', '(x + 3)(x² − 3x + 9)', '(x − 9)(x + 3)'], a: 1, e: 'a³ − b³ = (a − b)(a² + ab + b²).' },
      { q: 'If x + 1/x = 4, then x² + 1/x² =', o: ['16', '14', '18', '12'], a: 1, e: '4² − 2 = 14.' },
      { q: 'In the area picture of (a + b)², how many rectangles of area ab are there?', o: ['1', '2', '3', '4'], a: 1, e: 'Hence the term 2ab.' }
    ],

    teach: {
      outcomes: ['Distinguish identities from equations', 'Expand using standard identities and justify them with area models', 'Factorise using common factors, difference of squares and splitting the middle term', 'Use identities for mental calculation and for evaluating expressions'],
      periods: [
        { t: 'Identities as pictures', flow: [['10 min', 'Paper cut-outs: build (a + b)² from a², ab, ab, b².'], ['15 min', 'Explore panels 1 and 2 on the projector; derive (a − b)² and a² − b².'], ['15 min', 'Explore panel 3: (x + a)(x + b) tables; practise expansion.']] },
        { t: 'Factorisation', flow: [['10 min', 'Common factor; difference of squares.'], ['20 min', 'Trinomials: sum/product game; splitting the middle term for ax² + bx + c.'], ['10 min', 'Practice tab, Standard.']] },
        { t: 'Cubes and clever calculation', flow: [['15 min', '(a ± b)³, a³ ± b³; a + b + c = 0 shortcut.'], ['15 min', 'Explore panel 4: mental maths; class race.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['(a + b)² = a² + b².', '(3x)² written as 3x².', 'Sign of the last term in (a − b)².', 'Trying to factorise a² + b² as (a + b)(a − b).'],
      activities: ['Cut-and-paste area models from coloured paper.', 'Algebra tiles (or cardboard) to factorise trinomials.', 'Mental-maths relay: 97², 46 × 54, 205² using identities.'],
      exit: ['Expand (2x − 5)².', 'Factorise x² + 2x − 15.', 'Find 105² using an identity.'],
      homework: 'Prove with an area picture: (a + b)² − (a − b)² = 4ab.'
    },

    slides: [
      { t: 'Exploring Algebraic Identities', b: ['Identity: true for every value', 'Area pictures', 'Expansion and factorisation', 'Mental maths'] },
      { t: 'Square identities', b: ['(a + b)² = a² + 2ab + b²', '(a − b)² = a² − 2ab + b²', '(a + b)(a − b) = a² − b²', '(x + a)(x + b) = x² + (a + b)x + ab'] },
      { t: 'Why 2ab?', b: ['Square of side a + b', 'Pieces: a², b² and two rectangles a × b', 'Total = a² + 2ab + b²'] },
      { t: 'Cubes', b: ['(a + b)³ = a³ + b³ + 3ab(a + b)', 'a³ + b³ = (a + b)(a² − ab + b²)', 'a³ − b³ = (a − b)(a² + ab + b²)', 'a + b + c = 0 ⇒ a³ + b³ + c³ = 3abc'] },
      { t: 'Factorisation toolkit', b: ['1. Common factor', '2. Difference of squares', '3. Perfect square', '4. Trinomial: sum and product', '5. Split the middle term'] },
      { t: 'Mental maths', b: ['103² = 10000 + 600 + 9 = 10609', '98 × 102 = 100² − 2² = 9996', '47² − 43² = 4 × 90 = 360'] },
      { t: 'Check yourself', b: ['(x − 4)² = ?', 'Factorise 25 − 4y²', '(−3)³ + 1³ + 2³ = ?', 'Answers: x² − 8x + 16 · (5 − 2y)(5 + 2y) · −18'] }
    ]
  });
})();
