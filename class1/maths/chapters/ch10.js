/*
TOOL:    class1_maths_ch10
FAMILY:  CBSE_REVISION / Class 1 Maths (Joyful Mathematics)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 10 How do I Spend my Day? (time) - revise, 2 explore panels (my day in order, clock at the hour), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const DAY = [['🌅', 'wake up', 6], ['🪥', 'brush teeth', 6.5], ['🥣', 'breakfast', 7], ['🏫', 'go to school', 8], ['🍱', 'lunch', 13], ['⚽', 'play', 17], ['📚', 'homework', 18], ['🍛', 'dinner', 20], ['😴', 'sleep', 21]];
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  G9.register({
    no: 10, part: 'All chapters', short: 'Time', title: 'How do I Spend my Day?',
    blurb: 'Morning, afternoon, evening and night; what comes first and next; days of the week; longer and shorter time; reading a clock at the hour.',
    revise: {
      oneLine: 'Our day happens in order: morning, afternoon, evening, night. Some things take a long time, some a short time. The 7 days of the week repeat, and a clock shows the hour when the long hand points to 12.',
      sections: [
        { h: 'Parts of the day', html: `<p>Morning 🌅 (wake up, school) · afternoon ☀️ (lunch) · evening 🌇 (play) · night 🌙 (sleep).</p>` },
        { h: 'First, next, last', html: `<p>Wake up → brush → breakfast → school. Before and after describe order.</p>` },
        { h: 'Long and short time', html: `<p>Blinking takes a very short time; sleeping at night takes a long time.</p>` },
        { h: 'Days and clocks', html: `<p>Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday — then Sunday again. When the long hand is on 12, the short hand shows the hour: 3 o'clock.</p>` }
      ],
      formulas: [['Parts of day', 'morning, afternoon, evening, night'], ['Week', '7 days'], ['o\'clock', 'long hand on 12'], ['Short hand', 'shows the hour'], ['Order', 'first, next, then, last']],
      terms: [['Yesterday', 'the day before today'], ['Tomorrow', 'the day after today'], ['o\'clock', 'exactly on the hour'], ['Week', '7 days']],
      traps: ['Mixing up the long and short hands.', 'Thinking the week starts again after Friday.', 'Yesterday vs tomorrow.'],
      bridge: '<p>Class 2 reads half past and quarter past; Class 3 uses minutes.</p>'
    },

    explore: [
      {
        title: 'My day in order', intro: 'Press <kbd>S</kbd> to move through the day.',
        build(el, K) {
          const rd = K.read(el); const an = new K.Anim(DAY.length - 1, () => draw(), { ms: 900 });
          function draw() { const k = an.i; const part = (h) => h < 12 ? 'morning' : h < 16 ? 'afternoon' : h < 20 ? 'evening' : 'night';
            rd.innerHTML = `<div style="font-size:34px">${DAY.map((d, i) => `<span style="opacity:${i <= k ? 1 : 0.25};${i === k ? 'outline:3px solid var(--orange,#ea580c);border-radius:8px' : ''}">${d[0]}</span>`).join(' ')}</div>${k ? `After <b>${DAY[k - 1][1]}</b> comes <b>${DAY[k][1]}</b>` : `First: <b>${DAY[0][1]}</b>`} (${part(DAY[k][2])})`; }
          K.anim(el, an); draw(); return an;
        }
      },
      {
        title: 'Clock at the hour', intro: 'Choose an hour. The long hand points to 12; the short hand points to the hour.',
        build(el, K) {
          let h = 3; const row = K.row(el); K.slider(row, 'hour', 1, 12, 1, h, v => { h = v; b.redraw(); });
          const b = new K.Board(el, { xmin: -1.4, xmax: 1.4, ymin: -1.25, ymax: 1.25, axes: false, grid: 0 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.circle(0, 0, 1.1, { fill: '#fff', color: C.ink, w: 4 }); for (let i = 1; i <= 12; i++) { const a = Math.PI / 2 - i * Math.PI / 6; b.text(0.9 * Math.cos(a), 0.9 * Math.sin(a), String(i), { font: 'bold 16px' }); }
            b.line(0, 0, 0, 0.8, { color: C.blue, w: 5 }); const a = Math.PI / 2 - h * Math.PI / 6; b.line(0, 0, 0.5 * Math.cos(a), 0.5 * Math.sin(a), { color: C.orange, w: 8 }); b.dot(0, 0, { r: 6 });
            rd.innerHTML = `<span style="color:var(--blue)">long hand on 12</span>, <span style="color:var(--orange)">short hand on ${h}</span> ⇒ <b>${h} o'clock</b>`; };
          b.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'What comes next in the day?', gen(R) {
          const k = R.int(0, DAY.length - 2); return { q: `${DAY[k][0]} ${DAY[k][1]} — what do we usually do next?`, a: `${DAY[k + 1][0]} ${DAY[k + 1][1]}` };
        } },
      { title: 'Days of the week', gen(R) {
          const k = R.int(0, 6), t = R.int(0, 2); const q = [`Which day comes after ${DAYS[k]}?`, `Which day comes before ${DAYS[k]}?`, `If today is ${DAYS[k]}, what day was yesterday?`][t]; const a = [DAYS[(k + 1) % 7], DAYS[(k + 6) % 7], DAYS[(k + 6) % 7]][t];
          return { q, a };
        } },
      { title: 'Read the clock', gen(R) {
          const h = R.int(1, 12); return { q: `The long hand is on 12 and the short hand is on ${h}. What time is it?`, a: `${h} o'clock`, ans: h };
        } },
      { title: 'Longer or shorter time', levels: [1, 2], gen(R) {
          const items = [['brushing teeth or sleeping at night — which takes longer?', 'sleeping'], ['blinking or eating lunch — which is quicker?', 'blinking'], ['a school day or a cricket match on TV for one over — which is longer?', 'a school day'], ['walking to the next room or walking to another town — which takes longer?', 'walking to another town']];
          const [q, a] = R.pick(items); return { q: `Think: ${q}`, a };
        } },
      { title: 'Part of the day', levels: [2, 3], gen(R) {
          const items = [['the Sun rises', 'morning'], ['we eat lunch', 'afternoon'], ['the stars come out', 'night'], ['we play outside after school', 'evening'], ['we go to school', 'morning']];
          const [q, a] = R.pick(items); return { q: `When does this happen: ${q}?`, a };
        } }
    ],

    quiz: [
      { q: 'We wake up in the', o: ['morning', 'night', 'evening', 'afternoon'], a: 0, e: 'Sunrise.' },
      { q: 'Day after Monday', o: ['Tuesday', 'Sunday', 'Wednesday', 'Friday'], a: 0, e: 'Order.' },
      { q: 'A week has how many days?', o: ['7', '5', '10', '12'], a: 0, e: 'Seven.' },
      { q: 'Long hand on 12, short hand on 5', o: ['5 o\'clock', '12 o\'clock', '6 o\'clock', 'half past 5'], a: 0, e: 'Hour hand.' },
      { q: 'Which takes longer?', o: ['sleeping at night', 'clapping once', 'blinking', 'sneezing'], a: 0, e: 'Hours.' },
      { q: 'Today is Friday. Tomorrow is', o: ['Saturday', 'Thursday', 'Sunday', 'Monday'], a: 0, e: 'Next day.' },
      { q: 'After breakfast we usually', o: ['go to school', 'sleep', 'have dinner', 'wake up'], a: 0, e: 'Morning order.' },
      { q: 'The short hand shows the', o: ['hour', 'day', 'minute', 'month'], a: 0, e: 'Hour hand.' },
      { q: 'Stars come out at', o: ['night', 'morning', 'noon', 'afternoon'], a: 0, e: 'Night.' },
      { q: 'Day before Sunday', o: ['Saturday', 'Monday', 'Friday', 'Thursday'], a: 0, e: 'Week order.' },
      { q: 'We eat lunch in the', o: ['afternoon', 'night', 'early morning', 'midnight'], a: 0, e: 'Midday.' }
    ],

    teach: {
      outcomes: ['Order events in a day', 'Name parts of the day and days of the week', 'Compare durations', 'Read a clock at the hour'],
      periods: [
        { t: 'My day', flow: [['10 min', 'Children act out their morning.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Days of the week song.']] },
        { t: 'Clocks', flow: [['15 min', 'Paper-plate clock.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Hands confused.', 'Yesterday/tomorrow.'],
      activities: ['Picture cards: order your day.', 'Paper-plate clocks.'],
      exit: ['What day is tomorrow?', 'Show 7 o\'clock.', 'What do you do in the evening?'],
      homework: 'Draw 4 things you do in a day in order. Write the time for one of them.'
    },

    slides: [
      { t: 'How do I Spend my Day?', b: ['Morning, afternoon, evening, night', 'Days of the week', 'o\'clock'] },
      { t: 'Clock', b: ['Long hand on 12', 'Short hand shows the hour', '3 o\'clock'] },
      { t: 'Check yourself', b: ['Day after Wednesday?', 'Show 9 o\'clock.'] }
    ],

    fs: { groups: [
        ['Parts of the day', [['🌅 morning', 'wake up, school'], ['☀️ afternoon', 'lunch'], ['🌇 evening', 'play'], ['🌙 night', 'sleep']]],
        ['Week', [['7 days', 'Sun, Mon, Tue, Wed, Thu, Fri, Sat'], ['Yesterday', 'day before'], ['Tomorrow', 'day after']]],
        ['Clock', [['Long hand', 'on 12 for o\'clock'], ['Short hand', 'shows the hour'], ['Example', '4 o\'clock: short hand on 4']]]],
      ex: [['Today Tuesday', 'yesterday Monday, tomorrow Wednesday'], ['Short hand on 8, long on 12', '8 o\'clock']],
      rem: ['Long hand on 12 = o\'clock.', 'The week has 7 days.', 'Order: first, next, last.'] }
  });
})();
