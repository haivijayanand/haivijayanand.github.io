/*
TOOL:    class11_chemistry_ch04
FAMILY:  CBSE_REVISION / Class 11 Chemistry (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Unit 4 Chemical Bonding and Molecular Structure (Kossel–Lewis, octet rule, ionic bond, lattice enthalpy, covalent bond, formal charge, bond parameters, resonance, dipole moment, VSEPR, valence bond theory, hybridisation, MO theory, bond order, hydrogen bonding) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const VS = [['BeCl₂', 2, 0, 'linear', '180°', 'sp'], ['BF₃', 3, 0, 'trigonal planar', '120°', 'sp²'], ['CH₄', 4, 0, 'tetrahedral', '109.5°', 'sp³'], ['NH₃', 3, 1, 'trigonal pyramidal', '107°', 'sp³'], ['H₂O', 2, 2, 'bent (V-shape)', '104.5°', 'sp³'], ['PCl₅', 5, 0, 'trigonal bipyramidal', '90°, 120°', 'sp³d'], ['SF₆', 6, 0, 'octahedral', '90°', 'sp³d²'], ['XeF₂', 2, 3, 'linear', '180°', 'sp³d'], ['ClF₃', 3, 2, 'T-shaped', '≈ 87.5°', 'sp³d'], ['SF₄', 4, 1, 'see-saw', '≈ 102°, 173°', 'sp³d']];
  const MO = [['H₂', 2, 0, 1, 'diamagnetic'], ['He₂', 2, 2, 0, '—'], ['N₂', 10, 4, 3, 'diamagnetic'], ['O₂', 10, 6, 2, 'paramagnetic (2 unpaired)'], ['O₂⁺', 10, 5, 2.5, 'paramagnetic'], ['O₂⁻', 10, 7, 1.5, 'paramagnetic'], ['F₂', 10, 8, 1, 'diamagnetic'], ['C₂', 8, 4, 2, 'diamagnetic']];
  G9.register({
    no: 4, part: 'Part I', short: 'Bonding', title: 'Chemical Bonding and Molecular Structure',
    blurb: 'Kossel–Lewis approach and the octet rule (and its limits); ionic bonds and lattice enthalpy; covalent bonds, Lewis structures and formal charge; bond length, angle, enthalpy and order; resonance; polarity and dipole moment; VSEPR shapes; valence bond theory and overlap (σ, π); hybridisation (sp, sp², sp³, sp³d, sp³d²); molecular orbital theory for homonuclear diatomics; hydrogen bonding.',
    revise: {
      oneLine: 'VSEPR: electron pairs (bond pairs + lone pairs) repel and spread out; repulsion lp–lp > lp–bp > bp–bp, so lone pairs shrink bond angles (CH₄ 109.5° > NH₃ 107° > H₂O 104.5°). Hybridisation follows steric number: 2 sp, 3 sp², 4 sp³, 5 sp³d, 6 sp³d². MO theory: bond order = ½(N_b − N_a); higher bond order → shorter, stronger bond; unpaired electrons → paramagnetic (O₂). Formal charge = V − L − ½S. Dipole moment μ = q × d; symmetric molecules (CO₂, BF₃, CH₄) have μ = 0.',
      sections: [
        { h: 'Octet exceptions', html: `<p>Incomplete octet (BeCl₂, BF₃), odd electrons (NO, NO₂), expanded octet (PCl₅, SF₆, H₂SO₄).</p>` },
        { h: 'σ and π', html: `<p>Single bond: σ. Double: σ + π. Triple: σ + 2π. σ bonds from head-on overlap are stronger than π (sideways).</p>` },
        { h: 'Hydrogen bonds', html: `<p>H attached to F, O or N attracts a lone pair of another such atom. Explains high boiling point of water and HF; intramolecular H-bond in o-nitrophenol lowers its boiling point.</p>` }
      ],
      formulas: [['Bond order (MO)', '½(N_b − N_a)'], ['Formal charge', 'V − L − ½S'], ['Dipole', 'μ = q × d (debye)'], ['Repulsion', 'lp–lp > lp–bp > bp–bp'], ['Steric number → hybrid', '2 sp, 3 sp², 4 sp³, 5 sp³d, 6 sp³d²']],
      terms: [['Lattice enthalpy', 'energy to separate 1 mol of ionic solid into gaseous ions'], ['Resonance', 'actual structure is a hybrid of canonical forms'], ['Hybridisation', 'mixing of atomic orbitals to form equivalent hybrids']],
      traps: ['Shape ignores lone pairs; geometry of electron pairs includes them.', 'O₂ is paramagnetic though its Lewis structure shows all pairs.', 'Bond order 0 means no stable molecule (He₂).'],
      bridge: '<p>Units 8–9 (organic) rely on hybridisation and resonance.</p>'
    },
    explore: [
      { title: 'VSEPR shape finder', intro: 'Choose a molecule. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'molecule', VS.map(v => v[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { const v = VS[k]; rd.innerHTML = `<b>${v[0]}</b>: ${v[1]} bond pairs + ${v[2]} lone pairs → steric number ${v[1] + v[2]} → <b>${v[5]}</b> · shape: <b>${v[3]}</b> · angle ${v[4]}`; } const step = () => { k = (k + 1) % VS.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'MO bond order', intro: 'Choose a species.',
        build(el, K) { let k = 3; const row = K.row(el); const s = K.select(row, 'species', MO.map(m => m[0]), i => { k = i; draw(); }); s.value = 3; const rd = K.read(el); function draw() { const m = MO[k]; rd.innerHTML = `<b>${m[0]}</b>: bonding ${m[1]}, antibonding ${m[2]} → bond order ½(${m[1]} − ${m[2]}) = <b>${m[3]}</b> · ${m[4]} · ${m[3] === 0 ? 'does not exist as a stable molecule' : 'higher order → shorter, stronger bond'}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Shape', gen(R) { const v = R.pick(VS); return { q: `Shape and hybridisation of ${v[0]}?`, a: `${v[3]}, ${v[5]}` }; } },
      { title: 'Bond order', gen(R) { const m = R.pick(MO.filter(x => x[3] > 0)); return { q: `Bond order of ${m[0]}? Magnetic nature?`, a: `${m[3]}; ${m[4]}`, ans: m[3] }; } },
      { title: 'Polarity', gen(R) { return G9.S9.groupQ(R, [['CO₂', 0], ['H₂O', 1], ['BF₃', 0], ['NH₃', 1], ['CH₄', 0], ['CHCl₃', 1]], ['non-polar (μ = 0)', 'polar'], 'Dipole moment of '); } },
      { title: 'σ and π', gen(R) { const M = [['C₂H₄', 5, 1], ['C₂H₂', 3, 2], ['CO₂', 2, 2], ['N₂', 1, 2], ['HCN', 2, 2], ['C₂H₆', 7, 0]]; const m = R.pick(M); return { q: `Number of σ and π bonds in ${m[0]}?`, a: `${m[1]} σ, ${m[2]} π`, ans: m[1] }; } },
      { title: 'Concepts', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why is H₂O bent with 104.5°?', 'two lone pairs compress the bond angle'], ['Why is water’s boiling point high?', 'hydrogen bonding'], ['Why is O₂ paramagnetic?', 'two unpaired electrons in π* orbitals'], ['Formal charge on N in NH₄⁺?', '+1'], ['Why does BF₃ have zero dipole?', 'symmetric trigonal planar; bond dipoles cancel']]); } }
    ],
    quiz: [
      { q: 'CH₄ hybridisation', o: ['sp³', 'sp²', 'sp', 'sp³d'], a: 0, e: '4 pairs.' }, { q: 'NH₃ shape', o: ['trigonal pyramidal', 'planar', 'tetrahedral', 'bent'], a: 0, e: '1 lone pair.' },
      { q: 'O₂ bond order', o: ['2', '1', '3', '2.5'], a: 0, e: '(10−6)/2.' }, { q: 'Paramagnetic', o: ['O₂', 'N₂', 'F₂', 'H₂'], a: 0, e: 'Unpaired.' },
      { q: 'SF₆ shape', o: ['octahedral', 'tetrahedral', 'trigonal bipyramidal', 'square planar'], a: 0, e: 'sp³d².' }, { q: 'Strongest repulsion', o: ['lp–lp', 'lp–bp', 'bp–bp', 'all equal'], a: 0, e: 'VSEPR.' },
      { q: 'μ = 0', o: ['CO₂', 'H₂O', 'NH₃', 'HCl'], a: 0, e: 'Linear symmetric.' }, { q: 'C₂H₂ π bonds', o: ['2', '1', '3', '0'], a: 0, e: 'Triple.' },
      { q: 'He₂ bond order', o: ['0', '1', '0.5', '2'], a: 0, e: 'No bond.' }, { q: 'H-bond strongest with', o: ['F', 'Cl', 'S', 'C'], a: 0, e: 'Electronegative.' },
      { q: 'Expanded octet', o: ['PCl₅', 'CH₄', 'NH₃', 'H₂O'], a: 0, e: '10 electrons.' }
    ],
    teach: {
      outcomes: ['Draw Lewis structures and formal charges', 'Predict shapes with VSEPR and hybridisation', 'Use MO bond order'],
      periods: [{ t: 'Lewis and VSEPR', flow: [['10 min', 'Balloon VSEPR models.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Formal charge practice.']] }, { t: 'VBT and MOT', flow: [['15 min', 'Hybridisation drills.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Lone pairs don’t affect shape.', 'All double bonds equal two σ.'], activities: ['Balloon models.', 'Magnet test of liquid O₂ (video).'],
      exit: ['Shapes of 3 molecules.', 'Bond order of O₂.', 'σ/π count.'], homework: 'Make a table of 10 molecules: steric number, hybridisation, shape, angle, polarity.'
    },
    slides: [{ t: 'Chemical Bonding', b: ['Ionic and covalent bonds', 'VSEPR shapes', 'Hybridisation', 'MO theory and H-bonding'] }, { t: 'Think and share', b: ['Why is O₂ magnetic?', 'Why 104.5° in water?'] }],
    fs: { groups: [['VSEPR', [['2/3/4', 'linear / trigonal / tetrahedral'], ['5/6', 'TBP / octahedral'], ['Lone pairs', 'shrink angles']]], ['Hybrid', [['sp', '180°'], ['sp²', '120°'], ['sp³', '109.5°'], ['sp³d, sp³d²', 'TBP, octahedral']]], ['MOT', [['Bond order', '½(N_b − N_a)'], ['O₂', '2, paramagnetic'], ['N₂', '3']]]],
      ex: [['H₂O', 'sp³, bent, 104.5°'], ['O₂⁻', 'BO 1.5']], rem: ['Count steric number.', 'lp–lp strongest.', 'Unpaired → paramagnetic.'] }
  });
})();
