/*
TOOL:    class8_maths_ch14
FAMILY:  CBSE_REVISION / Class 8 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class VIII moved into the series
CHANGES: 1.0.0 - Part II Ch 7 Area - revise, 2 explore panels (parallelogram to rectangle, area formulas for triangle/trapezium/rhombus), 6 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num } = G9;

  G9.register({
    no: 14, part: 'Part II', short: 'Area', title: 'Area',
    blurb: '(Part II Ch 7) Why area formulas work: rectangles, parallelograms, triangles, trapeziums, rhombuses and kites by cutting and rearranging, and areas of composite shapes.',
    revise: {
      oneLine: 'Cut a shape and move the pieces: area does not change. A parallelogram becomes a rectangle (base × height), a triangle is half a parallelogram, a trapezium is half of a parallelogram made from two copies, and a rhombus or kite is half the rectangle on its diagonals.',
      sections: [
        { h: 'Rectangles and parallelograms', html: `<p>Rectangle: length × breadth. Parallelogram: cut the triangle off one end and attach it to the other — a rectangle with the same base and height: <b>A = b × h</b> (h is perpendicular height, not the slant side).</p>` },
        { h: 'Triangles', html: `<p>Two copies of a triangle make a parallelogram: <b>A = ½ b h</b>. Triangles on the same base and between the same parallels have equal area.</p>` },
        { h: 'Trapezium, rhombus, kite', html: `<p>Trapezium: two copies make a parallelogram with base (a + b): <b>A = ½ (a + b) h</b>. Rhombus or kite with diagonals d₁, d₂: <b>A = ½ d₁ d₂</b> (half the surrounding rectangle).</p>` },
        { h: 'Composite shapes', html: `<p>Split into rectangles, triangles and trapeziums, or subtract a cut-out from a larger shape. Units: cm², m²; 1 m² = 10 000 cm², 1 hectare = 10 000 m².</p>` }
      ],
      formulas: [['Rectangle', 'l × b'], ['Parallelogram', 'b × h'], ['Triangle', '½ b h'], ['Trapezium', '½ (a + b) h'], ['Rhombus / kite', '½ d₁ d₂'], ['1 m²', '10 000 cm²']],
      terms: [['Height (altitude)', 'perpendicular distance to the base'], ['Parallel sides', 'a and b of a trapezium'], ['Composite figure', 'made of simpler shapes'], ['Hectare', '10 000 m²']],
      traps: ['Using the slant side as the height.', 'Forgetting the ½ for triangles and trapeziums.', 'Mixing cm and m.', 'Rhombus area is not side².'],
      bridge: '<p>Class 9 Ch 6 (Measuring Space) adds Heron\'s formula; Class 9 Ch 14 moves to surface area and volume.</p>'
    },

    explore: [
      {
        title: 'Parallelogram → rectangle', intro: 'Press <kbd>P</kbd>: the left triangle slides to the right end, turning the parallelogram into a rectangle of the same base and height.',
        build(el, K) {
          let bs = 6, h = 3, s = 2; const row = K.row(el); K.slider(row, 'base', 3, 9, 0.5, bs, v => { bs = v; an.reset(); }); K.slider(row, 'height', 1, 5, 0.5, h, v => { h = v; an.reset(); }); K.slider(row, 'slant offset', 0.5, 3, 0.5, s, v => { s = v; an.reset(); });
          const b = new K.Board(el, { xmin: -1, xmax: 14, ymin: -1, ymax: 6.5, axes: false, grid: 1 }); const rd = K.read(el); const an = new K.Anim(20, () => b.redraw(), { ms: 60 });
          b.onDraw = () => { b.clear(); const t = an.i / 20; b.poly([[s, 0], [bs, 0], [bs + s, h], [s, h]], { fill: C.blueL, color: C.blue, w: 2 }); const dx = bs * t; b.poly([[0 + dx, 0], [s + dx, 0], [s + dx, h]], { fill: 'rgba(234,88,12,.4)', color: C.orange, w: 2 });
            if (t === 0) b.poly([[0, 0], [bs, 0], [bs + s, h], [s, h]], { color: C.ink, w: 3 }); b.line(s, 0, s, h, { color: C.purple, w: 2, dash: [5, 4] });
            rd.innerHTML = `base ${num(bs)}, height ${num(h)} · ${t < 1 ? 'moving the triangle…' : 'now a rectangle'} · area = b × h = <b>${num(bs * h)}</b> (the slant side ${num(Math.hypot(s, h), 2)} is not used)`; };
          K.anim(el, an); b.redraw(); return an;
        }
      },
      {
        title: 'Area formulas side by side', intro: 'Choose a shape and set its measurements. The doubled copy (dashed) shows where each ½ comes from.',
        build(el, K) {
          let k = 1, a = 6, c = 3, h = 4; const row = K.row(el); K.select(row, 'shape', ['triangle', 'trapezium', 'rhombus'], i => { k = i; bd.redraw(); });
          K.slider(row, 'a / d₁', 2, 8, 0.5, a, v => { a = v; bd.redraw(); }); K.slider(row, 'b / d₂', 1, 7, 0.5, c, v => { c = v; bd.redraw(); }); K.slider(row, 'h', 1, 5, 0.5, h, v => { h = v; bd.redraw(); });
          const bd = new K.Board(el, { xmin: -1, xmax: 17, ymin: -1, ymax: 8, axes: false, grid: 1 }); const rd = K.read(el);
          bd.onDraw = () => { bd.clear();
            if (k === 0) { bd.poly([[0, 0], [a, 0], [1.5, h]], { fill: C.blueL, color: C.blue, w: 3 }); bd.poly([[a, 0], [a + 1.5, h], [1.5, h]], { color: C.orange, w: 2, dash: [6, 4] }); rd.innerHTML = `triangle + its copy = parallelogram of area ${num(a)} × ${num(h)} ⇒ triangle = ½ × ${num(a)} × ${num(h)} = <b>${num(a * h / 2)}</b>`; }
            if (k === 1) { const off = (a - c) / 2; bd.poly([[0, 0], [a, 0], [off + c, h], [off, h]], { fill: C.blueL, color: C.blue, w: 3 }); bd.poly([[a, 0], [a + c, 0], [a + c - off, h], [off + c, h]].map(p => p), { color: C.orange, w: 2, dash: [6, 4] });
              rd.innerHTML = `two trapeziums make a parallelogram with base a + b = ${num(a + c)} ⇒ area = ½ (${num(a)} + ${num(c)}) × ${num(h)} = <b>${num((a + c) * h / 2)}</b>`; }
            if (k === 2) { const cx = a / 2 + 1, cy = c / 2 + 1; bd.rect(1, 1, a, c, { color: C.orange, w: 2, dash: [6, 4] }); bd.poly([[1, cy], [cx, 1], [1 + a, cy], [cx, 1 + c]], { fill: C.blueL, color: C.blue, w: 3 }); bd.line(1, cy, 1 + a, cy, { color: C.purple, w: 2 }); bd.line(cx, 1, cx, 1 + c, { color: C.purple, w: 2 });
              rd.innerHTML = `rhombus fills half of the ${num(a)} × ${num(c)} rectangle on its diagonals ⇒ area = ½ × ${num(a)} × ${num(c)} = <b>${num(a * c / 2)}</b>`; }
          };
          bd.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Parallelogram and triangle', gen(R) {
          const b = R.int(4, 20), h = R.int(3, 15), t = R.int(0, 1);
          return t ? { q: `Find the area of a triangle with base ${b} cm and height ${h} cm.`, a: `${num(b * h / 2)} cm²`, ans: b * h / 2 } : { q: `Find the area of a parallelogram with base ${b} cm and height ${h} cm.`, a: `${b * h} cm²`, ans: b * h };
        } },
      { title: 'Trapezium', gen(R) {
          const a = R.int(6, 25), b = R.int(3, a - 1), h = R.int(3, 15); return { q: `The parallel sides of a trapezium are ${a} m and ${b} m and the distance between them is ${h} m. Find its area.`, a: `${num((a + b) * h / 2)} m²`, ans: (a + b) * h / 2 };
        } },
      { title: 'Rhombus and kite', gen(R) {
          const d1 = R.int(4, 24), d2 = R.int(4, 24); return { q: `Find the area of a ${R.pick(['rhombus', 'kite'])} whose diagonals are ${d1} cm and ${d2} cm.`, a: `${num(d1 * d2 / 2)} cm²`, ans: d1 * d2 / 2 };
        } },
      { title: 'Find the missing measure', levels: [2, 3], gen(R) {
          const t = R.int(0, 2);
          if (t === 0) { const b = R.int(4, 16), h = R.int(3, 12); return { q: `A triangle has area ${b * h / 2} cm² and base ${b} cm. Find its height.`, a: `${h} cm`, ans: h }; }
          if (t === 1) { const a = R.int(8, 20), b = R.int(4, a - 1), h = R.int(2, 10) * 2; return { q: `A trapezium of area ${(a + b) * h / 2} cm² has parallel sides ${a} cm and ${b} cm. Find its height.`, a: `${h} cm`, ans: h }; }
          const d1 = R.int(4, 20), d2 = R.int(2, 10) * 2; return { q: `A rhombus has area ${d1 * d2 / 2} cm² and one diagonal ${d1} cm. Find the other.`, a: `${d2} cm`, ans: d2 };
        } },
      { title: 'Composite shapes', levels: [2, 3], gen(R) {
          const L = R.int(10, 30), W = R.int(8, 20), p = R.int(1, 3); const t = R.int(0, 1);
          if (t === 0) return { q: `A rectangular garden ${L} m × ${W} m has a path ${p} m wide inside it along all edges. Find the area of the path.`, a: `${L * W - (L - 2 * p) * (W - 2 * p)} m²`, ans: L * W - (L - 2 * p) * (W - 2 * p), s: `${L}×${W} − ${L - 2 * p}×${W - 2 * p}` };
          const h = R.int(3, 10); return { q: `A shape is a ${L} cm × ${W} cm rectangle with a triangle of base ${W} cm and height ${h} cm on one short side. Find its total area.`, a: `${L * W + W * h / 2} cm²`, ans: L * W + W * h / 2 };
        } },
      { title: 'Units', levels: [1], gen(R) {
          const t = R.int(0, 2), n = R.int(2, 90);
          if (t === 0) return { q: `Convert ${n} m² to cm².`, a: `${(n * 10000).toLocaleString('en-IN')} cm²`, ans: n * 10000 };
          if (t === 1) return { q: `Convert ${n * 10000} m² to hectares.`, a: `${n} ha`, ans: n };
          return { q: `Convert ${n * 100} mm² to cm².`, a: `${n} cm²`, ans: n };
        } }
    ],

    quiz: [
      { q: 'Area of a parallelogram', o: ['b × h', '½ b h', 'b × slant side', '2(b + h)'], a: 0, e: 'Rearrange into a rectangle.' },
      { q: 'Triangle base 10, height 6', o: ['30', '60', '16', '15'], a: 0, e: '½ × 60.' },
      { q: 'Trapezium a = 8, b = 4, h = 5', o: ['30', '60', '17', '40'], a: 0, e: '½ × 12 × 5.' },
      { q: 'Rhombus with diagonals 10 and 12', o: ['60', '120', '22', '30'], a: 0, e: '½ × 120.' },
      { q: '1 m² =', o: ['10 000 cm²', '100 cm²', '1000 cm²', '1 000 000 cm²'], a: 0, e: '100 × 100.' },
      { q: 'Height in area formulas is', o: ['perpendicular to the base', 'the slant side', 'the longest side', 'any side'], a: 0, e: 'Altitude.' },
      { q: 'Two copies of a triangle make a', o: ['parallelogram', 'circle', 'pentagon', 'trapezium only'], a: 0, e: 'Hence ½.' },
      { q: '1 hectare =', o: ['10 000 m²', '1000 m²', '100 m²', '1 km²'], a: 0, e: 'Definition.' },
      { q: 'Triangles on the same base between the same parallels have', o: ['equal areas', 'equal perimeters', 'equal sides', 'no relation'], a: 0, e: 'Same b and h.' },
      { q: 'Area 48, base 8 ⇒ parallelogram height', o: ['6', '12', '4', '40'], a: 0, e: '48/8.' },
      { q: 'Kite area uses', o: ['the diagonals', 'the sides', 'the angles', 'the perimeter'], a: 0, e: '½ d₁ d₂.' }
    ],

    teach: {
      outcomes: ['Derive area formulas by cutting and rearranging', 'Find areas of parallelograms, triangles, trapeziums, rhombuses and kites', 'Find missing measurements', 'Compute areas of composite shapes'],
      periods: [
        { t: 'Rearranging', flow: [['10 min', 'Cut a paper parallelogram into a rectangle.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Triangles: half a parallelogram.']] },
        { t: 'More shapes', flow: [['15 min', 'Explore panel 2: trapezium and rhombus.'], ['15 min', 'Missing measures, composite shapes.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Slant height used.', 'Missing ½.', 'Unit mix-ups.'],
      activities: ['Paper cutting proofs for each formula.', 'Measure the school garden and compute its area.'],
      exit: ['Triangle b = 14, h = 9.', 'Trapezium 10, 6, h 4.', 'Rhombus diagonals 8, 15.'],
      homework: 'Find the area of a field shaped like a trapezium with parallel sides 120 m and 80 m, 50 m apart, in hectares. Draw your room plan and find its floor area.'
    },

    slides: [
      { t: 'Area', b: ['Parallelogram → rectangle', 'Triangle = half a parallelogram', 'Trapezium, rhombus, kite', 'Composite shapes'] },
      { t: 'Formulas', b: ['b × h', '½ b h', '½ (a + b) h', '½ d₁ d₂'] },
      { t: 'Composite shapes', b: ['Split into simple shapes', 'Or subtract a cut-out', 'Keep units consistent'] },
      { t: 'Check yourself', b: ['Trapezium 9, 5, h 6?', 'Answer: 42'] }
    ],

    fs: { groups: [
        ['Basic shapes', [['Rectangle', 'l × b'], ['Square', 's²'], ['Parallelogram', 'b × h'], ['Triangle', '½ b h']]],
        ['Other quadrilaterals', [['Trapezium', '½ (a + b) h'], ['Rhombus', '½ d₁ d₂'], ['Kite', '½ d₁ d₂']]],
        ['Missing measures', [['h of triangle', '2A/b'], ['h of trapezium', '2A/(a + b)'], ['Other diagonal', '2A/d₁']]],
        ['Units', [['1 cm²', '100 mm²'], ['1 m²', '10 000 cm²'], ['1 hectare', '10 000 m²']]]],
      ex: [['Trapezium 15, 9, h 8', '½ × 24 × 8 = 96'], ['Path 1 m inside 12 × 8 garden', '96 − 60 = 36 m²']],
      rem: ['Height ⊥ base.', 'Halve for triangles and trapeziums.', 'Convert units first.'] }
  });
})();
