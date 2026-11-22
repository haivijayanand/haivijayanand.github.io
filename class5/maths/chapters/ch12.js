/*
TOOL:    class5_maths_ch12
FAMILY:  CBSE_REVISION / Class 5 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 12 Racing Seconds (seconds, minutes and hours; stopwatch timing; comparing race times; 24-hour clock) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const ms = s => `${Math.floor(s / 60)} min ${s % 60} s`;
  G9.register({
    no: 12, part: 'All chapters', short: 'Seconds and time', title: 'Racing Seconds',
    blurb: 'Seconds as small units of time, stopwatch readings, comparing race times, converting seconds, minutes and hours, and the 24-hour clock in timetables.',
    revise: {
      oneLine: '1 minute = 60 seconds and 1 hour = 60 minutes = 3600 seconds. In a race, the smaller time wins. 2 min 15 s = 135 s. The 24-hour clock writes 3:45 p.m. as 15:45.',
      sections: [
        { h: 'Converting', html: `<p>min → s: × 60. 200 s = 3 min 20 s.</p>` },
        { h: 'Comparing times', html: `<p>Runner A 58 s, B 1 min 2 s (62 s) → A is faster by 4 s.</p>` },
        { h: '24-hour clock', html: `<p>After noon add 12: 7:30 p.m. = 19:30. 00:00 is midnight.</p>` }
      ],
      formulas: [['1 min', '60 s'], ['1 h', '60 min = 3600 s'], ['Faster', 'less time'], ['p.m. → 24 h', '+ 12 hours']],
      terms: [['Second', 'small unit of time'], ['Stopwatch', 'measures short times'], ['24-hour clock', '00:00 to 23:59']],
      traps: ['Bigger time is slower, not faster.', '1 min 5 s ≠ 1.5 min.', '12:30 p.m. is 12:30 in 24-hour time.'],
      bridge: '<p>Class 6 uses speed and time in stories.</p>'
    },
    explore: [
      { title: 'Stopwatch race', intro: 'Press <kbd>P</kbd> to start the race (1 second per tick). Who finishes first?',
        build(el, K) { const T = [['Asha', 52], ['Bilal', 61], ['Chitra', 48], ['Dev', 57]]; const b = new K.Board(el, { xmin: -2, xmax: 11, ymin: -0.5, ymax: 4.5, axes: false, grid: 0, aspect: 0.35 }); const rd = K.read(el); const an = new K.Anim(66, () => b.redraw(), { ms: 120 });
          b.onDraw = () => { b.clear(); b.line(10, -0.3, 10, 4.3, { color: C.ink, w: 3, dash: [6, 4] }); T.forEach(([n, t], i) => { const x = Math.min(10, 10 * an.i / t); b.line(0, i + 0.5, 10, i + 0.5, { color: C.grid, w: 1 }); b.text(-1, i + 0.5, n, { font: '13px' }); b.text(x, i + 0.5, '🏃', { font: '22px' }); });
            const done = T.filter(t => an.i >= t[1]).sort((a, c) => a[1] - c[1]); rd.innerHTML = `stopwatch: <b>${ms(an.i)}</b> · finished: ${done.map(d => `${d[0]} (${d[1]} s)`).join(', ') || '—'}${done.length === 4 ? ` · winner <b>${done[0][0]}</b>, ${done[3][1] - done[0][1]} s ahead of the last` : ''}`; };
          K.anim(el, an); b.redraw(); return an; } },
      { title: '12-hour and 24-hour', intro: 'Move through the day.',
        build(el, K) { let t = 945; const row = K.row(el); K.slider(row, 'time', 0, 1439, 5, t, v => { t = v; draw(); }); const rd = K.read(el);
          function draw() { const h = Math.floor(t / 60), m = String(t % 60).padStart(2, '0'); rd.innerHTML = `<div style="font-size:26px">${h % 12 || 12}:${m} ${h < 12 ? 'a.m.' : 'p.m.'} &nbsp;=&nbsp; <b>${String(h).padStart(2, '0')}:${m}</b></div>${h >= 12 ? (h === 12 ? 'noon hour: 12 stays 12' : `p.m.: ${h - 12} + 12 = ${h}`) : (h === 0 ? 'midnight hour: 12 a.m. = 00' : 'a.m.: same hour')}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Minutes to seconds', gen(R) { const m = R.int(1, 9), s = R.int(0, 59); return R.chance(.5) ? { q: `${m} min ${s} s = ? s`, a: `${m * 60 + s} s`, ans: m * 60 + s } : { q: `${m * 60 + s} s = ? min ? s`, a: `${m} min ${s} s` }; } },
      { title: 'Who is faster?', gen(R) { const a = R.int(45, 75), b = R.int(45, 75) + (R.chance(.5) ? 0 : 1); if (a === b) return { q: `A runs in ${a} s and B in ${a + 3} s. Who is faster and by how much?`, a: 'A, by 3 s', ans: 3 }; return { q: `A runs in ${ms(a)} and B in ${ms(b)}. Who is faster and by how much?`, a: `${a < b ? 'A' : 'B'}, by ${Math.abs(a - b)} s`, ans: Math.abs(a - b) }; } },
      { title: '24-hour clock', gen(R) { const h = R.int(1, 11), m = R.int(0, 11) * 5; return R.chance(.5) ? { q: `Write ${h}:${String(m).padStart(2, '0')} p.m. in 24-hour time.`, a: `${h + 12}:${String(m).padStart(2, '0')}` } : { q: `Write ${String(h + 12)}:${String(m).padStart(2, '0')} in 12-hour time.`, a: `${h}:${String(m).padStart(2, '0')} p.m.` }; } },
      { title: 'Hours to seconds', levels: [2, 3], gen(R) { const h = R.int(1, 3); return { q: `How many seconds in ${h} hour${h > 1 ? 's' : ''}?`, a: String(3600 * h), ans: 3600 * h }; } },
      { title: 'Journey time', levels: [2, 3], gen(R) { const s = R.int(6, 18) * 60 + R.int(0, 11) * 5, d = R.int(30, 300); const e = s + d, f = t => `${String(Math.floor(t / 60) % 24).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`; return { q: `A train leaves at ${f(s)} and arrives at ${f(e)}. Journey time?`, a: `${Math.floor(d / 60)} h ${d % 60} min`, ans: d }; } }
    ],
    quiz: [
      { q: '1 min =', o: ['60 s', '100 s', '30 s', '360 s'], a: 0, e: 'Sixty.' }, { q: '2 min 15 s =', o: ['135 s', '215 s', '120 s', '75 s'], a: 0, e: '120 + 15.' },
      { q: 'Faster runner has', o: ['less time', 'more time', 'same time', 'longer legs'], a: 0, e: 'Less time.' }, { q: '7:30 p.m. in 24-hour', o: ['19:30', '07:30', '17:30', '21:30'], a: 0, e: '+12.' },
      { q: '1 hour =', o: ['3600 s', '360 s', '600 s', '6000 s'], a: 0, e: '60 × 60.' }, { q: '58 s vs 1 min 2 s', o: ['58 s faster by 4 s', '1 min 2 s faster', 'same', '58 s faster by 2 s'], a: 0, e: '62 − 58.' },
      { q: '00:00 is', o: ['midnight', 'noon', '12:00 p.m.', '1 a.m.'], a: 0, e: 'Start of day.' }, { q: '200 s =', o: ['3 min 20 s', '2 min', '3 min 2 s', '20 min'], a: 0, e: '180 + 20.' },
      { q: '12:30 p.m. in 24-hour', o: ['12:30', '00:30', '24:30', '13:30'], a: 0, e: 'Noon hour.' }, { q: 'Unit to time a 100 m race', o: ['seconds', 'hours', 'days', 'minutes only'], a: 0, e: 'Short.' },
      { q: '15:45 =', o: ['3:45 p.m.', '5:45 p.m.', '3:45 a.m.', '15:45 a.m.'], a: 0, e: '−12.' }
    ],
    teach: {
      outcomes: ['Convert seconds, minutes, hours', 'Compare times', 'Use the 24-hour clock'],
      periods: [{ t: 'Seconds', flow: [['10 min', 'Time a 50 m dash.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Compare results.']] }, { t: '24-hour clock', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Train timetable.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['More time = faster.', 'Decimal minutes.'], activities: ['Class sports-day timing.', 'Timetable reading.'],
      exit: ['4 min 8 s in s.', '9:20 p.m. in 24-hour.', 'Who wins: 63 s or 1 min 1 s?'], homework: 'Time how long 5 tasks take (brushing, tying laces…) with a stopwatch and order them.'
    },
    slides: [{ t: 'Racing Seconds', b: ['Seconds, minutes, hours', 'Comparing race times', '24-hour clock', 'Journey times'] }, { t: 'Check yourself', b: ['3 min 40 s in s?', '11:15 p.m. in 24-hour?'] }],
    fs: { groups: [['Units', [['1 min', '60 s'], ['1 h', '3600 s']]], ['Races', [['Faster', 'less time'], ['Difference', 'subtract times']]], ['24-hour', [['p.m.', '+ 12'], ['Noon', '12:00'], ['Midnight', '00:00']]]],
      ex: [['2 min 15 s', '135 s'], ['7:30 p.m.', '19:30']], rem: ['Convert to seconds to compare.', 'Less time wins.', 'Noon and midnight need care.'] }
  });
})();
