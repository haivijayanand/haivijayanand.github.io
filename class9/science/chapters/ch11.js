/*
TOOL:    class9_science_ch11
FAMILY:  CBSE_REVISION / Class 9 Science (Exploration)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 11 Reproduction: How Life Continues (asexual: fission, budding, fragmentation, spores, vegetative propagation; sexual reproduction in flowering plants; human reproduction basics; reproductive health) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const AS = [['binary fission', 'Amoeba, bacteria — one cell splits into two'], ['multiple fission', 'Plasmodium — nucleus divides many times, many daughter cells'], ['budding', 'yeast, Hydra — a bud grows and separates'], ['fragmentation', 'Spirogyra — body breaks into pieces, each grows'], ['regeneration', 'Planaria — a part regrows the whole body'], ['spore formation', 'Rhizopus (bread mould) — spores in sporangia'], ['vegetative propagation', 'potato tubers, rose cuttings, Bryophyllum leaf buds, sugarcane stems']];
  G9.register({
    no: 11, part: 'All chapters', short: 'Reproduction', title: 'Reproduction: How Life Continues',
    blurb: 'Why organisms reproduce; asexual reproduction — fission, budding, fragmentation, regeneration, spores and vegetative propagation; sexual reproduction in flowering plants — flower parts, pollination, fertilisation, seed and fruit; human reproduction in outline and reproductive health.',
    revise: {
      oneLine: 'Reproduction continues a species. Asexual reproduction uses one parent and gives near-identical offspring quickly (fission, budding, fragmentation, spores, vegetative propagation). Sexual reproduction joins male and female gametes (fertilisation) to form a zygote, giving variation. In flowers: stamen (anther, filament) is male; pistil (stigma, style, ovary) is female; pollination transfers pollen; after fertilisation the ovule becomes the seed and the ovary the fruit.',
      sections: [
        { h: 'Vegetative propagation', html: `<p>Cuttings, layering, grafting; tissue culture produces many identical plants. Advantages: faster, keeps good traits, works for seedless plants (banana).</p>` },
        { h: 'Flowers', html: `<p>Self-pollination (same flower or plant) and cross-pollination (by insects, wind, water, birds). Pollen tube carries male gamete to the ovule.</p>` },
        { h: 'Humans', html: `<p>Testes make sperm; ovaries release eggs. Fertilisation in the oviduct; the embryo grows in the uterus, nourished through the placenta. Reproductive health: hygiene, awareness, informed choices.</p>` }
      ],
      formulas: [['Asexual', 'one parent, clones'], ['Sexual', 'two gametes, variation'], ['Ovule →', 'seed'], ['Ovary →', 'fruit'], ['Zygote', 'fertilised egg']],
      terms: [['Gamete', 'sex cell (sperm, egg)'], ['Pollination', 'transfer of pollen to stigma'], ['Fertilisation', 'fusion of male and female gametes']],
      traps: ['Pollination ≠ fertilisation.', 'Variation comes mainly from sexual reproduction.', 'Spores are asexual, not seeds.'],
      bridge: '<p>Class 10: How do Organisms Reproduce?; Class 12: reproduction in depth.</p>'
    },
    explore: [
      { title: 'Asexual methods', intro: 'Choose a method; see examples. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'method', AS.map(a => a[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { rd.innerHTML = `<b>${AS[k][0]}</b>: ${AS[k][1]}`; } const step = () => { k = (k + 1) % AS.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'From flower to fruit', intro: '<kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Flower', 'Stamens (anther + filament) make pollen; pistil (stigma, style, ovary) holds ovules.'], ['Pollination', 'Bees, wind or birds carry pollen to a stigma.'], ['Pollen tube', 'Pollen grows a tube down the style to the ovule.'], ['Fertilisation', 'Male gamete fuses with the egg → zygote.'], ['Seed and fruit', 'Ovule becomes the seed (with embryo); ovary ripens into the fruit; petals fall.'], ['Germination', 'Seed grows into a new plant when conditions are right.']] }); } }
    ],
    gens: [
      { title: 'Method', gen(R) { const a = R.pick(AS); return { q: `Example(s) of ${a[0]}?`, a: a[1] }; } },
      { title: 'Asexual or sexual', gen(R) { return G9.S9.groupQ(R, [['budding in yeast', 0], ['seed formation in mango', 1], ['fission in Amoeba', 0], ['fertilisation in humans', 1], ['potato tuber sprouting', 0], ['pollination and seed in pea', 1]], ['asexual', 'sexual'], 'Asexual or sexual: '); } },
      { title: 'Flower parts', gen(R) { const p = R.pick([['anther', 'makes pollen'], ['stigma', 'receives pollen'], ['ovary', 'contains ovules; becomes fruit'], ['ovule', 'contains egg; becomes seed'], ['petals', 'attract pollinators'], ['sepals', 'protect the bud']]); return { q: `Role of the ${p[0]}?`, a: p[1] }; } },
      { title: 'Fission count', levels: [2, 3], gen(R) { const h = R.pick([20, 30]), t = R.pick([2, 3, 4]); const g = t * 60 / h; return { q: `Bacteria divide by binary fission every ${h} min. From one cell, how many after ${t} h?`, a: String(2 ** g), ans: 2 ** g }; } },
      { title: 'Compare', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Advantage of asexual reproduction?', 'fast, one parent, good traits kept'], ['Advantage of sexual reproduction?', 'variation, helps survival in changing conditions'], ['Pollination vs fertilisation?', 'pollen transfer vs fusion of gametes'], ['Why use vegetative propagation for banana?', 'it is seedless; keeps desired traits']]); } }
    ],
    quiz: [
      { q: 'Budding', o: ['yeast', 'Amoeba', 'mango', 'Plasmodium'], a: 0, e: 'Bud.' }, { q: 'Binary fission', o: ['Amoeba', 'yeast', 'Rhizopus', 'rose'], a: 0, e: 'Split.' },
      { q: 'Ovary becomes', o: ['fruit', 'seed', 'petal', 'stamen'], a: 0, e: 'Fruit.' }, { q: 'Ovule becomes', o: ['seed', 'fruit', 'leaf', 'pollen'], a: 0, e: 'Seed.' },
      { q: 'Male part of flower', o: ['stamen', 'pistil', 'sepal', 'ovary'], a: 0, e: 'Stamen.' }, { q: 'Spores in', o: ['Rhizopus', 'Hydra', 'Planaria', 'mango'], a: 0, e: 'Mould.' },
      { q: 'Sexual reproduction gives', o: ['variation', 'exact copies', 'no offspring', 'spores only'], a: 0, e: 'Variety.' }, { q: 'Fertilisation forms', o: ['zygote', 'pollen', 'spore', 'bud'], a: 0, e: 'Zygote.' },
      { q: 'Bryophyllum reproduces by', o: ['leaf buds', 'seeds only', 'fission', 'spores'], a: 0, e: 'Vegetative.' }, { q: 'Multiple fission', o: ['Plasmodium', 'yeast', 'Hydra', 'rose'], a: 0, e: 'Malaria parasite.' },
      { q: 'Embryo nourished through', o: ['placenta', 'ovary', 'oviduct', 'testis'], a: 0, e: 'Placenta.' }
    ],
    teach: {
      outcomes: ['Compare asexual and sexual reproduction', 'Trace flower to fruit', 'Discuss reproductive health respectfully'],
      periods: [{ t: 'Asexual', flow: [['10 min', 'Yeast under microscope.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Set up potato and rose cuttings.']] }, { t: 'Flowers and humans', flow: [['15 min', 'Dissect a hibiscus.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Pollination = fertilisation.', 'Spores are seeds.'], activities: ['Flower dissection.', 'Bread mould watch.'],
      exit: ['Three asexual methods.', 'Flower parts.', 'Seed vs fruit origin.'], homework: 'Grow a plant from a cutting or tuber and record weekly.'
    },
    slides: [{ t: 'Reproduction: How Life Continues', b: ['Asexual methods', 'Flower parts', 'Pollination and fertilisation', 'Human reproduction and health'] }, { t: 'Think and share', b: ['Why do bananas grow from suckers?', 'Pollination vs fertilisation?'] }],
    fs: { groups: [['Asexual', [['Fission', 'Amoeba'], ['Budding', 'yeast, Hydra'], ['Spores', 'Rhizopus'], ['Vegetative', 'potato, rose']]], ['Flower', [['Stamen', 'male'], ['Pistil', 'female'], ['Ovule → seed', 'ovary → fruit']]], ['Sexual', [['Gametes', 'sperm + egg'], ['Zygote', 'fertilised egg'], ['Benefit', 'variation']]]],
      ex: [['20 min × 2 h', '64 cells'], ['Mango fruit', 'from ovary']], rem: ['One parent vs two.', 'Pollinate then fertilise.', 'Respect and hygiene.'] }
  });
})();
