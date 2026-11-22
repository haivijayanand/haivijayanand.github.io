/*
TOOL:    class3_science_ch01
FAMILY:  CBSE_REVISION / Class 3 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 1 Family and Friends (families big and small, family tree, helping at home, friends and pets) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 1, part: 'All chapters', short: 'Family and friends', title: 'Family and Friends',
    blurb: 'Who is in our family, small and large (joint) families, how family members are related, sharing work at home, and friends — people, neighbours and pets — who care for us.',
    revise: {
      oneLine: 'A family is a group of people who live together and care for each other. Some families are small, some are large (joint) with grandparents, uncles, aunts and cousins. Everyone helps at home, and friends and pets are part of our caring circle too.',
      sections: [
        { h: 'Kinds of families', html: `<p>Small family: parents and children. Joint family: grandparents, uncles, aunts and cousins live together too.</p>` },
        { h: 'Relations', html: `<p>Father's mother = grandmother (dadi); mother's brother = uncle (mama); uncle's child = cousin.</p>` },
        { h: 'Sharing work and care', html: `<p>Cooking, cleaning, shopping, caring for elders and pets — when everyone helps, work becomes easy. Elders teach us stories, games and festivals.</p>` }
      ],
      formulas: [['Family', 'people who live together and care'], ['Joint family', 'grandparents, parents, uncles, aunts, cousins'], ['Friends', 'share, play, help'], ['Pets', 'need food, water, love, care']],
      terms: [['Relative', 'family member'], ['Cousin', "uncle's or aunt's child"], ['Neighbour', 'person living nearby']],
      traps: ['Housework is not only for women — everyone can help.', 'Families can look different; all are families.', 'Pets need daily care, not only play.'],
      bridge: '<p>Ch 2 and 3 take us out with family to the mela and to festivals.</p>'
    },
    explore: [
      { title: 'Build a family tree', intro: 'Choose how many of each relation live at home; the tree and the family type update.',
        build(el, K) { let g = 2, p = 2, ch = 2, u = 0; const row = K.row(el); K.slider(row, 'grandparents', 0, 4, 1, g, v => { g = v; draw(); }); K.slider(row, 'parents', 1, 2, 1, p, v => { p = v; draw(); }); K.slider(row, 'children', 1, 4, 1, ch, v => { ch = v; draw(); }); K.slider(row, 'uncles/aunts & cousins', 0, 6, 1, u, v => { u = v; draw(); }); const rd = K.read(el);
          function draw() { const lv = (a, s) => `<div style="font-size:30px;letter-spacing:6px;margin:4px 0">${a || '&nbsp;'}</div><div class="muted" style="font-size:13px">${s}</div>`; rd.innerHTML = `<div style="text-align:center">${lv('👵👴'.slice(0, 0) + ['', '👵', '👵👴', '👵👴👵', '👵👴👵👴'][g], 'grandparents')}${lv(['', '👩', '👩👨'][p] + (u ? ' · ' + '🧔👩'.repeat(Math.ceil(u / 2)).slice(0, 2 * Math.ceil(u / 2)) : ''), 'parents' + (u ? ', uncles and aunts' : ''))}${lv('🧒'.repeat(ch) + (u ? ' · ' + '👦'.repeat(Math.floor(u / 2)) : ''), 'children' + (u > 1 ? ', cousins' : ''))}</div>${g + p + ch + u} people · <b>${g || u ? 'joint (large) family' : 'small family'}</b>`; } draw(); return null; } },
      { title: 'Who helps with what?', intro: 'Sort the jobs: who in your home could do each? (Any family member can — this is about sharing.)',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Children can help', 'Grown-ups do (safety)'], items: [['setting plates', 0], ['watering plants', 0], ['feeding the pet', 0, 'with a grown-up watching'], ['folding clothes', 0], ['lighting the gas stove', 1, 'fire is dangerous for children'], ['using a sharp knife', 1], ['fetching milk from the shop next door', 0], ['fixing an electric switch', 1, 'electricity is dangerous']] }); } }
    ],
    gens: [
      { title: 'Relations', gen(R) { return G9.S9.pickQ(R, [["Your father's mother is your?", 'grandmother (dadi)'], ["Your mother's brother is your?", 'uncle (mama)'], ["Your father's brother's son is your?", 'cousin'], ["Your mother's mother is your?", 'grandmother (nani)'], ["Your father's sister is your?", 'aunt (bua)']]); } },
      { title: 'Small or joint family', gen(R) { const g = R.int(0, 2), u = R.int(0, 3); return { q: `A family has ${g} grandparent${g === 1 ? '' : 's'}, 2 parents, 2 children${u ? ` and ${u} uncles/aunts` : ''}. Small or joint family? How many people?`, a: `${g || u ? 'joint' : 'small'}; ${g + 4 + u}`, ans: g + 4 + u }; } },
      { title: 'Helping at home', gen(R) { return G9.S9.pickQ(R, [['Name one job a child can do at home.', 'any: set plates, water plants, fold clothes, tidy toys'], ['Who should light the gas stove?', 'a grown-up'], ['Why should everyone share housework?', 'work becomes easy and quick; it is fair'], ['What do grandparents often share with us?', 'stories, games, recipes, care']]); } },
      { title: 'Pets', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Name three things a pet dog needs.', 'food, clean water, shelter, walks, love, a vet'], ['Why should we not tease animals?', 'they feel pain and fear; they may get hurt or bite'], ['Who looks after a pet when the family goes out?', 'a neighbour, friend or relative']]); } },
      { title: 'Friends', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['What makes a good friend?', 'shares, helps, listens, is kind'], ['How can you help a new child in class?', 'talk, sit together, show around, play'], ['Name a way neighbours help each other.', 'share things, help in illness, look after the house']]); } }
    ],
    quiz: [
      { q: "Father's mother", o: ['grandmother', 'aunt', 'sister', 'cousin'], a: 0, e: 'Dadi.' }, { q: 'A joint family has', o: ['grandparents, uncles, aunts too', 'only parents', 'only children', 'only friends'], a: 0, e: 'Large family.' },
      { q: 'Housework is for', o: ['everyone', 'only mothers', 'only girls', 'only servants'], a: 0, e: 'Share.' }, { q: "Uncle's child is your", o: ['cousin', 'brother', 'nephew', 'grandson'], a: 0, e: 'Cousin.' },
      { q: 'Who should light the gas stove?', o: ['a grown-up', 'a small child', 'a pet', 'anyone'], a: 0, e: 'Safety.' }, { q: 'A pet needs', o: ['food, water and care', 'only toys', 'nothing', 'only a name'], a: 0, e: 'Care.' },
      { q: "Mother's brother", o: ['mama (uncle)', 'chacha', 'dada', 'bhaiya'], a: 0, e: 'Maternal uncle.' }, { q: 'A good friend', o: ['shares and helps', 'teases', 'grabs toys', 'never talks'], a: 0, e: 'Kind.' },
      { q: 'Small family', o: ['parents and children', 'many uncles', 'whole village', 'only grandparents'], a: 0, e: 'Nuclear.' }, { q: 'Neighbours are', o: ['people living nearby', 'only relatives', 'strangers far away', 'animals'], a: 0, e: 'Near.' },
      { q: 'Elders often teach us', o: ['stories and games', 'nothing', 'only scolding', 'to fight'], a: 0, e: 'Wisdom.' }
    ],
    teach: {
      outcomes: ['Describe their family and relations', 'Recognise different kinds of families', 'Value sharing work and caring for others'],
      periods: [{ t: 'My family', flow: [['10 min', 'Circle time: who is in your family?'], ['15 min', 'Explore panel 1: family tree.'], ['15 min', 'Draw your family tree.']] }, { t: 'Sharing and caring', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Role-play helping at home.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Only one kind of family is "normal".', 'Housework belongs to women.'], activities: ['Family photo talk.', 'Interview a grandparent about their childhood.'],
      exit: ['Name two relations.', 'One job you do at home.', 'How do you care for a pet or plant?'], homework: 'Make a family tree with names and relations. Ask an elder one game they played as a child.'
    },
    slides: [{ t: 'Family and Friends', b: ['Small and joint families', 'Relations', 'Sharing work', 'Friends and pets'] }, { t: 'Think and share', b: ["Who is your father's sister?", 'How do you help at home?'] }],
    fs: { groups: [['Families', [['Small', 'parents + children'], ['Joint', 'with grandparents, uncles, aunts, cousins']]], ['Relations', [["Father's mother", 'dadi'], ["Mother's mother", 'nani'], ["Mother's brother", 'mama'], ["Uncle's child", 'cousin']]], ['Caring', [['Housework', 'everyone shares'], ['Pets', 'food, water, care'], ['Friends', 'share and help']]]],
      ex: [['2 grandparents + 2 parents + 2 children', 'joint family of 6'], ['Gas stove', 'grown-up only']], rem: ['All families are families.', 'Help at home every day.', 'Be kind to friends and pets.'] }
  });
})();
