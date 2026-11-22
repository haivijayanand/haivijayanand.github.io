/*
TOOL:    class11_physics_ch12
FAMILY:  CBSE_REVISION / Class 11 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 12 Kinetic Theory (molecular nature, ideal gas law, kinetic interpretation of pressure and temperature, rms speed, degrees of freedom, equipartition, specific heats, mean free path) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  const GAS = [['H₂', 2], ['He', 4], ['N₂', 28], ['O₂', 32], ['CO₂', 44]];
  G9.register({
    no: 12, part: 'Part II', short: 'Kinetic theory', title: 'Kinetic Theory',
    blurb: 'Molecular nature of matter; behaviour of gases and the ideal gas equation PV = nRT = Nk_BT; kinetic theory of an ideal gas — pressure P = ⅓ρv²_rms, kinetic interpretation of temperature (average KE = 3/2 k_BT); rms speed; degrees of freedom and the law of equipartition; specific heats of monatomic, diatomic and polyatomic gases and of solids; mean free path.',
    revise: {
      oneLine: 'PV = nRT (R = 8.314 J/mol K) = Nk_BT (k_B = 1.38 × 10⁻²³ J/K). Pressure P = ⅓ n m v²_rms = ⅓ρv²_rms. Average translational KE per molecule = (3/2)k_BT, so T measures molecular KE. v_rms = √(3RT/M). Equipartition: each degree of freedom gets ½k_BT. Monatomic: f = 3, C_v = 3R/2, γ = 5/3; diatomic (rigid): f = 5, C_v = 5R/2, γ = 7/5. Mean free path λ = 1/(√2 π d² n).',
      sections: [
        { h: 'Assumptions', html: `<p>Molecules are tiny, move randomly, collide elastically, exert no forces except during collisions; collisions last negligible time.</p>` },
        { h: 'Graham / speeds', html: `<p>At the same T, lighter molecules move faster (v_rms ∝ 1/√M): hydrogen escapes the Moon easily.</p>` },
        { h: 'Solids', html: `<p>Each atom oscillates in 3D: 6 quadratic terms → U = 3RT per mole, C = 3R (Dulong–Petit) at high temperatures.</p>` }
      ],
      formulas: [['Ideal gas', 'PV = nRT = Nk_BT'], ['Pressure', '⅓ρv²_rms'], ['KE per molecule', '(3/2)k_BT'], ['v_rms', '√(3RT/M)'], ['Monatomic', 'C_v = 3R/2, γ = 5/3'], ['Diatomic', 'C_v = 5R/2, γ = 7/5'], ['Mean free path', '1/(√2 π d² n)']],
      terms: [['Degrees of freedom', 'independent ways a molecule can store energy'], ['Equipartition', '½k_BT per quadratic term'], ['Mean free path', 'average distance between collisions']],
      traps: ['Use M in kg/mol in v_rms.', 'Temperature in kelvin.', 'Average KE depends only on T, not on the gas.'],
      bridge: '<p>Class 12 Chemistry and Physics use these ideas for solutions and semiconductors.</p>'
    },
    explore: [
      { title: 'rms speed', intro: 'Choose a gas and temperature.',
        build(el, K) { let k = 3, T = 300; const row = K.row(el); K.select(row, 'gas', GAS.map(g => g[0]), i => { k = i; draw(); }); K.slider(row, 'T (K)', 50, 2000, 10, T, v => { T = v; draw(); }); const rd = K.read(el);
          function draw() { const M = GAS[k][1] / 1000; const v = Math.sqrt(3 * 8.314 * T / M); rd.innerHTML = `v_rms = √(3RT/M) = <b>${f(v)} m/s</b> · average KE per molecule = (3/2)k_BT = <b>${f(1.5 * 1.38e-23 * T)} J</b> (same for every gas at ${T} K)`; } draw(); return null; } },
      { title: 'Gas box', intro: 'Molecules bounce in a box; raise T to speed them up. <kbd>P</kbd> play.',
        build(el, K) { let T = 300; const row = K.row(el); K.slider(row, 'T (K)', 50, 1200, 10, T, v => { T = v; }); const b = new K.Board(el, { xmin: 0, xmax: 10, ymin: 0, ymax: 5, axes: false, grid: 0, aspect: 0.45 }); const rd = K.read(el); const P = []; for (let i = 0; i < 40; i++) P.push({ x: 1 + (i * 2.17) % 8, y: 0.5 + (i * 1.31) % 4, a: i * 2.4 }); const an = new K.Anim(Infinity, () => b.redraw(), { ms: 40 });
          b.onDraw = () => { b.clear(); b.rect(0, 0, 10, 5, { fill: '#fff', color: C.ink, w: 2 }); const s = 0.03 * Math.sqrt(T / 300); let hits = 0; P.forEach(p => { p.x += s * Math.cos(p.a); p.y += s * Math.sin(p.a); if (p.x < 0.15 || p.x > 9.85) { p.a = Math.PI - p.a; hits++; } if (p.y < 0.15 || p.y > 4.85) { p.a = -p.a; hits++; } p.x = Math.max(0.15, Math.min(9.85, p.x)); p.y = Math.max(0.15, Math.min(4.85, p.y)); b.dot(p.x, p.y, { r: 5, color: C.blue }); });
            rd.innerHTML = `T = ${T} K → speed ∝ √T (×${f(Math.sqrt(T / 300))} of 300 K) · faster molecules hit walls harder and more often → higher pressure at fixed volume`; };
          K.anim(el, an); an.play(); return an; } }
    ],
    gens: [
      { title: 'Ideal gas', gen(R) { const n = R.pick([1, 2, 0.5]), T = R.pick([273, 300, 400]), V = R.pick([0.01, 0.0224, 0.05]); return { q: `${n} mol at ${T} K in ${V * 1000} L. Pressure? (R = 8.314)`, a: `${f(n * 8.314 * T / V)} Pa`, ans: n * 8.314 * T / V, tol: 1 }; } },
      { title: 'v_rms', gen(R) { const g = R.pick(GAS), T = R.pick([300, 400, 600]); const v = Math.sqrt(3 * 8.314 * T / (g[1] / 1000)); return { q: `v_rms of ${g[0]} (M = ${g[1]} g/mol) at ${T} K?`, a: `${f(v)} m/s`, ans: v, tol: 1 }; } },
      { title: 'Ratio', gen(R) { const k = R.pick([4, 9, 16]); return { q: `Temperature (in K) is made ${k} times. v_rms becomes how many times?`, a: `${Math.sqrt(k)}`, ans: Math.sqrt(k) }; } },
      { title: 'Specific heats', gen(R) { return G9.S9.pickQ(R, [['C_v and γ of a monatomic gas?', '3R/2, 5/3'], ['C_v and γ of a rigid diatomic gas?', '5R/2, 7/5'], ['Degrees of freedom of a monatomic gas?', '3 (translational)'], ['Molar specific heat of solids (Dulong–Petit)?', '3R']]); } },
      { title: 'KE', levels: [2, 3], gen(R) { const T = R.pick([300, 500, 1000]); return { q: `Average translational KE of a molecule at ${T} K? (k_B = 1.38 × 10⁻²³ J/K)`, a: `${(1.5 * 1.38e-23 * T).toExponential(3)} J`, ans: 1.5 * 1.38e-23 * T, tol: 1e-24 }; } }
    ],
    quiz: [
      { q: 'PV =', o: ['nRT', 'nR/T', 'RT/n', 'nT'], a: 0, e: 'Ideal gas.' }, { q: 'Average KE per molecule', o: ['(3/2)k_BT', 'k_BT', '½k_BT', '3k_BT'], a: 0, e: 'Translational.' },
      { q: 'v_rms ∝', o: ['√T', 'T', 'T²', '1/T'], a: 0, e: 'Root.' }, { q: 'γ for monatomic', o: ['5/3', '7/5', '4/3', '1'], a: 0, e: 'f = 3.' },
      { q: 'Pressure =', o: ['⅓ρv²_rms', 'ρv²', '½ρv', 'ρgh'], a: 0, e: 'Kinetic.' }, { q: 'At same T, faster molecules', o: ['lighter gas', 'heavier gas', 'same', 'none'], a: 0, e: '1/√M.' },
      { q: 'Each degree of freedom gets', o: ['½k_BT', 'k_BT', '3/2 k_BT', '0'], a: 0, e: 'Equipartition.' }, { q: 'Diatomic C_v', o: ['5R/2', '3R/2', '3R', 'R'], a: 0, e: 'f = 5.' },
      { q: 'k_B =', o: ['R/N_A', 'R N_A', 'N_A/R', '1'], a: 0, e: 'Boltzmann.' }, { q: 'Mean free path ∝', o: ['1/(n d²)', 'n d²', 'd', 'T only'], a: 0, e: 'Formula.' },
      { q: 'Solids molar heat (high T)', o: ['3R', 'R', '5R/2', '0'], a: 0, e: 'Dulong–Petit.' }
    ],
    teach: {
      outcomes: ['Use the ideal gas law', 'Relate pressure and temperature to molecular motion', 'Apply equipartition to specific heats'],
      periods: [{ t: 'Gas laws', flow: [['10 min', 'Syringe pressure–volume.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Derive P = ⅓ρv².']] }, { t: 'Speeds and heats', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Equipartition table.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Heavier gases have more KE at same T.', 'Use °C.'], activities: ['Boyle’s law with syringe.', 'Perfume diffusion timing.'],
      exit: ['PV = nRT.', 'v_rms.', 'γ values.'], homework: 'Compute v_rms of five gases at 300 K and explain why H₂ is rare in Earth’s air.'
    },
    slides: [{ t: 'Kinetic Theory', b: ['Ideal gas law', 'Pressure from molecules', 'Temperature and KE', 'Equipartition and specific heats'] }, { t: 'Think and share', b: ['Why does the Moon have no air?', 'Why γ = 5/3 for He?'] }],
    fs: { groups: [['Gas law', [['PV', 'nRT = Nk_BT'], ['R', '8.314'], ['k_B', '1.38 × 10⁻²³']]], ['Kinetic', [['P', '⅓ρv²_rms'], ['KE', '(3/2)k_BT'], ['v_rms', '√(3RT/M)']]], ['Heats', [['Mono', 'C_v 3R/2, γ 5/3'], ['Di', 'C_v 5R/2, γ 7/5'], ['Solid', '3R']]]],
      ex: [['O₂ at 300 K', '≈ 483 m/s'], ['T × 4', 'v_rms × 2']], rem: ['Kelvin and kg/mol.', 'KE depends on T only.', 'Count degrees of freedom.'] }
  });
})();
