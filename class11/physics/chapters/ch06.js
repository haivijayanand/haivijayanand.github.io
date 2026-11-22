/*
TOOL:    class11_physics_ch06
FAMILY:  CBSE_REVISION / Class 11 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 6 System of Particles and Rotational Motion (centre of mass, torque, angular momentum, equilibrium of rigid bodies, moment of inertia, rotational kinematics and dynamics, rolling) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toFixed(3)).toString();
  const MI = [['thin ring about axis', 'MR²', 1], ['solid disc about axis', '½MR²', 0.5], ['solid sphere about diameter', '⅖MR²', 0.4], ['hollow sphere about diameter', '⅔MR²', 2 / 3], ['solid cylinder about axis', '½MR²', 0.5]];
  G9.register({
    no: 6, part: 'Part I', short: 'Rotation', title: 'System of Particles and Rotational Motion',
    blurb: 'Centre of mass of particles and symmetric bodies and its motion; vector product; angular velocity; torque τ = r × F and angular momentum L = r × p; equilibrium of a rigid body (ΣF = 0, Στ = 0); moment of inertia and radius of gyration (standard results); kinematics of rotation about a fixed axis; τ = Iα; L = Iω and its conservation; rolling KE.',
    revise: {
      oneLine: 'Centre of mass R = Σmᵢrᵢ/M moves as if all external force acted on M. Torque τ = rF sin θ; τ = dL/dt = Iα. Moment of inertia I = Σmr² (ring MR², disc ½MR², solid sphere ⅖MR²); parallel axis I = I_cm + Md²; perpendicular axis I_z = I_x + I_y (plane bodies). Rotational KE = ½Iω². If external torque is zero, L = Iω is conserved (skater pulls arms in, spins faster). Rolling down an incline: a = g sin θ / (1 + k²/R²).',
      sections: [
        { h: 'Analogy', html: `<p>x ↔ θ, v ↔ ω, a ↔ α, m ↔ I, F ↔ τ, p ↔ L, ½mv² ↔ ½Iω². ω = ω₀ + αt, θ = ω₀t + ½αt², ω² = ω₀² + 2αθ.</p>` },
        { h: 'Rolling', html: `<p>Rolling without slipping: v = ωR; KE = ½mv²(1 + k²/R²). Solid sphere reaches the bottom before a disc, which beats a ring.</p>` },
        { h: 'Equilibrium', html: `<p>See-saw/beam problems: take moments about a convenient point; sum of clockwise = sum of anticlockwise.</p>` }
      ],
      formulas: [['Torque', 'τ = r F sin θ = Iα'], ['Angular momentum', 'L = Iω'], ['Rotational KE', '½Iω²'], ['Parallel axis', 'I = I_cm + Md²'], ['Rolling a', 'g sin θ/(1 + k²/R²)'], ['Ring / disc / sphere', 'MR², ½MR², ⅖MR²']],
      terms: [['Centre of mass', 'point moving as if all mass were there'], ['Radius of gyration', 'k with I = Mk²'], ['Couple', 'two equal opposite forces with different lines of action']],
      traps: ['Moment of inertia depends on the axis.', 'L conserved needs zero external torque, not zero force.', 'Rolling body has both translational and rotational KE.'],
      bridge: '<p>Ch 7 uses angular momentum conservation for orbits (Kepler’s second law).</p>'
    },
    explore: [
      { title: 'Rolling race', intro: 'Bodies roll down a slope without slipping; compare accelerations.',
        build(el, K) { let th = 30; const row = K.row(el); K.slider(row, 'slope (°)', 5, 60, 1, th, v => { th = v; draw(); }); const rd = K.read(el);
          function draw() { const g = 9.8, s = Math.sin(th * Math.PI / 180); const rows = [['sliding block (no friction)', 0], ['solid sphere', 0.4], ['solid disc/cylinder', 0.5], ['hollow sphere', 2 / 3], ['ring', 1]].map(r => [r[0], g * s / (1 + r[1])]); rd.innerHTML = rows.map(r => `${r[0]}: a = <b>${f(r[1])} m/s²</b>`).join('<br>') + '<br>smaller k²/R² → less energy into rotation → faster down the slope'; } draw(); return null; } },
      { title: 'Spinning skater', intro: 'Pull the arms in: I falls, ω rises (L conserved).',
        build(el, K) { let I2 = 2, I1 = 4, w1 = 2; const row = K.row(el); K.slider(row, 'I arms out (kg m²)', 2, 8, 0.5, I1, v => { I1 = v; draw(); }); K.slider(row, 'I arms in (kg m²)', 0.5, 4, 0.1, I2, v => { I2 = v; draw(); }); K.slider(row, 'ω arms out (rad/s)', 0.5, 6, 0.5, w1, v => { w1 = v; draw(); }); const rd = K.read(el);
          function draw() { const w2 = I1 * w1 / I2; rd.innerHTML = `L = I₁ω₁ = ${f(I1 * w1)} → ω₂ = <b>${f(w2)} rad/s</b> · KE ${f(0.5 * I1 * w1 * w1)} J → <b>${f(0.5 * I2 * w2 * w2)} J</b> (KE rises — the skater does work pulling arms in)`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Torque', gen(R) { const F = R.int(5, 50), r = R.pick([0.2, 0.5, 1, 1.5]), th = R.pick([30, 60, 90]); return { q: `F = ${F} N at ${r} m from the axis at ${th}° to the lever. Torque?`, a: `${f(F * r * Math.sin(th * Math.PI / 180))} N m`, ans: F * r * Math.sin(th * Math.PI / 180), tol: 0.01 }; } },
      { title: 'Moment of inertia', gen(R) { const b = R.pick(MI), M = R.int(1, 10), Rr = R.pick([0.1, 0.2, 0.5, 1]); return { q: `I of a ${b[0]} with M = ${M} kg, R = ${Rr} m?`, a: `${b[1]} = ${f(b[2] * M * Rr * Rr)} kg m²`, ans: b[2] * M * Rr * Rr, tol: 1e-6 }; } },
      { title: 'Centre of mass', gen(R) { const m1 = R.int(1, 5), m2 = R.int(1, 5), d = R.int(2, 10); return { q: `Masses ${m1} kg at x = 0 and ${m2} kg at x = ${d} m. Centre of mass?`, a: `x = ${f(m2 * d / (m1 + m2))} m`, ans: m2 * d / (m1 + m2), tol: 0.001 }; } },
      { title: 'Rotational kinematics', levels: [2, 3], gen(R) { const w0 = R.int(0, 10), a = R.int(1, 5), t = R.int(2, 8); return { q: `ω₀ = ${w0} rad/s, α = ${a} rad/s², t = ${t} s. ω and θ?`, a: `ω = ${w0 + a * t} rad/s, θ = ${w0 * t + 0.5 * a * t * t} rad`, ans: w0 + a * t }; } },
      { title: 'Parallel axis', levels: [2, 3], gen(R) { const M = R.int(1, 5), Rr = R.pick([0.1, 0.2, 0.5]); return { q: `I of a disc (M ${M} kg, R ${Rr} m) about a tangent axis perpendicular to its plane?`, a: `½MR² + MR² = ${f(1.5 * M * Rr * Rr)} kg m²`, ans: 1.5 * M * Rr * Rr, tol: 1e-6 }; } }
    ],
    quiz: [
      { q: 'τ =', o: ['Iα', 'Iω', 'mα', 'Fω'], a: 0, e: 'Rotational 2nd law.' }, { q: 'Ring I', o: ['MR²', '½MR²', '⅖MR²', '⅔MR²'], a: 0, e: 'All at R.' },
      { q: 'Solid sphere I', o: ['⅖MR²', '½MR²', 'MR²', '⅔MR²'], a: 0, e: 'Standard.' }, { q: 'L conserved when', o: ['external torque zero', 'force zero', 'KE constant', 'always'], a: 0, e: 'dL/dt = τ.' },
      { q: 'Fastest down incline', o: ['solid sphere', 'ring', 'disc', 'hollow sphere'], a: 0, e: 'Smallest k²/R².' }, { q: 'Rotational KE', o: ['½Iω²', 'Iω', '½mv', 'Iα'], a: 0, e: 'Analogy.' },
      { q: 'Parallel axis', o: ['I_cm + Md²', 'I_cm − Md²', 'I_x + I_y', 'Md'], a: 0, e: 'Theorem.' }, { q: 'Skater pulls arms in', o: ['spins faster', 'slower', 'stops', 'same'], a: 0, e: 'I ↓ ω ↑.' },
      { q: 'Unit of torque', o: ['N m', 'N/m', 'J/s', 'kg m'], a: 0, e: 'Moment.' }, { q: 'Rolling v =', o: ['ωR', 'ω/R', 'R/ω', 'ω²R'], a: 0, e: 'No slip.' },
      { q: 'Equilibrium needs', o: ['ΣF = 0 and Στ = 0', 'ΣF = 0 only', 'Στ = 0 only', 'v = 0'], a: 0, e: 'Both.' }
    ],
    teach: {
      outcomes: ['Find centre of mass and torque', 'Use I, τ = Iα and L conservation', 'Analyse rolling'],
      periods: [{ t: 'CM and torque', flow: [['10 min', 'Balance a ruler with coins.'], ['15 min', 'Torque problems.'], ['15 min', 'Moment of inertia table.']] }, { t: 'Rotation dynamics', flow: [['15 min', 'Explore panel 1 / real race.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['I is fixed for a body.', 'Heavier rolls faster.'], activities: ['Rolling race of can, ball, ring.', 'Swivel-chair spin.'],
      exit: ['τ = Iα.', 'Three I values.', 'Rolling order.'], homework: 'Roll different objects down a ramp; time and rank them; explain.'
    },
    slides: [{ t: 'Rotational Motion', b: ['Centre of mass', 'Torque and equilibrium', 'Moment of inertia', 'Angular momentum and rolling'] }, { t: 'Think and share', b: ['Why does the sphere win?', 'Why does a skater speed up?'] }],
    fs: { groups: [['Basics', [['CM', 'Σmr/M'], ['τ', 'rF sin θ'], ['L', 'Iω']]], ['Inertia', [['Ring', 'MR²'], ['Disc', '½MR²'], ['Sphere', '⅖MR²'], ['Parallel', 'I_cm + Md²']]], ['Dynamics', [['τ', 'Iα'], ['KE', '½Iω²'], ['Rolling a', 'g sin θ/(1+k²/R²)']]]],
      ex: [['20 N at 0.5 m, 90°', '10 N m'], ['I 4→2, ω 2', 'ω 4 rad/s']], rem: ['Name the axis.', 'L conserved if τ_ext = 0.', 'Rolling shares KE.'] }
  });
})();
