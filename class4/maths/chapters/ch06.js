/*
TOOL:    class4_maths_ch06
FAMILY:  CBSE_REVISION / Class 4 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 6 Measuring Length (mm, cm, m, km; reading a ruler; converting and estimating) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 6, part: 'All chapters', short: 'Length', title: 'Measuring Length',
    blurb: 'Measuring with a ruler in centimetres and millimetres, metres for rooms and cloth, kilometres for journeys; converting units and estimating lengths.',
    revise: {
      oneLine: '1 cm = 10 mm, 1 m = 100 cm, 1 km = 1000 m. Put the object at 0 on the ruler and read where it ends. Small things in cm or mm, rooms in m, distances between places in km.',
      sections: [
        { h: 'Ruler', html: `<p>Start at 0, not at the edge. A pencil ending 3 small marks after 12 is 12 cm 3 mm = 123 mm.</p>` },
        { h: 'Converting', html: `<p>2 m 35 cm = 235 cm. 3 km 400 m = 3400 m. 4500 m = 4 km 500 m.</p>` },
        { h: 'Estimating', html: `<p>Your hand span is about 15 cm; one big step about 1 m.</p>` }
      ],
      formulas: [['1 cm', '10 mm'], ['1 m', '100 cm'], ['1 km', '1000 m'], ['Big → small', 'multiply'], ['Small → big', 'divide']],
      terms: [['Length', 'how long'], ['Distance', 'how far'], ['Estimate', 'sensible guess']],
      traps: ['Measuring from the end of the ruler instead of 0.', '2 m 5 cm is 205 cm, not 25 cm.', 'Choosing km for a pencil.'],
      bridge: '<p>Class 5 uses perimeter and area of shapes.</p>'
    },
    explore: [
      { title: 'Read the ruler', intro: 'Move the pencil length (in mm). Read cm and mm.',
        build(el, K) { let L = 123; const row = K.row(el); K.slider(row, 'pencil (mm)', 20, 150, 1, L, v => { L = v; b.redraw(); }); const b = new K.Board(el, { xmin: -0.8, xmax: 15.8, ymin: -1.2, ymax: 2.2, axes: false, grid: 0, aspect: 0.22 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.rect(0, -1, 15.5, 1, { fill: '#fef3c7', color: C.yellow, w: 2 }); for (let m = 0; m <= 150; m++) { const x = m / 10, h = m % 10 ? (m % 5 ? 0.25 : 0.4) : 0.6; b.line(x, 0, x, -h, { color: C.ink, w: m % 10 ? 1 : 2 }); if (m % 10 === 0) b.text(x, -0.82, String(m / 10), { font: '11px' }); }
            b.rect(0, 0.3, L / 10 - 0.6, 0.6, { fill: 'rgba(234,88,12,.7)', color: C.orange, w: 2 }); b.poly([[L / 10 - 0.6, 0.3], [L / 10, 0.6], [L / 10 - 0.6, 0.9]], { fill: '#fde68a', color: C.orange, w: 2 }); b.line(L / 10, 0.6, L / 10, -0.6, { color: C.blue, w: 2, dash: [4, 3] });
            rd.innerHTML = `pencil = <b>${Math.floor(L / 10)} cm ${L % 10} mm</b> = ${L} mm`; };
          b.redraw(); return null; } },
      { title: 'Metres and kilometres', intro: 'Set the walk to school in metres.',
        build(el, K) { let m = 2350; const row = K.row(el); K.slider(row, 'distance (m)', 100, 9000, 50, m, v => { m = v; b.redraw(); }); const b = new K.Board(el, { xmin: -0.5, xmax: 9.5, ymin: -1, ymax: 1.2, axes: false, grid: 0, aspect: 0.22 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.line(0, 0, 9, 0, { color: C.grey, w: 2 }); for (let k = 0; k <= 9; k++) { b.line(k, -0.15, k, 0.15, { color: C.ink, w: 2 }); b.text(k, -0.55, k + ' km', { font: '11px' }); } b.line(0, 0, m / 1000, 0, { color: C.blue, w: 6 }); b.text(0, 0.6, '🏠', { font: '20px' }); b.text(m / 1000, 0.6, '🏫', { font: '20px' });
            rd.innerHTML = `${m} m = <b>${Math.floor(m / 1000)} km ${m % 1000} m</b> · about ${Math.round(m / 1000 * 12)} minutes walking (about 1 km in 12 min)`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'cm and mm', gen(R) { const c = R.int(2, 20), mm = R.int(1, 9); return R.chance(.5) ? { q: `${c} cm ${mm} mm = ? mm`, a: `${c * 10 + mm} mm`, ans: c * 10 + mm } : { q: `${c * 10 + mm} mm = ? cm ? mm`, a: `${c} cm ${mm} mm` }; } },
      { title: 'm and cm', gen(R) { const m = R.int(1, 9), c = R.int(1, 99); return R.chance(.5) ? { q: `${m} m ${c} cm = ? cm`, a: `${m * 100 + c} cm`, ans: m * 100 + c } : { q: `${m * 100 + c} cm = ? m ? cm`, a: `${m} m ${c} cm` }; } },
      { title: 'km and m', gen(R) { const k = R.int(1, 9), m = R.int(1, 999); return R.chance(.5) ? { q: `${k} km ${m} m = ? m`, a: `${k * 1000 + m} m`, ans: k * 1000 + m } : { q: `${k * 1000 + m} m = ? km ? m`, a: `${k} km ${m} m` }; } },
      { title: 'Choose the unit', levels: [1, 2], gen(R) { const t = R.pick([['an ant', 'mm'], ['a notebook', 'cm'], ['a classroom', 'm'], ['Delhi to Agra', 'km'], ['a saree', 'm'], ['a fingernail', 'mm']]); return { q: `Which unit to measure ${t[0]}?`, a: t[1] }; } },
      { title: 'Add lengths', levels: [3], gen(R) { const a = R.int(1, 5), b = R.int(10, 90), c = R.int(1, 4), d = R.int(10, 90); const t = (a + c) * 100 + b + d; return { q: `A ribbon ${a} m ${b} cm is joined to one ${c} m ${d} cm. Total length?`, a: `${Math.floor(t / 100)} m ${t % 100} cm`, ans: t / 100, tol: 0.001 }; } }
    ],
    quiz: [
      { q: '1 cm =', o: ['10 mm', '100 mm', '1 mm', '1000 mm'], a: 0, e: 'Ten.' }, { q: '1 km =', o: ['1000 m', '100 m', '10 m', '10 000 m'], a: 0, e: 'Thousand.' },
      { q: '2 m 5 cm =', o: ['205 cm', '25 cm', '250 cm', '2005 cm'], a: 0, e: '200 + 5.' }, { q: 'Measure from', o: ['0 on the ruler', 'the ruler edge', '1', 'anywhere'], a: 0, e: 'Zero mark.' },
      { q: 'Unit for a road trip', o: ['km', 'mm', 'cm', 'g'], a: 0, e: 'Long.' }, { q: '4500 m =', o: ['4 km 500 m', '45 km', '4 km 50 m', '450 km'], a: 0, e: '÷ 1000.' },
      { q: '87 mm =', o: ['8 cm 7 mm', '87 cm', '0 cm 87 mm', '8 m 7 cm'], a: 0, e: '80 + 7.' }, { q: 'A big step is about', o: ['1 m', '1 km', '1 cm', '1 mm'], a: 0, e: 'Estimate.' },
      { q: '3 m =', o: ['300 cm', '30 cm', '3000 cm', '3 cm'], a: 0, e: '× 100.' }, { q: 'A classroom is measured in', o: ['m', 'km', 'mm', 'L'], a: 0, e: 'Metres.' },
      { q: '1 m 50 cm + 50 cm', o: ['2 m', '1 m 100 cm only', '1 m', '2 m 50 cm'], a: 0, e: '100 cm = 1 m.' }
    ],
    teach: {
      outcomes: ['Measure with a ruler to the mm', 'Convert mm, cm, m, km', 'Estimate and choose units'],
      periods: [{ t: 'Ruler', flow: [['10 min', 'Measure pencils and erasers.'], ['15 min', 'Explore panel 1.'], ['15 min', 'cm and mm.']] }, { t: 'm and km', flow: [['15 min', 'Measure the corridor with a metre tape.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Edge of ruler as zero.', '2 m 5 cm = 25 cm.'], activities: ['Estimate-then-measure challenge.', 'School-to-home distance chart.'],
      exit: ['14 cm 6 mm in mm.', '3 km 20 m in m.', 'Unit for a bus route.'], homework: 'Measure 5 things at home; estimate first, then measure; write both.'
    },
    slides: [{ t: 'Measuring Length', b: ['Ruler: cm and mm', 'm and km', 'Converting', 'Estimating'] }, { t: 'Check yourself', b: ['6 m 8 cm in cm?', '7250 m in km and m?'] }],
    fs: { groups: [['Units', [['1 cm', '10 mm'], ['1 m', '100 cm'], ['1 km', '1000 m']]], ['Converting', [['Big → small', '×'], ['Small → big', '÷'], ['2 m 5 cm', '205 cm']]], ['Choose', [['tiny', 'mm'], ['small', 'cm'], ['rooms', 'm'], ['journeys', 'km']]]],
      ex: [['3 km 75 m', '3075 m'], ['146 mm', '14 cm 6 mm']], rem: ['Start at 0.', 'Fill empty places with zeros.', 'Estimate first.'] }
  });
})();
