/*
TOOL:    class6_science_ch07
FAMILY:  CBSE_REVISION / Class 6 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 7 Temperature and its Measurement (hot and cold, thermometers, clinical and laboratory, Celsius and Fahrenheit, reading correctly, safety) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toFixed(1)).toString();
  G9.register({
    no: 7, part: 'All chapters', short: 'Temperature', title: 'Temperature and its Measurement',
    blurb: 'Why touch is unreliable for hotness, temperature as the measure of how hot or cold, clinical and laboratory thermometers, digital thermometers, reading correctly, Celsius and Fahrenheit scales, normal body temperature and safety.',
    revise: {
      oneLine: 'Temperature tells how hot or cold something is; our touch can be fooled, so we use thermometers. A clinical thermometer measures body temperature (about 35–42 °C; normal ≈ 37 °C); a laboratory thermometer measures other things (about −10 to 110 °C). °F = 9/5 × °C + 32, so 37 °C = 98.6 °F. Digital thermometers are safer than mercury ones.',
      sections: [
        { h: 'Touch can fool us', html: `<p>Put one hand in cold water and the other in hot, then both in lukewarm water — one feels warm, the other cool.</p>` },
        { h: 'Thermometers', html: `<p>Clinical: kink keeps the reading; shake down before use; read at eye level. Laboratory: no kink, keep the bulb in the liquid while reading, not touching the container.</p>` },
        { h: 'Scales', html: `<p>Water freezes at 0 °C (32 °F) and boils at 100 °C (212 °F) at sea level.</p>` }
      ],
      formulas: [['°F', '9/5 × °C + 32'], ['°C', '5/9 × (°F − 32)'], ['Normal body', '≈ 37 °C = 98.6 °F'], ['Freezing / boiling of water', '0 / 100 °C'], ['Clinical range', '35–42 °C']],
      terms: [['Temperature', 'degree of hotness'], ['Thermometer', 'instrument to measure temperature'], ['Kink', 'bend that stops mercury falling back']],
      traps: ['Do not use a clinical thermometer for hot water — it can break.', 'Mercury is poisonous; prefer digital.', 'Read with the eye level with the liquid top.'],
      bridge: '<p>Ch 8 uses temperature to explain changes of state of water.</p>'
    },
    explore: [
      { title: 'Two scales', intro: 'Slide the temperature; read both scales side by side.',
        build(el, K) { let c = 37; const row = K.row(el); K.slider(row, '°C', -10, 110, 0.5, c, v => { c = v; b.redraw(); }); const b = new K.Board(el, { xmin: -16, xmax: 116, ymin: -4, ymax: 4, axes: false, grid: 0, aspect: 0.3 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.rect(-12, -0.5, 125, 1, { fill: '#fff', color: C.ink, w: 2 }); b.circle(-13, 0, 1.6, { fill: C.orange, color: C.ink }); b.rect(-12, -0.3, c + 12, 0.6, { fill: C.orange, color: 'none' }); for (let t = -10; t <= 110; t += 10) { b.line(t, 0.5, t, 1.2, { color: C.ink, w: 1.5 }); b.text(t, 1.9, t + '°C', { font: '11px' }); const F = 9 / 5 * t + 32; b.line(t, -0.5, t, -1.2, { color: C.ink, w: 1 }); b.text(t, -1.9, f(F) + '°F', { font: '11px' }); }
            b.line(c, -2.6, c, 2.6, { color: C.blue, w: 2 });
            rd.innerHTML = `<b>${f(c)} °C = ${f(9 / 5 * c + 32)} °F</b> · ${c <= 0 ? 'water freezes at 0 °C' : c >= 100 ? 'water boils at 100 °C' : Math.abs(c - 37) < 0.6 ? 'normal body temperature' : c > 37.5 && c <= 42 ? 'fever range' : ''}`; };
          b.redraw(); return null; } },
      { title: 'Which thermometer?', intro: 'Sort the jobs.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Clinical (body)', 'Laboratory'], items: [['checking a child’s fever', 0], ['temperature of boiling water', 1, 'a clinical thermometer would break'], ['temperature of ice-water', 1, 'below the clinical range'], ['doctor’s check-up', 0], ['warm water for a plant experiment', 1], ['hourly fever chart in hospital', 0]] }); } }
    ],
    gens: [
      { title: '°C to °F', gen(R) { const c = R.pick([0, 10, 20, 25, 30, 35, 37, 40, 50, 100]); return { q: `${c} °C = ? °F`, a: `${f(9 / 5 * c + 32)} °F`, ans: 9 / 5 * c + 32, tol: 0.05 }; } },
      { title: '°F to °C', levels: [2, 3], gen(R) { const F = R.pick([32, 50, 68, 86, 98.6, 104, 212]); return { q: `${F} °F = ? °C`, a: `${f(5 / 9 * (F - 32))} °C`, ans: 5 / 9 * (F - 32), tol: 0.05 }; } },
      { title: 'Thermometer use', gen(R) { return G9.S9.pickQ(R, [['Range of a clinical thermometer?', 'about 35–42 °C'], ['Why is a clinical thermometer not used for boiling water?', 'its range is too small; it can break'], ['Why shake a clinical thermometer before use?', 'to bring mercury below 35 °C'], ['Why are digital thermometers preferred?', 'no poisonous mercury; easy to read']]); } },
      { title: 'Temperature change', gen(R) { const a = R.int(15, 30), b = R.int(32, 45); return { q: `Morning temperature ${a} °C, afternoon ${b} °C. Rise?`, a: `${b - a} °C`, ans: b - a }; } },
      { title: 'Fever', levels: [2, 3], gen(R) { const t = R.int(370, 404) / 10; return { q: `A thermometer reads ${t.toFixed(1)} °C. Normal or fever? How far from 37 °C?`, a: `${t > 37.5 ? 'fever' : 'normal'}; ${f(Math.abs(t - 37))} °C`, ans: Math.abs(t - 37), tol: 0.05 }; } }
    ],
    quiz: [
      { q: 'Normal body temperature', o: ['37 °C', '100 °C', '0 °C', '42 °C'], a: 0, e: '98.6 °F.' }, { q: '0 °C =', o: ['32 °F', '0 °F', '100 °F', '212 °F'], a: 0, e: 'Freezing.' },
      { q: '100 °C =', o: ['212 °F', '100 °F', '180 °F', '32 °F'], a: 0, e: 'Boiling.' }, { q: 'Clinical thermometer range', o: ['35–42 °C', '−10–110 °C', '0–100 °C', '50–60 °C'], a: 0, e: 'Body.' },
      { q: 'Kink in a clinical thermometer', o: ['keeps the reading', 'measures faster', 'adds mercury', 'breaks it'], a: 0, e: 'Hold.' }, { q: 'Lab thermometer bulb should', o: ['stay in the liquid while reading', 'be taken out', 'touch the beaker wall', 'be shaken'], a: 0, e: 'Correct.' },
      { q: 'Touch is', o: ['unreliable for temperature', 'exact', 'best', 'a thermometer'], a: 0, e: 'Fooled.' }, { q: '°F formula', o: ['9/5 × °C + 32', '5/9 × °C + 32', '°C + 32', '°C × 2'], a: 0, e: 'Conversion.' },
      { q: 'Mercury is', o: ['poisonous', 'safe to touch', 'water', 'a gas'], a: 0, e: 'Toxic.' }, { q: '40 °C body temperature', o: ['fever', 'normal', 'cold', 'freezing'], a: 0, e: 'High.' },
      { q: '50 °F =', o: ['10 °C', '50 °C', '18 °C', '32 °C'], a: 0, e: '5/9 × 18.' }
    ],
    teach: {
      outcomes: ['Explain why thermometers are needed', 'Use clinical and lab thermometers correctly', 'Convert °C and °F'],
      periods: [{ t: 'Hot and cold', flow: [['10 min', 'Three-bowl touch test.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Read a clinical thermometer.']] }, { t: 'Scales', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Weather data °C and °F.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Touch is accurate.', 'Any thermometer for anything.'], activities: ['Three-bowl test.', 'Daily temperature chart.'],
      exit: ['Convert 30 °C.', 'Clinical vs lab.', 'Two safety points.'], homework: 'Record the temperature from the news for 5 days in °C and convert to °F.'
    },
    slides: [{ t: 'Temperature and its Measurement', b: ['Touch can fool us', 'Clinical and lab thermometers', '°C and °F', 'Safety'] }, { t: 'Think and share', b: ['Normal body temperature in °F?', 'Why not use a clinical thermometer for tea?'] }],
    fs: { groups: [['Scales', [['°F', '9/5 °C + 32'], ['°C', '5/9 (°F − 32)'], ['Water', 'freezes 0 °C, boils 100 °C']]], ['Thermometers', [['Clinical', '35–42 °C, kink'], ['Laboratory', '−10 to 110 °C'], ['Digital', 'safe, no mercury']]], ['Body', [['Normal', '≈ 37 °C = 98.6 °F'], ['Fever', 'above ≈ 37.5 °C']]]],
      ex: [['25 °C', '77 °F'], ['104 °F', '40 °C']], rem: ['Read at eye level.', 'Right thermometer for the job.', 'Prefer digital.'] }
  });
})();
