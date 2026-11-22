/*
TOOL:    class12_biology_ch13
FAMILY:  CBSE_REVISION / Class 12 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 13 Biodiversity and Conservation (levels, number of species, patterns, species–area relationship, importance, loss and causes, in situ and ex situ conservation) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 13, part: 'Unit X · Ecology', short: 'Biodiversity', title: 'Biodiversity and Conservation',
    blurb: 'Biodiversity — genetic, species and ecological diversity; how many species exist (global ~1.5 million described, estimates up to 7 million by May); India’s share (~8.1% of species, a megadiversity country); patterns — latitudinal gradients, species–area relationship (Humboldt); importance of species diversity (rivet popper hypothesis, Tilman’s plots); loss of biodiversity and its causes — the ‘Evil Quartet’ (habitat loss and fragmentation, over-exploitation, alien species invasion, co-extinctions); conservation — reasons (narrowly utilitarian, broadly utilitarian, ethical); in situ (hotspots, biosphere reserves, national parks, sanctuaries, sacred groves) and ex situ (zoos, botanical gardens, seed banks, cryopreservation).',
    revise: {
      oneLine: 'India has 2.4% of the world’s land but ~8.1% of species; one of 12 megadiversity countries. Diversity decreases from the equator to the poles (tropics: stable, long evolutionary time, more solar energy). Species–area relationship: log S = log C + Z log A, with Z ≈ 0.1–0.2 for small areas and 0.6–1.2 for whole continents. Stable communities with more species resist disturbance (Tilman). The Evil Quartet: habitat loss and fragmentation (the main cause; Amazon), over-exploitation (Steller’s sea cow, passenger pigeon), alien species (Nile perch in Lake Victoria, Parthenium, Lantana, water hyacinth, African catfish Clarias gariepinus), co-extinction (host and parasite). 34 global biodiversity hotspots (3 cover India: Western Ghats & Sri Lanka, Indo-Burma, Himalaya). In situ: 14 biosphere reserves, 90 national parks, 448 sanctuaries (NCERT figures); sacred groves (Khasi and Jaintia Hills, Aravalli, Western Ghats, Sarguja). Ex situ: zoos, botanical gardens, seed banks, cryopreservation of gametes.',
      sections: [
        { h: 'Genetic diversity', html: '<p>Rauwolfia vomitoria varies in reserpine content across the Himalaya; India has 50 000+ rice strains and 1000+ mango varieties.</p>' },
        { h: 'Rivet popper', html: '<p>Paul Ehrlich: an aeroplane (ecosystem) held by rivets (species) — losing a few may not matter, but losing key rivets is dangerous.</p>' },
        { h: 'Recent extinctions', html: '<p>Dodo (Mauritius), quagga (Africa), thylacine (Australia), Steller’s sea cow (Russia); three tiger subspecies (Bali, Javan, Caspian).</p>' }
      ],
      formulas: [['Species–area', 'S = C A^Z'], ['Log form', 'log S = log C + Z log A'], ['Z (small areas)', '0.1–0.2'], ['Z (continents)', '0.6–1.2']],
      terms: [['Hotspot', 'region of high endemism and threat'], ['Endemic', 'found only in one region'], ['Cryopreservation', 'storage at −196 °C in liquid nitrogen']],
      traps: ['Habitat loss is the biggest cause, not hunting.', 'Biosphere reserves have core, buffer and transition zones.', 'Hotspots cover <2% of land but hold many species.'],
      bridge: '<p>This completes Class XII Biology.</p>'
    },
    explore: [
      { title: 'Species–area relationship', intro: 'Set Z and area.',
        build(el, K) { let Cc = 10, Z = 0.2, A = 100; const row = K.row(el); K.slider(row, 'C', 1, 50, 1, Cc, v => { Cc = v; b.redraw(); }); K.slider(row, 'Z', 0.1, 1.2, 0.01, Z, v => { Z = v; b.redraw(); }); K.slider(row, 'area A (km²)', 1, 10000, 1, A, v => { A = v; b.redraw(); }); const b = new K.Board(el, { xmin: -0.5, xmax: 8.5, ymin: -0.4, ymax: 4.6, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.line(0, 0, 8.2, 0, { color: C.ink, w: 1 }); b.line(0, 0, 0, 4.4, { color: C.ink, w: 1 }); b.text(7.6, -0.25, 'log A', { font: '11px' }); b.text(0.4, 4.4, 'log S', { font: '11px' }); const lc = Math.log10(Cc); b.line(0, lc / 1.5, 8, (lc + Z * 4) / 1.5, { color: C.blue, w: 3 }); const la = Math.log10(A); b.dot(2 * la, (lc + Z * la) / 1.5, { color: C.orange, r: 6 });
            rd.innerHTML = `S = C·A^Z = ${Cc} × ${A}^${Z} = <b>${f(Cc * A ** Z)} species</b> · log-log line slope = Z = ${Z} (${Z < 0.3 ? 'typical of small regions' : Z > 0.6 ? 'typical of whole continents' : 'intermediate'}) · halving the area loses ${f((1 - 0.5 ** Z) * 100)}% of species`; };
          b.redraw(); return null; } },
      { title: 'Evil Quartet sorter', intro: 'Sort the examples.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['habitat loss', 'over-exploitation', 'alien species', 'co-extinction'], items: [['clearing Amazon forest', 0], ['fragmenting forests for roads', 0], ['Steller’s sea cow hunted', 1], ['passenger pigeon', 1], ['Nile perch in Lake Victoria', 2], ['Parthenium and Lantana', 2], ['African catfish in Indian rivers', 2], ['parasite dies with host fish', 3], ['plant dies with its only pollinator', 3]] }); } }
    ],
    gens: [
      { title: 'Species–area', gen(R) { const Cc = R.pick([5, 10, 20]), Z = R.pick([0.15, 0.2, 0.25]), A = R.pick([100, 1000, 10000]); return { q: `S = C·A^Z with C = ${Cc}, Z = ${Z}, A = ${A} km². Species?`, a: f(Cc * A ** Z), ans: Cc * A ** Z, tol: 0.01 }; } },
      { title: 'Cause', gen(R) { return G9.S9.groupQ(R, [['Amazon deforestation', 0], ['dodo hunted', 1], ['water hyacinth spread', 2], ['host and parasite lost together', 3], ['Nile perch', 2]], ['habitat loss', 'over-exploitation', 'alien species', 'co-extinction'], ''); } },
      { title: 'Conservation type', gen(R) { return G9.S9.groupQ(R, [['national park', 0], ['sacred grove', 0], ['biosphere reserve', 0], ['seed bank', 1], ['zoo', 1], ['cryopreservation', 1], ['botanical garden', 1]], ['in situ', 'ex situ'], ''); } },
      { title: 'Facts', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['India’s share of world species?', 'about 8.1%'], ['India’s share of world land?', '2.4%'], ['Hotspots covering India?', 'Western Ghats–Sri Lanka, Indo-Burma, Himalaya'], ['Z for whole continents?', '0.6 to 1.2'], ['Who proposed rivet popper hypothesis?', 'Paul Ehrlich']]); } },
      { title: 'Why', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why are tropics more diverse?', 'stable, undisturbed for long periods, more solar energy'], ['Narrowly utilitarian reason for conservation?', 'direct products: food, medicine, timber'], ['Broadly utilitarian reason?', 'ecosystem services — oxygen, pollination, flood control'], ['Main cause of biodiversity loss?', 'habitat loss and fragmentation']]); } }
    ],
    quiz: [
      { q: 'Main cause of loss', o: ['habitat loss', 'hunting', 'aliens', 'co-extinction'], a: 0, e: 'Evil Quartet first.' }, { q: 'Z for small areas', o: ['0.1–0.2', '0.6–1.2', '1–2', '0'], a: 0, e: 'Regression slope.' },
      { q: 'Rivet popper', o: ['Ehrlich', 'Tilman', 'Humboldt', 'May'], a: 0, e: 'Analogy.' }, { q: 'Ex situ', o: ['seed bank', 'national park', 'sanctuary', 'sacred grove'], a: 0, e: 'Off-site.' },
      { q: 'Nile perch caused', o: ['cichlid extinction', 'more fish', 'nothing', 'algae loss'], a: 0, e: 'Alien.' }, { q: 'India’s species share', o: ['8.1%', '2.4%', '20%', '50%'], a: 0, e: 'Megadiverse.' },
      { q: 'Diversity highest at', o: ['tropics', 'poles', 'deserts', 'tundra'], a: 0, e: 'Latitude gradient.' }, { q: 'Sacred groves in', o: ['Khasi and Jaintia Hills', 'Thar only', 'Sundarbans only', 'none'], a: 0, e: 'Meghalaya.' },
      { q: 'Cryopreservation at', o: ['−196 °C', '0 °C', '−20 °C', '4 °C'], a: 0, e: 'Liquid N₂.' }, { q: 'Extinct bird of Mauritius', o: ['dodo', 'passenger pigeon', 'quagga', 'thylacine'], a: 0, e: 'Classic.' },
      { q: 'Species–area by', o: ['Humboldt', 'Darwin', 'Gause', 'Lindeman'], a: 0, e: 'Explorer.' }
    ],
    teach: {
      outcomes: ['Describe levels and patterns of biodiversity', 'Explain causes of loss (Evil Quartet)', 'Compare in situ and ex situ conservation'],
      periods: [{ t: 'Patterns', flow: [['10 min', 'India megadiversity map.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Latitudinal gradient discussion.']] }, { t: 'Loss and conservation', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Local conservation case.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Extinction is always natural.', 'Zoos are in situ.'], activities: ['School biodiversity survey.', 'Seed bank model.'],
      exit: ['Evil Quartet.', 'S = CA^Z.', 'Hotspots in India.'], homework: 'Write a case study of one Indian endangered species and its protection.'
    },
    slides: [{ t: 'Biodiversity and Conservation', b: ['Levels and patterns', 'Importance', 'Evil Quartet', 'In situ and ex situ'] }, { t: 'Think and share', b: ['Why save a species nobody uses?', 'What can students do locally?'] }],
    fs: { groups: [['Patterns', [['India', '2.4% land, 8.1% species'], ['Latitude', 'tropics richest'], ['S–A', 'S = CA^Z']]], ['Loss', [['Habitat', 'main cause'], ['Over-use', 'sea cow, pigeon'], ['Aliens', 'Nile perch, Parthenium'], ['Co-extinction', 'host–parasite']]], ['Conservation', [['In situ', 'hotspots, parks, groves'], ['Ex situ', 'zoos, seed banks, cryo']]]],
      ex: [['C 10, Z 0.2, A 1000', 'S ≈ 39.8'], ['Nile perch', 'alien species']], rem: ['Habitat loss first.', 'Z small vs continent.', '3 hotspots in India.'] }
  });
})();
