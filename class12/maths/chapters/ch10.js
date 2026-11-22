/*
TOOL:    class12_maths_ch10
FAMILY:  CBSE_REVISION / Class 12 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 10 Vector Algebra - revise, board focus, 2 explore panels (sum, dot, projection and cross magnitude of two vectors; section formula), 7 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num, Q } = G9;
  const sq = (n) => { if (n === 0) return '0'; const s = G9.surd(n); return s.i === 1 ? String(s.o) : (s.o === 1 ? '' : s.o) + '√' + s.i; };
  const vec = (v) => { const u = ['î', 'ĵ', 'k̂']; const parts = v.map((c, i) => [c, u[i]]).filter(p => p[0] !== 0); if (!parts.length) return '0⃗'; return parts.map(([c, e], i) => `${c < 0 ? (i ? ' − ' : '−') : i ? ' + ' : ''}${Math.abs(c) === 1 ? '' : num(Math.abs(c))}${e}`).join(''); };
  const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const n2 = (a) => dot(a, a);
  const rv = (R, lo = -4, hi = 5) => { let v; do { v = [R.int(lo, hi), R.int(lo, hi), R.int(lo, hi)]; } while (!n2(v)); return v; };

  G9.register({
    no: 10, part: 'Unit IV · Vectors and 3-D Geometry (14 marks)', short: 'Vector algebra', title: 'Vector Algebra',
    blurb: 'Vectors and scalars, components, addition, section formula, dot product, projection, cross product and areas.',
    revise: {
      oneLine: 'A vector has magnitude and direction: a⃗ = a₁î + a₂ĵ + a₃k̂. The dot product a⃗·b⃗ = |a||b|cos θ measures alignment (zero ⇔ perpendicular); the cross product a⃗ × b⃗ is perpendicular to both with magnitude |a||b|sin θ, the area of their parallelogram.',
      sections: [
        { h: 'Basics', html: `<p>|a⃗| = √(a₁² + a₂² + a₃²). Unit vector â = a⃗/|a⃗|. Direction cosines l, m, n = a₁/|a|, a₂/|a|, a₃/|a| with l² + m² + n² = 1.</p>
          <p>Types: zero, unit, co-initial, collinear (b⃗ = λa⃗), equal, negative. Position vector of P(x, y, z) is xî + yĵ + zk̂; AB⃗ = OB⃗ − OA⃗.</p>` },
        { h: 'Addition and section formula', html: `<p>Triangle and parallelogram laws; addition is commutative and associative. Point dividing AB in m : n internally: (m b⃗ + n a⃗)/(m + n); externally (m b⃗ − n a⃗)/(m − n). Midpoint (a⃗ + b⃗)/2.</p>` },
        { h: 'Dot product', html: `<div class="box m">a⃗·b⃗ = |a||b|cos θ = a₁b₁ + a₂b₂ + a₃b₃</div>
          <p>a⃗·b⃗ = 0 ⇔ a⃗ ⊥ b⃗. Projection of a⃗ on b⃗ = a⃗·b⃗ / |b⃗|. a⃗·a⃗ = |a|². î·î = 1, î·ĵ = 0.</p>` },
        { h: 'Cross product', html: `<p>a⃗ × b⃗ = |a||b| sin θ n̂ = |î ĵ k̂; a₁ a₂ a₃; b₁ b₂ b₃|. b⃗ × a⃗ = −(a⃗ × b⃗); a⃗ × b⃗ = 0⃗ ⇔ parallel.</p>
          <p>Area of parallelogram with sides a⃗, b⃗ = |a⃗ × b⃗|; of triangle = ½|a⃗ × b⃗|; parallelogram with diagonals d₁, d₂: ½|d₁ × d₂|.</p>` }
      ],
      formulas: [['|a⃗|', '√(a₁² + a₂² + a₃²)'], ['Dot', 'a₁b₁ + a₂b₂ + a₃b₃ = |a||b|cos θ'], ['Projection on b⃗', 'a⃗·b⃗/|b⃗|'], ['Cross', 'determinant with î ĵ k̂'], ['Triangle area', '½|AB⃗ × AC⃗|'], ['Section (m : n)', '(m b⃗ + n a⃗)/(m + n)']],
      terms: [['Unit vector', 'magnitude 1'], ['Collinear', 'parallel to the same line'], ['Direction cosines', 'cosines of angles with the axes'], ['Projection', 'shadow length on another vector']],
      traps: ['a⃗ × b⃗ ≠ b⃗ × a⃗ (sign changes).', 'Middle component of a cross product has a minus sign.', 'Projection divides by |b|, not |a|.', 'Section formula: m goes with b⃗.'],
      board: '<p><b>Unit IV (Vectors and 3-D Geometry) — 14 marks.</b> Expect: unit vectors, direction cosines (1 mark), angle/projection/perpendicularity via the dot product (2 marks), area via the cross product (2–3 marks).</p>',
      bridge: '<p>Ch 11 writes lines with vectors and uses cross products for shortest distances.</p>'
    },

    explore: [
      {
        title: 'Two vectors in the plane', intro: 'Drag the tips of a⃗ and b⃗. See a⃗ + b⃗, the angle, a⃗·b⃗, the projection of a⃗ on b⃗ and |a⃗ × b⃗| (parallelogram area).',
        build(el, K) {
          const bd = new K.Board(el, { xmin: -7, xmax: 7, ymin: -5, ymax: 5 }); const rd = K.read(el);
          const A = bd.addPt(4, 1, { label: 'a⃗', snap: 0.5, color: C.blue }), B = bd.addPt(1, 3, { label: 'b⃗', snap: 0.5, color: C.orange });
          bd.onDraw = () => { bd.base(); const a = [A.x, A.y, 0], b = [B.x, B.y, 0];
            bd.poly([[0, 0], [A.x, A.y], [A.x + B.x, A.y + B.y], [B.x, B.y]], { fill: 'rgba(124,58,237,.12)', color: C.grey, w: 1, dash: [4, 4] });
            bd.arrow(0, 0, A.x, A.y, { color: C.blue, w: 3 }); bd.arrow(0, 0, B.x, B.y, { color: C.orange, w: 3 }); bd.arrow(0, 0, A.x + B.x, A.y + B.y, { color: C.purple, w: 2 });
            const nb = Math.sqrt(n2(b)), d = dot(a, b); if (nb) { const t = d / n2(b); bd.line(0, 0, t * B.x, t * B.y, { color: C.ink, w: 5 }); bd.line(A.x, A.y, t * B.x, t * B.y, { color: C.grey, w: 1, dash: [3, 3] }); }
            const th = nb && n2(a) ? Math.acos(Math.max(-1, Math.min(1, d / (nb * Math.sqrt(n2(a)))))) * 180 / Math.PI : 0;
            bd.drawPts(); rd.innerHTML = `a⃗ = ${vec([A.x, A.y, 0])}, b⃗ = ${vec([B.x, B.y, 0])} · a⃗ + b⃗ = ${vec([A.x + B.x, A.y + B.y, 0])} · a⃗·b⃗ = <b>${num(d)}</b> · θ = ${num(th, 1)}°${Math.abs(d) < 1e-9 ? ' (perpendicular)' : ''} · projection of a⃗ on b⃗ = ${nb ? num(d / nb, 3) : '—'} (thick) · |a⃗ × b⃗| = ${num(Math.abs(A.x * B.y - A.y * B.x))} = parallelogram area`; };
          bd.redraw(); return null;
        }
      },
      {
        title: 'Section formula', intro: 'P divides AB in the ratio m : n. Internal division lies between A and B; external lies outside.',
        build(el, K) {
          let m = 2, n = 1, ext = 0; const row = K.row(el); K.slider(row, 'm', 1, 6, 1, m, v => { m = v; bd.redraw(); }); K.slider(row, 'n', 1, 6, 1, n, v => { n = v; bd.redraw(); }); K.select(row, 'division', ['internal', 'external'], i => { ext = i; bd.redraw(); });
          const bd = new K.Board(el, { xmin: -8, xmax: 8, ymin: -5, ymax: 5 }); const rd = K.read(el); const A = bd.addPt(-4, -2, { label: 'A', snap: 1 }), B = bd.addPt(2, 2, { label: 'B', snap: 1 });
          bd.onDraw = () => { bd.base(); if (ext && m === n) { rd.innerHTML = 'External division needs m ≠ n.'; bd.drawPts(); return; } const s = ext ? -1 : 1;
            const P = [(m * B.x + s * n * A.x) / (m + s * n), (m * B.y + s * n * A.y) / (m + s * n)]; bd.infLine(B.y - A.y, A.x - B.x, (B.y - A.y) * A.x + (A.x - B.x) * A.y, { color: C.grey, w: 1, dash: [4, 4] });
            bd.line(A.x, A.y, B.x, B.y, { color: C.blue, w: 3 }); bd.dot(P[0], P[1], { color: C.orange, r: 7, label: 'P' }); bd.drawPts();
            rd.innerHTML = `P = (${m}·b⃗ ${ext ? '−' : '+'} ${n}·a⃗)/(${m} ${ext ? '−' : '+'} ${n}) = (${num(P[0], 3)}, ${num(P[1], 3)}) · AP : PB = ${m} : ${n}${ext ? ' (externally)' : ''}`; };
          bd.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Magnitude, unit vector, direction cosines', gen(R) {
          const T = R.pick([[1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [2, 6, 9, 11], [4, 4, 7, 9]]); const v = R.shuffle(T.slice(0, 3)).map(x => x * R.sign()); const m = T[3];
          return { q: `For a⃗ = ${vec(v)}, find |a⃗|, the unit vector â and the direction cosines.`, a: `|a⃗| = ${m}; â = (1/${m})(${vec(v)}); l, m, n = ${v.map(x => Q(x, m)).join(', ')}`, ans: m };
        } },
      { title: 'Dot product and angle', gen(R) {
          const a = rv(R), b = rv(R); const d = dot(a, b);
          return { q: `Find a⃗·b⃗ and cos θ for a⃗ = ${vec(a)}, b⃗ = ${vec(b)}.`, a: `a⃗·b⃗ = ${d}; cos θ = ${d}/(${sq(n2(a))} × ${sq(n2(b))})`, ans: d };
        } },
      { title: 'Perpendicular — find λ', levels: [1, 2], gen(R) {
          let a; do { a = rv(R, -3, 4); } while (a[2] === 0); const b = [R.int(-4, 4), R.int(-4, 4), 0];
          const lam = -(a[0] * b[0] + a[1] * b[1]) / a[2];
          return { q: `Find λ if ${vec(a)} and ${vec([b[0], b[1], 0])}${' + λk̂'} are perpendicular.`.replace(/^Find λ if (.*) and 0⃗ \+ λk̂/, 'Find λ if $1 and λk̂'), a: `λ = ${Q(-(a[0] * b[0] + a[1] * b[1]), a[2])}`, ans: lam };
        } },
      { title: 'Projection', levels: [2, 3], gen(R) {
          const a = rv(R); const T = R.pick([[1, 2, 2, 3], [2, 3, 6, 7], [2, 1, 2, 3], [0, 3, 4, 5]]); const b = T.slice(0, 3);
          return { q: `Find the projection of a⃗ = ${vec(a)} on b⃗ = ${vec(b)}.`, a: Q(dot(a, b), T[3]), ans: dot(a, b) / T[3], s: `a⃗·b⃗ / |b⃗| = ${dot(a, b)}/${T[3]}` };
        } },
      { title: 'Cross product', gen(R) {
          const a = rv(R, -3, 4), b = rv(R, -3, 4); const c = cross(a, b);
          return { q: `Find a⃗ × b⃗ and |a⃗ × b⃗| for a⃗ = ${vec(a)}, b⃗ = ${vec(b)}.`, a: `${vec(c)}; |a⃗ × b⃗| = ${sq(n2(c))}`, ans: Math.sqrt(n2(c)) };
        } },
      { title: 'Area of a triangle / parallelogram', levels: [2, 3], gen(R) {
          const A = rv(R, -3, 3), B = rv(R, -3, 3), Cc = rv(R, -3, 3); const ab = B.map((v, i) => v - A[i]), ac = Cc.map((v, i) => v - A[i]); const c = cross(ab, ac);
          if (!n2(c)) return this.gen(R);
          return { q: `Find the area of the triangle with vertices A(${A.join(', ')}), B(${B.join(', ')}), C(${Cc.join(', ')}).`, a: `½ × ${sq(n2(c))} sq units`, ans: Math.sqrt(n2(c)) / 2, s: `AB⃗ × AC⃗ = ${vec(c)}` };
        } },
      { title: 'Section formula', levels: [1, 2], gen(R) {
          const a = rv(R, -4, 4), b = rv(R, -4, 4), m = R.int(1, 4), n = R.int(1, 4);
          return { q: `Find the position vector of the point dividing the join of ${vec(a)} and ${vec(b)} internally in the ratio ${m} : ${n}.`, a: `(1/${m + n})(${vec(b.map((v, i) => m * v + n * a[i]))})`, s: '(m b⃗ + n a⃗)/(m + n)' };
        } }
    ],

    quiz: [
      { q: '|2î − ĵ + 2k̂| =', o: ['3', '5', '9', '√5'], a: 0, e: '√(4 + 1 + 4).' },
      { q: 'î·ĵ =', o: ['0', '1', 'k̂', '−1'], a: 0, e: 'Perpendicular.' },
      { q: 'î × ĵ =', o: ['k̂', '−k̂', '0', '1'], a: 0, e: 'Right-hand rule.' },
      { q: 'a⃗·b⃗ = 0 (non-zero vectors) means', o: ['parallel', 'perpendicular', 'equal', 'collinear'], a: 1, e: 'cos θ = 0.' },
      { q: 'Area of the parallelogram on a⃗, b⃗', o: ['|a⃗ × b⃗|', 'a⃗·b⃗', '½|a⃗ × b⃗|', '|a||b|'], a: 0, e: 'Cross product magnitude.' },
      { q: 'b⃗ × a⃗ =', o: ['a⃗ × b⃗', '−(a⃗ × b⃗)', '0⃗', 'a⃗·b⃗'], a: 1, e: 'Anti-commutative.' },
      { q: 'Projection of a⃗ on b⃗', o: ['a⃗·b⃗/|b⃗|', 'a⃗·b⃗/|a⃗|', '|a⃗ × b⃗|', 'a⃗·b⃗'], a: 0, e: 'Divide by |b|.' },
      { q: 'Sum of squares of direction cosines', o: ['1', '0', '3', '2'], a: 0, e: 'l² + m² + n² = 1.' },
      { q: 'a⃗ × a⃗ =', o: ['0⃗', '|a|²', 'a⃗', '1'], a: 0, e: 'sin 0 = 0.' },
      { q: 'Midpoint of a⃗ and b⃗ has position vector', o: ['(a⃗ + b⃗)/2', 'a⃗ − b⃗', '(a⃗ − b⃗)/2', 'a⃗ + b⃗'], a: 0, e: '1 : 1 ratio.' },
      { q: 'If a⃗ × b⃗ = 0⃗ (non-zero vectors), then they are', o: ['parallel', 'perpendicular', 'unit', 'equal in length'], a: 0, e: 'sin θ = 0.' }
    ],

    teach: {
      outcomes: ['Work with components, magnitudes, unit vectors and direction cosines', 'Add vectors and use the section formula', 'Use the dot product for angles, perpendicularity and projection', 'Use the cross product for normals and areas'],
      periods: [
        { t: 'Vectors and addition', flow: [['10 min', 'Displacement vs distance.'], ['15 min', 'Components; magnitude; unit vectors.'], ['15 min', 'Explore panel 2: section formula.']] },
        { t: 'Dot product', flow: [['15 min', 'Explore panel 1: dot and projection.'], ['15 min', 'Angles and perpendicularity.'], ['10 min', 'Practice.']] },
        { t: 'Cross product', flow: [['20 min', 'Determinant form, right-hand rule.'], ['10 min', 'Areas.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Cross product sign.', 'Projection divisor.', 'Section ratio order.'],
      activities: ['Right-hand rule with pencils for î, ĵ, k̂.', 'Work done = F⃗·d⃗ on an inclined pull.'],
      exit: ['Unit vector along 3î + 4k̂.', '(î + ĵ)·(î − ĵ).', '|î × (î + ĵ)|.'],
      homework: 'Find a unit vector perpendicular to both a⃗ + b⃗ and a⃗ − b⃗ where a⃗ = î + ĵ + k̂, b⃗ = î + 2ĵ + 3k̂.'
    },

    slides: [
      { t: 'Vector Algebra', b: ['Components and magnitude', 'Addition and section formula', 'Dot product', 'Cross product'] },
      { t: 'Dot product', b: ['a⃗·b⃗ = |a||b|cos θ', '= a₁b₁ + a₂b₂ + a₃b₃', 'Zero ⇔ perpendicular', 'Projection a⃗·b⃗/|b⃗|'] },
      { t: 'Cross product', b: ['|î ĵ k̂; a; b|', 'Perpendicular to both', '|a × b| = parallelogram area'] },
      { t: 'Check yourself', b: ['(2î + ĵ)·(î − 3ĵ)?', 'î × k̂?', 'Answers: −1 · −ĵ'] }
    ],

    fs: { groups: [
        ['Basics', [['|a⃗|', '√(a₁² + a₂² + a₃²)'], ['Unit vector', 'a⃗/|a⃗|'], ['Direction cosines', 'a₁/|a|, a₂/|a|, a₃/|a|'], ['l² + m² + n²', '1'], ['AB⃗', 'OB⃗ − OA⃗']]],
        ['Section formula', [['Internal m : n', '(m b⃗ + n a⃗)/(m + n)'], ['External', '(m b⃗ − n a⃗)/(m − n)'], ['Midpoint', '(a⃗ + b⃗)/2']]],
        ['Dot product', [['a⃗·b⃗', '|a||b|cos θ = Σaᵢbᵢ'], ['Perpendicular', 'a⃗·b⃗ = 0'], ['Projection on b⃗', 'a⃗·b⃗/|b⃗|'], ['î·î, î·ĵ', '1, 0']]],
        ['Cross product', [['a⃗ × b⃗', '|a||b|sin θ n̂'], ['Components', '(a₂b₃ − a₃b₂)î − (a₁b₃ − a₃b₁)ĵ + (a₁b₂ − a₂b₁)k̂'], ['Parallel', 'a⃗ × b⃗ = 0⃗'], ['Areas', 'parallelogram |a × b|, triangle ½|a × b|'], ['î × ĵ', 'k̂ (cyclic)']]]],
      ex: [['a⃗ = î + 2ĵ + 2k̂', '|a| = 3, â = (î + 2ĵ + 2k̂)/3'], ['(î + ĵ) × (ĵ + k̂)', 'î − ĵ + k̂']],
      rem: ['Minus sign on the middle cross component.', 'Projection divides by |b|.', 'Cross product changes sign when swapped.'] }
  });
})();
