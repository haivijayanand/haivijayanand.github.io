/*
TOOL:    class12_maths_ch06
FAMILY:  CBSE_REVISION / Class 12 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 6 Application of Derivatives - revise, board focus, 2 explore panels (sign of f′ and turning points, open-box optimisation), 6 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num, Q, terms } = G9;
  const cub = (a, b, c, d) => terms([[a, 'x³'], [b, 'x²'], [c, 'x'], [d, '']]);

  G9.register({
    no: 6, part: 'Unit III · Calculus (35 marks)', short: 'Application of derivatives', title: 'Application of Derivatives',
    blurb: 'Rate of change, increasing and decreasing functions, local and absolute maxima and minima, first and second derivative tests, optimisation problems.',
    revise: {
      oneLine: 'The sign of f′ tells whether f rises or falls; where f′ changes sign, f has a turning point. The second derivative test and endpoint checks then find local and absolute maxima and minima — the basis of every optimisation problem.',
      sections: [
        { h: 'Rate of change', html: `<p>dy/dx is the rate of change of y with respect to x. With time: dA/dt = (dA/dr)(dr/dt). Example: area of a circle, dr/dt = 0.7 cm/s, r = 5 ⇒ dA/dt = 2πr(0.7) = 7π cm²/s.</p>
          <p>Marginal cost / revenue = derivative of total cost / revenue.</p>` },
        { h: 'Increasing and decreasing', html: `<p>On an interval: f′ &gt; 0 ⇒ strictly increasing; f′ &lt; 0 ⇒ strictly decreasing; f′ = 0 throughout ⇒ constant. Method: solve f′(x) = 0, split the number line at these points, test the sign of f′ in each part.</p>` },
        { h: 'Maxima and minima', html: `<p>Critical points: f′(c) = 0 (or f′ not defined).</p><ul><li><b>First derivative test</b>: f′ changes + to − ⇒ local maximum; − to + ⇒ local minimum; no change ⇒ point of inflection.</li>
          <li><b>Second derivative test</b>: f′(c) = 0 and f″(c) &lt; 0 ⇒ local max; f″(c) &gt; 0 ⇒ local min; f″(c) = 0 ⇒ test fails.</li>
          <li><b>Absolute</b> extrema on [a, b]: compare f at critical points and at a and b.</li></ul>` },
        { h: 'Optimisation', html: `<p>Write the quantity to optimise as a function of one variable (use the constraint), differentiate, set to 0, confirm with f″. Classics: open box from a square sheet (cut x = side/6), rectangle of fixed perimeter (square), cylinder in a sphere, minimum surface for fixed volume.</p>` }
      ],
      formulas: [['Rate', 'dA/dt = (dA/dr)(dr/dt)'], ['Increasing', "f′(x) > 0"], ['Decreasing', "f′(x) < 0"], ['Local max', "f′(c) = 0, f″(c) < 0"], ['Local min', "f′(c) = 0, f″(c) > 0"], ['Absolute on [a, b]', 'compare f at critical points and ends']],
      terms: [['Critical point', 'f′(c) = 0 or not defined'], ['Local maximum', 'highest value nearby'], ['Absolute maximum', 'highest value on the whole interval'], ['Point of inflection', 'f′ does not change sign']],
      traps: ['Forgetting endpoints for absolute extrema.', 'f′(c) = 0 does not guarantee an extremum (x³ at 0).', 'Giving x when the question asks for the maximum value.', 'Units: rates carry units per second.'],
      board: '<p><b>Unit III (Calculus) — 35 marks.</b> Expect: rate-of-change word problems (2 marks), intervals of increase/decrease (3 marks), and a 5-mark optimisation problem (box, cylinder, cone, window), plus case-study questions built on maxima/minima.</p>',
      bridge: '<p>Uses derivatives from Ch 5. Linear programming (Ch 12) optimises without calculus.</p>'
    },

    explore: [
      {
        title: 'Sign of f′ and turning points', intro: 'Set the cubic f(x) = x³ + bx² + cx. The graph is blue where f′ > 0 (increasing) and orange where f′ < 0; turning points are marked.',
        build(el, K) {
          let b_ = -3, c = 0; const row = K.row(el); K.slider(row, 'b', -6, 6, 0.5, b_, v => { b_ = v; bd.redraw(); }); K.slider(row, 'c', -9, 9, 0.5, c, v => { c = v; bd.redraw(); });
          const bd = new K.Board(el, { xmin: -5, xmax: 5, ymin: -10, ymax: 10, equal: false }); const rd = K.read(el);
          bd.onDraw = () => { bd.base(); const f = x => x ** 3 + b_ * x * x + c * x, fp = x => 3 * x * x + 2 * b_ * x + c;
            bd.fn(x => fp(x) >= 0 ? f(x) : NaN, { color: C.blue, w: 4 }); bd.fn(x => fp(x) < 0 ? f(x) : NaN, { color: C.orange, w: 4, dash: [7, 4] }); bd.fn(fp, { color: C.purple, w: 1.5, dash: [3, 4] });
            const D = 4 * b_ * b_ - 12 * c; let msg = `f′(x) = 3x² ${b_ < 0 ? '−' : '+'} ${num(Math.abs(2 * b_))}x ${c < 0 ? '−' : '+'} ${num(Math.abs(c))} (purple dashed) · `;
            if (D > 0) { const x1 = (-2 * b_ - Math.sqrt(D)) / 6, x2 = (-2 * b_ + Math.sqrt(D)) / 6; bd.dot(x1, f(x1), { color: C.ink, r: 6, label: 'max' }); bd.dot(x2, f(x2), { color: C.ink, r: 6, label: 'min' });
              msg += `critical points x = ${num(x1, 3)} (f″ = ${num(6 * x1 + 2 * b_, 2)} < 0: local max ${num(f(x1), 3)}) and x = ${num(x2, 3)} (f″ = ${num(6 * x2 + 2 * b_, 2)} > 0: local min ${num(f(x2), 3)}) · increasing on (−∞, ${num(x1, 2)}) ∪ (${num(x2, 2)}, ∞)`; }
            else msg += D === 0 ? 'one critical point, f′ does not change sign: point of inflection, no extremum' : 'f′ > 0 everywhere: strictly increasing, no turning points';
            rd.innerHTML = msg; };
          bd.redraw(); return null;
        }
      },
      {
        title: 'Open box from a square sheet', intro: 'Cut squares of side x from the corners of an 18 cm sheet and fold. Press <kbd>P</kbd> to sweep x; V(x) = x(18 − 2x)² peaks at x = 3.',
        build(el, K) {
          const a = 18; let x = 1; const bd = new K.Board(el, { xmin: -1, xmax: 21, ymin: -2, ymax: 22, axes: false, grid: 0 }); const rd = K.read(el);
          const an = new K.Anim(80, () => { x = 0.1 * an.i + 0.1; bd.redraw(); }, { ms: 80 });
          const row = K.row(el); K.slider(row, 'x (cm)', 0.1, 8.9, 0.1, x, v => { x = v; an.pause(); bd.redraw(); });
          bd.onDraw = () => { bd.clear(); bd.rect(0, 2, a, a, { fill: C.blueL, color: C.blue, w: 2 }); [[0, 2], [a - x, 2], [0, 2 + a - x], [a - x, 2 + a - x]].forEach(p => bd.rect(p[0], p[1], x, x, { fill: 'rgba(234,88,12,.5)', color: C.orange }));
            bd.rect(x, 2 + x, a - 2 * x, a - 2 * x, { color: C.purple, w: 2, dash: [6, 4] });
            const V = x * (a - 2 * x) ** 2; rd.innerHTML = `x = ${num(x, 2)} cm · base ${num(a - 2 * x, 2)} cm · V = x(18 − 2x)² = <b>${num(V, 1)} cm³</b> · V′(x) = (18 − 2x)(18 − 6x) = 0 ⇒ x = 3 · V″(3) = −72 < 0 ⇒ maximum V = 432 cm³`; };
          K.anim(el, an); bd.redraw(); return an;
        }
      }
    ],

    gens: [
      { title: 'Rate of change', gen(R) {
          const t = R.int(0, 2), r = R.int(3, 12), k = R.pick([2, 3, 4, 5]);
          if (t === 0) return { q: `The radius of a circle increases at ${k} cm/s. How fast is the area increasing when r = ${r} cm?`, a: `${2 * r * k}π cm²/s`, ans: 2 * r * k * Math.PI, s: `dA/dt = 2πr dr/dt` };
          if (t === 1) return { q: `The edge of a cube increases at ${k} cm/s. How fast is the volume increasing when the edge is ${r} cm?`, a: `${3 * r * r * k} cm³/s`, ans: 3 * r * r * k, s: 'dV/dt = 3x² dx/dt' };
          return { q: `A balloon's radius grows at ${k} cm/s. Find the rate of change of its surface area when r = ${r} cm.`, a: `${8 * r * k}π cm²/s`, ans: 8 * r * k * Math.PI, s: 'S = 4πr² ⇒ dS/dt = 8πr dr/dt' };
        } },
      { title: 'Increasing / decreasing intervals', gen(R) {
          const p = R.int(-4, 1), q = p + R.int(1, 5); // f′ = 6(x − p)(x − q) for f = 2x³ − 3(p+q)x² + 6pq x
          const a = 2, b = -3 * (p + q), c = 6 * p * q;
          return { q: `Find the intervals in which f(x) = ${cub(a, b, c, 0)} is strictly increasing or decreasing.`, a: `increasing on (−∞, ${p}) and (${q}, ∞); decreasing on (${p}, ${q})`, s: `f′(x) = 6(x − ${p})(x − ${q})`.replace(/− (-)(\d)/g, '+ $2') };
        } },
      { title: 'Local maxima and minima', gen(R) {
          const p = R.int(-3, 1), q = p + R.int(1, 4); const a = 2, b = -3 * (p + q), c = 6 * p * q, d = R.int(-5, 5); const f = x => a * x ** 3 + b * x * x + c * x + d;
          return { q: `Find the local maximum and minimum values of f(x) = ${cub(a, b, c, d)}.`, a: `local max ${f(p)} at x = ${p}; local min ${f(q)} at x = ${q}`, s: `f′ = 6(x − ${p})(x − ${q}); f″ = 12x ${b < 0 ? '−' : '+'} ${Math.abs(2 * b)}`.replace(/− (-)(\d)/g, '+ $2') };
        } },
      { title: 'Absolute extrema on [a, b]', levels: [2, 3], gen(R) {
          const h = R.int(-2, 3), k = R.int(-5, 5), lo = h - R.int(1, 3), hi = h + R.int(1, 4); const f = x => (x - h) ** 2 + k; const vals = [lo, h, hi].map(f);
          return { q: `Find the absolute maximum and minimum of f(x) = x² ${-2 * h < 0 ? '−' : '+'} ${Math.abs(2 * h)}x ${h * h + k < 0 ? '−' : '+'} ${Math.abs(h * h + k)} on [${lo}, ${hi}].`.replace(/ \+ 0x/, '').replace(/ − 0x/, ''), a: `max ${Math.max(...vals)}, min ${k}`, s: `critical point x = ${h}; f(${lo}) = ${vals[0]}, f(${h}) = ${k}, f(${hi}) = ${vals[2]}` };
        } },
      { title: 'Optimisation', levels: [2, 3], gen(R) {
          const t = R.int(0, 3);
          if (t === 0) { const s = R.pick([12, 18, 24, 30]); const x = s / 6; return { q: `Equal squares are cut from the corners of a square sheet of side ${s} cm to make an open box. Find the side of the square cut for maximum volume, and that volume.`, a: `x = ${x} cm, V = ${x * (s - 2 * x) ** 2} cm³`, ans: x, s: `V = x(${s} − 2x)²; V′ = 0 ⇒ x = ${s}/6` }; }
          if (t === 1) { const P = R.int(10, 40) * 2; return { q: `Among rectangles of perimeter ${P} cm, find the one of largest area.`, a: `a square of side ${P / 4} cm, area ${(P / 4) ** 2} cm²`, ans: (P / 4) ** 2 }; }
          if (t === 2) { const S = R.int(5, 30) * 2; return { q: `Find two positive numbers with sum ${S} whose product is maximum.`, a: `${S / 2} and ${S / 2}`, ans: S / 2 }; }
          const S = R.int(4, 20) * 3; return { q: `Find two positive numbers x, y with x + y = ${S} such that xy² is maximum.`, a: `x = ${S / 3}, y = ${2 * S / 3}`, s: `f(x) = x(${S} − x)²` };
        } },
      { title: 'Marginal cost / revenue', levels: [1, 2], gen(R) {
          const a = R.int(1, 5) / 10, b = R.int(1, 9), c = R.int(10, 50), x = R.int(5, 20);
          return { q: `Total cost C(x) = ${num(a)}x² + ${b}x + ${c}. Find the marginal cost when x = ${x} units.`, a: `₹${num(2 * a * x + b)}`, ans: 2 * a * x + b, s: `C′(x) = ${num(2 * a)}x + ${b}` };
        } }
    ],

    quiz: [
      { q: 'f is strictly increasing on an interval if', o: ["f′ > 0", "f′ < 0", "f′ = 0", "f″ > 0"], a: 0, e: 'Positive slope.' },
      { q: 'f′(c) = 0 and f″(c) < 0 ⇒', o: ['local max', 'local min', 'inflection', 'no information'], a: 0, e: 'Second derivative test.' },
      { q: 'f(x) = x³ at x = 0 has', o: ['a max', 'a min', 'neither (inflection)', 'a corner'], a: 2, e: 'f′ does not change sign.' },
      { q: 'Rate of change of area of a circle w.r.t. r at r = 5', o: ['10π', '25π', '5π', '2π'], a: 0, e: '2πr.' },
      { q: 'f(x) = e^x is', o: ['increasing on R', 'decreasing on R', 'neither', 'constant'], a: 0, e: 'f′ = eˣ > 0.' },
      { q: 'Max of a rectangle area with perimeter 20', o: ['25', '20', '100', '24'], a: 0, e: '5 × 5.' },
      { q: 'Critical points of f(x) = x² − 4x', o: ['x = 2', 'x = 4', 'x = 0', 'x = −2'], a: 0, e: '2x − 4 = 0.' },
      { q: 'Absolute extrema on [a, b] occur at', o: ['critical points only', 'endpoints only', 'critical points or endpoints', 'midpoint'], a: 2, e: 'Compare all.' },
      { q: 'f(x) = −x² + 6x has maximum value', o: ['9', '3', '6', '0'], a: 0, e: 'At x = 3.' },
      { q: 'Marginal revenue is', o: ['R(x)/x', 'R′(x)', 'R″(x)', 'R(x)'], a: 1, e: 'Derivative of revenue.' },
      { q: 'If f″(c) = 0 at a critical point, the second derivative test', o: ['gives max', 'gives min', 'fails', 'gives inflection'], a: 2, e: 'Use the first derivative test.' }
    ],

    teach: {
      outcomes: ['Solve rate-of-change problems', 'Find intervals of increase and decrease', 'Locate local and absolute extrema with derivative tests', 'Model and solve optimisation problems'],
      periods: [
        { t: 'Rates and monotonicity', flow: [['10 min', 'Balloon inflating: related rates.'], ['15 min', 'Explore panel 1: sign of f′.'], ['15 min', 'Interval problems.']] },
        { t: 'Extrema', flow: [['20 min', 'First and second derivative tests.'], ['20 min', 'Absolute extrema on closed intervals.']] },
        { t: 'Optimisation', flow: [['15 min', 'Explore panel 2: open box.'], ['15 min', 'Cylinder, cone, window problems.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Endpoints ignored.', 'f′ = 0 always an extremum.', 'Answering x instead of the value.'],
      activities: ['Make open boxes from A4 squares; measure volumes.', 'Graph-paper sign chart of f′.'],
      exit: ['Intervals of increase of x² − 4x.', 'Local min of x² + 2x.', 'Max product of two numbers with sum 16.'],
      homework: 'Show that the right circular cylinder of given surface area and maximum volume has height equal to the diameter of its base.'
    },

    slides: [
      { t: 'Application of Derivatives', b: ['Rate of change', 'Increasing and decreasing', 'Maxima and minima', 'Optimisation'] },
      { t: 'Monotonic', b: ["f′ > 0: increasing", "f′ < 0: decreasing", 'Split at f′ = 0, test signs'] },
      { t: 'Tests', b: ['First: sign change of f′', 'Second: f″(c) < 0 max, > 0 min', 'Absolute: include endpoints'] },
      { t: 'Optimisation steps', b: ['Variables and constraint', 'One-variable function', "Solve f′ = 0, check f″", 'Answer the question asked'] },
      { t: 'Check yourself', b: ['Min value of x² − 6x + 10?', 'Answer: 1 (at x = 3)'] }
    ],

    fs: { groups: [
        ['Rates', [['dy/dx', 'rate of change of y w.r.t. x'], ['Related rates', 'dA/dt = (dA/dr)(dr/dt)'], ['Marginal', 'C′(x), R′(x)']]],
        ['Monotonicity', [['Increasing', "f′ > 0 on the interval"], ['Decreasing', "f′ < 0"], ['Method', 'solve f′ = 0, sign chart']]],
        ['Extrema', [['Critical point', "f′(c) = 0 or undefined"], ['First derivative test', '+ → − max; − → + min'], ['Second derivative test', "f″ < 0 max, f″ > 0 min"], ['Absolute on [a, b]', 'compare f(critical), f(a), f(b)']]],
        ['Classic results', [['Open box, side a', 'cut a/6'], ['Fixed perimeter', 'square has max area'], ['Fixed sum', 'equal parts give max product'], ['Cylinder, fixed surface, max volume', 'h = 2r']]]],
      ex: [['f = x³ − 3x', 'f′ = 3(x − 1)(x + 1): max 2 at −1, min −2 at 1'], ['A = πr², dr/dt = 3, r = 4', 'dA/dt = 24π']],
      rem: ['Check endpoints.', 'Confirm with f″.', 'State units.'] }
  });
})();
