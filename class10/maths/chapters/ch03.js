/*
TOOL:    class10_maths_ch03
FAMILY:  CBSE_REVISION / Class 10 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 3 Pair of Linear Equations in Two Variables - revise, board focus, 2 explore panels (two lines + ratio test, elimination steps), 8 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { F, Q, num, C, terms, par } = G9;
  const eq = (a, b, c) => `${terms([[a, 'x'], [b, 'y']])} = ${num(c)}`;
  const P = (x, y) => `(${num(x)}, ${num(y)})`;

  G9.register({
    no: 3, part: 'Unit II · Algebra (20 marks)', short: 'Linear equations pair', title: 'Pair of Linear Equations in Two Variables',
    blurb: 'Graphical meaning, consistency from ratios, substitution and elimination, word problems.',
    revise: {
      oneLine: 'Two linear equations are two lines. They meet once (unique solution), never (parallel — no solution) or coincide (infinitely many). The ratios of the coefficients tell which, and substitution or elimination finds the point.',
      sections: [
        { h: 'Graphical meaning', html: `<p>a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0 are two straight lines.</p>
          <table class="t"><tr><th>Lines</th><th>Ratio test</th><th>Solutions</th><th>System</th></tr>
          <tr><td>Intersecting</td><td>a₁/a₂ ≠ b₁/b₂</td><td>exactly one</td><td>consistent</td></tr>
          <tr><td>Parallel</td><td>a₁/a₂ = b₁/b₂ ≠ c₁/c₂</td><td>none</td><td>inconsistent</td></tr>
          <tr><td>Coincident</td><td>a₁/a₂ = b₁/b₂ = c₁/c₂</td><td>infinitely many</td><td>consistent (dependent)</td></tr></table>` },
        { h: 'Substitution method', html: `<ol><li>Make x or y the subject of one equation.</li><li>Substitute into the other → one equation in one variable.</li><li>Solve, then back-substitute. Check in both equations.</li></ol>` },
        { h: 'Elimination method', html: `<ol><li>Multiply the equations so one variable has equal (or opposite) coefficients.</li><li>Subtract (or add) to eliminate it.</li><li>Solve, back-substitute, check.</li></ol>
          <p>If elimination gives a true statement like 0 = 0 → infinitely many solutions; a false one like 0 = 5 → no solution.</p>` },
        { h: 'Word problems', html: `<ul><li>Choose two unknowns and say what they are ("let the cost of a pen be ₹x").</li><li><b>Ages</b>: "five years ago" → x − 5, y − 5. <b>Digits</b>: number 10x + y, reversed 10y + x. <b>Fractions</b>: x/y. <b>Speed</b>: distance = speed × time; with/against a current: u ± v.</li><li>Answer the question in words with units.</li></ul>` }
      ],
      formulas: [['Unique solution', 'a₁/a₂ ≠ b₁/b₂'], ['No solution', 'a₁/a₂ = b₁/b₂ ≠ c₁/c₂'], ['Infinitely many', 'a₁/a₂ = b₁/b₂ = c₁/c₂'], ['Two-digit number', '10x + y'], ['Upstream / downstream', 'u − v / u + v']],
      terms: [['Consistent', 'has at least one solution'], ['Inconsistent', 'has no solution'], ['Dependent', 'infinitely many solutions (same line)'], ['Solution', 'pair (x, y) satisfying both equations']],
      traps: ['Comparing a₁/a₂ with c₁/c₂ when the equations are not in the same form (put both as ax + by + c = 0 or both as ax + by = c).', 'Subtracting when the coefficients have opposite signs (add instead).', 'Not checking the answer in both equations.', 'Digit problems: reversing the number but not the digits\' place values.'],
      board: '<p><b>Unit II (Algebra) — 20 marks.</b> Expect: a 1-mark MCQ on consistency or the value of k; a 2–3 mark solve by substitution/elimination; a 3–5 mark word problem (ages, fractions, digits, cost, speed). Define variables clearly — marks are given for forming the equations.</p>',
      bridge: '<p>Class 9 Ch 13 (Two Variables, One Line) covered single linear equations and their graphs.</p>'
    },

    explore: [
      {
        title: 'Two lines and the ratio test', intro: 'Change the coefficients. The ratio test predicts what the graph shows.',
        build(el, K) {
          let a1 = 1, b1 = 2, c1 = 8, a2 = 2, b2 = -1, c2 = 1; const r1 = K.row(el), r2 = K.row(el);
          const b = new K.Board(el, { xmin: -8, xmax: 8, ymin: -7, ymax: 7 }); const rd = K.read(el);
          [['a₁', v => a1 = v, a1], ['b₁', v => b1 = v, b1], ['c₁', v => c1 = v, c1]].forEach(s => K.slider(r1, s[0], s[0] === 'c₁' ? -12 : -5, s[0] === 'c₁' ? 12 : 5, 1, s[2], v => { s[1](v); b.redraw(); }));
          [['a₂', v => a2 = v, a2], ['b₂', v => b2 = v, b2], ['c₂', v => c2 = v, c2]].forEach(s => K.slider(r2, s[0], s[0] === 'c₂' ? -12 : -5, s[0] === 'c₂' ? 12 : 5, 1, s[2], v => { s[1](v); b.redraw(); }));
          b.onDraw = () => {
            b.base(); if ((!a1 && !b1) || (!a2 && !b2)) { rd.innerHTML = 'Each equation needs a non-zero coefficient.'; return; }
            b.infLine(a1, b1, c1, { color: C.blue }); b.infLine(a2, b2, c2, { color: C.orange, dash: [9, 5] });
            const D = a1 * b2 - a2 * b1; const rat = (p, q) => q === 0 ? (p === 0 ? '0/0' : '∞') : Q(p, q);
            let msg = `a₁/a₂ = ${rat(a1, a2)}, b₁/b₂ = ${rat(b1, b2)}, c₁/c₂ = ${rat(c1, c2)}<br>`;
            if (D !== 0) { const x = (c1 * b2 - c2 * b1) / D, y = (a1 * c2 - a2 * c1) / D; b.dot(x, y, { color: C.purple, label: P(x, y) }); msg += `a₁/a₂ ≠ b₁/b₂ ⇒ <b>intersecting</b>: unique solution x = ${num(x)}, y = ${num(y)}.`; }
            else if (a1 * c2 === a2 * c1 && b1 * c2 === b2 * c1) msg += 'All three ratios equal ⇒ <b>coincident</b>: infinitely many solutions.';
            else msg += 'a₁/a₂ = b₁/b₂ ≠ c₁/c₂ ⇒ <b>parallel</b>: no solution (inconsistent).';
            rd.innerHTML = `<span style="color:var(--blue)">${eq(a1, b1, c1)}</span> &nbsp;·&nbsp; <span style="color:var(--orange)">${eq(a2, b2, c2)}</span><br>` + msg;
          };
          b.redraw(); return null;
        }
      },
      {
        title: 'Elimination, step by step', intro: 'Press <kbd>S</kbd> for each step. "New system" gives fresh numbers.',
        build(el, K) {
          const rd = K.read(el); rd.style.fontSize = '18px'; let R = G9.rng(G9.newSeed()), sys;
          const make = () => { let a1, b1, a2, b2; do { a1 = R.nz(-5, 5); b1 = R.nz(-5, 5); a2 = R.nz(-5, 5); b2 = R.nz(-5, 5); } while (a1 * b2 === a2 * b1 || Math.abs(a1) === Math.abs(a2));
            const x = R.int(-5, 5), y = R.int(-5, 5); sys = { a1, b1, a2, b2, x, y, c1: a1 * x + b1 * y, c2: a2 * x + b2 * y }; an.reset(); };
          const an = new K.Anim(6, () => draw(), { ms: 1300 });
          function draw() {
            const { a1, b1, a2, b2, x, y, c1, c2 } = sys, L = Math.abs(b1 * b2) / G9.gcd(b1, b2), m1 = L / b1, m2 = L / b2;
            const st = [`(1) ${eq(a1, b1, c1)}<br>(2) ${eq(a2, b2, c2)}`,
              `Make the y-coefficients equal: (1) × ${par(m1)}, (2) × ${par(m2)}<br>${eq(a1 * m1, L, c1 * m1)}<br>${eq(a2 * m2, L, c2 * m2)}`,
              `Subtract: ${terms([[a1 * m1 - a2 * m2, 'x']])} = ${num(c1 * m1 - c2 * m2)}`,
              `x = ${num(c1 * m1 - c2 * m2)} ÷ ${par(a1 * m1 - a2 * m2)} = <b>${x}</b>`,
              `Put x = ${x} in (1): ${terms([[b1, 'y']])} = ${c1} − ${par(a1 * x)} ⇒ y = <b>${y}</b>`,
              `Check in (2): ${a2}×${par(x)} + ${b2}×${par(y)} = ${a2 * x + b2 * y} = ${c2} ✔ &nbsp; Solution (${x}, ${y})`];
            rd.innerHTML = st.slice(0, an.i + 1).join('<hr style="border:none;border-top:1px dashed var(--line)">');
          }
          const row = K.row(el); K.button(row, 'New system', make, 'btn');
          sys = { a1: 3, b1: 2, a2: 2, b2: -3, x: 2, y: 1, c1: 8, c2: 1 }; K.anim(el, an); draw(); return an;
        }
      }
    ],

    gens: [
      { title: 'Consistent or inconsistent?', gen(R) {
          const a = R.nz(-5, 5), b = R.nz(-5, 5), c = R.nz(-9, 9), k = R.pick([2, 3, -2]); const t = R.int(0, 2);
          const a2 = t === 0 ? a * k + R.pick([1, -1]) : a * k, b2 = b * k, c2 = t === 2 ? c * k : c * k + R.pick([1, 2, -3]);
          const ans = t === 0 ? 'intersecting — unique solution (consistent)' : t === 1 ? 'parallel — no solution (inconsistent)' : 'coincident — infinitely many solutions (consistent)';
          return { q: `Without solving, decide whether the pair ${eq(a, b, c)} and ${eq(a2, b2, c2)} has a unique solution, no solution or infinitely many.`, a: ans, s: `a₁/a₂ = ${Q(a, a2)}, b₁/b₂ = ${Q(b, b2)}, c₁/c₂ = ${Q(c, c2)}` };
        } },
      { title: 'Find k (no solution / infinitely many)', levels: [2, 3], gen(R) {
          const a = R.int(1, 5), b = R.int(1, 5), c = R.int(1, 9), m = R.int(2, 4); const none = R.chance(.5);
          return none ? { q: `For what value of k does the pair ${eq(a, b, c)} and ${a * m}x + ky = ${c * m + 1} have no solution?`, a: `k = ${b * m}`, ans: b * m, s: `a₁/a₂ = b₁/b₂ ⇒ ${a}/${a * m} = ${b}/k; and c ratio differs` }
            : { q: `For what value of k does the pair ${eq(a, b, c)} and ${a * m}x + ${b * m}y = k have infinitely many solutions?`, a: `k = ${c * m}`, ans: c * m, s: `all ratios equal to 1/${m}` };
        } },
      { title: 'Solve by substitution', gen(R) {
          const x = R.int(-6, 6), y = R.int(-6, 6), b2 = R.nz(-4, 4), a2 = R.nz(-4, 4); const c1 = x + y, c2 = a2 * x + b2 * y; if (a2 === b2) return this.gen(R);
          return { q: `Solve by substitution: x + y = ${c1}, ${eq(a2, b2, c2)}.`, a: `x = ${x}, y = ${y}`, s: `y = ${c1} − x; ${a2}x + ${b2}(${c1} − x) = ${c2} ⇒ ${a2 - b2}x = ${c2 - b2 * c1}` };
        } },
      { title: 'Solve by elimination', gen(R, L) {
          let a1, b1, a2, b2; do { a1 = R.nz(-6, 6); b1 = R.nz(-6, 6); a2 = R.nz(-6, 6); b2 = R.nz(-6, 6); } while (a1 * b2 === a2 * b1);
          const x = R.int(-6, 6), y = R.int(-6, 6);
          return { q: `Solve by elimination: ${eq(a1, b1, a1 * x + b1 * y)} and ${eq(a2, b2, a2 * x + b2 * y)}.`, a: `x = ${x}, y = ${y}`, s: 'Make one coefficient equal, subtract (or add), solve, back-substitute, check.' };
        } },
      { title: 'Cost problem', gen(R) {
          const p = R.int(3, 20) * 5, q = R.int(3, 20) * 5, a1 = R.int(1, 5), b1 = R.int(1, 5), a2 = R.int(1, 5), b2 = R.int(1, 5); if (a1 * b2 === a2 * b1) return this.gen(R);
          const it = R.pick([['pens', 'notebooks'], ['bats', 'balls'], ['kg of apples', 'kg of grapes'], ['chairs', 'tables']]);
          return { q: `${a1} ${it[0]} and ${b1} ${it[1]} cost ₹${a1 * p + b1 * q}; ${a2} ${it[0]} and ${b2} ${it[1]} cost ₹${a2 * p + b2 * q}. Find the cost of one of each.`, a: `${it[0]}: ₹${p} each, ${it[1]}: ₹${q} each`, s: `${a1}x + ${b1}y = ${a1 * p + b1 * q}, ${a2}x + ${b2}y = ${a2 * p + b2 * q}` };
        } },
      { title: 'Ages', levels: [2, 3], gen(R) {
          const s = R.int(8, 20), f = s + R.int(20, 32), k = R.int(2, 4), t = R.int(3, 10);
          if (f + t !== k * (s + t)) { const k2 = (f + t) / (s + t); if (!Number.isInteger(k2)) return this.gen(R); }
          const kk = (f + t) / (s + t);
          return { q: `A father is ${f - s} years older than his son. In ${t} years he will be ${kk} times as old as his son. Find their present ages.`, a: `father ${f}, son ${s}`, s: `f − s = ${f - s}; f + ${t} = ${kk}(s + ${t})` };
        } },
      { title: 'Fraction problem', levels: [2, 3], gen(R) {
          const n = R.int(2, 9), d = R.int(n + 2, 15), a = R.int(1, 3), b = R.int(1, 3);
          const f1 = [n + a, d], f2 = [n, d + b];
          return { q: `A fraction becomes ${Q(...f1)} when ${a} is added to its numerator, and ${Q(...f2)} when ${b} is added to its denominator. Find the fraction.`, a: `${n}/${d}`, s: `(x + ${a})/y = ${Q(...f1)}, x/(y + ${b}) = ${Q(...f2)}` };
        } },
      { title: 'Boat in a stream', levels: [3], gen(R) {
          const u = R.int(8, 20), v = R.int(1, 5), t1 = R.int(2, 6), t2 = R.int(2, 6);
          return { q: `A boat goes ${(u + v) * t1} km downstream in ${t1} hours and ${(u - v) * t2} km upstream in ${t2} hours. Find the speed of the boat in still water and the speed of the stream.`, a: `boat ${u} km/h, stream ${v} km/h`, s: `u + v = ${u + v}, u − v = ${u - v}` };
        } }
    ],

    quiz: [
      { q: 'x + 2y = 4 and 2x + 4y = 12 have', o: ['one solution', 'no solution', 'infinitely many', 'two solutions'], a: 1, e: '1/2 = 2/4 ≠ 4/12.' },
      { q: 'The pair 2x − y = 1, 4x − 2y = 2 is', o: ['inconsistent', 'consistent with one solution', 'dependent (infinitely many)', 'none'], a: 2, e: 'All ratios 1/2.' },
      { q: 'Solve x + y = 7, x − y = 1', o: ['(4, 3)', '(3, 4)', '(5, 2)', '(6, 1)'], a: 0, e: 'Add: 2x = 8.' },
      { q: 'For no solution of 3x + y = 1 and (2k − 1)x + (k − 1)y = 2k + 1, k =', o: ['2', '1', '−2', '0'], a: 0, e: '3/(2k − 1) = 1/(k − 1) ⇒ k = 2.' },
      { q: 'Two lines intersect when', o: ['a₁/a₂ ≠ b₁/b₂', 'a₁/a₂ = b₁/b₂', 'c₁ = c₂', 'b₁ = b₂'], a: 0, e: 'Different slopes.' },
      { q: 'A two-digit number with digits x (tens) and y (units) is', o: ['xy', '10x + y', '10y + x', 'x + y'], a: 1, e: 'Place value.' },
      { q: 'Downstream speed of a boat (still-water speed u, stream v)', o: ['u − v', 'u + v', 'uv', 'u/v'], a: 1, e: 'Stream helps.' },
      { q: 'Elimination gives 0 = 7. The system has', o: ['one solution', 'no solution', 'infinitely many', 'x = 7'], a: 1, e: 'False statement ⇒ parallel lines.' },
      { q: 'Graph of a consistent pair with infinitely many solutions is', o: ['intersecting lines', 'parallel lines', 'coincident lines', 'perpendicular lines'], a: 2, e: 'Same line.' },
      { q: '2 pens + 3 pencils = ₹23, 3 pens + 2 pencils = ₹22. One pen costs', o: ['₹4', '₹5', '₹6', '₹3'], a: 0, e: 'Add: 5(p + q) = 45 ⇒ p + q = 9; subtract: q − p = 1 ⇒ p = 4.' },
      { q: 'If (2, 3) is a solution of 2x + ky = 13, k =', o: ['3', '2', '4', '1'], a: 0, e: '4 + 3k = 13.' }
    ],

    teach: {
      outcomes: ['Interpret a pair of linear equations graphically', 'Decide consistency from coefficient ratios', 'Solve by substitution and elimination', 'Model and solve word problems'],
      periods: [
        { t: 'Graphs and consistency', flow: [['10 min', 'Two equations from a shopping story; plot both.'], ['20 min', 'Explore panel 1: ratio test vs graph.'], ['10 min', 'Practice: consistency and k.']] },
        { t: 'Algebraic methods', flow: [['15 min', 'Substitution.'], ['15 min', 'Explore panel 2: elimination step by step.'], ['10 min', 'Practice: solve, Standard.']] },
        { t: 'Word problems', flow: [['10 min', 'Translation table: ages, digits, fractions, speed.'], ['20 min', 'Group work: one problem type each, present.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Ratio test applied to equations in different forms.', 'Sign errors when subtracting.', 'No check of the answer.'],
      activities: ['Graph-paper pairs: each student plots one line; compare with neighbour.', 'Write-your-own word problem and swap.'],
      exit: ['Is 3x + 2y = 5, 6x + 4y = 10 consistent?', 'Solve 2x + 3y = 13, x − y = −1.', 'Form equations: sum of two numbers 20, difference 4.'],
      homework: 'Five years hence a father will be three times as old as his son; five years ago he was seven times as old. Find their ages.'
    },

    slides: [
      { t: 'Pair of Linear Equations in Two Variables', b: ['Two equations = two lines', 'Ratio test', 'Substitution and elimination', 'Word problems'] },
      { t: 'Three possibilities', b: ['Intersecting: a₁/a₂ ≠ b₁/b₂ — one solution', 'Parallel: a₁/a₂ = b₁/b₂ ≠ c₁/c₂ — none', 'Coincident: all equal — infinitely many'] },
      { t: 'Substitution', b: ['Make x or y the subject', 'Substitute into the other equation', 'Solve, back-substitute, check'] },
      { t: 'Elimination', b: ['Equalise one coefficient', 'Add or subtract', 'Solve, back-substitute, check'] },
      { t: 'Word problems', b: ['Ages: x − 5, x + 5', 'Digits: 10x + y', 'Speed: u ± v'] },
      { t: 'Check yourself', b: ['Solve x + y = 10, x − y = 2', 'k for no solution: x + 2y = 3, 2x + ky = 7', 'Answers: (6, 4) · k = 4'] }
    ],

    fs: { groups: [
        ['Pair of lines a₁x + b₁y + c₁ = 0, a₂x + b₂y + c₂ = 0', [['Intersecting (one solution)', 'a₁/a₂ ≠ b₁/b₂'], ['Parallel (no solution)', 'a₁/a₂ = b₁/b₂ ≠ c₁/c₂'], ['Coincident (infinitely many)', 'a₁/a₂ = b₁/b₂ = c₁/c₂'], ['Consistent', 'at least one solution']]],
        ['Methods', [['Substitution', 'make a variable the subject, substitute'], ['Elimination', 'equalise a coefficient, add/subtract'], ['0 = 0', 'infinitely many solutions'], ['0 = non-zero', 'no solution']]],
        ['Word-problem translations', [['Two-digit number', '10x + y; reversed 10y + x'], ['Ages', 'n years ago: x − n; after n years: x + n'], ['Fraction', 'x/y'], ['Boat / stream', 'down u + v, up u − v'], ['Time', 'distance ÷ speed']]]],
      ex: [['3x + 2y = 11, 2x + 3y = 4', '×3, ×2 and subtract: 5x = 25 ⇒ x = 5, y = −2'], ['k for no solution: 2x + 3y = 7, 4x + ky = 5', '2/4 = 3/k ⇒ k = 6']],
      rem: ['Put both equations in the same form before ratios.', 'Check the solution in both equations.', 'Define the variables in words.'] }
  });
})();
