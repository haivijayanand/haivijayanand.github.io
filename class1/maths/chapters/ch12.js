/*
TOOL:    class1_maths_ch12
FAMILY:  CBSE_REVISION / Class 1 Maths (Joyful Mathematics)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 12 How Much Can We Spend? (money) - revise, 2 explore panels (pay with coins, shop), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const coinH = (v) => `<span style="display:inline-block;min-width:38px;height:38px;line-height:38px;border-radius:${v >= 10 && v !== 10 ? '6px' : '50%'};background:${v >= 20 ? 'var(--blueL,#dbeafe)' : '#fde68a'};border:2px solid ${v >= 20 ? 'var(--blue,#1d4ed8)' : '#a16207'};text-align:center;font:bold 14px sans-serif;margin:2px;padding:0 4px">₹${v}</span>`;

  G9.register({
    no: 12, part: 'All chapters', short: 'Money', title: 'How Much Can We Spend?',
    blurb: 'Indian coins and notes (₹1, ₹2, ₹5, ₹10, ₹20), making amounts in different ways, buying things and checking if we have enough.',
    revise: {
      oneLine: 'Money is counted in rupees (₹). Coins ₹1, ₹2, ₹5, ₹10 and notes ₹10, ₹20 can be combined to make an amount in many ways. To buy something we need at least its price.',
      sections: [
        { h: 'Coins and notes', html: `<p>Coins: ₹1, ₹2, ₹5, ₹10. Notes: ₹10, ₹20 (and more). The number printed on it tells its value, not its size.</p>` },
        { h: 'Making amounts', html: `<p>₹10 = ₹5 + ₹5 = ₹2 + ₹2 + ₹2 + ₹2 + ₹2 = ten ₹1 coins. Count the biggest coin first.</p>` },
        { h: 'Buying', html: `<p>A pencil costs ₹5 and an eraser ₹3: together ₹8. With ₹10 we get ₹2 back. If we have less than the price, we cannot buy it.</p>` }
      ],
      formulas: [['Rupee sign', '₹'], ['Coins', '₹1, ₹2, ₹5, ₹10'], ['Notes', '₹10, ₹20'], ['Total cost', 'add the prices'], ['Change', 'money given − price']],
      terms: [['Price', 'how much a thing costs'], ['Change', 'money given back'], ['Enough', 'at least the price'], ['Rupee', 'Indian money, ₹']],
      traps: ['A bigger coin is not always worth more.', 'Counting coins instead of their values.', 'Forgetting to add all prices.'],
      bridge: '<p>Class 2 and 3 use money for adding and subtracting larger amounts.</p>'
    },

    explore: [
      {
        title: 'Pay with coins', intro: 'Choose an amount. Press <kbd>S</kbd> to see another way of making it.',
        build(el, K) {
          let n = 10, w = 0; const row = K.row(el); K.slider(row, 'amount ₹', 1, 30, 1, n, v => { n = v; w = 0; draw(); }); const rd = K.read(el);
          const sets = [[20, 10, 5, 2, 1], [10, 5, 2, 1], [5, 2, 1], [2, 1], [1]];
          function draw() { const s = sets[w % sets.length]; let m = n; const used = []; s.forEach(c => { while (m >= c) { used.push(c); m -= c; } });
            rd.innerHTML = `<div>${used.map(coinH).join('')}</div>₹${n} = ${used.map(c => '₹' + c).join(' + ')} (${used.length} coin${used.length > 1 ? 's' : ''}/notes, using ${s.map(c => '₹' + c).join(', ')})`; }
          const step = () => { w++; draw(); }; K.button(row, 'Another way (S)', step); draw(); return { step, play() {}, pause() {} };
        }
      },
      {
        title: 'Little shop', intro: 'Tick what you want to buy. You have ₹20. Is it enough, and how much change?',
        build(el, K) {
          const items = [['✏️ pencil', 5], ['🧽 eraser', 3], ['📒 notebook', 12], ['🍬 toffee', 1], ['🎈 balloon', 2], ['🧃 juice', 10]]; const pick = new Set([0, 1]);
          const box = document.createElement('div'); el.appendChild(box); const rd = K.read(el);
          function draw() { box.innerHTML = items.map(([n, p], i) => `<label style="display:inline-block;margin:4px 10px;font-size:18px"><input type="checkbox" data-i="${i}" ${pick.has(i) ? 'checked' : ''}> ${n} ₹${p}</label>`).join('');
            box.querySelectorAll('input').forEach(c => c.onchange = () => { c.checked ? pick.add(+c.dataset.i) : pick.delete(+c.dataset.i); draw(); });
            const t = [...pick].reduce((s, i) => s + items[i][1], 0); rd.innerHTML = `total ${[...pick].map(i => '₹' + items[i][1]).join(' + ') || '₹0'} = <b>₹${t}</b> · ${t <= 20 ? `enough! change from ₹20 = ₹${20 - t}` : `not enough: need ₹${t - 20} more`}`; }
          draw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Count the money', gen(R) {
          const cs = Array.from({ length: R.int(2, 5) }, () => R.pick([1, 2, 5, 10])); return { q: `How much money? ${cs.map(c => '₹' + c).join(', ')}`, a: `₹${cs.reduce((a, b) => a + b, 0)}`, ans: cs.reduce((a, b) => a + b, 0) };
        } },
      { title: 'Make an amount', levels: [2, 3], gen(R) {
          const n = R.pick([6, 7, 8, 9, 10, 12, 15]); return { q: `Show ₹${n} using ₹5, ₹2 and ₹1 coins (one way).`, a: (() => { let m = n; const u = []; [5, 2, 1].forEach(c => { while (m >= c) { u.push(c); m -= c; } }); return u.map(c => '₹' + c).join(' + '); })() };
        } },
      { title: 'Total cost', gen(R) {
          const a = R.int(1, 9), b = R.int(1, 9); return { q: `A toy costs ₹${a} and a ball costs ₹${b}. How much for both?`, a: `₹${a + b}`, ans: a + b };
        } },
      { title: 'Change', levels: [2, 3], gen(R) {
          const p = R.int(1, 19), g = p < 10 ? 10 : 20; return { q: `I buy a book for ₹${p} and pay with a ₹${g} note. How much change?`, a: `₹${g - p}`, ans: g - p };
        } },
      { title: 'Enough money?', levels: [1, 2], gen(R) {
          const have = R.int(3, 20), price = R.int(3, 20); return { q: `I have ₹${have}. A pen costs ₹${price}. Can I buy it?`, a: have >= price ? `yes${have > price ? ` (₹${have - price} left)` : ''}` : `no (need ₹${price - have} more)` };
        } }
    ],

    quiz: [
      { q: '₹5 + ₹5 =', o: ['₹10', '₹55', '₹5', '₹15'], a: 0, e: 'Add values.' },
      { q: 'Which is worth more?', o: ['₹10', '₹2', '₹1', '₹5'], a: 0, e: 'Read the number.' },
      { q: '₹2 + ₹2 + ₹1 =', o: ['₹5', '₹4', '₹3', '₹221'], a: 0, e: 'Add.' },
      { q: 'Pencil ₹4, eraser ₹3: total', o: ['₹7', '₹1', '₹43', '₹12'], a: 0, e: 'Add prices.' },
      { q: 'Pay ₹10 for ₹6: change', o: ['₹4', '₹16', '₹6', '₹10'], a: 0, e: '10 − 6.' },
      { q: 'I have ₹8. Can I buy a ₹12 book?', o: ['no', 'yes', 'yes with change', 'only half'], a: 0, e: 'Not enough.' },
      { q: 'How many ₹2 coins make ₹10?', o: ['5', '2', '10', '8'], a: 0, e: '2, 4, 6, 8, 10.' },
      { q: 'The sign for rupee', o: ['₹', '$', '%', '+'], a: 0, e: 'Indian rupee.' },
      { q: '₹20 = ₹10 + ?', o: ['₹10', '₹5', '₹20', '₹2'], a: 0, e: 'Two tens.' },
      { q: 'Coins we use: ₹1, ₹2, ₹5 and', o: ['₹10', '₹3', '₹7', '₹4'], a: 0, e: 'Coins.' },
      { q: '₹5 + ₹2 + ₹2 =', o: ['₹9', '₹7', '₹10', '₹522'], a: 0, e: 'Add.' }
    ],

    teach: {
      outcomes: ['Recognise coins and notes', 'Make amounts in different ways', 'Find the total cost', 'Find change and check if money is enough'],
      periods: [
        { t: 'Coins and notes', flow: [['10 min', 'Show real or toy coins.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Make ₹10 in many ways.']] },
        { t: 'Class shop', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Role-play shop with price tags.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Size = value.', 'Counting coins not values.'],
      activities: ['Classroom shop with toy money.', 'Coin rubbing art.'],
      exit: ['Make ₹7 with coins.', 'Total of ₹5 and ₹4.', 'Change from ₹10 for ₹8.'],
      homework: 'With a grown-up, look at the price of 3 things at a shop. Which can you buy with ₹20?'
    },

    slides: [
      { t: 'How Much Can We Spend?', b: ['Coins and notes', 'Making amounts', 'Buying and change'] },
      { t: 'Money', b: ['₹1, ₹2, ₹5, ₹10 coins', '₹10, ₹20 notes', 'Total = add prices'] },
      { t: 'Check yourself', b: ['₹5 + ₹2 + ₹1?', 'Change from ₹20 for ₹15?'] }
    ],

    fs: { groups: [
        ['Coins and notes', [['Coins', '₹1, ₹2, ₹5, ₹10'], ['Notes', '₹10, ₹20'], ['Value', 'read the number']]],
        ['Making ₹10', [['₹5 + ₹5', '2 coins'], ['₹2 × 5', '5 coins'], ['₹5 + ₹2 + ₹2 + ₹1', '4 coins']]],
        ['Shopping', [['Total', 'add the prices'], ['Change', 'paid − price'], ['Enough?', 'money ≥ price']]]],
      ex: [['₹10, ₹5, ₹2', '₹17'], ['Pay ₹20 for ₹13', 'change ₹7']],
      rem: ['Count the biggest coins first.', 'Add all the prices.', 'Check your change.'] }
  });
})();
