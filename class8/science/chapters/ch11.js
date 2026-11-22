/*
TOOL:    class8_science_ch11
FAMILY:  CBSE_REVISION / Class 8 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 11 Keeping Time with the Skies (day, lunar month, solar year, Moon phases, Indian lunisolar calendars, adhika masa, leap year, Sun’s path and seasons, nakshatras) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 11, part: 'All chapters', short: 'Sky calendars', title: 'Keeping Time with the Skies',
    blurb: 'How people used the sky as a clock and calendar: the day from Earth’s rotation, the lunar month from the Moon’s phases (about 29.5 days), the solar year (about 365¼ days), leap years, lunisolar calendars in India with an extra month (adhika māsa), the Sun’s shifting rising point, and star groups (nakshatras) along the Moon’s path.',
    revise: {
      oneLine: 'A day comes from Earth’s rotation, a month from the Moon’s cycle of phases (≈ 29.5 days), a year from Earth’s revolution (≈ 365.24 days). Twelve lunar months ≈ 354 days, about 11 days short of a solar year, so Indian lunisolar calendars add an extra month roughly every 2½–3 years to stay in step with seasons. The Gregorian calendar adds a leap day every 4 years (with century exceptions).',
      sections: [
        { h: 'Moon calendar', html: `<p>Amavasya (new moon) to Purnima (full moon) is the bright fortnight (shukla paksha); then the dark fortnight (krishna paksha). Festivals like Diwali and Eid follow the Moon.</p>` },
        { h: 'Solar calendar', html: `<p>The Sun’s rising point shifts north and south along the horizon through the year; solstices and equinoxes mark turning points. Makar Sankranti and Pongal follow the Sun.</p>` },
        { h: 'Leap years', html: `<p>Divisible by 4 → leap year, except century years not divisible by 400 (1900 not leap, 2000 leap).</p>` }
      ],
      formulas: [['Lunar month', '≈ 29.5 days'], ['12 lunar months', '≈ 354 days'], ['Solar year', '≈ 365.24 days'], ['Gap', '≈ 11 days/year'], ['Leap year', '÷4, but centuries ÷400']],
      terms: [['Lunisolar calendar', 'months by Moon, years kept in step with the Sun'], ['Adhika māsa', 'extra month added to a lunisolar year'], ['Nakshatra', 'one of 27 star groups along the Moon’s path']],
      traps: ['Moon phases are not caused by Earth’s shadow.', '1900 was not a leap year.', 'Purely lunar calendars drift through the seasons.'],
      bridge: '<p>Class 12 Physics touches on astronomy; geography covers time zones.</p>'
    },
    explore: [
      { title: 'Calendar drift', intro: 'See how a pure 12-month lunar year drifts from the seasons, and how adding a month fixes it.',
        build(el, K) { let y = 3; const row = K.row(el); K.slider(row, 'years', 1, 10, 1, y, v => { y = v; draw(); }); const rd = K.read(el);
          function draw() { const drift = y * (365.24 - 354.37); const add = Math.floor(drift / 29.53); rd.innerHTML = `after ${y} year${y > 1 ? 's' : ''}: lunar calendar falls behind by <b>${drift.toFixed(1)} days</b> · extra months needed so far: <b>${add}</b> · remaining gap ${(drift - add * 29.53).toFixed(1)} days`; } draw(); return null; } },
      { title: 'Leap year checker', intro: 'Choose a year.',
        build(el, K) { let Y = 2028; const row = K.row(el); K.slider(row, 'year', 1896, 2104, 1, Y, v => { Y = v; draw(); }); const rd = K.read(el);
          function draw() { const leap = (Y % 4 === 0 && Y % 100 !== 0) || Y % 400 === 0; rd.innerHTML = `<b>${Y}</b> is ${leap ? '<b>a leap year</b> (366 days)' : '<b>not</b> a leap year (365 days)'} — ${Y % 4 ? 'not divisible by 4' : Y % 100 ? 'divisible by 4, not a century' : Y % 400 ? 'century not divisible by 400' : 'century divisible by 400'}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Leap year', gen(R) { const Y = R.pick([1900, 2000, 2024, 2026, 2100, 2400, 1996, 2030]); const l = (Y % 4 === 0 && Y % 100 !== 0) || Y % 400 === 0; return { q: `Is ${Y} a leap year?`, a: l ? 'yes' : 'no' }; } },
      { title: 'Lunar months', gen(R) { const n = R.int(2, 12); return { q: `About how many days in ${n} lunar months (29.5 days each)?`, a: String(29.5 * n), ans: 29.5 * n }; } },
      { title: 'Drift', levels: [2, 3], gen(R) { const y = R.int(2, 8); return { q: `A 354-day lunar year falls about 11 days behind each solar year. Drift after ${y} years?`, a: `${11 * y} days`, ans: 11 * y }; } },
      { title: 'Sky clocks', gen(R) { return G9.S9.pickQ(R, [['What gives a day?', 'Earth’s rotation'], ['What gives a month?', 'Moon’s cycle of phases'], ['What gives a year?', 'Earth’s revolution round the Sun'], ['What is adhika māsa?', 'extra month in lunisolar calendars']]); } },
      { title: 'Fortnights', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Shukla paksha is between?', 'new moon and full moon (waxing)'], ['Krishna paksha is between?', 'full moon and new moon (waning)'], ['How many nakshatras?', '27'], ['Name a festival fixed by the Sun.', 'Makar Sankranti / Pongal']]); } }
    ],
    quiz: [
      { q: 'Lunar month', o: ['≈ 29.5 days', '7 days', '365 days', '24 h'], a: 0, e: 'Phases.' }, { q: 'Solar year', o: ['≈ 365.24 days', '354 days', '360 days', '400 days'], a: 0, e: 'Revolution.' },
      { q: '2000 was', o: ['leap year', 'not leap', 'lunar', 'none'], a: 0, e: '÷400.' }, { q: '1900 was', o: ['not leap', 'leap', 'lunar', 'adhika'], a: 0, e: 'Century rule.' },
      { q: 'Gap between 12 lunar months and a year', o: ['≈ 11 days', '1 day', '30 days', '0'], a: 0, e: '365 − 354.' }, { q: 'Extra month', o: ['adhika māsa', 'nakshatra', 'paksha', 'tithi'], a: 0, e: 'Intercalary.' },
      { q: 'Day comes from', o: ['rotation', 'revolution', 'Moon', 'stars'], a: 0, e: 'Spin.' }, { q: 'Nakshatras', o: ['27', '12', '7', '365'], a: 0, e: 'Star groups.' },
      { q: 'Shukla paksha', o: ['waxing', 'waning', 'eclipse', 'solstice'], a: 0, e: 'Bright.' }, { q: 'Pongal follows', o: ['Sun', 'Moon only', 'Jupiter', 'tides'], a: 0, e: 'Solar.' },
      { q: 'Pure lunar calendar', o: ['drifts through seasons', 'fixed to seasons', 'longer than solar', 'same as solar'], a: 0, e: 'Drift.' }
    ],
    teach: {
      outcomes: ['Relate day, month, year to sky motions', 'Explain lunisolar calendars', 'Apply leap-year rule'],
      periods: [{ t: 'Sky clocks', flow: [['10 min', 'Festival dates discussion.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Moon diary review.']] }, { t: 'Calendars', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Sunrise point observation plan.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Earth’s shadow causes phases.', 'Every 4th year always leap.'], activities: ['Sunrise marker on horizon.', 'Compare Indian and Gregorian calendars.'],
      exit: ['Day/month/year sources.', '11-day gap.', 'Leap year rule.'], homework: 'Find the dates of three festivals in two years and explain the shift.'
    },
    slides: [{ t: 'Keeping Time with the Skies', b: ['Day, month, year', 'Lunar and solar calendars', 'Adhika māsa', 'Leap years'] }, { t: 'Think and share', b: ['Why does Diwali’s date change?', 'Was 1900 a leap year?'] }],
    fs: { groups: [['Units', [['Day', 'rotation'], ['Month', '≈ 29.5 d'], ['Year', '≈ 365.24 d']]], ['Calendars', [['Lunar year', '≈ 354 d'], ['Gap', '≈ 11 d/yr'], ['Fix', 'adhika māsa']]], ['Leap', [['Rule', '÷4'], ['Centuries', '÷400 only'], ['Examples', '2000 yes, 1900 no']]]],
      ex: [['6 lunar months', '177 days'], ['5 years drift', '≈ 55 days']], rem: ['Moon for months.', 'Sun for seasons.', 'Leap rule has exceptions.'] }
  });
})();
