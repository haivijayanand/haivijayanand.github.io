/*
TOOL:    class3_maths_ch03
FAMILY:  CBSE_REVISION / Class 3 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 3 Double Century (numbers to 200) - revise, 2 explore panels (number chart 101-200, jumps of 10 and 100), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 3, part: 'All chapters', short: 'Numbers to 200', title: 'Double Century',
    blurb: 'Counting beyond 100 to 200: hundreds, tens and ones, number names, before/after, counting in 2s, 5s and 10s, comparing.',
    revise: {
      oneLine: 'After 100 we keep counting: 101, 102 … 199, 200 — a double century. 156 = 1 hundred + 5 tens + 6 ones. Compare hundreds first, then tens, then ones.',
      sections: [
        { h: 'Beyond 100', html: `<p>100 = 10 tens. 156 = 100 + 50 + 6, read "one hundred fifty-six". 200 = 2 hundreds.</p>` },
        { h: 'Counting on', html: `<p>By 10s from 103: 113, 123, 133 … By 5s: 150, 155, 160.</p>` },
        { h: 'Comparing', html: `<p>178 &gt; 169 (same hundreds, 7 tens &gt; 6 tens). 99 &lt; 101.</p>` }
      ],
      formulas: [['100', '10 tens'], ['200', '2 hundreds'], ['156', '100 + 50 + 6'], ['Compare', 'hundreds, then tens, then ones']],
      terms: [['Century', '100 (runs in cricket)'], ['Double century', '200'], ['Hundreds place', 'leftmost digit in 156']],
      traps: ['Writing 1056 for "one hundred fifty-six".', '109 comes before 110, not after.', 'Comparing by the last digit.'],
      bridge: '<p>Ch 6 goes up to 999.</p>'
    },
    explore: [
      { title: 'Number chart 101–200', intro: 'Click a number to see it in hundreds, tens and ones, and its neighbours.',
        build(el, K) { let n = 156; const box = document.createElement('div'); box.style.cssText = 'display:grid;grid-template-columns:repeat(10,44px);gap:2px;margin:8px 0'; el.appendChild(box); const rd = K.read(el);
          function draw() { box.innerHTML = Array.from({ length: 100 }, (_, i) => i + 101).map(v => `<div data-v="${v}" style="cursor:pointer;text-align:center;padding:4px 0;font:12px Consolas;border:1px solid var(--rule,#cbd5e1);border-radius:3px;${v === n ? 'background:var(--orange,#ea580c);color:#fff;font-weight:bold' : Math.abs(v - n) === 10 ? 'background:var(--purpleL,#ede9fe)' : Math.abs(v - n) === 1 ? 'background:var(--blueL,#dbeafe)' : ''}">${v}</div>`).join('');
            box.querySelectorAll('[data-v]').forEach(c => c.onclick = () => { n = +c.dataset.v; draw(); });
            rd.innerHTML = `<b>${n}</b> = ${Math.floor(n / 100)} hundred${n >= 200 ? 's' : ''} + ${Math.floor(n % 100 / 10)} tens + ${n % 10} ones = ${Math.floor(n / 100) * 100} + ${n % 100 - n % 10} + ${n % 10} · 1 before ${n - 1}, 1 after ${n + 1}, 10 more ${n + 10}`; }
          draw(); return null; } },
      { title: 'Counting on in jumps', intro: 'Choose a start and a jump size; press <kbd>S</kbd> to jump.',
        build(el, K) { let s = 103, d = 10; const row = K.row(el); K.slider(row, 'start', 100, 150, 1, s, v => { s = v; an.reset(); }); K.select(row, 'jump', ['2', '5', '10'], i => { d = [2, 5, 10][i]; an.reset(); }); const sel = row.querySelector('select'); if (sel) sel.value = 2;
          const rd = K.read(el); const an = new K.Anim(10, () => draw(), { ms: 500 }); function draw() { rd.innerHTML = Array.from({ length: an.i + 1 }, (_, j) => s + d * j).filter(v => v <= 200).join(' → '); }
          K.anim(el, an); draw(); return an; } }
    ],
    gens: [
      { title: 'Hundreds, tens, ones', gen(R) { const n = R.int(101, 200); return { q: `Write ${n} as hundreds, tens and ones.`, a: `${Math.floor(n / 100)} hundred, ${Math.floor(n % 100 / 10)} tens, ${n % 10} ones` }; } },
      { title: 'Before and after', gen(R) { const n = R.int(101, 199); return R.chance(.5) ? { q: `Just after ${n}?`, a: String(n + 1), ans: n + 1 } : { q: `Just before ${n}?`, a: String(n - 1), ans: n - 1 }; } },
      { title: 'Count on', gen(R) { const d = R.pick([2, 5, 10]), s = R.int(100, 150), k = R.int(1, 3); const seq = Array.from({ length: 5 }, (_, i) => s + d * i); return { q: `Fill in: ${seq.map((v, i) => i === k ? '__' : v).join(', ')}`, a: String(seq[k]), ans: seq[k] }; } },
      { title: 'Compare', gen(R) { const a = R.int(90, 200); let b; do { b = R.int(90, 200); } while (b === a); return { q: `${a} __ ${b} (> or <)`, a: a > b ? '>' : '<' }; } },
      { title: 'Number names', levels: [2, 3], gen(R) { const n = R.int(101, 199); const t = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'], o = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'], te = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']; const r = n % 100; const w = 'one hundred' + (r ? ' ' + (r < 10 ? o[r] : r < 20 ? te[r - 10] : t[Math.floor(r / 10)] + (r % 10 ? '-' + o[r % 10] : '')) : ''); return { q: `Write in words: ${n}`, a: w }; } }
    ],
    quiz: [
      { q: '1 hundred 5 tens 6 ones', o: ['156', '1056', '165', '516'], a: 0, e: '100 + 50 + 6.' }, { q: 'After 199', o: ['200', '1100', '190', '201'], a: 0, e: 'Double century.' },
      { q: '178 __ 169', o: ['>', '<', '=', '+'], a: 0, e: 'Tens.' }, { q: '120, 130, 140, __', o: ['150', '141', '145', '160'], a: 0, e: 'By 10s.' },
      { q: 'Before 110', o: ['109', '111', '100', '190'], a: 0, e: 'One less.' }, { q: '10 tens =', o: ['100', '10', '1000', '200'], a: 0, e: 'Hundred.' },
      { q: 'Double century =', o: ['200', '100', '2000', '20'], a: 0, e: 'Cricket.' }, { q: 'Tens in 147', o: ['4', '1', '7', '14'], a: 0, e: 'Middle digit.' },
      { q: '150, 155, 160, __', o: ['165', '161', '170', '166'], a: 0, e: 'By 5s.' }, { q: '"one hundred twenty"', o: ['120', '1020', '102', '210'], a: 0, e: '100 + 20.' },
      { q: 'Greatest: 189, 198, 179, 199', o: ['199', '198', '189', '179'], a: 0, e: 'Compare.' }
    ],
    teach: {
      outcomes: ['Count, read and write numbers to 200', 'Use hundreds, tens and ones', 'Count on in 2s, 5s, 10s', 'Compare numbers'],
      periods: [{ t: 'Beyond 100', flow: [['10 min', 'Cricket scores: century, double century.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Number names.']] }, { t: 'Counting on and comparing', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Compare and order.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['1056 for 156.', 'Order after 109.'], activities: ['Number chart puzzles with missing numbers.', 'Bundles of 100 straws.'],
      exit: ['Write 173 in words.', 'Count on by 10 from 135.', '168 or 186 — greater?'], homework: 'Find 3 numbers between 100 and 200 in newspapers or books and write them in words.'
    },
    slides: [{ t: 'Double Century', b: ['Numbers 101–200', 'Hundreds, tens, ones', 'Counting on', 'Comparing'] }, { t: 'Check yourself', b: ['1 hundred 3 tens 4 ones?', '10 more than 185?'] }],
    fs: { groups: [['Place value', [['100', '10 tens'], ['156', '100 + 50 + 6'], ['200', '2 hundreds']]], ['Counting', [['By 2s, 5s, 10s', 'add the same each time'], ['1 more / 10 more', 'next box / box below in chart']]], ['Compare', [['Hundreds first', 'then tens, then ones'], ['Signs', '> and <']]]],
      ex: [['184', '1 hundred 8 tens 4 ones'], ['After 159', '160']], rem: ['Hundreds on the left.', 'Read "one hundred fifty-six".', 'Compare from the left.'] }
  });
})();
