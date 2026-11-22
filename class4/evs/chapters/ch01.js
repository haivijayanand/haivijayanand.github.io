/*
TOOL:    class4_science_ch01
FAMILY:  CBSE_REVISION / Class 4 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 1 Living Together (animals in groups: herds, colonies, flocks; working together; people as a community) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 1, part: 'Unit 1 · Our Community', short: 'Living together', title: 'Living Together',
    blurb: 'Why many animals live in groups — elephant herds, ant and bee colonies, flocks of birds, packs of wolves — how they share work and protect each other, and how people too live and work together as communities.',
    revise: {
      oneLine: 'Many animals live in groups: elephants in herds led by the oldest female, ants and bees in colonies where each one has a job, birds in flocks, wolves in packs. Living together helps them find food, stay safe and care for the young. People also live as families, neighbourhoods and communities that help each other.',
      sections: [
        { h: 'Elephant herd', html: `<p>A herd is led by an old, wise female elephant. Females and young stay together; they protect calves and find water and food.</p>` },
        { h: 'Colonies', html: `<p>Honeybees: a queen lays eggs, workers collect nectar and build the hive. Ants: workers carry food, soldiers guard the nest.</p>` },
        { h: 'People', html: `<p>Community helpers — farmers, doctors, teachers, sweepers, drivers — each do work that everyone needs.</p>` }
      ],
      formulas: [['Herd', 'elephants, deer, cattle'], ['Colony', 'ants, bees, termites'], ['Flock', 'birds, sheep'], ['Pack', 'wolves, wild dogs'], ['Why groups', 'safety, food, caring for young']],
      terms: [['Herd', 'group of large animals'], ['Colony', 'group living in one nest with shared jobs'], ['Community', 'people living and working together']],
      traps: ['The elephant herd is led by a female, not a male.', 'Every member of a colony has a job.', 'Not all animals live in groups (tigers live alone).'],
      bridge: '<p>Ch 2 explores our own neighbourhood and its helpers.</p>'
    },
    explore: [
      { title: 'Group names', intro: 'Sort the animals by the kind of group they live in.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Herd', 'Colony', 'Flock', 'Lives alone (mostly)'], items: [['elephants', 0], ['honeybees', 1], ['ants', 1], ['pigeons', 2], ['deer', 0], ['tiger', 3, 'tigers hunt alone in their own area'], ['sheep', 2], ['termites', 1], ['leopard', 3]] }); } },
      { title: 'Why live in a group?', intro: 'Change the herd size; see how many eyes watch for danger and how safe the calves are.',
        build(el, K) { let n = 6; const row = K.row(el); K.slider(row, 'elephants in the herd', 1, 15, 1, n, v => { n = v; draw(); }); const rd = K.read(el);
          function draw() { rd.innerHTML = `<div style="font-size:26px">${'🐘'.repeat(n)}</div>${2 * n} eyes and ears watching · <b>${n >= 4 ? 'many' : 'few'}</b> lookouts for danger · ${n >= 4 ? 'calves are kept in the middle, safe' : 'a small herd — harder to protect calves'}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Group names', gen(R) { return G9.S9.pickQ(R, [['A group of elephants is a?', 'herd'], ['Bees live together in a?', 'colony (hive)'], ['A group of birds flying together is a?', 'flock'], ['Wolves hunt in a?', 'pack'], ['Ants live in a?', 'colony']]); } },
      { title: 'Who leads?', gen(R) { return G9.S9.pickQ(R, [['Who leads an elephant herd?', 'the oldest female elephant'], ['Who lays eggs in a beehive?', 'the queen bee'], ['Which bees collect nectar?', 'worker bees'], ['Which ants guard the nest?', 'soldier ants']]); } },
      { title: 'Why groups?', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Give two reasons animals live in groups.', 'safety from enemies; finding food; caring for young'], ['Why do deer graze in herds?', 'many eyes spot danger; they warn each other'], ['Why does a tiger not need a group?', 'it hunts alone by hiding and pouncing']]); } },
      { title: 'Community helpers', gen(R) { return G9.S9.pickQ(R, [['Who grows our food?', 'farmer'], ['Who treats the sick?', 'doctor and nurse'], ['Who keeps streets clean?', 'sanitation worker'], ['Who brings letters and parcels?', 'postal worker']]); } },
      { title: 'Count the herd', levels: [2, 3], gen(R) { const a = R.int(4, 12), c = R.int(1, 4); return { q: `A herd has ${a} adult elephants and ${c} calves. Each adult drinks about 150 litres a day and each calf 40 litres. Total water in a day?`, a: `${150 * a + 40 * c} litres`, ans: 150 * a + 40 * c }; } }
    ],
    quiz: [
      { q: 'An elephant herd is led by', o: ['the oldest female', 'the biggest male', 'a calf', 'a lion'], a: 0, e: 'Matriarch.' }, { q: 'Bees live in a', o: ['colony', 'herd', 'pack', 'flock'], a: 0, e: 'Hive.' },
      { q: 'Animal that mostly lives alone', o: ['tiger', 'ant', 'bee', 'deer'], a: 0, e: 'Solitary.' }, { q: 'Queen bee', o: ['lays eggs', 'collects nectar', 'guards', 'builds roads'], a: 0, e: 'Eggs.' },
      { q: 'Groups help animals', o: ['stay safe and find food', 'fight each other', 'sleep more', 'nothing'], a: 0, e: 'Benefits.' }, { q: 'A flock is a group of', o: ['birds', 'ants', 'fish only', 'elephants'], a: 0, e: 'Birds.' },
      { q: 'Wolves live in', o: ['packs', 'hives', 'herds', 'colonies'], a: 0, e: 'Pack.' }, { q: 'Calves in a herd are kept', o: ['in the middle', 'outside', 'alone', 'far away'], a: 0, e: 'Protected.' },
      { q: 'A community is', o: ['people living and working together', 'one person', 'a forest', 'a river'], a: 0, e: 'Together.' }, { q: 'Soldier ants', o: ['guard the nest', 'lay eggs', 'make honey', 'fly south'], a: 0, e: 'Guards.' },
      { q: 'Who keeps streets clean?', o: ['sanitation workers', 'pilots', 'dentists', 'actors'], a: 0, e: 'Helpers.' }
    ],
    teach: {
      outcomes: ['Name animal groups', 'Explain why animals live in groups', 'Value community helpers'],
      periods: [{ t: 'Animal groups', flow: [['10 min', 'Video/story of an elephant herd.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Ant trail observation.']] }, { t: 'Together is better', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Community helper role-play.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Male elephant leads.', 'All animals live in groups.'], activities: ['Watch ants carry food.', 'Group game: build a tower together.'],
      exit: ['Name 3 group words.', 'Who leads a herd?', 'One helper and their work.'], homework: 'Observe ants or birds for 10 minutes. Note how they work together.'
    },
    slides: [{ t: 'Living Together', b: ['Herds, colonies, flocks, packs', 'Jobs in a colony', 'Why groups help', 'Our community'] }, { t: 'Think and share', b: ['Who leads an elephant herd?', 'How do you work together at school?'] }],
    fs: { groups: [['Group words', [['Herd', 'elephants, deer'], ['Colony', 'ants, bees, termites'], ['Flock', 'birds, sheep'], ['Pack', 'wolves']]], ['Jobs', [['Queen bee', 'lays eggs'], ['Worker bee', 'nectar, hive'], ['Old female elephant', 'leads herd']]], ['Why together', [['Safety', 'many eyes'], ['Food', 'share finding'], ['Young', 'protected']]]],
      ex: [['6 adults × 150 L', '900 L water a day'], ['Tiger', 'lives alone']], rem: ['Herd leader is female.', 'Every member has a job.', 'People are a community too.'] }
  });
})();
