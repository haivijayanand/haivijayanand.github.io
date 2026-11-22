/*
TOOL:    class5_maths_ch14
FAMILY:  CBSE_REVISION / Class 5 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 14 Maps and Locations (directions N-E-S-W, grid references, routes, map scale) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const PL = [['🏫 School', 2, 2], ['🏥 Hospital', 7, 3], ['🏞️ Park', 4, 6], ['🛒 Market', 8, 7], ['🚉 Station', 1, 7], ['🏠 Home', 5, 1]];
  G9.register({
    no: 14, part: 'All chapters', short: 'Maps', title: 'Maps and Locations',
    blurb: 'Reading maps: the four directions, grid references, describing routes with directions and steps, and using a scale to find real distances.',
    revise: {
      oneLine: 'Maps usually have North at the top, so East is right, South down, West left. A scale like 1 cm = 100 m turns map lengths into real distances: 4 cm on the map = 400 m. Routes are told as moves: 3 blocks East, then 2 blocks North.',
      sections: [
        { h: 'Directions', html: `<p>N up, S down, E right, W left. Between them: NE, NW, SE, SW.</p>` },
        { h: 'Routes', html: `<p>From Home to Park: 1 block West and 5 blocks North (one way; others are possible).</p>` },
        { h: 'Scale', html: `<p>Real distance = map distance × scale. 1 cm = 2 km: 7.5 cm → 15 km.</p>` }
      ],
      formulas: [['Map top', 'North'], ['Real distance', 'map length × scale'], ['Route', 'blocks E/W + blocks N/S'], ['Opposite of NE', 'SW']],
      terms: [['Scale', 'map length to real length'], ['Grid reference', 'column and row'], ['Route', 'path between places']],
      traps: ['East and West swapped.', 'Forgetting to multiply by the scale.', 'The shortest route is not always the only one.'],
      bridge: '<p>Class 6 social science uses latitude and longitude.</p>'
    },
    explore: [
      { title: 'Town map', intro: 'Choose start and end; the route and its length are shown (1 block = 100 m).',
        build(el, K) { let s = 5, e = 2; const row = K.row(el); K.select(row, 'from', PL.map(p => p[0]), i => { s = i; b.redraw(); }); const s0 = row.querySelector('select'); if (s0) s0.value = 5; K.select(row, 'to', PL.map(p => p[0]), i => { e = i; b.redraw(); }); const s1 = row.querySelectorAll('select')[1]; if (s1) s1.value = 2;
          const b = new K.Board(el, { xmin: -0.6, xmax: 10.2, ymin: -0.6, ymax: 9.2, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); for (let i = 0; i <= 9; i++) { b.line(i, 0, i, 9, { color: C.grid, w: 1 }); b.line(0, i, 9, i, { color: C.grid, w: 1 }); } b.text(9.7, 8.6, 'N ↑', { font: 'bold 14px' }); PL.forEach(([n, x, y]) => b.text(x, y, n.split(' ')[0], { font: '22px' }));
            const [, x1, y1] = PL[s], [, x2, y2] = PL[e]; if (x1 !== x2) b.arrow(x1, y1, x2, y1, { color: C.orange, w: 4 }); if (y1 !== y2) b.arrow(x2, y1, x2, y2, { color: C.blue, w: 4 });
            const dx = x2 - x1, dy = y2 - y1, parts = []; if (dx) parts.push(`${Math.abs(dx)} block${Math.abs(dx) > 1 ? 's' : ''} ${dx > 0 ? 'East' : 'West'}`); if (dy) parts.push(`${Math.abs(dy)} block${Math.abs(dy) > 1 ? 's' : ''} ${dy > 0 ? 'North' : 'South'}`);
            rd.innerHTML = `${PL[s][0]} → ${PL[e][0]}: ${parts.join(', then ') || 'same place'} · ${Math.abs(dx) + Math.abs(dy)} blocks = <b>${(Math.abs(dx) + Math.abs(dy)) * 100} m</b>`; };
          b.redraw(); return null; } },
      { title: 'Map scale', intro: 'Choose the scale and the length measured on the map.',
        build(el, K) { let sc = 2, L = 7.5; const row = K.row(el); K.select(row, 'scale: 1 cm =', ['100 m', '500 m', '1 km', '2 km', '10 km'], i => { sc = [0.1, 0.5, 1, 2, 10][i]; draw(); }); const s0 = row.querySelector('select'); if (s0) s0.value = 3; K.slider(row, 'map length (cm)', 0.5, 12, 0.5, L, v => { L = v; draw(); }); const rd = K.read(el);
          function draw() { const d = L * sc; rd.innerHTML = `<div style="height:14px;width:${L * 40}px;background:var(--blue,#1d4ed8);border-radius:7px;margin:6px 0"></div>${L} cm × ${sc >= 1 ? sc + ' km' : sc * 1000 + ' m'} = <b>${d >= 1 ? +d.toFixed(2) + ' km' : Math.round(d * 1000) + ' m'}</b>`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Direction', gen(R) { const t = R.pick([['the left of the map', 'West'], ['the bottom of the map', 'South'], ['the right of the map', 'East'], ['opposite of North-East', 'South-West'], ['opposite of East', 'West']]); return { q: `Which direction is ${t[0]}?`, a: t[1] }; } },
      { title: 'Scale', gen(R) { const s = R.pick([[100, 'm'], [500, 'm'], [1, 'km'], [5, 'km']]), L = R.int(2, 12); return { q: `Scale 1 cm = ${s[0]} ${s[1]}. A road is ${L} cm on the map. Real length?`, a: `${L * s[0]} ${s[1]}`, ans: L * s[0] }; } },
      { title: 'Route', gen(R) { const x = R.int(-5, 5), y = R.int(-5, 5); if (!x && !y) return { q: 'Start and end are the same place. Route?', a: 'no moves' }; return { q: `The park is ${Math.abs(x)} blocks ${x >= 0 ? 'East' : 'West'} and ${Math.abs(y)} blocks ${y >= 0 ? 'North' : 'South'} of home. How many blocks to walk (along streets)?`, a: String(Math.abs(x) + Math.abs(y)), ans: Math.abs(x) + Math.abs(y) }; } },
      { title: 'Turning', levels: [2, 3], gen(R) { const D = ['North', 'East', 'South', 'West']; const s = R.int(0, 3), t = R.pick([['right', 1], ['left', 3], ['about', 2]]); return { q: `Walking ${D[s]}, you turn ${t[0]}${t[0] === 'about' ? ' (half turn)' : ''}. Which way now?`, a: D[(s + t[1]) % 4] }; } },
      { title: 'Map length from real', levels: [3], gen(R) { const s = R.pick([2, 5, 10]), L = R.int(2, 9); return { q: `Scale 1 cm = ${s} km. Two towns are ${s * L} km apart. Map distance?`, a: `${L} cm`, ans: L }; } }
    ],
    quiz: [
      { q: 'Top of most maps', o: ['North', 'South', 'East', 'West'], a: 0, e: 'Convention.' }, { q: 'Right side of the map', o: ['East', 'West', 'North', 'South'], a: 0, e: 'E right.' },
      { q: 'Scale 1 cm = 100 m; 4 cm', o: ['400 m', '40 m', '4 km', '104 m'], a: 0, e: '4 × 100.' }, { q: 'Opposite of North-West', o: ['South-East', 'North-East', 'South-West', 'East'], a: 0, e: 'Both flip.' },
      { q: 'Facing North, turn right', o: ['East', 'West', 'South', 'North'], a: 0, e: 'Clockwise.' }, { q: '3 blocks E + 2 blocks N =', o: ['5 blocks', '6 blocks', '1 block', '32 blocks'], a: 0, e: 'Add.' },
      { q: 'Scale 1 cm = 2 km; 7.5 cm', o: ['15 km', '9.5 km', '75 km', '1.5 km'], a: 0, e: '× 2.' }, { q: 'A scale tells', o: ['map length to real length', 'the date', 'colours', 'directions'], a: 0, e: 'Ratio.' },
      { q: 'Walking East, turn about', o: ['West', 'North', 'South', 'East'], a: 0, e: 'Half turn.' }, { q: '10 km at 1 cm = 5 km', o: ['2 cm', '50 cm', '5 cm', '15 cm'], a: 0, e: '10 ÷ 5.' },
      { q: 'Left of the map', o: ['West', 'East', 'North', 'South'], a: 0, e: 'W left.' }
    ],
    teach: {
      outcomes: ['Use directions on maps', 'Describe routes', 'Use a map scale'],
      periods: [{ t: 'Directions and routes', flow: [['10 min', 'Sun and directions.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Classroom treasure route.']] }, { t: 'Scale', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Measure on a state map.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['E/W swap.', 'Scale not used.'], activities: ['Draw a school map with scale.', 'Direction Simon-says.'],
      exit: ['Route home → market.', 'Scale 1 cm = 50 m, 6 cm?', 'Turn left from South?'], homework: 'Draw a map from your home to school with a scale and directions.'
    },
    slides: [{ t: 'Maps and Locations', b: ['N, E, S, W', 'Routes on a grid', 'Map scale'] }, { t: 'Check yourself', b: ['Opposite of SE?', '1 cm = 1 km, 12 cm?'] }],
    fs: { groups: [['Directions', [['Up', 'North'], ['Right', 'East'], ['Down', 'South'], ['Left', 'West']]], ['Turns', [['Right', 'clockwise quarter'], ['Left', 'anticlockwise quarter']]], ['Scale', [['Real', 'map × scale'], ['Map', 'real ÷ scale']]]],
      ex: [['1 cm = 100 m, 4 cm', '400 m'], ['Opposite of NE', 'SW']], rem: ['Check the North arrow.', 'Always use the scale.', 'Count blocks along streets.'] }
  });
})();
