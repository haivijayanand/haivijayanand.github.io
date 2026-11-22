/*
TOOL:    class5_science_ch01
FAMILY:  CBSE_REVISION / Class 5 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 1 Water - The Essence of Life (water in living things, states of water, water cycle, sources, conservation) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 1, part: 'Unit 1 · Life Around Us', short: 'Water', title: 'Water - The Essence of Life',
    blurb: 'Why water is life: water in our bodies, plants and animals, solid–liquid–gas forms of water, the water cycle, where our water comes from, how much fresh water there really is, and ways to save it.',
    revise: {
      oneLine: 'All living things need water — about 60% of our body is water. Water exists as ice (solid), water (liquid) and water vapour (gas). The Sun drives the water cycle: evaporation → condensation (clouds) → rain/snow → collection in rivers, lakes, seas and underground. Only a tiny part of Earth’s water is fresh and usable, so we must save it.',
      sections: [
        { h: 'States of water', html: `<p>Ice melts into water (melting); water heats into vapour (evaporation); vapour cools into droplets (condensation); water freezes into ice (freezing).</p>` },
        { h: 'Water cycle', html: `<p>Sun heats seas → vapour rises → cools into clouds → rain → rivers, lakes, groundwater → back to the sea.</p>` },
        { h: 'Fresh water is scarce', html: `<p>Most water is salty sea water; most fresh water is locked in ice. Only a small fraction is in rivers, lakes and underground.</p>` }
      ],
      formulas: [['Melting', 'ice → water'], ['Evaporation', 'water → vapour'], ['Condensation', 'vapour → droplets'], ['Freezing', 'water → ice'], ['Body', '≈ 60% water']],
      terms: [['Water vapour', 'water as an invisible gas'], ['Groundwater', 'water stored under the ground'], ['Conservation', 'careful use, saving']],
      traps: ['Clouds are tiny water droplets, not vapour.', 'Sea water is not drinkable without treatment.', 'Water does not disappear — it moves around the cycle.'],
      bridge: '<p>Ch 2 follows a river from the mountains to the sea.</p>'
    },
    explore: [
      { title: 'The water cycle', intro: 'Press <kbd>S</kbd> or Play.',
        build(el, K) { return G9.S9.stages(el, K, { board: { xmin: -5, xmax: 5, ymin: -2, ymax: 3.2, axes: false, grid: 0, aspect: 0.45 }, loop: true,
          base: b => { b.rect(-5, -2, 4.2, 1, { fill: 'rgba(29,78,216,.35)', color: 'none' }); b.poly([[-0.8, -2], [5, -2], [5, 0.6], [2.5, 1.6], [0.8, -0.6]], { fill: 'rgba(120,113,108,.35)', color: '#57534e', w: 2 }); b.text(-4.3, 2.6, '☀️', { font: '30px' }); b.text(-3, -1.6, 'sea', { font: '13px' }); },
          stages: [['Evaporation', 'the Sun heats the sea; water turns into invisible vapour and rises.', b => { for (let x = -4; x <= -1.5; x += 0.8) b.arrow(x, -0.8, x, 0.8, { color: C.orange, w: 2 }); }], ['Condensation', 'high up, vapour cools into tiny droplets — clouds form.', b => b.text(0.5, 2.3, '☁️☁️', { font: '34px' })], ['Precipitation', 'droplets join and fall as rain (or snow on high mountains).', b => { b.text(2.4, 2.6, '🌧️', { font: '34px' }); for (let x = 1.8; x <= 3.2; x += 0.5) b.line(x, 2, x - 0.2, 1.4, { color: C.blue, w: 2 }); }], ['Collection', 'water flows down rivers, fills lakes, soaks underground and returns to the sea.', b => b.arrow(3.5, 1.2, -0.5, -1.3, { color: C.blue, w: 4 })]] }); } },
      { title: 'How much water is fresh?', intro: 'Imagine all of Earth’s water as 100 buckets.',
        build(el, K) { let k = 0; const row = K.row(el); K.select(row, 'show', ['all water', 'fresh water only', 'fresh water we can easily use'], i => { k = i; draw(); }); const rd = K.read(el);
          function draw() { const salt = 97, ice = 2, use = 1; const cells = Array.from({ length: 100 }, (_, i) => i < salt ? 'salt' : i < salt + ice ? 'ice' : 'use'); rd.innerHTML = `<div style="display:grid;grid-template-columns:repeat(20,18px);gap:2px">${cells.map(c => `<span style="height:18px;border-radius:3px;background:${c === 'salt' ? (k ? 'var(--line,#e2e8f0)' : 'var(--blue,#1d4ed8)') : c === 'ice' ? (k === 2 ? 'var(--line,#e2e8f0)' : '#93c5fd') : 'var(--orange,#ea580c)'}"></span>`).join('')}</div>${['about 97 of 100 buckets are salty sea water', 'only about 3 buckets are fresh — and 2 of those are frozen as ice', 'less than 1 bucket is in rivers, lakes and underground for us to use'][k]}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Change of state', gen(R) { return G9.S9.pickQ(R, [['Ice turning into water is called?', 'melting'], ['Water turning into vapour is called?', 'evaporation'], ['Vapour turning into droplets is called?', 'condensation'], ['Water turning into ice is called?', 'freezing']]); } },
      { title: 'Water cycle', gen(R) { return G9.S9.pickQ(R, [['What gives energy to the water cycle?', 'the Sun'], ['What are clouds made of?', 'tiny water droplets (or ice crystals)'], ['Name the order of the water cycle.', 'evaporation → condensation → precipitation → collection'], ['Why are clothes on a line dry by evening?', 'the water evaporates']]); } },
      { title: 'Body water', levels: [2, 3], gen(R) { const w = R.int(25, 45); return { q: `About 60% of your body is water. If you weigh ${w} kg, about how many kg is water?`, a: `about ${Math.round(0.6 * w)} kg`, ans: 0.6 * w, tol: 1 }; } },
      { title: 'Save water', gen(R) { const l = R.pick([6, 8, 12]), d = R.pick([7, 30]); return { q: `A leaking tap wastes ${l} litres a day. How much in ${d} days?`, a: `${l * d} litres`, ans: l * d }; } },
      { title: 'Fresh water', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why can we not drink sea water?', 'it is salty; it needs treatment'], ['Where is most fresh water on Earth?', 'frozen in ice caps and glaciers'], ['Why must groundwater be saved?', 'it refills slowly; over-pumping dries wells']]); } }
    ],
    quiz: [
      { q: 'Clouds form by', o: ['condensation', 'evaporation', 'melting', 'freezing'], a: 0, e: 'Cooling vapour.' }, { q: 'Energy for the water cycle', o: ['Sun', 'Moon', 'wind only', 'plants'], a: 0, e: 'Heat.' },
      { q: 'Water → vapour', o: ['evaporation', 'condensation', 'freezing', 'melting'], a: 0, e: 'Heating.' }, { q: 'Our body is about', o: ['60% water', '10% water', '100% water', '0% water'], a: 0, e: 'Most of us.' },
      { q: 'Most of Earth’s water is', o: ['salty', 'fresh', 'frozen only', 'underground'], a: 0, e: 'Seas.' }, { q: 'Most fresh water is', o: ['frozen in ice', 'in taps', 'in rivers', 'in bottles'], a: 0, e: 'Glaciers.' },
      { q: 'Rain is', o: ['precipitation', 'evaporation', 'condensation', 'collection'], a: 0, e: 'Falling water.' }, { q: 'Ice melting needs', o: ['heat', 'cold', 'salt only', 'darkness'], a: 0, e: 'Warmth.' },
      { q: 'Water vapour is', o: ['an invisible gas', 'white smoke', 'ice', 'salt'], a: 0, e: 'Gas.' }, { q: 'Leak 10 L/day for 30 days', o: ['300 L', '40 L', '30 L', '3000 L'], a: 0, e: 'Multiply.' },
      { q: 'Water in the cycle', o: ['is reused again and again', 'is used up', 'disappears', 'is made new'], a: 0, e: 'Cycle.' }
    ],
    teach: {
      outcomes: ['Explain states of water and changes', 'Describe the water cycle', 'Value fresh water and conserve it'],
      periods: [{ t: 'States and cycle', flow: [['10 min', 'Ice cube melting; steam on a cold plate.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Draw the water cycle.']] }, { t: 'Fresh water', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'School water audit.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Clouds are vapour/smoke.', 'Water gets used up.'], activities: ['Water cycle in a bag.', 'Measure a dripping tap.'],
      exit: ['Four stages of the cycle.', 'Melting vs freezing.', 'Two ways to save water.'], homework: 'Make a water cycle in a zip bag taped to a sunny window; observe for 3 days.'
    },
    slides: [{ t: 'Water - The Essence of Life', b: ['Water in living things', 'Solid, liquid, gas', 'The water cycle', 'Fresh water is precious'] }, { t: 'Think and share', b: ['What are clouds made of?', 'How much of Earth’s water can we use?'] }],
    fs: { groups: [['Changes of state', [['Melting', 'ice → water'], ['Evaporation', 'water → vapour'], ['Condensation', 'vapour → droplets'], ['Freezing', 'water → ice']]], ['Water cycle', [['Order', 'evaporate → condense → rain → collect'], ['Driven by', 'the Sun']]], ['Earth’s water', [['Salty', '≈ 97%'], ['Fresh', '≈ 3%, mostly ice'], ['Usable', 'less than 1%']]]],
      ex: [['35 kg body', '≈ 21 kg water'], ['Leak 8 L × 30 days', '240 L']], rem: ['Clouds are droplets.', 'Fresh water is scarce.', 'Save every drop.'] }
  });
})();
