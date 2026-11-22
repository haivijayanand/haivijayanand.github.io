/*
TOOL:    class12_chemistry_ch01
FAMILY:  CBSE_REVISION / Class 12 Chemistry (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Unit 1 Solutions (types, concentration terms, solubility, Henry’s law, vapour pressure, Raoult’s law, ideal and non-ideal solutions, azeotropes, colligative properties, molar mass, van’t Hoff factor) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 1, part: 'Part I', short: 'Solutions', title: 'Solutions',
    blurb: 'Types of solutions; concentration — mass %, ppm, mole fraction, molarity, molality; solubility of solids and gases (Henry’s law); vapour pressure of liquid solutions and Raoult’s law; ideal and non-ideal solutions (positive and negative deviations, azeotropes); colligative properties — relative lowering of vapour pressure, elevation of boiling point, depression of freezing point, osmotic pressure; reverse osmosis; abnormal molar masses and the van’t Hoff factor.',
    revise: {
      oneLine: 'Molarity M = mol solute / L solution (changes with temperature); molality m = mol solute / kg solvent (does not). Henry’s law p = K_H x (higher K_H = lower solubility). Raoult’s law p_A = p_A° x_A. Colligative properties depend on the number of solute particles: Δp/p° = x_B, ΔT_b = i K_b m, ΔT_f = i K_f m, π = i CRT. Ideal solutions obey Raoult’s law (ΔH_mix = 0, ΔV_mix = 0); positive deviation (ethanol + water) gives minimum-boiling azeotropes; negative deviation (HNO₃ + water) gives maximum-boiling azeotropes. i > 1 for dissociation, i < 1 for association.',
      sections: [
        { h: 'Henry’s law uses', html: '<p>Soda bottles sealed under high CO₂ pressure; scuba divers get bends (N₂ bubbles) — tanks use He-diluted air; at altitude low O₂ causes anoxia.</p>' },
        { h: 'Osmosis', html: '<p>Isotonic solutions have equal π. RBCs swell in hypotonic and shrink in hypertonic solutions. Reverse osmosis (pressure > π) desalinates water.</p>' },
        { h: 'Why molality for ΔT', html: '<p>Mass-based, independent of temperature.</p>' }
      ],
      formulas: [['Molarity', 'n/V(L)'], ['Molality', 'n/kg solvent'], ['Henry', 'p = K_H x'], ['Raoult', 'p_A = p_A° x_A'], ['ΔT_b', 'i K_b m'], ['ΔT_f', 'i K_f m'], ['Osmotic', 'π = i CRT']],
      terms: [['Colligative', 'depends on number of particles, not nature'], ['Azeotrope', 'constant-boiling mixture'], ['van’t Hoff factor', 'observed/normal colligative property']],
      traps: ['Molarity changes with temperature; molality does not.', 'NaCl gives i ≈ 2; acetic acid in benzene i ≈ ½.', 'Osmotic pressure is best for molar mass of polymers/proteins.'],
      bridge: '<p>Unit 2 uses ionic solutions to carry current.</p>'
    },
    explore: [
      { title: 'Colligative calculator', intro: 'Dissolve a solute in water.',
        build(el, K) { const S = [['glucose', 180, 1], ['urea', 60, 1], ['NaCl', 58.5, 2], ['CaCl₂', 111, 3], ['K₄[Fe(CN)₆]', 368, 5]]; let k = 0, w = 18, W = 1000; const row = K.row(el); K.select(row, 'solute (ideal i)', S.map(s => `${s[0]} (i = ${s[2]})`), i => { k = i; draw(); }); K.slider(row, 'mass solute (g)', 1, 200, 1, w, v => { w = v; draw(); }); K.slider(row, 'water (g)', 100, 2000, 50, W, v => { W = v; draw(); }); const rd = K.read(el);
          function draw() { const [n, M, i] = S[k], mol = w / M, m = mol / (W / 1000), Tb = i * 0.52 * m, Tf = i * 1.86 * m, pi = i * m * 0.0821 * 298; rd.innerHTML = `${f(mol)} mol in ${W} g → molality <b>${f(m)} m</b> · ΔT_b = iK_bm = <b>${f(Tb)} K</b> (bp ${f(100 + Tb)} °C) · ΔT_f = iK_fm = <b>${f(Tf)} K</b> (fp ${f(-Tf)} °C) · π ≈ iCRT ≈ <b>${f(pi)} atm</b> at 25 °C (C ≈ m)`; } draw(); return null; } },
      { title: 'Raoult’s law diagram', intro: 'Two volatile liquids; vary mole fraction of A.',
        build(el, K) { let pA = 80, pB = 30, x = 0.5; const row = K.row(el); K.slider(row, 'p_A° (kPa)', 10, 100, 1, pA, v => { pA = v; b.redraw(); }); K.slider(row, 'p_B° (kPa)', 10, 100, 1, pB, v => { pB = v; b.redraw(); }); K.slider(row, 'x_A', 0, 1, 0.01, x, v => { x = v; b.redraw(); }); const b = new K.Board(el, { xmin: -20, xmax: 220, ymin: -10, ymax: 110, axes: false, grid: 0, aspect: 0.45 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.line(0, 0, 200, 0, { color: C.ink, w: 1 }); b.line(0, 0, 0, 100, { color: C.ink, w: 1 }); b.line(200, 0, 200, 100, { color: C.ink, w: 1 }); b.line(0, pB, 200, pA, { color: C.purple, w: 3 }); b.line(0, 0, 200, pA, { color: C.blue, w: 2 }); b.line(0, pB, 200, 0, { color: C.orange, w: 2 }); b.line(x * 200, 0, x * 200, 100, { color: C.grey, w: 1, dash: [4, 4] }); b.text(100, -6, 'x_A →', { font: '12px' });
            const a = pA * x, bb = pB * (1 - x), P = a + bb; rd.innerHTML = `p_A = <b>${f(a)}</b> (blue) · p_B = <b>${f(bb)}</b> (orange) · total P = <b>${f(P)} kPa</b> (purple) · vapour mole fraction y_A = ${f(a / P)} — vapour richer in the more volatile liquid`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Molarity / molality', gen(R) { const w = R.pick([4, 10, 20, 40]), M = R.pick([40, 58.5, 180]), V = R.pick([250, 500, 1000]); return R.chance(.5) ? { q: `${w} g of solute (M = ${M}) in ${V} mL solution. Molarity?`, a: `${f(w / M / (V / 1000))} M`, ans: w / M / (V / 1000), tol: 1e-3 } : { q: `${w} g of solute (M = ${M}) in ${V} g water. Molality?`, a: `${f(w / M / (V / 1000))} m`, ans: w / M / (V / 1000), tol: 1e-3 }; } },
      { title: 'Raoult', gen(R) { const pA = R.pick([100, 80, 60]), pB = R.pick([40, 20, 30]), x = R.pick([0.2, 0.4, 0.6]); const P = pA * x + pB * (1 - x); return { q: `p_A° = ${pA} kPa, p_B° = ${pB} kPa, x_A = ${x}. Total vapour pressure?`, a: `${f(P)} kPa`, ans: P, tol: 1e-3 }; } },
      { title: 'ΔT_f', gen(R) { const m = R.pick([0.1, 0.2, 0.5]), i = R.pick([1, 2, 3]); return { q: `Molality ${m}, i = ${i}, K_f (water) = 1.86 K kg/mol. Freezing point depression?`, a: `${f(i * 1.86 * m)} K`, ans: i * 1.86 * m, tol: 1e-4 }; } },
      { title: 'Molar mass', levels: [2, 3], gen(R) { const M = R.pick([60, 180, 342]), w = R.pick([1, 2, 5]), W = R.pick([50, 100]); const Tb = 0.52 * w * 1000 / (M * W); return { q: `${w} g of non-electrolyte in ${W} g water raises bp by ${f(Tb)} K (K_b = 0.52). Molar mass?`, a: `${M} g/mol`, ans: M, tol: 0.5 }; } },
      { title: 'Concepts', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Type of deviation for ethanol + water?', 'positive (minimum-boiling azeotrope)'], ['i for complete dissociation of K₂SO₄?', '3'], ['Why do divers use helium-diluted air?', 'N₂ solubility rises with pressure (Henry) → bends'], ['RBC in 0.5% saline (hypotonic)?', 'swells and may burst']]); } }
    ],
    quiz: [
      { q: 'Temperature-independent unit', o: ['molality', 'molarity', 'normality', 'g/L'], a: 0, e: 'Mass based.' }, { q: 'Raoult’s law', o: ['p_A = p_A° x_A', 'p = K_H x', 'π = CRT', 'ΔT = Km'], a: 0, e: 'Vapour pressure.' },
      { q: 'Henry’s law', o: ['p = K_H x', 'p = x', 'p = nRT', 'K = x'], a: 0, e: 'Gases.' }, { q: 'i for NaCl (ideal)', o: ['2', '1', '3', '½'], a: 0, e: 'Two ions.' },
      { q: 'Negative deviation example', o: ['HNO₃ + water', 'ethanol + water', 'acetone + CS₂', 'benzene + toluene'], a: 0, e: 'Max-boiling azeotrope.' }, { q: 'Best for polymer molar mass', o: ['osmotic pressure', 'ΔT_b', 'ΔT_f', 'Δp'], a: 0, e: 'Large value at room T.' },
      { q: 'Ideal solution', o: ['ΔH_mix = 0', 'ΔH_mix > 0', 'ΔV_mix > 0', 'azeotrope'], a: 0, e: 'Obeys Raoult.' }, { q: 'Association gives i', o: ['< 1', '> 1', '= 1', '= 0'], a: 0, e: 'Fewer particles.' },
      { q: 'Reverse osmosis needs pressure', o: ['> π', '< π', '= π', 'zero'], a: 0, e: 'Push water back.' }, { q: 'K_f of water', o: ['1.86', '0.52', '5.12', '1'], a: 0, e: 'K kg/mol.' },
      { q: 'Colligative depends on', o: ['number of particles', 'nature', 'colour', 'mass only'], a: 0, e: 'Definition.' }
    ],
    teach: {
      outcomes: ['Use concentration terms', 'Apply Henry’s and Raoult’s laws', 'Solve colligative property problems'],
      periods: [{ t: 'Concentration and laws', flow: [['10 min', 'Soda bottle opening.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Concentration drills.']] }, { t: 'Colligative properties', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Molar mass problems.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Colligative depends on identity.', 'Molarity and molality are equal always.'], activities: ['Salt raising boiling point.', 'Egg osmosis demo.'],
      exit: ['ΔT_f formula.', 'Raoult law.', 'i value.'], homework: 'Find molar mass of a solute from given ΔT_f data.'
    },
    slides: [{ t: 'Solutions', b: ['Concentration terms', 'Henry and Raoult', 'Ideal vs non-ideal', 'Colligative properties'] }, { t: 'Think and share', b: ['Why salt on icy roads?', 'Why do fish die in warm water?'] }],
    fs: { groups: [['Concentration', [['M', 'mol/L soln'], ['m', 'mol/kg solvent'], ['x', 'n/n_total']]], ['Laws', [['Henry', 'p = K_H x'], ['Raoult', 'p_A = p_A° x_A'], ['Deviation', '+ min-bp, − max-bp azeotrope']]], ['Colligative', [['Δp/p°', 'x_B'], ['ΔT', 'iKm'], ['π', 'iCRT']]]],
      ex: [['0.2 m, i 2', 'ΔT_f 0.744 K'], ['100/40 kPa, x 0.4', 'P 64 kPa']], rem: ['Molality for ΔT.', 'Count ions.', 'π for polymers.'] }
  });
})();
