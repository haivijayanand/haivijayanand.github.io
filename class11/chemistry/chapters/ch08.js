/*
TOOL:    class11_chemistry_ch08
FAMILY:  CBSE_REVISION / Class 11 Chemistry (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Unit 8 Organic Chemistry – Some Basic Principles and Techniques (tetravalence, structural representations, classification, IUPAC nomenclature, isomerism, homolytic and heterolytic cleavage, electrophiles nucleophiles, inductive resonance hyperconjugation effects, purification, qualitative and quantitative analysis) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  const PRE = ['meth', 'eth', 'prop', 'but', 'pent', 'hex', 'hept', 'oct', 'non', 'dec'];
  const FG = [['–OH', 'alcohol', '-ol'], ['–CHO', 'aldehyde', '-al'], ['>C=O', 'ketone', '-one'], ['–COOH', 'carboxylic acid', '-oic acid'], ['–COOR', 'ester', '-oate'], ['–NH₂', 'amine', '-amine'], ['–CN', 'nitrile', '-nitrile'], ['–X (Cl, Br)', 'haloalkane', 'halo- prefix']];
  G9.register({
    no: 8, part: 'Part II', short: 'Organic basics', title: 'Organic Chemistry – Some Basic Principles and Techniques',
    blurb: 'Tetravalence and hybridisation of carbon; complete, condensed, bond-line and 3-D formulae; classification of organic compounds; functional groups and homologous series; IUPAC nomenclature; structural isomerism and stereoisomerism; bond fission; carbocations, carbanions, free radicals; electrophiles and nucleophiles; inductive, resonance, electromeric and hyperconjugation effects; purification (crystallisation, distillation, chromatography); qualitative (Lassaigne) and quantitative analysis.',
    revise: {
      oneLine: 'Name by: longest chain containing the functional group → number from the end nearer the highest-priority group → prefixes for substituents in alphabetical order → suffix for the principal group. Heterolytic cleavage gives ions (carbocation + carbanion); homolytic gives free radicals. Carbocation stability 3° > 2° > 1° > methyl (hyperconjugation, +I). Electrophiles seek electrons (H⁺, NO₂⁺, BF₃); nucleophiles donate them (OH⁻, NH₃, CN⁻). –I groups: –NO₂, –CN, –COOH, –F; +I: alkyl groups.',
      sections: [
        { h: 'Isomers', html: `<p>Chain (butane/isobutane), position (propan-1-ol/propan-2-ol), functional (ethanol/methoxymethane), metamerism, geometrical (cis/trans), optical (chiral carbon).</p>` },
        { h: 'Lassaigne test', html: `<p>Sodium fusion converts N, S, halogens to NaCN, Na₂S, NaX. N: Prussian blue; S: violet with nitroprusside; X: AgX precipitate with AgNO₃.</p>` },
        { h: 'Quantitative', html: `<p>% C = 12 × m(CO₂) × 100 / (44 × m); % H = 2 × m(H₂O) × 100 / (18 × m); Dumas/Kjeldahl for N; Carius for halogens and S.</p>` }
      ],
      formulas: [['Carbocation stability', '3° > 2° > 1° > CH₃⁺'], ['%C', '12 m_CO₂ ×100 / (44 m)'], ['%H', '2 m_H₂O ×100 / (18 m)'], ['Hybrid', 'sp³ 109.5°, sp² 120°, sp 180°'], ['Naming order', 'chain → number → prefixes → suffix']],
      terms: [['Electrophile', 'electron-seeking species'], ['Nucleophile', 'nucleus-seeking, electron-pair donor'], ['Hyperconjugation', 'σ C–H electrons delocalise into adjacent empty p orbital/π']],
      traps: ['Choose the chain containing the functional group, even if not the longest.', 'Inductive effect weakens rapidly with distance.', 'Free radicals are neutral.'],
      bridge: '<p>Unit 9 applies these ideas to hydrocarbons.</p>'
    },
    explore: [
      { title: 'IUPAC name builder', intro: 'Choose chain length and functional group (on C-1; a ketone sits on C-2).',
        build(el, K) { let n = 3, k = 0; const row = K.row(el); K.slider(row, 'carbons', 1, 10, 1, n, v => { n = v; draw(); }); K.select(row, 'group', FG.map(g => g[1]), i => { k = i; draw(); }); const rd = K.read(el);
          function draw() { const p = PRE[n - 1]; const g = FG[k]; let nm; if (k === 2 && n < 3) { rd.innerHTML = 'A ketone needs at least 3 carbons.'; return; } if (k === 0) nm = p + (n > 2 ? 'an-1-ol' : 'anol'); else if (k === 1) nm = p + 'anal'; else if (k === 2) nm = p + 'an-2-one'.replace(/^(prop|but)an-2-one$/, '$1anone'); else if (k === 3) nm = p + 'anoic acid'; else if (k === 4) nm = 'methyl ' + p + 'anoate'; else if (k === 5) nm = p + 'anamine'; else if (k === 6) nm = p + 'anenitrile'; else nm = (n > 2 ? '1-' : '') + 'chloro' + p + 'ane'; if (k === 2) nm = n <= 4 ? p + 'anone' : p + 'an-2-one'; rd.innerHTML = `${n}-carbon chain with ${g[0]} (${g[1]}, ${g[2]}) → <b>${nm}</b>`; } draw(); return null; } },
      { title: 'Carbocation stability', intro: '<kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Methyl CH₃⁺', 'No alkyl groups to donate — least stable.'], ['Primary CH₃CH₂⁺', 'One alkyl group: +I and 3 hyperconjugative C–H.'], ['Secondary (CH₃)₂CH⁺', 'Two alkyl groups: 6 hyperconjugative C–H.'], ['Tertiary (CH₃)₃C⁺', 'Three alkyl groups: 9 hyperconjugative C–H — most stable.'], ['Also', 'Resonance (allyl, benzyl cations) adds extra stability.']] }); } }
    ],
    gens: [
      { title: 'Functional group', gen(R) { const g = R.pick(FG); return { q: `Class and suffix for ${g[0]}?`, a: `${g[1]}, ${g[2]}` }; } },
      { title: 'Electrophile or nucleophile', gen(R) { return G9.S9.groupQ(R, [['H⁺', 0], ['OH⁻', 1], ['NO₂⁺', 0], ['NH₃', 1], ['BF₃', 0], ['CN⁻', 1], ['AlCl₃', 0], ['H₂O', 1]], ['electrophile', 'nucleophile'], 'Classify: '); } },
      { title: 'Percent C and H', levels: [2, 3], gen(R) { const m = R.pick([0.2, 0.25, 0.3]), co2 = R.pick([0.44, 0.66, 0.88]), h2o = R.pick([0.18, 0.27, 0.36]); return { q: `${m} g of compound gave ${co2} g CO₂ and ${h2o} g H₂O. %C and %H?`, a: `C ${f(12 * co2 * 100 / (44 * m))}%, H ${f(2 * h2o * 100 / (18 * m))}%`, ans: 12 * co2 * 100 / (44 * m), tol: 0.01 }; } },
      { title: 'Isomer type', gen(R) { return G9.S9.groupQ(R, [['butane / 2-methylpropane', 0], ['propan-1-ol / propan-2-ol', 1], ['ethanol / methoxymethane', 2], ['cis-/trans-but-2-ene', 3]], ['chain', 'position', 'functional group', 'geometrical'], 'Isomerism: '); } },
      { title: 'Effects', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Which is more acidic: CH₃COOH or ClCH₂COOH?', 'ClCH₂COOH (–I of Cl)'], ['Why is tertiary carbocation most stable?', '+I and hyperconjugation from three alkyl groups'], ['Homolytic cleavage gives?', 'free radicals'], ['Name a –I group.', '–NO₂, –CN, –COOH, halogens']]); } }
    ],
    quiz: [
      { q: 'Most stable carbocation', o: ['tertiary', 'primary', 'secondary', 'methyl'], a: 0, e: 'Hyperconjugation.' }, { q: 'Nucleophile', o: ['OH⁻', 'H⁺', 'BF₃', 'NO₂⁺'], a: 0, e: 'Donor.' },
      { q: 'Suffix -al', o: ['aldehyde', 'alcohol', 'ketone', 'acid'], a: 0, e: '–CHO.' }, { q: 'Homolysis gives', o: ['free radicals', 'ions', 'carbenes only', 'nothing'], a: 0, e: 'Even split.' },
      { q: 'Ethanol and methoxymethane', o: ['functional isomers', 'chain', 'position', 'same'], a: 0, e: 'C₂H₆O.' }, { q: 'Lassaigne N test colour', o: ['Prussian blue', 'violet', 'white ppt', 'yellow'], a: 0, e: 'Fe₄[Fe(CN)₆]₃.' },
      { q: '+I group', o: ['–CH₃', '–NO₂', '–Cl', '–CN'], a: 0, e: 'Alkyl.' }, { q: 'sp² angle', o: ['120°', '109.5°', '180°', '90°'], a: 0, e: 'Trigonal.' },
      { q: 'CH₃CH₂CH₂OH name', o: ['propan-1-ol', 'propanol-2', 'propanal', 'propanone'], a: 0, e: 'C1.' }, { q: 'Chromatography separates by', o: ['differential adsorption', 'boiling', 'magnetism', 'density only'], a: 0, e: 'Phases.' },
      { q: 'Electrophile', o: ['NO₂⁺', 'NH₃', 'CN⁻', 'H₂O'], a: 0, e: 'Seeks e⁻.' }
    ],
    teach: {
      outcomes: ['Name simple organic compounds', 'Classify reagents and intermediates', 'Use electronic effects and analysis methods'],
      periods: [{ t: 'Nomenclature', flow: [['10 min', 'Models of isomers.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Naming drill.']] }, { t: 'Mechanism basics', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Inductive/resonance examples.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Longest chain always.', 'Radicals are charged.'], activities: ['Ball-and-stick isomers.', 'Paper chromatography of ink.'],
      exit: ['Name 3 compounds.', 'Carbocation order.', 'E⁺ vs Nu⁻.'], homework: 'Draw and name all isomers of C₄H₁₀O.'
    },
    slides: [{ t: 'Organic Chemistry: Basic Principles', b: ['Representations and nomenclature', 'Isomerism', 'Reaction intermediates', 'Electronic effects and analysis'] }, { t: 'Think and share', b: ['Why is chloroacetic acid stronger?', 'Why tertiary carbocations?'] }],
    fs: { groups: [['Naming', [['Chain', 'with functional group'], ['Number', 'lowest to principal group'], ['Suffix', '-ol -al -one -oic acid']]], ['Intermediates', [['Cleavage', 'homo → radicals, hetero → ions'], ['Carbocation', '3° > 2° > 1°'], ['Reagents', 'E⁺ seek e⁻, Nu⁻ give e⁻']]], ['Effects & analysis', [['+I', 'alkyl'], ['−I', 'NO₂, CN, X'], ['Lassaigne', 'N, S, X tests'], ['%C', '12·m(CO₂)/44']]]],
      ex: [['0.2 g → 0.44 g CO₂', 'C 60%'], ['CH₃CH₂CHO', 'propanal']], rem: ['Principal group decides suffix.', 'Hyperconjugation counts.', 'E⁺ meets Nu⁻.'] }
  });
})();
