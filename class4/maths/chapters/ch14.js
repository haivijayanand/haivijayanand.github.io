/*
TOOL:    class4_maths_ch14
FAMILY:  CBSE_REVISION / Class 4 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 14 Data Handling (tally marks, tables, pictographs with a key, bar graphs, reading and asking questions) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 14, part: 'All chapters', short: 'Data handling', title: 'Data Handling',
    blurb: 'Collecting data with tally marks, organising it in tables, showing it as pictographs (with a key) and bar graphs, and answering questions from them.',
    revise: {
      oneLine: 'Collect data with tally marks (𝍸 = 5), put it in a table, then draw a pictograph (one picture stands for several, shown in the key) or a bar graph (bar heights read on a scale). Read graphs to find the most, the least, totals and differences.',
      sections: [
        { h: 'Tally and table', html: `<p>Favourite fruit: mango |||| ||| = 8.</p>` },
        { h: 'Pictograph', html: `<p>Key 🍎 = 2 children: 🍎🍎🍎🍎 = 8; half a picture = 1.</p>` },
        { h: 'Bar graph', html: `<p>Equal-width bars, a scale on the side (0, 2, 4…). Taller bar = more.</p>` }
      ],
      formulas: [['Tally bundle', '5'], ['Pictograph', 'pictures × key'], ['Difference', 'bigger − smaller'], ['Total', 'add all']],
      terms: [['Data', 'collected information'], ['Key / scale', 'what one picture or step means'], ['Bar graph', 'bars show amounts']],
      traps: ['Forgetting the key.', 'Bars of different widths.', 'Reading a bar between scale lines.'],
      bridge: '<p>Class 5 reads tables and larger bar graphs.</p>'
    },
    explore: [
      { title: 'Tally to bar graph', intro: 'Change the counts. Tally, pictograph (key 🙂 = 2) and bar graph update together.',
        build(el, K) { const nm = ['mango', 'banana', 'apple', 'guava'], v = [8, 5, 6, 3]; const row = K.row(el); nm.forEach((n, i) => K.slider(row, n, 0, 12, 1, v[i], x => { v[i] = x; b.redraw(); })); const rd = K.read(el);
          const b = new K.Board(el, { xmin: -2, xmax: 9, ymin: -1.4, ymax: 13, axes: false, grid: 0, aspect: 0.55 });
          b.onDraw = () => { b.clear(); for (let y = 0; y <= 12; y += 2) { b.line(0, y, 8.5, y, { color: C.grid, w: 1 }); b.text(-0.5, y, String(y), { font: '11px' }); } v.forEach((x, i) => { b.rect(0.5 + 2 * i, 0, 1.2, x, { fill: [C.orange, C.yellow, C.blue, C.purple][i], color: C.ink, w: 1 }); b.text(1.1 + 2 * i, -0.7, nm[i], { font: '12px' }); }); b.line(0, 0, 8.5, 0, { color: C.ink, w: 2 }); b.line(0, 0, 0, 12.5, { color: C.ink, w: 2 });
            const tally = x => '𝍸 '.repeat(Math.floor(x / 5)) + '|'.repeat(x % 5); const mx = Math.max(...v), mn = Math.min(...v);
            rd.innerHTML = `<table style="border-collapse:collapse">${nm.map((n, i) => `<tr><td style="padding:2px 10px">${n}</td><td style="padding:2px 10px;font-size:18px">${tally(v[i]) || '—'}</td><td style="padding:2px 10px"><b>${v[i]}</b></td><td style="padding:2px 10px">${'🙂'.repeat(Math.floor(v[i] / 2))}${v[i] % 2 ? '◐' : ''}</td></tr>`).join('')}</table>total ${v.reduce((a, x) => a + x, 0)} · most: ${nm[v.indexOf(mx)]} · least: ${nm[v.indexOf(mn)]} · difference ${mx - mn}`; };
          b.redraw(); return null; } },
      { title: 'Read the graph', intro: 'Press <kbd>S</kbd> for a new question about the vehicles counted near school.',
        build(el, K) { const nm = ['cars', 'bikes', 'buses', 'autos', 'cycles'], v = [24, 36, 8, 16, 28]; let q = -1; const b = new K.Board(el, { xmin: -3, xmax: 11, ymin: -5, ymax: 42, axes: false, grid: 0, aspect: 0.55 }); const rd = K.read(el);
          const Q = [['Which vehicle was seen most?', 'bikes (36)'], ['How many more cycles than autos?', '28 − 16 = 12'], ['Total vehicles counted?', '24 + 36 + 8 + 16 + 28 = 112'], ['Which was seen least?', 'buses (8)'], ['How many cars and buses together?', '24 + 8 = 32']];
          b.onDraw = () => { b.clear(); for (let y = 0; y <= 40; y += 4) { b.line(0, y, 10.5, y, { color: C.grid, w: 1 }); b.text(-0.7, y, String(y), { font: '11px' }); } v.forEach((x, i) => { b.rect(0.5 + 2 * i, 0, 1.2, x, { fill: C.blue, color: C.ink, w: 1 }); b.text(1.1 + 2 * i, -2.5, nm[i], { font: '12px' }); }); b.line(0, 0, 10.5, 0, { color: C.ink, w: 2 }); b.line(0, 0, 0, 41, { color: C.ink, w: 2 });
            rd.innerHTML = q < 0 ? 'scale: each line = 4 vehicles' : `${Q[q][0]} → <b>${Q[q][1]}</b>`; };
          const step = () => { q = (q + 1) % Q.length; b.redraw(); }; const row = K.row(el); K.button(row, 'Next question (S)', step); b.redraw(); return { step, play() {}, pause() {} }; } }
    ],
    gens: [
      { title: 'Count the tally', gen(R) { const n = R.int(3, 23); return { q: `What number is ${'𝍸 '.repeat(Math.floor(n / 5))}${'|'.repeat(n % 5)}?`, a: String(n), ans: n }; } },
      { title: 'Pictograph key', gen(R) { const k = R.pick([2, 5, 10]), p = R.int(2, 8); return { q: `Key: ⭐ = ${k} children. A row shows ${'⭐'.repeat(p)}. How many children?`, a: String(k * p), ans: k * p }; } },
      { title: 'Half a picture', levels: [2, 3], gen(R) { const k = R.pick([2, 4, 10]), p = R.int(2, 6); return { q: `Key: 🍎 = ${k}. A row has ${p} full apples and a half apple. How many?`, a: String(k * p + k / 2), ans: k * p + k / 2 }; } },
      { title: 'Most and difference', gen(R) { const v = [R.int(5, 30), R.int(5, 30), R.int(5, 30)]; const nm = ['red', 'blue', 'green']; const mx = Math.max(...v), mn = Math.min(...v); return { q: `Votes for colours: red ${v[0]}, blue ${v[1]}, green ${v[2]}. Difference between the most and the least?`, a: String(mx - mn), ans: mx - mn }; } },
      { title: 'Read a bar', levels: [3], gen(R) { const s = R.pick([2, 5, 10]), k = R.int(2, 8); return { q: `A bar reaches ${k} lines on a scale where each line is ${s}. What does it show? If it is halfway to the next line?`, a: `${k * s}; halfway → ${k * s + s / 2}` }; } }
    ],
    quiz: [
      { q: 'Tally 𝍸 |||', o: ['8', '5', '3', '53'], a: 0, e: '5 + 3.' }, { q: 'Key ⭐ = 5; ⭐⭐⭐', o: ['15', '3', '8', '5'], a: 0, e: '3 × 5.' },
      { q: 'A key tells', o: ['what one picture means', 'the title', 'the date', 'nothing'], a: 0, e: 'Key.' }, { q: 'In a bar graph, a taller bar shows', o: ['more', 'less', 'same', 'nothing'], a: 0, e: 'Height = amount.' },
      { q: 'Bars should have', o: ['equal width', 'different widths', 'colours only', 'no scale'], a: 0, e: 'Fair.' }, { q: 'Key 🍎 = 4; half apple', o: ['2', '4', '1', '8'], a: 0, e: 'Half of 4.' },
      { q: 'Most 36, least 8: difference', o: ['28', '44', '36', '8'], a: 0, e: 'Subtract.' }, { q: 'Data means', o: ['collected information', 'a graph only', 'a key', 'a tally only'], a: 0, e: 'Information.' },
      { q: 'Scale: each line = 4; bar at 6 lines', o: ['24', '6', '10', '64'], a: 0, e: '6 × 4.' }, { q: 'Tally 𝍸 𝍸 𝍸 |', o: ['16', '15', '31', '4'], a: 0, e: '15 + 1.' },
      { q: 'To find the total', o: ['add all values', 'pick the biggest', 'subtract', 'count bars'], a: 0, e: 'Sum.' }
    ],
    teach: {
      outcomes: ['Collect and tally data', 'Draw and read pictographs and bar graphs', 'Answer questions from data'],
      periods: [{ t: 'Collecting', flow: [['10 min', 'Class survey: favourite fruit.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Pictograph with a key.']] }, { t: 'Bar graphs', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Draw a bar graph on squared paper.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Key forgotten.', 'Reading between lines.'], activities: ['Traffic count at the gate.', 'Weather chart for a week.'],
      exit: ['Tally for 17.', 'Pictograph with key 🙂 = 5 for 35.', 'Read a bar.'], homework: 'Survey 10 family members or neighbours on their favourite festival. Make a tally, a table and a bar graph.'
    },
    slides: [{ t: 'Data Handling', b: ['Tally and table', 'Pictograph with key', 'Bar graph', 'Asking questions'] }, { t: 'Check yourself', b: ['Tally for 12?', 'Key ⭐ = 10, ⭐⭐⭐⭐?'] }],
    fs: { groups: [['Collect', [['Tally', 'bundle of 5: four lines crossed'], ['Table', 'item and number']]], ['Show', [['Pictograph', 'pictures × key'], ['Bar graph', 'height on a scale']]], ['Read', [['Most / least', 'tallest / shortest'], ['Difference', 'subtract'], ['Total', 'add']]]],
      ex: [['2 bundles and ||', '12'], ['Key 4, 3½ pictures', '14']], rem: ['Always give a key or scale.', 'Equal-width bars.', 'Check totals.'] }
  });
})();
