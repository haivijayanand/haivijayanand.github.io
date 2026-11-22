/*
TOOL:    class8_maths_ch07
FAMILY:  CBSE_REVISION / Class 8 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class VIII moved into the series
CHANGES: 1.0.0 - Part I Ch 7 Proportional Reasoning-1 - revise, 2 explore panels (scaling a picture, recipe scaler with Rule of Three), 6 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num, Q, gcd } = G9;

  G9.register({
    no: 7, part: 'Part I', short: 'Proportional reasoning 1', title: 'Proportional Reasoning-1',
    blurb: 'Ratios, equivalent ratios, proportion, scaling pictures and recipes, and the Rule of Three for a missing quantity.',
    revise: {
      oneLine: 'Two ratios a : b and c : d are proportional when a/b = c/d (equivalently ad = bc). Scaling every quantity by the same factor keeps the shape of a picture and the taste of a recipe; the Rule of Three finds a missing fourth term.',
      sections: [
        { h: 'Ratios', html: `<p>a : b compares two quantities of the same kind (same units). Equivalent ratios: multiply or divide both terms by the same number; simplest form divides by the HCF. 12 : 18 = 2 : 3.</p>` },
        { h: 'Proportion', html: `<p>a : b :: c : d means a/b = c/d. <b>Cross product</b>: ad = bc. Extremes a, d; means b, c.</p>
          <p>A photo 4 cm × 6 cm enlarged to 10 cm wide keeps its shape only if the height becomes 15 cm (×2.5 on both sides).</p>` },
        { h: 'Rule of Three', html: `<p>If a gives b, then c gives b × c / a. Example: 4 kg rice costs ₹240, so 7 kg costs 240 × 7/4 = ₹420. Check: the answer should change in the same direction as the quantity.</p>` }
      ],
      formulas: [['Ratio', 'a : b = a/b'], ['Simplest form', 'divide by HCF'], ['Proportion', 'a : b :: c : d ⇔ ad = bc'], ['Rule of Three', 'x = b × c / a'], ['Scale factor', 'new / old']],
      terms: [['Ratio', 'comparison by division'], ['Proportion', 'equality of two ratios'], ['Scale factor', 'multiplier for every length'], ['Unitary method', 'find the value for one unit first']],
      traps: ['Comparing quantities in different units without converting.', 'Adding the same amount to both terms does not keep the ratio.', 'Order matters: 2 : 3 ≠ 3 : 2.', 'Scaling only one side distorts the shape.'],
      bridge: '<p>Ch 10 (Proportional Reasoning-2) adds maps, sharing, pie charts and inverse proportion; Ch 8 (Fractions in Disguise) writes ratios as percentages.</p>'
    },

    explore: [
      {
        title: 'Scale a picture', intro: 'Change width and height. If both use the same factor, the face keeps its shape; otherwise it stretches.',
        build(el, K) {
          let w = 4, h = 6; const row = K.row(el); K.slider(row, 'width', 1, 12, 0.5, w, v => { w = v; bd.redraw(); }); K.slider(row, 'height', 1, 12, 0.5, h, v => { h = v; bd.redraw(); });
          const bd = new K.Board(el, { xmin: -1, xmax: 22, ymin: -1, ymax: 13, axes: false, grid: 1 }); const rd = K.read(el);
          const face = (x0, W, H, col) => { bd.rect(x0, 0, W, H, { color: col, w: 2 }); const cx = bd.ctx; const ell = (x, y, rx, ry) => { cx.beginPath(); cx.ellipse(bd.X(x0 + x * W), bd.Y(y * H), Math.abs(rx * W * (bd.X(1) - bd.X(0))), Math.abs(ry * H * (bd.Y(0) - bd.Y(1))), 0, 0, 7); cx.strokeStyle = col; cx.lineWidth = 2; cx.stroke(); };
            ell(0.5, 0.5, 0.42, 0.42); ell(0.35, 0.6, 0.06, 0.06); ell(0.65, 0.6, 0.06, 0.06); bd.line(x0 + 0.35 * W, 0.3 * H, x0 + 0.65 * W, 0.3 * H, { color: col, w: 2 }); };
          bd.onDraw = () => { bd.clear(); face(0, 4, 6, C.blue); face(7, w, h, C.orange); const kw = w / 4, kh = h / 6;
            rd.innerHTML = `original 4 × 6 (ratio 2 : 3) · new ${num(w)} × ${num(h)} (ratio ${num(w / h * 3, 2)} : 3) · factors ×${num(kw, 3)} and ×${num(kh, 3)} ⇒ <b>${Math.abs(kw - kh) < 1e-9 ? 'in proportion: same shape' : 'not in proportion: stretched'}</b>`; };
          bd.redraw(); return null;
        }
      },
      {
        title: 'Recipe scaler (Rule of Three)', intro: 'A recipe serves 4. Choose how many people; every ingredient is multiplied by the same factor.',
        build(el, K) {
          let p = 6; const row = K.row(el); K.slider(row, 'people', 1, 20, 1, p, v => { p = v; draw(); }); const rd = K.read(el);
          const ing = [['rice (g)', 300], ['dal (g)', 120], ['water (ml)', 900], ['salt (tsp)', 2], ['ghee (tbsp)', 3]];
          function draw() { rd.innerHTML = `factor ${p}/4 = ${num(p / 4, 3)}<table class="t" style="width:auto"><tr><th>ingredient</th><th>for 4</th><th>for ${p}</th></tr>${ing.map(([n, v]) => `<tr><td>${n}</td><td>${v}</td><td><b>${num(v * p / 4, 2)}</b></td></tr>`).join('')}</table>Rule of Three: 4 people → 300 g, so ${p} people → 300 × ${p}/4 = ${num(300 * p / 4, 2)} g · ratio rice : dal stays 300 : 120 = 5 : 2`; }
          draw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Simplest form', levels: [1, 2], gen(R) {
          const a = R.int(1, 12), b = R.int(1, 12), k = R.int(2, 15); const g = gcd(a, b);
          return { q: `Write ${a * k} : ${b * k} in simplest form.`, a: `${a / g} : ${b / g}` };
        } },
      { title: 'Ratio with units', gen(R) {
          const t = R.int(0, 2);
          if (t === 0) { const m = R.int(20, 90), cm = R.int(10, 99); const g = gcd(m * 100, cm); return { q: `Find the ratio of ${m} m to ${cm} cm.`, a: `${m * 100 / g} : ${cm / g}`, s: 'convert to cm first' }; }
          if (t === 1) { const h = R.int(1, 4), mi = R.int(10, 50); const g = gcd(h * 60, mi); return { q: `Find the ratio of ${h} hours to ${mi} minutes.`, a: `${h * 60 / g} : ${mi / g}` }; }
          const kg = R.int(2, 9), g2 = R.int(100, 900); const g = gcd(kg * 1000, g2); return { q: `Find the ratio of ${kg} kg to ${g2} g.`, a: `${kg * 1000 / g} : ${g2 / g}` };
        } },
      { title: 'Are they in proportion?', gen(R) {
          const a = R.int(2, 12), b = R.int(2, 12), k = R.int(2, 6); const yes = R.chance(.5); const c = a * k, d = yes ? b * k : b * k + R.nz(-3, 3);
          return { q: `Are ${a}, ${b}, ${c}, ${d} in proportion?`, a: yes ? `yes (${a} × ${d} = ${b} × ${c} = ${a * d})` : `no (${a} × ${d} = ${a * d}, ${b} × ${c} = ${b * c})` };
        } },
      { title: 'Find the missing term', gen(R) {
          const a = R.int(2, 12), b = R.int(2, 12), k = R.int(2, 8); return { q: `Find x: ${a} : ${b} = ${a * k} : x.`, a: `x = ${b * k}`, ans: b * k, s: 'cross product' };
        } },
      { title: 'Rule of Three', gen(R) {
          const t = R.int(0, 2);
          if (t === 0) { const kg = R.int(2, 9), price = R.int(30, 120) * kg, n = R.int(2, 15); return { q: `${kg} kg of sugar costs ₹${price}. How much do ${n} kg cost?`, a: `₹${num(price * n / kg, 2)}`, ans: price * n / kg }; }
          if (t === 1) { const km = R.int(100, 400), l = R.int(5, 25), L = R.int(3, 40); return { q: `A car goes ${km} km on ${l} litres of petrol. How far on ${L} litres?`, a: `${num(km * L / l, 2)} km`, ans: km * L / l }; }
          const p = R.int(3, 8), pages = R.int(20, 60) * p, h = R.int(2, 12); return { q: `A printer prints ${pages} pages in ${p} minutes. How many pages in ${h} minutes?`, a: String(pages * h / p), ans: pages * h / p };
        } },
      { title: 'Scaling a figure', levels: [2, 3], gen(R) {
          const w = R.int(2, 9), h = R.int(2, 9), W = w * R.pick([2, 3, 1.5, 2.5]);
          return { q: `A ${w} cm × ${h} cm photo is enlarged so that its width becomes ${num(W)} cm. What should the height be to keep its shape?`, a: `${num(h * W / w, 2)} cm`, ans: h * W / w, s: `scale factor ${num(W / w)}` };
        } }
    ],

    quiz: [
      { q: '15 : 25 in simplest form', o: ['3 : 5', '5 : 3', '1 : 2', '15 : 25'], a: 0, e: 'Divide by 5.' },
      { q: 'Are 3, 4, 9, 12 in proportion?', o: ['yes', 'no', 'only 3 and 9', 'cannot tell'], a: 0, e: '36 = 36.' },
      { q: '2 : 5 = 6 : x ⇒ x =', o: ['15', '12', '10', '18'], a: 0, e: 'Cross product.' },
      { q: '5 pens cost ₹40; 8 pens cost', o: ['₹64', '₹72', '₹48', '₹56'], a: 0, e: '40 × 8/5.' },
      { q: 'Ratio of 50 cm to 2 m', o: ['1 : 4', '25 : 1', '1 : 25', '4 : 1'], a: 0, e: '50 : 200.' },
      { q: 'Enlarging 3 × 5 to width 6 needs height', o: ['10', '8', '5', '11'], a: 0, e: '×2.' },
      { q: 'Adding 2 to both terms of 1 : 2 gives', o: ['3 : 4 (a different ratio)', '1 : 2', '2 : 4', '3 : 6'], a: 0, e: 'Adding changes the ratio.' },
      { q: 'In a : b :: c : d, the extremes are', o: ['a and d', 'b and c', 'a and b', 'c and d'], a: 0, e: 'Outer terms.' },
      { q: 'Recipe for 4 needs 200 g; for 10 needs', o: ['500 g', '800 g', '400 g', '250 g'], a: 0, e: '×2.5.' },
      { q: 'Equivalent to 4 : 7', o: ['12 : 21', '8 : 12', '7 : 4', '4 : 14'], a: 0, e: '×3.' },
      { q: 'A ratio compares quantities', o: ['of the same kind', 'of any kinds', 'only whole numbers', 'only money'], a: 0, e: 'Same units.' }
    ],

    teach: {
      outcomes: ['Write ratios in simplest form with consistent units', 'Test proportionality using cross products', 'Use the Rule of Three', 'Scale pictures and recipes'],
      periods: [
        { t: 'Ratios', flow: [['10 min', 'Lemonade taste test: same ratio, same taste.'], ['15 min', 'Equivalent ratios, units.'], ['15 min', 'Practice.']] },
        { t: 'Proportion and scaling', flow: [['15 min', 'Explore panel 1: stretched faces.'], ['15 min', 'Explore panel 2 and the Rule of Three.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Additive thinking.', 'Mixed units.', 'Order of terms.'],
      activities: ['Enlarge a drawing on grid paper.', 'Scale a class recipe for a party.'],
      exit: ['Simplify 36 : 48.', 'Find x: 3 : 8 = x : 40.', '6 kg cost ₹270; cost of 10 kg?'],
      homework: 'A map shows 2 cm for 5 km. Two towns are 13 cm apart on the map. How far apart are they? Make your own recipe card for 4 people and scale it for 10.'
    },

    slides: [
      { t: 'Proportional Reasoning-1', b: ['Ratios', 'Proportion', 'Scaling', 'Rule of Three'] },
      { t: 'Proportion', b: ['a : b :: c : d ⇔ ad = bc', 'Same factor on every quantity'] },
      { t: 'Rule of Three', b: ['a → b, then c → b × c / a', 'Check direction of change'] },
      { t: 'Check yourself', b: ['Are 4, 6, 10, 15 in proportion?', 'Answer: yes (60 = 60)'] }
    ],

    fs: { groups: [
        ['Ratio', [['a : b', 'a/b, same units'], ['Simplest form', 'divide by HCF'], ['Equivalent', 'multiply both by k']]],
        ['Proportion', [['a : b :: c : d', 'a/b = c/d'], ['Cross product', 'ad = bc'], ['Missing term', 'x = bc/a']]],
        ['Scaling', [['Scale factor', 'new length / old length'], ['Keeps shape', 'same factor for every length'], ['Recipe', 'every ingredient × factor']]],
        ['Rule of Three', [['Statement', 'a gives b ⇒ c gives bc/a'], ['Unitary', 'value of 1, then of c']]]],
      ex: [['8 : 12 :: 6 : x', 'x = 9'], ['3 m cloth ₹450; 7 m', '₹1050']],
      rem: ['Convert units first.', 'Multiply, never add, to scale.', 'Check that the answer makes sense.'] }
  });
})();
