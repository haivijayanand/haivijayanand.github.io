/*
TOOL:    class11_physics_ch02
FAMILY:  CBSE_REVISION / Class 11 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 2 Motion in a Straight Line (position, displacement, average and instantaneous velocity, acceleration, x–t and v–t graphs, kinematic equations, free fall, relative velocity) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toFixed(2)).toString();
  G9.register({
    no: 2, part: 'Part I', short: 'Straight-line motion', title: 'Motion in a Straight Line',
    blurb: 'Position, path length and displacement; average and instantaneous velocity and speed (v = dx/dt); acceleration (a = dv/dt); interpreting x–t and v–t graphs; kinematic equations for uniform acceleration and their calculus derivation; free fall under gravity; relative velocity in one dimension.',
    revise: {
      oneLine: 'Instantaneous velocity v = dx/dt is the slope of the x–t graph; acceleration a = dv/dt is the slope of the v–t graph and the area under v–t is displacement. For constant a: v = u + at, x = ut + ½at², v² = u² + 2ax, and distance in the nth second sₙ = u + a(2n − 1)/2. Free fall: a = g ≈ 9.8 m/s² downward. Relative velocity v_AB = v_A − v_B.',
      sections: [
        { h: 'Signs', html: `<p>Choose a positive direction; vectors pointing the other way are negative. Deceleration means a opposite to v, not necessarily negative a.</p>` },
        { h: 'Vertical throw', html: `<p>Thrown up with u: time to top u/g, max height u²/2g, total time 2u/g (same level).</p>` },
        { h: 'Calculus', html: `<p>x(t) = ∫v dt, v(t) = ∫a dt. If x = 3t² + 2t, v = 6t + 2, a = 6.</p>` }
      ],
      formulas: [['v', 'u + at'], ['x', 'ut + ½at²'], ['v²', 'u² + 2ax'], ['nth second', 'u + a(2n − 1)/2'], ['Max height', 'u²/2g'], ['Relative', 'v_A − v_B']],
      terms: [['Instantaneous velocity', 'limit of Δx/Δt as Δt → 0'], ['Uniform motion', 'constant velocity'], ['Free fall', 'motion under gravity alone']],
      traps: ['At the top of a throw v = 0 but a = g.', 'Average speed ≥ |average velocity|.', 'Area below the time axis is negative displacement.'],
      bridge: '<p>Ch 3 extends to two dimensions.</p>'
    },
    explore: [
      { title: 'Vertical throw', intro: 'Throw a ball up; see height–time and velocity (g = 9.8 m/s²). <kbd>P</kbd> play.',
        build(el, K) { let u = 20; const row = K.row(el); K.slider(row, 'u (m/s)', 5, 40, 1, u, v => { u = v; an.reset(); b.redraw(); }); const b = new K.Board(el, { xmin: -1, xmax: 25, ymin: -2, ymax: 22, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el); const an = new K.Anim(80, () => b.redraw(), { ms: 40 });
          b.onDraw = () => { b.clear(); const g = 9.8, Tt = 2 * u / g, H = u * u / 2 / g; const X = t => t / Tt * 24, Y = h => h / H * 20; b.line(0, 0, 24, 0, { color: C.ink, w: 1.5 }); b.line(0, 0, 0, 21, { color: C.ink, w: 1.5 }); let p = [0, 0]; for (let i = 1; i <= 60; i++) { const t = Tt * i / 60, h = u * t - 0.5 * g * t * t; b.line(p[0], p[1], X(t), Y(h), { color: C.blue, w: 2 }); p = [X(t), Y(h)]; } const t = Math.min(an.i / 80 * Tt, Tt), h = u * t - 0.5 * g * t * t, v = u - g * t; b.dot(X(t), Y(h), { r: 8, color: C.orange }); b.text(12, -1.2, 'time →', { font: '11px' }); b.text(2, 21, 'height', { font: '11px' });
            rd.innerHTML = `t = ${f(t)} s · h = <b>${f(h)} m</b> · v = <b>${f(v)} m/s</b> · max height u²/2g = ${f(H)} m at t = ${f(u / g)} s · total time ${f(Tt)} s`; };
          K.anim(el, an); b.redraw(); return an; } },
      { title: 'Relative velocity', intro: 'Two trains on parallel tracks; set velocities (+ to the right).',
        build(el, K) { let a = 20, c = -15; const row = K.row(el); K.slider(row, 'v_A (m/s)', -30, 30, 1, a, v => { a = v; draw(); }); K.slider(row, 'v_B (m/s)', -30, 30, 1, c, v => { c = v; draw(); }); const rd = K.read(el);
          function draw() { const r = a - c; rd.innerHTML = `v_AB = v_A − v_B = ${a} − (${c}) = <b>${r} m/s</b> · B sees A moving ${r > 0 ? 'right' : r < 0 ? 'left' : 'not at all'} · to pass a 200 m gap they need ${r ? f(200 / Math.abs(r)) + ' s' : '— (never)'}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Equations', gen(R) { const u = R.int(0, 20), a = R.int(1, 6), t = R.int(2, 10); return { q: `u = ${u} m/s, a = ${a} m/s², t = ${t} s. Find v and x.`, a: `v = ${u + a * t} m/s, x = ${u * t + 0.5 * a * t * t} m`, ans: u * t + 0.5 * a * t * t }; } },
      { title: 'nth second', gen(R) { const u = R.int(0, 10), a = R.int(2, 6), n = R.int(2, 8); return { q: `u = ${u} m/s, a = ${a} m/s². Distance in the ${n}th second?`, a: `${u + a * (2 * n - 1) / 2} m`, ans: u + a * (2 * n - 1) / 2 }; } },
      { title: 'Vertical throw', gen(R) { const u = R.pick([9.8, 19.6, 29.4, 49]); return { q: `A ball is thrown up at ${u} m/s (g = 9.8). Max height and total time?`, a: `${f(u * u / 19.6)} m, ${f(2 * u / 9.8)} s`, ans: u * u / 19.6, tol: 0.01 }; } },
      { title: 'Calculus', levels: [2, 3], gen(R) { const a = R.int(1, 5), b = R.int(1, 9), c = R.int(0, 9), t = R.int(1, 4); return { q: `x = ${a}t² + ${b}t + ${c} (m). Velocity and acceleration at t = ${t} s?`, a: `v = ${2 * a * t + b} m/s, a = ${2 * a} m/s²`, ans: 2 * a * t + b }; } },
      { title: 'Stopping', levels: [2, 3], gen(R) { const u = R.pick([10, 15, 20, 25, 30]), d = R.pick([20, 25, 50]); return { q: `A car at ${u} m/s stops in ${d} m. Retardation?`, a: `${f(u * u / (2 * d))} m/s²`, ans: u * u / (2 * d), tol: 0.01 }; } }
    ],
    quiz: [
      { q: 'Slope of x–t', o: ['velocity', 'acceleration', 'displacement', 'jerk'], a: 0, e: 'dx/dt.' }, { q: 'Area under v–t', o: ['displacement', 'acceleration', 'velocity', 'force'], a: 0, e: '∫v dt.' },
      { q: 'At top of throw', o: ['v = 0, a = g', 'a = 0', 'v = g', 'both 0'], a: 0, e: 'Gravity acts.' }, { q: 'Max height u²/2g for u = 20 (g 10)', o: ['20 m', '40 m', '10 m', '200 m'], a: 0, e: '400/20.' },
      { q: 'x = 2t³, a at t = 1', o: ['12', '6', '2', '18'], a: 0, e: '12t.' }, { q: 'nth second formula', o: ['u + a(2n−1)/2', 'un + ½an²', 'u + an', 'a n²'], a: 0, e: 'Sₙ − Sₙ₋₁.' },
      { q: 'Opposite trains 20 and 15 m/s, relative speed', o: ['35 m/s', '5 m/s', '20 m/s', '300 m/s'], a: 0, e: 'Add.' }, { q: 'Average speed vs |avg velocity|', o: ['≥', '≤', 'always =', 'unrelated'], a: 0, e: 'Path ≥ displacement.' },
      { q: 'Free-fall acceleration', o: ['≈ 9.8 m/s² down', '0', 'up', 'depends on mass'], a: 0, e: 'g.' }, { q: 'Time of flight (same level)', o: ['2u/g', 'u/g', 'u²/g', '2g/u'], a: 0, e: 'Up + down.' },
      { q: 'v² = u² + 2ax uses no', o: ['time', 'distance', 'acceleration', 'velocity'], a: 0, e: 'Time-free.' }
    ],
    teach: {
      outcomes: ['Use kinematic equations with signs', 'Interpret graphs', 'Solve free fall and relative velocity problems'],
      periods: [{ t: 'Graphs and equations', flow: [['10 min', 'Motion sensor/phone video.'], ['15 min', 'Derive equations from v–t.'], ['15 min', 'Numericals.']] }, { t: 'Free fall', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['a = 0 at the top.', 'Negative a means slowing.'], activities: ['Reaction time ruler drop (free fall).', 'Graph matching.'],
      exit: ['Three equations.', 'Max height.', 'Relative velocity.'], homework: 'Solve 10 problems mixing graphs, equations and free fall.'
    },
    slides: [{ t: 'Motion in a Straight Line', b: ['Displacement and velocity', 'Graphs', 'Equations of motion', 'Free fall, relative velocity'] }, { t: 'Think and share', b: ['Velocity and acceleration at the top?', 'Why is area under v–t displacement?'] }],
    fs: { groups: [['Equations', [['1', 'v = u + at'], ['2', 'x = ut + ½at²'], ['3', 'v² = u² + 2ax'], ['nth s', 'u + a(2n−1)/2']]], ['Graphs', [['x–t slope', 'v'], ['v–t slope', 'a'], ['v–t area', 'x']]], ['Gravity', [['H', 'u²/2g'], ['T', '2u/g'], ['Relative', 'v_A − v_B']]]],
      ex: [['u 0, a 4, 5 s', 'v 20, x 50'], ['u 19.6 up', 'H 19.6 m, T 4 s']], rem: ['Fix a sign convention.', 'Graph slope/area.', 'g acts throughout.'] }
  });
})();
