/*
TOOL:    class11_maths_ch09
FAMILY:  CBSE_REVISION / Class 11 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 9 Straight Lines - revise, exam focus, 2 explore panels (slope and forms, distance from a line), 7 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { F, Q, C, num, terms, gcd } = G9;
  const lineEq = (A, B, Cc) => { let g = gcd(gcd(Math.abs(A), Math.abs(B)), Math.abs(Cc)) || 1; if (A < 0 || (A === 0 && B < 0)) g = -g; return `${terms([[A / g, 'x'], [B / g, 'y'], [Cc / g, '']])} = 0`; };

  G9.register({
    no: 9, part: 'Unit III · Coordinate Geometry (12 marks)', short: 'Straight lines', title: 'Straight Lines',
    blurb: 'Slope, parallel and perpendicular lines, forms of the equation of a line, distance of a point from a line.',
    revise: {
      oneLine: 'A line is fixed by a point and its slope m = tan θ. From that come the point-slope, slope-intercept, two-point and intercept forms, all reducible to Ax + By + C = 0, plus a formula for the distance of a point from the line.',
      sections: [
        { h: 'Slope', html: `<p>m = tan θ = ${F('y₂ − y₁', 'x₂ − x₁')}. Horizontal: m = 0; vertical: not defined.</p>
          <p>Parallel: m₁ = m₂. Perpendicular: m₁m₂ = −1. Angle between lines: tan θ = |(m₂ − m₁)/(1 + m₁m₂)|. Collinear points: equal slopes.</p>` },
        { h: 'Forms of the equation', html: `<table class="t"><tr><th>Form</th><th>Equation</th></tr><tr><td>Point-slope</td><td>y − y₁ = m(x − x₁)</td></tr><tr><td>Two-point</td><td>y − y₁ = ${F('y₂ − y₁', 'x₂ − x₁')}(x − x₁)</td></tr>
          <tr><td>Slope-intercept</td><td>y = mx + c</td></tr><tr><td>Intercept</td><td>x/a + y/b = 1</td></tr><tr><td>Normal</td><td>x cos ω + y sin ω = p</td></tr><tr><td>General</td><td>Ax + By + C = 0, m = −A/B, intercepts −C/A, −C/B</td></tr></table>
          <p>Lines x = a and y = b are parallel to the axes.</p>` },
        { h: 'Distances', html: `<div class="box m">Distance of (x₁, y₁) from Ax + By + C = 0: d = ${F('|Ax₁ + By₁ + C|', '√(A² + B²)')}</div>
          <p>Between parallel lines Ax + By + C₁ = 0 and Ax + By + C₂ = 0: d = |C₁ − C₂|/√(A² + B²).</p>` }
      ],
      formulas: [['Slope', 'm = (y₂ − y₁)/(x₂ − x₁) = tan θ'], ['Perpendicular', 'm₁m₂ = −1'], ['Angle', 'tan θ = |(m₂ − m₁)/(1 + m₁m₂)|'], ['Point-slope', 'y − y₁ = m(x − x₁)'], ['Intercept form', 'x/a + y/b = 1'], ['Point–line distance', '|Ax₁ + By₁ + C|/√(A² + B²)']],
      terms: [['Slope (gradient)', 'tan of the inclination'], ['Intercepts', 'where the line meets the axes'], ['Inclination', 'angle with positive x-axis, 0° ≤ θ < 180°'], ['Normal', 'perpendicular from the origin']],
      traps: ['Slope of a vertical line is not defined, not 0.', 'For Ax + By + C = 0 the slope is −A/B (sign!).', 'Forgetting the modulus in the distance formula.', 'Parallel-line distance needs the same A and B.'],
      board: '<p><b>Unit III (Coordinate Geometry) — 12 marks.</b> Expect: slope, parallel/perpendicular conditions (1–2 marks), equation of a line in various forms (2–3 marks), and distance of a point from a line or between parallel lines.</p>',
      bridge: '<p>Class 10 Ch 7 gave distance and section formulas. Ch 10 studies curves (conics).</p>'
    },

    explore: [
      {
        title: 'Slope and the forms of a line', intro: 'Drag P and Q. Read the slope, inclination, intercepts and every form of the equation.',
        build(el, K) {
          const b = new K.Board(el, { xmin: -8, xmax: 8, ymin: -6, ymax: 6 }); const rd = K.read(el);
          const P = b.addPt(-3, -1, { label: 'P', snap: 1, color: C.blue }), Qp = b.addPt(3, 3, { label: 'Q', snap: 1, color: C.blue });
          b.onDraw = () => { b.base(); const [x1, y1, x2, y2] = [P.x, P.y, Qp.x, Qp.y]; const A = y2 - y1, B = x1 - x2, Cc = -(A * x1 + B * y1);
            if (A || B) b.infLine(A, B, -Cc, { color: C.orange, w: 3 });
            let msg; if (x1 === x2 && y1 === y2) msg = 'P and Q coincide.'; else if (x1 === x2) msg = `vertical line x = ${x1}; slope not defined, θ = 90°`;
            else { const m = Q(y2 - y1, x2 - x1), mv = (y2 - y1) / (x2 - x1), th = (Math.atan(mv) * 180 / Math.PI + 180) % 180; const c = y1 - mv * x1;
              const xi = A !== 0 ? -Cc / A : null, yi = B !== 0 ? -Cc / B : null; if (xi !== null && Math.abs(xi) < 50) b.dot(xi, 0, { color: C.purple, r: 4 }); if (yi !== null) b.dot(0, yi, { color: C.purple, r: 4 });
              msg = `slope m = ${m} · θ = ${num(th, 1)}° · y = ${m === '0' ? '' : m + 'x'} ${c >= 0 ? '+' : '−'} ${num(Math.abs(c), 3)} · general: ${lineEq(A, B, Cc)}` + (xi !== null && yi !== null && Cc !== 0 ? ` · intercepts a = ${num(xi, 3)}, b = ${num(yi, 3)}` : ''); }
            b.drawPts(); rd.innerHTML = msg; };
          b.redraw(); return null;
        }
      },
      {
        title: 'Distance of a point from a line', intro: 'Drag point R. The perpendicular is drawn and d = |Ax₁ + By₁ + C|/√(A² + B²) is evaluated.',
        build(el, K) {
          let A = 3, B = 4, Cc = -12; const row = K.row(el); [['A', v => A = v, A], ['B', v => B = v, B], ['C', v => Cc = v, Cc]].forEach(s => K.slider(row, s[0], -12, 12, 1, s[2], v => { s[1](v); b.redraw(); }));
          const b = new K.Board(el, { xmin: -8, xmax: 8, ymin: -6, ymax: 6 }); const rd = K.read(el); const Rp = b.addPt(4, 3, { label: 'R', snap: 0.5 });
          b.onDraw = () => { b.base(); if (!A && !B) { rd.innerHTML = 'A and B cannot both be 0.'; b.drawPts(); return; } b.infLine(A, B, -Cc, { color: C.blue, w: 3 });
            const v = A * Rp.x + B * Rp.y + Cc, n2 = A * A + B * B; const fx = Rp.x - A * v / n2, fy = Rp.y - B * v / n2; b.line(Rp.x, Rp.y, fx, fy, { color: C.orange, w: 3, dash: [6, 4] }); b.dot(fx, fy, { color: C.orange, r: 4, label: 'foot' });
            b.drawPts(); rd.innerHTML = `${lineEq(A, B, Cc)} · R(${num(Rp.x)}, ${num(Rp.y)}) · d = |${A}(${num(Rp.x)}) + ${B}(${num(Rp.y)}) + ${Cc}| / √${n2} = ${num(Math.abs(v))}/${num(Math.sqrt(n2), 3)} = <b>${num(Math.abs(v) / Math.sqrt(n2), 3)}</b>`; };
          b.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Slope and inclination', levels: [1, 2], gen(R) {
          const x1 = R.int(-6, 6), y1 = R.int(-6, 6); let x2, y2; do { x2 = R.int(-6, 6); y2 = R.int(-6, 6); } while (x2 === x1);
          return { q: `Find the slope of the line through (${x1}, ${y1}) and (${x2}, ${y2}).`, a: Q(y2 - y1, x2 - x1), ans: (y2 - y1) / (x2 - x1), s: `(${y2} − ${y1})/(${x2} − ${x1})` };
        } },
      { title: 'Parallel, perpendicular, collinear', gen(R) {
          const t = R.int(0, 1);
          if (t === 0) { const a = R.nz(-4, 4), b = R.nz(-4, 4); return { q: `Find the slope of a line (i) parallel (ii) perpendicular to ${terms([[a, 'x'], [b, 'y']])} + ${R.int(1, 9)} = 0.`, a: `(i) ${Q(-a, b)} (ii) ${Q(b, a)}`, s: 'm = −A/B; perpendicular −1/m' }; }
          const m = R.nz(-3, 3), c = R.int(-4, 4), x1 = R.int(-3, 0), x2 = x1 + R.int(1, 3), k = x2 + R.int(1, 3);
          return { q: `The points (${x1}, ${m * x1 + c}), (${x2}, ${m * x2 + c}) and (${k}, y) are collinear. Find y.`, a: `y = ${m * k + c}`, ans: m * k + c, s: 'equal slopes' };
        } },
      { title: 'Equation: point and slope / two points', gen(R) {
          const x1 = R.int(-5, 5), y1 = R.int(-5, 5); let x2, y2; do { x2 = R.int(-5, 5); y2 = R.int(-5, 5); } while (x2 === x1 && y2 === y1);
          const A = y2 - y1, B = x1 - x2, Cc = -(A * x1 + B * y1);
          return { q: `Find the equation of the line through (${x1}, ${y1}) and (${x2}, ${y2}).`, a: lineEq(A, B, Cc), s: x1 === x2 ? `vertical line x = ${x1}` : `m = ${Q(y2 - y1, x2 - x1)}; y − ${y1} = m(x − ${x1})` };
        } },
      { title: 'Intercept form', levels: [2, 3], gen(R) {
          const a = R.nz(-6, 6), b = R.nz(-6, 6);
          return R.chance(.5) ? { q: `Find the equation of the line with x-intercept ${a} and y-intercept ${b}.`, a: lineEq(b, a, -a * b), s: `x/${a} + y/${b} = 1` }
            : { q: `Find the intercepts of ${lineEq(b, a, -a * b)} on the axes.`, a: `x-intercept ${a}, y-intercept ${b}`, s: 'put y = 0, then x = 0' };
        } },
      { title: 'Distance of a point from a line', gen(R) {
          const T = R.pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]]); const A = T[0] * R.sign(), B = T[1] * R.sign(), Cc = R.int(-15, 15), x = R.int(-5, 5), y = R.int(-5, 5); const v = Math.abs(A * x + B * y + Cc);
          return { q: `Find the distance of the point (${x}, ${y}) from the line ${terms([[A, 'x'], [B, 'y'], [Cc, '']])} = 0.`, a: Q(v, T[2]), ans: v / T[2], s: `|${A}(${x}) + ${B}(${y}) + ${Cc}| / ${T[2]}` };
        } },
      { title: 'Distance between parallel lines', levels: [2, 3], gen(R) {
          const T = R.pick([[3, 4, 5], [5, 12, 13], [6, 8, 10]]); const c1 = R.int(-10, 10); let c2; do { c2 = R.int(-10, 10); } while (c2 === c1);
          return { q: `Find the distance between ${terms([[T[0], 'x'], [T[1], 'y'], [c1, '']])} = 0 and ${terms([[T[0], 'x'], [T[1], 'y'], [c2, '']])} = 0.`, a: Q(Math.abs(c1 - c2), T[2]), ans: Math.abs(c1 - c2) / T[2], s: `|${c1} − (${c2})|/${T[2]}` };
        } },
      { title: 'Angle between lines', levels: [3], gen(R) {
          const pairs = [[1, 0, '45°'], [Math.sqrt(3), 0, '60°'], [1, -1, '90°'], [2, -0.5, '90°'], [3, 0.5, '45°'], [2, 1 / 3, '45°']]; const [m1, m2, ans] = R.pick(pairs);
          const sh = (m) => Math.abs(m - Math.sqrt(3)) < 1e-9 ? '√3' : Q(Math.round(m * 6), 6);
          return { q: `Find the acute angle between lines with slopes ${sh(m1)} and ${sh(m2)}.`, a: ans, s: 'tan θ = |(m₂ − m₁)/(1 + m₁m₂)|' };
        } }
    ],

    quiz: [
      { q: 'Slope of the line through (1, 2) and (3, 8)', o: ['3', '1/3', '6', '2'], a: 0, e: '6/2.' },
      { q: 'Slope of 2x − 3y + 6 = 0', o: ['2/3', '−2/3', '3/2', '−3/2'], a: 0, e: '−A/B = 2/3.' },
      { q: 'Lines with slopes 2 and −1/2 are', o: ['parallel', 'perpendicular', 'coincident', 'neither'], a: 1, e: 'Product −1.' },
      { q: 'Slope of a line parallel to the y-axis', o: ['0', '1', 'not defined', '−1'], a: 2, e: 'Vertical.' },
      { q: 'Equation of a line with intercepts 3 and 4', o: ['4x + 3y = 12', '3x + 4y = 12', 'x + y = 7', '4x − 3y = 12'], a: 0, e: 'x/3 + y/4 = 1.' },
      { q: 'Distance of (0, 0) from 3x + 4y − 10 = 0', o: ['2', '10', '5', '1'], a: 0, e: '10/5.' },
      { q: 'Line through (2, 3) with slope 1', o: ['y = x + 1', 'y = x − 1', 'y = x + 3', 'y = 2x − 1'], a: 0, e: 'y − 3 = x − 2.' },
      { q: 'Inclination of a line with slope −1', o: ['45°', '135°', '−45°', '90°'], a: 1, e: 'tan 135° = −1.' },
      { q: 'Distance between 3x + 4y = 5 and 3x + 4y = 15', o: ['2', '10', '1', '5'], a: 0, e: '10/5.' },
      { q: 'y-intercept of 2x + 5y − 10 = 0', o: ['2', '5', '−2', '10'], a: 0, e: 'x = 0 ⇒ y = 2.' },
      { q: 'Angle between y = x and y = −x', o: ['45°', '60°', '90°', '0°'], a: 2, e: 'm₁m₂ = −1.' }
    ],

    teach: {
      outcomes: ['Find slope and inclination; test parallel, perpendicular, collinear', 'Write the equation of a line in different forms', 'Convert between forms and find intercepts', 'Find point–line and parallel-line distances'],
      periods: [
        { t: 'Slope', flow: [['10 min', 'Ramps and roads: gradient in real life.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Parallel/perpendicular/collinear.']] },
        { t: 'Forms', flow: [['20 min', 'Point-slope, two-point, slope-intercept, intercept, normal.'], ['20 min', 'Conversions; practice.']] },
        { t: 'Distances', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Parallel lines; angle between lines.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Vertical slope = 0.', 'Sign of −A/B.', 'Missing modulus.'],
      activities: ['Graph-paper lines through given points; measure slopes.', 'Shortest path from a point to a road (perpendicular).'],
      exit: ['Slope of 4x + 2y = 7.', 'Line through (1, −1) parallel to y = 3x.', 'Distance of (1, 1) from 3x + 4y + 3 = 0.'],
      homework: 'Find the equation of the line perpendicular to x − 7y + 5 = 0 with x-intercept 3.'
    },

    slides: [
      { t: 'Straight Lines', b: ['Slope', 'Forms of the equation', 'Distance from a line', 'Angle between lines'] },
      { t: 'Slope', b: ['m = (y₂ − y₁)/(x₂ − x₁) = tan θ', 'Parallel: equal slopes', 'Perpendicular: m₁m₂ = −1'] },
      { t: 'Forms', b: ['y − y₁ = m(x − x₁)', 'y = mx + c', 'x/a + y/b = 1', 'Ax + By + C = 0'] },
      { t: 'Distance', b: ['d = |Ax₁ + By₁ + C|/√(A² + B²)', 'Parallel lines: |C₁ − C₂|/√(A² + B²)'] },
      { t: 'Check yourself', b: ['Slope of 3x − y + 2 = 0?', 'Distance of (0, 0) from it?', 'Answers: 3 · 2/√10'] }
    ],

    fs: { groups: [
        ['Slope', [['m', '(y₂ − y₁)/(x₂ − x₁) = tan θ'], ['Parallel', 'm₁ = m₂'], ['Perpendicular', 'm₁m₂ = −1'], ['Angle', 'tan θ = |(m₂ − m₁)/(1 + m₁m₂)|'], ['Collinear', 'slope AB = slope BC']]],
        ['Equation forms', [['Point-slope', 'y − y₁ = m(x − x₁)'], ['Two-point', 'y − y₁ = (y₂ − y₁)/(x₂ − x₁) · (x − x₁)'], ['Slope-intercept', 'y = mx + c'], ['Intercept', 'x/a + y/b = 1'], ['Normal', 'x cos ω + y sin ω = p'], ['General', 'Ax + By + C = 0, m = −A/B']]],
        ['Distances', [['Point to line', '|Ax₁ + By₁ + C|/√(A² + B²)'], ['Parallel lines', '|C₁ − C₂|/√(A² + B²)'], ['Axes lines', 'x = a, y = b']]]],
      ex: [['Line through (2, 3), (4, 7)', 'm = 2 ⇒ 2x − y − 1 = 0'], ['Distance of (3, −5) from 3x − 4y − 26 = 0', '|9 + 20 − 26|/5 = 3/5']],
      rem: ['Vertical: slope not defined.', 'Check signs in −A/B.', 'Keep the modulus in distance.'] }
  });
})();
