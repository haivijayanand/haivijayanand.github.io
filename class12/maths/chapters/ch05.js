/*
TOOL:    class12_maths_ch05
FAMILY:  CBSE_REVISION / Class 12 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 5 Continuity and Differentiability - revise, board focus, 2 explore panels (piecewise continuity with k, corner vs smooth), 8 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num, Q } = G9;

  G9.register({
    no: 5, part: 'Unit III · Calculus (35 marks)', short: 'Continuity & differentiability', title: 'Continuity and Differentiability',
    blurb: 'Continuity, differentiability, chain rule, implicit and inverse-trig derivatives, exponential and log functions, logarithmic and parametric differentiation, second derivatives.',
    revise: {
      oneLine: 'f is continuous at a when lim f(x) = f(a); differentiable when the left and right derivatives agree. Differentiable ⇒ continuous, not conversely. The chain rule, with implicit, logarithmic and parametric methods, differentiates every elementary function.',
      sections: [
        { h: 'Continuity', html: `<p>f is continuous at x = a if LHL = RHL = f(a). Polynomials, sin, cos, eˣ, log x (x &gt; 0), |x| are continuous on their domains; sums, products, quotients (denominator ≠ 0) and compositions of continuous functions are continuous.</p>
          <p>For piecewise f, equate the one-sided limits at the joining point to find a constant k.</p>` },
        { h: 'Differentiability', html: `<p>f′(a) exists if Lf′(a) = Rf′(a), where Rf′(a) = lim<sub>h→0⁺</sub> (f(a + h) − f(a))/h. |x| is continuous but not differentiable at 0 (corner); [x] is not continuous at integers.</p>` },
        { h: 'Rules and standard derivatives', html: `<p><b>Chain rule</b>: dy/dx = (dy/du)(du/dx). sin⁻¹x → 1/√(1 − x²), cos⁻¹x → −1/√(1 − x²), tan⁻¹x → 1/(1 + x²), eˣ → eˣ, log x → 1/x, aˣ → aˣ log a.</p>
          <ul><li><b>Implicit</b>: differentiate both sides, collect dy/dx.</li><li><b>Logarithmic</b>: for y = u(x)^v(x) or long products, take log first: (1/y)y′ = (v log u)′.</li>
          <li><b>Parametric</b>: dy/dx = (dy/dt)/(dx/dt).</li><li><b>Second derivative</b>: d²y/dx² = d/dx(dy/dx).</li></ul>` }
      ],
      formulas: [['Continuity at a', 'lim f(x) = f(a)'], ['Chain rule', 'dy/dx = dy/du · du/dx'], ['d(sin⁻¹x)', '1/√(1 − x²)'], ['d(tan⁻¹x)', '1/(1 + x²)'], ['d(aˣ)', 'aˣ log a'], ['Parametric', 'dy/dx = (dy/dt)/(dx/dt)']],
      terms: [['LHL, RHL', 'left- and right-hand limits'], ['Corner', 'continuous but not differentiable point'], ['Implicit function', 'y given by an equation in x and y'], ['Logarithmic differentiation', 'take log before differentiating']],
      traps: ['Continuous does not mean differentiable.', 'Missing the inner derivative in the chain rule.', 'd/dx(xˣ) is not x·xˣ⁻¹.', 'Parametric second derivative: d²y/dx² = d/dt(dy/dx) ÷ dx/dt.'],
      board: '<p><b>Unit III (Calculus) — 35 marks</b>, the largest unit (Ch 5–9). From this chapter expect: find k for continuity (2–3 marks), derivatives by chain rule / implicit / log / parametric methods (2–3 marks), and showing a relation involving y″ (3 marks).</p>',
      bridge: '<p>Extends Class 11 limits and derivatives. Ch 6 applies derivatives; Ch 7 reverses them.</p>'
    },

    explore: [
      {
        title: 'Find k for continuity', intro: 'f(x) = kx + 1 for x ≤ 2 and x² − 1 for x > 2. Slide k until the two pieces meet; only k = 1 makes f continuous at 2.',
        build(el, K) {
          let k = 0; const row = K.row(el); K.slider(row, 'k', -2, 3, 0.25, k, v => { k = v; b.redraw(); });
          const b = new K.Board(el, { xmin: -2, xmax: 5, ymin: -3, ymax: 10, equal: false }); const rd = K.read(el);
          b.onDraw = () => { b.base(); b.fn(x => x <= 2 ? k * x + 1 : NaN, { color: C.blue, w: 3 }); b.fn(x => x > 2 ? x * x - 1 : NaN, { color: C.orange, w: 3 }); b.dot(2, 2 * k + 1, { color: C.blue, r: 6 });
            const c = b.ctx; c.beginPath(); c.arc(b.X(2), b.Y(3), 6, 0, 7); c.fillStyle = '#fff'; c.fill(); c.strokeStyle = C.orange; c.lineWidth = 2; c.stroke();
            const ok = Math.abs(2 * k + 1 - 3) < 1e-9; rd.innerHTML = `LHL = f(2) = 2k + 1 = ${num(2 * k + 1)} · RHL = 2² − 1 = 3 · ${ok ? '<b>continuous at x = 2</b> (k = 1)' : 'jump: not continuous'}${ok ? ` · Lf′(2) = k = 1, Rf′(2) = 2x = 4 ⇒ still not differentiable (corner)` : ''}`; };
          b.redraw(); return null;
        }
      },
      {
        title: 'Smooth or corner? Zoom in', intro: 'Press <kbd>P</kbd> to zoom into x = 0. A differentiable graph straightens into a line; |x| keeps its corner.',
        build(el, K) {
          const fs = [['sin x', Math.sin], ['|x|', Math.abs], ['x²', x => x * x], ['x|x|', x => x * Math.abs(x)], ['|sin x|', x => Math.abs(Math.sin(x))]];
          let k = 1; const row = K.row(el); K.select(row, 'f(x)', fs.map(f => f[0]), i => { k = i; an.reset(); });
          const b = new K.Board(el, { xmin: -3, xmax: 3, ymin: -2.25, ymax: 2.25 }); const rd = K.read(el);
          const an = new K.Anim(30, () => draw(), { ms: 150 });
          b.onDraw = () => draw(true);
          function draw(inner) { const s = 3 * 0.82 ** an.i; Object.assign(b.o, { xmin: -s, xmax: s, ymin: -s * 0.75, ymax: s * 0.75, grid: 10 ** Math.floor(Math.log10(s)) / 2 }); b._fit(); b.base(); b.fn(fs[k][1], { color: C.blue, w: 3 }); b.dot(0, 0, { color: C.orange, r: 5 });
            const f = fs[k][1], h = 1e-6; const L = (f(0) - f(-h)) / h, Rr = (f(h) - f(0)) / h;
            rd.innerHTML = `window ±${num(s, 4)} · Lf′(0) = ${num(L, 3)}, Rf′(0) = ${num(Rr, 3)} ⇒ <b>${Math.abs(L - Rr) < 1e-3 ? 'differentiable at 0' : 'not differentiable at 0 (corner)'}</b>`; }
          K.anim(el, an); draw(); return an;
        }
      }
    ],

    gens: [
      { title: 'Find k for continuity', gen(R) {
          const a = R.int(1, 4), m = R.int(1, 3), c = R.int(-3, 3);
          const v = m * a * a + c; // right piece m x² + c ; left piece k x
          return { q: `Find k so that f(x) = kx for x ≤ ${a} and ${m === 1 ? '' : m}x² ${c < 0 ? '−' : '+'} ${Math.abs(c)} for x > ${a} is continuous at x = ${a}.`, a: `k = ${Q(v, a)}`, ans: v / a, s: `k·${a} = ${m}·${a}² ${c < 0 ? '−' : '+'} ${Math.abs(c)}` };
        } },
      { title: 'Chain rule', gen(R) {
          const a = R.int(2, 7), items = [[`sin(${a}x²)`, `${2 * a}x cos(${a}x²)`], [`cos³x`, '−3cos²x sin x'], [`e^(${a}x + 1)`, `${a}e^(${a}x + 1)`], [`log(sin x)`, 'cot x'], [`√(${a}x² + 1)`, `${a}x/√(${a}x² + 1)`], [`tan(${a}x − 1)`, `${a} sec²(${a}x − 1)`], [`sin²(${a}x)`, `${a} sin(${2 * a}x)`], [`log(log x)`, '1/(x log x)']];
          const [f, d] = R.pick(items); return { q: `Differentiate ${f} with respect to x.`, a: d, s: 'outer derivative × inner derivative' };
        } },
      { title: 'Inverse trigonometric', levels: [2, 3], gen(R) {
          const a = R.int(2, 5), items = [[`sin⁻¹(${a}x)`, `${a}/√(1 − ${a * a}x²)`], [`tan⁻¹(x²)`, '2x/(1 + x⁴)'], [`cos⁻¹(√x)`, '−1/(2√x √(1 − x))'], ['sin⁻¹(2x/(1 + x²)), |x| < 1', '2/(1 + x²) (it equals 2 tan⁻¹x)'], ['tan⁻¹((1 + x)/(1 − x))', '1/(1 + x²)'], ['cos⁻¹((1 − x²)/(1 + x²)), x > 0', '2/(1 + x²)']];
          const [f, d] = R.pick(items); return { q: `Find dy/dx for y = ${f}.`, a: d };
        } },
      { title: 'Implicit differentiation', gen(R) {
          const a = R.int(2, 6), items = [[`x² + y² = ${a * a}`, '−x/y'], [`x² + xy + y² = ${a * 10}`, '−(2x + y)/(x + 2y)'], [`xy = ${a}`, '−y/x'], ['sin y = x sin(a + y)', 'sin²(a + y)/sin a'], [`x³ + y³ = ${a}xy`, `(${a}y − 3x²)/(3y² − ${a}x)`], ['x + sin y = y', '1/(1 − cos y)']];
          const [f, d] = R.pick(items); return { q: `Find dy/dx if ${f}.`, a: d, s: 'differentiate both sides; collect dy/dx' };
        } },
      { title: 'Logarithmic differentiation', levels: [2, 3], gen(R) {
          const items = [['xˣ', 'xˣ(1 + log x)'], ['x^(sin x)', 'x^(sin x)(cos x log x + sin x/x)'], ['(sin x)^x', '(sin x)^x (x cot x + log sin x)'], ['x^(1/x)', 'x^(1/x)(1 − log x)/x²'], ['(log x)^x', '(log x)^x (1/log x + log log x)'], ['2^x', '2^x log 2']];
          const [f, d] = R.pick(items); return { q: `Differentiate y = ${f}.`, a: d, s: 'log y = …, then (1/y) dy/dx = …' };
        } },
      { title: 'Parametric', gen(R) {
          const a = R.int(1, 6), items = [[`x = ${a}t², y = ${2 * a}t`, '1/t'], [`x = ${a} cos θ, y = ${a} sin θ`, '−cot θ'], [`x = ${a}(θ − sin θ), y = ${a}(1 + cos θ)`, '−cot(θ/2)'], [`x = ${a}t, y = ${a}/t`, '−1/t²'], [`x = cos³t, y = sin³t`, '−tan t']];
          const [f, d] = R.pick(items); return { q: `Find dy/dx if ${f}.`, a: d, s: '(dy/dt) ÷ (dx/dt)' };
        } },
      { title: 'Second derivative', levels: [2, 3], gen(R) {
          const a = R.int(2, 6), items = [[`x³ + ${a}x² − x`, `6x + ${2 * a}`], [`sin ${a}x`, `−${a * a} sin ${a}x`], [`e^(${a}x)`, `${a * a}e^(${a}x)`], ['x log x', '1/x'], ['log x', '−1/x²'], [`x² e^x`, 'eˣ(x² + 4x + 2)']];
          const [f, d] = R.pick(items); return { q: `Find d²y/dx² for y = ${f}.`, a: d };
        } },
      { title: 'Show a differential relation', levels: [3], gen(R) {
          const a = R.int(2, 5), items = [[`y = 3 cos(log x) + 4 sin(log x)`, 'x²y₂ + xy₁ + y = 0'], [`y = A e^(${a}x) + B e^(−${a}x)`, `y₂ = ${a * a}y`], [`y = sin⁻¹x`, '(1 − x²)y₂ = xy₁'], [`y = 500e^(7x) + 600e^(−7x)`, 'y₂ = 49y'], [`y = (tan⁻¹x)²`, '(x² + 1)²y₂ + 2x(x² + 1)y₁ = 2']];
          const [f, d] = R.pick(items); return { q: `If ${f}, show that ${d}.`, a: 'Differentiate twice and substitute.', s: d };
        } }
    ],

    quiz: [
      { q: '|x| at x = 0 is', o: ['continuous and differentiable', 'continuous, not differentiable', 'not continuous', 'differentiable only'], a: 1, e: 'Corner.' },
      { q: 'd/dx (sin⁻¹x) =', o: ['1/√(1 − x²)', '−1/√(1 − x²)', '1/(1 + x²)', 'cos⁻¹x'], a: 0, e: 'Standard.' },
      { q: 'd/dx (e^(3x)) =', o: ['e^(3x)', '3e^(3x)', 'e^(3x)/3', '3xe^(3x−1)'], a: 1, e: 'Chain rule.' },
      { q: 'd/dx (log(cos x)) =', o: ['−tan x', 'tan x', 'cot x', '1/cos x'], a: 0, e: '(−sin x)/cos x.' },
      { q: 'If x = at², y = 2at, dy/dx =', o: ['t', '1/t', '2t', '1/(2t)'], a: 1, e: '2a/(2at).' },
      { q: 'd/dx (xˣ) =', o: ['x·xˣ⁻¹', 'xˣ(1 + log x)', 'xˣ log x', 'xˣ'], a: 1, e: 'Logarithmic differentiation.' },
      { q: 'If x² + y² = 25, dy/dx =', o: ['−x/y', 'x/y', '−y/x', '2x'], a: 0, e: 'Implicit.' },
      { q: 'Differentiable at a ⇒', o: ['continuous at a', 'not continuous', 'f(a) = 0', 'nothing'], a: 0, e: 'Theorem.' },
      { q: 'd/dx (2ˣ) =', o: ['x2ˣ⁻¹', '2ˣ log 2', '2ˣ', '2ˣ/log 2'], a: 1, e: 'aˣ log a.' },
      { q: 'd²/dx² (sin x) =', o: ['cos x', '−sin x', 'sin x', '−cos x'], a: 1, e: 'Twice.' },
      { q: 'The greatest integer function is discontinuous at', o: ['every integer', 'no point', 'x = 0 only', 'every real'], a: 0, e: 'Jumps.' }
    ],

    teach: {
      outcomes: ['Test continuity and find constants in piecewise functions', 'Distinguish continuity from differentiability', 'Differentiate composite, implicit, inverse trig, exponential and log functions', 'Use logarithmic and parametric differentiation; find second derivatives'],
      periods: [
        { t: 'Continuity', flow: [['10 min', 'Pen-lift test; jumps and holes.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Algebra of continuous functions; finding k.']] },
        { t: 'Differentiability', flow: [['15 min', 'Explore panel 2: zoom test.'], ['25 min', 'Chain rule; inverse trig derivatives.']] },
        { t: 'Methods', flow: [['15 min', 'Implicit and logarithmic.'], ['15 min', 'Parametric, second derivative.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Continuous ⇒ differentiable.', 'Chain rule inner factor dropped.', 'xˣ via power rule.'],
      activities: ['Zoom into graphs on a graphing app.', 'Relay: each student applies one layer of the chain rule.'],
      exit: ['k for f(x) = kx² (x ≤ 2), 3 (x > 2).', 'd/dx sin(x³).', 'dy/dx for x = t², y = t³.'],
      homework: 'If y = (tan⁻¹x)², show (x² + 1)²y₂ + 2x(x² + 1)y₁ = 2. Differentiate (sin x)^(cos x) + (cos x)^(sin x).'
    },

    slides: [
      { t: 'Continuity and Differentiability', b: ['Continuity', 'Differentiability', 'Rules', 'Special methods'] },
      { t: 'Continuity', b: ['lim f(x) = f(a)', 'LHL = RHL = f(a)', 'Find k at the joining point'] },
      { t: 'Derivatives', b: ['Chain rule', 'sin⁻¹x → 1/√(1 − x²)', 'tan⁻¹x → 1/(1 + x²)', 'aˣ → aˣ log a'] },
      { t: 'Methods', b: ['Implicit', 'Logarithmic: for u^v', 'Parametric: (dy/dt)/(dx/dt)', 'Second derivative'] },
      { t: 'Check yourself', b: ['d/dx e^(sin x)?', 'dy/dx if xy = 4?', 'Answers: cos x e^(sin x) · −y/x'] }
    ],

    fs: { groups: [
        ['Continuity and differentiability', [['Continuous at a', 'LHL = RHL = f(a)'], ['Differentiable at a', 'Lf′(a) = Rf′(a)'], ['Relation', 'differentiable ⇒ continuous'], ['|x| at 0', 'continuous, not differentiable']]],
        ['Standard derivatives', [['sin⁻¹x, cos⁻¹x', '±1/√(1 − x²)'], ['tan⁻¹x, cot⁻¹x', '±1/(1 + x²)'], ['sec⁻¹x', '1/(x√(x² − 1))'], ['eˣ, aˣ', 'eˣ, aˣ log a'], ['log x', '1/x'], ['sec x, cot x', 'sec x tan x, −cosec²x']]],
        ['Methods', [['Chain rule', 'dy/du · du/dx'], ['Implicit', 'differentiate both sides'], ['Logarithmic', '(1/y)y′ = (v log u)′'], ['Parametric', '(dy/dt)/(dx/dt)'], ['Parametric y″', '[d/dt(dy/dx)] ÷ (dx/dt)']]]],
      ex: [['y = xˣ', 'xˣ(1 + log x)'], ['x = a cos θ, y = a sin θ', 'dy/dx = −cot θ']],
      rem: ['Multiply by the inner derivative.', 'Use logs for variable powers.', 'Check both sides of a joining point.'] }
  });
})();
