/*
TOOL:    class3_science_ch06
FAMILY:  CBSE_REVISION / Class 3 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 6 Living in Harmony (caring for nature, sharing space with animals, communities that protect forests, reduce harm) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 6, part: 'All chapters', short: 'Living in harmony', title: 'Living in Harmony',
    blurb: 'Living in harmony with plants, animals and people: sharing land and water with animals, communities that protect trees and wildlife (like the Bishnois and the Chipko movement), and daily actions that reduce harm to nature.',
    revise: {
      oneLine: 'Living in harmony means sharing the Earth kindly with plants, animals and people. Communities like the Bishnois of Rajasthan protect trees and blackbuck; in the Chipko movement villagers hugged trees to save them. We help by planting trees, saving water, not wasting and being gentle with animals.',
      sections: [
        { h: 'Sharing space', html: `<p>Animals need forests, ponds and fields too. When we cut forests, animals lose homes and come into towns.</p>` },
        { h: 'People who protect', html: `<p>Bishnois will not cut green trees or hunt animals. Chipko: people hugged trees so they could not be cut.</p>` },
        { h: 'What I can do', html: `<p>Plant and water trees, keep water for birds, switch off taps and lights, do not throw waste, do not hurt animals.</p>` }
      ],
      formulas: [['Harmony', 'living together peacefully'], ['Chipko', 'hug trees to save them'], ['Bishnois', 'protect trees and blackbuck'], ['My part', 'plant, save, share, care']],
      terms: [['Habitat', 'natural home'], ['Wildlife', 'animals living free in nature'], ['Protect', 'keep safe from harm']],
      traps: ['Nature is not only for humans.', 'Feeding wild animals junk food harms them.', 'Small actions by many people matter.'],
      bridge: '<p>Ch 7 looks at water, a precious gift we all share.</p>'
    },
    explore: [
      { title: 'Helpful or harmful?', intro: 'Sort the actions.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Helps nature', 'Harms nature'], items: [['planting a sapling', 0], ['keeping water for birds', 0], ['throwing plastic in a pond', 1], ['cutting a tree for no reason', 1], ['feeding chips to monkeys', 1, 'junk food makes animals sick'], ['switching off the tap', 0], ['making noise near nests', 1], ['carrying a cloth bag', 0], ['protecting a nest', 0]] }); } },
      { title: 'Trees and birds', intro: 'Change the number of trees in a park and see how many bird homes and how much shade there are.',
        build(el, K) { let t = 6; const row = K.row(el); K.slider(row, 'trees', 0, 15, 1, t, v => { t = v; draw(); }); const rd = K.read(el);
          function draw() { rd.innerHTML = `<div style="font-size:26px">${'🌳'.repeat(t) || '🏜️'}</div><div style="font-size:22px">${'🐦'.repeat(Math.min(3 * t, 40))}</div>${t} trees → about ${3 * t} bird homes, shade for ${2 * t} people, cooler air${t === 0 ? ' — no homes, no shade, hot and dusty' : ''}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'People who protect', gen(R) { return G9.S9.pickQ(R, [['Which community in Rajasthan protects trees and blackbuck?', 'the Bishnois'], ['What did people do in the Chipko movement?', 'hugged trees to stop them being cut'], ['What does "Chipko" mean?', 'to hug / stick to'], ['Name one person or group that protects nature.', 'any: Bishnois, Chipko villagers, forest guards']]); } },
      { title: 'Helpful or harmful', gen(R) { return G9.S9.groupQ(R, [['planting trees', 0], ['burning plastic', 1], ['saving water', 0], ['teasing a dog', 1], ['putting waste in bins', 0], ['breaking branches', 1]], ['helpful', 'harmful'], 'Is this helpful or harmful to nature: '); } },
      { title: 'Why care', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why do monkeys or elephants sometimes come into towns?', 'their forests are cut; they lose food and homes'], ['Why should we not feed wild animals chips?', 'it makes them sick and dependent'], ['How do trees help people?', 'shade, fruit, wood, clean air, rain']]); } },
      { title: 'Count the saplings', gen(R) { const c = R.int(20, 40), each = R.int(1, 3); return { q: `${c} children each plant ${each} sapling${each > 1 ? 's' : ''}. How many saplings?`, a: String(c * each), ans: c * each }; } },
      { title: 'My promise', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Write one promise to protect nature.', 'any: I will plant a tree / save water / not litter'], ['How can a class help birds?', 'water bowls, bird feeders, protect nests']]); } }
    ],
    quiz: [
      { q: 'Chipko means', o: ['hug / stick', 'cut', 'run', 'build'], a: 0, e: 'Hug trees.' }, { q: 'Bishnois protect', o: ['trees and blackbuck', 'only cows', 'factories', 'cars'], a: 0, e: 'Rajasthan.' },
      { q: 'Helpful action', o: ['planting saplings', 'burning plastic', 'breaking branches', 'littering'], a: 0, e: 'Plant.' }, { q: 'Feeding chips to monkeys', o: ['harms them', 'helps them', 'is required', 'is healthy'], a: 0, e: 'Junk food.' },
      { q: 'Living in harmony means', o: ['sharing the Earth kindly', 'owning all land', 'driving animals away', 'cutting forests'], a: 0, e: 'Together.' }, { q: 'Animals come to towns when', o: ['forests are cut', 'it rains', 'schools open', 'festivals come'], a: 0, e: 'Lost homes.' },
      { q: 'Trees give', o: ['shade, fruit, homes, clean air', 'only wood', 'nothing', 'noise'], a: 0, e: 'Many gifts.' }, { q: 'Noise near nests', o: ['disturbs birds', 'helps birds', 'is fine', 'feeds birds'], a: 0, e: 'Quiet.' },
      { q: 'A habitat is', o: ['a natural home', 'a shop', 'a vehicle', 'a festival'], a: 0, e: 'Home.' }, { q: 'Cloth bags', o: ['reduce plastic', 'increase plastic', 'harm birds', 'waste water'], a: 0, e: 'Reuse.' },
      { q: 'Small actions by many people', o: ['make a big difference', 'do nothing', 'harm nature', 'are useless'], a: 0, e: 'Together.' }
    ],
    teach: {
      outcomes: ['Explain living in harmony', 'Give examples of communities that protect nature', 'Choose helpful actions'],
      periods: [{ t: 'Stories', flow: [['10 min', 'Tell the Chipko and Bishnoi stories.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Discuss animals in towns.']] }, { t: 'Actions', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Class promise poster.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Nature is only for people.', 'Feeding wild animals is always good.'], activities: ['Plant a sapling.', 'Bird water bowls.'],
      exit: ['Chipko meaning.', 'Two helpful actions.', 'Why animals come to towns.'], homework: 'Make a "Nature promise" card and keep it for a week; tick each day you kept it.'
    },
    slides: [{ t: 'Living in Harmony', b: ['Sharing the Earth', 'Bishnois and Chipko', 'Helpful actions', 'My promise'] }, { t: 'Think and share', b: ['What did Chipko villagers do?', 'One thing you will do for nature?'] }],
    fs: { groups: [['Protectors', [['Bishnois', 'trees, blackbuck'], ['Chipko', 'hugged trees']]], ['Helpful', [['Plant', 'saplings'], ['Save', 'water, electricity'], ['Care', 'water bowls, no teasing']]], ['Harmful', [['Litter', 'plastic in ponds'], ['Cut', 'trees for no reason'], ['Junk food', 'to wild animals']]]],
      ex: [['30 children × 2 saplings', '60 saplings'], ['Chipko', 'hug to save trees']], rem: ['Nature belongs to all.', 'Be gentle with animals.', 'Small acts matter.'] }
  });
})();
