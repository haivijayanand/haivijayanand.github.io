/*
TOOL:    class12_physics_ch08
FAMILY:  CBSE_REVISION / Class 12 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 8 Electromagnetic Waves (displacement current, Maxwell’s equations, EM wave nature and speed, energy, spectrum and uses) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(3)).toString();
  const SP = [['radio waves', '> 0.1 m', 'radio, TV communication'], ['microwaves', '0.1 m – 1 mm', 'radar, microwave ovens, satellite links'], ['infrared', '1 mm – 700 nm', 'remote controls, heating, night vision, greenhouse effect'], ['visible light', '700 – 400 nm', 'vision, photography'], ['ultraviolet', '400 nm – 1 nm', 'sterilisation, LASIK, absorbed by ozone'], ['X-rays', '1 nm – 10⁻³ nm', 'medical imaging, crystal structure'], ['gamma rays', '< 10⁻³ nm', 'cancer treatment, nuclear reactions']];
  G9.register({
    no: 8, part: 'Part I', short: 'EM waves', title: 'Electromagnetic Waves',
    blurb: 'Displacement current and the consistency of Ampère’s law; Maxwell’s equations (qualitative); sources and nature of EM waves — oscillating E and B fields perpendicular to each other and to the direction of travel; speed c = 1/√(μ₀ε₀); energy and momentum carried; the electromagnetic spectrum from radio to gamma rays and uses of each band.',
    revise: {
      oneLine: 'Maxwell added displacement current I_d = ε₀ dΦ_E/dt so that a changing electric field also makes a magnetic field. Accelerated charges radiate EM waves: E and B oscillate in phase, at right angles to each other and to the direction of travel (transverse). In vacuum c = 1/√(μ₀ε₀) = 3 × 10⁸ m/s and E₀/B₀ = c. EM waves need no medium and carry energy and momentum (radiation pressure). Spectrum in increasing frequency: radio, microwave, infrared, visible, ultraviolet, X-ray, gamma.',
      sections: [
        { h: 'Speed in media', html: '<p>v = 1/√(με) = c/n. Frequency stays the same when entering a new medium; wavelength changes.</p>' },
        { h: 'Ozone and UV', html: '<p>The ozone layer absorbs most harmful UV; welders wear special goggles; UV kills bacteria (water purifiers).</p>' },
        { h: 'Infrared', html: '<p>Felt as heat; Earth re-radiates IR which greenhouse gases trap.</p>' }
      ],
      formulas: [['Displacement current', 'ε₀ dΦ_E/dt'], ['c', '1/√(μ₀ε₀) = 3 × 10⁸ m/s'], ['E₀/B₀', 'c'], ['c', 'νλ'], ['Medium', 'v = c/n']],
      terms: [['Displacement current', 'current-like term from a changing electric field'], ['Transverse wave', 'oscillation ⟂ propagation'], ['EM spectrum', 'range of EM wavelengths']],
      traps: ['EM waves don’t need a medium.', 'Frequency doesn’t change between media.', 'X-rays and gamma rays overlap — named by source.'],
      bridge: '<p>Ch 9–10 study visible light in detail.</p>'
    },
    explore: [
      { title: 'Spectrum explorer', intro: 'Choose a band. <kbd>S</kbd> steps.',
        build(el, K) { let k = 3; const row = K.row(el); const sel = K.select(row, 'band', SP.map(s => s[0]), i => { k = i; draw(); }); sel.value = 3; const rd = K.read(el); function draw() { rd.innerHTML = `<b>${SP[k][0]}</b> · wavelength ${SP[k][1]} · uses: ${SP[k][2]}`; } const step = () => { k = (k + 1) % SP.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Wavelength ↔ frequency', intro: 'Set log₁₀ of wavelength (m); see frequency and photon energy.',
        build(el, K) { let L = -6.3; const row = K.row(el); K.slider(row, 'log₁₀ λ (m)', -12, 3, 0.1, L, v => { L = v; draw(); }); const rd = K.read(el);
          function draw() { const lam = 10 ** L, nu = 3e8 / lam, E = 6.626e-34 * nu / 1.6e-19; const band = lam > 0.1 ? 'radio' : lam > 1e-3 ? 'microwave' : lam > 7e-7 ? 'infrared' : lam > 4e-7 ? 'visible' : lam > 1e-9 ? 'ultraviolet' : lam > 1e-12 ? 'X-ray' : 'gamma'; rd.innerHTML = `λ = ${lam.toExponential(2)} m → ν = c/λ = <b>${nu.toExponential(2)} Hz</b> · photon energy = <b>${E < 0.01 ? E.toExponential(2) : f(E)} eV</b> · band: <b>${band}</b>`; } draw(); return null; } }
    ],
    gens: [
      { title: 'c = νλ', gen(R) { const nu = R.pick([1e6, 1e8, 3e9, 6e14, 3e18]); return { q: `Wavelength of EM wave of frequency ${nu.toExponential(0)} Hz?`, a: `${(3e8 / nu).toExponential(2)} m`, ans: 3e8 / nu, tol: 3e8 / nu * 1e-3 }; } },
      { title: 'Band', gen(R) { return G9.S9.groupQ(R, [['TV broadcast', 0], ['microwave oven', 1], ['remote control', 2], ['sterilising water', 3], ['bone imaging', 4], ['cancer radiotherapy', 5]], ['radio', 'microwave', 'infrared', 'ultraviolet', 'X-ray', 'gamma'], 'Band used for '); } },
      { title: 'E and B', gen(R) { const B = R.pick([1e-8, 2e-8, 5e-7]); return { q: `B₀ = ${B.toExponential(0)} T in an EM wave. E₀?`, a: `${f(B * 3e8)} V/m`, ans: B * 3e8, tol: 1e-6 }; } },
      { title: 'Order', gen(R) { return G9.S9.pickQ(R, [['Arrange by increasing frequency: X-ray, radio, visible, infrared', 'radio < infrared < visible < X-ray'], ['Which has the longest wavelength?', 'radio waves'], ['Which band does ozone absorb?', 'ultraviolet'], ['Which band is felt as heat?', 'infrared']]); } },
      { title: 'Concepts', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why did Maxwell add displacement current?', 'to make Ampère’s law consistent for changing E (capacitor charging)'], ['Are EM waves transverse or longitudinal?', 'transverse'], ['What produces EM waves?', 'accelerated charges'], ['Speed of EM waves in vacuum?', '1/√(μ₀ε₀) = 3 × 10⁸ m/s']]); } }
    ],
    quiz: [
      { q: 'c =', o: ['1/√(μ₀ε₀)', '√(μ₀ε₀)', 'μ₀ε₀', 'ε₀/μ₀'], a: 0, e: 'Maxwell.' }, { q: 'EM waves are', o: ['transverse', 'longitudinal', 'mechanical', 'stationary only'], a: 0, e: 'E ⟂ B ⟂ v.' },
      { q: 'Highest frequency', o: ['gamma', 'X-ray', 'UV', 'radio'], a: 0, e: 'End.' }, { q: 'Radar uses', o: ['microwaves', 'gamma', 'IR', 'UV'], a: 0, e: 'Short radio.' },
      { q: 'E₀/B₀ =', o: ['c', '1', 'μ₀', 'ε₀'], a: 0, e: 'Ratio.' }, { q: 'Medium needed?', o: ['no', 'yes', 'only air', 'only water'], a: 0, e: 'Vacuum ok.' },
      { q: 'Displacement current due to', o: ['changing E field', 'moving charges', 'magnets', 'friction'], a: 0, e: 'ε₀ dΦ/dt.' }, { q: 'Remote controls use', o: ['infrared', 'UV', 'X-ray', 'gamma'], a: 0, e: 'IR LEDs.' },
      { q: 'Visible range', o: ['400–700 nm', '1–10 nm', '1 m', '1 mm'], a: 0, e: 'Light.' }, { q: 'Entering glass, which stays same?', o: ['frequency', 'wavelength', 'speed', 'all change'], a: 0, e: 'Source sets ν.' },
      { q: 'Produced by', o: ['accelerated charges', 'static charges', 'magnets at rest', 'sound'], a: 0, e: 'Radiation.' }
    ],
    teach: {
      outcomes: ['Explain displacement current', 'Describe EM wave properties', 'Order the EM spectrum and uses'],
      periods: [{ t: 'Maxwell', flow: [['10 min', 'Charging capacitor puzzle.'], ['15 min', 'Wave diagram E ⟂ B.'], ['15 min', 'Explore panel 2.']] }, { t: 'Spectrum', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Uses poster.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['EM waves need a medium.', 'Light is different from radio in nature.'], activities: ['Phone camera sees IR remote.', 'Spectrum poster.'],
      exit: ['c formula.', 'Spectrum order.', 'Two uses each.'], homework: 'Make a table of EM bands with wavelength range, source and use.'
    },
    slides: [{ t: 'Electromagnetic Waves', b: ['Displacement current', 'Nature of EM waves', 'Speed and energy', 'Spectrum and uses'] }, { t: 'Think and share', b: ['Why does a phone camera see IR?', 'Why is UV harmful?'] }],
    fs: { groups: [['Theory', [['I_d', 'ε₀ dΦ_E/dt'], ['c', '1/√(μ₀ε₀)'], ['E₀/B₀', 'c']]], ['Nature', [['Transverse', 'E ⟂ B ⟂ v'], ['Medium', 'not needed'], ['Source', 'accelerated charge']]], ['Spectrum', [['Order (ν ↑)', 'radio, micro, IR, visible, UV, X, γ'], ['Visible', '400–700 nm']]]],
      ex: [['ν 3 × 10⁹ Hz', 'λ 10 cm (microwave)'], ['B₀ 2 × 10⁻⁸ T', 'E₀ 6 V/m']], rem: ['c = νλ.', 'Frequency fixed.', 'Know uses.'] }
  });
})();
