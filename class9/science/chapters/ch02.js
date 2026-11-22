/*
TOOL:    class9_science_ch02
FAMILY:  CBSE_REVISION / Class 9 Science (Exploration)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 2 Cell: The Building Block of Life (cell theory, prokaryotic and eukaryotic, plant and animal cells, organelles and functions, membrane transport, osmosis, diffusion) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const ORG = [['cell membrane', 'controls what enters and leaves (selectively permeable)', 'both'], ['cell wall', 'rigid cellulose layer giving shape and support', 'plant'], ['nucleus', 'contains DNA (chromosomes); controls cell activities', 'both'], ['cytoplasm', 'jelly-like fluid where many reactions happen', 'both'], ['mitochondria', 'release energy by respiration (ATP) — “powerhouse”', 'both'], ['chloroplast', 'photosynthesis using chlorophyll', 'plant'], ['vacuole', 'stores water and substances; large central one in plants', 'both (large in plant)'], ['ribosomes', 'make proteins', 'both'], ['endoplasmic reticulum', 'transport network; rough ER has ribosomes', 'both'], ['Golgi apparatus', 'packages and dispatches materials', 'both'], ['lysosomes', 'digest waste and worn-out parts', 'mainly animal']];
  G9.register({
    no: 2, part: 'All chapters', short: 'Cell', title: 'Cell: The Building Block of Life',
    blurb: 'Discovery of cells and the cell theory; prokaryotic and eukaryotic cells; plant and animal cells; organelles and their jobs; the selectively permeable membrane; diffusion and osmosis (plasmolysis, turgor); and cell division in brief.',
    revise: {
      oneLine: 'All living things are made of cells, the basic unit of structure and function; new cells come from existing cells. Prokaryotes (bacteria) lack a true nucleus and membrane-bound organelles; eukaryotes have them. Plant cells have a cell wall, chloroplasts and a large vacuole. Substances move by diffusion (high to low concentration) and water by osmosis through the selectively permeable membrane.',
      sections: [
        { h: 'History', html: `<p>Robert Hooke (1665) saw cork cells; Leeuwenhoek saw living cells; Schleiden and Schwann proposed the cell theory; Virchow: cells arise from cells.</p>` },
        { h: 'Osmosis', html: `<p>In a hypotonic (dilute) solution a cell gains water (plant cells become turgid); in a hypertonic (concentrated) solution it loses water (plasmolysis). Raisins swell in water; salted vegetables shrink.</p>` },
        { h: 'Division', html: `<p>Mitosis makes two identical cells for growth and repair; meiosis makes gametes with half the chromosomes.</p>` }
      ],
      formulas: [['Cell theory', 'cells are units; cells from cells'], ['Diffusion', 'high → low concentration'], ['Osmosis', 'water through semi-permeable membrane'], ['Plant only', 'cell wall, chloroplast, large vacuole'], ['Energy', 'mitochondria']],
      terms: [['Prokaryote', 'no true nucleus'], ['Organelle', 'specialised structure inside a cell'], ['Plasmolysis', 'cell membrane shrinks away from wall on losing water']],
      traps: ['Cell wall is fully permeable; the membrane is selectively permeable.', 'Bacteria have ribosomes but no mitochondria.', 'Osmosis is only about water movement.'],
      bridge: '<p>Ch 3 builds tissues from cells; Class 11 Biology studies the cell in depth.</p>'
    },
    explore: [
      { title: 'Organelle guide', intro: 'Choose an organelle; see its job and where it is found. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'organelle', ORG.map(o => o[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { const o = ORG[k]; rd.innerHTML = `<b>${o[0]}</b>: ${o[1]} · found in: <b>${o[2]}</b> cells`; } const step = () => { k = (k + 1) % ORG.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Osmosis in a plant cell', intro: 'Choose the outside solution; see water movement and the cell’s state.',
        build(el, K) { let k = 1; const row = K.row(el); const s = K.select(row, 'outside solution', ['concentrated salt (hypertonic)', 'same as cell (isotonic)', 'pure water (hypotonic)'], i => { k = i; b.redraw(); }); s.value = 1; const b = new K.Board(el, { xmin: -4, xmax: 4, ymin: -2.2, ymax: 2.2, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.rect(-2.5, -1.8, 5, 3.6, { fill: '#fff', color: C.ink, w: 4 }); const sc = [0.55, 0.85, 0.98][k]; b.rect(-2.5 * sc, -1.8 * sc, 5 * sc, 3.6 * sc, { fill: 'rgba(124,58,237,.25)', color: C.purple, w: 2 }); b.circle(0.8 * sc, 0.4 * sc, 0.35, { fill: C.purple, color: C.ink }); if (k !== 1) { const out = k === 0; [-1, 1].forEach(sg => b.arrow(sg * (out ? 2 : 3.6), 0, sg * (out ? 3.6 : 2.6), 0, { color: C.blue, w: 3 })); }
            rd.innerHTML = ['water moves <b>out</b> by osmosis → <b>plasmolysed</b> (membrane pulls away from the wall)', 'no net water movement → cell stays normal', 'water moves <b>in</b> → <b>turgid</b>; the wall stops it from bursting'][k]; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Organelle job', gen(R) { const o = R.pick(ORG); return R.chance(.5) ? { q: `Function of the ${o[0]}?`, a: o[1] } : { q: `Which organelle: ${o[1]}?`, a: o[0] }; } },
      { title: 'Plant or animal', gen(R) { return G9.S9.groupQ(R, [['cell wall', 0], ['chloroplast', 0], ['centrioles', 1], ['large central vacuole', 0], ['small scattered vacuoles', 1]], ['plant cell', 'animal cell'], 'Typical of: '); } },
      { title: 'Osmosis', gen(R) { return G9.S9.pickQ(R, [['Raisins in water swell. Why?', 'water enters by osmosis (raisin is more concentrated)'], ['Cell placed in strong salt solution?', 'loses water — plasmolysis'], ['Why don’t plant cells burst in water?', 'the cell wall resists'], ['Define diffusion.', 'movement from high to low concentration']]); } },
      { title: 'Magnification', levels: [2, 3], gen(R) { const real = R.pick([10, 20, 25, 40, 50]), M = R.pick([100, 200, 400]); return { q: `A cell ${real} µm across is seen at ${M}×. Image size in mm?`, a: `${real * M / 1000} mm`, ans: real * M / 1000, tol: 1e-6 }; } },
      { title: 'Cell count', levels: [2, 3], gen(R) { const n = R.int(3, 8); return { q: `A cell divides by mitosis every hour. Starting with 1 cell, how many after ${n} hours?`, a: String(2 ** n), ans: 2 ** n }; } }
    ],
    quiz: [
      { q: 'Powerhouse of the cell', o: ['mitochondria', 'nucleus', 'ribosome', 'vacuole'], a: 0, e: 'Energy.' }, { q: 'Protein synthesis', o: ['ribosomes', 'lysosomes', 'Golgi', 'vacuole'], a: 0, e: 'Proteins.' },
      { q: 'Prokaryote', o: ['bacterium', 'amoeba', 'onion cell', 'human cell'], a: 0, e: 'No nucleus.' }, { q: 'Plant cells only', o: ['cell wall', 'membrane', 'nucleus', 'ribosomes'], a: 0, e: 'Cellulose.' },
      { q: 'Osmosis moves', o: ['water', 'salt', 'sugar', 'proteins'], a: 0, e: 'Water.' }, { q: 'Cork cells seen by', o: ['Robert Hooke', 'Darwin', 'Newton', 'Mendel'], a: 0, e: '1665.' },
      { q: 'In concentrated salt a cell', o: ['loses water', 'gains water', 'bursts', 'divides'], a: 0, e: 'Plasmolysis.' }, { q: 'Cell membrane is', o: ['selectively permeable', 'fully permeable', 'impermeable', 'rigid'], a: 0, e: 'Selective.' },
      { q: 'Suicide bags', o: ['lysosomes', 'chloroplasts', 'ribosomes', 'mitochondria'], a: 0, e: 'Digest.' }, { q: 'Mitosis gives', o: ['identical cells', 'gametes', 'half chromosomes', 'no cells'], a: 0, e: 'Growth.' },
      { q: 'Packaging organelle', o: ['Golgi apparatus', 'nucleus', 'ER', 'vacuole'], a: 0, e: 'Dispatch.' }
    ],
    teach: {
      outcomes: ['State cell theory', 'Name organelles and functions', 'Explain diffusion and osmosis'],
      periods: [{ t: 'Cells', flow: [['10 min', 'Onion peel slide.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Draw plant vs animal cell.']] }, { t: 'Osmosis', flow: [['15 min', 'Raisin / potato strip experiment.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Cell wall controls entry.', 'Bacteria have mitochondria.'], activities: ['Onion peel and cheek cells.', 'Potato osmosis.'],
      exit: ['Three organelles + jobs.', 'Plant vs animal.', 'Osmosis example.'], homework: 'Do the raisin experiment and explain the result.'
    },
    slides: [{ t: 'Cell: The Building Block of Life', b: ['Cell theory', 'Prokaryotes vs eukaryotes', 'Organelles', 'Diffusion and osmosis'] }, { t: 'Think and share', b: ['Why don’t plant cells burst?', 'Why do raisins swell?'] }],
    fs: { groups: [['Theory', [['Unit', 'cell'], ['Origin', 'cells from cells']]], ['Organelles', [['Mitochondria', 'energy'], ['Ribosomes', 'proteins'], ['Chloroplast', 'photosynthesis'], ['Nucleus', 'DNA, control']]], ['Transport', [['Diffusion', 'high → low'], ['Osmosis', 'water across membrane'], ['Plasmolysis', 'water loss']]]],
      ex: [['20 µm at 400×', '8 mm'], ['6 h doubling', '64 cells']], rem: ['Wall ≠ membrane.', 'Plants: wall, chloroplast, big vacuole.', 'Osmosis = water.'] }
  });
})();
