/*
TOOL:    class9_science_ch05
FAMILY:  CBSE_REVISION / Class 9 Science (Exploration)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 5 Exploring Mixtures and their Separation (pure substances, solutions, suspensions, colloids, Tyndall effect, concentration, evaporation, centrifugation, chromatography, distillation, crystallisation) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toFixed(2)).toString();
  const SEP = [['evaporation', 'dissolved solid from liquid', 'salt from sea water'], ['filtration', 'insoluble solid from liquid', 'sand from water'], ['centrifugation', 'fine suspended particles by spinning', 'cream from milk, blood tests'], ['separating funnel', 'immiscible liquids', 'oil from water'], ['sublimation', 'a sublimable solid from a mixture', 'camphor or ammonium chloride from salt'], ['chromatography', 'dissolved components that travel at different speeds', 'dyes in ink'], ['simple distillation', 'liquid from dissolved solid / liquids with large boiling-point difference', 'pure water from salt water'], ['fractional distillation', 'liquids with close boiling points', 'gases from air, petroleum fractions'], ['crystallisation', 'pure solid crystals from solution', 'copper sulphate, sugar']];
  G9.register({
    no: 5, part: 'All chapters', short: 'Mixtures', title: 'Exploring Mixtures and their Separation',
    blurb: 'Pure substances and mixtures; true solutions, suspensions and colloids (Tyndall effect); concentration of solutions (mass by mass, mass by volume); and separation methods — evaporation, centrifugation, separating funnel, sublimation, chromatography, distillation, fractional distillation and crystallisation.',
    revise: {
      oneLine: 'Mixtures can be homogeneous (solutions) or heterogeneous. Solutions have particles < 1 nm, are clear and stable; colloids (1–1000 nm) look uniform but scatter light (Tyndall effect) — milk, fog, smoke; suspensions have large particles that settle — muddy water. Concentration = mass of solute ÷ mass (or volume) of solution × 100. Separation methods exploit differences in solubility, boiling point, density, particle size or volatility.',
      sections: [
        { h: 'Colloids', html: `<p>Dispersed phase + dispersion medium: fog (liquid in gas), smoke (solid in gas), milk (liquid in liquid — emulsion), jelly (liquid in solid). Torch beam is visible through them.</p>` },
        { h: 'Distillation', html: `<p>Simple distillation for boiling points differing by > 25 °C; fractional distillation uses a column for closer boiling points (air: N₂ −196 °C, O₂ −183 °C, Ar −186 °C).</p>` },
        { h: 'Chromatography', html: `<p>Components of ink travel up the paper at different speeds with the solvent; used for dyes, pigments, drugs in blood.</p>` }
      ],
      formulas: [['Mass %', 'solute ÷ solution × 100'], ['Mass/volume %', 'g solute per 100 mL solution'], ['Solution particles', '< 1 nm'], ['Colloid', '1–1000 nm, Tyndall'], ['Suspension', '> 1000 nm, settles']],
      terms: [['Tyndall effect', 'scattering of light by colloid particles'], ['Immiscible', 'liquids that do not mix'], ['Sublimation', 'solid → vapour directly']],
      traps: ['Colloids look homogeneous but are heterogeneous.', 'Filtration cannot separate a colloid.', 'Mass % uses mass of solution, not solvent.'],
      bridge: '<p>Ch 9 explains the particles (atoms, molecules) inside pure substances.</p>'
    },
    explore: [
      { title: 'Choose a separation method', intro: 'Pick a method; see what it separates and an example. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'method', SEP.map(s => s[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { const s = SEP[k]; rd.innerHTML = `<b>${s[0]}</b> separates ${s[1]} · e.g., <b>${s[2]}</b>`; } const step = () => { k = (k + 1) % SEP.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Solution, colloid or suspension?', intro: 'Sort by how they behave.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['True solution', 'Colloid', 'Suspension'], items: [['salt water', 0], ['milk', 1, 'shows Tyndall effect'], ['muddy water', 2, 'particles settle'], ['sugar solution', 0], ['fog', 1], ['chalk in water', 2], ['shaving cream', 1], ['copper sulphate solution', 0]] }); } }
    ],
    gens: [
      { title: 'Mass %', gen(R) { const s = R.int(5, 50), w = R.int(50, 250); return { q: `${s} g of solute in ${w} g of water. Mass % concentration?`, a: `${f(s / (s + w) * 100)}%`, ans: s / (s + w) * 100, tol: 0.01 }; } },
      { title: 'Mass by volume', levels: [2, 3], gen(R) { const s = R.int(2, 30), v = R.pick([100, 200, 250, 500]); return { q: `${s} g of glucose in ${v} mL of solution. Mass by volume %?`, a: `${f(s / v * 100)}%`, ans: s / v * 100, tol: 0.01 }; } },
      { title: 'Method', gen(R) { const s = R.pick(SEP); return { q: `Best method: ${s[2]}?`, a: s[0] }; } },
      { title: 'Type', gen(R) { return G9.S9.groupQ(R, [['salt solution', 0], ['milk', 1], ['sand in water', 2], ['smoke', 1], ['vinegar', 0], ['chalk powder in water', 2]], ['true solution', 'colloid', 'suspension'], 'Type of mixture: '); } },
      { title: 'Solute needed', levels: [2, 3], gen(R) { const p = R.pick([2, 5, 10, 15]), m = R.pick([200, 300, 400, 500]); return { q: `Mass of salt to make ${m} g of ${p}% (m/m) solution?`, a: `${p * m / 100} g`, ans: p * m / 100 }; } }
    ],
    quiz: [
      { q: 'Tyndall effect shown by', o: ['milk', 'salt solution', 'sugar solution', 'pure water'], a: 0, e: 'Colloid.' }, { q: 'Cream from milk', o: ['centrifugation', 'filtration', 'distillation', 'sublimation'], a: 0, e: 'Spin.' },
      { q: 'Dyes in ink', o: ['chromatography', 'filtration', 'evaporation', 'magnet'], a: 0, e: 'Paper.' }, { q: 'Oil from water', o: ['separating funnel', 'filter paper', 'sieve', 'magnet'], a: 0, e: 'Immiscible.' },
      { q: 'Gases from air', o: ['fractional distillation', 'filtration', 'chromatography', 'sublimation'], a: 0, e: 'Boiling points.' }, { q: 'Particles settle in', o: ['suspension', 'solution', 'colloid', 'alloy'], a: 0, e: 'Large.' },
      { q: '10 g in 90 g water', o: ['10%', '11.1%', '9%', '90%'], a: 0, e: '10/100.' }, { q: 'Camphor from salt', o: ['sublimation', 'filtration', 'centrifugation', 'chromatography'], a: 0, e: 'Sublimes.' },
      { q: 'Solution particle size', o: ['< 1 nm', '1–1000 nm', '> 1000 nm', '1 mm'], a: 0, e: 'Tiny.' }, { q: 'Fog is a', o: ['colloid', 'solution', 'suspension', 'compound'], a: 0, e: 'Liquid in gas.' },
      { q: 'Pure solid crystals', o: ['crystallisation', 'evaporation to dryness', 'filtration', 'decantation'], a: 0, e: 'Purer.' }
    ],
    teach: {
      outcomes: ['Classify solutions, colloids, suspensions', 'Calculate concentration', 'Choose separation methods'],
      periods: [{ t: 'Mixtures', flow: [['10 min', 'Torch beam through samples.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Concentration problems.']] }, { t: 'Separation', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Paper chromatography of ink.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Colloids are solutions.', 'Filtration separates everything.'], activities: ['Tyndall torch test.', 'Ink chromatography.'],
      exit: ['Three mixture types.', 'Concentration calculation.', 'Method for oil + water.'], homework: 'Do chromatography of a black sketch pen with water and a strip of filter paper.'
    },
    slides: [{ t: 'Mixtures and Separation', b: ['Solutions, colloids, suspensions', 'Concentration', 'Separation methods', 'Distillation and chromatography'] }, { t: 'Think and share', b: ['Why is milk a colloid?', 'How are gases separated from air?'] }],
    fs: { groups: [['Types', [['Solution', '< 1 nm, clear'], ['Colloid', 'Tyndall'], ['Suspension', 'settles']]], ['Concentration', [['m/m %', 'solute ÷ solution × 100'], ['m/v %', 'g per 100 mL']]], ['Methods', [['Centrifuge', 'cream'], ['Funnel', 'oil–water'], ['Chromatography', 'dyes'], ['Fractional distillation', 'air, petroleum']]]],
      ex: [['20 g + 80 g water', '20%'], ['5% of 400 g', '20 g']], rem: ['Use solution mass.', 'Match method to property.', 'Colloids scatter light.'] }
  });
})();
