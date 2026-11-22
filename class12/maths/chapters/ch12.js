/*
TOOL:    class12_maths_ch12
FAMILY:  CBSE_REVISION / Class 12 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 12 Linear Programming - revise, board focus, 2 explore panels (feasible region with sliding objective line, corner-point table), 5 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num, Q, terms } = G9;
  // corner points of {x ≥ 0, y ≥ 0, a_i x + b_i y ≤ c_i}
  function corners(cons) {
    const L = [...cons, [-1, 0, 0], [0, -1, 0]]; const pts = [];
    for (let i = 0; i < L.length; i++) for (let j = i + 1; j < L.length; j++) { const [a1, b1, c1] = L[i], [a2, b2, c2] = L[j]; const d = a1 * b2 - a2 * b1; if (!d) continue; const x = (c1 * b2 - c2 * b1) / d, y = (a1 * c2 - a2 * c1) / d;
      if (L.every(([a, b, c]) => a * x + b * y <= c + 1e-9) && !pts.some(p => Math.abs(p[0] - x) < 1e-9 && Math.abs(p[1] - y) < 1e-9)) pts.push([x, y]); }
    const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length, cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
    return pts.sort((p, q) => Math.atan2(p[1] - cy, p[0] - cx) - Math.atan2(q[1] - cy, q[0] - cx));
  }
  const fr = (v) => { for (const d of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]) if (Math.abs(v * d - Math.round(v * d)) < 1e-9) return Q(Math.round(v * d), d); return num(v, 3); };

  G9.register({
    no: 12, part: 'Unit V · Linear Programming (5 marks)', short: 'Linear programming', title: 'Linear Programming',
    blurb: 'Formulating linear programming problems, graphical method, feasible region, corner-point method, bounded and unbounded regions.',
    revise: {
      oneLine: 'Maximise or minimise a linear objective Z = ax + by subject to linear inequalities. The constraints cut out a convex feasible region; if an optimum exists it occurs at a corner point, so evaluate Z at every corner.',
      sections: [
        { h: 'Formulating', html: `<p>Decision variables x, y ≥ 0. Objective function Z = ax + by (profit, cost). Constraints: linear inequalities from resources (time, material, budget). Non-negativity: x ≥ 0, y ≥ 0.</p>` },
        { h: 'Graphical method', html: `<ol><li>Draw each constraint line; shade the side that satisfies it (test (0, 0)).</li><li>The common region is the <b>feasible region</b>; every point in it is a feasible solution.</li>
          <li>Find all corner points (intersections of boundary lines).</li><li>Evaluate Z at each corner; the largest/smallest is the max/min (<b>corner point method</b>).</li></ol>` },
        { h: 'Unbounded regions', html: `<p>If the region is unbounded, the corner value M may not be the optimum. For a maximum, draw ax + by &gt; M: if this open half-plane has no point in common with the feasible region, M is the maximum; otherwise no maximum. Similarly for a minimum with ax + by &lt; m.</p>
          <p>If two adjacent corners give the same optimum, every point on the segment joining them is optimal.</p>` }
      ],
      formulas: [['Objective', 'Z = ax + by'], ['Constraints', 'aᵢx + bᵢy ≤ (or ≥) cᵢ, x, y ≥ 0'], ['Corner point theorem', 'optimum (if any) at a corner'], ['Unbounded max test', 'ax + by > M meets region? then no max']],
      terms: [['Feasible region', 'points satisfying all constraints'], ['Optimal solution', 'feasible point giving the best Z'], ['Bounded region', 'can be enclosed in a circle'], ['Iso-profit line', 'ax + by = k for a fixed k']],
      traps: ['Shading the wrong side of a constraint.', 'Missing a corner on an axis.', 'Declaring a max for an unbounded region without the half-plane test.', 'Forgetting x, y ≥ 0.'],
      board: '<p><b>Unit V — 5 marks.</b> Usually one graphical LPP (3–5 marks): formulate or solve by the corner-point method, sometimes with an unbounded region; plus MCQs on feasible regions and corner points.</p>',
      bridge: '<p>Uses linear inequalities in two variables (Class 11 Ch 5).</p>'
    },

    explore: [
      {
        title: 'Slide the objective line', intro: 'Maximise Z = ax + by on the shaded feasible region. Move the level k: the last corner the line touches is the optimum.',
        build(el, K) {
          const cons = [[1, 1, 8], [3, 1, 12], [1, 2, 14]]; let a = 3, b = 2, k = 6; const row = K.row(el);
          K.slider(row, 'a', 1, 6, 1, a, v => { a = v; bd.redraw(); }); K.slider(row, 'b', 1, 6, 1, b, v => { b = v; bd.redraw(); }); K.slider(row, 'level k', 0, 50, 1, k, v => { k = v; bd.redraw(); });
          const bd = new K.Board(el, { xmin: -1, xmax: 15, ymin: -1, ymax: 13 }); const rd = K.read(el);
          bd.onDraw = () => { bd.base(); const P = corners(cons); bd.poly(P, { fill: 'rgba(29,78,216,.18)', color: C.blue, w: 2 }); cons.forEach(([p, q, c]) => bd.infLine(p, q, c, { color: C.grey, w: 1, dash: [4, 4] }));
            bd.infLine(a, b, k, { color: C.orange, w: 3 }); const vals = P.map(p => a * p[0] + b * p[1]); const mx = Math.max(...vals);
            P.forEach((p, i) => bd.dot(p[0], p[1], { color: vals[i] === mx ? C.purple : C.ink, r: vals[i] === mx ? 7 : 4, label: `(${fr(p[0])}, ${fr(p[1])})` }));
            rd.innerHTML = `constraints x + y ≤ 8, 3x + y ≤ 12, x + 2y ≤ 14, x, y ≥ 0 · Z = ${a}x + ${b}y · corners: ${P.map((p, i) => `Z(${fr(p[0])}, ${fr(p[1])}) = ${fr(vals[i])}`).join(', ')} · <b>max Z = ${fr(mx)}</b> · line Z = ${k} ${k > mx ? 'misses the region' : 'cuts the region'}`; };
          bd.redraw(); return null;
        }
      },
      {
        title: 'Corner-point table', intro: 'Press <kbd>S</kbd> for a new problem; the feasible region, its corners and the Z-table are built for you.',
        build(el, K) {
          const R = G9.rng(G9.newSeed()); let cons, a, b, mode;
          const bd = new K.Board(el, { xmin: -1, xmax: 13, ymin: -1, ymax: 11 }); const rd = K.read(el);
          const make = () => { do { cons = [[R.int(1, 4), R.int(1, 4), R.int(8, 24)], [R.int(1, 4), R.int(1, 4), R.int(8, 24)]]; } while (corners(cons).length < 4); a = R.int(1, 9); b = R.int(1, 9); mode = R.chance(.5) ? 'max' : 'min'; bd.redraw(); };
          bd.onDraw = () => { bd.base(); const P = corners(cons); bd.poly(P, { fill: 'rgba(29,78,216,.18)', color: C.blue, w: 2 }); cons.forEach(([p, q, c]) => bd.infLine(p, q, c, { color: C.grey, w: 1, dash: [4, 4] }));
            const vals = P.map(p => a * p[0] + b * p[1]); const best = mode === 'max' ? Math.max(...vals) : Math.min(...vals);
            P.forEach((p, i) => bd.dot(p[0], p[1], { color: vals[i] === best ? C.orange : C.ink, r: vals[i] === best ? 7 : 4 }));
            rd.innerHTML = `${mode === 'max' ? 'Maximise' : 'Minimise'} Z = ${a}x + ${b}y subject to ${cons.map(([p, q, c]) => `${terms([[p, 'x'], [q, 'y']])} ≤ ${c}`).join(', ')}, x, y ≥ 0<br><table class="t" style="width:auto"><tr><th>corner</th>${P.map(p => `<td>(${fr(p[0])}, ${fr(p[1])})</td>`).join('')}</tr><tr><th>Z</th>${vals.map(v => `<td${v === best ? ' style="font-weight:bold"' : ''}>${fr(v)}</td>`).join('')}</tr></table>${mode} Z = <b>${fr(best)}</b>${mode === 'min' ? ' (here the origin is feasible, so the minimum is 0)' : ''}`; };
          const row = K.row(el); K.button(row, 'New problem (S)', make); make(); return { step: make, play() {}, pause() {} };
        }
      }
    ],

    gens: [
      { title: 'Corner-point method (bounded)', gen(R) {
          let cons; do { cons = [[R.int(1, 4), R.int(1, 4), R.int(8, 24)], [R.int(1, 4), R.int(1, 4), R.int(8, 24)]]; } while (corners(cons).length < 4);
          const a = R.int(1, 9), b = R.int(1, 9); const P = corners(cons); const vals = P.map(p => a * p[0] + b * p[1]); const mx = Math.max(...vals); const at = P.filter((p, i) => Math.abs(vals[i] - mx) < 1e-9);
          return { q: `Maximise Z = ${a}x + ${b}y subject to ${cons.map(([p, q, c]) => `${terms([[p, 'x'], [q, 'y']])} ≤ ${c}`).join(', ')}, x ≥ 0, y ≥ 0.`, a: `max Z = ${fr(mx)} at ${at.map(p => `(${fr(p[0])}, ${fr(p[1])})`).join(' and ')}`, ans: mx, s: `corners: ${P.map(p => `(${fr(p[0])}, ${fr(p[1])})`).join(', ')}` };
        } },
      { title: 'Find the corner points', levels: [1, 2], gen(R) {
          const c1 = R.int(4, 10), c2 = R.int(4, 10); const P = corners([[1, 1, c1], [1, 0, c2]]);
          return { q: `List the corner points of the feasible region x + y ≤ ${c1}, x ≤ ${c2}, x ≥ 0, y ≥ 0.`, a: P.map(p => `(${fr(p[0])}, ${fr(p[1])})`).join(', ') };
        } },
      { title: 'Minimise (unbounded region)', levels: [2, 3], gen(R) {
          const items = [['Minimise Z = 3x + 5y subject to x + 3y ≥ 3, x + y ≥ 2, x, y ≥ 0', 'min Z = 7 at (3/2, 1/2) (check 3x + 5y < 7 has no common point)'], ['Minimise Z = −3x + 4y subject to x + 2y ≤ 8, 3x + 2y ≤ 12, x, y ≥ 0', 'min Z = −12 at (4, 0)'], ['Minimise Z = 200x + 500y subject to x + 2y ≥ 10, 3x + 4y ≤ 24, x, y ≥ 0', 'min Z = 2300 at (4, 3)'], ['Minimise Z = x + 2y subject to 2x + y ≥ 3, x + 2y ≥ 6, x, y ≥ 0', 'min Z = 6 at every point of the segment joining (6, 0) and (0, 3)']];
          const [q, a] = R.pick(items); return { q: `${q}.`, a };
        } },
      { title: 'Formulate an LPP', levels: [2, 3], gen(R) {
          const p1 = R.int(2, 6) * 5, p2 = R.int(2, 6) * 5, h = R.int(30, 60), m = R.int(20, 50);
          return { q: `A firm makes chairs and tables. A chair needs 2 h of carpentry and 1 h of polishing; a table 3 h and 2 h. Available: ${h} h carpentry, ${m} h polishing. Profit ₹${p1} per chair and ₹${p2} per table. Formulate the LPP.`, a: `Maximise Z = ${p1}x + ${p2}y subject to 2x + 3y ≤ ${h}, x + 2y ≤ ${m}, x ≥ 0, y ≥ 0 (x chairs, y tables)` };
        } },
      { title: 'Is the point feasible?', levels: [1], gen(R) {
          const c = R.int(6, 12), x = R.int(0, 8), y = R.int(0, 8); const ok = x + 2 * y <= c && 3 * x + y <= c + 4;
          return { q: `Is (${x}, ${y}) in the feasible region x + 2y ≤ ${c}, 3x + y ≤ ${c + 4}, x, y ≥ 0?`, a: ok ? 'yes' : 'no', s: `${x + 2 * y} ≤ ${c}? ${3 * x + y} ≤ ${c + 4}?` };
        } }
    ],

    quiz: [
      { q: 'The optimum of an LPP (if it exists) occurs at', o: ['a corner point', 'the origin', 'the centre', 'any interior point'], a: 0, e: 'Corner point theorem.' },
      { q: 'The feasible region of an LPP is always', o: ['convex', 'a triangle', 'bounded', 'a circle'], a: 0, e: 'Intersection of half-planes.' },
      { q: 'Z = 3x + 2y at corner (2, 3)', o: ['12', '13', '9', '6'], a: 0, e: '6 + 6.' },
      { q: 'Non-negativity constraints are', o: ['x ≥ 0, y ≥ 0', 'x ≤ 0', 'x + y ≥ 0', 'none'], a: 0, e: 'Quantities cannot be negative.' },
      { q: 'If two corners give the same max Z, then', o: ['all points on the segment joining them are optimal', 'no solution', 'only one is optimal', 'the LPP is unbounded'], a: 0, e: 'Standard.' },
      { q: 'For an unbounded region, a max M at a corner is confirmed if', o: ['ax + by > M has no common point with the region', 'M > 0', 'the region contains the origin', 'always'], a: 0, e: 'Half-plane test.' },
      { q: 'Corner points of x + y ≤ 4, x, y ≥ 0', o: ['(0, 0), (4, 0), (0, 4)', '(4, 4)', '(2, 2)', '(0, 0) only'], a: 0, e: 'Triangle.' },
      { q: 'Max of Z = x + y on x + y ≤ 5, x, y ≥ 0', o: ['5', '10', '0', '2.5'], a: 0, e: 'Along the edge.' },
      { q: 'Objective function in an LPP is', o: ['linear', 'quadratic', 'exponential', 'trigonometric'], a: 0, e: 'Linear.' },
      { q: 'A point satisfying all constraints is', o: ['a feasible solution', 'optimal', 'a corner', 'infeasible'], a: 0, e: 'Definition.' },
      { q: 'The region for x + y ≥ 2, x, y ≥ 0 is', o: ['unbounded', 'bounded', 'empty', 'a point'], a: 0, e: 'Extends to infinity.' }
    ],

    teach: {
      outcomes: ['Formulate linear programming problems', 'Draw feasible regions', 'Solve by the corner-point method', 'Handle unbounded regions'],
      periods: [
        { t: 'Formulation', flow: [['10 min', 'Canteen problem: samosas vs sandwiches with limited oil and time.'], ['15 min', 'Variables, objective, constraints.'], ['15 min', 'Practice formulations.']] },
        { t: 'Graphical solution', flow: [['15 min', 'Explore panel 1: sliding objective line.'], ['15 min', 'Explore panel 2: corner tables; unbounded test.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Wrong side shaded.', 'Missing axis corners.', 'Unbounded max assumed.'],
      activities: ['Graph-paper LPP with coloured shading per constraint.', 'Iso-profit ruler sliding across the region.'],
      exit: ['Corners of 2x + y ≤ 8, x, y ≥ 0.', 'Max of Z = 3x + y there.', 'Is (1, 5) feasible?'],
      homework: 'A dietician mixes two foods: F1 has 3 units vitamin A and 4 units iron per kg, F2 has 6 and 3; at least 80 units vitamin A and 100 units iron are needed. F1 costs ₹4/kg and F2 ₹6/kg. Find the least cost.'
    },

    slides: [
      { t: 'Linear Programming', b: ['Formulation', 'Feasible region', 'Corner-point method', 'Unbounded regions'] },
      { t: 'Formulation', b: ['Variables x, y ≥ 0', 'Objective Z = ax + by', 'Constraints from resources'] },
      { t: 'Corner-point method', b: ['Draw constraints, shade', 'List corners', 'Evaluate Z', 'Pick max/min'] },
      { t: 'Unbounded', b: ['Check ax + by > M (or < m)', 'No common point ⇒ optimum exists'] },
      { t: 'Check yourself', b: ['Max Z = 2x + 3y on x + y ≤ 4, x, y ≥ 0?', 'Answer: 12 at (0, 4)'] }
    ],

    fs: { groups: [
        ['Setting up', [['Decision variables', 'x, y ≥ 0'], ['Objective', 'Z = ax + by'], ['Constraints', 'linear inequalities']]],
        ['Graphical method', [['Feasible region', 'intersection of all half-planes'], ['Corner points', 'intersections of boundary lines'], ['Theorem', 'optimum at a corner (bounded: always exists)'], ['Ties', 'two corners equal ⇒ whole edge optimal']]],
        ['Unbounded regions', [['Max M at a corner', 'valid if ax + by > M misses the region'], ['Min m at a corner', 'valid if ax + by < m misses the region']]]],
      ex: [['Max Z = 3x + 2y, x + y ≤ 4, x + 3y ≤ 6', 'corners (0,0), (4,0), (3,1), (0,2): max 12 at (4, 0)'], ['Min Z = 3x + 5y, x + 3y ≥ 3, x + y ≥ 2', 'min 7 at (3/2, 1/2)']],
      rem: ['Test (0, 0) to shade.', 'Include axis corners.', 'Check unbounded regions.'] }
  });
})();
