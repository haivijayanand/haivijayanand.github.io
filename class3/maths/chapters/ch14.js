/*
TOOL:    class3_maths_ch14
FAMILY:  CBSE_REVISION / Class 3 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 14 The Surajkund Fair (money, patterns, data) - revise, 2 explore panels (fair stalls bill, pattern border), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const ITEMS = [['🏺 clay pot', 85], ['🧣 shawl', 350], ['🪔 diya set', 60], ['👜 jute bag', 120], ['🪀 wooden toy', 45], ['🍬 sweets', 75]];
  G9.register({
    no: 14, part: 'All chapters', short: 'At the fair', title: 'The Surajkund Fair',
    blurb: 'Money at a crafts fair (bills, change, rupees and paise), patterns in handicrafts and simple data from fair visitors.',
    revise: {
      oneLine: 'At the Surajkund crafts fair we add prices to make a bill, find change, spot repeating patterns in pots and shawls, and count visitors to read a pictograph.',
      sections: [
        { h: 'Money', html: `<p>₹1 = 100 paise. Bill = sum of prices. Change = money paid − bill. ₹350 + ₹85 = ₹435.</p>` },
        { h: 'Patterns', html: `<p>Borders repeat a unit: ▲●▲●… or grow: 2, 4, 6, 8…</p>` },
        { h: 'Data', html: `<p>Visitors per day as a pictograph with a key (👤 = 10 visitors).</p>` }
      ],
      formulas: [['₹1', '100 paise'], ['Bill', 'add prices'], ['Change', 'paid − bill'], ['Key', 'one picture = many']],
      terms: [['Bill', 'list of items and total'], ['Paise', 'parts of a rupee'], ['Pattern', 'repeats by a rule']],
      traps: ['Change cannot be more than paid.', 'Forget the key in a pictograph.', 'Adding prices without lining up.'],
      bridge: '<p>Uses addition (Ch 9), patterns and data from earlier chapters.</p>'
    },
    explore: [
      { title: 'Fair bill', intro: 'Tick items to buy and choose the note you pay with.',
        build(el, K) { const pick = new Set([0, 2]); let note = 500; const row = K.row(el); K.select(row, 'pay with', ['₹500', '₹1000', '₹200'], i => { note = [500, 1000, 200][i]; draw(); }); const box = document.createElement('div'); el.appendChild(box); const rd = K.read(el);
          function draw() { box.innerHTML = ITEMS.map(([n, p], i) => `<label style="display:inline-block;margin:4px 10px;font-size:17px"><input type="checkbox" data-i="${i}" ${pick.has(i) ? 'checked' : ''}> ${n} ₹${p}</label>`).join(''); box.querySelectorAll('input').forEach(c => c.onchange = () => { c.checked ? pick.add(+c.dataset.i) : pick.delete(+c.dataset.i); draw(); });
            const t = [...pick].reduce((s, i) => s + ITEMS[i][1], 0); rd.innerHTML = `bill: ${[...pick].map(i => '₹' + ITEMS[i][1]).join(' + ') || '₹0'} = <b>₹${t}</b> · ${t <= note ? `change from ₹${note}: <b>₹${note - t}</b>` : `₹${t - note} more needed`}`; } draw(); return null; } },
      { title: 'Pattern border', intro: 'Choose a unit; press <kbd>S</kbd> to extend the border.',
        build(el, K) { const U = [['▲●', 'AB'], ['▲▲●', 'AAB'], ['🔷🔶🔶', 'ABB'], ['◆◇○', 'ABC']]; let k = 0; const row = K.row(el); K.select(row, 'unit', U.map(u => u[0] + ' (' + u[1] + ')'), i => { k = i; an.reset(); }); const rd = K.read(el); const an = new K.Anim(20, () => draw(), { ms: 300 });
          function draw() { const c = [...U[k][0]]; const s = Array.from({ length: an.i + 3 }, (_, i) => c[i % c.length]).join(''); rd.innerHTML = `<div style="font-size:30px;letter-spacing:4px">${s}</div>next: <b>${c[(an.i + 3) % c.length]}</b>`; } K.anim(el, an); draw(); return an; } }
    ],
    gens: [
      { title: 'Make a bill', gen(R) { const a = R.pick(ITEMS), b = R.pick(ITEMS); return { q: `Bill for a ${a[0].split(' ').slice(1).join(' ')} (₹${a[1]}) and a ${b[0].split(' ').slice(1).join(' ')} (₹${b[1]})?`, a: `₹${a[1] + b[1]}`, ans: a[1] + b[1] }; } },
      { title: 'Change', gen(R) { const p = R.int(50, 450), g = p <= 200 ? 200 : 500; return { q: `Pay ₹${g} for a bill of ₹${p}. Change?`, a: `₹${g - p}`, ans: g - p }; } },
      { title: 'Rupees and paise', levels: [2, 3], gen(R) { const r = R.int(1, 9), p = R.pick([25, 50, 75]); return R.chance(.5) ? { q: `₹${r} = ? paise`, a: `${r * 100} paise`, ans: r * 100 } : { q: `${r * 100 + p} paise = ₹ ? and ? paise`, a: `₹${r} and ${p} paise` }; } },
      { title: 'Patterns', gen(R) { const d = R.pick([2, 5, 10, 25]), s = R.int(1, 5) * d; const seq = Array.from({ length: 4 }, (_, i) => s + d * i); return { q: `Next in the pattern: ${seq.join(', ')}, __`, a: String(s + 4 * d), ans: s + 4 * d }; } },
      { title: 'Pictograph with a key', levels: [2, 3], gen(R) { const k = R.pick([5, 10]), n = R.int(2, 8); return { q: `Key: 👤 = ${k} visitors. Saturday shows ${'👤'.repeat(n)}. How many visitors?`, a: String(k * n), ans: k * n }; } }
    ],
    quiz: [
      { q: '₹1 =', o: ['100 paise', '10 paise', '1000 paise', '50 paise'], a: 0, e: 'Hundred.' }, { q: '₹350 + ₹85', o: ['₹435', '₹425', '₹535', '₹3585'], a: 0, e: 'Add.' },
      { q: 'Change from ₹500 for ₹435', o: ['₹65', '₹75', '₹165', '₹935'], a: 0, e: '500 − 435.' }, { q: 'Next: ▲●▲●▲', o: ['●', '▲', '■', '◆'], a: 0, e: 'AB.' },
      { q: 'Key 👤 = 10; 👤👤👤', o: ['30', '3', '13', '10'], a: 0, e: '3 × 10.' }, { q: '25, 50, 75, __', o: ['100', '80', '125', '90'], a: 0, e: '+25.' },
      { q: '₹2 and 50 paise =', o: ['250 paise', '25 paise', '205 paise', '2050 paise'], a: 0, e: '200 + 50.' }, { q: 'Bill is', o: ['sum of prices', 'change', 'one price', 'a key'], a: 0, e: 'Total.' },
      { q: '₹120 + ₹45 + ₹60', o: ['₹225', '₹215', '₹235', '₹165'], a: 0, e: 'Add.' }, { q: 'Pay ₹200 for ₹185: change', o: ['₹15', '₹25', '₹385', '₹5'], a: 0, e: 'Subtract.' },
      { q: 'A pictograph key tells', o: ['what one picture means', 'the date', 'the price', 'nothing'], a: 0, e: 'Key.' }
    ],
    teach: {
      outcomes: ['Make bills and find change', 'Use rupees and paise', 'Continue patterns', 'Read pictographs with a key'],
      periods: [{ t: 'Fair money', flow: [['10 min', 'Surajkund fair pictures.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Role-play stalls.']] }, { t: 'Patterns and data', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Visitor pictograph.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Key ignored.', 'Change bigger than note.'], activities: ['Class crafts fair with price tags.', 'Design a border pattern.'],
      exit: ['Bill for ₹85 and ₹120.', 'Change from ₹500 for ₹265.', 'Continue ◆◇◆◇.'], homework: 'Make a bill for 4 things bought at a market and draw a border pattern for a handkerchief.'
    },
    slides: [{ t: 'The Surajkund Fair', b: ['Bills and change', 'Rupees and paise', 'Patterns', 'Pictographs'] }, { t: 'Check yourself', b: ['₹245 + ₹180?', 'Change from ₹500?'] }],
    fs: { groups: [['Money', [['₹1', '100 paise'], ['Bill', 'add prices'], ['Change', 'paid − bill']]], ['Patterns', [['Repeating', '▲●▲●'], ['Growing', '25, 50, 75']]], ['Data', [['Pictograph', 'pictures in rows'], ['Key', '👤 = 10']]]],
      ex: [['₹350 + ₹120', '₹470'], ['Pay ₹500', 'change ₹30']], rem: ['Line up digits to add prices.', 'Check change.', 'Read the key.'] }
  });
})();
