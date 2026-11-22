/*
TOOL:    class5_maths_ch08
FAMILY:  CBSE_REVISION / Class 5 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 8 Weight and Capacity (g, kg, mL, L; converting, comparing, adding; volume by counting cubes) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 8, part: 'All chapters', short: 'Weight, capacity, volume', title: 'Weight and Capacity',
    blurb: 'Grams and kilograms, millilitres and litres: converting, comparing, adding and subtracting; per-item weights; volume as the number of unit cubes that fill a box.',
    revise: {
      oneLine: '1 kg = 1000 g; 1 L = 1000 mL. 3 kg 250 g = 3250 g. A 2 L bottle fills eight 250 mL glasses. Volume is how much space a solid takes: a box 4 cubes long, 3 wide and 2 high holds 4 × 3 × 2 = 24 cubes.',
      sections: [
        { h: 'Converting', html: `<p>kg → g: × 1000. mL → L: ÷ 1000. 4500 mL = 4 L 500 mL.</p>` },
        { h: 'Per item', html: `<p>12 apples weigh 1 kg 800 g = 1800 g → each about 150 g.</p>` },
        { h: 'Volume', html: `<p>Count unit cubes: length × width × height.</p>` }
      ],
      formulas: [['1 kg', '1000 g'], ['1 L', '1000 mL'], ['Glasses in a bottle', 'bottle ÷ glass'], ['Volume of a box', 'l × w × h cubes']],
      terms: [['Capacity', 'how much a container holds'], ['Weight', 'how heavy'], ['Volume', 'space a solid fills']],
      traps: ['3 kg 25 g = 3025 g.', 'Mixing units before adding.', 'Counting only the visible cubes.'],
      bridge: '<p>Class 6 measures volume in cm³.</p>'
    },
    explore: [
      { title: 'Fill the bottle', intro: 'Choose bottle and glass sizes.',
        build(el, K) { let B = 2000, g = 250; const row = K.row(el); K.select(row, 'bottle', ['500 mL', '1 L', '2 L', '5 L'], i => { B = [500, 1000, 2000, 5000][i]; draw(); }); const s0 = row.querySelector('select'); if (s0) s0.value = 2; K.select(row, 'glass', ['100 mL', '200 mL', '250 mL', '500 mL'], i => { g = [100, 200, 250, 500][i]; draw(); }); const s1 = row.querySelectorAll('select')[1]; if (s1) s1.value = 2; const rd = K.read(el);
          function draw() { const k = Math.floor(B / g), r = B % g; rd.innerHTML = `<div style="font-size:22px">🍼 → ${'🥛'.repeat(Math.min(k, 30))}${k > 30 ? '…' : ''}</div>${B} mL ÷ ${g} mL = <b>${k}</b> glasses${r ? `, ${r} mL left` : ''}`; } draw(); return null; } },
      { title: 'Volume by cubes', intro: 'Set length, width and height; press <kbd>S</kbd> to stack a layer.',
        build(el, K) { let L = 4, W = 3, H = 2; const row = K.row(el); K.slider(row, 'length', 1, 6, 1, L, v => { L = v; an.reset(); }); K.slider(row, 'width', 1, 4, 1, W, v => { W = v; an.reset(); }); K.slider(row, 'height', 1, 4, 1, H, v => { H = v; an.reset(); });
          const b = new K.Board(el, { xmin: -1, xmax: 10, ymin: -1, ymax: 7.5, axes: false, grid: 0, equal: true }); const rd = K.read(el); const an = new K.Anim(4, () => b.redraw(), { ms: 700 }); const P = (x, y, z) => [x + 0.5 * y, z + 0.4 * y];
          b.onDraw = () => { b.clear(); const h = Math.min(H, Math.max(1, an.i)); for (let z = 0; z < h; z++) for (let y = W - 1; y >= 0; y--) for (let x = 0; x < L; x++) { const f = [P(x, y, z + 1), P(x + 1, y, z + 1), P(x + 1, y + 1, z + 1), P(x, y + 1, z + 1)], s = [P(x, y, z), P(x + 1, y, z), P(x + 1, y, z + 1), P(x, y, z + 1)], r = [P(x + 1, y, z), P(x + 1, y + 1, z), P(x + 1, y + 1, z + 1), P(x + 1, y, z + 1)]; b.poly(s, { fill: '#93c5fd', color: C.ink, w: 1 }); b.poly(r, { fill: '#60a5fa', color: C.ink, w: 1 }); b.poly(f, { fill: '#dbeafe', color: C.ink, w: 1 }); }
            rd.innerHTML = `${h} layer${h === 1 ? '' : 's'} of ${L} × ${W} = ${L * W} cubes → ${L * W * h} cubes${h === H ? ` · volume = ${L} × ${W} × ${H} = <b>${L * W * H} cubes</b>` : ''}`; };
          K.anim(el, an); b.redraw(); return an; } }
    ],
    gens: [
      { title: 'kg and g', gen(R) { const k = R.int(1, 9), g = R.int(5, 995); return R.chance(.5) ? { q: `${k} kg ${g} g = ? g`, a: `${k * 1000 + g} g`, ans: k * 1000 + g } : { q: `${k * 1000 + g} g = ? kg ? g`, a: `${k} kg ${g} g` }; } },
      { title: 'L and mL', gen(R) { const k = R.int(1, 9), m = R.int(5, 995); return R.chance(.5) ? { q: `${k} L ${m} mL = ? mL`, a: `${k * 1000 + m} mL`, ans: k * 1000 + m } : { q: `${k * 1000 + m} mL = ? L ? mL`, a: `${k} L ${m} mL` }; } },
      { title: 'Glasses', gen(R) { const g = R.pick([100, 125, 200, 250, 500]), L = R.int(1, 5); return { q: `How many ${g} mL glasses can be filled from ${L} L?`, a: String(L * 1000 / g), ans: L * 1000 / g }; } },
      { title: 'Per item', levels: [2, 3], gen(R) { const each = R.pick([50, 75, 120, 150, 200, 250]), n = R.int(4, 12); return { q: `${n} identical packets weigh ${Math.floor(n * each / 1000)} kg ${n * each % 1000} g together. Weight of one?`, a: `${each} g`, ans: each }; } },
      { title: 'Volume', gen(R) { const l = R.int(2, 8), w = R.int(2, 5), h = R.int(1, 5); return { q: `A box is ${l} cubes long, ${w} wide and ${h} high. How many cubes fill it?`, a: String(l * w * h), ans: l * w * h }; } }
    ],
    quiz: [
      { q: '3 kg 250 g =', o: ['3250 g', '325 g', '3025 g', '32 500 g'], a: 0, e: '3000 + 250.' }, { q: '4500 mL =', o: ['4 L 500 mL', '45 L', '4 L 50 mL', '450 L'], a: 0, e: '÷ 1000.' },
      { q: '250 mL glasses in 2 L', o: ['8', '4', '6', '10'], a: 0, e: '2000 ÷ 250.' }, { q: 'Box 4 × 3 × 2 cubes', o: ['24', '9', '12', '20'], a: 0, e: 'Multiply.' },
      { q: '3 kg 25 g =', o: ['3025 g', '325 g', '3250 g', '30 025 g'], a: 0, e: 'Zero.' }, { q: 'Capacity means', o: ['how much it holds', 'how heavy', 'how long', 'how hot'], a: 0, e: 'Holds.' },
      { q: '12 apples weigh 1800 g; one', o: ['150 g', '180 g', '120 g', '15 g'], a: 0, e: '1800 ÷ 12.' }, { q: '1 L 600 mL + 900 mL', o: ['2 L 500 mL', '1 L 1500 mL only', '2 L 600 mL', '3 L'], a: 0, e: 'Regroup.' },
      { q: 'Volume is', o: ['space a solid fills', 'weight', 'surface only', 'length'], a: 0, e: 'Space.' }, { q: '½ kg + 750 g', o: ['1 kg 250 g', '1 kg 750 g', '1250 kg', '800 g'], a: 0, e: '500 + 750.' },
      { q: 'Heavier: 1 kg 50 g or 1050 g?', o: ['same', '1 kg 50 g', '1050 g', 'cannot tell'], a: 0, e: 'Equal.' }
    ],
    teach: {
      outcomes: ['Convert and compute with g, kg, mL, L', 'Find per-item weights', 'Find volume by counting cubes'],
      periods: [{ t: 'Weight and capacity', flow: [['10 min', 'Kitchen labels.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Conversions.']] }, { t: 'Volume', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Build boxes with cubes.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Zeros dropped.', 'Hidden cubes missed.'], activities: ['Cube building.', 'Water-pouring station.'],
      exit: ['7 kg 7 g in g.', '125 mL cups in 1 L.', 'Volume 5 × 4 × 3.'], homework: 'Find 5 containers at home, read their capacity and order them.'
    },
    slides: [{ t: 'Weight and Capacity', b: ['kg and g', 'L and mL', 'Per item', 'Volume by cubes'] }, { t: 'Check yourself', b: ['6 kg 60 g in g?', 'Cubes in 3 × 3 × 3?'] }],
    fs: { groups: [['Units', [['1 kg', '1000 g'], ['1 L', '1000 mL'], ['3 kg 25 g', '3025 g']]], ['Problems', [['Glasses', 'bottle ÷ glass'], ['Per item', 'total ÷ number']]], ['Volume', [['Box', 'l × w × h cubes']]]],
      ex: [['2 L ÷ 250 mL', '8'], ['4 × 3 × 2', '24 cubes']], rem: ['Same units before adding.', 'Zeros hold places.', 'Count hidden cubes.'] }
  });
})();
