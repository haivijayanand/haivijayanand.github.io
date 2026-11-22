/*
TOOL:    class5_science_ch08
FAMILY:  CBSE_REVISION / Class 5 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 8 Clothes - How Things are Made (fibres from plants and animals, cotton, wool, silk, jute, spinning, weaving, handlooms, caring for clothes) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 8, part: 'Unit 4 · Things Around Us', short: 'Clothes', title: 'Clothes - How Things are Made',
    blurb: 'Where clothes come from: plant fibres (cotton, jute, linen) and animal fibres (wool, silk), synthetic fibres, spinning yarn and weaving or knitting fabric, handlooms and famous textiles of India, and caring for and reusing clothes.',
    revise: {
      oneLine: 'Fabric is made from fibres. Cotton comes from the cotton plant, jute from the jute stem, wool from sheep, goat or yak hair, silk from the cocoon of the silkworm; nylon and polyester are made from petroleum. Fibres are spun into yarn and woven or knitted into cloth. India is famous for handloom textiles like Banarasi, Kanjeevaram and Pashmina.',
      sections: [
        { h: 'Natural fibres', html: `<p>Plant: cotton (cool, absorbs sweat), jute (sacks, bags), linen. Animal: wool (warm), silk (smooth, shiny).</p>` },
        { h: 'From fibre to fabric', html: `<p>Fibre → spinning (twist into yarn) → weaving (two sets of threads crossing on a loom) or knitting (one yarn looped) → dyeing and printing → stitching.</p>` },
        { h: 'Care and reuse', html: `<p>Wash, dry and store clothes properly; repair, hand down, reuse old cloth as bags or dusters.</p>` }
      ],
      formulas: [['Cotton', 'cotton plant'], ['Jute', 'jute stem'], ['Wool', 'sheep, goat, yak'], ['Silk', 'silkworm cocoon'], ['Synthetic', 'from petroleum']],
      terms: [['Fibre', 'thin strand'], ['Yarn', 'twisted fibres'], ['Loom', 'frame for weaving']],
      traps: ['Silk comes from a caterpillar’s cocoon, not a plant.', 'Weaving uses two sets of threads; knitting uses one.', 'Synthetic clothes catch fire easily — avoid near flames.'],
      bridge: '<p>Unit 5 looks at the rhythms of nature and our shared Earth.</p>'
    },
    explore: [
      { title: 'From fibre to fabric', intro: 'Press <kbd>S</kbd> or Play.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Grow / rear', 'cotton is grown; sheep are reared; silkworms feed on mulberry leaves.'], ['Collect fibres', 'cotton bolls picked; sheep sheared; silk cocoons boiled to unwind the thread.'], ['Clean', 'seeds removed from cotton (ginning); wool washed and combed.'], ['Spin', 'fibres twisted into yarn on a charkha or in mills.'], ['Weave or knit', 'yarn woven on a loom into cloth, or knitted with needles into sweaters.'], ['Dye, print, stitch', 'cloth is coloured, block-printed and stitched into clothes.']] }); } },
      { title: 'Sort the fibres', intro: 'Plant, animal or synthetic?',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['From plants', 'From animals', 'Synthetic (made by people)'], items: [['cotton', 0], ['jute', 0], ['linen', 0], ['wool', 1], ['silk', 1, 'from the silkworm cocoon'], ['pashmina', 1, 'from Changthangi goats of Ladakh'], ['nylon', 2], ['polyester', 2]] }); } }
    ],
    gens: [
      { title: 'Source of fibre', gen(R) { return G9.S9.pickQ(R, [['Silk comes from?', 'cocoon of the silkworm'], ['Jute comes from?', 'the stem of the jute plant'], ['Wool comes from?', 'hair of sheep, goats, yaks'], ['Cotton comes from?', 'bolls of the cotton plant'], ['Nylon is made from?', 'chemicals from petroleum']]); } },
      { title: 'Process', gen(R) { return G9.S9.pickQ(R, [['Twisting fibres into yarn is?', 'spinning'], ['Crossing two sets of threads on a loom is?', 'weaving'], ['Making cloth with one yarn and needles is?', 'knitting'], ['Removing seeds from cotton is?', 'ginning']]); } },
      { title: 'Textiles of India', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Banarasi silk is from which state?', 'Uttar Pradesh (Varanasi)'], ['Kanjeevaram silk is from?', 'Tamil Nadu'], ['Pashmina shawls are from?', 'Jammu & Kashmir / Ladakh'], ['Muga silk is from?', 'Assam'], ['Bandhani tie-dye is from?', 'Gujarat and Rajasthan']]); } },
      { title: 'Count', gen(R) { const c = R.int(5, 12), s = R.pick([2, 3]); return { q: `A weaver makes ${s} metres of cloth a day. How many metres in ${c} days?`, a: `${s * c} m`, ans: s * c }; } },
      { title: 'Which fabric', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Best fabric for hot summers?', 'cotton — light and absorbs sweat'], ['Best for winter?', 'wool'], ['Why avoid nylon near a stove?', 'it melts and catches fire easily'], ['Jute is used for?', 'sacks, bags, ropes, mats']]); } }
    ],
    quiz: [
      { q: 'Silk comes from', o: ['silkworm cocoon', 'cotton plant', 'sheep', 'petroleum'], a: 0, e: 'Cocoon.' }, { q: 'Jute is used for', o: ['sacks and bags', 'silk sarees', 'sweaters', 'shoes only'], a: 0, e: 'Strong fibre.' },
      { q: 'Twisting fibres into yarn', o: ['spinning', 'weaving', 'knitting', 'dyeing'], a: 0, e: 'Spin.' }, { q: 'Weaving needs', o: ['a loom', 'needles only', 'a stove', 'a pump'], a: 0, e: 'Loom.' },
      { q: 'Synthetic fibre', o: ['polyester', 'cotton', 'wool', 'silk'], a: 0, e: 'Made by people.' }, { q: 'Best for summer', o: ['cotton', 'wool', 'nylon', 'leather'], a: 0, e: 'Cool.' },
      { q: 'Pashmina comes from', o: ['goats of Ladakh', 'silkworms', 'cotton', 'jute'], a: 0, e: 'Changthangi goats.' }, { q: 'Kanjeevaram is from', o: ['Tamil Nadu', 'Punjab', 'Assam', 'Bihar'], a: 0, e: 'Kanchipuram.' },
      { q: 'Knitting uses', o: ['one yarn looped', 'two sets of threads', 'no yarn', 'a loom'], a: 0, e: 'Knit.' }, { q: 'Old clothes can be', o: ['reused as bags or dusters', 'burnt', 'thrown in rivers', 'wasted'], a: 0, e: 'Reuse.' },
      { q: 'Wool is', o: ['warm', 'cool', 'from plants', 'synthetic'], a: 0, e: 'Traps air.' }
    ],
    teach: {
      outcomes: ['Classify fibres', 'Describe fibre-to-fabric steps', 'Appreciate Indian textiles'],
      periods: [{ t: 'Fibres', flow: [['10 min', 'Fabric feel box.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Magnifier look at threads.']] }, { t: 'Fabric making', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Paper weaving mat.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Silk from plants.', 'Weaving = knitting.'], activities: ['Paper weaving.', 'Textile map of India.'],
      exit: ['Two plant and two animal fibres.', 'Spinning vs weaving.', 'One famous textile.'], homework: 'Read 5 clothing labels at home and note the fibre in each.'
    },
    slides: [{ t: 'Clothes - How Things are Made', b: ['Plant and animal fibres', 'Spinning and weaving', 'Indian textiles', 'Care and reuse'] }, { t: 'Think and share', b: ['Where does silk come from?', 'Which fabric for summer?'] }],
    fs: { groups: [['Fibres', [['Plant', 'cotton, jute, linen'], ['Animal', 'wool, silk'], ['Synthetic', 'nylon, polyester']]], ['Steps', [['Spin', 'fibre → yarn'], ['Weave', 'two thread sets, loom'], ['Knit', 'one yarn, needles']]], ['Textiles', [['Banarasi', 'UP'], ['Kanjeevaram', 'Tamil Nadu'], ['Pashmina', 'Kashmir, Ladakh'], ['Muga', 'Assam']]]],
      ex: [['3 m/day × 8 days', '24 m'], ['Silk', 'silkworm cocoon']], rem: ['Cotton for heat, wool for cold.', 'Synthetics away from flames.', 'Repair and reuse.'] }
  });
})();
