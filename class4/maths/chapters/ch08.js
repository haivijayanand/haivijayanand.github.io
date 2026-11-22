/*
TOOL:    class4_maths_ch08
FAMILY:  CBSE_REVISION / Class 4 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 8 Weigh it, Pour it (kg and g, L and mL; reading scales and jugs; converting and adding measures) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 8, part: 'All chapters', short: 'Weight and capacity', title: 'Weigh it, Pour it',
    blurb: 'Weighing in kilograms and grams, measuring liquids in litres and millilitres, reading a weighing scale and a measuring jug, converting and adding measures.',
    revise: {
      oneLine: '1 kg = 1000 g and 1 L = 1000 mL. Read a dial scale by counting what each small mark is worth. 2 kg 350 g = 2350 g; 1 L 250 mL + 750 mL = 2 L.',
      sections: [
        { h: 'Weight', html: `<p>Half a kilogram = 500 g; a quarter kilogram = 250 g. Heavier things: kg; light things: g.</p>` },
        { h: 'Capacity', html: `<p>Half a litre = 500 mL. A jug marked every 100 mL; read at the water level.</p>` },
        { h: 'Adding measures', html: `<p>1 kg 700 g + 600 g = 1 kg 1300 g = 2 kg 300 g.</p>` }
      ],
      formulas: [['1 kg', '1000 g'], ['1 L', '1000 mL'], ['½ kg / ¼ kg', '500 g / 250 g'], ['½ L / ¼ L', '500 mL / 250 mL']],
      terms: [['Weight', 'how heavy'], ['Capacity', 'how much it holds'], ['Scale', 'marks for reading']],
      traps: ['2 kg 50 g is 2050 g, not 250 g.', 'Reading the scale mark value wrongly.', 'Mixing kg and g when adding.'],
      bridge: '<p>Class 5 uses these in money and recipe problems.</p>'
    },
    explore: [
      { title: 'Dial scale', intro: 'Put a load on the pan; the needle shows the weight (one round = 5 kg).',
        build(el, K) { let g = 2350; const row = K.row(el); K.slider(row, 'load (g)', 0, 5000, 50, g, v => { g = v; b.redraw(); }); const b = new K.Board(el, { xmin: -1.5, xmax: 1.5, ymin: -1.4, ymax: 1.4, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.circle(0, 0, 1.2, { fill: '#fff', color: C.ink, w: 4 }); for (let i = 0; i < 50; i++) { const a = Math.PI / 2 - i * 2 * Math.PI / 50, r1 = i % 10 ? (i % 5 ? 1.08 : 1.0) : 0.95; b.line(r1 * Math.cos(a), r1 * Math.sin(a), 1.15 * Math.cos(a), 1.15 * Math.sin(a), { color: C.ink, w: i % 10 ? 1 : 2 }); if (i % 10 === 0) b.text(0.8 * Math.cos(a), 0.8 * Math.sin(a), (i / 10) + ' kg', { font: 'bold 12px' }); }
            const a = Math.PI / 2 - g / 5000 * 2 * Math.PI; b.line(0, 0, 1.0 * Math.cos(a), 1.0 * Math.sin(a), { color: C.orange, w: 4 }); b.dot(0, 0, { r: 6 });
            rd.innerHTML = `each small mark = 100 g · reading <b>${Math.floor(g / 1000)} kg ${g % 1000} g</b> = ${g} g`; };
          b.redraw(); return null; } },
      { title: 'Measuring jug', intro: 'Pour two amounts into a 2 L jug.',
        build(el, K) { let x = 750, y = 600; const row = K.row(el); K.slider(row, 'first pour (mL)', 0, 1000, 50, x, v => { x = v; b.redraw(); }); K.slider(row, 'second pour (mL)', 0, 1000, 50, y, v => { y = v; b.redraw(); }); const b = new K.Board(el, { xmin: -2, xmax: 3, ymin: -0.2, ymax: 2.3, axes: false, grid: 0 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.rect(0, 0, 1.2, x / 1000, { fill: 'rgba(29,78,216,.45)', color: 'none' }); b.rect(0, x / 1000, 1.2, y / 1000, { fill: 'rgba(124,58,237,.4)', color: 'none' }); b.poly([[0, 2.05], [0, 0], [1.2, 0], [1.2, 2.05]], { close: false, color: C.ink, w: 3 });
            for (let m = 100; m <= 2000; m += 100) { b.line(1.2, m / 1000, m % 500 ? 1.05 : 0.95, m / 1000, { color: C.ink, w: 1.5 }); if (m % 500 === 0) b.text(1.6, m / 1000, m + ' mL', { font: '11px', align: 'left' }); }
            const t = x + y; rd.innerHTML = `${x} mL + ${y} mL = <b>${t} mL</b> = ${Math.floor(t / 1000)} L ${t % 1000} mL`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'kg and g', gen(R) { const k = R.int(1, 9), g = R.int(1, 99) * 10; return R.chance(.5) ? { q: `${k} kg ${g} g = ? g`, a: `${k * 1000 + g} g`, ans: k * 1000 + g } : { q: `${k * 1000 + g} g = ? kg ? g`, a: `${k} kg ${g} g` }; } },
      { title: 'L and mL', gen(R) { const k = R.int(1, 9), m = R.int(1, 99) * 10; return R.chance(.5) ? { q: `${k} L ${m} mL = ? mL`, a: `${k * 1000 + m} mL`, ans: k * 1000 + m } : { q: `${k * 1000 + m} mL = ? L ? mL`, a: `${k} L ${m} mL` }; } },
      { title: 'Add weights', levels: [2, 3], gen(R) { const a = R.int(1, 4) * 1000 + R.int(1, 9) * 100, b = R.int(1, 9) * 100 + R.int(0, 9) * 10; const t = a + b; return { q: `${Math.floor(a / 1000)} kg ${a % 1000} g + ${b} g = ?`, a: `${Math.floor(t / 1000)} kg ${t % 1000} g`, ans: t / 1000, tol: 0.001 }; } },
      { title: 'How many fill?', gen(R) { const c = R.pick([100, 200, 250, 500]), L = R.int(1, 3); return { q: `How many ${c} mL glasses fill a ${L} L bottle?`, a: String(L * 1000 / c), ans: L * 1000 / c }; } },
      { title: 'Half and quarter', levels: [1, 2], gen(R) { const t = R.pick([['half a kilogram', '500 g'], ['a quarter kilogram', '250 g'], ['three quarters of a kilogram', '750 g'], ['half a litre', '500 mL'], ['a quarter litre', '250 mL']]); return { q: `${t[0][0].toUpperCase() + t[0].slice(1)} = ?`, a: t[1] }; } }
    ],
    quiz: [
      { q: '1 kg =', o: ['1000 g', '100 g', '10 g', '500 g'], a: 0, e: 'Thousand.' }, { q: '2 kg 50 g =', o: ['2050 g', '250 g', '2500 g', '2005 g'], a: 0, e: 'Zero in hundreds.' },
      { q: 'Half a litre', o: ['500 mL', '50 mL', '250 mL', '5 L'], a: 0, e: '1000 ÷ 2.' }, { q: '1 L 250 mL + 750 mL', o: ['2 L', '1 L 1000', '1 L 900 mL', '3 L'], a: 0, e: '1000 mL = 1 L.' },
      { q: '250 mL glasses in 1 L', o: ['4', '2', '5', '250'], a: 0, e: '1000 ÷ 250.' }, { q: 'A quarter kg', o: ['250 g', '25 g', '400 g', '500 g'], a: 0, e: '1000 ÷ 4.' },
      { q: '3500 g =', o: ['3 kg 500 g', '35 kg', '3 kg 50 g', '350 kg'], a: 0, e: '÷ 1000.' }, { q: 'Unit for a tablespoon of oil', o: ['mL', 'L', 'kg', 'km'], a: 0, e: 'Small amount.' },
      { q: '1 kg 700 g + 600 g', o: ['2 kg 300 g', '1 kg 1300 g only', '2 kg 700 g', '1 kg 300 g'], a: 0, e: 'Regroup.' }, { q: 'Heavier: 1 kg cotton or 1 kg iron?', o: ['same', 'iron', 'cotton', 'cannot tell'], a: 0, e: 'Both 1 kg.' },
      { q: '5 L =', o: ['5000 mL', '500 mL', '50 mL', '50 000 mL'], a: 0, e: '× 1000.' }
    ],
    teach: {
      outcomes: ['Read scales and jugs', 'Convert kg-g and L-mL', 'Add measures with regrouping'],
      periods: [{ t: 'Weigh it', flow: [['10 min', 'Kitchen scale readings.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Convert and add.']] }, { t: 'Pour it', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Water station with jugs.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['2 kg 50 g = 250 g.', 'Mark value misread.'], activities: ['Packet label hunt.', 'Make 1 L with different cups.'],
      exit: ['4 kg 75 g in g.', 'Glasses of 200 mL in 2 L.', '1 L 600 mL + 700 mL.'], homework: 'Read the weights and volumes on 6 packets at home and order them from lightest to heaviest.'
    },
    slides: [{ t: 'Weigh it, Pour it', b: ['kg and g', 'L and mL', 'Reading scales', 'Adding measures'] }, { t: 'Check yourself', b: ['3 kg 5 g in g?', '¾ L in mL?'] }],
    fs: { groups: [['Weight', [['1 kg', '1000 g'], ['½ kg', '500 g'], ['¼ kg', '250 g']]], ['Capacity', [['1 L', '1000 mL'], ['½ L', '500 mL'], ['¼ L', '250 mL']]], ['Adding', [['1 kg 700 g + 600 g', '2 kg 300 g']]]],
      ex: [['2 kg 50 g', '2050 g'], ['4500 mL', '4 L 500 mL']], rem: ['Find the value of one mark.', 'Zeros hold places.', '1000 small = 1 big.'] }
  });
})();
