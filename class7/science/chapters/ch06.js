/*
TOOL:    class7_science_ch06
FAMILY:  CBSE_REVISION / Class 7 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 6 Adolescence: A Stage of Growth and Change (puberty, physical and emotional changes, hormones, hygiene, nutrition, myths, seeking help) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 6, part: 'All chapters', short: 'Adolescence', title: 'Adolescence: A Stage of Growth and Change',
    blurb: 'Adolescence and puberty: growth spurt, voice and body changes, the role of hormones, emotional and social changes, personal hygiene, nutrition and exercise, busting myths, and talking to trusted adults.',
    revise: {
      oneLine: 'Adolescence (roughly 10–19 years) is the period of change from childhood to adulthood; puberty is when the body becomes capable of reproduction. Hormones cause a growth spurt, voice changes, new hair growth, more active sweat and oil glands (pimples) and emotional ups and downs. Good hygiene, balanced food (protein, iron, calcium), exercise, sleep and talking to trusted adults help.',
      sections: [
        { h: 'Body changes', html: `<p>Height increases quickly; shoulders broaden in boys and hips widen in girls; voice deepens (larynx grows, Adam’s apple); hair in armpits; pimples from oil glands.</p>` },
        { h: 'Feelings', html: `<p>Mood swings, new friendships, wish for independence, worry about looks — all normal. Talk to parents, teachers or a counsellor.</p>` },
        { h: 'Healthy habits', html: `<p>Daily bath, clean clothes, menstrual hygiene, iron-rich food to prevent anaemia, milk/ragi for calcium, outdoor activity, no tobacco, alcohol or drugs.</p>` }
      ],
      formulas: [['Adolescence', '≈ 10–19 years'], ['Puberty', 'body becomes able to reproduce'], ['Hormones', 'chemical messengers'], ['Needs', 'protein, iron, calcium']],
      terms: [['Hormone', 'chemical messenger made by glands'], ['Growth spurt', 'rapid gain in height'], ['Hygiene', 'habits that keep us clean and healthy']],
      traps: ['Everyone changes at a different pace — that is normal.', 'Pimples are not caused by dirt alone.', 'Myths should be checked with doctors or teachers.'],
      bridge: '<p>Class 8 studies reproduction and adolescence in more depth.</p>'
    },
    explore: [
      { title: 'Myth or fact?', intro: 'Choose a statement; see whether it is a myth or a fact. <kbd>S</kbd> steps.',
        build(el, K) { const MF = [['Everyone grows at the same rate.', 'myth', 'growth timing differs; all are normal'], ['Hormones cause many changes in adolescence.', 'fact', 'chemical messengers from glands'], ['Exercise during adolescence is harmful.', 'myth', 'exercise builds strong bones and muscles'], ['Iron-rich food helps prevent anaemia.', 'fact', 'green leaves, jaggery, dates, pulses'], ['Mood swings are a sign of weakness.', 'myth', 'they are common; talking helps'], ['Voice deepens because the larynx grows.', 'fact', 'more noticeable in boys'], ['You should not talk about body changes.', 'myth', 'trusted adults can help']]; let k = 0; const row = K.row(el); const sel = K.select(row, 'statement', MF.map((m, i) => `${i + 1}. ${m[0]}`), i => { k = i; draw(); }); const rd = K.read(el); function draw() { const m = MF[k]; rd.innerHTML = `<b>${m[1].toUpperCase()}</b> — ${m[2]}`; } const step = () => { k = (k + 1) % MF.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Healthy or not?', intro: 'Sort these habits.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Healthy habit', 'Unhealthy habit'], items: [['daily bath and clean clothes', 0], ['skipping breakfast', 1], ['eating green leafy vegetables', 0], ['8–9 hours of sleep', 0], ['junk food every day', 1], ['playing outdoors', 0], ['hiding worries from everyone', 1, 'talk to a trusted adult'], ['trying tobacco to look grown-up', 1]] }); } }
    ],
    gens: [
      { title: 'Changes', gen(R) { return G9.S9.pickQ(R, [['What is puberty?', 'when the body becomes able to reproduce'], ['What causes changes in adolescence?', 'hormones'], ['Why does the voice deepen?', 'the larynx (voice box) grows'], ['Why do pimples appear?', 'oil glands become more active']]); } },
      { title: 'Nutrition', gen(R) { return G9.S9.groupQ(R, [['dal and eggs', 0], ['green leaves and jaggery', 1], ['milk and ragi', 2], ['paneer and soybean', 0], ['dates and pomegranate', 1], ['curd and sesame', 2]], ['protein (growth)', 'iron (blood)', 'calcium (bones)'], 'Main nutrient in '); } },
      { title: 'Growth', levels: [2, 3], gen(R) { const h1 = R.int(130, 145), g = R.int(5, 9), y = R.int(2, 3); return { q: `A student is ${h1} cm tall and grows ${g} cm a year during a growth spurt. Height after ${y} years?`, a: `${h1 + g * y} cm`, ans: h1 + g * y }; } },
      { title: 'Seek help', gen(R) { return G9.S9.pickQ(R, [['Whom can you talk to about worries?', 'parents, teachers, counsellor, doctor'], ['How to check a myth?', 'ask a doctor or teacher; trusted sources'], ['Why avoid tobacco and drugs?', 'they harm health and are addictive'], ['Why is sleep important?', 'growth, mood and learning']]); } },
      { title: 'Hygiene', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why bathe daily in adolescence?', 'sweat glands are more active'], ['Why change clothes daily?', 'remove sweat and germs'], ['Why is menstrual hygiene important?', 'prevents infections'], ['Why wash the face gently?', 'removes excess oil; helps with pimples']]); } }
    ],
    quiz: [
      { q: 'Adolescence age', o: ['about 10–19', '1–5', '30–40', '60+'], a: 0, e: 'Teens.' }, { q: 'Changes are caused by', o: ['hormones', 'only food', 'weather', 'luck'], a: 0, e: 'Hormones.' },
      { q: 'Voice deepens due to', o: ['larynx growth', 'shouting', 'cold', 'tongue'], a: 0, e: 'Larynx.' }, { q: 'Iron prevents', o: ['anaemia', 'scurvy', 'rickets', 'goitre'], a: 0, e: 'Blood.' },
      { q: 'Pimples from', o: ['active oil glands', 'only dirt', 'sleep', 'water'], a: 0, e: 'Oil.' }, { q: 'Calcium source', o: ['milk', 'sugar', 'oil', 'chips'], a: 0, e: 'Bones.' },
      { q: 'Mood swings are', o: ['normal', 'a disease', 'weakness', 'rare'], a: 0, e: 'Common.' }, { q: 'Growth rate', o: ['differs among people', 'same for all', 'zero', 'only in girls'], a: 0, e: 'Varies.' },
      { q: 'Talk to', o: ['trusted adults', 'no one', 'strangers online', 'only rumours'], a: 0, e: 'Help.' }, { q: 'Healthy habit', o: ['exercise', 'junk food daily', 'little sleep', 'tobacco'], a: 0, e: 'Exercise.' },
      { q: 'Puberty means', o: ['body able to reproduce', 'end of growth', 'old age', 'illness'], a: 0, e: 'Maturity.' }
    ],
    teach: {
      outcomes: ['Describe changes in adolescence', 'Practise hygiene and nutrition', 'Know where to seek help'],
      periods: [{ t: 'Changes', flow: [['10 min', 'Question box (anonymous).'], ['15 min', 'Explore panel 1.'], ['15 min', 'Discuss feelings respectfully.']] }, { t: 'Health', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Plan a healthy day.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Same pace for all.', 'Talking is shameful.'], activities: ['Anonymous question box.', 'Iron-rich menu.'],
      exit: ['Three body changes.', 'Two nutrients.', 'Who to ask.'], homework: 'Write a one-week healthy routine: food, sleep, play, hygiene.'
    },
    slides: [{ t: 'Adolescence', b: ['Puberty and hormones', 'Body changes', 'Feelings', 'Healthy habits'] }, { t: 'Think and share', b: ['Why do pimples appear?', 'Whom can you trust?'] }],
    fs: { groups: [['Changes', [['Height', 'growth spurt'], ['Voice', 'larynx grows'], ['Skin', 'oil, sweat glands']]], ['Cause', [['Hormones', 'chemical messengers'], ['Puberty', 'able to reproduce']]], ['Health', [['Food', 'protein, iron, calcium'], ['Hygiene', 'daily bath'], ['Help', 'trusted adults']]]],
      ex: [['140 cm + 6 cm/yr × 2', '152 cm'], ['Anaemia', 'needs iron']], rem: ['Changes are normal.', 'Eat well, sleep well.', 'Ask for help.'] }
  });
})();
