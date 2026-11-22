/*
TOOL:    class5_maths_ch11
FAMILY:  CBSE_REVISION / Class 5 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 11 Grandmother's Quilt (area by counting squares, perimeter, rectangles, same area different perimeter) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 11, part: 'All chapters', short: 'Area and perimeter', title: "Grandmother's Quilt",
    blurb: "Area as the number of square patches that cover a quilt, perimeter as the length of its border, rectangles' area and perimeter, and shapes with the same area but different perimeters.",
    revise: {
      oneLine: 'Area = number of unit squares that cover a shape; for a rectangle, length × breadth. Perimeter = distance around the edge; for a rectangle, 2 × (length + breadth). A quilt 6 patches by 4 patches has area 24 squares and border 20 sides.',
      sections: [
        { h: 'Area', html: `<p>Count squares (half squares count as ½). Rectangle 6 cm × 4 cm → 24 sq cm.</p>` },
        { h: 'Perimeter', html: `<p>Add all sides: 6 + 4 + 6 + 4 = 20 cm = 2 × (6 + 4).</p>` },
        { h: 'Same area, different border', html: `<p>12 squares: 12 × 1 (perimeter 26), 6 × 2 (16), 4 × 3 (14). The squarer, the shorter the border.</p>` }
      ],
      formulas: [['Area of rectangle', 'l × b'], ['Perimeter of rectangle', '2 × (l + b)'], ['Square', 'area s × s, perimeter 4 × s'], ['Units', 'area sq cm; perimeter cm']],
      terms: [['Area', 'surface covered'], ['Perimeter', 'boundary length'], ['Square unit', '1 cm by 1 cm']],
      traps: ['Mixing area and perimeter units.', 'Counting corner squares twice for perimeter.', 'Same area does not mean same perimeter.'],
      bridge: '<p>Class 6 finds areas of composite shapes.</p>'
    },
    explore: [
      { title: 'Quilt rectangle', intro: 'Set the quilt size in patches.',
        build(el, K) { let L = 6, B = 4; const row = K.row(el); K.slider(row, 'length', 1, 12, 1, L, v => { L = v; b.redraw(); }); K.slider(row, 'breadth', 1, 8, 1, B, v => { B = v; b.redraw(); }); const b = new K.Board(el, { xmin: -0.5, xmax: 12.5, ymin: -0.5, ymax: 8.5, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          const cols = [C.blueL, C.orangeL, C.purpleL, 'rgba(202,138,4,.22)'];
          b.onDraw = () => { b.clear(); for (let i = 0; i < L; i++) for (let j = 0; j < B; j++) b.rect(i, j, 1, 1, { fill: cols[(i + 2 * j) % 4], color: C.grid, w: 1 }); b.rect(0, 0, L, B, { color: C.orange, w: 5 });
            rd.innerHTML = `area = ${L} × ${B} = <b>${L * B} squares</b> · perimeter = 2 × (${L} + ${B}) = <b>${2 * (L + B)} sides</b>`; };
          b.redraw(); return null; } },
      { title: 'Same area, different perimeter', intro: 'Choose an area; every rectangle with that area is listed. Press <kbd>S</kbd> to show the next one.',
        build(el, K) { let A = 24, k = 0; const row = K.row(el); K.select(row, 'area', ['12', '16', '24', '36'], i => { A = [12, 16, 24, 36][i]; k = 0; b.redraw(); }); const s0 = row.querySelector('select'); if (s0) s0.value = 2;
          const b = new K.Board(el, { xmin: -0.5, xmax: 37, ymin: -0.5, ymax: 13, axes: false, grid: 0, equal: true }); const rd = K.read(el); const dims = () => { const r = []; for (let l = A; l >= 1; l--) if (A % l === 0 && l >= A / l) r.push([l, A / l]); return r; };
          b.onDraw = () => { b.clear(); const D = dims(), [l, w] = D[k % D.length]; for (let i = 0; i < l; i++) for (let j = 0; j < w; j++) b.rect(i, j, 1, 1, { fill: C.blueL, color: C.grid, w: 1 }); b.rect(0, 0, l, w, { color: C.orange, w: 4 });
            rd.innerHTML = D.map(([a, c], i) => `${i === k % D.length ? '<b>' : ''}${a} × ${c}: perimeter ${2 * (a + c)}${i === k % D.length ? '</b>' : ''}`).join(' · ') + ' — the squarest has the shortest border'; };
          const step = () => { k++; b.redraw(); }; K.button(row, 'Next (S)', step); b.redraw(); return { step, play() {}, pause() {} }; } }
    ],
    gens: [
      { title: 'Area of a rectangle', gen(R) { const l = R.int(3, 15), b = R.int(2, 10); return { q: `Area of a rectangle ${l} cm by ${b} cm?`, a: `${l * b} sq cm`, ans: l * b }; } },
      { title: 'Perimeter of a rectangle', gen(R) { const l = R.int(3, 25), b = R.int(2, 15); return { q: `Perimeter of a rectangle ${l} m by ${b} m?`, a: `${2 * (l + b)} m`, ans: 2 * (l + b) }; } },
      { title: 'Square', gen(R) { const s = R.int(2, 12); return R.chance(.5) ? { q: `Area of a square of side ${s} cm?`, a: `${s * s} sq cm`, ans: s * s } : { q: `Perimeter of a square of side ${s} cm?`, a: `${4 * s} cm`, ans: 4 * s }; } },
      { title: 'Missing side', levels: [2, 3], gen(R) { const l = R.int(4, 15), b = R.int(2, 10); return R.chance(.5) ? { q: `A rectangle has area ${l * b} sq cm and length ${l} cm. Breadth?`, a: `${b} cm`, ans: b } : { q: `A rectangle has perimeter ${2 * (l + b)} cm and length ${l} cm. Breadth?`, a: `${b} cm`, ans: b }; } },
      { title: 'Quilt patches', levels: [3], gen(R) { const s = R.pick([10, 15, 20, 25]), m = R.int(4, 8), n = R.int(3, 6); return { q: `A quilt has ${m} × ${n} square patches, each ${s} cm wide. Its size? Lace needed for the border?`, a: `${m * s} cm by ${n * s} cm; lace ${2 * (m + n) * s} cm`, ans: 2 * (m + n) * s }; } }
    ],
    quiz: [
      { q: 'Area 6 cm × 4 cm', o: ['24 sq cm', '20 cm', '10 sq cm', '24 cm'], a: 0, e: 'l × b.' }, { q: 'Perimeter 6 cm × 4 cm', o: ['20 cm', '24 cm', '10 cm', '24 sq cm'], a: 0, e: '2 × 10.' },
      { q: 'Square side 5: area', o: ['25', '20', '10', '15'], a: 0, e: '5 × 5.' }, { q: 'Square side 5: perimeter', o: ['20', '25', '10', '15'], a: 0, e: '4 × 5.' },
      { q: 'Unit of area', o: ['sq cm', 'cm', 'kg', 'L'], a: 0, e: 'Squares.' }, { q: 'Area 12: shortest perimeter', o: ['4 × 3', '12 × 1', '6 × 2', 'all same'], a: 0, e: 'Squarest.' },
      { q: 'Area 30, length 6: breadth', o: ['5', '24', '36', '4'], a: 0, e: '30 ÷ 6.' }, { q: 'Perimeter is', o: ['distance around', 'space inside', 'weight', 'volume'], a: 0, e: 'Border.' },
      { q: 'Same area means same perimeter?', o: ['no', 'yes', 'always', 'only squares'], a: 0, e: '12 × 1 vs 4 × 3.' }, { q: 'Perimeter 30, length 10: breadth', o: ['5', '20', '3', '15'], a: 0, e: '15 − 10.' },
      { q: 'Two half squares make', o: ['1 square', '2 squares', '½ square', '4 squares'], a: 0, e: 'Halves.' }
    ],
    teach: {
      outcomes: ['Find area by counting and by l × b', 'Find perimeter', 'Compare shapes with equal areas'],
      periods: [{ t: 'Area', flow: [['10 min', 'Quilt story; count patches.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Squared-paper shapes.']] }, { t: 'Perimeter', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Fence and lace problems.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Area/perimeter units.', 'Same area → same perimeter.'], activities: ['Paper-patch quilt.', 'Fence-the-garden with 24 m rope.'],
      exit: ['Area 9 × 7.', 'Perimeter of a 12 m square.', 'Rectangles with area 18.'], homework: 'Measure a table top or bed sheet; find its area and perimeter.'
    },
    slides: [{ t: "Grandmother's Quilt", b: ['Area by squares', 'Perimeter around', 'Rectangle formulas', 'Same area, different border'] }, { t: 'Check yourself', b: ['Area 8 × 5?', 'Perimeter 8 × 5?'] }],
    fs: { groups: [['Rectangle', [['Area', 'l × b'], ['Perimeter', '2 × (l + b)']]], ['Square', [['Area', 's × s'], ['Perimeter', '4 × s']]], ['Units', [['Area', 'sq cm, sq m'], ['Perimeter', 'cm, m']]]],
      ex: [['6 × 4', 'area 24, perimeter 20'], ['Area 12', '4 × 3 has perimeter 14']], rem: ['Area inside, perimeter around.', 'Square units for area.', 'Squarer shapes have shorter borders.'] }
  });
})();
