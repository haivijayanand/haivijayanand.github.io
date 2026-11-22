/*
TOOL:    class5_maths_ch03
FAMILY:  CBSE_REVISION / Class 5 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 3 Angles as Turns (turns, right angles, acute and obtuse angles, clockwise and anticlockwise, degrees) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const kind = a => a === 0 ? 'no turn' : a < 90 ? 'acute' : a === 90 ? 'right angle' : a < 180 ? 'obtuse' : a === 180 ? 'straight angle' : a < 360 ? 'reflex' : 'full turn';
  G9.register({
    no: 3, part: 'All chapters', short: 'Angles', title: 'Angles as Turns',
    blurb: 'An angle as the amount of turn: quarter, half, three-quarter and full turns, right angles, acute and obtuse angles, clockwise and anticlockwise, measuring in degrees.',
    revise: {
      oneLine: 'An angle tells how much something turns. A full turn is 360°, a half turn 180°, a quarter turn (right angle) 90°. Smaller than a right angle is acute; between 90° and 180° is obtuse. Clock hands turn clockwise.',
      sections: [
        { h: 'Turns', html: `<p>Quarter turn = 90°, half = 180°, three-quarter = 270°, full = 360°.</p>` },
        { h: 'Types', html: `<p>Acute (&lt; 90°), right (= 90°), obtuse (90°–180°), straight (180°).</p>` },
        { h: 'Directions', html: `<p>Facing north, a quarter turn clockwise faces east; anticlockwise faces west.</p>` }
      ],
      formulas: [['Full turn', '360°'], ['Half turn', '180°'], ['Right angle', '90°'], ['Acute', '< 90°'], ['Obtuse', '90° to 180°']],
      terms: [['Angle', 'amount of turn'], ['Vertex', 'corner point'], ['Clockwise', 'the way clock hands turn']],
      traps: ['Longer arms do not mean a bigger angle.', 'Reading the wrong scale on a protractor.', 'Clockwise vs anticlockwise.'],
      bridge: '<p>Class 6 measures and constructs angles with a protractor.</p>'
    },
    explore: [
      { title: 'Turn the arm', intro: 'Set the turn; the angle is named. Press <kbd>P</kbd> to sweep a full turn.',
        build(el, K) { let a = 60; const row = K.row(el); K.slider(row, 'turn (°)', 0, 360, 5, a, v => { a = v; b.redraw(); }); const b = new K.Board(el, { xmin: -1.6, xmax: 1.6, ymin: -1.3, ymax: 1.3, axes: false, grid: 0, equal: true }); const rd = K.read(el); const an = new K.Anim(72, () => { a = an.i * 5; b.redraw(); }, { ms: 80 });
          b.onDraw = () => { b.clear(); const t = a * Math.PI / 180; if (a > 0) b.arc(0, 0, 0.4, 0, t, { sector: true, fill: a <= 90 ? C.blueL : C.orangeL, color: a <= 90 ? C.blue : C.orange, w: 2 }); b.line(0, 0, 1.2, 0, { color: C.ink, w: 4 }); b.line(0, 0, 1.2 * Math.cos(t), 1.2 * Math.sin(t), { color: C.purple, w: 4 }); if (a === 90) b.rect(0, 0, 0.15, 0.15, { color: C.ink, w: 2 }); b.dot(0, 0, { r: 6 });
            rd.innerHTML = `${a}° (anticlockwise) · <b>${kind(a)}</b> · ${a / 90 === Math.floor(a / 90) ? a / 90 + ' quarter turn(s)' : (a / 360).toFixed(2) + ' of a full turn'}`; };
          K.anim(el, an); b.redraw(); return an; } },
      { title: 'Facing directions', intro: 'Start facing North. Choose turns.',
        build(el, K) { let q = 1, cw = 0; const D = ['North', 'East', 'South', 'West']; const row = K.row(el); K.slider(row, 'quarter turns', 0, 4, 1, q, v => { q = v; b.redraw(); }); K.select(row, 'direction', ['clockwise', 'anticlockwise'], i => { cw = i; b.redraw(); });
          const b = new K.Board(el, { xmin: -1.6, xmax: 1.6, ymin: -1.4, ymax: 1.4, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); [['N', 0, 1.2], ['E', 1.25, 0], ['S', 0, -1.2], ['W', -1.25, 0]].forEach(([s, x, y]) => b.text(x, y, s, { font: 'bold 18px' })); b.circle(0, 0, 1, { color: C.grid, w: 2 }); const f = ((cw ? -q : q) % 4 + 4) % 4, t = Math.PI / 2 - f * Math.PI / 2; b.arrow(0, 0, 0.9 * Math.cos(t), 0.9 * Math.sin(t), { color: C.orange, w: 5 });
            rd.innerHTML = `${q} quarter turn${q === 1 ? '' : 's'} ${cw ? 'anticlockwise' : 'clockwise'} = ${q * 90}° → facing <b>${D[f]}</b>`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Name the angle', gen(R) { const a = R.pick([30, 45, 60, 90, 120, 135, 150, 180]); return { q: `What kind of angle is ${a}°?`, a: kind(a) }; } },
      { title: 'Turns to degrees', gen(R) { const t = R.pick([['a quarter turn', 90], ['a half turn', 180], ['three quarter turns', 270], ['a full turn', 360], ['two full turns', 720]]); return { q: `How many degrees in ${t[0]}?`, a: `${t[1]}°`, ans: t[1] }; } },
      { title: 'Facing', gen(R) { const D = ['North', 'East', 'South', 'West']; const s = R.int(0, 3), q = R.int(1, 3), cw = R.chance(.5); return { q: `Facing ${D[s]}, turn ${q * 90}° ${cw ? 'clockwise' : 'anticlockwise'}. Now facing?`, a: D[((s + (cw ? q : -q)) % 4 + 4) % 4] }; } },
      { title: 'Clock angles', levels: [2, 3], gen(R) { const h = R.pick([3, 6, 9, 2, 4, 1, 5]); const a = Math.min(h, 12 - h) * 30; return { q: `Angle between the hands at ${h} o'clock?`, a: `${a}°`, ans: a }; } },
      { title: 'Missing part', levels: [3], gen(R) { const a = R.int(10, 80); return R.chance(.5) ? { q: `A right angle is split into two; one part is ${a}°. The other?`, a: `${90 - a}°`, ans: 90 - a } : { q: `A straight angle is split; one part is ${a + 60}°. The other?`, a: `${120 - a}°`, ans: 120 - a }; } }
    ],
    quiz: [
      { q: 'Full turn', o: ['360°', '180°', '90°', '100°'], a: 0, e: 'Complete.' }, { q: 'Right angle', o: ['90°', '45°', '180°', '60°'], a: 0, e: 'Quarter turn.' },
      { q: '120° is', o: ['obtuse', 'acute', 'right', 'straight'], a: 0, e: 'Between 90 and 180.' }, { q: '45° is', o: ['acute', 'obtuse', 'right', 'reflex'], a: 0, e: '< 90.' },
      { q: 'North, quarter turn clockwise', o: ['East', 'West', 'South', 'North'], a: 0, e: 'Clockwise.' }, { q: 'Angle at 3 o’clock', o: ['90°', '30°', '180°', '60°'], a: 0, e: '3 × 30.' },
      { q: 'Half turn', o: ['180°', '90°', '360°', '270°'], a: 0, e: 'Straight.' }, { q: 'Longer arms make the angle', o: ['the same', 'bigger', 'smaller', 'straight'], a: 0, e: 'Turn matters.' },
      { q: 'One hour on a clock is', o: ['30°', '60°', '12°', '90°'], a: 0, e: '360 ÷ 12.' }, { q: 'Facing East, half turn', o: ['West', 'North', 'South', 'East'], a: 0, e: 'Opposite.' },
      { q: 'Corner of a page', o: ['right angle', 'acute', 'obtuse', 'straight'], a: 0, e: '90°.' }
    ],
    teach: {
      outcomes: ['See angles as turns', 'Classify angles', 'Use clockwise and degrees'],
      periods: [{ t: 'Turning', flow: [['10 min', 'Stand and turn: quarter, half.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Angle hunt in class.']] }, { t: 'Directions', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Clock angles.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Arm length.', 'Clockwise confusion.'], activities: ['Paper-strip angle maker.', 'Robot directions game.'],
      exit: ['Type of 95°.', 'Facing South, 270° clockwise.', 'Angle at 4 o’clock.'], homework: 'Find 5 angles at home (scissors, doors, clock) and say acute, right or obtuse.'
    },
    slides: [{ t: 'Angles as Turns', b: ['Turns and degrees', 'Acute, right, obtuse', 'Clockwise', 'Directions'] }, { t: 'Check yourself', b: ['Three quarter turns?', 'Type of 150°?'] }],
    fs: { groups: [['Turns', [['Quarter', '90°'], ['Half', '180°'], ['Full', '360°']]], ['Types', [['Acute', '< 90°'], ['Right', '90°'], ['Obtuse', '90°–180°'], ['Straight', '180°']]], ['Clock', [['1 hour mark', '30°'], ['3 o’clock', '90°']]]],
      ex: [['North + 90° clockwise', 'East'], ['5 o’clock', '150°']], rem: ['Angle = turn, not arm length.', 'Clockwise = clock hands.', '4 right angles = full turn.'] }
  });
})();
