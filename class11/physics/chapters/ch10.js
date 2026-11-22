/*
TOOL:    class11_physics_ch10
FAMILY:  CBSE_REVISION / Class 11 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 10 Thermal Properties of Matter (temperature scales, ideal gas equation, thermal expansion, specific heat, calorimetry, change of state, latent heat, conduction, convection, radiation, Newton’s law of cooling) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 10, part: 'Part II', short: 'Thermal properties', title: 'Thermal Properties of Matter',
    blurb: 'Temperature and heat; Celsius, Fahrenheit and Kelvin scales; ideal-gas thermometry; linear, area and volume expansion (α, β = 2α, γ = 3α) and the anomalous expansion of water; specific heat capacity and calorimetry; change of state and latent heat; heat transfer — conduction (thermal conductivity), convection, radiation (Stefan–Boltzmann, Wien); Newton’s law of cooling.',
    revise: {
      oneLine: 'T(K) = t(°C) + 273.15; F = 9C/5 + 32. Expansion: ΔL = αLΔT, ΔV = γVΔT, γ = 3α. Heat Q = mcΔT; at a phase change Q = mL (water: L_f = 3.33 × 10⁵ J/kg, L_v = 2.256 × 10⁶ J/kg). Calorimetry: heat lost = heat gained. Conduction rate H = KA(T₁ − T₂)/L. Radiated power P = σAeT⁴; Wien λ_max T = 2.9 × 10⁻³ m K. Newton’s cooling: rate of cooling ∝ (T − T_s) for small differences.',
      sections: [
        { h: 'Water is special', html: `<p>Water contracts from 0 °C to 4 °C (max density at 4 °C), so lakes freeze from the top and life survives below.</p>` },
        { h: 'Heating curve', html: `<p>Temperature stays constant during melting and boiling — energy goes into breaking bonds (latent heat). Boiling point rises with pressure (pressure cooker).</p>` },
        { h: 'Radiation', html: `<p>Black bodies absorb and emit best. Hotter bodies peak at shorter wavelengths (Wien) — the Sun ≈ 5800 K peaks in visible light.</p>` }
      ],
      formulas: [['Kelvin', 'T = t + 273.15'], ['Linear expansion', 'ΔL = αLΔT'], ['γ', '3α'], ['Heat', 'Q = mcΔT, Q = mL'], ['Conduction', 'H = KAΔT/L'], ['Stefan', 'P = σAeT⁴'], ['Wien', 'λ_max T = 2.9 × 10⁻³ m K']],
      terms: [['Specific heat', 'heat to raise 1 kg by 1 K'], ['Latent heat', 'heat for phase change at constant temperature'], ['Thermal conductivity', 'K in conduction law']],
      traps: ['ΔT in °C equals ΔT in K.', 'Use kelvin in T⁴ and gas laws.', 'During melting temperature does not rise.'],
      bridge: '<p>Ch 11 links heat and work (thermodynamics).</p>'
    },
    explore: [
      { title: 'Mixing calorimeter', intro: 'Mix hot and cold water (no heat loss); find final temperature.',
        build(el, K) { let m1 = 200, t1 = 80, m2 = 300, t2 = 20; const row = K.row(el); K.slider(row, 'hot mass (g)', 50, 1000, 10, m1, v => { m1 = v; draw(); }); K.slider(row, 'hot T (°C)', 30, 100, 1, t1, v => { t1 = v; draw(); }); K.slider(row, 'cold mass (g)', 50, 1000, 10, m2, v => { m2 = v; draw(); }); K.slider(row, 'cold T (°C)', 0, 30, 1, t2, v => { t2 = v; draw(); }); const rd = K.read(el);
          function draw() { const T = (m1 * t1 + m2 * t2) / (m1 + m2); rd.innerHTML = `heat lost = heat gained → m₁c(t₁ − T) = m₂c(T − t₂) → T = <b>${f(T)} °C</b> · heat transferred = ${f(m1 / 1000 * 4186 * (t1 - T))} J`; } draw(); return null; } },
      { title: 'Heating curve of ice', intro: '<kbd>P</kbd> play, <kbd>S</kbd> step (1 kg, from −20 °C).',
        build(el, K) { const c_i = 2100, c_w = 4186, c_s = 2010, Lf = 3.34e5, Lv = 2.256e6; const Q = [0, 20 * c_i, 20 * c_i + Lf, 20 * c_i + Lf + 100 * c_w, 20 * c_i + Lf + 100 * c_w + Lv, 20 * c_i + Lf + 100 * c_w + Lv + 20 * c_s]; const T = [-20, 0, 0, 100, 100, 120]; const S = Q[5]; const dr = k => b => { b.line(0, 0, 10.5, 0, { color: C.ink, w: 1 }); b.text(9.5, -0.6, 'heat (MJ)', { font: '10px' }); for (let i = 0; i < k; i++) b.line(Q[i] / S * 10, (T[i] + 20) / 140 * 5, Q[i + 1] / S * 10, (T[i + 1] + 20) / 140 * 5, { color: [C.blue, C.purple, C.blue, C.orange, C.blue][i], w: 3 }); };
          return G9.S9.stages(el, K, { board: { xmin: -0.5, xmax: 10.8, ymin: -1, ymax: 5.4, axes: false, grid: 0, aspect: 0.45 }, stages: [['Ice warms', `−20 → 0 °C: mcΔT = ${f(Q[1] / 1000)} kJ.`, dr(1)], ['Melting', `0 °C flat: mL_f = ${f(Lf / 1000)} kJ.`, dr(2)], ['Water warms', `0 → 100 °C: ${f(100 * c_w / 1000)} kJ.`, dr(3)], ['Boiling', `100 °C flat: mL_v = ${f(Lv / 1000)} kJ — the biggest step.`, dr(4)], ['Steam warms', `100 → 120 °C: ${f(20 * c_s / 1000)} kJ. Total ≈ ${f(S / 1e6)} MJ.`, dr(5)]] }); } }
    ],
    gens: [
      { title: 'Heat', gen(R) { const m = R.pick([0.5, 1, 2]), dT = R.int(10, 60); return { q: `Heat to warm ${m} kg of water by ${dT} °C? (c = 4186 J/kg K)`, a: `${f(m * 4186 * dT)} J`, ans: m * 4186 * dT, tol: 1 }; } },
      { title: 'Expansion', gen(R) { const L = R.pick([1, 2, 10, 50]), dT = R.int(20, 80), a = 1.2e-5; return { q: `A steel rail of ${L} m warms by ${dT} °C (α = 1.2 × 10⁻⁵ /K). Expansion?`, a: `${f(a * L * dT * 1000)} mm`, ans: a * L * dT * 1000, tol: 1e-6 }; } },
      { title: 'Latent heat', gen(R) { const m = R.pick([0.1, 0.2, 0.5]); return { q: `Heat to melt ${m} kg of ice at 0 °C? (L_f = 3.34 × 10⁵ J/kg)`, a: `${f(m * 3.34e5)} J`, ans: m * 3.34e5, tol: 1 }; } },
      { title: 'Conduction', levels: [2, 3], gen(R) { const K2 = R.pick([0.8, 50, 385]), A = R.pick([0.01, 0.1, 1]), d = R.pick([0.01, 0.1, 0.2]), dT = R.int(10, 80); return { q: `K = ${K2} W/m K, A = ${A} m², thickness ${d} m, ΔT = ${dT} K. Heat flow rate?`, a: `${f(K2 * A * dT / d)} W`, ans: K2 * A * dT / d, tol: 0.01 }; } },
      { title: 'Wien / Stefan', levels: [2, 3], gen(R) { const T = R.pick([3000, 5800, 6000, 10000]); return { q: `Peak wavelength of a black body at ${T} K? (b = 2.9 × 10⁻³ m K)`, a: `${f(2.9e-3 / T * 1e9)} nm`, ans: 2.9e-3 / T * 1e9, tol: 0.01 }; } }
    ],
    quiz: [
      { q: 'γ =', o: ['3α', '2α', 'α', 'α/3'], a: 0, e: 'Volume.' }, { q: 'Water max density at', o: ['4 °C', '0 °C', '100 °C', '−4 °C'], a: 0, e: 'Anomalous.' },
      { q: 'During boiling temperature', o: ['stays constant', 'rises', 'falls', 'oscillates'], a: 0, e: 'Latent heat.' }, { q: 'Stefan law P ∝', o: ['T⁴', 'T', 'T²', '1/T'], a: 0, e: 'Fourth power.' },
      { q: 'Wien: hotter body peaks at', o: ['shorter λ', 'longer λ', 'same λ', 'no peak'], a: 0, e: 'λT const.' }, { q: 'Q =', o: ['mcΔT', 'mc/ΔT', 'mΔT/c', 'cΔT/m'], a: 0, e: 'Heat.' },
      { q: '27 °C in K', o: ['300 K', '27 K', '246 K', '273 K'], a: 0, e: '+273.' }, { q: 'Pressure cooker cooks faster because', o: ['boiling point rises', 'it is metal', 'steam is lighter', 'less water'], a: 0, e: 'Higher T.' },
      { q: 'Best emitter', o: ['black body', 'shiny metal', 'white paper', 'mirror'], a: 0, e: 'Kirchhoff.' }, { q: 'Conduction rate ∝', o: ['A ΔT / L', 'L/A', 'ΔT L', '1/ΔT'], a: 0, e: 'Fourier.' },
      { q: 'Newton’s cooling: rate ∝', o: ['T − T_s', 'T⁴', 'T_s', 'time'], a: 0, e: 'Small ΔT.' }
    ],
    teach: {
      outcomes: ['Use temperature scales and expansion', 'Do calorimetry with latent heat', 'Apply conduction and radiation laws'],
      periods: [{ t: 'Expansion and calorimetry', flow: [['10 min', 'Ball and ring demo.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Mixture problems.']] }, { t: 'Phase change and transfer', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Cooling curve data.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Temperature rises during melting.', 'Use °C in T⁴.'], activities: ['Cooling curve of hot water.', 'Black vs white can heating.'],
      exit: ['Q = mcΔT + mL problem.', 'Water anomaly.', 'Stefan and Wien.'], homework: 'Record cooling of hot water every 2 min; plot and test Newton’s law.'
    },
    slides: [{ t: 'Thermal Properties of Matter', b: ['Scales and expansion', 'Calorimetry and latent heat', 'Conduction and convection', 'Radiation and cooling'] }, { t: 'Think and share', b: ['Why do lakes freeze from the top?', 'Why is steam burn worse?'] }],
    fs: { groups: [['Scales & expansion', [['K', 't + 273.15'], ['ΔL', 'αLΔT'], ['γ', '3α']]], ['Heat', [['Q', 'mcΔT'], ['Phase', 'mL'], ['Mix', 'lost = gained']]], ['Transfer', [['Conduction', 'KAΔT/L'], ['Stefan', 'σAeT⁴'], ['Wien', 'λT = 2.9 mm K'], ['Cooling', '∝ T − T_s']]]],
      ex: [['200 g 80 °C + 300 g 20 °C', '44 °C'], ['5800 K', 'λ ≈ 500 nm']], rem: ['Kelvin for T⁴.', 'Flat steps = latent heat.', 'Heat lost = gained.'] }
  });
})();
