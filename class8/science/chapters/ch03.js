/*
TOOL:    class8_science_ch03
FAMILY:  CBSE_REVISION / Class 8 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 3 Health: The Ultimate Treasure (physical mental social health, communicable and non-communicable diseases, immunity, vaccination, antibiotics misuse, lifestyle) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 3, part: 'All chapters', short: 'Health', title: 'Health: The Ultimate Treasure',
    blurb: 'Health as physical, mental and social well-being; communicable diseases and how they spread; non-communicable diseases and lifestyle; the body’s defences and immunity; vaccination; wise use of antibiotics; and community health.',
    revise: {
      oneLine: 'Health means physical, mental and social well-being, not just absence of disease. Communicable diseases spread from person to person through air, water, food, contact or vectors; non-communicable ones (diabetes, heart disease) relate to lifestyle and genes. Skin, mucus, white blood cells and antibodies defend us; vaccines train immunity. Antibiotics act only on bacteria and must be taken fully as prescribed.',
      sections: [
        { h: 'Spread', html: `<p>Air: TB, flu. Water/food: cholera, typhoid. Vectors: mosquitoes (malaria, dengue). Contact: some skin infections.</p>` },
        { h: 'Immunity and vaccines', html: `<p>A vaccine contains weakened/killed germs or parts; the body makes antibodies and remembers. Edward Jenner’s smallpox vaccine; India’s polio-free certification (2014).</p>` },
        { h: 'Healthy lifestyle', html: `<p>Balanced diet, exercise, sleep, clean surroundings, avoiding tobacco and alcohol, managing stress, talking to others.</p>` }
      ],
      formulas: [['Health', 'physical + mental + social'], ['Communicable', 'spreads person to person'], ['Non-communicable', 'not infectious'], ['Vaccine', 'trains immunity'], ['Antibiotics', 'bacteria only']],
      terms: [['Pathogen', 'disease-causing microbe'], ['Vector', 'carrier of pathogens, e.g., mosquito'], ['Immunity', 'body’s ability to resist disease']],
      traps: ['Stopping antibiotics early helps resistant bacteria survive.', 'Non-communicable does not mean not serious.', 'Vaccines prevent; they do not cure an existing infection.'],
      bridge: '<p>Class 9 has “Why Do We Fall Ill?” concepts in more depth.</p>'
    },
    explore: [
      { title: 'How does it spread?', intro: 'Choose a disease; see how it spreads and how to prevent it. <kbd>S</kbd> steps.',
        build(el, K) { const D = [['common cold / flu', 'air droplets', 'cover coughs, wash hands, masks when ill'], ['tuberculosis', 'air', 'BCG vaccine, early treatment, ventilation'], ['cholera', 'contaminated water/food', 'safe drinking water, sanitation'], ['typhoid', 'contaminated water/food', 'boiled water, hygiene, vaccine'], ['malaria', 'female Anopheles mosquito', 'nets, no stagnant water'], ['dengue', 'Aedes mosquito', 'empty water containers, repellents'], ['diabetes (type 2)', 'not infectious — lifestyle, genes', 'healthy food, exercise, check-ups']]; let k = 0; const row = K.row(el); const sel = K.select(row, 'disease', D.map(d => d[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { const d = D[k]; rd.innerHTML = `<b>${d[0]}</b> · spreads by: <b>${d[1]}</b> · prevention: ${d[2]}`; } const step = () => { k = (k + 1) % D.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Herd protection', intro: 'Change vaccination coverage; see how many get infected in a model town of 100 (simple SIR “final size” model, illustration only).',
        build(el, K) { let v = 40; const row = K.row(el); K.slider(row, 'vaccinated (%)', 0, 95, 5, v, x => { v = x; b.redraw(); }); const b = new K.Board(el, { xmin: -0.5, xmax: 20, ymin: -0.5, ymax: 5.5, axes: false, grid: 0, aspect: 0.28 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const R0 = 3, pS = 1 - v / 100; const reff = R0 * pS; let total; if (reff <= 1) total = Math.round(Math.min(1 / (1 - Math.min(reff, 0.95)), 100 * pS)); else { let z = 0.5; for (let it = 0; it < 200; it++) z = 1 - Math.exp(-reff * z); total = Math.max(1, Math.round(z * 100 * pS)); } const nv = Math.round(v); let i = 0; for (let r = 0; r < 5; r++) for (let c = 0; c < 20; c++, i++) { const col = i < nv ? C.blue : i < nv + total ? C.orange : '#cbd5e1'; b.dot(c, 5 - r - 0.5, { r: 6, color: col }); }
            rd.innerHTML = `<span style="color:${C.blue}">●</span> vaccinated ${nv} · <span style="color:${C.orange}">●</span> infected ≈ ${total} · each case would infect ${R0} unprotected people → effective spread ${reff.toFixed(2)} per case ${reff < 1 ? '— <b>outbreak dies out</b>' : '— <b>outbreak grows</b>'}`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Communicable?', gen(R) { return G9.S9.groupQ(R, [['tuberculosis', 0], ['diabetes', 1], ['malaria', 0], ['high blood pressure', 1], ['cholera', 0], ['heart disease', 1]], ['communicable', 'non-communicable'], 'Communicable or non-communicable: '); } },
      { title: 'Spread by', gen(R) { return G9.S9.groupQ(R, [['flu', 0], ['cholera', 1], ['dengue', 2], ['typhoid', 1], ['TB', 0], ['malaria', 2]], ['air', 'water/food', 'mosquito'], 'Main route of '); } },
      { title: 'Antibiotics and vaccines', gen(R) { return G9.S9.pickQ(R, [['Why finish the full antibiotic course?', 'to kill all bacteria and avoid resistance'], ['Do antibiotics cure viral fever?', 'no'], ['How does a vaccine work?', 'trains the body to make antibodies and remember'], ['Who made the first smallpox vaccine?', 'Edward Jenner']]); } },
      { title: 'Spread model', levels: [2, 3], gen(R) { const r = R.int(2, 4), g = R.int(3, 5); return { q: `Each infected person infects ${r} others per round. Starting with 1 case, how many new cases in round ${g}?`, a: String(r ** g), ans: r ** g }; } },
      { title: 'Healthy habits', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Three parts of health?', 'physical, mental, social'], ['Two lifestyle steps against heart disease?', 'exercise, less salt and fried food, no tobacco'], ['Why remove stagnant water?', 'stops mosquito breeding'], ['Name one body defence.', 'skin, mucus, white blood cells, antibodies']]); } }
    ],
    quiz: [
      { q: 'Health includes', o: ['physical, mental, social', 'only physical', 'only no disease', 'only fitness'], a: 0, e: 'WHO.' }, { q: 'Malaria vector', o: ['Anopheles mosquito', 'housefly', 'rat', 'dog'], a: 0, e: 'Mosquito.' },
      { q: 'Non-communicable', o: ['diabetes', 'TB', 'flu', 'cholera'], a: 0, e: 'Lifestyle.' }, { q: 'Antibiotics kill', o: ['bacteria', 'viruses', 'all diseases', 'mosquitoes'], a: 0, e: 'Bacteria.' },
      { q: 'Vaccines', o: ['prevent disease', 'cure all', 'are antibiotics', 'are vitamins'], a: 0, e: 'Prevent.' }, { q: 'Cholera spreads by', o: ['contaminated water', 'air', 'mosquito', 'touching'], a: 0, e: 'Water.' },
      { q: 'Smallpox vaccine', o: ['Edward Jenner', 'Newton', 'Darwin', 'Hooke'], a: 0, e: 'Jenner.' }, { q: 'Antibodies made by', o: ['white blood cells', 'red cells', 'bones', 'skin only'], a: 0, e: 'WBC.' },
      { q: 'Stop antibiotics early', o: ['resistance risk', 'better', 'no effect', 'vaccine'], a: 0, e: 'Resistance.' }, { q: 'Dengue mosquito', o: ['Aedes', 'Anopheles', 'Culex only', 'housefly'], a: 0, e: 'Aedes.' },
      { q: 'India polio-free in', o: ['2014', '1947', '2000', '2024'], a: 0, e: 'WHO certified.' }
    ],
    teach: {
      outcomes: ['Define health broadly', 'Explain disease spread and prevention', 'Explain vaccines and antibiotic use'],
      periods: [{ t: 'Disease', flow: [['10 min', 'Discuss health dimensions.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Glitter handshake germ demo.']] }, { t: 'Immunity', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Vaccination card study.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Antibiotics for every fever.', 'Health = no illness.'], activities: ['Handwashing glitter test.', 'Mosquito-source audit.'],
      exit: ['Two routes of spread.', 'How vaccines work.', 'Antibiotic rule.'], homework: 'Check your vaccination card and list vaccines taken (with family help).'
    },
    slides: [{ t: 'Health: The Ultimate Treasure', b: ['Dimensions of health', 'Communicable diseases', 'Immunity and vaccines', 'Healthy lifestyle'] }, { t: 'Think and share', b: ['Why finish antibiotics?', 'How does herd protection work?'] }],
    fs: { groups: [['Health', [['Dimensions', 'physical, mental, social'], ['Lifestyle', 'food, exercise, sleep']]], ['Diseases', [['Air', 'flu, TB'], ['Water/food', 'cholera, typhoid'], ['Mosquito', 'malaria, dengue'], ['Non-communicable', 'diabetes, heart disease']]], ['Defence', [['Vaccine', 'trains immunity'], ['Antibiotic', 'bacteria only, full course']]]],
      ex: [['3 per round, round 4', '81 cases'], ['Flu', 'airborne virus']], rem: ['Prevent first.', 'Vaccinate.', 'Use antibiotics wisely.'] }
  });
})();
