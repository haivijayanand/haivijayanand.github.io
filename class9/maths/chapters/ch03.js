/*
TOOL:    class9_maths_ch03
FAMILY:  CBSE_REVISION / Class 9 Maths (Ganita Manjari)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class 9 Maths full build
CHANGES: 1.0.0 - Ch 3 The World of Numbers - revise, 3 explore panels (root spiral, long-division decimals, density zoom), 8 generators, quiz, lesson plan, slides
*/
(function () {
  const { F, Q, num, C, gcd, surd, surdH } = G9;
  const ov = (s) => `<span style="text-decoration:overline">${s}</span>`;
  // decimal expansion of p/q -> {int, pre, rep}
  function expand(p, q) {
    const ip = Math.floor(p / q); let r = p % q; const seen = {}; let digs = '';
    while (r && seen[r] == null && digs.length < 60) { seen[r] = digs.length; r *= 10; digs += Math.floor(r / q); r %= q; }
    if (!r) return { ip, pre: digs, rep: '' };
    return { ip, pre: digs.slice(0, seen[r]), rep: digs.slice(seen[r]) };
  }
  const decH = (e) => `${e.ip}.${e.pre}${e.rep ? ov(e.rep) : ''}` .replace(/\.$/, '');
  const only25 = (q) => { while (q % 2 === 0) q /= 2; while (q % 5 === 0) q /= 5; return q === 1; };

  G9.register({
    no: 3, part: 'Part I', short: 'World of numbers', title: 'The World of Numbers',
    blurb: 'Rationals and irrationals, decimal expansions, the number line, density, √ spiral, surds.',
    revise: {
      oneLine: 'Every point on the number line is a real number: either rational (p/q, decimal ends or repeats) or irrational (decimal never ends and never repeats, like √2 and π).',
      sections: [
        { h: 'Number families', html: `<p><b>N</b> = {1, 2, 3, …} ⊂ <b>W</b> = {0, 1, 2, …} ⊂ <b>Z</b> = {…, −2, −1, 0, 1, 2, …} ⊂ <b>Q</b> (rationals) ⊂ <b>R</b> (reals).</p>
          <p>A <b>rational number</b> can be written as ${F('p', 'q')} with p, q integers and q ≠ 0. An <b>irrational number</b> cannot. Rationals and irrationals together make the <b>real numbers</b>.</p>` },
        { h: 'Decimal expansions', html: `<p>Long division of p by q can only leave remainders 0, 1, …, q − 1, so the digits must <b>stop</b> or <b>repeat</b>.</p>
          <ul><li><b>Terminating</b>: in lowest terms, q has no prime factors other than 2 and 5 (e.g. ${F(7, 40)} = 0.175).</li>
          <li><b>Non-terminating recurring</b>: otherwise (e.g. ${F(1, 7)} = 0.${ov('142857')}).</li>
          <li><b>Non-terminating non-recurring</b> ⇔ irrational (√2 = 1.41421356…).</li></ul>
          <p><b>Recurring → fraction</b>: x = 0.${ov('36')} ⇒ 100x = 36.${ov('36')} ⇒ 99x = 36 ⇒ x = ${F(4, 11)}.</p>` },
        { h: 'Why √2 is irrational (proof by contradiction)', html: `<p>Suppose √2 = ${F('p', 'q')} in lowest terms. Then p² = 2q², so p² is even ⇒ p is even, p = 2k. Then 4k² = 2q² ⇒ q² = 2k² ⇒ q is even. Both even contradicts "lowest terms". So √2 is irrational. The same argument works for √3, √5, … (any √n where n is not a perfect square).</p>` },
        { h: 'The number line and density', html: `<p><b>Density</b>: between any two rationals there is another — their average ${F('a + b', '2')} — and so infinitely many. Irrationals are also dense.</p>
          <p><b>√n on the number line</b>: build a right triangle with legs √(n−1) and 1; the hypotenuse is √n (the <b>square-root spiral</b>). Swing it down to the line with a compass.</p>` },
        { h: 'Working with surds', html: `<p>√a·√b = √(ab) &nbsp; · &nbsp; ${F('√a', '√b')} = √${F('a', 'b')} &nbsp; · &nbsp; √72 = √(36·2) = 6√2 &nbsp; · &nbsp; 3√5 + 2√5 = 5√5 (only like surds add).</p>
          <p><b>Rationalising</b>: multiply by the conjugate. ${F(1, '√3 + 1')} × ${F('√3 − 1', '√3 − 1')} = ${F('√3 − 1', 2)}.</p>
          <p><b>Exponents</b>: a<sup>m</sup>·a<sup>n</sup> = a<sup>m+n</sup>, (a<sup>m</sup>)<sup>n</sup> = a<sup>mn</sup>, a<sup>1/n</sup> = <sup>n</sup>√a, a<sup>m/n</sup> = (<sup>n</sup>√a)<sup>m</sup>; e.g. 8<sup>2/3</sup> = 2² = 4.</p>` }
      ],
      formulas: [['Rational', 'p/q, q ≠ 0'], ['Terminates iff', 'q = 2ᵐ·5ⁿ (lowest terms)'], ['Average lies between', `a < ${F('a + b', '2')} < b`], ['(a + b)(a − b)', 'a² − b² (for rationalising)'], ['Fractional power', 'a^(m/n) = (ⁿ√a)ᵐ']],
      terms: [['Irrational', 'not expressible as p/q; decimal never ends or repeats'], ['Surd', 'an irrational root such as √3, ∛5'], ['Density', 'between any two numbers there are infinitely many more'], ['Conjugate', 'a + √b and a − √b']],
      traps: ['√(a + b) ≠ √a + √b. Try a = 9, b = 16: √25 = 5 but 3 + 4 = 7.', '"22/7 = π". 22/7 is only an approximation; π is irrational.', 'Checking terminating without reducing first: 21/30 = 7/10 terminates even though 30 has a factor 3.', 'Sum of two irrationals is always irrational — false: √2 + (−√2) = 0.'],
      bridge: '<p>Surds and the identities of Ch 4 combine in rationalising. Irrational lengths appear as distances in Ch 1 and diagonals in Ch 6.</p>'
    },

    explore: [
      {
        title: 'Square-root spiral', intro: 'Start with a 1-by-1 right triangle. Each step adds a new right triangle with a leg of 1 on the last hypotenuse. Press <kbd>S</kbd>.',
        build(el, K) {
          const b = new K.Board(el, { xmin: -5, xmax: 5, ymin: -4.2, ymax: 4.2, grid: 1, axes: false, aspect: 0.6 });
          const rd = K.read(el);
          const an = new K.Anim(16, () => b.redraw(), { ms: 800 });
          b.onDraw = () => {
            b.base(); let ang = 0; const n = an.i + 1;
            for (let k = 1; k <= n; k++) {
              const r = Math.sqrt(k), x1 = r * Math.cos(ang), y1 = r * Math.sin(ang);
              const ang2 = ang + Math.atan(1 / r), r2 = Math.sqrt(k + 1), x2 = r2 * Math.cos(ang2), y2 = r2 * Math.sin(ang2);
              const last = k === n;
              b.poly([[0, 0], [x1, y1], [x2, y2]], { fill: last ? C.orangeL : C.blueL, color: last ? C.orange : C.blue, w: last ? 3 : 1.5 });
              if (k <= 8 || last) b.text(x2 * 1.08, y2 * 1.08, '√' + (k + 1), { font: 'bold 13px', color: last ? C.orange : C.ink });
              ang = ang2;
            }
            const m = n + 1, s = surdH(m);
            rd.innerHTML = `New hypotenuse = √(${n} + 1²) = <b>√${m}</b>${s !== '√' + m ? ' = ' + s : ''} ≈ ${num(Math.sqrt(m), 4)} — ${Number.isInteger(Math.sqrt(m)) ? '<b>rational</b> (perfect square)' : '<b>irrational</b>'}`;
          };
          K.anim(el, an); b.redraw(); return an;
        }
      },
      {
        title: 'Long division: does it stop or repeat?', intro: 'Choose p and q. Each step brings down a 0 and records the remainder. A repeated remainder means the digits repeat.',
        build(el, K) {
          let p = 3, q = 7; const row = K.row(el);
          const rd = K.read(el); rd.style.fontFamily = 'Consolas,monospace'; rd.style.fontSize = '16px';
          const an = new K.Anim(30, () => draw(), { ms: 650 });
          K.slider(row, 'p', 1, 40, 1, p, v => { p = v; an.reset(); });
          K.slider(row, 'q', 2, 40, 1, q, v => { q = v; an.reset(); });
          function draw() {
            const g = gcd(p, q), pp = p / g, qq = q / g; let r = p % q, digs = '', rows = []; const seen = {}; let stop = '';
            for (let k = 0; k <= an.i; k++) {
              if (r === 0) { stop = 'Remainder 0 → the decimal <b>terminates</b>.'; break; }
              if (seen[r] != null) { stop = `Remainder ${r} appeared before (step ${seen[r] + 1}) → digits <b>repeat</b> from there.`; break; }
              seen[r] = k; const r10 = r * 10, d = Math.floor(r10 / q); rows.push(`step ${k + 1}: ${r}0 ÷ ${q} = ${d} remainder ${r10 % q}`); digs += d; r = r10 % q;
            }
            const e = expand(p, q);
            rd.innerHTML = `${p}/${q} = ${Math.floor(p / q)}.${digs}…<br>${rows.slice(-8).join('<br>')}<br><span style="font-family:Segoe UI">${stop}</span>` +
              (stop ? `<br><span style="font-family:Segoe UI">Result: ${F(p, q)} = <b>${decH(e)}</b>. In lowest terms the denominator is ${qq}${only25(qq) ? ' = only 2s and 5s ⇒ terminates' : ' which has a prime factor other than 2, 5 ⇒ recurring'}.</span>` : '');
          }
          K.anim(el, an); draw(); return an;
        }
      },
      {
        title: 'Density: zoom between two numbers', intro: 'Between a and b there is always another number. Each step inserts the average of the two nearest numbers and zooms in.',
        build(el, K) {
          const b = new K.Board(el, { xmin: 0, xmax: 10, ymin: -1.5, ymax: 1.5, axes: false, grid: 0, equal: false, aspect: 0.22 });
          const rd = K.read(el);
          const an = new K.Anim(12, () => b.redraw(), { ms: 900 });
          b.onDraw = () => {
            let lo = 1, hi = 2; const pts = [];
            for (let k = 0; k < an.i; k++) { const m = (lo + hi) / 2; pts.push(m); lo = m; }
            b.clear(); b.line(0.3, 0, 9.7, 0, { color: C.axis, w: 2 });
            const X = (v) => 0.6 + (v - lo) / (hi - lo) * 8.8;
            [[lo, C.blue], [hi, C.blue]].forEach(([v, c]) => { b.line(X(v), -0.3, X(v), 0.3, { color: c, w: 3 }); b.text(X(v), 0.8, String(+v.toPrecision(12)), { font: 'bold 14px', color: c }); });
            const m = (lo + hi) / 2; b.dot(X(m), 0, { color: C.orange }); b.text(X(m), -0.85, String(+m.toPrecision(12)), { font: 'bold 14px', color: C.orange });
            rd.innerHTML = `Zoom level: interval width = ${(hi - lo).toPrecision(3)} &nbsp;·&nbsp; still a new number in the middle: <b>${+m.toPrecision(12)}</b><br>We can never run out — between any two rationals there are infinitely many rationals.`;
          };
          K.anim(el, an); b.redraw(); return an;
        }
      }
    ],

    gens: [
      { title: 'Rational or irrational?', levels: [1, 2], gen(R) {
          const pool = [['√' + R.pick([2, 3, 5, 7, 11]), 0], ['√' + R.pick([4, 9, 16, 25, 49]), 1], [`${R.int(2, 9)}/${R.int(2, 9)}`, 1], ['π', 0], ['0.' + ov(String(R.int(1, 9))), 1], ['0.1010010001…', 0], [`${R.int(1, 5)} + √2`, 0], ['√8/√2', 1], [`${R.int(1, 9)}.${R.int(10, 99)}`, 1], ['√3 × √3', 1]];
          const pick = R.shuffle(pool).slice(0, 4);
          return { q: 'Classify each as rational or irrational: ' + pick.map((p, i) => `(${'abcd'[i]}) ${p[0]}`).join(' &nbsp; '), a: pick.map((p, i) => `(${'abcd'[i]}) ${p[1] ? 'rational' : 'irrational'}`).join(', ') };
        } },
      { title: 'Terminating or recurring?', gen(R) {
          const q = R.pick([8, 12, 16, 20, 25, 40, 6, 7, 9, 11, 15, 30, 32, 50, 80, 125, 14, 24, 3]), p = R.int(1, q * 2); if (p % q === 0) return this.gen(R);
          const g = gcd(p, q), e = expand(p, q);
          return { q: `Without dividing, say whether ${F(p, q)} has a terminating or a non-terminating recurring decimal. Then write the decimal.`, a: `${only25(q / g) ? 'Terminating' : 'Recurring'}: ${decH(e)}`, s: `Lowest terms ${Q(p, q)}; denominator ${q / g} ${only25(q / g) ? 'has only 2s and 5s' : 'has another prime factor'}.` };
        } },
      { title: 'Recurring decimal → p/q', gen(R, L) {
          let num_, den, txt;
          if (L === 1) { const d = R.int(1, 8); txt = '0.' + ov(d); num_ = d; den = 9; }
          else if (L === 2) { const d = R.int(10, 98); txt = '0.' + ov(String(d).padStart(2, '0')); num_ = d; den = 99; }
          else { const a = R.int(1, 9), d = R.int(1, 9); txt = `0.${a}${ov(d)}`; num_ = a * 10 + d - a; den = 90; }
          return { q: `Express ${txt} in the form p/q.`, a: Q(num_, den), ans: num_ / den, tol: 1e-6, s: L === 3 ? `x = ${txt}; 100x − 10x = ${num_} ⇒ x = ${F(num_, 90)}` : `x = ${txt}; ${den === 9 ? '10x − x' : '100x − x'} = ${num_} ⇒ x = ${F(num_, den)}` };
        } },
      { title: 'Rationals between two numbers', levels: [1, 2], gen(R, L) {
          if (L === 1) { const a = R.int(1, 8); return { q: `Write three rational numbers between ${a} and ${a + 1}.`, a: `e.g. ${a}.25, ${a}.5, ${a}.75 (many answers)`, s: 'Write both as tenths or hundredths and pick numbers in between.' }; }
          const p1 = R.int(1, 5), q1 = R.int(p1 + 1, 9); let p2 = R.int(1, 8), q2 = R.int(p2 + 1, 9); if (p1 / q1 === p2 / q2) p2 = p2 === 1 ? 2 : p2 - 1;
          const [lo, hi] = p1 / q1 < p2 / q2 ? [[p1, q1], [p2, q2]] : [[p2, q2], [p1, q1]]; const L_ = q1 * q2 * 4;
          return { q: `Find two rational numbers between ${F(...lo)} and ${F(...hi)}.`, a: `e.g. ${Q(lo[0] * L_ / lo[1] + 1, L_)} and ${Q(lo[0] * L_ / lo[1] + 2, L_)}, or the average ${Q(lo[0] * hi[1] + hi[0] * lo[1], 2 * lo[1] * hi[1])}`, s: `Rewrite with denominator ${L_}: ${lo[0] * L_ / lo[1]}/${L_} and ${hi[0] * L_ / hi[1]}/${L_}.` };
        } },
      { title: 'Simplify surds', gen(R, L) {
          if (L === 1) { const k = R.int(2, 7), m = R.pick([2, 3, 5, 6, 7]); return { q: `Simplify √${k * k * m}.`, a: `${k}√${m}`, s: `√${k * k * m} = √(${k * k} × ${m}) = ${k}√${m}` }; }
          if (L === 2) { const m = R.pick([2, 3, 5]), a = R.int(2, 5), b = R.int(2, 5); return { q: `Simplify √${a * a * m} + √${b * b * m}.`, a: `${a + b}√${m}`, s: `${a}√${m} + ${b}√${m}` }; }
          const a = R.int(2, 6), b = R.int(2, 6), m = R.pick([2, 3, 5, 7]);
          const k = b - a, ab = a * b - m; return { q: `Expand and simplify (${a} + √${m})(${b} − √${m}).`, a: `${ab}` + (k === 0 ? '' : (k > 0 ? ' + ' : ' − ') + (Math.abs(k) === 1 ? '' : Math.abs(k)) + '√' + m), s: `${a * b} − ${a}√${m} + ${b}√${m} − ${m}` };
        } },
      { title: 'Rationalise the denominator', levels: [2, 3], gen(R, L) {
          if (L === 2) { const k = R.int(1, 9), m = R.pick([2, 3, 5, 7]); const g = gcd(k, m), nn = k / g, dd = m / g, top = (nn === 1 ? '' : nn) + '√' + m; return { q: `Rationalise ${F(k, '√' + m)}.`, a: dd === 1 ? top : F(top, dd), s: `Multiply top and bottom by √${m}.` }; }
          const a = R.int(1, 5), m = R.pick([2, 3, 5, 6, 7]); const d = a * a - m; if (d === 0) return this.gen(R, L);
          return { q: `Rationalise ${F(1, `${a} + √${m}`)}.`, a: F(`${a} − √${m}`, d), s: `Multiply by ${a} − √${m}: denominator ${a}² − (√${m})² = ${d}.` };
        } },
      { title: 'Exponent laws', gen(R, L) {
          const t = L === 1 ? R.pick([[4, '1/2', 2], [9, '1/2', 3], [8, '1/3', 2], [27, '1/3', 3], [16, '1/4', 2], [125, '1/3', 5]]) : R.pick([[8, '2/3', 4], [27, '2/3', 9], [16, '3/4', 8], [32, '2/5', 4], [125, '2/3', 25], [81, '3/4', 27], [64, '5/6', 32]]);
          if (L === 3) { const x = R.int(2, 5), m = R.int(2, 4), n = R.int(2, 4); return { q: `Simplify (${x}<sup>${m}</sup>)<sup>${n}</sup> ÷ ${x}<sup>${m * n - 1}</sup>.`, a: String(x), ans: x, s: `${x}<sup>${m * n}</sup> ÷ ${x}<sup>${m * n - 1}</sup> = ${x}<sup>1</sup>` }; }
          return { q: `Find ${t[0]}<sup>${t[1]}</sup>.`, a: String(t[2]), ans: t[2], s: `Take the ${t[1].split('/')[1]}th root first, then raise to the power ${t[1].split('/')[0]}.` };
        } },
      { title: 'Prove irrational', levels: [3], gen(R) {
          const a = R.int(2, 9), m = R.pick([2, 3, 5, 7]);
          return { q: `Given that √${m} is irrational, prove that ${a} + √${m} is irrational.`, a: `Suppose ${a} + √${m} = r (rational). Then √${m} = r − ${a}, a difference of rationals, so rational — contradiction. Hence irrational.`, s: 'Proof by contradiction; rationals are closed under subtraction.' };
        } }
    ],

    quiz: [
      { q: 'Which number is irrational?', o: ['√16', '0.3̅', '√7', '22/7'], a: 2, e: '7 is not a perfect square.' },
      { q: '7/40 has a decimal expansion that is', o: ['terminating', 'recurring', 'non-terminating non-recurring', 'cannot say'], a: 0, e: '40 = 2³·5 → terminates (0.175).' },
      { q: '0.4̅ (0.444…) as a fraction is', o: ['4/10', '4/9', '2/5', '4/99'], a: 1, e: '10x − x = 4 ⇒ x = 4/9.' },
      { q: 'A rational number between 1/3 and 1/2 is', o: ['5/12', '1/4', '3/5', '2/3'], a: 0, e: 'Average = (1/3 + 1/2)/2 = 5/12.' },
      { q: '√50 simplifies to', o: ['25√2', '5√2', '2√5', '10√5'], a: 1, e: '√(25·2) = 5√2.' },
      { q: '1/√5 after rationalising is', o: ['√5', '√5/5', '5√5', '1/5'], a: 1, e: 'Multiply by √5/√5.' },
      { q: '27^(2/3) =', o: ['18', '9', '3', '81'], a: 1, e: '∛27 = 3, 3² = 9.' },
      { q: 'In the square-root spiral, the 4th hypotenuse is', o: ['√4 = 2', '√5', '4', '√3'], a: 1, e: 'Hypotenuses are √2, √3, √4, √5, …' },
      { q: 'Which statement is true?', o: ['Every real number is rational', 'Every integer is a natural number', 'Every rational number is real', 'π = 22/7'], a: 2, e: 'Q ⊂ R.' },
      { q: '(√3 + √2)(√3 − √2) =', o: ['1', '5', '√6', '√5'], a: 0, e: '3 − 2 = 1.' },
      { q: 'The decimal 2.718281828… with no repeating block is', o: ['rational', 'irrational', 'an integer', 'terminating'], a: 1, e: 'Non-terminating non-recurring ⇒ irrational.' }
    ],

    teach: {
      outcomes: ['Classify numbers as natural, whole, integer, rational, irrational, real', 'Predict terminating/recurring decimals and convert recurring decimals to p/q', 'Prove √2 is irrational and locate √n on the number line', 'Simplify surds, rationalise denominators and apply exponent laws'],
      periods: [
        { t: 'Rationals and their decimals', flow: [['10 min', 'Number family tree on the board (N ⊂ W ⊂ Z ⊂ Q ⊂ R).'], ['20 min', 'Explore panel 2 (long division): why remainders force repetition; 2s-and-5s rule.'], ['10 min', 'Recurring → p/q with the 10x − x trick.']] },
        { t: 'Irrationals and the number line', flow: [['15 min', 'Proof that √2 is irrational (board, step by step).'], ['15 min', 'Explore panel 1: square-root spiral; paper-and-compass construction of √2, √3 on a number line.'], ['10 min', 'Explore panel 3: density.']] },
        { t: 'Surds and exponents', flow: [['15 min', 'Simplify, add like surds, multiply; rationalise with the conjugate.'], ['15 min', 'Laws of exponents including fractional powers.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['√(a + b) = √a + √b.', 'π = 22/7 or 3.14 exactly.', 'All non-terminating decimals are irrational (recurring ones are rational).', 'Checking the 2-and-5 rule before reducing the fraction.'],
      activities: ['Paper square-root spiral using a set square and a 1 cm unit — make a class wall chart.', 'Long-division race: who finds the period of 1/7, 1/13, 1/17 first?', 'Number-line washing line: pin cards (√2, 1.5, 7/5, π/2) in order.'],
      exit: ['Is 13/125 terminating? Write its decimal.', 'Write 0.2̅7̅ as p/q.', 'Rationalise 6/√3.'],
      homework: 'Find the period (length of repeating block) of 1/7, 2/7, …, 6/7. What do you notice?'
    },

    slides: [
      { t: 'The World of Numbers', b: ['N ⊂ W ⊂ Z ⊂ Q ⊂ R', 'Rational vs irrational', 'Decimal expansions', 'Surds and exponents'] },
      { t: 'Rational numbers', b: ['p/q, p and q integers, q ≠ 0', 'Decimal either terminates or repeats', 'Terminates ⇔ denominator (lowest terms) = 2ᵐ5ⁿ', '1/7 = 0.142857 142857 …'] },
      { t: 'Recurring decimal to fraction', b: ['x = 0.363636…', '100x = 36.3636…', '99x = 36 ⇒ x = 4/11'] },
      { t: 'Irrational numbers', b: ['Cannot be written as p/q', 'Decimal never ends, never repeats', 'Examples: √2, √3, π', 'Proof for √2: assume p/q in lowest terms ⇒ both even ⇒ contradiction'] },
      { t: 'On the number line', b: ['Square-root spiral: legs √n and 1 give √(n+1)', 'Use a compass to transfer √n to the line', 'Density: between any two numbers lie infinitely many'] },
      { t: 'Surds', b: ['√ab = √a·√b; √72 = 6√2', 'Only like surds add: 3√5 + 2√5 = 5√5', 'Rationalise with conjugate: 1/(√3 + 1) = (√3 − 1)/2'] },
      { t: 'Exponents', b: ['aᵐ·aⁿ = aᵐ⁺ⁿ, (aᵐ)ⁿ = aᵐⁿ', 'a^(1/n) = ⁿ√a', '8^(2/3) = (∛8)² = 4'] },
      { t: 'Check yourself', b: ['Is 21/60 terminating?', '0.6̅ = ?', 'Simplify √98', 'Answers: yes (7/20 = 0.35) · 2/3 · 7√2'] }
    ]
  });
})();
