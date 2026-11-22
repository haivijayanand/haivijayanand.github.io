/*
TOOL:    class2_maths_ch11
FAMILY:  CBSE_REVISION / Class 2 Maths (Joyful Mathematics)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 11 Data Handling - revise, 2 explore panels (tally to pictograph, survey bars), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const FR = ['🍎', '🍌', '🥭', '🍇'];
  G9.register({
    no: 11, part: 'All chapters', short: 'Data', title: 'Data Handling',
    blurb: 'Collecting data by asking, recording with tally marks, drawing a pictograph and reading it to answer questions.',
    revise: {
      oneLine: 'Ask a question, record each answer with a tally mark, then show the counts in a pictograph. Read it to find the most, the least, the total and differences.',
      sections: [
        { h: 'Collect and tally', html: `<p>"Which fruit do you like?" Make one tally mark for each child; cross every fifth mark.</p>` },
        { h: 'Pictograph', html: `<p>Draw one picture for each child (later one picture can stand for 2 or more — the key tells you).</p>` },
        { h: 'Read', html: `<p>Most liked, least liked, how many more, how many in all.</p>` }
      ],
      formulas: [['Tally', '|||| crossed = 5'], ['Pictograph', 'pictures in rows'], ['Key', 'what one picture stands for'], ['How many more', 'subtract'], ['Total', 'add all rows']],
      terms: [['Data', 'information collected'], ['Survey', 'asking a question to many people'], ['Pictograph', 'chart with pictures']],
      traps: ['Forgetting the key.', 'Pictures of unequal size.', 'Counting a child twice.'],
      bridge: '<p>Class 3 uses keys where one picture stands for many.</p>'
    },
    explore: [
      { title: 'Tally to pictograph', intro: 'Press <kbd>S</kbd> to record the next child\'s answer.',
        build(el, K) { const R = G9.rng(G9.newSeed()); let ans = []; const rd = K.read(el); const an = new K.Anim(20, () => draw(), { ms: 350 });
          const fresh = () => { ans = Array.from({ length: 20 }, () => R.pick(FR)); an.reset(); draw(); };
          function draw() { const k = an.i; const c = FR.map(f => ans.slice(0, k).filter(x => x === f).length); const tally = (n) => '𝍸 '.repeat(Math.floor(n / 5)) + '|'.repeat(n % 5);
            rd.innerHTML = `children asked: ${k}${k ? ` (last said ${ans[k - 1]})` : ''}<table class="t" style="width:auto"><tr><th>fruit</th><th>tally</th><th>pictograph</th><th>count</th></tr>${FR.map((f, i) => `<tr><td style="font-size:20px">${f}</td><td style="font-family:monospace;font-size:18px">${tally(c[i])}</td><td style="font-size:18px;text-align:left">${f.repeat(c[i])}</td><td><b>${c[i]}</b></td></tr>`).join('')}</table>`; }
          const row = K.row(el); K.button(row, 'New class', fresh); K.anim(el, an); fresh(); return an; } },
      { title: 'One picture for 2', intro: 'Change the counts. With the key ⭐ = 2 children, half a star means 1.',
        build(el, K) { const v = [8, 5, 10, 3]; const row = K.row(el); FR.forEach((f, i) => K.slider(row, f, 0, 12, 1, v[i], x => { v[i] = x; draw(); })); const rd = K.read(el);
          function draw() { rd.innerHTML = `key: ⭐ = 2 children<table class="t" style="width:auto">${FR.map((f, i) => `<tr><td style="font-size:20px">${f}</td><td style="font-size:20px;text-align:left">${'⭐'.repeat(Math.floor(v[i] / 2))}${v[i] % 2 ? '½' : ''}</td><td>${v[i]}</td></tr>`).join('')}</table>total ${v.reduce((a, b) => a + b, 0)} children`; }
          draw(); return null; } }
    ],
    gens: [
      { title: 'Read a pictograph', gen(R) { const c = FR.map(() => R.int(1, 8)); const mx = Math.max(...c); const t = R.int(0, 1); const chart = FR.map((f, i) => `${f} ${f.repeat(c[i])}`).join(' | ');
          return t ? { q: `Which fruit is liked most? ${chart}`, a: FR.filter((_, i) => c[i] === mx).join(' or ') } : { q: `How many children in all? ${chart}`, a: String(c.reduce((a, b) => a + b, 0)), ans: c.reduce((a, b) => a + b, 0) }; } },
      { title: 'Tally', gen(R) { const n = R.int(3, 24); return { q: `What number do these tally marks show? ${'𝍸 '.repeat(Math.floor(n / 5))}${'|'.repeat(n % 5)}`, a: String(n), ans: n }; } },
      { title: 'How many more', gen(R) { const a = R.int(3, 12), b = R.int(3, 12); if (a === b) return this.gen(R); return { q: `${a} children like 🍎 and ${b} like 🍌. How many more like ${a > b ? '🍎' : '🍌'}?`, a: String(Math.abs(a - b)), ans: Math.abs(a - b) }; } },
      { title: 'Key', levels: [2, 3], gen(R) { const k = R.pick([2, 5]), n = R.int(2, 6); return { q: `Key: ⭐ = ${k} children. A row has ${'⭐'.repeat(n)}. How many children?`, a: String(k * n), ans: k * n }; } },
      { title: 'Plan a survey', levels: [3], gen(R) { const items = [['favourite colour', 'ask each child, tally the answers, draw a pictograph'], ['how children come to school', 'list walk/bus/cycle/car, tally, draw pictures']]; const [q, a] = R.pick(items); return { q: `How would you find the ${q} of your class?`, a }; } }
    ],
    quiz: [
      { q: '𝍸 ||| =', o: ['8', '5', '3', '53'], a: 0, e: '5 + 3.' }, { q: 'A pictograph uses', o: ['pictures', 'only numbers', 'letters', 'colours only'], a: 0, e: 'Pictures.' },
      { q: 'Key ⭐ = 2, row ⭐⭐⭐', o: ['6', '3', '5', '2'], a: 0, e: '3 × 2.' }, { q: 'Information collected is', o: ['data', 'a key', 'a tally', 'a fruit'], a: 0, e: 'Data.' },
      { q: '🍎 7, 🍌 4: how many more 🍎?', o: ['3', '11', '4', '7'], a: 0, e: '7 − 4.' }, { q: 'The longest row shows the', o: ['most', 'least', 'same', 'total'], a: 0, e: 'Most.' },
      { q: 'Tally for 5', o: ['four lines crossed by one', '5 dots', '|||', 'one line'], a: 0, e: 'Gate.' }, { q: '🥭 5, 🍇 3, 🍎 2: total', o: ['10', '8', '5', '532'], a: 0, e: 'Add.' },
      { q: 'A survey means', o: ['asking many people a question', 'counting stars', 'drawing a map', 'a test'], a: 0, e: 'Collect.' }, { q: 'Key ⭐ = 2, ⭐⭐½', o: ['5', '4', '3', '2'], a: 0, e: '2 + 2 + 1.' },
      { q: 'Least liked has the', o: ['shortest row', 'longest row', 'most pictures', 'key'], a: 0, e: 'Fewest.' }
    ],
    teach: {
      outcomes: ['Collect data and use tally marks', 'Draw and read pictographs, including a simple key', 'Answer questions from data'],
      periods: [{ t: 'Collect', flow: [['15 min', 'Favourite fruit survey.'], ['15 min', 'Explore panel 1.'], ['10 min', 'Tally practice.']] }, { t: 'Pictographs', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Draw class pictograph.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Key ignored.', 'Unequal pictures.'], activities: ['Class survey wall chart.', 'Count vehicles passing the gate.'],
      exit: ['Tally for 12.', 'Read the most liked fruit.', 'Key ⭐ = 2: ⭐⭐⭐⭐?'], homework: 'Ask 10 people their favourite festival. Make a tally and a pictograph.'
    },
    slides: [{ t: 'Data Handling', b: ['Survey', 'Tally marks', 'Pictograph and key'] }, { t: 'Check yourself', b: ['Tally for 9?', 'Key ⭐ = 2, ⭐⭐⭐?'] }],
    fs: { groups: [['Collect', [['Survey', 'ask a question'], ['Tally', 'one mark each, fifth crosses']]], ['Show', [['Pictograph', 'one picture each'], ['Key', '⭐ = 2 children'], ['Half picture', 'half the key value']]], ['Read', [['Most / least', 'longest / shortest row'], ['How many more', 'subtract'], ['Total', 'add']]]],
      ex: [['𝍸 𝍸 |', '11'], ['⭐ = 2: ⭐⭐⭐⭐', '8']], rem: ['Always read the key.', 'Same-size pictures.', 'Cross every fifth tally.'] }
  });
})();
