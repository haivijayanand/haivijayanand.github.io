/*
TOOL:    class5_science_ch07
FAMILY:  CBSE_REVISION / Class 5 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 7 Energy - How Things Work (forms of energy, energy changes, fuels, renewable and non-renewable sources, saving energy) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const DEV = [['torch', 'chemical (battery) → electrical → light'], ['electric fan', 'electrical → motion'], ['solar panel', 'light → electrical'], ['LPG stove', 'chemical (fuel) → heat'], ['bicycle', 'food (chemical) in muscles → motion'], ['windmill', 'wind (motion) → electrical'], ['radio', 'electrical → sound']];
  G9.register({
    no: 7, part: 'Unit 4 · Things Around Us', short: 'Energy', title: 'Energy - How Things Work',
    blurb: 'Energy makes things work: forms of energy (heat, light, sound, motion, electrical, chemical), how energy changes form in everyday machines, fuels, renewable sources (Sun, wind, water) and non-renewable ones (coal, petrol), and saving energy.',
    revise: {
      oneLine: 'Energy is the ability to do work. It comes in many forms — light, heat, sound, motion, electrical and chemical (stored in food, fuel and batteries) — and changes from one form to another: a torch changes battery energy into light. Sun, wind and flowing water are renewable; coal, petrol and gas will run out, so we save energy.',
      sections: [
        { h: 'Energy changes', html: `<p>Fan: electrical → motion. Solar panel: light → electrical. Stove: fuel → heat. Our body: food → motion and heat.</p>` },
        { h: 'Renewable and not', html: `<p>Renewable: solar, wind, hydro (water), biogas. Non-renewable: coal, petroleum, natural gas — formed over millions of years and polluting when burnt.</p>` },
        { h: 'Save energy', html: `<p>Switch off, use LED bulbs, walk or cycle, use public transport, use pressure cookers and solar heaters.</p>` }
      ],
      formulas: [['Energy', 'ability to do work'], ['Forms', 'light, heat, sound, motion, electrical, chemical'], ['Renewable', 'Sun, wind, water'], ['Non-renewable', 'coal, petrol, gas']],
      terms: [['Fuel', 'material burnt to give heat'], ['Renewable', 'will not run out'], ['LED', 'bulb that uses little electricity']],
      traps: ['Energy is not used up — it changes form (some becomes waste heat).', 'Electricity mostly comes from burning coal in India.', 'Solar panels work in daylight, not at night.'],
      bridge: '<p>Ch 8 shows how clothes are made — using energy at every step.</p>'
    },
    explore: [
      { title: 'Energy changes', intro: 'Choose a device; see the energy change. Press <kbd>S</kbd> to step through all.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'device', DEV.map(d => d[0]), i => { k = i; draw(); }); const rd = K.read(el);
          function draw() { const d = DEV[k]; rd.innerHTML = `<b>${d[0]}</b>: ${d[1].split(' → ').map(x => `<span style="padding:3px 8px;border-radius:6px;background:var(--line,#e2e8f0);margin:0 4px">${x}</span>`).join('→')}`; }
          const step = () => { k = (k + 1) % DEV.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'LED or old bulb?', intro: 'Compare a 9 W LED with a 60 W old bulb for the same light.',
        build(el, K) { let h = 5, n = 4; const row = K.row(el); K.slider(row, 'bulbs', 1, 10, 1, n, v => { n = v; draw(); }); K.slider(row, 'hours a day', 1, 12, 1, h, v => { h = v; draw(); }); const rd = K.read(el);
          function draw() { const old = 60 * n * h * 30 / 1000, led = 9 * n * h * 30 / 1000; rd.innerHTML = `per month: old bulbs <b>${old.toFixed(1)} units</b> · LED <b>${led.toFixed(1)} units</b> · saved ${(old - led).toFixed(1)} units (≈ ₹${Math.round((old - led) * 7)} at ₹7 a unit)`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Energy change', gen(R) { const d = R.pick(DEV); return { q: `What energy change happens in a ${d[0]}?`, a: d[1] }; } },
      { title: 'Renewable?', gen(R) { return G9.S9.groupQ(R, [['sunlight', 0], ['coal', 1], ['wind', 0], ['petrol', 1], ['flowing water', 0], ['natural gas', 1], ['biogas', 0]], ['renewable', 'non-renewable'], 'Renewable or non-renewable: '); } },
      { title: 'Units of electricity', levels: [2, 3], gen(R) { const w = R.pick([60, 100, 1000, 1500]), h = R.int(1, 6); return { q: `A ${w} W appliance runs ${h} hours. How many units (kWh)? (1 unit = 1000 Wh)`, a: `${w * h / 1000} units`, ans: w * h / 1000, tol: 1e-6 }; } },
      { title: 'Save energy', gen(R) { return G9.S9.pickQ(R, [['Give two ways to save electricity at home.', 'switch off when not in use; use LED bulbs; use daylight'], ['Why use a pressure cooker?', 'cooks faster, saves fuel'], ['Why cycle or walk short distances?', 'saves petrol, no pollution, good exercise']]); } },
      { title: 'Forms of energy', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['What form of energy is stored in food?', 'chemical energy'], ['What form does a moving ball have?', 'motion energy'], ['A bell ringing gives out which energy?', 'sound'], ['What is energy?', 'the ability to do work']]); } }
    ],
    quiz: [
      { q: 'Torch changes battery energy into', o: ['light', 'sound only', 'motion', 'wind'], a: 0, e: 'Chemical → electrical → light.' }, { q: 'Renewable source', o: ['sunlight', 'coal', 'petrol', 'natural gas'], a: 0, e: 'Never runs out.' },
      { q: 'Fan changes electrical energy into', o: ['motion', 'light', 'chemical', 'food'], a: 0, e: 'Motor.' }, { q: 'Energy in food is', o: ['chemical', 'sound', 'light', 'magnetic'], a: 0, e: 'Stored.' },
      { q: 'Uses least electricity for light', o: ['LED bulb', 'old bulb', 'heater', 'iron'], a: 0, e: 'Efficient.' }, { q: 'Non-renewable', o: ['petrol', 'wind', 'sunlight', 'water'], a: 0, e: 'Runs out.' },
      { q: 'Solar panel changes', o: ['light → electrical', 'sound → light', 'heat → food', 'motion → sound'], a: 0, e: 'Photovoltaic.' }, { q: '1000 W for 2 hours', o: ['2 units', '1 unit', '20 units', '2000 units'], a: 0, e: '2 kWh.' },
      { q: 'Energy is', o: ['ability to do work', 'a fuel only', 'a machine', 'a gas'], a: 0, e: 'Definition.' }, { q: 'Windmill gives', o: ['electricity from wind', 'food', 'coal', 'water'], a: 0, e: 'Wind power.' },
      { q: 'Burning coal causes', o: ['air pollution', 'clean air', 'rain', 'nothing'], a: 0, e: 'Smoke.' }
    ],
    teach: {
      outcomes: ['Name forms of energy and changes', 'Classify renewable/non-renewable sources', 'Suggest ways to save energy'],
      periods: [{ t: 'Forms and changes', flow: [['10 min', 'Torch, bell, toy car demos.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Energy chain drawings.']] }, { t: 'Sources and saving', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Home energy audit.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Energy gets used up.', 'Solar works at night.'], activities: ['Solar cooker box.', 'Meter reading at home.'],
      exit: ['Energy change in a fan.', 'Two renewable sources.', 'One saving tip.'], homework: 'Read your electricity bill: how many units did your home use this month?'
    },
    slides: [{ t: 'Energy - How Things Work', b: ['Forms of energy', 'Energy changes', 'Renewable and non-renewable', 'Saving energy'] }, { t: 'Think and share', b: ['Energy change in a radio?', 'Why LED bulbs?'] }],
    fs: { groups: [['Forms', [['Light, heat, sound', 'we see, feel, hear them'], ['Motion, electrical', 'moving things, current'], ['Chemical', 'food, fuel, battery']]], ['Changes', [['Fan', 'electrical → motion'], ['Solar panel', 'light → electrical'], ['Stove', 'chemical → heat']]], ['Sources', [['Renewable', 'Sun, wind, water, biogas'], ['Non-renewable', 'coal, petrol, gas'], ['Units', 'kWh = W × h ÷ 1000']]]],
      ex: [['1000 W × 2 h', '2 units'], ['Torch', 'chemical → electrical → light']], rem: ['Energy changes form.', 'Switch off, save power.', 'Prefer renewable sources.'] }
  });
})();
