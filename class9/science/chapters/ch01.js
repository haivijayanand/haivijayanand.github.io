/*
TOOL:    class9_science_ch01
FAMILY:  CBSE_REVISION / Class 9 Science (Exploration)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 1 Exploration: Entering the World of Secondary Science (scientific method, SI units, prefixes, measurement uncertainty, models, science and society) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  const PRE = [['kilo (k)', 3], ['centi (c)', -2], ['milli (m)', -3], ['micro (µ)', -6], ['nano (n)', -9], ['mega (M)', 6]];
  G9.register({
    no: 1, part: 'All chapters', short: 'Secondary science', title: 'Exploration: Entering the World of Secondary Science',
    blurb: 'How secondary science works: questions, hypotheses, experiments with variables and controls, evidence and models; SI base units and prefixes; measuring with suitable precision and reporting uncertainty; and science, technology and society.',
    revise: {
      oneLine: 'Science builds explanations from evidence: question → hypothesis → controlled experiment → data → conclusion → model, always open to revision. Measurements use SI units (m, kg, s, K, A, mol, cd) with prefixes (k = 10³, m = 10⁻³, µ = 10⁻⁶, n = 10⁻⁹). Every measurement has an uncertainty set by the instrument’s least count; report values with sensible precision and repeat to reduce random error.',
      sections: [
        { h: 'SI base units', html: `<p>Length metre (m), mass kilogram (kg), time second (s), temperature kelvin (K), current ampere (A), amount of substance mole (mol), luminous intensity candela (cd).</p>` },
        { h: 'Precision', html: `<p>A metre scale reads to 1 mm (least count). Vernier callipers to 0.1 mm. Random errors scatter readings — average them; systematic errors (zero error) shift all readings — correct them.</p>` },
        { h: 'Models', html: `<p>Scientists use models (particle model, atom models, ray diagrams) — simplified pictures that explain and predict, improved when new evidence appears.</p>` }
      ],
      formulas: [['k', '10³'], ['c', '10⁻²'], ['m', '10⁻³'], ['µ', '10⁻⁶'], ['n', '10⁻⁹'], ['Mean', 'sum ÷ number of readings'], ['Kelvin', 'K = °C + 273']],
      terms: [['Least count', 'smallest reading an instrument can show'], ['Random error', 'unpredictable scatter in readings'], ['Systematic error', 'consistent shift, e.g., zero error']],
      traps: ['Mass (kg) is a base unit; weight (N) is derived.', 'More decimal places than the instrument allows is false precision.', 'Kelvin has no degree sign.'],
      bridge: '<p>Every later chapter uses units, measurement and investigation.</p>'
    },
    explore: [
      { title: 'Prefix converter', intro: 'Choose a value and a prefix; see it in base units and scientific notation.',
        build(el, K) { let v = 250, k = 2; const row = K.row(el); K.slider(row, 'value', 1, 999, 1, v, x => { v = x; draw(); }); const s = K.select(row, 'prefix', PRE.map(p => p[0]), i => { k = i; draw(); }); s.value = 2; const rd = K.read(el);
          function draw() { const e = PRE[k][1]; const base = v * 10 ** e; const ex = Math.floor(Math.log10(base)); rd.innerHTML = `${v} ${PRE[k][0].split(' ')[1].replace(/[()]/g, '')}m = <b>${f(base)} m</b> = <b>${(base / 10 ** ex).toFixed(2)} × 10<sup>${ex}</sup> m</b>`; } draw(); return null; } },
      { title: 'Readings and uncertainty', intro: 'Take repeated readings with an instrument; see mean and spread.',
        build(el, K) { let n = 5, lc = 1, seed = 3; const row = K.row(el); K.slider(row, 'readings', 2, 10, 1, n, x => { n = x; draw(); }); const s = K.select(row, 'instrument', ['metre scale (1 mm)', 'vernier callipers (0.1 mm)'], i => { lc = i; draw(); }); K.button(row, 'new set', () => { seed++; draw(); }); const rd = K.read(el);
          function draw() { let q = seed * 7919; const r = () => { q = (q * 9301 + 49297) % 233280; return q / 233280; }; const step = lc ? 0.1 : 1; const v = []; for (let i = 0; i < n; i++) v.push(+(Math.round((42.37 + (r() - 0.5) * 1.6) / step) * step).toFixed(lc)); const m = v.reduce((a, b) => a + b, 0) / n; const half = (Math.max(...v) - Math.min(...v)) / 2; rd.innerHTML = `readings (mm): ${v.join(', ')}<br>mean = <b>${m.toFixed(lc + 1)} mm</b> · uncertainty ≈ ± ${Math.max(half, step / 2).toFixed(lc + 1)} mm (half the range, at least half the least count)`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Prefix', gen(R) { const p = R.pick(PRE), v = R.int(2, 900); return { q: `Express ${v} ${p[0].split(" ")[0]}metres in metres (scientific notation).`, a: `${v} × 10^${p[1]} m = ${f(v * 10 ** p[1])} m`, ans: v * 10 ** p[1], tol: Math.abs(v * 10 ** p[1]) * 1e-9 }; } },
      { title: 'Kelvin', gen(R) { const c = R.int(-50, 120); return R.chance(.5) ? { q: `${c} °C in kelvin?`, a: `${c + 273} K`, ans: c + 273 } : { q: `${c + 273} K in °C?`, a: `${c} °C`, ans: c }; } },
      { title: 'Mean', gen(R) { const v = [R.int(400, 450), R.int(400, 450), R.int(400, 450), R.int(400, 450), R.int(400, 450)].map(x => x / 10); const m = v.reduce((a, b) => a + b, 0) / 5; return { q: `Readings (cm): ${v.join(', ')}. Mean?`, a: `${+m.toFixed(2)} cm`, ans: m, tol: 0.005 }; } },
      { title: 'Units', gen(R) { return G9.S9.pickQ(R, [['SI unit of amount of substance?', 'mole (mol)'], ['SI unit of temperature?', 'kelvin (K)'], ['SI unit of electric current?', 'ampere (A)'], ['Is the newton a base unit?', 'no — derived (kg m s⁻²)']]); } },
      { title: 'Errors', levels: [2, 3], gen(R) { const z = R.pick([0.2, 0.3, -0.1, -0.2]), r = R.int(20, 60) / 10; return { q: `Vernier callipers show a zero error of ${z > 0 ? '+' : ''}${z} mm. Reading ${r} mm. Correct reading?`, a: `${+(r - z).toFixed(2)} mm`, ans: r - z, tol: 0.001 }; } }
    ],
    quiz: [
      { q: 'SI unit of mass', o: ['kilogram', 'gram', 'newton', 'pound'], a: 0, e: 'kg.' }, { q: 'micro =', o: ['10⁻⁶', '10⁻³', '10⁶', '10⁻⁹'], a: 0, e: 'µ.' },
      { q: '0 °C =', o: ['273 K', '0 K', '100 K', '−273 K'], a: 0, e: '+273.' }, { q: 'Least count of metre scale', o: ['1 mm', '1 cm', '0.1 mm', '1 m'], a: 0, e: 'mm.' },
      { q: 'Zero error is', o: ['systematic', 'random', 'no error', 'human only'], a: 0, e: 'Shift.' }, { q: 'Averaging reduces', o: ['random error', 'systematic error', 'units', 'mass'], a: 0, e: 'Scatter.' },
      { q: '5 km =', o: ['5 × 10³ m', '5 × 10⁻³ m', '500 m', '50 m'], a: 0, e: 'kilo.' }, { q: 'Model in science', o: ['simplified explanation', 'final truth', 'toy only', 'opinion'], a: 0, e: 'Useful.' },
      { q: 'Base unit', o: ['ampere', 'newton', 'joule', 'pascal'], a: 0, e: 'Current.' }, { q: '1 nm =', o: ['10⁻⁹ m', '10⁻⁶ m', '10⁻³ m', '10⁹ m'], a: 0, e: 'nano.' },
      { q: 'Hypothesis must be', o: ['testable', 'proven', 'long', 'secret'], a: 0, e: 'Test.' }
    ],
    teach: {
      outcomes: ['Use SI units and prefixes', 'Estimate uncertainty', 'Describe how science builds models'],
      periods: [{ t: 'Units', flow: [['10 min', 'Unit hunt in labels.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Conversion relay.']] }, { t: 'Measurement', flow: [['15 min', 'Explore panel 2 / real callipers.'], ['15 min', 'Repeat measurements of a coin.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['More decimals = more accurate.', 'Weight is a base quantity.'], activities: ['Coin diameter with scale vs callipers.', 'Model building discussion.'],
      exit: ['Seven base units.', 'Convert 3 µm.', 'Random vs systematic.'], homework: 'Measure your pencil 5 times; report mean ± uncertainty.'
    },
    slides: [{ t: 'Entering Secondary Science', b: ['Investigation cycle', 'SI units and prefixes', 'Measurement and uncertainty', 'Models'] }, { t: 'Think and share', b: ['Why average readings?', 'What is a zero error?'] }],
    fs: { groups: [['SI base', [['m, kg, s', 'length, mass, time'], ['K, A', 'temperature, current'], ['mol, cd', 'amount, luminous intensity']]], ['Prefixes', [['k', '10³'], ['m', '10⁻³'], ['µ', '10⁻⁶'], ['n', '10⁻⁹']]], ['Measuring', [['Least count', 'smallest division'], ['Random', 'average'], ['Systematic', 'correct']]]],
      ex: [['250 mm', '0.25 m'], ['37 °C', '310 K']], rem: ['Always write units.', 'Match precision to instrument.', 'Repeat readings.'] }
  });
})();
