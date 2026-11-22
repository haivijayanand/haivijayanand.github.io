/*
TOOL:    class12_physics_ch12
FAMILY:  CBSE_REVISION / Class 12 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 12 Atoms (alpha scattering, Rutherford model, atomic spectra series, Bohr model, energy levels, hydrogen line spectrum, de Broglie explanation) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  const SER = [['Lyman', 1, 'ultraviolet'], ['Balmer', 2, 'visible'], ['Paschen', 3, 'infrared'], ['Brackett', 4, 'infrared'], ['Pfund', 5, 'infrared']];
  G9.register({
    no: 12, part: 'Part II', short: 'Atoms', title: 'Atoms',
    blurb: 'Geiger–Marsden alpha-particle scattering and Rutherford’s nuclear model (distance of closest approach, impact parameter); atomic spectra and the spectral series of hydrogen; Bohr’s postulates; radius, speed and energy of electron orbits; energy level diagram, ionisation energy; line spectra of hydrogen; de Broglie’s explanation of Bohr’s quantisation; limitations of Bohr’s model.',
    revise: {
      oneLine: 'Most α-particles pass straight through gold foil, a few deflect at large angles → a tiny, dense, positive nucleus. Bohr: electrons move in stationary orbits with angular momentum mvr = nh/2π, emitting/absorbing a photon hν = E_i − E_f only when jumping. For hydrogen rₙ = 0.529 n² Å, Eₙ = −13.6/n² eV, vₙ ∝ 1/n. Rydberg: 1/λ = R(1/n_f² − 1/n_i²), R = 1.097 × 10⁷ m⁻¹. Series: Lyman (n_f = 1, UV), Balmer (2, visible), Paschen (3), Brackett (4), Pfund (5) — IR.',
      sections: [
        { h: 'de Broglie view', html: '<p>Stationary orbit fits whole number of wavelengths: 2πr = nλ ⇒ mvr = nh/2π.</p>' },
        { h: 'Limitations', html: '<p>Works for hydrogen-like atoms only; cannot explain intensities or fine structure; mixes classical and quantum ideas.</p>' },
        { h: 'Rutherford problem', html: '<p>Classical orbiting electrons should radiate and spiral in — Bohr’s postulates fix this.</p>' }
      ],
      formulas: [['Quantisation', 'mvr = nh/2π'], ['Radius', 'rₙ = 0.529 n² Å'], ['Energy', 'Eₙ = −13.6/n² eV'], ['Photon', 'hν = E_i − E_f'], ['Rydberg', '1/λ = R(1/n_f² − 1/n_i²)'], ['Ionisation (H)', '13.6 eV']],
      terms: [['Ground state', 'n = 1'], ['Impact parameter', 'perpendicular distance of α path from nucleus'], ['Ionisation energy', 'energy to remove electron from ground state']],
      traps: ['Energy is negative (bound); higher n is less negative.', 'Balmer is visible; Lyman is UV.', 'Number of lines from level n = n(n − 1)/2.'],
      bridge: '<p>Ch 13 looks inside the nucleus.</p>'
    },
    explore: [
      { title: 'Hydrogen energy levels', intro: 'Pick initial and final levels; see the photon.',
        build(el, K) { let ni = 3, nf = 2; const row = K.row(el); K.slider(row, 'n initial', 2, 7, 1, ni, v => { ni = v; b.redraw(); }); K.slider(row, 'n final', 1, 6, 1, nf, v => { nf = v; b.redraw(); }); const b = new K.Board(el, { xmin: -1, xmax: 31, ymin: -14.5, ymax: 1.5, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); for (let n = 1; n <= 7; n++) { const E = -13.6 / n / n; b.line(0, E, 20, E, { color: n === ni || n === nf ? C.purple : C.ink, w: n === ni || n === nf ? 2.5 : 1 }); if (n <= 4) b.text(25, E, `n=${n}: ${f(E)} eV`, { font: '12px' }); } b.text(25, 0.8, 'n = 5…7, ∞ (0 eV)', { font: '12px' }); b.line(0, 0, 20, 0, { color: C.grey, w: 1, dash: [4, 4] });
            if (ni > nf) { const Ei = -13.6 / ni / ni, Ef = -13.6 / nf / nf; b.arrow(10, Ei, 10, Ef, { color: C.orange, w: 3 }); const dE = Ei - Ef, lam = 1240 / dE; const s = SER[nf - 1] || ['', nf, '']; rd.innerHTML = `ΔE = <b>${f(dE)} eV</b> · λ = 1240/ΔE = <b>${f(lam)} nm</b> · ${s[0]} series (${s[2]})`; } else rd.innerHTML = 'choose n initial &gt; n final for emission'; };
          b.redraw(); return null; } },
      { title: 'Bohr orbit numbers', intro: 'See radius, speed and energy for level n.',
        build(el, K) { let n = 1; const row = K.row(el); K.slider(row, 'n', 1, 6, 1, n, v => { n = v; draw(); }); const rd = K.read(el); function draw() { rd.innerHTML = `r = 0.529n² = <b>${f(0.529 * n * n)} Å</b> · v = 2.19 × 10⁶/n = <b>${f(2.19 / n)} × 10⁶ m/s</b> · E = −13.6/n² = <b>${f(-13.6 / n / n)} eV</b> · lines possible from here down: ${n * (n - 1) / 2}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Energy level', gen(R) { const n = R.pick([1, 2, 3, 4, 5]); return { q: `Energy of hydrogen electron in n = ${n}?`, a: `${f(-13.6 / n / n)} eV`, ans: -13.6 / n / n, tol: 1e-3 }; } },
      { title: 'Transition', gen(R) { const nf = R.pick([1, 2]), ni = nf + R.pick([1, 2, 3]); const dE = 13.6 * (1 / nf / nf - 1 / ni / ni); return { q: `Wavelength emitted for n = ${ni} → ${nf} in hydrogen?`, a: `${f(1240 / dE)} nm (${SER[nf - 1][0]})`, ans: 1240 / dE, tol: 0.1 }; } },
      { title: 'Radius', gen(R) { const n = R.pick([2, 3, 4]); return { q: `Radius of n = ${n} Bohr orbit of hydrogen?`, a: `${f(0.529 * n * n)} Å`, ans: 0.529 * n * n, tol: 1e-3 }; } },
      { title: 'Lines', gen(R) { const n = R.pick([3, 4, 5, 6]); return { q: `Max spectral lines when electrons fall from n = ${n} to ground?`, a: `${n * (n - 1) / 2}`, ans: n * (n - 1) / 2 }; } },
      { title: 'Series', levels: [2, 3], gen(R) { return G9.S9.groupQ(R, [['n → 1', 0], ['n → 2', 1], ['n → 3', 2], ['visible lines', 1], ['ultraviolet lines', 0], ['n → 5', 4]], ['Lyman', 'Balmer', 'Paschen', 'Brackett', 'Pfund'], 'Series for '); } }
    ],
    quiz: [
      { q: 'Large-angle α scattering shows', o: ['small dense nucleus', 'electrons are heavy', 'atom is empty', 'plum pudding'], a: 0, e: 'Rutherford.' }, { q: 'Eₙ =', o: ['−13.6/n² eV', '13.6n²', '−13.6n', '−13.6/n'], a: 0, e: 'Bohr.' },
      { q: 'Balmer series region', o: ['visible', 'UV', 'IR', 'X-ray'], a: 0, e: 'n_f = 2.' }, { q: 'mvr =', o: ['nh/2π', 'nh', 'h/n', '2πn/h'], a: 0, e: 'Postulate.' },
      { q: 'rₙ ∝', o: ['n²', 'n', '1/n', '1/n²'], a: 0, e: '0.529n².' }, { q: 'Ionisation energy of H', o: ['13.6 eV', '10.2 eV', '3.4 eV', '1 eV'], a: 0, e: 'From n=1.' },
      { q: 'Lyman series ends at', o: ['n = 1', 'n = 2', 'n = 3', 'n = ∞'], a: 0, e: 'Ground.' }, { q: 'Lines from n = 4', o: ['6', '4', '3', '10'], a: 0, e: '4·3/2.' },
      { q: 'Bohr model works for', o: ['hydrogen-like atoms', 'all atoms', 'molecules', 'nuclei'], a: 0, e: 'Limitation.' }, { q: 'Speed vₙ ∝', o: ['1/n', 'n', 'n²', '1/n²'], a: 0, e: 'Bohr.' },
      { q: 'de Broglie condition', o: ['2πr = nλ', 'r = nλ', 'λ = 2πr', 'none'], a: 0, e: 'Standing wave.' }
    ],
    teach: {
      outcomes: ['Explain α-scattering', 'Use Bohr energy levels', 'Identify spectral series'],
      periods: [{ t: 'Rutherford', flow: [['10 min', 'Marble scattering analogy.'], ['15 min', 'Closest approach idea.'], ['15 min', 'Explore panel 2.']] }, { t: 'Bohr and spectra', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Spectroscope view of tube light.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Higher n has more negative energy.', 'Electrons radiate while in orbit (Bohr).'], activities: ['CD spectroscope.', 'Energy ladder diagram.'],
      exit: ['Eₙ formula.', 'Series names.', 'Lines count.'], homework: 'Compute first three Balmer wavelengths.'
    },
    slides: [{ t: 'Atoms', b: ['α scattering', 'Bohr’s postulates', 'Energy levels', 'Spectral series'] }, { t: 'Think and share', b: ['Why are spectra lines, not continuous?', 'Where does Bohr fail?'] }],
    fs: { groups: [['Bohr H', [['r', '0.529n² Å'], ['E', '−13.6/n² eV'], ['v', '∝ 1/n']]], ['Spectra', [['Rydberg', '1/λ = R(1/n_f² − 1/n_i²)'], ['Lines', 'n(n−1)/2'], ['hν', 'E_i − E_f']]], ['Series', [['Lyman', 'n_f 1, UV'], ['Balmer', 'n_f 2, visible'], ['Paschen+', 'IR']]]],
      ex: [['3 → 2', '656 nm (red)'], ['2 → 1', '122 nm (UV)']], rem: ['Negative energies.', 'Balmer visible.', 'Bohr for H only.'] }
  });
})();
