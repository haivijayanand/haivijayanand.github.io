/*
TOOL:    class3_science_ch10
FAMILY:  CBSE_REVISION / Class 3 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 10 This World of Things (things around us, materials: wood, metal, plastic, glass, cloth, clay; properties) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 10, part: 'All chapters', short: 'Materials', title: 'This World of Things',
    blurb: 'Things around us and the materials they are made of — wood, metal, plastic, glass, cloth, clay, paper — their properties (hard/soft, rough/smooth, see-through, floats/sinks, bends) and choosing the right material for a job.',
    revise: {
      oneLine: 'Every object is made of a material: a chair of wood or metal, a bottle of glass or plastic, a shirt of cloth. Materials differ — hard or soft, rough or smooth, see-through or not, bendable or not, floats or sinks — so we choose materials that suit the job.',
      sections: [
        { h: 'Materials', html: `<p>Wood (table), metal (spoon), plastic (bucket), glass (window), cloth (bag), clay (pot), paper (book), rubber (eraser).</p>` },
        { h: 'Properties', html: `<p>Glass is see-through; metal is hard and shiny; cloth is soft and bends; wood usually floats; a metal key sinks.</p>` },
        { h: 'Right material', html: `<p>Raincoat: plastic (water does not pass). Cooking pot: metal or clay (can be heated). Window: glass (lets light in).</p>` }
      ],
      formulas: [['Object', 'thing we use'], ['Material', 'what it is made of'], ['Properties', 'hard/soft, rough/smooth, see-through'], ['Choose', 'material that suits the job']],
      terms: [['Material', 'stuff an object is made from'], ['See-through', 'light passes (transparent)'], ['Float / sink', 'stays on / goes under water']],
      traps: ['One object can be made of different materials.', 'Big things do not always sink; small things do not always float.', 'Glass breaks — handle with care.'],
      bridge: '<p>Ch 11 shows how people make things from these materials.</p>'
    },
    explore: [
      { title: 'What is it made of?', intro: 'Sort each object by its main material.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Wood', 'Metal', 'Plastic', 'Glass / clay / cloth'], items: [['pencil', 0], ['spoon', 1], ['bucket', 2], ['window pane', 3], ['cricket bat', 0], ['key', 1], ['comb', 2], ['matka (pot)', 3, 'clay'], ['handkerchief', 3, 'cloth'], ['nail', 1]] }); } },
      { title: 'Float or sink?', intro: 'Choose an object; see what happens in a tub of water.',
        build(el, K) { const O = [['🪵 wooden block', 1], ['🔑 iron key', 0], ['🍃 dry leaf', 1], ['🪨 stone', 0], ['🧴 empty plastic bottle (closed)', 1], ['🪙 coin', 0], ['🧽 sponge', 1], ['📎 paper clip', 0]]; let k = 0; const row = K.row(el); K.select(row, 'object', O.map(o => o[0]), i => { k = i; b.redraw(); });
          const b = new K.Board(el, { xmin: -3, xmax: 3, ymin: -2.2, ymax: 1.6, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.rect(-2.5, -2, 5, 2.6, { fill: 'rgba(29,78,216,.18)', color: C.blue, w: 3 }); const f = O[k][1]; b.text(0, f ? 0.75 : -1.65, O[k][0].split(' ')[0], { font: '34px' }); rd.innerHTML = `${O[k][0].split(' ').slice(1).join(' ')} <b>${f ? 'floats' : 'sinks'}</b>`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Material', gen(R) { const t = R.pick([['chair', 'wood, metal or plastic'], ['window', 'glass'], ['matka', 'clay'], ['shirt', 'cloth'], ['eraser', 'rubber'], ['notebook', 'paper'], ['spoon', 'metal']]); return { q: `What is a ${t[0]} usually made of?`, a: t[1] }; } },
      { title: 'Float or sink', gen(R) { return G9.S9.groupQ(R, [['wooden ruler', 0], ['steel spoon', 1], ['dry leaf', 0], ['marble', 1], ['cork', 0], ['iron nail', 1]], ['floats', 'sinks'], 'Floats or sinks: '); } },
      { title: 'Properties', gen(R) { return G9.S9.pickQ(R, [['Name a see-through material.', 'glass (or clear plastic)'], ['Name a material that bends easily.', 'cloth, paper, rubber'], ['Name a hard, shiny material.', 'metal'], ['Name a rough material.', 'sandpaper, bark, brick']]); } },
      { title: 'Right material', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why is a raincoat made of plastic?', 'water does not pass through'], ['Why are cooking pots made of metal?', 'they can be heated and do not burn'], ['Why are windows made of glass?', 'light passes through'], ['Why are school bags made of cloth?', 'strong, soft, light, can bend']]); } },
      { title: 'Count materials', levels: [2, 3], gen(R) { const w = R.int(2, 8), m = R.int(2, 8); return { q: `A classroom has ${w} wooden and ${m} metal chairs. How many chairs? How many more ${w > m ? 'wooden' : 'metal'}?`, a: `${w + m}; ${Math.abs(w - m)}`, ans: w + m }; } }
    ],
    quiz: [
      { q: 'A spoon is usually made of', o: ['metal', 'cloth', 'paper', 'clay'], a: 0, e: 'Hard.' }, { q: 'See-through material', o: ['glass', 'wood', 'brick', 'cardboard'], a: 0, e: 'Light passes.' },
      { q: 'A matka is made of', o: ['clay', 'glass', 'metal', 'plastic'], a: 0, e: 'Clay.' }, { q: 'Wooden block in water', o: ['floats', 'sinks', 'melts', 'breaks'], a: 0, e: 'Floats.' },
      { q: 'Iron key in water', o: ['sinks', 'floats', 'dissolves', 'flies'], a: 0, e: 'Sinks.' }, { q: 'Raincoats are plastic because', o: ['water does not pass', 'it is see-through', 'it is heavy', 'it breaks'], a: 0, e: 'Waterproof.' },
      { q: 'Material that bends easily', o: ['cloth', 'glass', 'stone', 'iron'], a: 0, e: 'Soft.' }, { q: 'An eraser is made of', o: ['rubber', 'glass', 'clay', 'metal'], a: 0, e: 'Rubber.' },
      { q: 'One object can be made of', o: ['different materials', 'only one material ever', 'no material', 'air only'], a: 0, e: 'Chair: wood or metal.' }, { q: 'Glass should be handled', o: ['with care', 'roughly', 'by throwing', 'with a hammer'], a: 0, e: 'Breaks.' },
      { q: 'A cricket bat is made of', o: ['wood', 'glass', 'cloth', 'paper'], a: 0, e: 'Willow wood.' }
    ],
    teach: {
      outcomes: ['Name materials of everyday objects', 'Describe simple properties', 'Choose materials for a purpose'],
      periods: [{ t: 'Materials hunt', flow: [['10 min', 'Classroom object hunt.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Feel-and-tell properties.']] }, { t: 'Float or sink', flow: [['15 min', 'Tub experiment.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Heavy things always sink.', 'One object, one material.'], activities: ['Float-sink tub.', 'Material collage.'],
      exit: ['Material of a window.', 'Two things that float.', 'Why a pot is metal.'], homework: 'List 10 things in your kitchen and the material of each.'
    },
    slides: [{ t: 'This World of Things', b: ['Objects and materials', 'Properties', 'Float or sink', 'Right material for the job'] }, { t: 'Think and share', b: ['What is a matka made of?', 'Does a coin float?'] }],
    fs: { groups: [['Materials', [['Wood', 'table, pencil, bat'], ['Metal', 'spoon, key, nail'], ['Plastic', 'bucket, comb'], ['Glass', 'window'], ['Clay', 'matka'], ['Cloth', 'bag, shirt']]], ['Properties', [['See-through', 'glass'], ['Bends', 'cloth, paper'], ['Hard, shiny', 'metal']]], ['Water test', [['Floats', 'wood, leaf, cork'], ['Sinks', 'key, stone, coin']]]],
      ex: [['Raincoat', 'plastic: waterproof'], ['Window', 'glass: lets light in']], rem: ['Ask: what is it made of?', 'Test, then tell.', 'Handle glass carefully.'] }
  });
})();
