/*
TOOL:    class7_science_ch10
FAMILY:  CBSE_REVISION / Class 7 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 10 Life Processes in Plants (photosynthesis, starch test on leaf, stomata, transport by xylem and phloem, transpiration, respiration in plants) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 10, part: 'All chapters', short: 'Life in plants', title: 'Life Processes in Plants',
    blurb: 'How plants make food by photosynthesis (sunlight, chlorophyll, water, carbon dioxide → glucose/starch + oxygen), testing a leaf for starch, stomata, transport of water and food by xylem and phloem, transpiration, and respiration in plants.',
    revise: {
      oneLine: 'Green plants make food by photosynthesis: carbon dioxide + water → glucose + oxygen, using sunlight absorbed by chlorophyll. Glucose is stored as starch (leaf turns blue-black with iodine). Gases move through stomata. Xylem carries water and minerals up from roots; phloem carries food to all parts. Water lost through stomata is transpiration. Plants respire all the time, day and night.',
      sections: [
        { h: 'Starch test on a leaf', html: `<p>Boil a leaf in water, then in alcohol (water bath — teacher) to remove chlorophyll, rinse, add iodine → blue-black where starch was made. A leaf covered partly with black paper shows no starch under the paper.</p>` },
        { h: 'Transport', html: `<p>Celery or a white flower in coloured water shows xylem carrying water upward. Transpiration pulls water up and cools the plant.</p>` },
        { h: 'Respiration', html: `<p>Plants take in oxygen and give out CO₂ through stomata and roots; waterlogged soil harms roots because air is driven out.</p>` }
      ],
      formulas: [['Photosynthesis', 'CO₂ + water → glucose + O₂ (sunlight, chlorophyll)'], ['Starch test', 'iodine → blue-black'], ['Xylem', 'water up'], ['Phloem', 'food everywhere'], ['Transpiration', 'water vapour out via stomata']],
      terms: [['Chlorophyll', 'green pigment that traps sunlight'], ['Stomata', 'tiny pores on leaves'], ['Transpiration', 'loss of water vapour from leaves']],
      traps: ['Plants respire at night and in the day too.', 'Variegated leaves make starch only in green parts.', 'Oxygen from photosynthesis comes from water, not from CO₂ — (detail for later classes).'],
      bridge: '<p>Class 10 studies photosynthesis and transport in more detail.</p>'
    },
    explore: [
      { title: 'Photosynthesis needs', intro: 'Toggle what the leaf gets; see whether starch forms.',
        build(el, K) { let L = 1, Cc = 1, W = 1, G = 1; const row = K.row(el); const T = (lab, set) => { const s = K.select(row, lab, ['no', 'yes'], i => { set(i); draw(); }); s.value = 1; }; T('sunlight', v => L = v); T('carbon dioxide', v => Cc = v); T('water', v => W = v); T('chlorophyll (green part)', v => G = v); const rd = K.read(el);
          function draw() { const ok = L && Cc && W && G; const miss = [!L && 'sunlight', !Cc && 'carbon dioxide', !W && 'water', !G && 'chlorophyll'].filter(Boolean); rd.innerHTML = `<div style="display:flex;align-items:center;gap:14px"><span style="width:60px;height:40px;border-radius:50% 4px;border:2px solid #0f172a;background:${ok ? '#1e1b4b' : '#fde68a'};display:inline-block"></span><span>iodine test: <b>${ok ? 'blue-black — starch made' : 'no colour change — no starch'}</b>${ok ? '' : ` (missing ${miss.join(', ')})`}</span></div>`; } draw(); return null; } },
      { title: 'Water’s journey', intro: '<kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Roots', 'Root hairs absorb water and minerals from the soil.'], ['Xylem', 'Water travels up the stem through xylem tubes.'], ['Leaf', 'Water reaches leaf cells; used in photosynthesis with CO₂ entering by stomata.'], ['Transpiration', 'Extra water evaporates through stomata, pulling more water up and cooling the plant.'], ['Phloem', 'Food made in leaves travels through phloem to roots, fruits and growing parts.']] }); } }
    ],
    gens: [
      { title: 'Photosynthesis', gen(R) { return G9.S9.pickQ(R, [['Raw materials of photosynthesis?', 'carbon dioxide and water'], ['Products of photosynthesis?', 'glucose (stored as starch) and oxygen'], ['Role of chlorophyll?', 'traps sunlight'], ['Where does CO₂ enter the leaf?', 'stomata']]); } },
      { title: 'Xylem or phloem', gen(R) { return G9.S9.groupQ(R, [['water from roots to leaves', 0], ['sugar from leaves to roots', 1], ['minerals upward', 0], ['food to a growing fruit', 1]], ['xylem', 'phloem'], 'Which tissue carries '); } },
      { title: 'Starch test', gen(R) { return G9.S9.pickQ(R, [['Why boil the leaf in alcohol?', 'to remove chlorophyll so colour shows clearly'], ['Colour of a leaf with starch + iodine?', 'blue-black'], ['Part of leaf under black paper shows?', 'no starch — no light there'], ['Variegated leaf: which parts make starch?', 'only the green parts']]); } },
      { title: 'Transpiration', levels: [2, 3], gen(R) { const v = R.int(100, 400), d = R.int(3, 6); return { q: `A potted plant loses ${v} mL of water a day by transpiration. Water lost in ${d} days?`, a: `${v * d} mL`, ans: v * d }; } },
      { title: 'Respiration', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Do plants respire at night?', 'yes — day and night'], ['Why do roots of waterlogged plants suffer?', 'no air in soil for root respiration'], ['Gas taken in during respiration?', 'oxygen'], ['Gas given out in photosynthesis?', 'oxygen']]); } }
    ],
    quiz: [
      { q: 'Photosynthesis needs', o: ['CO₂, water, sunlight, chlorophyll', 'only water', 'oxygen only', 'soil only'], a: 0, e: 'Four.' }, { q: 'Product', o: ['glucose and oxygen', 'CO₂', 'water only', 'nitrogen'], a: 0, e: 'Food + O₂.' },
      { q: 'Starch with iodine', o: ['blue-black', 'red', 'yellow', 'white'], a: 0, e: 'Test.' }, { q: 'Stomata are', o: ['pores on leaves', 'roots', 'flowers', 'seeds'], a: 0, e: 'Pores.' },
      { q: 'Xylem carries', o: ['water up', 'food down only', 'air', 'light'], a: 0, e: 'Water.' }, { q: 'Phloem carries', o: ['food', 'water only', 'minerals only', 'CO₂'], a: 0, e: 'Food.' },
      { q: 'Transpiration', o: ['water vapour loss from leaves', 'food making', 'seed growth', 'root growth'], a: 0, e: 'Vapour.' }, { q: 'Plants respire', o: ['day and night', 'only at night', 'only in day', 'never'], a: 0, e: 'Always.' },
      { q: 'Chlorophyll is', o: ['green', 'red', 'blue', 'black'], a: 0, e: 'Green.' }, { q: 'Alcohol in starch test removes', o: ['chlorophyll', 'starch', 'water', 'iodine'], a: 0, e: 'Colour.' },
      { q: 'Food stored as', o: ['starch', 'protein only', 'fat only', 'oxygen'], a: 0, e: 'Starch.' }
    ],
    teach: {
      outcomes: ['Explain photosynthesis', 'Test leaves for starch', 'Describe transport and transpiration'],
      periods: [{ t: 'Food making', flow: [['10 min', 'Where does a tree’s mass come from?'], ['15 min', 'Explore panel 1.'], ['15 min', 'Starch test demo.']] }, { t: 'Transport', flow: [['15 min', 'Celery in coloured water.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Plants get food from soil.', 'Plants don’t respire.'], activities: ['Bag on a leafy twig (transpiration).', 'Coloured water flower.'],
      exit: ['Photosynthesis equation.', 'Xylem vs phloem.', 'Starch test steps.'], homework: 'Tie a plastic bag on a leafy branch for a day; record and explain what you see.'
    },
    slides: [{ t: 'Life Processes in Plants', b: ['Photosynthesis', 'Starch test', 'Xylem and phloem', 'Transpiration and respiration'] }, { t: 'Think and share', b: ['Why no starch under black paper?', 'Do plants breathe at night?'] }],
    fs: { groups: [['Photosynthesis', [['In', 'CO₂ + water'], ['Need', 'sunlight, chlorophyll'], ['Out', 'glucose + O₂']]], ['Transport', [['Xylem', 'water, minerals up'], ['Phloem', 'food all parts'], ['Transpiration', 'stomata']]], ['Tests', [['Starch', 'iodine blue-black'], ['Respiration', 'day and night']]]],
      ex: [['200 mL/day × 5', '1000 mL'], ['Covered leaf part', 'no starch']], rem: ['Green parts make food.', 'Xylem up, phloem everywhere.', 'Plants respire always.'] }
  });
})();
