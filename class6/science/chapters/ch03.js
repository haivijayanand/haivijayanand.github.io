/*
TOOL:    class6_science_ch03
FAMILY:  CBSE_REVISION / Class 6 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 3 Mindful Eating: A Path to a Healthy Body (nutrients, tests for starch protein fat, balanced diet, deficiency diseases, millets, junk food) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const DEF = [['vitamin A', 'night blindness', 'carrots, papaya, green leaves, milk'], ['vitamin C', 'scurvy (bleeding gums)', 'amla, lemon, orange, guava'], ['vitamin D', 'rickets (soft bones)', 'sunlight, milk, eggs'], ['vitamin B1', 'beriberi (weak muscles)', 'whole grains, pulses'], ['iron', 'anaemia (tiredness)', 'green leaves, jaggery, dates'], ['iodine', 'goitre (swollen neck)', 'iodised salt, sea food'], ['calcium', 'weak bones and teeth', 'milk, ragi, sesame']];
  G9.register({
    no: 3, part: 'All chapters', short: 'Nutrition', title: 'Mindful Eating: A Path to a Healthy Body',
    blurb: 'Food habits across India, nutrients (carbohydrates, proteins, fats, vitamins, minerals), dietary fibre and water, simple tests for starch, protein and fat, a balanced diet, deficiency diseases, millets and the harm of junk food.',
    revise: {
      oneLine: 'Food gives nutrients: carbohydrates and fats for energy, proteins for growth and repair, vitamins and minerals for protection; roughage and water help digestion. Starch turns blue-black with iodine; protein turns violet with copper sulphate + caustic soda; fat leaves a translucent patch on paper. A balanced diet prevents deficiency diseases.',
      sections: [
        { h: 'Tests', html: `<p>Starch: 2–3 drops of dilute iodine → blue-black. Protein: copper sulphate + sodium hydroxide → violet. Fat: rub on paper → oily translucent patch.</p>` },
        { h: 'Deficiency diseases', html: `<p>Vitamin A → night blindness; C → scurvy; D → rickets; B1 → beriberi; iron → anaemia; iodine → goitre.</p>` },
        { h: 'Mindful eating', html: `<p>Eat local, seasonal food and millets; eat slowly; limit sugar, salt, fried and packaged foods; drink water.</p>` }
      ],
      formulas: [['Carbohydrates, fats', 'energy'], ['Proteins', 'growth, repair'], ['Vitamins, minerals', 'protection'], ['Starch test', 'iodine → blue-black'], ['Fat test', 'translucent patch']],
      terms: [['Nutrient', 'useful component of food'], ['Roughage', 'fibre that helps digestion'], ['Deficiency disease', 'illness from lack of a nutrient']],
      traps: ['Fat is needed, but in moderation.', 'Overeating is also malnutrition.', 'Iodine test is for starch, not sugar.'],
      bridge: '<p>Class 7 studies digestion and nutrition in plants and animals.</p>'
    },
    explore: [
      { title: 'Food test lab', intro: 'Choose a food and a test; see the result.',
        build(el, K) { const FD = [['potato', 1, 0, 0], ['boiled egg white', 0, 1, 0], ['groundnut', 1, 1, 1], ['rice', 1, 0, 0], ['paneer', 0, 1, 1], ['ghee', 0, 0, 1], ['moong dal', 1, 1, 0], ['cucumber', 0, 0, 0]]; let f = 0, t = 0; const row = K.row(el); K.select(row, 'food', FD.map(x => x[0]), i => { f = i; draw(); }); K.select(row, 'test', ['iodine (starch)', 'copper sulphate + caustic soda (protein)', 'paper rub (fat)'], i => { t = i; draw(); }); const rd = K.read(el);
          function draw() { const pos = FD[f][t + 1]; const col = [pos ? '#1e1b4b' : '#b45309', pos ? '#7c3aed' : '#38bdf8', pos ? 'rgba(250,250,210,.6)' : '#fff'][t]; rd.innerHTML = `<div style="display:flex;align-items:center;gap:14px"><span style="width:60px;height:60px;border-radius:50%;border:2px solid var(--ink,#0f172a);background:${col};display:inline-block"></span><span><b>${FD[f][0]}</b> → ${['blue-black', 'violet', 'translucent oily patch'][t]}? <b>${pos ? 'YES' : 'no'}</b> — ${pos ? ['contains starch', 'contains protein', 'contains fat'][t] : ['no starch', 'little or no protein', 'no fat'][t]}</span></div>`; } draw(); return null; } },
      { title: 'Deficiency detective', intro: 'Choose a nutrient missing from the diet; see the disease and the foods that prevent it. <kbd>S</kbd> steps through all.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'lacking', DEF.map(d => d[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { const d = DEF[k]; rd.innerHTML = `lack of <b>${d[0]}</b> → <b>${d[1]}</b> · eat: ${d[2]}`; } const step = () => { k = (k + 1) % DEF.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } }
    ],
    gens: [
      { title: 'Deficiency', gen(R) { const d = R.pick(DEF); return R.chance(.5) ? { q: `Lack of ${d[0]} causes?`, a: d[1] } : { q: `Which nutrient is lacking in ${d[1]}?`, a: d[0] }; } },
      { title: 'Food test', gen(R) { return G9.S9.pickQ(R, [['Test for starch?', 'iodine solution → blue-black'], ['Test for protein?', 'copper sulphate + sodium hydroxide → violet'], ['Test for fat?', 'rub on paper → translucent patch'], ['A food turns blue-black with iodine. It contains?', 'starch']]); } },
      { title: 'Nutrient role', gen(R) { return G9.S9.groupQ(R, [['rice', 0], ['dal', 1], ['amla', 2], ['ghee', 0], ['egg', 1], ['spinach', 2]], ['energy (carbohydrate/fat)', 'body-building (protein)', 'protective (vitamins/minerals)'], 'Main role of '); } },
      { title: 'Energy count', levels: [2, 3], gen(R) { const c = R.int(30, 80), p = R.int(5, 20), f = R.int(5, 20); const e = 4 * c + 4 * p + 9 * f; return { q: `A meal has ${c} g carbohydrate, ${p} g protein and ${f} g fat. Energy? (carb 4, protein 4, fat 9 kcal per g)`, a: `${e} kcal`, ans: e }; } },
      { title: 'Mindful eating', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why are millets good choices?', 'rich in fibre, minerals; grow with less water'], ['Why limit packaged snacks?', 'too much salt, sugar, fat; few nutrients'], ['Why is roughage needed?', 'helps digestion, prevents constipation'], ['What is malnutrition?', 'too little or too much of some nutrients']]); } }
    ],
    quiz: [
      { q: 'Iodine turns starch', o: ['blue-black', 'violet', 'red', 'green'], a: 0, e: 'Starch test.' }, { q: 'Scurvy is due to lack of', o: ['vitamin C', 'vitamin D', 'iron', 'iodine'], a: 0, e: 'Gums.' },
      { q: 'Rickets is due to lack of', o: ['vitamin D', 'vitamin A', 'vitamin C', 'protein'], a: 0, e: 'Bones.' }, { q: 'Goitre is due to lack of', o: ['iodine', 'iron', 'calcium', 'fat'], a: 0, e: 'Thyroid.' },
      { q: 'Body-building nutrient', o: ['protein', 'fat', 'starch', 'water'], a: 0, e: 'Growth.' }, { q: 'Fat leaves on paper', o: ['translucent patch', 'blue spot', 'violet ring', 'nothing'], a: 0, e: 'Oil.' },
      { q: 'Anaemia: lack of', o: ['iron', 'iodine', 'vitamin C', 'fibre'], a: 0, e: 'Blood.' }, { q: 'Night blindness: lack of', o: ['vitamin A', 'vitamin B1', 'calcium', 'protein'], a: 0, e: 'Eyes.' },
      { q: 'Roughage helps', o: ['digestion', 'muscle building', 'eyesight', 'nothing'], a: 0, e: 'Fibre.' }, { q: 'Protein test colour', o: ['violet', 'blue-black', 'orange', 'yellow'], a: 0, e: 'Biuret.' },
      { q: 'Ragi is rich in', o: ['calcium', 'iodine', 'vitamin C', 'fat'], a: 0, e: 'Millet.' }
    ],
    teach: {
      outcomes: ['Name nutrients and roles', 'Test foods for starch, protein and fat', 'Link deficiencies to diseases'],
      periods: [{ t: 'Nutrients and tests', flow: [['10 min', 'Tiffin survey.'], ['15 min', 'Explore panel 1 / real tests (with teacher).'], ['15 min', 'Results table.']] }, { t: 'Balanced diet', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Plan a millet meal.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['All fat is bad.', 'Malnutrition = only hunger.'], activities: ['Food tests with teacher.', 'Mindful eating minute.'],
      exit: ['Starch test.', 'Two deficiency diseases.', 'Balanced plate.'], homework: 'Note your meals for 2 days and check for missing nutrient groups.'
    },
    slides: [{ t: 'Mindful Eating', b: ['Nutrients', 'Food tests', 'Deficiency diseases', 'Millets and mindful habits'] }, { t: 'Think and share', b: ['What causes scurvy?', 'How to test for fat?'] }],
    fs: { groups: [['Nutrients', [['Carbohydrate, fat', 'energy'], ['Protein', 'growth'], ['Vitamins, minerals', 'protection'], ['Roughage, water', 'digestion']]], ['Tests', [['Starch', 'iodine → blue-black'], ['Protein', 'CuSO₄ + NaOH → violet'], ['Fat', 'translucent patch']]], ['Deficiency', [['A', 'night blindness'], ['C', 'scurvy'], ['D', 'rickets'], ['Iron', 'anaemia'], ['Iodine', 'goitre']]]],
      ex: [['50 g carb + 10 g protein + 10 g fat', '330 kcal'], ['Bleeding gums', 'vitamin C']], rem: ['Eat a variety.', 'Choose millets and seasonal food.', 'Limit junk food.'] }
  });
})();
