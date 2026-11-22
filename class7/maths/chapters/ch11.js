/*
TOOL:    class7_maths_ch11
FAMILY:  CBSE_REVISION / Class 7 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 11 Finding Common Ground (Part II Ch 3: common factors and multiples, prime factorisation, HCF and LCM, word problems) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const gcd = (a, b) => b ? gcd(b, a % b) : a, lcm = (a, b) => a / gcd(a, b) * b;
  const pf = n => { const r = []; let d = 2; while (n > 1) { while (n % d === 0) { r.push(d); n /= d; } d++; } return r; };
  G9.register({
    no: 11, part: 'Part II', short: 'HCF and LCM', title: 'Finding Common Ground',
    blurb: 'Part II Chapter 3. Common factors and common multiples, finding the HCF and LCM by listing, by prime factorisation and by division, HCF × LCM = product of two numbers, and deciding which one a word problem needs.',
    revise: {
      oneLine: 'HCF = the largest number dividing both; LCM = the smallest number both divide. With prime factors 72 = 2³ × 3² and 120 = 2³ × 3 × 5: HCF takes the lower powers of common primes (2³ × 3 = 24); LCM takes the higher powers of all primes (2³ × 3² × 5 = 360). For two numbers, HCF × LCM = product: 24 × 360 = 72 × 120.',
      sections: [
        { h: 'Which one?', html: `<p>Biggest equal pieces / groups → HCF. When will things happen together again / smallest common length → LCM.</p>` },
        { h: 'Methods', html: `<p>Listing, prime factorisation, or repeated division (Euclid: HCF(72, 120) = HCF(72, 48) = HCF(48, 24) = 24).</p>` },
        { h: 'Co-prime', html: `<p>HCF = 1 ⇒ LCM = product (8 and 15 → 120).</p>` }
      ],
      formulas: [['HCF', 'lowest powers of common primes'], ['LCM', 'highest powers of all primes'], ['HCF × LCM', 'a × b'], ['Co-prime', 'HCF 1, LCM ab']],
      terms: [['HCF (GCD)', 'highest common factor'], ['LCM', 'lowest common multiple'], ['Co-prime', 'HCF 1']],
      traps: ['Mixing up HCF and LCM in word problems.', 'HCF × LCM = product works for two numbers only.', 'Missing a prime in the LCM.'],
      bridge: '<p>Used for adding fractions and in Class 8 number theory.</p>'
    },
    explore: [
      { title: 'Prime factor Venn', intro: 'Choose two numbers; shared prime factors sit in the middle.',
        build(el, K) { let a = 72, b2 = 120; const row = K.row(el); K.slider(row, 'a', 2, 200, 1, a, v => { a = v; bd.redraw(); }); K.slider(row, 'b', 2, 200, 1, b2, v => { b2 = v; bd.redraw(); }); const bd = new K.Board(el, { xmin: -5, xmax: 5, ymin: -2.6, ymax: 2.6, axes: false, grid: 0, equal: true }); const rd = K.read(el);
          bd.onDraw = () => { bd.clear(); const A = pf(a), B = pf(b2), Bc = [...B], common = []; const onlyA = []; A.forEach(p => { const i = Bc.indexOf(p); if (i >= 0) { common.push(p); Bc.splice(i, 1); } else onlyA.push(p); });
            bd.circle(-1.2, 0, 2.3, { fill: 'rgba(29,78,216,.10)', color: C.blue, w: 2 }); bd.circle(1.2, 0, 2.3, { fill: 'rgba(234,88,12,.10)', color: C.orange, w: 2 }); bd.text(-2.6, 2.1, String(a), { font: 'bold 15px', color: C.blue }); bd.text(2.6, 2.1, String(b2), { font: 'bold 15px', color: C.orange });
            bd.text(-2.3, 0, onlyA.join(' × ') || '—', { font: '15px' }); bd.text(0, 0, common.join(' × ') || '1', { font: 'bold 15px', color: C.purple }); bd.text(2.3, 0, Bc.join(' × ') || '—', { font: '15px' });
            rd.innerHTML = `HCF = middle = <b>${gcd(a, b2)}</b> · LCM = everything = <b>${lcm(a, b2)}</b> · check ${gcd(a, b2)} × ${lcm(a, b2)} = ${a * b2} = ${a} × ${b2}`; };
          bd.redraw(); return null; } },
      { title: 'Euclid by rectangles', intro: 'Cut the largest squares from an a × b rectangle; the last square side is the HCF. Press <kbd>S</kbd>.',
        build(el, K) { let a = 21, b2 = 15; const row = K.row(el); K.slider(row, 'a', 2, 40, 1, a, v => { a = v; an.reset(); }); K.slider(row, 'b', 2, 30, 1, b2, v => { b2 = v; an.reset(); }); const bd = new K.Board(el, { xmin: -1, xmax: 41, ymin: -1, ymax: 31, axes: false, grid: 0, equal: true }); const rd = K.read(el); const an = new K.Anim(30, () => bd.redraw(), { ms: 500 });
          bd.onDraw = () => { bd.clear(); bd.rect(0, 0, a, b2, { color: C.ink, w: 2 }); let x = 0, y = 0, W = a, H = b2, k = 0, log = []; const cols = [C.blueL, C.orangeL, C.purpleL, 'rgba(202,138,4,.25)']; let c = 0;
            while (W > 0 && H > 0 && k < an.i) { const s = Math.min(W, H); bd.rect(x, y, s, s, { fill: cols[c % 4], color: C.ink, w: 1 }); if (W >= H) { x += s; W -= s; } else { y += s; H -= s; } k++; if (log.length === 0 || log[log.length - 1][0] !== s) { log.push([s, 1]); c++; } else log[log.length - 1][1]++; }
            rd.innerHTML = `${log.map(([s, n]) => `${n} square${n > 1 ? 's' : ''} of ${s}`).join(', ')}${(W === 0 || H === 0) ? ` · done: HCF(${a}, ${b2}) = <b>${gcd(a, b2)}</b>` : ''}`; };
          K.anim(el, an); bd.redraw(); return an; } }
    ],
    gens: [
      { title: 'HCF', gen(R) { const g = R.int(2, 15), x = R.int(2, 9), y = R.int(2, 9); const a = g * x, b = g * y; return { q: `HCF of ${a} and ${b}?`, a: String(gcd(a, b)), ans: gcd(a, b) }; } },
      { title: 'LCM', gen(R) { const a = R.int(4, 30), b = R.int(4, 30); return { q: `LCM of ${a} and ${b}?`, a: String(lcm(a, b)), ans: lcm(a, b) }; } },
      { title: 'Prime factor method', levels: [2, 3], gen(R) { const t = R.pick([[72, 120], [84, 126], [60, 90], [48, 180], [96, 144]]); return { q: `Using prime factors, find the HCF and LCM of ${t[0]} and ${t[1]}.`, a: `${t[0]} = ${pf(t[0]).join('×')}, ${t[1]} = ${pf(t[1]).join('×')}; HCF ${gcd(...t)}, LCM ${lcm(...t)}` }; } },
      { title: 'Word problem', gen(R) { if (R.chance(.5)) { const g = R.int(5, 25), x = R.int(2, 7), y = R.int(2, 7); return { q: `Two ropes are ${g * x} m and ${g * y} m long. They are cut into equal pieces as long as possible. Piece length?`, a: `${gcd(g * x, g * y)} m (HCF)`, ans: gcd(g * x, g * y) }; } const a = R.pick([6, 8, 10, 12, 15]), b = R.pick([9, 12, 16, 18, 20]); return { q: `Two bells ring every ${a} and ${b} minutes. They ring together now. After how many minutes together again?`, a: `${lcm(a, b)} minutes (LCM)`, ans: lcm(a, b) }; } },
      { title: 'HCF × LCM', levels: [3], gen(R) { const g = R.int(2, 12), x = R.int(2, 9), y = R.int(2, 9); if (gcd(x, y) !== 1) return { q: 'HCF of 12 and 18 is 6. LCM?', a: '36', ans: 36 }; const a = g * x, b = g * y; return { q: `HCF of ${a} and ${b} is ${g}. Find the LCM without listing.`, a: `${a} × ${b} ÷ ${g} = ${a * b / g}`, ans: a * b / g }; } }
    ],
    quiz: [
      { q: 'HCF of 72 and 120', o: ['24', '12', '360', '8'], a: 0, e: '2³ × 3.' }, { q: 'LCM of 72 and 120', o: ['360', '720', '24', '8640'], a: 0, e: '2³ × 3² × 5.' },
      { q: 'Equal biggest pieces →', o: ['HCF', 'LCM', 'sum', 'product'], a: 0, e: 'Divides both.' }, { q: 'Bells together again →', o: ['LCM', 'HCF', 'difference', 'sum'], a: 0, e: 'Common multiple.' },
      { q: 'HCF × LCM for two numbers =', o: ['their product', 'their sum', '1', 'the HCF'], a: 0, e: 'Identity.' }, { q: 'LCM of 8 and 15', o: ['120', '23', '1', '60'], a: 0, e: 'Co-prime.' },
      { q: 'HCF of co-prime numbers', o: ['1', '0', 'their product', '2'], a: 0, e: 'Definition.' }, { q: 'HCF(48, 18)', o: ['6', '3', '12', '144'], a: 0, e: '2 × 3.' },
      { q: 'LCM(6, 8)', o: ['24', '48', '2', '14'], a: 0, e: '2³ × 3.' }, { q: 'Euclid: HCF(72, 120) = HCF(72, ?)', o: ['48', '192', '24', '120'], a: 0, e: '120 − 72.' },
      { q: 'LCM is always', o: ['≥ the larger number', '≤ the smaller', 'prime', 'odd'], a: 0, e: 'Multiple.' }
    ],
    teach: {
      outcomes: ['Find HCF and LCM by different methods', 'Use HCF × LCM = product', 'Choose HCF or LCM in problems'],
      periods: [{ t: 'Prime factors', flow: [['10 min', 'Common factor/multiple lists.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Prime factor method.']] }, { t: 'Problems', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'HCF or LCM story sort.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['HCF/LCM swapped.', 'Product rule for three numbers.'], activities: ['Tile a rectangle with squares.', 'Bus timetable meetings.'],
      exit: ['HCF and LCM of 36 and 48.', 'Choose HCF or LCM for a story.', 'LCM from HCF.'], homework: 'Two traffic lights change every 45 s and 60 s. When do they change together? Make a timeline.'
    },
    slides: [{ t: 'Finding Common Ground', b: ['Common factors and multiples', 'Prime factor method', 'Euclid', 'HCF × LCM', 'Word problems'] }, { t: 'Check yourself', b: ['HCF(84, 126)?', 'LCM(12, 18)?'] }],
    fs: { groups: [['Methods', [['Prime factors', 'HCF lowest, LCM highest powers'], ['Euclid', 'HCF(a, b) = HCF(b, a − b)']]], ['Facts', [['HCF × LCM', 'a × b'], ['Co-prime', 'HCF 1, LCM ab']]], ['Problems', [['Equal pieces, groups', 'HCF'], ['Together again', 'LCM']]]],
      ex: [['72, 120', 'HCF 24, LCM 360'], ['8, 15', 'HCF 1, LCM 120']], rem: ['Decide HCF or LCM first.', 'Check HCF × LCM.', 'Write prime factors with powers.'] }
  });
})();
