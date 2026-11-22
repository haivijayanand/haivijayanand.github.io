/*
TOOL:    class12_biology_ch10
FAMILY:  CBSE_REVISION / Class 12 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 10 Biotechnology and its Applications (Bt crops, RNA interference, genetically engineered insulin, gene therapy, molecular diagnosis, transgenic animals, ethical issues, biopiracy) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 10, part: 'Unit IX · Biotechnology', short: 'Biotech applications', title: 'Biotechnology and its Applications',
    blurb: 'Applications in agriculture — GM crops, Bt cotton (cry genes), pest-resistant plants by RNA interference (Meloidogyne incognita in tobacco); applications in medicine — genetically engineered insulin (Eli Lilly, A and B chains, 1983), gene therapy (ADA deficiency, 1990), molecular diagnosis (PCR, ELISA, recombinant DNA probes); transgenic animals (models, vaccine safety, chemical safety testing, biological products — Rosie the cow with α-lactalbumin); ethical issues — GEAC, patents and biopiracy (basmati, turmeric, neem).',
    revise: {
      oneLine: 'Bacillus thuringiensis makes inactive Cry protoxin crystals that become active in the alkaline insect gut, binding midgut cells, creating pores and killing the larva; cryIAc and cryIIAb control cotton bollworms, cryIAb corn borer. RNAi: nematode-specific genes introduced via Agrobacterium make dsRNA that silences the parasite’s mRNA, protecting tobacco roots from Meloidogyne. Human insulin = A and B chains joined by disulphide bridges; Eli Lilly made the chains separately in E. coli and joined them (no C-peptide). First gene therapy (1990): a 4-year-old with ADA deficiency given lymphocytes carrying a functional ADA gene; a permanent cure needs the gene in early embryonic cells. Transgenic animals: >95% are mice; Rosie (1997) gave milk with human α-lactalbumin. GEAC (Genetic Engineering Appraisal Committee) checks validity and safety of GM research in India; biopiracy is unauthorised use of bio-resources without compensation.',
      sections: [
        { h: 'GM crop benefits', html: '<p>Tolerance to abiotic stress, less reliance on pesticides, lower post-harvest losses, better mineral use, enhanced nutrition (Golden rice — vitamin A).</p>' },
        { h: 'Molecular diagnosis', html: '<p>PCR detects HIV in suspected AIDS patients and gene mutations in cancer early; probes with radioactive label detect mutated genes by autoradiography; ELISA detects antigen–antibody.</p>' },
        { h: 'Patents', html: '<p>A US patent on basmati rice (1997) and attempted patents on turmeric and neem led India to amend its patent laws.</p>' }
      ],
      formulas: [['Bt toxin', 'inactive protoxin → active in alkaline gut'], ['Insulin', 'A + B chains, S–S bridges'], ['First gene therapy', '1990, ADA deficiency']],
      terms: [['RNAi', 'silencing of mRNA by complementary dsRNA'], ['Transgenic', 'organism carrying a foreign gene'], ['Biopiracy', 'use of bio-resources without authorisation or compensation']],
      traps: ['Bt toxin doesn’t harm Bt bacterium itself (inactive form).', 'Pro-insulin has an extra C-peptide removed in maturation.', 'ADA therapy with lymphocytes is not permanent.'],
      bridge: '<p>Ch 11 starts Unit X — ecology.</p>'
    },
    explore: [
      { title: 'Bt toxin action', intro: 'Step through. <kbd>S</kbd> steps.',
        build(el, K) { const S = ['Bacillus thuringiensis forms crystals of inactive protoxin (cry gene product).', 'A caterpillar (e.g. bollworm) eats leaves of a Bt plant containing the protoxin.', 'The alkaline pH of the insect gut solubilises the crystals and activates the toxin.', 'Active toxin binds to midgut epithelial cells and creates pores.', 'Cells swell and lyse — the insect dies; humans are unaffected (acidic stomach, no receptors).']; let k = 0; const row = K.row(el); const rd = K.read(el); function draw() { rd.innerHTML = `step ${k + 1}/5 · ${S[k]}`; } const step = () => { k = (k + 1) % S.length; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Application sorter', intro: 'Sort by field.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['agriculture', 'medicine', 'transgenic animal'], items: [['Bt cotton', 0], ['RNAi tobacco', 0], ['Golden rice', 0], ['human insulin from E. coli', 1], ['ADA gene therapy', 1], ['PCR detection of HIV', 1], ['Rosie the cow', 2], ['mice for vaccine safety testing', 2]] }); } }
    ],
    gens: [
      { title: 'cry gene', gen(R) { return G9.S9.pickQ(R, [['cryIAc and cryIIAb control?', 'cotton bollworms'], ['cryIAb controls?', 'corn borer'], ['Where is Bt toxin activated?', 'alkaline gut of insect'], ['Source of cry genes?', 'Bacillus thuringiensis']]); } },
      { title: 'Medicine', gen(R) { return G9.S9.pickQ(R, [['Company that made recombinant human insulin (1983)?', 'Eli Lilly'], ['Chains in insulin?', 'A and B, joined by disulphide bridges'], ['First gene therapy disease?', 'ADA deficiency (1990)'], ['Technique for early HIV detection?', 'PCR'], ['Transgenic cow producing α-lactalbumin?', 'Rosie (1997)']]); } },
      { title: 'Field', gen(R) { return G9.S9.groupQ(R, [['Bt cotton', 0], ['Golden rice', 0], ['gene therapy', 1], ['recombinant insulin', 1], ['RNAi in tobacco', 0], ['ELISA', 1]], ['agriculture', 'medicine'], ''); } },
      { title: 'RNAi', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Pest controlled by RNAi in tobacco?', 'nematode Meloidogyne incognita'], ['Vector used for RNAi gene?', 'Agrobacterium'], ['What silences the parasite mRNA?', 'complementary dsRNA'], ['Natural role of RNAi?', 'cellular defence in eukaryotes']]); } },
      { title: 'Ethics', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Indian body regulating GM research?', 'GEAC'], ['Define biopiracy?', 'use of bio-resources without authorisation or compensation'], ['Indian plants involved in patent disputes?', 'basmati rice, turmeric, neem'], ['Why are transgenic animals used for chemical safety testing?', 'they are more sensitive; results faster']]); } }
    ],
    quiz: [
      { q: 'Bt toxin activated by', o: ['alkaline gut pH', 'acid', 'light', 'heat'], a: 0, e: 'Insect gut.' }, { q: 'Bollworm control', o: ['cryIAc', 'cryIAb only', 'lacZ', 'ADA'], a: 0, e: 'Cotton.' },
      { q: 'RNAi protects tobacco from', o: ['Meloidogyne', 'aphids', 'virus', 'fungi'], a: 0, e: 'Nematode.' }, { q: 'Insulin chains', o: ['A and B', 'only A', 'C only', 'α and β'], a: 0, e: 'S–S.' },
      { q: 'First gene therapy for', o: ['ADA deficiency', 'diabetes', 'AIDS', 'cancer'], a: 0, e: '1990.' }, { q: 'Rosie milk had', o: ['human α-lactalbumin', 'insulin', 'Bt toxin', 'vitamin A'], a: 0, e: '1997.' },
      { q: 'GEAC is', o: ['Indian GM regulator', 'gene', 'vector', 'patent'], a: 0, e: 'Committee.' }, { q: 'Golden rice rich in', o: ['vitamin A (β-carotene)', 'iron', 'protein', 'vitamin C'], a: 0, e: 'Nutrition.' },
      { q: 'Most transgenic animals', o: ['mice', 'cows', 'pigs', 'fish'], a: 0, e: '>95%.' }, { q: 'Biopiracy example', o: ['basmati patent', 'Bt cotton', 'insulin', 'ELISA'], a: 0, e: 'Patent.' },
      { q: 'Early HIV detection', o: ['PCR', 'Widal', 'X-ray', 'biopsy'], a: 0, e: 'Low copies.' }
    ],
    teach: {
      outcomes: ['Explain Bt crops and RNAi', 'Describe recombinant insulin, gene therapy, diagnosis', 'Discuss ethics, GEAC and biopiracy'],
      periods: [{ t: 'Agriculture', flow: [['10 min', 'GM foods debate opener.'], ['15 min', 'Explore panel 1.'], ['15 min', 'RNAi flowchart.']] }, { t: 'Medicine and ethics', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Biopiracy case study.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Bt toxin poisons humans.', 'Gene therapy changes all cells.'], activities: ['Debate on GM crops.', 'Timeline of biotech milestones.'],
      exit: ['Bt action.', 'Insulin making.', 'GEAC role.'], homework: 'Write a balanced note on benefits and concerns of GM crops.'
    },
    slides: [{ t: 'Biotechnology Applications', b: ['Bt crops and RNAi', 'Insulin and gene therapy', 'Diagnosis and transgenic animals', 'Ethics and biopiracy'] }, { t: 'Think and share', b: ['Should GM foods be labelled?', 'Who should own traditional knowledge?'] }],
    fs: { groups: [['Agriculture', [['Bt', 'cry genes, alkaline gut'], ['RNAi', 'dsRNA silences nematode'], ['Golden rice', 'vitamin A']]], ['Medicine', [['Insulin', 'A + B chains (Eli Lilly)'], ['Gene therapy', 'ADA, 1990'], ['Diagnosis', 'PCR, ELISA, probes']]], ['Society', [['Transgenic', 'mice, Rosie'], ['GEAC', 'regulator'], ['Biopiracy', 'basmati, turmeric, neem']]]],
      ex: [['cryIAb', 'corn borer'], ['ADA', 'lymphocyte gene therapy']], rem: ['Protoxin inactive.', 'No C-peptide.', 'Biopiracy.'] }
  });
})();
