/*
TOOL:    class10_maths_ch13
FAMILY:  CBSE_REVISION / Class 10 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 13 Statistics - revise, board focus, 1 explore panel (grouped data calculator with histogram), 6 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { F, num, C } = G9;
  function stats(L, h, f) { // L lower limit of first class
    const k = f.length, x = f.map((_, i) => L + h * i + h / 2), n = f.reduce((a, b) => a + b, 0), fx = f.reduce((s, fi, i) => s + fi * x[i], 0);
    const mean = fx / n; let cf = 0, mi = 0; for (let i = 0; i < k; i++) { if (cf + f[i] >= n / 2) { mi = i; break; } cf += f[i]; }
    const median = L + h * mi + (n / 2 - cf) / f[mi] * h; let mo = 0; f.forEach((v, i) => { if (v > f[mo]) mo = i; });
    const f0 = mo > 0 ? f[mo - 1] : 0, f2 = mo < k - 1 ? f[mo + 1] : 0, mode = L + h * mo + (f[mo] - f0) / (2 * f[mo] - f0 - f2) * h;
    return { x, n, fx, mean, median, mode, mi, cfBefore: cf, mo, f0, f2 };
  }
  const table = (L, h, f) => `<table class="t" style="width:auto"><tr><th>Class</th>${f.map((_, i) => `<td>${L + h * i}–${L + h * (i + 1)}</td>`).join('')}</tr><tr><th>Frequency</th>${f.map(v => `<td>${v}</td>`).join('')}</tr></table>`;

  G9.register({
    no: 13, part: 'Unit VII · Statistics & Probability (11 marks)', short: 'Statistics', title: 'Statistics',
    blurb: 'Mean (direct, assumed mean, step deviation), median and mode of grouped data, empirical relation.',
    revise: {
      oneLine: 'For grouped data we work with class marks and frequencies: the mean averages class marks weighted by frequency; the median and mode come from formulas using the median class and the modal class.',
      sections: [
        { h: 'Mean of grouped data', html: `<p>Class mark xᵢ = (lower + upper)/2.</p>
          <ul><li><b>Direct</b>: x̄ = Σfᵢxᵢ / Σfᵢ.</li><li><b>Assumed mean</b>: dᵢ = xᵢ − a, x̄ = a + Σfᵢdᵢ/Σfᵢ.</li><li><b>Step deviation</b>: uᵢ = (xᵢ − a)/h, x̄ = a + h·Σfᵢuᵢ/Σfᵢ.</li></ul><p>All three give the same answer — choose the one with easiest arithmetic.</p>` },
        { h: 'Mode of grouped data', html: `<p>Modal class = class with the highest frequency.</p>
          <div class="box m">Mode = l + ${F('f₁ − f₀', '2f₁ − f₀ − f₂')} × h</div>
          <p>l = lower limit of the modal class, f₁ its frequency, f₀ / f₂ frequencies of the classes before / after, h class size.</p>` },
        { h: 'Median of grouped data', html: `<p>Find n = Σf and cumulative frequencies. Median class = first class whose cf ≥ n/2.</p>
          <div class="box m">Median = l + ${F('n/2 − cf', 'f')} × h</div>
          <p>cf = cumulative frequency of the class <b>before</b> the median class; f = frequency of the median class.</p>` },
        { h: 'Empirical relation and choice', html: `<p>3 Median = Mode + 2 Mean (approximately, for moderately skewed data).</p>
          <p>Mean uses every value but is pulled by extremes; median is better for skewed data (incomes); mode for the "most common" (shoe sizes).</p>` }
      ],
      formulas: [['Class mark', '(lower + upper)/2'], ['Mean (direct)', 'Σfx / Σf'], ['Step deviation', 'a + h Σfu / Σf, u = (x − a)/h'], ['Mode', 'l + (f₁ − f₀)/(2f₁ − f₀ − f₂) × h'], ['Median', 'l + (n/2 − cf)/f × h'], ['Empirical', '3 Median = Mode + 2 Mean']],
      terms: [['Class mark', 'midpoint of a class'], ['Modal class', 'class with highest frequency'], ['Median class', 'class containing the n/2-th value'], ['Cumulative frequency', 'running total of frequencies']],
      traps: ['Using the frequency of the median class for cf (cf is of the class before).', 'Modal class f₀/f₂ taken from the wrong side.', 'Forgetting to convert inclusive classes (10–19, 20–29) to exclusive (9.5–19.5).', 'Dividing Σfx by the number of classes instead of Σf.'],
      board: '<p><b>Unit VII (Statistics & Probability) — 11 marks.</b> Expect a 3–5 mark question on mean/median/mode of a grouped table (often with a missing frequency), and a 1-mark on the empirical relation or class marks. Show the full table.</p>',
      bridge: '<p>Class 9 Ch 10 covered weighted averages — the grouped mean is a weighted average of class marks.</p>'
    },

    explore: [
      {
        title: 'Grouped-data calculator', intro: 'Edit the frequencies. The histogram, mean, median and mode update; median and modal classes are highlighted.',
        build(el, K) {
          const L = 0, h = 10, f = [5, 8, 15, 12, 6, 4]; const row = K.row(el);
          f.forEach((v, i) => K.slider(row, `${L + h * i}–${L + h * (i + 1)}`, 0, 25, 1, v, x => { f[i] = x; b.redraw(); }));
          const b = new K.Board(el, { xmin: -5, xmax: 65, ymin: -3, ymax: 28, equal: false, axes: false, grid: 0, aspect: 0.4 }); const rd = K.read(el);
          b.onDraw = () => {
            b.clear(); if (f.reduce((a, c) => a + c, 0) === 0) { rd.innerHTML = 'All frequencies are 0.'; return; }
            const S = stats(L, h, f); b.line(0, 0, 62, 0, { color: C.axis, w: 2 }); for (let y = 0; y <= 25; y += 5) b.text(-2, y, String(y), { font: '11px' });
            f.forEach((v, i) => { b.rect(L + h * i, 0, h, v, { fill: i === S.mo ? C.orangeL : i === S.mi ? C.purpleL : C.blueL, color: i === S.mo ? C.orange : i === S.mi ? C.purple : C.blue, w: 2 }); b.text(L + h * i, -1.6, String(L + h * i), { font: '11px' }); });
            [[S.mean, 'mean', C.blue], [S.median, 'median', C.purple], [S.mode, 'mode', C.orange]].forEach(([v, l, c], k) => { b.line(v, 0, v, 26, { color: c, w: 2.5, dash: [6, 4] }); b.text(v, 26.5 - k * 1.6, l, { font: 'bold 12px', color: c }); });
            rd.innerHTML = `n = ${S.n}, Σfx = ${num(S.fx)} ⇒ <b>mean = ${num(S.mean)}</b><br>Median class ${L + h * S.mi}–${L + h * (S.mi + 1)} (cf before = ${S.cfBefore}, f = ${f[S.mi]}) ⇒ <b>median = ${num(S.median)}</b><br>Modal class ${L + h * S.mo}–${L + h * (S.mo + 1)} (f₀ = ${S.f0}, f₁ = ${f[S.mo]}, f₂ = ${S.f2}) ⇒ <b>mode = ${num(S.mode)}</b><br>Check 3 median ≈ mode + 2 mean: ${num(3 * S.median)} vs ${num(S.mode + 2 * S.mean)}`;
          };
          b.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Mean of grouped data', gen(R, L) {
          const h = R.pick([5, 10, 20]), L0 = R.int(0, 4) * h, k = 5, f = Array.from({ length: k }, () => R.int(2, 15)); const S = stats(L0, h, f);
          return { q: `Find the mean of the following distribution${L === 3 ? ' using the step-deviation method' : ''}:<br>${table(L0, h, f)}`, a: num(S.mean), ans: S.mean, tol: 0.02, s: `class marks ${S.x.join(', ')}; Σfx = ${num(S.fx)}, Σf = ${S.n}` };
        } },
      { title: 'Mode of grouped data', gen(R) {
          const h = R.pick([5, 10, 20]), L0 = R.int(0, 4) * h, f = Array.from({ length: 6 }, () => R.int(2, 12)); const m = R.int(1, 4); f[m] = Math.max(...f) + R.int(1, 5); const S = stats(L0, h, f);
          return { q: `Find the mode of the following data:<br>${table(L0, h, f)}`, a: num(S.mode), ans: S.mode, tol: 0.02, s: `modal class ${L0 + h * S.mo}–${L0 + h * (S.mo + 1)}; ${L0 + h * S.mo} + (${f[S.mo]} − ${S.f0})/(2×${f[S.mo]} − ${S.f0} − ${S.f2}) × ${h}` };
        } },
      { title: 'Median of grouped data', gen(R) {
          const h = R.pick([5, 10, 20]), L0 = R.int(0, 4) * h, f = Array.from({ length: 6 }, () => R.int(2, 14)); const S = stats(L0, h, f);
          return { q: `Find the median of the following data:<br>${table(L0, h, f)}`, a: num(S.median), ans: S.median, tol: 0.02, s: `n = ${S.n}, n/2 = ${S.n / 2}; median class ${L0 + h * S.mi}–${L0 + h * (S.mi + 1)}, cf = ${S.cfBefore}, f = ${f[S.mi]}` };
        } },
      { title: 'Missing frequency from the mean', levels: [2, 3], gen(R) {
          const h = 10, L0 = 0; let f, p, S, tries = 0; do { f = [R.int(3, 10), R.int(3, 10), 0, R.int(3, 10), R.int(3, 10)]; p = R.int(3, 15); f[2] = p; S = stats(L0, h, f); tries++; } while (Math.abs(S.mean * 10 - Math.round(S.mean * 10)) > 1e-9 && tries < 400);
          return { q: `The mean of the following distribution is ${num(S.mean)}. Find the missing frequency p.<br>${table(L0, h, f).replace(`<td>${p}</td>`, '<td>p</td>')}`, a: `p = ${p}`, ans: p, s: `Σfx/Σf = mean ⇒ solve the linear equation in p` };
        } },
      { title: 'Empirical relation', levels: [1, 2], gen(R) {
          const mean = R.int(20, 60), med = mean + R.int(-5, 5);
          return { q: `For a moderately skewed distribution, mean = ${mean} and median = ${med}. Find the mode using the empirical relation.`, a: String(3 * med - 2 * mean), ans: 3 * med - 2 * mean, s: 'Mode = 3 Median − 2 Mean' };
        } },
      { title: 'Class marks and cumulative frequency', levels: [1], gen(R) {
          const h = R.pick([5, 10]), L0 = R.int(1, 5) * h, f = Array.from({ length: 5 }, () => R.int(2, 12)); let c = 0; const cf = f.map(v => c += v);
          return { q: `Write the class marks and the cumulative frequencies:<br>${table(L0, h, f)}`, a: `class marks ${f.map((_, i) => L0 + h * i + h / 2).join(', ')}; cf ${cf.join(', ')}`, s: 'class mark = (lower + upper)/2; cf = running total' };
        } }
    ],

    quiz: [
      { q: 'Class mark of 10–20', o: ['10', '15', '20', '30'], a: 1, e: 'Midpoint.' },
      { q: 'Empirical relation', o: ['3 Median = Mode + 2 Mean', '3 Mean = Mode + 2 Median', 'Mode = Mean + Median', '2 Median = Mode + Mean'], a: 0, e: 'Standard form.' },
      { q: 'Mean = 30, Median = 32. Mode ≈', o: ['36', '34', '28', '31'], a: 0, e: '96 − 60.' },
      { q: 'The modal class is the class with', o: ['highest frequency', 'highest cf', 'middle position', 'largest class mark'], a: 0, e: 'Definition.' },
      { q: 'In the median formula, cf is the cumulative frequency of', o: ['the median class', 'the class before the median class', 'the last class', 'the modal class'], a: 1, e: 'Preceding class.' },
      { q: 'Σfᵢ = 50, Σfᵢxᵢ = 1500. Mean =', o: ['30', '25', '50', '1500'], a: 0, e: '1500/50.' },
      { q: 'Median class is the first class whose cf is at least', o: ['n', 'n/2', 'n/4', 'f'], a: 1, e: 'Half the total.' },
      { q: 'In the step-deviation method, uᵢ =', o: ['(xᵢ − a)/h', 'xᵢ − a', 'xᵢ/h', 'a − xᵢ'], a: 0, e: 'Scaled deviations.' },
      { q: 'Which measure is best for "most common shoe size"?', o: ['mean', 'median', 'mode', 'range'], a: 2, e: 'Most frequent.' },
      { q: 'Inclusive classes 10–19, 20–29 are made exclusive by', o: ['adding 0.5 to both limits', 'subtracting 0.5 from lower and adding 0.5 to upper', 'doubling', 'nothing'], a: 1, e: '9.5–19.5, 19.5–29.5.' },
      { q: 'Mode formula uses f₀ and f₂ which are', o: ['frequencies before and after the modal class', 'first and last frequencies', 'cumulative frequencies', 'class marks'], a: 0, e: 'Neighbouring classes.' }
    ],

    teach: {
      outcomes: ['Compute the mean of grouped data by three methods', 'Find the median and mode of grouped data', 'Use the empirical relation', 'Choose a suitable measure of central tendency'],
      periods: [
        { t: 'Mean', flow: [['10 min', 'Class-height data grouped on the board.'], ['20 min', 'Direct, assumed mean, step deviation — same answer.'], ['10 min', 'Practice: mean.']] },
        { t: 'Mode and median', flow: [['15 min', 'Explore panel: highlight modal and median classes.'], ['15 min', 'Formulas; worked table.'], ['10 min', 'Missing frequency problem.']] },
        { t: 'Review', flow: [['20 min', 'Full table problem: mean, median, mode, empirical check.'], ['20 min', 'Check quiz and corrections.']] }
      ],
      misconceptions: ['cf of the wrong class.', 'Dividing by number of classes.', 'Inclusive classes not adjusted.'],
      activities: ['Collect pocket-money or travel-time data; group it.', 'Histogram on graph paper; mark mean/median/mode.'],
      exit: ['Class marks of 0–10, 10–20, 20–30.', 'Mode with l = 40, f₁ = 12, f₀ = 7, f₂ = 6, h = 10.', 'Mean 25, mode 22: median?'],
      homework: 'Collect the marks of 30 classmates (with permission), group them and find mean, median and mode.'
    },

    slides: [
      { t: 'Statistics', b: ['Mean of grouped data', 'Mode', 'Median', 'Empirical relation'] },
      { t: 'Mean', b: ['Class mark x = (lower + upper)/2', 'Direct: Σfx/Σf', 'Step deviation: a + h Σfu/Σf'] },
      { t: 'Mode', b: ['Modal class: highest f', 'l + (f₁ − f₀)/(2f₁ − f₀ − f₂) × h'] },
      { t: 'Median', b: ['Median class: first cf ≥ n/2', 'l + (n/2 − cf)/f × h', 'cf of the class before'] },
      { t: 'Empirical relation', b: ['3 Median = Mode + 2 Mean'] },
      { t: 'Check yourself', b: ['Mean 40, median 42: mode?', 'Answer: 46'] }
    ],

    fs: { groups: [
        ['Basics', [['Class mark', '(lower + upper)/2'], ['n', 'Σf'], ['Inclusive → exclusive', 'subtract/add 0.5']]],
        ['Mean', [['Direct', 'x̄ = Σfx / Σf'], ['Assumed mean', 'x̄ = a + Σfd / Σf, d = x − a'], ['Step deviation', 'x̄ = a + h·Σfu / Σf, u = (x − a)/h']]],
        ['Mode', [['Modal class', 'highest frequency'], ['Formula', 'l + (f₁ − f₀)/(2f₁ − f₀ − f₂) × h']]],
        ['Median', [['Median class', 'first class with cf ≥ n/2'], ['Formula', 'l + (n/2 − cf)/f × h'], ['cf', 'of the class before the median class']]],
        ['Relation', [['Empirical', '3 Median = Mode + 2 Mean']]]],
      ex: [['l = 40, f₁ = 12, f₀ = 7, f₂ = 6, h = 10', 'mode = 40 + 5/11 × 10 ≈ 44.55'], ['n = 50, l = 30, cf = 20, f = 10, h = 10', 'median = 30 + (25 − 20)/10 × 10 = 35']],
      rem: ['Show the full table (x, f, fx, cf).', 'Median uses cf of the previous class.', 'Make classes continuous first.'] }
  });
})();
