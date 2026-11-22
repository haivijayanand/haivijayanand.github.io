/*
TOOL:    class12_chemistry_ch05
FAMILY:  CBSE_REVISION / Class 12 Chemistry (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Unit 5 Coordination Compounds (Werner theory, ligands, coordination number, IUPAC nomenclature, isomerism, valence bond theory, crystal field theory, colour, bonding in carbonyls, importance) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 5, part: 'Part I', short: 'Coordination', title: 'Coordination Compounds',
    blurb: 'Werner’s theory (primary and secondary valences); definitions — coordination entity, central atom, ligands (uni-, bi-, polydentate, ambidentate, chelate), coordination number, coordination sphere, oxidation number; homoleptic and heteroleptic complexes; IUPAC nomenclature; isomerism — geometrical, optical, linkage, coordination, ionisation, solvate; valence bond theory (hybridisation, magnetism, inner/outer orbital); crystal field theory in octahedral and tetrahedral fields, spectrochemical series, colour; metal carbonyls; importance in analysis, metallurgy and biology.',
    revise: {
      oneLine: 'In [Co(NH₃)₆]Cl₃, Co³⁺ is the central ion, NH₃ the ligands, 6 the coordination number and Cl⁻ counter ions. Ligands: unidentate (NH₃, Cl⁻, H₂O), bidentate (en, C₂O₄²⁻), hexadentate (EDTA⁴⁻); ambidentate (NO₂⁻/ONO⁻, SCN⁻/NCS⁻). Naming: ligands alphabetically, then metal with oxidation state in Roman numerals; anionic complexes end in -ate. CFT: in octahedral fields d splits into t₂g (lower) and e_g (upper) by Δo; strong-field ligands (CN⁻, CO) give low spin, weak-field (I⁻, Cl⁻, F⁻) high spin. Spectrochemical series: I⁻ < Br⁻ < Cl⁻ < F⁻ < OH⁻ < C₂O₄²⁻ < H₂O < NH₃ < en < CN⁻ < CO. Δt ≈ (4/9)Δo; tetrahedral complexes are high spin.',
      sections: [
        { h: 'VBT examples', html: '<p>[Co(NH₃)₆]³⁺: d²sp³, inner orbital, diamagnetic. [CoF₆]³⁻: sp³d², outer orbital, paramagnetic (4 unpaired). [Ni(CN)₄]²⁻: dsp², square planar, diamagnetic. [NiCl₄]²⁻: sp³, tetrahedral, paramagnetic.</p>' },
        { h: 'Importance', html: '<p>Chlorophyll (Mg), haemoglobin (Fe), vitamin B₁₂ (Co); EDTA titration for water hardness; cisplatin in cancer therapy; gold and silver extraction with cyanide.</p>' },
        { h: 'Isomer counts', html: '<p>[MA₄B₂] octahedral: cis and trans. [M(AA)₃]: optical (d and l). Square planar [MA₂B₂]: cis/trans; tetrahedral shows no geometrical isomers.</p>' }
      ],
      formulas: [['Oxidation number', 'charge of complex − Σ ligand charges'], ['Octahedral CFSE', '(−0.4 n_t₂g + 0.6 n_eg)Δo'], ['Δt', '≈ (4/9)Δo'], ['μ', '√[n(n+2)] BM']],
      terms: [['Chelate', 'ring formed by a polydentate ligand'], ['Ambidentate', 'ligand binding through two different atoms'], ['Spectrochemical series', 'ligands ordered by field strength']],
      traps: ['Name cationic and neutral complexes with metal name, anionic with -ate (ferrate, cuprate).', 'Strong field ≠ more charge (CO is neutral but strongest).', 'Tetrahedral complexes are almost always high spin.'],
      bridge: '<p>Unit 6 begins organic chemistry with haloalkanes.</p>'
    },
    explore: [
      { title: 'Crystal field splitting', intro: 'Choose d electron count and field strength (octahedral).',
        build(el, K) { let d = 6, strong = 1; const row = K.row(el); K.slider(row, 'd electrons', 1, 10, 1, d, v => { d = v; b.redraw(); }); K.select(row, 'ligand field', ['weak (F⁻, H₂O) → high spin', 'strong (CN⁻, CO) → low spin'], i => { strong = i; b.redraw(); }).value = 1; const b = new K.Board(el, { xmin: 0, xmax: 20, ymin: 0, ymax: 8, axes: false, grid: 0, aspect: 0.4 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const t = [0, 0, 0], e = [0, 0];
            if (strong) { let n = d; for (let i = 0; i < 6 && n > 0; i++, n--) t[i % 3]++; for (let i = 0; i < 4 && n > 0; i++, n--) e[i % 2]++; } else { let n = d; const order = [['t', 0], ['t', 1], ['t', 2], ['e', 0], ['e', 1], ['t', 0], ['t', 1], ['t', 2], ['e', 0], ['e', 1]]; for (let i = 0; i < n; i++) { const [g, j] = order[i]; if (g === 't') t[j]++; else e[j]++; } }
            const draw = (x, y, n) => { b.line(x, y, x + 2.4, y, { color: C.ink, w: 2.5 }); if (n >= 1) b.arrow(x + 0.8, y - 0.1, x + 0.8, y + 1, { color: C.blue, w: 2 }); if (n >= 2) b.arrow(x + 1.6, y + 1, x + 1.6, y - 0.1, { color: C.orange, w: 2 }); };
            const gap = strong ? 4 : 2.2; t.forEach((n, i) => draw(4 + i * 3.4, 1.5, n)); e.forEach((n, i) => draw(5.7 + i * 3.4, 1.5 + gap, n)); b.text(15, 1.8, 't₂g', { font: '13px' }); b.text(13, 1.8 + gap, 'e_g', { font: '13px' }); b.line(2.5, 1.5, 2.5, 1.5 + gap, { color: C.purple, w: 1.5 }); b.text(1.4, 1.5 + gap / 2, 'Δo', { font: '13px' });
            const un = [...t, ...e].filter(x => x === 1).length, nt = t.reduce((a, c) => a + c), ne = e.reduce((a, c) => a + c); rd.innerHTML = `configuration t₂g<sup>${nt}</sup>e_g<sup>${ne}</sup> · unpaired = <b>${un}</b> · μ = <b>${f(Math.sqrt(un * (un + 2)))} BM</b> · CFSE = <b>${f(-0.4 * nt + 0.6 * ne)} Δo</b> (+ pairing energy)`; };
          b.redraw(); return null; } },
      { title: 'Ligand sorter', intro: 'Sort ligands by denticity.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['unidentate', 'bidentate', 'polydentate', 'ambidentate'], items: [['NH₃', 0], ['H₂O', 0], ['Cl⁻', 0], ['en (ethane-1,2-diamine)', 1], ['oxalate C₂O₄²⁻', 1], ['EDTA⁴⁻', 2], ['NO₂⁻', 3], ['SCN⁻', 3], ['CN⁻', 0]] }); } }
    ],
    gens: [
      { title: 'Oxidation state', gen(R) { const c = R.pick([['[Co(NH₃)₆]Cl₃', '+3'], ['K₄[Fe(CN)₆]', '+2'], ['K₃[Fe(CN)₆]', '+3'], ['[Ni(CO)₄]', '0'], ['[Cu(NH₃)₄]SO₄', '+2'], ['K₂[PtCl₆]', '+4'], ['[Cr(H₂O)₆]Cl₃', '+3']]); return { q: `Oxidation state of the metal in ${c[0]}?`, a: c[1] }; } },
      { title: 'Coordination number', gen(R) { const c = R.pick([['[Co(en)₃]³⁺', 6], ['[Ni(CO)₄]', 4], ['[Fe(C₂O₄)₃]³⁻', 6], ['[Ag(NH₃)₂]⁺', 2], ['[Cu(NH₃)₄]²⁺', 4], ['[Co(EDTA)]⁻', 6]]); return { q: `Coordination number in ${c[0]}?`, a: `${c[1]}`, ans: c[1] }; } },
      { title: 'IUPAC name', gen(R) { return G9.S9.pickQ(R, [['[Co(NH₃)₆]Cl₃', 'hexaamminecobalt(III) chloride'], ['K₄[Fe(CN)₆]', 'potassium hexacyanidoferrate(II)'], ['[Pt(NH₃)₂Cl₂]', 'diamminedichloridoplatinum(II)'], ['[Cu(NH₃)₄]SO₄', 'tetraamminecopper(II) sulfate'], ['K₃[Al(C₂O₄)₃]', 'potassium trioxalatoaluminate(III)']], 'Name: '); } },
      { title: 'Spin-only μ', levels: [2, 3], gen(R) { const c = R.pick([['[Fe(CN)₆]⁴⁻ (low spin d⁶)', 0], ['[FeF₆]³⁻ (high spin d⁵)', 5], ['[CoF₆]³⁻ (high spin d⁶)', 4], ['[Ni(CN)₄]²⁻ (square planar d⁸)', 0], ['[NiCl₄]²⁻ (tetrahedral d⁸)', 2]]); return { q: `Spin-only moment of ${c[0]}?`, a: `${f(Math.sqrt(c[1] * (c[1] + 2)))} BM (${c[1]} unpaired)`, ans: Math.sqrt(c[1] * (c[1] + 2)), tol: 0.01 }; } },
      { title: 'Isomerism', levels: [2, 3], gen(R) { return G9.S9.groupQ(R, [['[Co(NH₃)₅(NO₂)]²⁺ / [Co(NH₃)₅(ONO)]²⁺', 0], ['[Co(NH₃)₅Br]SO₄ / [Co(NH₃)₅SO₄]Br', 1], ['cis/trans-[Pt(NH₃)₂Cl₂]', 2], ['d/l-[Co(en)₃]³⁺', 3], ['[Cr(H₂O)₆]Cl₃ / [Cr(H₂O)₅Cl]Cl₂·H₂O', 4]], ['linkage', 'ionisation', 'geometrical', 'optical', 'solvate (hydrate)'], 'Isomerism: '); } }
    ],
    quiz: [
      { q: 'EDTA is', o: ['hexadentate', 'bidentate', 'unidentate', 'ambidentate'], a: 0, e: '6 donor atoms.' }, { q: 'Strongest field', o: ['CO', 'I⁻', 'Cl⁻', 'H₂O'], a: 0, e: 'Series end.' },
      { q: 'Octahedral lower set', o: ['t₂g', 'e_g', 'both equal', 'none'], a: 0, e: 'CFT.' }, { q: 'Ambidentate', o: ['SCN⁻', 'NH₃', 'en', 'H₂O'], a: 0, e: 'S or N.' },
      { q: '[Ni(CN)₄]²⁻ shape', o: ['square planar', 'tetrahedral', 'octahedral', 'linear'], a: 0, e: 'dsp².' }, { q: 'Fe in K₄[Fe(CN)₆]', o: ['+2', '+3', '0', '+4'], a: 0, e: '−4 + 6.' },
      { q: 'Chlorophyll metal', o: ['Mg', 'Fe', 'Co', 'Cu'], a: 0, e: 'Biology.' }, { q: 'Δt ≈', o: ['(4/9)Δo', 'Δo', '2Δo', '(9/4)Δo'], a: 0, e: 'Tetrahedral.' },
      { q: 'Cisplatin used for', o: ['cancer', 'hardness test', 'photography', 'fertiliser'], a: 0, e: 'Chemotherapy.' }, { q: 'Anionic complex name ends', o: ['-ate', '-ide', '-ite', '-ium'], a: 0, e: 'Ferrate.' },
      { q: '[Co(en)₃]³⁺ shows', o: ['optical isomerism', 'linkage', 'ionisation', 'none'], a: 0, e: 'Chiral.' }
    ],
    teach: {
      outcomes: ['Name complexes and find oxidation state/CN', 'Identify isomerism types', 'Apply VBT and CFT to magnetism and colour'],
      periods: [{ t: 'Basics and naming', flow: [['10 min', 'Cu²⁺ + NH₃ deep blue demo.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Naming drill.']] }, { t: 'Bonding', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'VBT hybridisation examples.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Counter ions are ligands.', 'More negative ligand → stronger field.'], activities: ['Ligand exchange colour changes.', 'Model building of cis/trans.'],
      exit: ['Name one complex.', 'Δo meaning.', 'Low vs high spin.'], homework: 'Predict hybridisation, shape and μ for four given complexes.'
    },
    slides: [{ t: 'Coordination Compounds', b: ['Werner theory and terms', 'Nomenclature', 'Isomerism', 'VBT and CFT'] }, { t: 'Think and share', b: ['Why is [Ti(H₂O)₆]³⁺ violet?', 'How does EDTA measure hardness?'] }],
    fs: { groups: [['Terms', [['Ligand', 'donor of lone pair'], ['CN', 'number of donor atoms'], ['Chelate', 'ring with polydentate']]], ['CFT', [['Octahedral', 't₂g below e_g by Δo'], ['Strong field', 'CN⁻, CO → low spin'], ['Δt', '(4/9)Δo']]], ['Isomerism', [['Structural', 'linkage, ionisation, coordination, solvate'], ['Stereo', 'geometrical, optical']]]],
      ex: [['[Fe(CN)₆]⁴⁻', 't₂g⁶, 0 unpaired'], ['[CoF₆]³⁻', '4 unpaired, 4.90 BM']], rem: ['Alphabetical ligands.', 'Spectrochemical series.', '-ate for anions.'] }
  });
})();
