/*
TOOL:    class12_maths_ch07
FAMILY:  CBSE_REVISION / Class 12 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 7 Integrals - revise, board focus, 2 explore panels (family of antiderivatives, Riemann sums to the definite integral), 8 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num, Q } = G9;
  const sup = (k) => String(k).split('').map(d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+d]).join('');

  G9.register({
    no: 7, part: 'Unit III · Calculus (35 marks)', short: 'Integrals', title: 'Integrals',
    blurb: 'Integration as anti-differentiation, standard integrals, substitution, partial fractions, integration by parts, definite integrals and their properties.',
    revise: {
      oneLine: 'Integration reverses differentiation: ∫f(x)dx = F(x) + C where F′ = f. Substitution, partial fractions and integration by parts reduce hard integrals to standard ones, and ∫ₐᵇ f(x)dx = F(b) − F(a) measures net area.',
      sections: [
        { h: 'Standard integrals', html: `<p>∫xⁿdx = xⁿ⁺¹/(n + 1) + C (n ≠ −1); ∫dx/x = log|x| + C; ∫eˣ = eˣ; ∫aˣ = aˣ/log a; ∫sin x = −cos x; ∫cos x = sin x; ∫sec²x = tan x; ∫cosec²x = −cot x; ∫sec x tan x = sec x; ∫tan x = log|sec x|; ∫sec x = log|sec x + tan x|.</p>` },
        { h: 'Special integrals', html: `<table class="t"><tr><td>∫dx/(x² + a²)</td><td>(1/a) tan⁻¹(x/a)</td></tr><tr><td>∫dx/(x² − a²)</td><td>(1/2a) log|(x − a)/(x + a)|</td></tr><tr><td>∫dx/(a² − x²)</td><td>(1/2a) log|(a + x)/(a − x)|</td></tr>
          <tr><td>∫dx/√(a² − x²)</td><td>sin⁻¹(x/a)</td></tr><tr><td>∫dx/√(x² ± a²)</td><td>log|x + √(x² ± a²)|</td></tr><tr><td>∫√(a² − x²)dx</td><td>(x/2)√(a² − x²) + (a²/2) sin⁻¹(x/a)</td></tr></table>
          <p>For ax² + bx + c in a denominator, complete the square first.</p>` },
        { h: 'Methods', html: `<ul><li><b>Substitution</b>: put t = g(x) when g′(x) appears: ∫f(g(x))g′(x)dx = ∫f(t)dt. ∫f′(x)/f(x)dx = log|f(x)|.</li>
          <li><b>Trig identities</b>: sin²x = (1 − cos 2x)/2, products to sums.</li><li><b>Partial fractions</b> for proper rational functions: A/(x − a) + B/(x − b), A/(x − a) + B/(x − a)², (Ax + B)/(x² + bx + c).</li>
          <li><b>By parts</b>: ∫u v dx = u∫v dx − ∫(u′∫v dx)dx; choose u by ILATE. ∫eˣ(f + f′)dx = eˣf(x) + C.</li></ul>` },
        { h: 'Definite integrals', html: `<p>∫ₐᵇ f(x)dx = F(b) − F(a) (second fundamental theorem). Properties: ∫ₐᵇ f = −∫ᵦₐ f; ∫ₐᵇ f(x)dx = ∫ₐᵇ f(a + b − x)dx; ∫₀ᵃ f(x)dx = ∫₀ᵃ f(a − x)dx; ∫₋ₐᵃ f = 2∫₀ᵃ f if f even, 0 if f odd; split at points where a modulus changes sign.</p>` }
      ],
      formulas: [['Power', '∫xⁿdx = xⁿ⁺¹/(n + 1) + C'], ['1/x', 'log|x| + C'], ['1/(x² + a²)', '(1/a) tan⁻¹(x/a)'], ['1/√(a² − x²)', 'sin⁻¹(x/a)'], ['By parts', '∫uv = u∫v − ∫(u′∫v)'], ['King property', '∫₀ᵃ f(x)dx = ∫₀ᵃ f(a − x)dx']],
      terms: [['Antiderivative', 'F with F′ = f'], ['Constant of integration', 'C — a family of curves'], ['Integrand', 'f(x) in ∫f(x)dx'], ['ILATE', 'Inverse, Log, Algebraic, Trig, Exponential — order for choosing u']],
      traps: ['Forgetting + C in indefinite integrals.', 'Not changing the limits after substitution.', '∫dx/x = log|x|, not x⁰/0.', 'Odd-function shortcut needs symmetric limits −a to a.'],
      board: '<p><b>Unit III (Calculus) — 35 marks.</b> Integrals carry the most: standard/substitution integrals (2 marks), partial fractions and by parts (3 marks), and definite integrals using properties such as ∫₀^(π/2) of sin/(sin + cos) or log sin x (3–5 marks).</p>',
      bridge: '<p>Reverses Ch 5. Ch 8 uses definite integrals for areas; Ch 9 integrates to solve differential equations.</p>'
    },

    explore: [
      {
        title: 'A family of antiderivatives', intro: 'All curves y = F(x) + C have the same slope at each x, given by f(x). Drag the point to choose the curve through it (fixing C).',
        build(el, K) {
          const fs = [['f(x) = 2x', x => x * x, 'x²'], ['f(x) = cos x', Math.sin, 'sin x'], ['f(x) = 1/x (x > 0)', x => x > 0 ? Math.log(x) : NaN, 'log x'], ['f(x) = x² − 1', x => x ** 3 / 3 - x, 'x³/3 − x']];
          let k = 0; const row = K.row(el); K.select(row, 'f', fs.map(f => f[0]), i => { k = i; b.redraw(); });
          const b = new K.Board(el, { xmin: -4, xmax: 4, ymin: -4, ymax: 6 }); const rd = K.read(el); const P = b.addPt(1, 2, { label: 'P', snap: 0.25, color: C.orange });
          b.onDraw = () => { b.base(); const [, F, Fs] = fs[k]; for (let c = -6; c <= 6; c++) b.fn(x => F(x) + c, { color: C.grey, w: 1 });
            const C0 = P.y - F(P.x); if (isFinite(C0)) b.fn(x => F(x) + C0, { color: C.blue, w: 4 });
            for (let x = -3.5; x <= 3.6; x += 1) { const y0 = F(x) + C0, h = 0.001, m = (F(x + h) - F(x)) / h; if (isFinite(m) && isFinite(y0)) b.line(x - 0.3, y0 - 0.3 * m, x + 0.3, y0 + 0.3 * m, { color: C.purple, w: 2 }); }
            b.drawPts(); rd.innerHTML = `∫${fs[k][0].slice(5).replace(' (x > 0)', '')} dx = ${Fs} + C · through P(${num(P.x)}, ${num(P.y)}): C = ${isFinite(C0) ? num(C0, 3) : 'not defined'} (blue) · purple ticks: the common slope f(x)`; };
          b.redraw(); return null;
        }
      },
      {
        title: 'Riemann sums → definite integral', intro: 'Press <kbd>P</kbd> to double the number of strips. The sum of strip areas approaches ∫ₐᵇ f(x) dx = F(b) − F(a).',
        build(el, K) {
          const fs = [['x²', x => x * x, x => x ** 3 / 3], ['sin x', Math.sin, x => -Math.cos(x)], ['eˣ/3', x => Math.exp(x) / 3, x => Math.exp(x) / 3], ['4 − x²', x => 4 - x * x, x => 4 * x - x ** 3 / 3]];
          let k = 0, a = 0, bb = 2; const row = K.row(el); K.select(row, 'f(x)', fs.map(f => f[0]), i => { k = i; bd.redraw(); });
          K.slider(row, 'a', -2, 3, 0.5, a, v => { a = Math.min(v, bb - 0.5); bd.redraw(); }); K.slider(row, 'b', -1, 3.5, 0.5, bb, v => { bb = Math.max(v, a + 0.5); bd.redraw(); });
          const bd = new K.Board(el, { xmin: -2.5, xmax: 4, ymin: -1.5, ymax: 6, equal: false }); const rd = K.read(el);
          const an = new K.Anim(6, () => bd.redraw(), { ms: 1000 });
          bd.onDraw = () => { bd.base(); const [, f, F] = fs[k]; const n = 2 ** (an.i + 1), w = (bb - a) / n; let S = 0;
            for (let i = 0; i < n; i++) { const x = a + i * w, y = f(x + w / 2); S += y * w; bd.rect(x, Math.min(0, y), w, Math.abs(y), { fill: y >= 0 ? C.blueL : 'rgba(234,88,12,.25)', color: y >= 0 ? C.blue : C.orange, w: n > 32 ? 0.5 : 1 }); }
            bd.fn(f, { color: C.ink, w: 3 }); const I = F(bb) - F(a);
            rd.innerHTML = `n = ${n} strips (midpoints) · sum = ${num(S, 5)} · ∫<sub>${num(a)}</sub><sup>${num(bb)}</sup> ${fs[k][0]} dx = F(${num(bb)}) − F(${num(a)}) = <b>${num(I, 5)}</b> · error ${num(Math.abs(S - I), 5)}`; };
          K.anim(el, an); bd.redraw(); return an;
        }
      }
    ],

    gens: [
      { title: 'Standard integrals', levels: [1, 2], gen(R) {
          const n = R.int(2, 6), a = R.int(2, 6), items = [[`x${sup(n)}`, `x${sup(n + 1)}/${n + 1}`], [`${a}eˣ + 1/x`, `${a}eˣ + log|x|`], [`sin x + cos x`, 'sin x − cos x'], [`sec²x − cosec²x`, 'tan x + cot x'], [`√x`, '(2/3)x^(3/2)'], [`1/x${sup(n)}`, `−1/(${n - 1}x${n - 1 > 1 ? sup(n - 1) : ''})`], [`${a}ˣ`, `${a}ˣ/log ${a}`], [`(x + 1)²`, '(x + 1)³/3'], ['tan²x', 'tan x − x']];
          const [f, F] = R.pick(items); return { q: `Find ∫ ${f} dx.`, a: `${F} + C` };
        } },
      { title: 'Substitution', gen(R) {
          const a = R.int(2, 6), items = [[`2x sin(x²)`, '−cos(x²)'], [`x/(x² + ${a})`, `½ log(x² + ${a})`], [`e^(tan x) sec²x`, 'e^(tan x)'], [`(log x)²/x`, '(log x)³/3'], [`sin x cos x`, '½ sin²x'], [`cot x`, 'log|sin x|'], [`x√(x² + ${a})`, `(1/3)(x² + ${a})^(3/2)`], [`sin(${a}x + 1)`, `−(1/${a}) cos(${a}x + 1)`], [`e^(${a}x)`, `e^(${a}x)/${a}`]];
          const [f, F] = R.pick(items); return { q: `Integrate ${f} with respect to x.`, a: `${F} + C`, s: 'look for g(x) and g′(x) together' };
        } },
      { title: 'Special integrals', levels: [2, 3], gen(R) {
          const a = R.int(2, 7), t = R.int(0, 4);
          const items = [[`1/(x² + ${a * a})`, `(1/${a}) tan⁻¹(x/${a})`], [`1/√(${a * a} − x²)`, `sin⁻¹(x/${a})`], [`1/(x² − ${a * a})`, `(1/${2 * a}) log|(x − ${a})/(x + ${a})|`], [`1/√(x² + ${a * a})`, `log|x + √(x² + ${a * a})|`], [`1/(x² + 2x + ${a * a + 1})`, `(1/${a}) tan⁻¹((x + 1)/${a})`]];
          const [f, F] = items[t]; return { q: `Evaluate ∫ ${f} dx.`, a: `${F} + C`, s: t === 4 ? `x² + 2x + ${a * a + 1} = (x + 1)² + ${a * a}` : 'standard form' };
        } },
      { title: 'Partial fractions', levels: [2, 3], gen(R) {
          let p, q; do { p = R.int(-4, 4); q = R.int(-4, 4); } while (p === q);
          const A = 1 / (p - q), den = p - q; // 1/((x−p)(x−q)) = (1/(p−q))[1/(x−p) − 1/(x−q)]
          const xp = (r) => r === 0 ? 'x' : `x ${r > 0 ? '−' : '+'} ${Math.abs(r)}`;
          return { q: `Evaluate ∫ dx/((${xp(p)})(${xp(q)})).`, a: `${Q(1, den)} log|(${xp(p)})/(${xp(q)})| + C`, s: `1/((${xp(p)})(${xp(q)})) = ${Q(1, den)}[1/(${xp(p)}) − 1/(${xp(q)})]` };
        } },
      { title: 'Integration by parts', levels: [2, 3], gen(R) {
          const a = R.int(2, 5), items = [['x eˣ', 'eˣ(x − 1)'], ['x sin x', 'sin x − x cos x'], ['x cos x', 'cos x + x sin x'], ['log x', 'x log x − x'], ['x log x', '(x²/2) log x − x²/4'], ['tan⁻¹x', 'x tan⁻¹x − ½ log(1 + x²)'], ['eˣ(sin x + cos x)', 'eˣ sin x'], [`x e^(${a}x)`, `e^(${a}x)(x/${a} − 1/${a * a})`], ['x² eˣ', 'eˣ(x² − 2x + 2)']];
          const [f, F] = R.pick(items); return { q: `Integrate ${f} dx.`, a: `${F} + C`, s: 'ILATE; ∫eˣ(f + f′) = eˣf' };
        } },
      { title: 'Definite integral', gen(R, L) {
          const n = R.int(1, 3), a = R.int(0, 2), b = a + R.int(1, 3);
          if (L === 1 || R.chance(.5)) { const v = (b ** (n + 1) - a ** (n + 1)) / (n + 1); return { q: `Evaluate ∫<sub>${a}</sub><sup>${b}</sup> x${n > 1 ? sup(n) : ''} dx.`, a: Q(b ** (n + 1) - a ** (n + 1), n + 1), ans: v, s: `[x${sup(n + 1)}/${n + 1}] from ${a} to ${b}` }; }
          const items = [['∫₀^(π/2) sin x dx', '1', 1], ['∫₀^π cos x dx', '0', 0], ['∫₀¹ eˣ dx', 'e − 1', Math.E - 1], ['∫₁^e (1/x) dx', '1', 1], ['∫₀¹ dx/(1 + x²)', 'π/4', Math.PI / 4], ['∫₀^(π/4) sec²x dx', '1', 1], ['∫₀^(1/2) dx/√(1 − x²)', 'π/6', Math.PI / 6]];
          const [q, a2, v] = R.pick(items); return { q: `Evaluate ${q}.`, a: a2, ans: v, tol: 0.002 };
        } },
      { title: 'Properties of definite integrals', levels: [3], gen(R) {
          const n = R.int(2, 9), items = [['∫₀^(π/2) sin x/(sin x + cos x) dx', 'π/4'], [`∫₀^(π/2) sin${sup(n)}x/(sin${sup(n)}x + cos${sup(n)}x) dx`, 'π/4'], ['∫₋₁¹ x³ dx', '0 (odd function)'], ['∫₋π/2^(π/2) sin⁷x dx', '0 (odd function)'], ['∫₋₂² |x| dx', '4'], ['∫₀^(π/2) log sin x dx', '−(π/2) log 2'], ['∫₀^π x sin x dx', 'π'], ['∫₁⁴ |x − 2| dx', '5/2']];
          const [q, a] = R.pick(items); return { q: `Using properties, evaluate ${q}.`, a, s: '∫₀ᵃ f(x) = ∫₀ᵃ f(a − x); odd/even; split at sign changes' };
        } },
      { title: 'Trig powers', levels: [2, 3], gen(R) {
          const items = [['sin²x', 'x/2 − sin 2x/4'], ['cos²x', 'x/2 + sin 2x/4'], ['sin³x', '−cos x + cos³x/3'], ['sin 2x cos 3x', '(1/2)(cos x − cos 5x/5)'], ['sin x sin 3x', '(1/2)(sin 2x/2 − sin 4x/4)'], ['cos³x', 'sin x − sin³x/3']];
          const [f, F] = R.pick(items); return { q: `Find ∫ ${f} dx.`, a: `${F} + C`, s: 'reduce powers / products to sums' };
        } }
    ],

    quiz: [
      { q: '∫x⁴ dx =', o: ['x⁵/5 + C', '4x³ + C', 'x⁵ + C', 'x³/3 + C'], a: 0, e: 'Power rule.' },
      { q: '∫dx/x =', o: ['log|x| + C', '1/x² + C', 'x + C', '−1/x² + C'], a: 0, e: 'Standard.' },
      { q: '∫dx/(1 + x²) =', o: ['tan⁻¹x + C', 'sin⁻¹x + C', 'log(1 + x²) + C', 'x + x³/3 + C'], a: 0, e: 'Standard.' },
      { q: '∫eˣ(sin x + cos x)dx =', o: ['eˣ sin x + C', 'eˣ cos x + C', 'eˣ + C', '−eˣ sin x + C'], a: 0, e: 'eˣ(f + f′).' },
      { q: '∫₀¹ x dx =', o: ['1/2', '1', '0', '2'], a: 0, e: 'x²/2.' },
      { q: '∫₋₁¹ x⁵ dx =', o: ['0', '2', '1/3', '−1'], a: 0, e: 'Odd function.' },
      { q: '∫tan x dx =', o: ['log|sec x| + C', 'sec²x + C', 'log|cos x| + C', 'tan²x/2 + C'], a: 0, e: '−log|cos x|.' },
      { q: '∫₀^(π/2) sin x/(sin x + cos x) dx =', o: ['π/4', 'π/2', '0', '1'], a: 0, e: 'King property.' },
      { q: 'In by parts, ILATE helps choose', o: ['the first function u', 'the limits', 'the constant', 'the substitution'], a: 0, e: 'Order of preference.' },
      { q: '∫dx/√(1 − x²) =', o: ['sin⁻¹x + C', 'cos x + C', 'tan⁻¹x + C', 'log x + C'], a: 0, e: 'Standard.' },
      { q: '∫2x/(x² + 1) dx =', o: ['log(x² + 1) + C', 'tan⁻¹x + C', 'x² + C', '1/(x² + 1) + C'], a: 0, e: 'f′/f.' }
    ],

    teach: {
      outcomes: ['Use standard and special integrals', 'Integrate by substitution, partial fractions and by parts', 'Evaluate definite integrals with the fundamental theorem', 'Use properties of definite integrals'],
      periods: [
        { t: 'Anti-derivatives', flow: [['10 min', 'Reverse of differentiation; explore panel 1.'], ['15 min', 'Standard table.'], ['15 min', 'Practice.']] },
        { t: 'Substitution and special forms', flow: [['20 min', 'Substitution, f′/f.'], ['20 min', 'Special integrals, completing the square.']] },
        { t: 'Partial fractions and parts', flow: [['20 min', 'Partial fractions.'], ['20 min', 'By parts; eˣ(f + f′).']] },
        { t: 'Definite integrals', flow: [['15 min', 'Explore panel 2: Riemann sums.'], ['15 min', 'Properties.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Missing + C.', 'Limits unchanged after substitution.', 'Odd/even shortcut misuse.'],
      activities: ['Strip-area estimate on graph paper vs exact integral.', 'Integration "speed cards" with the standard table.'],
      exit: ['∫(3x² + 2)dx.', '∫x eˣ dx.', '∫₀² x² dx.'],
      homework: 'Evaluate ∫₀^π x/(1 + sin x) dx and ∫ (x + 2)/√(x² + 2x + 3) dx.'
    },

    slides: [
      { t: 'Integrals', b: ['Anti-derivatives', 'Methods', 'Definite integrals', 'Properties'] },
      { t: 'Standard integrals', b: ['∫xⁿ = xⁿ⁺¹/(n + 1)', '∫1/x = log|x|', '∫1/(x² + a²) = (1/a)tan⁻¹(x/a)'] },
      { t: 'Methods', b: ['Substitution', 'Partial fractions', 'By parts: ILATE', '∫eˣ(f + f′) = eˣf'] },
      { t: 'Definite integrals', b: ['F(b) − F(a)', '∫₀ᵃ f(x) = ∫₀ᵃ f(a − x)', 'Odd on [−a, a]: 0'] },
      { t: 'Check yourself', b: ['∫cos 3x dx?', '∫₀¹ eˣ dx?', 'Answers: sin 3x/3 + C · e − 1'] }
    ],

    fs: { groups: [
        ['Standard', [['∫xⁿ', 'xⁿ⁺¹/(n + 1)'], ['∫1/x', 'log|x|'], ['∫eˣ, ∫aˣ', 'eˣ, aˣ/log a'], ['∫sin, ∫cos', '−cos x, sin x'], ['∫tan, ∫cot', 'log|sec x|, log|sin x|'], ['∫sec, ∫cosec', 'log|sec x + tan x|, log|cosec x − cot x|']]],
        ['Special', [['1/(x² + a²)', '(1/a) tan⁻¹(x/a)'], ['1/(x² − a²)', '(1/2a) log|(x − a)/(x + a)|'], ['1/(a² − x²)', '(1/2a) log|(a + x)/(a − x)|'], ['1/√(a² − x²)', 'sin⁻¹(x/a)'], ['1/√(x² ± a²)', 'log|x + √(x² ± a²)|'], ['√(a² − x²)', '(x/2)√(a² − x²) + (a²/2)sin⁻¹(x/a)']]],
        ['Methods', [['f′/f', 'log|f|'], ['By parts', 'u∫v − ∫(u′∫v)'], ['eˣ(f + f′)', 'eˣ f'], ['Partial fractions', 'A/(x − a) + B/(x − b)']]],
        ['Definite', [['FTC', 'F(b) − F(a)'], ['King', '∫ₐᵇ f(x) = ∫ₐᵇ f(a + b − x)'], ['Even / odd', '2∫₀ᵃ f / 0'], ['Split', '∫ₐᵇ = ∫ₐᶜ + ∫ᶜᵇ']]]],
      ex: [['∫x sin x dx', 'sin x − x cos x + C'], ['∫₀^(π/2) √sin x/(√sin x + √cos x)', 'π/4']],
      rem: ['Add C.', 'Change limits with substitution.', 'Use the King property for symmetric forms.'] }
  });
})();
