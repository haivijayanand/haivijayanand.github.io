/*
TOOL:    class5_science_ch06
FAMILY:  CBSE_REVISION / Class 5 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 6 Some Unique Places (special landscapes of India: Rann of Kutch, Sundarbans, Loktak lake, living root bridges, Ladakh, how people adapt) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const PL = [['Rann of Kutch (Gujarat)', 'a huge white salt desert; flooded in the monsoon, dry salt flats in winter', 'Rann Utsav, salt farming, embroidery', 'wild ass'], ['Sundarbans (West Bengal)', 'the world’s largest mangrove forest, in the Ganga–Brahmaputra delta; tides flood it twice a day', 'fishing, honey collection, boats', 'Royal Bengal tiger'], ['Loktak Lake (Manipur)', 'a lake with floating islands of plants and soil called phumdis', 'fishing, huts on phumdis', 'sangai (dancing deer)'], ['Living root bridges (Meghalaya)', 'bridges grown from the roots of rubber fig trees over many years, in one of the rainiest places', 'Khasi people train the roots', 'forest life'], ['Ladakh', 'a cold, high desert with very little rain and thin air', 'yak and pashmina goat herding, apricots', 'snow leopard'], ['Majuli (Assam)', 'one of the largest river islands, in the Brahmaputra', 'mask-making, satras, farming', 'birds of the river']];
  G9.register({
    no: 6, part: 'Unit 3 · Incredible India', short: 'Unique places', title: 'Some Unique Places',
    blurb: 'Special places of India — the salt desert of Kutch, the mangroves of the Sundarbans, the floating islands of Loktak, the living root bridges of Meghalaya, the cold desert of Ladakh, the river island of Majuli — and how people and animals adapt to them.',
    revise: {
      oneLine: 'India has unique landscapes: the white salt Rann of Kutch, the tidal mangrove Sundarbans with tigers, Loktak lake’s floating phumdis, living root bridges in rainy Meghalaya, cold-desert Ladakh and the river island Majuli. People adapt their homes, food and work to each place and help protect it.',
      sections: [
        { h: 'Wet places', html: `<p>Sundarbans mangroves have breathing roots above the mud; Loktak has floating islands; Meghalaya gets very heavy rain, so roots are grown into bridges.</p>` },
        { h: 'Dry places', html: `<p>Kutch’s salt flats shine white; Ladakh is cold, dry and high, with yaks and apricot orchards.</p>` },
        { h: 'Protecting them', html: `<p>Sangai deer, snow leopards and Bengal tigers live only in special habitats — damage the place and they disappear.</p>` }
      ],
      formulas: [['Sundarbans', 'mangroves, tigers, tides'], ['Loktak', 'phumdis (floating islands)'], ['Meghalaya', 'living root bridges'], ['Kutch', 'white salt desert'], ['Ladakh', 'cold desert']],
      terms: [['Mangrove', 'tree that grows in salty, tidal water'], ['Adapt', 'suit oneself to a place'], ['Habitat', 'natural home']],
      traps: ['A desert can be cold (Ladakh).', 'Root bridges are alive and grown, not built of wood.', 'Tourists must not litter fragile places.'],
      bridge: '<p>Unit 4 explores energy and clothes — how things work and are made.</p>'
    },
    explore: [
      { title: 'Visit unique places', intro: 'Choose a place.',
        build(el, K) { let k = 0; const row = K.row(el); K.select(row, 'place', PL.map(p => p[0]), i => { k = i; draw(); }); const rd = K.read(el);
          function draw() { const p = PL[k]; rd.innerHTML = `<b>${p[0]}</b><div style="margin:4px 0">${p[1]}.</div>👥 people: ${p[2]} · 🐾 special animal: ${p[3]}`; } draw(); return null; } },
      { title: 'Where would you find it?', intro: 'Sort.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Sundarbans', 'Ladakh', 'Loktak', 'Kutch'], items: [['mangrove roots', 0], ['Royal Bengal tiger', 0], ['yak', 1], ['snow leopard', 1], ['phumdis', 2], ['sangai deer', 2], ['white salt flats', 3], ['wild ass', 3]] }); } }
    ],
    gens: [
      { title: 'Which place?', gen(R) { const p = R.pick(PL); return { q: `Which place: ${p[1]}?`, a: p[0] }; } },
      { title: 'Special animal', gen(R) { const p = R.pick(PL); return { q: `Which special animal lives in ${p[0]}?`, a: p[3] }; } },
      { title: 'Adaptations', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['How do mangroves breathe in muddy water?', 'with breathing roots that stick up out of the mud'], ['Why are living root bridges useful in Meghalaya?', 'wooden bridges rot in heavy rain; roots grow stronger'], ['Why do Ladakhis keep yaks?', 'they bear cold and carry loads; give milk and wool'], ['What are phumdis?', 'floating islands of plants and soil']]); } },
      { title: 'Count', gen(R) { const y = R.int(15, 40), st = R.int(1960, 2000); return { q: `A living root bridge was started in ${st} and took about ${y} years to become strong enough to walk on. About which year was it ready?`, a: String(st + y), ans: st + y }; } },
      { title: 'Protect', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why must tourists not litter in unique places?', 'fragile habitats and rare animals get harmed'], ['Why is the sangai deer in danger?', 'its only home, Loktak’s phumdis, is shrinking'], ['How do mangroves protect the coast?', 'they slow storm waves and hold soil']]); } }
    ],
    quiz: [
      { q: 'Sundarbans has', o: ['mangroves and tigers', 'snow leopards', 'camels', 'salt flats'], a: 0, e: 'Delta forest.' }, { q: 'Phumdis are in', o: ['Loktak lake', 'Dal lake', 'Kutch', 'Ladakh'], a: 0, e: 'Manipur.' },
      { q: 'Living root bridges are in', o: ['Meghalaya', 'Rajasthan', 'Goa', 'Punjab'], a: 0, e: 'Khasi hills.' }, { q: 'Ladakh is a', o: ['cold desert', 'rainforest', 'mangrove', 'hot desert'], a: 0, e: 'High and dry.' },
      { q: 'Rann of Kutch is a', o: ['salt desert', 'snow field', 'forest', 'lake island'], a: 0, e: 'White salt.' }, { q: 'Sangai deer lives in', o: ['Manipur', 'Kerala', 'Gujarat', 'Ladakh'], a: 0, e: 'Loktak.' },
      { q: 'Majuli is a', o: ['river island', 'desert', 'glacier', 'volcano'], a: 0, e: 'Brahmaputra.' }, { q: 'Mangroves grow in', o: ['salty tidal water', 'deserts', 'snow', 'dry hills'], a: 0, e: 'Coast.' },
      { q: 'Root bridges are made by', o: ['training living roots', 'cutting planks', 'cement', 'steel'], a: 0, e: 'Grown.' }, { q: 'Yaks are found in', o: ['Ladakh', 'Kutch', 'Sundarbans', 'Kerala'], a: 0, e: 'Cold.' },
      { q: 'Mangroves protect the coast from', o: ['storm waves', 'sunlight', 'birds', 'rain'], a: 0, e: 'Buffer.' }
    ],
    teach: {
      outcomes: ['Describe unique places of India', 'Explain how people and animals adapt', 'Value protecting fragile places'],
      periods: [{ t: 'Places', flow: [['10 min', 'Photo gallery walk.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Locate on a map.']] }, { t: 'Adapt and protect', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Poster: protect a place.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Deserts are always hot.', 'Root bridges are wooden.'], activities: ['Travel brochure.', 'Map pins.'],
      exit: ['Two unique places and their states.', 'One adaptation.', 'One rule for tourists.'], homework: 'Find one unique place in your own state and make a fact card.'
    },
    slides: [{ t: 'Some Unique Places', b: ['Kutch and Ladakh', 'Sundarbans and Loktak', 'Root bridges and Majuli', 'Adapt and protect'] }, { t: 'Think and share', b: ['What are phumdis?', 'Why grow root bridges?'] }],
    fs: { groups: [['Places', [['Rann of Kutch', 'salt desert, Gujarat'], ['Sundarbans', 'mangroves, West Bengal'], ['Loktak', 'phumdis, Manipur'], ['Root bridges', 'Meghalaya'], ['Ladakh', 'cold desert'], ['Majuli', 'river island, Assam']]], ['Special animals', [['Tiger', 'Sundarbans'], ['Sangai', 'Loktak'], ['Snow leopard', 'Ladakh'], ['Wild ass', 'Kutch']]]],
      ex: [['Floating islands', 'phumdis, Loktak'], ['Cold desert', 'Ladakh']], rem: ['Every place has its own life.', 'People adapt wisely.', 'Protect fragile places.'] }
  });
})();
