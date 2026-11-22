/*
TOOL:    class11_biology_ch10
FAMILY:  CBSE_REVISION / Class 11 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 10 Cell Cycle and Cell Division (phases of cell cycle, interphase G1 S G2, G0, mitosis stages, cytokinesis, significance; meiosis I and II, prophase I substages, crossing over, significance) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 10, part: 'Unit III · Cell', short: 'Cell division', title: 'Cell Cycle and Cell Division',
    blurb: 'The cell cycle — interphase (G₁, S, G₂) and M phase; quiescent G₀; mitosis — prophase, metaphase, anaphase, telophase — and cytokinesis (furrow vs cell plate); significance of mitosis; meiosis I (prophase I: leptotene, zygotene, pachytene, diplotene, diakinesis) and meiosis II; crossing over and chiasmata; significance of meiosis.',
    revise: {
      oneLine: 'A typical human cell cycle lasts ~24 h, with M phase ~1 h. DNA doubles in S phase (2C → 4C) but chromosome number stays the same. Mitosis gives two identical diploid cells (growth, repair). Meiosis gives four haploid cells; homologues pair (synapsis) in zygotene, crossing over at pachytene (recombinase), chiasmata visible at diplotene, terminalisation in diakinesis. Meiosis I is reductional; meiosis II is equational (like mitosis).',
      sections: [
        { h: 'Mitosis', html: '<p>Prophase: chromatin condenses. Metaphase: chromosomes at equator, spindle attached to kinetochores (best stage to count). Anaphase: centromeres split; chromatids pulled to poles. Telophase: nuclear envelopes re-form.</p>' },
        { h: 'Cytokinesis', html: '<p>Animal cells: cleavage furrow. Plant cells: cell plate grows from centre outward (middle lamella).</p>' },
        { h: 'Significance of meiosis', html: '<p>Keeps chromosome number constant across generations; creates variation by crossing over and independent assortment.</p>' }
      ],
      formulas: [['Interphase', 'G₁ → S → G₂'], ['S phase', 'DNA 2C → 4C'], ['Mitosis', '2n → 2n + 2n'], ['Meiosis', '2n → 4 × n'], ['Crossing over', 'pachytene']],
      terms: [['Synapsis', 'pairing of homologous chromosomes'], ['Bivalent (tetrad)', 'pair of homologues with four chromatids'], ['Chiasma', 'point where crossing over occurred']],
      traps: ['DNA doubles but chromosome number does not in S phase.', 'Centromeres split in anaphase (mitosis) and anaphase II (meiosis), not anaphase I.', 'G₀ cells are alive and active, just not dividing.'],
      bridge: '<p>Class 12: inheritance and reproduction rely on meiosis.</p>'
    },
    explore: [
      { title: 'Mitosis stages', intro: '<kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { const ch = (b, x, y, c) => { b.line(x - 0.12, y - 0.35, x - 0.12, y + 0.35, { color: c, w: 5 }); b.line(x + 0.12, y - 0.35, x + 0.12, y + 0.35, { color: c, w: 5 }); b.dot(x, y, { r: 4, color: C.ink }); }; const cell = (b, x0) => b.circle(x0, 0, 2, { color: C.ink, w: 2 });
          const st = [['Interphase', 'Chromatin dispersed; DNA replicated in S phase.', b => { cell(b, 0); b.circle(0, 0, 0.9, { fill: 'rgba(124,58,237,.2)', color: C.purple, w: 1 }); }], ['Prophase', 'Chromosomes condense; each has two sister chromatids; nuclear envelope begins to break.', b => { cell(b, 0); ch(b, -0.6, 0.4, C.blue); ch(b, 0.6, -0.3, C.orange); }], ['Metaphase', 'Chromosomes line up at the equator; spindle fibres attach to kinetochores.', b => { cell(b, 0); ch(b, 0, 0.6, C.blue); ch(b, 0, -0.6, C.orange); b.line(-1.8, 0, 1.8, 0, { color: C.grey, w: 1, dash: [3, 3] }); }], ['Anaphase', 'Centromeres split; sister chromatids move to opposite poles.', b => { cell(b, 0); [[-1.1, 0.5, C.blue], [-1.1, -0.5, C.orange], [1.1, 0.5, C.blue], [1.1, -0.5, C.orange]].forEach(p => b.line(p[0], p[1] - 0.3, p[0], p[1] + 0.3, { color: p[2], w: 5 })); }], ['Telophase & cytokinesis', 'Nuclear envelopes re-form; cytoplasm divides → two identical cells.', b => { b.circle(-1.2, 0, 1.1, { color: C.ink, w: 2 }); b.circle(1.2, 0, 1.1, { color: C.ink, w: 2 }); b.circle(-1.2, 0, 0.5, { fill: 'rgba(124,58,237,.2)', color: C.purple }); b.circle(1.2, 0, 0.5, { fill: 'rgba(124,58,237,.2)', color: C.purple }); }]];
          return G9.S9.stages(el, K, { board: { xmin: -3, xmax: 3, ymin: -2.3, ymax: 2.3, axes: false, grid: 0, aspect: 0.6 }, stages: st }); } },
      { title: 'Mitosis or meiosis?', intro: 'Sort the features.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Mitosis', 'Meiosis'], items: [['two daughter cells', 0], ['four daughter cells', 1], ['crossing over', 1], ['identical to parent', 0], ['chromosome number halved', 1], ['growth and repair', 0], ['forms gametes', 1], ['synapsis of homologues', 1]] }); } }
    ],
    gens: [
      { title: 'DNA content', gen(R) { const n = R.pick([8, 14, 24, 46]); return R.chance(.5) ? { q: `A cell has ${n} chromosomes in G₁. Chromosome number after S phase?`, a: `${n} (DNA doubles, chromosome number same)`, ans: n } : { q: `A diploid cell has ${n} chromosomes. Number in each cell after meiosis?`, a: String(n / 2), ans: n / 2 }; } },
      { title: 'Prophase I', gen(R) { return G9.S9.groupQ(R, [['chromosomes become visible', 0], ['synapsis begins', 1], ['crossing over', 2], ['chiasmata visible, homologues separate', 3], ['terminalisation of chiasmata', 4]], ['leptotene', 'zygotene', 'pachytene', 'diplotene', 'diakinesis'], 'Substage: '); } },
      { title: 'Mitosis stage', gen(R) { return G9.S9.groupQ(R, [['chromosomes at equator', 1], ['centromeres split', 2], ['chromatin condenses', 0], ['nuclear envelope re-forms', 3]], ['prophase', 'metaphase', 'anaphase', 'telophase'], 'Stage: '); } },
      { title: 'Cells count', levels: [2, 3], gen(R) { const c = R.int(2, 10); return R.chance(.5) ? { q: `${c} cells undergo meiosis. How many cells are formed?`, a: String(4 * c), ans: 4 * c } : { q: `One cell divides by mitosis ${c} times in succession. Cells formed?`, a: String(2 ** c), ans: 2 ** c }; } },
      { title: 'Significance', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Significance of mitosis?', 'growth, repair, keeps genetic identity'], ['Significance of meiosis?', 'halves chromosomes for gametes; variation'], ['What is G₀?', 'quiescent stage — metabolically active, not dividing'], ['Cytokinesis in plant cells?', 'cell plate formation']]); } }
    ],
    quiz: [
      { q: 'DNA replicates in', o: ['S phase', 'G₁', 'G₂', 'M'], a: 0, e: 'Synthesis.' }, { q: 'Crossing over in', o: ['pachytene', 'leptotene', 'zygotene', 'diakinesis'], a: 0, e: 'Recombination.' },
      { q: 'Best stage to count chromosomes', o: ['metaphase', 'prophase', 'anaphase', 'telophase'], a: 0, e: 'Aligned.' }, { q: 'Meiosis gives', o: ['four haploid cells', 'two diploid', 'two haploid', 'four diploid'], a: 0, e: 'Gametes.' },
      { q: 'Synapsis in', o: ['zygotene', 'pachytene', 'diplotene', 'leptotene'], a: 0, e: 'Pairing.' }, { q: 'Plant cytokinesis', o: ['cell plate', 'furrow', 'budding', 'none'], a: 0, e: 'Wall.' },
      { q: 'Reductional division', o: ['meiosis I', 'meiosis II', 'mitosis', 'amitosis'], a: 0, e: 'Homologues separate.' }, { q: 'Chiasmata visible in', o: ['diplotene', 'leptotene', 'metaphase II', 'G₁'], a: 0, e: 'Separation.' },
      { q: 'Centromere splits in', o: ['anaphase (mitosis)', 'metaphase', 'prophase', 'interphase'], a: 0, e: 'Chromatids.' }, { q: 'Quiescent stage', o: ['G₀', 'G₁', 'S', 'G₂'], a: 0, e: 'Exit.' },
      { q: 'Human cell cycle ~', o: ['24 h', '90 min', '1 week', '1 h'], a: 0, e: 'Typical.' }
    ],
    teach: {
      outcomes: ['Describe the cell cycle', 'Sequence mitosis and meiosis', 'Explain significance of each'],
      periods: [{ t: 'Mitosis', flow: [['10 min', 'Onion root tip slide.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Stage identification.']] }, { t: 'Meiosis', flow: [['15 min', 'Pipe-cleaner chromosomes.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['S phase doubles chromosome number.', 'Meiosis II halves chromosomes.'], activities: ['Root tip squash.', 'Chromosome bead model.'],
      exit: ['Interphase phases.', 'Prophase I substages.', 'Mitosis vs meiosis.'], homework: 'Draw all stages of meiosis for a cell with 2n = 4.'
    },
    slides: [{ t: 'Cell Cycle and Cell Division', b: ['Interphase and G₀', 'Mitosis', 'Meiosis I and II', 'Significance'] }, { t: 'Think and share', b: ['Why is meiosis I reductional?', 'What happens in pachytene?'] }],
    fs: { groups: [['Cycle', [['Interphase', 'G₁, S, G₂'], ['S', 'DNA 2C → 4C'], ['G₀', 'quiescent']]], ['Mitosis', [['Stages', 'P M A T'], ['Result', '2 identical 2n'], ['Cytokinesis', 'furrow / cell plate']]], ['Meiosis', [['Prophase I', 'L Z P D D'], ['Crossing over', 'pachytene'], ['Result', '4 × n, variation']]]],
      ex: [['2n = 46 after meiosis', '23'], ['3 mitoses', '8 cells']], rem: ['DNA ≠ chromosome count.', 'Meiosis I reduces.', 'Pachytene = crossing over.'] }
  });
})();
