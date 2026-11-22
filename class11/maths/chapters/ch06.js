/*
TOOL:    class11_maths_ch06
FAMILY:  CBSE_REVISION / Class 11 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 6 Permutations and Combinations - revise, exam focus, 2 explore panels (arrangement lister, nPr vs nCr), 8 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { F, C, num } = G9;
  const fact = (n) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; };
  const P = (n, r) => fact(n) / fact(n - r), Cc = (n, r) => r < 0 || r > n ? 0 : Math.round(fact(n) / (fact(r) * fact(n - r)));
  const wordArr = (w) => { const f = {}; [...w].forEach(c => f[c] = (f[c] || 0) + 1); let d = 1; Object.values(f).forEach(v => d *= fact(v)); return { n: fact(w.length) / d, f }; };

  G9.register({
    no: 6, part: 'Unit II · Algebra (25 marks)', short: 'Permutations & combinations', title: 'Permutations and Combinations',
    blurb: 'Fundamental principle of counting, factorial, permutations (with repetition), combinations, selection problems.',
    revise: {
      oneLine: 'Count by multiplying the number of choices at each stage. Arrangements (order matters) are permutations nPr; selections (order does not matter) are combinations nCr = nPr / r!.',
      sections: [
        { h: 'Fundamental principle of counting', html: `<p>If one event can happen in m ways and then another in n ways, the two together can happen in <b>m × n</b> ways. Example: 3-digit numbers from 1–9 with no repetition: 9 × 8 × 7 = 504.</p>` },
        { h: 'Factorial and permutations', html: `<p>n! = 1 × 2 × … × n, 0! = 1.</p><div class="box m">ⁿPᵣ = ${F('n!', '(n − r)!')} (arrangements of r out of n distinct objects)</div>
          <p>With repetition allowed: nʳ. Objects with repeats: ${F('n!', 'p₁! p₂! …')} (e.g. arrangements of ALLAHABAD = 9!/(4!·2!)).</p>` },
        { h: 'Combinations', html: `<div class="box m">ⁿCᵣ = ${F('n!', 'r!(n − r)!')} = ${F('ⁿPᵣ', 'r!')}</div>
          <p>ⁿCᵣ = ⁿCₙ₋ᵣ; ⁿCᵣ + ⁿCᵣ₋₁ = ⁿ⁺¹Cᵣ; if ⁿCₐ = ⁿC_b then a = b or a + b = n.</p>` },
        { h: 'Problem strategies', html: `<ul><li>Order matters (arrangements, numbers, passwords, seating) → permutations. Order does not matter (teams, committees, choosing questions) → combinations.</li>
          <li>"Together": treat the group as one block, then arrange inside the block. "Never together": total − together.</li><li>"At least": add cases, or total − none.</li><li>Fixed positions first (e.g. vowels in even places), then fill the rest.</li></ul>` }
      ],
      formulas: [['n!', '1 × 2 × … × n, 0! = 1'], ['ⁿPᵣ', 'n!/(n − r)!'], ['ⁿCᵣ', 'n!/(r!(n − r)!)'], ['With repeats', 'n!/(p! q! …)'], ['Repetition allowed', 'nʳ'], ['Pascal', 'ⁿCᵣ + ⁿCᵣ₋₁ = ⁿ⁺¹Cᵣ']],
      terms: [['Permutation', 'arrangement (order matters)'], ['Combination', 'selection (order does not matter)'], ['Factorial', 'product 1 × 2 × … × n'], ['FPC', 'fundamental principle of counting']],
      traps: ['Using nPr for a committee (order does not matter).', 'Forgetting to arrange letters inside a "together" block.', '0! = 1, not 0.', 'Leading zero: a 4-digit number cannot start with 0.'],
      board: '<p><b>Unit II (Algebra) — 25 marks.</b> Expect value of nPr/nCr and finding n (1–2 marks), word arrangements with repeated letters, and selection problems with conditions (3–5 marks).</p>',
      bridge: '<p>ⁿCᵣ gives the binomial coefficients in Ch 7; counting outcomes powers probability (Ch 14).</p>'
    },

    explore: [
      {
        title: 'List the arrangements and selections', intro: 'Pick n letters and r. Every arrangement (order matters) and every selection (order ignored) is listed.',
        build(el, K) {
          let n = 4, r = 2; const row = K.row(el); K.slider(row, 'n', 2, 5, 1, n, v => { n = v; if (r > n) r = n; draw(); }); K.slider(row, 'r', 1, 5, 1, r, v => { r = Math.min(v, n); draw(); });
          const rd = K.read(el); rd.style.fontFamily = 'Consolas,monospace';
          function perms(arr, k) { if (!k) return [[]]; const out = []; arr.forEach((x, i) => perms(arr.filter((_, j) => j !== i), k - 1).forEach(p => out.push([x, ...p]))); return out; }
          function draw() { const L = 'ABCDE'.slice(0, n).split(''); const ps = perms(L, r), cs = [...new Set(ps.map(p => [...p].sort().join('')))];
            rd.innerHTML = `<b>Arrangements</b> ⁿPᵣ = ${n}P${r} = ${P(n, r)}: ${ps.map(p => p.join('')).join(' ')}<br><b>Selections</b> ⁿCᵣ = ${n}C${r} = ${Cc(n, r)}: ${cs.join(' ')}<br><span style="font-family:Segoe UI">Each selection can be arranged in ${r}! = ${fact(r)} ways, so ${n}P${r} = ${n}C${r} × ${r}! (${P(n, r)} = ${Cc(n, r)} × ${fact(r)}).</span>`; }
          draw(); return null;
        }
      },
      {
        title: 'Word arrangements', intro: 'Type a word. Repeated letters divide the count by their factorials. "Vowels together" treats them as one block.',
        build(el, K) {
          const row = K.row(el); row.innerHTML = '<label>Word <input type="text" id="wd" value="ASSASSINATION" size="16"></label>'; const rd = K.read(el);
          const go = () => { const w = (row.querySelector('#wd').value || 'A').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 14) || 'A'; const { n, f } = wordArr(w);
            const vs = [...w].filter(c => 'AEIOU'.includes(c)), cons = [...w].filter(c => !'AEIOU'.includes(c));
            const blk = vs.length ? wordArr(cons.join('') + '#').n * wordArr(vs.join('')).n : n;
            rd.innerHTML = `${w}: ${w.length} letters; repeats ${Object.entries(f).filter(([, v]) => v > 1).map(([c, v]) => `${c}×${v}`).join(', ') || 'none'}<br>All arrangements = ${w.length}! / (${Object.values(f).filter(v => v > 1).map(v => v + '!').join(' ') || '1'}) = <b>${n.toLocaleString('en-IN')}</b>` +
              (vs.length > 1 ? `<br>Vowels together (block + ${cons.length} consonants, then arrange vowels inside) = <b>${blk.toLocaleString('en-IN')}</b>` : ''); };
          row.querySelector('input').addEventListener('input', go); go(); return null;
        }
      }
    ],

    gens: [
      { title: 'Fundamental counting', gen(R) {
          const t = R.int(0, 2);
          if (t === 0) { const d = R.int(3, 4), rep = R.chance(.5); const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9].slice(0, R.int(5, 9)); const nn = digits.length;
            const v = rep ? nn ** d : P(nn, d); return { q: `How many ${d}-digit numbers can be formed from the digits ${digits.join(', ')} if repetition is ${rep ? '' : 'not '}allowed?`, a: String(v), ans: v, s: rep ? `${nn}^${d}` : `${nn}P${d}` }; }
          if (t === 1) { const sh = R.int(3, 6), pa = R.int(2, 5), so = R.int(2, 4); return { q: `A person has ${sh} shirts, ${pa} trousers and ${so} pairs of shoes. In how many ways can they dress?`, a: String(sh * pa * so), ans: sh * pa * so, s: `${sh} × ${pa} × ${so}` }; }
          const n = R.int(3, 8); return { q: `How many 4-letter codes can be formed from the first ${n + 2} letters of the alphabet with no letter repeated?`, a: String(P(n + 2, 4)), ans: P(n + 2, 4), s: `${n + 2} × ${n + 1} × ${n} × ${n - 1}` };
        } },
      { title: 'Evaluate nPr and nCr', levels: [1, 2], gen(R) {
          const n = R.int(5, 12), r = R.int(2, Math.min(5, n));
          return { q: `Evaluate ${n}P${r} and ${n}C${r}.`, a: `${P(n, r)} and ${Cc(n, r)}`, s: `${n}!/(${n - r})! and ${n}!/(${r}! ${n - r}!)` };
        } },
      { title: 'Find n', levels: [2, 3], gen(R) {
          const a = R.int(2, 8), n = R.int(a + 3, 20), b = n - a; const t = R.int(0, 1);
          if (t === 0) return { q: `If ⁿC${a} = ⁿC${b}, find n.`, a: `n = ${n}`, ans: n, s: 'a + b = n' };
          const m = R.int(4, 10); return { q: `If ${m}P_r = ${P(m, 3)}, find r.`, a: 'r = 3', ans: 3, s: `${m} × ${m - 1} × ${m - 2} = ${P(m, 3)}` };
        } },
      { title: 'Arrangements of a word', gen(R, L) {
          const w = R.pick(L === 1 ? ['MONDAY', 'ORANGE', 'DELHI', 'NUMBER'] : ['ALLAHABAD', 'INDEPENDENCE', 'MISSISSIPPI', 'BANANA', 'ASSASSINATION', 'EXAMINATION', 'PERMUTATIONS']);
          const { n, f } = wordArr(w); const rep = Object.entries(f).filter(([, v]) => v > 1);
          return { q: `How many arrangements of the letters of the word ${w} are possible?`, a: n.toLocaleString('en-IN'), ans: n, s: `${w.length}!${rep.length ? ' / (' + rep.map(([c, v]) => `${v}! for ${c}`).join(', ') + ')' : ''}` };
        } },
      { title: 'Together / not together', levels: [2, 3], gen(R) {
          const n = R.int(5, 8), k = R.int(2, 3);
          const tog = fact(n - k + 1) * fact(k), tot = fact(n);
          return { q: `In how many ways can ${n} people sit in a row if ${k} particular people (i) always sit together (ii) never all sit together?`, a: `(i) ${tog} (ii) ${tot - tog}`, s: `(i) block: ${n - k + 1}! × ${k}! (ii) ${n}! − ${tog}` };
        } },
      { title: 'Committee selection', gen(R, L) {
          const m = R.int(4, 9), w = R.int(3, 8), cm = R.int(1, 3), cw = R.int(1, 3);
          if (L === 3) { const k = R.int(3, 5); const atLeast = Array.from({ length: k }, (_, i) => i + 1).reduce((s, j) => s + (j <= w ? Cc(w, j) * Cc(m, k - j) : 0), 0);
            return { q: `From ${m} men and ${w} women, a committee of ${k} is to be formed with at least one woman. In how many ways?`, a: String(atLeast), ans: atLeast, s: `total ${m + w}C${k} − all men ${m}C${k} = ${Cc(m + w, k)} − ${Cc(m, k)}` }; }
          return { q: `In how many ways can a committee of ${cm} men and ${cw} women be chosen from ${m} men and ${w} women?`, a: String(Cc(m, cm) * Cc(w, cw)), ans: Cc(m, cm) * Cc(w, cw), s: `${m}C${cm} × ${w}C${cw}` };
        } },
      { title: 'Questions and cards', levels: [2, 3], gen(R) {
          const t = R.int(0, 1);
          if (t === 0) { const n = R.int(8, 13), r = R.int(4, n - 2); return { q: `A student must answer ${r} out of ${n} questions. In how many ways can the questions be chosen?`, a: String(Cc(n, r)), ans: Cc(n, r), s: `${n}C${r}` }; }
          const k = R.int(3, 5); return { q: `In how many ways can ${k} cards be chosen from a pack of 52 so that all ${k} are from the same suit?`, a: String(4 * Cc(13, k)), ans: 4 * Cc(13, k), s: `4 × 13C${k}` };
        } },
      { title: 'Lines and diagonals', levels: [2, 3], gen(R) {
          const n = R.int(5, 15);
          return R.chance(.5) ? { q: `How many diagonals does a polygon with ${n} sides have?`, a: String(Cc(n, 2) - n), ans: Cc(n, 2) - n, s: `${n}C2 − ${n}` }
            : { q: `How many triangles can be formed from ${n} points, no three collinear?`, a: String(Cc(n, 3)), ans: Cc(n, 3), s: `${n}C3` };
        } }
    ],

    quiz: [
      { q: '5! =', o: ['120', '60', '24', '720'], a: 0, e: '1·2·3·4·5.' },
      { q: '⁶P₂ =', o: ['30', '15', '12', '36'], a: 0, e: '6 × 5.' },
      { q: '⁸C₃ =', o: ['56', '336', '24', '40'], a: 0, e: '336/6.' },
      { q: 'If ⁿC₉ = ⁿC₈ then ⁿC₁₇ =', o: ['1', '17', '0', '9'], a: 0, e: 'n = 17.' },
      { q: 'Arrangements of the letters of BANANA', o: ['60', '120', '720', '20'], a: 0, e: '6!/(3!2!).' },
      { q: 'Committees of 3 from 7 people', o: ['35', '210', '21', '7'], a: 0, e: '⁷C₃.' },
      { q: '0! =', o: ['0', '1', 'undefined', '∞'], a: 1, e: 'Convention.' },
      { q: 'Number of diagonals of a hexagon', o: ['9', '15', '6', '12'], a: 0, e: '15 − 6.' },
      { q: '3-digit numbers with digits 1–9 repeated allowed', o: ['729', '504', '999', '27'], a: 0, e: '9³.' },
      { q: 'ⁿCᵣ + ⁿCᵣ₋₁ =', o: ['ⁿ⁺¹Cᵣ', 'ⁿCᵣ₊₁', 'ⁿ⁺¹Cᵣ₋₁', '2ⁿCᵣ'], a: 0, e: 'Pascal rule.' },
      { q: 'Choosing a captain and vice-captain from 11 players', o: ['110', '55', '121', '22'], a: 0, e: 'Order matters: ¹¹P₂.' }
    ],

    teach: {
      outcomes: ['Use the fundamental principle of counting', 'Count permutations (with and without repetition, repeated objects)', 'Count combinations and use their properties', 'Choose the right model for word problems'],
      periods: [
        { t: 'Counting principle and factorials', flow: [['10 min', 'Outfit and number-plate counting.'], ['15 min', 'Factorials; nPr.'], ['15 min', 'Practice: FPC.']] },
        { t: 'Permutations', flow: [['15 min', 'Explore panel 2: words with repeated letters.'], ['15 min', 'Together / not together; fixed positions.'], ['10 min', 'Practice.']] },
        { t: 'Combinations', flow: [['15 min', 'Explore panel 1: arrangements vs selections.'], ['15 min', 'Committees, "at least", geometry counts.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['nPr vs nCr confusion.', 'Inner arrangement of a block forgotten.', 'Leading zero.'],
      activities: ['Arrange 3 students in a row physically; list all orders.', 'Handshake problem: everyone shakes hands once → ⁿC₂.'],
      exit: ['⁷P₃ and ⁷C₃.', 'Arrangements of LETTER.', 'Ways to choose 2 boys and 3 girls from 5 boys and 6 girls.'],
      homework: 'How many words (with or without meaning) can be made from the letters of DAUGHTER so that (i) all vowels are together (ii) vowels are never all together?'
    },

    slides: [
      { t: 'Permutations and Combinations', b: ['Counting principle', 'Permutations', 'Combinations', 'Strategies'] },
      { t: 'Counting principle', b: ['m ways then n ways ⇒ m × n', 'Repetition allowed: nʳ'] },
      { t: 'Permutations', b: ['ⁿPᵣ = n!/(n − r)!', 'Repeated objects: n!/(p!q!…)', 'Order matters'] },
      { t: 'Combinations', b: ['ⁿCᵣ = n!/(r!(n − r)!)', 'ⁿCᵣ = ⁿCₙ₋ᵣ', 'Order does not matter'] },
      { t: 'Strategies', b: ['Together: block', 'Not together: total − together', 'At least: total − none'] },
      { t: 'Check yourself', b: ['⁵P₃?', '¹⁰C₂?', 'Answers: 60 · 45'] }
    ],

    fs: { groups: [
        ['Counting', [['FPC', 'm × n ways'], ['n!', '1·2·…·n, 0! = 1'], ['Repetition allowed', 'nʳ']]],
        ['Permutations', [['ⁿPᵣ', 'n!/(n − r)!'], ['All n objects', 'n!'], ['With repeats', 'n!/(p₁! p₂! …)'], ['Together', 'block! × inside!'], ['Not together', 'total − together']]],
        ['Combinations', [['ⁿCᵣ', 'n!/(r!(n − r)!) = ⁿPᵣ/r!'], ['Symmetry', 'ⁿCᵣ = ⁿCₙ₋ᵣ'], ['Pascal', 'ⁿCᵣ + ⁿCᵣ₋₁ = ⁿ⁺¹Cᵣ'], ['ⁿCₐ = ⁿC_b', 'a = b or a + b = n'], ['At least one', 'total − none']]],
        ['Geometry', [['Lines through n points', 'ⁿC₂'], ['Triangles', 'ⁿC₃'], ['Diagonals of n-gon', 'ⁿC₂ − n']]]],
      ex: [['Arrangements of MISSISSIPPI', '11!/(4! 4! 2!) = 34 650'], ['3 men, 2 women from 6 men, 5 women', '⁶C₃ × ⁵C₂ = 200']],
      rem: ['Order matters → P; order does not → C.', 'Check for repeated letters.', 'No leading zero in numbers.'] }
  });
})();
