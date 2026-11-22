/*
TOOL:    class5_maths_ch01
FAMILY:  CBSE_REVISION / Class 5 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 1 We the Travellers - I (numbers to a lakh: place value, Indian commas, number names, comparing, rounding) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const IN = n => n.toLocaleString('en-IN');
  G9.register({
    no: 1, part: 'All chapters', short: 'Numbers to a lakh', title: 'We the Travellers - I',
    blurb: 'Large numbers met while travelling (distances, tickets, crowds): ten thousands and a lakh, place value, the Indian comma system, number names, comparing, ordering and rounding.',
    revise: {
      oneLine: '10 thousands = 1 ten thousand (10 000) and 10 ten thousands = 1 lakh (1,00,000). In the Indian system commas come after the thousands and then every two digits: 45,678. Compare from the left; round by looking one place to the right.',
      sections: [
        { h: 'Place value', html: `<p>45,678 = 4 ten thousands + 5 thousands + 6 hundreds + 7 tens + 8 ones = forty-five thousand six hundred seventy-eight.</p>` },
        { h: 'Comparing and ordering', html: `<p>More digits → bigger. Same digits: compare from the left. 38,905 &lt; 39,050.</p>` },
        { h: 'Rounding', html: `<p>45,678 → nearest thousand 46,000; nearest ten thousand 50,000.</p>` }
      ],
      formulas: [['10 000', 'ten thousand'], ['1,00,000', '1 lakh = 100 thousands'], ['Indian commas', '1,23,456'], ['Round', 'next digit ≥ 5 → up']],
      terms: [['Lakh', '1,00,000'], ['Period', 'group of digits between commas'], ['Successor', 'the next number']],
      traps: ['Zeros as place holders: 40,050.', 'Comma places differ from the international system (123,456).', 'Rounding 44,999 to the nearest ten thousand is 40,000.'],
      bridge: '<p>Ch 4 adds and subtracts these numbers.</p>'
    },
    explore: [
      { title: 'Place-value chart to a lakh', intro: 'Set the digits.',
        build(el, K) { let d = [4, 5, 6, 7, 8]; const row = K.row(el); ['ten thousands', 'thousands', 'hundreds', 'tens', 'ones'].forEach((nm, i) => K.slider(row, nm, 0, 9, 1, d[i], v => { d[i] = v; draw(); })); const rd = K.read(el); const P = [10000, 1000, 100, 10, 1];
          function draw() { const n = d.reduce((s, x, i) => s + x * P[i], 0); rd.innerHTML = `<table style="border-collapse:collapse;font-size:18px;text-align:center"><tr>${['TTh', 'Th', 'H', 'T', 'O'].map(h => `<th style="border:1px solid var(--rule,#cbd5e1);padding:4px 14px">${h}</th>`).join('')}</tr><tr>${d.map(x => `<td style="border:1px solid var(--rule,#cbd5e1);padding:4px 14px"><b>${x}</b></td>`).join('')}</tr></table><b>${IN(n)}</b> = ${d.map((x, i) => x * P[i]).filter(Boolean).map(IN).join(' + ') || 0}${n === 99999 ? ' · next is 1,00,000 = one lakh' : ''}`; } draw(); return null; } },
      { title: 'Journey distances', intro: 'Choose a trip; the distance is rounded on a number line.',
        build(el, K) { const T = [['Delhi to Chennai by rail (round trip, m ÷ 100)', 43810], ['Pilgrims at a fair in a day', 68450], ['Seats in a cricket stadium', 33500], ['Steps walked in a week', 71249], ['Visitors to the Taj Mahal in a week', 54620]]; let k = 1; const row = K.row(el); K.select(row, 'number', T.map(t => t[0]), i => { k = i; b.redraw(); }); const s0 = row.querySelector('select'); if (s0) s0.value = 1;
          const b = new K.Board(el, { xmin: -0.5, xmax: 10.5, ymin: -1.2, ymax: 1.4, axes: false, grid: 0, aspect: 0.22 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const n = T[k][1]; b.line(0, 0, 10, 0, { color: C.ink, w: 2 }); for (let i = 0; i <= 10; i++) { b.line(i, -0.15, i, 0.15, { color: C.ink, w: 2 }); b.text(i, -0.55, IN(i * 10000), { font: '10px' }); } b.dot(n / 10000, 0, { r: 8 }); b.text(n / 10000, 0.7, IN(n), { font: 'bold 13px' });
            rd.innerHTML = `${T[k][0]}: <b>${IN(n)}</b> · nearest thousand ${IN(Math.round(n / 1000) * 1000)} · nearest ten thousand ${IN(Math.round(n / 10000) * 10000)}`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Place value', gen(R) { const n = R.int(10000, 99999), p = R.int(0, 4); const v = Number(String(n)[p]) * [10000, 1000, 100, 10, 1][p]; return { q: `Value of the digit ${String(n)[p]} (in the ${['ten thousands', 'thousands', 'hundreds', 'tens', 'ones'][p]} place) in ${IN(n)}?`, a: IN(v), ans: v }; } },
      { title: 'Indian commas', gen(R) { const n = R.int(10000, 99999); return { q: `Write ${n} with Indian commas.`, a: IN(n) }; } },
      { title: 'Compare', gen(R) { const a = R.int(10000, 99999), b = R.chance(.5) ? a + R.pick([-1000, 1000, -100, 100, -10, 10]) : R.int(10000, 99999); return { q: `${IN(a)} __ ${IN(b)}`, a: a > b ? '>' : a < b ? '<' : '=' }; } },
      { title: 'Round', levels: [2, 3], gen(R) { const n = R.int(10001, 94999), t = R.pick([['hundred', 100], ['thousand', 1000], ['ten thousand', 10000]]); const r = Math.round(n / t[1]) * t[1]; return { q: `Round ${IN(n)} to the nearest ${t[0]}.`, a: IN(r), ans: r }; } },
      { title: 'Biggest and smallest', levels: [3], gen(R) { const s = new Set(); while (s.size < 5) s.add(R.int(0, 9)); const d = [...s]; const big = [...d].sort((a, b) => b - a).join(''), sm0 = [...d].sort((a, b) => a - b); if (sm0[0] === 0) { sm0[0] = sm0[1]; sm0[1] = 0; } return { q: `Using the digits ${d.join(', ')} once each, write the biggest and smallest 5-digit numbers.`, a: `${IN(Number(big))} and ${IN(Number(sm0.join('')))}` }; } }
    ],
    quiz: [
      { q: '1 lakh =', o: ['1,00,000', '10,000', '10,00,000', '1,000'], a: 0, e: '100 thousands.' }, { q: 'Value of 5 in 45,678', o: ['5,000', '500', '50,000', '5'], a: 0, e: 'Thousands.' },
      { q: '38,905 vs 39,050', o: ['<', '>', '=', 'cannot tell'], a: 0, e: 'Thousands 8 < 9.' }, { q: 'Next after 99,999', o: ['1,00,000', '1,000,00', '99,9910', '10,000'], a: 0, e: 'One lakh.' },
      { q: '45,678 to nearest thousand', o: ['46,000', '45,000', '50,000', '45,700'], a: 0, e: '678 ≥ 500.' }, { q: 'Forty thousand fifty', o: ['40,050', '40,500', '4,050', '45,000'], a: 0, e: 'Place holders.' },
      { q: 'Indian commas for 123456', o: ['1,23,456', '123,456', '12,34,56', '1,234,56'], a: 0, e: '3 then 2s.' }, { q: 'Smallest 5-digit number', o: ['10,000', '99,999', '1,000', '11,111'], a: 0, e: 'Ten thousand.' },
      { q: '10 ten thousands =', o: ['1 lakh', '1 thousand', '10 lakh', '1 crore'], a: 0, e: 'Regroup.' }, { q: '64,999 to nearest ten thousand', o: ['60,000', '70,000', '65,000', '64,000'], a: 0, e: '4 < 5.' },
      { q: 'Largest: 56,789, 56,879, 56,798, 56,897', o: ['56,897', '56,879', '56,798', '56,789'], a: 0, e: 'Hundreds then tens.' }
    ],
    teach: {
      outcomes: ['Read and write numbers to a lakh', 'Use Indian commas', 'Compare, order and round'],
      periods: [{ t: 'Place value', flow: [['10 min', 'Travel numbers from tickets and signboards.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Number names.']] }, { t: 'Compare and round', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Order distances.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Comma places.', 'Missing zeros.'], activities: ['Make biggest/smallest with digit cards.', 'Railway distance chart.'],
      exit: ['Write 70,405 in words.', 'Round 38,621 to nearest thousand.', 'Compare 90,909 and 90,990.'], homework: 'Collect 5 big numbers from a newspaper (crowds, distances, prices), write them with commas and in words.'
    },
    slides: [{ t: 'We the Travellers - I', b: ['Ten thousands and a lakh', 'Indian commas', 'Compare and order', 'Rounding'] }, { t: 'Check yourself', b: ['Value of 7 in 72,315?', 'Round 54,500 to nearest thousand?'] }],
    fs: { groups: [['Place value', [['10 000', 'ten thousand'], ['1,00,000', 'one lakh'], ['45,678', '40,000 + 5,000 + 600 + 70 + 8']]], ['Compare / round', [['From the left', 'first different digit'], ['≥ 5', 'round up']]]],
      ex: [['Indian commas', '1,23,456'], ['45,678 → thousand', '46,000']], rem: ['Zeros hold places.', 'Commas: 3 digits, then 2s.', 'Look one place right to round.'] }
  });
})();
