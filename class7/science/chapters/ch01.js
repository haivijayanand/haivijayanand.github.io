/*
TOOL:    class7_science_ch01
FAMILY:  CBSE_REVISION / Class 7 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 1 The Ever-Evolving World of Science (science as a process, questions, observations, revising ideas, scientists and the method) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 1, part: 'All chapters', short: 'World of science', title: 'The Ever-Evolving World of Science',
    blurb: 'Science as an ever-changing way of understanding the world: asking questions, observing, guessing (hypothesis), testing with fair experiments, recording, and revising ideas when new evidence comes — with a preview of what Class 7 explores.',
    revise: {
      oneLine: 'Science is not a fixed list of facts — it grows. We observe, ask questions, make a testable guess, do fair tests changing only one thing, record data honestly and draw conclusions. When new evidence appears, ideas are improved. Everyone can be a scientist by staying curious.',
      sections: [
        { h: 'Ideas change', html: `<p>People once thought the Sun went round the Earth; careful observations changed that idea. Good scientists welcome correction.</p>` },
        { h: 'Fair test', html: `<p>Change one thing (variable), keep the rest the same, measure the result, repeat for reliability.</p>` },
        { h: 'This year', html: `<p>Acids and bases, electricity, metals and non-metals, changes, adolescence, heat, time and motion, life processes, light, and the Earth–Moon–Sun system.</p>` }
      ],
      formulas: [['Steps', 'observe → question → hypothesis → test → conclude'], ['Fair test', 'change one variable'], ['Reliable', 'repeat trials'], ['Science', 'evidence-based, open to change']],
      terms: [['Hypothesis', 'testable guess'], ['Variable', 'a thing that can change in a test'], ['Evidence', 'observations and data that support an idea']],
      traps: ['A single result is not proof.', 'Changing two things at once spoils a test.', 'Science changes with evidence, not opinion.'],
      bridge: '<p>Every chapter this year uses these steps.</p>'
    },
    explore: [
      { title: 'Average of trials', intro: 'Repeat a measurement several times; the average is more reliable than one reading.',
        build(el, K) { let n = 3, seed = 1; const row = K.row(el); K.slider(row, 'trials', 1, 8, 1, n, v => { n = v; draw(); }); K.button(row, 'new readings', () => { seed++; draw(); }); const rd = K.read(el);
          function draw() { let s = seed * 9301; const r = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; const v = []; for (let i = 0; i < n; i++) v.push(+(20 + (r() - 0.5) * 3).toFixed(1)); const m = v.reduce((a, b) => a + b, 0) / n; rd.innerHTML = `Time for a ball to roll down a ramp (s): ${v.join(', ')}<br>average = <b>${m.toFixed(2)} s</b> · spread ${(Math.max(...v) - Math.min(...v)).toFixed(1)} s · more trials → a steadier average`; } draw(); return null; } },
      { title: 'Steps of science', intro: '<kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Observe', 'Iron gates rust in the rainy season.'], ['Question', 'Does water make iron rust?'], ['Hypothesis', 'Iron rusts only when both water and air are present.'], ['Test', 'Three nails: dry air; boiled water with oil layer (no air); water + air.'], ['Conclude', 'Only the nail with water and air rusts — the idea is supported.'], ['Revise', 'New question: does salt water make it faster? Science goes on.']] }); } }
    ],
    gens: [
      { title: 'Steps', gen(R) { return G9.S9.pickQ(R, [['What is a hypothesis?', 'a testable guess'], ['What is a fair test?', 'only one variable changed'], ['Why repeat trials?', 'to make results reliable'], ['What do scientists do when new evidence disagrees?', 'revise their ideas']]); } },
      { title: 'Average', gen(R) { const v = [R.int(10, 30), R.int(10, 30), R.int(10, 30)]; const m = (v[0] + v[1] + v[2]) / 3; return { q: `Readings: ${v.join(', ')} s. Average?`, a: `${+m.toFixed(2)} s`, ans: m, tol: 0.01 }; } },
      { title: 'Fair or not?', gen(R) { return G9.S9.pickQ(R, [['Testing two fertilisers on plants given different water. Fair?', 'no — water must be the same'], ['Same seeds, same pots, same water, only light differs. Fair?', 'yes — only light changes'], ['One trial shows sugar dissolves faster in hot water. Enough?', 'repeat trials before concluding'], ['Different ramps and different balls compared. Fair?', 'no — two variables changed']]); } },
      { title: 'Variable to change', levels: [2, 3], gen(R) { const t = R.pick([['Does salt affect how fast ice melts?', 'amount of salt'], ['Does light help seeds germinate?', 'light'], ['Does slope change a ball’s speed?', 'slope of the ramp'], ['Does temperature affect dissolving?', 'water temperature']]); return { q: `${t[0]} What should you change?`, a: t[1] }; } },
      { title: 'Spread', levels: [2, 3], gen(R) { const v = [R.int(40, 60), R.int(40, 60), R.int(40, 60), R.int(40, 60)]; return { q: `Readings ${v.join(', ')}. Range (largest − smallest)?`, a: String(Math.max(...v) - Math.min(...v)), ans: Math.max(...v) - Math.min(...v) }; } }
    ],
    quiz: [
      { q: 'Science is', o: ['ever-evolving', 'fixed forever', 'only facts to memorise', 'opinion'], a: 0, e: 'Grows.' }, { q: 'Hypothesis', o: ['testable guess', 'final law', 'measurement', 'tool'], a: 0, e: 'Guess.' },
      { q: 'Fair test changes', o: ['one variable', 'all variables', 'two variables', 'nothing'], a: 0, e: 'One.' }, { q: 'Repeat trials for', o: ['reliability', 'fun', 'cheating', 'colour'], a: 0, e: 'Reliable.' },
      { q: 'Average of 10, 12, 14', o: ['12', '36', '10', '14'], a: 0, e: '36/3.' }, { q: 'New evidence leads to', o: ['revising ideas', 'ignoring it', 'anger', 'stopping science'], a: 0, e: 'Revise.' },
      { q: 'Rust needs', o: ['water and air', 'only air', 'only water', 'light'], a: 0, e: 'Both.' }, { q: 'Evidence is', o: ['observations and data', 'rumour', 'guess', 'opinion'], a: 0, e: 'Data.' },
      { q: 'First step', o: ['observe', 'conclude', 'publish', 'revise'], a: 0, e: 'Look.' }, { q: 'Who can do science?', o: ['anyone curious', 'only adults', 'only labs', 'no one'], a: 0, e: 'Curiosity.' },
      { q: 'One result is', o: ['not proof', 'final proof', 'a law', 'always right'], a: 0, e: 'Repeat.' }
    ],
    teach: {
      outcomes: ['Describe the steps of science', 'Plan a fair test', 'Explain why ideas change'],
      periods: [{ t: 'Science grows', flow: [['10 min', 'Story of changing ideas.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Plan a rust test.']] }, { t: 'Reliable data', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Ramp trials in groups.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Science never changes.', 'One trial is enough.'], activities: ['Rusting nails setup.', 'Ramp timing.'],
      exit: ['Steps of science.', 'Fair test rule.', 'Average of 3 readings.'], homework: 'Write a question about something at home and plan a fair test for it.'
    },
    slides: [{ t: 'The Ever-Evolving World of Science', b: ['Ideas change with evidence', 'Steps of science', 'Fair tests', 'Reliable data'] }, { t: 'Think and share', b: ['Why repeat trials?', 'An idea that changed?'] }],
    fs: { groups: [['Steps', [['1', 'observe'], ['2', 'question'], ['3', 'hypothesis'], ['4', 'test'], ['5', 'conclude, revise']]], ['Fair test', [['Change', 'one variable'], ['Keep', 'others same'], ['Repeat', 'average']]], ['Nature of science', [['Evidence', 'decides'], ['Ideas', 'can change']]]],
      ex: [['18, 20, 22 s', 'average 20 s'], ['Rust', 'water + air']], rem: ['Be curious.', 'Test fairly.', 'Revise with evidence.'] }
  });
})();
