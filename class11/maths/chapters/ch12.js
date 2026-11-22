/*
TOOL:    class11_maths_ch12
FAMILY:  CBSE_REVISION / Class 11 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 12 Limits and Derivatives - revise, exam focus, 2 explore panels (secant to tangent, sin x / x), 7 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { Q, C, num, terms } = G9;
  const poly = (cs) => terms(cs.map((c, i) => [c, i === cs.length - 1 ? '' : i === cs.length - 2 ? 'x' : 'x' + '⁰¹²³⁴⁵⁶'[cs.length - 1 - i]])); // descending
  const deriv = (cs) => cs.slice(0, -1).map((c, i) => c * (cs.length - 1 - i));

  G9.register({
    no: 12, part: 'Unit IV · Calculus (8 marks)', short: 'Limits & derivatives', title: 'Limits and Derivatives',
    blurb: 'Intuitive limits, algebra of limits, standard limits, derivative from first principles, rules of differentiation.',
    revise: {
      oneLine: 'A limit is the value f(x) approaches as x approaches a. The derivative is the limit of the slope of a secant, f′(x) = lim (f(x + h) − f(x))/h — the slope of the tangent and the instantaneous rate of change.',
      sections: [
        { h: 'Limits', html: `<p>lim<sub>x→a</sub> f(x) = L if f(x) gets as close as we like to L for x close to a (x ≠ a). Left- and right-hand limits must agree.</p>
          <p>Algebra: limits of sums, differences, products, quotients (denominator limit ≠ 0) are sums, … of limits. For 0/0 forms, factorise and cancel or rationalise.</p>` },
        { h: 'Standard limits', html: `<div class="box m">lim<sub>x→a</sub> (xⁿ − aⁿ)/(x − a) = naⁿ⁻¹ &nbsp;·&nbsp; lim<sub>x→0</sub> (sin x)/x = 1 &nbsp;·&nbsp; lim<sub>x→0</sub> (1 − cos x)/x = 0</div>
          <p>Consequences: lim (sin ax)/(bx) = a/b; lim (tan x)/x = 1.</p>` },
        { h: 'Derivative', html: `<div class="box m">f′(x) = lim<sub>h→0</sub> ${G9.F('f(x + h) − f(x)', 'h')}</div>
          <p>First principles: d/dx(x²) = lim ((x + h)² − x²)/h = lim (2x + h) = 2x.</p>` },
        { h: 'Rules', html: `<ul><li>(u ± v)′ = u′ ± v′; (cu)′ = cu′.</li><li>Product: (uv)′ = u′v + uv′. Quotient: (u/v)′ = (u′v − uv′)/v².</li>
          <li>d/dx xⁿ = nxⁿ⁻¹; d/dx sin x = cos x; d/dx cos x = −sin x; d/dx tan x = sec²x; d/dx constant = 0.</li></ul>` }
      ],
      formulas: [['Power limit', 'lim (xⁿ − aⁿ)/(x − a) = naⁿ⁻¹'], ['Sine limit', 'lim (sin x)/x = 1'], ['First principles', "f′(x) = lim (f(x + h) − f(x))/h"], ['Power rule', 'd/dx xⁿ = nxⁿ⁻¹'], ['Product', "(uv)′ = u′v + uv′"], ['Quotient', "(u/v)′ = (u′v − uv′)/v²"]],
      terms: [['Limit', 'value approached'], ['Derivative', 'instantaneous rate of change; tangent slope'], ['0/0 form', 'indeterminate: simplify first'], ['Left/right limit', 'approach from below / above']],
      traps: ['Substituting directly into a 0/0 form.', 'Using degrees in lim sin x / x (x must be in radians).', '(uv)′ ≠ u′v′.', 'Sign in the quotient rule numerator: u′v − uv′.'],
      board: '<p><b>Unit IV (Calculus) — 8 marks.</b> Expect a limit by factorising/standard results (2–3 marks) and a derivative by first principles or by product/quotient rules (2–3 marks).</p>',
      bridge: '<p>Class 12 extends this to continuity, chain rule, applications of derivatives and integrals.</p>'
    },

    explore: [
      {
        title: 'From secant to tangent', intro: 'Press <kbd>P</kbd>: h shrinks and the secant through P and Q turns into the tangent at P. Its slope tends to f′(a).',
        build(el, K) {
          const fs = [['x²', x => x * x, x => 2 * x], ['x³/3', x => x ** 3 / 3, x => x * x], ['sin x', Math.sin, Math.cos], ['√x', x => x < 0 ? NaN : Math.sqrt(x), x => 0.5 / Math.sqrt(x)]];
          let k = 0, a = 1; const row = K.row(el); const rd = K.read(el);
          K.select(row, 'f(x)', fs.map(f => f[0]), i => { k = i; an.reset(); }); K.slider(row, 'a', 0.5, 2.5, 0.1, a, v => { a = v; bd.redraw(); });
          const bd = new K.Board(el, { xmin: -1, xmax: 5, ymin: -1.5, ymax: 6, equal: false });
          const an = new K.Anim(40, () => bd.redraw(), { ms: 120 });
          bd.onDraw = () => { bd.base(); const [, f, df] = fs[k]; const h = 2.5 * 0.88 ** an.i; bd.fn(f, { color: C.blue, w: 3 });
            const s = (f(a + h) - f(a)) / h; bd.fn(x => f(a) + s * (x - a), { color: C.orange, w: 2 }); bd.fn(x => f(a) + df(a) * (x - a), { color: C.purple, w: 1.5, dash: [6, 4] });
            bd.dot(a, f(a), { label: 'P', r: 5 }); bd.dot(a + h, f(a + h), { label: 'Q', r: 5, color: C.orange });
            rd.innerHTML = `h = ${num(h, 4)} · secant slope (f(a + h) − f(a))/h = <b>${num(s, 4)}</b> → f′(${num(a)}) = ${num(df(a), 4)} (dashed tangent)`; };
          K.anim(el, an); bd.redraw(); return an;
        }
      },
      {
        title: 'Why sin x / x → 1', intro: 'Shrink x (in radians). The table and graph show sin x / x approaching 1 from below.',
        build(el, K) {
          let x = 1; const row = K.row(el); K.slider(row, 'x (radians)', 0.01, 3, 0.01, x, v => { x = v; bd.redraw(); });
          const bd = new K.Board(el, { xmin: -6.5, xmax: 6.5, ymin: -0.5, ymax: 1.3, equal: false }); const rd = K.read(el);
          bd.onDraw = () => { bd.base(); bd.fn(t => Math.abs(t) < 1e-6 ? NaN : Math.sin(t) / t, { color: C.blue, w: 3 }); bd.line(-6.5, 1, 6.5, 1, { color: C.grey, dash: [4, 4], w: 1 });
            const cc = bd.ctx; cc.beginPath(); cc.arc(bd.X(0), bd.Y(1), 6, 0, 7); cc.fillStyle = '#fff'; cc.fill(); cc.strokeStyle = C.blue; cc.lineWidth = 2; cc.stroke();
            bd.dot(x, Math.sin(x) / x, { color: C.orange, r: 6 });
            rd.innerHTML = `x = ${num(x, 2)} rad · sin x = ${num(Math.sin(x), 5)} · sin x / x = <b>${num(Math.sin(x) / x, 5)}</b> · (in degrees, ${num(x * 180 / Math.PI, 2)}°, the ratio would not tend to 1)`; };
          bd.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Limit by substitution', levels: [1], gen(R) {
          const cs = [R.int(-3, 3), R.int(-5, 5), R.int(-9, 9)], a = R.int(-3, 3); const v = cs[0] * a * a + cs[1] * a + cs[2];
          return { q: `Evaluate lim<sub>x→${a}</sub> (${poly(cs)}).`, a: String(v), ans: v, s: 'polynomial: substitute' };
        } },
      { title: 'Limit of 0/0 by factorising', gen(R) {
          const a = R.nz(-5, 5); let b; do { b = R.int(-6, 6); } while (b === a);
          let c; do { c = R.nz(-4, 4); } while (c === a);
          return { q: `Evaluate lim<sub>x→${a}</sub> (${poly([1, -(a + b), a * b])}) / (${poly([1, -(a + c), a * c])}).`, a: Q(a - b, a - c), ans: (a - b) / (a - c), s: `(x − ${a})(x − ${b}) / ((x − ${a})(x − ${c}))` };
        } },
      { title: 'Standard limit (xⁿ − aⁿ)/(x − a)', gen(R) {
          const n = R.int(2, 10), a = R.int(1, 3);
          return { q: `Evaluate lim<sub>x→${a}</sub> (x${'⁰¹²³⁴⁵⁶⁷⁸⁹'[n] || '¹⁰'} − ${a ** n}) / (x − ${a}).`, a: String(n * a ** (n - 1)), ans: n * a ** (n - 1), s: `n aⁿ⁻¹ = ${n} × ${a}^${n - 1}` };
        } },
      { title: 'Trigonometric limits', levels: [2, 3], gen(R) {
          const a = R.int(2, 9), b = R.int(2, 9); const t = R.int(0, 2);
          const items = [[`sin ${a}x / ${b}x`, Q(a, b)], [`sin ${a}x / sin ${b}x`, Q(a, b)], [`tan ${a}x / x`, String(a)]];
          const [q, ans] = items[t]; return { q: `Evaluate lim<sub>x→0</sub> ${q}.`, a: ans, s: 'use lim sin θ/θ = 1' };
        } },
      { title: 'Derivative of a polynomial', gen(R, L) {
          const deg = L === 1 ? 2 : R.int(3, 4); const cs = Array.from({ length: deg + 1 }, (_, i) => i === 0 ? R.nz(-5, 5) : R.int(-7, 7)); const a = R.int(-2, 2);
          const d = deriv(cs); const val = d.reduce((s, c) => s * a + c, 0);
          return { q: `Find f′(x) for f(x) = ${poly(cs)}, and f′(${a}).`, a: `f′(x) = ${poly(d)}; f′(${a}) = ${val}`, ans: val, s: 'power rule term by term' };
        } },
      { title: 'Product and quotient rules', levels: [2, 3], gen(R) {
          const items = [['x² sin x', '2x sin x + x² cos x'], ['x cos x', 'cos x − x sin x'], ['(x + 1)(x² − 2)', '3x² + 2x − 2'], ['x / (x + 1)', '1 / (x + 1)²'], ['sin x / x', '(x cos x − sin x) / x²'], ['(2x + 3)/(x − 1)', '−5 / (x − 1)²'], ['x³ tan x', '3x² tan x + x³ sec²x'], ['1 / (x² + 1)', '−2x / (x² + 1)²']];
          const [q, a] = R.pick(items); return { q: `Differentiate ${q} with respect to x.`, a, s: "(uv)′ = u′v + uv′; (u/v)′ = (u′v − uv′)/v²" };
        } },
      { title: 'First principles', levels: [2, 3], gen(R) {
          const items = [['x²', '2x', '((x + h)² − x²)/h = 2x + h'], ['x³', '3x²', '((x + h)³ − x³)/h = 3x² + 3xh + h²'], ['1/x', '−1/x²', '(1/(x + h) − 1/x)/h = −1/(x(x + h))'], ['sin x', 'cos x', '2 cos(x + h/2) sin(h/2)/h'], ['√x', '1/(2√x)', 'rationalise: 1/(√(x + h) + √x)'], [`${R.int(2, 9)}x + ${R.int(1, 9)}`, null, '']];
          let [f, a, s] = R.pick(items); if (!a) { const m = parseInt(f); a = String(m); s = `(${m}(x + h) − ${m}x)/h = ${m}`; }
          return { q: `Find the derivative of ${f} from first principles.`, a, s };
        } }
    ],

    quiz: [
      { q: 'lim<sub>x→2</sub> (x² − 4)/(x − 2)', o: ['4', '2', '0', 'not defined'], a: 0, e: 'x + 2 at 2.' },
      { q: 'lim<sub>x→0</sub> sin 3x / x', o: ['3', '1', '1/3', '0'], a: 0, e: '3 · sin 3x/3x.' },
      { q: 'lim<sub>x→1</sub> (x⁵ − 1)/(x − 1)', o: ['5', '1', '4', '0'], a: 0, e: 'n aⁿ⁻¹.' },
      { q: 'd/dx (x⁴)', o: ['4x³', 'x³', '4x⁴', '3x⁴'], a: 0, e: 'Power rule.' },
      { q: 'd/dx (sin x)', o: ['cos x', '−cos x', '−sin x', 'sec²x'], a: 0, e: 'Standard.' },
      { q: 'd/dx (cos x)', o: ['sin x', '−sin x', 'cos x', '−cos x'], a: 1, e: 'Standard.' },
      { q: '(uv)′ =', o: ["u′v′", "u′v + uv′", "u′v − uv′", "uv′"], a: 1, e: 'Product rule.' },
      { q: 'd/dx (x sin x)', o: ['sin x + x cos x', 'cos x', 'x cos x', 'sin x − x cos x'], a: 0, e: 'Product rule.' },
      { q: 'Derivative of a constant', o: ['the constant', '0', '1', 'x'], a: 1, e: 'No change.' },
      { q: 'lim<sub>x→0</sub> (1 − cos x)/x', o: ['0', '1', '1/2', '∞'], a: 0, e: 'Standard.' },
      { q: 'If f(x) = x² + 3x, f′(1) =', o: ['5', '4', '2', '3'], a: 0, e: '2x + 3.' }
    ],

    teach: {
      outcomes: ['Evaluate limits intuitively and algebraically', 'Use the standard limits', 'Find derivatives from first principles', 'Differentiate using sum, product and quotient rules'],
      periods: [
        { t: 'Limits', flow: [['10 min', 'Speedometer: instantaneous speed as a limit.'], ['15 min', 'Tables of values; left and right limits.'], ['15 min', '0/0 forms; standard limits.']] },
        { t: 'Trig limit and derivative', flow: [['10 min', 'Explore panel 2: sin x / x.'], ['15 min', 'Explore panel 1: secant to tangent.'], ['15 min', 'First principles.']] },
        { t: 'Rules', flow: [['20 min', 'Power, product, quotient; sin, cos, tan.'], ['10 min', 'Practice.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Direct substitution in 0/0.', 'Degrees in trig limits.', 'Product rule as u′v′.'],
      activities: ['Ball-drop timing: average vs instantaneous speed.', 'Zoom into a curve on a graphing tool until it looks straight.'],
      exit: ['lim x→3 (x² − 9)/(x − 3).', 'd/dx (5x³ − 2x).', 'd/dx (x² cos x).'],
      homework: 'Find the derivative of (x + sec x)(x − tan x) and of (a + b sin x)/(c + d cos x).'
    },

    slides: [
      { t: 'Limits and Derivatives', b: ['Limits', 'Standard limits', 'Derivative', 'Rules'] },
      { t: 'Limits', b: ['f(x) → L as x → a', 'Left and right limits agree', '0/0: factorise or rationalise'] },
      { t: 'Standard limits', b: ['(xⁿ − aⁿ)/(x − a) → naⁿ⁻¹', 'sin x / x → 1', '(1 − cos x)/x → 0'] },
      { t: 'Derivative', b: ["f′(x) = lim (f(x + h) − f(x))/h", 'Slope of tangent', 'Rate of change'] },
      { t: 'Rules', b: ['xⁿ → nxⁿ⁻¹', "(uv)′ = u′v + uv′", "(u/v)′ = (u′v − uv′)/v²", 'sin → cos, cos → −sin'] },
      { t: 'Check yourself', b: ['lim x→0 sin 5x / x?', 'd/dx (x³ + 2x)?', 'Answers: 5 · 3x² + 2'] }
    ],

    fs: { groups: [
        ['Limits', [['Algebra', 'limit of sum/product/quotient = sum/product/quotient of limits'], ['0/0', 'factorise, cancel or rationalise'], ['(xⁿ − aⁿ)/(x − a)', '→ naⁿ⁻¹'], ['sin x / x', '→ 1 (x in radians)'], ['tan x / x', '→ 1'], ['(1 − cos x)/x', '→ 0']]],
        ['Derivative', [['Definition', "f′(x) = lim (f(x + h) − f(x))/h"], ['Meaning', 'slope of tangent, rate of change']]],
        ['Rules', [['Sum', "(u ± v)′ = u′ ± v′"], ['Product', "(uv)′ = u′v + uv′"], ['Quotient', "(u/v)′ = (u′v − uv′)/v²"]]],
        ['Standard derivatives', [['xⁿ', 'nxⁿ⁻¹'], ['sin x', 'cos x'], ['cos x', '−sin x'], ['tan x', 'sec²x'], ['constant', '0']]]],
      ex: [['lim x→3 (x² − 9)/(x − 3)', 'x + 3 → 6'], ['d/dx (x² sin x)', '2x sin x + x² cos x']],
      rem: ['Simplify before substituting in 0/0.', 'Radians for trig limits.', 'Quotient rule: u′v − uv′ on top.'] }
  });
})();
