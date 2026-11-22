/*
TOOL:    class10_science_ch05
FAMILY:  CBSE_REVISION / Class 10 Science (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 5 Life Processes (nutrition autotrophic and heterotrophic, human digestion, respiration aerobic and anaerobic, transport heart blood xylem phloem, excretion kidney nephron) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const DIG = [['mouth', 'salivary amylase: starch → maltose'], ['stomach', 'HCl (acidic medium, kills germs), pepsin: proteins → peptides, mucus protects lining'], ['small intestine', 'bile (liver) emulsifies fats; pancreatic juice: trypsin (proteins), lipase (fats), amylase; intestinal juice completes digestion; villi absorb'], ['large intestine', 'absorbs water; egestion through the anus']];
  G9.register({
    no: 5, part: 'All chapters', short: 'Life processes', title: 'Life Processes',
    blurb: 'Nutrition — photosynthesis (6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂), stomata, and heterotrophic nutrition; human digestive system and enzymes; respiration — aerobic, anaerobic (yeast, muscles), breathing in humans; transport — heart, double circulation, blood, lymph, xylem and phloem, transpiration; excretion — kidneys, nephron, dialysis; excretion in plants.',
    revise: {
      oneLine: 'Plants make glucose by photosynthesis using light, chlorophyll, CO₂ and water. In humans, digestion begins in the mouth (amylase), continues in the stomach (pepsin, HCl) and finishes in the small intestine (bile, pancreatic and intestinal juices; villi absorb). Respiration breaks glucose: aerobic → CO₂ + H₂O + much energy (mitochondria); anaerobic → ethanol + CO₂ (yeast) or lactic acid (muscles). The four-chambered heart gives double circulation; the nephron filters blood to make urine.',
      sections: [
        { h: 'Respiration pathways', html: `<p>Glucose → pyruvate (cytoplasm). With O₂ → CO₂ + H₂O + energy (mitochondria). Without O₂ → ethanol + CO₂ (yeast) or lactic acid (muscle cramps). Energy stored as ATP.</p>` },
        { h: 'Circulation', html: `<p>Right side pumps deoxygenated blood to lungs; left side pumps oxygenated blood to body. Arteries thick-walled, veins have valves, capillaries exchange materials. Platelets clot blood.</p>` },
        { h: 'Excretion', html: `<p>Nephron: glomerulus filters → tubule reabsorbs glucose, amino acids, salts, water → urine to bladder. Dialysis is an artificial kidney.</p>` }
      ],
      formulas: [['Photosynthesis', '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂'], ['Aerobic', 'glucose + O₂ → CO₂ + H₂O + energy'], ['Yeast', 'glucose → ethanol + CO₂'], ['Muscle (no O₂)', 'glucose → lactic acid'], ['Kidney unit', 'nephron']],
      terms: [['Villi', 'finger-like projections that absorb food'], ['Double circulation', 'blood passes the heart twice per cycle'], ['Translocation', 'transport of food in phloem']],
      traps: ['Bile has no enzyme; it emulsifies fats.', 'Pulmonary vein carries oxygenated blood.', 'Plants respire day and night.'],
      bridge: '<p>Class 11 Biology covers each process in detail.</p>'
    },
    explore: [
      { title: 'Digestion journey', intro: 'Step through the digestive system. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'part', DIG.map(d => d[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { rd.innerHTML = `<b>${DIG[k][0]}</b>: ${DIG[k][1]}`; } const step = () => { k = (k + 1) % DIG.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Double circulation', intro: '<kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Right atrium', 'Deoxygenated blood from the body arrives through vena cava.'], ['Right ventricle', 'Pumps it through the pulmonary artery to the lungs.'], ['Lungs', 'Blood gives up CO₂ and takes O₂.'], ['Left atrium', 'Oxygenated blood returns through pulmonary veins.'], ['Left ventricle', 'Thick muscular wall pumps it through the aorta to the whole body.'], ['Why double?', 'Separating oxygenated and deoxygenated blood gives an efficient O₂ supply for warm-blooded animals.']] }); } }
    ],
    gens: [
      { title: 'Enzyme', gen(R) { const E = [['salivary amylase', 'starch → sugar (maltose)', 'mouth'], ['pepsin', 'proteins → peptides', 'stomach'], ['trypsin', 'proteins → peptides', 'pancreatic juice'], ['lipase', 'fats → fatty acids + glycerol', 'pancreatic juice'], ['bile (not an enzyme)', 'emulsifies fats', 'liver']]; const e = R.pick(E); return { q: `Action and source of ${e[0]}?`, a: `${e[1]}; from ${e[2]}` }; } },
      { title: 'Respiration type', gen(R) { return G9.S9.groupQ(R, [['yeast making bread rise', 1], ['human cells at rest', 0], ['muscle cramps after sprint', 2], ['plant root cells in aerated soil', 0]], ['aerobic', 'anaerobic — ethanol + CO₂', 'anaerobic — lactic acid'], 'Type: '); } },
      { title: 'Heart rate', gen(R) { const b = R.int(17, 25), s = 15; return { q: `${b} pulse beats are counted in ${s} s. Heart rate per minute?`, a: String(b * 4), ans: b * 4 }; } },
      { title: 'Filtration', levels: [2, 3], gen(R) { const f = R.pick([170, 180, 190]), u = R.pick([1.5, 1.8, 2]); return { q: `Kidneys filter about ${f} L of fluid a day but only ${u} L becomes urine. Percentage reabsorbed?`, a: `${(+(100 * (f - u) / f).toFixed(2))}%`, ans: 100 * (f - u) / f, tol: 0.01 }; } },
      { title: 'Transport in plants', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['What pulls water up tall trees?', 'transpiration pull'], ['Transport of food is called?', 'translocation (phloem)'], ['Role of stomata?', 'gas exchange and transpiration'], ['How do plants get rid of wastes?', 'store in leaves/bark that fall, resins, gums, vacuoles']]); } }
    ],
    quiz: [
      { q: 'Photosynthesis product', o: ['glucose and O₂', 'CO₂', 'only water', 'protein'], a: 0, e: 'Equation.' }, { q: 'Bile from', o: ['liver', 'pancreas', 'stomach', 'kidney'], a: 0, e: 'Liver.' },
      { q: 'Yeast anaerobic product', o: ['ethanol + CO₂', 'lactic acid', 'O₂', 'water only'], a: 0, e: 'Fermentation.' }, { q: 'Oxygenated blood to body from', o: ['left ventricle', 'right ventricle', 'right atrium', 'lungs'], a: 0, e: 'Aorta.' },
      { q: 'Kidney functional unit', o: ['nephron', 'neuron', 'alveolus', 'villus'], a: 0, e: 'Nephron.' }, { q: 'Absorption mainly in', o: ['small intestine', 'stomach', 'mouth', 'large intestine'], a: 0, e: 'Villi.' },
      { q: 'Pulmonary vein carries', o: ['oxygenated blood', 'deoxygenated blood', 'lymph', 'urine'], a: 0, e: 'Exception.' }, { q: 'Muscle cramp due to', o: ['lactic acid', 'ethanol', 'oxygen', 'glucose'], a: 0, e: 'Anaerobic.' },
      { q: 'Valves present in', o: ['veins', 'capillaries only', 'arteries only', 'none'], a: 0, e: 'Backflow.' }, { q: 'Pepsin acts on', o: ['proteins', 'starch', 'fats', 'water'], a: 0, e: 'Stomach.' },
      { q: 'Water transport in plants', o: ['xylem', 'phloem', 'stomata', 'cambium'], a: 0, e: 'Xylem.' }
    ],
    teach: {
      outcomes: ['Explain nutrition and digestion', 'Compare respiration types', 'Describe circulation and excretion'],
      periods: [{ t: 'Nutrition and respiration', flow: [['10 min', 'Starch test on leaf.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Yeast fermentation set-up.']] }, { t: 'Transport and excretion', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Nephron diagram.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Bile is an enzyme.', 'Arteries always carry oxygenated blood.'], activities: ['Pulse before/after exercise.', 'Lime water test of breath.'],
      exit: ['Photosynthesis equation.', 'Three enzymes.', 'Path through heart.'], homework: 'Draw and label the human heart showing double circulation.'
    },
    slides: [{ t: 'Life Processes', b: ['Nutrition', 'Respiration', 'Transport', 'Excretion'] }, { t: 'Think and share', b: ['Why double circulation?', 'Why do muscles cramp?'] }],
    fs: { groups: [['Nutrition', [['Photosynthesis', '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂'], ['Mouth', 'amylase'], ['Stomach', 'pepsin, HCl'], ['Intestine', 'bile, trypsin, lipase; villi']]], ['Respiration', [['Aerobic', 'CO₂ + H₂O + energy'], ['Yeast', 'ethanol + CO₂'], ['Muscle', 'lactic acid']]], ['Transport & excretion', [['Heart', '4 chambers, double circulation'], ['Nephron', 'filter + reabsorb'], ['Plants', 'xylem, phloem']]]],
      ex: [['20 beats in 15 s', '80/min'], ['180 L → 1.8 L', '99% reabsorbed']], rem: ['Bile emulsifies.', 'Left side oxygenated.', 'Respiration ≠ breathing.'] }
  });
})();
