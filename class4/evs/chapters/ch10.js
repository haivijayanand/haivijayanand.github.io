/*
TOOL:    class4_science_ch10
FAMILY:  CBSE_REVISION / Class 4 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 10 Our Sky (sun, moon and stars, day and night, shadows, phases of the moon, constellations, sky safety) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const PH = ['new moon', 'waxing crescent', 'first quarter', 'waxing gibbous', 'full moon', 'waning gibbous', 'last quarter', 'waning crescent'];
  G9.register({
    no: 10, part: 'Unit 5 · Our Environment', short: 'Our sky', title: 'Our Sky',
    blurb: 'Watching the sky: the Sun rising in the east and setting in the west, day and night, shadows that change through the day, the Moon changing shape over a month, stars and star patterns, and never looking straight at the Sun.',
    revise: {
      oneLine: 'The Sun rises in the east and sets in the west; shadows are long in the morning and evening and shortest at noon. The Moon seems to change shape — new moon to full moon and back — in about a month (29–30 days). At night we see stars, some making patterns like the Big Dipper (Saptarishi).',
      sections: [
        { h: 'Day and night', html: `<p>Day when our side of the Earth faces the Sun, night when it faces away. Never look straight at the Sun.</p>` },
        { h: 'Shadows', html: `<p>Morning: Sun low in the east, long shadow to the west. Noon: Sun high, short shadow. Evening: long shadow to the east.</p>` },
        { h: 'Moon and stars', html: `<p>The Moon reflects sunlight. Phases: new → crescent → half → gibbous → full and back. Stars are far-away suns; Saptarishi points to the Pole Star (Dhruv tara).</p>` }
      ],
      formulas: [['Sunrise', 'east'], ['Sunset', 'west'], ['Shortest shadow', 'noon'], ['Moon cycle', 'about 29–30 days'], ['Pole Star', 'shows north']],
      terms: [['Phases', 'changing shapes of the lit Moon'], ['Shadow', 'dark shape where light is blocked'], ['Constellation', 'star pattern']],
      traps: ['The Moon makes no light of its own.', 'Never look at the Sun, even with sunglasses.', 'Stars are there by day too; sunlight hides them.'],
      bridge: '<p>Class 5 explores the Earth and space further.</p>'
    },
    explore: [
      { title: 'Shadow through the day', intro: 'Move the time; watch the Sun and the stick’s shadow.',
        build(el, K) { let t = 9; const row = K.row(el); K.slider(row, 'time (hours)', 7, 17, 0.5, t, v => { t = v; b.redraw(); }); const b = new K.Board(el, { xmin: -6, xmax: 6, ymin: -1, ymax: 5, axes: false, grid: 0, aspect: 0.45 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.line(-6, 0, 6, 0, { color: '#92400e', w: 3 }); b.text(5.4, -0.5, 'West', { font: '12px' }); b.text(-5.4, -0.5, 'East', { font: '12px' }); const a = (t - 6) / 12 * Math.PI, sx = -5 * Math.cos(a), sy = 4.5 * Math.sin(a); b.text(sx, sy, '☀️', { font: '28px' }); b.line(0, 0, 0, 1.2, { color: C.ink, w: 5 });
            const L = Math.min(6, 1.2 / Math.tan(Math.max(0.12, a < Math.PI / 2 ? a : Math.PI - a))); const dir = t < 12 ? 1 : -1; b.line(0, 0, dir * L, 0, { color: '#334155', w: 8 });
            rd.innerHTML = `${t < 12 ? 'morning' : t === 12 ? 'noon' : 'afternoon / evening'} · Sun in the ${t < 12 ? 'east' : t > 12 ? 'west' : 'high south sky'} · shadow points ${t < 12 ? 'west' : t > 12 ? 'east' : 'almost under the stick'}, length ≈ ${L.toFixed(1)} × stick`; };
          b.redraw(); return null; } },
      { title: 'Phases of the Moon', intro: 'Press <kbd>S</kbd> or Play to go through about a month.',
        build(el, K) { const b = new K.Board(el, { xmin: -1.5, xmax: 1.5, ymin: -1.2, ymax: 1.2, axes: false, grid: 0, equal: true }); const rd = K.read(el); let k = 0; const an = new K.Anim(8, i => { k = i; b.redraw(); }, { ms: 1200, loop: true });
          b.onDraw = () => { b.clear(); b.rect(-1.5, -1.2, 3, 2.4, { fill: '#0f172a', color: 'none' }); b.circle(0, 0, 1, { fill: '#1e293b', color: '#475569' }); const f = k / 8; const c = b.ctx; c.save(); c.fillStyle = '#fde68a'; c.beginPath(); const X = b.X(0), Y = b.Y(0), R = b.X(1) - b.X(0); const w = Math.cos(2 * Math.PI * f) * R;
            if (k !== 0) { if (f <= 0.5) { c.arc(X, Y, R, -Math.PI / 2, Math.PI / 2); c.ellipse(X, Y, Math.abs(w), R, 0, Math.PI / 2, -Math.PI / 2, w > 0); } else { c.arc(X, Y, R, Math.PI / 2, 3 * Math.PI / 2); c.ellipse(X, Y, Math.abs(w), R, 0, -Math.PI / 2, Math.PI / 2, w > 0); } c.fill(); } c.restore();
            rd.innerHTML = `day ≈ ${Math.round(k * 29.5 / 8)} · <b>${PH[k]}</b> ${k === 0 ? '(Amavasya — dark Moon)' : k === 4 ? '(Purnima — full Moon)' : k < 4 ? '— lit part growing' : '— lit part shrinking'}`; };
          K.anim(el, an); b.redraw(); return an; } }
    ],
    gens: [
      { title: 'Sun and shadows', gen(R) { return G9.S9.pickQ(R, [['In which direction does the Sun rise?', 'east'], ['When is your shadow shortest?', 'around noon'], ['In the morning, which way does your shadow point?', 'west'], ['Why should you never look at the Sun?', 'it can damage your eyes']]); } },
      { title: 'Moon', gen(R) { return G9.S9.pickQ(R, [['Does the Moon make its own light?', 'no — it reflects sunlight'], ['About how long from one full moon to the next?', 'about 29–30 days'], ['What is the night with no Moon called?', 'new moon (Amavasya)'], ['What is the full moon night called in Hindi?', 'Purnima']]); } },
      { title: 'Stars', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Which star helps find north?', 'the Pole Star (Dhruv tara)'], ['What is Saptarishi?', 'a star pattern of seven stars (Big Dipper)'], ['Why can we not see stars by day?', 'bright sunlight hides them'], ['What is a constellation?', 'a group of stars forming a pattern']]); } },
      { title: 'Days to full moon', gen(R) { const d = R.int(1, 13); return { q: `It was new moon ${d} days ago. About how many days to full moon (full moon ≈ 15 days after new moon)?`, a: `about ${15 - d} days`, ans: 15 - d }; } },
      { title: 'Day and night', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why do we have day and night?', 'the Earth turns; our side faces towards or away from the Sun'], ['When it is day in India, what is it in the USA?', 'night (roughly)'], ['How many hours in one day and night together?', '24 hours']]); } }
    ],
    quiz: [
      { q: 'The Sun rises in the', o: ['east', 'west', 'north', 'south'], a: 0, e: 'East.' }, { q: 'Shortest shadow at', o: ['noon', 'morning', 'evening', 'night'], a: 0, e: 'Sun high.' },
      { q: 'The Moon shines by', o: ['reflecting sunlight', 'its own fire', 'electricity', 'stars'], a: 0, e: 'Reflection.' }, { q: 'New moon to full moon takes about', o: ['15 days', '1 day', '3 months', '1 year'], a: 0, e: 'Half cycle.' },
      { q: 'Pole Star shows', o: ['north', 'south', 'east', 'west'], a: 0, e: 'Dhruv.' }, { q: 'Morning shadow points', o: ['west', 'east', 'up', 'north'], a: 0, e: 'Away from Sun.' },
      { q: 'Looking straight at the Sun', o: ['harms the eyes', 'is safe', 'helps sight', 'is fun'], a: 0, e: 'Danger.' }, { q: 'Saptarishi has', o: ['seven stars', 'one star', 'the Moon', 'planets only'], a: 0, e: 'Big Dipper.' },
      { q: 'Purnima is', o: ['full moon', 'new moon', 'half moon', 'no night'], a: 0, e: 'Full.' }, { q: 'Stars by day are', o: ['hidden by sunlight', 'gone', 'switched off', 'asleep'], a: 0, e: 'Still there.' },
      { q: 'A star pattern is a', o: ['constellation', 'shadow', 'phase', 'planet'], a: 0, e: 'Pattern.' }
    ],
    teach: {
      outcomes: ['Describe the Sun’s apparent path and shadows', 'Name Moon phases', 'Recognise a constellation'],
      periods: [{ t: 'Sun and shadows', flow: [['10 min', 'Shadow stick in the playground at 3 times.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Record shadow lengths.']] }, { t: 'Moon and stars', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Moon diary set-up.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Moon makes light.', 'Shadows stay the same all day.'], activities: ['Shadow stick.', 'Moon diary for a month.'],
      exit: ['Direction of sunrise.', 'When shadows are shortest.', 'Name two Moon phases.'], homework: 'Draw the Moon every night for two weeks and note the date.'
    },
    slides: [{ t: 'Our Sky', b: ['Sunrise, sunset', 'Shadows', 'Phases of the Moon', 'Stars and patterns'] }, { t: 'Think and share', b: ['Where does your shadow point at 8 a.m.?', 'What is Amavasya?'] }],
    fs: { groups: [['Sun', [['Rises', 'east'], ['Sets', 'west'], ['Shortest shadow', 'noon'], ['Safety', 'never look at it']]], ['Moon', [['Light', 'reflected sunlight'], ['Cycle', '≈ 29.5 days'], ['New / full', 'Amavasya / Purnima']]], ['Stars', [['Saptarishi', '7 stars'], ['Pole Star', 'north']]]],
      ex: [['New moon 5 days ago', 'full moon in ≈ 10 days'], ['8 a.m. shadow', 'points west']], rem: ['Never look at the Sun.', 'Moon borrows light.', 'Stars hide by day.'] }
  });
})();
