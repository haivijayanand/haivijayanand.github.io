/*
TOOL:    class11_chemistry_ch01
FAMILY:  CBSE_REVISION / Class 11 Chemistry (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Unit 1 Some Basic Concepts of Chemistry (matter, SI units, significant figures, laws of chemical combination, atomic and molecular mass, mole concept, percentage composition, empirical formula, stoichiometry, limiting reagent, concentration terms) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  const AM = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, Cl: 35.5, K: 39, Ca: 40, Fe: 56, Cu: 63.5 };
  const MOL = [['H₂O', { H: 2, O: 1 }], ['CO₂', { C: 1, O: 2 }], ['NaOH', { Na: 1, O: 1, H: 1 }], ['H₂SO₄', { H: 2, S: 1, O: 4 }], ['CaCO₃', { Ca: 1, C: 1, O: 3 }], ['C₆H₁₂O₆', { C: 6, H: 12, O: 6 }], ['NH₃', { N: 1, H: 3 }], ['Fe₂O₃', { Fe: 2, O: 3 }]];
  const mm = c => Object.entries(c).reduce((s, [e, n]) => s + AM[e] * n, 0);
  G9.register({
    no: 1, part: 'Part I', short: 'Mole concept', title: 'Some Basic Concepts of Chemistry',
    blurb: 'Importance of chemistry; nature of matter; SI units, precision, significant figures; laws of chemical combination; Dalton’s theory; atomic and molecular masses; mole concept and molar mass; percentage composition; empirical and molecular formulae; stoichiometry and limiting reagent; concentration — mass percent, mole fraction, molarity, molality.',
    revise: {
      oneLine: 'One mole = 6.022 × 10²³ entities; n = mass/M. Percentage of an element = (mass of element in 1 mol ÷ M) × 100. Empirical formula from % → moles → simplest whole-number ratio; molecular formula = n × empirical. Use balanced equations for mole ratios; the limiting reagent is used up first. Molarity M = moles solute / L solution; molality m = moles solute / kg solvent (temperature-independent); mole fraction x = nᵢ/Σn.',
      sections: [
        { h: 'Laws', html: `<p>Conservation of mass (Lavoisier), definite proportions (Proust), multiple proportions (Dalton), Gay-Lussac’s gaseous volumes, Avogadro’s law (equal volumes, equal molecules at same T, P).</p>` },
        { h: 'Empirical formula', html: `<p>C 40%, H 6.67%, O 53.3% → moles 3.33 : 6.67 : 3.33 → CH₂O; if M = 180, molecular formula C₆H₁₂O₆.</p>` },
        { h: 'Gas volume', html: `<p>At STP (273 K, 1 bar) one mole of ideal gas ≈ 22.7 L (older texts: 22.4 L at 1 atm).</p>` }
      ],
      formulas: [['n', 'm/M = N/N_A'], ['N_A', '6.022 × 10²³'], ['Molarity', 'n / V(L)'], ['Molality', 'n / kg solvent'], ['Mass %', 'mass solute / mass solution × 100'], ['Dilution', 'M₁V₁ = M₂V₂']],
      terms: [['Empirical formula', 'simplest whole-number ratio of atoms'], ['Limiting reagent', 'reactant that runs out first'], ['Molality', 'moles per kg of solvent']],
      traps: ['Molarity uses volume of solution, molality mass of solvent.', 'Balance the equation before mole ratios.', 'Average atomic mass uses isotope abundances.'],
      bridge: '<p>Every later unit uses moles and stoichiometry.</p>'
    },
    explore: [
      { title: 'Molar mass & moles', intro: 'Choose a substance and mass.',
        build(el, K) { let k = 0, m = 18; const row = K.row(el); K.select(row, 'substance', MOL.map(x => x[0]), i => { k = i; draw(); }); K.slider(row, 'mass (g)', 1, 500, 1, m, v => { m = v; draw(); }); const rd = K.read(el);
          function draw() { const [nm, c] = MOL[k]; const M = mm(c); const n = m / M; rd.innerHTML = `M(${nm}) = <b>${f(M)} g/mol</b> · n = ${m}/${f(M)} = <b>${f(n)} mol</b> · molecules = ${(n * 6.022e23).toExponential(3)} · composition: ${Object.entries(c).map(([e, q]) => `${e} ${f(AM[e] * q / M * 100)}%`).join(', ')}`; } draw(); return null; } },
      { title: 'Limiting reagent', intro: 'N₂ + 3H₂ → 2NH₃. Set the moles of each reactant.',
        build(el, K) { let a = 2, b2 = 4; const row = K.row(el); K.slider(row, 'N₂ (mol)', 0.5, 10, 0.5, a, v => { a = v; draw(); }); K.slider(row, 'H₂ (mol)', 0.5, 20, 0.5, b2, v => { b2 = v; draw(); }); const rd = K.read(el);
          function draw() { const ext = Math.min(a, b2 / 3); const lim = a < b2 / 3 ? 'N₂' : b2 / 3 < a ? 'H₂' : 'both (exact ratio)'; rd.innerHTML = `limiting: <b>${lim}</b> · NH₃ formed = <b>${f(2 * ext)} mol</b> (${f(2 * ext * 17)} g) · left over: N₂ ${f(a - ext)} mol, H₂ ${f(b2 - 3 * ext)} mol`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Moles', gen(R) { const [nm, c] = R.pick(MOL); const M = mm(c); const k = R.pick([0.25, 0.5, 2, 3]); return { q: `Moles in ${f(k * M)} g of ${nm}?`, a: `${k} mol`, ans: k, tol: 1e-6 }; } },
      { title: 'Molarity', gen(R) { const g = R.pick([4, 8, 20, 40]), V = R.pick([0.1, 0.25, 0.5, 1]); return { q: `${g} g NaOH (M = 40) in ${V * 1000} mL solution. Molarity?`, a: `${f(g / 40 / V)} M`, ans: g / 40 / V, tol: 1e-6 }; } },
      { title: 'Molality', levels: [2, 3], gen(R) { const g = R.pick([9, 18, 36]), w = R.pick([100, 250, 500]); return { q: `${g} g glucose (M = 180) in ${w} g water. Molality?`, a: `${f(g / 180 / (w / 1000))} m`, ans: g / 180 / (w / 1000), tol: 1e-6 }; } },
      { title: 'Empirical formula', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['C 40%, H 6.67%, O 53.3% (M 180). Molecular formula?', 'C₆H₁₂O₆ (empirical CH₂O)'], ['C 92.3%, H 7.7% (M 78). Molecular formula?', 'C₆H₆ (empirical CH)'], ['C 85.7%, H 14.3% (M 28). Molecular formula?', 'C₂H₄ (empirical CH₂)'], ['N 30.4%, O 69.6% (M 92). Molecular formula?', 'N₂O₄ (empirical NO₂)']]); } },
      { title: 'Dilution', gen(R) { const M1 = R.pick([1, 2, 6, 12]), V2 = R.pick([250, 500, 1000]), M2 = R.pick([0.1, 0.2, 0.5]); return { q: `Volume of ${M1} M acid needed to make ${V2} mL of ${M2} M solution?`, a: `${f(M2 * V2 / M1)} mL`, ans: M2 * V2 / M1, tol: 1e-6 }; } }
    ],
    quiz: [
      { q: 'N_A =', o: ['6.022 × 10²³', '3 × 10⁸', '1.6 × 10⁻¹⁹', '8.314'], a: 0, e: 'Avogadro.' }, { q: 'Molality unit', o: ['mol/kg', 'mol/L', 'g/L', 'none'], a: 0, e: 'Solvent mass.' },
      { q: 'Temperature-independent', o: ['molality', 'molarity', 'normality', 'g/L'], a: 0, e: 'Mass-based.' }, { q: 'Moles in 36 g water', o: ['2', '1', '18', '0.5'], a: 0, e: '36/18.' },
      { q: 'Empirical formula of glucose', o: ['CH₂O', 'C₆H₁₂O₆', 'CHO', 'C₂H₄O₂'], a: 0, e: 'Ratio.' }, { q: 'Law of multiple proportions by', o: ['Dalton', 'Proust', 'Lavoisier', 'Avogadro'], a: 0, e: 'Dalton.' },
      { q: 'Limiting reagent', o: ['used up first', 'in excess', 'catalyst', 'product'], a: 0, e: 'Limits.' }, { q: 'M(H₂SO₄)', o: ['98', '96', '49', '100'], a: 0, e: '2 + 32 + 64.' },
      { q: 'M₁V₁ = M₂V₂ for', o: ['dilution', 'neutralisation only', 'molality', 'gases only'], a: 0, e: 'Moles same.' }, { q: 'Sig figs in 0.0250', o: ['3', '4', '2', '5'], a: 0, e: '2, 5, 0.' },
      { q: '% C in CO₂', o: ['27.3%', '12%', '72.7%', '50%'], a: 0, e: '12/44.' }
    ],
    teach: {
      outcomes: ['Use the mole concept', 'Find empirical/molecular formulae', 'Solve stoichiometry and concentration problems'],
      periods: [{ t: 'Moles', flow: [['10 min', 'Counting by weighing.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Empirical formula practice.']] }, { t: 'Stoichiometry', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Molarity/molality problems.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Molarity = molality.', 'Excess reagent limits.'], activities: ['Prepare 0.1 M solution.', 'Mole map poster.'],
      exit: ['n = m/M.', 'Limiting reagent.', 'M vs m.'], homework: 'Solve 10 stoichiometry problems including one limiting reagent.'
    },
    slides: [{ t: 'Some Basic Concepts of Chemistry', b: ['Laws of combination', 'Mole concept', 'Formulae', 'Stoichiometry and concentration'] }, { t: 'Think and share', b: ['Why is molality T-independent?', 'How to find the limiting reagent?'] }],
    fs: { groups: [['Mole', [['n', 'm/M'], ['N_A', '6.022 × 10²³'], ['Gas (STP)', '22.7 L']]], ['Formulae', [['Empirical', 'simplest ratio'], ['Molecular', 'n × empirical'], ['% element', 'mass in 1 mol / M × 100']]], ['Concentration', [['M', 'mol/L solution'], ['m', 'mol/kg solvent'], ['x', 'nᵢ/Σn'], ['Dilution', 'M₁V₁ = M₂V₂']]]],
      ex: [['4 g NaOH in 250 mL', '0.4 M'], ['2 N₂ + 4 H₂', 'H₂ limits, 2.67 mol NH₃']], rem: ['Balance first.', 'Volume vs mass basis.', 'Track units.'] }
  });
})();
