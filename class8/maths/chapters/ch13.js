/*
TOOL:    class8_maths_ch13
FAMILY:  CBSE_REVISION / Class 8 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class VIII moved into the series
CHANGES: 1.0.0 - Part II Ch 6 Algebra Play - revise, 2 explore panels (think-of-a-number trick, calendar box), 6 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num, Q, terms } = G9;

  G9.register({
    no: 13, part: 'Part II', short: 'Algebra play', title: 'Algebra Play',
    blurb: '(Part II Ch 6) Number tricks, number pyramids, calendar puzzles and story riddles explained and solved with letter-numbers.',
    revise: {
      oneLine: 'Replace "the number you thought of" by a letter, follow the steps, and simplify: the letter cancels and the trick is explained. The same idea turns story riddles into equations like 3x + 5 = 26 that are solved by undoing operations.',
      sections: [
        { h: 'Why tricks work', html: `<p>Think of a number x, double it (2x), add 10 (2x + 10), halve it (x + 5), subtract the original (5). The answer is always 5, whatever x is.</p>` },
        { h: 'Calendar and pyramids', html: `<p>In a 3 × 3 box on a calendar, if the middle date is n, the dates are n − 8, n − 7, n − 6, n − 1, n, n + 1, n + 6, n + 7, n + 8; their sum is 9n. In an addition pyramid, each block is the sum of the two below: with base a, b, c the top is a + 2b + c.</p>` },
        { h: 'Solving equations', html: `<p>Do the same thing to both sides. 3x + 5 = 26 ⇒ 3x = 21 ⇒ x = 7. Check by substituting. Variables on both sides: collect letters on one side, numbers on the other.</p>
          <p>Story riddles: let the unknown be x, translate each sentence, solve, answer in words.</p>` }
      ],
      formulas: [['Calendar 3 × 3 box', 'sum = 9 × middle'], ['Calendar 2 × 2', 'diagonal sums equal'], ['Pyramid of 3', 'top = a + 2b + c'], ['Consecutive numbers', 'n, n + 1, n + 2'], ['Solve ax + b = c', 'x = (c − b)/a']],
      terms: [['Variable', 'letter standing for a number'], ['Expression', 'combination like 2x + 10'], ['Equation', 'two expressions set equal'], ['Solution', 'value that makes it true']],
      traps: ['Doing an operation on only one side.', 'Sign errors when moving terms.', 'Not answering the question asked (e.g. the age of the father, not x).', 'Forgetting to check the answer.'],
      bridge: '<p>Uses the distributive law (Ch 6) and letter-numbers from Number Play (Ch 5). Class 9 Ch 2 studies linear polynomials.</p>'
    },

    explore: [
      {
        title: 'Think of a number', intro: 'Choose your secret number, then press <kbd>S</kbd> for each step. The right column does the same with x.',
        build(el, K) {
          let x = 7; const row = K.row(el); K.slider(row, 'your number', 1, 50, 1, x, v => { x = v; draw(); }); const rd = K.read(el);
          const steps = [['Think of a number', v => v, 'x'], ['Double it', v => 2 * v, '2x'], ['Add 10', v => 2 * v + 10, '2x + 10'], ['Halve it', v => v + 5, 'x + 5'], ['Subtract your number', v => 5, '5']];
          const an = new K.Anim(steps.length - 1, () => draw(), { ms: 1000 });
          function draw() { rd.innerHTML = `<table class="t" style="width:auto"><tr><th>step</th><th>with ${x}</th><th>with x</th></tr>${steps.slice(0, an.i + 1).map(s => `<tr><td>${s[0]}</td><td>${s[1](x)}</td><td>${s[2]}</td></tr>`).join('')}</table>${an.i === steps.length - 1 ? '<b>Always 5</b> — the x cancelled out.' : ''}`; }
          K.anim(el, an); draw(); return an;
        }
      },
      {
        title: 'Calendar box', intro: 'Click any date that has a full 3 × 3 box around it. The sum is always 9 × the middle date.',
        build(el, K) {
          let mid = 16; const box = document.createElement('div'); box.style.cssText = 'display:grid;grid-template-columns:repeat(7,46px);gap:3px;margin:8px 0'; el.appendChild(box); const rd = K.read(el);
          function draw() { const inBox = (d) => [-8, -7, -6, -1, 0, 1, 6, 7, 8].includes(d - mid);
            box.innerHTML = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => `<div style="text-align:center;font-weight:bold">${d}</div>`).join('') + Array.from({ length: 31 }, (_, i) => i + 1).map(d => `<div data-d="${d}" style="cursor:pointer;text-align:center;padding:6px 0;border-radius:5px;border:1px solid var(--rule,#cbd5e1);${d === mid ? 'background:var(--orange,#ea580c);color:#fff;font-weight:bold' : inBox(d) ? 'background:var(--blueL,#dbeafe)' : ''}">${d}</div>`).join('');
            box.querySelectorAll('[data-d]').forEach(c => c.onclick = () => { const d = +c.dataset.d; if (d - 8 >= 1 && d + 8 <= 31 && d % 7 !== 0 && d % 7 !== 1) { mid = d; draw(); } });
            const ds = [-8, -7, -6, -1, 0, 1, 6, 7, 8].map(k => mid + k); rd.innerHTML = `${ds.join(' + ')} = <b>${ds.reduce((a, b) => a + b, 0)}</b> = 9 × ${mid} · with n in the middle: (n − 8) + (n − 7) + … + (n + 8) = 9n`; }
          draw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Solve an equation', gen(R, L) {
          const x = R.int(-9, 12), a = R.nz(-6, 7), b = R.int(-15, 15);
          if (L === 1) return { q: `Solve ${terms([[a, 'x'], [b, '']])} = ${a * x + b}.`, a: `x = ${x}`, ans: x };
          let c; do { c = R.nz(-5, 5); } while (c === a); const d = a * x + b - c * x;
          return { q: `Solve ${terms([[a, 'x'], [b, '']])} = ${terms([[c, 'x'], [d, '']])}.`, a: `x = ${x}`, ans: x, s: 'letters on one side, numbers on the other' };
        } },
      { title: 'Equations with fractions', levels: [2, 3], gen(R) {
          const k = R.int(2, 6), x = R.int(1, 10) * k, b = R.int(1, 9); return { q: `Solve x/${k} + ${b} = ${x / k + b}.`, a: `x = ${x}`, ans: x };
        } },
      { title: 'Story riddle', gen(R) {
          const t = R.int(0, 3);
          if (t === 0) { const n = R.int(5, 40); return { q: `The sum of three consecutive numbers is ${3 * n + 3}. Find them.`, a: `${n}, ${n + 1}, ${n + 2}`, s: `n + (n + 1) + (n + 2) = ${3 * n + 3}` }; }
          if (t === 1) { const s = R.int(8, 15), k = R.int(3, 4); return { q: `A father is ${k} times as old as his son. In 5 years their ages will add to ${(k + 1) * s + 10}. Find their present ages.`, a: `son ${s}, father ${k * s}`, s: `s + ${k}s + 10 = ${(k + 1) * s + 10}` }; }
          if (t === 2) { const w = R.int(4, 15), l = w + R.int(2, 10); return { q: `The length of a rectangle is ${l - w} cm more than its width and its perimeter is ${2 * (l + w)} cm. Find its dimensions.`, a: `${l} cm × ${w} cm`, s: `2(w + w + ${l - w}) = ${2 * (l + w)}` }; }
          const n = R.int(3, 30), m = R.int(2, 5), p = R.int(1, 20); return { q: `I think of a number, multiply it by ${m} and add ${p}. I get ${m * n + p}. What was my number?`, a: String(n), ans: n };
        } },
      { title: 'Explain a trick', levels: [2, 3], gen(R) {
          const a = R.int(2, 5), b = R.int(2, 20) * a; return { q: `Think of a number. Multiply by ${a}, add ${b}, divide by ${a}, subtract the number you thought of. Show the answer is always the same.`, a: `x → ${a}x → ${a}x + ${b} → x + ${b / a} → ${b / a}`, ans: b / a };
        } },
      { title: 'Calendar and pyramids', levels: [1, 2], gen(R) {
          if (R.chance(.5)) { const n = R.int(9, 23); return { q: `A 3 × 3 box on a calendar has middle date ${n}. Find the sum of the nine dates without adding them.`, a: String(9 * n), ans: 9 * n, s: '9 × middle' }; }
          const a = R.int(1, 15), b = R.int(1, 15), c = R.int(1, 15); return { q: `An addition pyramid has bottom row ${a}, ${b}, ${c}. Find the top block.`, a: String(a + 2 * b + c), ans: a + 2 * b + c, s: 'a + 2b + c' };
        } },
      { title: 'Form an expression', levels: [1], gen(R) {
          const items = [['5 more than three times a number n', '3n + 5'], ['the sum of a number and its double', '3x'], ['twice the sum of x and 7', '2(x + 7)'], ['a number decreased by 4, then halved', '(x − 4)/2'], ['the next even number after 2k', '2k + 2'], ['the perimeter of a square of side s', '4s']];
          const [q, a] = R.pick(items); return { q: `Write as an expression: ${q}.`, a };
        } }
    ],

    quiz: [
      { q: 'Solve 4x − 3 = 21', o: ['6', '4.5', '5', '7'], a: 0, e: '4x = 24.' },
      { q: 'Sum of a 3 × 3 calendar box with middle 15', o: ['135', '45', '150', '120'], a: 0, e: '9 × 15.' },
      { q: 'Double, add 10, halve, subtract the number: result', o: ['5', '10', 'x', '0'], a: 0, e: 'x + 5 − x.' },
      { q: 'Pyramid base 2, 3, 4: top', o: ['12', '9', '10', '14'], a: 0, e: '2 + 6 + 4.' },
      { q: 'Three consecutive numbers summing to 48', o: ['15, 16, 17', '16, 16, 16', '14, 16, 18', '15, 17, 19'], a: 0, e: '3n + 3 = 48.' },
      { q: '"7 less than twice x"', o: ['2x − 7', '7 − 2x', '2(x − 7)', 'x − 14'], a: 0, e: 'Translate.' },
      { q: 'Solve 5x + 2 = 3x + 12', o: ['5', '7', '2', '10'], a: 0, e: '2x = 10.' },
      { q: 'Solve x/3 = 7', o: ['21', '7/3', '10', '4'], a: 0, e: '× 3.' },
      { q: 'In an equation, whatever you do to one side', o: ['do to the other', 'reverse on the other', 'ignore', 'double'], a: 0, e: 'Balance.' },
      { q: 'Check x = 3 in 2x + 5 = 11', o: ['true', 'false', 'cannot tell', 'x must be 4'], a: 0, e: '6 + 5 = 11.' },
      { q: 'Next odd number after 2n + 1', o: ['2n + 3', '2n + 2', '2n', '3n'], a: 0, e: 'Add 2.' }
    ],

    teach: {
      outcomes: ['Explain number tricks with letter-numbers', 'Find patterns in calendars and pyramids', 'Solve linear equations in one variable', 'Translate and solve story riddles'],
      periods: [
        { t: 'Tricks and puzzles', flow: [['10 min', 'Perform the trick; students guess why.'], ['15 min', 'Explore panels 1 and 2.'], ['15 min', 'Pyramids.']] },
        { t: 'Equations and riddles', flow: [['20 min', 'Balance method; variables on both sides.'], ['10 min', 'Story riddles.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['One-sided operations.', 'Sign errors.', 'Answering x instead of the question.'],
      activities: ['Students invent their own number trick and explain it with x.', 'Calendar sums race.'],
      exit: ['Solve 7x − 9 = 3x + 11.', 'Sum of a calendar box with middle 20.', 'Write "4 more than half of n".'],
      homework: 'Invent a "think of a number" trick that always ends in 3 and prove it. Solve: a number is 12 more than one-third of itself; find it.'
    },

    slides: [
      { t: 'Algebra Play', b: ['Number tricks', 'Calendar and pyramids', 'Solving equations', 'Story riddles'] },
      { t: 'Why tricks work', b: ['Use x for the secret number', 'Simplify each step', 'x cancels'] },
      { t: 'Solving', b: ['Same operation on both sides', 'Collect letters and numbers', 'Check the answer'] },
      { t: 'Check yourself', b: ['Solve 3x + 4 = 25', 'Answer: x = 7'] }
    ],

    fs: { groups: [
        ['Patterns', [['Calendar 3 × 3', 'sum 9n (n = middle)'], ['Calendar 2 × 2', 'diagonal sums equal'], ['Pyramid of 3', 'a + 2b + c'], ['Consecutive', 'n, n + 1, n + 2']]],
        ['Solving', [['ax + b = c', 'x = (c − b)/a'], ['x/k = m', 'x = km'], ['Both sides', 'move terms, change sign'], ['Check', 'substitute back']]],
        ['Translating', [['more than', '+'], ['less than', '− (order!)'], ['times / twice', '×'], ['is', '=']]]],
      ex: [['5x − 3 = 2x + 9', '3x = 12, x = 4'], ['Three consecutive numbers sum 72', '23, 24, 25']],
      rem: ['Balance both sides.', 'Define x in words.', 'Answer the question asked.'] }
  });
})();
