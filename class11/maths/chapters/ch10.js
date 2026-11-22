/*
TOOL:    class11_maths_ch10
FAMILY:  CBSE_REVISION / Class 11 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 10 Conic Sections - revise, exam focus, 2 explore panels (conic gallery with focus/directrix, ellipse string property), 6 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { Q, C, num, terms } = G9;
  const sq = (n) => { const s = G9.surd(n); return s.i === 1 ? String(s.o) : (s.o === 1 ? '' : s.o) + '√' + s.i; };

  G9.register({
    no: 10, part: 'Unit III · Coordinate Geometry (12 marks)', short: 'Conic sections', title: 'Conic Sections',
    blurb: 'Circle, parabola, ellipse and hyperbola in standard form: foci, vertices, axes, eccentricity, latus rectum.',
    revise: {
      oneLine: 'Slicing a double cone gives a circle, parabola, ellipse or hyperbola. In standard position each has a short equation from which the vertices, foci, axes, eccentricity e and latus rectum can be read off.',
      sections: [
        { h: 'Circle', html: `<p>(x − h)² + (y − k)² = r²; centre (h, k), radius r. General form x² + y² + 2gx + 2fy + c = 0: centre (−g, −f), r = √(g² + f² − c).</p>` },
        { h: 'Parabola', html: `<p>Set of points equidistant from a focus and a directrix. y² = 4ax: focus (a, 0), directrix x = −a, axis y = 0, latus rectum 4a, opens right. Other forms: y² = −4ax (left), x² = 4ay (up), x² = −4ay (down).</p>` },
        { h: 'Ellipse', html: `<p>Sum of distances from two foci is constant = 2a. ${'x²/a² + y²/b² = 1'} (a &gt; b): c² = a² − b², foci (±c, 0), vertices (±a, 0), major axis 2a, minor axis 2b, e = c/a &lt; 1, latus rectum 2b²/a. If the larger denominator is under y², the major axis is vertical.</p>` },
        { h: 'Hyperbola', html: `<p>Difference of distances from two foci is constant = 2a. x²/a² − y²/b² = 1: c² = a² + b², foci (±c, 0), vertices (±a, 0), transverse axis 2a, conjugate axis 2b, e = c/a &gt; 1, latus rectum 2b²/a. The positive term decides the transverse axis.</p>` }
      ],
      formulas: [['Circle', '(x − h)² + (y − k)² = r²'], ['Parabola y² = 4ax', 'focus (a, 0), directrix x = −a, LR 4a'], ['Ellipse', 'x²/a² + y²/b² = 1, c² = a² − b², e = c/a < 1'], ['Hyperbola', 'x²/a² − y²/b² = 1, c² = a² + b², e = c/a > 1'], ['Latus rectum (ellipse, hyperbola)', '2b²/a']],
      terms: [['Focus', 'fixed point defining the conic'], ['Directrix', 'fixed line (parabola)'], ['Eccentricity e', 'c/a: 0 circle, < 1 ellipse, 1 parabola, > 1 hyperbola'], ['Latus rectum', 'focal chord perpendicular to the axis']],
      traps: ['Ellipse uses c² = a² − b², hyperbola c² = a² + b².', 'Reading a from 4a: y² = 12x gives a = 3, not 12.', 'Major axis direction is set by the larger denominator.', 'Hyperbola transverse axis follows the positive term.'],
      board: '<p><b>Unit III (Coordinate Geometry) — 12 marks.</b> Expect: centre and radius of a circle, focus/directrix/latus rectum of a parabola, and foci/vertices/eccentricity/axes of an ellipse or hyperbola (2–4 marks), and finding an equation from given data.</p>',
      bridge: '<p>Builds on Ch 9. Class 12 Integrals find areas bounded by these curves.</p>'
    },

    explore: [
      {
        title: 'Conic gallery', intro: 'Choose a conic and set a, b. Foci (orange), vertices (purple) and the eccentricity are shown.',
        build(el, K) {
          let kind = 1, a = 5, bb = 3; const row = K.row(el); const rd = K.read(el);
          const sc = K.select(row, 'Conic', ['circle x² + y² = a²', 'ellipse x²/a² + y²/b² = 1', 'hyperbola x²/a² − y²/b² = 1', 'parabola y² = 4ax'], i => { kind = i; bd.redraw(); }); if (sc && sc.value !== undefined) sc.value = 1;
          K.slider(row, 'a', 1, 7, 0.5, a, v => { a = v; bd.redraw(); }); K.slider(row, 'b', 1, 7, 0.5, bb, v => { bb = v; bd.redraw(); });
          const bd = new K.Board(el, { xmin: -12, xmax: 12, ymin: -8, ymax: 8 });
          bd.onDraw = () => { bd.base(); let msg = '';
            if (kind === 0) { bd.circle(0, 0, a, { color: C.blue, w: 3 }); bd.dot(0, 0, { color: C.orange, r: 5, label: 'centre' }); msg = `centre (0, 0), radius ${num(a)}, e = 0`; }
            if (kind === 1) { const A = Math.max(a, bb), B = Math.min(a, bb), horiz = a >= bb, c = Math.sqrt(A * A - B * B); const cx = bd.ctx; cx.save(); cx.beginPath(); for (let t = 0; t <= 2 * Math.PI + .01; t += .02) { const x = a * Math.cos(t), y = bb * Math.sin(t); t ? cx.lineTo(bd.X(x), bd.Y(y)) : cx.moveTo(bd.X(x), bd.Y(y)); } cx.strokeStyle = C.blue; cx.lineWidth = 3; cx.stroke(); cx.restore();
              const F1 = horiz ? [c, 0] : [0, c], F2 = horiz ? [-c, 0] : [0, -c]; bd.dot(...F1, { color: C.orange, r: 5, label: 'F₁' }); bd.dot(...F2, { color: C.orange, r: 5, label: 'F₂' }); [[a, 0], [-a, 0], [0, bb], [0, -bb]].forEach(p => bd.dot(...p, { color: C.purple, r: 4 }));
              msg = `c² = ${num(A * A)} − ${num(B * B)} ⇒ c = ${num(c, 3)} · foci ${horiz ? `(±${num(c, 3)}, 0)` : `(0, ±${num(c, 3)})`} · major axis ${num(2 * A)} (${horiz ? 'along x' : 'along y'}), minor ${num(2 * B)} · e = ${num(c / A, 3)} · latus rectum ${num(2 * B * B / A, 3)}`; }
            if (kind === 2) { const c = Math.sqrt(a * a + bb * bb); const cx = bd.ctx; cx.save(); cx.strokeStyle = C.blue; cx.lineWidth = 3; [1, -1].forEach(s => { cx.beginPath(); for (let t = -2.6; t <= 2.6; t += .02) { const x = s * a * Math.cosh(t), y = bb * Math.sinh(t); t > -2.6 ? cx.lineTo(bd.X(x), bd.Y(y)) : cx.moveTo(bd.X(x), bd.Y(y)); } cx.stroke(); }); cx.restore();
              bd.infLine(bb, -a, 0, { color: C.grey, w: 1, dash: [4, 4] }); bd.infLine(bb, a, 0, { color: C.grey, w: 1, dash: [4, 4] });
              bd.dot(c, 0, { color: C.orange, r: 5, label: 'F₁' }); bd.dot(-c, 0, { color: C.orange, r: 5, label: 'F₂' }); bd.dot(a, 0, { color: C.purple, r: 4 }); bd.dot(-a, 0, { color: C.purple, r: 4 });
              msg = `c² = a² + b² = ${num(a * a + bb * bb)} ⇒ c = ${num(c, 3)} · foci (±${num(c, 3)}, 0), vertices (±${num(a)}, 0) · e = ${num(c / a, 3)} > 1 · latus rectum ${num(2 * bb * bb / a, 3)} · dashed lines: asymptotes y = ±(b/a)x`; }
            if (kind === 3) { const cx = bd.ctx; cx.save(); cx.beginPath(); for (let y = -8; y <= 8; y += .05) { const x = y * y / (4 * a); y > -8 ? cx.lineTo(bd.X(x), bd.Y(y)) : cx.moveTo(bd.X(x), bd.Y(y)); } cx.strokeStyle = C.blue; cx.lineWidth = 3; cx.stroke(); cx.restore();
              bd.line(-a, -8, -a, 8, { color: C.purple, w: 2, dash: [6, 4] }); bd.dot(a, 0, { color: C.orange, r: 5, label: 'F' }); bd.line(a, -2 * a, a, 2 * a, { color: C.orange, w: 2 });
              msg = `y² = ${num(4 * a)}x · focus (${num(a)}, 0) · directrix x = −${num(a)} (purple) · latus rectum 4a = ${num(4 * a)} (orange) · e = 1`; }
            rd.innerHTML = msg; };
          bd.redraw(); return null;
        }
      },
      {
        title: 'The string property of an ellipse', intro: 'Press <kbd>P</kbd>. A point moves round the ellipse; PF₁ + PF₂ always equals 2a.',
        build(el, K) {
          const a = 6, b = 4, c = Math.sqrt(a * a - b * b); const bd = new K.Board(el, { xmin: -9, xmax: 9, ymin: -6, ymax: 6 }); const rd = K.read(el);
          const an = new K.Anim(Infinity, () => bd.redraw(), { ms: 40 });
          bd.onDraw = () => { bd.base(); const t = an.i * 0.04; const cx = bd.ctx; cx.save(); cx.beginPath(); for (let s = 0; s <= 6.3; s += .02) { const x = a * Math.cos(s), y = b * Math.sin(s); s ? cx.lineTo(bd.X(x), bd.Y(y)) : cx.moveTo(bd.X(x), bd.Y(y)); } cx.strokeStyle = C.grey; cx.lineWidth = 2; cx.stroke(); cx.restore();
            const px = a * Math.cos(t), py = b * Math.sin(t); bd.line(c, 0, px, py, { color: C.blue, w: 3 }); bd.line(-c, 0, px, py, { color: C.orange, w: 3 }); bd.dot(c, 0, { label: 'F₁', r: 5 }); bd.dot(-c, 0, { label: 'F₂', r: 5 }); bd.dot(px, py, { color: C.purple, r: 6, label: 'P' });
            const d1 = Math.hypot(px - c, py), d2 = Math.hypot(px + c, py); rd.innerHTML = `x²/36 + y²/16 = 1 · <span style="color:var(--blue)">PF₁ = ${num(d1, 3)}</span> + <span style="color:var(--orange)">PF₂ = ${num(d2, 3)}</span> = <b>${num(d1 + d2, 3)}</b> = 2a`; };
          K.anim(el, an); bd.redraw(); return an;
        }
      }
    ],

    gens: [
      { title: 'Circle: centre and radius', gen(R, L) {
          const h = R.int(-6, 6), k = R.int(-6, 6), r = R.int(1, 8);
          if (L === 1) return { q: `Find the equation of the circle with centre (${h}, ${k}) and radius ${r}.`, a: `(x ${h < 0 ? '+' : '−'} ${Math.abs(h)})² + (y ${k < 0 ? '+' : '−'} ${Math.abs(k)})² = ${r * r}`.replace(/\(x − 0\)/, 'x').replace(/\(y − 0\)/, 'y') };
          return { q: `Find the centre and radius of ${terms([[1, 'x²'], [1, 'y²'], [-2 * h, 'x'], [-2 * k, 'y'], [h * h + k * k - r * r, '']])} = 0.`, a: `centre (${h}, ${k}), radius ${r}`, ans: r, s: 'complete the squares' };
        } },
      { title: 'Parabola: focus, directrix, latus rectum', gen(R) {
          const a = R.int(1, 6), t = R.int(0, 3); const eqs = [`y² = ${4 * a}x`, `y² = −${4 * a}x`, `x² = ${4 * a}y`, `x² = −${4 * a}y`];
          const fo = [`(${a}, 0)`, `(−${a}, 0)`, `(0, ${a})`, `(0, −${a})`][t], di = [`x = −${a}`, `x = ${a}`, `y = −${a}`, `y = ${a}`][t], ax = t < 2 ? 'x-axis' : 'y-axis';
          return { q: `For ${eqs[t]} find the focus, the axis, the directrix and the length of the latus rectum.`, a: `focus ${fo}, axis ${ax}, directrix ${di}, latus rectum ${4 * a}`, s: `4a = ${4 * a} ⇒ a = ${a}` };
        } },
      { title: 'Ellipse: foci, axes, e', gen(R) {
          const T = R.pick([[5, 4, 3], [5, 3, 4], [13, 12, 5], [10, 8, 6], [10, 6, 8], [17, 15, 8], [3, 2, 0]]); const [A, B] = T; const c2 = A * A - B * B; const horiz = R.chance(.5);
          const eq = horiz ? `x²/${A * A} + y²/${B * B} = 1` : `x²/${B * B} + y²/${A * A} = 1`; const cs = sq(c2);
          return { q: `For the ellipse ${eq} find the foci, vertices, lengths of major and minor axes, eccentricity and latus rectum.`, a: `foci ${horiz ? `(±${cs}, 0)` : `(0, ±${cs})`}, vertices ${horiz ? `(±${A}, 0)` : `(0, ±${A})`}, major ${2 * A}, minor ${2 * B}, e = ${cs}/${A}, latus rectum ${Q(2 * B * B, A)}`, s: `c² = ${A * A} − ${B * B} = ${c2}` };
        } },
      { title: 'Hyperbola: foci, vertices, e', gen(R) {
          const T = R.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [2, 3, 0], [8, 15, 17]]); const [A, B] = T; const c2 = A * A + B * B; const horiz = R.chance(.6); const cs = sq(c2);
          const eq = horiz ? `x²/${A * A} − y²/${B * B} = 1` : `y²/${A * A} − x²/${B * B} = 1`;
          return { q: `For the hyperbola ${eq} find the foci, vertices, eccentricity and length of the latus rectum.`, a: `foci ${horiz ? `(±${cs}, 0)` : `(0, ±${cs})`}, vertices ${horiz ? `(±${A}, 0)` : `(0, ±${A})`}, e = ${cs}/${A}, latus rectum ${Q(2 * B * B, A)}`, s: `c² = ${A * A} + ${B * B} = ${c2}` };
        } },
      { title: 'Find the equation', levels: [2, 3], gen(R) {
          const t = R.int(0, 2);
          if (t === 0) { const a = R.int(1, 6); return { q: `Find the equation of the parabola with focus (${a}, 0) and directrix x = −${a}.`, a: `y² = ${4 * a}x` }; }
          const T = R.pick([[5, 4, 3], [13, 12, 5], [10, 8, 6], [5, 3, 4]]);
          if (t === 1) return { q: `Find the equation of the ellipse with vertices (±${T[0]}, 0) and foci (±${T[2]}, 0).`, a: `x²/${T[0] ** 2} + y²/${T[1] ** 2} = 1`, s: `b² = ${T[0] ** 2} − ${T[2] ** 2}` };
          return { q: `Find the equation of the hyperbola with vertices (±${T[1]}, 0) and foci (±${T[0]}, 0).`, a: `x²/${T[1] ** 2} − y²/${T[2] ** 2} = 1`, s: `b² = ${T[0] ** 2} − ${T[1] ** 2}` };
        } },
      { title: 'Identify the conic', levels: [1, 2], gen(R) {
          const items = [['x² + y² = 25', 'circle'], ['y² = 8x', 'parabola'], ['x²/9 + y²/4 = 1', 'ellipse'], ['x²/9 − y²/4 = 1', 'hyperbola'], ['4x² + 9y² = 36', 'ellipse'], ['9y² − 4x² = 36', 'hyperbola'], ['x² = −6y', 'parabola'], ['e = 0', 'circle'], ['e = 1', 'parabola'], ['e = 3/2', 'hyperbola']];
          const [q, a] = R.pick(items); return { q: `Name the conic: ${q}`, a };
        } }
    ],

    quiz: [
      { q: 'Centre of x² + y² − 4x + 6y − 3 = 0', o: ['(2, −3)', '(−2, 3)', '(4, −6)', '(2, 3)'], a: 0, e: '(−g, −f).' },
      { q: 'Focus of y² = 12x', o: ['(3, 0)', '(12, 0)', '(0, 3)', '(−3, 0)'], a: 0, e: '4a = 12.' },
      { q: 'Latus rectum of x² = −16y', o: ['16', '4', '8', '−16'], a: 0, e: '4a.' },
      { q: 'For x²/25 + y²/9 = 1, c =', o: ['4', '√34', '16', '3'], a: 0, e: '√(25 − 9).' },
      { q: 'Eccentricity of an ellipse is', o: ['0', 'less than 1', '1', 'more than 1'], a: 1, e: 'e = c/a < 1.' },
      { q: 'For x²/9 − y²/16 = 1, foci are', o: ['(±5, 0)', '(±√7, 0)', '(0, ±5)', '(±4, 0)'], a: 0, e: 'c² = 9 + 16.' },
      { q: 'Directrix of y² = 8x', o: ['x = −2', 'x = 2', 'y = −2', 'x = −8'], a: 0, e: 'a = 2.' },
      { q: 'Major axis of x²/16 + y²/49 = 1 lies along', o: ['x-axis', 'y-axis', 'y = x', 'neither'], a: 1, e: '49 > 16 under y².' },
      { q: 'Latus rectum of x²/a² + y²/b² = 1', o: ['2b²/a', '2a²/b', '4a', 'b²/a'], a: 0, e: 'Standard result.' },
      { q: 'A conic with e = 1 is a', o: ['circle', 'parabola', 'ellipse', 'hyperbola'], a: 1, e: 'Definition.' },
      { q: 'Radius of x² + y² + 2x − 8 = 0', o: ['3', '√8', '9', '2'], a: 0, e: '√(1 + 8).' }
    ],

    teach: {
      outcomes: ['Write and analyse equations of circles', 'Find focus, directrix and latus rectum of parabolas', 'Find foci, vertices, axes and eccentricity of ellipses and hyperbolas', 'Form equations from given data'],
      periods: [
        { t: 'Cone sections and circles', flow: [['10 min', 'Torch beam on a wall: circle → ellipse → parabola → hyperbola.'], ['15 min', 'Circles: standard and general form.'], ['15 min', 'Practice.']] },
        { t: 'Parabola', flow: [['15 min', 'Focus–directrix definition; explore panel 1.'], ['15 min', 'Four standard forms.'], ['10 min', 'Practice.']] },
        { t: 'Ellipse and hyperbola', flow: [['15 min', 'Explore panel 2: string property.'], ['15 min', 'Standard forms; c², e, latus rectum.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['c² rule swapped between ellipse and hyperbola.', 'a read as 4a.', 'Axis direction.'],
      activities: ['Draw an ellipse with two pins and a loop of string.', 'Satellite dish/torch reflector: parabola focus.'],
      exit: ['Centre and radius of x² + y² + 8x + 10y − 8 = 0.', 'Focus of x² = 6y.', 'e of x²/36 + y²/16 = 1.'],
      homework: 'Find the equation of the ellipse whose vertices are (0, ±13) and foci (0, ±5), and of the hyperbola with foci (0, ±13) and conjugate axis 24.'
    },

    slides: [
      { t: 'Conic Sections', b: ['Circle', 'Parabola', 'Ellipse', 'Hyperbola'] },
      { t: 'Circle and parabola', b: ['(x − h)² + (y − k)² = r²', 'y² = 4ax: focus (a, 0), directrix x = −a', 'Latus rectum 4a'] },
      { t: 'Ellipse', b: ['x²/a² + y²/b² = 1', 'c² = a² − b², e = c/a < 1', 'PF₁ + PF₂ = 2a'] },
      { t: 'Hyperbola', b: ['x²/a² − y²/b² = 1', 'c² = a² + b², e > 1', '|PF₁ − PF₂| = 2a'] },
      { t: 'Check yourself', b: ['Foci of x²/25 + y²/16 = 1?', 'Focus of y² = 20x?', 'Answers: (±3, 0) · (5, 0)'] }
    ],

    fs: { groups: [
        ['Circle', [['Standard', '(x − h)² + (y − k)² = r²'], ['General', 'x² + y² + 2gx + 2fy + c = 0'], ['Centre, radius', '(−g, −f), √(g² + f² − c)']]],
        ['Parabola (y² = 4ax)', [['Focus', '(a, 0)'], ['Directrix', 'x = −a'], ['Latus rectum', '4a'], ['Other forms', 'y² = −4ax, x² = ±4ay']]],
        ['Ellipse (a > b)', [['Equation', 'x²/a² + y²/b² = 1'], ['c', 'c² = a² − b²'], ['Foci, vertices', '(±c, 0), (±a, 0)'], ['Axes', 'major 2a, minor 2b'], ['e, LR', 'c/a < 1, 2b²/a']]],
        ['Hyperbola', [['Equation', 'x²/a² − y²/b² = 1'], ['c', 'c² = a² + b²'], ['Foci, vertices', '(±c, 0), (±a, 0)'], ['Axes', 'transverse 2a, conjugate 2b'], ['e, LR', 'c/a > 1, 2b²/a']]]],
      ex: [['x²/25 + y²/9 = 1', 'c = 4, foci (±4, 0), e = 4/5, LR 18/5'], ['y² = −8x', 'focus (−2, 0), directrix x = 2']],
      rem: ['Ellipse minus, hyperbola plus for c².', 'Larger denominator → major axis.', 'Find a from 4a.'] }
  });
})();
