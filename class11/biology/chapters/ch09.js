/*
TOOL:    class11_biology_ch09
FAMILY:  CBSE_REVISION / Class 11 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 9 Biomolecules (chemical analysis of tissues, primary and secondary metabolites, carbohydrates, proteins, lipids, nucleic acids, structure of proteins, enzymes: properties, kinetics, factors, inhibition, classification, cofactors) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  const EC = [['oxidoreductases', 'oxidation–reduction (dehydrogenases)'], ['transferases', 'transfer a group between substrates'], ['hydrolases', 'break bonds by adding water'], ['lyases', 'remove groups without hydrolysis, forming double bonds'], ['isomerases', 'rearrange molecules (isomers)'], ['ligases', 'join two molecules (using ATP)']];
  G9.register({
    no: 9, part: 'Unit III · Cell', short: 'Biomolecules', title: 'Biomolecules',
    blurb: 'Analysing chemical composition of tissues; micro- and macromolecules; primary and secondary metabolites; amino acids, lipids, nucleotides; biomacromolecules — proteins (primary to quaternary structure), polysaccharides (starch, cellulose, glycogen, chitin), nucleic acids; nature of bonds (peptide, glycosidic, phosphodiester); enzymes — properties, how they work (activation energy, active site), factors (temperature, pH, substrate), Michaelis constant, inhibition, six classes, cofactors (prosthetic groups, coenzymes, metal ions).',
    revise: {
      oneLine: 'Proteins are polymers of 20 amino acids joined by peptide bonds; structure levels: primary (sequence), secondary (helix/sheet), tertiary (3-D fold), quaternary (subunits — haemoglobin). Polysaccharides link sugars by glycosidic bonds; nucleic acids link nucleotides by phosphodiester bonds. Enzymes are biological catalysts that lower activation energy; rate rises with substrate until Vmax; Km = substrate concentration giving ½Vmax. Competitive inhibitors resemble the substrate (malonate inhibits succinate dehydrogenase). Six enzyme classes: oxidoreductases, transferases, hydrolases, lyases, isomerases, ligases.',
      sections: [
        { h: 'Acid-insoluble fraction', html: '<p>Proteins, nucleic acids, polysaccharides (and lipids, as membrane fragments) form the macromolecular fraction (> 800 Da, except lipids).</p>' },
        { h: 'Secondary metabolites', html: '<p>Alkaloids (morphine, codeine), terpenoids, essential oils, toxins (abrin, ricin), drugs (vinblastine), pigments, rubber, gums.</p>' },
        { h: 'Cofactors', html: '<p>Prosthetic groups tightly bound (haem in peroxidase, catalase); coenzymes loosely bound, often from vitamins (NAD, NADP — niacin); metal ions (Zn²⁺ for carboxypeptidase).</p>' }
      ],
      formulas: [['Peptide bond', '–CO–NH–'], ['Michaelis–Menten', 'v = Vmax[S]/(Km + [S])'], ['Km', '[S] at ½Vmax'], ['Enzyme classes', '6'], ['Cellulose', 'β-glucose polymer; starch α-glucose']],
      terms: [['Apoenzyme', 'protein part of an enzyme'], ['Holoenzyme', 'apoenzyme + cofactor'], ['Active site', 'pocket where substrate binds']],
      traps: ['Lipids are not true polymers.', 'Enzymes are not consumed in reactions.', 'High temperature denatures enzymes; low temperature only slows them.'],
      bridge: '<p>Ch 11–12 rely on enzymes in photosynthesis and respiration.</p>'
    },
    explore: [
      { title: 'Enzyme rate curve', intro: 'Set Vmax and Km; see rate at a substrate concentration (Michaelis–Menten).',
        build(el, K) { let V = 10, Km = 2, S = 2; const row = K.row(el); K.slider(row, 'Vmax', 2, 20, 1, V, v => { V = v; b.redraw(); }); K.slider(row, 'Km', 0.5, 10, 0.5, Km, v => { Km = v; b.redraw(); }); K.slider(row, '[S]', 0, 20, 0.5, S, v => { S = v; b.redraw(); }); const b = new K.Board(el, { xmin: -1, xmax: 21, ymin: -1.5, ymax: 22, axes: false, grid: 0, aspect: 0.45 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.line(0, 0, 20.5, 0, { color: C.ink, w: 1.5 }); b.line(0, 0, 0, 21, { color: C.ink, w: 1.5 }); b.text(19.5, -1, '[S]', { font: '11px' }); b.text(1, 21, 'rate', { font: '11px' }); b.line(0, V, 20, V, { color: C.grey, w: 1, dash: [4, 4] }); let p = [0, 0]; for (let s = 0.2; s <= 20; s += 0.2) { const v = V * s / (Km + s); b.line(p[0], p[1], s, v, { color: C.blue, w: 2.5 }); p = [s, v]; } const v0 = V * S / (Km + S); b.dot(S, v0, { r: 7, color: C.orange }); b.line(Km, 0, Km, V / 2, { color: C.purple, w: 1, dash: [3, 3] });
            rd.innerHTML = `rate = Vmax[S]/(Km + [S]) = <b>${f(v0)}</b> (${f(100 * v0 / V)}% of Vmax) · at [S] = Km the rate is ½Vmax · competitive inhibitor → apparent Km rises, Vmax same`; };
          b.redraw(); return null; } },
      { title: 'Enzyme classes', intro: 'Choose a class. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'class', EC.map(e => e[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { rd.innerHTML = `<b>${EC[k][0]}</b>: ${EC[k][1]}`; } const step = () => { k = (k + 1) % EC.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } }
    ],
    gens: [
      { title: 'Bond', gen(R) { return G9.S9.groupQ(R, [['protein', 0], ['starch', 1], ['DNA', 2], ['cellulose', 1], ['insulin', 0], ['RNA', 2]], ['peptide bond', 'glycosidic bond', 'phosphodiester bond'], 'Bond linking units of '); } },
      { title: 'MM rate', levels: [2, 3], gen(R) { const V = R.pick([10, 20, 50]), Km = R.pick([1, 2, 5]), S = R.pick([1, 2, 5, 10]); return { q: `Vmax = ${V}, Km = ${Km} mM, [S] = ${S} mM. Rate?`, a: f(V * S / (Km + S)), ans: V * S / (Km + S), tol: 0.01 }; } },
      { title: 'Enzyme class', gen(R) { const e = R.pick(EC); return { q: `Which enzyme class: ${e[1]}?`, a: e[0] }; } },
      { title: 'Structure levels', gen(R) { return G9.S9.groupQ(R, [['amino acid sequence', 0], ['α-helix', 1], ['3-D folding of one chain', 2], ['haemoglobin’s four subunits', 3]], ['primary', 'secondary', 'tertiary', 'quaternary'], 'Protein structure level: '); } },
      { title: 'Concepts', gen(R) { return G9.S9.pickQ(R, [['What is Km?', 'substrate concentration at half Vmax'], ['Example of competitive inhibition?', 'malonate inhibits succinate dehydrogenase'], ['Coenzyme from niacin?', 'NAD / NADP'], ['Most abundant protein in animals?', 'collagen'], ['Most abundant protein on Earth?', 'RuBisCO']]); } }
    ],
    quiz: [
      { q: 'Peptide bond in', o: ['proteins', 'starch', 'DNA', 'lipids'], a: 0, e: 'Amino acids.' }, { q: 'Km is', o: ['[S] at ½Vmax', 'Vmax', 'rate', 'pH'], a: 0, e: 'Affinity.' },
      { q: 'Competitive inhibitor', o: ['resembles substrate', 'binds elsewhere always', 'is a cofactor', 'raises Vmax'], a: 0, e: 'Active site.' }, { q: 'Enzyme classes', o: ['6', '4', '5', '8'], a: 0, e: 'IUB.' },
      { q: 'Haem in catalase is a', o: ['prosthetic group', 'coenzyme', 'substrate', 'inhibitor'], a: 0, e: 'Tight.' }, { q: 'Cellulose made of', o: ['β-glucose', 'α-glucose', 'fructose', 'amino acids'], a: 0, e: 'Plants.' },
      { q: 'Quaternary structure', o: ['haemoglobin', 'insulin primary', 'glycine', 'glucose'], a: 0, e: 'Subunits.' }, { q: 'Most abundant protein on Earth', o: ['RuBisCO', 'collagen', 'keratin', 'actin'], a: 0, e: 'Photosynthesis.' },
      { q: 'Lipids are', o: ['not true polymers', 'polymers', 'proteins', 'nucleic acids'], a: 0, e: 'Micro, aggregate.' }, { q: 'Enzyme + cofactor', o: ['holoenzyme', 'apoenzyme', 'substrate', 'product'], a: 0, e: 'Complete.' },
      { q: 'Secondary metabolite', o: ['morphine', 'glucose', 'alanine', 'ATP'], a: 0, e: 'Alkaloid.' }
    ],
    teach: {
      outcomes: ['Describe biomolecules and bonds', 'Explain enzyme action and kinetics', 'Classify enzymes and cofactors'],
      periods: [{ t: 'Molecules', flow: [['10 min', 'Food tests recap.'], ['15 min', 'Polymer and bond table.'], ['15 min', 'Protein structure models.']] }, { t: 'Enzymes', flow: [['15 min', 'Explore panel 1 / catalase foam.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Enzymes are used up.', 'Cold kills enzymes.'], activities: ['Catalase with potato and H₂O₂ at temperatures.', 'Starch digestion by saliva.'],
      exit: ['Three bonds.', 'Km meaning.', 'Six classes.'], homework: 'Plot rate vs temperature from the catalase experiment.'
    },
    slides: [{ t: 'Biomolecules', b: ['Metabolites', 'Proteins, polysaccharides, nucleic acids', 'Enzyme action', 'Inhibition, classes, cofactors'] }, { t: 'Think and share', b: ['Why do enzymes denature at high T?', 'How does malonate inhibit?'] }],
    fs: { groups: [['Polymers', [['Protein', 'peptide bond'], ['Polysaccharide', 'glycosidic'], ['Nucleic acid', 'phosphodiester']]], ['Enzymes', [['MM', 'v = Vmax[S]/(Km+[S])'], ['Km', '½Vmax'], ['Inhibition', 'competitive: substrate-like']]], ['Classes & cofactors', [['Classes', 'oxido, trans, hydro, lyase, isomer, ligase'], ['Cofactors', 'prosthetic, coenzyme, metal']]]],
      ex: [['[S] = Km', 'v = ½Vmax'], ['NAD', 'coenzyme from niacin']], rem: ['Structure levels.', 'Km = affinity.', 'Enzymes reused.'] }
  });
})();
