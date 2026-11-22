/*
TOOL:    class8_science_ch08
FAMILY:  CBSE_REVISION / Class 8 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 8 Nature of Matter: Elements, Compounds, and Mixtures (pure substances, elements metals non-metals, symbols, compounds fixed ratio, mixtures homogeneous heterogeneous, separation) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const S = [['oxygen', 0], ['water', 1], ['air', 2], ['iron', 0], ['salt (sodium chloride)', 1], ['sea water', 2], ['carbon dioxide', 1], ['brass', 2], ['gold', 0], ['sugar', 1], ['soil', 2], ['copper', 0]];
  G9.register({
    no: 8, part: 'All chapters', short: 'Elements and compounds', title: 'Nature of Matter: Elements, Compounds, and Mixtures',
    blurb: 'Pure substances and mixtures; elements (metals, non-metals, metalloids) and their symbols; compounds formed in a fixed ratio with new properties; homogeneous and heterogeneous mixtures; alloys; and how mixtures and compounds differ.',
    revise: {
      oneLine: 'Pure substances are elements (one kind of atom, e.g., iron Fe, oxygen O) or compounds (two or more elements chemically combined in a fixed ratio, e.g., water H₂O). A compound’s properties differ from its elements and it can be split only by chemical means. Mixtures contain substances physically mixed in any ratio, keep their own properties and can be separated physically; they may be homogeneous (salt water, air, brass) or heterogeneous (sand + water, soil).',
      sections: [
        { h: 'Iron + sulphur', html: `<p>Mixture: a magnet pulls the iron out. Heated strongly: iron sulphide forms — a compound that a magnet cannot separate.</p>` },
        { h: 'Symbols', html: `<p>H hydrogen, C carbon, N nitrogen, O oxygen, Na sodium, Cl chlorine, Fe iron, Cu copper, Ag silver, Au gold. Water H₂O: 2 H : 1 O.</p>` },
        { h: 'Alloys', html: `<p>Brass (copper + zinc), bronze (copper + tin), stainless steel (iron + chromium + nickel + carbon) — homogeneous mixtures with useful properties.</p>` }
      ],
      formulas: [['Element', 'one kind of atom'], ['Compound', 'fixed ratio, new properties'], ['Mixture', 'any ratio, own properties'], ['Water', 'H₂O'], ['Salt', 'NaCl']],
      terms: [['Homogeneous mixture', 'uniform throughout'], ['Heterogeneous mixture', 'parts visible / not uniform'], ['Alloy', 'mixture of metals (sometimes with non-metals)']],
      traps: ['Air is a mixture, not a compound.', 'Brass is a mixture (alloy), not a compound.', 'Water from any source has the same H : O ratio.'],
      bridge: '<p>Class 9: Is Matter Around Us Pure? and atoms and molecules.</p>'
    },
    explore: [
      { title: 'Classifier', intro: 'Choose a substance: element, compound or mixture? <kbd>S</kbd> steps.',
        build(el, K) { const WHY = ['made of one kind of atom', 'elements chemically combined in a fixed ratio', 'substances physically mixed, ratio can vary']; let k = 0; const row = K.row(el); const sel = K.select(row, 'substance', S.map(x => x[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { rd.innerHTML = `<b>${S[k][0]}</b> → <b>${['ELEMENT', 'COMPOUND', 'MIXTURE'][S[k][1]]}</b> — ${WHY[S[k][1]]}`; } const step = () => { k = (k + 1) % S.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Mixture or compound?', intro: 'Iron filings and sulphur powder. <kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Mix', 'Grey iron filings and yellow sulphur powder mixed: both still visible.'], ['Magnet test', 'A magnet pulls out the iron — a mixture keeps properties of its parts.'], ['Heat strongly (teacher)', 'The mixture glows; a black solid forms.'], ['Iron sulphide', 'A magnet does not attract it; it is a new substance — a compound.'], ['Conclusion', 'Mixture: physical, separable. Compound: chemical, fixed ratio, new properties.']] }); } }
    ],
    gens: [
      { title: 'Classify', gen(R) { return G9.S9.groupQ(R, S, ['element', 'compound', 'mixture'], 'Element, compound or mixture: '); } },
      { title: 'Symbols', gen(R) { const E = [['sodium', 'Na'], ['iron', 'Fe'], ['copper', 'Cu'], ['silver', 'Ag'], ['gold', 'Au'], ['chlorine', 'Cl'], ['carbon', 'C'], ['nitrogen', 'N']]; const e = R.pick(E); return R.chance(.5) ? { q: `Symbol of ${e[0]}?`, a: e[1] } : { q: `Which element has symbol ${e[1]}?`, a: e[0] }; } },
      { title: 'Homogeneous?', gen(R) { return G9.S9.groupQ(R, [['salt solution', 0], ['sand in water', 1], ['air', 0], ['oil and water', 1], ['brass', 0], ['soil', 1]], ['homogeneous', 'heterogeneous'], 'Homogeneous or heterogeneous: '); } },
      { title: 'Fixed ratio', levels: [2, 3], gen(R) { const n = R.int(2, 12); return { q: `Water is H₂O. How many hydrogen atoms in ${n} water molecules?`, a: String(2 * n), ans: 2 * n }; } },
      { title: 'Compare', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Give two differences between a mixture and a compound.', 'mixture: any ratio, separable physically; compound: fixed ratio, new properties'], ['Is brass a compound?', 'no — an alloy (mixture) of copper and zinc'], ['Why is water a compound?', 'H and O chemically combined in a fixed ratio'], ['How can iron be removed from an iron–sulphur mixture?', 'with a magnet']]); } }
    ],
    quiz: [
      { q: 'Water is', o: ['compound', 'element', 'mixture', 'alloy'], a: 0, e: 'H₂O.' }, { q: 'Air is', o: ['mixture', 'compound', 'element', 'pure'], a: 0, e: 'Gases.' },
      { q: 'Symbol of iron', o: ['Fe', 'I', 'Ir', 'F'], a: 0, e: 'Ferrum.' }, { q: 'Brass is', o: ['alloy (mixture)', 'element', 'compound', 'non-metal'], a: 0, e: 'Cu + Zn.' },
      { q: 'Compound ratio', o: ['fixed', 'any', 'random', 'zero'], a: 0, e: 'Fixed.' }, { q: 'Heterogeneous', o: ['sand + water', 'salt water', 'air', 'brass'], a: 0, e: 'Visible.' },
      { q: 'Iron sulphide is', o: ['compound', 'mixture', 'element', 'alloy'], a: 0, e: 'Heated.' }, { q: 'Symbol Au', o: ['gold', 'silver', 'aluminium', 'argon'], a: 0, e: 'Aurum.' },
      { q: 'Mixture parts', o: ['keep properties', 'lose properties', 'fixed ratio', 'chemical bonds'], a: 0, e: 'Same.' }, { q: 'Element', o: ['oxygen', 'water', 'salt', 'sugar'], a: 0, e: 'One kind.' },
      { q: 'NaCl is', o: ['common salt', 'sugar', 'water', 'chalk'], a: 0, e: 'Salt.' }
    ],
    teach: {
      outcomes: ['Classify elements, compounds and mixtures', 'Use symbols', 'Distinguish mixtures and compounds'],
      periods: [{ t: 'Classify', flow: [['10 min', 'Kitchen substance list.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Symbol card game.']] }, { t: 'Iron and sulphur', flow: [['15 min', 'Explore panel 2 / demo.'], ['15 min', 'Comparison table.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Air is a compound.', 'Alloys are compounds.'], activities: ['Iron–sulphur demo.', 'Mixture sorting tray.'],
      exit: ['One of each type.', 'Five symbols.', 'Mixture vs compound.'], homework: 'Find 10 substances at home and classify them.'
    },
    slides: [{ t: 'Elements, Compounds, Mixtures', b: ['Pure substances', 'Elements and symbols', 'Compounds', 'Mixtures and alloys'] }, { t: 'Think and share', b: ['Is air a compound?', 'Iron + sulphur heated?'] }],
    fs: { groups: [['Pure', [['Element', 'one kind of atom'], ['Compound', 'fixed ratio, e.g., H₂O']]], ['Mixtures', [['Homogeneous', 'salt water, air, brass'], ['Heterogeneous', 'sand + water, soil']]], ['Symbols', [['Fe', 'iron'], ['Cu', 'copper'], ['Na', 'sodium'], ['Au', 'gold']]]],
      ex: [['5 H₂O', '10 H atoms'], ['Brass', 'alloy mixture']], rem: ['Fixed ratio → compound.', 'Physical separation → mixture.', 'Learn key symbols.'] }
  });
})();
