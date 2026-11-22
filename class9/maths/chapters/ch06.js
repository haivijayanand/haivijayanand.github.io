/*
TOOL:    class9_maths_ch06
FAMILY:  CBSE_REVISION / Class 9 Maths (Ganita Manjari)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class 9 Maths full build
CHANGES: 1.0.0 - Ch 6 Measuring Space: Perimeter and Area - revise, 3 explore panels (circle to rectangle, triangle area + Heron, shear), 10 generators, quiz, lesson plan, slides
*/
(function () {
  const { F, num, C } = G9;
  const PI7 = '22/7';

  G9.register({
    no: 6, part: 'Part I', short: 'Perimeter & area', title: 'Measuring Space: Perimeter and Area',
    blurb: 'Perimeter and area of plane figures and circles — and where each formula comes from.',
    revise: {
      oneLine: 'Perimeter measures the boundary (units); area measures the surface enclosed (square units). Almost every area formula comes from cutting a shape and rearranging it into a rectangle.',
      sections: [
        { h: 'Rectangles to triangles', html: `<ul><li>Rectangle: P = 2(l + b), A = lb. Square: P = 4a, A = a², diagonal = a√2.</li>
          <li>Parallelogram: cut a triangle off one end and move it to the other → rectangle: <b>A = base × height</b>.</li>
          <li>Triangle = half of a parallelogram: <b>A = ½ × base × height</b>.</li>
          <li>Trapezium: two copies make a parallelogram with base (a + b): <b>A = ½(a + b)h</b>.</li>
          <li>Rhombus / kite: <b>A = ½ d₁d₂</b> (diagonals).</li></ul>` },
        { h: "Area from three sides — Heron's formula", html: `<p>When the height is not known: s = ${F('a + b + c', 2)} (semi-perimeter) and</p>
          <div class="box m">A = √[s(s − a)(s − b)(s − c)]</div>
          <p>Example: sides 13, 14, 15 → s = 21, A = √(21 × 8 × 7 × 6) = √7056 = 84.</p>
          <p>Equilateral triangle of side a: A = ${F('√3', 4)}a², height = ${F('√3', 2)}a.</p>` },
        { h: 'Circles', html: `<p>For every circle, circumference ÷ diameter is the same number <b>π</b> ≈ 3.14159 (≈ ${F(22, 7)}). So <b>C = 2πr</b>.</p>
          <p>Cut a circle into many thin sectors and arrange them alternately: you get almost a rectangle of length πr (half the circumference) and width r. So <b>A = πr²</b>.</p>
          <p>Sector of angle θ: arc length = ${F('θ', 360)} × 2πr, area = ${F('θ', 360)} × πr². Ring (annulus): A = π(R² − r²).</p>` },
        { h: 'Composite figures', html: `<p>Split into known shapes, add the areas (or subtract holes). For perimeter, trace only the <b>outer boundary</b> — internal cut lines do not count.</p>` },
        { h: 'Units', html: `<p>1 m = 100 cm ⇒ 1 m² = 10 000 cm². 1 hectare = 10 000 m². Always convert lengths to the same unit <b>before</b> multiplying.</p>` }
      ],
      formulas: [['Rectangle', 'A = lb, P = 2(l + b)'], ['Parallelogram', 'A = bh'], ['Triangle', 'A = ½bh'], ["Heron", 'A = √[s(s−a)(s−b)(s−c)]'], ['Equilateral', 'A = (√3/4)a²'], ['Trapezium', 'A = ½(a + b)h'], ['Rhombus', 'A = ½d₁d₂'], ['Circle', 'C = 2πr, A = πr²'], ['Sector', 'A = (θ/360)πr², arc = (θ/360)2πr']],
      terms: [['Perimeter', 'length of the boundary'], ['Area', 'amount of surface enclosed'], ['Semi-perimeter', 's = half the perimeter'], ['π', 'circumference ÷ diameter, irrational']],
      traps: ['Using the slant side instead of the perpendicular height in ½bh or bh.', 'Mixing cm and m before multiplying (gives answers 100 or 10 000 times wrong).', 'Using diameter for r in πr².', 'Adding internal lines to a perimeter.'],
      bridge: '<p>Ch 14 uses these areas as faces and cross-sections of solids. π is irrational (Ch 3). Coordinates (Ch 1) give lengths for Heron\'s formula.</p>'
    },

    explore: [
      {
        title: 'Circle → rectangle', intro: 'Cut the circle into more and more sectors and lay them top-to-tail. The shape tends to a rectangle πr × r. Press <kbd>S</kbd> to double the sectors.',
        build(el, K) {
          const b = new K.Board(el, { xmin: -1, xmax: 26, ymin: -4.5, ymax: 4.5, axes: false, grid: 0, aspect: 0.4 });
          const rd = K.read(el); const ns = [4, 8, 12, 16, 24, 32, 48, 64];
          const an = new K.Anim(ns.length, () => b.redraw(), { ms: 1100 });
          b.onDraw = () => {
            b.clear(); const n = ns[an.i], r = 3.4, cx = 3.6, cy = 0;
            for (let k = 0; k < n; k++) { const a1 = k * 2 * Math.PI / n, a2 = (k + 1) * 2 * Math.PI / n; b.arc(cx, cy, r, a1, a2, { sector: true, fill: k % 2 ? C.orangeL : C.blueL, color: k % 2 ? C.orange : C.blue, w: 1 }); }
            const w = 2 * Math.PI * r / n, x0 = 8.6, base = -r / 2; const half = Math.PI / n;
            for (let k = 0; k < n; k++) {
              const up = k % 2 === 0, x = x0 + k * w / 2;
              const tip = up ? [x + w / 2, base] : [x + w / 2, base + r];
              const arcPts = []; for (let j = 0; j <= 6; j++) { const t = -half + j * (2 * half / 6); arcPts.push(up ? [x + w / 2 + r * Math.sin(t), base + r * Math.cos(t)] : [x + w / 2 + r * Math.sin(t), base + r - r * Math.cos(t)]); }
              b.poly([tip, ...arcPts], { fill: up ? C.blueL : C.orangeL, color: up ? C.blue : C.orange, w: 1 });
            }
            const L = Math.PI * r; b.rect(x0 + w / 4, base, L, r, { color: C.purple, w: 2, dash: [6, 4], fill: 'transparent' });
            b.text(x0 + w / 4 + L / 2, base - 0.6, 'πr (half the circumference)', { font: 'bold 14px', color: C.purple });
            b.text(x0 + w / 4 + L + 0.9, 0, 'r', { font: 'italic bold 16px', color: C.purple });
            rd.innerHTML = `${n} sectors. Length ≈ half the circumference = πr, width ≈ r ⇒ area ≈ πr × r = <b>πr²</b>. More sectors → closer to a true rectangle.`;
          };
          K.anim(el, an); b.redraw(); return an;
        }
      },
      {
        title: "Triangle area: ½ × base × height and Heron's formula", intro: 'Drag the vertices (they snap to the grid). Both methods always agree.',
        build(el, K) {
          const b = new K.Board(el, { xmin: -1, xmax: 13, ymin: -1, ymax: 8 });
          const A = b.addPt(0, 0, { label: 'A', snap: 1, color: C.blue }), B = b.addPt(10, 0, { label: 'B', snap: 1, color: C.blue }), P = b.addPt(4, 6, { label: 'C', snap: 1 });
          const rd = K.read(el);
          b.onDraw = () => {
            b.base(); b.poly([[A.x, A.y], [B.x, B.y], [P.x, P.y]], { fill: C.blueL, color: C.blue });
            const dx = B.x - A.x, dy = B.y - A.y, L = Math.hypot(dx, dy) || 1, t = ((P.x - A.x) * dx + (P.y - A.y) * dy) / (L * L), fx = A.x + t * dx, fy = A.y + t * dy;
            b.line(P.x, P.y, fx, fy, { color: C.orange, dash: [6, 4] }); b.dot(fx, fy, { color: C.orange, r: 4 });
            if (t < 0 || t > 1) b.line(t < 0 ? A.x : B.x, t < 0 ? A.y : B.y, fx, fy, { color: C.grey, w: 1.5, dash: [3, 3] });
            b.drawPts();
            const a = Math.hypot(P.x - B.x, P.y - B.y), bb = Math.hypot(P.x - A.x, P.y - A.y), c = L, h = Math.abs(dx * (P.y - A.y) - dy * (P.x - A.x)) / L, s = (a + bb + c) / 2;
            const her = Math.sqrt(Math.max(0, s * (s - a) * (s - bb) * (s - c)));
            rd.innerHTML = `Base AB = ${num(c)}, height = ${num(h)} ⇒ ½ × ${num(c)} × ${num(h)} = <b>${num(c * h / 2)}</b><br>Sides a = ${num(a)}, b = ${num(bb)}, c = ${num(c)}; s = ${num(s)}; Heron: √[${num(s)} × ${num(s - a)} × ${num(s - bb)} × ${num(s - c)}] = <b>${num(her)}</b>${t < 0 || t > 1 ? '<br>Obtuse triangle: the height falls <b>outside</b> — extend the base.' : ''}`;
          };
          b.redraw(); return null;
        }
      },
      {
        title: 'Same base, same height ⇒ same area', intro: 'Slide the top edge of the parallelogram sideways (press <kbd>P</kbd>). The area never changes — then step to cut and move a triangle to form a rectangle.',
        build(el, K) {
          const b = new K.Board(el, { xmin: -2, xmax: 16, ymin: -1, ymax: 7, axes: false });
          const rd = K.read(el); let sh = 3;
          const an = new K.Anim(Infinity, (i) => { sh = 4 * Math.sin(i / 12); b.redraw(); }, { ms: 60 });
          b.onDraw = () => {
            b.base(); const base = 8, h = 4, x0 = 2;
            b.poly([[x0, 0], [x0 + base, 0], [x0 + base + sh, h], [x0 + sh, h]], { fill: C.blueL, color: C.blue });
            b.rect(x0, 0, base, h, { color: C.orange, w: 2, dash: [6, 4] });
            b.line(x0 + sh, h, x0 + sh, 0, { color: C.purple, w: 2, dash: [3, 3] });
            b.text(x0 + base / 2, -0.5, 'base = 8', { font: 'bold 14px' }); b.text(x0 + sh - 0.8, h / 2, 'h = 4', { font: 'bold 14px', color: C.purple });
            rd.innerHTML = `Shift = ${num(sh)}. Parallelogram area = base × height = 8 × 4 = <b>32</b> — same as the dashed rectangle. The triangle cut from one side fits exactly into the gap on the other.`;
          };
          K.anim(el, an); b.redraw(); return an;
        }
      }
    ],

    gens: [
      { title: 'Rectangle: fencing and flooring', levels: [1, 2], gen(R, L) {
          const l = R.int(8, 40), w = R.int(5, l - 1), rate = R.int(5, 30) * (L === 1 ? 1 : 10);
          return L === 1 ? { q: `A rectangular garden is ${l} m by ${w} m. Find its perimeter and area.`, a: `P = ${2 * (l + w)} m, A = ${l * w} m²`, s: `P = 2(${l} + ${w}), A = ${l} × ${w}` }
            : { q: `A field ${l} m × ${w} m is to be fenced at ₹${rate} per metre. Find the cost.`, a: `₹${2 * (l + w) * rate}`, ans: 2 * (l + w) * rate, s: `Perimeter = ${2 * (l + w)} m; cost = ${2 * (l + w)} × ${rate}` };
        } },
      { title: 'Triangle: ½ × base × height', levels: [1, 2], gen(R) {
          const bb = R.int(4, 30), h = R.int(3, 25);
          return { q: `Find the area of a triangle with base ${bb} cm and height ${h} cm.`, a: `${num(bb * h / 2)} cm²`, ans: bb * h / 2, s: `½ × ${bb} × ${h}` };
        } },
      { title: "Heron's formula", gen(R, L) {
          const T = L === 1 ? R.pick([[3, 4, 5], [6, 8, 10], [5, 5, 6], [5, 5, 8]]) : R.pick([[13, 14, 15], [9, 10, 17], [10, 13, 13], [7, 15, 20], [11, 13, 20], [15, 20, 25], [13, 20, 21], [12, 17, 25]]);
          const k = L === 3 ? R.int(2, 3) : 1; const [a, b, c] = T.map(x => x * k); const s = (a + b + c) / 2, A = Math.sqrt(s * (s - a) * (s - b) * (s - c));
          return { q: `Find the area of a triangle with sides ${a} cm, ${b} cm and ${c} cm.`, a: `${num(A)} cm²`, ans: A, s: `s = ${s}; A = √(${s} × ${s - a} × ${s - b} × ${s - c}) = √${num(A * A)}` };
        } },
      { title: 'Equilateral triangle', levels: [2, 3], gen(R) {
          const a = R.int(2, 12) * 2; return { q: `Find the area of an equilateral triangle of side ${a} cm (leave √3 in the answer).`, a: `${a * a / 4}√3 cm² ≈ ${num(a * a / 4 * Math.sqrt(3))} cm²`, ans: a * a / 4 * Math.sqrt(3), tol: 0.05, s: `(√3/4) × ${a}² = ${a * a / 4}√3` };
        } },
      { title: 'Circle: circumference and area', gen(R, L) {
          const r = R.int(1, 6) * 7; const d = R.chance(.4);
          if (L === 3) { const C_ = 2 * 22 * r / 7; return { q: `The circumference of a circle is ${C_} cm. Find its area (π = ${PI7}).`, a: `${22 * r * r / 7} cm²`, ans: 22 * r * r / 7, s: `2πr = ${C_} ⇒ r = ${r}; A = ${PI7} × ${r}²` }; }
          return { q: `Find the circumference and area of a circle of ${d ? 'diameter ' + 2 * r : 'radius ' + r} cm (π = ${PI7}).`, a: `C = ${44 * r / 7} cm, A = ${22 * r * r / 7} cm²`, s: `${d ? 'r = ' + r + '; ' : ''}C = 2 × ${PI7} × ${r}, A = ${PI7} × ${r}²` };
        } },
      { title: 'Ring (path around a circle)', levels: [2, 3], gen(R) {
          const r = R.int(1, 5) * 7, w = R.int(1, 3) * 7; const Rr = r + w;
          return { q: `A circular pond of radius ${r} m has a path ${w} m wide around it. Find the area of the path (π = ${PI7}).`, a: `${22 * (Rr * Rr - r * r) / 7} m²`, ans: 22 * (Rr * Rr - r * r) / 7, s: `π(R² − r²) = ${PI7} × (${Rr}² − ${r}²)` };
        } },
      { title: 'Trapezium', gen(R) {
          const a = R.int(6, 30), b = R.int(4, a - 1), h = R.int(3, 20);
          return { q: `The parallel sides of a trapezium are ${a} cm and ${b} cm and the distance between them is ${h} cm. Find its area.`, a: `${num((a + b) * h / 2)} cm²`, ans: (a + b) * h / 2, s: `½(${a} + ${b}) × ${h}` };
        } },
      { title: 'Rhombus from diagonals', levels: [1, 2], gen(R) {
          const T = R.pick([[6, 8, 5], [10, 24, 13], [12, 16, 10], [16, 30, 17], [18, 24, 15]]);
          return { q: `The diagonals of a rhombus are ${T[0]} cm and ${T[1]} cm. Find its area and side.`, a: `Area ${T[0] * T[1] / 2} cm², side ${T[2]} cm`, s: `½ × ${T[0]} × ${T[1]}; side = √(${T[0] / 2}² + ${T[1] / 2}²)` };
        } },
      { title: 'Sector and arc', levels: [3], gen(R) {
          const r = R.pick([7, 14, 21]), th = R.pick([30, 45, 60, 90, 120]);
          return { q: `Find the arc length and area of a sector of radius ${r} cm and angle ${th}° (π = ${PI7}).`, a: `arc ${num(th / 360 * 44 * r / 7)} cm, area ${num(th / 360 * 22 * r * r / 7)} cm²`, s: `(${th}/360) × 2πr and (${th}/360) × πr²` };
        } },
      { title: 'Composite figure', levels: [2, 3], gen(R) {
          const w = R.int(1, 3) * 14, l = R.int(2, 6) * 5;
          return { q: `A window is a rectangle ${l} cm tall and ${w} cm wide with a semicircle on top (diameter = width). Find its area and perimeter (π = ${PI7}).`, a: `Area ${num(l * w + 11 * (w / 2) * (w / 2) / 7)} cm², perimeter ${num(2 * l + w + 22 * w / 14)} cm`, s: `Area = ${l}×${w} + ½π(${w / 2})²; perimeter = 2×${l} + ${w} + π×${w / 2} (the top side of the rectangle is inside)` };
        } }
    ],

    quiz: [
      { q: 'Area of a triangle with base 12 cm and height 7 cm', o: ['84 cm²', '42 cm²', '19 cm²', '38 cm²'], a: 1, e: '½ × 12 × 7.' },
      { q: 'Semi-perimeter of a triangle with sides 7, 8, 9 is', o: ['24', '12', '8', '16'], a: 1, e: '(7 + 8 + 9)/2.' },
      { q: 'Area of the triangle with sides 3, 4, 5', o: ['12', '6', '7.5', '10'], a: 1, e: 'Right triangle: ½ × 3 × 4 = 6.' },
      { q: 'Circumference of a circle of radius 7 cm (π = 22/7)', o: ['22 cm', '44 cm', '154 cm', '14 cm'], a: 1, e: '2 × 22/7 × 7.' },
      { q: 'Area of a circle of radius 14 cm (π = 22/7)', o: ['616 cm²', '88 cm²', '308 cm²', '196 cm²'], a: 0, e: '22/7 × 196.' },
      { q: 'Area of a rhombus with diagonals 10 and 24', o: ['240', '120', '60', '34'], a: 1, e: '½ × 10 × 24.' },
      { q: 'Area of an equilateral triangle of side 4 cm', o: ['4√3 cm²', '8 cm²', '16√3 cm²', '2√3 cm²'], a: 0, e: '(√3/4) × 16.' },
      { q: 'A parallelogram and a rectangle have the same base and height. Their areas are', o: ['equal', 'parallelogram larger', 'rectangle larger', 'cannot say'], a: 0, e: 'Both = base × height.' },
      { q: '1 m² equals', o: ['100 cm²', '1000 cm²', '10 000 cm²', '10 cm²'], a: 2, e: '100 cm × 100 cm.' },
      { q: 'Trapezium with parallel sides 10 and 6, height 4. Area?', o: ['32', '64', '40', '24'], a: 0, e: '½ × 16 × 4.' },
      { q: 'If the radius of a circle is doubled, its area becomes', o: ['double', 'four times', 'half', 'same'], a: 1, e: 'π(2r)² = 4πr².' }
    ],

    teach: {
      outcomes: ['Derive area formulas for parallelogram, triangle, trapezium and rhombus by rearrangement', "Use Heron's formula when the height is unknown", 'Justify C = 2πr and A = πr² and use them for sectors and rings', 'Solve composite-figure problems with correct units'],
      periods: [
        { t: 'From rectangles to triangles', flow: [['10 min', 'Paper parallelogram: cut a triangle and slide it — rectangle! (Explore panel 3)'], ['15 min', 'Triangle = half a parallelogram; trapezium = half of a doubled shape; rhombus by diagonals.'], ['15 min', 'Practice: rectangles, triangles, trapezia.']] },
        { t: "Heron's formula", flow: [['10 min', 'Problem: a triangular plot with only side lengths known.'], ['15 min', "Explore panel 2: compare ½bh with Heron's for many triangles."], ['15 min', 'Practice: Heron level Standard.']] },
        { t: 'Circles and composite figures', flow: [['15 min', 'Measure circumference ÷ diameter of bangles/lids → π. Explore panel 1 for πr².'], ['15 min', 'Rings, sectors, windows.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Using slant height in parallelogram area.', 'Using diameter in πr².', 'Unit conversion squared incorrectly (1 m² = 100 cm²).', 'Counting internal cut lines in a perimeter.'],
      activities: ['Measure circular objects with thread to estimate π; class average.', 'Cut a paper plate into 16 sectors and rearrange.', 'Measure the school ground and compute area with Heron by splitting into triangles.'],
      exit: ["Area of triangle with sides 5, 12, 13.", 'Area of a circle of diameter 28 cm.', 'Area of a trapezium with parallel sides 9, 5 and height 6.'],
      homework: 'Find the area of your classroom floor and the cost of tiling it at a rate you find locally.'
    },

    slides: [
      { t: 'Measuring Space: Perimeter and Area', b: ['Perimeter: boundary length', 'Area: surface enclosed', 'Formulas by cutting and rearranging', 'Circles and π'] },
      { t: 'Cut and rearrange', b: ['Parallelogram → rectangle: A = bh', 'Triangle = ½ parallelogram: A = ½bh', 'Trapezium: A = ½(a + b)h', 'Rhombus: A = ½d₁d₂'] },
      { t: "Heron's formula", b: ['s = (a + b + c)/2', 'A = √[s(s − a)(s − b)(s − c)]', 'Example 13, 14, 15: s = 21, A = 84'] },
      { t: 'Circles', b: ['π = C ÷ d for every circle', 'C = 2πr', 'Sectors rearranged → rectangle πr × r', 'A = πr²'] },
      { t: 'Sectors and rings', b: ['Arc = (θ/360) × 2πr', 'Sector area = (θ/360) × πr²', 'Ring area = π(R² − r²)'] },
      { t: 'Composite figures', b: ['Split into known shapes', 'Add areas, subtract holes', 'Perimeter: outer boundary only', 'Same units before multiplying'] },
      { t: 'Check yourself', b: ['Triangle 6, 8, 10: area?', 'Circle r = 7: area?', 'Rhombus diagonals 6, 8: area?', 'Answers: 24 · 154 · 24'] }
    ]
  });
})();
