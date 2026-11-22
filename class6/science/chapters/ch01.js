/*
TOOL:    class6_science_ch01
FAMILY:  CBSE_REVISION / Class 6 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 1 The Wonderful World of Science (asking questions, observing, the scientific method, fair tests, variables) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 1, part: 'All chapters', short: 'What is science', title: 'The Wonderful World of Science',
    blurb: 'Science as a way of finding out: asking questions, observing carefully, guessing (hypothesis), testing with fair experiments, recording and concluding — and how science is everywhere in daily life.',
    revise: {
      oneLine: 'Science is a way of understanding the world by asking questions, making careful observations, suggesting a possible answer (hypothesis), testing it with a fair experiment where only one thing is changed, and drawing a conclusion from the results — and then asking new questions.',
      sections: [
        { h: 'The scientific method', html: `<p>Observe → question → hypothesis → experiment → record → conclude → share. Repeat if the result does not fit.</p>` },
        { h: 'Fair test', html: `<p>Change one thing (independent variable), measure one thing (dependent variable), keep everything else the same (controlled variables).</p>` },
        { h: 'Science around us', html: `<p>Cooking, weather, medicines, phones, farming — and Indian scientists like C. V. Raman, Janaki Ammal, A. P. J. Abdul Kalam.</p>` }
      ],
      formulas: [['Steps', 'observe, question, hypothesise, test, conclude'], ['Change', 'one variable at a time'], ['Measure', 'the result'], ['Keep same', 'all other conditions']],
      terms: [['Hypothesis', 'testable guess'], ['Variable', 'something that can change'], ['Observation', 'what we notice using senses or instruments']],
      traps: ['Changing two things at once makes a test unfair.', 'One result is not enough — repeat.', 'A hypothesis can be wrong; that is still useful.'],
      bridge: '<p>Every later chapter uses these steps.</p>'
    },
    explore: [
      { title: 'Plan a fair test', intro: 'Question: does the amount of water change how fast a bean sprouts? Choose what to change, keep same and measure.',
        build(el, K) { const VARS = ['amount of water', 'kind of seed', 'temperature of room', 'size of pot', 'days to sprout']; let ch = 0, me = 4; const keep = new Set([1, 2, 3]); const row = K.row(el); K.select(row, 'change', VARS, i => { ch = i; draw(); }); K.select(row, 'measure', VARS, i => { me = i; draw(); }); row.querySelectorAll('select')[1].value = 4; const box = K.h('div'); el.appendChild(box); const rd = K.read(el);
          function draw() { box.innerHTML = 'keep the same: ' + VARS.map((v, i) => `<label style="margin:0 8px"><input type="checkbox" data-i="${i}" ${keep.has(i) ? 'checked' : ''}> ${v}</label>`).join(''); box.querySelectorAll('input').forEach(c => c.onchange = () => { c.checked ? keep.add(+c.dataset.i) : keep.delete(+c.dataset.i); draw(); });
            const others = [0, 1, 2, 3].filter(i => i !== ch); const fair = ch === 0 && me === 4 && others.every(i => keep.has(i)) && !keep.has(0); rd.innerHTML = fair ? '<b>fair test!</b> one thing changed (water), one measured (days), the rest kept the same' : ch !== 0 ? 'the question is about water — change the amount of water' : me !== 4 ? 'measure the result: days to sprout' : keep.has(0) ? 'you cannot keep water the same and change it too' : `keep these the same too: ${others.filter(i => !keep.has(i)).map(i => VARS[i]).join(', ')}`; } draw(); return null; } },
      { title: 'Steps of science', intro: 'Press <kbd>S</kbd> to follow an investigation: Why does ice melt faster in the sun?',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Observe', 'ice in a steel glass outside melts faster than in a clay pot inside.'], ['Question', 'does warmth make ice melt faster?'], ['Hypothesis', 'ice melts faster where it is warmer.'], ['Experiment', 'same-size ice cubes on two plates — one in sun, one in shade; time how long each takes.'], ['Record', 'sun: 12 minutes, shade: 25 minutes (repeat 3 times).'], ['Conclude', 'warmth speeds up melting — the hypothesis is supported. New question: does the plate material matter?']] }); } }
    ],
    gens: [
      { title: 'Variables', gen(R) { const t = R.pick([['Does sugar dissolve faster in hot water?', 'water temperature', 'time to dissolve', 'amount of sugar and water, stirring'], ['Do plants grow taller in more sunlight?', 'hours of sunlight', 'plant height', 'kind of plant, water, soil, pot'], ['Does a ball bounce higher from a greater height?', 'drop height', 'bounce height', 'same ball, same floor']]); return { q: `${t[0]} Name the variable to change, to measure, and to keep the same.`, a: `change: ${t[1]}; measure: ${t[2]}; keep same: ${t[3]}` }; } },
      { title: 'Steps', gen(R) { return G9.S9.pickQ(R, [['What is a hypothesis?', 'a testable guess that answers a question'], ['Why repeat an experiment?', 'to check the result is reliable'], ['What is the first step of investigating?', 'observe and ask a question'], ['Why change only one thing in a test?', 'so we know what caused the change']]); } },
      { title: 'Average of trials', levels: [2, 3], gen(R) { const a = R.int(10, 20), b = R.int(10, 20), c = R.int(10, 20); const m = (a + b + c) / 3; return { q: `Ice melted in ${a}, ${b} and ${c} minutes in three trials. Average time?`, a: `${+m.toFixed(1)} minutes`, ans: m, tol: 0.05 }; } },
      { title: 'Observation or inference', levels: [2, 3], gen(R) { return G9.S9.groupQ(R, [['the leaf is yellow', 0], ['the plant needs more water', 1], ['the water is 30 °C', 0], ['it must have rained last night', 1], ['the bell rang three times', 0]], ['observation', 'inference'], 'Observation or inference: '); } },
      { title: 'Indian scientists', gen(R) { return G9.S9.pickQ(R, [['Which Indian scientist won the Nobel Prize for the scattering of light?', 'C. V. Raman'], ['Who was the "Missile Man of India"?', 'A. P. J. Abdul Kalam'], ['Who developed high-yield sugarcane varieties?', 'Janaki Ammal'], ['Who studied plant responses with sensitive instruments?', 'Jagadish Chandra Bose']]); } }
    ],
    quiz: [
      { q: 'A hypothesis is', o: ['a testable guess', 'the final answer', 'a law', 'an instrument'], a: 0, e: 'Guess.' }, { q: 'Fair test changes', o: ['one variable', 'all variables', 'two variables', 'nothing'], a: 0, e: 'One.' },
      { q: 'Why repeat trials?', o: ['reliability', 'to waste time', 'to change answers', 'no reason'], a: 0, e: 'Check.' }, { q: 'Observation uses', o: ['senses or instruments', 'guessing only', 'dreams', 'votes'], a: 0, e: 'Evidence.' },
      { q: 'C. V. Raman studied', o: ['scattering of light', 'rockets', 'sugarcane', 'magnets'], a: 0, e: 'Raman effect.' }, { q: 'Average of 10, 12, 14', o: ['12', '36', '14', '10'], a: 0, e: '36 ÷ 3.' },
      { q: 'If results do not support the hypothesis', o: ['change the hypothesis and test again', 'hide results', 'stop science', 'change data'], a: 0, e: 'Honest.' }, { q: '"The plant needs water" is', o: ['an inference', 'an observation', 'a measurement', 'a law'], a: 0, e: 'Reasoned.' },
      { q: 'Variable we measure', o: ['dependent variable', 'controlled variable', 'hypothesis', 'conclusion'], a: 0, e: 'Result.' }, { q: 'Science is', o: ['a way of finding out', 'only facts to memorise', 'magic', 'opinion'], a: 0, e: 'Process.' },
      { q: 'Controlled variables are', o: ['kept the same', 'changed', 'measured', 'ignored'], a: 0, e: 'Same.' }
    ],
    teach: {
      outcomes: ['Describe the scientific method', 'Plan a fair test with variables', 'Tell observation from inference'],
      periods: [{ t: 'Asking questions', flow: [['10 min', 'Mystery box observations.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Question wall.']] }, { t: 'Fair tests', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Ice-melting investigation.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Science is only memorising.', 'Wrong hypothesis = failure.'], activities: ['Ice-melt race.', 'Paper helicopter drop test.'],
      exit: ['Steps of the method.', 'Variables for a given question.', 'One observation, one inference.'], homework: 'Plan a fair test at home (e.g., which cloth dries fastest) and record results.'
    },
    slides: [{ t: 'The Wonderful World of Science', b: ['Observe and question', 'Hypothesis', 'Fair test and variables', 'Conclude and share'] }, { t: 'Think and share', b: ['What would you keep the same?', 'Is "it will rain" an observation?'] }],
    fs: { groups: [['Method', [['1', 'observe, question'], ['2', 'hypothesis'], ['3', 'experiment'], ['4', 'record, conclude']]], ['Variables', [['Change', 'independent'], ['Measure', 'dependent'], ['Keep same', 'controlled']]], ['Good practice', [['Repeat', 'take average'], ['Honest', 'record what happens']]]],
      ex: [['Trials 12, 15, 18 min', 'average 15 min'], ['Sugar in hot water?', 'change temperature, measure time']], rem: ['One change at a time.', 'Repeat and average.', 'Observation ≠ inference.'] }
  });
})();
