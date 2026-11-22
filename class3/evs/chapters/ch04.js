/*
TOOL:    class3_science_ch04
FAMILY:  CBSE_REVISION / Class 3 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 4 Getting to Know Plants (parts of a plant, trees shrubs herbs climbers, leaves and bark, plants as friends) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 4, part: 'All chapters', short: 'Plants', title: 'Getting to Know Plants',
    blurb: 'Making friends with a plant: its parts (root, stem, leaf, flower, fruit, seed), big and small plants (trees, shrubs, herbs, climbers), leaves of different shapes, smells and bark patterns, and how plants help us.',
    revise: {
      oneLine: 'A plant has roots (hold it and take in water), a stem (holds it up, carries water), leaves (make food using sunlight), flowers (become fruits) and fruits with seeds (grow into new plants). Plants can be tall trees, bushy shrubs, small herbs or climbers.',
      sections: [
        { h: 'Parts of a plant', html: `<p>Root → stem → leaves; flower → fruit → seed. A tomato plant shows all of these.</p>` },
        { h: 'Kinds of plants', html: `<p>Tree: tall, one thick woody trunk (neem, mango). Shrub: bushy, many woody stems (rose, tulsi). Herb: small, soft green stem (grass, coriander). Climber: weak stem, needs support (money plant, bottle gourd).</p>` },
        { h: 'Using our senses', html: `<p>Leaves differ in shape, size, edge and smell (mint, tulsi, curry leaf). Bark rubbings show patterns.</p>` }
      ],
      formulas: [['Root', 'holds, takes water'], ['Stem', 'supports, carries water'], ['Leaf', 'makes food'], ['Flower', 'becomes fruit'], ['Seed', 'new plant']],
      terms: [['Trunk', 'thick stem of a tree'], ['Bark', 'outer covering of trunk'], ['Climber', 'needs support to grow up']],
      traps: ['All plants are not trees.', 'Never taste unknown leaves or fruits.', 'Roots are under the soil — still part of the plant.'],
      bridge: '<p>Ch 5 shows plants and animals living together.</p>'
    },
    explore: [
      { title: 'Parts of a tomato plant', intro: 'Click a part (or press <kbd>S</kbd>) to see what it does.',
        build(el, K) { return G9.S9.parts(el, K, { board: { xmin: -3, xmax: 3, ymin: -2.6, ymax: 3.4, axes: false, grid: 0, equal: true },
          draw(b) { b.rect(-3, -2.6, 6, 1.6, { fill: 'rgba(161,98,7,.25)', color: 'none' }); [[-0.3, -1.7], [0.4, -2.1], [0, -2.4], [-0.6, -2.2]].forEach(p => b.line(0, -1, p[0], p[1], { color: '#a16207', w: 3 })); b.line(0, -1, 0, 2.6, { color: '#15803d', w: 6 });
            [[1, 0.2, 1], [-1, 0.9, -1], [1, 1.7, 1]].forEach(([s, y, d]) => b.poly([[0, y], [d * 0.7, y + 0.35], [d * 1.4, y + 0.1], [d * 0.7, y - 0.2]], { fill: '#4ade80', color: '#15803d', w: 2 })); b.circle(0, 2.8, 0.2, { fill: '#facc15', color: '#a16207' }); b.circle(-0.7, 0.1, 0.35, { fill: '#ef4444', color: '#991b1b', w: 2 }); b.line(0, 0.5, -0.7, 0.4, { color: '#15803d', w: 2 }); },
          parts: [['root', 0, -1.9, 'under the soil; holds the plant firmly and takes in water and minerals.', 0.6], ['stem', 0, 1.1, 'holds the plant up and carries water to the leaves and food to all parts.'], ['leaf', 1.0, 1.9, 'green; makes food for the plant using sunlight, air and water.', 0.5], ['flower', 0, 2.8, 'yellow tomato flower; it turns into a fruit.'], ['fruit', -0.7, 0.1, 'the red tomato; it has seeds inside.', 0.5], ['seed', -0.7, 0.1, 'inside the fruit; it can grow into a new tomato plant.', 0.25]] }); } },
      { title: 'Tree, shrub, herb or climber?', intro: 'Sort the plants.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Tree', 'Shrub', 'Herb', 'Climber'], items: [['mango', 0], ['neem', 0], ['rose', 1], ['tulsi', 1, 'bushy, woody stem'], ['grass', 2], ['coriander', 2], ['money plant', 3], ['bottle gourd', 3, 'climbs with tendrils'], ['banyan', 0], ['mint', 2]] }); } }
    ],
    gens: [
      { title: 'Plant parts', gen(R) { return G9.S9.pickQ(R, [['Which part holds the plant in the soil?', 'root'], ['Which part makes food?', 'leaf'], ['Which part becomes a fruit?', 'flower'], ['Which part carries water up?', 'stem'], ['What grows into a new plant?', 'seed']]); } },
      { title: 'Kind of plant', gen(R) { return G9.S9.groupQ(R, [['peepal', 0], ['hibiscus', 1], ['spinach', 2], ['grapevine', 3], ['coconut', 0], ['lemon grass', 2], ['jasmine bush', 1], ['pumpkin', 3]], ['tree', 'shrub', 'herb', 'climber'], 'Tree, shrub, herb or climber: '); } },
      { title: 'Which part do we eat?', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Carrot — which part?', 'root'], ['Spinach — which part?', 'leaf'], ['Potato — which part?', 'stem (underground)'], ['Cauliflower — which part?', 'flower'], ['Mango — which part?', 'fruit'], ['Rice — which part?', 'seed']]); } },
      { title: 'Senses', gen(R) { return G9.S9.pickQ(R, [['Name a leaf with a strong smell.', 'mint, tulsi or curry leaf'], ['How can you copy the pattern of bark?', 'bark rubbing with paper and crayon'], ['Should you taste an unknown leaf?', 'no — it may be poisonous']]); } },
      { title: 'Plants help us', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Name three things we get from plants.', 'food, wood, cotton, medicine, shade, oxygen'], ['Why should we not cut trees?', 'they give shade, fruit, homes for birds, clean air'], ['How can you care for a plant?', 'water, sunlight, protect from harm']]); } }
    ],
    quiz: [
      { q: 'Makes food for the plant', o: ['leaf', 'root', 'seed', 'bark'], a: 0, e: 'Sunlight.' }, { q: 'Holds the plant in soil', o: ['root', 'flower', 'leaf', 'fruit'], a: 0, e: 'Under soil.' },
      { q: 'Mango is a', o: ['tree', 'herb', 'climber', 'shrub'], a: 0, e: 'Big trunk.' }, { q: 'Money plant is a', o: ['climber', 'tree', 'shrub', 'herb'], a: 0, e: 'Needs support.' },
      { q: 'Carrot is a', o: ['root', 'stem', 'leaf', 'flower'], a: 0, e: 'Root.' }, { q: 'Flower turns into', o: ['fruit', 'root', 'stem', 'bark'], a: 0, e: 'Then seeds.' },
      { q: 'Coriander is a', o: ['herb', 'tree', 'climber', 'shrub'], a: 0, e: 'Soft stem.' }, { q: 'Bark covers the', o: ['trunk', 'leaf', 'flower', 'seed'], a: 0, e: 'Outer layer.' },
      { q: 'A new plant grows from a', o: ['seed', 'leaf only', 'stone', 'bark'], a: 0, e: 'Seed.' }, { q: 'Tasting unknown leaves is', o: ['unsafe', 'safe', 'good', 'required'], a: 0, e: 'Poison risk.' },
      { q: 'Rose is a', o: ['shrub', 'tree', 'climber', 'herb'], a: 0, e: 'Bushy.' }
    ],
    teach: {
      outcomes: ['Name parts of a plant and their work', 'Classify trees, shrubs, herbs, climbers', 'Observe plants with senses safely'],
      periods: [{ t: 'Parts', flow: [['10 min', 'Uproot a weed; observe parts.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Label a drawing.']] }, { t: 'Kinds of plants', flow: [['15 min', 'Nature walk.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Roots are not part of the plant.', 'All plants are trees.'], activities: ['Adopt a plant friend.', 'Leaf and bark rubbings.'],
      exit: ['Label five parts.', 'One example of each kind.', 'Which part of potato do we eat?'], homework: 'Adopt a plant near home: draw it weekly, note new leaves and flowers.'
    },
    slides: [{ t: 'Getting to Know Plants', b: ['Parts and their work', 'Trees, shrubs, herbs, climbers', 'Leaves and bark', 'Plants help us'] }, { t: 'Think and share', b: ['Which part of spinach do we eat?', 'Name a climber.'] }],
    fs: { groups: [['Parts', [['Root', 'holds, takes water'], ['Stem', 'supports, carries'], ['Leaf', 'makes food'], ['Flower → fruit', 'seeds inside']]], ['Kinds', [['Tree', 'mango, neem'], ['Shrub', 'rose, tulsi'], ['Herb', 'grass, coriander'], ['Climber', 'money plant, gourd']]], ['Parts we eat', [['Root', 'carrot'], ['Stem', 'potato'], ['Leaf', 'spinach'], ['Flower', 'cauliflower']]]],
      ex: [['Tomato plant', 'root, stem, leaf, flower, fruit, seed'], ['Tulsi', 'shrub']], rem: ['Observe, do not taste.', 'Every part has a job.', 'Care for plant friends.'] }
  });
})();
