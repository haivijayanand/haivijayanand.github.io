/*
TOOL:    class6_science_ch05
FAMILY:  CBSE_REVISION / Class 6 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 5 Measurement of Length and Motion (standard units, SI unit metre, measuring correctly, curved lengths, types of motion) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 5, part: 'All chapters', short: 'Length and motion', title: 'Measurement of Length and Motion',
    blurb: 'Why we need standard units (hand span, cubit vs metre), the SI unit of length, converting mm–cm–m–km, measuring correctly with a scale (avoiding parallax), measuring curved lines with a thread, and kinds of motion: linear, circular, periodic.',
    revise: {
      oneLine: 'Body units like hand span and cubit differ from person to person, so we use standard units; the SI unit of length is the metre (m). 1 km = 1000 m, 1 m = 100 cm, 1 cm = 10 mm. Place the scale along the object, start from a clear mark, and keep your eye straight above the reading. Motion can be linear (straight), circular (round) or periodic (repeats).',
      sections: [
        { h: 'Measuring right', html: `<p>Do not start from a broken end — start from 1 cm and subtract. Eye directly above to avoid parallax error. Use a thread for curved lines.</p>` },
        { h: 'Motion', html: `<p>Linear: a car on a straight road, a falling stone. Circular: a fan blade tip, a merry-go-round. Periodic: a pendulum, a swing, heartbeat. Some motions are both (a wheel rolls: linear + rotation).</p>` },
        { h: 'Indian history', html: `<p>Ancient India used angula, vitasti (span) and hasta (cubit); standard units make trade fair.</p>` }
      ],
      formulas: [['SI length', 'metre (m)'], ['1 km', '1000 m'], ['1 m', '100 cm'], ['1 cm', '10 mm'], ['Broken scale', 'reading − starting mark']],
      terms: [['Standard unit', 'unit the same everywhere'], ['Parallax', 'error from looking at a slant'], ['Periodic motion', 'repeats after equal time']],
      traps: ['Hand spans are not standard.', 'Looking from the side gives wrong readings.', 'Circular motion can also be periodic.'],
      bridge: '<p>Class 7 measures time and speed.</p>'
    },
    explore: [
      { title: 'Broken scale', intro: 'The scale’s zero is broken. Set the start and end marks; find the true length.',
        build(el, K) { let s = 2, e = 9.4; const row = K.row(el); K.slider(row, 'start mark (cm)', 1, 5, 0.1, s, v => { s = v; b.redraw(); }); K.slider(row, 'end mark (cm)', 5, 14, 0.1, e, v => { e = v; b.redraw(); }); const b = new K.Board(el, { xmin: -0.5, xmax: 15.5, ymin: -1.4, ymax: 1.6, axes: false, grid: 0, aspect: 0.2 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.rect(0.6, -1.2, 14.6, 1.2, { fill: '#fef3c7', color: '#a16207', w: 2 }); b.poly([[0.6, -1.2], [0.6, 0], [0.9, -0.4], [0.7, -0.8]], { fill: '#fff', color: '#fff' }); for (let m = 10; m <= 150; m++) { const x = m / 10, h = m % 10 ? (m % 5 ? 0.25 : 0.4) : 0.6; b.line(x, 0, x, -h, { color: C.ink, w: m % 10 ? 0.8 : 1.6 }); if (m % 10 === 0) b.text(x, -0.9, String(m / 10), { font: '10px' }); }
            b.rect(s, 0.15, e - s, 0.6, { fill: 'rgba(29,78,216,.5)', color: C.blue, w: 2 }); rd.innerHTML = `end ${e.toFixed(1)} − start ${s.toFixed(1)} = <b>${(e - s).toFixed(1)} cm</b> = ${Math.round((e - s) * 10)} mm`; };
          b.redraw(); return null; } },
      { title: 'Kinds of motion', intro: 'Choose a motion type to see an example animate.',
        build(el, K) { let k = 0; const row = K.row(el); K.select(row, 'motion', ['linear', 'circular', 'periodic'], i => { k = i; an.reset(); }); const b = new K.Board(el, { xmin: -4, xmax: 4, ymin: -2, ymax: 2, axes: false, grid: 0, aspect: 0.45 }); const rd = K.read(el); const an = new K.Anim(Infinity, () => b.redraw(), { ms: 60 });
          b.onDraw = () => { b.clear(); const t = an.i * 0.08; if (k === 0) { b.line(-4, -1, 4, -1, { color: C.grey, w: 2 }); b.text(-3.6 + (t % 7.2), -0.6, '🚗', { font: '24px' }); rd.innerHTML = '<b>linear</b>: moves along a straight line — a car on a straight road, a march-past, a falling stone'; }
            else if (k === 1) { b.circle(0, 0, 1.5, { color: C.grey, w: 1 }); b.line(0, 0, 1.5 * Math.cos(t), 1.5 * Math.sin(t), { color: C.blue, w: 3 }); b.dot(1.5 * Math.cos(t), 1.5 * Math.sin(t), { r: 8, color: C.orange }); rd.innerHTML = '<b>circular</b>: moves along a circle — tip of a fan blade, merry-go-round, stone on a string'; }
            else { const a = 0.6 * Math.sin(t * 1.5); b.line(0, 1.8, 1.6 * Math.sin(a), 1.8 - 1.6 * Math.cos(a), { color: C.ink, w: 2 }); b.dot(1.6 * Math.sin(a), 1.8 - 1.6 * Math.cos(a), { r: 10, color: C.purple }); rd.innerHTML = '<b>periodic</b>: repeats itself after equal intervals — pendulum, swing, heartbeat'; } };
          K.anim(el, an); b.redraw(); an.play(); return an; } }
    ],
    gens: [
      { title: 'Convert', gen(R) { const t = R.int(0, 3); if (t === 0) { const v = R.int(2, 9) * 1000 + R.int(1, 999); return { q: `${v} m = ? km`, a: `${v / 1000} km`, ans: v / 1000, tol: 1e-9 }; } if (t === 1) { const v = R.int(101, 999); return { q: `${v} cm = ? m`, a: `${v / 100} m`, ans: v / 100, tol: 1e-9 }; } if (t === 2) { const v = R.int(11, 99); return { q: `${v} mm = ? cm`, a: `${v / 10} cm`, ans: v / 10, tol: 1e-9 }; } const v = R.int(2, 9) + R.int(1, 9) / 10; return { q: `${v} km = ? m`, a: `${Math.round(v * 1000)} m`, ans: Math.round(v * 1000) }; } },
      { title: 'Broken scale', gen(R) { const s = R.int(1, 4) + R.int(0, 9) / 10, l = R.int(30, 120) / 10; return { q: `A pencil lies from the ${s.toFixed(1)} cm mark to the ${(s + l).toFixed(1)} cm mark. Its length?`, a: `${l.toFixed(1)} cm`, ans: l, tol: 0.01 }; } },
      { title: 'Type of motion', gen(R) { return G9.S9.groupQ(R, [['a train on a straight track', 0], ['the hands of a clock', 1], ['a swing', 2], ['an athlete in a 100 m race', 0], ['a spinning top’s edge', 1], ['a pendulum', 2]], ['linear', 'circular', 'periodic'], 'Kind of motion: '); } },
      { title: 'Body units', levels: [2, 3], gen(R) { const a = R.int(14, 18), b = R.int(19, 23), n = R.int(5, 9); return { q: `A table is ${n} hand spans long. Asha’s span is ${a} cm and her father’s is ${b} cm. What lengths do they get? Why do they differ?`, a: `${n * a} cm and ${n * b} cm; hand spans are not standard`, ans: n * a }; } },
      { title: 'Correct method', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['How do you avoid parallax error?', 'keep the eye directly above the mark'], ['How do you measure a curved line?', 'lay a thread along it, then measure the thread'], ['What is the SI unit of length?', 'metre'], ['Why are standard units needed?', 'same everywhere; fair trade and clear communication']]); } }
    ],
    quiz: [
      { q: 'SI unit of length', o: ['metre', 'centimetre', 'kilometre', 'foot'], a: 0, e: 'SI.' }, { q: '1 km =', o: ['1000 m', '100 m', '10 m', '10 000 m'], a: 0, e: 'Kilo.' },
      { q: '1 cm =', o: ['10 mm', '100 mm', '1 mm', '1000 mm'], a: 0, e: 'Milli.' }, { q: 'Parallax is avoided by', o: ['eye directly above the mark', 'looking sideways', 'closing both eyes', 'using a thread'], a: 0, e: 'Straight view.' },
      { q: 'Curved line measured with', o: ['a thread', 'a stone', 'a protractor', 'a clock'], a: 0, e: 'Thread.' }, { q: 'Pendulum motion', o: ['periodic', 'linear only', 'random', 'none'], a: 0, e: 'Repeats.' },
      { q: 'Hand span is', o: ['not a standard unit', 'standard', 'SI unit', 'same for all'], a: 0, e: 'Varies.' }, { q: 'From 2.0 to 9.5 cm', o: ['7.5 cm', '9.5 cm', '11.5 cm', '2 cm'], a: 0, e: 'Subtract.' },
      { q: 'Fan blade tip', o: ['circular motion', 'linear', 'no motion', 'random'], a: 0, e: 'Circle.' }, { q: '250 cm =', o: ['2.5 m', '25 m', '0.25 m', '2500 m'], a: 0, e: '÷ 100.' },
      { q: 'Car on a straight road', o: ['linear motion', 'circular', 'periodic', 'none'], a: 0, e: 'Straight.' }
    ],
    teach: {
      outcomes: ['Use standard units and conversions', 'Measure correctly', 'Classify motion'],
      periods: [{ t: 'Measuring', flow: [['10 min', 'Measure desk by hand spans — compare.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Thread for a curved line.']] }, { t: 'Motion', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Pendulum timing.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Body units are standard.', 'Start from the scale edge.'], activities: ['Class height chart.', 'Pendulum swings in 30 s.'],
      exit: ['Convert 3.4 km to m.', 'Broken scale reading.', 'Example of each motion.'], homework: 'Measure 5 things at home in cm and mm, including one curved object with a thread.'
    },
    slides: [{ t: 'Measurement of Length and Motion', b: ['Standard units', 'Measuring correctly', 'Conversions', 'Kinds of motion'] }, { t: 'Think and share', b: ['Why are hand spans unfair?', 'Motion of a swing?'] }],
    fs: { groups: [['Units', [['SI', 'metre'], ['1 km', '1000 m'], ['1 m', '100 cm'], ['1 cm', '10 mm']]], ['Measuring', [['Eye', 'directly above'], ['Broken scale', 'end − start'], ['Curves', 'thread']]], ['Motion', [['Linear', 'straight line'], ['Circular', 'round path'], ['Periodic', 'repeats']]]],
      ex: [['From 2.0 to 9.4 cm', '7.4 cm'], ['3.4 km', '3400 m']], rem: ['Use standard units.', 'Avoid parallax.', 'Name the motion.'] }
  });
})();
