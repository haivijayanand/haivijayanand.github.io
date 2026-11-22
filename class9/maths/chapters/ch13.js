/*
TOOL:    class9_maths_ch13
FAMILY:  CBSE_REVISION / Class 9 Maths (Ganita Manjari)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class 9 Maths full build
CHANGES: 1.0.0 - Ch 13 Two Variables, One Line - revise, 3 explore panels (ax + by = c, slope, two lines), 10 generators, quiz, lesson plan, slides
*/
(function () {
  const { F, Q, num, C, terms, gcd } = G9;
  const eqH = (a, b, c) => `${terms([[a, 'x'], [b, 'y']])} = ${num(c)}`;
  const P = (x, y) => `(${num(x)}, ${num(y)})`;

  G9.register({
    no: 13, part: 'Part II', short: 'Two variables, one line', title: 'Two Variables, One Line',
    blurb: 'Linear equations in two variables, their solutions and graphs, slope and intercepts.',
    revise: {
      oneLine: 'An equation ax + by = c (a, b not both 0) has infinitely many solutions (x, y), and when plotted they form one straight line. Its steepness is the slope; where it crosses the axes are the intercepts.',
      sections: [
        { h: 'Linear equations in two variables', html: `<p><b>Standard form</b>: ax + by + c = 0 (or ax + by = c), with a and b not both zero. Example: 60x + 50y = 280 — the cost of x pens at ₹60 and y notebooks at ₹50 is ₹280.</p>
          <p>A <b>solution</b> is an ordered pair (x, y) that makes the equation true. Pick any x, solve for y → infinitely many solutions.</p>` },
        { h: 'The graph is a line', html: `<p>Every solution is a point on one straight line, and every point on that line is a solution. To draw it: find two (better three) solutions, plot, join.</p>
          <p>Quickest points: the <b>intercepts</b>. x-intercept: put y = 0 → (c/a, 0). y-intercept: put x = 0 → (0, c/b).</p>
          <p>Special lines: <b>x = k</b> is vertical (parallel to the y-axis); <b>y = k</b> is horizontal (parallel to the x-axis); y = mx passes through the origin.</p>` },
        { h: 'Slope', html: `<p>Slope = ${F('rise', 'run')} = ${F('y₂ − y₁', 'x₂ − x₁')} — the same for any two points on the line.</p>
          <p>Positive slope rises to the right, negative falls, zero is horizontal, a vertical line has no slope (run = 0).</p>
          <p><b>Slope–intercept form</b>: y = mx + c, where m is the slope and (0, c) the y-intercept. From ax + by = c: y = −${F('a', 'b')}x + ${F('c', 'b')}.</p>` },
        { h: 'Two lines', html: `<p>Two lines in a plane either <b>meet at one point</b> (one common solution), are <b>parallel</b> (same slope, different intercept — no common solution), or are <b>the same line</b> (infinitely many).</p>
          <p>To find the meeting point algebraically, solve one equation for y and substitute into the other.</p>` },
        { h: 'Connections', html: `<p>Ch 2's linear polynomial y = ax + b is the special case where y is given directly. A whole-number word problem (pens and notebooks) picks out only the solutions that make sense.</p>` }
      ],
      formulas: [['Standard form', 'ax + by = c'], ['Slope', 'm = (y₂ − y₁)/(x₂ − x₁)'], ['Slope–intercept', 'y = mx + c'], ['From standard form', 'm = −a/b, y-intercept = c/b'], ['x-intercept', '(c/a, 0)'], ['Parallel lines', 'equal slopes']],
      terms: [['Solution', 'ordered pair satisfying the equation'], ['Intercept', 'where a line crosses an axis'], ['Slope', 'rise per unit run'], ['Coincident lines', 'two equations for the same line']],
      traps: ['Saying the equation has one solution — it has infinitely many.', 'Swapping rise and run.', 'Writing x = 3 as a point. It is the vertical line through (3, 0).', 'Sign error in m = −a/b.'],
      bridge: '<p>Built on Ch 2 (linear polynomials) and Ch 1 (coordinates). Ch 10 mixture problems lead to linear equations.</p>'
    },

    explore: [
      {
        title: 'ax + by = c: solutions make a line', intro: 'Set a, b, c. Step to plot solutions for x = −4 … 4; they always line up.',
        build(el, K) {
          let a = 2, bb = 3, c = 6; const row = K.row(el);
          const b = new K.Board(el, { xmin: -8, xmax: 8, ymin: -7, ymax: 7 }); const rd = K.read(el);
          const an = new K.Anim(10, () => b.redraw(), { ms: 500 }); an.i = 9;
          K.slider(row, 'a', -5, 5, 1, a, v => { a = v; b.redraw(); }); K.slider(row, 'b', -5, 5, 1, bb, v => { bb = v; b.redraw(); }); K.slider(row, 'c', -12, 12, 1, c, v => { c = v; b.redraw(); });
          b.onDraw = () => {
            b.base(); if (a === 0 && bb === 0) { rd.innerHTML = 'a and b cannot both be 0.'; return; }
            if (an.i >= 9) b.infLine(a, bb, c, { color: C.blue });
            if (bb !== 0) for (let k = 0; k < Math.min(an.i, 9); k++) { const x = k - 4; b.dot(x, (c - a * x) / bb, { color: C.orange, r: 5 }); }
            if (a !== 0) b.dot(c / a, 0, { color: C.purple, label: P(c / a, 0) }); if (bb !== 0) b.dot(0, c / bb, { color: C.purple, label: P(0, c / bb) });
            const xs = [-2, -1, 0, 1, 2];
            rd.innerHTML = `<b>${eqH(a, bb, c)}</b>` + (bb !== 0 ? ` &nbsp;⇔&nbsp; y = ${terms([[-a / bb, 'x'], [c / bb, '']])} (slope ${num(-a / bb)})<br><table class="t" style="width:auto;display:inline-table"><tr><th>x</th>${xs.map(x => `<td>${x}</td>`).join('')}</tr><tr><th>y</th>${xs.map(x => `<td>${num((c - a * x) / bb)}</td>`).join('')}</tr></table>` : ` — vertical line x = ${num(c / a)}`);
          };
          K.anim(el, an); b.redraw(); return an;
        }
      },
      {
        title: 'Slope = rise ÷ run', intro: 'Drag P and Q. The rise/run triangle shows the slope; it is the same for any two points on the line.',
        build(el, K) {
          const b = new K.Board(el, { xmin: -8, xmax: 8, ymin: -6, ymax: 6 });
          const A = b.addPt(-4, -2, { label: 'P', snap: 1, color: C.blue }), B = b.addPt(4, 3, { label: 'Q', snap: 1 }); const rd = K.read(el);
          b.onDraw = () => {
            b.base(); const run = B.x - A.x, rise = B.y - A.y;
            if (run !== 0) { const m = rise / run; b.fn(x => A.y + m * (x - A.x), { color: C.purple, w: 2 }); }
            else b.line(A.x, -6, A.x, 6, { color: C.purple, w: 2 });
            b.line(A.x, A.y, B.x, A.y, { color: C.blue, w: 4 }); b.line(B.x, A.y, B.x, B.y, { color: C.orange, w: 4 });
            b.text((A.x + B.x) / 2, A.y - 0.5, `run = ${run}`, { font: 'bold 14px', color: C.blue }); b.text(B.x + 1.1, (A.y + B.y) / 2, `rise = ${rise}`, { font: 'bold 14px', color: C.orange });
            b.drawPts();
            if (run === 0) { rd.innerHTML = `Run = 0: vertical line x = ${A.x}. Slope is not defined.`; return; }
            const m = rise / run, cc = A.y - m * A.x;
            rd.innerHTML = `slope m = ${F(rise, run)} = <b>${Q(rise, run)}</b> ${m > 0 ? '(rises)' : m < 0 ? '(falls)' : '(horizontal)'} · y-intercept c = ${num(cc)} · equation <b>y = ${terms([[m, 'x'], [cc, '']])}</b>`;
          };
          b.redraw(); return null;
        }
      },
      {
        title: 'Two lines: meet, parallel or the same?', intro: 'Change the two equations and see how many common solutions there are.',
        build(el, K) {
          let a1 = 1, b1 = 1, c1 = 5, a2 = 1, b2 = -1, c2 = 1; const r1 = K.row(el), r2 = K.row(el);
          const b = new K.Board(el, { xmin: -8, xmax: 8, ymin: -7, ymax: 7 }); const rd = K.read(el);
          [['a₁', -4, 4, a1, v => a1 = v], ['b₁', -4, 4, b1, v => b1 = v], ['c₁', -10, 10, c1, v => c1 = v]].forEach(s => K.slider(r1, s[0], s[1], s[2], 1, s[3], v => { s[4](v); b.redraw(); }));
          [['a₂', -4, 4, a2, v => a2 = v], ['b₂', -4, 4, b2, v => b2 = v], ['c₂', -10, 10, c2, v => c2 = v]].forEach(s => K.slider(r2, s[0], s[1], s[2], 1, s[3], v => { s[4](v); b.redraw(); }));
          b.onDraw = () => {
            b.base(); b.infLine(a1, b1, c1, { color: C.blue }); b.infLine(a2, b2, c2, { color: C.orange, dash: [9, 5] });
            const D = a1 * b2 - a2 * b1; let msg;
            if ((a1 === 0 && b1 === 0) || (a2 === 0 && b2 === 0)) msg = 'Each equation needs a or b non-zero.';
            else if (D !== 0) { const x = (c1 * b2 - c2 * b1) / D, y = (a1 * c2 - a2 * c1) / D; b.dot(x, y, { color: C.purple, label: P(x, y) }); msg = `They meet at one point <b>${P(x, y)}</b> — the unique common solution.`; }
            else if (a1 * c2 === a2 * c1 && b1 * c2 === b2 * c1) msg = '<b>Same line</b> (one equation is a multiple of the other): infinitely many common solutions.';
            else msg = '<b>Parallel</b>: same slope, different intercepts — no common solution.';
            rd.innerHTML = `<span style="color:var(--blue)">${eqH(a1, b1, c1)}</span> &nbsp;and&nbsp; <span style="color:var(--orange)">${eqH(a2, b2, c2)}</span><br>${msg}`;
          };
          b.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Is it a solution?', levels: [1, 2], gen(R) {
          const a = R.nz(-6, 6), b = R.nz(-6, 6), x = R.int(-5, 5), y = R.int(-5, 5), c = a * x + b * y + (R.chance(.5) ? 0 : R.nz(-3, 3));
          const ok = a * x + b * y === c;
          return { q: `Is ${P(x, y)} a solution of ${eqH(a, b, c)}?`, a: ok ? 'Yes' : 'No', s: `LHS = ${a}×${G9.par(x)} + ${b}×${G9.par(y)} = ${a * x + b * y} ${ok ? '=' : '≠'} ${c}` };
        } },
      { title: 'Find k', gen(R) {
          const a = R.nz(-6, 6), b = R.nz(-6, 6), x = R.nz(-5, 5), y = R.int(-5, 5), c = a * x + b * y;
          return { q: `If ${P(x, y)} lies on the line ${terms([[a, 'x'], [b, 'y']])} = k, find k.`, a: `k = ${c}`, ans: c, s: `${a}×${G9.par(x)} + ${b}×${G9.par(y)}` };
        } },
      { title: 'Intercepts', gen(R, L) {
          const a = R.nz(-6, 6), b = R.nz(-6, 6), c = L === 1 ? a * b * R.nz(-2, 2) : R.nz(-15, 15);
          return { q: `Find where the line ${eqH(a, b, c)} cuts the x-axis and the y-axis.`, a: `x-axis (${Q(c, a)}, 0); y-axis (0, ${Q(c, b)})`, s: 'Put y = 0, then x = 0.' };
        } },
      { title: 'Slope through two points', gen(R) {
          const x1 = R.int(-6, 6), y1 = R.int(-6, 6); let x2 = R.int(-6, 6); if (x2 === x1) x2 = x1 + 3; const y2 = R.int(-6, 6);
          return { q: `Find the slope of the line through ${P(x1, y1)} and ${P(x2, y2)}.`, a: Q(y2 - y1, x2 - x1), ans: (y2 - y1) / (x2 - x1), s: `${F(`${y2} − ${G9.par(y1)}`, `${x2} − ${G9.par(x1)}`)}` };
        } },
      { title: 'Slope–intercept form', levels: [2, 3], gen(R) {
          const a = R.nz(-6, 6), b = R.nz(-6, 6), c = R.int(-12, 12);
          const mH = Q(-a, b), mS = mH === '1' ? '' : mH === '−1' ? '−' : mH, cS = c === 0 ? '' : (c / b < 0 ? ' − ' : ' + ') + Q(Math.abs(c), Math.abs(b));
          return { q: `Write ${eqH(a, b, c)} in the form y = mx + c. State the slope and y-intercept.`, a: `y = ${mS}x${cS}; slope ${mH}, y-intercept (0, ${Q(c, b)})`, s: `${b}y = ${num(c)} ${G9.sgn(-a)}x ⇒ divide by ${b}` };
        } },
      { title: 'Equation through two points', levels: [3], gen(R) {
          const m = R.nz(-4, 4), c = R.int(-6, 6), x1 = R.int(-4, 0), x2 = x1 + R.int(1, 4);
          return { q: `Find the equation of the line through ${P(x1, m * x1 + c)} and ${P(x2, m * x2 + c)}.`, a: `y = ${terms([[m, 'x'], [c, '']])}`, s: `m = ${F(m * (x2 - x1), x2 - x1)} = ${m}; c = ${m * x1 + c} − ${G9.par(m)}×${G9.par(x1)} = ${c}` };
        } },
      { title: 'Word problem → equation', gen(R, L) {
          const p = R.int(2, 9) * 10, n = R.int(2, 9) * 5, x = R.int(1, 6), y = R.int(1, 6), T = p * x + n * y;
          const base = `A pen costs ₹${p} and a notebook costs ₹${n}. Riya spends ₹${T} on x pens and y notebooks.`;
          if (L === 1) return { q: base + ' Write a linear equation for this situation.', a: `${p}x + ${n}y = ${T}`, s: 'cost of pens + cost of notebooks = total' };
          const sols = []; for (let xx = 0; xx * p <= T; xx++) { const rem = T - xx * p; if (rem % n === 0) sols.push(`(${xx}, ${rem / n})`); }
          return { q: base + ' Write the equation and list all possible whole-number pairs (x, y).', a: `${p}x + ${n}y = ${T}; ${sols.join(', ')}`, s: 'Try x = 0, 1, 2, … and check whether the remainder is divisible by ' + n + '.' };
        } },
      { title: 'Where do two lines meet?', levels: [2, 3], gen(R) {
          const x = R.int(-5, 5), y = R.int(-5, 5); let a1, b1, a2, b2; do { a1 = R.nz(-4, 4); b1 = R.nz(-4, 4); a2 = R.nz(-4, 4); b2 = R.nz(-4, 4); } while (a1 * b2 === a2 * b1);
          return { q: `Find the point where the lines ${eqH(a1, b1, a1 * x + b1 * y)} and ${eqH(a2, b2, a2 * x + b2 * y)} meet.`, a: P(x, y), s: 'Solve one equation for y (or x) and substitute into the other; check in both equations.' };
        } },
      { title: 'Lines parallel to the axes', levels: [1], gen(R) {
          const k = R.nz(-7, 7), v = R.pick(['x', 'y']);
          return { q: `Describe the graph of ${v} = ${k}. Give two points on it.`, a: `${v === 'x' ? 'Vertical line (parallel to the y-axis)' : 'Horizontal line (parallel to the x-axis)'}; e.g. ${v === 'x' ? `(${k}, 0), (${k}, 3)` : `(0, ${k}), (3, ${k})`}`, s: `Every point has ${v} = ${k}; the other coordinate is free.` };
        } },
      { title: 'Parallel or not?', levels: [2, 3], gen(R) {
          const a = R.nz(-5, 5), b = R.nz(-5, 5), k = R.pick([1, 2, 3, -1]), par = R.chance(.6), c1 = R.int(-9, 9), c2 = c1 * k + R.nz(-5, 5);
          const a2 = a * k, b2 = par ? b * k : b * k + 1;
          return { q: `Are the lines ${eqH(a, b, c1)} and ${eqH(a2, b2, c2)} parallel?`, a: par ? `Yes — both have slope ${Q(-a, b)}` : `No — slopes ${Q(-a, b)} and ${Q(-a2, b2)} differ, so they meet at one point`, s: 'Compare slopes m = −a/b.' };
        } }
    ],

    quiz: [
      { q: 'How many solutions does 2x + 3y = 12 have?', o: ['one', 'two', 'none', 'infinitely many'], a: 3, e: 'Every point on the line.' },
      { q: 'Which point lies on x + 2y = 7?', o: ['(1, 3)', '(3, 1)', '(2, 3)', '(7, 1)'], a: 0, e: '1 + 6 = 7.' },
      { q: 'The y-intercept of 3x + 4y = 12 is', o: ['(0, 3)', '(4, 0)', '(0, 4)', '(3, 0)'], a: 0, e: 'x = 0 ⇒ y = 3.' },
      { q: 'The slope of the line through (1, 2) and (3, 8) is', o: ['3', '1/3', '6', '2'], a: 0, e: '6/2.' },
      { q: 'y = −2x + 5 has slope', o: ['5', '−2', '2', '−5'], a: 1, e: 'Coefficient of x.' },
      { q: 'The graph of y = 4 is', o: ['vertical', 'horizontal', 'through the origin', 'a point'], a: 1, e: 'y fixed, x free.' },
      { q: 'Lines y = 3x + 1 and y = 3x − 4 are', o: ['parallel', 'the same', 'perpendicular', 'meeting at (0, 1)'], a: 0, e: 'Same slope, different intercepts.' },
      { q: 'x + y = 4 and x − y = 2 meet at', o: ['(3, 1)', '(1, 3)', '(2, 2)', '(4, 0)'], a: 0, e: 'Add: 2x = 6.' },
      { q: 'If (2, k) lies on 3x − y = 1, k =', o: ['5', '7', '−5', '1'], a: 0, e: '6 − k = 1.' },
      { q: 'Slope of 2x + 5y = 10 is', o: ['2/5', '−2/5', '5/2', '−5/2'], a: 1, e: 'm = −a/b.' },
      { q: 'A vertical line has slope', o: ['0', '1', 'undefined', '−1'], a: 2, e: 'Run = 0.' }
    ],

    teach: {
      outcomes: ['Write real situations as linear equations in two variables', 'Find and verify solutions; draw the graph', 'Compute slope and intercepts; convert to y = mx + c', 'Decide whether two lines meet, are parallel or coincide'],
      periods: [
        { t: 'Equations and solutions', flow: [['10 min', 'Pens and notebooks problem: how many ways to spend ₹280?'], ['15 min', 'Standard form; checking solutions; table of values.'], ['15 min', 'Explore panel 1: all solutions lie on a line.']] },
        { t: 'Slope and intercepts', flow: [['15 min', 'Explore panel 2: rise/run; hill-steepness example.'], ['15 min', 'y = mx + c; converting from standard form.'], ['10 min', 'Practice: Standard.']] },
        { t: 'Two lines', flow: [['15 min', 'Explore panel 3: meet / parallel / same.'], ['15 min', 'Solving by substitution; checking with the graph.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['"Only one solution".', 'x = k plotted as a single point.', 'Slope computed as run/rise.'],
      activities: ['Graph-paper relay: each student plots one solution of the same equation.', 'Measure the slope of the school ramp/staircase (rise ÷ run).', 'Cost-planning: list whole-number solutions of a shopping budget.'],
      exit: ['Write two solutions of 4x − y = 8.', 'Slope of the line through (0, 2) and (4, 10)?', 'Are 2x + y = 3 and 4x + 2y = 9 parallel?'],
      homework: 'Draw on one graph: x + y = 6, x − y = 2, and find the triangle they form with the x-axis.'
    },

    slides: [
      { t: 'Two Variables, One Line', b: ['ax + by = c', 'Solutions are ordered pairs', 'The graph is a line', 'Slope and intercepts'] },
      { t: 'From words to an equation', b: ['Pen ₹60, notebook ₹50, total ₹280', '60x + 50y = 280', 'Solutions: (3, 2), …'] },
      { t: 'Solutions and graph', b: ['Choose x, solve for y', 'Infinitely many solutions', 'All lie on one straight line', 'Intercepts: put x = 0, y = 0'] },
      { t: 'Slope', b: ['m = rise ÷ run = (y₂ − y₁)/(x₂ − x₁)', 'Same for any two points on the line', 'm > 0 rises, m < 0 falls, m = 0 horizontal'] },
      { t: 'y = mx + c', b: ['m: slope, c: y-intercept', 'From ax + by = c: m = −a/b', 'x = k vertical, y = k horizontal'] },
      { t: 'Two lines', b: ['Different slopes: meet at one point', 'Same slope, different c: parallel', 'Same line: infinitely many common solutions'] },
      { t: 'Check yourself', b: ['Is (2, −1) on 3x + 2y = 4?', 'Slope of 6x − 3y = 9?', 'Intercepts of 2x + 5y = 10?', 'Answers: yes · 2 · (5, 0), (0, 2)'] }
    ]
  });
})();
