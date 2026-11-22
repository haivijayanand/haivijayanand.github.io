/*
TOOL:    class9_maths_ch12
FAMILY:  CBSE_REVISION / Class 9 Maths (Ganita Manjari)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class 9 Maths full build
CHANGES: 1.0.0 - Ch 12 Quadrilaterals - revise, 5 explore panels (parallelogram, midpoint theorem, Varignon, centroid, tiling), 10 generators, quiz, lesson plan, slides
*/
(function () {
  const { num, C } = G9;
  const mid = (P, Q) => ({ x: (P.x + Q.x) / 2, y: (P.y + Q.y) / 2 });
  const len = (P, Q) => Math.hypot(P.x - Q.x, P.y - Q.y);
  const angAt = (P, V, Q) => { const a = Math.atan2(P.y - V.y, P.x - V.x) - Math.atan2(Q.y - V.y, Q.x - V.x); let d = Math.abs(a * 180 / Math.PI); return d > 180 ? 360 - d : d; };
  const area = (Ps) => Math.abs(Ps.reduce((s, P, i) => { const Q = Ps[(i + 1) % Ps.length]; return s + P.x * Q.y - Q.x * P.y; }, 0)) / 2;
  const pt = (P) => [P.x, P.y];

  G9.register({
    no: 12, part: 'Part II', short: 'Quadrilaterals', title: 'Quadrilaterals',
    blurb: 'Definitions, parallelogram properties and tests, midpoint theorem, centroid, Varignon parallelogram, tiling.',
    revise: {
      oneLine: 'A quadrilateral has four sides and its angles add to 360°. Parallelograms are recognised by any one of several tests (each the converse of a property), and the midpoint theorem explains surprising facts like Varignon\'s parallelogram.',
      sections: [
        { h: 'Precise definitions', html: `<p>A <b>quadrilateral</b> ABCD: four points, no three collinear, joined in order so that the sides meet only at their ends. Sides AB and BC are <b>adjacent</b>; AB and CD are <b>opposite</b>. AC and BD are the <b>diagonals</b>.</p>
          <p><b>Convex</b>: each diagonal lies inside. Angle sum = 360° (a diagonal splits it into two triangles).</p>` },
        { h: 'Family tree', html: `<ul><li><b>Trapezium</b>: at least one pair of parallel sides.</li><li><b>Parallelogram</b>: both pairs of opposite sides parallel.</li>
          <li><b>Rectangle</b>: parallelogram with a right angle. <b>Rhombus</b>: parallelogram with all sides equal. <b>Square</b>: both.</li><li><b>Kite</b>: two pairs of adjacent equal sides.</li></ul>
          <p>Every square is a rectangle and a rhombus; not every rhombus is a square.</p>` },
        { h: 'Parallelogram: properties and tests', html: `<table class="t"><tr><th>If ABCD is a parallelogram, then…</th><th>Test (converse): ABCD is a parallelogram if…</th></tr>
          <tr><td>opposite sides are equal</td><td>both pairs of opposite sides are equal</td></tr><tr><td>opposite angles are equal</td><td>both pairs of opposite angles are equal</td></tr>
          <tr><td>diagonals bisect each other</td><td>the diagonals bisect each other</td></tr><tr><td>adjacent angles add to 180°</td><td>one pair of opposite sides is equal <b>and</b> parallel</td></tr></table>
          <p>Proofs use a diagonal and congruent triangles (ASA/SAS), with alternate angles from Ch 9. Extra: rectangle ⇒ equal diagonals; rhombus ⇒ diagonals perpendicular and bisect the angles.</p>` },
        { h: 'Midpoint theorem and centroid', html: `<p><b>Midpoint theorem</b>: the segment joining the midpoints of two sides of a triangle is parallel to the third side and half its length. <b>Converse</b>: a line through the midpoint of one side, parallel to another, bisects the third.</p>
          <p><b>Centroid</b>: the three medians of a triangle meet at one point G, which divides each median in the ratio 2 : 1 from the vertex.</p>` },
        { h: 'Varignon parallelogram and tiling', html: `<p>Join the midpoints of the sides of <b>any</b> quadrilateral: you always get a parallelogram (apply the midpoint theorem with each diagonal). Its sides are half the diagonals, its perimeter equals the sum of the diagonals, its area is half the quadrilateral's.</p>
          <p><b>Tiling</b>: any quadrilateral (even an irregular one) tiles the plane — rotate copies by 180° about the midpoints of the sides; the four angles meet at each vertex and add to 360°.</p>` }
      ],
      formulas: [['Angle sum', '∠A + ∠B + ∠C + ∠D = 360°'], ['Parallelogram', 'adjacent angles sum 180°'], ['Midpoint theorem', 'MN ∥ BC, MN = ½BC'], ['Centroid', 'AG : GD = 2 : 1'], ['Varignon', 'perimeter = AC + BD, area = ½ area(ABCD)'], ['Rhombus', 'side² = (d₁/2)² + (d₂/2)²']],
      terms: [['Diagonal', 'segment joining opposite vertices'], ['Median', 'segment from a vertex to the midpoint of the opposite side'], ['Centroid', 'point where the medians meet'], ['Convex', 'every interior angle less than 180°']],
      traps: ['"A rhombus is a square" — only if it has a right angle.', 'One pair of equal opposite sides is not enough — they must also be parallel (or both pairs equal).', 'The centroid divides the median 2 : 1 from the <b>vertex</b>, not from the side.', 'Equal diagonals alone do not make a rectangle (isosceles trapezium).'],
      bridge: '<p>Uses lines-and-angles facts and congruence from Ch 9; coordinates (Ch 1) give another way to prove a figure is a parallelogram (common midpoint of diagonals).</p>'
    },

    explore: [
      {
        title: 'Parallelogram properties', intro: 'Drag A, B or D (C is placed so that ABCD stays a parallelogram). Opposite sides, opposite angles and the bisected diagonals stay equal.',
        build(el, K) {
          const b = new K.Board(el, { xmin: -1, xmax: 13, ymin: -1, ymax: 8 });
          const A = b.addPt(1, 1, { label: 'A', snap: 0.5 }), B = b.addPt(8, 1, { label: 'B', snap: 0.5 }), D = b.addPt(3, 6, { label: 'D', snap: 0.5 });
          const rd = K.read(el);
          b.onDraw = () => {
            b.base(); const Cc = { x: B.x + D.x - A.x, y: B.y + D.y - A.y }, O = mid(A, Cc);
            b.poly([pt(A), pt(B), pt(Cc), pt(D)], { fill: C.blueL, color: C.blue });
            b.line(A.x, A.y, Cc.x, Cc.y, { color: C.orange, w: 2, dash: [6, 4] }); b.line(B.x, B.y, D.x, D.y, { color: C.purple, w: 2, dash: [6, 4] });
            b.dot(O.x, O.y, { color: C.ink, r: 4, label: 'O' }); b.dot(Cc.x, Cc.y, { color: C.grey, r: 5, label: 'C' }); b.drawPts();
            rd.innerHTML = `AB = ${num(len(A, B))}, CD = ${num(len(Cc, D))} · BC = ${num(len(B, Cc))}, DA = ${num(len(D, A))}<br>∠A = ${num(angAt(D, A, B), 1)}°, ∠C = ${num(angAt(B, Cc, D), 1)}° · ∠B = ${num(angAt(A, B, Cc), 1)}°, ∠D = ${num(angAt(Cc, D, A), 1)}° · ∠A + ∠B = ${num(angAt(D, A, B) + angAt(A, B, Cc), 1)}°<br>OA = OC = ${num(len(O, A))} · OB = OD = ${num(len(O, B))} — diagonals bisect each other` +
              (Math.abs(len(A, Cc) - len(B, D)) < 0.05 ? ' · <b>diagonals equal ⇒ rectangle</b>' : '') + (Math.abs(len(A, B) - len(A, D)) < 0.05 ? ' · <b>all sides equal ⇒ rhombus</b>' : '');
          };
          b.redraw(); return null;
        }
      },
      {
        title: 'Midpoint theorem', intro: 'M and N are midpoints of AB and AC. Drag the vertices: MN stays parallel to BC and exactly half as long.',
        build(el, K) {
          const b = new K.Board(el, { xmin: -1, xmax: 13, ymin: -1, ymax: 8 });
          const A = b.addPt(4, 7, { label: 'A' }), B = b.addPt(0, 0, { label: 'B' }), Cc = b.addPt(11, 1, { label: 'C' });
          const rd = K.read(el); const an = new K.Anim(3, () => b.redraw()); an.i = 2;
          b.onDraw = () => {
            b.base(); const M = mid(A, B), N = mid(A, Cc); b.poly([pt(A), pt(B), pt(Cc)], { color: C.blue, fill: C.blueL });
            if (an.i >= 1) { b.dot(M.x, M.y, { color: C.purple, label: 'M', r: 5 }); b.dot(N.x, N.y, { color: C.purple, label: 'N', r: 5 }); b.line(M.x, M.y, N.x, N.y, { color: C.orange, w: 4 }); }
            if (an.i >= 2) { const D = { x: 2 * N.x - M.x, y: 2 * N.y - M.y }; b.line(N.x, N.y, D.x, D.y, { color: C.orange, w: 2, dash: [5, 4] }); b.line(Cc.x, Cc.y, D.x, D.y, { color: C.grey, w: 2, dash: [5, 4] }); b.dot(D.x, D.y, { color: C.grey, r: 4, label: 'P' }); }
            b.drawPts();
            const s1 = (N.y - M.y) / (N.x - M.x), s2 = (Cc.y - B.y) / (Cc.x - B.x);
            rd.innerHTML = `MN = ${num(len(M, N))}, BC = ${num(len(B, Cc))}, ratio = ${num(len(M, N) / len(B, Cc), 3)} · slope MN = ${num(s1, 3)}, slope BC = ${num(s2, 3)} ⇒ parallel` + (an.i >= 2 ? '<br>Proof idea: extend MN to P with NP = MN. △AMN ≅ △CPN (SAS), so CP = AM = MB and CP ∥ AB ⇒ MBCP is a parallelogram ⇒ MP ∥ BC and MP = BC.' : '');
          };
          K.anim(el, an); b.redraw(); return an;
        }
      },
      {
        title: "Varignon's parallelogram", intro: 'Drag the four corners of any quadrilateral. The midpoints always form a parallelogram with half the area.',
        build(el, K) {
          const b = new K.Board(el, { xmin: -1, xmax: 13, ymin: -1, ymax: 8 });
          const P = [[1, 1], [9, 0], [11, 6], [3, 7]].map(([x, y], i) => b.addPt(x, y, { label: 'ABCD'[i] }));
          const rd = K.read(el);
          b.onDraw = () => {
            b.base(); b.poly(P.map(pt), { color: C.blue, fill: C.blueL }); b.line(P[0].x, P[0].y, P[2].x, P[2].y, { color: C.grey, w: 1.5, dash: [5, 4] }); b.line(P[1].x, P[1].y, P[3].x, P[3].y, { color: C.grey, w: 1.5, dash: [5, 4] });
            const M = P.map((Q, i) => mid(Q, P[(i + 1) % 4])); b.poly(M.map(pt), { color: C.orange, fill: C.orangeL, w: 3 }); M.forEach((m, i) => b.dot(m.x, m.y, { color: C.orange, r: 4, label: 'PQRS'[i] }));
            b.drawPts();
            rd.innerHTML = `PQ = ${num(len(M[0], M[1]))}, SR = ${num(len(M[3], M[2]))} · QR = ${num(len(M[1], M[2]))}, PS = ${num(len(M[0], M[3]))} (opposite sides equal)<br>Perimeter PQRS = ${num(M.reduce((s, m, i) => s + len(m, M[(i + 1) % 4]), 0))} = AC + BD = ${num(len(P[0], P[2]) + len(P[1], P[3]))} · Area PQRS = ${num(area(M))} = ½ × ${num(area(P))}`;
          };
          b.redraw(); return null;
        }
      },
      {
        title: 'Centroid divides each median 2 : 1', intro: 'Step to draw the three medians. They always meet at G with AG : GD = 2 : 1.',
        build(el, K) {
          const b = new K.Board(el, { xmin: -1, xmax: 13, ymin: -1, ymax: 8 });
          const V = [[3, 7], [0, 0], [11, 1]].map(([x, y], i) => b.addPt(x, y, { label: 'ABC'[i] }));
          const rd = K.read(el); const an = new K.Anim(4, () => b.redraw()); an.i = 3;
          b.onDraw = () => {
            b.base(); b.poly(V.map(pt), { color: C.blue, fill: C.blueL }); const G = { x: (V[0].x + V[1].x + V[2].x) / 3, y: (V[0].y + V[1].y + V[2].y) / 3 };
            const cols = [C.orange, C.purple, C.sky];
            for (let k = 0; k < Math.min(an.i, 3); k++) { const Mm = mid(V[(k + 1) % 3], V[(k + 2) % 3]); b.line(V[k].x, V[k].y, Mm.x, Mm.y, { color: cols[k], w: 3 }); b.dot(Mm.x, Mm.y, { color: cols[k], r: 4, label: 'DEF'[k] }); }
            if (an.i >= 2) b.dot(G.x, G.y, { color: C.ink, r: 6, label: 'G' }); b.drawPts();
            const D = mid(V[1], V[2]);
            rd.innerHTML = `AG = ${num(len(V[0], G))}, GD = ${num(len(G, D))}, AG : GD = <b>${num(len(V[0], G) / len(G, D), 3)} : 1</b> · G = average of the vertices = (${num(G.x)}, ${num(G.y)})`;
          };
          K.anim(el, an); b.redraw(); return an;
        }
      },
      {
        title: 'Any quadrilateral tiles the plane', intro: 'Drag the corners of the blue tile. Copies rotated by 180° about the midpoints of its sides fill the plane with no gaps.',
        build(el, K) {
          const b = new K.Board(el, { xmin: -6, xmax: 18, ymin: -6, ymax: 12, axes: false, grid: 0 });
          const P = [[4, 2], [8, 2.5], [9, 6], [5, 5]].map(([x, y], i) => b.addPt(x, y, { label: 'ABCD'[i], snap: 0.25 }));
          const rd = K.read(el);
          b.onDraw = () => {
            b.clear(); const [A, B, Cc, D] = P; const v1 = { x: Cc.x - A.x, y: Cc.y - A.y }, v2 = { x: D.x - B.x, y: D.y - B.y };
            const Q0 = P.map(pt), Q1 = P.map(p => [A.x + B.x - p.x, A.y + B.y - p.y]);
            for (let i = -6; i <= 6; i++) for (let j = -6; j <= 6; j++) {
              const tx = i * v1.x + j * v2.x, ty = i * v1.y + j * v2.y; if (Math.abs(tx) > 30 || Math.abs(ty) > 30) continue;
              b.poly(Q0.map(([x, y]) => [x + tx, y + ty]), { fill: i === 0 && j === 0 ? 'rgba(29,78,216,.45)' : C.blueL, color: C.blue, w: 1.5 });
              b.poly(Q1.map(([x, y]) => [x + tx, y + ty]), { fill: C.orangeL, color: C.orange, w: 1.5 });
            }
            b.drawPts();
            const s = angAt(D, A, B) + angAt(A, B, Cc) + angAt(B, Cc, D) + angAt(Cc, D, A);
            rd.innerHTML = `At every vertex the four different angles of the tile meet: ∠A + ∠B + ∠C + ∠D = ${num(s, 1)}° = 360°, so there is no gap. (Keep the tile convex for a neat picture.)`;
          };
          b.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Angle sum of a quadrilateral', levels: [1, 2], gen(R, L) {
          const a = R.int(50, 130), b = R.int(50, 130), c = R.int(50, 130), d = 360 - a - b - c; if (d <= 20 || d >= 200) return this.gen(R, L);
          if (L === 1) return { q: `Three angles of a quadrilateral are ${a}°, ${b}° and ${c}°. Find the fourth.`, a: `${d}°`, ans: d, s: '360° − sum of the three' };
          const k = R.pick([[1, 2, 3, 4], [2, 3, 3, 4], [3, 4, 5, 6], [1, 1, 2, 2]]), t = k.reduce((x, y) => x + y);
          return { q: `The angles of a quadrilateral are in the ratio ${k.join(' : ')}. Find them.`, a: k.map(v => num(360 * v / t) + '°').join(', '), s: `${t}x = 360 ⇒ x = ${num(360 / t)}` };
        } },
      { title: 'Angles of a parallelogram', gen(R, L) {
          const A = R.int(40, 140);
          if (L === 1) return { q: `In parallelogram ABCD, ∠A = ${A}°. Find ∠B, ∠C and ∠D.`, a: `∠B = ${180 - A}°, ∠C = ${A}°, ∠D = ${180 - A}°`, s: 'Opposite angles equal; adjacent angles add to 180°.' };
          const p = R.int(2, 4), x = R.int(12, Math.floor(160 / (p + 1))); const c2 = 180 - p * x;
          return { q: `In parallelogram PQRS, ∠P = (${p}x)° and ∠Q = (x + ${c2 - x})°. Find x and all the angles.`, a: `x = ${x}; ∠P = ∠R = ${p * x}°, ∠Q = ∠S = ${c2}°`, ans: x, s: `adjacent angles: ${p}x + x + ${c2 - x} = 180` };
        } },
      { title: 'Diagonals bisect each other', gen(R) {
          const x = R.int(2, 9), a = R.int(2, 4), b = R.int(1, 6), c = a - 1 || 1; const d = a * x + b - c * x;
          if (a === c) return this.gen(R);
          return { q: `The diagonals of parallelogram ABCD meet at O. OA = (${a}x + ${b}) cm and OC = (${c === 1 ? '' : c}x + ${d}) cm. Find x and AC.`, a: `x = ${x}, AC = ${2 * (a * x + b)} cm`, ans: x, s: `OA = OC ⇒ ${a}x + ${b} = ${c === 1 ? '' : c}x + ${d}` };
        } },
      { title: 'Rhombus side from diagonals', levels: [2, 3], gen(R) {
          const T = R.pick([[6, 8, 5], [10, 24, 13], [16, 30, 17], [12, 16, 10], [14, 48, 25], [18, 80, 41]]);
          return { q: `The diagonals of a rhombus are ${T[0]} cm and ${T[1]} cm. Find its side and perimeter.`, a: `side ${T[2]} cm, perimeter ${4 * T[2]} cm`, ans: T[2], s: `Diagonals bisect at right angles: side = √(${T[0] / 2}² + ${T[1] / 2}²)` };
        } },
      { title: 'Midpoint theorem', gen(R, L) {
          const a = R.int(4, 20), b = R.int(4, 20), c = R.int(Math.abs(a - b) + 1, a + b - 1);
          if (L === 1) return { q: `In △ABC, M and N are the midpoints of AB and AC. If BC = ${2 * a} cm, find MN.`, a: `${a} cm`, ans: a, s: 'MN = ½BC' };
          return { q: `The sides of a triangle are ${a} cm, ${b} cm and ${c} cm. Find the perimeter of the triangle formed by joining the midpoints of its sides.`, a: `${num((a + b + c) / 2)} cm`, ans: (a + b + c) / 2, s: 'Each side of the midpoint triangle is half a side of the original.' };
        } },
      { title: 'Centroid', levels: [2, 3], gen(R) {
          const m = R.int(2, 15) * 3;
          return R.chance(.5) ? { q: `AD is a median of △ABC of length ${m} cm and G is the centroid. Find AG and GD.`, a: `AG = ${2 * m / 3} cm, GD = ${m / 3} cm`, s: 'AG : GD = 2 : 1' }
            : { q: `G is the centroid of △ABC and GD = ${m / 3} cm, where D is the midpoint of BC. Find the median AD.`, a: `${m} cm`, ans: m, s: 'AD = 3 × GD' };
        } },
      { title: 'Varignon parallelogram', levels: [2, 3], gen(R) {
          const d1 = R.int(6, 20), d2 = R.int(6, 20), A = R.int(20, 90);
          return { q: `The diagonals of a quadrilateral are ${d1} cm and ${d2} cm and its area is ${2 * A} cm². Find the perimeter and area of the quadrilateral formed by joining the midpoints of its sides.`, a: `perimeter ${d1 + d2} cm, area ${A} cm²`, s: 'Sides are half the diagonals (two of each); area is half.' };
        } },
      { title: 'Which quadrilateral?', levels: [1, 2], gen(R) {
          const items = [['Diagonals bisect each other and are equal.', 'Rectangle'], ['Diagonals bisect each other at right angles.', 'Rhombus'], ['Diagonals are equal and bisect each other at right angles.', 'Square'], ['Only one pair of opposite sides is parallel.', 'Trapezium'], ['Both pairs of opposite sides are equal.', 'Parallelogram'], ['Two pairs of adjacent sides are equal, opposite sides not equal.', 'Kite'], ['One pair of opposite sides is equal and parallel.', 'Parallelogram']];
          const [q, a] = R.pick(items); return { q: `Name the most specific quadrilateral: ${q}`, a };
        } },
      { title: 'Parallelogram by coordinates', levels: [2, 3], gen(R) {
          const A = [R.int(-5, 2), R.int(-5, 2)], u = [R.int(2, 6), R.int(-2, 2)], v = [R.int(-2, 2), R.int(2, 6)];
          const B = [A[0] + u[0], A[1] + u[1]], D = [A[0] + v[0], A[1] + v[1]], Cc = [B[0] + v[0], B[1] + v[1]];
          return { q: `Show that A(${A}), B(${B}), C(${Cc}), D(${D}) form a parallelogram, and find the point where the diagonals meet.`.replace(/\((-?\d+),(-?\d+)\)/g, '($1, $2)'), a: `Midpoint of AC = midpoint of BD = (${num((A[0] + Cc[0]) / 2)}, ${num((A[1] + Cc[1]) / 2)}) ⇒ diagonals bisect each other ⇒ parallelogram`, s: 'Test: diagonals bisect each other (Ch 1 midpoint formula).' };
        } },
      { title: 'Rectangle diagonals', levels: [1, 2], gen(R) {
          const T = R.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17]]);
          return { q: `A rectangle has sides ${T[0]} cm and ${T[1]} cm. Find the length of each diagonal and the distance from the centre to each corner.`, a: `diagonal ${T[2]} cm, centre to corner ${num(T[2] / 2)} cm`, ans: T[2], s: 'Diagonals are equal and bisect each other.' };
        } }
    ],

    quiz: [
      { q: 'Angles of a quadrilateral add to', o: ['180°', '270°', '360°', '540°'], a: 2, e: 'Two triangles.' },
      { q: 'In parallelogram ABCD, ∠A = 70°. ∠B =', o: ['70°', '110°', '20°', '290°'], a: 1, e: 'Adjacent angles add to 180°.' },
      { q: 'The diagonals of a rhombus', o: ['are equal', 'bisect each other at right angles', 'do not bisect each other', 'are parallel'], a: 1, e: 'Property of a rhombus.' },
      { q: 'A quadrilateral with one pair of opposite sides equal and parallel is a', o: ['trapezium', 'kite', 'parallelogram', 'cannot say'], a: 2, e: 'That is a parallelogram test.' },
      { q: 'M, N midpoints of AB, AC; BC = 14 cm. MN =', o: ['7 cm', '14 cm', '28 cm', '3.5 cm'], a: 0, e: 'Midpoint theorem.' },
      { q: 'The centroid divides a median in the ratio (from the vertex)', o: ['1 : 1', '2 : 1', '1 : 2', '3 : 1'], a: 1, e: 'AG : GD = 2 : 1.' },
      { q: 'Joining the midpoints of the sides of any quadrilateral gives a', o: ['rectangle', 'square', 'parallelogram', 'trapezium'], a: 2, e: 'Varignon.' },
      { q: 'Which is always true?', o: ['every rhombus is a square', 'every square is a rhombus', 'every parallelogram is a rectangle', 'every trapezium is a parallelogram'], a: 1, e: 'A square has all sides equal.' },
      { q: 'Diagonals 10 cm and 24 cm of a rhombus give side', o: ['13 cm', '17 cm', '12 cm', '26 cm'], a: 0, e: '√(25 + 144).' },
      { q: 'Equal diagonals that bisect each other ⇒ the quadrilateral is a', o: ['rhombus', 'rectangle', 'kite', 'trapezium'], a: 1, e: 'Rectangle test.' },
      { q: 'Can any quadrilateral tile the plane?', o: ['yes', 'only squares', 'only parallelograms', 'only regular ones'], a: 0, e: 'Rotate by 180° about side midpoints; angles sum to 360° at each vertex.' }
    ],

    teach: {
      outcomes: ['Define quadrilaterals precisely and classify them', 'Prove and use properties of parallelograms and their converses (tests)', 'State, prove and apply the midpoint theorem and its converse; locate the centroid', 'Explain Varignon\'s parallelogram and why every quadrilateral tiles the plane'],
      periods: [
        { t: 'Definitions and family tree', flow: [['10 min', 'Sort cut-out quadrilaterals into a Venn diagram.'], ['15 min', 'Angle sum 360° by diagonal; non-convex example.'], ['15 min', 'Practice: Which quadrilateral? / angle sums.']] },
        { t: 'Parallelograms', flow: [['15 min', 'Explore panel 1; prove opposite sides equal using a diagonal (ASA).'], ['15 min', 'Tests (converses) and how to use them.'], ['10 min', 'Practice: Standard.']] },
        { t: 'Midpoints', flow: [['15 min', 'Explore panel 2: midpoint theorem and its proof.'], ['10 min', 'Explore panels 3 and 4: Varignon, centroid.'], ['15 min', 'Explore panel 5: tiling; Check quiz.']] }
      ],
      misconceptions: ['Hierarchy confusions (square vs rhombus vs rectangle).', 'Centroid ratio taken from the side.', 'One pair of equal sides enough for a parallelogram.'],
      activities: ['Paper-folding proof of the midpoint theorem.', 'Cut a cardboard irregular quadrilateral and tile the desk.', 'Balance a cardboard triangle on a pencil tip at the centroid.'],
      exit: ['Parallelogram with ∠B = 3∠A: find ∠A.', 'Medians: AD = 12 cm, find AG.', 'Name the shape: diagonals equal and perpendicular bisectors of each other.'],
      homework: 'Prove: the quadrilateral formed by joining the midpoints of a rectangle is a rhombus.'
    },

    slides: [
      { t: 'Quadrilaterals', b: ['Precise definitions', 'Parallelogram properties and tests', 'Midpoint theorem and centroid', 'Varignon and tiling'] },
      { t: 'Family tree', b: ['Trapezium: one pair parallel', 'Parallelogram: two pairs parallel', 'Rectangle, rhombus, square', 'Kite'] },
      { t: 'Parallelogram properties', b: ['Opposite sides equal', 'Opposite angles equal; adjacent sum 180°', 'Diagonals bisect each other'] },
      { t: 'Tests (converses)', b: ['Both pairs of opposite sides equal', 'Both pairs of opposite angles equal', 'Diagonals bisect each other', 'One pair of sides equal AND parallel'] },
      { t: 'Midpoint theorem', b: ['MN ∥ BC and MN = ½BC', 'Converse: line through midpoint parallel to a side bisects the third side', 'Centroid: medians meet, 2 : 1'] },
      { t: 'Varignon and tiling', b: ['Midpoints of any quadrilateral → parallelogram', 'Perimeter = sum of diagonals; area = half', 'Any quadrilateral tiles the plane'] },
      { t: 'Check yourself', b: ['Angles in ratio 1:2:3:4 → ?', 'Rhombus diagonals 6, 8 → side?', 'Median 9 cm → AG?', 'Answers: 36°, 72°, 108°, 144° · 5 cm · 6 cm'] }
    ]
  });
})();
