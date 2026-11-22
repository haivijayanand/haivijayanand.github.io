/*
TOOL:    class11_biology_ch03
FAMILY:  CBSE_REVISION / Class 11 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 3 Plant Kingdom (algae, bryophytes, pteridophytes, gymnosperms, angiosperms, life cycles and alternation of generations) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const GR = [['Algae', 'thalloid; mostly aquatic; Chlorophyceae (green, chl a b, starch), Phaeophyceae (brown, fucoxanthin, laminarin), Rhodophyceae (red, r-phycoerythrin, floridean starch)', 'Chlamydomonas, Spirogyra, Fucus, Polysiphonia'], ['Bryophytes', 'amphibians of the plant kingdom; dominant haploid gametophyte; no vascular tissue; need water for fertilisation', 'Funaria, Marchantia, Sphagnum'], ['Pteridophytes', 'first vascular plants; dominant diploid sporophyte with roots, stems, leaves; prothallus gametophyte', 'ferns, Selaginella, Equisetum'], ['Gymnosperms', 'naked seeds; no ovary; wind pollination; needle-like leaves', 'Pinus, Cycas, Ginkgo'], ['Angiosperms', 'seeds enclosed in fruits; flowers; double fertilisation; monocots and dicots', 'mango, wheat, rose']];
  G9.register({
    no: 3, part: 'Unit I · Diversity', short: 'Plant kingdom', title: 'Plant Kingdom',
    blurb: 'Artificial, natural and phylogenetic classification; algae (green, brown, red) and their economic importance; bryophytes (liverworts, mosses); pteridophytes; gymnosperms; angiosperms; plant life cycles — haplontic, diplontic, haplo-diplontic — and alternation of generations.',
    revise: {
      oneLine: 'Algae are simple thalloid autotrophs (green, brown, red by pigments and stored food). Bryophytes have a dominant haploid gametophyte and need water for fertilisation. Pteridophytes are the first vascular plants with a dominant sporophyte; some are heterosporous (Selaginella, Salvinia) — a step towards seeds. Gymnosperms bear naked ovules; angiosperms enclose seeds in fruits and show double fertilisation (triploid endosperm). Life cycles: haplontic (most algae), diplontic (seed plants, Fucus), haplo-diplontic (bryophytes, pteridophytes, Ectocarpus).',
      sections: [
        { h: 'Algae uses', html: '<p>Agar (Gelidium, Gracilaria), algin (brown algae), carrageen (red), Chlorella as food supplement; algae fix half of the world’s CO₂.</p>' },
        { h: 'Bryophytes', html: '<p>Sphagnum (peat) as fuel and packing; mosses help in plant succession on rocks.</p>' },
        { h: 'Seed habit', html: '<p>Heterospory → megaspore retained on parent → seed. Gymnosperm endosperm is haploid; angiosperm endosperm is triploid.</p>' }
      ],
      formulas: [['Green algae', 'chl a, b; starch'], ['Brown algae', 'fucoxanthin; laminarin'], ['Red algae', 'r-phycoerythrin; floridean starch'], ['Bryophytes', 'gametophyte dominant'], ['Pteridophytes', 'sporophyte dominant, vascular'], ['Angiosperm endosperm', '3n']],
      terms: [['Thallus', 'body not differentiated into root, stem, leaf'], ['Heterospory', 'two kinds of spores (micro, mega)'], ['Alternation of generations', 'haploid gametophyte ↔ diploid sporophyte']],
      traps: ['Gymnosperms have no fruits.', 'Bryophyte sporophyte depends on the gametophyte.', 'Fucus is diplontic though it is an alga.'],
      bridge: '<p>Ch 5–6 describe angiosperm structure in detail.</p>'
    },
    explore: [
      { title: 'Plant groups', intro: 'Choose a group. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'group', GR.map(g => g[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { rd.innerHTML = `<b>${GR[k][0]}</b>: ${GR[k][1]} · e.g., <i>${GR[k][2]}</i>`; } const step = () => { k = (k + 1) % GR.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Life cycle types', intro: 'Sort the organisms.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Haplontic', 'Diplontic', 'Haplo-diplontic'], items: [['Chlamydomonas', 0], ['Spirogyra', 0], ['Fucus', 1, 'an alga with diplontic cycle'], ['mango', 1], ['Pinus', 1], ['Funaria', 2], ['fern', 2], ['Ectocarpus', 2], ['Polysiphonia', 2]] }); } }
    ],
    gens: [
      { title: 'Group', gen(R) { return G9.S9.groupQ(R, [['Spirogyra', 0], ['Marchantia', 1], ['Selaginella', 2], ['Cycas', 3], ['sunflower', 4], ['Sphagnum', 1], ['Equisetum', 2]], GR.map(g => g[0]), 'Group of '); } },
      { title: 'Algae class', gen(R) { return G9.S9.groupQ(R, [['Chlamydomonas', 0], ['Fucus', 1], ['Polysiphonia', 2], ['Volvox', 0], ['Laminaria', 1], ['Porphyra', 2]], ['Chlorophyceae', 'Phaeophyceae', 'Rhodophyceae'], 'Algal class of '); } },
      { title: 'Ploidy', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Ploidy of moss plant body?', 'haploid (gametophyte)'], ['Ploidy of fern plant body?', 'diploid (sporophyte)'], ['Ploidy of gymnosperm endosperm?', 'haploid'], ['Ploidy of angiosperm endosperm?', 'triploid'], ['Ploidy of fern prothallus?', 'haploid']]); } },
      { title: 'Uses', gen(R) { return G9.S9.pickQ(R, [['Source of agar?', 'Gelidium, Gracilaria (red algae)'], ['What is peat?', 'compressed Sphagnum moss used as fuel'], ['Which algae are eaten in space diets?', 'Chlorella'], ['Source of algin?', 'brown algae']]); } },
      { title: 'Concepts', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why are bryophytes “amphibians” of plants?', 'live on land but need water for fertilisation'], ['Which pteridophytes are heterosporous?', 'Selaginella, Salvinia'], ['Why is heterospory important?', 'precursor to the seed habit'], ['Key difference gymnosperm vs angiosperm?', 'naked seeds vs seeds in fruits']]); } }
    ],
    quiz: [
      { q: 'Brown algae pigment', o: ['fucoxanthin', 'phycoerythrin', 'chl b only', 'carotene only'], a: 0, e: 'Phaeophyceae.' }, { q: 'Dominant in bryophytes', o: ['gametophyte', 'sporophyte', 'both', 'neither'], a: 0, e: 'Haploid.' },
      { q: 'First vascular plants', o: ['pteridophytes', 'bryophytes', 'algae', 'angiosperms'], a: 0, e: 'Ferns.' }, { q: 'Naked seeds', o: ['gymnosperms', 'angiosperms', 'ferns', 'mosses'], a: 0, e: 'No ovary.' },
      { q: 'Angiosperm endosperm', o: ['3n', 'n', '2n', '4n'], a: 0, e: 'Double fertilisation.' }, { q: 'Agar from', o: ['red algae', 'green algae', 'mosses', 'fungi'], a: 0, e: 'Gelidium.' },
      { q: 'Heterosporous', o: ['Selaginella', 'Funaria', 'Spirogyra', 'mango'], a: 0, e: 'Two spores.' }, { q: 'Diplontic alga', o: ['Fucus', 'Chlamydomonas', 'Spirogyra', 'Volvox'], a: 0, e: 'Exception.' },
      { q: 'Red algae food', o: ['floridean starch', 'starch', 'laminarin', 'glycogen'], a: 0, e: 'Stored.' }, { q: 'Peat from', o: ['Sphagnum', 'Funaria', 'Fucus', 'Pinus'], a: 0, e: 'Moss.' },
      { q: 'Fern gametophyte', o: ['prothallus', 'protonema', 'thallus root', 'cone'], a: 0, e: 'Heart-shaped.' }
    ],
    teach: {
      outcomes: ['Classify plants into major groups', 'Compare life cycles', 'Relate features to evolution'],
      periods: [{ t: 'Groups', flow: [['10 min', 'Specimen tray.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Algae pigments chart.']] }, { t: 'Life cycles', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Draw alternation of generations.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Mosses are tiny ferns.', 'Gymnosperms have fruits.'], activities: ['Fern sorus observation.', 'Moss in a jar.'],
      exit: ['Five groups.', 'Three algae classes.', 'Life cycle types.'], homework: 'Collect and identify 5 plants from different groups near your home.'
    },
    slides: [{ t: 'Plant Kingdom', b: ['Algae', 'Bryophytes and pteridophytes', 'Gymnosperms and angiosperms', 'Life cycles'] }, { t: 'Think and share', b: ['Why do mosses need water?', 'How did seeds evolve?'] }],
    fs: { groups: [['Algae', [['Green', 'chl a b, starch'], ['Brown', 'fucoxanthin, laminarin'], ['Red', 'phycoerythrin, floridean starch']]], ['Land plants', [['Bryophytes', 'n dominant'], ['Pteridophytes', '2n, vascular'], ['Gymno', 'naked seeds'], ['Angio', 'fruits, 3n endosperm']]], ['Life cycles', [['Haplontic', 'most algae'], ['Diplontic', 'seed plants, Fucus'], ['Haplo-diplontic', 'bryophytes, ferns']]]],
      ex: [['Selaginella', 'heterosporous pteridophyte'], ['Polysiphonia', 'red alga, haplo-diplontic']], rem: ['Pigment = class.', 'Dominant phase matters.', 'Seeds from heterospory.'] }
  });
})();
