/*
TOOL:    class7_science_ch04
FAMILY:  CBSE_REVISION / Class 7 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 4 The World of Metals and Non-metals (lustre, malleability, ductility, conduction, sonority; reactions with oxygen, oxides acidic/basic; rusting; uses) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const EL = [['iron', 0], ['copper', 0], ['aluminium', 0], ['gold', 0], ['sulphur', 1], ['carbon (coal)', 1], ['oxygen', 1], ['magnesium', 0], ['iodine', 1], ['silver', 0]];
  G9.register({
    no: 4, part: 'All chapters', short: 'Metals and non-metals', title: 'The World of Metals and Non-metals',
    blurb: 'Physical properties of metals and non-metals — lustre, hardness, malleability, ductility, conduction of heat and electricity, sonority; reaction with oxygen to form basic or acidic oxides; rusting and its prevention; and uses of both.',
    revise: {
      oneLine: 'Metals are usually shiny, hard, malleable (beaten into sheets), ductile (drawn into wires), sonorous and good conductors. Non-metals are usually dull, brittle and poor conductors (graphite is an exception). Metals burn in oxygen to give basic oxides (magnesium oxide turns red litmus blue); non-metals give acidic oxides (sulphur dioxide turns blue litmus red). Iron rusts with air and water.',
      sections: [
        { h: 'Exceptions', html: `<p>Mercury is a liquid metal; sodium is soft; graphite (carbon) conducts electricity; iodine is lustrous but a non-metal; diamond (carbon) is very hard.</p>` },
        { h: 'Oxides', html: `<p>Magnesium + oxygen → magnesium oxide (basic). Sulphur + oxygen → sulphur dioxide (acidic in water).</p>` },
        { h: 'Rusting', html: `<p>Iron + oxygen + water → rust (iron oxide). Prevent by painting, oiling, greasing or galvanising (zinc coating).</p>` }
      ],
      formulas: [['Malleable', 'beaten into sheets'], ['Ductile', 'drawn into wires'], ['Metal oxide', 'basic'], ['Non-metal oxide', 'acidic'], ['Rust', 'iron + air + water']],
      terms: [['Sonorous', 'makes a ringing sound'], ['Galvanisation', 'zinc coating on iron'], ['Lustre', 'shine']],
      traps: ['Graphite is a non-metal that conducts.', 'Mercury is a liquid metal.', 'Rusting needs both air and water.'],
      bridge: '<p>Class 8 and 10 study metals, non-metals and their reactions further.</p>'
    },
    explore: [
      { title: 'Property tester', intro: 'Choose an element and see its typical properties.',
        build(el, K) { const P = { iron: ['shiny', 'hard', 'yes', 'yes', 'good', 'yes'], copper: ['shiny', 'fairly hard', 'yes', 'yes (wires)', 'very good', 'yes'], aluminium: ['shiny', 'light, fairly hard', 'yes (foil)', 'yes', 'good', 'yes'], gold: ['shiny', 'soft', 'very', 'very', 'good', 'yes'], sulphur: ['dull yellow', 'brittle', 'no', 'no', 'poor', 'no'], 'carbon (coal)': ['dull', 'brittle', 'no', 'no', 'poor (graphite conducts)', 'no'], oxygen: ['gas', '—', '—', '—', 'poor', '—'], magnesium: ['shiny when fresh', 'fairly hard', 'yes', 'yes (ribbon)', 'good', 'yes'], iodine: ['lustrous (exception)', 'brittle', 'no', 'no', 'poor', 'no'], silver: ['shiny', 'soft', 'yes', 'yes', 'best', 'yes'] }; let k = 0; const row = K.row(el); K.select(row, 'element', EL.map(e => e[0]), i => { k = i; draw(); }); const rd = K.read(el);
          function draw() { const n = EL[k][0], p = P[n]; rd.innerHTML = `<b>${n}</b> — a <b>${EL[k][1] ? 'non-metal' : 'metal'}</b><table style="margin-top:6px">${['lustre', 'hardness', 'malleable', 'ductile', 'conductor', 'sonorous'].map((h, i) => `<tr><td style="padding:2px 10px">${h}</td><td style="padding:2px 10px"><b>${p[i]}</b></td></tr>`).join('')}</table>`; } draw(); return null; } },
      { title: 'Burning in oxygen', intro: 'Burn a metal and a non-metal; test the oxide with litmus. <kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Magnesium ribbon', 'Burns with a dazzling white flame (teacher demo, do not stare).'], ['White ash', 'Magnesium oxide forms; dissolve it in water.'], ['Litmus test', 'Red litmus turns blue — metal oxides are basic.'], ['Sulphur', 'Burn a little sulphur in a deflagrating spoon; it gives a gas.'], ['Sulphur dioxide', 'Dissolve the gas in water.'], ['Litmus test', 'Blue litmus turns red — non-metal oxides are acidic.']] }); } }
    ],
    gens: [
      { title: 'Metal or non-metal', gen(R) { return G9.S9.groupQ(R, EL, ['metal', 'non-metal'], 'Metal or non-metal: '); } },
      { title: 'Property name', gen(R) { return G9.S9.pickQ(R, [['Beaten into thin sheets — property?', 'malleability'], ['Drawn into wires — property?', 'ductility'], ['Makes a ringing sound — property?', 'sonority'], ['Shine — property?', 'lustre']]); } },
      { title: 'Oxide nature', gen(R) { const x = R.pick([['magnesium', 'basic'], ['sulphur', 'acidic'], ['calcium', 'basic'], ['carbon', 'acidic'], ['sodium', 'basic'], ['phosphorus', 'acidic']]); return { q: `The oxide of ${x[0]} dissolved in water is acidic or basic?`, a: x[1] }; } },
      { title: 'Rust prevention', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['What does rusting need?', 'iron, oxygen (air) and water'], ['What is galvanisation?', 'coating iron with zinc'], ['Why are iron gates painted?', 'paint keeps air and water out'], ['Why does iron rust faster near the sea?', 'moist, salty air speeds rusting']]); } },
      { title: 'Exceptions', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['A liquid metal?', 'mercury'], ['A non-metal that conducts electricity?', 'graphite'], ['A lustrous non-metal?', 'iodine'], ['A metal soft enough to cut with a knife?', 'sodium']]); } }
    ],
    quiz: [
      { q: 'Drawn into wires', o: ['ductile', 'malleable', 'brittle', 'sonorous'], a: 0, e: 'Wires.' }, { q: 'Metal oxides are', o: ['basic', 'acidic', 'neutral', 'gases always'], a: 0, e: 'Basic.' },
      { q: 'Sulphur dioxide in water', o: ['acidic', 'basic', 'neutral', 'metal'], a: 0, e: 'Acidic.' }, { q: 'Liquid metal', o: ['mercury', 'iron', 'sulphur', 'iodine'], a: 0, e: 'Hg.' },
      { q: 'Non-metal conductor', o: ['graphite', 'sulphur', 'oxygen', 'iodine'], a: 0, e: 'Graphite.' }, { q: 'Rusting needs', o: ['air and water', 'only air', 'only water', 'heat'], a: 0, e: 'Both.' },
      { q: 'Galvanising uses', o: ['zinc', 'gold', 'paint', 'oil'], a: 0, e: 'Zinc.' }, { q: 'Bells are made of metals because they are', o: ['sonorous', 'brittle', 'dull', 'soft'], a: 0, e: 'Ring.' },
      { q: 'Non-metals are usually', o: ['brittle', 'malleable', 'ductile', 'sonorous'], a: 0, e: 'Break.' }, { q: 'Aluminium foil shows', o: ['malleability', 'ductility', 'brittleness', 'sonority'], a: 0, e: 'Sheet.' },
      { q: 'Best conductor', o: ['silver', 'sulphur', 'wood', 'rubber'], a: 0, e: 'Silver.' }
    ],
    teach: {
      outcomes: ['Compare metals and non-metals', 'Test oxides with litmus', 'Prevent rusting'],
      periods: [{ t: 'Properties', flow: [['10 min', 'Hammer and wire demo.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Sound test with spoons.']] }, { t: 'Reactions', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Rust experiment setup.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['All metals are solid and hard.', 'All non-metals insulate.'], activities: ['Rust nails test.', 'Property chart.'],
      exit: ['Malleable vs ductile.', 'Oxide nature.', 'Two rust preventions.'], homework: 'Find 5 metal and 5 non-metal objects at home and note one use each.'
    },
    slides: [{ t: 'Metals and Non-metals', b: ['Physical properties', 'Exceptions', 'Oxides', 'Rusting'] }, { t: 'Think and share', b: ['Why are wires copper?', 'Why paint gates?'] }],
    fs: { groups: [['Metals', [['Lustre', 'shiny'], ['Malleable, ductile', 'yes'], ['Conduct', 'good'], ['Oxide', 'basic']]], ['Non-metals', [['Look', 'dull, brittle'], ['Conduct', 'poor (graphite exception)'], ['Oxide', 'acidic']]], ['Rust', [['Needs', 'air + water'], ['Prevent', 'paint, oil, galvanise']]]],
      ex: [['MgO + red litmus', 'blue'], ['SO₂ water + blue litmus', 'red']], rem: ['Learn exceptions.', 'Oxide tells type.', 'Protect iron.'] }
  });
})();
