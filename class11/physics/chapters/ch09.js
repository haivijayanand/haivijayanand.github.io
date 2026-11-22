/*
TOOL:    class11_physics_ch09
FAMILY:  CBSE_REVISION / Class 11 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 9 Mechanical Properties of Fluids (pressure, Pascal’s law, hydraulic machines, streamline flow, continuity, Bernoulli, viscosity, Stokes’ law, terminal velocity, Reynolds number, surface tension, capillarity) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 9, part: 'Part II', short: 'Fluids', title: 'Mechanical Properties of Fluids',
    blurb: 'Pressure, P = P₀ + ρgh, gauge pressure, Pascal’s law and hydraulic lift/brakes; streamline and turbulent flow; equation of continuity (Av = constant); Bernoulli’s principle and applications (Torricelli, Venturi, lift); viscosity and Stokes’ law; terminal velocity; Reynolds number; surface tension, surface energy, angle of contact, drops and bubbles, capillary rise.',
    revise: {
      oneLine: 'Pressure at depth h: P = P₀ + ρgh. Pascal: pressure applied to an enclosed fluid is transmitted equally — hydraulic lift F₂ = F₁A₂/A₁. Continuity: A₁v₁ = A₂v₂. Bernoulli: P + ½ρv² + ρgh = constant along a streamline (efflux speed √(2gh)). Viscous force F = 6πηrv (Stokes); terminal velocity v_t = 2r²(ρ − σ)g/(9η). Surface tension S = F/L; excess pressure in a drop 2S/r, in a bubble 4S/r; capillary rise h = 2S cos θ/(ρ g r).',
      sections: [
        { h: 'Bernoulli uses', html: `<p>Aeroplane lift (faster air above wing → lower pressure), atomiser spray, roofs blown off in storms, spinning ball swing (Magnus effect).</p>` },
        { h: 'Reynolds number', html: `<p>Re = ρvd/η; below ~1000 streamline, above ~2000 turbulent.</p>` },
        { h: 'Surface tension', html: `<p>Molecules at the surface have extra energy; liquids minimise area (spherical drops). Water wets glass (θ < 90°, rises); mercury does not (θ > 90°, falls). Detergents lower S.</p>` }
      ],
      formulas: [['Pressure', 'P₀ + ρgh'], ['Hydraulic', 'F₂ = F₁A₂/A₁'], ['Continuity', 'A₁v₁ = A₂v₂'], ['Bernoulli', 'P + ½ρv² + ρgh = const'], ['Stokes', '6πηrv'], ['Terminal', '2r²(ρ−σ)g/9η'], ['Capillary', '2S cos θ/(ρgr)']],
      terms: [['Viscosity', 'internal friction of a fluid'], ['Surface tension', 'force per unit length on the surface'], ['Streamline flow', 'velocity at each point steady']],
      traps: ['A bubble has two surfaces (4S/r), a drop one (2S/r).', 'Pressure at a depth does not depend on container shape.', 'Terminal velocity ∝ r².'],
      bridge: '<p>Ch 10 deals with heat in matter.</p>'
    },
    explore: [
      { title: 'Hydraulic lift', intro: 'Set small-piston force and piston diameters.',
        build(el, K) { let F1 = 200, d1 = 2, d2 = 20; const row = K.row(el); K.slider(row, 'F₁ (N)', 10, 1000, 10, F1, v => { F1 = v; draw(); }); K.slider(row, 'small dia (cm)', 1, 10, 0.5, d1, v => { d1 = v; draw(); }); K.slider(row, 'large dia (cm)', 10, 60, 1, d2, v => { d2 = v; draw(); }); const rd = K.read(el);
          function draw() { const F2 = F1 * (d2 / d1) ** 2; rd.innerHTML = `F₂ = F₁ (A₂/A₁) = F₁ (d₂/d₁)² = <b>${f(F2)} N</b> ≈ lifts ${f(F2 / 9.8)} kg · the small piston must move ${f((d2 / d1) ** 2)} times farther (energy conserved)`; } draw(); return null; } },
      { title: 'Terminal velocity', intro: 'Drop a steel ball in a liquid; see terminal speed (Stokes’ law).',
        build(el, K) { const L = [['glycerine', 1260, 1.5], ['castor oil', 960, 0.99], ['water', 1000, 0.001]]; let k = 0, r = 1; const row = K.row(el); K.select(row, 'liquid', L.map(l => l[0]), i => { k = i; draw(); }); K.slider(row, 'radius (mm)', 0.2, 5, 0.1, r, v => { r = v; draw(); }); const rd = K.read(el);
          function draw() { const rho = 7800, [n, sig, eta] = L[k]; const rr = r / 1000; const vt = 2 * rr * rr * (rho - sig) * 9.8 / (9 * eta); const Re = sig * vt * 2 * rr / eta; rd.innerHTML = `v_t = 2r²(ρ − σ)g/(9η) = <b>${f(vt)} m/s</b> · Reynolds number ≈ ${f(Re)} ${Re > 1 ? '→ Stokes’ law no longer accurate (flow not slow)' : '→ Stokes’ law valid'}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Pressure at depth', gen(R) { const h = R.int(2, 50); return { q: `Absolute pressure ${h} m below the surface of water? (P₀ = 1.01 × 10⁵ Pa, ρ = 1000, g = 9.8)`, a: `${f(1.01e5 + 1000 * 9.8 * h)} Pa`, ans: 1.01e5 + 9800 * h, tol: 1 }; } },
      { title: 'Continuity', gen(R) { const A1 = R.pick([4, 6, 10]), v1 = R.int(1, 5), A2 = R.pick([1, 2]); return { q: `Water flows at ${v1} m/s in a pipe of area ${A1} cm² into a section of ${A2} cm². New speed?`, a: `${f(A1 * v1 / A2)} m/s`, ans: A1 * v1 / A2, tol: 0.001 }; } },
      { title: 'Torricelli', gen(R) { const h = R.pick([0.8, 1.25, 2, 5, 7.2]); return { q: `Speed of efflux from a hole ${h} m below the water surface? (g = 9.8)`, a: `${f(Math.sqrt(2 * 9.8 * h))} m/s`, ans: Math.sqrt(19.6 * h), tol: 0.01 }; } },
      { title: 'Excess pressure', levels: [2, 3], gen(R) { const S = R.pick([0.025, 0.03, 0.072]), r = R.pick([1, 2, 5]) / 1000; const bub = R.chance(.5); return { q: `Excess pressure inside a ${bub ? 'soap bubble' : 'liquid drop'} of radius ${r * 1000} mm, S = ${S} N/m?`, a: `${f((bub ? 4 : 2) * S / r)} Pa`, ans: (bub ? 4 : 2) * S / r, tol: 0.01 }; } },
      { title: 'Capillary rise', levels: [2, 3], gen(R) { const r = R.pick([0.1, 0.2, 0.5]) / 1000; return { q: `Water (S = 0.072 N/m, θ ≈ 0°) in a capillary of radius ${r * 1000} mm. Rise? (ρ 1000, g 9.8)`, a: `${f(2 * 0.072 / (1000 * 9.8 * r) * 100)} cm`, ans: 2 * 0.072 / (9800 * r) * 100, tol: 0.01 }; } }
    ],
    quiz: [
      { q: 'Pascal’s law used in', o: ['hydraulic lift', 'thermometer', 'barometer only', 'lens'], a: 0, e: 'Transmission.' }, { q: 'Continuity', o: ['A₁v₁ = A₂v₂', 'P₁ = P₂', 'v₁ = v₂', 'A₁ = A₂'], a: 0, e: 'Mass flow.' },
      { q: 'Efflux speed', o: ['√(2gh)', 'gh', '2gh', '√(gh)'], a: 0, e: 'Torricelli.' }, { q: 'Bubble excess pressure', o: ['4S/r', '2S/r', 'S/r', '8S/r'], a: 0, e: 'Two surfaces.' },
      { q: 'Terminal velocity ∝', o: ['r²', 'r', '1/r', 'r³'], a: 0, e: 'Stokes.' }, { q: 'Mercury in glass capillary', o: ['falls', 'rises', 'no change', 'boils'], a: 0, e: 'θ > 90°.' },
      { q: 'Aeroplane lift explained by', o: ['Bernoulli', 'Pascal', 'Hooke', 'Archimedes only'], a: 0, e: 'Pressure difference.' }, { q: 'Turbulent when Re', o: ['> ~2000', '< 1', '= 0', '< 100'], a: 0, e: 'High.' },
      { q: 'Detergents', o: ['lower surface tension', 'raise it', 'no effect', 'freeze water'], a: 0, e: 'Wetting.' }, { q: 'Stokes force', o: ['6πηrv', 'πηrv', '6ηv', 'ηr²'], a: 0, e: 'Formula.' },
      { q: 'Pressure at depth depends on', o: ['depth and density', 'shape of vessel', 'area of base', 'volume'], a: 0, e: 'Hydrostatic paradox.' }
    ],
    teach: {
      outcomes: ['Apply Pascal, continuity and Bernoulli', 'Use Stokes’ law and terminal velocity', 'Explain surface tension effects'],
      periods: [{ t: 'Fluids at rest and moving', flow: [['10 min', 'Syringe hydraulic model.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Bernoulli paper-blow demo.']] }, { t: 'Viscosity and surface tension', flow: [['15 min', 'Explore panel 2 / ball in oil.'], ['15 min', 'Capillary tubes.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Faster fluid → higher pressure.', 'Bubble = drop pressure.'], activities: ['Syringe hydraulics.', 'Terminal velocity in glycerine.'],
      exit: ['Bernoulli statement.', 'Terminal velocity formula.', 'Capillary rise.'], homework: 'Explain 5 everyday Bernoulli effects.'
    },
    slides: [{ t: 'Mechanical Properties of Fluids', b: ['Pressure and Pascal', 'Continuity and Bernoulli', 'Viscosity and Stokes', 'Surface tension'] }, { t: 'Think and share', b: ['Why do roofs blow off?', 'Why do soap bubbles need 4S/r?'] }],
    fs: { groups: [['Static', [['P', 'P₀ + ρgh'], ['Hydraulic', 'F₂ = F₁A₂/A₁']]], ['Flow', [['Continuity', 'Av const'], ['Bernoulli', 'P + ½ρv² + ρgh'], ['Efflux', '√(2gh)']]], ['Viscosity & ST', [['Stokes', '6πηrv'], ['v_t', '2r²(ρ−σ)g/9η'], ['Drop/bubble', '2S/r, 4S/r'], ['Rise', '2S cos θ/ρgr']]]],
      ex: [['h 5 m', 'v ≈ 9.9 m/s'], ['r 0.1 mm water', 'h ≈ 14.7 cm']], rem: ['Faster flow, lower P.', 'r² in terminal speed.', 'Bubble: two surfaces.'] }
  });
})();
