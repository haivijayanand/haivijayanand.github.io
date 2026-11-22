/*
TOOL:    class11_biology_ch04
FAMILY:  CBSE_REVISION / Class 11 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 4 Animal Kingdom (basis of classification: organisation, symmetry, germ layers, coelom, segmentation, notochord; phyla Porifera to Chordata; vertebrate classes) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const PH = [['Porifera', 'cellular level; pores (ostia), canal system, choanocytes; mostly marine', 'Sycon, Spongilla'], ['Cnidaria', 'tissue level, radial, diploblastic; cnidoblasts; polyp and medusa', 'Hydra, Physalia, Aurelia'], ['Ctenophora', 'comb plates; bioluminescence; radial, diploblastic', 'Pleurobrachia'], ['Platyhelminthes', 'flatworms; bilateral, triploblastic, acoelomate; flame cells', 'Taenia, Fasciola, Planaria'], ['Aschelminthes', 'roundworms; pseudocoelomate; complete gut; sexes separate', 'Ascaris, Wuchereria'], ['Annelida', 'segmented (metameric); true coelom; nephridia', 'earthworm, Nereis, leech'], ['Arthropoda', 'largest phylum; jointed legs; chitin exoskeleton; open circulation', 'insects, prawn, spider'], ['Mollusca', 'soft body, shell; mantle; radula', 'Pila, octopus, Sepia'], ['Echinodermata', 'spiny skin; water vascular system; adult radial, larva bilateral', 'starfish, sea urchin'], ['Hemichordata', 'proboscis, collar, trunk; stomochord', 'Balanoglossus'], ['Chordata', 'notochord, dorsal hollow nerve cord, pharyngeal gill slits, post-anal tail', 'fish, frog, snake, bird, human']];
  G9.register({
    no: 4, part: 'Unit I · Diversity', short: 'Animal kingdom', title: 'Animal Kingdom',
    blurb: 'Basis of classification — levels of organisation, symmetry, diploblastic/triploblastic, coelom (acoelomate, pseudocoelomate, coelomate), segmentation, notochord; non-chordate phyla Porifera to Hemichordata; phylum Chordata — Urochordata, Cephalochordata, Vertebrata; classes Cyclostomata, Chondrichthyes, Osteichthyes, Amphibia, Reptilia, Aves, Mammalia.',
    revise: {
      oneLine: 'Animals are classified by level of organisation (cellular → tissue → organ → organ-system), symmetry (asymmetric, radial, bilateral), germ layers (diploblastic: Cnidaria, Ctenophora; rest triploblastic), body cavity (acoelomate: flatworms; pseudocoelomate: roundworms; coelomate: annelids onward), segmentation and notochord. Chordates have a notochord, dorsal hollow nerve cord and pharyngeal gill slits at some stage. Vertebrate classes: cyclostomes (jawless), cartilaginous fish, bony fish, amphibians, reptiles, birds (feathers, hollow bones), mammals (hair, mammary glands).',
      sections: [
        { h: 'Unique features', html: '<p>Choanocytes (sponges), cnidoblasts (cnidarians), comb plates (ctenophores), flame cells (flatworms), nephridia (annelids), radula (molluscs), water vascular system (echinoderms).</p>' },
        { h: 'Fishes', html: '<p>Chondrichthyes: cartilaginous, placoid scales, no air bladder (shark). Osteichthyes: bony, operculum, air bladder (rohu, seahorse).</p>' },
        { h: 'Warm-blooded', html: '<p>Birds and mammals are homeothermous with four-chambered hearts; others are poikilothermous.</p>' }
      ],
      formulas: [['Diploblastic', 'Cnidaria, Ctenophora'], ['Acoelomate', 'Platyhelminthes'], ['Pseudocoelomate', 'Aschelminthes'], ['Largest phylum', 'Arthropoda'], ['Chordate traits', 'notochord, dorsal nerve cord, gill slits']],
      terms: [['Coelom', 'body cavity lined by mesoderm'], ['Metamerism', 'body divided into repeated segments'], ['Notochord', 'rod-like support from mesoderm on the dorsal side']],
      traps: ['Echinoderm larvae are bilateral though adults are radial.', 'Platypus and echidna are egg-laying mammals.', 'Whales, dolphins and bats are mammals.'],
      bridge: '<p>Ch 7 studies the frog/cockroach organisation (rationalised content varies).</p>'
    },
    explore: [
      { title: 'Phylum guide', intro: 'Choose a phylum. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'phylum', PH.map(p => p[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { rd.innerHTML = `<b>${PH[k][0]}</b>: ${PH[k][1]} · e.g., <i>${PH[k][2]}</i>`; } const step = () => { k = (k + 1) % PH.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Body cavity sorter', intro: 'Sort by coelom.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Acoelomate', 'Pseudocoelomate', 'Coelomate'], items: [['Planaria', 0], ['Taenia (tapeworm)', 0], ['Ascaris', 1], ['Wuchereria', 1], ['earthworm', 2], ['cockroach', 2], ['starfish', 2], ['human', 2]] }); } }
    ],
    gens: [
      { title: 'Phylum', gen(R) { const p = R.pick(PH); return { q: `Phylum with: ${p[1].split(';')[0]}?`, a: p[0] }; } },
      { title: 'Example', gen(R) { return G9.S9.groupQ(R, [['Spongilla', 0], ['Hydra', 1], ['Fasciola', 2], ['Ascaris', 3], ['leech', 4], ['Pila', 5], ['starfish', 6]], ['Porifera', 'Cnidaria', 'Platyhelminthes', 'Aschelminthes', 'Annelida', 'Mollusca', 'Echinodermata'], 'Phylum of '); } },
      { title: 'Vertebrate class', gen(R) { return G9.S9.groupQ(R, [['Petromyzon (lamprey)', 0], ['shark', 1], ['rohu', 2], ['frog', 3], ['crocodile', 4], ['pigeon', 5], ['whale', 6]], ['Cyclostomata', 'Chondrichthyes', 'Osteichthyes', 'Amphibia', 'Reptilia', 'Aves', 'Mammalia'], 'Class of '); } },
      { title: 'Unique cells', gen(R) { return G9.S9.pickQ(R, [['Collar cells occur in?', 'sponges (choanocytes)'], ['Stinging cells occur in?', 'cnidarians (cnidoblasts)'], ['Flame cells are for?', 'excretion in flatworms'], ['Water vascular system occurs in?', 'echinoderms'], ['Radula occurs in?', 'molluscs (feeding)']]); } },
      { title: 'Concepts', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Three chordate features?', 'notochord, dorsal hollow nerve cord, pharyngeal gill slits'], ['Egg-laying mammals?', 'platypus, echidna'], ['Why are birds and mammals homeothermous?', 'maintain constant body temperature'], ['Difference Chondrichthyes vs Osteichthyes?', 'cartilage, placoid scales, no air bladder vs bone, operculum, air bladder']]); } }
    ],
    quiz: [
      { q: 'Largest phylum', o: ['Arthropoda', 'Mollusca', 'Chordata', 'Annelida'], a: 0, e: 'Insects.' }, { q: 'Diploblastic', o: ['Cnidaria', 'Annelida', 'Mollusca', 'Chordata'], a: 0, e: 'Two layers.' },
      { q: 'Pseudocoelomate', o: ['Ascaris', 'earthworm', 'Planaria', 'Hydra'], a: 0, e: 'Roundworm.' }, { q: 'Metamerism', o: ['Annelida', 'Mollusca', 'Porifera', 'Cnidaria'], a: 0, e: 'Segments.' },
      { q: 'Water vascular system', o: ['Echinodermata', 'Arthropoda', 'Cnidaria', 'Porifera'], a: 0, e: 'Tube feet.' }, { q: 'Shark class', o: ['Chondrichthyes', 'Osteichthyes', 'Cyclostomata', 'Amphibia'], a: 0, e: 'Cartilage.' },
      { q: 'Flame cells', o: ['Platyhelminthes', 'Annelida', 'Arthropoda', 'Mollusca'], a: 0, e: 'Excretion.' }, { q: 'Egg-laying mammal', o: ['platypus', 'whale', 'bat', 'kangaroo'], a: 0, e: 'Monotreme.' },
      { q: 'Comb plates', o: ['Ctenophora', 'Cnidaria', 'Porifera', 'Mollusca'], a: 0, e: 'Comb jellies.' }, { q: 'Radula in', o: ['Mollusca', 'Annelida', 'Arthropoda', 'Echinodermata'], a: 0, e: 'Rasping tongue.' },
      { q: 'Bird feature', o: ['hollow pneumatic bones', 'scales only', 'gills', 'mammary glands'], a: 0, e: 'Flight.' }
    ],
    teach: {
      outcomes: ['Use classification criteria', 'Identify phyla and vertebrate classes', 'Recall unique features'],
      periods: [{ t: 'Criteria and non-chordates', flow: [['10 min', 'Symmetry with paper cut-outs.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Explore panel 2.']] }, { t: 'Chordates', flow: [['15 min', 'Vertebrate class chart.'], ['15 min', 'Unique features quiz.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Whales are fish.', 'Starfish is a fish.'], activities: ['Museum specimens.', 'Classification card game.'],
      exit: ['Coelom types.', 'Chordate traits.', 'Five vertebrate classes.'], homework: 'Classify 15 animals you know into phyla and classes.'
    },
    slides: [{ t: 'Animal Kingdom', b: ['Basis of classification', 'Non-chordate phyla', 'Chordata', 'Vertebrate classes'] }, { t: 'Think and share', b: ['Why is a starfish not a fish?', 'Is a bat a bird?'] }],
    fs: { groups: [['Criteria', [['Layers', 'diplo/triploblastic'], ['Coelom', 'a-, pseudo-, eu-'], ['Symmetry', 'radial/bilateral']]], ['Phyla', [['Porifera', 'choanocytes'], ['Cnidaria', 'cnidoblasts'], ['Annelida', 'segments'], ['Arthropoda', 'jointed legs'], ['Echinodermata', 'water vascular']]], ['Vertebrates', [['Fishes', 'cartilage/bone'], ['Amphibia, Reptilia', 'cold-blooded'], ['Aves, Mammalia', 'warm-blooded']]]],
      ex: [['Ascaris', 'pseudocoelomate'], ['Platypus', 'egg-laying mammal']], rem: ['Learn unique cells.', 'Chordate trio.', 'Exceptions matter.'] }
  });
})();
