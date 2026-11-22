/*
TOOL:    class12_biology_ch11
FAMILY:  CBSE_REVISION / Class 12 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 11 Organisms and Populations (population attributes, age pyramids, growth, exponential and logistic models, life history, population interactions) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 11, part: 'Unit X · Ecology', short: 'Populations', title: 'Organisms and Populations',
    blurb: 'Populations — attributes (birth rate, death rate, sex ratio, age distribution and age pyramids, density); population growth — natality, mortality, immigration, emigration; growth models — exponential (J-shaped) and logistic (S-shaped, carrying capacity); life-history variation; population interactions — mutualism, competition (Gause’s principle, resource partitioning), predation, parasitism, commensalism, amensalism.',
    revise: {
      oneLine: 'Density change: N(t+1) = N(t) + [(B + I) − (D + E)]. Exponential growth dN/dt = rN gives a J-curve (Nₜ = N₀e^(rt)); logistic growth dN/dt = rN(K − N)/K gives an S-curve levelling at carrying capacity K (Verhulst–Pearl). r is the intrinsic rate of natural increase (e.g. Norway rat 0.015, flour beetle 0.12; India 1981 r = 0.0205). Age pyramids: expanding (triangular, young-dominated), stable (bell), declining (urn). Interactions: mutualism (+,+: lichens, mycorrhiza, fig–wasp), competition (−,−), predation and parasitism (+,−), commensalism (+,0: orchid on mango, barnacles on whale, cattle egret and cattle), amensalism (−,0). Gause’s competitive exclusion: two closely related species competing for the same resource cannot coexist indefinitely; resource partitioning (MacArthur’s warblers) allows coexistence.',
      sections: [
        { h: 'Predation roles', html: '<p>Transfers energy, controls prey (prickly pear in Australia controlled by a moth), maintains diversity (Paine’s starfish Pisaster experiment). Prey defences: camouflage, poison (monarch butterfly), thorns, chemicals (Calotropis).</p>' },
        { h: 'Parasitism', html: '<p>Ectoparasites (lice, ticks, Cuscuta), endoparasites (tapeworm, liver fluke with two intermediate hosts), brood parasitism (cuckoo lays eggs in crow’s nest).</p>' },
        { h: 'Life history', html: '<p>Some breed once (Pacific salmon, bamboo); others many times. Some produce many small offspring (oysters), others few large ones (mammals).</p>' }
      ],
      formulas: [['Exponential', 'dN/dt = rN'], ['Integrated', 'Nₜ = N₀e^(rt)'], ['Logistic', 'dN/dt = rN(K − N)/K'], ['Density change', '(B + I) − (D + E)']],
      terms: [['Carrying capacity K', 'maximum population an environment can support'], ['Competitive exclusion', 'Gause’s principle'], ['Brood parasitism', 'host raises parasite’s young']],
      traps: ['Logistic growth is more realistic than exponential.', 'Orchid on mango is commensalism, not parasitism.', 'Competition can be between unrelated species too (flamingos and fish for zooplankton).'],
      bridge: '<p>Ch 12 studies the ecosystem as a whole.</p>'
    },
    explore: [
      { title: 'Growth models', intro: 'Compare exponential and logistic growth.',
        build(el, K) { let r = 0.3, Kc = 500, N0 = 10; const row = K.row(el); K.slider(row, 'r', 0.05, 1, 0.01, r, v => { r = v; b.redraw(); }); K.slider(row, 'K', 100, 1000, 10, Kc, v => { Kc = v; b.redraw(); }); K.slider(row, 'N₀', 1, 100, 1, N0, v => { N0 = v; b.redraw(); }); const b = new K.Board(el, { xmin: -2, xmax: 42, ymin: -1, ymax: 22, axes: false, grid: 0, aspect: 0.45 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const sy = 20 / 1100; b.line(0, 0, 40, 0, { color: C.ink, w: 1 }); b.line(0, 0, 0, 21, { color: C.ink, w: 1 }); b.line(0, Kc * sy, 40, Kc * sy, { color: C.grey, w: 1, dash: [5, 5] }); b.text(38, Kc * sy + 0.7, 'K', { font: '12px' });
            let pe = null, pl = null; for (let t = 0; t <= 40; t += 0.25) { const e = N0 * Math.exp(r * t), l = Kc / (1 + (Kc - N0) / N0 * Math.exp(-r * t)); if (e * sy < 21) { if (pe) b.line(pe[0], pe[1], t, e * sy, { color: C.orange, w: 2.5 }); pe = [t, e * sy]; } if (pl) b.line(pl[0], pl[1], t, l * sy, { color: C.blue, w: 2.5 }); pl = [t, l * sy]; }
            rd.innerHTML = `orange: exponential (J) N = N₀e^(rt) · blue: logistic (S) levelling at K = ${Kc} · at t = 10: exponential ${f(N0 * Math.exp(r * 10))}, logistic ${f(Kc / (1 + (Kc - N0) / N0 * Math.exp(-r * 10)))}`; };
          b.redraw(); return null; } },
      { title: 'Interaction sorter', intro: 'Sort by interaction type.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['mutualism (+,+)', 'commensalism (+,0)', 'parasitism (+,−)', 'predation (+,−)', 'competition (−,−)'], items: [['lichen (alga + fungus)', 0], ['fig and wasp', 0], ['orchid on mango branch', 1], ['barnacles on whale', 1], ['cattle egret and cattle', 1], ['Cuscuta on hedge plants', 2], ['cuckoo in crow’s nest', 2], ['tiger and deer', 3], ['flamingos and fish for zooplankton', 4]] }); } }
    ],
    gens: [
      { title: 'Density change', gen(R) { const N = R.pick([100, 500, 1000]), B = R.pick([20, 50, 80]), D = R.pick([10, 30, 40]), I = R.pick([0, 5, 10]), E = R.pick([0, 5, 15]); return { q: `N = ${N}; births ${B}, deaths ${D}, immigration ${I}, emigration ${E}. New N?`, a: `${N + B + I - D - E}`, ans: N + B + I - D - E }; } },
      { title: 'Birth/death rate', gen(R) { const n = R.pick([20, 50, 80]), b = R.pick([4, 8, 10]); return { q: `${n} lotus plants; ${b} new plants added by reproduction in a year. Birth rate?`, a: `${f(b / n)} per plant per year`, ans: b / n, tol: 1e-4 }; } },
      { title: 'Exponential', levels: [2, 3], gen(R) { const N0 = R.pick([10, 100]), r = R.pick([0.1, 0.2, 0.5]), t = R.pick([2, 5, 10]); return { q: `N₀ = ${N0}, r = ${r} per year, exponential growth. N after ${t} years?`, a: f(N0 * Math.exp(r * t)), ans: N0 * Math.exp(r * t), tol: 0.01 }; } },
      { title: 'Interaction', gen(R) { return G9.S9.groupQ(R, [['lichen', 0], ['orchid on mango', 1], ['tapeworm in human', 2], ['bee and flower', 0], ['clownfish and sea anemone', 1], ['Cuscuta', 2]], ['mutualism', 'commensalism', 'parasitism'], ''); } },
      { title: 'Concepts', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Age pyramid of a growing population?', 'triangular (expanding) — broad base'], ['What is Gause’s principle?', 'two species competing for the same resource cannot coexist indefinitely'], ['Why is logistic model more realistic?', 'resources are finite — growth slows near K'], ['Example of a plant chemical defence?', 'Calotropis cardiac glycosides'], ['How was prickly pear controlled in Australia?', 'by a cactus-feeding moth (predator)']]); } }
    ],
    quiz: [
      { q: 'Logistic curve shape', o: ['S', 'J', 'U', 'L'], a: 0, e: 'Levels at K.' }, { q: 'dN/dt = rN', o: ['exponential', 'logistic', 'constant', 'none'], a: 0, e: 'J-curve.' },
      { q: 'Orchid on mango', o: ['commensalism', 'parasitism', 'mutualism', 'predation'], a: 0, e: '+,0.' }, { q: 'Lichen', o: ['mutualism', 'competition', 'parasitism', 'amensalism'], a: 0, e: '+,+.' },
      { q: 'Cuckoo', o: ['brood parasitism', 'mutualism', 'commensalism', 'predation'], a: 0, e: 'Crow raises.' }, { q: 'Competitive exclusion by', o: ['Gause', 'Darwin', 'Paine', 'MacArthur'], a: 0, e: 'Principle.' },
      { q: 'Declining population pyramid', o: ['urn-shaped', 'triangular', 'bell', 'square'], a: 0, e: 'Few young.' }, { q: 'Paine’s experiment removed', o: ['starfish Pisaster', 'otters', 'wolves', 'moths'], a: 0, e: 'Diversity fell.' },
      { q: 'Resource partitioning shown by', o: ['MacArthur’s warblers', 'lichens', 'Cuscuta', 'salmon'], a: 0, e: 'Coexistence.' }, { q: 'Barnacles on whale', o: ['commensalism', 'parasitism', 'predation', 'mutualism'], a: 0, e: '+,0.' },
      { q: 'K means', o: ['carrying capacity', 'growth rate', 'birth rate', 'density'], a: 0, e: 'Maximum.' }
    ],
    teach: {
      outcomes: ['Describe population attributes', 'Compare growth models', 'Classify population interactions'],
      periods: [{ t: 'Populations', flow: [['10 min', 'Age pyramid reading.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Rate calculations.']] }, { t: 'Interactions', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Case studies (Paine, Gause).'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Populations grow forever.', 'Commensals harm hosts.'], activities: ['Bean-counting population growth.', 'Quadrat sampling in school ground.'],
      exit: ['J vs S.', 'Interaction signs.', 'Gause.'], homework: 'Draw age pyramids for three countries from census data.'
    },
    slides: [{ t: 'Organisms and Populations', b: ['Population attributes', 'Growth models', 'Life history', 'Interactions'] }, { t: 'Think and share', b: ['What limits a city’s population?', 'Why remove invasive species carefully?'] }],
    fs: { groups: [['Attributes', [['Density change', '(B+I) − (D+E)'], ['Pyramids', 'expanding, stable, declining'], ['Sex ratio', 'females : males']]], ['Growth', [['Exponential', 'dN/dt = rN (J)'], ['Logistic', 'rN(K−N)/K (S)'], ['r', 'intrinsic rate']]], ['Interactions', [['+,+', 'mutualism'], ['+,0', 'commensalism'], ['+,−', 'predation, parasitism'], ['−,−', 'competition']]]],
      ex: [['20 lotus, 8 new', 'birth rate 0.4'], ['N₀ 10, r 0.2, 10 y', '≈ 73.9']], rem: ['K limits.', 'Gause exclusion.', 'Signs of interactions.'] }
  });
})();
