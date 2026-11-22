/*
TOOL:    class12_chemistry_ch07
FAMILY:  CBSE_REVISION / Class 12 Chemistry (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Unit 7 Alcohols, Phenols and Ethers (classification, nomenclature, preparation, physical properties, acidity, reactions, distinction tests, important compounds, ethers) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 7, part: 'Part II', short: 'Alcohols & phenols', title: 'Alcohols, Phenols and Ethers',
    blurb: 'Classification and IUPAC nomenclature; structure of the functional groups; preparation of alcohols (from alkenes, carbonyls, Grignard reagents) and phenols (from haloarenes, sulphonic acids, diazonium salts, cumene); physical properties and hydrogen bonding; acidity of alcohols and phenols (effect of substituents); reactions — O–H cleavage, C–O cleavage (Lucas test, dehydration), oxidation; electrophilic substitution in phenols (nitration, bromination, Kolbe’s reaction, Reimer–Tiemann reaction); commercially important alcohols; ethers — preparation (Williamson synthesis), properties and reactions with HI.',
    revise: {
      oneLine: 'Phenol (pKa ≈ 10) is more acidic than alcohols (pKa ≈ 16–18) because the phenoxide ion is resonance-stabilised; electron-withdrawing groups (−NO₂) at o/p increase acidity, donating groups (−CH₃) decrease it. Alcohols: 1° oxidise to aldehydes/acids, 2° to ketones, 3° resist; Lucas test (ZnCl₂/HCl) turbidity: 3° immediate, 2° ~5 min, 1° not at room temperature. Dehydration (conc. H₂SO₄, heat) follows 3° > 2° > 1°. Phenol’s −OH strongly activates the ring (o/p): bromine water gives a white precipitate of 2,4,6-tribromophenol. Kolbe: phenoxide + CO₂ → salicylic acid; Reimer–Tiemann: CHCl₃/NaOH → salicylaldehyde. Williamson: RO⁻Na⁺ + R′X (1°) → R–O–R′.',
      sections: [
        { h: 'Tests', html: '<p>Phenol: violet colour with neutral FeCl₃; white ppt with bromine water. Alcohols: Lucas test, sodium metal (H₂).</p>' },
        { h: 'Ethers with HI', html: '<p>Mixed alkyl ether: I attaches to the smaller alkyl (SN2) — but with a 3° group, to the 3° carbon (SN1). Anisole + HI → phenol + CH₃I (never iodobenzene).</p>' },
        { h: 'Boiling points', html: '<p>Alcohols > ethers of similar mass (H-bonding). Solubility falls as the alkyl chain grows.</p>' }
      ],
      formulas: [['Acidity', 'p-nitrophenol > phenol > ethanol'], ['Lucas speed', '3° > 2° > 1°'], ['Oxidation', '1° → RCHO → RCOOH; 2° → ketone'], ['Williamson', 'RONa + R′X → ROR′']],
      terms: [['Lucas reagent', 'conc. HCl + anhydrous ZnCl₂'], ['Hydroboration–oxidation', 'anti-Markovnikov alcohol from alkene'], ['Denatured alcohol', 'ethanol made unfit to drink (CuSO₄, pyridine)']],
      traps: ['Williamson needs 1° alkyl halide; 3° halides give alkenes.', 'Phenol does not react with NaHCO₃ (weaker than carbonic acid).', 'Methanol is poisonous — blindness.'],
      bridge: '<p>Unit 8 oxidises alcohols to aldehydes, ketones and acids.</p>'
    },
    explore: [
      { title: 'Acidity ladder', intro: 'Compare pKa values.',
        build(el, K) { const A = [['ethanol', 15.9], ['water', 15.7], ['methanol', 15.5], ['p-cresol', 10.2], ['phenol', 10.0], ['o-nitrophenol', 7.2], ['p-nitrophenol', 7.1], ['2,4,6-trinitrophenol (picric acid)', 0.5], ['carbonic acid', 6.4], ['acetic acid', 4.76]]; let k = 4; const row = K.row(el); const s = K.select(row, 'compound', A.map(a => a[0]), i => { k = i; b.redraw(); }); s.value = 4; const b = new K.Board(el, { xmin: -1, xmax: 17, ymin: -1, ymax: 4, axes: false, grid: 0, aspect: 0.25 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.line(0, 1, 16, 1, { color: C.ink, w: 2 }); for (let p = 0; p <= 16; p += 2) { b.line(p, 0.8, p, 1.2, { color: C.ink, w: 1 }); b.text(p, 0.3, `${p}`, { font: '11px' }); } A.forEach((a, i) => b.dot(a[1], 1, { color: i === k ? C.orange : C.grey, r: i === k ? 7 : 4 })); b.text(8, 3.2, 'pKa → (lower = more acidic)', { font: '12px' });
            rd.innerHTML = `${A[k][0]}: pKa ≈ <b>${A[k][1]}</b> · ${A[k][1] < 6.4 ? 'stronger than carbonic acid → dissolves in NaHCO₃' : A[k][1] < 15 ? 'reacts with NaOH but not NaHCO₃' : 'reacts only with Na metal'}`; };
          b.redraw(); return null; } },
      { title: 'Lucas test', intro: 'Choose an alcohol; watch turbidity time. <kbd>P</kbd> play.',
        build(el, K) { const L = [['propan-1-ol (1°)', 999], ['propan-2-ol (2°)', 5], ['2-methylpropan-2-ol (3°)', 0.2]]; let k = 1; const row = K.row(el); K.select(row, 'alcohol', L.map(l => l[0]), i => { k = i; b.redraw(); }).value = 1; const b = new K.Board(el, { xmin: 0, xmax: 10, ymin: 0, ymax: 6, axes: false, grid: 0, aspect: 0.35 }); const rd = K.read(el); const an = new K.Anim(120, () => b.redraw(), { ms: 60 });
          b.onDraw = () => { b.clear(); const tmin = an.i / 12, tt = L[k][1], cloud = Math.min(1, Math.max(0, (tmin - tt) / 0.5 + (tt < 1 ? 1 : 0))); b.rect(4, 0.5, 2, 4.5, { fill: `rgba(148,163,184,${0.1 + 0.8 * cloud})`, color: C.ink, w: 2 });
            rd.innerHTML = `${L[k][0]} · time ${f(tmin)} min · ${cloud > 0.5 ? '<b>turbid</b> (alkyl chloride formed)' : 'clear'} · expected: ${tt > 100 ? 'no turbidity at room temperature (only on heating)' : tt < 1 ? 'immediate' : 'within ~5 minutes'}`; };
          K.anim(el, an); b.redraw(); return an; } }
    ],
    gens: [
      { title: 'Classify alcohol', gen(R) { return G9.S9.groupQ(R, [['ethanol', 0], ['propan-2-ol', 1], ['2-methylpropan-2-ol', 2], ['butan-2-ol', 1], ['benzyl alcohol', 0], ['cyclohexanol', 1]], ['1°', '2°', '3°'], 'Type of '); } },
      { title: 'Product', gen(R) { return G9.S9.pickQ(R, [['phenol + bromine water', '2,4,6-tribromophenol (white ppt)'], ['sodium phenoxide + CO₂, then H⁺', 'salicylic acid (Kolbe)'], ['phenol + CHCl₃ + NaOH, then H⁺', 'salicylaldehyde (Reimer–Tiemann)'], ['propan-2-ol + PCC/CrO₃', 'propanone'], ['ethanol + conc. H₂SO₄ at 443 K', 'ethene'], ['anisole + HI', 'phenol + CH₃I'], ['CH₃ONa + C₂H₅Br', 'CH₃OC₂H₅ (Williamson)']], 'Product: '); } },
      { title: 'Acidity order', gen(R) { return G9.S9.pickQ(R, [['phenol, ethanol, p-nitrophenol', 'p-nitrophenol > phenol > ethanol'], ['phenol, p-cresol, p-nitrophenol', 'p-nitrophenol > phenol > p-cresol'], ['water, ethanol, phenol', 'phenol > water > ethanol']], 'Decreasing acidity: '); } },
      { title: 'Distinguish', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['phenol vs ethanol', 'neutral FeCl₃ — violet with phenol'], ['propan-1-ol vs propan-2-ol', 'Lucas test — 2° turbid in ~5 min'], ['ethanol vs methanol', 'iodoform test — yellow ppt with ethanol'], ['ethanol vs diethyl ether', 'Na metal — H₂ with ethanol']], 'Test for '); } },
      { title: 'Mass from formula', levels: [2, 3], gen(R) { const c = R.pick([['phenol C₆H₅OH', 94], ['ethanol C₂H₅OH', 46], ['methanol CH₃OH', 32], ['diethyl ether (C₂H₅)₂O', 74]]); return { q: `Molar mass of ${c[0]} (C 12, H 1, O 16)?`, a: `${c[1]} g/mol`, ans: c[1] }; } }
    ],
    quiz: [
      { q: 'Most acidic', o: ['p-nitrophenol', 'phenol', 'ethanol', 'p-cresol'], a: 0, e: '−NO₂ withdraws.' }, { q: 'Lucas: immediate turbidity', o: ['3° alcohol', '1°', '2°', 'phenol'], a: 0, e: 'Carbocation.' },
      { q: 'Phenol + FeCl₃', o: ['violet', 'yellow', 'red ppt', 'no change'], a: 0, e: 'Test.' }, { q: 'Kolbe product', o: ['salicylic acid', 'salicylaldehyde', 'benzoic acid', 'aspirin'], a: 0, e: 'CO₂.' },
      { q: 'Williamson needs', o: ['1° alkyl halide', '3° alkyl halide', 'aryl halide', 'vinyl halide'], a: 0, e: 'SN2.' }, { q: 'Anisole + HI', o: ['phenol + CH₃I', 'iodobenzene + CH₃OH', 'benzene', 'no reaction'], a: 0, e: 'Aryl–O strong.' },
      { q: '2° alcohol oxidises to', o: ['ketone', 'aldehyde', 'acid', 'nothing'], a: 0, e: 'Oxidation.' }, { q: 'Methanol poisoning causes', o: ['blindness', 'deafness', 'nothing', 'hair loss'], a: 0, e: 'Toxic.' },
      { q: 'Phenol + bromine water', o: ['white ppt', 'no reaction', 'violet', 'gas'], a: 0, e: 'Tribromo.' }, { q: 'Alcohol bp higher than ether due to', o: ['H-bonding', 'mass', 'colour', 'ionic bonds'], a: 0, e: 'Intermolecular.' },
      { q: 'Phenol with NaHCO₃', o: ['no reaction', 'CO₂', 'H₂', 'ppt'], a: 0, e: 'Too weak.' }
    ],
    teach: {
      outcomes: ['Name and classify alcohols, phenols, ethers', 'Explain acidity trends', 'Write key reactions and distinguishing tests'],
      periods: [{ t: 'Alcohols', flow: [['10 min', 'Classification.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Oxidation and dehydration.']] }, { t: 'Phenols and ethers', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Kolbe, Reimer–Tiemann, Williamson.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Phenol is an alcohol in behaviour.', 'Any halide works in Williamson.'], activities: ['FeCl₃ test.', 'Lucas test demo.'],
      exit: ['Acidity order.', 'Lucas result.', 'Williamson.'], homework: 'Make a reaction map from phenol.'
    },
    slides: [{ t: 'Alcohols, Phenols and Ethers', b: ['Classification and naming', 'Acidity', 'Reactions and tests', 'Ethers'] }, { t: 'Think and share', b: ['Why is phenol acidic?', 'Why is methanol dangerous?'] }],
    fs: { groups: [['Alcohols', [['Lucas', '3° fast, 2° 5 min, 1° no'], ['Oxidation', '1° → acid, 2° → ketone'], ['Dehydration', '3° > 2° > 1°']]], ['Phenols', [['Acidity', 'phenoxide resonance'], ['Kolbe', '→ salicylic acid'], ['R–T', '→ salicylaldehyde']]], ['Ethers', [['Williamson', 'RONa + 1° RX'], ['HI', 'I to smaller alkyl'], ['Anisole + HI', 'phenol + CH₃I']]]],
      ex: [['phenol + Br₂ water', 'white 2,4,6-tribromophenol'], ['CH₃ONa + C₂H₅Br', 'methoxyethane']], rem: ['FeCl₃ violet.', '−NO₂ ↑ acidity.', '1° halide in Williamson.'] }
  });
})();
