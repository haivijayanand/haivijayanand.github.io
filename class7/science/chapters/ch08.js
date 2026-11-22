/*
TOOL:    class7_science_ch08
FAMILY:  CBSE_REVISION / Class 7 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 8 Measurement of Time and Motion (sundial, water clock, pendulum, time period, speed = distance / time, units, uniform and non-uniform motion) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toFixed(2)).toString();
  G9.register({
    no: 8, part: 'All chapters', short: 'Time and motion', title: 'Measurement of Time and Motion',
    blurb: 'Measuring time — sundials, water clocks, sand clocks, pendulums and modern clocks; the time period of a pendulum; speed as distance per unit time with units m/s and km/h; uniform and non-uniform motion; and the odometer and speedometer.',
    revise: {
      oneLine: 'A simple pendulum swings with a regular time period (time for one complete oscillation) that depends on its length, not on the mass of the bob. Speed = distance ÷ time; SI unit m/s, also km/h (1 km/h = 5/18 m/s). Uniform motion covers equal distances in equal times; non-uniform does not. A speedometer shows speed; an odometer shows distance.',
      sections: [
        { h: 'Time keepers', html: `<p>Ancient India used sundials (e.g., Jantar Mantar) and ghatika (water clock). The second is the SI unit of time.</p>` },
        { h: 'Pendulum', html: `<p>Time period T = time for 20 oscillations ÷ 20. A longer string gives a longer period.</p>` },
        { h: 'Speed', html: `<p>Average speed = total distance ÷ total time. To convert km/h to m/s, multiply by 5/18; m/s to km/h, multiply by 18/5.</p>` }
      ],
      formulas: [['Speed', 'distance ÷ time'], ['Distance', 'speed × time'], ['Time', 'distance ÷ speed'], ['km/h → m/s', '× 5/18'], ['Pendulum period', 'time for N swings ÷ N']],
      terms: [['Oscillation', 'one complete to-and-fro swing'], ['Time period', 'time for one oscillation'], ['Uniform motion', 'equal distances in equal times']],
      traps: ['Bob mass does not change the period much; length does.', 'Use consistent units.', 'Average speed ≠ average of speeds.'],
      bridge: '<p>Class 9 studies motion with graphs and equations.</p>'
    },
    explore: [
      { title: 'Pendulum length', intro: 'Change the length; see the swing and its time period (approximate, small swings).',
        build(el, K) { let L = 1; const row = K.row(el); K.slider(row, 'length (m)', 0.25, 2, 0.05, L, v => { L = v; }); const b = new K.Board(el, { xmin: -2, xmax: 2, ymin: -2.3, ymax: 0.2, axes: false, grid: 0, aspect: 0.55 }); const rd = K.read(el); const an = new K.Anim(Infinity, () => b.redraw(), { ms: 30 });
          b.onDraw = () => { b.clear(); const T = 2 * Math.PI * Math.sqrt(L / 9.8); const t = an.i * 0.03; const a = 0.35 * Math.cos(2 * Math.PI * t / T); b.line(-1, 0, 1, 0, { color: C.ink, w: 3 }); const x = L * Math.sin(a), y = -L * Math.cos(a); b.line(0, 0, x, y, { color: C.ink, w: 2 }); b.dot(x, y, { r: 12, color: C.orange });
            rd.innerHTML = `length ${f(L)} m → time period ≈ <b>${f(T)} s</b> · 20 oscillations ≈ ${f(20 * T)} s · longer string → slower swing`; };
          K.anim(el, an); an.play(); return an; } },
      { title: 'Speed calculator', intro: 'Set distance and time; see the speed in m/s and km/h.',
        build(el, K) { let d = 100, t = 20; const row = K.row(el); K.slider(row, 'distance (m)', 10, 1000, 10, d, v => { d = v; draw(); }); K.slider(row, 'time (s)', 2, 200, 1, t, v => { t = v; draw(); }); const rd = K.read(el);
          function draw() { const v = d / t; rd.innerHTML = `speed = ${d} m ÷ ${t} s = <b>${f(v)} m/s</b> = ${f(v)} × 18/5 = <b>${f(v * 3.6)} km/h</b>`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Speed', gen(R) { const t = R.int(2, 9), v = R.int(5, 20); return { q: `A cyclist covers ${v * t} m in ${t} s. Speed?`, a: `${v} m/s`, ans: v }; } },
      { title: 'Distance', gen(R) { const v = R.int(30, 80), t = R.int(2, 5); return { q: `A bus moves at ${v} km/h for ${t} h. Distance?`, a: `${v * t} km`, ans: v * t }; } },
      { title: 'Convert', gen(R) { const k = R.pick([18, 36, 54, 72, 90, 108]); return R.chance(.5) ? { q: `${k} km/h = ? m/s`, a: `${k * 5 / 18} m/s`, ans: k * 5 / 18 } : { q: `${k * 5 / 18} m/s = ? km/h`, a: `${k} km/h`, ans: k }; } },
      { title: 'Pendulum period', gen(R) { const T = R.int(10, 25) / 10, n = R.pick([10, 20]); return { q: `A pendulum makes ${n} oscillations in ${f(T * n)} s. Time period?`, a: `${f(T)} s`, ans: T, tol: 0.01 }; } },
      { title: 'Average speed', levels: [2, 3], gen(R) { const d1 = R.int(20, 60), t1 = R.int(1, 2), d2 = R.int(20, 60), t2 = R.int(1, 3); const v = (d1 + d2) / (t1 + t2); return { q: `A car goes ${d1} km in ${t1} h, then ${d2} km in ${t2} h. Average speed?`, a: `${f(v)} km/h`, ans: v, tol: 0.01 }; } }
    ],
    quiz: [
      { q: 'Speed =', o: ['distance ÷ time', 'time ÷ distance', 'distance × time', 'distance + time'], a: 0, e: 'Formula.' }, { q: 'SI unit of speed', o: ['m/s', 'km/h', 'm', 's'], a: 0, e: 'SI.' },
      { q: '72 km/h =', o: ['20 m/s', '72 m/s', '7.2 m/s', '200 m/s'], a: 0, e: '× 5/18.' }, { q: 'Pendulum period depends on', o: ['length', 'bob colour', 'bob mass mainly', 'time of day'], a: 0, e: 'Length.' },
      { q: '20 swings in 40 s: period', o: ['2 s', '20 s', '40 s', '0.5 s'], a: 0, e: '40/20.' }, { q: 'Odometer shows', o: ['distance', 'speed', 'time', 'fuel'], a: 0, e: 'Distance.' },
      { q: 'Uniform motion', o: ['equal distance in equal time', 'speed changes', 'stops', 'circular only'], a: 0, e: 'Constant.' }, { q: 'Ancient Indian water clock', o: ['ghatika', 'sundial', 'odometer', 'stopwatch'], a: 0, e: 'Ghatika.' },
      { q: 'SI unit of time', o: ['second', 'minute', 'hour', 'day'], a: 0, e: 's.' }, { q: '60 km/h for 3 h', o: ['180 km', '20 km', '63 km', '60 km'], a: 0, e: '60 × 3.' },
      { q: 'Speedometer shows', o: ['speed', 'distance', 'time', 'temperature'], a: 0, e: 'Speed.' }
    ],
    teach: {
      outcomes: ['Measure time with a pendulum', 'Calculate speed, distance, time', 'Convert units'],
      periods: [{ t: 'Time', flow: [['10 min', 'History of clocks.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Real pendulum: 20 swings.']] }, { t: 'Speed', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Walk 20 m and time it.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Heavier bob swings faster.', 'Average speed = average of speeds.'], activities: ['Pendulum length test.', 'Speed of classmates.'],
      exit: ['Speed formula.', 'Convert 54 km/h.', 'Pendulum period.'], homework: 'Time your walk to school and find your average speed.'
    },
    slides: [{ t: 'Measurement of Time and Motion', b: ['Ancient clocks', 'Pendulum', 'Speed and units', 'Uniform vs non-uniform'] }, { t: 'Think and share', b: ['Does a heavier bob swing faster?', '36 km/h in m/s?'] }],
    fs: { groups: [['Time', [['SI', 'second'], ['Pendulum T', 'time for N ÷ N'], ['T depends on', 'length']]], ['Speed', [['v', 'd ÷ t'], ['d', 'v × t'], ['t', 'd ÷ v'], ['km/h → m/s', '× 5/18']]], ['Motion', [['Uniform', 'equal d in equal t'], ['Non-uniform', 'unequal'], ['Odometer', 'distance']]]],
      ex: [['300 m in 20 s', '15 m/s'], ['54 km/h', '15 m/s']], rem: ['Keep units consistent.', 'Count 20 swings.', 'Average speed = total d ÷ total t.'] }
  });
})();
