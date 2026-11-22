/*
TOOL:    class6_maths_ch06
FAMILY:  CBSE_REVISION / Class 6 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 6 Perimeter and Area (perimeter of rectangles, squares, triangles, regular polygons; area of rectangles, squares and triangles; split figures) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 6, part: 'All chapters', short: 'Perimeter and area', title: 'Perimeter and Area',
    blurb: 'Perimeter as the length of the boundary (rectangles, squares, triangles, regular polygons, tracks), area as the space covered (rectangles, squares, triangles as half rectangles), and figures with equal area but different perimeter.',
    revise: {
      oneLine: 'Perimeter: rectangle 2(l + b), square 4s, triangle a + b + c, regular n-gon n × side. Area: rectangle l × b, square s², a triangle in a rectangle with the same base and height is half the rectangle.',
      sections: [
        { h: 'Perimeter', html: `<p>A 12 m × 8 m park: 2 × 20 = 40 m. Running 3 rounds = 120 m.</p>` },
        { h: 'Area', html: `<p>Rectangle 12 × 8 = 96 sq m. Triangle with base 12 and height 8 inside it = 48 sq m.</p>` },
        { h: 'Area vs perimeter', html: `<p>Same area can have different perimeters (36 = 6 × 6 = 9 × 4 = 12 × 3), and vice versa.</p>` }
      ],
      formulas: [['Rectangle perimeter', '2(l + b)'], ['Square perimeter', '4s'], ['Rectangle area', 'l × b'], ['Square area', 's²'], ['Triangle area', '½ × base × height']],
      terms: [['Perimeter', 'boundary length'], ['Area', 'region covered'], ['Square unit', 'sq cm, sq m']],
      traps: ['Area in units instead of square units.', 'Using a slant side as height.', 'Same area ⇒ same perimeter (false).'],
      bridge: '<p>Class 7 finds areas of parallelograms and circles.</p>'
    },
    explore: [
      { title: 'Rectangle and its triangle', intro: 'Set length and breadth; drag the triangle top along the side.',
        build(el, K) { let L = 8, B = 5, p = 3; const row = K.row(el); K.slider(row, 'length', 2, 12, 1, L, v => { L = v; p = Math.min(p, L); b.redraw(); }); K.slider(row, 'breadth', 2, 8, 1, B, v => { B = v; b.redraw(); }); K.slider(row, 'top point', 0, 12, 1, p, v => { p = Math.min(v, L); b.redraw(); });
          const b = new K.Board(el, { xmin: -0.5, xmax: 12.5, ymin: -0.8, ymax: 8.5, axes: false, grid: 1, equal: true }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); for (let x = 0; x <= 12; x++) b.line(x, 0, x, 8, { color: C.grid, w: 0.7 }); for (let y = 0; y <= 8; y++) b.line(0, y, 12, y, { color: C.grid, w: 0.7 }); b.rect(0, 0, L, B, { fill: C.blueL, color: C.blue, w: 3 }); b.poly([[0, 0], [L, 0], [p, B]], { fill: C.orangeL, color: C.orange, w: 3 }); b.line(p, 0, p, B, { color: C.purple, w: 2, dash: [5, 4] });
            rd.innerHTML = `rectangle: area ${L} × ${B} = <b>${L * B}</b> sq units, perimeter 2(${L} + ${B}) = <b>${2 * (L + B)}</b> · triangle: ½ × ${L} × ${B} = <b>${L * B / 2}</b> sq units (same wherever the top point is)`; };
          b.redraw(); return null; } },
      { title: 'Same area, different perimeter', intro: 'All rectangles with area 36 (whole-number sides). Press <kbd>S</kbd> for the next.',
        build(el, K) { const D = [[36, 1], [18, 2], [12, 3], [9, 4], [6, 6]]; let k = 4; const b = new K.Board(el, { xmin: -0.5, xmax: 37, ymin: -0.5, ymax: 7, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const [l, w] = D[k]; for (let i = 0; i <= l; i++) b.line(i, 0, i, w, { color: C.grid, w: 0.6 }); for (let j = 0; j <= w; j++) b.line(0, j, l, j, { color: C.grid, w: 0.6 }); b.rect(0, 0, l, w, { fill: C.blueL, color: C.orange, w: 3 });
            rd.innerHTML = D.map(([a, c], i) => `${i === k ? '<b>' : ''}${a} × ${c}: P = ${2 * (a + c)}${i === k ? '</b>' : ''}`).join(' · ') + ' · area 36 each; the square has the least perimeter'; };
          const step = () => { k = (k + 1) % D.length; b.redraw(); }; const row = K.row(el); K.button(row, 'Next (S)', step); b.redraw(); return { step, play() {}, pause() {} }; } }
    ],
    gens: [
      { title: 'Rectangle', gen(R) { const l = R.int(4, 30), b = R.int(3, 20); return { q: `Rectangle ${l} cm × ${b} cm: perimeter and area?`, a: `P = ${2 * (l + b)} cm, A = ${l * b} sq cm`, ans: 2 * (l + b) }; } },
      { title: 'Square', gen(R) { const s = R.int(3, 25); return R.chance(.5) ? { q: `Square of side ${s} m: area?`, a: `${s * s} sq m`, ans: s * s } : { q: `A square has perimeter ${4 * s} m. Side? Area?`, a: `${s} m; ${s * s} sq m`, ans: s }; } },
      { title: 'Triangle area', gen(R) { const b = 2 * R.int(2, 15), h = R.int(3, 20); return { q: `Triangle with base ${b} cm and height ${h} cm: area?`, a: `${b * h / 2} sq cm`, ans: b * h / 2 }; } },
      { title: 'Regular polygon', gen(R) { const n = R.pick([[3, 'equilateral triangle'], [5, 'regular pentagon'], [6, 'regular hexagon'], [8, 'regular octagon']]), s = R.int(3, 15); return { q: `Perimeter of a ${n[1]} with side ${s} cm?`, a: `${n[0] * s} cm`, ans: n[0] * s }; } },
      { title: 'Track rounds', levels: [2, 3], gen(R) { const l = R.int(20, 80), b = R.int(10, 50), r = R.int(2, 6); return { q: `A park is ${l} m by ${b} m. Distance in ${r} rounds?`, a: `${r * 2 * (l + b)} m`, ans: r * 2 * (l + b) }; } }
    ],
    quiz: [
      { q: 'Perimeter 12 m × 8 m', o: ['40 m', '96 m', '20 m', '48 m'], a: 0, e: '2 × 20.' }, { q: 'Area 12 m × 8 m', o: ['96 sq m', '40 sq m', '20 sq m', '48 sq m'], a: 0, e: 'l × b.' },
      { q: 'Triangle base 10, height 6', o: ['30', '60', '16', '15'], a: 0, e: 'Half of 60.' }, { q: 'Square perimeter 36: side', o: ['9', '6', '18', '12'], a: 0, e: '36 ÷ 4.' },
      { q: 'Area unit', o: ['sq cm', 'cm', 'kg', 'm/s'], a: 0, e: 'Square.' }, { q: 'Same area ⇒ same perimeter?', o: ['no', 'yes', 'only rectangles', 'only squares'], a: 0, e: 'Counter-example.' },
      { q: 'Regular hexagon side 5', o: ['30', '25', '20', '35'], a: 0, e: '6 × 5.' }, { q: 'Least perimeter for area 36', o: ['6 × 6', '36 × 1', '12 × 3', '9 × 4'], a: 0, e: 'Square.' },
      { q: 'Height of a triangle is', o: ['perpendicular to the base', 'any side', 'the longest side', 'the base'], a: 0, e: 'Perpendicular.' }, { q: 'Square side 7: area', o: ['49', '28', '14', '21'], a: 0, e: '7².' },
      { q: 'Equilateral triangle perimeter 27: side', o: ['9', '3', '27', '12'], a: 0, e: '÷ 3.' }
    ],
    teach: {
      outcomes: ['Find perimeters of polygons', 'Find areas of rectangles, squares, triangles', 'Compare area and perimeter'],
      periods: [{ t: 'Perimeter', flow: [['10 min', 'Walk the school ground boundary.'], ['15 min', 'Formulas.'], ['15 min', 'Track problems.']] }, { t: 'Area', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Slant side as height.', 'Area-perimeter link.'], activities: ['Graph-paper tangram areas.', 'Rope rectangles with fixed perimeter.'],
      exit: ['Area of a 15 × 4 rectangle.', 'Triangle base 9, height 8.', 'Hexagon side 7 perimeter.'], homework: 'Measure your room. Find its perimeter and the floor area. How many 30 cm tiles would cover it?'
    },
    slides: [{ t: 'Perimeter and Area', b: ['Perimeter formulas', 'Area of rectangles and squares', 'Triangle = half rectangle', 'Same area, different perimeter'] }, { t: 'Check yourself', b: ['Rectangle 14 × 6?', 'Triangle b 10, h 7?'] }],
    fs: { groups: [['Perimeter', [['Rectangle', '2(l + b)'], ['Square', '4s'], ['Regular n-gon', 'n × side']]], ['Area', [['Rectangle', 'l × b'], ['Square', 's²'], ['Triangle', '½ × b × h']]], ['Units', [['Perimeter', 'cm, m'], ['Area', 'sq cm, sq m']]]],
      ex: [['12 × 8', 'P 40, A 96'], ['Triangle 12, 8', '48']], rem: ['Height ⟂ base.', 'Square units for area.', 'Squares enclose most for a fixed perimeter.'] }
  });
})();
