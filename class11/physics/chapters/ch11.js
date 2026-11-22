/*
TOOL:    class11_physics_ch11
FAMILY:  CBSE_REVISION / Class 11 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 11 Thermodynamics (thermal equilibrium, zeroth law, internal energy, first law, specific heats of gases, processes: isothermal adiabatic isochoric isobaric, work, second law, reversible processes, Carnot engine) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 11, part: 'Part II', short: 'Thermodynamics', title: 'Thermodynamics',
    blurb: 'Thermal equilibrium and the zeroth law; heat, work and internal energy; first law (ΔU = Q − W); specific heats of gases (C_p − C_v = R); thermodynamic state variables; quasi-static processes — isothermal, adiabatic, isochoric, isobaric, cyclic — and work in each; heat engines and refrigerators; second law; reversible and irreversible processes; the Carnot engine.',
    revise: {
      oneLine: 'First law: Q = ΔU + W (W = work done by the gas = ∫P dV). Isothermal (ideal gas): ΔU = 0, W = nRT ln(V₂/V₁). Adiabatic: Q = 0, PVᵞ = constant, W = (P₁V₁ − P₂V₂)/(γ − 1). Isochoric: W = 0. Isobaric: W = PΔV. C_p − C_v = R. Engine efficiency η = W/Q₁ = 1 − Q₂/Q₁; Carnot (ideal) η = 1 − T₂/T₁ (kelvin). Refrigerator COP = Q₂/W. Second law: no engine can convert all heat to work; heat does not flow by itself from cold to hot.',
      sections: [
        { h: 'Sign convention', html: `<p>Q positive when heat is given to the system; W positive when the system does work on surroundings.</p>` },
        { h: 'Adiabatic vs isothermal', html: `<p>On a P–V diagram the adiabatic curve is steeper (slope −γP/V vs −P/V). Rapid compression (bicycle pump) heats air — nearly adiabatic.</p>` },
        { h: 'Carnot cycle', html: `<p>Isothermal expansion at T₁, adiabatic expansion, isothermal compression at T₂, adiabatic compression. No real engine between T₁ and T₂ can beat it.</p>` }
      ],
      formulas: [['First law', 'Q = ΔU + W'], ['Isothermal W', 'nRT ln(V₂/V₁)'], ['Adiabatic', 'PVᵞ = const'], ['Isobaric W', 'PΔV'], ['Mayer', 'C_p − C_v = R'], ['Carnot η', '1 − T₂/T₁'], ['COP', 'Q₂/W']],
      terms: [['Internal energy', 'total molecular energy; function of state'], ['Quasi-static', 'infinitely slow, always near equilibrium'], ['Heat engine', 'converts heat into work in a cycle']],
      traps: ['Use kelvin in efficiency.', 'Q and W depend on the path; ΔU does not.', 'In a cyclic process ΔU = 0, so Q = W.'],
      bridge: '<p>Ch 12 explains U and specific heats from molecules.</p>'
    },
    explore: [
      { title: 'Carnot efficiency', intro: 'Set source and sink temperatures.',
        build(el, K) { let T1 = 500, T2 = 300, Q1 = 1000; const row = K.row(el); K.slider(row, 'source T₁ (K)', 300, 1500, 10, T1, v => { T1 = v; draw(); }); K.slider(row, 'sink T₂ (K)', 200, 600, 10, T2, v => { T2 = v; draw(); }); K.slider(row, 'heat in Q₁ (J)', 100, 5000, 100, Q1, v => { Q1 = v; draw(); }); const rd = K.read(el);
          function draw() { if (T2 >= T1) { rd.innerHTML = 'sink must be colder than source'; return; } const e = 1 - T2 / T1; rd.innerHTML = `η = 1 − T₂/T₁ = <b>${f(e * 100)}%</b> · max work = <b>${f(e * Q1)} J</b> · heat rejected = ${f(Q1 * (1 - e))} J · as a refrigerator between these temperatures, COP = T₂/(T₁ − T₂) = ${f(T2 / (T1 - T2))}`; } draw(); return null; } },
      { title: 'P–V processes', intro: 'Choose a process from (P₁, V₁) = (100 kPa, 1 L) to V₂; see the work done by 1 L of a diatomic gas (γ = 1.4).',
        build(el, K) { let k = 0, V2 = 2; const row = K.row(el); K.select(row, 'process', ['isothermal', 'adiabatic', 'isobaric'], i => { k = i; b.redraw(); }); K.slider(row, 'V₂ (L)', 0.5, 3, 0.1, V2, v => { V2 = v; b.redraw(); }); const b = new K.Board(el, { xmin: -0.3, xmax: 3.5, ymin: -0.35, ymax: 2.95, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el);
          
          b.onDraw = () => { b.clear(); const P = v => k === 0 ? 100 / v : k === 1 ? 100 / v ** 1.4 : 100; const Y = p => p / 100; b.line(0, 0, 3.3, 0, { color: C.ink, w: 1.5 }); b.line(0, 0, 0, 2.75, { color: C.ink, w: 1.5 }); b.text(3.2, -0.15, 'V (L)', { font: '10px' }); b.text(0.25, 2.75, 'P (×100 kPa)', { font: '10px' }); const pts = [[1, 0]]; const n = 40; for (let i = 0; i <= n; i++) { const v = 1 + (V2 - 1) * i / n; pts.push([v, Y(P(v))]); } pts.push([V2, 0]); b.poly(pts, { fill: 'rgba(59,130,246,.25)', color: 'none' }); for (let i = 1; i < pts.length - 2; i++) b.line(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], { color: C.orange, w: 3 });
            const PV = 100; const W = k === 0 ? PV * Math.log(V2) : k === 1 ? (PV - P(V2) * V2) / 0.4 : 100 * (V2 - 1); rd.innerHTML = `work by gas W = <b>${f(W)} J</b> (shaded area; ${W < 0 ? 'negative: work done on gas' : 'positive'}) · P₂ = ${f(P(V2))} kPa`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'First law', gen(R) { const Q = R.int(2, 20) * 100, W = R.int(1, 10) * 100; return { q: `A gas absorbs ${Q} J of heat and does ${W} J of work. Change in internal energy?`, a: `${Q - W} J`, ans: Q - W }; } },
      { title: 'Carnot', gen(R) { const T1 = R.pick([400, 500, 600, 800, 1000]), T2 = R.pick([250, 300, 350]); return { q: `Carnot engine between ${T1} K and ${T2} K. Efficiency?`, a: `${f((1 - T2 / T1) * 100)}%`, ans: (1 - T2 / T1) * 100, tol: 0.01 }; } },
      { title: 'Isobaric work', gen(R) { const P = R.pick([1e5, 2e5]), dV = R.pick([0.001, 0.002, 0.005]); return { q: `A gas expands by ${dV * 1000} L at constant ${P / 1000} kPa. Work done?`, a: `${f(P * dV)} J`, ans: P * dV, tol: 0.001 }; } },
      { title: 'Isothermal', levels: [2, 3], gen(R) { const n = R.pick([1, 2]), T = R.pick([300, 400]), r = R.pick([2, 3, 4]); const W = n * 8.314 * T * Math.log(r); return { q: `${n} mol of ideal gas expands isothermally at ${T} K to ${r} times its volume. Work? (R = 8.314)`, a: `${f(W)} J`, ans: W, tol: 0.5 }; } },
      { title: 'Process', gen(R) { return G9.S9.pickQ(R, [['In which process is ΔU = 0 for an ideal gas?', 'isothermal'], ['In which process is Q = 0?', 'adiabatic'], ['In which process is W = 0?', 'isochoric'], ['For a cyclic process, ΔU = ?', '0, so Q = W'], ['Why is adiabatic curve steeper?', 'slope −γP/V vs −P/V']]); } }
    ],
    quiz: [
      { q: 'First law', o: ['Q = ΔU + W', 'Q = ΔU − W only for solids', 'W = ΔU', 'Q = W always'], a: 0, e: 'Energy.' }, { q: 'Isothermal ideal gas', o: ['ΔU = 0', 'Q = 0', 'W = 0', 'P const'], a: 0, e: 'T const.' },
      { q: 'Adiabatic', o: ['Q = 0', 'ΔU = 0', 'W = 0', 'T const'], a: 0, e: 'Insulated.' }, { q: 'C_p − C_v', o: ['R', 'γ', '0', '1'], a: 0, e: 'Mayer.' },
      { q: 'Carnot 600 K → 300 K', o: ['50%', '100%', '33%', '25%'], a: 0, e: '1 − ½.' }, { q: 'Adiabatic relation', o: ['PVᵞ = const', 'PV = const', 'P/T const', 'V/T const'], a: 0, e: 'Poisson.' },
      { q: 'Zeroth law defines', o: ['temperature', 'heat', 'work', 'entropy'], a: 0, e: 'Equilibrium.' }, { q: 'Isochoric work', o: ['0', 'PΔV', 'nRT', 'infinite'], a: 0, e: 'No ΔV.' },
      { q: 'ΔU depends on', o: ['initial and final states only', 'path', 'time', 'speed'], a: 0, e: 'State function.' }, { q: 'Refrigerator COP', o: ['Q₂/W', 'W/Q₂', 'Q₁/W only', '1 − T₂/T₁'], a: 0, e: 'Cooling.' },
      { q: 'Kelvin–Planck says', o: ['no engine 100% efficient', 'heat flows cold→hot', 'energy created', 'U = 0'], a: 0, e: '2nd law.' }
    ],
    teach: {
      outcomes: ['Apply the first law with signs', 'Compute work in processes', 'Use the second law and Carnot efficiency'],
      periods: [{ t: 'First law and processes', flow: [['10 min', 'Bicycle pump heating.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Problems.']] }, { t: 'Engines', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Real engine efficiencies vs Carnot.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Heat = temperature.', 'Efficient engines reach 100%.'], activities: ['Syringe compression feel.', 'P–V cycle sketching.'],
      exit: ['First law signs.', 'Four processes.', 'Carnot η.'], homework: 'Find typical efficiencies of a car engine and a power station; compare with Carnot limits.'
    },
    slides: [{ t: 'Thermodynamics', b: ['Zeroth and first laws', 'Processes and work', 'Second law', 'Carnot engine'] }, { t: 'Think and share', b: ['Why can’t η = 100%?', 'Why does a pump get hot?'] }],
    fs: { groups: [['Laws', [['First', 'Q = ΔU + W'], ['Second', 'no perfect engine'], ['Zeroth', 'temperature']]], ['Processes', [['Isothermal', 'W = nRT ln(V₂/V₁)'], ['Adiabatic', 'PVᵞ = c'], ['Isobaric', 'W = PΔV'], ['Isochoric', 'W = 0']]], ['Engines', [['η', '1 − Q₂/Q₁'], ['Carnot', '1 − T₂/T₁'], ['COP', 'Q₂/W']]]],
      ex: [['Q 500, W 200', 'ΔU 300 J'], ['800 K, 300 K', 'η 62.5%']], rem: ['Signs of Q and W.', 'Kelvin in η.', 'Cycle: ΔU = 0.'] }
  });
})();
