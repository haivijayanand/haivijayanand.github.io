/*
TOOL:    class11_biology_ch01
FAMILY:  CBSE_REVISION / Class 11 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 1 The Living World (what is living, diversity, taxonomy, binomial nomenclature, taxonomic categories and hierarchy, taxonomical aids) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const HI = ['Kingdom', 'Phylum / Division', 'Class', 'Order', 'Family', 'Genus', 'Species'];
  const EX = [['Human', ['Animalia', 'Chordata', 'Mammalia', 'Primata', 'Hominidae', 'Homo', 'sapiens']], ['Mango', ['Plantae', 'Angiospermae', 'Dicotyledonae', 'Sapindales', 'Anacardiaceae', 'Mangifera', 'indica']], ['Wheat', ['Plantae', 'Angiospermae', 'Monocotyledonae', 'Poales', 'Poaceae', 'Triticum', 'aestivum']], ['Housefly', ['Animalia', 'Arthropoda', 'Insecta', 'Diptera', 'Muscidae', 'Musca', 'domestica']]];
  G9.register({
    no: 1, part: 'Unit I · Diversity', short: 'Living world', title: 'The Living World',
    blurb: 'Defining features of living organisms (growth, reproduction, metabolism, cellular organisation, consciousness); biodiversity; need for classification; taxonomy and systematics; binomial nomenclature rules; taxonomic categories (species to kingdom) and hierarchy; taxonomical aids — herbarium, botanical gardens, museums, zoological parks, keys.',
    revise: {
      oneLine: 'Defining properties of life are metabolism, cellular organisation and consciousness (response to stimuli); growth and reproduction are not defining on their own (crystals grow; mules don’t reproduce). Organisms are named by binomial nomenclature (Linnaeus): Genus capitalised, species lower-case, italicised or underlined, with author’s name. Categories from narrow to broad: species → genus → family → order → class → phylum/division → kingdom; common features decrease up the hierarchy.',
      sections: [
        { h: 'Taxonomic aids', html: '<p>Herbarium (dried, pressed, labelled specimens), botanical gardens (Kew, Indian Botanical Garden Howrah), museums, zoological parks, keys (couplets of contrasting characters), floras, manuals, monographs, catalogues.</p>' },
        { h: 'Taxonomy terms', html: '<p>Characterisation, identification, nomenclature, classification. Systematics also includes evolutionary relationships.</p>' },
        { h: 'Diversity', html: '<p>About 1.7–1.8 million species described; India is one of 12 megadiverse countries.</p>' }
      ],
      formulas: [['Defining features', 'metabolism, cellular organisation, consciousness'], ['Name format', 'Genus species Author'], ['Hierarchy', 'K P C O F G S'], ['Key', 'couplets (lead)']],
      terms: [['Taxon', 'a group at any rank'], ['Species', 'interbreeding natural population'], ['Herbarium', 'store-house of preserved plant specimens']],
      traps: ['Growth and reproduction are not defining features alone.', 'Species name is never capitalised.', 'Phylum (animals) = Division (plants).'],
      bridge: '<p>Ch 2–4 classify organisms into kingdoms and groups.</p>'
    },
    explore: [
      { title: 'Climb the hierarchy', intro: 'Choose an organism; see its classification. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'organism', EX.map(e => e[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { const e = EX[k]; rd.innerHTML = HI.map((h, i) => `${h}: <b>${i >= 5 ? '<i>' + e[1][i] + '</i>' : e[1][i]}</b>`).join(' · ') + ` → <i>${e[1][5]} ${e[1][6]}</i>`; } const step = () => { k = (k + 1) % EX.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Defining feature or not?', intro: 'Sort the features of life.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Defining feature of life', 'Not defining alone'], items: [['metabolism', 0], ['cellular organisation', 0], ['consciousness / response', 0], ['growth', 1, 'crystals and mountains also grow'], ['reproduction', 1, 'mules and worker bees cannot'], ['increase in mass', 1]] }); } }
    ],
    gens: [
      { title: 'Rank order', gen(R) { const i = R.int(0, 5); return { q: `Which rank comes just below ${HI[i]}?`, a: HI[i + 1] }; } },
      { title: 'Name rules', gen(R) { return G9.S9.pickQ(R, [['Which part of a scientific name is capitalised?', 'genus'], ['How are scientific names written in print?', 'italics (underlined when handwritten)'], ['Who proposed binomial nomenclature?', 'Carolus Linnaeus'], ['Correct form: mangifera Indica or Mangifera indica?', 'Mangifera indica']]); } },
      { title: 'Classification', gen(R) { const e = R.pick(EX); const i = R.int(0, 6); return { q: `${HI[i]} of ${e[0]}?`, a: e[1][i] }; } },
      { title: 'Taxonomic aids', gen(R) { return G9.S9.pickQ(R, [['What is a herbarium?', 'collection of dried, pressed, labelled plant specimens'], ['What is a key?', 'tool of contrasting couplets to identify organisms'], ['Where is the Indian Botanical Garden?', 'Howrah (Kolkata)'], ['What are monographs?', 'information on any one taxon']]); } },
      { title: 'Defining features', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why is growth not a defining property?', 'non-living things like crystals also grow'], ['Why is reproduction not defining?', 'some organisms (mules) cannot reproduce'], ['Most obvious defining feature?', 'response to stimuli (consciousness)'], ['Sum of all chemical reactions in a body?', 'metabolism']]); } }
    ],
    quiz: [
      { q: 'Defining feature', o: ['metabolism', 'growth', 'reproduction', 'movement'], a: 0, e: 'Unique to life.' }, { q: 'Lowest rank', o: ['species', 'genus', 'family', 'order'], a: 0, e: 'Basic unit.' },
      { q: 'Binomial nomenclature by', o: ['Linnaeus', 'Darwin', 'Whittaker', 'Mendel'], a: 0, e: 'Systema Naturae.' }, { q: 'Human genus', o: ['Homo', 'sapiens', 'Hominidae', 'Primata'], a: 0, e: 'Genus.' },
      { q: 'Dried plant collection', o: ['herbarium', 'museum', 'zoo', 'key'], a: 0, e: 'Sheets.' }, { q: 'Phylum equivalent in plants', o: ['division', 'class', 'order', 'family'], a: 0, e: 'Plants.' },
      { q: 'Correct writing', o: ['Musca domestica', 'musca Domestica', 'Musca Domestica', 'MUSCA domestica'], a: 0, e: 'Rules.' }, { q: 'Key uses', o: ['couplets', 'triplets', 'photos only', 'DNA only'], a: 0, e: 'Contrasting.' },
      { q: 'Wheat family', o: ['Poaceae', 'Anacardiaceae', 'Muscidae', 'Hominidae'], a: 0, e: 'Grasses.' }, { q: 'Mule shows', o: ['reproduction is not defining', 'growth', 'death', 'taxonomy'], a: 0, e: 'Sterile.' },
      { q: 'Common characters going up hierarchy', o: ['decrease', 'increase', 'same', 'zero'], a: 0, e: 'Broader.' }
    ],
    teach: {
      outcomes: ['State defining features of life', 'Write scientific names correctly', 'Use taxonomic categories and aids'],
      periods: [{ t: 'Life and naming', flow: [['10 min', 'Is it living? debate.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Naming rules practice.']] }, { t: 'Hierarchy', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Make a herbarium sheet.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Growth defines life.', 'Species names capitalised.'], activities: ['Herbarium sheet.', 'Dichotomous key for leaves.'],
      exit: ['Defining features.', 'Hierarchy order.', 'Name format.'], homework: 'Make a dichotomous key for 6 classroom objects or leaves.'
    },
    slides: [{ t: 'The Living World', b: ['What is living?', 'Binomial nomenclature', 'Taxonomic hierarchy', 'Taxonomical aids'] }, { t: 'Think and share', b: ['Is a crystal alive?', 'Why scientific names?'] }],
    fs: { groups: [['Life', [['Defining', 'metabolism, cells, consciousness'], ['Not alone', 'growth, reproduction']]], ['Naming', [['Format', 'Genus species'], ['Print', 'italics'], ['By', 'Linnaeus']]], ['Hierarchy & aids', [['Order', 'K P C O F G S'], ['Aids', 'herbarium, garden, museum, zoo, key']]]],
      ex: [['Mango', 'Mangifera indica'], ['Housefly order', 'Diptera']], rem: ['Genus capital, species small.', 'Narrow to broad.', 'Use keys.'] }
  });
})();
