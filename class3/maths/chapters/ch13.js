/*
TOOL:    class3_maths_ch13
FAMILY:  CBSE_REVISION / Class 3 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 13 Time Goes On (clock to 5 minutes, calendar) - revise, 2 explore panels (clock with minute hand, calendar month), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const M = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], D = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const tname = (h, m) => m === 0 ? `${h} o'clock` : m === 15 ? `quarter past ${h}` : m === 30 ? `half past ${h}` : m === 45 ? `quarter to ${h % 12 + 1}` : `${h}:${String(m).padStart(2, '0')}`;
  G9.register({
    no: 13, part: 'All chapters', short: 'Time', title: 'Time Goes On',
    blurb: 'Reading a clock to 5 minutes, quarter past and quarter to, hours and minutes, the calendar: days, weeks, months and dates.',
    revise: {
      oneLine: 'The minute hand goes round once in an hour; each number on the clock is 5 minutes. 1 hour = 60 minutes, 1 day = 24 hours, 1 week = 7 days, 1 year = 12 months.',
      sections: [
        { h: 'Clock', html: `<p>Minute hand on 3: 15 minutes past (quarter past). On 6: half past. On 9: quarter to the next hour. On 4: 20 minutes past.</p>` },
        { h: 'Units', html: `<p>60 minutes = 1 hour; 24 hours = 1 day; 7 days = 1 week; 12 months = 1 year.</p>` },
        { h: 'Calendar', html: `<p>Find the day of a date, count days between dates, find dates a week later (+7).</p>` }
      ],
      formulas: [['Each number', '5 minutes'], ['1 hour', '60 minutes'], ['1 day', '24 hours'], ['1 week', '7 days'], ['Same day next week', 'date + 7']],
      terms: [['Minute hand', 'long hand'], ['Hour hand', 'short hand'], ['Quarter past / to', '15 minutes after / before']],
      traps: ['Reading the minute hand number as minutes (on 4 = 20, not 4).', 'Quarter to 3 is 2:45.', 'Months have different numbers of days.'],
      bridge: '<p>Class 4 uses a.m. and p.m. and time intervals.</p>'
    },
    explore: [
      { title: 'Set the clock', intro: 'Set hours and minutes (in 5s). The hands move; the time is read in words.',
        build(el, K) { let h = 3, m = 20; const row = K.row(el); K.slider(row, 'hour', 1, 12, 1, h, v => { h = v; b.redraw(); }); K.slider(row, 'minutes', 0, 55, 5, m, v => { m = v; b.redraw(); });
          const b = new K.Board(el, { xmin: -1.4, xmax: 1.4, ymin: -1.25, ymax: 1.25, axes: false, grid: 0 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.circle(0, 0, 1.1, { fill: '#fff', color: C.ink, w: 4 }); for (let i = 1; i <= 12; i++) { const a = Math.PI / 2 - i * Math.PI / 6; b.text(0.9 * Math.cos(a), 0.9 * Math.sin(a), String(i), { font: 'bold 15px' }); b.text(1.25 * Math.cos(a), 1.25 * Math.sin(a), String(i * 5 % 60), { font: '10px', color: C.grey }); }
            const am = Math.PI / 2 - m * Math.PI / 30, ah = Math.PI / 2 - (h + m / 60) * Math.PI / 6; b.line(0, 0, 0.82 * Math.cos(am), 0.82 * Math.sin(am), { color: C.blue, w: 5 }); b.line(0, 0, 0.5 * Math.cos(ah), 0.5 * Math.sin(ah), { color: C.orange, w: 8 }); b.dot(0, 0, { r: 6 });
            rd.innerHTML = `${h}:${String(m).padStart(2, '0')} — <b>${tname(h, m)}</b> · minute hand on ${m / 5 || 12} = ${m} minutes`; };
          b.redraw(); return null; } },
      { title: 'Calendar month', intro: 'Choose a month and the day it starts on. Click a date.',
        build(el, K) { let mo = 10, st = 0, sel = 14; const row = K.row(el); K.select(row, 'month', M, i => { mo = i; draw(); }); const s1 = row.querySelector('select'); if (s1) s1.value = 10; K.select(row, 'starts on', ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], i => { st = i; draw(); });
          const box = document.createElement('div'); box.style.cssText = 'display:grid;grid-template-columns:repeat(7,44px);gap:3px;margin:8px 0'; el.appendChild(box); const rd = K.read(el); const W = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          function draw() { sel = Math.min(sel, D[mo]); box.innerHTML = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => `<div style="text-align:center;font-weight:bold">${d}</div>`).join('') + '<div></div>'.repeat(st) + Array.from({ length: D[mo] }, (_, i) => i + 1).map(d => `<div data-d="${d}" style="cursor:pointer;text-align:center;padding:5px 0;border-radius:4px;border:1px solid var(--rule,#cbd5e1);${d === sel ? 'background:var(--orange,#ea580c);color:#fff' : (d - sel) % 7 === 0 ? 'background:var(--blueL,#dbeafe)' : ''}">${d}</div>`).join('');
            box.querySelectorAll('[data-d]').forEach(c => c.onclick = () => { sel = +c.dataset.d; draw(); }); rd.innerHTML = `${sel} ${M[mo]} is a <b>${W[(st + sel - 1) % 7]}</b> · same weekday: ${Array.from({ length: 6 }, (_, i) => sel + 7 * (i - 2)).filter(d => d >= 1 && d <= D[mo] && d !== sel).join(', ')} · ${M[mo]} has ${D[mo]} days`; }
          draw(); return null; } }
    ],
    gens: [
      { title: 'Read the clock', gen(R) { const h = R.int(1, 12), m = 5 * R.int(0, 11); return { q: `The hour hand is just past ${h} and the minute hand is on ${m / 5 || 12}. What time is it?`, a: `${h}:${String(m).padStart(2, '0')} (${tname(h, m)})` }; } },
      { title: 'Quarter past / to', gen(R) { const h = R.int(1, 12), t = R.int(0, 1); return t ? { q: `Write quarter past ${h} in numbers.`, a: `${h}:15` } : { q: `Write quarter to ${h} in numbers.`, a: `${h === 1 ? 12 : h - 1}:45` }; } },
      { title: 'Units of time', gen(R) { const items = [['How many minutes in 2 hours?', 120], ['How many hours in a day?', 24], ['How many days in 3 weeks?', 21], ['How many months in a year?', 12], ['How many minutes in half an hour?', 30]]; const [q, a] = R.pick(items); return { q, a: String(a), ans: a }; } },
      { title: 'Calendar', levels: [2, 3], gen(R) { const d = R.int(1, 20); return { q: `If ${d} March is a Monday, what date is the next Monday?`, a: `${d + 7} March`, ans: d + 7 }; } },
      { title: 'How long?', levels: [3], gen(R) { const s = R.int(7, 10), e = s + R.int(1, 4); return { q: `School starts at ${s} o'clock and ends at ${e} o'clock (same morning/day). How many hours?`, a: `${e - s} hours`, ans: e - s }; } }
    ],
    quiz: [
      { q: 'Minute hand on 3 means', o: ['15 minutes', '3 minutes', '30 minutes', '45 minutes'], a: 0, e: '3 × 5.' }, { q: '1 hour =', o: ['60 minutes', '100 minutes', '30 minutes', '24 minutes'], a: 0, e: 'Sixty.' },
      { q: 'Quarter to 4', o: ['3:45', '4:15', '4:45', '3:15'], a: 0, e: '15 before 4.' }, { q: 'Half past 7', o: ['7:30', '7:15', '6:30', '7:45'], a: 0, e: 'Half hour.' },
      { q: 'Hours in a day', o: ['24', '12', '60', '7'], a: 0, e: 'Day and night.' }, { q: 'Minute hand on 8', o: ['40 minutes', '8 minutes', '20 minutes', '80 minutes'], a: 0, e: '8 × 5.' },
      { q: '5 March is Tuesday; next Tuesday', o: ['12 March', '11 March', '6 March', '15 March'], a: 0, e: '+7.' }, { q: 'Days in April', o: ['30', '31', '28', '29'], a: 0, e: 'Thirty.' },
      { q: 'The short hand shows', o: ['hours', 'minutes', 'seconds', 'days'], a: 0, e: 'Hour hand.' }, { q: '2 weeks =', o: ['14 days', '7 days', '12 days', '21 days'], a: 0, e: '7 × 2.' },
      { q: '9:20 in words', o: ['twenty past nine', 'twenty to nine', 'nine to twenty', 'quarter past nine'], a: 0, e: '20 minutes after.' }
    ],
    teach: {
      outcomes: ['Read clocks to 5 minutes', 'Use quarter past/to', 'Convert time units', 'Use a calendar'],
      periods: [{ t: 'Clock', flow: [['10 min', 'Count by 5s round the clock.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Paper clocks.']] }, { t: 'Calendar', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Class calendar problems.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Minute number read as minutes.', 'Quarter to.'], activities: ['Daily timetable with clock faces.', 'Birthday calendar.'],
      exit: ['Show 6:35.', 'Write quarter to 10.', 'Minutes in 3 hours.'], homework: 'Write the times of 5 things you do on a school day and draw the clocks.'
    },
    slides: [{ t: 'Time Goes On', b: ['Clock to 5 minutes', 'Quarter past and to', 'Units of time', 'Calendar'] }, { t: 'Check yourself', b: ['Minute hand on 7?', 'Quarter past 11?'] }],
    fs: { groups: [['Clock', [['Each number', '5 minutes'], ['On 3', 'quarter past'], ['On 6', 'half past'], ['On 9', 'quarter to']]], ['Units', [['1 hour', '60 min'], ['1 day', '24 h'], ['1 week', '7 days'], ['1 year', '12 months']]], ['Calendar', [['Next same day', '+7'], ['30 days', 'Apr, Jun, Sep, Nov']]]],
      ex: [['Minute on 4, hour past 2', '2:20'], ['Quarter to 6', '5:45']], rem: ['Count by 5s for minutes.', 'Quarter to = 45 minutes past.', '+7 for next week.'] }
  });
})();
