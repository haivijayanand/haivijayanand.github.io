/*
TOOL:    class12_maths_ch08
FAMILY:  CBSE_REVISION / Class 12 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 8 Application of Integrals - revise, board focus, 2 explore panels (area under a curve with vertical/horizontal strips, area of circle/ellipse/parabola region), 5 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num, Q } = G9;

  G9.register({
    no: 8, part: 'Unit III · Calculus (35 marks)', short: 'Application of integrals', title: 'Application of Integrals',
    blurb: 'Area under simple curves — lines, circles, parabolas and ellipses in standard form — using vertical or horizontal strips.',
    revise: {
      oneLine: 'Slice a region into thin strips; each strip has area y dx (or x dy). Adding them up is a definite integral: area = ∫ₐᵇ y dx between the curve, the x-axis and x = a, x = b.',
      sections: [
        { h: 'Area under a curve', html: `<div class="box m">Area = ∫ₐᵇ y dx = ∫ₐᵇ f(x) dx (vertical strips) &nbsp;·&nbsp; Area = ∫꜀ᵈ x dy (horizontal strips)</div>
          <p>If the curve is below the axis the integral is negative — take its absolute value. If it crosses the axis, split the interval and add the absolute values.</p>` },
        { h: 'Standard regions', html: `<ul><li>Circle x² + y² = a²: area πa² (4 × ∫₀ᵃ √(a² − x²) dx).</li><li>Ellipse x²/a² + y²/b² = 1: area πab (4 × (b/a)∫₀ᵃ √(a² − x²) dx).</li>
          <li>Parabola y² = 4ax, x from 0 to c: area of the region bounded by the curve and x = c is 2∫₀ᶜ 2√(ax) dx = (8/3)√a c^(3/2). With the latus rectum (c = a): 8a²/3.</li>
          <li>x² = 4y and the line y = c: use horizontal strips, area = 2∫₀ᶜ 2√y dy.</li></ul>` },
        { h: 'Method', html: `<ol><li>Sketch the curve and shade the region.</li><li>Find limits (intersection points).</li><li>Use symmetry when possible (multiply by 2 or 4).</li><li>Choose vertical or horizontal strips, integrate, write "sq units".</li></ol>` }
      ],
      formulas: [['Vertical strips', 'A = ∫ₐᵇ y dx'], ['Horizontal strips', 'A = ∫꜀ᵈ x dy'], ['Circle', 'πa²'], ['Ellipse', 'πab'], ['∫√(a² − x²)', '(x/2)√(a² − x²) + (a²/2)sin⁻¹(x/a)'], ['Parabola y² = 4ax to x = a', '8a²/3']],
      terms: [['Elementary strip', 'thin rectangle of width dx or dy'], ['Region', 'area bounded by curves and lines'], ['Symmetry', 'use equal parts to simplify']],
      traps: ['Negative area below the x-axis.', 'Wrong limits — always sketch first.', 'Forgetting to double for symmetric halves.', 'Missing units (sq units).'],
      board: '<p><b>Unit III (Calculus) — 35 marks.</b> Expect a 3–5 mark question: area of a circle/ellipse or a region bounded by a parabola and a line parallel to an axis, or area under a line; often set as a case study.</p>',
      bridge: '<p>Uses definite integrals (Ch 7) and conics (Class 11 Ch 10).</p>'
    },

    explore: [
      {
        title: 'Strips under a curve', intro: 'Choose the curve and the strip direction. Press <kbd>P</kbd> to add strips one by one; their total is the area.',
        build(el, K) {
          const fs = [['y² = 4x, 0 ≤ x ≤ 4 (upper half)', x => 2 * Math.sqrt(x), 0, 4, 16 / 3 * 2 / 2 * 2], ['y = x², 0 ≤ x ≤ 2', x => x * x, 0, 2, 8 / 3], ['y = √(9 − x²), 0 ≤ x ≤ 3 (quarter circle)', x => Math.sqrt(Math.max(0, 9 - x * x)), 0, 3, 9 * Math.PI / 4], ['y = 2x + 1, 0 ≤ x ≤ 3', x => 2 * x + 1, 0, 3, 12]];
          fs[0][4] = 32 / 3; let k = 0; const row = K.row(el); K.select(row, 'region', fs.map(f => f[0]), i => { k = i; an.reset(); });
          const bd = new K.Board(el, { xmin: -1, xmax: 5, ymin: -1, ymax: 7, equal: false }); const rd = K.read(el);
          const an = new K.Anim(20, () => bd.redraw(), { ms: 250 });
          bd.onDraw = () => { bd.base(); const [nm, f, a, b, A] = fs[k]; const n = 20, w = (b - a) / n; let S = 0;
            for (let i = 0; i < Math.min(an.i, n); i++) { const x = a + i * w, y = f(x + w / 2); S += y * w; bd.rect(x, 0, w, y, { fill: C.blueL, color: C.blue, w: 1 }); }
            bd.fn(x => x < a - 1e-9 || x > b + 1e-9 ? NaN : f(x), { color: C.orange, w: 3 }); bd.line(b, 0, b, f(b), { color: C.purple, w: 2, dash: [5, 4] });
            rd.innerHTML = `${nm} · strips added ${Math.min(an.i, n)}/20 · running sum ≈ ${num(S, 4)} · exact ∫ y dx = <b>${num(A, 4)}</b>${k === 2 ? ' = 9π/4 (whole circle 9π)' : k === 0 ? ' = 32/3 (upper half; with the lower half 64/3)' : ''}`; };
          K.anim(el, an); bd.redraw(); return an;
        }
      },
      {
        title: 'Ellipse area πab', intro: 'Set a and b. The quarter in the first quadrant is (b/a)∫₀ᵃ √(a² − x²) dx = πab/4; four quarters give πab.',
        build(el, K) {
          let a = 4, b = 2; const row = K.row(el); K.slider(row, 'a', 1, 6, 0.5, a, v => { a = v; bd.redraw(); }); K.slider(row, 'b', 1, 5, 0.5, b, v => { b = v; bd.redraw(); });
          const bd = new K.Board(el, { xmin: -7, xmax: 7, ymin: -5.5, ymax: 5.5 }); const rd = K.read(el);
          bd.onDraw = () => { bd.base(); const P = []; for (let t = 0; t <= Math.PI / 2 + 1e-9; t += 0.02) P.push([a * Math.cos(t), b * Math.sin(t)]); P.push([0, 0]); bd.poly(P, { fill: 'rgba(234,88,12,.3)', color: C.orange, w: 1 });
            const c = bd.ctx; c.save(); c.beginPath(); for (let t = 0; t <= 6.3; t += 0.02) { const x = a * Math.cos(t), y = b * Math.sin(t); t ? c.lineTo(bd.X(x), bd.Y(y)) : c.moveTo(bd.X(x), bd.Y(y)); } c.strokeStyle = C.blue; c.lineWidth = 3; c.stroke(); c.restore();
            rd.innerHTML = `x²/${num(a * a)} + y²/${num(b * b)} = 1 · quarter = (${num(b)}/${num(a)})∫₀^${num(a)} √(${num(a * a)} − x²) dx = π·${num(a)}·${num(b)}/4 = ${num(Math.PI * a * b / 4, 3)} · <b>area = πab = ${num(Math.PI * a * b, 3)} sq units</b>${a === b ? ' (a circle: πa²)' : ''}`; };
          bd.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Area under a line', levels: [1, 2], gen(R) {
          const m = R.int(1, 4), c = R.int(0, 5), a = R.int(0, 2), b = a + R.int(1, 4); const A = m * (b * b - a * a) / 2 + c * (b - a);
          return { q: `Find the area bounded by y = ${m === 1 ? '' : m}x${c ? ' + ' + c : ''}, the x-axis and the lines x = ${a}, x = ${b}.`, a: `${num(A)} sq units`, ans: A, s: `∫ from ${a} to ${b} of (${m}x + ${c}) dx` };
        } },
      { title: 'Area of a circle / ellipse', gen(R) {
          const a = R.int(2, 7), b = R.int(1, 6), t = R.int(0, 1);
          if (t === 0) return { q: `Find the area enclosed by the circle x² + y² = ${a * a}.`, a: `${a * a}π sq units`, ans: a * a * Math.PI, s: `4∫₀^${a} √(${a * a} − x²) dx` };
          return { q: `Find the area enclosed by the ellipse x²/${a * a} + y²/${b * b} = 1.`, a: `${a * b}π sq units`, ans: a * b * Math.PI, s: `4(${b}/${a})∫₀^${a} √(${a * a} − x²) dx = πab` };
        } },
      { title: 'Parabola and a line', levels: [2, 3], gen(R) {
          const a = R.int(1, 4), c = R.pick([1, 4, 9]) * a; // y² = 4ax and x = c : area = 2 * ∫0^c 2√(a x) dx = (8/3)√a c^{3/2}
          const A = 8 / 3 * Math.sqrt(a) * c ** 1.5;
          return { q: `Find the area of the region bounded by the parabola y² = ${4 * a}x and the line x = ${c}.`, a: `${num(A, 4)} sq units`, ans: A, tol: 0.01, s: `2∫₀^${c} 2√(${a}x) dx` };
        } },
      { title: 'x² = 4ay with horizontal strips', levels: [2, 3], gen(R) {
          const a = R.int(1, 3), c = R.pick([1, 4, 9]); const A = 8 / 3 * Math.sqrt(a) * c ** 1.5;
          return { q: `Find the area of the region bounded by the curve x² = ${4 * a}y and the line y = ${c}.`, a: `${num(A, 4)} sq units`, ans: A, tol: 0.01, s: `2∫₀^${c} 2√(${a}y) dy` };
        } },
      { title: 'Area under a curve between x = a and x = b', gen(R) {
          const items = [['y = x²', 0, 3, 9], ['y = x³', 0, 2, 4], ['y = eˣ', 0, 1, Math.E - 1], ['y = 1/x', 1, Math.E, 1], ['y = sin x', 0, Math.PI, 2], ['y = cos x', 0, Math.PI / 2, 1], ['y = √x', 0, 4, 16 / 3]];
          const [f, a, b, A] = R.pick(items); const lim = (v) => v === Math.E ? 'e' : v === Math.PI ? 'π' : v === Math.PI / 2 ? 'π/2' : String(v);
          return { q: `Find the area under ${f} between x = ${lim(a)} and x = ${lim(b)} (above the x-axis).`, a: `${num(A, 4)} sq units`, ans: A, tol: 0.01 };
        } }
    ],

    quiz: [
      { q: 'Area of the circle x² + y² = 16', o: ['16π', '4π', '8π', '64π'], a: 0, e: 'πa².' },
      { q: 'Area of x²/9 + y²/4 = 1', o: ['6π', '13π', '36π', '5π'], a: 0, e: 'πab = π·3·2.' },
      { q: 'Area under y = x from 0 to 2', o: ['2', '4', '1', '8'], a: 0, e: 'Triangle ½·2·2.' },
      { q: 'Area under y = sin x from 0 to π', o: ['2', '1', '0', 'π'], a: 0, e: '[−cos x].' },
      { q: 'Area between y² = 4x and x = 1', o: ['8/3', '4/3', '2', '16/3'], a: 0, e: '2∫₀¹ 2√x dx.' },
      { q: 'If f(x) < 0 on [a, b], area =', o: ['∫ f dx', '|∫ f dx|', '0', '−∫ f dx is not allowed'], a: 1, e: 'Area is positive.' },
      { q: 'Horizontal strips give area', o: ['∫ y dx', '∫ x dy', '∫ xy dx', '∫ dx'], a: 1, e: 'Strip width dy.' },
      { q: 'Area under y = x² from 0 to 3', o: ['9', '27', '3', '6'], a: 0, e: 'x³/3.' },
      { q: 'Quarter of the circle x² + y² = a² has area', o: ['πa²/4', 'πa²/2', 'πa', 'a²'], a: 0, e: 'One quadrant.' },
      { q: 'Area under y = eˣ from 0 to 1', o: ['e − 1', 'e', '1', 'e + 1'], a: 0, e: '[eˣ].' },
      { q: 'Area units are', o: ['units', 'sq units', 'cubic units', 'radians'], a: 1, e: 'Always state units.' }
    ],

    teach: {
      outcomes: ['Set up area as a definite integral with vertical or horizontal strips', 'Find areas of circles, ellipses and parabolic regions in standard form', 'Use symmetry and absolute values correctly'],
      periods: [
        { t: 'Area as a sum of strips', flow: [['10 min', 'Graph-paper square counting.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Lines and simple curves.']] },
        { t: 'Conic regions', flow: [['15 min', 'Explore panel 2: ellipse.'], ['15 min', 'Parabola with a line; circle.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Negative area.', 'Limits without sketch.', 'Symmetry factor.'],
      activities: ['Cut a paper ellipse; compare area with πab.', 'Sketch-first rule: every problem starts with a figure.'],
      exit: ['Area of x² + y² = 9.', 'Area under y = 3x from 0 to 2.', 'Area of y² = 4x and x = 4.'],
      homework: 'Find the area of the region bounded by the ellipse x²/16 + y²/9 = 1, and of the region bounded by x² = 4y, y = 2, y = 4 and the y-axis in the first quadrant.'
    },

    slides: [
      { t: 'Application of Integrals', b: ['Area as a sum of strips', 'Circles and ellipses', 'Parabolic regions'] },
      { t: 'Strips', b: ['Vertical: ∫ y dx', 'Horizontal: ∫ x dy', 'Below the axis: take |·|'] },
      { t: 'Standard areas', b: ['Circle πa²', 'Ellipse πab', 'y² = 4ax to x = a: 8a²/3'] },
      { t: 'Method', b: ['Sketch', 'Limits', 'Symmetry', 'Integrate, write sq units'] },
      { t: 'Check yourself', b: ['Area of x²/25 + y²/16 = 1?', 'Answer: 20π'] }
    ],

    fs: { groups: [
        ['Area', [['Vertical strips', '∫ₐᵇ y dx'], ['Horizontal strips', '∫꜀ᵈ x dy'], ['Below the axis', '|∫ f dx|'], ['Crossing the axis', 'split and add |·|']]],
        ['Standard regions', [['Circle x² + y² = a²', 'πa²'], ['Ellipse', 'πab'], ['y² = 4ax, 0 to x = c', '(8/3)√a c^(3/2)'], ['y² = 4ax to latus rectum', '8a²/3']]],
        ['Integrals used', [['∫√(a² − x²)', '(x/2)√(a² − x²) + (a²/2)sin⁻¹(x/a)'], ['∫√x', '(2/3)x^(3/2)'], ['∫₀ᵃ √(a² − x²)', 'πa²/4']]]],
      ex: [['x² + y² = 4', '4∫₀² √(4 − x²) dx = 4π'], ['y² = 9x, x = 2 to 4', '2∫₂⁴ 3√x dx = 4(8 − 2√2)']],
      rem: ['Draw the region first.', 'Use symmetry.', 'Write sq units.'] }
  });
})();
