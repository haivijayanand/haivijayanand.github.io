/*
TOOL:    class10_maths_ch06
FAMILY:  CBSE_REVISION / Class 10 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 6 Triangles - revise, board focus, 2 explore panels (Basic Proportionality Theorem, similar triangles by scaling), 8 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { F, Q, num, C } = G9;
  const len = (P, R_) => Math.hypot(P.x - R_.x, P.y - R_.y);

  G9.register({
    no: 6, part: 'Unit IV · Geometry (15 marks)', short: 'Triangles', title: 'Triangles',
    blurb: 'Similar figures, Basic Proportionality Theorem and its converse, AA, SSS and SAS similarity.',
    revise: {
      oneLine: 'Similar triangles have the same shape: equal corresponding angles and proportional corresponding sides. A line parallel to one side divides the other two in the same ratio (BPT), and AA, SSS or SAS is enough to prove similarity.',
      sections: [
        { h: 'Similar figures', html: `<p>Two polygons with the same number of sides are <b>similar</b> if (i) corresponding angles are equal and (ii) corresponding sides are in the same ratio. All circles, all squares and all equilateral triangles are similar. Congruent figures are similar with ratio 1.</p>` },
        { h: 'Basic Proportionality Theorem (Thales)', html: `<p>If a line is drawn parallel to one side of a triangle, cutting the other two sides at distinct points, it divides those sides in the same ratio:</p>
          <div class="box m">DE ∥ BC ⇒ ${F('AD', 'DB')} = ${F('AE', 'EC')}</div>
          <p>Also AD/AB = AE/AC and DE/BC = AD/AB. <b>Converse:</b> if AD/DB = AE/EC, then DE ∥ BC.</p>
          <p>Proof idea: compare areas of triangles ADE, BDE, DEC with the same heights; △BDE and △DEC have equal areas (same base DE, between the same parallels).</p>` },
        { h: 'Criteria for similarity', html: `<ul><li><b>AA</b> (AAA): two angles of one triangle equal two angles of the other.</li><li><b>SSS</b>: all three pairs of sides in the same ratio.</li><li><b>SAS</b>: one angle equal and the sides including it in the same ratio.</li></ul>
          <p>Write the correspondence in order: △ABC ~ △PQR means A↔P, B↔Q, C↔R, so AB/PQ = BC/QR = CA/RP.</p>` },
        { h: 'Using similarity', html: `<ul><li>Shadows: a pole and a tower at the same time of day give similar triangles: height₁/shadow₁ = height₂/shadow₂.</li><li>Ratio of perimeters = ratio of corresponding sides.</li><li>Look for vertically opposite angles, common angles and alternate angles to get AA.</li></ul>` }
      ],
      formulas: [['BPT', 'DE ∥ BC ⇒ AD/DB = AE/EC'], ['Also', 'AD/AB = AE/AC = DE/BC'], ['Converse', 'AD/DB = AE/EC ⇒ DE ∥ BC'], ['Similar △', 'AB/PQ = BC/QR = CA/RP'], ['Perimeters', 'ratio = ratio of sides']],
      terms: [['Similar', 'same shape, possibly different size'], ['Corresponding', 'matching vertices/sides in the stated order'], ['Scale factor', 'ratio of corresponding sides'], ['Transversal', 'line cutting two sides']],
      traps: ['Writing the similarity in the wrong vertex order and pairing the wrong sides.', 'Using AD/AB = DE/DB — DE pairs with BC, not with DB.', 'Thinking two rhombuses with equal sides must be similar (angles may differ).', 'Applying BPT when DE is not parallel to BC.'],
      board: '<p><b>Unit IV (Geometry) — 15 marks</b> with Ch 10 (Circles). Expect: 1-mark on similarity criteria or a BPT ratio; 2–3 marks on finding lengths; a 5-mark proof of BPT (state, figure, given, to prove, construction, proof).</p>',
      bridge: '<p>Similarity gives trigonometric ratios (Ch 8): every right triangle with the same acute angle is similar, so sin, cos, tan depend only on the angle.</p>'
    },

    explore: [
      {
        title: 'Basic Proportionality Theorem', intro: 'Drag D along AB; E moves so that DE ∥ BC. AD/DB and AE/EC stay equal. Drag A, B, C to change the triangle.',
        build(el, K) {
          const b = new K.Board(el, { xmin: -1, xmax: 13, ymin: -1, ymax: 9 });
          const A = b.addPt(4, 8, { label: 'A' }), B = b.addPt(0, 0, { label: 'B' }), Cc = b.addPt(12, 0, { label: 'C' }); let t = 0.4;
          const D = b.addPt(0, 0, { label: 'D', color: C.purple, constrain: (x, y) => { const dx = B.x - A.x, dy = B.y - A.y; t = Math.max(0.05, Math.min(0.95, ((x - A.x) * dx + (y - A.y) * dy) / (dx * dx + dy * dy))); return [A.x + t * dx, A.y + t * dy]; } });
          const rd = K.read(el);
          b.onDraw = () => {
            D.x = A.x + t * (B.x - A.x); D.y = A.y + t * (B.y - A.y); const E = { x: A.x + t * (Cc.x - A.x), y: A.y + t * (Cc.y - A.y) };
            b.base(); b.poly([[A.x, A.y], [B.x, B.y], [Cc.x, Cc.y]], { fill: C.blueL, color: C.blue }); b.line(D.x, D.y, E.x, E.y, { color: C.orange, w: 4 });
            b.dot(E.x, E.y, { color: C.purple, label: 'E' }); b.drawPts();
            rd.innerHTML = `AD = ${num(len(A, D))}, DB = ${num(len(D, B))}, AD/DB = <b>${num(len(A, D) / len(D, B), 3)}</b> &nbsp;·&nbsp; AE = ${num(len(A, E))}, EC = ${num(len(E, Cc))}, AE/EC = <b>${num(len(A, E) / len(E, Cc), 3)}</b><br>DE/BC = ${num(len(D, E) / len(B, Cc), 3)} = AD/AB = ${num(len(A, D) / len(A, B), 3)}`;
          };
          b.redraw(); return null;
        }
      },
      {
        title: 'Similar triangles by scaling', intro: 'Change the scale factor k. Angles stay the same; every side is multiplied by k, so sides are proportional (and so are perimeters).',
        build(el, K) {
          let k = 1.5; const row = K.row(el); K.slider(row, 'scale factor k', 0.5, 2.5, 0.1, k, v => { k = v; b.redraw(); });
          const b = new K.Board(el, { xmin: -1, xmax: 22, ymin: -1, ymax: 11, axes: false }); const rd = K.read(el);
          const T = [[0, 0], [5, 0], [1.5, 3.5]];
          b.onDraw = () => {
            b.base(); b.poly(T, { fill: C.blueL, color: C.blue }); const S = T.map(([x, y]) => [8 + k * x, k * y]); b.poly(S, { fill: C.orangeL, color: C.orange });
            ['A', 'B', 'C'].forEach((l, i) => { b.text(T[i][0] - 0.3, T[i][1] + 0.4, l, { font: 'bold 14px', color: C.blue }); b.text(S[i][0] - 0.3, S[i][1] + 0.4, 'PQR'[i], { font: 'bold 14px', color: C.orange }); });
            const s1 = [5, Math.hypot(3.5, 3.5), Math.hypot(1.5, 3.5)];
            rd.innerHTML = `△ABC ~ △PQR · AB = ${num(s1[0])}, PQ = ${num(k * s1[0])} · BC = ${num(s1[1])}, QR = ${num(k * s1[1])} · CA = ${num(s1[2])}, RP = ${num(k * s1[2])}<br>PQ/AB = QR/BC = RP/CA = <b>${num(k)}</b> · perimeter ratio = ${num(k)} · angles unchanged, so the shape is the same.`;
          };
          b.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'BPT: find a length', gen(R, L) {
          const ad = R.int(2, 12), db = R.int(2, 12), k = R.pick([0.5, 1, 1.5, 2, 3]); const ae = ad * k, ec = db * k;
          return R.chance(.5) ? { q: `In △ABC, DE ∥ BC with D on AB and E on AC. If AD = ${ad} cm, DB = ${db} cm and AE = ${num(ae)} cm, find EC.`, a: `${num(ec)} cm`, ans: ec, s: `AD/DB = AE/EC ⇒ EC = ${num(ae)} × ${db}/${ad}` }
            : { q: `In △ABC, DE ∥ BC. If AD = ${ad} cm, AB = ${ad + db} cm and AC = ${num(ae + ec)} cm, find AE.`, a: `${num(ae)} cm`, ans: ae, s: `AD/AB = AE/AC` };
        } },
      { title: 'BPT with x', levels: [2, 3], gen(R) {
          if (R.chance(.5)) { const v = R.pick([['x', 'x − 2', 'x + 2', 'x − 1', 4], ['4x − 3', '3x − 1', '8x − 7', '5x − 3', 1], ['x + 1', '6', '2x', '8', 2]]);
            return { q: `In △ABC, DE ∥ BC. If AD = ${v[0]}, DB = ${v[1]}, AE = ${v[2]} and EC = ${v[3]}, find x.`, a: `x = ${v[4]}`, ans: v[4], s: `AD × EC = AE × DB ⇒ (${v[0]})(${v[3]}) = (${v[2]})(${v[1]}); keep the root that makes all lengths positive` }; }
          let x0, p, r, q, sv; do { x0 = R.int(2, 9); p = R.int(0, 4); r = R.int(1, 6); q = R.int(2, 12); sv = q * (x0 + r) / (x0 + p); } while (!Number.isInteger(sv) || p === r);
          return { q: `In △ABC, DE ∥ BC. If AD = ${p ? 'x + ' + p : 'x'} cm, DB = ${q} cm, AE = x + ${r} cm and EC = ${sv} cm, find x.`, a: `x = ${x0}`, ans: x0, s: `(x + ${p}) × ${sv} = (x + ${r}) × ${q} ⇒ ${sv - q}x = ${q * r - sv * p}` };
        } },
      { title: 'Converse of BPT: is DE ∥ BC?', gen(R) {
          const ad = R.int(2, 10), db = R.int(2, 10), k = R.pick([1, 1.5, 2]), par = R.chance(.5); const ae = ad * k, ec = par ? db * k : db * k + R.pick([0.5, 1, -0.5]);
          return { q: `D and E are points on AB and AC of △ABC with AD = ${ad}, DB = ${db}, AE = ${num(ae)}, EC = ${num(ec)} (cm). Is DE ∥ BC?`, a: par ? `Yes: AD/DB = AE/EC = ${num(ad / db, 3)}, so DE ∥ BC (converse of BPT).` : `No: AD/DB = ${num(ad / db, 3)} ≠ AE/EC = ${num(ae / ec, 3)}.`, s: 'Compare the two ratios.' };
        } },
      { title: 'Similar triangles: find a side', gen(R) {
          const k = R.pick([1.5, 2, 2.5, 3, 0.5]), a = R.int(3, 12), b = R.int(3, 12), c = R.int(Math.abs(a - b) + 1, a + b - 1);
          return { q: `△ABC ~ △PQR with AB = ${a}, BC = ${b}, CA = ${c} and PQ = ${num(a * k)}. Find QR and RP.`, a: `QR = ${num(b * k)}, RP = ${num(c * k)}`, s: `scale factor PQ/AB = ${num(k)}` };
        } },
      { title: 'Shadow problem', gen(R) {
          const h = R.int(2, 8) * 0.5 + 1, s = R.int(2, 8) * 0.5, S = R.int(10, 40);
          return { q: `A vertical pole ${num(h)} m tall casts a shadow ${num(s)} m long. At the same time a tower casts a shadow ${S} m long. Find the height of the tower.`, a: `${num(h * S / s)} m`, ans: h * S / s, s: `h/${S} = ${num(h)}/${num(s)} (AA: equal sun angles and right angles)` };
        } },
      { title: 'Perimeter ratio', levels: [2, 3], gen(R) {
          const p1 = R.int(20, 60), k = R.pick([2, 3, 1.5]), s1 = R.int(4, 12);
          return { q: `Two similar triangles have perimeters ${p1} cm and ${num(p1 * k)} cm. If one side of the first is ${s1} cm, find the corresponding side of the second.`, a: `${num(s1 * k)} cm`, ans: s1 * k, s: 'Ratio of perimeters = ratio of corresponding sides' };
        } },
      { title: 'Which criterion?', levels: [1, 2], gen(R) {
          const items = [['∠A = ∠P = 50°, ∠B = ∠Q = 70°', 'AA'], ['AB/PQ = BC/QR = CA/RP = 2', 'SSS'], ['∠B = ∠Q and AB/PQ = BC/QR', 'SAS'], ['AB/PQ = AC/PR and ∠B = ∠Q', 'not enough (angle is not between the given sides)'], ['∠A = ∠P only', 'not enough']];
          const [q, a] = R.pick(items); return { q: `In △ABC and △PQR: ${q}. Which similarity criterion (if any) proves △ABC ~ △PQR?`, a };
        } },
      { title: 'Similarity in a trapezium', levels: [3], gen(R) {
          const ab = R.int(6, 20), cd = R.int(3, ab - 1), oc = R.int(2, 10);
          return { q: `ABCD is a trapezium with AB ∥ DC; the diagonals meet at O. If AB = ${ab} cm, DC = ${cd} cm and OC = ${oc} cm, find OA.`, a: `${num(oc * ab / cd)} cm`, ans: oc * ab / cd, s: `△AOB ~ △COD (AA: alternate angles) ⇒ OA/OC = AB/CD` };
        } }
    ],

    quiz: [
      { q: 'In △ABC, DE ∥ BC, AD = 2, DB = 3, AE = 4. EC =', o: ['6', '5', '8/3', '1.5'], a: 0, e: '2/3 = 4/EC.' },
      { q: 'All ____ are similar.', o: ['rectangles', 'rhombuses', 'squares', 'isosceles triangles'], a: 2, e: 'Equal angles and proportional sides always.' },
      { q: 'If △ABC ~ △DEF, AB = 4, DE = 6, then BC/EF =', o: ['2/3', '3/2', '4/9', '1'], a: 0, e: 'Ratio of corresponding sides.' },
      { q: 'Two triangles with two equal pairs of angles are similar by', o: ['SSS', 'SAS', 'AA', 'RHS'], a: 2, e: 'Third angles are then equal too.' },
      { q: 'A 6 m pole casts a 4 m shadow; a tower casts a 28 m shadow. Tower height:', o: ['42 m', '18.7 m', '24 m', '36 m'], a: 0, e: '6/4 = h/28.' },
      { q: 'BPT is also called', o: ['Pythagoras theorem', 'Thales theorem', 'Euclid lemma', 'Midpoint theorem'], a: 1, e: 'Thales.' },
      { q: 'If AD/DB = AE/EC in △ABC, then', o: ['DE ⊥ BC', 'DE ∥ BC', 'DE = BC', 'AD = AE'], a: 1, e: 'Converse of BPT.' },
      { q: 'Perimeters of two similar triangles are 30 and 20. A side of the first is 9; the matching side of the second is', o: ['6', '13.5', '4', '12'], a: 0, e: '9 × 20/30.' },
      { q: 'In △ABC, DE ∥ BC, AD/AB = 1/3, BC = 12. DE =', o: ['4', '6', '3', '9'], a: 0, e: 'DE/BC = AD/AB.' },
      { q: 'SAS similarity needs', o: ['any angle and two sides', 'the included angle equal and sides around it proportional', 'three angles', 'two right angles'], a: 1, e: 'The angle must be between the sides.' },
      { q: 'Diagonals of trapezium ABCD (AB ∥ CD) meet at O. Then OA/OC =', o: ['AB/CD', 'AD/BC', 'OB/OA', '1'], a: 0, e: '△AOB ~ △COD.' }
    ],

    teach: {
      outcomes: ['Distinguish similar and congruent figures', 'State, prove and apply BPT and its converse', 'Prove similarity using AA, SSS, SAS and use corresponding sides', 'Solve shadow and trapezium problems'],
      periods: [
        { t: 'Similar figures', flow: [['10 min', 'Photo enlargements, maps — same shape, different size.'], ['15 min', 'Explore panel 2: scaling.'], ['15 min', 'Which polygons are always similar?']] },
        { t: 'BPT', flow: [['15 min', 'Explore panel 1; conjecture then proof with areas.'], ['15 min', 'Numerical problems and the converse.'], ['10 min', 'Practice: Standard.']] },
        { t: 'Criteria and applications', flow: [['15 min', 'AA, SSS, SAS with cut-out triangles.'], ['15 min', 'Shadows, trapezium diagonals.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Wrong vertex correspondence.', 'Pairing DE with DB.', 'SAS with a non-included angle.'],
      activities: ['Measure the school flagpole by its shadow.', 'Paper triangles: cut a parallel strip and measure ratios.'],
      exit: ['DE ∥ BC, AD = 3, DB = 5, AC = 16: AE?', 'Criterion for two right triangles with one equal acute angle?', 'Pole 2 m, shadow 3 m; tree shadow 12 m: height?'],
      homework: 'Prove: the line joining the midpoints of two sides of a triangle is parallel to the third side (use the converse of BPT).'
    },

    slides: [
      { t: 'Triangles', b: ['Similar figures', 'Basic Proportionality Theorem', 'Similarity criteria', 'Applications'] },
      { t: 'Similar figures', b: ['Equal corresponding angles', 'Proportional corresponding sides', 'All squares, circles, equilateral triangles are similar'] },
      { t: 'BPT (Thales)', b: ['DE ∥ BC ⇒ AD/DB = AE/EC', 'Also AD/AB = AE/AC = DE/BC', 'Converse: equal ratios ⇒ DE ∥ BC'] },
      { t: 'Criteria', b: ['AA', 'SSS', 'SAS (included angle)', 'Write correspondence in order'] },
      { t: 'Applications', b: ['Shadow: h₁/s₁ = h₂/s₂', 'Trapezium diagonals: OA/OC = AB/CD', 'Perimeter ratio = side ratio'] },
      { t: 'Check yourself', b: ['DE ∥ BC, AD = 4, DB = 6, AE = 6: EC?', 'Answer: 9'] }
    ],

    fs: { groups: [
        ['Similarity', [['Similar polygons', 'equal angles and proportional sides'], ['Always similar', 'circles, squares, equilateral triangles'], ['△ABC ~ △PQR', 'AB/PQ = BC/QR = CA/RP']]],
        ['Basic Proportionality Theorem', [['DE ∥ BC', 'AD/DB = AE/EC'], ['Also', 'AD/AB = AE/AC = DE/BC'], ['Converse', 'AD/DB = AE/EC ⇒ DE ∥ BC']]],
        ['Criteria', [['AA', 'two pairs of equal angles'], ['SSS', 'three sides proportional'], ['SAS', 'included angle equal, sides around it proportional']]],
        ['Applications', [['Shadows', 'h₁/s₁ = h₂/s₂'], ['Perimeters', 'ratio = side ratio'], ['Trapezium AB ∥ CD', 'OA/OC = OB/OD = AB/CD']]]],
      ex: [['DE ∥ BC, AD = 1.5, DB = 3, AE = 1', 'EC = 1 × 3/1.5 = 2'], ['Pole 6 m, shadow 4 m; tower shadow 28 m', 'height = 6 × 28/4 = 42 m']],
      rem: ['Match vertices in the stated order.', 'DE corresponds to BC, not DB.', 'BPT proof: given, to prove, construction, proof.'] }
  });
})();
