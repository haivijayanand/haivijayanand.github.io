/*
TOOL:    class12_physics_ch11
FAMILY:  CBSE_REVISION / Class 12 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 11 Dual Nature of Radiation and Matter (electron emission, photoelectric effect, Einstein’s equation, photon, de Broglie wavelength, Davisson–Germer) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  const h = 6.626e-34, e = 1.6e-19, me = 9.11e-31;
  G9.register({
    no: 11, part: 'Part II', short: 'Dual nature', title: 'Dual Nature of Radiation and Matter',
    blurb: 'Electron emission (thermionic, field, photoelectric); Hertz’s and Lenard’s observations; experimental study of the photoelectric effect — effect of intensity, potential and frequency; threshold frequency and stopping potential; failure of wave theory; Einstein’s photoelectric equation and the photon picture; wave nature of matter — de Broglie wavelength; Davisson–Germer experiment (qualitative).',
    revise: {
      oneLine: 'A photon has energy E = hν and momentum p = h/λ. Einstein: K_max = hν − φ₀ = eV₀, where φ₀ = hν₀ is the work function. Photoelectric current ∝ intensity; stopping potential and K_max depend only on frequency (not intensity); there is no emission below ν₀, and emission is instantaneous — wave theory cannot explain these. Matter waves: λ = h/p = h/mv; for an electron accelerated through V volts, λ = 1.227/√V nm.',
      sections: [
        { h: 'Graphs', html: '<p>V₀ vs ν: straight line, slope h/e, intercept on ν-axis = ν₀. Current vs V: saturation current rises with intensity; same stopping potential for same ν.</p>' },
        { h: 'Davisson–Germer', html: '<p>Electrons (54 V) diffracted by a nickel crystal gave a peak at 50°, matching de Broglie λ ≈ 0.167 nm.</p>' },
        { h: 'Handy numbers', html: '<p>E(eV) = 1240/λ(nm). 1 eV = 1.6 × 10⁻¹⁹ J.</p>' }
      ],
      formulas: [['Photon', 'E = hν = hc/λ'], ['Einstein', 'K_max = hν − φ₀'], ['Stopping', 'eV₀ = K_max'], ['de Broglie', 'λ = h/p'], ['Electron', 'λ = 1.227/√V nm'], ['Quick', 'E(eV) = 1240/λ(nm)']],
      terms: [['Work function', 'minimum energy to remove an electron'], ['Threshold frequency', 'minimum frequency for emission'], ['Stopping potential', 'reverse potential that stops the fastest electrons']],
      traps: ['Intensity changes current, not K_max.', 'Below threshold, no emission however bright.', 'Heavier particles at the same speed have shorter λ.'],
      bridge: '<p>Ch 12 uses quantisation to explain atomic spectra.</p>'
    },
    explore: [
      { title: 'Photoelectric lab', intro: 'Choose metal and light wavelength.',
        build(el, K) { const M = [['caesium', 2.14], ['potassium', 2.3], ['sodium', 2.75], ['zinc', 3.63], ['copper', 4.65], ['platinum', 5.65]]; let m = 2, lam = 400, I = 50; const row = K.row(el); const s = K.select(row, 'metal', M.map(x => `${x[0]} (φ ${x[1]} eV)`), i => { m = i; draw(); }); s.value = 2; K.slider(row, 'λ (nm)', 100, 800, 5, lam, v => { lam = v; draw(); }); K.slider(row, 'intensity (%)', 0, 100, 5, I, v => { I = v; draw(); }); const rd = K.read(el);
          function draw() { const E = 1240 / lam, phi = M[m][1], K0 = E - phi; rd.innerHTML = `photon energy = 1240/λ = <b>${f(E)} eV</b> · threshold λ₀ = 1240/φ = ${f(1240 / phi)} nm · ` + (K0 > 0 ? `K_max = <b>${f(K0)} eV</b> · stopping potential <b>${f(K0)} V</b> · current ∝ intensity: ${I}%` : `<b>no emission</b> (below threshold, whatever the intensity)`); } draw(); return null; } },
      { title: 'de Broglie wavelength', intro: 'Pick a particle and accelerating voltage.',
        build(el, K) { const P = [['electron', 9.11e-31], ['proton', 1.673e-27], ['alpha particle', 6.64e-27]]; let k = 0, V = 100; const row = K.row(el); K.select(row, 'particle', P.map(x => x[0]), i => { k = i; draw(); }); K.slider(row, 'V (volts)', 1, 10000, 1, V, v => { V = v; draw(); }); const rd = K.read(el);
          function draw() { const q = k === 2 ? 2 * e : e, p = Math.sqrt(2 * P[k][1] * q * V), lam = h / p; rd.innerHTML = `p = √(2mqV) = ${p.toExponential(3)} kg m/s · λ = h/p = <b>${(lam * 1e9).toPrecision(3)} nm</b>${k === 0 ? ` (check: 1.227/√V = ${f(1.227 / Math.sqrt(V))} nm)` : ''}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Photon energy', gen(R) { const lam = R.pick([310, 400, 496, 620]); return { q: `Energy of a photon of λ = ${lam} nm (eV)?`, a: `${f(1240 / lam)} eV`, ans: 1240 / lam, tol: 1e-3 }; } },
      { title: 'Einstein', gen(R) { const lam = R.pick([200, 248, 310]), phi = R.pick([2, 2.3, 3, 4]); return { q: `Light of λ = ${lam} nm on metal of work function ${phi} eV. K_max and stopping potential?`, a: `${f(1240 / lam - phi)} eV, V₀ = ${f(1240 / lam - phi)} V`, ans: 1240 / lam - phi, tol: 1e-3 }; } },
      { title: 'Threshold', gen(R) { const phi = R.pick([2, 2.5, 3.1, 4.13]); return { q: `Threshold wavelength for work function ${phi} eV?`, a: `${f(1240 / phi)} nm`, ans: 1240 / phi, tol: 0.01 }; } },
      { title: 'Electron λ', gen(R) { const V = R.pick([25, 100, 144, 400, 10000]); return { q: `de Broglie wavelength of an electron accelerated through ${V} V?`, a: `${f(1.227 / Math.sqrt(V))} nm`, ans: 1.227 / Math.sqrt(V), tol: 1e-4 }; } },
      { title: 'Concepts', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Effect of doubling intensity on K_max?', 'no change (current doubles)'], ['Slope of V₀–ν graph?', 'h/e'], ['Which experiment confirmed matter waves?', 'Davisson–Germer'], ['Why no emission below ν₀ even with bright light?', 'each photon has too little energy; one photon per electron']]); } }
    ],
    quiz: [
      { q: 'E =', o: ['hν', 'h/ν', 'hλ', 'mc'], a: 0, e: 'Photon.' }, { q: 'K_max depends on', o: ['frequency', 'intensity', 'time', 'area'], a: 0, e: 'Einstein.' },
      { q: 'Photocurrent depends on', o: ['intensity', 'only frequency', 'work function only', 'none'], a: 0, e: 'Photon number.' }, { q: 'de Broglie λ', o: ['h/p', 'p/h', 'hp', 'h/m'], a: 0, e: 'Matter wave.' },
      { q: 'V₀–ν slope', o: ['h/e', 'e/h', 'h', 'φ'], a: 0, e: 'Graph.' }, { q: 'Matter waves confirmed by', o: ['Davisson–Germer', 'Hertz', 'Rutherford', 'Millikan'], a: 0, e: 'Electron diffraction.' },
      { q: '1240/λ(nm) gives', o: ['eV', 'J', 'Hz', 'nm'], a: 0, e: 'Shortcut.' }, { q: 'Electron at 100 V λ ≈', o: ['0.123 nm', '1.23 nm', '12.3 nm', '0.0123 nm'], a: 0, e: '1.227/10.' },
      { q: 'Emission time', o: ['instantaneous', 'minutes', 'depends on intensity', 'hours'], a: 0, e: 'No lag.' }, { q: 'Work function unit', o: ['eV', 'V', 'Hz', 'm'], a: 0, e: 'Energy.' },
      { q: 'Same speed, heavier particle λ', o: ['shorter', 'longer', 'same', 'zero'], a: 0, e: 'h/mv.' }
    ],
    teach: {
      outcomes: ['Explain photoelectric observations', 'Use Einstein’s equation', 'Compute de Broglie wavelength'],
      periods: [{ t: 'Photoelectric effect', flow: [['10 min', 'Failure of wave theory.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Graph reading.']] }, { t: 'Matter waves', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Davisson–Germer story.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Brighter light gives faster electrons.', 'Matter waves are only for electrons.'], activities: ['Solar cell with coloured filters.', 'Graph V₀ vs ν from data.'],
      exit: ['Einstein eqn.', 'λ = h/p.', 'Intensity vs frequency.'], homework: 'Plot V₀ vs ν from given data and find h and φ₀.'
    },
    slides: [{ t: 'Dual Nature', b: ['Photoelectric effect', 'Einstein’s equation', 'Photons', 'de Broglie waves'] }, { t: 'Think and share', b: ['Why does red light not eject electrons from zinc?', 'Why don’t we notice our own matter waves?'] }],
    fs: { groups: [['Photon', [['E', 'hν = hc/λ'], ['p', 'h/λ'], ['eV', '1240/λ(nm)']]], ['Photoelectric', [['Einstein', 'K = hν − φ₀'], ['Stopping', 'eV₀ = K'], ['Threshold', 'ν₀ = φ₀/h']]], ['Matter', [['λ', 'h/mv'], ['Electron', '1.227/√V nm']]]],
      ex: [['248 nm on 3 eV', 'K 2 eV'], ['100 V electron', '0.123 nm']], rem: ['Frequency → energy.', 'Intensity → current.', 'λ = h/p.'] }
  });
})();
