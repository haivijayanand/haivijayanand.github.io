/*
TOOL:    class10_science_ch02
FAMILY:  CBSE_REVISION / Class 10 Science (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 2 Acids, Bases and Salts (indicators, reactions of acids and bases, pH scale, importance of pH, salts, common salt products: NaOH, bleaching powder, baking soda, washing soda, plaster of Paris) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const PH = [['gastric juice', 1.5], ['lemon juice', 2.2], ['vinegar', 2.8], ['tomato juice', 4.2], ['milk', 6.6], ['pure water', 7], ['blood', 7.4], ['baking soda solution', 8.3], ['milk of magnesia', 10.5], ['lime water', 12.4], ['NaOH solution', 14]];
  const SALTS = [['sodium hydroxide', 'NaOH', 'chlor-alkali process: electrolysis of brine', 'soaps, paper, degreasing'], ['bleaching powder', 'CaOCl₂', 'Cl₂ + dry slaked lime Ca(OH)₂', 'bleaching, disinfecting water'], ['baking soda', 'NaHCO₃', 'NaCl + H₂O + CO₂ + NH₃', 'baking powder, antacid, fire extinguishers'], ['washing soda', 'Na₂CO₃·10H₂O', 'recrystallising sodium carbonate', 'glass, removing hardness, cleaning'], ['plaster of Paris', 'CaSO₄·½H₂O', 'heating gypsum at 373 K', 'fracture casts, toys, decoration']];
  G9.register({
    no: 2, part: 'All chapters', short: 'Acids and bases', title: 'Acids, Bases and Salts',
    blurb: 'Indicators (litmus, phenolphthalein, methyl orange, olfactory); reactions of acids and bases with metals, carbonates and each other; H⁺ and OH⁻ ions in water; strength and the pH scale; pH in digestion, soil, tooth decay and stings; salts, families of salts, water of crystallisation; NaOH, bleaching powder, baking soda, washing soda and plaster of Paris.',
    revise: {
      oneLine: 'Acids give H⁺ (H₃O⁺) ions in water; bases give OH⁻ ions (soluble bases are alkalis). Acid + metal → salt + H₂; acid + carbonate → salt + water + CO₂; acid + base → salt + water (neutralisation). pH < 7 acidic, 7 neutral, > 7 basic; each pH unit is a ×10 change in H⁺. Common salt is the raw material for NaOH, Cl₂, bleaching powder, baking soda and washing soda.',
      sections: [
        { h: 'pH in life', html: `<p>Stomach HCl ≈ pH 1–2 (antacids neutralise excess); tooth enamel decays below pH 5.5; bee sting (acid) treated with baking soda; acid rain below 5.6 harms life.</p>` },
        { h: 'Dilution', html: `<p>Always add acid to water slowly, not water to acid — the reaction is highly exothermic.</p>` },
        { h: 'Water of crystallisation', html: `<p>CuSO₄·5H₂O is blue; heating removes water → white anhydrous CuSO₄; adding water restores blue.</p>` }
      ],
      formulas: [['Acid + metal', 'salt + H₂'], ['Acid + carbonate', 'salt + H₂O + CO₂'], ['Neutralisation', 'acid + base → salt + water'], ['pH', '< 7 acid, 7 neutral, > 7 base'], ['Plaster of Paris', 'CaSO₄·½H₂O'], ['Gypsum', 'CaSO₄·2H₂O']],
      terms: [['Alkali', 'base soluble in water'], ['pH', 'measure of H⁺ concentration (0–14)'], ['Water of crystallisation', 'fixed water molecules in a salt’s crystal']],
      traps: ['pH 3 is 10 times more acidic than pH 4.', 'Not all bases are alkalis.', 'Add acid to water, never water to concentrated acid.'],
      bridge: '<p>Class 11 Chemistry: ionic equilibrium and pH calculations.</p>'
    },
    explore: [
      { title: 'pH scale', intro: 'Choose a substance; see where it lies on the pH scale (typical values).',
        build(el, K) { let k = 5; const row = K.row(el); const s = K.select(row, 'substance', PH.map(p => p[0]), i => { k = i; b.redraw(); }); s.value = 5; const b = new K.Board(el, { xmin: -0.5, xmax: 14.5, ymin: -1.5, ymax: 2, axes: false, grid: 0, aspect: 0.25 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); for (let i = 0; i < 14; i++) { const t = i / 13; const col = i < 7 ? `rgb(${234 - i * 8},${88 + i * 18},${12 + i * 20})` : i === 7 ? '#d4d4d8' : `rgb(${60 - (i - 7) * 5},${100 - (i - 7) * 6},${200 + (i - 7) * 5})`; b.rect(i, 0, 1, 0.8, { fill: col, color: '#fff', w: 1 }); b.text(i, -0.4, String(i), { font: '10px' }); b.line(i, 0, i, -0.15, { color: C.ink, w: 1 }); } b.text(14, -0.4, '14', { font: '10px' }); const p = PH[k][1]; b.arrow(p, 1.8, p, 0.9, { color: C.ink, w: 3 }); b.text(p, 1.95, PH[k][0], { font: 'bold 11px' });
            rd.innerHTML = `<b>${PH[k][0]}</b>: pH ≈ ${p} → <b>${p < 7 ? 'acidic' : p > 7 ? 'basic' : 'neutral'}</b> · [H⁺] is ${p === 7 ? 'equal to [OH⁻]' : (10 ** Math.abs(7 - p) >= 1000 ? (10 ** Math.round(Math.abs(7 - p))).toLocaleString('en-IN') : (+(10 ** Math.abs(7 - p)).toFixed(1))) + ' times ' + (p < 7 ? 'more' : 'less') + ' than in pure water'}`; };
          b.redraw(); return null; } },
      { title: 'Salts from common salt', intro: 'Choose a chemical; see formula, how it is made and uses. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'chemical', SALTS.map(s => s[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { const s = SALTS[k]; rd.innerHTML = `<b>${s[0]}</b> (${s[1]}) · made by: ${s[2]} · uses: ${s[3]}`; } const step = () => { k = (k + 1) % SALTS.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } }
    ],
    gens: [
      { title: 'pH ratio', gen(R) { const a = R.int(1, 5), d = R.int(1, 4); return { q: `How many times more H⁺ ions in a solution of pH ${a} than one of pH ${a + d}?`, a: String(10 ** d), ans: 10 ** d }; } },
      { title: 'Products', gen(R) { return G9.S9.pickQ(R, [['Zn + H₂SO₄ gives?', 'ZnSO₄ + H₂'], ['Na₂CO₃ + 2HCl gives?', '2NaCl + H₂O + CO₂'], ['NaOH + HCl gives?', 'NaCl + H₂O'], ['Gas given by acid + metal, and its test?', 'hydrogen — burns with a pop'], ['Gas from acid + carbonate, and its test?', 'CO₂ — turns lime water milky']]); } },
      { title: 'Acid or base', gen(R) { const p = R.pick(PH); return { q: `pH of ${p[0]} ≈ ${p[1]}. Acidic, neutral or basic?`, a: p[1] < 7 ? 'acidic' : p[1] > 7 ? 'basic' : 'neutral' }; } },
      { title: 'Chemicals', levels: [2, 3], gen(R) { const s = R.pick(SALTS); return R.chance(.5) ? { q: `Formula of ${s[0]}?`, a: s[1] } : { q: `Name a use of ${s[0]}.`, a: s[3] }; } },
      { title: 'Water of crystallisation', levels: [2, 3], gen(R) { const m = R.pick([25, 50, 100, 250]); const w = m * 90 / 249.5; return { q: `CuSO₄·5H₂O has molar mass ≈ 249.5 g/mol (5 H₂O = 90 g). Mass of water lost on heating ${m} g of it?`, a: `${(+w.toFixed(1))} g`, ans: w, tol: 0.1 }; } }
    ],
    quiz: [
      { q: 'pH of pure water', o: ['7', '0', '14', '1'], a: 0, e: 'Neutral.' }, { q: 'Acid + carbonate gas', o: ['CO₂', 'H₂', 'O₂', 'Cl₂'], a: 0, e: 'Lime water.' },
      { q: 'Plaster of Paris', o: ['CaSO₄·½H₂O', 'CaSO₄·2H₂O', 'CaCO₃', 'CaOCl₂'], a: 0, e: 'Hemihydrate.' }, { q: 'Baking soda', o: ['NaHCO₃', 'Na₂CO₃', 'NaOH', 'NaCl'], a: 0, e: 'Bicarbonate.' },
      { q: 'Tooth decay below pH', o: ['5.5', '8', '7', '10'], a: 0, e: 'Enamel.' }, { q: 'Phenolphthalein in base', o: ['pink', 'colourless', 'red', 'blue'], a: 0, e: 'Pink.' },
      { q: 'Dilute acid by', o: ['adding acid to water', 'adding water to acid', 'heating', 'freezing'], a: 0, e: 'Safety.' }, { q: 'Bleaching powder', o: ['CaOCl₂', 'NaOCl only', 'CaCO₃', 'NaCl'], a: 0, e: 'Formula.' },
      { q: 'pH 2 vs pH 4', o: ['100× more H⁺', '2× more', '10× less', 'same'], a: 0, e: '10².' }, { q: 'Chlor-alkali products', o: ['NaOH, Cl₂, H₂', 'NaCl only', 'O₂ only', 'CO₂'], a: 0, e: 'Brine.' },
      { q: 'Washing soda', o: ['Na₂CO₃·10H₂O', 'NaHCO₃', 'CaSO₄', 'KOH'], a: 0, e: 'Decahydrate.' }
    ],
    teach: {
      outcomes: ['Write reactions of acids and bases', 'Use the pH scale', 'Know preparation and uses of key salts'],
      periods: [{ t: 'Reactions and pH', flow: [['10 min', 'Indicator tests.'], ['15 min', 'Explore panel 1 / universal indicator.'], ['15 min', 'Zn + HCl, Na₂CO₃ + HCl.']] }, { t: 'Salts', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Heat CuSO₄ crystals.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['pH is linear.', 'All bases dissolve.'], activities: ['Universal indicator chart.', 'Anhydrous CuSO₄ colour change.'],
      exit: ['Three acid reactions.', 'pH comparison.', 'Two salts with uses.'], homework: 'Test pH of 6 household items with indicator paper.'
    },
    slides: [{ t: 'Acids, Bases and Salts', b: ['Indicators', 'Reactions', 'pH scale', 'Important salts'] }, { t: 'Think and share', b: ['Why antacids?', 'Why add acid to water?'] }],
    fs: { groups: [['Reactions', [['Acid + metal', 'salt + H₂'], ['Acid + carbonate', 'salt + H₂O + CO₂'], ['Acid + base', 'salt + H₂O']]], ['pH', [['Scale', '0–14'], ['Neutral', '7'], ['Each unit', '×10 H⁺']]], ['Salts', [['NaOH', 'chlor-alkali'], ['CaOCl₂', 'bleaching'], ['NaHCO₃', 'baking'], ['Na₂CO₃·10H₂O', 'washing'], ['CaSO₄·½H₂O', 'PoP']]]],
      ex: [['pH 3 vs 6', '1000×'], ['Zn + 2HCl', 'ZnCl₂ + H₂']], rem: ['pH is logarithmic.', 'Acid into water.', 'Learn salt formulas.'] }
  });
})();
