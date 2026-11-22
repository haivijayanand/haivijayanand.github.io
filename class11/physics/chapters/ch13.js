/*
TOOL:    class11_physics_ch13
FAMILY:  CBSE_REVISION / Class 11 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 13 Oscillations (periodic motion, SHM equation, phase, velocity and acceleration, energy in SHM, spring–mass system, simple pendulum) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 13, part: 'Part II', short: 'Oscillations', title: 'Oscillations',
    blurb: 'Periodic and oscillatory motion; period and frequency; simple harmonic motion x = A cos(ωt + φ); SHM and uniform circular motion; velocity and acceleration in SHM; restoring force F = −kx; energy in SHM; spring–mass oscillator; simple pendulum.',
    revise: {
      oneLine: 'SHM: x = A cos(ωt + φ), v = −Aω sin(ωt + φ) = ±ω√(A² − x²), a = −ω²x. Restoring force F = −kx with ω = √(k/m), so T = 2π√(m/k) for a spring. Simple pendulum (small angles): T = 2π√(l/g). Total energy E = ½kA² is constant; KE = ½k(A² − x²), PE = ½kx². Maximum speed Aω at the mean position; maximum acceleration ω²A at the extremes.',
      sections: [
        { h: 'Phase', html: `<p>Phase (ωt + φ) tells the state of motion; φ is set by initial conditions. Displacement and velocity differ in phase by π/2; displacement and acceleration by π.</p>` },
        { h: 'Springs', html: `<p>Series springs: 1/k = 1/k₁ + 1/k₂; parallel springs: k = k₁ + k₂.</p>` },
        { h: 'Pendulum', html: `<p>Period independent of mass and (for small swings) amplitude. Seconds pendulum: T = 2 s, l ≈ 0.99 m.</p>` }
      ],
      formulas: [['x', 'A cos(ωt + φ)'], ['v_max', 'Aω'], ['a', '−ω²x'], ['Spring T', '2π√(m/k)'], ['Pendulum T', '2π√(l/g)'], ['Energy', '½kA²'], ['ω', '2π/T = 2πν']],
      terms: [['Amplitude', 'maximum displacement'], ['SHM', 'acceleration ∝ −displacement'], ['Phase', 'argument of the cosine']],
      traps: ['Pendulum period does not depend on mass.', 'At the mean position acceleration is zero and speed is maximum.', 'Energy ∝ A², not A.'],
      bridge: '<p>Ch 14 builds waves from oscillations.</p>'
    },
    explore: [
      { title: 'Spring oscillator', intro: 'Set mass, k and amplitude; watch x, v and energy. <kbd>P</kbd> play.',
        build(el, K) { let m = 1, k = 40, A = 0.1; const row = K.row(el); K.slider(row, 'm (kg)', 0.2, 5, 0.1, m, v => { m = v; }); K.slider(row, 'k (N/m)', 5, 200, 5, k, v => { k = v; }); K.slider(row, 'A (m)', 0.02, 0.2, 0.01, A, v => { A = v; }); const b = new K.Board(el, { xmin: -0.3, xmax: 0.3, ymin: -0.09, ymax: 0.09, axes: false, grid: 0, aspect: 0.3 }); const rd = K.read(el); const an = new K.Anim(Infinity, () => b.redraw(), { ms: 30 });
          b.onDraw = () => { b.clear(); const w = Math.sqrt(k / m), t = an.i * 0.03; const x = A * Math.cos(w * t), v = -A * w * Math.sin(w * t); b.line(-0.29, -0.05, -0.29, 0.05, { color: C.ink, w: 4 }); const n = 14, x0 = -0.29, x1 = x - 0.03; let p = [x0, 0]; for (let i = 1; i <= n; i++) { const q = [x0 + (x1 - x0) * i / n, (i % 2 ? 1 : -1) * 0.02]; if (i === n) q[1] = 0; b.line(p[0], p[1], q[0], q[1], { color: C.grey, w: 1.5 }); p = q; } b.rect(x - 0.03, -0.03, 0.06, 0.06, { fill: C.orange, color: C.ink }); b.line(0, -0.08, 0, 0.08, { color: C.grey, w: 1, dash: [3, 3] });
            const E = 0.5 * k * A * A, KE = 0.5 * m * v * v; rd.innerHTML = `T = 2π√(m/k) = <b>${f(2 * Math.PI / w)} s</b> · x = ${f(x)} m · v = ${f(v)} m/s · KE ${f(KE)} J + PE ${f(E - KE)} J = E ${f(E)} J`; };
          K.anim(el, an); an.play(); return an; } },
      { title: 'Pendulum period', intro: 'Change length and g (planet); see the period.',
        build(el, K) { const P = [['Earth', 9.8], ['Moon', 1.62], ['Mars', 3.71], ['Jupiter', 24.8]]; let l = 1, k = 0; const row = K.row(el); K.slider(row, 'length (m)', 0.1, 4, 0.05, l, v => { l = v; draw(); }); K.select(row, 'place', P.map(p => p[0]), i => { k = i; draw(); }); const rd = K.read(el);
          function draw() { const T = 2 * Math.PI * Math.sqrt(l / P[k][1]); rd.innerHTML = `T = 2π√(l/g) = <b>${f(T)} s</b> on ${P[k][0]} · length for a seconds pendulum (T = 2 s) here: ${f(P[k][1] / Math.PI ** 2)} m`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Spring period', gen(R) { const m = R.pick([0.25, 0.5, 1, 2]), k = R.pick([25, 50, 100, 200]); return { q: `m = ${m} kg on a spring of k = ${k} N/m. Period?`, a: `${f(2 * Math.PI * Math.sqrt(m / k))} s`, ans: 2 * Math.PI * Math.sqrt(m / k), tol: 0.001 }; } },
      { title: 'Pendulum', gen(R) { const l = R.pick([0.25, 0.5, 1, 2]); return { q: `Period of a ${l} m pendulum? (g = 9.8)`, a: `${f(2 * Math.PI * Math.sqrt(l / 9.8))} s`, ans: 2 * Math.PI * Math.sqrt(l / 9.8), tol: 0.001 }; } },
      { title: 'Max speed', gen(R) { const A = R.pick([0.02, 0.05, 0.1]), T = R.pick([0.5, 1, 2]); return { q: `SHM with A = ${A} m, T = ${T} s. v_max and a_max?`, a: `v = ${f(A * 2 * Math.PI / T)} m/s, a = ${f(A * (2 * Math.PI / T) ** 2)} m/s²`, ans: A * 2 * Math.PI / T, tol: 0.001 }; } },
      { title: 'Energy', levels: [2, 3], gen(R) { const k = R.pick([50, 100, 200]), A = R.pick([0.05, 0.1, 0.2]), fr = R.pick([0.5, 0.25]); const x = A * fr; return { q: `k = ${k} N/m, A = ${A} m. KE and PE at x = ${x} m?`, a: `KE = ${f(0.5 * k * (A * A - x * x))} J, PE = ${f(0.5 * k * x * x)} J`, ans: 0.5 * k * (A * A - x * x), tol: 1e-6 }; } },
      { title: 'Springs combined', levels: [2, 3], gen(R) { const k1 = R.pick([100, 200, 300]), k2 = R.pick([100, 200, 600]); return R.chance(.5) ? { q: `Springs ${k1} and ${k2} N/m in parallel. Effective k?`, a: `${k1 + k2} N/m`, ans: k1 + k2 } : { q: `Springs ${k1} and ${k2} N/m in series. Effective k?`, a: `${f(k1 * k2 / (k1 + k2))} N/m`, ans: k1 * k2 / (k1 + k2), tol: 0.01 }; } }
    ],
    quiz: [
      { q: 'SHM acceleration', o: ['−ω²x', 'ω²x', '−ωx', 'constant'], a: 0, e: 'Restoring.' }, { q: 'Spring T', o: ['2π√(m/k)', '2π√(k/m)', '2πmk', 'm/k'], a: 0, e: 'Formula.' },
      { q: 'Pendulum T depends on', o: ['length and g', 'mass', 'amplitude (large)', 'colour'], a: 0, e: '√(l/g).' }, { q: 'Max speed at', o: ['mean position', 'extremes', 'everywhere', 'nowhere'], a: 0, e: 'PE 0.' },
      { q: 'Total energy', o: ['½kA²', 'kA', '½kA', 'kA²'], a: 0, e: 'Constant.' }, { q: 'x and a phase difference', o: ['π', 'π/2', '0', '2π'], a: 0, e: 'Opposite.' },
      { q: 'Seconds pendulum length', o: ['≈ 1 m', '2 m', '0.5 m', '9.8 m'], a: 0, e: 'T 2 s.' }, { q: 'Parallel springs k', o: ['k₁ + k₂', 'k₁k₂/(k₁+k₂)', '|k₁ − k₂|', 'k₁/k₂'], a: 0, e: 'Add.' },
      { q: 'v_max =', o: ['Aω', 'Aω²', 'A/ω', 'ω/A'], a: 0, e: 'Max.' }, { q: 'Double amplitude, energy', o: ['×4', '×2', 'same', '÷2'], a: 0, e: 'A².' },
      { q: 'Pendulum on Moon', o: ['slower', 'faster', 'same', 'stops'], a: 0, e: 'Smaller g.' }
    ],
    teach: {
      outcomes: ['Write and use SHM equations', 'Find periods of spring and pendulum', 'Analyse energy in SHM'],
      periods: [{ t: 'SHM', flow: [['10 min', 'Shadow of circular motion.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Phase and graphs.']] }, { t: 'Systems', flow: [['15 min', 'Explore panel 2 / real pendulum.'], ['15 min', 'Spring combinations.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Heavier bob = longer period.', 'a max at mean position.'], activities: ['T² vs l graph for g.', 'Spring constant from oscillations.'],
      exit: ['Two period formulas.', 'Energy split.', 'Phase relations.'], homework: 'Plot T² vs l for 5 lengths and find g from the slope.'
    },
    slides: [{ t: 'Oscillations', b: ['SHM and phase', 'Velocity and acceleration', 'Energy', 'Spring and pendulum'] }, { t: 'Think and share', b: ['Why no mass in pendulum T?', 'Where is speed maximum?'] }],
    fs: { groups: [['SHM', [['x', 'A cos(ωt+φ)'], ['v', 'ω√(A²−x²)'], ['a', '−ω²x']]], ['Periods', [['Spring', '2π√(m/k)'], ['Pendulum', '2π√(l/g)'], ['ω', '2π/T']]], ['Energy', [['E', '½kA²'], ['KE', '½k(A²−x²)'], ['PE', '½kx²']]]],
      ex: [['m 1, k 100', 'T 0.628 s'], ['l 1 m', 'T 2.01 s']], rem: ['a ∝ −x.', 'Mass-free pendulum.', 'E ∝ A².'] }
  });
})();
