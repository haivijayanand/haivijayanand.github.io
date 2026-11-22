/*
TOOL:    class12_biology_ch06
FAMILY:  CBSE_REVISION / Class 12 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 6 Evolution (origin of life, evidences, adaptive radiation, Darwin’s theory, mechanism, Hardy–Weinberg principle, brief account of evolution, human evolution) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 6, part: 'Unit VII · Genetics and evolution', short: 'Evolution', title: 'Evolution',
    blurb: 'Origin of life (big bang, chemical evolution, Miller’s experiment); evolution of life forms — theories; evidences (palaeontology, comparative anatomy — homologous and analogous organs, biochemical similarities, industrial melanism); adaptive radiation (Darwin’s finches, Australian marsupials, convergent evolution); biological evolution — Darwin’s natural selection; mechanism — mutation (de Vries), variation; Hardy–Weinberg principle and factors affecting it (gene flow, genetic drift, mutation, recombination, natural selection — stabilising, directional, disruptive); a brief account of evolution through geological time; origin and evolution of man.',
    revise: {
      oneLine: 'Miller (1953) made amino acids from CH₄, NH₃, H₂ and water vapour with electric sparks — supporting chemical evolution. Homologous organs (forelimbs of whale, bat, cheetah, human) show divergent evolution; analogous organs (wings of butterfly and bird, eye of octopus and mammal) show convergent evolution. Industrial melanism in peppered moths shows natural selection. Darwin: overproduction, variation, struggle, survival of the fittest (natural selection), branching descent. Hugo de Vries proposed mutation (saltation) from Oenothera. Hardy–Weinberg: p² + 2pq + q² = 1 when there is no mutation, migration, drift, selection or non-random mating. Human line: Dryopithecus/Ramapithecus → Australopithecus → Homo habilis (~2 mya) → Homo erectus (~1.5 mya, ~900 cc) → Neanderthals → Homo sapiens (Africa, ~75 000–10 000 years ago spread).',
      sections: [
        { h: 'Selection types', html: '<p>Stabilising (average favoured), directional (one extreme favoured), disruptive (both extremes favoured).</p>' },
        { h: 'Adaptive radiation', html: '<p>Darwin’s finches (Galápagos) — beak shapes for diets; Australian marsupials radiating into many niches; placental mammals show convergent forms (e.g., marsupial wolf vs placental wolf).</p>' },
        { h: 'Anthropogenic evolution', html: '<p>Herbicide/pesticide resistance and antibiotic-resistant microbes evolve in short times.</p>' }
      ],
      formulas: [['Hardy–Weinberg', 'p² + 2pq + q² = 1'], ['Allele sum', 'p + q = 1'], ['Carrier freq.', '2pq']],
      terms: [['Homologous', 'same origin, different function'], ['Analogous', 'different origin, same function'], ['Genetic drift', 'chance change in allele frequency (founder effect)']],
      traps: ['Analogous ≠ evidence of common ancestry.', 'Hardy–Weinberg is an ideal; deviation shows evolution.', 'Lamarck’s use/disuse is not accepted.'],
      bridge: '<p>Ch 7 begins Unit VIII — biology and human welfare.</p>'
    },
    explore: [
      { title: 'Hardy–Weinberg', intro: 'Set recessive allele frequency q.',
        build(el, K) { let q = 0.3; const row = K.row(el); K.slider(row, 'q', 0, 1, 0.01, q, v => { q = v; b.redraw(); }); const b = new K.Board(el, { xmin: -5, xmax: 105, ymin: -5, ymax: 90, axes: false, grid: 0, aspect: 0.45 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const p = 1 - q, v = [p * p, 2 * p * q, q * q], cols = [C.blue, C.purple, C.orange], lab = ['AA', 'Aa', 'aa']; v.forEach((x, i) => { b.rect(10 + i * 32, 0, 20, x * 80, { fill: cols[i], color: 'none' }); b.text(20 + i * 32, x * 80 + 4, `${lab[i]} ${f(x)}`, { font: '12px' }); }); b.line(0, 0, 100, 0, { color: C.ink, w: 1 });
            rd.innerHTML = `p = ${f(p)}, q = ${f(q)} · AA = p² = <b>${f(p * p)}</b> · Aa = 2pq = <b>${f(2 * p * q)}</b> · aa = q² = <b>${f(q * q)}</b> · sum = 1 (if no evolutionary forces act)`; };
          b.redraw(); return null; } },
      { title: 'Homologous or analogous?', intro: 'Sort the pairs.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['homologous (divergent)', 'analogous (convergent)'], items: [['whale flipper & bat wing', 0], ['human arm & cheetah foreleg', 0], ['Bougainvillea thorn & Cucurbita tendril', 0], ['butterfly wing & bird wing', 1], ['octopus eye & mammal eye', 1], ['sweet potato & potato', 1], ['penguin & dolphin flippers', 1], ['vertebrate hearts', 0]] }); } }
    ],
    gens: [
      { title: 'Hardy–Weinberg', gen(R) { const q2 = R.pick([0.01, 0.04, 0.09, 0.16, 0.25]); const q = Math.sqrt(q2), p = 1 - q; return { q: `Frequency of recessive phenotype aa is ${q2}. Frequency of carriers (Aa)?`, a: f(2 * p * q), ans: 2 * p * q, tol: 1e-4 }; } },
      { title: 'Organ type', gen(R) { return G9.S9.groupQ(R, [['forelimbs of whale, bat, human', 0], ['wings of butterfly and bird', 1], ['thorn of Bougainvillea, tendril of Cucurbita', 0], ['eye of octopus and mammal', 1]], ['homologous', 'analogous'], ''); } },
      { title: 'Selection type', gen(R) { return G9.S9.groupQ(R, [['average birth weight favoured', 0], ['peppered moths darkening', 1], ['both small and large beaks favoured', 2], ['antibiotic resistance spreading', 1]], ['stabilising', 'directional', 'disruptive'], ''); } },
      { title: 'Human evolution', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['First human-like being, ~2 mya, ~650–800 cc', 'Homo habilis'], ['~1.5 mya, ~900 cc brain', 'Homo erectus'], ['~1400 cc, buried dead, 100 000–40 000 years ago', 'Neanderthal man'], ['Hominid ape-like, ~15 mya', 'Ramapithecus / Dryopithecus']]); } },
      { title: 'Concepts', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Gases used in Miller’s experiment?', 'CH₄, NH₃, H₂ and water vapour'], ['Example of adaptive radiation?', 'Darwin’s finches; Australian marsupials'], ['Founder effect is a type of?', 'genetic drift'], ['Who proposed mutation theory?', 'Hugo de Vries (Oenothera)']]); } }
    ],
    quiz: [
      { q: 'Miller made', o: ['amino acids', 'DNA', 'cells', 'proteins'], a: 0, e: 'Sparks.' }, { q: 'Bat wing & whale flipper', o: ['homologous', 'analogous', 'vestigial', 'convergent'], a: 0, e: 'Same origin.' },
      { q: 'Industrial melanism shows', o: ['natural selection', 'mutation only', 'Lamarckism', 'drift'], a: 0, e: 'Peppered moth.' }, { q: 'p² + 2pq + q² =', o: ['1', '0', '2', 'p'], a: 0, e: 'HW.' },
      { q: 'Darwin’s finches show', o: ['adaptive radiation', 'convergence', 'mutation', 'drift'], a: 0, e: 'Galápagos.' }, { q: 'Mutation theory', o: ['de Vries', 'Darwin', 'Lamarck', 'Mendel'], a: 0, e: 'Oenothera.' },
      { q: 'Disruptive selection favours', o: ['both extremes', 'mean', 'one extreme', 'none'], a: 0, e: 'Splits.' }, { q: 'Homo erectus brain', o: ['~900 cc', '~1400 cc', '~400 cc', '~2000 cc'], a: 0, e: 'Larger than habilis.' },
      { q: 'Analogous organs show', o: ['convergent evolution', 'divergent', 'no evolution', 'common ancestor'], a: 0, e: 'Similar function.' }, { q: 'Founder effect is', o: ['genetic drift', 'gene flow', 'selection', 'mutation'], a: 0, e: 'Chance.' },
      { q: 'Carrier frequency', o: ['2pq', 'p²', 'q²', 'p + q'], a: 0, e: 'Heterozygotes.' }
    ],
    teach: {
      outcomes: ['Explain origin of life and evidences of evolution', 'Apply Hardy–Weinberg', 'Outline human evolution'],
      periods: [{ t: 'Origins and evidence', flow: [['10 min', 'Miller apparatus diagram.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Natural selection simulation (bead hunt).']] }, { t: 'Mechanisms', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Human evolution timeline.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Individuals evolve.', 'Humans evolved from chimpanzees.'], activities: ['Peppered moth paper hunt.', 'Timeline rope.'],
      exit: ['Homologous vs analogous.', 'HW equation.', 'One human ancestor.'], homework: 'Solve three Hardy–Weinberg problems.'
    },
    slides: [{ t: 'Evolution', b: ['Origin of life', 'Evidences', 'Darwin and mechanisms', 'Hardy–Weinberg and human evolution'] }, { t: 'Think and share', b: ['Why do antibiotics stop working?', 'Is evolution still happening?'] }],
    fs: { groups: [['Evidence', [['Homologous', 'divergent'], ['Analogous', 'convergent'], ['Melanism', 'selection in action']]], ['Mechanism', [['Darwin', 'variation + selection'], ['de Vries', 'mutation'], ['Selection', 'stabilising, directional, disruptive']]], ['HW', [['Equation', 'p² + 2pq + q² = 1'], ['Disturbers', 'mutation, migration, drift, selection, recombination']]]],
      ex: [['aa 0.09', 'q 0.3, Aa 0.42'], ['finches', 'adaptive radiation']], rem: ['Populations evolve.', 'HW = no evolution.', 'Analogous ≠ ancestry.'] }
  });
})();
