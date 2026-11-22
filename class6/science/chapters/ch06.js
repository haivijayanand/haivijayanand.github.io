/*
TOOL:    class6_science_ch06
FAMILY:  CBSE_REVISION / Class 6 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 6 Materials Around Us (objects and materials, properties: appearance, hardness, solubility, floating, transparency, choosing materials) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 6, part: 'All chapters', short: 'Materials', title: 'Materials Around Us',
    blurb: 'Objects and the materials they are made of, grouping materials by properties — lustre, hardness, solubility in water, floating or sinking, transparency (transparent, translucent, opaque) — and choosing the right material for a use.',
    revise: {
      oneLine: 'Objects are made of materials. Materials differ in properties: shiny (lustrous) or dull, hard or soft, soluble or insoluble in water, float or sink, transparent, translucent or opaque. We group materials by these properties and choose them to suit their use — glass for windows, steel for utensils, cotton for clothes.',
      sections: [
        { h: 'Properties', html: `<p>Lustre: metals shine. Hardness: iron is hard, cotton soft. Solubility: salt and sugar dissolve; sand and chalk do not. Floating: wood and oil float; stone sinks.</p>` },
        { h: 'Light through materials', html: `<p>Transparent: clear glass, water (see clearly). Translucent: butter paper, frosted glass (see partly). Opaque: wood, metal (cannot see through).</p>` },
        { h: 'Choose wisely', html: `<p>Cooking pot: metal (hard, conducts heat). Raincoat: plastic (waterproof). Window: glass (transparent).</p>` }
      ],
      formulas: [['Lustrous', 'shiny (metals)'], ['Soluble', 'dissolves in water'], ['Transparent / translucent / opaque', 'clear / partly / none'], ['Float', 'wood, oil, ice']],
      terms: [['Material', 'what an object is made of'], ['Property', 'a feature of a material'], ['Soluble', 'disappears in water, spreads evenly']],
      traps: ['One object can be made of many materials.', 'Some liquids (oil) do not mix with water.', 'Freshly cut metals shine; old surfaces may look dull.'],
      bridge: '<p>Ch 9 separates materials from mixtures.</p>'
    },
    explore: [
      { title: 'Material property tester', intro: 'Choose a material and see its properties.',
        build(el, K) { const M = [['iron', 'lustrous', 'hard', 'insoluble', 'sinks', 'opaque'], ['wood', 'dull', 'hard', 'insoluble', 'floats', 'opaque'], ['salt', 'dull', 'hard crystals', 'soluble', 'sinks then dissolves', 'translucent crystals'], ['sugar', 'dull', 'hard crystals', 'soluble', 'sinks then dissolves', 'translucent crystals'], ['sand', 'dull', 'hard grains', 'insoluble', 'sinks', 'opaque'], ['glass', 'lustrous', 'hard', 'insoluble', 'sinks', 'transparent'], ['butter paper', 'dull', 'soft', 'insoluble', 'floats', 'translucent'], ['cooking oil', 'shiny', 'liquid', 'does not mix', 'floats on water', 'transparent']]; let k = 0; const row = K.row(el); K.select(row, 'material', M.map(m => m[0]), i => { k = i; draw(); }); const rd = K.read(el);
          function draw() { const m = M[k]; rd.innerHTML = `<b>${m[0]}</b><table style="margin-top:6px">${['appearance', 'hardness', 'in water', 'float/sink', 'light'].map((h, i) => `<tr><td style="padding:2px 10px">${h}</td><td style="padding:2px 10px"><b>${m[i + 1]}</b></td></tr>`).join('')}</table>`; } draw(); return null; } },
      { title: 'Transparent, translucent or opaque?', intro: 'Sort.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Transparent', 'Translucent', 'Opaque'], items: [['clear glass', 0], ['clean water', 0], ['butter paper', 1], ['frosted glass', 1], ['oiled paper', 1], ['wooden door', 2], ['steel plate', 2], ['cardboard', 2], ['polythene (clear)', 0]] }); } }
    ],
    gens: [
      { title: 'Soluble?', gen(R) { return G9.S9.groupQ(R, [['sugar', 0], ['sand', 1], ['salt', 0], ['chalk powder', 1], ['lemon juice', 0], ['sawdust', 1]], ['soluble in water', 'insoluble in water'], 'Soluble or insoluble: '); } },
      { title: 'Light', gen(R) { return G9.S9.groupQ(R, [['glass window', 0], ['tracing paper', 1], ['brick wall', 2], ['air', 0], ['frosted bathroom glass', 1], ['book', 2]], ['transparent', 'translucent', 'opaque'], 'Transparent, translucent or opaque: '); } },
      { title: 'Choose a material', gen(R) { return G9.S9.pickQ(R, [['Best material for a cooking pot and why?', 'metal — hard, does not burn, conducts heat'], ['Best material for a window?', 'glass — transparent'], ['Best for a raincoat?', 'plastic — waterproof'], ['Best for summer clothes?', 'cotton — soft, absorbs sweat']]); } },
      { title: 'Float or sink', levels: [2, 3], gen(R) { return G9.S9.groupQ(R, [['wooden block', 0], ['iron nail', 1], ['ice cube', 0], ['stone', 1], ['cork', 0], ['coin', 1]], ['floats', 'sinks'], 'Floats or sinks in water: '); } },
      { title: 'Dissolve count', levels: [2, 3], gen(R) { const s = R.int(3, 8), sp = R.int(2, 5); return { q: `${s} spoons of sugar dissolve in a glass of water. How many spoons dissolve in ${sp} such glasses (same temperature)?`, a: String(s * sp), ans: s * sp }; } }
    ],
    quiz: [
      { q: 'Lustrous materials', o: ['shine', 'are dull', 'dissolve', 'float'], a: 0, e: 'Metals.' }, { q: 'Sugar in water is', o: ['soluble', 'insoluble', 'floating', 'opaque'], a: 0, e: 'Dissolves.' },
      { q: 'Butter paper is', o: ['translucent', 'transparent', 'opaque', 'lustrous'], a: 0, e: 'Partly see.' }, { q: 'Wood in water', o: ['floats', 'sinks', 'dissolves', 'melts'], a: 0, e: 'Less dense.' },
      { q: 'Opaque', o: ['cardboard', 'glass', 'water', 'air'], a: 0, e: 'No light.' }, { q: 'Sand in water is', o: ['insoluble', 'soluble', 'gas', 'transparent'], a: 0, e: 'Settles.' },
      { q: 'Window glass is chosen because it is', o: ['transparent', 'opaque', 'soft', 'soluble'], a: 0, e: 'Light.' }, { q: 'Oil and water', o: ['do not mix', 'mix fully', 'become solid', 'turn gas'], a: 0, e: 'Layers.' },
      { q: 'Hard material', o: ['iron', 'cotton', 'sponge', 'wool'], a: 0, e: 'Hard.' }, { q: 'Material means', o: ['what an object is made of', 'the object’s shape', 'its use', 'its colour'], a: 0, e: 'Stuff.' },
      { q: 'Frosted glass is', o: ['translucent', 'transparent', 'opaque', 'liquid'], a: 0, e: 'Blurry view.' }
    ],
    teach: {
      outcomes: ['Group materials by properties', 'Classify transparency', 'Choose materials for uses'],
      periods: [{ t: 'Properties', flow: [['10 min', 'Material hunt in class.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Dissolving and floating tests.']] }, { t: 'Light and choice', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Design a lunch box: materials.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['All metals are hard and shiny always.', 'Oil dissolves in water.'], activities: ['Torch transparency test.', 'Sink-float table.'],
      exit: ['Two soluble, two insoluble.', 'One of each transparency type.', 'Material for a pot and why.'], homework: 'Make a table of 10 home objects: material, two properties, use.'
    },
    slides: [{ t: 'Materials Around Us', b: ['Objects and materials', 'Properties', 'Transparency', 'Choosing materials'] }, { t: 'Think and share', b: ['Is chalk soluble?', 'Why glass windows?'] }],
    fs: { groups: [['Properties', [['Lustre', 'shiny / dull'], ['Hardness', 'hard / soft'], ['Solubility', 'sugar yes, sand no'], ['Float / sink', 'wood floats, stone sinks']]], ['Light', [['Transparent', 'glass, water'], ['Translucent', 'butter paper'], ['Opaque', 'wood, metal']]], ['Uses', [['Pot', 'metal'], ['Window', 'glass'], ['Raincoat', 'plastic']]]],
      ex: [['Butter paper', 'translucent'], ['Sugar', 'soluble']], rem: ['Test, then group.', 'One object, many materials.', 'Choose by property.'] }
  });
})();
