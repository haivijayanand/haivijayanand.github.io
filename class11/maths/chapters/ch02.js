/*
TOOL:    class11_maths_ch02
FAMILY:  CBSE_REVISION / Class 11 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 2 Relations and Functions - revise, exam focus, 2 explore panels (function gallery, arrow diagram test), 7 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num, terms } = G9;
  const P = (a, b) => `(${a}, ${b})`;

  G9.register({
    no: 2, part: 'Unit I · Sets and Functions (23 marks)', short: 'Relations & functions', title: 'Relations and Functions',
    blurb: 'Cartesian products, relations, domain and range, functions and their graphs, algebra of functions.',
    revise: {
      oneLine: 'A relation from A to B is any subset of A × B; a function is a relation in which every element of A has exactly one image. Real functions are best understood through their graphs.',
      sections: [
        { h: 'Cartesian product', html: `<p>A × B = {(a, b) : a ∈ A, b ∈ B}; n(A × B) = n(A) · n(B). Ordered pairs are equal only when both entries are equal: (x + 1, y − 2) = (3, 1) ⇒ x = 2, y = 3.</p>` },
        { h: 'Relations', html: `<p>A relation R from A to B is a subset of A × B. Domain = set of first elements, range = set of second elements, codomain = B. Number of relations from A to B = 2^(pq) when n(A) = p, n(B) = q.</p>` },
        { h: 'Functions', html: `<p>A relation f : A → B is a function if every element of A has <b>exactly one</b> image in B. Two pairs with the same first element and different second elements ⇒ not a function. Graph test: every vertical line meets the graph at most once.</p>` },
        { h: 'Standard real functions', html: `<table class="t"><tr><th>Function</th><th>Domain</th><th>Range</th></tr>
          <tr><td>Identity f(x) = x</td><td>R</td><td>R</td></tr><tr><td>Constant f(x) = c</td><td>R</td><td>{c}</td></tr><tr><td>f(x) = x²</td><td>R</td><td>[0, ∞)</td></tr>
          <tr><td>Modulus |x|</td><td>R</td><td>[0, ∞)</td></tr><tr><td>Signum</td><td>R</td><td>{−1, 0, 1}</td></tr><tr><td>Greatest integer [x]</td><td>R</td><td>Z</td></tr><tr><td>Reciprocal 1/x</td><td>R − {0}</td><td>R − {0}</td></tr></table>
          <p>Domain hints: under a square root ≥ 0; denominator ≠ 0.</p>` },
        { h: 'Algebra of functions', html: `<p>(f ± g)(x) = f(x) ± g(x), (fg)(x) = f(x)g(x), (f/g)(x) = f(x)/g(x) where g(x) ≠ 0; domain is the common domain (minus zeros of g for f/g).</p>` }
      ],
      formulas: [['n(A × B)', 'n(A) · n(B)'], ['Relations A → B', '2^(pq)'], ['Function', 'each x has exactly one image'], ['√(g(x)) defined', 'g(x) ≥ 0'], ['1/g(x) defined', 'g(x) ≠ 0']],
      terms: [['Domain', 'set of inputs (first elements)'], ['Range', 'set of actual outputs'], ['Codomain', 'set where outputs are allowed to lie'], ['Image / pre-image', 'f(a) / a']],
      traps: ['A × B ≠ B × A in general.', 'Range is not the codomain.', 'A function may send two inputs to the same output — that is allowed.', 'Domain of √(9 − x²) is [−3, 3], not all reals.'],
      board: '<p><b>Unit I — 23 marks.</b> Expect: Cartesian products and number of relations (1–2 marks), domain and range of real functions (2–3 marks), function or not, and graphs of modulus/signum/greatest integer.</p>',
      bridge: '<p>Ch 3 studies trigonometric functions; Class 12 Ch 1 deals with types of relations and functions (one-one, onto).</p>'
    },

    explore: [
      {
        title: 'Gallery of real functions', intro: 'Choose a function; read its domain and range from the graph. Vertical lines meet a function\'s graph at most once.',
        build(el, K) {
          const fs = [['Identity f(x) = x', x => x, 'R', 'R'], ['Square f(x) = x²', x => x * x, 'R', '[0, ∞)'], ['Cube f(x) = x³', x => x ** 3, 'R', 'R'], ['Modulus |x|', x => Math.abs(x), 'R', '[0, ∞)'], ['Signum', x => Math.sign(x), 'R', '{−1, 0, 1}'], ['Greatest integer [x]', x => Math.floor(x), 'R', 'Z'], ['Reciprocal 1/x', x => Math.abs(x) < 0.02 ? NaN : 1 / x, 'R − {0}', 'R − {0}'], ['√x', x => x < 0 ? NaN : Math.sqrt(x), '[0, ∞)', '[0, ∞)'], ['√(9 − x²)', x => 9 - x * x < 0 ? NaN : Math.sqrt(9 - x * x), '[−3, 3]', '[0, 3]']];
          let k = 0; const row = K.row(el); K.select(row, 'Function', fs.map(x => x[0]), i => { k = i; b.redraw(); });
          const b = new K.Board(el, { xmin: -6, xmax: 6, ymin: -5, ymax: 5 }); const rd = K.read(el);
          b.onDraw = () => { b.base(); const f = fs[k][1];
            if (k === 5) { for (let n = -6; n < 6; n++) { b.line(n, n, n + 1, n, { color: C.blue, w: 3 }); b.dot(n, n, { color: C.blue, r: 4 }); } }
            else if (k === 4) { b.line(-6, -1, 0, -1, { color: C.blue }); b.line(0, 1, 6, 1, { color: C.blue }); b.dot(0, 0, { color: C.blue, r: 4 }); }
            else { b.fn(x => (x > -0.05 && x < 0.05 && k === 6) ? NaN : f(x), { color: C.blue }); }
            rd.innerHTML = `<b>${fs[k][0]}</b> · domain ${fs[k][2]} · range ${fs[k][3]}`; };
          b.redraw(); return null;
        }
      },
      {
        title: 'Is this relation a function?', intro: 'Press <kbd>S</kbd> for a new random relation from A to B. Decide, then click Reveal.',
        build(el, K) {
          const rd = K.read(el); let R = G9.rng(G9.newSeed()), rel, show = false;
          const make = () => { show = false; const A = ['1', '2', '3', '4'], B = ['a', 'b', 'c']; rel = []; A.forEach(x => { const k = R.int(0, 2) === 0 ? R.int(0, 2) : 1; for (let j = 0; j < k; j++) rel.push([x, R.pick(B)]); }); rel = rel.filter((p, i) => rel.findIndex(q => q[0] === p[0] && q[1] === p[1]) === i); draw(); };
          function draw() { const dom = [...new Set(rel.map(p => p[0]))], firsts = rel.map(p => p[0]); const multi = firsts.some((x, i) => firsts.indexOf(x) !== i), missing = ['1', '2', '3', '4'].filter(x => !dom.includes(x));
            const isF = !multi && !missing.length;
            rd.innerHTML = `A = {1, 2, 3, 4}, B = {a, b, c}<br>R = {${rel.map(p => P(...p)).join(', ')}}<br>` + (show ? `Domain {${dom.join(', ')}}, range {${[...new Set(rel.map(p => p[1]))].join(', ')}} ⇒ <b>${isF ? 'a function from A to B' : 'not a function'}</b>${multi ? ' (some element has two images)' : missing.length ? ` (${missing.join(', ')} has no image)` : ''}` : 'Function or not?'); }
          const row = K.row(el); K.button(row, 'Reveal', () => { show = true; draw(); }, 'btn o'); K.button(row, 'New relation (S)', make);
          make(); return { step: make, play() {}, pause() {} };
        }
      }
    ],

    gens: [
      { title: 'Cartesian product', levels: [1, 2], gen(R) {
          const A = R.shuffle([1, 2, 3, 4, 5]).slice(0, R.int(2, 3)).sort(), B = R.shuffle(['x', 'y', 'z']).slice(0, 2).sort();
          return { q: `A = {${A.join(', ')}}, B = {${B.join(', ')}}. Write A × B and find n(A × B) and the number of relations from A to B.`, a: `{${A.flatMap(a => B.map(b => P(a, b))).join(', ')}}; n = ${A.length * B.length}; relations 2^${A.length * B.length} = ${2 ** (A.length * B.length)}` };
        } },
      { title: 'Equal ordered pairs', levels: [1, 2], gen(R) {
          const x = R.int(-5, 8), y = R.int(-5, 8), a = R.int(1, 4), b = R.int(-5, 5), c = R.int(1, 3), d = R.int(-5, 5);
          return { q: `If (${terms([[a, 'x'], [b, '']])}, ${terms([[c, 'y'], [d, '']])}) = (${a * x + b}, ${c * y + d}), find x and y.`, a: `x = ${x}, y = ${y}` };
        } },
      { title: 'Domain and range of a relation', gen(R) {
          const k = R.int(1, 3), n = R.int(5, 8); const pairs = []; for (let x = 1; x <= n; x++) pairs.push([x, x + k]);
          return { q: `R = {(x, y) : y = x + ${k}, x ∈ N, x ≤ ${n}}. Write R in roster form and find its domain and range.`, a: `R = {${pairs.map(p => P(...p)).join(', ')}}; domain {1, …, ${n}}, range {${1 + k}, …, ${n + k}}` };
        } },
      { title: 'Function or not?', levels: [1, 2], gen(R) {
          const items = [['{(1, 2), (2, 3), (3, 4), (4, 2)}', 'Function (each first element once)'], ['{(1, 2), (1, 3), (2, 4)}', 'Not a function (1 has two images)'], ['{(2, 1), (3, 1), (4, 1)}', 'Function (constant)'], ['{(x, y) : y² = x}', 'Not a function (x = 4 gives y = ±2)'], ['{(x, y) : y = |x|}', 'Function'], ['{(a, b), (b, c), (c, a), (a, c)}', 'Not a function (a has two images)']];
          const [q, a] = R.pick(items); return { q: `Is this relation a function? ${q}`, a };
        } },
      { title: 'Domain and range of a real function', gen(R) {
          const a = R.int(2, 9), items = [[`f(x) = √(${a} − x)`, `domain (−∞, ${a}], range [0, ∞)`], [`f(x) = 1/(x − ${a})`, `domain R − {${a}}, range R − {0}`], [`f(x) = √(${a * a} − x²)`, `domain [−${a}, ${a}], range [0, ${a}]`], [`f(x) = x² + ${a}`, `domain R, range [${a}, ∞)`], [`f(x) = −|x| + ${a}`, `domain R, range (−∞, ${a}]`], [`f(x) = (x² − ${a * a})/(x − ${a})`, `domain R − {${a}}, range R − {${2 * a}}`]];
          const [q, ans] = R.pick(items); return { q: `Find the domain and range of ${q}.`, a: ans, s: 'Square roots need ≥ 0; denominators ≠ 0.' };
        } },
      { title: 'Algebra of functions', gen(R) {
          const a = R.nz(-5, 5), b = R.int(-6, 6), c = R.nz(-3, 3), x = R.int(-3, 4);
          const f = (t) => a * t + b, g = (t) => c * t * t; const fg = f(x) * g(x);
          return { q: `f(x) = ${terms([[a, 'x'], [b, '']])}, g(x) = ${terms([[c, 'x²']])}. Find (f + g)(${x}), (f − g)(${x}), (fg)(${x}).`, a: `${f(x) + g(x)}, ${f(x) - g(x)}, ${fg}`, s: `f(${x}) = ${f(x)}, g(${x}) = ${g(x)}` };
        } },
      { title: 'Values of special functions', levels: [2, 3], gen(R) {
          const v = R.pick([-3.7, -2.2, -0.5, 0, 1.5, 2.9, 4.01]);
          return { q: `For x = ${num(v)}, find [x] (greatest integer), |x| and sgn(x).`, a: `${Math.floor(v)}, ${num(Math.abs(v))}, ${Math.sign(v)}`, s: '[x] is the greatest integer ≤ x.' };
        } }
    ],

    quiz: [
      { q: 'n(A) = 3, n(B) = 4. n(A × B) =', o: ['7', '12', '81', '64'], a: 1, e: '3 × 4.' },
      { q: 'Number of relations from A to B above', o: ['2¹²', '12', '2⁷', '7'], a: 0, e: '2^(pq).' },
      { q: 'Domain of f(x) = 1/(x − 2)', o: ['R', 'R − {2}', '(2, ∞)', 'R − {0}'], a: 1, e: 'Denominator ≠ 0.' },
      { q: 'Range of f(x) = x²', o: ['R', '[0, ∞)', '(0, ∞)', '(−∞, 0]'], a: 1, e: 'Squares are ≥ 0.' },
      { q: 'Which is NOT a function?', o: ['{(1, a), (2, a)}', '{(1, a), (1, b)}', '{(1, a), (2, b)}', '{(3, c)}'], a: 1, e: '1 has two images.' },
      { q: '[−2.5] =', o: ['−2', '−3', '2', '−2.5'], a: 1, e: 'Greatest integer ≤ −2.5.' },
      { q: 'Range of the signum function', o: ['R', '{−1, 1}', '{−1, 0, 1}', '[−1, 1]'], a: 2, e: 'Three values.' },
      { q: 'If (x + 1, 3) = (5, y − 2), then (x, y) =', o: ['(4, 5)', '(5, 4)', '(6, 1)', '(4, 1)'], a: 0, e: 'x + 1 = 5, y − 2 = 3.' },
      { q: 'Domain of √(16 − x²)', o: ['[−4, 4]', '(−4, 4)', 'R', '[0, 4]'], a: 0, e: '16 − x² ≥ 0.' },
      { q: 'A × B = B × A when', o: ['always', 'A = B (or one is empty)', 'never', 'A ⊂ B'], a: 1, e: 'Ordered pairs.' },
      { q: 'f(x) = 2x + 1, g(x) = x². (f + g)(2) =', o: ['9', '7', '5', '11'], a: 0, e: '5 + 4.' }
    ],

    teach: {
      outcomes: ['Form Cartesian products and count relations', 'Identify functions and their domain, range, codomain', 'Sketch standard real functions', 'Combine functions algebraically'],
      periods: [
        { t: 'Products and relations', flow: [['10 min', 'Seating chart as A × B.'], ['15 min', 'Relations as subsets; domain/range.'], ['15 min', 'Practice: Cartesian products.']] },
        { t: 'Functions', flow: [['15 min', 'Explore panel 2: function or not?'], ['15 min', 'Explore panel 1: standard functions.'], ['10 min', 'Domain/range of real functions.']] },
        { t: 'Algebra of functions', flow: [['15 min', 'f ± g, fg, f/g with domains.'], ['15 min', 'Mixed practice.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Range = codomain.', 'Two inputs with the same output treated as non-function.', 'Domains with roots/denominators.'],
      activities: ['Student–roll number relation vs student–friends relation (function or not).', 'Graph-paper sketches of |x|, [x], sgn x.'],
      exit: ['n(A × B) if n(A) = 2, n(B) = 5.', 'Domain of √(x − 3).', 'Is {(1, 1), (2, 1)} a function?'],
      homework: 'Find the domain and range of f(x) = (x² + 2x + 1)/(x² − 8x + 12).'
    },

    slides: [
      { t: 'Relations and Functions', b: ['Cartesian products', 'Relations', 'Functions', 'Standard real functions'] },
      { t: 'Cartesian product', b: ['A × B = {(a, b)}', 'n(A × B) = n(A)n(B)', 'Relations from A to B: 2^(pq)'] },
      { t: 'Function', b: ['Every element of A has exactly one image', 'Vertical line test', 'Domain, codomain, range'] },
      { t: 'Standard functions', b: ['Identity, constant, polynomial', 'Modulus, signum, greatest integer', 'Reciprocal'] },
      { t: 'Domains', b: ['√(g(x)): g(x) ≥ 0', '1/g(x): g(x) ≠ 0'] },
      { t: 'Check yourself', b: ['Domain of 1/(x + 3)?', 'Range of |x| + 2?', 'Answers: R − {−3} · [2, ∞)'] }
    ],

    fs: { groups: [
        ['Cartesian product and relations', [['A × B', '{(a, b) : a ∈ A, b ∈ B}'], ['n(A × B)', 'n(A) · n(B)'], ['Relations A → B', '2^(pq)'], ['Equal pairs', '(a, b) = (c, d) ⇔ a = c, b = d']]],
        ['Functions', [['Definition', 'each element of A has exactly one image'], ['Vertical line test', 'meets graph at most once'], ['Range ⊆ codomain', '']]],
        ['Standard functions (domain → range)', [['x, x³', 'R → R'], ['x², |x|', 'R → [0, ∞)'], ['Signum', 'R → {−1, 0, 1}'], ['[x]', 'R → Z'], ['1/x', 'R − {0} → R − {0}'], ['√x', '[0, ∞) → [0, ∞)']]],
        ['Domains and algebra', [['√g(x)', 'g(x) ≥ 0'], ['1/g(x)', 'g(x) ≠ 0'], ['(f ± g), fg', 'common domain'], ['f/g', 'common domain, g(x) ≠ 0']]]],
      ex: [['Domain of √(9 − x²)', '[−3, 3], range [0, 3]'], ['n(A) = 2, n(B) = 3', 'n(A × B) = 6, relations 64']],
      rem: ['Range is the set of actual outputs.', 'Many-to-one is still a function.', 'Check roots and denominators for domain.'] }
  });
})();
