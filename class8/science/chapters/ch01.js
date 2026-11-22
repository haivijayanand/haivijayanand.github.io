/*
TOOL:    class8_science_ch01
FAMILY:  CBSE_REVISION / Class 8 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 1 Exploring the Investigative World of Science (investigation cycle, variables, controls, data tables, graphs, scientists of India) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 1, part: 'All chapters', short: 'Investigating', title: 'Exploring the Investigative World of Science',
    blurb: 'How scientists investigate: questions, hypotheses, independent, dependent and controlled variables, control set-ups, recording data in tables, drawing graphs, drawing conclusions and sharing results — with a preview of the year.',
    revise: {
      oneLine: 'An investigation tests a hypothesis by changing one independent variable, measuring the dependent variable and keeping controlled variables the same. A control set-up gives a baseline for comparison. Data go into tables and graphs; patterns lead to conclusions, which are shared and checked by others.',
      sections: [
        { h: 'Variables', html: `<p>Independent: what you change (e.g., amount of sunlight). Dependent: what you measure (plant height). Controlled: kept same (water, soil, pot, seed type).</p>` },
        { h: 'Control set-up', html: `<p>Same as the test set-up but without the factor being tested — shows the change is due to that factor.</p>` },
        { h: 'Graphs', html: `<p>Put the independent variable on the x-axis, dependent on the y-axis; label units; draw a smooth line or bars.</p>` }
      ],
      formulas: [['Independent', 'changed'], ['Dependent', 'measured'], ['Controlled', 'kept same'], ['x-axis', 'independent'], ['y-axis', 'dependent']],
      terms: [['Hypothesis', 'testable explanation'], ['Control', 'comparison set-up without the factor'], ['Data', 'recorded observations']],
      traps: ['Correlation is not always cause.', 'More trials improve reliability.', 'Do not change two variables together.'],
      bridge: '<p>Each chapter this year has investigations.</p>'
    },
    explore: [
      { title: 'Plant growth investigation', intro: 'Choose hours of light per day; see typical growth after 2 weeks (illustrative data).',
        build(el, K) { const D = [[0, 2], [2, 5], [4, 8], [6, 11], [8, 13], [10, 14], [12, 14.5]]; let k = 3; const row = K.row(el); K.slider(row, 'light (h/day)', 0, 6, 1, k, v => { k = v; b.redraw(); }); const b = new K.Board(el, { xmin: -1.5, xmax: 13.5, ymin: -2, ymax: 16, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.line(0, 0, 13, 0, { color: C.ink, w: 1.5 }); b.line(0, 0, 0, 15.5, { color: C.ink, w: 1.5 }); b.text(6.5, -1.3, 'light (hours per day) — independent', { font: '11px' }); b.text(-0.8, 15.6, 'height (cm)', { font: '11px' }); for (let i = 0; i < D.length - 1; i++) b.line(D[i][0], D[i][1], D[i + 1][0], D[i + 1][1], { color: C.blue, w: 2 }); D.forEach((d, i) => { b.dot(d[0], d[1], { r: i === k ? 9 : 5, color: i === k ? C.orange : C.blue }); b.text(d[0], -0.6, String(d[0]), { font: '10px' }); });
            rd.innerHTML = `${D[k][0]} h light/day → plant height ≈ <b>${D[k][1]} cm</b> · controlled: water, soil, pot, seed type, temperature · the curve levels off at high light`; };
          b.redraw(); return null; } },
      { title: 'Name the variables', intro: 'Sort: which kind of variable? (Investigation: “Does water temperature affect how fast sugar dissolves?”)',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Independent', 'Dependent', 'Controlled'], items: [['water temperature', 0], ['time to dissolve', 1], ['amount of sugar', 2], ['volume of water', 2], ['stirring speed', 2], ['size of sugar crystals', 2]] }); } }
    ],
    gens: [
      { title: 'Variables', gen(R) { const t = R.pick([['Does fertiliser amount affect plant height?', 'fertiliser amount', 'plant height'], ['Does ramp slope affect ball speed?', 'slope', 'speed'], ['Does salt affect the boiling point of water?', 'amount of salt', 'boiling point'], ['Does exercise change pulse rate?', 'exercise time', 'pulse rate']]); return { q: `${t[0]} Independent and dependent variables?`, a: `independent: ${t[1]}; dependent: ${t[2]}` }; } },
      { title: 'Average', gen(R) { const v = [R.int(10, 20), R.int(10, 20), R.int(10, 20), R.int(10, 20)]; const m = v.reduce((a, b) => a + b, 0) / 4; return { q: `Four trials: ${v.join(', ')}. Mean?`, a: String(m), ans: m }; } },
      { title: 'Control', gen(R) { return G9.S9.pickQ(R, [['Why have a control set-up?', 'to compare and show the effect is due to the tested factor'], ['Testing if light is needed for starch — control?', 'an identical plant kept in light'], ['Why keep other variables the same?', 'so only one factor causes the change'], ['Why repeat trials?', 'to check results are reliable']]); } },
      { title: 'Graph axes', levels: [2, 3], gen(R) { const t = R.pick([['temperature vs time of heating', 'time', 'temperature'], ['distance vs time of a walk', 'time', 'distance'], ['plant height vs fertiliser', 'fertiliser', 'plant height']]); return { q: `Graph of ${t[0]}: what goes on the x-axis and y-axis?`, a: `x: ${t[1]} (independent); y: ${t[2]} (dependent)` }; } },
      { title: 'Percentage change', levels: [2, 3], gen(R) { const a = R.int(20, 50), b = a + R.int(5, 30); return { q: `Plant height rose from ${a} cm to ${b} cm. Percentage increase?`, a: `${+((b - a) / a * 100).toFixed(1)}%`, ans: (b - a) / a * 100, tol: 0.1 }; } }
    ],
    quiz: [
      { q: 'Variable you change', o: ['independent', 'dependent', 'controlled', 'constant'], a: 0, e: 'Changed.' }, { q: 'Variable you measure', o: ['dependent', 'independent', 'controlled', 'none'], a: 0, e: 'Measured.' },
      { q: 'Kept same', o: ['controlled variables', 'dependent', 'independent', 'results'], a: 0, e: 'Same.' }, { q: 'x-axis usually', o: ['independent', 'dependent', 'title', 'none'], a: 0, e: 'Cause.' },
      { q: 'Control set-up', o: ['for comparison', 'to change many things', 'is optional always', 'is the result'], a: 0, e: 'Baseline.' }, { q: 'Hypothesis must be', o: ['testable', 'proven', 'secret', 'long'], a: 0, e: 'Testable.' },
      { q: 'Mean of 4, 6, 8', o: ['6', '18', '8', '4'], a: 0, e: '18/3.' }, { q: 'Reliability improves by', o: ['repeating', 'guessing', 'one trial', 'changing all'], a: 0, e: 'Repeat.' },
      { q: 'Results are shared so that', o: ['others can check', 'no one sees', 'they change', 'marks increase'], a: 0, e: 'Review.' }, { q: 'Two variables changed together', o: ['unfair test', 'fair test', 'control', 'best'], a: 0, e: 'Unfair.' },
      { q: 'Data recorded in', o: ['tables', 'memory only', 'nowhere', 'songs'], a: 0, e: 'Tables.' }
    ],
    teach: {
      outcomes: ['Identify variables', 'Design a controlled investigation', 'Present data in tables and graphs'],
      periods: [{ t: 'Plan', flow: [['10 min', 'Pick a question.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Write a plan.']] }, { t: 'Data', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Draw a graph from class data.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Control is unnecessary.', 'Any graph axes order.'], activities: ['Dissolving race.', 'Class height graph.'],
      exit: ['Three variable types.', 'Why a control?', 'Axes rule.'], homework: 'Design an investigation at home, naming all variables and a control.'
    },
    slides: [{ t: 'Investigative World of Science', b: ['Hypothesis', 'Variables', 'Controls', 'Tables and graphs'] }, { t: 'Think and share', b: ['Independent vs dependent?', 'Why a control?'] }],
    fs: { groups: [['Variables', [['Independent', 'changed'], ['Dependent', 'measured'], ['Controlled', 'same']]], ['Design', [['Control', 'comparison'], ['Trials', 'repeat'], ['Mean', 'sum ÷ n']]], ['Graph', [['x', 'independent'], ['y', 'dependent'], ['Label', 'units']]]],
      ex: [['12, 14, 16, 18', 'mean 15'], ['20 → 25 cm', '25% increase']], rem: ['One change at a time.', 'Use a control.', 'Graph clearly.'] }
  });
})();
