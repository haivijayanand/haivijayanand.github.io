/*
TOOL:    class4_science_ch06
FAMILY:  CBSE_REVISION / Class 4 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 6 Happy and Healthy Living (exercise and yoga, sleep, cleanliness, feelings, good touch and safety, first aid) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 6, part: 'Unit 3 · Health and Well-being', short: 'Healthy living', title: 'Happy and Healthy Living',
    blurb: 'Habits for a healthy body and a happy mind: daily exercise, yoga and outdoor play, good sleep, personal cleanliness, managing feelings, being kind, staying safe and simple first aid.',
    revise: {
      oneLine: 'Good food, clean habits, daily play or yoga and 9–10 hours of sleep keep our bodies healthy. Talking about feelings, being kind and spending time with family and friends keep our minds happy. Know simple first aid and tell a trusted adult if something feels unsafe.',
      sections: [
        { h: 'Body', html: `<p>Exercise strengthens muscles, heart and lungs. Yoga improves balance and calm. Wash hands, bathe, brush, cut nails.</p>` },
        { h: 'Mind', html: `<p>Feelings change; share them. Deep breathing helps when angry or worried. Kindness and helping make us happy.</p>` },
        { h: 'Safety and first aid', html: `<p>Small cut: wash with clean water, cover with a clean bandage. Burn: cool under running water for 10 minutes. Nosebleed: sit, lean forward, pinch the soft part of the nose.</p>` }
      ],
      formulas: [['Sleep', '9–10 hours'], ['Play / exercise', '1 hour a day'], ['Small cut', 'wash, cover'], ['Burn', 'cool water 10 min'], ['Nosebleed', 'lean forward, pinch']],
      terms: [['Hygiene', 'cleanliness for health'], ['First aid', 'help given before a doctor'], ['Yoga', 'postures and breathing for body and mind']],
      traps: ['Do not put butter or toothpaste on burns.', 'Do not tilt the head back for a nosebleed.', 'Unsafe touch must be told to a trusted adult.'],
      bridge: '<p>Ch 7 moves to how things around us work.</p>'
    },
    explore: [
      { title: 'First aid steps', intro: 'Choose an emergency; press <kbd>S</kbd> for each step.',
        build(el, K) { const FA = { 'small cut': [['Wash', 'rinse the cut with clean running water.'], ['Press', 'press gently with a clean cloth to stop bleeding.'], ['Cover', 'put on a clean bandage.'], ['Tell', 'tell an adult; see a doctor if it is deep.']], 'burn': [['Cool', 'hold under cool running water for about 10 minutes.'], ['No creams', 'do not put butter, ice or toothpaste.'], ['Cover', 'cover loosely with a clean cloth.'], ['Doctor', 'see a doctor for big or blistered burns.']], 'nosebleed': [['Sit', 'sit up and lean forward a little.'], ['Pinch', 'pinch the soft part of the nose for 10 minutes.'], ['Breathe', 'breathe through the mouth.'], ['Help', 'get help if it does not stop.']] }; let k = 'small cut'; const row = K.row(el); K.select(row, 'emergency', Object.keys(FA), i => { k = Object.keys(FA)[i]; an.reset(); }); const rd = K.read(el); const an = new K.Anim(4, i => draw(i), { ms: 1600 });
          function draw(i) { rd.innerHTML = FA[k].map((s, j) => `<div style="opacity:${j <= i ? 1 : 0.3}">${j + 1}. <b>${s[0]}</b> — ${s[1]}</div>`).join(''); } K.anim(el, an); draw(0); return an; } },
      { title: 'Healthy or unhealthy habit?', intro: 'Sort the habits.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Healthy', 'Unhealthy'], items: [['playing outdoors daily', 0], ['sleeping at 11 pm on school days', 1], ['washing hands before meals', 0], ['skipping breakfast', 1], ['doing yoga', 0], ['talking about worries', 0], ['watching screens for 4 hours', 1], ['sharing and helping', 0]] }); } }
    ],
    gens: [
      { title: 'Healthy habits', gen(R) { return G9.S9.groupQ(R, [['brushing twice a day', 0], ['eating chips daily', 1], ['sleeping 10 hours', 0], ['biting nails', 1], ['cycling to the park', 0]], ['healthy', 'unhealthy'], 'Healthy or unhealthy: '); } },
      { title: 'First aid', gen(R) { return G9.S9.pickQ(R, [['First aid for a small burn?', 'cool running water for about 10 minutes'], ['First aid for a nosebleed?', 'sit, lean forward, pinch the soft part of the nose'], ['First aid for a small cut?', 'wash with clean water, cover with a clean bandage'], ['Should you put toothpaste on a burn?', 'no']]); } },
      { title: 'Feelings', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['What can help when you feel angry?', 'deep breaths, count to 10, walk away, talk'], ['Whom can you tell about an unsafe touch?', 'parent, teacher or another trusted adult'], ['Name one thing that makes you happy.', 'any: playing with friends, helping others, music']]); } },
      { title: 'Hours', gen(R) { const s = R.int(8, 10), sc = R.int(6, 8), p = R.int(1, 2); return { q: `You sleep ${s} h, spend ${sc} h at school and play ${p} h. How many hours are left in the day?`, a: `${24 - s - sc - p} h`, ans: 24 - s - sc - p }; } },
      { title: 'Exercise', levels: [2, 3], gen(R) { const m = R.pick([15, 20, 30]), d = R.pick([5, 6, 7]); return { q: `You skip rope ${m} minutes a day for ${d} days. How many minutes in all? Is it more than 2 hours?`, a: `${m * d} min; ${m * d > 120 ? 'yes' : 'no'}`, ans: m * d }; } }
    ],
    quiz: [
      { q: 'Burn first aid', o: ['cool water 10 min', 'butter', 'toothpaste', 'ice directly'], a: 0, e: 'Cool.' }, { q: 'Nosebleed: lean', o: ['forward', 'back', 'sideways only', 'lie flat'], a: 0, e: 'Forward.' },
      { q: 'Children need sleep of about', o: ['9–10 hours', '4 hours', '15 hours', '1 hour'], a: 0, e: 'Growth.' }, { q: 'Yoga helps', o: ['balance and calm', 'only sleep', 'nothing', 'make us lazy'], a: 0, e: 'Body and mind.' },
      { q: 'Unsafe touch', o: ['tell a trusted adult', 'keep secret', 'ignore', 'laugh'], a: 0, e: 'Tell.' }, { q: 'Small cut: first', o: ['wash with clean water', 'put mud', 'ignore', 'scratch'], a: 0, e: 'Clean.' },
      { q: 'Healthy habit', o: ['outdoor play', 'late nights', 'skipping meals', 'long screen time'], a: 0, e: 'Active.' }, { q: 'When worried', o: ['talk to someone', 'stay silent always', 'shout', 'stop eating'], a: 0, e: 'Share.' },
      { q: 'Exercise strengthens', o: ['heart, lungs, muscles', 'only hair', 'nothing', 'nails'], a: 0, e: 'Fitness.' }, { q: 'Kindness makes us', o: ['happy', 'sad', 'ill', 'tired'], a: 0, e: 'Joy.' },
      { q: 'First aid is', o: ['help before a doctor', 'surgery', 'medicine only', 'a game'], a: 0, e: 'Immediate help.' }
    ],
    teach: {
      outcomes: ['Practise healthy habits', 'Give simple first aid', 'Express feelings and seek help'],
      periods: [{ t: 'Healthy body', flow: [['10 min', 'Simple yoga.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Habit chart.']] }, { t: 'First aid and feelings', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Feelings role-play.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Toothpaste on burns.', 'Head back for nosebleed.'], activities: ['Class first-aid box.', 'Feelings jar.'],
      exit: ['First aid for a burn.', 'Two healthy habits.', 'Whom to tell when unsafe.'], homework: 'Teach your family one first-aid step and one yoga pose.'
    },
    slides: [{ t: 'Happy and Healthy Living', b: ['Exercise, yoga, sleep', 'Cleanliness', 'Feelings and kindness', 'Safety and first aid'] }, { t: 'Think and share', b: ['First aid for a nosebleed?', 'What helps you calm down?'] }],
    fs: { groups: [['Healthy body', [['Play', '1 h a day'], ['Sleep', '9–10 h'], ['Clean', 'hands, teeth, bath, nails']]], ['Happy mind', [['Feelings', 'talk to someone'], ['Calm', 'deep breaths'], ['Kindness', 'help others']]], ['First aid', [['Cut', 'wash, press, cover'], ['Burn', 'cool water 10 min'], ['Nosebleed', 'lean forward, pinch']]]],
      ex: [['9 + 7 + 2 hours', '6 hours left'], ['Burn', 'cool water, no paste']], rem: ['Cool, not cream, for burns.', 'Lean forward for nosebleeds.', 'Tell a trusted adult.'] }
  });
})();
