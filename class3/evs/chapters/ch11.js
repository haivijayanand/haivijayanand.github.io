/*
TOOL:    class3_science_ch11
FAMILY:  CBSE_REVISION / Class 3 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 11 Making Things (craftspeople and their tools, from raw material to product, making by hand, recycling into new things) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 11, part: 'All chapters', short: 'Making things', title: 'Making Things',
    blurb: 'How things are made: craftspeople and their tools (potter, weaver, carpenter, blacksmith, basket maker), steps from raw material to a finished product, making simple things ourselves, and turning old things into new ones.',
    revise: {
      oneLine: 'People make things from raw materials using skill and tools: a potter shapes clay on a wheel and bakes it, a weaver makes cloth on a loom, a carpenter shapes wood with saws and planes, a blacksmith heats and hammers iron. We can make things too — and reuse old things to make new ones.',
      sections: [
        { h: 'Craftspeople', html: `<p>Potter — clay, wheel, kiln. Weaver — thread, loom. Carpenter — wood, saw, hammer. Blacksmith — iron, fire, hammer, anvil. Basket maker — bamboo, cane.</p>` },
        { h: 'Steps', html: `<p>Clay pot: dig clay → mix with water → shape on the wheel → dry in the sun → bake in a kiln → paint.</p>` },
        { h: 'Reuse', html: `<p>Old bottles → pen stands, old cloth → bags or rugs, newspaper → paper bags.</p>` }
      ],
      formulas: [['Raw material', 'clay, wood, cotton, iron, bamboo'], ['Tool', 'wheel, loom, saw, hammer'], ['Product', 'pot, cloth, chair, basket'], ['Reuse', 'old into new']],
      terms: [['Craftsperson', 'skilled maker'], ['Kiln', 'oven for baking pots'], ['Loom', 'frame for weaving cloth']],
      traps: ['Handmade things take many steps and skill.', 'Use sharp tools only with an adult.', 'Reuse before you throw.'],
      bridge: '<p>Ch 12 deals with waste — and reusing reduces it.</p>'
    },
    explore: [
      { title: 'How a clay pot is made', intro: 'Press <kbd>S</kbd> or Play.',
        build(el, K) { return G9.S9.stages(el, K, { board: { xmin: -3, xmax: 3, ymin: -1.5, ymax: 2.5, axes: false, grid: 0, aspect: 0.45 }, stages: [
          ['Dig clay', 'the potter collects clay from a pond bed.', b => b.text(0, 0.5, '⛏️🟫', { font: '40px' })], ['Knead', 'mix clay with water and knead it smooth.', b => b.text(0, 0.5, '🤲🟫', { font: '40px' })], ['Shape on the wheel', 'the spinning wheel helps make a round pot.', b => { b.circle(0, -0.8, 1.4, { color: C.ink, w: 3 }); b.poly([[-0.6, -0.6], [-0.9, 0.6], [-0.4, 1.4], [0.4, 1.4], [0.9, 0.6], [0.6, -0.6]], { fill: '#d6a26b', color: '#92400e', w: 3 }); }],
          ['Dry', 'pots dry in the sun for some days.', b => b.text(0, 0.5, '☀️🏺🏺', { font: '40px' })], ['Bake', 'pots are baked in a kiln to make them hard.', b => b.text(0, 0.5, '🔥🏺', { font: '40px' })], ['Paint and sell', 'pots are painted and sold at the market or mela.', b => b.text(0, 0.5, '🎨🏺🛒', { font: '40px' })]] }); } },
      { title: 'Maker, material and tool', intro: 'Sort the tools to the craftsperson who uses them.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Potter', 'Weaver', 'Carpenter', 'Blacksmith'], items: [['wheel', 0], ['kiln', 0], ['loom', 1], ['thread', 1], ['saw', 2], ['wood plane', 2], ['anvil', 3], ['tongs and furnace', 3]] }); } }
    ],
    gens: [
      { title: 'Who makes it?', gen(R) { return G9.S9.pickQ(R, [['Who makes clay pots?', 'potter'], ['Who weaves cloth?', 'weaver'], ['Who makes wooden furniture?', 'carpenter'], ['Who makes iron tools by heating and hammering?', 'blacksmith'], ['Who makes baskets from bamboo?', 'basket maker']]); } },
      { title: 'Raw material', gen(R) { return G9.S9.pickQ(R, [['A pot is made from?', 'clay'], ['Cotton cloth is made from?', 'cotton thread from the cotton plant'], ['A chair can be made from?', 'wood'], ['A basket is made from?', 'bamboo or cane'], ['A sickle is made from?', 'iron']]); } },
      { title: 'Order the steps', levels: [2, 3], gen(R) { return { q: 'Put in order: bake, shape on wheel, dig clay, dry, knead.', a: 'dig clay → knead → shape on wheel → dry → bake' }; } },
      { title: 'Reuse ideas', gen(R) { return G9.S9.pickQ(R, [['What can you make from an old bottle?', 'pen stand, planter, bird feeder'], ['What can you make from old cloth?', 'bag, duster, rug'], ['What can you make from newspaper?', 'paper bag, paper toys']]); } },
      { title: 'Count the pots', levels: [2, 3], gen(R) { const d = R.int(4, 9), n = R.int(3, 7); return { q: `A potter makes ${d} pots a day for ${n} days. How many pots?`, a: String(d * n), ans: d * n }; } }
    ],
    quiz: [
      { q: 'A potter uses', o: ['a wheel and kiln', 'a loom', 'an anvil', 'a saw'], a: 0, e: 'Clay work.' }, { q: 'A weaver uses', o: ['a loom', 'a kiln', 'a hammer only', 'a wheel'], a: 0, e: 'Cloth.' },
      { q: 'Kiln is used to', o: ['bake pots', 'cut wood', 'weave', 'dig'], a: 0, e: 'Oven.' }, { q: 'Carpenter works with', o: ['wood', 'clay', 'thread', 'glass'], a: 0, e: 'Wood.' },
      { q: 'Blacksmith heats', o: ['iron', 'clay', 'cotton', 'paper'], a: 0, e: 'Metal.' }, { q: 'First step of a clay pot', o: ['dig clay', 'bake', 'paint', 'sell'], a: 0, e: 'Raw material.' },
      { q: 'Baskets are made from', o: ['bamboo', 'glass', 'iron', 'clay'], a: 0, e: 'Cane.' }, { q: 'Old cloth can become', o: ['a bag', 'a pot', 'a nail', 'a window'], a: 0, e: 'Reuse.' },
      { q: 'Sharp tools should be used', o: ['with an adult', 'alone', 'for play', 'anywhere'], a: 0, e: 'Safety.' }, { q: 'Pots dry in the', o: ['sun', 'rain', 'river', 'fridge'], a: 0, e: 'Sun.' },
      { q: 'Raw material for cloth', o: ['cotton', 'clay', 'iron', 'stone'], a: 0, e: 'Plant fibre.' }
    ],
    teach: {
      outcomes: ['Name craftspeople, materials and tools', 'Order steps in making a product', 'Reuse old things creatively'],
      periods: [{ t: 'Makers', flow: [['10 min', 'Pictures of local craftspeople.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Explore panel 1.']] }, { t: 'Make it', flow: [['20 min', 'Make a clay or paper item.'], ['10 min', 'Reuse ideas.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Things just come from shops.', 'Handmade is easy.'], activities: ['Visit or video of a potter.', 'Bottle pen-stand.'],
      exit: ['Tool of a weaver.', 'Steps of a clay pot.', 'One reuse idea.'], homework: 'Make one useful thing from waste at home and bring a photo or drawing.'
    },
    slides: [{ t: 'Making Things', b: ['Craftspeople', 'Raw material → product', 'Tools', 'Reuse'] }, { t: 'Think and share', b: ['What does a blacksmith use?', 'What can you make from a bottle?'] }],
    fs: { groups: [['Makers', [['Potter', 'clay, wheel, kiln'], ['Weaver', 'thread, loom'], ['Carpenter', 'wood, saw'], ['Blacksmith', 'iron, anvil, fire'], ['Basket maker', 'bamboo']]], ['Clay pot', [['Steps', 'dig, knead, shape, dry, bake, paint']]], ['Reuse', [['Bottle', 'pen stand'], ['Cloth', 'bag'], ['Newspaper', 'paper bag']]]],
      ex: [['6 pots × 5 days', '30 pots'], ['Loom', 'weaver']], rem: ['Respect craft skills.', 'Adults for sharp tools.', 'Reuse before throwing.'] }
  });
})();
