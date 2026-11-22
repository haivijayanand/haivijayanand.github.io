/*
TOOL:    class12_chemistry_ch10
FAMILY:  CBSE_REVISION / Class 12 Chemistry (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Unit 10 Biomolecules (carbohydrates, glucose and fructose structures, disaccharides, polysaccharides, proteins, amino acids, structure levels, denaturation, enzymes, vitamins, nucleic acids) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 10, part: 'Part II', short: 'Biomolecules', title: 'Biomolecules',
    blurb: 'Carbohydrates — classification (monosaccharides, oligosaccharides, polysaccharides; reducing and non-reducing sugars); glucose — preparation, open-chain structure evidence, cyclic (pyranose) structure, anomers; fructose; disaccharides (sucrose, maltose, lactose) and polysaccharides (starch, cellulose, glycogen); proteins — amino acids (essential, zwitterion), peptide bond, primary to quaternary structure, denaturation; enzymes; vitamins and deficiency diseases; nucleic acids — nucleosides, nucleotides, DNA and RNA structure and functions.',
    revise: {
      oneLine: 'Glucose C₆H₁₂O₆ is an aldohexose; evidence: HI → n-hexane (straight chain), acetylation → pentaacetate (five −OH), HCN/oxime (C=O), Br₂ water → gluconic acid (aldehyde), HNO₃ → saccharic acid. It exists mainly as cyclic α- and β-D-glucopyranose (anomers, differing at C-1). Sucrose (glucose + fructose, non-reducing, inversion gives invert sugar); maltose (two α-glucose, reducing); lactose (galactose + glucose). Starch = amylose + amylopectin (α-links); cellulose = β-glucose (structural); glycogen = animal starch. Proteins are polymers of α-amino acids joined by peptide bonds (–CO–NH–); levels: primary (sequence), secondary (α-helix, β-sheet; H-bonds), tertiary (folding), quaternary (subunits). Denaturation destroys 2°/3° structure (boiling egg, curdling milk). DNA: deoxyribose, bases A, G, C, T, double helix (A=T, G≡C); RNA: ribose, uracil instead of thymine, single strand.',
      sections: [
        { h: 'Vitamins', html: '<p>Fat-soluble A, D, E, K (stored); water-soluble B group and C (must be taken regularly). Deficiencies: A — night blindness; B₁ — beriberi; C — scurvy; D — rickets; K — delayed clotting; B₁₂ — pernicious anaemia.</p>' },
        { h: 'Enzymes', html: '<p>Biological catalysts (mostly globular proteins), very specific; e.g. maltase, invertase, pepsin.</p>' },
        { h: 'Glucose oddities', html: '<p>Does not give Schiff’s test or react with NaHSO₃; pentaacetate doesn’t react with hydroxylamine → supports cyclic structure.</p>' }
      ],
      formulas: [['Glucose', 'C₆H₁₂O₆ aldohexose'], ['Sucrose', 'α-glucose + β-fructose (C1–C2)'], ['Peptide bond', '–CO–NH–'], ['DNA pairs', 'A=T, G≡C']],
      terms: [['Anomers', 'isomers differing at C-1 (α, β)'], ['Zwitterion', 'H₃N⁺–CHR–COO⁻ dipolar ion'], ['Nucleotide', 'base + sugar + phosphate']],
      traps: ['Sucrose is non-reducing.', 'Cellulose has β-links; humans cannot digest it.', 'RNA has uracil, not thymine.'],
      bridge: '<p>This completes the Class XII chemistry units.</p>'
    },
    explore: [
      { title: 'Carbohydrate sorter', intro: 'Sort into reducing and non-reducing.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['reducing', 'non-reducing'], items: [['glucose', 0], ['fructose', 0], ['maltose', 0], ['lactose', 0], ['sucrose', 1], ['starch', 1], ['cellulose', 1]] }); } },
      { title: 'Vitamin finder', intro: 'Pick a vitamin.',
        build(el, K) { const V = [['A', 'fat', 'fish liver oil, carrots, butter, milk', 'night blindness, xerophthalmia'], ['B₁ (thiamine)', 'water', 'yeast, milk, green vegetables, cereals', 'beriberi'], ['B₂ (riboflavin)', 'water', 'milk, egg white, liver', 'cheilosis, digestive disorders'], ['B₆ (pyridoxine)', 'water', 'yeast, milk, egg yolk, cereals', 'convulsions'], ['B₁₂', 'water', 'meat, fish, egg, curd', 'pernicious anaemia'], ['C (ascorbic acid)', 'water', 'citrus fruits, amla, green leafy vegetables', 'scurvy (bleeding gums)'], ['D', 'fat', 'sunlight on skin, fish, egg yolk', 'rickets, osteomalacia'], ['E', 'fat', 'vegetable oils, wheat germ, sunflower oil', 'fragile RBCs, muscle weakness'], ['K', 'fat', 'green leafy vegetables', 'increased blood clotting time']]; let k = 0; const row = K.row(el); K.select(row, 'vitamin', V.map(v => v[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { const v = V[k]; rd.innerHTML = `Vitamin <b>${v[0]}</b> · ${v[1]}-soluble${v[1] === 'fat' ? ' (stored in liver and fat tissue)' : ' (excreted; take regularly)'} · sources: ${v[2]} · deficiency: <b>${v[3]}</b>`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Classify carbohydrate', gen(R) { return G9.S9.groupQ(R, [['glucose', 0], ['fructose', 0], ['sucrose', 1], ['maltose', 1], ['lactose', 1], ['starch', 2], ['cellulose', 2], ['glycogen', 2]], ['monosaccharide', 'disaccharide', 'polysaccharide'], ''); } },
      { title: 'Glucose evidence', gen(R) { return G9.S9.pickQ(R, [['glucose + HI, heat', 'n-hexane — six C in a straight chain'], ['glucose + acetic anhydride', 'pentaacetate — five −OH groups'], ['glucose + Br₂ water', 'gluconic acid — aldehyde group'], ['glucose + HNO₃', 'saccharic acid — a 1° alcohol group'], ['glucose + NH₂OH', 'oxime — carbonyl group']], 'Reaction and inference: '); } },
      { title: 'Deficiency', gen(R) { return G9.S9.pickQ(R, [['vitamin C', 'scurvy'], ['vitamin D', 'rickets'], ['vitamin A', 'night blindness'], ['vitamin B₁', 'beriberi'], ['vitamin K', 'delayed blood clotting'], ['vitamin B₁₂', 'pernicious anaemia']], 'Deficiency of '); } },
      { title: 'Protein structure', levels: [2, 3], gen(R) { return G9.S9.groupQ(R, [['amino acid sequence', 0], ['α-helix', 1], ['β-pleated sheet', 1], ['overall folding of chain', 2], ['haemoglobin subunits arrangement', 3]], ['primary', 'secondary', 'tertiary', 'quaternary'], 'Level: '); } },
      { title: 'Nucleic acids', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Sugar in DNA?', '2-deoxy-D-ribose'], ['Base in RNA instead of thymine?', 'uracil'], ['Pairs in DNA?', 'A with T, G with C'], ['Function of DNA?', 'stores and transmits heredity; directs protein synthesis via RNA'], ['Nucleoside vs nucleotide?', 'nucleotide = nucleoside + phosphate']]); } }
    ],
    quiz: [
      { q: 'Glucose is', o: ['aldohexose', 'ketohexose', 'aldopentose', 'disaccharide'], a: 0, e: 'CHO, 6 C.' }, { q: 'Non-reducing sugar', o: ['sucrose', 'maltose', 'lactose', 'glucose'], a: 0, e: 'C1–C2 link.' },
      { q: 'Cellulose links', o: ['β-glycosidic', 'α-glycosidic', 'peptide', 'ester'], a: 0, e: 'β-glucose.' }, { q: 'Peptide bond', o: ['–CO–NH–', '–COO–', '–O–', '–S–S–'], a: 0, e: 'Amide.' },
      { q: 'Scurvy', o: ['vitamin C', 'vitamin A', 'vitamin D', 'vitamin K'], a: 0, e: 'Ascorbic acid.' }, { q: 'RNA base', o: ['uracil', 'thymine', 'both', 'none'], a: 0, e: 'U for T.' },
      { q: 'Denaturation destroys', o: ['2° and 3° structure', 'primary', 'peptide bonds', 'amino acids'], a: 0, e: 'Boiled egg.' }, { q: 'Fat-soluble vitamin', o: ['D', 'C', 'B₁', 'B₁₂'], a: 0, e: 'ADEK.' },
      { q: 'Anomers differ at', o: ['C-1', 'C-2', 'C-5', 'C-6'], a: 0, e: 'Hemiacetal carbon.' }, { q: 'DNA pair', o: ['G≡C', 'A=G', 'T=C', 'U=A'], a: 0, e: 'Complementary.' },
      { q: 'Animal starch', o: ['glycogen', 'cellulose', 'amylose', 'sucrose'], a: 0, e: 'Liver, muscles.' }
    ],
    teach: {
      outcomes: ['Classify carbohydrates and explain glucose structure', 'Describe protein structure and denaturation', 'Know vitamins and nucleic acid basics'],
      periods: [{ t: 'Carbohydrates', flow: [['10 min', 'Iodine–starch test.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Glucose structure evidence.']] }, { t: 'Proteins, vitamins, DNA', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'DNA model.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['All sugars are reducing.', 'Cooking destroys amino acids.'], activities: ['Fehling’s test on sugars.', 'Paper DNA ladder.'],
      exit: ['Reducing sugars.', 'Protein levels.', 'DNA vs RNA.'], homework: 'Tabulate vitamins with sources and deficiency diseases.'
    },
    slides: [{ t: 'Biomolecules', b: ['Carbohydrates', 'Proteins and enzymes', 'Vitamins', 'Nucleic acids'] }, { t: 'Think and share', b: ['Why can cows digest cellulose but we can’t?', 'Why does an egg white turn solid on boiling?'] }],
    fs: { groups: [['Carbohydrates', [['Glucose', 'aldohexose, pyranose'], ['Sucrose', 'non-reducing'], ['Starch/cellulose', 'α / β glucose']]], ['Proteins', [['Bond', 'peptide –CO–NH–'], ['Levels', '1°–4°'], ['Denature', '2°, 3° lost']]], ['Others', [['Vitamins', 'ADEK fat, B & C water'], ['DNA', 'deoxyribose, A=T, G≡C'], ['RNA', 'ribose, U']]]],
      ex: [['glucose + HI', 'n-hexane'], ['lack of C', 'scurvy']], rem: ['Sucrose non-reducing.', 'β-links in cellulose.', 'U in RNA.'] }
  });
})();
