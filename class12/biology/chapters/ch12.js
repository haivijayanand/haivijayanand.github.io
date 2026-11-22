/*
TOOL:    class12_biology_ch12
FAMILY:  CBSE_REVISION / Class 12 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 12 Ecosystem (structure and function, productivity, decomposition, energy flow, ecological pyramids) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 12, part: 'Unit X · Ecology', short: 'Ecosystem', title: 'Ecosystem',
    blurb: 'Ecosystem — structure and function (stratification, components); productivity — gross and net primary productivity, secondary productivity; decomposition — fragmentation, leaching, catabolism, humification, mineralisation, factors; energy flow — food chains (grazing and detritus), food webs, trophic levels, 10 per cent law; ecological pyramids of number, biomass and energy (and their limitations).',
    revise: {
      oneLine: 'Primary productivity: GPP − respiration losses = NPP, the biomass available to consumers; annual NPP of the biosphere ≈ 170 billion tonnes (dry weight), oceans only ~55 billion tonnes despite 70% area. Decomposition steps: fragmentation (detritivores like earthworm), leaching, catabolism (bacterial/fungal enzymes), humification (humus, resistant, colloidal) and mineralisation; it is faster in warm, moist, aerobic conditions and slower with lignin and chitin. Only ~2–10% of PAR is captured by plants (≈ 1–5% of incident sunlight). Energy flow is unidirectional; about 10% of energy passes to the next trophic level (Lindeman’s 10 per cent law). The pyramid of energy is always upright; the pyramid of biomass can be inverted in the sea (phytoplankton < zooplankton/fish); the pyramid of numbers is inverted for a tree with insects.',
      sections: [
        { h: 'Food chains', html: '<p>Grazing food chain (GFC) starts with producers; detritus food chain (DFC) starts with dead matter and in terrestrial ecosystems carries more energy than GFC.</p>' },
        { h: 'Standing crop', html: '<p>Mass of living material at a trophic level at a time, measured as biomass or number.</p>' },
        { h: 'Pyramid limits', html: '<p>Ignore species belonging to more than one trophic level; don’t include saprophytes; assume simple food chains.</p>' }
      ],
      formulas: [['NPP', 'GPP − R'], ['10% law', 'E(n+1) ≈ 0.1 E(n)'], ['Biosphere NPP', '≈ 170 × 10⁹ t/yr'], ['PAR captured', '2–10%']],
      terms: [['Detritivore', 'breaks down detritus into smaller pieces (earthworm)'], ['Humus', 'dark, amorphous, nutrient reservoir'], ['Trophic level', 'feeding position in a chain']],
      traps: ['Energy pyramid never inverts.', 'Decomposition is slow in cold, dry, anaerobic conditions.', 'Producers in water are mainly phytoplankton.'],
      bridge: '<p>Ch 13 looks at biodiversity and its conservation.</p>'
    },
    explore: [
      { title: 'Energy pyramid', intro: 'Set producer energy and transfer efficiency.',
        build(el, K) { let E = 10000, eff = 10; const row = K.row(el); K.slider(row, 'producer energy (J)', 1000, 100000, 1000, E, v => { E = v; b.redraw(); }); K.slider(row, 'transfer efficiency (%)', 5, 20, 1, eff, v => { eff = v; b.redraw(); }); const b = new K.Board(el, { xmin: -22, xmax: 22, ymin: -1, ymax: 17, axes: false, grid: 0, aspect: 0.45 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const lv = ['producers', 'primary consumers', 'secondary consumers', 'tertiary consumers'], cols = [C.blue, C.purple, C.orange, '#0f766e']; const vals = lv.map((_, i) => E * (eff / 100) ** i); vals.forEach((v, i) => { const w = Math.max(0.6, 18 * Math.log10(v + 1) / Math.log10(E + 1) * (1 - i * 0.18)); b.rect(-w, i * 4, 2 * w, 3.4, { fill: cols[i], color: 'none' }); if (w > 6) b.text(0, i * 4 + 1.7, `${lv[i]}: ${f(v)} J`, { font: '12px', color: '#fff' }); else b.text(w + 7, i * 4 + 1.7, `${lv[i]}: ${f(v)} J`, { font: '12px' }); });
            rd.innerHTML = `energy reaching top carnivores = ${E} × (${eff / 100})³ = <b>${f(vals[3])} J</b> (${f(vals[3] / E * 100)}% of producer energy) · that is why food chains are short (3–4 levels)`; };
          b.redraw(); return null; } },
      { title: 'Productivity calculator', intro: 'GPP and respiration.',
        build(el, K) { let G = 2000, Rr = 30; const row = K.row(el); K.slider(row, 'GPP (g/m²/yr)', 100, 5000, 50, G, v => { G = v; draw(); }); K.slider(row, 'respiration (% of GPP)', 10, 70, 1, Rr, v => { Rr = v; draw(); }); const rd = K.read(el); function draw() { const N = G * (1 - Rr / 100); rd.innerHTML = `NPP = GPP − R = ${G} − ${f(G * Rr / 100)} = <b>${f(N)} g/m²/yr</b> · available to herbivores and decomposers`; } draw(); return null; } }
    ],
    gens: [
      { title: '10% law', gen(R) { const E = R.pick([1000, 10000, 50000, 100000]), n = R.pick([1, 2, 3]); return { q: `Producers fix ${E} J. Energy at trophic level ${n + 1} (10% law)?`, a: `${f(E * 0.1 ** n)} J`, ans: E * 0.1 ** n, tol: 1e-6 }; } },
      { title: 'NPP', gen(R) { const G = R.pick([1000, 2500, 4000]), Rr = R.pick([200, 500, 1200]); return { q: `GPP = ${G} kcal/m²/yr, respiration = ${Rr}. NPP?`, a: `${G - Rr} kcal/m²/yr`, ans: G - Rr }; } },
      { title: 'Decomposition step', gen(R) { return G9.S9.groupQ(R, [['earthworm breaks detritus', 0], ['water-soluble nutrients go down', 1], ['enzymes degrade detritus', 2], ['dark amorphous humus forms', 3], ['humus releases inorganic nutrients', 4]], ['fragmentation', 'leaching', 'catabolism', 'humification', 'mineralisation'], ''); } },
      { title: 'Pyramid shape', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Pyramid of energy?', 'always upright'], ['Biomass pyramid in sea?', 'inverted (phytoplankton less than consumers)'], ['Numbers pyramid for a single tree with insects?', 'inverted'], ['Numbers pyramid in grassland?', 'upright']]); } },
      { title: 'Concepts', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why are food chains short?', '~90% energy lost at each level'], ['Which chain carries more energy on land?', 'detritus food chain'], ['Conditions for fast decomposition?', 'warm, moist, aerobic, nitrogen-rich detritus'], ['Annual NPP of biosphere?', 'about 170 billion tonnes dry weight']]); } }
    ],
    quiz: [
      { q: 'NPP =', o: ['GPP − R', 'GPP + R', 'R − GPP', 'GPP × R'], a: 0, e: 'Net.' }, { q: 'Always upright pyramid', o: ['energy', 'biomass', 'number', 'all'], a: 0, e: '10%.' },
      { q: '10% law by', o: ['Lindeman', 'Odum', 'Gause', 'Darwin'], a: 0, e: '1942.' }, { q: 'Fragmentation by', o: ['detritivores', 'bacteria only', 'producers', 'sun'], a: 0, e: 'Earthworm.' },
      { q: 'Biomass pyramid inverted in', o: ['sea', 'forest', 'grassland', 'desert'], a: 0, e: 'Phytoplankton.' }, { q: 'Decomposition slow if', o: ['cold and dry', 'warm and moist', 'aerobic', 'N-rich'], a: 0, e: 'Inhibited.' },
      { q: 'PAR captured by plants', o: ['2–10%', '50%', '90%', '100%'], a: 0, e: 'Small.' }, { q: 'Humus is', o: ['resistant, colloidal', 'fast decomposed', 'gas', 'mineral'], a: 0, e: 'Reservoir.' },
      { q: 'Energy flow is', o: ['unidirectional', 'cyclic', 'random', 'reversible'], a: 0, e: 'One way.' }, { q: 'Annual NPP of biosphere', o: ['~170 billion t', '~1 billion t', '~10 t', '~1000 billion t'], a: 0, e: 'Dry weight.' },
      { q: 'Standing crop is', o: ['living mass at a level', 'yield of crop', 'dead matter', 'energy'], a: 0, e: 'Definition.' }
    ],
    teach: {
      outcomes: ['Explain productivity and decomposition', 'Apply the 10 per cent law', 'Draw and interpret ecological pyramids'],
      periods: [{ t: 'Function', flow: [['10 min', 'Pond ecosystem.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Decomposition steps.']] }, { t: 'Energy', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Pyramid drawing.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Energy recycles.', 'All pyramids are upright.'], activities: ['Leaf litter bag decomposition.', 'Food web string game.'],
      exit: ['NPP.', '10% law.', 'Inverted pyramid example.'], homework: 'Construct a food web of your school garden.'
    },
    slides: [{ t: 'Ecosystem', b: ['Structure and productivity', 'Decomposition', 'Energy flow', 'Ecological pyramids'] }, { t: 'Think and share', b: ['Why do vegetarian diets feed more people?', 'Why is the sea biomass pyramid inverted?'] }],
    fs: { groups: [['Productivity', [['NPP', 'GPP − R'], ['Biosphere', '170 billion t/yr'], ['PAR', '2–10% used']]], ['Decomposition', [['Steps', 'fragment, leach, catabolise, humify, mineralise'], ['Fast', 'warm, moist, aerobic']]], ['Energy', [['10% law', 'Lindeman'], ['Chains', 'GFC, DFC'], ['Pyramids', 'energy always upright']]]],
      ex: [['10 000 J', 'tertiary 10 J'], ['GPP 2500, R 500', 'NPP 2000']], rem: ['One-way energy.', 'Sea biomass inverted.', 'Humus slow.'] }
  });
})();
