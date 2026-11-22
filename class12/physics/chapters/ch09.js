/*
TOOL:    class12_physics_ch09
FAMILY:  CBSE_REVISION / Class 12 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 9 Ray Optics and Optical Instruments (reflection by spherical mirrors, refraction, total internal reflection, refraction at spherical surfaces, lens maker’s formula, lens combinations, prism, optical instruments: microscope and telescope) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 9, part: 'Part II', short: 'Ray optics', title: 'Ray Optics and Optical Instruments',
    blurb: 'Reflection by spherical mirrors and the mirror equation; refraction and Snell’s law; real and apparent depth; total internal reflection (critical angle, optical fibres, mirage, diamond); refraction at a spherical surface; thin lens formula and lens maker’s formula; power and combination of lenses; refraction through a prism (minimum deviation); simple microscope, compound microscope and astronomical telescope (magnifying power).',
    revise: {
      oneLine: 'Mirror: 1/v + 1/u = 1/f; lens: 1/v − 1/u = 1/f (Cartesian signs). Lens maker: 1/f = (n − 1)(1/R₁ − 1/R₂). Power P = 1/f (m); in contact P = P₁ + P₂. TIR when light goes from denser to rarer and i > critical angle C, sin C = 1/n. Prism: n = sin[(A + D_m)/2] / sin(A/2); thin prism δ = (n − 1)A. Simple microscope m = 1 + D/f (image at D = 25 cm). Compound microscope m ≈ (L/f_o)(D/f_e). Telescope (normal adjustment) m = f_o/f_e, length f_o + f_e.',
      sections: [
        { h: 'Apparent depth', html: '<p>Apparent depth = real depth / n (viewing from above water: a pool looks shallower).</p>' },
        { h: 'TIR uses', html: '<p>Optical fibres, sparkle of diamond (C ≈ 24.4°), mirage, prism periscopes and binoculars (45° prisms).</p>' },
        { h: 'Refraction at a surface', html: '<p>n₂/v − n₁/u = (n₂ − n₁)/R.</p>' }
      ],
      formulas: [['Mirror', '1/v + 1/u = 1/f'], ['Lens', '1/v − 1/u = 1/f'], ['Lens maker', '(n − 1)(1/R₁ − 1/R₂)'], ['Critical angle', 'sin C = 1/n'], ['Prism', 'n = sin((A+D)/2)/sin(A/2)'], ['Microscope', 'm ≈ (L/f_o)(D/f_e)'], ['Telescope', 'm = f_o/f_e']],
      terms: [['Critical angle', 'angle of incidence giving 90° refraction'], ['Minimum deviation', 'least deviation by a prism (symmetric path)'], ['Magnifying power', 'angle subtended by image / by object']],
      traps: ['TIR needs denser → rarer.', 'Telescope objective has large f; microscope objective small f.', 'Lens maker uses signed radii.'],
      bridge: '<p>Ch 10 explains light’s wave behaviour (interference, diffraction).</p>'
    },
    explore: [
      { title: 'Total internal reflection', intro: 'Light leaves a dense medium into air; change angle and n.',
        build(el, K) { let i0 = 30, n = 1.5; const row = K.row(el); K.slider(row, 'angle of incidence (°)', 0, 89, 1, i0, v => { i0 = v; b.redraw(); }); K.slider(row, 'n of medium', 1.1, 2.5, 0.01, n, v => { n = v; b.redraw(); }); const b = new K.Board(el, { xmin: -3, xmax: 3, ymin: -2.2, ymax: 2.2, axes: false, grid: 0, aspect: 0.6 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.rect(-3, -2.2, 6, 2.2, { fill: 'rgba(59,130,246,.2)', color: 'none' }); b.line(-3, 0, 3, 0, { color: C.ink, w: 1.5 }); b.line(0, -2.1, 0, 2.1, { color: C.grey, w: 1, dash: [4, 4] }); const r = i0 * Math.PI / 180; b.arrow(-2 * Math.sin(r), -2 * Math.cos(r), 0, 0, { color: C.orange, w: 3 }); const Cc = Math.asin(1 / n); const s = n * Math.sin(r); if (s < 1) { const t = Math.asin(s); b.arrow(0, 0, 2 * Math.sin(t), 2 * Math.cos(t), { color: C.blue, w: 3 }); b.arrow(0, 0, 2 * Math.sin(r), -2 * Math.cos(r), { color: 'rgba(124,58,237,.4)', w: 1.5 }); } else b.arrow(0, 0, 2 * Math.sin(r), -2 * Math.cos(r), { color: C.purple, w: 3 }); b.text(-2.4, 1.9, 'air', { font: '12px' }); b.text(-2.4, -1.9, `n = ${n}`, { font: '12px' });
            rd.innerHTML = `critical angle C = sin⁻¹(1/n) = <b>${f(Cc * 180 / Math.PI)}°</b> · ${s < 1 ? `refracted at ${f(Math.asin(s) * 180 / Math.PI)}° (partial reflection)` : '<b>total internal reflection</b>'}`; };
          b.redraw(); return null; } },
      { title: 'Instrument designer', intro: 'Choose instrument and focal lengths.',
        build(el, K) { let k = 0, fo = 100, fe = 5, L = 15; const row = K.row(el); K.select(row, 'instrument', ['astronomical telescope', 'compound microscope', 'simple microscope'], i => { k = i; draw(); }); K.slider(row, 'f objective (cm)', 0.5, 200, 0.5, fo, v => { fo = v; draw(); }); K.slider(row, 'f eyepiece (cm)', 1, 10, 0.5, fe, v => { fe = v; draw(); }); K.slider(row, 'tube length L (cm)', 10, 25, 1, L, v => { L = v; draw(); }); const rd = K.read(el);
          function draw() { if (k === 0) rd.innerHTML = `m = f_o/f_e = <b>${f(fo / fe)}</b> · tube length = f_o + f_e = ${f(fo + fe)} cm · large f_o objective collects more light`; else if (k === 1) rd.innerHTML = `m ≈ (L/f_o)(D/f_e) = (${L}/${fo})(25/${fe}) = <b>${f(L / fo * 25 / fe)}</b> · use small f_o (≈ 0.5–2 cm) for high magnification`; else rd.innerHTML = `m = 1 + D/f = <b>${f(1 + 25 / fe)}</b> (image at 25 cm) or D/f = ${f(25 / fe)} (image at infinity)`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Lens maker', gen(R) { const n = R.pick([1.5, 1.6]), R1 = R.pick([10, 15, 20, 30]), R2 = -R.pick([10, 15, 20, 30]); const fl = 1 / ((n - 1) * (1 / R1 - 1 / R2)); return { q: `Biconvex lens: n = ${n}, R₁ = +${R1} cm, R₂ = ${R2} cm. Focal length?`, a: `${f(fl)} cm`, ans: fl, tol: 0.01 }; } },
      { title: 'Critical angle', gen(R) { const n = R.pick([1.33, 1.5, 2.42]); return { q: `Critical angle for n = ${n} (to air)?`, a: `${f(Math.asin(1 / n) * 180 / Math.PI)}°`, ans: Math.asin(1 / n) * 180 / Math.PI, tol: 0.01 }; } },
      { title: 'Power in contact', gen(R) { const a = R.pick([10, 20, 25]), b = -R.pick([30, 40, 50, 100]); const P = 100 / a + 100 / b; return { q: `Lenses f = +${a} cm and ${b} cm in contact. Net power and focal length?`, a: `P = ${f(P)} D, f = ${f(100 / P)} cm`, ans: P, tol: 0.001 }; } },
      { title: 'Telescope', gen(R) { const fo = R.pick([100, 150, 200]), fe = R.pick([2, 4, 5, 10]); return { q: `Telescope with f_o = ${fo} cm, f_e = ${fe} cm (normal adjustment). Magnification and length?`, a: `m = ${fo / fe}, L = ${fo + fe} cm`, ans: fo / fe }; } },
      { title: 'Prism / depth', levels: [2, 3], gen(R) { if (R.chance(.5)) { const A = 60, D = R.pick([30, 38, 40]); const n = Math.sin((A + D) * Math.PI / 360) / Math.sin(A * Math.PI / 360); return { q: `Prism A = 60°, minimum deviation ${D}°. Refractive index?`, a: f(n), ans: n, tol: 0.001 }; } const d = R.pick([1, 2, 3, 4]); return { q: `A pool is ${d} m deep (n = 1.33). Apparent depth seen from above?`, a: `${f(d / 1.33)} m`, ans: d / 1.33, tol: 0.001 }; } }
    ],
    quiz: [
      { q: 'sin C =', o: ['1/n', 'n', 'n − 1', '1 − n'], a: 0, e: 'TIR.' }, { q: 'TIR needs', o: ['denser to rarer', 'rarer to denser', 'any', 'equal media'], a: 0, e: 'Direction.' },
      { q: 'Lens maker', o: ['(n−1)(1/R₁ − 1/R₂)', 'n(R₁ + R₂)', '(n+1)/R', '1/R₁R₂'], a: 0, e: 'Formula.' }, { q: 'Telescope m', o: ['f_o/f_e', 'f_e/f_o', 'f_o f_e', '1 + D/f'], a: 0, e: 'Normal adjustment.' },
      { q: 'Optical fibre works by', o: ['TIR', 'dispersion', 'diffraction', 'polarisation'], a: 0, e: 'Guiding.' }, { q: 'Lenses in contact', o: ['P = P₁ + P₂', 'f = f₁ + f₂', 'P = P₁P₂', 'none'], a: 0, e: 'Add power.' },
      { q: 'Apparent depth', o: ['real/n', 'real × n', 'real', 'real + n'], a: 0, e: 'Shallower.' }, { q: 'Diamond sparkles due to', o: ['small critical angle', 'large size', 'colour', 'magnetism'], a: 0, e: '24°.' },
      { q: 'Simple microscope m (image at D)', o: ['1 + D/f', 'D/f only', 'f/D', 'f_o/f_e'], a: 0, e: 'Magnifier.' }, { q: 'Microscope objective', o: ['short focal length', 'long', 'mirror', 'none'], a: 0, e: 'High m.' },
      { q: 'Thin prism δ', o: ['(n−1)A', 'nA', 'A/n', '2A'], a: 0, e: 'Small angle.' }
    ],
    teach: {
      outcomes: ['Use mirror, lens and lens-maker formulas', 'Apply TIR and prism relations', 'Find magnifying power of instruments'],
      periods: [{ t: 'Refraction and TIR', flow: [['10 min', 'Laser in water tank.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Lens maker problems.']] }, { t: 'Instruments', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Build a paper-tube telescope.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['TIR from air into glass.', 'Bigger lens = higher magnification.'], activities: ['Laser TIR in water stream.', 'Two-lens telescope.'],
      exit: ['Critical angle.', 'Combination power.', 'Telescope m.'], homework: 'Find the focal length of a convex lens using u–v method and plot 1/v vs 1/u.'
    },
    slides: [{ t: 'Ray Optics', b: ['Mirrors and refraction', 'TIR', 'Lenses and lens maker', 'Prism and instruments'] }, { t: 'Think and share', b: ['Why do diamonds sparkle?', 'Why long telescopes?'] }],
    fs: { groups: [['Formulas', [['Mirror', '1/v + 1/u = 1/f'], ['Lens', '1/v − 1/u = 1/f'], ['Maker', '(n−1)(1/R₁−1/R₂)']]], ['Refraction', [['TIR', 'sin C = 1/n'], ['Depth', 'real/n'], ['Prism', 'n = sin((A+D)/2)/sin(A/2)']]], ['Instruments', [['Simple', '1 + D/f'], ['Compound', '(L/f_o)(D/f_e)'], ['Telescope', 'f_o/f_e']]]],
      ex: [['n 1.5, R 20, −20', 'f 20 cm'], ['f_o 150, f_e 5', 'm 30']], rem: ['Signs first.', 'Dense → rare for TIR.', 'Powers add.'] }
  });
})();
