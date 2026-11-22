/*
TOOL:    class9_maths_ch14
FAMILY:  CBSE_REVISION / Class 9 Maths (Ganita Manjari)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class 9 Maths full build
CHANGES: 1.0.0 - Ch 14 Math of Space: Surface Area and Volume - revise, 4 explore panels (unit cubes, painted cube, cylinder net, Archimedes ratio), 11 generators, quiz, lesson plan, slides
*/
(function () {
  const { F, num, C } = G9;
  const PI7 = '22/7';
  // isometric helpers on a Board with equal scale
  const iso = (x, y, z) => [(x - y) * 0.866, z + (x + y) * 0.5];
  function cube(b, x, y, z, s, fill) {
    const P = (a, c, d) => iso(x + a * s, y + c * s, z + d * s);
    const top = [P(0, 0, 1), P(1, 0, 1), P(1, 1, 1), P(0, 1, 1)], left = [P(0, 0, 0), P(1, 0, 0), P(1, 0, 1), P(0, 0, 1)], right = [P(0, 0, 0), P(0, 1, 0), P(0, 1, 1), P(0, 0, 1)];
    // viewer looks from -x,-y (front faces are y=0 and x=0)
    b.poly(right, { fill: fill[2], color: '#334155', w: 1 }); b.poly(left, { fill: fill[1], color: '#334155', w: 1 }); b.poly(top, { fill: fill[0], color: '#334155', w: 1 });
  }

  G9.register({
    no: 14, part: 'Part II', short: 'Surface area & volume', title: 'Math of Space: Surface Area and Volume',
    blurb: 'Cubes, cuboids, cylinders, cones and spheres — surface area, volume, cross-sections and estimation.',
    revise: {
      oneLine: 'Surface area is the area of all the faces (what you paint or wrap); volume is the space inside (what you fill). For prisms and cylinders, volume = cross-section area × height; cones are one-third of the matching cylinder.',
      sections: [
        { h: 'Cuboid and cube', html: `<p>Cuboid l × b × h: <b>TSA = 2(lb + bh + hl)</b>, lateral (4 walls) = 2h(l + b), <b>V = lbh</b>, diagonal = √(l² + b² + h²).</p>
          <p>Cube of side a: TSA = 6a², lateral = 4a², V = a³, diagonal = a√3.</p>
          <p>Why V = lbh: fill the box with unit cubes — l × b cubes in a layer, h layers.</p>` },
        { h: 'Cross-sections and prisms', html: `<p>Slicing parallel to the base of a prism or cylinder always gives the same shape (the <b>cross-section</b>). So <b>V = cross-section area × height</b> — for any prism, and for a cylinder (πr² × h).</p>` },
        { h: 'Cylinder', html: `<p>Unroll the curved surface: a rectangle 2πr wide and h tall. <b>CSA = 2πrh</b>, <b>TSA = 2πr(r + h)</b>, <b>V = πr²h</b>. Hollow pipe: V = π(R² − r²)h.</p>` },
        { h: 'Cone and sphere', html: `<p><b>Cone</b> (radius r, height h, slant height l = √(r² + h²)): CSA = πrl, TSA = πr(l + r), <b>V = ⅓πr²h</b> — exactly a third of the cylinder with the same base and height.</p>
          <p><b>Sphere</b>: SA = 4πr², V = ${F(4, 3)}πr³. <b>Hemisphere</b>: CSA = 2πr², TSA = 3πr², V = ${F(2, 3)}πr³.</p>
          <p>Archimedes' discovery: cone : sphere : cylinder (radius r, height 2r) = 1 : 2 : 3.</p>` },
        { h: 'Units and estimation', html: `<p>1 m³ = 1000 L, 1 L = 1000 cm³. Scale effect: doubling all lengths multiplies area by 4 and volume by 8.</p>
          <p><b>Estimation</b>: approximate a real object (a tank, a room, a tree trunk) by a cuboid or cylinder, round the measurements, and compute — check that the answer is sensible.</p>` }
      ],
      formulas: [['Cuboid', 'TSA 2(lb + bh + hl), V lbh'], ['Cube', 'TSA 6a², V a³'], ['Cylinder', 'CSA 2πrh, TSA 2πr(r + h), V πr²h'], ['Cone', 'l = √(r² + h²), CSA πrl, V ⅓πr²h'], ['Sphere', 'SA 4πr², V (4/3)πr³'], ['Hemisphere', 'TSA 3πr², V (2/3)πr³'], ['Capacity', '1 m³ = 1000 L']],
      terms: [['Total surface area', 'area of all faces'], ['Curved / lateral surface', 'area excluding top and bottom'], ['Slant height', 'distance from apex to a point on the base circle'], ['Cross-section', 'shape of a slice through a solid']],
      traps: ['Confusing slant height l with height h in a cone.', 'Using diameter for r.', 'Forgetting to convert cm³ to litres (÷ 1000).', 'Adding the area of the joining faces when two solids are stuck together — those faces are hidden.'],
      bridge: '<p>Uses all the area formulas of Ch 6. Irrational π (Ch 3) appears again. Identities (Ch 4) help with hollow solids.</p>'
    },

    explore: [
      {
        title: 'Build a cuboid from unit cubes', intro: 'Each step adds one layer of l × b unit cubes. Volume counts cubes; surface area counts outside faces.',
        build(el, K) {
          let l = 4, w = 3, h = 3; const row = K.row(el);
          const b = new K.Board(el, { xmin: -7, xmax: 7, ymin: -1, ymax: 9, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el);
          const an = new K.Anim(6, () => b.redraw(), { ms: 900 }); an.i = 2;
          K.slider(row, 'l', 1, 6, 1, l, v => { l = v; b.redraw(); }); K.slider(row, 'b', 1, 6, 1, w, v => { w = v; b.redraw(); }); K.slider(row, 'h', 1, 6, 1, h, v => { h = v; an.n = h; if (an.i >= h) an.i = h - 1; b.redraw(); });
          b.onDraw = () => {
            b.clear(); an.n = h; const layers = Math.min(an.i + 1, h), s = Math.min(1.6, 8.5 / (h + (l + w) * 0.5), 6.5 / (Math.max(l, w) * 0.866));
            const cols = [['#dbe6ff', '#a9c1ff', '#7f9ff5'], ['#ffe2cc', '#ffbf94', '#f59a5d']];
            const ord = []; for (let z = 0; z < layers; z++) for (let x = l - 1; x >= 0; x--) for (let y = w - 1; y >= 0; y--) ord.push([x, y, z]);
            ord.forEach(([x, y, z]) => cube(b, x * s, y * s, z * s, s, cols[z % 2]));
            rd.innerHTML = `Layer = ${l} × ${w} = ${l * w} cubes; ${layers} of ${h} layers shown → ${l * w * layers} cubes.` + (layers === h ? `<br><b>V = ${l} × ${w} × ${h} = ${l * w * h}</b> cubic units · <b>TSA = 2(${l}·${w} + ${w}·${h} + ${h}·${l}) = ${2 * (l * w + w * h + h * l)}</b> square units` : '');
          };
          K.anim(el, an); b.redraw(); return an;
        }
      },
      {
        title: 'The painted cube', intro: 'A big n × n × n cube is painted outside and cut into unit cubes. How many have 3, 2, 1 or 0 painted faces?',
        build(el, K) {
          let n = 4, show = 0; const row = K.row(el);
          const b = new K.Board(el, { xmin: -7, xmax: 7, ymin: -1, ymax: 9, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el);
          K.slider(row, 'n', 2, 7, 1, n, v => { n = v; b.redraw(); }); K.select(row, 'Highlight', ['3 faces (corners)', '2 faces (edges)', '1 face (face centres)'], i => { show = i; b.redraw(); });
          b.onDraw = () => {
            b.clear(); const s = 4.2 / n; const want = 3 - show;
            for (let z = 0; z < n; z++) for (let x = n - 1; x >= 0; x--) for (let y = n - 1; y >= 0; y--) {
              const painted = [x === 0 || x === n - 1, y === 0 || y === n - 1, z === 0 || z === n - 1].filter(Boolean).length;
              const hl = painted === want; cube(b, x * s, y * s, z * s, s, hl ? ['#ffbf94', '#f59a5d', '#e07a3a'] : ['#e8edf7', '#cbd5e6', '#b4c0d6']);
            }
            const c3 = 8, c2 = 12 * (n - 2), c1 = 6 * (n - 2) ** 2, c0 = (n - 2) ** 3;
            rd.innerHTML = `n = ${n}: total ${n ** 3} cubes → 3 faces: <b>${c3}</b> (corners) · 2 faces: <b>${c2}</b> = 12(n − 2) · 1 face: <b>${c1}</b> = 6(n − 2)² · 0 faces: <b>${c0}</b> = (n − 2)³ (hidden inside) · check: ${c3} + ${c2} + ${c1} + ${c0} = ${c3 + c2 + c1 + c0}`;
          };
          b.redraw(); return null;
        }
      },
      {
        title: 'Unroll a cylinder', intro: 'Step to cut the curved surface along a straight line and flatten it into a rectangle 2πr × h.',
        build(el, K) {
          let r = 2, h = 4; const row = K.row(el);
          const b = new K.Board(el, { xmin: -1, xmax: 25, ymin: -2, ymax: 8, axes: false, grid: 0, aspect: 0.45 }); const rd = K.read(el);
          const an = new K.Anim(6, () => b.redraw(), { ms: 700 });
          K.slider(row, 'r', 1, 2.5, 0.5, r, v => { r = v; b.redraw(); }); K.slider(row, 'h', 2, 6, 1, h, v => { h = v; b.redraw(); });
          b.onDraw = () => {
            b.clear(); const t = an.i / 5; const cx = 3, base = 0;
            // cylinder (ellipses)
            const ell = (y, dash) => { const c = b.ctx; c.save(); c.beginPath(); c.ellipse(b.X(cx), b.Y(y), b.S(r), b.S(r * 0.3), 0, 0, 2 * Math.PI); c.strokeStyle = C.blue; c.lineWidth = 2.5; if (dash) c.setLineDash([5, 4]); c.stroke(); c.restore(); };
            if (t < 1) { b.rect(cx - r, base, 2 * r, h, { fill: C.blueL, color: 'none' }); ell(base + h); ell(base, true); b.line(cx - r, base, cx - r, base + h, { color: C.blue, w: 2.5 }); b.line(cx + r, base, cx + r, base + h, { color: C.blue, w: 2.5 }); b.line(cx, base, cx, base + h, { color: C.orange, w: 2, dash: [4, 4] }); }
            const W = 2 * Math.PI * r * t, x0 = 7.5; if (t > 0) { b.rect(x0, base, W, h, { fill: C.orangeL, color: C.orange }); b.text(x0 + W / 2, base - 0.7, `width = ${num(t)} × 2πr = ${num(W)}`, { font: 'bold 13px', color: C.orange }); b.text(x0 + W + 0.6, base + h / 2, 'h', { font: 'italic bold 16px' }); }
            rd.innerHTML = t === 0 ? 'Press S (or Play) to cut along the dashed line and unroll.' : t < 1 ? 'Unrolling…' : `Curved surface = rectangle 2πr × h = 2 × ${PI7} × ${r} × ${h} ≈ <b>${num(2 * Math.PI * r * h)}</b> · add two circles (2πr² ≈ ${num(2 * Math.PI * r * r)}) for TSA ≈ <b>${num(2 * Math.PI * r * (r + h))}</b> · V = πr²h ≈ ${num(Math.PI * r * r * h)}`;
          };
          K.anim(el, an); b.redraw(); return an;
        }
      },
      {
        title: "Archimedes' 1 : 2 : 3", intro: 'A cone, a sphere and a cylinder with the same radius r and height 2r. Step to "pour" each into the cylinder.',
        build(el, K) {
          let r = 2; const row = K.row(el); K.slider(row, 'r', 1, 3, 0.5, r, v => { r = v; b.redraw(); });
          const b = new K.Board(el, { xmin: -1, xmax: 21, ymin: -1, ymax: 8, axes: false, grid: 0, aspect: 0.42 }); const rd = K.read(el);
          const an = new K.Anim(4, () => b.redraw(), { ms: 1100 });
          b.onDraw = () => {
            b.clear(); const sc = 3 / r, R_ = r * sc, H = 2 * R_;
            b.poly([[1, 0], [1 + 2 * R_, 0], [1 + R_, H]], { fill: C.purpleL, color: C.purple }); b.text(1 + R_, -0.6, 'cone ⅓πr²(2r)', { font: '12px' });
            b.circle(8.5, R_, R_, { fill: C.orangeL, color: C.orange }); b.text(8.5, -0.6, 'sphere (4/3)πr³', { font: '12px' });
            const x0 = 14, fill = [0, 1 / 3, 2 / 3, 1][an.i];
            b.rect(x0, 0, 2 * R_, H * fill, { fill: C.blueL, color: 'none' }); b.rect(x0, 0, 2 * R_, H, { color: C.blue });
            b.text(x0 + R_, -0.6, 'cylinder πr²(2r)', { font: '12px' });
            const V = (k) => num(k * Math.PI * r ** 3, 1);
            rd.innerHTML = ['Empty cylinder.', 'Pour the cone in: fills <b>⅓</b>.', 'Pour the sphere in instead: fills <b>⅔</b>.', 'Cone + sphere together fill the cylinder exactly!'][an.i] + `<br>Volumes for r = ${r}: cone ${V(2 / 3)}, sphere ${V(4 / 3)}, cylinder ${V(2)} → ratio 1 : 2 : 3`;
          };
          K.anim(el, an); b.redraw(); return an;
        }
      }
    ],

    gens: [
      { title: 'Cuboid: surface area and volume', gen(R, L) {
          const l = R.int(3, 20), w = R.int(2, 15), h = R.int(2, 12);
          if (L === 3) { const rate = R.int(2, 9) * 5; return { q: `A room is ${l} m × ${w} m × ${h} m. Find the cost of painting its four walls and ceiling at ₹${rate} per m² (ignore doors and windows).`, a: `₹${(2 * h * (l + w) + l * w) * rate}`, ans: (2 * h * (l + w) + l * w) * rate, s: `Area = 2h(l + b) + lb = ${2 * h * (l + w)} + ${l * w} = ${2 * h * (l + w) + l * w} m²` }; }
          return { q: `Find the total surface area and volume of a cuboid ${l} cm × ${w} cm × ${h} cm.`, a: `TSA ${2 * (l * w + w * h + h * l)} cm², V ${l * w * h} cm³`, s: `2(${l * w} + ${w * h} + ${h * l}); ${l}×${w}×${h}` };
        } },
      { title: 'Cube from its volume', levels: [1, 2], gen(R) {
          const a = R.int(2, 12); return { q: `The volume of a cube is ${a ** 3} cm³. Find its total surface area.`, a: `${6 * a * a} cm²`, ans: 6 * a * a, s: `a = ∛${a ** 3} = ${a}; 6a²` };
        } },
      { title: 'Painted cube', levels: [2, 3], gen(R) {
          const n = R.int(3, 8), k = R.int(0, 3), v = [(n - 2) ** 3, 6 * (n - 2) ** 2, 12 * (n - 2), 8][k];
          return { q: `A cube of side ${n} cm is painted on all faces and cut into 1 cm cubes. How many small cubes have exactly ${k} face${k === 1 ? '' : 's'} painted?`, a: String(v), ans: v, s: ['inside cubes: (n − 2)³', 'face centres: 6(n − 2)²', 'edges: 12(n − 2)', 'corners: 8'][k] };
        } },
      { title: 'Cylinder', gen(R, L) {
          const r = R.int(1, 4) * 7, h = R.int(2, 20);
          if (L === 1) return { q: `Find the curved surface area of a cylinder of radius ${r} cm and height ${h} cm (π = ${PI7}).`, a: `${44 * r * h / 7} cm²`, ans: 44 * r * h / 7, s: `2 × ${PI7} × ${r} × ${h}` };
          return { q: `A cylindrical tank has radius ${r} cm and height ${h} cm. Find its total surface area and its capacity in litres (π = ${PI7}).`, a: `TSA ${44 * r * (r + h) / 7} cm², capacity ${num(22 * r * r * h / 7 / 1000, 3)} L`, s: `2πr(r + h); V = πr²h = ${22 * r * r * h / 7} cm³ ÷ 1000` };
        } },
      { title: 'Cone', gen(R, L) {
          const T = R.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [7, 24, 25], [8, 15, 17]]); const [r, h, l] = R.chance(.5) ? T : [T[1], T[0], T[2]];
          if (L === 1) return { q: `A cone has radius ${r} cm and height ${h} cm. Find its slant height.`, a: `${l} cm`, ans: l, s: `√(${r}² + ${h}²)` };
          return { q: `A cone has radius ${r} cm and height ${h} cm. Find its curved surface area and volume (leave answers in terms of π).`, a: `CSA ${r * l}π cm², V ${num(r * r * h / 3)}π cm³`, s: `l = ${l}; πrl; ⅓πr²h` };
        } },
      { title: 'Sphere and hemisphere', gen(R, L) {
          const r = R.int(1, 3) * 7, hemi = L >= 2 && R.chance(.5);
          return hemi ? { q: `Find the total surface area and volume of a solid hemisphere of radius ${r} cm (π = ${PI7}).`, a: `TSA ${66 * r * r / 7} cm², V ${num(44 * r ** 3 / 21)} cm³`, s: `3πr²; (2/3)πr³` }
            : { q: `Find the surface area and volume of a sphere of radius ${r} cm (π = ${PI7}).`, a: `SA ${88 * r * r / 7} cm², V ${num(88 * r ** 3 / 21)} cm³`, s: '4πr²; (4/3)πr³' };
        } },
      { title: 'Two cubes joined', levels: [1, 2], gen(R) {
          const a = R.int(2, 10), k = R.int(2, 3);
          return { q: `${k} cubes, each of volume ${a ** 3} cm³, are joined end to end. Find the surface area of the resulting cuboid.`, a: `${2 * (k * a * a + a * a + k * a * a)} cm²`, ans: 2 * (k * a * a + a * a + k * a * a), s: `Cuboid ${k * a} × ${a} × ${a}; 2(lb + bh + hl)` };
        } },
      { title: 'How many boxes fit?', levels: [2, 3], gen(R) {
          const a = R.int(2, 6), b = R.int(2, 6), c = R.int(2, 6), p = R.int(2, 8), q = R.int(2, 8), s = R.int(2, 6);
          return { q: `How many boxes of ${a} cm × ${b} cm × ${c} cm fit (all the same way up) in a carton ${a * p} cm × ${b * q} cm × ${c * s} cm?`, a: String(p * q * s), ans: p * q * s, s: `${p} × ${q} × ${s} (along each edge)` };
        } },
      { title: 'Scaling', levels: [3], gen(R) {
          const k = R.pick([2, 3, 0.5]), sh = R.pick(['sphere', 'cube', 'cylinder (radius and height both)']);
          return { q: `Every length of a ${sh} is multiplied by ${num(k)}. By what factor do its surface area and volume change?`, a: `area × ${num(k * k)}, volume × ${num(k ** 3)}`, s: 'Areas scale by k², volumes by k³.' };
        } },
      { title: 'Melt and recast', levels: [3], gen(R) {
          const r = R.int(2, 6) * 3, n = R.pick([2, 3, 4]), rr = r / ((n) ** (1 / 3));
          if (R.chance(.5)) { const R2 = r, rs = R.pick([1, 2, 3]); const cnt = (R2 / rs) ** 3; return { q: `A metal sphere of radius ${R2} cm is melted and recast into small spheres of radius ${rs} cm. How many small spheres are made?`, a: String(cnt), ans: cnt, s: `(${R2}/${rs})³ since volume ∝ r³` }; }
          const h = (4 / 3) * r ** 3 / (r * r); void rr;
          return { q: `A sphere of radius ${r} cm is melted and recast into a cylinder of the same radius. Find the height of the cylinder.`, a: `${num(h)} cm`, ans: h, s: `πr²h = (4/3)πr³ ⇒ h = (4/3)r` };
        } },
      { title: 'Estimation', levels: [2, 3], gen(R) {
          const l = R.int(15, 40) / 10, w = R.int(10, 25) / 10, d = R.int(8, 20) / 10;
          return { q: `A water tank is about ${l} m long, ${w} m wide and ${d} m deep. Estimate its capacity in litres, then compute it exactly.`, a: `about ${num(Math.round(l * 2) / 2 * Math.round(w * 2) / 2 * Math.round(d * 2) / 2 * 1000, 0)} L (rounding to the nearest 0.5 m); exactly ${num(l * w * d * 1000, 0)} L`, ans: l * w * d * 1000, tol: 5, s: `${l} × ${w} × ${d} = ${num(l * w * d, 3)} m³ × 1000` };
        } }
    ],

    quiz: [
      { q: 'Volume of a cube of side 5 cm', o: ['25 cm³', '125 cm³', '150 cm³', '75 cm³'], a: 1, e: '5³.' },
      { q: 'TSA of a cube of side 4 cm', o: ['64 cm²', '96 cm²', '16 cm²', '48 cm²'], a: 1, e: '6 × 16.' },
      { q: 'Cone with r = 6, h = 8 has slant height', o: ['10', '14', '√28', '12'], a: 0, e: '√(36 + 64).' },
      { q: 'Volume of a cone is what fraction of the cylinder with the same base and height?', o: ['½', '⅓', '⅔', '¼'], a: 1, e: '⅓πr²h.' },
      { q: 'Surface area of a sphere of radius r', o: ['2πr²', '3πr²', '4πr²', 'πr²'], a: 2, e: '4πr².' },
      { q: '1 m³ equals', o: ['100 L', '1000 L', '10 L', '10 000 L'], a: 1, e: '1000 L.' },
      { q: 'If the radius of a sphere is doubled, its volume becomes', o: ['2 times', '4 times', '8 times', '6 times'], a: 2, e: '2³.' },
      { q: 'CSA of a cylinder of radius 7 cm and height 10 cm (π = 22/7)', o: ['440 cm²', '220 cm²', '1540 cm²', '154 cm²'], a: 0, e: '2 × 22/7 × 7 × 10.' },
      { q: 'A 3 × 3 × 3 painted cube is cut into unit cubes. Cubes with no paint:', o: ['0', '1', '6', '8'], a: 1, e: '(3 − 2)³ = 1.' },
      { q: 'TSA of a solid hemisphere of radius r', o: ['2πr²', '3πr²', '4πr²', 'πr²'], a: 1, e: 'Curved 2πr² + flat πr².' },
      { q: 'Cone : sphere : cylinder (radius r, height 2r) volumes are', o: ['1 : 2 : 3', '1 : 3 : 2', '2 : 3 : 4', '1 : 1 : 1'], a: 0, e: 'Archimedes.' }
    ],

    teach: {
      outcomes: ['Distinguish surface area and volume and choose units correctly', 'Derive and use formulas for cuboids, cubes and cylinders (nets, cross-sections)', 'Use formulas for cones, spheres and hemispheres', 'Solve combination, recasting and estimation problems'],
      periods: [
        { t: 'Cuboids and cubes', flow: [['10 min', 'Unfold a cardboard box: net → TSA.'], ['15 min', 'Explore panel 1: unit cubes, V = lbh.'], ['15 min', 'Explore panel 2: painted cube puzzle in groups.']] },
        { t: 'Cylinders and cross-sections', flow: [['10 min', 'Peel the label off a tin: rectangle 2πr × h (Explore panel 3).'], ['15 min', 'V = cross-section × height; capacity in litres.'], ['15 min', 'Practice: Standard.']] },
        { t: 'Cones and spheres', flow: [['10 min', 'Explore panel 4: Archimedes 1 : 2 : 3 (or pour sand from a paper cone into a cylinder).'], ['20 min', 'Formulas and mixed problems; recasting.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Slant height vs height.', 'Diameter used as radius.', 'Hidden faces counted in joined solids.', 'cm³ ↔ L conversion.'],
      activities: ['Nets of boxes and cylinders from old cartons and tins.', 'Paper cone filled with rice poured into a cylinder of the same base and height (three times).', 'Estimate the volume of water in the school tank and compare with its label.'],
      exit: ['Cuboid 5 × 4 × 3: TSA and V?', 'Cylinder r = 7, h = 5: V (π = 22/7)?', 'Sphere r = 3: SA in terms of π?'],
      homework: 'Measure a tin or bottle at home, estimate its capacity, and compare with the printed volume.'
    },

    slides: [
      { t: 'Math of Space: Surface Area and Volume', b: ['Surface area: what you paint', 'Volume: what you fill', 'Cuboid, cylinder, cone, sphere'] },
      { t: 'Cuboid and cube', b: ['TSA = 2(lb + bh + hl), V = lbh', 'Cube: 6a², a³', 'Unit cubes: l × b per layer, h layers'] },
      { t: 'Cross-sections', b: ['Prism/cylinder: same slice all the way up', 'V = cross-section area × height', 'Cylinder: πr²h'] },
      { t: 'Cylinder', b: ['Unroll: rectangle 2πr × h', 'CSA = 2πrh', 'TSA = 2πr(r + h)'] },
      { t: 'Cone and sphere', b: ['Cone: l² = r² + h², CSA πrl, V ⅓πr²h', 'Sphere: 4πr², (4/3)πr³', 'Hemisphere: TSA 3πr², V (2/3)πr³'] },
      { t: "Archimedes' ratio", b: ['Same r, height 2r', 'Cone : sphere : cylinder = 1 : 2 : 3'] },
      { t: 'Units and scale', b: ['1 m³ = 1000 L; 1 L = 1000 cm³', 'Lengths × k ⇒ area × k², volume × k³'] },
      { t: 'Check yourself', b: ['Cube volume 216 → TSA?', 'Cone r = 5, h = 12 → l?', 'Hemisphere r = 7 → TSA?', 'Answers: 216 cm² · 13 · 462 cm²'] }
    ]
  });
})();
