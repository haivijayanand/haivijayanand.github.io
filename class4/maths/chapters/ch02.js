/*
TOOL:    class4_maths_ch02
FAMILY:  CBSE_REVISION / Class 4 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 2 Hide and Seek (views from top, front and side; positions on a grid map) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 2, part: 'All chapters', short: 'Views and maps', title: 'Hide and Seek',
    blurb: 'How things look from the top, front and side; stacks of cubes; reading positions and paths on a grid map.',
    revise: {
      oneLine: 'The same object looks different from the top, the front and the side. A grid map uses rows and columns (like B3) to say where things are, and paths are told as steps: 3 right, 2 up.',
      sections: [
        { h: 'Views', html: `<p>A glass from the top looks like a circle; from the front like a rectangle. A stack of cubes from the top shows how many columns; numbers on the top view tell the heights.</p>` },
        { h: 'Grid maps', html: `<p>Columns A, B, C…, rows 1, 2, 3… The cell C2 is column C, row 2.</p>` },
        { h: 'Paths', html: `<p>From A1 to D3: 3 steps right, 2 steps up (or up first, then right).</p>` }
      ],
      formulas: [['Top view', 'shape seen from above'], ['Front view', 'tallest in each column'], ['Grid cell', 'column letter + row number'], ['Steps', 'right/left + up/down']],
      terms: [['View', 'how it looks from one side'], ['Map', 'drawing of a place from above'], ['Grid', 'rows and columns']],
      traps: ['Front view shows only the tallest stack in each column.', 'Writing row before column.', 'Mixing left and right.'],
      bridge: '<p>Class 5 uses maps with scale and directions.</p>'
    },
    explore: [
      { title: 'Stacks of cubes', intro: 'Press <kbd>S</kbd> for a new stack. Left: top view with heights. Right: front view.',
        build(el, K) { let H = [[2, 1, 3], [1, 0, 2], [1, 1, 1]]; const b = new K.Board(el, { xmin: 0, xmax: 9, ymin: -0.8, ymax: 4.2, axes: false, grid: 0 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.text(1.5, 3.9, 'top view', { font: 'bold 14px' }); b.text(6.5, 3.9, 'front view', { font: 'bold 14px' });
            for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) { const h = H[r][c]; b.rect(c, 2 - r, 1, 1, { fill: h ? 'rgba(29,78,216,' + (0.15 + 0.2 * h) + ')' : '#fff', color: C.ink, w: 1.5 }); if (h) b.text(c + 0.5, 2.5 - r, String(h), { font: 'bold 16px' }); }
            b.text(1.5, -0.5, 'front ↓', { font: '12px', color: C.grey });
            for (let c = 0; c < 3; c++) { const m = Math.max(H[0][c], H[1][c], H[2][c]); for (let k = 0; k < m; k++) b.rect(5 + c, k, 1, 1, { fill: 'rgba(234,88,12,.45)', color: C.ink, w: 1.5 }); }
            const n = H.flat().reduce((a, x) => a + x, 0); rd.innerHTML = `cubes used: <b>${n}</b> · front view heights (left to right): ${[0, 1, 2].map(c => Math.max(H[0][c], H[1][c], H[2][c])).join(', ')}`; };
          const step = () => { H = [0, 1, 2].map(() => [0, 1, 2].map(() => Math.floor(Math.random() * 4))); b.redraw(); }; const row = K.row(el); K.button(row, 'New stack (S)', step); b.redraw(); return { step, play() {}, pause() {} }; } },
      { title: 'Grid map', intro: 'Move the treasure. The path from home (A1) is told in steps.',
        build(el, K) { let c = 3, r = 4; const row = K.row(el); K.slider(row, 'column', 0, 5, 1, c, v => { c = v; b.redraw(); }); K.slider(row, 'row', 1, 6, 1, r, v => { r = v; b.redraw(); }); const L = 'ABCDEF';
          const b = new K.Board(el, { xmin: -0.8, xmax: 6.4, ymin: -0.8, ymax: 6.4, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); for (let i = 0; i < 6; i++) { b.text(i + 0.5, -0.4, L[i], { font: 'bold 14px' }); b.text(-0.4, i + 0.5, String(i + 1), { font: 'bold 14px' }); for (let j = 0; j < 6; j++) b.rect(i, j, 1, 1, { color: C.grid, w: 1 }); }
            b.text(0.5, 0.5, '🏠', { font: '24px' }); b.text(c + 0.5, r - 0.5, '💎', { font: '24px' }); if (c) b.arrow(0.5, 0.5, c + 0.5, 0.5, { color: C.orange, w: 3 }); if (r > 1) b.arrow(c + 0.5, 0.5, c + 0.5, r - 0.5, { color: C.blue, w: 3 });
            rd.innerHTML = `treasure at <b>${L[c]}${r}</b> · path from A1: ${c} step${c === 1 ? '' : 's'} right, ${r - 1} step${r === 2 ? '' : 's'} up`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Top or front view', gen(R) { const t = R.pick([['a glass', 'circle', 'rectangle'], ['a cone (ice-cream cone point down)', 'circle', 'triangle'], ['a brick lying flat', 'rectangle', 'rectangle'], ['a ball', 'circle', 'circle']]); return { q: `What shape is ${t[0]} seen from the top? From the front?`, a: `top: ${t[1]}, front: ${t[2]}` }; } },
      { title: 'Count the cubes', gen(R) { const h = [R.int(0, 3), R.int(1, 3), R.int(0, 3), R.int(1, 3)]; return { q: `A top view of 4 stacks shows heights ${h.join(', ')}. How many cubes?`, a: String(h.reduce((a, x) => a + x, 0)), ans: h.reduce((a, x) => a + x, 0) }; } },
      { title: 'Grid steps', gen(R) { const L = 'ABCDEF'; const c = R.int(1, 5), r = R.int(2, 6); return { q: `Home is at A1. How do you reach ${L[c]}${r}?`, a: `${c} right, ${r - 1} up` }; } },
      { title: 'Where am I?', levels: [2, 3], gen(R) { const L = 'ABCDEF'; const c = R.int(0, 2), r = R.int(1, 3), dc = R.int(1, 3), dr = R.int(1, 3); return { q: `Start at ${L[c]}${r}. Go ${dc} right and ${dr} up. Where are you?`, a: `${L[c + dc]}${r + dr}` }; } },
      { title: 'Front view heights', levels: [3], gen(R) { const a = [R.int(0, 3), R.int(0, 3)], b = [R.int(1, 3), R.int(0, 3)]; return { q: `Two rows of stacks (front row ${a.join(', ')}; back row ${b.join(', ')}). Heights seen from the front?`, a: `${Math.max(a[0], b[0])}, ${Math.max(a[1], b[1])}` }; } }
    ],
    quiz: [
      { q: 'A glass from the top looks like a', o: ['circle', 'square', 'triangle', 'line'], a: 0, e: 'Round rim.' }, { q: 'C2 means', o: ['column C, row 2', 'row C, column 2', '3 and 2', 'C squared'], a: 0, e: 'Column then row.' },
      { q: 'From A1 to C1', o: ['2 right', '2 up', '3 right', '1 right'], a: 0, e: 'A→B→C.' }, { q: 'Front view shows', o: ['tallest stack in each column', 'all cubes', 'top numbers', 'nothing'], a: 0, e: 'Hidden ones behind.' },
      { q: 'Top view heights 2, 1, 3', o: ['6 cubes', '3 cubes', '5 cubes', '213'], a: 0, e: 'Add.' }, { q: 'A ball from any side looks like', o: ['circle', 'square', 'oval only', 'triangle'], a: 0, e: 'Sphere.' },
      { q: 'B3 then 2 right', o: ['D3', 'B5', 'C3', 'D5'], a: 0, e: 'B→C→D.' }, { q: 'A map shows a place from', o: ['above', 'below', 'inside', 'behind'], a: 0, e: 'Top view.' },
      { q: 'A brick standing up from the front looks like a', o: ['rectangle', 'circle', 'triangle', 'pentagon'], a: 0, e: 'Face.' }, { q: 'From D4 to D1', o: ['3 down', '3 up', '1 down', '4 left'], a: 0, e: 'Row 4 → 1.' },
      { q: 'The top view of a cone (point up)', o: ['circle with a dot', 'triangle', 'square', 'line'], a: 0, e: 'Apex in middle.' }
    ],
    teach: {
      outcomes: ['Draw top, front and side views', 'Locate cells and describe paths on a grid'],
      periods: [{ t: 'Views', flow: [['10 min', 'Look at objects from different sides.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Build stacks with cubes.']] }, { t: 'Maps', flow: [['10 min', 'Classroom map.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Check quiz.']] }],
      misconceptions: ['Front view counts all cubes.', 'Row-column order.'], activities: ['Hide and seek with grid clues.', 'Map of the school.'],
      exit: ['Top view of a cup.', 'Path A1 → E4.', 'Cubes for heights 3, 2, 2.'], homework: 'Draw a top-view map of your room on a grid. Hide a toy and write the clue.'
    },
    slides: [{ t: 'Hide and Seek', b: ['Top, front, side views', 'Stacks of cubes', 'Grid maps and paths'] }, { t: 'Check yourself', b: ['Top view of a bottle?', 'Path from A1 to C4?'] }],
    fs: { groups: [['Views', [['Top', 'from above'], ['Front', 'tallest in each column'], ['Side', 'from left or right']]], ['Grid map', [['Cell', 'column + row: C2'], ['Path', 'right/left, up/down']]]],
      ex: [['A1 → D3', '3 right, 2 up'], ['Heights 1, 2, 3', '6 cubes']], rem: ['Column first, then row.', 'Hidden cubes still count.', 'Check from where you look.'] }
  });
})();
