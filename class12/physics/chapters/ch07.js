/*
TOOL:    class12_physics_ch07
FAMILY:  CBSE_REVISION / Class 12 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 7 Alternating Current (AC voltage, rms, resistor inductor capacitor in AC, phasors, LCR series circuit, impedance, resonance, quality factor, power and power factor, transformers) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 7, part: 'Part I', short: 'AC', title: 'Alternating Current',
    blurb: 'AC voltage applied to a resistor; rms values; phasors; AC through an inductor (X_L = ωL, current lags by 90°) and a capacitor (X_C = 1/ωC, current leads by 90°); series LCR circuit — impedance, phase angle, resonance, quality factor; power in AC circuits and power factor; wattless current; transformers (ideal relations, losses).',
    revise: {
      oneLine: 'I_rms = I₀/√2, V_rms = V₀/√2. X_L = ωL, X_C = 1/(ωC). Series LCR: Z = √(R² + (X_L − X_C)²), tan φ = (X_L − X_C)/R. Resonance at ω₀ = 1/√(LC): Z = R, current maximum, Q = ω₀L/R. Average power P = V_rms I_rms cos φ; power factor cos φ = R/Z (0 for pure L or C — wattless current). Ideal transformer: V_s/V_p = N_s/N_p = I_p/I_s; step-up raises voltage, lowers current — used for long-distance transmission to reduce I²R loss.',
      sections: [
        { h: 'Phase', html: '<p>Resistor: V and I in phase. Inductor: V leads I by 90°. Capacitor: I leads V by 90° (ICE / ELI mnemonics).</p>' },
        { h: 'Transformer losses', html: '<p>Flux leakage, copper (I²R) loss, eddy current loss (laminated core), hysteresis loss (soft iron).</p>' },
        { h: 'Indian mains', html: '<p>220 V rms, 50 Hz → V₀ ≈ 311 V.</p>' }
      ],
      formulas: [['rms', 'peak/√2'], ['X_L', 'ωL'], ['X_C', '1/ωC'], ['Z', '√(R² + (X_L − X_C)²)'], ['Resonance', 'ω₀ = 1/√(LC)'], ['Power', 'V_rms I_rms cos φ'], ['Transformer', 'V_s/V_p = N_s/N_p']],
      terms: [['Impedance', 'total opposition to AC'], ['Power factor', 'cos φ'], ['Quality factor', 'sharpness of resonance, ω₀L/R']],
      traps: ['Average of AC current over a cycle is zero; rms is not.', 'At resonance X_L = X_C, but each may be large.', 'Transformers do not work on steady DC.'],
      bridge: '<p>Ch 8 extends oscillating fields to electromagnetic waves.</p>'
    },
    explore: [
      { title: 'Series LCR', intro: 'Set R, L, C and frequency.',
        build(el, K) { let R = 10, L = 0.1, Cc = 100, fq = 50, V = 220; const row = K.row(el); K.slider(row, 'R (Ω)', 1, 100, 1, R, v => { R = v; draw(); }); K.slider(row, 'L (H)', 0.01, 1, 0.01, L, v => { L = v; draw(); }); K.slider(row, 'C (µF)', 1, 500, 1, Cc, v => { Cc = v; draw(); }); K.slider(row, 'f (Hz)', 10, 200, 1, fq, v => { fq = v; draw(); }); const rd = K.read(el);
          function draw() { const w = 2 * Math.PI * fq, XL = w * L, XC = 1 / (w * Cc * 1e-6), Z = Math.hypot(R, XL - XC), I = V / Z, ph = Math.atan2(XL - XC, R) * 180 / Math.PI, f0 = 1 / (2 * Math.PI * Math.sqrt(L * Cc * 1e-6)); rd.innerHTML = `X_L = ${f(XL)} Ω · X_C = ${f(XC)} Ω · Z = <b>${f(Z)} Ω</b> · I_rms = <b>${f(I)} A</b> (220 V) · φ = ${f(ph)}° (${XL > XC ? 'inductive, I lags' : XL < XC ? 'capacitive, I leads' : 'resonance'}) · power factor ${f(R / Z)} · P = ${f(V * I * R / Z)} W · resonance at <b>${f(f0)} Hz</b>, Q = ${f(2 * Math.PI * f0 * L / R)}`; } draw(); return null; } },
      { title: 'Transformer', intro: 'Set turns and primary voltage/current.',
        build(el, K) { let Np = 500, Ns = 50, Vp = 220, Ip = 1; const row = K.row(el); K.slider(row, 'N_p', 50, 2000, 10, Np, v => { Np = v; draw(); }); K.slider(row, 'N_s', 10, 5000, 10, Ns, v => { Ns = v; draw(); }); K.slider(row, 'V_p (V)', 10, 440, 10, Vp, v => { Vp = v; draw(); }); K.slider(row, 'I_p (A)', 0.1, 10, 0.1, Ip, v => { Ip = v; draw(); }); const rd = K.read(el);
          function draw() { const Vs = Vp * Ns / Np, Is = Ip * Np / Ns; rd.innerHTML = `${Ns > Np ? 'step-up' : Ns < Np ? 'step-down' : '1 : 1'} · V_s = <b>${f(Vs)} V</b> · I_s = <b>${f(Is)} A</b> (ideal) · power ${f(Vp * Ip)} W both sides`; } draw(); return null; } }
    ],
    gens: [
      { title: 'rms/peak', gen(R) { const V = R.pick([110, 220, 230, 240]); return { q: `Peak value of ${V} V rms AC?`, a: `${f(V * Math.SQRT2)} V`, ans: V * Math.SQRT2, tol: 0.01 }; } },
      { title: 'Reactance', gen(R) { const fq = R.pick([50, 60, 100]), L = R.pick([0.1, 0.2, 0.5]), Cc = R.pick([10, 50, 100]); return R.chance(.5) ? { q: `X_L of ${L} H at ${fq} Hz?`, a: `${f(2 * Math.PI * fq * L)} Ω`, ans: 2 * Math.PI * fq * L, tol: 0.01 } : { q: `X_C of ${Cc} µF at ${fq} Hz?`, a: `${f(1 / (2 * Math.PI * fq * Cc * 1e-6))} Ω`, ans: 1 / (2 * Math.PI * fq * Cc * 1e-6), tol: 0.01 }; } },
      { title: 'Impedance', gen(R) { const Rr = R.pick([3, 6, 8, 30]), X = R.pick([4, 8, 6, 40]); return { q: `Series R = ${Rr} Ω, net reactance X_L − X_C = ${X} Ω. Impedance and power factor?`, a: `Z = ${f(Math.hypot(Rr, X))} Ω, cos φ = ${f(Rr / Math.hypot(Rr, X))}`, ans: Math.hypot(Rr, X), tol: 0.01 }; } },
      { title: 'Resonance', gen(R) { const L = R.pick([0.1, 0.5, 1]), Cc = R.pick([10, 100, 1000]); const f0 = 1 / (2 * Math.PI * Math.sqrt(L * Cc * 1e-6)); return { q: `Resonant frequency of L = ${L} H, C = ${Cc} µF?`, a: `${f(f0)} Hz`, ans: f0, tol: 0.01 }; } },
      { title: 'Transformer', levels: [2, 3], gen(R) { const Np = R.pick([100, 200, 500]), Ns = R.pick([1000, 2000, 50]), Vp = R.pick([110, 220]); return { q: `N_p = ${Np}, N_s = ${Ns}, V_p = ${Vp} V. V_s and type?`, a: `${f(Vp * Ns / Np)} V, ${Ns > Np ? 'step-up' : 'step-down'}`, ans: Vp * Ns / Np, tol: 1e-6 }; } }
    ],
    quiz: [
      { q: 'V_rms =', o: ['V₀/√2', 'V₀/2', '√2 V₀', 'V₀'], a: 0, e: 'rms.' }, { q: 'X_L =', o: ['ωL', '1/ωL', 'L/ω', 'ω/L'], a: 0, e: 'Inductive.' },
      { q: 'In capacitor, current', o: ['leads V by 90°', 'lags', 'in phase', 'zero'], a: 0, e: 'ICE.' }, { q: 'Resonance ω₀', o: ['1/√(LC)', '√(LC)', 'LC', 'L/C'], a: 0, e: 'X_L = X_C.' },
      { q: 'At resonance Z =', o: ['R', '0', '∞', 'X_L'], a: 0, e: 'Min.' }, { q: 'Power factor pure inductor', o: ['0', '1', '0.5', '∞'], a: 0, e: 'Wattless.' },
      { q: 'Transformer works on', o: ['AC', 'DC', 'both', 'neither'], a: 0, e: 'Changing flux.' }, { q: 'Step-up transformer', o: ['N_s > N_p', 'N_s < N_p', 'N_s = N_p', 'no coils'], a: 0, e: 'More turns.' },
      { q: 'Peak of 220 V rms', o: ['311 V', '220 V', '156 V', '440 V'], a: 0, e: '×√2.' }, { q: 'Average power', o: ['V_rms I_rms cos φ', 'V₀I₀', 'VI sin φ', '0 always'], a: 0, e: 'Power factor.' },
      { q: 'High voltage transmission reduces', o: ['I²R loss', 'voltage', 'frequency', 'power'], a: 0, e: 'Lower current.' }
    ],
    teach: {
      outcomes: ['Use rms values and reactances', 'Analyse series LCR and resonance', 'Apply transformer relations'],
      periods: [{ t: 'AC elements', flow: [['10 min', 'Phasor diagrams.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Reactance problems.']] }, { t: 'Power and transformers', flow: [['15 min', 'Power factor discussion.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Average AC = rms.', 'Transformers boost power.'], activities: ['LCR resonance with signal generator (demo).', 'Transformer coil demo.'],
      exit: ['Z formula.', 'Resonance.', 'Transformer ratio.'], homework: 'Find resonant frequency and Q for 3 LCR combinations.'
    },
    slides: [{ t: 'Alternating Current', b: ['rms values', 'R, L, C in AC', 'Series LCR and resonance', 'Power and transformers'] }, { t: 'Think and share', b: ['Why transmit at high voltage?', 'What is wattless current?'] }],
    fs: { groups: [['AC basics', [['rms', 'peak/√2'], ['X_L', 'ωL (V leads)'], ['X_C', '1/ωC (I leads)']]], ['LCR', [['Z', '√(R² + (X_L−X_C)²)'], ['tan φ', '(X_L−X_C)/R'], ['ω₀', '1/√(LC)'], ['Q', 'ω₀L/R']]], ['Power', [['P', 'V_rms I_rms cos φ'], ['cos φ', 'R/Z'], ['Transformer', 'V_s/V_p = N_s/N_p']]]],
      ex: [['R 6, X 8', 'Z 10, pf 0.6'], ['0.1 H, 100 µF', 'f₀ ≈ 50.3 Hz']], rem: ['rms for meters.', 'Resonance: Z = R.', 'AC only for transformers.'] }
  });
})();
