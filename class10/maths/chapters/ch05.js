/*
TOOL:    class10_maths_ch05
FAMILY:  CBSE_REVISION / Class 10 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 5 Arithmetic Progressions - revise, board focus, 2 explore panels (AP on a number line/graph, Gauss pairing for Sn), 9 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { F, Q, num, C, terms } = G9;
  const ord = (n) => n + (n % 10 === 1 && n % 100 !== 11 ? 'st' : n % 10 === 2 && n % 100 !== 12 ? 'nd' : n % 10 === 3 && n % 100 !== 13 ? 'rd' : 'th');

  G9.register({
    no: 5, part: 'Unit II · Algebra (20 marks)', short: 'Arithmetic progressions', title: 'Arithmetic Progressions',
    blurb: 'nth term, nth term from the end, sum of n terms, and problems on savings, seats and installments.',
    revise: {
      oneLine: 'An AP adds the same number d at every step: a, a + d, a + 2d, … Its nth term is a + (n − 1)d and the sum of its first n terms is (n/2)[2a + (n − 1)d].',
      sections: [
        { h: 'What is an AP?', html: `<p>A list where each term after the first is obtained by adding a fixed number <b>d</b> (common difference, may be negative or zero). Check: a₂ − a₁ = a₃ − a₂ = … </p>
          <p>Examples: 3, 7, 11, … (d = 4); 10, 7, 4, … (d = −3); ½, ½, ½ (d = 0). Not an AP: 1, 4, 9, 16.</p>` },
        { h: 'nth term', html: `<div class="box m">aₙ = a + (n − 1)d</div>
          <p>nth term <b>from the end</b> of an AP with last term l: l − (n − 1)d.</p>
          <p>Number of terms: if the last term is l, then n = (l − a)/d + 1.</p>` },
        { h: 'Sum of first n terms', html: `<div class="box m">Sₙ = ${F('n', 2)}[2a + (n − 1)d] = ${F('n', 2)}(a + l)</div>
          <p>Sum of first n natural numbers: n(n + 1)/2. And aₙ = Sₙ − Sₙ₋₁.</p>
          <p>Gauss's idea: write the sum forwards and backwards; each pair adds to (a + l).</p>` },
        { h: 'Typical problems', html: `<ul><li>Which term of the AP is a given number? (Solve a + (n − 1)d = value; n must be a natural number.)</li><li>Find a and d from two given terms (two linear equations).</li><li>How many terms give a sum S? (A quadratic in n; reject non-natural roots.)</li><li>Real life: savings, installments, rows of seats, logs in a pile, production per year.</li></ul>` }
      ],
      formulas: [['nth term', 'aₙ = a + (n − 1)d'], ['From the end', 'l − (n − 1)d'], ['Sum', 'Sₙ = (n/2)[2a + (n − 1)d]'], ['Sum with last term', 'Sₙ = (n/2)(a + l)'], ['1 + 2 + … + n', 'n(n + 1)/2'], ['Term from sums', 'aₙ = Sₙ − Sₙ₋₁']],
      terms: [['Common difference', 'd = aₙ₊₁ − aₙ'], ['First term', 'a = a₁'], ['Last term', 'l = aₙ'], ['Finite AP', 'has a last term']],
      traps: ['Using nd instead of (n − 1)d.', 'Taking d as a₁ − a₂.', 'Accepting a fractional or negative n.', 'Mixing up the term aₙ and the sum Sₙ.'],
      board: '<p><b>Unit II (Algebra) — 20 marks.</b> Expect: 1-mark on d or the nth term; 2–3 marks on which term / term from the end / a and d from two terms; 3–5 marks on sums and real-life problems. Write the formula before substituting.</p>',
      bridge: '<p>Class 9 Ch 8 introduced sequences; aₙ is a linear polynomial in n (Ch 2), and the "how many terms" problem is a quadratic (Ch 4).</p>'
    },

    explore: [
      {
        title: 'AP as points on a line', intro: 'Set a and d. The points (n, aₙ) always lie on a straight line with slope d. Step to add terms.',
        build(el, K) {
          let a = 3, d = 2; const row = K.row(el);
          const b = new K.Board(el, { xmin: -0.5, xmax: 12.5, ymin: -20, ymax: 30, equal: false, labelStep: 1, grid: 0 }); const rd = K.read(el);
          const an = new K.Anim(12, () => b.redraw(), { ms: 500 }); an.i = 7;
          K.slider(row, 'a', -10, 10, 1, a, v => { a = v; b.redraw(); }); K.slider(row, 'd', -4, 4, 0.5, d, v => { d = v; b.redraw(); });
          b.onDraw = () => {
            b.clear(); for (let y = -20; y <= 30; y += 10) { b.line(0, y, 12.5, y, { color: C.grid, w: 1 }); b.text(-0.3, y, String(y), { font: '11px', align: 'right' }); }
            b.line(0, 0, 12.5, 0, { color: C.axis, w: 2 }); for (let n = 1; n <= 12; n++) b.text(n, -1.8, String(n), { font: '11px' });
            b.fn(x => a + (x - 1) * d, { color: C.grey, w: 1.5 });
            const n = an.i + 1; let tl = []; for (let k = 1; k <= n; k++) { const v = a + (k - 1) * d; b.dot(k, v, { color: C.orange, r: 5 }); tl.push(num(v)); }
            const S = n / 2 * (2 * a + (n - 1) * d);
            rd.innerHTML = `${tl.join(', ')} … &nbsp;·&nbsp; a${n} = ${a} + ${n - 1} × ${G9.par(d)} = <b>${num(a + (n - 1) * d)}</b> &nbsp;·&nbsp; S${n} = ${n}/2 × [${2 * a} + ${n - 1} × ${G9.par(d)}] = <b>${num(S)}</b>`;
          };
          K.anim(el, an); b.redraw(); return an;
        }
      },
      {
        title: 'Gauss pairing for Sₙ', intro: 'Write the AP forwards and backwards. Every column adds to a + l, so 2Sₙ = n(a + l).',
        build(el, K) {
          let a = 2, d = 3, n = 6; const row = K.row(el);
          K.slider(row, 'a', 1, 9, 1, a, v => { a = v; draw(); }); K.slider(row, 'd', 1, 5, 1, d, v => { d = v; draw(); }); K.slider(row, 'n', 2, 10, 1, n, v => { n = v; draw(); });
          const rd = K.read(el); rd.style.fontFamily = 'Consolas,monospace';
          function draw() { const t = Array.from({ length: n }, (_, k) => a + k * d), l = t[n - 1], w = String(l).length + 2;
            const fmt = (arr) => arr.map(v => String(v).padStart(w, ' ')).join(' +').replace(/ /g, '&nbsp;');
            rd.innerHTML = `&nbsp;&nbsp;S = ${fmt(t)}<br>&nbsp;&nbsp;S = ${fmt(t.slice().reverse())}<br>2S = ${fmt(t.map(() => a + l))}<br><span style="font-family:Segoe UI">2S = ${n} × ${a + l} ⇒ S = <b>${n * (a + l) / 2}</b> = ${F('n', 2)}(a + l)</span>`; }
          draw(); return null;
        }
      }
    ],

    gens: [
      { title: 'nth term', gen(R, L) {
          const a = R.int(-15, 20), d = L === 1 ? R.int(1, 9) : R.nz(-7, 9), n = R.int(10, 40);
          return { q: `Find the ${ord(n)} term of the AP: ${a}, ${a + d}, ${a + 2 * d}, …`, a: String(a + (n - 1) * d), ans: a + (n - 1) * d, s: `a = ${a}, d = ${d}; a${n} = ${a} + ${n - 1} × ${G9.par(d)}` };
        } },
      { title: 'Which term?', gen(R) {
          const a = R.int(-10, 20), d = R.nz(-6, 8), n = R.int(8, 45), v = a + (n - 1) * d;
          return { q: `Which term of the AP ${a}, ${a + d}, ${a + 2 * d}, … is ${v}?`, a: `${ord(n)} term`, ans: n, s: `${a} + (n − 1)(${d}) = ${v} ⇒ n − 1 = ${n - 1}` };
        } },
      { title: 'Number of terms', levels: [1, 2], gen(R) {
          const a = R.int(1, 20), d = R.int(2, 9), n = R.int(10, 40), l = a + (n - 1) * d;
          return { q: `How many terms are there in the AP ${a}, ${a + d}, ${a + 2 * d}, …, ${l}?`, a: String(n), ans: n, s: `n = (${l} − ${a})/${d} + 1` };
        } },
      { title: 'Term from the end', levels: [2, 3], gen(R) {
          const a = R.int(1, 20), d = R.int(2, 9), N = R.int(20, 50), l = a + (N - 1) * d, k = R.int(3, 12);
          return { q: `Find the ${ord(k)} term from the end of the AP ${a}, ${a + d}, ${a + 2 * d}, …, ${l}.`, a: String(l - (k - 1) * d), ans: l - (k - 1) * d, s: `l − (n − 1)d = ${l} − ${k - 1} × ${d}` };
        } },
      { title: 'Find a and d from two terms', levels: [2, 3], gen(R) {
          const a = R.int(-10, 15), d = R.nz(-6, 8); const [p, q] = R.distinct(2, 2, 20).sort((x, y) => x - y);
          return { q: `The ${ord(p)} term of an AP is ${a + (p - 1) * d} and the ${ord(q)} term is ${a + (q - 1) * d}. Find the first term, the common difference and the 30th term.`, a: `a = ${a}, d = ${d}, a₃₀ = ${a + 29 * d}`, s: `${q - p}d = ${(q - p) * d}` };
        } },
      { title: 'Sum of n terms', gen(R, L) {
          const a = R.int(-10, 20), d = L === 1 ? R.int(1, 6) : R.nz(-5, 8), n = R.int(10, 30), S = n * (2 * a + (n - 1) * d) / 2;
          return { q: `Find the sum of the first ${n} terms of the AP ${a}, ${a + d}, ${a + 2 * d}, …`, a: String(S), ans: S, s: `${n}/2 × [2 × ${G9.par(a)} + ${n - 1} × ${G9.par(d)}]` };
        } },
      { title: 'How many terms for a given sum?', levels: [3], gen(R) {
          const a = R.int(1, 15), d = R.int(1, 5), n = R.int(6, 20), S = n * (2 * a + (n - 1) * d) / 2;
          return { q: `How many terms of the AP ${a}, ${a + d}, ${a + 2 * d}, … must be taken to give a sum of ${S}?`, a: String(n), ans: n, s: `n/2 [${2 * a} + (n − 1)${d}] = ${S} ⇒ ${d}n² + ${2 * a - d}n − ${2 * S} = 0; take the natural-number root` };
        } },
      { title: 'Sum of multiples / numbers', levels: [2, 3], gen(R) {
          const m = R.int(3, 9), lo = R.int(10, 99), hi = R.pick([200, 300, 500, 999]);
          const a = Math.ceil(lo / m) * m, l = Math.floor(hi / m) * m, n = (l - a) / m + 1, S = n * (a + l) / 2;
          return { q: `Find the sum of all multiples of ${m} between ${lo} and ${hi}.`, a: `${S} (${n} terms)`, ans: S, s: `${a}, ${a + m}, …, ${l}; n = ${n}; S = ${n}/2 × (${a} + ${l})` };
        } },
      { title: 'Real-life AP', gen(R) {
          const t = R.int(0, 2);
          if (t === 0) { const s = R.int(1, 10) * 50, inc = R.int(1, 6) * 25, m = R.int(6, 24); return { q: `Ravi saves ₹${s} in the first month and increases his saving by ₹${inc} each month. How much does he save in the ${ord(m)} month, and in all ${m} months together?`, a: `₹${s + (m - 1) * inc}; total ₹${m * (2 * s + (m - 1) * inc) / 2}`, s: `a = ${s}, d = ${inc}` }; }
          if (t === 1) { const r1 = R.int(15, 30), inc = R.int(1, 3), rows = R.int(10, 25); return { q: `An auditorium has ${r1} seats in the first row, and each row has ${inc} more seat${inc > 1 ? 's' : ''} than the previous one. If there are ${rows} rows, how many seats are there in all?`, a: String(rows * (2 * r1 + (rows - 1) * inc) / 2), ans: rows * (2 * r1 + (rows - 1) * inc) / 2, s: `S = ${rows}/2 [${2 * r1} + ${rows - 1} × ${inc}]` }; }
          const b = R.int(15, 25), rows = R.int(5, Math.min(12, b)); return { q: `Logs are stacked with ${b} in the bottom row, ${b - 1} in the next, ${b - 2} in the next, and so on, for ${rows} rows. How many logs are there, and how many in the top row?`, a: `${rows * (2 * b - (rows - 1)) / 2} logs; ${b - rows + 1} in the top row`, s: `a = ${b}, d = −1, n = ${rows}` };
        } }
    ],

    quiz: [
      { q: 'Common difference of 3, 1, −1, −3, … is', o: ['2', '−2', '3', '−3'], a: 1, e: '1 − 3.' },
      { q: '10th term of 2, 7, 12, … is', o: ['47', '52', '45', '50'], a: 0, e: '2 + 9 × 5.' },
      { q: 'Sum of first 20 natural numbers', o: ['200', '210', '220', '190'], a: 1, e: '20 × 21 / 2.' },
      { q: 'Which is an AP?', o: ['2, 4, 8, 16', '1, 3, 9, 27', '√2, √8, √18, √32', '1, 4, 9, 16'], a: 2, e: '√2, 2√2, 3√2, 4√2: d = √2.' },
      { q: 'How many two-digit numbers are divisible by 3?', o: ['30', '31', '29', '33'], a: 0, e: '12, 15, …, 99: (99 − 12)/3 + 1 = 30.' },
      { q: 'If aₙ = 3 + 4n, the common difference is', o: ['3', '4', '7', '1'], a: 1, e: 'Coefficient of n.' },
      { q: 'If Sₙ = n² + 2n, then a₁ =', o: ['3', '1', '2', '4'], a: 0, e: 'S₁ = 3.' },
      { q: '11th term from the end of 10, 7, 4, …, −62 is', o: ['−32', '−29', '−35', '−26'], a: 0, e: '−62 + 10 × 3 = −32.' },
      { q: 'In an AP, a = 5, l = 45, n = 9. Sum =', o: ['225', '250', '200', '450'], a: 0, e: '9/2 × 50.' },
      { q: 'If 2k + 1, 13, 5k − 3 are in AP, k =', o: ['4', '3', '5', '2'], a: 0, e: '2 × 13 = 7k − 2 ⇒ k = 4.' },
      { q: 'Which term of 21, 18, 15, … is 0?', o: ['7th', '8th', '6th', 'none'], a: 1, e: '21 − 3(n − 1) = 0 ⇒ n = 8.' }
    ],

    teach: {
      outcomes: ['Recognise APs and find d', 'Use aₙ = a + (n − 1)d, including terms from the end', 'Use Sₙ and solve for n', 'Model real-life situations with APs'],
      periods: [
        { t: 'nth term', flow: [['10 min', 'Taxi fares, savings, seats — spot the pattern.'], ['15 min', 'Explore panel 1: points on a line.'], ['15 min', 'Which term / term from end / a and d from two terms.']] },
        { t: 'Sum of n terms', flow: [['10 min', 'Gauss story; Explore panel 2.'], ['20 min', 'Sₙ forms; how many terms (quadratic).'], ['10 min', 'Practice: Standard.']] },
        { t: 'Applications', flow: [['25 min', 'Savings, seats, logs, multiples between numbers.'], ['15 min', 'Check quiz.']] }
      ],
      misconceptions: ['nd instead of (n − 1)d.', 'Non-natural n accepted.', 'aₙ vs Sₙ confusion.'],
      activities: ['Stack of coins/books growing by a fixed number.', 'Seat-count of the school auditorium as an AP.'],
      exit: ['30th term of 10, 7, 4, …', 'Sum of first 15 multiples of 8.', 'Which term of 3, 8, 13, … is 78?'],
      homework: 'A contract offers ₹5000 in the first year with an increment of ₹500 each year; another offers ₹6000 with ₹300 increments. After how many years does the first become better in that year?'
    },

    slides: [
      { t: 'Arithmetic Progressions', b: ['Add d every time', 'nth term', 'Sum of n terms', 'Applications'] },
      { t: 'nth term', b: ['aₙ = a + (n − 1)d', 'From the end: l − (n − 1)d', 'n = (l − a)/d + 1'] },
      { t: 'Sum', b: ['Sₙ = (n/2)[2a + (n − 1)d]', 'Sₙ = (n/2)(a + l)', 'aₙ = Sₙ − Sₙ₋₁'] },
      { t: 'Problem types', b: ['Which term is v?', 'a and d from two terms', 'How many terms for sum S?', 'Savings, seats, logs'] },
      { t: 'Check yourself', b: ['20th term of 4, 9, 14, …?', 'S₁₀ of 2, 5, 8, …?', 'Answers: 99 · 155'] }
    ],

    fs: { groups: [
        ['AP basics', [['Terms', 'a, a + d, a + 2d, …'], ['Common difference', 'd = aₙ₊₁ − aₙ'], ['Three terms in AP', 'a − d, a, a + d'], ['b is the middle of a, b, c', '2b = a + c']]],
        ['nth term', [['nth term', 'aₙ = a + (n − 1)d'], ['From the end', 'l − (n − 1)d'], ['Number of terms', 'n = (l − a)/d + 1'], ['From sums', 'aₙ = Sₙ − Sₙ₋₁']]],
        ['Sums', [['Sₙ', '(n/2)[2a + (n − 1)d]'], ['With last term', '(n/2)(a + l)'], ['1 + 2 + … + n', 'n(n + 1)/2'], ['First n odd numbers', 'n²'], ['n for given sum', 'solve the quadratic, keep natural n']]]],
      ex: [['Which term of 3, 8, 13, … is 78?', '3 + 5(n − 1) = 78 ⇒ n = 16'], ['Sum of first 20 terms of 1, 4, 7, …', '10 × (2 + 57) = 590']],
      rem: ['(n − 1)d, not nd.', 'n must be a natural number.', 'Write the formula before substituting.'] }
  });
})();
