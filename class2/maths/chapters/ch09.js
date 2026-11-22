/*
TOOL:    class2_maths_ch09
FAMILY:  CBSE_REVISION / Class 2 Maths (Joyful Mathematics)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 9 Which Season is it? (time) - revise, 2 explore panels (months and seasons wheel, clock at hour and half hour), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const M = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const SEA = (i) => [11, 0, 1].includes(i) ? 'winter ❄️' : [2, 3, 4, 5].includes(i) ? 'summer ☀️' : [6, 7, 8].includes(i) ? 'rainy (monsoon) 🌧️' : 'autumn / post-monsoon 🍂';
  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  G9.register({
    no: 9, part: 'All chapters', short: 'Time and seasons', title: 'Which Season is it?',
    blurb: 'Days, weeks, months and seasons; reading a calendar; telling time at the hour and half hour.',
    revise: {
      oneLine: 'A year has 12 months and the seasons change through it (in most of India: winter, summer, rainy season, autumn). A week has 7 days. On a clock, long hand on 12 = o\'clock, on 6 = half past.',
      sections: [
        { h: 'Calendar', html: `<p>12 months: January … December. Most months have 30 or 31 days; February has 28 (29 in a leap year). A week has 7 days.</p>` },
        { h: 'Seasons', html: `<p>Winter (Dec–Feb), summer (Mar–Jun), rainy season (Jul–Sep), autumn (Oct–Nov) — this varies across India.</p>` },
        { h: 'Clock', html: `<p>Long hand on 12: 4 o'clock. Long hand on 6: half past 4 (short hand between 4 and 5).</p>` }
      ],
      formulas: [['Year', '12 months'], ['Week', '7 days'], ['Month', '28–31 days'], ['o\'clock', 'long hand on 12'], ['half past', 'long hand on 6']],
      terms: [['Calendar', 'shows days and months'], ['Season', 'part of the year with its own weather'], ['Half past', '30 minutes after the hour']],
      traps: ['At half past, the short hand is between two numbers.', 'Months in order: June comes before July.', 'Seasons differ in different parts of India.'],
      bridge: '<p>Class 3 reads time to 5 minutes.</p>'
    },
    explore: [
      { title: 'Months and seasons', intro: 'Slide through the months of the year.',
        build(el, K) { let m = 10; const row = K.row(el); K.slider(row, 'month', 1, 12, 1, m + 1, v => { m = v - 1; draw(); }); const rd = K.read(el);
          const box = document.createElement('div'); box.style.cssText = 'display:grid;grid-template-columns:repeat(6,1fr);gap:4px;margin:8px 0;max-width:720px'; el.appendChild(box);
          function draw() { box.innerHTML = M.map((n, i) => `<div style="padding:8px 4px;text-align:center;border-radius:6px;border:2px solid ${i === m ? 'var(--orange,#ea580c)' : 'var(--rule,#cbd5e1)'};font-weight:${i === m ? 'bold' : 'normal'}">${n.slice(0, 3)}<br>${SEA(i).split(' ').pop()}</div>`).join('');
            rd.innerHTML = `<b>${M[m]}</b> (month ${m + 1}) has ${DAYS[m]}${m === 1 ? ' (29 in a leap year)' : ''} days · season: ${SEA(m)} · before: ${M[(m + 11) % 12]}, after: ${M[(m + 1) % 12]}`; }
          draw(); return null; } },
      { title: 'Clock: o\'clock and half past', intro: 'Choose the hour and o\'clock or half past.',
        build(el, K) { let h = 4, half = 0; const row = K.row(el); K.slider(row, 'hour', 1, 12, 1, h, v => { h = v; b.redraw(); }); K.select(row, 'time', ['o\'clock', 'half past'], i => { half = i; b.redraw(); });
          const b = new K.Board(el, { xmin: -1.4, xmax: 1.4, ymin: -1.25, ymax: 1.25, axes: false, grid: 0 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.circle(0, 0, 1.1, { fill: '#fff', color: C.ink, w: 4 }); for (let i = 1; i <= 12; i++) { const a = Math.PI / 2 - i * Math.PI / 6; b.text(0.9 * Math.cos(a), 0.9 * Math.sin(a), String(i), { font: 'bold 16px' }); }
            b.line(0, 0, 0, half ? -0.8 : 0.8, { color: C.blue, w: 5 }); const a = Math.PI / 2 - (h + half * 0.5) * Math.PI / 6; b.line(0, 0, 0.5 * Math.cos(a), 0.5 * Math.sin(a), { color: C.orange, w: 8 }); b.dot(0, 0, { r: 6 });
            rd.innerHTML = half ? `long hand on 6, short hand between ${h} and ${h % 12 + 1} ⇒ <b>half past ${h}</b>` : `long hand on 12, short hand on ${h} ⇒ <b>${h} o'clock</b>`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Months in order', gen(R) { const i = R.int(0, 11); return R.chance(.5) ? { q: `Which month comes after ${M[i]}?`, a: M[(i + 1) % 12] } : { q: `Which month comes before ${M[i]}?`, a: M[(i + 11) % 12] }; } },
      { title: 'Days in a month', gen(R) { const i = R.int(0, 11); return { q: `How many days does ${M[i]} have?`, a: i === 1 ? '28 (29 in a leap year)' : String(DAYS[i]), ans: DAYS[i] }; } },
      { title: 'Read the clock', gen(R) { const h = R.int(1, 12), half = R.chance(.5); return { q: half ? `The long hand is on 6 and the short hand is between ${h} and ${h % 12 + 1}. What time is it?` : `The long hand is on 12 and the short hand is on ${h}. What time is it?`, a: half ? `half past ${h}` : `${h} o'clock` }; } },
      { title: 'Weeks and days', levels: [2, 3], gen(R) { const w = R.int(1, 4); return { q: `How many days are in ${w} week${w > 1 ? 's' : ''}?`, a: String(7 * w), ans: 7 * w }; } },
      { title: 'Season', levels: [1, 2], gen(R) { const items = [['we wear sweaters', 'winter'], ['it rains a lot', 'rainy season'], ['it is very hot', 'summer'], ['we use umbrellas every day', 'rainy season']]; const [q, a] = R.pick(items); return { q: `In which season do ${q}?`, a }; } }
    ],
    quiz: [
      { q: 'Months in a year', o: ['12', '7', '10', '365'], a: 0, e: 'Twelve.' }, { q: 'Days in a week', o: ['7', '12', '30', '5'], a: 0, e: 'Seven.' },
      { q: 'Month after June', o: ['July', 'May', 'August', 'April'], a: 0, e: 'Order.' }, { q: 'Long hand on 6 means', o: ['half past', 'o\'clock', 'midnight', 'quarter'], a: 0, e: 'Half.' },
      { q: 'Days in January', o: ['31', '30', '28', '29'], a: 0, e: 'Thirty-one.' }, { q: 'February usually has', o: ['28 days', '31 days', '30 days', '27 days'], a: 0, e: '29 in leap year.' },
      { q: 'We wear sweaters in', o: ['winter', 'summer', 'monsoon', 'never'], a: 0, e: 'Cold.' }, { q: 'Short hand on 7, long on 12', o: ['7 o\'clock', '12 o\'clock', 'half past 7', '6 o\'clock'], a: 0, e: 'Hour hand.' },
      { q: '2 weeks =', o: ['14 days', '7 days', '21 days', '10 days'], a: 0, e: '7 + 7.' }, { q: 'First month of the year', o: ['January', 'December', 'April', 'June'], a: 0, e: 'January.' },
      { q: 'Monsoon rains are in', o: ['July–September', 'December–January', 'March', 'May only'], a: 0, e: 'Rainy season.' }
    ],
    teach: {
      outcomes: ['Name months and days in order', 'Relate months to seasons', 'Read a calendar', 'Tell time at the hour and half hour'],
      periods: [{ t: 'Calendar and seasons', flow: [['15 min', 'Class calendar; birthdays by month.'], ['15 min', 'Explore panel 1.'], ['10 min', 'Season chart.']] }, { t: 'Clock', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Paper clocks: o\'clock and half past.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Short hand at half past.', 'Month order.'], activities: ['Birthday month chart.', 'Season collage.'],
      exit: ['Month before March?', 'Show half past 2.', 'Days in 3 weeks?'], homework: 'Mark your birthday and two festivals on a calendar. Which season are they in?'
    },
    slides: [{ t: 'Which Season is it?', b: ['Months and weeks', 'Seasons', 'o\'clock and half past'] }, { t: 'Check yourself', b: ['Month after October?', 'Show half past 9.'] }],
    fs: { groups: [['Calendar', [['Year', '12 months'], ['Week', '7 days'], ['31 days', 'Jan, Mar, May, Jul, Aug, Oct, Dec'], ['30 days', 'Apr, Jun, Sep, Nov'], ['February', '28 (29)']]], ['Seasons (most of India)', [['Winter', 'Dec–Feb'], ['Summer', 'Mar–Jun'], ['Rainy', 'Jul–Sep'], ['Autumn', 'Oct–Nov']]], ['Clock', [['o\'clock', 'long hand on 12'], ['half past', 'long hand on 6']]]],
      ex: [['After November', 'December'], ['Long 6, short between 3 and 4', 'half past 3']], rem: ['Say months in order.', 'At half past the short hand is between numbers.', 'A week has 7 days.'] }
  });
})();
