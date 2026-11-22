/*
TOOL:    class2_maths_ch10
FAMILY:  CBSE_REVISION / Class 2 Maths (Joyful Mathematics)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 10 Fun at the Fair (money) - revise, 2 explore panels (make an amount with notes and coins, fair stall shopping), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const DEN = [100, 50, 20, 10, 5, 2, 1];
  const split = (n) => { const u = []; DEN.forEach(d => { while (n >= d) { u.push(d); n -= d; } }); return u; };
  G9.register({
    no: 10, part: 'All chapters', short: 'Money', title: 'Fun at the Fair',
    blurb: 'Coins and notes up to ₹100, making amounts, adding prices, finding change at a fair.',
    revise: {
      oneLine: 'Notes ₹10, ₹20, ₹50, ₹100 and coins ₹1, ₹2, ₹5, ₹10 make any amount. Add prices to find the total; change = money given − total.',
      sections: [
        { h: 'Notes and coins', html: `<p>Coins ₹1, ₹2, ₹5, ₹10, ₹20; notes ₹10, ₹20, ₹50, ₹100.</p>` },
        { h: 'Making amounts', html: `<p>₹75 = ₹50 + ₹20 + ₹5. Use the largest notes first for the fewest pieces.</p>` },
        { h: 'At the fair', html: `<p>Balloon ₹15 + candy floss ₹20 = ₹35. Pay ₹50, change ₹15.</p>` }
      ],
      formulas: [['Total', 'add prices'], ['Change', 'paid − total'], ['₹100', '2 × ₹50 = 5 × ₹20 = 10 × ₹10'], ['Fewest pieces', 'largest first']],
      terms: [['Price', 'cost of an item'], ['Change', 'money returned'], ['Rupee ₹', 'Indian money']],
      traps: ['Counting pieces instead of values.', 'Forgetting to add every item.', 'Change must be less than the money paid.'],
      bridge: '<p>Uses adding and subtracting from Ch 6.</p>'
    },
    explore: [
      { title: 'Make an amount', intro: 'Choose an amount; the fewest notes and coins are shown.',
        build(el, K) { let n = 75; const row = K.row(el); K.slider(row, 'amount ₹', 1, 100, 1, n, v => { n = v; draw(); }); const rd = K.read(el);
          function draw() { const u = split(n); rd.innerHTML = `<div style="font-size:16px">${u.map(v => `<span style="display:inline-block;margin:2px;padding:${v >= 10 ? '8px 12px' : '8px'};border-radius:${v >= 10 ? '4px' : '50%'};background:${v >= 10 ? 'var(--blueL,#dbeafe)' : '#fde68a'};border:2px solid ${v >= 10 ? 'var(--blue,#1d4ed8)' : '#a16207'};font-weight:bold">₹${v}</span>`).join('')}</div>₹${n} = ${u.map(v => '₹' + v).join(' + ')} (${u.length} pieces)`; }
          draw(); return null; } },
      { title: 'Fair stalls', intro: 'Tick what you buy. You have ₹100.',
        build(el, K) { const items = [['🎈 balloon', 15], ['🍭 candy floss', 20], ['🎡 giant wheel ride', 30], ['🍦 ice cream', 25], ['🪀 yo-yo', 12], ['🥤 juice', 18]]; const pick = new Set([0, 3]); const box = document.createElement('div'); el.appendChild(box); const rd = K.read(el);
          function draw() { box.innerHTML = items.map(([n, p], i) => `<label style="display:inline-block;margin:4px 10px;font-size:17px"><input type="checkbox" data-i="${i}" ${pick.has(i) ? 'checked' : ''}> ${n} ₹${p}</label>`).join(''); box.querySelectorAll('input').forEach(c => c.onchange = () => { c.checked ? pick.add(+c.dataset.i) : pick.delete(+c.dataset.i); draw(); });
            const t = [...pick].reduce((s, i) => s + items[i][1], 0); rd.innerHTML = `total = <b>₹${t}</b> · ${t <= 100 ? `change from ₹100 = ₹${100 - t}` : `₹${t - 100} short`}`; }
          draw(); return null; } }
    ],
    gens: [
      { title: 'Count money', gen(R) { const u = Array.from({ length: R.int(2, 5) }, () => R.pick(DEN.slice(1))); const t = u.reduce((a, b) => a + b, 0); if (t > 100) return this.gen(R); return { q: `How much? ${u.map(v => '₹' + v).join(', ')}`, a: `₹${t}`, ans: t }; } },
      { title: 'Total cost', gen(R) { const a = R.int(5, 45), b = R.int(5, 45); return { q: `A toy costs ₹${a} and a book ₹${b}. Total?`, a: `₹${a + b}`, ans: a + b }; } },
      { title: 'Change', gen(R) { const p = R.int(5, 95), g = p <= 50 ? 50 : 100; return { q: `Pay ₹${g} for something costing ₹${p}. Change?`, a: `₹${g - p}`, ans: g - p }; } },
      { title: 'Fewest notes', levels: [2, 3], gen(R) { const n = R.int(11, 100); const u = split(n); return { q: `Make ₹${n} with the fewest notes and coins.`, a: u.map(v => '₹' + v).join(' + '), ans: u.length }; } },
      { title: 'Enough?', levels: [1, 2], gen(R) { const h = R.int(10, 100), p = R.int(10, 100); return { q: `I have ₹${h}. A ride costs ₹${p}. Can I go?`, a: h >= p ? `yes, ₹${h - p} left` : `no, need ₹${p - h} more` }; } }
    ],
    quiz: [
      { q: '₹50 + ₹20 + ₹5 =', o: ['₹75', '₹70', '₹57', '₹25'], a: 0, e: 'Add.' }, { q: 'Change from ₹50 for ₹35', o: ['₹15', '₹85', '₹25', '₹35'], a: 0, e: '50 − 35.' },
      { q: '₹100 = how many ₹20 notes?', o: ['5', '2', '10', '20'], a: 0, e: '20 × 5.' }, { q: 'Balloon ₹15 + ice cream ₹25', o: ['₹40', '₹30', '₹10', '₹1525'], a: 0, e: 'Add.' },
      { q: 'Fewest pieces for ₹60', o: ['₹50 + ₹10', '₹20 + ₹20 + ₹20', 'six ₹10', '₹5 × 12'], a: 0, e: 'Largest first.' }, { q: 'Which note is worth most?', o: ['₹100', '₹50', '₹20', '₹10'], a: 0, e: 'Read it.' },
      { q: '₹10 + ₹10 + ₹10 + ₹5', o: ['₹35', '₹30', '₹40', '₹25'], a: 0, e: 'Add.' }, { q: 'I have ₹40, ride ₹45. Can I?', o: ['no', 'yes', 'with change', 'half ride'], a: 0, e: 'Short by ₹5.' },
      { q: '₹2 coins in ₹10', o: ['5', '2', '10', '8'], a: 0, e: '2 × 5.' }, { q: 'Change = ', o: ['paid − total', 'total − paid', 'paid + total', 'total'], a: 0, e: 'Definition.' },
      { q: '₹50 = ₹20 + ₹20 + ?', o: ['₹10', '₹5', '₹20', '₹50'], a: 0, e: '50 − 40.' }
    ],
    teach: {
      outcomes: ['Recognise notes and coins to ₹100', 'Make amounts', 'Find totals and change'],
      periods: [{ t: 'Money', flow: [['10 min', 'Fair story; show notes.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Make amounts with toy money.']] }, { t: 'Shopping', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Class fair role-play.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Count pieces not values.'], activities: ['Class fair with stalls.', 'Price tag matching.'],
      exit: ['Make ₹45.', 'Total of ₹18 and ₹27.', 'Change from ₹100 for ₹64.'], homework: 'With a grown-up, list 3 things you could buy at a fair with ₹100 and find the change.'
    },
    slides: [{ t: 'Fun at the Fair', b: ['Notes and coins', 'Making amounts', 'Total and change'] }, { t: 'Check yourself', b: ['₹50 + ₹20 + ₹2?', 'Change from ₹50 for ₹28?'] }],
    fs: { groups: [['Money', [['Coins', '₹1, ₹2, ₹5, ₹10, ₹20'], ['Notes', '₹10, ₹20, ₹50, ₹100']]], ['Shopping', [['Total', 'add prices'], ['Change', 'paid − total'], ['Fewest pieces', 'biggest first']]]],
      ex: [['₹85', '₹50 + ₹20 + ₹10 + ₹5'], ['Pay ₹100 for ₹67', '₹33 change']], rem: ['Add all prices.', 'Check change.', 'Biggest notes first.'] }
  });
})();
