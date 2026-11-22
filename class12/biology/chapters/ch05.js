/*
TOOL:    class12_biology_ch05
FAMILY:  CBSE_REVISION / Class 12 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 5 Molecular Basis of Inheritance (DNA structure and packaging, search for genetic material, RNA world, replication, transcription, genetic code, translation, lac operon, Human Genome Project, DNA fingerprinting) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 5, part: 'Unit VII · Genetics and evolution', short: 'Molecular inheritance', title: 'Molecular Basis of Inheritance',
    blurb: 'Structure of DNA (polynucleotide chain, double helix, Chargaff’s rules), packaging (nucleosome, chromatin); search for the genetic material (Griffith, Avery–MacLeod–McCarty, Hershey–Chase); RNA world; DNA replication (semi-conservative — Meselson–Stahl; enzymes); transcription (unit, types of RNA, processing in eukaryotes); genetic code; mutations; tRNA as adapter; translation; regulation of gene expression — lac operon; Human Genome Project; DNA fingerprinting.',
    revise: {
      oneLine: 'DNA is a right-handed double helix of antiparallel strands, 3.4 nm per turn, ~10 bp per turn, 0.34 nm between base pairs; A = T (2 H-bonds), G ≡ C (3 H-bonds); purines = pyrimidines. Human diploid DNA ≈ 6.6 × 10⁹ bp ≈ 2.2 m long. Hershey–Chase (³²P/³⁵S in bacteriophage) proved DNA is the genetic material. Replication is semi-conservative (Meselson–Stahl, ¹⁵N); DNA polymerase works 5′→3′ only: continuous leading strand, discontinuous lagging strand joined by ligase. Transcription: template 3′→5′, RNA made 5′→3′; eukaryotic hnRNA undergoes capping, tailing and splicing (introns removed). Genetic code: triplet, 64 codons (61 sense, 3 stop UAA, UAG, UGA), AUG start (methionine), degenerate, universal (nearly), non-overlapping. Lac operon (inducible): lactose (allolactose) binds the repressor, so z, y, a genes are transcribed.',
      sections: [
        { h: 'Types of RNA', html: '<p>mRNA (template), tRNA (adapter, anticodon; clover-leaf), rRNA (structural and catalytic — 23S rRNA is a ribozyme). Eukaryotic RNA polymerases: I (rRNA), II (hnRNA/mRNA), III (tRNA, 5S rRNA, snRNA).</p>' },
        { h: 'HGP findings', html: '<p>About 3 × 10⁹ bp; ~20 000–25 000 genes; less than 2% codes for proteins; 99.9% of bases are the same in all people; chromosome 1 has most genes (2968), Y fewest (231).</p>' },
        { h: 'DNA fingerprinting', html: '<p>Uses VNTRs (satellite DNA) — polymorphic; Southern blotting with labelled probe; used in forensics and paternity.</p>' }
      ],
      formulas: [['Chargaff', 'A = T, G = C; A + G = T + C'], ['Pitch', '3.4 nm, ~10 bp'], ['bp spacing', '0.34 nm'], ['Codons', '64 (61 + 3 stop)'], ['DNA length', 'bp × 0.34 nm']],
      terms: [['Nucleosome', 'DNA wrapped round histone octamer (~200 bp)'], ['Exon/intron', 'coding / non-coding parts of a gene'], ['Operon', 'genes with a shared promoter and operator']],
      traps: ['Uracil replaces thymine in RNA.', 'Lagging strand is made in Okazaki fragments.', 'Repressor binds operator, not promoter.'],
      bridge: '<p>Ch 6 asks how variation leads to evolution.</p>'
    },
    explore: [
      { title: 'DNA calculator', intro: 'Set percentage of one base and the length.',
        build(el, K) { let A = 20, bp = 6.6e9; const row = K.row(el); K.slider(row, '% adenine', 5, 45, 1, A, v => { A = v; draw(); }); K.select(row, 'genome', ['E. coli (4.6 × 10⁶ bp)', 'human diploid (6.6 × 10⁹ bp)', 'λ phage (48 502 bp)'], i => { bp = [4.6e6, 6.6e9, 48502][i]; draw(); }).value = 1; const rd = K.read(el);
          function draw() { const G = 50 - A; rd.innerHTML = `Chargaff: A = T = <b>${A}%</b>, G = C = <b>${G}%</b> · length = bp × 0.34 nm = <b>${f(bp * 0.34e-9)} m</b> · helical turns = ${f(bp / 10)} · H-bonds ≈ ${(bp * (2 * A + 3 * G) / 50).toExponential(2)}`; } draw(); return null; } },
      { title: 'Central dogma lab', intro: 'Type a template DNA strand (3′→5′) using A, T, G, C.',
        build(el, K) { const row = K.row(el); const inp = document.createElement('input'); inp.value = 'TACGGATTCACT'; inp.style.cssText = 'font:16px monospace;padding:4px 8px;width:22em'; row.appendChild(inp); const rd = K.read(el);
          const CODE = { UUU: 'Phe', UUC: 'Phe', UUA: 'Leu', UUG: 'Leu', CUU: 'Leu', CUC: 'Leu', CUA: 'Leu', CUG: 'Leu', AUU: 'Ile', AUC: 'Ile', AUA: 'Ile', AUG: 'Met', GUU: 'Val', GUC: 'Val', GUA: 'Val', GUG: 'Val', UCU: 'Ser', UCC: 'Ser', UCA: 'Ser', UCG: 'Ser', CCU: 'Pro', CCC: 'Pro', CCA: 'Pro', CCG: 'Pro', ACU: 'Thr', ACC: 'Thr', ACA: 'Thr', ACG: 'Thr', GCU: 'Ala', GCC: 'Ala', GCA: 'Ala', GCG: 'Ala', UAU: 'Tyr', UAC: 'Tyr', UAA: 'STOP', UAG: 'STOP', CAU: 'His', CAC: 'His', CAA: 'Gln', CAG: 'Gln', AAU: 'Asn', AAC: 'Asn', AAA: 'Lys', AAG: 'Lys', GAU: 'Asp', GAC: 'Asp', GAA: 'Glu', GAG: 'Glu', UGU: 'Cys', UGC: 'Cys', UGA: 'STOP', UGG: 'Trp', CGU: 'Arg', CGC: 'Arg', CGA: 'Arg', CGG: 'Arg', AGU: 'Ser', AGC: 'Ser', AGA: 'Arg', AGG: 'Arg', GGU: 'Gly', GGC: 'Gly', GGA: 'Gly', GGG: 'Gly' };
          function draw() { const t = inp.value.toUpperCase().replace(/[^ATGC]/g, ''); const cmp = { A: 'U', T: 'A', G: 'C', C: 'G' }; const m = t.split('').map(x => cmp[x]).join(''); const aa = []; for (let i = 0; i + 3 <= m.length; i += 3) { const c = CODE[m.slice(i, i + 3)]; aa.push(c); if (c === 'STOP') break; } const coding = t.split('').map(x => ({ A: 'T', T: 'A', G: 'C', C: 'G' })[x]).join(''); rd.innerHTML = `template 3′-${t}-5′<br>coding 5′-${coding}-3′<br>mRNA 5′-<b>${m}</b>-3′<br>protein: <b>${aa.join('–') || '—'}</b>`; }
          inp.addEventListener('input', draw); draw(); return null; } }
    ],
    gens: [
      { title: 'Chargaff', gen(R) { const A = R.pick([15, 20, 22, 30, 35]); return { q: `A DNA sample has ${A}% adenine. Percentage of cytosine?`, a: `${50 - A}%`, ans: 50 - A }; } },
      { title: 'Length', gen(R) { const bp = R.pick([1e6, 4.6e6, 3e9, 6.6e9]); return { q: `Length of DNA with ${bp.toExponential(1)} bp (0.34 nm per bp)?`, a: `${f(bp * 0.34e-9)} m`, ans: bp * 0.34e-9, tol: bp * 0.34e-12 }; } },
      { title: 'mRNA', gen(R) { const t = R.pick(['TACGGA', 'TACAAACCG', 'ATGCCT', 'GGCTTA']); const m = t.split('').map(x => ({ A: 'U', T: 'A', G: 'C', C: 'G' })[x]).join(''); return { q: `Template strand 3′-${t}-5′. mRNA?`, a: `5′-${m}-3′` }; } },
      { title: 'Experiment', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Transforming principle in Streptococcus', 'Griffith'], ['Bacteriophage labelled with ³²P and ³⁵S', 'Hershey and Chase — DNA is genetic material'], ['¹⁵N in E. coli, density gradient', 'Meselson and Stahl — semi-conservative replication'], ['Lac operon model', 'Jacob and Monod'], ['Double helix model', 'Watson and Crick (using Franklin’s X-ray data)']], 'Who/what: '); } },
      { title: 'Code facts', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Start codon?', 'AUG (methionine)'], ['Stop codons?', 'UAA, UAG, UGA'], ['Number of codons coding amino acids?', '61'], ['What is degeneracy?', 'more than one codon for an amino acid'], ['Inducer of lac operon?', 'lactose (allolactose)']]); } }
    ],
    quiz: [
      { q: 'G ≡ C bonds', o: ['3 H-bonds', '2', '1', '4'], a: 0, e: 'Stronger pair.' }, { q: 'Replication is', o: ['semi-conservative', 'conservative', 'dispersive', 'random'], a: 0, e: 'Meselson–Stahl.' },
      { q: 'Hershey–Chase showed', o: ['DNA is genetic material', 'protein is', 'RNA is', 'lipids'], a: 0, e: 'Phage.' }, { q: 'Start codon', o: ['AUG', 'UAA', 'UGA', 'GUG only'], a: 0, e: 'Met.' },
      { q: 'Okazaki fragments on', o: ['lagging strand', 'leading', 'mRNA', 'tRNA'], a: 0, e: 'Discontinuous.' }, { q: 'Splicing removes', o: ['introns', 'exons', 'cap', 'tail'], a: 0, e: 'Processing.' },
      { q: 'Lac operon repressor binds', o: ['operator', 'promoter', 'z gene', 'lactose only'], a: 0, e: 'Blocks.' }, { q: 'Fingerprinting uses', o: ['VNTRs', 'exons', 'histones', 'rRNA'], a: 0, e: 'Polymorphic.' },
      { q: 'Ribozyme example', o: ['23S rRNA', 'DNA pol', 'histone', 'tRNA'], a: 0, e: 'Catalytic RNA.' }, { q: 'RNA has', o: ['uracil', 'thymine', 'both', 'neither'], a: 0, e: 'U.' },
      { q: 'Nucleosome core', o: ['histone octamer', 'RNA', 'single histone', 'lipid'], a: 0, e: 'Beads.' }
    ],
    teach: {
      outcomes: ['Describe DNA structure and packaging', 'Explain replication, transcription, translation', 'Describe lac operon, HGP and fingerprinting'],
      periods: [{ t: 'DNA', flow: [['10 min', 'Paper double helix.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Classic experiments.']] }, { t: 'Gene expression', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Lac operon role play.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Both strands transcribed.', 'All DNA codes protein.'], activities: ['Banana DNA extraction.', 'Codon decoding game.'],
      exit: ['Chargaff.', 'Stop codons.', 'Operon parts.'], homework: 'Translate three mRNA sequences.'
    },
    slides: [{ t: 'Molecular Basis of Inheritance', b: ['DNA structure and packaging', 'Replication', 'Transcription and translation', 'Regulation, HGP, fingerprinting'] }, { t: 'Think and share', b: ['How does 2 m of DNA fit in a nucleus?', 'Why is the code called universal?'] }],
    fs: { groups: [['DNA', [['Pairs', 'A=T, G≡C'], ['Helix', '3.4 nm, 10 bp'], ['Packing', 'nucleosome']]], ['Expression', [['Replication', 'semi-conservative'], ['Transcription', 'capping, tailing, splicing'], ['Code', '64; AUG; UAA UAG UGA']]], ['Applications', [['Lac operon', 'inducible'], ['HGP', '3 × 10⁹ bp'], ['Fingerprint', 'VNTR']]]],
      ex: [['20% A', '30% C'], ['6.6 × 10⁹ bp', '2.2 m']], rem: ['5′→3′ synthesis.', 'Repressor–operator.', 'Introns out.'] }
  });
})();
