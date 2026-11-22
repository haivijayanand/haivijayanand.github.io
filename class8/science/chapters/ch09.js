/*
TOOL:    class8_science_ch09
FAMILY:  CBSE_REVISION / Class 8 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 9 The Amazing World of Solutes, Solvents, and Solutions (solute solvent solution, solubility, saturated, effect of temperature, concentration %, water as universal solvent) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toFixed(2)).toString();
  const SOL = [[0, 13], [20, 32], [40, 64], [60, 110]];
  G9.register({
    no: 9, part: 'All chapters', short: 'Solutions', title: 'The Amazing World of Solutes, Solvents, and Solutions',
    blurb: 'Solute + solvent = solution; water as a common (universal) solvent; soluble and insoluble substances; saturated and unsaturated solutions; how temperature affects solubility; concentration as a percentage; and gases dissolved in water.',
    revise: {
      oneLine: 'A solution is a uniform mixture of a solute dissolved in a solvent (salt in water). Solubility is the most solute that dissolves in 100 g of solvent at a temperature; beyond it the solution is saturated. Solubility of most solids rises with temperature; gases dissolve less in warm water. Concentration (mass %) = mass of solute ÷ mass of solution × 100.',
      sections: [
        { h: 'Solvents', html: `<p>Water dissolves many substances, so it is called a universal solvent. Some things need other solvents — nail paint remover (acetone), turpentine for oil paint.</p>` },
        { h: 'Saturation', html: `<p>Keep adding sugar to water: at some point no more dissolves and extra settles — saturated. Heating dissolves more; cooling makes crystals form.</p>` },
        { h: 'Gases', html: `<p>Oxygen dissolved in water keeps fish alive; warm water holds less — fish suffer in heated ponds. Soda has CO₂ dissolved under pressure.</p>` }
      ],
      formulas: [['Solution', 'solute + solvent'], ['Mass %', 'solute ÷ (solute + solvent) × 100'], ['Saturated', 'no more dissolves'], ['Solids', 'solubility ↑ with temperature'], ['Gases', 'solubility ↓ with temperature']],
      terms: [['Solute', 'substance that dissolves'], ['Solvent', 'substance that dissolves the solute'], ['Solubility', 'max solute per 100 g solvent']],
      traps: ['Mass % uses mass of the whole solution, not just solvent.', 'Not every substance dissolves in water.', 'Gases behave opposite to most solids with temperature.'],
      bridge: '<p>Class 9 studies solutions, suspensions and colloids.</p>'
    },
    explore: [
      { title: 'Saturated or not?', intro: 'Choose water temperature and how much of a salt (illustrative solubility table for potassium nitrate) you add to 100 g of water.',
        build(el, K) { let t = 1, m = 20; const row = K.row(el); const s = K.select(row, 'temperature', SOL.map(x => x[0] + ' °C'), i => { t = i; draw(); }); s.value = 1; K.slider(row, 'solute added (g)', 5, 120, 1, m, v => { m = v; draw(); }); const rd = K.read(el);
          function draw() { const S = SOL[t][1]; const d = Math.min(m, S), x = m - d; rd.innerHTML = `solubility at ${SOL[t][0]} °C ≈ ${S} g per 100 g water · dissolved <b>${d} g</b>${x > 0 ? ` · <b>${x} g settles</b> → saturated` : ' → unsaturated (more can dissolve)'} · concentration = ${d} ÷ ${100 + d} × 100 = <b>${f(d / (100 + d) * 100)}%</b>`; } draw(); return null; } },
      { title: 'Solute or solvent?', intro: 'Sort the parts.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Solute', 'Solvent'], items: [['sugar in tea', 0], ['water in lemonade', 1], ['salt in sea water', 0], ['acetone removing nail paint', 1], ['CO₂ in soda', 0], ['water in salt solution', 1], ['iodine in tincture of iodine', 0], ['alcohol in tincture of iodine', 1]] }); } }
    ],
    gens: [
      { title: 'Mass %', gen(R) { const s = R.int(5, 40), w = R.int(60, 200); return { q: `${s} g of salt is dissolved in ${w} g of water. Mass % of salt?`, a: `${f(s / (s + w) * 100)}%`, ans: s / (s + w) * 100, tol: 0.01 }; } },
      { title: 'Solute needed', levels: [2, 3], gen(R) { const p = R.pick([5, 10, 20, 25]), m = R.pick([100, 200, 400, 500]); return { q: `How much sugar is needed to make ${m} g of a ${p}% sugar solution?`, a: `${p * m / 100} g sugar (+ ${m - p * m / 100} g water)`, ans: p * m / 100 }; } },
      { title: 'Saturated?', gen(R) { const S = R.int(30, 40), m = R.int(20, 50); return { q: `Solubility is ${S} g per 100 g water. ${m} g is added to 100 g water. Saturated? How much settles?`, a: m > S ? `saturated; ${m - S} g settles` : `unsaturated; all dissolves`, ans: Math.max(0, m - S) }; } },
      { title: 'Temperature effect', gen(R) { return G9.S9.pickQ(R, [['Effect of heating on solubility of sugar?', 'increases'], ['Effect of warm water on dissolved oxygen?', 'decreases — less oxygen for fish'], ['What happens when a hot saturated solution cools?', 'crystals form'], ['Why is water called a universal solvent?', 'it dissolves many substances']]); } },
      { title: 'Parts', gen(R) { const x = R.pick([['salt water', 'salt', 'water'], ['tea with sugar', 'sugar', 'water/tea'], ['soda water', 'carbon dioxide', 'water'], ['tincture of iodine', 'iodine', 'alcohol']]); return { q: `In ${x[0]}, name the solute and solvent.`, a: `solute: ${x[1]}; solvent: ${x[2]}` }; } }
    ],
    quiz: [
      { q: 'Substance that dissolves', o: ['solute', 'solvent', 'solution', 'residue'], a: 0, e: 'Solute.' }, { q: 'Universal solvent', o: ['water', 'oil', 'sand', 'air'], a: 0, e: 'Water.' },
      { q: 'Saturated means', o: ['no more dissolves', 'very dilute', 'boiling', 'frozen'], a: 0, e: 'Full.' }, { q: 'Solids’ solubility on heating', o: ['usually increases', 'decreases', 'zero', 'same always'], a: 0, e: 'More.' },
      { q: 'Gases in warm water', o: ['dissolve less', 'dissolve more', 'same', 'freeze'], a: 0, e: 'Less.' }, { q: '10 g salt + 90 g water', o: ['10%', '11.1%', '90%', '1%'], a: 0, e: '10/100.' },
      { q: 'Nail paint remover', o: ['acetone', 'water', 'salt', 'sugar'], a: 0, e: 'Solvent.' }, { q: 'Solution is', o: ['uniform mixture', 'compound', 'element', 'suspension'], a: 0, e: 'Homogeneous.' },
      { q: 'Cooling hot saturated solution', o: ['crystals form', 'evaporates', 'boils', 'nothing'], a: 0, e: 'Crystals.' }, { q: 'Soda contains dissolved', o: ['CO₂', 'O₂', 'N₂', 'salt only'], a: 0, e: 'Fizz.' },
      { q: 'Solubility measured per', o: ['100 g solvent', '1 kg salt', '1 L air', 'no unit'], a: 0, e: 'Standard.' }
    ],
    teach: {
      outcomes: ['Identify solute, solvent, solution', 'Explain saturation and temperature effects', 'Calculate mass %'],
      periods: [{ t: 'Dissolving', flow: [['10 min', 'Spoon-count of salt till saturated.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Hot vs cold dissolving.']] }, { t: 'Concentration', flow: [['15 min', 'Mass % examples.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['% uses solvent mass.', 'All substances dissolve in water.'], activities: ['Saturation count.', 'Crystal growing.'],
      exit: ['Define three terms.', 'Mass % problem.', 'Temperature effect.'], homework: 'Make a 10% sugar solution with 200 g total; write the masses used.'
    },
    slides: [{ t: 'Solutes, Solvents, Solutions', b: ['Solute and solvent', 'Solubility and saturation', 'Temperature effects', 'Concentration %'] }, { t: 'Think and share', b: ['Why do fish suffer in warm ponds?', 'How to make a 5% salt solution?'] }],
    fs: { groups: [['Terms', [['Solute', 'dissolves'], ['Solvent', 'dissolves it'], ['Solution', 'uniform mixture']]], ['Solubility', [['Saturated', 'no more dissolves'], ['Solids', '↑ with T'], ['Gases', '↓ with T']]], ['Concentration', [['Mass %', 'solute ÷ solution × 100'], ['Example', '10 g in 90 g water = 10%']]]],
      ex: [['20 g + 80 g water', '20%'], ['5% of 400 g', '20 g solute']], rem: ['Use total mass.', 'Heat dissolves more solid.', 'Warm water holds less gas.'] }
  });
})();
