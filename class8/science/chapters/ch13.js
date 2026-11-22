/*
TOOL:    class8_science_ch13
FAMILY:  CBSE_REVISION / Class 8 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 13 Our Home: Earth, a Unique Life-Sustaining Planet (habitable zone, atmosphere layers, ozone, greenhouse effect, water, magnetic field, protecting Earth) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const LAY = [['troposphere', '0 – ≈ 12 km', 'weather, clouds; we live here; temperature falls with height'], ['stratosphere', '≈ 12 – 50 km', 'ozone layer absorbs harmful UV; jets fly low here'], ['mesosphere', '≈ 50 – 80 km', 'coldest layer; meteors burn up'], ['thermosphere', '≈ 80 – 700 km', 'auroras; very thin air; ISS orbits here'], ['exosphere', 'above ≈ 700 km', 'merges into space']];
  G9.register({
    no: 13, part: 'All chapters', short: 'Earth', title: 'Our Home: Earth, a Unique Life-Sustaining Planet',
    blurb: 'Why Earth supports life: right distance from the Sun (habitable zone), liquid water, an atmosphere with oxygen and a natural greenhouse effect, the ozone layer, a magnetic field that shields from solar wind; layers of the atmosphere; and how human activity threatens these life-support systems.',
    revise: {
      oneLine: 'Earth lies in the Sun’s habitable zone, so water can stay liquid. Its atmosphere (≈ 78% N₂, 21% O₂) provides oxygen, keeps temperatures moderate through the natural greenhouse effect, and the stratospheric ozone layer blocks harmful ultraviolet rays. The magnetic field deflects charged particles from the Sun. Burning fossil fuels and deforestation add greenhouse gases, causing global warming; CFCs thinned the ozone layer — protection needs collective action.',
      sections: [
        { h: 'Atmosphere layers', html: `<p>Troposphere (weather), stratosphere (ozone), mesosphere (meteors burn), thermosphere (auroras, ISS), exosphere.</p>` },
        { h: 'Greenhouse effect', html: `<p>Sunlight warms the ground; the ground gives off heat; CO₂, methane and water vapour trap some heat. Without it, Earth’s average would be about −18 °C instead of about 15 °C. Too much traps extra heat → global warming.</p>` },
        { h: 'Protecting Earth', html: `<p>Montreal Protocol (1987) phased out CFCs; the ozone layer is slowly healing. Save energy, plant trees, use public transport, reduce waste.</p>` }
      ],
      formulas: [['N₂ in air', '≈ 78%'], ['O₂ in air', '≈ 21%'], ['Ozone layer', 'stratosphere, blocks UV'], ['Average temperature', '≈ 15 °C (≈ −18 °C without greenhouse)'], ['Water on surface', '≈ 71%']],
      terms: [['Habitable zone', 'distance where liquid water can exist'], ['Greenhouse gas', 'gas that traps heat (CO₂, CH₄)'], ['Ozone', 'O₃ — absorbs UV in the stratosphere']],
      traps: ['The greenhouse effect itself is natural and needed; the problem is enhancing it.', 'Ozone hole ≠ global warming (different causes).', 'Most of Earth’s water is salty; very little is usable fresh water.'],
      bridge: '<p>Geography and Class 10 Our Environment continue these ideas.</p>'
    },
    explore: [
      { title: 'Layers of the atmosphere', intro: 'Step through the layers. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'layer', LAY.map(l => l[0]), i => { k = i; b.redraw(); }); const b = new K.Board(el, { xmin: -5, xmax: 5, ymin: 0, ymax: 5.2, axes: false, grid: 0, aspect: 0.45 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); LAY.forEach((l, i) => { b.rect(-4, i, 8, 1, { fill: i === k ? C.orange : ['#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6'][i], color: '#fff', w: 2 }); b.text(0, i + 0.5, `${l[0]} (${l[1]})`, { font: i === k ? 'bold 13px' : '12px', color: i === k || i > 2 ? '#fff' : undefined }); }); }; const step = () => { k = (k + 1) % LAY.length; sel.value = k; b.redraw(); };
          const old = b.onDraw; b.onDraw = () => { old(); rd.innerHTML = `<b>${LAY[k][0]}</b> (${LAY[k][1]}): ${LAY[k][2]}`; }; K.button(row, 'Next (S)', step); b.redraw(); return { step, play() {}, pause() {} }; } },
      { title: 'Why life here?', intro: '<kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Right distance', 'In the habitable zone: not too hot (Venus) nor too cold (Mars) for liquid water.'], ['Liquid water', 'About 71% of the surface is water; life needs it for all processes.'], ['Air', 'Oxygen to breathe; nitrogen dilutes oxygen; CO₂ for plants.'], ['Natural greenhouse', 'Keeps the average near 15 °C instead of about −18 °C.'], ['Shields', 'Ozone blocks UV; magnetic field deflects solar wind.'], ['Our job', 'Cut emissions, protect forests and water, avoid ozone-damaging chemicals.']] }); } }
    ],
    gens: [
      { title: 'Layer', gen(R) { const l = R.pick(LAY); return { q: `Which atmospheric layer: ${l[2]}?`, a: l[0] }; } },
      { title: 'Air composition', gen(R) { const v = R.int(1, 20) * 50; return { q: `About how many litres of oxygen (21%) in ${v} L of air?`, a: `${+(0.21 * v).toFixed(1)} L`, ans: 0.21 * v, tol: 0.01 }; } },
      { title: 'Greenhouse', gen(R) { return G9.S9.pickQ(R, [['Name two greenhouse gases.', 'carbon dioxide, methane (also water vapour)'], ['Why is the natural greenhouse effect useful?', 'keeps Earth warm enough for life'], ['What causes global warming?', 'extra greenhouse gases from burning fuels, deforestation'], ['What damaged the ozone layer?', 'CFCs']]); } },
      { title: 'Temperature gap', levels: [2, 3], gen(R) { return { q: 'Average Earth temperature is about 15 °C; without greenhouse gases about −18 °C. Difference?', a: '33 °C', ans: 33 }; } },
      { title: 'Life conditions', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['What is the habitable zone?', 'distance from a star where liquid water can exist'], ['How does the magnetic field help?', 'deflects charged particles from the Sun'], ['Which agreement phased out CFCs?', 'Montreal Protocol (1987)'], ['Fraction of Earth’s surface covered by water?', 'about 71%']]); } }
    ],
    quiz: [
      { q: 'Ozone layer is in', o: ['stratosphere', 'troposphere', 'mesosphere', 'exosphere'], a: 0, e: 'Stratosphere.' }, { q: 'Weather happens in', o: ['troposphere', 'stratosphere', 'thermosphere', 'exosphere'], a: 0, e: 'Lowest.' },
      { q: 'Ozone blocks', o: ['UV rays', 'visible light', 'radio', 'sound'], a: 0, e: 'UV.' }, { q: 'Main gas in air', o: ['nitrogen', 'oxygen', 'CO₂', 'argon'], a: 0, e: '78%.' },
      { q: 'Greenhouse gas', o: ['CO₂', 'N₂', 'O₂', 'argon'], a: 0, e: 'Traps heat.' }, { q: 'Meteors burn in', o: ['mesosphere', 'troposphere', 'stratosphere', 'exosphere'], a: 0, e: 'Meso.' },
      { q: 'CFCs harm', o: ['ozone layer', 'magnetic field', 'oceans only', 'Moon'], a: 0, e: 'Ozone.' }, { q: 'Earth’s average without greenhouse', o: ['≈ −18 °C', '≈ 15 °C', '≈ 100 °C', '0 °C'], a: 0, e: 'Cold.' },
      { q: 'Magnetic field', o: ['deflects solar wind', 'makes rain', 'holds ozone', 'causes tides'], a: 0, e: 'Shield.' }, { q: 'Habitable zone allows', o: ['liquid water', 'only ice', 'only steam', 'no air'], a: 0, e: 'Water.' },
      { q: 'Montreal Protocol', o: ['phased out CFCs', 'banned cars', 'planted trees', 'built dams'], a: 0, e: '1987.' }
    ],
    teach: {
      outcomes: ['Explain why Earth supports life', 'Name atmosphere layers', 'Distinguish greenhouse effect and ozone depletion'],
      periods: [{ t: 'Life-support', flow: [['10 min', 'Compare Venus, Earth, Mars.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Water distribution chart.']] }, { t: 'Atmosphere', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Greenhouse jar demo.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Greenhouse effect is all bad.', 'Ozone hole causes warming.'], activities: ['Jar greenhouse demo.', 'Carbon footprint diary.'],
      exit: ['Three life conditions.', 'Two layers + feature.', 'Greenhouse vs ozone.'], homework: 'List five actions your family can take to reduce greenhouse gas emissions.'
    },
    slides: [{ t: 'Our Home: Earth', b: ['Habitable zone', 'Atmosphere layers', 'Greenhouse effect and ozone', 'Protecting Earth'] }, { t: 'Think and share', b: ['Why is Mars cold and Venus hot?', 'Is the greenhouse effect good or bad?'] }],
    fs: { groups: [['Life needs', [['Distance', 'habitable zone'], ['Water', '≈ 71% surface'], ['Air', '78% N₂, 21% O₂']]], ['Atmosphere', [['Troposphere', 'weather'], ['Stratosphere', 'ozone'], ['Mesosphere', 'meteors'], ['Thermosphere', 'auroras']]], ['Threats', [['Warming', 'extra CO₂, CH₄'], ['Ozone', 'CFCs → Montreal Protocol']]]],
      ex: [['500 L air', '105 L O₂'], ['15 − (−18)', '33 °C']], rem: ['Natural greenhouse is needed.', 'Ozone ≠ warming.', 'Protect our only home.'] }
  });
})();
