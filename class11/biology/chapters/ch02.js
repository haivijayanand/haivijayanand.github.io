/*
TOOL:    class11_biology_ch02
FAMILY:  CBSE_REVISION / Class 11 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 2 Biological Classification (two- and five-kingdom systems, Monera, Protista, Fungi, Plantae, Animalia, viruses, viroids, prions, lichens) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const KG = [['Monera', 'prokaryotic', 'unicellular', 'cell wall (peptidoglycan in bacteria)', 'autotrophic and heterotrophic', 'bacteria, cyanobacteria, archaebacteria'], ['Protista', 'eukaryotic', 'unicellular', 'some have walls', 'photosynthetic and heterotrophic', 'diatoms, dinoflagellates, Euglena, slime moulds, protozoans'], ['Fungi', 'eukaryotic', 'multicellular (yeast unicellular)', 'chitin', 'heterotrophic (saprophytic/parasitic)', 'Rhizopus, Penicillium, Agaricus, yeast'], ['Plantae', 'eukaryotic', 'multicellular', 'cellulose', 'autotrophic', 'algae, bryophytes, pteridophytes, gymnosperms, angiosperms'], ['Animalia', 'eukaryotic', 'multicellular', 'absent', 'heterotrophic (holozoic)', 'sponges to mammals']];
  G9.register({
    no: 2, part: 'Unit I · Diversity', short: 'Classification', title: 'Biological Classification',
    blurb: 'History of classification (Aristotle, Linnaeus two kingdoms); Whittaker’s five kingdoms and the criteria used; Monera (archaebacteria, eubacteria, cyanobacteria, mycoplasma); Protista (chrysophytes, dinoflagellates, euglenoids, slime moulds, protozoans); Fungi (Phycomycetes, Ascomycetes, Basidiomycetes, Deuteromycetes); Plantae and Animalia; acellular forms — viruses, viroids, prions; lichens.',
    revise: {
      oneLine: 'Whittaker (1969) used cell structure, body organisation, mode of nutrition, reproduction and phylogeny to form Monera, Protista, Fungi, Plantae and Animalia. Monera are prokaryotes (bacteria, cyanobacteria — nitrogen fixers with heterocysts; mycoplasma lack cell walls). Protista are unicellular eukaryotes. Fungi are heterotrophs with chitin walls, classified by spores (sexual: zygospore, ascospore, basidiospore; Deuteromycetes have no known sexual stage). Viruses are nucleoprotein particles (DNA or RNA) that live only in host cells; viroids are naked RNA; prions are infectious proteins; lichens are algae + fungi.',
      sections: [
        { h: 'Fungi groups', html: '<p>Phycomycetes (Rhizopus, Mucor — aseptate), Ascomycetes (sac fungi: yeast, Penicillium, Neurospora), Basidiomycetes (mushrooms, rusts, smuts), Deuteromycetes (imperfect fungi: Alternaria, Trichoderma).</p>' },
        { h: 'Protists', html: '<p>Chrysophytes (diatoms — siliceous walls, diatomaceous earth), dinoflagellates (red tides), euglenoids (pellicle, mixotrophic), slime moulds, protozoans (amoeboid, flagellated, ciliated, sporozoans like Plasmodium).</p>' },
        { h: 'Acellular', html: '<p>TMV (RNA virus, Ivanowsky/Beijerinck); bacteriophages (DNA). Viroids cause potato spindle tuber. Prions cause mad cow disease (BSE) and CJD.</p>' }
      ],
      formulas: [['Five kingdoms', 'Monera, Protista, Fungi, Plantae, Animalia'], ['Monera', 'prokaryotes'], ['Fungal wall', 'chitin'], ['Lichen', 'alga + fungus'], ['Viroid', 'free RNA'], ['Prion', 'protein']],
      terms: [['Heterocyst', 'nitrogen-fixing cell in cyanobacteria'], ['Saprophyte', 'feeds on dead organic matter'], ['Dikaryon', 'cell with two nuclei (n + n) in fungi']],
      traps: ['Fungi are not plants (no chlorophyll, chitin wall).', 'Viruses are not placed in any kingdom.', 'Mycoplasma lacks a cell wall.'],
      bridge: '<p>Ch 3 and 4 detail Plantae and Animalia.</p>'
    },
    explore: [
      { title: 'Kingdom compare', intro: 'Choose a kingdom. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'kingdom', KG.map(x => x[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { const g = KG[k]; rd.innerHTML = `<b>${g[0]}</b> · cell: ${g[1]} · body: ${g[2]} · wall: ${g[3]} · nutrition: ${g[4]} · e.g., ${g[5]}`; } const step = () => { k = (k + 1) % KG.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Which kingdom?', intro: 'Sort the organisms.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Monera', 'Protista', 'Fungi', 'not in any kingdom'], items: [['Nostoc', 0], ['Euglena', 1], ['Penicillium', 2], ['TMV', 3, 'viruses are acellular'], ['Mycoplasma', 0], ['Plasmodium', 1], ['Agaricus', 2], ['prion', 3], ['diatom', 1]] }); } }
    ],
    gens: [
      { title: 'Kingdom', gen(R) { return G9.S9.groupQ(R, [['Anabaena', 0], ['Paramecium', 1], ['yeast', 2], ['Spirogyra', 3], ['sponge', 4], ['Trypanosoma', 1], ['Ustilago (smut)', 2]], KG.map(k => k[0]), 'Kingdom of '); } },
      { title: 'Fungi class', gen(R) { return G9.S9.groupQ(R, [['Rhizopus', 0], ['Penicillium', 1], ['Agaricus', 2], ['Alternaria', 3], ['Neurospora', 1], ['Puccinia (rust)', 2]], ['Phycomycetes', 'Ascomycetes', 'Basidiomycetes', 'Deuteromycetes'], 'Fungal class of '); } },
      { title: 'Acellular', gen(R) { return G9.S9.pickQ(R, [['What is a viroid?', 'free infectious RNA without protein coat'], ['Disease caused by prions?', 'BSE (mad cow disease), CJD'], ['Genetic material of TMV?', 'RNA'], ['Who named viruses “contagium vivum fluidum”?', 'Beijerinck']]); } },
      { title: 'Features', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why are diatoms called “pearls of the ocean”?', 'chief producers; beautiful siliceous walls'], ['Cause of red tides?', 'dinoflagellates (Gonyaulax)'], ['Which bacteria live in extreme conditions?', 'archaebacteria (halophiles, thermoacidophiles, methanogens)'], ['What are lichens indicators of?', 'pollution (they don’t grow in polluted areas)']]); } },
      { title: 'Criteria', gen(R) { return G9.S9.pickQ(R, [['Name Whittaker’s criteria.', 'cell structure, body organisation, nutrition, reproduction, phylogeny'], ['Two-kingdom system by?', 'Linnaeus'], ['Year of five-kingdom system?', '1969'], ['Problem with two-kingdom system?', 'did not separate prokaryotes/eukaryotes, uni/multicellular, autotrophs/heterotrophs']]); } }
    ],
    quiz: [
      { q: 'Five kingdoms by', o: ['Whittaker', 'Linnaeus', 'Aristotle', 'Haeckel'], a: 0, e: '1969.' }, { q: 'Prokaryotes in', o: ['Monera', 'Protista', 'Fungi', 'Plantae'], a: 0, e: 'No nucleus.' },
      { q: 'Fungal cell wall', o: ['chitin', 'cellulose', 'peptidoglycan', 'none'], a: 0, e: 'Chitin.' }, { q: 'Mushroom class', o: ['Basidiomycetes', 'Ascomycetes', 'Phycomycetes', 'Deuteromycetes'], a: 0, e: 'Basidia.' },
      { q: 'Lichen', o: ['alga + fungus', 'bacteria + virus', 'moss + fern', 'fungus + root'], a: 0, e: 'Symbiosis.' }, { q: 'Viroid is', o: ['naked RNA', 'protein', 'DNA virus', 'bacterium'], a: 0, e: 'No coat.' },
      { q: 'Red tide', o: ['dinoflagellates', 'diatoms', 'euglenoids', 'cyanobacteria'], a: 0, e: 'Gonyaulax.' }, { q: 'No cell wall', o: ['Mycoplasma', 'Nostoc', 'yeast', 'diatom'], a: 0, e: 'Smallest.' },
      { q: 'Malaria parasite', o: ['sporozoan protozoan', 'fungus', 'virus', 'bacterium'], a: 0, e: 'Plasmodium.' }, { q: 'Imperfect fungi', o: ['Deuteromycetes', 'Basidiomycetes', 'Ascomycetes', 'Phycomycetes'], a: 0, e: 'No sexual stage.' },
      { q: 'Euglena nutrition', o: ['mixotrophic', 'only autotrophic', 'parasitic', 'chemosynthetic'], a: 0, e: 'Both.' }
    ],
    teach: {
      outcomes: ['Explain five-kingdom criteria', 'Classify microbes and fungi', 'Describe viruses, viroids, prions, lichens'],
      periods: [{ t: 'Kingdoms', flow: [['10 min', 'Pond water slide.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Explore panel 2.']] }, { t: 'Fungi and acellular', flow: [['15 min', 'Bread mould and mushroom.'], ['15 min', 'Virus structure.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Fungi are plants.', 'Viruses are bacteria.'], activities: ['Bread mould culture.', 'Lichen survey.'],
      exit: ['Five kingdoms.', 'Four fungal classes.', 'Viroid vs prion.'], homework: 'Make a chart comparing the five kingdoms on five criteria.'
    },
    slides: [{ t: 'Biological Classification', b: ['Five kingdoms', 'Monera and Protista', 'Fungi', 'Viruses, viroids, prions, lichens'] }, { t: 'Think and share', b: ['Why are fungi separate from plants?', 'Are viruses living?'] }],
    fs: { groups: [['Kingdoms', [['Monera', 'prokaryotes'], ['Protista', 'unicellular eukaryotes'], ['Fungi', 'chitin, heterotrophs']]], ['Fungi', [['Phyco', 'Rhizopus'], ['Asco', 'yeast, Penicillium'], ['Basidio', 'mushroom'], ['Deutero', 'Alternaria']]], ['Others', [['Virus', 'nucleoprotein'], ['Viroid', 'RNA'], ['Prion', 'protein'], ['Lichen', 'alga + fungus']]]],
      ex: [['Nostoc', 'Monera'], ['Agaricus', 'Basidiomycetes']], rem: ['Five criteria.', 'Fungi ≠ plants.', 'Viruses outside kingdoms.'] }
  });
})();
