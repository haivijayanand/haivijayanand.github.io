/*
TOOL:    class11_physics_ch05
FAMILY:  CBSE_REVISION / Class 11 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 5 Work, Energy and Power (work by constant and variable force, work–energy theorem, kinetic and potential energy, spring PE, conservation of mechanical energy, power, collisions) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toFixed(2)).toString();
  G9.register({
    no: 5, part: 'Part I', short: 'Work and energy', title: 'Work, Energy and Power',
    blurb: 'Scalar product; work by a constant force (W = F·d = Fd cos θ) and a variable force (area under F–x); work–energy theorem; kinetic energy; potential energy — gravitational and spring (½kx²); conservative forces and conservation of mechanical energy; power (P = F·v); elastic and inelastic collisions in one and two dimensions.',
    revise: {
      oneLine: 'W = F d cos θ; net work = ΔKE (work–energy theorem). KE = ½mv² = p²/2m. Gravitational PE = mgh; spring PE = ½kx². For conservative forces, KE + PE is constant. Power P = dW/dt = F·v. In all collisions momentum is conserved; in elastic collisions KE is also conserved — for 1-D elastic: v₁ = [(m₁ − m₂)u₁ + 2m₂u₂]/(m₁ + m₂). Perfectly inelastic: bodies stick, v = (m₁u₁ + m₂u₂)/(m₁ + m₂).',
      sections: [
        { h: 'Vertical circle', html: `<p>For a bob on a string to complete a vertical circle, speed at the bottom must be at least √(5gr) (√(gr) at the top).</p>` },
        { h: 'Equal masses', html: `<p>In a 1-D elastic collision of equal masses with one at rest, they exchange velocities.</p>` },
        { h: 'Variable force', html: `<p>W = ∫F dx. Spring: W = ½kx₂² − ½kx₁² (stretching from x₁ to x₂).</p>` }
      ],
      formulas: [['Work', 'F d cos θ'], ['WE theorem', 'W_net = ΔKE'], ['KE', '½mv² = p²/2m'], ['Spring PE', '½kx²'], ['Power', 'P = Fv'], ['Inelastic', 'v = (m₁u₁+m₂u₂)/(m₁+m₂)']],
      terms: [['Conservative force', 'work independent of path (gravity, spring)'], ['Coefficient of restitution', 'e = relative speed after / before'], ['Elastic collision', 'KE conserved']],
      traps: ['Friction is non-conservative.', 'Work can be negative (force opposite to displacement).', 'Momentum is conserved even when KE is not.'],
      bridge: '<p>Ch 6 adds rotation; Ch 11 links work and heat.</p>'
    },
    explore: [
      { title: '1-D collision lab', intro: 'Set masses, velocities and type; see final velocities and KE.',
        build(el, K) { let m1 = 2, m2 = 1, u1 = 4, u2 = 0, e = 1; const row = K.row(el); K.slider(row, 'm₁', 1, 10, 1, m1, v => { m1 = v; draw(); }); K.slider(row, 'm₂', 1, 10, 1, m2, v => { m2 = v; draw(); }); K.slider(row, 'u₁', -10, 10, 1, u1, v => { u1 = v; draw(); }); K.slider(row, 'u₂', -10, 10, 1, u2, v => { u2 = v; draw(); }); K.slider(row, 'e (restitution)', 0, 1, 0.1, e, v => { e = v; draw(); }); const rd = K.read(el);
          function draw() { const M = m1 + m2, P = m1 * u1 + m2 * u2; const v1 = (P - m2 * e * (u1 - u2)) / M, v2 = (P + m1 * e * (u1 - u2)) / M; const K1 = 0.5 * m1 * u1 * u1 + 0.5 * m2 * u2 * u2, K2 = 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2; rd.innerHTML = `v₁ = <b>${f(v1)}</b>, v₂ = <b>${f(v2)}</b> m/s · momentum ${f(P)} → ${f(m1 * v1 + m2 * v2)} (conserved) · KE ${f(K1)} J → ${f(K2)} J (${e === 1 ? 'elastic: conserved' : 'lost ' + f(K1 - K2) + ' J'})`; } draw(); return null; } },
      { title: 'Spring–block energy', intro: 'A block compresses a spring; set k and speed.',
        build(el, K) { let k = 200, m = 2, v = 3; const row = K.row(el); K.slider(row, 'k (N/m)', 50, 1000, 10, k, x => { k = x; draw(); }); K.slider(row, 'm (kg)', 0.5, 10, 0.5, m, x => { m = x; draw(); }); K.slider(row, 'v (m/s)', 0.5, 10, 0.5, v, x => { v = x; draw(); }); const rd = K.read(el);
          function draw() { const x = v * Math.sqrt(m / k); rd.innerHTML = `½mv² = ½kx² → max compression x = v√(m/k) = <b>${f(x * 100)} cm</b> · energy stored = <b>${f(0.5 * m * v * v)} J</b>`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Work', gen(R) { const F = R.int(10, 100), d = R.int(2, 20), th = R.pick([0, 30, 45, 60, 90, 180]); const W = F * d * Math.cos(th * Math.PI / 180); return { q: `F = ${F} N moves a body ${d} m at ${th}° to the force. Work?`, a: `${f(W)} J`, ans: W, tol: 0.01 }; } },
      { title: 'KE and momentum', gen(R) { const m = R.int(1, 20), v = R.int(2, 20); return { q: `m = ${m} kg, v = ${v} m/s. KE and p?`, a: `KE = ${0.5 * m * v * v} J, p = ${m * v} kg m/s`, ans: 0.5 * m * v * v }; } },
      { title: 'Power', gen(R) { const m = R.int(50, 500), h = R.int(5, 30), t = R.int(5, 60); return { q: `A pump lifts ${m} kg of water ${h} m in ${t} s. Power? (g = 9.8)`, a: `${f(m * 9.8 * h / t)} W`, ans: m * 9.8 * h / t, tol: 0.01 }; } },
      { title: 'Inelastic', gen(R) { const m1 = R.int(1, 10), m2 = R.int(1, 10), u1 = R.int(2, 10); const v = m1 * u1 / (m1 + m2); return { q: `${m1} kg at ${u1} m/s sticks to ${m2} kg at rest. Common velocity and KE lost?`, a: `v = ${f(v)} m/s, KE lost = ${f(0.5 * m1 * u1 * u1 - 0.5 * (m1 + m2) * v * v)} J`, ans: v, tol: 0.01 }; } },
      { title: 'Vertical circle', levels: [2, 3], gen(R) { const r = R.pick([0.5, 1, 2, 2.5]); return { q: `Minimum speed at the bottom to complete a vertical circle of radius ${r} m? (g = 9.8)`, a: `√(5gr) = ${f(Math.sqrt(5 * 9.8 * r))} m/s`, ans: Math.sqrt(5 * 9.8 * r), tol: 0.01 }; } }
    ],
    quiz: [
      { q: 'W =', o: ['F d cos θ', 'F d sin θ', 'F/d', 'F + d'], a: 0, e: 'Dot product.' }, { q: 'WE theorem', o: ['W_net = ΔKE', 'W = ΔPE', 'W = P t only', 'W = 0'], a: 0, e: 'Theorem.' },
      { q: 'Spring PE', o: ['½kx²', 'kx', 'kx²', '½kx'], a: 0, e: 'Area.' }, { q: 'Elastic collision conserves', o: ['momentum and KE', 'only momentum', 'only KE', 'neither'], a: 0, e: 'Both.' },
      { q: 'Equal masses elastic, one at rest', o: ['exchange velocities', 'stick', 'both stop', 'double'], a: 0, e: 'Swap.' }, { q: 'P =', o: ['F·v', 'F/v', 'mv', 'Fd'], a: 0, e: 'Rate.' },
      { q: 'KE in terms of p', o: ['p²/2m', 'p/2m', '2p²/m', 'pm'], a: 0, e: 'Relation.' }, { q: 'Friction is', o: ['non-conservative', 'conservative', 'zero work', 'potential'], a: 0, e: 'Path-dependent.' },
      { q: 'Work at 90°', o: ['zero', 'max', 'negative', 'infinite'], a: 0, e: 'cos 90.' }, { q: 'Min speed at top of vertical circle', o: ['√(gr)', '√(5gr)', '0', 'gr'], a: 0, e: 'Tension 0.' },
      { q: '1 kWh =', o: ['3.6 MJ', '1000 J', '3600 J', '36 kJ'], a: 0, e: 'Energy.' }
    ],
    teach: {
      outcomes: ['Compute work and power', 'Use energy conservation', 'Analyse collisions'],
      periods: [{ t: 'Work and energy', flow: [['10 min', 'Is it work? scenarios.'], ['15 min', 'Explore panel 2.'], ['15 min', 'WE theorem problems.']] }, { t: 'Collisions', flow: [['15 min', 'Newton’s cradle demo.'], ['15 min', 'Explore panel 1.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Momentum lost in inelastic collisions.', 'Work always positive.'], activities: ['Bouncing ball restitution.', 'Stair power.'],
      exit: ['WE theorem.', 'Elastic vs inelastic.', 'Power formula.'], homework: 'Measure e of a ball from bounce heights (e = √(h₂/h₁)).'
    },
    slides: [{ t: 'Work, Energy and Power', b: ['Work and WE theorem', 'KE, PE, spring PE', 'Conservation and power', 'Collisions'] }, { t: 'Think and share', b: ['Is momentum lost when balls stick?', 'Min speed for vertical circle?'] }],
    fs: { groups: [['Work', [['W', 'F d cos θ'], ['Variable', '∫F dx'], ['WE', 'W = ΔKE']]], ['Energy', [['KE', '½mv² = p²/2m'], ['PE', 'mgh, ½kx²'], ['Power', 'F·v']]], ['Collisions', [['Momentum', 'always conserved'], ['Elastic', 'KE conserved'], ['Stick', 'v = Σmu/Σm']]]],
      ex: [['2 kg at 4 hits 2 kg (stick)', 'v 2, KE lost 8 J'], ['k 200, m 2, v 3', 'x 30 cm']], rem: ['Watch the angle.', 'Momentum always.', 'Energy only if elastic.'] }
  });
})();
