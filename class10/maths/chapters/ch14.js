/*
TOOL:    class10_maths_ch14
FAMILY:  CBSE_REVISION / Class 10 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 14 Probability - revise, board focus, 2 explore panels (two-dice table, simulator), 8 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { F, Q, num, C } = G9;

  G9.register({
    no: 14, part: 'Unit VII · Statistics & Probability (11 marks)', short: 'Probability', title: 'Probability',
    blurb: 'Classical probability with equally likely outcomes: coins, dice, cards, bags, complementary events.',
    revise: {
      oneLine: 'When all outcomes are equally likely, P(E) = (favourable outcomes) ÷ (total outcomes). It lies between 0 and 1, and P(E) + P(not E) = 1.',
      sections: [
        { h: 'Theoretical probability', html: `<div class="box m">P(E) = ${F('number of outcomes favourable to E', 'total number of possible outcomes')}</div>
          <p>Valid only when outcomes are <b>equally likely</b>. 0 ≤ P(E) ≤ 1; impossible event 0, sure event 1. An <b>elementary event</b> has one outcome; the probabilities of all elementary events add to 1.</p>` },
        { h: 'Complementary events', html: `<p>P(not E) = 1 − P(E). Often easier: P(at least one head in 3 tosses) = 1 − P(no head) = 1 − 1/8 = 7/8.</p>` },
        { h: 'Standard sample spaces', html: `<ul><li>Coin: {H, T}. Two coins: {HH, HT, TH, TT}. Three coins: 8 outcomes.</li><li>Die: {1, …, 6}. Two dice: 36 ordered pairs.</li>
          <li>Deck of 52 cards: 4 suits (♠ ♣ black, ♥ ♦ red) × 13 (A, 2–10, J, Q, K). 12 face cards, 4 aces, 26 red.</li><li>Numbers 1 to n: count primes, multiples, squares carefully.</li></ul>` },
        { h: 'Careful counting', html: `<p>Leap year: 366 days = 52 weeks + 2 days, so P(53 Sundays) = 2/7. Non-leap year: 1/7.</p>
          <p>Removing cards changes the total: after removing the red face cards, 46 cards remain.</p>` }
      ],
      formulas: [['Probability', 'favourable / total'], ['Range', '0 ≤ P(E) ≤ 1'], ['Complement', 'P(Ē) = 1 − P(E)'], ['Two dice', '36 outcomes'], ['Cards', '52: 26 red, 12 face, 4 aces']],
      terms: [['Equally likely', 'each outcome has the same chance'], ['Sample space', 'set of all outcomes'], ['Complementary event', '"not E"'], ['Sure / impossible event', 'P = 1 / P = 0']],
      traps: ['Treating the 11 possible sums of two dice as equally likely.', 'Forgetting to reduce the total when cards are removed.', 'Probability greater than 1 — always a mistake.', 'Face cards are J, Q, K only (not aces).'],
      board: '<p><b>Unit VII (Statistics & Probability) — 11 marks.</b> Expect 1-mark MCQs (dice, cards, coins, complement) and a 2–3 mark question with several parts (cards removed, bag of balls, two dice).</p>',
      bridge: '<p>Class 9 Ch 7 introduced experimental and theoretical probability.</p>'
    },

    explore: [
      {
        title: 'Two dice: count the cells', intro: 'Choose an event; matching cells light up. P = lit cells ÷ 36.',
        build(el, K) {
          const evs = [['Sum = k', (a, b, k) => a + b === k], ['Sum is a prime', (a, b) => [2, 3, 5, 7, 11].includes(a + b)], ['Doublet', (a, b) => a === b], ['Product is a perfect square', (a, b) => Number.isInteger(Math.sqrt(a * b))], ['Product less than k', (a, b, k) => a * b < k], ['At least one 6', (a, b) => a === 6 || b === 6]];
          let e = 0, k = 7; const row = K.row(el); K.select(row, 'Event', evs.map(x => x[0]), i => { e = i; draw(); }); K.slider(row, 'k', 2, 36, 1, k, v => { k = v; draw(); });
          const box = K.h('div'); el.appendChild(box); const rd = K.read(el);
          function draw() { let c = 0, t = '<table class="t" style="width:auto;text-align:center"><tr><th></th>' + [1, 2, 3, 4, 5, 6].map(x => `<th>${x}</th>`).join('') + '</tr>';
            for (let a = 1; a <= 6; a++) { t += `<tr><th>${a}</th>`; for (let b = 1; b <= 6; b++) { const on = evs[e][1](a, b, k); if (on) c++; t += `<td style="${on ? 'background:var(--orange2);color:var(--orange);font-weight:700' : ''}">(${a},${b})</td>`; } t += '</tr>'; }
            box.innerHTML = t + '</table>'; rd.innerHTML = `${c} favourable of 36 ⇒ P = ${F(c, 36)} = <b>${Q(c, 36)}</b> · P(not E) = ${Q(36 - c, 36)}`; }
          draw(); return null;
        }
      },
      {
        title: 'Card picker', intro: 'Pick an event on a 52-card deck. Optionally remove cards first and watch the total change.',
        build(el, K) {
          const suits = ['♠', '♣', '♥', '♦'], ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
          const deck = []; suits.forEach((s, si) => ranks.forEach(r => deck.push({ s, r, red: si >= 2, face: ['J', 'Q', 'K'].includes(r) })));
          const evs = [['a king', c => c.r === 'K'], ['a red card', c => c.red], ['a face card', c => c.face], ['a spade', c => c.s === '♠'], ['a black face card', c => c.face && !c.red], ['an ace', c => c.r === 'A'], ['not a face card', c => !c.face]];
          const rem = [['nothing removed', () => false], ['remove all red face cards', c => c.face && c.red], ['remove all aces', c => c.r === 'A'], ['remove the hearts', c => c.s === '♥']];
          let e = 0, r = 0; const row = K.row(el); K.select(row, 'Event', evs.map(x => x[0]), i => { e = i; draw(); }); K.select(row, 'First', rem.map(x => x[0]), i => { r = i; draw(); });
          const rd = K.read(el);
          function draw() { const d = deck.filter(c => !rem[r][1](c)), f = d.filter(evs[e][1]);
            rd.innerHTML = `<div style="font-size:15px;line-height:1.9">${deck.map(c => { const gone = rem[r][1](c), on = !gone && evs[e][1](c); return `<span style="display:inline-block;width:40px;text-align:center;border:1px solid var(--line);border-radius:4px;margin:1px;${gone ? 'opacity:.2;text-decoration:line-through' : on ? 'background:var(--orange2);font-weight:700' : ''};color:${c.red ? 'var(--purple)' : 'var(--ink)'}">${c.r}${c.s}</span>`; }).join('')}</div>Cards left ${d.length}; favourable ${f.length} ⇒ P(${evs[e][0]}) = <b>${Q(f.length, d.length)}</b>`; }
          draw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Single die', levels: [1, 2], gen(R) {
          const evs = [['a prime number', 3], ['a number between 2 and 6', 3], ['an odd number', 3], ['a number greater than 4', 2], ['a number less than 7', 6], ['8', 0], ['a multiple of 3', 2]];
          const [t, c] = R.pick(evs); return { q: `A die is thrown once. Find the probability of getting ${t}.`, a: Q(c, 6), ans: c / 6, tol: 0.005 };
        } },
      { title: 'Cards', gen(R, L) {
          const evs = [['a king of red colour', 2], ['a face card', 12], ['a red face card', 6], ['the jack of hearts', 1], ['a spade', 13], ['the queen of diamonds', 1], ['an ace', 4], ['not a face card', 40]];
          if (L === 3) { const e = R.pick([['a heart', 13 - 3, 'red face cards'], ['a queen', 2, 'red face cards'], ['a red card', 20, 'red face cards']]); return { q: `All the red face cards are removed from a deck of 52. A card is drawn from the rest. Find P(${e[0]}).`, a: Q(e[1], 46), ans: e[1] / 46, tol: 0.003, s: '46 cards remain' }; }
          const [t, c] = R.pick(evs); return { q: `One card is drawn from a well-shuffled deck of 52. Find P(${t}).`, a: Q(c, 52), ans: c / 52, tol: 0.003 };
        } },
      { title: 'Two dice', levels: [2, 3], gen(R) {
          const t = R.int(0, 2);
          if (t === 0) { const k = R.int(2, 12), c = 6 - Math.abs(7 - k); return { q: `Two dice are thrown together. Find the probability that the sum is ${k}.`, a: Q(c, 36), ans: c / 36, tol: 0.003, s: `${c} of 36 outcomes` }; }
          if (t === 1) return { q: 'Two dice are thrown. Find the probability that the same number appears on both.', a: '1/6', ans: 1 / 6, tol: 0.003, s: '6 doublets' };
          return { q: 'Two dice are thrown. Find the probability that the product of the numbers is a perfect square.', a: '2/9', ans: 8 / 36, tol: 0.003, s: '(1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(1,4),(4,1) → 8' };
        } },
      { title: 'Coins', levels: [1, 2], gen(R) {
          const n = R.pick([2, 3]), w = R.pick(['exactly one head', 'at least one head', 'no head', 'at most one head']);
          const tot = 2 ** n, c = { 'exactly one head': n, 'at least one head': tot - 1, 'no head': 1, 'at most one head': n + 1 }[w];
          return { q: `${n} coins are tossed together. Find the probability of getting ${w}.`, a: Q(c, tot), ans: c / tot, tol: 0.003, s: `${tot} outcomes` };
        } },
      { title: 'Bag of balls', gen(R, L) {
          const r = R.int(2, 9), b = R.int(2, 9), g = R.int(1, 7), t = r + b + g;
          if (L === 3) { const x = R.int(2, 6), y = R.int(1, 3); return { q: `A bag contains ${x} red balls and some blue balls. The probability of a blue ball is ${y} times that of a red ball. Find the number of blue balls.`, a: String(x * y), ans: x * y, s: `b/(x + b) = ${y} × ${x}/(x + b) ⇒ b = ${y}x` }; }
          return { q: `A bag has ${r} red, ${b} blue and ${g} green balls. One ball is drawn. Find P(red), P(not green).`, a: `${Q(r, t)}, ${Q(r + b, t)}`, s: `total ${t}` };
        } },
      { title: 'Numbers 1 to n', gen(R) {
          const n = R.pick([20, 25, 30, 50, 90, 100]), t = R.pick(['a prime number', 'a perfect square', 'a multiple of 5', 'a two-digit number']);
          const all = Array.from({ length: n }, (_, i) => i + 1); const isP = (x) => { if (x < 2) return false; for (let d = 2; d * d <= x; d++) if (x % d === 0) return false; return true; };
          const c = all.filter(x => t === 'a prime number' ? isP(x) : t === 'a perfect square' ? Number.isInteger(Math.sqrt(x)) : t === 'a multiple of 5' ? x % 5 === 0 : x >= 10 && x <= 99).length;
          return { q: `A number is chosen at random from 1 to ${n}. Find the probability that it is ${t}.`, a: Q(c, n), ans: c / n, tol: 0.003, s: `${c} favourable of ${n}` };
        } },
      { title: 'Complement', levels: [1], gen(R) {
          const p = R.int(1, 99) / 100; return { q: `If P(E) = ${num(p)}, what is P(not E)?`, a: num(1 - p), ans: 1 - p, s: '1 − P(E)' };
        } },
      { title: '53 Sundays', levels: [2, 3], gen(R) {
          const leap = R.chance(.5); return { q: `Find the probability that a ${leap ? 'leap' : 'non-leap'} year selected at random has 53 Sundays.`, a: leap ? '2/7' : '1/7', ans: leap ? 2 / 7 : 1 / 7, tol: 0.003, s: leap ? '366 = 52 weeks + 2 days; 7 possible pairs of extra days, 2 contain Sunday' : '365 = 52 weeks + 1 day' };
        } }
    ],

    quiz: [
      { q: 'Probability of a sure event', o: ['0', '1', '½', '−1'], a: 1, e: 'Certain.' },
      { q: 'P(E) = 0.05. P(not E) =', o: ['0.95', '0.05', '1.05', '0.5'], a: 0, e: '1 − 0.05.' },
      { q: 'A card from 52: P(red king)', o: ['1/26', '1/13', '1/52', '2/13'], a: 0, e: '2/52.' },
      { q: 'Two dice: P(sum 7)', o: ['1/6', '1/12', '7/36', '1/9'], a: 0, e: '6/36.' },
      { q: 'Which cannot be a probability?', o: ['2/3', '−1.5', '15%', '0.7'], a: 1, e: 'Negative.' },
      { q: 'A die: P(number less than 1)', o: ['0', '1/6', '1', '1/2'], a: 0, e: 'Impossible.' },
      { q: 'Number of face cards in a deck', o: ['12', '16', '4', '13'], a: 0, e: 'J, Q, K × 4 suits.' },
      { q: 'P(53 Sundays in a leap year)', o: ['2/7', '1/7', '1/52', '53/366'], a: 0, e: 'Two extra days.' },
      { q: 'Two coins: P(at least one head)', o: ['3/4', '1/2', '1/4', '1'], a: 0, e: '1 − 1/4.' },
      { q: 'Sum of probabilities of all elementary events', o: ['0', '1', 'can be > 1', 'depends'], a: 1, e: 'Always 1.' },
      { q: 'From 1 to 20, P(prime)', o: ['2/5', '9/20', '1/2', '3/10'], a: 0, e: '2, 3, 5, 7, 11, 13, 17, 19: 8/20.' }
    ],

    teach: {
      outcomes: ['Compute classical probability for equally likely outcomes', 'Use complementary events', 'Work with dice, coins, cards and number problems'],
      periods: [
        { t: 'Classical probability', flow: [['10 min', 'Recap experimental vs theoretical.'], ['15 min', 'Dice and coins; complement.'], ['15 min', 'Explore panel 1: two dice.']] },
        { t: 'Cards and mixed problems', flow: [['15 min', 'Explore panel 2: deck structure; cards removed.'], ['15 min', 'Bags, numbers, leap years.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Sums of dice equally likely.', 'Face cards include aces.', 'Total not reduced after removal.'],
      activities: ['Real deck of cards sorting by suit/colour/face.', 'Leap-year calendar investigation.'],
      exit: ['P(black face card).', 'Two dice: P(sum 9).', 'P(not a prime) from 1–10.'],
      homework: 'A box has 90 discs numbered 1 to 90. Find P(two-digit number), P(perfect square), P(divisible by 5).'
    },

    slides: [
      { t: 'Probability', b: ['P(E) = favourable / total', 'Complementary events', 'Dice, coins, cards'] },
      { t: 'Rules', b: ['0 ≤ P(E) ≤ 1', 'P(not E) = 1 − P(E)', 'Elementary events sum to 1'] },
      { t: 'Sample spaces', b: ['Coin 2, die 6', 'Two coins 4, three coins 8', 'Two dice 36', 'Cards 52'] },
      { t: 'Cards', b: ['4 suits × 13', '26 red, 26 black', '12 face cards, 4 aces'] },
      { t: 'Check yourself', b: ['P(king) from 52?', 'Two dice: P(doublet)?', 'Answers: 1/13 · 1/6'] }
    ],

    fs: { groups: [
        ['Rules', [['P(E)', 'favourable ÷ total (equally likely)'], ['Range', '0 ≤ P(E) ≤ 1'], ['Complement', 'P(not E) = 1 − P(E)'], ['Sure / impossible', '1 / 0']]],
        ['Sample spaces', [['Coin', 'H, T'], ['Two / three coins', '4 / 8 outcomes'], ['Die', '1–6'], ['Two dice', '36 ordered pairs'], ['Sum s of two dice', 'ways = 6 − |7 − s|']]],
        ['Deck of 52 cards', [['Suits', '♠ ♣ black, ♥ ♦ red, 13 each'], ['Face cards', 'J, Q, K: 12 (6 red)'], ['Aces', '4'], ['Cards removed', 'reduce the total']]],
        ['Special counts', [['Primes 1–20', '2, 3, 5, 7, 11, 13, 17, 19 (8)'], ['Squares 1–100', '10'], ['53 Sundays', 'leap 2/7, non-leap 1/7']]]],
      ex: [['Red face card from 52', '6/52 = 3/26'], ['Two dice, sum 8', '(2,6),(3,5),(4,4),(5,3),(6,2) ⇒ 5/36']],
      rem: ['Count ordered pairs for two dice.', 'Face cards are J, Q, K.', 'Reduce fractions; check 0 ≤ P ≤ 1.'] }
  });
})();
