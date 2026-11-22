/*
TOOL:    class7_science_ch11
FAMILY:  CBSE_REVISION / Class 7 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 11 Light: Shadows and Reflections (luminous objects, light in straight lines, shadows, pinhole camera, plane mirror reflection, lateral inversion, spherical mirrors uses) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 11, part: 'All chapters', short: 'Light', title: 'Light: Shadows and Reflections',
    blurb: 'Luminous and non-luminous objects, light travelling in straight lines, transparent, translucent and opaque materials, shadows, the pinhole camera, reflection by a plane mirror (equal angles, upright, same size, laterally inverted image) and uses of curved mirrors.',
    revise: {
      oneLine: 'Light travels in straight lines. An opaque object blocks light and forms a shadow on the opposite side from the source; shadow size depends on distances. A pinhole camera gives an inverted image. A plane mirror reflects light with angle of incidence = angle of reflection; its image is upright, same size, as far behind as the object is in front, and laterally inverted (left–right swapped).',
      sections: [
        { h: 'Shadows', html: `<p>Shadow is dark whatever the object’s colour. Moving the object closer to the torch makes the shadow larger.</p>` },
        { h: 'Mirror image', html: `<p>Write AMBULANCE reversed on vehicles so drivers read it correctly in a mirror. Periscopes use two plane mirrors.</p>` },
        { h: 'Curved mirrors', html: `<p>Concave mirrors: torch reflectors, shaving and dentist mirrors (enlarged image close up). Convex mirrors: vehicle rear-view mirrors (wide view, smaller image).</p>` }
      ],
      formulas: [['Light path', 'straight lines'], ['Reflection', '∠i = ∠r'], ['Plane mirror image', 'upright, same size, laterally inverted'], ['Image distance', '= object distance'], ['Pinhole image', 'inverted']],
      terms: [['Luminous', 'gives its own light'], ['Lateral inversion', 'left and right swapped'], ['Shadow', 'dark area where light is blocked']],
      traps: ['The Moon is non-luminous.', 'Image in a plane mirror is not upside down.', 'Shadow forms only with an opaque (or partly with translucent) object.'],
      bridge: '<p>Class 8 and 10 study reflection, refraction and mirrors in detail.</p>'
    },
    explore: [
      { title: 'Reflection angles', intro: 'Change the angle of incidence; the reflected ray makes the same angle with the normal.',
        build(el, K) { let a = 40; const row = K.row(el); K.slider(row, 'angle of incidence (°)', 5, 80, 1, a, v => { a = v; b.redraw(); }); const b = new K.Board(el, { xmin: -3, xmax: 3, ymin: -0.4, ymax: 2.6, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.rect(-2.8, -0.25, 5.6, 0.25, { fill: '#cbd5e1', color: C.ink, w: 1.5 }); b.line(0, 0, 0, 2.4, { color: C.grey, w: 1, dash: [5, 5] }); b.text(0.3, 2.4, 'normal', { font: '11px' }); const r = a * Math.PI / 180, L = 2.3; b.arrow(-L * Math.sin(r), L * Math.cos(r), 0, 0, { color: C.orange, w: 3 }); b.arrow(0, 0, L * Math.sin(r), L * Math.cos(r), { color: C.blue, w: 3 }); b.text(-0.6, 1.4, `i = ${a}°`, { font: 'bold 13px' }); b.text(0.6, 1.4, `r = ${a}°`, { font: 'bold 13px' }); };
          rd.innerHTML = 'angle of incidence (orange ray) = angle of reflection (blue ray), both measured from the normal'; b.redraw(); return null; } },
      { title: 'Shadow size', intro: 'Move the object between the torch and the screen; watch the shadow size.',
        build(el, K) { let x = 2; const row = K.row(el); K.slider(row, 'object distance from torch', 1, 7, 0.1, x, v => { x = v; b.redraw(); }); const b = new K.Board(el, { xmin: -0.5, xmax: 9, ymin: -3, ymax: 3, axes: false, grid: 0, aspect: 0.55 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.dot(0, 0, { r: 9, color: '#fbbf24' }); b.line(8, -3, 8, 3, { color: C.ink, w: 4 }); const h = 0.5, s = h * 8 / x; b.rect(x - 0.05, -h, 0.1, 2 * h, { fill: C.purple, color: C.purple }); b.line(0, 0, 8, Math.min(s, 3), { color: '#fbbf24', w: 1 }); b.line(0, 0, 8, -Math.min(s, 3), { color: '#fbbf24', w: 1 }); b.line(8, -Math.min(s, 3), 8, Math.min(s, 3), { color: '#1e1b4b', w: 8 });
            rd.innerHTML = `object 1 unit tall at ${x.toFixed(1)} from torch, screen at 8 → shadow ≈ <b>${(2 * s).toFixed(1)} units</b> tall · closer to torch → bigger shadow`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Luminous?', gen(R) { return G9.S9.groupQ(R, [['the Sun', 0], ['the Moon', 1], ['a glowing bulb', 0], ['a mirror', 1], ['a candle flame', 0], ['a book', 1]], ['luminous', 'non-luminous'], 'Luminous or non-luminous: '); } },
      { title: 'Reflection', gen(R) { const a = R.int(10, 80); return { q: `A ray strikes a plane mirror at ${a}° to the normal. Angle of reflection?`, a: `${a}°`, ans: a }; } },
      { title: 'Mirror image', gen(R) { const d = R.int(1, 5); return R.chance(.5) ? { q: `You stand ${d} m in front of a plane mirror. Distance between you and your image?`, a: `${2 * d} m`, ans: 2 * d } : { q: `Your image is ${d} m behind a plane mirror. How far are you from the mirror?`, a: `${d} m`, ans: d }; } },
      { title: 'Shadow size', levels: [2, 3], gen(R) { const h = R.int(2, 6), x = R.pick([1, 2, 4]), D = R.pick([8, 12]); return { q: `A torch is ${D} m from a screen. An object ${h} cm tall is ${x} m from the torch. Shadow height? (similar triangles)`, a: `${h * D / x} cm`, ans: h * D / x }; } },
      { title: 'Uses', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Mirror used as a car rear-view mirror?', 'convex — wide view'], ['Mirror used by dentists?', 'concave — enlarged image'], ['Why is AMBULANCE written reversed?', 'lateral inversion makes it readable in a mirror'], ['Image in a pinhole camera?', 'inverted']]); } }
    ],
    quiz: [
      { q: 'Light travels', o: ['in straight lines', 'in curves', 'around corners easily', 'only in water'], a: 0, e: 'Straight.' }, { q: 'Moon is', o: ['non-luminous', 'luminous', 'a star', 'a bulb'], a: 0, e: 'Reflects.' },
      { q: '∠i = 30°, ∠r =', o: ['30°', '60°', '90°', '15°'], a: 0, e: 'Equal.' }, { q: 'Plane mirror image', o: ['upright, laterally inverted', 'upside down', 'smaller', 'larger'], a: 0, e: 'Same size.' },
      { q: 'Pinhole camera image', o: ['inverted', 'upright', 'coloured backwards', 'none'], a: 0, e: 'Upside down.' }, { q: 'Rear-view mirror', o: ['convex', 'concave', 'plane', 'none'], a: 0, e: 'Wide.' },
      { q: 'Shadow is formed by', o: ['opaque object', 'transparent glass', 'air', 'light'], a: 0, e: 'Blocks.' }, { q: 'Object 2 m before mirror; image distance from object', o: ['4 m', '2 m', '1 m', '0 m'], a: 0, e: '2 + 2.' },
      { q: 'Closer to torch, shadow', o: ['bigger', 'smaller', 'same', 'vanishes'], a: 0, e: 'Bigger.' }, { q: 'Dentist mirror', o: ['concave', 'convex', 'plane', 'glass sheet'], a: 0, e: 'Enlarges.' },
      { q: 'Lateral inversion', o: ['left–right swap', 'upside down', 'colour change', 'magnify'], a: 0, e: 'Sides.' }
    ],
    teach: {
      outcomes: ['Explain shadows', 'State laws of reflection', 'Describe plane mirror images'],
      periods: [{ t: 'Light and shadows', flow: [['10 min', 'Straight pipe test.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Make a pinhole camera.']] }, { t: 'Reflection', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Mirror writing activity.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Shadows have colour of object.', 'Mirror flips up–down.'], activities: ['Pinhole camera.', 'Periscope.'],
      exit: ['Law of reflection.', 'Image features.', 'Use of convex mirror.'], homework: 'Make a pinhole camera from a box and describe the image.'
    },
    slides: [{ t: 'Light: Shadows and Reflections', b: ['Straight-line travel', 'Shadows', 'Plane mirror', 'Curved mirror uses'] }, { t: 'Think and share', b: ['Why is AMBULANCE reversed?', 'Why convex rear-view mirrors?'] }],
    fs: { groups: [['Light', [['Travel', 'straight lines'], ['Luminous', 'own light'], ['Shadow', 'blocked light']]], ['Plane mirror', [['∠i', '= ∠r'], ['Image', 'upright, same size'], ['Distance', 'same behind'], ['Lateral', 'inverted']]], ['Curved mirrors', [['Concave', 'torch, dentist'], ['Convex', 'rear-view']]]],
      ex: [['3 m from mirror', 'image 6 m from you'], ['∠i 45°', '∠r 45°']], rem: ['Measure from the normal.', 'Image behind = object front.', 'Pinhole gives inverted image.'] }
  });
})();
