/*
TOOL:    class11_biology_ch16
FAMILY:  CBSE_REVISION / Class 11 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 16 Excretory Products and their Elimination (ammonotelism ureotelism uricotelism, human excretory system, nephron structure, urine formation, countercurrent mechanism, regulation by ADH RAAS ANF, micturition, other excretory organs, disorders, dialysis) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 16, part: 'Unit V · Human physiology', short: 'Excretion', title: 'Excretory Products and their Elimination',
    blurb: 'Nitrogenous wastes — ammonia, urea, uric acid — and ammonotelic, ureotelic, uricotelic animals; human excretory system; nephron (glomerulus, Bowman’s capsule, PCT, loop of Henle, DCT, collecting duct; cortical and juxtamedullary nephrons); urine formation (filtration, reabsorption, secretion); GFR; countercurrent mechanism; regulation by ADH, renin–angiotensin–aldosterone and ANF; micturition; role of lungs, liver, skin; disorders (uraemia, renal failure, calculi, glomerulonephritis), haemodialysis and transplantation.',
    revise: {
      oneLine: 'Ammonia (most toxic, needs much water: bony fish), urea (mammals, frogs), uric acid (least toxic, little water: birds, reptiles, insects). Each kidney has about one million nephrons. GFR ≈ 125 mL/min (180 L/day); ~99% is reabsorbed, giving ~1.5 L urine per day. PCT reabsorbs most glucose, amino acids, Na⁺ and water; the descending limb of Henle is permeable to water, the ascending limb to electrolytes — with the vasa recta they form the countercurrent system that concentrates urine (medullary osmolarity up to ~1200 mOsm/L). ADH increases water reabsorption; RAAS raises blood pressure and GFR; ANF opposes RAAS.',
      sections: [
        { h: 'Countercurrent', html: '<p>Opposite flows in Henle’s loop and vasa recta keep a gradient (300 mOsm/L cortex to 1200 in inner medulla); NaCl and urea help maintain it.</p>' },
        { h: 'Hormones', html: '<p>Low blood volume → ADH (more water reabsorbed, vasoconstriction). Low GFR/BP → JGA releases renin → angiotensin II → aldosterone (Na⁺ and water reabsorption). High atrial stretch → ANF (vasodilation, less renin).</p>' },
        { h: 'Diagnosis', html: '<p>Glycosuria and ketonuria suggest diabetes mellitus. Kidney stones are crystalline salts (oxalates).</p>' }
      ],
      formulas: [['GFR', '≈ 125 mL/min ≈ 180 L/day'], ['Urine', '≈ 1–1.5 L/day'], ['Reabsorbed', '≈ 99%'], ['Medulla', 'up to ~1200 mOsm/L'], ['Urea excreted', '25–30 g/day']],
      terms: [['Ultrafiltration', 'pressure filtration at the glomerulus'], ['JGA', 'juxtaglomerular apparatus — senses GFR, releases renin'], ['Haemodialysis', 'artificial kidney removing urea from blood']],
      traps: ['Ascending limb is impermeable to water.', 'ADH acts on DCT and collecting duct.', 'Birds are uricotelic, not ureotelic.'],
      bridge: '<p>Ch 19 explains the hormones that control kidneys.</p>'
    },
    explore: [
      { title: 'Filtration and reabsorption', intro: 'Set GFR and percentage reabsorbed; see daily urine.',
        build(el, K) { let g = 125, r = 99; const row = K.row(el); K.slider(row, 'GFR (mL/min)', 60, 150, 1, g, v => { g = v; draw(); }); K.slider(row, '% reabsorbed', 95, 99.8, 0.1, r, v => { r = v; draw(); }); const rd = K.read(el); function draw() { const day = g * 60 * 24 / 1000; const u = day * (100 - r) / 100; rd.innerHTML = `filtrate/day = ${g} × 1440 = <b>${day.toFixed(0)} L</b> · urine = <b>${u.toFixed(2)} L/day</b>${u > 3 ? ' (polyuria)' : u < 0.5 ? ' (very low output)' : ''} · ADH ↑ → more reabsorption → less, more concentrated urine`; } draw(); return null; } },
      { title: 'Along the nephron', intro: '<kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Glomerulus', 'Blood pressure forces plasma (not cells, proteins) into Bowman’s capsule — ultrafiltration.'], ['PCT', 'Reabsorbs ~70–80% of electrolytes and water, all glucose and amino acids; secretes H⁺, NH₃.'], ['Descending limb', 'Permeable to water, not electrolytes — filtrate becomes concentrated.'], ['Ascending limb', 'Impermeable to water; NaCl pumped out — filtrate becomes dilute.'], ['DCT', 'Conditional reabsorption of Na⁺ and water; secretes H⁺, K⁺, NH₃ — pH balance.'], ['Collecting duct', 'Water reabsorbed under ADH; urea passes to medulla — concentrated urine.']] }); } }
    ],
    gens: [
      { title: 'Waste type', gen(R) { return G9.S9.groupQ(R, [['bony fish', 0], ['human', 1], ['pigeon', 2], ['frog (adult)', 1], ['lizard', 2], ['insect', 2], ['tadpole', 0]], ['ammonotelic', 'ureotelic', 'uricotelic'], 'Excretory type of '); } },
      { title: 'Urine volume', gen(R) { const g = R.pick([100, 120, 125]), r = R.pick([98.5, 99, 99.2]); const u = g * 1.44 * (100 - r) / 100; return { q: `GFR ${g} mL/min; ${r}% of filtrate is reabsorbed. Urine per day?`, a: `${+u.toFixed(2)} L`, ans: u, tol: 0.01 }; } },
      { title: 'Nephron part', gen(R) { return G9.S9.groupQ(R, [['ultrafiltration', 0], ['reabsorbs all glucose', 1], ['permeable to water only', 2], ['impermeable to water, pumps out NaCl', 3], ['ADH-controlled water reabsorption', 4]], ['glomerulus', 'PCT', 'descending limb', 'ascending limb', 'collecting duct'], 'Site of '); } },
      { title: 'Hormones', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Effect of ADH?', 'more water reabsorbed in DCT/collecting duct'], ['What releases renin?', 'juxtaglomerular (JG) cells when GFR falls'], ['Effect of aldosterone?', 'Na⁺ and water reabsorption in DCT'], ['What does ANF do?', 'vasodilation, opposes RAAS']]); } },
      { title: 'Disorders', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['What is uraemia?', 'accumulation of urea in blood'], ['Treatment for kidney failure?', 'haemodialysis or kidney transplant'], ['Glucose in urine suggests?', 'diabetes mellitus'], ['Other organs that excrete?', 'lungs (CO₂), liver (bile pigments), skin (sweat, sebum)']]); } }
    ],
    quiz: [
      { q: 'Humans are', o: ['ureotelic', 'ammonotelic', 'uricotelic', 'none'], a: 0, e: 'Urea.' }, { q: 'GFR ≈', o: ['125 mL/min', '1.5 L/min', '12 mL/min', '500 mL/min'], a: 0, e: '180 L/day.' },
      { q: 'Glucose reabsorbed in', o: ['PCT', 'DCT', 'loop', 'collecting duct'], a: 0, e: 'Proximal.' }, { q: 'Ascending limb', o: ['impermeable to water', 'permeable to water', 'filters blood', 'secretes urine'], a: 0, e: 'NaCl out.' },
      { q: 'ADH acts on', o: ['DCT and collecting duct', 'glomerulus', 'PCT only', 'bladder'], a: 0, e: 'Water.' }, { q: 'Birds excrete', o: ['uric acid', 'urea', 'ammonia', 'CO₂ only'], a: 0, e: 'Water saving.' },
      { q: 'Renin from', o: ['JG cells', 'adrenal', 'liver', 'pituitary'], a: 0, e: 'JGA.' }, { q: 'Nephrons per kidney', o: ['~1 million', '1000', '100', '1 billion'], a: 0, e: 'Million.' },
      { q: 'Countercurrent organ', o: ['loop of Henle + vasa recta', 'glomerulus', 'ureter', 'bladder'], a: 0, e: 'Gradient.' }, { q: 'Urine per day ≈', o: ['1–1.5 L', '180 L', '10 L', '0.1 L'], a: 0, e: 'After reabsorption.' },
      { q: 'Uraemia treatment', o: ['dialysis', 'insulin', 'antibiotics only', 'vitamin C'], a: 0, e: 'Artificial kidney.' }
    ],
    teach: {
      outcomes: ['Classify nitrogenous wastes', 'Trace urine formation in the nephron', 'Explain hormonal regulation'],
      periods: [{ t: 'Nephron', flow: [['10 min', 'Kidney dissection/model.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Explore panel 1.']] }, { t: 'Regulation', flow: [['15 min', 'ADH and RAAS flow chart.'], ['15 min', 'Disorders and dialysis.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['All filtrate becomes urine.', 'Ascending limb absorbs water.'], activities: ['Nephron model with tubes.', 'Urine test strip demo (simulated).'],
      exit: ['Three waste types.', 'Nephron segment roles.', 'ADH effect.'], homework: 'Draw a nephron and annotate what happens in each part.'
    },
    slides: [{ t: 'Excretory Products and their Elimination', b: ['Nitrogenous wastes', 'Nephron and urine formation', 'Countercurrent mechanism', 'Regulation and disorders'] }, { t: 'Think and share', b: ['Why do birds excrete uric acid?', 'Why 180 L filtered but 1.5 L urine?'] }],
    fs: { groups: [['Wastes', [['Ammonia', 'fish'], ['Urea', 'mammals'], ['Uric acid', 'birds, reptiles, insects']]], ['Nephron', [['Glomerulus', 'filtration'], ['PCT', 'bulk reabsorption'], ['Loop', 'countercurrent'], ['CD', 'ADH water']]], ['Control', [['ADH', 'water'], ['RAAS', 'Na⁺, BP'], ['ANF', 'opposes RAAS']]]],
      ex: [['125 mL/min, 99%', '1.8 L/day'], ['Pigeon', 'uricotelic']], rem: ['99% reabsorbed.', 'Limbs differ in permeability.', 'Hormones fine-tune.'] }
  });
})();
