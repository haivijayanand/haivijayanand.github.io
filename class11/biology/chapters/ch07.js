/*
TOOL:    class11_biology_ch07
FAMILY:  CBSE_REVISION / Class 11 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 7 Structural Organisation in Animals (animal tissues: epithelial, connective, muscle, neural; organ and organ systems; frog morphology and anatomy) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const T = [['squamous epithelium', 'flat cells; diffusion boundaries', 'walls of blood vessels, alveoli'], ['cuboidal epithelium', 'cube cells; secretion, absorption', 'ducts of glands, kidney tubules'], ['columnar epithelium', 'tall cells; secretion, absorption (microvilli)', 'lining of stomach and intestine'], ['ciliated epithelium', 'cilia move particles', 'bronchioles, fallopian tubes'], ['areolar tissue', 'loose connective; supports skin', 'beneath skin'], ['adipose tissue', 'fat storage', 'under skin, around organs'], ['tendon / ligament', 'dense regular connective', 'muscle–bone / bone–bone'], ['cartilage', 'flexible solid matrix (chondrocytes)', 'nose tip, ear, vertebral discs'], ['bone', 'hard matrix (calcium salts, collagen); osteocytes', 'skeleton'], ['blood', 'fluid connective tissue', 'circulation'], ['skeletal muscle', 'striated, voluntary', 'limb muscles'], ['smooth muscle', 'non-striated, involuntary', 'gut, blood vessels'], ['cardiac muscle', 'striated, involuntary, intercalated discs', 'heart'], ['neural tissue', 'neurons + neuroglia', 'brain, spinal cord, nerves']];
  G9.register({
    no: 7, part: 'Unit II · Structural organisation', short: 'Animal organisation', title: 'Structural Organisation in Animals',
    blurb: 'Animal tissues — epithelial (simple: squamous, cuboidal, columnar, ciliated; compound; glandular), cell junctions, connective (loose, dense, specialised: cartilage, bone, blood), muscle (skeletal, smooth, cardiac) and neural; organs and organ systems; morphology and anatomy of the frog (digestive, respiratory, circulatory, excretory, nervous and reproductive systems).',
    revise: {
      oneLine: 'Four basic animal tissues: epithelial (covering, lining, glands; joined by tight, adhering and gap junctions), connective (most abundant; cells in a matrix — collagen and elastin fibres), muscular (skeletal striated voluntary; smooth involuntary; cardiac striated involuntary with intercalated discs) and neural (neurons, neuroglia). Frogs (Rana tigrina) are amphibians: cold-blooded, moist skin for cutaneous respiration, three-chambered heart, ureotelic (excrete urea), external fertilisation with tadpole stage.',
      sections: [
        { h: 'Glands', html: '<p>Exocrine (with ducts: saliva, mucus, milk, enzymes) vs endocrine (ductless: hormones into blood).</p>' },
        { h: 'Frog systems', html: '<p>Skin and lungs (and buccal cavity) for respiration; 3-chambered heart (2 atria, 1 ventricle); hepatic and renal portal systems; brain with 10 pairs of cranial nerves; kidneys with urinogenital duct in males.</p>' },
        { h: 'Frog uses', html: '<p>Eat insects (protect crops), maintain ecological balance; legs eaten in some countries.</p>' }
      ],
      formulas: [['Four tissues', 'epithelial, connective, muscle, neural'], ['Junctions', 'tight, adhering, gap'], ['Frog heart', '3 chambers'], ['Frog excretion', 'ureotelic'], ['Cranial nerves (frog)', '10 pairs']],
      terms: [['Intercalated disc', 'junction between cardiac muscle cells'], ['Matrix', 'material between connective tissue cells'], ['Cutaneous respiration', 'breathing through the skin']],
      traps: ['Blood is a connective tissue.', 'Cartilage and bone are both connective tissues.', 'Frog heart has one ventricle (mixing possible).'],
      bridge: '<p>Unit V (human physiology) uses these tissues in organ systems.</p>'
    },
    explore: [
      { title: 'Tissue finder', intro: 'Choose a tissue. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'tissue', T.map(t => t[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { rd.innerHTML = `<b>${T[k][0]}</b>: ${T[k][1]} · found in: ${T[k][2]}`; } const step = () => { k = (k + 1) % T.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Which tissue type?', intro: 'Sort.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Epithelial', 'Connective', 'Muscular', 'Neural'], items: [['lining of intestine', 0], ['blood', 1], ['heart wall', 2], ['brain', 3], ['tendon', 1], ['alveolar wall', 0], ['biceps', 2], ['cartilage', 1], ['nerve', 3]] }); } }
    ],
    gens: [
      { title: 'Location', gen(R) { const t = R.pick(T); return { q: `Where is ${t[0]} found?`, a: t[2] }; } },
      { title: 'Muscle type', gen(R) { return G9.S9.groupQ(R, [['biceps', 0], ['stomach wall', 1], ['heart', 2], ['iris', 1], ['tongue', 0]], ['skeletal', 'smooth', 'cardiac'], 'Muscle in '); } },
      { title: 'Frog facts', gen(R) { return G9.S9.pickQ(R, [['Chambers in frog heart?', '3 (2 atria, 1 ventricle)'], ['Main nitrogenous waste of frog?', 'urea (ureotelic)'], ['How do frogs breathe in water?', 'through skin (cutaneous)'], ['Pairs of cranial nerves in frog?', '10'], ['Type of fertilisation in frogs?', 'external']]); } },
      { title: 'Junctions & glands', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Junction that stops leakage between cells?', 'tight junction'], ['Junction that connects cytoplasm for ions?', 'gap junction'], ['Exocrine vs endocrine?', 'with ducts vs ductless (hormones into blood)'], ['Most abundant tissue type?', 'connective tissue']]); } },
      { title: 'Connective', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Cells of cartilage?', 'chondrocytes'], ['Cells of bone?', 'osteocytes'], ['Fat-storing tissue?', 'adipose'], ['Fibres in connective tissue?', 'collagen and elastin']]); } }
    ],
    quiz: [
      { q: 'Blood is', o: ['connective tissue', 'epithelial', 'muscular', 'neural'], a: 0, e: 'Fluid matrix.' }, { q: 'Intercalated discs', o: ['cardiac muscle', 'smooth', 'skeletal', 'bone'], a: 0, e: 'Heart.' },
      { q: 'Alveoli lining', o: ['squamous epithelium', 'columnar', 'cuboidal', 'ciliated'], a: 0, e: 'Thin.' }, { q: 'Frog heart chambers', o: ['3', '2', '4', '1'], a: 0, e: 'One ventricle.' },
      { q: 'Tendon joins', o: ['muscle to bone', 'bone to bone', 'nerve to muscle', 'skin to bone'], a: 0, e: 'Tendon.' }, { q: 'Gap junction', o: ['lets ions pass between cells', 'stops leakage', 'cements cells', 'none'], a: 0, e: 'Communication.' },
      { q: 'Frog excretes', o: ['urea', 'uric acid', 'ammonia only', 'nothing'], a: 0, e: 'Ureotelic.' }, { q: 'Ciliated epithelium', o: ['bronchioles', 'skin', 'bone', 'heart'], a: 0, e: 'Move mucus.' },
      { q: 'Involuntary non-striated', o: ['smooth', 'skeletal', 'cardiac', 'none'], a: 0, e: 'Gut.' }, { q: 'Exocrine gland', o: ['salivary', 'thyroid', 'pituitary', 'adrenal'], a: 0, e: 'Ducts.' },
      { q: 'Frog breathes in water by', o: ['skin', 'gills', 'lungs', 'nose'], a: 0, e: 'Cutaneous.' }
    ],
    teach: {
      outcomes: ['Classify animal tissues', 'Relate structure to function', 'Describe frog organisation'],
      periods: [{ t: 'Tissues', flow: [['10 min', 'Slides of tissues.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Explore panel 2.']] }, { t: 'Frog', flow: [['15 min', 'Frog systems chart/model.'], ['15 min', 'Compare with human.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Blood is not tissue.', 'Frog heart = human heart.'], activities: ['Tissue slide drawing.', 'Frog life cycle chart.'],
      exit: ['Four tissues.', 'Muscle types.', 'Frog heart.'], homework: 'Make a table of 10 tissues with structure, function and location.'
    },
    slides: [{ t: 'Structural Organisation in Animals', b: ['Epithelial tissue', 'Connective tissue', 'Muscle and neural tissue', 'The frog'] }, { t: 'Think and share', b: ['Why is blood a connective tissue?', 'How does a frog breathe underwater?'] }],
    fs: { groups: [['Epithelial', [['Squamous', 'alveoli'], ['Columnar', 'gut'], ['Ciliated', 'airways'], ['Junctions', 'tight, adhering, gap']]], ['Connective', [['Loose', 'areolar, adipose'], ['Dense', 'tendon, ligament'], ['Special', 'cartilage, bone, blood']]], ['Muscle, neural, frog', [['Muscles', 'skeletal, smooth, cardiac'], ['Neural', 'neurons + glia'], ['Frog', '3-chambered heart, ureotelic']]]],
      ex: [['Iris muscle', 'smooth'], ['Ligament', 'bone–bone']], rem: ['Four tissues only.', 'Blood is connective.', 'Frog: amphibian traits.'] }
  });
})();
