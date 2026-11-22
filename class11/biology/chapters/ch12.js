/*
TOOL:    class11_biology_ch12
FAMILY:  CBSE_REVISION / Class 11 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 12 Respiration in Plants (glycolysis, fermentation, aerobic respiration, Krebs cycle, electron transport system, oxidative phosphorylation, respiratory balance sheet, amphibolic pathway, respiratory quotient) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(3)).toString();
  const RQ = [['carbohydrate (glucose)', 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O', 6, 6], ['fat (tripalmitin)', '2C₅₁H₉₈O₆ + 145O₂ → 102CO₂ + 98H₂O', 102, 145], ['organic acid (malic)', 'C₄H₆O₅ + 3O₂ → 4CO₂ + 3H₂O', 4, 3], ['protein (approx.)', '—', 0.9, 1]];
  G9.register({
    no: 12, part: 'Unit IV · Plant physiology', short: 'Respiration', title: 'Respiration in Plants',
    blurb: 'Do plants breathe?; glycolysis (EMP pathway) in the cytoplasm; fermentation (alcoholic, lactic); aerobic respiration — link reaction (pyruvate → acetyl CoA), Krebs (TCA) cycle in the matrix, electron transport system and oxidative phosphorylation on the inner mitochondrial membrane; ATP yield (respiratory balance sheet); amphibolic nature of respiration; respiratory quotient.',
    revise: {
      oneLine: 'Glycolysis: glucose → 2 pyruvate, net 2 ATP + 2 NADH. Without O₂: pyruvate → ethanol + CO₂ (yeast) or lactic acid (muscles), net 2 ATP only. With O₂: pyruvate → acetyl CoA (+ CO₂, NADH) → Krebs cycle (per acetyl CoA: 3 NADH, 1 FADH₂, 1 ATP/GTP, 2 CO₂). ETS: each NADH → 3 ATP, FADH₂ → 2 ATP (textbook values); O₂ is the final electron acceptor forming water. Net ≈ 38 ATP per glucose (theoretical). Respiration is amphibolic (both breakdown and building). RQ = CO₂ released / O₂ used: carbohydrates 1, fats < 1 (~0.7), organic acids > 1.',
      sections: [
        { h: 'Balance sheet', html: '<p>Glycolysis 2 ATP + 2 NADH (6); link 2 NADH (6); Krebs 2 ATP + 6 NADH (18) + 2 FADH₂ (4) → 38 ATP (assumes NADH from glycolysis enters fully, no other use).</p>' },
        { h: 'Complexes', html: '<p>Complex I (NADH dehydrogenase), II (succinate dehydrogenase), III (cytochrome bc₁), IV (cytochrome c oxidase), V (ATP synthase F₀–F₁).</p>' },
        { h: 'Fermentation', html: '<p>Incomplete oxidation; yeast is poisoned at ~13% alcohol.</p>' }
      ],
      formulas: [['Glycolysis net', '2 ATP + 2 NADH'], ['Krebs per acetyl CoA', '3 NADH, 1 FADH₂, 1 ATP, 2 CO₂'], ['NADH / FADH₂', '3 / 2 ATP'], ['Net (theory)', '38 ATP'], ['RQ', 'CO₂ ÷ O₂']],
      terms: [['Glycolysis', 'splitting of glucose to pyruvate'], ['Oxidative phosphorylation', 'ATP made using energy of electron transport'], ['Amphibolic', 'pathway used in catabolism and anabolism']],
      traps: ['Glycolysis needs no O₂ and occurs in the cytoplasm.', 'O₂ acts only at the end of ETS.', 'RQ of fats is less than 1.'],
      bridge: '<p>Ch 14 covers breathing and gas exchange in humans.</p>'
    },
    explore: [
      { title: 'ATP counter', intro: 'Count ATP per glucose under different conditions.',
        build(el, K) { let k = 0, nadh = 3, fad = 2; const row = K.row(el); K.select(row, 'condition', ['aerobic', 'anaerobic (yeast/muscle)'], i => { k = i; draw(); }); K.slider(row, 'ATP per NADH', 2.5, 3, 0.5, nadh, v => { nadh = v; draw(); }); K.slider(row, 'ATP per FADH₂', 1.5, 2, 0.5, fad, v => { fad = v; draw(); }); const rd = K.read(el);
          function draw() { if (k) { rd.innerHTML = 'Anaerobic: glycolysis only → <b>2 ATP</b> per glucose; NADH is used to reduce pyruvate (to ethanol or lactate).'; return; } const n = 10, fa = 2, sub = 4; const tot = sub + n * nadh + fa * fad; rd.innerHTML = `substrate-level ATP ${sub} + 10 NADH × ${nadh} + 2 FADH₂ × ${fad} = <b>${tot} ATP</b> per glucose${nadh === 2.5 ? ' (modern estimate ~30–32 after transport costs)' : ' (textbook 38)'}`; } draw(); return null; } },
      { title: 'Respiratory quotient', intro: 'Choose the substrate.',
        build(el, K) { let k = 0; const row = K.row(el); K.select(row, 'substrate', RQ.map(r => r[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { const r = RQ[k]; rd.innerHTML = `${r[1]} → RQ = CO₂/O₂ = <b>${f(r[2] / r[3])}</b> ${r[2] / r[3] > 1.001 ? '(> 1)' : r[2] / r[3] < 0.999 ? '(< 1)' : '(= 1)'}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Location', gen(R) { return G9.S9.groupQ(R, [['glycolysis', 0], ['Krebs cycle', 1], ['electron transport', 2], ['fermentation', 0], ['link reaction', 1]], ['cytoplasm', 'mitochondrial matrix', 'inner mitochondrial membrane'], 'Site of '); } },
      { title: 'RQ', gen(R) { const r = R.pick(RQ.slice(0, 3)); return { q: `RQ for ${r[0]}? (${r[1]})`, a: f(r[2] / r[3]), ans: r[2] / r[3], tol: 0.01 }; } },
      { title: 'Count', gen(R) { const g = R.int(1, 5); return R.chance(.5) ? { q: `CO₂ molecules released in Krebs cycle from ${g} glucose?`, a: String(4 * g), ans: 4 * g } : { q: `Net ATP from glycolysis of ${g} glucose?`, a: String(2 * g), ans: 2 * g }; } },
      { title: 'Products', gen(R) { return G9.S9.pickQ(R, [['End product of glycolysis?', 'pyruvic acid'], ['Products of alcoholic fermentation?', 'ethanol + CO₂'], ['Final electron acceptor in ETS?', 'oxygen (forms water)'], ['First product of Krebs cycle?', 'citric acid'], ['Enzyme complex making ATP?', 'ATP synthase (complex V)']]); } },
      { title: 'Balance sheet', levels: [2, 3], gen(R) { return { q: 'Show the theoretical ATP yield of 38 from one glucose.', a: '4 substrate-level + 10 NADH × 3 + 2 FADH₂ × 2 = 38', ans: 38 }; } }
    ],
    quiz: [
      { q: 'Glycolysis occurs in', o: ['cytoplasm', 'matrix', 'inner membrane', 'nucleus'], a: 0, e: 'No O₂.' }, { q: 'Net ATP glycolysis', o: ['2', '4', '36', '38'], a: 0, e: 'Net.' },
      { q: 'Final electron acceptor', o: ['O₂', 'NAD⁺', 'FAD', 'CO₂'], a: 0, e: 'Water.' }, { q: 'RQ of fat', o: ['< 1', '1', '> 1', '0'], a: 0, e: '≈ 0.7.' },
      { q: 'Yeast anaerobic products', o: ['ethanol + CO₂', 'lactic acid', 'O₂', 'water'], a: 0, e: 'Fermentation.' }, { q: 'Krebs cycle site', o: ['matrix', 'cytoplasm', 'outer membrane', 'stroma'], a: 0, e: 'Mitochondria.' },
      { q: 'NADH yields (textbook)', o: ['3 ATP', '2 ATP', '1 ATP', '4 ATP'], a: 0, e: 'ETS.' }, { q: 'Amphibolic means', o: ['catabolic and anabolic', 'only breakdown', 'only building', 'none'], a: 0, e: 'Both.' },
      { q: 'RQ of glucose', o: ['1', '0.7', '1.33', '0'], a: 0, e: '6/6.' }, { q: 'First Krebs product', o: ['citric acid', 'pyruvate', 'OAA', 'acetyl CoA'], a: 0, e: 'Citrate.' },
      { q: 'Complex V', o: ['ATP synthase', 'cytochrome oxidase', 'NADH dehydrogenase', 'succinate dehydrogenase'], a: 0, e: 'F₀F₁.' }
    ],
    teach: {
      outcomes: ['Trace glycolysis, Krebs and ETS', 'Count ATP', 'Calculate RQ'],
      periods: [{ t: 'Pathways', flow: [['10 min', 'Yeast + sugar balloon.'], ['15 min', 'Flow chart of respiration.'], ['15 min', 'Explore panel 1.']] }, { t: 'RQ and balance', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Balance sheet practice.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Plants don’t respire in light.', 'Glycolysis needs O₂.'], activities: ['Germinating seeds and lime water.', 'Respirometer RQ.'],
      exit: ['Sites of steps.', '38 ATP.', 'RQ of fat.'], homework: 'Draw the respiratory pathway and mark ATP, NADH, FADH₂ and CO₂ at each step.'
    },
    slides: [{ t: 'Respiration in Plants', b: ['Glycolysis and fermentation', 'Krebs cycle', 'ETS and ATP synthesis', 'Balance sheet and RQ'] }, { t: 'Think and share', b: ['Why only 2 ATP without O₂?', 'Why is RQ of fats < 1?'] }],
    fs: { groups: [['Glycolysis', [['Site', 'cytoplasm'], ['Net', '2 ATP + 2 NADH'], ['End', '2 pyruvate']]], ['Aerobic', [['Link', 'acetyl CoA + CO₂'], ['Krebs', '3 NADH, FADH₂, ATP per turn'], ['ETS', 'O₂ final acceptor']]], ['Totals', [['ATP', '38 (theory)'], ['Anaerobic', '2 ATP'], ['RQ', 'carb 1, fat ~0.7, acid > 1']]]],
      ex: [['3 glucose glycolysis', '6 ATP net'], ['Malic acid', 'RQ 1.33']], rem: ['Sites matter.', 'O₂ only at the end.', 'RQ = CO₂/O₂.'] }
  });
})();
