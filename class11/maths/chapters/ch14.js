/*
TOOL:    class11_maths_ch14
FAMILY:  CBSE_REVISION / Class 11 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 14 Probability - revise, exam focus, 2 explore panels (sample space of two dice with events, coin-toss simulator), 6 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { Q, C, num } = G9;
  const fact = (n) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; };
  const nCr = (n, r) => r < 0 || r > n ? 0 : Math.round(fact(n) / (fact(r) * fact(n - r)));

  G9.register({
    no: 14, part: 'Unit V · Statistics and Probability (12 marks)', short: 'Probability', title: 'Probability',
    blurb: 'Random experiments, sample spaces, events as sets, axiomatic probability, P(A ∪ B), complements.',
    revise: {
      oneLine: 'List the sample space S of a random experiment; events are subsets of S. With equally likely outcomes P(E) = n(E)/n(S), and the set rules of Ch 1 become P(A ∪ B) = P(A) + P(B) − P(A ∩ B) and P(not A) = 1 − P(A).',
      sections: [
        { h: 'Sample space and events', html: `<p>Sample space S: all outcomes. Event: subset of S. Simple (one outcome), compound, sure (S), impossible (∅).</p>
          <p>A or B = A ∪ B; A and B = A ∩ B; not A = A′; A but not B = A − B. <b>Mutually exclusive</b>: A ∩ B = ∅. <b>Exhaustive</b>: union is S.</p>` },
        { h: 'Axiomatic probability', html: `<p>P(E) ≥ 0, P(S) = 1, and P(A ∪ B) = P(A) + P(B) for mutually exclusive A, B. Hence 0 ≤ P(E) ≤ 1, P(∅) = 0.</p>
          <p>Equally likely outcomes: <b>P(E) = n(E)/n(S)</b>.</p>` },
        { h: 'Rules', html: `<div class="box m">P(A ∪ B) = P(A) + P(B) − P(A ∩ B) &nbsp;·&nbsp; P(A′) = 1 − P(A)</div>
          <p>P(A − B) = P(A) − P(A ∩ B). For selections use combinations: P(2 red from a bag) = ʳC₂/ⁿC₂.</p>` }
      ],
      formulas: [['Classical', 'P(E) = n(E)/n(S)'], ['Complement', "P(A′) = 1 − P(A)"], ['Addition', 'P(A ∪ B) = P(A) + P(B) − P(A ∩ B)'], ['A but not B', 'P(A) − P(A ∩ B)'], ['Mutually exclusive', 'P(A ∩ B) = 0']],
      terms: [['Sample space', 'set of all outcomes'], ['Event', 'subset of the sample space'], ['Mutually exclusive', 'cannot happen together'], ['Exhaustive', 'together cover S']],
      traps: ['Counting (1, 2) and (2, 1) as one outcome with two dice.', 'Adding P(A) + P(B) for events that overlap.', 'A probability greater than 1 signals an error.', 'Mutually exclusive ≠ independent.'],
      board: '<p><b>Unit V (Statistics and Probability) — 12 marks.</b> Expect: sample spaces (coins, dice, cards), describing events as sets, P(A ∪ B) and complement problems (2–3 marks), and selection probabilities with nCr.</p>',
      bridge: '<p>Uses sets (Ch 1) and combinations (Ch 6). Class 12 adds conditional probability, Bayes\' theorem and distributions.</p>'
    },

    explore: [
      {
        title: 'Two dice: events on the sample space', intro: 'Choose events A and B. Outcomes in A are blue, in B orange, in both purple. Read P(A ∪ B) from the grid.',
        build(el, K) {
          const evs = [['sum is 7', (a, b) => a + b === 7], ['sum ≥ 9', (a, b) => a + b >= 9], ['a doublet', (a, b) => a === b], ['first die is 6', (a) => a === 6], ['sum is even', (a, b) => (a + b) % 2 === 0], ['at least one 5', (a, b) => a === 5 || b === 5], ['product is 12', (a, b) => a * b === 12]];
          let ia = 0, ib = 2; const row = K.row(el); K.select(row, 'A', evs.map(e => e[0]), i => { ia = i; bd.redraw(); }); const s2 = K.select(row, 'B', evs.map(e => e[0]), i => { ib = i; bd.redraw(); }); if (s2 && s2.value !== undefined) s2.value = 2;
          const bd = new K.Board(el, { xmin: 0, xmax: 7.5, ymin: 0, ymax: 7.5, axes: false, grid: 0 }); const rd = K.read(el);
          bd.onDraw = () => { bd.clear(); let nA = 0, nB = 0, nAB = 0; const fA = evs[ia][1], fB = evs[ib][1];
            for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) { const A = fA(a, b), B = fB(a, b); nA += A; nB += B; nAB += A && B;
              bd.rect(a - 0.45, 7 - b - 0.45 + 0.5, 0.9, 0.9, { fill: A && B ? 'rgba(124,58,237,.55)' : A ? 'rgba(29,78,216,.4)' : B ? 'rgba(234,88,12,.45)' : '#f1f5f9', color: C.grey, w: 1 }); bd.text(a, 7 - b + 0.5, `${a},${b}`, { font: '12px' }); }
            const nU = nA + nB - nAB; rd.innerHTML = `n(S) = 36 · P(A) = ${Q(nA, 36)} · P(B) = ${Q(nB, 36)} · P(A ∩ B) = ${Q(nAB, 36)} · P(A ∪ B) = ${nA}/36 + ${nB}/36 − ${nAB}/36 = <b>${Q(nU, 36)}</b> · P(A′) = ${Q(36 - nA, 36)}${nAB === 0 ? ' · A and B are mutually exclusive' : ''}`; };
          bd.redraw(); return null;
        }
      },
      {
        title: 'Relative frequency settles down', intro: 'Press <kbd>P</kbd> to toss coins. The fraction of heads wanders, then settles near 1/2.',
        build(el, K) {
          const bd = new K.Board(el, { xmin: 0, xmax: 500, ymin: 0, ymax: 1, equal: false, aspect: 0.45 }); const rd = K.read(el); let h = 0, n = 0, pts = [];
          const an = new K.Anim(Infinity, () => { for (let i = 0; i < 5 && n < 500; i++) { n++; h += Math.random() < 0.5; pts.push([n, h / n]); } if (n >= 500) an.pause(); bd.redraw(); }, { ms: 40 });
          const row = K.row(el); K.button(row, 'Reset', () => { h = 0; n = 0; pts = []; an.pause(); bd.redraw(); });
          bd.onDraw = () => { bd.base(); bd.line(0, 0.5, 500, 0.5, { color: C.purple, dash: [6, 4], w: 2 }); for (let i = 1; i < pts.length; i++) bd.line(...pts[i - 1], ...pts[i], { color: C.orange, w: 2 });
            rd.innerHTML = n ? `tosses ${n} · heads ${h} · relative frequency <b>${num(h / n, 3)}</b> · theoretical P(H) = 0.5` : 'Press P to start tossing.'; };
          K.anim(el, an); bd.redraw(); return an;
        }
      }
    ],

    gens: [
      { title: 'Sample spaces', levels: [1, 2], gen(R) {
          const items = [['a coin is tossed three times', 'S = {HHH, HHT, HTH, THH, HTT, THT, TTH, TTT}, n(S) = 8'], ['a coin is tossed and a die is thrown', 'S = {H1, …, H6, T1, …, T6}, n(S) = 12'], ['two dice are thrown', 'n(S) = 36: (1, 1), (1, 2), …, (6, 6)'], ['a family has two children (B/G, older first)', 'S = {BB, BG, GB, GG}'], ['a coin is tossed; if head, a die is thrown, else the coin is tossed again', 'S = {H1, …, H6, TH, TT}, n(S) = 8']];
          const [q, a] = R.pick(items); return { q: `Write the sample space when ${q}.`, a };
        } },
      { title: 'Dice probabilities', gen(R) {
          const evs = [['the sum is 8', (a, b) => a + b === 8], ['the sum is at most 4', (a, b) => a + b <= 4], ['a doublet appears', (a, b) => a === b], ['the sum is a prime', (a, b) => [2, 3, 5, 7, 11].includes(a + b)], ['the product is even', (a, b) => (a * b) % 2 === 0], ['at least one die shows 6', (a, b) => a === 6 || b === 6], [`the sum is ${R.int(9, 12)} or more`, null]];
          let [q, f] = R.pick(evs); if (!f) { const k = parseInt(q.match(/\d+/)[0]); f = (a, b) => a + b >= k; }
          let n = 0; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) n += f(a, b);
          return { q: `Two dice are thrown. Find the probability that ${q}.`, a: Q(n, 36), ans: n / 36, s: `${n} favourable out of 36` };
        } },
      { title: 'Addition rule', gen(R) {
          const pa = R.int(2, 7), pb = R.int(2, 7), pab = R.int(0, Math.min(pa, pb) - 1); const D = 10;
          const t = R.int(0, 1);
          if (t === 0) return { q: `P(A) = ${num(pa / D)}, P(B) = ${num(pb / D)}, P(A ∩ B) = ${num(pab / D)}. Find P(A ∪ B), P(A′) and P(A but not B).`, a: `${num((pa + pb - pab) / D)}, ${num(1 - pa / D)}, ${num((pa - pab) / D)}`, ans: (pa + pb - pab) / D };
          return { q: `P(A) = ${num(pa / D)}, P(B) = ${num(pb / D)}, P(A ∪ B) = ${num((pa + pb - pab) / D)}. Find P(A ∩ B) and P(neither A nor B).`, a: `${num(pab / D)}, ${num(1 - (pa + pb - pab) / D)}`, ans: pab / D };
        } },
      { title: 'Cards', gen(R) {
          const items = [['a king', 4], ['a red card', 26], ['a spade', 13], ['a face card (J, Q, K)', 12], ['a red king', 2], ['not a heart', 39], ['a king or a heart', 16], ['an ace or a black card', 28]];
          const [q, n] = R.pick(items); return { q: `A card is drawn from a well-shuffled pack of 52. Find P(${q}).`, a: Q(n, 52), ans: n / 52 };
        } },
      { title: 'Selections with nCr', levels: [2, 3], gen(R) {
          const r = R.int(3, 7), b = R.int(3, 7), k = 2; const tot = nCr(r + b, k);
          const t = R.int(0, 2); const nn = [nCr(r, 2), nCr(b, 2), r * b][t]; const what = ['both red', 'both blue', 'one of each colour'][t];
          return { q: `A bag has ${r} red and ${b} blue balls. Two are drawn at random. Find P(${what}).`, a: Q(nn, tot), ans: nn / tot, s: `${['ʳC₂', 'ᵇC₂', 'r × b'][t]} / ${r + b}C2 = ${nn}/${tot}` };
        } },
      { title: 'Committee / word probability', levels: [3], gen(R) {
          const m = R.int(4, 7), w = R.int(3, 6), k = 3; const tot = nCr(m + w, k); const atl = tot - nCr(m, k);
          return { q: `A committee of ${k} is chosen at random from ${m} men and ${w} women. Find the probability that it contains at least one woman.`, a: Q(atl, tot), ans: atl / tot, s: `1 − ${m}C3/${m + w}C3` };
        } }
    ],

    quiz: [
      { q: 'n(S) when three coins are tossed', o: ['6', '8', '3', '9'], a: 1, e: '2³.' },
      { q: 'P(sum 7) with two dice', o: ['1/6', '7/36', '1/12', '5/36'], a: 0, e: '6/36.' },
      { q: 'If P(A) = 0.35, P(A′) =', o: ['0.65', '0.35', '1.35', '0'], a: 0, e: '1 − P(A).' },
      { q: 'P(A) = 0.5, P(B) = 0.4, P(A ∩ B) = 0.2. P(A ∪ B) =', o: ['0.7', '0.9', '0.1', '0.2'], a: 0, e: '0.5 + 0.4 − 0.2.' },
      { q: 'For mutually exclusive A, B: P(A ∩ B) =', o: ['0', '1', 'P(A)P(B)', 'P(A) + P(B)'], a: 0, e: 'Cannot happen together.' },
      { q: 'P(a face card) from 52 cards', o: ['3/13', '1/13', '4/13', '12/13'], a: 0, e: '12/52.' },
      { q: 'Which cannot be a probability?', o: ['0', '0.99', '1.2', '1'], a: 2, e: '0 ≤ P ≤ 1.' },
      { q: 'P(doublet) with two dice', o: ['1/6', '1/36', '1/12', '1/3'], a: 0, e: '6/36.' },
      { q: 'Event "A but not B" is', o: ['A ∩ B', 'A − B', 'A ∪ B', "A′ ∩ B"], a: 1, e: 'Set difference.' },
      { q: 'P(both red) drawing 2 from 3 red, 2 blue', o: ['3/10', '9/25', '3/5', '1/2'], a: 0, e: '³C₂/⁵C₂.' },
      { q: 'P(S) =', o: ['0', '1', '1/2', 'n(S)'], a: 1, e: 'Axiom.' }
    ],

    teach: {
      outcomes: ['Write sample spaces and describe events as sets', 'Use axioms and the classical definition', 'Apply complement and addition rules', 'Solve selection problems with combinations'],
      periods: [
        { t: 'Sample spaces and events', flow: [['10 min', 'Toss experiments in pairs.'], ['15 min', 'Sample spaces; events as sets.'], ['15 min', 'Mutually exclusive, exhaustive.']] },
        { t: 'Probability rules', flow: [['15 min', 'Explore panel 1: two-dice grid.'], ['15 min', 'Addition and complement rules.'], ['10 min', 'Explore panel 2: relative frequency.']] },
        { t: 'Applications', flow: [['20 min', 'Cards, bags of balls, committees with nCr.'], ['10 min', 'Practice.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Ordered dice outcomes.', 'Overlap ignored.', 'Mutually exclusive = independent.'],
      activities: ['Class experiment: 100 coin tosses pooled.', 'Draw coloured counters from a bag.'],
      exit: ['P(sum 10) with two dice.', 'P(A ∪ B) if P(A) = 0.4, P(B) = 0.3, P(A ∩ B) = 0.1.', 'P(not a king).'],
      homework: 'From a group of 3 boys and 2 girls, two children are chosen. Find the probability that (i) both are girls (ii) at least one is a boy. Verify P(i) + P(ii) = 1.'
    },

    slides: [
      { t: 'Probability', b: ['Random experiments', 'Sample spaces and events', 'Axiomatic probability', 'Rules'] },
      { t: 'Events', b: ['Event ⊂ S', 'A ∪ B: A or B; A ∩ B: A and B', 'Mutually exclusive: A ∩ B = ∅'] },
      { t: 'Rules', b: ['P(E) = n(E)/n(S)', "P(A′) = 1 − P(A)", 'P(A ∪ B) = P(A) + P(B) − P(A ∩ B)'] },
      { t: 'Selections', b: ['P = favourable selections / all selections', 'Use ⁿCᵣ', 'At least one: 1 − P(none)'] },
      { t: 'Check yourself', b: ['P(sum 9) with two dice?', 'P(red ace) from 52?', 'Answers: 1/9 · 1/26'] }
    ],

    fs: { groups: [
        ['Sample spaces', [['Coin × n', '2ⁿ outcomes'], ['Two dice', '36 outcomes'], ['Cards', '52: 4 suits × 13']]],
        ['Events', [['A or B', 'A ∪ B'], ['A and B', 'A ∩ B'], ['not A', "A′"], ['A but not B', 'A − B = A ∩ B′'], ['Mutually exclusive', 'A ∩ B = ∅']]],
        ['Rules', [['Axioms', 'P(E) ≥ 0, P(S) = 1'], ['Classical', 'n(E)/n(S)'], ['Complement', "1 − P(A)"], ['Addition', 'P(A) + P(B) − P(A ∩ B)'], ['A − B', 'P(A) − P(A ∩ B)']]],
        ['Two-dice sums (ways)', [['2, 3, 4, 5, 6, 7', '1, 2, 3, 4, 5, 6'], ['8, 9, 10, 11, 12', '5, 4, 3, 2, 1']]]],
      ex: [['P(king or heart)', '(4 + 13 − 1)/52 = 4/13'], ['2 from 4 red, 3 blue: both red', '⁴C₂/⁷C₂ = 6/21 = 2/7']],
      rem: ['Dice outcomes are ordered pairs.', 'Subtract the overlap.', 'Check 0 ≤ P ≤ 1.'] }
  });
})();
