/*
TOOL:    class11_chemistry_ch05
FAMILY:  CBSE_REVISION / Class 11 Chemistry (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Unit 5 Thermodynamics (system and surroundings, state functions, first law, work, enthalpy, ΔH and ΔU, heat capacity, Hess’s law, enthalpies of formation combustion atomisation, bond enthalpy, lattice enthalpy, entropy, Gibbs energy, spontaneity) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 5, part: 'Part I', short: 'Thermodynamics', title: 'Thermodynamics',
    blurb: 'System, surroundings and state functions; internal energy, work and heat; first law; enthalpy and ΔH = ΔU + Δn_gRT; heat capacities and calorimetry; standard enthalpies — formation, combustion, atomisation, solution, bond enthalpy, lattice enthalpy (Born–Haber); Hess’s law; spontaneity, entropy and Gibbs energy (ΔG = ΔH − TΔS); ΔG° and equilibrium constant.',
    revise: {
      oneLine: 'ΔU = q + w (chemistry sign: w is work done on the system). ΔH = ΔU + Δn_g RT. Hess: ΔH of a reaction is the same however the steps are taken; ΔH_r° = ΣΔ_fH°(products) − ΣΔ_fH°(reactants), or from bonds ΣBE(broken) − ΣBE(formed). Spontaneity: ΔG = ΔH − TΔS < 0. ΔG° = −RT ln K = −2.303RT log K. Entropy increases for solid → liquid → gas and when Δn_g > 0.',
      sections: [
        { h: 'Signs', html: `<p>Exothermic ΔH < 0, endothermic ΔH > 0. Δ_fH° of elements in standard states is zero.</p>` },
        { h: 'ΔG table', html: `<p>ΔH −, ΔS + → always spontaneous. ΔH +, ΔS − → never. ΔH −, ΔS − → spontaneous at low T. ΔH +, ΔS + → spontaneous at high T (T > ΔH/ΔS).</p>` },
        { h: 'Calorimetry', html: `<p>Bomb calorimeter (constant V) gives ΔU; coffee-cup calorimeter (constant P) gives ΔH.</p>` }
      ],
      formulas: [['First law', 'ΔU = q + w'], ['ΔH vs ΔU', 'ΔH = ΔU + Δn_gRT'], ['Hess (formation)', 'ΣΔ_fH(P) − ΣΔ_fH(R)'], ['Bond enthalpy', 'Σ broken − Σ formed'], ['Gibbs', 'ΔG = ΔH − TΔS'], ['Equilibrium', 'ΔG° = −2.303RT log K']],
      terms: [['State function', 'depends only on state (U, H, S, G)'], ['Standard state', 'pure substance at 1 bar, specified T'], ['Entropy', 'measure of dispersal of energy/disorder']],
      traps: ['Chemistry uses w on system positive (opposite of physics’ convention).', 'Use kelvin and consistent units (J vs kJ).', 'A spontaneous reaction may still be slow.'],
      bridge: '<p>Unit 6 connects ΔG° with equilibrium constants.</p>'
    },
    explore: [
      { title: 'Spontaneity finder', intro: 'Set ΔH, ΔS and T; see ΔG.',
        build(el, K) { let H = -50, S = 100, T = 298; const row = K.row(el); K.slider(row, 'ΔH (kJ/mol)', -200, 200, 5, H, v => { H = v; draw(); }); K.slider(row, 'ΔS (J/K mol)', -300, 300, 10, S, v => { S = v; draw(); }); K.slider(row, 'T (K)', 100, 2000, 10, T, v => { T = v; draw(); }); const rd = K.read(el);
          function draw() { const G = H - T * S / 1000; const Tc = S !== 0 ? H * 1000 / S : null; rd.innerHTML = `ΔG = ΔH − TΔS = ${H} − ${T}×${S}/1000 = <b>${f(G)} kJ/mol</b> → <b>${G < 0 ? 'spontaneous' : G > 0 ? 'non-spontaneous' : 'at equilibrium'}</b>${Tc && Tc > 0 ? ` · crossover T = ΔH/ΔS = ${f(Tc)} K` : ''} · K = e^(−ΔG/RT) ≈ ${(Math.exp(-G * 1000 / (8.314 * T))).toExponential(2)}`; } draw(); return null; } },
      { title: 'Hess’s law cycle', intro: 'Formation of CO from C and O₂ (cannot be measured directly). <kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Target', 'C(graphite) + ½O₂ → CO; ΔH = ?'], ['Step 1', 'C + O₂ → CO₂; ΔH₁ = −393.5 kJ/mol'], ['Step 2', 'CO + ½O₂ → CO₂; ΔH₂ = −283.0 kJ/mol'], ['Combine', 'Target = Step 1 − Step 2'], ['Answer', 'ΔH = −393.5 − (−283.0) = −110.5 kJ/mol']] }); } }
    ],
    gens: [
      { title: 'ΔG', gen(R) { const H = R.pick([-100, -50, 30, 80]), S = R.pick([-150, -50, 50, 150]), T = R.pick([298, 500, 1000]); const G = H - T * S / 1000; return { q: `ΔH = ${H} kJ/mol, ΔS = ${S} J/K mol, T = ${T} K. ΔG and spontaneity?`, a: `${f(G)} kJ/mol — ${G < 0 ? 'spontaneous' : 'non-spontaneous'}`, ans: G, tol: 0.01 }; } },
      { title: 'ΔH from ΔU', gen(R) { const U = R.pick([-1000, -500, -200]), dn = R.pick([-2, -1, 1, 2]); const Hh = U + dn * 8.314 * 298 / 1000; return { q: `ΔU = ${U} kJ/mol, Δn_g = ${dn}, T = 298 K. ΔH?`, a: `${f(Hh)} kJ/mol`, ans: Hh, tol: 0.01 }; } },
      { title: 'Formation enthalpy', levels: [2, 3], gen(R) { return { q: 'CH₄ + 2O₂ → CO₂ + 2H₂O(l). Δ_fH: CH₄ −74.8, CO₂ −393.5, H₂O(l) −285.8 kJ/mol. ΔH_c?', a: '−890.3 kJ/mol', ans: -890.3, tol: 0.05 }; } },
      { title: 'Bond enthalpy', levels: [2, 3], gen(R) { return { q: 'H₂ + Cl₂ → 2HCl. BE: H–H 436, Cl–Cl 242, H–Cl 431 kJ/mol. ΔH?', a: '−184 kJ/mol', ans: -184 }; } },
      { title: 'Entropy sign', gen(R) { return G9.S9.groupQ(R, [['ice melting', 0], ['water vapour condensing', 1], ['CaCO₃ → CaO + CO₂', 0], ['N₂ + 3H₂ → 2NH₃', 1], ['sugar dissolving', 0], ['gas compressed', 1]], ['ΔS > 0', 'ΔS < 0'], 'Sign of ΔS: '); } }
    ],
    quiz: [
      { q: 'ΔH = ΔU +', o: ['Δn_gRT', 'TΔS', 'PΔT', 'nR'], a: 0, e: 'Gases.' }, { q: 'Spontaneous if', o: ['ΔG < 0', 'ΔG > 0', 'ΔH > 0', 'ΔS < 0'], a: 0, e: 'Gibbs.' },
      { q: 'Δ_fH of O₂(g)', o: ['0', '−393.5', '+100', '−285.8'], a: 0, e: 'Element.' }, { q: 'Hess’s law based on', o: ['H is a state function', 'kinetics', 'entropy', 'catalysis'], a: 0, e: 'Path-independent.' },
      { q: 'Bomb calorimeter gives', o: ['ΔU', 'ΔH', 'ΔG', 'ΔS'], a: 0, e: 'Constant V.' }, { q: 'ΔG° =', o: ['−RT ln K', 'RT ln K', 'ΔH', '−nFE only'], a: 0, e: 'Equilibrium.' },
      { q: 'ΔH +, ΔS + spontaneous at', o: ['high T', 'low T', 'all T', 'never'], a: 0, e: 'TΔS wins.' }, { q: 'Entropy increases', o: ['solid → gas', 'gas → liquid', 'freezing', 'compression'], a: 0, e: 'Disorder.' },
      { q: 'Exothermic', o: ['ΔH < 0', 'ΔH > 0', 'ΔG > 0', 'ΔS = 0'], a: 0, e: 'Heat out.' }, { q: 'Lattice enthalpy found using', o: ['Born–Haber cycle', 'bomb calorimeter only', 'pH meter', 'spectroscope'], a: 0, e: 'Hess.' },
      { q: 'Extensive property', o: ['enthalpy', 'temperature', 'density', 'pressure'], a: 0, e: 'Depends on amount.' }
    ],
    teach: {
      outcomes: ['Apply the first law and ΔH–ΔU relation', 'Use Hess’s law and bond enthalpies', 'Predict spontaneity with ΔG'],
      periods: [{ t: 'Enthalpy', flow: [['10 min', 'Coffee-cup neutralisation.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Hess problems.']] }, { t: 'Spontaneity', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'ΔG sign table.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Exothermic always spontaneous.', 'Spontaneous means fast.'], activities: ['Enthalpy of neutralisation.', 'Ice melting entropy discussion.'],
      exit: ['ΔH = ΔU + Δn_gRT.', 'Hess calculation.', 'ΔG table.'], homework: 'Find ΔH_c of ethanol from formation enthalpies and compare with tables.'
    },
    slides: [{ t: 'Chemical Thermodynamics', b: ['First law', 'Enthalpy and Hess', 'Bond and lattice enthalpies', 'Entropy and Gibbs energy'] }, { t: 'Think and share', b: ['Why does ice melt above 0 °C?', 'Can spontaneous be slow?'] }],
    fs: { groups: [['Energy', [['ΔU', 'q + w'], ['ΔH', 'ΔU + Δn_gRT']]], ['Hess', [['Formation', 'ΣP − ΣR'], ['Bonds', 'broken − formed'], ['Cycles', 'add/subtract steps']]], ['Spontaneity', [['ΔG', 'ΔH − TΔS'], ['ΔG°', '−2.303RT log K'], ['Crossover', 'T = ΔH/ΔS']]]],
      ex: [['CO formation', '−110.5 kJ/mol'], ['H₂ + Cl₂', '−184 kJ/mol']], rem: ['Watch sign conventions.', 'kJ vs J.', 'Spontaneous ≠ fast.'] }
  });
})();
