/*
TOOL:    class11_physics_ch07
FAMILY:  CBSE_REVISION / Class 11 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 7 Gravitation (Kepler’s laws, universal law, G, g and its variation, gravitational potential energy, escape speed, orbital speed, satellites, weightlessness) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  const G = 6.67e-11, ME = 5.97e24, RE = 6.37e6;
  G9.register({
    no: 7, part: 'Part I', short: 'Gravitation', title: 'Gravitation',
    blurb: 'Kepler’s three laws; Newton’s law of gravitation and the constant G; acceleration due to gravity and its variation with height and depth; gravitational potential energy; escape speed; orbital speed and period of satellites; geostationary and polar satellites; energy of an orbiting satellite; weightlessness.',
    revise: {
      oneLine: 'F = G m₁m₂/r² (G = 6.67 × 10⁻¹¹ N m² kg⁻²). g = GM/R² ≈ 9.8 m/s²; above the surface g(h) = g(1 − 2h/R) for small h; below, g(d) = g(1 − d/R), zero at the centre. Gravitational PE = −GMm/r. Escape speed vₑ = √(2GM/R) ≈ 11.2 km/s. Orbital speed v₀ = √(GM/r) (≈ 7.9 km/s near the surface); T² ∝ r³ (Kepler III). A satellite’s total energy = −GMm/2r.',
      sections: [
        { h: 'Kepler', html: `<p>I: orbits are ellipses with the Sun at a focus. II: line to the Sun sweeps equal areas in equal times (angular momentum conserved). III: T² ∝ a³.</p>` },
        { h: 'Satellites', html: `<p>Geostationary: equatorial orbit, period 24 h, height ≈ 36 000 km — used for communication. Polar satellites: low orbits over the poles for mapping and weather.</p>` },
        { h: 'Weightlessness', html: `<p>Astronauts in orbit are in free fall with the craft — no normal force, so they feel weightless though gravity acts.</p>` }
      ],
      formulas: [['Force', 'Gm₁m₂/r²'], ['g', 'GM/R²'], ['g at height', '≈ g(1 − 2h/R)'], ['g at depth', 'g(1 − d/R)'], ['Escape', '√(2GM/R) = √(2gR)'], ['Orbital', '√(GM/r)'], ['PE', '−GMm/r']],
      terms: [['G', 'universal gravitational constant'], ['Escape speed', 'minimum launch speed to leave the planet’s pull'], ['Geostationary orbit', '24 h period above the equator']],
      traps: ['g is not zero in orbit — the astronaut is in free fall.', 'Escape speed does not depend on the mass of the object.', 'GPE is negative; it rises (towards 0) with height.'],
      bridge: '<p>Class 12: gravitational ideas reappear in electrostatics (Coulomb’s law).</p>'
    },
    explore: [
      { title: 'g with height and depth', intro: 'Move above or below Earth’s surface; see g (exact inverse-square above, linear inside).',
        build(el, K) { let h = 0; const row = K.row(el); K.slider(row, 'position (km; − = depth)', -6370, 40000, 10, h, v => { h = v; draw(); }); const rd = K.read(el);
          function draw() { const g0 = G * ME / RE ** 2; const r = RE + h * 1000; const g = h >= 0 ? G * ME / r ** 2 : g0 * (1 + h * 1000 / RE); rd.innerHTML = `${h >= 0 ? 'height' : 'depth'} ${Math.abs(h)} km → g = <b>${f(g)} m/s²</b> (${f(100 * g / g0)}% of surface)${h > 35000 && h < 36500 ? ' · near geostationary height' : ''}${h === -6370 ? ' · centre: g = 0' : ''}`; } draw(); return null; } },
      { title: 'Satellite designer', intro: 'Choose an orbit height; see speed and period.',
        build(el, K) { let h = 400; const row = K.row(el); K.slider(row, 'height (km)', 200, 40000, 100, h, v => { h = v; draw(); }); const rd = K.read(el);
          function draw() { const r = RE + h * 1000; const v = Math.sqrt(G * ME / r); const T = 2 * Math.PI * r / v; rd.innerHTML = `orbital speed √(GM/r) = <b>${f(v / 1000)} km/s</b> · period = <b>${T < 7200 ? f(T / 60) + ' min' : f(T / 3600) + ' h'}</b> · escape speed from surface ≈ ${f(Math.sqrt(2 * G * ME / RE) / 1000)} km/s`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Force', gen(R) { const m1 = R.pick([50, 60, 100]), m2 = R.pick([50, 70, 80]), r = R.pick([0.5, 1, 2]); const F = G * m1 * m2 / r / r; return { q: `Gravitational force between ${m1} kg and ${m2} kg, ${r} m apart? (G = 6.67 × 10⁻¹¹)`, a: `${F.toExponential(3)} N`, ans: F, tol: F * 1e-3 }; } },
      { title: 'g at height', gen(R) { const n = R.pick([1, 2, 3]); return { q: `At a height equal to ${n} Earth radius${n > 1 ? 'es' : ''} above the surface, g is what fraction of surface g?`, a: `1/${(n + 1) ** 2}`, ans: 1 / (n + 1) ** 2, tol: 1e-6 }; } },
      { title: 'Escape speed', gen(R) { const k = R.pick([2, 4, 0.5]); return { q: `A planet has the same density as Earth but ${k} times the radius. Escape speed compared with Earth’s 11.2 km/s?`, a: `${f(11.2 * k)} km/s (vₑ ∝ R at same density)`, ans: 11.2 * k, tol: 0.01 }; } },
      { title: 'Kepler III', levels: [2, 3], gen(R) { const k = R.pick([4, 9, 16]); return { q: `A planet’s orbit radius is ${k} times Earth’s. Its year in Earth years?`, a: `${f(k ** 1.5)}`, ans: k ** 1.5, tol: 0.01 }; } },
      { title: 'Concepts', gen(R) { return G9.S9.pickQ(R, [['Why do astronauts feel weightless?', 'they and the craft are in free fall together'], ['Period of a geostationary satellite?', '24 hours'], ['Kepler’s 2nd law follows from?', 'conservation of angular momentum'], ['g at Earth’s centre?', 'zero'], ['Total energy of an orbiting satellite?', '−GMm/2r']]); } }
    ],
    quiz: [
      { q: 'G value', o: ['6.67 × 10⁻¹¹ N m²/kg²', '9.8', '6.67 × 10¹¹', '3 × 10⁸'], a: 0, e: 'Universal.' }, { q: 'Escape speed Earth', o: ['≈ 11.2 km/s', '7.9 km/s', '3 km/s', '30 km/s'], a: 0, e: '√(2gR).' },
      { q: 'g at centre', o: ['0', 'max', 'g/2', '2g'], a: 0, e: 'Linear to 0.' }, { q: 'Kepler III', o: ['T² ∝ r³', 'T ∝ r', 'T² ∝ r²', 'T ∝ r³'], a: 0, e: 'Harmonic law.' },
      { q: 'Geostationary period', o: ['24 h', '12 h', '90 min', '1 year'], a: 0, e: 'Earth spin.' }, { q: 'GPE', o: ['−GMm/r', 'GMm/r', 'mgh always', '0'], a: 0, e: 'Negative.' },
      { q: 'Orbital speed near surface', o: ['≈ 7.9 km/s', '11.2', '1', '0'], a: 0, e: '√(gR).' }, { q: 'Escape speed depends on object mass?', o: ['no', 'yes', 'only light', 'only heavy'], a: 0, e: 'Independent.' },
      { q: 'Equal areas in equal times', o: ['Kepler II', 'Kepler I', 'Kepler III', 'Newton III'], a: 0, e: 'Areal velocity.' }, { q: 'g at height h (h ≪ R)', o: ['g(1 − 2h/R)', 'g(1 − h/R)', 'g(1 + 2h/R)', 'g'], a: 0, e: 'Approx.' },
      { q: 'Weightlessness in orbit means', o: ['free fall', 'no gravity', 'no mass', 'vacuum only'], a: 0, e: 'Falling.' }
    ],
    teach: {
      outcomes: ['Apply Newton’s law and Kepler’s laws', 'Find g variation, escape and orbital speeds', 'Explain satellites and weightlessness'],
      periods: [{ t: 'Law and g', flow: [['10 min', 'Kepler’s data table.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Numericals.']] }, { t: 'Satellites', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'ISRO satellite types.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['No gravity in space.', 'Heavier things escape harder.'], activities: ['Ellipse with string and pins.', 'Orbit simulator.'],
      exit: ['g at height formula.', 'Escape vs orbital.', 'Kepler III.'], homework: 'Compute orbital period of the ISS (≈ 400 km) and compare with data.'
    },
    slides: [{ t: 'Gravitation', b: ['Kepler’s laws', 'Universal law and g', 'Energy and escape', 'Satellites'] }, { t: 'Think and share', b: ['Why weightless in orbit?', 'Why 24 h for geostationary?'] }],
    fs: { groups: [['Law', [['F', 'Gm₁m₂/r²'], ['G', '6.67 × 10⁻¹¹'], ['g', 'GM/R²']]], ['Variation', [['Height', 'g(1 − 2h/R)'], ['Depth', 'g(1 − d/R)'], ['Centre', '0']]], ['Orbits', [['vₑ', '√(2gR) ≈ 11.2 km/s'], ['v₀', '√(GM/r)'], ['T²', '∝ r³'], ['E', '−GMm/2r']]]],
      ex: [['h = R', 'g/4'], ['r = 4× Earth’s', 'T = 8 yr']], rem: ['GPE negative.', 'Escape ≠ orbital.', 'Free fall ≠ no gravity.'] }
  });
})();
