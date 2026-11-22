/*
TOOL:    class8_science_ch06
FAMILY:  CBSE_REVISION / Class 8 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 6 Pressure, Winds, Storms, and Cyclones (pressure = force/area, liquid pressure with depth, atmospheric pressure, winds from pressure difference, thunderstorms, cyclones, safety) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toFixed(2)).toString();
  G9.register({
    no: 6, part: 'All chapters', short: 'Pressure and winds', title: 'Pressure, Winds, Storms, and Cyclones',
    blurb: 'Pressure as force per unit area (pascal), why sharp knives and wide straps work, liquid pressure increasing with depth, atmospheric pressure, air moving from high to low pressure as wind, uneven heating, thunderstorms, how cyclones form, and safety and early warnings (IMD).',
    revise: {
      oneLine: 'Pressure = force ÷ area (unit pascal, Pa = N/m²): the same force on a smaller area gives more pressure. Liquid pressure increases with depth and acts in all directions; air exerts atmospheric pressure (about 101 kPa at sea level). Air moves from high to low pressure, making wind. Uneven heating creates winds; warm moist rising air builds thunderstorms, and over warm seas can grow into a cyclone with a calm eye.',
      sections: [
        { h: 'Using pressure', html: `<p>Sharp knife, pointed nails: small area, high pressure. School bags with wide straps, camel’s broad feet, tractor tyres: large area, low pressure.</p>` },
        { h: 'Liquids and air', html: `<p>Water spurts farther from lower holes of a bottle; dams are thicker at the base. A sucked-out tin can is crushed by air pressure.</p>` },
        { h: 'Storms and safety', html: `<p>Cyclones form over warm oceans (above about 26 °C). IMD issues warnings; follow evacuation advice; during lightning, avoid open fields and tall trees.</p>` }
      ],
      formulas: [['Pressure', 'P = F ÷ A'], ['Unit', 'pascal = N/m²'], ['Liquid pressure', '↑ with depth'], ['Sea-level air', '≈ 101 kPa'], ['Wind', 'high → low pressure']],
      terms: [['Atmospheric pressure', 'pressure due to the weight of air'], ['Cyclone', 'low-pressure storm with spiralling winds'], ['Eye', 'calm centre of a cyclone']],
      traps: ['Pressure is not the same as force.', 'Wind blows from high to low pressure.', 'The calm eye does not mean the storm is over.'],
      bridge: '<p>Class 9 studies pressure, buoyancy and floatation.</p>'
    },
    explore: [
      { title: 'Force and area', intro: 'Change force and area; see the pressure.',
        build(el, K) { let F = 500, A = 0.05; const row = K.row(el); K.slider(row, 'force (N)', 50, 1000, 50, F, v => { F = v; draw(); }); K.slider(row, 'area (m²)', 0.001, 0.2, 0.001, A, v => { A = v; draw(); }); const rd = K.read(el);
          function draw() { rd.innerHTML = `P = ${F} N ÷ ${f(A)} m² = <b>${Math.round(F / A).toLocaleString('en-IN')} Pa</b> · halve the area → double the pressure`; } draw(); return null; } },
      { title: 'Water jets', intro: 'Three holes in a bottle: the deeper hole squirts farther (higher pressure).',
        build(el, K) { const b = new K.Board(el, { xmin: -1, xmax: 7, ymin: -0.5, ymax: 4.5, axes: false, grid: 0, aspect: 0.6 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.line(-0.5, 0, 7, 0, { color: C.ink, w: 1.5 }); b.rect(0, 0, 1.2, 4, { fill: '#fff', color: C.ink, w: 2 }); b.rect(0, 0, 1.2, 3.6, { fill: 'rgba(59,130,246,.35)', color: 'none' }); [[3, 0.6], [2, 1.6], [1, 2.6]].forEach((h, i) => { const depth = 3.6 - h[0]; const v = Math.sqrt(depth); const pts = []; for (let t = 0; t <= 1; t += 0.05) { const x = 1.2 + v * 2.2 * t, y = h[0] - 4.9 * 0.18 * t * t * h[0] * 1.2; if (y >= 0) pts.push([x, y]); } for (let j = 0; j < pts.length - 1; j++) b.line(pts[j][0], pts[j][1], pts[j + 1][0], pts[j + 1][1], { color: [C.blue, C.purple, C.orange][i], w: 3 }); b.text(-0.5, h[0], `depth ${depth.toFixed(1)}`, { font: '10px' }); }); };
          rd.innerHTML = 'Liquid pressure increases with depth — so the jet from the lowest hole has the greatest push (it lands farther than it would at the same height with less pressure).'; b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Pressure', gen(R) { const F = R.int(1, 20) * 50, A = R.pick([0.01, 0.02, 0.05, 0.1, 0.5, 2]); return { q: `A force of ${F} N acts on ${A} m². Pressure?`, a: `${f(F / A)} Pa`, ans: F / A, tol: 0.01 }; } },
      { title: 'Area', levels: [2, 3], gen(R) { const P = R.pick([1000, 2000, 5000, 10000]), F = R.int(2, 20) * 100; return { q: `What area gives ${P} Pa with a ${F} N force?`, a: `${f(F / P)} m²`, ans: F / P, tol: 1e-6 }; } },
      { title: 'More or less pressure', gen(R) { return G9.S9.pickQ(R, [['Why are knives sharpened?', 'smaller area → more pressure'], ['Why do bags have wide straps?', 'larger area → less pressure on shoulders'], ['Why are dams thicker at the bottom?', 'water pressure is greatest at depth'], ['Why do camels have broad feet?', 'less pressure; do not sink in sand']]); } },
      { title: 'Wind and storms', gen(R) { return G9.S9.pickQ(R, [['Which way does wind blow?', 'from high pressure to low pressure'], ['Where do cyclones form?', 'over warm oceans'], ['What is the eye of a cyclone?', 'calm, low-pressure centre'], ['Who issues cyclone warnings in India?', 'India Meteorological Department (IMD)']]); } },
      { title: 'Weight pressure', levels: [2, 3], gen(R) { const m = R.int(40, 70), a = R.pick([0.02, 0.04, 0.05]); return { q: `A ${m} kg student (weight ≈ ${m * 10} N) stands on shoes of total area ${a} m². Pressure?`, a: `${f(m * 10 / a)} Pa`, ans: m * 10 / a, tol: 0.01 }; } }
    ],
    quiz: [
      { q: 'Pressure =', o: ['force ÷ area', 'force × area', 'area ÷ force', 'mass × g'], a: 0, e: 'Formula.' }, { q: 'Unit of pressure', o: ['pascal', 'newton', 'joule', 'watt'], a: 0, e: 'Pa.' },
      { q: 'Liquid pressure with depth', o: ['increases', 'decreases', 'same', 'zero'], a: 0, e: 'Deeper.' }, { q: 'Wind blows', o: ['high to low pressure', 'low to high', 'only upward', 'randomly'], a: 0, e: 'Pressure.' },
      { q: 'Sharp knife', o: ['small area, high pressure', 'big area', 'low pressure', 'no force'], a: 0, e: 'Cut.' }, { q: 'Cyclone eye', o: ['calm', 'stormiest', 'hot', 'dry land'], a: 0, e: 'Calm.' },
      { q: '100 N on 0.5 m²', o: ['200 Pa', '50 Pa', '100 Pa', '0.5 Pa'], a: 0, e: '100/0.5.' }, { q: 'Cyclones form over', o: ['warm seas', 'deserts', 'snow', 'mountains'], a: 0, e: 'Warm water.' },
      { q: 'Air pressure at sea level', o: ['≈ 101 kPa', '1 Pa', '0', '1000 kPa'], a: 0, e: 'Atmosphere.' }, { q: 'Lightning safety', o: ['avoid tall trees', 'stand under a tree', 'swim', 'fly kites'], a: 0, e: 'Safety.' },
      { q: 'Dam base thicker because', o: ['pressure greatest at bottom', 'looks good', 'less water', 'wind'], a: 0, e: 'Depth.' }
    ],
    teach: {
      outcomes: ['Calculate pressure', 'Explain liquid and air pressure', 'Explain winds and cyclones'],
      periods: [{ t: 'Pressure', flow: [['10 min', 'Pin vs thumb demo.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Bottle holes (panel 2 / real).']] }, { t: 'Weather', flow: [['15 min', 'Air pressure can crush demo.'], ['15 min', 'Cyclone formation and safety.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Force = pressure.', 'Eye means storm over.'], activities: ['Bottle-hole jets.', 'Cyclone preparedness kit list.'],
      exit: ['P = F/A example.', 'Wind direction rule.', 'Two safety steps.'], homework: 'Estimate the pressure under your feet (weight ÷ shoe area).'
    },
    slides: [{ t: 'Pressure, Winds, Storms, Cyclones', b: ['Pressure = F/A', 'Liquid and air pressure', 'Winds', 'Cyclones and safety'] }, { t: 'Think and share', b: ['Why wide bag straps?', 'Why is the eye calm?'] }],
    fs: { groups: [['Pressure', [['P', 'F ÷ A'], ['Unit', 'Pa = N/m²'], ['Small area', 'high P']]], ['Fluids', [['Liquid', '↑ with depth'], ['Air', '≈ 101 kPa at sea level']]], ['Weather', [['Wind', 'high → low'], ['Cyclone', 'warm sea, low pressure'], ['Warnings', 'IMD']]]],
      ex: [['600 N on 0.04 m²', '15 000 Pa'], ['200 N on 0.1 m²', '2000 Pa']], rem: ['Mind the area.', 'Depth increases pressure.', 'Heed warnings.'] }
  });
})();
