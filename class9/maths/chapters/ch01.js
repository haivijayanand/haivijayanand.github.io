/*
TOOL:    class9_maths_ch01
FAMILY:  CBSE_REVISION / Class 9 Maths (Ganita Manjari)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class 9 Maths full build
CHANGES: 1.0.0 - Ch 1 Orienting Yourself: The Use of Coordinates - revise, 3 explore panels, 7 generators, quiz, lesson plan, slides
*/
(function () {
  const { F, num, C, surdH } = G9;
  const P = (x, y) => `(${num(x)}, ${num(y)})`;
  const quad = (x, y) => x === 0 && y === 0 ? 'the origin' : x === 0 ? 'the y-axis' : y === 0 ? 'the x-axis' : x > 0 ? (y > 0 ? 'Quadrant I' : 'Quadrant IV') : (y > 0 ? 'Quadrant II' : 'Quadrant III');
  const distH = (d2) => { const s = surdH(d2); return d2 === 0 ? '0' : s; };

  G9.register({
    no: 1, part: 'Part I', short: 'Coordinates', title: 'Orienting Yourself: The Use of Coordinates',
    blurb: 'Cartesian plane, quadrants, plotting points, distance and midpoint formulas.',
    revise: {
      oneLine: 'Two perpendicular number lines (the axes) let us name every point of a plane by an ordered pair (x, y). Distance and midpoint then come straight from Baudhāyana–Pythagoras and averaging.',
      sections: [
        { h: 'The Cartesian plane', html: `<p>Draw a horizontal number line (<b>x-axis</b>) and a vertical one (<b>y-axis</b>) crossing at the <b>origin O(0, 0)</b>. They split the plane into four <b>quadrants</b>, numbered anticlockwise from the top-right.</p>
          <table class="t"><tr><th>Quadrant</th><th>I</th><th>II</th><th>III</th><th>IV</th></tr><tr><td>Signs (x, y)</td><td>(+, +)</td><td>(−, +)</td><td>(−, −)</td><td>(+, −)</td></tr></table>
          <p>A point on an axis is in <b>no</b> quadrant: points on the x-axis look like (a, 0); points on the y-axis look like (0, b).</p>` },
        { h: 'Reading and plotting a point', html: `<p>In P(x, y), <b>x</b> (abscissa) says how far to move right (+) or left (−) from O; <b>y</b> (ordinate) says how far up (+) or down (−). The pair is <b>ordered</b>: (2, 5) and (5, 2) are different points.</p>
          <p>The distance of P(x, y) from the y-axis is |x| and from the x-axis is |y|.</p>` },
        { h: 'Distance between two points', html: `<p>For A(x<sub>1</sub>, y<sub>1</sub>) and B(x<sub>2</sub>, y<sub>2</sub>) draw the right triangle with horizontal leg |x<sub>2</sub> − x<sub>1</sub>| and vertical leg |y<sub>2</sub> − y<sub>1</sub>|. By Baudhāyana–Pythagoras:</p>
          <div class="box m">AB = √[(x<sub>2</sub> − x<sub>1</sub>)<sup>2</sup> + (y<sub>2</sub> − y<sub>1</sub>)<sup>2</sup>]</div>
          <p>Special cases: same y → AB = |x<sub>2</sub> − x<sub>1</sub>|; same x → AB = |y<sub>2</sub> − y<sub>1</sub>|; from the origin → OP = √(x<sup>2</sup> + y<sup>2</sup>).</p>` },
        { h: 'Midpoint of a segment', html: `<p>The midpoint is the <b>average</b> of the end points, coordinate by coordinate:</p>
          <div class="box m">M = ( ${F('x<sub>1</sub> + x<sub>2</sub>', '2')} , ${F('y<sub>1</sub> + y<sub>2</sub>', '2')} )</div>
          <p>Reverse use: if M and one end A are known, the other end is B = (2M<sub>x</sub> − x<sub>1</sub>, 2M<sub>y</sub> − y<sub>1</sub>).</p>` },
        { h: 'Using coordinates to prove things', html: `<ul><li><b>Isosceles / equilateral triangle</b>: compare the three side lengths.</li>
          <li><b>Right triangle</b>: check whether the squares of two sides add up to the square of the third.</li>
          <li><b>Collinear points</b>: A, B, C lie on a line when AB + BC = AC (the longest equals the sum of the other two).</li>
          <li><b>Parallelogram</b>: the diagonals bisect each other, so both diagonals have the same midpoint.</li></ul>` }
      ],
      formulas: [
        ['Distance AB', 'AB = √[(x₂ − x₁)² + (y₂ − y₁)²]'],
        ['Distance from origin', 'OP = √(x² + y²)'],
        ['Midpoint', `M = (${F('x₁ + x₂', '2')}, ${F('y₁ + y₂', '2')})`],
        ['On the x-axis', 'y = 0, point (a, 0)'],
        ['On the y-axis', 'x = 0, point (0, b)']
      ],
      terms: [['Abscissa', 'the x-coordinate'], ['Ordinate', 'the y-coordinate'], ['Origin', '(0, 0), where the axes meet'], ['Quadrant', 'one of the four regions cut out by the axes']],
      traps: [
        'Writing (y, x) instead of (x, y) — always move along the x-axis first.',
        'Saying (0, 4) lies on the x-axis. It has x = 0, so it is on the <b>y-axis</b>.',
        'Forgetting that (−3)² = 9, so the sign of x₂ − x₁ never matters in the distance formula.',
        'Subtracting in the midpoint formula. Midpoint uses <b>+</b> and divides by 2.'
      ],
      bridge: '<p>Coordinates come back in Ch 2 (graphs of linear polynomials), Ch 12 (quadrilaterals and the midpoint theorem) and Ch 13 (lines in two variables).</p>'
    },

    explore: [
      {
        title: 'Walk to a point', intro: 'Drag P anywhere. Press <kbd>S</kbd> to walk from the origin: first along x, then along y.',
        build(el, K) {
          const b = new K.Board(el, { xmin: -8, xmax: 8, ymin: -6, ymax: 6 });
          const p = b.addPt(3, 4, { snap: 1, label: 'P' });
          const rd = K.read(el);
          const an = new K.Anim(4, () => b.redraw(), { ms: 900 });
          b.onDrag = () => an.reset();
          b.onDraw = () => {
            b.base();
            const i = an.i;
            if (i >= 1) b.arrow(0, 0, p.x, 0, { color: C.blue, w: 4 });
            if (i >= 2) b.arrow(p.x, 0, p.x, p.y, { color: C.orange, w: 4 });
            if (i >= 1) b.text(p.x / 2, p.y >= 0 ? -0.5 : 0.5, `x = ${num(p.x)}`, { color: C.blue, font: 'bold 15px' });
            if (i >= 2) b.text(p.x + (p.x >= 0 ? 0.9 : -0.9), p.y / 2, `y = ${num(p.y)}`, { color: C.orange, font: 'bold 15px' });
            b.dot(0, 0, { color: C.grey, label: 'O', r: 4 });
            b.drawPts();
            rd.innerHTML = `P = <b>${P(p.x, p.y)}</b> &nbsp;·&nbsp; lies in <b>${quad(p.x, p.y)}</b> &nbsp;·&nbsp; distance from x-axis = ${Math.abs(p.y)}, from y-axis = ${Math.abs(p.x)}` + (i >= 3 ? ` &nbsp;·&nbsp; OP = √(${num(p.x * p.x)} + ${num(p.y * p.y)}) = ${distH(p.x * p.x + p.y * p.y)}` : '');
          };
          K.anim(el, an); b.redraw();
          return an;
        }
      },
      {
        title: 'Distance and midpoint', intro: 'Drag A and B. Step through to see the right triangle behind the distance formula, then the midpoint.',
        build(el, K) {
          const b = new K.Board(el, { xmin: -8, xmax: 8, ymin: -6, ymax: 6 });
          const A = b.addPt(-4, -2, { snap: 1, label: 'A', color: C.blue });
          const B = b.addPt(4, 4, { snap: 1, label: 'B' });
          const note = K.note(el); const rd = K.read(el);
          const steps = ['Two points A and B', 'Horizontal leg: x₂ − x₁', 'Vertical leg: y₂ − y₁', 'Hypotenuse = AB by Baudhāyana–Pythagoras', 'Midpoint M = average of the coordinates'];
          const an = new K.Anim(5, () => b.redraw());
          b.onDrag = () => b.redraw();
          b.onDraw = () => {
            b.base(); const i = an.i, dx = B.x - A.x, dy = B.y - A.y;
            if (i >= 1) b.line(A.x, A.y, B.x, A.y, { color: C.blue, w: 4, dash: [8, 5] });
            if (i >= 2) b.line(B.x, A.y, B.x, B.y, { color: C.orange, w: 4, dash: [8, 5] });
            if (i >= 1) b.text((A.x + B.x) / 2, A.y - 0.5, `|Δx| = ${Math.abs(dx)}`, { color: C.blue, font: 'bold 14px' });
            if (i >= 2) b.text(B.x + 1.1, (A.y + B.y) / 2, `|Δy| = ${Math.abs(dy)}`, { color: C.orange, font: 'bold 14px' });
            if (i >= 3 || i === 0) b.line(A.x, A.y, B.x, B.y, { color: C.purple, w: 4 });
            if (i >= 4) b.dot((A.x + B.x) / 2, (A.y + B.y) / 2, { color: C.purple, label: 'M' });
            b.drawPts(); note.textContent = steps[i];
            const d2 = dx * dx + dy * dy;
            rd.innerHTML = `A${P(A.x, A.y)}, B${P(B.x, B.y)}<br>AB = √[(${num(B.x)} − ${G9.par(A.x)})² + (${num(B.y)} − ${G9.par(A.y)})²] = √(${dx * dx} + ${dy * dy}) = √${d2} = <b>${distH(d2)}</b> ≈ ${num(Math.sqrt(d2))}` +
              `<br>M = (${F(num(A.x) + ' + ' + G9.par(B.x), 2)}, ${F(num(A.y) + ' + ' + G9.par(B.y), 2)}) = <b>${P((A.x + B.x) / 2, (A.y + B.y) / 2)}</b>`;
          };
          K.anim(el, an); b.redraw(); return an;
        }
      },
      {
        title: 'Plot it! (game)', intro: 'Click where the given point should be. 10 rounds — how many can you get on the first try?',
        build(el, K) {
          const b = new K.Board(el, { xmin: -8, xmax: 8, ymin: -6, ymax: 6 });
          const rd = K.read(el); let R = G9.rng(G9.newSeed()), tgt, round = 0, score = 0, clicked = null;
          const next = () => { round++; tgt = [R.int(-7, 7), R.int(-5, 5)]; clicked = null; b.redraw(); };
          b.cv.addEventListener('pointerdown', (ev) => {
            if (round > 10) return; const r = b.cv.getBoundingClientRect();
            const x = Math.round(b.ix(ev.clientX - r.left)), y = Math.round(b.iy(ev.clientY - r.top)); clicked = [x, y];
            const ok = x === tgt[0] && y === tgt[1]; if (ok) score++;
            b.redraw(); rd.innerHTML += ok ? ' <span class="ok">✔ Correct!</span>' : ` <span class="no">✘ You clicked ${P(x, y)}.</span>`;
            setTimeout(next, 1100);
          });
          b.onDraw = () => {
            b.base();
            if (round > 10) { rd.innerHTML = `<b>Score: ${score} / 10</b>. Click "New game" to play again.`; return; }
            if (clicked) { b.dot(clicked[0], clicked[1], { color: C.purple }); b.dot(tgt[0], tgt[1], { color: C.orange, label: P(tgt[0], tgt[1]) }); }
            rd.innerHTML = `Round ${round} / 10 · Score ${score} · Plot <b>${P(tgt[0], tgt[1])}</b>`;
          };
          const row = K.row(el); K.button(row, 'New game', () => { R = G9.rng(G9.newSeed()); round = 0; score = 0; next(); }, 'btn');
          next();
          return { step: () => { if (round <= 10) next(); }, play() {}, pause() {} };
        }
      }
    ],

    gens: [
      { title: 'Quadrant or axis', levels: [1, 2], gen(R) {
          const x = R.chance(.2) ? 0 : R.nz(-9, 9), y = R.chance(.2) ? 0 : R.nz(-9, 9);
          return { q: `In which quadrant (or on which axis) does the point ${P(x, y)} lie?`, a: quad(x, y), s: `x is ${x > 0 ? 'positive' : x < 0 ? 'negative' : 'zero'}, y is ${y > 0 ? 'positive' : y < 0 ? 'negative' : 'zero'}.` };
        } },
      { title: 'Distance between two points', gen(R, L) {
          let x1 = R.int(-6, 6), y1 = R.int(-6, 6), dx, dy;
          if (L === 1) { const t = R.pick([[3, 4], [6, 8], [5, 12], [8, 6], [4, 3]]); dx = t[0] * R.sign(); dy = t[1] * R.sign(); }
          else { dx = R.nz(-8, 8); dy = R.nz(-8, 8); }
          const x2 = x1 + dx, y2 = y1 + dy, d2 = dx * dx + dy * dy;
          return { q: `Find the distance between A${P(x1, y1)} and B${P(x2, y2)}.`, a: distH(d2) + (Number.isInteger(Math.sqrt(d2)) ? ' units' : ` ≈ ${num(Math.sqrt(d2))} units`), ans: Math.sqrt(d2), tol: 0.02,
            s: `AB = √[(${num(x2)} − ${G9.par(x1)})² + (${num(y2)} − ${G9.par(y1)})²] = √(${dx * dx} + ${dy * dy}) = √${d2}` };
        } },
      { title: 'Midpoint', gen(R, L) {
          const x1 = R.int(-9, 9), y1 = R.int(-9, 9); let x2 = R.int(-9, 9), y2 = R.int(-9, 9);
          if (L === 1) { if ((x1 + x2) % 2) x2++; if ((y1 + y2) % 2) y2++; }
          return { q: `Find the midpoint of the segment joining P${P(x1, y1)} and Q${P(x2, y2)}.`, a: P((x1 + x2) / 2, (y1 + y2) / 2), s: `M = (${F(`${num(x1)} + ${G9.par(x2)}`, 2)}, ${F(`${num(y1)} + ${G9.par(y2)}`, 2)})` };
        } },
      { title: 'Find the other end', levels: [2, 3], gen(R) {
          const x1 = R.int(-8, 8), y1 = R.int(-8, 8), x2 = R.int(-8, 8), y2 = R.int(-8, 8); const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
          return { q: `M${P(mx, my)} is the midpoint of AB, where A = ${P(x1, y1)}. Find B.`, a: P(x2, y2), s: `B = (2 × ${num(mx)} − ${G9.par(x1)}, 2 × ${num(my)} − ${G9.par(y1)})` };
        } },
      { title: 'Point on the x-axis equidistant from two points', levels: [3], gen(R) {
          let x1, y1, x2, y2, x; do { x1 = R.int(-6, 6); y1 = R.nz(-6, 6); x2 = R.int(-6, 6); y2 = R.nz(-6, 6); } while (x1 === x2);
          x = (x2 * x2 + y2 * y2 - x1 * x1 - y1 * y1) / (2 * (x2 - x1));
          return { q: `Find the point on the x-axis that is equidistant from A${P(x1, y1)} and B${P(x2, y2)}.`, a: `(${G9.Q(x2 * x2 + y2 * y2 - x1 * x1 - y1 * y1, 2 * (x2 - x1))}, 0)`, ans: x,
            s: `Let P = (x, 0). PA² = PB² ⇒ (x − ${G9.par(x1)})² + ${y1 * y1} = (x − ${G9.par(x2)})² + ${y2 * y2} ⇒ ${2 * (x2 - x1)}x = ${x2 * x2 + y2 * y2 - x1 * x1 - y1 * y1}` };
        } },
      { title: 'Is it a right triangle?', levels: [2, 3], gen(R) {
          const x = R.int(-4, 3), y = R.int(-4, 3), a = R.nz(-4, 4), c = R.nz(-4, 4), right = R.chance(.6);
          const k = right ? 1 : R.pick([2, -1]);
          const A = [x, y], B = [x + a, y + c], Cc = [x - c * k, y + a * k + (right ? 0 : 1)];
          const d = (p, q) => (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2;
          const s = [d(A, B), d(B, Cc), d(A, Cc)].sort((m, n) => m - n); const isR = s[0] + s[1] === s[2];
          return { q: `Show whether the triangle with vertices A${P(...A)}, B${P(...B)}, C${P(...Cc)} is right-angled.`, a: isR ? 'Yes, right-angled' : 'No, not right-angled',
            s: `AB² = ${d(A, B)}, BC² = ${d(B, Cc)}, CA² = ${d(A, Cc)}. Two smaller squares: ${s[0]} + ${s[1]} = ${s[0] + s[1]} ${isR ? '=' : '≠'} ${s[2]}.` };
        } },
      { title: 'Rectangle from coordinates', levels: [1, 2], gen(R) {
          const x = R.int(-6, 2), y = R.int(-5, 1), w = R.int(2, 7), hh = R.int(2, 6);
          return { q: `A rectangle has vertices ${P(x, y)}, ${P(x + w, y)}, ${P(x + w, y + hh)} and ${P(x, y + hh)}. Find its perimeter and area.`, a: `Perimeter ${2 * (w + hh)} units, area ${w * hh} sq units`, s: `length = ${w}, breadth = ${hh}` };
        } }
    ],

    quiz: [
      { q: 'The point (−3, 5) lies in', o: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'], a: 1, e: 'x negative, y positive → Quadrant II.' },
      { q: 'The point (0, −7) lies', o: ['on the x-axis', 'on the y-axis', 'in Quadrant IV', 'in Quadrant III'], a: 1, e: 'x = 0 means the point is on the y-axis.' },
      { q: 'Distance of (6, −8) from the origin is', o: ['10', '14', '2', '√28'], a: 0, e: '√(36 + 64) = √100 = 10.' },
      { q: 'Midpoint of (2, 7) and (8, −1) is', o: ['(5, 3)', '(3, 4)', '(10, 6)', '(6, 8)'], a: 0, e: '((2 + 8)/2, (7 − 1)/2) = (5, 3).' },
      { q: 'Distance between (1, 2) and (4, 6) is', o: ['5', '7', '25', '√7'], a: 0, e: '√(3² + 4²) = 5.' },
      { q: 'The perpendicular distance of P(−4, 9) from the x-axis is', o: ['4', '9', '−9', '√97'], a: 1, e: 'Distance from the x-axis is |y| = 9.' },
      { q: 'If (a, 0) and (0, b) are on the axes, the origin is', o: ['(a, b)', '(0, 0)', '(b, a)', '(1, 1)'], a: 1, e: 'The origin is always (0, 0).' },
      { q: 'A(1, 1), B(4, 1), C(1, 5). Triangle ABC is', o: ['equilateral', 'right-angled at A', 'right-angled at B', 'obtuse'], a: 1, e: 'AB is horizontal and AC is vertical, so the angle at A is 90°.' },
      { q: 'Which pair of points is the same distance from the origin?', o: ['(3, 4) and (5, 0)', '(3, 4) and (4, 4)', '(1, 2) and (2, 2)', '(0, 3) and (4, 0)'], a: 0, e: 'Both are 5 units from O.' },
      { q: 'M(3, 2) is the midpoint of AB with A(1, −2). Then B is', o: ['(5, 6)', '(2, 0)', '(4, 4)', '(5, 2)'], a: 0, e: 'B = (2·3 − 1, 2·2 + 2) = (5, 6).' },
      { q: 'Points A(0, 0), B(2, 2), C(5, 5) are', o: ['collinear', 'vertices of a right triangle', 'vertices of an isosceles triangle', 'none of these'], a: 0, e: 'AB + BC = 2√2 + 3√2 = 5√2 = AC.' }
    ],

    teach: {
      outcomes: ['Locate and name points in all four quadrants', 'Derive the distance formula from Baudhāyana–Pythagoras and use it', 'Find and use the midpoint of a segment', 'Use coordinates to classify triangles and check collinearity'],
      periods: [
        { t: 'Why we need coordinates', flow: [['5 min', 'Hook: describe the position of a desk in class using "row and seat" — why two numbers are needed.'], ['15 min', 'Axes, origin, quadrants, sign table. Explore panel 1 on the projector (press S to walk x then y).'], ['15 min', 'Plot-it game (Explore panel 3) in teams; one student plots on the board grid.'], ['5 min', 'Exit ticket Q1–Q2.']] },
        { t: 'Distance formula', flow: [['5 min', 'Recall Baudhāyana–Pythagoras with a 3-4-5 triangle.'], ['15 min', 'Explore panel 2: step through legs → hypotenuse. Generalise to the formula.'], ['15 min', 'Special cases (same x, same y, from origin). Practice tab, Standard level.'], ['5 min', 'Exit ticket Q3.']] },
        { t: 'Midpoint and applications', flow: [['10 min', 'Midpoint as an average; reverse problems (find the other end).'], ['20 min', 'Classify triangles; collinearity by AB + BC = AC; parallelogram by common midpoint of diagonals.'], ['10 min', 'Quick check quiz (Check tab).']] }
      ],
      misconceptions: ['Students read the y-value first because "up" feels natural — insist on "along the corridor, then up the stairs".', 'Points on axes are given a quadrant. Stress: axes belong to no quadrant.', 'Errors with negatives inside (x₂ − x₁)² — write the brackets every time.'],
      activities: ['Floor grid with masking tape: students stand at called-out coordinates.', 'Map of the school drawn on graph paper; find distances between landmarks.', 'Battleship-style pair game on a 10 × 10 grid.'],
      exit: ['Name the quadrant of (−2, −9).', 'Write any point that lies on the y-axis.', 'Find the distance between (0, 0) and (5, 12).', 'Find the midpoint of (−4, 6) and (2, 0).'],
      homework: 'HOTS extension: find a point on the y-axis equidistant from (2, 3) and (−4, 1).'
    },

    slides: [
      { t: 'Orienting Yourself: The Use of Coordinates', b: ['Every point of a plane gets an address (x, y)', 'Axes · origin · quadrants', 'Distance and midpoint formulas', 'Using coordinates to prove things'] },
      { t: 'The Cartesian plane', b: ['x-axis (horizontal) and y-axis (vertical) meet at O(0, 0)', 'Four quadrants, numbered anticlockwise from top-right', 'Signs: I (+,+) · II (−,+) · III (−,−) · IV (+,−)', 'Points on an axis belong to no quadrant'] },
      { t: 'Reading a point P(x, y)', b: ['x = abscissa: move right (+) or left (−)', 'y = ordinate: move up (+) or down (−)', 'Order matters: (2, 5) ≠ (5, 2)', 'Distance from x-axis = |y|, from y-axis = |x|'] },
      { t: 'Distance formula', b: ['Join A(x₁, y₁) and B(x₂, y₂); complete a right triangle', 'Legs: |x₂ − x₁| and |y₂ − y₁|', 'AB = √[(x₂ − x₁)² + (y₂ − y₁)²]', 'From the origin: OP = √(x² + y²)'] },
      { t: 'Worked example', b: ['A(−1, 2), B(5, 10)', 'Δx = 6, Δy = 8', 'AB = √(36 + 64) = √100 = 10 units'] },
      { t: 'Midpoint formula', b: ['Midpoint = average of coordinates', `M = (${F('x₁ + x₂', '2')}, ${F('y₁ + y₂', '2')})`, 'Reverse: B = (2Mₓ − x₁, 2Mᵧ − y₁)'] },
      { t: 'Proving with coordinates', b: ['Right triangle: check a² + b² = c²', 'Isosceles: two equal sides', 'Collinear: AB + BC = AC', 'Parallelogram: diagonals share a midpoint'] },
      { t: 'Check yourself', b: ['Quadrant of (4, −3)?', 'Distance from (1, 1) to (4, 5)?', 'Midpoint of (−2, 6) and (8, 0)?', 'Answers: IV · 5 · (3, 3)'] }
    ]
  });
})();
