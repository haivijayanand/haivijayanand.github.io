/*
TOOL:    class10_maths_ch11
FAMILY:  CBSE_REVISION / Class 10 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 11 Areas Related to Circles - revise, board focus, 2 explore panels (sector and segment, clock hand), 7 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { num, C } = G9;
  const P7 = '22/7';

  G9.register({
    no: 11, part: 'Unit VI · Mensuration (10 marks)', short: 'Areas & circles', title: 'Areas Related to Circles',
    blurb: 'Area and perimeter of sectors and segments, arc length, minor and major regions.',
    revise: {
      oneLine: 'A sector of angle θ is θ/360 of the whole circle — for both its area and its arc. A segment is a sector minus the triangle formed by the two radii and the chord.',
      sections: [
        { h: 'Circle recap', html: `<p>Circumference 2πr, area πr². Use π = 22/7 or 3.14 as told; leave π in the answer if not told.</p>` },
        { h: 'Sector and arc', html: `<div class="box m">Area of sector = ${G9.F('θ', 360)} × πr² &nbsp;·&nbsp; Length of arc = ${G9.F('θ', 360)} × 2πr</div>
          <p>Major sector area = πr² − minor sector area (angle 360° − θ). Perimeter of a sector = 2r + arc length.</p>` },
        { h: 'Segment', html: `<div class="box m">Area of minor segment = area of sector − area of △OAB</div>
          <p>Area of △OAB = ½ r² sin θ. For θ = 60°: (√3/4)r² (equilateral). For θ = 90°: ½r². For θ = 120°: (√3/4)r².</p>
          <p>Major segment = πr² − minor segment.</p>` },
        { h: 'Applications', html: `<ul><li>Clock hands: the minute hand sweeps 6° per minute; the hour hand 0.5° per minute.</li><li>Wipers, sprinklers, lighthouse beams: sectors.</li><li>Designs on tablecloths/brooches: sectors and segments added or subtracted.</li></ul>` }
      ],
      formulas: [['Sector area', '(θ/360)πr²'], ['Arc length', '(θ/360)2πr'], ['Sector perimeter', '2r + arc'], ['Segment', 'sector − ½r² sin θ'], ['Minute hand', '6° per minute']],
      terms: [['Sector', 'region between two radii and an arc'], ['Segment', 'region between a chord and its arc'], ['Minor / major', 'smaller / larger of the two parts'], ['Central angle', 'θ at the centre']],
      traps: ['Using diameter instead of radius.', 'Forgetting to subtract the triangle for a segment.', 'Using sector formula for the triangle area.', 'Minute hand: 60 minutes = 360°, so 1 minute = 6°.'],
      board: '<p><b>Unit VI (Mensuration) — 10 marks</b> with Ch 12. Expect: 1–2 marks on sector area/arc; 3 marks on segment areas (60°, 90°, 120°) and clock/wiper problems.</p>',
      bridge: '<p>Class 9 Ch 6 covered circles and sectors; Ch 12 uses circle areas as faces of solids.</p>'
    },

    explore: [
      {
        title: 'Sector, triangle and segment', intro: 'Change θ and r. The minor segment (orange) = sector − triangle OAB.',
        build(el, K) {
          let th = 90, r = 7; const row = K.row(el);
          K.slider(row, 'θ (°)', 10, 350, 5, th, v => { th = v; b.redraw(); }); K.slider(row, 'r', 3, 21, 1, r, v => { r = v; b.redraw(); });
          const b = new K.Board(el, { xmin: -12, xmax: 12, ymin: -11, ymax: 11, axes: false }); const rd = K.read(el);
          b.onDraw = () => {
            b.clear(); const R = 9, t = th * Math.PI / 180; b.circle(0, 0, R, { color: C.grey, w: 1.5 });
            b.arc(0, 0, R, 0, t, { sector: true, fill: C.blueL, color: C.blue, w: 2 });
            const A = [R, 0], B = [R * Math.cos(t), R * Math.sin(t)];
            if (th < 180) { const pts = [A]; for (let k = 0; k <= 40; k++) pts.push([R * Math.cos(t * k / 40), R * Math.sin(t * k / 40)]); b.poly(pts, { fill: C.orangeL, color: C.orange, w: 2 }); b.line(A[0], A[1], B[0], B[1], { color: C.orange, w: 3 }); }
            b.dot(0, 0, { color: C.ink, r: 4, label: 'O' }); b.dot(...A, { r: 4, label: 'A' }); b.dot(...B, { r: 4, label: 'B' });
            const sec = th / 360 * Math.PI * r * r, tri = 0.5 * r * r * Math.sin(t), arc = th / 360 * 2 * Math.PI * r;
            rd.innerHTML = `Sector = ${th}/360 × π × ${r}² = <b>${num(sec)}</b> · arc = <b>${num(arc)}</b> · △OAB = ½ × ${r}² × sin ${th}° = ${num(tri)}` + (th < 180 ? ` · minor segment = <b>${num(sec - tri)}</b>` : ' · (θ ≥ 180°: this sector is the major one)') + ` · major sector = ${num(Math.PI * r * r - sec)}`;
          };
          b.redraw(); return null;
        }
      },
      {
        title: 'Clock: area swept by the minute hand', intro: 'Press <kbd>P</kbd> to run the clock. 1 minute = 6°; area swept = (6m/360) × πL².',
        build(el, K) {
          let L = 14; const row = K.row(el); K.slider(row, 'hand length L (cm)', 5, 21, 1, L, v => { L = v; b.redraw(); });
          const b = new K.Board(el, { xmin: -12, xmax: 12, ymin: -11, ymax: 11, axes: false }); const rd = K.read(el);
          const an = new K.Anim(61, () => b.redraw(), { ms: 200 });
          b.onDraw = () => {
            b.clear(); const m = an.i, R = 9; b.circle(0, 0, R, { color: C.ink, w: 2 }); for (let k = 0; k < 12; k++) { const a = Math.PI / 2 - k * Math.PI / 6; b.line(0.88 * R * Math.cos(a), 0.88 * R * Math.sin(a), R * Math.cos(a), R * Math.sin(a), { color: C.ink, w: 2 }); }
            if (m > 0) b.arc(0, 0, R * 0.95, Math.PI / 2 - m * Math.PI / 30, Math.PI / 2, { sector: true, fill: C.orangeL, color: C.orange, w: 1.5 });
            const a = Math.PI / 2 - m * Math.PI / 30; b.line(0, 0, 0.95 * R * Math.cos(a), 0.95 * R * Math.sin(a), { color: C.blue, w: 4 });
            rd.innerHTML = `${m} minutes ⇒ angle ${6 * m}° ⇒ area swept = ${6 * m}/360 × ${P7} × ${L}² = <b>${num(6 * m / 360 * 22 / 7 * L * L)} cm²</b>`;
          };
          K.anim(el, an); b.redraw(); return an;
        }
      }
    ],

    gens: [
      { title: 'Area of a sector', gen(R, L) {
          const r = R.pick([7, 14, 21, 3.5, 10.5]), th = R.pick([30, 45, 60, 90, 120, 150]); const A = th / 360 * 22 / 7 * r * r;
          return { q: `Find the area of a sector of a circle of radius ${r} cm with central angle ${th}° (π = ${P7}).`, a: `${num(A)} cm²`, ans: A, s: `${th}/360 × ${P7} × ${r}²` };
        } },
      { title: 'Arc length and perimeter', gen(R) {
          const r = R.pick([7, 14, 21, 28]), th = R.pick([45, 60, 90, 120, 180]); const arc = th / 360 * 2 * 22 / 7 * r;
          return { q: `Find the length of the arc and the perimeter of a sector of radius ${r} cm and angle ${th}° (π = ${P7}).`, a: `arc ${num(arc)} cm, perimeter ${num(arc + 2 * r)} cm`, ans: arc, s: `arc = ${th}/360 × 2 × ${P7} × ${r}; perimeter = arc + 2r` };
        } },
      { title: 'Minor and major sector', levels: [1, 2], gen(R) {
          const r = R.pick([7, 14, 21]), th = R.pick([30, 60, 90, 120]); const mi = th / 360 * 22 / 7 * r * r, ma = 22 / 7 * r * r - mi;
          return { q: `A chord subtends ${th}° at the centre of a circle of radius ${r} cm. Find the areas of the minor and major sectors (π = ${P7}).`, a: `minor ${num(mi)} cm², major ${num(ma)} cm²`, s: 'major = πr² − minor' };
        } },
      { title: 'Area of a segment', levels: [2, 3], gen(R) {
          const r = R.pick([10, 12, 14, 15, 20, 21]), th = R.pick([60, 90, 120]); const sec = th / 360 * 3.14 * r * r, tri = th === 90 ? r * r / 2 : Math.sqrt(3) / 4 * r * r;
          return { q: `A chord of a circle of radius ${r} cm subtends ${th}° at the centre. Find the area of the minor segment (π = 3.14, √3 = 1.73).`, a: `${num(th / 360 * 3.14 * r * r - (th === 90 ? r * r / 2 : 1.73 / 4 * r * r))} cm²`, ans: th / 360 * 3.14 * r * r - (th === 90 ? r * r / 2 : 1.73 / 4 * r * r), tol: 0.1, s: `sector ${num(sec)} − triangle ${th === 90 ? '½r²' : '(√3/4)r²'} = ${num(tri)}` };
        } },
      { title: 'Clock and wiper problems', gen(R) {
          if (R.chance(.5)) { const L = R.pick([7, 14, 21]), m = R.pick([5, 10, 15, 20, 30]); return { q: `The minute hand of a clock is ${L} cm long. Find the area swept by it in ${m} minutes (π = ${P7}).`, a: `${num(6 * m / 360 * 22 / 7 * L * L)} cm²`, ans: 6 * m / 360 * 22 / 7 * L * L, s: `angle = 6 × ${m} = ${6 * m}°` }; }
          const L = R.pick([21, 25, 28, 35]), th = R.pick([90, 115, 120]); const A = 2 * th / 360 * 22 / 7 * L * L;
          return { q: `A car has two wipers that do not overlap. Each blade is ${L} cm long and sweeps an angle of ${th}°. Find the total area cleaned at each sweep (π = ${P7}).`, a: `${num(A)} cm²`, ans: A, s: `2 × ${th}/360 × ${P7} × ${L}²` };
        } },
      { title: 'Quadrant and square', levels: [2, 3], gen(R) {
          const a = R.pick([7, 14, 21]);
          return { q: `In a square of side ${a} cm, a quadrant of a circle with radius ${a} cm is drawn with centre at one corner. Find the area of the square not covered by the quadrant (π = ${P7}).`, a: `${num(a * a - 0.25 * 22 / 7 * a * a)} cm²`, ans: a * a - 0.25 * 22 / 7 * a * a, s: `${a}² − ¼ × ${P7} × ${a}²` };
        } },
      { title: 'Find the angle from the area', levels: [3], gen(R) {
          const r = R.pick([7, 14, 21]), th = R.pick([30, 45, 60, 72, 90, 120]); const A = th / 360 * 22 / 7 * r * r;
          return { q: `The area of a sector of a circle of radius ${r} cm is ${num(A)} cm². Find the angle of the sector (π = ${P7}).`, a: `${th}°`, ans: th, s: `θ = A × 360 / (πr²)` };
        } }
    ],

    quiz: [
      { q: 'Area of a sector of angle 90° and radius 14 cm (π = 22/7)', o: ['154 cm²', '616 cm²', '77 cm²', '308 cm²'], a: 0, e: '¼ × 616.' },
      { q: 'Arc length of a sector of angle 60°, radius 21 cm (π = 22/7)', o: ['22 cm', '44 cm', '11 cm', '66 cm'], a: 0, e: '1/6 × 132.' },
      { q: 'Area swept by a minute hand in 1 minute corresponds to angle', o: ['1°', '6°', '30°', '0.5°'], a: 1, e: '360/60.' },
      { q: 'Area of a segment =', o: ['sector + triangle', 'sector − triangle', 'circle − sector', 'triangle − sector'], a: 1, e: 'Minor segment.' },
      { q: 'Area of △OAB with OA = OB = r and ∠AOB = 60°', o: ['(√3/4)r²', '½r²', 'r²', '(√3/2)r²'], a: 0, e: 'Equilateral.' },
      { q: 'If the perimeter and area of a circle are numerically equal, r =', o: ['1', '2', '4', 'π'], a: 1, e: '2πr = πr².' },
      { q: 'Major sector area for θ = 90°, r = 7 (π = 22/7)', o: ['115.5', '38.5', '154', '77'], a: 0, e: '154 − 38.5.' },
      { q: 'Perimeter of a semicircular protractor of diameter 14 cm', o: ['36 cm', '22 cm', '44 cm', '29 cm'], a: 0, e: '22 + 14.' },
      { q: 'If the radius is doubled, sector area (same angle) becomes', o: ['2×', '4×', '½', 'same'], a: 1, e: 'Area ∝ r².' },
      { q: 'Angle of a sector whose area is 1/8 of the circle', o: ['45°', '30°', '60°', '90°'], a: 0, e: '360/8.' },
      { q: 'Arc length formula', o: ['(θ/360)πr²', '(θ/360)2πr', 'θr²', '2πrθ'], a: 1, e: 'Fraction of circumference.' }
    ],

    teach: {
      outcomes: ['Find areas and arcs of sectors', 'Find areas of minor and major segments', 'Solve clock, wiper and design problems'],
      periods: [
        { t: 'Sectors and arcs', flow: [['10 min', 'Pizza slices as fractions of a circle.'], ['15 min', 'Explore panel 1; formulas.'], ['15 min', 'Practice: sectors and arcs.']] },
        { t: 'Segments', flow: [['15 min', 'Sector − triangle; 60°, 90°, 120°.'], ['15 min', 'Explore panel 2: clock problems.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Diameter used as r.', 'Triangle not subtracted.', 'Minute-hand angle per minute.'],
      activities: ['Paper-plate sectors.', 'Measure the area cleaned by a car wiper (model).'],
      exit: ['Sector r = 21, θ = 60°: area.', 'Segment r = 10, θ = 90°: area (π = 3.14).'],
      homework: 'Find the area of the design made by four quadrants drawn inside a square of side 14 cm.'
    },

    slides: [
      { t: 'Areas Related to Circles', b: ['Sectors and arcs', 'Segments', 'Applications'] },
      { t: 'Sector and arc', b: ['Area = (θ/360)πr²', 'Arc = (θ/360)2πr', 'Perimeter = 2r + arc'] },
      { t: 'Segment', b: ['Sector − △OAB', '△OAB = ½r² sin θ', '60°: (√3/4)r², 90°: ½r²'] },
      { t: 'Applications', b: ['Minute hand: 6° per minute', 'Wipers, sprinklers, designs'] },
      { t: 'Check yourself', b: ['Sector r = 14, θ = 45° (π = 22/7)?', 'Answer: 77 cm²'] }
    ],

    fs: { groups: [
        ['Circle', [['Circumference', '2πr'], ['Area', 'πr²'], ['Semicircle perimeter', 'πr + 2r']]],
        ['Sector (angle θ)', [['Area', '(θ/360) × πr²'], ['Arc length', '(θ/360) × 2πr'], ['Perimeter', '2r + arc'], ['Major sector', 'πr² − minor sector'], ['Area via arc l', '½ l r']]],
        ['Segment', [['Minor segment', 'sector − ½r² sin θ'], ['θ = 60°', 'sector − (√3/4)r²'], ['θ = 90°', 'sector − ½r²'], ['θ = 120°', 'sector − (√3/4)r²'], ['Major segment', 'πr² − minor segment']]],
        ['Clocks', [['Minute hand', '6° per minute'], ['Hour hand', '0.5° per minute']]]],
      ex: [['Sector r = 21, θ = 120°', '⅓ × 22/7 × 441 = 462 cm²'], ['Segment r = 14, θ = 90°', '154 − 98 = 56 cm²']],
      rem: ['Use the radius, not the diameter.', 'Segment = sector minus triangle.', 'State the value of π you used.'] }
  });
})();
