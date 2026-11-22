/*
TOOL:    class9_maths_ch11
FAMILY:  CBSE_REVISION / Class 9 Maths (Ganita Manjari)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class 9 Maths full build
CHANGES: 1.0.0 - Ch 11 The World of Algorithms - revise, 5 explore panels (column addition, divisors naive vs sqrt, Euclid GCD, binary search, bubble sort), 9 generators, quiz, lesson plan, slides
*/
(function () {
  const { num, C, gcd } = G9;
  const euclid = (a, b) => { const st = []; while (b) { st.push([a, b, Math.floor(a / b), a % b]); [a, b] = [b, a % b]; } return { g: a, st }; };
  const divs = (n) => { const d = []; for (let k = 1; k <= n; k++) if (n % k === 0) d.push(k); return d; };

  G9.register({
    no: 11, part: 'Part II', short: 'Algorithms', title: 'The World of Algorithms',
    blurb: 'Precise step-by-step procedures, why they work, and how many steps they take.',
    revise: {
      oneLine: 'An algorithm is a finite list of precise steps that solves every case of a problem. Good algorithms are correct (we can explain why they work) and efficient (they need few steps as the input grows).',
      sections: [
        { h: 'What makes an algorithm', html: `<ul><li><b>Input</b> and <b>output</b> are clear.</li><li>Each step is <b>precise</b> and can be carried out directly (basic operations).</li>
          <li>It <b>stops</b> after a finite number of steps, for every allowed input.</li><li>It is <b>correct</b>: always gives the right output.</li></ul>
          <p>You already know many: column addition, long division, finding the LCM — the school methods are algorithms!</p>` },
        { h: 'Example: column addition', html: `<ol><li>Line up the numbers by place value (right-aligned).</li><li>Add the rightmost column; write the units digit; carry the tens digit.</li>
          <li>Move one column left; add the digits and the carry.</li><li>Repeat until no columns remain.</li><li>If a carry remains, write it at the left.</li></ol>
          <p>Why right-to-left? A carry moves leftwards, so we must finish a column before the next one.</p>` },
        { h: 'Finding divisors — and doing it faster', html: `<p><b>Simple method:</b> test every k from 1 to n — n checks.</p>
          <p><b>Better:</b> divisors come in pairs k × (n/k). One of each pair is ≤ √n, so test k only up to √n and record both k and n/k — about √n checks. For n = 10 000: 100 checks instead of 10 000.</p>` },
        { h: 'GCD: listing vs Euclid', html: `<p>Listing all divisors of both numbers is slow for big numbers. <b>Euclid's algorithm</b>: replace (a, b) by (b, a mod b) until the remainder is 0; the last non-zero remainder is the GCD.</p>
          <p class="m">gcd(252, 105): 252 = 2·105 + 42 → 105 = 2·42 + 21 → 42 = 2·21 + 0 ⇒ <b>21</b></p>
          <p>Why it works: any common divisor of a and b also divides a − qb, the remainder, and vice versa. LCM = a × b ÷ GCD.</p>` },
        { h: 'Counting steps (efficiency)', html: `<table class="t"><tr><th>Task</th><th>Method</th><th>Steps for size n</th></tr>
          <tr><td>Find a number in a list</td><td>Linear search</td><td>up to n</td></tr><tr><td>Find a number in a <b>sorted</b> list</td><td>Binary search (halve each time)</td><td>about log₂n (1000 → 10)</td></tr>
          <tr><td>Sort a list</td><td>Bubble sort</td><td>about n²/2 comparisons</td></tr><tr><td>Divisors of n</td><td>up to √n</td><td>√n</td></tr></table>` }
      ],
      formulas: [['Euclid step', 'gcd(a, b) = gcd(b, a mod b)'], ['LCM', 'a × b ÷ gcd(a, b)'], ['Divisor checks', 'up to √n'], ['Binary search', '≤ ⌈log₂(n + 1)⌉ questions'], ['Bubble sort', 'n(n − 1)/2 comparisons (worst)']],
      terms: [['Algorithm', 'finite, precise, step-by-step procedure'], ['Input / output', 'what goes in / what comes out'], ['Efficiency', 'how the number of steps grows with input size'], ['Invariant', 'something that stays true at every step (e.g. the GCD in Euclid)']],
      traps: ['A recipe with "add salt to taste" is not precise enough to be an algorithm.', 'Binary search only works on a sorted list.', 'In Euclid\'s algorithm, the GCD is the last non-zero remainder, not the last quotient.', 'Testing divisors up to n/2 is better than n but still much slower than √n.'],
      bridge: '<p>Recursive rules (Ch 8) are algorithms; listing outcomes (Ch 7) can be done systematically; Ch 3 uses long division (an algorithm) to find decimals.</p>'
    },

    explore: [
      {
        title: 'Column addition, one step at a time', intro: 'Type two numbers. Each <kbd>S</kbd> carries out one step of the algorithm.',
        build(el, K) {
          const row = K.row(el); row.innerHTML = '<label>A <input type="number" id="adA" value="4786"></label><label>B <input type="number" id="adB" value="3958"></label>';
          const rd = K.read(el); rd.style.fontFamily = 'Consolas,monospace'; rd.style.fontSize = '22px';
          const an = new K.Anim(8, () => draw(), { ms: 900 });
          row.querySelectorAll('input').forEach(i => i.addEventListener('input', () => an.reset()));
          function draw() {
            const A = String(Math.abs(+row.querySelector('#adA').value || 0)), B = String(Math.abs(+row.querySelector('#adB').value || 0));
            const L = Math.max(A.length, B.length), a = A.padStart(L, '0'), b = B.padStart(L, '0'); an.n = L + 1;
            let carry = 0, res = '', carries = Array(L + 1).fill(' '), note = 'Line up the digits by place value.';
            for (let k = 0; k < Math.min(an.i, L); k++) { const col = L - 1 - k, s = +a[col] + +b[col] + carry; res = (s % 10) + res; note = `Column ${k + 1}: ${a[col]} + ${b[col]}${carry ? ' + ' + carry + ' (carry)' : ''} = ${s} → write ${s % 10}${s >= 10 ? ', carry 1' : ''}`; carry = s >= 10 ? 1 : 0; if (carry) carries[col] = '1'; }
            if (an.i >= L + 1 - 1 && an.i >= L) { if (carry) { res = '1' + res; note = 'Last carry written at the left. Done!'; } else note = 'No carry left. Done!'; }
            const pad = (s) => s.padStart(L + 1, ' ').replace(/ /g, '&nbsp;');
            rd.innerHTML = `<span style="color:var(--orange)">${carries.join('').replace(/ /g, '&nbsp;')}</span><br>${pad(A)}<br>+${B.padStart(L, ' ').replace(/ /g, '&nbsp;')}<br>${'─'.repeat(L + 1)}<br><b>${pad(res)}</b><div style="font-family:Segoe UI;font-size:15px;margin-top:6px">${note}</div>`;
          }
          K.anim(el, an); draw(); return an;
        }
      },
      {
        title: 'Divisors: check everything vs check up to √n', intro: 'Pick n. Compare the number of checks each method needs.',
        build(el, K) {
          let n = 96; const row = K.row(el); K.slider(row, 'n', 2, 400, 1, n, v => { n = v; draw(); });
          const b = new K.Board(el, { xmin: 0, xmax: 100, ymin: 0, ymax: 10, axes: false, grid: 0, equal: false, aspect: 0.16 });
          const rd = K.read(el);
          function draw() {
            const d = divs(n), r = Math.floor(Math.sqrt(n)); b.clear();
            b.rect(0, 6, 100, 3, { fill: C.orangeL, color: C.orange, w: 1 }); b.text(50, 7.5, `simple method: ${n} checks`, { font: 'bold 13px' });
            b.rect(0, 1, Math.max(1, 100 * r / n), 3, { fill: C.blueL, color: C.blue, w: 1 }); b.ptext(b.X(Math.max(1, 100 * r / n)) + 8, b.Y(3.6), `√n method: ${r} checks`, { font: 'bold 13px' });
            const pairs = d.filter(k => k <= r).map(k => `${k} × ${n / k}`);
            rd.innerHTML = `Divisors of ${n}: <b>${d.join(', ')}</b> (${d.length} divisors)<br>Pairs found by checking k = 1 … ${r}: ${pairs.join(', ')}<br>Saving: ${n - r} checks (${num(100 * (1 - r / n), 0)}% fewer).`;
          }
          b.onDraw = draw; draw(); return null;
        }
      },
      {
        title: "Euclid's algorithm for the GCD", intro: 'Each step replaces (a, b) by (b, remainder). Watch the rectangle being cut into squares — the last square size is the GCD.',
        build(el, K) {
          let A = 252, B = 105; const row = K.row(el);
          const b = new K.Board(el, { xmin: 0, xmax: 100, ymin: 0, ymax: 45, axes: false, grid: 0, equal: true, aspect: 0.42 });
          const rd = K.read(el); const an = new K.Anim(12, () => b.redraw(), { ms: 1000 });
          K.slider(row, 'a', 10, 400, 1, A, v => { A = v; an.reset(); }); K.slider(row, 'b', 5, 300, 1, B, v => { B = v; an.reset(); });
          b.onDraw = () => {
            b.clear(); let a = Math.max(A, B), c = Math.min(A, B); const sc = Math.min(96 / a, 42 / c); const E = euclid(a, c); an.n = E.st.length + 1;
            // draw squares cut from the rectangle
            let x = 1, y = 1, w = a, h = c, k = 0, horiz = true; b.rect(x, y, a * sc, c * sc, { color: C.ink, w: 2 });
            for (const [p, q, qt] of E.st) { if (k >= an.i) break; for (let j = 0; j < qt; j++) { if (horiz) { b.rect(x, y, q * sc, q * sc, { fill: k % 2 ? C.orangeL : C.blueL, color: k % 2 ? C.orange : C.blue, w: 1.5 }); x += q * sc; } else { b.rect(x, y, q * sc, q * sc, { fill: k % 2 ? C.orangeL : C.blueL, color: k % 2 ? C.orange : C.blue, w: 1.5 }); y += q * sc; } } horiz = !horiz; k++; void p; void w; void h; }
            const lines = E.st.slice(0, an.i).map(([p, q, qt, r]) => `${p} = ${qt} × ${q} + ${r}`);
            rd.innerHTML = (lines.join('<br>') || `Start: a = ${a}, b = ${c}`) + (an.i >= E.st.length ? `<br><b>Remainder 0 ⇒ gcd(${a}, ${c}) = ${E.g}</b> in ${E.st.length} division steps. LCM = ${a} × ${c} ÷ ${E.g} = ${a * c / E.g}` : '');
          };
          K.anim(el, an); b.redraw(); return an;
        }
      },
      {
        title: 'Guess my number: binary search', intro: 'The computer picks a number from 1 to 100. Always guess the middle of what is left — you never need more than 7 guesses.',
        build(el, K) {
          let lo = 1, hi = 100, secret, tries = 0, log = [];
          const rd = K.read(el); const row = K.row(el);
          const reset = () => { lo = 1; hi = 100; secret = G9.rng(G9.newSeed()).int(1, 100); tries = 0; log = []; show(); };
          const guess = (g) => { if (lo > hi) return; tries++; if (g === secret) { log.push(`${g} ✔ found!`); lo = hi + 1; } else if (g < secret) { log.push(`${g}: too low`); lo = g + 1; } else { log.push(`${g}: too high`); hi = g - 1; } show(); };
          function show() { rd.innerHTML = (lo <= hi ? `Range left: <b>${lo} … ${hi}</b> (${hi - lo + 1} numbers) · best guess: ${Math.floor((lo + hi) / 2)}` : `<b>Found ${secret} in ${tries} guesses.</b> A linear search (1, 2, 3, …) would take ${secret}.`) + `<br>${log.join(' → ')}`; }
          row.innerHTML = '<label>Your guess <input type="number" id="bsG" min="1" max="100"></label>';
          K.button(row, 'Guess', () => guess(+row.querySelector('#bsG').value), 'btn');
          K.button(row, 'New number', reset);
          const ctl = { step: () => { if (lo <= hi) guess(Math.floor((lo + hi) / 2)); }, play() { this.t = setInterval(() => { if (lo > hi) this.pause(); else this.step(); }, 900); }, pause() { clearInterval(this.t); } };
          K.button(row, 'Computer plays (S)', () => ctl.step());
          reset(); return ctl;
        }
      },
      {
        title: 'Bubble sort: counting comparisons', intro: 'Each step compares two neighbours and swaps them if they are out of order. Count the comparisons.',
        build(el, K) {
          let R = G9.rng(G9.newSeed()), arr, i, j, comps, swaps, done;
          const b = new K.Board(el, { xmin: 0, xmax: 20, ymin: 0, ymax: 10, axes: false, grid: 0, equal: false, aspect: 0.3 });
          const rd = K.read(el);
          const init = () => { arr = R.shuffle([2, 3, 4, 5, 6, 7, 8, 9]); i = 0; j = 0; comps = 0; swaps = 0; done = false; b.redraw(); };
          const step = () => { if (done) return; const n = arr.length; comps++; if (arr[j] > arr[j + 1]) { [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; swaps++; } j++; if (j >= n - 1 - i) { j = 0; i++; if (i >= n - 1) done = true; } b.redraw(); };
          b.onDraw = () => { b.clear(); arr.forEach((v, k) => { const act = !done && (k === j || k === j + 1), fin = k >= arr.length - i; b.rect(1 + k * 2.3, 0.5, 1.8, v, { fill: act ? C.orangeL : fin ? C.purpleL : C.blueL, color: act ? C.orange : fin ? C.purple : C.blue }); b.text(1.9 + k * 2.3, v + 1, String(v), { font: 'bold 14px' }); });
            rd.innerHTML = `${done ? '<b>Sorted!</b> ' : `Pass ${i + 1}, comparing positions ${j + 1} and ${j + 2}. `}Comparisons: <b>${comps}</b> · swaps: ${swaps} · maximum for 8 items: 8 × 7 ÷ 2 = 28`; };
          const an = new K.Anim(Infinity, () => step(), { ms: 450 }); an.reset = () => { an.pause(); R = G9.rng(G9.newSeed()); init(); };
          K.anim(el, an); init(); return an;
        }
      }
    ],

    gens: [
      { title: "Euclid's algorithm", gen(R, L) {
          const g = R.int(2, L === 1 ? 12 : 30), a = g * R.int(2, L === 3 ? 40 : 15), b = g * R.int(2, L === 3 ? 30 : 12); if (a === b) return this.gen(R, L);
          const [x, y] = a > b ? [a, b] : [b, a], E = euclid(x, y);
          return { q: `Use Euclid's algorithm to find gcd(${x}, ${y}). Show every step.`, a: String(E.g), ans: E.g, s: E.st.map(([p, q, qt, r]) => `${p} = ${qt}×${q} + ${r}`).join('; ') };
        } },
      { title: 'LCM from GCD', levels: [2, 3], gen(R) {
          const g = R.int(2, 15), a = g * R.int(2, 12), b = g * R.int(2, 12); const G = gcd(a, b);
          return { q: `gcd(${a}, ${b}) = ${G}. Find lcm(${a}, ${b}) without listing multiples.`, a: String(a * b / G), ans: a * b / G, s: `${a} × ${b} ÷ ${G}` };
        } },
      { title: 'Divisors and number of checks', gen(R, L) {
          const n = L === 1 ? R.int(12, 60) : R.int(60, 400), d = divs(n), r = Math.floor(Math.sqrt(n));
          return { q: `List all divisors of ${n}. How many numbers must you test using (i) the simple method (ii) the "up to √n" method?`, a: `${d.join(', ')}; (i) ${n} (ii) ${r}`, s: `√${n} ≈ ${num(Math.sqrt(n))}, so test 1 to ${r} and pair each divisor k with ${n}/k.` };
        } },
      { title: 'Binary search: how many questions?', gen(R) {
          const N = R.pick([10, 16, 50, 64, 100, 128, 500, 1000, 1024, 1000000]); const q = Math.ceil(Math.log2(N + 1));
          return { q: `A sorted list has ${N.toLocaleString('en-IN')} names. At most how many comparisons does binary search need to find a name (or decide it is absent)? How many could a linear search need?`, a: `binary: ${q}; linear: ${N.toLocaleString('en-IN')}`, ans: q, s: `Halving: 2^${q} = ${2 ** q} ≥ ${N} + 1 (for ${N}, ${q - 1} halvings are not enough)` };
        } },
      { title: 'Trace an algorithm', gen(R, L) {
          const x0 = R.int(1, 5), k = R.int(3, L === 1 ? 4 : 6), m = R.int(2, 3), c = R.int(-2, 3);
          let x = x0; const tr = [x]; for (let i = 0; i < k; i++) { x = m * x + c; tr.push(x); }
          return { q: `Trace this algorithm and give the output:<br><code>1. Set x = ${x0}.<br>2. Repeat ${k} times: replace x by ${m}x ${G9.sgn(c)}.<br>3. Output x.</code>`, a: String(x), ans: x, s: 'x: ' + tr.join(' → ') };
        } },
      { title: 'Bubble sort', levels: [2, 3], gen(R, L) {
          const arr = R.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9].slice(0, R.int(5, 7)).map(v => v * R.int(1, 3) + R.int(0, 2)));
          const a = arr.slice(); let comps = 0; for (let j = 0; j < a.length - 1; j++) { comps++; if (a[j] > a[j + 1]) [a[j], a[j + 1]] = [a[j + 1], a[j]]; }
          const n = arr.length;
          return L === 2 ? { q: `Write the list ${arr.join(', ')} after the first pass of bubble sort (ascending).`, a: a.join(', '), s: `${comps} neighbour comparisons; the largest value "bubbles" to the end.` }
            : { q: `How many comparisons does bubble sort make (all passes, no early stop) to sort a list of ${n} numbers? How many for ${2 * n}?`, a: `${n * (n - 1) / 2}; ${2 * n * (2 * n - 1) / 2}`, ans: n * (n - 1) / 2, s: '(n − 1) + (n − 2) + … + 1 = n(n − 1)/2 — doubling n roughly quadruples the work.' };
        } },
      { title: 'Is it an algorithm?', levels: [1], gen(R) {
          const items = [['Add a pinch of salt and cook until it looks right.', 'No — "a pinch" and "looks right" are not precise.'], ['Start at 1; keep adding 2 forever and print each number.', 'No — it never stops.'], ['Divide n by 2 repeatedly until the result is less than 1; count the divisions.', 'Yes — precise steps and it stops.'], ['To find the larger of a and b: if a > b output a, otherwise output b.', 'Yes — precise, finite, correct.'], ['Guess the answer.', 'No — not a precise procedure.'], ['Multiply the digits of n; repeat with the result until a single digit remains.', 'Yes — each step shrinks the number, so it stops.']];
          const [q, a] = R.pick(items); return { q: `Is this an algorithm? Give a reason. "${q}"`, a };
        } },
      { title: 'Addition algorithm: carries', levels: [1, 2], gen(R, L) {
          const d = L === 1 ? 3 : 5, A = R.int(10 ** (d - 1), 10 ** d - 1), B = R.int(10 ** (d - 1), 10 ** d - 1);
          let c = 0, carries = 0; const a = String(A).padStart(d, '0'), b = String(B).padStart(d, '0'); for (let k = d - 1; k >= 0; k--) { const s = +a[k] + +b[k] + c; c = s >= 10 ? 1 : 0; carries += c; }
          return { q: `Add ${A} + ${B} using the column algorithm. How many carries occur?`, a: `${A + B}; ${carries} carr${carries === 1 ? 'y' : 'ies'}`, ans: A + B, s: 'Work right to left, carrying 1 whenever a column sum is 10 or more.' };
        } },
      { title: 'Count the steps', levels: [3], gen(R) {
          const n = R.pick([100, 400, 900, 2500, 10000]);
          return { q: `To find all divisors of ${n}, a student tests every number from 1 to ${n}, another tests 1 to ${n / 2}, and a third tests 1 to √${n}. How many tests does each make? Which grows slowest as n grows?`, a: `${n}, ${n / 2}, ${Math.sqrt(n)} — the √n method grows slowest`, s: 'Divisors pair up as k and n/k, one of them ≤ √n.' };
        } }
    ],

    quiz: [
      { q: 'Which is NOT required of an algorithm?', o: ['precise steps', 'it stops', 'it uses a computer', 'gives correct output'], a: 2, e: 'Algorithms can be carried out by hand.' },
      { q: 'gcd(84, 36) by Euclid is', o: ['6', '12', '18', '4'], a: 1, e: '84 = 2·36 + 12; 36 = 3·12 + 0.' },
      { q: 'In Euclid\'s algorithm the GCD is', o: ['the last quotient', 'the last non-zero remainder', 'the first remainder', 'the smaller number'], a: 1, e: 'Stop at remainder 0.' },
      { q: 'To find divisors of 144 you need only test up to', o: ['144', '72', '12', '7'], a: 2, e: '√144 = 12.' },
      { q: 'Binary search on 1000 sorted items needs at most about', o: ['10 comparisons', '100', '500', '1000'], a: 0, e: '2¹⁰ = 1024.' },
      { q: 'Binary search needs the list to be', o: ['short', 'sorted', 'of numbers only', 'even in length'], a: 1, e: 'Halving relies on order.' },
      { q: 'Bubble sort on 10 items makes at most', o: ['10 comparisons', '45 comparisons', '100 comparisons', '20 comparisons'], a: 1, e: '10 × 9 / 2.' },
      { q: 'lcm(12, 18) using gcd = 6 is', o: ['36', '216', '72', '6'], a: 0, e: '12 × 18 / 6.' },
      { q: 'Column addition is done right-to-left because', o: ['it is a rule', 'carries move to the left', 'numbers are read that way', 'it is faster to write'], a: 1, e: 'Each column may receive a carry from its right.' },
      { q: 'Trace: x = 1; repeat 3 times: x = 2x. Output?', o: ['6', '8', '3', '4'], a: 1, e: '1 → 2 → 4 → 8.' },
      { q: 'Which grows slowest as n grows?', o: ['n', 'n²', '√n', 'n/2'], a: 2, e: '√n.' }
    ],

    teach: {
      outcomes: ['State the features of an algorithm and recognise school methods as algorithms', 'Explain why the addition, divisor and Euclid algorithms are correct', 'Compare algorithms by counting steps', 'Use binary search and simple sorting'],
      periods: [
        { t: 'What is an algorithm?', flow: [['10 min', 'Write instructions to draw a square for a "robot" classmate; spot ambiguity.'], ['15 min', 'Explore panel 1: addition step by step; why right-to-left.'], ['15 min', 'Is-it-an-algorithm card sort.']] },
        { t: 'Divisors and GCD', flow: [['15 min', 'Explore panel 2: √n trick — why divisors pair up.'], ['15 min', 'Explore panel 3: Euclid with the rectangle-of-squares picture.'], ['10 min', 'Practice: Euclid, Standard.']] },
        { t: 'Searching and sorting', flow: [['10 min', 'Guess-my-number in pairs; then Explore panel 4.'], ['15 min', 'Bubble sort with students holding number cards (Explore panel 5).'], ['15 min', 'Counting comparisons; Check quiz.']] }
      ],
      misconceptions: ['Thinking algorithms are only about computers.', 'Taking the last quotient as the GCD.', 'Using binary search on an unsorted list.'],
      activities: ['Human bubble sort with number cards.', 'Phone-directory search race (linear vs binary).', 'Euclid on squared paper: cut a 21 × 13 rectangle into squares.'],
      exit: ['gcd(96, 60) by Euclid?', 'Most guesses needed for a number between 1 and 1000?', 'Why only test divisors up to √n?'],
      homework: 'Write an algorithm for something you do every day (making tea, tying laces) precise enough for a robot.'
    },

    slides: [
      { t: 'The World of Algorithms', b: ['What is an algorithm?', 'Correctness: why it works', 'Efficiency: how many steps', 'Searching and sorting'] },
      { t: 'Features of an algorithm', b: ['Clear input and output', 'Precise, basic steps', 'Always stops', 'Always correct'] },
      { t: 'Column addition', b: ['Line up place values', 'Add rightmost column, carry the tens', 'Move left, include the carry', 'Write any final carry'] },
      { t: 'Divisors faster', b: ['Simple: test 1 … n', 'Divisors pair up: k × n/k', 'Test only up to √n', '10 000: 100 checks instead of 10 000'] },
      { t: "Euclid's algorithm", b: ['gcd(a, b) = gcd(b, a mod b)', '252 = 2·105 + 42; 105 = 2·42 + 21; 42 = 2·21 + 0', 'gcd = 21', 'LCM = ab ÷ gcd'] },
      { t: 'Searching and sorting', b: ['Linear search: up to n steps', 'Binary search (sorted): about log₂n', 'Bubble sort: about n²/2 comparisons'] },
      { t: 'Check yourself', b: ['gcd(144, 60)?', 'Guesses needed for 1–64?', 'Bubble-sort comparisons for 6 items?', 'Answers: 12 · 7 · 15'] }
    ]
  });
})();
