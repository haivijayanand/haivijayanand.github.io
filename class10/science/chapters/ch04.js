/*
TOOL:    class10_science_ch04
FAMILY:  CBSE_REVISION / Class 10 Science (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 4 Carbon and its Compounds (covalent bonding, allotropes, catenation, homologous series, functional groups, IUPAC names, combustion, oxidation, addition, substitution, ethanol, ethanoic acid, esterification, soaps and detergents) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const PRE = ['meth', 'eth', 'prop', 'but', 'pent', 'hex', 'hept', 'oct'];
  const SUB = n => String(n).split('').map(d => '₀₁₂₃₄₅₆₇₈₉'[d]).join('');
  const fml = (n, k) => { const H = k === 0 ? 2 * n + 2 : k === 1 ? 2 * n : 2 * n - 2; return `C${n > 1 ? SUB(n) : ''}H${SUB(H)}`; };
  G9.register({
    no: 4, part: 'All chapters', short: 'Carbon', title: 'Carbon and its Compounds',
    blurb: 'Covalent bonding (electron-dot structures of H₂, O₂, N₂, CH₄), allotropes (diamond, graphite, fullerene), catenation and tetravalency; saturated and unsaturated hydrocarbons; homologous series; functional groups and nomenclature; combustion, oxidation, addition and substitution; ethanol and ethanoic acid; esterification; soaps and detergents (micelles).',
    revise: {
      oneLine: 'Carbon forms covalent bonds by sharing electrons (tetravalency) and long chains (catenation). Alkanes CₙH₂ₙ₊₂ (single bonds, saturated), alkenes CₙH₂ₙ (double), alkynes CₙH₂ₙ₋₂ (triple). A homologous series differs by –CH₂– (14 u). Functional groups: –OH alcohol (-ol), –CHO aldehyde (-al), >C=O ketone (-one), –COOH carboxylic acid (-oic acid), –Cl/–Br halo (chloro-/bromo-). Ethanol + ethanoic acid → ester (sweet smell). Soaps form micelles that trap oily dirt; detergents work in hard water too.',
      sections: [
        { h: 'Reactions', html: `<p>Combustion: CH₄ + 2O₂ → CO₂ + 2H₂O. Oxidation: ethanol → ethanoic acid (alkaline KMnO₄). Addition: vegetable oil + H₂ (Ni) → vanaspati. Substitution: CH₄ + Cl₂ (sunlight) → CH₃Cl + HCl.</p>` },
        { h: 'Ethanol', html: `<p>2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂; conc. H₂SO₄ at 443 K dehydrates it to ethene. Ethanoic acid (vinegar ~5–8%) reacts with NaHCO₃ to give CO₂.</p>` },
        { h: 'Soaps', html: `<p>Soap molecule: ionic head (water-loving) + long hydrocarbon tail (oil-loving); tails trap oil inside micelles. Hard water (Ca²⁺, Mg²⁺) forms scum with soap.</p>` }
      ],
      formulas: [['Alkane', 'CₙH₂ₙ₊₂'], ['Alkene', 'CₙH₂ₙ'], ['Alkyne', 'CₙH₂ₙ₋₂'], ['Homologues differ by', 'CH₂ = 14 u'], ['Esterification', 'acid + alcohol → ester + water (conc. H₂SO₄)'], ['Saponification', 'ester + NaOH → soap + alcohol']],
      terms: [['Catenation', 'carbon linking to carbon in chains/rings'], ['Functional group', 'atom/group that decides properties'], ['Micelle', 'cluster of soap molecules around oil']],
      traps: ['Unsaturated hydrocarbons burn with a sooty flame.', 'Diamond does not conduct; graphite does.', 'Count the longest chain including the functional-group carbon.'],
      bridge: '<p>Class 11–12 Organic Chemistry builds on these ideas.</p>'
    },
    explore: [
      { title: 'Hydrocarbon namer', intro: 'Choose carbon count and bond type; see name, formula and molar mass.',
        build(el, K) { let n = 3, k = 0; const row = K.row(el); K.slider(row, 'carbons', 1, 8, 1, n, v => { n = v; draw(); }); K.select(row, 'type', ['alkane (single)', 'alkene (double)', 'alkyne (triple)'], i => { k = i; draw(); }); const rd = K.read(el);
          function draw() { if (k && n < 2) { rd.innerHTML = 'An alkene or alkyne needs at least 2 carbons.'; return; } const H = k === 0 ? 2 * n + 2 : k === 1 ? 2 * n : 2 * n - 2; const nm = PRE[n - 1] + ['ane', 'ene', 'yne'][k]; rd.innerHTML = `<b>${nm}</b> · formula <b>${fml(n, k)}</b> · molar mass = 12×${n} + 1×${H} = <b>${12 * n + H} g/mol</b> · ${k ? 'unsaturated — sooty flame, adds H₂' : 'saturated — clean blue flame'}`; } draw(); return null; } },
      { title: 'How soap cleans', intro: '<kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Soap molecule', 'Long hydrocarbon tail (hydrophobic) + ionic –COO⁻Na⁺ head (hydrophilic).'], ['In water with oil', 'Tails dissolve in the oily dirt; heads face the water.'], ['Micelle', 'Molecules form a ball with oil trapped in the centre.'], ['Rinse', 'Micelles stay suspended; water carries the dirt away.'], ['Hard water', 'Ca²⁺/Mg²⁺ react with soap to form scum; detergents (sulphonate heads) don’t.']] }); } }
    ],
    gens: [
      { title: 'Formula', gen(R) { const n = R.int(1, 8), k = n < 2 ? 0 : R.int(0, 2); return { q: `Molecular formula of ${PRE[n - 1]}${['ane', 'ene', 'yne'][k]}?`, a: fml(n, k) }; } },
      { title: 'Molar mass', gen(R) { const n = R.int(1, 8), k = n < 2 ? 0 : R.int(0, 2); const H = k === 0 ? 2 * n + 2 : k === 1 ? 2 * n : 2 * n - 2; return { q: `Molar mass of ${fml(n, k)}? (C 12, H 1)`, a: `${12 * n + H} g/mol`, ans: 12 * n + H }; } },
      { title: 'Functional group', gen(R) { const F = [['ethanol', 'alcohol (–OH)'], ['propanal', 'aldehyde (–CHO)'], ['propanone', 'ketone (>C=O)'], ['ethanoic acid', 'carboxylic acid (–COOH)'], ['chloromethane', 'halo (–Cl)'], ['butanol', 'alcohol (–OH)']]; const f = R.pick(F); return { q: `Functional group in ${f[0]}?`, a: f[1] }; } },
      { title: 'Reaction type', gen(R) { return G9.S9.groupQ(R, [['CH₄ + 2O₂ → CO₂ + 2H₂O', 0], ['C₂H₄ + H₂ → C₂H₆ (Ni)', 1], ['CH₄ + Cl₂ → CH₃Cl + HCl (light)', 2], ['ethanol → ethanoic acid (KMnO₄)', 3], ['oil + H₂ → vanaspati', 1]], ['combustion', 'addition', 'substitution', 'oxidation'], 'Type: '); } },
      { title: 'Homologous series', levels: [2, 3], gen(R) { const a = R.int(1, 5), d = R.int(1, 3); return { q: `Mass difference between the alkane with ${a} C and the one with ${a + d} C?`, a: `${14 * d} u`, ans: 14 * d }; } }
    ],
    quiz: [
      { q: 'Alkene formula', o: ['CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂', 'CₙHₙ'], a: 0, e: 'Double bond.' }, { q: 'Propane', o: ['C₃H₈', 'C₃H₆', 'C₃H₄', 'C₂H₆'], a: 0, e: '2n+2.' },
      { q: '–COOH is', o: ['carboxylic acid', 'alcohol', 'ketone', 'aldehyde'], a: 0, e: '-oic acid.' }, { q: 'Conducting allotrope', o: ['graphite', 'diamond', 'fullerene', 'none'], a: 0, e: 'Free electrons.' },
      { q: 'Vanaspati from oil by', o: ['addition of H₂', 'substitution', 'combustion', 'oxidation'], a: 0, e: 'Hydrogenation.' }, { q: 'Ester smell', o: ['sweet, fruity', 'pungent', 'none', 'rotten'], a: 0, e: 'Esters.' },
      { q: 'Homologues differ by', o: ['CH₂', 'CH₃', 'C', 'H₂'], a: 0, e: '14 u.' }, { q: 'Soap scum forms in', o: ['hard water', 'soft water', 'pure water', 'oil'], a: 0, e: 'Ca²⁺.' },
      { q: 'Sooty flame', o: ['unsaturated hydrocarbon', 'methane', 'hydrogen', 'alcohol'], a: 0, e: 'Incomplete.' }, { q: 'Carbon valency', o: ['4', '2', '3', '1'], a: 0, e: 'Tetravalent.' },
      { q: 'CH₄ + Cl₂ in sunlight', o: ['substitution', 'addition', 'oxidation', 'neutralisation'], a: 0, e: 'Replace H.' }
    ],
    teach: {
      outcomes: ['Draw covalent structures', 'Name compounds and identify groups', 'Describe key reactions and soaps'],
      periods: [{ t: 'Bonding and series', flow: [['10 min', 'Electron-dot practice.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Naming drill.']] }, { t: 'Reactions and soaps', flow: [['15 min', 'Esterification demo.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['All carbon forms conduct.', 'Soap works same in hard water.'], activities: ['Ball-and-stick models.', 'Soap in hard vs soft water.'],
      exit: ['Three general formulae.', 'Name a compound.', 'Micelle explanation.'], homework: 'Draw structures of the first five alkanes and alcohols.'
    },
    slides: [{ t: 'Carbon and its Compounds', b: ['Covalent bonding', 'Homologous series', 'Functional groups', 'Reactions, ethanol, soaps'] }, { t: 'Think and share', b: ['Why sooty flames?', 'How do micelles clean?'] }],
    fs: { groups: [['Formulae', [['Alkane', 'CₙH₂ₙ₊₂'], ['Alkene', 'CₙH₂ₙ'], ['Alkyne', 'CₙH₂ₙ₋₂']]], ['Groups', [['–OH', '-ol'], ['–CHO', '-al'], ['>C=O', '-one'], ['–COOH', '-oic acid']]], ['Reactions', [['Addition', 'unsaturated + H₂'], ['Substitution', 'Cl replaces H'], ['Ester', 'acid + alcohol'], ['Soap', 'micelles']]]],
      ex: [['butene', 'C₄H₈, 56 g/mol'], ['C₃ vs C₅ alkane', '28 u apart']], rem: ['Prefix = carbons.', 'Suffix = group.', 'Unsaturated adds H₂.'] }
  });
})();
