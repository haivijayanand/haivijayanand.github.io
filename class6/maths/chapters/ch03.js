/*
TOOL:    class6_maths_ch03
FAMILY:  CBSE_REVISION / Class 6 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 3 Number Play (numbers that tell, supercells, digit sums, palindromes, Kaprekar 6174, Collatz, estimation) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const kap = n => { const s = String(n).padStart(4, '0').split('').map(Number); const hi = Number([...s].sort((a, b) => b - a).join('')), lo = Number([...s].sort((a, b) => a - b).join('')); return [hi, lo, hi - lo]; };
  G9.register({
    no: 3, part: 'All chapters', short: 'Number play', title: 'Number Play',
    blurb: 'Playing with numbers: arrangements where each number tells something, supercells, patterns of digit sums, palindromes by reverse-and-add, the magic number 6174 (Kaprekar), the Collatz conjecture, clock and calendar numbers, and estimation.',
    revise: {
      oneLine: 'Numbers hide surprises. Reverse-and-add usually reaches a palindrome (like 12321). Any 4-digit number with not all digits equal reaches 6174 by "largest arrangement minus smallest" in at most 7 steps. In the Collatz game (halve if even, 3n + 1 if odd) every number tried so far reaches 1.',
      sections: [
        { h: 'Supercells', html: `<p>A cell is a supercell if its number is bigger than all its neighbours (left and right in a row).</p>` },
        { h: 'Digit sums', html: `<p>Digit sum of 6 345 = 18. Numbers with the same digit sum mod 9 behave alike when divided by 9.</p>` },
        { h: 'Palindromes and 6174', html: `<p>39 + 93 = 132, 132 + 231 = 363 (palindrome). 3524: 5432 − 2345 = 3087 → 8730 − 0378 = 8352 → 8532 − 2358 = 6174.</p>` }
      ],
      formulas: [['Palindrome', 'reads the same both ways'], ['Kaprekar step', 'largest − smallest arrangement'], ['Collatz', 'even: ÷ 2; odd: × 3 + 1'], ['Estimate', 'round, then compute']],
      terms: [['Palindrome', '121, 4554'], ['Digit sum', 'sum of digits'], ['Conjecture', 'believed, not yet proved']],
      traps: ['Keep zeros in Kaprekar (e.g. 0378).', 'Collatz is not proved for all numbers.', 'Supercell needs to beat every neighbour.'],
      bridge: '<p>Ch 5 (Prime Time) continues with factors and multiples.</p>'
    },
    explore: [
      { title: 'Kaprekar 6174', intro: 'Choose a 4-digit number (not all digits the same); press <kbd>S</kbd> for each step.',
        build(el, K) { let n = 3524; const row = K.row(el); K.slider(row, 'start', 1000, 9998, 1, n, v => { n = v; an.reset(); }); const rd = K.read(el); const an = new K.Anim(8, () => draw(), { ms: 700 });
          function draw() { if (/^(\d)\1{3}$/.test(String(n))) { rd.innerHTML = 'all digits the same → 0; choose another'; return; } let x = n, L = []; for (let i = 0; i < 8 && x !== 6174; i++) { const [h, l, d] = kap(x); L.push(`${String(h).padStart(4, '0')} − ${String(l).padStart(4, '0')} = <b>${String(d).padStart(4, '0')}</b>`); x = d; } const k = Math.min(an.i, L.length); rd.innerHTML = L.slice(0, k).map((s, i) => `<div>step ${i + 1}: ${s}</div>`).join('') + (k === L.length ? `<div>reached 6174 in <b>${L.length}</b> step${L.length === 1 ? '' : 's'}</div>` : ''); }
          K.anim(el, an); draw(); return an; } },
      { title: 'Collatz and palindromes', intro: 'Pick a starting number and the game.',
        build(el, K) { let n = 27, g = 0; const row = K.row(el); K.slider(row, 'start', 2, 99, 1, n, v => { n = v; draw(); }); K.select(row, 'game', ['Collatz', 'reverse and add'], i => { g = i; draw(); }); const rd = K.read(el);
          function draw() { if (g === 0) { let x = n, s = [x]; while (x !== 1 && s.length < 200) { x = x % 2 ? 3 * x + 1 : x / 2; s.push(x); } rd.innerHTML = `<div style="font-size:14px;line-height:1.5">${s.join(' → ')}</div>${s.length - 1} steps to reach 1 · highest ${Math.max(...s)}`; }
            else { let x = n, s = [x]; const pal = v => String(v) === String(v).split('').reverse().join(''); for (let i = 0; i < 24 && !(i > 0 && pal(x)); i++) { x = x + Number(String(x).split('').reverse().join('')); s.push(x); } rd.innerHTML = `<div style="font-size:16px">${s.join(' → ')}</div>${pal(x) ? `palindrome <b>${x}</b> after ${s.length - 1} step${s.length === 2 ? '' : 's'}` : 'no palindrome within 24 steps (89 and 98 take 24!)'}`; } } draw(); return null; } }
    ],
    gens: [
      { title: 'Digit sum', gen(R) { const n = R.int(1000, 99999); const s = String(n).split('').reduce((a, c) => a + Number(c), 0); return { q: `Digit sum of ${n}?`, a: String(s), ans: s }; } },
      { title: 'Palindrome', gen(R) { const t = R.pick([[12, 33], [39, 363], [57, 363], [68, 1111], [79, 44044], [48, 132]]); const pal = t[0] === 48 ? 363 : t[1]; return { q: `Reverse and add starting with ${t[0]} until you get a palindrome.`, a: String(pal) }; } },
      { title: 'Kaprekar step', levels: [2, 3], gen(R) { let n = R.int(1000, 9998); if (/^(\d)\1{3}$/.test(String(n))) n = 1234; const [h, l, d] = kap(n); return { q: `One Kaprekar step for ${n}: largest − smallest arrangement?`, a: `${h} − ${String(l).padStart(4, '0')} = ${d}`, ans: d }; } },
      { title: 'Collatz', levels: [2, 3], gen(R) { const n = R.int(3, 20); let x = n, s = [x]; while (x !== 1) { x = x % 2 ? 3 * x + 1 : x / 2; s.push(x); } return { q: `Collatz sequence from ${n}: how many steps to reach 1?`, a: `${s.length - 1} (${s.join(', ')})`, ans: s.length - 1 }; } },
      { title: 'Estimate', gen(R) { const a = R.int(21, 98), b = R.int(21, 98); const e = Math.round(a / 10) * 10 * Math.round(b / 10) * 10; return { q: `Estimate ${a} × ${b} by rounding to tens.`, a: `about ${e} (exact ${a * b})`, ans: e, tol: 1000 }; } }
    ],
    quiz: [
      { q: 'Palindrome', o: ['4554', '4545', '4455', '5454'], a: 0, e: 'Same both ways.' }, { q: 'Kaprekar constant', o: ['6174', '1729', '4321', '9999'], a: 0, e: 'Famous.' },
      { q: 'Collatz: 6 →', o: ['3', '19', '12', '2'], a: 0, e: 'Even ÷ 2.' }, { q: 'Collatz: 5 →', o: ['16', '2.5', '15', '10'], a: 0, e: '3 × 5 + 1.' },
      { q: 'Digit sum of 999', o: ['27', '9', '18', '99'], a: 0, e: '9 × 3.' }, { q: '39 + 93', o: ['132', '122', '142', '123'], a: 0, e: 'Add.' },
      { q: 'Collatz conjecture is', o: ['not yet proved', 'proved false', 'proved true', 'about primes'], a: 0, e: 'Open.' }, { q: 'Largest arrangement of 3087', o: ['8730', '8703', '7830', '3870'], a: 0, e: 'Descending.' },
      { q: 'Estimate 48 × 52', o: ['about 2500', 'about 250', 'about 2000', 'about 3000'], a: 0, e: '50 × 50.' }, { q: 'Supercell beats', o: ['all its neighbours', 'one neighbour', 'nothing', 'the row total'], a: 0, e: 'Every one.' },
      { q: '1001 is', o: ['a palindrome', 'not a palindrome', 'Kaprekar', 'prime'], a: 0, e: 'Reads same.' }
    ],
    teach: {
      outcomes: ['Explore number puzzles', 'Use digit sums and palindromes', 'Follow Kaprekar and Collatz rules', 'Estimate'],
      periods: [{ t: 'Number games', flow: [['10 min', 'Supercells in a table.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Palindromes.']] }, { t: '6174', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Estimation challenges.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Dropping zeros in Kaprekar.', 'Conjecture = proved.'], activities: ['6174 race in pairs.', 'Estimate the number of leaves on a branch.'],
      exit: ['Kaprekar from 2005.', 'Collatz from 7.', 'Palindrome from 75.'], homework: 'Try Kaprekar on your birth year and on a 3-digit number. What happens with 3 digits?'
    },
    slides: [{ t: 'Number Play', b: ['Supercells', 'Palindromes', 'Kaprekar 6174', 'Collatz', 'Estimation'] }, { t: 'Check yourself', b: ['Kaprekar step for 5823?', 'Collatz from 10?'] }],
    fs: { groups: [['Games', [['Reverse and add', 'usually → palindrome'], ['Kaprekar', 'largest − smallest → 6174'], ['Collatz', 'even ÷ 2, odd 3n + 1 → 1']]], ['Facts', [['Digit sum of 6345', '18'], ['Kaprekar', '≤ 7 steps']]]],
      ex: [['3524', '3087, 8352, 6174'], ['39 + 93 + …', '363']], rem: ['Keep leading zeros.', 'Conjecture means not proved.', 'Estimate, then check.'] }
  });
})();
