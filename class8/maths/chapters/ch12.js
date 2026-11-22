/*
TOOL:    class8_maths_ch12
FAMILY:  CBSE_REVISION / Class 8 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class VIII moved into the series
CHANGES: 1.0.0 - Part II Ch 5 Tales by Dots and Lines - revise, 2 explore panels (mean as a balance point vs median, line graph of data over time), 6 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num } = G9;
  const mean = (a) => a.reduce((s, v) => s + v, 0) / a.length;
  const median = (a) => { const b = [...a].sort((x, y) => x - y), n = b.length; return n % 2 ? b[(n - 1) / 2] : (b[n / 2 - 1] + b[n / 2]) / 2; };

  G9.register({
    no: 12, part: 'Part II', short: 'Mean, median, graphs', title: 'Tales by Dots and Lines',
    blurb: '(Part II Ch 5) The mean as a balancing point, the median, how they change when data changes, spreadsheets, and line graphs.',
    revise: {
      oneLine: 'The mean is the value that balances the data (sum ÷ count); the median is the middle value. One extreme value pulls the mean a lot but the median hardly at all. Line graphs tell the story of data changing over time.',
      sections: [
        { h: 'Mean', html: `<p>Mean = sum of values ÷ number of values. It is the balance point: the deviations above it cancel those below it, Σ(x − mean) = 0.</p>
          <p>Adding k to every value adds k to the mean; multiplying by k multiplies the mean by k. Adding a new value equal to the mean leaves it unchanged; a value above it pulls it up.</p>` },
        { h: 'Median', html: `<p>Arrange in order; the middle value (n odd) or the average of the two middle values (n even). Use the median when there are extreme values (outliers), e.g. salaries.</p>` },
        { h: 'Spreadsheets', html: `<p>Cells are named by column and row (B3). Formulas start with =: =SUM(B2:B11), =AVERAGE(B2:B11), =MEDIAN(B2:B11), =MAX, =MIN. Changing one cell updates every result.</p>` },
        { h: 'Line graphs', html: `<p>Plot time on the horizontal axis and the quantity on the vertical axis; join the points. Steep segments show fast change; a falling line shows a decrease. Read values between points with care (interpolation).</p>` }
      ],
      formulas: [['Mean', 'Σx / n'], ['Total', 'mean × n'], ['Balance', 'Σ(x − mean) = 0'], ['Median (n odd)', '((n + 1)/2)th value'], ['Median (n even)', 'average of (n/2)th and (n/2 + 1)th'], ['Spreadsheet', '=AVERAGE(B2:B11)']],
      terms: [['Mean', 'average, the balance point'], ['Median', 'middle value in order'], ['Outlier', 'value far from the rest'], ['Line graph', 'points joined to show change over time']],
      traps: ['Forgetting to sort before finding the median.', 'Dividing by the wrong count.', 'Mean is not always one of the data values.', 'Line graphs only for continuous change (often over time).'],
      bridge: '<p>Class 9 Ch 10 (Understanding Data) covers weighted and combined averages; Class 10 Ch 13 grouped data.</p>'
    },

    explore: [
      {
        title: 'Mean balances, median sits in the middle', intro: 'Drag the dots along the line. The triangle under the mean balances the data; watch how an outlier pulls the mean but not the median.',
        build(el, K) {
          const b = new K.Board(el, { xmin: 0, xmax: 30, ymin: -3, ymax: 4, axes: false, grid: 0, equal: false, aspect: 0.3 }); const rd = K.read(el);
          const pts = [4, 7, 8, 10, 12, 13, 15].map(x => b.addPt(x, 0.6, { snap: 0.5, color: C.blue, constrain: (x, y) => [x, 0.6] }));
          b.onDraw = () => { b.clear(); b.line(0, 0, 30, 0, { color: C.ink, w: 3 }); for (let t = 0; t <= 30; t += 5) { b.line(t, -0.2, t, 0.2, { color: C.axis }); b.text(t, -0.8, String(t), { font: '12px' }); }
            const xs = pts.map(p => p.x); const m = mean(xs), md = median(xs);
            b.poly([[m, 0], [m - 0.6, -1.6], [m + 0.6, -1.6]], { fill: C.orange, color: C.orange }); b.line(md, -0.3, md, 2.6, { color: C.purple, w: 2, dash: [6, 4] }); b.text(md, 3, 'median', { color: C.purple, font: 'bold 12px' }); b.text(m, -2.3, 'mean', { color: C.orange, font: 'bold 12px' });
            b.drawPts(); rd.innerHTML = `data ${[...xs].sort((a, c) => a - c).map(v => num(v)).join(', ')} · sum ${num(xs.reduce((a, c) => a + c, 0))} · mean <b>${num(m, 3)}</b> · median <b>${num(md)}</b> · deviations from the mean add to ${num(xs.reduce((a, c) => a + c - m, 0), 6)}`; };
          b.redraw(); return null;
        }
      },
      {
        title: 'Read a line graph', intro: 'Temperatures through a day. Press <kbd>S</kbd> to reveal the graph point by point and note where it rises fastest.',
        build(el, K) {
          const T = [[6, 21], [8, 24], [10, 28], [12, 32], [14, 34], [16, 31], [18, 27], [20, 24], [22, 22]];
          const b = new K.Board(el, { xmin: 4, xmax: 24, ymin: 15, ymax: 38, equal: false, grid: 2 }); const rd = K.read(el); const an = new K.Anim(T.length - 1, () => b.redraw(), { ms: 600 });
          b.onDraw = () => { b.base(); const n = an.i + 1; for (let i = 1; i < n; i++) b.line(...T[i - 1], ...T[i], { color: C.blue, w: 3 }); for (let i = 0; i < n; i++) b.dot(...T[i], { color: C.orange, r: 5 });
            let best = 1; for (let i = 2; i < n; i++) if (T[i][1] - T[i - 1][1] > T[best][1] - T[best - 1][1]) best = i;
            rd.innerHTML = `time (h) → temperature (°C) · shown up to ${T[n - 1][0]}:00 (${T[n - 1][1]}°C)` + (n > 1 ? ` · fastest rise so far: ${T[best - 1][0]}:00–${T[best][0]}:00 (+${T[best][1] - T[best - 1][1]}°C)` : '') + (n === T.length ? ` · maximum 34°C at 14:00; mean of readings ${num(mean(T.map(t => t[1])), 2)}°C` : ''); };
          K.anim(el, an); b.redraw(); return an;
        }
      }
    ],

    gens: [
      { title: 'Mean', gen(R) {
          const n = R.int(5, 9); let xs, m; do { xs = Array.from({ length: n }, () => R.int(10, 60)); m = mean(xs); } while (!Number.isInteger(m * 10));
          return { q: `Find the mean of ${xs.join(', ')}.`, a: num(m, 2), ans: m, s: `sum ${xs.reduce((a, b) => a + b, 0)} ÷ ${n}` };
        } },
      { title: 'Median', gen(R) {
          const n = R.int(5, 10); const xs = Array.from({ length: n }, () => R.int(1, 50)); return { q: `Find the median of ${xs.join(', ')}.`, a: num(median(xs), 2), ans: median(xs), s: `sorted: ${[...xs].sort((a, b) => a - b).join(', ')}` };
        } },
      { title: 'Missing value from the mean', levels: [2, 3], gen(R) {
          const n = R.int(4, 7), m = R.int(20, 60); const xs = Array.from({ length: n - 1 }, () => R.int(m - 15, m + 15)); const x = n * m - xs.reduce((a, b) => a + b, 0);
          return { q: `The mean of ${n} numbers is ${m}. ${n - 1} of them are ${xs.join(', ')}. Find the last number.`, a: String(x), ans: x, s: `total ${n * m}` };
        } },
      { title: 'Effect of changes on the mean', levels: [2, 3], gen(R) {
          const n = R.int(5, 20), m = R.int(20, 60), k = R.int(2, 10), t = R.int(0, 2);
          if (t === 0) return { q: `The mean of ${n} values is ${m}. Each value is increased by ${k}. Find the new mean.`, a: String(m + k), ans: m + k };
          if (t === 1) return { q: `The mean of ${n} values is ${m}. Each value is multiplied by ${k}. Find the new mean.`, a: String(m * k), ans: m * k };
          const x = R.int(m + 5, m + 40); return { q: `The mean of ${n} values is ${m}. A new value ${x} is added. Find the new mean.`, a: num((n * m + x) / (n + 1), 2), ans: (n * m + x) / (n + 1), s: `(${n * m} + ${x}) / ${n + 1}` };
        } },
      { title: 'Spreadsheet formula', levels: [1, 2], gen(R) {
          const c = R.pick(['B', 'C', 'D']), a = R.int(2, 5), b = a + R.int(5, 20), f = R.pick([['total', 'SUM'], ['average', 'AVERAGE'], ['median', 'MEDIAN'], ['highest value', 'MAX']]);
          return { q: `Write the spreadsheet formula for the ${f[0]} of cells ${c}${a} to ${c}${b}.`, a: `=${f[1]}(${c}${a}:${c}${b})` };
        } },
      { title: 'Mean or median?', levels: [1, 2], gen(R) {
          const items = [['Salaries in a small company where the owner earns far more than everyone else', 'median (not pulled by the outlier)'], ['Average marks of a class with no extreme scores', 'mean'], ['House prices in a town with a few mansions', 'median'], ['Daily rainfall total over a month (to plan water storage)', 'mean (uses the total)']];
          const [q, a] = R.pick(items); return { q: `Which average is more suitable: ${q}?`, a };
        } }
    ],

    quiz: [
      { q: 'Mean of 4, 6, 8, 10, 12', o: ['8', '10', '6', '40'], a: 0, e: '40/5.' },
      { q: 'Median of 3, 9, 1, 7, 5', o: ['5', '9', '7', '3'], a: 0, e: 'Sorted 1, 3, 5, 7, 9.' },
      { q: 'Median of 2, 4, 6, 8', o: ['5', '4', '6', '20'], a: 0, e: '(4 + 6)/2.' },
      { q: 'Σ(x − mean) =', o: ['0', 'n', 'mean', 'sum'], a: 0, e: 'Balance.' },
      { q: 'Adding 5 to every value changes the mean by', o: ['+5', '×5', 'no change', '+5n'], a: 0, e: 'Shift.' },
      { q: 'An outlier affects more', o: ['the mean', 'the median', 'both equally', 'neither'], a: 0, e: 'Mean uses every value.' },
      { q: 'Spreadsheet average of A1 to A10', o: ['=AVERAGE(A1:A10)', '=SUM(A1:A10)', 'AVERAGE A1-A10', '=MEAN(A1,A10)'], a: 0, e: 'Formula syntax.' },
      { q: 'Mean of 5 values is 12; their sum', o: ['60', '17', '12', '2.4'], a: 0, e: '5 × 12.' },
      { q: 'A line graph is best for', o: ['change over time', 'parts of a whole', 'categories', 'one value'], a: 0, e: 'Trends.' },
      { q: 'Mean of 3, 3, 3, 3', o: ['3', '12', '0', '4'], a: 0, e: 'All equal.' },
      { q: 'Steepest segment of a line graph shows', o: ['fastest change', 'the maximum', 'the mean', 'no change'], a: 0, e: 'Slope.' }
    ],

    teach: {
      outcomes: ['Find the mean and median and explain the mean as a balance point', 'Predict how the mean and median change', 'Use spreadsheet formulas', 'Draw and read line graphs'],
      periods: [
        { t: 'Mean and median', flow: [['10 min', 'Ruler-and-coins balance.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Practice: missing values.']] },
        { t: 'Spreadsheets and line graphs', flow: [['15 min', 'Spreadsheet of class heights with formulas.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Unsorted median.', 'Mean must be a data value.', 'Line graphs for categories.'],
      activities: ['Balance a ruler with coins at the data positions.', 'Record temperature every hour; plot a line graph.'],
      exit: ['Mean of 12, 15, 18, 21.', 'Median of 7, 2, 9, 4, 6, 1.', 'Formula for the sum of C2:C9.'],
      homework: 'Record your sleep hours for 7 days. Find the mean and median, put them in a spreadsheet and draw a line graph.'
    },

    slides: [
      { t: 'Tales by Dots and Lines', b: ['Mean as a balance point', 'Median', 'Spreadsheets', 'Line graphs'] },
      { t: 'Mean and median', b: ['Mean = sum ÷ count', 'Median = middle value', 'Outliers pull the mean'] },
      { t: 'Spreadsheets', b: ['=SUM(B2:B11)', '=AVERAGE(B2:B11)', '=MEDIAN(B2:B11)'] },
      { t: 'Check yourself', b: ['Mean of 6 numbers is 10; total?', 'Answer: 60'] }
    ],

    fs: { groups: [
        ['Mean', [['Mean', 'Σx / n'], ['Total', 'mean × n'], ['Balance', 'Σ(x − mean) = 0'], ['x + k', 'mean + k'], ['kx', 'k × mean']]],
        ['Median', [['n odd', '((n + 1)/2)th value'], ['n even', 'average of middle two'], ['Use when', 'there are outliers']]],
        ['Spreadsheets', [['Sum', '=SUM(B2:B11)'], ['Mean', '=AVERAGE(B2:B11)'], ['Median', '=MEDIAN(B2:B11)'], ['Largest / smallest', '=MAX(…), =MIN(…)']]],
        ['Line graphs', [['Axes', 'time across, quantity up'], ['Steep', 'fast change'], ['Between points', 'estimate (interpolate)']]]],
      ex: [['Mean of 5 is 20; one 30 added', '(100 + 30)/6 ≈ 21.67'], ['Median of 12, 3, 7, 9', '(7 + 9)/2 = 8']],
      rem: ['Sort before the median.', 'Divide by the count.', 'Label both axes.'] }
  });
})();
