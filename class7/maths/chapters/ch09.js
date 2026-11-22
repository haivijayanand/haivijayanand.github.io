/*
TOOL:    class7_maths_ch09
FAMILY:  CBSE_REVISION / Class 7 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 9 Geometric Twins (Part II Ch 1: congruent figures, congruent triangles, SSS, SAS, ASA, RHS conditions, isosceles triangle property) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 9, part: 'Part II', short: 'Congruence', title: 'Geometric Twins',
    blurb: 'Part II Chapter 1. Congruent figures (exact copies that fit on each other), corresponding parts, conditions for congruent triangles (SSS, SAS, ASA/AAS, RHS), why SSA and AAA do not work, and the isosceles triangle property.',
    revise: {
      oneLine: 'Two triangles are congruent (≅) if one can be moved (slid, turned, flipped) to fit exactly on the other. It is enough to know three sides (SSS), two sides and the included angle (SAS), two angles and a side (ASA/AAS), or a right angle, hypotenuse and a side (RHS). Equal angles alone (AAA) only give the same shape, not the same size.',
      sections: [
        { h: 'Correspondence', html: `<p>△ABC ≅ △PQR means A↔P, B↔Q, C↔R: AB = PQ, ∠B = ∠Q, etc.</p>` },
        { h: 'Conditions', html: `<p>SSS, SAS (angle between the sides), ASA or AAS, RHS (right triangles).</p>` },
        { h: 'Not enough', html: `<p>AAA: same angles, different sizes. SSA: the angle not between the sides can give two different triangles.</p>` }
      ],
      formulas: [['SSS', '3 sides'], ['SAS', '2 sides + included angle'], ['ASA / AAS', '2 angles + a side'], ['RHS', 'right angle, hypotenuse, side'], ['Isosceles', 'equal sides ⇔ equal opposite angles']],
      terms: [['Congruent', 'same shape and size'], ['Corresponding parts', 'parts that match'], ['Included angle', 'angle between two given sides']],
      traps: ['Order of letters matters in △ABC ≅ △PQR.', 'SSA is not a congruence rule.', 'AAA gives similar, not congruent, triangles.'],
      bridge: '<p>Ch 14 uses congruent shapes in tilings.</p>'
    },
    explore: [
      { title: 'Move to fit', intro: 'Slide, turn and flip the orange copy until it fits the blue triangle.',
        build(el, K) { let dx = 5, ang = 40, fl = 1; const row = K.row(el); K.slider(row, 'slide', 0, 8, 0.5, dx, v => { dx = v; b.redraw(); }); K.slider(row, 'turn (°)', 0, 360, 10, ang, v => { ang = v; b.redraw(); }); K.select(row, 'flip', ['no', 'yes'], i => { fl = i; b.redraw(); }); const s0 = row.querySelector('select'); if (s0) s0.value = 1;
          const T = [[0, 0], [4, 0], [1, 3]]; const b = new K.Board(el, { xmin: -4, xmax: 14, ymin: -5, ymax: 6, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.poly(T, { fill: C.blueL, color: C.blue, w: 3 }); ['A', 'B', 'C'].forEach((l, i) => b.text(T[i][0] - 0.4, T[i][1] + 0.3, l, { font: 'bold 13px', color: C.blue }));
            const r = ang * Math.PI / 180; const P = T.map(([x, y]) => { const X = fl ? -x + 4 : x; const cx = 5 / 3, cy = 1; const ux = X - cx, uy = y - cy; return [cx + ux * Math.cos(r) - uy * Math.sin(r) + dx, cy + ux * Math.sin(r) + uy * Math.cos(r)]; });
            b.poly(P, { fill: C.orangeL, color: C.orange, w: 3 }); ['P', 'Q', 'R'].forEach((l, i) => b.text(P[i][0] + 0.3, P[i][1] - 0.3, l, { font: 'bold 13px', color: C.orange }));
            const fit = dx === 0 && fl === 0 && ang % 360 === 0; rd.innerHTML = fit ? '<b>exact fit</b>: △ABC ≅ △PQR with A↔P, B↔Q, C↔R' : 'set slide 0, turn 0° (or 360°) and no flip to make it fit — sliding, turning and flipping never change size or shape'; };
          b.redraw(); return null; } },
      { title: 'Why SSA fails', intro: 'Fixed: side AB, angle A, and side BC. Change BC: sometimes two different triangles fit.',
        build(el, K) { let s = 3.2; const row = K.row(el); K.slider(row, 'BC', 2, 7, 0.1, s, v => { s = v; b.redraw(); }); const b = new K.Board(el, { xmin: -1, xmax: 10, ymin: -1, ymax: 5.5, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const A = [0, 0], c = 5, Aang = 35 * Math.PI / 180, B = [c * Math.cos(Aang), c * Math.sin(Aang)]; b.line(0, 0, 10, 0, { color: C.grey, w: 2 }); b.line(...A, ...B, { color: C.ink, w: 3 }); b.dot(...A, { r: 5, label: 'A' }); b.dot(...B, { r: 5, label: 'B' }); b.circle(B[0], B[1], s, { color: C.purple, w: 1.5, dash: [5, 4] });
            const h = B[1], sols = []; if (s >= h) { const dd = Math.sqrt(s * s - h * h); [B[0] - dd, B[0] + dd].forEach(x => { if (x > 0.01) sols.push(x); }); }
            sols.forEach((x, i) => { b.poly([A, B, [x, 0]], { fill: i ? C.orangeL : C.blueL, color: i ? C.orange : C.blue, w: 2 }); b.dot(x, 0, { r: 5, label: 'C' + (i + 1) }); });
            rd.innerHTML = `AB = 5, ∠A = 35°, BC = ${s.toFixed(1)} → <b>${sols.length}</b> possible triangle${sols.length === 1 ? '' : 's'}${sols.length === 2 ? ' — same SSA data, different triangles, so SSA is not a congruence rule' : ''}`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Which rule?', gen(R) { const t = R.pick([['AB = PQ, BC = QR, CA = RP', 'SSS'], ['AB = PQ, ∠B = ∠Q, BC = QR', 'SAS'], ['∠A = ∠P, AB = PQ, ∠B = ∠Q', 'ASA'], ['∠B = ∠Q = 90°, AC = PR, AB = PQ', 'RHS'], ['∠A = ∠P, ∠B = ∠Q, ∠C = ∠R', 'not enough (AAA)'], ['AB = PQ, BC = QR, ∠A = ∠P', 'not enough (SSA)']]); return { q: `In △ABC and △PQR: ${t[0]}. Congruent? By which rule?`, a: t[1] }; } },
      { title: 'Corresponding parts', gen(R) { const t = R.pick([['AB', 'PQ'], ['BC', 'QR'], ['CA', 'RP'], ['∠A', '∠P'], ['∠B', '∠Q'], ['∠C', '∠R']]); return { q: `△ABC ≅ △PQR. Which part matches ${t[0]}?`, a: t[1] }; } },
      { title: 'Isosceles', gen(R) { const v = R.int(20, 140); return { q: `In △ABC, AB = AC and ∠A = ${v}°. Find ∠B.`, a: `${(180 - v) / 2}°`, ans: (180 - v) / 2 }; } },
      { title: 'Missing measure', levels: [2, 3], gen(R) { const s = R.int(3, 12), a = R.int(30, 80); return { q: `△ABC ≅ △DEF. AB = ${s} cm and ∠B = ${a}°. Find DE and ∠E.`, a: `${s} cm, ${a}°` }; } },
      { title: 'True or false', levels: [3], gen(R) { const t = R.pick([['Two triangles with equal angles are congruent.', 'false (AAA gives same shape only)'], ['Two right triangles with equal hypotenuses and one equal side are congruent.', 'true (RHS)'], ['Congruent figures have equal areas.', 'true'], ['Figures with equal areas are congruent.', 'false']]); return { q: t[0], a: t[1] }; } }
    ],
    quiz: [
      { q: 'Congruent means', o: ['same shape and size', 'same shape only', 'same area only', 'same perimeter'], a: 0, e: 'Exact copy.' }, { q: 'Not a congruence rule', o: ['SSA', 'SSS', 'SAS', 'RHS'], a: 0, e: 'Ambiguous.' },
      { q: 'AAA gives', o: ['same shape, maybe different size', 'congruent', 'equal sides', 'nothing'], a: 0, e: 'Similar.' }, { q: '△ABC ≅ △PQR: BC matches', o: ['QR', 'PQ', 'PR', 'RP'], a: 0, e: 'Order.' },
      { q: 'SAS needs the angle', o: ['between the two sides', 'opposite a side', 'any', 'right'], a: 0, e: 'Included.' }, { q: 'AB = AC: then', o: ['∠B = ∠C', '∠A = ∠B', '∠A = 90°', 'BC = AB'], a: 0, e: 'Isosceles.' },
      { q: 'RHS is for', o: ['right triangles', 'equilateral', 'obtuse', 'any triangle'], a: 0, e: 'Right angle.' }, { q: 'Flipping a figure changes', o: ['nothing about size or shape', 'its size', 'its angles', 'its area'], a: 0, e: 'Rigid move.' },
      { q: 'Isosceles with ∠A = 40°, AB = AC: ∠B', o: ['70°', '40°', '140°', '80°'], a: 0, e: '140 ÷ 2.' }, { q: 'Equal areas ⇒ congruent?', o: ['no', 'yes', 'only triangles', 'only squares'], a: 0, e: 'Different shapes.' },
      { q: 'ASA uses', o: ['two angles and the side between', 'three sides', 'three angles', 'two sides'], a: 0, e: 'Angle-side-angle.' }
    ],
    teach: {
      outcomes: ['Identify congruent figures and parts', 'Apply SSS, SAS, ASA, RHS', 'Explain why SSA and AAA fail'],
      periods: [{ t: 'Congruence', flow: [['10 min', 'Trace and overlay shapes.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Corresponding parts.']] }, { t: 'Rules', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Rule cards.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Letter order ignored.', 'SSA as a rule.'], activities: ['Straw triangles with 3 fixed sides.', 'Tracing-paper matching.'],
      exit: ['Rule for given data.', 'Matching parts.', 'Isosceles angle.'], homework: 'Find two congruent objects at home (tiles, coins, keys). Explain why they are congruent.'
    },
    slides: [{ t: 'Geometric Twins', b: ['Congruent figures', 'Corresponding parts', 'SSS, SAS, ASA, RHS', 'SSA and AAA fail'] }, { t: 'Check yourself', b: ['Rule: 2 sides + included angle?', 'AB = AC, ∠A = 50°: ∠B?'] }],
    fs: { groups: [['Rules', [['SSS', '3 sides'], ['SAS', 'included angle'], ['ASA / AAS', '2 angles + side'], ['RHS', 'right, hypotenuse, side']]], ['Not rules', [['AAA', 'same shape only'], ['SSA', 'can give 2 triangles']]], ['Isosceles', [['AB = AC', '∠B = ∠C']]]],
      ex: [['AB = PQ, ∠B = ∠Q, BC = QR', 'SAS'], ['AB = AC, ∠A = 40°', '∠B = 70°']], rem: ['Write vertices in matching order.', 'Included angle for SAS.', 'Moves never change size.'] }
  });
})();
