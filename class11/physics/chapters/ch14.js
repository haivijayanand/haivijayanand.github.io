/*
TOOL:    class11_physics_ch14
FAMILY:  CBSE_REVISION / Class 11 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 14 Waves (transverse and longitudinal, wave equation, wavelength frequency speed, speed on a string and in a gas, superposition, reflection, standing waves, harmonics in strings and pipes, beats) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 14, part: 'Part II', short: 'Waves', title: 'Waves',
    blurb: 'Transverse and longitudinal waves; displacement relation y = A sin(kx − ωt); amplitude, phase, wavelength (k = 2π/λ), frequency and speed v = νλ = ω/k; speed on a stretched string √(T/μ) and of sound √(γP/ρ) (Laplace correction); principle of superposition; reflection at rigid and open boundaries; standing waves and normal modes in strings and air columns; beats.',
    revise: {
      oneLine: 'y = A sin(kx − ωt) travels in +x with v = ω/k = νλ. On a string v = √(T/μ); sound in a gas v = √(γP/ρ) (Newton’s √(P/ρ) was too low; Laplace added γ). Standing waves: string fixed at both ends νₙ = n v/2L (all harmonics); pipe closed at one end νₙ = (2n − 1) v/4L (odd harmonics only); open pipe νₙ = n v/2L. Beats: two close frequencies give a beat frequency |ν₁ − ν₂|.',
      sections: [
        { h: 'Reflection', html: `<p>At a rigid boundary the reflected wave is inverted (phase change π); at an open/free boundary there is no inversion.</p>` },
        { h: 'Standing waves', html: `<p>Nodes (zero displacement) λ/2 apart, antinodes midway. Energy does not travel along a standing wave.</p>` },
        { h: 'Beats', html: `<p>Used to tune instruments: tighten until beats vanish. Waxing a fork lowers its frequency.</p>` }
      ],
      formulas: [['Wave', 'y = A sin(kx − ωt)'], ['Speed', 'v = νλ = ω/k'], ['String', 'v = √(T/μ)'], ['Sound', 'v = √(γP/ρ)'], ['String/open pipe', 'νₙ = nv/2L'], ['Closed pipe', 'νₙ = (2n−1)v/4L'], ['Beats', '|ν₁ − ν₂|']],
      terms: [['Node', 'point of zero displacement'], ['Harmonic', 'integer multiple of the fundamental'], ['Superposition', 'displacements add']],
      traps: ['Closed pipes have only odd harmonics.', 'Sound speed rises with temperature, not with pressure (at fixed T).', 'Standing waves don’t transport energy.'],
      bridge: '<p>Class 12: wave optics and electromagnetic waves.</p>'
    },
    explore: [
      { title: 'Standing wave modes', intro: 'Choose the system and harmonic; see the pattern and frequency (v = 340 m/s for pipes).',
        build(el, K) { let k = 0, n = 1, L = 0.5; const row = K.row(el); K.select(row, 'system', ['string fixed both ends (v = 200 m/s)', 'open pipe', 'closed pipe'], i => { k = i; b.redraw(); }); K.slider(row, 'mode n', 1, 5, 1, n, v => { n = v; b.redraw(); }); K.slider(row, 'length L (m)', 0.2, 2, 0.05, L, v => { L = v; b.redraw(); }); const b = new K.Board(el, { xmin: -0.3, xmax: 10.3, ymin: -2, ymax: 2, axes: false, grid: 0, aspect: 0.35 }); const rd = K.read(el); const an = new K.Anim(Infinity, () => b.redraw(), { ms: 40 });
          b.onDraw = () => { b.clear(); const v = k ? 340 : 200; const m = k === 2 ? 2 * n - 1 : n; const freq = k === 2 ? m * v / (4 * L) : m * v / (2 * L); const amp = 1.4 * Math.cos(an.i * 0.2); const kk = k === 2 ? m * Math.PI / 20 : m * Math.PI / 10; const sh = x => k === 0 ? Math.sin(kk * x) : k === 1 ? Math.cos(kk * x) : Math.sin(kk * x);
            if (k) { b.line(0, 1.7, 10, 1.7, { color: C.ink, w: 2 }); b.line(0, -1.7, 10, -1.7, { color: C.ink, w: 2 }); if (k === 2) b.line(0, -1.7, 0, 1.7, { color: C.ink, w: 5 }); } else { b.dot(0, 0, { r: 5, color: C.ink }); b.dot(10, 0, { r: 5, color: C.ink }); } let p = [0, amp * sh(0)], q = [0, -amp * sh(0)]; for (let x = 0.1; x <= 10.01; x += 0.1) { const y = amp * sh(x); b.line(p[0], p[1], x, y, { color: C.blue, w: 2.5 }); b.line(q[0], q[1], x, -y, { color: 'rgba(124,58,237,.35)', w: 1.5 }); p = [x, y]; q = [x, -y]; }
            rd.innerHTML = `${k === 2 ? `${m}${m === 1 ? 'st' : m === 3 ? 'rd' : 'th'} harmonic (odd only)` : `harmonic ${m}`} · ν = <b>${f(freq)} Hz</b> · fundamental ${f(k === 2 ? v / (4 * L) : v / (2 * L))} Hz`; };
          K.anim(el, an); an.play(); return an; } },
      { title: 'Beats', intro: 'Two tuning forks with close frequencies.',
        build(el, K) { let f1 = 256, f2 = 260; const row = K.row(el); K.slider(row, 'ν₁ (Hz)', 240, 270, 1, f1, v => { f1 = v; b.redraw(); }); K.slider(row, 'ν₂ (Hz)', 240, 270, 1, f2, v => { f2 = v; b.redraw(); }); const b = new K.Board(el, { xmin: 0, xmax: 10, ymin: -2.3, ymax: 2.3, axes: false, grid: 0, aspect: 0.3 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); let p = [0, 2]; for (let i = 1; i <= 2000; i++) { const t = i / 2000; const y = Math.cos(2 * Math.PI * f1 * t) + Math.cos(2 * Math.PI * f2 * t); const q = [t * 10, y]; b.line(p[0], p[1], q[0], q[1], { color: C.blue, w: 1 }); p = q; } rd.innerHTML = `beat frequency |ν₁ − ν₂| = <b>${Math.abs(f1 - f2)} Hz</b> (window shows 1 s) ${f1 === f2 ? '— no beats: in tune' : ''}`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'v = νλ', gen(R) { const v = R.pick([330, 340, 1500]), nu = R.pick([170, 256, 340, 512, 680]); return { q: `Speed ${v} m/s, frequency ${nu} Hz. Wavelength?`, a: `${f(v / nu)} m`, ans: v / nu, tol: 1e-4 }; } },
      { title: 'String speed', gen(R) { const T = R.pick([50, 100, 200, 400]), mu = R.pick([0.001, 0.002, 0.005, 0.01]); return { q: `String tension ${T} N, linear density ${mu} kg/m. Wave speed?`, a: `${f(Math.sqrt(T / mu))} m/s`, ans: Math.sqrt(T / mu), tol: 0.01 }; } },
      { title: 'Pipes', gen(R) { const L = R.pick([0.25, 0.34, 0.5, 0.85]), cl = R.chance(.5); return { q: `${cl ? 'Closed' : 'Open'} pipe of length ${L} m (v = 340 m/s). Fundamental frequency?`, a: `${f(cl ? 340 / (4 * L) : 340 / (2 * L))} Hz`, ans: cl ? 340 / (4 * L) : 340 / (2 * L), tol: 0.01 }; } },
      { title: 'Beats', gen(R) { const a = R.int(250, 260), d = R.int(2, 6); return { q: `A ${a} Hz fork gives ${d} beats/s with another fork. Possible frequencies?`, a: `${a - d} Hz or ${a + d} Hz`, ans: d }; } },
      { title: 'Wave equation', levels: [2, 3], gen(R) { const A = R.pick([0.02, 0.05]), k2 = R.pick([2, 4, 5]), w = R.pick([100, 200, 400]); return { q: `y = ${A} sin(${k2}x − ${w}t) (SI). Find λ, ν and v.`, a: `λ = ${f(2 * Math.PI / k2)} m, ν = ${f(w / (2 * Math.PI))} Hz, v = ${w / k2} m/s`, ans: w / k2, tol: 0.01 }; } }
    ],
    quiz: [
      { q: 'v =', o: ['νλ', 'ν/λ', 'λ/ν', 'ν + λ'], a: 0, e: 'Wave.' }, { q: 'String speed', o: ['√(T/μ)', 'T/μ', '√(μ/T)', 'Tμ'], a: 0, e: 'Tension.' },
      { q: 'Closed pipe harmonics', o: ['odd only', 'all', 'even only', 'none'], a: 0, e: 'Node at closed end.' }, { q: 'Beat frequency', o: ['|ν₁ − ν₂|', 'ν₁ + ν₂', 'ν₁ν₂', 'average'], a: 0, e: 'Difference.' },
      { q: 'Laplace correction adds', o: ['γ', 'g', 'T', 'ρ'], a: 0, e: 'Adiabatic.' }, { q: 'Nodes separated by', o: ['λ/2', 'λ', 'λ/4', '2λ'], a: 0, e: 'Half.' },
      { q: 'Reflection at rigid end', o: ['inverted', 'upright', 'absorbed', 'doubled'], a: 0, e: 'π phase.' }, { q: 'Open pipe 0.5 m fundamental (340)', o: ['340 Hz', '170 Hz', '680 Hz', '85 Hz'], a: 0, e: 'v/2L.' },
      { q: 'Sound in air is', o: ['longitudinal', 'transverse', 'electromagnetic', 'static'], a: 0, e: 'Compressions.' }, { q: 'k =', o: ['2π/λ', 'λ/2π', '2πλ', '1/λ'], a: 0, e: 'Wave number.' },
      { q: 'Standing wave energy transport', o: ['none', 'maximum', 'one way', 'both ways net'], a: 0, e: 'Stationary.' }
    ],
    teach: {
      outcomes: ['Use the wave equation', 'Find speeds on strings and in gases', 'Analyse standing waves and beats'],
      periods: [{ t: 'Travelling waves', flow: [['10 min', 'Slinky transverse/longitudinal.'], ['15 min', 'Wave equation drills.'], ['15 min', 'Speed on a string.']] }, { t: 'Standing waves and beats', flow: [['15 min', 'Explore panel 1 / sonometer.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['All pipes give all harmonics.', 'Pressure changes sound speed.'], activities: ['Resonance tube for v.', 'Phone tone generator beats.'],
      exit: ['String/pipe formulas.', 'Beats meaning.', 'Wave equation parts.'], homework: 'Find the speed of sound with a resonance tube (or a bottle and a phone tone).'
    },
    slides: [{ t: 'Waves', b: ['Wave equation', 'Speeds of waves', 'Superposition and standing waves', 'Beats'] }, { t: 'Think and share', b: ['Why odd harmonics in closed pipes?', 'How are beats used in tuning?'] }],
    fs: { groups: [['Wave', [['y', 'A sin(kx − ωt)'], ['v', 'νλ = ω/k'], ['k', '2π/λ']]], ['Speeds', [['String', '√(T/μ)'], ['Gas', '√(γP/ρ)']]], ['Modes', [['String/open', 'nv/2L'], ['Closed', '(2n−1)v/4L'], ['Beats', '|ν₁ − ν₂|']]]],
      ex: [['T 100 N, μ 0.01', 'v 100 m/s'], ['closed 0.34 m', '250 Hz']], rem: ['Count nodes and antinodes.', 'Closed pipe: odd.', 'Beats = difference.'] }
  });
})();
