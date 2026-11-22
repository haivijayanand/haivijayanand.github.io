/*
TOOL:    class4_science_ch05
FAMILY:  CBSE_REVISION / Class 4 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 5 Food for Health (energy, body-building and protective foods, balanced meal, millets, clean food, preserving food) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 5, part: 'Unit 3 · Health and Well-being', short: 'Food for health', title: 'Food for Health',
    blurb: 'Why we need food: energy-giving, body-building and protective foods, a balanced meal, millets and local seasonal food, clean and safe food, and simple ways of keeping food from spoiling.',
    revise: {
      oneLine: 'Energy-giving foods (rice, wheat, millets, potatoes, oil, jaggery) give us strength to work and play; body-building foods (dal, milk, eggs, paneer, fish, nuts) help us grow; protective foods (fruits and vegetables) keep us from falling ill. A balanced meal has all three, plus water.',
      sections: [
        { h: 'Three kinds of food', html: `<p>Energy: grains, millets, oils, sugar. Body-building: pulses, milk, eggs, meat, soybean. Protective: green leafy vegetables, carrots, oranges, amla.</p>` },
        { h: 'Millets and seasonal food', html: `<p>Ragi, bajra, jowar are nutritious and need less water to grow. Seasonal fruits are fresh and cheaper.</p>` },
        { h: 'Safe food', html: `<p>Wash fruits and vegetables, cover food, eat fresh food. Drying, salting, pickling and refrigeration slow spoiling.</p>` }
      ],
      formulas: [['Energy', 'grains, millets, oil, sugar'], ['Body-building', 'dal, milk, eggs, paneer'], ['Protective', 'fruits, vegetables'], ['Balanced meal', 'all three + water']],
      terms: [['Nutrients', 'useful parts of food'], ['Balanced diet', 'right amounts of all food types'], ['Preserve', 'keep food from spoiling']],
      traps: ['Junk food fills you up but gives little nutrition.', 'Fruits are protective, not mainly energy food.', 'Mouldy food must be thrown away.'],
      bridge: '<p>Ch 6 adds exercise, sleep and cleanliness to good food.</p>'
    },
    explore: [
      { title: 'Sort the foods', intro: 'Energy-giving, body-building or protective?',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Energy-giving', 'Body-building', 'Protective'], items: [['rice', 0], ['ragi roti', 0, 'millet'], ['jaggery', 0], ['moong dal', 1], ['milk', 1], ['egg', 1], ['spinach', 2], ['orange', 2], ['carrot', 2], ['groundnuts', 1, 'also give energy'], ['potato', 0]] }); } },
      { title: 'Plan a balanced lunch', intro: 'Pick one from each column.',
        build(el, K) { const E = ['rice', 'roti', 'ragi mudde', 'bajra roti'], B = ['dal', 'rajma', 'egg curry', 'paneer'], P = ['palak sabzi', 'cucumber salad', 'banana', 'mixed vegetables']; let e = 0, b = 0, p = 0; const row = K.row(el); K.select(row, 'energy', E, i => { e = i; draw(); }); K.select(row, 'body-building', B, i => { b = i; draw(); }); K.select(row, 'protective', P, i => { p = i; draw(); }); const rd = K.read(el);
          function draw() { rd.innerHTML = `<div style="font-size:24px">🍽️ ${E[e]} + ${B[b]} + ${P[p]} + 💧 water</div>a <b>balanced lunch</b>: energy to play, body-building to grow, protection from illness`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Food type', gen(R) { return G9.S9.groupQ(R, [['wheat', 0], ['paneer', 1], ['guava', 2], ['jowar', 0], ['soybean', 1], ['tomato', 2], ['ghee', 0], ['fish', 1]], ['energy-giving', 'body-building', 'protective'], 'Energy-giving, body-building or protective: '); } },
      { title: 'Millets', gen(R) { return G9.S9.pickQ(R, [['Name two millets.', 'ragi, bajra, jowar'], ['Why are millets good for farmers?', 'they need less water'], ['Why are millets good for us?', 'rich in nutrients and fibre']]); } },
      { title: 'Safe food', gen(R) { return G9.S9.pickQ(R, [['Why wash fruits before eating?', 'to remove dirt, germs and sprays'], ['Why cover cooked food?', 'flies and dust carry germs'], ['Name two ways to preserve food.', 'drying, salting, pickling, refrigeration'], ['What do you do with mouldy bread?', 'throw it away']]); } },
      { title: 'Count the plates', levels: [2, 3], gen(R) { const s = R.int(20, 40), r = R.int(2, 3); return { q: `A school serves ${s} children ${r} rotis each at lunch. How many rotis?`, a: String(s * r), ans: s * r }; } },
      { title: 'Junk food', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why is junk food unhealthy?', 'too much salt, sugar, fat; few nutrients'], ['Healthy snack instead of chips?', 'fruit, roasted chana, peanuts, sprouts'], ['What drink is best with meals?', 'water']]); } }
    ],
    quiz: [
      { q: 'Energy-giving food', o: ['rice', 'spinach', 'egg', 'orange'], a: 0, e: 'Grain.' }, { q: 'Body-building food', o: ['dal', 'jaggery', 'oil', 'cucumber'], a: 0, e: 'Protein.' },
      { q: 'Protective food', o: ['carrot', 'rice', 'paneer', 'sugar'], a: 0, e: 'Vegetable.' }, { q: 'Ragi is a', o: ['millet', 'fruit', 'pulse', 'oil'], a: 0, e: 'Millet.' },
      { q: 'A balanced meal has', o: ['all three food types + water', 'only rice', 'only sweets', 'only fruits'], a: 0, e: 'Balance.' }, { q: 'Mouldy food should be', o: ['thrown away', 'eaten', 'shared', 'heated and eaten'], a: 0, e: 'Unsafe.' },
      { q: 'Way to preserve food', o: ['drying', 'leaving open', 'adding dirt', 'wetting'], a: 0, e: 'Dry.' }, { q: 'Junk food has too much', o: ['salt, sugar, fat', 'vitamins', 'fibre', 'water'], a: 0, e: 'Unhealthy.' },
      { q: 'Millets need', o: ['less water to grow', 'more water', 'no sunlight', 'snow'], a: 0, e: 'Hardy.' }, { q: 'Fruits mainly', o: ['protect us from illness', 'build muscles', 'give oil', 'nothing'], a: 0, e: 'Vitamins.' },
      { q: 'Cover food to keep away', o: ['flies and dust', 'air', 'light', 'colour'], a: 0, e: 'Germs.' }
    ],
    teach: {
      outcomes: ['Classify foods by their use', 'Plan a balanced meal', 'Keep food safe'],
      periods: [{ t: 'Food groups', flow: [['10 min', 'Tiffin analysis.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Millet show-and-tell.']] }, { t: 'Balanced meal', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Food preservation at home.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Fruits are energy food mainly.', 'Junk food is a meal.'], activities: ['Balanced thali poster.', 'Millet recipe sharing.'],
      exit: ['One food of each type.', 'Plan a balanced dinner.', 'Two ways to preserve food.'], homework: 'Record your meals for 3 days; mark each food E, B or P.'
    },
    slides: [{ t: 'Food for Health', b: ['Energy, body-building, protective', 'Balanced meal', 'Millets', 'Safe food'] }, { t: 'Think and share', b: ['Is dal energy or body-building food?', 'Plan a healthy snack.'] }],
    fs: { groups: [['Food types', [['Energy', 'rice, roti, millets, oil'], ['Body-building', 'dal, milk, eggs, paneer'], ['Protective', 'fruits, vegetables']]], ['Healthy habits', [['Balanced meal', 'all three + water'], ['Millets', 'ragi, bajra, jowar']]], ['Safe food', [['Wash', 'fruits, vegetables'], ['Cover', 'cooked food'], ['Preserve', 'dry, salt, pickle, cool']]]],
      ex: [['Roti + dal + palak', 'balanced'], ['30 children × 2 rotis', '60 rotis']], rem: ['Eat all three types.', 'Choose local, seasonal food.', 'Junk only rarely.'] }
  });
})();
