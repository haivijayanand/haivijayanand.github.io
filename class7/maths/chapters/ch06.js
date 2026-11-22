/*
TOOL:    class7_maths_ch06
FAMILY:  CBSE_REVISION / Class 7 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 6 Number Play (parity, magic squares, sums of consecutive numbers, Virahanka-Fibonacci numbers, digit puzzles, divisibility tricks) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 6, part: 'Part I', short: 'Number play', title: 'Number Play',
    blurb: 'Reasoning with numbers: parity (odd and even), sums and products of odd and even numbers, magic squares, sums of consecutive numbers, Virahanka-Fibonacci numbers, digit puzzles and cryptarithms, and divisibility patterns.',
    revise: {
      oneLine: 'Even numbers are 2k, odd numbers 2k + 1. odd + odd = even, odd + even = odd, odd × odd = odd. A 3 × 3 magic square with 1–9 has magic sum 15 and 5 in the centre. Virahanka-Fibonacci numbers 1, 2, 3, 5, 8, 13, … count ways to make rhythms with short (1) and long (2) beats.',
      sections: [
        { h: 'Parity', html: `<p>Sum of 5 odd numbers is odd; it can never be 100. Parity of a sum depends on the number of odd terms.</p>` },
        { h: 'Magic squares', html: `<p>Rows, columns and diagonals add to the same total. For 1–9: total 45, so each row is 15.</p>` },
        { h: 'Consecutive sums', html: `<p>Sum of 3 consecutive numbers = 3 × middle. 15 = 7 + 8 = 4 + 5 + 6 = 1 + 2 + 3 + 4 + 5.</p>` }
      ],
      formulas: [['Even', '2k'], ['Odd', '2k + 1'], ['Magic sum (1–9)', '15'], ['3 consecutive', '3 × middle'], ['Virahanka', 'Vₙ = Vₙ₋₁ + Vₙ₋₂']],
      terms: [['Parity', 'odd or even'], ['Magic square', 'equal sums in every line'], ['Cryptarithm', 'digits replaced by letters']],
      traps: ['odd × even is even.', 'Powers of 2 cannot be written as sums of consecutive numbers.', 'Each digit used once in a magic square.'],
      bridge: '<p>Ch 11 continues with HCF and LCM.</p>'
    },
    explore: [
      { title: 'Magic square', intro: 'Press <kbd>S</kbd> to turn or flip the Lo Shu square. Every line still adds to 15.',
        build(el, K) { let M = [[4, 9, 2], [3, 5, 7], [8, 1, 6]], k = 0; const box = document.createElement('div'); el.appendChild(box); const rd = K.read(el);
          function draw() { box.innerHTML = `<table style="border-collapse:collapse;font-size:28px;margin:8px 0">${M.map(r => `<tr>${r.map(x => `<td style="border:2px solid var(--blue,#1d4ed8);width:56px;height:56px;text-align:center">${x}</td>`).join('')}</tr>`).join('')}</table>`; const rs = M.map(r => r.reduce((a, b) => a + b, 0)), cs = [0, 1, 2].map(j => M[0][j] + M[1][j] + M[2][j]); rd.innerHTML = `rows ${rs.join(', ')} · columns ${cs.join(', ')} · diagonals ${M[0][0] + M[1][1] + M[2][2]}, ${M[0][2] + M[1][1] + M[2][0]} · centre <b>5</b> · ${k % 2 ? 'flipped' : 'turned'} ${k} time${k === 1 ? '' : 's'}`; }
          const step = () => { k++; M = k % 2 ? M.map(r => [...r].reverse()) : M[0].map((_, j) => M.map(r => r[j]).reverse()); draw(); }; const row = K.row(el); K.button(row, 'Turn / flip (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Sums of consecutive numbers', intro: 'Choose a number; all ways to write it as a sum of consecutive numbers are listed.',
        build(el, K) { let n = 15; const row = K.row(el); K.slider(row, 'number', 3, 100, 1, n, v => { n = v; draw(); }); const rd = K.read(el);
          function draw() { const W = []; for (let len = 2; len * (len + 1) / 2 <= n; len++) { const t = n - len * (len - 1) / 2; if (t % len === 0) { const a = t / len; W.push(Array.from({ length: len }, (_, i) => a + i).join(' + ')); } } rd.innerHTML = W.length ? W.map(w => `<div>${n} = ${w}</div>`).join('') : `<b>${n}</b> cannot be written as a sum of consecutive numbers — it is a power of 2`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Parity', gen(R) { const k = R.int(3, 9), t = R.pick(['odd', 'even']); return { q: `Is the sum of ${k} ${t} numbers odd or even?`, a: t === 'even' ? 'even' : k % 2 ? 'odd' : 'even' }; } },
      { title: 'Consecutive sum', gen(R) { const m = R.int(5, 60), k = R.pick([3, 5]); const a = m - (k - 1) / 2; return { q: `Sum of the ${k} consecutive numbers starting at ${a}?`, a: String(k * m), ans: k * m, s: `${k} × middle ${m}` }; } },
      { title: 'Magic square', levels: [2, 3], gen(R) { const s = R.int(1, 10); const base = [[4, 9, 2], [3, 5, 7], [8, 1, 6]].map(r => r.map(x => x + s - 1)); return { q: `A magic square uses ${s}–${s + 8}. Magic sum? Centre?`, a: `${3 * (s + 4)}; ${s + 4}`, ans: 3 * (s + 4) }; } },
      { title: 'Virahanka', gen(R) { const V = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]; const i = R.int(3, 9); return { q: `Rhythms of ${i + 1} beats using short (1) and long (2) syllables: how many?`, a: String(V[i]), ans: V[i] }; } },
      { title: 'Cryptarithm', levels: [3], gen(R) { const t = R.pick([['A + A + A = BA (A, B digits)', 'A = 5, B = 1 (5 + 5 + 5 = 15)'], ['AB + BA = 99, A − B = 3', '63 + 36 = 99, so A = 6, B = 3'], ['A × A = BA (two-digit result ending in A)', 'A = 5 (25) or A = 6 (36)']]); return { q: `Solve: ${t[0]}`, a: t[1] }; } }
    ],
    quiz: [
      { q: 'odd + odd', o: ['even', 'odd', 'zero', 'depends'], a: 0, e: '(2a+1)+(2b+1).' }, { q: 'odd × even', o: ['even', 'odd', 'prime', 'zero'], a: 0, e: 'Factor 2.' },
      { q: 'Lo Shu magic sum', o: ['15', '45', '12', '18'], a: 0, e: '45 ÷ 3.' }, { q: 'Centre of 1–9 magic square', o: ['5', '1', '9', '4'], a: 0, e: 'Middle.' },
      { q: 'Sum of 5 odd numbers is', o: ['odd', 'even', 'zero', 'prime'], a: 0, e: 'Odd count of odds.' }, { q: '4 + 5 + 6', o: ['15', '14', '16', '120'], a: 0, e: '3 × 5.' },
      { q: 'Next Virahanka: 5, 8, 13, __', o: ['21', '18', '26', '20'], a: 0, e: '8 + 13.' }, { q: 'Cannot be a sum of consecutive numbers', o: ['16', '15', '9', '21'], a: 0, e: 'Power of 2.' },
      { q: 'Even number form', o: ['2k', '2k + 1', 'k + 2', 'k²'], a: 0, e: 'Multiple of 2.' }, { q: 'Can 5 odd numbers add to 100?', o: ['no', 'yes', 'only negatives', 'only primes'], a: 0, e: 'Odd sum.' },
      { q: 'Sum of 1 to 9', o: ['45', '36', '55', '15'], a: 0, e: '9 × 10 ÷ 2.' }
    ],
    teach: {
      outcomes: ['Reason with parity', 'Build and check magic squares', 'Explore consecutive sums and Virahanka numbers'],
      periods: [{ t: 'Parity', flow: [['10 min', 'Odd-even proofs with counters.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Consecutive sums.']] }, { t: 'Puzzles', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Virahanka rhythms.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['odd × even odd.', 'Magic square repeats.'], activities: ['Build magic squares with 2–10.', 'Clap Virahanka rhythms.'],
      exit: ['Parity of 7 odd numbers.', 'Write 30 as consecutive sums.', 'Magic sum for 3–11.'], homework: 'Make a magic square using the numbers 2 to 10. What is the magic sum? Why?'
    },
    slides: [{ t: 'Number Play', b: ['Parity', 'Magic squares', 'Consecutive sums', 'Virahanka numbers', 'Cryptarithms'] }, { t: 'Check yourself', b: ['Parity of 9 odds?', 'Magic sum for 1–9?'] }],
    fs: { groups: [['Parity', [['e + e, o + o', 'even'], ['o + e', 'odd'], ['o × o', 'odd'], ['anything × even', 'even']]], ['Magic squares', [['1–9', 'sum 15, centre 5'], ['n to n + 8', 'sum 3(n + 4)']]], ['Sums and sequences', [['3 consecutive', '3 × middle'], ['Powers of 2', 'no consecutive sums'], ['Virahanka', '1, 2, 3, 5, 8, 13']]]],
      ex: [['15', '7 + 8 = 4 + 5 + 6 = 1 + … + 5'], ['6 beats', '13 rhythms']], rem: ['Use 2k and 2k + 1 to prove.', 'Check all 8 lines of a magic square.', 'Look for the middle number.'] }
  });
})();
