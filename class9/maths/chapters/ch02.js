/*
TOOL:    class9_maths_ch02
FAMILY:  CBSE_REVISION / Class 9 Maths (Ganita Manjari)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class 9 Maths full build
CHANGES: 1.0.0 - Ch 2 Introduction to Linear Polynomials - revise, 3 explore panels, 8 generators, quiz, lesson plan, slides
*/
(function () {
  const { F, Q, num, terms, C, par } = G9;
  const lp = (a, b, v = 'x') => terms([[a, v], [b, '']]);

  G9.register({
    no: 2, part: 'Part I', short: 'Linear polynomials', title: 'Introduction to Linear Polynomials',
    blurb: 'Variables and constants, rules from patterns, value and zero of ax + b, straight-line graphs.',
    revise: {
      oneLine: 'A linear polynomial ax + b (a ≠ 0) describes anything that grows by the same amount a at every step, starting from b. Its graph is always a straight line.',
      sections: [
        { h: 'Variables, constants and polynomials', html: `<p>A <b>variable</b> (x, n, t…) can take many values; a <b>constant</b> (5, −2, ${F(3, 4)}…) is fixed. A <b>polynomial in x</b> is a sum of terms like 4x³, −x, 7 where the powers of x are whole numbers (0, 1, 2, …).</p>
          <p>The highest power is the <b>degree</b>. Degree 1 ⇒ <b>linear polynomial</b>: <span class="m">p(x) = ax + b</span>, a ≠ 0.</p>
          <p>Linear: 3x − 7, ${F('x', 2)} + 1, −x. Not linear: x² + 1 (degree 2), ${F(1, 'x')} (power −1), √x (power ½), 5 (degree 0 — a constant).</p>` },
        { h: 'Rules from patterns', html: `<p>Matchstick squares in a row: 1 square → 4 sticks, 2 → 7, 3 → 10 … Each new square adds 3 sticks, so <span class="m">sticks = 3n + 1</span>.</p>
          <p><b>Method:</b> find the constant difference (that is <b>a</b>), then work back to step 0 (that is <b>b</b>). If the differences are not constant, the rule is not linear.</p>` },
        { h: 'Value and zero', html: `<p><b>Value</b>: p(x) = 2x − 5 at x = 3 is p(3) = 2·3 − 5 = 1.</p>
          <p><b>Zero</b>: the x that makes p(x) = 0. For ax + b, the zero is <span class="m">x = −${F('b', 'a')}</span>. A linear polynomial has exactly one zero.</p>` },
        { h: 'Graph of y = ax + b', html: `<p>Plotting (x, ax + b) for several x always gives points on one straight line.</p>
          <ul><li><b>a</b> = change in y for each step of 1 in x (the <b>slope</b> / rate). a &gt; 0 rises, a &lt; 0 falls; larger |a| is steeper.</li>
          <li><b>b</b> = where the line cuts the y-axis (value when x = 0).</li>
          <li>The line cuts the x-axis at the zero, (−b/a, 0).</li></ul>` },
        { h: 'Real-life linear rules', html: `<p>Taxi fare = ₹40 + ₹15 per km → F(d) = 15d + 40. Water in a tank filled at 8 L/min that starts with 20 L → W(t) = 8t + 20. Comparing two such rules = comparing two lines; where they meet, both give the same value.</p>` }
      ],
      formulas: [['Linear polynomial', 'p(x) = ax + b, a ≠ 0'], ['Zero', `x = −${F('b', 'a')}`], ['Rate (slope)', `a = ${F('change in y', 'change in x')}`], ['y-intercept', '(0, b)'], ['x-intercept', `(−${F('b', 'a')}, 0)`]],
      terms: [['Coefficient', 'the number multiplying the variable (a in ax + b)'], ['Constant term', 'the term without a variable (b)'], ['Degree', 'highest power of the variable'], ['Zero of p(x)', 'value of x for which p(x) = 0']],
      traps: ['Thinking 5 (a constant) is linear. Its degree is 0.', 'Zero of 3x + 6 is −2, not 2 or −6. Solve 3x + 6 = 0.', 'In a pattern rule, using the first term as b. b is the value at step 0, one step <b>before</b> the first.', 'Mixing up which axis b is read from: b is on the <b>y</b>-axis.'],
      bridge: '<p>Ch 13 extends this to linear equations in two variables (ax + by = c). Ch 8 shows that arithmetic progressions are linear rules on whole numbers.</p>'
    },

    explore: [
      {
        title: 'Matchstick pattern → rule', intro: 'Each step adds one square. Watch the stick count grow by the same amount every time and build the rule.',
        build(el, K) {
          const b = new K.Board(el, { xmin: 0, xmax: 22, ymin: -1, ymax: 8, axes: false, grid: 0, aspect: 0.38 });
          const rd = K.read(el);
          const an = new K.Anim(8, () => b.redraw(), { ms: 900 });
          b.onDraw = () => {
            b.base(); const n = an.i + 1, s = 2.2, x0 = 1, y0 = 3;
            for (let k = 0; k < n; k++) {
              const x = x0 + k * s, col = k === n - 1 && n > 1 ? C.orange : C.blue;
              if (k === 0) b.line(x, y0, x, y0 + s, { color: C.blue, w: 5 });
              b.line(x, y0, x + s, y0, { color: col, w: 5 }); b.line(x, y0 + s, x + s, y0 + s, { color: col, w: 5 }); b.line(x + s, y0, x + s, y0 + s, { color: col, w: 5 });
            }
            b.text(11, 1, `n = ${n} square${n > 1 ? 's' : ''}  →  ${3 * n + 1} sticks`, { font: 'bold 20px' });
            let rows = ''; for (let k = 1; k <= n; k++) rows += `<td>${3 * k + 1}</td>`;
            rd.innerHTML = `<table class="t" style="width:auto"><tr><th>n</th>${Array.from({ length: n }, (_, k) => `<td>${k + 1}</td>`).join('')}</tr><tr><th>sticks</th>${rows}</tr></table>` +
              (n >= 3 ? `Differences are all <b>3</b> ⇒ rule is <b>3n + b</b>. At n = 1: 3 + b = 4 ⇒ b = 1. So <b>sticks = 3n + 1</b>. Check n = ${n}: 3·${n} + 1 = ${3 * n + 1} ✔` : 'Keep stepping to find the pattern…');
          };
          K.anim(el, an); b.redraw(); return an;
        }
      },
      {
        title: 'Graph of y = ax + b', intro: 'Move the sliders. Step to plot x = −4 … 4 one point at a time; the points always line up.',
        build(el, K) {
          let a = 2, c = -3;
          const row = K.row(el);
          const b = new K.Board(el, { xmin: -8, xmax: 8, ymin: -8, ymax: 8 });
          const rd = K.read(el);
          const an = new K.Anim(10, () => b.redraw(), { ms: 600 }); an.i = 9;
          K.slider(row, 'a (slope)', -4, 4, 0.5, a, v => { a = v; b.redraw(); });
          K.slider(row, 'b (intercept)', -6, 6, 1, c, v => { c = v; b.redraw(); });
          b.onDraw = () => {
            b.base(); const n = an.i;
            if (n >= 9 && a !== 0) b.fn(x => a * x + c, { color: C.blue, w: 3 });
            if (a === 0) b.fn(() => c, { color: C.grey, w: 2, dash: [6, 4] });
            for (let k = 0; k < Math.min(n, 9); k++) { const x = k - 4; b.dot(x, a * x + c, { color: C.orange, r: 5 }); }
            b.dot(0, c, { color: C.purple, label: `(0, ${num(c)})` });
            if (a !== 0) b.dot(-c / a, 0, { color: C.purple, label: `(${num(-c / a)}, 0)` });
            const tx = [-2, -1, 0, 1, 2];
            rd.innerHTML = `y = <b>${lp(a, c)}</b> ${a === 0 ? '(a = 0: constant, not linear)' : ''}<br>` +
              `<table class="t" style="width:auto;display:inline-table"><tr><th>x</th>${tx.map(x => `<td>${x}</td>`).join('')}</tr><tr><th>y</th>${tx.map(x => `<td>${num(a * x + c)}</td>`).join('')}</tr></table>` +
              (a !== 0 ? `&nbsp; each step in x changes y by <b>${num(a)}</b> · zero at x = ${num(-c / a)}` : '');
          };
          K.anim(el, an); b.redraw(); return an;
        }
      },
      {
        title: 'Which plan is cheaper?', intro: 'Two mobile plans: fixed charge + charge per GB. Change the numbers and find where the lines meet.',
        build(el, K) {
          let f1 = 100, r1 = 20, f2 = 40, r2 = 35;
          const row = K.row(el), row2 = K.row(el);
          const b = new K.Board(el, { xmin: -1, xmax: 12, ymin: -30, ymax: 420, equal: false, grid: 0, labelStep: 1 });
          const rd = K.read(el);
          K.slider(row, 'Plan A fixed ₹', 0, 200, 10, f1, v => { f1 = v; b.redraw(); });
          K.slider(row, 'A ₹/GB', 5, 50, 5, r1, v => { r1 = v; b.redraw(); });
          K.slider(row2, 'Plan B fixed ₹', 0, 200, 10, f2, v => { f2 = v; b.redraw(); });
          K.slider(row2, 'B ₹/GB', 5, 50, 5, r2, v => { r2 = v; b.redraw(); });
          b.onDraw = () => {
            b.clear(); const c = b.ctx;
            for (let y = 0; y <= 400; y += 50) { b.line(0, y, 12, y, { color: C.grid, w: 1 }); b.text(-0.5, y, String(y), { font: '11px' }); }
            for (let x = 0; x <= 12; x++) { b.line(x, 0, x, 400, { color: C.grid, w: 1 }); b.text(x, -15, String(x), { font: '11px' }); }
            b.line(0, 0, 12, 0, { color: C.axis, w: 2 }); b.line(0, 0, 0, 400, { color: C.axis, w: 2 });
            b.fn(x => x < 0 ? NaN : f1 + r1 * x, { color: C.blue, w: 4 }); b.fn(x => x < 0 ? NaN : f2 + r2 * x, { color: C.orange, w: 4 });
            b.text(11.2, Math.min(390, f1 + r1 * 11), 'A', { color: C.blue, font: 'bold 18px' }); b.text(11.6, Math.min(390, f2 + r2 * 11), 'B', { color: C.orange, font: 'bold 18px' });
            let msg = `A(g) = ${r1}g + ${f1} &nbsp; · &nbsp; B(g) = ${r2}g + ${f2}<br>`;
            if (r1 === r2) msg += f1 === f2 ? 'Same plan!' : 'Same rate: the lines are parallel and never meet; the one with the lower fixed charge is always cheaper.';
            else { const g = (f2 - f1) / (r1 - r2); if (g >= 0 && g <= 12) { b.dot(g, f1 + r1 * g, { color: C.purple, label: `${num(g)} GB, ₹${num(f1 + r1 * g)}` }); }
              msg += g < 0 ? `They would meet at g = ${num(g)} (not possible), so one plan is cheaper for every g ≥ 0.` : `Equal at <b>${num(g)} GB</b>: ${r1}g + ${f1} = ${r2}g + ${f2} ⇒ g = ${num(g)}. Below that, plan ${f1 < f2 ? 'A' : 'B'} is cheaper; above it, plan ${r1 < r2 ? 'A' : 'B'} is cheaper.`; }
            rd.innerHTML = msg; void c;
          };
          b.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Value of a linear polynomial', levels: [1, 2], gen(R, L) {
          const a = R.nz(-9, 9), b = R.int(-12, 12), x = L === 1 ? R.int(-5, 5) : R.pick([R.int(-9, 9), 0.5 * R.nz(-9, 9)]);
          return { q: `If p(x) = ${lp(a, b)}, find p(${num(x)}).`, a: num(a * x + b), ans: a * x + b, s: `p(${num(x)}) = ${num(a)} × ${par(x)} ${G9.sgn(b)} = ${num(a * x + b)}` };
        } },
      { title: 'Zero of a linear polynomial', gen(R, L) {
          const a = R.nz(-9, 9), b = L === 1 ? a * R.int(-6, 6) : R.int(-15, 15);
          return { q: `Find the zero of p(x) = ${lp(a, b)}.`, a: `x = ${Q(-b, a)}`, ans: -b / a, s: `${lp(a, b)} = 0 ⇒ ${num(a)}x = ${num(-b)} ⇒ x = ${Q(-b, a)}` };
        } },
      { title: 'Find the rule from a table', gen(R, L) {
          const a = L === 1 ? R.int(2, 6) : R.nz(-7, 9), b = R.int(-10, 10), st = L === 3 ? R.int(2, 4) : 1;
          const ns = [0, 1, 2, 3].map(k => 1 + k * st);
          return { q: `Find the linear rule y = an + b for this table:<br><table class="t" style="width:auto"><tr><th>n</th>${ns.map(n => `<td>${n}</td>`).join('')}</tr><tr><th>y</th>${ns.map(n => `<td>${a * n + b}</td>`).join('')}</tr></table>`,
            a: `y = ${lp(a, b, 'n')}`, s: `y changes by ${a * st} when n changes by ${st}, so a = ${num(a)}. Then b = ${a + b} − ${num(a)} × 1 = ${num(b)}.` };
        } },
      { title: 'Linear or not?', levels: [1], gen(R) {
          const pool = [['3x − 7', 1], ['x² + 2x', 0], ['5', 0], ['−x/4 + 1', 1], ['1/x + 3', 0], ['√x − 2', 0], ['7 − 2y', 1], ['x(x − 1)', 0], ['0.5t + 9', 1], ['2x³', 0]];
          const pick = R.shuffle(pool).slice(0, 4);
          return { q: `Which of these are linear polynomials? &nbsp; ${pick.map((p, i) => `(${'abcd'[i]}) ${p[0]}`).join(' &nbsp; ')}`, a: pick.map((p, i) => p[1] ? '(' + 'abcd'[i] + ')' : '').filter(Boolean).join(', ') || 'none',
            s: 'Linear = highest power of the variable is exactly 1 (and only whole-number powers).' };
        } },
      { title: 'Real-life rule', gen(R, L) {
          const t = R.pick([
            () => { const f = R.int(3, 8) * 10, r = R.int(10, 20), d = R.int(3, 18); return { q: `A taxi charges ₹${f} to start and ₹${r} per km. Write the fare F for d km and find the fare for ${d} km.`, a: `F = ${r}d + ${f}; fare = ₹${r * d + f}`, ans: r * d + f, s: `F(${d}) = ${r} × ${d} + ${f}` }; },
            () => { const w0 = R.int(2, 9) * 10, r = R.int(4, 12), t = R.int(4, 15); return { q: `A tank has ${w0} L of water and is filled at ${r} L per minute. Write the volume V after t minutes. How much water after ${t} min?`, a: `V = ${r}t + ${w0}; ${r * t + w0} L`, ans: r * t + w0, s: `V(${t}) = ${r} × ${t} + ${w0}` }; },
            () => { const c = R.int(30, 60) * 10, r = R.int(2, 6) * 10, k = R.int(3, Math.floor(c / r) - 1); return { q: `A candle ${c} mm long burns ${r} mm per hour. Write its length L after h hours. What is the length after ${k} h?`, a: `L = ${c} − ${r}h; ${c - r * k} mm`, ans: c - r * k, s: `L(${k}) = ${c} − ${r} × ${k}` }; }
          ]);
          return t(); void L;
        } },
      { title: 'Slope and intercept', levels: [2, 3], gen(R) {
          const a = R.nz(-6, 6), b = R.int(-9, 9);
          return { q: `For the graph of y = ${lp(a, b)}: (i) by how much does y change when x increases by 1? (ii) where does it cut the y-axis? (iii) where does it cut the x-axis?`,
            a: `(i) ${num(a)} (${a > 0 ? 'rises' : 'falls'}) (ii) (0, ${num(b)}) (iii) (${Q(-b, a)}, 0)`, s: 'Slope = coefficient of x; y-intercept = constant; x-intercept = zero.' };
        } },
      { title: 'Find a and b from two values', levels: [3], gen(R) {
          const a = R.nz(-6, 6), b = R.int(-10, 10); const [x1, x2] = R.distinct(2, -4, 5);
          return { q: `p(x) = ax + b with p(${x1}) = ${a * x1 + b} and p(${x2}) = ${a * x2 + b}. Find a and b.`, a: `a = ${a}, b = ${b}`,
            s: `a = ${F(`${a * x2 + b} − ${par(a * x1 + b)}`, `${x2} − ${par(x1)}`)} = ${a}; then b = ${a * x1 + b} − ${par(a)} × ${par(x1)} = ${b}` };
        } },
      { title: 'Break-even of two plans', levels: [2, 3], gen(R) {
          let r1, r2, f1, f2; do { r1 = R.int(2, 8) * 5; r2 = R.int(2, 8) * 5; f1 = R.int(2, 20) * 10; f2 = R.int(2, 20) * 10; } while (r1 === r2 || (f2 - f1) * (r1 - r2) <= 0);
          const g = (f2 - f1) / (r1 - r2);
          return { q: `Gym A charges ₹${f1} joining fee + ₹${r1} per visit; Gym B charges ₹${f2} + ₹${r2} per visit. After how many visits do they cost the same?`, a: `${Q(f2 - f1, r1 - r2)} visits${Number.isInteger(g) ? '' : ' (not a whole number, so they never cost exactly the same; cheaper plan switches between ' + Math.floor(g) + ' and ' + Math.ceil(g) + ' visits)'}`, ans: g,
            s: `${r1}v + ${f1} = ${r2}v + ${f2} ⇒ ${r1 - r2}v = ${f2 - f1}` };
        } }
    ],

    quiz: [
      { q: 'Which is a linear polynomial?', o: ['x² − 1', '4 − 3x', '1/x', '7'], a: 1, e: 'Highest power of x is 1.' },
      { q: 'The zero of 2x + 8 is', o: ['4', '−4', '8', '−8'], a: 1, e: '2x + 8 = 0 ⇒ x = −4.' },
      { q: 'If p(x) = 5x − 3, then p(−1) =', o: ['−8', '2', '8', '−2'], a: 0, e: '5(−1) − 3 = −8.' },
      { q: 'Pattern: 5, 9, 13, 17, … for n = 1, 2, 3, 4. Rule?', o: ['4n + 1', '5n', 'n + 4', '4n − 1'], a: 0, e: 'Difference 4; at n = 1, 4 + b = 5 ⇒ b = 1.' },
      { q: 'The graph of y = −2x + 6 cuts the y-axis at', o: ['(0, 6)', '(6, 0)', '(3, 0)', '(0, −2)'], a: 0, e: 'Put x = 0: y = 6.' },
      { q: 'The graph of y = −2x + 6 cuts the x-axis at', o: ['(3, 0)', '(−3, 0)', '(6, 0)', '(0, 3)'], a: 0, e: 'Zero: −2x + 6 = 0 ⇒ x = 3.' },
      { q: 'Which line is steepest?', o: ['y = x + 9', 'y = 3x − 1', 'y = −5x + 2', 'y = 0.5x'], a: 2, e: 'Largest |a| = 5.' },
      { q: 'Degree of the polynomial 7 is', o: ['0', '1', '7', 'not defined'], a: 0, e: '7 = 7x⁰.' },
      { q: 'A rule increases by 6 every step and is 2 at step 0. Its rule is', o: ['2n + 6', '6n + 2', '6n − 2', '8n'], a: 1, e: 'a = 6 (rate), b = 2 (start).' },
      { q: 'How many zeros does a linear polynomial have?', o: ['none', 'exactly one', 'two', 'infinitely many'], a: 1, e: 'ax + b = 0 has the single solution −b/a.' },
      { q: 'Fare F = 12d + 30. What does 30 represent?', o: ['cost per km', 'fixed starting charge', 'distance', 'total fare'], a: 1, e: 'The constant term is the value when d = 0.' }
    ],

    teach: {
      outcomes: ['Distinguish variables and constants; identify linear polynomials', 'Find a linear rule from a pattern or table', 'Evaluate a linear polynomial and find its zero', 'Interpret a and b in y = ax + b on a graph and in real situations'],
      periods: [
        { t: 'Patterns to rules', flow: [['5 min', 'Matchsticks on the desk: build 1, 2, 3 squares; count.'], ['15 min', 'Explore panel 1: step through; table of differences; derive 3n + 1.'], ['15 min', 'Pairs invent their own pattern (triangles, houses) and swap rules.'], ['5 min', 'Exit ticket Q1.']] },
        { t: 'Linear polynomials, value and zero', flow: [['10 min', 'Definitions: variable, constant, degree; sort cards "linear / not linear".'], ['15 min', 'Value p(k) and zero −b/a; connect zero to "when does the tank empty?"'], ['15 min', 'Practice tab — Standard; discuss errors.']] },
        { t: 'Graphs and real-life comparison', flow: [['15 min', 'Explore panel 2: role of a and b; predict before moving sliders.'], ['15 min', 'Explore panel 3: mobile plans; break-even point.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['"The first term is b" — b is the value one step before the first term (n = 0).', 'Sign errors in the zero: −b/a, not b/a.', 'Believing a horizontal line y = 5 is linear in x; it is constant (a = 0).'],
      activities: ['Matchstick / toothpick patterns built physically.', 'Walk-the-graph: students walk on a floor grid following y = 2x + 1.', 'Compare two auto-rickshaw tariffs from a local rate card.'],
      exit: ['Write a linear polynomial whose zero is 5.', 'Find p(−2) for p(x) = 4x + 9.', 'A pattern goes 7, 12, 17, 22 … Write its rule.'],
      homework: 'Collect a real tariff (electricity slab, phone plan, auto fare) and write its linear rule.'
    },

    slides: [
      { t: 'Introduction to Linear Polynomials', b: ['Variables and constants', 'Rules from patterns', 'Value and zero of ax + b', 'Straight-line graphs'] },
      { t: 'Polynomials and degree', b: ['Terms with whole-number powers: 4x³ − x + 7', 'Degree = highest power', 'Degree 1 ⇒ linear: ax + b, a ≠ 0', 'Not linear: x², 1/x, √x, a constant'] },
      { t: 'Rules from patterns', b: ['Squares of matchsticks: 4, 7, 10, 13, …', 'Constant difference 3 ⇒ rate a = 3', 'Step 0 value b = 1', 'Rule: sticks = 3n + 1'] },
      { t: 'Value and zero', b: ['p(x) = 2x − 5 ⇒ p(3) = 1', 'Zero: p(x) = 0', 'ax + b = 0 ⇒ x = −b/a', 'Exactly one zero'] },
      { t: 'The graph of y = ax + b', b: ['Always a straight line', 'a: change in y per unit x (slope)', 'b: y-intercept (0, b)', 'x-intercept (−b/a, 0)'] },
      { t: 'Real life', b: ['Fare F = 15d + 40: rate ₹15/km, fixed ₹40', 'Water W = 8t + 20', 'Two plans: lines meet at break-even'] },
      { t: 'Check yourself', b: ['Zero of 3x − 12?', 'Rule for 2, 7, 12, 17 (n = 1, 2, 3, 4)?', 'Slope of y = −x + 4?', 'Answers: 4 · 5n − 3 · −1'] }
    ]
  });
})();
