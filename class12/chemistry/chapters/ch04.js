/*
TOOL:    class12_chemistry_ch04
FAMILY:  CBSE_REVISION / Class 12 Chemistry (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Unit 4 The d- and f-Block Elements (position, electronic configuration, general properties of transition elements, KMnO4 and K2Cr2O7, lanthanoids, lanthanoid contraction, actinoids, applications) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  const T = [['Sc', 21, '3d¹4s²', 1], ['Ti', 22, '3d²4s²', 2], ['V', 23, '3d³4s²', 3], ['Cr', 24, '3d⁵4s¹', 6], ['Mn', 25, '3d⁵4s²', 5], ['Fe', 26, '3d⁶4s²', 4], ['Co', 27, '3d⁷4s²', 3], ['Ni', 28, '3d⁸4s²', 2], ['Cu', 29, '3d¹⁰4s¹', 1], ['Zn', 30, '3d¹⁰4s²', 0]];
  const ION = [['Sc³⁺', 0], ['Ti³⁺', 1], ['V³⁺', 2], ['Cr³⁺', 3], ['Mn²⁺', 5], ['Fe³⁺', 5], ['Fe²⁺', 4], ['Co²⁺', 3], ['Ni²⁺', 2], ['Cu²⁺', 1], ['Cu⁺', 0], ['Zn²⁺', 0]];
  G9.register({
    no: 4, part: 'Part I', short: 'd- & f-block', title: 'The d- and f-Block Elements',
    blurb: 'Position in the periodic table; electronic configurations of d-block elements; general properties of the first transition series — metallic character, ionisation enthalpies, variable oxidation states, standard electrode potentials, magnetic properties, coloured ions, complex formation, catalytic activity, interstitial compounds, alloys; potassium dichromate and potassium permanganate (preparation, properties); lanthanoids — configuration, oxidation states, lanthanoid contraction; actinoids; applications.',
    revise: {
      oneLine: 'Transition elements have incompletely filled d-orbitals in the atom or a common ion: (n−1)d¹⁻¹⁰ ns¹⁻². Zn, Cd, Hg (d¹⁰) are not typical transition elements. Their features: high melting points, variable oxidation states (Mn shows +2 to +7), coloured ions from d–d transitions, paramagnetism (μ = √[n(n+2)] BM, n = unpaired electrons), catalysis (Fe in Haber, V₂O₅ in contact process), complexes and interstitial compounds. Cr (3d⁵4s¹) and Cu (3d¹⁰4s¹) are exceptions. KMnO₄ and K₂Cr₂O₇ are strong oxidisers. Lanthanoid contraction (steady decrease in size from La to Lu due to poor 4f shielding) makes Zr and Hf nearly the same size. Common lanthanoid state +3; actinoids show more varied states and are radioactive.',
      sections: [
        { h: 'Oxidisers', html: '<p>Acidic MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (purple → colourless). Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O (orange → green). Chromate ⇌ dichromate depends on pH.</p>' },
        { h: 'Why colour', html: '<p>d–d transition absorbs visible light; d⁰ (Sc³⁺, Ti⁴⁺) and d¹⁰ (Zn²⁺, Cu⁺) are colourless.</p>' },
        { h: 'Alloys', html: '<p>Similar atomic sizes allow alloys: brass (Cu–Zn), bronze (Cu–Sn), steel, misch metal (lanthanoids) in lighter flints.</p>' }
      ],
      formulas: [['Spin-only moment', 'μ = √[n(n + 2)] BM'], ['MnO₄⁻ (acid)', '5e⁻ → Mn²⁺'], ['Cr₂O₇²⁻ (acid)', '6e⁻ → 2Cr³⁺'], ['General config', '(n−1)d¹⁻¹⁰ ns¹⁻²']],
      terms: [['Lanthanoid contraction', 'gradual decrease in size across La–Lu'], ['Interstitial compound', 'small atoms (H, C, N) trapped in metal lattice'], ['Paramagnetic', 'attracted due to unpaired electrons']],
      traps: ['Cu and Cr configurations are exceptions.', 'Zn²⁺ is colourless and diamagnetic.', 'Highest oxidation state of Mn is +7 (in MnO₄⁻).'],
      bridge: '<p>Unit 5 studies the complexes these metals form.</p>'
    },
    explore: [
      { title: 'Ion magnetism and colour', intro: 'Pick a transition ion.',
        build(el, K) { let k = 6; const row = K.row(el); const s = K.select(row, 'ion', ION.map(i => i[0]), i => { k = i; draw(); }); s.value = 6; const rd = K.read(el);
          function draw() { const [n, d] = ION[k]; const un = d <= 5 ? d : 10 - d; const mu = Math.sqrt(un * (un + 2)); rd.innerHTML = `${n}: d<sup>${d}</sup> · unpaired electrons (high spin) = <b>${un}</b> · μ = √[n(n+2)] = <b>${f(mu)} BM</b> · ${un ? 'paramagnetic' : 'diamagnetic'} · ${d === 0 || d === 10 ? '<b>colourless</b> (no d–d transition)' : '<b>coloured</b> (d–d transition)'}`; } draw(); return null; } },
      { title: '3d series', intro: 'Step through Sc to Zn. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const rd = K.read(el); function draw() { const [s, z, c, ox] = T[k]; rd.innerHTML = `<b>${s}</b> (Z = ${z}) · ${c}${s === 'Cr' || s === 'Cu' ? ' — <b>exception</b> (half-filled/full d stability)' : ''} · highest common oxidation state shown: ${ox ? '+' + Math.max(ox, 2) : '+2'}${s === 'Mn' ? ' (Mn reaches +7)' : ''}${s === 'Zn' ? ' · not a typical transition element (full d¹⁰)' : ''}`; } const step = () => { k = (k + 1) % T.length; draw(); }; K.button(row, 'Next element (S)', step); draw(); return { step, play() {}, pause() {} }; } }
    ],
    gens: [
      { title: 'Magnetic moment', gen(R) { const n = R.int(0, 5); return { q: `Spin-only magnetic moment for ${n} unpaired electron${n === 1 ? '' : 's'}?`, a: `${f(Math.sqrt(n * (n + 2)))} BM`, ans: Math.sqrt(n * (n + 2)), tol: 0.01 }; } },
      { title: 'Ion d-count', gen(R) { const i = R.pick(ION); return { q: `Number of d electrons in ${i[0]}?`, a: `${i[1]}`, ans: i[1] }; } },
      { title: 'Coloured?', gen(R) { return G9.S9.groupQ(R, [['Sc³⁺', 1], ['Ti³⁺', 0], ['Zn²⁺', 1], ['Cu²⁺', 0], ['Cu⁺', 1], ['Fe³⁺', 0], ['Ti⁴⁺', 1]], ['coloured', 'colourless'], 'Ion '); } },
      { title: 'Oxidation state', gen(R) { const c = R.pick([['Mn in KMnO₄', '+7'], ['Cr in K₂Cr₂O₇', '+6'], ['Cr in K₂CrO₄', '+6'], ['Mn in MnO₂', '+4'], ['Fe in K₄[Fe(CN)₆]', '+2'], ['V in V₂O₅', '+5']]); return { q: `Oxidation state of ${c[0]}?`, a: c[1] }; } },
      { title: 'Concepts', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Consequence of lanthanoid contraction?', 'Zr and Hf have almost identical radii and properties'], ['Colour change when acidified dichromate oxidises?', 'orange → green (Cr³⁺)'], ['Why are transition metals good catalysts?', 'variable oxidation states and surface for adsorption'], ['Common oxidation state of lanthanoids?', '+3']]); } }
    ],
    quiz: [
      { q: 'Cr configuration', o: ['3d⁵4s¹', '3d⁴4s²', '3d⁶', '3d³4s²'], a: 0, e: 'Half-filled.' }, { q: 'μ for 3 unpaired', o: ['3.87 BM', '2.83', '4.90', '1.73'], a: 0, e: '√15.' },
      { q: 'Colourless ion', o: ['Zn²⁺', 'Cu²⁺', 'Fe³⁺', 'Ni²⁺'], a: 0, e: 'd¹⁰.' }, { q: 'Highest Mn state', o: ['+7', '+4', '+2', '+6'], a: 0, e: 'Permanganate.' },
      { q: 'Lanthanoid contraction due to', o: ['poor 4f shielding', 'more shells', 'd electrons', 'nuclear decay'], a: 0, e: 'f-orbitals diffuse.' }, { q: 'Acidic MnO₄⁻ gains', o: ['5e⁻', '3e⁻', '1e⁻', '6e⁻'], a: 0, e: '→ Mn²⁺.' },
      { q: 'Contact process catalyst', o: ['V₂O₅', 'Fe', 'Ni', 'Pt only'], a: 0, e: 'SO₃.' }, { q: 'Brass', o: ['Cu + Zn', 'Cu + Sn', 'Fe + C', 'Al + Mg'], a: 0, e: 'Alloy.' },
      { q: 'Actinoids are', o: ['radioactive', 'all gases', 'non-metals', 'noble'], a: 0, e: '5f.' }, { q: 'Dichromate in acid becomes', o: ['green Cr³⁺', 'yellow CrO₄²⁻', 'purple', 'colourless'], a: 0, e: 'Reduced.' },
      { q: 'Not typical transition', o: ['Zn', 'Fe', 'Cu', 'Ni'], a: 0, e: 'Full d.' }
    ],
    teach: {
      outcomes: ['Write configurations and oxidation states', 'Explain colour, magnetism and catalysis', 'Describe KMnO₄, K₂Cr₂O₇ and lanthanoid contraction'],
      periods: [{ t: 'Transition properties', flow: [['10 min', 'Coloured salt solutions display.'], ['15 min', 'Explore panels.'], ['15 min', 'Magnetic moment drill.']] }, { t: 'Oxidisers and f-block', flow: [['15 min', 'KMnO₄ titration recap.'], ['15 min', 'Lanthanoid contraction graph.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['All d-block are transition elements.', 'Colour comes from the metal atom itself.'], activities: ['Dichromate–chromate pH switch.', 'Magnet test on salts.'],
      exit: ['μ formula.', 'Two exceptions.', 'Lanthanoid contraction.'], homework: 'Write balanced ionic equations of acidified KMnO₄ with Fe²⁺ and oxalate.'
    },
    slides: [{ t: 'd- and f-Block', b: ['Configurations', 'Properties: colour, magnetism, catalysis', 'KMnO₄ and K₂Cr₂O₇', 'Lanthanoids and actinoids'] }, { t: 'Think and share', b: ['Why is CuSO₄ blue but ZnSO₄ white?', 'Why are Zr and Hf hard to separate?'] }],
    fs: { groups: [['d-block', [['Config', '(n−1)d¹⁻¹⁰ns¹⁻²'], ['Exceptions', 'Cr 3d⁵4s¹, Cu 3d¹⁰4s¹'], ['μ', '√[n(n+2)] BM']]], ['Oxidisers', [['MnO₄⁻/H⁺', '+5e⁻ → Mn²⁺'], ['Cr₂O₇²⁻/H⁺', '+6e⁻ → 2Cr³⁺']]], ['f-block', [['Ln state', '+3'], ['Contraction', 'Zr ≈ Hf'], ['Actinoids', 'radioactive, varied states']]]],
      ex: [['Fe²⁺ d⁶', '4 unpaired, 4.90 BM'], ['Cu⁺', 'colourless']], rem: ['d⁰/d¹⁰ colourless.', 'Mn up to +7.', 'La→Lu shrink.'] }
  });
})();
