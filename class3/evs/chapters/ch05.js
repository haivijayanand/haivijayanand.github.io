/*
TOOL:    class3_science_ch05
FAMILY:  CBSE_REVISION / Class 3 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 5 Plants and Animals Live Together (homes in trees, food from plants, animals help plants, life in the soil, bird calls) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 5, part: 'All chapters', short: 'Living together', title: 'Plants and Animals Live Together',
    blurb: 'How plants and animals depend on each other: trees as homes and food, animals that spread seeds and carry pollen, small creatures that keep the soil healthy, listening to birds, and simple food chains.',
    revise: {
      oneLine: 'Plants give animals food and shelter — birds nest in trees, squirrels live in hollows, insects eat leaves and nectar. Animals help plants back: bees and butterflies carry pollen, birds and animals spread seeds, and earthworms and other small creatures keep the soil rich.',
      sections: [
        { h: 'Homes', html: `<p>Nests on branches, a tailorbird stitches leaves, owls and squirrels in hollows, ants and termites in soil and mounds.</p>` },
        { h: 'Helping each other', html: `<p>Bees drink nectar and carry pollen from flower to flower; fruits eaten by birds spread seeds far away; earthworms loosen soil.</p>` },
        { h: 'Food chains', html: `<p>grass → grasshopper → frog → snake. Plants are the start of every food chain.</p>` }
      ],
      formulas: [['Plants give', 'food, shelter, shade'], ['Animals give', 'pollination, seed spreading, rich soil'], ['Food chain starts with', 'plants'], ['Soil life', 'earthworms, ants, beetles, millipedes']],
      terms: [['Shelter', 'safe covered place'], ['Pollen', 'yellow dust in flowers'], ['Food chain', 'who eats whom']],
      traps: ['Insects and worms are not "dirty" — they keep soil healthy.', 'Do not disturb nests.', 'A food chain arrow means "is eaten by".'],
      bridge: '<p>Ch 6 explores living in harmony with nature.</p>'
    },
    explore: [
      { title: 'Who lives where?', intro: 'Sort the animals by where they make their home.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['On / in a tree', 'In the soil', 'In water'], items: [['sparrow nest', 0], ['squirrel', 0, 'in a tree hollow'], ['tailorbird', 0, 'stitches leaves into a nest'], ['earthworm', 1], ['ant', 1], ['termite', 1, 'mounds of soil'], ['fish', 2], ['frog (tadpole stage)', 2], ['owl', 0], ['millipede', 1]] }); } },
      { title: 'A food chain', intro: 'Press <kbd>S</kbd> to add the next link.',
        build(el, K) { const L = [['🌿', 'grass', 'makes its own food from sunlight'], ['🦗', 'grasshopper', 'eats grass'], ['🐸', 'frog', 'eats the grasshopper'], ['🐍', 'snake', 'eats the frog'], ['🦅', 'eagle', 'eats the snake']]; return G9.S9.stages(el, K, { stages: L.map((x, i) => [x[1], `${L.slice(0, i + 1).map(y => y[0]).join(' → ')} — the ${x[1]} ${x[2]}.`]) }); } }
    ],
    gens: [
      { title: 'Homes', gen(R) { return G9.S9.pickQ(R, [['Which bird stitches leaves to make a nest?', 'tailorbird'], ['Where does a squirrel live?', 'in a tree hollow'], ['Which insects build mounds of soil?', 'termites'], ['Where does an earthworm live?', 'in the soil'], ['Where do owls rest by day?', 'tree hollows']]); } },
      { title: 'Helping plants', gen(R) { return G9.S9.pickQ(R, [['How do bees help plants?', 'carry pollen from flower to flower'], ['How do birds help plants?', 'spread seeds by eating fruits'], ['How do earthworms help plants?', 'loosen and enrich the soil'], ['What do plants give animals?', 'food and shelter']]); } },
      { title: 'Food chain', levels: [2, 3], gen(R) { const ch = R.pick([['grass', 'grasshopper', 'frog', 'snake'], ['leaves', 'caterpillar', 'bird', 'cat'], ['grass', 'deer', 'tiger'], ['plants', 'rabbit', 'fox']]); const i = R.int(1, ch.length - 1); return { q: `In the food chain ${ch.map((x, j) => j === i ? '___' : x).join(' → ')}, what is missing?`, a: ch[i] }; } },
      { title: 'Count the nests', gen(R) { const t = R.int(2, 6), n = R.int(2, 5); return { q: `${t} trees each have ${n} nests. How many nests?`, a: String(t * n), ans: t * n }; } },
      { title: 'Care', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why should we not break nests?', 'eggs and baby birds will die; birds lose their home'], ['How can you help birds in summer?', 'keep a bowl of water in the shade'], ['Why should we not cut old trees?', 'they are homes and food for many animals']]); } }
    ],
    quiz: [
      { q: 'Tailorbird nest is made of', o: ['stitched leaves', 'mud', 'stones', 'plastic'], a: 0, e: 'Stitches.' }, { q: 'Bees help by', o: ['carrying pollen', 'eating roots', 'cutting leaves', 'digging'], a: 0, e: 'Pollination.' },
      { q: 'Earthworms live in', o: ['soil', 'trees', 'air', 'water only'], a: 0, e: 'Soil.' }, { q: 'Every food chain starts with', o: ['plants', 'tigers', 'snakes', 'people'], a: 0, e: 'Producers.' },
      { q: 'grass → ? → frog', o: ['grasshopper', 'eagle', 'snake', 'cow'], a: 0, e: 'Insect.' }, { q: 'Birds spread seeds by', o: ['eating fruits', 'building nests', 'singing', 'sleeping'], a: 0, e: 'Droppings.' },
      { q: 'Termites build', o: ['mounds', 'nests of leaves', 'webs', 'shells'], a: 0, e: 'Soil.' }, { q: 'Plants give animals', o: ['food and shelter', 'nothing', 'only shade', 'only wood'], a: 0, e: 'Both.' },
      { q: 'Squirrels live in', o: ['tree hollows', 'ponds', 'burrows under water', 'nests of mud'], a: 0, e: 'Hollow.' }, { q: 'Disturbing nests is', o: ['harmful', 'helpful', 'fun', 'needed'], a: 0, e: 'Harm.' },
      { q: 'A millipede lives in', o: ['soil and leaf litter', 'trees only', 'sky', 'sea'], a: 0, e: 'Soil.' }
    ],
    teach: {
      outcomes: ['Describe how animals depend on plants', 'Describe how animals help plants', 'Build a simple food chain'],
      periods: [{ t: 'Homes and food', flow: [['10 min', 'Listen to bird calls outside.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Tree survey: who lives here?']] }, { t: 'Helping each other', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Soil digging: find small creatures.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Insects are only pests.', 'Arrows point to the eater as "eats".'], activities: ['Bird-call recording.', 'Soil creature hunt with a lens.'],
      exit: ['Two animal homes in trees.', 'How bees help.', 'Make a food chain.'], homework: 'Keep a water bowl for birds for a week and note which birds come.'
    },
    slides: [{ t: 'Plants and Animals Live Together', b: ['Homes in plants', 'Animals help plants', 'Life in the soil', 'Food chains'] }, { t: 'Think and share', b: ['Who lives in a tree hollow?', 'Complete: leaves → ? → bird'] }],
    fs: { groups: [['Plants give', [['Food', 'leaves, fruits, nectar'], ['Shelter', 'nests, hollows']]], ['Animals give', [['Bees, butterflies', 'carry pollen'], ['Birds', 'spread seeds'], ['Earthworms', 'rich, loose soil']]], ['Food chain', [['Example', 'grass → grasshopper → frog → snake'], ['Start', 'always plants']]]],
      ex: [['Tailorbird', 'stitches leaf nest'], ['leaves → caterpillar → bird', 'food chain']], rem: ['Do not disturb nests.', 'Soil creatures are helpers.', 'Plants start food chains.'] }
  });
})();
