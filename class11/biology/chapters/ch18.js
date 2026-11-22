/*
TOOL:    class11_biology_ch18
FAMILY:  CBSE_REVISION / Class 11 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 18 Neural Control and Coordination (neural system, neuron structure and types, generation and conduction of nerve impulse, resting and action potential, synapse, CNS, brain parts and functions) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const BR = [['cerebrum', 'forebrain', 'thinking, memory, sensory and motor areas, association areas'], ['thalamus', 'forebrain', 'relay centre for sensory and motor signals'], ['hypothalamus', 'forebrain', 'temperature, hunger, thirst, hormones (neurohormones)'], ['limbic system', 'forebrain', 'emotions, motivation, sexual behaviour'], ['midbrain (corpora quadrigemina)', 'midbrain', 'visual and auditory reflexes'], ['cerebellum', 'hindbrain', 'balance, posture, coordination'], ['pons', 'hindbrain', 'relays; part of respiratory control'], ['medulla oblongata', 'hindbrain', 'breathing, heartbeat, gastric secretions, swallowing, coughing']];
  G9.register({
    no: 18, part: 'Unit V · Human physiology', short: 'Neural control', title: 'Neural Control and Coordination',
    blurb: 'Neural system of animals; human neural system — CNS and PNS (somatic, autonomic: sympathetic and parasympathetic); neuron structure (dendrites, cell body, axon, myelin sheath, nodes of Ranvier) and types; resting potential and action potential; conduction (saltatory in myelinated fibres); synapse — electrical and chemical (neurotransmitters); central nervous system — forebrain, midbrain, hindbrain and their functions.',
    revise: {
      oneLine: 'At rest the axon membrane is polarised (outside positive, inside negative; resting potential ≈ −70 mV) — maintained by the Na⁺/K⁺ pump (3 Na⁺ out, 2 K⁺ in). A stimulus opens Na⁺ channels → Na⁺ rushes in → depolarisation (action potential ≈ +30 mV); K⁺ then moves out → repolarisation. The impulse travels along the axon; in myelinated fibres it jumps node to node (saltatory, faster). At a chemical synapse, neurotransmitter (e.g., acetylcholine) released by exocytosis crosses the cleft and opens ion channels on the post-synaptic membrane. Brain: forebrain (cerebrum, thalamus, hypothalamus), midbrain, hindbrain (pons, cerebellum, medulla).',
      sections: [
        { h: 'Neuron types', html: '<p>Multipolar (cerebral cortex), bipolar (retina), unipolar (embryonic stage). Myelinated fibres in cranial and spinal nerves; non-myelinated in autonomic and somatic systems.</p>' },
        { h: 'Brainstem', html: '<p>Midbrain + pons + medulla form the brainstem — connects brain to spinal cord.</p>' },
        { h: 'Autonomic system', html: '<p>Sympathetic: fight or flight (heart rate up, pupils dilate). Parasympathetic: rest and digest.</p>' }
      ],
      formulas: [['Resting potential', '≈ −70 mV'], ['Na⁺/K⁺ pump', '3 Na⁺ out, 2 K⁺ in'], ['Depolarisation', 'Na⁺ in'], ['Repolarisation', 'K⁺ out'], ['Saltatory', 'node to node (myelinated)']],
      terms: [['Synapse', 'junction between neurons'], ['Neurotransmitter', 'chemical carrying the signal across a synapse'], ['Corpus callosum', 'fibre band joining the two cerebral hemispheres']],
      traps: ['Inside of resting axon is negative.', 'Electrical synapses are rare but faster.', 'Reflexes are mediated by the spinal cord (and brainstem), not the cerebrum.'],
      bridge: '<p>Ch 19 covers the hormonal (chemical) control system.</p>'
    },
    explore: [
      { title: 'Action potential', intro: 'Watch membrane potential change. <kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { const pts = [[0, -70], [1, -70], [1.5, -55], [2, 30], [2.6, -20], [3, -80], [4, -70], [6, -70]]; const dr = k => b => { b.line(0, 0, 6.2, 0, { color: C.grey, w: 1, dash: [3, 3] }); b.text(6.4, 0, '0 mV', { font: '10px' }); b.line(0, -70 / 25, 6.2, -70 / 25, { color: C.grey, w: 1, dash: [2, 4] }); b.text(6.4, -70 / 25, '−70', { font: '10px' }); for (let i = 0; i < Math.min(k, pts.length - 1); i++) b.line(pts[i][0], pts[i][1] / 25, pts[i + 1][0], pts[i + 1][1] / 25, { color: C.blue, w: 3 }); };
          return G9.S9.stages(el, K, { board: { xmin: -0.3, xmax: 7, ymin: -3.8, ymax: 1.8, axes: false, grid: 0, aspect: 0.45 }, stages: [['Resting', 'Polarised: inside −70 mV; Na⁺/K⁺ pump keeps gradients.', dr(1)], ['Stimulus', 'Threshold reached (~ −55 mV).', dr(2)], ['Depolarisation', 'Na⁺ channels open; Na⁺ rushes in → about +30 mV.', dr(3)], ['Repolarisation', 'Na⁺ channels close, K⁺ channels open; K⁺ moves out.', dr(5)], ['Hyperpolarisation & recovery', 'Brief overshoot below −70, then resting state restored.', dr(7)]] }); } },
      { title: 'Brain map', intro: 'Choose a part. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'part', BR.map(b => b[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { rd.innerHTML = `<b>${BR[k][0]}</b> (${BR[k][1]}): ${BR[k][2]}`; } const step = () => { k = (k + 1) % BR.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } }
    ],
    gens: [
      { title: 'Brain part', gen(R) { const b = R.pick(BR); return { q: `Which part of the brain controls: ${b[2]}?`, a: `${b[0]} (${b[1]})` }; } },
      { title: 'Ions', gen(R) { return G9.S9.pickQ(R, [['Ion that enters during depolarisation?', 'Na⁺'], ['Ion that leaves during repolarisation?', 'K⁺'], ['Resting potential value?', 'about −70 mV'], ['Na⁺/K⁺ pump moves?', '3 Na⁺ out, 2 K⁺ in per ATP']]); } },
      { title: 'Conduction time', levels: [2, 3], gen(R) { const v = R.pick([1, 10, 50, 100]), d = R.pick([0.5, 1, 1.5]); return { q: `A nerve impulse travels at ${v} m/s along ${d} m. Time?`, a: `${+(d / v * 1000).toFixed(1)} ms`, ans: d / v * 1000, tol: 0.05 }; } },
      { title: 'Systems', gen(R) { return G9.S9.groupQ(R, [['increases heart rate in fear', 0], ['promotes digestion at rest', 1], ['dilates pupils', 0], ['slows heart rate', 1]], ['sympathetic', 'parasympathetic'], 'Autonomic division that '); } },
      { title: 'Synapse', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['How is neurotransmitter released?', 'exocytosis of synaptic vesicles'], ['Example of neurotransmitter?', 'acetylcholine'], ['Why is myelinated conduction faster?', 'impulse jumps between nodes of Ranvier (saltatory)'], ['Where are bipolar neurons found?', 'retina']]); } }
    ],
    quiz: [
      { q: 'Resting potential', o: ['−70 mV', '+70 mV', '0', '+30 mV'], a: 0, e: 'Polarised.' }, { q: 'Depolarisation by', o: ['Na⁺ influx', 'K⁺ influx', 'Cl⁻ out', 'Ca²⁺ out'], a: 0, e: 'Na⁺.' },
      { q: 'Balance', o: ['cerebellum', 'cerebrum', 'medulla', 'thalamus'], a: 0, e: 'Posture.' }, { q: 'Breathing centre', o: ['medulla', 'cerebrum', 'cerebellum', 'thalamus'], a: 0, e: 'Vital.' },
      { q: 'Saltatory conduction in', o: ['myelinated fibres', 'non-myelinated', 'dendrites', 'synapse'], a: 0, e: 'Nodes.' }, { q: 'Thermoregulation', o: ['hypothalamus', 'pons', 'cerebellum', 'medulla'], a: 0, e: 'Thermostat.' },
      { q: 'Joins hemispheres', o: ['corpus callosum', 'pons', 'medulla', 'thalamus'], a: 0, e: 'Fibres.' }, { q: 'Na⁺/K⁺ pump ratio', o: ['3 out : 2 in', '2 out : 3 in', '1 : 1', '3 in : 2 out'], a: 0, e: 'Electrogenic.' },
      { q: 'Neurotransmitter release', o: ['exocytosis', 'osmosis', 'diffusion of vesicles out', 'phagocytosis'], a: 0, e: 'Vesicles.' }, { q: 'Bipolar neurons in', o: ['retina', 'cortex', 'embryo only', 'spinal cord'], a: 0, e: 'Eye.' },
      { q: 'Fight or flight', o: ['sympathetic', 'parasympathetic', 'somatic', 'CNS only'], a: 0, e: 'Stress.' }
    ],
    teach: {
      outcomes: ['Explain resting and action potentials', 'Describe synaptic transmission', 'Map brain parts to functions'],
      periods: [{ t: 'Impulse', flow: [['10 min', 'Domino analogy.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Synapse diagram.']] }, { t: 'Brain', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Reaction-time experiment.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Inside is positive at rest.', 'Cerebrum controls reflexes.'], activities: ['Ruler drop reaction time.', 'Brain model labelling.'],
      exit: ['Ion movements.', 'Synapse steps.', 'Three brain parts.'], homework: 'Make a table of brain parts, location and functions.'
    },
    slides: [{ t: 'Neural Control and Coordination', b: ['Neuron', 'Nerve impulse', 'Synapse', 'Brain'] }, { t: 'Think and share', b: ['Why is myelin important?', 'Which brain part keeps you balanced?'] }],
    fs: { groups: [['Impulse', [['Rest', '−70 mV'], ['Depolarise', 'Na⁺ in'], ['Repolarise', 'K⁺ out'], ['Pump', '3 Na⁺ out, 2 K⁺ in']]], ['Synapse', [['Chemical', 'neurotransmitter'], ['Electrical', 'direct, fast'], ['Myelin', 'saltatory']]], ['Brain', [['Forebrain', 'cerebrum, thalamus, hypothalamus'], ['Midbrain', 'reflexes of sight, hearing'], ['Hindbrain', 'pons, cerebellum, medulla']]]],
      ex: [['1 m at 100 m/s', '10 ms'], ['Thirst centre', 'hypothalamus']], rem: ['Na⁺ in, K⁺ out.', 'Myelin speeds.', 'Medulla = vital.'] }
  });
})();
