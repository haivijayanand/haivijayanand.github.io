/*
TOOL:    class12_physics_ch04
FAMILY:  CBSE_REVISION / Class 12 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 4 Moving Charges and Magnetism (magnetic force, Lorentz force, motion in field, cyclotron idea, Biot–Savart law, circular loop, Ampère’s law, solenoid, force between currents, torque on loop, moving coil galvanometer) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  const mu0 = 4 * Math.PI * 1e-7;
  G9.register({
    no: 4, part: 'Part I', short: 'Moving charges', title: 'Moving Charges and Magnetism',
    blurb: 'Magnetic force on a moving charge (F = qv × B) and Lorentz force; circular and helical motion in a uniform field; Biot–Savart law; field at the centre and on the axis of a circular loop; Ampère’s circuital law; long straight wire, solenoid and toroid; force between parallel currents and the ampere; torque on a current loop and magnetic dipole moment; moving-coil galvanometer and its conversion to ammeter and voltmeter.',
    revise: {
      oneLine: 'F = qvB sin θ (perpendicular to both v and B; does no work). In a uniform B a charge moves in a circle r = mv/(qB), with period T = 2πm/(qB) independent of speed (cyclotron). Long wire B = μ₀I/(2πr); loop centre B = μ₀I/(2R); solenoid B = μ₀nI (inside, uniform); toroid B = μ₀NI/(2πr). Parallel currents attract, antiparallel repel: F/L = μ₀I₁I₂/(2πd). Torque on a coil τ = NIAB sin θ; magnetic moment m = NIA. Galvanometer → ammeter (small shunt in parallel), → voltmeter (large resistance in series).',
      sections: [
        { h: 'Galvanometer conversions', html: '<p>Ammeter: shunt S = I_g G/(I − I_g). Voltmeter: series R = V/I_g − G.</p>' },
        { h: 'Velocity selector', html: '<p>Crossed E and B fields pass only charges with v = E/B.</p>' },
        { h: 'Directions', html: '<p>Right-hand thumb rule for wire fields; Fleming’s left-hand rule or F = qv × B for forces (reverse for negative charges).</p>' }
      ],
      formulas: [['Force on charge', 'qvB sin θ'], ['Radius', 'r = mv/qB'], ['Wire', 'μ₀I/2πr'], ['Loop centre', 'μ₀I/2R'], ['Solenoid', 'μ₀nI'], ['Parallel wires', 'μ₀I₁I₂/2πd per metre'], ['Torque', 'NIAB sin θ']],
      terms: [['Lorentz force', 'q(E + v × B)'], ['Magnetic moment', 'm = NIA'], ['Shunt', 'small parallel resistance in an ammeter']],
      traps: ['Magnetic force does no work (speed unchanged).', 'Field inside an ideal solenoid is uniform and independent of radius.', 'Electrons curve opposite to positive charges.'],
      bridge: '<p>Ch 5 treats magnets and magnetic materials; Ch 6 changing fields.</p>'
    },
    explore: [
      { title: 'Charge in a magnetic field', intro: 'Set speed and B for a proton; see radius and period.',
        build(el, K) { let v = 1e6, B = 0.1; const row = K.row(el); K.slider(row, 'v (×10⁶ m/s)', 0.1, 5, 0.1, 1, x => { v = x * 1e6; b.redraw(); }); K.slider(row, 'B (T)', 0.01, 1, 0.01, B, x => { B = x; b.redraw(); }); const b = new K.Board(el, { xmin: -3, xmax: 3, ymin: -3, ymax: 3, axes: false, grid: 0, aspect: 0.55 }); const rd = K.read(el); const m = 1.67e-27, q = 1.6e-19;
          b.onDraw = () => { b.clear(); const r = m * v / (q * B); const T = 2 * Math.PI * m / (q * B); const rs = Math.min(2.8, 0.3 + Math.log10(1 + r * 100) * 0.9); b.circle(0, 0, rs, { color: C.blue, w: 2.5 }); for (let x = -2.6; x <= 2.6; x += 0.8) for (let y = -2.6; y <= 2.6; y += 0.8) b.text(x, y, '⊗', { font: '10px', color: '#94a3b8' }); b.dot(rs, 0, { r: 7, color: C.orange }); b.arrow(rs, 0, rs, 0.9, { color: C.orange, w: 2 }); b.arrow(rs, 0, rs - 0.8, 0, { color: C.purple, w: 2 });
            rd.innerHTML = `r = mv/qB = <b>${f(r * 100)} cm</b> · T = 2πm/qB = <b>${f(T * 1e9)} ns</b> (same for any speed) · force ⟂ velocity → speed constant, no work done`; };
          b.redraw(); return null; } },
      { title: 'Field calculator', intro: 'Choose a current-carrying shape.',
        build(el, K) { let k = 0, I = 5, d = 5, N = 500; const row = K.row(el); K.select(row, 'shape', ['long straight wire (r)', 'circular loop centre (R)', 'solenoid (n per m)'], i => { k = i; draw(); }); K.slider(row, 'I (A)', 0.5, 20, 0.5, I, v => { I = v; draw(); }); K.slider(row, 'distance/radius (cm)', 1, 50, 1, d, v => { d = v; draw(); }); K.slider(row, 'turns per metre', 100, 5000, 100, N, v => { N = v; draw(); }); const rd = K.read(el);
          function draw() { const r = d / 100; const B = k === 0 ? mu0 * I / (2 * Math.PI * r) : k === 1 ? mu0 * I / (2 * r) : mu0 * N * I; rd.innerHTML = `B = <b>${f(B * 1e4)} gauss</b> = ${B.toExponential(3)} T ${k === 2 ? '(inside, uniform — independent of radius)' : ''}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Force on charge', gen(R) { const v = R.pick([1e5, 5e5, 2e6]), B = R.pick([0.1, 0.5, 1]), th = R.pick([30, 90]); const F = 1.6e-19 * v * B * Math.sin(th * Math.PI / 180); return { q: `Proton at ${v.toExponential(0)} m/s at ${th}° to B = ${B} T. Force?`, a: `${F.toExponential(3)} N`, ans: F, tol: F * 1e-3 }; } },
      { title: 'Wire field', gen(R) { const I = R.pick([2, 5, 10, 20]), r = R.pick([0.02, 0.05, 0.1]); const B = mu0 * I / (2 * Math.PI * r); return { q: `Field ${r * 100} cm from a long wire carrying ${I} A?`, a: `${B.toExponential(3)} T`, ans: B, tol: B * 1e-3 }; } },
      { title: 'Solenoid', gen(R) { const n = R.pick([500, 1000, 2000]), I = R.pick([1, 2, 5]); const B = mu0 * n * I; return { q: `Solenoid with ${n} turns/m carrying ${I} A. Field inside?`, a: `${B.toExponential(3)} T`, ans: B, tol: B * 1e-3 }; } },
      { title: 'Galvanometer', levels: [2, 3], gen(R) { const G = R.pick([50, 100]), Ig = R.pick([0.001, 0.005]), I = R.pick([1, 5]), V = R.pick([5, 10]); return R.chance(.5) ? { q: `G = ${G} Ω, full-scale I_g = ${Ig * 1000} mA. Shunt for a ${I} A ammeter?`, a: `${f(Ig * G / (I - Ig))} Ω`, ans: Ig * G / (I - Ig), tol: 1e-6 } : { q: `G = ${G} Ω, I_g = ${Ig * 1000} mA. Series resistance for a ${V} V voltmeter?`, a: `${f(V / Ig - G)} Ω`, ans: V / Ig - G, tol: 1e-6 }; } },
      { title: 'Parallel wires', levels: [2, 3], gen(R) { const I1 = R.pick([2, 5, 10]), I2 = R.pick([2, 5, 10]), d = R.pick([0.01, 0.05, 0.1]); const F = mu0 * I1 * I2 / (2 * Math.PI * d); return { q: `Parallel wires with ${I1} A and ${I2} A (same direction), ${d * 100} cm apart. Force per metre and nature?`, a: `${F.toExponential(3)} N/m, attractive`, ans: F, tol: F * 1e-3 }; } }
    ],
    quiz: [
      { q: 'Magnetic force work', o: ['zero', 'qvB', 'max', 'negative'], a: 0, e: '⊥ velocity.' }, { q: 'r =', o: ['mv/qB', 'qB/mv', 'mvqB', 'm/qBv'], a: 0, e: 'Circle.' },
      { q: 'Long wire B ∝', o: ['1/r', '1/r²', 'r', 'const'], a: 0, e: 'Ampère.' }, { q: 'Solenoid B', o: ['μ₀nI', 'μ₀I/2R', 'μ₀I/2πr', '0'], a: 0, e: 'Inside.' },
      { q: 'Parallel same-direction currents', o: ['attract', 'repel', 'no force', 'rotate'], a: 0, e: 'Ampere.' }, { q: 'Ammeter uses', o: ['small shunt in parallel', 'large series R', 'capacitor', 'none'], a: 0, e: 'Low R.' },
      { q: 'Cyclotron period depends on speed?', o: ['no', 'yes', 'only at low speed', 'doubles'], a: 0, e: '2πm/qB.' }, { q: 'Loop centre B', o: ['μ₀I/2R', 'μ₀I/2πR', 'μ₀nI', 'μ₀IR'], a: 0, e: 'Biot–Savart.' },
      { q: 'Torque on coil', o: ['NIAB sin θ', 'NIAB cos θ', 'NIA', 'IB'], a: 0, e: 'Max at 90°.' }, { q: 'Velocity selector passes v =', o: ['E/B', 'B/E', 'EB', '1/EB'], a: 0, e: 'Balance.' },
      { q: 'μ₀ =', o: ['4π × 10⁻⁷ T m/A', '8.85 × 10⁻¹²', '9 × 10⁹', '1'], a: 0, e: 'Permeability.' }
    ],
    teach: {
      outcomes: ['Use F = qvB and circular motion', 'Find fields of wires, loops, solenoids', 'Convert a galvanometer'],
      periods: [{ t: 'Forces', flow: [['10 min', 'Magnet near CRT/beam (video).'], ['15 min', 'Explore panel 1.'], ['15 min', 'Problems.']] }, { t: 'Fields', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Galvanometer conversion.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Magnetic force speeds up charges.', 'Solenoid field depends on coil radius.'], activities: ['Current balance demo.', 'Galvanometer to ammeter in lab.'],
      exit: ['r = mv/qB.', 'Wire/solenoid fields.', 'Shunt formula.'], homework: 'Design an ammeter (0–3 A) and voltmeter (0–15 V) from a given galvanometer.'
    },
    slides: [{ t: 'Moving Charges and Magnetism', b: ['Force on moving charge', 'Biot–Savart and Ampère', 'Force between currents', 'Galvanometer'] }, { t: 'Think and share', b: ['Why no work by B?', 'Why is solenoid field uniform?'] }],
    fs: { groups: [['Force', [['Charge', 'qvB sin θ'], ['r', 'mv/qB'], ['T', '2πm/qB']]], ['Fields', [['Wire', 'μ₀I/2πr'], ['Loop', 'μ₀I/2R'], ['Solenoid', 'μ₀nI']]], ['Currents', [['F/L', 'μ₀I₁I₂/2πd'], ['τ', 'NIAB sin θ'], ['Meters', 'shunt / series R']]]],
      ex: [['5 A at 5 cm', 'B = 2 × 10⁻⁵ T'], ['1000/m, 2 A', 'B ≈ 2.5 mT']], rem: ['No work by B.', 'Directions by right hand.', 'Shunt is small.'] }
  });
})();
