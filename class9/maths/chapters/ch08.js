/*
TOOL:    class9_maths_ch08
FAMILY:  CBSE_REVISION / Class 9 Maths (Ganita Manjari)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class 9 Maths full build
CHANGES: 1.0.0 - Ch 8 Predicting What Comes Next: Sequences and Progressions - revise, 3 explore panels (AP vs GP bars, Gauss staircase, recursive machine), 9 generators, quiz, lesson plan, slides
*/
(function () {
  const { F, Q, num, C, terms } = G9;

  G9.register({
    no: 8, part: 'Part I', short: 'Sequences', title: 'Predicting What Comes Next: Exploring Sequences and Progressions',
    blurb: 'Arithmetic and geometric progressions, recursive and explicit rules, visual patterns.',
    revise: {
      oneLine: 'A sequence is an ordered list of numbers. In an arithmetic progression you add the same number each time; in a geometric progression you multiply by the same number. Both can be described step by step (recursive rule) or directly (formula for the nth term).',
      sections: [
        { h: 'Sequences and rules', html: `<p>Terms are written a₁, a₂, a₃, … A <b>recursive rule</b> says how to get the next term from earlier ones (a₁ = 3, aₙ₊₁ = aₙ + 4). An <b>explicit rule</b> gives aₙ directly from n (aₙ = 4n − 1).</p>
          <p>Example of a famous recursive rule: the <b>Virahāṅka–Fibonacci</b> numbers 1, 2, 3, 5, 8, 13, … where each term is the sum of the two before it (counting rhythms of short and long syllables).</p>` },
        { h: 'Arithmetic progression (AP)', html: `<p>Each term = previous term + <b>d</b> (common difference). a, a + d, a + 2d, …</p>
          <div class="box m">aₙ = a + (n − 1)d</div>
          <p>Test: the differences a₂ − a₁, a₃ − a₂, … are all equal. Its graph (n, aₙ) is a set of points on a straight line — an AP is a linear rule (Ch 2).</p>` },
        { h: 'Sum of an AP', html: `<p>Gauss's trick: write the sum forwards and backwards and add — every pair gives (first + last).</p>
          <div class="box m">Sₙ = ${F('n', 2)}(a + l) = ${F('n', 2)}[2a + (n − 1)d]</div><p>1 + 2 + … + n = ${F('n(n + 1)', 2)}.</p>` },
        { h: 'Geometric progression (GP)', html: `<p>Each term = previous term × <b>r</b> (common ratio). a, ar, ar², …</p>
          <div class="box m">aₙ = a·rⁿ⁻¹</div>
          <p>Test: the ratios a₂/a₁, a₃/a₂, … are all equal. With r &gt; 1 a GP grows much faster than any AP eventually (doubling!). With 0 &lt; r &lt; 1 it shrinks towards 0.</p>` },
        { h: 'Spotting the type', html: `<table class="t"><tr><th>Sequence</th><th>Differences</th><th>Ratios</th><th>Type</th></tr>
          <tr><td>5, 8, 11, 14</td><td>3, 3, 3</td><td>—</td><td>AP, d = 3</td></tr><tr><td>3, 6, 12, 24</td><td>3, 6, 12</td><td>2, 2, 2</td><td>GP, r = 2</td></tr>
          <tr><td>1, 4, 9, 16</td><td>3, 5, 7</td><td>4, 2.25, …</td><td>neither (squares)</td></tr></table>` }
      ],
      formulas: [['AP nth term', 'aₙ = a + (n − 1)d'], ['AP sum', 'Sₙ = (n/2)[2a + (n − 1)d] = (n/2)(a + l)'], ['1 + 2 + … + n', 'n(n + 1)/2'], ['GP nth term', 'aₙ = a·rⁿ⁻¹'], ['Common difference', 'd = aₙ₊₁ − aₙ'], ['Common ratio', 'r = aₙ₊₁ ÷ aₙ']],
      terms: [['Term', 'a member of the sequence'], ['Recursive rule', 'next term from previous term(s)'], ['Explicit rule', 'aₙ as a formula in n'], ['Common difference / ratio', 'the fixed amount added / factor multiplied']],
      traps: ['aₙ = a + nd — wrong; it is (n − 1)d because the first term has no d added.', 'Finding d as a₁ − a₂ (wrong order gives the wrong sign).', 'Calling 2, 4, 8, 16 an AP because "it goes up by doubling".', 'Using n = number of the last term instead of how many terms there are.'],
      bridge: '<p>APs are linear polynomials on whole numbers (Ch 2). Ch 11 (algorithms) writes recursive rules as step-by-step procedures.</p>'
    },

    explore: [
      {
        title: 'AP vs GP — race the bars', intro: 'Adjust the first term, d and r. Each step adds the next term of both progressions.',
        build(el, K) {
          let a = 2, d = 3, r = 1.5; const row = K.row(el);
          const b = new K.Board(el, { xmin: 0, xmax: 25, ymin: 0, ymax: 10, axes: false, grid: 0, equal: false, aspect: 0.45 });
          const rd = K.read(el); const an = new K.Anim(10, () => b.redraw(), { ms: 700 }); an.i = 5;
          K.slider(row, 'first term a', 1, 10, 1, a, v => { a = v; b.redraw(); });
          K.slider(row, 'd (AP)', -2, 6, 1, d, v => { d = v; b.redraw(); });
          K.slider(row, 'r (GP)', 0.5, 3, 0.25, r, v => { r = v; b.redraw(); });
          b.onDraw = () => {
            b.clear(); const n = an.i + 1; const ap = [], gp = [];
            for (let k = 0; k < n; k++) { ap.push(a + k * d); gp.push(a * r ** k); }
            const mx = Math.max(1, ...ap.map(Math.abs), ...gp); const sc = 8.5 / mx;
            b.line(0.3, 0.6, 24.7, 0.6, { color: C.axis, w: 2 });
            for (let k = 0; k < n; k++) {
              const x = 0.6 + k * 2.4; b.rect(x, 0.6, 1, Math.max(0, ap[k]) * sc, { fill: C.blueL, color: C.blue, w: 2 }); b.rect(x + 1.05, 0.6, 1, gp[k] * sc, { fill: C.orangeL, color: C.orange, w: 2 });
              b.text(x + 1, 0.25, 'n=' + (k + 1), { font: '11px' });
            }
            rd.innerHTML = `<span style="color:var(--blue)"><b>AP</b> (add ${d}): ${ap.map(v => num(v)).join(', ')} &nbsp; aₙ = ${terms([[d, 'n'], [a - d, '']])}</span><br><span style="color:var(--orange)"><b>GP</b> (× ${r}): ${gp.map(v => num(v)).join(', ')} &nbsp; aₙ = ${a}·${r}ⁿ⁻¹</span>` +
              (r > 1 && n >= 6 ? '<br>Notice: once the GP overtakes, it races away — multiplication beats addition in the long run.' : '');
          };
          K.anim(el, an); b.redraw(); return an;
        }
      },
      {
        title: "Gauss's staircase: 1 + 2 + … + n", intro: 'A staircase of n steps and a copy turned upside-down make an n × (n + 1) rectangle. Step to grow n.',
        build(el, K) {
          const b = new K.Board(el, { xmin: -0.5, xmax: 13, ymin: -0.5, ymax: 11.5, axes: false, grid: 0, aspect: 0.55 });
          const rd = K.read(el); const an = new K.Anim(10, () => b.redraw(), { ms: 900 }); an.i = 4;
          b.onDraw = () => {
            b.clear(); const n = an.i + 1;
            for (let row = 0; row < n; row++) for (let c = 0; c <= n; c++) {
              const mine = c <= row; b.rect(c, row, 1, 1, { fill: mine ? C.blueL : C.orangeL, color: mine ? C.blue : C.orange, w: 1.5 });
            }
            b.text((n + 1) / 2, n + 0.5, `${n + 1} wide`, { font: 'bold 14px' }); b.text(n + 1.7, n / 2, `${n} tall`, { font: 'bold 14px' });
            rd.innerHTML = `Blue staircase = 1 + 2 + … + ${n}. Two staircases fill ${n} × ${n + 1} = ${n * (n + 1)} squares ⇒ sum = ${F(`${n} × ${n + 1}`, 2)} = <b>${n * (n + 1) / 2}</b>`;
          };
          K.anim(el, an); b.redraw(); return an;
        }
      },
      {
        title: 'Recursive rule machine', intro: 'Choose a rule and a start value. Each press of <kbd>S</kbd> feeds the last output back in.',
        build(el, K) {
          const rules = [['add d', (s, p) => s[s.length - 1] + p], ['multiply by r', (s, p) => s[s.length - 1] * p], ['Virahāṅka–Fibonacci: add the last two', (s) => s[s.length - 1] + s[s.length - 2]], ['double and add d', (s, p) => 2 * s[s.length - 1] + p]];
          let ri = 0, a = 3, p = 4; const row = K.row(el);
          K.select(row, 'Rule', rules.map(x => x[0]), i => { ri = i; an.reset(); });
          K.slider(row, 'start', -5, 10, 1, a, v => { a = v; an.reset(); });
          K.slider(row, 'd or r', -3, 5, 1, p, v => { p = v; an.reset(); });
          const rd = K.read(el); rd.style.fontSize = '20px';
          const an = new K.Anim(12, () => draw(), { ms: 700 });
          function draw() {
            const s = ri === 2 ? [1, 2] : [a]; while (s.length < an.i + (ri === 2 ? 2 : 1)) s.push(rules[ri][1](s, p));
            const last = s.length > 1 ? `<br><span style="font-size:15px">aₙ₊₁ = ${ri === 0 ? `aₙ ${G9.sgn(p)}` : ri === 1 ? `${p} × aₙ` : ri === 2 ? 'aₙ + aₙ₋₁' : `2aₙ ${G9.sgn(p)}`}: ${s.length > 1 ? `next = ${num(s[s.length - 1])}` : ''}${ri === 0 ? ` &nbsp;·&nbsp; explicit: aₙ = ${terms([[p, 'n'], [a - p, '']])}` : ri === 1 ? ` &nbsp;·&nbsp; explicit: aₙ = ${a}·${p}ⁿ⁻¹` : ''}</span>` : '';
            rd.innerHTML = s.map((v, i) => i === s.length - 1 ? `<b style="color:var(--orange)">${num(v)}</b>` : num(v)).join(' → ') + last;
          }
          K.anim(el, an); draw(); return an;
        }
      }
    ],

    gens: [
      { title: 'AP, GP or neither?', levels: [1, 2], gen(R) {
          const t = R.int(0, 2), a = R.int(1, 9); let s, ans;
          if (t === 0) { const d = R.nz(-5, 7); s = [0, 1, 2, 3].map(k => a + k * d); ans = `AP, d = ${d}; next two: ${a + 4 * d}, ${a + 5 * d}`; }
          else if (t === 1) { const r = R.pick([2, 3, -2, 5]); s = [0, 1, 2, 3].map(k => a * r ** k); ans = `GP, r = ${r}; next two: ${a * r ** 4}, ${a * r ** 5}`; }
          else { s = [1, 2, 3, 4].map(k => k * k + a); ans = `Neither (differences ${s[1] - s[0]}, ${s[2] - s[1]}, ${s[3] - s[2]} grow by 2); next two: ${25 + a}, ${36 + a}`; }
          return { q: `Is ${s.join(', ')}, … an AP, a GP or neither? Write the next two terms.`, a: ans, s: 'Check differences first, then ratios.' };
        } },
      { title: 'nth term of an AP', gen(R, L) {
          const a = R.int(-10, 20), d = L === 1 ? R.int(1, 9) : R.nz(-8, 9), n = R.int(10, L === 3 ? 60 : 30);
          return { q: `Find the ${n}th term of the AP ${a}, ${a + d}, ${a + 2 * d}, …`, a: String(a + (n - 1) * d), ans: a + (n - 1) * d, s: `a = ${a}, d = ${d}; a${n} = ${a} + ${n - 1} × ${G9.par(d)}` };
        } },
      { title: 'Which term is it?', levels: [2, 3], gen(R) {
          const a = R.int(1, 20), d = R.int(2, 9), n = R.int(12, 50), v = a + (n - 1) * d;
          return { q: `Which term of the AP ${a}, ${a + d}, ${a + 2 * d}, … is ${v}?`, a: `${n}th term`, ans: n, s: `${a} + (n − 1)${d} = ${v} ⇒ n − 1 = ${n - 1}` };
        } },
      { title: 'Find a and d from two terms', levels: [3], gen(R) {
          const a = R.int(-10, 15), d = R.nz(-6, 8); const [p, q] = R.distinct(2, 2, 15).sort((x, y) => x - y);
          return { q: `In an AP, the ${p}th term is ${a + (p - 1) * d} and the ${q}th term is ${a + (q - 1) * d}. Find the first term and common difference.`, a: `a = ${a}, d = ${d}`, s: `(${q} − ${p})d = ${(q - p) * d} ⇒ d = ${d}; a = ${a + (p - 1) * d} − ${p - 1} × ${G9.par(d)}` };
        } },
      { title: 'Sum of an AP', levels: [2, 3], gen(R, L) {
          if (L === 2 && R.chance(.4)) { const n = R.pick([10, 20, 50, 100, 25, 40]); return { q: `Find 1 + 2 + 3 + … + ${n}.`, a: String(n * (n + 1) / 2), ans: n * (n + 1) / 2, s: `${n} × ${n + 1} ÷ 2` }; }
          const a = R.int(1, 15), d = R.int(1, 7), n = R.int(8, 30);
          return { q: `Find the sum of the first ${n} terms of the AP ${a}, ${a + d}, ${a + 2 * d}, …`, a: String(n * (2 * a + (n - 1) * d) / 2), ans: n * (2 * a + (n - 1) * d) / 2, s: `Sₙ = ${n}/2 × [2 × ${a} + ${n - 1} × ${d}]` };
        } },
      { title: 'nth term of a GP', gen(R, L) {
          const a = R.int(1, 5), r = L === 1 ? R.pick([2, 3]) : R.pick([2, 3, -2, 0.5]), n = R.int(4, L === 1 ? 6 : 9);
          const v = a * r ** (n - 1);
          return { q: `Find the ${n}th term of the GP ${[0, 1, 2].map(k => num(a * r ** k)).join(', ')}, …`, a: num(v, 5), ans: v, s: `a = ${a}, r = ${num(r)}; a${n} = ${a} × ${G9.par(r)}<sup>${n - 1}</sup>` };
        } },
      { title: 'Recursive to explicit', gen(R) {
          const a = R.int(-5, 12), d = R.nz(-6, 7);
          if (R.chance(.5)) return { q: `A sequence has a₁ = ${a} and aₙ₊₁ = aₙ ${G9.sgn(d)}. Write the first four terms and an explicit formula for aₙ.`, a: `${[0, 1, 2, 3].map(k => a + k * d).join(', ')}; aₙ = ${terms([[d, 'n'], [a - d, '']])}`, s: `AP with a = ${a}, d = ${d}: a + (n − 1)d` };
          const r = R.pick([2, 3, -3, 4]), a2 = R.int(1, 4); return { q: `A sequence has a₁ = ${a2} and aₙ₊₁ = ${r}aₙ. Write the first four terms and an explicit formula for aₙ.`, a: `${[0, 1, 2, 3].map(k => a2 * r ** k).join(', ')}; aₙ = ${a2}·(${r})ⁿ⁻¹`, s: 'GP: a·rⁿ⁻¹' };
        } },
      { title: 'Savings and growth (word problem)', gen(R, L) {
          if (R.chance(.5)) { const s = R.int(2, 10) * 50, inc = R.int(1, 6) * 25, m = R.int(6, 24); const last = s + (m - 1) * inc, tot = m * (s + last) / 2;
            return { q: `Riya saves ₹${s} in the first month and increases her saving by ₹${inc} every month. How much does she save in month ${m}${L >= 2 ? ', and in total over ' + m + ' months' : ''}?`, a: `₹${last}${L >= 2 ? ', total ₹' + tot : ''}`, ans: L >= 2 ? undefined : last, s: `AP: a = ${s}, d = ${inc}` }; }
          const n0 = R.int(2, 9) * 100, h = R.int(4, 8);
          return { q: `A bacteria culture starts with ${n0} cells and doubles every hour. How many cells after ${h} hours?`, a: String(n0 * 2 ** h), ans: n0 * 2 ** h, s: `GP: ${n0} × 2<sup>${h}</sup> (after h hours the term number is h + 1)` };
        } },
      { title: 'Missing terms', levels: [2, 3], gen(R) {
          const a = R.int(1, 20), d = R.nz(-5, 9);
          return { q: `Fill in the blanks so that the numbers form an AP: ${a}, __, __, __, ${a + 4 * d}.`, a: `${a + d}, ${a + 2 * d}, ${a + 3 * d}`, s: `4d = ${a + 4 * d} − ${a} = ${4 * d} ⇒ d = ${d}` };
        } }
    ],

    quiz: [
      { q: 'The common difference of 7, 4, 1, −2, … is', o: ['3', '−3', '4', '−2'], a: 1, e: '4 − 7 = −3.' },
      { q: 'The 10th term of 2, 5, 8, … is', o: ['29', '32', '30', '27'], a: 0, e: '2 + 9 × 3 = 29.' },
      { q: 'Which is a GP?', o: ['3, 6, 9, 12', '2, 6, 18, 54', '1, 4, 9, 16', '5, 5.5, 6, 6.5'], a: 1, e: 'Ratio 3 each time.' },
      { q: '1 + 2 + … + 20 =', o: ['200', '210', '220', '420'], a: 1, e: '20 × 21 / 2.' },
      { q: 'aₙ = 5n − 2. The 4th term is', o: ['18', '20', '13', '22'], a: 0, e: '5 × 4 − 2.' },
      { q: 'The 6th term of the GP 3, 6, 12, … is', o: ['96', '48', '192', '36'], a: 0, e: '3 × 2⁵ = 96.' },
      { q: 'Recursive rule a₁ = 4, aₙ₊₁ = aₙ + 3 gives the explicit rule', o: ['aₙ = 3n + 4', 'aₙ = 3n + 1', 'aₙ = 4n + 3', 'aₙ = 4n − 1'], a: 1, e: '4 + (n − 1)3 = 3n + 1.' },
      { q: 'Next Virahāṅka–Fibonacci number after 5, 8, 13 is', o: ['18', '21', '26', '20'], a: 1, e: '8 + 13 = 21.' },
      { q: 'Which term of 3, 8, 13, … is 78?', o: ['15th', '16th', '17th', '14th'], a: 1, e: '3 + (n − 1)5 = 78 ⇒ n = 16.' },
      { q: 'The points (n, aₙ) of an AP lie on', o: ['a curve', 'a straight line', 'a circle', 'no pattern'], a: 1, e: 'aₙ is linear in n.' },
      { q: '1, 4, 9, 16, … is', o: ['an AP', 'a GP', 'neither', 'both'], a: 2, e: 'Neither differences nor ratios are constant.' }
    ],

    teach: {
      outcomes: ['Describe sequences recursively and explicitly', 'Recognise APs and GPs and find their nth terms', 'Find the sum of an AP using pairing', 'Model saving and growth situations'],
      periods: [
        { t: 'Patterns and rules', flow: [['10 min', 'Number-sequence puzzles on the board (what comes next and why?).'], ['15 min', 'Explore panel 3: recursive machine; Virahāṅka numbers.'], ['15 min', 'Recursive vs explicit; practise converting.']] },
        { t: 'Arithmetic progressions', flow: [['15 min', 'aₙ = a + (n − 1)d from a table; which-term problems.'], ['15 min', 'Explore panel 2 — Gauss staircase; Sₙ formula.'], ['10 min', 'Practice, Standard.']] },
        { t: 'Geometric progressions', flow: [['10 min', 'Paper-folding: thickness doubles each fold.'], ['15 min', 'Explore panel 1: AP vs GP race.'], ['15 min', 'Growth problems; Check quiz.']] }
      ],
      misconceptions: ['aₙ = a + nd.', 'd computed in reverse order.', 'Treating any increasing sequence as an AP.'],
      activities: ['Paper folding (GP), matchstick staircases (AP sums).', 'Students design a savings plan and compute total after a year.', 'Rhythm patterns with claps (short = 1, long = 2) to count Virahāṅka numbers.'],
      exit: ['15th term of 4, 9, 14, …?', 'Is 2, −6, 18, … an AP or GP? Next term?', 'Sum of first 10 odd numbers?'],
      homework: 'Find how many terms of 3, 7, 11, … must be added to get a sum of 210.'
    },

    slides: [
      { t: 'Predicting What Comes Next', b: ['Sequences and rules', 'Arithmetic progressions', 'Sum of an AP', 'Geometric progressions'] },
      { t: 'Two ways to describe a sequence', b: ['Recursive: a₁ = 3, aₙ₊₁ = aₙ + 4', 'Explicit: aₙ = 4n − 1', 'Virahāṅka–Fibonacci: 1, 2, 3, 5, 8, 13, …'] },
      { t: 'Arithmetic progression', b: ['Add the same d every time', 'aₙ = a + (n − 1)d', 'Points (n, aₙ) lie on a line'] },
      { t: 'Gauss pairing', b: ['S = 1 + 2 + … + n', 'S = n + … + 2 + 1', '2S = n(n + 1)', 'Sₙ = (n/2)[2a + (n − 1)d]'] },
      { t: 'Geometric progression', b: ['Multiply by the same r every time', 'aₙ = a·rⁿ⁻¹', 'r > 1 grows fast; 0 < r < 1 shrinks'] },
      { t: 'AP or GP?', b: ['Constant differences → AP', 'Constant ratios → GP', '1, 4, 9, 16 → neither'] },
      { t: 'Check yourself', b: ['20th term of 1, 4, 7, …?', 'Sum 1 + 2 + … + 50?', '5th term of 2, 6, 18, …?', 'Answers: 58 · 1275 · 162'] }
    ]
  });
})();
