/*
TOOL:    class5_science_ch04
FAMILY:  CBSE_REVISION / Class 5 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 4 Our School - A Happy Place (clean and green school, safety, sharing and inclusion, school helpers, rules) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 4, part: 'Unit 2 · Health and Well-being', short: 'Happy school', title: 'Our School - A Happy Place',
    blurb: 'Making school a happy place: a clean and green campus, saving water and electricity, safety rules, helping everyone feel included, respecting school helpers, and solving problems together.',
    revise: {
      oneLine: 'A happy school is clean, green, safe and kind. Students keep classrooms and toilets clean, look after plants, save water and electricity, follow safety rules, include everyone in play, and respect the people who keep the school running.',
      sections: [
        { h: 'Clean and green', html: `<p>Separate dry and wet waste, use both sides of paper, water plants, collect rainwater, switch off fans and lights.</p>` },
        { h: 'Safe school', html: `<p>Walk on stairs, keep left, no pushing, know the fire exit and drill, report broken things, tell a teacher about bullying.</p>` },
        { h: 'Kind school', html: `<p>Include a new child or a child with a disability in games, take turns, thank the helpers — gardener, cleaner, guard, cook.</p>` }
      ],
      formulas: [['Clean', 'two bins, clean toilets'], ['Green', 'plants, water and power saving'], ['Safe', 'walk, keep left, drills'], ['Kind', 'include, share, thank']],
      terms: [['Inclusion', 'making sure everyone can take part'], ['Fire drill', 'practice of leaving safely'], ['Bullying', 'hurting someone again and again']],
      traps: ['Bullying is not "just a joke".', 'Running on stairs causes injuries.', 'Cleanliness is everyone’s job, not only the cleaner’s.'],
      bridge: '<p>Unit 3 travels across our vibrant country.</p>'
    },
    explore: [
      { title: 'School power and water saver', intro: 'Set how many fans and lights are left on after class; see the waste.',
        build(el, K) { let f = 4, l = 6, h = 2; const row = K.row(el); K.slider(row, 'fans left on', 0, 8, 1, f, v => { f = v; draw(); }); K.slider(row, 'tube lights left on', 0, 12, 1, l, v => { l = v; draw(); }); K.slider(row, 'extra hours', 1, 6, 1, h, v => { h = v; draw(); }); const rd = K.read(el);
          function draw() { const wh = (f * 70 + l * 40) * h; rd.innerHTML = `energy wasted per day ≈ <b>${(wh / 1000).toFixed(2)} units (kWh)</b> · in 200 school days ≈ ${Math.round(wh * 200 / 1000)} units · switch off when you leave!`; } draw(); return null; } },
      { title: 'Happy school or not?', intro: 'Sort the actions.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Makes school happy', 'Needs to change'], items: [['inviting a new child to play', 0], ['running down the stairs', 1], ['watering the school garden', 0], ['teasing a classmate again and again', 1, 'that is bullying — tell a teacher'], ['thanking the cook', 0], ['leaving the tap running', 1], ['taking turns on the swing', 0], ['writing on desks', 1]] }); } }
    ],
    gens: [
      { title: 'Happy school', gen(R) { return G9.S9.groupQ(R, [['switching off lights', 0], ['pushing in the queue', 1], ['sharing crayons', 0], ['littering the playground', 1], ['helping a classmate who fell', 0]], ['makes school happy', 'needs to change'], 'Does this make school happy: '); } },
      { title: 'Safety', gen(R) { return G9.S9.pickQ(R, [['What should you do during a fire drill?', 'walk quickly in a line to the exit; do not run or push'], ['Which side should you keep on the stairs?', 'left'], ['What should you do if you see a broken switch?', 'do not touch; tell a teacher'], ['What should you do if someone is bullied?', 'support them and tell a teacher']]); } },
      { title: 'Power saved', levels: [2, 3], gen(R) { const f = R.int(2, 8), h = R.int(1, 4); return { q: `A fan uses 70 W. If ${f} fans are switched off ${h} hours earlier each day, how many watt-hours are saved in a day?`, a: `${70 * f * h} Wh`, ans: 70 * f * h }; } },
      { title: 'Helpers', gen(R) { return G9.S9.pickQ(R, [['Who keeps the school garden green?', 'gardener'], ['Who keeps the gate safe?', 'security guard'], ['Who cooks the mid-day meal?', 'cook'], ['How can we thank school helpers?', 'say thank you, keep places clean, help them']]); } },
      { title: 'Inclusion', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['How can a game include a child who uses a wheelchair?', 'change the rules, give a role like scorer or thrower, play seated games'], ['What does inclusion mean?', 'everyone can take part'], ['How can you help a new student?', 'introduce yourself, show the school, play together']]); } }
    ],
    quiz: [
      { q: 'On stairs we', o: ['walk and keep left', 'run', 'push', 'slide'], a: 0, e: 'Safety.' }, { q: 'Bullying is', o: ['hurting someone repeatedly', 'a game', 'teamwork', 'fine'], a: 0, e: 'Not okay.' },
      { q: 'Inclusion means', o: ['everyone takes part', 'only friends play', 'some are left out', 'winning'], a: 0, e: 'All.' }, { q: 'Fire drill: we', o: ['walk to the exit in a line', 'hide under desks only', 'run anywhere', 'stay inside'], a: 0, e: 'Exit.' },
      { q: 'Keeping school clean is', o: ['everyone’s job', 'only the cleaner’s', 'no one’s', 'teacher’s only'], a: 0, e: 'Shared.' }, { q: 'Saves electricity', o: ['switching off fans when leaving', 'keeping lights on', 'opening fridge', 'nothing'], a: 0, e: 'Off.' },
      { q: 'Broken switch: we', o: ['tell a teacher', 'touch it', 'play with it', 'ignore'], a: 0, e: 'Danger.' }, { q: 'Green school', o: ['plants and saving water', 'more plastic', 'cutting trees', 'wasting paper'], a: 0, e: 'Green.' },
      { q: 'A new classmate: we', o: ['welcome them', 'ignore', 'tease', 'hide'], a: 0, e: 'Kind.' }, { q: '4 fans × 70 W × 2 h', o: ['560 Wh', '140 Wh', '280 Wh', '76 Wh'], a: 0, e: 'Multiply.' },
      { q: 'Thanking helpers shows', o: ['respect', 'weakness', 'nothing', 'rudeness'], a: 0, e: 'Respect.' }
    ],
    teach: {
      outcomes: ['Keep school clean, green and safe', 'Include everyone', 'Respect school helpers'],
      periods: [{ t: 'Clean and green', flow: [['10 min', 'School walk audit.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Class green rules.']] }, { t: 'Safe and kind', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Inclusive game design.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Bullying is a joke.', 'Cleaning is someone else’s job.'], activities: ['Green monitor roster.', 'Thank-you cards for helpers.'],
      exit: ['Two safety rules.', 'One inclusive idea.', 'One way to save power.'], homework: 'Interview a school helper about their work and write three things you learnt.'
    },
    slides: [{ t: 'Our School - A Happy Place', b: ['Clean and green', 'Safe school', 'Inclusion and kindness', 'Our helpers'] }, { t: 'Think and share', b: ['How can we include everyone?', 'What to do in a fire drill?'] }],
    fs: { groups: [['Clean and green', [['Waste', 'two bins'], ['Power', 'switch off'], ['Water', 'close taps, harvest rain']]], ['Safe', [['Stairs', 'walk, keep left'], ['Drill', 'line to exit'], ['Danger', 'tell a teacher']]], ['Kind', [['Include', 'everyone plays'], ['Bullying', 'speak up'], ['Helpers', 'thank them']]]],
      ex: [['4 fans × 70 W × 2 h', '560 Wh saved'], ['New child', 'invite to play']], rem: ['Everyone keeps school clean.', 'Walk, do not run.', 'No one left out.'] }
  });
})();
