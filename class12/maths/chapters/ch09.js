/*
TOOL:    class12_maths_ch09
FAMILY:  CBSE_REVISION / Class 12 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 9 Differential Equations - revise, board focus, 2 explore panels (slope field with solution through a point, growth and decay), 7 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num, Q } = G9;

  G9.register({
    no: 9, part: 'Unit III · Calculus (35 marks)', short: 'Differential equations', title: 'Differential Equations',
    blurb: 'Order and degree, general and particular solutions, variables separable, homogeneous equations, linear first-order equations.',
    revise: {
      oneLine: 'A differential equation links a function with its derivatives. First-order ones are solved by separating variables, by y = vx for homogeneous equations, or with an integrating factor for linear equations dy/dx + Py = Q.',
      sections: [
        { h: 'Order and degree', html: `<p><b>Order</b>: highest derivative present. <b>Degree</b>: power of that highest derivative when the equation is a polynomial in the derivatives (not defined otherwise, e.g. if sin(y′) appears).</p>
          <p>General solution: has as many arbitrary constants as the order. Particular solution: constants fixed by given conditions.</p>` },
        { h: 'Variables separable', html: `<p>dy/dx = g(x)h(y) ⇒ ∫dy/h(y) = ∫g(x)dx + C. Example: dy/dx = ky ⇒ y = Ae^(kx) (growth/decay).</p>` },
        { h: 'Homogeneous', html: `<p>dy/dx = F(x, y) where F(λx, λy) = F(x, y), i.e. dy/dx = g(y/x). Put y = vx, dy/dx = v + x dv/dx, then separate v and x.</p>` },
        { h: 'Linear first order', html: `<div class="box m">dy/dx + P(x)y = Q(x): IF = e^(∫P dx), y · IF = ∫Q · IF dx + C</div><p>Similarly dx/dy + P₁(y)x = Q₁(y). Example: dy/dx + y = eˣ ⇒ IF = eˣ, y eˣ = e^(2x)/2 + C.</p>` }
      ],
      formulas: [['Separable', '∫dy/h(y) = ∫g(x)dx'], ['Homogeneous', 'y = vx, dy/dx = v + x dv/dx'], ['Linear', 'dy/dx + Py = Q'], ['Integrating factor', 'e^(∫P dx)'], ['Solution', 'y·IF = ∫Q·IF dx + C'], ['Growth', 'dy/dt = ky ⇒ y = y₀e^(kt)']],
      terms: [['Order', 'highest derivative'], ['Degree', 'power of the highest derivative'], ['General solution', 'contains arbitrary constants'], ['Particular solution', 'constants fixed by conditions']],
      traps: ['Degree is not defined when derivatives appear inside sin, log, etc.', 'Forgetting + C, or adding it twice.', 'IF uses P after writing the equation in standard form (coefficient of dy/dx = 1).', 'Order of a family with n constants is n.'],
      board: '<p><b>Unit III (Calculus) — 35 marks.</b> Expect order/degree MCQs, a separable or homogeneous equation (3 marks) and a linear equation with a particular solution (3–5 marks).</p>',
      bridge: '<p>Needs integration (Ch 7). Used in physics (decay, cooling, motion) and growth models.</p>'
    },

    explore: [
      {
        title: 'Slope field and a solution curve', intro: 'Each tick has slope dy/dx at that point. Drag P: the solution through P follows the ticks (numerical Euler steps).',
        build(el, K) {
          const fs = [['dy/dx = x', (x, y) => x, 'y = x²/2 + C'], ['dy/dx = y', (x, y) => y, 'y = Aeˣ'], ['dy/dx = −x/y', (x, y) => Math.abs(y) < 1e-3 ? NaN : -x / y, 'x² + y² = C (circles)'], ['dy/dx = x + y', (x, y) => x + y, 'y = Ceˣ − x − 1'], ['dy/dx = y/x', (x, y) => Math.abs(x) < 1e-3 ? NaN : y / x, 'y = Cx (lines)']];
          let k = 0; const row = K.row(el); K.select(row, 'equation', fs.map(f => f[0]), i => { k = i; b.redraw(); });
          const b = new K.Board(el, { xmin: -5, xmax: 5, ymin: -4, ymax: 4 }); const rd = K.read(el); const P = b.addPt(0, 1, { label: 'P', snap: 0.25, color: C.orange });
          b.onDraw = () => { b.base(); const f = fs[k][1];
            for (let x = -5; x <= 5; x += 0.5) for (let y = -4; y <= 4; y += 0.5) { const m = f(x, y); if (!isFinite(m)) continue; const L = 0.18 / Math.sqrt(1 + m * m); b.line(x - L, y - m * L, x + L, y + m * L, { color: C.grey, w: 1.5 }); }
            [1, -1].forEach(dir => { let x = P.x, y = P.y; const c = b.ctx; c.beginPath(); c.moveTo(b.X(x), b.Y(y)); for (let i = 0; i < 2000; i++) { const m = f(x, y); if (!isFinite(m)) break; const h = 0.005 * dir / Math.sqrt(1 + m * m); x += h; y += m * h; if (Math.abs(x) > 6 || Math.abs(y) > 5) break; c.lineTo(b.X(x), b.Y(y)); } c.strokeStyle = C.blue; c.lineWidth = 3; c.stroke(); });
            b.drawPts(); rd.innerHTML = `${fs[k][0]} · general solution ${fs[k][2]} · blue: the particular solution through P(${num(P.x)}, ${num(P.y)})`; };
          b.redraw(); return null;
        }
      },
      {
        title: 'Growth and decay: dy/dt = ky', intro: 'Set k and y₀. Positive k grows, negative k decays; the half-life or doubling time is log 2 / |k|.',
        build(el, K) {
          let k = 0.3, y0 = 2; const row = K.row(el); K.slider(row, 'k', -1, 1, 0.05, k, v => { k = v; b.redraw(); }); K.slider(row, 'y₀', 0.5, 5, 0.5, y0, v => { y0 = v; b.redraw(); });
          const b = new K.Board(el, { xmin: 0, xmax: 10, ymin: 0, ymax: 12, equal: false }); const rd = K.read(el);
          b.onDraw = () => { b.base(); b.fn(t => y0 * Math.exp(k * t), { color: k >= 0 ? C.blue : C.orange, w: 3 }); const T = k ? Math.log(2) / Math.abs(k) : Infinity;
            if (isFinite(T) && T < 10) { const yT = y0 * Math.exp(k * T); b.line(T, 0, T, yT, { color: C.purple, dash: [5, 4], w: 2 }); b.dot(T, yT, { color: C.purple, r: 5 }); }
            rd.innerHTML = `y = ${num(y0)}e^(${num(k)}t) · ${k > 0 ? `doubling time ${num(T, 3)}` : k < 0 ? `half-life ${num(T, 3)}` : 'constant'} · solved by separating: dy/y = k dt ⇒ log y = kt + C`; };
          b.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Order and degree', levels: [1, 2], gen(R) {
          const items = [["(d²y/dx²)³ + (dy/dx)⁴ + y = 0", 'order 2, degree 3'], ["d³y/dx³ + 2(dy/dx)² = 0", 'order 3, degree 1'], ["dy/dx + sin(dy/dx) = 0", 'order 1, degree not defined'], ["y″ + 5y′ + 6y = 0", 'order 2, degree 1'], ["(y‴)² + (y″)³ + y′ = 0", 'order 3, degree 2'], ["y′ + y = eˣ", 'order 1, degree 1'], ["(dy/dx)² = x", 'order 1, degree 2'], ["y″ = √(1 + (y′)²)", 'order 2, degree 2 (square both sides)']];
          const [q, a] = R.pick(items); return { q: `Find the order and degree of ${q}.`, a };
        } },
      { title: 'Form the differential equation', levels: [2, 3], gen(R) {
          const items = [['y = A e^(2x) + B e^(−2x)', 'y″ − 4y = 0'], ['y = mx (lines through the origin)', 'x y′ − y = 0'], ['circles x² + y² = a²', 'x + y y′ = 0'], ['y = A cos x + B sin x', 'y″ + y = 0'], ['y = a eˣ', 'y′ = y'], ['parabolas y² = 4ax', '2x y′ − y = 0']];
          const [q, a] = R.pick(items); return { q: `Form the differential equation of the family ${q} by eliminating the constants.`, a, s: 'differentiate as many times as there are constants' };
        } },
      { title: 'Variables separable', gen(R) {
          const a = R.int(2, 5), items = [[`dy/dx = ${a}x²`, `y = ${Q(a, 3)}x³ + C`], [`dy/dx = (1 + y²)/(1 + x²)`, 'tan⁻¹y = tan⁻¹x + C'], [`dy/dx = e^(x + y)`, 'eˣ + e^(−y) = C'], [`dy/dx = ${a}y`, `y = Ae^(${a}x)`], [`x dy − y dx = 0`, 'y = Cx'], [`dy/dx = xy`, 'y = Ae^(x²/2)'], [`dy/dx = (1 − cos x)/(1 + cos x)`, 'y = 2 tan(x/2) − x + C']];
          const [q, a2] = R.pick(items); return { q: `Solve ${q}.`, a: a2, s: 'separate, then integrate both sides' };
        } },
      { title: 'Particular solution', levels: [2, 3], gen(R) {
          const a = R.int(1, 4), y0 = R.int(1, 6), x0 = 0;
          const t = R.int(0, 1);
          if (t === 0) return { q: `Solve dy/dx = ${a}y given y(0) = ${y0}.`, a: `y = ${y0}e^(${a}x)` };
          return { q: `Solve dy/dx = ${2 * a}x given y(0) = ${y0}.`, a: `y = ${a === 1 ? '' : a}x² + ${y0}` };
        } },
      { title: 'Homogeneous equation', levels: [2, 3], gen(R) {
          const items = [['(x − y) dy − (x + y) dx = 0', 'tan⁻¹(y/x) = log√(x² + y²) + C'], ['dy/dx = (x + y)/x', 'y = x log|x| + Cx'], ['x² dy/dx = x² − 2y² + xy', 'from y = vx: (1/(2√2)) log|(x + √2y)/(x − √2y)| = log|x| + C'], ['x dy/dx = y + x', 'y = x(log|x| + C)'], ['(x² + y²) dx = 2xy dy', 'x² − y² = Cx'], ['dy/dx = y/x + tan(y/x)', 'sin(y/x) = Cx']];
          const [q, a] = R.pick(items); return { q: `Solve the homogeneous equation ${q}.`, a, s: 'put y = vx' };
        } },
      { title: 'Linear equation', gen(R, L) {
          const a = R.int(1, 4), items = L === 1 ? [[`dy/dx + y = eˣ`, 'IF eˣ', 'y = eˣ/2 + Ce^(−x)'], [`dy/dx + ${a}y = ${a}`, `IF e^(${a}x)`, `y = 1 + Ce^(−${a}x)`], ['dy/dx − y = 1', 'IF e^(−x)', 'y = −1 + Ceˣ']]
            : [['dy/dx + y/x = x²', 'IF x', 'y = x³/4 + C/x'], ['dy/dx + 2y = sin x', 'IF e^(2x)', 'y = (2 sin x − cos x)/5 + Ce^(−2x)'], ['x dy/dx + 2y = x² (x ≠ 0)', 'IF x²', 'y = x²/4 + C/x²'], ['dy/dx + y tan x = sec x', 'IF sec x', 'y = sin x + C cos x'], ['dy/dx + 3y = e^(−2x)', 'IF e^(3x)', 'y = e^(−2x) + Ce^(−3x)']];
          const [q, f, s] = R.pick(items); return { q: `Solve ${q}.`, a: s, s: `${f}; y·IF = ∫Q·IF dx + C` };
        } },
      { title: 'Number of constants / order', levels: [1], gen(R) {
          const n = R.int(1, 4); return { q: `The general solution of a differential equation of order ${n} contains how many arbitrary constants?`, a: String(n), ans: n };
        } }
    ],

    quiz: [
      { q: 'Order of y″ + 3y′ + y = 0', o: ['1', '2', '3', '0'], a: 1, e: 'Highest derivative y″.' },
      { q: 'Degree of (y″)³ + y′ = 0', o: ['1', '2', '3', 'not defined'], a: 2, e: 'Power of y″.' },
      { q: 'Degree of y′ + sin y′ = 0', o: ['1', '0', 'not defined', '2'], a: 2, e: 'Not polynomial in y′.' },
      { q: 'Solution of dy/dx = y', o: ['y = Ae^x', 'y = x + C', 'y = Ax', 'y = log x'], a: 0, e: 'Separable.' },
      { q: 'Integrating factor of dy/dx + 2y = x', o: ['e^(2x)', 'e^(x²)', '2x', 'e^(−2x)'], a: 0, e: 'e^(∫2 dx).' },
      { q: 'IF of dy/dx + y/x = x', o: ['x', '1/x', 'eˣ', 'log x'], a: 0, e: 'e^(log x).' },
      { q: 'For homogeneous equations substitute', o: ['y = vx', 'y = x + v', 'y = eᵛ', 'x = y²'], a: 0, e: 'Standard.' },
      { q: 'General solution of an order-3 equation has', o: ['3 constants', '1 constant', '2 constants', 'none'], a: 0, e: 'One per order.' },
      { q: 'Family y = mx gives the equation', o: ['xy′ = y', 'y′ = m', 'y″ = 0 only', 'xy′ + y = 0'], a: 0, e: 'Eliminate m.' },
      { q: 'Solution of x dx + y dy = 0', o: ['x² + y² = C', 'x² − y² = C', 'xy = C', 'y = Cx'], a: 0, e: 'Integrate.' },
      { q: 'The linear form is', o: ['dy/dx + Py = Q', 'dy/dx = y²', 'y″ + y = 0', 'dy/dx = F(y/x)'], a: 0, e: 'P, Q functions of x.' }
    ],

    teach: {
      outcomes: ['Find order and degree', 'Form equations from families of curves', 'Solve separable, homogeneous and linear first-order equations', 'Find particular solutions'],
      periods: [
        { t: 'Basics', flow: [['10 min', 'Cooling tea: rate depends on temperature.'], ['15 min', 'Order, degree; general/particular solutions.'], ['15 min', 'Explore panel 1: slope fields.']] },
        { t: 'Separable and homogeneous', flow: [['20 min', 'Separation; growth/decay (panel 2).'], ['20 min', 'y = vx method.']] },
        { t: 'Linear', flow: [['20 min', 'Integrating factor; standard form first.'], ['10 min', 'Particular solutions.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Degree with transcendental derivatives.', 'IF before standard form.', 'C mishandled.'],
      activities: ['Draw slope fields on grid paper by hand.', 'Bacteria doubling data fitted to y = y₀e^(kt).'],
      exit: ['Order and degree of (y′)² + y = 0.', 'Solve dy/dx = 3x².', 'IF of dy/dx − y = x.'],
      homework: 'Solve x dy/dx + 2y = x² log x, and find the particular solution of dy/dx + y cot x = 2x + x² cot x given y(π/2) = 0.'
    },

    slides: [
      { t: 'Differential Equations', b: ['Order and degree', 'Separable', 'Homogeneous', 'Linear'] },
      { t: 'Order and degree', b: ['Order: highest derivative', 'Degree: its power (if polynomial)', 'Constants = order'] },
      { t: 'Methods', b: ['Separable: ∫dy/h(y) = ∫g(x)dx', 'Homogeneous: y = vx', 'Linear: IF = e^(∫P dx)'] },
      { t: 'Linear', b: ['dy/dx + Py = Q', 'y·IF = ∫Q·IF dx + C'] },
      { t: 'Check yourself', b: ['Solve dy/dx = 2y.', 'IF of dy/dx + y = 1?', 'Answers: y = Ae^(2x) · eˣ'] }
    ],

    fs: { groups: [
        ['Basics', [['Order', 'highest derivative'], ['Degree', 'power of highest derivative (polynomial form)'], ['Constants', 'number = order'], ['Particular', 'use given conditions']]],
        ['Separable', [['dy/dx = g(x)h(y)', '∫dy/h(y) = ∫g(x)dx + C'], ['dy/dx = ky', 'y = Ae^(kx)']]],
        ['Homogeneous', [['Test', 'F(λx, λy) = F(x, y)'], ['Substitution', 'y = vx, dy/dx = v + x dv/dx'], ['dx/dy form', 'x = vy']]],
        ['Linear', [['Form', 'dy/dx + P(x)y = Q(x)'], ['IF', 'e^(∫P dx)'], ['Solution', 'y·IF = ∫Q·IF dx + C'], ['In x', 'dx/dy + P₁x = Q₁: x·IF = ∫Q₁·IF dy + C']]]],
      ex: [['dy/dx + y = eˣ', 'IF eˣ ⇒ y = eˣ/2 + Ce^(−x)'], ['dy/dx = (x + y)/x', 'y = x log|x| + Cx']],
      rem: ['Standard form before IF.', 'One C only.', 'Check degree is defined.'] }
  });
})();
