/*
TOOL:    class12_biology_ch01
FAMILY:  CBSE_REVISION / Class 12 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 1 Sexual Reproduction in Flowering Plants (flower structure, microsporogenesis, megasporogenesis, embryo sac, pollination, outbreeding devices, double fertilisation, endosperm, embryo, seed, fruit, apomixis, polyembryony) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 1, part: 'Unit VI · Reproduction', short: 'Plant reproduction', title: 'Sexual Reproduction in Flowering Plants',
    blurb: 'Flower — the site of sexual reproduction; pre-fertilisation events: stamen, microsporangium and microsporogenesis, pollen grain; pistil, megasporangium (ovule), megasporogenesis and the 7-celled 8-nucleate embryo sac; pollination (autogamy, geitonogamy, xenogamy), agents of pollination, outbreeding devices, pollen–pistil interaction, artificial hybridisation (emasculation, bagging); double fertilisation; post-fertilisation events — endosperm, embryo, seed and fruit; apomixis and polyembryony.',
    revise: {
      oneLine: 'Pollen mother cell (2n) → meiosis → tetrad of microspores (n) → pollen grain with vegetative and generative cells (2-celled at shedding in most plants); exine is made of sporopollenin. Megaspore mother cell → meiosis → 4 megaspores, one functional → three mitoses → embryo sac with 7 cells and 8 nuclei (egg apparatus of 2 synergids + egg, 3 antipodals, central cell with 2 polar nuclei): monosporic Polygonum type. Double fertilisation: one male gamete + egg → zygote (2n); other + two polar nuclei → primary endosperm nucleus (3n). Endosperm develops before embryo; dicot embryo: two cotyledons; monocot: one scutellum, coleoptile and coleorhiza.',
      sections: [
        { h: 'Pollination', html: '<p>Autogamy (same flower; cleistogamous flowers ensure it), geitonogamy (another flower of same plant — genetically like autogamy), xenogamy (different plant). Wind: light pollen, feathery stigma (grasses, maize). Water: Vallisneria, Hydrilla, Zostera. Insects: bright colour, nectar, scent.</p>' },
        { h: 'Outbreeding devices', html: '<p>Pollen release and stigma receptivity not synchronised; anther and stigma at different positions; self-incompatibility; unisexual flowers (dioecy — papaya).</p>' },
        { h: 'Apomixis', html: '<p>Seeds without fertilisation (some Asteraceae, grasses); polyembryony — more than one embryo (citrus, mango). Useful to keep hybrid vigour.</p>' }
      ],
      formulas: [['Embryo sac', '7 cells, 8 nuclei'], ['Zygote', 'n + n = 2n'], ['PEN', 'n + n + n = 3n'], ['Pollen at shedding', '2-celled (60% of angiosperms)']],
      terms: [['Sporopollenin', 'most resistant organic material, in exine'], ['Emasculation', 'removing anthers before dehiscence'], ['Perisperm', 'persistent nucellus in seed (black pepper, beet)']],
      traps: ['Geitonogamy is functionally cross but genetically self.', 'Endosperm is triploid; in coconut it is both liquid and cellular.', 'True fruit develops only from ovary; false fruit (apple, strawberry) from thalamus too.'],
      bridge: '<p>Ch 2 follows reproduction in humans.</p>'
    },
    explore: [
      { title: 'Ploidy finder', intro: 'Pick a structure; see its ploidy and origin.',
        build(el, K) { const P = [['pollen mother cell', '2n', 'sporogenous tissue of anther'], ['microspore / pollen', 'n', 'meiosis of PMC'], ['tapetum cell', '2n (often multinucleate)', 'anther wall — nourishes pollen'], ['megaspore mother cell', '2n', 'nucellus'], ['functional megaspore', 'n', 'meiosis of MMC'], ['egg cell', 'n', 'embryo sac'], ['synergid', 'n', 'embryo sac (filiform apparatus guides pollen tube)'], ['antipodal cell', 'n', 'chalazal end of embryo sac'], ['zygote', '2n', 'egg + male gamete (syngamy)'], ['primary endosperm nucleus', '3n', 'two polar nuclei + male gamete (triple fusion)'], ['nucellus / perisperm', '2n', 'ovule tissue'], ['seed coat (testa)', '2n', 'integuments of ovule'], ['fruit wall (pericarp)', '2n', 'ovary wall']]; let k = 9; const row = K.row(el); K.select(row, 'structure', P.map(p => p[0]), i => { k = i; draw(); }).value = 9; const rd = K.read(el);
          function draw() { const p = P[k]; rd.innerHTML = `<b>${p[0]}</b> · ploidy <b>${p[1]}</b> · from: ${p[2]}`; } draw(); return null; } },
      { title: 'Pollination sorter', intro: 'Sort by pollinating agent.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['wind', 'water', 'insects/animals'], items: [['maize', 0], ['grasses', 0], ['Vallisneria', 1], ['Zostera (sea grass)', 1], ['Hydrilla', 1], ['Salvia', 2], ['Amorphophallus', 2], ['Yucca (with moth)', 2], ['light, non-sticky pollen', 0], ['bright colour and nectar', 2]] }); } }
    ],
    gens: [
      { title: 'Ploidy', gen(R) { return G9.S9.groupQ(R, [['egg', 0], ['zygote', 1], ['endosperm', 2], ['nucellus', 1], ['synergid', 0], ['pollen grain', 0], ['integument', 1]], ['n', '2n', '3n'], 'Ploidy of '); } },
      { title: 'Count', gen(R) { const c = R.pick([['Pollen grains from 1 PMC', 4], ['Functional megaspores from 1 MMC', 1], ['Nuclei in a mature embryo sac', 8], ['Cells in a mature embryo sac', 7], ['Male gametes from 1 pollen grain', 2], ['Meiotic divisions to form 100 pollen grains', 25]]); return { q: `${c[0]}?`, a: `${c[1]}`, ans: c[1] }; } },
      { title: 'Pollination type', gen(R) { return G9.S9.groupQ(R, [['pollen to stigma of same flower', 0], ['pollen to another flower, same plant', 1], ['pollen to another plant', 2], ['cleistogamous flowers', 0]], ['autogamy', 'geitonogamy', 'xenogamy'], ''); } },
      { title: 'Seed & fruit', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Ovule develops into?', 'seed'], ['Ovary develops into?', 'fruit'], ['Integuments become?', 'seed coat'], ['Example of false fruit?', 'apple, strawberry, cashew'], ['Example of parthenocarpic fruit?', 'banana'], ['Perisperm found in?', 'black pepper, beet']]); } },
      { title: 'Why', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why is emasculation needed in crossing?', 'prevents self-pollination of female parent'], ['Why does endosperm form before embryo?', 'to nourish the developing embryo'], ['Why are pollen fossils well preserved?', 'exine has sporopollenin'], ['Why is apomixis useful to farmers?', 'hybrid seeds keep characters; no need to buy new seed each year']]); } }
    ],
    quiz: [
      { q: 'Endosperm ploidy', o: ['3n', '2n', 'n', '4n'], a: 0, e: 'Triple fusion.' }, { q: 'Embryo sac nuclei', o: ['8', '7', '4', '2'], a: 0, e: '7 cells.' },
      { q: 'Exine is made of', o: ['sporopollenin', 'cellulose', 'pectin', 'lignin'], a: 0, e: 'Resistant.' }, { q: 'Water pollination', o: ['Vallisneria', 'maize', 'Salvia', 'rose'], a: 0, e: 'Hydrophily.' },
      { q: 'Geitonogamy is', o: ['genetically self', 'genetically cross', 'apomixis', 'none'], a: 0, e: 'Same plant.' }, { q: 'Polyembryony in', o: ['citrus', 'wheat', 'pea', 'rice'], a: 0, e: 'Nucellar embryos.' },
      { q: 'Filiform apparatus in', o: ['synergids', 'antipodals', 'egg', 'tapetum'], a: 0, e: 'Guides tube.' }, { q: 'Seed coat from', o: ['integuments', 'ovary wall', 'nucellus', 'endosperm'], a: 0, e: 'Testa.' },
      { q: 'Dioecious', o: ['papaya', 'castor', 'maize', 'pea'], a: 0, e: 'Unisexual plants.' }, { q: 'Monocot embryo cotyledon', o: ['scutellum', 'plumule', 'radicle', 'epicotyl'], a: 0, e: 'Grasses.' },
      { q: 'Nutritive anther layer', o: ['tapetum', 'endothecium', 'epidermis', 'middle layer'], a: 0, e: 'Innermost.' }
    ],
    teach: {
      outcomes: ['Trace micro- and megasporogenesis', 'Classify pollination and outbreeding devices', 'Explain double fertilisation and seed/fruit formation'],
      periods: [{ t: 'Pre-fertilisation', flow: [['10 min', 'Hibiscus flower dissection.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Embryo sac diagram.']] }, { t: 'Pollination to seed', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Double fertilisation flow.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Endosperm is diploid.', 'All fruits come from ovary only.'], activities: ['Pollen germination on sugar solution.', 'Soaked seed dissection.'],
      exit: ['Embryo sac cells.', 'Double fertilisation.', 'Outbreeding device.'], homework: 'Draw a labelled embryo sac and L.S. of a pistil after pollination.'
    },
    slides: [{ t: 'Sexual Reproduction in Flowering Plants', b: ['Microsporogenesis and pollen', 'Megasporogenesis and embryo sac', 'Pollination', 'Double fertilisation, seed, fruit'] }, { t: 'Think and share', b: ['Why do grasses have feathery stigmas?', 'Why is coconut water endosperm?'] }],
    fs: { groups: [['Male', [['PMC', '2n → 4 microspores'], ['Pollen', 'vegetative + generative'], ['Exine', 'sporopollenin']]], ['Female', [['MMC', '→ 1 functional megaspore'], ['Embryo sac', '7 cells, 8 nuclei'], ['Egg apparatus', '2 synergids + egg']]], ['After', [['Zygote', '2n'], ['PEN', '3n'], ['Ovule/ovary', 'seed/fruit']]]],
      ex: [['100 pollen grains', '25 meioses'], ['Coconut water', 'free-nuclear endosperm']], rem: ['Triple fusion 3n.', 'Geitonogamy = self genetically.', 'Apomixis keeps hybrids.'] }
  });
})();
