/*
TOOL:    class8_maths_ch03
FAMILY:  CBSE_REVISION / Class 8 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class VIII moved into the series
CHANGES: 1.0.0 - Part I Ch 3 A Story of Numbers - revise, 2 explore panels (place value in any base, Roman numerals), 6 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num } = G9;
  const roman = (n) => { const t = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]; let s = ''; t.forEach(([v, r]) => { while (n >= v) { s += r; n -= v; } }); return s; };
  const toBase = (n, b) => n.toString(b).toUpperCase();

  G9.register({
    no: 3, part: 'Part I', short: 'Story of numbers', title: 'A Story of Numbers',
    blurb: 'How people counted and wrote numbers: tallies, landmark numbers, Egyptian, Roman, Mayan and Babylonian systems, bases, place value and the Indian zero.',
    revise: {
      oneLine: 'People first matched objects with sticks and notches, then grouped them with landmark numbers. Place-value systems use a base and the position of a digit; the Indian system with zero needs just ten symbols to write any number.',
      sections: [
        { h: 'From tallies to landmarks', html: `<p>Matching one-to-one with notches or pebbles works for small counts. Larger counts need <b>landmark numbers</b> (like 10, 100) and symbols for them — the Egyptian system had separate symbols for 1, 10, 100, 1000, …, and a number was the sum of its symbols.</p>` },
        { h: 'Roman numerals', html: `<p>I 1, V 5, X 10, L 50, C 100, D 500, M 1000. A smaller symbol before a larger one is subtracted (IV = 4, XC = 90). Not place value: the value of a symbol does not depend on where it sits, and there is no zero.</p>` },
        { h: 'Place value and bases', html: `<p>In base b, a digit is worth (digit) × b^(position). Base 10: 3507 = 3×10³ + 5×10² + 0×10 + 7. Mayans used base 20, Babylonians base 60 (we still have 60 seconds, 60 minutes). Base 2 (binary) uses only 0 and 1: 1011₂ = 8 + 2 + 1 = 11.</p>` },
        { h: 'Zero', html: `<p>Indian mathematicians made zero both a place holder (the 0 in 3507) and a number in its own right; Brahmagupta (628 CE) gave rules for arithmetic with zero. The Hindu numerals travelled to the world as the Hindu–Arabic numerals.</p>` }
      ],
      formulas: [['Base 10 value', 'Σ digit × 10^position'], ['Base b value', 'Σ digit × b^position'], ['Binary', '1, 2, 4, 8, 16, 32, …'], ['Roman', 'I 1, V 5, X 10, L 50, C 100, D 500, M 1000']],
      terms: [['Landmark number', 'a group size given its own symbol'], ['Base', 'the group size in a place-value system'], ['Place holder', 'zero showing an empty place'], ['Hindu–Arabic numerals', 'the digits 0–9']],
      traps: ['IIII is usually written IV.', 'Base-2 digits can only be 0 or 1.', 'The 0 in 205 is needed: 25 is a different number.', 'Reading place values from the left in another base.'],
      bridge: '<p>Ch 2 (powers) explains place values 10ⁿ; Ch 5 (Number Play) uses place value to prove divisibility rules.</p>'
    },

    explore: [
      {
        title: 'Place value in any base', intro: 'Type a whole number and choose a base. The columns show the place values and the digits.',
        build(el, K) {
          let n = 2026, b = 2; const row = K.row(el); row.innerHTML = '<label>number <input type="number" id="nb" value="2026" min="0" max="99999" style="width:7em"></label>'; K.select(row, 'base', ['2', '3', '5', '8', '10', '16', '20', '60'], i => { b = [2, 3, 5, 8, 10, 16, 20, 60][i]; draw(); });
          const rd = K.read(el); row.querySelector('input').addEventListener('input', e => { n = Math.max(0, Math.min(99999, parseInt(e.target.value) || 0)); draw(); });
          function draw() { const ds = []; let m = n; do { ds.unshift(m % b); m = Math.floor(m / b); } while (m > 0);
            const cols = ds.map((d, i) => { const p = ds.length - 1 - i; return `<td style="text-align:center;padding:4px 10px"><div style="color:var(--muted);font-size:12px">${b}${p ? '<sup>' + p + '</sup>' : '⁰'} = ${(b ** p).toLocaleString('en-IN')}</div><div style="font:bold 22px Consolas">${b > 10 ? '(' + d + ')' : d}</div></td>`; }).join('');
            rd.innerHTML = `<table class="t" style="width:auto"><tr>${cols}</tr></table>${n} = ${ds.map((d, i) => `${d}×${b}${'⁰¹²³⁴⁵⁶⁷⁸⁹'[ds.length - 1 - i] || '^' + (ds.length - 1 - i)}`).join(' + ')}${b === 16 || b === 2 || b === 8 ? ` · written ${toBase(n, b)}₍${b}₎` : ''}`; }
          draw(); return null;
        }
      },
      {
        title: 'Roman numerals', intro: 'Slide the number; the Roman numeral is built from the largest symbols first, using subtractive pairs (IV, IX, XL, XC, CD, CM).',
        build(el, K) {
          let n = 1987; const row = K.row(el); K.slider(row, 'number', 1, 3999, 1, n, v => { n = v; draw(); }); const rd = K.read(el);
          function draw() { const parts = []; let m = n; [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']].forEach(([v, r]) => { while (m >= v) { parts.push([v, r]); m -= v; } });
            rd.innerHTML = `<span style="font:bold 28px Georgia">${roman(n)}</span><br>${parts.map(p => `${p[1]} (${p[0]})`).join(' + ')} = ${n}`; }
          draw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Roman ↔ Hindu–Arabic', gen(R) {
          const n = R.int(4, 3999); return R.chance(.5) ? { q: `Write ${n} in Roman numerals.`, a: roman(n) } : { q: `What number is ${roman(n)}?`, a: String(n), ans: n };
        } },
      { title: 'Binary to decimal', gen(R, L) {
          const n = R.int(5, L === 1 ? 31 : 255); return { q: `Convert ${toBase(n, 2)}₍₂₎ to base 10.`, a: String(n), ans: n, s: 'add the place values of the 1s' };
        } },
      { title: 'Decimal to another base', levels: [2, 3], gen(R) {
          const b = R.pick([2, 3, 5, 8]), n = R.int(10, 300); return { q: `Write ${n} in base ${b}.`, a: `${toBase(n, b)}₍${b}₎`, s: 'repeated division by the base' };
        } },
      { title: 'Expanded form', levels: [1, 2], gen(R) {
          const n = R.int(1001, 99999); const ds = String(n).split(''); const L = ds.length;
          return { q: `Write ${n.toLocaleString('en-IN')} in expanded form using powers of 10.`, a: ds.map((d, i) => `${d}×10${'⁰¹²³⁴'[L - 1 - i]}`).join(' + ') };
        } },
      { title: 'Base 60 and base 20', levels: [2, 3], gen(R) {
          const t = R.int(0, 1);
          if (t === 0) { const h = R.int(1, 9), m = R.int(0, 59), s = R.int(0, 59); return { q: `How many seconds are ${h} h ${m} min ${s} s? (a base-60 number with digits ${h}, ${m}, ${s})`, a: String(h * 3600 + m * 60 + s), ans: h * 3600 + m * 60 + s, s: `${h}×60² + ${m}×60 + ${s}` }; }
          const a = R.int(1, 19), b = R.int(0, 19), c = R.int(0, 19); return { q: `In a base-20 (Mayan-style) system the digits are ${a}, ${b}, ${c}. What number is it?`, a: String(a * 400 + b * 20 + c), ans: a * 400 + b * 20 + c, s: `${a}×20² + ${b}×20 + ${c}` };
        } },
      { title: 'Facts about number systems', levels: [1], gen(R) {
          const items = [['Which number system has no symbol for zero: Roman or Hindu–Arabic?', 'Roman'], ['What base did the Babylonians use?', '60'], ['What base did the Mayans use?', '20'], ['How many symbols does a base-10 place-value system need?', '10 (0–9)'], ['Which mathematician gave rules for calculating with zero in 628 CE?', 'Brahmagupta'], ['What is the value of the 7 in 37 405?', '7000']];
          const [q, a] = R.pick(items); return { q, a };
        } }
    ],

    quiz: [
      { q: 'XLIV =', o: ['44', '64', '46', '54'], a: 0, e: '40 + 4.' },
      { q: '1101₂ =', o: ['13', '11', '1101', '9'], a: 0, e: '8 + 4 + 1.' },
      { q: 'Babylonians counted in base', o: ['60', '20', '10', '12'], a: 0, e: 'Sexagesimal.' },
      { q: 'Roman numerals are not a place-value system because', o: ['a symbol\'s value does not depend on its position', 'they have zero', 'they use base 2', 'they have 10 symbols'], a: 0, e: 'X is 10 wherever it is.' },
      { q: 'Value of 5 in 45 302', o: ['5000', '500', '50', '5'], a: 0, e: 'Thousands place.' },
      { q: 'MCM =', o: ['1900', '2100', '1100', '1500'], a: 0, e: '1000 + 900.' },
      { q: 'Digits allowed in base 5', o: ['0–4', '0–5', '1–5', '0–9'], a: 0, e: 'Less than the base.' },
      { q: '2026 in Roman numerals', o: ['MMXXVI', 'MMXXIV', 'MMXVI', 'MCMXXVI'], a: 0, e: '2000 + 20 + 6.' },
      { q: 'The zero in 1050 acts as', o: ['a place holder', 'a decoration', 'a base', 'a landmark'], a: 0, e: 'Empty hundreds place.' },
      { q: '10₍₂₎ + 1₍₂₎ =', o: ['11₍₂₎ = 3', '12', '2', '101'], a: 0, e: '2 + 1.' },
      { q: 'Egyptian numerals were', o: ['additive with symbols for powers of 10', 'base 2', 'place value', 'base 60'], a: 0, e: 'Sum of symbols.' }
    ],

    teach: {
      outcomes: ['Describe how counting and number writing developed', 'Read and write Roman numerals', 'Explain place value and convert between bases', 'Appreciate the role of zero'],
      periods: [
        { t: 'Counting through history', flow: [['15 min', 'Tallies, landmarks, Egyptian and Roman.'], ['15 min', 'Explore panel 2: Roman numerals.'], ['10 min', 'Practice.']] },
        { t: 'Place value and zero', flow: [['15 min', 'Explore panel 1: bases.'], ['15 min', 'Binary, base 20, base 60; zero.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Roman numerals are place value.', 'Digits beyond the base.', 'Zero means nothing.'],
      activities: ['Invent a class number system with your own symbols and base.', 'Binary finger counting to 31.'],
      exit: ['Write 49 in Roman numerals.', '10110₂ in base 10.', 'Why does 0 matter in 405?'],
      homework: 'Write your year of birth in Roman numerals and in binary. Find out why a clock has 60 minutes.'
    },

    slides: [
      { t: 'A Story of Numbers', b: ['Tallies and landmark numbers', 'Roman numerals', 'Place value and bases', 'The Indian zero'] },
      { t: 'Place value', b: ['Digit × base^position', 'Base 10, 2, 20, 60', '1011₂ = 11'] },
      { t: 'Zero', b: ['Place holder and a number', 'Brahmagupta, 628 CE', 'Ten symbols write every number'] },
      { t: 'Check yourself', b: ['CDXC?', '111₂?', 'Answers: 490 · 7'] }
    ],

    fs: { groups: [
        ['Roman numerals', [['Symbols', 'I 1, V 5, X 10, L 50, C 100, D 500, M 1000'], ['Subtractive pairs', 'IV 4, IX 9, XL 40, XC 90, CD 400, CM 900'], ['No zero', 'not place value']]],
        ['Place value', [['Base 10', 'units, 10, 100, 1000, …'], ['Base b', 'digit × bⁿ'], ['Digits in base b', '0 to b − 1']]],
        ['Other bases', [['Binary (2)', '1, 2, 4, 8, 16, 32, 64, 128'], ['Mayan (20)', '1, 20, 400, 8000'], ['Babylonian (60)', '1, 60, 3600'], ['Conversion', 'repeated division by b']]]],
      ex: [['1987', 'MCMLXXXVII'], ['45 in base 2', '101101₂']],
      rem: ['Largest Roman symbols first.', 'Digits must be smaller than the base.', 'Zero is a place holder.'] }
  });
})();
