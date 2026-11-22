/*
TOOL:    class5_science_ch03
FAMILY:  CBSE_REVISION / Class 5 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 3 The Mystery of Food (taste and digestion, journey of food, spoiling and preserving, microbes, food from far and near) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 3, part: 'Unit 2 · Health and Well-being', short: 'Food', title: 'The Mystery of Food',
    blurb: 'How we taste and digest food: the tongue and smell, chewing and saliva, the journey of food through the body; why food spoils, how tiny microbes both spoil and help (curd, idli batter), ways to preserve food, and food that travels to us.',
    revise: {
      oneLine: 'Food is tasted by the tongue (sweet, salty, sour, bitter) with help from the nose. Digestion begins in the mouth — chewing and saliva break food down — then food passes down the food pipe to the stomach and intestines, where nutrients are absorbed. Tiny living things called microbes spoil food, but some help make curd and ferment idli batter. Drying, salting, cooling and pickling slow spoiling.',
      sections: [
        { h: 'Journey of food', html: `<p>Mouth (teeth, saliva) → food pipe → stomach (churns with juices) → small intestine (absorbs nutrients) → large intestine (absorbs water) → waste leaves the body.</p>` },
        { h: 'Microbes', html: `<p>Too small to see. Harmful ones spoil food and cause illness; helpful ones make curd, ferment batter and dough.</p>` },
        { h: 'Preserving', html: `<p>Drying (papad, dry fish), salt and oil (pickles), sugar (jams), cooling (fridge), boiling.</p>` }
      ],
      formulas: [['Tastes', 'sweet, salty, sour, bitter'], ['Path', 'mouth → food pipe → stomach → intestines'], ['Spoil', 'microbes, warmth, moisture'], ['Preserve', 'dry, salt, sugar, cool, boil']],
      terms: [['Saliva', 'mouth juice that starts digestion'], ['Digestion', 'breaking food into simple parts'], ['Microbe', 'tiny living thing seen only with a microscope']],
      traps: ['Not all microbes are harmful.', 'Smell helps taste — a blocked nose makes food taste dull.', 'Food can spoil without looking bad.'],
      bridge: '<p>Ch 4 is about keeping our school happy and healthy.</p>'
    },
    explore: [
      { title: 'Journey of food', intro: 'Press <kbd>S</kbd> to follow a bite of roti.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Mouth', 'teeth chew; saliva wets and starts breaking down starch — chew a roti long and it tastes sweet.'], ['Food pipe', 'a tube carries the swallowed food to the stomach.'], ['Stomach', 'churns food with digestive juices for a few hours.'], ['Small intestine', 'long, coiled tube; useful nutrients pass into the blood.'], ['Large intestine', 'water is taken back; the rest leaves as waste.']] }); } },
      { title: 'Spoil or stay fresh?', intro: 'Set the conditions; see how long cooked rice stays safe.',
        build(el, K) { let t = 1, cov = 1; const row = K.row(el); K.select(row, 'kept', ['in a fridge', 'on a warm kitchen shelf', 'in hot sun'], i => { t = i; draw(); }); K.select(row, 'covered?', ['no', 'yes'], i => { cov = i; draw(); }); row.querySelectorAll('select')[1].value = 1; const rd = K.read(el);
          function draw() { const hrs = [48, 8, 3][t] * (cov ? 1 : 0.6); rd.innerHTML = `cooked rice ${['in a fridge', 'on a warm shelf', 'in hot sun'][t]}, ${cov ? 'covered' : 'open'}: eat within about <b>${Math.round(hrs)} hours</b> · ${t ? 'warmth helps microbes grow fast' : 'cold slows microbes'}${cov ? '' : ' · open food gets dust and flies'} <br><span class="muted">(rough guide to compare conditions — when in doubt, do not eat)</span>`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Tastes', gen(R) { return G9.S9.pickQ(R, [['Taste of lemon?', 'sour'], ['Taste of bitter gourd (karela)?', 'bitter'], ['Taste of jaggery?', 'sweet'], ['Taste of chips?', 'salty'], ['Why does food taste dull when you have a cold?', 'the blocked nose cannot smell']]); } },
      { title: 'Digestion order', gen(R) { return G9.S9.pickQ(R, [['Order: stomach, mouth, small intestine, food pipe', 'mouth → food pipe → stomach → small intestine'], ['Where does digestion begin?', 'in the mouth'], ['Where are nutrients absorbed?', 'small intestine'], ['What does the large intestine take back?', 'water']]); } },
      { title: 'Microbes', gen(R) { return G9.S9.groupQ(R, [['making curd', 0], ['fermenting idli batter', 0], ['bread going mouldy', 1], ['milk turning sour in heat', 1], ['raising dough for bhatura', 0]], ['helpful microbes', 'harmful / spoiling microbes'], 'Helpful or spoiling microbes: '); } },
      { title: 'Preserve', levels: [2, 3], gen(R) { return G9.S9.groupQ(R, [['mango pickle', 0], ['papad', 1], ['amla murabba', 2], ['milk in the fridge', 3]], ['salt and oil', 'drying', 'sugar', 'cooling'], 'How is this preserved: '); } },
      { title: 'Chew count', levels: [2, 3], gen(R) { const b = R.int(10, 20), c = R.pick([20, 25, 30]); return { q: `If you chew each bite ${c} times and eat ${b} bites, how many chews?`, a: String(b * c), ans: b * c }; } }
    ],
    quiz: [
      { q: 'Digestion begins in the', o: ['mouth', 'stomach', 'intestine', 'food pipe'], a: 0, e: 'Saliva.' }, { q: 'Nutrients are absorbed in the', o: ['small intestine', 'mouth', 'food pipe', 'teeth'], a: 0, e: 'Absorption.' },
      { q: 'Curd is made by', o: ['helpful microbes', 'salt', 'ice', 'sunlight'], a: 0, e: 'Fermentation.' }, { q: 'Lemon tastes', o: ['sour', 'sweet', 'bitter', 'salty'], a: 0, e: 'Acid.' },
      { q: 'Papad is preserved by', o: ['drying', 'freezing', 'sugar', 'boiling'], a: 0, e: 'Dry.' }, { q: 'Food spoils faster when', o: ['warm and open', 'cold and covered', 'frozen', 'dry'], a: 0, e: 'Microbes.' },
      { q: 'Microbes can be seen with', o: ['a microscope', 'naked eye', 'glasses', 'a mirror'], a: 0, e: 'Tiny.' }, { q: 'Large intestine takes back', o: ['water', 'teeth', 'saliva', 'food pipe'], a: 0, e: 'Water.' },
      { q: 'Pickles last because of', o: ['salt and oil', 'water', 'sunlight only', 'sugar only'], a: 0, e: 'Preservatives.' }, { q: 'Blocked nose makes food taste', o: ['dull', 'sweeter', 'saltier', 'better'], a: 0, e: 'Smell matters.' },
      { q: 'Food pipe carries food to', o: ['stomach', 'lungs', 'heart', 'brain'], a: 0, e: 'Oesophagus.' }
    ],
    teach: {
      outcomes: ['Trace the journey of food', 'Explain helpful and harmful microbes', 'Describe ways to preserve food'],
      periods: [{ t: 'Taste and digestion', flow: [['10 min', 'Chew roti 30 times — notice sweetness.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Taste-and-smell test.']] }, { t: 'Spoiling and preserving', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Bread mould observation (sealed bag).'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['All microbes are bad.', 'Digestion only in the stomach.'], activities: ['Set curd in class.', 'Food preservation survey at home.'],
      exit: ['Order the digestive path.', 'One helpful microbe use.', 'Two preserving methods.'], homework: 'List 5 preserved foods in your kitchen and how each is preserved.'
    },
    slides: [{ t: 'The Mystery of Food', b: ['Taste and smell', 'Journey of food', 'Microbes: helpful and harmful', 'Preserving food'] }, { t: 'Think and share', b: ['Where are nutrients absorbed?', 'How is papad preserved?'] }],
    fs: { groups: [['Digestion', [['Mouth', 'teeth, saliva'], ['Stomach', 'churns with juices'], ['Small intestine', 'absorbs nutrients'], ['Large intestine', 'absorbs water']]], ['Microbes', [['Helpful', 'curd, idli batter, dough'], ['Harmful', 'spoil food, illness']]], ['Preserve', [['Dry', 'papad'], ['Salt, oil', 'pickle'], ['Sugar', 'murabba'], ['Cool', 'fridge']]]],
      ex: [['15 bites × 30 chews', '450 chews'], ['Curd', 'helpful microbes']], rem: ['Chew well.', 'Cover and cool food.', 'Not all microbes are bad.'] }
  });
})();
