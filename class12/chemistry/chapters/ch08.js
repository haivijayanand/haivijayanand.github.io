/*
TOOL:    class12_chemistry_ch08
FAMILY:  CBSE_REVISION / Class 12 Chemistry (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Unit 8 Aldehydes, Ketones and Carboxylic Acids (nomenclature, preparation, properties, nucleophilic addition, name reactions, tests, acidity of carboxylic acids) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 8, part: 'Part II', short: 'Carbonyls & acids', title: 'Aldehydes, Ketones and Carboxylic Acids',
    blurb: 'Nomenclature and structure of the carbonyl group; preparation of aldehydes and ketones (oxidation of alcohols, Rosenmund reduction, Stephen reaction, Etard reaction, Friedel–Crafts acylation); physical properties; nucleophilic addition (HCN, NaHSO₃, Grignard, alcohols, ammonia derivatives); reduction (Clemmensen, Wolff–Kishner); oxidation and tests (Tollens’, Fehling’s, iodoform); reactions due to α-hydrogen (aldol condensation), Cannizzaro reaction; carboxylic acids — preparation, acidity and effect of substituents, reactions (HVZ, decarboxylation), uses.',
    revise: {
      oneLine: 'The polar C=O makes carbon electrophilic, so aldehydes and ketones undergo nucleophilic addition; aldehydes react faster than ketones (less steric hindrance, less electron donation). Aldehydes are easily oxidised: Tollens’ (silver mirror) and Fehling’s (red Cu₂O, aliphatic aldehydes) distinguish them from ketones. Methyl ketones and ethanal give the iodoform test. With α-H: aldol condensation (dilute NaOH); without α-H (HCHO, C₆H₅CHO): Cannizzaro (conc. NaOH → alcohol + acid salt). Clemmensen (Zn-Hg/HCl) and Wolff–Kishner (NH₂NH₂/KOH) reduce C=O to CH₂. Carboxylic acids are stronger acids than phenols and alcohols (carboxylate resonance); electron-withdrawing groups raise acidity (Cl₃CCOOH ≫ CH₃COOH); HVZ gives α-halo acids.',
      sections: [
        { h: 'Name reactions', html: '<p>Rosenmund: RCOCl + H₂ (Pd/BaSO₄) → RCHO. Stephen: RCN + SnCl₂/HCl, H₃O⁺ → RCHO. Etard: toluene + CrO₂Cl₂ → benzaldehyde. Gattermann–Koch: benzene + CO/HCl → benzaldehyde.</p>' },
        { h: 'Ammonia derivatives', html: '<p>With hydroxylamine → oxime; hydrazine → hydrazone; 2,4-DNP → orange/yellow 2,4-DNP derivative (test for C=O); semicarbazide → semicarbazone.</p>' },
        { h: 'Acid derivatives', html: '<p>Acid + PCl₅ → acid chloride; + alcohol/H⁺ → ester; + NH₃, heat → amide; soda-lime decarboxylation → alkane (one carbon less).</p>' }
      ],
      formulas: [['Reactivity', 'HCHO > RCHO > RCOR'], ['Tollens', 'RCHO → RCOO⁻ + Ag mirror'], ['Iodoform', 'CH₃CO– → CHI₃ (yellow)'], ['Acidity', 'Cl₃CCOOH > Cl₂CHCOOH > ClCH₂COOH > CH₃COOH']],
      terms: [['Aldol', 'β-hydroxy aldehyde/ketone from α-H carbonyls'], ['Cannizzaro', 'disproportionation of non-enolisable aldehydes'], ['HVZ', 'α-halogenation of acids with X₂/red P']],
      traps: ['Benzaldehyde gives Tollens’ but not Fehling’s.', 'Formaldehyde has no α-H → Cannizzaro, not aldol.', 'Ethanol also gives iodoform (oxidised to ethanal).'],
      bridge: '<p>Unit 9 covers nitrogen compounds — amines.</p>'
    },
    explore: [
      { title: 'Test bench', intro: 'Pick a compound and see results of classic tests.',
        build(el, K) { const T = [['methanal HCHO', 1, 1, 0, 0, 1], ['ethanal CH₃CHO', 1, 1, 1, 1, 0], ['propanone CH₃COCH₃', 0, 0, 1, 1, 0], ['benzaldehyde C₆H₅CHO', 1, 0, 0, 0, 1], ['acetophenone C₆H₅COCH₃', 0, 0, 1, 0, 0], ['pentan-3-one', 0, 0, 0, 1, 0], ['ethanoic acid', 0, 0, 0, 0, 0]]; let k = 1; const row = K.row(el); K.select(row, 'compound', T.map(t => t[0]), i => { k = i; draw(); }).value = 1; const rd = K.read(el); const yn = (v, y, n) => v ? `<b>${y}</b>` : n;
          function draw() { const [n, tol, feh, iod, ald, can] = T[k]; const dnp = k < 6; rd.innerHTML = `${n}<br>2,4-DNP: ${yn(dnp, 'orange ppt (C=O)', 'no ppt')} · Tollens’: ${yn(tol, 'silver mirror', 'no mirror')} · Fehling’s: ${yn(feh, 'red Cu₂O', 'no change')} · iodoform: ${yn(iod, 'yellow CHI₃', 'negative')} · has α-H: ${yn(ald, 'yes → aldol', 'no')} · Cannizzaro: ${yn(can, 'yes (no α-H)', 'no')}${k === 6 ? ' · NaHCO₃: <b>brisk CO₂</b> (carboxylic acid)' : ''}`; } draw(); return null; } },
      { title: 'Acid strength', intro: 'Choose an acid; compare pKa.',
        build(el, K) { const A = [['CH₃COOH', 4.76], ['HCOOH', 3.75], ['ClCH₂COOH', 2.86], ['Cl₂CHCOOH', 1.29], ['Cl₃CCOOH', 0.65], ['FCH₂COOH', 2.59], ['C₆H₅COOH', 4.19], ['p-NO₂C₆H₄COOH', 3.41], ['CH₃CH₂COOH', 4.87]]; let k = 0; const row = K.row(el); K.select(row, 'acid', A.map(a => a[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { const Ka = 10 ** -A[k][1]; rd.innerHTML = `${A[k][0]}: pKa = <b>${A[k][1]}</b> · Ka = ${Ka.toExponential(2)} · ${f(Ka / 10 ** -4.76)}× acetic acid · ${A[k][1] < 4.76 ? 'electron-withdrawing group stabilises carboxylate' : A[k][1] > 4.76 ? 'electron-donating alkyl destabilises carboxylate' : 'reference'}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Name reaction', gen(R) { return G9.S9.pickQ(R, [['RCOCl + H₂, Pd/BaSO₄', 'Rosenmund reduction → RCHO'], ['C=O + Zn-Hg/conc. HCl', 'Clemmensen → CH₂'], ['C=O + NH₂NH₂, KOH, glycol', 'Wolff–Kishner → CH₂'], ['2 HCHO + conc. NaOH', 'Cannizzaro → CH₃OH + HCOONa'], ['2 CH₃CHO + dil. NaOH', 'aldol → 3-hydroxybutanal'], ['CH₃COOH + Cl₂/red P', 'HVZ → ClCH₂COOH'], ['toluene + CrO₂Cl₂', 'Etard → benzaldehyde']], 'Identify: '); } },
      { title: 'Test', gen(R) { return G9.S9.pickQ(R, [['ethanal vs propanone', 'Tollens’ or Fehling’s (ethanal positive)'], ['benzaldehyde vs ethanal', 'Fehling’s (only ethanal)'], ['propanone vs pentan-3-one', 'iodoform (propanone positive)'], ['phenol vs benzoic acid', 'NaHCO₃ — CO₂ with acid'], ['acetophenone vs benzophenone', 'iodoform (acetophenone positive)']], 'Distinguish '); } },
      { title: 'Acidity', gen(R) { return G9.S9.pickQ(R, [['CH₃COOH, ClCH₂COOH, Cl₃CCOOH', 'Cl₃CCOOH > ClCH₂COOH > CH₃COOH'], ['HCOOH, CH₃COOH, CH₃CH₂COOH', 'HCOOH > CH₃COOH > CH₃CH₂COOH'], ['FCH₂COOH, ClCH₂COOH, BrCH₂COOH', 'F > Cl > Br substituted'], ['phenol, ethanol, acetic acid', 'acetic acid > phenol > ethanol']], 'Decreasing acidity: '); } },
      { title: 'Ka', levels: [2, 3], gen(R) { const p = R.pick([4.76, 2.86, 0.65, 4.19]); return { q: `Ka of an acid with pKa = ${p}?`, a: (10 ** -p).toExponential(2), ans: 10 ** -p, tol: 10 ** -p * 1e-3 }; } },
      { title: 'Reactivity', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Order towards HCN: HCHO, CH₃CHO, CH₃COCH₃', 'HCHO > CH₃CHO > CH₃COCH₃'], ['Why are aldehydes more reactive than ketones?', 'less steric hindrance and fewer electron-donating alkyl groups'], ['Why does benzaldehyde not undergo aldol?', 'no α-hydrogen'], ['Why is carboxylic acid stronger than phenol?', 'carboxylate negative charge on two equivalent O atoms']]); } }
    ],
    quiz: [
      { q: 'Silver mirror', o: ['Tollens’', 'Fehling’s', 'iodoform', 'Lucas'], a: 0, e: 'Ag⁺ reduced.' }, { q: 'Iodoform positive', o: ['propanone', 'pentan-3-one', 'benzaldehyde', 'methanal'], a: 0, e: 'CH₃CO–.' },
      { q: 'Cannizzaro needs', o: ['no α-H', 'α-H', 'ketone', 'acid'], a: 0, e: 'HCHO, PhCHO.' }, { q: 'Clemmensen reagent', o: ['Zn-Hg/HCl', 'NH₂NH₂/KOH', 'LiAlH₄', 'Pd/BaSO₄'], a: 0, e: 'Acidic.' },
      { q: 'Strongest acid', o: ['Cl₃CCOOH', 'CH₃COOH', 'HCOOH', 'ClCH₂COOH'], a: 0, e: 'Three Cl.' }, { q: 'Rosenmund gives', o: ['aldehyde', 'ketone', 'acid', 'alcohol'], a: 0, e: 'From acid chloride.' },
      { q: 'Benzaldehyde with Fehling’s', o: ['negative', 'red ppt', 'blue', 'mirror'], a: 0, e: 'Aromatic.' }, { q: '2,4-DNP tests for', o: ['C=O', 'OH', 'NH₂', 'C=C'], a: 0, e: 'Carbonyl.' },
      { q: 'Aldol forms', o: ['β-hydroxy carbonyl', 'acid', 'ester', 'amine'], a: 0, e: 'Condensation.' }, { q: 'Acid + NaHCO₃', o: ['CO₂', 'H₂', 'no reaction', 'O₂'], a: 0, e: 'Stronger than H₂CO₃.' },
      { q: 'HVZ gives', o: ['α-halo acid', 'acid chloride', 'ester', 'alkane'], a: 0, e: 'Red P.' }
    ],
    teach: {
      outcomes: ['Name and prepare carbonyl compounds', 'Explain nucleophilic addition and named reactions', 'Use tests and acidity trends'],
      periods: [{ t: 'Carbonyls', flow: [['10 min', 'C=O polarity.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Name reaction chart.']] }, { t: 'Carboxylic acids', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Conversion problems.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['All aldehydes give Fehling’s.', 'Ketones never oxidise.'], activities: ['Tollens’ mirror demo.', 'Iodoform test.'],
      exit: ['Tollens vs Fehling.', 'Aldol vs Cannizzaro.', 'Acidity order.'], homework: 'Two-step conversions: ethanol → propanone? benzene → benzoic acid.'
    },
    slides: [{ t: 'Aldehydes, Ketones, Acids', b: ['Preparation', 'Nucleophilic addition', 'Tests and named reactions', 'Acidity'] }, { t: 'Think and share', b: ['Why is formalin used to preserve specimens?', 'Why does vinegar fizz with baking soda?'] }],
    fs: { groups: [['Tests', [['Tollens’', 'aldehydes: mirror'], ['Fehling’s', 'aliphatic aldehydes: red'], ['Iodoform', 'CH₃CO–, ethanol']]], ['Named', [['Aldol', 'α-H, dil. base'], ['Cannizzaro', 'no α-H, conc. base'], ['Clemmensen/W–K', 'C=O → CH₂']]], ['Acids', [['Acidity', 'EWG ↑'], ['HVZ', 'α-halogenation'], ['Decarboxylation', 'soda-lime → alkane']]]],
      ex: [['2 HCHO + conc NaOH', 'CH₃OH + HCOONa'], ['pKa 2.86', 'Ka 1.38 × 10⁻³']], rem: ['Aldehyde > ketone reactivity.', 'α-H decides aldol.', 'EWG ↑ acidity.'] }
  });
})();
