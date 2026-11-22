/*
TOOL:    class8_maths_ch02
FAMILY:  CBSE_REVISION / Class 8 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class VIII moved into the series
CHANGES: 1.0.0 - Part I Ch 2 Power Play - revise, 2 explore panels (paper folding to the Moon, laws of exponents), 7 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num, Q } = G9;
  const sup = (k) => String(k).split('').map(d => d === '-' ? '⁻' : '⁰¹²³⁴⁵⁶⁷⁸⁹'[+d]).join('');

  G9.register({
    no: 2, part: 'Part I', short: 'Power play', title: 'Power Play',
    blurb: 'Exponents, laws of exponents, zero and negative powers, scientific notation, feeling the size of huge numbers.',
    revise: {
      oneLine: 'aⁿ means n copies of a multiplied together. Exponent laws follow from counting the copies: aᵐ × aⁿ = aᵐ⁺ⁿ, (aᵐ)ⁿ = aᵐⁿ, a⁰ = 1 and a⁻ⁿ = 1/aⁿ. Scientific notation writes any number as x × 10ⁿ with 1 ≤ x < 10.',
      sections: [
        { h: 'Exponents', html: `<p>aⁿ: base a, exponent (power) n. 2⁵ = 2 × 2 × 2 × 2 × 2 = 32. Doubling grows fast: folding paper 46 times would make it thick enough to reach the Moon.</p>
          <p>(−1)ⁿ is 1 for even n and −1 for odd n. (−a)² ≠ −a².</p>` },
        { h: 'Laws', html: `<ul><li>aᵐ × aⁿ = aᵐ⁺ⁿ</li><li>aᵐ ÷ aⁿ = aᵐ⁻ⁿ</li><li>(aᵐ)ⁿ = aᵐⁿ</li><li>aⁿ × bⁿ = (ab)ⁿ; aⁿ ÷ bⁿ = (a/b)ⁿ</li><li>a⁰ = 1 (a ≠ 0); a⁻ⁿ = 1/aⁿ</li></ul>` },
        { h: 'Scientific notation', html: `<p>x × 10ⁿ with 1 ≤ x &lt; 10. 5 900 000 000 = 5.9 × 10⁹; 0.00042 = 4.2 × 10⁻⁴. Comparing: look at the power of 10 first.</p>
          <p>Getting a feel: 10⁶ seconds ≈ 11.6 days; 10⁹ seconds ≈ 32 years.</p>` }
      ],
      formulas: [['Product', 'aᵐ × aⁿ = aᵐ⁺ⁿ'], ['Quotient', 'aᵐ ÷ aⁿ = aᵐ⁻ⁿ'], ['Power of a power', '(aᵐ)ⁿ = aᵐⁿ'], ['Zero exponent', 'a⁰ = 1'], ['Negative exponent', 'a⁻ⁿ = 1/aⁿ'], ['Standard form', 'x × 10ⁿ, 1 ≤ x < 10']],
      terms: [['Base', 'the number multiplied'], ['Exponent', 'how many times'], ['Scientific notation', 'standard form x × 10ⁿ'], ['Reciprocal', '1/a']],
      traps: ['aᵐ × aⁿ ≠ aᵐⁿ.', '2³ ≠ 6.', '(−2)⁴ = 16 but −2⁴ = −16.', '45 × 10³ is not in standard form (45 > 10).'],
      bridge: '<p>Ch 1 used squares and cubes. Exponents return in Class 9 sequences (GPs) and Class 11 sequences and series.</p>'
    },

    explore: [
      {
        title: 'Fold a paper to the Moon', intro: 'Paper is 0.1 mm thick. Each fold doubles the thickness. Press <kbd>S</kbd> to fold again.',
        build(el, K) {
          const rd = K.read(el); const bd = new K.Board(el, { xmin: 0, xmax: 50, ymin: 0, ymax: 16, equal: false, aspect: 0.4 });
          const an = new K.Anim(46, () => bd.redraw(), { ms: 350 });
          const fmt = (mm) => mm < 10 ? `${num(mm, 2)} mm` : mm < 1e4 ? `${num(mm / 10, 1)} cm` : mm < 1e6 ? `${num(mm / 1000, 1)} m` : `${num(mm / 1e6, 1)} km`;
          bd.onDraw = () => { bd.base(); for (let k = 0; k <= an.i; k++) bd.rect(k + 0.6, 0, 0.8, Math.log10(0.1 * 2 ** k * 10), { fill: k === an.i ? C.orangeL : C.blueL, color: k === an.i ? C.orange : C.blue, w: 1 });
            [['Everest', 8.848e6], ['Moon', 3.84e11]].forEach(([n, v]) => { const y = Math.log10(v * 10); bd.line(0, y, 50, y, { color: C.purple, dash: [5, 4], w: 1.5 }); bd.text(46, y + 0.4, n, { color: C.purple, font: 'bold 12px' }); });
            const t = 0.1 * 2 ** an.i; rd.innerHTML = `folds ${an.i} · thickness 0.1 × 2${sup(an.i)} mm = <b>${fmt(t)}</b> (bars on a log scale: each step up is ×10)`; };
          K.anim(el, an); bd.redraw(); return an;
        }
      },
      {
        title: 'Laws of exponents by counting', intro: 'Choose m and n. The tiles show each power as copies of a, so you can count the exponent of the answer.',
        build(el, K) {
          let m = 3, n = 2, law = 0; const row = K.row(el); const rd = K.read(el);
          K.select(row, 'law', ['aᵐ × aⁿ', 'aᵐ ÷ aⁿ', '(aᵐ)ⁿ'], i => { law = i; draw(); }); K.slider(row, 'm', 1, 6, 1, m, v => { m = v; draw(); }); K.slider(row, 'n', 1, 5, 1, n, v => { n = v; draw(); });
          const box = document.createElement('div'); box.style.cssText = 'font:20px Consolas,monospace;margin:10px 0;line-height:1.9'; el.appendChild(box);
          const tile = (c, k) => Array.from({ length: k }, () => `<span style="display:inline-block;border:2px solid ${c};border-radius:6px;padding:0 6px;margin:2px">a</span>`).join('');
          function draw() {
            if (law === 0) { box.innerHTML = tile(C.blue, m) + ' × ' + tile(C.orange, n); rd.innerHTML = `a${sup(m)} × a${sup(n)} = a${sup(m + n)} (count: ${m} + ${n} = ${m + n} copies)`; }
            if (law === 1) { const r = m - n; box.innerHTML = tile(C.blue, m) + ' ÷ ' + tile(C.orange, n); rd.innerHTML = `a${sup(m)} ÷ a${sup(n)} = a${sup(r)} (cancel ${Math.min(m, n)} pairs)${r === 0 ? ' = 1, so a⁰ = 1' : r < 0 ? ` = 1/a${sup(-r)}, so a${sup(r)} = 1/a${sup(-r)}` : ''}`; }
            if (law === 2) { box.innerHTML = Array.from({ length: n }, () => '(' + tile(C.purple, m) + ')').join(' × '); rd.innerHTML = `(a${sup(m)})${sup(n)} = a${sup(m * n)} (${n} groups of ${m} copies)`; }
          }
          draw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Evaluate a power', levels: [1, 2], gen(R) {
          const b = R.pick([2, 3, 4, 5, -2, -3, 10]), e = R.int(2, b === 2 ? 10 : 5); const v = b ** e;
          return { q: `Evaluate ${b < 0 ? '(' + b + ')' : b}${sup(e)}.`, a: String(v), ans: v };
        } },
      { title: 'Simplify with laws', gen(R) {
          const a = R.pick(['2', '3', '5', 'x', 'a']), m = R.int(2, 9), n = R.int(2, 9), t = R.int(0, 3);
          const items = [[`${a}${sup(m)} × ${a}${sup(n)}`, `${a}${sup(m + n)}`], [`${a}${sup(m + n)} ÷ ${a}${sup(n)}`, `${a}${sup(m)}`], [`(${a}${sup(m)})${sup(n)}`, `${a}${sup(m * n)}`], [`${a}${sup(m)} × ${a}${sup(n)} ÷ ${a}${sup(m + n)}`, '1']];
          const [q, ans] = items[t]; return { q: `Simplify ${q}.`, a: ans };
        } },
      { title: 'Zero and negative exponents', gen(R) {
          const b = R.int(2, 6), e = R.int(1, 4), t = R.int(0, 2);
          if (t === 0) return { q: `Evaluate ${b}${sup(-e)}.`, a: Q(1, b ** e), ans: 1 / b ** e };
          if (t === 1) return { q: `Evaluate (${b}⁰ + ${b + 1}⁰) × ${b}${sup(-1)}.`, a: Q(2, b), ans: 2 / b };
          return { q: `Evaluate (1/${b})${sup(-e)}.`, a: String(b ** e), ans: b ** e };
        } },
      { title: 'Find the exponent', levels: [2, 3], gen(R) {
          const b = R.pick([2, 3, 5]), m = R.int(2, 6), x = R.int(1, 6);
          return { q: `Find x if ${b}${sup(m)} × ${b}ˣ = ${b}${sup(m + x)}.`, a: `x = ${x}`, ans: x, s: 'add exponents' };
        } },
      { title: 'Scientific notation', gen(R) {
          const d = R.int(11, 99) / 10, e = R.pick([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 7, 8, 9]); const val = d * 10 ** e;
          const plain = e >= 0 ? Math.round(val).toLocaleString('en-US').replace(/,/g, ' ') : val.toFixed(-e + 1);
          return R.chance(.5) ? { q: `Write ${plain} in standard form.`, a: `${num(d)} × 10${sup(e)}` } : { q: `Write ${num(d)} × 10${sup(e)} in usual form.`, a: plain };
        } },
      { title: 'Compare numbers', levels: [2, 3], gen(R) {
          const a = R.int(11, 99) / 10, b = R.int(11, 99) / 10, e1 = R.int(3, 12), e2 = R.int(3, 12); const big = a * 10 ** e1 > b * 10 ** e2 ? `${num(a)} × 10${sup(e1)}` : `${num(b)} × 10${sup(e2)}`;
          return { q: `Which is larger: ${num(a)} × 10${sup(e1)} or ${num(b)} × 10${sup(e2)}?`, a: big, s: 'compare powers of 10 first' };
        } },
      { title: 'Doubling and growth', levels: [2, 3], gen(R) {
          const s = R.pick([1, 2, 5]), h = R.int(5, 12);
          return { q: `A bacterium splits into 2 every hour. Starting from ${s}, how many after ${h} hours?`, a: `${s} × 2${sup(h)} = ${s * 2 ** h}`, ans: s * 2 ** h };
        } }
    ],

    quiz: [
      { q: '2⁵ =', o: ['32', '10', '25', '16'], a: 0, e: '2·2·2·2·2.' },
      { q: 'a³ × a⁴ =', o: ['a⁷', 'a¹²', 'a', '2a⁷'], a: 0, e: 'Add exponents.' },
      { q: '(a³)⁴ =', o: ['a¹²', 'a⁷', 'a⁸¹', 'a³⁴'], a: 0, e: 'Multiply.' },
      { q: '7⁰ =', o: ['1', '0', '7', 'not defined'], a: 0, e: 'a⁰ = 1.' },
      { q: '2⁻³ =', o: ['1/8', '−8', '−6', '8'], a: 0, e: '1/2³.' },
      { q: '0.00056 in standard form', o: ['5.6 × 10⁻⁴', '56 × 10⁻⁵', '5.6 × 10⁴', '0.56 × 10⁻³'], a: 0, e: '1 ≤ x < 10.' },
      { q: '(−1)¹⁰¹ =', o: ['−1', '1', '101', '0'], a: 0, e: 'Odd power.' },
      { q: '−3² =', o: ['−9', '9', '−6', '6'], a: 0, e: 'Square first.' },
      { q: '10⁶ is', o: ['one million', 'ten lakh and one', 'one billion', 'one lakh'], a: 0, e: '1 000 000.' },
      { q: '(2 × 5)³ =', o: ['1000', '100', '30', '2 × 5³'], a: 0, e: '10³.' },
      { q: '3⁵ ÷ 3² =', o: ['27', '9', '3', '243'], a: 0, e: '3³.' }
    ],

    teach: {
      outcomes: ['Use exponential notation', 'Apply the laws of exponents including zero and negative exponents', 'Write and compare numbers in scientific notation', 'Estimate the size of large numbers'],
      periods: [
        { t: 'Powers and growth', flow: [['10 min', 'Explore panel 1: folding paper.'], ['15 min', 'Exponent notation, signs.'], ['15 min', 'Practice.']] },
        { t: 'Laws', flow: [['15 min', 'Explore panel 2: counting copies.'], ['15 min', 'Zero and negative exponents.'], ['10 min', 'Practice.']] },
        { t: 'Scientific notation', flow: [['15 min', 'Large and small numbers in science.'], ['15 min', 'Comparisons, estimates.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['aᵐaⁿ = aᵐⁿ.', 'a⁰ = 0.', '(−a)² vs −a².'],
      activities: ['Actually fold a sheet: how many folds are possible?', 'Rice on a chessboard story.'],
      exit: ['5³ × 5².', '4⁻².', '0.000037 in standard form.'],
      homework: 'Find m if (−3)ᵐ⁺¹ × (−3)⁵ = (−3)⁷. Express the distance from Earth to the Sun (149 600 000 km) in standard form.'
    },

    slides: [
      { t: 'Power Play', b: ['Exponents', 'Laws', 'Zero and negative powers', 'Scientific notation'] },
      { t: 'Laws', b: ['aᵐ × aⁿ = aᵐ⁺ⁿ', 'aᵐ ÷ aⁿ = aᵐ⁻ⁿ', '(aᵐ)ⁿ = aᵐⁿ', 'a⁰ = 1, a⁻ⁿ = 1/aⁿ'] },
      { t: 'Standard form', b: ['x × 10ⁿ, 1 ≤ x < 10', 'Compare powers of 10 first'] },
      { t: 'Check yourself', b: ['2⁻² × 2⁵?', '3.2 × 10³ in usual form?', 'Answers: 8 · 3200'] }
    ],

    fs: { groups: [
        ['Notation', [['aⁿ', 'n copies of a'], ['(−1)ⁿ', '1 (n even), −1 (n odd)'], ['(−a)² vs −a²', 'a² vs −a²']]],
        ['Laws', [['aᵐ × aⁿ', 'aᵐ⁺ⁿ'], ['aᵐ ÷ aⁿ', 'aᵐ⁻ⁿ'], ['(aᵐ)ⁿ', 'aᵐⁿ'], ['aⁿbⁿ', '(ab)ⁿ'], ['aⁿ/bⁿ', '(a/b)ⁿ'], ['a⁰', '1'], ['a⁻ⁿ', '1/aⁿ']]],
        ['Scientific notation', [['Form', 'x × 10ⁿ, 1 ≤ x < 10'], ['Large', 'n positive'], ['Small', 'n negative'], ['10⁶ s', '≈ 11.6 days'], ['10⁹ s', '≈ 32 years']]]],
      ex: [['(2³)² × 2⁻⁴', '2⁶⁻⁴ = 4'], ['0.000 007 5', '7.5 × 10⁻⁶']],
      rem: ['Same base before adding exponents.', 'Standard form: one digit before the point.', 'Negative exponent = reciprocal.'] }
  });
})();
