/*
TOOL:    class12_physics_ch01
FAMILY:  CBSE_REVISION / Class 12 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 1 Electric Charges and Fields (charge properties, Coulomb’s law, superposition, electric field and field lines, dipole, flux, Gauss’s law and applications) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  const k = 9e9;
  G9.register({
    no: 1, part: 'Part I', short: 'Electric fields', title: 'Electric Charges and Fields',
    blurb: 'Electric charge — conductors and insulators, charging by induction, quantisation and conservation; Coulomb’s law and superposition; electric field of point charges; field lines; electric dipole — field on axis and equator, torque in a uniform field; continuous charge distributions; electric flux; Gauss’s law and fields of a long wire, infinite sheet and thin spherical shell.',
    revise: {
      oneLine: 'F = kq₁q₂/r² with k = 1/4πε₀ = 9 × 10⁹ N m²/C²; charge is quantised (q = ne, e = 1.6 × 10⁻¹⁹ C) and conserved. E = F/q; point charge E = kq/r². Dipole p = q·2a: on axis E = 2kp/r³, on equator E = kp/r³ (opposite to p); torque τ = pE sin θ. Gauss: total flux = q_enclosed/ε₀. Long wire E = λ/(2πε₀r); infinite sheet E = σ/(2ε₀) (independent of distance); spherical shell E = kq/r² outside, 0 inside.',
      sections: [
        { h: 'Field lines', html: '<p>Start on + charges, end on −; never cross; density shows strength; perpendicular to conductor surfaces; no closed loops in electrostatics.</p>' },
        { h: 'Superposition', html: '<p>Net force/field is the vector sum of contributions from each charge.</p>' },
        { h: 'Dipole in a field', html: '<p>Uniform field: zero net force, torque pE sin θ; stable equilibrium when p ∥ E. Non-uniform field: net force too.</p>' }
      ],
      formulas: [['Coulomb', 'F = kq₁q₂/r²'], ['k', '9 × 10⁹ N m²/C²'], ['Point E', 'kq/r²'], ['Dipole axis', '2kp/r³'], ['Dipole equator', 'kp/r³'], ['Gauss', 'Φ = q/ε₀'], ['Wire / sheet', 'λ/2πε₀r, σ/2ε₀']],
      terms: [['Electric flux', 'Φ = ∮E·dA'], ['Dipole moment', 'p = q × 2a, from − to +'], ['Linear/surface density', 'λ = q/L, σ = q/A']],
      traps: ['Field inside a charged conducting shell is zero.', 'Dipole field falls as 1/r³, not 1/r².', 'Flux through a closed surface depends only on enclosed charge.'],
      bridge: '<p>Ch 2 uses fields to define potential and capacitance.</p>'
    },
    explore: [
      { title: 'Coulomb’s law', intro: 'Set charges (µC) and separation.',
        build(el, K) { let q1 = 3, q2 = -2, r = 0.3; const row = K.row(el); K.slider(row, 'q₁ (µC)', -10, 10, 0.5, q1, v => { q1 = v; b.redraw(); }); K.slider(row, 'q₂ (µC)', -10, 10, 0.5, q2, v => { q2 = v; b.redraw(); }); K.slider(row, 'r (m)', 0.05, 1, 0.01, r, v => { r = v; b.redraw(); }); const b = new K.Board(el, { xmin: -5, xmax: 5, ymin: -1.5, ymax: 1.5, axes: false, grid: 0, aspect: 0.25 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const x = 1 + 3 * r; const F = k * q1 * q2 * 1e-12 / (r * r); const att = F < 0; const col = q => q > 0 ? C.orange : q < 0 ? C.blue : C.grey; b.dot(-x, 0, { r: 8 + Math.abs(q1), color: col(q1) }); b.dot(x, 0, { r: 8 + Math.abs(q2), color: col(q2) }); b.text(-x, 0.9, (q1 > 0 ? '+' : '') + q1 + ' µC', { font: '11px' }); b.text(x, 0.9, (q2 > 0 ? '+' : '') + q2 + ' µC', { font: '11px' }); if (F) { const d = att ? 1 : -1, L = Math.min(1.5, 0.3 + Math.log10(1 + Math.abs(F)) * 0.4); b.arrow(-x, 0, -x + d * L, 0, { color: C.ink, w: 2 }); b.arrow(x, 0, x - d * L, 0, { color: C.ink, w: 2 }); }
            rd.innerHTML = `F = kq₁q₂/r² = <b>${f(Math.abs(F))} N</b> · ${F === 0 ? 'no force' : att ? 'attractive (unlike charges)' : 'repulsive (like charges)'} · equal and opposite on each charge`; };
          b.redraw(); return null; } },
      { title: 'Gauss’s law fields', intro: 'Choose a charge distribution and distance.',
        build(el, K) { let k2 = 0, r = 0.5, Q = 2; const row = K.row(el); K.select(row, 'distribution', ['long wire (λ µC/m)', 'infinite sheet (σ µC/m²)', 'spherical shell R = 0.3 m (Q µC)'], i => { k2 = i; draw(); }); K.slider(row, 'charge value', 0.5, 10, 0.5, Q, v => { Q = v; draw(); }); K.slider(row, 'distance r (m)', 0.05, 2, 0.05, r, v => { r = v; draw(); }); const rd = K.read(el); const e0 = 8.854e-12;
          function draw() { let E, note; if (k2 === 0) { E = Q * 1e-6 / (2 * Math.PI * e0 * r); note = 'E ∝ 1/r'; } else if (k2 === 1) { E = Q * 1e-6 / (2 * e0); note = 'independent of r'; } else { E = r < 0.3 ? 0 : k * Q * 1e-6 / (r * r); note = r < 0.3 ? 'inside shell: zero' : 'outside: like a point charge'; } rd.innerHTML = `E = <b>${f(E)} N/C</b> · ${note}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Coulomb force', gen(R) { const q1 = R.int(1, 9), q2 = R.int(1, 9), r = R.pick([0.1, 0.2, 0.3, 0.5]); const F = k * q1 * q2 * 1e-12 / (r * r); return { q: `Force between ${q1} µC and ${q2} µC, ${r} m apart?`, a: `${f(F)} N`, ans: F, tol: F * 1e-3 }; } },
      { title: 'Point field', gen(R) { const q = R.int(1, 10), r = R.pick([0.1, 0.2, 0.5, 1]); const E = k * q * 1e-9 / (r * r); return { q: `Field of a ${q} nC charge at ${r} m?`, a: `${f(E)} N/C`, ans: E, tol: E * 1e-3 }; } },
      { title: 'Quantisation', gen(R) { const n = R.pick([1e10, 5e12, 2e13, 6.25e18]); return { q: `Charge on a body that has lost ${n.toExponential(2)} electrons?`, a: `${f(n * 1.6e-19)} C`, ans: n * 1.6e-19, tol: n * 1.6e-22 }; } },
      { title: 'Dipole torque', levels: [2, 3], gen(R) { const q = R.pick([1, 2, 5]), d = R.pick([0.01, 0.02]), E = R.pick([1e4, 5e4, 1e5]), th = R.pick([30, 60, 90]); const t = q * 1e-6 * d * E * Math.sin(th * Math.PI / 180); return { q: `Dipole of ±${q} µC separated by ${d * 100} cm in E = ${E.toExponential(0)} N/C at ${th}°. Torque?`, a: `${f(t)} N m`, ans: t, tol: t * 1e-3 }; } },
      { title: 'Flux', levels: [2, 3], gen(R) { const q = R.pick([1, 2, 5, 8.854]); return { q: `Total flux through a closed surface enclosing ${q} nC? (ε₀ = 8.854 × 10⁻¹² )`, a: `${f(q * 1e-9 / 8.854e-12)} N m²/C`, ans: q * 1e-9 / 8.854e-12, tol: 0.1 }; } }
    ],
    quiz: [
      { q: 'k =', o: ['9 × 10⁹', '6.67 × 10⁻¹¹', '8.85 × 10⁻¹²', '1.6 × 10⁻¹⁹'], a: 0, e: '1/4πε₀.' }, { q: 'Field inside charged shell', o: ['0', 'max', 'kq/r²', 'infinite'], a: 0, e: 'Gauss.' },
      { q: 'Dipole axial field ∝', o: ['1/r³', '1/r²', '1/r', 'r'], a: 0, e: 'Dipole.' }, { q: 'Infinite sheet field', o: ['σ/2ε₀', 'σ/ε₀', 'λ/2πε₀r', 'kq/r²'], a: 0, e: 'Uniform.' },
      { q: 'Gauss’s law', o: ['Φ = q/ε₀', 'Φ = qε₀', 'E = q', 'Φ = 0 always'], a: 0, e: 'Enclosed.' }, { q: 'Field lines', o: ['never cross', 'form loops', 'start on −', 'cross at charges'], a: 0, e: 'Unique direction.' },
      { q: 'Torque on dipole', o: ['pE sin θ', 'pE cos θ', 'pE', '0 always'], a: 0, e: 'τ = p × E.' }, { q: 'Charge quantum', o: ['1.6 × 10⁻¹⁹ C', '1 C', '9 × 10⁹', '6.02 × 10²³'], a: 0, e: 'e.' },
      { q: 'Long wire field ∝', o: ['1/r', '1/r²', 'r', 'constant'], a: 0, e: 'Cylinder.' }, { q: 'Dipole in uniform field net force', o: ['zero', 'pE', 'qE', '2qE'], a: 0, e: 'Equal opposite.' },
      { q: 'Double distance, Coulomb force', o: ['÷4', '÷2', '×2', 'same'], a: 0, e: 'Inverse square.' }
    ],
    teach: {
      outcomes: ['Apply Coulomb’s law with superposition', 'Find fields of charges and dipoles', 'Use Gauss’s law for symmetric distributions'],
      periods: [{ t: 'Charges and force', flow: [['10 min', 'Rubbed balloon and paper.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Superposition problems.']] }, { t: 'Fields and Gauss', flow: [['15 min', 'Field line sketches.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Field inside shell non-zero.', 'Flux depends on surface shape.'], activities: ['Electroscope.', 'Field line pattern with semolina in oil (demo/video).'],
      exit: ['Coulomb problem.', 'Dipole fields.', 'Gauss results.'], homework: 'Derive fields of wire, sheet and shell using Gauss’s law.'
    },
    slides: [{ t: 'Electric Charges and Fields', b: ['Charge and Coulomb’s law', 'Electric field and lines', 'Dipole', 'Flux and Gauss’s law'] }, { t: 'Think and share', b: ['Why is field zero inside a shell?', 'Why does a dipole feel torque only?'] }],
    fs: { groups: [['Force & field', [['F', 'kq₁q₂/r²'], ['E', 'kq/r²'], ['k', '9 × 10⁹']]], ['Dipole', [['p', 'q·2a'], ['Axis', '2kp/r³'], ['Equator', 'kp/r³'], ['τ', 'pE sin θ']]], ['Gauss', [['Φ', 'q/ε₀'], ['Wire', 'λ/2πε₀r'], ['Sheet', 'σ/2ε₀'], ['Shell', '0 inside']]]],
      ex: [['3 µC & 2 µC at 0.3 m', 'F = 0.6 N'], ['1 nC at 1 m', 'E = 9 N/C']], rem: ['Vectors add.', 'Gauss needs symmetry.', 'Dipole ∝ 1/r³.'] }
  });
})();
