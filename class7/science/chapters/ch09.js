/*
TOOL:    class7_science_ch09
FAMILY:  CBSE_REVISION / Class 7 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 9 Life Processes in Animals (nutrition: digestion steps and organs; respiration: breathing, rate, aerobic; circulation basics; excretion; animals in different habitats) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const ORG = [['mouth', 'teeth chew; saliva starts breaking starch'], ['food pipe (oesophagus)', 'pushes food to the stomach by muscle waves'], ['stomach', 'acid and juices digest proteins; kill germs'], ['small intestine', 'completes digestion; absorbs nutrients into blood'], ['large intestine', 'absorbs water; forms faeces'], ['liver', 'makes bile to help digest fats'], ['pancreas', 'makes juice to digest carbohydrates, proteins, fats']];
  G9.register({
    no: 9, part: 'All chapters', short: 'Life in animals', title: 'Life Processes in Animals',
    blurb: 'How animals obtain and use food — the human digestive system and its organs, digestion in other animals (ruminants, amoeba); breathing and respiration, breathing rate, gills, skin and spiracles; transport of materials by blood; and excretion.',
    revise: {
      oneLine: 'Digestion breaks food into simple substances: mouth → food pipe → stomach → small intestine (digestion completed, nutrients absorbed) → large intestine (water absorbed). Liver and pancreas add juices. Breathing brings oxygen to the lungs; cells use it to release energy from food (respiration), giving out carbon dioxide and water. Blood carries oxygen and food; kidneys remove wastes as urine.',
      sections: [
        { h: 'Other animals', html: `<p>Cows chew the cud (ruminants: food returns from the rumen to be chewed again). Amoeba engulfs food with false feet and digests it in a food vacuole.</p>` },
        { h: 'Breathing', html: `<p>Ribs move up and out, diaphragm moves down → air in. Breathing rate rises with exercise. Fish breathe with gills, earthworms through moist skin, insects through spiracles and tracheae.</p>` },
        { h: 'Transport and excretion', html: `<p>Heart pumps blood through arteries and veins; pulse shows heartbeats. Kidneys filter blood to make urine; sweat also removes some wastes.</p>` }
      ],
      formulas: [['Path of food', 'mouth → oesophagus → stomach → small intestine → large intestine'], ['Respiration', 'glucose + oxygen → CO₂ + water + energy'], ['Gills', 'fish'], ['Spiracles', 'insects'], ['Kidneys', 'urine']],
      terms: [['Digestion', 'breaking food into simple substances'], ['Absorption', 'digested food passing into blood'], ['Excretion', 'removal of wastes']],
      traps: ['Breathing ≠ respiration: respiration happens in cells.', 'Most digestion ends in the small intestine, not the stomach.', 'Liver and pancreas are not part of the food’s path.'],
      bridge: '<p>Class 10 studies life processes in detail.</p>'
    },
    explore: [
      { title: 'Digestive organ guide', intro: 'Step through the organs to see each job. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'organ', ORG.map(o => o[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { rd.innerHTML = `<b>${ORG[k][0]}</b>: ${ORG[k][1]}${k >= 5 ? ' <i>(food does not pass through it)</i>' : ''}`; } const step = () => { k = (k + 1) % ORG.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Breathing rate', intro: 'Compare breaths per minute during different activities (typical for a student).',
        build(el, K) { const A = [['resting', 16], ['walking', 22], ['brisk walking', 28], ['running', 40]]; const b = new K.Board(el, { xmin: -0.5, xmax: 4.5, ymin: -0.8, ymax: 4.8, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.line(-0.3, 0, 4.3, 0, { color: C.ink, w: 1.5 }); A.forEach((a, i) => { b.rect(i + 0.2, 0, 0.6, a[1] / 10, { fill: [C.blue, C.purple, C.orange, C.orange][i], color: C.ink, w: 1 }); b.text(i + 0.5, a[1] / 10 + 0.3, String(a[1]), { font: 'bold 12px' }); b.text(i + 0.5, -0.4, a[0], { font: '12px' }); }); };
          rd.innerHTML = 'More activity → body needs more energy → more oxygen → <b>faster breathing</b>. (Typical values; yours may differ.)'; b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Organ job', gen(R) { const o = R.pick(ORG); return R.chance(.5) ? { q: `Job of the ${o[0]}?`, a: o[1] } : { q: `Which organ: ${o[1]}?`, a: o[0] }; } },
      { title: 'Breathing organ', gen(R) { return G9.S9.groupQ(R, [['fish', 0], ['earthworm', 1], ['grasshopper', 2], ['human', 3], ['frog (tadpole stage)', 0], ['cockroach', 2]], ['gills', 'moist skin', 'spiracles and tracheae', 'lungs'], 'Breathes through: '); } },
      { title: 'Breaths per minute', gen(R) { const b = R.int(4, 12), s = R.pick([15, 20, 30]); return { q: `You count ${b} breaths in ${s} seconds. Breaths per minute?`, a: String(b * 60 / s), ans: b * 60 / s }; } },
      { title: 'Respiration', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Word equation for respiration?', 'glucose + oxygen → carbon dioxide + water + energy'], ['Breathing vs respiration?', 'breathing moves air; respiration releases energy in cells'], ['Why does breathing rate rise with exercise?', 'muscles need more energy and oxygen'], ['What do kidneys do?', 'filter wastes from blood as urine']]); } },
      { title: 'Pulse', levels: [2, 3], gen(R) { const p = R.int(18, 25), s = 15; return { q: `A pulse is counted as ${p} beats in ${s} s. Heart rate per minute?`, a: String(p * 4), ans: p * 4 }; } }
    ],
    quiz: [
      { q: 'Digestion completes in', o: ['small intestine', 'stomach', 'mouth', 'large intestine'], a: 0, e: 'Small int.' }, { q: 'Water absorbed in', o: ['large intestine', 'mouth', 'stomach', 'liver'], a: 0, e: 'Large int.' },
      { q: 'Bile made by', o: ['liver', 'stomach', 'pancreas', 'heart'], a: 0, e: 'Liver.' }, { q: 'Fish breathe with', o: ['gills', 'lungs', 'skin only', 'spiracles'], a: 0, e: 'Gills.' },
      { q: 'Insects breathe through', o: ['spiracles', 'gills', 'lungs', 'mouth'], a: 0, e: 'Holes.' }, { q: 'Respiration releases', o: ['energy', 'food', 'oxygen', 'water only'], a: 0, e: 'Energy.' },
      { q: 'Cows are', o: ['ruminants', 'carnivores', 'amoeba', 'insects'], a: 0, e: 'Cud.' }, { q: 'Saliva acts on', o: ['starch', 'fat', 'protein', 'water'], a: 0, e: 'Starch.' },
      { q: 'Urine made by', o: ['kidneys', 'lungs', 'heart', 'liver'], a: 0, e: 'Kidney.' }, { q: 'Breathing rate after running', o: ['increases', 'decreases', 'stops', 'same'], a: 0, e: 'More O₂.' },
      { q: 'Amoeba captures food by', o: ['false feet', 'teeth', 'tongue', 'gills'], a: 0, e: 'Pseudopodia.' }
    ],
    teach: {
      outcomes: ['Trace the path of food', 'Distinguish breathing and respiration', 'Name breathing organs in animals'],
      periods: [{ t: 'Digestion', flow: [['10 min', 'Chew bread slowly — sweet taste.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Draw and label.']] }, { t: 'Breathing and more', flow: [['15 min', 'Explore panel 2 / count breaths.'], ['15 min', 'Pulse count.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Stomach finishes digestion.', 'Breathing = respiration.'], activities: ['Breath and pulse counts.', 'Lime water test of exhaled air.'],
      exit: ['Food path.', 'Respiration equation.', 'Gills/spiracles.'], homework: 'Count breaths per minute at rest and after skipping; explain the change.'
    },
    slides: [{ t: 'Life Processes in Animals', b: ['Digestion', 'Breathing and respiration', 'Transport', 'Excretion'] }, { t: 'Think and share', b: ['Why does bread taste sweet after chewing?', 'How do fish breathe?'] }],
    fs: { groups: [['Digestion', [['Mouth', 'saliva on starch'], ['Stomach', 'acid, proteins'], ['Small intestine', 'digestion + absorption'], ['Large intestine', 'water']]], ['Breathing', [['Humans', 'lungs'], ['Fish', 'gills'], ['Insects', 'spiracles'], ['Earthworm', 'skin']]], ['Other', [['Respiration', 'glucose + O₂ → CO₂ + H₂O + energy'], ['Kidneys', 'urine']]]],
      ex: [['5 breaths in 15 s', '20 per min'], ['20 beats in 15 s', '80 per min']], rem: ['Path vs helper organs.', 'Respiration in cells.', 'Exercise raises rates.'] }
  });
})();
