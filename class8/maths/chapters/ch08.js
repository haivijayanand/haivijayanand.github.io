/*
TOOL:    class8_maths_ch08
FAMILY:  CBSE_REVISION / Class 8 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class VIII moved into the series
CHANGES: 1.0.0 - Part II Ch 1 Fractions in Disguise - revise, 2 explore panels (hundred grid, simple vs compound interest), 8 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num, Q } = G9;

  G9.register({
    no: 8, part: 'Part II', short: 'Percentages', title: 'Fractions in Disguise',
    blurb: '(Part II Ch 1) Percentages as fractions out of 100, percentage change, profit and loss, discount, GST, simple and compound interest.',
    revise: {
      oneLine: 'x% means x/100. Turning every percentage back into a fraction or a multiplier (×1.2 for a 20% rise, ×0.85 for a 15% fall) makes marks, sales, profits, taxes and interest easy to compare and compute.',
      sections: [
        { h: 'Percentages', html: `<p>x% = x/100. Fraction → %: multiply by 100. 3/8 = 37.5%. x% of N = xN/100. "What % of B is A?" = A/B × 100.</p>
          <p><b>Percentage change</b> = change/original × 100. Increase by r%: multiply by (1 + r/100); decrease: (1 − r/100). Two changes multiply: +10% then −10% gives ×0.99, a 1% fall.</p>` },
        { h: 'Buying and selling', html: `<p>Profit = SP − CP, Loss = CP − SP; Profit% = Profit/CP × 100. Discount = MP − SP, Discount% = Discount/MP × 100. GST is added on the sale price: price with GST = SP × (1 + GST/100).</p>` },
        { h: 'Interest', html: `<div class="box m">Simple interest SI = PRT/100 &nbsp;·&nbsp; Compound amount A = P(1 + R/100)ᵀ</div>
          <p>Compound interest earns interest on interest, so it grows faster. Half-yearly: rate R/2, periods 2T. The same multiplier idea gives population growth and depreciation: A = P(1 ± R/100)ᵀ.</p>` }
      ],
      formulas: [['x%', 'x/100'], ['% change', 'change/original × 100'], ['Profit %', '(SP − CP)/CP × 100'], ['Discount %', '(MP − SP)/MP × 100'], ['SI', 'PRT/100'], ['Compound amount', 'P(1 + R/100)ᵀ']],
      terms: [['CP, SP, MP', 'cost, selling and marked price'], ['GST', 'goods and services tax added to the price'], ['Principal', 'money lent or deposited'], ['Compound interest', 'interest on principal and earlier interest']],
      traps: ['Profit % is on CP; discount % is on MP.', '+20% then −20% does not return to the start.', 'Percentage change is on the original, not the new value.', 'CI = A − P, not A.'],
      bridge: '<p>Uses ratios (Ch 7). Compound interest is a geometric progression (Class 9 Ch 8, Class 11 Ch 8).</p>'
    },

    explore: [
      {
        title: 'The hundred grid', intro: 'Choose a fraction; the grid shows it out of 100 so you can read it as a percentage.',
        build(el, K) {
          let a = 3, b = 8; const row = K.row(el); K.slider(row, 'numerator', 0, 20, 1, a, v => { a = v; draw(); }); K.slider(row, 'denominator', 1, 20, 1, b, v => { b = v; draw(); });
          const box = document.createElement('div'); box.style.cssText = 'display:grid;grid-template-columns:repeat(10,28px);gap:2px;margin:8px 0'; el.appendChild(box); const rd = K.read(el);
          function draw() { const p = a / b * 100; box.innerHTML = Array.from({ length: 100 }, (_, i) => { const f = Math.max(0, Math.min(1, p - i)); return `<div style="height:28px;border:1px solid var(--rule,#cbd5e1);background:linear-gradient(90deg,var(--orange,#ea580c) ${f * 100}%,transparent ${f * 100}%);opacity:${f ? 0.75 : 1}"></div>`; }).join('');
            rd.innerHTML = `${a}/${b} = ${a}/${b} × 100% = <b>${num(p, 2)}%</b>${p > 100 ? ' (more than the whole grid)' : ''} · as a decimal ${num(a / b, 4)}`; }
          draw(); return null;
        }
      },
      {
        title: 'Simple vs compound interest', intro: 'Set principal, rate and years. Simple interest grows in a straight line; compound interest bends upward.',
        build(el, K) {
          let P = 10000, r = 10, T = 10; const row = K.row(el); K.slider(row, 'P (₹)', 1000, 50000, 1000, P, v => { P = v; b.redraw(); }); K.slider(row, 'R %', 1, 20, 1, r, v => { r = v; b.redraw(); }); K.slider(row, 'years', 1, 20, 1, T, v => { T = v; b.redraw(); });
          const b = new K.Board(el, { xmin: -1, xmax: 21, ymin: -0.5, ymax: 12, equal: false }); const rd = K.read(el);
          b.onDraw = () => { b.base(); const sc = 1 / (P * 3 / 10 + 1e-9) * 3; for (let t = 0; t <= T; t++) { const si = P * (1 + r * t / 100), ci = P * (1 + r / 100) ** t; b.rect(t - 0.35, 0, 0.3, Math.min(11.5, si / P * 3), { fill: C.blueL, color: C.blue, w: 1 }); b.rect(t + 0.05, 0, 0.3, Math.min(11.5, ci / P * 3), { fill: 'rgba(234,88,12,.35)', color: C.orange, w: 1 }); }
            const si = P * r * T / 100, A = P * (1 + r / 100) ** T; rd.innerHTML = `after ${T} years: <span style="color:var(--blue)">SI = ${num(si, 0)}, amount ₹${num(P + si, 0)}</span> · <span style="color:var(--orange)">compound amount ₹${num(A, 0)}, CI = ₹${num(A - P, 0)}</span> · difference ₹${num(A - P - si, 0)} (bars in units of P/3)`; };
          b.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Fraction ↔ percentage', levels: [1, 2], gen(R) {
          const fr = R.pick([[1, 8], [3, 8], [5, 16], [7, 20], [9, 25], [3, 40], [2, 3], [5, 6], [11, 50]]); return R.chance(.5) ? { q: `Write ${fr[0]}/${fr[1]} as a percentage.`, a: `${num(fr[0] / fr[1] * 100, 2)}%`, ans: fr[0] / fr[1] * 100 } : { q: `Write ${num(fr[0] / fr[1] * 100, 2)}% as a fraction in lowest terms.`, a: Q(fr[0], fr[1]) };
        } },
      { title: 'Percentage of a quantity', levels: [1, 2], gen(R) {
          const p = R.pick([5, 12, 15, 20, 25, 35, 40, 62.5, 75]), n = R.int(4, 80) * 8; return { q: `Find ${num(p)}% of ${n}.`, a: num(p * n / 100, 2), ans: p * n / 100 };
        } },
      { title: 'Percentage change', gen(R) {
          const o = R.int(20, 200) * 5, p = R.pick([5, 10, 12, 15, 20, 25, 30, 40]) * R.sign(); const n = o * (1 + p / 100);
          return { q: `A price changes from ₹${o} to ₹${num(n, 2)}. Find the percentage ${p > 0 ? 'increase' : 'decrease'}.`, a: `${Math.abs(p)}%`, ans: Math.abs(p), s: `${num(Math.abs(n - o), 2)}/${o} × 100` };
        } },
      { title: 'Successive changes', levels: [2, 3], gen(R) {
          const a = R.pick([10, 20, 25, 30, 50]), b = R.pick([10, 20, 25, 30, 50]); const f = (1 + a / 100) * (1 - b / 100); const ch = (f - 1) * 100;
          return { q: `A price rises by ${a}% and then falls by ${b}%. What is the overall percentage change?`, a: `${ch >= 0 ? 'increase' : 'decrease'} of ${num(Math.abs(ch), 2)}%`, s: `×${num(1 + a / 100)} × ${num(1 - b / 100)} = ×${num(f, 4)}` };
        } },
      { title: 'Profit and loss', gen(R) {
          const cp = R.int(20, 200) * 10, p = R.pick([5, 8, 10, 12, 15, 20, 25]) * R.sign(); const sp = cp * (1 + p / 100);
          return { q: `An article bought for ₹${cp} is sold for ₹${num(sp, 2)}. Find the ${p > 0 ? 'profit' : 'loss'} percentage.`, a: `${p > 0 ? 'profit' : 'loss'} ${Math.abs(p)}%`, ans: Math.abs(p) };
        } },
      { title: 'Discount and GST', gen(R) {
          const mp = R.int(10, 100) * 50, d = R.pick([10, 15, 20, 25, 30]), g = R.pick([5, 12, 18]); const sp = mp * (1 - d / 100), fin = sp * (1 + g / 100);
          return { q: `Marked price ₹${mp}, discount ${d}%, GST ${g}% on the sale price. Find the final amount paid.`, a: `₹${num(fin, 2)}`, ans: fin, s: `${mp} × ${num(1 - d / 100)} × ${num(1 + g / 100)}` };
        } },
      { title: 'Simple interest', gen(R) {
          const P = R.int(5, 100) * 1000, r = R.pick([4, 5, 6, 7.5, 8, 9, 10, 12]), T = R.int(2, 6); const si = P * r * T / 100;
          return { q: `Find the simple interest on ₹${P} at ${num(r)}% per year for ${T} years.`, a: `₹${num(si, 2)}`, ans: si };
        } },
      { title: 'Compound interest', levels: [2, 3], gen(R) {
          const P = R.int(5, 50) * 1000, r = R.pick([5, 10, 8, 12, 20]), T = R.int(2, 3); const A = P * (1 + r / 100) ** T;
          return { q: `Find the amount and compound interest on ₹${P} at ${r}% per year, compounded annually, for ${T} years.`, a: `amount ₹${num(A, 2)}, CI ₹${num(A - P, 2)}`, ans: A - P, s: `${P}(1 + ${r}/100)^${T}` };
        } }
    ],

    quiz: [
      { q: '3/4 as a percentage', o: ['75%', '34%', '0.75%', '7.5%'], a: 0, e: '× 100.' },
      { q: '20% of 450', o: ['90', '45', '22.5', '9'], a: 0, e: '450/5.' },
      { q: 'Price ₹200 → ₹250: increase', o: ['25%', '50%', '20%', '125%'], a: 0, e: '50/200.' },
      { q: 'Profit % is calculated on', o: ['CP', 'SP', 'MP', 'profit'], a: 0, e: 'Cost price.' },
      { q: 'Discount % is calculated on', o: ['MP', 'CP', 'SP', 'GST'], a: 0, e: 'Marked price.' },
      { q: '+10% then −10% gives', o: ['a 1% fall', 'no change', 'a 1% rise', 'a 20% fall'], a: 0, e: '× 0.99.' },
      { q: 'SI on ₹1000 at 5% for 3 years', o: ['₹150', '₹50', '₹157.63', '₹1150'], a: 0, e: '1000 × 5 × 3/100.' },
      { q: 'Amount on ₹1000 at 10% CI for 2 years', o: ['₹1210', '₹1200', '₹210', '₹1100'], a: 0, e: '1000 × 1.21.' },
      { q: 'Multiplier for a 15% decrease', o: ['0.85', '1.15', '0.15', '−0.15'], a: 0, e: '1 − 0.15.' },
      { q: 'CP ₹500, SP ₹450: loss %', o: ['10%', '11.1%', '50%', '5%'], a: 0, e: '50/500.' },
      { q: '0.4 as a percentage', o: ['40%', '4%', '0.4%', '400%'], a: 0, e: '× 100.' }
    ],

    teach: {
      outcomes: ['Convert between fractions, decimals and percentages', 'Find percentage change using multipliers', 'Solve profit, loss, discount and GST problems', 'Compute simple and compound interest'],
      periods: [
        { t: 'Percent as a fraction', flow: [['10 min', 'Explore panel 1: hundred grid.'], ['15 min', 'Percent of, what percent, change.'], ['15 min', 'Practice.']] },
        { t: 'Buying and selling', flow: [['20 min', 'Profit, loss, discount, GST with bills.'], ['20 min', 'Practice.']] },
        { t: 'Interest', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'SI and CI, half-yearly.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Base for percentages.', 'Successive changes add.', 'CI = amount.'],
      activities: ['Shop role-play with price tags and GST bills.', 'Compare bank deposit schemes.'],
      exit: ['5/8 as %.', 'MP ₹800, discount 15%: SP?', 'CI on ₹2000 at 10% for 2 years.'],
      homework: 'A town of 20 000 grows 5% a year. Find its population after 2 years. A scooter worth ₹60 000 depreciates 10% a year; find its value after 3 years.'
    },

    slides: [
      { t: 'Fractions in Disguise', b: ['Percentages are fractions', 'Percentage change', 'Profit, loss, discount, GST', 'Simple and compound interest'] },
      { t: 'Multipliers', b: ['+r% ⇒ × (1 + r/100)', '−r% ⇒ × (1 − r/100)', 'Successive changes multiply'] },
      { t: 'Interest', b: ['SI = PRT/100', 'A = P(1 + R/100)ᵀ', 'CI = A − P'] },
      { t: 'Check yourself', b: ['12% of 250?', 'CI on ₹5000 at 10% for 2 years?', 'Answers: 30 · ₹1050'] }
    ],

    fs: { groups: [
        ['Percent', [['x%', 'x/100'], ['Fraction → %', '× 100'], ['x% of N', 'xN/100'], ['A as % of B', 'A/B × 100']]],
        ['Change', [['% change', 'change/original × 100'], ['Increase r%', '× (1 + r/100)'], ['Decrease r%', '× (1 − r/100)'], ['Successive', 'multiply the multipliers']]],
        ['Trade', [['Profit %', '(SP − CP)/CP × 100'], ['Loss %', '(CP − SP)/CP × 100'], ['Discount %', '(MP − SP)/MP × 100'], ['With GST', 'SP × (1 + GST/100)']]],
        ['Interest', [['SI', 'PRT/100'], ['Compound amount', 'P(1 + R/100)ᵀ'], ['Half-yearly', 'R/2 per half-year, 2T periods'], ['Growth / depreciation', 'P(1 ± R/100)ᵀ']]]],
      ex: [['MP ₹1200, 25% off, 12% GST', '1200 × 0.75 × 1.12 = ₹1008'], ['₹8000 at 5% CI, 2 years', '₹8820, CI ₹820']],
      rem: ['Check which price is the base.', 'Use multipliers.', 'CI = A − P.'] }
  });
})();
