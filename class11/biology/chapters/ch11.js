/*
TOOL:    class11_biology_ch11
FAMILY:  CBSE_REVISION / Class 11 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 11 Photosynthesis in Higher Plants (early experiments, site, pigments, light reaction, photosystems, cyclic and non-cyclic photophosphorylation, chemiosmosis, Calvin cycle, C4 pathway, photorespiration, limiting factors) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 11, part: 'Unit IV · Plant physiology', short: 'Photosynthesis', title: 'Photosynthesis in Higher Plants',
    blurb: 'Early experiments (Priestley, Ingenhousz, Sachs, Engelmann, van Niel); chloroplast as site; pigments and absorption/action spectra; light reaction — photosystems I and II, photolysis of water, Z-scheme, cyclic and non-cyclic photophosphorylation, chemiosmotic ATP synthesis; dark (biosynthetic) reactions — Calvin cycle (carboxylation, reduction, regeneration); C₄ (Hatch–Slack) pathway and Kranz anatomy; photorespiration; factors and Blackman’s law of limiting factors.',
    revise: {
      oneLine: 'Light reactions in thylakoids: PS II (P680) splits water (O₂ released, from H₂O per van Niel), electrons pass to PS I (P700) to make NADPH; proton gradient drives ATP synthase (chemiosmosis). Non-cyclic gives ATP + NADPH + O₂; cyclic (PS I only) gives ATP. Calvin cycle in stroma: RuBisCO fixes CO₂ to RuBP → 3-PGA; 1 glucose needs 6 turns, 18 ATP and 12 NADPH. C₄ plants (maize, sugarcane) first fix CO₂ by PEP carboxylase into OAA (4C) in mesophyll, release it in bundle-sheath cells (Kranz anatomy), avoiding photorespiration.',
      sections: [
        { h: 'Pigments', html: '<p>Chlorophyll a (main, reaction centre), chlorophyll b, xanthophylls, carotenoids (accessory, protect from photo-oxidation). Absorption maxima in blue and red.</p>' },
        { h: 'Photorespiration', html: '<p>RuBisCO also binds O₂ (oxygenase) when CO₂ is low — wastes energy, no ATP or sugar. C₄ plants concentrate CO₂ around RuBisCO, so they avoid it.</p>' },
        { h: 'Limiting factors', html: '<p>Blackman: rate is limited by the factor nearest its minimum — light, CO₂, temperature, water. CO₂ is the main limiting factor in nature; greenhouses enrich CO₂.</p>' }
      ],
      formulas: [['Overall', '6CO₂ + 12H₂O → C₆H₁₂O₆ + 6H₂O + 6O₂'], ['Per CO₂ fixed', '3 ATP + 2 NADPH'], ['Per glucose', '18 ATP + 12 NADPH'], ['PS I / PS II', 'P700 / P680'], ['C₄ first product', 'OAA (4C)'], ['C₃ first product', '3-PGA']],
      terms: [['Photophosphorylation', 'ATP synthesis using light energy'], ['Kranz anatomy', 'large bundle-sheath cells around veins in C₄ leaves'], ['RuBisCO', 'RuBP carboxylase–oxygenase']],
      traps: ['O₂ comes from water, not CO₂.', 'Dark reactions also occur in light (they need ATP/NADPH).', 'Cyclic photophosphorylation gives no NADPH or O₂.'],
      bridge: '<p>Ch 12 uses the sugars made here.</p>'
    },
    explore: [
      { title: 'Limiting factor explorer', intro: 'Change light, CO₂ and temperature; the scarcest factor limits the rate (simple model).',
        build(el, K) { let L = 50, CO = 40, T = 25; const row = K.row(el); K.slider(row, 'light (%)', 0, 100, 5, L, v => { L = v; draw(); }); K.slider(row, 'CO₂ (% of optimum)', 0, 100, 5, CO, v => { CO = v; draw(); }); K.slider(row, 'temperature (°C)', 0, 50, 1, T, v => { T = v; draw(); }); const rd = K.read(el);
          function draw() { const tf = T <= 35 ? Math.max(0, T / 35) * 100 : Math.max(0, 100 - (T - 35) * 8); const f = [['light', L], ['CO₂', CO], ['temperature', tf]]; const m = f.reduce((a, b) => b[1] < a[1] ? b : a); rd.innerHTML = `relative rate ≈ <b>${Math.round(m[1])}%</b> · limiting factor: <b>${m[0]}</b>${T > 40 ? ' (enzymes denaturing)' : ''} · raise ${m[0]} to increase the rate`; } draw(); return null; } },
      { title: 'Light reaction (Z-scheme)', intro: '<kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['PS II excited', 'Light excites P680; electrons pass to an acceptor.'], ['Water split', '2H₂O → 4H⁺ + O₂ + 4e⁻ replaces PS II electrons (O₂ released).'], ['Electron transport', 'Electrons pass via cytochromes to PS I; protons pumped into lumen.'], ['PS I excited', 'Light excites P700; electrons reduce NADP⁺ → NADPH.'], ['ATP synthase', 'Protons flow back to stroma through ATP synthase → ATP (chemiosmosis).'], ['Products', 'ATP and NADPH go to the Calvin cycle in the stroma.']] }); } }
    ],
    gens: [
      { title: 'Calvin count', gen(R) { const n = R.pick([1, 2, 3, 6]); return { q: `ATP and NADPH needed to fix ${n * 6} CO₂ (${n} glucose) in the Calvin cycle?`, a: `${18 * n} ATP, ${12 * n} NADPH`, ans: 18 * n }; } },
      { title: 'C₃ or C₄', gen(R) { return G9.S9.groupQ(R, [['wheat', 0], ['maize', 1], ['rice', 0], ['sugarcane', 1], ['sorghum', 1], ['pea', 0]], ['C₃', 'C₄'], 'Pathway in '); } },
      { title: 'Experiments', gen(R) { return G9.S9.pickQ(R, [['Who showed plants restore air (mint, mouse, candle)?', 'Joseph Priestley'], ['Who showed light is needed?', 'Jan Ingenhousz'], ['Who showed O₂ comes from water?', 'Cornelius van Niel'], ['Who used Cladophora and bacteria for action spectrum?', 'T. W. Engelmann'], ['Who showed starch formation in leaves?', 'Julius von Sachs']]); } },
      { title: 'Products', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Products of non-cyclic photophosphorylation?', 'ATP, NADPH, O₂'], ['Product of cyclic photophosphorylation?', 'ATP only'], ['First stable product in C₃?', '3-phosphoglyceric acid (3-PGA)'], ['First product in C₄?', 'oxaloacetic acid (OAA)'], ['CO₂ acceptor in C₄ mesophyll?', 'PEP (phosphoenolpyruvate)']]); } },
      { title: 'Concepts', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why is photorespiration wasteful?', 'uses energy, releases CO₂, makes no ATP or sugar'], ['Why do C₄ plants avoid photorespiration?', 'high CO₂ around RuBisCO in bundle sheath'], ['What is Kranz anatomy?', 'large bundle-sheath cells with chloroplasts around veins'], ['Main limiting factor in nature?', 'CO₂']]); } }
    ],
    quiz: [
      { q: 'O₂ comes from', o: ['water', 'CO₂', 'glucose', 'chlorophyll'], a: 0, e: 'Photolysis.' }, { q: 'PS I reaction centre', o: ['P700', 'P680', 'P750', 'P600'], a: 0, e: 'PS I.' },
      { q: 'Calvin cycle site', o: ['stroma', 'thylakoid', 'cytoplasm', 'mitochondria'], a: 0, e: 'Dark reaction.' }, { q: 'C₄ first product', o: ['OAA', '3-PGA', 'RuBP', 'glucose'], a: 0, e: '4 carbon.' },
      { q: 'Cyclic photophosphorylation makes', o: ['ATP only', 'NADPH', 'O₂', 'glucose'], a: 0, e: 'PS I.' }, { q: 'ATP per glucose (Calvin)', o: ['18', '12', '6', '36'], a: 0, e: '3 × 6.' },
      { q: 'Kranz anatomy in', o: ['maize', 'wheat', 'rice', 'pea'], a: 0, e: 'C₄.' }, { q: 'RuBisCO also acts as', o: ['oxygenase', 'hydrolase', 'ligase', 'kinase'], a: 0, e: 'Photorespiration.' },
      { q: 'Law of limiting factors', o: ['Blackman', 'Calvin', 'Hatch', 'Mendel'], a: 0, e: '1905.' }, { q: 'Main pigment', o: ['chlorophyll a', 'chlorophyll b', 'carotene', 'xanthophyll'], a: 0, e: 'Reaction centre.' },
      { q: 'ATP synthesis mechanism', o: ['chemiosmosis', 'substrate-level only', 'glycolysis', 'osmosis'], a: 0, e: 'Proton gradient.' }
    ],
    teach: {
      outcomes: ['Explain light reactions and ATP synthesis', 'Trace the Calvin cycle and C₄ pathway', 'Apply limiting factors'],
      periods: [{ t: 'Light reactions', flow: [['10 min', 'Pigment chromatography.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Cyclic vs non-cyclic table.']] }, { t: 'Dark reactions', flow: [['15 min', 'Calvin cycle diagram.'], ['15 min', 'Explore panel 1.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['O₂ from CO₂.', 'Dark reactions only at night.'], activities: ['Leaf pigment chromatography.', 'Hydrilla bubble count vs light.'],
      exit: ['Z-scheme order.', 'C₃ vs C₄.', 'Limiting factor.'], homework: 'Count oxygen bubbles from Hydrilla at three distances from a lamp; graph the rate.'
    },
    slides: [{ t: 'Photosynthesis in Higher Plants', b: ['Pigments and photosystems', 'Light reactions and chemiosmosis', 'Calvin cycle', 'C₄ pathway and photorespiration'] }, { t: 'Think and share', b: ['Where does O₂ come from?', 'Why is maize more efficient?'] }],
    fs: { groups: [['Light reactions', [['PS II', 'P680, splits water'], ['PS I', 'P700, NADPH'], ['ATP', 'chemiosmosis']]], ['Calvin', [['Enzyme', 'RuBisCO'], ['Product', '3-PGA'], ['Per glucose', '18 ATP, 12 NADPH']]], ['C₄ & limits', [['C₄', 'PEP → OAA, Kranz'], ['Photorespiration', 'RuBisCO + O₂'], ['Blackman', 'scarcest factor limits']]]],
      ex: [['12 CO₂', '36 ATP, 24 NADPH'], ['Maize', 'C₄']], rem: ['O₂ from water.', 'Cyclic = ATP only.', 'C₄ beats photorespiration.'] }
  });
})();
