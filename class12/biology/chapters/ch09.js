/*
TOOL:    class12_biology_ch09
FAMILY:  CBSE_REVISION / Class 12 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 9 Biotechnology: Principles and Processes (principles, restriction enzymes, cloning vectors, competent hosts, gel electrophoresis, PCR, recombinant DNA steps, bioreactors, downstream processing) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 9, part: 'Unit IX · Biotechnology', short: 'Biotech principles', title: 'Biotechnology: Principles and Processes',
    blurb: 'Principles of biotechnology — genetic engineering and bioprocess engineering; the first recombinant DNA (Cohen and Boyer, 1972); tools — restriction enzymes (EcoRI, palindromes, sticky ends), cloning vectors (ori, selectable markers, cloning sites; pBR322, insertional inactivation, blue–white selection, Ti plasmid, retroviruses), competent hosts (CaCl₂ and heat shock, microinjection, biolistics); processes — isolation of DNA, cutting, gel electrophoresis, PCR, insertion into host, obtaining the foreign gene product (bioreactors), downstream processing.',
    revise: {
      oneLine: 'Restriction endonucleases cut DNA at specific palindromic sites (EcoRI: 5′-GAATTC-3′, cutting between G and A to leave sticky ends); naming: E (genus Escherichia), co (species coli), R (strain RY13), I (order found). Ligase joins sticky ends. Vectors need ori (copy number), a selectable marker (ampicillin/tetracycline resistance) and unique cloning sites; inserting DNA into tetR of pBR322 (BamHI) makes recombinants tetracycline-sensitive (insertional inactivation); in blue–white screening, insert in lacZ gives white colonies. DNA fragments separate on agarose gel by size (smaller move faster towards the anode, stained with ethidium bromide under UV, elution). PCR: denaturation (~94 °C), annealing of primers (~50–60 °C), extension by Taq polymerase (~72 °C); n cycles give ~2ⁿ copies. Stirred-tank bioreactors keep optimal temperature, pH, oxygen and mixing; downstream processing = separation, purification, quality control.',
      sections: [
        { h: 'Getting DNA in', html: '<p>Bacteria: CaCl₂ then heat shock (42 °C) then ice. Animal cells: microinjection. Plants: biolistics (gene gun) with gold/tungsten particles; disarmed Agrobacterium Ti plasmid.</p>' },
        { h: 'Isolating DNA', html: '<p>Lysozyme (bacteria), cellulase (plant), chitinase (fungi) break cells; RNase and protease remove RNA and protein; chilled ethanol precipitates DNA threads.</p>' },
        { h: 'Why bioreactors', html: '<p>Large volumes (100–1000 L) for commercial yields; continuous culture keeps cells in log phase.</p>' }
      ],
      formulas: [['PCR copies', '2ⁿ after n cycles'], ['EcoRI site', 'GAATTC'], ['Steps', 'denature → anneal → extend'], ['Taq', 'thermostable polymerase (Thermus aquaticus)']],
      terms: [['Palindrome', 'same sequence reading 5′→3′ on both strands'], ['Insertional inactivation', 'insert disrupts a marker gene'], ['Elution', 'recovering DNA band from gel']],
      traps: ['DNA moves to the anode (it is negatively charged).', 'Exonucleases remove ends; endonucleases cut within.', 'Recombinants in pBR322 BamHI site lose tetracycline resistance, keep ampicillin resistance.'],
      bridge: '<p>Ch 10 applies these tools to agriculture and medicine.</p>'
    },
    explore: [
      { title: 'PCR amplifier', intro: 'Choose starting copies and number of cycles.',
        build(el, K) { let N0 = 1, n = 20; const row = K.row(el); K.slider(row, 'start copies', 1, 100, 1, N0, v => { N0 = v; draw(); }); K.slider(row, 'cycles', 1, 40, 1, n, v => { n = v; draw(); }); const rd = K.read(el); function draw() { const N = N0 * 2 ** n; rd.innerHTML = `${N0} × 2<sup>${n}</sup> = <b>${N.toExponential(3)} copies</b> · each cycle: 94 °C denature → ~55 °C primers anneal → 72 °C Taq extends · time ≈ ${f(n * 3)} min (≈3 min/cycle)`; } draw(); return null; } },
      { title: 'Gel electrophoresis', intro: 'Load fragment sizes; see where they run. <kbd>P</kbd> play.',
        build(el, K) { const sets = [[5000, 3000, 2000, 1000, 500], [4000, 1500, 800], [6000, 2500, 300]]; let k = 0; const row = K.row(el); K.select(row, 'sample', ['ladder 5000–500 bp', 'digest A (4000, 1500, 800)', 'digest B (6000, 2500, 300)'], i => { k = i; b.redraw(); }); const b = new K.Board(el, { xmin: 0, xmax: 20, ymin: 0, ymax: 10, axes: false, grid: 0, aspect: 0.45 }); const rd = K.read(el); const an = new K.Anim(60, () => b.redraw(), { ms: 60 });
          b.onDraw = () => { b.clear(); b.rect(1, 0.5, 18, 9, { fill: '#e0e7ff', color: C.ink, w: 1.5 }); b.text(0.6, 9.2, '−', { font: '16px' }); b.text(0.6, 0.8, '+', { font: '16px' }); const t = an.i / 60;
            [0, 1, 2].forEach(j => { b.rect(3 + j * 5, 8.6, 3, 0.3, { fill: '#334155', color: 'none' }); sets[j].forEach(s => { const d = t * 7 * (3.9 - Math.log10(s)) / 1.42; const y = Math.max(1, 8.4 - d); b.rect(3 + j * 5, y, 3, 0.25, { fill: j === k ? C.orange : C.purple, color: 'none' }); }); });
            rd.innerHTML = `DNA (negative) moves towards the anode (+); smaller fragments move farther · lane ${k + 1} highlighted · bands seen with ethidium bromide under UV, then cut out and eluted`; };
          K.anim(el, an); b.redraw(); return an; } }
    ],
    gens: [
      { title: 'PCR', gen(R) { const n = R.pick([5, 10, 20, 30]), N0 = R.pick([1, 2, 10]); return { q: `${N0} DNA molecule${N0 > 1 ? 's' : ''}, ${n} PCR cycles. Copies (ideal)?`, a: `${(N0 * 2 ** n).toExponential(3)}`, ans: N0 * 2 ** n, tol: 1 }; } },
      { title: 'Palindrome', gen(R) { const s = R.pick([['GAATTC', true], ['GGATCC', true], ['AAGCTT', true], ['GATTAC', false], ['CTGCAG', true], ['ATGCAT', true], ['GGTACC', true], ['ACGTAC', false]]); const rc = s[0].split('').reverse().map(x => ({ A: 'T', T: 'A', G: 'C', C: 'G' })[x]).join(''); return { q: `Is 5′-${s[0]}-3′ a palindrome? (complement read 5′→3′)`, a: `${s[1] ? 'yes' : 'no'} (other strand 5′-${rc}-3′)` }; } },
      { title: 'Tool', gen(R) { return G9.S9.pickQ(R, [['molecular scissors', 'restriction endonuclease'], ['molecular glue', 'DNA ligase'], ['thermostable polymerase for PCR', 'Taq polymerase'], ['stain for DNA in gel', 'ethidium bromide'], ['enzyme to break plant cell wall', 'cellulase'], ['gene gun method', 'biolistics']], 'Name the tool: '); } },
      { title: 'Selection', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Insert in BamHI site (tetR) of pBR322 — recombinant phenotype?', 'ampicillin resistant, tetracycline sensitive'], ['Insert in lacZ — colony colour with X-gal?', 'white (recombinant)'], ['No insert in lacZ — colony colour?', 'blue (non-recombinant)'], ['Why must hosts be made competent?', 'DNA is hydrophilic and cannot pass membranes easily']]); } },
      { title: 'Naming', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['E in EcoRI?', 'genus Escherichia'], ['co in EcoRI?', 'species coli'], ['R in EcoRI?', 'strain RY13'], ['I in EcoRI?', 'first enzyme isolated from that strain']]); } }
    ],
    quiz: [
      { q: 'EcoRI site', o: ['GAATTC', 'GGATCC', 'AAGCTT', 'GATC'], a: 0, e: 'Palindrome.' }, { q: 'DNA moves to', o: ['anode', 'cathode', 'stays', 'both'], a: 0, e: 'Negative.' },
      { q: 'Taq from', o: ['Thermus aquaticus', 'E. coli', 'Agrobacterium', 'yeast'], a: 0, e: 'Hot springs.' }, { q: 'Ligase', o: ['joins DNA', 'cuts DNA', 'copies RNA', 'unzips'], a: 0, e: 'Glue.' },
      { q: 'PCR copies after n cycles', o: ['2ⁿ', 'n²', '2n', 'n'], a: 0, e: 'Doubling.' }, { q: 'First rDNA by', o: ['Cohen & Boyer', 'Watson & Crick', 'Mendel', 'Morgan'], a: 0, e: '1972.' },
      { q: 'Blue–white: recombinant', o: ['white', 'blue', 'red', 'none'], a: 0, e: 'lacZ broken.' }, { q: 'Plants transformed by', o: ['Agrobacterium Ti plasmid', 'heat shock', 'microinjection only', 'PCR'], a: 0, e: 'Natural engineer.' },
      { q: 'Smaller fragments move', o: ['farther', 'less', 'same', 'backwards'], a: 0, e: 'Sieving.' }, { q: 'Fungal cell wall enzyme', o: ['chitinase', 'lysozyme', 'cellulase', 'RNase'], a: 0, e: 'Chitin.' },
      { q: 'Downstream processing', o: ['separation and purification', 'mutation', 'cloning', 'PCR'], a: 0, e: 'After bioreactor.' }
    ],
    teach: {
      outcomes: ['Explain tools of rDNA technology', 'Describe the steps from DNA isolation to product', 'Calculate PCR amplification'],
      periods: [{ t: 'Tools', flow: [['10 min', 'Paper scissors-and-tape cloning.'], ['15 min', 'Vectors and markers.'], ['15 min', 'Explore panel 2.']] }, { t: 'Processes', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Bioreactor diagram.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['DNA moves to cathode.', 'PCR makes proteins.'], activities: ['Paper plasmid model.', 'Food-dye gel electrophoresis.'],
      exit: ['EcoRI site.', 'PCR steps.', 'Insertional inactivation.'], homework: 'Flowchart: making recombinant insulin-producing bacteria.'
    },
    slides: [{ t: 'Biotechnology: Principles', b: ['Restriction enzymes and ligase', 'Vectors and hosts', 'Gel and PCR', 'Bioreactors and downstream'] }, { t: 'Think and share', b: ['Why use a thermostable polymerase?', 'Why must recombinants be selected?'] }],
    fs: { groups: [['Tools', [['Cut', 'EcoRI GAATTC'], ['Join', 'ligase'], ['Vector', 'ori, marker, site']]], ['Processes', [['Gel', 'to anode; small fast'], ['PCR', '94/55/72 °C; 2ⁿ'], ['Hosts', 'CaCl₂ heat shock, gene gun']]], ['Scale-up', [['Bioreactor', 'stirred tank'], ['Downstream', 'purify, QC']]]],
      ex: [['1 copy, 30 cycles', '≈ 1.07 × 10⁹'], ['tetR insert', 'Amp-R, Tet-S']], rem: ['Palindromes.', 'Taq thermostable.', 'White = recombinant.'] }
  });
})();
