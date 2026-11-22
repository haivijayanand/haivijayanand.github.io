/*
TOOL:    class12_physics_ch02
FAMILY:  CBSE_REVISION / Class 12 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 2 Electrostatic Potential and Capacitance (potential, potential due to point charge and dipole, equipotential surfaces, potential energy, conductors, dielectrics, capacitors, parallel plate, combinations, energy stored) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 2, part: 'Part I', short: 'Potential & capacitance', title: 'Electrostatic Potential and Capacitance',
    blurb: 'Electrostatic potential and potential difference; potential of a point charge, a dipole and a system of charges; equipotential surfaces and E = −dV/dr; potential energy of charges and of a dipole in a field; electrostatics of conductors; dielectrics and polarisation; capacitors and capacitance; parallel-plate capacitor with and without dielectric; series and parallel combinations; energy stored.',
    revise: {
      oneLine: 'V = kq/r (scalar, adds algebraically); dipole V = kp cos θ/r². E = −dV/dr, perpendicular to equipotentials. PE of two charges U = kq₁q₂/r; dipole in field U = −pE cos θ. Parallel plate C = ε₀A/d; with dielectric constant K, C = Kε₀A/d. Series: 1/C = Σ1/Cᵢ (same Q); parallel: C = ΣCᵢ (same V). Energy U = ½CV² = Q²/2C = ½QV; energy density ½ε₀E².',
      sections: [
        { h: 'Conductors', html: '<p>E = 0 inside; surface is equipotential; charge resides on the outer surface; field just outside is σ/ε₀, normal to the surface. Electrostatic shielding (Faraday cage).</p>' },
        { h: 'Dielectric', html: '<p>Polarisation reduces the field inside: E = E₀/K, raising capacitance. Battery connected: V same, Q rises. Battery removed: Q same, V falls.</p>' },
        { h: 'Work', html: '<p>Work to move charge q between points: W = q(V_B − V_A); zero along an equipotential.</p>' }
      ],
      formulas: [['Point V', 'kq/r'], ['E', '−dV/dr'], ['U (pair)', 'kq₁q₂/r'], ['C (plates)', 'Kε₀A/d'], ['Series', '1/C = Σ1/Cᵢ'], ['Parallel', 'C = ΣCᵢ'], ['Energy', '½CV²']],
      terms: [['Equipotential', 'surface of constant potential'], ['Capacitance', 'Q/V (farad)'], ['Dielectric constant', 'K = C_with/C_without']],
      traps: ['Potential is scalar — add with signs, not vectors.', 'Series capacitors share charge, not voltage.', 'Energy stored is ½CV², not CV².'],
      bridge: '<p>Ch 3 moves charges to make current.</p>'
    },
    explore: [
      { title: 'Capacitor combinations', intro: 'Three capacitors (µF) on a supply.',
        build(el, K) { let c1 = 2, c2 = 3, c3 = 6, V = 12; const row = K.row(el); K.slider(row, 'C₁', 1, 10, 1, c1, v => { c1 = v; draw(); }); K.slider(row, 'C₂', 1, 10, 1, c2, v => { c2 = v; draw(); }); K.slider(row, 'C₃', 1, 10, 1, c3, v => { c3 = v; draw(); }); K.slider(row, 'V', 1, 50, 1, V, v => { V = v; draw(); }); const rd = K.read(el);
          function draw() { const s = 1 / (1 / c1 + 1 / c2 + 1 / c3), p = c1 + c2 + c3; rd.innerHTML = `<b>series</b>: C = ${f(s)} µF, Q = ${f(s * V)} µC each, U = ${f(0.5 * s * V * V)} µJ<br><b>parallel</b>: C = ${p} µF, V = ${V} V each, Q = ${f(p * V)} µC, U = ${f(0.5 * p * V * V)} µJ`; } draw(); return null; } },
      { title: 'Parallel-plate capacitor', intro: 'Set plate area, gap and dielectric.',
        build(el, K) { const D = [['vacuum/air', 1], ['paper', 3.5], ['glass', 6], ['mica', 6], ['water', 80]]; let A = 100, d = 1, k2 = 0, V = 100; const row = K.row(el); K.slider(row, 'A (cm²)', 10, 500, 10, A, v => { A = v; draw(); }); K.slider(row, 'd (mm)', 0.1, 5, 0.1, d, v => { d = v; draw(); }); K.select(row, 'dielectric', D.map(x => x[0]), i => { k2 = i; draw(); }); K.slider(row, 'V (volt)', 10, 500, 10, V, v => { V = v; draw(); }); const rd = K.read(el);
          function draw() { const Cv = D[k2][1] * 8.854e-12 * A * 1e-4 / (d * 1e-3); rd.innerHTML = `C = Kε₀A/d = <b>${f(Cv * 1e12)} pF</b> · Q = CV = ${f(Cv * V * 1e9)} nC · U = ½CV² = ${f(0.5 * Cv * V * V * 1e6)} µJ · E between plates = ${f(V / (d * 1e-3))} V/m`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Potential', gen(R) { const q = R.int(1, 10), r = R.pick([0.1, 0.3, 0.5, 0.9]); return { q: `Potential at ${r} m from ${q} nC?`, a: `${f(9e9 * q * 1e-9 / r)} V`, ans: 9 * q / r, tol: 0.01 }; } },
      { title: 'Series/parallel', gen(R) { const a = R.pick([2, 3, 4, 6]), b = R.pick([3, 6, 12]); return R.chance(.5) ? { q: `${a} µF and ${b} µF in series?`, a: `${f(a * b / (a + b))} µF`, ans: a * b / (a + b), tol: 0.001 } : { q: `${a} µF and ${b} µF in parallel?`, a: `${a + b} µF`, ans: a + b }; } },
      { title: 'Energy', gen(R) { const Cc = R.pick([2, 5, 10, 100]), V = R.pick([10, 50, 100, 200]); return { q: `Energy in a ${Cc} µF capacitor at ${V} V?`, a: `${f(0.5 * Cc * 1e-6 * V * V)} J`, ans: 0.5 * Cc * 1e-6 * V * V, tol: 1e-9 }; } },
      { title: 'Work', levels: [2, 3], gen(R) { const q = R.int(1, 10), dV = R.pick([5, 10, 50, 100]); return { q: `Work to move ${q} µC through a potential difference of ${dV} V?`, a: `${f(q * dV)} µJ`, ans: q * dV }; } },
      { title: 'Dielectric', levels: [2, 3], gen(R) { const C0 = R.pick([2, 5, 10]), Kd = R.pick([2, 3, 5]); return R.chance(.5) ? { q: `C₀ = ${C0} µF; dielectric K = ${Kd} inserted with battery connected. New C, and what happens to Q?`, a: `${C0 * Kd} µF; Q increases ×${Kd}`, ans: C0 * Kd } : { q: `C₀ = ${C0} µF charged and isolated; dielectric K = ${Kd} inserted. New V relative to old?`, a: `V/${Kd} (Q same)`, ans: 1 / Kd, tol: 1e-6 }; } }
    ],
    quiz: [
      { q: 'Potential is', o: ['scalar', 'vector', 'tensor', 'none'], a: 0, e: 'Adds.' }, { q: 'C (parallel plate)', o: ['ε₀A/d', 'ε₀d/A', 'Ad/ε₀', 'ε₀Ad'], a: 0, e: 'Formula.' },
      { q: 'Energy stored', o: ['½CV²', 'CV²', 'CV', 'V²/C'], a: 0, e: 'Half.' }, { q: 'Series capacitors share', o: ['charge', 'voltage', 'capacitance', 'energy'], a: 0, e: 'Same Q.' },
      { q: 'E inside conductor', o: ['0', 'σ/ε₀', 'max', 'kq/r²'], a: 0, e: 'Electrostatics.' }, { q: 'Work along equipotential', o: ['0', 'qV', 'max', 'negative'], a: 0, e: 'ΔV = 0.' },
      { q: 'E =', o: ['−dV/dr', 'dV/dr', 'V r', 'V/r²'], a: 0, e: 'Gradient.' }, { q: 'Dielectric raises', o: ['capacitance', 'gap', 'area', 'nothing'], a: 0, e: '×K.' },
      { q: '2 µF ∥ 3 µF', o: ['5 µF', '1.2 µF', '6 µF', '1 µF'], a: 0, e: 'Add.' }, { q: 'Dipole PE in field', o: ['−pE cos θ', 'pE sin θ', 'pE', '0'], a: 0, e: 'Min when aligned.' },
      { q: 'Unit of capacitance', o: ['farad', 'henry', 'ohm', 'tesla'], a: 0, e: 'F.' }
    ],
    teach: {
      outcomes: ['Compute potential and PE', 'Relate E and V', 'Solve capacitor networks and energy'],
      periods: [{ t: 'Potential', flow: [['10 min', 'Hill analogy.'], ['15 min', 'Equipotential sketches.'], ['15 min', 'Problems.']] }, { t: 'Capacitors', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Explore panel 1.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['V is a vector.', 'Series → same V.'], activities: ['Capacitor charging with LED.', 'Foil capacitor model.'],
      exit: ['V of point charge.', 'Network C.', '½CV².'], homework: 'Solve 5 mixed capacitor networks including energy.'
    },
    slides: [{ t: 'Potential and Capacitance', b: ['Potential and equipotentials', 'Potential energy', 'Conductors and dielectrics', 'Capacitors'] }, { t: 'Think and share', b: ['Battery on vs off with dielectric?', 'Why is a car a safe place in lightning?'] }],
    fs: { groups: [['Potential', [['Point', 'kq/r'], ['Dipole', 'kp cos θ/r²'], ['E', '−dV/dr']]], ['Energy', [['Pair', 'kq₁q₂/r'], ['Dipole', '−pE cos θ'], ['Capacitor', '½CV²']]], ['Capacitors', [['Plate', 'Kε₀A/d'], ['Series', '1/C = Σ1/Cᵢ'], ['Parallel', 'ΣCᵢ']]]],
      ex: [['2, 3, 6 µF series', '1 µF'], ['10 µF at 100 V', '0.05 J']], rem: ['Scalar potential.', 'Series: same Q.', 'Half CV².'] }
  });
})();
