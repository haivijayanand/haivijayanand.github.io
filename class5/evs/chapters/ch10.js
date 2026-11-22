/*
TOOL:    class5_science_ch10
FAMILY:  CBSE_REVISION / Class 5 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 10 Earth - Our Shared Home (biodiversity, food webs, pollution of air water and soil, climate change, conservation, sustainable living) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 10, part: 'Unit 5 · Our Amazing Planet', short: 'Our shared Earth', title: 'Earth - Our Shared Home',
    blurb: 'The Earth as a home shared by all living things: variety of life (biodiversity), how living things depend on each other, pollution of air, water and soil, a warming planet, protected areas, and living sustainably — reduce, reuse, recycle, save.',
    revise: {
      oneLine: 'Earth is the only known planet with life, shared by millions of kinds of plants, animals and microbes that depend on each other. Pollution, cutting forests and wasteful living harm this home and warm the planet. We protect it with national parks and sanctuaries, and by reducing, reusing, recycling, saving water and energy and planting trees.',
      sections: [
        { h: 'Biodiversity', html: `<p>Variety of living things in an area. Remove one (like bees or vultures) and others are affected.</p>` },
        { h: 'Pollution', html: `<p>Air: smoke from vehicles, factories, burning waste. Water: sewage, plastic, chemicals. Soil: plastic, too many chemical fertilisers.</p>` },
        { h: 'Protecting Earth', html: `<p>National parks (Jim Corbett, Kaziranga), sanctuaries, Project Tiger; at home: 3 Rs, save water and power, use public transport, plant trees.</p>` }
      ],
      formulas: [['Biodiversity', 'variety of life'], ['Pollution', 'harmful things in air, water, soil'], ['3 Rs', 'reduce, reuse, recycle'], ['Protected areas', 'national parks, sanctuaries']],
      terms: [['Sustainable', 'meeting today’s needs without harming the future'], ['Endangered', 'at risk of dying out'], ['Global warming', 'slow heating of the Earth']],
      traps: ['Every species matters, even insects.', 'Burning plastic is pollution, not disposal.', 'Small daily actions by many people add up.'],
      bridge: '<p>Class 6 Curiosity continues with science in depth.</p>'
    },
    explore: [
      { title: 'A web of life', intro: 'Remove a living thing and see who is affected.',
        build(el, K) { const L = ['🌿 grass', '🐇 rabbit', '🦗 grasshopper', '🐸 frog', '🐍 snake', '🦅 eagle', '🐝 bees']; const E = [[0, 1], [0, 2], [2, 3], [3, 4], [1, 4], [4, 5], [1, 5], [6, 0]]; let k = -1; const row = K.row(el); K.select(row, 'remove', ['nothing', ...L], i => { k = i - 1; draw(); }); const rd = K.read(el);
          function draw() { if (k < 0) { rd.innerHTML = 'Everything is linked: grass feeds rabbits and grasshoppers; frogs eat grasshoppers; snakes eat frogs and rabbits; eagles eat snakes and rabbits; bees pollinate plants.'; return; } const aff = new Set(); const q = [k]; while (q.length) { const x = q.shift(); E.forEach(([a, b]) => { if (a === x && !aff.has(b) && b !== k) { aff.add(b); q.push(b); } }); } rd.innerHTML = `remove <b>${L[k]}</b> → affected: ${[...aff].map(i => L[i]).join(', ') || 'others lose a predator — their numbers may grow too much'}${k === 6 ? ' (fewer flowers become seeds)' : ''}`; } draw(); return null; } },
      { title: 'Footprint check', intro: 'Choose your habits; see a simple green score.',
        build(el, K) { const H = [['carry a cloth bag', 2], ['switch off lights and fans', 2], ['walk/cycle/bus for short trips', 3], ['close the tap while brushing', 2], ['separate wet and dry waste', 2], ['plant or water a tree', 2]]; const on = new Set([0, 3]); const box = K.h('div'); el.appendChild(box); const rd = K.read(el);
          function draw() { box.innerHTML = H.map((h, i) => `<label style="display:block;margin:3px 0"><input type="checkbox" data-i="${i}" ${on.has(i) ? 'checked' : ''}> ${h[0]}</label>`).join(''); box.querySelectorAll('input').forEach(c => c.onchange = () => { c.checked ? on.add(+c.dataset.i) : on.delete(+c.dataset.i); draw(); }); const s = [...on].reduce((a, i) => a + H[i][1], 0); rd.innerHTML = `green score <b>${s} / 13</b> · ${s >= 10 ? 'Earth champion!' : s >= 6 ? 'good — add one more habit' : 'start with one easy habit this week'}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Pollution type', gen(R) { return G9.S9.groupQ(R, [['smoke from vehicles', 0], ['sewage in rivers', 1], ['plastic in fields', 2], ['burning leaves', 0], ['factory waste in lakes', 1], ['too many chemical fertilisers', 2]], ['air pollution', 'water pollution', 'soil pollution'], 'Which pollution: '); } },
      { title: 'Protected areas', gen(R) { return G9.S9.pickQ(R, [['Kaziranga National Park is famous for?', 'one-horned rhinoceros (Assam)'], ['Jim Corbett National Park is in?', 'Uttarakhand'], ['What is Project Tiger?', 'a plan to protect tigers and their forests'], ['Gir forest is home to?', 'Asiatic lions']]); } },
      { title: 'Sustainable habits', gen(R) { return G9.S9.groupQ(R, [['refilling a steel bottle', 0], ['using plastic straws daily', 1], ['repairing a toy', 0], ['leaving the AC on in an empty room', 1], ['composting kitchen waste', 0]], ['good for Earth', 'harmful'], 'Good for Earth or harmful: '); } },
      { title: 'Trees and air', levels: [2, 3], gen(R) { const c = R.int(25, 45), t = R.int(1, 3); return { q: `Each of ${c} students plants ${t} sapling${t > 1 ? 's' : ''}. If 4 out of 5 survive, how many grow?`, a: String(Math.floor(c * t * 4 / 5)), ans: Math.floor(c * t * 4 / 5) }; } },
      { title: 'Web of life', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['What happens if all bees disappear?', 'many plants are not pollinated; less fruit and food'], ['Why are vultures important?', 'they clean up dead animals and stop disease'], ['What does endangered mean?', 'at risk of dying out']]); } }
    ],
    quiz: [
      { q: 'Biodiversity means', o: ['variety of life', 'one animal', 'pollution', 'weather'], a: 0, e: 'Variety.' }, { q: 'Smoke from vehicles causes', o: ['air pollution', 'clean air', 'rain', 'soil'], a: 0, e: 'Air.' },
      { q: 'Kaziranga is famous for', o: ['one-horned rhino', 'lion', 'camel', 'penguin'], a: 0, e: 'Assam.' }, { q: 'Gir forest has', o: ['Asiatic lions', 'tigers only', 'polar bears', 'kangaroos'], a: 0, e: 'Gujarat.' },
      { q: 'Sustainable means', o: ['not harming the future', 'wasting more', 'buying more', 'cutting trees'], a: 0, e: 'Future.' }, { q: 'If bees vanish', o: ['fewer fruits', 'more fruits', 'nothing', 'more honey'], a: 0, e: 'Pollination.' },
      { q: 'Burning plastic is', o: ['pollution', 'recycling', 'composting', 'safe'], a: 0, e: 'Toxic.' }, { q: 'Good for Earth', o: ['composting', 'littering', 'wasting water', 'burning leaves'], a: 0, e: 'Compost.' },
      { q: 'Endangered means', o: ['at risk of dying out', 'very common', 'dangerous', 'extinct already'], a: 0, e: 'Risk.' }, { q: 'Project Tiger protects', o: ['tigers and forests', 'factories', 'cars', 'rivers only'], a: 0, e: 'Conservation.' },
      { q: 'Earth is the only planet known to have', o: ['life', 'rocks', 'air', 'water ice'], a: 0, e: 'Life.' }
    ],
    teach: {
      outcomes: ['Explain biodiversity and interdependence', 'Identify kinds of pollution', 'Practise sustainable habits'],
      periods: [{ t: 'Web of life', flow: [['10 min', 'Yarn web game.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Protected areas map.']] }, { t: 'Act for Earth', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Class green pledge.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Insects do not matter.', 'One person cannot help.'], activities: ['Yarn food web.', 'Plastic-free week.'],
      exit: ['Three kinds of pollution.', 'One national park and animal.', 'Two green habits.'], homework: 'Try three green habits for a week; record how many days you kept each.'
    },
    slides: [{ t: 'Earth - Our Shared Home', b: ['Biodiversity', 'Web of life', 'Pollution', 'Protecting our Earth'] }, { t: 'Think and share', b: ['What if bees vanished?', 'Your green habit?'] }],
    fs: { groups: [['Life', [['Biodiversity', 'variety of life'], ['Web of life', 'all depend on each other'], ['Endangered', 'at risk']]], ['Pollution', [['Air', 'smoke, burning'], ['Water', 'sewage, plastic'], ['Soil', 'plastic, chemicals']]], ['Protect', [['Parks', 'Kaziranga, Corbett, Gir'], ['3 Rs', 'reduce, reuse, recycle'], ['Save', 'water, energy; plant trees']]]],
      ex: [['30 students × 2 saplings, 4/5 survive', '48 trees'], ['Kaziranga', 'one-horned rhino']], rem: ['Every species matters.', 'Never burn plastic.', 'Small actions add up.'] }
  });
})();
