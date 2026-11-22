/*
TOOL:    class6_maths_ch05
FAMILY:  CBSE_REVISION / Class 6 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 5 Prime Time (common multiples and factors, primes and composites, sieve, co-primes, prime factorisation, divisibility by 4 and 8) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const pf = n => { const r = []; let d = 2; while (n > 1) { while (n % d === 0) { r.push(d); n /= d; } d++; } return r; };
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  G9.register({
    no: 5, part: 'All chapters', short: 'Primes and factors', title: 'Prime Time',
    blurb: 'Common multiples and common factors (the idle-fizz game), prime and composite numbers, the Sieve of Eratosthenes, co-prime pairs, prime factorisation and divisibility rules for 2, 3, 4, 5, 8, 10.',
    revise: {
      oneLine: 'A prime has exactly two factors (1 and itself): 2, 3, 5, 7, 11… 1 is neither prime nor composite. Every number above 1 is a product of primes in one way: 360 = 2 × 2 × 2 × 3 × 3 × 5. Two numbers are co-prime if their only common factor is 1.',
      sections: [
        { h: 'Common multiples and factors', html: `<p>Common multiples of 4 and 6: 12, 24, 36… Common factors of 12 and 18: 1, 2, 3, 6.</p>` },
        { h: 'Primes', html: `<p>Sieve: cross out multiples of 2, 3, 5, 7 from 1–100; 25 primes remain.</p>` },
        { h: 'Divisibility', html: `<p>By 4: last two digits divisible by 4. By 8: last three digits divisible by 8. By 3/9: digit sum.</p>` }
      ],
      formulas: [['Prime', 'exactly 2 factors'], ['Composite', 'more than 2 factors'], ['Co-prime', 'only common factor 1'], ['Prime factorisation', 'unique product of primes']],
      terms: [['Factor', 'divides exactly'], ['Multiple', 'n × k'], ['Co-prime', 'like 8 and 15']],
      traps: ['1 is not prime.', '2 is the only even prime.', 'Co-prime numbers need not be prime (8, 15).'],
      bridge: '<p>Class 7 uses HCF/LCM ideas with fractions.</p>'
    },
    explore: [
      { title: 'Sieve of Eratosthenes', intro: 'Press <kbd>S</kbd> to cross out the multiples of the next prime.',
        build(el, K) { const P = [2, 3, 5, 7]; const box = document.createElement('div'); box.style.cssText = 'display:grid;grid-template-columns:repeat(10,40px);gap:2px;margin:8px 0'; el.appendChild(box); const rd = K.read(el); const an = new K.Anim(4, () => draw(), { ms: 900 });
          function draw() { const k = an.i, used = P.slice(0, k); box.innerHTML = Array.from({ length: 100 }, (_, i) => i + 1).map(n => { const by = used.find(p => n !== p && n % p === 0); const prime = n > 1 && !by && (k === 4 || used.includes(n)); return `<div style="text-align:center;padding:4px 0;border-radius:4px;border:1px solid var(--rule,#cbd5e1);${n === 1 ? 'color:var(--grey,#64748b)' : by ? 'text-decoration:line-through;color:var(--grey,#64748b);background:var(--orangeL,#ffedd5)' : prime ? 'background:var(--blue,#1d4ed8);color:#fff;font-weight:bold' : ''}">${n}</div>`; }).join('');
            rd.innerHTML = k === 0 ? '1 is neither prime nor composite. Press S to start.' : k < 4 ? `crossed out multiples of ${used.join(', ')}` : 'all remaining numbers are prime: <b>25 primes</b> up to 100'; }
          K.anim(el, an); draw(); return an; } },
      { title: 'Factor tree', intro: 'Choose a number; it splits into primes.',
        build(el, K) { let n = 360; const row = K.row(el); K.slider(row, 'number', 4, 500, 1, n, v => { n = v; draw(); }); const rd = K.read(el);
          function draw() { const f = pf(n); let cur = n, steps = []; f.slice(0, -1).forEach(p => { steps.push(`${cur} = <b>${p}</b> × ${cur / p}`); cur /= p; }); const g = {}; f.forEach(p => g[p] = (g[p] || 0) + 1);
            rd.innerHTML = `${steps.map(s => `<div>${s}</div>`).join('') || `<div>${n} is prime</div>`}<div style="margin-top:6px">${n} = <b>${f.join(' × ')}</b>${f.length > 1 ? ' = ' + Object.entries(g).map(([p, e]) => e > 1 ? `${p}<sup>${e}</sup>` : p).join(' × ') : ''}${f.length === 1 ? ' (prime)' : ''}</div>`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Prime or composite', gen(R) { const n = R.int(2, 99); return { q: `Is ${n} prime or composite?`, a: pf(n).length === 1 ? 'prime' : `composite (${pf(n).join(' × ')})` }; } },
      { title: 'Prime factorisation', gen(R) { const n = R.pick([36, 48, 60, 72, 84, 90, 96, 120, 144, 150, 180, 210, 360]); return { q: `Prime factorisation of ${n}?`, a: pf(n).join(' × ') }; } },
      { title: 'Common factors', gen(R) { const t = R.pick([[12, 18], [24, 36], [15, 25], [16, 40], [27, 45], [20, 50]]); const f = []; for (let i = 1; i <= t[0]; i++) if (t[0] % i === 0 && t[1] % i === 0) f.push(i); return { q: `Common factors of ${t[0]} and ${t[1]}?`, a: f.join(', ') }; } },
      { title: 'Co-prime?', levels: [2, 3], gen(R) { const a = R.int(4, 30), b = R.int(4, 30); return { q: `Are ${a} and ${b} co-prime?`, a: gcd(a, b) === 1 ? 'yes' : `no (common factor ${gcd(a, b)})` }; } },
      { title: 'Divisibility by 4 and 8', levels: [2, 3], gen(R) { const n = R.int(1000, 99999), d = R.pick([4, 8]); return { q: `Is ${n} divisible by ${d}? (Use the rule.)`, a: `${n % d ? 'no' : 'yes'} — last ${d === 4 ? 'two' : 'three'} digits ${String(n).slice(d === 4 ? -2 : -3)}` }; } }
    ],
    quiz: [
      { q: '1 is', o: ['neither prime nor composite', 'prime', 'composite', 'even prime'], a: 0, e: 'One factor.' }, { q: 'Only even prime', o: ['2', '4', '0', 'none'], a: 0, e: 'Others divisible by 2.' },
      { q: 'Primes up to 100', o: ['25', '20', '30', '50'], a: 0, e: 'Sieve.' }, { q: '360 =', o: ['2³ × 3² × 5', '2² × 3² × 5', '2 × 3 × 5 × 12', '6²'], a: 0, e: 'Factor tree.' },
      { q: 'Co-prime pair', o: ['8, 15', '6, 9', '10, 15', '12, 18'], a: 0, e: 'HCF 1.' }, { q: 'Divisible by 4: 7,316?', o: ['yes', 'no', 'only by 2', 'cannot tell'], a: 0, e: '16 ÷ 4.' },
      { q: 'Common factors of 12 and 18', o: ['1, 2, 3, 6', '1, 2', '6, 36', '2, 3'], a: 0, e: 'Both lists.' }, { q: 'Composite', o: ['91', '89', '97', '83'], a: 0, e: '7 × 13.' },
      { q: 'Smallest common multiple of 4 and 6', o: ['12', '24', '2', '10'], a: 0, e: 'First meeting.' }, { q: 'Divisible by 8: 5,128?', o: ['yes', 'no', 'only by 4', 'cannot tell'], a: 0, e: '128 ÷ 8 = 16.' },
      { q: 'Twin primes', o: ['17, 19', '19, 23', '21, 23', '13, 15'], a: 0, e: 'Differ by 2, both prime.' }
    ],
    teach: {
      outcomes: ['Find common factors and multiples', 'Identify primes', 'Factorise into primes', 'Use divisibility rules'],
      periods: [{ t: 'Primes', flow: [['10 min', 'Idli-vada (fizz) game.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Co-primes.']] }, { t: 'Factorisation', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Divisibility rules.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['1 prime.', 'Co-prime must be prime.'], activities: ['Sieve on paper.', 'Factor tree race.'],
      exit: ['Factorise 84.', 'Is 51 prime?', 'Divisible by 8: 3,416?'], homework: 'Find all primes between 100 and 150 using divisibility checks by 2, 3, 5, 7, 11.'
    },
    slides: [{ t: 'Prime Time', b: ['Common factors and multiples', 'Primes and the sieve', 'Co-primes', 'Prime factorisation', 'Divisibility'] }, { t: 'Check yourself', b: ['Factorise 96?', 'Co-prime: 14, 25?'] }],
    fs: { groups: [['Primes', [['Prime', 'exactly 2 factors'], ['1', 'neither'], ['Up to 100', '25 primes']]], ['Factorisation', [['360', '2³ × 3² × 5'], ['Unique', 'one way only']]], ['Divisibility', [['4', 'last 2 digits'], ['8', 'last 3 digits'], ['3, 9', 'digit sum']]]],
      ex: [['84', '2 × 2 × 3 × 7'], ['8 and 15', 'co-prime']], rem: ['1 is not prime.', '2 is the only even prime.', 'Co-prime ≠ prime.'] }
  });
})();
