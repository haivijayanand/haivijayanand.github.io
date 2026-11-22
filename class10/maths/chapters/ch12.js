/*
TOOL:    class10_maths_ch12
FAMILY:  CBSE_REVISION / Class 10 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 12 Surface Areas and Volumes - revise, board focus, 2 explore panels (capsule builder, toy = cone + hemisphere), 7 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { num, C } = G9;
  const P7 = 22 / 7;

  G9.register({
    no: 12, part: 'Unit VI · Mensuration (10 marks)', short: 'Surface areas & volumes', title: 'Surface Areas and Volumes',
    blurb: 'Surface area and volume of combinations of cubes, cuboids, cylinders, cones, spheres and hemispheres.',
    revise: {
      oneLine: 'For a solid made by joining basic solids: volume = sum of the volumes; surface area = sum of only the surfaces you can see (the joined faces are hidden).',
      sections: [
        { h: 'Basic formulas (recap)', html: `<table class="t"><tr><th>Solid</th><th>Curved / lateral SA</th><th>Total SA</th><th>Volume</th></tr>
          <tr><td>Cuboid</td><td>2h(l + b)</td><td>2(lb + bh + hl)</td><td>lbh</td></tr><tr><td>Cube</td><td>4a²</td><td>6a²</td><td>a³</td></tr>
          <tr><td>Cylinder</td><td>2πrh</td><td>2πr(r + h)</td><td>πr²h</td></tr><tr><td>Cone</td><td>πrl, l = √(r² + h²)</td><td>πr(l + r)</td><td>⅓πr²h</td></tr>
          <tr><td>Sphere</td><td>4πr²</td><td>4πr²</td><td>(4/3)πr³</td></tr><tr><td>Hemisphere</td><td>2πr²</td><td>3πr²</td><td>(2/3)πr³</td></tr></table>` },
        { h: 'Surface area of a combination', html: `<p>Add only the <b>visible</b> surfaces. Examples:</p><ul><li><b>Capsule</b> (cylinder with a hemisphere at each end): 2πrh + 2 × 2πr² = 2πr(h + 2r).</li><li><b>Toy</b> (cone on a hemisphere): πrl + 2πr².</li><li><b>Tent</b> (cone on a cylinder): πrl + 2πrh (+ floor only if asked).</li><li><b>Cube with a hemisphere on top</b>: 6a² − πr² + 2πr².</li><li><b>Cylinder with a hemisphere scooped out</b>: 2πrh + πr² (bottom) + 2πr² (bowl).</li></ul>` },
        { h: 'Volume of a combination', html: `<p>Add the volumes of the parts (subtract any part removed). Capsule: πr²h + (4/3)πr³. Toy: ⅓πr²h + (2/3)πr³.</p>` },
        { h: 'Tips', html: `<ul><li>Draw the solid and label r, h, l for each part. A common radius joins the parts.</li><li>Units: cm², cm³; 1 L = 1000 cm³.</li><li>Use π = 22/7 when radii are multiples of 7.</li></ul>` }
      ],
      formulas: [['Cylinder', 'CSA 2πrh, V πr²h'], ['Cone', 'l = √(r² + h²), CSA πrl, V ⅓πr²h'], ['Sphere', '4πr², (4/3)πr³'], ['Hemisphere', 'CSA 2πr², V (2/3)πr³'], ['Capsule SA', '2πr(h + 2r)'], ['Combined V', 'sum (minus removed parts)']],
      terms: [['Curved surface area', 'area of the curved part only'], ['Total surface area', 'all faces'], ['Slant height', 'apex to rim of cone'], ['Combination solid', 'two or more basic solids joined']],
      traps: ['Adding the hidden joined circles to the surface area.', 'Using the total height of the solid as the cylinder height.', 'Using h instead of l for the cone\'s curved surface.', 'Diameter vs radius.'],
      board: '<p><b>Unit VI (Mensuration) — 10 marks</b> with Ch 11. Expect a 3–5 mark combination problem (toy, capsule, tent, pen stand, cube with hemisphere). Draw the figure; list the visible surfaces before calculating.</p>',
      bridge: '<p>Class 9 Ch 14 covered single solids. Circle areas (Ch 11) are the bases.</p>'
    },

    explore: [
      {
        title: 'Capsule: cylinder + two hemispheres', intro: 'Change r and the cylinder length h. Only the outside surfaces count.',
        build(el, K) {
          let r = 3.5, h = 7; const row = K.row(el);
          K.slider(row, 'r (cm)', 1, 7, 0.5, r, v => { r = v; b.redraw(); }); K.slider(row, 'h of cylinder (cm)', 0, 20, 1, h, v => { h = v; b.redraw(); });
          const b = new K.Board(el, { xmin: -2, xmax: 36, ymin: -9, ymax: 9, axes: false, grid: 0 }); const rd = K.read(el);
          b.onDraw = () => {
            b.clear(); const x0 = 2 + r; b.rect(x0, -r, h, 2 * r, { fill: C.blueL, color: C.blue });
            b.arc(x0, 0, r, Math.PI / 2, 3 * Math.PI / 2, { sector: false, fill: C.orangeL, color: C.orange }); b.arc(x0 + h, 0, r, -Math.PI / 2, Math.PI / 2, { fill: C.orangeL, color: C.orange });
            b.line(x0, -r, x0, r, { color: C.grey, w: 1, dash: [4, 4] }); b.line(x0 + h, -r, x0 + h, r, { color: C.grey, w: 1, dash: [4, 4] });
            const SA = 2 * Math.PI * r * h + 4 * Math.PI * r * r, V = Math.PI * r * r * h + 4 / 3 * Math.PI * r ** 3;
            rd.innerHTML = `Visible: cylinder curved 2πrh = ${num(2 * Math.PI * r * h)} + two hemispheres 2 × 2πr² = ${num(4 * Math.PI * r * r)} ⇒ <b>SA = ${num(SA)} cm²</b> (dashed circles are hidden)<br>Volume = πr²h + (4/3)πr³ = <b>${num(V)} cm³</b> · total length = ${num(h + 2 * r)} cm`;
          };
          b.redraw(); return null;
        }
      },
      {
        title: 'Toy: cone on a hemisphere', intro: 'Change r and the total height. The cone height is total − r; its slant height l = √(r² + h²).',
        build(el, K) {
          let r = 3.5, H = 15.5; const row = K.row(el);
          K.slider(row, 'r (cm)', 1, 7, 0.5, r, v => { r = v; if (H < r + 1) H = r + 1; b.redraw(); }); K.slider(row, 'total height (cm)', 3, 25, 0.5, H, v => { H = Math.max(v, r + 0.5); b.redraw(); });
          const b = new K.Board(el, { xmin: -14, xmax: 14, ymin: -9, ymax: 26, axes: false, grid: 0 }); const rd = K.read(el);
          b.onDraw = () => {
            b.clear(); const h = H - r; b.arc(0, 0, r, Math.PI, 2 * Math.PI, { fill: C.orangeL, color: C.orange }); b.poly([[-r, 0], [r, 0], [0, h]], { fill: C.blueL, color: C.blue });
            b.line(-r, 0, r, 0, { color: C.grey, w: 1, dash: [4, 4] }); const l = Math.hypot(r, h);
            const SA = P7 * r * l + 2 * P7 * r * r, V = P7 * r * r * h / 3 + 2 / 3 * P7 * r ** 3;
            rd.innerHTML = `cone h = ${num(H)} − ${num(r)} = ${num(h)}, l = √(${num(r)}² + ${num(h)}²) = ${num(l)}<br>SA = πrl + 2πr² = <b>${num(SA)} cm²</b> · V = ⅓πr²h + (2/3)πr³ = <b>${num(V)} cm³</b> (π = 22/7)`;
          };
          b.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Capsule', gen(R) {
          const r = R.pick([0.25, 0.5, 1, 1.5, 2, 3.5, 7]) , L = r * 2 + R.int(1, 6) * 2; const h = L - 2 * r;
          return { q: `A capsule is a cylinder with a hemisphere at each end. Its total length is ${num(L)} cm and its diameter ${num(2 * r)} cm. Find its surface area (π = 22/7).`, a: `${num(2 * P7 * r * (h + 2 * r))} cm²`, ans: 2 * P7 * r * (h + 2 * r), tol: 0.05, s: `h = ${num(L)} − ${num(2 * r)} = ${num(h)}; SA = 2πrh + 4πr²` };
        } },
      { title: 'Toy (cone + hemisphere)', gen(R, L) {
          const T = R.pick([[3.5, 12, 12.5], [7, 24, 25], [3, 4, 5], [5, 12, 13]]); const [r, h, l] = T;
          return L === 1 ? { q: `A toy is a cone of radius ${r} cm mounted on a hemisphere of the same radius. The total height is ${h + r} cm. Find its volume (π = 22/7).`, a: `${num(P7 * r * r * h / 3 + 2 / 3 * P7 * r ** 3)} cm³`, ans: P7 * r * r * h / 3 + 2 / 3 * P7 * r ** 3, tol: 0.1, s: `cone h = ${h}; V = ⅓πr²h + (2/3)πr³` }
            : { q: `A toy is a cone of radius ${r} cm on a hemisphere of the same radius; total height ${h + r} cm. Find its total surface area (π = 22/7).`, a: `${num(P7 * r * l + 2 * P7 * r * r)} cm²`, ans: P7 * r * l + 2 * P7 * r * r, tol: 0.1, s: `l = √(${r}² + ${h}²) = ${l}; SA = πrl + 2πr²` };
        } },
      { title: 'Tent (cone on cylinder)', levels: [2, 3], gen(R) {
          const T = R.pick([[7, 24, 25], [3, 4, 5], [14, 48, 50], [12, 5, 13]]); const [r, hc, l] = T; const H = R.int(2, 5); const rate = R.int(2, 9) * 50;
          const A = 2 * P7 * r * H + P7 * r * l;
          return { q: `A tent is a cylinder of radius ${r} m and height ${H} m surmounted by a cone of the same radius and slant height ${l} m. Find the area of canvas used and its cost at ₹${rate} per m² (π = 22/7).`, a: `${num(A)} m²; ₹${num(A * rate)}`, ans: A, tol: 0.1, s: `2πrh + πrl = ${num(2 * P7 * r * H)} + ${num(P7 * r * l)}` };
        } },
      { title: 'Cube with a hemisphere', levels: [2, 3], gen(R) {
          const a = R.pick([7, 14, 10, 5]); const top = R.chance(.5);
          const SA = top ? 6 * a * a + P7 * (a / 2) ** 2 : 6 * a * a + P7 * (a / 2) ** 2; // same change in both cases (+πr²)
          return { q: `A cubical block of side ${a} cm has a hemisphere ${top ? 'mounted on' : 'scooped out of'} one face; the hemisphere's diameter equals the side of the cube. Find the total surface area of the solid (π = 22/7).`, a: `${num(SA)} cm²`, ans: SA, tol: 0.05, s: `6a² − πr² + 2πr² = 6a² + πr², r = ${num(a / 2)}` };
        } },
      { title: 'Cylinder with hemispheres scooped out', levels: [3], gen(R) {
          const r = R.pick([3.5, 7]), h = R.int(2, 4) * 5;
          const SA = 2 * P7 * r * h + 4 * P7 * r * r;
          return { q: `A wooden article is a solid cylinder of height ${h} cm and radius ${r} cm with a hemisphere scooped out of each end. Find its total surface area (π = 22/7).`, a: `${num(SA)} cm²`, ans: SA, tol: 0.05, s: '2πrh + 2 × 2πr² (the two bowls replace the flat ends)' };
        } },
      { title: 'Volume of a combination', gen(R) {
          const r = R.pick([3.5, 7, 1.5, 2.1]), h = R.int(2, 12); const V = P7 * r * r * h + 2 / 3 * P7 * r ** 3;
          return { q: `A vessel is a hollow hemisphere of radius ${r} cm with a hollow cylinder of the same radius and height ${h} cm on top. How much liquid can it hold (π = 22/7)?`, a: `${num(V)} cm³ = ${num(V / 1000, 3)} L`, ans: V, tol: 0.1, s: 'πr²h + (2/3)πr³' };
        } },
      { title: 'Pen stand (cuboid with conical holes)', levels: [3], gen(R) {
          const l = 15, b = 10, h = 3.5, r = 0.5, d = 1.4, n = 4; const V = l * b * h - n * P7 * r * r * d / 3;
          return { q: `A pen stand is a cuboid ${l} cm × ${b} cm × ${h} cm with ${n} conical depressions, each of radius ${r} cm and depth ${d} cm. Find the volume of wood (π = 22/7).`, a: `${num(V)} cm³`, ans: V, tol: 0.05, s: `${l * b * h} − ${n} × ⅓ × π × ${r}² × ${d}` };
        } }
    ],

    quiz: [
      { q: 'Surface area of a capsule (cylinder length h, radius r) is', o: ['2πrh + 4πr²', '2πrh + 2πr²', '2πr(h + r)', 'πr²h'], a: 0, e: 'Two hemispherical ends.' },
      { q: 'Volume of a toy (cone height h on hemisphere radius r)', o: ['⅓πr²h + (2/3)πr³', 'πr²h + (2/3)πr³', '⅓πr²h + (4/3)πr³', 'πrl + 2πr²'], a: 0, e: 'Add volumes.' },
      { q: 'Slant height of a cone with r = 6, h = 8', o: ['10', '14', '√28', '12'], a: 0, e: '√(36 + 64).' },
      { q: 'Two cubes of side 4 cm joined end to end: surface area', o: ['160 cm²', '192 cm²', '128 cm²', '96 cm²'], a: 0, e: 'Cuboid 8 × 4 × 4: 2(32 + 16 + 32).' },
      { q: 'In a combination, the joined faces are', o: ['added twice', 'added once', 'not included', 'subtracted twice'], a: 2, e: 'They are hidden.' },
      { q: 'Volume of a hemisphere of radius 21 cm (π = 22/7)', o: ['19404 cm³', '38808 cm³', '9702 cm³', '2772 cm³'], a: 0, e: '(2/3)(22/7)(9261).' },
      { q: 'Curved surface area of a cone uses', o: ['height', 'slant height', 'diameter', 'volume'], a: 1, e: 'πrl.' },
      { q: 'A cylinder and a cone have the same r and h. Ratio of volumes', o: ['3 : 1', '1 : 3', '2 : 1', '1 : 1'], a: 0, e: '⅓ for the cone.' },
      { q: '1 litre equals', o: ['100 cm³', '1000 cm³', '10 cm³', '1 m³'], a: 1, e: 'Definition.' },
      { q: 'Cube of side 7 cm with hemisphere (d = 7) on top: extra SA compared with the cube', o: ['πr²', '2πr²', '3πr²', '0'], a: 0, e: '−πr² + 2πr².' },
      { q: 'Total SA of a solid hemisphere of radius r', o: ['2πr²', '3πr²', '4πr²', 'πr²'], a: 1, e: 'Curved 2πr² + base πr².' }
    ],

    teach: {
      outcomes: ['Recall SA and volume formulas of basic solids', 'Find SA of combinations counting only visible surfaces', 'Find volumes of combinations', 'Solve cost and capacity problems'],
      periods: [
        { t: 'Surface area of combinations', flow: [['10 min', 'Recap table; models (capsule, ice-cream cone).'], ['15 min', 'Explore panel 1: visible surfaces.'], ['15 min', 'Tent and cube-with-hemisphere problems.']] },
        { t: 'Volume of combinations', flow: [['15 min', 'Explore panel 2: toy.'], ['15 min', 'Vessel, pen stand, scooped solids.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Hidden faces added.', 'Total height used for each part.', 'h used for πrl.'],
      activities: ['Clay models of combinations; cut to show hidden faces.', 'Measure a real capsule/tablet strip.'],
      exit: ['SA of a toy r = 3.5, total height 15.5.', 'Volume of a capsule r = 2, length 10.'],
      homework: 'A gulab jamun (capsule) is 5 cm long and 2.8 cm in diameter and contains 30% syrup. Find the syrup in 45 of them.'
    },

    slides: [
      { t: 'Surface Areas and Volumes', b: ['Combinations of solids', 'Visible surfaces only', 'Add volumes'] },
      { t: 'Recap', b: ['Cylinder: 2πrh, πr²h', 'Cone: πrl, ⅓πr²h', 'Sphere: 4πr², (4/3)πr³', 'Hemisphere: 2πr², (2/3)πr³'] },
      { t: 'Surface area of combinations', b: ['Capsule: 2πrh + 4πr²', 'Toy: πrl + 2πr²', 'Tent: 2πrh + πrl', 'Cube + hemisphere: 6a² + πr²'] },
      { t: 'Volume of combinations', b: ['Add the parts', 'Subtract any part removed', '1 L = 1000 cm³'] },
      { t: 'Check yourself', b: ['Toy r = 7, cone h = 24: SA?', 'Answer: 22/7 × 7 × 25 + 2 × 154 = 858 cm²'] }
    ],

    fs: { groups: [
        ['Basic solids', [['Cuboid', 'TSA 2(lb + bh + hl), V lbh'], ['Cube', 'TSA 6a², V a³'], ['Cylinder', 'CSA 2πrh, TSA 2πr(r + h), V πr²h'], ['Cone', 'l = √(r² + h²), CSA πrl, V ⅓πr²h'], ['Sphere', 'SA 4πr², V (4/3)πr³'], ['Hemisphere', 'CSA 2πr², TSA 3πr², V (2/3)πr³']]],
        ['Combinations (SA)', [['Rule', 'only visible surfaces'], ['Capsule', '2πrh + 4πr²'], ['Toy (cone + hemisphere)', 'πrl + 2πr²'], ['Tent (cone + cylinder)', 'πrl + 2πrh'], ['Cube + hemisphere', '6a² + πr²'], ['Cylinder, both ends scooped', '2πrh + 4πr²']]],
        ['Combinations (V)', [['Rule', 'add parts, subtract removed'], ['Capsule', 'πr²h + (4/3)πr³'], ['Toy', '⅓πr²h + (2/3)πr³'], ['Units', '1 L = 1000 cm³']]]],
      ex: [['Toy r = 3.5, total h 15.5', 'cone h = 12, l = 12.5; SA = 137.5 + 77 = 214.5 cm²'], ['Capsule d = 5 mm, length 14 mm', 'SA = 2π(2.5)(9) + 4π(2.5)² = 220 mm²']],
      rem: ['List the visible surfaces before calculating.', 'Each part has its own height.', 'Use l, not h, for πrl.'] }
  });
})();
