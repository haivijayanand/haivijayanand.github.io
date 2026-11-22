/*
TOOL:    class12_biology_ch04
FAMILY:  CBSE_REVISION / Class 12 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 4 Principles of Inheritance and Variation (Mendel’s laws, monohybrid and dihybrid crosses, incomplete dominance, codominance, multiple alleles, polygenic inheritance, pleiotropy, chromosomal theory, linkage, sex determination, mutation, pedigree analysis, Mendelian and chromosomal disorders) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 4, part: 'Unit VII · Genetics and evolution', short: 'Inheritance', title: 'Principles of Inheritance and Variation',
    blurb: 'Mendel’s experiments on garden pea; inheritance of one gene (law of dominance, law of segregation, test cross); deviations — incomplete dominance (snapdragon), codominance and multiple alleles (ABO blood groups); inheritance of two genes (law of independent assortment, 9:3:3:1); chromosomal theory of inheritance (Sutton and Boveri, Morgan’s Drosophila work, linkage and recombination); polygenic inheritance; pleiotropy; sex determination (XX–XY, XX–XO, ZW–ZZ, haplodiploidy); mutation; pedigree analysis; Mendelian disorders (haemophilia, colour blindness, sickle-cell anaemia, phenylketonuria, thalassaemia) and chromosomal disorders (Down’s, Klinefelter’s, Turner’s).',
    revise: {
      oneLine: 'Monohybrid F₂: phenotype 3:1, genotype 1:2:1; dihybrid F₂: 9:3:3:1. Test cross (with recessive parent) reveals an unknown genotype (1:1 if heterozygous). Incomplete dominance: F₂ phenotype = genotype 1:2:1 (red : pink : white snapdragon). ABO: Iᴬ and Iᴮ codominant, i recessive — six genotypes, four phenotypes. Linkage keeps genes on the same chromosome together; recombination frequency measures map distance (Morgan, Sturtevant). Humans: XY males (heterogametic); birds: ZW females. X-linked recessive disorders (haemophilia, colour blindness) are commoner in males (passed via carrier mothers). Sickle-cell anaemia: autosomal recessive, Glu → Val at 6th position of β-globin (GAG → GUG). Down’s syndrome: trisomy 21; Klinefelter’s: 47, XXY; Turner’s: 45, XO.',
      sections: [
        { h: 'Pedigree symbols', html: '<p>Square male, circle female, shaded affected; consanguineous mating double line. Autosomal dominant: appears every generation; X-linked recessive: mostly males, from carrier mothers.</p>' },
        { h: 'Polygenic', html: '<p>Human skin colour and height — many genes with additive effect give a continuous range (bell curve).</p>' },
        { h: 'Pleiotropy', html: '<p>One gene, many effects — phenylketonuria (mental retardation, reduced hair and skin pigmentation).</p>' }
      ],
      formulas: [['Monohybrid F₂', '3:1 (1:2:1)'], ['Dihybrid F₂', '9:3:3:1'], ['Test cross', '1:1 / 1:1:1:1'], ['Gametes', '2ⁿ for n heterozygous genes'], ['Incomplete dom.', '1:2:1 phenotype']],
      terms: [['Allele', 'alternative form of a gene'], ['Linkage', 'genes on same chromosome inherited together'], ['Aneuploidy', 'gain or loss of a chromosome']],
      traps: ['Codominance (AB blood) differs from incomplete dominance (pink).', 'Haemophilia is X-linked recessive — fathers don’t pass it to sons.', 'Grasshopper males are XO.'],
      bridge: '<p>Ch 5 explains genes at the molecular level.</p>'
    },
    explore: [
      { title: 'Punnett square', intro: 'Choose two parent genotypes for one gene.',
        build(el, K) { const G = ['AA', 'Aa', 'aa']; let p1 = 1, p2 = 1, mode = 0; const row = K.row(el); K.select(row, 'parent 1', G, i => { p1 = i; draw(); }).value = 1; K.select(row, 'parent 2', G, i => { p2 = i; draw(); }).value = 1; K.select(row, 'dominance', ['complete (tall/dwarf)', 'incomplete (red/pink/white)'], i => { mode = i; draw(); }); const rd = K.read(el);
          function draw() { const a = G[p1].split(''), b = G[p2].split(''); const cnt = {}; let tbl = '<table style="border-collapse:collapse;margin:6px 0"><tr><td></td>' + b.map(x => `<th style="padding:4px 12px">${x}</th>`).join('') + '</tr>'; a.forEach(x => { tbl += `<tr><th style="padding:4px 12px">${x}</th>`; b.forEach(y => { const g = [x, y].sort().join(''); cnt[g] = (cnt[g] || 0) + 1; tbl += `<td style="border:1px solid #94a3b8;padding:4px 12px;text-align:center">${g}</td>`; }); tbl += '</tr>'; }); tbl += '</table>';
            const ph = mode ? { AA: 'red', Aa: 'pink', aa: 'white' } : { AA: 'tall', Aa: 'tall', aa: 'dwarf' }; const pc = {}; Object.entries(cnt).forEach(([g, n]) => { pc[ph[g]] = (pc[ph[g]] || 0) + n; });
            rd.innerHTML = tbl + `genotypes: <b>${Object.entries(cnt).map(([g, n]) => `${g} ${n}`).join(' : ')}</b> · phenotypes: <b>${Object.entries(pc).map(([p, n]) => `${p} ${n}`).join(' : ')}</b> (out of 4)`; } draw(); return null; } },
      { title: 'Blood group cross', intro: 'Pick parental genotypes.',
        build(el, K) { const G = ['IᴬIᴬ', 'Iᴬi', 'IᴮIᴮ', 'Iᴮi', 'IᴬIᴮ', 'ii']; const al = { 'IᴬIᴬ': ['A', 'A'], 'Iᴬi': ['A', 'i'], 'IᴮIᴮ': ['B', 'B'], 'Iᴮi': ['B', 'i'], 'IᴬIᴮ': ['A', 'B'], 'ii': ['i', 'i'] }; let p1 = 1, p2 = 3; const row = K.row(el); K.select(row, 'mother', G, i => { p1 = i; draw(); }).value = 1; K.select(row, 'father', G, i => { p2 = i; draw(); }).value = 3; const rd = K.read(el);
          function draw() { const c = {}; al[G[p1]].forEach(x => al[G[p2]].forEach(y => { const s = [x, y].sort().join(''); const ph = s === 'AB' ? 'AB' : s.includes('A') ? 'A' : s.includes('B') ? 'B' : 'O'; c[ph] = (c[ph] || 0) + 1; })); rd.innerHTML = `children’s blood groups: <b>${Object.entries(c).map(([p, n]) => `${p} ${n * 25}%`).join(' · ')}</b> · Iᴬ and Iᴮ codominant, i recessive`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Ratios', gen(R) { return G9.S9.pickQ(R, [['Monohybrid F₂ phenotype ratio?', '3:1'], ['Monohybrid F₂ genotype ratio?', '1:2:1'], ['Dihybrid F₂ phenotype ratio?', '9:3:3:1'], ['Test cross of Tt × tt?', '1 tall : 1 dwarf'], ['Snapdragon F₂ (incomplete dominance)?', '1 red : 2 pink : 1 white'], ['Dihybrid test cross?', '1:1:1:1']]); } },
      { title: 'Gametes', gen(R) { const n = R.int(1, 5); return { q: `Number of gamete types from a plant heterozygous for ${n} independent gene${n > 1 ? 's' : ''}?`, a: `${2 ** n}`, ans: 2 ** n }; } },
      { title: 'Disorder type', gen(R) { return G9.S9.groupQ(R, [['haemophilia', 0], ['colour blindness', 0], ['sickle-cell anaemia', 1], ['phenylketonuria', 1], ['thalassaemia', 1], ['Down’s syndrome', 2], ['Turner’s syndrome', 2], ['Klinefelter’s syndrome', 2]], ['X-linked recessive', 'autosomal recessive', 'chromosomal'], ''); } },
      { title: 'Probability', levels: [2, 3], gen(R) { const c = R.pick([['Aa × Aa', 'aa', 0.25], ['Aa × aa', 'aa', 0.5], ['AaBb × AaBb', 'aabb', 1 / 16], ['AaBb × AaBb', 'A_B_', 9 / 16], ['carrier mother × normal father (X-linked)', 'affected son among sons', 0.5]]); return { q: `${c[0]}: probability of ${c[1]}?`, a: f(c[2]), ans: c[2], tol: 1e-4 }; } },
      { title: 'Sex determination', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['humans', 'XX female, XY male (male heterogametic)'], ['grasshopper', 'XX female, XO male'], ['birds', 'ZW female, ZZ male (female heterogametic)'], ['honey bee', 'haplodiploidy: fertilised eggs → females, unfertilised → males']], 'Sex determination in '); } }
    ],
    quiz: [
      { q: 'Dihybrid F₂', o: ['9:3:3:1', '3:1', '1:2:1', '1:1:1:1'], a: 0, e: 'Independent assortment.' }, { q: 'AB blood shows', o: ['codominance', 'incomplete dominance', 'epistasis', 'linkage'], a: 0, e: 'Both expressed.' },
      { q: 'Pink snapdragon', o: ['incomplete dominance', 'codominance', 'pleiotropy', 'mutation'], a: 0, e: 'Blending.' }, { q: 'Down’s syndrome', o: ['trisomy 21', 'XO', 'XXY', 'monosomy 21'], a: 0, e: '47 chromosomes.' },
      { q: 'Haemophilia', o: ['X-linked recessive', 'autosomal dominant', 'Y-linked', 'chromosomal'], a: 0, e: 'Royal disease.' }, { q: 'Sickle-cell change', o: ['Glu → Val', 'Val → Glu', 'Gly → Ala', 'none'], a: 0, e: '6th position β chain.' },
      { q: 'Birds: heterogametic', o: ['female ZW', 'male ZW', 'male XY', 'female XX'], a: 0, e: 'ZW.' }, { q: 'Linkage discovered by', o: ['Morgan', 'Mendel', 'Darwin', 'Watson'], a: 0, e: 'Drosophila.' },
      { q: 'Test cross uses', o: ['homozygous recessive', 'homozygous dominant', 'F₁', 'hybrid'], a: 0, e: 'Reveal genotype.' }, { q: 'Turner’s karyotype', o: ['45, XO', '47, XXY', '47, +21', '46, XY'], a: 0, e: 'Monosomy X.' },
      { q: 'Human skin colour', o: ['polygenic', 'monogenic', 'X-linked', 'cytoplasmic'], a: 0, e: 'Additive.' }
    ],
    teach: {
      outcomes: ['Solve mono- and dihybrid crosses', 'Explain deviations from Mendel', 'Interpret pedigrees and disorders'],
      periods: [{ t: 'Mendel', flow: [['10 min', 'Pea characters.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Dihybrid forked-line method.']] }, { t: 'Beyond Mendel', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Pedigree analysis.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Dominant = more common.', 'Codominance = blending.'], activities: ['Coin-toss segregation.', 'Family trait pedigree.'],
      exit: ['9:3:3:1.', 'ABO alleles.', 'X-linked pattern.'], homework: 'Solve five pedigree/blood group problems.'
    },
    slides: [{ t: 'Principles of Inheritance', b: ['Mendel’s laws', 'Deviations', 'Chromosomal theory and linkage', 'Sex determination and disorders'] }, { t: 'Think and share', b: ['Why is colour blindness commoner in boys?', 'Can O parents have an A child?'] }],
    fs: { groups: [['Mendel', [['Mono', '3:1, 1:2:1'], ['Di', '9:3:3:1'], ['Test cross', '1:1']]], ['Deviations', [['Incomplete', 'pink 1:2:1'], ['Codominance', 'AB'], ['Polygenic', 'skin colour']]], ['Disorders', [['X-linked', 'haemophilia, colour blind'], ['Autosomal', 'sickle, PKU, thalassaemia'], ['Chromosomal', 'Down, Turner, Klinefelter']]]],
      ex: [['AaBb self', 'aabb 1/16'], ['Iᴬi × Iᴮi', 'A, B, AB, O each 25%']], rem: ['2ⁿ gametes.', 'ZW birds.', 'Trisomy 21.'] }
  });
})();
