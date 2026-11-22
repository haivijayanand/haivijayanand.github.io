/*
TOOL:    class3_maths_ch02
FAMILY:  CBSE_REVISION / Class 3 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 2 Toy Joy (solid shapes, sorting, views) - revise, 2 explore panels (sort the toys by a rule, top/front views), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const TOY = [['⚽ ball', 'sphere', 'rolls', 'circle', 'circle'], ['🎲 dice', 'cube', 'slides', 'square', 'square'], ['🥁 drum', 'cylinder', 'both', 'circle', 'rectangle'], ['🥳 party hat', 'cone', 'both', 'circle', 'triangle'], ['📦 toy box', 'cuboid', 'slides', 'rectangle', 'rectangle'], ['🧸 block tower', 'cuboid', 'slides', 'square', 'rectangle']];
  G9.register({
    no: 2, part: 'All chapters', short: 'Solid shapes', title: 'Toy Joy',
    blurb: 'Toys as solid shapes — sphere, cube, cuboid, cylinder, cone; sorting by rules; how a toy looks from the top and from the front.',
    revise: {
      oneLine: 'Toys have solid shapes. We can sort them by a rule (rolls / slides, has corners / no corners). The same solid looks different from the top and from the front: a drum is a circle from the top and a rectangle from the front.',
      sections: [
        { h: 'Solids', html: `<p>⚽ sphere · 🎲 cube · 📦 cuboid · 🥁 cylinder · 🥳 cone.</p>` },
        { h: 'Sorting rules', html: `<p>Rolls / slides / both; with corners / without; flat faces / curved face.</p>` },
        { h: 'Views', html: `<p>Top view and front view: cone → circle (top), triangle (front); cylinder → circle, rectangle; cube → square, square.</p>` }
      ],
      formulas: [['Sphere', 'only curved, rolls'], ['Cube', '6 squares'], ['Cuboid', '6 rectangles'], ['Cylinder', '2 circles + curved'], ['Cone', '1 circle + curved + tip']],
      terms: [['Top view', 'looking down'], ['Front view', 'looking from the front'], ['Sort', 'group by a rule']],
      traps: ['A cube is a special cuboid.', 'Views depend on where you look from.', 'A cone can roll in a circle.'],
      bridge: '<p>Ch 5 looks at flat shapes in more detail.</p>'
    },
    explore: [
      { title: 'Sort the toys', intro: 'Choose a sorting rule. The toys move into groups.',
        build(el, K) { let r = 0; const rules = [['rolls / slides / both', 2], ['solid shape', 1], ['top view', 3]]; const row = K.row(el); K.select(row, 'sort by', rules.map(x => x[0]), i => { r = i; draw(); }); const rd = K.read(el);
          function draw() { const k = rules[r][1]; const g = {}; TOY.forEach(t => (g[t[k]] = g[t[k]] || []).push(t[0])); rd.innerHTML = Object.entries(g).map(([n, ts]) => `<div style="margin:4px 0"><b>${n}</b>: <span style="font-size:22px">${ts.map(t => t.split(' ')[0]).join(' ')}</span></div>`).join(''); }
          draw(); return null; } },
      { title: 'Top view and front view', intro: 'Pick a toy. See its top and front views.',
        build(el, K) { let k = 2; const row = K.row(el); K.select(row, 'toy', TOY.map(t => t[0]), i => { k = i; b.redraw(); }); const sel = row.querySelector('select'); if (sel) sel.value = 2;
          const b = new K.Board(el, { xmin: -5, xmax: 5, ymin: -2.3, ymax: 2.3, axes: false, grid: 0 }); const rd = K.read(el);
          const draw = (cx, s) => { const f = { fill: C.blueL, color: C.blue, w: 3 }; if (s === 'circle') b.circle(cx, 0, 1.4, f); if (s === 'square') b.rect(cx - 1.3, -1.3, 2.6, 2.6, f); if (s === 'rectangle') b.rect(cx - 1.6, -1, 3.2, 2, f); if (s === 'triangle') b.poly([[cx - 1.4, -1.3], [cx + 1.4, -1.3], [cx, 1.5]], f); };
          b.onDraw = () => { b.clear(); const t = TOY[k]; draw(-2.5, t[3]); draw(2.5, t[4]); b.text(-2.5, -1.9, 'top', { font: 'bold 14px' }); b.text(2.5, -1.9, 'front', { font: 'bold 14px' }); rd.innerHTML = `${t[0]} (${t[1]}): top view <b>${t[3]}</b>, front view <b>${t[4]}</b>`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Name the solid', gen(R) { const t = R.pick(TOY); return { q: `What solid shape is a ${t[0].split(' ').slice(1).join(' ')}?`, a: t[1] }; } },
      { title: 'Roll or slide', gen(R) { const t = R.pick(TOY); return { q: `Does a ${t[0].split(' ').slice(1).join(' ')} roll, slide or both?`, a: t[2] }; } },
      { title: 'Views', levels: [2, 3], gen(R) { const t = R.pick(TOY), v = R.int(3, 4); return { q: `What does a ${t[0].split(' ').slice(1).join(' ')} look like from the ${v === 3 ? 'top' : 'front'}?`, a: t[v] }; } },
      { title: 'Sorting rule', levels: [2, 3], gen(R) { const items = [['⚽ 🥁 🥳 | 🎲 📦', 'rolls / does not roll'], ['🎲 📦 🧸 | ⚽', 'has corners / no corners'], ['⚽ 🍊 | 🎲 🥁', 'sphere / not a sphere']]; const [q, a] = R.pick(items); return { q: `What rule sorts these into two groups? ${q}`, a }; } },
      { title: 'Count the cubes', gen(R) { const a = R.int(2, 4), b = R.int(2, 3), h = R.int(1, 3); return { q: `A toy tower is ${a} cubes long, ${b} cubes wide and ${h} layers high. How many cubes?`, a: String(a * b * h), ans: a * b * h }; } }
    ],
    quiz: [
      { q: 'A drum is a', o: ['cylinder', 'cone', 'cube', 'sphere'], a: 0, e: 'Two circles.' }, { q: 'Top view of a cone', o: ['circle', 'triangle', 'square', 'rectangle'], a: 0, e: 'Round base.' },
      { q: 'Front view of a cone', o: ['triangle', 'circle', 'square', 'oval'], a: 0, e: 'Pointed.' }, { q: 'A dice is a', o: ['cube', 'cuboid', 'sphere', 'cone'], a: 0, e: '6 squares.' },
      { q: 'Which only rolls?', o: ['sphere', 'cube', 'cuboid', 'dice'], a: 0, e: 'Curved.' }, { q: 'Front view of a drum', o: ['rectangle', 'circle', 'triangle', 'square'], a: 0, e: 'Side on.' },
      { q: 'Faces of a cube', o: ['6', '4', '8', '12'], a: 0, e: 'Six.' }, { q: 'Has no corners', o: ['⚽', '🎲', '📦', '🧸'], a: 0, e: 'Sphere.' },
      { q: '2 × 2 × 2 cubes', o: ['8', '6', '4', '12'], a: 0, e: 'Count.' }, { q: 'A party hat is a', o: ['cone', 'cylinder', 'sphere', 'cube'], a: 0, e: 'Cone.' },
      { q: 'Top view of a cube', o: ['square', 'circle', 'triangle', 'hexagon'], a: 0, e: 'Square face.' }
    ],
    teach: {
      outcomes: ['Name solids in toys', 'Sort by a rule', 'Draw top and front views'],
      periods: [{ t: 'Toys and solids', flow: [['15 min', 'Toy box sorting.'], ['15 min', 'Explore panel 1.'], ['10 min', 'Rolls or slides test.']] }, { t: 'Views', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Draw views of classroom objects.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['View fixed regardless of direction.'], activities: ['Build with blocks and draw views.', 'Mystery bag.'],
      exit: ['Top view of a glass?', 'Sort 5 objects by a rule.', 'Name a cone toy.'], homework: 'Draw the top and front views of 3 things at home.'
    },
    slides: [{ t: 'Toy Joy', b: ['Solids in toys', 'Sorting rules', 'Top and front views'] }, { t: 'Check yourself', b: ['Top view of a drum?', 'Which toys roll?'] }],
    fs: { groups: [['Solids', [['⚽ sphere', 'rolls'], ['🎲 cube', 'slides'], ['📦 cuboid', 'slides'], ['🥁 cylinder', 'both'], ['🥳 cone', 'both']]], ['Views (top / front)', [['cone', 'circle / triangle'], ['cylinder', 'circle / rectangle'], ['cube', 'square / square'], ['sphere', 'circle / circle']]]],
      ex: [['Tin can', 'cylinder: circle on top'], ['3 × 2 × 2 blocks', '12 cubes']], rem: ['Look from different sides.', 'Choose one rule to sort.', 'A cube is a special cuboid.'] }
  });
})();
