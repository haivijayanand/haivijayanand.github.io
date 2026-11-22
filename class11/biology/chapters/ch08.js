/*
TOOL:    class11_biology_ch08
FAMILY:  CBSE_REVISION / Class 11 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 8 Cell: The Unit of Life (cell theory, prokaryotic and eukaryotic cells, membrane fluid mosaic model, cell wall, endomembrane system, mitochondria, plastids, ribosomes, cytoskeleton, cilia, centrosome, nucleus, microbodies) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const O = [['plasma membrane', 'lipid bilayer with proteins (fluid mosaic — Singer & Nicolson 1972); selective transport', 'all cells'], ['cell wall', 'cellulose, hemicellulose, pectin; middle lamella of calcium pectate', 'plants, fungi (chitin), bacteria'], ['ER', 'RER makes proteins; SER makes lipids, steroids', 'eukaryotes'], ['Golgi apparatus', 'cis face receives, trans face ships; packages, glycoproteins, glycolipids', 'eukaryotes'], ['lysosome', 'hydrolytic enzymes active at acidic pH', 'mostly animals'], ['vacuole', 'tonoplast-bound sap; turgor', 'large in plants'], ['mitochondria', 'double membrane, cristae, matrix with own DNA and 70S ribosomes; aerobic respiration', 'eukaryotes'], ['chloroplast', 'thylakoids in grana, stroma; own DNA, 70S ribosomes; photosynthesis', 'plants, algae'], ['ribosomes', '80S (60S + 40S) eukaryotes; 70S (50S + 30S) prokaryotes; protein synthesis', 'all cells'], ['centrosome', 'two centrioles (9 + 0 triplets); spindle; basal bodies', 'animal cells'], ['cilia / flagella', '9 + 2 axoneme of microtubules', 'many eukaryotes'], ['nucleus', 'double nuclear envelope with pores, chromatin, nucleolus (rRNA)', 'eukaryotes']];
  G9.register({
    no: 8, part: 'Unit III · Cell', short: 'Cell', title: 'Cell: The Unit of Life',
    blurb: 'Cell theory (Schleiden, Schwann, Virchow); overview of the cell; prokaryotic cells (cell envelope, mesosome, plasmids, 70S ribosomes, inclusion bodies); eukaryotic cells — plasma membrane (fluid mosaic model), cell wall, endomembrane system (ER, Golgi, lysosomes, vacuoles), mitochondria, plastids, ribosomes, cytoskeleton, cilia and flagella, centrosome and centrioles, nucleus and chromosomes (centromere positions), microbodies.',
    revise: {
      oneLine: 'All organisms are made of cells; cells arise from pre-existing cells (Virchow: omnis cellula e cellula). Prokaryotes lack a nuclear envelope and membrane-bound organelles; they have 70S ribosomes, plasmids and mesosomes. Eukaryotic membranes follow the fluid mosaic model. The endomembrane system is ER, Golgi, lysosomes and vacuoles (not mitochondria, chloroplasts, peroxisomes). Mitochondria and chloroplasts have their own DNA and 70S ribosomes (semi-autonomous). Cilia/flagella have a 9 + 2 microtubule arrangement; centrioles 9 + 0 triplets.',
      sections: [
        { h: 'Membrane transport', html: '<p>Passive (diffusion, osmosis, facilitated by carrier/channel proteins) and active (pumps using ATP, e.g., Na⁺/K⁺ pump).</p>' },
        { h: 'Chromosomes', html: '<p>By centromere: metacentric (middle), sub-metacentric, acrocentric, telocentric (end). Satellite chromosomes have a secondary constriction.</p>' },
        { h: 'Sizes', html: '<p>Mycoplasma ~0.3 µm (smallest), bacteria 3–5 µm, RBC ~7 µm, ostrich egg the largest single cell.</p>' }
      ],
      formulas: [['Prokaryotic ribosome', '70S = 50S + 30S'], ['Eukaryotic ribosome', '80S = 60S + 40S'], ['Cilia/flagella', '9 + 2'], ['Centriole', '9 + 0 triplets'], ['Fluid mosaic', 'Singer & Nicolson (1972)']],
      terms: [['Endomembrane system', 'ER, Golgi, lysosomes, vacuoles working together'], ['Semi-autonomous', 'organelles with own DNA (mitochondria, plastids)'], ['Mesosome', 'infolding of bacterial membrane']],
      traps: ['S (Svedberg) values do not add simply (50S + 30S = 70S).', 'Mitochondria are not part of the endomembrane system.', 'Plant cells usually lack centrioles.'],
      bridge: '<p>Ch 9–10 cover molecules inside cells and cell division.</p>'
    },
    explore: [
      { title: 'Organelle explorer', intro: 'Choose an organelle. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'organelle', O.map(o => o[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { rd.innerHTML = `<b>${O[k][0]}</b>: ${O[k][1]} · in: ${O[k][2]}`; } const step = () => { k = (k + 1) % O.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Endomembrane or not?', intro: 'Sort the organelles.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Endomembrane system', 'Not endomembrane'], items: [['ER', 0], ['Golgi apparatus', 0], ['lysosome', 0], ['vacuole', 0], ['mitochondria', 1, 'functions are not coordinated with ER/Golgi'], ['chloroplast', 1], ['peroxisome', 1], ['ribosome', 1, 'non-membranous']] }); } }
    ],
    gens: [
      { title: 'Function', gen(R) { const o = R.pick(O); return { q: `Key features/function of ${o[0]}?`, a: o[1] }; } },
      { title: 'Ribosomes', gen(R) { return G9.S9.pickQ(R, [['Ribosome type in bacteria?', '70S (50S + 30S)'], ['Ribosome type in eukaryotic cytoplasm?', '80S (60S + 40S)'], ['Ribosome type in mitochondria?', '70S'], ['Where is rRNA made?', 'nucleolus']]); } },
      { title: 'Centromere', gen(R) { return G9.S9.groupQ(R, [['centromere in the middle', 0], ['slightly away from middle', 1], ['close to one end', 2], ['at the very end', 3]], ['metacentric', 'sub-metacentric', 'acrocentric', 'telocentric'], 'Chromosome with '); } },
      { title: 'Cell theory', gen(R) { return G9.S9.pickQ(R, [['Who said all cells arise from pre-existing cells?', 'Rudolf Virchow'], ['Who proposed cell theory?', 'Schleiden and Schwann'], ['Smallest cell?', 'Mycoplasma (~0.3 µm)'], ['Who proposed the fluid mosaic model?', 'Singer and Nicolson (1972)']]); } },
      { title: 'Prokaryote features', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['What are plasmids?', 'small circular extra-chromosomal DNA'], ['What is a mesosome?', 'infolding of plasma membrane in bacteria'], ['Gram-positive bacteria have?', 'thick peptidoglycan wall that keeps the stain'], ['Polysome is?', 'several ribosomes on one mRNA']]); } }
    ],
    quiz: [
      { q: 'Fluid mosaic model by', o: ['Singer & Nicolson', 'Watson & Crick', 'Schleiden', 'Virchow'], a: 0, e: '1972.' }, { q: 'Bacterial ribosome', o: ['70S', '80S', '60S', '40S'], a: 0, e: '50S + 30S.' },
      { q: 'Cilia arrangement', o: ['9 + 2', '9 + 0', '9 + 3', '8 + 2'], a: 0, e: 'Axoneme.' }, { q: 'Suicide bags', o: ['lysosomes', 'ribosomes', 'Golgi', 'plastids'], a: 0, e: 'Enzymes.' },
      { q: 'Own DNA', o: ['mitochondria', 'Golgi', 'lysosome', 'ER'], a: 0, e: 'Semi-autonomous.' }, { q: 'Not endomembrane', o: ['mitochondria', 'ER', 'Golgi', 'vacuole'], a: 0, e: 'Separate.' },
      { q: 'Omnis cellula e cellula', o: ['Virchow', 'Hooke', 'Brown', 'Schwann'], a: 0, e: 'Cells from cells.' }, { q: 'rRNA made in', o: ['nucleolus', 'Golgi', 'ER', 'lysosome'], a: 0, e: 'Nucleolus.' },
      { q: 'Lipid synthesis', o: ['SER', 'RER', 'ribosome', 'nucleolus'], a: 0, e: 'Smooth ER.' }, { q: 'Telocentric centromere', o: ['at the end', 'middle', 'near middle', 'absent'], a: 0, e: 'Terminal.' },
      { q: 'Tonoplast surrounds', o: ['vacuole', 'nucleus', 'chloroplast', 'mitochondrion'], a: 0, e: 'Vacuole membrane.' }
    ],
    teach: {
      outcomes: ['State cell theory', 'Compare prokaryotic and eukaryotic cells', 'Describe organelles and membranes'],
      periods: [{ t: 'Cell overview', flow: [['10 min', 'Onion and cheek cells.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Prokaryote vs eukaryote table.']] }, { t: 'Organelles', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Organelle analogy (factory).'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['S values add.', 'Plant cells have centrioles.'], activities: ['Cell model.', 'Membrane bubble demo.'],
      exit: ['Fluid mosaic.', '70S vs 80S.', 'Endomembrane members.'], homework: 'Build a labelled 3-D model or diagram of a plant or animal cell.'
    },
    slides: [{ t: 'Cell: The Unit of Life', b: ['Cell theory', 'Prokaryotic cell', 'Membranes and endomembrane system', 'Energy organelles and nucleus'] }, { t: 'Think and share', b: ['Why semi-autonomous?', 'Why 50S + 30S = 70S?'] }],
    fs: { groups: [['Theory', [['Cells', 'unit of life'], ['Virchow', 'cells from cells'], ['Membrane', 'fluid mosaic']]], ['Organelles', [['Endomembrane', 'ER, Golgi, lysosome, vacuole'], ['Energy', 'mitochondria, chloroplast (own DNA)'], ['Ribosomes', '70S / 80S']]], ['Structures', [['Cilia', '9 + 2'], ['Centriole', '9 + 0'], ['Chromosomes', 'meta, sub-meta, acro, telo']]]],
      ex: [['Bacteria ribosome', '70S'], ['Golgi', 'cis receive, trans ship']], rem: ['Prokaryotes: no nucleus.', 'Two semi-autonomous organelles.', 'S values not additive.'] }
  });
})();
