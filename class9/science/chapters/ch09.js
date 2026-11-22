/*
TOOL:    class9_science_ch09
FAMILY:  CBSE_REVISION / Class 9 Science (Exploration)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 9 Atomic Foundations of Matter (Dalton’s theory, laws of chemical combination, atoms and molecules, symbols, ions, valency and chemical formulae, molecular mass, mole concept, Avogadro number) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toFixed(3)).toString();
  const AM = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, S: 32, Cl: 35.5, Ca: 40, Al: 27, K: 39 };
  const MOL = [['H₂O', { H: 2, O: 1 }], ['CO₂', { C: 1, O: 2 }], ['NH₃', { N: 1, H: 3 }], ['NaCl', { Na: 1, Cl: 1 }], ['CaCO₃', { Ca: 1, C: 1, O: 3 }], ['H₂SO₄', { H: 2, S: 1, O: 4 }], ['CH₄', { C: 1, H: 4 }], ['MgO', { Mg: 1, O: 1 }], ['Al₂O₃', { Al: 2, O: 3 }], ['C₆H₁₂O₆', { C: 6, H: 12, O: 6 }]];
  const mm = c => Object.entries(c).reduce((s, [e, n]) => s + AM[e] * n, 0);
  G9.register({
    no: 9, part: 'All chapters', short: 'Atoms and moles', title: 'Atomic Foundations of Matter',
    blurb: 'Laws of conservation of mass and constant proportions; Dalton’s atomic theory; atoms, molecules and ions; symbols and atomicity; writing chemical formulae with valency (criss-cross); molecular and formula unit mass; the mole, Avogadro’s number and molar mass.',
    revise: {
      oneLine: 'Mass is neither created nor destroyed in a reaction, and a compound always contains the same elements in the same mass ratio (water: H : O = 1 : 8). Atoms combine as molecules or ions; formulae come from valencies (Al³⁺ and O²⁻ → Al₂O₃). Molecular mass = sum of atomic masses. One mole = 6.022 × 10²³ particles; molar mass in grams equals the molecular mass in u; moles = mass ÷ molar mass.',
      sections: [
        { h: 'Dalton', html: `<p>Matter is made of indivisible atoms; atoms of an element are identical; atoms combine in small whole-number ratios; atoms are neither created nor destroyed in reactions. (Later we found atoms do have parts.)</p>` },
        { h: 'Formulae', html: `<p>Write symbols with valencies, cross them over, simplify: Ca²⁺ + Cl⁻ → CaCl₂; NH₄⁺ + SO₄²⁻ → (NH₄)₂SO₄.</p>` },
        { h: 'Mole', html: `<p>18 g of water = 1 mol = 6.022 × 10²³ molecules. Number of particles = moles × Nₐ.</p>` }
      ],
      formulas: [['Moles', 'n = mass ÷ molar mass'], ['Particles', 'N = n × 6.022 × 10²³'], ['Molar mass H₂O', '18 g/mol'], ['Water H : O', '1 : 8 by mass'], ['Conservation', 'mass reactants = mass products']],
      terms: [['Atomicity', 'atoms in one molecule (O₂ = 2, O₃ = 3)'], ['Ion', 'charged atom or group'], ['Mole', 'amount with 6.022 × 10²³ particles']],
      traps: ['Molar mass has units g/mol; molecular mass in u.', 'Polyatomic ions in brackets when more than one.', 'Divide by molar mass, not multiply, to get moles.'],
      bridge: '<p>Class 10 balances equations; Class 11 uses moles everywhere.</p>'
    },
    explore: [
      { title: 'Molar mass and moles', intro: 'Choose a substance and a mass; see molar mass, moles and number of molecules.',
        build(el, K) { let k = 0, m = 36; const row = K.row(el); K.select(row, 'substance', MOL.map(x => x[0]), i => { k = i; draw(); }); K.slider(row, 'mass (g)', 1, 500, 1, m, v => { m = v; draw(); }); const rd = K.read(el);
          function draw() { const [nm, c] = MOL[k]; const M = mm(c); const n = m / M; const N = n * 6.022e23; const ex = Math.floor(Math.log10(N)); rd.innerHTML = `${nm}: ${Object.entries(c).map(([e, q]) => `${q > 1 ? q + '×' : ''}${e}(${AM[e]})`).join(' + ')} = <b>${M} g/mol</b> · ${m} g ÷ ${M} = <b>${f(n)} mol</b> · molecules = <b>${(N / 10 ** ex).toFixed(3)} × 10<sup>${ex}</sup></b>`; } draw(); return null; } },
      { title: 'Criss-cross formula maker', intro: 'Choose a cation and an anion; see the formula.',
        build(el, K) { const CAT = [['Na', 1], ['K', 1], ['NH₄', 1], ['Mg', 2], ['Ca', 2], ['Cu', 2], ['Al', 3], ['Fe', 3]], AN = [['Cl', 1], ['OH', 1], ['NO₃', 1], ['O', 2], ['SO₄', 2], ['CO₃', 2], ['PO₄', 3]]; let a = 4, c = 0; const row = K.row(el); const s1 = K.select(row, 'cation', CAT.map(x => `${x[0]}${x[1] > 1 ? x[1] : ''}+`), i => { a = i; draw(); }); s1.value = 4; K.select(row, 'anion', AN.map(x => `${x[0]}${x[1] > 1 ? x[1] : ''}−`), i => { c = i; draw(); }); const rd = K.read(el); const sub = n => n === 1 ? '' : String(n).split('').map(d => '₀₁₂₃₄₅₆₇₈₉'[d]).join(''); const poly = s => s.length > 2 || /[₀-₉]/.test(s);
          function draw() { const [x, vx] = CAT[a], [y, vy] = AN[c]; const g = (p, q) => q ? g(q, p % q) : p; const d = g(vx, vy); const nx = vy / d, ny = vx / d; const X = nx > 1 && poly(x) ? `(${x})${sub(nx)}` : x + sub(nx); const Y = ny > 1 && poly(y) ? `(${y})${sub(ny)}` : y + sub(ny); rd.innerHTML = `valencies ${x}: ${vx}, ${y}: ${vy} → cross over and simplify → <b style="font-size:20px">${X}${Y}</b>`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Molecular mass', gen(R) { const [n, c] = R.pick(MOL); const M = mm(c); return { q: `Molecular mass of ${n}? (H 1, C 12, N 14, O 16, Na 23, Mg 24, Al 27, S 32, Cl 35.5, Ca 40)`, a: `${M} u`, ans: M }; } },
      { title: 'Moles from mass', gen(R) { const [n, c] = R.pick(MOL); const M = mm(c); const k = R.pick([0.5, 1, 2, 3, 5]); return { q: `How many moles in ${k * M} g of ${n}?`, a: `${k} mol`, ans: k }; } },
      { title: 'Particles', levels: [2, 3], gen(R) { const n = R.pick([0.5, 1, 2, 3, 0.25]); return { q: `Number of molecules in ${n} mol? (Nₐ = 6.022 × 10²³)`, a: `${+(n * 6.022).toFixed(3)} × 10²³`, ans: n * 6.022, tol: 0.001 }; } },
      { title: 'Constant proportion', levels: [2, 3], gen(R) { const h = R.int(2, 20); return { q: `Water has H : O = 1 : 8 by mass. How much oxygen combines with ${h} g of hydrogen?`, a: `${8 * h} g`, ans: 8 * h }; } },
      { title: 'Conservation of mass', gen(R) { const a = R.int(5, 50), b = R.int(5, 50); return { q: `${a} g of A reacts completely with ${b} g of B in a closed flask. Mass of products?`, a: `${a + b} g`, ans: a + b }; } }
    ],
    quiz: [
      { q: 'Avogadro number', o: ['6.022 × 10²³', '3 × 10⁸', '9.8', '1.6 × 10⁻¹⁹'], a: 0, e: 'Nₐ.' }, { q: 'Molar mass of H₂O', o: ['18 g/mol', '10 g/mol', '16 g/mol', '20 g/mol'], a: 0, e: '2 + 16.' },
      { q: '44 g CO₂ =', o: ['1 mol', '2 mol', '0.5 mol', '44 mol'], a: 0, e: '44/44.' }, { q: 'Formula of aluminium oxide', o: ['Al₂O₃', 'AlO', 'Al₃O₂', 'AlO₃'], a: 0, e: '3 and 2.' },
      { q: 'Law of constant proportions by', o: ['Proust', 'Dalton', 'Lavoisier', 'Bohr'], a: 0, e: 'Proust.' }, { q: 'Conservation of mass by', o: ['Lavoisier', 'Proust', 'Newton', 'Thomson'], a: 0, e: 'Lavoisier.' },
      { q: 'Atomicity of O₃', o: ['3', '2', '1', '6'], a: 0, e: 'Ozone.' }, { q: 'Calcium chloride', o: ['CaCl₂', 'CaCl', 'Ca₂Cl', 'CaCl₃'], a: 0, e: 'Ca²⁺.' },
      { q: 'H : O by mass in water', o: ['1 : 8', '2 : 1', '1 : 16', '8 : 1'], a: 0, e: '2 : 16.' }, { q: 'Moles =', o: ['mass ÷ molar mass', 'mass × molar mass', 'molar mass ÷ mass', 'Nₐ × mass'], a: 0, e: 'Formula.' },
      { q: 'Ammonium sulphate', o: ['(NH₄)₂SO₄', 'NH₄SO₄', 'NH₄(SO₄)₂', 'N₂H₈SO₄ only'], a: 0, e: 'Brackets.' }
    ],
    teach: {
      outcomes: ['State laws of chemical combination', 'Write formulae from valency', 'Use the mole concept'],
      periods: [{ t: 'Laws and formulae', flow: [['10 min', 'Closed-flask reaction mass demo.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Formula practice.']] }, { t: 'Mole', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Counting by weighing (rice grains).'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Mass lost when gas escapes (open flask).', 'Multiply by molar mass for moles.'], activities: ['Counting rice by weighing.', 'Ion cards criss-cross.'],
      exit: ['Two laws.', 'Formula of magnesium chloride.', 'Moles in 36 g water.'], homework: 'Find molar masses of 10 kitchen chemicals (salt, sugar, baking soda…).'
    },
    slides: [{ t: 'Atomic Foundations of Matter', b: ['Laws of combination', 'Atoms, molecules, ions', 'Formulae from valency', 'Mole concept'] }, { t: 'Think and share', b: ['How many molecules in 18 g of water?', 'Why Al₂O₃?'] }],
    fs: { groups: [['Laws', [['Conservation', 'mass same'], ['Constant proportion', 'fixed mass ratio']]], ['Formulae', [['Criss-cross', 'valencies swap'], ['Examples', 'CaCl₂, Al₂O₃, (NH₄)₂SO₄']]], ['Mole', [['Nₐ', '6.022 × 10²³'], ['n', 'm ÷ M'], ['H₂O', '18 g/mol']]]],
      ex: [['36 g H₂O', '2 mol'], ['2 mol', '1.2044 × 10²⁴ molecules']], rem: ['Units: u vs g/mol.', 'Simplify ratios.', 'Divide to get moles.'] }
  });
})();
