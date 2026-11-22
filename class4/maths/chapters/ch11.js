/*
TOOL:    class4_maths_ch11
FAMILY:  CBSE_REVISION / Class 4 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 11 Fun with Symmetry (lines of symmetry, mirror halves, symmetry of letters and regular shapes) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 11, part: 'All chapters', short: 'Symmetry', title: 'Fun with Symmetry',
    blurb: 'Lines of symmetry (mirror lines), completing a symmetric picture, symmetry in letters, leaves, rangoli and regular shapes.',
    revise: {
      oneLine: 'A shape is symmetric if a fold along a line makes both halves match exactly; that line is a line of symmetry. A square has 4 lines, a rectangle 2, an equilateral triangle 3, a circle very many.',
      sections: [
        { h: 'Mirror line', html: `<p>Each point and its image are the same distance from the mirror line, on opposite sides.</p>` },
        { h: 'Letters', html: `<p>A, M, T, U, V, W, Y: vertical line. B, C, D, E, K: horizontal line. H, I, O, X: both. F, G, J, L, N, P, R, S, Z: none.</p>` },
        { h: 'Regular shapes', html: `<p>A regular shape with n sides has n lines of symmetry.</p>` }
      ],
      formulas: [['Square', '4 lines'], ['Rectangle', '2 lines'], ['Equilateral triangle', '3 lines'], ['Regular n-gon', 'n lines'], ['Circle', 'every diameter']],
      terms: [['Symmetric', 'halves match on folding'], ['Line of symmetry', 'fold line'], ['Mirror image', 'reflection']],
      traps: ['Diagonals of a rectangle are not lines of symmetry.', 'S and Z have no line of symmetry.', 'Copy, do not slide, across the line.'],
      bridge: '<p>Class 5 and 6 add turn (rotational) symmetry.</p>'
    },
    explore: [
      { title: 'Mirror drawing', intro: 'Click squares on the left; the mirror copy appears on the right.',
        build(el, K) { const on = new Set(['1,2', '2,1', '2,2', '3,2', '2,3', '4,4', '0,5']); const box = document.createElement('div'); box.style.cssText = 'display:grid;grid-template-columns:repeat(12,32px);gap:2px;margin:8px 0'; el.appendChild(box); const rd = K.read(el);
          function draw() { let h = ''; for (let r = 0; r < 8; r++) for (let c = 0; c < 12; c++) { const L = c < 6, k = L ? `${r},${c}` : `${r},${11 - c}`, f = on.has(k); h += `<div data-k="${L ? k : ''}" style="height:32px;border-radius:3px;cursor:${L ? 'pointer' : 'default'};border:1px solid var(--rule,#cbd5e1);${c === 5 ? 'border-right:4px solid var(--purple,#7c3aed);' : ''}background:${f ? (L ? 'var(--blue,#1d4ed8)' : 'var(--orange,#ea580c)') : 'transparent'}"></div>`; } box.innerHTML = h;
            box.querySelectorAll('[data-k]').forEach(d => { if (d.dataset.k) d.onclick = () => { on.has(d.dataset.k) ? on.delete(d.dataset.k) : on.add(d.dataset.k); draw(); }; }); rd.innerHTML = `${on.size} squares on each side · purple line = line of symmetry`; }
          draw(); return null; } },
      { title: 'Lines of symmetry of regular shapes', intro: 'Choose the number of sides.',
        build(el, K) { let n = 6; const row = K.row(el); K.slider(row, 'sides', 3, 10, 1, n, v => { n = v; b.redraw(); }); const b = new K.Board(el, { xmin: -1.6, xmax: 1.6, ymin: -1.4, ymax: 1.4, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const P = Array.from({ length: n }, (_, i) => [Math.cos(Math.PI / 2 + 2 * Math.PI * i / n), Math.sin(Math.PI / 2 + 2 * Math.PI * i / n)]); for (let i = 0; i < n; i++) { const a = Math.PI / 2 + Math.PI * i / n; b.line(-1.3 * Math.cos(a), -1.3 * Math.sin(a), 1.3 * Math.cos(a), 1.3 * Math.sin(a), { color: C.orange, w: 1.5, dash: [6, 4] }); } b.poly(P, { fill: C.blueL, color: C.blue, w: 3 });
            rd.innerHTML = `regular ${n}-sided shape: <b>${n} lines of symmetry</b>${n % 2 ? ' (each from a corner to the middle of the opposite side)' : ' (corner to corner and side to side)'}`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Lines in shapes', gen(R) { const t = R.pick([['square', 4], ['rectangle', 2], ['equilateral triangle', 3], ['regular hexagon', 6], ['regular pentagon', 5], ['isosceles triangle', 1]]); return { q: `How many lines of symmetry does a ${t[0]} have?`, a: String(t[1]), ans: t[1] }; } },
      { title: 'Letters', gen(R) { const t = R.pick([['A', 'vertical'], ['B', 'horizontal'], ['H', 'vertical and horizontal'], ['S', 'none'], ['M', 'vertical'], ['E', 'horizontal'], ['L', 'none'], ['X', 'vertical and horizontal']]); return { q: `Which line of symmetry does the letter ${t[0]} have?`, a: t[1] }; } },
      { title: 'Symmetric or not', levels: [1, 2], gen(R) { const t = R.pick([['a butterfly', 'yes'], ['the number 8', 'yes'], ['the letter F', 'no'], ['a peepal leaf', 'yes (nearly)'], ['the number 7', 'no']]); return { q: `Is ${t[0]} symmetric?`, a: t[1] }; } },
      { title: 'Mirror point', levels: [2, 3], gen(R) { const m = R.int(4, 8), x = R.int(1, m - 1); return { q: `A mirror line is at column ${m}. A dot is at column ${x}. Where is its mirror image?`, a: `column ${2 * m - x}`, ans: 2 * m - x }; } },
      { title: 'Regular shapes', levels: [3], gen(R) { const n = R.int(3, 12); return { q: `A regular shape has ${n} equal sides. Lines of symmetry?`, a: String(n), ans: n }; } }
    ],
    quiz: [
      { q: 'Lines of symmetry of a square', o: ['4', '2', '1', '8'], a: 0, e: '2 middle + 2 diagonals.' }, { q: 'Rectangle', o: ['2', '4', '1', '0'], a: 0, e: 'Not diagonals.' },
      { q: 'Letter with no line of symmetry', o: ['S', 'A', 'H', 'O'], a: 0, e: 'Turns, does not fold.' }, { q: 'Equilateral triangle', o: ['3', '1', '2', '6'], a: 0, e: 'One from each corner.' },
      { q: 'Regular hexagon', o: ['6', '3', '4', '12'], a: 0, e: 'n lines.' }, { q: 'B has a', o: ['horizontal line', 'vertical line', 'both', 'none'], a: 0, e: 'Top and bottom match.' },
      { q: 'A circle has', o: ['very many lines', '1', '2', '0'], a: 0, e: 'Any diameter.' }, { q: 'Mirror at 5, dot at 3; image at', o: ['7', '8', '2', '5'], a: 0, e: '2 on each side.' },
      { q: 'Folding along a line of symmetry makes halves', o: ['match', 'different', 'bigger', 'vanish'], a: 0, e: 'Match.' }, { q: 'Diagonal of a rectangle is a line of symmetry?', o: ['no', 'yes', 'sometimes for all', 'only long ones'], a: 0, e: 'Halves do not match.' },
      { q: 'Letter H has', o: ['2 lines', '1 line', 'no line', '4 lines'], a: 0, e: 'Both.' }
    ],
    teach: {
      outcomes: ['Find lines of symmetry', 'Complete symmetric pictures', 'Relate symmetry of regular shapes'],
      periods: [{ t: 'Folding', flow: [['10 min', 'Ink-blot butterflies.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Letters sort.']] }, { t: 'Shapes', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Fold paper shapes.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Rectangle diagonals.', 'Sliding instead of reflecting.'], activities: ['Mirror with a pocket mirror.', 'Symmetric rangoli.'],
      exit: ['Lines in a regular pentagon.', 'Letters with both lines.', 'Complete a half-face.'], homework: 'Collect 5 leaves or flowers, draw their lines of symmetry and write your name in symmetric letters.'
    },
    slides: [{ t: 'Fun with Symmetry', b: ['Fold and match', 'Mirror images', 'Letters', 'Regular shapes'] }, { t: 'Check yourself', b: ['Lines in a square?', 'Is Z symmetric?'] }],
    fs: { groups: [['Shapes', [['Square', '4'], ['Rectangle', '2'], ['Equilateral triangle', '3'], ['Regular n-gon', 'n'], ['Circle', 'many']]], ['Letters', [['Vertical', 'A M T U V W Y'], ['Horizontal', 'B C D E K'], ['Both', 'H I O X'], ['None', 'F G J L N P R S Z']]]],
      ex: [['Regular octagon', '8 lines'], ['Mirror 6, dot 4', 'image 8']], rem: ['Fold to test.', 'Same distance either side.', 'Rectangle: no diagonal lines.'] }
  });
})();
