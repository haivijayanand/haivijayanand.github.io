/*
TOOL:    class12_chemistry_ch03
FAMILY:  CBSE_REVISION / Class 12 Chemistry (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Unit 3 Chemical Kinetics (rate, factors, rate law, order and molecularity, integrated rate equations, half-life, pseudo first order, Arrhenius equation, activation energy, collision theory) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 3, part: 'Part I', short: 'Kinetics', title: 'Chemical Kinetics',
    blurb: 'Rate of a reaction (average and instantaneous); factors affecting rate — concentration, temperature, catalyst; rate law and rate constant; order and molecularity; integrated rate equations for zero and first order reactions; half-life; pseudo first order reactions; temperature dependence — Arrhenius equation, activation energy; effect of catalyst; collision theory.',
    revise: {
      oneLine: 'Rate = k[A]^x[B]^y; order = x + y (experimental, can be fractional/zero); molecularity is the number of species in an elementary step (whole number, ≤ 3). Zero order: [A] = [A]₀ − kt, t½ = [A]₀/2k. First order: k = (2.303/t) log([A]₀/[A]), t½ = 0.693/k (independent of [A]₀). Units of k: mol L⁻¹ s⁻¹ (zero), s⁻¹ (first). Arrhenius k = A e^(−Ea/RT); log(k₂/k₁) = Ea/(2.303R) (1/T₁ − 1/T₂). A 10 K rise roughly doubles the rate. Catalysts lower Ea without changing ΔG or equilibrium.',
      sections: [
        { h: 'Pseudo first order', html: '<p>Acid hydrolysis of ester or inversion of cane sugar: water in large excess, so rate depends on one reactant only.</p>' },
        { h: 'Graphs', html: '<p>Zero order: [A] vs t straight, slope −k. First order: ln[A] vs t straight, slope −k; log k vs 1/T slope −Ea/2.303R.</p>' },
        { h: 'Collision theory', html: '<p>Rate = P Z_AB e^(−Ea/RT): only collisions with enough energy and proper orientation react.</p>' }
      ],
      formulas: [['Zero', '[A] = [A]₀ − kt'], ['First', 'k = (2.303/t) log([A]₀/[A])'], ['t½ first', '0.693/k'], ['t½ zero', '[A]₀/2k'], ['Arrhenius', 'k = Ae^(−Ea/RT)'], ['Two temps', 'log(k₂/k₁) = (Ea/2.303R)(1/T₁ − 1/T₂)']],
      terms: [['Order', 'sum of powers in rate law'], ['Molecularity', 'species in an elementary step'], ['Activation energy', 'minimum extra energy to form activated complex']],
      traps: ['Order can’t be read from the balanced equation.', 'First-order t½ is independent of starting concentration.', 'Catalyst doesn’t shift equilibrium.'],
      bridge: '<p>Unit 4 turns to the transition metals.</p>'
    },
    explore: [
      { title: 'Order explorer', intro: 'Compare concentration–time curves for zero and first order.',
        build(el, K) { let k = 0.1, A0 = 1, ord = 1; const row = K.row(el); K.select(row, 'order', ['zero', 'first'], i => { ord = i; b.redraw(); }).value = 1; K.slider(row, 'k', 0.01, 0.3, 0.01, k, v => { k = v; b.redraw(); }); K.slider(row, '[A]₀ (M)', 0.2, 2, 0.1, A0, v => { A0 = v; b.redraw(); }); const b = new K.Board(el, { xmin: -3, xmax: 63, ymin: -2, ymax: 22, axes: false, grid: 0, aspect: 0.4 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.line(0, 0, 60, 0, { color: C.ink, w: 1 }); b.line(0, 0, 0, 21, { color: C.ink, w: 1 }); let p = null; for (let t = 0; t <= 60; t += 0.5) { const c = ord ? A0 * Math.exp(-k * t) : Math.max(0, A0 - k * t * 0.1); const y = c * 10; if (p) b.line(p[0], p[1], t, y, { color: C.blue, w: 2.5 }); p = [t, y]; } const th = ord ? 0.693 / k : A0 / (2 * k * 0.1); if (th < 60) { b.line(th, 0, th, A0 * 5, { color: C.orange, w: 1.5, dash: [4, 4] }); b.text(th, A0 * 5 + 1, 't½', { font: '12px' }); } b.text(55, -1.2, 't (s)', { font: '11px' });
            rd.innerHTML = ord ? `first order: [A] = [A]₀e^(−kt) · t½ = 0.693/k = <b>${f(th)} s</b> (same for any [A]₀)` : `zero order (k here = ${f(k * 0.1)} M/s): [A] = [A]₀ − kt · t½ = [A]₀/2k = <b>${f(th)} s</b> (grows with [A]₀) · finishes at ${f(A0 / (k * 0.1))} s`; };
          b.redraw(); return null; } },
      { title: 'Arrhenius', intro: 'Activation energy and temperature.',
        build(el, K) { let Ea = 50, T1 = 298, dT = 10; const row = K.row(el); K.slider(row, 'Ea (kJ/mol)', 10, 150, 1, Ea, v => { Ea = v; draw(); }); K.slider(row, 'T₁ (K)', 250, 400, 1, T1, v => { T1 = v; draw(); }); K.slider(row, 'rise (K)', 5, 50, 5, dT, v => { dT = v; draw(); }); const rd = K.read(el);
          function draw() { const T2 = T1 + dT, r = Math.exp(Ea * 1000 / 8.314 * (1 / T1 - 1 / T2)); rd.innerHTML = `k₂/k₁ = exp[(Ea/R)(1/T₁ − 1/T₂)] = <b>${f(r)}</b> · fraction of collisions with E ≥ Ea at T₁: e^(−Ea/RT) = ${Math.exp(-Ea * 1000 / (8.314 * T1)).toExponential(2)}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'First-order t½', gen(R) { const k = R.pick([0.0693, 0.01, 2.31e-3, 0.5]); return { q: `First-order k = ${k} s⁻¹. Half-life?`, a: `${f(0.693 / k)} s`, ans: 0.693 / k, tol: 0.01 }; } },
      { title: 'First-order time', gen(R) { const k = R.pick([0.01, 0.05, 0.1]), frac = R.pick([[50, 2], [75, 4], [90, 10], [99, 100]]); const t = 2.303 / k * Math.log10(frac[1]); return { q: `First-order k = ${k} min⁻¹. Time for ${frac[0]}% completion?`, a: `${f(t)} min`, ans: t, tol: 0.05 }; } },
      { title: 'Order from units', gen(R) { return G9.S9.groupQ(R, [['mol L⁻¹ s⁻¹', 0], ['s⁻¹', 1], ['L mol⁻¹ s⁻¹', 2], ['min⁻¹', 1], ['M/s', 0]], ['zero', 'first', 'second'], 'Order for k in '); } },
      { title: 'Rate law', levels: [2, 3], gen(R) { const x = R.pick([1, 2]), y = R.pick([0, 1, 2]), fa = R.pick([2, 3]); return { q: `Rate = k[A]^${x}[B]^${y}. If [A] is multiplied by ${fa} and [B] by 2, rate changes by?`, a: `× ${fa ** x * 2 ** y} (order ${x + y})`, ans: fa ** x * 2 ** y }; } },
      { title: 'Arrhenius', levels: [2, 3], gen(R) { const r = R.pick([2, 3, 4]), T1 = 300, T2 = 310; const Ea = 2.303 * 8.314 * Math.log10(r) / (1 / T1 - 1 / T2) / 1000; return { q: `Rate becomes ${r}× from 300 K to 310 K. Ea (kJ/mol)?`, a: `${f(Ea)} kJ/mol`, ans: Ea, tol: 0.1 }; } }
    ],
    quiz: [
      { q: 'First-order t½', o: ['0.693/k', '[A]₀/2k', '1/k[A]₀', 'k/0.693'], a: 0, e: 'Independent of [A]₀.' }, { q: 'Unit of first-order k', o: ['s⁻¹', 'mol L⁻¹ s⁻¹', 'L mol⁻¹ s⁻¹', 'none'], a: 0, e: 'Time⁻¹.' },
      { q: 'Order is found', o: ['experimentally', 'from equation', 'from molecularity', 'from colour'], a: 0, e: 'Rate law.' }, { q: 'Molecularity can be', o: ['1, 2 or 3', 'fractional', 'zero', 'negative'], a: 0, e: 'Elementary.' },
      { q: 'Catalyst changes', o: ['Ea', 'ΔG', 'K', 'ΔH'], a: 0, e: 'Lower path.' }, { q: 'Arrhenius', o: ['k = Ae^(−Ea/RT)', 'k = ART', 'k = Ea/RT', 'k = A/T'], a: 0, e: 'Exponential.' },
      { q: 'Inversion of cane sugar', o: ['pseudo first order', 'zero', 'second', 'third'], a: 0, e: 'Excess water.' }, { q: 'ln[A] vs t straight for', o: ['first order', 'zero', 'second', 'all'], a: 0, e: 'Integrated.' },
      { q: '10 K rise typically', o: ['doubles rate', 'halves', 'no change', '10×'], a: 0, e: 'Rule of thumb.' }, { q: 'Zero-order t½', o: ['[A]₀/2k', '0.693/k', 'constant', '1/k'], a: 0, e: '∝ [A]₀.' },
      { q: 'Effective collisions need', o: ['energy ≥ Ea and orientation', 'only energy', 'only orientation', 'catalyst'], a: 0, e: 'Collision theory.' }
    ],
    teach: {
      outcomes: ['Write rate laws and find order', 'Use integrated rate equations', 'Apply Arrhenius equation'],
      periods: [{ t: 'Rate laws', flow: [['10 min', 'Iodine clock demo.'], ['15 min', 'Initial-rate data table.'], ['15 min', 'Explore panel 1.']] }, { t: 'Temperature', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Ea problems.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Order = stoichiometric coefficients.', 'Catalyst increases yield.'], activities: ['Thiosulphate cross experiment.', 'Plot log k vs 1/T.'],
      exit: ['t½ first.', 'Units of k.', 'Arrhenius.'], homework: 'Find order and k from initial-rate data.'
    },
    slides: [{ t: 'Chemical Kinetics', b: ['Rate and rate law', 'Order vs molecularity', 'Integrated equations', 'Arrhenius and catalysts'] }, { t: 'Think and share', b: ['Why is food refrigerated?', 'Why is radioactive decay first order?'] }],
    fs: { groups: [['Rate law', [['Rate', 'k[A]^x[B]^y'], ['Order', 'x + y'], ['Molecularity', '1–3']]], ['Integrated', [['Zero', '[A]₀ − kt'], ['First', '(2.303/t) log(A₀/A)'], ['t½', '0.693/k, [A]₀/2k']]], ['Temperature', [['Arrhenius', 'Ae^(−Ea/RT)'], ['Two-T', 'log k₂/k₁ = Ea/2.303R (1/T₁−1/T₂)'], ['Catalyst', 'lowers Ea']]]],
      ex: [['k 0.0693 s⁻¹', 't½ 10 s'], ['×2 at 300→310 K', 'Ea ≈ 53.6 kJ/mol']], rem: ['Order experimental.', 'First-order t½ fixed.', 'Catalyst ≠ equilibrium.'] }
  });
})();
