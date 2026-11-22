/*
TOOL:    class4_maths_ch12
FAMILY:  CBSE_REVISION / Class 4 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 12 Ticking Clocks and Turning Calendar (time to the minute, a.m. and p.m., durations, calendar and leap years) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const fmt = (t) => { const h = Math.floor(t / 60) % 24, m = t % 60, h12 = h % 12 || 12; return `${h12}:${String(m).padStart(2, '0')} ${h < 12 ? 'a.m.' : 'p.m.'}`; };
  const dur = d => `${Math.floor(d / 60)} h ${d % 60} min`;
  G9.register({
    no: 12, part: 'All chapters', short: 'Time and calendar', title: 'Ticking Clocks and Turning Calendar',
    blurb: 'Reading clocks to the minute, a.m. and p.m., finding how long something takes and when it ends, days in months, leap years and calendar puzzles.',
    revise: {
      oneLine: 'Each small mark on a clock is 1 minute. a.m. is from midnight to noon, p.m. from noon to midnight. To find a duration, count on in hours and then minutes. A year has 365 days, a leap year 366 (February has 29 days).',
      sections: [
        { h: 'Reading time', html: `<p>Minute hand 3 marks past 7 → 37 minutes. 7:37 in the evening is 7:37 p.m.</p>` },
        { h: 'Durations', html: `<p>9:45 a.m. to 1:20 p.m.: 9:45 → 12:45 is 3 h, 12:45 → 1:20 is 35 min → 3 h 35 min.</p>` },
        { h: 'Calendar', html: `<p>30 days: April, June, September, November. Leap years are divisible by 4 (2028 is a leap year).</p>` }
      ],
      formulas: [['1 h', '60 min'], ['1 day', '24 h'], ['Year', '365 days (leap 366)'], ['Week', '7 days'], ['Duration', 'count on: hours, then minutes']],
      terms: [['a.m.', 'midnight to noon'], ['p.m.', 'noon to midnight'], ['Duration', 'how long']],
      traps: ['12 noon is 12 p.m.; 12 midnight is 12 a.m.', 'Minutes go to 60, not 100.', 'Crossing noon when counting.'],
      bridge: '<p>Class 5 uses the 24-hour clock and timetables.</p>'
    },
    explore: [
      { title: 'Clock to the minute', intro: 'Move the time through the day; see a.m./p.m.',
        build(el, K) { let t = 457; const row = K.row(el); K.slider(row, 'time', 0, 1439, 1, t, v => { t = v; b.redraw(); }); const b = new K.Board(el, { xmin: -1.4, xmax: 1.4, ymin: -1.3, ymax: 1.3, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const h = Math.floor(t / 60), m = t % 60; b.circle(0, 0, 1.15, { fill: h >= 6 && h < 18 ? '#fffbeb' : '#e0e7ff', color: C.ink, w: 4 }); for (let i = 0; i < 60; i++) { const a = Math.PI / 2 - i * Math.PI / 30, r1 = i % 5 ? 1.07 : 0.98; b.line(r1 * Math.cos(a), r1 * Math.sin(a), 1.13 * Math.cos(a), 1.13 * Math.sin(a), { color: C.ink, w: i % 5 ? 1 : 2.5 }); } for (let i = 1; i <= 12; i++) { const a = Math.PI / 2 - i * Math.PI / 6; b.text(0.83 * Math.cos(a), 0.83 * Math.sin(a), String(i), { font: 'bold 15px' }); }
            const am = Math.PI / 2 - m * Math.PI / 30, ah = Math.PI / 2 - (h % 12 + m / 60) * Math.PI / 6; b.line(0, 0, 0.95 * Math.cos(am), 0.95 * Math.sin(am), { color: C.blue, w: 4 }); b.line(0, 0, 0.55 * Math.cos(ah), 0.55 * Math.sin(ah), { color: C.orange, w: 7 }); b.dot(0, 0, { r: 5 });
            rd.innerHTML = `<b>${fmt(t)}</b> · ${h < 12 ? 'before noon (a.m.)' : 'after noon (p.m.)'} ${h >= 6 && h < 18 ? '☀️' : '🌙'}`; };
          b.redraw(); return null; } },
      { title: 'How long?', intro: 'Set start and end times; the time line counts on.',
        build(el, K) { let s = 585, e = 800; const row = K.row(el); K.slider(row, 'start', 360, 1200, 5, s, v => { s = v; e = Math.max(e, s); b.redraw(); }); K.slider(row, 'end', 360, 1320, 5, e, v => { e = Math.max(v, s); b.redraw(); }); const b = new K.Board(el, { xmin: 5.5, xmax: 22.5, ymin: -1.2, ymax: 1.2, axes: false, grid: 0, aspect: 0.2 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.line(6, 0, 22, 0, { color: C.grey, w: 2 }); for (let h = 6; h <= 22; h++) { b.line(h, -0.15, h, 0.15, { color: C.ink, w: 2 }); b.text(h, -0.6, String(h % 12 || 12), { font: '11px' }); } b.line(s / 60, 0, e / 60, 0, { color: C.blue, w: 8 }); b.dot(s / 60, 0, { r: 7, color: C.orange }); b.dot(e / 60, 0, { r: 7, color: C.purple });
            const whole = Math.floor((e - s) / 60) * 60; rd.innerHTML = `${fmt(s)} → ${fmt(e)} · ${fmt(s)} + ${Math.floor((e - s) / 60)} h = ${fmt(s + whole)}, + ${(e - s) % 60} min · duration <b>${dur(e - s)}</b>`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Read the time', gen(R) { const h = R.int(1, 12), m = R.int(0, 59); return { q: `The hour hand is between ${h} and ${h % 12 + 1}; the minute hand is ${m} small marks past 12. Time?`, a: `${h}:${String(m).padStart(2, '0')}` }; } },
      { title: 'a.m. or p.m.', gen(R) { const t = R.pick([['having breakfast at 7:30', 'a.m.'], ['school assembly at 8:15', 'a.m.'], ['lunch at 1:10', 'p.m.'], ['watching stars at 9:00', 'p.m.'], ['evening games at 5:30', 'p.m.']]); return { q: `${t[0][0].toUpperCase() + t[0].slice(1)}: a.m. or p.m.?`, a: t[1] }; } },
      { title: 'How long', levels: [2, 3], gen(R) { const s = R.int(84, 132) * 5, d = R.int(10, 60) * 5; return { q: `A train leaves at ${fmt(s)} and arrives at ${fmt(s + d)}. How long is the journey?`, a: dur(d), ans: d, s: 'count on hours, then minutes' }; } },
      { title: 'End time', gen(R) { const s = R.int(96, 200) * 5, d = R.int(4, 30) * 5; return { q: `A film starts at ${fmt(s)} and runs ${dur(d)}. When does it end?`, a: fmt(s + d) }; } },
      { title: 'Calendar', levels: [1, 2], gen(R) { const t = R.pick([['How many days in a leap year?', '366'], ['How many days in June?', '30'], ['Is 2028 a leap year?', 'yes'], ['How many days in February 2027?', '28'], ['How many weeks in 35 days?', '5'], ['Days in January + February 2028?', '60']]); return { q: t[0], a: t[1] }; } }
    ],
    quiz: [
      { q: 'Each small mark on a clock is', o: ['1 minute', '5 minutes', '1 hour', '1 second only'], a: 0, e: '60 marks.' }, { q: 'After noon is', o: ['p.m.', 'a.m.', 'midnight', 'dawn'], a: 0, e: 'post meridiem.' },
      { q: '9:45 a.m. to 1:20 p.m.', o: ['3 h 35 min', '4 h 35 min', '3 h 25 min', '4 h 25 min'], a: 0, e: 'Count on.' }, { q: 'Days in a leap year', o: ['366', '365', '364', '360'], a: 0, e: 'Feb 29.' },
      { q: 'Month with 30 days', o: ['September', 'August', 'July', 'December'], a: 0, e: 'Knuckle rule.' }, { q: '12 noon is', o: ['12 p.m.', '12 a.m.', 'midnight', '0 p.m.'], a: 0, e: 'Noon.' },
      { q: '2:50 + 25 min', o: ['3:15', '3:75', '2:75', '3:05'], a: 0, e: 'Over 60.' }, { q: '2 h =', o: ['120 min', '200 min', '60 min', '100 min'], a: 0, e: '2 × 60.' },
      { q: 'Leap year', o: ['2028', '2027', '2026', '2030'], a: 0, e: '÷ 4.' }, { q: 'Hours from 7 a.m. to 7 p.m.', o: ['12', '7', '14', '24'], a: 0, e: 'Half day.' },
      { q: 'Week after 25 March', o: ['1 April', '32 March', '31 March', '2 April'], a: 0, e: 'March has 31.' }
    ],
    teach: {
      outcomes: ['Read time to the minute with a.m./p.m.', 'Find durations and end times', 'Use calendars and leap years'],
      periods: [{ t: 'Clock', flow: [['10 min', 'Daily routine times.'], ['15 min', 'Explore panel 1.'], ['15 min', 'a.m./p.m. sort.']] }, { t: 'Durations and calendar', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Calendar puzzles.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Minutes as decimals.', '12 a.m. vs 12 p.m.'], activities: ['Train timetable.', 'Knuckle method for months.'],
      exit: ['Duration 10:40 a.m. to 2:15 p.m.', 'Is 2032 a leap year?', 'Read 4:53.'], homework: 'Note the start and end times of 3 activities on a holiday and find how long each took.'
    },
    slides: [{ t: 'Ticking Clocks and Turning Calendar', b: ['Time to the minute', 'a.m. and p.m.', 'Durations', 'Calendar, leap years'] }, { t: 'Check yourself', b: ['8:35 a.m. + 2 h 40 min?', 'Days in February 2028?'] }],
    fs: { groups: [['Clock', [['Small mark', '1 min'], ['a.m.', 'midnight → noon'], ['p.m.', 'noon → midnight']]], ['Duration', [['Count on', 'hours, then minutes'], ['60 min', '1 h']]], ['Calendar', [['Year', '365 / leap 366'], ['30 days', 'Apr, Jun, Sep, Nov'], ['Leap', 'divisible by 4']]]],
      ex: [['9:45 a.m. → 1:20 p.m.', '3 h 35 min'], ['Feb 2028', '29 days']], rem: ['Minutes stop at 59.', 'Watch the noon crossing.', 'Use the knuckle rule.'] }
  });
})();
