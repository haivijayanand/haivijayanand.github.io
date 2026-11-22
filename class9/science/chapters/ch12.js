/*
TOOL:    class9_science_ch12
FAMILY:  CBSE_REVISION / Class 9 Science (Exploration)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 12 Patterns in Life: Diversity and Classification (basis of classification, hierarchy, five kingdoms, plant and animal groups, binomial nomenclature, biodiversity of India) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const KG = [['Monera', 'prokaryotic, unicellular; some autotrophic, many heterotrophic', 'bacteria, cyanobacteria'], ['Protista', 'eukaryotic, mostly unicellular; cilia/flagella/pseudopodia', 'Amoeba, Paramecium, diatoms'], ['Fungi', 'eukaryotic, heterotrophic (saprophytic), cell wall of chitin', 'yeast, mushroom, Rhizopus'], ['Plantae', 'multicellular, autotrophic, cellulose cell wall', 'mosses, ferns, pine, mango'], ['Animalia', 'multicellular, heterotrophic, no cell wall', 'sponges, insects, fish, humans']];
  const HI = ['Kingdom', 'Phylum / Division', 'Class', 'Order', 'Family', 'Genus', 'Species'];
  G9.register({
    no: 12, part: 'All chapters', short: 'Classification', title: 'Patterns in Life: Diversity and Classification',
    blurb: 'Why and how we classify living things; characteristics used (cell type, number of cells, nutrition, body organisation); the hierarchy from kingdom to species; Whittaker’s five kingdoms; major plant groups and animal phyla; binomial nomenclature; and India’s biodiversity.',
    revise: {
      oneLine: 'Classification groups organisms by shared features, from broad to narrow: kingdom → phylum → class → order → family → genus → species. Whittaker’s five kingdoms: Monera, Protista, Fungi, Plantae, Animalia. Plants: thallophyta, bryophyta, pteridophyta (no seeds); gymnosperms (naked seeds), angiosperms (seeds in fruits; monocots and dicots). Animals: from sponges to chordates (fishes, amphibians, reptiles, birds, mammals). Scientific names use binomial nomenclature: Genus species (Homo sapiens).',
      sections: [
        { h: 'Binomial names', html: `<p>Written in italics; genus capitalised, species lower-case: <i>Mangifera indica</i> (mango), <i>Panthera tigris</i> (tiger). Started by Carl Linnaeus.</p>` },
        { h: 'Vertebrates', html: `<p>Fishes (gills, scales), amphibians (moist skin, both water and land), reptiles (dry scaly skin), birds (feathers, beak, hollow bones), mammals (hair, mammary glands).</p>` },
        { h: 'India', html: `<p>One of the world’s megadiverse countries with four biodiversity hotspots (Himalaya, Western Ghats–Sri Lanka, Indo-Burma, Sundaland — Nicobar).</p>` }
      ],
      formulas: [['Hierarchy', 'K → P → C → O → F → G → S'], ['Five kingdoms', 'Monera, Protista, Fungi, Plantae, Animalia'], ['Name', 'Genus species, italic'], ['Monocot', 'one cotyledon, parallel veins'], ['Dicot', 'two cotyledons, net veins']],
      terms: [['Species', 'organisms that can interbreed to give fertile offspring'], ['Taxonomy', 'science of classification'], ['Biodiversity', 'variety of life in an area']],
      traps: ['Fungi are not plants (no chlorophyll, chitin walls).', 'Whales and bats are mammals.', 'Species name never starts with a capital.'],
      bridge: '<p>Class 11: The Living World and biological classification.</p>'
    },
    explore: [
      { title: 'Five kingdoms', intro: 'Choose a kingdom; see its features and examples. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'kingdom', KG.map(x => x[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { rd.innerHTML = `<b>${KG[k][0]}</b>: ${KG[k][1]} · e.g., ${KG[k][2]}`; } const step = () => { k = (k + 1) % KG.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Vertebrate sorter', intro: 'Sort into the five vertebrate classes.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Fishes', 'Amphibians', 'Reptiles', 'Birds', 'Mammals'], items: [['shark', 0], ['frog', 1], ['crocodile', 2], ['penguin', 3, 'feathers, though it cannot fly'], ['whale', 4, 'breathes air, feeds young on milk'], ['salamander', 1], ['bat', 4, 'a flying mammal'], ['tortoise', 2], ['sea horse', 0, 'a true fish']] }); } }
    ],
    gens: [
      { title: 'Kingdom', gen(R) { return G9.S9.groupQ(R, [['bacteria', 0], ['Amoeba', 1], ['mushroom', 2], ['fern', 3], ['earthworm', 4], ['yeast', 2], ['diatom', 1]], KG.map(k => k[0]), 'Kingdom of '); } },
      { title: 'Hierarchy', gen(R) { const i = R.int(0, 5); return { q: `Which rank comes just below ${HI[i]}?`, a: HI[i + 1] }; } },
      { title: 'Binomial', gen(R) { return G9.S9.pickQ(R, [['Scientific name of humans?', 'Homo sapiens'], ['Who introduced binomial nomenclature?', 'Carl Linnaeus'], ['Which part is capitalised?', 'genus'], ['Mangifera indica is?', 'mango']]); } },
      { title: 'Monocot or dicot', levels: [2, 3], gen(R) { return G9.S9.groupQ(R, [['wheat', 0], ['pea', 1], ['maize', 0], ['mango', 1], ['grass', 0], ['sunflower', 1]], ['monocot', 'dicot'], 'Monocot or dicot: '); } },
      { title: 'Plant groups', levels: [2, 3], gen(R) { return G9.S9.groupQ(R, [['Spirogyra', 0], ['moss', 1], ['fern', 2], ['pine', 3], ['mango', 4]], ['thallophyta', 'bryophyta', 'pteridophyta', 'gymnosperm', 'angiosperm'], 'Plant group of '); } }
    ],
    quiz: [
      { q: 'Five kingdoms by', o: ['Whittaker', 'Linnaeus', 'Darwin', 'Mendel'], a: 0, e: '1969.' }, { q: 'Prokaryotes are in', o: ['Monera', 'Protista', 'Fungi', 'Plantae'], a: 0, e: 'Bacteria.' },
      { q: 'Fungal cell wall', o: ['chitin', 'cellulose', 'none', 'protein'], a: 0, e: 'Chitin.' }, { q: 'Lowest rank', o: ['species', 'genus', 'family', 'kingdom'], a: 0, e: 'Species.' },
      { q: 'Whale is a', o: ['mammal', 'fish', 'amphibian', 'reptile'], a: 0, e: 'Milk.' }, { q: 'Naked seeds', o: ['gymnosperms', 'angiosperms', 'ferns', 'mosses'], a: 0, e: 'Pine.' },
      { q: 'Correct name', o: ['Panthera tigris', 'panthera Tigris', 'Panthera Tigris', 'PANTHERA tigris'], a: 0, e: 'Format.' }, { q: 'Frog is', o: ['amphibian', 'reptile', 'fish', 'mammal'], a: 0, e: 'Both.' },
      { q: 'Monocot veins', o: ['parallel', 'net', 'none', 'circular'], a: 0, e: 'Parallel.' }, { q: 'Amoeba kingdom', o: ['Protista', 'Monera', 'Fungi', 'Animalia'], a: 0, e: 'Eukaryote unicellular.' },
      { q: 'Feathers', o: ['birds', 'reptiles', 'mammals', 'fishes'], a: 0, e: 'Birds.' }
    ],
    teach: {
      outcomes: ['Explain the basis of classification', 'Place organisms in kingdoms and groups', 'Write binomial names'],
      periods: [{ t: 'Kingdoms', flow: [['10 min', 'Classify classroom objects.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Kingdom card sort.']] }, { t: 'Plants and animals', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Monocot/dicot seed and leaf.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Fungi are plants.', 'Whales are fish.'], activities: ['Leaf venation hunt.', 'Make a dichotomous key.'],
      exit: ['Five kingdoms.', 'Hierarchy order.', 'Binomial rule.'], homework: 'Find scientific names of 5 plants and 5 animals near your home.'
    },
    slides: [{ t: 'Diversity and Classification', b: ['Why classify', 'Hierarchy', 'Five kingdoms', 'Binomial nomenclature'] }, { t: 'Think and share', b: ['Why are fungi not plants?', 'Is a bat a bird?'] }],
    fs: { groups: [['Hierarchy', [['Order', 'K P C O F G S'], ['Basic unit', 'species']]], ['Kingdoms', [['Monera', 'prokaryotes'], ['Protista', 'unicellular eukaryotes'], ['Fungi', 'chitin, saprophytes'], ['Plantae / Animalia', 'multicellular']]], ['Names', [['Format', 'Genus species'], ['Human', 'Homo sapiens'], ['Mango', 'Mangifera indica']]]],
      ex: [['Penguin', 'bird'], ['Wheat', 'monocot']], rem: ['Broad to narrow.', 'Italics, genus capital.', 'Check features, not looks.'] }
  });
})();
