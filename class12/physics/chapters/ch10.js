/*
TOOL:    class12_physics_ch10
FAMILY:  CBSE_REVISION / Class 12 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 10 Wave Optics (Huygens principle, refraction and reflection of plane waves, coherent sources, Young’s double slit, fringe width, single-slit diffraction, polarisation, Malus’s law, Brewster’s law) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 10, part: 'Part II', short: 'Wave optics', title: 'Wave Optics',
    blurb: 'Huygens’ principle and wavefronts; reflection and refraction of plane waves (Snell’s law from wave theory); Doppler effect for light (qualitative); coherent and incoherent addition of waves; interference and Young’s double-slit experiment (fringe width β = λD/d); diffraction at a single slit (central maximum width 2λD/a); resolving power (qualitative); polarisation, Malus’s law and Brewster’s angle.',
    revise: {
      oneLine: 'Every point on a wavefront is a source of secondary wavelets; the new wavefront is their envelope. Coherent sources keep a constant phase difference. YDSE: path difference = yd/D; bright fringes at path difference nλ, dark at (n + ½)λ; fringe width β = λD/d. Single slit (width a): minima at a sin θ = nλ; central maximum is twice as wide as others (angular width 2λ/a). Polarisation shows light is transverse: Malus I = I₀ cos²θ; Brewster: tan i_B = n, reflected light fully polarised and reflected ⟂ refracted ray.',
      sections: [
        { h: 'Intensity', html: '<p>I = 4I₀ cos²(φ/2) for two equal coherent sources. Energy is redistributed, not created.</p>' },
        { h: 'Diffraction vs interference', html: '<p>Interference: equal-width fringes, equal intensity bright fringes. Diffraction: central bright widest; others fall off in intensity.</p>' },
        { h: 'Polaroid', html: '<p>Unpolarised light through one polaroid: I₀/2. Uses: sunglasses, 3D glasses, LCDs.</p>' }
      ],
      formulas: [['Fringe width', 'β = λD/d'], ['Bright', 'Δ = nλ'], ['Dark', 'Δ = (n + ½)λ'], ['Single slit min', 'a sin θ = nλ'], ['Central width', '2λD/a'], ['Malus', 'I₀ cos²θ'], ['Brewster', 'tan i_B = n']],
      terms: [['Wavefront', 'surface of constant phase'], ['Coherent', 'constant phase difference'], ['Polarisation', 'restriction of vibrations to one direction']],
      traps: ['Fringe width in water: λ → λ/n, so β decreases.', 'Two independent bulbs are not coherent.', 'Brewster angle depends on n.'],
      bridge: '<p>Ch 11 shows light also behaves as particles (photons).</p>'
    },
    explore: [
      { title: 'Young’s double slit', intro: 'Change λ, slit separation d and screen distance D.',
        build(el, K) { let lam = 600, d = 0.5, D = 1; const row = K.row(el); K.slider(row, 'λ (nm)', 400, 700, 10, lam, v => { lam = v; b.redraw(); }); K.slider(row, 'd (mm)', 0.1, 2, 0.05, d, v => { d = v; b.redraw(); }); K.slider(row, 'D (m)', 0.5, 3, 0.1, D, v => { D = v; b.redraw(); }); const b = new K.Board(el, { xmin: -10, xmax: 10, ymin: -0.5, ymax: 4.5, axes: false, grid: 0, aspect: 0.3 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const beta = lam * 1e-9 * D / (d * 1e-3) * 1000; b.line(-10, 0, 10, 0, { color: C.grey, w: 1 }); let p = null; for (let y = -10; y <= 10; y += 0.04) { const I = 4 * Math.cos(Math.PI * y / beta) ** 2; if (p) b.line(p[0], p[1], y, I, { color: C.blue, w: 2 }); p = [y, I]; } b.text(-6.5, 4.35, 'intensity across screen (mm)', { font: '12px' });
            rd.innerHTML = `fringe width β = λD/d = <b>${f(beta)} mm</b> · angular width λ/d = ${f(lam * 1e-9 / (d * 1e-3))} rad`; };
          b.redraw(); return null; } },
      { title: 'Polaroids', intro: 'Unpolarised light passes polariser then analyser at angle θ.',
        build(el, K) { let th = 30, I0 = 100; const row = K.row(el); K.slider(row, 'θ (°)', 0, 90, 1, th, v => { th = v; draw(); }); const rd = K.read(el);
          function draw() { const I1 = I0 / 2, I2 = I1 * Math.cos(th * Math.PI / 180) ** 2; rd.innerHTML = `incident ${I0} units (unpolarised) → after polariser <b>${I1}</b> → after analyser I₁cos²θ = <b>${f(I2)}</b>${th === 90 ? ' (crossed — dark)' : ''}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Fringe width', gen(R) { const lam = R.pick([500, 600, 589]), d = R.pick([0.2, 0.5, 1]), D = R.pick([1, 1.5, 2]); const b = lam * 1e-9 * D / (d * 1e-3) * 1000; return { q: `YDSE: λ = ${lam} nm, d = ${d} mm, D = ${D} m. Fringe width (mm)?`, a: `${f(b)} mm`, ans: b, tol: 1e-3 }; } },
      { title: 'Single slit', gen(R) { const lam = R.pick([500, 600]), a = R.pick([0.1, 0.2, 0.5]), D = R.pick([1, 2]); const w = 2 * lam * 1e-9 * D / (a * 1e-3) * 1000; return { q: `Slit width ${a} mm, λ = ${lam} nm, screen ${D} m. Width of central maximum (mm)?`, a: `${f(w)} mm`, ans: w, tol: 1e-3 }; } },
      { title: 'Malus', gen(R) { const I = R.pick([16, 32, 64]), th = R.pick([30, 45, 60]); const out = I * Math.cos(th * Math.PI / 180) ** 2; return { q: `Polarised light ${I} W/m² hits analyser at ${th}°. Transmitted intensity?`, a: `${f(out)} W/m²`, ans: out, tol: 1e-3 }; } },
      { title: 'Brewster', gen(R) { const n = R.pick([1.33, 1.5, 1.732]); const a = Math.atan(n) * 180 / Math.PI; return { q: `Brewster angle for n = ${n}?`, a: `${f(a)}°`, ans: a, tol: 0.01 }; } },
      { title: 'Concepts', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['What happens to fringe width if apparatus is put in water?', 'decreases (λ/n)'], ['Why can’t two bulbs give interference?', 'they are not coherent'], ['What does polarisation prove?', 'light is a transverse wave'], ['Shape of wavefront from a point source far away?', 'plane']]); } }
    ],
    quiz: [
      { q: 'β =', o: ['λD/d', 'λd/D', 'dD/λ', 'λ/dD'], a: 0, e: 'YDSE.' }, { q: 'Dark fringe path difference', o: ['(n + ½)λ', 'nλ', '2nλ', '0'], a: 0, e: 'Destructive.' },
      { q: 'Central max width', o: ['2λD/a', 'λD/a', 'λ/a', 'aD/λ'], a: 0, e: 'Twice others.' }, { q: 'Malus law', o: ['I₀cos²θ', 'I₀cosθ', 'I₀sin²θ', 'I₀/2'], a: 0, e: 'Analyser.' },
      { q: 'Brewster', o: ['tan i = n', 'sin i = n', 'cos i = n', 'i = n'], a: 0, e: 'Polarising angle.' }, { q: 'Polarisation shows light is', o: ['transverse', 'longitudinal', 'particle', 'sound'], a: 0, e: 'Only transverse.' },
      { q: 'Coherent sources have', o: ['constant phase difference', 'same colour only', 'same intensity only', 'random phase'], a: 0, e: 'Definition.' }, { q: 'Fringe width in water', o: ['decreases', 'increases', 'same', 'zero'], a: 0, e: 'λ/n.' },
      { q: 'Unpolarised through polaroid', o: ['I₀/2', 'I₀', '0', 'I₀/4'], a: 0, e: 'Average cos².' }, { q: 'Huygens: secondary wavelets from', o: ['every point on wavefront', 'only source', 'screen', 'slits only'], a: 0, e: 'Principle.' },
      { q: 'Increase d in YDSE', o: ['β decreases', 'β increases', 'no change', 'fringes vanish'], a: 0, e: 'Inverse.' }
    ],
    teach: {
      outcomes: ['Use Huygens’ principle', 'Calculate YDSE and single-slit patterns', 'Apply Malus and Brewster laws'],
      periods: [{ t: 'Interference', flow: [['10 min', 'Laser double slit demo.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Fringe problems.']] }, { t: 'Diffraction and polarisation', flow: [['15 min', 'Slit between fingers; CD diffraction.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Dark fringes destroy energy.', 'Any two sources interfere.'], activities: ['Laser through hair/slit.', 'Two polaroid sheets with phone screen.'],
      exit: ['β formula.', 'Central max width.', 'Malus law.'], homework: 'Compare interference and diffraction patterns in a table.'
    },
    slides: [{ t: 'Wave Optics', b: ['Huygens’ principle', 'Interference — YDSE', 'Single slit diffraction', 'Polarisation'] }, { t: 'Think and share', b: ['Why does a phone screen go dark through rotated sunglasses?', 'Why do soap films show colours?'] }],
    fs: { groups: [['Interference', [['β', 'λD/d'], ['Bright', 'nλ'], ['Dark', '(n+½)λ']]], ['Diffraction', [['Minima', 'a sin θ = nλ'], ['Central', '2λD/a']]], ['Polarisation', [['Malus', 'I₀cos²θ'], ['Brewster', 'tan i_B = n'], ['Polaroid', 'I₀/2']]]],
      ex: [['600 nm, 0.5 mm, 1 m', 'β 1.2 mm'], ['n 1.5', 'i_B ≈ 56.3°']], rem: ['Coherence needed.', 'Light is transverse.', 'β ∝ λ.'] }
  });
})();
