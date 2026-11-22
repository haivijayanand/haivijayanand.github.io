/*
TOOL:    class3_science_ch03
FAMILY:  CBSE_REVISION / Class 3 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 3 Celebrating Festivals (festivals across India, seasons and harvests, food, clothes, sharing, eco-friendly celebration) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const FEST = [['Pongal / Makar Sankranti / Lohri / Bihu', 'January', 'harvest; kites, bonfires, sweet rice'], ['Holi', 'March', 'spring; colours'], ['Baisakhi / Vishu / Puthandu', 'April', 'harvest and new year'], ['Eid', 'changes with the moon', 'prayers, sewaiyan, sharing'], ['Onam', 'August–September', 'harvest; pookalam, boat races, sadya'], ['Durga Puja / Navratri / Dussehra', 'October', 'good over evil; dances'], ['Diwali', 'October–November', 'lamps, sweets'], ['Christmas', 'December', 'star, cake, carols'], ['Guru Nanak Jayanti', 'November', 'langar, prayers']];
  G9.register({
    no: 3, part: 'All chapters', short: 'Festivals', title: 'Celebrating Festivals',
    blurb: 'Festivals celebrated across India, how many are linked to seasons and harvests, special food, clothes, songs and dances, sharing with neighbours, and celebrating in ways that do not harm people, animals or nature.',
    revise: {
      oneLine: 'India celebrates many festivals. Several mark seasons and harvests — Pongal, Lohri, Bihu, Onam, Baisakhi. Festivals bring special food, clothes, music and sharing. We can celebrate with clay lamps, natural colours and less noise and waste.',
      sections: [
        { h: 'Same festival, many names', html: `<p>The January harvest festival is Pongal in Tamil Nadu, Makar Sankranti in many states, Lohri in Punjab and Bihu (Magh Bihu) in Assam.</p>` },
        { h: 'Sharing', html: `<p>We visit neighbours, share sweets and food (langar, prasad, sewaiyan), and help with decorations.</p>` },
        { h: 'Eco-friendly', html: `<p>Clay diyas, flower rangoli, natural colours, cloth decorations; avoid loud crackers that scare animals and dirty the air.</p>` }
      ],
      formulas: [['Harvest festivals', 'Pongal, Lohri, Bihu, Onam, Baisakhi'], ['Festival of lights', 'Diwali'], ['Festival of colours', 'Holi'], ['Langar', 'free shared meal at a gurdwara']],
      terms: [['Harvest', 'gathering ripe crops'], ['Rangoli / pookalam', 'floor designs'], ['Eco-friendly', 'not harmful to nature']],
      traps: ['Festivals are not only religious — many are about seasons and harvests.', 'Loud crackers hurt animals, babies and elders.', 'Chemical colours harm skin.'],
      bridge: '<p>Ch 4 and 5 move to plants and animals around us.</p>'
    },
    explore: [
      { title: 'Festival calendar', intro: 'Press <kbd>S</kbd> (or Play) to move through the year.',
        build(el, K) { return G9.S9.stages(el, K, { stages: FEST.map(f => [f[0], `${f[1]} — ${f[2]}.`]), ms: 1800 }); } },
      { title: 'Eco-friendly or not?', intro: 'Sort the ways of celebrating.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Eco-friendly', 'Harmful'], items: [['clay diyas', 0], ['flower rangoli', 0], ['loud crackers', 1, 'noise and smoke scare animals and harm lungs'], ['natural colours from flowers', 0], ['plastic decorations thrown away', 1], ['cloth bags for gifts', 0], ['chemical colours', 1, 'can hurt skin and eyes'], ['sharing leftover food', 0]] }); } }
    ],
    gens: [
      { title: 'Which festival?', gen(R) { return G9.S9.pickQ(R, [['Festival of lights?', 'Diwali'], ['Festival of colours?', 'Holi'], ['Harvest festival of Kerala with pookalam?', 'Onam'], ['Harvest festival of Assam?', 'Bihu'], ['Harvest festival of Tamil Nadu?', 'Pongal'], ['Festival in Punjab with a bonfire in January?', 'Lohri']]); } },
      { title: 'Festival food', gen(R) { return G9.S9.pickQ(R, [['Sweet dish made at Eid?', 'sewaiyan'], ['Free meal served at a gurdwara?', 'langar'], ['Rice dish cooked at Pongal?', 'pongal (sweet rice)'], ['Feast served on a banana leaf at Onam?', 'sadya'], ['Cake is common at which festival?', 'Christmas']]); } },
      { title: 'Eco-friendly', gen(R) { return G9.S9.pickQ(R, [['Name one eco-friendly way to celebrate Diwali.', 'clay diyas, no loud crackers'], ['Why avoid loud crackers?', 'noise and smoke harm animals, babies, elders and air'], ['Better colours for Holi?', 'natural colours from flowers and leaves'], ['How can we reduce festival waste?', 'cloth decorations, share food, no plastic']]); } },
      { title: 'Harvest', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why are many festivals held at harvest time?', 'farmers celebrate and give thanks for new crops'], ['What is a harvest?', 'cutting and gathering ripe crops'], ['Name two harvest festivals.', 'any two: Pongal, Lohri, Bihu, Onam, Baisakhi']]); } },
      { title: 'Count the days', levels: [2, 3], gen(R) { const d = R.int(3, 10); return { q: `A festival lasts ${d} days and starts on the 12th. On which date does it end?`, a: `${11 + d}th`, ans: 11 + d }; } }
    ],
    quiz: [
      { q: 'Festival of lights', o: ['Diwali', 'Holi', 'Onam', 'Lohri'], a: 0, e: 'Lamps.' }, { q: 'Harvest festival of Kerala', o: ['Onam', 'Lohri', 'Bihu', 'Holi'], a: 0, e: 'Pookalam.' },
      { q: 'Langar is', o: ['a shared free meal', 'a dance', 'a kite', 'a lamp'], a: 0, e: 'Gurdwara.' }, { q: 'Eco-friendly lamp', o: ['clay diya', 'plastic lamp', 'tyre fire', 'cracker'], a: 0, e: 'Clay.' },
      { q: 'Loud crackers', o: ['scare animals and pollute', 'help birds', 'clean air', 'are quiet'], a: 0, e: 'Harmful.' }, { q: 'Bihu is from', o: ['Assam', 'Punjab', 'Kerala', 'Gujarat'], a: 0, e: 'Assam.' },
      { q: 'Lohri has a', o: ['bonfire', 'boat race', 'snowman', 'cake'], a: 0, e: 'Punjab.' }, { q: 'Many festivals mark', o: ['seasons and harvests', 'exams', 'cricket', 'nothing'], a: 0, e: 'Nature.' },
      { q: 'Sewaiyan is made at', o: ['Eid', 'Christmas', 'Pongal', 'Onam'], a: 0, e: 'Sweet vermicelli.' }, { q: 'Natural Holi colours come from', o: ['flowers and leaves', 'paint', 'chemicals', 'plastic'], a: 0, e: 'Safe.' },
      { q: 'Festivals help us', o: ['share and meet people', 'fight', 'stay alone', 'waste food'], a: 0, e: 'Togetherness.' }
    ],
    teach: {
      outcomes: ['Name festivals from different regions', 'Link festivals to seasons and harvests', 'Suggest eco-friendly ways to celebrate'],
      periods: [{ t: 'Our festivals', flow: [['10 min', 'Children share a festival they love.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Food, clothes and songs chart.']] }, { t: 'Green festivals', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Make a flower rangoli design.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Only one way to celebrate.', 'Crackers are harmless.'], activities: ['Class festival calendar.', 'Recipe sharing from homes.'],
      exit: ['Two harvest festivals.', 'One eco-friendly idea.', 'A festival food.'], homework: 'Ask an elder how a festival was celebrated when they were a child. Write two differences.'
    },
    slides: [{ t: 'Celebrating Festivals', b: ['Festivals across India', 'Seasons and harvests', 'Food and sharing', 'Eco-friendly celebration'] }, { t: 'Think and share', b: ['Your favourite festival?', 'How can it be greener?'] }],
    fs: { groups: [['Harvest festivals', [['Pongal', 'Tamil Nadu'], ['Lohri', 'Punjab'], ['Bihu', 'Assam'], ['Onam', 'Kerala'], ['Baisakhi', 'Punjab']]], ['Festival food', [['Langar', 'gurdwara'], ['Sewaiyan', 'Eid'], ['Sadya', 'Onam']]], ['Green ways', [['Clay diyas', 'not plastic'], ['Natural colours', 'not chemical'], ['No loud crackers', 'animals, air']]]],
      ex: [['January harvest', 'Pongal, Lohri, Bihu, Sankranti'], ['Diwali, green way', 'clay diyas, no crackers']], rem: ['Many names, one season.', 'Share with neighbours.', 'Celebrate without harm.'] }
  });
})();
