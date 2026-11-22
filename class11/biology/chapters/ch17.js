/*
TOOL:    class11_biology_ch17
FAMILY:  CBSE_REVISION / Class 11 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 17 Locomotion and Movement (types of movement, muscle types, sarcomere structure, sliding filament theory, contraction mechanism, skeletal system, joints, disorders) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 17, part: 'Unit V · Human physiology', short: 'Locomotion', title: 'Locomotion and Movement',
    blurb: 'Amoeboid, ciliary and muscular movement; skeletal, visceral and cardiac muscle; structure of skeletal muscle — fascicles, fibres, myofibrils, sarcomere (A band, I band, Z line, H zone, M line); actin, myosin, troponin, tropomyosin; sliding filament theory and the role of Ca²⁺ and ATP; red and white fibres; skeletal system (206 bones; axial 80, appendicular 126); joints — fibrous, cartilaginous, synovial (ball and socket, hinge, pivot, gliding, saddle); disorders — myasthenia gravis, tetany, muscular dystrophy, arthritis, osteoporosis, gout.',
    revise: {
      oneLine: 'A sarcomere runs Z line to Z line; thin (actin) filaments form the I band, thick (myosin) filaments the A band. Contraction: nerve impulse → acetylcholine at neuromuscular junction → action potential → Ca²⁺ released from sarcoplasmic reticulum → binds troponin → tropomyosin moves, exposing myosin-binding sites on actin → cross bridges form, ATP hydrolysed → actin slides over myosin. In contraction, I band and H zone shorten, A band stays the same, sarcomere shortens. Human skeleton: 206 bones (axial 80: skull 29, vertebral column 26, sternum 1, ribs 24; appendicular 126).',
      sections: [
        { h: 'Joints', html: '<p>Fibrous (skull sutures — immovable), cartilaginous (between vertebrae — slight), synovial (freely movable): ball and socket (shoulder, hip), hinge (knee, elbow), pivot (atlas–axis), gliding (carpals), saddle (thumb carpal–metacarpal).</p>' },
        { h: 'Red vs white fibres', html: '<p>Red: myoglobin, many mitochondria, aerobic, slow fatigue. White: few mitochondria, anaerobic, fast but tire quickly.</p>' },
        { h: 'Disorders', html: '<p>Myasthenia gravis (autoimmune, neuromuscular junction), tetany (low Ca²⁺), muscular dystrophy (genetic), arthritis, osteoporosis (low oestrogen, bone loss), gout (uric acid crystals in joints).</p>' }
      ],
      formulas: [['Sarcomere', 'Z to Z'], ['Contraction', 'I band and H zone shorten; A band constant'], ['Bones', '206 = 80 + 126'], ['Ribs', '12 pairs (7 true, 3 false, 2 floating)'], ['Skull', '29 bones']],
      terms: [['Sarcomere', 'functional unit of contraction'], ['Motor unit', 'a motor neuron and the fibres it supplies'], ['Synovial joint', 'freely movable joint with fluid-filled cavity']],
      traps: ['A band does not change length in contraction.', 'Ca²⁺ binds troponin, not myosin.', 'Rigor mortis follows ATP loss (cross bridges can’t detach).'],
      bridge: '<p>Ch 18 explains the nerve signals that start contraction.</p>'
    },
    explore: [
      { title: 'Sarcomere contraction', intro: 'Slide the contraction level; see bands change.',
        build(el, K) { let c = 0; const row = K.row(el); K.slider(row, 'contraction (%)', 0, 100, 5, c, v => { c = v; b.redraw(); }); const b = new K.Board(el, { xmin: -6, xmax: 6, ymin: -2, ymax: 2, axes: false, grid: 0, aspect: 0.35 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const A = 3.2, half = 4.5 - 1.5 * c / 100, act = 3.0; b.line(-half, -1.6, -half, 1.6, { color: C.ink, w: 3 }); b.line(half, -1.6, half, 1.6, { color: C.ink, w: 3 }); b.text(-half, 1.85, 'Z', { font: 'bold 12px' }); b.text(half, 1.85, 'Z', { font: 'bold 12px' }); [-0.9, 0, 0.9].forEach(y => { b.line(-A / 2, y, A / 2, y, { color: C.orange, w: 6 }); b.line(-half, y + 0.3, -half + act, y + 0.3, { color: C.blue, w: 2.5 }); b.line(half, y + 0.3, half - act, y + 0.3, { color: C.blue, w: 2.5 }); }); b.line(0, -1.4, 0, 1.4, { color: C.purple, w: 1, dash: [3, 3] });
            const I = 2 * (half - A / 2), H = Math.max(0, 2 * (half - act)); rd.innerHTML = `sarcomere ${(2 * half).toFixed(1)} · <span style="color:${C.orange}">A band (myosin)</span> ${A.toFixed(1)} (constant) · <span style="color:${C.blue}">actin</span> slides in · I band ${I.toFixed(1)} · H zone ${H.toFixed(1)} — I band and H zone shrink`; };
          b.redraw(); return null; } },
      { title: 'Contraction steps', intro: '<kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Signal', 'Motor neuron releases acetylcholine at the neuromuscular junction.'], ['Action potential', 'Spreads over the sarcolemma and into T-tubules.'], ['Ca²⁺ release', 'Sarcoplasmic reticulum releases Ca²⁺ into sarcoplasm.'], ['Sites exposed', 'Ca²⁺ binds troponin; tropomyosin shifts; myosin-binding sites on actin open.'], ['Cross bridges', 'Myosin heads (with ADP + Pi) bind actin and pull — power stroke.'], ['Release', 'New ATP binds; head detaches; cycle repeats while Ca²⁺ is present.'], ['Relaxation', 'Ca²⁺ pumped back; sites covered; filaments slide back.']] }); } }
    ],
    gens: [
      { title: 'Joint type', gen(R) { return G9.S9.groupQ(R, [['shoulder', 0], ['knee', 1], ['atlas–axis', 2], ['between carpals', 3], ['thumb base', 4], ['hip', 0], ['elbow', 1]], ['ball and socket', 'hinge', 'pivot', 'gliding', 'saddle'], 'Joint at '); } },
      { title: 'Bone count', gen(R) { return G9.S9.pickQ(R, [['Total bones in adult human?', '206'], ['Bones in the skull?', '29 (cranium 8, face 14, hyoid 1, ear ossicles 6)'], ['Vertebrae in adult?', '26'], ['Pairs of ribs?', '12 (7 true, 3 false, 2 floating)'], ['Bones in axial skeleton?', '80']]); } },
      { title: 'Bands', gen(R) { return G9.S9.groupQ(R, [['A band', 0], ['I band', 1], ['H zone', 1], ['sarcomere', 1]], ['stays the same in contraction', 'shortens in contraction'], ''); } },
      { title: 'Proteins', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Ca²⁺ binds to?', 'troponin'], ['Which protein has ATPase heads?', 'myosin'], ['What covers myosin-binding sites at rest?', 'tropomyosin'], ['Why rigor mortis?', 'no ATP, cross bridges cannot detach']]); } },
      { title: 'Disorders', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Low Ca²⁺ in body fluids causes?', 'tetany'], ['Uric acid crystals in joints?', 'gout'], ['Autoimmune disorder of neuromuscular junction?', 'myasthenia gravis'], ['Bone loss in elderly, linked to low oestrogen?', 'osteoporosis']]); } }
    ],
    quiz: [
      { q: 'Functional unit of muscle', o: ['sarcomere', 'myofibril', 'fascicle', 'neuron'], a: 0, e: 'Z to Z.' }, { q: 'Ca²⁺ binds', o: ['troponin', 'myosin', 'actin', 'tropomyosin'], a: 0, e: 'Switch.' },
      { q: 'Constant in contraction', o: ['A band', 'I band', 'H zone', 'sarcomere'], a: 0, e: 'Myosin length.' }, { q: 'Bones in adult', o: ['206', '300', '212', '186'], a: 0, e: 'Count.' },
      { q: 'Knee joint', o: ['hinge', 'ball and socket', 'pivot', 'saddle'], a: 0, e: 'One plane.' }, { q: 'Ca²⁺ stored in', o: ['sarcoplasmic reticulum', 'nucleus', 'Golgi', 'mitochondria only'], a: 0, e: 'SR.' },
      { q: 'Gout due to', o: ['uric acid crystals', 'low Ca²⁺', 'virus', 'oestrogen'], a: 0, e: 'Joints.' }, { q: 'Red muscle fibres', o: ['myoglobin, aerobic', 'no mitochondria', 'fast fatigue', 'white'], a: 0, e: 'Endurance.' },
      { q: 'Floating ribs pairs', o: ['2', '3', '7', '12'], a: 0, e: '11th, 12th.' }, { q: 'Neurotransmitter at NMJ', o: ['acetylcholine', 'adrenaline', 'dopamine', 'insulin'], a: 0, e: 'ACh.' },
      { q: 'Pivot joint', o: ['atlas–axis', 'knee', 'hip', 'carpals'], a: 0, e: 'Rotation.' }
    ],
    teach: {
      outcomes: ['Describe sarcomere structure', 'Explain sliding filament theory', 'Classify bones and joints'],
      periods: [{ t: 'Muscle', flow: [['10 min', 'Arm curl feel.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Explore panel 2.']] }, { t: 'Skeleton', flow: [['15 min', 'Skeleton model counting.'], ['15 min', 'Joint movements.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Filaments shorten.', 'Ca²⁺ binds myosin.'], activities: ['Band diagram before/after.', 'Joint movement charades.'],
      exit: ['Band changes.', 'Contraction steps.', 'Joint types.'], homework: 'Draw a sarcomere relaxed and contracted, labelling all bands.'
    },
    slides: [{ t: 'Locomotion and Movement', b: ['Types of movement', 'Sarcomere', 'Sliding filament theory', 'Skeleton, joints, disorders'] }, { t: 'Think and share', b: ['Which band stays constant?', 'Why rigor mortis?'] }],
    fs: { groups: [['Sarcomere', [['A band', 'myosin, constant'], ['I band', 'actin, shortens'], ['H zone', 'shortens']]], ['Contraction', [['Trigger', 'ACh → AP → Ca²⁺'], ['Switch', 'troponin–tropomyosin'], ['Energy', 'ATP']]], ['Skeleton', [['Bones', '206 (80 + 126)'], ['Joints', 'fibrous, cartilaginous, synovial'], ['Disorders', 'tetany, gout, osteoporosis']]]],
      ex: [['Shoulder', 'ball and socket'], ['Contraction', 'A band same']], rem: ['Filaments slide.', 'Ca²⁺ → troponin.', 'Know joint types.'] }
  });
})();
