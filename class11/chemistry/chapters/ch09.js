/*
TOOL:    class11_chemistry_ch09
FAMILY:  CBSE_REVISION / Class 11 Chemistry (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Unit 9 Hydrocarbons (alkanes, alkenes, alkynes: nomenclature, isomerism, preparation, properties; conformations; Markovnikov and peroxide effect; acidity of alkynes; benzene and aromaticity, Hückel rule, electrophilic substitution, directive influence, carcinogenicity) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 9, part: 'Part II', short: 'Hydrocarbons', title: 'Hydrocarbons',
    blurb: 'Classification; alkanes — preparation (hydrogenation, Wurtz, decarboxylation), free-radical halogenation, combustion, conformations of ethane; alkenes — geometrical isomerism, preparation, addition reactions, Markovnikov’s rule and peroxide (Kharasch) effect, ozonolysis, polymerisation; alkynes — preparation, acidic nature, addition; aromatic hydrocarbons — structure and resonance of benzene, Hückel (4n + 2) rule, electrophilic substitution (nitration, halogenation, sulphonation, Friedel–Crafts), directing groups; carcinogenicity of polynuclear hydrocarbons.',
    revise: {
      oneLine: 'Alkanes undergo free-radical substitution; alkenes and alkynes undergo electrophilic addition. Markovnikov: in HX addition to an unsymmetrical alkene, H goes to the carbon with more H (via the more stable carbocation); with HBr in peroxide the anti-Markovnikov product forms. Terminal alkynes are weakly acidic (sp C–H): react with Na or sodium amide. Benzene is aromatic (planar, cyclic, 6 π electrons = 4n + 2) and prefers substitution over addition. –OH, –NH₂, –CH₃ are ortho/para directing (activating); –NO₂, –CHO, –COOH are meta directing (deactivating); halogens are o/p directing but deactivating.',
      sections: [
        { h: 'Conformations', html: `<p>Ethane: staggered (more stable, lower torsional strain) and eclipsed; rotation barrier ~12.5 kJ/mol.</p>` },
        { h: 'Ozonolysis', html: `<p>Alkene + O₃, then Zn/H₂O → carbonyl compounds; locates the double bond (but-2-ene → 2 ethanal).</p>` },
        { h: 'Electrophilic substitution', html: `<p>Nitration: conc. HNO₃ + H₂SO₄ → NO₂⁺. Friedel–Crafts alkylation: RCl + AlCl₃. Mechanism: electrophile attack → arenium ion (σ complex) → loss of H⁺.</p>` }
      ],
      formulas: [['Alkane', 'CₙH₂ₙ₊₂'], ['Alkene', 'CₙH₂ₙ'], ['Alkyne', 'CₙH₂ₙ₋₂'], ['Hückel', '(4n + 2) π electrons'], ['Markovnikov', 'H to C with more H'], ['Peroxide effect', 'HBr only, anti-Markovnikov']],
      terms: [['Aromaticity', 'extra stability of planar cyclic conjugated (4n+2)π systems'], ['Conformation', 'arrangement from rotation about a single bond'], ['Ozonolysis', 'cleavage of C=C by ozone']],
      traps: ['Peroxide effect works only with HBr.', 'Halogens deactivate but direct o/p.', 'Benzene resists addition despite double bonds.'],
      bridge: '<p>Class 12: haloalkanes, alcohols, carbonyls build on these reactions.</p>'
    },
    explore: [
      { title: 'Addition to propene', intro: 'Choose the reagent; see the major product.',
        build(el, K) { const RG = [['HBr', '2-bromopropane (Markovnikov: via 2° carbocation)'], ['HBr + peroxide', '1-bromopropane (anti-Markovnikov, free-radical)'], ['HCl + peroxide', '2-chloropropane (no peroxide effect for HCl)'], ['H₂O / H⁺', 'propan-2-ol'], ['Br₂ in CCl₄', '1,2-dibromopropane (decolourises bromine — test for unsaturation)'], ['H₂ / Ni', 'propane'], ['O₃ then Zn/H₂O', 'ethanal + methanal']]; let k = 0; const row = K.row(el); const sel = K.select(row, 'reagent', RG.map(r => r[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { rd.innerHTML = `CH₃–CH=CH₂ + <b>${RG[k][0]}</b> → <b>${RG[k][1]}</b>`; } const step = () => { k = (k + 1) % RG.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Directing groups', intro: 'Sort substituents on benzene.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['ortho/para, activating', 'ortho/para, deactivating', 'meta, deactivating'], items: [['–OH', 0], ['–NH₂', 0], ['–CH₃', 0], ['–Cl', 1, 'halogens: −I outweighs +R for rate'], ['–Br', 1], ['–NO₂', 2], ['–CHO', 2], ['–COOH', 2], ['–CN', 2]] }); } }
    ],
    gens: [
      { title: 'Markovnikov', gen(R) { return G9.S9.pickQ(R, [['Propene + HBr major product?', '2-bromopropane'], ['Propene + HBr (peroxide)?', '1-bromopropane'], ['But-1-ene + HCl?', '2-chlorobutane'], ['2-methylpropene + HBr?', '2-bromo-2-methylpropane']]); } },
      { title: 'Aromatic?', gen(R) { return G9.S9.groupQ(R, [['benzene (6π)', 0], ['cyclooctatetraene (8π, non-planar)', 1], ['naphthalene (10π)', 0], ['cyclobutadiene (4π)', 1], ['pyridine (6π)', 0]], ['aromatic', 'not aromatic'], 'Aromatic? '); } },
      { title: 'Ozonolysis', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Ozonolysis of but-2-ene gives?', 'two ethanal'], ['Ozonolysis of propene gives?', 'ethanal + methanal'], ['Ozonolysis of 2-methylpropene gives?', 'propanone + methanal'], ['Ozonolysis of ethene gives?', 'two methanal']]); } },
      { title: 'Reagents', gen(R) { return G9.S9.pickQ(R, [['Electrophile in nitration?', 'NO₂⁺ (nitronium ion)'], ['Catalyst in Friedel–Crafts?', 'anhydrous AlCl₃'], ['Wurtz reaction makes?', 'higher alkanes (R–R from RX + Na in dry ether)'], ['Test for unsaturation?', 'decolourises bromine water / Baeyer’s reagent'], ['Why is ethyne acidic?', 'sp carbon (50% s-character) holds electrons tightly']]); } },
      { title: 'Formula', gen(R) { const n = R.int(2, 8), k = R.int(0, 2); const H = k === 0 ? 2 * n + 2 : k === 1 ? 2 * n : 2 * n - 2; return { q: `Molecular formula of the ${['alkane', 'alkene', 'alkyne'][k]} with ${n} carbons, and its molar mass?`, a: `C${n}H${H}, ${12 * n + H} g/mol`, ans: 12 * n + H }; } }
    ],
    quiz: [
      { q: 'Propene + HBr', o: ['2-bromopropane', '1-bromopropane', 'propane', 'propanol'], a: 0, e: 'Markovnikov.' }, { q: 'Peroxide effect with', o: ['HBr only', 'HCl', 'HI', 'all HX'], a: 0, e: 'Kharasch.' },
      { q: 'Hückel rule', o: ['4n + 2 π e⁻', '4n π e⁻', '2n', 'n²'], a: 0, e: 'Aromatic.' }, { q: 'Meta director', o: ['–NO₂', '–OH', '–CH₃', '–Cl'], a: 0, e: 'Deactivating.' },
      { q: 'More stable ethane conformation', o: ['staggered', 'eclipsed', 'both same', 'none'], a: 0, e: 'Less strain.' }, { q: 'Alkanes react by', o: ['free-radical substitution', 'electrophilic addition', 'nucleophilic addition', 'none'], a: 0, e: 'Halogenation.' },
      { q: 'Terminal alkyne with sodium amide', o: ['forms acetylide', 'no reaction', 'explodes', 'hydrogenates'], a: 0, e: 'Acidic H.' }, { q: 'Nitration electrophile', o: ['NO₂⁺', 'NO₃⁻', 'HNO₃', 'H₂SO₄'], a: 0, e: 'Nitronium.' },
      { q: 'Benzene prefers', o: ['substitution', 'addition', 'elimination', 'polymerisation'], a: 0, e: 'Keeps aromaticity.' }, { q: 'Halogens on benzene', o: ['o/p but deactivating', 'meta', 'o/p activating', 'no effect'], a: 0, e: 'Special.' },
      { q: 'Alkyne formula', o: ['CₙH₂ₙ₋₂', 'CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙHₙ'], a: 0, e: 'Triple.' }
    ],
    teach: {
      outcomes: ['Predict products of alkane, alkene, alkyne reactions', 'Apply Markovnikov and peroxide rules', 'Explain aromaticity and directing effects'],
      periods: [{ t: 'Aliphatic', flow: [['10 min', 'Bromine water test video.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Ozonolysis puzzles.']] }, { t: 'Aromatic', flow: [['15 min', 'Benzene resonance.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Peroxide works with all HX.', 'Benzene behaves like an alkene.'], activities: ['Model conformations.', 'Reaction map poster.'],
      exit: ['Markovnikov product.', 'Hückel test.', 'Director of –NO₂.'], homework: 'Make a reaction flow chart linking alkanes, alkenes, alkynes and benzene.'
    },
    slides: [{ t: 'Hydrocarbons', b: ['Alkanes', 'Alkenes and Markovnikov', 'Alkynes', 'Benzene and aromaticity'] }, { t: 'Think and share', b: ['Why doesn’t HCl show peroxide effect?', 'Why is benzene unusually stable?'] }],
    fs: { groups: [['Aliphatic', [['Alkanes', 'free-radical substitution'], ['Alkenes', 'electrophilic addition'], ['Alkynes', 'addition; acidic ≡C–H']]], ['Rules', [['Markovnikov', 'H to C with more H'], ['Peroxide', 'HBr only'], ['Ozonolysis', 'C=C → 2 C=O']]], ['Aromatic', [['Hückel', '4n + 2'], ['o/p', '–OH, –NH₂, –CH₃, –X'], ['meta', '–NO₂, –CHO, –COOH']]]],
      ex: [['propene + HBr', '2-bromopropane'], ['but-2-ene + O₃', '2 CH₃CHO']], rem: ['Carbocation decides.', 'Aromatic → substitution.', 'Know directors.'] }
  });
})();
