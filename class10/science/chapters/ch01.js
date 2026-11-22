/*
TOOL:    class10_science_ch01
FAMILY:  CBSE_REVISION / Class 10 Science (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 1 Chemical Reactions and Equations (word and balanced equations, combination, decomposition, displacement, double displacement, redox, corrosion, rancidity) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const RX = [['2Mg + O₂ → 2MgO', 0], ['CaCO₃ → CaO + CO₂', 1], ['Fe + CuSO₄ → FeSO₄ + Cu', 2], ['Na₂SO₄ + BaCl₂ → BaSO₄↓ + 2NaCl', 3], ['CaO + H₂O → Ca(OH)₂', 0], ['2H₂O → 2H₂ + O₂ (electrolysis)', 1], ['Zn + 2HCl → ZnCl₂ + H₂', 2], ['AgNO₃ + KCl → AgCl↓ + KNO₃', 3], ['2AgCl → 2Ag + Cl₂ (sunlight)', 1], ['2Pb(NO₃)₂ → 2PbO + 4NO₂ + O₂', 1]];
  const TY = ['combination', 'decomposition', 'displacement', 'double displacement'];
  G9.register({
    no: 1, part: 'All chapters', short: 'Reactions', title: 'Chemical Reactions and Equations',
    blurb: 'Observations that signal a reaction; writing and balancing chemical equations with state symbols; combination, decomposition (thermal, electrolytic, photolytic), displacement and double displacement reactions; precipitation; oxidation and reduction (redox); exothermic and endothermic reactions; corrosion and rancidity.',
    revise: {
      oneLine: 'A balanced equation has equal numbers of each atom on both sides (law of conservation of mass). Types: combination (A + B → AB), decomposition (AB → A + B, by heat, electricity or light), displacement (a more reactive metal displaces a less reactive one), double displacement (ions exchange, often a precipitate). Oxidation is gain of oxygen/loss of hydrogen; reduction is the reverse; they occur together (redox). Corrosion (rusting) and rancidity (oxidation of fats) are everyday oxidation effects.',
      sections: [
        { h: 'Balancing', html: `<p>Count atoms; balance the most complex molecule first; leave H and O for last; never change subscripts. Add states (s), (l), (g), (aq).</p>` },
        { h: 'Redox', html: `<p>CuO + H₂ → Cu + H₂O: CuO is reduced, H₂ is oxidised; H₂ is the reducing agent, CuO the oxidising agent.</p>` },
        { h: 'Exo / endo', html: `<p>Respiration, burning, CaO + water: exothermic. Decomposition reactions usually need energy: endothermic.</p>` }
      ],
      formulas: [['Combination', 'A + B → AB'], ['Decomposition', 'AB → A + B'], ['Displacement', 'A + BC → AC + B'], ['Double displacement', 'AB + CD → AD + CB'], ['Oxidation', '+O or −H'], ['Reduction', '−O or +H']],
      terms: [['Precipitate', 'insoluble solid formed in solution'], ['Corrosion', 'metal attacked by air, moisture, acids'], ['Rancidity', 'oxidation of fats and oils in food']],
      traps: ['Never change subscripts to balance.', 'Fe displaces Cu, not the other way.', 'Oxidation and reduction always occur together.'],
      bridge: '<p>Ch 2–4 apply these reaction types; Class 11 treats redox by electron transfer.</p>'
    },
    explore: [
      { title: 'Balance-check tool', intro: 'Pick a coefficient for each species of H₂ + O₂ → H₂O, and see atoms on each side.',
        build(el, K) { let a = 1, b2 = 1, c = 1; const row = K.row(el); K.slider(row, 'H₂', 1, 4, 1, a, v => { a = v; draw(); }); K.slider(row, 'O₂', 1, 4, 1, b2, v => { b2 = v; draw(); }); K.slider(row, 'H₂O', 1, 4, 1, c, v => { c = v; draw(); }); const rd = K.read(el);
          function draw() { const HL = 2 * a, OL = 2 * b2, HR = 2 * c, OR = c; const ok = HL === HR && OL === OR; const g = (x, y) => y ? g(y, x % y) : x; const simplest = g(g(a, b2), c) === 1; rd.innerHTML = `${a > 1 ? a : ''}H₂ + ${b2 > 1 ? b2 : ''}O₂ → ${c > 1 ? c : ''}H₂O<br>left: H ${HL}, O ${OL} · right: H ${HR}, O ${OR} → <b>${ok ? (simplest ? 'BALANCED ✓' : 'balanced, but reduce to lowest whole numbers') : 'not balanced'}</b>`; } draw(); return null; } },
      { title: 'Reaction type sorter', intro: 'Sort these reactions.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: TY.map(t => t[0].toUpperCase() + t.slice(1)), items: RX.map(r => [r[0], r[1]]) }); } }
    ],
    gens: [
      { title: 'Type', gen(R) { const r = R.pick(RX); return { q: `Type of reaction: ${r[0]}`, a: TY[r[1]] }; } },
      { title: 'Balance', gen(R) { return G9.S9.pickQ(R, [['Balance: Fe + H₂O → Fe₃O₄ + H₂', '3Fe + 4H₂O → Fe₃O₄ + 4H₂'], ['Balance: Na + H₂O → NaOH + H₂', '2Na + 2H₂O → 2NaOH + H₂'], ['Balance: Al + O₂ → Al₂O₃', '4Al + 3O₂ → 2Al₂O₃'], ['Balance: CH₄ + O₂ → CO₂ + H₂O', 'CH₄ + 2O₂ → CO₂ + 2H₂O'], ['Balance: KClO₃ → KCl + O₂', '2KClO₃ → 2KCl + 3O₂']]); } },
      { title: 'Redox', gen(R) { return G9.S9.pickQ(R, [['In CuO + H₂ → Cu + H₂O, which is oxidised?', 'H₂ (gains oxygen)'], ['In ZnO + C → Zn + CO, which is reduced?', 'ZnO (loses oxygen)'], ['Oxidising agent in CuO + H₂ → Cu + H₂O?', 'CuO'], ['Is rusting oxidation or reduction?', 'oxidation']]); } },
      { title: 'Mass conservation', levels: [2, 3], gen(R) { const a = R.int(10, 60), b = R.int(5, 40), c = R.int(2, Math.min(a, b)); return { q: `${a} g of A reacts with ${b} g of B to give ${a + b - c} g of C and some D. Mass of D?`, a: `${c} g`, ans: c }; } },
      { title: 'Everyday', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why is chips packet filled with nitrogen?', 'prevents oxidation (rancidity)'], ['Why does silver turn black?', 'reacts with sulphur compounds — silver sulphide'], ['Why does copper turn green?', 'basic copper carbonate forms (corrosion)'], ['Why is decomposition of AgCl used in photography?', 'light decomposes it to silver']]); } }
    ],
    quiz: [
      { q: 'CaCO₃ → CaO + CO₂', o: ['decomposition', 'combination', 'displacement', 'neutralisation'], a: 0, e: 'Breaks.' }, { q: 'Fe + CuSO₄', o: ['displacement', 'combination', 'decomposition', 'no reaction'], a: 0, e: 'Fe more reactive.' },
      { q: 'White precipitate BaSO₄ forms in', o: ['double displacement', 'combination', 'decomposition', 'redox only'], a: 0, e: 'Exchange.' }, { q: 'Oxidation is', o: ['gain of oxygen', 'loss of oxygen', 'gain of hydrogen', 'none'], a: 0, e: '+O.' },
      { q: 'CaO + H₂O is', o: ['exothermic combination', 'endothermic', 'decomposition', 'displacement'], a: 0, e: 'Hot.' }, { q: 'Rancidity prevented by', o: ['nitrogen packing', 'sunlight', 'adding water', 'warming'], a: 0, e: 'No O₂.' },
      { q: 'Electrolysis of water gives H₂ : O₂', o: ['2 : 1', '1 : 2', '1 : 1', '3 : 1'], a: 0, e: 'Volume.' }, { q: 'Cu + FeSO₄', o: ['no reaction', 'displacement', 'precipitate', 'explosion'], a: 0, e: 'Cu less reactive.' },
      { q: 'Balanced: _Al + _O₂ → 2Al₂O₃', o: ['4, 3', '2, 3', '4, 6', '2, 1'], a: 0, e: 'Count.' }, { q: 'Photolytic decomposition', o: ['2AgBr → 2Ag + Br₂', 'CaCO₃ heat', 'H₂O electrolysis', 'Mg burning'], a: 0, e: 'Light.' },
      { q: 'Respiration is', o: ['exothermic', 'endothermic', 'displacement', 'none'], a: 0, e: 'Releases energy.' }
    ],
    teach: {
      outcomes: ['Write and balance equations', 'Classify reaction types', 'Identify redox and everyday effects'],
      periods: [{ t: 'Equations', flow: [['10 min', 'Mg ribbon burn demo.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Balancing practice.']] }, { t: 'Types', flow: [['15 min', 'Fe + CuSO₄, BaCl₂ + Na₂SO₄ demos.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Change subscripts to balance.', 'Any metal displaces any other.'], activities: ['Nail in copper sulphate.', 'Precipitation test tubes.'],
      exit: ['Balance one equation.', 'Four types with examples.', 'Oxidised vs reduced.'], homework: 'Balance 10 given equations and classify each.'
    },
    slides: [{ t: 'Chemical Reactions and Equations', b: ['Balancing', 'Reaction types', 'Redox', 'Corrosion and rancidity'] }, { t: 'Think and share', b: ['Why nitrogen in chip packets?', 'Which is reduced in CuO + H₂?'] }],
    fs: { groups: [['Types', [['Combination', 'A + B → AB'], ['Decomposition', 'heat, electricity, light'], ['Displacement', 'more reactive wins'], ['Double displacement', 'ions swap, precipitate']]], ['Redox', [['Oxidation', '+O / −H'], ['Reduction', '−O / +H'], ['Agents', 'oxidising, reducing']]], ['Effects', [['Corrosion', 'rusting'], ['Rancidity', 'fat oxidation']]]],
      ex: [['4Al + 3O₂ → 2Al₂O₃', 'balanced'], ['CuO + H₂', 'CuO reduced']], rem: ['Balance atoms, not subscripts.', 'Add state symbols.', 'Redox go together.'] }
  });
})();
