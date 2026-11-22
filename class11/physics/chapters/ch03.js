/*
TOOL:    class11_physics_ch03
FAMILY:  CBSE_REVISION / Class 11 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 3 Motion in a Plane (scalars and vectors, vector addition and resolution, unit vectors, projectile motion, uniform circular motion) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toFixed(2)).toString();
  G9.register({
    no: 3, part: 'Part I', short: 'Motion in a plane', title: 'Motion in a Plane',
    blurb: 'Scalars and vectors; addition by triangle and parallelogram laws; resolution into components with unit vectors î, ĵ; analytical addition; motion with constant acceleration in a plane; projectile motion — time of flight, maximum height, range; uniform circular motion and centripetal acceleration.',
    revise: {
      oneLine: 'Vectors add head-to-tail; resultant of A and B at angle θ: R = √(A² + B² + 2AB cos θ). A vector A at angle θ to x-axis has components A cos θ, A sin θ. A projectile has constant horizontal velocity u cos θ and vertical acceleration −g: T = 2u sin θ / g, H = u² sin²θ / 2g, R = u² sin 2θ / g (max at 45°). Uniform circular motion: a_c = v²/r = ω²r towards the centre; v = ωr.',
      sections: [
        { h: 'Complementary angles', html: `<p>Angles θ and 90° − θ give the same range (different heights and times).</p>` },
        { h: 'Path', html: `<p>Trajectory y = x tan θ − g x² / (2u² cos² θ) — a parabola.</p>` },
        { h: 'Circular motion', html: `<p>Speed constant but velocity direction changes; acceleration v²/r towards centre. ω = 2π/T = 2πν.</p>` }
      ],
      formulas: [['Resultant', '√(A² + B² + 2AB cos θ)'], ['T', '2u sin θ / g'], ['H', 'u² sin² θ / 2g'], ['R', 'u² sin 2θ / g'], ['R_max', 'u²/g at 45°'], ['a_c', 'v²/r = ω²r']],
      terms: [['Unit vector', 'magnitude 1, shows direction'], ['Projectile', 'object moving under gravity alone after launch'], ['Centripetal acceleration', 'acceleration towards the centre']],
      traps: ['At the top of a projectile, v = u cos θ (not zero).', 'Uniform circular motion is accelerated.', 'Add vectors, not magnitudes.'],
      bridge: '<p>Ch 4 explains the forces behind these motions.</p>'
    },
    explore: [
      { title: 'Projectile launcher', intro: 'Set speed and angle; see the path, range, height and time (g = 9.8).',
        build(el, K) { let u = 20, th = 45; const row = K.row(el); K.slider(row, 'u (m/s)', 5, 40, 1, u, v => { u = v; b.redraw(); }); K.slider(row, 'θ (°)', 5, 85, 1, th, v => { th = v; b.redraw(); }); const b = new K.Board(el, { xmin: -5, xmax: 170, ymin: -8, ymax: 85, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const g = 9.8, r = th * Math.PI / 180; const T = 2 * u * Math.sin(r) / g, H = (u * Math.sin(r)) ** 2 / (2 * g), Rg = u * u * Math.sin(2 * r) / g; b.line(0, 0, 165, 0, { color: C.ink, w: 1.5 }); for (let x = 0; x <= 160; x += 20) b.text(x, -4, String(x), { font: '10px' }); let p = [0, 0]; for (let i = 1; i <= 80; i++) { const t = T * i / 80; const q = [u * Math.cos(r) * t, u * Math.sin(r) * t - 0.5 * g * t * t]; b.line(p[0], p[1], q[0], Math.max(0, q[1]), { color: C.blue, w: 2.5 }); p = [q[0], Math.max(0, q[1])]; } b.dot(Rg / 2, H, { r: 6, color: C.orange });
            rd.innerHTML = `T = 2u sin θ/g = <b>${f(T)} s</b> · H = <b>${f(H)} m</b> · R = u² sin 2θ/g = <b>${f(Rg)} m</b> · try θ and 90° − θ: same range`; };
          b.redraw(); return null; } },
      { title: 'Vector adder', intro: 'Two vectors at an angle; see the resultant.',
        build(el, K) { let A = 4, B = 3, th = 90; const row = K.row(el); K.slider(row, 'A', 1, 6, 0.5, A, v => { A = v; b.redraw(); }); K.slider(row, 'B', 1, 6, 0.5, B, v => { B = v; b.redraw(); }); K.slider(row, 'angle (°)', 0, 180, 5, th, v => { th = v; b.redraw(); }); const b = new K.Board(el, { xmin: -7, xmax: 13, ymin: -1, ymax: 7, axes: false, grid: 0, aspect: 0.45 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const r = th * Math.PI / 180; const Bx = B * Math.cos(r), By = B * Math.sin(r); b.arrow(0, 0, A, 0, { color: C.blue, w: 3 }); b.arrow(A, 0, A + Bx, By, { color: C.orange, w: 3 }); b.arrow(0, 0, A + Bx, By, { color: C.purple, w: 3 }); const Rm = Math.sqrt(A * A + B * B + 2 * A * B * Math.cos(r)); const al = Math.atan2(By, A + Bx) * 180 / Math.PI;
            rd.innerHTML = `R = √(A² + B² + 2AB cos θ) = <b>${f(Rm)}</b> at <b>${f(al)}°</b> to A · range |A − B| = ${Math.abs(A - B)} to A + B = ${A + B}`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Range', gen(R) { const u = R.pick([10, 20, 30, 40]), th = R.pick([15, 30, 45, 60, 75]); const Rg = u * u * Math.sin(2 * th * Math.PI / 180) / 9.8; return { q: `u = ${u} m/s at ${th}°. Range? (g = 9.8)`, a: `${f(Rg)} m`, ans: Rg, tol: 0.01 }; } },
      { title: 'Height and time', gen(R) { const u = R.pick([20, 30, 40]), th = R.pick([30, 45, 60]); const s = Math.sin(th * Math.PI / 180); return { q: `u = ${u} m/s at ${th}°. Max height and time of flight? (g = 9.8)`, a: `H = ${f((u * s) ** 2 / 19.6)} m, T = ${f(2 * u * s / 9.8)} s`, ans: (u * s) ** 2 / 19.6, tol: 0.01 }; } },
      { title: 'Resultant', gen(R) { const A = R.int(2, 10), B = R.int(2, 10), th = R.pick([0, 60, 90, 120, 180]); const Rm = Math.sqrt(A * A + B * B + 2 * A * B * Math.cos(th * Math.PI / 180)); return { q: `Vectors of ${A} and ${B} units at ${th}°. Resultant magnitude?`, a: f(Rm), ans: Rm, tol: 0.01 }; } },
      { title: 'Circular', gen(R) { const v = R.int(5, 30), r = R.pick([5, 10, 20, 50]); return { q: `A car takes a ${r} m radius turn at ${v} m/s. Centripetal acceleration?`, a: `${f(v * v / r)} m/s²`, ans: v * v / r, tol: 0.01 }; } },
      { title: 'Components', levels: [2, 3], gen(R) { const A = R.int(5, 20), th = R.pick([30, 37, 45, 53, 60]); const r = th * Math.PI / 180; return { q: `A = ${A} at ${th}° to x-axis. Components?`, a: `Ax = ${f(A * Math.cos(r))}, Ay = ${f(A * Math.sin(r))}`, ans: A * Math.cos(r), tol: 0.01 }; } }
    ],
    quiz: [
      { q: 'Max range angle', o: ['45°', '30°', '60°', '90°'], a: 0, e: 'sin 2θ = 1.' }, { q: 'Velocity at top', o: ['u cos θ', '0', 'u', 'u sin θ'], a: 0, e: 'Horizontal stays.' },
      { q: 'Same range pair', o: ['30° and 60°', '30° and 45°', '20° and 50°', '10° and 20°'], a: 0, e: 'Complementary.' }, { q: 'a_c =', o: ['v²/r', 'v/r', 'vr', 'r/v²'], a: 0, e: 'Centripetal.' },
      { q: '3 and 4 at 90°', o: ['5', '7', '1', '12'], a: 0, e: 'Pythagoras.' }, { q: 'Projectile path', o: ['parabola', 'circle', 'straight', 'hyperbola'], a: 0, e: 'y ∝ x².' },
      { q: 'Horizontal acceleration of projectile', o: ['0', 'g', 'g/2', 'depends'], a: 0, e: 'No force.' }, { q: 'ω =', o: ['2π/T', 'T/2π', '2πT', 'v r'], a: 0, e: 'Angular.' },
      { q: 'Uniform circular motion', o: ['accelerated', 'unaccelerated', 'at rest', 'linear'], a: 0, e: 'Direction changes.' }, { q: 'Resultant range of 5 and 3', o: ['2 to 8', '0 to 8', '3 to 5', '5 to 15'], a: 0, e: '|A−B| to A+B.' },
      { q: 'Time of flight', o: ['2u sin θ/g', 'u sin θ/g', 'u²/g', '2u/g always'], a: 0, e: 'Formula.' }
    ],
    teach: {
      outcomes: ['Add and resolve vectors', 'Solve projectile problems', 'Use centripetal acceleration'],
      periods: [{ t: 'Vectors', flow: [['10 min', 'Walk-the-vector activity.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Component practice.']] }, { t: 'Projectiles', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Water jet at angles.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['v = 0 at top.', 'Heavier projectile falls faster.'], activities: ['Ball-roll-off-table range.', 'Protractor range test.'],
      exit: ['R, H, T formulas.', 'Resultant law.', 'a_c.'], homework: 'Predict and measure range of a ball rolled off a table.'
    },
    slides: [{ t: 'Motion in a Plane', b: ['Vectors', 'Resolution', 'Projectile motion', 'Circular motion'] }, { t: 'Think and share', b: ['Why 45° for max range?', 'Velocity at top?'] }],
    fs: { groups: [['Vectors', [['Resultant', '√(A²+B²+2AB cos θ)'], ['Components', 'A cos θ, A sin θ']]], ['Projectile', [['T', '2u sin θ/g'], ['H', 'u² sin²θ/2g'], ['R', 'u² sin 2θ/g']]], ['Circular', [['a_c', 'v²/r = ω²r'], ['v', 'ωr'], ['ω', '2π/T']]]],
      ex: [['u 20 at 45°', 'R ≈ 40.8 m'], ['v 10, r 20', 'a 5 m/s²']], rem: ['Treat x and y separately.', '45° maximises range.', 'Circular = accelerated.'] }
  });
})();
