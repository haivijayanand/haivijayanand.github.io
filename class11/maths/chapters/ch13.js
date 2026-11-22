/*
TOOL:    class11_maths_ch13
FAMILY:  CBSE_REVISION / Class 11 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 13 Statistics - revise, exam focus, 2 explore panels (spread comparer, deviations), 6 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num } = G9;
  const mean = (a) => a.reduce((s, v) => s + v, 0) / a.length;
  const median = (a) => { const b = [...a].sort((x, y) => x - y), n = b.length; return n % 2 ? b[(n - 1) / 2] : (b[n / 2 - 1] + b[n / 2]) / 2; };
  const variance = (a) => { const m = mean(a); return a.reduce((s, v) => s + (v - m) ** 2, 0) / a.length; };

  G9.register({
    no: 13, part: 'Unit V · Statistics and Probability (12 marks)', short: 'Statistics', title: 'Statistics',
    blurb: 'Measures of dispersion: range, mean deviation about mean and median, variance and standard deviation.',
    revise: {
      oneLine: 'Two data sets can share a mean yet differ in spread. Range, mean deviation and especially the variance σ² (average squared deviation) and standard deviation σ measure that spread.',
      sections: [
        { h: 'Range and mean deviation', html: `<p>Range = maximum − minimum. Mean deviation about a: M.D.(a) = Σ|xᵢ − a| / n (ungrouped), Σfᵢ|xᵢ − a| / N (grouped, xᵢ = class mark). Use a = mean x̄ or median M.</p>` },
        { h: 'Variance and standard deviation', html: `<div class="box m">σ² = ${G9.F('Σ(xᵢ − x̄)²', 'n')} = ${G9.F('Σxᵢ²', 'n')} − x̄² &nbsp;·&nbsp; σ = √σ²</div>
          <p>Frequency distribution: σ² = Σfᵢ(xᵢ − x̄)²/N. Short-cut with yᵢ = (xᵢ − A)/h: σₓ = h σ_y.</p>
          <p>Adding a constant to every value leaves σ unchanged; multiplying by k multiplies σ by |k|.</p>` },
        { h: 'Comparing variability', html: `<p>Coefficient of variation C.V. = (σ / x̄) × 100. The series with the larger C.V. is more variable (less consistent).</p>` }
      ],
      formulas: [['Range', 'max − min'], ['M.D. about a', 'Σ|xᵢ − a|/n'], ['Variance', 'Σ(xᵢ − x̄)²/n = Σxᵢ²/n − x̄²'], ['Grouped variance', 'Σfᵢ(xᵢ − x̄)²/N'], ['Step deviation', 'σₓ = h σ_y'], ['C.V.', '(σ/x̄) × 100']],
      terms: [['Dispersion', 'spread of the data'], ['Deviation', 'xᵢ − x̄'], ['Standard deviation', 'square root of variance'], ['Coefficient of variation', 'relative spread, in %']],
      traps: ['Forgetting the absolute value in mean deviation.', 'Dividing Σfᵢ(xᵢ − x̄)² by the number of classes instead of N.', 'σ² − not σ — is Σxᵢ²/n − x̄².', 'More consistent means smaller C.V.'],
      board: '<p><b>Unit V (Statistics and Probability) — 12 marks.</b> Expect: mean deviation about mean/median (3 marks), variance and standard deviation for raw or grouped data (3–5 marks), and comparing two series with C.V.</p>',
      bridge: '<p>Class 10 Ch 13 gave mean, median and mode. Class 12 Probability defines mean and variance of a random variable.</p>'
    },

    explore: [
      {
        title: 'Same mean, different spread', intro: 'Drag the spread slider. The mean stays put while the variance and standard deviation change.',
        build(el, K) {
          let sp = 1; const base = [-2, -1.5, -1, -0.5, 0, 0, 0.5, 1, 1.5, 2]; const row = K.row(el); K.slider(row, 'spread', 0, 3, 0.1, sp, v => { sp = v; bd.redraw(); });
          const bd = new K.Board(el, { xmin: 0, xmax: 20, ymin: -1, ymax: 3, axes: false, grid: 0, equal: false, aspect: 0.25 }); const rd = K.read(el);
          bd.onDraw = () => { bd.clear(); const xs = base.map(v => 10 + v * sp); const m = mean(xs), s = Math.sqrt(variance(xs));
            bd.line(0, 0, 20, 0, { color: C.axis, w: 2 }); for (let t = 0; t <= 20; t += 2) { bd.line(t, -0.1, t, 0.1, { color: C.axis }); bd.text(t, -0.5, String(t), { font: '11px' }); }
            bd.rect(m - s, 0.3, 2 * s, 2.2, { fill: 'rgba(29,78,216,.12)', color: C.blue }); xs.forEach((x, i) => bd.dot(x, 0.6 + (i % 4) * 0.45, { color: C.orange, r: 6 }));
            bd.line(m, 0, m, 2.8, { color: C.purple, w: 3 }); bd.text(m, 2.9, 'x̄', { font: 'bold 14px', color: C.purple });
            rd.innerHTML = `values: ${xs.map(v => num(v, 2)).join(', ')} · x̄ = ${num(m, 2)} · range = ${num(Math.max(...xs) - Math.min(...xs), 2)} · σ² = ${num(variance(xs), 3)} · σ = <b>${num(s, 3)}</b> (blue band: x̄ ± σ)`; };
          bd.redraw(); return null;
        }
      },
      {
        title: 'Step-by-step variance table', intro: 'Press <kbd>S</kbd> for a new data set; the table builds deviations and squares.',
        build(el, K) {
          const rd = K.read(el); let R = G9.rng(G9.newSeed());
          const make = () => { const n = R.int(5, 8); const xs = Array.from({ length: n }, () => R.int(2, 20)); const m = mean(xs);
            rd.innerHTML = `<table class="t"><tr><th>xᵢ</th>${xs.map(x => `<td>${x}</td>`).join('')}<th>Σ</th></tr><tr><th>xᵢ − x̄</th>${xs.map(x => `<td>${num(x - m, 2)}</td>`).join('')}<td>0</td></tr><tr><th>|xᵢ − x̄|</th>${xs.map(x => `<td>${num(Math.abs(x - m), 2)}</td>`).join('')}<td>${num(xs.reduce((s, x) => s + Math.abs(x - m), 0), 2)}</td></tr><tr><th>(xᵢ − x̄)²</th>${xs.map(x => `<td>${num((x - m) ** 2, 2)}</td>`).join('')}<td>${num(xs.reduce((s, x) => s + (x - m) ** 2, 0), 2)}</td></tr></table>
              n = ${n}, x̄ = ${num(m, 3)} · M.D.(x̄) = ${num(xs.reduce((s, x) => s + Math.abs(x - m), 0) / n, 3)} · σ² = ${num(variance(xs), 3)} · σ = <b>${num(Math.sqrt(variance(xs)), 3)}</b>`; };
          const row = K.row(el); K.button(row, 'New data (S)', make); make(); return { step: make, play() {}, pause() {} };
        }
      }
    ],

    gens: [
      { title: 'Range', levels: [1], gen(R) {
          const xs = Array.from({ length: R.int(6, 10) }, () => R.int(10, 99));
          return { q: `Find the range of: ${xs.join(', ')}.`, a: String(Math.max(...xs) - Math.min(...xs)), ans: Math.max(...xs) - Math.min(...xs) };
        } },
      { title: 'Mean deviation about the mean', gen(R) {
          let xs, m; do { xs = Array.from({ length: R.int(5, 8) }, () => R.int(2, 30)); m = mean(xs); } while (!Number.isInteger(m));
          const md = xs.reduce((s, v) => s + Math.abs(v - m), 0) / xs.length;
          return { q: `Find the mean deviation about the mean for: ${xs.join(', ')}.`, a: num(md, 2), ans: md, tol: 0.01, s: `x̄ = ${m}; Σ|xᵢ − x̄| = ${xs.reduce((s, v) => s + Math.abs(v - m), 0)}` };
        } },
      { title: 'Mean deviation about the median', levels: [2, 3], gen(R) {
          const xs = Array.from({ length: R.pick([5, 7, 9]) }, () => R.int(5, 50)); const M = median(xs); const md = xs.reduce((s, v) => s + Math.abs(v - M), 0) / xs.length;
          return { q: `Find the mean deviation about the median for: ${xs.join(', ')}.`, a: num(md, 2), ans: md, tol: 0.01, s: `median = ${M}` };
        } },
      { title: 'Variance and SD (raw data)', gen(R) {
          let xs, m; do { xs = Array.from({ length: R.int(5, 8) }, () => R.int(1, 20)); m = mean(xs); } while (!Number.isInteger(m));
          const v = variance(xs);
          return { q: `Find the variance and standard deviation of: ${xs.join(', ')}.`, a: `σ² = ${num(v, 3)}, σ = ${num(Math.sqrt(v), 3)}`, ans: v, tol: 0.01, s: `x̄ = ${m}; Σ(xᵢ − x̄)² = ${num(v * xs.length)}` };
        } },
      { title: 'Variance of a frequency distribution', levels: [2, 3], gen(R) {
          const start = R.pick([0, 10, 20]), h = 10, k = 5; const marks = Array.from({ length: k }, (_, i) => start + h * i + h / 2); const f = marks.map(() => R.int(2, 12)); const N = f.reduce((a, b) => a + b, 0);
          const m = marks.reduce((s, x, i) => s + x * f[i], 0) / N; const v = marks.reduce((s, x, i) => s + f[i] * (x - m) ** 2, 0) / N;
          return { q: `Find the mean and variance: classes ${marks.map((x, i) => `${x - h / 2}–${x + h / 2}`).join(', ')} with frequencies ${f.join(', ')}.`, a: `x̄ = ${num(m, 2)}, σ² = ${num(v, 2)}, σ = ${num(Math.sqrt(v), 2)}`, ans: v, tol: 0.05, s: `class marks ${marks.join(', ')}; N = ${N}` };
        } },
      { title: 'Compare consistency (C.V.)', levels: [2, 3], gen(R) {
          const m1 = R.int(40, 80), s1 = R.int(5, 20), m2 = R.int(40, 80), s2 = R.int(5, 20); const c1 = s1 / m1 * 100, c2 = s2 / m2 * 100;
          if (Math.abs(c1 - c2) < 0.5) return this.gen(R);
          return { q: `Batsman A: mean ${m1} runs, σ = ${s1}. Batsman B: mean ${m2} runs, σ = ${s2}. Who is more consistent?`, a: `C.V.(A) = ${num(c1, 2)}%, C.V.(B) = ${num(c2, 2)}% ⇒ ${c1 < c2 ? 'A' : 'B'} is more consistent`, s: 'smaller C.V. = more consistent' };
        } }
    ],

    quiz: [
      { q: 'Range of 7, 3, 12, 9, 5', o: ['9', '12', '5', '7'], a: 0, e: '12 − 3.' },
      { q: 'Variance is', o: ['mean of deviations', 'mean of squared deviations', 'square root of mean', 'max − min'], a: 1, e: 'σ² = Σ(x − x̄)²/n.' },
      { q: 'σ for 2, 4, 6, 8 (x̄ = 5)', o: ['√5', '5', '√20', '2'], a: 0, e: 'σ² = (9 + 1 + 1 + 9)/4 = 5.' },
      { q: 'Σ(xᵢ − x̄) is always', o: ['0', 'n', 'x̄', 'σ²'], a: 0, e: 'Deviations cancel.' },
      { q: 'Adding 5 to every value changes σ by', o: ['+5', '×5', 'no change', '+25'], a: 2, e: 'Spread unchanged.' },
      { q: 'Multiplying every value by 3 makes σ', o: ['3σ', '9σ', 'σ + 3', 'σ'], a: 0, e: 'Scaled by |k|.' },
      { q: 'C.V. =', o: ['σ/x̄ × 100', 'x̄/σ × 100', 'σ² /x̄', 'σ × x̄'], a: 0, e: 'Definition.' },
      { q: 'More consistent series has', o: ['larger C.V.', 'smaller C.V.', 'larger mean', 'larger range'], a: 1, e: 'Less relative spread.' },
      { q: 'σ² = Σx²/n − ?', o: ['x̄', 'x̄²', '2x̄', 'n'], a: 1, e: 'Short form.' },
      { q: 'M.D. about the mean uses', o: ['(x − x̄)²', '|x − x̄|', 'x − x̄', '√(x − x̄)'], a: 1, e: 'Absolute deviations.' },
      { q: 'If σ = 4, the variance is', o: ['2', '16', '8', '4'], a: 1, e: 'σ².' }
    ],

    teach: {
      outcomes: ['Find range and mean deviation about mean and median', 'Compute variance and standard deviation for raw and grouped data', 'Use step-deviation short-cuts', 'Compare variability with C.V.'],
      periods: [
        { t: 'Why spread matters', flow: [['10 min', 'Two cricketers with the same average.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Range and mean deviation.']] },
        { t: 'Variance and SD', flow: [['15 min', 'Explore panel 2: tables.'], ['15 min', 'Grouped data, step deviation.'], ['10 min', 'Practice.']] },
        { t: 'Comparison', flow: [['15 min', 'C.V. problems.'], ['15 min', 'Mixed practice.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Absolute value dropped.', 'Dividing by number of classes.', 'σ vs σ².'],
      activities: ['Measure heights in two groups; compare SDs.', 'Spreadsheet: change one value and watch σ.'],
      exit: ['Variance of 1, 2, 3, 4, 5.', 'M.D. about mean of 4, 7, 8, 9, 10, 12, 13, 17.', 'C.V. if x̄ = 50, σ = 10.'],
      homework: 'The mean and variance of 7 observations are 8 and 16. If five of them are 2, 4, 10, 12, 14, find the other two.'
    },

    slides: [
      { t: 'Statistics', b: ['Dispersion', 'Range and mean deviation', 'Variance and SD', 'Coefficient of variation'] },
      { t: 'Mean deviation', b: ['M.D.(a) = Σ|xᵢ − a|/n', 'About mean or median'] },
      { t: 'Variance and SD', b: ['σ² = Σ(xᵢ − x̄)²/n', '= Σxᵢ²/n − x̄²', 'σ = √σ²'] },
      { t: 'Compare', b: ['C.V. = σ/x̄ × 100', 'Smaller C.V. ⇒ more consistent'] },
      { t: 'Check yourself', b: ['σ² of 2, 4, 6?', 'Answer: 8/3'] }
    ],

    fs: { groups: [
        ['Spread', [['Range', 'max − min'], ['M.D. about a', 'Σ|xᵢ − a|/n'], ['Grouped M.D.', 'Σfᵢ|xᵢ − a|/N']]],
        ['Variance', [['Raw', 'σ² = Σ(xᵢ − x̄)²/n'], ['Short form', 'Σxᵢ²/n − x̄²'], ['Grouped', 'Σfᵢ(xᵢ − x̄)²/N'], ['Step deviation', 'yᵢ = (xᵢ − A)/h, σₓ = hσ_y'], ['SD', 'σ = √σ²']]],
        ['Effects and comparison', [['x + c', 'σ unchanged'], ['kx', 'σ → |k|σ'], ['C.V.', '(σ/x̄) × 100'], ['Consistency', 'smaller C.V.']]]],
      ex: [['6, 8, 10, 12, 14', 'x̄ = 10, σ² = 8, σ = 2√2'], ['x̄ = 60, σ = 15', 'C.V. = 25%']],
      rem: ['Square deviations for variance.', 'Divide by N, not number of classes.', 'σ is the root of σ².'] }
  });
})();
