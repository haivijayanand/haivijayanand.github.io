/*
TOOL:    class5_maths_ch15
FAMILY:  CBSE_REVISION / Class 5 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 15 Data Through Pictures (pictographs with keys, bar graphs with scales, reading, comparing and drawing conclusions) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 15, part: 'All chapters', short: 'Data', title: 'Data Through Pictures',
    blurb: 'Telling stories with data: pictographs with keys (including part pictures), bar graphs with scales, reading values, comparing, finding totals and drawing simple conclusions.',
    revise: {
      oneLine: 'A pictograph uses a key (🌳 = 10 trees); half a picture is half the key. A bar graph uses a scale (each line = 5). Read values, then compare: most, least, difference, total, and what the data tells us.',
      sections: [
        { h: 'Pictographs', html: `<p>Key 🌳 = 10: 🌳🌳🌳 and half = 35 trees.</p>` },
        { h: 'Bar graphs', html: `<p>Choose a scale so the biggest value fits; bars have equal width and gaps.</p>` },
        { h: 'Conclusions', html: `<p>"Most children come by bus" — a statement the graph supports.</p>` }
      ],
      formulas: [['Pictograph value', 'pictures × key'], ['Half picture', 'key ÷ 2'], ['Bar value', 'height × scale step'], ['Difference', 'bigger − smaller']],
      terms: [['Key', 'value of one picture'], ['Scale', 'value of one step'], ['Conclusion', 'what the data shows']],
      traps: ['Reading bars without the scale.', 'Counting pictures but forgetting the key.', 'Conclusions the data does not show.'],
      bridge: '<p>Class 6 adds mean and pie charts later.</p>'
    },
    explore: [
      { title: 'Choose a key', intro: 'Same data, different keys: see how many pictures are needed.',
        build(el, K) { const D = [['Mon', 40], ['Tue', 25], ['Wed', 50], ['Thu', 35], ['Fri', 60]]; let k = 10; const row = K.row(el); K.select(row, 'key: 🌳 =', ['5 trees', '10 trees', '20 trees'], i => { k = [5, 10, 20][i]; draw(); }); const s0 = row.querySelector('select'); if (s0) s0.value = 1; const rd = K.read(el);
          function draw() { rd.innerHTML = `<div style="font-weight:bold">Trees planted (key 🌳 = ${k})</div><table>${D.map(([d, v]) => `<tr><td style="padding:2px 10px">${d}</td><td style="font-size:20px">${'🌳'.repeat(Math.floor(v / k))}${v % k ? '<span style="display:inline-block;width:0.6em;overflow:hidden;vertical-align:bottom">🌳</span>' : ''}</td><td style="padding:2px 10px">${v}</td></tr>`).join('')}</table>total ${D.reduce((s, x) => s + x[1], 0)} · a bigger key means fewer pictures; part pictures show remainders`; } draw(); return null; } },
      { title: 'Bar graph with a scale', intro: 'Change the scale step; the bars stay the same height but the labels change.',
        build(el, K) { const D = [['bus', 45], ['walk', 30], ['cycle', 20], ['car', 15], ['auto', 10]]; let st = 5; const row = K.row(el); K.select(row, 'each line =', ['5', '10'], i => { st = [5, 10][i]; b.redraw(); }); const b = new K.Board(el, { xmin: -2.5, xmax: 11, ymin: -6, ymax: 52, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); for (let y = 0; y <= 50; y += st) { b.line(0, y, 10.5, y, { color: C.grid, w: 1 }); b.text(-0.8, y, String(y), { font: '11px' }); } D.forEach(([n, v], i) => { b.rect(0.6 + 2 * i, 0, 1.2, v, { fill: [C.blue, C.orange, C.purple, C.yellow, C.sky][i], color: C.ink, w: 1 }); b.text(1.2 + 2 * i, -3, n, { font: '12px' }); }); b.line(0, 0, 10.5, 0, { color: C.ink, w: 2 }); b.line(0, 0, 0, 51, { color: C.ink, w: 2 });
            rd.innerHTML = `How children come to school (each line = ${st}). Most: bus (45). Bus − walk = 15. Total ${D.reduce((s, x) => s + x[1], 0)}. Conclusion: more children come by bus than any other way, but 45 is less than half of 120.`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Read a pictograph', gen(R) { const k = R.pick([2, 5, 10, 20]), p = R.int(2, 8), h = R.chance(.5); return { q: `Key ⭐ = ${k}. A row shows ${p} stars${h ? ' and half a star' : ''}. Value?`, a: String(k * p + (h ? k / 2 : 0)), ans: k * p + (h ? k / 2 : 0) }; } },
      { title: 'Pictures needed', gen(R) { const k = R.pick([5, 10, 20]), v = k * R.int(2, 9); return { q: `Key 🍎 = ${k}. How many pictures show ${v}?`, a: String(v / k), ans: v / k }; } },
      { title: 'Read a bar', gen(R) { const s = R.pick([2, 5, 10, 20]), k = R.int(2, 9); return { q: `Each line on the scale is ${s}. A bar reaches the ${k}th line. Value?`, a: String(s * k), ans: s * k }; } },
      { title: 'Compare', levels: [2, 3], gen(R) { const v = [R.int(10, 60), R.int(10, 60), R.int(10, 60)]; const t = v.reduce((a, x) => a + x, 0); return { q: `Votes: tea ${v[0]}, coffee ${v[1]}, juice ${v[2]}. Total votes? Most popular?`, a: `${t}; ${['tea', 'coffee', 'juice'][v.indexOf(Math.max(...v))]}`, ans: t }; } },
      { title: 'Choose a scale', levels: [3], gen(R) { const m = R.int(30, 95); const s = m <= 50 ? 5 : 10; return { q: `The biggest value is ${m} and you have about 10 lines. A good scale step?`, a: String(s) }; } }
    ],
    quiz: [
      { q: 'Key 🌳 = 10; 3½ trees', o: ['35', '30', '13', '40'], a: 0, e: '30 + 5.' }, { q: 'Scale each line 5; bar at 9 lines', o: ['45', '14', '9', '50'], a: 0, e: '9 × 5.' },
      { q: 'Key tells', o: ['value of one picture', 'title', 'total', 'date'], a: 0, e: 'Key.' }, { q: 'Bus 45, walk 30: difference', o: ['15', '75', '35', '25'], a: 0, e: 'Subtract.' },
      { q: 'Bigger key means', o: ['fewer pictures', 'more pictures', 'same pictures', 'no key'], a: 0, e: 'Each worth more.' }, { q: 'Bars should have', o: ['equal width', 'different widths', 'no gaps ever', 'no scale'], a: 0, e: 'Fair.' },
      { q: 'Key ⭐ = 4; half a star', o: ['2', '4', '1', '8'], a: 0, e: 'Half.' }, { q: 'Values 45, 30, 20, 15, 10: total', o: ['120', '110', '100', '130'], a: 0, e: 'Add.' },
      { q: 'Biggest 90, about 10 lines: scale', o: ['10', '1', '50', '100'], a: 0, e: '90 ÷ 10 ≈ 9.' }, { q: 'A conclusion must be', o: ['supported by the data', 'a guess', 'about colours', 'the title'], a: 0, e: 'Evidence.' },
      { q: '🍎 = 5 for 40 apples', o: ['8 pictures', '5 pictures', '40 pictures', '4 pictures'], a: 0, e: '40 ÷ 5.' }
    ],
    teach: {
      outcomes: ['Read and draw pictographs and bar graphs', 'Choose keys and scales', 'Draw conclusions from data'],
      periods: [{ t: 'Pictographs', flow: [['10 min', 'Tree-planting data.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Choose a key.']] }, { t: 'Bar graphs', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Survey and draw.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Key or scale ignored.', 'Unsupported conclusions.'], activities: ['Class transport survey.', 'Newspaper graph reading.'],
      exit: ['Key 🌳 = 20, 4½ pictures.', 'Scale for max 70.', 'One conclusion from a graph.'], homework: 'Record rainfall or temperature from the news for a week and draw a bar graph with a scale.'
    },
    slides: [{ t: 'Data Through Pictures', b: ['Pictographs and keys', 'Bar graphs and scales', 'Comparing', 'Conclusions'] }, { t: 'Check yourself', b: ['Key 🌳 = 5, 6½ pictures?', 'Bar at 7 lines of 10?'] }],
    fs: { groups: [['Pictograph', [['Value', 'pictures × key'], ['Half picture', 'key ÷ 2']]], ['Bar graph', [['Value', 'lines × step'], ['Scale', 'biggest ÷ about 10']]], ['Reading', [['Most / least', 'tallest / shortest'], ['Total', 'add'], ['Conclusion', 'must match data']]]],
      ex: [['🌳 = 10, 3½', '35'], ['Step 5, 9 lines', '45']], rem: ['Read the key first.', 'Equal bars and gaps.', 'Say only what the data shows.'] }
  });
})();
