/*
TOOL:    class9_science_ch13
FAMILY:  CBSE_REVISION / Class 9 Science (Exploration)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 13 Earth as a System: Energy, Matter, and Life (geosphere, hydrosphere, atmosphere, biosphere; solar energy budget; water, carbon and nitrogen cycles; interactions; human impact) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toFixed(2)).toString();
  G9.register({
    no: 13, part: 'All chapters', short: 'Earth system', title: 'Earth as a System: Energy, Matter, and Life',
    blurb: 'Earth’s four spheres — geosphere, hydrosphere, atmosphere and biosphere — and how they interact; energy from the Sun and from Earth’s interior; the energy budget and greenhouse effect; matter cycles (water, carbon, nitrogen, oxygen); soil formation; and how human actions alter these systems.',
    revise: {
      oneLine: 'Earth is a system of interacting spheres: rocks and soil (geosphere), water (hydrosphere), air (atmosphere) and life (biosphere). Energy enters mainly as sunlight and flows through; matter is recycled in biogeochemical cycles — water, carbon, nitrogen, oxygen. Of incoming sunlight about 30% is reflected (albedo); the rest warms Earth, which radiates heat that greenhouse gases partly trap. Human activities (burning fuels, deforestation, fertilisers) disturb these cycles.',
      sections: [
        { h: 'Carbon cycle', html: `<p>Photosynthesis removes CO₂; respiration, decay and burning return it; oceans dissolve CO₂; fossil fuels store ancient carbon.</p>` },
        { h: 'Nitrogen cycle', html: `<p>Nitrogen-fixing bacteria (Rhizobium) and lightning convert N₂ to usable compounds; plants absorb nitrates; decomposers return ammonia; denitrifying bacteria release N₂.</p>` },
        { h: 'Soil', html: `<p>Formed by weathering of rocks (sun, water, wind, roots, lichens) and mixing with humus over thousands of years — a meeting point of all four spheres.</p>` }
      ],
      formulas: [['Spheres', 'geo, hydro, atmo, bio'], ['Albedo', '≈ 30% of sunlight reflected'], ['Energy', 'flows'], ['Matter', 'cycles'], ['CO₂ removal', 'photosynthesis']],
      terms: [['Biogeochemical cycle', 'movement of an element through living and non-living parts'], ['Albedo', 'fraction of light reflected'], ['Weathering', 'breaking down of rocks']],
      traps: ['Energy is not recycled — matter is.', 'Plants also respire and release CO₂.', 'Most nitrogen in air cannot be used directly by plants.'],
      bridge: '<p>Geography, Class 10 Our Environment and Class 12 Ecosystem build on this.</p>'
    },
    explore: [
      { title: 'Energy budget', intro: 'Change Earth’s reflectivity (albedo); see absorbed sunlight (average ≈ 340 W/m² arriving at the top of the atmosphere).',
        build(el, K) { let a = 30; const row = K.row(el); K.slider(row, 'albedo (%)', 5, 80, 1, a, v => { a = v; b.redraw(); }); const b = new K.Board(el, { xmin: 0, xmax: 10, ymin: -0.5, ymax: 4, axes: false, grid: 0, aspect: 0.4 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const In = 340, R = In * a / 100, A = In - R; b.rect(0.5, 0, 2, 3.4, { fill: '#fbbf24', color: C.ink }); b.rect(4, 0, 2, 3.4 * R / In, { fill: C.blue, color: C.ink }); b.rect(7.5, 0, 2, 3.4 * A / In, { fill: C.orange, color: C.ink }); b.text(1.5, -0.3, `incoming ${In}`, { font: '11px' }); b.text(5, -0.3, `reflected ${f(R)}`, { font: '11px' }); b.text(8.5, -0.3, `absorbed ${f(A)}`, { font: '11px' });
            rd.innerHTML = `albedo ${a}% → absorbed ≈ <b>${f(A)} W/m²</b> · ${a > 40 ? 'more ice/cloud → cooler' : a < 25 ? 'darker surface (less ice, more forest/ocean) → warmer' : 'close to Earth’s actual ≈ 30%'}`; };
          b.redraw(); return null; } },
      { title: 'Carbon cycle', intro: '<kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Atmosphere', 'CO₂ in air (about 0.04%).'], ['Photosynthesis', 'Plants and algae take in CO₂ to make sugars — carbon enters the biosphere.'], ['Food chains', 'Animals eat plants; carbon passes along food chains.'], ['Respiration and decay', 'Living things and decomposers return CO₂ to the air.'], ['Oceans and rocks', 'Oceans dissolve CO₂; shells and limestone store carbon for ages.'], ['Fossil fuels', 'Buried remains became coal, oil and gas; burning them releases old carbon quickly — upsetting the balance.']] }); } }
    ],
    gens: [
      { title: 'Sphere', gen(R) { return G9.S9.groupQ(R, [['soil and rocks', 0], ['oceans and glaciers', 1], ['clouds and winds', 2], ['forests and animals', 3], ['volcano', 0], ['groundwater', 1]], ['geosphere', 'hydrosphere', 'atmosphere', 'biosphere'], 'Which sphere: '); } },
      { title: 'Cycles', gen(R) { return G9.S9.pickQ(R, [['Which process removes CO₂ from air?', 'photosynthesis'], ['Who fixes atmospheric nitrogen?', 'nitrogen-fixing bacteria (e.g., Rhizobium), lightning'], ['How does water return to the air?', 'evaporation and transpiration'], ['Which process returns N₂ to air?', 'denitrification by bacteria']]); } },
      { title: 'Albedo', levels: [2, 3], gen(R) { const a = R.int(10, 70); return { q: `If albedo is ${a}%, how much of 340 W/m² is absorbed?`, a: `${f(340 * (100 - a) / 100)} W/m²`, ans: 340 * (100 - a) / 100, tol: 0.01 }; } },
      { title: 'Energy vs matter', gen(R) { return G9.S9.pickQ(R, [['Does energy cycle in ecosystems?', 'no — it flows; matter cycles'], ['Main energy source for Earth’s surface?', 'the Sun'], ['Name an energy source from inside the Earth.', 'geothermal heat'], ['Why does burning fossil fuels raise CO₂?', 'releases carbon stored for millions of years']]); } },
      { title: 'Soil', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Name two agents of weathering.', 'sun (heat), water, wind, roots, lichens'], ['What is humus?', 'decayed organic matter in soil'], ['Why is soil a meeting point of spheres?', 'rocks, water, air and living things all contribute'], ['Why is topsoil precious?', 'forms very slowly, holds nutrients and humus']]); } }
    ],
    quiz: [
      { q: 'Biosphere is', o: ['all living things', 'rocks', 'air only', 'water only'], a: 0, e: 'Life.' }, { q: 'Energy in ecosystems', o: ['flows', 'cycles', 'is created', 'disappears'], a: 0, e: 'Flows.' },
      { q: 'CO₂ removed by', o: ['photosynthesis', 'respiration', 'burning', 'decay'], a: 0, e: 'Plants.' }, { q: 'Earth’s albedo ≈', o: ['30%', '90%', '5%', '60%'], a: 0, e: 'Reflected.' },
      { q: 'Nitrogen fixers', o: ['Rhizobium', 'yeast', 'Amoeba', 'mosquito'], a: 0, e: 'Legumes.' }, { q: 'Hydrosphere includes', o: ['oceans, rivers, ice', 'rocks', 'air', 'animals'], a: 0, e: 'Water.' },
      { q: 'Transpiration adds', o: ['water vapour to air', 'CO₂ to soil', 'nitrogen', 'rocks'], a: 0, e: 'Water.' }, { q: 'Soil forms by', o: ['weathering + humus', 'rain only', 'fire', 'magnets'], a: 0, e: 'Slow.' },
      { q: 'Fossil fuels store', o: ['ancient carbon', 'nitrogen', 'oxygen', 'water'], a: 0, e: 'Carbon.' }, { q: 'Matter in Earth system', o: ['cycles', 'flows one way', 'is lost to space mostly', 'is created'], a: 0, e: 'Recycled.' },
      { q: 'Main external energy source', o: ['Sun', 'Moon', 'core', 'wind'], a: 0, e: 'Sun.' }
    ],
    teach: {
      outcomes: ['Describe Earth’s spheres and interactions', 'Explain energy flow and matter cycles', 'Evaluate human impacts'],
      periods: [{ t: 'Spheres and energy', flow: [['10 min', 'Sphere spotting in the schoolyard.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Albedo test: black vs white cans.']] }, { t: 'Cycles', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Nitrogen cycle diagram.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Energy recycles.', 'Plants don’t release CO₂.'], activities: ['Terrarium as a closed system.', 'Cycle role-play.'],
      exit: ['Four spheres.', 'Carbon cycle steps.', 'Energy vs matter.'], homework: 'Draw one event (e.g., a monsoon storm) and show how all four spheres interact.'
    },
    slides: [{ t: 'Earth as a System', b: ['Four spheres', 'Energy budget', 'Water, carbon, nitrogen cycles', 'Human impact'] }, { t: 'Think and share', b: ['Why does melting ice speed warming?', 'Energy flows, matter cycles — why?'] }],
    fs: { groups: [['Spheres', [['Geosphere', 'rocks, soil'], ['Hydrosphere', 'water'], ['Atmosphere', 'air'], ['Biosphere', 'life']]], ['Energy', [['Source', 'Sun'], ['Albedo', '≈ 30%'], ['Greenhouse', 'traps heat']]], ['Cycles', [['Carbon', 'photosynthesis ↔ respiration'], ['Nitrogen', 'fixation, denitrification'], ['Water', 'evaporation, rain']]]],
      ex: [['albedo 30%, 340 W/m²', '238 W/m² absorbed'], ['Transpiration', 'bio → atmo']], rem: ['Spheres interact.', 'Energy flows.', 'Matter cycles.'] }
  });
})();
