/*
TOOL:    class5_science_ch02
FAMILY:  CBSE_REVISION / Class 5 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 2 Journey of a River (source to sea, stages of a river, tributaries, life along rivers, dams, keeping rivers clean) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 2, part: 'Unit 1 · Life Around Us', short: 'River', title: 'Journey of a River',
    blurb: 'A river’s journey from its source in the mountains to the sea: fast young streams, wide slow plains, meanders, tributaries, the delta; plants, animals and people along rivers; uses, dams and keeping rivers clean.',
    revise: {
      oneLine: 'A river starts at a source — a glacier, spring or lake in the mountains — and flows downhill. In the hills it is narrow and fast; in the plains it becomes wide and slow, curving in loops (meanders); smaller rivers (tributaries) join it; near the sea it splits into a fan-shaped delta. Rivers give water, food, transport and fertile soil, so we must keep them clean.',
      sections: [
        { h: 'Stages', html: `<p>Upper course: steep, fast, waterfalls, rocks. Middle: wider, slower, meanders. Lower: very wide, slow, drops soil, forms a delta at the mouth.</p>` },
        { h: 'Indian rivers', html: `<p>The Ganga starts at the Gangotri glacier and meets the Bay of Bengal, forming the Sundarbans delta with the Brahmaputra. The Yamuna is a tributary of the Ganga.</p>` },
        { h: 'People and rivers', html: `<p>Drinking water, farming, fishing, boats, festivals. Sewage, plastic and factory waste pollute rivers; dams store water and make electricity but change the river.</p>` }
      ],
      formulas: [['Source', 'where a river begins'], ['Tributary', 'smaller river joining a bigger one'], ['Meander', 'loop of a slow river'], ['Mouth / delta', 'where it meets the sea']],
      terms: [['Glacier', 'river of ice'], ['Delta', 'fan of land made by river soil at the mouth'], ['Fertile', 'rich soil good for crops']],
      traps: ['Rivers flow downhill, not always "south".', 'A delta is land, not water.', 'Clear-looking river water may still be polluted.'],
      bridge: '<p>Unit 2 moves to health: food and our school.</p>'
    },
    explore: [
      { title: 'Follow the river', intro: 'Press <kbd>S</kbd> or Play to travel from source to sea.',
        build(el, K) { const P = [[-5, 2.6], [-4.2, 2.0], [-3.2, 1.6], [-2, 0.9], [-1, 1.2], [0, 0.4], [1, 0.8], [2, 0], [3, 0.3], [4, -0.6], [4.8, -1.4]]; return G9.S9.stages(el, K, { board: { xmin: -5.5, xmax: 5.5, ymin: -2, ymax: 3.2, axes: false, grid: 0, aspect: 0.45 },
          base: (b, k) => { b.poly([[-5.5, 3.2], [-5.5, 1], [-3, 1.2], [-4, 3.2]], { fill: 'rgba(120,113,108,.35)', color: 'none' }); b.rect(3.8, -2, 1.7, 1, { fill: 'rgba(29,78,216,.35)', color: 'none' }); b.text(4.7, -1.8, 'sea', { font: '12px' }); for (let i = 0; i < P.length - 1; i++) b.line(...P[i], ...P[i + 1], { color: C.blue, w: 1.5 + i * 0.7 }); b.line(-1.8, -1.5, 0, 0.4, { color: C.blue, w: 2 }); },
          stages: [['Source', 'a glacier or spring high in the mountains — like Gangotri for the Ganga.', b => b.text(-5, 2.6, '🏔️', { font: '24px' })], ['Upper course', 'narrow, fast and steep; it cuts deep valleys and has waterfalls.', b => b.dot(-3.2, 1.6, { r: 8, color: C.orange })], ['Tributary joins', 'a smaller river joins and adds water.', b => b.dot(0, 0.4, { r: 8, color: C.orange })], ['Plains', 'wide and slow; it loops in meanders and spreads fertile soil — farms and towns grow here.', b => b.text(1.6, 1.3, '🌾🏘️', { font: '20px' })], ['Delta and mouth', 'near the sea it drops its soil and splits into many channels — a delta.', b => b.dot(4.8, -1.4, { r: 8, color: C.orange })]] }); } },
      { title: 'Helps or harms the river?', intro: 'Sort the actions.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Helps the river', 'Harms the river'], items: [['planting trees on the banks', 0, 'roots hold the soil'], ['dumping plastic', 1], ['treating sewage before it reaches the river', 0], ['washing vehicles in the river', 1], ['immersing clay idols in a tank, not the river', 0], ['factory waste in the river', 1], ['saving water at home', 0]] }); } }
    ],
    gens: [
      { title: 'River words', gen(R) { return G9.S9.pickQ(R, [['Where a river begins is its?', 'source'], ['A smaller river joining a bigger one is a?', 'tributary'], ['A loop in a slow river is a?', 'meander'], ['The fan of land at a river’s mouth is a?', 'delta'], ['A river of ice is a?', 'glacier']]); } },
      { title: 'Indian rivers', gen(R) { return G9.S9.pickQ(R, [['Where does the Ganga start?', 'Gangotri glacier'], ['Into which sea does the Ganga flow?', 'Bay of Bengal'], ['Name a tributary of the Ganga.', 'Yamuna (also Ghaghara, Son, Gandak)'], ['Which delta do the Ganga and Brahmaputra form?', 'Sundarbans delta']]); } },
      { title: 'Fast or slow', gen(R) { return G9.S9.groupQ(R, [['in the mountains', 0], ['in the plains', 1], ['near a waterfall', 0], ['near the delta', 1]], ['fast and narrow', 'slow and wide'], 'Is the river fast or slow: '); } },
      { title: 'Distance', levels: [2, 3], gen(R) { const v = R.int(2, 5), h = R.int(3, 9); return { q: `A boat floats down a river at ${v} km per hour for ${h} hours. How far does it travel?`, a: `${v * h} km`, ans: v * h }; } },
      { title: 'Uses and care', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Give three uses of rivers.', 'drinking water, farming, fishing, transport, electricity'], ['Why are plains near rivers good for farming?', 'rivers leave fertile soil'], ['Name one way to keep a river clean.', 'no dumping; treat sewage; plant trees on banks']]); } }
    ],
    quiz: [
      { q: 'Where a river begins', o: ['source', 'mouth', 'delta', 'meander'], a: 0, e: 'Start.' }, { q: 'Ganga starts at', o: ['Gangotri glacier', 'Bay of Bengal', 'Delhi', 'Thar desert'], a: 0, e: 'Glacier.' },
      { q: 'Tributary', o: ['smaller river joining', 'river mouth', 'waterfall', 'dam'], a: 0, e: 'Joins.' }, { q: 'In mountains a river is', o: ['fast and narrow', 'slow and wide', 'still', 'salty'], a: 0, e: 'Steep.' },
      { q: 'A delta is', o: ['fan of land at the mouth', 'a waterfall', 'a lake', 'a glacier'], a: 0, e: 'Deposits.' }, { q: 'Yamuna is a tributary of', o: ['Ganga', 'Narmada', 'Kaveri', 'Indus'], a: 0, e: 'Meets at Prayagraj.' },
      { q: 'Meanders form in', o: ['plains', 'peaks', 'glaciers', 'deserts'], a: 0, e: 'Slow loops.' }, { q: 'Harms a river', o: ['dumping plastic', 'planting trees', 'treating sewage', 'saving water'], a: 0, e: 'Pollution.' },
      { q: 'Plains near rivers are', o: ['fertile', 'icy', 'rocky only', 'salty'], a: 0, e: 'Silt.' }, { q: 'Sundarbans delta is made by', o: ['Ganga and Brahmaputra', 'Kaveri', 'Indus', 'Tapi'], a: 0, e: 'Bengal.' },
      { q: 'Boat 4 km/h for 5 h', o: ['20 km', '9 km', '1 km', '45 km'], a: 0, e: 'Multiply.' }
    ],
    teach: {
      outcomes: ['Describe stages of a river', 'Name parts: source, tributary, meander, delta', 'Explain uses and care of rivers'],
      periods: [{ t: 'River journey', flow: [['10 min', 'Map: trace the Ganga.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Sand-tray river model.']] }, { t: 'People and rivers', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Debate: dams good or bad?'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Rivers flow south always.', 'Delta is water.'], activities: ['Sand-tray river.', 'Local river/pond survey.'],
      exit: ['Order: source, plains, delta.', 'Define tributary.', 'One way to keep rivers clean.'], homework: 'Find the river nearest your town: where does it start and where does it end?'
    },
    slides: [{ t: 'Journey of a River', b: ['Source to sea', 'Tributaries and meanders', 'Delta', 'Rivers and people'] }, { t: 'Think and share', b: ['Where does the Ganga start?', 'How can we keep rivers clean?'] }],
    fs: { groups: [['Parts', [['Source', 'glacier, spring, lake'], ['Tributary', 'joins main river'], ['Meander', 'loop in plains'], ['Delta', 'fan of land at mouth']]], ['Course', [['Upper', 'fast, narrow'], ['Middle', 'wider, slower'], ['Lower', 'wide, slow, delta']]], ['Ganga', [['Source', 'Gangotri'], ['Mouth', 'Bay of Bengal'], ['Delta', 'Sundarbans']]]],
      ex: [['4 km/h × 5 h', '20 km'], ['Yamuna', 'tributary of Ganga']], rem: ['Rivers flow downhill.', 'Plains are fertile.', 'Rivers need our care.'] }
  });
})();
