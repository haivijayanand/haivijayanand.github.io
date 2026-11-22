/*
TOOL:    class3_science_ch12
FAMILY:  CBSE_REVISION / Class 3 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 12 Taking Charge of Waste (kinds of waste, wet and dry, segregation, reduce reuse recycle, composting) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 12, part: 'All chapters', short: 'Waste', title: 'Taking Charge of Waste',
    blurb: 'Waste at home and school: wet (kitchen) and dry waste, separating them into green and blue bins, reduce–reuse–recycle, turning wet waste into compost, and keeping our surroundings clean.',
    revise: {
      oneLine: 'Wet waste (peels, leftover food, leaves) rots and can become compost — it goes in the green bin. Dry waste (paper, plastic, glass, metal) can be recycled — it goes in the blue bin. Reduce what we use, reuse things, recycle the rest, and never litter or burn waste.',
      sections: [
        { h: 'Wet and dry', html: `<p>Wet: vegetable peels, food scraps, tea leaves, flowers. Dry: paper, plastic, cans, bottles, cloth.</p>` },
        { h: 'Three Rs', html: `<p>Reduce: carry a cloth bag, a steel bottle. Reuse: jars, boxes, old clothes. Recycle: paper, plastic, metal are made into new things.</p>` },
        { h: 'Compost', html: `<p>Wet waste in a pit or pot with soil turns into rich manure in a few weeks.</p>` }
      ],
      formulas: [['Green bin', 'wet waste'], ['Blue bin', 'dry waste'], ['3 Rs', 'reduce, reuse, recycle'], ['Compost', 'wet waste → manure']],
      terms: [['Segregate', 'separate'], ['Compost', 'manure from rotting waste'], ['Recycle', 'make new things from old material']],
      traps: ['Burning plastic makes poisonous smoke.', 'Mixed waste is hard to recycle.', 'Batteries and medicines need special disposal.'],
      bridge: '<p>Links back to Ch 6 (living in harmony) and Ch 7 (keeping water clean).</p>'
    },
    explore: [
      { title: 'Green bin or blue bin?', intro: 'Sort the waste.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Green bin (wet)', 'Blue bin (dry)'], items: [['banana peel', 0], ['newspaper', 1], ['tea leaves', 0], ['plastic bottle', 1], ['leftover rice', 0], ['tin can', 1], ['dry leaves from the garden', 0, 'rot easily; good for compost'], ['broken glass (wrapped)', 1, 'wrap it so no one gets hurt'], ['egg shells', 0], ['old notebook', 1]] }); } },
      { title: 'Make compost', intro: 'Press <kbd>S</kbd> to move through the weeks.',
        build(el, K) { return G9.S9.stages(el, K, { board: { xmin: -3, xmax: 3, ymin: -2, ymax: 2, axes: false, grid: 0, aspect: 0.45 }, base: b => { b.rect(-1.6, -1.8, 3.2, 2.8, { color: '#92400e', w: 4 }); }, stages: [
          ['Collect', 'put wet waste (peels, leaves, food scraps) in a pit or pot.', b => b.text(0, -0.4, '🍌🥕🍂', { font: '34px' })], ['Layer', 'cover with a layer of soil or dry leaves; keep it a little damp.', b => { b.rect(-1.6, -1.8, 3.2, 1.2, { fill: 'rgba(161,98,7,.35)', color: 'none' }); b.text(0, 0.2, '🍂🍂', { font: '28px' }); }],
          ['Helpers work', 'earthworms and tiny microbes break the waste down.', b => { b.rect(-1.6, -1.8, 3.2, 1.8, { fill: 'rgba(161,98,7,.45)', color: 'none' }); b.text(0, -0.9, '🪱🪱', { font: '28px' }); }], ['Compost ready', 'after 4–8 weeks it is dark, crumbly manure for plants.', b => { b.rect(-1.6, -1.8, 3.2, 2.0, { fill: 'rgba(68,40,15,.75)', color: 'none' }); b.text(0, 1.5, '🌱', { font: '30px' }); }]] }); } }
    ],
    gens: [
      { title: 'Wet or dry', gen(R) { return G9.S9.groupQ(R, [['onion peel', 0], ['milk packet', 1], ['flowers from puja', 0], ['cardboard box', 1], ['spoilt fruit', 0], ['chips packet', 1]], ['wet (green bin)', 'dry (blue bin)'], 'Wet or dry waste: '); } },
      { title: 'Three Rs', gen(R) { return G9.S9.groupQ(R, [['carrying a cloth bag', 0], ['using a jam jar as a pen stand', 1], ['sending newspapers to be made into new paper', 2], ['using both sides of paper', 0], ['giving old clothes to others', 1], ['melting cans to make new cans', 2]], ['reduce', 'reuse', 'recycle'], 'Reduce, reuse or recycle: '); } },
      { title: 'Compost', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['What can be turned into compost?', 'wet waste: peels, leaves, food scraps'], ['Who helps make compost?', 'earthworms and microbes'], ['How is compost useful?', 'it is manure that makes soil rich for plants']]); } },
      { title: 'Count waste', gen(R) { const w = R.int(200, 900), d = R.pick([7, 30]); return { q: `A family throws ${w} g of wet waste a day. How much in ${d} days (in grams)?`, a: `${w * d} g`, ans: w * d }; } },
      { title: 'Why care', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why should we not burn plastic?', 'it gives poisonous smoke'], ['Why separate wet and dry waste?', 'wet becomes compost, dry can be recycled'], ['What happens to plastic thrown in drains?', 'drains get blocked; water collects; mosquitoes breed']]); } }
    ],
    quiz: [
      { q: 'Banana peel goes in', o: ['green (wet) bin', 'blue (dry) bin', 'drain', 'road'], a: 0, e: 'Wet.' }, { q: 'Plastic bottle goes in', o: ['blue (dry) bin', 'green bin', 'compost pit', 'pond'], a: 0, e: 'Dry.' },
      { q: 'Compost is made from', o: ['wet waste', 'glass', 'plastic', 'metal'], a: 0, e: 'Rots.' }, { q: 'Carrying a cloth bag is', o: ['reduce', 'recycle', 'burn', 'litter'], a: 0, e: 'Less plastic.' },
      { q: 'Burning plastic', o: ['makes poisonous smoke', 'is safe', 'makes compost', 'cleans air'], a: 0, e: 'Harmful.' }, { q: 'Segregate means', o: ['separate', 'mix', 'burn', 'bury'], a: 0, e: 'Sort.' },
      { q: 'Earthworms in compost', o: ['break waste down', 'make plastic', 'spoil it', 'eat glass'], a: 0, e: 'Helpers.' }, { q: 'Using a jar again is', o: ['reuse', 'reduce', 'recycle', 'waste'], a: 0, e: 'Reuse.' },
      { q: 'Old newspapers can be', o: ['recycled', 'composted only', 'burnt', 'thrown in rivers'], a: 0, e: 'New paper.' }, { q: 'Compost takes about', o: ['4–8 weeks', '1 minute', '10 years', '1 hour'], a: 0, e: 'Time.' },
      { q: 'Litter in drains causes', o: ['blocked drains and mosquitoes', 'clean water', 'more fish', 'nothing'], a: 0, e: 'Problems.' }
    ],
    teach: {
      outcomes: ['Separate wet and dry waste', 'Use the 3 Rs', 'Explain composting'],
      periods: [{ t: 'Sorting waste', flow: [['10 min', 'Look at the class dustbin.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Two-bin system in class.']] }, { t: 'Compost and 3 Rs', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Start a pot compost.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['All waste is the same.', 'Burning is a solution.'], activities: ['Class compost pot.', 'Waste audit for a week.'],
      exit: ['Two wet, two dry.', 'One example of each R.', 'Compost steps.'], homework: 'Set up two bins at home for a week and note what goes in each.'
    },
    slides: [{ t: 'Taking Charge of Waste', b: ['Wet and dry', 'Green and blue bins', 'Reduce, reuse, recycle', 'Compost'] }, { t: 'Think and share', b: ['Which bin for tea leaves?', 'One thing you can reduce?'] }],
    fs: { groups: [['Bins', [['Green', 'wet: peels, food, leaves'], ['Blue', 'dry: paper, plastic, metal, glass']]], ['3 Rs', [['Reduce', 'cloth bag, steel bottle'], ['Reuse', 'jars, boxes, clothes'], ['Recycle', 'paper, plastic, cans']]], ['Compost', [['Wet waste + soil', '4–8 weeks → manure'], ['Helpers', 'earthworms, microbes']]]],
      ex: [['500 g × 7 days', '3500 g'], ['Tea leaves', 'green bin']], rem: ['Never burn plastic.', 'Separate at home.', 'Reduce first.'] }
  });
})();
