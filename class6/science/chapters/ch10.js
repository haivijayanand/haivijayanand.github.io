/*
TOOL:    class6_science_ch10
FAMILY:  CBSE_REVISION / Class 6 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 10 Living Creatures: Exploring their Characteristics (living vs non-living, growth, respiration, response, excretion, reproduction, germination conditions, life cycles) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 10, part: 'All chapters', short: 'Living things', title: 'Living Creatures: Exploring their Characteristics',
    blurb: 'What makes something living — movement, need for food, growth, breathing and respiration, response to stimuli, excretion, reproduction and a life span; conditions for seed germination (water, air, warmth); and life cycles of a frog and a mosquito.',
    revise: {
      oneLine: 'Living things need food, grow, respire, respond to stimuli, excrete wastes, reproduce and have a fixed life span; non-living things do not show all of these. Seeds stay dormant until they get water, air and suitable warmth to germinate. Many animals change form through life cycles: egg → tadpole → frog; egg → larva → pupa → adult mosquito.',
      sections: [
        { h: 'Signs of life', html: `<p>Plants move too (sunflower turns, touch-me-not folds). A car moves and uses fuel but cannot grow or reproduce — so it is non-living.</p>` },
        { h: 'Germination', html: `<p>Soaked seeds in moist cotton germinate; dry seeds, seeds under boiled cooled water (no air) or in a fridge (too cold) do not.</p>` },
        { h: 'Life cycles', html: `<p>Frog: eggs → tadpole → tadpole with legs → froglet → frog. Mosquito: egg → larva → pupa → adult (in stagnant water — so remove stagnant water).</p>` }
      ],
      formulas: [['Living', 'food, growth, respiration, response, excretion, reproduction, life span'], ['Germination', 'water + air + warmth'], ['Frog', 'egg → tadpole → frog'], ['Mosquito', 'egg → larva → pupa → adult']],
      terms: [['Stimulus', 'change that causes a response'], ['Germination', 'seed starting to grow'], ['Life span', 'time from birth to death']],
      traps: ['Movement alone does not mean living.', 'Plants respond and move slowly.', 'Seeds are alive though dormant.'],
      bridge: '<p>Class 8 studies cells, the units of life.</p>'
    },
    explore: [
      { title: 'Germination test', intro: 'Choose what a seed gets; see whether it germinates.',
        build(el, K) { let w = 1, a = 1, t = 1; const row = K.row(el); const s1 = K.select(row, 'water', ['none (dry)', 'moist cotton'], i => { w = i; draw(); }); const s2 = K.select(row, 'air', ['no (under boiled water + oil)', 'yes'], i => { a = i; draw(); }); const s3 = K.select(row, 'temperature', ['cold (refrigerator)', 'warm (room)'], i => { t = i; draw(); }); s1.value = 1; s2.value = 1; s3.value = 1; const rd = K.read(el);
          function draw() { const ok = w && a && t; const miss = [!w && 'water', !a && 'air', !t && 'warmth'].filter(Boolean); rd.innerHTML = `<span style="font-size:42px">${ok ? '🌱' : '🫘'}</span> ${ok ? '<b>germinates</b> — it has water, air and warmth' : `<b>does not germinate</b> — missing: ${miss.join(', ')}`}`; } draw(); return null; } },
      { title: 'Living or non-living?', intro: 'Sort.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Living', 'Non-living'], items: [['mango tree', 0], ['car', 1, 'moves but cannot grow or reproduce'], ['mushroom', 0], ['cloud', 1, 'grows and moves but is not alive'], ['dry seed', 0, 'alive but dormant'], ['robot', 1], ['earthworm', 0], ['fire', 1, 'uses air and spreads but is not alive']] }); } }
    ],
    gens: [
      { title: 'Signs of life', gen(R) { return G9.S9.pickQ(R, [['Name four features of living things.', 'need food, grow, respire, respond, excrete, reproduce'], ['A car moves and uses fuel. Why is it non-living?', 'it cannot grow, reproduce or respond like living things'], ['Give an example of a plant responding to a stimulus.', 'touch-me-not leaves fold when touched'], ['What is excretion?', 'removing wastes from the body']]); } },
      { title: 'Germination', gen(R) { const a = R.pick([['no water', 'water'], ['no air', 'air'], ['too cold', 'warmth']]); return { q: `A seed is kept with ${a[0]}. Will it germinate? What is missing?`, a: `no — it needs ${a[1]}` }; } },
      { title: 'Life cycle order', gen(R) { return R.chance(.5) ? { q: 'Order the stages of a frog: frog, tadpole, egg, froglet', a: 'egg → tadpole → froglet → frog' } : { q: 'Order the stages of a mosquito: pupa, adult, egg, larva', a: 'egg → larva → pupa → adult' }; } },
      { title: 'Germination count', levels: [2, 3], gen(R) { const n = R.int(10, 40), g = R.int(5, n - 2); return { q: `${n} seeds were soaked and ${g} germinated. What percent germinated?`, a: `${+(100 * g / n).toFixed(1)}%`, ans: 100 * g / n, tol: 0.1 }; } },
      { title: 'Living?', levels: [2, 3], gen(R) { return G9.S9.groupQ(R, [['fungus on bread', 0], ['river', 1], ['caterpillar', 0], ['candle flame', 1], ['grass', 0], ['wind', 1]], ['living', 'non-living'], 'Living or non-living: '); } }
    ],
    quiz: [
      { q: 'Seeds need to germinate', o: ['water, air, warmth', 'only soil', 'light only', 'nothing'], a: 0, e: 'Three.' }, { q: 'Frog young', o: ['tadpole', 'larva', 'pupa', 'nymph'], a: 0, e: 'Tadpole.' },
      { q: 'Mosquito stages', o: ['egg, larva, pupa, adult', 'egg, tadpole, adult', 'seed, plant', 'egg, adult only'], a: 0, e: 'Four.' }, { q: 'A car is', o: ['non-living', 'living', 'a plant', 'an animal'], a: 0, e: 'Cannot grow.' },
      { q: 'Touch-me-not folding shows', o: ['response to stimulus', 'excretion', 'reproduction', 'germination'], a: 0, e: 'Response.' }, { q: 'Removing waste', o: ['excretion', 'respiration', 'growth', 'reproduction'], a: 0, e: 'Wastes.' },
      { q: 'A dry seed is', o: ['living (dormant)', 'dead', 'non-living', 'a stone'], a: 0, e: 'Dormant.' }, { q: 'Mosquito breeds in', o: ['stagnant water', 'dry sand', 'fire', 'air'], a: 0, e: 'Water.' },
      { q: 'Seed in refrigerator', o: ['does not germinate', 'grows fast', 'flowers', 'melts'], a: 0, e: 'Cold.' }, { q: 'Respiration releases', o: ['energy from food', 'water only', 'seeds', 'light'], a: 0, e: 'Energy.' },
      { q: 'Living things have', o: ['a life span', 'no end', 'no growth', 'no need of food'], a: 0, e: 'Life span.' }
    ],
    teach: {
      outcomes: ['List characteristics of living things', 'Test germination conditions', 'Order life cycles'],
      periods: [{ t: 'Living or not', flow: [['10 min', 'Is a cloud alive? debate.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Touch-me-not observation.']] }, { t: 'Germination and life cycles', flow: [['15 min', 'Explore panel 1 + set up seeds.'], ['15 min', 'Life cycle cards.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Moving = living.', 'Seeds are non-living.'], activities: ['Three-jar germination test.', 'Life cycle wheel.'],
      exit: ['Four features of life.', 'Germination needs.', 'Mosquito stages.'], homework: 'Set up seeds in moist cotton and record growth for 5 days.'
    },
    slides: [{ t: 'Living Creatures', b: ['Signs of life', 'Germination', 'Frog life cycle', 'Mosquito life cycle'] }, { t: 'Think and share', b: ['Is fire living?', 'Why remove stagnant water?'] }],
    fs: { groups: [['Living things', [['Need', 'food, water, air'], ['Show', 'growth, respiration, response'], ['Also', 'excretion, reproduction, life span']]], ['Germination', [['Needs', 'water, air, warmth'], ['Dry seed', 'dormant but alive']]], ['Life cycles', [['Frog', 'egg → tadpole → froglet → frog'], ['Mosquito', 'egg → larva → pupa → adult']]]],
      ex: [['18 of 24 seeds', '75%'], ['Car', 'non-living']], rem: ['Check all signs of life.', 'Seeds need 3 things.', 'Life cycles change form.'] }
  });
})();
