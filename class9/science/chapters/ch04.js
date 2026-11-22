/*
TOOL:    class9_science_ch04
FAMILY:  CBSE_REVISION / Class 9 Science (Exploration)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 4 Describing Motion Around Us (distance and displacement, speed and velocity, acceleration, graphs, equations of motion, uniform circular motion) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toFixed(2)).toString();
  G9.register({
    no: 4, part: 'All chapters', short: 'Motion', title: 'Describing Motion Around Us',
    blurb: 'Reference point, distance and displacement, speed and velocity, average speed, acceleration, distance–time and velocity–time graphs (slope and area), the three equations of uniformly accelerated motion, and uniform circular motion.',
    revise: {
      oneLine: 'Distance is path length (scalar); displacement is the straight-line change in position with direction (vector). Speed = distance/time; velocity = displacement/time. Acceleration a = (v − u)/t. For uniform acceleration: v = u + at, s = ut + ½at², v² = u² + 2as. On a distance–time graph the slope is speed; on a velocity–time graph the slope is acceleration and the area under it is displacement.',
      sections: [
        { h: 'Graphs', html: `<p>Straight sloping d–t line → uniform speed; curve → changing speed. Horizontal v–t line → uniform velocity; straight sloping v–t line → uniform acceleration.</p>` },
        { h: 'Circular motion', html: `<p>Moving in a circle at constant speed still changes direction, so velocity changes — it is accelerated motion. Speed = 2πr/T.</p>` },
        { h: 'Units', html: `<p>m/s for speed, m/s² for acceleration; km/h × 5/18 = m/s.</p>` }
      ],
      formulas: [['Speed', 'd/t'], ['Acceleration', 'a = (v − u)/t'], ['1st equation', 'v = u + at'], ['2nd equation', 's = ut + ½at²'], ['3rd equation', 'v² = u² + 2as'], ['Circular speed', '2πr/T']],
      terms: [['Scalar', 'magnitude only'], ['Vector', 'magnitude and direction'], ['Retardation', 'negative acceleration']],
      traps: ['Displacement can be zero when distance is not.', 'Average speed ≠ average of speeds.', 'Uniform circular motion is accelerated.'],
      bridge: '<p>Ch 6 explains what causes acceleration — force.</p>'
    },
    explore: [
      { title: 'Velocity–time graph', intro: 'Set initial velocity, acceleration and time; the shaded area is the displacement.',
        build(el, K) { let u = 4, a = 2, t = 5; const row = K.row(el); K.slider(row, 'u (m/s)', 0, 20, 1, u, v => { u = v; b.redraw(); }); K.slider(row, 'a (m/s²)', -3, 5, 0.5, a, v => { a = v; b.redraw(); }); K.slider(row, 't (s)', 1, 10, 1, t, v => { t = v; b.redraw(); }); const b = new K.Board(el, { xmin: -3, xmax: 33, ymin: -3, ymax: 30, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const X = x => 3 * x, Y = v => 0.4 * v; b.line(0, 0, 31.5, 0, { color: C.ink, w: 1.5 }); b.line(0, 0, 0, 29, { color: C.ink, w: 1.5 }); for (let i = 0; i <= 10; i += 2) b.text(X(i), -1.6, String(i), { font: '10px' }); b.text(31, -1.6, 't (s)', { font: '10px' }); for (let v = 10; v <= 70; v += 10) { b.line(-0.4, Y(v), 0.4, Y(v), { color: C.ink, w: 1 }); b.text(-1.6, Y(v), String(v), { font: '10px' }); } b.text(2.5, 29, 'v (m/s)', { font: '10px' });
            let tt = t; if (a < 0) tt = Math.min(t, u / -a); const v = u + a * tt; b.poly([[0, 0], [0, Y(u)], [X(tt), Y(v)], [X(tt), 0]], { fill: 'rgba(59,130,246,.3)', color: 'none' }); b.line(0, Y(u), X(tt), Y(v), { color: C.orange, w: 3 });
            const s = u * tt + 0.5 * a * tt * tt; rd.innerHTML = `v = u + at = ${u} + ${a} × ${tt.toFixed(1)} = <b>${f(v)} m/s</b> · s = ut + ½at² = <b>${f(s)} m</b> (area) · check v² = u² + 2as: ${f(v * v)} = ${f(u * u + 2 * a * s)}${a < 0 && tt < t ? ' · object stops at t = ' + tt.toFixed(1) + ' s' : ''}`; };
          b.redraw(); return null; } },
      { title: 'Distance vs displacement', intro: 'Walk round a rectangular park; compare distance and displacement as you go.',
        build(el, K) { let p = 0.25; const row = K.row(el); K.slider(row, 'fraction of the round', 0, 1, 0.05, p, v => { p = v; b.redraw(); }); const b = new K.Board(el, { xmin: -1, xmax: 9, ymin: -1, ymax: 5, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el); const L = 8, W = 4, P = 2 * (L + W);
          b.onDraw = () => { b.clear(); b.rect(0, 0, L, W, { fill: '#ecfccb', color: C.ink, w: 2 }); let d = p * P, x, y; if (d <= L) { x = d; y = 0; } else if (d <= L + W) { x = L; y = d - L; } else if (d <= 2 * L + W) { x = L - (d - L - W); y = W; } else { x = 0; y = W - (d - 2 * L - W); } b.dot(0, 0, { r: 6, color: C.ink }); b.text(-0.4, -0.5, 'start', { font: '11px' }); if (Math.hypot(x, y) > 0.01) b.arrow(0, 0, x, y, { color: C.purple, w: 3 }); b.dot(x, y, { r: 8, color: C.orange });
            rd.innerHTML = `park ${L} m × ${W} m · distance walked = <b>${f(d)} m</b> · displacement = <b>${f(Math.hypot(x, y))} m</b> (straight line from start)${p === 1 ? ' — back at start: displacement 0' : ''}`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Acceleration', gen(R) { const u = R.int(0, 10), a = R.int(1, 5), t = R.int(2, 8); return { q: `A car goes from ${u} m/s to ${u + a * t} m/s in ${t} s. Acceleration?`, a: `${a} m/s²`, ans: a }; } },
      { title: 'v = u + at', gen(R) { const u = R.int(0, 15), a = R.int(1, 4), t = R.int(2, 10); return { q: `u = ${u} m/s, a = ${a} m/s², t = ${t} s. Final velocity?`, a: `${u + a * t} m/s`, ans: u + a * t }; } },
      { title: 's = ut + ½at²', gen(R) { const u = R.int(0, 10), a = R.int(1, 4) * 2, t = R.int(2, 6); const s = u * t + 0.5 * a * t * t; return { q: `u = ${u} m/s, a = ${a} m/s², t = ${t} s. Displacement?`, a: `${s} m`, ans: s }; } },
      { title: 'Braking', levels: [2, 3], gen(R) { const u = R.pick([10, 15, 20, 25, 30]), a = R.pick([2, 4, 5]); const s = u * u / (2 * a); return { q: `A car at ${u} m/s brakes with retardation ${a} m/s². Stopping distance? (v² = u² + 2as)`, a: `${f(s)} m`, ans: s, tol: 0.01 }; } },
      { title: 'Circular speed', levels: [2, 3], gen(R) { const r = R.int(5, 50), T = R.int(10, 60); const v = 2 * Math.PI * r / T; return { q: `An athlete runs round a circular track of radius ${r} m in ${T} s. Speed? (π = 3.14)`, a: `${f(2 * 3.14 * r / T)} m/s`, ans: 2 * 3.14 * r / T, tol: 0.02 }; } }
    ],
    quiz: [
      { q: 'Displacement is', o: ['vector', 'scalar', 'always = distance', 'time'], a: 0, e: 'Direction.' }, { q: 'Slope of v–t graph', o: ['acceleration', 'distance', 'speed', 'mass'], a: 0, e: 'Δv/Δt.' },
      { q: 'Area under v–t graph', o: ['displacement', 'acceleration', 'force', 'time'], a: 0, e: 'Area.' }, { q: 'v = u + at, u = 0, a = 2, t = 5', o: ['10 m/s', '7 m/s', '2.5 m/s', '20 m/s'], a: 0, e: '2 × 5.' },
      { q: 'Uniform circular motion is', o: ['accelerated', 'unaccelerated', 'at rest', 'linear'], a: 0, e: 'Direction changes.' }, { q: 'Round trip displacement', o: ['zero', 'twice distance', 'distance', 'infinite'], a: 0, e: 'Back.' },
      { q: 'SI unit of acceleration', o: ['m/s²', 'm/s', 'm', 'N'], a: 0, e: 'Unit.' }, { q: 'Horizontal d–t line', o: ['at rest', 'uniform speed', 'accelerating', 'falling'], a: 0, e: 'No change.' },
      { q: 'v² = u² + 2as, u = 0, a = 2, s = 25', o: ['10 m/s', '50 m/s', '5 m/s', '100 m/s'], a: 0, e: '√100.' }, { q: 'Negative acceleration', o: ['retardation', 'velocity', 'displacement', 'speed'], a: 0, e: 'Slowing.' },
      { q: '72 km/h =', o: ['20 m/s', '72 m/s', '7.2 m/s', '36 m/s'], a: 0, e: '× 5/18.' }
    ],
    teach: {
      outcomes: ['Distinguish scalars and vectors', 'Use the equations of motion', 'Read d–t and v–t graphs'],
      periods: [{ t: 'Describing motion', flow: [['10 min', 'Walk-the-corridor displacement.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Average speed problems.']] }, { t: 'Graphs and equations', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Derive equations from graph.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Displacement = distance.', 'Constant speed in a circle = no acceleration.'], activities: ['Ticker-tape / phone video timing.', 'Graph matching game.'],
      exit: ['Three equations.', 'Slope and area meanings.', 'Braking distance.'], homework: 'Record your trip to school (distance, time) and draw a d–t graph.'
    },
    slides: [{ t: 'Describing Motion', b: ['Distance vs displacement', 'Speed, velocity, acceleration', 'Graphs', 'Equations of motion'] }, { t: 'Think and share', b: ['Can displacement be zero?', 'Why is circular motion accelerated?'] }],
    fs: { groups: [['Basics', [['Speed', 'd/t'], ['Velocity', 'displacement/t'], ['a', '(v − u)/t']]], ['Equations', [['1', 'v = u + at'], ['2', 's = ut + ½at²'], ['3', 'v² = u² + 2as']]], ['Graphs', [['d–t slope', 'speed'], ['v–t slope', 'acceleration'], ['v–t area', 'displacement']]]],
      ex: [['u 0, a 3, t 4', 'v 12 m/s, s 24 m'], ['20 m/s, a −4', 's = 50 m']], rem: ['Signs matter.', 'Convert km/h.', 'Area = displacement.'] }
  });
})();
