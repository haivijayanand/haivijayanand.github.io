/*
TOOL:    class10_science_ch09
FAMILY:  CBSE_REVISION / Class 10 Science (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 9 Light – Reflection and Refraction (spherical mirrors, sign convention, mirror formula, magnification, refraction laws, refractive index, lenses, lens formula, power) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f2 = x => (+x.toFixed(2)).toString();
  G9.register({
    no: 9, part: 'All chapters', short: 'Light', title: 'Light – Reflection and Refraction',
    blurb: 'Laws of reflection; concave and convex mirrors — pole, centre of curvature, focus (f = R/2), ray diagrams, images; New Cartesian sign convention; mirror formula 1/v + 1/u = 1/f and magnification m = −v/u; refraction laws, Snell’s law and refractive index n = c/v; convex and concave lenses, lens formula 1/v − 1/u = 1/f, m = v/u; power P = 1/f (dioptre).',
    revise: {
      oneLine: 'Use the New Cartesian sign convention: distances measured from the pole/optical centre; along incident light positive, against it negative; heights above axis positive. Mirror: 1/v + 1/u = 1/f, m = −v/u; concave f negative, convex f positive. Lens: 1/v − 1/u = 1/f, m = v/u; convex f positive, concave f negative. Refractive index n = c/v = sin i / sin r. Power P = 1/f (f in metres), unit dioptre (D).',
      sections: [
        { h: 'Concave mirror images', html: `<p>Object at infinity → image at F (real, point); beyond C → between F and C (real, inverted, small); at C → at C (same size); between C and F → beyond C (enlarged); at F → at infinity; between F and P → behind mirror (virtual, erect, enlarged).</p>` },
        { h: 'Refraction', html: `<p>Light bends towards the normal entering a denser medium. Glass slab gives a lateral shift; emergent ray parallel to incident. Water n ≈ 1.33, glass ≈ 1.5, diamond ≈ 2.42.</p>` },
        { h: 'Lenses', html: `<p>Convex lens images mirror the concave-mirror list (object inside F → virtual, magnified — magnifier). Concave lens: always virtual, erect, diminished.</p>` }
      ],
      formulas: [['Mirror', '1/v + 1/u = 1/f'], ['Mirror m', '−v/u'], ['Lens', '1/v − 1/u = 1/f'], ['Lens m', 'v/u'], ['f (mirror)', 'R/2'], ['n', 'c/v = sin i / sin r'], ['Power', 'P = 1/f (m), D']],
      terms: [['Principal focus', 'point where parallel rays meet (or seem to)'], ['Refractive index', 'ratio of light speeds'], ['Dioptre', 'power of a lens with f = 1 m']],
      traps: ['Object distance u is negative for real objects.', 'Mirror and lens formulas differ in sign.', 'Convert f to metres before finding power.'],
      bridge: '<p>Ch 10 applies lenses to the eye; Class 12 Ray Optics extends this.</p>'
    },
    explore: [
      { title: 'Lens / mirror calculator', intro: 'Choose a device, focal length and object distance (u negative); see image distance, magnification and nature.',
        build(el, K) { const D = ['convex lens', 'concave lens', 'concave mirror', 'convex mirror']; let k = 0, f = 15, u = -30; const row = K.row(el); K.select(row, 'device', D, i => { k = i; draw(); }); K.slider(row, '|f| (cm)', 5, 40, 1, f, v => { f = v; draw(); }); K.slider(row, 'u (cm)', -80, -2, 1, u, v => { u = v; draw(); }); const rd = K.read(el);
          function draw() { const F = [f, -f, -f, f][k]; const lens = k < 2; let v, m; if (lens) { const iv = 1 / F + 1 / u; v = iv === 0 ? Infinity : 1 / iv; m = v / u; } else { const iv = 1 / F - 1 / u; v = iv === 0 ? Infinity : 1 / iv; m = -v / u; }
            if (!isFinite(v)) { rd.innerHTML = `object at focus → image at <b>infinity</b> (rays parallel)`; return; } const real = lens ? v > 0 : v < 0; rd.innerHTML = `f = ${F} cm, u = ${u} cm → v = <b>${f2(v)} cm</b> · m = <b>${f2(m)}</b> → image is <b>${real ? 'real, inverted' : 'virtual, erect'}</b>, ${Math.abs(m) > 1.001 ? 'enlarged' : Math.abs(m) < 0.999 ? 'diminished' : 'same size'} · power = ${lens ? f2(100 / F) + ' D' : '—'}`; } draw(); return null; } },
      { title: 'Snell’s law', intro: 'Change the angle of incidence and the medium; see the refracted ray.',
        build(el, K) { const M = [['water', 1.33], ['glass', 1.5], ['diamond', 2.42]]; let i0 = 40, k = 1; const row = K.row(el); K.slider(row, 'angle of incidence (°)', 0, 85, 1, i0, v => { i0 = v; b.redraw(); }); const s = K.select(row, 'into', M.map(m => m[0]), j => { k = j; b.redraw(); }); s.value = 1; const b = new K.Board(el, { xmin: -3, xmax: 3, ymin: -2.2, ymax: 2.2, axes: false, grid: 0, aspect: 0.6 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.rect(-3, -2.2, 6, 2.2, { fill: 'rgba(59,130,246,.2)', color: 'none' }); b.line(-3, 0, 3, 0, { color: C.ink, w: 1.5 }); b.line(0, -2.1, 0, 2.1, { color: C.grey, w: 1, dash: [4, 4] }); const n = M[k][1]; const ri = i0 * Math.PI / 180; const rr = Math.asin(Math.sin(ri) / n); b.arrow(-2 * Math.sin(ri), 2 * Math.cos(ri), 0, 0, { color: C.orange, w: 3 }); b.arrow(0, 0, 2 * Math.sin(rr), -2 * Math.cos(rr), { color: C.blue, w: 3 }); b.text(-2.4, 1.9, 'air', { font: '12px' }); b.text(-2.4, -1.9, M[k][0], { font: '12px' });
            rd.innerHTML = `n = ${n} · sin r = sin ${i0}° ÷ ${n} → r = <b>${f2(rr * 180 / Math.PI)}°</b> · speed in ${M[k][0]} = c/n = <b>${f2(3 / n)} × 10⁸ m/s</b> · ray bends towards the normal`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Mirror formula', gen(R) { const f = -R.pick([10, 12, 15, 20]), u = -R.pick([30, 40, 60]); const v = 1 / (1 / f - 1 / u); return { q: `Concave mirror f = ${f} cm, object at u = ${u} cm. Image distance v?`, a: `${f2(v)} cm`, ans: v, tol: 0.01 }; } },
      { title: 'Lens formula', gen(R) { const f = R.pick([10, 15, 20]), u = -R.pick([30, 40, 60]); const v = 1 / (1 / f + 1 / u); return { q: `Convex lens f = +${f} cm, u = ${u} cm. Find v and m.`, a: `v = ${f2(v)} cm, m = ${f2(v / u)}`, ans: v, tol: 0.01 }; } },
      { title: 'Power', gen(R) { const f = R.pick([-50, -25, 20, 25, 40, 50, 100, -100]); return { q: `Power of a lens of focal length ${f} cm?`, a: `${f2(100 / f)} D (${f > 0 ? 'convex' : 'concave'})`, ans: 100 / f, tol: 0.01 }; } },
      { title: 'Refractive index', levels: [2, 3], gen(R) { const n = R.pick([1.25, 1.33, 1.5, 2]); return { q: `Light travels at ${f2(3 / n)} × 10⁸ m/s in a medium. Refractive index? (c = 3 × 10⁸ m/s)`, a: String(n), ans: n, tol: 0.01 }; } },
      { title: 'Radius and focus', levels: [2, 3], gen(R) { const r = R.pick([20, 24, 30, 40, 60]); return { q: `A spherical mirror has radius of curvature ${r} cm. Focal length?`, a: `${r / 2} cm`, ans: r / 2 }; } }
    ],
    quiz: [
      { q: 'Mirror formula', o: ['1/v + 1/u = 1/f', '1/v − 1/u = 1/f', 'v = u f', 'v − u = f'], a: 0, e: 'Mirror.' }, { q: 'f = R/2 applies to', o: ['spherical mirrors', 'lenses', 'prisms', 'slabs'], a: 0, e: 'Mirrors.' },
      { q: 'Power of f = +50 cm', o: ['+2 D', '+0.5 D', '−2 D', '50 D'], a: 0, e: '1/0.5.' }, { q: 'Concave lens image', o: ['virtual, erect, diminished', 'real, inverted', 'enlarged', 'none'], a: 0, e: 'Always.' },
      { q: 'n of glass ≈', o: ['1.5', '1.0', '2.42', '1.33'], a: 0, e: 'Glass.' }, { q: 'Entering denser medium light bends', o: ['towards the normal', 'away', 'no bend', 'back'], a: 0, e: 'Slower.' },
      { q: 'Object at C of concave mirror', o: ['image at C, same size', 'at F', 'infinity', 'behind'], a: 0, e: 'C.' }, { q: 'Magnifying glass uses', o: ['convex lens, object inside F', 'concave lens', 'convex mirror', 'plane mirror'], a: 0, e: 'Virtual enlarged.' },
      { q: 'Unit of power', o: ['dioptre', 'watt', 'metre', 'joule'], a: 0, e: 'D.' }, { q: 'Sign of f for convex mirror', o: ['positive', 'negative', 'zero', 'either'], a: 0, e: 'Behind.' },
      { q: 'Lens m =', o: ['v/u', '−v/u', 'u/v', 'v + u'], a: 0, e: 'Lens.' }
    ],
    teach: {
      outcomes: ['Apply sign convention', 'Use mirror and lens formulas', 'Use Snell’s law and power'],
      periods: [{ t: 'Mirrors', flow: [['10 min', 'Find f of a concave mirror with sunlight/window.'], ['15 min', 'Explore panel 1 (mirrors).'], ['15 min', 'Numericals.']] }, { t: 'Refraction and lenses', flow: [['15 min', 'Explore panel 2 / glass slab with pins.'], ['15 min', 'Explore panel 1 (lenses).'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['u positive for real objects.', 'Same formula for mirrors and lenses.'], activities: ['Glass slab pin experiment.', 'Lens image on screen.'],
      exit: ['Mirror problem.', 'Lens problem.', 'Power of a lens.'], homework: 'Solve 5 mirror and 5 lens numericals with signs.'
    },
    slides: [{ t: 'Light – Reflection and Refraction', b: ['Sign convention', 'Mirror formula', 'Refraction and n', 'Lens formula and power'] }, { t: 'Think and share', b: ['Why is u negative?', 'Power of a −25 cm lens?'] }],
    fs: { groups: [['Mirrors', [['Formula', '1/v + 1/u = 1/f'], ['m', '−v/u'], ['f', 'R/2']]], ['Lenses', [['Formula', '1/v − 1/u = 1/f'], ['m', 'v/u'], ['P', '1/f (m)']]], ['Refraction', [['n', 'c/v'], ['Snell', 'sin i / sin r'], ['Glass', '≈ 1.5']]]],
      ex: [['f −15, u −30 mirror', 'v −30 cm'], ['f +10, u −30 lens', 'v 15 cm, m −0.5']], rem: ['Signs first.', 'Mirror +, lens −.', 'f in metres for power.'] }
  });
})();
