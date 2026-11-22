/*
TOOL:    class12_biology_ch07
FAMILY:  CBSE_REVISION / Class 12 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 7 Human Health and Disease (common diseases, immunity, vaccination, allergies, autoimmunity, immune system, AIDS, cancer, drugs and alcohol abuse) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 7, part: 'Unit VIII · Biology and human welfare', short: 'Health & disease', title: 'Human Health and Disease',
    blurb: 'Common diseases in humans — typhoid, pneumonia, common cold, malaria (Plasmodium life cycle), amoebiasis, ascariasis, filariasis, ringworm; prevention and control; immunity — innate (barriers) and acquired (B and T cells, primary and secondary response, antibodies), active and passive immunity, vaccination and immunisation, allergies, autoimmunity, lymphoid organs; AIDS (HIV replication, diagnosis, prevention); cancer (types, causes, detection, treatment); drugs and alcohol abuse — opioids, cannabinoids, coca alkaloids, adolescence and addiction, prevention.',
    revise: {
      oneLine: 'Pathogens: typhoid — Salmonella typhi (Widal test); pneumonia — Streptococcus pneumoniae, Haemophilus influenzae; common cold — rhinoviruses; malaria — Plasmodium (vivax, malariae, falciparum — most serious), female Anopheles vector, haemozoin causes chill and fever; amoebiasis — Entamoeba histolytica (houseflies carry); ascariasis — Ascaris; filariasis (elephantiasis) — Wuchereria, Culex mosquito; ringworm — Microsporum, Trichophyton, Epidermophyton. Antibody (H₂L₂) types IgA, IgM, IgE, IgG, IgD. Active immunity — own antibodies (infection, vaccine); passive — ready antibodies (colostrum IgA, antitoxin). Primary lymphoid organs: bone marrow, thymus; secondary: spleen, lymph nodes, tonsils, Peyer’s patches, MALT. HIV infects helper T cells (via macrophages acting as HIV factories); ELISA diagnoses. Cancer cells lose contact inhibition; malignant tumours metastasise.',
      sections: [
        { h: 'Plasmodium cycle', html: '<p>Sporozoites enter with mosquito bite → liver → RBCs (asexual; rupture releases haemozoin) → gametocytes → taken by female Anopheles → fertilisation in gut → sporozoites in salivary glands.</p>' },
        { h: 'Cancer', html: '<p>Carcinogens: radiation, tobacco chemicals, oncogenic viruses (proto-oncogenes → oncogenes). Detection: biopsy, histopathology, CT, MRI, PET. Treatment: surgery, radiotherapy, chemotherapy, immunotherapy (α-interferon).</p>' },
        { h: 'Drugs', html: '<p>Opioids (heroin/smack — depressant), cannabinoids (marijuana, hashish — affect cardiovascular system), cocaine (stimulant, dopamine transport). Warning signs in adolescents and the role of family, school and counselling.</p>' }
      ],
      formulas: [['Antibody', 'H₂L₂ (2 heavy + 2 light chains)'], ['Typhoid test', 'Widal'], ['HIV test', 'ELISA'], ['Malaria vector', 'female Anopheles']],
      terms: [['Allergen', 'substance causing an exaggerated immune response (IgE, histamine)'], ['Autoimmunity', 'immune attack on self (rheumatoid arthritis)'], ['Metastasis', 'spread of cancer cells to new sites']],
      traps: ['Elephantiasis spreads by Culex, not Anopheles.', 'Colostrum gives passive, not active, immunity.', 'HIV is a retrovirus (RNA → DNA by reverse transcriptase).'],
      bridge: '<p>Ch 8 shows the useful side of microbes.</p>'
    },
    explore: [
      { title: 'Disease finder', intro: 'Pick a disease.',
        build(el, K) { const D = [['typhoid', 'Salmonella typhi (bacterium)', 'contaminated food/water', 'high fever, weakness, stomach pain; Widal test'], ['pneumonia', 'Streptococcus pneumoniae, Haemophilus influenzae', 'droplets, sharing utensils', 'alveoli fill with fluid; lips/nails grey-bluish'], ['common cold', 'rhinoviruses', 'droplets, contaminated objects', 'nasal congestion, sore throat; lasts 3–7 days'], ['malaria', 'Plasmodium (protozoan)', 'female Anopheles bite', 'chill and high fever recurring every 3–4 days'], ['amoebiasis', 'Entamoeba histolytica', 'houseflies, contaminated food/water', 'constipation, cramps, stools with mucus and blood'], ['ascariasis', 'Ascaris (roundworm)', 'eggs in soil/water/vegetables', 'internal bleeding, anaemia, intestinal blockage'], ['filariasis', 'Wuchereria (bancrofti, malayi)', 'Culex mosquito bite', 'chronic inflammation of lymph vessels of limbs (elephantiasis)'], ['ringworm', 'Microsporum, Trichophyton, Epidermophyton (fungi)', 'soil, towels, combs', 'dry scaly lesions, itching on skin, nails, scalp']]; let k = 3; const row = K.row(el); K.select(row, 'disease', D.map(d => d[0]), i => { k = i; draw(); }).value = 3; const rd = K.read(el); function draw() { const d = D[k]; rd.innerHTML = `<b>${d[0]}</b> · pathogen: ${d[1]} · spread: ${d[2]} · signs: ${d[3]}`; } draw(); return null; } },
      { title: 'Immunity sorter', intro: 'Sort into immunity types.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['innate', 'active acquired', 'passive acquired'], items: [['skin and mucus', 0], ['stomach acid', 0], ['interferons from virus-infected cells', 0], ['vaccine', 1], ['recovering from measles', 1], ['colostrum antibodies', 2], ['anti-tetanus serum', 2], ['snake antivenom', 2]] }); } }
    ],
    gens: [
      { title: 'Pathogen', gen(R) { return G9.S9.pickQ(R, [['typhoid', 'Salmonella typhi'], ['malaria', 'Plasmodium'], ['amoebiasis', 'Entamoeba histolytica'], ['filariasis', 'Wuchereria'], ['common cold', 'rhinoviruses'], ['ringworm', 'Microsporum/Trichophyton/Epidermophyton'], ['AIDS', 'HIV (retrovirus)']], 'Causative agent of '); } },
      { title: 'Immunity type', gen(R) { return G9.S9.groupQ(R, [['vaccination', 0], ['colostrum', 1], ['antitoxin injection', 1], ['natural infection', 0]], ['active', 'passive'], ''); } },
      { title: 'Antibody', gen(R) { return G9.S9.pickQ(R, [['Antibody in colostrum?', 'IgA'], ['Antibody in allergy?', 'IgE'], ['Antibody crossing placenta?', 'IgG'], ['First antibody in primary response?', 'IgM'], ['Structure of antibody?', 'H₂L₂ — two heavy and two light chains']]); } },
      { title: 'Lymphoid organs', levels: [2, 3], gen(R) { return G9.S9.groupQ(R, [['bone marrow', 0], ['thymus', 0], ['spleen', 1], ['lymph nodes', 1], ['tonsils', 1], ['Peyer’s patches', 1]], ['primary', 'secondary'], ''); } },
      { title: 'Concepts', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Which cells does HIV destroy?', 'helper T cells'], ['What causes chill and fever in malaria?', 'haemozoin released on RBC rupture'], ['What is contact inhibition?', 'normal cells stop dividing on contact; lost in cancer'], ['Drug from poppy latex?', 'morphine/heroin (opioids)'], ['Test for HIV?', 'ELISA']]); } }
    ],
    quiz: [
      { q: 'Widal test for', o: ['typhoid', 'malaria', 'AIDS', 'cancer'], a: 0, e: 'Salmonella.' }, { q: 'Malaria vector', o: ['female Anopheles', 'Culex', 'Aedes', 'housefly'], a: 0, e: 'Plasmodium.' },
      { q: 'Elephantiasis vector', o: ['Culex', 'Anopheles', 'Aedes', 'tsetse'], a: 0, e: 'Wuchereria.' }, { q: 'Colostrum antibody', o: ['IgA', 'IgE', 'IgM', 'IgD'], a: 0, e: 'Passive.' },
      { q: 'HIV attacks', o: ['helper T cells', 'RBCs', 'platelets', 'B cells only'], a: 0, e: 'CD4.' }, { q: 'Primary lymphoid organ', o: ['thymus', 'spleen', 'tonsil', 'lymph node'], a: 0, e: 'Maturation.' },
      { q: 'Allergy antibody', o: ['IgE', 'IgG', 'IgA', 'IgM'], a: 0, e: 'Histamine.' }, { q: 'Ringworm caused by', o: ['fungi', 'worms', 'bacteria', 'virus'], a: 0, e: 'Dermatophytes.' },
      { q: 'Cancer cells lose', o: ['contact inhibition', 'nucleus', 'DNA', 'membranes'], a: 0, e: 'Uncontrolled.' }, { q: 'Antibody structure', o: ['H₂L₂', 'H₄', 'L₄', 'HL'], a: 0, e: 'Y-shape.' },
      { q: 'Cocaine affects', o: ['dopamine transport', 'insulin', 'thyroxine', 'bile'], a: 0, e: 'Stimulant.' }
    ],
    teach: {
      outcomes: ['Identify pathogens, vectors and symptoms', 'Explain immunity, vaccination, AIDS and cancer', 'Discuss drug abuse prevention'],
      periods: [{ t: 'Diseases', flow: [['10 min', 'Case stories.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Plasmodium cycle diagram.']] }, { t: 'Immunity and more', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'AIDS, cancer, drugs discussion.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Antibiotics kill viruses.', 'All tumours are cancerous.'], activities: ['Hand-washing glitter demo.', 'Vaccination schedule chart.'],
      exit: ['Vector pairs.', 'Active vs passive.', 'HIV target.'], homework: 'Make a table of 8 diseases: pathogen, spread, prevention.'
    },
    slides: [{ t: 'Human Health and Disease', b: ['Common diseases', 'Immunity and vaccination', 'AIDS and cancer', 'Drugs and alcohol'] }, { t: 'Think and share', b: ['Why are booster doses given?', 'How can schools prevent drug abuse?'] }],
    fs: { groups: [['Diseases', [['Typhoid', 'Salmonella, Widal'], ['Malaria', 'Plasmodium, Anopheles'], ['Filariasis', 'Wuchereria, Culex']]], ['Immunity', [['Innate', 'barriers'], ['Active', 'vaccine, infection'], ['Passive', 'colostrum, antiserum']]], ['Others', [['AIDS', 'HIV, helper T, ELISA'], ['Cancer', 'no contact inhibition'], ['Drugs', 'opioids, cannabinoids, cocaine']]]],
      ex: [['colostrum', 'IgA passive'], ['elephantiasis', 'Culex']], rem: ['Female Anopheles.', 'H₂L₂.', 'HIV retrovirus.'] }
  });
})();
