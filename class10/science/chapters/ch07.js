/*
TOOL:    class10_science_ch07
FAMILY:  CBSE_REVISION / Class 10 Science (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 7 How do Organisms Reproduce? (DNA copying and variation, asexual modes, vegetative propagation, tissue culture, sexual reproduction in plants and humans, reproductive health, contraception, STDs) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 7, part: 'All chapters', short: 'Reproduction', title: 'How do Organisms Reproduce?',
    blurb: 'Why DNA copying matters and why variation is useful; asexual modes — fission, fragmentation, regeneration, budding, vegetative propagation, spore formation, tissue culture; sexual reproduction in flowering plants (pollination, double fertilisation, seed, fruit) and in humans (male and female systems, menstrual cycle in outline, embryo, placenta); reproductive health, contraception and sexually transmitted infections.',
    revise: {
      oneLine: 'Reproduction copies DNA; small copying errors create variation, which helps populations survive change. Asexual reproduction (fission, budding, fragmentation, regeneration, spores, vegetative propagation) is quick and gives near clones. Sexual reproduction combines DNA from two parents through gametes with half the chromosome number. In flowers, pollination is followed by fertilisation; ovule → seed, ovary → fruit. In humans, fertilisation occurs in the oviduct and the embryo implants in the uterus; the placenta supplies nutrients and oxygen.',
      sections: [
        { h: 'Plants', html: `<p>Bisexual (hibiscus, mustard) or unisexual (papaya, watermelon) flowers. Pollen tube carries male gamete to the ovule; zygote → embryo; ovule → seed; ovary → fruit.</p>` },
        { h: 'Humans', html: `<p>Testes (outside body — lower temperature) make sperm and testosterone; ovaries release one egg a month and make oestrogen and progesterone. If no fertilisation, the uterine lining is shed (menstruation).</p>` },
        { h: 'Health', html: `<p>Contraception: barrier (condoms — also protect from STIs), hormonal (pills), IUDs, surgical methods. STIs: gonorrhoea, syphilis (bacterial); HIV-AIDS, warts (viral). Female foeticide is illegal; sex ratio matters to society.</p>` }
      ],
      formulas: [['Gametes', 'half chromosome number'], ['Zygote', 'gamete + gamete'], ['Ovule →', 'seed'], ['Ovary →', 'fruit'], ['Variation', 'DNA copying errors + sexual mixing']],
      terms: [['Tissue culture', 'growing new plants from a few cells in a nutrient medium'], ['Placenta', 'disc linking embryo and mother for exchange'], ['Puberty', 'age when reproductive organs mature']],
      traps: ['Pollination is not fertilisation.', 'Condoms (barrier methods) also reduce STI risk; pills do not.', 'Variation is useful for species survival, not necessarily for each individual.'],
      bridge: '<p>Ch 8 explains how traits pass on; Class 12 Biology covers reproduction in depth.</p>'
    },
    explore: [
      { title: 'Asexual or sexual?', intro: 'Sort the examples.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Asexual', 'Sexual'], items: [['Amoeba splitting', 0], ['Hydra budding', 0], ['mango seed formation', 1], ['potato eye sprouting', 0], ['human baby', 1], ['Planaria regrowing', 0], ['Rhizopus spores', 0], ['pea plant from pollinated flower', 1], ['orchid tissue culture', 0]] }); } },
      { title: 'Double the population', intro: 'Compare how numbers grow when bacteria divide every 20 minutes.',
        build(el, K) { let h = 3; const row = K.row(el); K.slider(row, 'hours', 1, 8, 1, h, v => { h = v; draw(); }); const rd = K.read(el);
          function draw() { const g = h * 3; const n = 2 ** g; rd.innerHTML = `${h} h = ${g} divisions → <b>${n.toLocaleString('en-IN')}</b> bacteria from 1 · asexual reproduction is fast, but all are near copies — one new antibiotic or change can wipe them out; variation helps survival`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Mode', gen(R) { return G9.S9.groupQ(R, [['Amoeba', 0], ['Plasmodium', 1], ['yeast', 2], ['Spirogyra', 3], ['Planaria', 4], ['Rhizopus', 5], ['Bryophyllum', 6]], ['binary fission', 'multiple fission', 'budding', 'fragmentation', 'regeneration', 'spore formation', 'vegetative propagation (leaf buds)'], 'Mode in '); } },
      { title: 'Chromosomes', gen(R) { const n = R.pick([8, 14, 20, 24, 46, 48]); return { q: `A body cell has ${n} chromosomes. How many in its gamete?`, a: String(n / 2), ans: n / 2 }; } },
      { title: 'Flower to fruit', gen(R) { return G9.S9.pickQ(R, [['Ovule becomes?', 'seed'], ['Ovary becomes?', 'fruit'], ['What carries male gamete to ovule?', 'pollen tube'], ['Example of unisexual flower?', 'papaya, watermelon'], ['Example of bisexual flower?', 'hibiscus, mustard']]); } },
      { title: 'Health', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Which contraceptive also protects from STIs?', 'condom (barrier method)'], ['Name two bacterial STIs.', 'gonorrhoea, syphilis'], ['Name a viral STI.', 'HIV-AIDS, warts'], ['Why are testes outside the abdomen?', 'sperm need a lower temperature'], ['Role of placenta?', 'supplies food and O₂, removes wastes']]); } },
      { title: 'Variation', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why is variation useful?', 'some individuals survive changed conditions'], ['Source of variation in asexual reproduction?', 'small DNA copying errors'], ['Why do gametes have half the chromosomes?', 'to keep the number constant after fertilisation'], ['Advantage of vegetative propagation?', 'faster, identical good traits, seedless plants']]); } }
    ],
    quiz: [
      { q: 'Budding in', o: ['yeast', 'Amoeba', 'Planaria', 'mango'], a: 0, e: 'Bud.' }, { q: 'Fertilisation in humans occurs in', o: ['oviduct', 'uterus', 'ovary', 'vagina'], a: 0, e: 'Fallopian tube.' },
      { q: 'Gamete chromosomes (human)', o: ['23', '46', '92', '12'], a: 0, e: 'Half.' }, { q: 'Ovary develops into', o: ['fruit', 'seed', 'flower', 'leaf'], a: 0, e: 'Fruit.' },
      { q: 'Regeneration in', o: ['Planaria', 'yeast', 'Amoeba', 'mango'], a: 0, e: 'Planaria.' }, { q: 'Embryo nourished by', o: ['placenta', 'ovary', 'testis', 'oviduct'], a: 0, e: 'Placenta.' },
      { q: 'HIV-AIDS is', o: ['viral STI', 'bacterial', 'fungal', 'genetic'], a: 0, e: 'Virus.' }, { q: 'Unisexual flower', o: ['papaya', 'hibiscus', 'mustard', 'rose'], a: 0, e: 'Papaya.' },
      { q: 'Tissue culture gives', o: ['many identical plants', 'seeds', 'variation', 'spores'], a: 0, e: 'Clones.' }, { q: 'Variation arises from', o: ['DNA copying errors', 'nothing', 'food', 'light'], a: 0, e: 'Errors.' },
      { q: 'Spore formation', o: ['Rhizopus', 'Hydra', 'yeast', 'Amoeba'], a: 0, e: 'Mould.' }
    ],
    teach: {
      outcomes: ['Explain DNA copying and variation', 'Describe asexual and sexual modes', 'Discuss reproductive health responsibly'],
      periods: [{ t: 'Asexual', flow: [['10 min', 'Yeast and bread mould slides.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Explore panel 2.']] }, { t: 'Sexual and health', flow: [['15 min', 'Flower dissection.'], ['15 min', 'Respectful health discussion.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Pollination = fertilisation.', 'Pills prevent STIs.'], activities: ['Flower dissection.', 'Bryophyllum leaf propagation.'],
      exit: ['Five asexual modes.', 'Flower to fruit.', 'Two health facts.'], homework: 'Grow a money plant or Bryophyllum from a cutting/leaf and record growth.'
    },
    slides: [{ t: 'How do Organisms Reproduce?', b: ['DNA copying and variation', 'Asexual modes', 'Sexual reproduction', 'Reproductive health'] }, { t: 'Think and share', b: ['Why is variation useful?', 'Why have half chromosomes in gametes?'] }],
    fs: { groups: [['Asexual', [['Fission', 'Amoeba, Plasmodium'], ['Budding', 'yeast, Hydra'], ['Regeneration', 'Planaria'], ['Vegetative', 'Bryophyllum, potato']]], ['Plants', [['Pollination', 'pollen → stigma'], ['Ovule → seed', 'ovary → fruit']]], ['Humans', [['Fertilisation', 'oviduct'], ['Placenta', 'exchange'], ['Health', 'barrier methods, STIs']]]],
      ex: [['46 chromosomes', 'gamete 23'], ['3 h at 20 min', '512 cells']], rem: ['Variation aids survival.', 'Gametes are haploid.', 'Health with respect.'] }
  });
})();
