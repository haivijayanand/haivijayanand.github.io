/*
TOOL:    class10_science_ch08
FAMILY:  CBSE_REVISION / Class 10 Science (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 8 Heredity (accumulation of variation, Mendel’s experiments, dominant and recessive, monohybrid 3:1, dihybrid 9:3:3:1, genes and proteins, sex determination) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 8, part: 'All chapters', short: 'Heredity', title: 'Heredity',
    blurb: 'How variations accumulate; Mendel’s pea experiments; dominant and recessive traits; genotype and phenotype; monohybrid cross (3 : 1) and dihybrid cross (9 : 3 : 3 : 1) with independent inheritance; how genes control traits through proteins; and sex determination in humans.',
    revise: {
      oneLine: 'Each trait is controlled by a pair of genes (one from each parent). Mendel crossed tall (TT) and short (tt) peas: F₁ all tall (Tt); F₂ tall : short = 3 : 1 (genotypes TT : Tt : tt = 1 : 2 : 1). For two traits (round yellow × wrinkled green), F₂ shows 9 : 3 : 3 : 1 — traits are inherited independently. Genes code for proteins (e.g., enzymes for a growth hormone). In humans, mothers give X; fathers give X or Y — XX girl, XY boy, so the father’s gamete decides the sex.',
      sections: [
        { h: 'Terms', html: `<p>Dominant trait shows in hybrids (T); recessive shows only when pure (tt). Genotype = gene makeup; phenotype = visible trait.</p>` },
        { h: 'Why peas', html: `<p>Easy to grow, short life cycle, many contrasting traits, self- and cross-pollination possible.</p>` },
        { h: 'Sex determination', html: `<p>22 pairs of autosomes + 1 pair sex chromosomes. Chance of a boy or girl is 50 : 50 each time.</p>` }
      ],
      formulas: [['Monohybrid F₂', '3 : 1'], ['Genotype F₂', '1 TT : 2 Tt : 1 tt'], ['Dihybrid F₂', '9 : 3 : 3 : 1'], ['Human sex', 'XX girl, XY boy'], ['Gene → trait', 'via proteins']],
      terms: [['Gene', 'segment of DNA for a trait'], ['Allele', 'alternative form of a gene'], ['Hybrid', 'offspring with two different alleles']],
      traps: ['Recessive traits are not “weaker”; they are just masked.', 'The mother’s egg always has X.', 'Each birth is independent — 50 : 50.'],
      bridge: '<p>Class 12 Biology: principles of inheritance and molecular basis.</p>'
    },
    explore: [
      { title: 'Punnett square', intro: 'Choose parents’ genotypes (T tall, t short); see offspring.',
        build(el, K) { const G = ['TT', 'Tt', 'tt']; let a = 1, c = 1; const row = K.row(el); const s1 = K.select(row, 'parent 1', G, i => { a = i; draw(); }); s1.value = 1; const s2 = K.select(row, 'parent 2', G, i => { c = i; draw(); }); s2.value = 1; const rd = K.read(el);
          function draw() { const p = G[a].split(''), q = G[c].split(''); const cells = []; let tall = 0; const cnt = {}; p.forEach(x => q.forEach(y => { const g = [x, y].sort().join(''); cells.push(g); cnt[g] = (cnt[g] || 0) + 1; if (g.includes('T')) tall++; }));
            const td = s => `<td style="border:1px solid #94a3b8;padding:8px 14px;text-align:center;font-weight:700">${s}</td>`; rd.innerHTML = `<table style="border-collapse:collapse;margin-bottom:6px"><tr><td></td>${q.map(td).join('')}</tr>${p.map((x, i) => `<tr>${td(x)}${q.map((y, j) => td(cells[i * 2 + j])).join('')}</tr>`).join('')}</table>genotypes: ${Object.entries(cnt).map(([g, n]) => `${g} ${n}/4`).join(', ')} · phenotype: <b>tall ${tall} : short ${4 - tall}</b>`; } draw(); return null; } },
      { title: 'Boy or girl?', intro: '<kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Parents', 'Mother XX, father XY.'], ['Gametes', 'All eggs carry X; half the sperm carry X, half carry Y.'], ['X sperm + egg', 'XX → girl.'], ['Y sperm + egg', 'XY → boy.'], ['Chance', 'Each child: 50% girl, 50% boy. The father’s sperm decides — and no one is to blame.']] }); } }
    ],
    gens: [
      { title: 'Monohybrid', gen(R) { const n = R.pick([400, 800, 1000, 1200, 1600]); return { q: `Tt × Tt gives ${n} plants. Expected tall and short?`, a: `${3 * n / 4} tall, ${n / 4} short`, ans: 3 * n / 4 }; } },
      { title: 'Dihybrid', levels: [2, 3], gen(R) { const n = R.pick([160, 320, 480, 640, 1600]); return { q: `RrYy × RrYy gives ${n} seeds. Expected round yellow : round green : wrinkled yellow : wrinkled green?`, a: `${9 * n / 16} : ${3 * n / 16} : ${3 * n / 16} : ${n / 16}`, ans: 9 * n / 16 }; } },
      { title: 'Cross result', gen(R) { const C2 = [['TT × tt', 'all tall (Tt)'], ['Tt × tt', '1 tall : 1 short'], ['TT × Tt', 'all tall (1 TT : 1 Tt)'], ['tt × tt', 'all short'], ['Tt × Tt', '3 tall : 1 short']]; const c = R.pick(C2); return { q: `Offspring of ${c[0]}?`, a: c[1] }; } },
      { title: 'Sex determination', gen(R) { return G9.S9.pickQ(R, [['Sex chromosomes of a boy?', 'XY'], ['Which parent decides the sex of the child?', 'father (X or Y sperm)'], ['Chance of a girl in a family’s third child?', '50%'], ['How many autosome pairs in humans?', '22']]); } },
      { title: 'Concepts', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why did Mendel choose peas?', 'short life cycle, contrasting traits, easy pollination control'], ['What does F₂ 9 : 3 : 3 : 1 show?', 'traits are inherited independently'], ['How do genes control traits?', 'they code for proteins such as enzymes and hormones'], ['Genotype vs phenotype?', 'gene makeup vs visible trait']]); } }
    ],
    quiz: [
      { q: 'Tt × Tt phenotype ratio', o: ['3 : 1', '1 : 2 : 1', '1 : 1', '9 : 3 : 3 : 1'], a: 0, e: 'Monohybrid.' }, { q: 'Tt × Tt genotype ratio', o: ['1 : 2 : 1', '3 : 1', '1 : 1', 'all Tt'], a: 0, e: 'Genotype.' },
      { q: 'Dihybrid F₂', o: ['9 : 3 : 3 : 1', '3 : 1', '1 : 1 : 1 : 1', '1 : 2 : 1'], a: 0, e: 'Two traits.' }, { q: 'Boy', o: ['XY', 'XX', 'YY', 'X'], a: 0, e: 'Y from father.' },
      { q: 'TT × tt F₁', o: ['all Tt tall', 'all short', '3 : 1', '1 : 1'], a: 0, e: 'Dominant.' }, { q: 'Father of genetics', o: ['Mendel', 'Darwin', 'Watson', 'Hooke'], a: 0, e: 'Peas.' },
      { q: 'Recessive shows when', o: ['both alleles recessive', 'one recessive', 'never', 'always'], a: 0, e: 'tt.' }, { q: 'Egg always carries', o: ['X', 'Y', 'X or Y', 'none'], a: 0, e: 'XX mother.' },
      { q: 'Tt × tt tall fraction', o: ['1/2', '3/4', '1/4', 'all'], a: 0, e: 'Test cross.' }, { q: 'Genes are made of', o: ['DNA', 'protein only', 'fat', 'sugar only'], a: 0, e: 'DNA.' },
      { q: 'Visible trait', o: ['phenotype', 'genotype', 'allele', 'gamete'], a: 0, e: 'Appearance.' }
    ],
    teach: {
      outcomes: ['Explain Mendel’s results', 'Use Punnett squares', 'Explain sex determination'],
      periods: [{ t: 'Mendel', flow: [['10 min', 'Family trait survey (tongue roll, earlobes).'], ['15 min', 'Explore panel 1.'], ['15 min', 'Bead/coin crosses.']] }, { t: 'Dihybrid and sex', flow: [['15 min', 'Dihybrid 4×4 square.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Mother decides sex.', 'Recessive = rare/weak.'], activities: ['Coin-toss crosses.', '16-box dihybrid square.'],
      exit: ['3 : 1 explanation.', 'Dihybrid ratio.', 'XX/XY.'], homework: 'Draw the 4×4 Punnett square for RrYy × RrYy and count classes.'
    },
    slides: [{ t: 'Heredity', b: ['Variation', 'Mendel’s monohybrid cross', 'Dihybrid cross', 'Sex determination'] }, { t: 'Think and share', b: ['Why 3 : 1?', 'Who decides a baby’s sex?'] }],
    fs: { groups: [['Monohybrid', [['F₁', 'all Tt tall'], ['F₂ phenotype', '3 : 1'], ['F₂ genotype', '1 : 2 : 1']]], ['Dihybrid', [['F₂', '9 : 3 : 3 : 1'], ['Meaning', 'independent inheritance']]], ['Sex', [['Girl', 'XX'], ['Boy', 'XY'], ['Decided by', 'sperm (X or Y)']]]],
      ex: [['1000 plants Tt × Tt', '750 tall, 250 short'], ['1600 seeds dihybrid', '900 : 300 : 300 : 100']], rem: ['Draw the square.', 'Dominant masks recessive.', '50 : 50 each birth.'] }
  });
})();
