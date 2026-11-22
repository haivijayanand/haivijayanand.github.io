/*
TOOL:    class1_maths_ch03
FAMILY:  CBSE_REVISION / Class 1 Maths (Joyful Mathematics)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 3 Mango Treat (numbers 1 to 9) - revise, 2 explore panels (count the mangoes, number line 0-9), 6 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const W = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  G9.register({
    no: 3, part: 'All chapters', short: 'Numbers 1 to 9', title: 'Mango Treat',
    blurb: 'Counting objects up to 9, reading and writing numerals 1–9 and their number names, the order of numbers, before and after.',
    revise: {
      oneLine: 'We count by touching each object once and saying one number for it. The last number we say tells how many. Numbers go in order 1, 2, 3, … 9; each number is one more than the one before.',
      sections: [
        { h: 'Counting', html: `<p>Touch and count: 🥭🥭🥭 → one, two, three → <b>3</b> mangoes. Count each object only once.</p>` },
        { h: 'Numbers and names', html: `<p>1 one · 2 two · 3 three · 4 four · 5 five · 6 six · 7 seven · 8 eight · 9 nine.</p>` },
        { h: 'Order', html: `<p>Just after 4 comes 5 (one more). Just before 4 comes 3 (one less). Between 6 and 8 is 7.</p>` }
      ],
      formulas: [['Count', 'touch each thing once'], ['How many', 'the last number said'], ['After', 'one more'], ['Before', 'one less'], ['Order', '1 2 3 4 5 6 7 8 9']],
      terms: [['Count', 'say numbers in order for each thing'], ['Numeral', 'the written number, like 7'], ['Number name', 'the word, like seven'], ['Between', 'in the middle']],
      traps: ['Counting the same mango twice.', 'Writing 6 and 9 or 3 and E the wrong way round.', 'Skipping a number while counting.'],
      bridge: '<p>Ch 4 adds 0 and 10; Ch 5 and 6 use counting to add and subtract.</p>'
    },

    explore: [
      {
        title: 'Count the mangoes', intro: 'Press <kbd>S</kbd> to count one mango at a time. Press New basket for a new number.',
        build(el, K) {
          const R = G9.rng(G9.newSeed()); let n = 6; const box = document.createElement('div'); box.style.cssText = 'font-size:46px;margin:10px 0;letter-spacing:6px'; el.appendChild(box); const rd = K.read(el);
          const an = new K.Anim(9, () => draw(), { ms: 700 });
          function draw() { const c = Math.min(an.i, n); box.innerHTML = Array.from({ length: n }, (_, i) => `<span style="${i < c ? 'outline:3px solid var(--orange,#ea580c);border-radius:50%' : 'opacity:.55'}">🥭</span>`).join('');
            rd.innerHTML = c === 0 ? 'Press S to count.' : `${W[c]} … ${c}${c === n ? ` — there are <b>${n}</b> (${W[n]}) mangoes.` : ''}`; }
          const row = K.row(el); K.button(row, 'New basket', () => { n = R.int(1, 9); an.reset(); draw(); });
          K.anim(el, an); draw(); return an;
        }
      },
      {
        title: 'Number line 0 to 9', intro: 'Slide the frog. The numbers just before and just after are shown.',
        build(el, K) {
          let n = 4; const row = K.row(el); K.slider(row, 'frog on', 0, 9, 1, n, v => { n = v; b.redraw(); });
          const b = new K.Board(el, { xmin: -0.8, xmax: 9.8, ymin: -1.2, ymax: 1.6, axes: false, grid: 0, aspect: 0.25 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.line(-0.5, 0, 9.5, 0, { color: C.ink, w: 3 }); for (let i = 0; i <= 9; i++) { b.line(i, -0.2, i, 0.2, { color: C.ink, w: 2 }); b.text(i, -0.7, String(i), { font: 'bold 18px', color: i === n ? C.orange : C.ink }); } b.text(n, 0.8, '🐸', { font: '30px' });
            rd.innerHTML = `The frog is on <b>${n}</b> (${W[n]}). ${n > 0 ? `Just before: ${n - 1}.` : ''} ${n < 9 ? `Just after: ${n + 1}.` : ''}`; };
          b.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Count', gen(R) {
          const n = R.int(1, 9), e = R.pick(['🥭', '🍎', '⭐', '🐟', '🌼', '🚗']); return { q: `How many? ${e.repeat(n)}`, a: String(n), ans: n };
        } },
      { title: 'Number name', gen(R) {
          const n = R.int(1, 9); return R.chance(.5) ? { q: `Write the number name for ${n}.`, a: W[n] } : { q: `Write the numeral for "${W[n]}".`, a: String(n), ans: n };
        } },
      { title: 'Before and after', gen(R) {
          const n = R.int(2, 8), t = R.int(0, 2); const q = [`What comes just after ${n}?`, `What comes just before ${n}?`, `What comes between ${n - 1} and ${n + 1}?`][t]; const a = [n + 1, n - 1, n][t];
          return { q, a: String(a), ans: a };
        } },
      { title: 'Which is more?', levels: [2, 3], gen(R) {
          const a = R.int(1, 9); let b; do { b = R.int(1, 9); } while (b === a); return { q: `Which is more: ${a} or ${b}?`, a: String(Math.max(a, b)), ans: Math.max(a, b) };
        } },
      { title: 'Missing numbers', levels: [2, 3], gen(R) {
          const s = R.int(1, 5); const seq = [s, s + 1, s + 2, s + 3, s + 4]; const k = R.int(1, 3); return { q: `Fill in: ${seq.map((v, i) => i === k ? '__' : v).join(', ')}`, a: String(seq[k]), ans: seq[k] };
        } },
      { title: 'Draw to show', levels: [1], gen(R) {
          const n = R.int(1, 9); return { q: `Draw ${n} circles.`, a: '⚪'.repeat(n) };
        } }
    ],

    quiz: [
      { q: 'How many? 🥭🥭🥭🥭', o: ['4', '3', '5', '6'], a: 0, e: 'Count each once.' },
      { q: 'What comes after 6?', o: ['7', '5', '8', '9'], a: 0, e: 'One more.' },
      { q: 'What comes before 3?', o: ['2', '4', '1', '5'], a: 0, e: 'One less.' },
      { q: '"Eight" is', o: ['8', '6', '3', '9'], a: 0, e: 'Number name.' },
      { q: 'Between 4 and 6 is', o: ['5', '3', '7', '6'], a: 0, e: 'Middle.' },
      { q: 'Which is more: 7 or 2?', o: ['7', '2', 'same', 'none'], a: 0, e: '7 comes later.' },
      { q: 'How many? ⭐⭐⭐⭐⭐⭐⭐⭐⭐', o: ['9', '8', '7', '10'], a: 0, e: 'Nine.' },
      { q: 'The numeral for "five"', o: ['5', '2', '7', '9'], a: 0, e: 'Five.' },
      { q: '1, 2, 3, __, 5', o: ['4', '6', '0', '7'], a: 0, e: 'In order.' },
      { q: 'The last number we say while counting tells', o: ['how many', 'the colour', 'the biggest', 'nothing'], a: 0, e: 'Cardinality.' },
      { q: 'What comes after 8?', o: ['9', '7', '10', '6'], a: 0, e: 'One more.' }
    ],

    teach: {
      outcomes: ['Count objects up to 9', 'Read and write numerals and names 1–9', 'Say numbers before, after and between', 'Compare two numbers up to 9'],
      periods: [
        { t: 'Counting', flow: [['10 min', 'Mango basket story; count real objects.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Count and write numerals.']] },
        { t: 'Order', flow: [['15 min', 'Explore panel 2: number line frog.'], ['15 min', 'Before, after, between games.'], ['10 min', 'Check quiz together.']] }
      ],
      misconceptions: ['Double counting.', 'Reversed numerals.', 'Skipping numbers.'],
      activities: ['Number line on the floor: children hop.', 'Bead strings with 9 beads.'],
      exit: ['Show 7 fingers.', 'What comes after 5?', 'Write the number name for 3.'],
      homework: 'Count the spoons, cups and plates at home and write the numbers.'
    },

    slides: [
      { t: 'Mango Treat', b: ['Counting to 9', 'Numerals and names', 'Before and after'] },
      { t: 'Numbers', b: ['1 one, 2 two, 3 three', '4 four, 5 five, 6 six', '7 seven, 8 eight, 9 nine'] },
      { t: 'Check yourself', b: ['What comes after 4?', 'Count 🥭🥭🥭🥭🥭'] }
    ],

    fs: { groups: [
        ['Numbers 1 to 9', [['1 one', '🥭'], ['2 two', '🥭🥭'], ['3 three', '🥭🥭🥭'], ['4 four', '🥭🥭🥭🥭'], ['5 five', '🥭🥭🥭🥭🥭'], ['6 six, 7 seven', '…'], ['8 eight, 9 nine', '…']]],
        ['Order', [['After', 'one more: after 4 is 5'], ['Before', 'one less: before 4 is 3'], ['Between', 'between 6 and 8 is 7']]],
        ['How to count', [['Touch', 'each thing once'], ['Say', 'one number for each'], ['Answer', 'the last number said']]]],
      ex: [['🍎🍎🍎🍎🍎🍎', '6 (six)'], ['__, 5, 6', '4']],
      rem: ['Touch and count.', 'The last number tells how many.', 'Write 6 and 9 carefully.'] }
  });
})();
