/*
TOOL:    class8_science_ch05
FAMILY:  CBSE_REVISION / Class 8 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 5 Exploring Forces (push and pull, effects of force, contact and non-contact forces, friction, gravity, mass and weight, net force, spring balance) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toFixed(2)).toString();
  G9.register({
    no: 5, part: 'All chapters', short: 'Forces', title: 'Exploring Forces',
    blurb: 'Force as a push or pull, its effects (start, stop, change speed, direction or shape), net force from forces in the same or opposite directions, contact forces (muscular, friction) and non-contact forces (magnetic, electrostatic, gravitational), mass and weight, and the spring balance; SI unit newton.',
    revise: {
      oneLine: 'A force is a push or pull; it can change an object’s speed, direction or shape. Forces in the same direction add; opposite forces subtract (net force); balanced forces give no change in motion. Contact forces: muscular force, friction. Non-contact forces: magnetic, electrostatic, gravitational. Weight is the gravitational force on a mass: W = m × g (g ≈ 9.8 N/kg on Earth; about 1/6 of that on the Moon).',
      sections: [
        { h: 'Friction', html: `<p>Opposes motion between surfaces in contact; more on rough surfaces. Useful (walking, brakes, writing) and wasteful (wear, heat); reduced by lubricants, ball bearings, streamlining.</p>` },
        { h: 'Non-contact forces', html: `<p>A magnet pulls iron from a distance; a rubbed balloon attracts paper bits (electrostatic); the Earth pulls everything down (gravity).</p>` },
        { h: 'Mass and weight', html: `<p>Mass (kg) is the amount of matter — same everywhere. Weight (N) is a force — changes with place. A spring balance measures weight.</p>` }
      ],
      formulas: [['SI unit of force', 'newton (N)'], ['Weight', 'W = m × g'], ['g on Earth', '≈ 9.8 N/kg'], ['Moon g', '≈ 1/6 of Earth'], ['Same direction', 'add'], ['Opposite', 'subtract']],
      terms: [['Net force', 'combined effect of all forces'], ['Friction', 'force opposing sliding'], ['Electrostatic force', 'between charged objects']],
      traps: ['Mass ≠ weight.', 'Balanced forces can act on a moving object (it keeps moving steadily).', 'Friction also helps us walk.'],
      bridge: '<p>Class 9 studies force and laws of motion with equations.</p>'
    },
    explore: [
      { title: 'Tug of war', intro: 'Set the pulls of the two teams; see the net force and which way the rope moves.',
        build(el, K) { let a = 300, b2 = 250; const row = K.row(el); K.slider(row, 'left team (N)', 0, 600, 10, a, v => { a = v; b.redraw(); }); K.slider(row, 'right team (N)', 0, 600, 10, b2, v => { b2 = v; b.redraw(); }); const b = new K.Board(el, { xmin: -6, xmax: 6, ymin: -1.5, ymax: 1.5, axes: false, grid: 0, aspect: 0.25 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const net = b2 - a; const sh = Math.max(-2, Math.min(2, net / 150)); b.line(-5 + sh, 0, 5 + sh, 0, { color: '#a16207', w: 5 }); b.line(0, -1.2, 0, 1.2, { color: C.grey, w: 1, dash: [4, 4] }); b.dot(sh, 0, { r: 8, color: C.purple }); b.arrow(-1, 0.8, -1 - a / 150, 0.8, { color: C.blue, w: 3 }); b.arrow(1, 0.8, 1 + b2 / 150, 0.8, { color: C.orange, w: 3 });
            rd.innerHTML = net === 0 ? `forces balanced (${a} N each way) → <b>net force 0</b>, rope stays` : `net force = |${b2} − ${a}| = <b>${Math.abs(net)} N</b> towards the <b>${net > 0 ? 'right' : 'left'}</b>`; };
          b.redraw(); return null; } },
      { title: 'Weight on other worlds', intro: 'Choose a mass and a place; see the weight.',
        build(el, K) { const P = [['Earth', 9.8], ['Moon', 1.6], ['Mars', 3.7], ['Jupiter', 24.8]]; let m = 40, k = 0; const row = K.row(el); K.slider(row, 'mass (kg)', 1, 100, 1, m, v => { m = v; draw(); }); K.select(row, 'place', P.map(p => p[0]), i => { k = i; draw(); }); const rd = K.read(el);
          function draw() { rd.innerHTML = `mass ${m} kg (same everywhere) · weight on ${P[k][0]} = ${m} × ${P[k][1]} = <b>${f(m * P[k][1])} N</b>`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Net force', gen(R) { const a = R.int(5, 50) * 10, b = R.int(5, 50) * 10; const same = R.chance(.4); return same ? { q: `Two people push a box the same way with ${a} N and ${b} N. Net force?`, a: `${a + b} N`, ans: a + b } : { q: `Forces of ${a} N to the left and ${b} N to the right act on a cart. Net force?`, a: a === b ? '0 N (balanced)' : `${Math.abs(a - b)} N to the ${b > a ? 'right' : 'left'}`, ans: Math.abs(a - b) }; } },
      { title: 'Weight', gen(R) { const m = R.int(2, 80); return { q: `Weight of a ${m} kg object on Earth? (g = 9.8 N/kg)`, a: `${f(m * 9.8)} N`, ans: m * 9.8, tol: 0.01 }; } },
      { title: 'Contact?', gen(R) { return G9.S9.groupQ(R, [['friction', 0], ['magnetic force', 1], ['muscular force', 0], ['gravity', 1], ['electrostatic force', 1], ['pushing a door', 0]], ['contact force', 'non-contact force'], 'Contact or non-contact: '); } },
      { title: 'Moon weight', levels: [2, 3], gen(R) { const m = R.int(30, 90); return { q: `A ${m} kg astronaut: weight on Earth (9.8) and Moon (1.6 N/kg)?`, a: `${f(m * 9.8)} N and ${f(m * 1.6)} N; mass stays ${m} kg`, ans: m * 1.6, tol: 0.01 }; } },
      { title: 'Friction', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why do shoes have treads?', 'more friction for grip'], ['Why oil machine parts?', 'reduce friction and wear'], ['Why are aircraft streamlined?', 'reduce air resistance (fluid friction)'], ['Name a use of friction.', 'walking, brakes, writing, lighting a match']]); } }
    ],
    quiz: [
      { q: 'SI unit of force', o: ['newton', 'kilogram', 'joule', 'metre'], a: 0, e: 'N.' }, { q: 'Weight =', o: ['m × g', 'm ÷ g', 'm + g', 'g ÷ m'], a: 0, e: 'Formula.' },
      { q: 'Mass on the Moon', o: ['same as Earth', '1/6', '6 times', 'zero'], a: 0, e: 'Mass constant.' }, { q: 'Non-contact force', o: ['gravity', 'friction', 'push', 'muscular'], a: 0, e: 'Distance.' },
      { q: '50 N left, 80 N right', o: ['30 N right', '130 N', '30 N left', '0'], a: 0, e: 'Subtract.' }, { q: 'Friction opposes', o: ['motion', 'gravity', 'light', 'heat'], a: 0, e: 'Sliding.' },
      { q: 'Spring balance measures', o: ['weight', 'mass directly', 'length', 'time'], a: 0, e: 'Force.' }, { q: 'Rubbed balloon attracts paper', o: ['electrostatic', 'magnetic', 'gravity', 'friction'], a: 0, e: 'Charge.' },
      { q: 'Force can change', o: ['speed, direction, shape', 'only speed', 'only colour', 'nothing'], a: 0, e: 'Effects.' }, { q: '10 kg on Earth weighs', o: ['98 N', '10 N', '9.8 N', '980 N'], a: 0, e: '× 9.8.' },
      { q: 'Lubricants', o: ['reduce friction', 'increase friction', 'add mass', 'charge'], a: 0, e: 'Oil.' }
    ],
    teach: {
      outcomes: ['Describe effects of force', 'Find net force', 'Distinguish mass and weight'],
      periods: [{ t: 'Forces', flow: [['10 min', 'Push-pull hunt.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Balloon and magnet demos.']] }, { t: 'Weight and friction', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Spring balance on surfaces.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Mass = weight.', 'Moving needs net force always.'], activities: ['Friction ramp.', 'Spring balance readings.'],
      exit: ['Net force example.', 'W = mg.', 'Two non-contact forces.'], homework: 'List 5 places where friction helps and 5 where it is a nuisance.'
    },
    slides: [{ t: 'Exploring Forces', b: ['Effects of force', 'Net force', 'Contact and non-contact', 'Mass and weight'] }, { t: 'Think and share', b: ['Is mass the same on the Moon?', 'Why do shoes have treads?'] }],
    fs: { groups: [['Force', [['Unit', 'newton'], ['Effects', 'speed, direction, shape'], ['Net', 'add / subtract']]], ['Types', [['Contact', 'muscular, friction'], ['Non-contact', 'magnetic, electrostatic, gravity']]], ['Weight', [['W', 'm × g'], ['g Earth', '9.8 N/kg'], ['g Moon', '≈ 1.6 N/kg']]]],
      ex: [['60 kg on Earth', '588 N'], ['200 N vs 150 N', '50 N']], rem: ['Mass in kg, weight in N.', 'Directions matter.', 'Friction both helps and hinders.'] }
  });
})();
