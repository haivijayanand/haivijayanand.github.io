/*
TOOL:    class7_science_ch12
FAMILY:  CBSE_REVISION / Class 7 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 12 Earth, Moon, and the Sun (rotation, revolution, day and night, seasons from tilt, phases of the Moon, eclipses, Indian calendar links) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const PH = ['new moon', 'waxing crescent', 'first quarter', 'waxing gibbous', 'full moon', 'waning gibbous', 'last quarter', 'waning crescent'];
  G9.register({
    no: 12, part: 'All chapters', short: 'Earth, Moon, Sun', title: 'Earth, Moon, and the Sun',
    blurb: 'Rotation of the Earth (day and night, about 24 h) and revolution round the Sun (about 365¼ days); seasons from the tilted axis; the Moon’s phases over about 29.5 days; solar and lunar eclipses; and the Sun’s apparent motion.',
    revise: {
      oneLine: 'The Earth rotates on its tilted axis from west to east once in about 24 hours, giving day and night and making the Sun seem to rise in the east. It revolves round the Sun in about 365¼ days; the tilt (about 23.5°) causes seasons. The Moon reflects sunlight; as it orbits Earth we see phases from new moon to full moon and back in about 29.5 days. A solar eclipse happens when the Moon comes between Sun and Earth; a lunar eclipse when Earth comes between Sun and Moon.',
      sections: [
        { h: 'Seasons', html: `<p>When the northern half tilts towards the Sun, days are longer and sunlight more direct — summer in India. Not because Earth is closer to the Sun.</p>` },
        { h: 'Phases', html: `<p>Half the Moon is always lit; how much of that lit half we see changes. Amavasya = new moon; Purnima = full moon. Many Indian festivals follow the Moon.</p>` },
        { h: 'Eclipses', html: `<p>Solar eclipse only on new moon days; lunar eclipse only on full moon days (but not every month, because the Moon’s orbit is tilted). Never look at the Sun directly.</p>` }
      ],
      formulas: [['Rotation', '≈ 24 h, west to east'], ['Revolution', '≈ 365¼ days'], ['Tilt', '≈ 23.5°'], ['Moon cycle', '≈ 29.5 days'], ['Solar eclipse', 'Sun–Moon–Earth (new moon)'], ['Lunar eclipse', 'Sun–Earth–Moon (full moon)']],
      terms: [['Rotation', 'spinning on an axis'], ['Revolution', 'moving round another body'], ['Eclipse', 'one body blocks light to another']],
      traps: ['Seasons are due to tilt, not distance.', 'The Moon does not make light.', 'Eclipses do not happen every month.'],
      bridge: '<p>Class 8 explores the solar system and stars further.</p>'
    },
    explore: [
      { title: 'Phases of the Moon', intro: 'Move the Moon round the Earth (Sun on the left); see the phase from Earth. <kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { let k = 0; const b = new K.Board(el, { xmin: -5, xmax: 5, ymin: -2.4, ymax: 2.4, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el); const an = new K.Anim(Infinity, i => { k = i % 8; b.redraw(); }, { ms: 900, loop: true });
          b.onDraw = () => { b.clear(); b.text(-4.6, 0, '☀', { font: '28px' }); b.circle(-1.5, 0, 0.35, { fill: C.blue, color: C.ink }); const a = Math.PI + k * Math.PI / 4; const mx = -1.5 + 1.6 * Math.cos(a), my = 1.6 * Math.sin(a); b.circle(-1.5, 0, 1.6, { color: C.grey, w: 1 }); b.circle(mx, my, 0.25, { fill: '#1e1b4b', color: C.ink }); const hp = []; for (let t = 90; t <= 270; t += 10) { const r = t * Math.PI / 180; hp.push([mx + 0.25 * Math.cos(r), my + 0.25 * Math.sin(r)]); } b.poly(hp, { fill: '#fde68a', color: 'none' }); b.text(mx, my + (my >= 0 ? 0.5 : -0.5), 'Moon', { font: '10px' });
            const cx = 3.3, R = 1.1; const lit = (1 - Math.cos(k * Math.PI / 4)) / 2; b.circle(cx, 0, R, { fill: '#1e1b4b', color: C.ink }); const pts = []; const w = Math.cos(k * Math.PI / 4); const side = k <= 4 ? 1 : -1; for (let t = -90; t <= 90; t += 6) { const r = t * Math.PI / 180; pts.push([cx + side * R * Math.cos(r), R * Math.sin(r)]); } for (let t = 90; t >= -90; t -= 6) { const r = t * Math.PI / 180; pts.push([cx + side * w * R * Math.cos(r), R * Math.sin(r)]); } if (k !== 0) b.poly(pts, { fill: '#fde68a', color: 'none' }); b.text(cx, -1.6, PH[k], { font: 'bold 13px' }); b.text(cx, 1.6, 'seen from Earth', { font: '11px' });
            rd.innerHTML = `day ≈ ${Math.round(k * 29.5 / 8)} of 29.5 · <b>${PH[k]}</b> · lit part seen ≈ ${Math.round(lit * 100)}%`; };
          K.anim(el, an); b.redraw(); return an; } },
      { title: 'Eclipses', intro: '<kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { const d = (order) => b => { const X = [-3.5, 0, 3]; const N = { S: ['Sun', '#fbbf24', 0.9], E: ['Earth', C.blue, 0.45], M: ['Moon', '#94a3b8', 0.22] }; order.split('').forEach((c, i) => { b.circle(X[i], 0, N[c][2], { fill: N[c][1], color: C.ink }); b.text(X[i], -1.3, N[c][0], { font: '12px' }); }); b.poly([[X[1], N[order[1]][2]], [X[1], -N[order[1]][2]], [X[2] + 0.8, -0.15], [X[2] + 0.8, 0.15]], { fill: 'rgba(30,27,75,.35)', color: 'none' }); };
          return G9.S9.stages(el, K, { board: { xmin: -5, xmax: 5, ymin: -1.8, ymax: 1.4, axes: false, grid: 0, aspect: 0.4 }, stages: [['Solar eclipse', 'Sun – Moon – Earth in a line: the Moon’s shadow falls on Earth. Only on a new moon day.', d('SME')], ['Lunar eclipse', 'Sun – Earth – Moon in a line: Earth’s shadow falls on the Moon. Only on a full moon day.', d('SEM')], ['Safety', 'Never look at the Sun directly, even during an eclipse — use certified solar viewers or a pinhole projector.']] }); } }
    ],
    gens: [
      { title: 'Rotation or revolution', gen(R) { return G9.S9.groupQ(R, [['day and night', 0], ['seasons (with tilt)', 1], ['Sun rising in the east', 0], ['a year of about 365 days', 1]], ['rotation', 'revolution'], 'Caused by Earth’s '); } },
      { title: 'Phases', gen(R) { const k = R.int(0, 7); return { q: `About ${Math.round(k * 29.5 / 8)} days after a new moon, the phase is roughly?`, a: PH[k] }; } },
      { title: 'Eclipse', gen(R) { return G9.S9.pickQ(R, [['Order of bodies in a solar eclipse?', 'Sun – Moon – Earth'], ['Order in a lunar eclipse?', 'Sun – Earth – Moon'], ['On which day can a solar eclipse occur?', 'new moon (Amavasya)'], ['Why not an eclipse every month?', 'the Moon’s orbit is tilted to Earth’s']]); } },
      { title: 'Time count', levels: [2, 3], gen(R) { const y = R.int(2, 5); return R.chance(.5) ? { q: `About how many days in ${y} years (365¼ days each)?`, a: String(365.25 * y), ans: 365.25 * y } : { q: `About how many full moons in ${y * 59} days (29.5-day cycle)?`, a: String(2 * y), ans: 2 * y }; } },
      { title: 'Seasons', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['What causes seasons?', 'tilt of Earth’s axis as it revolves'], ['Why is it summer in India in June?', 'northern half tilts towards the Sun'], ['Is summer due to Earth being nearer the Sun?', 'no — due to tilt'], ['Earth’s axis tilt?', 'about 23.5°']]); } }
    ],
    quiz: [
      { q: 'Day and night due to', o: ['rotation', 'revolution', 'tilt alone', 'Moon'], a: 0, e: 'Spin.' }, { q: 'Seasons due to', o: ['tilt + revolution', 'distance', 'Moon', 'clouds'], a: 0, e: 'Tilt.' },
      { q: 'Earth rotates', o: ['west to east', 'east to west', 'north to south', 'not at all'], a: 0, e: 'Sun rises east.' }, { q: 'Moon cycle', o: ['≈ 29.5 days', '7 days', '365 days', '24 h'], a: 0, e: 'Month.' },
      { q: 'Solar eclipse order', o: ['Sun–Moon–Earth', 'Sun–Earth–Moon', 'Moon–Sun–Earth', 'any'], a: 0, e: 'Moon blocks Sun.' }, { q: 'Lunar eclipse on', o: ['full moon', 'new moon', 'any day', 'quarter moon'], a: 0, e: 'Full.' },
      { q: 'Amavasya is', o: ['new moon', 'full moon', 'half moon', 'eclipse always'], a: 0, e: 'Dark.' }, { q: 'Revolution takes', o: ['≈ 365¼ days', '24 h', '29.5 days', '7 days'], a: 0, e: 'Year.' },
      { q: 'Moon shines by', o: ['reflected sunlight', 'own light', 'Earth light only', 'fire'], a: 0, e: 'Reflects.' }, { q: 'Earth’s tilt', o: ['≈ 23.5°', '90°', '0°', '45°'], a: 0, e: 'Tilt.' },
      { q: 'Viewing a solar eclipse', o: ['use solar viewer or pinhole', 'stare directly', 'sunglasses enough', 'binoculars'], a: 0, e: 'Safety.' }
    ],
    teach: {
      outcomes: ['Explain day–night and seasons', 'Describe Moon phases', 'Explain eclipses'],
      periods: [{ t: 'Earth’s motions', flow: [['10 min', 'Torch and globe.'], ['15 min', 'Tilt and seasons demo.'], ['15 min', 'Shadow stick through the day.']] }, { t: 'Moon', flow: [['15 min', 'Explore panel 1 / ball and lamp.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Seasons from distance.', 'Earth’s shadow causes phases.'], activities: ['Moon diary for a month.', 'Ball–lamp phases.'],
      exit: ['Rotation vs revolution.', 'Phase order.', 'Eclipse order.'], homework: 'Observe and sketch the Moon for 7 evenings; label the phases.'
    },
    slides: [{ t: 'Earth, Moon, and the Sun', b: ['Rotation and revolution', 'Seasons', 'Moon phases', 'Eclipses'] }, { t: 'Think and share', b: ['Why summer in June?', 'Why no eclipse every month?'] }],
    fs: { groups: [['Earth', [['Rotation', '24 h, W→E'], ['Revolution', '365¼ d'], ['Tilt', '23.5° → seasons']]], ['Moon', [['Cycle', '29.5 d'], ['New moon', 'Amavasya'], ['Full moon', 'Purnima']]], ['Eclipses', [['Solar', 'S–M–E, new moon'], ['Lunar', 'S–E–M, full moon'], ['Safety', 'never stare at Sun']]]],
      ex: [['3 years', '≈ 1096 days'], ['118 days', '≈ 4 lunar cycles']], rem: ['Tilt makes seasons.', 'Half the Moon is always lit.', 'Eclipse order matters.'] }
  });
})();
