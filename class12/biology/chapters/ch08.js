/*
TOOL:    class12_biology_ch08
FAMILY:  CBSE_REVISION / Class 12 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 8 Microbes in Human Welfare (household products, industrial products, sewage treatment, biogas, biocontrol agents, biofertilisers) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 8, part: 'Unit VIII · Biology and human welfare', short: 'Microbes', title: 'Microbes in Human Welfare',
    blurb: 'Microbes in household products (curd, dough, cheese); in industrial products — fermented beverages, antibiotics, chemicals, enzymes and other bioactive molecules; sewage treatment (primary and secondary/biological, BOD, activated sludge, anaerobic sludge digesters); microbes in biogas production; microbes as biocontrol agents and as biofertilisers.',
    revise: {
      oneLine: 'Lactobacillus (LAB) turns milk into curd and raises vitamin B₁₂; Saccharomyces cerevisiae (baker’s/brewer’s yeast) leavens dough and ferments drinks; Propionibacterium sharmanii makes Swiss cheese holes; Penicillium roqueforti ripens Roquefort cheese. Industrial products: penicillin (Penicillium notatum, Fleming); citric acid (Aspergillus niger), acetic acid (Acetobacter aceti), butyric acid (Clostridium butylicum), lactic acid (Lactobacillus); ethanol (Saccharomyces); streptokinase (Streptococcus, clot buster); cyclosporin A (Trichoderma polysporum, immunosuppressant); statins (Monascus purpureus, lower cholesterol); lipases in detergents; pectinases and proteases clarify juices. Sewage: primary (physical removal) → secondary (aerobic flocs reduce BOD) → activated sludge → anaerobic digesters (methane, H₂S, CO₂ = biogas). Biogas: methanogens (Methanobacterium) in cattle dung, mostly methane. Biocontrol: ladybird (aphids), dragonflies (mosquitoes), Bacillus thuringiensis (caterpillars), Trichoderma (fungal pathogens), baculoviruses (Nucleopolyhedrovirus). Biofertilisers: Rhizobium, Azotobacter, Azospirillum, cyanobacteria (Anabaena, Nostoc), mycorrhiza (Glomus).',
      sections: [
        { h: 'BOD', html: '<p>Biochemical oxygen demand — oxygen consumed by microbes to oxidise organic matter in 1 L water; higher BOD = more polluted. Secondary treatment continues until BOD drops a lot.</p>' },
        { h: 'Ganga & Yamuna Action Plans', html: '<p>Government programmes to build sewage treatment plants so only treated sewage enters rivers.</p>' },
        { h: 'Distilled vs non-distilled', html: '<p>Wine and beer are not distilled; whisky, brandy and rum are distilled.</p>' }
      ],
      formulas: [['BOD', 'O₂ used in 1 L water (mg/L)'], ['Biogas', 'CH₄ (50–70%) + CO₂ + H₂S'], ['Antibiotic first', 'penicillin, Fleming']],
      terms: [['Flocs', 'masses of bacteria and fungal filaments in aeration tank'], ['Methanogens', 'anaerobes producing methane'], ['Biofertiliser', 'organisms enriching soil nutrients']],
      traps: ['Statins come from yeast Monascus, not bacteria.', 'Bt is a bacterium; Bt crops carry its gene.', 'Activated sludge partly returns to the aeration tank as inoculum.'],
      bridge: '<p>Ch 9 starts biotechnology.</p>'
    },
    explore: [
      { title: 'Microbe → product', intro: 'Pick a microbe.',
        build(el, K) { const M = [['Lactobacillus', 'curd; lactic acid; adds vitamin B₁₂'], ['Saccharomyces cerevisiae', 'bread dough, ethanol, beer, wine'], ['Propionibacterium sharmanii', 'Swiss cheese (large holes from CO₂)'], ['Penicillium notatum', 'penicillin (antibiotic)'], ['Aspergillus niger', 'citric acid'], ['Acetobacter aceti', 'acetic acid (vinegar)'], ['Clostridium butylicum', 'butyric acid'], ['Streptococcus', 'streptokinase (clot buster)'], ['Trichoderma polysporum', 'cyclosporin A (immunosuppressant)'], ['Monascus purpureus', 'statins (lower blood cholesterol)'], ['Methanobacterium', 'biogas (methane)'], ['Bacillus thuringiensis', 'biocontrol of caterpillars (Bt toxin)'], ['Rhizobium', 'N₂ fixation in legume root nodules']]; let k = 3; const row = K.row(el); K.select(row, 'microbe', M.map(m => m[0]), i => { k = i; draw(); }).value = 3; const rd = K.read(el); function draw() { rd.innerHTML = `<b><i>${M[k][0]}</i></b> → ${M[k][1]}`; } draw(); return null; } },
      { title: 'Sewage plant', intro: 'Step through treatment. <kbd>S</kbd> steps.',
        build(el, K) { const S = [['primary treatment', 'filtration and sedimentation remove floating debris, grit and soil; supernatant = primary effluent', 600], ['aeration tank (secondary)', 'aerobic microbes form flocs and consume organic matter; BOD falls sharply', 120], ['settling tank', 'flocs settle as activated sludge; part returned as inoculum', 40], ['anaerobic sludge digester', 'bacteria digest sludge producing methane, H₂S and CO₂ (biogas)', 40], ['release', 'effluent released into rivers and streams', 20]]; let k = 0; const row = K.row(el); const rd = K.read(el); function draw() { rd.innerHTML = `step ${k + 1}/5 · <b>${S[k][0]}</b>: ${S[k][1]} · BOD ≈ <b>${S[k][2]} mg/L</b> (illustrative)`; } const step = () => { k = (k + 1) % S.length; draw(); }; K.button(row, 'Next step (S)', step); draw(); return { step, play() {}, pause() {} }; } }
    ],
    gens: [
      { title: 'Source', gen(R) { return G9.S9.pickQ(R, [['penicillin', 'Penicillium notatum'], ['citric acid', 'Aspergillus niger'], ['statins', 'Monascus purpureus'], ['cyclosporin A', 'Trichoderma polysporum'], ['streptokinase', 'Streptococcus'], ['acetic acid', 'Acetobacter aceti'], ['Swiss cheese', 'Propionibacterium sharmanii']], 'Microbe giving '); } },
      { title: 'Category', gen(R) { return G9.S9.groupQ(R, [['Bacillus thuringiensis', 0], ['Trichoderma', 0], ['ladybird beetle', 0], ['Rhizobium', 1], ['Azotobacter', 1], ['Anabaena', 1], ['Glomus (mycorrhiza)', 1], ['Nucleopolyhedrovirus', 0]], ['biocontrol', 'biofertiliser'], ''); } },
      { title: 'BOD', gen(R) { const a = R.pick([300, 500, 800]), b = R.pick([20, 40, 60]); return { q: `Sewage BOD falls from ${a} to ${b} mg/L after secondary treatment. Percentage reduction?`, a: `${f((a - b) / a * 100)}%`, ans: (a - b) / a * 100, tol: 0.01 }; } },
      { title: 'Concepts', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['What does high BOD mean?', 'more organic pollution'], ['Main gas in biogas?', 'methane'], ['Why is Bt specific to insects?', 'toxin activated only in alkaline insect gut'], ['Use of lipases?', 'remove oily stains in detergents'], ['Why do bread doughs rise?', 'CO₂ from yeast fermentation']]); } },
      { title: 'Process', levels: [2, 3], gen(R) { return G9.S9.groupQ(R, [['sedimentation of grit', 0], ['flocs in aeration tank', 1], ['methane from sludge', 2], ['filtration of debris', 0]], ['primary', 'secondary (aerobic)', 'anaerobic digestion'], 'Stage: '); } }
    ],
    quiz: [
      { q: 'Curd bacteria', o: ['Lactobacillus', 'Rhizobium', 'Bt', 'Acetobacter'], a: 0, e: 'LAB.' }, { q: 'Statins from', o: ['Monascus purpureus', 'Aspergillus', 'Penicillium', 'Streptococcus'], a: 0, e: 'Yeast.' },
      { q: 'Clot buster', o: ['streptokinase', 'cyclosporin', 'statin', 'lipase'], a: 0, e: 'Streptococcus.' }, { q: 'Biogas main gas', o: ['methane', 'CO₂', 'H₂S', 'O₂'], a: 0, e: 'Methanogens.' },
      { q: 'High BOD means', o: ['more pollution', 'clean water', 'more oxygen', 'no microbes'], a: 0, e: 'Organic load.' }, { q: 'Swiss cheese holes', o: ['Propionibacterium', 'Penicillium', 'Lactobacillus', 'yeast'], a: 0, e: 'CO₂.' },
      { q: 'Biocontrol of caterpillars', o: ['Bacillus thuringiensis', 'Rhizobium', 'Anabaena', 'Glomus'], a: 0, e: 'Bt.' }, { q: 'Mycorrhiza example', o: ['Glomus', 'Nostoc', 'Azotobacter', 'Bt'], a: 0, e: 'Fungus.' },
      { q: 'Penicillin discovered by', o: ['Fleming', 'Pasteur', 'Koch', 'Darwin'], a: 0, e: '1928.' }, { q: 'Citric acid from', o: ['Aspergillus niger', 'Clostridium', 'Acetobacter', 'Lactobacillus'], a: 0, e: 'Fungus.' },
      { q: 'Cyclosporin A use', o: ['organ transplant immunosuppressant', 'antibiotic', 'cholesterol', 'clot'], a: 0, e: 'Trichoderma.' }
    ],
    teach: {
      outcomes: ['Match microbes to products', 'Explain sewage treatment and biogas', 'Describe biocontrol and biofertilisers'],
      periods: [{ t: 'Products', flow: [['10 min', 'Curd making.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Industrial products chart.']] }, { t: 'Environment', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Biogas plant diagram.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['All microbes are harmful.', 'Biogas is mostly CO₂.'], activities: ['Yeast balloon experiment.', 'Visit/virtual tour of STP.'],
      exit: ['Three microbe products.', 'BOD meaning.', 'One biofertiliser.'], homework: 'Design a poster on microbes as friends.'
    },
    slides: [{ t: 'Microbes in Human Welfare', b: ['Household and industry', 'Sewage treatment', 'Biogas', 'Biocontrol and biofertilisers'] }, { t: 'Think and share', b: ['Why add curd to milk to make curd?', 'Why is biogas eco-friendly?'] }],
    fs: { groups: [['Products', [['Curd', 'Lactobacillus'], ['Penicillin', 'Penicillium notatum'], ['Statins', 'Monascus']]], ['Sewage', [['Primary', 'physical'], ['Secondary', 'flocs, BOD ↓'], ['Digester', 'biogas']]], ['Agriculture', [['Biocontrol', 'Bt, Trichoderma, ladybird'], ['Biofertiliser', 'Rhizobium, Anabaena, Glomus']]]],
      ex: [['BOD 500 → 40', '92% reduction'], ['clot buster', 'streptokinase']], rem: ['Methane biogas.', 'High BOD bad.', 'Bt bacterium.'] }
  });
})();
