/*
TOOL:    class6_maths_ch04
FAMILY:  CBSE_REVISION / Class 6 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 4 Data Handling and Presentation (collecting and organising data, tally, pictographs, bar graphs, scales) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 4, part: 'All chapters', short: 'Data handling', title: 'Data Handling and Presentation',
    blurb: 'Collecting and organising data with tally marks and frequency tables, pictographs with keys, bar graphs with scales, reading and interpreting graphs and drawing conclusions.',
    revise: {
      oneLine: 'Organise raw data into a frequency table (tally), then present it as a pictograph (key) or a bar graph (scale). Bars have equal width and equal gaps; the scale should fit the biggest value. Read values to compare and conclude.',
      sections: [
        { h: 'Frequency table', html: `<p>Count each category with tally marks (𝍸 = 5) and write the total (frequency).</p>` },
        { h: 'Pictographs', html: `<p>Key: 1 symbol = 10 students; half symbol = 5.</p>` },
        { h: 'Bar graphs', html: `<p>Choose a scale (e.g. 1 unit = 20) so the tallest bar fits. Vertical or horizontal bars both work.</p>` }
      ],
      formulas: [['Frequency', 'how many times'], ['Pictograph value', 'symbols × key'], ['Bar value', 'height × scale'], ['Total', 'sum of frequencies']],
      terms: [['Data', 'collected facts'], ['Frequency', 'count'], ['Scale', 'value of one unit length']],
      traps: ['Scale not starting at 0.', 'Unequal bar widths.', 'Mixing up key and scale.'],
      bridge: '<p>Class 7 adds mean, median, mode and double bar graphs.</p>'
    },
    explore: [
      { title: 'Raw data to frequency table', intro: 'Press <kbd>S</kbd> to tally the next answer from a class survey of favourite sports.',
        build(el, K) { const RAW = 'CKCFBCKFCCBKFCKBCFCKCBFCKCBCFK'.split(''), NM = { C: 'cricket', K: 'kabaddi', F: 'football', B: 'badminton' }; const rd = K.read(el); const an = new K.Anim(RAW.length, () => draw(), { ms: 250 });
          function draw() { const k = an.i, cnt = { C: 0, K: 0, F: 0, B: 0 }; RAW.slice(0, k).forEach(c => cnt[c]++); const tally = x => '𝍸 '.repeat(Math.floor(x / 5)) + '|'.repeat(x % 5);
            rd.innerHTML = `<div style="font-family:Consolas;font-size:15px">${RAW.map((c, i) => `<span style="${i < k ? 'color:var(--grey,#64748b)' : 'font-weight:bold'}">${c}</span>`).join(' ')}</div><table style="margin-top:6px">${Object.keys(cnt).map(c => `<tr><td style="padding:2px 10px">${NM[c]}</td><td style="padding:2px 10px;font-size:18px">${tally(cnt[c]) || '—'}</td><td><b>${cnt[c]}</b></td></tr>`).join('')}</table>tallied ${k} of ${RAW.length} (C = cricket, K = kabaddi, F = football, B = badminton)`; }
          K.anim(el, an); draw(); return an; } },
      { title: 'Choose the scale', intro: 'Pick a scale; see whether the bars fit and are easy to read.',
        build(el, K) { const D = [['2019', 120], ['2020', 80], ['2021', 160], ['2022', 220], ['2023', 190]]; let s = 20; const row = K.row(el); K.select(row, '1 unit =', ['5', '20', '50', '100'], i => { s = [5, 20, 50, 100][i]; b.redraw(); }); const s0 = row.querySelector('select'); if (s0) s0.value = 1;
          const b = new K.Board(el, { xmin: -2.5, xmax: 11, ymin: -2, ymax: 13, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const top = 12; for (let u = 0; u <= top; u++) { b.line(0, u, 10.5, u, { color: C.grid, w: 1 }); b.text(-0.9, u, String(u * s), { font: '10px' }); } D.forEach(([y, v], i) => { const h = Math.min(v / s, top + 0.3); b.rect(0.6 + 2 * i, 0, 1.2, h, { fill: v / s > top ? C.orange : C.blue, color: C.ink, w: 1 }); b.text(1.2 + 2 * i, -1, y, { font: '11px' }); }); b.line(0, 0, 10.5, 0, { color: C.ink, w: 2 }); b.line(0, 0, 0, top + 0.5, { color: C.ink, w: 2 });
            const over = D.some(d => d[1] / s > top), tiny = Math.max(...D.map(d => d[1])) / s < 4; rd.innerHTML = `Trees planted each year · scale 1 unit = ${s} · ${over ? '<b>too small</b>: bars run off the graph (orange)' : tiny ? '<b>too big</b>: bars are short and hard to compare' : '<b>good scale</b>: tallest bar fits and differences are clear'}`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Tally to number', gen(R) { const n = R.int(6, 29); return { q: `Frequency shown by ${'𝍸 '.repeat(Math.floor(n / 5))}${'|'.repeat(n % 5)}?`, a: String(n), ans: n }; } },
      { title: 'Pictograph', gen(R) { const k = R.pick([5, 10, 20, 50]), p = R.int(2, 9), h = R.chance(.5); return { q: `Key: 1 symbol = ${k}. A row has ${p} symbols${h ? ' and a half' : ''}. Value?`, a: String(k * p + (h ? k / 2 : 0)), ans: k * p + (h ? k / 2 : 0) }; } },
      { title: 'Bar value', gen(R) { const s = R.pick([10, 20, 25, 50, 100]), u = R.int(2, 12); return { q: `Scale 1 unit = ${s}. A bar is ${u} units tall. Value?`, a: String(s * u), ans: s * u }; } },
      { title: 'Bar height', levels: [2, 3], gen(R) { const s = R.pick([10, 20, 50]), u = R.int(2, 10); return { q: `Scale 1 unit = ${s}. How many units tall is the bar for ${s * u}?`, a: String(u), ans: u }; } },
      { title: 'Interpret', levels: [2, 3], gen(R) { const v = [R.int(20, 90), R.int(20, 90), R.int(20, 90), R.int(20, 90)]; const n = ['Mon', 'Tue', 'Wed', 'Thu']; const mx = Math.max(...v), mn = Math.min(...v); return { q: `Books borrowed: Mon ${v[0]}, Tue ${v[1]}, Wed ${v[2]}, Thu ${v[3]}. Total, and the difference between the busiest and quietest days?`, a: `${v.reduce((a, x) => a + x, 0)}; ${mx - mn}` }; } }
    ],
    quiz: [
      { q: 'Tally 𝍸 𝍸 ||', o: ['12', '10', '7', '22'], a: 0, e: '10 + 2.' }, { q: 'Key 1 = 10; 4½ symbols', o: ['45', '40', '4.5', '50'], a: 0, e: '40 + 5.' },
      { q: 'Scale 1 unit = 20; 7 units', o: ['140', '27', '70', '120'], a: 0, e: '7 × 20.' }, { q: 'Frequency means', o: ['how many times', 'a key', 'a graph', 'the biggest'], a: 0, e: 'Count.' },
      { q: 'Bars should have', o: ['equal width and gaps', 'any width', 'no axis', 'curved tops'], a: 0, e: 'Fair.' }, { q: 'Max 220, about 10 units: scale', o: ['1 unit = 25', '1 unit = 5', '1 unit = 200', '1 unit = 1'], a: 0, e: 'Fits.' },
      { q: 'Scale should start at', o: ['0', 'the smallest value', '10', 'any number'], a: 0, e: 'Honest bars.' }, { q: 'Pictograph key tells', o: ['value of a symbol', 'the title', 'the scale', 'the date'], a: 0, e: 'Key.' },
      { q: 'Bar for 150 at 1 unit = 50', o: ['3 units', '5 units', '15 units', '50 units'], a: 0, e: '150 ÷ 50.' }, { q: 'Raw data must first be', o: ['organised', 'deleted', 'graphed only', 'averaged'], a: 0, e: 'Table.' },
      { q: 'Horizontal bar graphs are', o: ['also correct', 'wrong', 'only for money', 'pictographs'], a: 0, e: 'Either way.' }
    ],
    teach: {
      outcomes: ['Organise data in tables', 'Draw pictographs and bar graphs', 'Choose scales and interpret graphs'],
      periods: [{ t: 'Organising', flow: [['10 min', 'Class survey.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Pictograph with key.']] }, { t: 'Bar graphs', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Draw bar graph on graph paper.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Scale not from 0.', 'Key/scale mixed.'], activities: ['School survey project.', 'Newspaper graph critique.'],
      exit: ['Scale for max 480.', 'Read a pictograph row.', 'One conclusion.'], homework: 'Record the number of vehicles passing your house in 10 minutes at 3 different times. Make a table and a bar graph.'
    },
    slides: [{ t: 'Data Handling and Presentation', b: ['Frequency tables', 'Pictographs', 'Bar graphs', 'Choosing a scale'] }, { t: 'Check yourself', b: ['Scale 1 = 50, 6½ units?', 'Tally for 17?'] }],
    fs: { groups: [['Organise', [['Tally', 'bundles of 5'], ['Frequency', 'count per category']]], ['Present', [['Pictograph', 'symbols × key'], ['Bar graph', 'height × scale'], ['Scale', 'fits the biggest value']]], ['Interpret', [['Compare', 'most, least, difference'], ['Total', 'sum']]]],
      ex: [['Key 10, 4½', '45'], ['1 unit = 20, 7 units', '140']], rem: ['Scale starts at 0.', 'Equal widths and gaps.', 'Title and labels.'] }
  });
})();
