/*
TOOL:    class11_maths_ch05
FAMILY:  CBSE_REVISION / Class 11 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 5 Linear Inequalities - revise, exam focus, 2 explore panels (number-line solver, half-plane shader), 6 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { Q, C, num, terms } = G9;

  G9.register({
    no: 5, part: 'Unit II · Algebra (25 marks)', short: 'Linear inequalities', title: 'Linear Inequalities',
    blurb: 'Rules for inequalities, solving in one variable, number-line representation, half-planes in two variables.',
    revise: {
      oneLine: 'Solve an inequality like an equation, with one extra rule: multiplying or dividing by a negative number reverses the sign. The answer is an interval on the number line (or a half-plane in two variables).',
      sections: [
        { h: 'Rules', html: `<ul><li>Add or subtract the same number on both sides: sign unchanged.</li><li>Multiply or divide by a <b>positive</b> number: sign unchanged.</li><li>Multiply or divide by a <b>negative</b> number: <b>reverse</b> the sign.</li></ul>
          <p>Strict (&lt;, &gt;) vs slack (≤, ≥). Solution set depends on the domain: x ∈ N, Z or R.</p>` },
        { h: 'One variable', html: `<p>3x − 5 &lt; x + 7 ⇒ 2x &lt; 12 ⇒ x &lt; 6. On the number line: open circle at 6, arrow to the left. Solution set (−∞, 6).</p>
          <p>Double inequality −3 ≤ 4 − 7x/2 ≤ 18: subtract 4, multiply by −2/7 and reverse both signs ⇒ −4 ≤ x ≤ 2.</p>` },
        { h: 'Two variables', html: `<p>ax + by &lt; c is a <b>half-plane</b>. Draw the line ax + by = c (dashed for &lt;, &gt;; solid for ≤, ≥), test a point such as (0, 0), shade the side that satisfies it.</p>` },
        { h: 'Word problems', html: `<p>"At least" → ≥; "at most" / "not more than" → ≤. Example: marks 70 and 75; to average at least 60 in three tests, the third score x satisfies (70 + 75 + x)/3 ≥ 60 ⇒ x ≥ 35.</p>` }
      ],
      formulas: [['Negative multiplier', 'reverse the sign'], ['x < a', '(−∞, a)'], ['x ≥ a', '[a, ∞)'], ['a ≤ x < b', '[a, b)'], ['Half-plane test', 'substitute (0, 0)']],
      terms: [['Strict inequality', '< or >'], ['Slack inequality', '≤ or ≥'], ['Solution set', 'all values satisfying the inequality'], ['Half-plane', 'one side of a line']],
      traps: ['Forgetting to reverse the sign when dividing by a negative.', 'Filled vs open circles on the number line.', 'Domain: x ∈ N gives only natural-number solutions.', 'Dashed vs solid boundary line.'],
      board: '<p><b>Unit II (Algebra) — 25 marks.</b> Expect 1–3 mark questions solving inequalities (including fractions and double inequalities) and representing them on the number line, and a short word problem.</p>',
      bridge: '<p>Class 12 Linear Programming uses systems of these half-planes to find feasible regions.</p>'
    },

    explore: [
      {
        title: 'Solve ax + b ? cx + d on the number line', intro: 'Change the coefficients and the sign. Watch the sign flip when you divide by a negative.',
        build(el, K) {
          let a = 3, b = -5, c = 1, d = 7, s = 0; const ops = ['<', '≤', '>', '≥']; const row = K.row(el);
          K.select(row, 'sign', ops, i => { s = i; draw(); });
          [['a', v => a = v, a], ['b', v => b = v, b], ['c', v => c = v, c], ['d', v => d = v, d]].forEach(x => K.slider(row, x[0], -9, 9, 1, x[2], v => { x[1](v); draw(); }));
          const bd = new K.Board(el, { xmin: -12, xmax: 12, ymin: -1, ymax: 1, axes: false, grid: 0, equal: false, aspect: 0.15 }); const rd = K.read(el);
          function draw() {
            const k = a - c, m = d - b; let op = ops[s]; let steps = `${terms([[a, 'x'], [b, '']])} ${op} ${terms([[c, 'x'], [d, '']])} ⇒ ${terms([[k, 'x']])} ${op} ${m}`;
            bd.clear(); bd.line(-11.5, 0, 11.5, 0, { color: C.axis, w: 2 }); for (let t = -10; t <= 10; t += 2) { bd.line(t, -0.15, t, 0.15, { color: C.axis, w: 1.5 }); bd.text(t, -0.55, String(t), { font: '11px' }); }
            if (k === 0) { const ok = { '<': 0 < m, '≤': 0 <= m, '>': 0 > m, '≥': 0 >= m }[op]; rd.innerHTML = steps + ` ⇒ ${ok ? '<b>true for every x</b> (all real numbers)' : '<b>no solution</b>'}`; if (ok) bd.line(-11.5, 0, 11.5, 0, { color: C.orange, w: 6 }); return; }
            if (k < 0) { op = { '<': '>', '≤': '≥', '>': '<', '≥': '≤' }[op]; steps += ` ⇒ divide by ${k} (negative): <b>reverse</b> the sign`; }
            const v = m / k; steps += ` ⇒ <b>x ${op} ${num(v, 3)}</b>`; const right = op === '>' || op === '≥', closed = op === '≤' || op === '≥';
            const vv = Math.max(-11, Math.min(11, v)); bd.line(vv, 0, right ? 11.5 : -11.5, 0, { color: C.orange, w: 6 });
            const cc = bd.ctx; cc.save(); cc.beginPath(); cc.arc(bd.X(vv), bd.Y(0), 7, 0, 2 * Math.PI); cc.fillStyle = closed ? C.orange : '#fff'; cc.fill(); cc.lineWidth = 3; cc.strokeStyle = C.orange; cc.stroke(); cc.restore();
            rd.innerHTML = steps + ` · solution set ${right ? (closed ? '[' : '(') + num(v, 3) + ', ∞)' : '(−∞, ' + num(v, 3) + (closed ? ']' : ')')}`;
          }
          draw(); return null;
        }
      },
      {
        title: 'Half-plane of ax + by ? c', intro: 'Choose the inequality; the solution half-plane is shaded. Test (0, 0) to decide the side.',
        build(el, K) {
          let a = 2, b_ = 3, c = 6, s = 0; const ops = ['<', '≤', '>', '≥']; const row = K.row(el);
          K.select(row, 'sign', ops, i => { s = i; bd.redraw(); });
          [['a', v => a = v, a], ['b', v => b_ = v, b_], ['c', v => c = v, c]].forEach(x => K.slider(row, x[0], -6, 6, 1, x[2], v => { x[1](v); bd.redraw(); }));
          const bd = new K.Board(el, { xmin: -8, xmax: 8, ymin: -6, ymax: 6 }); const rd = K.read(el);
          bd.onDraw = () => {
            bd.base(); const f = (x, y) => { const v = a * x + b_ * y; return { '<': v < c, '≤': v <= c, '>': v > c, '≥': v >= c }[ops[s]]; };
            const cx2 = bd.ctx; cx2.fillStyle = 'rgba(234,88,12,.18)'; for (let px = 0; px < bd.W; px += 6) for (let py = 0; py < bd.H; py += 6) if (f(bd.ix(px), bd.iy(py))) cx2.fillRect(px, py, 6, 6);
            if (a || b_) bd.infLine(a, b_, c, { color: C.blue, w: 3, dash: s % 2 === 0 ? [8, 6] : null });
            rd.innerHTML = `${terms([[a, 'x'], [b_, 'y']])} ${ops[s]} ${c} · test (0, 0): 0 ${ops[s]} ${c} is <b>${f(0, 0) ? 'true' : 'false'}</b> ⇒ shade the side ${f(0, 0) ? 'containing' : 'away from'} the origin · boundary ${s % 2 === 0 ? 'dashed (not included)' : 'solid (included)'}`;
          };
          bd.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Solve in one variable', gen(R, L) {
          let a, b, c, d; do { a = R.nz(-8, 8); b = R.int(-12, 12); c = R.int(-8, 8); d = R.int(-12, 12); } while (a === c);
          const ops = ['<', '≤', '>', '≥']; let op = R.pick(ops); const k = a - c, m = d - b; let fop = op; if (k < 0) fop = { '<': '>', '≤': '≥', '>': '<', '≥': '≤' }[op];
          return { q: `Solve for real x: ${terms([[a, 'x'], [b, '']])} ${op} ${terms([[c, 'x'], [d, '']])}. Show the solution on the number line.`, a: `x ${fop} ${Q(m, k)}`, s: `${terms([[k, 'x']])} ${op} ${m}${k < 0 ? ' — dividing by a negative reverses the sign' : ''}` };
        } },
      { title: 'With fractions', levels: [2, 3], gen(R) {
          const p = R.int(2, 5), q = R.int(2, 5), a = R.int(1, 6), b = R.int(1, 6); // x/p + a ≥ x/q + b  ⇒ x(1/p − 1/q) ≥ b − a
          if (p === q) return this.gen(R); const coef = (q - p), rhs = (b - a) * p * q; const op = coef > 0 ? '≥' : '≤';
          return { q: `Solve: x/${p} + ${a} ≥ x/${q} + ${b}.`, a: `x ${op} ${Q(rhs, coef)}`, s: `multiply by ${p * q}: ${q}x + ${a * p * q} ≥ ${p}x + ${b * p * q} ⇒ ${coef}x ≥ ${rhs}` };
        } },
      { title: 'Double inequality', levels: [2, 3], gen(R) {
          const k = R.pick([2, 3, 4, 5, -2, -3]), m = R.int(-5, 5), lo = R.int(-6, 0), hi = lo + R.int(2, 8);
          const L = k > 0 ? k * lo + m : k * hi + m, H = k > 0 ? k * hi + m : k * lo + m;
          return { q: `Solve: ${L} ≤ ${terms([[k, 'x'], [m, '']])} ≤ ${H}.`, a: `${lo} ≤ x ≤ ${hi}`, s: `subtract ${m}, divide by ${k}${k < 0 ? ' (reverse both signs)' : ''}` };
        } },
      { title: 'Solutions in N or Z', levels: [1, 2], gen(R) {
          const a = R.int(2, 6), b = R.int(5, 30), dom = R.pick(['natural numbers', 'integers']);
          const top = Math.ceil(b / a) - 1; const sols = dom === 'natural numbers' ? Array.from({ length: Math.max(0, top) }, (_, i) => i + 1).join(', ') : `…, ${top - 2}, ${top - 1}, ${top}`;
          return { q: `Solve ${a}x < ${b} when x is restricted to ${dom}.`, a: `x < ${Q(b, a)}; solutions {${sols || '∅'}}`, s: 'Solve over R, then keep allowed values.' };
        } },
      { title: 'Word problem', gen(R) {
          const t = R.int(0, 1);
          if (t === 0) { const m1 = R.int(55, 85), m2 = R.int(55, 85), avg = R.pick([60, 65, 70, 75]); const need = 3 * avg - m1 - m2;
            return { q: `A student scored ${m1} and ${m2} in two tests. What minimum mark in the third test gives an average of at least ${avg}?`, a: `x ≥ ${need}${need > 100 ? ' (not possible out of 100)' : ''}`, ans: need, s: `(${m1} + ${m2} + x)/3 ≥ ${avg}` }; }
          const lo = R.int(20, 30), hi = lo + R.int(5, 10);
          return { q: `The temperature in a lab must stay between ${lo}°C and ${hi}°C. Find the range in °F (F = 9C/5 + 32).`, a: `${num(9 * lo / 5 + 32)} < F < ${num(9 * hi / 5 + 32)}`, s: 'substitute C = 5(F − 32)/9' };
        } },
      { title: 'Region of a linear inequality', levels: [1, 2], gen(R) {
          const a = R.int(1, 5), b = R.int(1, 5), c = R.int(2, 12), op = R.pick(['<', '≤', '>', '≥']); const t = { '<': 0 < c, '≤': 0 <= c, '>': 0 > c, '≥': 0 >= c }[op];
          return { q: `Describe the region ${a}x + ${b}y ${op} ${c}: is the boundary dashed or solid, and is the origin in the region?`, a: `boundary ${a}x + ${b}y = ${c} ${op === '<' || op === '>' ? 'dashed' : 'solid'}; origin ${t ? 'in' : 'not in'} the region`, s: 'Test (0, 0).' };
        } }
    ],

    quiz: [
      { q: 'If −3x > 12, then', o: ['x > −4', 'x < −4', 'x > 4', 'x < 4'], a: 1, e: 'Divide by −3, reverse.' },
      { q: 'Interval form of x ≥ 2', o: ['(2, ∞)', '[2, ∞)', '(−∞, 2]', '[2, ∞]'], a: 1, e: 'Closed at 2.' },
      { q: 'Solution of 5x − 3 < 3x + 1', o: ['x < 2', 'x > 2', 'x < −2', 'x > −2'], a: 0, e: '2x < 4.' },
      { q: 'x ∈ N, 4x + 3 < 19. Solution set', o: ['{1, 2, 3}', '{1, 2, 3, 4}', '{0, 1, 2, 3}', 'x < 4'], a: 0, e: 'x < 4, natural.' },
      { q: 'Graph of x + y ≤ 5 has a boundary that is', o: ['dashed', 'solid', 'vertical', 'none'], a: 1, e: '≤ includes the line.' },
      { q: 'Does (0, 0) satisfy 2x + 3y > 6?', o: ['yes', 'no', 'only on the line', 'cannot say'], a: 1, e: '0 > 6 is false.' },
      { q: '−8 ≤ 5x − 3 < 7 gives', o: ['−1 ≤ x < 2', '−1 < x ≤ 2', '1 ≤ x < 2', '−2 ≤ x < 1'], a: 0, e: 'Add 3, divide by 5.' },
      { q: 'If a < b and c < 0, then', o: ['ac < bc', 'ac > bc', 'ac = bc', 'cannot compare'], a: 1, e: 'Multiplying by a negative reverses.' },
      { q: '"At least 60" translates to', o: ['x > 60', 'x ≥ 60', 'x ≤ 60', 'x < 60'], a: 1, e: '60 or more.' },
      { q: 'An open circle on the number line means the endpoint is', o: ['included', 'excluded', 'zero', 'infinite'], a: 1, e: 'Strict inequality.' },
      { q: 'x/3 > x/2 + 1 gives', o: ['x < −6', 'x > −6', 'x < 6', 'x > 6'], a: 0, e: '2x > 3x + 6 ⇒ −x > 6.' }
    ],

    teach: {
      outcomes: ['Apply rules for inequalities, including sign reversal', 'Solve and graph inequalities in one variable', 'Shade half-planes for inequalities in two variables', 'Model word problems'],
      periods: [
        { t: 'One variable', flow: [['10 min', 'Balance-scale analogy; why negatives reverse.'], ['20 min', 'Explore panel 1; number lines.'], ['10 min', 'Practice.']] },
        { t: 'Two variables and applications', flow: [['15 min', 'Explore panel 2: half-planes.'], ['15 min', 'Word problems (marks, temperature, budget).'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['No reversal for negatives.', 'Open/closed endpoints.', 'Dashed/solid boundaries.'],
      activities: ['Number-line walk: students stand on values satisfying a condition.', 'Budget planning with "at most".'],
      exit: ['Solve 3 − 2x ≥ 9.', 'Write x ∈ (−2, 5] as an inequality.', 'Shade x + 2y < 4.'],
      homework: 'The longest side of a triangle is three times the shortest and the third side is 2 cm shorter than the longest. If the perimeter is at least 61 cm, find the minimum length of the shortest side.'
    },

    slides: [
      { t: 'Linear Inequalities', b: ['Rules', 'One variable on the number line', 'Half-planes', 'Word problems'] },
      { t: 'Rules', b: ['Add/subtract: unchanged', 'Multiply/divide by positive: unchanged', 'Multiply/divide by negative: reverse'] },
      { t: 'Number line', b: ['Open circle: < or >', 'Closed circle: ≤ or ≥', 'Interval notation'] },
      { t: 'Half-planes', b: ['Draw ax + by = c', 'Dashed for strict, solid for slack', 'Test (0, 0), shade'] },
      { t: 'Check yourself', b: ['Solve 7 − 3x > 1', 'Answer: x < 2'] }
    ],

    fs: { groups: [
        ['Rules', [['Add / subtract', 'sign unchanged'], ['× or ÷ positive', 'sign unchanged'], ['× or ÷ negative', 'sign reversed']]],
        ['Notation', [['x < a', '(−∞, a)'], ['x ≤ a', '(−∞, a]'], ['a < x ≤ b', '(a, b]'], ['Number line', 'open ○ excluded, filled ● included']]],
        ['Two variables', [['Boundary ax + by = c', 'dashed for <, >; solid for ≤, ≥'], ['Side', 'test a point (usually (0, 0))'], ['Solution', 'half-plane']]],
        ['Words', [['At least', '≥'], ['At most / not more than', '≤'], ['More than', '>'], ['Less than', '<']]]],
      ex: [['−2 ≤ 3x + 4 < 10', '−6 ≤ 3x < 6 ⇒ −2 ≤ x < 2'], ['5 − 2x > 11', '−2x > 6 ⇒ x < −3']],
      rem: ['Reverse the sign for negative multipliers.', 'Check the domain (N, Z, R).', 'Show the answer on a number line.'] }
  });
})();
