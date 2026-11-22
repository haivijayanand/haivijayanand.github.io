/*
TOOL:    class9_maths_ch09
FAMILY:  CBSE_REVISION / Class 9 Maths (Ganita Manjari)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class 9 Maths full build
CHANGES: 1.0.0 - Ch 9 Propositions and their Converses - revise (incl. lines & angles), 4 explore panels (converse cards, transversal, counterexample hunter, Pythagoras converse), 8 generators, quiz, lesson plan, slides
*/
(function () {
  const { num, C } = G9;
  // [proposition, converse, converse true?, counterexample / note]
  const BANK = [
    ['If a number is divisible by 4, then it is even.', 'If a number is even, then it is divisible by 4.', false, '6 is even but not divisible by 4.'],
    ['If n is even, then n² is even.', 'If n² is even, then n is even.', true, 'If n were odd, n² would be odd.'],
    ['If a quadrilateral is a square, then all its sides are equal.', 'If all sides of a quadrilateral are equal, then it is a square.', false, 'A rhombus with angles 60° and 120°.'],
    ['If two angles are vertically opposite, then they are equal.', 'If two angles are equal, then they are vertically opposite.', false, 'Two 40° angles in different places.'],
    ['If a triangle has a right angle, then the square of the longest side equals the sum of squares of the other two (Baudhāyana–Pythagoras).', 'If the square of the longest side equals the sum of squares of the other two, then the triangle has a right angle.', true, 'The converse of Baudhāyana–Pythagoras is a theorem.'],
    ['If two sides of a triangle are equal, then the angles opposite them are equal.', 'If two angles of a triangle are equal, then the sides opposite them are equal.', true, 'Both directions hold for triangles.'],
    ['If two parallel lines are cut by a transversal, then alternate angles are equal.', 'If a transversal makes equal alternate angles with two lines, then the lines are parallel.', true, 'This is how we test for parallel lines.'],
    ['If a number ends in 0, then it is divisible by 5.', 'If a number is divisible by 5, then it ends in 0.', false, '15 is divisible by 5 but ends in 5.'],
    ['If x = 3, then x² = 9.', 'If x² = 9, then x = 3.', false, 'x = −3 also gives x² = 9.'],
    ['If a quadrilateral is a rectangle, then its diagonals are equal.', 'If the diagonals of a quadrilateral are equal, then it is a rectangle.', false, 'An isosceles trapezium has equal diagonals.'],
    ['If a quadrilateral is a parallelogram, then its diagonals bisect each other.', 'If the diagonals of a quadrilateral bisect each other, then it is a parallelogram.', true, 'Proved in Ch 12.'],
    ['If two numbers are both odd, then their sum is even.', 'If the sum of two numbers is even, then both are odd.', false, '2 + 4 = 6 is even, but 2 and 4 are even.'],
    ['If a triangle is equilateral, then each angle is 60°.', 'If each angle of a triangle is 60°, then it is equilateral.', true, 'Equal angles ⇒ equal opposite sides.'],
    ['If it is raining, then the ground is wet.', 'If the ground is wet, then it is raining.', false, 'Someone may have watered the garden.'],
    ['If a number is a multiple of 6, then it is a multiple of 3.', 'If a number is a multiple of 3, then it is a multiple of 6.', false, '9 is a multiple of 3 but not of 6.'],
    ['If two angles form a linear pair, then they add up to 180°.', 'If two angles add up to 180°, then they form a linear pair.', false, 'Co-interior angles 110° and 70° on parallel lines are not adjacent.']
  ];
  const CLAIMS = [
    ['n² + n + 41 is prime for every whole number n.', 'n = 40: 40² + 40 + 41 = 1681 = 41².'],
    ['Every odd number greater than 1 is prime.', '9 = 3 × 3.'],
    ['The square of any number is larger than the number.', '(½)² = ¼ < ½, and 1² = 1.'],
    ['If a < b then a² < b².', 'a = −3, b = 2: 9 > 4.'],
    ['Every quadrilateral with four equal sides is a square.', 'A rhombus with a 60° angle.'],
    ['The sum of two irrational numbers is irrational.', '√2 + (−√2) = 0.'],
    ['2ⁿ − 1 is prime whenever n is prime.', 'n = 11: 2047 = 23 × 89.'],
    ['Dividing always makes a number smaller.', '6 ÷ ½ = 12.'],
    ['A number with an even number of factors is prime.', '6 has factors 1, 2, 3, 6 (four factors) but is not prime.'],
    ['Any two right triangles with a common hypotenuse length are congruent.', 'Sides 3, 4, 5 and √(25 − 1), 1, 5.']
  ];

  G9.register({
    no: 9, part: 'Part II', short: 'Propositions & converses', title: 'Propositions and their Converses',
    blurb: 'If–then statements, converses, counterexamples and proof — with lines, angles and triangles.',
    revise: {
      oneLine: 'Mathematics runs on "if P, then Q" statements. Swapping P and Q gives the converse, which may or may not be true: one counterexample is enough to show a statement is false, but a true statement needs a proof.',
      sections: [
        { h: 'Propositions', html: `<p>A <b>proposition</b> is a statement that is either true or false (not both). "7 is prime" is a proposition; "Close the door" is not.</p>
          <p>Most theorems have the form <b>If P, then Q</b> (P ⇒ Q). P is the <b>hypothesis</b> (what is given), Q is the <b>conclusion</b> (what follows).</p>` },
        { h: 'Converse', html: `<p>The <b>converse</b> of "If P, then Q" is "If Q, then P".</p>
          <ul><li>True with true converse: "If a triangle has two equal sides, its base angles are equal" — converse also true. Then we say P <b>if and only if</b> Q (P ⇔ Q).</li>
          <li>True with false converse: "If x = 3 then x² = 9"; converse fails for x = −3.</li></ul>` },
        { h: 'Counterexamples and proof', html: `<p>To show "for all…" is <b>false</b>, one <b>counterexample</b> is enough. To show it is <b>true</b>, checking examples is never enough — we need a <b>proof</b>: a chain of steps, each justified by a definition, an axiom or an earlier theorem.</p>
          <p>Famous warning: n² + n + 41 is prime for n = 0, 1, …, 39 — but not for n = 40.</p>` },
        { h: 'Lines and angles (the facts used in proofs)', html: `<ul><li>Linear pair: adjacent angles on a straight line add to 180°.</li><li>Vertically opposite angles are equal.</li>
          <li>Parallel lines cut by a transversal: corresponding angles equal, alternate angles equal, co-interior angles add to 180°. <b>Converses also true</b> — these are the tests for parallel lines.</li>
          <li>Angle sum of a triangle = 180°; exterior angle = sum of the two interior opposite angles.</li></ul>` },
        { h: 'Triangles', html: `<ul><li>Congruence tests: SSS, SAS, ASA (or AAS), RHS.</li><li>Isosceles: equal sides ⇔ equal opposite angles.</li>
          <li>Baudhāyana–Pythagoras: right angle at C ⇔ a² + b² = c² (both directions true).</li></ul>` }
      ],
      formulas: [['Converse of P ⇒ Q', 'Q ⇒ P'], ['If and only if', 'P ⇔ Q: both directions true'], ['Linear pair', '∠1 + ∠2 = 180°'], ['Parallel lines', 'alternate = corresponding; co-interior sum 180°'], ['Triangle', '∠A + ∠B + ∠C = 180°'], ['Exterior angle', '= sum of interior opposite angles']],
      terms: [['Hypothesis', 'the "if" part'], ['Conclusion', 'the "then" part'], ['Counterexample', 'one case where the hypothesis holds but the conclusion fails'], ['Theorem', 'a proposition that has been proved']],
      traps: ['Thinking a true statement always has a true converse.', 'Believing many examples prove a statement.', 'A "counterexample" that does not satisfy the hypothesis is not a counterexample.', 'Co-interior angles are supplementary, not equal.'],
      bridge: '<p>Ch 12 proves the properties of parallelograms (and their converses) with these tools. Ch 5 used them for circle theorems.</p>'
    },

    explore: [
      {
        title: 'Converse cards', intro: 'Read the proposition, think about its converse, then press <kbd>S</kbd> to reveal the converse and the verdict.',
        build(el, K) {
          const box = K.h('div', { cls: 'read', style: 'font-family:Segoe UI;font-size:18px;min-height:150px' }); el.appendChild(box);
          let order = G9.rng(G9.newSeed()).shuffle(BANK.map((_, i) => i)), k = 0;
          const an = new K.Anim(Infinity, (i) => { k = Math.floor(i / 3) % order.length; draw(i % 3); }, { ms: 2200 });
          function draw(stage) {
            const [p, c, ok, n] = BANK[order[k]];
            box.innerHTML = `<div class="pill">Card ${k + 1} / ${order.length}</div><p><b>Proposition:</b> ${p}</p>` + (stage >= 1 ? `<p><b>Converse:</b> ${c}</p>` : '<p class="muted">What is the converse? Is it true?</p>') +
              (stage >= 2 ? `<p class="${ok ? 'ok' : 'no'}">Converse is ${ok ? 'TRUE' : 'FALSE'} — ${n}</p>` : '');
          }
          K.anim(el, an); draw(0); return an;
        }
      },
      {
        title: 'Transversal and parallel lines', intro: 'Tilt line m. Alternate angles become equal exactly when m ∥ l — the converse in action.',
        build(el, K) {
          let tilt = 8, tAng = 60; const row = K.row(el);
          const b = new K.Board(el, { xmin: -9, xmax: 9, ymin: -5, ymax: 5, axes: false, grid: 0 });
          const rd = K.read(el);
          K.slider(row, 'transversal angle', 30, 150, 1, tAng, v => { tAng = v; b.redraw(); });
          K.slider(row, 'tilt of line m', -20, 20, 1, tilt, v => { tilt = v; b.redraw(); });
          b.onDraw = () => {
            b.clear(); const t = tAng * Math.PI / 180, m = Math.tan(tilt * Math.PI / 180);
            b.line(-9, -2, 9, -2, { color: C.blue, w: 3 }); b.text(8.4, -1.6, 'l', { font: 'italic bold 18px', color: C.blue });
            b.line(-9, 2 - 9 * m, 9, 2 + 9 * m, { color: C.purple, w: 3 }); b.text(8.4, 2 + 9 * m + 0.4, 'm', { font: 'italic bold 18px', color: C.purple });
            // transversal through (0,-2) direction t
            const dx = Math.cos(t), dy = Math.sin(t); b.line(-dx * 9, -2 - dy * 9, dx * 9, -2 + dy * 9, { color: C.ink, w: 2 });
            // intersection with m: (s dx, -2 + s dy) on y = 2 + m x  -> -2 + s dy = 2 + m s dx
            const s = 4 / (dy - m * dx), ix = s * dx, iy = -2 + s * dy;
            const a1 = tAng; // angle between l (rightwards) and transversal (upwards) at P, measured above-right
            b.arc(0, -2, 0.9, 0, t, { color: C.orange, w: 3 }); b.text(1.4 * Math.cos(t / 2), -2 + 1.4 * Math.sin(t / 2), num(a1) + '°', { font: 'bold 14px', color: C.orange });
            const mAngL = Math.PI + tilt * Math.PI / 180; b.arc(ix, iy, 0.9, mAngL, t + Math.PI, { color: C.orange, w: 3 });
            const mid = (mAngL + t + Math.PI) / 2; b.text(ix + 1.5 * Math.cos(mid), iy + 1.5 * Math.sin(mid), num(tAng - tilt) + '°', { font: 'bold 14px', color: C.orange });
            b.dot(0, -2, { color: C.blue, r: 4, label: 'P' }); b.dot(ix, iy, { color: C.purple, r: 4, label: 'Q' });
            const par = tilt === 0;
            rd.innerHTML = `Alternate angles: ∠ at P = <b>${num(a1)}°</b>, ∠ at Q = <b>${num(tAng - tilt)}°</b> → ${par ? '<span class="ok">equal ⇒ l ∥ m</span>' : '<span class="no">not equal ⇒ l and m are not parallel (they meet somewhere)</span>'}`;
          };
          b.redraw(); return null;
        }
      },
      {
        title: 'Counterexample hunter', intro: 'Each claim seems true for small cases. Use the slider to test n until it breaks.',
        build(el, K) {
          const fns = [['n² + n + 41 is prime', n => n * n + n + 41], ['2ⁿ − 1 is prime when n is prime', n => 2 ** n - 1]];
          const isP = (x) => { if (x < 2) return false; for (let d = 2; d * d <= x; d++) if (x % d === 0) return d; return true; };
          const isPrimeN = (n) => isP(n) === true;
          let f = 0, n = 1; const row = K.row(el); K.select(row, 'Claim', fns.map(x => x[0]), i => { f = i; draw(); });
          K.slider(row, 'n', 0, 45, 1, n, v => { n = v; draw(); }); const rd = K.read(el);
          function draw() {
            if (f === 1 && !isPrimeN(n)) { rd.innerHTML = `n = ${n} is not prime, so this case does not test the claim (hypothesis false).`; return; }
            const v = fns[f][1](n), p = isP(v);
            rd.innerHTML = `n = ${n}: value = <b>${v}</b> → ${p === true ? '<span class="ok">prime ✔</span> (claim survives… for now)' : `<span class="no">NOT prime: ${v} = ${p} × ${v / p}</span> — a counterexample! The claim is false.`}`;
          }
          draw(); return null;
        }
      },
      {
        title: 'Converse of Baudhāyana–Pythagoras', intro: 'Drag C. The angle at C is 90° exactly when a² + b² = c².',
        build(el, K) {
          const b = new K.Board(el, { xmin: -1, xmax: 11, ymin: -1, ymax: 7 });
          const A = b.addPt(0, 0, { label: 'A', fixed: true, color: C.blue }), B = b.addPt(10, 0, { label: 'B', fixed: true, color: C.blue }), P = b.addPt(3.6, 4.8, { label: 'C', snap: 0.1 });
          const rd = K.read(el);
          b.onDraw = () => {
            b.base(); b.poly([[A.x, A.y], [B.x, B.y], [P.x, P.y]], { fill: C.blueL, color: C.blue }); b.circle(5, 0, 5, { color: C.grey, w: 1, dash: [4, 4] });
            const a = Math.hypot(P.x - B.x, P.y - B.y), bb = Math.hypot(P.x - A.x, P.y - A.y), c = 10;
            const ang = Math.acos(((A.x - P.x) * (B.x - P.x) + (A.y - P.y) * (B.y - P.y)) / (a * bb)) * 180 / Math.PI;
            b.drawPts();
            rd.innerHTML = `a² + b² = ${num(a * a, 1)} + ${num(bb * bb, 1)} = <b>${num(a * a + bb * bb, 1)}</b>; c² = <b>100</b> &nbsp;·&nbsp; ∠C = <b>${num(ang, 1)}°</b> ${Math.abs(a * a + bb * bb - 100) < 0.6 ? '<span class="ok">— right angle!</span>' : a * a + bb * bb < 100 ? '(obtuse: a² + b² < c²)' : '(acute: a² + b² > c²)'}<br><span class="muted">The dashed circle (diameter AB) is where ∠C = 90° — compare with Ch 5.</span>`;
          };
          b.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Write the converse', gen(R) {
          const [p, c, ok, n] = R.pick(BANK);
          return { q: `Write the converse of: "${p}" Is the converse true? Justify.`, a: `Converse: "${c}" — ${ok ? 'TRUE' : 'FALSE'}. ${n}` };
        } },
      { title: 'Hypothesis and conclusion', levels: [1], gen(R) {
          const [p] = R.pick(BANK); const m = p.match(/^If (.*?), then (.*)\.?$/);
          return { q: `Identify the hypothesis and the conclusion: "${p}"`, a: m ? `Hypothesis: ${m[1]}. Conclusion: ${m[2].replace(/\.$/, '')}.` : p };
        } },
      { title: 'Find a counterexample', levels: [2, 3], gen(R) {
          const [c, n] = R.pick(CLAIMS); return { q: `Give a counterexample to the claim: "${c}"`, a: n };
        } },
      { title: 'Parallel lines and a transversal', gen(R, L) {
          const a = R.int(35, 145); const kinds = [['corresponding', a], ['alternate interior', a], ['co-interior (same side interior)', 180 - a], ['vertically opposite', a]];
          const [k, v] = R.pick(kinds);
          if (L === 3) { const x = R.int(12, 30), p = R.int(2, 4), q = 180 - p * x; return { q: `Lines l ∥ m are cut by a transversal. Two co-interior angles are (${p}x)° and (x + ${q - x})°. Find x and both angles.`, a: `x = ${x}; ${p * x}° and ${q}°`, ans: x, s: `${p}x + x + ${q - x} = 180 ⇒ ${p + 1}x = ${180 - q + x}` }; }
          return { q: `Two parallel lines are cut by a transversal. One angle is ${a}°. Find the ${k} angle to it.`, a: `${v}°`, ans: v, s: k.startsWith('co') ? 'Co-interior angles add to 180°.' : `${k[0].toUpperCase() + k.slice(1)} angles are equal.` };
        } },
      { title: 'Linear pair and vertical angles', levels: [1, 2], gen(R, L) {
          if (L === 1) { const a = R.int(20, 160); return { q: `Two angles form a linear pair. One is ${a}°. Find the other, and the angle vertically opposite to the first.`, a: `${180 - a}°; ${a}°`, s: 'Linear pair sums to 180°; vertically opposite angles are equal.' }; }
          const x = R.int(10, 40), k = R.int(2, 4), c = R.int(5, 30), other = 180 - (k * x + c);
          if (other <= 5) return this.gen(R, 1);
          return { q: `Two angles of a linear pair are (${k}x + ${c})° and ${other}°. Find x.`, a: `x = ${x}`, ans: x, s: `${k}x + ${c} + ${other} = 180` };
        } },
      { title: 'Triangle angles', gen(R, L) {
          const A = R.int(25, 90), B = R.int(20, 150 - A), Cc = 180 - A - B;
          if (L === 1) return { q: `In △ABC, ∠A = ${A}° and ∠B = ${B}°. Find ∠C.`, a: `${Cc}°`, ans: Cc, s: '180° − ∠A − ∠B' };
          if (L === 2) return { q: `Side BC of △ABC is extended to D. ∠A = ${A}°, ∠B = ${B}°. Find exterior ∠ACD.`, a: `${A + B}°`, ans: A + B, s: 'Exterior angle = sum of interior opposite angles' };
          const k = R.int(2, 3); return { q: `The angles of a triangle are in the ratio 1 : ${k} : ${k + 1}. Find all three angles.`, a: `x = ${num(180 / (2 * k + 2))}; angles ${num(180 / (2 * k + 2))}°, ${num(180 * k / (2 * k + 2))}°, ${num(180 * (k + 1) / (2 * k + 2))}°`, ans: 180 / (2 * k + 2), s: `x + ${k}x + ${k + 1}x = 180` };
        } },
      { title: 'Is it right-angled? (converse)', gen(R) {
          const T = R.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [4, 5, 6], [5, 6, 8], [6, 7, 9], [9, 12, 16], [20, 21, 29], [9, 40, 41], [7, 8, 11]]);
          const ok = T[0] ** 2 + T[1] ** 2 === T[2] ** 2;
          return { q: `A triangle has sides ${T[0]} cm, ${T[1]} cm and ${T[2]} cm. Is it right-angled? Which theorem do you use?`, a: `${ok ? 'Yes' : 'No'} — ${T[0]}² + ${T[1]}² = ${T[0] ** 2 + T[1] ** 2} ${ok ? '=' : '≠'} ${T[2]}² = ${T[2] ** 2}. Uses the converse of Baudhāyana–Pythagoras.` };
        } },
      { title: 'Are the lines parallel?', levels: [2, 3], gen(R) {
          const a = R.int(40, 140), d = R.pick([0, 0, 2, -3, 5]), kind = R.pick(['co-interior', 'alternate']);
          const b2 = kind === 'alternate' ? a + d : 180 - a + d;
          const par = d === 0;
          return { q: `A transversal cuts lines l and m. A pair of ${kind} angles measure ${a}° and ${b2}°. Are l and m parallel?`, a: par ? `Yes — ${kind === 'alternate' ? 'alternate angles are equal' : 'co-interior angles add to 180°'}, so by the converse, l ∥ m.` : `No — ${kind === 'alternate' ? 'alternate angles are not equal' : `co-interior angles add to ${a + b2}°, not 180°`}.` };
        } }
    ],

    quiz: [
      { q: 'The converse of "If P, then Q" is', o: ['If not P, then not Q', 'If Q, then P', 'If not Q, then not P', 'P and Q'], a: 1, e: 'Swap hypothesis and conclusion.' },
      { q: '"If a number is divisible by 10 then it is divisible by 5." Its converse is', o: ['true', 'false (e.g. 15)', 'true only for even numbers', 'not a proposition'], a: 1, e: '15 is divisible by 5 but not by 10.' },
      { q: 'How many counterexamples are needed to disprove a "for all" statement?', o: ['one', 'two', 'ten', 'it cannot be disproved'], a: 0, e: 'One is enough.' },
      { q: 'Which statement has a true converse?', o: ['If x = 2 then x² = 4', 'If a figure is a square then it is a rectangle', 'If two sides of a triangle are equal then the opposite angles are equal', 'If n is a multiple of 4 then n is even'], a: 2, e: 'Equal angles ⇒ equal opposite sides.' },
      { q: 'Co-interior angles on parallel lines are', o: ['equal', 'supplementary', 'complementary', 'vertically opposite'], a: 1, e: 'They add to 180°.' },
      { q: 'Sides 9, 12, 15 form', o: ['an acute triangle', 'a right triangle', 'an obtuse triangle', 'no triangle'], a: 1, e: '81 + 144 = 225.' },
      { q: 'In "If it rains, the match is cancelled", the hypothesis is', o: ['the match is cancelled', 'it rains', 'it does not rain', 'both'], a: 1, e: 'The "if" part.' },
      { q: 'An exterior angle of a triangle is 110° and one interior opposite angle is 45°. The other is', o: ['65°', '70°', '25°', '135°'], a: 0, e: '110 − 45.' },
      { q: 'Which is NOT a proposition?', o: ['5 > 3', 'Every square is a rectangle', 'Please sit down', '2 + 2 = 5'], a: 2, e: 'A request is neither true nor false.' },
      { q: 'Checking a claim for 100 values of n', o: ['proves it', 'disproves it', 'does not prove it', 'makes it a theorem'], a: 2, e: 'Only a proof shows it holds for all n.' },
      { q: 'If alternate angles made by a transversal are equal, then the lines are', o: ['perpendicular', 'parallel', 'intersecting', 'equal'], a: 1, e: 'Converse of the alternate angle property.' }
    ],

    teach: {
      outcomes: ['Identify propositions, hypotheses and conclusions', 'Form converses and decide whether they are true', 'Use counterexamples to disprove and simple chains of reasoning to prove', 'Apply lines-and-angles and triangle facts in proofs'],
      periods: [
        { t: 'If–then statements', flow: [['10 min', 'Everyday if–then statements; true/false game.'], ['15 min', 'Converse cards (Explore panel 1) with whole class voting.'], ['15 min', 'Students write their own true statements with false converses.']] },
        { t: 'Counterexamples and proof', flow: [['10 min', 'Explore panel 3: n² + n + 41.'], ['15 min', 'Proof that the square of an even number is even; that the converse also holds.'], ['15 min', 'Practice — counterexamples, Standard.']] },
        { t: 'Lines, angles, triangles', flow: [['15 min', 'Explore panel 2: transversal; tests for parallel lines.'], ['15 min', 'Angle sum and exterior angle proofs; Explore panel 4 (Pythagoras converse).'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['A true statement must have a true converse.', 'Examples are a proof.', 'Co-interior angles are equal.'],
      activities: ['Converse card sort (true / false) in groups.', 'Debate: "Every rectangle is a square" — find the counterexample.', 'Rope triangle with 3-4-5 knots to make a right angle (Śulba-sūtra method).'],
      exit: ['Write the converse of "If a number is prime and greater than 2, then it is odd." Is it true?', 'Give a counterexample to "All multiples of 3 are odd."', 'Alternate angles 72° and 72° — what can you say about the lines?'],
      homework: 'Find two statements from your Science book and write their converses. Are they true?'
    },

    slides: [
      { t: 'Propositions and their Converses', b: ['Propositions: true or false', 'If P, then Q', 'Converses and counterexamples', 'Proof with lines, angles and triangles'] },
      { t: 'If P, then Q', b: ['P: hypothesis (given)', 'Q: conclusion (follows)', 'Example: If n is even, then n² is even'] },
      { t: 'The converse', b: ['Converse: If Q, then P', 'May be true or false', 'If x = 3 then x² = 9 ✔ — converse ✘ (x = −3)', 'Both true ⇒ P if and only if Q'] },
      { t: 'Counterexamples', b: ['One counterexample disproves a "for all" claim', 'n² + n + 41 is prime… until n = 40', 'Many examples do not prove anything'] },
      { t: 'Lines and angles', b: ['Linear pair: sum 180°', 'Vertically opposite angles are equal', 'Parallel lines: corresponding & alternate equal, co-interior 180°', 'Converses give tests for parallel lines'] },
      { t: 'Triangles', b: ['Angle sum 180°; exterior angle = sum of opposite interior angles', 'Equal sides ⇔ equal opposite angles', 'Right angle ⇔ a² + b² = c²'] },
      { t: 'Check yourself', b: ['Converse of "If a shape is a square, it has 4 right angles"?', 'True or false?', 'Counterexample: a rectangle that is not a square'] }
    ]
  });
})();
