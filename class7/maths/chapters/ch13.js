/*
TOOL:    class7_maths_ch13
FAMILY:  CBSE_REVISION / Class 7 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 13 Connecting the Dots (Part II Ch 5: collecting and summarising data, mean and median, range, comparing groups, bar graphs) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const mean = a => a.reduce((s, x) => s + x, 0) / a.length, med = a => { const s = [...a].sort((x, y) => x - y), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
  const f = x => (+x.toFixed(2)).toString();
  G9.register({
    no: 13, part: 'Part II', short: 'Mean and median', title: 'Connecting the Dots',
    blurb: 'Part II Chapter 5. Making sense of data: the mean (average) as fair share, the median as the middle value, range as spread, effect of extreme values, comparing two groups, and reading bar graphs and dot plots.',
    revise: {
      oneLine: 'Mean = total ÷ number of values (levelling out). Median = middle value after sorting (average of the two middle values when the count is even). Range = largest − smallest. One very large value pulls the mean but hardly moves the median.',
      sections: [
        { h: 'Mean', html: `<p>Runs 12, 15, 9, 20, 14: total 70, mean 70 ÷ 5 = 14.</p>` },
        { h: 'Median', html: `<p>Sorted 9, 12, 14, 15, 20 → median 14. For 6 values: average the 3rd and 4th.</p>` },
        { h: 'Which to use?', html: `<p>Salaries with one very rich person: the median describes a typical person better.</p>` }
      ],
      formulas: [['Mean', 'sum ÷ count'], ['Median (odd n)', 'middle value'], ['Median (even n)', 'average of two middle'], ['Range', 'max − min'], ['Sum', 'mean × count']],
      terms: [['Data', 'collected values'], ['Mean', 'average'], ['Median', 'middle'], ['Outlier', 'unusually far value']],
      traps: ['Forgetting to sort before finding the median.', 'Dividing by the wrong count.', 'Mean need not be one of the values.'],
      bridge: '<p>Class 8 uses line graphs and spreadsheets for data.</p>'
    },
    explore: [
      { title: 'Mean as levelling', intro: 'Set five stacks; the mean is the level when they are shared out equally.',
        build(el, K) { const v = [12, 15, 9, 20, 14]; const row = K.row(el); v.forEach((x, i) => K.slider(row, 'day ' + (i + 1), 0, 30, 1, x, val => { v[i] = val; b.redraw(); })); const b = new K.Board(el, { xmin: -0.5, xmax: 10.5, ymin: -2, ymax: 32, axes: false, grid: 0, aspect: 0.55 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const m = mean(v), md = med(v); for (let y = 0; y <= 30; y += 5) { b.line(0, y, 10.2, y, { color: C.grid, w: 1 }); b.text(-0.3, y, String(y), { font: '10px', align: 'right' }); } v.forEach((x, i) => b.rect(0.5 + 2 * i, 0, 1.2, x, { fill: x > m ? C.orange : C.blue, color: C.ink, w: 1 })); b.line(0, m, 10.2, m, { color: C.purple, w: 3, dash: [8, 5] }); b.text(10.3, m + 1, 'mean', { font: '11px', color: C.purple, align: 'right' });
            rd.innerHTML = `values ${v.join(', ')} · sum ${v.reduce((s, x) => s + x, 0)} · mean <b>${f(m)}</b> · median <b>${f(md)}</b> · range ${Math.max(...v) - Math.min(...v)} · orange bars give to blue bars to level at the mean`; };
          b.redraw(); return null; } },
      { title: 'The pull of an outlier', intro: 'Add one very large value; compare mean and median.',
        build(el, K) { const base = [18, 20, 21, 22, 24, 25]; let o = 25; const row = K.row(el); K.slider(row, 'last value', 25, 200, 1, o, v => { o = v; draw(); }); const rd = K.read(el);
          function draw() { const d = [...base, o]; rd.innerHTML = `<div style="font-size:18px">${d.join(', ')}</div>mean <b>${f(mean(d))}</b> · median <b>${f(med(d))}</b> · ${o > 60 ? 'the outlier drags the mean up; the median stays typical' : 'no outlier: mean and median are close'}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Mean', gen(R) { const n = R.int(4, 7), m = R.int(10, 60); const v = Array.from({ length: n - 1 }, () => m + R.int(-8, 8)); v.push(m * n - v.reduce((s, x) => s + x, 0)); return { q: `Mean of ${v.join(', ')}?`, a: String(m), ans: m }; } },
      { title: 'Median', gen(R) { const n = R.pick([5, 6, 7]); const v = Array.from({ length: n }, () => R.int(1, 50)); return { q: `Median of ${v.join(', ')}?`, a: f(med(v)), ans: med(v), tol: 1e-6 }; } },
      { title: 'Range', gen(R) { const v = Array.from({ length: 6 }, () => R.int(5, 95)); return { q: `Range of ${v.join(', ')}?`, a: String(Math.max(...v) - Math.min(...v)), ans: Math.max(...v) - Math.min(...v) }; } },
      { title: 'Missing value', levels: [2, 3], gen(R) { const m = R.int(20, 60), v = [m + 3, m - 5, m + 7, m - 1]; const x = 5 * m - v.reduce((s, y) => s + y, 0); return { q: `The mean of five numbers is ${m}. Four are ${v.join(', ')}. The fifth?`, a: String(x), ans: x }; } },
      { title: 'Which average?', levels: [3], gen(R) { const t = R.pick([['house prices in a street with one mansion', 'median'], ['the average marks of a class with no unusual scores', 'mean'], ['incomes in a village with one millionaire', 'median'], ['heights of children in a class', 'mean (or median; they will be close)']]); return { q: `Which average describes ${t[0]} better?`, a: t[1] }; } }
    ],
    quiz: [
      { q: 'Mean of 12, 15, 9, 20, 14', o: ['14', '15', '70', '12'], a: 0, e: '70 ÷ 5.' }, { q: 'Median of 9, 12, 14, 15, 20', o: ['14', '12', '15', '14.5'], a: 0, e: 'Middle.' },
      { q: 'Median of 3, 5, 8, 10', o: ['6.5', '5', '8', '6'], a: 0, e: '(5 + 8) ÷ 2.' }, { q: 'Range of 4, 9, 2, 15', o: ['13', '11', '15', '30'], a: 0, e: '15 − 2.' },
      { q: 'An outlier affects more', o: ['the mean', 'the median', 'neither', 'the count'], a: 0, e: 'Sum changes.' }, { q: 'Mean 20 of 5 numbers: sum', o: ['100', '25', '4', '20'], a: 0, e: 'Mean × count.' },
      { q: 'Before median you must', o: ['sort the data', 'add the data', 'find the mean', 'remove zeros'], a: 0, e: 'Order.' }, { q: 'Mean must be one of the values?', o: ['no', 'yes', 'only for odd count', 'only integers'], a: 0, e: 'e.g. 2.5.' },
      { q: 'Incomes with one millionaire: better average', o: ['median', 'mean', 'range', 'maximum'], a: 0, e: 'Typical.' }, { q: 'Mean of 2, 4, 6, 8', o: ['5', '4', '6', '20'], a: 0, e: '20 ÷ 4.' },
      { q: 'Range measures', o: ['spread', 'centre', 'total', 'count'], a: 0, e: 'Max − min.' }
    ],
    teach: {
      outcomes: ['Compute mean, median and range', 'Explain the effect of outliers', 'Choose a suitable average'],
      periods: [{ t: 'Mean', flow: [['10 min', 'Levelling cube towers.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Missing-value problems.']] }, { t: 'Median', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Compare two classes.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Median without sorting.', 'Mean must be a data value.'], activities: ['Class height survey.', 'Cricket scores analysis.'],
      exit: ['Mean of 7 values.', 'Median of 8 values.', 'Effect of an outlier.'], homework: 'Record daily minutes of screen time for a week; find the mean, median and range and comment.'
    },
    slides: [{ t: 'Connecting the Dots', b: ['Mean as fair share', 'Median', 'Range', 'Outliers', 'Comparing groups'] }, { t: 'Check yourself', b: ['Mean of 5, 7, 9, 11?', 'Median of 1, 4, 4, 9, 12, 15?'] }],
    fs: { groups: [['Averages', [['Mean', 'sum ÷ count'], ['Median', 'middle after sorting'], ['Even count', 'average of two middle']]], ['Spread', [['Range', 'max − min'], ['Outlier', 'pulls the mean']]], ['Tricks', [['Sum', 'mean × count'], ['Missing value', 'sum − known values']]]],
      ex: [['12, 15, 9, 20, 14', 'mean 14, median 14'], ['3, 5, 8, 10', 'median 6.5']], rem: ['Sort before median.', 'Check your count.', 'Watch for outliers.'] }
  });
})();
