/*
TOOL:    class8_maths_ch01
FAMILY:  CBSE_REVISION / Class 8 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class VIII moved into the series
CHANGES: 1.0.0 - Part I Ch 1 A Square and A Cube - revise, 2 explore panels (locker puzzle, squares as sums of odd numbers), 8 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num } = G9;
  const pf = (n) => { const f = []; let m = n; for (let p = 2; p * p <= m; p++) while (m % p === 0) { f.push(p); m /= p; } if (m > 1) f.push(m); return f; };

  G9.register({
    no: 1, part: 'Part I', short: 'Squares & cubes', title: 'A Square and A Cube',
    blurb: 'Perfect squares and cubes, their patterns, the locker puzzle, square and cube roots by prime factorisation and estimation.',
    revise: {
      oneLine: 'A square number n² has an odd number of factors, ends in 0, 1, 4, 5, 6 or 9, and is the sum of the first n odd numbers. Prime factors in pairs give square roots; in triples, cube roots.',
      sections: [
        { h: 'Square numbers', html: `<p>n² = n × n. Perfect squares: 1, 4, 9, 16, 25, … They end in 0, 1, 4, 5, 6 or 9 — so a number ending in 2, 3, 7 or 8 is never a square. A square ending in 0 ends in an even number of zeros.</p>
          <p><b>Locker puzzle</b>: only lockers with a perfect-square number stay open, because only squares have an odd number of factors (factors pair up, except √n).</p>` },
        { h: 'Patterns', html: `<ul><li>1 + 3 + 5 + … + (2n − 1) = n².</li><li>Between n² and (n + 1)² there are 2n non-square numbers.</li><li>(n + 1)² − n² = 2n + 1.</li><li>Pythagorean triples: (2m, m² − 1, m² + 1).</li></ul>` },
        { h: 'Square roots', html: `<p>√n is the positive number whose square is n. Methods: <b>prime factorisation</b> (pair the primes: √324 = √(2·2·3·3·3·3) = 2·3·3 = 18); <b>repeated subtraction of odd numbers</b>; <b>estimation</b> between known squares (√250 is between 15 and 16, nearer 16).</p>
          <p>To make a number a perfect square, multiply (or divide) by the unpaired prime factors.</p>` },
        { h: 'Cubes and cube roots', html: `<p>n³ = n × n × n: 1, 8, 27, 64, 125, … Cube root by grouping prime factors in threes: ∛1728 = ∛(2³·2³·3³) = 12. 1729 = 1³ + 12³ = 9³ + 10³ (Hardy–Ramanujan number). Sum of consecutive odd numbers also builds cubes: 3 + 5 = 8, 7 + 9 + 11 = 27.</p>` }
      ],
      formulas: [['Sum of first n odd numbers', 'n²'], ['Gap between squares', '(n + 1)² − n² = 2n + 1'], ['Square endings', '0, 1, 4, 5, 6, 9'], ['√ by factors', 'take one from each pair'], ['∛ by factors', 'take one from each triple'], ['Triples', '(2m, m² − 1, m² + 1)']],
      terms: [['Perfect square', 'n² for a whole number n'], ['Perfect cube', 'n³'], ['Square root', 'number whose square is given'], ['Hardy–Ramanujan number', '1729']],
      traps: ['√ of a sum is not the sum of √s.', 'Ending in 1, 4, 9 does not make a number square (21 is not).', 'Forgetting to pair every prime.', 'Cube of a negative is negative.'],
      bridge: '<p>Ch 2 (Power Play) generalises squares and cubes to any power; Ch 9 (Baudhāyana-Pythagoras) uses square roots and triples.</p>'
    },

    explore: [
      {
        title: 'The locker puzzle', intro: '100 lockers start closed. Person k toggles every k-th locker. Press <kbd>S</kbd> for the next person. Which stay open?',
        build(el, K) {
          const N = 100; const box = document.createElement('div'); box.style.cssText = 'display:grid;grid-template-columns:repeat(20,1fr);gap:3px;max-width:900px;margin:8px 0'; el.appendChild(box); const rd = K.read(el);
          const an = new K.Anim(N, () => draw(), { ms: 250 });
          function draw() { const k = an.i; box.innerHTML = Array.from({ length: N }, (_, i) => { const n = i + 1; let t = 0; for (let d = 1; d <= k; d++) if (n % d === 0) t++; const open = t % 2 === 1; return `<div title="locker ${n}" style="font:11px Consolas;text-align:center;padding:3px 0;border-radius:3px;border:2px solid ${open ? 'var(--orange,#ea580c)' : 'var(--rule,#cbd5e1)'};background:${open ? 'var(--orangeL,#ffedd5)' : 'transparent'};font-weight:${open ? 'bold' : 'normal'}">${n}</div>`; }).join('');
            const openL = []; for (let n = 1; n <= N; n++) { let t = 0; for (let d = 1; d <= k; d++) if (n % d === 0) t++; if (t % 2) openL.push(n); }
            rd.innerHTML = k === 0 ? 'All lockers closed. Press S or P.' : `after person ${k}: ${openL.length} open${k === N ? ` — ${openL.join(', ')}: exactly the perfect squares (odd number of factors)` : ''}`; }
          K.anim(el, an); draw(); return an;
        }
      },
      {
        title: 'Squares are sums of odd numbers', intro: 'Each L-shaped layer adds the next odd number. Press <kbd>S</kbd> to add a layer.',
        build(el, K) {
          const bd = new K.Board(el, { xmin: -0.5, xmax: 11, ymin: -0.5, ymax: 11, axes: false, grid: 0 }); const rd = K.read(el); const cols = [C.blue, C.orange, C.purple];
          const an = new K.Anim(10, () => bd.redraw(), { ms: 700 });
          bd.onDraw = () => { bd.clear(); const n = an.i + 1; for (let L = 0; L < n; L++) for (let x = 0; x <= L; x++) for (let y = 0; y <= L; y++) if (x === L || y === L) bd.rect(x, y, 0.92, 0.92, { fill: cols[L % 3] + '55', color: cols[L % 3], w: 1.5 });
            rd.innerHTML = `${Array.from({ length: n }, (_, i) => 2 * i + 1).join(' + ')} = <b>${n * n}</b> = ${n}² · next layer adds ${2 * n + 1} = 2×${n} + 1`; };
          K.anim(el, an); bd.redraw(); return an;
        }
      }
    ],

    gens: [
      { title: 'Is it a perfect square?', levels: [1, 2], gen(R) {
          const sq = R.chance(.5); let n; if (sq) n = R.int(11, 60) ** 2; else { do { n = R.int(120, 3600); } while (Number.isInteger(Math.sqrt(n))); }
          return { q: `Is ${n} a perfect square? Give a reason.`, a: sq ? `Yes, ${n} = ${Math.sqrt(n)}²` : `No${[2, 3, 7, 8].includes(n % 10) ? ` (ends in ${n % 10})` : ` (lies between ${Math.floor(Math.sqrt(n))}² and ${Math.ceil(Math.sqrt(n))}²)`}` };
        } },
      { title: 'Square root by prime factorisation', gen(R) {
          const r = R.pick([12, 14, 15, 18, 21, 24, 28, 32, 35, 36, 42, 45, 48, 54, 56, 63, 72, 84, 96]); const n = r * r;
          return { q: `Find √${n} by prime factorisation.`, a: String(r), ans: r, s: `${n} = ${pf(n).join(' × ')}` };
        } },
      { title: 'Smallest multiplier for a square', levels: [2, 3], gen(R) {
          const base = R.int(4, 20), k = R.pick([2, 3, 5, 6, 7, 10]); const n = base * base * k;
          return { q: `Find the smallest number by which ${n} must be multiplied to get a perfect square. Find the square root of the product.`, a: `${k}; √${n * k} = ${base * k}`, ans: k, s: `${n} = ${pf(n).join(' × ')}` };
        } },
      { title: 'Sum of odd numbers', levels: [1, 2], gen(R) {
          const n = R.int(5, 30); return { q: `Find the sum of the first ${n} odd numbers without adding.`, a: String(n * n), ans: n * n, s: 'sum of first n odd numbers = n²' };
        } },
      { title: 'Non-squares between squares', levels: [1, 2], gen(R) {
          const n = R.int(8, 60); return { q: `How many whole numbers lie between ${n}² and ${n + 1}²?`, a: String(2 * n), ans: 2 * n, s: '2n' };
        } },
      { title: 'Estimate a square root', levels: [2, 3], gen(R) {
          let n; do { n = R.int(30, 900); } while (Number.isInteger(Math.sqrt(n))); const lo = Math.floor(Math.sqrt(n));
          return { q: `Between which two consecutive whole numbers does √${n} lie? Which is it closer to?`, a: `between ${lo} and ${lo + 1}, closer to ${n - lo * lo < (lo + 1) ** 2 - n ? lo : lo + 1}`, s: `${lo}² = ${lo * lo}, ${lo + 1}² = ${(lo + 1) ** 2}` };
        } },
      { title: 'Cube root', gen(R) {
          const r = R.pick([6, 8, 9, 12, 14, 15, 16, 18, 20, 21, 24, 25]); return { q: `Find ∛${r ** 3} by prime factorisation.`, a: String(r), ans: r, s: `${r ** 3} = ${pf(r ** 3).join(' × ')}` };
        } },
      { title: 'Pythagorean triple', levels: [2, 3], gen(R) {
          const m = R.int(2, 12); return { q: `Write a Pythagorean triple whose smallest even member is ${2 * m}.`, a: `${2 * m}, ${m * m - 1}, ${m * m + 1}`, s: '(2m, m² − 1, m² + 1)' };
        } }
    ],

    quiz: [
      { q: 'Which can never be a perfect square?', o: ['1024', '6328', '2025', '441'], a: 1, e: 'Ends in 8.' },
      { q: '1 + 3 + 5 + … + 19 =', o: ['100', '81', '121', '90'], a: 0, e: '10 odd numbers.' },
      { q: '√576 =', o: ['24', '26', '22', '28'], a: 0, e: '24².' },
      { q: 'Numbers between 12² and 13²', o: ['24', '25', '12', '26'], a: 0, e: '2 × 12.' },
      { q: 'In the locker puzzle, locker 36 is', o: ['open', 'closed', 'toggled once', 'never touched'], a: 0, e: '36 is a square.' },
      { q: '∛2744 =', o: ['14', '12', '16', '18'], a: 0, e: '14³.' },
      { q: '1729 is famous because', o: ['it is a sum of two cubes in two ways', 'it is a square', 'it is prime', 'it is a cube'], a: 0, e: '1³ + 12³ = 9³ + 10³.' },
      { q: 'Smallest number to multiply 72 by to get a square', o: ['2', '3', '6', '8'], a: 0, e: '72 = 2³·3².' },
      { q: 'Square of an odd number is', o: ['odd', 'even', 'either', 'prime'], a: 0, e: 'odd × odd.' },
      { q: '(−3)³ =', o: ['−27', '27', '−9', '9'], a: 0, e: 'Odd power keeps the sign.' },
      { q: 'A perfect square has', o: ['an odd number of factors', 'an even number of factors', 'exactly 2 factors', 'no factors'], a: 0, e: '√n pairs with itself.' }
    ],

    teach: {
      outcomes: ['Recognise squares and cubes and their patterns', 'Explain the locker puzzle with factors', 'Find square and cube roots by prime factorisation and estimation', 'Generate Pythagorean triples'],
      periods: [
        { t: 'Squares and patterns', flow: [['10 min', 'Explore panel 1: lockers.'], ['15 min', 'Endings, odd sums (panel 2), gaps.'], ['15 min', 'Practice.']] },
        { t: 'Square roots', flow: [['20 min', 'Prime factorisation; making squares.'], ['10 min', 'Estimation between squares.'], ['10 min', 'Practice.']] },
        { t: 'Cubes', flow: [['15 min', 'Cubes from unit cubes; 1729.'], ['15 min', 'Cube roots.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Ending in 1/4/9 ⇒ square.', '√(a + b) = √a + √b.', 'Unpaired primes ignored.'],
      activities: ['Class locker game with 30 students and paper doors.', 'Build squares with square tiles, cubes with blocks.'],
      exit: ['√1296.', 'Sum of first 15 odd numbers.', '∛3375.'],
      homework: 'Find the smallest square number divisible by each of 4, 9 and 10. Find the smallest number by which 3087 must be multiplied to make a perfect cube.'
    },

    slides: [
      { t: 'A Square and A Cube', b: ['Squares and their patterns', 'Locker puzzle', 'Square roots', 'Cubes and cube roots'] },
      { t: 'Patterns', b: ['Squares end in 0, 1, 4, 5, 6, 9', '1 + 3 + … + (2n − 1) = n²', '2n numbers between n² and (n + 1)²'] },
      { t: 'Roots', b: ['Pair primes for √', 'Triple primes for ∛', 'Estimate between known squares'] },
      { t: 'Check yourself', b: ['√784?', '∛1331?', 'Answers: 28 · 11'] }
    ],

    fs: { groups: [
        ['Squares', [['Endings', '0, 1, 4, 5, 6, 9'], ['Odd numbers', '1 + 3 + … + (2n − 1) = n²'], ['Gap', '(n + 1)² − n² = 2n + 1'], ['Between n² and (n + 1)²', '2n non-squares'], ['Factors', 'odd number of factors']]],
        ['Square roots', [['Prime factorisation', 'one prime from each pair'], ['Make a square', 'multiply by unpaired primes'], ['Estimate', 'between neighbouring squares']]],
        ['Cubes', [['First cubes', '1, 8, 27, 64, 125, 216, 343, 512, 729, 1000'], ['∛ by factors', 'one prime from each triple'], ['1729', '1³ + 12³ = 9³ + 10³']]],
        ['Triples', [['(2m, m² − 1, m² + 1)', 'm = 2: 4, 3, 5'], ['Check', 'a² + b² = c²']]]],
      ex: [['√7056', '2⁴·3²·7² ⇒ 2²·3·7 = 84'], ['∛13824', '2⁹·3³ ⇒ 2³·3 = 24']],
      rem: ['Pair or triple every prime.', 'Squares never end in 2, 3, 7, 8.', 'Know squares to 30² and cubes to 12³.'] }
  });
})();
