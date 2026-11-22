/*
TOOL:    class11_maths_ch07
FAMILY:  CBSE_REVISION / Class 11 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 7 Binomial Theorem - revise, exam focus, 2 explore panels (Pascal triangle, expansion builder), 6 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num } = G9;
  const fact = (n) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; };
  const nCr = (n, r) => Math.round(fact(n) / (fact(r) * fact(n - r)));
  const sup = (k) => String(k).split('').map(d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+d]).join('');
  const pw = (v, k) => k === 0 ? '' : k === 1 ? v : v + sup(k);
  const big = (v) => Math.abs(v) >= 1e6 ? v.toLocaleString('en-IN') : String(v);
  // expansion of (a·x + b·y)^n with integers a, b
  const expand = (a, b, n, X = 'x', Y = 'y') => { const out = []; for (let r = 0; r <= n; r++) { const c = nCr(n, r) * a ** (n - r) * b ** r; if (!c) continue; const body = pw(X, n - r) + pw(Y, r); const s = c < 0 ? '−' : '+'; const m = Math.abs(c); out.push([s, (m === 1 && body ? '' : big(m)) + body]); }
    return out.map((t, i) => i === 0 ? (t[0] === '−' ? '−' : '') + t[1] : ` ${t[0]} ${t[1]}`).join(''); };

  G9.register({
    no: 7, part: 'Unit II · Algebra (25 marks)', short: 'Binomial theorem', title: 'Binomial Theorem',
    blurb: 'Pascal\'s triangle, expansion of (a + b)ⁿ for positive integer n, general and middle terms.',
    revise: {
      oneLine: 'The coefficients of (a + b)ⁿ are the numbers ⁿC₀, ⁿC₁, …, ⁿCₙ — row n of Pascal\'s triangle. The (r + 1)th term is ⁿCᵣ aⁿ⁻ʳ bʳ.',
      sections: [
        { h: 'The theorem', html: `<div class="box m">(a + b)ⁿ = ⁿC₀aⁿ + ⁿC₁aⁿ⁻¹b + ⁿC₂aⁿ⁻²b² + … + ⁿCₙbⁿ</div>
          <ul><li>n + 1 terms. Powers of a fall from n to 0, powers of b rise from 0 to n; each term has total degree n.</li><li>Coefficients are symmetric: ⁿCᵣ = ⁿCₙ₋ᵣ. Sum of coefficients = 2ⁿ (put a = b = 1).</li>
          <li>(a − b)ⁿ: signs alternate. (1 + x)ⁿ = 1 + nx + ⁿC₂x² + … + xⁿ.</li></ul>` },
        { h: 'Pascal\'s triangle', html: `<p>Each entry is the sum of the two above it, because ⁿCᵣ₋₁ + ⁿCᵣ = ⁿ⁺¹Cᵣ. Row 4: 1 4 6 4 1 → (a + b)⁴ = a⁴ + 4a³b + 6a²b² + 4ab³ + b⁴.</p>` },
        { h: 'General and middle terms', html: `<div class="box m">T<sub>r+1</sub> = ⁿCᵣ aⁿ⁻ʳ bʳ</div>
          <p>Middle term: n even → one middle term T<sub>n/2 + 1</sub>; n odd → two middle terms T<sub>(n+1)/2</sub> and T<sub>(n+3)/2</sub>.</p>
          <p>Term independent of x in (x² + 1/x)ⁿ etc.: write the power of x in T<sub>r+1</sub> and set it to 0.</p>` },
        { h: 'Applications', html: `<p>(98)⁵ = (100 − 2)⁵; compare 1.01¹⁰⁰⁰⁰⁰⁰ and 10000 by expanding; show 6ⁿ − 5n leaves remainder 1 on division by 25 by writing 6ⁿ = (1 + 5)ⁿ.</p>` }
      ],
      formulas: [['Expansion', '(a + b)ⁿ = Σ ⁿCᵣ aⁿ⁻ʳ bʳ'], ['General term', 'T₍ᵣ₊₁₎ = ⁿCᵣ aⁿ⁻ʳ bʳ'], ['Number of terms', 'n + 1'], ['Sum of coefficients', '2ⁿ'], ['Middle (n even)', 'T₍ₙ/₂₊₁₎']],
      terms: [['Binomial', 'expression with two terms'], ['Binomial coefficient', 'ⁿCᵣ'], ['Pascal\'s triangle', 'triangle of binomial coefficients'], ['Middle term', 'term(s) at the centre of the expansion']],
      traps: ['The (r + 1)th term uses ⁿCᵣ, not ⁿCᵣ₊₁.', 'Forgetting to raise the coefficient of x: (2x)³ = 8x³.', 'Sign of b: in (x − 2)ⁿ, b = −2.', 'n odd has two middle terms.'],
      board: '<p><b>Unit II (Algebra) — 25 marks.</b> Expect: expansion of a binomial (2–3 marks), a specific term/coefficient, middle term or term independent of x (3–4 marks), and an application such as evaluating (99)⁴ or comparing large numbers.</p>',
      bridge: '<p>Uses ⁿCᵣ from Ch 6. Class 12 Probability (binomial distribution) uses these terms.</p>'
    },

    explore: [
      {
        title: 'Pascal\'s triangle', intro: 'Press <kbd>S</kbd> to add a row. Each number is the sum of the two above; row n gives the coefficients of (a + b)ⁿ.',
        build(el, K) {
          const rd = K.read(el); const bx = document.createElement('div'); bx.style.cssText = 'font-family:Consolas,monospace;text-align:center;line-height:1.9;font-size:15px;overflow-x:auto'; el.appendChild(bx);
          const an = new K.Anim(11, () => draw(), { ms: 700 }); let hi = -1;
          function draw() { const n = an.i; let h = '';
            for (let r = 0; r <= n; r++) { h += `<div><span style="color:var(--muted);display:inline-block;width:3.5em;text-align:right;margin-right:1em">n = ${r}</span>` + Array.from({ length: r + 1 }, (_, k) => `<span style="display:inline-block;min-width:2.8em;padding:1px 4px;border-radius:5px;${r === n ? 'background:var(--orangeL);font-weight:bold' : ''}">${nCr(r, k)}</span>`).join('') + '</div>'; }
            bx.innerHTML = h; rd.innerHTML = `(a + b)${sup(n)} = ${expand(1, 1, n, 'a', 'b')} · sum of coefficients = 2${sup(n)} = ${2 ** n}`; }
          K.anim(el, an); draw(); return an;
        }
      },
      {
        title: 'Expansion and general term', intro: 'Set (p·x + q)ⁿ and r. The expansion, the term T<sub>r+1</sub> and the middle term(s) update.',
        build(el, K) {
          let p = 2, q = -3, n = 5, r = 2; const row = K.row(el); const rd = K.read(el);
          K.slider(row, 'p', -3, 3, 1, p, v => { p = v || 1; draw(); }); K.slider(row, 'q', -4, 4, 1, q, v => { q = v || 1; draw(); }); K.slider(row, 'n', 1, 9, 1, n, v => { n = v; if (r > n) r = n; draw(); }); K.slider(row, 'r', 0, 9, 1, r, v => { r = Math.min(v, n); draw(); });
          function draw() { const c = nCr(n, r) * p ** (n - r) * q ** r; const mid = n % 2 === 0 ? `T${n / 2 + 1}` : `T${(n + 1) / 2} and T${(n + 3) / 2}`;
            rd.innerHTML = `(${p === 1 ? '' : p === -1 ? '−' : p}x ${q < 0 ? '−' : '+'} ${Math.abs(q)})${sup(n)} = ${expand(p, q, n, 'x', '')}<br>T<sub>${r + 1}</sub> = ${n}C${r} (${p}x)${sup(n - r)} (${q})${sup(r)} = <b>${big(c)}${pw('x', n - r)}</b> · middle term(s): ${mid}`; }
          draw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Expand', gen(R, L) {
          const n = L === 1 ? R.int(3, 4) : R.int(4, 6), a = R.pick([1, 2, 3]), b = R.nz(-3, 3);
          return { q: `Expand (${a === 1 ? '' : a}x ${b < 0 ? '−' : '+'} ${Math.abs(b) === 1 ? '' : Math.abs(b)}y)${sup(n)}.`, a: expand(a, b, n), s: `coefficients ${Array.from({ length: n + 1 }, (_, k) => nCr(n, k)).join(', ')}` };
        } },
      { title: 'A particular term', gen(R) {
          const n = R.int(5, 10), r = R.int(1, n - 1), a = R.pick([1, 2, 3]), b = R.nz(-3, 3); const c = nCr(n, r) * a ** (n - r) * b ** r;
          return { q: `Find the ${r + 1}${['th', 'st', 'nd', 'rd'][(r + 1) % 10 > 3 || [11, 12, 13].includes(r + 1) ? 0 : (r + 1) % 10]} term of (${a === 1 ? '' : a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)})${sup(n)}.`, a: `${big(c)}${pw('x', n - r)}`, ans: c, s: `T${r + 1} = ${n}C${r} (${a}x)${sup(n - r)} (${b})${sup(r)}` };
        } },
      { title: 'Coefficient of xᵏ', levels: [2, 3], gen(R) {
          const n = R.int(5, 9), b = R.nz(-3, 3), k = R.int(1, n - 1); const r = n - k; const c = nCr(n, r) * b ** r;
          return { q: `Find the coefficient of x${sup(k)} in the expansion of (x ${b < 0 ? '−' : '+'} ${Math.abs(b)})${sup(n)}.`, a: big(c), ans: c, s: `T(r+1) has x^(${n} − r); r = ${r}: ${n}C${r} × (${b})${sup(r)}` };
        } },
      { title: 'Middle term', levels: [2, 3], gen(R) {
          const n = R.int(4, 10), a = R.pick([1, 2, 3]), b = R.nz(-3, 3);
          const t = (r) => `${big(nCr(n, r) * a ** (n - r) * b ** r)}${pw('x', n - r)}`;
          return n % 2 === 0 ? { q: `Find the middle term of (${a === 1 ? '' : a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)})${sup(n)}.`, a: `T${n / 2 + 1} = ${t(n / 2)}` }
            : { q: `Find the middle terms of (${a === 1 ? '' : a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)})${sup(n)}.`, a: `T${(n + 1) / 2} = ${t((n - 1) / 2)}, T${(n + 3) / 2} = ${t((n + 1) / 2)}` };
        } },
      { title: 'Term independent of x', levels: [3], gen(R) {
          // (x^p + c/x^q)^n : power p(n−r) − q r = 0 ⇒ r = pn/(p+q)
          let p, q, n, r; do { p = R.int(1, 3); q = R.int(1, 2); n = R.int(3, 12); r = p * n / (p + q); } while (!Number.isInteger(r));
          const c = R.pick([1, 2, -1, -2, 3]); const val = nCr(n, r) * c ** r;
          return { q: `Find the term independent of x in (x${p > 1 ? sup(p) : ''} ${c < 0 ? '−' : '+'} ${Math.abs(c) === 1 ? '' : Math.abs(c)}/x${q > 1 ? sup(q) : ''})${sup(n)}.`, a: `T${r + 1} = ${big(val)}`, ans: val, s: `power of x: ${p}(${n} − r) − ${q}r = 0 ⇒ r = ${r}` };
        } },
      { title: 'Numerical application', levels: [2, 3], gen(R) {
          const base = R.pick([99, 101, 98, 102, 999, 1001]), n = R.int(3, 5); const near = base > 500 ? 1000 : 100; const d = base - near;
          const v = BigInt(base) ** BigInt(n);
          return { q: `Use the binomial theorem to evaluate (${base})${sup(n)}.`, a: v.toLocaleString('en-IN'), s: `(${near} ${d < 0 ? '−' : '+'} ${Math.abs(d)})${sup(n)}` };
        } }
    ],

    quiz: [
      { q: 'Number of terms in (a + b)⁸', o: ['8', '9', '7', '16'], a: 1, e: 'n + 1.' },
      { q: 'Sum of coefficients of (1 + x)⁶', o: ['64', '36', '12', '6'], a: 0, e: '2⁶.' },
      { q: 'General term of (a + b)ⁿ', o: ['ⁿCᵣ aⁿ⁻ʳ bʳ', 'ⁿCᵣ₊₁ aʳ bⁿ⁻ʳ', 'ⁿPᵣ aⁿ⁻ʳ bʳ', 'aⁿ⁻ʳ bʳ'], a: 0, e: 'T(r+1).' },
      { q: 'Row 5 of Pascal\'s triangle', o: ['1 5 10 10 5 1', '1 4 6 4 1', '1 5 10 5 1', '1 6 15 20 15 6 1'], a: 0, e: '⁵Cᵣ.' },
      { q: 'Middle term of (x + y)¹⁰ is', o: ['T₅', 'T₆', 'T₅ and T₆', 'T₁₁'], a: 1, e: 'n/2 + 1 = 6.' },
      { q: 'Coefficient of x² in (1 + x)⁵', o: ['5', '10', '20', '25'], a: 1, e: '⁵C₂.' },
      { q: '(x − 1)³ =', o: ['x³ − 3x² + 3x − 1', 'x³ + 3x² + 3x + 1', 'x³ − 1', 'x³ − 3x + 1'], a: 0, e: 'Signs alternate.' },
      { q: 'Number of middle terms in (a + b)⁷', o: ['1', '2', '3', '0'], a: 1, e: 'n odd.' },
      { q: 'Coefficient of x³ in (2x + 1)³', o: ['8', '6', '2', '3'], a: 0, e: '2³.' },
      { q: 'ⁿC₀ + ⁿC₁ + … + ⁿCₙ =', o: ['n', '2ⁿ', 'n!', 'n²'], a: 1, e: 'Put a = b = 1.' },
      { q: 'Term independent of x in (x + 1/x)⁴', o: ['4', '6', '1', '0'], a: 1, e: 'r = 2: ⁴C₂.' }
    ],

    teach: {
      outcomes: ['Expand (a + b)ⁿ for positive integer n', 'Build and use Pascal\'s triangle', 'Find a general term, a particular coefficient, middle terms and the term independent of x', 'Apply the theorem to numerical problems'],
      periods: [
        { t: 'Pascal and expansion', flow: [['10 min', 'Multiply (a + b)² · (a + b) by hand; spot the pattern.'], ['15 min', 'Explore panel 1: Pascal.'], ['15 min', 'The theorem; expansions.']] },
        { t: 'Terms', flow: [['15 min', 'Explore panel 2: general and middle terms.'], ['15 min', 'Coefficients; term independent of x.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['T(r+1) vs ⁿCᵣ₊₁.', 'Coefficient of x not raised.', 'Sign of b.'],
      activities: ['Build Pascal\'s triangle with counters.', 'Count paths on a grid: ⁿCᵣ.'],
      exit: ['Expand (x + 2)⁴.', '4th term of (2x − 1)⁶.', 'Middle term of (x + 1)⁸.'],
      homework: 'Find a if the 17th and 18th terms of (2 + a)⁵⁰ are equal.'
    },

    slides: [
      { t: 'Binomial Theorem', b: ['Pascal\'s triangle', '(a + b)ⁿ', 'General and middle terms', 'Applications'] },
      { t: 'The theorem', b: ['(a + b)ⁿ = Σ ⁿCᵣ aⁿ⁻ʳ bʳ', 'n + 1 terms', 'Coefficients sum to 2ⁿ'] },
      { t: 'General term', b: ['T(r+1) = ⁿCᵣ aⁿ⁻ʳ bʳ', 'Set power of x to find a term'] },
      { t: 'Middle term', b: ['n even: T(n/2 + 1)', 'n odd: T((n+1)/2), T((n+3)/2)'] },
      { t: 'Check yourself', b: ['Coefficient of x³ in (1 + x)⁶?', 'Answer: 20'] }
    ],

    fs: { groups: [
        ['Theorem', [['(a + b)ⁿ', 'ⁿC₀aⁿ + ⁿC₁aⁿ⁻¹b + … + ⁿCₙbⁿ'], ['Terms', 'n + 1'], ['(a − b)ⁿ', 'signs alternate'], ['(1 + x)ⁿ', '1 + nx + ⁿC₂x² + … + xⁿ']]],
        ['Coefficients', [['Symmetry', 'ⁿCᵣ = ⁿCₙ₋ᵣ'], ['Pascal', 'ⁿCᵣ₋₁ + ⁿCᵣ = ⁿ⁺¹Cᵣ'], ['Sum', '2ⁿ'], ['Rows', '1 · 1 1 · 1 2 1 · 1 3 3 1 · 1 4 6 4 1']]],
        ['Terms', [['General', 'T₍ᵣ₊₁₎ = ⁿCᵣ aⁿ⁻ʳ bʳ'], ['Middle (n even)', 'T₍ₙ/₂₊₁₎'], ['Middle (n odd)', 'T₍₍ₙ₊₁₎/₂₎, T₍₍ₙ₊₃₎/₂₎'], ['Independent of x', 'power of x in T₍ᵣ₊₁₎ = 0']]]],
      ex: [['(x + 2)⁴', 'x⁴ + 8x³ + 24x² + 32x + 16'], ['Term independent of x in (x + 1/x)⁶', 'r = 3: ⁶C₃ = 20']],
      rem: ['(r + 1)th term uses ⁿCᵣ.', 'Raise the whole term: (2x)ⁿ⁻ʳ.', 'Keep the sign with b.'] }
  });
})();
