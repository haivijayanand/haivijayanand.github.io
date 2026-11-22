/*
TOOL:    class8_maths_ch05
FAMILY:  CBSE_REVISION / Class 8 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class VIII moved into the series
CHANGES: 1.0.0 - Part I Ch 5 Number Play - revise, 2 explore panels (divisibility tests from place value, sums of consecutive numbers), 7 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num } = G9;

  G9.register({
    no: 5, part: 'Part I', short: 'Number play', title: 'Number Play',
    blurb: 'Parity, sums of consecutive numbers, why divisibility rules work, remainders and digit puzzles — proved with algebra and place value.',
    revise: {
      oneLine: 'Writing numbers with letters lets us prove patterns for every number at once: even = 2k, odd = 2k + 1; a 3-digit number abc = 100a + 10b + c, which explains the tests for 3, 9, 4, 8 and 11.',
      sections: [
        { h: 'Parity', html: `<p>Even: 2k; odd: 2k + 1. even ± even = even, odd ± odd = even, even ± odd = odd; odd × odd = odd, anything × even = even. A sum of n odd numbers is even when n is even.</p>` },
        { h: 'Consecutive numbers', html: `<p>Sum of 3 consecutive numbers n + (n + 1) + (n + 2) = 3(n + 1): a multiple of 3. Sum of 5 consecutive numbers is a multiple of 5. Powers of 2 cannot be written as a sum of two or more consecutive positive numbers.</p>` },
        { h: 'Divisibility rules — why they work', html: `<ul><li>abc = 100a + 10b + c = 99a + 9b + (a + b + c): divisible by 9 (or 3) iff the digit sum is.</li><li>100 is a multiple of 4, so only the last two digits matter; 1000 is a multiple of 8, so the last three.</li>
          <li>abc = 99a + 11b + (a − b + c) − … : 11 divides a number iff it divides the alternating sum of digits.</li><li>Divisible by 6 ⇔ by 2 and 3; by 12 ⇔ by 3 and 4 (co-prime factors).</li></ul>` },
        { h: 'Remainders', html: `<p>Every number leaves remainder 0, 1, … , d − 1 on division by d: n = dq + r. Remainders add and multiply: the remainder of a sum is the remainder of the sum of remainders. Digital root = remainder on division by 9 (9 if 0).</p>` }
      ],
      formulas: [['Even / odd', '2k / 2k + 1'], ['Two-digit number', '10a + b'], ['Three-digit number', '100a + 10b + c'], ['ab + ba', '11(a + b)'], ['ab − ba', '9(a − b)'], ['Division', 'n = dq + r, 0 ≤ r < d']],
      terms: [['Parity', 'even or odd'], ['Digit sum', 'sum of digits'], ['Alternating sum', 'a − b + c − …'], ['Co-prime', 'HCF 1']],
      traps: ['Divisible by 2 and 4 does not mean divisible by 8.', 'Digit sum tests only work for 3 and 9.', 'Checking examples is not a proof.', 'For 11, take the alternating sum, not the digit sum.'],
      bridge: '<p>Ch 13 (Algebra Play) uses the same letter-numbers to explain tricks; Class 9 Ch 9 formalises proof.</p>'
    },

    explore: [
      {
        title: 'Divisibility tests from place value', intro: 'Type a number. Each test is shown with the reason: the parts that are always multiples are dropped.',
        build(el, K) {
          const row = K.row(el); row.innerHTML = '<label>number <input type="number" id="dv" value="7392" style="width:9em"></label>'; const rd = K.read(el);
          const go = () => { const n = Math.abs(parseInt(row.querySelector('input').value) || 0); const ds = String(n).split('').map(Number); const sum = ds.reduce((a, b) => a + b, 0);
            const alt = ds.slice().reverse().reduce((a, d, i) => a + (i % 2 ? -d : d), 0); const yn = (v) => v ? '<b>yes</b>' : 'no';
            rd.innerHTML = `<table class="t" style="width:auto"><tr><th>by</th><th>test</th><th>result</th></tr>
              <tr><td>2</td><td>last digit ${n % 10} even?</td><td>${yn(n % 2 === 0)}</td></tr>
              <tr><td>3</td><td>digit sum ${sum} divisible by 3?</td><td>${yn(n % 3 === 0)}</td></tr>
              <tr><td>4</td><td>last two digits ${n % 100} divisible by 4? (100 is a multiple of 4)</td><td>${yn(n % 4 === 0)}</td></tr>
              <tr><td>5</td><td>last digit 0 or 5?</td><td>${yn(n % 5 === 0)}</td></tr>
              <tr><td>6</td><td>by 2 and by 3?</td><td>${yn(n % 6 === 0)}</td></tr>
              <tr><td>8</td><td>last three digits ${n % 1000} divisible by 8? (1000 = 8 × 125)</td><td>${yn(n % 8 === 0)}</td></tr>
              <tr><td>9</td><td>digit sum ${sum} divisible by 9? (10ᵏ − 1 is a multiple of 9)</td><td>${yn(n % 9 === 0)}</td></tr>
              <tr><td>11</td><td>alternating sum ${alt} divisible by 11?</td><td>${yn(n % 11 === 0)}</td></tr></table>`; };
          row.querySelector('input').addEventListener('input', go); go(); return null;
        }
      },
      {
        title: 'Sums of consecutive numbers', intro: 'Choose the start and how many numbers. Dot staircases show why 3 consecutive numbers always make a multiple of 3.',
        build(el, K) {
          let a = 4, k = 3; const row = K.row(el); K.slider(row, 'start', 1, 12, 1, a, v => { a = v; bd.redraw(); }); K.slider(row, 'how many', 2, 7, 1, k, v => { k = v; bd.redraw(); });
          const bd = new K.Board(el, { xmin: -0.5, xmax: 8, ymin: -0.5, ymax: 20, axes: false, grid: 0, equal: false, aspect: 0.45 }); const rd = K.read(el);
          bd.onDraw = () => { bd.clear(); let s = 0; const avg = a + (k - 1) / 2; for (let i = 0; i < k; i++) { const v = a + i; s += v; for (let j = 0; j < v; j++) bd.dot(i + 0.5, j + 0.5, { color: j < avg ? C.blue : C.orange, r: 5 }); }
            bd.line(0, avg, k, avg, { color: C.purple, w: 2, dash: [6, 4] });
            rd.innerHTML = `${Array.from({ length: k }, (_, i) => a + i).join(' + ')} = <b>${s}</b> = ${k} × ${num(avg)} · ${k % 2 ? `odd count: always a multiple of ${k} (move dots above the purple line into the gaps)` : `even count: ${k} × ${num(avg)}, a multiple of ${k / 2} but ${s % k === 0 ? '' : 'not '}of ${k}`}`; };
          bd.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Parity of an expression', levels: [1, 2], gen(R) {
          const items = [['the sum of 7 odd numbers', 'odd'], ['the sum of 10 odd numbers', 'even'], ['odd × odd + even', 'odd'], ['(odd + odd) × odd', 'even'], ['the product of any two consecutive numbers', 'even'], ['n² + n for any whole n', 'even'], ['odd − even', 'odd'], ['the sum of 4 consecutive numbers', 'even']];
          const [q, a] = R.pick(items); return { q: `Is ${q} even or odd?`, a };
        } },
      { title: 'Divisibility test', gen(R) {
          const d = R.pick([3, 4, 6, 8, 9, 11, 12]); const n = R.chance(.5) ? d * R.int(1000, 9000) : R.int(10000, 99999);
          return { q: `Is ${n} divisible by ${d}? Use the test.`, a: n % d === 0 ? 'yes' : `no (remainder ${n % d})` };
        } },
      { title: 'Missing digit', levels: [2, 3], gen(R) {
          const d = R.pick([9, 11]); let pre, post, x; do { pre = R.int(10, 99); post = R.int(10, 99); x = R.int(0, 9); } while ((pre * 1000 + x * 100 + post) % d !== 0 || [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter(y => (pre * 1000 + y * 100 + post) % d === 0).length !== 1);
          return { q: `Find the digit y so that ${pre}y${post} is divisible by ${d}.`, a: `y = ${x}`, ans: x };
        } },
      { title: 'Remainder arithmetic', gen(R) {
          const d = R.int(3, 9), a = R.int(20, 200), b = R.int(20, 200);
          return R.chance(.5) ? { q: `${a} and ${b} are divided by ${d}. What is the remainder when ${a} + ${b} is divided by ${d}?`, a: String((a + b) % d), ans: (a + b) % d, s: `remainders ${a % d} and ${b % d}` }
            : { q: `What is the remainder when ${a} × ${b} is divided by ${d}?`, a: String((a * b) % d), ans: (a * b) % d, s: `remainders ${a % d} × ${b % d}` };
        } },
      { title: 'Two-digit reversal', levels: [2, 3], gen(R) {
          let a, b; do { a = R.int(1, 9); b = R.int(1, 9); } while (a === b); const t = R.int(0, 1);
          return t === 0 ? { q: `Add ${a}${b} and its reversal ${b}${a}. Show the sum is a multiple of 11.`, a: `${11 * (a + b)} = 11 × ${a + b}`, s: '(10a + b) + (10b + a) = 11(a + b)' }
            : { q: `Subtract the smaller of ${a}${b} and ${b}${a} from the larger. Show the result is a multiple of 9.`, a: `${9 * Math.abs(a - b)} = 9 × ${Math.abs(a - b)}`, s: '9(a − b)' };
        } },
      { title: 'Digital root', levels: [1, 2], gen(R) {
          const n = R.int(1000, 999999); const r = n % 9 || 9;
          return { q: `Find the digital root of ${n} (keep adding digits until one digit remains).`, a: String(r), ans: r, s: 'equals remainder on division by 9 (9 if 0)' };
        } },
      { title: 'Prove it', levels: [3], gen(R) {
          const items = [['The sum of three consecutive numbers is a multiple of 3.', 'n + (n + 1) + (n + 2) = 3(n + 1)'], ['The sum of two odd numbers is even.', '(2a + 1) + (2b + 1) = 2(a + b + 1)'], ['The product of two odd numbers is odd.', '(2a + 1)(2b + 1) = 2(2ab + a + b) + 1'], ['A number is divisible by 9 if its digit sum is.', '100a + 10b + c = 99a + 9b + (a + b + c)'], ['The square of an odd number leaves remainder 1 on division by 8.', '(2k + 1)² = 4k(k + 1) + 1 and k(k + 1) is even']];
          const [q, a] = R.pick(items); return { q: `Prove: ${q}`, a };
        } }
    ],

    quiz: [
      { q: 'Sum of 5 odd numbers is', o: ['odd', 'even', 'either', 'zero'], a: 0, e: 'Odd count.' },
      { q: '4 + 5 + 6 =', o: ['3 × 5', '3 × 4', '5 × 4', '2 × 7'], a: 0, e: '3 × middle.' },
      { q: '2376 is divisible by', o: ['8', '5', '7', '10'], a: 0, e: '376 = 8 × 47.' },
      { q: 'Test for 11 uses', o: ['the alternating digit sum', 'the digit sum', 'the last digit', 'the last two digits'], a: 0, e: '10 ≡ −1 mod 11.' },
      { q: '91 + 19 =', o: ['11 × 10', '9 × 12', '10 × 10', '11 × 9'], a: 0, e: '11(a + b).' },
      { q: 'Digital root of 9876', o: ['3', '6', '9', '30'], a: 0, e: '9876 = 9 × 1097 + 3.' },
      { q: 'Divisible by 6 means divisible by', o: ['2 and 3', '2 and 4', '3 only', '1 and 6 only'], a: 0, e: 'Co-prime factors.' },
      { q: '16 can be written as a sum of consecutive positive numbers?', o: ['no', 'yes: 7 + 9', 'yes: 5 + 5 + 6', 'yes: 1 + 15'], a: 0, e: 'Powers of 2 cannot.' },
      { q: 'An odd number is', o: ['2k + 1', '2k', 'k + 1', 'k²'], a: 0, e: 'Form.' },
      { q: 'Remainder of 47 ÷ 5', o: ['2', '7', '4', '3'], a: 0, e: '45 + 2.' },
      { q: 'Is 1 234 567 divisible by 3?', o: ['no', 'yes', 'only by 9', 'cannot tell'], a: 0, e: 'Digit sum 28.' }
    ],

    teach: {
      outcomes: ['Reason about parity', 'Explain sums of consecutive numbers', 'Prove divisibility rules with place value', 'Use remainders and digital roots'],
      periods: [
        { t: 'Parity and consecutive sums', flow: [['10 min', 'Guess-and-check vs proof.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Parity proofs with 2k, 2k + 1.']] },
        { t: 'Divisibility', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Proofs for 3, 9, 4, 8, 11.'], ['10 min', 'Missing digit puzzles.']] },
        { t: 'Remainders', flow: [['20 min', 'Remainder arithmetic, digital roots.'], ['10 min', 'Reversal tricks.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Examples count as proof.', 'Digit sum for 11.', '2 and 4 ⇒ 8.'],
      activities: ['Reversal trick show: students subtract reversals and you guess.', 'Number-card parity game.'],
      exit: ['Is 8712 divisible by 11?', 'Prove odd + odd is even.', 'Remainder of 73 × 58 ÷ 5.'],
      homework: 'Find all three-digit numbers that are equal to 11 times the sum of their digits. Explain why abc − cba is always a multiple of 99.'
    },

    slides: [
      { t: 'Number Play', b: ['Parity', 'Consecutive sums', 'Why divisibility rules work', 'Remainders'] },
      { t: 'Place value proofs', b: ['abc = 100a + 10b + c', '= 99a + 9b + (a + b + c)', 'Digit sum test for 3 and 9'] },
      { t: 'Other tests', b: ['4: last two digits', '8: last three digits', '11: alternating sum'] },
      { t: 'Check yourself', b: ['Digit y: 5y8 divisible by 9?', 'Answer: y = 5'] }
    ],

    fs: { groups: [
        ['Parity', [['Even, odd', '2k, 2k + 1'], ['odd + odd', 'even'], ['odd × odd', 'odd'], ['n(n + 1)', 'always even']]],
        ['Consecutive numbers', [['3 in a row', '3 × middle'], ['k in a row (k odd)', 'k × middle'], ['Powers of 2', 'not a sum of consecutive numbers']]],
        ['Divisibility', [['2, 5, 10', 'last digit'], ['4', 'last two digits'], ['8', 'last three digits'], ['3, 9', 'digit sum'], ['11', 'alternating sum'], ['6, 12', '2 & 3; 3 & 4']]],
        ['Place value tricks', [['ab + ba', '11(a + b)'], ['ab − ba', '9(a − b)'], ['abc − cba', '99(a − c)'], ['Digital root', 'remainder mod 9']]]],
      ex: [['Is 9 182 divisible by 11?', '2 − 8 + 1 − 9 = −14: no'], ['Sum of 5 consecutive from 8', '8 + … + 12 = 50 = 5 × 10']],
      rem: ['Prove with letters, not examples.', '11: alternate the signs.', 'Combine co-prime tests.'] }
  });
})();
