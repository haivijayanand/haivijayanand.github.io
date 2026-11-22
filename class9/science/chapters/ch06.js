/*
TOOL:    class9_science_ch06
FAMILY:  CBSE_REVISION / Class 9 Science (Exploration)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 6 How Forces Affect Motion (balanced and unbalanced forces, inertia, Newton’s laws, momentum, F = ma, action–reaction, conservation of momentum) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toFixed(2)).toString();
  G9.register({
    no: 6, part: 'All chapters', short: 'Forces and motion', title: 'How Forces Affect Motion',
    blurb: 'Balanced and unbalanced forces; inertia and Newton’s first law; momentum p = mv; Newton’s second law F = ma (rate of change of momentum); impulse; Newton’s third law (action and reaction); conservation of momentum in collisions and recoil.',
    revise: {
      oneLine: 'An object stays at rest or moves uniformly unless an unbalanced force acts (first law; inertia depends on mass). Momentum p = mv. Force equals rate of change of momentum: F = ma (second law; 1 N = 1 kg m/s²). Every action has an equal and opposite reaction acting on a different body (third law). In a closed system total momentum is conserved — explaining gun recoil and rockets.',
      sections: [
        { h: 'Inertia in life', html: `<p>Passengers lurch forward when a bus brakes; shaking a branch drops fruit; dusting a carpet by beating it.</p>` },
        { h: 'Impulse', html: `<p>F × t = change in momentum. Increasing stopping time reduces force: cricketers pull hands back, airbags, sand pits for long jump.</p>` },
        { h: 'Conservation', html: `<p>m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂. Gun and bullet start at rest: m_b v_b = −m_g v_g, so the gun recoils.</p>` }
      ],
      formulas: [['Momentum', 'p = mv'], ['2nd law', 'F = ma = Δp/t'], ['Impulse', 'F t = Δp'], ['Conservation', 'm₁u₁ + m₂u₂ = m₁v₁ + m₂v₂'], ['1 N', '1 kg m/s²']],
      terms: [['Inertia', 'tendency to resist change in motion'], ['Momentum', 'mass × velocity'], ['Unbalanced force', 'net force not zero']],
      traps: ['Action and reaction act on different bodies, so they do not cancel.', 'Inertia is measured by mass, not speed.', 'Momentum is a vector — direction matters.'],
      bridge: '<p>Ch 7 uses force to define work and energy; Class 11 Physics extends Newton’s laws.</p>'
    },
    explore: [
      { title: 'F = ma', intro: 'Set force and mass; see acceleration and velocity after 5 s from rest.',
        build(el, K) { let F = 200, m = 50; const row = K.row(el); K.slider(row, 'force (N)', 10, 1000, 10, F, v => { F = v; draw(); }); K.slider(row, 'mass (kg)', 1, 500, 1, m, v => { m = v; draw(); }); const rd = K.read(el);
          function draw() { const a = F / m; rd.innerHTML = `a = F/m = ${F}/${m} = <b>${f(a)} m/s²</b> · after 5 s from rest: v = <b>${f(5 * a)} m/s</b>, momentum = <b>${f(m * 5 * a)} kg m/s</b> (= F × t = ${F * 5})`; } draw(); return null; } },
      { title: 'Collision lab', intro: 'Two trolleys collide and stick together. Set masses and velocities; momentum is conserved.',
        build(el, K) { let m1 = 2, u1 = 3, m2 = 1, u2 = -1; const row = K.row(el); K.slider(row, 'm₁ (kg)', 1, 10, 1, m1, v => { m1 = v; b.redraw(); }); K.slider(row, 'u₁ (m/s)', -5, 5, 0.5, u1, v => { u1 = v; b.redraw(); }); K.slider(row, 'm₂ (kg)', 1, 10, 1, m2, v => { m2 = v; b.redraw(); }); K.slider(row, 'u₂ (m/s)', -5, 5, 0.5, u2, v => { u2 = v; b.redraw(); }); const b = new K.Board(el, { xmin: -6, xmax: 6, ymin: -1.5, ymax: 1.5, axes: false, grid: 0, aspect: 0.25 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.line(-6, -0.6, 6, -0.6, { color: C.grey, w: 2 }); const w1 = 0.6 + m1 * 0.15, w2 = 0.6 + m2 * 0.15; b.rect(-3 - w1, -0.6, w1, 0.9, { fill: C.blue, color: C.ink }); b.rect(1, -0.6, w2, 0.9, { fill: C.orange, color: C.ink }); if (u1) b.arrow(-3 - w1 / 2, 0.8, -3 - w1 / 2 + u1 * 0.4, 0.8, { color: C.blue, w: 3 }); if (u2) b.arrow(1 + w2 / 2, 0.8, 1 + w2 / 2 + u2 * 0.4, 0.8, { color: C.orange, w: 3 });
            const p = m1 * u1 + m2 * u2, v = p / (m1 + m2); rd.innerHTML = `total momentum before = ${m1}×${u1} + ${m2}×${u2} = <b>${f(p)} kg m/s</b> · after sticking: v = ${f(p)} ÷ ${m1 + m2} = <b>${f(v)} m/s</b> ${v > 0 ? '→ right' : v < 0 ? '← left' : '(at rest)'}`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'F = ma', gen(R) { const m = R.int(2, 100), a = R.int(1, 10); return R.chance(.5) ? { q: `Force to accelerate ${m} kg at ${a} m/s²?`, a: `${m * a} N`, ans: m * a } : { q: `A ${m * a} N force acts on ${m} kg. Acceleration?`, a: `${a} m/s²`, ans: a }; } },
      { title: 'Momentum', gen(R) { const m = R.int(1, 80), v = R.int(2, 30); return { q: `Momentum of a ${m} kg body moving at ${v} m/s?`, a: `${m * v} kg m/s`, ans: m * v }; } },
      { title: 'Recoil', levels: [2, 3], gen(R) { const mb = R.pick([0.01, 0.02, 0.05]), vb = R.pick([200, 300, 400, 500]), mg = R.pick([2, 4, 5]); return { q: `A ${mb * 1000} g bullet leaves a ${mg} kg gun at ${vb} m/s. Recoil speed of the gun?`, a: `${f(mb * vb / mg)} m/s`, ans: mb * vb / mg, tol: 0.001 }; } },
      { title: 'Impulse', levels: [2, 3], gen(R) { const m = R.pick([0.15, 0.2, 0.5]), v = R.int(10, 30), t = R.pick([0.05, 0.1, 0.2]); return { q: `A ${m} kg ball at ${v} m/s is stopped in ${t} s. Average force?`, a: `${f(m * v / t)} N`, ans: m * v / t, tol: 0.01 }; } },
      { title: 'Laws', gen(R) { return G9.S9.pickQ(R, [['Why do passengers fall forward when a bus brakes?', 'inertia of motion (first law)'], ['Why do cricketers pull their hands back?', 'increase time, reduce force (F t = Δp)'], ['How does a rocket move up?', 'gases pushed down, reaction pushes rocket up'], ['Do action and reaction cancel?', 'no — they act on different bodies']]); } }
    ],
    quiz: [
      { q: 'F =', o: ['ma', 'm/a', 'mv', 'a/m'], a: 0, e: '2nd law.' }, { q: 'Momentum unit', o: ['kg m/s', 'N', 'J', 'm/s²'], a: 0, e: 'mv.' },
      { q: 'Inertia depends on', o: ['mass', 'speed', 'colour', 'shape'], a: 0, e: 'Mass.' }, { q: 'Action–reaction act on', o: ['different bodies', 'same body', 'nothing', 'only liquids'], a: 0, e: 'Third law.' },
      { q: '5 kg at 2 m/s²', o: ['10 N', '2.5 N', '7 N', '0.4 N'], a: 0, e: '5 × 2.' }, { q: 'Gun recoil explained by', o: ['conservation of momentum', 'gravity', 'friction', 'pressure'], a: 0, e: 'Total zero.' },
      { q: 'Balanced forces cause', o: ['no change in motion', 'acceleration', 'rotation always', 'collapse'], a: 0, e: 'Net zero.' }, { q: 'Airbags work by', o: ['increasing stopping time', 'increasing speed', 'adding mass', 'adding friction'], a: 0, e: 'Impulse.' },
      { q: '1 N =', o: ['1 kg m/s²', '1 kg m/s', '1 J', '1 W'], a: 0, e: 'Unit.' }, { q: 'Momentum of 2 kg at 3 m/s', o: ['6 kg m/s', '5', '1.5', '9'], a: 0, e: '2 × 3.' },
      { q: 'First law is also called', o: ['law of inertia', 'law of gravity', 'Ohm’s law', 'Hooke’s law'], a: 0, e: 'Inertia.' }
    ],
    teach: {
      outcomes: ['State Newton’s laws', 'Use F = ma and p = mv', 'Apply conservation of momentum'],
      periods: [{ t: 'Inertia and F = ma', flow: [['10 min', 'Coin-on-card inertia trick.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Problems.']] }, { t: 'Momentum', flow: [['15 min', 'Balloon rocket.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Action and reaction cancel.', 'Moving objects need a force to keep moving.'], activities: ['Balloon rocket.', 'Egg drop with cushioning.'],
      exit: ['Three laws.', 'F = ma problem.', 'Recoil calculation.'], homework: 'Explain three everyday examples of each of Newton’s laws.'
    },
    slides: [{ t: 'How Forces Affect Motion', b: ['Inertia and first law', 'Momentum and F = ma', 'Action and reaction', 'Conservation of momentum'] }, { t: 'Think and share', b: ['Why pull hands back when catching?', 'Why does a gun recoil?'] }],
    fs: { groups: [['Laws', [['1st', 'inertia'], ['2nd', 'F = ma'], ['3rd', 'action = −reaction']]], ['Momentum', [['p', 'mv'], ['Impulse', 'F t = Δp'], ['Conservation', 'total p constant']]], ['Units', [['N', 'kg m/s²'], ['p', 'kg m/s']]]],
      ex: [['20 g at 400 m/s, 4 kg gun', '2 m/s recoil'], ['0.15 kg, 20 m/s, 0.1 s', '30 N']], rem: ['Direction matters.', 'Different bodies in 3rd law.', 'Longer time, smaller force.'] }
  });
})();
