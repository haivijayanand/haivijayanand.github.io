/*
TOOL:    class10_science_ch11
FAMILY:  CBSE_REVISION / Class 10 Science (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 11 Electricity (charge, current, potential difference, Ohm’s law, resistance and resistivity, series and parallel, heating effect, electric power, kWh) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f2 = x => (+x.toFixed(3)).toString();
  G9.register({
    no: 11, part: 'All chapters', short: 'Electricity', title: 'Electricity',
    blurb: 'Electric charge and current (I = Q/t), potential difference (V = W/Q), circuit diagrams, Ohm’s law (V = IR), factors affecting resistance (R = ρl/A), resistors in series and parallel, heating effect (H = I²Rt) and its uses, electric power (P = VI = I²R = V²/R) and commercial energy (kWh).',
    revise: {
      oneLine: 'Current I = Q/t (ampere); potential difference V = W/Q (volt); Ohm’s law V = IR at constant temperature. Resistance R = ρl/A grows with length, falls with cross-section and depends on material (resistivity ρ). Series: R = R₁ + R₂ + …, same current. Parallel: 1/R = 1/R₁ + 1/R₂ + …, same voltage — used in homes. Heat H = I²Rt; power P = VI = I²R = V²/R; 1 kWh = 3.6 × 10⁶ J.',
      sections: [
        { h: 'Measuring', html: `<p>Ammeter in series (low resistance); voltmeter in parallel (high resistance). Charge of an electron 1.6 × 10⁻¹⁹ C; 1 C ≈ 6.25 × 10¹⁸ electrons.</p>` },
        { h: 'Why parallel at home', html: `<p>Each appliance gets full 220 V, can be switched independently, and one failing does not cut others.</p>` },
        { h: 'Heating uses', html: `<p>Heaters, irons, toasters (nichrome), bulb filaments (tungsten, mp 3380 °C), fuses (low melting point alloy, in series).</p>` }
      ],
      formulas: [['I', 'Q/t'], ['V', 'W/Q'], ['Ohm', 'V = IR'], ['R', 'ρl/A'], ['Series', 'R₁ + R₂'], ['Parallel', '1/R = 1/R₁ + 1/R₂'], ['Heat', 'I²Rt'], ['Power', 'VI = I²R = V²/R'], ['kWh', '3.6 × 10⁶ J']],
      terms: [['Resistivity', 'resistance of a 1 m long, 1 m² wire of the material'], ['Ohm', '1 V per 1 A'], ['Watt', '1 J per second']],
      traps: ['Parallel total resistance is less than the smallest resistor.', 'Resistivity does not depend on length or area.', 'kWh is energy, kW is power.'],
      bridge: '<p>Class 12 Physics: current electricity with Kirchhoff’s laws.</p>'
    },
    explore: [
      { title: 'Series vs parallel', intro: 'Set two resistors and the supply; compare series and parallel.',
        build(el, K) { let r1 = 4, r2 = 6, V = 12; const row = K.row(el); K.slider(row, 'R₁ (Ω)', 1, 30, 1, r1, v => { r1 = v; draw(); }); K.slider(row, 'R₂ (Ω)', 1, 30, 1, r2, v => { r2 = v; draw(); }); K.slider(row, 'V (V)', 1, 24, 1, V, v => { V = v; draw(); }); const rd = K.read(el);
          function draw() { const Rs = r1 + r2, Rp = r1 * r2 / (r1 + r2); const Is = V / Rs, Ip = V / Rp; rd.innerHTML = `<b>series</b>: R = ${Rs} Ω, I = ${f2(Is)} A (same in both), V₁ = ${f2(Is * r1)} V, V₂ = ${f2(Is * r2)} V, P = ${f2(V * Is)} W<br><b>parallel</b>: R = ${f2(Rp)} Ω (less than ${Math.min(r1, r2)} Ω), I = ${f2(Ip)} A (I₁ = ${f2(V / r1)}, I₂ = ${f2(V / r2)}), each gets ${V} V, P = ${f2(V * Ip)} W`; } draw(); return null; } },
      { title: 'Wire resistance', intro: 'Change length, thickness and material; see R = ρl/A.',
        build(el, K) { const M = [['copper', 1.62e-8], ['aluminium', 2.63e-8], ['tungsten', 5.2e-8], ['nichrome', 1.0e-6]]; let k = 0, L = 10, d = 0.5; const row = K.row(el); K.select(row, 'material', M.map(m => m[0]), i => { k = i; draw(); }); K.slider(row, 'length (m)', 1, 100, 1, L, v => { L = v; draw(); }); K.slider(row, 'diameter (mm)', 0.1, 2, 0.05, d, v => { d = v; draw(); }); const rd = K.read(el);
          function draw() { const A = Math.PI * (d / 2e3) ** 2; const R = M[k][1] * L / A; rd.innerHTML = `ρ = ${M[k][1].toExponential(2)} Ω m · A = π r² = ${A.toExponential(3)} m² → <b>R = ${R < 1 ? R.toFixed(4) : R.toFixed(2)} Ω</b> · double length → double R; double diameter → R ÷ 4`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Ohm’s law', gen(R) { const I = R.pick([0.2, 0.5, 1, 1.5, 2, 3]), Rr = R.int(2, 40); return R.chance(.5) ? { q: `A ${Rr} Ω resistor carries ${I} A. Potential difference?`, a: `${f2(I * Rr)} V`, ans: I * Rr, tol: 0.001 } : { q: `${f2(I * Rr)} V across a ${Rr} Ω resistor. Current?`, a: `${I} A`, ans: I, tol: 0.001 }; } },
      { title: 'Combination', gen(R) { const a = R.pick([2, 3, 4, 6, 10, 12]), b = R.pick([3, 4, 6, 12, 15, 20]); return R.chance(.5) ? { q: `${a} Ω and ${b} Ω in series. Total?`, a: `${a + b} Ω`, ans: a + b } : { q: `${a} Ω and ${b} Ω in parallel. Total?`, a: `${f2(a * b / (a + b))} Ω`, ans: a * b / (a + b), tol: 0.001 }; } },
      { title: 'Power', gen(R) { const V = 220, P = R.pick([40, 60, 100, 1000, 1100, 2200]); return { q: `A ${P} W appliance runs on 220 V. Current and resistance?`, a: `I = ${f2(P / V)} A, R = ${f2(V * V / P)} Ω`, ans: P / V, tol: 0.001 }; } },
      { title: 'Heat and charge', levels: [2, 3], gen(R) { const t = R.pick([10, 30, 60]), I = R.pick([2, 3, 5]), Rr = R.pick([5, 10, 20]); return R.chance(.5) ? { q: `Heat produced by ${I} A through ${Rr} Ω for ${t} s?`, a: `${I * I * Rr * t} J`, ans: I * I * Rr * t } : { q: `Charge passing when ${I} A flows for ${t} s?`, a: `${I * t} C`, ans: I * t }; } },
      { title: 'Energy bill', levels: [2, 3], gen(R) { const P = R.pick([100, 500, 1000, 1500, 2000]), h = R.int(1, 6), d = 30, r = R.int(5, 9); const u = P / 1000 * h * d; return { q: `A ${P} W heater runs ${h} h daily for 30 days. Units and cost at ₹${r}/unit?`, a: `${f2(u)} kWh, ₹${f2(u * r)}`, ans: u, tol: 0.001 }; } }
    ],
    quiz: [
      { q: 'V = IR is', o: ['Ohm’s law', 'Joule’s law', 'Snell’s law', 'Newton’s law'], a: 0, e: 'Ohm.' }, { q: 'Ammeter connected', o: ['in series', 'in parallel', 'either', 'not needed'], a: 0, e: 'Series.' },
      { q: '3 Ω ∥ 6 Ω', o: ['2 Ω', '9 Ω', '18 Ω', '0.5 Ω'], a: 0, e: '18/9.' }, { q: 'R ∝', o: ['length', 'area', '1/length', 'mass'], a: 0, e: 'ρl/A.' },
      { q: '1 kWh =', o: ['3.6 × 10⁶ J', '1000 J', '3600 J', '1 J'], a: 0, e: 'Energy.' }, { q: 'Heater element', o: ['nichrome', 'copper', 'silver', 'aluminium'], a: 0, e: 'High ρ.' },
      { q: 'Home wiring', o: ['parallel', 'series', 'none', 'mixed only'], a: 0, e: 'Full voltage.' }, { q: 'P =', o: ['VI', 'V/I', 'I/V', 'V + I'], a: 0, e: 'Power.' },
      { q: 'H =', o: ['I²Rt', 'IRt', 'I²R/t', 'V²t'], a: 0, e: 'Joule.' }, { q: 'Unit of resistivity', o: ['Ω m', 'Ω', 'Ω/m', 'S'], a: 0, e: 'Ω m.' },
      { q: '2 A for 5 s charge', o: ['10 C', '2.5 C', '7 C', '0.4 C'], a: 0, e: 'Q = It.' }
    ],
    teach: {
      outcomes: ['Apply Ohm’s law', 'Combine resistors', 'Calculate heat, power and energy'],
      periods: [{ t: 'Ohm’s law', flow: [['10 min', 'V–I graph experiment.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Numericals.']] }, { t: 'Combinations and power', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Bill calculation.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Current is used up.', 'Parallel adds resistance.'], activities: ['V–I graph with nichrome.', 'Series/parallel bulbs.'],
      exit: ['V = IR problem.', 'Parallel resistance.', 'kWh bill.'], homework: 'Calculate a month’s electricity use for 5 appliances at home.'
    },
    slides: [{ t: 'Electricity', b: ['Current and potential difference', 'Ohm’s law and resistance', 'Series and parallel', 'Heating effect and power'] }, { t: 'Think and share', b: ['Why parallel at home?', 'Why nichrome in heaters?'] }],
    fs: { groups: [['Basics', [['I', 'Q/t'], ['V', 'W/Q'], ['V', 'IR'], ['R', 'ρl/A']]], ['Combinations', [['Series', 'R₁ + R₂'], ['Parallel', '1/R = Σ1/Rᵢ']]], ['Energy', [['H', 'I²Rt'], ['P', 'VI = I²R = V²/R'], ['kWh', '3.6 MJ']]]],
      ex: [['4 Ω ∥ 12 Ω', '3 Ω'], ['1000 W, 2 h × 30', '60 kWh']], rem: ['Ammeter series, voltmeter parallel.', 'Parallel < smallest.', 'Units: kW vs kWh.'] }
  });
})();
