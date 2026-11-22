/*
TOOL:    class9_science_ch03
FAMILY:  CBSE_REVISION / Class 9 Science (Exploration)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 3 Tissues in Action (plant tissues: meristematic, permanent, xylem, phloem; animal tissues: epithelial, connective, muscular, nervous; structure–function) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const T = [['meristematic', 'plant', 'dividing cells at tips and cambium — growth'], ['parenchyma', 'plant', 'simple living cells — storage, photosynthesis (chlorenchyma)'], ['collenchyma', 'plant', 'thickened corners — flexibility in stems, leaf stalks'], ['sclerenchyma', 'plant', 'dead, lignified — strength (husk of coconut)'], ['xylem', 'plant', 'carries water and minerals up'], ['phloem', 'plant', 'carries food in both directions'], ['epithelial', 'animal', 'covers and lines surfaces — skin, lining of mouth'], ['connective', 'animal', 'binds and supports — bone, cartilage, blood, ligaments, tendons'], ['muscular', 'animal', 'contracts for movement — skeletal, smooth, cardiac'], ['nervous', 'animal', 'neurons carry messages — brain, nerves']];
  G9.register({
    no: 3, part: 'All chapters', short: 'Tissues', title: 'Tissues in Action',
    blurb: 'Groups of similar cells working together: plant tissues — meristematic (growth) and permanent (parenchyma, collenchyma, sclerenchyma, xylem, phloem, epidermis); animal tissues — epithelial, connective (bone, cartilage, blood, tendons, ligaments), muscular (striated, smooth, cardiac) and nervous; how structure suits function.',
    revise: {
      oneLine: 'A tissue is a group of similar cells doing a particular job. Plants have meristematic tissue that keeps dividing (apical, lateral, intercalary) and permanent tissues (simple: parenchyma, collenchyma, sclerenchyma; complex: xylem, phloem). Animals have epithelial (covering), connective (support, binding, transport), muscular (movement) and nervous (signals) tissues.',
      sections: [
        { h: 'Plants', html: `<p>Apical meristem at root and shoot tips (length), lateral meristem/cambium (girth), intercalary at nodes (grasses). Xylem: vessels, tracheids (water). Phloem: sieve tubes, companion cells (food).</p>` },
        { h: 'Muscles', html: `<p>Skeletal (striated, voluntary), smooth (unstriated, involuntary — gut, iris), cardiac (striated, involuntary, never tires — heart).</p>` },
        { h: 'Connective', html: `<p>Tendons join muscle to bone; ligaments join bone to bone; blood is a fluid connective tissue (plasma + cells).</p>` }
      ],
      formulas: [['Growth in length', 'apical meristem'], ['Water transport', 'xylem'], ['Food transport', 'phloem'], ['Muscle → bone', 'tendon'], ['Bone → bone', 'ligament']],
      terms: [['Tissue', 'group of similar cells with a common job'], ['Meristem', 'actively dividing plant tissue'], ['Neuron', 'nerve cell']],
      traps: ['Tendon vs ligament are often swapped.', 'Blood is a connective tissue.', 'Sclerenchyma cells are dead at maturity.'],
      bridge: '<p>Class 10 and 11 build organs and systems from tissues.</p>'
    },
    explore: [
      { title: 'Tissue explorer', intro: 'Choose a tissue; see where it is and what it does. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'tissue', T.map(t => t[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { rd.innerHTML = `<b>${T[k][0]}</b> (${T[k][1]} tissue): ${T[k][2]}`; } const step = () => { k = (k + 1) % T.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Three kinds of muscle', intro: 'Sort the features.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Skeletal', 'Smooth', 'Cardiac'], items: [['voluntary', 0], ['moves food in the gut', 1], ['never tires', 2], ['attached to bones', 0], ['spindle-shaped, unstriated', 1], ['branched, striated, involuntary', 2], ['controls pupil size', 1]] }); } }
    ],
    gens: [
      { title: 'Plant or animal', gen(R) { return G9.S9.groupQ(R, T.map(t => [t[0], t[1] === 'plant' ? 0 : 1]), ['plant tissue', 'animal tissue'], 'Plant or animal tissue: '); } },
      { title: 'Job', gen(R) { const t = R.pick(T); return { q: `Main role of ${t[0]} tissue?`, a: t[2] }; } },
      { title: 'Connective', gen(R) { return G9.S9.pickQ(R, [['What joins muscle to bone?', 'tendon'], ['What joins bone to bone?', 'ligament'], ['Why is blood a connective tissue?', 'it connects body parts by transport; cells in a matrix (plasma)'], ['Which tissue gives the nose and ear flexibility?', 'cartilage']]); } },
      { title: 'Neuron speed', levels: [2, 3], gen(R) { const v = R.pick([50, 80, 100, 120]), d = R.pick([0.5, 1, 1.5, 2]); return { q: `A nerve impulse travels at ${v} m/s. Time to travel ${d} m (in ms)?`, a: `${+(d / v * 1000).toFixed(2)} ms`, ans: d / v * 1000, tol: 0.01 }; } },
      { title: 'Meristem', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Which meristem increases length of shoot?', 'apical meristem'], ['Which meristem increases girth?', 'lateral meristem (cambium)'], ['Where is intercalary meristem found?', 'at nodes / base of leaves (grasses)'], ['Why do meristem cells have no vacuoles?', 'they are actively dividing; dense cytoplasm']]); } }
    ],
    quiz: [
      { q: 'Water up the stem', o: ['xylem', 'phloem', 'parenchyma', 'epidermis'], a: 0, e: 'Xylem.' }, { q: 'Muscle to bone', o: ['tendon', 'ligament', 'cartilage', 'blood'], a: 0, e: 'Tendon.' },
      { q: 'Heart muscle', o: ['cardiac', 'skeletal', 'smooth', 'none'], a: 0, e: 'Cardiac.' }, { q: 'Fluid connective tissue', o: ['blood', 'bone', 'tendon', 'skin'], a: 0, e: 'Blood.' },
      { q: 'Growth in length', o: ['apical meristem', 'phloem', 'cork', 'xylem'], a: 0, e: 'Tips.' }, { q: 'Coconut husk', o: ['sclerenchyma', 'parenchyma', 'collenchyma', 'xylem'], a: 0, e: 'Fibres.' },
      { q: 'Food transport', o: ['phloem', 'xylem', 'cambium', 'epidermis'], a: 0, e: 'Food.' }, { q: 'Lining of mouth', o: ['epithelial', 'nervous', 'muscular', 'bone'], a: 0, e: 'Covering.' },
      { q: 'Voluntary muscle', o: ['skeletal', 'smooth', 'cardiac', 'none'], a: 0, e: 'Will.' }, { q: 'Nerve cell', o: ['neuron', 'nephron', 'xylem', 'osteocyte'], a: 0, e: 'Neuron.' },
      { q: 'Bone to bone', o: ['ligament', 'tendon', 'muscle', 'nerve'], a: 0, e: 'Ligament.' }
    ],
    teach: {
      outcomes: ['Classify plant and animal tissues', 'Relate structure to function', 'Distinguish muscle types'],
      periods: [{ t: 'Plant tissues', flow: [['10 min', 'Stem cross-section slide.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Coloured water in celery.']] }, { t: 'Animal tissues', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Chicken leg tendon demo / model.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Tendon = ligament.', 'Blood isn’t a tissue.'], activities: ['Slide observation.', 'Tissue concept map.'],
      exit: ['Two plant + two animal tissues.', 'Muscle types.', 'Xylem vs phloem.'], homework: 'Make a concept map of all tissues with one example each.'
    },
    slides: [{ t: 'Tissues in Action', b: ['Meristematic tissue', 'Permanent tissues', 'Animal tissues', 'Structure suits function'] }, { t: 'Think and share', b: ['Why is blood a tissue?', 'Which muscle never tires?'] }],
    fs: { groups: [['Plant', [['Meristem', 'apical, lateral, intercalary'], ['Simple', 'parenchyma, collenchyma, sclerenchyma'], ['Complex', 'xylem, phloem']]], ['Animal', [['Epithelial', 'covering'], ['Connective', 'bone, blood, tendon, ligament'], ['Muscular', 'skeletal, smooth, cardiac'], ['Nervous', 'neurons']]]],
      ex: [['1 m at 100 m/s', '10 ms'], ['Tendon', 'muscle–bone']], rem: ['Tendon: muscle–bone.', 'Blood is connective.', 'Xylem water, phloem food.'] }
  });
})();
