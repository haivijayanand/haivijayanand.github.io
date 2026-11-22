/*
TOOL:    class4_science_ch09
FAMILY:  CBSE_REVISION / Class 4 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 9 Different Lands, Different Lives (deserts, mountains, coasts, plains, forests, snowy lands: houses, clothes, food, work) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const LAND = { 'Desert (Rajasthan)': ['hot days, cold nights, little rain', 'thick mud walls, small windows, flat roofs', 'loose cotton clothes, turbans', 'bajra, jowar, dal-baati; water stored carefully', 'camels, herding, crafts'], 'Mountains (Himachal, Ladakh)': ['cold; snow in winter', 'sloping roofs of stone/wood so snow slides off', 'woollen clothes', 'maize, barley, rajma, apples', 'yaks, sheep, terrace farming'], 'Coast (Kerala, Odisha)': ['hot and humid, heavy rain', 'sloping roofs, houses on raised ground', 'light cotton clothes', 'rice, fish, coconut', 'fishing, boats, coconut farming'], 'Plains (Punjab, Uttar Pradesh)': ['hot summers, cool winters', 'brick houses, courtyards', 'cotton in summer, wool in winter', 'wheat, rice, pulses, sugarcane', 'farming, dairy'], 'Forests and hills (Assam, Northeast)': ['heavy rain', 'houses on stilts of bamboo', 'light clothes, raincoats', 'rice, bamboo shoot, fish', 'farming, tea gardens, bamboo craft'] };
  G9.register({
    no: 9, part: 'Unit 5 · Our Environment', short: 'Lands and lives', title: 'Different Lands, Different Lives',
    blurb: 'How life changes with the land and weather across India — deserts, mountains, coasts, plains, rainy forests: the kinds of houses, clothes, food, animals and work people have, and how they make the best of their surroundings.',
    revise: {
      oneLine: 'People live in harmony with their land. In hot deserts, thick mud walls keep houses cool and water is saved; in cold mountains, sloping roofs shed snow and people wear wool; on coasts, people fish and eat rice and coconut; in rainy hills, houses stand on stilts.',
      sections: [
        { h: 'Houses', html: `<p>Mud houses (desert), sloping stone/wood roofs (mountains), stilt houses (rainy hills, floods), brick houses (plains), houseboats (Kashmir, Kerala).</p>` },
        { h: 'Food and clothes', html: `<p>Food grows where the land allows: bajra in the desert, rice where rain is plenty, apples on hills. Clothes suit the weather — wool when cold, cotton when hot.</p>` },
        { h: 'Animals and work', html: `<p>Camels in the desert, yaks in Ladakh, boats and fishing on the coast, farming on plains.</p>` }
      ],
      formulas: [['Desert', 'thick mud walls, save water, camels'], ['Mountains', 'sloping roofs, wool, yaks'], ['Coast', 'fishing, rice, coconut'], ['Rainy hills', 'stilt houses, bamboo']],
      terms: [['Climate', 'usual weather of a place'], ['Stilts', 'poles that raise a house'], ['Terrace farming', 'steps cut in hills for crops']],
      traps: ['Deserts can be cold at night.', 'Sloping roofs are for rain and snow, not decoration.', 'Every region has its own smart ways of living.'],
      bridge: '<p>Ch 10 looks up — at the sky over all these lands.</p>'
    },
    explore: [
      { title: 'Travel across India', intro: 'Choose a region to see its weather, homes, clothes, food and work.',
        build(el, K) { const keys = Object.keys(LAND); let k = 0; const row = K.row(el); K.select(row, 'region', keys, i => { k = i; draw(); }); const rd = K.read(el);
          function draw() { const L = LAND[keys[k]]; rd.innerHTML = `<b>${keys[k]}</b><table style="margin-top:6px">${['🌦️ weather', '🏠 houses', '👕 clothes', '🍚 food', '🐪 animals and work'].map((h, i) => `<tr><td style="padding:3px 10px">${h}</td><td style="padding:3px 10px">${L[i]}</td></tr>`).join('')}</table>`; } draw(); return null; } },
      { title: 'Match the house', intro: 'Sort the houses to the land where they suit best.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Desert', 'Snowy mountains', 'Rainy / flood land', 'Lakes and backwaters'], items: [['thick mud walls, small windows', 0], ['steep sloping roof', 1], ['bamboo house on stilts', 2], ['houseboat', 3], ['round hut with thatch to keep cool', 0], ['stone and wood house', 1], ['raised plinth house', 2]] }); } }
    ],
    gens: [
      { title: 'Which land?', gen(R) { return G9.S9.pickQ(R, [['Where are camels used to carry loads?', 'desert'], ['Where do people use yaks?', 'cold mountains (Ladakh)'], ['Where are houses built on stilts?', 'rainy hills and flood-prone areas'], ['Where do many people fish for a living?', 'the coast'], ['Where do people live in houseboats?', 'Kashmir lakes, Kerala backwaters']]); } },
      { title: 'Why this house?', gen(R) { return G9.S9.pickQ(R, [['Why do mountain houses have sloping roofs?', 'snow and rain slide off'], ['Why do desert houses have thick walls?', 'to keep the inside cool by day and warm at night'], ['Why build houses on stilts?', 'to stay above flood water and damp ground']]); } },
      { title: 'Food and climate', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why is bajra grown in deserts?', 'it needs little water'], ['Why is rice grown in rainy areas?', 'it needs lots of water'], ['Why do coastal people eat fish?', 'the sea is near'], ['Why do hill people grow crops on terraces?', 'flat steps on slopes hold soil and water']]); } },
      { title: 'Water in the desert', levels: [2, 3], gen(R) { const f = R.int(4, 8), l = R.int(10, 20); return { q: `A desert family of ${f} uses about ${l} litres each a day. How much water must be stored for a week?`, a: `${f * l * 7} litres`, ans: f * l * 7 }; } },
      { title: 'Clothes', gen(R) { return G9.S9.groupQ(R, [['Ladakh in winter', 0], ['Kerala coast', 1], ['Rajasthan afternoon', 1], ['Shimla in January', 0]], ['woollen clothes', 'light cotton clothes'], 'What clothes suit: '); } }
    ],
    quiz: [
      { q: 'Camels are used in', o: ['deserts', 'snow', 'sea', 'rainforests'], a: 0, e: 'Ship of the desert.' }, { q: 'Sloping roofs help', o: ['snow and rain slide off', 'decorate', 'keep animals', 'store water'], a: 0, e: 'Shed.' },
      { q: 'Houses on stilts are found in', o: ['rainy, flood areas', 'deserts', 'deserts only', 'cities only'], a: 0, e: 'Raised.' }, { q: 'Yaks live in', o: ['Ladakh', 'Kerala', 'Rajasthan', 'Goa'], a: 0, e: 'Cold.' },
      { q: 'Coastal food', o: ['rice, fish, coconut', 'bajra only', 'apples only', 'snow'], a: 0, e: 'Sea.' }, { q: 'Bajra grows with', o: ['little water', 'lots of water', 'snow', 'no sun'], a: 0, e: 'Hardy.' },
      { q: 'Houseboats are in', o: ['Kashmir and Kerala', 'Rajasthan', 'Ladakh deserts', 'Punjab fields'], a: 0, e: 'Water.' }, { q: 'Deserts at night are', o: ['cold', 'always hot', 'snowy', 'rainy'], a: 0, e: 'Cool.' },
      { q: 'Terrace farming is on', o: ['hills', 'sea', 'deserts', 'rivers'], a: 0, e: 'Steps.' }, { q: 'Woollen clothes suit', o: ['cold places', 'hot coasts', 'summer plains', 'deserts by day'], a: 0, e: 'Warm.' },
      { q: 'Thick mud walls keep houses', o: ['cool', 'wet', 'windy', 'dark only'], a: 0, e: 'Insulation.' }
    ],
    teach: {
      outcomes: ['Relate houses, food, clothes and work to land and climate', 'Appreciate diverse ways of life'],
      periods: [{ t: 'Lands of India', flow: [['10 min', 'Map of India: deserts, hills, coasts.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Group posters by region.']] }, { t: 'Homes', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Model houses with clay/sticks.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Deserts are always hot.', 'One way of life is "best".'], activities: ['House models.', 'Regional food fair.'],
      exit: ['Why stilt houses.', 'Food in a desert.', 'Clothes in Ladakh.'], homework: 'Talk to someone who has lived in another state; note their house, food and clothes.'
    },
    slides: [{ t: 'Different Lands, Different Lives', b: ['Deserts', 'Mountains', 'Coasts and plains', 'Rainy hills'] }, { t: 'Think and share', b: ['Why sloping roofs?', 'What is grown in a desert?'] }],
    fs: { groups: [['Desert', [['House', 'thick mud walls'], ['Food', 'bajra, jowar'], ['Animal', 'camel']]], ['Mountains', [['House', 'sloping roof'], ['Clothes', 'wool'], ['Animal', 'yak, sheep']]], ['Coast / rainy hills', [['Coast', 'fish, rice, coconut'], ['Rainy hills', 'stilt houses, bamboo']]]],
      ex: [['5 people × 15 L × 7 days', '525 L'], ['Ladakh roof', 'sloping']], rem: ['Homes suit the weather.', 'Food grows where water allows.', 'Respect every way of life.'] }
  });
})();
