/*
TOOL:    class11_physics_ch08
FAMILY:  CBSE_REVISION / Class 11 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 8 Mechanical Properties of Solids (stress, strain, Hooke’s law, stress–strain curve, Young’s, bulk and shear moduli, Poisson’s ratio, elastic energy, applications) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  const Y = [['steel', 2e11], ['copper', 1.1e11], ['aluminium', 7e10], ['glass', 6.5e10], ['wood', 1.3e10], ['bone', 9.4e9], ['rubber', 0.01e9]];
  G9.register({
    no: 8, part: 'Part II', short: 'Elasticity', title: 'Mechanical Properties of Solids',
    blurb: 'Elastic and plastic behaviour; stress (tensile, compressive, shearing, hydraulic) and strain; Hooke’s law; the stress–strain curve — proportional limit, yield point, ultimate strength, fracture; Young’s modulus, shear modulus and bulk modulus; Poisson’s ratio; elastic potential energy in a stretched wire; uses in beams, cranes and mountains.',
    revise: {
      oneLine: 'Stress = F/A (Pa); strain = ΔL/L (no unit). Within the elastic limit stress ∝ strain (Hooke’s law). Young’s modulus Y = (F/A)/(ΔL/L) = FL/(AΔL); shear modulus G = shear stress/shear strain; bulk modulus B = −pV/ΔV (compressibility = 1/B). Elastic energy per unit volume = ½ × stress × strain. Steel is more elastic than rubber (larger Y).',
      sections: [
        { h: 'Stress–strain curve', html: `<p>Linear up to the proportional limit; elastic limit (yield point) beyond which permanent set occurs; ultimate tensile strength; fracture. Ductile materials have a long plastic region; brittle ones break soon after the elastic limit.</p>` },
        { h: 'Applications', html: `<p>Crane rope thickness chosen from breaking stress with a safety factor; I-section beams resist bending (sag δ ∝ W L³/(Y b d³)); mountain height limited by rock’s yield stress.</p>` },
        { h: 'Poisson’s ratio', html: `<p>Lateral strain ÷ longitudinal strain; about 0.28–0.30 for steel.</p>` }
      ],
      formulas: [['Stress', 'F/A'], ['Strain', 'ΔL/L'], ['Y', 'FL/(AΔL)'], ['B', '−pV/ΔV'], ['Energy density', '½ stress × strain'], ['Energy in wire', '½ F ΔL']],
      terms: [['Elastic limit', 'max stress for full recovery'], ['Modulus', 'stress ÷ strain'], ['Plasticity', 'permanent deformation']],
      traps: ['Higher Y means stiffer (more elastic in physics sense), so steel > rubber.', 'Strain has no unit.', 'Modulus is a material property, not dependent on wire length.'],
      bridge: '<p>Ch 9 deals with fluids, which have bulk modulus but no shear modulus.</p>'
    },
    explore: [
      { title: 'Stretch a wire', intro: 'Choose material, load, length and diameter; see extension.',
        build(el, K) { let k = 0, F = 500, L = 2, d = 1; const row = K.row(el); K.select(row, 'material', Y.map(y => y[0]), i => { k = i; draw(); }); K.slider(row, 'load (N)', 10, 2000, 10, F, v => { F = v; draw(); }); K.slider(row, 'length (m)', 0.5, 5, 0.1, L, v => { L = v; draw(); }); K.slider(row, 'diameter (mm)', 0.2, 5, 0.1, d, v => { d = v; draw(); }); const rd = K.read(el);
          function draw() { const A = Math.PI * (d / 2000) ** 2; const st = F / A, dL = F * L / (A * Y[k][1]); rd.innerHTML = `stress = F/A = <b>${f(st)} Pa</b> · Y = ${f(Y[k][1])} Pa · ΔL = FL/(AY) = <b>${f(dL * 1000)} mm</b> · strain = ${f(dL / L)} · energy stored = ½FΔL = ${f(0.5 * F * dL)} J${k === Y.length - 1 ? ' (rubber: Hooke’s law holds only for small strains)' : ''}`; } draw(); return null; } },
      { title: 'Stress–strain curve', intro: '<kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { const pts = [[0, 0], [2, 4], [2.6, 4.6], [3.2, 4.4], [6, 6], [7.5, 5.2]]; const dr = k => b => { b.line(0, 0, 8, 0, { color: C.ink, w: 1.5 }); b.line(0, 0, 0, 6.5, { color: C.ink, w: 1.5 }); b.text(7.5, -0.4, 'strain', { font: '11px' }); b.text(0.6, 6.5, 'stress', { font: '11px' }); for (let i = 0; i < k && i < pts.length - 1; i++) b.line(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], { color: C.blue, w: 3 }); if (k) b.dot(pts[Math.min(k, 5)][0], pts[Math.min(k, 5)][1], { r: 6, color: C.orange }); };
          return G9.S9.stages(el, K, { board: { xmin: -0.5, xmax: 8.5, ymin: -0.8, ymax: 7, axes: false, grid: 0, aspect: 0.5 }, stages: [['Start', 'No load.', dr(0)], ['Proportional limit', 'Straight line — Hooke’s law; slope = Y.', dr(1)], ['Elastic limit / yield', 'Up to here the wire recovers fully.', dr(2)], ['Plastic flow', 'Strain grows with little extra stress; permanent set.', dr(3)], ['Ultimate strength', 'Maximum stress the wire can bear.', dr(4)], ['Fracture', 'Necking, then breaking.', dr(5)]] }); } }
    ],
    gens: [
      { title: 'Young’s modulus', gen(R) { const F = R.int(1, 10) * 100, L = R.pick([1, 2, 3]), A = R.pick([1e-6, 2e-6, 5e-6]), dL = R.pick([0.5e-3, 1e-3, 2e-3]); const Yv = F * L / (A * dL); return { q: `F = ${F} N, L = ${L} m, A = ${A.toExponential(0)} m², ΔL = ${dL * 1000} mm. Young’s modulus?`, a: `${Yv.toExponential(2)} Pa`, ans: Yv, tol: Yv * 1e-3 }; } },
      { title: 'Stress and strain', gen(R) { const F = R.int(1, 50) * 100, A = R.pick([1e-4, 2e-4, 5e-4]); return { q: `A force of ${F} N acts on area ${A.toExponential(0)} m². Stress?`, a: `${(F / A).toExponential(2)} Pa`, ans: F / A, tol: F / A * 1e-3 }; } },
      { title: 'Bulk modulus', levels: [2, 3], gen(R) { const p = R.pick([1e6, 5e6, 1e7]), fr = R.pick([0.001, 0.002, 0.005]); return { q: `A pressure of ${p.toExponential(0)} Pa reduces a liquid’s volume by ${fr * 100}%. Bulk modulus?`, a: `${(p / fr).toExponential(2)} Pa`, ans: p / fr, tol: p / fr * 1e-3 }; } },
      { title: 'Elastic energy', levels: [2, 3], gen(R) { const F = R.int(1, 10) * 100, dL = R.pick([1, 2, 4, 5]); return { q: `A wire stretched ${dL} mm by ${F} N. Elastic energy stored?`, a: `${f(0.5 * F * dL / 1000)} J`, ans: 0.5 * F * dL / 1000, tol: 1e-6 }; } },
      { title: 'Concepts', gen(R) { return G9.S9.pickQ(R, [['Which is more elastic, steel or rubber?', 'steel (larger Y)'], ['What is the unit of strain?', 'none (ratio)'], ['Why are beams I-shaped?', 'resist bending with less material'], ['Do liquids have a shear modulus?', 'no (they flow)']]); } }
    ],
    quiz: [
      { q: 'Stress unit', o: ['Pa', 'N', 'none', 'J'], a: 0, e: 'N/m².' }, { q: 'Hooke’s law', o: ['stress ∝ strain', 'stress ∝ 1/strain', 'F ∝ A', 'none'], a: 0, e: 'Elastic.' },
      { q: 'More elastic', o: ['steel', 'rubber', 'clay', 'wax'], a: 0, e: 'Higher Y.' }, { q: 'Y =', o: ['FL/(AΔL)', 'FA/(LΔL)', 'F/A', 'ΔL/L'], a: 0, e: 'Modulus.' },
      { q: 'Energy density', o: ['½ stress × strain', 'stress × strain', 'stress/strain', '½ Y'], a: 0, e: 'Area under line.' }, { q: 'Bulk modulus relates to', o: ['volume change', 'shape change', 'length only', 'temperature'], a: 0, e: 'Volume.' },
      { q: 'Fluids lack', o: ['shear modulus', 'bulk modulus', 'density', 'pressure'], a: 0, e: 'Flow.' }, { q: 'Compressibility =', o: ['1/B', 'B', 'Y', 'G'], a: 0, e: 'Inverse.' },
      { q: 'Beyond elastic limit', o: ['permanent set', 'full recovery', 'no change', 'Hooke holds'], a: 0, e: 'Plastic.' }, { q: 'Poisson’s ratio', o: ['lateral/longitudinal strain', 'stress/strain', 'Y/B', 'none'], a: 0, e: 'Ratio.' },
      { q: 'Y of steel ≈', o: ['2 × 10¹¹ Pa', '2 × 10⁶', '2 × 10³', '2'], a: 0, e: 'Stiff.' }
    ],
    teach: {
      outcomes: ['Define stress, strain and moduli', 'Read the stress–strain curve', 'Solve modulus problems'],
      periods: [{ t: 'Stress and strain', flow: [['10 min', 'Rubber band vs wire.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Numericals.']] }, { t: 'Curve and uses', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Crane rope design problem.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Rubber more elastic than steel.', 'Y depends on length.'], activities: ['Searle’s apparatus (or spring) data.', 'Beam bending with rulers.'],
      exit: ['Y formula.', 'Curve regions.', 'Energy stored.'], homework: 'Design rope diameter for a 10 t load with steel (breaking stress 4 × 10⁸ Pa, safety factor 10).'
    },
    slides: [{ t: 'Mechanical Properties of Solids', b: ['Stress and strain', 'Hooke’s law', 'Moduli', 'Stress–strain curve and uses'] }, { t: 'Think and share', b: ['Steel or rubber: more elastic?', 'Why I-beams?'] }],
    fs: { groups: [['Basics', [['Stress', 'F/A'], ['Strain', 'ΔL/L'], ['Hooke', 'stress ∝ strain']]], ['Moduli', [['Y', 'FL/(AΔL)'], ['B', '−pV/ΔV'], ['G', 'shear']]], ['Energy', [['Density', '½ stress × strain'], ['Wire', '½FΔL']]]],
      ex: [['steel 2 m, 1 mm dia, 500 N', 'ΔL ≈ 6.4 mm'], ['1% vol at 10⁷ Pa', 'B 10⁹ Pa']], rem: ['Within elastic limit.', 'Y is a material constant.', 'Safety factor.'] }
  });
})();
