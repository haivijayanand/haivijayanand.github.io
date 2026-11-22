/*
TOOL:    class1_maths_ch08
FAMILY:  CBSE_REVISION / Class 1 Maths (Joyful Mathematics)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 8 Fun with Numbers (numbers 21 to 99) - revise, 2 explore panels (tens and ones bundles, hundred chart), 6 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'], TENS = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const TEEN = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const name = (n) => n < 10 ? ONES[n] : n < 20 ? TEEN[n - 10] : TENS[Math.floor(n / 10)] + (n % 10 ? '-' + ONES[n % 10] : '');

  G9.register({
    no: 8, part: 'All chapters', short: 'Numbers to 99', title: 'Fun with Numbers',
    blurb: 'Numbers 21 to 99 as tens and ones, number names, counting in tens, the hundred chart, comparing two-digit numbers.',
    revise: {
      oneLine: 'Every two-digit number is some tens and some ones: 47 is 4 tens and 7 ones. The tens digit decides which number is bigger; if the tens are equal, compare the ones.',
      sections: [
        { h: 'Tens and ones', html: `<p>47 = 4 tens + 7 ones = 40 + 7. Bundles of 10 sticks show the tens; loose sticks show the ones.</p>` },
        { h: 'Counting in tens', html: `<p>10, 20, 30, 40, 50, 60, 70, 80, 90. After 39 comes 40; after 99 comes 100.</p>` },
        { h: 'Comparing', html: `<p>52 &gt; 25 because 5 tens are more than 2 tens. 46 &lt; 48: same tens, fewer ones.</p>` },
        { h: 'Number names', html: `<p>21 twenty-one, 35 thirty-five, 58 fifty-eight, 99 ninety-nine.</p>` }
      ],
      formulas: [['Two-digit number', 'tens and ones'], ['47', '4 tens + 7 ones = 40 + 7'], ['Count in tens', '10, 20, 30, … 90'], ['Compare', 'tens first, then ones'], ['> <', 'the open mouth faces the bigger number']],
      terms: [['Tens place', 'left digit'], ['Ones place', 'right digit'], ['Greater than >', 'more'], ['Less than <', 'fewer']],
      traps: ['Reading 47 as 74.', 'Thinking 9 > 19 because 9 is a big digit.', 'Writing "forty seven" as 407.'],
      bridge: '<p>Class 2 adds and subtracts two-digit numbers and goes to 999.</p>'
    },

    explore: [
      {
        title: 'Bundles and sticks', intro: 'Choose a number; it is shown as bundles of ten and loose sticks.',
        build(el, K) {
          let n = 47; const row = K.row(el); K.slider(row, 'number', 10, 99, 1, n, v => { n = v; draw(); }); const rd = K.read(el);
          function draw() { const t = Math.floor(n / 10), o = n % 10; rd.innerHTML = `<div style="font-size:30px;line-height:1.4">${'<span style="display:inline-block;border:2px solid var(--orange,#ea580c);border-radius:6px;padding:0 3px;margin:2px">||||||||||</span>'.repeat(t)} ${'<span style="font-weight:bold">|</span>'.repeat(o)}</div><b>${n}</b> = ${t} tens and ${o} ones = ${t * 10} + ${o} · <i>${name(n)}</i>`; }
          draw(); return null;
        }
      },
      {
        title: 'Hundred chart', intro: 'Click a number. The chart shows 10 more (below), 10 less (above), 1 more and 1 less.',
        build(el, K) {
          let n = 45; const box = document.createElement('div'); box.style.cssText = 'display:grid;grid-template-columns:repeat(10,42px);gap:2px;margin:8px 0'; el.appendChild(box); const rd = K.read(el);
          function draw() { const nb = { [n - 10]: 'C', [n + 10]: 'C', [n - 1]: 'B', [n + 1]: 'B' }; box.innerHTML = Array.from({ length: 100 }, (_, i) => i + 1).map(v => `<div data-v="${v}" style="cursor:pointer;text-align:center;padding:5px 0;font:13px Consolas;border:1px solid var(--rule,#cbd5e1);border-radius:4px;${v === n ? 'background:var(--orange,#ea580c);color:#fff;font-weight:bold' : nb[v] === 'C' ? 'background:var(--purpleL,#ede9fe)' : nb[v] === 'B' ? 'background:var(--blueL,#dbeafe)' : v % 10 === 0 ? 'font-weight:bold' : ''}">${v}</div>`).join('');
            box.querySelectorAll('[data-v]').forEach(c => c.onclick = () => { n = +c.dataset.v; draw(); });
            rd.innerHTML = `<b>${n}</b> (${name(n === 100 ? 99 : n)}${n === 100 ? ' + 1 = one hundred' : ''}) · 1 less ${n - 1} · 1 more ${n + 1} · 10 less ${n - 10 > 0 ? n - 10 : '—'} · 10 more ${n + 10 <= 100 ? n + 10 : '—'}`; }
          draw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Tens and ones', gen(R) {
          const n = R.int(21, 99); return R.chance(.5) ? { q: `${n} = __ tens and __ ones`, a: `${Math.floor(n / 10)} tens and ${n % 10} ones` } : { q: `${Math.floor(n / 10)} tens and ${n % 10} ones make which number?`, a: String(n), ans: n };
        } },
      { title: 'Number names', gen(R) {
          const n = R.int(21, 99); return R.chance(.5) ? { q: `Write the number name for ${n}.`, a: name(n) } : { q: `Write the number for "${name(n)}".`, a: String(n), ans: n };
        } },
      { title: 'Before, after, between', gen(R) {
          const n = R.int(21, 98), t = R.int(0, 2); const qs = [`just after ${n}`, `just before ${n}`, `between ${n - 1} and ${n + 1}`]; const as = [n + 1, n - 1, n];
          return { q: `Which number comes ${qs[t]}?`, a: String(as[t]), ans: as[t] };
        } },
      { title: 'Compare', gen(R) {
          const a = R.int(10, 99); let b; do { b = R.int(10, 99); } while (b === a); return { q: `Put > or < : ${a} __ ${b}`, a: a > b ? '>' : '<' };
        } },
      { title: 'Count in tens', levels: [2, 3], gen(R) {
          const s = R.int(1, 9), k = R.int(1, 3); const seq = Array.from({ length: 5 }, (_, i) => s + 10 * i); return { q: `Fill in: ${seq.map((v, i) => i === k ? '__' : v).join(', ')}`, a: String(seq[k]), ans: seq[k] };
        } },
      { title: 'Smallest and largest', levels: [3], gen(R) {
          const xs = R.shuffle([R.int(10, 99), R.int(10, 99), R.int(10, 99), R.int(10, 99)]); return { q: `Arrange from smallest to largest: ${xs.join(', ')}`, a: [...xs].sort((a, b) => a - b).join(', ') };
        } }
    ],

    quiz: [
      { q: '4 tens and 7 ones', o: ['47', '74', '11', '407'], a: 0, e: '40 + 7.' },
      { q: 'Which is bigger: 52 or 25?', o: ['52', '25', 'same', 'cannot say'], a: 0, e: '5 tens > 2 tens.' },
      { q: 'After 39 comes', o: ['40', '30', '310', '38'], a: 0, e: 'Next ten.' },
      { q: '"Sixty-three" is', o: ['63', '36', '603', '6'], a: 0, e: '6 tens, 3 ones.' },
      { q: '10 more than 45', o: ['55', '46', '35', '145'], a: 0, e: 'One more ten.' },
      { q: '20, 30, __, 50', o: ['40', '35', '45', '60'], a: 0, e: 'Count in tens.' },
      { q: '68 has how many tens?', o: ['6', '8', '68', '14'], a: 0, e: 'Left digit.' },
      { q: '46 __ 48', o: ['<', '>', '=', '+'], a: 0, e: 'Same tens, fewer ones.' },
      { q: 'After 99 comes', o: ['100', '90', '991', '98'], a: 0, e: 'One hundred.' },
      { q: 'Number name of 71', o: ['seventy-one', 'seventeen', 'seven-one', 'one-seventy'], a: 0, e: '70 + 1.' },
      { q: 'Smallest: 81, 18, 80, 28', o: ['18', '28', '80', '81'], a: 0, e: '1 ten.' }
    ],

    teach: {
      outcomes: ['Read, write and name numbers to 99', 'Show numbers as tens and ones', 'Count in tens', 'Compare and order two-digit numbers'],
      periods: [
        { t: 'Tens and ones', flow: [['10 min', 'Bundle sticks in tens.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Number names.']] },
        { t: 'Hundred chart', flow: [['15 min', 'Explore panel 2: patterns of 10 more, 1 more.'], ['15 min', 'Compare with > and <.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['47 read as 74.', 'Comparing by the ones digit.'],
      activities: ['Snakes and ladders on a hundred chart.', 'Make numbers with bundles and sticks.'],
      exit: ['Show 36 with bundles.', 'Which is more: 59 or 61?', 'Write 82 in words.'],
      homework: 'Find 5 two-digit numbers at home (calendar, clock, books) and write them as tens and ones.'
    },

    slides: [
      { t: 'Fun with Numbers', b: ['Numbers to 99', 'Tens and ones', 'Counting in tens', 'Comparing'] },
      { t: 'Tens and ones', b: ['47 = 4 tens + 7 ones', '10, 20, 30, … 90', 'Compare tens first'] },
      { t: 'Check yourself', b: ['5 tens and 2 ones?', '73 or 37 — bigger?'] }
    ],

    fs: { groups: [
        ['Place value', [['Tens digit', 'left: 4 in 47'], ['Ones digit', 'right: 7 in 47'], ['47', '40 + 7']]],
        ['Counting', [['In tens', '10, 20, 30, 40, 50, 60, 70, 80, 90'], ['1 more / less', 'move along a row'], ['10 more / less', 'move down / up a column']]],
        ['Comparing', [['Tens first', '52 > 25'], ['Then ones', '46 < 48'], ['Signs', '> greater, < less']]],
        ['Names', [['21–29', 'twenty-one …'], ['30, 40, 50', 'thirty, forty, fifty'], ['60, 70, 80, 90', 'sixty, seventy, eighty, ninety']]]],
      ex: [['85', '8 tens and 5 ones, eighty-five'], ['39 or 93', '93 is bigger']],
      rem: ['Tens on the left.', 'Compare tens first.', 'After 99 comes 100.'] }
  });
})();
