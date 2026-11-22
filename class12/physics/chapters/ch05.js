/*
TOOL:    class12_physics_ch05
FAMILY:  CBSE_REVISION / Class 12 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 5 Magnetism and Matter (bar magnet, field lines, magnetic dipole, Gauss’s law for magnetism, Earth’s magnetism, magnetisation, intensity, susceptibility, dia- para- and ferromagnetism, hysteresis) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 5, part: 'Part I', short: 'Magnetism & matter', title: 'Magnetism and Matter',
    blurb: 'The bar magnet as an equivalent solenoid; magnetic field lines; dipole in a uniform field (torque, potential energy); Gauss’s law for magnetism; the Earth’s field (declination, inclination/dip, horizontal component); magnetisation M, magnetic intensity H, susceptibility χ and relative permeability μᵣ; diamagnetic, paramagnetic and ferromagnetic materials; Curie law; hysteresis, retentivity and coercivity; permanent magnets and electromagnets.',
    revise: {
      oneLine: 'A bar magnet behaves like a solenoid with moment m; axial field B = μ₀·2m/(4πr³), equatorial B = μ₀m/(4πr³). Torque τ = mB sin θ; U = −mB cos θ. Gauss’s law for magnetism: net flux through any closed surface = 0 (no monopoles). B = μ₀(H + M), M = χH, μᵣ = 1 + χ. Diamagnetic: χ small negative (Bi, Cu, water, superconductors — perfect diamagnets); paramagnetic: χ small positive (Al, Na, O₂), χ ∝ 1/T (Curie law); ferromagnetic: χ large positive (Fe, Co, Ni), become paramagnetic above the Curie temperature.',
      sections: [
        { h: 'Earth’s field', html: '<p>Declination D: angle between geographic and magnetic meridians. Dip I: angle of the field with horizontal (0° at magnetic equator, 90° at poles). B_H = B cos I, B_V = B sin I, tan I = B_V/B_H.</p>' },
        { h: 'Hysteresis', html: '<p>Permanent magnets need high retentivity and high coercivity (steel, alnico). Electromagnet/transformer cores need high permeability and low coercivity (soft iron) — small hysteresis loss.</p>' },
        { h: 'Field lines', html: '<p>Continuous closed loops (outside N → S, inside S → N); never cross.</p>' }
      ],
      formulas: [['Torque', 'mB sin θ'], ['PE', '−mB cos θ'], ['Axial field', 'μ₀2m/4πr³'], ['B', 'μ₀(H + M)'], ['μᵣ', '1 + χ'], ['Dip', 'tan I = B_V/B_H'], ['Curie law', 'χ = C/T']],
      terms: [['Susceptibility', 'χ = M/H'], ['Retentivity', 'remaining B when H = 0'], ['Coercivity', 'reverse H needed to make B = 0']],
      traps: ['No magnetic monopoles — flux through closed surfaces is zero.', 'Superconductors expel field (Meissner effect): χ = −1.', 'Dip is 90° at magnetic poles, 0° at magnetic equator.'],
      bridge: '<p>Ch 6 links changing magnetic flux to induced emf.</p>'
    },
    explore: [
      { title: 'Earth’s field components', intro: 'Set total field and dip angle.',
        build(el, K) { let B = 0.5, I = 30; const row = K.row(el); K.slider(row, 'B total (gauss)', 0.2, 0.7, 0.01, B, v => { B = v; b.redraw(); }); K.slider(row, 'dip I (°)', 0, 90, 1, I, v => { I = v; b.redraw(); }); const b = new K.Board(el, { xmin: -0.5, xmax: 4.5, ymin: -3.5, ymax: 0.5, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const r = I * Math.PI / 180, L = 3; b.line(-0.3, 0, 4.3, 0, { color: C.grey, w: 1, dash: [4, 4] }); b.arrow(0, 0, L * Math.cos(r), -L * Math.sin(r), { color: C.purple, w: 3 }); b.arrow(0, 0, L * Math.cos(r), 0, { color: C.blue, w: 3 }); b.arrow(L * Math.cos(r), 0, L * Math.cos(r), -L * Math.sin(r), { color: C.orange, w: 3 });
            rd.innerHTML = `B_H = B cos I = <b>${f(B * Math.cos(r))} G</b> · B_V = B sin I = <b>${f(B * Math.sin(r))} G</b> · tan I = ${I === 90 ? '∞ (magnetic pole)' : f(Math.tan(r))}${I === 0 ? ' (magnetic equator)' : ''}`; };
          b.redraw(); return null; } },
      { title: 'Magnetic materials', intro: 'Sort.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Diamagnetic', 'Paramagnetic', 'Ferromagnetic'], items: [['bismuth', 0], ['copper', 0], ['water', 0], ['aluminium', 1], ['oxygen', 1], ['sodium', 1], ['iron', 2], ['nickel', 2], ['cobalt', 2], ['superconductor', 0, 'perfect diamagnet (Meissner effect)']] }); } }
    ],
    gens: [
      { title: 'Torque & PE', gen(R) { const m = R.pick([0.5, 1, 2, 5]), B = R.pick([0.1, 0.2, 0.5]), th = R.pick([30, 60, 90]); return { q: `Magnet m = ${m} A m² at ${th}° to B = ${B} T. Torque and PE?`, a: `τ = ${f(m * B * Math.sin(th * Math.PI / 180))} N m, U = ${f(-m * B * Math.cos(th * Math.PI / 180))} J`, ans: m * B * Math.sin(th * Math.PI / 180), tol: 1e-6 }; } },
      { title: 'Dip', gen(R) { const BH = R.pick([0.3, 0.35, 0.4]), BV = R.pick([0.2, 0.3, 0.4, 0.52]); return { q: `B_H = ${BH} G, B_V = ${BV} G. Dip angle and total field?`, a: `I = ${f(Math.atan(BV / BH) * 180 / Math.PI)}°, B = ${f(Math.hypot(BH, BV))} G`, ans: Math.atan(BV / BH) * 180 / Math.PI, tol: 0.01 }; } },
      { title: 'Material type', gen(R) { return G9.S9.groupQ(R, [['χ = −1.6 × 10⁻⁵', 0], ['χ = 2.3 × 10⁻⁵', 1], ['χ ≈ 1000', 2], ['repelled by magnet weakly', 0], ['domains', 2], ['χ ∝ 1/T', 1]], ['diamagnetic', 'paramagnetic', 'ferromagnetic'], 'Type: '); } },
      { title: 'μᵣ', levels: [2, 3], gen(R) { const x = R.pick([-1e-5, 2e-5, 499, 999]); return { q: `Susceptibility χ = ${x}. Relative permeability?`, a: f(1 + x), ans: 1 + x, tol: 1e-9 }; } },
      { title: 'Design', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Material for permanent magnets?', 'high retentivity and coercivity (steel, alnico)'], ['Material for transformer cores?', 'soft iron: high permeability, low coercivity, low hysteresis loss'], ['What happens above Curie temperature?', 'ferromagnet becomes paramagnetic'], ['Gauss’s law for magnetism?', 'net magnetic flux through closed surface is zero']]); } }
    ],
    quiz: [
      { q: 'Magnetic monopoles', o: ['not found', 'common', 'in magnets', 'in iron'], a: 0, e: 'Gauss.' }, { q: 'Dip at magnetic pole', o: ['90°', '0°', '45°', '180°'], a: 0, e: 'Vertical.' },
      { q: 'Diamagnetic χ', o: ['small negative', 'small positive', 'large', 'zero'], a: 0, e: 'Repelled.' }, { q: 'μᵣ =', o: ['1 + χ', 'χ', '1 − χ', '1/χ'], a: 0, e: 'Relation.' },
      { q: 'Ferromagnetic', o: ['iron', 'copper', 'aluminium', 'water'], a: 0, e: 'Domains.' }, { q: 'Curie law', o: ['χ ∝ 1/T', 'χ ∝ T', 'χ const', 'χ ∝ T²'], a: 0, e: 'Paramagnets.' },
      { q: 'Transformer core', o: ['soft iron', 'steel', 'copper', 'alnico'], a: 0, e: 'Low loss.' }, { q: 'Torque on magnet', o: ['mB sin θ', 'mB cos θ', 'mB', '0'], a: 0, e: 'Dipole.' },
      { q: 'Superconductor', o: ['perfect diamagnet', 'ferromagnet', 'paramagnet', 'none'], a: 0, e: 'χ = −1.' }, { q: 'tan I =', o: ['B_V/B_H', 'B_H/B_V', 'B/B_H', 'B_V B_H'], a: 0, e: 'Components.' },
      { q: 'Field lines of magnet', o: ['closed loops', 'start at N, end in air', 'cross', 'straight'], a: 0, e: 'Continuous.' }
    ],
    teach: {
      outcomes: ['Treat a bar magnet as a dipole', 'Resolve Earth’s field', 'Classify magnetic materials and hysteresis'],
      periods: [{ t: 'Magnets and Earth', flow: [['10 min', 'Iron filings patterns.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Dip problems.']] }, { t: 'Materials', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Hysteresis loop reading.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Monopoles exist.', 'All metals are magnetic.'], activities: ['Compass mapping.', 'Dip needle demo.'],
      exit: ['Torque formula.', 'Dip relation.', 'Three material types.'], homework: 'Compare hysteresis needs for a permanent magnet vs a transformer core.'
    },
    slides: [{ t: 'Magnetism and Matter', b: ['Bar magnet as dipole', 'Earth’s magnetism', 'M, H, χ', 'Material types and hysteresis'] }, { t: 'Think and share', b: ['Why soft iron in transformers?', 'Why no monopoles?'] }],
    fs: { groups: [['Dipole', [['τ', 'mB sin θ'], ['U', '−mB cos θ'], ['Gauss', 'Φ = 0']]], ['Earth', [['B_H', 'B cos I'], ['B_V', 'B sin I'], ['Dip', 'tan I = B_V/B_H']]], ['Materials', [['Dia', 'χ < 0'], ['Para', 'χ > 0 small, ∝ 1/T'], ['Ferro', 'χ ≫ 1, hysteresis']]]],
      ex: [['B_H 0.4, B_V 0.3', 'I ≈ 36.9°, B 0.5 G'], ['χ 999', 'μᵣ 1000']], rem: ['No monopoles.', 'Soft vs hard magnets.', 'Curie temperature.'] }
  });
})();
