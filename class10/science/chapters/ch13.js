/*
TOOL:    class10_science_ch13
FAMILY:  CBSE_REVISION / Class 10 Science (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 13 Our Environment (ecosystem components, food chains and webs, trophic levels, 10% law, biological magnification, ozone layer, waste: biodegradable and non-biodegradable) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 13, part: 'All chapters', short: 'Environment', title: 'Our Environment',
    blurb: 'Ecosystems and their biotic and abiotic components; food chains, food webs and trophic levels; energy flow and the 10% law; biological magnification of pesticides; depletion of the ozone layer by CFCs; managing biodegradable and non-biodegradable waste.',
    revise: {
      oneLine: 'An ecosystem has producers, consumers and decomposers plus abiotic factors. Energy flows one way: only about 10% passes to each higher trophic level, so food chains have 3–4 steps. Non-biodegradable chemicals such as some pesticides are not broken down and build up along food chains — biological magnification, highest in top consumers (including humans). Stratospheric ozone (O₃) absorbs UV; CFCs destroyed it (Montreal Protocol 1987). Waste should be segregated: biodegradable (compost) and non-biodegradable (reduce, reuse, recycle).',
      sections: [
        { h: 'Food webs', html: `<p>Many interlinked chains. Removing one organism affects many others. Decomposers recycle nutrients.</p>` },
        { h: 'Ozone', html: `<p>Formed when UV splits O₂: O₂ → O + O; O + O₂ → O₃. UV exposure causes skin cancer and cataracts. India phased out CFCs under the Montreal Protocol.</p>` },
        { h: 'Waste', html: `<p>Biodegradable: peels, paper, leaves. Non-biodegradable: plastics, glass, metals, DDT. Kulhads vs disposable cups — think about soil and energy use.</p>` }
      ],
      formulas: [['10% law', 'energy × 0.1 per level'], ['Trophic levels', 'producer → herbivore → carnivore → top carnivore'], ['Ozone', 'O₃'], ['Magnification', 'concentration ↑ up the chain']],
      terms: [['Trophic level', 'feeding step in a chain'], ['Biological magnification', 'build-up of chemicals along a food chain'], ['Biodegradable', 'broken down by microbes']],
      traps: ['Energy flows one way; nutrients cycle.', 'Ozone at ground level is a pollutant; in the stratosphere it protects.', 'Magnification is greatest at the top, not the bottom.'],
      bridge: '<p>Class 12 Biology: ecosystem, biodiversity and environmental issues.</p>'
    },
    explore: [
      { title: 'Energy and pesticide in a food chain', intro: 'Set producer energy and pesticide in water; see energy fall and pesticide rise (illustrative ×10 per level).',
        build(el, K) { let E = 10000, p = 0.02; const row = K.row(el); K.slider(row, 'producer energy (kJ)', 1000, 100000, 1000, E, v => { E = v; draw(); }); K.slider(row, 'pesticide in water (ppm)', 0.01, 0.1, 0.01, p, v => { p = v; draw(); }); const rd = K.read(el); const L = ['water plants (producer)', 'zooplankton (herbivore)', 'small fish (carnivore)', 'big fish', 'fish-eating bird (top)'];
          function draw() { rd.innerHTML = '<table style="border-collapse:collapse">' + '<tr><th style="text-align:left;padding:3px 10px">level</th><th style="padding:3px 10px">energy (kJ)</th><th style="padding:3px 10px">pesticide (ppm)</th></tr>' + L.map((l, i) => `<tr><td style="padding:3px 10px">${l}</td><td style="padding:3px 10px;text-align:right">${(+(E / 10 ** i).toFixed(2)).toLocaleString('en-IN')}</td><td style="padding:3px 10px;text-align:right"><b>${(+(p * 10 ** (i + 1)).toFixed(2))}</b></td></tr>`).join('') + '</table><div style="margin-top:6px">Energy ↓ about 10× per level; pesticide ↑ along the chain — biological magnification.</div>'; } draw(); return null; } },
      { title: 'Biodegradable or not?', intro: 'Sort the waste.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Biodegradable', 'Non-biodegradable'], items: [['vegetable peels', 0], ['polythene bag', 1], ['paper', 0], ['glass bottle', 1], ['cotton cloth', 0], ['aluminium can', 1], ['dry leaves', 0], ['DDT', 1], ['clay kulhad', 1, 'not broken down by microbes, though natural']] }); } }
    ],
    gens: [
      { title: '10% law', gen(R) { const E = R.pick([1000, 5000, 10000, 20000]), l = R.int(1, 3); return { q: `Producers have ${E} J. Energy at trophic level ${l + 1}?`, a: `${E / 10 ** l} J`, ans: E / 10 ** l }; } },
      { title: 'Trophic level', gen(R) { const ch = R.pick([['grass', 'grasshopper', 'frog', 'snake', 'eagle'], ['phytoplankton', 'zooplankton', 'small fish', 'big fish', 'heron']]); const i = R.int(0, 4); return { q: `In ${ch.join(' → ')}, which trophic level is ${ch[i]}?`, a: `T${i + 1} (${['producer', 'primary consumer', 'secondary consumer', 'tertiary consumer', 'quaternary consumer'][i]})`, ans: i + 1 }; } },
      { title: 'Biodegradable', gen(R) { return G9.S9.groupQ(R, [['banana peel', 0], ['plastic bottle', 1], ['newspaper', 0], ['DDT', 1], ['wood', 0], ['glass', 1]], ['biodegradable', 'non-biodegradable'], 'Classify: '); } },
      { title: 'Ozone', gen(R) { return G9.S9.pickQ(R, [['How is ozone formed?', 'UV splits O₂; O + O₂ → O₃'], ['What depletes ozone?', 'CFCs'], ['Why is ozone important?', 'absorbs harmful UV radiation'], ['Which agreement controls CFCs?', 'Montreal Protocol (1987)']]); } },
      { title: 'Magnification', levels: [2, 3], gen(R) { const p = R.pick([0.01, 0.02, 0.05]), n = R.int(3, 5); return { q: `Pesticide in water is ${p} ppm and rises 10× at each of ${n} levels. Concentration in the top consumer?`, a: `${+(p * 10 ** n).toFixed(2)} ppm`, ans: p * 10 ** n, tol: 1e-6 }; } }
    ],
    quiz: [
      { q: 'Energy to next level', o: ['10%', '50%', '90%', '100%'], a: 0, e: 'Law.' }, { q: 'Highest pesticide in', o: ['top consumers', 'producers', 'water', 'decomposers'], a: 0, e: 'Magnification.' },
      { q: 'Ozone depleted by', o: ['CFCs', 'oxygen', 'nitrogen', 'water'], a: 0, e: 'CFCs.' }, { q: 'Ozone formula', o: ['O₃', 'O₂', 'CO₂', 'NO₂'], a: 0, e: 'O₃.' },
      { q: 'Non-biodegradable', o: ['plastic', 'peel', 'paper', 'wood'], a: 0, e: 'Persistent.' }, { q: 'Producers are', o: ['green plants', 'animals', 'fungi', 'bacteria only'], a: 0, e: 'Food makers.' },
      { q: 'Energy flow', o: ['unidirectional', 'cyclic', 'random', 'none'], a: 0, e: 'One way.' }, { q: 'Montreal Protocol year', o: ['1987', '1947', '2000', '1997'], a: 0, e: '1987.' },
      { q: 'Decomposers', o: ['bacteria and fungi', 'grass', 'lion', 'deer'], a: 0, e: 'Recyclers.' }, { q: '10 000 J at T1 → T3', o: ['100 J', '1000 J', '10 J', '10 000 J'], a: 0, e: '×0.01.' },
      { q: 'UV causes', o: ['skin cancer', 'vitamin A', 'rain', 'nothing'], a: 0, e: 'Harm.' }
    ],
    teach: {
      outcomes: ['Explain food chains and the 10% law', 'Explain biological magnification', 'Manage waste responsibly'],
      periods: [{ t: 'Ecosystems', flow: [['10 min', 'Aquarium as an ecosystem.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Food web activity.']] }, { t: 'Ozone and waste', flow: [['15 min', 'Ozone story and Montreal Protocol.'], ['15 min', 'Explore panel 2 / waste audit.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Energy recycles.', 'All natural things decompose quickly.'], activities: ['Class waste audit.', 'Compost pit.'],
      exit: ['10% calculation.', 'Magnification meaning.', 'Ozone and CFCs.'], homework: 'Segregate home waste for a week and record kinds and amounts.'
    },
    slides: [{ t: 'Our Environment', b: ['Ecosystem and food chains', '10% law', 'Biological magnification', 'Ozone and waste'] }, { t: 'Think and share', b: ['Why are food chains short?', 'Why do eagles have most DDT?'] }],
    fs: { groups: [['Ecosystem', [['Biotic', 'producers, consumers, decomposers'], ['Abiotic', 'light, water, soil'], ['Energy', '10% per level, one way']]], ['Magnification', [['What', 'chemicals concentrate up the chain'], ['Highest', 'top consumers']]], ['Issues', [['Ozone', 'O₃ absorbs UV; CFCs harm'], ['Waste', 'segregate; 3R']]]],
      ex: [['20 000 J → T4', '20 J'], ['0.02 ppm × 10⁴', '200 ppm']], rem: ['Energy flows, nutrients cycle.', 'Top gets most toxin.', 'Reduce plastics.'] }
  });
})();
