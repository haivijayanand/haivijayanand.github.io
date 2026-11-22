/*
TOOL:    class8_science_ch02
FAMILY:  CBSE_REVISION / Class 8 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 2 The Invisible Living World: Beyond Our Naked Eye (microscope, cells, microorganisms groups, useful and harmful microbes, fermentation, food preservation) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const MIC = [['bacteria', 'curd (Lactobacillus), nitrogen fixing in roots; some cause typhoid, cholera'], ['fungi', 'yeast for bread and idli batter; moulds spoil bread; penicillin from a mould'], ['protozoa', 'amoeba, paramecium; Plasmodium causes malaria'], ['algae', 'Chlamydomonas, Spirogyra; make oxygen and food in water'], ['viruses', 'reproduce only inside living cells; cause common cold, flu, polio, COVID-19']];
  G9.register({
    no: 2, part: 'All chapters', short: 'Microbes', title: 'The Invisible Living World: Beyond Our Naked Eye',
    blurb: 'Seeing the very small with a microscope, cells as building blocks, groups of microorganisms (bacteria, fungi, protozoa, algae, viruses), where they live, useful roles (curd, bread, medicines, soil fertility, decomposing), harmful roles (diseases, food spoilage) and preserving food.',
    revise: {
      oneLine: 'Microorganisms are too small to see without a microscope. Main groups: bacteria, fungi, protozoa, algae and viruses (which live only inside other cells). Microbes help make curd, bread and medicines, enrich soil and decompose waste; some cause diseases and spoil food. Hygiene, vaccination and preservation (heating, refrigeration, salt, sugar, oil, drying) protect us.',
      sections: [
        { h: 'Cells', html: `<p>All living things are made of cells — some single-celled (amoeba, bacteria), others many-celled. Robert Hooke saw cork cells; Leeuwenhoek saw “animalcules”.</p>` },
        { h: 'Useful microbes', html: `<p>Lactobacillus turns milk to curd; yeast ferments sugar to make dough rise (CO₂); Rhizobium fixes nitrogen in legume roots; decomposers recycle nutrients; antibiotics like penicillin.</p>` },
        { h: 'Harmful microbes and prevention', html: `<p>Diseases spread by air, water, food, contact and carriers (mosquitoes, houseflies). Prevent by clean water, handwashing, vaccines, mosquito control. Preserve food by boiling, pasteurisation, refrigeration, salting, pickling.</p>` }
      ],
      formulas: [['Curd', 'Lactobacillus'], ['Dough rising', 'yeast → CO₂'], ['Nitrogen fixing', 'Rhizobium'], ['Penicillin', 'from a fungus'], ['Malaria', 'Plasmodium via mosquito']],
      terms: [['Microorganism', 'living thing seen only under a microscope'], ['Fermentation', 'microbes converting sugar to alcohol/acid and CO₂'], ['Antibiotic', 'medicine that kills or stops bacteria']],
      traps: ['Antibiotics do not work on viruses.', 'Not all microbes are harmful.', 'Viruses are not cells.'],
      bridge: '<p>Class 9 studies the cell in detail; Class 9–12 cover microbes in health.</p>'
    },
    explore: [
      { title: 'Microbe groups', intro: 'Step through the five groups. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'group', MIC.map(m => m[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { rd.innerHTML = `<b>${MIC[k][0]}</b>: ${MIC[k][1]}`; } const step = () => { k = (k + 1) % MIC.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Friend or foe?', intro: 'Sort the microbe roles.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Useful', 'Harmful'], items: [['yeast making bread rise', 0], ['bacteria setting curd', 0], ['mould on stale bread', 1], ['Rhizobium in pea roots', 0], ['Plasmodium causing malaria', 1], ['decomposers turning leaves into manure', 0], ['bacteria spoiling milk', 1], ['penicillin mould', 0]] }); } }
    ],
    gens: [
      { title: 'Group', gen(R) { return G9.S9.groupQ(R, [['Lactobacillus', 0], ['yeast', 1], ['amoeba', 2], ['Spirogyra', 3], ['influenza agent', 4], ['bread mould', 1]], ['bacterium', 'fungus', 'protozoan', 'alga', 'virus'], 'Group of '); } },
      { title: 'Uses', gen(R) { return G9.S9.pickQ(R, [['Which microbe makes curd?', 'Lactobacillus (bacteria)'], ['Why does idli batter rise?', 'yeast/bacteria release CO₂ by fermentation'], ['How do Rhizobium help farmers?', 'fix nitrogen in legume roots'], ['Name an antibiotic from a fungus.', 'penicillin']]); } },
      { title: 'Prevention', gen(R) { return G9.S9.pickQ(R, [['How is malaria spread?', 'by female Anopheles mosquito carrying Plasmodium'], ['Why don’t antibiotics cure a cold?', 'colds are caused by viruses'], ['Name two ways to preserve food.', 'refrigeration, salting, pickling, drying, boiling'], ['What is pasteurisation?', 'heating milk to about 70 °C briefly then cooling quickly']]); } },
      { title: 'Doubling bacteria', levels: [2, 3], gen(R) { const n0 = R.pick([10, 50, 100]), d = R.pick([20, 30]), t = R.pick([2, 3]) * 60 / d * d; const g = t / d; return { q: `${n0} bacteria double every ${d} minutes in warm food. How many after ${t} minutes?`, a: String(n0 * 2 ** g), ans: n0 * 2 ** g }; } },
      { title: 'Magnification', levels: [2, 3], gen(R) { const e = R.pick([5, 10, 15]), o = R.pick([10, 40, 100]); return { q: `A microscope has a ${e}× eyepiece and ${o}× objective. Total magnification?`, a: `${e * o}×`, ans: e * o }; } }
    ],
    quiz: [
      { q: 'Curd is made by', o: ['Lactobacillus', 'yeast', 'virus', 'algae'], a: 0, e: 'Bacteria.' }, { q: 'Yeast is a', o: ['fungus', 'bacterium', 'virus', 'protozoan'], a: 0, e: 'Fungus.' },
      { q: 'Malaria parasite', o: ['Plasmodium', 'yeast', 'Rhizobium', 'Lactobacillus'], a: 0, e: 'Protozoan.' }, { q: 'Viruses multiply', o: ['only inside living cells', 'in air', 'in soil alone', 'in water alone'], a: 0, e: 'Host.' },
      { q: 'Antibiotics act on', o: ['bacteria', 'viruses', 'all microbes', 'none'], a: 0, e: 'Bacteria.' }, { q: 'Rhizobium lives in', o: ['legume roots', 'bread', 'milk', 'mosquito'], a: 0, e: 'Nodules.' },
      { q: 'Penicillin from', o: ['a mould', 'a virus', 'an alga', 'a protozoan'], a: 0, e: 'Fleming.' }, { q: 'Dough rises due to', o: ['CO₂', 'O₂', 'N₂', 'steam only'], a: 0, e: 'Gas.' },
      { q: '10× eyepiece, 40× objective', o: ['400×', '50×', '4×', '30×'], a: 0, e: 'Multiply.' }, { q: 'Food preservation', o: ['refrigeration', 'leaving uncovered', 'adding water', 'warmth'], a: 0, e: 'Cold.' },
      { q: 'Spirogyra is', o: ['an alga', 'a virus', 'a fungus', 'a bacterium'], a: 0, e: 'Green.' }
    ],
    teach: {
      outcomes: ['Name groups of microbes', 'Explain useful and harmful roles', 'Suggest prevention and preservation'],
      periods: [{ t: 'Seeing small', flow: [['10 min', 'Pond water under microscope.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Curd and yeast demos.']] }, { t: 'Friend or foe', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Disease-prevention poster.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['All microbes are germs.', 'Antibiotics cure viral illness.'], activities: ['Yeast balloon test.', 'Bread mould watch (sealed bag).'],
      exit: ['Five groups.', 'Two useful roles.', 'Two prevention steps.'], homework: 'List foods at home made using microbes and how they are preserved.'
    },
    slides: [{ t: 'The Invisible Living World', b: ['Microscope and cells', 'Groups of microbes', 'Useful microbes', 'Harmful microbes and prevention'] }, { t: 'Think and share', b: ['Why no antibiotic for flu?', 'How does curd set?'] }],
    fs: { groups: [['Groups', [['Bacteria', 'Lactobacillus, Rhizobium'], ['Fungi', 'yeast, mould'], ['Protozoa', 'amoeba, Plasmodium'], ['Algae', 'Spirogyra'], ['Viruses', 'only in cells']]], ['Useful', [['Curd', 'bacteria'], ['Bread', 'yeast'], ['Soil', 'nitrogen fixing'], ['Medicine', 'penicillin']]], ['Protection', [['Disease', 'hygiene, vaccines'], ['Food', 'cold, salt, sugar, heat']]]],
      ex: [['10× × 40×', '400×'], ['100 doubling 3 times', '800']], rem: ['Microbes are mostly helpful.', 'Antibiotics ≠ viruses.', 'Preserve food.'] }
  });
})();
