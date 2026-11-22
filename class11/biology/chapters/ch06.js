/*
TOOL:    class11_biology_ch06
FAMILY:  CBSE_REVISION / Class 11 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 6 Anatomy of Flowering Plants (meristematic and permanent tissues, simple and complex tissues, epidermal, ground and vascular tissue systems, anatomy of dicot and monocot root, stem, leaf, secondary growth) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const CMP = [['vascular bundles', 'radial (root)', 'conjoint, collateral, open, in a ring (dicot stem)', 'conjoint, collateral, closed, scattered (monocot stem)'], ['pith', 'small or absent (dicot root), large (monocot root)', 'present, large', 'absent (ground tissue)'], ['cambium / secondary growth', 'present in dicot root later', 'present → secondary growth', 'absent → no secondary growth'], ['leaf mesophyll', '—', 'dorsiventral leaf: palisade + spongy', 'isobilateral leaf: undifferentiated; bulliform cells']];
  G9.register({
    no: 6, part: 'Unit II · Structural organisation', short: 'Plant anatomy', title: 'Anatomy of Flowering Plants',
    blurb: 'Meristems (apical, intercalary, lateral) and permanent tissues; simple tissues (parenchyma, collenchyma, sclerenchyma) and complex tissues (xylem, phloem); epidermal, ground and vascular tissue systems; internal structure of dicot and monocot roots, stems and leaves; secondary growth — vascular cambium, cork cambium, annual rings, heartwood and sapwood, bark.',
    revise: {
      oneLine: 'Xylem: tracheids, vessels, xylem fibres, xylem parenchyma (protoxylem/metaxylem: exarch in roots, endarch in stems). Phloem: sieve tubes, companion cells (absent in gymnosperms), phloem parenchyma, phloem fibres. Vascular bundles are radial in roots; conjoint collateral open in dicot stems (cambium) and closed in monocot stems (no cambium, scattered). Secondary growth in dicots: vascular cambium adds secondary xylem inside and phloem outside; cork cambium (phellogen) makes periderm. Annual rings form from spring (early) wood and autumn (late) wood.',
      sections: [
        { h: 'Root vs stem', html: '<p>Roots: radial bundles, exarch xylem, endodermis with Casparian strips, pericycle gives lateral roots. Stems: conjoint bundles, endarch xylem.</p>' },
        { h: 'Leaves', html: '<p>Dicot (dorsiventral): palisade on upper side, spongy below, more stomata on lower surface. Monocot (isobilateral): uniform mesophyll, bulliform cells help rolling.</p>' },
        { h: 'Wood', html: '<p>Heartwood: dark, dead, filled with tannins — durable. Sapwood: outer, conducts water. Bark = all tissues outside vascular cambium.</p>' }
      ],
      formulas: [['Root bundles', 'radial, exarch'], ['Dicot stem', 'conjoint, collateral, open, ring'], ['Monocot stem', 'closed, scattered'], ['Periderm', 'phellem + phellogen + phelloderm'], ['Annual ring', 'spring + autumn wood']],
      terms: [['Meristem', 'actively dividing tissue'], ['Casparian strip', 'suberin band in endodermis walls'], ['Periderm', 'secondary protective tissue (cork)']],
      traps: ['Companion cells are absent in gymnosperms.', 'Monocots lack secondary growth (cambium absent).', 'Bark is non-technical: everything outside the vascular cambium.'],
      bridge: '<p>Unit IV plant physiology uses this anatomy.</p>'
    },
    explore: [
      { title: 'Dicot vs monocot', intro: 'Choose a feature. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'feature', CMP.map(c => c[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { const c = CMP[k]; rd.innerHTML = `<b>${c[0]}</b><br>root: ${c[1]}<br>dicot: ${c[2]}<br>monocot: ${c[3]}`; } const step = () => { k = (k + 1) % CMP.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Tissue sorter', intro: 'Living or dead at maturity?',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Living', 'Dead'], items: [['parenchyma', 0], ['collenchyma', 0], ['sclerenchyma fibres', 1], ['vessels', 1], ['tracheids', 1], ['sieve tubes', 0, 'living but without a nucleus'], ['companion cells', 0], ['xylem parenchyma', 0], ['cork cells', 1]] }); } }
    ],
    gens: [
      { title: 'Tissue role', gen(R) { const T = [['parenchyma', 'storage, photosynthesis'], ['collenchyma', 'flexible mechanical support'], ['sclerenchyma', 'rigid support (fibres, sclereids)'], ['xylem', 'water and minerals'], ['phloem', 'food transport'], ['meristem', 'cell division / growth']]; const t = R.pick(T); return { q: `Main role of ${t[0]}?`, a: t[1] }; } },
      { title: 'Bundle type', gen(R) { return G9.S9.groupQ(R, [['root', 0], ['sunflower stem', 1], ['maize stem', 2]], ['radial', 'conjoint, collateral, open', 'conjoint, collateral, closed'], 'Vascular bundles in '); } },
      { title: 'Xylem position', gen(R) { return G9.S9.pickQ(R, [['Exarch xylem occurs in?', 'roots (protoxylem towards periphery)'], ['Endarch xylem occurs in?', 'stems (protoxylem towards pith)'], ['Lateral roots arise from?', 'pericycle'], ['Function of Casparian strips?', 'force water through endodermis cells (selective)']]); } },
      { title: 'Secondary growth', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['What does vascular cambium produce?', 'secondary xylem inwards, secondary phloem outwards'], ['What does cork cambium produce?', 'cork outwards, phelloderm inwards'], ['How do annual rings form?', 'alternating spring (wide) and autumn (narrow) wood'], ['Heartwood vs sapwood?', 'dark non-conducting centre vs light conducting outer wood']]); } },
      { title: 'Count rings', levels: [2, 3], gen(R) { const n = R.int(15, 80); return { q: `A tree trunk shows ${n} annual rings (pairs of light and dark bands). Approximate age?`, a: `${n} years`, ans: n }; } }
    ],
    quiz: [
      { q: 'Radial bundles in', o: ['roots', 'dicot stem', 'monocot stem', 'leaf'], a: 0, e: 'Alternating.' }, { q: 'Open bundles have', o: ['cambium', 'no cambium', 'no xylem', 'no phloem'], a: 0, e: 'Secondary growth.' },
      { q: 'Companion cells absent in', o: ['gymnosperms', 'dicots', 'monocots', 'all'], a: 0, e: 'Albuminous cells instead.' }, { q: 'Exarch xylem', o: ['root', 'stem', 'leaf', 'flower'], a: 0, e: 'Outside.' },
      { q: 'Lateral roots from', o: ['pericycle', 'endodermis', 'cortex', 'epidermis'], a: 0, e: 'Endogenous.' }, { q: 'Bulliform cells', o: ['monocot leaves', 'dicot roots', 'stems', 'seeds'], a: 0, e: 'Rolling.' },
      { q: 'Dead at maturity', o: ['vessels', 'parenchyma', 'companion cell', 'collenchyma'], a: 0, e: 'Lignified.' }, { q: 'Cork cambium', o: ['phellogen', 'phellem', 'phelloderm', 'pericycle'], a: 0, e: 'Meristem.' },
      { q: 'Heartwood', o: ['non-conducting, durable', 'conducting', 'soft', 'outermost'], a: 0, e: 'Tannins.' }, { q: 'Monocot stem bundles', o: ['scattered', 'in a ring', 'radial', 'absent'], a: 0, e: 'Scattered.' },
      { q: 'Casparian strips in', o: ['endodermis', 'pericycle', 'epidermis', 'pith'], a: 0, e: 'Suberin.' }
    ],
    teach: {
      outcomes: ['Classify plant tissues', 'Compare dicot and monocot anatomy', 'Explain secondary growth'],
      periods: [{ t: 'Tissues', flow: [['10 min', 'Stem sections under microscope.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Tissue table.']] }, { t: 'Organs and growth', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Tree stump rings.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Monocots grow thick by cambium.', 'Bark = cork only.'], activities: ['Hand sections of sunflower and maize stems.', 'Ring counting.'],
      exit: ['Bundle types.', 'Xylem elements.', 'Annual rings.'], homework: 'Draw labelled T.S. of dicot and monocot stems.'
    },
    slides: [{ t: 'Anatomy of Flowering Plants', b: ['Tissues', 'Tissue systems', 'Dicot vs monocot', 'Secondary growth'] }, { t: 'Think and share', b: ['Why no secondary growth in maize?', 'How do annual rings form?'] }],
    fs: { groups: [['Tissues', [['Simple', 'parenchyma, collenchyma, sclerenchyma'], ['Xylem', 'tracheids, vessels, fibres, parenchyma'], ['Phloem', 'sieve tubes, companion cells']]], ['Organs', [['Root', 'radial, exarch'], ['Dicot stem', 'ring, open'], ['Monocot stem', 'scattered, closed']]], ['Growth', [['Vascular cambium', '2° xylem + phloem'], ['Cork cambium', 'periderm'], ['Rings', 'age']]]],
      ex: [['Maize stem', 'closed bundles'], ['42 rings', '≈ 42 years']], rem: ['Root ≠ stem bundles.', 'Cambium = open.', 'Bark outside cambium.'] }
  });
})();
