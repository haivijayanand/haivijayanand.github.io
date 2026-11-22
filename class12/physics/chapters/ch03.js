/*
TOOL:    class12_physics_ch03
FAMILY:  CBSE_REVISION / Class 12 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 3 Current Electricity (current, drift velocity, Ohm’s law, resistivity and temperature, power, cells, emf, internal resistance, Kirchhoff’s laws, Wheatstone bridge, meter bridge, potentiometer basics) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 3, part: 'Part I', short: 'Current electricity', title: 'Current Electricity',
    blurb: 'Electric current; drift velocity and mobility (I = neAv_d); Ohm’s law and its limits; resistivity and its temperature dependence (ρ_T = ρ₀[1 + α(T − T₀)]); electrical energy and power; cells — emf, internal resistance, terminal voltage; cells in series and parallel; Kirchhoff’s junction and loop rules; Wheatstone bridge and the meter bridge.',
    revise: {
      oneLine: 'I = neAv_d (v_d ~ 10⁻⁴ m/s); J = σE; R = ρl/A. Metals: resistance rises with temperature; semiconductors: falls. P = VI = I²R = V²/R. A cell of emf ε and internal resistance r gives terminal voltage V = ε − Ir while discharging; current I = ε/(R + r). Kirchhoff: ΣI at a junction = 0 (charge conservation); Σ(ε) = Σ(IR) round any loop (energy conservation). Wheatstone bridge balanced when P/Q = R/S; meter bridge: R/S = l/(100 − l).',
      sections: [
        { h: 'Cells', html: '<p>n identical cells in series: emf nε, resistance nr. In parallel: emf ε, resistance r/n. Max power to load when R = r.</p>' },
        { h: 'Colour code', html: '<p>Black 0, brown 1, red 2, orange 3, yellow 4, green 5, blue 6, violet 7, grey 8, white 9; gold ±5%, silver ±10%.</p>' },
        { h: 'Non-ohmic', html: '<p>Diodes, filament lamps (hot), thermistors and electrolytes do not obey Ohm’s law.</p>' }
      ],
      formulas: [['Drift', 'I = neAv_d'], ['R', 'ρl/A'], ['Temperature', 'R_T = R₀(1 + αΔT)'], ['Cell', 'I = ε/(R + r), V = ε − Ir'], ['Bridge', 'P/Q = R/S'], ['Meter bridge', 'R/S = l/(100 − l)']],
      terms: [['Mobility', 'drift velocity per unit field (μ = v_d/E)'], ['emf', 'work per unit charge by the source'], ['Internal resistance', 'resistance inside the cell']],
      traps: ['Drift velocity is tiny though signals are fast.', 'Terminal voltage < emf on discharge, > emf while charging.', 'Resistivity depends on material and temperature, not size.'],
      bridge: '<p>Ch 4 shows currents produce magnetic fields.</p>'
    },
    explore: [
      { title: 'Cell with internal resistance', intro: 'Set emf, internal and load resistance.',
        build(el, K) { let e = 12, r = 1, R = 5; const row = K.row(el); K.slider(row, 'ε (V)', 1, 24, 0.5, e, v => { e = v; draw(); }); K.slider(row, 'r (Ω)', 0, 5, 0.1, r, v => { r = v; draw(); }); K.slider(row, 'R (Ω)', 0.1, 30, 0.1, R, v => { R = v; draw(); }); const rd = K.read(el);
          function draw() { const I = e / (R + r), V = e - I * r, P = I * I * R; rd.innerHTML = `I = ε/(R + r) = <b>${f(I)} A</b> · terminal V = ε − Ir = <b>${f(V)} V</b> · power to load = <b>${f(P)} W</b> (max ${f(e * e / (4 * (r || 1e-9)))} W when R = r) · lost inside = ${f(I * I * r)} W`; } draw(); return null; } },
      { title: 'Meter bridge', intro: 'Known resistance R in the left gap; find the unknown from the balance length.',
        build(el, K) { let Rk = 10, l = 40; const row = K.row(el); K.slider(row, 'R known (Ω)', 1, 50, 1, Rk, v => { Rk = v; b.redraw(); }); K.slider(row, 'balance length l (cm)', 5, 95, 0.5, l, v => { l = v; b.redraw(); }); const b = new K.Board(el, { xmin: -5, xmax: 105, ymin: -12, ymax: 14, axes: false, grid: 0, aspect: 0.25 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.line(0, 0, 100, 0, { color: C.ink, w: 4 }); for (let x = 0; x <= 100; x += 10) { b.line(x, 0, x, -2, { color: C.ink, w: 1 }); b.text(x, -5, String(x), { font: '10px' }); } b.rect(10, 8, 20, 4, { fill: '#fff', color: C.blue, w: 2 }); b.text(20, 10, 'R', { font: 'bold 11px' }); b.rect(70, 8, 20, 4, { fill: '#fff', color: C.orange, w: 2 }); b.text(80, 10, 'S ?', { font: 'bold 11px' }); b.line(50, 10, l, 0.5, { color: C.purple, w: 2 }); b.dot(l, 0, { r: 7, color: C.purple });
            rd.innerHTML = `balance: R/S = l/(100 − l) → S = R(100 − l)/l = <b>${f(Rk * (100 - l) / l)} Ω</b> · best accuracy near the middle (l ≈ 50)`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Cell', gen(R) { const e = R.pick([1.5, 2, 6, 12]), r = R.pick([0.1, 0.5, 1]), Rl = R.pick([2, 4, 5, 10]); const I = e / (Rl + r); return { q: `ε = ${e} V, r = ${r} Ω, R = ${Rl} Ω. Current and terminal voltage?`, a: `I = ${f(I)} A, V = ${f(e - I * r)} V`, ans: I, tol: 1e-4 }; } },
      { title: 'Drift velocity', levels: [2, 3], gen(R) { const I = R.pick([1, 2, 5]), A = R.pick([1e-6, 2e-6]), n = 8.5e28; const v = I / (n * 1.6e-19 * A); return { q: `I = ${I} A in a copper wire of area ${A.toExponential(0)} m² (n = 8.5 × 10²⁸ m⁻³). Drift speed?`, a: `${v.toExponential(2)} m/s`, ans: v, tol: v * 1e-3 }; } },
      { title: 'Temperature', gen(R) { const R0 = R.pick([10, 20, 50]), a = 0.004, dT = R.pick([25, 50, 100]); return { q: `R = ${R0} Ω at 20 °C, α = 0.004 /°C. Resistance at ${20 + dT} °C?`, a: `${f(R0 * (1 + a * dT))} Ω`, ans: R0 * (1 + a * dT), tol: 1e-6 }; } },
      { title: 'Bridge', gen(R) { const P = R.pick([10, 20]), Q = R.pick([20, 40]), Rr = R.pick([15, 30, 60]); return { q: `Balanced Wheatstone bridge: P = ${P}, Q = ${Q}, R = ${Rr} Ω. S?`, a: `${f(Q * Rr / P)} Ω`, ans: Q * Rr / P, tol: 1e-6 }; } },
      { title: 'Colour code', levels: [2, 3], gen(R) { const CC = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white']; const a = R.int(1, 9), b = R.int(0, 9), m = R.int(0, 4); return { q: `Bands: ${CC[a]}, ${CC[b]}, ${CC[m]}, gold. Resistance?`, a: `${(a * 10 + b) * 10 ** m} Ω ± 5%`, ans: (a * 10 + b) * 10 ** m }; } }
    ],
    quiz: [
      { q: 'I =', o: ['neAv_d', 'nev_d', 'eAv', 'neA/v'], a: 0, e: 'Drift.' }, { q: 'Metal resistance with T', o: ['increases', 'decreases', 'same', 'zero'], a: 0, e: 'Collisions.' },
      { q: 'Terminal V (discharging)', o: ['ε − Ir', 'ε + Ir', 'ε', 'Ir'], a: 0, e: 'Drop.' }, { q: 'Junction rule conserves', o: ['charge', 'energy', 'momentum', 'mass'], a: 0, e: 'KCL.' },
      { q: 'Loop rule conserves', o: ['energy', 'charge', 'power', 'current'], a: 0, e: 'KVL.' }, { q: 'Balanced bridge', o: ['P/Q = R/S', 'PQ = RS', 'P + Q = R + S', 'P = S'], a: 0, e: 'Ratio.' },
      { q: 'Max power when', o: ['R = r', 'R = 0', 'R ≫ r', 'r = 0'], a: 0, e: 'Matching.' }, { q: 'Semiconductor resistance with T', o: ['decreases', 'increases', 'same', 'infinite'], a: 0, e: 'Carriers.' },
      { q: 'Red-red-brown', o: ['220 Ω', '22 Ω', '2200 Ω', '2.2 Ω'], a: 0, e: '22 × 10.' }, { q: 'n cells parallel resistance', o: ['r/n', 'nr', 'r', 'n/r'], a: 0, e: 'Parallel.' },
      { q: 'Drift speed order', o: ['10⁻⁴ m/s', '3 × 10⁸', '1 m/s', '10³'], a: 0, e: 'Slow.' }
    ],
    teach: {
      outcomes: ['Relate current to drift velocity', 'Use cells with internal resistance', 'Apply Kirchhoff’s rules and bridges'],
      periods: [{ t: 'Current and resistance', flow: [['10 min', 'V–I of resistor vs bulb.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Temperature coefficient problems.']] }, { t: 'Networks', flow: [['15 min', 'Kirchhoff loop problems.'], ['15 min', 'Explore panel 2 / meter bridge lab.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Electrons zoom along wires.', 'Terminal V = emf always.'], activities: ['Meter bridge unknown R.', 'Measure internal resistance of a cell.'],
      exit: ['ε − Ir.', 'Kirchhoff two-loop.', 'Bridge balance.'], homework: 'Solve 3 two-loop Kirchhoff networks.'
    },
    slides: [{ t: 'Current Electricity', b: ['Current and drift', 'Ohm’s law and resistivity', 'Cells and emf', 'Kirchhoff and bridges'] }, { t: 'Think and share', b: ['Why does a car’s headlight dim when starting?', 'Why balance near the middle?'] }],
    fs: { groups: [['Basics', [['I', 'neAv_d'], ['R', 'ρl/A'], ['R_T', 'R₀(1 + αΔT)']]], ['Cells', [['I', 'ε/(R + r)'], ['V', 'ε − Ir'], ['Series/parallel', 'nε, nr / ε, r/n']]], ['Networks', [['KCL', 'ΣI = 0'], ['KVL', 'Σε = ΣIR'], ['Bridge', 'P/Q = R/S']]]],
      ex: [['12 V, 1 Ω, 5 Ω', 'I 2 A, V 10 V'], ['l = 40, R = 10', 'S = 15 Ω']], rem: ['Signs in loops.', 'Internal resistance matters.', 'Bridge at null.'] }
  });
})();
