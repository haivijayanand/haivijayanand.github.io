/*
TOOL:    class9_maths_ch05
FAMILY:  CBSE_REVISION / Class 9 Maths (Ganita Manjari)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class 9 Maths full build
CHANGES: 1.0.0 - Ch 5 I'm Up and Down, and Round and Round (circles) - revise, 4 explore panels (chord, inscribed angle, cyclic quad, circle through 3 points), 8 generators, quiz, lesson plan, slides
*/
(function () {
  const { num, C } = G9;
  const deg = (r) => r * 180 / Math.PI;
  const ang = (P, V, Q) => { // angle PVQ in degrees
    const a1 = Math.atan2(P.y - V.y, P.x - V.x), a2 = Math.atan2(Q.y - V.y, Q.x - V.x); let d = Math.abs(deg(a1 - a2)); if (d > 180) d = 360 - d; return d;
  };
  const onCircle = (r) => (x, y) => { const t = Math.atan2(y, x); return [r * Math.cos(t), r * Math.sin(t)]; };
  const polar = (r, d) => [r * Math.cos(d * Math.PI / 180), r * Math.sin(d * Math.PI / 180)];

  G9.register({
    no: 5, part: 'Part I', short: 'Circles', title: "I'm Up and Down, and Round and Round",
    blurb: 'Circles: chords, arcs, angles subtended at the centre and on the circle, cyclic figures.',
    revise: {
      oneLine: 'A circle is all points at a fixed distance r from a centre O. Chords, arcs and the angles they subtend obey a few beautiful rules: the perpendicular from O bisects a chord, the angle at the centre is twice the angle on the circle, and opposite angles of a cyclic quadrilateral add to 180°.',
      sections: [
        { h: 'Parts of a circle', html: `<ul><li><b>Radius</b> OA = r; <b>diameter</b> = 2r, the longest chord.</li><li><b>Chord</b>: segment joining two points of the circle.</li>
          <li><b>Arc</b>: part of the circle between two points (minor / major). <b>Segment</b>: region between a chord and its arc. <b>Sector</b>: region between two radii and an arc.</li></ul>` },
        { h: 'Chords and the centre', html: `<ul><li>Equal chords subtend equal angles at the centre (and conversely).</li>
          <li>The perpendicular from the centre to a chord <b>bisects</b> the chord; the line from the centre to the midpoint of a chord is perpendicular to it.</li>
          <li>So r² = d² + (c/2)² where d is the distance of chord c from O.</li>
          <li>Equal chords are equidistant from the centre (and conversely). A longer chord is nearer the centre.</li>
          <li>Exactly one circle passes through three non-collinear points: its centre is where the perpendicular bisectors meet.</li></ul>` },
        { h: 'Angles subtended by an arc', html: `<ul><li>The angle an arc subtends at the <b>centre</b> is <b>twice</b> the angle it subtends at any point on the remaining part of the circle.</li>
          <li>Angles in the <b>same segment</b> are equal.</li>
          <li>Angle in a <b>semicircle</b> is a right angle (the central angle is 180°).</li></ul>` },
        { h: 'Cyclic quadrilaterals', html: `<p>A quadrilateral whose four vertices lie on a circle is <b>cyclic</b>. Its opposite angles add up to <b>180°</b>, and conversely: if a pair of opposite angles adds to 180°, the quadrilateral is cyclic.</p>
          <p>An exterior angle of a cyclic quadrilateral equals the interior opposite angle.</p>` },
        { h: 'How to angle-chase', html: `<ol><li>Mark every radius — triangles with two radii are <b>isosceles</b>.</li><li>Look for a diameter (→ 90°).</li><li>Look for the same arc seen from the centre and from the circle (→ ×2).</li><li>Look for four points on the circle (→ 180°).</li></ol>` }
      ],
      formulas: [['Chord', 'r² = d² + (c/2)²'], ['Central vs inscribed', '∠AOB = 2∠APB'], ['Semicircle', 'angle = 90°'], ['Cyclic quadrilateral', '∠A + ∠C = ∠B + ∠D = 180°'], ['Same segment', 'angles are equal']],
      terms: [['Subtend', 'the angle formed at a point by the two ends of a chord or arc'], ['Concyclic', 'points lying on one circle'], ['Segment', 'region between a chord and an arc'], ['Sector', 'region between two radii and an arc']],
      traps: ['Halving the wrong angle: the <b>centre</b> angle is the bigger one (double).', 'Using the cyclic-quadrilateral rule on adjacent angles — it is for <b>opposite</b> angles.', 'Forgetting that triangles OAB with OA = OB are isosceles.', 'Assuming every quadrilateral is cyclic. A non-square rhombus is not.'],
      bridge: '<p>Areas and perimeters of circles, sectors and segments are in Ch 6. Proof language (propositions and converses) is in Ch 9.</p>'
    },

    explore: [
      {
        title: 'Perpendicular from the centre bisects a chord', intro: 'Drag A and B around the circle. The foot M of the perpendicular from O is always the midpoint.',
        build(el, K) {
          const r = 5; const b = new K.Board(el, { xmin: -7, xmax: 7, ymin: -6, ymax: 6, axes: false });
          const A = b.addPt(...polar(r, 200), { label: 'A', constrain: onCircle(r) }), B = b.addPt(...polar(r, 330), { label: 'B', constrain: onCircle(r) });
          const rd = K.read(el);
          b.onDraw = () => {
            b.base(); b.circle(0, 0, r, { color: C.blue }); b.dot(0, 0, { color: C.ink, label: 'O', r: 4 });
            const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2; b.line(A.x, A.y, B.x, B.y, { color: C.orange, w: 4 });
            b.line(0, 0, mx, my, { color: C.purple, w: 3, dash: [7, 4] }); b.line(0, 0, A.x, A.y, { color: C.grey, w: 2 });
            b.dot(mx, my, { color: C.purple, label: 'M', r: 5 });
            const c = Math.hypot(B.x - A.x, B.y - A.y), d = Math.hypot(mx, my);
            b.drawPts();
            rd.innerHTML = `AM = MB = ${num(c / 2)} &nbsp;·&nbsp; OM = d = ${num(d)} &nbsp;·&nbsp; ∠OMA = 90° &nbsp;·&nbsp; check: d² + (c/2)² = ${num(d * d)} + ${num(c * c / 4)} = ${num(d * d + c * c / 4)} = r² = 25<br>Chord length ${num(c)} — ${c > 9 ? 'long chord, close to the centre' : c < 4 ? 'short chord, far from the centre' : 'move it to compare distances'}`;
          };
          b.redraw(); return null;
        }
      },
      {
        title: 'Angle at the centre = 2 × angle on the circle', intro: 'A and B fix an arc. Press <kbd>P</kbd> to move P around the major arc — ∠APB never changes and is half of ∠AOB.',
        build(el, K) {
          const r = 5; const b = new K.Board(el, { xmin: -7, xmax: 7, ymin: -6, ymax: 6, axes: false });
          const A = b.addPt(...polar(r, 230), { label: 'A', constrain: onCircle(r), color: C.blue }), B = b.addPt(...polar(r, 320), { label: 'B', constrain: onCircle(r), color: C.blue });
          const Pp = b.addPt(...polar(r, 100), { label: 'P', constrain: onCircle(r) });
          const rd = K.read(el);
          const TAU = 2 * Math.PI, md = (x) => ((x % TAU) + TAU) % TAU;
          const minor = () => { const a1 = Math.atan2(A.y, A.x), a2 = Math.atan2(B.y, B.x); const s = md(a2 - a1); return s < Math.PI ? { st: a1, sp: s } : { st: a2, sp: TAU - s }; };
          let u = 0.5;
          const an = new K.Anim(Infinity, () => { const m = minor(); u = (u + 0.012) % 1; const t = m.st + m.sp + 0.05 + u * (TAU - m.sp - 0.1); Pp.x = r * Math.cos(t); Pp.y = r * Math.sin(t); b.redraw(); }, { ms: 50 });
          b.onDraw = () => {
            b.base(); b.circle(0, 0, r, { color: C.blue, w: 2 }); b.dot(0, 0, { color: C.ink, label: 'O', r: 4 });
            b.line(0, 0, A.x, A.y, { color: C.purple }); b.line(0, 0, B.x, B.y, { color: C.purple });
            b.line(Pp.x, Pp.y, A.x, A.y, { color: C.orange }); b.line(Pp.x, Pp.y, B.x, B.y, { color: C.orange });
            const O = { x: 0, y: 0 }, cA = ang(A, O, B), pA = ang(A, Pp, B), m = minor();
            const onMinor = md(Math.atan2(Pp.y, Pp.x) - m.st) < m.sp;
            b.drawPts();
            const central = onMinor ? 360 - cA : cA;
            rd.innerHTML = `∠AOB = <b>${num(central, 1)}°</b>${onMinor ? ' (reflex — P is on the minor arc)' : ''} &nbsp;·&nbsp; ∠APB = <b>${num(pA, 1)}°</b> &nbsp;·&nbsp; ratio = ${num(central / pA, 2)}`;
          };
          K.anim(el, an); b.redraw(); return an;
        }
      },
      {
        title: 'Cyclic quadrilateral', intro: 'Drag the four vertices around the circle. Opposite angles always add to 180°.',
        build(el, K) {
          const r = 5; const b = new K.Board(el, { xmin: -7, xmax: 7, ymin: -6, ymax: 6, axes: false });
          const P = [30, 120, 200, 290].map((d, i) => b.addPt(...polar(r, d), { label: 'ABCD'[i], constrain: onCircle(r) }));
          const rd = K.read(el);
          b.onDraw = () => {
            b.base(); b.circle(0, 0, r, { color: C.blue, w: 2 });
            const S = P.slice().sort((p, q) => Math.atan2(p.y, p.x) - Math.atan2(q.y, q.x));
            b.poly(S.map(p => [p.x, p.y]), { fill: C.orangeL, color: C.orange });
            b.drawPts();
            const a = S.map((V, i) => ang(S[(i + 3) % 4], V, S[(i + 1) % 4]));
            rd.innerHTML = `Angles (going round): ${S.map((p, i) => `∠${p.label} = ${num(a[i], 1)}°`).join(', ')}<br>∠${S[0].label} + ∠${S[2].label} = <b>${num(a[0] + a[2], 1)}°</b> &nbsp;·&nbsp; ∠${S[1].label} + ∠${S[3].label} = <b>${num(a[1] + a[3], 1)}°</b>`;
          };
          b.redraw(); return null;
        }
      },
      {
        title: 'One circle through three points', intro: 'Drag P, Q, R. The perpendicular bisectors of PQ and QR meet at the centre. Step to build it.',
        build(el, K) {
          const b = new K.Board(el, { xmin: -8, xmax: 8, ymin: -6, ymax: 6 });
          const A = b.addPt(-4, -2, { label: 'P', snap: 0.5 }), B = b.addPt(1, 3, { label: 'Q', snap: 0.5 }), Cc = b.addPt(4, -3, { label: 'R', snap: 0.5 });
          const rd = K.read(el); const an = new K.Anim(4, () => b.redraw()); an.i = 3;
          const bis = (p, q) => ({ a: q.x - p.x, b: q.y - p.y, c: ((q.x * q.x + q.y * q.y) - (p.x * p.x + p.y * p.y)) / 2 }); // a x + b y = c
          b.onDraw = () => {
            b.base(); const i = an.i; b.poly([[A.x, A.y], [B.x, B.y], [Cc.x, Cc.y]], { color: C.grey, w: 1.5, dash: [5, 4] });
            const l1 = bis(A, B), l2 = bis(B, Cc), D = l1.a * l2.b - l2.a * l1.b;
            if (i >= 1) b.infLine(l1.a, l1.b, l1.c, { color: C.purple, w: 2 });
            if (i >= 2) b.infLine(l2.a, l2.b, l2.c, { color: C.purple, w: 2 });
            if (Math.abs(D) < 1e-9) { rd.innerHTML = 'The three points are <b>collinear</b> — the bisectors are parallel and no circle passes through all three.'; b.drawPts(); return; }
            const ox = (l1.c * l2.b - l2.c * l1.b) / D, oy = (l1.a * l2.c - l2.a * l1.c) / D, rr = Math.hypot(A.x - ox, A.y - oy);
            if (i >= 3) { b.circle(ox, oy, rr, { color: C.blue }); b.dot(ox, oy, { color: C.ink, label: 'O', r: 4 }); }
            b.drawPts();
            rd.innerHTML = ['Three non-collinear points', 'Perpendicular bisector of PQ: every point on it is equidistant from P and Q', 'Perpendicular bisector of QR', `They meet at O(${num(ox)}, ${num(oy)}); OP = OQ = OR = ${num(rr)} — the unique circle`][i];
          };
          K.anim(el, an); b.redraw(); return an;
        }
      }
    ],

    gens: [
      { title: 'Length of a chord', gen(R, L) {
          const t = R.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25]]); const k = L === 1 ? 1 : R.int(1, 2);
          const d = t[0] * k, hc = t[1] * k, r = t[2] * k;
          return { q: `A chord is ${d} cm from the centre of a circle of radius ${r} cm. Find the length of the chord.`, a: `${2 * hc} cm`, ans: 2 * hc, s: `Half-chord = √(${r}² − ${d}²) = ${hc}; chord = 2 × ${hc}` };
        } },
      { title: 'Distance of a chord from the centre', gen(R, L) {
          const t = R.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [12, 16, 20]]); const sw = R.chance(.5); const d = sw ? t[1] : t[0], hc = sw ? t[0] : t[1];
          return { q: `In a circle of radius ${t[2]} cm, a chord has length ${2 * hc} cm. How far is it from the centre?`, a: `${d} cm`, ans: d, s: `d = √(${t[2]}² − ${hc}²)` };
        } },
      { title: 'Centre angle and circle angle', gen(R, L) {
          const x = R.int(10, 85) * 2; const inv = R.chance(.5);
          if (L === 3) { const p = R.int(20, 70); return { q: `O is the centre. ∠OAB = ${p}° where A, B are on the circle. P is a point on the major arc. Find ∠APB.`, a: `${90 - p}°`, ans: 90 - p, s: `OA = OB ⇒ ∠OBA = ${p}°, ∠AOB = ${180 - 2 * p}°, ∠APB = half = ${90 - p}°` }; }
          return inv ? { q: `Arc AB subtends ${x / 2}° at a point P on the remaining part of the circle. Find ∠AOB at the centre O.`, a: `${x}°`, ans: x, s: 'Centre angle = 2 × circle angle' }
            : { q: `Arc AB subtends ∠AOB = ${x}° at the centre O. Find the angle it subtends at a point P on the major arc.`, a: `${x / 2}°`, ans: x / 2, s: 'Circle angle = ½ × centre angle' };
        } },
      { title: 'Cyclic quadrilateral', gen(R, L) {
          const A = R.int(50, 130), B = R.int(50, 130);
          if (L === 1) return { q: `ABCD is a cyclic quadrilateral with ∠A = ${A}° and ∠B = ${B}°. Find ∠C and ∠D.`, a: `∠C = ${180 - A}°, ∠D = ${180 - B}°`, s: 'Opposite angles add to 180°.' };
          const x = R.int(10, 25), m = R.int(2, 3), n = R.int(1, 2), k = R.int(1, 6) * 5, j = 180 - (m + n) * x - k;
          return { q: `In cyclic quadrilateral PQRS, ∠P = (${m}x + ${k})° and ∠R = (${n === 1 ? '' : n}x + ${j})°. Find x and ∠P.`, a: `x = ${x}, ∠P = ${m * x + k}°`, ans: x, s: `∠P + ∠R = 180 ⇒ ${m + n}x + ${k + j} = 180 ⇒ x = ${x}` };
        } },
      { title: 'Angle in a semicircle', levels: [1, 2], gen(R) {
          const a = R.int(15, 75);
          return { q: `AB is a diameter of a circle and C is a point on the circle. If ∠CAB = ${a}°, find ∠ABC.`, a: `${90 - a}°`, ans: 90 - a, s: `∠ACB = 90° (semicircle), so ∠ABC = 180° − 90° − ${a}°` };
        } },
      { title: 'Same segment', levels: [1, 2], gen(R) {
          const a = R.int(25, 75), b = R.int(20, 70);
          return { q: `A, B, C, D lie on a circle; AC and BD meet at E. ∠BAC = ${a}° and ∠ABD = ${b}°. Find ∠BDC and ∠ACD.`, a: `∠BDC = ${a}°, ∠ACD = ${b}°`, s: '∠BAC and ∠BDC stand on arc BC; ∠ABD and ∠ACD stand on arc AD — angles in the same segment.' };
        } },
      { title: 'Two parallel chords', levels: [3], gen(R) {
          const r = R.pick([5, 10, 13, 15, 17, 25]); const opts = { 5: [3, 4], 10: [6, 8], 13: [5, 12], 15: [9, 12], 17: [8, 15], 25: [7, 24, 15, 20] }[r];
          const d1 = opts[0], h1 = opts[1]; const same = R.chance(.5);
          return { q: `Two parallel chords of lengths ${2 * h1} cm and ${2 * d1} cm lie ${same ? 'on the same side' : 'on opposite sides'} of the centre of a circle of radius ${r} cm. Find the distance between them.`,
            a: `${same ? Math.abs(h1 - d1) : h1 + d1} cm`, ans: same ? Math.abs(h1 - d1) : h1 + d1, s: `Distances from centre: √(${r}² − ${h1}²) = ${d1} and √(${r}² − ${d1}²) = ${h1}; ${same ? 'subtract' : 'add'}.` };
        } },
      { title: 'Exterior angle of a cyclic quadrilateral', levels: [2, 3], gen(R) {
          const e = R.int(60, 130);
          return { q: `In cyclic quadrilateral ABCD, side AB is extended to E. If ∠CBE = ${e}°, find ∠ADC.`, a: `${e}°`, ans: e, s: `∠ABC = 180° − ${e}°; ∠ADC = 180° − ∠ABC = ${e}°` };
        } }
    ],

    quiz: [
      { q: 'The longest chord of a circle is', o: ['a radius', 'a diameter', 'an arc', 'a tangent'], a: 1, e: 'The diameter passes through the centre and has length 2r.' },
      { q: 'A chord of length 16 cm is 6 cm from the centre. The radius is', o: ['8 cm', '10 cm', '12 cm', '14 cm'], a: 1, e: '√(8² + 6²) = 10.' },
      { q: '∠AOB = 140° at the centre. The angle subtended by arc AB at a point on the major arc is', o: ['140°', '70°', '40°', '280°'], a: 1, e: 'Half of 140°.' },
      { q: 'An angle in a semicircle is', o: ['acute', '90°', 'obtuse', '180°'], a: 1, e: 'The central angle is 180°; half is 90°.' },
      { q: 'In a cyclic quadrilateral, ∠A = 75°. Then ∠C =', o: ['75°', '105°', '15°', '285°'], a: 1, e: 'Opposite angles sum to 180°.' },
      { q: 'How many circles pass through three non-collinear points?', o: ['none', 'exactly one', 'two', 'infinitely many'], a: 1, e: 'The perpendicular bisectors meet at one point.' },
      { q: 'Equal chords of a circle are', o: ['parallel', 'equidistant from the centre', 'perpendicular', 'diameters'], a: 1, e: 'Equal chords ⇔ equal distances from O.' },
      { q: 'Which quadrilateral is always cyclic?', o: ['rhombus', 'parallelogram', 'rectangle', 'trapezium'], a: 2, e: 'All angles 90° ⇒ opposite angles sum to 180°.' },
      { q: 'O is the centre; ∠OAB = 30°. Then ∠AOB =', o: ['30°', '60°', '120°', '150°'], a: 2, e: 'Isosceles: 180° − 2 × 30° = 120°.' },
      { q: 'Angles in the same segment of a circle are', o: ['supplementary', 'equal', 'complementary', 'right angles'], a: 1, e: 'They stand on the same arc.' },
      { q: 'The line from the centre to the midpoint of a chord is', o: ['parallel to it', 'perpendicular to it', 'equal to it', 'a tangent'], a: 1, e: 'Converse of the perpendicular-bisects theorem.' }
    ],

    teach: {
      outcomes: ['Name parts of a circle', 'Use the chord–centre properties and r² = d² + (c/2)²', 'Apply the angle-at-centre theorem, same-segment and semicircle results', 'Use properties of cyclic quadrilaterals in angle chasing'],
      periods: [
        { t: 'Chords and the centre', flow: [['10 min', 'Paper-folding: fold a paper circle so a chord maps onto itself — the fold passes through the centre.'], ['15 min', 'Explore panel 1; derive r² = d² + (c/2)².'], ['15 min', 'Explore panel 4: circle through three points; practice chord problems.']] },
        { t: 'Angles subtended by arcs', flow: [['15 min', 'Explore panel 2: guess the ratio, then prove using two isosceles triangles.'], ['15 min', 'Consequences: same segment, semicircle.'], ['10 min', 'Practice: Standard.']] },
        { t: 'Cyclic quadrilaterals and angle chasing', flow: [['15 min', 'Explore panel 3; proof from the centre-angle theorem.'], ['15 min', 'Angle-chasing strategy (radii, diameter, ×2, 180°).'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Doubling the angle at the circumference to get it — then halving the wrong one.', 'Applying "opposite angles add to 180°" to any quadrilateral.', 'Ignoring that P must be on the major arc for ∠AOB (non-reflex) = 2∠APB.'],
      activities: ['Paper circles: fold, cut, measure chords and their distances.', 'String-and-pins demonstration of the angle in a semicircle (a set square always fits).', 'Geoboard: find cyclic and non-cyclic quadrilaterals.'],
      exit: ['Chord 24 cm, radius 13 cm: distance from centre?', '∠AOB = 100°. Angle on major arc?', 'Cyclic quad: ∠B = 64°, find ∠D.'],
      homework: 'Prove: if two chords bisect each other they are both diameters.'
    },

    slides: [
      { t: "I'm Up and Down, and Round and Round — Circles", b: ['Parts of a circle', 'Chords and the centre', 'Angles subtended by arcs', 'Cyclic quadrilaterals'] },
      { t: 'Parts of a circle', b: ['Radius, diameter (longest chord)', 'Chord, arc (minor/major)', 'Segment and sector'] },
      { t: 'Chords and the centre', b: ['Perpendicular from O bisects the chord', 'r² = d² + (c/2)²', 'Equal chords ⇔ equidistant from O', 'Equal chords ⇔ equal angles at O'] },
      { t: 'Angle at the centre', b: ['∠AOB = 2∠APB (P on the remaining arc)', 'Angles in the same segment are equal', 'Angle in a semicircle = 90°'] },
      { t: 'Cyclic quadrilateral', b: ['All four vertices on a circle', 'Opposite angles add to 180°', 'Converse is also true', 'Exterior angle = interior opposite angle'] },
      { t: 'Angle-chasing checklist', b: ['Mark radii → isosceles triangles', 'Diameter → 90°', 'Same arc from centre and circle → × 2', 'Four points on a circle → 180°'] },
      { t: 'Check yourself', b: ['Radius 5, chord 8: distance from centre?', '∠AOB = 130°: angle at P on the major arc?', 'Cyclic: ∠A = 110°, ∠C = ?', 'Answers: 3 · 65° · 70°'] }
    ]
  });
})();
