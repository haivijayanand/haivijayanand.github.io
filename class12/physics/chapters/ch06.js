/*
TOOL:    class12_physics_ch06
FAMILY:  CBSE_REVISION / Class 12 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 6 Electromagnetic Induction (Faraday’s and Lenz’s laws, motional emf, energy, eddy currents, self and mutual inductance, AC generator) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 6, part: 'Part I', short: 'EM induction', title: 'Electromagnetic Induction',
    blurb: 'Experiments of Faraday and Henry; magnetic flux; Faraday’s law; Lenz’s law and energy conservation; motional emf (ε = Blv); energy considerations; eddy currents and their uses; self-inductance (solenoid L = μ₀n²Al) and mutual inductance; energy stored in an inductor; AC generator (ε = NBAω sin ωt).',
    revise: {
      oneLine: 'Flux Φ = BA cos θ (weber). Induced emf ε = −N dΦ/dt; the minus sign is Lenz’s law — the induced current opposes the change causing it (a consequence of energy conservation). A rod of length l moving at v ⟂ B gives ε = Blv. Self-induced emf = −L dI/dt; energy stored ½LI². Mutual: ε₂ = −M dI₁/dt. AC generator: ε = NBAω sin ωt, peak ε₀ = NBAω. Eddy currents cause heating losses (reduced by laminated cores) but are used in brakes, induction furnaces and meters.',
      sections: [
        { h: 'Lenz’s law', html: '<p>Magnet’s N pole approaching a coil → coil face becomes N (repels). Pulling away → face becomes S (attracts). Work done against this becomes electrical energy.</p>' },
        { h: 'Eddy currents', html: '<p>Uses: magnetic braking in trains, electromagnetic damping in galvanometers, induction furnace, speedometers. Reduce by laminations.</p>' },
        { h: 'Inductors', html: '<p>L depends on geometry and core (μᵣ); opposes change of current, like inertia for current.</p>' }
      ],
      formulas: [['Flux', 'Φ = BA cos θ'], ['Faraday', 'ε = −N dΦ/dt'], ['Motional', 'ε = Blv'], ['Self', 'ε = −L dI/dt'], ['Solenoid L', 'μ₀n²Al'], ['Energy', '½LI²'], ['Generator', 'ε₀ = NBAω']],
      terms: [['Weber', 'unit of flux (T m²)'], ['Henry', 'unit of inductance'], ['Eddy currents', 'loops of induced current in bulk conductors']],
      traps: ['A steady flux gives no emf, however large.', 'Lenz opposes the change, not the flux itself.', 'Generator emf peaks when the coil plane is parallel to B (flux zero).'],
      bridge: '<p>Ch 7 analyses the alternating currents produced.</p>'
    },
    explore: [
      { title: 'Moving rod', intro: 'A rod slides on rails in a field; find emf, current and force.',
        build(el, K) { let B = 0.5, l = 0.4, v = 5, R = 2; const row = K.row(el); K.slider(row, 'B (T)', 0.1, 2, 0.1, B, x => { B = x; draw(); }); K.slider(row, 'l (m)', 0.1, 1, 0.05, l, x => { l = x; draw(); }); K.slider(row, 'v (m/s)', 0.5, 20, 0.5, v, x => { v = x; draw(); }); K.slider(row, 'R (Ω)', 0.5, 10, 0.5, R, x => { R = x; draw(); }); const rd = K.read(el);
          function draw() { const e = B * l * v, I = e / R, F = B * I * l; rd.innerHTML = `ε = Blv = <b>${f(e)} V</b> · I = <b>${f(I)} A</b> · opposing force BIl = <b>${f(F)} N</b> · power to push = Fv = ${f(F * v)} W = I²R = ${f(I * I * R)} W (energy conserved — Lenz)`; } draw(); return null; } },
      { title: 'AC generator', intro: 'Spin the coil; see emf vs time. <kbd>P</kbd> play.',
        build(el, K) { let N = 100, B = 0.2, A = 0.01, fq = 50; const row = K.row(el); K.slider(row, 'turns N', 10, 500, 10, N, v => { N = v; }); K.slider(row, 'B (T)', 0.05, 1, 0.05, B, v => { B = v; }); K.slider(row, 'frequency (Hz)', 10, 100, 5, fq, v => { fq = v; }); const b = new K.Board(el, { xmin: -0.3, xmax: 10.3, ymin: -2.2, ymax: 2.2, axes: false, grid: 0, aspect: 0.3 }); const rd = K.read(el); const an = new K.Anim(Infinity, () => b.redraw(), { ms: 40 });
          b.onDraw = () => { b.clear(); b.line(0, 0, 10, 0, { color: C.grey, w: 1 }); const ph = an.i * 0.12; let p = [0, 2 * Math.sin(ph)]; for (let x = 0.05; x <= 10; x += 0.05) { const y = 2 * Math.sin(x * fq / 25 - ph + Math.PI / 2 * 0); b.line(p[0], p[1], x, y, { color: C.blue, w: 2 }); p = [x, y]; } const e0 = N * B * A * 2 * Math.PI * fq; rd.innerHTML = `ε₀ = NBAω = ${N} × ${B} × ${A} × 2π × ${fq} = <b>${f(e0)} V</b> · rms = ${f(e0 / Math.SQRT2)} V (A = 100 cm²)`; };
          K.anim(el, an); an.play(); return an; } }
    ],
    gens: [
      { title: 'Faraday', gen(R) { const N = R.pick([50, 100, 200]), dPhi = R.pick([0.01, 0.02, 0.05]), dt = R.pick([0.1, 0.2, 0.5]); return { q: `${N}-turn coil; flux changes by ${dPhi} Wb in ${dt} s. Induced emf?`, a: `${f(N * dPhi / dt)} V`, ans: N * dPhi / dt, tol: 1e-6 }; } },
      { title: 'Motional emf', gen(R) { const B = R.pick([0.2, 0.5, 1]), l = R.pick([0.5, 1, 2]), v = R.pick([2, 5, 10]); return { q: `Rod ${l} m moving at ${v} m/s ⟂ B = ${B} T. emf?`, a: `${f(B * l * v)} V`, ans: B * l * v, tol: 1e-6 }; } },
      { title: 'Self induction', gen(R) { const L = R.pick([0.1, 0.5, 2]), dI = R.pick([1, 2, 5]), dt = R.pick([0.01, 0.1]); return { q: `L = ${L} H, current changes by ${dI} A in ${dt} s. Induced emf?`, a: `${f(L * dI / dt)} V`, ans: L * dI / dt, tol: 1e-6 }; } },
      { title: 'Energy', levels: [2, 3], gen(R) { const L = R.pick([0.2, 0.5, 1, 2]), I = R.pick([1, 2, 5]); return { q: `Energy stored in ${L} H inductor with ${I} A?`, a: `${f(0.5 * L * I * I)} J`, ans: 0.5 * L * I * I, tol: 1e-6 }; } },
      { title: 'Generator', levels: [2, 3], gen(R) { const N = R.pick([50, 100]), B = R.pick([0.1, 0.5]), A = R.pick([0.01, 0.02]), w = R.pick([100, 314]); return { q: `N = ${N}, B = ${B} T, A = ${A} m², ω = ${w} rad/s. Peak emf?`, a: `${f(N * B * A * w)} V`, ans: N * B * A * w, tol: 1e-6 }; } }
    ],
    quiz: [
      { q: 'ε =', o: ['−N dΦ/dt', 'NΦ', 'dΦ', 'BIl'], a: 0, e: 'Faraday.' }, { q: 'Lenz’s law follows', o: ['energy conservation', 'charge conservation', 'momentum', 'Ohm'], a: 0, e: 'Opposition.' },
      { q: 'Motional emf', o: ['Blv', 'BIl', 'qvB', 'Bv/l'], a: 0, e: 'Rod.' }, { q: 'Inductor energy', o: ['½LI²', 'LI²', 'LI', '½CV²'], a: 0, e: 'Magnetic.' },
      { q: 'Unit of inductance', o: ['henry', 'weber', 'tesla', 'farad'], a: 0, e: 'H.' }, { q: 'Eddy current loss reduced by', o: ['laminated core', 'solid core', 'copper core', 'air'], a: 0, e: 'Break loops.' },
      { q: 'Generator peak emf', o: ['NBAω', 'NBA', 'BAω', 'Nω'], a: 0, e: 'Formula.' }, { q: 'Steady large flux gives', o: ['no emf', 'large emf', 'AC', 'DC'], a: 0, e: 'Change needed.' },
      { q: 'Magnetic braking uses', o: ['eddy currents', 'friction', 'Lenz only on wires', 'capacitors'], a: 0, e: 'Trains.' }, { q: 'Flux unit', o: ['weber', 'tesla', 'henry', 'gauss'], a: 0, e: 'Wb.' },
      { q: 'Solenoid L ∝', o: ['n²', 'n', '1/n', 'n³'], a: 0, e: 'μ₀n²Al.' }
    ],
    teach: {
      outcomes: ['Apply Faraday’s and Lenz’s laws', 'Compute motional and self-induced emf', 'Explain eddy currents and generators'],
      periods: [{ t: 'Induction', flow: [['10 min', 'Magnet into coil with galvanometer.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Lenz direction practice.']] }, { t: 'Inductance and generator', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Eddy current pendulum demo.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Flux itself induces emf.', 'Lenz opposes flux.'], activities: ['Magnet falling through copper tube.', 'Bicycle dynamo.'],
      exit: ['Faraday law.', 'Blv.', '½LI².'], homework: 'Explain three applications of eddy currents.'
    },
    slides: [{ t: 'Electromagnetic Induction', b: ['Faraday’s law', 'Lenz’s law', 'Motional emf and eddy currents', 'Inductance and generator'] }, { t: 'Think and share', b: ['Why does a magnet fall slowly in a copper tube?', 'Why laminated cores?'] }],
    fs: { groups: [['Laws', [['Flux', 'BA cos θ'], ['Faraday', '−N dΦ/dt'], ['Lenz', 'opposes change']]], ['emf types', [['Motional', 'Blv'], ['Self', '−L dI/dt'], ['Mutual', '−M dI₁/dt']]], ['Devices', [['Energy', '½LI²'], ['Generator', 'NBAω sin ωt'], ['Eddy', 'brakes, furnaces']]]],
      ex: [['100 turns, 0.02 Wb in 0.1 s', '20 V'], ['B 0.5, l 1, v 10', '5 V']], rem: ['Change of flux.', 'Lenz = energy.', 'Laminate cores.'] }
  });
})();
