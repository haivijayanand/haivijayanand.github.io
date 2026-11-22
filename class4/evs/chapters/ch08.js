/*
TOOL:    class4_science_ch08
FAMILY:  CBSE_REVISION / Class 4 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 8 How Things are Made (from raw material to product: cotton to cloth, wheat to bread, milk to curd, sugarcane to jaggery, paper) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const PR = { 'cotton → cloth': [['Grow and pick', 'cotton bolls are picked from the plant.'], ['Gin', 'seeds are separated from the fibres.'], ['Spin', 'fibres are twisted into thread (yarn).'], ['Weave', 'threads are woven on a loom into cloth.'], ['Dye and stitch', 'cloth is coloured and stitched into clothes.']],
    'wheat → roti': [['Harvest', 'wheat plants are cut and the grains separated.'], ['Clean and grind', 'grains are cleaned and ground into atta (flour).'], ['Knead', 'flour is mixed with water into dough.'], ['Roll and cook', 'dough balls are rolled and cooked on a tawa.']],
    'milk → curd': [['Boil', 'milk is boiled and cooled till lukewarm.'], ['Add starter', 'a spoon of old curd is added.'], ['Wait', 'kept warm for some hours; tiny helpful microbes work.'], ['Curd', 'milk sets into curd; churn it to get butter and buttermilk.']],
    'sugarcane → jaggery': [['Crush', 'sugarcane is crushed to get juice.'], ['Boil', 'juice is boiled in large pans.'], ['Thicken', 'it thickens as water evaporates.'], ['Set', 'it is cooled and set into blocks of gur.']] };
  G9.register({
    no: 8, part: 'Unit 4 · Things Around Us', short: 'How things are made', title: 'How Things are Made',
    blurb: 'Following things from raw material to product in steps: cotton to cloth, wheat to roti, milk to curd, sugarcane to jaggery, and recycled paper; the people and machines involved; handmade and factory-made goods.',
    revise: {
      oneLine: 'Most things we use go through many steps from a raw material: cotton is picked, ginned, spun into thread and woven into cloth; wheat is ground into flour; milk sets into curd with a little old curd; sugarcane juice is boiled into jaggery. Some steps are done by hand, some by machines.',
      sections: [
        { h: 'Raw material to product', html: `<p>Raw material → processing steps → finished product → transport → shop → us.</p>` },
        { h: 'Handmade and factory-made', html: `<p>Handloom cloth, clay pots and baskets are handmade; biscuits and plastic buckets are made in factories with machines.</p>` },
        { h: 'Recycled paper', html: `<p>Waste paper is soaked, made into pulp, spread on a screen, pressed and dried into new paper.</p>` }
      ],
      formulas: [['Cloth', 'pick → gin → spin → weave'], ['Roti', 'wheat → flour → dough → cook'], ['Curd', 'warm milk + curd starter'], ['Jaggery', 'crush → boil → set']],
      terms: [['Raw material', 'natural material we start with'], ['Process', 'step that changes it'], ['Product', 'finished thing']],
      traps: ['Products do not just come from shops — many people work on them.', 'Curd needs a starter and warmth.', 'Spinning makes thread; weaving makes cloth.'],
      bridge: '<p>Ch 9 shows how people in different lands make and use different things.</p>'
    },
    explore: [
      { title: 'From raw material to product', intro: 'Choose a product; press <kbd>S</kbd> or Play.',
        build(el, K) { let k = Object.keys(PR)[0]; const row = K.row(el); K.select(row, 'follow', Object.keys(PR), i => { k = Object.keys(PR)[i]; an.n = PR[k].length; an.reset(); }); const rd = K.read(el); const an = new K.Anim(5, i => draw(i), { ms: 1600 });
          function draw(i) { const s = PR[k]; i = Math.min(i, s.length - 1); rd.innerHTML = s.map((x, j) => `<div style="opacity:${j <= i ? 1 : 0.3}">${j + 1}. <b>${x[0]}</b> — ${x[1]}</div>`).join(''); } K.anim(el, an); draw(0); return an; } },
      { title: 'Handmade or factory-made?', intro: 'Sort the products (often both are possible — choose the usual one).',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Usually handmade', 'Usually factory-made'], items: [['clay diya', 0], ['bamboo basket', 0], ['handloom saree', 0], ['packet biscuits', 1], ['plastic bucket', 1], ['ball pen', 1], ['madhubani painting', 0], ['steel spoon', 1]] }); } }
    ],
    gens: [
      { title: 'Order the steps', gen(R) { return G9.S9.pickQ(R, [['Order: weave, pick cotton, spin, gin', 'pick → gin → spin → weave'], ['Order: cook, grind, knead, harvest', 'harvest → grind → knead → cook'], ['Order: boil, crush, set', 'crush → boil → set'], ['Order: add curd starter, boil milk, wait', 'boil milk → add starter → wait']]); } },
      { title: 'Raw material', gen(R) { return G9.S9.pickQ(R, [['Jaggery is made from?', 'sugarcane juice'], ['Atta is made from?', 'wheat'], ['Cotton cloth is made from?', 'cotton fibres'], ['Curd is made from?', 'milk'], ['Recycled paper is made from?', 'waste paper']]); } },
      { title: 'Spinning or weaving', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Twisting fibres into thread is called?', 'spinning'], ['Making cloth from threads on a loom is?', 'weaving'], ['Removing seeds from cotton is?', 'ginning']]); } },
      { title: 'Count', gen(R) { const k = R.int(2, 6), r = R.int(4, 9); return { q: `1 kg of wheat makes about ${r} rotis. How many rotis from ${k} kg?`, a: String(k * r * 1), ans: k * r }; } },
      { title: 'Recycle paper', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Steps to make recycled paper?', 'tear and soak → pulp → spread on screen → press → dry'], ['Why recycle paper?', 'saves trees, water and energy']]); } }
    ],
    quiz: [
      { q: 'Thread is made by', o: ['spinning', 'weaving', 'ginning', 'dyeing'], a: 0, e: 'Twisting.' }, { q: 'Cloth is made by', o: ['weaving', 'spinning', 'boiling', 'grinding'], a: 0, e: 'Loom.' },
      { q: 'Jaggery from', o: ['sugarcane', 'wheat', 'milk', 'cotton'], a: 0, e: 'Juice.' }, { q: 'Curd needs', o: ['warm milk and a starter', 'cold water', 'salt only', 'sugar only'], a: 0, e: 'Microbes.' },
      { q: 'Atta is', o: ['ground wheat', 'ground rice', 'milk powder', 'sugar'], a: 0, e: 'Flour.' }, { q: 'Removing cotton seeds', o: ['ginning', 'spinning', 'weaving', 'knitting'], a: 0, e: 'Gin.' },
      { q: 'Usually handmade', o: ['bamboo basket', 'plastic bucket', 'ball pen', 'biscuits'], a: 0, e: 'Craft.' }, { q: 'Recycled paper starts with', o: ['soaking waste paper', 'cutting trees', 'melting plastic', 'boiling milk'], a: 0, e: 'Pulp.' },
      { q: 'Raw material means', o: ['what we start with', 'finished thing', 'a shop', 'a machine'], a: 0, e: 'Start.' }, { q: 'Churning curd gives', o: ['butter', 'jaggery', 'cloth', 'paper'], a: 0, e: 'Butter.' },
      { q: 'Recycling paper saves', o: ['trees', 'plastic', 'nothing', 'oil only'], a: 0, e: 'Trees.' }
    ],
    teach: {
      outcomes: ['Trace products from raw materials', 'Order processing steps', 'Compare handmade and factory-made goods'],
      periods: [{ t: 'Process chains', flow: [['10 min', 'Where does my shirt come from?'], ['15 min', 'Explore panel 1.'], ['15 min', 'Make curd at home/class.']] }, { t: 'Making paper', flow: [['20 min', 'Recycled-paper activity.'], ['10 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Things come from shops.', 'Spinning = weaving.'], activities: ['Curd setting.', 'Paper-making.'],
      exit: ['Steps of cloth-making.', 'Raw material of gur.', 'One handmade item.'], homework: 'Pick one thing at home and draw its journey from raw material to you.'
    },
    slides: [{ t: 'How Things are Made', b: ['Raw material to product', 'Cotton to cloth', 'Wheat, milk, sugarcane', 'Handmade and factory-made'] }, { t: 'Think and share', b: ['What is spinning?', 'How is curd made?'] }],
    fs: { groups: [['Process chains', [['Cloth', 'pick, gin, spin, weave'], ['Roti', 'grind, knead, cook'], ['Curd', 'warm milk + starter'], ['Jaggery', 'crush, boil, set']]], ['Words', [['Raw material', 'start'], ['Process', 'step'], ['Product', 'finish']]], ['Paper', [['Recycle', 'soak, pulp, press, dry']]]],
      ex: [['3 kg wheat × 8 rotis/kg', '24 rotis'], ['Ginning', 'remove cotton seeds']], rem: ['Many hands make one product.', 'Order matters.', 'Recycle to save trees.'] }
  });
})();
