/*
TOOL:    class12_maths_ch13
FAMILY:  CBSE_REVISION / Class 12 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 13 Probability - revise, board focus, 2 explore panels (Bayes tree with sliders, random variable distribution and mean), 7 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num, Q } = G9;
  const fact = (n) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; };
  const nCr = (n, r) => r < 0 || r > n ? 0 : Math.round(fact(n) / (fact(r) * fact(n - r)));

  G9.register({
    no: 13, part: 'Unit VI · Probability (8 marks)', short: 'Probability', title: 'Probability',
    blurb: 'Conditional probability, multiplication theorem, independent events, total probability, Bayes\' theorem, random variables and their mean.',
    revise: {
      oneLine: 'P(E | F) = P(E ∩ F)/P(F) re-measures E inside F. Chaining conditional probabilities gives the multiplication rule, the theorem of total probability and Bayes\' theorem, which reverses the condition. A random variable attaches numbers to outcomes; its mean is Σ xᵢpᵢ.',
      sections: [
        { h: 'Conditional probability', html: `<div class="box m">P(E | F) = P(E ∩ F)/P(F), P(F) ≠ 0</div><p>0 ≤ P(E | F) ≤ 1; P(E′ | F) = 1 − P(E | F); P(S | F) = 1.</p>` },
        { h: 'Multiplication and independence', html: `<p>P(E ∩ F) = P(E)P(F | E) = P(F)P(E | F). E and F are <b>independent</b> iff P(E ∩ F) = P(E)P(F) (equivalently P(E | F) = P(E)). Then E′, F′ etc. are also independent; P(at least one) = 1 − P(E′)P(F′).</p>
          <p>Independent ≠ mutually exclusive: non-empty mutually exclusive events are never independent.</p>` },
        { h: 'Total probability and Bayes', html: `<p>If E₁, …, Eₙ partition S: P(A) = Σ P(Eᵢ)P(A | Eᵢ).</p><div class="box m">Bayes: P(Eᵢ | A) = ${G9.F('P(Eᵢ) P(A | Eᵢ)', 'Σ P(Eⱼ) P(A | Eⱼ)')}</div>
          <p>Typical: bags of balls, machines producing defectives, medical tests with false positives — draw a tree.</p>` },
        { h: 'Random variables', html: `<p>X assigns a number to each outcome. Probability distribution: values xᵢ with pᵢ ≥ 0 and Σpᵢ = 1. <b>Mean</b> (expectation) E(X) = Σ xᵢpᵢ.</p>` }
      ],
      formulas: [['Conditional', 'P(E | F) = P(E ∩ F)/P(F)'], ['Multiplication', 'P(E ∩ F) = P(E)P(F | E)'], ['Independent', 'P(E ∩ F) = P(E)P(F)'], ['Total probability', 'P(A) = Σ P(Eᵢ)P(A | Eᵢ)'], ['Bayes', 'P(Eᵢ | A) = P(Eᵢ)P(A | Eᵢ)/Σ P(Eⱼ)P(A | Eⱼ)'], ['Mean', 'E(X) = Σ xᵢpᵢ']],
      terms: [['Conditional probability', 'probability given that F has occurred'], ['Partition', 'mutually exclusive, exhaustive events'], ['Prior / posterior', 'P(Eᵢ) / P(Eᵢ | A)'], ['Random variable', 'real-valued function on S']],
      traps: ['P(E | F) ≠ P(F | E).', 'Independent confused with mutually exclusive.', 'Bayes denominator must include every branch.', 'Σpᵢ must be 1 — use it to find an unknown k.'],
      board: '<p><b>Unit VI — 8 marks.</b> Expect: conditional probability and independence (2 marks), a Bayes\' theorem question or case study (3–4 marks), and a probability distribution / mean of a random variable (2–3 marks).</p>',
      bridge: '<p>Extends Class 11 Ch 14 (axioms, P(A ∪ B)).</p>'
    },

    explore: [
      {
        title: 'Bayes\' theorem as a tree', intro: 'Two machines make bulbs. Set each machine\'s share and defect rate; the tree computes P(defective) and which machine a defective bulb probably came from.',
        build(el, K) {
          let p1 = 0.6, d1 = 0.02, d2 = 0.05; const row = K.row(el);
          K.slider(row, 'P(machine A)', 0.05, 0.95, 0.05, p1, v => { p1 = v; bd.redraw(); }); K.slider(row, 'P(def | A)', 0.01, 0.3, 0.01, d1, v => { d1 = v; bd.redraw(); }); K.slider(row, 'P(def | B)', 0.01, 0.3, 0.01, d2, v => { d2 = v; bd.redraw(); });
          const bd = new K.Board(el, { xmin: 0, xmax: 20, ymin: 0, ymax: 10, axes: false, grid: 0, equal: false, aspect: 0.42 }); const rd = K.read(el);
          bd.onDraw = () => { bd.clear(); const p2 = 1 - p1; const nodes = [[1, 5, 'start'], [8, 8, `A ${num(p1, 2)}`], [8, 2, `B ${num(p2, 2)}`], [16, 9.2, `def ${num(d1, 2)}`], [16, 6.8, `ok ${num(1 - d1, 2)}`], [16, 3.2, `def ${num(d2, 2)}`], [16, 0.8, `ok ${num(1 - d2, 2)}`]];
            [[0, 1, p1], [0, 2, p2], [1, 3, d1], [1, 4, 1 - d1], [2, 5, d2], [2, 6, 1 - d2]].forEach(([a, b, w]) => bd.line(nodes[a][0], nodes[a][1], nodes[b][0], nodes[b][1], { color: [3, 5].includes(b) ? C.orange : C.blue, w: 1 + 6 * w }));
            nodes.forEach(n => bd.text(n[0], n[1] + 0.5, n[2], { font: 'bold 13px' }));
            const pd = p1 * d1 + p2 * d2; rd.innerHTML = `P(def) = ${num(p1, 2)}×${num(d1, 2)} + ${num(p2, 2)}×${num(d2, 2)} = <b>${num(pd, 4)}</b> · P(A | def) = ${num(p1 * d1, 4)}/${num(pd, 4)} = <b>${num(p1 * d1 / pd, 4)}</b> · P(B | def) = <b>${num(p2 * d2 / pd, 4)}</b>`; };
          bd.redraw(); return null;
        }
      },
      {
        title: 'A random variable and its mean', intro: 'X = number of heads in n tosses of a coin. Change n; the bars show P(X = k) and the balance point is the mean.',
        build(el, K) {
          let n = 3; const row = K.row(el); K.slider(row, 'tosses n', 1, 8, 1, n, v => { n = v; bd.redraw(); });
          const bd = new K.Board(el, { xmin: -1, xmax: 9, ymin: -0.05, ymax: 0.55, equal: false, aspect: 0.45 }); const rd = K.read(el);
          bd.onDraw = () => { bd.base(); const ps = Array.from({ length: n + 1 }, (_, k) => nCr(n, k) / 2 ** n); ps.forEach((p, k) => bd.rect(k - 0.35, 0, 0.7, p, { fill: C.blueL, color: C.blue, w: 2 }));
            const m = ps.reduce((s, p, k) => s + k * p, 0); bd.line(m, 0, m, 0.52, { color: C.orange, w: 3, dash: [6, 4] }); bd.text(m, 0.53, 'mean', { color: C.orange, font: 'bold 13px' });
            rd.innerHTML = `X: ${ps.map((p, k) => `P(X = ${k}) = ${nCr(n, k)}/${2 ** n}`).join(', ')} · Σp = 1 · E(X) = Σ k·P(X = k) = <b>${num(m, 3)}</b> = n/2`; };
          bd.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Conditional probability', gen(R) {
          const pe = R.int(3, 8), pf = R.int(3, 8), pef = R.int(1, Math.min(pe, pf) - 1);
          return { q: `P(E) = ${num(pe / 10)}, P(F) = ${num(pf / 10)}, P(E ∩ F) = ${num(pef / 10)}. Find P(E | F) and P(F | E).`, a: `${Q(pef, pf)}, ${Q(pef, pe)}`, ans: pef / pf };
        } },
      { title: 'Conditional — dice and coins', gen(R) {
          const items = [['Two dice are thrown. Find P(sum is 8 | first die shows an even number).', '3/18 = 1/6'], ['A coin is tossed three times. Find P(three heads | at least two heads).', '1/4'], ['Two dice are thrown. Find P(a doublet | sum is even).', '6/18 = 1/3'], ['A family has two children. Find P(both boys | at least one boy).', '1/3'], ['A die is thrown. Find P(number is 4 | number is even).', '1/3'], ['Two cards are drawn without replacement. Find P(second is a king | first is a king).', '3/51 = 1/17']];
          const [q, a] = R.pick(items); return { q, a };
        } },
      { title: 'Independent events', gen(R) {
          const a = R.int(1, 8), b = R.int(1, 8); const pa = a / 10, pb = b / 10;
          return { q: `A and B are independent with P(A) = ${num(pa)}, P(B) = ${num(pb)}. Find P(A ∩ B), P(A ∪ B) and P(neither A nor B).`, a: `${num(pa * pb)}, ${num(pa + pb - pa * pb)}, ${num((1 - pa) * (1 - pb))}`, ans: pa * pb };
        } },
      { title: 'Multiplication rule (without replacement)', gen(R) {
          const r = R.int(3, 8), b = R.int(3, 8); const tot = r + b;
          return { q: `A bag has ${r} red and ${b} black balls. Two balls are drawn one after another without replacement. Find P(both red).`, a: Q(r * (r - 1), tot * (tot - 1)), ans: r * (r - 1) / (tot * (tot - 1)), s: `(${r}/${tot})(${r - 1}/${tot - 1})` };
        } },
      { title: 'Total probability and Bayes', levels: [2, 3], gen(R) {
          const p1 = R.pick([20, 25, 30, 40, 50, 60]), p2 = 100 - p1, d1 = R.int(1, 6), d2 = R.int(1, 6); const num_ = p1 * d1, den = p1 * d1 + p2 * d2;
          return { q: `Machines A and B make ${p1}% and ${p2}% of the items; ${d1}% of A's and ${d2}% of B's items are defective. An item picked at random is defective. Find the probability that it was made by A.`, a: Q(num_, den), ans: num_ / den, s: `P(def) = ${num(p1 / 100)}×${num(d1 / 100)} + ${num(p2 / 100)}×${num(d2 / 100)}` };
        } },
      { title: 'Probability distribution — find k and mean', levels: [2, 3], gen(R) {
          const ws = [R.int(1, 3), R.int(1, 3), R.int(1, 4), R.int(1, 3)]; const s = ws.reduce((a, b) => a + b, 0); const xs = [0, 1, 2, 3]; const mean = xs.reduce((a, x, i) => a + x * ws[i], 0);
          return { q: `X takes values 0, 1, 2, 3 with P(X = x) = ${ws.map(w => (w === 1 ? '' : w) + 'k').join(', ')} respectively. Find k and E(X).`, a: `k = ${Q(1, s)}, E(X) = ${Q(mean, s)}`, ans: mean / s, s: `Σp = ${s}k = 1` };
        } },
      { title: 'Mean of a random variable', gen(R) {
          const t = R.int(0, 1);
          if (t === 0) return { q: 'A fair die is thrown. Find the mean of the number X on the top face.', a: '7/2', ans: 3.5, s: '(1 + 2 + … + 6)/6' };
          const n = R.int(2, 4); return { q: `A coin is tossed ${n} times. X = number of heads. Find the probability distribution and the mean of X.`, a: `${Array.from({ length: n + 1 }, (_, k) => `P(${k}) = ${Q(nCr(n, k), 2 ** n)}`).join(', ')}; mean ${Q(n, 2)}`, ans: n / 2 };
        } }
    ],

    quiz: [
      { q: 'P(E | F) =', o: ['P(E ∩ F)/P(F)', 'P(E ∩ F)/P(E)', 'P(E)P(F)', 'P(E) + P(F)'], a: 0, e: 'Definition.' },
      { q: 'If A, B independent, P(A) = 0.3, P(B) = 0.4, then P(A ∩ B) =', o: ['0.12', '0.7', '0.58', '0.1'], a: 0, e: 'Product.' },
      { q: 'Mutually exclusive events with non-zero probabilities are', o: ['never independent', 'always independent', 'equally likely', 'exhaustive'], a: 0, e: 'P(A ∩ B) = 0 ≠ P(A)P(B).' },
      { q: 'Mean of the number on a fair die', o: ['3.5', '3', '6', '21'], a: 0, e: '21/6.' },
      { q: 'In a probability distribution, Σpᵢ =', o: ['1', '0', 'n', 'mean'], a: 0, e: 'Total probability.' },
      { q: 'P(both kings) drawing 2 cards without replacement', o: ['1/221', '1/169', '4/52', '1/13'], a: 0, e: '(4/52)(3/51).' },
      { q: 'Bayes\' theorem finds', o: ['P(cause | effect)', 'P(effect)', 'the mean', 'P(A ∪ B)'], a: 0, e: 'Reverses the condition.' },
      { q: 'P(at least one) for independent A, B', o: ['1 − P(A′)P(B′)', 'P(A)P(B)', 'P(A) + P(B)', '1 − P(A)P(B)'], a: 0, e: 'Complement of neither.' },
      { q: 'If P(E | F) = P(E), then E and F are', o: ['independent', 'exclusive', 'exhaustive', 'complementary'], a: 0, e: 'F does not change E.' },
      { q: 'P(S | F) =', o: ['1', '0', 'P(F)', 'P(S)'], a: 0, e: 'Property.' },
      { q: 'Two coins: P(two heads | at least one head)', o: ['1/3', '1/2', '1/4', '2/3'], a: 0, e: '1 of 3 outcomes.' }
    ],

    teach: {
      outcomes: ['Compute conditional probabilities', 'Use the multiplication rule and test independence', 'Apply total probability and Bayes\' theorem', 'Write probability distributions and find the mean'],
      periods: [
        { t: 'Conditional probability', flow: [['10 min', 'Card tricks: "given it is red…".'], ['15 min', 'Definition and properties.'], ['15 min', 'Dice and coin problems.']] },
        { t: 'Multiplication and independence', flow: [['20 min', 'Without replacement; independence test.'], ['20 min', 'Practice.']] },
        { t: 'Bayes and random variables', flow: [['15 min', 'Explore panel 1: tree.'], ['15 min', 'Explore panel 2: distributions and mean.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['P(E | F) = P(F | E).', 'Independent = exclusive.', 'Bayes denominator incomplete.'],
      activities: ['Medical test role-play: false positives with Bayes.', 'Coin-toss data to estimate E(X).'],
      exit: ['P(E | F) if P(E ∩ F) = 0.2, P(F) = 0.5.', 'Are A, B independent if P(A) = 0.5, P(B) = 0.4, P(A ∩ B) = 0.2?', 'E(X) for X = 0, 1, 2 with 0.25, 0.5, 0.25.'],
      homework: 'Bag I has 3 red and 4 black balls; bag II has 5 red and 6 black. One ball drawn at random from a randomly chosen bag is red. Find the probability that it came from bag II.'
    },

    slides: [
      { t: 'Probability', b: ['Conditional probability', 'Independence', 'Bayes\' theorem', 'Random variables'] },
      { t: 'Conditional', b: ['P(E | F) = P(E ∩ F)/P(F)', 'P(E ∩ F) = P(F)P(E | F)'] },
      { t: 'Independence', b: ['P(E ∩ F) = P(E)P(F)', 'Not the same as mutually exclusive'] },
      { t: 'Bayes', b: ['P(A) = Σ P(Eᵢ)P(A | Eᵢ)', 'P(Eᵢ | A) = P(Eᵢ)P(A | Eᵢ)/P(A)', 'Draw the tree'] },
      { t: 'Random variable', b: ['Values xᵢ, probabilities pᵢ', 'Σpᵢ = 1', 'Mean Σxᵢpᵢ'] },
      { t: 'Check yourself', b: ['P(A | B) if P(A ∩ B) = 0.12, P(B) = 0.4?', 'Answer: 0.3'] }
    ],

    fs: { groups: [
        ['Conditional', [['P(E | F)', 'P(E ∩ F)/P(F)'], ['Complement', "P(E′ | F) = 1 − P(E | F)"], ['Multiplication', 'P(E ∩ F) = P(E)P(F | E)']]],
        ['Independence', [['Test', 'P(E ∩ F) = P(E)P(F)'], ['At least one', '1 − P(E′)P(F′)'], ['Three events', 'pairwise and P(E ∩ F ∩ G) = product']]],
        ['Bayes', [['Total probability', 'P(A) = Σ P(Eᵢ)P(A | Eᵢ)'], ['Bayes', 'P(Eᵢ | A) = P(Eᵢ)P(A | Eᵢ)/P(A)'], ['Partition', 'mutually exclusive, exhaustive Eᵢ']]],
        ['Random variable', [['Distribution', 'pᵢ ≥ 0, Σpᵢ = 1'], ['Mean E(X)', 'Σ xᵢpᵢ'], ['Die', 'mean 7/2']]]],
      ex: [['Machines 60%/40%, defects 2%/5%', 'P(A | def) = 0.012/0.032 = 3/8'], ['Coin twice, X = heads', 'P = 1/4, 1/2, 1/4; mean 1']],
      rem: ['Condition goes in the denominator.', 'Independence is a product test.', 'Σp = 1 finds k.'] }
  });
})();
