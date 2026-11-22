/*
TOOL:    class11_physics_ch01
FAMILY:  CBSE_REVISION / Class 11 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 1 Units and Measurements (SI units, significant figures, errors and their propagation, dimensions, dimensional analysis) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  const DIM = [['velocity', 'L T⁻¹'], ['acceleration', 'L T⁻²'], ['force', 'M L T⁻²'], ['work / energy', 'M L² T⁻²'], ['power', 'M L² T⁻³'], ['pressure', 'M L⁻¹ T⁻²'], ['momentum', 'M L T⁻¹'], ['density', 'M L⁻³'], ['frequency', 'T⁻¹'], ['G (gravitational constant)', 'M⁻¹ L³ T⁻²']];
  G9.register({
    no: 1, part: 'Part I', short: 'Units', title: 'Units and Measurements',
    blurb: 'SI base and derived units; significant figures and rounding; accuracy and precision; absolute, relative and percentage errors and how they combine in sums, products and powers; dimensions and dimensional formulae; uses and limits of dimensional analysis.',
    revise: {
      oneLine: 'Seven SI base units: m, kg, s, A, K, mol, cd. Significant figures show the precision of a measurement; in multiplication/division the result keeps the least number of significant figures, in addition/subtraction the least decimal places. Errors: for Z = A ± B, ΔZ = ΔA + ΔB; for Z = AᵖBᵠ/Cʳ, ΔZ/Z = p ΔA/A + q ΔB/B + r ΔC/C. Dimensional analysis checks equations and converts units but cannot find dimensionless constants.',
      sections: [
        { h: 'Significant figures', html: `<p>All non-zero digits count; zeros between them count; leading zeros don’t; trailing zeros after a decimal point count. 0.004060 has 4 significant figures.</p>` },
        { h: 'Errors', html: `<p>Mean absolute error Δa = mean of |aᵢ − ā|; relative error Δa/ā; percentage error × 100. Systematic errors (instrument, method) vs random errors.</p>` },
        { h: 'Dimensions', html: `<p>Principle of homogeneity: each term in a valid equation has the same dimensions. Example: T = 2π√(l/g) is dimensionally consistent.</p>` }
      ],
      formulas: [['Sum/difference', 'ΔZ = ΔA + ΔB'], ['Product/quotient', 'ΔZ/Z = ΔA/A + ΔB/B'], ['Power', 'Δ(Aⁿ)/Aⁿ = n ΔA/A'], ['Force', '[M L T⁻²]'], ['Energy', '[M L² T⁻²]']],
      terms: [['Accuracy', 'closeness to the true value'], ['Precision', 'resolution / closeness of repeated readings'], ['Dimensional formula', 'powers of M, L, T… in a quantity']],
      traps: ['Errors always add (never subtract).', 'Dimensionally correct ≠ physically correct.', 'Trailing zeros in 1500 are ambiguous — use 1.5 × 10³.'],
      bridge: '<p>Every chapter uses units, dimensions and error estimates.</p>'
    },
    explore: [
      { title: 'Error propagation', intro: 'Measure a pendulum: l and T with errors; see the percentage error in g = 4π²l/T².',
        build(el, K) { let l = 100, dl = 0.1, T = 2.0, dT = 0.01; const row = K.row(el); K.slider(row, 'l (cm)', 20, 150, 1, l, v => { l = v; draw(); }); K.slider(row, 'Δl (cm)', 0.05, 1, 0.05, dl, v => { dl = v; draw(); }); K.slider(row, 'T (s)', 0.9, 2.5, 0.01, T, v => { T = v; draw(); }); K.slider(row, 'ΔT (s)', 0.005, 0.1, 0.005, dT, v => { dT = v; draw(); }); const rd = K.read(el);
          function draw() { const g = 4 * Math.PI ** 2 * (l / 100) / (T * T); const pe = 100 * (dl / l + 2 * dT / T); rd.innerHTML = `g = 4π²l/T² = <b>${f(g)} m/s²</b> · % error = Δl/l + 2ΔT/T = ${f(100 * dl / l)}% + ${f(200 * dT / T)}% = <b>${f(pe)}%</b> → g = ${f(g)} ± ${f(g * pe / 100)} m/s² · T is squared, so its error counts double`; } draw(); return null; } },
      { title: 'Dimensions lookup', intro: 'Sort quantities by whether they contain mass (M).',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Contains M', 'No M'], items: DIM.map(d => [`${d[0]} [${d[1]}]`, d[1].includes('M') ? 0 : 1]) }); } }
    ],
    gens: [
      { title: 'Significant figures', gen(R) { const S = [['0.004060', 4], ['2.300', 4], ['1.20 × 10³', 3], ['50.05', 4], ['0.0005', 1], ['6.022 × 10²³', 4], ['3.0800', 5]]; const s = R.pick(S); return { q: `Significant figures in ${s[0]}?`, a: String(s[1]), ans: s[1] }; } },
      { title: 'Dimensions', gen(R) { const d = R.pick(DIM); return { q: `Dimensional formula of ${d[0]}?`, a: `[${d[1]}]` }; } },
      { title: 'Product error', gen(R) { const a = R.int(1, 4), b = R.int(1, 4); return { q: `Z = A·B². A has ${a}% error and B has ${b}% error. % error in Z?`, a: `${a + 2 * b}%`, ans: a + 2 * b }; } },
      { title: 'Sum error', levels: [2, 3], gen(R) { const A = R.int(20, 60), dA = R.int(1, 5) / 10, B = R.int(10, 40), dB = R.int(1, 5) / 10; return { q: `A = ${A} ± ${dA} cm, B = ${B} ± ${dB} cm. Find A + B with error.`, a: `${A + B} ± ${+(dA + dB).toFixed(1)} cm`, ans: dA + dB, tol: 1e-6 }; } },
      { title: 'Unit conversion', levels: [2, 3], gen(R) { return R.chance(.5) ? { q: 'Convert 1 joule to erg using dimensions [M L² T⁻²] (1 kg = 10³ g, 1 m = 10² cm).', a: '10⁷ erg', ans: 1e7 } : { q: 'Convert 1 newton to dyne using [M L T⁻²].', a: '10⁵ dyne', ans: 1e5 }; } }
    ],
    quiz: [
      { q: 'SI base units count', o: ['7', '5', '6', '9'], a: 0, e: 'Seven.' }, { q: 'Dimensions of force', o: ['M L T⁻²', 'M L² T⁻²', 'M L T⁻¹', 'L T⁻²'], a: 0, e: 'ma.' },
      { q: 'Sig figs in 0.00320', o: ['3', '5', '2', '6'], a: 0, e: '3, 2, 0.' }, { q: 'Z = A/B errors', o: ['relative errors add', 'subtract', 'multiply', 'ignored'], a: 0, e: 'Add.' },
      { q: 'Error in A³ (A 2%)', o: ['6%', '2%', '8%', '1.5%'], a: 0, e: '3 × 2.' }, { q: 'Dimensionless', o: ['strain', 'force', 'speed', 'energy'], a: 0, e: 'Ratio.' },
      { q: 'Same dimensions as work', o: ['torque', 'power', 'force', 'momentum'], a: 0, e: 'N m.' }, { q: 'Dimensional analysis cannot find', o: ['numerical constants', 'unit conversion', 'consistency', 'relation forms'], a: 0, e: 'Constants.' },
      { q: '1 J =', o: ['10⁷ erg', '10⁵ erg', '10³ erg', '1 erg'], a: 0, e: 'CGS.' }, { q: 'Precision relates to', o: ['resolution of instrument', 'true value', 'colour', 'mass'], a: 0, e: 'Least count.' },
      { q: 'Dimensions of power', o: ['M L² T⁻³', 'M L² T⁻²', 'M L T⁻³', 'M L² T⁻¹'], a: 0, e: 'J/s.' }
    ],
    teach: {
      outcomes: ['Use SI units and significant figures', 'Propagate errors', 'Apply dimensional analysis'],
      periods: [{ t: 'Measurement', flow: [['10 min', 'Vernier/screw gauge readings.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Sig-fig drill.']] }, { t: 'Dimensions', flow: [['15 min', 'Derive T ∝ √(l/g).'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Errors can cancel.', 'Dimensionally correct means right.'], activities: ['Pendulum g with error.', 'Unit conversion by dimensions.'],
      exit: ['Product error rule.', 'Dimensions of 3 quantities.', 'Sig figs.'], homework: 'Find g from 5 pendulum readings with error analysis.'
    },
    slides: [{ t: 'Units and Measurements', b: ['SI units', 'Significant figures', 'Errors', 'Dimensions'] }, { t: 'Think and share', b: ['Why does T’s error count twice in g?', 'Can dimensions find 2π?'] }],
    fs: { groups: [['Errors', [['Sum', 'ΔA + ΔB'], ['Product', 'ΔA/A + ΔB/B'], ['Power n', 'n ΔA/A']]], ['Dimensions', [['Force', 'MLT⁻²'], ['Energy', 'ML²T⁻²'], ['Power', 'ML²T⁻³'], ['Pressure', 'ML⁻¹T⁻²']]], ['Sig figs', [['×, ÷', 'least sig figs'], ['+, −', 'least decimals']]]],
      ex: [['A 1%, B 2%, Z = AB²', '5%'], ['1 N', '10⁵ dyne']], rem: ['Errors add.', 'Check homogeneity.', 'Write in scientific notation.'] }
  });
})();
