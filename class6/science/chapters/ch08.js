/*
TOOL:    class6_science_ch08
FAMILY:  CBSE_REVISION / Class 6 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 8 A Journey through States of Water (solid liquid gas, melting freezing evaporation condensation, factors affecting evaporation, water cycle) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 8, part: 'All chapters', short: 'States of water', title: 'A Journey through States of Water',
    blurb: 'Water as ice, liquid water and water vapour; melting, freezing, evaporation and condensation; what speeds up evaporation (heat, wind, spreading out, dry air); cooling by evaporation; and the water cycle linking oceans, clouds and rain.',
    revise: {
      oneLine: 'Water exists as solid (ice), liquid (water) and gas (water vapour). Heating changes ice → water (melting) → vapour (evaporation); cooling reverses it: vapour → water (condensation) → ice (freezing). Evaporation is faster with more heat, wind, larger surface area and drier air, and it cools things. The water cycle moves water between land, sea and sky.',
      sections: [
        { h: 'Changes of state', html: `<p>Melting (solid→liquid), freezing (liquid→solid), evaporation (liquid→gas), condensation (gas→liquid). Droplets on a cold glass come from vapour in the air.</p>` },
        { h: 'Evaporation', html: `<p>Happens at any temperature from the surface. Faster with heat, wind, spreading the liquid out and low humidity. Sweat and earthen pots (matka) cool by evaporation.</p>` },
        { h: 'Water cycle', html: `<p>Sun heats water → evaporation → vapour rises, cools → condensation → clouds → rain/snow (precipitation) → rivers, ground water → sea.</p>` }
      ],
      formulas: [['Melting', 'solid → liquid'], ['Freezing', 'liquid → solid'], ['Evaporation', 'liquid → gas'], ['Condensation', 'gas → liquid'], ['Faster evaporation', 'heat, wind, area, dry air']],
      terms: [['Water vapour', 'water as an invisible gas'], ['Humidity', 'amount of water vapour in air'], ['Precipitation', 'rain, snow, hail']],
      traps: ['The “steam” you see is tiny droplets, not vapour (vapour is invisible).', 'Evaporation does not need boiling.', 'Droplets on a cold glass do not leak through it.'],
      bridge: '<p>Class 7–8 study weather, climate and water resources.</p>'
    },
    explore: [
      { title: 'Heat or cool water', intro: 'Press heat or cool; watch water change state. <kbd>S</kbd> steps.',
        build(el, K) { const ST = [['ice (solid)', '#bfdbfe'], ['water (liquid)', '#3b82f6'], ['water vapour (gas)', '#e5e7eb']]; let k = 1; const row = K.row(el); const b = new K.Board(el, { xmin: -4, xmax: 4, ymin: -2.2, ymax: 2.2, axes: false, grid: 0, aspect: 0.45 }); const rd = K.read(el); let last = '';
          K.button(row, 'heat 🔥', () => { if (k < 2) { last = k === 0 ? 'melting' : 'evaporation'; k++; } b.redraw(); }); K.button(row, 'cool ❄', () => { if (k > 0) { last = k === 2 ? 'condensation' : 'freezing'; k--; } b.redraw(); });
          b.onDraw = () => { b.clear(); b.rect(-1.5, -1.8, 3, 3, { fill: 'none', color: C.ink, w: 2 }); if (k === 0) { b.rect(-0.8, -1.8, 1.6, 1.4, { fill: ST[0][1], color: C.blue, w: 2 }); } else if (k === 1) { b.rect(-1.5, -1.8, 3, 1.5, { fill: ST[1][1], color: 'none' }); } else { for (let i = 0; i < 18; i++) b.dot(-1.3 + (i * 0.37) % 2.6, -1.6 + ((i * 1.31) % 2.6), { r: 3, color: C.purple }); }
            b.text(2.8, 0, ST[k][0], { font: 'bold 14px' }); rd.innerHTML = `state: <b>${ST[k][0]}</b>${last ? ` · last change: <b>${last}</b>` : ''}`; };
          const step = () => { k = (k + 1) % 3; last = ''; b.redraw(); }; b.redraw(); return { step, play() {}, pause() {} }; } },
      { title: 'Water cycle', intro: 'Step through the water cycle. <kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Evaporation', 'The Sun heats seas, lakes and rivers; water becomes vapour and rises.'], ['Condensation', 'High up the air is cool; vapour condenses into tiny droplets — clouds.'], ['Precipitation', 'Droplets join and fall as rain, or as snow and hail when cold.'], ['Collection', 'Water flows in rivers, soaks into the ground and returns to the sea.']] }); } }
    ],
    gens: [
      { title: 'Name the change', gen(R) { return G9.S9.groupQ(R, [['ice cream turning runny', 0], ['water in a freezer becoming ice', 1], ['wet clothes drying', 2], ['droplets on a cold bottle', 3], ['mirror fogging in the bathroom', 3], ['puddle vanishing in the sun', 2]], ['melting', 'freezing', 'evaporation', 'condensation'], 'Name the change: '); } },
      { title: 'Faster drying', gen(R) { return G9.S9.pickQ(R, [['Why do clothes dry faster on a windy day?', 'wind carries away the vapour — faster evaporation'], ['Why spread clothes out?', 'larger surface area — faster evaporation'], ['Why do clothes dry slowly in the rainy season?', 'air is already humid'], ['Why does a matka keep water cool?', 'water seeps out and evaporates, taking heat']]); } },
      { title: 'Water cycle', gen(R) { return G9.S9.pickQ(R, [['What forms clouds?', 'condensation of water vapour'], ['What drives evaporation from seas?', 'heat of the Sun'], ['Name forms of precipitation.', 'rain, snow, hail'], ['Where does rainwater go?', 'rivers, ground water, back to the sea']]); } },
      { title: 'Evaporation data', levels: [2, 3], gen(R) { const v = R.int(200, 500), d = R.int(10, 40), n = R.int(3, 7); return { q: `A tray holds ${v} mL of water and loses ${d} mL a day by evaporation. How much is left after ${n} days?`, a: `${v - d * n} mL`, ans: v - d * n }; } },
      { title: 'Heat or cool?', levels: [2, 3], gen(R) { const c = R.pick([['ice → water', 'heat (melting)'], ['water → ice', 'cool (freezing)'], ['water → vapour', 'heat (evaporation)'], ['vapour → water', 'cool (condensation)']]); return { q: `To change ${c[0]}, do we heat or cool? Name the change.`, a: c[1] }; } }
    ],
    quiz: [
      { q: 'Liquid → gas', o: ['evaporation', 'condensation', 'freezing', 'melting'], a: 0, e: 'Vapour.' }, { q: 'Gas → liquid', o: ['condensation', 'evaporation', 'melting', 'boiling'], a: 0, e: 'Droplets.' },
      { q: 'Solid → liquid', o: ['melting', 'freezing', 'condensation', 'evaporation'], a: 0, e: 'Ice to water.' }, { q: 'Clothes dry fastest', o: ['sunny, windy day', 'humid, still day', 'folded indoors', 'at night in rain'], a: 0, e: 'Heat + wind.' },
      { q: 'Clouds form by', o: ['condensation', 'melting', 'freezing', 'evaporation'], a: 0, e: 'Cooling vapour.' }, { q: 'Water vapour is', o: ['invisible', 'white', 'blue', 'solid'], a: 0, e: 'Gas.' },
      { q: 'Matka cools water by', o: ['evaporation', 'freezing', 'condensation', 'magic'], a: 0, e: 'Seeping.' }, { q: 'Rain, snow, hail are', o: ['precipitation', 'evaporation', 'humidity', 'condensation only'], a: 0, e: 'Falling water.' },
      { q: 'Droplets on a cold glass come from', o: ['air', 'inside the glass', 'the table', 'ice melting through glass'], a: 0, e: 'Vapour condenses.' }, { q: 'Evaporation needs', o: ['no boiling', 'boiling', '100 °C exactly', 'freezing'], a: 0, e: 'Any temperature.' },
      { q: 'Water → ice', o: ['freezing', 'melting', 'evaporation', 'condensation'], a: 0, e: 'Cooling.' }
    ],
    teach: {
      outcomes: ['Name the four changes of state', 'Explain factors affecting evaporation', 'Describe the water cycle'],
      periods: [{ t: 'Changes of state', flow: [['10 min', 'Ice cube on a plate.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Cold glass droplets.']] }, { t: 'Evaporation and cycle', flow: [['15 min', 'Drying race: folded vs spread cloth.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Steam is visible vapour.', 'Glass leaks droplets.'], activities: ['Drying race.', 'Water cycle in a bag.'],
      exit: ['Four changes.', 'Two factors for drying.', 'Water cycle steps.'], homework: 'Draw the water cycle and label evaporation, condensation, precipitation and collection.'
    },
    slides: [{ t: 'A Journey through States of Water', b: ['Ice, water, vapour', 'Four changes of state', 'Evaporation factors', 'Water cycle'] }, { t: 'Think and share', b: ['Why do wet clothes dry?', 'Where do droplets on a cold glass come from?'] }],
    fs: { groups: [['States', [['Solid', 'ice'], ['Liquid', 'water'], ['Gas', 'water vapour']]], ['Changes', [['Melting', 'S → L'], ['Freezing', 'L → S'], ['Evaporation', 'L → G'], ['Condensation', 'G → L']]], ['Evaporation faster', [['Heat', 'yes'], ['Wind', 'yes'], ['Area', 'larger'], ['Humidity', 'lower']]]],
      ex: [['400 mL − 30 mL × 5 d', '250 mL'], ['Mirror fogs', 'condensation']], rem: ['Vapour is invisible.', 'Evaporation cools.', 'Water keeps cycling.'] }
  });
})();
