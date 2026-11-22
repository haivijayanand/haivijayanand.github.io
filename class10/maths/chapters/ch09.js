/*
TOOL:    class10_maths_ch09
FAMILY:  CBSE_REVISION / Class 10 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 9 Some Applications of Trigonometry - revise, board focus, 2 explore panels (tower and observer, two observation points), 7 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { F, num, C } = G9;
  const T = { 30: { t: '1/√3', v: 1 / Math.sqrt(3) }, 45: { t: '1', v: 1 }, 60: { t: '√3', v: Math.sqrt(3) } };
  const r3 = (x) => num(x, 2);

  G9.register({
    no: 9, part: 'Unit V · Trigonometry (12 marks)', short: 'Heights & distances', title: 'Some Applications of Trigonometry',
    blurb: 'Line of sight, angles of elevation and depression, heights and distances using 30°, 45° and 60°.',
    revise: {
      oneLine: 'Draw the right triangle formed by the observer, the foot and the top of the object; tan of the angle of elevation (or depression) links the height to the horizontal distance.',
      sections: [
        { h: 'Vocabulary', html: `<ul><li><b>Line of sight</b>: line from the eye to the object.</li><li><b>Angle of elevation</b>: angle between the horizontal and the line of sight when looking <b>up</b>.</li><li><b>Angle of depression</b>: angle between the horizontal and the line of sight when looking <b>down</b>.</li></ul>
          <p>The angle of depression from A to B equals the angle of elevation from B to A (alternate angles between parallel horizontals).</p>` },
        { h: 'Method', html: `<ol><li>Draw a neat figure; mark the right angle and the given angle.</li><li>Choose the ratio linking the known and unknown sides — usually <b>tan θ = height ÷ distance</b>; use sin or cos if a slant length (string, ladder) is involved.</li><li>Use exact values: tan 30° = 1/√3, tan 45° = 1, tan 60° = √3; take √3 ≈ 1.732 only at the end.</li></ol>` },
        { h: 'Two-angle problems', html: `<p>Observer moves towards a tower from angle α to angle β (β &gt; α) covering distance d. With height h and final distance x:</p>
          <p class="m">h = x tan β and h = (x + d) tan α ⇒ solve the two equations.</p>
          <p>For a building of height h on which a tower stands, or two buildings facing each other, write one tan equation per triangle and eliminate the common distance.</p>` },
        { h: 'Observer height', html: `<p>If the observer's eyes are at height e, the triangle gives the height <b>above eye level</b>; add e at the end.</p>` }
      ],
      formulas: [['Height from distance', 'h = d tan θ'], ['Distance from height', 'd = h / tan θ = h cot θ'], ['Slant (string, ladder)', 'h = l sin θ, d = l cos θ'], ['tan 30°, 45°, 60°', '1/√3, 1, √3'], ['√3', '≈ 1.732']],
      terms: [['Line of sight', 'eye to object'], ['Angle of elevation', 'looking up from horizontal'], ['Angle of depression', 'looking down from horizontal'], ['Horizontal level', 'line parallel to the ground through the eye']],
      traps: ['Measuring the angle of depression from the vertical instead of the horizontal.', 'Forgetting to add the observer\'s height.', 'Using sin when the hypotenuse is not involved.', 'Rounding √3 too early.'],
      board: '<p><b>Unit V (Trigonometry) — 12 marks.</b> A 5-mark heights-and-distances problem (often two angles) is very common. Marks for: correct figure, correct equations, solving, final answer with units.</p>',
      bridge: '<p>Uses the ratios and standard values of Ch 8.</p>'
    },

    explore: [
      {
        title: 'Tower and observer', intro: 'Change the angle of elevation and the distance. h = d × tan θ.',
        build(el, K) {
          let th = 45, d = 20, e = 1.5; const row = K.row(el);
          K.select(row, 'Angle θ', ['30°', '45°', '60°'], i => { th = [30, 45, 60][i]; b.redraw(); }).value = 1;
          K.slider(row, 'distance d (m)', 5, 40, 1, d, v => { d = v; b.redraw(); }); K.slider(row, 'eye height (m)', 0, 2, 0.1, e, v => { e = v; b.redraw(); });
          const b = new K.Board(el, { xmin: -3, xmax: 48, ymin: -3, ymax: 75, equal: true, axes: false, grid: 0, aspect: 0.55 }); const rd = K.read(el);
          b.onDraw = () => {
            const h = d * T[th].v; Object.assign(b.o, { xmin: -6, xmax: d + 12, ymin: -4, ymax: Math.max(h + e + 4, 12) }); b._fit(); b.clear(); b.line(-6, 0, d + 12, 0, { color: C.axis, w: 2 });
            b.rect(d, 0, Math.max(1, d * 0.06), h + e, { fill: C.blueL, color: C.blue }); b.line(0, 0, 0, e, { color: C.ink, w: 3 }); b.dot(0, e, { color: C.ink, r: 4, label: 'eye', dx: -34, dy: 4 });
            b.line(0, e, d, e, { color: C.grey, w: 1.5, dash: [5, 4] }); b.line(0, e, d, h + e, { color: C.orange, w: 3 });
            b.arc(0, e, d * 0.15, 0, th * Math.PI / 180, { color: C.purple, w: 2.5 }); b.text(d * 0.22, e + d * 0.08, th + '°', { font: 'bold 14px', color: C.purple });
            b.text(d / 2, -2.2, `d = ${d} m`, { font: 'bold 13px' }); b.text(d + Math.max(1, d * 0.06) + 4, e + h / 2, `h = ${r3(h)} m`, { font: 'bold 13px', color: C.blue });
            rd.innerHTML = `tan ${th}° = h/d ⇒ h = ${d} × ${T[th].t} = <b>${r3(h)} m</b> above eye level · tower height = ${r3(h)} + ${num(e)} = <b>${r3(h + e)} m</b>`;
          };
          b.redraw(); return null;
        }
      },
      {
        title: 'Two observation points', intro: 'From P the angle is α; walking d metres closer to Q the angle becomes β. Step through the solution.',
        build(el, K) {
          let al = 30, be = 60, d = 40; const row = K.row(el);
          K.select(row, 'α', ['30°', '45°'], i => { al = [30, 45][i]; if (be <= al) be = 60; an.reset(); });
          K.select(row, 'β', ['45°', '60°'], i => { be = [45, 60][i]; if (be <= al) al = 30; an.reset(); }).value = 1;
          K.slider(row, 'd (m)', 10, 60, 5, d, v => { d = v; an.reset(); });
          const b = new K.Board(el, { xmin: -5, xmax: 110, ymin: -5, ymax: 75, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el);
          const an = new K.Anim(4, () => b.redraw(), { ms: 1200 });
          b.onDraw = () => {
            b.clear(); const ta = T[al].v, tb = T[be].v, x = d * ta / (tb - ta), h = x * tb; const sc = Math.min(1, 65 / h, 95 / (x + d));
            const X = (v) => 100 - v * sc; b.line(-5, 0, 110, 0, { color: C.axis, w: 2 }); b.rect(X(0) - 1, 0, 2, h * sc, { fill: C.blueL, color: C.blue });
            b.line(X(x + d), 0, X(0), h * sc, { color: C.orange, w: 2.5 }); b.line(X(x), 0, X(0), h * sc, { color: C.purple, w: 2.5 });
            b.dot(X(x + d), 0, { label: `P (${al}°)`, color: C.orange }); b.dot(X(x), 0, { label: `Q (${be}°)`, color: C.purple });
            const st = [`Let height h and QB = x.`, `In △QBA: tan ${be}° = h/x ⇒ h = ${T[be].t} x`, `In △PBA: tan ${al}° = h/(x + ${d}) ⇒ h = ${T[al].t}(x + ${d})`, `Solve: x = ${r3(x)} m, <b>h = ${r3(h)} m</b>`];
            rd.innerHTML = st.slice(0, an.i + 1).join('<br>');
          };
          K.anim(el, an); b.redraw(); return an;
        }
      }
    ],

    gens: [
      { title: 'Height from distance', gen(R, L) {
          const th = R.pick([30, 45, 60]), d = R.int(5, 40) * (th === 30 ? 1 : 1);
          const h = d * T[th].v;
          return { q: `The angle of elevation of the top of a tower from a point ${d} m from its foot is ${th}°. Find the height of the tower.`, a: `${th === 45 ? d : th === 60 ? d + '√3' : (d % 3 === 0 ? d / 3 + '√3' : d + '/√3')} m ≈ ${r3(h)} m`, ans: h, tol: 0.05, s: `tan ${th}° = h/${d}` };
        } },
      { title: 'Distance from height', gen(R) {
          const th = R.pick([30, 45, 60]), h = R.int(5, 40); const d = h / T[th].v;
          return { q: `From the top of a ${h} m high cliff, the angle of depression of a boat is ${th}°. How far is the boat from the foot of the cliff?`, a: `${r3(d)} m`, ans: d, tol: 0.05, s: `angle of depression = angle of elevation from the boat; tan ${th}° = ${h}/d` };
        } },
      { title: 'Kite / ladder (slant length)', gen(R) {
          const th = R.pick([30, 45, 60]), l = R.int(5, 30) * 2; const S = { 30: 0.5, 45: Math.SQRT1_2, 60: Math.sqrt(3) / 2 }[th];
          return R.chance(.5) ? { q: `A kite is flying with ${l} m of string, making an angle of ${th}° with the ground. Assuming the string is straight, find the height of the kite.`, a: `${r3(l * S)} m`, ans: l * S, tol: 0.05, s: `sin ${th}° = h/${l}` }
            : { q: `A ladder ${l} m long reaches a window, making an angle of ${th}° with the ground. How far is the foot of the ladder from the wall?`, a: `${r3(l * Math.cos(th * Math.PI / 180))} m`, ans: l * Math.cos(th * Math.PI / 180), tol: 0.05, s: `cos ${th}° = d/${l}` };
        } },
      { title: 'Two angles of elevation', levels: [2, 3], gen(R) {
          const [al, be] = R.pick([[30, 60], [30, 45], [45, 60]]), d = R.int(2, 12) * 10; const ta = T[al].v, tb = T[be].v, x = d * ta / (tb - ta), h = x * tb;
          return { q: `The angle of elevation of the top of a tower from a point on the ground is ${al}°. On walking ${d} m towards the tower, it becomes ${be}°. Find the height of the tower.`, a: `${r3(h)} m`, ans: h, tol: 0.1, s: `h = x tan ${be}°, h = (x + ${d}) tan ${al}° ⇒ x = ${r3(x)} m` };
        } },
      { title: 'Shadow length', levels: [2, 3], gen(R) {
          const h = R.int(5, 30); const s30 = h * Math.sqrt(3), s60 = h / Math.sqrt(3);
          return { q: `A tower is ${h} m tall. Find how much longer its shadow is when the Sun's altitude is 30° than when it is 60°.`, a: `${r3(s30 - s60)} m`, ans: s30 - s60, tol: 0.05, s: `shadows h√3 and h/√3; difference = 2h/√3` };
        } },
      { title: 'Building and tower', levels: [3], gen(R) {
          const b = R.int(2, 10) * 5; // building height; from a point, elevation of top of building 30°, top of tower on it 60° => tower height 2b
          return { q: `From a point on the ground, the angles of elevation of the bottom and the top of a transmission tower fixed on top of a ${b} m high building are 30° and 60°. Find the height of the tower.`, a: `${2 * b} m`, ans: 2 * b, s: `distance = ${b}√3; total height = ${b}√3 × √3 = ${3 * b}; tower = ${3 * b} − ${b}` };
        } },
      { title: 'Angle from given lengths', levels: [1, 2], gen(R) {
          const th = R.pick([30, 45, 60]), d = R.int(3, 20), h = th === 45 ? d : th === 60 ? `${d}√3` : `${d}/√3`;
          return { q: `A pole of height ${h} m casts a shadow ${d} m long. Find the angle of elevation of the Sun.`, a: `${th}°`, ans: th, s: `tan θ = ${h}/${d} = ${T[th].t}` };
        } }
    ],

    quiz: [
      { q: 'A pole 6 m high casts a shadow 2√3 m long. Sun\'s elevation:', o: ['30°', '45°', '60°', '90°'], a: 2, e: 'tan θ = 6/(2√3) = √3.' },
      { q: 'The angle of depression from A to B equals', o: ['the angle of elevation from B to A', '90° minus it', 'twice it', 'none'], a: 0, e: 'Alternate angles.' },
      { q: 'A ladder makes 60° with the ground and its foot is 2 m from the wall. Length:', o: ['4 m', '2√3 m', '2 m', '3 m'], a: 0, e: 'cos 60° = 2/l.' },
      { q: 'From 20 m away, elevation of a tower top is 45°. Height:', o: ['20 m', '20√3 m', '10 m', '40 m'], a: 0, e: 'tan 45° = 1.' },
      { q: 'If the height of a tower and the distance to it are equal, the angle of elevation is', o: ['30°', '45°', '60°', '90°'], a: 1, e: 'tan θ = 1.' },
      { q: 'Kite at height 60 m, string at 60° to the ground. String length:', o: ['40√3 m', '60√3 m', '120 m', '30 m'], a: 0, e: '60/sin 60° = 120/√3.' },
      { q: 'As you walk towards a tower, the angle of elevation of its top', o: ['decreases', 'increases', 'stays the same', 'becomes 0'], a: 1, e: 'Distance smaller, tan larger.' },
      { q: 'Angle of elevation is measured from', o: ['the vertical', 'the horizontal', 'the ground only', 'the line of sight'], a: 1, e: 'Horizontal through the eye.' },
      { q: 'tower height h, angle 30°. Distance from foot:', o: ['h√3', 'h/√3', 'h', '2h'], a: 0, e: 'd = h cot 30°.' },
      { q: 'An observer 1.5 m tall sees the top of a 31.5 m tower at 45°. Distance:', o: ['30 m', '31.5 m', '33 m', '1.5 m'], a: 0, e: 'Height above eye = 30 m.' },
      { q: 'Two angles 30° and 60° from points on the same side at distance d apart; then height h =', o: ['(√3/2)d', 'd√3', 'd/√3', '2d'], a: 0, e: 'x = d/2, h = x√3.' }
    ],

    teach: {
      outcomes: ['Use the vocabulary of line of sight, elevation and depression', 'Draw correct figures from word problems', 'Find heights and distances with tan, sin, cos of 30°, 45°, 60°', 'Solve two-angle problems'],
      periods: [
        { t: 'Elevation and depression', flow: [['10 min', 'Outdoor or window demo with a clinometer.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Single-triangle problems (Practice).']] },
        { t: 'Slant lengths and shadows', flow: [['15 min', 'Kites, ladders, shadows: choosing sin/cos/tan.'], ['15 min', 'Depression problems from a cliff/lighthouse.'], ['10 min', 'Exit ticket.']] },
        { t: 'Two-angle problems', flow: [['20 min', 'Explore panel 2; method with two equations.'], ['10 min', 'Building + tower.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Depression measured from the vertical.', 'Observer height forgotten.', '√3 rounded early.'],
      activities: ['Make a clinometer and measure the school building height.', 'Shadow measurements at two times of day.'],
      exit: ['Height from 30 m at 60°.', 'Depression 30° from a 50 m lighthouse: distance of the ship?', 'Kite string 100 m at 30°: height?'],
      homework: 'A 1.2 m tall girl spots a balloon at 88.2 m height at elevation 60°; after some time it is at 30° at the same height. Find the distance travelled by the balloon.'
    },

    slides: [
      { t: 'Some Applications of Trigonometry', b: ['Line of sight', 'Elevation and depression', 'Heights and distances'] },
      { t: 'Angles', b: ['Elevation: looking up from horizontal', 'Depression: looking down from horizontal', 'Depression from A to B = elevation from B to A'] },
      { t: 'Method', b: ['Draw the figure', 'tan θ = height ÷ distance', 'sin/cos when a slant length is given', 'Exact values, round at the end'] },
      { t: 'Two angles', b: ['h = x tan β', 'h = (x + d) tan α', 'Solve for x, then h'] },
      { t: 'Check yourself', b: ['Elevation 60°, distance 10 m: height?', 'Answer: 10√3 ≈ 17.32 m'] }
    ],

    fs: { groups: [
        ['Definitions', [['Angle of elevation', 'from horizontal, looking up'], ['Angle of depression', 'from horizontal, looking down'], ['Equality', 'depression A→B = elevation B→A']]],
        ['Key relations', [['Height', 'h = d tan θ'], ['Distance', 'd = h cot θ'], ['Slant length l', 'h = l sin θ, d = l cos θ'], ['Observer height e', 'add e at the end']]],
        ['Values', [['tan 30°, 45°, 60°', '1/√3, 1, √3'], ['sin 30°, 45°, 60°', '1/2, 1/√2, √3/2'], ['cos 30°, 45°, 60°', '√3/2, 1/√2, 1/2'], ['√3', '≈ 1.732']]],
        ['Two angles α < β, walk d', [['Equations', 'h = x tan β = (x + d) tan α'], ['30° and 60°', 'x = d/2, h = (√3/2)d']]]],
      ex: [['From 30 m at 30°', 'h = 30/√3 = 10√3 ≈ 17.32 m'], ['Depression 60° from a 75 m tower', 'd = 75/√3 = 25√3 ≈ 43.3 m']],
      rem: ['Angles are measured from the horizontal.', 'Draw and label the figure first.', 'Keep √3 exact until the end.'] }
  });
})();
