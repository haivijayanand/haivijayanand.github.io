/*
TOOL:    class7_science_ch07
FAMILY:  CBSE_REVISION / Class 7 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 7 Heat Transfer in Nature (conduction, convection, radiation; conductors and insulators of heat; land and sea breeze; water cycle and heat; dark and light colours) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 7, part: 'All chapters', short: 'Heat transfer', title: 'Heat Transfer in Nature',
    blurb: 'Heat flows from hotter to colder objects by conduction (solids), convection (liquids and gases) and radiation (no medium needed); conductors and insulators of heat; sea and land breezes; why dark clothes feel warmer; heat in the water cycle.',
    revise: {
      oneLine: 'Heat flows from a hotter to a colder body. In solids it moves by conduction (particle to particle); in liquids and gases by convection (warm fluid rises, cool fluid sinks); radiation needs no medium — that is how the Sun warms the Earth. Metals are good heat conductors; wood, plastic, air and wool are insulators. Land heats and cools faster than water, causing sea breeze by day and land breeze by night.',
      sections: [
        { h: 'Conduction', html: `<p>Wax pieces stuck on a metal strip fall one by one from the heated end. Pan handles are wood or plastic (insulators).</p>` },
        { h: 'Convection and breezes', html: `<p>Day: land hotter → air above rises → cool air from sea blows in (sea breeze). Night: land cools faster → land breeze to sea.</p>` },
        { h: 'Radiation', html: `<p>Dark surfaces absorb more radiation; light colours reflect more — wear light clothes in summer, dark in winter. Woollens trap insulating air.</p>` }
      ],
      formulas: [['Solids', 'conduction'], ['Liquids, gases', 'convection'], ['No medium', 'radiation'], ['Day', 'sea breeze'], ['Night', 'land breeze']],
      terms: [['Conductor of heat', 'lets heat pass easily'], ['Insulator of heat', 'does not let heat pass easily'], ['Convection current', 'circulation of warm and cool fluid']],
      traps: ['Cold does not flow — heat flows out of warm things.', 'Radiation does not need air.', 'Wool is warm because it traps air, not because it makes heat.'],
      bridge: '<p>Class 8–9 study energy and thermal properties further.</p>'
    },
    explore: [
      { title: 'Sea and land breeze', intro: 'Switch between day and night to see the breeze.',
        build(el, K) { let night = 0; const row = K.row(el); K.select(row, 'time', ['day', 'night'], i => { night = i; an.reset(); an.play(); }); const b = new K.Board(el, { xmin: -5, xmax: 5, ymin: -1.6, ymax: 3, axes: false, grid: 0, aspect: 0.45 }); const rd = K.read(el); const an = new K.Anim(Infinity, () => b.redraw(), { ms: 60 });
          b.onDraw = () => { b.clear(); b.rect(-5, -1.6, 5, 1.6, { fill: '#93c5fd', color: 'none' }); b.rect(0, -1.6, 5, 1.6, { fill: '#d6a46b', color: 'none' }); b.text(-2.5, -0.8, 'sea', { font: 'bold 14px' }); b.text(2.5, -0.8, 'land', { font: 'bold 14px' }); b.text(night ? -4 : 4, 2.5, night ? '🌙' : '☀', { font: '26px' });
            const dir = night ? -1 : 1; const ph = (an.i * 0.05) % 1; for (let k = 0; k < 3; k++) { const p = (ph + k / 3) % 1; const x = -3.5 + 7 * p; b.dot(dir > 0 ? x : -x, 0.5, { r: 5, color: C.blue }); b.dot(dir > 0 ? -x : x, 2.2, { r: 5, color: C.orange }); }
            b.arrow(-3.5 * dir, 0.5, 3.5 * dir, 0.5, { color: C.blue, w: 2 }); b.arrow(3.5 * dir, 0.8, 3.5 * dir, 2, { color: C.orange, w: 2 }); b.arrow(3.5 * dir, 2.2, -3.5 * dir, 2.2, { color: C.orange, w: 2 }); b.arrow(-3.5 * dir, 2, -3.5 * dir, 0.8, { color: C.blue, w: 2 });
            rd.innerHTML = night ? '<b>Night — land breeze</b>: land cools faster; air over the warmer sea rises; cool air flows from land to sea.' : '<b>Day — sea breeze</b>: land heats faster; warm air over land rises; cool air flows from sea to land.'; };
          K.anim(el, an); an.play(); return an; } },
      { title: 'Which way does heat travel?', intro: 'Sort by mode of heat transfer.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Conduction', 'Convection', 'Radiation'], items: [['spoon handle gets hot in tea', 0], ['water heating in a pot (circulating)', 1], ['sunlight warming your face', 2], ['iron press heating a shirt', 0], ['hot air rising above a fire', 1], ['warmth felt standing beside a bonfire', 2], ['sea breeze', 1]] }); } }
    ],
    gens: [
      { title: 'Mode', gen(R) { return G9.S9.groupQ(R, [['heating a metal rod at one end', 0], ['smoke rising from a chimney', 1], ['heat from the Sun reaching Earth', 2], ['ice melting on a steel plate', 0], ['sea breeze', 1], ['heat felt near a heater without touching', 2]], ['conduction', 'convection', 'radiation'], 'Mode of heat transfer: '); } },
      { title: 'Conductor?', gen(R) { return G9.S9.groupQ(R, [['steel', 0], ['wood', 1], ['aluminium', 0], ['plastic', 1], ['copper', 0], ['wool', 1]], ['good conductor of heat', 'insulator of heat'], ''); } },
      { title: 'Why?', gen(R) { return G9.S9.pickQ(R, [['Why do pans have wooden handles?', 'wood is an insulator of heat'], ['Why wear light colours in summer?', 'they absorb less radiation'], ['Why are woollens warm?', 'they trap air, a poor conductor'], ['Why does a sea breeze blow by day?', 'land heats faster; warm air rises; cool sea air moves in']]); } },
      { title: 'Temperature fall', levels: [2, 3], gen(R) { const t = R.int(70, 95), d = R.int(3, 8), m = R.int(3, 6); return { q: `Tea at ${t} °C cools about ${d} °C every 5 minutes at first. Approximate temperature after ${m * 5} minutes?`, a: `${t - d * m} °C`, ans: t - d * m }; } },
      { title: 'Breeze', levels: [2, 3], gen(R) { const n = R.chance(.5); return { q: `At ${n ? 'night' : 'noon'} on a beach, which breeze blows and from where?`, a: n ? 'land breeze — from land to sea' : 'sea breeze — from sea to land' }; } }
    ],
    quiz: [
      { q: 'Heat in solids', o: ['conduction', 'convection', 'radiation', 'evaporation'], a: 0, e: 'Particles.' }, { q: 'Sun to Earth', o: ['radiation', 'conduction', 'convection', 'wind'], a: 0, e: 'No medium.' },
      { q: 'Water heating in a pot', o: ['convection', 'radiation only', 'conduction only', 'none'], a: 0, e: 'Currents.' }, { q: 'Sea breeze blows', o: ['by day, sea to land', 'by night, land to sea', 'never', 'only in winter'], a: 0, e: 'Day.' },
      { q: 'Good heat conductor', o: ['copper', 'wood', 'wool', 'plastic'], a: 0, e: 'Metal.' }, { q: 'Summer clothes', o: ['light colours', 'dark colours', 'wool', 'black'], a: 0, e: 'Reflect.' },
      { q: 'Wool keeps warm by', o: ['trapping air', 'making heat', 'conducting', 'radiating cold'], a: 0, e: 'Air.' }, { q: 'Heat flows from', o: ['hot to cold', 'cold to hot', 'both equally', 'nowhere'], a: 0, e: 'Hot to cold.' },
      { q: 'Land breeze', o: ['night', 'day', 'noon', 'always'], a: 0, e: 'Night.' }, { q: 'Pan handles', o: ['insulators', 'conductors', 'magnets', 'metals'], a: 0, e: 'Safety.' },
      { q: 'Radiation needs', o: ['no medium', 'water', 'air only', 'metal'], a: 0, e: 'Space.' }
    ],
    teach: {
      outcomes: ['Explain three modes of heat transfer', 'Classify conductors and insulators', 'Explain breezes'],
      periods: [{ t: 'Conduction and insulators', flow: [['10 min', 'Wax-on-strip demo.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Spoons in hot water.']] }, { t: 'Convection and radiation', flow: [['15 min', 'Potassium permanganate in heated water.'], ['15 min', 'Explore panel 1.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Cold flows in.', 'Wool makes heat.'], activities: ['Black vs white cans in sun.', 'Convection current with paper spiral.'],
      exit: ['Three modes.', 'Day vs night breeze.', 'Two insulators.'], homework: 'Find three examples each of conduction, convection and radiation at home.'
    },
    slides: [{ t: 'Heat Transfer in Nature', b: ['Conduction', 'Convection', 'Radiation', 'Breezes'] }, { t: 'Think and share', b: ['Why do pans have plastic handles?', 'Why sea breeze by day?'] }],
    fs: { groups: [['Modes', [['Conduction', 'solids'], ['Convection', 'liquids, gases'], ['Radiation', 'no medium']]], ['Materials', [['Conductors', 'metals'], ['Insulators', 'wood, plastic, air, wool']]], ['Nature', [['Day', 'sea breeze'], ['Night', 'land breeze'], ['Colours', 'dark absorb, light reflect']]]],
      ex: [['Spoon in tea', 'conduction'], ['Bonfire warmth', 'radiation']], rem: ['Heat goes hot → cold.', 'Match mode to medium.', 'Light colours for summer.'] }
  });
})();
