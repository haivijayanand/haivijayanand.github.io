/*
TOOL:    class5_maths_ch13
FAMILY:  CBSE_REVISION / Class 5 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 13 Animal Jumps (multiples and factors through jumps on a number line, common multiples, common factors) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const fac = n => { const r = []; for (let i = 1; i <= n; i++) if (n % i === 0) r.push(i); return r; };
  G9.register({
    no: 13, part: 'All chapters', short: 'Multiples and factors', title: 'Animal Jumps',
    blurb: 'Animals jumping on a number line: multiples as landing spots, common multiples where two animals meet, factors as jump sizes that land exactly on a number, common factors and simple divisibility.',
    revise: {
      oneLine: 'A frog jumping 3 at a time lands on 3, 6, 9, 12… — the multiples of 3. A rabbit jumping 4 lands on 4, 8, 12… They first meet at 12, the smallest common multiple. The jump sizes that land exactly on 12 (1, 2, 3, 4, 6, 12) are the factors of 12.',
      sections: [
        { h: 'Multiples', html: `<p>Multiples of 6: 6, 12, 18, 24… (endless).</p>` },
        { h: 'Factors', html: `<p>Factors of 18: 1, 2, 3, 6, 9, 18 (they come in pairs: 1 × 18, 2 × 9, 3 × 6).</p>` },
        { h: 'Divisibility', html: `<p>By 2: even. By 5: ends 0 or 5. By 10: ends 0. By 3: digit sum divisible by 3.</p>` }
      ],
      formulas: [['Multiple of n', 'n × 1, n × 2, …'], ['Factor of n', 'divides n exactly'], ['Smallest common multiple', 'first meeting point'], ['Factor pairs', 'a × b = n']],
      terms: [['Multiple', 'in the times table'], ['Factor', 'exact divisor'], ['Common', 'shared by both']],
      traps: ['1 is a factor of every number.', 'A number is a factor and a multiple of itself.', 'Multiples go on forever; factors do not.'],
      bridge: '<p>Class 6 studies primes, HCF and LCM.</p>'
    },
    explore: [
      { title: 'Two animals jump', intro: 'Set the jump sizes; press <kbd>P</kbd> to jump. Purple dots are where both land.',
        build(el, K) { let a = 3, c = 4; const row = K.row(el); K.slider(row, 'frog jump', 2, 9, 1, a, v => { a = v; an.reset(); }); K.slider(row, 'rabbit jump', 2, 9, 1, c, v => { c = v; an.reset(); });
          const b = new K.Board(el, { xmin: -1, xmax: 41, ymin: -2, ymax: 4, axes: false, grid: 0, aspect: 0.22 }); const rd = K.read(el); const an = new K.Anim(40, () => b.redraw(), { ms: 120 });
          b.onDraw = () => { b.clear(); b.line(0, 0, 40, 0, { color: C.ink, w: 2 }); for (let i = 0; i <= 40; i++) { b.line(i, -0.2, i, 0.2, { color: C.ink, w: i % 5 ? 1 : 2 }); if (i % 5 === 0) b.text(i, -1, String(i), { font: '11px' }); } const n = an.i;
            for (let x = a; x <= Math.min(n, 40); x += a) b.arc(x - a / 2, 0, a / 2, 0, Math.PI, { color: C.blue, w: 2 }); for (let x = c; x <= Math.min(n, 40); x += c) b.arc(x - c / 2, 0, c / 2, Math.PI, 2 * Math.PI, { color: C.orange, w: 2 });
            for (let x = 1; x <= Math.min(n, 40); x++) if (x % a === 0 && x % c === 0) b.dot(x, 0, { r: 7, color: C.purple });
            const cm = []; for (let x = 1; x <= 40; x++) if (x % a === 0 && x % c === 0) cm.push(x); rd.innerHTML = `frog (blue, above): ${a}, ${2 * a}, ${3 * a}… · rabbit (orange, below): ${c}, ${2 * c}, ${3 * c}… · meet at <b>${cm.join(', ') || 'none up to 40'}</b>`; };
          K.anim(el, an); b.redraw(); return an; } },
      { title: 'Factor rectangles', intro: 'Choose a number; every rectangle made from that many squares shows a factor pair.',
        build(el, K) { let n = 18; const row = K.row(el); K.slider(row, 'number', 2, 48, 1, n, v => { n = v; draw(); }); const rd = K.read(el);
          function draw() { const f = fac(n), pairs = f.filter(x => x * x <= n).map(x => [x, n / x]); rd.innerHTML = `<div>${pairs.map(([p, q]) => `<span style="display:inline-grid;grid-template-columns:repeat(${q},10px);gap:1px;margin:6px;vertical-align:top">${'<span style="width:10px;height:10px;background:var(--blue,#1d4ed8)"></span>'.repeat(n)}</span>`).join('')}</div>factor pairs: ${pairs.map(([p, q]) => `${p} × ${q}`).join(', ')} · factors of ${n}: <b>${f.join(', ')}</b>${f.length === 2 ? ' — only two factors (a prime number)' : ''}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Multiples', gen(R) { const n = R.int(3, 12); return { q: `First five multiples of ${n}?`, a: [1, 2, 3, 4, 5].map(k => k * n).join(', ') }; } },
      { title: 'Factors', gen(R) { const n = R.pick([12, 15, 16, 18, 20, 24, 28, 30, 36]); return { q: `All factors of ${n}?`, a: fac(n).join(', ') }; } },
      { title: 'First meeting', levels: [2, 3], gen(R) { const t = R.pick([[2, 3], [3, 4], [4, 6], [3, 5], [6, 8], [4, 10], [5, 6]]); let m = t[0]; while (m % t[1]) m += t[0]; return { q: `A frog jumps ${t[0]} and a rabbit ${t[1]}, both from 0. Where do they first land together?`, a: String(m), ans: m }; } },
      { title: 'Common factors', levels: [2, 3], gen(R) { const t = R.pick([[12, 18], [16, 24], [15, 25], [20, 30], [18, 27]]); const c = fac(t[0]).filter(x => t[1] % x === 0); return { q: `Common factors of ${t[0]} and ${t[1]}?`, a: c.join(', ') }; } },
      { title: 'Divisible?', gen(R) { const n = R.int(100, 999), d = R.pick([2, 3, 5, 10]); return { q: `Is ${n} divisible by ${d}?`, a: n % d ? 'no' : 'yes' }; } }
    ],
    quiz: [
      { q: 'Multiples of 3 and 4 first meet at', o: ['12', '7', '24', '1'], a: 0, e: 'Smallest common multiple.' }, { q: 'Factors of 12', o: ['1, 2, 3, 4, 6, 12', '2, 4, 6', '12, 24, 36', '1, 12'], a: 0, e: 'All divisors.' },
      { q: 'Is 7 a factor of 42?', o: ['yes', 'no', 'only sometimes', 'cannot tell'], a: 0, e: '7 × 6.' }, { q: 'Factor of every number', o: ['1', '0', '2', '10'], a: 0, e: 'n × 1.' },
      { q: 'Multiples of 5 end in', o: ['0 or 5', '5 only', 'even digits', 'any digit'], a: 0, e: 'Rule.' }, { q: 'Divisible by 3: 123?', o: ['yes', 'no', 'only by 2', 'cannot tell'], a: 0, e: '1 + 2 + 3 = 6.' },
      { q: 'Number with only factors 1 and itself', o: ['13', '15', '21', '27'], a: 0, e: 'Prime.' }, { q: 'Factor pairs of 18', o: ['1×18, 2×9, 3×6', '2×9 only', '3×6, 6×3 only', '1×18 only'], a: 0, e: 'Three pairs.' },
      { q: 'Multiples of a number are', o: ['endless', 'few', 'less than it', 'factors'], a: 0, e: 'Go on.' }, { q: 'Common factors of 12 and 18', o: ['1, 2, 3, 6', '1, 2', '6 only', '36'], a: 0, e: 'Both lists.' },
      { q: '4 jumps of 7 lands on', o: ['28', '11', '24', '74'], a: 0, e: '4 × 7.' }
    ],
    teach: {
      outcomes: ['List multiples and factors', 'Find common multiples and factors', 'Use divisibility rules'],
      periods: [{ t: 'Jumps', flow: [['10 min', 'Hop on a floor number line.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Common multiples.']] }, { t: 'Factors', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Divisibility rules.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['1 not a factor.', 'Factors and multiples mixed.'], activities: ['Square-tile rectangles.', 'Jump game with two counters.'],
      exit: ['Factors of 20.', 'First common multiple of 6 and 9.', 'Is 345 divisible by 5?'], homework: 'Find a number between 1 and 50 with the most factors. Show its factor rectangles.'
    },
    slides: [{ t: 'Animal Jumps', b: ['Multiples as landing spots', 'Meeting points', 'Factors and pairs', 'Divisibility'] }, { t: 'Check yourself', b: ['Factors of 24?', 'Jumps of 4 and 6 meet at?'] }],
    fs: { groups: [['Multiples', [['of 6', '6, 12, 18, 24…'], ['Common of 3, 4', '12, 24…']]], ['Factors', [['of 18', '1, 2, 3, 6, 9, 18'], ['Pairs', '1×18, 2×9, 3×6']]], ['Divisibility', [['2', 'even'], ['3', 'digit sum'], ['5', 'ends 0/5'], ['10', 'ends 0']]]],
      ex: [['Jumps 4 and 6', 'meet at 12'], ['Common factors 12, 18', '1, 2, 3, 6']], rem: ['1 divides everything.', 'Factors come in pairs.', 'Multiples never end.'] }
  });
})();
