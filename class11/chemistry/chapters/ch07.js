/*
TOOL:    class11_chemistry_ch07
FAMILY:  CBSE_REVISION / Class 11 Chemistry (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Unit 7 Redox Reactions (oxidation and reduction by electron transfer, oxidation number rules, types of redox reactions, disproportionation, balancing by oxidation number and half-reaction methods, redox and electrode processes) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const ON = [['S in H₂SO₄', '+6'], ['Mn in KMnO₄', '+7'], ['Cr in K₂Cr₂O₇', '+6'], ['N in HNO₃', '+5'], ['N in NH₃', '−3'], ['O in H₂O₂', '−1'], ['C in CH₄', '−4'], ['Fe in Fe₃O₄', '+8/3'], ['Cl in HClO₄', '+7'], ['S in S₂O₃²⁻', '+2 (average)'], ['P in H₃PO₄', '+5'], ['O in OF₂', '+2']];
  G9.register({
    no: 7, part: 'Part II', short: 'Redox', title: 'Redox Reactions',
    blurb: 'Classical and electronic ideas of oxidation and reduction; oxidising and reducing agents; oxidation number and rules to assign it; types of redox reactions — combination, decomposition, displacement (metal, non-metal), disproportionation; balancing redox equations by oxidation-number and half-reaction (ion–electron) methods; redox titrations; redox reactions and electrode processes (Daniell cell, standard electrode potential).',
    revise: {
      oneLine: 'Oxidation = loss of electrons (increase in oxidation number); reduction = gain of electrons (decrease). The species reduced is the oxidising agent. Rules: element 0; monoatomic ion = charge; O usually −2 (−1 in peroxides, +2 in OF₂); H +1 (−1 in metal hydrides); sum = charge. Disproportionation: one element is both oxidised and reduced (2H₂O₂ → 2H₂O + O₂). Balance by matching electrons lost and gained, then O with H₂O and H with H⁺ (or OH⁻ in base).',
      sections: [
        { h: 'Half-reaction method (acid)', html: `<p>MnO₄⁻ + Fe²⁺: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O; Fe²⁺ → Fe³⁺ + e⁻ (×5). Sum: MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O.</p>` },
        { h: 'Electrode potentials', html: `<p>Higher (more positive) E° → stronger oxidising agent (F₂ top); lower E° → stronger reducing agent (Li bottom). Daniell cell Zn | Zn²⁺ || Cu²⁺ | Cu, E° = 1.10 V.</p>` },
        { h: 'Titrations', html: `<p>KMnO₄ is self-indicating (pink end-point); dichromate uses diphenylamine; iodometry uses starch.</p>` }
      ],
      formulas: [['Oxidation', 'loss of e⁻, ON ↑'], ['Reduction', 'gain of e⁻, ON ↓'], ['Sum of ONs', '= charge'], ['MnO₄⁻ (acid)', '+5e⁻ → Mn²⁺'], ['Cr₂O₇²⁻ (acid)', '+6e⁻ → 2Cr³⁺'], ['Daniell E°', '1.10 V']],
      terms: [['Oxidising agent', 'gets reduced, accepts electrons'], ['Disproportionation', 'same element oxidised and reduced'], ['Oxidation number', 'charge an atom would have if bonds were ionic']],
      traps: ['Fractional ONs are averages (Fe₃O₄, S₄O₆²⁻).', 'Oxidising agent is reduced, not oxidised.', 'Balance charge as well as atoms.'],
      bridge: '<p>Class 12: electrochemistry (Nernst equation, cells).</p>'
    },
    explore: [
      { title: 'Oxidation number drill', intro: 'Choose a species; see the oxidation number. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'atom in', ON.map(o => o[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { rd.innerHTML = `oxidation number of <b>${ON[k][0]}</b> = <b>${ON[k][1]}</b>`; } const step = () => { k = (k + 1) % ON.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Balancing MnO₄⁻ with Fe²⁺', intro: '<kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Skeleton', 'MnO₄⁻ + Fe²⁺ → Mn²⁺ + Fe³⁺ (acidic)'], ['Oxidation half', 'Fe²⁺ → Fe³⁺ + e⁻'], ['Reduction half', 'MnO₄⁻ → Mn²⁺; add 4H₂O on right, 8H⁺ on left, then 5e⁻ on left'], ['Equalise electrons', 'Multiply Fe half by 5'], ['Add', 'MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O'], ['Check', 'Atoms balance; charge +17 on both sides.']] }); } }
    ],
    gens: [
      { title: 'Oxidation number', gen(R) { const o = R.pick(ON); return { q: `Oxidation number of ${o[0]}?`, a: o[1] }; } },
      { title: 'Agents', gen(R) { const P = [['Zn + Cu²⁺ → Zn²⁺ + Cu', 'Cu²⁺', 'Zn'], ['2Na + Cl₂ → 2NaCl', 'Cl₂', 'Na'], ['CuO + H₂ → Cu + H₂O', 'CuO', 'H₂'], ['2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂', 'Fe³⁺', 'I⁻']]; const p = R.pick(P); return { q: `In ${p[0]}, name the oxidising and reducing agents.`, a: `oxidising: ${p[1]}; reducing: ${p[2]}` }; } },
      { title: 'Type', gen(R) { return G9.S9.groupQ(R, [['2H₂O₂ → 2H₂O + O₂', 0], ['Zn + CuSO₄ → ZnSO₄ + Cu', 1], ['2KClO₃ → 2KCl + 3O₂', 2], ['C + O₂ → CO₂', 3], ['Cl₂ + 2OH⁻ → Cl⁻ + ClO⁻ + H₂O', 0]], ['disproportionation', 'displacement', 'decomposition', 'combination'], 'Type: '); } },
      { title: 'Electrons', levels: [2, 3], gen(R) { const P = [['MnO₄⁻ → Mn²⁺', 5], ['Cr₂O₇²⁻ → 2Cr³⁺', 6], ['MnO₄⁻ → MnO₂ (neutral)', 3], ['NO₃⁻ → NO', 3], ['H₂O₂ → H₂O', 2]]; const p = R.pick(P); return { q: `Electrons gained in ${p[0]}?`, a: String(p[1]), ans: p[1] }; } },
      { title: 'Titration', levels: [2, 3], gen(R) { const V = R.pick([10, 20, 25]), M = R.pick([0.02, 0.05]); return { q: `${V} mL of ${M} M KMnO₄ reacts with Fe²⁺ (1 : 5). Moles of Fe²⁺ oxidised?`, a: `${(+(5 * M * V / 1000).toPrecision(4))} mol`, ans: 5 * M * V / 1000, tol: 1e-9 }; } }
    ],
    quiz: [
      { q: 'Oxidation is', o: ['loss of electrons', 'gain of electrons', 'gain of H only', 'no change'], a: 0, e: 'OIL RIG.' }, { q: 'Mn in KMnO₄', o: ['+7', '+5', '+2', '+4'], a: 0, e: '+1 + x − 8 = 0.' },
      { q: 'Oxidising agent', o: ['is reduced', 'is oxidised', 'unchanged', 'catalyst'], a: 0, e: 'Accepts e⁻.' }, { q: 'O in H₂O₂', o: ['−1', '−2', '0', '+1'], a: 0, e: 'Peroxide.' },
      { q: 'Disproportionation', o: ['2H₂O₂ → 2H₂O + O₂', 'Zn + Cu²⁺', 'C + O₂', 'NaCl → Na⁺ + Cl⁻'], a: 0, e: 'Same element.' }, { q: 'MnO₄⁻ → Mn²⁺ electrons', o: ['5', '3', '7', '2'], a: 0, e: '+7 → +2.' },
      { q: 'Fe in Fe₃O₄', o: ['+8/3', '+2', '+3', '+4'], a: 0, e: 'Average.' }, { q: 'Daniell cell E°', o: ['1.10 V', '0.76 V', '0.34 V', '2.0 V'], a: 0, e: '0.34 + 0.76.' },
      { q: 'Strongest oxidising agent', o: ['F₂', 'Li', 'Na', 'H₂'], a: 0, e: 'Highest E°.' }, { q: 'H in NaH', o: ['−1', '+1', '0', '−2'], a: 0, e: 'Hydride.' },
      { q: 'KMnO₄ titration indicator', o: ['self (pink)', 'starch', 'phenolphthalein', 'litmus'], a: 0, e: 'Colour.' }
    ],
    teach: {
      outcomes: ['Assign oxidation numbers', 'Identify agents and reaction types', 'Balance redox equations'],
      periods: [{ t: 'Oxidation numbers', flow: [['10 min', 'Zn in CuSO₄ demo.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Agent identification.']] }, { t: 'Balancing', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Balance in acid and base.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Oxidising agent is oxidised.', 'ONs must be integers.'], activities: ['KMnO₄–Fe²⁺ titration.', 'Metal displacement series.'],
      exit: ['ON of Cr in dichromate.', 'Half-reaction.', 'Disproportionation example.'], homework: 'Balance 5 redox equations by both methods.'
    },
    slides: [{ t: 'Redox Reactions', b: ['Electron transfer', 'Oxidation numbers', 'Types', 'Balancing and electrodes'] }, { t: 'Think and share', b: ['Why is F₂ the best oxidiser?', 'How does KMnO₄ indicate its own end-point?'] }],
    fs: { groups: [['Ideas', [['Oxidation', 'e⁻ lost, ON ↑'], ['Reduction', 'e⁻ gained, ON ↓'], ['Agents', 'oxidant reduced']]], ['ON rules', [['Element', '0'], ['O', '−2 (peroxide −1)'], ['H', '+1 (hydride −1)'], ['Sum', 'charge']]], ['Balance', [['Electrons', 'equalise'], ['O', 'add H₂O'], ['H', 'add H⁺ / OH⁻']]]],
      ex: [['Cr₂O₇²⁻ → 2Cr³⁺', '6 e⁻'], ['MnO₄⁻ + 5Fe²⁺ + 8H⁺', 'balanced']], rem: ['OIL RIG.', 'Check charge.', 'Averages allowed.'] }
  });
})();
