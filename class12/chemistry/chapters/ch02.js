/*
TOOL:    class12_chemistry_ch02
FAMILY:  CBSE_REVISION / Class 12 Chemistry (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Unit 2 Electrochemistry (galvanic cells, electrode potential, Nernst equation, Gibbs energy, conductance, molar conductivity, Kohlrausch law, electrolysis, Faraday laws, batteries, fuel cells, corrosion) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  const E0 = [['Li⁺/Li', -3.05], ['K⁺/K', -2.93], ['Mg²⁺/Mg', -2.37], ['Al³⁺/Al', -1.66], ['Zn²⁺/Zn', -0.76], ['Fe²⁺/Fe', -0.44], ['Ni²⁺/Ni', -0.25], ['H⁺/H₂', 0], ['Cu²⁺/Cu', 0.34], ['Ag⁺/Ag', 0.80], ['Au³⁺/Au', 1.40]];
  G9.register({
    no: 2, part: 'Part I', short: 'Electrochemistry', title: 'Electrochemistry',
    blurb: 'Electrochemical (galvanic) cells — Daniell cell, salt bridge, cell notation; standard electrode potentials and the SHE; electrochemical series; Nernst equation and equilibrium constant; Gibbs energy and EMF; conductance of electrolytic solutions — conductivity, molar conductivity and their variation with concentration; Kohlrausch’s law of independent migration of ions; electrolytic cells and Faraday’s laws; products of electrolysis; batteries (primary, secondary), fuel cells; corrosion.',
    revise: {
      oneLine: 'In a galvanic cell oxidation occurs at the anode (−) and reduction at the cathode (+); E°cell = E°cathode − E°anode. Nernst: E = E° − (0.059/n) log Q at 298 K; at equilibrium log K = nE°/0.059. ΔG° = −nFE° (spontaneous when E° > 0). Molar conductivity Λm = κ × 1000/M (S cm² mol⁻¹); for strong electrolytes Λm = Λ°m − A√c; for weak ones α = Λm/Λ°m (Kohlrausch). Faraday: m = ZIt = (M/nF) It; 1 F = 96 487 C/mol. Corrosion of iron is electrochemical — prevented by painting, galvanising (Zn) and sacrificial anodes.',
      sections: [
        { h: 'Batteries', html: '<p>Dry cell (Leclanché) and mercury cell are primary; lead storage and Ni–Cd are secondary (rechargeable). H₂–O₂ fuel cell gives ~70% efficiency, product water.</p>' },
        { h: 'Electrolysis products', html: '<p>Aqueous NaCl: H₂ at cathode, Cl₂ at anode (overpotential), NaOH in solution. Molten NaCl: Na and Cl₂.</p>' },
        { h: 'Conductivity trend', html: '<p>κ decreases on dilution (fewer ions per volume); Λm increases on dilution.</p>' }
      ],
      formulas: [['E°cell', 'E°cathode − E°anode'], ['Nernst', 'E = E° − (0.059/n) log Q'], ['K', 'log K = nE°/0.059'], ['ΔG°', '−nFE°'], ['Λm', 'κ × 1000/M'], ['Weak α', 'Λm/Λ°m'], ['Faraday', 'm = MIt/(nF)']],
      terms: [['SHE', 'standard hydrogen electrode, E° = 0'], ['Salt bridge', 'completes circuit, keeps neutrality'], ['Cell constant', 'l/A']],
      traps: ['Anode is negative in a galvanic cell but positive in electrolysis.', 'E° is intensive — don’t multiply by coefficients.', 'Λ°m of weak electrolytes comes from Kohlrausch, not extrapolation.'],
      bridge: '<p>Unit 3 studies how fast reactions go.</p>'
    },
    explore: [
      { title: 'Build a cell', intro: 'Pick two half-cells and ion concentrations.',
        build(el, K) { let a = 4, c = 8, ca = 1, cc = 1; const row = K.row(el); const s1 = K.select(row, 'electrode 1', E0.map(e => e[0]), i => { a = i; draw(); }); s1.value = 4; const s2 = K.select(row, 'electrode 2', E0.map(e => e[0]), i => { c = i; draw(); }); s2.value = 8; K.slider(row, '[ion] at 1 (M)', 0.001, 2, 0.001, ca, v => { ca = v; draw(); }); K.slider(row, '[ion] at 2 (M)', 0.001, 2, 0.001, cc, v => { cc = v; draw(); }); const rd = K.read(el);
          function draw() { if (a === c) { rd.innerHTML = 'choose two different electrodes'; return; } let [an, cat, cA, cC] = E0[a][1] < E0[c][1] ? [a, c, ca, cc] : [c, a, cc, ca]; const Es = E0[cat][1] - E0[an][1], n = 2, Ecell = Es - 0.059 / n * Math.log10(cA / cC), G = -n * 96487 * Ecell / 1000; rd.innerHTML = `anode (oxidation, −): <b>${E0[an][0]}</b> · cathode (reduction, +): <b>${E0[cat][0]}</b> · E°cell = <b>${f(Es)} V</b> · Nernst (n = 2 taken): E = ${f(Es)} − 0.0295 log([anode ion]/[cathode ion]) = <b>${f(Ecell)} V</b> · ΔG ≈ ${f(G)} kJ/mol`; } draw(); return null; } },
      { title: 'Faraday electrolysis', intro: 'Pass current for a time; deposit metal.',
        build(el, K) { const M = [['Cu (Cu²⁺)', 63.5, 2], ['Ag (Ag⁺)', 108, 1], ['Al (Al³⁺)', 27, 3], ['Zn (Zn²⁺)', 65.4, 2]]; let k = 0, I = 2, t = 30; const row = K.row(el); K.select(row, 'metal', M.map(m => m[0]), i => { k = i; draw(); }); K.slider(row, 'current (A)', 0.1, 10, 0.1, I, v => { I = v; draw(); }); K.slider(row, 'time (min)', 1, 120, 1, t, v => { t = v; draw(); }); const rd = K.read(el);
          function draw() { const [n, Mm, z] = M[k], Q = I * t * 60, m = Mm * Q / (z * 96487); rd.innerHTML = `Q = It = <b>${f(Q)} C</b> = ${f(Q / 96487)} F · mass deposited = MQ/(nF) = <b>${f(m)} g</b> of ${n.split(' ')[0]}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'E°cell', gen(R) { const i = R.int(0, 6), j = R.int(7, 10); return { q: `Cell from ${E0[i][0]} (E° = ${E0[i][1]} V) and ${E0[j][0]} (E° = ${E0[j][1]} V). E°cell and anode?`, a: `${f(E0[j][1] - E0[i][1])} V; anode ${E0[i][0]}`, ans: E0[j][1] - E0[i][1], tol: 1e-4 }; } },
      { title: 'ΔG°', gen(R) { const n = R.pick([1, 2, 3]), E = R.pick([0.46, 1.1, 0.8, 2.0]); return { q: `n = ${n}, E°cell = ${E} V. ΔG° (kJ/mol)?`, a: `${f(-n * 96487 * E / 1000)} kJ/mol`, ans: -n * 96487 * E / 1000, tol: 0.05 }; } },
      { title: 'Faraday', gen(R) { const I = R.pick([1, 2, 5]), t = R.pick([10, 20, 60]); const m = 63.5 * I * t * 60 / (2 * 96487); return { q: `${I} A for ${t} min through CuSO₄. Mass of Cu deposited?`, a: `${f(m)} g`, ans: m, tol: 1e-3 }; } },
      { title: 'Molar conductivity', levels: [2, 3], gen(R) { const k = R.pick([0.0024, 0.0125, 0.0001]), M = R.pick([0.01, 0.1, 0.02]); return { q: `κ = ${k} S/cm at ${M} M. Λm (S cm² mol⁻¹)?`, a: f(k * 1000 / M), ans: k * 1000 / M, tol: 1e-3 }; } },
      { title: 'Nernst', levels: [2, 3], gen(R) { const E = R.pick([1.1, 0.46]), n = 2, Q = R.pick([0.01, 0.1, 10, 100]); const v = E - 0.059 / n * Math.log10(Q); return { q: `E° = ${E} V, n = 2, Q = ${Q} at 298 K. E?`, a: `${f(v)} V`, ans: v, tol: 1e-4 }; } }
    ],
    quiz: [
      { q: 'Galvanic anode', o: ['oxidation, negative', 'reduction, positive', 'oxidation, positive', 'reduction, negative'], a: 0, e: 'Electrons leave.' }, { q: 'ΔG° =', o: ['−nFE°', 'nFE°', '−RT', 'nE°'], a: 0, e: 'Spontaneity.' },
      { q: 'Daniell E°', o: ['1.10 V', '0.34 V', '0.76 V', '2 V'], a: 0, e: '0.34 + 0.76.' }, { q: '1 F =', o: ['96 487 C/mol', '1 C', '6.02 × 10²³ C', '8.314 C'], a: 0, e: 'Charge of 1 mol e⁻.' },
      { q: 'Λm on dilution', o: ['increases', 'decreases', 'same', 'zero'], a: 0, e: 'More ions free.' }, { q: 'SHE E°', o: ['0 V', '1 V', '−1 V', '0.34 V'], a: 0, e: 'Reference.' },
      { q: 'Rechargeable', o: ['lead storage', 'dry cell', 'mercury cell', 'none'], a: 0, e: 'Secondary.' }, { q: 'Fuel cell product', o: ['water', 'CO₂', 'NO', 'H₂O₂'], a: 0, e: 'H₂ + O₂.' },
      { q: 'Galvanising uses', o: ['zinc', 'tin', 'copper', 'lead'], a: 0, e: 'Sacrificial.' }, { q: 'Aqueous NaCl cathode', o: ['H₂', 'Na', 'Cl₂', 'O₂'], a: 0, e: 'Water reduced.' },
      { q: 'Weak electrolyte α', o: ['Λm/Λ°m', 'Λ°m/Λm', 'κ', '1'], a: 0, e: 'Kohlrausch.' }
    ],
    teach: {
      outcomes: ['Calculate cell EMF and ΔG', 'Use Nernst and conductance relations', 'Apply Faraday’s laws; explain batteries and corrosion'],
      periods: [{ t: 'Cells', flow: [['10 min', 'Lemon battery.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Nernst problems.']] }, { t: 'Conductance and electrolysis', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Kohlrausch problems.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['E° doubles when equation doubled.', 'Anode always positive.'], activities: ['Daniell cell with salt bridge.', 'Copper plating.'],
      exit: ['E°cell.', 'Nernst.', 'm = MIt/nF.'], homework: 'Compare lead storage battery and H₂–O₂ fuel cell.'
    },
    slides: [{ t: 'Electrochemistry', b: ['Galvanic cells and E°', 'Nernst and ΔG', 'Conductance', 'Electrolysis, batteries, corrosion'] }, { t: 'Think and share', b: ['Why does iron rust faster near the sea?', 'How does a car battery recharge?'] }],
    fs: { groups: [['Cells', [['E°cell', 'E°cat − E°an'], ['Nernst', 'E° − (0.059/n) log Q'], ['ΔG°', '−nFE°']]], ['Conductance', [['Λm', 'κ × 1000/M'], ['Strong', 'Λ°m − A√c'], ['Weak', 'α = Λm/Λ°m']]], ['Electrolysis', [['Faraday', 'm = MIt/(nF)'], ['1 F', '96 487 C'], ['Corrosion', 'Zn coat, paint']]]],
      ex: [['Zn | Cu', '1.10 V'], ['2 A, 20 min Cu', '0.79 g']], rem: ['Anode oxidation.', 'E° intensive.', 'Λm rises on dilution.'] }
  });
})();
