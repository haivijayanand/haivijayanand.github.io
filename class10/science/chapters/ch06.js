/*
TOOL:    class10_science_ch06
FAMILY:  CBSE_REVISION / Class 10 Science (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 6 Control and Coordination (neurons, reflex arc, brain parts, protection, plant hormones and tropisms, animal hormones, endocrine glands, feedback) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const GL = [['pituitary', 'growth hormone', 'growth; controls other glands (master gland)'], ['thyroid', 'thyroxin', 'metabolism; needs iodine — goitre if lacking'], ['pancreas', 'insulin', 'lowers blood sugar — lack causes diabetes'], ['adrenal', 'adrenaline', 'fight or flight — faster heart, more blood to muscles'], ['testes', 'testosterone', 'male changes at puberty'], ['ovaries', 'oestrogen', 'female changes at puberty'], ['hypothalamus', 'releasing hormones', 'signals the pituitary']];
  G9.register({
    no: 6, part: 'All chapters', short: 'Coordination', title: 'Control and Coordination',
    blurb: 'Nervous system — neuron structure, synapse, reflex action and reflex arc, human brain (forebrain, midbrain, hindbrain: cerebrum, cerebellum, medulla), protection; coordination in plants — immediate responses and tropisms, plant hormones (auxin, gibberellin, cytokinin, abscisic acid); hormones in animals — endocrine glands and feedback control.',
    revise: {
      oneLine: 'Nerves carry fast electrical impulses: dendrite → cell body → axon → synapse (chemical). A reflex arc (receptor → sensory neuron → spinal cord → motor neuron → effector) gives quick automatic responses. Brain: cerebrum (thinking, voluntary actions), cerebellum (balance, posture), medulla (heartbeat, breathing, vomiting). Plants respond with tropisms controlled by hormones (auxin – bending to light; gibberellin – stem growth; cytokinin – cell division; abscisic acid – inhibits growth, wilting). Animal hormones from endocrine glands are controlled by feedback.',
      sections: [
        { h: 'Tropisms', html: `<p>Phototropism (shoot to light), geotropism (root down), hydrotropism (root to water), chemotropism (pollen tube to ovule). Touch-me-not folding is a non-growth movement (water changes).</p>` },
        { h: 'Feedback', html: `<p>High blood sugar → pancreas releases insulin → sugar falls → insulin release drops.</p>` },
        { h: 'Protection', html: `<p>Brain in the skull with fluid-filled membranes; spinal cord in the vertebral column.</p>` }
      ],
      formulas: [['Neuron path', 'dendrite → cell body → axon → synapse'], ['Reflex arc', 'receptor → sensory → spinal cord → motor → effector'], ['Auxin', 'bending towards light'], ['Insulin', 'lowers blood sugar'], ['Iodine', 'needed for thyroxin']],
      terms: [['Synapse', 'gap between neurons, crossed by chemicals'], ['Tropism', 'directional growth response'], ['Endocrine gland', 'ductless gland releasing hormones into blood']],
      traps: ['Reflexes are controlled by the spinal cord, not the brain.', 'Auxin accumulates on the shaded side.', 'Hormones act slower than nerves but last longer.'],
      bridge: '<p>Class 11 Biology: neural and chemical coordination in depth.</p>'
    },
    explore: [
      { title: 'Endocrine glands', intro: 'Choose a gland; see its hormone and effect. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'gland', GL.map(g => g[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { const g = GL[k]; rd.innerHTML = `<b>${g[0]}</b> → hormone <b>${g[1]}</b>: ${g[2]}`; } const step = () => { k = (k + 1) % GL.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Reflex arc', intro: 'Touching a hot plate. <kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { const P = [[-4, 0], [-2, 1], [0, 1.4], [2, 1], [4, 0]]; const L = ['receptor (skin)', 'sensory neuron', 'spinal cord (relay)', 'motor neuron', 'effector (muscle)']; const dr = k => b => { for (let i = 0; i < 4; i++) b.line(P[i][0], P[i][1], P[i + 1][0], P[i + 1][1], { color: i < k ? C.orange : C.grey, w: 3 }); P.forEach((p, i) => { b.dot(p[0], p[1], { r: 8, color: i <= k ? C.orange : C.blue }); b.text(p[0], p[1] - 0.5, L[i], { font: '11px' }); }); };
          return G9.S9.stages(el, K, { board: { xmin: -5.5, xmax: 5.5, ymin: -1, ymax: 2, axes: false, grid: 0, aspect: 0.3 }, stages: [['Stimulus', 'Heat receptors in the skin detect the hot plate.', dr(0)], ['Sensory neuron', 'Impulse travels to the spinal cord.', dr(1)], ['Spinal cord', 'Relay neuron connects directly to a motor neuron — no waiting for the brain.', dr(2)], ['Motor neuron', 'Impulse travels to the arm muscle.', dr(3)], ['Response', 'Muscle contracts; hand pulls away in a fraction of a second. The brain learns of it later.', dr(4)]] }); } }
    ],
    gens: [
      { title: 'Gland', gen(R) { const g = R.pick(GL); return R.chance(.5) ? { q: `Hormone of the ${g[0]} and its role?`, a: `${g[1]}: ${g[2]}` } : { q: `Which gland makes ${g[1]}?`, a: g[0] }; } },
      { title: 'Brain part', gen(R) { return G9.S9.groupQ(R, [['thinking and memory', 0], ['balance while cycling', 1], ['heartbeat and breathing', 2], ['picking up a pencil voluntarily', 0], ['posture', 1], ['vomiting and salivation', 2]], ['cerebrum', 'cerebellum', 'medulla'], 'Controlled by: '); } },
      { title: 'Tropism', gen(R) { return G9.S9.groupQ(R, [['shoot bending to a window', 0], ['roots growing downward', 1], ['roots growing towards moist soil', 2], ['pollen tube growing to ovule', 3]], ['phototropism', 'geotropism', 'hydrotropism', 'chemotropism'], 'Name: '); } },
      { title: 'Impulse time', levels: [2, 3], gen(R) { const v = R.pick([50, 80, 100]), d = R.pick([1, 1.2, 1.5]); return { q: `A nerve impulse travels ${d} m at ${v} m/s. Time in milliseconds?`, a: `${+(d / v * 1000).toFixed(1)} ms`, ans: d / v * 1000, tol: 0.05 }; } },
      { title: 'Plant hormones', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Hormone that makes shoots bend to light?', 'auxin'], ['Hormone for stem elongation?', 'gibberellin'], ['Hormone promoting cell division?', 'cytokinin'], ['Hormone that inhibits growth, causes wilting?', 'abscisic acid']]); } }
    ],
    quiz: [
      { q: 'Reflexes are controlled by', o: ['spinal cord', 'cerebrum', 'heart', 'stomach'], a: 0, e: 'Quick.' }, { q: 'Balance', o: ['cerebellum', 'cerebrum', 'medulla', 'pituitary'], a: 0, e: 'Posture.' },
      { q: 'Insulin from', o: ['pancreas', 'thyroid', 'adrenal', 'liver'], a: 0, e: 'Sugar.' }, { q: 'Iodine needed for', o: ['thyroxin', 'insulin', 'adrenaline', 'auxin'], a: 0, e: 'Thyroid.' },
      { q: 'Shoot bends to light due to', o: ['auxin', 'abscisic acid', 'insulin', 'cytokinin'], a: 0, e: 'Auxin.' }, { q: 'Master gland', o: ['pituitary', 'thyroid', 'adrenal', 'ovary'], a: 0, e: 'Controls others.' },
      { q: 'Gap between neurons', o: ['synapse', 'axon', 'dendrite', 'nephron'], a: 0, e: 'Synapse.' }, { q: 'Fight or flight', o: ['adrenaline', 'thyroxin', 'oestrogen', 'insulin'], a: 0, e: 'Adrenal.' },
      { q: 'Roots grow down', o: ['positive geotropism', 'phototropism', 'hydrotropism only', 'none'], a: 0, e: 'Gravity.' }, { q: 'Wilting hormone', o: ['abscisic acid', 'gibberellin', 'auxin', 'cytokinin'], a: 0, e: 'Inhibitor.' },
      { q: 'Medulla controls', o: ['heartbeat', 'thinking', 'balance', 'vision only'], a: 0, e: 'Involuntary.' }
    ],
    teach: {
      outcomes: ['Explain neurons and reflex arcs', 'Name brain parts and roles', 'Describe plant and animal hormones'],
      periods: [{ t: 'Nervous system', flow: [['10 min', 'Ruler-drop reaction test.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Brain map.']] }, { t: 'Hormones', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Phototropism set-up.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Brain controls all reflexes.', 'Plants cannot respond.'], activities: ['Ruler-drop reaction time.', 'Seedling in a box with a hole.'],
      exit: ['Reflex arc order.', 'Three brain parts.', 'Two hormones each.'], homework: 'Measure reaction time 5 times with a ruler drop; calculate the average.'
    },
    slides: [{ t: 'Control and Coordination', b: ['Neurons and reflexes', 'Brain', 'Plant hormones and tropisms', 'Endocrine glands'] }, { t: 'Think and share', b: ['Why are reflexes fast?', 'Why does a plant bend to light?'] }],
    fs: { groups: [['Nerves', [['Neuron', 'dendrite → axon'], ['Reflex arc', 'receptor → cord → effector'], ['Synapse', 'chemical gap']]], ['Brain', [['Cerebrum', 'thinking'], ['Cerebellum', 'balance'], ['Medulla', 'heartbeat']]], ['Hormones', [['Plants', 'auxin, gibberellin, cytokinin, ABA'], ['Animals', 'insulin, thyroxin, adrenaline, GH'], ['Control', 'feedback']]]],
      ex: [['1 m at 100 m/s', '10 ms'], ['Diabetes', 'lack of insulin']], rem: ['Reflex via spinal cord.', 'Auxin on shaded side.', 'Feedback balances hormones.'] }
  });
})();
