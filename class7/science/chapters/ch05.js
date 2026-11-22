/*
TOOL:    class7_science_ch05
FAMILY:  CBSE_REVISION / Class 7 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 5 Changes Around Us: Physical and Chemical (reversible and irreversible, physical vs chemical, signs of chemical change, rusting, crystallisation, burning) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const CH = [['melting ice', 0], ['tearing paper', 0], ['dissolving salt in water', 0], ['boiling water', 0], ['folding a cloth', 0], ['burning paper', 1], ['rusting of iron', 1], ['cooking an egg', 1], ['curdling of milk', 1], ['ripening of fruit', 1], ['baking soda + vinegar fizzing', 1], ['crystallising salt from sea water', 0]];
  G9.register({
    no: 5, part: 'All chapters', short: 'Changes', title: 'Changes Around Us: Physical and Chemical',
    blurb: 'Physical changes (shape, size, state; no new substance) and chemical changes (new substances form); signs of chemical change — gas, colour change, heat, light, smell, precipitate; rusting, burning, crystallisation and examples from daily life.',
    revise: {
      oneLine: 'In a physical change only shape, size or state changes and no new substance forms; many are reversible (melting, dissolving). In a chemical change one or more new substances form, often with gas, heat, light, colour change or smell; most are irreversible (burning, rusting, cooking). Crystallisation gives pure crystals and is a physical change.',
      sections: [
        { h: 'Signs of chemical change', html: `<p>Bubbles of gas (vinegar + baking soda → carbon dioxide), colour change (cut apple browns), heat/light (burning), new smell (spoiled food).</p>` },
        { h: 'Examples', html: `<p>Magnesium burns to white magnesium oxide; iron rusts; copper sulphate solution + iron nail → brown copper coating and greenish solution.</p>` },
        { h: 'Crystallisation', html: `<p>Dissolve impure salt or copper sulphate in hot water, filter, cool slowly: pure crystals form. Physical change.</p>` }
      ],
      formulas: [['Physical', 'no new substance'], ['Chemical', 'new substance'], ['Vinegar + baking soda', 'CO₂ gas'], ['Rust', 'iron + O₂ + water'], ['Crystallisation', 'physical, gives pure crystals']],
      terms: [['Reversible', 'can be undone'], ['Irreversible', 'cannot be undone easily'], ['Crystallisation', 'getting pure crystals from a solution']],
      traps: ['Dissolving sugar is physical.', 'Boiling water is physical though it looks dramatic.', 'Some physical changes are irreversible (breaking glass).'],
      bridge: '<p>Class 8–10 write chemical equations for such changes.</p>'
    },
    explore: [
      { title: 'Change classifier', intro: 'Choose a change; see whether it is physical or chemical, and why.',
        build(el, K) { const WHY = ['only state/shape changes; no new substance', 'a new substance forms']; let k = 0; const row = K.row(el); const sel = K.select(row, 'change', CH.map(c => c[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { const c = CH[k]; rd.innerHTML = `<b>${c[0]}</b> → <b>${c[1] ? 'CHEMICAL' : 'PHYSICAL'}</b> change — ${WHY[c[1]]}`; } const step = () => { k = (k + 1) % CH.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Iron nail in copper sulphate', intro: '<kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { const draw = (k) => b => { b.rect(-1, -1.8, 2, 3, { fill: '#fff', color: C.ink, w: 2 }); b.rect(-1, -1.8, 2, 2.4, { fill: ['rgba(37,99,235,.55)', 'rgba(37,99,235,.4)', 'rgba(132,204,22,.35)'][k], color: 'none' }); b.rect(-0.12, -1.4, 0.24, 2.8, { fill: ['#64748b', '#a16207', '#92400e'][k], color: C.ink, w: 1 }); };
          let b; return G9.S9.stages(el, K, { board: { xmin: -4, xmax: 4, ymin: -2, ymax: 1.6, axes: false, grid: 0, aspect: 0.45 }, stages: [['Start', 'Blue copper sulphate solution; clean grey iron nail.', draw(0)], ['Twenty minutes', 'A brown coating appears on the nail.', draw(1)], ['Later', 'The solution turns greenish (iron sulphate); brown copper on the nail — a chemical change.', draw(2)]] }); } }
    ],
    gens: [
      { title: 'Physical or chemical', gen(R) { return G9.S9.groupQ(R, CH, ['physical change', 'chemical change'], 'Physical or chemical: '); } },
      { title: 'Signs', gen(R) { return G9.S9.pickQ(R, [['Name four signs of a chemical change.', 'gas, colour change, heat/light, new smell'], ['Gas formed when vinegar meets baking soda?', 'carbon dioxide'], ['Why does a cut apple turn brown?', 'a chemical change with air'], ['Is crystallisation physical or chemical?', 'physical']]); } },
      { title: 'Reversible?', gen(R) { return G9.S9.groupQ(R, [['melting wax', 0], ['burning wood', 1], ['freezing water', 0], ['cooking rice', 1], ['stretching a rubber band', 0], ['rusting', 1]], ['reversible', 'irreversible'], 'Reversible or irreversible: '); } },
      { title: 'Crystals yield', levels: [2, 3], gen(R) { const v = R.int(2, 6), c = R.int(25, 35); return { q: `Sea water has ${c} g of salt per litre. Salt from ${v} L by evaporation and crystallisation?`, a: `${v * c} g`, ans: v * c }; } },
      { title: 'Rusting', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Is rusting physical or chemical?', 'chemical — rust is a new substance'], ['Two conditions for rusting?', 'air (oxygen) and water'], ['Why is galvanised iron used for roofs?', 'zinc coating prevents rusting'], ['Is rust the same substance as iron?', 'no — it is iron oxide']]); } }
    ],
    quiz: [
      { q: 'Melting ice', o: ['physical', 'chemical', 'both', 'none'], a: 0, e: 'State.' }, { q: 'Burning paper', o: ['chemical', 'physical', 'reversible', 'none'], a: 0, e: 'New stuff.' },
      { q: 'Vinegar + baking soda gas', o: ['carbon dioxide', 'oxygen', 'hydrogen', 'nitrogen'], a: 0, e: 'Fizz.' }, { q: 'Crystallisation', o: ['physical', 'chemical', 'burning', 'rusting'], a: 0, e: 'Pure crystals.' },
      { q: 'Iron + copper sulphate solution turns', o: ['greenish', 'red', 'colourless', 'black'], a: 0, e: 'Iron sulphate.' }, { q: 'Dissolving sugar', o: ['physical', 'chemical', 'irreversible', 'burning'], a: 0, e: 'No new.' },
      { q: 'Sign of chemical change', o: ['gas bubbles from reaction', 'change of shape', 'cutting', 'folding'], a: 0, e: 'Gas.' }, { q: 'Cooking an egg', o: ['chemical, irreversible', 'physical', 'reversible', 'none'], a: 0, e: 'Cannot undo.' },
      { q: 'Breaking glass', o: ['physical but irreversible', 'chemical', 'reversible', 'burning'], a: 0, e: 'Exception.' }, { q: 'Curdling milk', o: ['chemical', 'physical', 'melting', 'dissolving'], a: 0, e: 'New substance.' },
      { q: 'Boiling water', o: ['physical', 'chemical', 'burning', 'rusting'], a: 0, e: 'State.' }
    ],
    teach: {
      outcomes: ['Distinguish physical and chemical changes', 'Identify signs of chemical change', 'Do crystallisation'],
      periods: [{ t: 'Classify', flow: [['10 min', 'Kitchen changes list.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Vinegar + baking soda.']] }, { t: 'Chemical changes', flow: [['15 min', 'Explore panel 2 / real nail.'], ['15 min', 'Crystallise copper sulphate.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Dissolving is chemical.', 'All physical changes are reversible.'], activities: ['Nail in copper sulphate.', 'Salt crystals.'],
      exit: ['Two of each.', 'Four signs.', 'Crystallisation type.'], homework: 'List 10 changes at home and classify them.'
    },
    slides: [{ t: 'Changes Around Us', b: ['Physical changes', 'Chemical changes', 'Signs', 'Crystallisation'] }, { t: 'Think and share', b: ['Is cooking chemical?', 'Why does iron rust?'] }],
    fs: { groups: [['Physical', [['New substance', 'no'], ['Examples', 'melting, dissolving, tearing'], ['Crystallisation', 'physical']]], ['Chemical', [['New substance', 'yes'], ['Signs', 'gas, colour, heat, smell'], ['Examples', 'burning, rusting, cooking']]], ['Reactions', [['Vinegar + soda', 'CO₂'], ['Fe + CuSO₄', 'Cu + FeSO₄']]]],
      ex: [['Ice melts', 'physical'], ['Egg cooks', 'chemical']], rem: ['Ask: new substance?', 'Watch for signs.', 'Reversible ≠ always physical test.'] }
  });
})();
