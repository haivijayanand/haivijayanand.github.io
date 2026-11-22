/*
TOOL:    class11_chemistry_ch06
FAMILY:  CBSE_REVISION / Class 11 Chemistry (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Unit 6 Equilibrium (physical and chemical equilibrium, law of mass action, Kc and Kp, Le Chatelier, ionic equilibrium, acids and bases, pH, ionisation constants, buffer solutions, common ion effect, hydrolysis, solubility product) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 6, part: 'Part I', short: 'Equilibrium', title: 'Equilibrium',
    blurb: 'Dynamic equilibrium in physical and chemical processes; law of chemical equilibrium; Kc and Kp (Kp = Kc(RT)^Δn); reaction quotient Q; Le Chatelier’s principle (concentration, pressure, temperature, catalyst); ionic equilibrium; Arrhenius, Brønsted–Lowry and Lewis acids and bases; ionisation of water and pH; Ka, Kb, pKa; common ion effect; salt hydrolysis; buffers; solubility product Ksp.',
    revise: {
      oneLine: 'For aA + bB ⇌ cC + dD, Kc = [C]ᶜ[D]ᵈ/[A]ᵃ[B]ᵇ; Kp = Kc(RT)^Δn. If Q < K the reaction goes forward. Le Chatelier: a disturbed equilibrium shifts to oppose the change; a catalyst does not shift it. Kw = [H⁺][OH⁻] = 10⁻¹⁴ at 298 K; pH = −log[H⁺]; pH + pOH = 14. Weak acid: [H⁺] ≈ √(Ka C). Buffer: pH = pKa + log([salt]/[acid]) (Henderson). Ksp = [Mⁿ⁺]ᵐ[Xᵐ⁻]ⁿ; precipitation when ionic product > Ksp.',
      sections: [
        { h: 'Le Chatelier examples', html: `<p>N₂ + 3H₂ ⇌ 2NH₃ (exothermic): high pressure and lower temperature favour NH₃; Haber uses ~450 °C and Fe catalyst for speed.</p>` },
        { h: 'Salt hydrolysis', html: `<p>Salt of strong acid + weak base (NH₄Cl) → acidic; weak acid + strong base (CH₃COONa) → basic; strong/strong (NaCl) → neutral.</p>` },
        { h: 'Solubility', html: `<p>For AgCl, Ksp = s²; for CaF₂, Ksp = 4s³. Common ion lowers solubility.</p>` }
      ],
      formulas: [['Kp', 'Kc(RT)^Δn'], ['pH', '−log[H⁺]'], ['Kw', '10⁻¹⁴ (298 K)'], ['Weak acid', '[H⁺] = √(KaC)'], ['Henderson', 'pH = pKa + log(salt/acid)'], ['Ksp (AB₂)', '4s³']],
      terms: [['Reaction quotient', 'same expression as K but at any moment'], ['Buffer', 'resists pH change on adding small acid/base'], ['Common ion effect', 'suppression of ionisation by an added common ion']],
      traps: ['Solids and pure liquids are left out of K.', 'Catalyst changes rate, not K.', 'K changes only with temperature.'],
      bridge: '<p>Class 12 electrochemistry and kinetics build on equilibrium.</p>'
    },
    explore: [
      { title: 'pH calculator', intro: 'Choose acid/base type and concentration.',
        build(el, K) { const T = ['strong acid (HCl)', 'strong base (NaOH)', 'weak acid (acetic, Ka 1.8×10⁻⁵)', 'weak base (NH₃, Kb 1.8×10⁻⁵)']; let k = 0, c = -2; const row = K.row(el); K.select(row, 'solution', T, i => { k = i; draw(); }); K.slider(row, 'log₁₀ C', -6, 0, 0.1, c, v => { c = v; draw(); }); const rd = K.read(el);
          function draw() { const C0 = 10 ** c; let pH; if (k === 0) pH = -Math.log10(C0); else if (k === 1) pH = 14 + Math.log10(C0); else if (k === 2) pH = -Math.log10(Math.sqrt(1.8e-5 * C0)); else pH = 14 + Math.log10(Math.sqrt(1.8e-5 * C0)); rd.innerHTML = `C = ${C0.toExponential(2)} M → pH = <b>${f(pH)}</b> · pOH = ${f(14 - pH)}${k >= 2 ? ` · degree of ionisation α ≈ √(K/C) = ${f(Math.min(1, Math.sqrt(1.8e-5 / C0)))}` : ''}${(k < 2 && Math.abs(c) > 5.5) ? ' (very dilute: water’s own ions matter)' : ''}`; } draw(); return null; } },
      { title: 'Le Chatelier on Haber process', intro: 'N₂ + 3H₂ ⇌ 2NH₃, ΔH = −92 kJ. Choose a change.',
        build(el, K) { const CH = [['add N₂', 'forward — uses up added N₂; more NH₃'], ['remove NH₃', 'forward — replaces NH₃'], ['increase pressure', 'forward — 4 mol gas → 2 mol gas'], ['increase temperature', 'backward — endothermic direction; K decreases'], ['add catalyst (Fe)', 'no shift — equilibrium reached faster'], ['add inert gas at constant volume', 'no shift — partial pressures unchanged']]; let k = 0; const row = K.row(el); const sel = K.select(row, 'change', CH.map(c => c[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { rd.innerHTML = `<b>${CH[k][0]}</b> → ${CH[k][1]}`; } const step = () => { k = (k + 1) % CH.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } }
    ],
    gens: [
      { title: 'pH strong', gen(R) { const n = R.int(1, 5), acid = R.chance(.5); return { q: `pH of 10⁻${n} M ${acid ? 'HCl' : 'NaOH'}?`, a: String(acid ? n : 14 - n), ans: acid ? n : 14 - n }; } },
      { title: 'Weak acid', levels: [2, 3], gen(R) { const C0 = R.pick([0.1, 0.01, 0.05]); const H = Math.sqrt(1.8e-5 * C0); return { q: `pH of ${C0} M acetic acid (Ka = 1.8 × 10⁻⁵)?`, a: f(-Math.log10(H)), ans: -Math.log10(H), tol: 0.01 }; } },
      { title: 'Kp–Kc', gen(R) { const dn = R.pick([-2, -1, 1, 2]), Kc = R.pick([0.5, 2, 10]), T = R.pick([300, 500]); const Kp = Kc * (0.0831 * T) ** dn; return { q: `Kc = ${Kc}, Δn = ${dn}, T = ${T} K. Kp? (R = 0.0831 L bar/K mol)`, a: f(Kp), ans: Kp, tol: Kp * 1e-3 }; } },
      { title: 'Ksp', levels: [2, 3], gen(R) { const s = R.pick([1e-5, 2e-5, 1e-4]); const ab = R.chance(.5); return { q: `Solubility of ${ab ? 'AgCl (AB)' : 'CaF₂ (AB₂)'} is ${s.toExponential(0)} mol/L. Ksp?`, a: (ab ? s * s : 4 * s ** 3).toExponential(2), ans: ab ? s * s : 4 * s ** 3, tol: (ab ? s * s : 4 * s ** 3) * 1e-3 }; } },
      { title: 'Salt nature', gen(R) { return G9.S9.groupQ(R, [['NH₄Cl', 0], ['CH₃COONa', 1], ['NaCl', 2], ['Na₂CO₃', 1], ['CuSO₄', 0], ['KNO₃', 2]], ['acidic', 'basic', 'neutral'], 'Aqueous solution of '); } }
    ],
    quiz: [
      { q: 'Kp = Kc(RT)^Δn, Δn = 0', o: ['Kp = Kc', 'Kp > Kc', 'Kp < Kc', 'undefined'], a: 0, e: 'Power 0.' }, { q: 'Catalyst', o: ['does not shift equilibrium', 'shifts forward', 'shifts back', 'changes K'], a: 0, e: 'Rate only.' },
      { q: 'pH of 0.001 M HCl', o: ['3', '1', '11', '0.001'], a: 0, e: '−log 10⁻³.' }, { q: 'Kw at 298 K', o: ['10⁻¹⁴', '10⁻⁷', '14', '1'], a: 0, e: 'Ionic product.' },
      { q: 'NH₄Cl solution', o: ['acidic', 'basic', 'neutral', 'none'], a: 0, e: 'Hydrolysis.' }, { q: 'Q < K', o: ['forward', 'backward', 'equilibrium', 'stops'], a: 0, e: 'More product.' },
      { q: 'Exothermic, raise T', o: ['shifts backward', 'forward', 'no change', 'K increases'], a: 0, e: 'Le Chatelier.' }, { q: 'Ksp of CaF₂ with solubility s', o: ['4s³', 's²', '2s²', 's³'], a: 0, e: 's(2s)².' },
      { q: 'Buffer pH equation', o: ['pKa + log(salt/acid)', 'pKa − log', '14 − pKa', 'pKw'], a: 0, e: 'Henderson.' }, { q: 'Lewis acid', o: ['electron-pair acceptor', 'proton donor only', 'OH⁻ donor', 'e⁻ donor'], a: 0, e: 'BF₃.' },
      { q: 'Common ion effect', o: ['suppresses ionisation', 'increases it', 'no effect', 'changes K'], a: 0, e: 'Le Chatelier.' }
    ],
    teach: {
      outcomes: ['Write K expressions and use Q', 'Apply Le Chatelier', 'Calculate pH, buffers and Ksp'],
      periods: [{ t: 'Chemical equilibrium', flow: [['10 min', 'Cobalt chloride colour shift demo.'], ['15 min', 'Explore panel 2.'], ['15 min', 'K problems.']] }, { t: 'Ionic equilibrium', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Buffer and Ksp problems.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Equilibrium = equal amounts.', 'Catalyst increases yield.'], activities: ['pH of household items.', 'Buffer test with indicator.'],
      exit: ['Kc expression.', 'Le Chatelier case.', 'Weak acid pH.'], homework: 'Explain the choice of conditions in the Haber process using Le Chatelier and kinetics.'
    },
    slides: [{ t: 'Equilibrium', b: ['Law of equilibrium, Kc and Kp', 'Le Chatelier', 'Acids, bases and pH', 'Buffers and Ksp'] }, { t: 'Think and share', b: ['Why doesn’t a catalyst change yield?', 'Why is CH₃COONa basic?'] }],
    fs: { groups: [['K', [['Kc', '[P]ᵖ/[R]ʳ'], ['Kp', 'Kc(RT)^Δn'], ['Q vs K', 'direction']]], ['Le Chatelier', [['Pressure', 'fewer gas moles'], ['Temperature', 'endothermic side'], ['Catalyst', 'no shift']]], ['Ionic', [['pH', '−log[H⁺]'], ['Weak acid', '√(KaC)'], ['Buffer', 'pKa + log(s/a)'], ['Ksp', 's², 4s³']]]],
      ex: [['0.1 M acetic', 'pH ≈ 2.87'], ['s 10⁻⁴ CaF₂', 'Ksp 4 × 10⁻¹²']], rem: ['Leave solids out of K.', 'Only T changes K.', 'pH + pOH = 14.'] }
  });
})();
