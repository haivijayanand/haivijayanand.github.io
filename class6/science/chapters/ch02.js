/*
TOOL:    class6_science_ch02
FAMILY:  CBSE_REVISION / Class 6 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 2 Diversity in the Living World (variety of plants and animals, grouping by features, plant types, leaf venation and roots, habitats and adaptations) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 2, part: 'All chapters', short: 'Diversity of life', title: 'Diversity in the Living World',
    blurb: 'The huge variety of living things, grouping plants and animals by their features, herbs–shrubs–trees–climbers–creepers, leaf venation and root types, animals with and without backbones, and adaptations to habitats like deserts, mountains and water.',
    revise: {
      oneLine: 'Living things show great diversity. We group them by shared features. Plants: herbs, shrubs, trees, climbers, creepers. Leaves with net-like veins (reticulate) usually have taproots; leaves with parallel veins usually have fibrous roots. Animals are grouped as with or without a backbone. Each living thing has adaptations that suit its habitat.',
      sections: [
        { h: 'Plants', html: `<p>Reticulate venation + taproot: mustard, mango, hibiscus. Parallel venation + fibrous roots: grass, wheat, maize, banana.</p>` },
        { h: 'Animals', html: `<p>Vertebrates (backbone): fish, frogs, reptiles, birds, mammals. Invertebrates: insects, worms, snails, spiders.</p>` },
        { h: 'Habitats and adaptations', html: `<p>Camel: long legs, humps of fat, little water loss. Fish: gills, fins, streamlined. Yak: thick fur. Cactus: spines, fleshy stem storing water.</p>` }
      ],
      formulas: [['Reticulate venation', 'taproot'], ['Parallel venation', 'fibrous roots'], ['Vertebrate', 'has backbone'], ['Adaptation', 'feature suiting the habitat']],
      terms: [['Diversity', 'variety'], ['Habitat', 'place where an organism lives'], ['Adaptation', 'special feature for survival']],
      traps: ['Bat is a mammal, not a bird.', 'Whales are mammals, not fish.', 'Venation–root link is a rule of thumb with exceptions.'],
      bridge: '<p>Ch 10 explores characteristics of living creatures.</p>'
    },
    explore: [
      { title: 'Leaf veins and roots', intro: 'Choose a plant; see its leaf venation and root type.',
        build(el, K) { const PL = [['mustard', 1], ['grass', 0], ['mango', 1], ['wheat', 0], ['hibiscus', 1], ['maize', 0]]; let k = 0; const row = K.row(el); K.select(row, 'plant', PL.map(p => p[0]), i => { k = i; b.redraw(); }); const b = new K.Board(el, { xmin: -4, xmax: 4, ymin: -3, ymax: 3, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const net = PL[k][1]; b.poly([[-2, 2.8], [-0.6, 1], [-2, -0.6], [-3.4, 1]], { fill: '#bbf7d0', color: '#15803d', w: 2 }); b.line(-2, -0.6, -2, 2.8, { color: '#15803d', w: 2 });
            if (net) { for (let y = 0; y <= 2; y += 0.5) { b.line(-2, y, -2 + 0.9 - Math.abs(y - 1) * 0.6, y + 0.4, { color: '#15803d', w: 1 }); b.line(-2, y, -2 - 0.9 + Math.abs(y - 1) * 0.6, y + 0.4, { color: '#15803d', w: 1 }); } } else { [-0.4, -0.2, 0.2, 0.4].forEach(d => b.line(-2 + d * 0.4, -0.4, -2 + d * 2.2, 1.9, { color: '#15803d', w: 1 })); }
            b.line(2, 2, 2, 0, { color: '#15803d', w: 3 }); if (net) { b.line(2, 0, 2, -2.6, { color: '#a16207', w: 5 }); [-0.5, -1.2, -1.9].forEach(y => { b.line(2, y, 2.6, y - 0.5, { color: '#a16207', w: 2 }); b.line(2, y, 1.4, y - 0.5, { color: '#a16207', w: 2 }); }); } else { for (let i = -4; i <= 4; i++) b.line(2, 0, 2 + i * 0.22, -2 + Math.abs(i) * 0.1, { color: '#a16207', w: 2 }); }
            rd.innerHTML = `<b>${PL[k][0]}</b>: ${net ? 'reticulate (net-like) venation → <b>taproot</b> (one main root with side roots)' : 'parallel venation → <b>fibrous roots</b> (many thin roots of equal size)'}`; };
          b.redraw(); return null; } },
      { title: 'Group the animals', intro: 'Sort.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Fish', 'Amphibians / reptiles', 'Birds', 'Mammals', 'Invertebrates'], items: [['rohu', 0], ['frog', 1], ['lizard', 1], ['sparrow', 2], ['bat', 3, 'gives birth, feeds milk, has hair'], ['whale', 3, 'breathes air, feeds milk'], ['butterfly', 4], ['earthworm', 4], ['penguin', 2, 'a bird that swims']] }); } }
    ],
    gens: [
      { title: 'Venation and roots', gen(R) { return G9.S9.groupQ(R, [['tulsi', 0], ['rice', 1], ['rose', 0], ['bamboo', 1], ['pea', 0], ['onion', 1]], ['reticulate veins, taproot', 'parallel veins, fibrous roots'], 'Leaf and root type of '); } },
      { title: 'Plant type', gen(R) { return G9.S9.groupQ(R, [['banyan', 0], ['tulsi', 1], ['wheat', 2], ['money plant', 3], ['pumpkin (on the ground)', 4]], ['tree', 'shrub', 'herb', 'climber', 'creeper'], 'Plant type: '); } },
      { title: 'Adaptations', gen(R) { return G9.S9.pickQ(R, [['Name two adaptations of a camel.', 'long legs, humps with fat, thick eyelashes, little water loss'], ['Why does a cactus have spines?', 'leaves reduced to spines lose less water; protect from animals'], ['How are fish adapted to water?', 'gills, fins, streamlined body, scales'], ['How is a yak adapted to cold?', 'thick long fur, fat']]); } },
      { title: 'Vertebrate?', gen(R) { return G9.S9.groupQ(R, [['snake', 0], ['snail', 1], ['crow', 0], ['spider', 1], ['tortoise', 0], ['cockroach', 1]], ['vertebrate', 'invertebrate'], 'Vertebrate or invertebrate: '); } },
      { title: 'Count kinds', levels: [2, 3], gen(R) { const t = R.int(8, 20), s = R.int(5, 15), h = R.int(10, 30); return { q: `A survey found ${t} kinds of trees, ${s} of shrubs and ${h} of herbs. Total kinds? What fraction are trees?`, a: `${t + s + h}; ${t}/${t + s + h}` , ans: t + s + h }; } }
    ],
    quiz: [
      { q: 'Grass has', o: ['parallel veins, fibrous roots', 'net veins, taproot', 'no roots', 'no veins'], a: 0, e: 'Monocot.' }, { q: 'Mustard has', o: ['taproot', 'fibrous roots', 'no roots', 'aerial roots only'], a: 0, e: 'Net veins.' },
      { q: 'Bat is a', o: ['mammal', 'bird', 'insect', 'reptile'], a: 0, e: 'Milk, hair.' }, { q: 'Whale is a', o: ['mammal', 'fish', 'amphibian', 'reptile'], a: 0, e: 'Breathes air.' },
      { q: 'Cactus spines are', o: ['modified leaves', 'roots', 'flowers', 'fruits'], a: 0, e: 'Less water loss.' }, { q: 'Invertebrate', o: ['earthworm', 'frog', 'crow', 'cow'], a: 0, e: 'No backbone.' },
      { q: 'Money plant is a', o: ['climber', 'tree', 'herb', 'shrub'], a: 0, e: 'Support.' }, { q: 'Camel stores fat in', o: ['hump', 'legs', 'tail', 'neck'], a: 0, e: 'Hump.' },
      { q: 'Habitat means', o: ['where an organism lives', 'its food', 'its colour', 'its age'], a: 0, e: 'Home.' }, { q: 'Fish breathe with', o: ['gills', 'lungs', 'skin only', 'fins'], a: 0, e: 'Gills.' },
      { q: 'Diversity means', o: ['variety', 'sameness', 'pollution', 'growth'], a: 0, e: 'Variety.' }
    ],
    teach: {
      outcomes: ['Group plants and animals by features', 'Relate venation to roots', 'Explain adaptations to habitats'],
      periods: [{ t: 'Plants', flow: [['10 min', 'Collect leaves and weeds.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Venation and root chart.']] }, { t: 'Animals and habitats', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Adaptation cards.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Bats are birds.', 'Whales are fish.'], activities: ['Herbarium sheets.', 'Habitat diorama.'],
      exit: ['Venation-root pair.', 'Two vertebrates, two invertebrates.', 'One adaptation.'], homework: 'Make a mini herbarium of 5 leaves with venation type and the plant’s root type.'
    },
    slides: [{ t: 'Diversity in the Living World', b: ['Grouping living things', 'Venation and roots', 'Vertebrates and invertebrates', 'Habitats and adaptations'] }, { t: 'Think and share', b: ['Root type of wheat?', 'Why is a bat a mammal?'] }],
    fs: { groups: [['Plants', [['Herb / shrub / tree', 'by stem'], ['Climber / creeper', 'weak stems'], ['Reticulate', 'taproot'], ['Parallel', 'fibrous roots']]], ['Animals', [['Vertebrates', 'fish, amphibians, reptiles, birds, mammals'], ['Invertebrates', 'insects, worms, snails']]], ['Adaptations', [['Camel', 'hump, long legs'], ['Cactus', 'spines, fleshy stem'], ['Fish', 'gills, fins']]]],
      ex: [['Maize', 'parallel veins, fibrous roots'], ['Whale', 'mammal']], rem: ['Group by features.', 'Check venation to guess roots.', 'Adaptations fit habitats.'] }
  });
})();
