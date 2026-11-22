/*
TOOL:    class6_science_ch09
FAMILY:  CBSE_REVISION / Class 6 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 9 Methods of Separation in Everyday Life (handpicking, threshing, winnowing, sieving, sedimentation, decantation, filtration, evaporation, churning) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const M = [['handpicking', 'pick out larger, visible pieces', 'stones from rice'], ['threshing', 'beat stalks to free grains', 'wheat grains from stalks'], ['winnowing', 'wind blows away lighter husk', 'husk from grain'], ['sieving', 'small particles pass through holes', 'bran from flour, sand from pebbles'], ['sedimentation and decantation', 'heavy solid settles; pour off liquid', 'sand from water, washing dal'], ['filtration', 'filter paper or cloth holds back solid', 'tea leaves from tea, muddy water'], ['evaporation', 'heat liquid away; dissolved solid stays', 'salt from sea water'], ['churning', 'spinning separates lighter fat', 'butter from curd'], ['magnetic separation', 'magnet pulls iron', 'iron filings from sand']];
  G9.register({
    no: 9, part: 'All chapters', short: 'Separation', title: 'Methods of Separation in Everyday Life',
    blurb: 'Why we separate mixtures (to remove useless or harmful parts, or get useful ones) and how: handpicking, threshing, winnowing, sieving, sedimentation and decantation, filtration, evaporation, churning and using a magnet.',
    revise: {
      oneLine: 'A mixture has two or more substances mixed together. We choose a separation method by the difference between the parts — size (handpicking, sieving), weight (winnowing, sedimentation), solubility (filtration, evaporation), or magnetism (magnet). Often two methods are used one after the other.',
      sections: [
        { h: 'From the farm', html: `<p>Threshing frees grain from stalks; winnowing lets wind blow away light husk; handpicking removes stones.</p>` },
        { h: 'From water', html: `<p>Sedimentation lets sand settle; decantation pours off water; filtration removes fine particles; evaporation gets salt back from salt water.</p>` },
        { h: 'Combining methods', html: `<p>Salt + sand: dissolve in water → filter (sand stays) → evaporate the filtrate (salt left).</p>` }
      ],
      formulas: [['Size', 'handpick, sieve'], ['Weight', 'winnow, sediment'], ['Insoluble solid', 'filter'], ['Dissolved solid', 'evaporate'], ['Iron', 'magnet']],
      terms: [['Mixture', 'two or more substances together'], ['Filtrate', 'clear liquid after filtering'], ['Residue', 'solid left on the filter']],
      traps: ['Filtration cannot remove dissolved salt.', 'Winnowing needs a breeze or fan.', 'Pick the method by property difference.'],
      bridge: '<p>Class 9 studies mixtures and pure substances in detail.</p>'
    },
    explore: [
      { title: 'Pick the method', intro: 'Choose a separation method to see how it works and where it is used. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'method', M.map(m => m[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { const m = M[k]; rd.innerHTML = `<b>${m[0]}</b>: ${m[1]} · example: <b>${m[2]}</b>`; } const step = () => { k = (k + 1) % M.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Salt and sand', intro: 'Separate a salt–sand mixture step by step. <kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Mixture', 'Salt and sand are mixed — you cannot pick out the salt.'], ['Dissolve', 'Add water and stir: salt dissolves, sand does not.'], ['Filter', 'Pour through filter paper: sand stays as residue; salt water passes as filtrate.'], ['Evaporate', 'Heat the filtrate; water evaporates, salt crystals remain.']] }); } }
    ],
    gens: [
      { title: 'Choose a method', gen(R) { const m = R.pick(M); return { q: `Which method separates: ${m[2]}?`, a: m[0] }; } },
      { title: 'Why it works', gen(R) { const m = R.pick(M); return { q: `How does ${m[0]} work?`, a: m[1] }; } },
      { title: 'Two steps', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['How to separate salt from sand?', 'dissolve in water, filter, evaporate filtrate'], ['How to get clean water from muddy water?', 'sedimentation, decantation, then filtration'], ['How to separate iron filings, sand and salt?', 'magnet, then dissolve, filter, evaporate'], ['How do farmers get clean grain?', 'threshing, then winnowing, then handpicking']]); } },
      { title: 'Recover salt', levels: [2, 3], gen(R) { const v = R.int(2, 9), c = R.int(20, 40); return { q: `Sea water has about ${c} g of salt per litre. How much salt is left after evaporating ${v} L?`, a: `${c * v} g`, ans: c * v }; } },
      { title: 'Property used', gen(R) { return G9.S9.groupQ(R, [['sieving', 0], ['winnowing', 1], ['magnet', 2], ['handpicking', 0], ['sedimentation', 1], ['evaporation', 3]], ['size', 'weight / heaviness', 'magnetism', 'solubility'], 'Main property used by '); } }
    ],
    quiz: [
      { q: 'Husk from grain', o: ['winnowing', 'filtration', 'magnet', 'churning'], a: 0, e: 'Wind.' }, { q: 'Salt from sea water', o: ['evaporation', 'sieving', 'handpicking', 'winnowing'], a: 0, e: 'Heat.' },
      { q: 'Tea leaves from tea', o: ['filtration (strainer)', 'evaporation', 'winnowing', 'threshing'], a: 0, e: 'Strain.' }, { q: 'Butter from curd', o: ['churning', 'sieving', 'magnet', 'decantation'], a: 0, e: 'Spin.' },
      { q: 'Grain from stalks', o: ['threshing', 'filtration', 'evaporation', 'churning'], a: 0, e: 'Beat.' }, { q: 'Pouring off water after sand settles', o: ['decantation', 'filtration', 'winnowing', 'threshing'], a: 0, e: 'Pour.' },
      { q: 'Iron from sand', o: ['magnet', 'water', 'sieve only', 'winnowing'], a: 0, e: 'Magnetic.' }, { q: 'Solid left on filter paper', o: ['residue', 'filtrate', 'solution', 'vapour'], a: 0, e: 'Residue.' },
      { q: 'Filtration removes', o: ['insoluble solids', 'dissolved salt', 'colour of sugar water', 'water'], a: 0, e: 'Not dissolved.' }, { q: 'Bran from flour', o: ['sieving', 'evaporation', 'magnet', 'churning'], a: 0, e: 'Size.' },
      { q: 'Stones from rice', o: ['handpicking', 'evaporation', 'churning', 'condensation'], a: 0, e: 'Visible.' }
    ],
    teach: {
      outcomes: ['Explain why mixtures are separated', 'Choose methods by property', 'Combine methods'],
      periods: [{ t: 'Methods', flow: [['10 min', 'Kitchen separation stories.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Sieve and winnow demo.']] }, { t: 'Combining', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Salt–sand lab.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Filtering removes salt.', 'One method fits all.'], activities: ['Salt–sand separation.', 'Muddy water clean-up.'],
      exit: ['Three methods with examples.', 'Salt from sand steps.', 'Filtrate vs residue.'], homework: 'List 5 separations seen at home and name the method.'
    },
    slides: [{ t: 'Methods of Separation', b: ['Why separate', 'Size and weight methods', 'Water methods', 'Combining methods'] }, { t: 'Think and share', b: ['Salt from sand?', 'Why can’t filtering remove salt?'] }],
    fs: { groups: [['By size', [['Handpicking', 'stones from rice'], ['Sieving', 'bran from flour']]], ['By weight', [['Winnowing', 'husk'], ['Sedimentation', 'sand settles'], ['Decantation', 'pour off']]], ['Others', [['Filtration', 'insoluble solid'], ['Evaporation', 'dissolved solid'], ['Churning', 'butter'], ['Magnet', 'iron']]]],
      ex: [['Salt + sand', 'dissolve, filter, evaporate'], ['5 L × 35 g/L', '175 g']], rem: ['Use the property difference.', 'Combine methods.', 'Filtrate passes; residue stays.'] }
  });
})();
