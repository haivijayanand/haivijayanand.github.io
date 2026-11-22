/*
TOOL:    class12_chemistry_ch09
FAMILY:  CBSE_REVISION / Class 12 Chemistry (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Unit 9 Amines (classification, nomenclature, preparation, physical properties, basicity, reactions, Hinsberg test, diazonium salts and their reactions) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 9, part: 'Part II', short: 'Amines', title: 'Amines',
    blurb: 'Structure and classification (1°, 2°, 3°); nomenclature; preparation — reduction of nitro compounds, ammonolysis of alkyl halides, reduction of nitriles and amides, Gabriel phthalimide synthesis, Hoffmann bromamide degradation; physical properties; basic character (effect of alkyl groups, solvation, aryl amines); chemical reactions — alkylation, acylation, carbylamine reaction, reaction with nitrous acid, Hinsberg’s test, electrophilic substitution in aniline (bromination, nitration, sulphonation); diazonium salts — preparation, replacement reactions (Sandmeyer, Gattermann), coupling to azo dyes.',
    revise: {
      oneLine: 'Amines are bases because of the N lone pair. In water, basicity of ethylamines: (C₂H₅)₂NH > (C₂H₅)₃N > C₂H₅NH₂ > NH₃ (inductive effect + solvation + steric); for methylamines (CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃. Aniline is a much weaker base (lone pair delocalised into ring; pKb 9.4). Hoffmann bromamide: RCONH₂ + Br₂ + 4NaOH → RNH₂ (one carbon less). Gabriel gives pure 1° aliphatic amines only. Carbylamine test (CHCl₃ + KOH, foul smell) is for 1° amines. Hinsberg (benzenesulphonyl chloride): 1° product soluble in alkali, 2° insoluble, 3° no reaction. Aniline + Na⁠NO₂/HCl at 273–278 K → benzenediazonium chloride, which gives ArCl/ArBr/ArCN (Sandmeyer), ArI (KI), ArF, phenol (warm water), benzene (H₃PO₂) and orange azo dyes with phenol (coupling).',
      sections: [
        { h: 'Aniline substitution', html: '<p>−NH₂ strongly activates: bromine water → 2,4,6-tribromoaniline (white ppt). To get mono-substitution, protect by acetylation first. Direct nitration gives some meta product (anilinium ion is m-directing). Aniline does not undergo Friedel–Crafts (forms salt with AlCl₃).</p>' },
        { h: 'Nitrous acid', html: '<p>1° aliphatic amines → alcohol + N₂ gas (unstable diazonium). 1° aromatic → stable diazonium salt below 5 °C.</p>' },
        { h: 'Why Gabriel fails for aniline', html: '<p>Aryl halides don’t undergo nucleophilic substitution with phthalimide anion.</p>' }
      ],
      formulas: [['Hoffmann', 'RCONH₂ → RNH₂ (−1 C)'], ['Diazotisation', 'ArNH₂ + Na⁠NO₂ + 2HCl, 0–5 °C → ArN₂⁺Cl⁻'], ['pKb', 'lower pKb = stronger base'], ['Hinsberg', 'C₆H₅SO₂Cl']],
      terms: [['Carbylamine test', '1° amine + CHCl₃ + KOH → isocyanide (foul smell)'], ['Coupling', 'diazonium + phenol/aniline → azo dye'], ['Acetylation', 'protecting −NH₂ as −NHCOCH₃']],
      traps: ['Aniline is weaker base than NH₃.', '3° amines don’t react with Hinsberg reagent.', 'Diazonium salts must be kept cold.'],
      bridge: '<p>Unit 10 studies biomolecules — many contain amine and amide groups.</p>'
    },
    explore: [
      { title: 'Basicity', intro: 'Compare pKb values (in water).',
        build(el, K) { const B = [['NH₃', 4.75], ['CH₃NH₂', 3.38], ['(CH₃)₂NH', 3.27], ['(CH₃)₃N', 4.22], ['C₂H₅NH₂', 3.29], ['(C₂H₅)₂NH', 3.00], ['(C₂H₅)₃N', 3.25], ['C₆H₅NH₂ (aniline)', 9.38], ['C₆H₅NHCH₃', 9.30], ['p-toluidine', 8.92], ['p-nitroaniline', 13.0]]; let k = 7; const row = K.row(el); K.select(row, 'amine', B.map(b => b[0]), i => { k = i; draw(); }).value = 7; const rd = K.read(el);
          function draw() { const Kb = 10 ** -B[k][1]; rd.innerHTML = `${B[k][0]}: pKb = <b>${B[k][1]}</b> · Kb = ${Kb.toExponential(2)} · ${f(Kb / 10 ** -4.75)}× ammonia · ${B[k][1] > 8 ? 'aryl: lone pair delocalised into ring → weak base' : B[k][1] < 4.75 ? 'alkyl groups push electrons (+I) → stronger than NH₃' : 'reference'}`; } draw(); return null; } },
      { title: 'Diazonium hub', intro: 'Choose a reagent for benzenediazonium chloride.',
        build(el, K) { const D = [['CuCl/HCl (Sandmeyer)', 'chlorobenzene + N₂'], ['CuBr/HBr (Sandmeyer)', 'bromobenzene + N₂'], ['CuCN/KCN (Sandmeyer)', 'benzonitrile + N₂'], ['Cu/HCl (Gattermann)', 'chlorobenzene'], ['KI', 'iodobenzene'], ['HBF₄, heat', 'fluorobenzene (Balz–Schiemann)'], ['H₂O, warm', 'phenol'], ['H₃PO₂', 'benzene'], ['phenol, pH 9–10', 'p-hydroxyazobenzene (orange dye)'], ['aniline, pH 4–5', 'p-aminoazobenzene (yellow dye)']]; let k = 0; const row = K.row(el); K.select(row, 'reagent', D.map(d => d[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { rd.innerHTML = `C₆H₅N₂⁺Cl⁻ + ${D[k][0]} → <b>${D[k][1]}</b>${k < 8 ? ' (N₂ lost — replacement)' : ' (N₂ retained — coupling)'}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Classify', gen(R) { return G9.S9.groupQ(R, [['CH₃NH₂', 0], ['(CH₃)₂NH', 1], ['(CH₃)₃N', 2], ['C₆H₅NH₂', 0], ['C₆H₅NHCH₃', 1], ['C₆H₅N(CH₃)₂', 2]], ['1°', '2°', '3°'], 'Type of '); } },
      { title: 'Basicity order', gen(R) { return G9.S9.pickQ(R, [['NH₃, CH₃NH₂, C₆H₅NH₂', 'CH₃NH₂ > NH₃ > C₆H₅NH₂'], ['C₂H₅NH₂, (C₂H₅)₂NH, (C₂H₅)₃N in water', '(C₂H₅)₂NH > (C₂H₅)₃N > C₂H₅NH₂'], ['aniline, p-toluidine, p-nitroaniline', 'p-toluidine > aniline > p-nitroaniline']], 'Decreasing basicity: '); } },
      { title: 'Product', gen(R) { return G9.S9.pickQ(R, [['CH₃CONH₂ + Br₂ + NaOH', 'CH₃NH₂ (Hoffmann)'], ['C₆H₅NO₂ + Sn/HCl', 'aniline'], ['aniline + bromine water', '2,4,6-tribromoaniline'], ['aniline + (CH₃CO)₂O', 'acetanilide'], ['C₂H₅NH₂ + CHCl₃ + KOH', 'ethyl isocyanide (carbylamine)'], ['C₆H₅N₂Cl + H₂O, warm', 'phenol']], 'Product: '); } },
      { title: 'Hinsberg', levels: [2, 3], gen(R) { return G9.S9.groupQ(R, [['ethylamine', 0], ['diethylamine', 1], ['triethylamine', 2], ['aniline', 0], ['N-methylaniline', 1]], ['sulphonamide soluble in KOH', 'sulphonamide insoluble in KOH', 'no reaction'], 'Hinsberg result for '); } },
      { title: 'Why', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why is aniline less basic than ethylamine?', 'lone pair delocalised into benzene ring'], ['Why acetylate before nitrating aniline?', 'control activation; prevent oxidation and get p-product'], ['Why no Friedel–Crafts with aniline?', '−NH₂ forms salt with AlCl₃ — deactivates ring'], ['Why diazotise at 0–5 °C?', 'diazonium salts decompose when warm']]); } }
    ],
    quiz: [
      { q: 'Strongest base (water)', o: ['(C₂H₅)₂NH', 'NH₃', 'aniline', 'C₂H₅NH₂'], a: 0, e: '+I and solvation.' }, { q: 'Carbylamine test for', o: ['1° amines', '2°', '3°', 'all'], a: 0, e: 'Isocyanide.' },
      { q: 'Hoffmann bromamide gives amine with', o: ['one C less', 'one C more', 'same C', 'two C less'], a: 0, e: 'Loses CO.' }, { q: 'Hinsberg reagent', o: ['C₆H₅SO₂Cl', 'CHCl₃', 'Na⁠NO₂', 'Br₂'], a: 0, e: 'Sulphonyl chloride.' },
      { q: 'Diazotisation temperature', o: ['0–5 °C', '50 °C', '100 °C', 'room'], a: 0, e: 'Cold.' }, { q: 'Sandmeyer uses', o: ['Cu(I) salts', 'Fe', 'Zn', 'Pd'], a: 0, e: 'CuCl, CuBr, CuCN.' },
      { q: 'Aniline + bromine water', o: ['2,4,6-tribromoaniline', 'p-bromoaniline only', 'no reaction', 'm-bromo'], a: 0, e: 'Highly activated.' }, { q: 'Gabriel gives', o: ['1° aliphatic amines', 'aniline', '2° amines', '3° amines'], a: 0, e: 'Phthalimide.' },
      { q: 'Azo dye forms by', o: ['coupling', 'Sandmeyer', 'Hoffmann', 'Gabriel'], a: 0, e: 'N=N kept.' }, { q: 'Diazonium + H₃PO₂', o: ['benzene', 'phenol', 'aniline', 'chlorobenzene'], a: 0, e: 'Reduction.' },
      { q: 'Aniline basicity vs NH₃', o: ['weaker', 'stronger', 'same', 'not basic at all'], a: 0, e: 'pKb 9.4.' }
    ],
    teach: {
      outcomes: ['Classify and prepare amines', 'Explain basicity trends', 'Use Hinsberg/carbylamine tests and diazonium chemistry'],
      periods: [{ t: 'Amines', flow: [['10 min', 'Classification.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Preparation methods.']] }, { t: 'Reactions', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Conversion chains.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['More alkyl groups always stronger base.', 'Aniline is strongly basic.'], activities: ['Azo dye demo (teacher).', 'Litmus test of amines.'],
      exit: ['Basicity order.', 'Hinsberg.', 'Diazonium uses.'], homework: 'Convert benzene to: aniline, chlorobenzene via diazonium, and an azo dye.'
    },
    slides: [{ t: 'Amines', b: ['Classification and preparation', 'Basicity', 'Tests: carbylamine, Hinsberg', 'Diazonium salts'] }, { t: 'Think and share', b: ['Why does fish smell of amines?', 'How are azo dyes made?'] }],
    fs: { groups: [['Preparation', [['Hoffmann', 'amide → amine, −1 C'], ['Gabriel', '1° aliphatic only'], ['Reduction', 'ArNO₂ + Sn/HCl']]], ['Basicity', [['Alkyl', '> NH₃'], ['Aryl', '< NH₃'], ['Ethyl order', '2° > 3° > 1°']]], ['Diazonium', [['Make', 'Na⁠NO₂/HCl, 0–5 °C'], ['Replace', 'Sandmeyer, KI, H₂O, H₃PO₂'], ['Couple', 'azo dyes']]]],
      ex: [['CH₃CH₂CONH₂ + Br₂/NaOH', 'C₂H₅NH₂'], ['diazonium + KI', 'iodobenzene']], rem: ['Aniline weak base.', 'Hinsberg 1°/2°/3°.', 'Keep diazonium cold.'] }
  });
})();
