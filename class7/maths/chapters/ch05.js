/*
TOOL:    class7_maths_ch05
FAMILY:  CBSE_REVISION / Class 7 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 5 Parallel and Intersecting Lines (intersecting lines, vertically opposite and linear pairs, parallel lines, transversals, corresponding and alternate angles) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 5, part: 'Part I', short: 'Parallel lines and angles', title: 'Parallel and Intersecting Lines',
    blurb: 'Angles made by intersecting lines (linear pairs, vertically opposite angles), perpendicular lines, parallel lines, a transversal cutting two lines, corresponding, alternate and interior angles, and checking whether lines are parallel.',
    revise: {
      oneLine: 'When two lines cross, vertically opposite angles are equal and adjacent angles add to 180° (a linear pair). When a transversal cuts two parallel lines, corresponding angles are equal, alternate angles are equal, and interior angles on the same side add to 180°. If any of these holds, the lines are parallel.',
      sections: [
        { h: 'Intersecting lines', html: `<p>Angles a, b, c, d around the crossing: a = c, b = d, a + b = 180°.</p>` },
        { h: 'Transversal', html: `<p>Eight angles: corresponding pairs (same position), alternate pairs (Z shape), co-interior pairs (C shape).</p>` },
        { h: 'Testing parallel lines', html: `<p>Draw a transversal and measure: equal corresponding angles ⇒ parallel.</p>` }
      ],
      formulas: [['Linear pair', 'sum 180°'], ['Vertically opposite', 'equal'], ['Corresponding (parallel)', 'equal'], ['Alternate (parallel)', 'equal'], ['Co-interior (parallel)', 'sum 180°']],
      terms: [['Parallel', 'never meet'], ['Perpendicular', 'meet at 90°'], ['Transversal', 'line cutting two or more lines']],
      traps: ['Equal-angle rules for transversals need parallel lines.', 'Co-interior angles add to 180°, they are not equal.', 'Vertically opposite ≠ adjacent.'],
      bridge: '<p>Ch 7 uses these to find the angle sum of a triangle.</p>'
    },
    explore: [
      { title: 'Two crossing lines', intro: 'Turn one line; watch the four angles.',
        build(el, K) { let a = 55; const row = K.row(el); K.slider(row, 'angle a (°)', 5, 175, 1, a, v => { a = v; b.redraw(); }); const b = new K.Board(el, { xmin: -3, xmax: 3, ymin: -2, ymax: 2, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const t = a * Math.PI / 180; b.line(-3, 0, 3, 0, { color: C.ink, w: 3 }); b.line(-2.2 * Math.cos(t), -2.2 * Math.sin(t), 2.2 * Math.cos(t), 2.2 * Math.sin(t), { color: C.ink, w: 3 });
            b.arc(0, 0, 0.5, 0, t, { sector: true, fill: C.blueL, color: C.blue }); b.arc(0, 0, 0.5, Math.PI, Math.PI + t, { sector: true, fill: C.blueL, color: C.blue }); b.arc(0, 0, 0.4, t, Math.PI, { sector: true, fill: C.orangeL, color: C.orange }); b.arc(0, 0, 0.4, Math.PI + t, 2 * Math.PI, { sector: true, fill: C.orangeL, color: C.orange });
            const L = (ang, s) => b.text(0.8 * Math.cos(ang), 0.8 * Math.sin(ang), s, { font: 'bold 14px' }); L(t / 2, 'a'); L((t + Math.PI) / 2, 'b'); L(Math.PI + t / 2, 'c'); L((Math.PI + t + 2 * Math.PI) / 2, 'd');
            rd.innerHTML = `a = c = <b>${a}°</b> (vertically opposite) · b = d = <b>${180 - a}°</b> · a + b = 180° (linear pair)`; };
          b.redraw(); return null; } },
      { title: 'Transversal', intro: 'Tilt the lower line. Corresponding angles are equal only when the lines are parallel.',
        build(el, K) { let tilt = 0, s = 60; const row = K.row(el); K.slider(row, 'transversal angle', 30, 150, 1, s, v => { s = v; b.redraw(); }); K.slider(row, 'lower line tilt', -20, 20, 1, tilt, v => { tilt = v; b.redraw(); });
          const b = new K.Board(el, { xmin: -4, xmax: 4, ymin: -2.5, ymax: 2.5, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const T = s * Math.PI / 180, u = tilt * Math.PI / 180; const P1 = [1 / Math.tan(T), 1], dir = [Math.cos(T), Math.sin(T)];
            b.line(-4, 1, 4, 1, { color: C.blue, w: 3 }); const k = (-1) / (Math.sin(T) - Math.cos(T) * Math.tan(u)) ; const P2 = [-1 / Math.tan(T) + 0, -1]; const Q = [0, -1]; // lower line through (0,-1) tilted by u
            const tt = (Q[1] - 1 + Math.tan(u) * (P1[0] - Q[0])) / (dir[1] - Math.tan(u) * dir[0]); const X2 = [P1[0] - tt * dir[0] * -1, 0]; const I2 = [P1[0] + tt * dir[0], 1 + tt * dir[1]];
            b.line(-4, -1 + Math.tan(u) * (-4), 4, -1 + Math.tan(u) * 4, { color: C.blue, w: 3 }); b.line(P1[0] - 3.2 * dir[0], 1 - 3.2 * dir[1], P1[0] + 1.6 * dir[0], 1 + 1.6 * dir[1], { color: C.ink, w: 3 });
            b.arc(P1[0], 1, 0.45, 0, T, { sector: true, fill: C.orangeL, color: C.orange }); b.arc(I2[0], I2[1], 0.45, u, T, { sector: true, fill: C.purpleL, color: C.purple });
            const top = s, low = s - tilt; rd.innerHTML = `upper corresponding angle <b>${top}°</b> · lower <b>${low}°</b> · ${tilt === 0 ? 'equal → the lines are <b>parallel</b>; alternate angles also equal; co-interior add to 180°' : `not equal → the lines are <b>not parallel</b> (they meet on one side)`}`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Linear pair', gen(R) { const a = R.int(15, 165); return { q: `Two angles form a linear pair. One is ${a}°. The other?`, a: `${180 - a}°`, ans: 180 - a }; } },
      { title: 'Vertically opposite', gen(R) { const a = R.int(15, 165); return { q: `Two lines cross; one angle is ${a}°. Find the other three.`, a: `${180 - a}°, ${a}°, ${180 - a}°` }; } },
      { title: 'Parallel lines', gen(R) { const a = R.int(30, 150), t = R.pick(['corresponding', 'alternate', 'co-interior']); return { q: `Parallel lines are cut by a transversal. One angle is ${a}°. Its ${t} angle?`, a: `${t === 'co-interior' ? 180 - a : a}°`, ans: t === 'co-interior' ? 180 - a : a }; } },
      { title: 'Are they parallel?', levels: [2, 3], gen(R) { const a = R.int(40, 140), d = R.pick([0, 0, 5, -8]); return { q: `A transversal makes corresponding angles ${a}° and ${a + d}° with two lines. Parallel?`, a: d ? 'no' : 'yes' }; } },
      { title: 'Find x', levels: [3], gen(R) { const x = R.int(10, 40), k = R.int(2, 3), c = 180 - (k + 1) * x; if (c <= 0) return { q: 'Linear pair: x and 2x. Find x.', a: '60°', ans: 60 }; return { q: `A linear pair has angles ${k}x and x + ${c}. Find x.`, a: `${x}°`, ans: x }; } }
    ],
    quiz: [
      { q: 'Linear pair sum', o: ['180°', '90°', '360°', '0°'], a: 0, e: 'Straight line.' }, { q: 'Vertically opposite angles are', o: ['equal', 'supplementary always', 'complementary', 'unequal'], a: 0, e: 'Equal.' },
      { q: 'Parallel lines: corresponding angles', o: ['equal', 'add to 180°', 'add to 90°', 'unequal'], a: 0, e: 'F shape.' }, { q: 'Parallel lines: co-interior angles', o: ['add to 180°', 'equal', 'add to 90°', 'add to 360°'], a: 0, e: 'C shape.' },
      { q: 'One angle 70° at a crossing; opposite', o: ['70°', '110°', '20°', '290°'], a: 0, e: 'Equal.' }, { q: 'Adjacent to 70° at a crossing', o: ['110°', '70°', '20°', '90°'], a: 0, e: 'Linear pair.' },
      { q: 'Alternate angles are equal when', o: ['lines are parallel', 'always', 'never', 'lines are perpendicular'], a: 0, e: 'Condition.' }, { q: 'A transversal is', o: ['a line cutting two lines', 'a parallel line', 'an angle', 'a ray'], a: 0, e: 'Definition.' },
      { q: 'Corresponding angles 65° and 65°', o: ['lines parallel', 'lines meet', 'cannot tell', 'perpendicular'], a: 0, e: 'Test.' }, { q: 'Perpendicular lines meet at', o: ['90°', '180°', '45°', '60°'], a: 0, e: 'Right angle.' },
      { q: 'Alternate to 120° (parallel lines)', o: ['120°', '60°', '30°', '240°'], a: 0, e: 'Z shape.' }
    ],
    teach: {
      outcomes: ['Use linear pairs and vertically opposite angles', 'Name angle pairs with a transversal', 'Test for parallel lines'],
      periods: [{ t: 'Crossing lines', flow: [['10 min', 'Scissors and road crossings.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Find missing angles.']] }, { t: 'Transversals', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Angle pair hunt on ruled paper.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Rules without parallel lines.', 'Co-interior equal.'], activities: ['Ruled-paper transversal measuring.', 'F, Z, C shapes game.'],
      exit: ['Linear pair with 47°.', 'Corresponding to 112°.', 'Co-interior to 75°.'], homework: 'Find 3 examples of parallel lines cut by a transversal at home (window bars, rails); sketch and mark equal angles.'
    },
    slides: [{ t: 'Parallel and Intersecting Lines', b: ['Linear pairs', 'Vertically opposite angles', 'Transversals', 'Corresponding, alternate, co-interior'] }, { t: 'Check yourself', b: ['Opposite to 35°?', 'Co-interior to 100°?'] }],
    fs: { groups: [['Intersecting', [['Linear pair', '180°'], ['Vertically opposite', 'equal']]], ['Parallel + transversal', [['Corresponding (F)', 'equal'], ['Alternate (Z)', 'equal'], ['Co-interior (C)', '180°']]], ['Test', [['Corresponding equal', '⇒ parallel']]]],
      ex: [['Linear pair with 70°', '110°'], ['Co-interior to 75°', '105°']], rem: ['Equal-angle rules need parallel lines.', 'Mark angles before calculating.', 'Look for F, Z, C shapes.'] }
  });
})();
