/*
TOOL:    class8_maths_ch11
FAMILY:  CBSE_REVISION / Class 8 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class VIII moved into the series
CHANGES: 1.0.0 - Part II Ch 4 Exploring Some Geometric Themes - revise, 2 explore panels (Sierpinski triangle, rotating solids with Euler's formula), 5 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num } = G9;
  const SOL = {
    'cube': { V: [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]], E: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]], F: 6 },
    'triangular prism': { V: [[-1, -1, -1.2], [1, -1, -1.2], [0, 0.9, -1.2], [-1, -1, 1.2], [1, -1, 1.2], [0, 0.9, 1.2]], E: [[0, 1], [1, 2], [2, 0], [3, 4], [4, 5], [5, 3], [0, 3], [1, 4], [2, 5]], F: 5 },
    'square pyramid': { V: [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1], [0, 1.2, 0]], E: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [1, 4], [2, 4], [3, 4]], F: 5 },
    'tetrahedron': { V: [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]], E: [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]], F: 4 },
    'octahedron': { V: [[1.3, 0, 0], [-1.3, 0, 0], [0, 1.3, 0], [0, -1.3, 0], [0, 0, 1.3], [0, 0, -1.3]], E: [[0, 2], [0, 3], [0, 4], [0, 5], [1, 2], [1, 3], [1, 4], [1, 5], [2, 4], [4, 3], [3, 5], [5, 2]], F: 8 }
  };

  G9.register({
    no: 11, part: 'Part II', short: 'Geometric themes', title: 'Exploring Some Geometric Themes',
    blurb: '(Part II Ch 4) Self-similar shapes (fractals), nets of solids, views from the front, side and top, and drawing solids on paper.',
    revise: {
      oneLine: 'Some shapes contain smaller copies of themselves, like the Sierpinski triangle. Solids can be unfolded into nets, seen from different views and drawn on flat paper; for every polyhedron faces + vertices − edges = 2.',
      sections: [
        { h: 'Self-similar shapes', html: `<p>Sierpinski triangle: join the midpoints of a triangle and remove the middle one; repeat on each remaining triangle. After n steps there are 3ⁿ triangles, each with area (1/4)ⁿ of the original, so the shaded area is (3/4)ⁿ — it shrinks towards 0 while the number of triangles explodes. Koch snowflake and branching trees are other examples.</p>` },
        { h: 'Nets', html: `<p>A net is a flat shape that folds into a solid. A cube has 11 different nets. Check a net: faces that meet at an edge must match in length; no two faces overlap when folded.</p>` },
        { h: 'Views and drawings', html: `<p>Front, side and top views show a solid from three directions. Oblique and isometric drawings show depth on flat paper (isometric dot paper keeps all three edge directions equal in length).</p>` },
        { h: 'Euler\'s formula', html: `<div class="box m">F + V − E = 2 for any polyhedron without holes</div><p>Cube: 6 + 8 − 12 = 2. Triangular prism: 5 + 6 − 9 = 2. Square pyramid: 5 + 5 − 8 = 2.</p>` }
      ],
      formulas: [['Euler', 'F + V − E = 2'], ['Sierpinski step n', '3ⁿ triangles'], ['Remaining area', '(3/4)ⁿ of the original'], ['Prism (n-gon base)', 'F = n + 2, V = 2n, E = 3n'], ['Pyramid (n-gon base)', 'F = n + 1, V = n + 1, E = 2n']],
      terms: [['Fractal / self-similar', 'contains smaller copies of itself'], ['Net', 'unfolded flat pattern of a solid'], ['Polyhedron', 'solid with flat polygonal faces'], ['Isometric drawing', 'drawing with three equal axes at 120°']],
      traps: ['Not every arrangement of 6 squares is a cube net.', 'Counting edges twice.', 'Euler\'s formula does not apply to curved solids like cylinders.', 'Top view ≠ front view.'],
      bridge: '<p>Builds spatial sense for Class 9 Ch 14 (surface area and volume).</p>'
    },

    explore: [
      {
        title: 'Sierpinski triangle', intro: 'Press <kbd>S</kbd> to remove the middle triangles again. Count triangles and watch the area shrink.',
        build(el, K) {
          const b = new K.Board(el, { xmin: -0.05, xmax: 1.05, ymin: -0.05, ymax: 0.92, axes: false, grid: 0 }); const rd = K.read(el); const an = new K.Anim(7, () => b.redraw(), { ms: 900 });
          b.onDraw = () => { b.clear(); const n = an.i; const tri = (A, B, Cc, k) => { if (k === 0) { b.poly([A, B, Cc], { fill: C.orange + 'aa', color: C.orange, w: 0.5 }); return; } const m = (P, Q) => [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2]; tri(A, m(A, B), m(A, Cc), k - 1); tri(m(A, B), B, m(B, Cc), k - 1); tri(m(A, Cc), m(B, Cc), Cc, k - 1); };
            tri([0, 0], [1, 0], [0.5, Math.sqrt(3) / 2], n); rd.innerHTML = `step ${n}: <b>${3 ** n}</b> triangles, each 1/${4 ** n} of the original area · shaded area (3/4)${'⁰¹²³⁴⁵⁶⁷'[n]} = ${num(0.75 ** n, 4)}`; };
          K.anim(el, an); b.redraw(); return an;
        }
      },
      {
        title: 'Solids and Euler\'s formula', intro: 'Pick a solid; press <kbd>P</kbd> to spin it. Count faces, vertices and edges and check F + V − E.',
        build(el, K) {
          let k = 'cube', rot = 0.5; const row = K.row(el); K.select(row, 'solid', Object.keys(SOL), i => { k = Object.keys(SOL)[i]; b.redraw(); });
          const b = new K.Board(el, { xmin: -3, xmax: 3, ymin: -2.2, ymax: 2.2, axes: false, grid: 0 }); const rd = K.read(el); const an = new K.Anim(Infinity, () => { rot += 0.03; b.redraw(); }, { ms: 40 });
          b.onDraw = () => { b.clear(); const S = SOL[k]; const pr = ([x, y, z]) => { const c = Math.cos(rot), s = Math.sin(rot), x1 = x * c + z * s, z1 = -x * s + z * c; const c2 = Math.cos(0.45), s2 = Math.sin(0.45); return [x1, y * c2 - z1 * s2]; };
            S.E.forEach(([i, j]) => b.line(...pr(S.V[i]), ...pr(S.V[j]), { color: C.blue, w: 3 })); S.V.forEach(v => b.dot(...pr(v), { color: C.orange, r: 5 }));
            const V = S.V.length, E = S.E.length, F = S.F; rd.innerHTML = `${k}: F = ${F}, V = ${V}, E = ${E} · F + V − E = ${F} + ${V} − ${E} = <b>${F + V - E}</b>`; };
          K.anim(el, an); b.redraw(); return an;
        }
      }
    ],

    gens: [
      { title: 'Euler\'s formula', gen(R) {
          const s = R.pick([['cube', 6, 8, 12], ['triangular prism', 5, 6, 9], ['square pyramid', 5, 5, 8], ['pentagonal prism', 7, 10, 15], ['hexagonal pyramid', 7, 7, 12], ['octahedron', 8, 6, 12]]); const t = R.int(0, 2);
          const [n, F, V, E] = s; const qs = [[`A ${n} has ${V} vertices and ${E} edges. How many faces?`, F], [`A ${n} has ${F} faces and ${E} edges. How many vertices?`, V], [`A ${n} has ${F} faces and ${V} vertices. How many edges?`, E]];
          return { q: qs[t][0], a: String(qs[t][1]), ans: qs[t][1], s: 'F + V − E = 2' };
        } },
      { title: 'Prisms and pyramids', levels: [2, 3], gen(R) {
          const n = R.int(3, 10), p = R.chance(.5); return p ? { q: `Find F, V and E for a prism whose base has ${n} sides.`, a: `F = ${n + 2}, V = ${2 * n}, E = ${3 * n}` } : { q: `Find F, V and E for a pyramid whose base has ${n} sides.`, a: `F = ${n + 1}, V = ${n + 1}, E = ${2 * n}` };
        } },
      { title: 'Sierpinski counting', gen(R) {
          const n = R.int(2, 6); return { q: `In the Sierpinski triangle after ${n} steps, how many shaded triangles are there and what fraction of the area is shaded?`, a: `${3 ** n} triangles, (3/4)^${n} = ${3 ** n}/${4 ** n}`, ans: 3 ** n };
        } },
      { title: 'Is it a cube net?', levels: [1, 2], gen(R) {
          const items = [['a row of 4 squares with one square above the second and one below the third', 'yes'], ['a row of 4 squares with two squares above the first two', 'no (two faces overlap)'], ['a 2 × 3 rectangle of squares', 'no'], ['a cross: a row of 4 with one above and one below the second square', 'yes'], ['a staircase of three pairs of squares', 'yes'], ['a row of 5 squares with one square above the middle', 'no (5 in a row overlaps)']];
          const [q, a] = R.pick(items); return { q: `Does this fold into a cube: ${q}?`, a };
        } },
      { title: 'Views', levels: [1], gen(R) {
          const items = [['a cylinder standing on its base, top view', 'a circle'], ['a cylinder standing on its base, front view', 'a rectangle'], ['a cone standing on its base, front view', 'a triangle'], ['a cone standing on its base, top view', 'a circle (with its apex as a point)'], ['a square pyramid, top view', 'a square with its diagonals'], ['a sphere, any view', 'a circle']];
          const [q, a] = R.pick(items); return { q: `What shape do you see: ${q}?`, a };
        } }
    ],

    quiz: [
      { q: 'F + V − E for a cube', o: ['2', '0', '6', '14'], a: 0, e: '6 + 8 − 12.' },
      { q: 'Edges of a triangular prism', o: ['9', '6', '12', '5'], a: 0, e: '3n.' },
      { q: 'Sierpinski triangles after 3 steps', o: ['27', '9', '64', '12'], a: 0, e: '3³.' },
      { q: 'Number of different nets of a cube', o: ['11', '6', '8', '24'], a: 0, e: 'Classic result.' },
      { q: 'Top view of a cone on its base', o: ['circle', 'triangle', 'square', 'rectangle'], a: 0, e: 'From above.' },
      { q: 'A square pyramid has how many faces?', o: ['5', '4', '6', '8'], a: 0, e: 'Base + 4.' },
      { q: 'Euler\'s formula applies to', o: ['polyhedra', 'spheres', 'cylinders', 'cones'], a: 0, e: 'Flat faces.' },
      { q: 'Shaded area of Sierpinski after 1 step', o: ['3/4', '1/4', '1/3', '1/2'], a: 0, e: 'Middle quarter removed.' },
      { q: 'Vertices of an octagonal prism', o: ['16', '8', '10', '24'], a: 0, e: '2n.' },
      { q: 'A self-similar shape contains', o: ['smaller copies of itself', 'no angles', 'only circles', 'one copy'], a: 0, e: 'Definition.' },
      { q: 'Front view of a cylinder on its base', o: ['rectangle', 'circle', 'triangle', 'oval'], a: 0, e: 'From the side.' }
    ],

    teach: {
      outcomes: ['Describe and count self-similar patterns', 'Recognise and make nets of solids', 'Draw views and isometric sketches', 'Verify Euler\'s formula'],
      periods: [
        { t: 'Fractals', flow: [['15 min', 'Explore panel 1: Sierpinski.'], ['15 min', 'Draw 3 steps on paper; count.'], ['10 min', 'Discuss nature\'s fractals.']] },
        { t: 'Solids', flow: [['15 min', 'Explore panel 2: Euler.'], ['15 min', 'Nets and views with real boxes.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Every 6-square shape is a cube net.', 'Edge counting.', 'Euler on curved solids.'],
      activities: ['Cut and fold cube nets; find all 11.', 'Isometric drawing of stacked blocks.'],
      exit: ['F, V, E of a pentagonal pyramid.', 'Triangles after 4 Sierpinski steps.', 'Top view of a cuboid.'],
      homework: 'Draw the front, side and top views of a stack of 5 cubes you design. Make a net of a triangular prism and fold it.'
    },

    slides: [
      { t: 'Exploring Some Geometric Themes', b: ['Self-similar shapes', 'Nets', 'Views and drawings', 'Euler\'s formula'] },
      { t: 'Sierpinski', b: ['3ⁿ triangles after n steps', 'Area (3/4)ⁿ'] },
      { t: 'Euler', b: ['F + V − E = 2', 'Prism: n + 2, 2n, 3n', 'Pyramid: n + 1, n + 1, 2n'] },
      { t: 'Check yourself', b: ['E for a hexagonal prism?', 'Answer: 18'] }
    ],

    fs: { groups: [
        ['Self-similarity', [['Sierpinski step n', '3ⁿ triangles'], ['Area left', '(3/4)ⁿ'], ['Each triangle', '(1/4)ⁿ of original']]],
        ['Solids', [['Euler', 'F + V − E = 2'], ['Prism, n-gon base', 'F n + 2, V 2n, E 3n'], ['Pyramid, n-gon base', 'F n + 1, V n + 1, E 2n'], ['Cube', 'F 6, V 8, E 12']]],
        ['Nets and views', [['Cube nets', '11 different'], ['Views', 'front, side, top'], ['Isometric', 'three axes at 120°']]]],
      ex: [['Pentagonal prism', '7 + 10 − 15 = 2'], ['Sierpinski step 4', '81 triangles, area 81/256']],
      rem: ['Count each edge once.', 'Fold mentally to test a net.', 'Euler is for flat-faced solids.'] }
  });
})();
