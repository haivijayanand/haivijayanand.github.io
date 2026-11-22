/*
TOOL:    class11_chemistry_ch02
FAMILY:  CBSE_REVISION / Class 11 Chemistry (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Unit 2 Structure of Atom (subatomic particles, Thomson and Rutherford models, EM radiation, Planck, photoelectric effect, hydrogen spectrum, Bohr model, dual nature, uncertainty, quantum numbers, orbitals, aufbau, Pauli, Hund, configurations) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  const ORD = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s', '4d', '5p', '6s'];
  const CAP = { s: 2, p: 6, d: 10, f: 14 };
  const SYM = ['', 'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr'];
  const SUP = n => String(n).split('').map(d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]).join('');
  const conf = z => { if (z === 24) return '[Ar] 3d⁵ 4s¹'; if (z === 29) return '[Ar] 3d¹⁰ 4s¹'; const r = []; let left = z; for (const o of ORD) { if (left <= 0) break; const c = Math.min(CAP[o[1]], left); r.push(o + SUP(c)); left -= c; } const full = r.join(' '); return z > 18 ? full.replace('1s² 2s² 2p⁶ 3s² 3p⁶', '[Ar]') : full; };
  G9.register({
    no: 2, part: 'Part I', short: 'Atom', title: 'Structure of Atom',
    blurb: 'Discovery of electron, proton, neutron; Thomson and Rutherford models; electromagnetic radiation and Planck’s quantum theory; photoelectric effect; line spectrum of hydrogen; Bohr’s model; dual behaviour (de Broglie) and Heisenberg’s uncertainty principle; quantum mechanical model; quantum numbers; shapes of s, p, d orbitals; aufbau, Pauli and Hund rules; electronic configurations and stability of half-filled and filled subshells.',
    revise: {
      oneLine: 'E = hν = hc/λ. Photoelectric effect: hν = hν₀ + ½mv². Bohr (H-like): Eₙ = −2.18 × 10⁻¹⁸ Z²/n² J, rₙ = 52.9 n²/Z pm; spectral lines 1/λ = R_H (1/n₁² − 1/n₂²), R_H = 1.097 × 10⁷ m⁻¹ (Lyman n₁ = 1 UV, Balmer n₁ = 2 visible). de Broglie λ = h/mv. Δx·Δp ≥ h/4π. Quantum numbers n, l (0…n−1), mₗ (−l…+l), mₛ (±½). Fill orbitals by (n + l) rule; Pauli: no two electrons same four numbers; Hund: singly fill degenerate orbitals first.',
      sections: [
        { h: 'Orbitals', html: `<p>s spherical; p dumbbell (3); d mostly cloverleaf (5). Nodes: radial n − l − 1, angular l, total n − 1.</p>` },
        { h: 'Exceptions', html: `<p>Cr: [Ar]3d⁵4s¹ and Cu: [Ar]3d¹⁰4s¹ — half-filled and fully filled d subshells are extra stable (exchange energy, symmetry).</p>` },
        { h: 'Constants', html: `<p>h = 6.626 × 10⁻³⁴ J s, c = 3 × 10⁸ m/s, mₑ = 9.11 × 10⁻³¹ kg, e = 1.602 × 10⁻¹⁹ C.</p>` }
      ],
      formulas: [['Photon', 'E = hν = hc/λ'], ['Photoelectric', 'hν = hν₀ + ½mv²'], ['Bohr energy', '−2.18 × 10⁻¹⁸ Z²/n² J'], ['Rydberg', '1/λ = R(1/n₁² − 1/n₂²)'], ['de Broglie', 'λ = h/mv'], ['Uncertainty', 'ΔxΔp ≥ h/4π'], ['Max electrons in shell', '2n²']],
      terms: [['Orbital', 'region of high probability of finding an electron'], ['Node', 'region of zero probability'], ['Degenerate', 'orbitals of equal energy']],
      traps: ['4s fills before 3d but 4s electrons leave first on ionisation.', 'Bohr model fails for multi-electron atoms.', 'l = n is not allowed.'],
      bridge: '<p>Unit 3 links configurations to the periodic table.</p>'
    },
    explore: [
      { title: 'Electron configuration builder', intro: 'Choose Z (1–36).',
        build(el, K) { let z = 26; const row = K.row(el); K.slider(row, 'Z', 1, 36, 1, z, v => { z = v; draw(); }); const rd = K.read(el);
          function draw() { const c = conf(z); const unp = (() => { if (z === 24) return 6; if (z === 29) return 1; const last = c.split(' ').pop(); const t = last[1], n = +last.slice(2).split('').map(ch => '⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(ch)).join(''); const orbs = CAP[t] / 2; return n <= orbs ? n : 2 * orbs - n; })(); rd.innerHTML = `<b>${SYM[z]}</b> (Z = ${z}): <b>${c}</b> · unpaired electrons (Hund) in last subshell: ${unp}${z === 24 || z === 29 ? ' · exception: half/fully filled 3d is extra stable' : ''}`; } draw(); return null; } },
      { title: 'Hydrogen spectrum', intro: 'Choose a jump; see wavelength and series.',
        build(el, K) { let n1 = 2, n2 = 3; const row = K.row(el); K.slider(row, 'lower n₁', 1, 4, 1, n1, v => { n1 = v; draw(); }); K.slider(row, 'upper n₂', 2, 7, 1, n2, v => { n2 = v; draw(); }); const rd = K.read(el);
          function draw() { if (n2 <= n1) { rd.innerHTML = 'n₂ must be greater than n₁'; return; } const inv = 1.097e7 * (1 / n1 ** 2 - 1 / n2 ** 2); const lam = 1 / inv * 1e9; const E = 2.18e-18 * (1 / n1 ** 2 - 1 / n2 ** 2); rd.innerHTML = `${['', 'Lyman (UV)', 'Balmer (visible)', 'Paschen (IR)', 'Brackett (IR)'][n1]} series · λ = <b>${f(lam)} nm</b> · photon energy ${E.toExponential(3)} J = ${f(E / 1.602e-19)} eV${n1 === 2 && n2 === 3 ? ' · the red Hα line' : ''}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Configuration', gen(R) { const z = R.int(3, 36); return { q: `Electronic configuration of ${SYM[z]} (Z = ${z})?`, a: conf(z) }; } },
      { title: 'Photon energy', gen(R) { const l = R.pick([400, 500, 600, 700]); const E = 6.626e-34 * 3e8 / (l * 1e-9); return { q: `Energy of a photon of wavelength ${l} nm?`, a: `${E.toExponential(3)} J`, ans: E, tol: E * 1e-3 }; } },
      { title: 'Bohr energy', gen(R) { const n = R.int(1, 5); const E = -2.18e-18 / (n * n); return { q: `Energy of the H electron in orbit n = ${n}?`, a: `${E.toExponential(3)} J`, ans: E, tol: Math.abs(E) * 1e-3 }; } },
      { title: 'Quantum numbers', levels: [2, 3], gen(R) { const n = R.int(2, 4); return R.chance(.5) ? { q: `How many orbitals in shell n = ${n}?`, a: String(n * n), ans: n * n } : { q: `Maximum electrons in shell n = ${n}?`, a: String(2 * n * n), ans: 2 * n * n }; } },
      { title: 'de Broglie', levels: [2, 3], gen(R) { const v = R.pick([1e5, 1e6, 2e6]); const l = 6.626e-34 / (9.11e-31 * v); return { q: `de Broglie wavelength of an electron at ${v.toExponential(0)} m/s?`, a: `${(l * 1e9).toPrecision(4)} nm`, ans: l * 1e9, tol: l * 1e6 }; } }
    ],
    quiz: [
      { q: 'E =', o: ['hν', 'mc', 'h/ν', 'hλ'], a: 0, e: 'Planck.' }, { q: 'Balmer series region', o: ['visible', 'UV', 'IR', 'X-ray'], a: 0, e: 'n₁ = 2.' },
      { q: 'l for d orbital', o: ['2', '1', '0', '3'], a: 0, e: 's p d f.' }, { q: 'Cr configuration', o: ['[Ar] 3d⁵ 4s¹', '[Ar] 3d⁴ 4s²', '[Ar] 3d⁶', '[Ar] 4s² 3d⁴'], a: 0, e: 'Half-filled.' },
      { q: 'Max electrons n = 3', o: ['18', '8', '9', '32'], a: 0, e: '2n².' }, { q: 'Pauli principle', o: ['no two e⁻ same 4 quantum numbers', 'fill singly', 'lowest first', 'uncertainty'], a: 0, e: 'Exclusion.' },
      { q: 'de Broglie λ =', o: ['h/mv', 'mv/h', 'hc/E', 'h/ν'], a: 0, e: 'Matter wave.' }, { q: 'Orbitals in n = 2', o: ['4', '2', '8', '3'], a: 0, e: 'n².' },
      { q: 'Nodes in 3p', o: ['2 total', '1', '3', '0'], a: 0, e: 'n − 1.' }, { q: 'Rutherford found', o: ['small dense nucleus', 'electrons', 'neutrons', 'orbitals'], a: 0, e: 'Gold foil.' },
      { q: 'Hund’s rule', o: ['singly fill degenerate orbitals first', 'pair first', 'fill 4s last', 'none'], a: 0, e: 'Max multiplicity.' }
    ],
    teach: {
      outcomes: ['Explain atomic models and spectra', 'Use quantum numbers', 'Write configurations'],
      periods: [{ t: 'Quantum ideas', flow: [['10 min', 'Flame tests / spectroscope.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Bohr numericals.']] }, { t: 'Orbitals', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Quantum number drills.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Orbit = orbital.', '3d fills before 4s.'], activities: ['Flame colours.', 'Aufbau diagonal chart.'],
      exit: ['Configuration of Fe.', 'Rydberg problem.', 'Quantum numbers set.'], homework: 'Write configurations of Z = 1–30 and mark exceptions.'
    },
    slides: [{ t: 'Structure of Atom', b: ['Models and particles', 'Quantum theory and spectra', 'Bohr model', 'Quantum numbers and configurations'] }, { t: 'Think and share', b: ['Why is Cu 3d¹⁰ 4s¹?', 'Why does the Bohr model fail?'] }],
    fs: { groups: [['Light', [['E', 'hν = hc/λ'], ['Photoelectric', 'hν = hν₀ + KE'], ['Rydberg', 'R(1/n₁² − 1/n₂²)']]], ['Bohr', [['Eₙ', '−2.18 × 10⁻¹⁸/n² J'], ['rₙ', '52.9 n² pm'], ['de Broglie', 'h/mv']]], ['Quantum', [['n, l, mₗ, mₛ', 'rules'], ['Fill', 'aufbau, Pauli, Hund'], ['Exceptions', 'Cr, Cu']]]],
      ex: [['n 2 → 3 jump', '656 nm (Hα)'], ['Fe (26)', '[Ar] 3d⁶ 4s²']], rem: ['(n + l) rule.', 'Half/full d stable.', 'Uncertainty limits orbits.'] }
  });
})();
