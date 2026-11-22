/*
TOOL:    class4_science_ch03
FAMILY:  CBSE_REVISION / Class 4 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 3 Nature Trail (observing plants, birds, insects and their signs on a walk; leaves, flowers, seeds; recording observations) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 3, part: 'Unit 2 · Life Around Us', short: 'Nature trail', title: 'Nature Trail',
    blurb: 'Going on a nature trail: observing trees, flowers, leaves, birds, insects and their signs (nests, feathers, webs, footprints), using our senses safely, recording in a nature diary, and how seeds travel.',
    revise: {
      oneLine: 'On a nature trail we look, listen, smell and touch gently: leaves of many shapes, flowers of many colours, birds and their calls, insects, spider webs, nests and footprints. We record what we see in a nature diary and never harm plants or animals.',
      sections: [
        { h: 'Observe and record', html: `<p>Note the date, place, what you saw, its size, colour, sound, and draw it. Count how many you saw.</p>` },
        { h: 'Signs of animals', html: `<p>Nests, feathers, droppings, webs, holes in leaves, footprints in mud tell us animals were there.</p>` },
        { h: 'How seeds travel', html: `<p>By wind (cotton, dandelion), water (coconut), animals (burrs stick to fur, birds eat fruits) and by bursting (balsam, pea pods).</p>` }
      ],
      formulas: [['Senses', 'look, listen, smell, touch gently'], ['Nature diary', 'date, place, what, drawing'], ['Seeds travel by', 'wind, water, animals, bursting'], ['Trail rule', 'leave no harm, leave no litter']],
      terms: [['Observe', 'look carefully'], ['Dispersal', 'seeds spreading to new places'], ['Habitat', 'natural home']],
      traps: ['Never taste wild berries or touch unknown insects.', 'Do not pluck flowers or disturb nests.', 'Keep with the group on the trail.'],
      bridge: '<p>Ch 4 follows how plants and animals grow.</p>'
    },
    explore: [
      { title: 'How does this seed travel?', intro: 'Sort the seeds.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Wind', 'Water', 'Animals', 'Bursting pods'], items: [['cotton seed (fluffy)', 0], ['drumstick seed (winged)', 0], ['coconut', 1, 'floats far on the sea'], ['lotus seed', 1], ['burr / chirchita (sticks to fur)', 2], ['mango (fruit eaten)', 2], ['balsam pod', 3, 'bursts and throws seeds'], ['pea pod (dry)', 3], ['maple-like winged seed', 0]] }); } },
      { title: 'Trail tally', intro: 'Use the buttons to count what you spot on a trail; see your totals and bar chart.',
        build(el, K) { const T = [['🐦', 'birds'], ['🦋', 'butterflies'], ['🐜', 'ants'], ['🌼', 'flowers'], ['🕸️', 'webs']]; const c = [0, 0, 0, 0, 0]; const row = K.row(el); T.forEach((t, i) => K.button(row, t[0] + ' +1', () => { c[i]++; draw(); })); K.button(row, '↺ Reset', () => { c.fill(0); draw(); }); const rd = K.read(el);
          function draw() { rd.innerHTML = T.map((t, i) => `<div style="display:flex;align-items:center;gap:8px;margin:2px 0"><span style="width:110px">${t[0]} ${t[1]}</span><span style="display:inline-block;height:16px;width:${c[i] * 22}px;background:var(--blue,#1d4ed8);border-radius:4px"></span><b>${c[i]}</b></div>`).join('') + `total ${c.reduce((a, b) => a + b, 0)}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Seed travel', gen(R) { return G9.S9.groupQ(R, [['cotton', 0], ['coconut', 1], ['burr', 2], ['balsam', 3], ['madar (aak) seed', 0], ['guava (eaten by birds)', 2]], ['wind', 'water', 'animals', 'bursting'], 'How does this seed travel: '); } },
      { title: 'Animal signs', gen(R) { return G9.S9.pickQ(R, [['A web tells you which animal lives nearby?', 'spider'], ['Holes in leaves may be made by?', 'caterpillars / insects'], ['A feather on the ground is a sign of?', 'a bird'], ['Footprints in mud near a pond may be from?', 'birds, cattle, dogs, frogs']]); } },
      { title: 'Trail safety', gen(R) { return G9.S9.pickQ(R, [['Should you taste wild berries on a trail?', 'no — they can be poisonous'], ['What should you carry on a trail?', 'water, cap, notebook, pencil'], ['Why stay with the group?', 'so no one gets lost or hurt']]); } },
      { title: 'Tally count', levels: [2, 3], gen(R) { const a = R.int(3, 15), b = R.int(3, 15); return { q: `On a trail you saw ${a} birds and ${b} butterflies. How many in all? How many more ${a > b ? 'birds' : 'butterflies'}?`, a: `${a + b}; ${Math.abs(a - b)}`, ans: a + b }; } },
      { title: 'Nature diary', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Name three things to write in a nature diary.', 'date, place, what you saw (with a drawing)'], ['Why record observations?', 'to remember and compare later'], ['Which senses can you use on a trail?', 'sight, hearing, smell, gentle touch']]); } }
    ],
    quiz: [
      { q: 'Coconut seeds travel by', o: ['water', 'bursting', 'animals only', 'nothing'], a: 0, e: 'Floats.' }, { q: 'Cotton seeds travel by', o: ['wind', 'water', 'bursting', 'digging'], a: 0, e: 'Fluffy.' },
      { q: 'A web is a sign of a', o: ['spider', 'bird', 'frog', 'cow'], a: 0, e: 'Spider.' }, { q: 'On a trail, wild berries are', o: ['not to be tasted', 'safe to eat', 'for collection', 'sweets'], a: 0, e: 'Poison risk.' },
      { q: 'Balsam pods', o: ['burst to throw seeds', 'float', 'fly', 'stick to fur'], a: 0, e: 'Burst.' }, { q: 'A nature diary has', o: ['date, place, what we saw', 'only jokes', 'shopping list', 'nothing'], a: 0, e: 'Record.' },
      { q: 'Burrs travel by', o: ['sticking to animals', 'water', 'wind', 'bursting'], a: 0, e: 'Hooks.' }, { q: 'Nests should be', o: ['left alone', 'taken home', 'broken', 'moved'], a: 0, e: 'Respect.' },
      { q: 'Observe means', o: ['look carefully', 'shout', 'pluck', 'run'], a: 0, e: 'Watch.' }, { q: 'Spreading seeds is called', o: ['dispersal', 'digestion', 'pollution', 'migration'], a: 0, e: 'Dispersal.' },
      { q: 'Birds help mango seeds travel by', o: ['eating fruits', 'nesting', 'singing', 'swimming'], a: 0, e: 'Animals.' }
    ],
    teach: {
      outcomes: ['Observe and record nature', 'Recognise animal signs', 'Explain seed dispersal'],
      periods: [{ t: 'Trail', flow: [['25 min', 'Nature walk with diaries.'], ['15 min', 'Explore panel 2: tally.']] }, { t: 'Seeds', flow: [['15 min', 'Collect and sort seeds.'], ['15 min', 'Explore panel 1.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['All berries are safe.', 'Seeds only fall below the tree.'], activities: ['Seed collection board.', 'Leaf rubbing gallery.'],
      exit: ['Two animal signs.', 'Four ways seeds travel.', 'One trail rule.'], homework: 'Keep a 5-day nature diary of your street or garden.'
    },
    slides: [{ t: 'Nature Trail', b: ['Observe with senses', 'Animal signs', 'Seeds travel', 'Nature diary'] }, { t: 'Think and share', b: ['How does a coconut travel?', 'What did you spot today?'] }],
    fs: { groups: [['Observe', [['Senses', 'look, listen, smell, gentle touch'], ['Diary', 'date, place, drawing, count']]], ['Animal signs', [['Web', 'spider'], ['Feather, nest', 'bird'], ['Holes in leaves', 'insects']]], ['Seeds travel', [['Wind', 'cotton, drumstick'], ['Water', 'coconut, lotus'], ['Animals', 'burrs, fruits'], ['Bursting', 'balsam, pea']]]],
      ex: [['8 birds + 5 butterflies', '13'], ['Coconut', 'water']], rem: ['Do no harm.', 'Never taste wild fruit.', 'Stay with the group.'] }
  });
})();
