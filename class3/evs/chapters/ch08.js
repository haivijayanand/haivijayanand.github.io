/*
TOOL:    class3_science_ch08
FAMILY:  CBSE_REVISION / Class 3 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 8 Food We Eat (food from plants and animals, cooked and raw food, regional food, balanced plate, not wasting food) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 8, part: 'All chapters', short: 'Food', title: 'Food We Eat',
    blurb: 'Food that comes from plants and from animals, food we eat raw or cooked, food of different regions and seasons, a healthy plate with different kinds of food, and not wasting food.',
    revise: {
      oneLine: 'We get grains, pulses, vegetables, fruits and oils from plants, and milk, eggs, meat and honey from animals. Some foods are eaten raw (fruits, salad), others are cooked (rice, dal). Different regions eat different foods. Eat a variety, wash hands, and do not waste food.',
      sections: [
        { h: 'Plants and animals', html: `<p>Plants: rice, wheat, millets, dal, vegetables, fruits, oil, spices. Animals: milk, curd, paneer, eggs, fish, meat, honey.</p>` },
        { h: 'Raw and cooked', html: `<p>Raw: fruits, carrots, cucumber, sprouts. Cooked: rice, roti, dal, potatoes. Cooking makes some foods soft and safe.</p>` },
        { h: 'Healthy habits', html: `<p>Eat many colours of food, drink water, wash hands before eating, take only what you can finish.</p>` }
      ],
      formulas: [['From plants', 'grains, dal, vegetables, fruits, oil'], ['From animals', 'milk, eggs, fish, meat, honey'], ['Raw', 'fruits, salad'], ['Cooked', 'rice, roti, dal']],
      terms: [['Grain', 'rice, wheat, millets'], ['Pulse', 'dal, beans'], ['Regional food', 'food special to a place']],
      traps: ['Honey and milk come from animals.', 'Sugar comes from a plant (sugarcane).', 'Leftover food can be shared, not thrown.'],
      bridge: '<p>Ch 9 links food to staying healthy and happy.</p>'
    },
    explore: [
      { title: 'From plants or animals?', intro: 'Sort the foods.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['From plants', 'From animals'], items: [['rice', 0], ['milk', 1], ['honey', 1, 'made by bees'], ['dal', 0], ['egg', 1], ['banana', 0], ['paneer', 1, 'made from milk'], ['sugar', 0, 'from sugarcane'], ['ragi', 0, 'a millet'], ['fish', 1]] }); } },
      { title: 'Fill a healthy plate', intro: 'Choose how much of each kind of food; aim for a balanced plate.',
        build(el, K) { const T = [['🍚 grains (rice, roti, millets)', 3], ['🫘 dal / eggs / paneer', 2], ['🥕 vegetables', 3], ['🍌 fruit', 1], ['🍬 sweets / fried', 0]]; const v = T.map(t => t[1]); const row = K.row(el); T.forEach((t, i) => K.slider(row, t[0].split(' (')[0], 0, 5, 1, v[i], x => { v[i] = x; draw(); })); const rd = K.read(el);
          function draw() { const good = v[0] >= 2 && v[1] >= 1 && v[2] >= 2 && v[3] >= 1 && v[4] <= 1; rd.innerHTML = `<div style="font-size:24px">${T.map((t, i) => t[0].split(' ')[0].repeat(v[i])).join(' ')}</div>${good ? '<b>balanced plate</b> — energy, body-building food, vegetables and fruit' : 'add ' + [v[0] < 2 && 'grains', v[1] < 1 && 'dal/eggs', v[2] < 2 && 'vegetables', v[3] < 1 && 'fruit'].filter(Boolean).join(', ') + (v[4] > 1 ? ' · fewer sweets and fried food' : '')}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Plant or animal', gen(R) { return G9.S9.groupQ(R, [['wheat', 0], ['curd', 1], ['apple', 0], ['honey', 1], ['jowar', 0], ['egg', 1], ['groundnut oil', 0], ['ghee', 1]], ['from plants', 'from animals'], 'From plants or animals: '); } },
      { title: 'Raw or cooked', gen(R) { return G9.S9.groupQ(R, [['banana', 0], ['rice', 1], ['cucumber', 0], ['dal', 1], ['roti', 1], ['guava', 0], ['sprouts', 0]], ['usually raw', 'usually cooked'], 'Raw or cooked: '); } },
      { title: 'Regional food', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Name a food from South India.', 'idli, dosa, sambar, appam'], ['Name a food from Punjab.', 'makki di roti, sarson da saag'], ['Name a food from Gujarat.', 'dhokla, thepla'], ['Name a food from Bengal.', 'fish curry, rasgulla'], ['Name a millet food.', 'ragi mudde, bajra roti, jowar bhakri']]); } },
      { title: 'Healthy habits', gen(R) { return G9.S9.pickQ(R, [['What should you do before eating?', 'wash hands with soap'], ['How can we avoid wasting food?', 'take only what we can finish; share extra'], ['Why eat many kinds of food?', 'to get all that the body needs']]); } },
      { title: 'Count the rotis', levels: [2, 3], gen(R) { const p = R.int(3, 6), r = R.int(2, 4); return { q: `${p} people each eat ${r} rotis. How many rotis are needed?`, a: String(p * r), ans: p * r }; } }
    ],
    quiz: [
      { q: 'Honey comes from', o: ['bees', 'cows', 'trees', 'hens'], a: 0, e: 'Animal.' }, { q: 'Sugar comes from', o: ['sugarcane', 'cows', 'bees', 'salt'], a: 0, e: 'Plant.' },
      { q: 'Eaten raw', o: ['banana', 'rice', 'dal', 'roti'], a: 0, e: 'Fruit.' }, { q: 'Paneer is made from', o: ['milk', 'wheat', 'eggs', 'rice'], a: 0, e: 'Milk.' },
      { q: 'Ragi is a', o: ['millet', 'fruit', 'pulse', 'oil'], a: 0, e: 'Grain.' }, { q: 'Before eating we', o: ['wash hands', 'play outside', 'skip water', 'nothing'], a: 0, e: 'Germs.' },
      { q: 'Dal is a', o: ['pulse', 'fruit', 'animal food', 'sweet'], a: 0, e: 'Pulse.' }, { q: 'Idli is a food from', o: ['South India', 'Punjab', 'Bengal', 'Kashmir only'], a: 0, e: 'Region.' },
      { q: 'Too many sweets', o: ['are unhealthy', 'are balanced', 'are required', 'replace vegetables'], a: 0, e: 'Limit.' }, { q: 'Leftover good food can be', o: ['shared', 'thrown on road', 'burnt', 'hidden'], a: 0, e: 'No waste.' },
      { q: 'Egg comes from', o: ['hen', 'plant', 'bee', 'fish'], a: 0, e: 'Animal.' }
    ],
    teach: {
      outcomes: ['Classify food from plants and animals', 'Distinguish raw and cooked food', 'Plan a balanced plate and avoid waste'],
      periods: [{ t: 'Where food comes from', flow: [['10 min', 'Tiffin talk.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Regional food map.']] }, { t: 'Healthy plate', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Draw your plate.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Honey from plants.', 'Junk food is a meal.'], activities: ['Tiffin sharing day.', 'Grow sprouts in class.'],
      exit: ['Two plant foods, two animal foods.', 'One raw and one cooked.', 'A balanced plate.'], homework: 'Ask at home: which food is special to your family or region? Draw it and list its ingredients.'
    },
    slides: [{ t: 'Food We Eat', b: ['From plants and animals', 'Raw and cooked', 'Regional foods', 'Balanced plate, no waste'] }, { t: 'Think and share', b: ['Is honey from a plant?', 'What did you eat today?'] }],
    fs: { groups: [['From plants', [['Grains', 'rice, wheat, millets'], ['Pulses', 'dal'], ['Others', 'vegetables, fruits, oil, sugar']]], ['From animals', [['Milk foods', 'curd, paneer, ghee'], ['Others', 'eggs, fish, meat, honey']]], ['Habits', [['Wash hands', 'before eating'], ['Balanced plate', 'grains + dal + vegetables + fruit'], ['No waste', 'take what you finish']]]],
      ex: [['Honey', 'from bees'], ['5 people × 3 rotis', '15 rotis']], rem: ['Eat many colours.', 'Wash hands.', 'Do not waste food.'] }
  });
})();
