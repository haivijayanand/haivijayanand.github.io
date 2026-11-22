/*
TOOL:    class7_maths_ch01
FAMILY:  CBSE_REVISION / Class 7 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 1 Large Numbers Around Us (lakhs and crores, Indian and international place values, estimating, powers of 10) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const IN = n => n.toLocaleString('en-IN'), US = n => n.toLocaleString('en-US');
  const nm = n => { const cr = Math.floor(n / 1e7), lk = Math.floor(n % 1e7 / 1e5), th = Math.floor(n % 1e5 / 1e3), rest = n % 1000; return [cr && cr + ' crore', lk && lk + ' lakh', th && th + ' thousand', rest && rest].filter(Boolean).join(' ') || '0'; };
  G9.register({
    no: 1, part: 'Part I', short: 'Large numbers', title: 'Large Numbers Around Us',
    blurb: 'Lakhs and crores, Indian and international place-value systems, reading and writing large numbers, comparing, estimating with large numbers and powers of 10.',
    revise: {
      oneLine: '1 lakh = 1,00,000 = 10⁵ and 1 crore = 1,00,00,000 = 10⁷. Indian commas: 3 digits, then 2s (2,35,48,000); international commas: every 3 digits (23,548,000 = 23 million 548 thousand). 1 million = 10 lakh; 1 billion = 100 crore.',
      sections: [
        { h: 'Place value', html: `<p>Indian: ones, tens, hundreds, thousands, ten thousands, lakhs, ten lakhs, crores, ten crores. 1 lakh = 100 thousand; 1 crore = 100 lakh.</p>` },
        { h: 'Comparing systems', html: `<p>1 million = 10,00,000 (10 lakh); 1 billion = 100 crore.</p>` },
        { h: 'Estimating', html: `<p>How many days in 1 lakh seconds? 1,00,000 ÷ 86,400 ≈ 1.2 days. A crore steps ≈ 7,000 km.</p>` }
      ],
      formulas: [['1 lakh', '10⁵ = 100 thousand'], ['1 crore', '10⁷ = 100 lakh'], ['1 million', '10 lakh'], ['1 billion', '100 crore']],
      terms: [['Period', 'group of digits between commas'], ['Lakh, crore', 'Indian names'], ['Million, billion', 'international names']],
      traps: ['Comma positions differ between systems.', '1 million is not 1 crore.', 'Zeros as place holders.'],
      bridge: '<p>Class 8 writes these with exponents (Power Play).</p>'
    },
    explore: [
      { title: 'Two comma systems', intro: 'Build a number by its digits in crores, lakhs, thousands and the rest.',
        build(el, K) { let cr = 2, lk = 35, th = 48, r = 0; const row = K.row(el); K.slider(row, 'crores', 0, 99, 1, cr, v => { cr = v; draw(); }); K.slider(row, 'lakhs', 0, 99, 1, lk, v => { lk = v; draw(); }); K.slider(row, 'thousands', 0, 99, 1, th, v => { th = v; draw(); }); K.slider(row, 'rest', 0, 999, 1, r, v => { r = v; draw(); }); const rd = K.read(el);
          function draw() { const n = cr * 1e7 + lk * 1e5 + th * 1e3 + r; const mil = Math.floor(n / 1e6), bl = Math.floor(n / 1e9); rd.innerHTML = `<div style="font-size:22px">Indian: <b>${IN(n)}</b> &nbsp;·&nbsp; International: <b>${US(n)}</b></div>${nm(n)} · ≈ ${bl ? (n / 1e9).toFixed(2) + ' billion' : (n / 1e6).toFixed(2) + ' million'} · ${n.toString().length} digits`; } draw(); return null; } },
      { title: 'How big is a crore?', intro: 'Choose a quantity counted one per second, step or rupee.',
        build(el, K) { let k = 0, N = 1e7; const row = K.row(el); K.select(row, 'count to', ['1 lakh', '10 lakh (1 million)', '1 crore', '100 crore (1 billion)'], i => { N = [1e5, 1e6, 1e7, 1e9][i]; draw(); }); const s0 = row.querySelector('select'); if (s0) s0.value = 2; K.select(row, 'as', ['seconds', 'steps (≈ 0.7 m each)', '₹1 coins stacked (≈ 1.5 mm each)'], i => { k = i; draw(); }); const rd = K.read(el);
          function draw() { let t; if (k === 0) { const d = N / 86400; t = d < 365 ? `${d.toFixed(1)} days` : `${(d / 365).toFixed(1)} years`; } else if (k === 1) t = `${IN(Math.round(N * 0.7 / 1000))} km`; else t = `${IN(Math.round(N * 1.5 / 1e6))} km tall`; rd.innerHTML = `${IN(N)} ${['seconds', 'steps', 'coins'][k]} ≈ <b>${t}</b>`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Indian commas', gen(R) { const n = R.int(1e6, 99e7); return { q: `Write ${n} with Indian commas.`, a: IN(n) }; } },
      { title: 'International commas', gen(R) { const n = R.int(1e6, 99e7); return { q: `Write ${n} with international commas.`, a: US(n) }; } },
      { title: 'Convert systems', gen(R) { const t = R.pick([['1 million', '10 lakh'], ['10 million', '1 crore'], ['1 billion', '100 crore'], ['50 lakh', '5 million'], ['25 crore', '250 million']]); return { q: `${t[0]} = ? (in the other system)`, a: t[1] }; } },
      { title: 'Place value', levels: [2, 3], gen(R) { const n = R.int(1e7, 99e7); const s = String(n), i = R.int(0, s.length - 2); const v = Number(s[i]) * 10 ** (s.length - 1 - i); return { q: `Place value of the digit ${s[i]} at position ${i + 1} from the left in ${IN(n)}?`, a: IN(v), ans: v }; } },
      { title: 'Estimate', levels: [2, 3], gen(R) { const p = R.int(2, 9) * 1e5, c = R.int(20, 80); return { q: `A stadium seats about ${IN(c * 1000)}. About how many full matches for ${IN(p)} people to each attend once?`, a: `about ${Math.round(p / (c * 1000))}`, ans: Math.round(p / (c * 1000)), tol: 1 }; } }
    ],
    quiz: [
      { q: '1 crore =', o: ['100 lakh', '10 lakh', '1000 lakh', '10 million'], a: 0, e: '10⁷.' }, { q: '1 million =', o: ['10 lakh', '1 lakh', '1 crore', '100 lakh'], a: 0, e: '10⁶.' },
      { q: '23548000 in Indian', o: ['2,35,48,000', '23,548,000', '235,48,000', '2,354,8000'], a: 0, e: '3 then 2s.' }, { q: '1 billion =', o: ['100 crore', '10 crore', '1000 crore', '1 crore'], a: 0, e: '10⁹.' },
      { q: '10⁵ =', o: ['1 lakh', '10 thousand', '1 million', '1 crore'], a: 0, e: '1,00,000.' }, { q: 'Digits in 1 crore', o: ['8', '7', '9', '10'], a: 0, e: '1 + 7 zeros.' },
      { q: '1 lakh seconds ≈', o: ['about 1 day', 'about 1 hour', 'about 1 year', 'about 1 week'], a: 0, e: '86,400 s per day.' }, { q: 'International commas for 4,50,00,000', o: ['45,000,000', '4,500,0000', '450,00,000', '45,00,00,000'], a: 0, e: '45 million.' },
      { q: '50 lakh =', o: ['5 million', '50 million', '0.5 million', '5 crore'], a: 0, e: '10 lakh = 1 M.' }, { q: 'Bigger: 9,99,999 or 10,00,000', o: ['10,00,000', '9,99,999', 'equal', 'cannot tell'], a: 0, e: 'More digits.' },
      { q: 'Ten lakh is', o: ['1 million', '1 crore', '1 billion', '100 thousand'], a: 0, e: '10,00,000.' }
    ],
    teach: {
      outcomes: ['Read and write large numbers in both systems', 'Convert between systems', 'Estimate with large numbers'],
      periods: [{ t: 'Place value', flow: [['10 min', 'Population and budget headlines.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Conversions.']] }, { t: 'Estimating', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Fermi questions.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Million = crore.', 'Comma confusion.'], activities: ['Newspaper number hunt.', 'Estimate grains in a kilo of rice.'],
      exit: ['Write 7,08,40,050 in words.', '3 billion in crores.', 'Estimate a crore seconds in years.'], homework: 'Find the populations of 5 Indian states; write them in both systems and order them.'
    },
    slides: [{ t: 'Large Numbers Around Us', b: ['Lakhs and crores', 'Millions and billions', 'Converting', 'Estimating'] }, { t: 'Check yourself', b: ['25 million in crores?', 'Indian commas for 607080900?'] }],
    fs: { groups: [['Indian', [['1 lakh', '1,00,000 = 10⁵'], ['1 crore', '1,00,00,000 = 10⁷'], ['Commas', '3, then 2s']]], ['International', [['1 million', '1,000,000 = 10⁶'], ['1 billion', '10⁹'], ['Commas', 'every 3']]], ['Links', [['1 million', '10 lakh'], ['10 million', '1 crore'], ['1 billion', '100 crore']]]],
      ex: [['23548000', '2,35,48,000 / 23,548,000'], ['50 lakh', '5 million']], rem: ['Count digits carefully.', 'Name the system you use.', 'Estimate before you calculate.'] }
  });
})();
