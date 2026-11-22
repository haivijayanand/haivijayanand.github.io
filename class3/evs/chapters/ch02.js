/*
TOOL:    class3_science_ch02
FAMILY:  CBSE_REVISION / Class 3 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 2 Going to the Mela (a village fair, shops and stalls, buying and money, crowds and safety, local crafts) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const STALL = [['🎈 balloon', 10], ['🍦 kulfi', 20], ['🧸 wooden toy', 45], ['🪁 kite', 15], ['🥨 jalebi plate', 30], ['🎡 giant wheel ride', 25]];
  G9.register({
    no: 2, part: 'All chapters', short: 'At the mela', title: 'Going to the Mela',
    blurb: 'A visit to a mela (fair): stalls, food, rides and crafts made by local people, planning money, staying together in a crowd and what to do if lost.',
    revise: {
      oneLine: 'A mela is a fair where people meet, buy, sell and enjoy. Artisans sell pots, toys and cloth they make. Plan your money, keep together with family, remember a meeting place and your phone number, and keep the mela clean.',
      sections: [
        { h: 'At the mela', html: `<p>Stalls of bangles, toys, pots, sweets; rides; folk dance and music. Many things are handmade by local artisans.</p>` },
        { h: 'Money', html: `<p>Make a list, check prices, add the costs and see what is left.</p>` },
        { h: 'Safety', html: `<p>Hold hands, fix a meeting point, know your parent's name and phone number; if lost, go to a police help desk or a stall owner.</p>` }
      ],
      formulas: [['Bill', 'add the prices'], ['Money left', 'money − bill'], ['If lost', 'stay calm, go to help desk'], ['Clean mela', 'use dustbins']],
      terms: [['Mela', 'fair'], ['Artisan', 'person who makes things by hand'], ['Stall', 'small shop at a fair']],
      traps: ['Do not go with strangers if lost.', 'Do not litter.', 'Check money before buying.'],
      bridge: '<p>Ch 3 looks at festivals celebrated in different places.</p>'
    },
    explore: [
      { title: 'Mela shopping', intro: 'You have ₹100. Tick what you want; see the bill and the money left.',
        build(el, K) { const pick = new Set([0, 1]); const box = K.h('div'); el.appendChild(box); const rd = K.read(el);
          function draw() { box.innerHTML = STALL.map(([n, p], i) => `<label style="display:inline-block;margin:4px 12px;font-size:18px"><input type="checkbox" data-i="${i}" ${pick.has(i) ? 'checked' : ''}> ${n} ₹${p}</label>`).join(''); box.querySelectorAll('input').forEach(c => c.onchange = () => { c.checked ? pick.add(+c.dataset.i) : pick.delete(+c.dataset.i); draw(); }); const t = [...pick].reduce((s, i) => s + STALL[i][1], 0); rd.innerHTML = `bill ₹${t} · ${t <= 100 ? `money left <b>₹${100 - t}</b>` : `<b>₹${t - 100} short</b> — remove something`}`; } draw(); return null; } },
      { title: 'Lost at the mela', intro: 'Press <kbd>S</kbd> to follow the safe steps.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Stay calm', 'Stop where you are; do not run around in the crowd.'], ['Look for help', 'Go to the police help desk, an announcement booth, or a stall owner with a family.'], ['Tell them', "Say your name, your parent's name and phone number."], ['Wait', 'Stay at the help desk until your family comes. Never go away with a stranger.'], ['Before next time', 'Fix a meeting point and learn the phone number by heart.']] }); } }
    ],
    gens: [
      { title: 'Bill at the mela', gen(R) { const a = R.pick(STALL), b = R.pick(STALL); return { q: `Cost of a ${a[0].split(' ').slice(1).join(' ')} (₹${a[1]}) and a ${b[0].split(' ').slice(1).join(' ')} (₹${b[1]})?`, a: `₹${a[1] + b[1]}`, ans: a[1] + b[1] }; } },
      { title: 'Money left', gen(R) { const m = R.pick([50, 100]), s = R.int(10, m - 5); return { q: `You take ₹${m} and spend ₹${s}. Money left?`, a: `₹${m - s}`, ans: m - s }; } },
      { title: 'Safety', gen(R) { return G9.S9.pickQ(R, [['What should you do if you get lost at a mela?', 'stay calm; go to the help desk or a police person; tell your name and phone number'], ['Should you go with a stranger who offers to help?', 'no; go to a help desk'], ['What should you learn by heart before going?', "parent's name and phone number"], ['Why fix a meeting point?', 'so the family can find each other']]); } },
      { title: 'Crafts', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Who makes clay pots?', 'a potter'], ['Who makes bangles of glass or lac?', 'bangle makers (artisans)'], ['Why buy handmade things?', 'supports local artisans; less plastic'], ['Name two things sold at a mela.', 'any: toys, bangles, pots, sweets, cloth']]); } },
      { title: 'Clean mela', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Where should you put a used paper plate?', 'in a dustbin'], ['Why carry a cloth bag to a mela?', 'avoid plastic bags'], ['What happens if everyone throws waste on the ground?', 'dirt, smell, flies, illness']]); } }
    ],
    quiz: [
      { q: 'A mela is a', o: ['fair', 'school', 'hospital', 'farm'], a: 0, e: 'Fair.' }, { q: 'If lost, go to', o: ['the help desk', 'a stranger', 'outside the mela', 'nowhere'], a: 0, e: 'Safe help.' },
      { q: 'An artisan', o: ['makes things by hand', 'drives a bus', 'sells tickets only', 'is a doctor'], a: 0, e: 'Crafts.' }, { q: '₹100 − ₹45', o: ['₹55', '₹65', '₹45', '₹145'], a: 0, e: 'Subtract.' },
      { q: 'Kulfi ₹20 + kite ₹15', o: ['₹35', '₹25', '₹30', '₹45'], a: 0, e: 'Add.' }, { q: 'Learn by heart', o: ["parent's phone number", 'all prices', 'the stall names', 'nothing'], a: 0, e: 'Safety.' },
      { q: 'Used plates go', o: ['in a dustbin', 'on the ground', 'in a pond', 'under a stall'], a: 0, e: 'Clean.' }, { q: 'A potter makes', o: ['clay pots', 'kites', 'bangles of glass', 'shoes'], a: 0, e: 'Clay.' },
      { q: 'In a crowd, children should', o: ['hold hands with an elder', 'run ahead', 'hide', 'go alone'], a: 0, e: 'Together.' }, { q: 'Better bag for shopping', o: ['cloth bag', 'plastic bag', 'no bag ever', 'paper box only'], a: 0, e: 'Reusable.' },
      { q: 'A stall is', o: ['a small shop at a fair', 'a ride', 'a song', 'a game only'], a: 0, e: 'Shop.' }
    ],
    teach: {
      outcomes: ['Describe a mela and its people', 'Plan simple money', 'Know what to do if lost in a crowd'],
      periods: [{ t: 'Our mela', flow: [['10 min', 'Share mela visits.'], ['15 min', 'Explore panel 1: shopping.'], ['15 min', 'Artisans and crafts.']] }, { t: 'Safety', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Role-play lost child.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Any adult is safe to go with.', 'Litter is fine at fairs.'], activities: ['Class mela with paper money.', 'Make a clay toy.'],
      exit: ['Bill for two items.', 'Two safety rules.', 'One handmade thing.'], homework: "Learn your parent's phone number. Draw your favourite mela stall."
    },
    slides: [{ t: 'Going to the Mela', b: ['Stalls and artisans', 'Planning money', 'Staying safe', 'Keeping it clean'] }, { t: 'Think and share', b: ['What will you buy with ₹50?', 'What will you do if lost?'] }],
    fs: { groups: [['At the mela', [['Stalls', 'toys, pots, bangles, sweets'], ['Artisans', 'make things by hand']]], ['Money', [['Bill', 'add prices'], ['Left', 'money − bill']]], ['Safety', [['Lost', 'help desk, tell name and number'], ['Never', 'go with strangers'], ['Clean', 'use dustbins']]]],
      ex: [['₹100 − (₹20 + ₹45)', '₹35 left'], ['Lost', 'stay calm, help desk']], rem: ['Hold hands in crowds.', 'Know the phone number.', 'Carry a cloth bag.'] }
  });
})();
