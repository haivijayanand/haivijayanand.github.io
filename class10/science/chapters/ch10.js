/*
TOOL:    class10_science_ch10
FAMILY:  CBSE_REVISION / Class 10 Science (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 10 The Human Eye and the Colourful World (eye parts, accommodation, near and far point, myopia hypermetropia presbyopia and correction, prism refraction, dispersion, rainbow, atmospheric refraction, scattering) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f2 = x => (+x.toFixed(2)).toString();
  G9.register({
    no: 10, part: 'All chapters', short: 'Eye and colours', title: 'The Human Eye and the Colourful World',
    blurb: 'The human eye — cornea, iris, pupil, lens, ciliary muscles, retina; power of accommodation; near point (25 cm) and far point (infinity); defects — myopia, hypermetropia, presbyopia — and their correction; refraction through a glass prism; dispersion and the spectrum; rainbow; atmospheric refraction (twinkling stars, early sunrise); scattering (blue sky, red sunrise and sunset, Tyndall effect).',
    revise: {
      oneLine: 'The eye lens changes its focal length with the ciliary muscles (accommodation) to focus objects from 25 cm (near point) to infinity (far point) on the retina. Myopia (near-sightedness): image before the retina — concave lens. Hypermetropia (far-sightedness): image behind the retina — convex lens. Presbyopia (old age): bifocals. A prism disperses white light into VIBGYOR because each colour bends differently (violet most, red least). Small particles scatter blue light more — blue sky; at sunrise/sunset light travels farther, leaving red.',
      sections: [
        { h: 'Correcting defects', html: `<p>Myopia: far point at x m → concave lens f = −x, P = −1/x D. Hypermetropia: near point at d cm → convex lens with 1/f = 1/25 − 1/d (in cm), giving a virtual image at d.</p>` },
        { h: 'Atmospheric refraction', html: `<p>Stars twinkle as starlight passes through moving layers of air with changing refractive index; planets (larger discs) do not. Sun appears ~2 min earlier and sets ~2 min later.</p>` },
        { h: 'Scattering', html: `<p>Blue sky, red danger lights (red scattered least, seen far), white clouds (large droplets scatter all colours).</p>` }
      ],
      formulas: [['Near point', '25 cm'], ['Myopia lens', 'concave, f = −far point'], ['Hypermetropia lens', 'convex'], ['Power', 'P = 100/f (cm)'], ['Spectrum', 'VIBGYOR'], ['Most bent', 'violet']],
      terms: [['Accommodation', 'eye lens adjusting its focal length'], ['Dispersion', 'splitting white light into colours'], ['Scattering', 'light thrown in many directions by particles']],
      traps: ['Myopia is corrected by a concave (diverging) lens.', 'Red is deviated least by a prism.', 'Stars twinkle; planets usually do not.'],
      bridge: '<p>Class 12 Physics: optical instruments and wave optics.</p>'
    },
    explore: [
      { title: 'Spectacle power calculator', intro: 'Choose the defect and the far/near point; see the corrective lens.',
        build(el, K) { let k = 0, x = 200; const row = K.row(el); K.select(row, 'defect', ['myopia (far point)', 'hypermetropia (near point)'], i => { k = i; draw(); }); K.slider(row, 'point distance (cm)', 30, 500, 5, x, v => { x = v; draw(); }); const rd = K.read(el);
          function draw() { if (k === 0) { const f = -x; rd.innerHTML = `far point ${x} cm → concave lens f = <b>${f} cm</b>, power = 100/f = <b>${f2(100 / f)} D</b> (image of far objects formed at the far point)`; } else { if (x <= 25) { rd.innerHTML = 'near point must be beyond 25 cm for hypermetropia'; return; } const inv = 1 / 25 - 1 / x; const f = 1 / inv; rd.innerHTML = `near point ${x} cm → convex lens: 1/f = 1/25 − 1/${x} → f = <b>${f2(f)} cm</b>, power = <b>+${f2(100 / f)} D</b> (book at 25 cm imaged at ${x} cm)`; } } draw(); return null; } },
      { title: 'Prism dispersion', intro: 'Change the prism’s refractive index spread; see the colours separate.',
        build(el, K) { let sp = 1; const row = K.row(el); K.slider(row, 'dispersion', 0.3, 2, 0.1, sp, v => { sp = v; b.redraw(); }); const b = new K.Board(el, { xmin: -5, xmax: 6, ymin: -3, ymax: 2.5, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el); const CO = [['violet', '#7c3aed'], ['indigo', '#4338ca'], ['blue', '#2563eb'], ['green', '#16a34a'], ['yellow', '#eab308'], ['orange', '#ea580c'], ['red', '#dc2626']];
          b.onDraw = () => { b.clear(); b.poly([[-1.2, -1.6], [1.2, -1.6], [0, 1.8]], { fill: 'rgba(148,163,184,.25)', color: C.ink, w: 2 }); b.line(-5, 0.5, -0.6, 0.1, { color: C.ink, w: 3 }); CO.forEach((c, i) => { const d = (6 - i) * 0.12 * sp; b.line(-0.6, 0.1, 0.7, -0.3 - d * 0.3, { color: c[1], w: 2 }); b.line(0.7, -0.3 - d * 0.3, 5.5, -1.2 - d * 1.6, { color: c[1], w: 3 }); b.text(5.8, -1.2 - d * 1.6, c[0], { font: '10px' }); }); };
          rd.innerHTML = 'White light → <b>VIBGYOR</b>. Violet bends the most, red the least, because the refractive index of glass differs for each colour.'; b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Myopia lens', gen(R) { const x = R.pick([50, 80, 100, 125, 200, 250]); return { q: `A myopic person’s far point is ${x} cm. Power of corrective lens?`, a: `${f2(-100 / x)} D (concave)`, ans: -100 / x, tol: 0.01 }; } },
      { title: 'Hypermetropia lens', levels: [2, 3], gen(R) { const d = R.pick([50, 75, 100, 150]); const f = 1 / (1 / 25 - 1 / d); return { q: `Near point of a hypermetropic eye is ${d} cm. Focal length and power of corrective lens? (normal near point 25 cm)`, a: `f = ${f2(f)} cm, P = +${f2(100 / f)} D`, ans: 100 / f, tol: 0.01 }; } },
      { title: 'Eye parts', gen(R) { const P = [['cornea', 'most refraction of entering light'], ['iris', 'controls pupil size'], ['pupil', 'lets light in'], ['ciliary muscles', 'change lens curvature (accommodation)'], ['retina', 'light-sensitive screen; rods and cones'], ['optic nerve', 'carries signals to the brain']]; const p = R.pick(P); return { q: `Function of the ${p[0]}?`, a: p[1] }; } },
      { title: 'Nature phenomena', gen(R) { return G9.S9.pickQ(R, [['Why is the sky blue?', 'air molecules scatter blue light most'], ['Why do stars twinkle?', 'atmospheric refraction through moving air layers'], ['Why is the sun red at sunrise?', 'light travels a longer path; blue scattered away'], ['Why are danger signals red?', 'red is scattered least, seen from far'], ['How is a rainbow formed?', 'dispersion, refraction and internal reflection in raindrops']]); } },
      { title: 'Power to f', levels: [2, 3], gen(R) { const P = R.pick([-4, -2.5, -2, 1.5, 2, 2.5, 4]); return { q: `A lens has power ${P > 0 ? '+' : ''}${P} D. Focal length and type?`, a: `${f2(100 / P)} cm, ${P > 0 ? 'convex' : 'concave'}`, ans: 100 / P, tol: 0.01 }; } }
    ],
    quiz: [
      { q: 'Near point of normal eye', o: ['25 cm', '25 m', 'infinity', '1 cm'], a: 0, e: 'Least distance.' }, { q: 'Myopia corrected by', o: ['concave lens', 'convex lens', 'prism', 'mirror'], a: 0, e: 'Diverging.' },
      { q: 'Hypermetropia corrected by', o: ['convex lens', 'concave lens', 'plane glass', 'bifocal only'], a: 0, e: 'Converging.' }, { q: 'Most deviated colour', o: ['violet', 'red', 'green', 'yellow'], a: 0, e: 'Highest n.' },
      { q: 'Blue sky due to', o: ['scattering', 'reflection', 'dispersion only', 'absorption'], a: 0, e: 'Rayleigh.' }, { q: 'Accommodation by', o: ['ciliary muscles', 'iris', 'retina', 'cornea'], a: 0, e: 'Lens shape.' },
      { q: 'Stars twinkle due to', o: ['atmospheric refraction', 'reflection', 'scattering', 'dispersion'], a: 0, e: 'Air layers.' }, { q: 'Power of far point 100 cm myopic eye', o: ['−1 D', '+1 D', '−100 D', '−0.1 D'], a: 0, e: '−1/1 m.' },
      { q: 'Presbyopia corrected by', o: ['bifocal lens', 'concave only', 'prism', 'none'], a: 0, e: 'Both.' }, { q: 'Iris controls', o: ['pupil size', 'focal length', 'colour vision', 'tears'], a: 0, e: 'Light amount.' },
      { q: 'Clouds look white because', o: ['large drops scatter all colours', 'they are blue', 'absorb red', 'reflect only blue'], a: 0, e: 'Size.' }
    ],
    teach: {
      outcomes: ['Explain eye function and defects', 'Calculate corrective lenses', 'Explain dispersion and scattering'],
      periods: [{ t: 'Eye', flow: [['10 min', 'Near point test.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Numericals.']] }, { t: 'Colours', flow: [['15 min', 'Prism with sunlight.'], ['15 min', 'Explore panel 2 / scattering in milky water.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Myopia → convex lens.', 'Sky is blue because of the sea.'], activities: ['Prism spectrum.', 'Milky water sunset demo.'],
      exit: ['Lens for each defect.', 'VIBGYOR order.', 'Why sky blue.'], homework: 'Survey 10 people with spectacles: power and defect type.'
    },
    slides: [{ t: 'The Human Eye and the Colourful World', b: ['Eye and accommodation', 'Defects and correction', 'Prism and dispersion', 'Atmospheric refraction and scattering'] }, { t: 'Think and share', b: ['Why are danger lights red?', 'Lens for far point 2 m?'] }],
    fs: { groups: [['Eye', [['Near point', '25 cm'], ['Far point', 'infinity'], ['Accommodation', 'ciliary muscles']]], ['Defects', [['Myopia', 'concave, P = −1/far point(m)'], ['Hypermetropia', 'convex'], ['Presbyopia', 'bifocal']]], ['Light in nature', [['Dispersion', 'VIBGYOR'], ['Twinkling', 'refraction'], ['Blue sky', 'scattering']]]],
      ex: [['Far point 2 m', '−0.5 D'], ['Near point 1 m', 'f 33.33 cm, +3 D']], rem: ['Concave for near-sight.', 'Violet bends most.', 'Small particles scatter blue.'] }
  });
})();
