/*
TOOL:    class12_chemistry_ch06
FAMILY:  CBSE_REVISION / Class 12 Chemistry (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Unit 6 Haloalkanes and Haloarenes (classification, nomenclature, C–X bond, preparation, physical properties, SN1 and SN2, elimination, reactions of haloarenes, polyhalogen compounds) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 6, part: 'Part II', short: 'Haloalkanes', title: 'Haloalkanes and Haloarenes',
    blurb: 'Classification (by number of halogens, hybridisation of carbon — alkyl, allylic, benzylic, vinylic, aryl); nomenclature; nature of the C–X bond; preparation from alcohols, hydrocarbons, halogen exchange (Finkelstein, Swarts); physical properties; reactions of haloalkanes — nucleophilic substitution (SN1, SN2), stereochemistry (optical activity, inversion, racemisation), elimination (Saytzeff rule), reactions with metals (Grignard, Wurtz); reactions of haloarenes — low reactivity, electrophilic substitution (o/p directing), Wurtz–Fittig and Fittig; polyhalogen compounds (CH₂Cl₂, CHCl₃, CHI₃, CCl₄, freons, DDT) and their environmental effects.',
    revise: {
      oneLine: 'C–X is polar (C δ+), so haloalkanes undergo nucleophilic substitution. SN2: one step, backside attack, inversion of configuration, rate = k[RX][Nu⁻]; reactivity 1° > 2° > 3° (steric). SN1: two steps via carbocation, racemisation, rate = k[RX]; reactivity 3° > 2° > 1° (carbocation stability; also benzylic and allylic are fast). Leaving-group ability I > Br > Cl > F. Strong base/alcoholic KOH gives elimination (Saytzeff: more substituted alkene). Haloarenes are unreactive to nucleophiles (resonance partial double bond, sp² carbon, phenyl cation unstable) unless activated by −NO₂ at o/p positions; halogen is deactivating yet o/p-directing for electrophilic substitution.',
      sections: [
        { h: 'Name reactions', html: '<p>Finkelstein: R–Cl + NaI (acetone) → R–I. Swarts: R–Br + AgF → R–F. Wurtz: 2RX + 2Na → R–R. Wurtz–Fittig: ArX + RX + Na → Ar–R. Fittig: 2ArX + Na → Ar–Ar. Sandmeyer: ArN₂⁺ + CuCl → ArCl.</p>' },
        { h: 'Grignard', html: '<p>RX + Mg (dry ether) → RMgX — very reactive, gives alkanes with water; must be kept dry.</p>' },
        { h: 'Environment', html: '<p>Freons deplete ozone; DDT persists and bioaccumulates; CHCl₃ slowly oxidises to poisonous phosgene in air (stored in dark bottles, filled to the top).</p>' }
      ],
      formulas: [['SN2 rate', 'k[RX][Nu⁻]'], ['SN1 rate', 'k[RX]'], ['SN1 order', '3° > 2° > 1°'], ['SN2 order', '1° > 2° > 3°'], ['Leaving group', 'I⁻ > Br⁻ > Cl⁻ > F⁻']],
      terms: [['Racemic mixture', 'equal d and l — optically inactive'], ['Saytzeff rule', 'more substituted alkene is major'], ['Ambident nucleophile', 'CN⁻ (gives nitrile with KCN, isonitrile with AgCN)']],
      traps: ['KCN gives nitrile; AgCN gives isocyanide.', 'KNO₂ gives alkyl nitrite; AgNO₂ gives nitroalkane.', 'Aqueous KOH substitutes; alcoholic KOH eliminates.'],
      bridge: '<p>Unit 7 converts haloalkanes into alcohols and ethers.</p>'
    },
    explore: [
      { title: 'SN1 or SN2?', intro: 'Choose substrate, nucleophile and solvent.',
        build(el, K) { const S = [['CH₃Br (methyl)', 0], ['CH₃CH₂Br (1°)', 1], ['(CH₃)₂CHBr (2°)', 2], ['(CH₃)₃CBr (3°)', 3], ['C₆H₅CH₂Br (benzylic)', 4], ['C₆H₅Br (aryl)', 5]]; let s = 1, nu = 0, sol = 0; const row = K.row(el); K.select(row, 'substrate', S.map(x => x[0]), i => { s = i; draw(); }).value = 1; K.select(row, 'nucleophile', ['strong (OH⁻, CN⁻)', 'weak (H₂O, ROH)'], i => { nu = i; draw(); }); K.select(row, 'solvent', ['polar aprotic (acetone, DMSO)', 'polar protic (water, alcohol)'], i => { sol = i; draw(); }); const rd = K.read(el);
          function draw() { const t = S[s][1]; let m; if (t === 5) m = '<b>no ordinary substitution</b> — aryl C–X has partial double bond (needs −NO₂ activation or harsh conditions)'; else if (t === 0 || t === 1) m = nu === 0 ? '<b>SN2</b>: one step, backside attack, inversion' : 'very slow — SN2 needs a strong nucleophile; 1° carbocation too unstable for SN1'; else if (t === 3) m = '<b>SN1</b>: carbocation, racemisation (tertiary too crowded for SN2)' + (nu === 0 && sol === 0 ? '; strong base may cause elimination' : ''); else if (t === 4) m = (nu === 1 || sol === 1) ? '<b>SN1</b> (resonance-stabilised benzylic cation)' : '<b>SN2</b> also fast (benzylic)'; else m = (nu === 0 && sol === 0) ? '<b>SN2</b> favoured (strong Nu, aprotic)' : '<b>SN1</b> favoured (weak Nu, protic)'; rd.innerHTML = m; } draw(); return null; } },
      { title: 'Reagent pairs', intro: 'Match the product type.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['substitution product', 'elimination product', 'coupling product'], items: [['RX + aq. KOH → alcohol', 0], ['RX + alc. KOH → alkene', 1], ['RX + KCN → nitrile', 0], ['RX + AgCN → isocyanide', 0], ['2RX + Na → R–R (Wurtz)', 2], ['ArX + RX + Na (Wurtz–Fittig)', 2], ['RX + NaI → RI (Finkelstein)', 0], ['RX + NaOEt, heat → alkene', 1]] }); } }
    ],
    gens: [
      { title: 'Mechanism', gen(R) { return G9.S9.groupQ(R, [['(CH₃)₃CCl + H₂O', 0], ['CH₃Br + OH⁻ in acetone', 1], ['racemisation observed', 0], ['inversion of configuration', 1], ['rate = k[RX]', 0], ['rate = k[RX][Nu⁻]', 1]], ['SN1', 'SN2'], ''); } },
      { title: 'Product', gen(R) { return G9.S9.pickQ(R, [['CH₃CH₂Br + KCN', 'CH₃CH₂CN (propanenitrile)'], ['CH₃CH₂Br + AgCN', 'CH₃CH₂NC (ethyl isocyanide)'], ['CH₃Br + AgF', 'CH₃F (Swarts)'], ['C₆H₅Cl + CH₃Cl + Na', 'toluene (Wurtz–Fittig)'], ['C₂H₅Br + Mg, dry ether', 'C₂H₅MgBr (Grignard)'], ['2-bromobutane + alc. KOH', 'but-2-ene (major, Saytzeff)']], 'Product of '); } },
      { title: 'Reactivity order', gen(R) { return G9.S9.pickQ(R, [['SN1 reactivity: 1°, 2°, 3° halides', '3° > 2° > 1°'], ['SN2 reactivity: 1°, 2°, 3° halides', '1° > 2° > 3°'], ['Leaving group: Cl, Br, I, F', 'I > Br > Cl > F'], ['Boiling points: CH₃Cl, CH₃Br, CH₃I', 'CH₃I > CH₃Br > CH₃Cl']]); } },
      { title: 'Classify', levels: [2, 3], gen(R) { return G9.S9.groupQ(R, [['CH₂=CH–CH₂Cl', 0], ['C₆H₅CH₂Cl', 1], ['CH₂=CHCl', 2], ['C₆H₅Cl', 3], ['(CH₃)₃CCl', 4]], ['allylic', 'benzylic', 'vinylic', 'aryl', 'tertiary alkyl'], 'Type of '); } },
      { title: 'Why', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why is chlorobenzene less reactive than CH₃Cl to nucleophiles?', 'resonance gives C–Cl partial double bond; sp² C; unstable phenyl cation'], ['Why is chloroform stored in dark bottles filled to brim?', 'light/air oxidise it to poisonous phosgene'], ['Why are Grignard reagents prepared in dry ether?', 'they react with water to give alkanes'], ['Why does p-nitrochlorobenzene react faster with OH⁻?', '−NO₂ withdraws electrons and stabilises the intermediate']]); } }
    ],
    quiz: [
      { q: 'SN2 gives', o: ['inversion', 'racemisation', 'retention only', 'elimination'], a: 0, e: 'Backside attack.' }, { q: 'Fastest SN1', o: ['(CH₃)₃CBr', 'CH₃Br', 'CH₃CH₂Br', 'C₆H₅Br'], a: 0, e: '3° cation.' },
      { q: 'Best leaving group', o: ['I⁻', 'F⁻', 'Cl⁻', 'Br⁻'], a: 0, e: 'Weakest base.' }, { q: 'Alcoholic KOH', o: ['elimination', 'substitution', 'oxidation', 'reduction'], a: 0, e: 'Dehydrohalogenation.' },
      { q: 'AgCN gives', o: ['isocyanide', 'nitrile', 'amine', 'acid'], a: 0, e: 'N attacks.' }, { q: 'Finkelstein uses', o: ['NaI in acetone', 'AgF', 'Na', 'Mg'], a: 0, e: 'Halogen exchange.' },
      { q: 'Halogen on benzene is', o: ['o/p directing, deactivating', 'm directing', 'activating', 'no effect'], a: 0, e: 'Resonance vs induction.' }, { q: 'Ozone depletion by', o: ['freons', 'DDT', 'iodoform', 'CH₂Cl₂'], a: 0, e: 'CFCs.' },
      { q: 'Wurtz reaction gives', o: ['alkane', 'alkene', 'alcohol', 'ether'], a: 0, e: 'R–R.' }, { q: 'SN1 rate law', o: ['k[RX]', 'k[RX][Nu]', 'k[Nu]', 'k'], a: 0, e: 'Unimolecular.' },
      { q: 'Saytzeff product', o: ['more substituted alkene', 'less substituted', 'alkyne', 'alcohol'], a: 0, e: 'Stability.' }
    ],
    teach: {
      outcomes: ['Classify and name halo compounds', 'Predict SN1/SN2/elimination outcomes', 'Explain haloarene reactivity and environmental effects'],
      periods: [{ t: 'Haloalkanes', flow: [['10 min', 'C–X polarity.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Mechanism drawings.']] }, { t: 'Reactions and haloarenes', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Name reactions chart.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['All halides react the same way.', 'Halogens activate benzene.'], activities: ['AgNO₃ test for halides (rates).', 'Molecular models for inversion.'],
      exit: ['SN1 vs SN2.', 'KCN vs AgCN.', 'Saytzeff.'], homework: 'Write mechanisms for hydrolysis of tert-butyl bromide and methyl bromide.'
    },
    slides: [{ t: 'Haloalkanes and Haloarenes', b: ['Classification and naming', 'SN1 and SN2', 'Elimination and metals', 'Haloarenes and environment'] }, { t: 'Think and share', b: ['Why is DDT banned?', 'Why is chloroform kept in dark bottles?'] }],
    fs: { groups: [['Mechanisms', [['SN2', '1 step, inversion, 1° fast'], ['SN1', 'carbocation, racemic, 3° fast'], ['E', 'alc. KOH, Saytzeff']]], ['Name reactions', [['Finkelstein', 'NaI/acetone'], ['Swarts', 'AgF'], ['Wurtz(-Fittig)', 'Na coupling']]], ['Haloarenes', [['Low reactivity', 'resonance'], ['Directing', 'o/p, deactivating'], ['Activation', '−NO₂ at o/p']]]],
      ex: [['C₂H₅Br + KCN', 'C₂H₅CN'], ['(CH₃)₃CBr + H₂O', 'SN1 → (CH₃)₃COH']], rem: ['Aq vs alc KOH.', 'Ag salts covalent attack.', 'I best leaving.'] }
  });
})();
