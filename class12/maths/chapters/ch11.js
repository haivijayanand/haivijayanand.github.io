/*
TOOL:    class12_maths_ch11
FAMILY:  CBSE_REVISION / Class 12 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 11 Three Dimensional Geometry - revise, board focus, 2 explore panels (rotatable line in space with direction ratios, skew-line shortest distance), 6 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num, Q } = G9;
  const sq = (n) => { if (n === 0) return '0'; const s = G9.surd(n); return s.i === 1 ? String(s.o) : (s.o === 1 ? '' : s.o) + '√' + s.i; };
  const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const sub = (a, b) => a.map((v, i) => v - b[i]);
  const frac = (p, d) => `(${['x', 'y', 'z'].map((v, i) => `${v} ${p[i] < 0 ? '+' : '−'} ${Math.abs(p[i])}`.replace(/ − 0$| \+ 0$/, '')).map((t, i) => `${t}`)})`;
  const cart = (p, d) => ['x', 'y', 'z'].map((v, i) => `(${`${v} ${p[i] < 0 ? '+' : '−'} ${Math.abs(p[i])}`.replace(/ [−+] 0$/, '')})/${d[i] < 0 ? '(' + d[i] + ')' : d[i]}`).join(' = ').replace(/\((\w)\)/g, '$1');
  const vec = (v) => { const u = ['î', 'ĵ', 'k̂']; const parts = v.map((c, i) => [c, u[i]]).filter(p => p[0] !== 0); if (!parts.length) return '0⃗'; return parts.map(([c, e], i) => `${c < 0 ? (i ? ' − ' : '−') : i ? ' + ' : ''}${Math.abs(c) === 1 ? '' : num(Math.abs(c))}${e}`).join(''); };
  const rd3 = (R, lo = -4, hi = 4) => { let v; do { v = [R.int(lo, hi), R.int(lo, hi), R.int(lo, hi)]; } while (!dot(v, v)); return v; };

  G9.register({
    no: 11, part: 'Unit IV · Vectors and 3-D Geometry (14 marks)', short: '3-D geometry', title: 'Three Dimensional Geometry',
    blurb: 'Direction cosines and ratios, equation of a line (vector and Cartesian), angle between lines, shortest distance between skew and parallel lines.',
    revise: {
      oneLine: 'A line in space is fixed by a point and a direction: r⃗ = a⃗ + λb⃗, or (x − x₁)/a = (y − y₁)/b = (z − z₁)/c. Angles come from the dot product of directions, and the shortest distance between skew lines from the cross product.',
      sections: [
        { h: 'Direction cosines and ratios', html: `<p>If a line makes angles α, β, γ with the axes, l = cos α, m = cos β, n = cos γ, and l² + m² + n² = 1. Direction ratios a, b, c are proportional: l = a/√(a² + b² + c²), etc.</p>
          <p>Through (x₁, y₁, z₁) and (x₂, y₂, z₂): direction ratios x₂ − x₁, y₂ − y₁, z₂ − z₁.</p>` },
        { h: 'Equation of a line', html: `<p>Vector: r⃗ = a⃗ + λb⃗. Cartesian: (x − x₁)/a = (y − y₁)/b = (z − z₁)/c. Through two points: r⃗ = a⃗ + λ(b⃗ − a⃗).</p>
          <p>A general point on the line: (x₁ + aλ, y₁ + bλ, z₁ + cλ) — use it to find feet of perpendiculars and intersections.</p>` },
        { h: 'Angle between lines', html: `<p>cos θ = |a₁a₂ + b₁b₂ + c₁c₂| / (√(a₁² + b₁² + c₁²)√(a₂² + b₂² + c₂²)) = |b⃗₁·b⃗₂|/(|b⃗₁||b⃗₂|). Perpendicular: a₁a₂ + b₁b₂ + c₁c₂ = 0. Parallel: ratios proportional.</p>` },
        { h: 'Shortest distance', html: `<div class="box m">Skew lines r⃗ = a⃗₁ + λb⃗₁, r⃗ = a⃗₂ + μb⃗₂: d = |(b⃗₁ × b⃗₂)·(a⃗₂ − a⃗₁)| / |b⃗₁ × b⃗₂|</div>
          <p>Parallel lines (common b⃗): d = |b⃗ × (a⃗₂ − a⃗₁)| / |b⃗|. If d = 0 the lines intersect.</p>` }
      ],
      formulas: [['l² + m² + n²', '1'], ['Line (vector)', 'r⃗ = a⃗ + λb⃗'], ['Line (Cartesian)', '(x − x₁)/a = (y − y₁)/b = (z − z₁)/c'], ['Angle', 'cos θ = |b₁·b₂|/(|b₁||b₂|)'], ['Skew SD', '|(b₁ × b₂)·(a₂ − a₁)|/|b₁ × b₂|'], ['Parallel SD', '|b × (a₂ − a₁)|/|b|']],
      terms: [['Direction ratios', 'numbers proportional to direction cosines'], ['Skew lines', 'neither parallel nor intersecting'], ['Shortest distance', 'length of the common perpendicular']],
      traps: ['Cartesian form needs coefficient 1 on x, y, z: (1 − x)/2 means direction ratio −2.', 'Using a point in place of a direction.', 'Forgetting the modulus in cos θ (acute angle).', 'Shortest distance formula for skew lines used on parallel lines.'],
      board: '<p><b>Unit IV — 14 marks.</b> Expect: direction cosines (1 mark), equations of a line and angle between lines (2–3 marks), and a 5-mark shortest-distance or foot-of-perpendicular question.</p>',
      bridge: '<p>Builds on Class 11 Ch 11 coordinates and Ch 10 vectors.</p>'
    },

    explore: [
      {
        title: 'A line through two points in space', intro: 'Set A and the direction ratios. The view rotates with <kbd>P</kbd>; the readout gives the vector and Cartesian equations.',
        build(el, K) {
          let A = [1, 2, 1], d = [2, -1, 2], rot = 0.6; const row = K.row(el);
          ['a', 'b', 'c'].forEach((s, i) => K.slider(row, s, -3, 3, 1, d[i], v => { d[i] = v; bd.redraw(); }));
          const bd = new K.Board(el, { xmin: -7, xmax: 7, ymin: -5, ymax: 6.5, axes: false, grid: 0 }); const rd = K.read(el);
          const an = new K.Anim(Infinity, () => { rot += 0.02; bd.redraw(); }, { ms: 40 });
          const pr = (X, Y, Z) => { const c = Math.cos(rot), s = Math.sin(rot); return [X * c - Y * s, Z + (X * s + Y * c) * -0.27]; };
          const L = (p, q, o) => bd.line(...pr(...p), ...pr(...q), o);
          bd.onDraw = () => { bd.clear(); L([-5, 0, 0], [5, 0, 0], { color: C.grey, w: 1.5 }); L([0, -5, 0], [0, 5, 0], { color: C.grey, w: 1.5 }); L([0, 0, -4], [0, 0, 5], { color: C.grey, w: 1.5 });
            bd.text(...pr(5.5, 0, 0), 'X', { font: 'bold 14px' }); bd.text(...pr(0, 5.5, 0), 'Y', { font: 'bold 14px' }); bd.text(...pr(0, 0, 5.4), 'Z', { font: 'bold 14px' });
            if (dot(d, d)) { L(A.map((v, i) => v - 2 * d[i]), A.map((v, i) => v + 2 * d[i]), { color: C.blue, w: 3 }); L(A, A.map((v, i) => v + d[i]), { color: C.orange, w: 4 }); }
            bd.dot(...pr(...A), { color: C.purple, r: 6, label: 'A(1, 2, 1)' }); const m = Math.sqrt(dot(d, d));
            rd.innerHTML = dot(d, d) ? `r⃗ = (î + 2ĵ + k̂) + λ(${vec(d)}) · ${cart(A, d)} · direction cosines ${d.map(v => num(v / m, 3)).join(', ')} (orange: b⃗)` : 'Direction ratios cannot all be 0.'; };
          K.anim(el, an); bd.redraw(); return an;
        }
      },
      {
        title: 'Shortest distance between two lines', intro: 'Press <kbd>S</kbd> for a new pair of lines. The steps of the formula are shown.',
        build(el, K) {
          const rd = K.read(el); const R = G9.rng(G9.newSeed());
          const make = () => { const a1 = rd3(R, -3, 3), a2 = rd3(R, -3, 3), b1 = rd3(R, -2, 3), b2 = R.chance(.25) ? b1.map(v => 2 * v) : rd3(R, -2, 3); const c = cross(b1, b2), a = sub(a2, a1);
            let msg = `L₁: r⃗ = (${vec(a1)}) + λ(${vec(b1)})<br>L₂: r⃗ = (${vec(a2)}) + μ(${vec(b2)})<br>a⃗₂ − a⃗₁ = ${vec(a)} · b⃗₁ × b⃗₂ = ${vec(c)}<br>`;
            if (!dot(c, c)) { const cc = cross(b1, a); msg += `lines are parallel: d = |b⃗ × (a⃗₂ − a⃗₁)|/|b⃗| = ${sq(dot(cc, cc))}/${sq(dot(b1, b1))} ≈ <b>${num(Math.sqrt(dot(cc, cc) / dot(b1, b1)), 4)}</b>`; }
            else { const t = Math.abs(dot(c, a)); msg += `d = |(b⃗₁ × b⃗₂)·(a⃗₂ − a⃗₁)| / |b⃗₁ × b⃗₂| = ${t}/${sq(dot(c, c))} ≈ <b>${num(t / Math.sqrt(dot(c, c)), 4)}</b>${t === 0 ? ' — the lines intersect' : ' — skew lines'}`; }
            rd.innerHTML = msg; };
          const row = K.row(el); K.button(row, 'New lines (S)', make); make(); return { step: make, play() {}, pause() {} };
        }
      }
    ],

    gens: [
      { title: 'Direction cosines', gen(R) {
          const T = R.pick([[1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [2, 6, 9, 11], [2, -1, -2, 3]]); const v = T.slice(0, 3).map(x => x * R.sign());
          const t = R.int(0, 1);
          if (t === 0) return { q: `Find the direction cosines of a line with direction ratios ${v.join(', ')}.`, a: v.map(x => Q(x, T[3])).join(', ') };
          const P = rd3(R), Qp = P.map((x, i) => x + v[i]); return { q: `Find the direction cosines of the line through (${P.join(', ')}) and (${Qp.join(', ')}).`, a: v.map(x => Q(x, T[3])).join(', '), s: `direction ratios ${v.join(', ')}` };
        } },
      { title: 'Equation of a line', gen(R) {
          const P = rd3(R), d = rd3(R, -3, 3).map(v => v || 1), t = R.int(0, 1);
          if (t === 0) return { q: `Find the vector and Cartesian equations of the line through (${P.join(', ')}) parallel to ${vec(d)}.`, a: `r⃗ = (${vec(P)}) + λ(${vec(d)}); ${cart(P, d)}` };
          const Qp = P.map((v, i) => v + d[i]); return { q: `Find the Cartesian equation of the line through (${P.join(', ')}) and (${Qp.join(', ')}).`, a: cart(P, d) };
        } },
      { title: 'Angle between two lines', gen(R) {
          const pairs = [[[1, 2, 2], [2, 2, 1], '8/9'], [[3, 5, 4], [1, 1, 2], '16/(5√2 · √6)'], [[1, -1, 0], [1, 1, 0], '0 ⇒ 90°'], [[2, 2, 1], [4, 1, 8], '18/27 = 2/3'], [[1, 0, 1], [0, 1, 1], '1/2 ⇒ 60°'], [[3, -2, 0], [1, 1, 2], '1/(√13 · √6)']];
          const [a, b, c] = R.pick(pairs); return { q: `Find the angle between lines with direction ratios ${a.join(', ')} and ${b.join(', ')}.`, a: `cos θ = ${c}`, s: '|a₁a₂ + b₁b₂ + c₁c₂| / (√Σa₁² √Σa₂²)' };
        } },
      { title: 'Perpendicular lines — find k', levels: [2, 3], gen(R) {
          let a, b0, b1; do { a = rd3(R, -3, 3); b0 = R.int(-3, 3); b1 = R.int(-3, 3); } while (a[2] === 0 || (a[0] * b0 + a[1] * b1) % a[2] !== 0);
          const k = -(a[0] * b0 + a[1] * b1) / a[2];
          return { q: `Find k so that the lines with direction ratios ${a.join(', ')} and ${b0}, ${b1}, k are perpendicular.`, a: `k = ${k}`, ans: k, s: 'a₁a₂ + b₁b₂ + c₁c₂ = 0' };
        } },
      { title: 'Shortest distance (skew)', levels: [3], gen(R) {
          let a1, a2, b1, b2, c; do { a1 = rd3(R, -3, 3); a2 = rd3(R, -3, 3); b1 = rd3(R, -2, 3); b2 = rd3(R, -2, 3); c = cross(b1, b2); } while (!dot(c, c));
          const t = Math.abs(dot(c, sub(a2, a1)));
          return { q: `Find the shortest distance between r⃗ = (${vec(a1)}) + λ(${vec(b1)}) and r⃗ = (${vec(a2)}) + μ(${vec(b2)}).`, a: `${t}/${sq(dot(c, c))}${t === 0 ? ' = 0 (the lines intersect)' : ''}`, ans: t / Math.sqrt(dot(c, c)), s: `b⃗₁ × b⃗₂ = ${vec(c)}, a⃗₂ − a⃗₁ = ${vec(sub(a2, a1))}` };
        } },
      { title: 'Shortest distance (parallel)', levels: [2, 3], gen(R) {
          const a1 = rd3(R, -3, 3), a2 = rd3(R, -3, 3), b = rd3(R, -2, 3); const c = cross(b, sub(a2, a1));
          return { q: `Find the distance between the parallel lines r⃗ = (${vec(a1)}) + λ(${vec(b)}) and r⃗ = (${vec(a2)}) + μ(${vec(b)}).`, a: `${sq(dot(c, c))}/${sq(dot(b, b))}`, ans: Math.sqrt(dot(c, c) / dot(b, b)), s: '|b⃗ × (a⃗₂ − a⃗₁)| / |b⃗|' };
        } }
    ],

    quiz: [
      { q: 'Direction cosines of the x-axis', o: ['1, 0, 0', '0, 1, 0', '1, 1, 1', '0, 0, 1'], a: 0, e: 'Angles 0°, 90°, 90°.' },
      { q: 'l² + m² + n² =', o: ['1', '0', '3', '2'], a: 0, e: 'Property.' },
      { q: 'Direction ratios of (x − 1)/2 = (y + 3)/−1 = z/4', o: ['2, −1, 4', '1, −3, 0', '2, 1, 4', '−1, 3, 0'], a: 0, e: 'Denominators.' },
      { q: 'A point on (x − 1)/2 = (y + 3)/−1 = z/4', o: ['(1, −3, 0)', '(2, −1, 4)', '(−1, 3, 0)', '(0, 0, 0)'], a: 0, e: 'Numerators zero.' },
      { q: 'Lines with d.r. 1, 2, 3 and 3, −3, 1 are', o: ['perpendicular', 'parallel', 'coincident', 'neither'], a: 0, e: '3 − 6 + 3 = 0.' },
      { q: 'Lines with d.r. 1, 2, 3 and 2, 4, 6 are', o: ['parallel', 'perpendicular', 'skew', 'intersecting at 60°'], a: 0, e: 'Proportional.' },
      { q: 'Skew lines are', o: ['neither parallel nor intersecting', 'parallel', 'perpendicular', 'coplanar always'], a: 0, e: 'Definition.' },
      { q: 'If the shortest distance is 0, the lines', o: ['intersect', 'are parallel', 'are skew', 'are perpendicular'], a: 0, e: 'Meet at a point.' },
      { q: 'Vector equation of a line', o: ['r⃗ = a⃗ + λb⃗', 'r⃗·n⃗ = d', 'r⃗ = λa⃗ × b⃗', 'a⃗·b⃗ = 0'], a: 0, e: 'Point + direction.' },
      { q: 'Direction cosines of d.r. 2, 3, 6', o: ['2/7, 3/7, 6/7', '2, 3, 6', '1/2, 1/3, 1/6', '2/11, 3/11, 6/11'], a: 0, e: 'Divide by 7.' },
      { q: 'cos θ between lines uses', o: ['|b₁·b₂|/(|b₁||b₂|)', '|b₁ × b₂|', 'b₁ + b₂', 'a₁·a₂'], a: 0, e: 'Directions only.' }
    ],

    teach: {
      outcomes: ['Find direction cosines and ratios', 'Write lines in vector and Cartesian form', 'Find angles between lines; test perpendicular/parallel', 'Compute shortest distances between skew and parallel lines'],
      periods: [
        { t: 'Direction cosines and lines', flow: [['10 min', 'Rod in a room corner: angles with walls.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Equations of lines.']] },
        { t: 'Angles and distances', flow: [['15 min', 'Angle between lines.'], ['15 min', 'Explore panel 2: shortest distance.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Cartesian form not in standard shape.', 'Point vs direction.', 'Formula choice for parallel lines.'],
      activities: ['Two pencils as skew lines; measure the common perpendicular.', 'Classroom corner coordinates for lines.'],
      exit: ['d.c. of d.r. 1, −2, 2.', 'Cartesian equation through (1, 2, 3) parallel to 2î − ĵ + k̂.', 'Are d.r. 1, 1, 0 and 1, −1, 2 perpendicular?'],
      homework: 'Find the shortest distance between r⃗ = (î + 2ĵ + k̂) + λ(î − ĵ + k̂) and r⃗ = (2î − ĵ − k̂) + μ(2î + ĵ + 2k̂). Find the foot of the perpendicular from (0, 2, 3) to (x + 3)/5 = (y − 1)/2 = (z + 4)/3.'
    },

    slides: [
      { t: 'Three Dimensional Geometry', b: ['Direction cosines and ratios', 'Equation of a line', 'Angle between lines', 'Shortest distance'] },
      { t: 'Lines', b: ['r⃗ = a⃗ + λb⃗', '(x − x₁)/a = (y − y₁)/b = (z − z₁)/c', 'General point (x₁ + aλ, …)'] },
      { t: 'Angle', b: ['cos θ = |b₁·b₂|/(|b₁||b₂|)', 'Perpendicular: Σa₁a₂ = 0', 'Parallel: proportional'] },
      { t: 'Shortest distance', b: ['Skew: |(b₁ × b₂)·(a₂ − a₁)|/|b₁ × b₂|', 'Parallel: |b × (a₂ − a₁)|/|b|'] },
      { t: 'Check yourself', b: ['d.c. of 2, −1, −2?', 'Answer: 2/3, −1/3, −2/3'] }
    ],

    fs: { groups: [
        ['Direction', [['d.c.', 'l = cos α, m = cos β, n = cos γ'], ['l² + m² + n²', '1'], ['From d.r. a, b, c', 'a/√(a² + b² + c²), …'], ['Through two points', 'x₂ − x₁, y₂ − y₁, z₂ − z₁']]],
        ['Line', [['Vector', 'r⃗ = a⃗ + λb⃗'], ['Two points', 'r⃗ = a⃗ + λ(b⃗ − a⃗)'], ['Cartesian', '(x − x₁)/a = (y − y₁)/b = (z − z₁)/c'], ['General point', '(x₁ + aλ, y₁ + bλ, z₁ + cλ)']]],
        ['Angle', [['cos θ', '|a₁a₂ + b₁b₂ + c₁c₂| / (√Σa₁² √Σa₂²)'], ['Perpendicular', 'a₁a₂ + b₁b₂ + c₁c₂ = 0'], ['Parallel', 'a₁/a₂ = b₁/b₂ = c₁/c₂']]],
        ['Shortest distance', [['Skew', '|(b₁ × b₂)·(a₂ − a₁)| / |b₁ × b₂|'], ['Parallel', '|b × (a₂ − a₁)| / |b|'], ['Zero', 'lines intersect']]]],
      ex: [['d.r. 2, 3, 6', 'd.c. 2/7, 3/7, 6/7'], ['Line through (1, 2, 3), (3, 4, 5)', '(x − 1)/2 = (y − 2)/2 = (z − 3)/2']],
      rem: ['Rewrite in standard Cartesian form first.', 'Acute angle: take modulus.', 'Parallel lines use a different formula.'] }
  });
})();
