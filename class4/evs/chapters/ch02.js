/*
TOOL:    class4_science_ch02
FAMILY:  CBSE_REVISION / Class 4 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 2 Exploring Our Neighbourhood (places and helpers in a neighbourhood, maps and directions, public places, keeping it clean and safe) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const PL = [['🏫', 'school', 2, 6], ['🏥', 'health centre', 7, 6], ['🏤', 'post office', 7, 2], ['🛒', 'market', 4, 3], ['🌳', 'park', 1, 2], ['🚉', 'bus stop', 5, 7], ['🏠', 'home', 2, 1]];
  G9.register({
    no: 2, part: 'Unit 1 · Our Community', short: 'Neighbourhood', title: 'Exploring Our Neighbourhood',
    blurb: 'Places in our neighbourhood (school, market, health centre, post office, park, bus stop), the people who work there, reading and drawing a simple map with directions and a key, and keeping public places clean and safe.',
    revise: {
      oneLine: 'A neighbourhood is the area around our home with houses, shops, a school, a park, a health centre and roads. A map shows places from above using symbols (a key) and directions — North, South, East, West. Public places belong to everyone, so we keep them clean and safe.',
      sections: [
        { h: 'Places and helpers', html: `<p>Market — shopkeepers; health centre — doctors and nurses; post office — postal workers; school — teachers; roads — traffic police.</p>` },
        { h: 'Maps', html: `<p>A map is a drawing from above. A key explains symbols. North is usually at the top; East is to the right.</p>` },
        { h: 'Public places', html: `<p>Parks, roads, buses and stations are shared — use dustbins, do not damage, follow safety rules.</p>` }
      ],
      formulas: [['Map', 'view from above'], ['Key', 'explains symbols'], ['Top of map', 'North'], ['Right', 'East'], ['Public place', 'shared by all']],
      terms: [['Neighbourhood', 'area around our home'], ['Landmark', 'easy-to-see place used to give directions'], ['Symbol', 'small picture standing for a place']],
      traps: ['East is right, West is left on a usual map.', 'A map is not a side view.', 'Public property is ours to protect.'],
      bridge: '<p>Ch 3 takes us on a nature trail in the neighbourhood.</p>'
    },
    explore: [
      { title: 'Neighbourhood map', intro: 'Choose where to go from home. The route and directions are shown.',
        build(el, K) { let t = 0; const row = K.row(el); K.select(row, 'go to', PL.slice(0, 6).map(p => p[0] + ' ' + p[1]), i => { t = i; b.redraw(); }); const b = new K.Board(el, { xmin: -0.6, xmax: 9.4, ymin: -0.4, ymax: 8.4, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); for (let i = 0; i <= 8; i++) { b.line(i, 0, i, 8, { color: C.grid, w: 1 }); b.line(0, i, 8, i, { color: C.grid, w: 1 }); } b.text(8.9, 7.6, 'N↑', { font: 'bold 16px' }); PL.forEach(p => b.text(p[2], p[3], p[0], { font: '24px' }));
            const H = PL[6], P = PL[t]; const dx = P[2] - H[2], dy = P[3] - H[3]; if (dx) b.arrow(H[2], H[3], P[2], H[3], { color: C.orange, w: 4 }); if (dy) b.arrow(P[2], H[3], P[2], P[3], { color: C.blue, w: 4 });
            rd.innerHTML = `home → ${P[1]}: ${[dx && `${Math.abs(dx)} block${Math.abs(dx) > 1 ? 's' : ''} ${dx > 0 ? 'East' : 'West'}`, dy && `${Math.abs(dy)} block${Math.abs(dy) > 1 ? 's' : ''} ${dy > 0 ? 'North' : 'South'}`].filter(Boolean).join(', then ')} · ${Math.abs(dx) + Math.abs(dy)} blocks in all`; };
          b.redraw(); return null; } },
      { title: 'Who works where?', intro: 'Sort the helpers to their workplace.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Health centre', 'Post office', 'Market', 'Road'], items: [['nurse', 0], ['doctor', 0], ['postal worker', 1], ['parcel counter clerk', 1], ['vegetable seller', 2], ['shopkeeper', 2], ['traffic police', 3], ['bus driver', 3]] }); } }
    ],
    gens: [
      { title: 'Directions', gen(R) { const D = ['North', 'East', 'South', 'West'], s = ['top', 'right', 'bottom', 'left']; const i = R.int(0, 3); return R.chance(.5) ? { q: `On a map, which direction is at the ${s[i]}?`, a: D[i] } : { q: `Facing North, what is on your right?`, a: 'East' }; } },
      { title: 'Blocks', gen(R) { const e = R.int(1, 6), n = R.int(1, 6); return { q: `The market is ${e} blocks East and ${n} blocks North of home. How many blocks to walk?`, a: String(e + n), ans: e + n }; } },
      { title: 'Places', gen(R) { return G9.S9.pickQ(R, [['Where do we post a letter?', 'post office'], ['Where do we go when ill?', 'health centre / hospital'], ['Where do we catch a bus?', 'bus stop'], ['Where can children play safely outdoors?', 'park / playground']]); } },
      { title: 'Map key', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['What is a map key?', 'a list explaining the symbols on a map'], ['Why do maps use symbols?', 'small pictures save space and are easy to read'], ['Name a landmark near your school.', 'any: temple, big tree, water tank, shop']]); } },
      { title: 'Public places', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why should we not write on park benches?', 'public property is for everyone; it gets spoiled'], ['How can we keep a bus stop clean?', 'use dustbins; do not spit or litter'], ['Who looks after public places?', 'all of us, and the local body (panchayat / municipality)']]); } }
    ],
    quiz: [
      { q: 'Top of a usual map', o: ['North', 'South', 'East', 'West'], a: 0, e: 'Convention.' }, { q: 'Right side of a map', o: ['East', 'West', 'North', 'South'], a: 0, e: 'East.' },
      { q: 'A map key explains', o: ['symbols', 'prices', 'songs', 'rules'], a: 0, e: 'Key.' }, { q: 'Post letters at', o: ['post office', 'park', 'market', 'bus stop'], a: 0, e: 'Post.' },
      { q: 'A map is a view from', o: ['above', 'the side', 'below', 'inside'], a: 0, e: 'Top view.' }, { q: 'Traffic police work', o: ['on roads', 'in hospitals', 'in schools', 'in shops'], a: 0, e: 'Roads.' },
      { q: '3 blocks East + 2 North', o: ['5 blocks', '6 blocks', '1 block', '32 blocks'], a: 0, e: 'Add.' }, { q: 'Public places belong to', o: ['everyone', 'no one', 'one person', 'only children'], a: 0, e: 'Shared.' },
      { q: 'A landmark is', o: ['an easy-to-see place', 'a stone only', 'a key', 'a symbol'], a: 0, e: 'Direction aid.' }, { q: 'Facing North, right is', o: ['East', 'West', 'South', 'North'], a: 0, e: 'Clockwise.' },
      { q: 'A neighbourhood is', o: ['the area around home', 'another country', 'a planet', 'a river'], a: 0, e: 'Near.' }
    ],
    teach: {
      outcomes: ['Identify places and helpers', 'Read and draw a simple map', 'Care for public places'],
      periods: [{ t: 'Our neighbourhood', flow: [['10 min', 'Walk around school; note places.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Helper interviews.']] }, { t: 'Maps', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Draw a map with a key.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Maps are side views.', 'East/West swap.'], activities: ['Classroom map.', 'Treasure hunt with directions.'],
      exit: ['Draw 3 symbols and a key.', 'Route from home to school.', 'One way to keep a park clean.'], homework: 'Draw a map of your street with a key and mark North.'
    },
    slides: [{ t: 'Exploring Our Neighbourhood', b: ['Places and helpers', 'Maps, keys, directions', 'Public places'] }, { t: 'Think and share', b: ['What is at the right of a map?', 'Who works at the post office?'] }],
    fs: { groups: [['Maps', [['View', 'from above'], ['Key', 'explains symbols'], ['N, E, S, W', 'top, right, bottom, left']]], ['Places', [['Health centre', 'doctor, nurse'], ['Post office', 'letters, parcels'], ['Market', 'shopkeepers']]], ['Public places', [['Park, road, bus', 'shared'], ['Our duty', 'keep clean, safe']]]],
      ex: [['3 E + 4 N', '7 blocks'], ['Facing N, right', 'East']], rem: ['Mark North.', 'Use a key.', 'Protect public places.'] }
  });
})();
