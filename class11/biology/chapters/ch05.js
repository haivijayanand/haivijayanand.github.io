/*
TOOL:    class11_biology_ch05
FAMILY:  CBSE_REVISION / Class 11 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 5 Morphology of Flowering Plants (root, stem, leaf and modifications, inflorescence, flower parts, aestivation, placentation, fruit, seed, floral formula, families Fabaceae Solanaceae Liliaceae) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const FAM = [['Fabaceae (pea family)', '% ⚥ K₍₅₎ C₁₊₂₊₍₂₎ A₍₉₎₊₁ G₁', 'vexillary aestivation, diadelphous stamens, marginal placentation, legume pod', 'pea, gram, soybean, groundnut'], ['Solanaceae (potato family)', '⊕ ⚥ K₍₅₎ C₍₅₎ A₅ G₍₂₎', 'epipetalous stamens, swollen axile placenta, berry/capsule', 'potato, tomato, brinjal, chilli, belladonna'], ['Liliaceae (lily family)', '⊕ ⚥ P₍₃₊₃₎ A₃₊₃ G₍₃₎', 'monocot, perianth, epitepalous stamens, axile placentation', 'onion, garlic, aloe, tulip']];
  G9.register({
    no: 5, part: 'Unit II · Structural organisation', short: 'Plant morphology', title: 'Morphology of Flowering Plants',
    blurb: 'Root systems (tap, fibrous, adventitious) and modifications; stem modifications; leaf parts, venation, simple and compound leaves, phyllotaxy, modifications; racemose and cymose inflorescence; flower symmetry, position of ovary, aestivation, androecium, gynoecium, placentation; fruit and seed structure (dicot and monocot); semi-technical description and floral formulae; families Fabaceae, Solanaceae, Liliaceae.',
    revise: {
      oneLine: 'Dicots have tap roots and reticulate venation; monocots fibrous roots and parallel venation. Modifications: storage roots (carrot), pneumatophores (Rhizophora), stem tendrils (cucumber), thorns (Citrus, Bougainvillea), underground stems (potato tuber, ginger rhizome, onion bulb), leaf tendrils (pea), spines (cactus). Racemose inflorescence: main axis keeps growing (acropetal); cymose: axis ends in a flower (basipetal). Ovary positions: hypogynous (superior), perigynous (half), epigynous (inferior). Floral formula symbols: K calyx, C corolla, P perianth, A androecium, G gynoecium; brackets = fused.',
      sections: [
        { h: 'Aestivation', html: '<p>Valvate (Calotropis), twisted (cotton, China rose), imbricate (Cassia, gulmohur), vexillary (pea, bean).</p>' },
        { h: 'Placentation', html: '<p>Marginal (pea), axile (China rose, tomato, lemon), parietal (mustard, Argemone), free central (Dianthus, Primrose), basal (sunflower, marigold).</p>' },
        { h: 'Seeds', html: '<p>Dicot (bean): two cotyledons, no endosperm in mature seed. Monocot (maize): one cotyledon (scutellum), endosperm, aleurone layer, coleoptile and coleorhiza.</p>' }
      ],
      formulas: [['Floral symbols', 'K C P A G; ⊕ actinomorphic, % zygomorphic'], ['Superior ovary', 'hypogynous'], ['Racemose', 'acropetal'], ['Cymose', 'basipetal'], ['Fabaceae stamens', 'diadelphous (9) + 1']],
      terms: [['Phyllotaxy', 'arrangement of leaves on a stem'], ['Placentation', 'arrangement of ovules in the ovary'], ['Epipetalous', 'stamens attached to petals']],
      traps: ['Potato is a stem (has eyes/nodes), sweet potato is a root.', 'Bracket in floral formula means fusion.', 'Pea tendrils are leaflets (leaf), cucumber tendrils are stem.'],
      bridge: '<p>Ch 6 looks inside these organs (anatomy).</p>'
    },
    explore: [
      { title: 'Plant families', intro: 'Choose a family. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'family', FAM.map(f => f[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { const f = FAM[k]; rd.innerHTML = `<b>${f[0]}</b><br>floral formula: <b>${f[1]}</b><br>${f[2]}<br>examples: ${f[3]}`; } const step = () => { k = (k + 1) % FAM.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Root, stem or leaf?', intro: 'Sort these modified organs.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Root', 'Stem', 'Leaf'], items: [['carrot', 0], ['sweet potato', 0], ['potato', 1, 'has eyes (nodes with buds)'], ['ginger', 1], ['onion bulb (fleshy scales)', 2], ['pea tendril', 2], ['cucumber tendril', 1], ['cactus spine', 2], ['Rhizophora pneumatophore', 0], ['Opuntia flat green part', 1]] }); } }
    ],
    gens: [
      { title: 'Modification', gen(R) { return G9.S9.groupQ(R, [['carrot', 0], ['potato', 1], ['pea tendril', 2], ['ginger', 1], ['banyan prop roots', 0], ['Bougainvillea thorn', 1], ['cactus spine', 2]], ['root', 'stem', 'leaf'], 'Modified organ: '); } },
      { title: 'Placentation', gen(R) { return G9.S9.groupQ(R, [['pea', 0], ['China rose', 1], ['mustard', 2], ['Dianthus', 3], ['sunflower', 4], ['tomato', 1]], ['marginal', 'axile', 'parietal', 'free central', 'basal'], 'Placentation in '); } },
      { title: 'Aestivation', gen(R) { return G9.S9.groupQ(R, [['Calotropis', 0], ['cotton', 1], ['gulmohur', 2], ['pea', 3]], ['valvate', 'twisted', 'imbricate', 'vexillary'], 'Aestivation in '); } },
      { title: 'Families', levels: [2, 3], gen(R) { const f = R.pick(FAM); return { q: `Floral formula and two examples of ${f[0]}?`, a: `${f[1]}; ${f[3]}` }; } },
      { title: 'Seeds', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Cotyledon of maize is called?', 'scutellum'], ['Sheath around the plumule in monocots?', 'coleoptile'], ['Is bean seed endospermic?', 'no (non-endospermic)'], ['Outer protein layer of maize endosperm?', 'aleurone layer']]); } }
    ],
    quiz: [
      { q: 'Potato is a', o: ['stem', 'root', 'leaf', 'fruit'], a: 0, e: 'Eyes.' }, { q: 'Pea placentation', o: ['marginal', 'axile', 'parietal', 'basal'], a: 0, e: 'Legume.' },
      { q: 'Superior ovary', o: ['hypogynous', 'epigynous', 'perigynous', 'none'], a: 0, e: 'Above.' }, { q: 'Racemose order', o: ['acropetal', 'basipetal', 'random', 'centripetal only'], a: 0, e: 'Young at top.' },
      { q: 'Solanaceae example', o: ['tomato', 'pea', 'onion', 'wheat'], a: 0, e: 'Potato family.' }, { q: 'Liliaceae is', o: ['monocot', 'dicot', 'gymnosperm', 'fern'], a: 0, e: 'Lily.' },
      { q: 'Pea tendril is a', o: ['modified leaflet', 'stem', 'root', 'flower'], a: 0, e: 'Leaf.' }, { q: 'Diadelphous stamens', o: ['Fabaceae', 'Solanaceae', 'Liliaceae', 'Poaceae'], a: 0, e: '(9)+1.' },
      { q: 'Monocot venation', o: ['parallel', 'reticulate', 'none', 'dichotomous'], a: 0, e: 'Parallel.' }, { q: 'Twisted aestivation', o: ['cotton', 'pea', 'Calotropis', 'Cassia'], a: 0, e: 'Overlap one way.' },
      { q: 'Maize cotyledon', o: ['scutellum', 'coleoptile', 'radicle', 'aleurone'], a: 0, e: 'Shield.' }
    ],
    teach: {
      outcomes: ['Identify organ modifications', 'Describe flower parts and placentation', 'Write floral formulae'],
      periods: [{ t: 'Vegetative organs', flow: [['10 min', 'Vegetable basket sorting.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Leaf venation and phyllotaxy.']] }, { t: 'Flowers and families', flow: [['15 min', 'Dissect pea and China rose flowers.'], ['15 min', 'Explore panel 1.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Potato is a root.', 'All tendrils are stems.'], activities: ['Vegetable morphology sort.', 'Flower dissection with floral diagram.'],
      exit: ['Three modifications.', 'Placentation examples.', 'One floral formula.'], homework: 'Describe a local flower in semi-technical terms with a floral formula.'
    },
    slides: [{ t: 'Morphology of Flowering Plants', b: ['Root, stem, leaf', 'Inflorescence and flower', 'Fruit and seed', 'Three families'] }, { t: 'Think and share', b: ['Is ginger a root?', 'What does (5) mean in K₍₅₎?'] }],
    fs: { groups: [['Organs', [['Root mods', 'carrot, pneumatophores'], ['Stem mods', 'potato, ginger, tendril, thorn'], ['Leaf mods', 'pea tendril, spines']]], ['Flower', [['Ovary', 'hypo/peri/epigynous'], ['Aestivation', 'valvate, twisted, imbricate, vexillary'], ['Placentation', 'marginal, axile, parietal, free central, basal']]], ['Families', [['Fabaceae', '% K₍₅₎ C₁₊₂₊₍₂₎ A₍₉₎₊₁ G₁'], ['Solanaceae', '⊕ K₍₅₎ C₍₅₎ A₅ G₍₂₎'], ['Liliaceae', '⊕ P₍₃₊₃₎ A₃₊₃ G₍₃₎']]]],
      ex: [['Tomato', 'axile, Solanaceae'], ['Pea', 'marginal, vexillary']], rem: ['Nodes/buds mean stem.', 'Brackets = fused.', 'Know three families.'] }
  });
})();
