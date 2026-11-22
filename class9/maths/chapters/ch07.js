/*
TOOL:    class9_maths_ch07
FAMILY:  CBSE_REVISION / Class 9 Maths (Ganita Manjari)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class 9 Maths full build
CHANGES: 1.0.0 - Ch 7 The Mathematics of Maybe: Introduction to Probability - revise, 3 explore panels (simulator, two-dice table, tree), 9 generators, quiz, lesson plan, slides
*/
(function () {
  const { F, Q, num, C } = G9;

  G9.register({
    no: 7, part: 'Part I', short: 'Probability', title: 'The Mathematics of Maybe: Introduction to Probability',
    blurb: 'Randomness, experimental and theoretical probability, outcome tables, tree diagrams.',
    revise: {
      oneLine: 'Probability measures how likely an event is, on a scale from 0 (impossible) to 1 (certain). We can estimate it by experiment (relative frequency) or calculate it by counting equally likely outcomes.',
      sections: [
        { h: 'The language of chance', html: `<ul><li><b>Random experiment</b>: outcome cannot be predicted (tossing a coin, rolling a die).</li>
          <li><b>Outcome</b>: one possible result. <b>Sample space</b>: list of all outcomes, e.g. die → {1, 2, 3, 4, 5, 6}.</li>
          <li><b>Event</b>: a collection of outcomes, e.g. "even number" = {2, 4, 6}.</li></ul>` },
        { h: 'Experimental (empirical) probability', html: `<div class="box m">P(E) ≈ ${F('number of trials in which E happened', 'total number of trials')}</div>
          <p>It changes from experiment to experiment, but as the number of trials grows it settles near the theoretical value (<b>law of large numbers</b>). Use the simulator in Explore to see this.</p>` },
        { h: 'Theoretical (classical) probability', html: `<p>If all outcomes are <b>equally likely</b>:</p><div class="box m">P(E) = ${F('number of outcomes favourable to E', 'total number of outcomes')}</div>
          <p>0 ≤ P(E) ≤ 1. P(impossible) = 0, P(sure) = 1. <b>P(not E) = 1 − P(E)</b>.</p>` },
        { h: 'Outcome tables and tree diagrams', html: `<p><b>Two dice</b>: a 6 × 6 table gives 36 equally likely outcomes. Sum 7 occurs 6 times ⇒ P = ${F(6, 36)} = ${F(1, 6)}.</p>
          <p><b>Tree diagram</b>: each branch is one stage. Three coins → 2 × 2 × 2 = 8 outcomes; P(exactly two heads) = ${F(3, 8)}. Multiply along a path; add across paths.</p>` },
        { h: 'Careful!', html: `<p>"Sum of two dice" has 11 possible values (2 to 12) but they are <b>not</b> equally likely — count in the 36-cell table, not over the 11 sums.</p>` }
      ],
      formulas: [['Experimental', 'P ≈ (times E happened) / (trials)'], ['Theoretical', 'P = favourable / total (equally likely)'], ['Range', '0 ≤ P(E) ≤ 1'], ['Complement', 'P(not E) = 1 − P(E)'], ['Two dice', '36 outcomes'], ['n coins', '2ⁿ outcomes']],
      terms: [['Sample space', 'set of all possible outcomes'], ['Event', 'a set of outcomes'], ['Equally likely', 'each outcome has the same chance'], ['Complement', '"not E": all outcomes not in E']],
      traps: ['Treating the 11 sums of two dice as equally likely.', 'Gambler\'s fallacy: after 5 heads, a tail is NOT "due". Each toss is still ½.', 'Answers greater than 1 or negative — impossible for a probability.', 'Forgetting to reduce: 6/36 should be 1/6.'],
      bridge: '<p>Ch 10 (data) studies frequencies and proportions; Ch 11 (algorithms) can list all outcomes systematically.</p>'
    },

    explore: [
      {
        title: 'Simulator: experiment vs theory', intro: 'Choose an experiment. Each step runs 10 more trials. Watch the experimental probability settle near the theoretical value.',
        build(el, K) {
          const exps = [['Coin shows Heads', 1 / 2, R => R.r() < .5], ['Die shows 6', 1 / 6, R => R.int(1, 6) === 6], ['Die shows an even number', 1 / 2, R => R.int(1, 6) % 2 === 0], ['Two dice: sum = 7', 1 / 6, R => R.int(1, 6) + R.int(1, 6) === 7], ['Two dice: doubles', 1 / 6, R => R.int(1, 6) === R.int(1, 6)], ['Two coins: both heads', 1 / 4, R => R.r() < .5 && R.r() < .5]];
          let e = 0, R = G9.rng(G9.newSeed()), n = 0, hits = 0, hist = [];
          const row = K.row(el); K.select(row, 'Experiment', exps.map(x => x[0]), i => { e = i; reset(); });
          const b = new K.Board(el, { xmin: -40, xmax: 520, ymin: -0.08, ymax: 1.05, equal: false, axes: false, grid: 0, aspect: 0.42 });
          const rd = K.read(el);
          function reset() { R = G9.rng(G9.newSeed()); n = 0; hits = 0; hist = []; b.redraw(); }
          function run(k) { for (let j = 0; j < k; j++) { n++; if (exps[e][2](R)) hits++; } hist.push([n, hits / n]); b.redraw(); }
          const an = new K.Anim(Infinity, () => run(10), { ms: 120 });
          an.reset = () => { an.pause(); reset(); };
          b.onDraw = () => {
            b.clear(); const xmax = Math.max(500, n);
            if (b.o.xmax !== xmax + 20) { b.o.xmax = xmax + 20; b.o.xmin = -0.08 * xmax; b._fit(); }
            for (let y = 0; y <= 1.001; y += 0.25) { b.line(0, y, xmax, y, { color: C.grid, w: 1 }); b.text(-10, y, num(y), { font: '11px', align: 'right' }); }
            b.line(0, 0, xmax, 0, { color: C.axis, w: 2 }); b.line(0, 0, 0, 1, { color: C.axis, w: 2 });
            const p = exps[e][1]; b.line(0, p, xmax, p, { color: C.orange, w: 3, dash: [8, 5] }); b.text(xmax, p + 0.05, 'theory ' + num(p, 3), { font: 'bold 13px', color: C.orange, align: 'right' });
            if (hist.length > 1) { const c = b.ctx; c.save(); c.strokeStyle = C.blue; c.lineWidth = 3; c.beginPath(); hist.forEach(([x, y], i) => i ? c.lineTo(b.X(x), b.Y(y)) : c.moveTo(b.X(x), b.Y(y))); c.stroke(); c.restore(); }
            b.text(xmax / 2, -0.05, 'number of trials', { font: '12px' }); [0, xmax / 2, xmax].forEach(x => b.text(x, -0.05, String(Math.round(x)), { font: '11px' }));
            rd.innerHTML = n ? `Trials: <b>${n}</b> · event happened <b>${hits}</b> times · experimental P = ${hits}/${n} = <b>${num(hits / n, 3)}</b> · theoretical P = ${num(p, 3)} · difference ${num(Math.abs(hits / n - p), 3)}` : 'Press Play or Step.';
          };
          K.anim(el, an); b.redraw(); return an;
        }
      },
      {
        title: 'Two dice: the 36-outcome table', intro: 'Pick an event; the matching cells light up. Probability = lit cells ÷ 36.',
        build(el, K) {
          const evs = [['Sum = k', (a, b, k) => a + b === k], ['Sum ≥ k', (a, b, k) => a + b >= k], ['Doubles', (a, b) => a === b], ['Product is even', (a, b) => (a * b) % 2 === 0], ['At least one die shows k (1–6)', (a, b, k) => a === k || b === k], ['First die > second die', (a, b) => a > b]];
          let e = 0, k = 7; const row = K.row(el); K.select(row, 'Event', evs.map(x => x[0]), i => { e = i; draw(); });
          K.slider(row, 'k', 1, 12, 1, k, v => { k = v; draw(); });
          const box = K.h('div'); el.appendChild(box); const rd = K.read(el);
          function draw() {
            let cnt = 0, t = '<table class="t" style="width:auto;text-align:center;font-size:17px"><tr><th>1st \\ 2nd</th>' + [1, 2, 3, 4, 5, 6].map(x => `<th>${x}</th>`).join('') + '</tr>';
            for (let a = 1; a <= 6; a++) { t += `<tr><th>${a}</th>`; for (let bb = 1; bb <= 6; bb++) { const on = evs[e][1](a, bb, k); if (on) cnt++; t += `<td style="${on ? 'background:var(--orange2);font-weight:700;color:var(--orange)' : ''}">${a + bb}</td>`; } t += '</tr>'; }
            box.innerHTML = t + '</table><div class="muted">Each cell shows the sum. Highlighted = favourable.</div>';
            rd.innerHTML = `Favourable = <b>${cnt}</b> of 36 ⇒ P = ${F(cnt, 36)} = <b>${Q(cnt, 36)}</b> ≈ ${num(cnt / 36, 3)} &nbsp;·&nbsp; P(not E) = ${Q(36 - cnt, 36)}`;
          }
          draw(); return null;
        }
      },
      {
        title: 'Tree diagram: tossing three coins', intro: 'Each step adds one more coin. Count the paths with exactly k heads.',
        build(el, K) {
          let k = 2; const row = K.row(el); K.slider(row, 'k heads', 0, 3, 1, k, v => { k = v; b.redraw(); });
          const b = new K.Board(el, { xmin: 0, xmax: 16, ymin: 0, ymax: 9, axes: false, grid: 0, equal: false, aspect: 0.5 });
          const rd = K.read(el); const an = new K.Anim(4, () => b.redraw(), { ms: 1000 }); an.i = 3;
          b.onDraw = () => {
            b.clear(); const lv = an.i; const xs = [1, 5, 9, 13];
            const nodes = [[{ y: 4.5, s: '' }]];
            for (let l = 1; l <= 3; l++) { nodes[l] = []; nodes[l - 1].forEach((nd, i) => { const gap = 8 / 2 ** l; ['H', 'T'].forEach((c, j) => nodes[l].push({ y: nd.y + (j ? -gap / 2 : gap / 2), s: nd.s + c, p: nd })); }); }
            b.text(xs[0], 4.5, 'start', { font: 'bold 13px' });
            for (let l = 1; l <= lv; l++) nodes[l].forEach(nd => {
              const hit = l === 3 && (nd.s.split('H').length - 1) === k;
              b.line(xs[l - 1] + 0.6, nd.p.y, xs[l] - 0.4, nd.y, { color: hit ? C.orange : C.blue, w: hit ? 3.5 : 2 });
              b.text(xs[l], nd.y, nd.s.slice(-1), { font: 'bold 16px', color: nd.s.slice(-1) === 'H' ? C.blue : C.purple });
              if (l === 3) b.text(15, nd.y, nd.s, { font: hit ? 'bold 15px' : '14px', color: hit ? C.orange : C.ink });
            });
            const c = [1, 3, 3, 1][k];
            rd.innerHTML = lv < 3 ? `After ${lv} coin(s): ${2 ** lv} outcomes.` : `8 equally likely outcomes. Exactly ${k} head${k === 1 ? '' : 's'}: <b>${c}</b> path${c > 1 ? 's' : ''} ⇒ P = <b>${Q(c, 8)}</b>`;
          };
          K.anim(el, an); b.redraw(); return an;
        }
      }
    ],

    gens: [
      { title: 'Experimental probability from data', gen(R) {
          const N = R.pick([100, 200, 250, 400, 500, 1000]), h = R.int(Math.round(N * .4), Math.round(N * .6));
          return { q: `A coin is tossed ${N} times and shows heads ${h} times. Find the experimental probability of (i) heads (ii) tails.`, a: `(i) ${Q(h, N)} (ii) ${Q(N - h, N)}`, s: `${h}/${N} and ${N - h}/${N}` };
        } },
      { title: 'One die', levels: [1, 2], gen(R) {
          const evs = [['an even number', [2, 4, 6]], ['a prime number', [2, 3, 5]], ['a number greater than 4', [5, 6]], ['a multiple of 3', [3, 6]], ['a number less than 7', [1, 2, 3, 4, 5, 6]], ['the number 8', []], ['a factor of 6', [1, 2, 3, 6]]];
          const [t, s] = R.pick(evs);
          return { q: `A fair die is rolled once. Find the probability of getting ${t}.`, a: Q(s.length, 6), ans: s.length / 6, tol: 0.005, s: `Favourable: {${s.join(', ') || '—'}} → ${s.length} of 6` };
        } },
      { title: 'Bag of coloured balls', gen(R, L) {
          const r = R.int(2, 9), bl = R.int(2, 9), y = R.int(1, 7), tot = r + bl + y;
          if (L === 3) return { q: `A bag has ${r} red and some blue balls. The probability of drawing a red ball is ${Q(r, r + bl)}. How many blue balls are there?`, a: String(bl), ans: bl, s: `${r}/(${r} + b) = ${Q(r, r + bl)} ⇒ b = ${bl}` };
          const pick = R.pick([['red', r], ['blue', bl], ['yellow', y], ['not yellow', r + bl], ['red or blue', r + bl]]);
          return { q: `A bag has ${r} red, ${bl} blue and ${y} yellow balls. One ball is drawn at random. Find P(${pick[0]}).`, a: Q(pick[1], tot), ans: pick[1] / tot, tol: 0.005, s: `${pick[1]} favourable out of ${tot}` };
        } },
      { title: 'Two dice', levels: [2, 3], gen(R) {
          const k = R.int(2, 12), c = 6 - Math.abs(7 - k);
          return R.chance(.5) ? { q: `Two dice are rolled. Find the probability that the sum is ${k}.`, a: Q(c, 36), ans: c / 36, tol: 0.003, s: `${c} of the 36 cells in the outcome table have sum ${k}` }
            : { q: 'Two dice are rolled. Find the probability of getting a doublet (same number on both).', a: '1/6', ans: 1 / 6, tol: 0.003, s: '(1,1), (2,2), …, (6,6): 6 of 36' };
        } },
      { title: 'Complement', levels: [1, 2], gen(R) {
          const p = R.int(1, 99);
          return { q: `The probability that it rains tomorrow is ${num(p / 100)}. What is the probability that it does not rain?`, a: num(1 - p / 100), ans: 1 - p / 100, s: `1 − ${num(p / 100)}` };
        } },
      { title: 'Coins and tree diagrams', gen(R, L) {
          const n = L === 1 ? 2 : 3, k = R.int(0, n), c = n === 2 ? [1, 2, 1][k] : [1, 3, 3, 1][k], tot = 2 ** n;
          const w = R.chance(.3) && k > 0 ? 'at least ' + k : 'exactly ' + k; const cc = w.startsWith('at') ? (n === 2 ? [1, 2, 1] : [1, 3, 3, 1]).slice(k).reduce((a, b) => a + b, 0) : c;
          return { q: `${n} fair coins are tossed. Find the probability of getting ${w} head${k === 1 ? '' : 's'}.`, a: Q(cc, tot), ans: cc / tot, tol: 0.003, s: `${tot} equally likely outcomes; ${cc} favourable` };
        } },
      { title: 'Playing cards', levels: [2, 3], gen(R) {
          const ev = R.pick([['a king', 4], ['a red card', 26], ['a spade', 13], ['a face card (J, Q, K)', 12], ['the queen of hearts', 1], ['not an ace', 48], ['a red face card', 6]]);
          return { q: `A card is drawn at random from a well-shuffled deck of 52. Find P(${ev[0]}).`, a: Q(ev[1], 52), ans: ev[1] / 52, tol: 0.002, s: `${ev[1]} favourable of 52` };
        } },
      { title: 'Spinner', levels: [1, 2], gen(R) {
          const n = R.pick([4, 5, 6, 8, 10]), lab = Array.from({ length: n }, (_, i) => i + 1), ev = R.pick([['an odd number', x => x % 2], ['a number greater than 2', x => x > 2], ['a multiple of 4', x => x % 4 === 0]]);
          const c = lab.filter(ev[1]).length;
          return { q: `A spinner has ${n} equal sectors numbered 1 to ${n}. Find the probability of landing on ${ev[0]}.`, a: Q(c, n), ans: c / n, tol: 0.003, s: `${c} of ${n} sectors` };
        } },
      { title: 'Two draws without replacement', levels: [3], gen(R) {
          const r = R.int(2, 6), bl = R.int(2, 6), t = r + bl;
          return { q: `A box has ${r} red and ${bl} blue pens. Two are taken one after the other without replacement. Find the probability both are red.`, a: Q(r * (r - 1), t * (t - 1)), ans: r * (r - 1) / (t * (t - 1)), tol: 0.003, s: `${F(r, t)} × ${F(r - 1, t - 1)} (multiply along the tree path)` };
        } }
    ],

    quiz: [
      { q: 'Probability of an impossible event is', o: ['1', '0', '½', '−1'], a: 1, e: 'Impossible ⇒ 0.' },
      { q: 'A die is rolled. P(number > 4) =', o: ['1/3', '1/2', '2/3', '1/6'], a: 0, e: '{5, 6}: 2/6.' },
      { q: 'Which cannot be a probability?', o: ['0.7', '3/5', '1.2', '0'], a: 2, e: 'Probabilities lie between 0 and 1.' },
      { q: 'P(E) = 0.35. P(not E) =', o: ['0.35', '0.65', '0.5', '1.35'], a: 1, e: '1 − 0.35.' },
      { q: 'Two coins: P(at least one head) =', o: ['1/4', '1/2', '3/4', '1'], a: 2, e: 'HH, HT, TH of 4.' },
      { q: 'Two dice: P(sum = 12) =', o: ['1/12', '1/36', '1/6', '1/11'], a: 1, e: 'Only (6, 6).' },
      { q: 'A coin shows 5 heads in a row. The 6th toss gives heads with probability', o: ['less than ½', '½', 'more than ½', '0'], a: 1, e: 'Coins have no memory.' },
      { q: 'Out of 200 bulbs tested, 12 were defective. Experimental P(defective) =', o: ['0.06', '0.12', '0.6', '12'], a: 0, e: '12/200 = 0.06.' },
      { q: 'Three coins are tossed. Number of outcomes is', o: ['3', '6', '8', '9'], a: 2, e: '2³ = 8.' },
      { q: 'Sum of probabilities of all outcomes of an experiment is', o: ['0', '1', 'depends', '100'], a: 1, e: 'Something must happen.' },
      { q: 'As the number of trials grows, experimental probability', o: ['becomes 0', 'settles near the theoretical value', 'becomes 1', 'keeps growing'], a: 1, e: 'Law of large numbers.' }
    ],

    teach: {
      outcomes: ['Use the vocabulary: experiment, outcome, sample space, event', 'Compute experimental probability from data', 'Compute theoretical probability for equally likely outcomes, using tables and trees', 'Explain why experimental values approach theoretical ones'],
      periods: [
        { t: 'Experiments', flow: [['5 min', 'Prediction poll: if we toss a coin 20 times, how many heads?'], ['15 min', 'Each pair tosses a coin 20 times; pool class data; compute relative frequency.'], ['15 min', 'Explore panel 1: run thousands of trials; law of large numbers.'], ['5 min', 'Exit ticket Q1.']] },
        { t: 'Theoretical probability', flow: [['10 min', 'Equally likely outcomes; P = favourable / total; complement.'], ['15 min', 'Dice, cards, spinners, bags (Practice, Standard).'], ['15 min', 'Explore panel 2: two-dice table; why sums are not equally likely.']] },
        { t: 'Tree diagrams', flow: [['15 min', 'Explore panel 3: three coins.'], ['15 min', 'Two draws without replacement (HOTS).'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Gambler\'s fallacy.', 'Counting the 11 sums of two dice as equally likely.', 'Believing an experiment "should" give exactly the theoretical value.'],
      activities: ['Class coin/dice experiment with a tally chart on the board.', 'Make spinners from cardboard and test fairness.', 'Birthday-month survey: experimental probability of a classmate born in each month.'],
      exit: ['P(prime) on one die?', 'P(not a king) from 52 cards?', 'Two coins: P(exactly one tail)?'],
      homework: 'Toss a coin 50 times at home; record H/T and compute the experimental probability after 10, 20, 30, 40, 50 tosses.'
    },

    slides: [
      { t: 'The Mathematics of Maybe', b: ['Random experiments', 'Experimental probability', 'Theoretical probability', 'Tables and tree diagrams'] },
      { t: 'Vocabulary', b: ['Outcome: one possible result', 'Sample space: all outcomes', 'Event: a set of outcomes', 'Example: die, event "even" = {2, 4, 6}'] },
      { t: 'Experimental probability', b: ['P ≈ (times E happened) ÷ (trials)', 'Changes from experiment to experiment', 'Settles near the true value with many trials'] },
      { t: 'Theoretical probability', b: ['Equally likely outcomes', 'P(E) = favourable ÷ total', '0 ≤ P ≤ 1', 'P(not E) = 1 − P(E)'] },
      { t: 'Two dice', b: ['6 × 6 = 36 outcomes', 'Sum 7: 6 ways ⇒ 1/6', 'Sum 2 or 12: 1 way ⇒ 1/36', 'Sums are NOT equally likely'] },
      { t: 'Tree diagrams', b: ['Three coins: 8 paths', 'Exactly two heads: HHT, HTH, THH ⇒ 3/8', 'Multiply along a path, add across paths'] },
      { t: 'Check yourself', b: ['P(red card) from 52?', 'P(sum 8) with two dice?', 'P(no head) with 3 coins?', 'Answers: 1/2 · 5/36 · 1/8'] }
    ]
  });
})();
