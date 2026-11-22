/*
TOOL:    class10_maths_ch01
FAMILY:  CBSE_REVISION / Class 10 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 1 Real Numbers - revise, board focus, 2 explore panels (factor tree, HCF/LCM Venn), 8 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { num, C, gcd, lcm } = G9;
  const pf = (n) => { const f = {}; let d = 2; while (n > 1) { while (n % d === 0) { f[d] = (f[d] || 0) + 1; n /= d; } d++; if (d * d > n && n > 1) { f[n] = (f[n] || 0) + 1; break; } } return f; };
  const pfH = (n) => Object.entries(pf(n)).map(([p, e]) => e > 1 ? `${p}<sup>${e}</sup>` : p).join(' × ');

  G9.register({
    no: 1, part: 'Unit I · Number Systems (6 marks)', short: 'Real numbers', title: 'Real Numbers',
    blurb: 'Fundamental Theorem of Arithmetic, HCF and LCM by prime factorisation, irrationality proofs.',
    revise: {
      oneLine: 'Every whole number greater than 1 is a product of primes in exactly one way. That single fact gives HCF and LCM by prime factorisation, and it powers the proofs that √2, √3, √5 … are irrational.',
      sections: [
        { h: 'Fundamental Theorem of Arithmetic', html: `<p>Every composite number can be written as a product of primes, and this factorisation is <b>unique</b> apart from the order of the factors. Example: 3780 = 2² × 3³ × 5 × 7.</p>
          <p>Use a factor tree or repeated division by primes 2, 3, 5, 7, …</p>` },
        { h: 'HCF and LCM by prime factorisation', html: `<ul><li><b>HCF</b> = product of the <b>common</b> primes, each with its <b>smallest</b> power.</li><li><b>LCM</b> = product of <b>all</b> primes that appear, each with its <b>greatest</b> power.</li></ul>
          <p>For two numbers: <span class="m">HCF(a, b) × LCM(a, b) = a × b</span>. (This does <b>not</b> hold for three numbers.)</p>
          <p>Example: 96 = 2⁵ × 3, 404 = 2² × 101 → HCF = 2² = 4, LCM = 2⁵ × 3 × 101 = 9696.</p>` },
        { h: 'Proving numbers irrational', html: `<p><b>Key lemma:</b> if a prime p divides a², then p divides a.</p>
          <p><b>√2 is irrational:</b> suppose √2 = a/b with a, b co-prime. Then 2b² = a², so 2 | a² ⇒ 2 | a. Write a = 2c: 2b² = 4c² ⇒ b² = 2c² ⇒ 2 | b. So 2 divides both a and b — contradiction. The same works for √3, √5, √p (p prime).</p>
          <p><b>Combinations:</b> rational + irrational and (non-zero rational) × irrational are irrational. E.g. 5 − √3, 3 + 2√5, 6√2 are irrational.</p>` },
        { h: 'Word problems', html: `<ul><li>"When will they meet / ring / arrive together again?" → <b>LCM</b>.</li><li>"Largest size / maximum number of equal groups / greatest length that measures exactly" → <b>HCF</b>.</li></ul>` }
      ],
      formulas: [['Two numbers', 'HCF × LCM = a × b'], ['HCF', 'common primes, smallest powers'], ['LCM', 'all primes, greatest powers'], ['Lemma', 'p | a² ⇒ p | a (p prime)'], ['Irrational', 'rational ± irrational, rational × irrational (≠ 0)']],
      terms: [['Prime', 'exactly two factors, 1 and itself'], ['Composite', 'more than two factors'], ['Co-prime', 'HCF = 1'], ['Irrational', 'cannot be written as p/q']],
      traps: ['Using HCF × LCM = product for three numbers.', 'Taking the largest powers for HCF (that is LCM).', 'In the √p proof, forgetting to state "a and b are co-prime" — that is what gives the contradiction.', '"Can 6ⁿ end in 0?" — no: its primes are only 2 and 3, never 5.'],
      board: '<p><b>Unit I — 6 marks.</b> Typical: 1-mark MCQs on HCF × LCM and on which numbers are irrational; 2–3 mark questions on HCF/LCM word problems; a 3-mark proof that √p or a + b√p is irrational. Write the full contradiction argument — steps carry marks.</p>',
      bridge: '<p>Irrational numbers return in quadratic roots (Ch 4) and in trigonometric values like sin 60° = √3/2 (Ch 8).</p>'
    },

    explore: [
      {
        title: 'Factor tree', intro: 'Type a number. Each <kbd>S</kbd> splits the next composite leaf by its smallest prime factor.',
        build(el, K) {
          const row = K.row(el); row.innerHTML = '<label>n <input type="number" id="ftN" value="3780" min="4" max="999999"></label>';
          const b = new K.Board(el, { xmin: 0, xmax: 100, ymin: 0, ymax: 60, axes: false, grid: 0, equal: false, aspect: 0.45 });
          const rd = K.read(el); let N = 3780;
          const an = new K.Anim(20, () => b.redraw(), { ms: 700 });
          row.querySelector('input').addEventListener('input', e => { N = Math.max(4, Math.min(999999, +e.target.value || 4)); an.reset(); });
          b.onDraw = () => {
            b.clear(); // build tree up to an.i splits
            const nodes = [{ v: N, x: 50, y: 55, d: 0 }]; let splits = 0, leaves = [nodes[0]];
            while (splits < an.i) { const t = leaves.find(n => !isPrime(n.v)); if (!t) break; let p = 2; while (t.v % p) p++; const dx = 24 / (t.d + 1.3);
              const a = { v: p, x: t.x - dx, y: t.y - 10, d: t.d + 1 }, c = { v: t.v / p, x: t.x + dx, y: t.y - 10, d: t.d + 1 }; t.kids = [a, c]; nodes.push(a, c); leaves = leaves.filter(n => n !== t).concat([a, c]); splits++; }
            nodes.forEach(n => (n.kids || []).forEach(k => b.line(n.x, n.y - 1.5, k.x, k.y + 2, { color: C.grey, w: 2 })));
            nodes.forEach(n => b.text(n.x, n.y, String(n.v), { font: 'bold 15px', color: !n.kids && isPrime(n.v) ? C.orange : C.blue }));
            an.n = splits + 2; const primes = leaves.map(l => l.v).sort((x, y) => x - y);
            rd.innerHTML = leaves.every(l => isPrime(l.v)) ? `${N} = ${primes.join(' × ')} = <b>${pfH(N)}</b> — the only prime factorisation (FTA).` : `Leaves so far: ${primes.join(' × ')} — keep splitting the blue composite numbers.`;
          };
          function isPrime(n) { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; }
          K.anim(el, an); b.redraw(); return an;
        }
      },
      {
        title: 'HCF and LCM with a prime Venn diagram', intro: 'Common prime factors go in the overlap. HCF = product of the overlap; LCM = product of everything.',
        build(el, K) {
          let A = 96, B = 404; const row = K.row(el);
          row.innerHTML = '<label>a <input type="number" id="vA" value="96"></label><label>b <input type="number" id="vB" value="404"></label>';
          const b = new K.Board(el, { xmin: 0, xmax: 100, ymin: 0, ymax: 50, axes: false, grid: 0, equal: true, aspect: 0.42 });
          const rd = K.read(el);
          row.querySelectorAll('input').forEach(i => i.addEventListener('input', () => { A = Math.max(2, +row.querySelector('#vA').value || 2); B = Math.max(2, +row.querySelector('#vB').value || 2); b.redraw(); }));
          const list = (n) => { const f = pf(n), o = []; Object.entries(f).forEach(([p, e]) => { for (let k = 0; k < e; k++) o.push(+p); }); return o; };
          b.onDraw = () => {
            b.clear(); const la = list(A), lb = list(B), common = []; const lb2 = lb.slice();
            const onlyA = []; la.forEach(p => { const i = lb2.indexOf(p); if (i >= 0) { common.push(p); lb2.splice(i, 1); } else onlyA.push(p); });
            b.circle(38, 25, 20, { fill: C.blueL, color: C.blue }); b.circle(62, 25, 20, { fill: C.orangeL, color: C.orange });
            b.text(28, 47, `a = ${A}`, { font: 'bold 15px', color: C.blue }); b.text(72, 47, `b = ${B}`, { font: 'bold 15px', color: C.orange });
            const put = (arr, cx) => arr.forEach((p, i) => b.text(cx + ((i % 3) - 1) * 5, 32 - Math.floor(i / 3) * 6, String(p), { font: 'bold 15px' }));
            put(onlyA, 28); put(common, 50); put(lb2, 72);
            const h = gcd(A, B), l = lcm(A, B);
            rd.innerHTML = `${A} = ${pfH(A)}, ${B} = ${pfH(B)}<br>HCF = overlap = ${common.join(' × ') || '1'} = <b>${h}</b> · LCM = all = <b>${l}</b> · check: ${h} × ${l} = ${h * l} = ${A} × ${B} ✔`;
          };
          b.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Prime factorisation', levels: [1, 2], gen(R, L) {
          const ps = [2, 3, 5, 7, 11, 13]; let n = 1; const k = L === 1 ? 3 : 5; for (let i = 0; i < k; i++) n *= R.pick(ps.slice(0, L === 1 ? 4 : 6)); if (n < 10) n *= 6;
          return { q: `Express ${n} as a product of its prime factors.`, a: pfH(n), s: 'Divide repeatedly by the smallest prime.' };
        } },
      { title: 'HCF and LCM by prime factorisation', gen(R, L) {
          const g = R.pick([2, 3, 4, 6, 8, 9, 12]), a = g * R.int(2, 15), b = g * R.int(2, 15); if (a === b) return this.gen(R, L);
          if (L === 3) { const c = g * R.int(2, 9); return { q: `Find the HCF and LCM of ${a}, ${b} and ${c} using prime factorisation.`, a: `HCF ${gcd(gcd(a, b), c)}, LCM ${lcm(lcm(a, b), c)}`, s: `${a} = ${pfH(a)}, ${b} = ${pfH(b)}, ${c} = ${pfH(c)}` }; }
          return { q: `Find the HCF and LCM of ${a} and ${b} by prime factorisation, and verify HCF × LCM = product.`, a: `HCF ${gcd(a, b)}, LCM ${lcm(a, b)}; ${gcd(a, b)} × ${lcm(a, b)} = ${a * b}`, s: `${a} = ${pfH(a)}, ${b} = ${pfH(b)}` };
        } },
      { title: 'Find the other number', gen(R) {
          const g = R.int(2, 12), x = R.int(2, 9), y = R.int(2, 9); if (gcd(x, y) !== 1) return this.gen(R); const a = g * x, b = g * y, L = g * x * y;
          return { q: `The HCF of two numbers is ${g} and their LCM is ${L}. If one number is ${a}, find the other.`, a: String(b), ans: b, s: `other = HCF × LCM ÷ ${a} = ${g * L} ÷ ${a}` };
        } },
      { title: 'LCM word problem (together again)', gen(R) {
          const [p, q] = R.pick([[12, 18], [15, 20], [6, 8], [18, 24], [20, 25], [16, 36], [9, 12]]); const what = R.pick([['Two bells ring every', 'minutes', 'ring together again'], ['Two runners complete a lap in', 'minutes', 'meet at the start again'], ['Two traffic lights change every', 'seconds', 'change together again']]);
          return { q: `${what[0]} ${p} and ${q} ${what[1]}. If they start together, after how many ${what[1]} will they ${what[2]}?`, a: `${lcm(p, q)} ${what[1]}`, ans: lcm(p, q), s: `LCM(${p}, ${q}): ${pfH(p)} and ${pfH(q)}` };
        } },
      { title: 'HCF word problem (largest equal size)', gen(R) {
          const g = R.int(3, 25), a = g * R.int(3, 12), b = g * R.int(3, 12); if (a === b) return this.gen(R);
          return R.chance(.5) ? { q: `Two ropes are ${a} cm and ${b} cm long. They are to be cut into pieces of equal length with nothing left over. What is the greatest possible length of each piece?`, a: `${gcd(a, b)} cm`, ans: gcd(a, b), s: `HCF(${a}, ${b})` }
            : { q: `${a} boys and ${b} girls are to be arranged in rows so that each row has the same number of students, all boys or all girls. What is the greatest number per row, and how many rows?`, a: `${gcd(a, b)} per row; ${(a + b) / gcd(a, b)} rows`, s: `HCF = ${gcd(a, b)}; rows = ${a}/${gcd(a, b)} + ${b}/${gcd(a, b)}` };
        } },
      { title: 'Prove irrational', levels: [2, 3], gen(R, L) {
          const p = R.pick([2, 3, 5, 7]);
          if (L === 2) return { q: `Prove that √${p} is irrational.`, a: `Assume √${p} = a/b, a and b co-prime. Then ${p}b² = a² ⇒ ${p} | a² ⇒ ${p} | a. Let a = ${p}c: ${p}b² = ${p * p}c² ⇒ b² = ${p}c² ⇒ ${p} | b. So ${p} divides both a and b — contradiction. Hence √${p} is irrational.`, s: 'Uses: if a prime divides a², it divides a.' };
          const a = R.int(1, 9), k = R.int(2, 5);
          return { q: `Given that √${p} is irrational, prove that ${a} + ${k}√${p} is irrational.`, a: `Suppose ${a} + ${k}√${p} = r (rational). Then √${p} = (r − ${a})/${k}, which is rational — contradiction. So ${a} + ${k}√${p} is irrational.`, s: 'Rationals are closed under subtraction and division by a non-zero rational.' };
        } },
      { title: 'Can it end in zero?', levels: [2, 3], gen(R) {
          const n = R.pick([4, 6, 9, 12, 3, 8, 15]); const has5 = n % 5 === 0;
          return { q: `Check whether ${n}ⁿ can end with the digit 0 for any natural number n.`, a: has5 ? `It ends in 0 only if it has both 2 and 5 as factors; ${n} = ${pfH(n)} has 5 but not 2, so ${n}ⁿ ends in 5, never 0.` : `No. ${n}ⁿ = (${pfH(n)})ⁿ has no factor 5, and by the uniqueness of prime factorisation (FTA) it can never have one, so it never ends in 0.`, s: 'A number ends in 0 ⇔ it is divisible by 10 = 2 × 5.' };
        } },
      { title: 'Rational or irrational?', levels: [1], gen(R) {
          const items = R.shuffle([['√49', 'rational'], ['3 + √2', 'irrational'], ['2√3/√3', 'rational'], ['√12', 'irrational'], ['(2 − √5)²', 'irrational'], ['(√3 + 2)(√3 − 2)', 'rational (= −1)'], ['0.75', 'rational'], ['π', 'irrational']]).slice(0, 4);
          return { q: 'Classify as rational or irrational: ' + items.map((x, i) => `(${'abcd'[i]}) ${x[0]}`).join(' &nbsp; '), a: items.map((x, i) => `(${'abcd'[i]}) ${x[1]}`).join(', ') };
        } }
    ],

    quiz: [
      { q: 'HCF of 26 and 91 is', o: ['13', '7', '26', '1'], a: 0, e: '26 = 2 × 13, 91 = 7 × 13.' },
      { q: 'If HCF(a, b) = 9 and a × b = 1620, then LCM(a, b) =', o: ['180', '162', '90', '18'], a: 0, e: '1620 ÷ 9.' },
      { q: 'The prime factorisation of 140 is', o: ['2² × 5 × 7', '2 × 5 × 7', '2³ × 5 × 7', '4 × 5 × 7'], a: 0, e: '140 = 4 × 35.' },
      { q: 'Which is irrational?', o: ['√25', '(√2)²', '3 − √5', '0.4'], a: 2, e: 'Rational minus irrational is irrational.' },
      { q: 'For any natural n, 4ⁿ can end in', o: ['0', 'only 4 or 6', '5', '2'], a: 1, e: 'No factor 5; 4, 16, 64, 256 … end in 4 or 6.' },
      { q: 'LCM of 6, 72 and 120 is', o: ['360', '720', '120', '1440'], a: 0, e: '2³ × 3² × 5.' },
      { q: 'If p is prime and p divides a², then', o: ['p divides a', 'p² divides a', 'a is prime', 'nothing follows'], a: 0, e: 'Key lemma.' },
      { q: 'HCF × LCM = product of the numbers holds for', o: ['any three numbers', 'two numbers', 'only primes', 'never'], a: 1, e: 'Only for two numbers.' },
      { q: 'Two bells ring every 6 and 8 minutes. They ring together every', o: ['14 min', '24 min', '48 min', '2 min'], a: 1, e: 'LCM(6, 8).' },
      { q: 'HCF of two consecutive natural numbers is', o: ['0', '1', '2', 'the smaller number'], a: 1, e: 'They are co-prime.' },
      { q: 'In the proof that √2 is irrational, the contradiction is that a and b', o: ['are both odd', 'have common factor 2', 'are equal', 'are negative'], a: 1, e: 'They were assumed co-prime.' }
    ],

    teach: {
      outcomes: ['State and use the Fundamental Theorem of Arithmetic', 'Find HCF and LCM by prime factorisation and use HCF × LCM = a × b', 'Prove √p (p prime) and expressions like a + b√p irrational', 'Choose HCF or LCM in word problems'],
      periods: [
        { t: 'Prime factorisation', flow: [['10 min', 'Factor-tree race; different trees, same primes — uniqueness.'], ['15 min', 'Explore panel 1; why 6ⁿ can never end in 0.'], ['15 min', 'Practice: factorisation.']] },
        { t: 'HCF and LCM', flow: [['15 min', 'Explore panel 2: prime Venn diagram.'], ['15 min', 'HCF × LCM = a × b; word problems (LCM: together again, HCF: largest equal piece).'], ['10 min', 'Practice: Standard.']] },
        { t: 'Irrationality proofs', flow: [['20 min', 'Proof for √2, then students write √3 and √5.'], ['10 min', 'a + b√p is irrational.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['HCF × LCM rule used for three numbers.', 'Smallest/greatest powers swapped.', 'Proof written without "co-prime".'],
      activities: ['Prime factor cards: build numbers and their HCF/LCM physically.', 'Bells/traffic-light timing simulation with claps.', 'Proof jigsaw: shuffle the lines of the √2 proof and reorder.'],
      exit: ['Prime factorise 1176.', 'HCF and LCM of 72 and 120.', 'Prove 5 − √3 is irrational.'],
      homework: 'Find the smallest number divisible by every number from 1 to 10.'
    },

    slides: [
      { t: 'Real Numbers', b: ['Fundamental Theorem of Arithmetic', 'HCF and LCM by primes', 'Irrational numbers and proofs'] },
      { t: 'Fundamental Theorem of Arithmetic', b: ['Every composite = product of primes', 'Unique, apart from order', '3780 = 2² × 3³ × 5 × 7'] },
      { t: 'HCF and LCM', b: ['HCF: common primes, smallest powers', 'LCM: all primes, greatest powers', 'Two numbers: HCF × LCM = a × b'] },
      { t: 'Word problems', b: ['Together again → LCM', 'Largest equal size / groups → HCF'] },
      { t: '√2 is irrational', b: ['Assume √2 = a/b, co-prime', '2b² = a² ⇒ 2 | a ⇒ a = 2c', 'b² = 2c² ⇒ 2 | b', 'Contradiction ⇒ irrational'] },
      { t: 'Check yourself', b: ['HCF(96, 404)?', 'LCM of 6 and 20?', 'Is 2√3 rational?', 'Answers: 4 · 60 · no'] }
    ],

    fs: { groups: [
        ['Fundamental Theorem of Arithmetic', [['Statement', 'every composite = product of primes, uniquely'], ['Ends in 0', 'needs both 2 and 5 as factors']]],
        ['HCF and LCM', [['HCF', 'common primes, smallest powers'], ['LCM', 'all primes, greatest powers'], ['Two numbers', 'HCF × LCM = a × b'], ['Co-prime', 'HCF = 1, LCM = a × b'], ['Together again', 'LCM'], ['Largest equal piece / group', 'HCF']]],
        ['Irrational numbers', [['Lemma', 'p prime, p | a² ⇒ p | a'], ['√p, p prime', 'irrational (contradiction proof)'], ['r + √p, r√p (r ≠ 0)', 'irrational'], ['Product of two irrationals', 'can be rational: √2 × √8 = 4']]]],
      ex: [['HCF, LCM of 96 and 404', '96 = 2⁵·3, 404 = 2²·101 ⇒ HCF 4, LCM 9696'], ['HCF 9, LCM 360, one number 45', 'other = 9 × 360 ÷ 45 = 72']],
      rem: ['Write "co-prime" in every irrationality proof.', 'HCF × LCM rule is for two numbers only.', 'Show prime factorisation as the method — marks are for steps.'] }
  });
})();
