/*
TOOL:    class6_science_ch12
FAMILY:  CBSE_REVISION / Class 6 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 12 Beyond Earth (stars, constellations, pole star, solar system, planets, moons, asteroids, comets, Indian space missions) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const PL = [['Mercury', 0.39, 0, 'smallest, closest to the Sun'], ['Venus', 0.72, 0, 'hottest; brightest planet in our sky'], ['Earth', 1, 1, 'our home; one Moon'], ['Mars', 1.52, 2, 'red planet; Mangalyaan studied it'], ['Jupiter', 5.2, 95, 'largest planet'], ['Saturn', 9.5, 146, 'famous rings'], ['Uranus', 19.2, 28, 'spins on its side'], ['Neptune', 30.1, 16, 'farthest, very cold, windy']];
  G9.register({
    no: 12, part: 'All chapters', short: 'Beyond Earth', title: 'Beyond Earth',
    blurb: 'The night sky — stars, constellations (Orion, Ursa Major/Saptarishi), the pole star; the solar system with the Sun, eight planets in order, moons, asteroids and comets; and India’s space missions such as Chandrayaan and Mangalyaan.',
    revise: {
      oneLine: 'Stars are huge balls of hot glowing gas; the Sun is our nearest star. Constellations are star patterns such as Saptarishi (Ursa Major) and Orion; the pole star stays nearly fixed in the north. Eight planets go round the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune. Planets do not make their own light; they reflect sunlight.',
      sections: [
        { h: 'Night sky', html: `<p>Stars seem to move east to west because the Earth spins. Saptarishi’s pointer stars lead to the pole star (Dhruva tara).</p>` },
        { h: 'Solar system', html: `<p>Inner rocky planets: Mercury, Venus, Earth, Mars. Outer giant planets: Jupiter, Saturn, Uranus, Neptune. Asteroid belt between Mars and Jupiter; comets have glowing tails near the Sun.</p>` },
        { h: 'India in space', html: `<p>Aryabhata (first Indian satellite, 1975), Chandrayaan missions to the Moon (Chandrayaan-3 landed near the south pole in 2023), Mangalyaan to Mars (2014), Aditya-L1 to study the Sun.</p>` }
      ],
      formulas: [['Planet order', 'My Very Educated Mother Just Served Us Noodles'], ['Nearest star', 'the Sun'], ['Pole star', 'nearly fixed, north'], ['Planets', 'reflect sunlight']],
      terms: [['Constellation', 'recognisable pattern of stars'], ['Satellite', 'body going round a planet'], ['Asteroid', 'rocky body orbiting the Sun']],
      traps: ['Planets do not twinkle much and are not stars.', 'The Moon has no light of its own.', 'Pluto is now a dwarf planet.'],
      bridge: '<p>Class 8 explores stars and the solar system further.</p>'
    },
    explore: [
      { title: 'Planet explorer', intro: 'Choose a planet: see its distance from the Sun (in Earth–Sun distances, AU) and a fact. <kbd>S</kbd> steps.',
        build(el, K) { let k = 2; const row = K.row(el); const sel = K.select(row, 'planet', PL.map(p => p[0]), i => { k = i; b.redraw(); }); sel.value = 2; const b = new K.Board(el, { xmin: -0.4, xmax: 6.2, ymin: -1, ymax: 1, axes: false, grid: 0, aspect: 0.25 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.circle(0, 0, 0.3, { fill: '#fbbf24', color: C.orange }); PL.forEach((p, i) => { const x = 0.6 + Math.log2(1 + p[1]) * 1.1; b.dot(x, 0, { r: i === k ? 9 : 5, color: i === k ? C.orange : C.blue }); b.text(x, i % 2 ? -0.55 : 0.55, p[0], { font: i === k ? 'bold 12px' : '11px' }); });
            const p = PL[k]; rd.innerHTML = `<b>${p[0]}</b> · ${p[1]} AU from the Sun · ${k < 4 ? 'rocky inner planet' : 'giant outer planet'} · ${p[3]} <span style="opacity:.7">(distances on a compressed scale)</span>`; };
          const step = () => { k = (k + 1) % PL.length; sel.value = k; b.redraw(); }; K.button(row, 'Next (S)', step); b.redraw(); return { step, play() {}, pause() {} }; } },
      { title: 'Finding the pole star', intro: 'Follow Saptarishi’s pointer stars to Dhruva tara. <kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { const S = [[0, 0], [1, 0.1], [1.9, -0.2], [2.6, -0.1], [3.3, 0.3], [3.4, -0.8], [2.6, -0.9]]; const pole = [3.0, 3.6]; const dip = b => { for (let i = 0; i < 6; i++) b.line(S[i][0], S[i][1], S[i + 1][0], S[i + 1][1], { color: C.grey, w: 1 }); b.line(S[6][0], S[6][1], S[3][0], S[3][1], { color: C.grey, w: 1 }); };
          return G9.S9.stages(el, K, { board: { xmin: -0.5, xmax: 5.5, ymin: -1.5, ymax: 4.3, axes: false, grid: 0, aspect: 0.5 },
            stages: [['Saptarishi', 'Seven bright stars shaped like a ladle (Big Dipper).', b => { dip(b); S.forEach(s => b.dot(s[0], s[1], { r: 5, color: C.blue })); }],
              ['Pointer stars', 'The two stars at the end of the bowl are the pointers.', b => { dip(b); S.forEach((s, i) => b.dot(s[0], s[1], { r: i === 4 || i === 5 ? 8 : 5, color: i === 4 || i === 5 ? C.orange : C.blue })); }],
              ['Draw the line', 'Extend the line from the bottom pointer through the top one, about five times their gap.', b => { dip(b); S.forEach(s => b.dot(s[0], s[1], { r: 5, color: C.blue })); b.arrow(3.4, -0.8, pole[0], pole[1], { color: C.orange, w: 2 }); }],
              ['Pole star', 'You reach the pole star — it shows north and seems not to move.', b => { dip(b); S.forEach(s => b.dot(s[0], s[1], { r: 5, color: C.blue })); b.arrow(3.4, -0.8, pole[0], pole[1], { color: C.orange, w: 2 }); b.dot(pole[0], pole[1], { r: 10, color: C.purple }); b.text(pole[0], pole[1] + 0.4, 'Pole star (north)', { font: 'bold 13px' }); }]] }); } }
    ],
    gens: [
      { title: 'Planet order', gen(R) { const i = R.int(0, 7); return R.chance(.5) ? { q: `Which planet is number ${i + 1} from the Sun?`, a: PL[i][0] } : { q: `What is ${PL[i][0]}’s position from the Sun?`, a: String(i + 1), ans: i + 1 }; } },
      { title: 'Planet facts', gen(R) { const p = R.pick(PL); return { q: `Which planet: ${p[3]}?`, a: p[0] }; } },
      { title: 'Sky', gen(R) { return G9.S9.pickQ(R, [['What is a constellation?', 'a pattern of stars'], ['Which star helps find north?', 'the pole star (Dhruva tara)'], ['Why do stars seem to move across the sky?', 'the Earth rotates'], ['Why does the Moon shine?', 'it reflects sunlight']]); } },
      { title: 'Light travel', levels: [2, 3], gen(R) { const p = R.pick(PL.slice(0, 6)); const min = Math.round(p[1] * 8.3 * 10) / 10; return { q: `Sunlight takes about 8.3 minutes to reach Earth (1 AU). About how long to reach ${p[0]} (${p[1]} AU)?`, a: `≈ ${min} minutes`, ans: min, tol: 0.2 }; } },
      { title: 'Space missions', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Which Indian mission went to Mars?', 'Mangalyaan (Mars Orbiter Mission)'], ['Which mission landed near the Moon’s south pole?', 'Chandrayaan-3'], ['Name India’s first satellite.', 'Aryabhata'], ['Which mission studies the Sun?', 'Aditya-L1']]); } }
    ],
    quiz: [
      { q: 'Nearest star', o: ['the Sun', 'pole star', 'Sirius', 'Moon'], a: 0, e: 'Sun.' }, { q: 'Largest planet', o: ['Jupiter', 'Saturn', 'Earth', 'Neptune'], a: 0, e: 'Giant.' },
      { q: 'Closest to the Sun', o: ['Mercury', 'Venus', 'Earth', 'Mars'], a: 0, e: 'First.' }, { q: 'Red planet', o: ['Mars', 'Jupiter', 'Venus', 'Mercury'], a: 0, e: 'Iron oxide.' },
      { q: 'Pole star shows', o: ['north', 'south', 'east', 'west'], a: 0, e: 'North.' }, { q: 'Moon shines by', o: ['reflected sunlight', 'own light', 'fire', 'electricity'], a: 0, e: 'Reflection.' },
      { q: 'Saptarishi is a', o: ['constellation', 'planet', 'comet', 'satellite'], a: 0, e: 'Stars.' }, { q: 'Asteroid belt lies between', o: ['Mars and Jupiter', 'Earth and Mars', 'Venus and Earth', 'Saturn and Uranus'], a: 0, e: 'Belt.' },
      { q: 'Mangalyaan went to', o: ['Mars', 'Moon', 'Sun', 'Venus'], a: 0, e: 'Mangal.' }, { q: 'Number of planets', o: ['8', '9', '7', '10'], a: 0, e: 'Eight.' },
      { q: 'Planet with famous rings', o: ['Saturn', 'Mars', 'Mercury', 'Earth'], a: 0, e: 'Rings.' }
    ],
    teach: {
      outcomes: ['Describe stars and constellations', 'Order the planets', 'Know India’s space missions'],
      periods: [{ t: 'Night sky', flow: [['10 min', 'What did you see last night?'], ['15 min', 'Explore panel 2.'], ['15 min', 'Make a constellation viewer.']] }, { t: 'Solar system', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Human orrery outdoors.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Planets are stars.', 'The Moon makes light.'], activities: ['Pinhole constellation box.', 'Planet order mnemonic.'],
      exit: ['Planet order.', 'Finding the pole star.', 'Two missions.'], homework: 'Observe the night sky for 3 nights and sketch one constellation.'
    },
    slides: [{ t: 'Beyond Earth', b: ['Stars and constellations', 'Pole star', 'Solar system', 'India in space'] }, { t: 'Think and share', b: ['Why does the pole star seem fixed?', 'Inner vs outer planets?'] }],
    fs: { groups: [['Sky', [['Star', 'hot glowing gas'], ['Constellation', 'star pattern'], ['Pole star', 'north']]], ['Solar system', [['Order', 'Me Ve E Ma J S U N'], ['Inner', 'rocky'], ['Outer', 'giant'], ['Belt', 'Mars–Jupiter asteroids']]], ['Missions', [['Aryabhata', '1975'], ['Mangalyaan', 'Mars 2014'], ['Chandrayaan-3', 'Moon 2023'], ['Aditya-L1', 'Sun']]]],
      ex: [['Mars at 1.52 AU', '≈ 12.6 min light'], ['5th planet', 'Jupiter']], rem: ['Planets reflect light.', 'Eight planets.', 'Pole star points north.'] }
  });
})();
