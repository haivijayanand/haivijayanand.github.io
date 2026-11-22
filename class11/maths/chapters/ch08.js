/*
TOOL:    class11_maths_ch08
FAMILY:  CBSE_REVISION / Class 11 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 8 Sequences and Series - revise, exam focus, 2 explore panels (GP bars and sum, AM-GM), 7 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { F, Q, C, num } = G9;

  G9.register({
    no: 8, part: 'Unit II · Algebra (25 marks)', short: 'Sequences & series', title: 'Sequences and Series',
    blurb: 'Sequences, series, AP recap, geometric progressions, sums of GPs (finite and infinite), AM–GM.',
    revise: {
      oneLine: 'In a GP each term is the previous one times a fixed ratio r. Its nth term is arⁿ⁻¹ and its sum a(rⁿ − 1)/(r − 1); when |r| < 1 the infinite sum settles at a/(1 − r).',
      sections: [
        { h: 'Sequences and series', html: `<p>A sequence is a list a₁, a₂, a₃, … (a function on N). A series is the sum a₁ + a₂ + a₃ + … Σ notation: Σ<sub>k=1</sub><sup>n</sup> aₖ.</p><p>AP recap: aₙ = a + (n − 1)d, Sₙ = n/2 [2a + (n − 1)d].</p>` },
        { h: 'Geometric progression', html: `<div class="box m">aₙ = arⁿ⁻¹ &nbsp;·&nbsp; Sₙ = ${F('a(rⁿ − 1)', 'r − 1')} (r ≠ 1)</div>
          <p>For r = 1, Sₙ = na. Three numbers in GP: a/r, a, ar. Condition: b² = ac.</p>` },
        { h: 'Infinite GP', html: `<p>If |r| &lt; 1, rⁿ → 0, so S∞ = ${F('a', '1 − r')}. Example: 1 + 1/2 + 1/4 + … = 2. Recurring decimals: 0.3̄ = 3/10 + 3/100 + … = 1/3.</p>` },
        { h: 'Means', html: `<p>AM of a, b = (a + b)/2; GM = √(ab) (a, b &gt; 0). <b>AM ≥ GM</b>, equality when a = b. Inserting n GMs between a and b: r = (b/a)<sup>1/(n+1)</sup>.</p>` }
      ],
      formulas: [['AP nth term', 'a + (n − 1)d'], ['AP sum', 'n/2 [2a + (n − 1)d]'], ['GP nth term', 'arⁿ⁻¹'], ['GP sum', 'a(rⁿ − 1)/(r − 1)'], ['Infinite GP', 'a/(1 − r), |r| < 1'], ['AM ≥ GM', '(a + b)/2 ≥ √(ab)']],
      terms: [['Common ratio', 'r = aₙ₊₁/aₙ'], ['Series', 'sum of terms of a sequence'], ['Geometric mean', '√(ab)'], ['Convergent', 'infinite sum has a finite value']],
      traps: ['Using the AP formula for a GP.', 'S∞ only when |r| < 1.', 'nth term exponent is n − 1, not n.', 'GM needs positive numbers.'],
      board: '<p><b>Unit II (Algebra) — 25 marks.</b> Expect: nth term and sum of a GP (2–3 marks), sum to infinity and recurring decimals, inserting GMs, AM–GM relation, and word problems (bacteria growth, compound interest).</p>',
      bridge: '<p>APs came from Class 10 Ch 5. Compound interest and population growth are GPs.</p>'
    },

    explore: [
      {
        title: 'Partial sums of a GP', intro: 'Set a and r; press <kbd>P</kbd> to add terms. For |r| < 1 the sum approaches a/(1 − r).',
        build(el, K) {
          let a = 1, r = 0.5; const row = K.row(el); const rd = K.read(el);
          K.slider(row, 'a', 1, 5, 1, a, v => { a = v; an.reset(); }); K.slider(row, 'r', -1.5, 1.5, 0.1, r, v => { r = v; an.reset(); });
          const b = new K.Board(el, { xmin: 0, xmax: 16, ymin: -4, ymax: 6, equal: false });
          const an = new K.Anim(15, () => b.redraw(), { ms: 500 });
          b.onDraw = () => { b.base(); let s = 0; const N = an.i + 1;
            for (let k = 0; k < N; k++) { const t = a * r ** k; s += t; b.rect(k + 0.6, Math.min(0, t), 0.35, Math.abs(t), { fill: C.blueL, color: C.blue }); b.dot(k + 1, Math.max(-3.9, Math.min(5.9, s)), { color: C.orange, r: 4 }); }
            const lim = Math.abs(r) < 1 ? a / (1 - r) : null; if (lim !== null) b.line(0, lim, 16, lim, { color: C.purple, dash: [6, 4], w: 2 });
            rd.innerHTML = `terms (blue) and S<sub>n</sub> (orange) · n = ${N} · S<sub>${N}</sub> = ${num(s, 4)}` + (lim !== null ? ` · S∞ = a/(1 − r) = <b>${num(lim, 4)}</b> (purple)` : ' · |r| ≥ 1: no finite sum to infinity'); };
          K.anim(el, an); b.redraw(); return an;
        }
      },
      {
        title: 'AM ≥ GM picture', intro: 'Split a diameter into lengths a and b. The radius is the AM, the half-chord is the GM — never longer than the radius.',
        build(el, K) {
          let a = 6, bb = 2; const row = K.row(el); K.slider(row, 'a', 0.5, 9.5, 0.5, a, v => { a = v; bd.redraw(); }); K.slider(row, 'b', 0.5, 9.5, 0.5, bb, v => { bb = v; bd.redraw(); });
          const bd = new K.Board(el, { xmin: -1, xmax: 21, ymin: -1, ymax: 11, axes: false }); const rd = K.read(el);
          bd.onDraw = () => { bd.clear(); const R = (a + bb) / 2, cx = R; bd.arc(cx, 0, R, 0, Math.PI, { color: C.grey, w: 2 }); bd.line(0, 0, a + bb, 0, { color: C.ink, w: 2 });
            const g = Math.sqrt(a * bb); bd.line(a, 0, a, g, { color: C.orange, w: 4 }); bd.line(cx, 0, cx, R, { color: C.blue, w: 4, dash: [6, 4] });
            bd.text(a / 2, -0.6, 'a', { font: 'bold 14px' }); bd.text(a + bb / 2, -0.6, 'b', { font: 'bold 14px' }); bd.text(a + 0.5, g / 2, 'GM', { color: C.orange, font: 'bold 13px' }); bd.text(cx + 0.5, R * 0.75, 'AM', { color: C.blue, font: 'bold 13px' });
            rd.innerHTML = `AM = (${num(a)} + ${num(bb)})/2 = <b>${num(R, 3)}</b> · GM = √(${num(a)} × ${num(bb)}) = <b>${num(g, 3)}</b> · AM ${Math.abs(a - bb) < 1e-9 ? '=' : '>'} GM`; };
          bd.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'nth term of a GP', gen(R) {
          const a = R.nz(-5, 5), r = R.pick([2, 3, -2, -3, 2]), n = R.int(5, 10); const t = a * r ** (n - 1);
          return { q: `Find the ${n}th term of the GP ${a}, ${a * r}, ${a * r * r}, …`, a: t.toLocaleString('en-IN'), ans: t, s: `a = ${a}, r = ${r}: ar${['', '', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'][n - 1] || '^' + (n - 1)}` };
        } },
      { title: 'Sum of n terms', gen(R, L) {
          const a = R.int(1, 5), r = R.pick([2, 3, 4]), n = R.int(4, 8); const s = a * (r ** n - 1) / (r - 1);
          if (L === 3) return { q: `How many terms of the GP ${a}, ${a * r}, ${a * r * r}, … are needed to give the sum ${s}?`, a: `n = ${n}`, ans: n, s: `${a}(${r}ⁿ − 1)/${r - 1} = ${s} ⇒ ${r}ⁿ = ${r ** n}` };
          return { q: `Find the sum of the first ${n} terms of the GP ${a}, ${a * r}, ${a * r * r}, …`, a: String(s), ans: s, s: `${a}(${r}^${n} − 1)/(${r} − 1)` };
        } },
      { title: 'Sum to infinity', gen(R) {
          const a = R.int(1, 12), d = R.pick([2, 3, 4, 5]), sg = R.pick([1, -1]); const num_ = sg; // r = sg/d
          return { q: `Find the sum to infinity of the GP ${a}, ${Q(a * sg, d)}, ${Q(a, d * d)}, …`, a: Q(a * d, d - sg), s: `r = ${Q(sg, d)}; a/(1 − r)` };
        } },
      { title: 'Recurring decimal', levels: [2, 3], gen(R) {
          const two = R.chance(.5); const dd = two ? R.int(10, 98) : R.int(1, 8); const den = two ? 99 : 9;
          return { q: `Write 0.${two ? `${dd}${dd}${dd}` : `${dd}${dd}${dd}`}… as a fraction using an infinite GP.`, a: Q(dd, den), s: `${dd}/${two ? 100 : 10} ÷ (1 − 1/${two ? 100 : 10})` };
        } },
      { title: 'Insert geometric means', levels: [2, 3], gen(R) {
          const a = R.int(1, 4), r = R.pick([2, 3]), k = R.int(2, 4); const b = a * r ** (k + 1);
          return { q: `Insert ${k} geometric means between ${a} and ${b}.`, a: Array.from({ length: k }, (_, i) => a * r ** (i + 1)).join(', '), s: `${b} = ${a} r^${k + 1} ⇒ r = ${r}` };
        } },
      { title: 'AM and GM', levels: [1, 2], gen(R) {
          const m = R.int(1, 6), n = R.int(1, 6); const a = m * m * R.pick([1, 4]), b = n * n * (a % 4 === 0 ? 4 : 1);
          return { q: `Find the AM and GM of ${a} and ${b}, and verify AM ≥ GM.`, a: `AM = ${num((a + b) / 2)}, GM = ${num(Math.sqrt(a * b))}`, s: '(a + b)/2 and √(ab)' };
        } },
      { title: 'Word problem', gen(R) {
          const t = R.int(0, 1);
          if (t === 0) { const b0 = R.pick([30, 50, 100]), h = R.int(3, 6); return { q: `A culture has ${b0} bacteria and doubles every hour. How many bacteria after ${h} hours?`, a: String(b0 * 2 ** h), ans: b0 * 2 ** h, s: `${b0} × 2^${h}` }; }
          const P = R.pick([500, 1000, 2000]), i = R.pick([5, 10]), n = R.int(2, 4); const A = P * (1 + i / 100) ** n;
          return { q: `₹${P} is deposited at ${i}% per annum compounded annually. Find the amount after ${n} years.`, a: `₹${num(A, 2)}`, ans: A, tol: 0.05, s: `${P}(1 + ${i / 100})^${n}` };
        } }
    ],

    quiz: [
      { q: 'Common ratio of 3, −6, 12, …', o: ['2', '−2', '−3', '3'], a: 1, e: '−6/3.' },
      { q: '6th term of 2, 4, 8, …', o: ['64', '32', '128', '12'], a: 0, e: '2 × 2⁵.' },
      { q: 'Sum to infinity of 1 + 1/3 + 1/9 + …', o: ['3/2', '3', '4/3', '∞'], a: 0, e: '1/(1 − 1/3).' },
      { q: 'GM of 4 and 9', o: ['6', '6.5', '36', '13'], a: 0, e: '√36.' },
      { q: 'If a, b, c are in GP then', o: ['2b = a + c', 'b² = ac', 'b = ac', 'a² = bc'], a: 1, e: 'Ratio equal.' },
      { q: 'Sum of first 5 terms of 1, 2, 4, …', o: ['31', '32', '15', '63'], a: 0, e: '2⁵ − 1.' },
      { q: 'S∞ exists only if', o: ['r > 1', '|r| < 1', 'r = 1', 'r < 0'], a: 1, e: 'Then rⁿ → 0.' },
      { q: '0.777… =', o: ['7/9', '7/10', '77/100', '7/99'], a: 0, e: '0.7/(1 − 0.1).' },
      { q: 'For positive a ≠ b', o: ['AM < GM', 'AM = GM', 'AM > GM', 'cannot say'], a: 2, e: 'AM ≥ GM, equality only if a = b.' },
      { q: 'nth term of a GP', o: ['arⁿ', 'arⁿ⁻¹', 'a + (n − 1)r', 'a rⁿ⁺¹'], a: 1, e: 'Exponent n − 1.' },
      { q: 'If 2, x, 18 are in GP, x =', o: ['±6', '10', '9', '36'], a: 0, e: 'x² = 36.' }
    ],

    teach: {
      outcomes: ['Identify and write GPs; find nth terms', 'Find sums of finite and infinite GPs', 'Insert geometric means; use AM ≥ GM', 'Solve growth and interest problems'],
      periods: [
        { t: 'GPs', flow: [['10 min', 'Paper folding: thickness doubles.'], ['15 min', 'nth term; three terms a/r, a, ar.'], ['15 min', 'Practice.']] },
        { t: 'Sums', flow: [['15 min', 'Derive Sₙ by S − rS.'], ['15 min', 'Explore panel 1: infinite sums.'], ['10 min', 'Recurring decimals.']] },
        { t: 'Means and applications', flow: [['15 min', 'Explore panel 2: AM ≥ GM.'], ['15 min', 'Growth and interest problems.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['AP formula used for GP.', 'S∞ for |r| ≥ 1.', 'Exponent n instead of n − 1.'],
      activities: ['Paper square halving: shaded area → 1.', 'Chessboard rice grains: 2⁶⁴ − 1.'],
      exit: ['5th term of 81, 27, 9, …', 'S∞ of 8, 4, 2, …', 'GM of 2 and 32.'],
      homework: 'The sum of three numbers in GP is 56. If 1, 7, 21 are subtracted from them respectively, the numbers form an AP. Find the numbers.'
    },

    slides: [
      { t: 'Sequences and Series', b: ['Sequences and series', 'Geometric progressions', 'Infinite GP', 'AM and GM'] },
      { t: 'GP', b: ['aₙ = arⁿ⁻¹', 'Sₙ = a(rⁿ − 1)/(r − 1)', 'b² = ac'] },
      { t: 'Infinite GP', b: ['|r| < 1 ⇒ S∞ = a/(1 − r)', '0.3̄ = 1/3'] },
      { t: 'Means', b: ['AM = (a + b)/2', 'GM = √(ab)', 'AM ≥ GM'] },
      { t: 'Check yourself', b: ['Sum of 3 + 6 + 12 + … (6 terms)?', 'Answer: 189'] }
    ],

    fs: { groups: [
        ['AP (recap)', [['aₙ', 'a + (n − 1)d'], ['Sₙ', 'n/2 [2a + (n − 1)d] = n/2 (a + l)']]],
        ['GP', [['aₙ', 'arⁿ⁻¹'], ['Sₙ (r ≠ 1)', 'a(rⁿ − 1)/(r − 1)'], ['Sₙ (r = 1)', 'na'], ['Three terms', 'a/r, a, ar'], ['Condition', 'b² = ac']]],
        ['Infinite GP', [['S∞', 'a/(1 − r), |r| < 1'], ['0.ab ab…', 'ab/99']]],
        ['Means', [['AM', '(a + b)/2'], ['GM', '√(ab)'], ['AM ≥ GM', 'equality iff a = b'], ['n GMs between a, b', 'r = (b/a)^(1/(n+1))']]]],
      ex: [['S₆ of 1, 3, 9, …', '(3⁶ − 1)/2 = 364'], ['S∞ of 6, 2, 2/3, …', '6/(1 − 1/3) = 9']],
      rem: ['Check |r| < 1 before S∞.', 'GP: multiply; AP: add.', 'Exponent is n − 1.'] }
  });
})();
