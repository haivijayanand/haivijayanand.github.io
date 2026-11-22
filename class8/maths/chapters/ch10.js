/*
TOOL:    class8_maths_ch10
FAMILY:  CBSE_REVISION / Class 8 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class VIII moved into the series
CHANGES: 1.0.0 - Part II Ch 3 Proportional Reasoning-2 - revise, 2 explore panels (sharing in a ratio with a pie chart, inverse proportion), 6 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num, Q, gcd } = G9;

  G9.register({
    no: 10, part: 'Part II', short: 'Proportional reasoning 2', title: 'Proportional Reasoning-2',
    blurb: '(Part II Ch 3) Map scales, ratios with three or more terms, dividing a whole in a ratio, pie charts, and inverse proportion.',
    revise: {
      oneLine: 'A ratio a : b : c splits a whole into a + b + c equal parts. Map scales and pie charts are ratios in disguise. In inverse proportion one quantity rises as the other falls, keeping the product constant.',
      sections: [
        { h: 'Scales and maps', html: `<p>Scale 1 : 50 000 means 1 cm on the map is 50 000 cm = 0.5 km on the ground. Real distance = map distance × scale factor.</p>` },
        { h: 'Many-term ratios and sharing', html: `<p>a : b : c. To divide N in the ratio a : b : c: total parts a + b + c; shares N·a/(a + b + c), N·b/(a + b + c), N·c/(a + b + c).</p>
          <p>Combining: if a : b = 2 : 3 and b : c = 4 : 5, make b the same: 8 : 12 : 15.</p>` },
        { h: 'Pie charts', html: `<p>Each sector angle = (value/total) × 360°. A sector of 90° is a quarter of the data.</p>` },
        { h: 'Inverse proportion', html: `<p>x and y are inversely proportional if xy = k (constant): doubling x halves y. Example: 12 workers take 10 days ⇒ 15 workers take 12 × 10/15 = 8 days (same total work). Speed × time = distance (fixed).</p>` }
      ],
      formulas: [['Map scale 1 : n', 'real = map × n'], ['Share in a : b : c', 'N·a/(a + b + c), …'], ['Sector angle', 'value/total × 360°'], ['Direct', 'y/x = k'], ['Inverse', 'xy = k'], ['Workers–days', 'w₁d₁ = w₂d₂']],
      terms: [['Scale', 'ratio of map length to real length'], ['Sector', 'slice of a pie chart'], ['Inverse proportion', 'product stays constant'], ['Continued ratio', 'a : b : c']],
      traps: ['Treating inverse situations as direct (more workers ⇒ fewer days).', 'Forgetting unit conversion with map scales.', 'Combining ratios without matching the common term.', 'Pie angles must total 360°.'],
      bridge: '<p>Continues Ch 7. Pie charts are data displays (Ch 12). Class 10 Ch 3 uses inverse proportion in linear equation word problems.</p>'
    },

    explore: [
      {
        title: 'Share in a ratio — and draw the pie', intro: 'Set the amount and the ratio a : b : c. The shares and the pie-chart angles update.',
        build(el, K) {
          let N = 1200, a = 2, b = 3, c = 5; const row = K.row(el); K.slider(row, 'amount', 100, 5000, 100, N, v => { N = v; bd.redraw(); });
          [['a', v => a = v, a], ['b', v => b = v, b], ['c', v => c = v, c]].forEach(s => K.slider(row, s[0], 1, 9, 1, s[2], v => { s[1](v); bd.redraw(); }));
          const bd = new K.Board(el, { xmin: -6, xmax: 6, ymin: -4, ymax: 4, axes: false, grid: 0 }); const rd = K.read(el);
          bd.onDraw = () => { bd.clear(); const T = a + b + c; let t0 = Math.PI / 2; const cols = [C.blue, C.orange, C.purple]; [a, b, c].forEach((v, i) => { const t1 = t0 - v / T * 2 * Math.PI; bd.arc(0, 0, 3.3, t1, t0, { sector: true, fill: cols[i] + '55', color: cols[i], w: 2 }); const m = (t0 + t1) / 2; bd.text(2 * Math.cos(m), 2 * Math.sin(m), ['A', 'B', 'C'][i], { font: 'bold 16px' }); t0 = t1; });
            rd.innerHTML = `${a} : ${b} : ${c} → ${T} parts of ${num(N / T, 2)} each · shares A ${num(N * a / T, 2)}, B ${num(N * b / T, 2)}, C ${num(N * c / T, 2)} · angles ${[a, b, c].map(v => num(v / T * 360, 1) + '°').join(', ')}`; };
          bd.redraw(); return null;
        }
      },
      {
        title: 'Inverse proportion: workers and days', intro: 'A job takes 120 worker-days. Change the number of workers; the point slides along the curve xy = 120.',
        build(el, K) {
          let w = 10; const row = K.row(el); K.slider(row, 'workers', 2, 40, 1, w, v => { w = v; b.redraw(); });
          const b = new K.Board(el, { xmin: -2, xmax: 44, ymin: -5, ymax: 65, equal: false }); const rd = K.read(el);
          b.onDraw = () => { b.base(); b.fn(x => x < 1.8 ? NaN : 120 / x, { color: C.blue, w: 3 }); const d = 120 / w; b.rect(0, 0, w, d, { fill: 'rgba(234,88,12,.18)', color: C.orange, w: 2 }); b.dot(w, d, { color: C.orange, r: 6 });
            rd.innerHTML = `${w} workers × ${num(d, 2)} days = 120 worker-days (the orange rectangle always has area 120) · double the workers ⇒ half the days`; };
          b.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Map scale', gen(R) {
          const s = R.pick([10000, 25000, 50000, 100000, 200000]), d = R.int(2, 20) / 2; return { q: `On a map of scale 1 : ${s.toLocaleString('en-IN')}, two towns are ${num(d)} cm apart. Find the real distance in km.`, a: `${num(d * s / 100000, 3)} km`, ans: d * s / 100000, s: `${num(d)} × ${s} cm` };
        } },
      { title: 'Divide in a ratio', gen(R) {
          const r = [R.int(1, 6), R.int(1, 6), R.int(1, 6)], k = R.int(10, 200); const T = r[0] + r[1] + r[2]; const N = T * k;
          return { q: `Divide ₹${N} among three friends in the ratio ${r.join(' : ')}.`, a: r.map(v => `₹${v * k}`).join(', '), s: `${T} parts of ₹${k}` };
        } },
      { title: 'Combine ratios', levels: [2, 3], gen(R) {
          const a = R.int(1, 6), b = R.int(2, 7), c = R.int(2, 7), d = R.int(1, 7); const l = b * c / gcd(b, c); const A = a * l / b, B = l, Cc = d * l / c; const g = gcd(gcd(A, B), Cc);
          return { q: `If A : B = ${a} : ${b} and B : C = ${c} : ${d}, find A : B : C.`, a: `${A / g} : ${B / g} : ${Cc / g}`, s: `make B = ${l}` };
        } },
      { title: 'Pie chart angles', gen(R) {
          const cats = R.shuffle(['Rent', 'Food', 'Travel', 'Savings', 'Fees']).slice(0, 4); let vals = cats.map(() => R.int(1, 8) * 5); const T = vals.reduce((x, y) => x + y, 0);
          return { q: `Monthly spending (₹ hundreds): ${cats.map((c, i) => `${c} ${vals[i]}`).join(', ')}. Find the pie-chart angle of each.`, a: cats.map((c, i) => `${c} ${num(vals[i] / T * 360, 1)}°`).join(', '), s: `angle = value/${T} × 360°` };
        } },
      { title: 'Inverse proportion', gen(R) {
          const t = R.int(0, 1);
          if (t === 0) { const w1 = R.int(4, 20), d1 = R.int(6, 30), w2 = R.pick([2, 3, 4, 5, 6, 8, 10, 12, 15, 24].filter(x => (w1 * d1) % x === 0 && x !== w1)) || w1 * 2; return { q: `${w1} workers finish a job in ${d1} days. How long will ${w2} workers take?`, a: `${num(w1 * d1 / w2, 2)} days`, ans: w1 * d1 / w2, s: `${w1} × ${d1} = ${w2} × d` }; }
          const v1 = R.int(4, 12) * 10, t1 = R.int(2, 6), v2 = R.int(4, 12) * 10; return { q: `At ${v1} km/h a trip takes ${t1} h. How long at ${v2} km/h?`, a: `${num(v1 * t1 / v2, 3)} h`, ans: v1 * t1 / v2 };
        } },
      { title: 'Direct or inverse?', levels: [1], gen(R) {
          const items = [['number of pens and their total cost', 'direct'], ['speed and time for a fixed distance', 'inverse'], ['number of workers and days to finish a job', 'inverse'], ['distance travelled and petrol used', 'direct'], ['number of children and share of a fixed cake each gets', 'inverse'], ['length of cloth and its cost', 'direct']];
          const [q, a] = R.pick(items); return { q: `Are these in direct or inverse proportion: ${q}?`, a };
        } }
    ],

    quiz: [
      { q: 'Scale 1 : 100 000, map 3 cm ⇒ real', o: ['3 km', '30 km', '300 m', '0.3 km'], a: 0, e: '300 000 cm.' },
      { q: '₹600 in ratio 1 : 2 : 3', o: ['100, 200, 300', '200, 200, 200', '120, 240, 240', '50, 100, 450'], a: 0, e: '6 parts of 100.' },
      { q: 'A pie sector for 25% of data', o: ['90°', '25°', '45°', '180°'], a: 0, e: '¼ × 360°.' },
      { q: '6 workers 10 days ⇒ 12 workers', o: ['5 days', '20 days', '12 days', '6 days'], a: 0, e: 'Inverse.' },
      { q: 'Inverse proportion means', o: ['xy constant', 'x/y constant', 'x + y constant', 'x − y constant'], a: 0, e: 'Definition.' },
      { q: 'A : B = 2 : 3, B : C = 3 : 4 ⇒ A : B : C', o: ['2 : 3 : 4', '2 : 9 : 4', '6 : 9 : 12', '2 : 3 : 12'], a: 0, e: 'B matches.' },
      { q: 'Speed and time for a fixed distance are', o: ['inversely proportional', 'directly proportional', 'equal', 'unrelated'], a: 0, e: 'vt = d.' },
      { q: 'Pie-chart angles add to', o: ['360°', '180°', '100°', '90°'], a: 0, e: 'Full circle.' },
      { q: 'If 4 taps fill a tank in 6 h, 3 taps take', o: ['8 h', '4.5 h', '6 h', '9 h'], a: 0, e: '24/3.' },
      { q: 'Cost of pens and number of pens are', o: ['directly proportional', 'inversely proportional', 'neither', 'equal'], a: 0, e: 'More pens, more cost.' },
      { q: 'Data 20 out of 80 gives sector', o: ['90°', '20°', '80°', '45°'], a: 0, e: '¼.' }
    ],

    teach: {
      outcomes: ['Use map scales', 'Work with three-term ratios and divide quantities', 'Draw pie charts', 'Recognise and solve inverse proportion problems'],
      periods: [
        { t: 'Maps and sharing', flow: [['10 min', 'School map with a scale.'], ['15 min', 'Explore panel 1: sharing and pie.'], ['15 min', 'Practice.']] },
        { t: 'Inverse proportion', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Workers, taps, speed problems.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Inverse treated as direct.', 'Scale units.', 'Combining ratios.'],
      activities: ['Draw a scale plan of the classroom.', 'Class survey → pie chart with protractor.'],
      exit: ['Divide 450 in 4 : 5.', 'Angle for 30 out of 120.', '8 people 9 days ⇒ 6 people?'],
      homework: 'A school\'s 720 students travel by bus (300), cycle (180), walk (150), car (90). Draw a pie chart. A car at 60 km/h takes 5 h; how fast must it go to take 4 h?'
    },

    slides: [
      { t: 'Proportional Reasoning-2', b: ['Map scales', 'Sharing in a ratio', 'Pie charts', 'Inverse proportion'] },
      { t: 'Sharing', b: ['a : b : c ⇒ a + b + c parts', 'Each share = N × part/total'] },
      { t: 'Inverse proportion', b: ['xy = k', 'w₁d₁ = w₂d₂', 'Speed × time = distance'] },
      { t: 'Check yourself', b: ['5 pumps empty a tank in 12 h; 6 pumps?', 'Answer: 10 h'] }
    ],

    fs: { groups: [
        ['Scales', [['1 : n', '1 cm ↦ n cm'], ['Real distance', 'map × n'], ['100 000 cm', '1 km']]],
        ['Ratios', [['Share of N in a : b : c', 'Na/(a + b + c)'], ['Combine', 'match the common term']]],
        ['Pie charts', [['Angle', 'value/total × 360°'], ['Check', 'angles add to 360°']]],
        ['Direct vs inverse', [['Direct', 'y = kx, ratio constant'], ['Inverse', 'xy = k, product constant'], ['Workers–days', 'w₁d₁ = w₂d₂'], ['Speed–time', 'v₁t₁ = v₂t₂']]]],
      ex: [['₹1500 in 2 : 3 : 5', '₹300, ₹450, ₹750'], ['15 men 20 days ⇒ 25 men', '12 days']],
      rem: ['Ask: more of one, more or less of the other?', 'Convert map units.', '360° in a pie.'] }
  });
})();
