/*
TOOL:    class6_maths_ch02
FAMILY:  CBSE_REVISION / Class 6 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 2 Lines and Angles (points, segments, lines, rays, angles, measuring with a protractor, types of angles) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const kind = a => a === 0 ? 'zero angle' : a < 90 ? 'acute' : a === 90 ? 'right' : a < 180 ? 'obtuse' : a === 180 ? 'straight' : a < 360 ? 'reflex' : 'complete';
  G9.register({
    no: 2, part: 'All chapters', short: 'Lines and angles', title: 'Lines and Angles',
    blurb: 'Points, line segments, lines and rays; angles as turns between two rays from a vertex; naming, comparing and measuring angles with a protractor; acute, right, obtuse, straight and reflex angles.',
    revise: {
      oneLine: 'A segment AB has two end points; a line goes on both ways; a ray starts at a point and goes on one way. Two rays from a common vertex make an angle, measured in degrees with a protractor (start the count from 0 on one arm).',
      sections: [
        { h: 'Basic figures', html: `<p>Segment AB, line AB (↔), ray AB (starts at A). Through two points passes exactly one line.</p>` },
        { h: 'Angles', html: `<p>∠ABC has vertex B and arms BA, BC. Size = amount of turn, not arm length.</p>` },
        { h: 'Measuring', html: `<p>Put the centre on the vertex, base line on one arm, read from the 0 on that arm. Types: acute &lt; 90°, right 90°, obtuse 90°–180°, straight 180°, reflex 180°–360°.</p>` }
      ],
      formulas: [['Right angle', '90°'], ['Straight angle', '180°'], ['Complete turn', '360°'], ['Reflex of x', '360° − x']],
      terms: [['Ray', 'one end point'], ['Vertex', 'common end point of arms'], ['Protractor', 'angle measurer']],
      traps: ['Reading the wrong scale on the protractor.', 'Naming an angle with the vertex not in the middle.', 'Longer arms ≠ bigger angle.'],
      bridge: '<p>Ch 8 constructs right angles and perpendiculars.</p>'
    },
    explore: [
      { title: 'Protractor', intro: 'Set the angle; read it from the inner scale (0 on the right arm).',
        build(el, K) { let a = 65; const row = K.row(el); K.slider(row, 'angle (°)', 0, 180, 1, a, v => { a = v; b.redraw(); }); const b = new K.Board(el, { xmin: -1.4, xmax: 1.4, ymin: -0.25, ymax: 1.35, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.arc(0, 0, 1.1, 0, Math.PI, { sector: true, fill: 'rgba(29,78,216,.06)', color: C.ink, w: 2 }); for (let d = 0; d <= 180; d++) { const t = d * Math.PI / 180, r1 = d % 10 ? (d % 5 ? 1.06 : 1.02) : 0.97; b.line(r1 * Math.cos(t), r1 * Math.sin(t), 1.1 * Math.cos(t), 1.1 * Math.sin(t), { color: C.ink, w: d % 10 ? 0.7 : 1.5 }); if (d % 30 === 0) { b.text(0.88 * Math.cos(t), 0.88 * Math.sin(t), String(d), { font: 'bold 11px', color: C.blue }); b.text(1.2 * Math.cos(t), 1.2 * Math.sin(t), String(180 - d), { font: '10px', color: C.grey }); } }
            const t = a * Math.PI / 180; b.line(0, 0, 1.25, 0, { color: C.orange, w: 4 }); b.line(0, 0, 1.25 * Math.cos(t), 1.25 * Math.sin(t), { color: C.orange, w: 4 }); if (a) b.arc(0, 0, 0.25, 0, t, { color: C.purple, w: 3 }); b.dot(0, 0, { r: 5 });
            rd.innerHTML = `inner scale (from 0 on the right arm): <b>${a}°</b> — ${kind(a)} · outer scale would wrongly read ${180 - a}°`; };
          b.redraw(); return null; } },
      { title: 'Point, segment, ray, line', intro: 'Choose a figure to draw through A and B.',
        build(el, K) { let k = 0; const row = K.row(el); K.select(row, 'figure', ['segment AB', 'ray AB', 'line AB', 'angle ABC'], i => { k = i; b.redraw(); }); const b = new K.Board(el, { xmin: -5, xmax: 5, ymin: -2.5, ymax: 2.5, axes: false, grid: 0, aspect: 0.4 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const A = [-2, -0.5], B = [1.5, 0.8]; const u = [B[0] - A[0], B[1] - A[1]];
            if (k === 0) b.line(...A, ...B, { color: C.blue, w: 4 }); if (k === 1) b.arrow(...A, B[0] + u[0] * 0.8, B[1] + u[1] * 0.8, { color: C.blue, w: 4 }); if (k === 2) { b.arrow(A[0], A[1], B[0] + u[0] * 0.8, B[1] + u[1] * 0.8, { color: C.blue, w: 4 }); b.arrow(B[0], B[1], A[0] - u[0] * 0.8, A[1] - u[1] * 0.8, { color: C.blue, w: 4 }); }
            if (k === 3) { b.arrow(1.5, 0.8, -3, -1.2, { color: C.blue, w: 4 }); b.arrow(1.5, 0.8, 4, -1.8, { color: C.blue, w: 4 }); b.text(-3.3, -1.5, 'A', { font: 'bold 15px' }); b.text(4.3, -2.1, 'C', { font: 'bold 15px' }); }
            if (k < 3) { b.dot(...A, { r: 6, label: 'A' }); } b.dot(...B, { r: 6, label: 'B' });
            rd.innerHTML = ['segment AB: two end points, fixed length', 'ray AB: starts at A, goes on through B for ever', 'line AB: no end points, goes on both ways', '∠ABC: vertex B in the middle of the name; arms BA and BC'][k]; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Type of angle', gen(R) { const a = R.pick([25, 60, 89, 90, 91, 135, 179, 180, 210, 300]); return { q: `What type of angle is ${a}°?`, a: kind(a) }; } },
      { title: 'Reflex angle', levels: [2, 3], gen(R) { const a = R.int(20, 170); return { q: `An angle is ${a}°. What is the reflex angle on the other side?`, a: `${360 - a}°`, ans: 360 - a }; } },
      { title: 'Clock angles', gen(R) { const h = R.int(1, 11); const a = Math.min(h, 12 - h) * 30; return { q: `Smaller angle between the hands at ${h}:00?`, a: `${a}°`, ans: a }; } },
      { title: 'Parts of a straight angle', levels: [2, 3], gen(R) { const a = R.int(20, 160); return { q: `A straight angle is split into two angles; one is ${a}°. The other?`, a: `${180 - a}°`, ans: 180 - a }; } },
      { title: 'Count the figures', levels: [3], gen(R) { const n = R.int(3, 7); return { q: `How many line segments can be drawn joining ${n} points, no three in a line?`, a: String(n * (n - 1) / 2), ans: n * (n - 1) / 2 }; } }
    ],
    quiz: [
      { q: 'A ray has', o: ['one end point', 'two end points', 'no end points', 'three'], a: 0, e: 'Starts, goes on.' }, { q: 'In ∠PQR the vertex is', o: ['Q', 'P', 'R', 'PR'], a: 0, e: 'Middle letter.' },
      { q: '135° is', o: ['obtuse', 'acute', 'reflex', 'right'], a: 0, e: '90–180.' }, { q: 'Reflex of 100°', o: ['260°', '80°', '100°', '180°'], a: 0, e: '360 − 100.' },
      { q: 'Lines through two points', o: ['exactly one', 'two', 'many', 'none'], a: 0, e: 'Unique.' }, { q: 'Angle at 3:00', o: ['90°', '30°', '180°', '45°'], a: 0, e: '3 × 30.' },
      { q: 'Straight angle', o: ['180°', '90°', '360°', '0°'], a: 0, e: 'Half turn.' }, { q: 'Protractor centre goes on', o: ['the vertex', 'an arm end', 'anywhere', 'the 90 mark'], a: 0, e: 'Vertex.' },
      { q: 'Longer arms make an angle', o: ['the same', 'bigger', 'smaller', 'reflex'], a: 0, e: 'Turn matters.' }, { q: '75° + __ = 180°', o: ['105°', '115°', '15°', '285°'], a: 0, e: 'Straight.' },
      { q: 'Segments joining 5 points', o: ['10', '5', '20', '25'], a: 0, e: '5 × 4 ÷ 2.' }
    ],
    teach: {
      outcomes: ['Name points, segments, rays, lines, angles', 'Measure angles with a protractor', 'Classify angles'],
      periods: [{ t: 'Figures', flow: [['10 min', 'Dot-and-ruler drawings.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Name angles.']] }, { t: 'Measuring', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Measure angles in class.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Wrong scale.', 'Vertex letter position.'], activities: ['Paper protractor.', 'Angle hunt.'],
      exit: ['Draw ray PQ.', 'Measure a given angle.', 'Reflex of 35°.'], homework: 'Measure 5 angles in your home (door, scissors, book corner) with a protractor and classify them.'
    },
    slides: [{ t: 'Lines and Angles', b: ['Segment, ray, line', 'Angles and vertex', 'Protractor', 'Types of angles'] }, { t: 'Check yourself', b: ['Type of 200°?', 'Angle at 5:00?'] }],
    fs: { groups: [['Figures', [['Segment', 'two ends'], ['Ray', 'one end'], ['Line', 'no ends']]], ['Angle types', [['Acute', '< 90°'], ['Right', '90°'], ['Obtuse', '90°–180°'], ['Straight', '180°'], ['Reflex', '180°–360°']]], ['Protractor', [['Centre', 'on vertex'], ['Read from', '0 on one arm']]]],
      ex: [['Reflex of 100°', '260°'], ['4:00', '120°']], rem: ['Vertex letter in the middle.', 'Start counting at 0.', 'Turn, not arm length.'] }
  });
})();
