/*
TOOL:    class8_science_ch12
FAMILY:  CBSE_REVISION / Class 8 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 12 How Nature Works in Harmony (ecosystem, biotic and abiotic, producers consumers decomposers, food chains and webs, energy flow, nutrient cycles, interdependence, human impact) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 12, part: 'All chapters', short: 'Ecosystems', title: 'How Nature Works in Harmony',
    blurb: 'Ecosystems with living (biotic) and non-living (abiotic) parts; producers, consumers and decomposers; food chains and food webs; energy flow and the 10% idea; recycling of nutrients; interdependence (pollination, seed dispersal); and how human activities upset the balance.',
    revise: {
      oneLine: 'An ecosystem is living things interacting with each other and their non-living surroundings. Producers (green plants) make food from sunlight; consumers eat others (herbivores, carnivores, omnivores); decomposers (bacteria, fungi) break down dead matter and return nutrients to soil. Energy flows one way along food chains, and only about 10% passes to the next level; nutrients cycle. Food webs make ecosystems stable; removing one species can upset many others.',
      sections: [
        { h: 'Food chains', html: `<p>Grass → grasshopper → frog → snake → eagle. Arrows show “is eaten by” — the direction of energy flow.</p>` },
        { h: 'Interdependence', html: `<p>Bees pollinate flowers; birds disperse seeds; vultures and decomposers clean up. Decline of vultures in India allowed carcasses to pile up.</p>` },
        { h: 'Human impact', html: `<p>Deforestation, pollution, overfishing and invasive species break links. Protected areas, sacred groves and reducing waste help restore harmony.</p>` }
      ],
      formulas: [['Producer', 'makes food (plants)'], ['Consumers', 'herbivore, carnivore, omnivore'], ['Decomposers', 'bacteria, fungi'], ['Energy to next level', '≈ 10%'], ['Energy flow', 'one way']],
      terms: [['Ecosystem', 'living + non-living parts interacting'], ['Food web', 'interlinked food chains'], ['Trophic level', 'feeding level in a chain']],
      traps: ['Arrows point from eaten to eater.', 'Energy is not recycled; nutrients are.', 'Decomposers are essential, not “dirty”.'],
      bridge: '<p>Class 10: Our Environment; Class 12: Ecosystem.</p>'
    },
    explore: [
      { title: 'Energy pyramid', intro: 'Set the energy captured by producers; see how much reaches each level (10% rule).',
        build(el, K) { let E = 10000; const row = K.row(el); K.slider(row, 'producer energy (kJ)', 1000, 100000, 1000, E, v => { E = v; b.redraw(); }); const b = new K.Board(el, { xmin: -5, xmax: 5, ymin: -0.2, ymax: 4.4, axes: false, grid: 0, aspect: 0.45 }); const rd = K.read(el); const L = ['producers (grass)', 'herbivores (deer)', 'carnivores (fox)', 'top carnivores (tiger)'];
          b.onDraw = () => { b.clear(); L.forEach((l, i) => { const w = 8 * (1 - i * 0.22); b.rect(-w / 2, i, w, 0.9, { fill: [C.blue, C.purple, C.orange, '#fbbf24'][i], color: '#fff', w: 2 }); b.text(0, i + 0.45, `${l}: ${(+(E / 10 ** i).toFixed(2)).toLocaleString('en-IN')} kJ`, { font: 'bold 12px', color: i === 3 ? '#1e293b' : '#fff' }); }); };
          rd.innerHTML = 'Only about <b>10%</b> of energy passes up each level; the rest is used for living and lost as heat — so food chains are short.'; b.redraw(); return null; } },
      { title: 'Role sorter', intro: 'Sort into producers, consumers and decomposers.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Producer', 'Consumer', 'Decomposer'], items: [['neem tree', 0], ['goat', 1], ['mushroom', 2], ['algae in a pond', 0], ['kingfisher', 1], ['soil bacteria', 2], ['grass', 0], ['tiger', 1], ['earthworm (feeds on dead leaves)', 2]] }); } }
    ],
    gens: [
      { title: '10% rule', gen(R) { const E = R.pick([1000, 5000, 10000, 20000, 50000]), l = R.int(1, 3); return { q: `Producers capture ${E} kJ. About how much reaches level ${l + 1} (${['herbivores', 'carnivores', 'top carnivores'][l - 1]})?`, a: `${E / 10 ** l} kJ`, ans: E / 10 ** l }; } },
      { title: 'Role', gen(R) { return G9.S9.groupQ(R, [['mango tree', 0], ['cow', 1], ['bread mould', 2], ['phytoplankton', 0], ['snake', 1], ['bacteria in compost', 2]], ['producer', 'consumer', 'decomposer'], 'Role of '); } },
      { title: 'Food chain', gen(R) { const ch = R.pick([['grass', 'deer', 'tiger'], ['algae', 'small fish', 'kingfisher'], ['leaves', 'caterpillar', 'sparrow'], ['grain', 'rat', 'snake']]); return { q: `Order this food chain: ${[ch[2], ch[0], ch[1]].join(', ')}`, a: ch.join(' → ') }; } },
      { title: 'Impact', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['What happens if frogs vanish from a field?', 'insects increase; snakes lose food'], ['Why are decomposers important?', 'return nutrients to soil; clean dead matter'], ['Why are food chains short?', 'energy is lost at each level'], ['Why are food webs more stable than chains?', 'animals have other food choices']]); } },
      { title: 'Biotic?', levels: [2, 3], gen(R) { return G9.S9.groupQ(R, [['sunlight', 1], ['fungi', 0], ['water', 1], ['earthworm', 0], ['soil minerals', 1], ['grass', 0]], ['biotic (living)', 'abiotic (non-living)'], 'Biotic or abiotic: '); } }
    ],
    quiz: [
      { q: 'Producer', o: ['green plant', 'tiger', 'mushroom', 'goat'], a: 0, e: 'Food maker.' }, { q: 'Decomposer', o: ['fungi', 'deer', 'grass', 'eagle'], a: 0, e: 'Breaks down.' },
      { q: 'Energy to next level', o: ['≈ 10%', '100%', '50%', '0%'], a: 0, e: 'Rule.' }, { q: 'Energy flow', o: ['one way', 'cyclic', 'random', 'none'], a: 0, e: 'Sun → ...' },
      { q: 'Arrow in food chain means', o: ['is eaten by', 'eats', 'lives with', 'is bigger'], a: 0, e: 'Energy direction.' }, { q: 'Abiotic', o: ['sunlight', 'bacteria', 'grass', 'frog'], a: 0, e: 'Non-living.' },
      { q: 'Bees help by', o: ['pollination', 'decomposing', 'producing food', 'eating trees'], a: 0, e: 'Flowers.' }, { q: 'Food web is', o: ['interlinked chains', 'one chain', 'a pyramid', 'a cell'], a: 0, e: 'Network.' },
      { q: 'Omnivore', o: ['eats plants and animals', 'only plants', 'only animals', 'only dead matter'], a: 0, e: 'Both.' }, { q: '10 000 kJ to herbivores', o: ['1000 kJ', '100 kJ', '10 000 kJ', '10 kJ'], a: 0, e: '10%.' },
      { q: 'Nutrients', o: ['cycle', 'flow one way', 'vanish', 'come from Moon'], a: 0, e: 'Recycled.' }
    ],
    teach: {
      outcomes: ['Identify ecosystem roles', 'Build food chains and webs', 'Apply the 10% rule'],
      periods: [{ t: 'Roles', flow: [['10 min', 'School-ground ecosystem walk.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Food web yarn game.']] }, { t: 'Energy', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Remove-a-species discussion.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Arrows point to food.', 'Energy recycles.'], activities: ['Yarn food web.', 'Compost pit observation.'],
      exit: ['Three roles.', '10% example.', 'One human impact.'], homework: 'Draw a food web of 6 organisms from your area.'
    },
    slides: [{ t: 'How Nature Works in Harmony', b: ['Ecosystem parts', 'Producers, consumers, decomposers', 'Food chains and webs', 'Energy and balance'] }, { t: 'Think and share', b: ['Why are food chains short?', 'What if vultures disappear?'] }],
    fs: { groups: [['Roles', [['Producer', 'plants'], ['Consumer', 'herbivore, carnivore, omnivore'], ['Decomposer', 'bacteria, fungi']]], ['Flow', [['Energy', 'one way, 10%'], ['Nutrients', 'cycle']]], ['Balance', [['Web', 'stable'], ['Threats', 'deforestation, pollution']]]],
      ex: [['20 000 kJ → level 3', '200 kJ'], ['grass → deer → tiger', 'chain']], rem: ['Arrow = eaten by.', 'Energy lost as heat.', 'Every species matters.'] }
  });
})();
