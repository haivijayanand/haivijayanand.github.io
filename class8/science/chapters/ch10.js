/*
TOOL:    class8_science_ch10
FAMILY:  CBSE_REVISION / Class 8 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 10 Light: Mirrors and Lenses (laws of reflection, plane mirror, concave and convex mirrors, images, convex and concave lenses, uses, eye care) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 10, part: 'All chapters', short: 'Mirrors and lenses', title: 'Light: Mirrors and Lenses',
    blurb: 'Laws of reflection, images in plane mirrors, spherical mirrors — concave (converging) and convex (diverging) — their images and uses; lenses — convex (converging) and concave (diverging) — their images and uses in spectacles, magnifiers, cameras and microscopes.',
    revise: {
      oneLine: 'Angle of incidence = angle of reflection; incident ray, reflected ray and normal lie in one plane. A concave mirror converges light: far objects give real, inverted images; very close objects give an enlarged upright virtual image (shaving mirror). A convex mirror always gives a small, upright, virtual image with a wide view (rear-view mirror). A convex lens converges light (magnifying glass, camera, correcting long-sightedness); a concave lens diverges light and always gives a small upright image (correcting short-sightedness).',
      sections: [
        { h: 'Real vs virtual', html: `<p>Real images can be caught on a screen and are inverted; virtual images cannot and are upright.</p>` },
        { h: 'Mirror uses', html: `<p>Concave: torch and headlight reflectors, solar cookers, dentist and shaving mirrors. Convex: vehicle side mirrors, shop security mirrors.</p>` },
        { h: 'Lens uses', html: `<p>Convex: magnifier, microscope, camera, projector, spectacles for long sight. Concave: spectacles for short sight, peepholes.</p>` }
      ],
      formulas: [['Reflection', '∠i = ∠r'], ['Concave mirror', 'converging'], ['Convex mirror', 'diverging, wide view'], ['Convex lens', 'converging'], ['Concave lens', 'diverging']],
      terms: [['Focus', 'point where parallel rays meet (or seem to)'], ['Real image', 'can be formed on a screen'], ['Virtual image', 'cannot be formed on a screen']],
      traps: ['Convex mirror and convex lens do opposite things to light.', 'A concave mirror can give upright images only when the object is very close.', 'Plane mirror images are virtual.'],
      bridge: '<p>Class 10: Light — reflection and refraction with ray diagrams and formulas.</p>'
    },
    explore: [
      { title: 'Lens and mirror ray box', intro: 'Choose a device; see how parallel rays behave.',
        build(el, K) { const D = ['convex lens', 'concave lens', 'concave mirror', 'convex mirror']; let k = 0; const row = K.row(el); K.select(row, 'device', D, i => { k = i; b.redraw(); }); const b = new K.Board(el, { xmin: -5, xmax: 5, ymin: -2.2, ymax: 2.2, axes: false, grid: 0, aspect: 0.45 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.line(-5, 0, 5, 0, { color: C.grey, w: 1, dash: [4, 4] }); const Fd = 2; const ys = [-1.2, -0.6, 0.6, 1.2];
            if (k < 2) { const pts = []; for (let t = -1.6; t <= 1.6; t += 0.1) pts.push([(k ? 1 : -1) * 0.25 * (1 - (t / 1.6) ** 2) * (k ? -1 : 1) * -1, t]); b.poly(k ? [[-0.35, -1.6], [0.35, -1.6], [0.1, 0], [0.35, 1.6], [-0.35, 1.6], [-0.1, 0]] : [[0, -1.6], [0.3, 0], [0, 1.6], [-0.3, 0]], { fill: 'rgba(59,130,246,.25)', color: C.blue, w: 2 }); ys.forEach(y => { b.line(-5, y, 0, y, { color: C.orange, w: 2 }); if (!k) b.arrow(0, y, 4.5, y - y * 4.5 / Fd, { color: C.orange, w: 2 }); else { b.arrow(0, y, 4.5, y + y * 4.5 / Fd, { color: C.orange, w: 2 }); b.line(0, y, -Fd, 0, { color: C.orange, w: 1, dash: [3, 4] }); } }); b.dot(k ? -Fd : Fd, 0, { r: 5, color: C.purple }); b.text(k ? -Fd : Fd, -0.35, 'F', { font: 'bold 12px' }); rd.innerHTML = k ? '<b>concave lens</b>: parallel rays spread out as if coming from F in front — <b>diverging</b>; image always small, upright, virtual' : '<b>convex lens</b>: parallel rays meet at the focus F — <b>converging</b>'; }
            else { const cc = k === 2; const xm = 1.5; const pts = []; for (let t = -1.6; t <= 1.6; t += 0.1) pts.push([xm + (cc ? -1 : 1) * 0.25 * (t / 1.6) ** 2, t]); for (let i = 0; i < pts.length - 1; i++) b.line(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], { color: C.blue, w: 4 }); ys.forEach(y => { b.line(-5, y, xm, y, { color: C.orange, w: 2 }); if (cc) b.arrow(xm, y, xm - 4.5, y - y * 4.5 / Fd, { color: C.orange, w: 2 }); else { b.arrow(xm, y, xm - 4.5, y + y * 4.5 / Fd, { color: C.orange, w: 2 }); b.line(xm, y, xm + Fd, 0, { color: C.orange, w: 1, dash: [3, 4] }); } }); b.dot(cc ? xm - Fd : xm + Fd, 0, { r: 5, color: C.purple }); b.text(cc ? xm - Fd : xm + Fd, -0.35, 'F', { font: 'bold 12px' }); rd.innerHTML = cc ? '<b>concave mirror</b>: reflected rays meet at F in front — <b>converging</b> (torch reflector, solar cooker)' : '<b>convex mirror</b>: reflected rays spread as if from F behind — <b>diverging</b>, wide view (rear-view mirror)'; } };
          b.redraw(); return null; } },
      { title: 'Which one is used?', intro: 'Sort the uses.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Concave mirror', 'Convex mirror', 'Convex lens', 'Concave lens'], items: [['torch reflector', 0], ['vehicle rear-view mirror', 1], ['magnifying glass', 2], ['spectacles for short sight', 3], ['dentist’s mirror', 0], ['camera lens', 2], ['shop security mirror', 1], ['door peephole', 3]] }); } }
    ],
    gens: [
      { title: 'Reflection', gen(R) { const i = R.int(10, 80); return R.chance(.5) ? { q: `Angle of incidence ${i}°. Angle of reflection?`, a: `${i}°`, ans: i } : { q: `A ray makes ${90 - i}° with the mirror surface. Angle of reflection?`, a: `${i}°`, ans: i }; } },
      { title: 'Converge or diverge', gen(R) { return G9.S9.groupQ(R, [['concave mirror', 0], ['convex mirror', 1], ['convex lens', 0], ['concave lens', 1]], ['converging', 'diverging'], 'Converging or diverging: '); } },
      { title: 'Uses', gen(R) { const u = R.pick([['rear-view mirror', 'convex mirror'], ['solar cooker', 'concave mirror'], ['magnifier', 'convex lens'], ['short-sight spectacles', 'concave lens'], ['shaving mirror', 'concave mirror'], ['long-sight spectacles', 'convex lens']]); return { q: `Which mirror/lens is used in a ${u[0]}?`, a: u[1] }; } },
      { title: 'Real or virtual', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Image in a plane mirror?', 'virtual, upright, same size'], ['Image of a far object by a concave mirror?', 'real, inverted, small, near focus'], ['Image by a convex mirror?', 'virtual, upright, small'], ['Image by a concave lens?', 'virtual, upright, small']]); } },
      { title: 'Plane mirror distance', levels: [2, 3], gen(R) { const d = R.int(1, 6), m = R.int(1, d); return { q: `You stand ${d} m from a plane mirror and step ${m} m closer. New distance between you and your image?`, a: `${2 * (d - m)} m`, ans: 2 * (d - m) }; } }
    ],
    quiz: [
      { q: '∠i = 40°', o: ['∠r = 40°', '50°', '80°', '20°'], a: 0, e: 'Equal.' }, { q: 'Rear-view mirror', o: ['convex', 'concave', 'plane', 'lens'], a: 0, e: 'Wide.' },
      { q: 'Magnifying glass', o: ['convex lens', 'concave lens', 'convex mirror', 'plane mirror'], a: 0, e: 'Converging.' }, { q: 'Short-sight spectacles', o: ['concave lens', 'convex lens', 'mirror', 'prism'], a: 0, e: 'Diverging.' },
      { q: 'Torch reflector', o: ['concave mirror', 'convex mirror', 'plane', 'lens'], a: 0, e: 'Beam.' }, { q: 'Real image', o: ['can be on a screen', 'never on a screen', 'always upright', 'always larger'], a: 0, e: 'Screen.' },
      { q: 'Convex mirror image', o: ['small, upright', 'large, inverted', 'real', 'none'], a: 0, e: 'Diminished.' }, { q: 'Concave lens', o: ['diverges', 'converges', 'reflects', 'absorbs'], a: 0, e: 'Spreads.' },
      { q: 'Solar cooker uses', o: ['concave mirror', 'convex mirror', 'concave lens', 'plane glass'], a: 0, e: 'Focus heat.' }, { q: 'Plane mirror image', o: ['virtual', 'real', 'inverted', 'magnified'], a: 0, e: 'Virtual.' },
      { q: 'Dentist mirror', o: ['concave', 'convex', 'plane', 'none'], a: 0, e: 'Enlarged.' }
    ],
    teach: {
      outcomes: ['Apply laws of reflection', 'Describe images by mirrors and lenses', 'Match devices to uses'],
      periods: [{ t: 'Mirrors', flow: [['10 min', 'Spoon mirrors (both sides).'], ['15 min', 'Explore panel 1.'], ['15 min', 'Focus sunlight with concave mirror (care).']] }, { t: 'Lenses', flow: [['15 min', 'Magnifier and window image.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Convex = converging always.', 'Virtual images are fake.'], activities: ['Spoon mirror images.', 'Focal length of a convex lens by window image.'],
      exit: ['Law of reflection.', 'Two uses each.', 'Real vs virtual.'], homework: 'List mirrors and lenses you find at home or on vehicles and identify their type.'
    },
    slides: [{ t: 'Light: Mirrors and Lenses', b: ['Laws of reflection', 'Concave and convex mirrors', 'Convex and concave lenses', 'Uses'] }, { t: 'Think and share', b: ['Why convex rear-view mirrors?', 'Which lens corrects short sight?'] }],
    fs: { groups: [['Reflection', [['Law', '∠i = ∠r'], ['Plane image', 'virtual, upright']]], ['Mirrors', [['Concave', 'converging; torch, cooker, dentist'], ['Convex', 'diverging; rear-view']]], ['Lenses', [['Convex', 'converging; magnifier, camera'], ['Concave', 'diverging; short sight']]]],
      ex: [['∠i 35°', '∠r 35°'], ['4 m → 1 m closer', '6 m to image']], rem: ['Mirror convex ≠ lens convex.', 'Real images invert.', 'Match use to device.'] }
  });
})();
