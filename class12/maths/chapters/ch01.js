/*
TOOL:    class12_maths_ch01
FAMILY:  CBSE_REVISION / Class 12 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 1 Relations and Functions - revise, board focus, 2 explore panels (relation property checker, one-one/onto graph test), 7 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num, terms } = G9;
  const P = (a, b) => `(${a}, ${b})`;
  const props = (A, rel) => {
    const has = (a, b) => rel.some(p => p[0] === a && p[1] === b);
    const refl = A.every(a => has(a, a)), sym = rel.every(([a, b]) => has(b, a));
    const trans = rel.every(([a, b]) => rel.every(([c, d]) => c !== b || has(a, d)));
    return { refl, sym, trans };
  };

  G9.register({
    no: 1, part: 'Unit I · Relations and Functions (8 marks)', short: 'Relations & functions', title: 'Relations and Functions',
    blurb: 'Reflexive, symmetric, transitive and equivalence relations; one-one, onto and bijective functions; composition and inverses.',
    revise: {
      oneLine: 'A relation on A is an equivalence relation when it is reflexive, symmetric and transitive; it then splits A into disjoint classes. A function is invertible exactly when it is one-one and onto.',
      sections: [
        { h: 'Types of relations', html: `<p>R ⊆ A × A. <b>Empty</b> relation R = ∅; <b>universal</b> relation R = A × A.</p>
          <ul><li><b>Reflexive</b>: (a, a) ∈ R for every a ∈ A.</li><li><b>Symmetric</b>: (a, b) ∈ R ⇒ (b, a) ∈ R.</li><li><b>Transitive</b>: (a, b), (b, c) ∈ R ⇒ (a, c) ∈ R.</li></ul>
          <p>All three ⇒ <b>equivalence relation</b>. Its equivalence classes [a] = {x : (x, a) ∈ R} are disjoint and cover A. Example: R = {(a, b) : 3 divides a − b} on Z gives classes [0], [1], [2].</p>` },
        { h: 'Types of functions', html: `<ul><li><b>One-one (injective)</b>: f(x₁) = f(x₂) ⇒ x₁ = x₂. Graph test: every horizontal line meets the graph at most once.</li>
          <li><b>Onto (surjective)</b>: range = codomain; every y has some x with f(x) = y.</li><li><b>Bijective</b>: one-one and onto.</li></ul>
          <p>For finite A with n(A) = n(B), one-one ⇔ onto. f(x) = x² on R → R is neither; on [0, ∞) → [0, ∞) it is bijective.</p>` },
        { h: 'Composition and inverse', html: `<p>(g ∘ f)(x) = g(f(x)), defined when range of f ⊆ domain of g. In general g ∘ f ≠ f ∘ g.</p>
          <p>f is <b>invertible</b> iff it is bijective; then f⁻¹(y) = x where f(x) = y, and f⁻¹ ∘ f = I, f ∘ f⁻¹ = I. To find f⁻¹: write y = f(x), solve for x.</p>` },
        { h: 'Counting (finite sets, n(A) = m, n(B) = n)', html: `<p>Functions A → B: nᵐ. One-one (m ≤ n): ⁿPₘ. Bijections (m = n): n!. Relations on A: 2^(m²). Reflexive relations on A: 2^(m² − m).</p>` }
      ],
      formulas: [['Equivalence', 'reflexive + symmetric + transitive'], ['One-one', 'f(x₁) = f(x₂) ⇒ x₁ = x₂'], ['Onto', 'range = codomain'], ['Invertible', 'bijective'], ['Composition', '(g ∘ f)(x) = g(f(x))'], ['Functions A → B', 'nᵐ']],
      terms: [['Equivalence class', 'all elements related to a'], ['Bijection', 'one-one and onto'], ['Identity function', 'I(x) = x'], ['Codomain', 'set B in f : A → B']],
      traps: ['Reflexive needs (a, a) for every a, not just some.', 'One relation can be symmetric and transitive but not reflexive.', 'Onto depends on the codomain stated.', 'g ∘ f means apply f first.'],
      board: '<p><b>Unit I — 8 marks</b> (with Inverse Trigonometric Functions). Typical: show a relation is an equivalence relation and find a class (3–5 marks); check one-one/onto for a given f (2–3 marks); MCQs and assertion–reason on types of relations and functions.</p>',
      bridge: '<p>Builds on Class 11 Ch 1 and 2. Inverse functions lead straight into Ch 2 (inverse trigonometric functions).</p>'
    },

    explore: [
      {
        title: 'Relation property checker', intro: 'A = {1, 2, 3, 4}. Click cells to add or remove pairs (a, b). Reflexive, symmetric and transitive are tested live; press <kbd>S</kbd> for a random relation.',
        build(el, K) {
          const A = [1, 2, 3, 4]; let rel = [[1, 1], [2, 2], [3, 3], [4, 4], [1, 2], [2, 1]]; const rd = K.read(el);
          const box = document.createElement('div'); box.style.cssText = 'display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start'; el.appendChild(box);
          const R = G9.rng(G9.newSeed());
          function draw() {
            const has = (a, b) => rel.some(p => p[0] === a && p[1] === b); const pr = props(A, rel);
            let h = '<table class="t" style="width:auto;text-align:center"><tr><th>a \\ b</th>' + A.map(b => `<th>${b}</th>`).join('') + '</tr>';
            A.forEach(a => { h += `<tr><th>${a}</th>` + A.map(b => `<td data-a="${a}" data-b="${b}" style="cursor:pointer;width:44px;height:36px;font-weight:bold;background:${has(a, b) ? (a === b ? 'var(--purpleL,#ede9fe)' : 'var(--blueL,#dbeafe)') : 'transparent'}">${has(a, b) ? '●' : ''}</td>`).join('') + '</tr>'; });
            box.innerHTML = h + '</table>';
            box.querySelectorAll('td[data-a]').forEach(td => td.onclick = () => { const a = +td.dataset.a, b = +td.dataset.b; rel = has(a, b) ? rel.filter(p => !(p[0] === a && p[1] === b)) : [...rel, [a, b]]; draw(); });
            const yn = (v) => v ? '<b>yes</b>' : 'no'; const eq = pr.refl && pr.sym && pr.trans;
            let cls = ''; if (eq) { const seen = new Set(); cls = ' · classes: ' + A.filter(a => !seen.has(a)).map(a => { const c = A.filter(x => has(a, x)); c.forEach(x => seen.add(x)); return '{' + c.join(', ') + '}'; }).join(', '); }
            rd.innerHTML = `R = {${rel.map(p => P(...p)).join(', ') || '∅'}}<br>reflexive: ${yn(pr.refl)} · symmetric: ${yn(pr.sym)} · transitive: ${yn(pr.trans)} ⇒ ${eq ? '<b>equivalence relation</b>' + cls : 'not an equivalence relation'}`;
          }
          const step = () => { rel = []; A.forEach(a => A.forEach(b => { if (R.chance(a === b ? 0.7 : 0.25)) rel.push([a, b]); })); draw(); };
          const row = K.row(el); K.button(row, 'Random relation (S)', step); K.button(row, 'Clear', () => { rel = []; draw(); });
          draw(); return { step, play() {}, pause() {} };
        }
      },
      {
        title: 'One-one and onto from the graph', intro: 'Pick f and its domain/codomain. Drag the horizontal line: meeting the graph more than once ⇒ not one-one; missing it for some y in the codomain ⇒ not onto.',
        build(el, K) {
          const fs = [['f(x) = 2x + 3, R → R', x => 2 * x + 3, -Infinity, true, true], ['f(x) = x², R → R', x => x * x, -Infinity, false, false], ['f(x) = x², [0, ∞) → [0, ∞)', x => x * x, 0, true, true], ['f(x) = x³, R → R', x => x ** 3, -Infinity, true, true], ['f(x) = |x|, R → R', x => Math.abs(x), -Infinity, false, false], ['f(x) = eˣ, R → R', x => Math.exp(x), -Infinity, true, false], ['f(x) = sin x, R → [−1, 1]', Math.sin, -Infinity, false, true]];
          let k = 1; const row = K.row(el); K.select(row, 'f', fs.map(f => f[0]), i => { k = i; b.redraw(); });
          const b = new K.Board(el, { xmin: -6, xmax: 6, ymin: -4, ymax: 6 }); const rd = K.read(el); const H = b.addPt(-5.5, 2, { label: 'y = c', snap: 0.25, color: C.orange });
          b.onDraw = () => { b.base(); const [name, f, lo, one, onto] = fs[k]; H.x = -5.5; b.fn(x => x < lo ? NaN : f(x), { color: C.blue, w: 3 }); b.line(-6, H.y, 6, H.y, { color: C.orange, w: 2, dash: [6, 4] });
            const hits = []; for (let x = Math.max(-6, lo === -Infinity ? -6 : lo); x <= 6; x += 0.002) { const v = f(x) - H.y, w = f(x + 0.002) - H.y; if (v === 0 || v * w < 0) hits.push(x); }
            hits.forEach(x => b.dot(x, H.y, { color: C.purple, r: 5 })); b.drawPts();
            rd.innerHTML = `${name} · the line y = ${num(H.y)} meets the graph <b>${hits.length}</b> time(s) · overall: ${one ? 'one-one' : 'not one-one'}, ${onto ? 'onto' : 'not onto'} ⇒ <b>${one && onto ? 'bijective (invertible)' : 'not invertible'}</b>`; };
          b.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Properties of a relation', gen(R) {
          const items = [
            ['R = {(a, b) : a ≤ b} on R', 'reflexive, transitive, not symmetric'], ['R = {(a, b) : a − b is even} on Z', 'equivalence relation (classes: even, odd)'], ['R = {(a, b) : a divides b} on N', 'reflexive, transitive, not symmetric'],
            ['R = {(1, 1), (2, 2), (3, 3), (1, 2)} on {1, 2, 3}', 'reflexive, transitive, not symmetric'], ['R = {(1, 2), (2, 1)} on {1, 2, 3}', 'symmetric only (not reflexive; not transitive since (1, 1) ∉ R)'],
            ['R = {(a, b) : |a − b| ≤ 1} on R', 'reflexive, symmetric, not transitive'], ['R = {(a, b) : b = a + 1} on N', 'neither reflexive, symmetric nor transitive'], ['R = {(L₁, L₂) : L₁ ∥ L₂} on lines in a plane (a line is parallel to itself)', 'equivalence relation'],
            ['R = {(a, b) : a < b} on R', 'transitive only']];
          const [q, a] = R.pick(items); return { q: `Check whether ${q} is reflexive, symmetric and transitive.`, a };
        } },
      { title: 'Equivalence classes mod n', levels: [2, 3], gen(R) {
          const n = R.int(2, 5), top = R.int(8, 14), A = Array.from({ length: top + 1 }, (_, i) => i), k = R.int(0, n - 1);
          return { q: `On A = {0, 1, …, ${top}}, R = {(a, b) : |a − b| is a multiple of ${n}}. Show R is an equivalence relation and find [${k}].`, a: `[${k}] = {${A.filter(x => (x - k) % n === 0).join(', ')}}`, s: `elements leaving remainder ${k} on division by ${n}` };
        } },
      { title: 'One-one / onto', gen(R) {
          const items = [['f : R → R, f(x) = 3 − 4x', 'one-one and onto (bijective)'], ['f : R → R, f(x) = 1 + x²', 'neither one-one nor onto'], ['f : N → N, f(x) = 2x', 'one-one, not onto (odd numbers missed)'], ['f : Z → Z, f(x) = x³', 'one-one, not onto'], ['f : R → R, f(x) = x³', 'bijective'],
            ['f : N → N, f(n) = n + 1', 'one-one, not onto (1 is missed)'], ['f : R → R, f(x) = [x]', 'neither'], ['f : R − {0} → R, f(x) = 1/x', 'one-one, not onto (0 is missed)'], ['f : R → R, f(x) = |x|', 'neither'], ['f : N → N, f(n) = (n + 1)/2 for odd n, n/2 for even n', 'onto, not one-one']];
          const [q, a] = R.pick(items); return { q: `Is ${q} one-one? onto?`, a };
        } },
      { title: 'Composition', gen(R) {
          const a = R.nz(-4, 4), b = R.int(-5, 5), c = R.nz(-3, 3), x = R.int(-3, 3);
          const f = t => a * t + b, g = t => c * t * t;
          return { q: `f(x) = ${terms([[a, 'x'], [b, '']])}, g(x) = ${terms([[c, 'x²']])}. Find (g ∘ f)(x), (f ∘ g)(x) and (g ∘ f)(${x}).`, a: `(g ∘ f)(x) = ${c === 1 ? '' : c === -1 ? '−' : c}(${terms([[a, 'x'], [b, '']])})², (f ∘ g)(x) = ${terms([[a * c, 'x²'], [b, '']])}, (g ∘ f)(${x}) = ${g(f(x))}`, ans: g(f(x)), s: `f(${x}) = ${f(x)}` };
        } },
      { title: 'Inverse of a function', gen(R) {
          const a = R.nz(-6, 6), b = R.int(-9, 9), t = R.int(0, 1);
          if (t === 0) return { q: `Show that f : R → R, f(x) = ${terms([[a, 'x'], [b, '']])} is invertible and find f⁻¹.`, a: `f⁻¹(y) = (y ${b < 0 ? '+' : '−'} ${Math.abs(b)})/${a < 0 ? '(' + a + ')' : a}`.replace(' − 0', '').replace(' + 0', ''), s: 'one-one and onto; solve y = f(x) for x' };
          const p = R.int(2, 5), q = R.int(1, 7);
          return { q: `f : R − {−${q}/${p}} → R − {1/${p}}, f(x) = x/(${p}x + ${q}). Find f⁻¹.`, a: `f⁻¹(y) = ${q}y/(1 − ${p}y)`, s: `y(${p}x + ${q}) = x ⇒ x(1 − ${p}y) = ${q}y` };
        } },
      { title: 'Counting functions and relations', levels: [2, 3], gen(R) {
          const m = R.int(2, 4), n = R.int(m, 5), t = R.int(0, 3);
          const fact = (k) => k <= 1 ? 1 : k * fact(k - 1); const nP = fact(n) / fact(n - m);
          const qs = [[`How many functions are there from a set with ${m} elements to a set with ${n} elements?`, n ** m], [`How many one-one functions are there from a set with ${m} elements to a set with ${n} elements?`, nP], [`How many bijections are there from a set with ${n} elements to itself?`, fact(n)], [`How many reflexive relations are there on a set with ${m} elements?`, 2 ** (m * m - m)]];
          const [q, v] = qs[t]; return { q, a: String(v), ans: v };
        } },
      { title: 'Smallest relation with given properties', levels: [3], gen(R) {
          const items = [['containing (1, 2) and (2, 3) that is reflexive and transitive but not symmetric', '{(1, 1), (2, 2), (3, 3), (1, 2), (2, 3), (1, 3)}'], ['containing (1, 2) and (2, 3) that is an equivalence relation', 'A × A (all 9 pairs)'], ['containing (1, 2) that is an equivalence relation', '{(1, 1), (2, 2), (3, 3), (1, 2), (2, 1)}'], ['that is reflexive and symmetric but not transitive', '{(1, 1), (2, 2), (3, 3), (1, 2), (2, 1), (2, 3), (3, 2)}']];
          const [q, a] = R.pick(items); return { q: `On A = {1, 2, 3}, write a relation ${q}.`, a };
        } }
    ],

    quiz: [
      { q: 'R = {(a, b) : a ≤ b} on R is', o: ['reflexive and transitive, not symmetric', 'an equivalence relation', 'symmetric only', 'none of these'], a: 0, e: 'a ≤ a; a ≤ b ≤ c; 1 ≤ 2 but not 2 ≤ 1.' },
      { q: 'A relation that is reflexive, symmetric and transitive is', o: ['a function', 'an equivalence relation', 'universal', 'empty'], a: 1, e: 'Definition.' },
      { q: 'f : R → R, f(x) = x² is', o: ['one-one', 'onto', 'bijective', 'neither one-one nor onto'], a: 3, e: 'f(1) = f(−1); negatives missed.' },
      { q: 'f : R → R, f(x) = 2x + 5 is', o: ['bijective', 'one-one only', 'onto only', 'neither'], a: 0, e: 'Linear with non-zero slope.' },
      { q: 'If f(x) = x + 1, g(x) = 2x, then (g ∘ f)(3) =', o: ['8', '7', '6', '9'], a: 0, e: 'g(4) = 8.' },
      { q: 'A function is invertible iff it is', o: ['one-one', 'onto', 'bijective', 'continuous'], a: 2, e: 'Needs both.' },
      { q: 'Number of functions from {1, 2, 3} to {a, b}', o: ['8', '6', '9', '5'], a: 0, e: '2³.' },
      { q: 'Number of bijections on a 4-element set', o: ['24', '16', '256', '4'], a: 0, e: '4!.' },
      { q: 'Inverse of f(x) = (x − 3)/2', o: ['2x + 3', '2x − 3', '(x + 3)/2', 'x/2 + 3'], a: 0, e: 'Solve y = (x − 3)/2.' },
      { q: 'R = {(1, 2), (2, 1)} on {1, 2} is', o: ['symmetric only', 'reflexive', 'transitive', 'equivalence'], a: 0, e: '(1, 1) missing.' },
      { q: 'The equivalence classes of an equivalence relation are', o: ['overlapping', 'disjoint and cover A', 'always two', 'singletons'], a: 1, e: 'They partition A.' }
    ],

    teach: {
      outcomes: ['Classify relations as reflexive, symmetric, transitive, equivalence', 'Find equivalence classes', 'Decide whether a function is one-one, onto or bijective', 'Form compositions and inverses'],
      periods: [
        { t: 'Types of relations', flow: [['10 min', '"Is a sibling of", "lives in the same house as" — which properties?'], ['15 min', 'Explore panel 1: relation checker.'], ['15 min', 'Equivalence relations and classes (mod n).']] },
        { t: 'Types of functions', flow: [['15 min', 'Explore panel 2: horizontal-line test, codomain.'], ['15 min', 'Proving one-one and onto algebraically.'], ['10 min', 'Practice.']] },
        { t: 'Composition and inverse', flow: [['15 min', 'g ∘ f vs f ∘ g.'], ['15 min', 'Finding inverses.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Partial reflexivity.', 'Onto checked against the range rather than the codomain.', 'Order of composition.'],
      activities: ['Students form a relation "same birth month": verify equivalence, list classes.', 'Arrow diagrams on the board for one-one/onto.'],
      exit: ['Is R = {(a, b) : a − b divisible by 5} on Z an equivalence relation?', 'Is f(x) = 5x − 7 on R bijective?', 'Find (f ∘ g)(x) for f(x) = x², g(x) = x + 1.'],
      homework: 'Show that R = {(a, b) : |a − b| is even} on A = {1, 2, 3, 4, 5} is an equivalence relation. Show that the elements of {1, 3, 5} are related to each other and none is related to an element of {2, 4}.'
    },

    slides: [
      { t: 'Relations and Functions', b: ['Types of relations', 'Equivalence classes', 'One-one and onto functions', 'Composition and inverse'] },
      { t: 'Relations', b: ['Reflexive: (a, a) for all a', 'Symmetric: (a, b) ⇒ (b, a)', 'Transitive: (a, b), (b, c) ⇒ (a, c)', 'All three: equivalence'] },
      { t: 'Functions', b: ['One-one: f(x₁) = f(x₂) ⇒ x₁ = x₂', 'Onto: range = codomain', 'Bijective: both'] },
      { t: 'Composition and inverse', b: ['(g ∘ f)(x) = g(f(x))', 'Invertible ⇔ bijective', 'Find f⁻¹: solve y = f(x)'] },
      { t: 'Check yourself', b: ['Is a ≤ b symmetric?', 'Inverse of f(x) = 4x − 1?', 'Answers: no · (y + 1)/4'] }
    ],

    fs: { groups: [
        ['Relations on A', [['Reflexive', '(a, a) ∈ R ∀a'], ['Symmetric', '(a, b) ∈ R ⇒ (b, a) ∈ R'], ['Transitive', '(a, b), (b, c) ∈ R ⇒ (a, c) ∈ R'], ['Equivalence', 'all three; classes partition A'], ['Empty / universal', '∅ / A × A']]],
        ['Functions', [['One-one', 'f(x₁) = f(x₂) ⇒ x₁ = x₂'], ['Onto', 'every y in codomain has a pre-image'], ['Bijective', 'one-one and onto'], ['Finite, n(A) = n(B)', 'one-one ⇔ onto']]],
        ['Composition and inverse', [['g ∘ f', 'g(f(x)), f first'], ['Invertible', 'f bijective'], ['f⁻¹ ∘ f', 'identity on A'], ['(g ∘ f)⁻¹', 'f⁻¹ ∘ g⁻¹']]],
        ['Counting (n(A) = m, n(B) = n)', [['Functions', 'nᵐ'], ['One-one', 'ⁿPₘ'], ['Bijections (m = n)', 'n!'], ['Relations on A', '2^(m²)']]]],
      ex: [['R: a − b even on Z', 'equivalence; classes: evens, odds'], ['f(x) = (4x + 3)/(6x − 4)', 'one-one; f⁻¹ = f']],
      rem: ['Check every element for reflexive.', 'Onto is about the codomain.', 'g ∘ f: apply f first.'] }
  });
})();
