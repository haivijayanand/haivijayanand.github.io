/*
TOOL:    class11_physics_ch04
FAMILY:  CBSE_REVISION / Class 11 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 4 Laws of Motion (inertia, Newton’s laws, momentum, impulse, conservation of momentum, equilibrium, friction, circular motion dynamics, free-body diagrams) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toFixed(2)).toString();
  G9.register({
    no: 4, part: 'Part I', short: 'Laws of motion', title: 'Laws of Motion',
    blurb: 'Aristotle’s fallacy and inertia; Newton’s first, second (F = dp/dt) and third laws; impulse; conservation of momentum; equilibrium of concurrent forces; common forces — tension, normal, friction (static, kinetic, rolling); circular motion — car on level and banked roads; free-body diagrams.',
    revise: {
      oneLine: 'F = dp/dt = ma for constant mass. Impulse J = F Δt = Δp. Total momentum of an isolated system is conserved. For equilibrium, vector sum of forces = 0. Static friction adjusts up to μₛN; kinetic friction = μₖN (μₖ < μₛ). On a level curve, friction provides v²/r: v_max = √(μₛ r g). On a banked road without friction v = √(r g tan θ); with friction v_max = √[r g (μₛ + tan θ)/(1 − μₛ tan θ)].',
      sections: [
        { h: 'Free-body diagrams', html: `<p>Isolate one body, draw all forces on it (weight, normal, tension, friction, applied), choose axes, apply ΣF = ma along each.</p>` },
        { h: 'Connected bodies', html: `<p>Two masses m₁, m₂ over a frictionless pulley (Atwood): a = (m₁ − m₂)g/(m₁ + m₂), T = 2m₁m₂g/(m₁ + m₂).</p>` },
        { h: 'Lift', html: `<p>Apparent weight in a lift: m(g + a) going up with acceleration a, m(g − a) going down; 0 in free fall.</p>` }
      ],
      formulas: [['2nd law', 'F = dp/dt = ma'], ['Impulse', 'FΔt = Δp'], ['Friction', 'fₛ ≤ μₛN, fₖ = μₖN'], ['Level curve', 'v_max = √(μ r g)'], ['Banked (no friction)', 'tan θ = v²/(r g)'], ['Atwood', 'a = (m₁−m₂)g/(m₁+m₂)']],
      terms: [['Inertia', 'resistance to change in motion'], ['Impulse', 'change in momentum'], ['Angle of repose', 'tan θ = μₛ']],
      traps: ['Action–reaction act on different bodies.', 'Static friction is not always μₛN — only its maximum is.', 'Centripetal force is not a new force; something provides it.'],
      bridge: '<p>Ch 5 uses forces to find work and energy.</p>'
    },
    explore: [
      { title: 'Block on an incline', intro: 'Set angle, μ and mass; does the block slide? (g = 9.8)',
        build(el, K) { let th = 25, mu = 0.4, m = 5; const row = K.row(el); K.slider(row, 'angle (°)', 0, 60, 1, th, v => { th = v; b.redraw(); }); K.slider(row, 'μ (static = kinetic, simple)', 0, 1, 0.05, mu, v => { mu = v; b.redraw(); }); K.slider(row, 'mass (kg)', 1, 20, 1, m, v => { m = v; b.redraw(); }); const b = new K.Board(el, { xmin: -0.5, xmax: 10.5, ymin: -0.5, ymax: 6, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const r = th * Math.PI / 180, L = 10; const hx = Math.min(L, 5.8 / Math.tan(r || 0.001)); b.poly([[0, 0], [hx, 0], [0, hx * Math.tan(r)]], { fill: '#e2e8f0', color: C.ink, w: 2 }); const px = hx * 0.45, py = (hx - px) * Math.tan(r); b.dot(px, py + 0.3, { r: 10, color: C.orange });
            const g = 9.8, N = m * g * Math.cos(r), down = m * g * Math.sin(r), fmax = mu * N; const slides = down > fmax; const a = slides ? (down - mu * N) / m : 0; rd.innerHTML = `mg sin θ = <b>${f(down)} N</b> · N = ${f(N)} N · μN = <b>${f(fmax)} N</b> → ${slides ? `slides with a = g(sin θ − μ cos θ) = <b>${f(a)} m/s²</b>` : 'stays at rest (friction balances)'} · angle of repose = tan⁻¹ μ = ${f(Math.atan(mu) * 180 / Math.PI)}°`; };
          b.redraw(); return null; } },
      { title: 'Banked road', intro: 'Set radius, banking angle and μ; see safe speeds.',
        build(el, K) { let r = 100, th = 15, mu = 0.2; const row = K.row(el); K.slider(row, 'radius (m)', 20, 500, 10, r, v => { r = v; draw(); }); K.slider(row, 'bank (°)', 0, 40, 1, th, v => { th = v; draw(); }); K.slider(row, 'μₛ', 0, 0.8, 0.05, mu, v => { mu = v; draw(); }); const rd = K.read(el);
          function draw() { const g = 9.8, t = Math.tan(th * Math.PI / 180); const v0 = Math.sqrt(r * g * t); const den = 1 - mu * t; const vmax = den > 0 ? Math.sqrt(r * g * (mu + t) / den) : Infinity; rd.innerHTML = `optimum speed (no friction needed) √(rg tan θ) = <b>${f(v0)} m/s</b> (${f(v0 * 3.6)} km/h) · max safe speed = <b>${isFinite(vmax) ? f(vmax) + ' m/s (' + f(vmax * 3.6) + ' km/h)' : 'no limit in this model'}</b>`; } draw(); return null; } }
    ],
    gens: [
      { title: 'F = ma', gen(R) { const m = R.int(2, 50), a = R.int(1, 8); return { q: `Net force on ${m} kg accelerating at ${a} m/s²?`, a: `${m * a} N`, ans: m * a }; } },
      { title: 'Impulse', gen(R) { const m = R.pick([0.1, 0.15, 0.2, 0.5]), v = R.int(10, 30); return { q: `A ${m} kg ball hits a wall at ${v} m/s and rebounds at the same speed. Impulse?`, a: `${f(2 * m * v)} N s`, ans: 2 * m * v, tol: 0.001 }; } },
      { title: 'Atwood', gen(R) { const m1 = R.int(3, 10), m2 = R.int(1, m1 - 1); const a = (m1 - m2) * 9.8 / (m1 + m2), T = 2 * m1 * m2 * 9.8 / (m1 + m2); return { q: `Atwood machine: ${m1} kg and ${m2} kg. Acceleration and tension? (g = 9.8)`, a: `a = ${f(a)} m/s², T = ${f(T)} N`, ans: a, tol: 0.01 }; } },
      { title: 'Lift', gen(R) { const m = R.int(40, 80), a = R.int(1, 4), up = R.chance(.5); return { q: `A ${m} kg person in a lift accelerating ${up ? 'up' : 'down'} at ${a} m/s². Apparent weight? (g = 9.8)`, a: `${f(m * (9.8 + (up ? a : -a)))} N`, ans: m * (9.8 + (up ? a : -a)), tol: 0.01 }; } },
      { title: 'Level curve', levels: [2, 3], gen(R) { const mu = R.pick([0.2, 0.3, 0.4, 0.5]), r = R.pick([20, 50, 100]); return { q: `μₛ = ${mu}, radius ${r} m, level road. Max speed? (g = 9.8)`, a: `${f(Math.sqrt(mu * r * 9.8))} m/s`, ans: Math.sqrt(mu * r * 9.8), tol: 0.01 }; } }
    ],
    quiz: [
      { q: 'F =', o: ['dp/dt', 'mv', 'm/a', 'p t'], a: 0, e: '2nd law.' }, { q: 'Impulse equals', o: ['change in momentum', 'force', 'energy', 'power'], a: 0, e: 'FΔt.' },
      { q: 'Kinetic vs static friction', o: ['μₖ < μₛ', 'μₖ > μₛ', 'equal always', 'unrelated'], a: 0, e: 'Easier to keep moving.' }, { q: 'Apparent weight in free fall', o: ['0', 'mg', '2mg', 'mg/2'], a: 0, e: 'Weightless.' },
      { q: 'Banked road optimum', o: ['v² = rg tan θ', 'v = rg', 'v = μg', 'v² = r/g'], a: 0, e: 'No friction.' }, { q: 'Angle of repose', o: ['tan θ = μ', 'sin θ = μ', 'cos θ = μ', 'θ = μ'], a: 0, e: 'Limiting.' },
      { q: 'Action–reaction', o: ['on different bodies', 'cancel', 'same body', 'unequal'], a: 0, e: '3rd law.' }, { q: 'Rocket works on', o: ['momentum conservation', 'air push only', 'gravity', 'friction'], a: 0, e: 'Exhaust.' },
      { q: 'Equilibrium needs', o: ['ΣF = 0', 'F max', 'a > 0', 'v = 0 only'], a: 0, e: 'Net zero.' }, { q: 'Centripetal force on a car on level road from', o: ['friction', 'engine', 'gravity', 'normal'], a: 0, e: 'Tyres.' },
      { q: '2 kg, 3 m/s²', o: ['6 N', '1.5 N', '5 N', '0.67 N'], a: 0, e: 'ma.' }
    ],
    teach: {
      outcomes: ['Draw free-body diagrams', 'Apply Newton’s laws and momentum', 'Solve friction and circular-motion problems'],
      periods: [{ t: 'Laws and FBDs', flow: [['10 min', 'Card-pulling inertia demo.'], ['15 min', 'FBD practice.'], ['15 min', 'Atwood/lift problems.']] }, { t: 'Friction and curves', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Motion needs a force.', 'Friction always μN.'], activities: ['Incline angle of repose.', 'Balloon rocket.'],
      exit: ['FBD of block on incline.', 'Impulse problem.', 'Banking formula.'], homework: 'Measure μₛ of a book on a board using the angle of repose.'
    },
    slides: [{ t: 'Laws of Motion', b: ['Newton’s laws', 'Momentum and impulse', 'Friction', 'Circular motion dynamics'] }, { t: 'Think and share', b: ['Why bank roads?', 'Static friction value?'] }],
    fs: { groups: [['Laws', [['2nd', 'F = dp/dt'], ['Impulse', 'FΔt = Δp'], ['Conservation', 'Σp constant']]], ['Friction', [['Static', '≤ μₛN'], ['Kinetic', 'μₖN'], ['Repose', 'tan θ = μ']]], ['Circular', [['Level', 'v = √(μrg)'], ['Banked', 'tan θ = v²/rg'], ['Lift', 'm(g ± a)']]]],
      ex: [['5 kg, 3 kg Atwood', 'a 2.45 m/s²'], ['μ 0.4, r 50', 'v 14 m/s']], rem: ['Draw the FBD first.', 'Friction adjusts.', 'Something must supply mv²/r.'] }
  });
})();
