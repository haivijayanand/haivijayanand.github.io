/*
TOOL:    class5_maths_ch05
FAMILY:  CBSE_REVISION / Class 5 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 5 Far and Near (km, m, cm, mm; converting lengths; distances and estimating) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 5, part: 'All chapters', short: 'Length and distance', title: 'Far and Near',
    blurb: 'Measuring things near and far: millimetres to kilometres, converting units, comparing and adding distances, estimating with body measures and maps.',
    revise: {
      oneLine: '1 km = 1000 m, 1 m = 100 cm, 1 cm = 10 mm. To change a big unit to a small one multiply; small to big divide. 2 km 450 m = 2450 m; 375 cm = 3 m 75 cm.',
      sections: [
        { h: 'Conversions', html: `<p>m → cm: × 100. km → m: × 1000. cm → m: ÷ 100. 3.5 km = 3 km 500 m.</p>` },
        { h: 'Adding distances', html: `<p>1 km 750 m + 2 km 600 m = 3 km 1350 m = 4 km 350 m.</p>` },
        { h: 'Estimating', html: `<p>A pace ≈ 60–70 cm; 1 km ≈ 1500 paces; a 10-minute walk ≈ 1 km.</p>` }
      ],
      formulas: [['1 km', '1000 m'], ['1 m', '100 cm = 1000 mm'], ['1 cm', '10 mm'], ['Big → small', '×'], ['Small → big', '÷']],
      terms: [['Distance', 'how far apart'], ['Estimate', 'sensible guess'], ['Half a km', '500 m']],
      traps: ['2 km 45 m = 2045 m, not 245 m.', 'Adding m and cm without converting.', 'Choosing a sensible unit.'],
      bridge: '<p>Ch 11 uses lengths for perimeter and area.</p>'
    },
    explore: [
      { title: 'Unit ladder', intro: 'Choose a length; see it in every unit.',
        build(el, K) { let mm = 2450000; const row = K.row(el); K.slider(row, 'length (m)', 1, 9999, 1, 2450, v => { mm = v * 1000; draw(); }); const rd = K.read(el);
          function draw() { const m = mm / 1000; rd.innerHTML = `<table style="font-size:18px;border-collapse:collapse">${[['km', `${Math.floor(m / 1000)} km ${m % 1000} m`], ['m', `${m.toLocaleString('en-IN')} m`], ['cm', `${(m * 100).toLocaleString('en-IN')} cm`], ['mm', `${mm.toLocaleString('en-IN')} mm`]].map(r => `<tr><td style="padding:3px 12px;color:var(--orange,#ea580c)"><b>${r[0]}</b></td><td style="padding:3px 12px">${r[1]}</td></tr>`).join('')}</table>bigger unit ↑ divide · smaller unit ↓ multiply`; } draw(); return null; } },
      { title: 'Near or far?', intro: 'Drag the slider to change the scale: from an ant to a city.',
        build(el, K) { const S = [['ant', '5 mm'], ['eraser', '4 cm'], ['notebook', '28 cm'], ['door', '2 m'], ['school bus', '10 m'], ['cricket pitch', '20 m'], ['playground', '100 m'], ['walk to school', '1 km'], ['next town', '25 km'], ['Delhi to Mumbai', '1400 km']]; let k = 3; const row = K.row(el); K.slider(row, 'zoom', 0, 9, 1, k, v => { k = v; draw(); }); const rd = K.read(el);
          function draw() { rd.innerHTML = `<div style="font-size:22px">${S.map((s, i) => `<span style="opacity:${i === k ? 1 : 0.35};margin:0 6px">${i === k ? '<b>' + s[0] + '</b>' : s[0]}</span>`).join('›')}</div>${S[k][0]}: about <b>${S[k][1]}</b> · unit to use: ${['mm', 'cm', 'cm', 'm', 'm', 'm', 'm', 'km', 'km', 'km'][k]}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'km to m', gen(R) { const k = R.int(1, 9), m = R.int(5, 995); return R.chance(.5) ? { q: `${k} km ${m} m = ? m`, a: `${k * 1000 + m} m`, ans: k * 1000 + m } : { q: `${k * 1000 + m} m = ? km ? m`, a: `${k} km ${m} m` }; } },
      { title: 'm to cm', gen(R) { const m = R.int(1, 20), c = R.int(1, 99); return R.chance(.5) ? { q: `${m} m ${c} cm = ? cm`, a: `${m * 100 + c} cm`, ans: m * 100 + c } : { q: `${m * 100 + c} cm = ? m ? cm`, a: `${m} m ${c} cm` }; } },
      { title: 'Add distances', levels: [2, 3], gen(R) { const a = R.int(1, 5) * 1000 + R.int(100, 900), b = R.int(1, 4) * 1000 + R.int(100, 900); const t = a + b; return { q: `${Math.floor(a / 1000)} km ${a % 1000} m + ${Math.floor(b / 1000)} km ${b % 1000} m = ?`, a: `${Math.floor(t / 1000)} km ${t % 1000} m`, ans: t / 1000, tol: 0.001 }; } },
      { title: 'How much farther', gen(R) { const a = R.int(2000, 9000), b = R.int(500, a - 200); return { q: `Ravi walks ${a} m and Mina ${b} m. How much farther does Ravi walk?`, a: `${a - b} m`, ans: a - b }; } },
      { title: 'Choose the unit', levels: [1, 2], gen(R) { const t = R.pick([['the thickness of a coin', 'mm'], ['the height of a tree', 'm'], ['the length of a river', 'km'], ['the width of a book', 'cm'], ['a marathon', 'km']]); return { q: `Which unit for ${t[0]}?`, a: t[1] }; } }
    ],
    quiz: [
      { q: '1 km =', o: ['1000 m', '100 m', '10 000 m', '10 m'], a: 0, e: 'Thousand.' }, { q: '2 km 45 m =', o: ['2045 m', '245 m', '2450 m', '20 045 m'], a: 0, e: 'Zero holds hundreds.' },
      { q: '375 cm =', o: ['3 m 75 cm', '37 m 5 cm', '3 m 7 cm', '375 m'], a: 0, e: '÷ 100.' }, { q: '1 m =', o: ['1000 mm', '100 mm', '10 mm', '1 mm'], a: 0, e: '100 × 10.' },
      { q: 'Half a km', o: ['500 m', '50 m', '5000 m', '250 m'], a: 0, e: '1000 ÷ 2.' }, { q: '1 km 750 m + 2 km 600 m', o: ['4 km 350 m', '3 km 350 m', '3 km 1350 m only', '4 km 1350 m'], a: 0, e: 'Regroup.' },
      { q: 'Unit for a river length', o: ['km', 'cm', 'mm', 'm only'], a: 0, e: 'Long.' }, { q: '6 cm =', o: ['60 mm', '6 mm', '600 mm', '0.6 mm'], a: 0, e: '× 10.' },
      { q: 'A 10-minute walk is about', o: ['1 km', '10 km', '100 m', '10 m'], a: 0, e: 'Estimate.' }, { q: '4500 m =', o: ['4 km 500 m', '45 km', '4 km 50 m', '450 km'], a: 0, e: '÷ 1000.' },
      { q: 'Big unit to small unit:', o: ['multiply', 'divide', 'add', 'subtract'], a: 0, e: 'More small units.' }
    ],
    teach: {
      outcomes: ['Convert km, m, cm, mm', 'Add and compare distances', 'Estimate lengths'],
      periods: [{ t: 'Units', flow: [['10 min', 'Measure with paces and tape.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Conversions.']] }, { t: 'Distances', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Map distances.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Missing zeros.', 'Mixed units added.'], activities: ['100 m pace count.', 'Distance chart between cities.'],
      exit: ['3 km 8 m in m.', '1250 cm in m and cm.', 'Unit for an ant.'], homework: 'Count your paces from home to a shop; estimate the distance in metres.'
    },
    slides: [{ t: 'Far and Near', b: ['mm, cm, m, km', 'Converting', 'Adding distances', 'Estimating'] }, { t: 'Check yourself', b: ['5 km 60 m in m?', '908 cm in m, cm?'] }],
    fs: { groups: [['Units', [['1 km', '1000 m'], ['1 m', '100 cm'], ['1 cm', '10 mm']]], ['Converting', [['Big → small', '×'], ['Small → big', '÷'], ['2 km 45 m', '2045 m']]], ['Estimate', [['Pace', '≈ 65 cm'], ['10-minute walk', '≈ 1 km']]]],
      ex: [['1 km 750 m + 2 km 600 m', '4 km 350 m'], ['375 cm', '3 m 75 cm']], rem: ['Zeros hold places.', 'Same units before adding.', 'Pick a sensible unit.'] }
  });
})();
