/*
TOOL:    class10_science_ch03
FAMILY:  CBSE_REVISION / Class 10 Science (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 3 Metals and Non-metals (physical and chemical properties, reactivity series, displacement, ionic compounds, electron-dot structures, extraction and refining, corrosion prevention, alloys) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const RS = ['K', 'Na', 'Ca', 'Mg', 'Al', 'Zn', 'Fe', 'Pb', 'H', 'Cu', 'Hg', 'Ag', 'Au'];
  const NAME = { K: 'potassium', Na: 'sodium', Ca: 'calcium', Mg: 'magnesium', Al: 'aluminium', Zn: 'zinc', Fe: 'iron', Pb: 'lead', H: 'hydrogen', Cu: 'copper', Hg: 'mercury', Ag: 'silver', Au: 'gold' };
  G9.register({
    no: 3, part: 'All chapters', short: 'Metals', title: 'Metals and Non-metals',
    blurb: 'Physical properties and exceptions; reactions of metals with oxygen (amphoteric oxides), water, acids and salt solutions; the reactivity series; ionic bonding and properties of ionic compounds; occurrence and extraction of metals (roasting, calcination, reduction, electrolysis, electrolytic refining); corrosion and its prevention; alloys.',
    revise: {
      oneLine: 'The reactivity series K > Na > Ca > Mg > Al > Zn > Fe > Pb > [H] > Cu > Hg > Ag > Au predicts reactions: a metal displaces any metal below it from its salt solution, and metals above H release hydrogen from dilute acids. Metals lose electrons to form cations; non-metals gain them to form anions; the attraction is an ionic bond (high melting point, conduct when molten or dissolved). Extraction: highly reactive metals by electrolysis of molten compounds; middle metals by roasting (sulphides) or calcination (carbonates) then reduction with carbon; low metals by heating alone.',
      sections: [
        { h: 'Amphoteric oxides', html: `<p>Al₂O₃ and ZnO react with both acids and bases to give salt and water.</p>` },
        { h: 'Extraction', html: `<p>ZnS → (roast) ZnO → (C) Zn. ZnCO₃ → (calcine) ZnO. Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (thermit, for welding rails). Na, Mg, Al by electrolysis of molten chlorides/oxide.</p>` },
        { h: 'Corrosion', html: `<p>Prevent by painting, oiling, galvanising (zinc coat), electroplating, alloying (stainless steel = Fe + Ni + Cr).</p>` }
      ],
      formulas: [['Reactivity', 'K Na Ca Mg Al Zn Fe Pb H Cu Hg Ag Au'], ['Metal + acid', 'salt + H₂ (above H)'], ['Na + H₂O', '2NaOH + H₂ (violent)'], ['Thermit', 'Fe₂O₃ + 2Al → 2Fe + Al₂O₃'], ['Amphoteric', 'Al₂O₃, ZnO']],
      terms: [['Ore', 'mineral from which metal is extracted profitably'], ['Gangue', 'impurities in ore'], ['Alloy', 'homogeneous mixture of metals (or metal + non-metal)']],
      traps: ['HNO₃ is an oxidising acid; Mg and Mn give H₂ only with very dilute HNO₃.', 'Ionic compounds conduct only when molten or in solution.', 'Gold and silver are not displaced by copper.'],
      bridge: '<p>Class 12 Chemistry: metallurgy in detail.</p>'
    },
    explore: [
      { title: 'Displacement predictor', intro: 'Put a metal into a salt solution; the series predicts whether it reacts.',
        build(el, K) { const M = RS.filter(x => x !== 'H'); let a = 5, s = 8; const row = K.row(el); const s1 = K.select(row, 'metal strip', M.map(x => NAME[x]), i => { a = i; b.redraw(); }); s1.value = 5; const s2 = K.select(row, 'salt solution of', M.map(x => NAME[x]), i => { s = i; b.redraw(); }); s2.value = 8; const b = new K.Board(el, { xmin: -0.5, xmax: 13, ymin: -1.2, ymax: 1.6, axes: false, grid: 0, aspect: 0.2 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); RS.forEach((x, i) => { const sel = x === M[a] || x === M[s]; b.rect(i, 0, 0.9, 0.8, { fill: x === M[a] ? C.orange : x === M[s] ? C.blue : x === 'H' ? '#e5e7eb' : '#cbd5e1', color: C.ink, w: 1 }); b.text(i + 0.45, 0.4, x, { font: sel ? 'bold 13px' : '12px', color: sel ? '#fff' : undefined }); }); b.text(0.5, -0.6, 'most reactive', { font: '10px' }); b.text(12, -0.6, 'least', { font: '10px' });
            const ia = RS.indexOf(M[a]), is = RS.indexOf(M[s]); rd.innerHTML = a === s ? 'same metal — no change' : ia < is ? `<b>${NAME[M[a]]}</b> is more reactive → it <b>displaces ${NAME[M[s]]}</b> from its salt solution` : `<b>${NAME[M[a]]}</b> is less reactive → <b>no reaction</b>`; };
          b.redraw(); return null; } },
      { title: 'Ionic bond: NaCl', intro: '<kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Sodium atom', 'Na: 2, 8, 1 — one outer electron, easy to lose.'], ['Chlorine atom', 'Cl: 2, 8, 7 — needs one electron for an octet.'], ['Transfer', 'Na gives its electron to Cl → Na⁺ (2, 8) and Cl⁻ (2, 8, 8).'], ['Attraction', 'Opposite ions attract strongly — ionic bond; they form a crystal lattice.'], ['Properties', 'High melting point, brittle, soluble in water, conduct when molten or dissolved.']] }); } }
    ],
    gens: [
      { title: 'Displacement', gen(R) { const M = RS.filter(x => x !== 'H'); const i = R.int(0, M.length - 1); let j = R.int(0, M.length - 1); if (j === i) j = (i + 3) % M.length; const ri = RS.indexOf(M[i]), rj = RS.indexOf(M[j]); return { q: `Will ${NAME[M[i]]} displace ${NAME[M[j]]} from its salt solution?`, a: ri < rj ? 'yes — more reactive' : 'no — less reactive' }; } },
      { title: 'H₂ from acid', gen(R) { const M = RS.filter(x => x !== 'H' && !['K', 'Na', 'Ca'].includes(x)); const m = R.pick(M); return { q: `Does ${NAME[m]} give hydrogen with dilute HCl?`, a: RS.indexOf(m) < RS.indexOf('H') ? 'yes' : 'no — below hydrogen' }; } },
      { title: 'Extraction', gen(R) { return G9.S9.pickQ(R, [['How is sodium extracted?', 'electrolysis of molten NaCl'], ['Roasting is used for which ores?', 'sulphide ores (heated in air)'], ['Calcination is used for which ores?', 'carbonate ores (heated with little air)'], ['Thermit reaction?', 'Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (welding)'], ['How is copper purified?', 'electrolytic refining (impure anode, pure cathode)']]); } },
      { title: 'Electron transfer', levels: [2, 3], gen(R) { const P = [['Mg', 'O', 'MgO', 2], ['Na', 'Cl', 'NaCl', 1], ['Ca', 'Cl', 'CaCl₂', 2], ['K', 'Cl', 'KCl', 1], ['Mg', 'Cl', 'MgCl₂', 2]]; const p = R.pick(P); return { q: `Forming ${p[2]}: how many electrons does each ${p[0]} atom lose?`, a: String(p[3]), ans: p[3] }; } },
      { title: 'Alloys and corrosion', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Brass is made of?', 'copper + zinc'], ['Bronze is made of?', 'copper + tin'], ['Solder is made of?', 'lead + tin (low melting point)'], ['What is galvanisation?', 'coating iron/steel with zinc'], ['Why is 22-carat gold used for jewellery?', 'pure gold is too soft; alloyed with Cu/Ag']]); } }
    ],
    quiz: [
      { q: 'Most reactive', o: ['K', 'Na', 'Cu', 'Au'], a: 0, e: 'Top.' }, { q: 'Amphoteric oxide', o: ['Al₂O₃', 'Na₂O', 'SO₂', 'CO₂'], a: 0, e: 'Both.' },
      { q: 'Zn + CuSO₄', o: ['Zn displaces Cu', 'no reaction', 'Cu displaces Zn', 'explodes'], a: 0, e: 'Zn above Cu.' }, { q: 'Kept in kerosene', o: ['sodium', 'iron', 'copper', 'gold'], a: 0, e: 'Reactive.' },
      { q: 'Ionic compounds conduct', o: ['when molten or dissolved', 'as solids', 'never', 'only in air'], a: 0, e: 'Ions move.' }, { q: 'Liquid metal', o: ['mercury', 'gallium only', 'sodium', 'lead'], a: 0, e: 'Hg.' },
      { q: 'Galvanising coat', o: ['zinc', 'tin', 'copper', 'paint'], a: 0, e: 'Zn.' }, { q: 'Al extracted by', o: ['electrolysis', 'carbon reduction', 'heating alone', 'magnet'], a: 0, e: 'Reactive.' },
      { q: 'Brass', o: ['Cu + Zn', 'Cu + Sn', 'Fe + C', 'Pb + Sn'], a: 0, e: 'Alloy.' }, { q: 'Below H in series', o: ['copper', 'zinc', 'iron', 'magnesium'], a: 0, e: 'No H₂.' },
      { q: 'Calcination', o: ['heating carbonate ore with little air', 'heating sulphide in air', 'electrolysis', 'washing'], a: 0, e: 'Carbonates.' }
    ],
    teach: {
      outcomes: ['Use the reactivity series', 'Explain ionic bonding', 'Outline extraction and corrosion prevention'],
      periods: [{ t: 'Reactivity', flow: [['10 min', 'Metals in acid demos.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Displacement tube tests.']] }, { t: 'Bonding and extraction', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Extraction flow chart.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['All metals react with acid.', 'Ionic solids conduct.'], activities: ['Displacement grid.', 'Corrosion test tubes.'],
      exit: ['Series order.', 'Displacement prediction.', 'Extraction method by reactivity.'], homework: 'Make a mnemonic for the reactivity series and predict 5 reactions.'
    },
    slides: [{ t: 'Metals and Non-metals', b: ['Properties', 'Reactivity series', 'Ionic bonding', 'Extraction and corrosion'] }, { t: 'Think and share', b: ['Why is Na kept in kerosene?', 'Will Cu displace Fe?'] }],
    fs: { groups: [['Series', [['Order', 'K Na Ca Mg Al Zn Fe Pb H Cu Hg Ag Au'], ['Displacement', 'higher displaces lower'], ['Acid', 'above H gives H₂']]], ['Bonding', [['Ionic', 'electron transfer'], ['Properties', 'high mp, conduct molten']]], ['Extraction', [['High', 'electrolysis'], ['Middle', 'roast/calcine + C'], ['Low', 'heat alone'], ['Refining', 'electrolytic']]]],
      ex: [['Fe in CuSO₄', 'Cu deposits'], ['Mg → Mg²⁺', 'loses 2 e⁻']], rem: ['Learn the series.', 'Ionic = transfer.', 'Protect iron.'] }
  });
})();
