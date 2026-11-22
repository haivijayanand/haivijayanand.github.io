/*
TOOL:    class1_maths_ch13
FAMILY:  CBSE_REVISION / Class 1 Maths (Joyful Mathematics)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 13 So Many Toys (data handling) - revise, 2 explore panels (sort the toys into a picture chart, tally), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const TOYS = ['🚗', '🧸', '⚽', '🪀'];

  G9.register({
    no: 13, part: 'All chapters', short: 'Data', title: 'So Many Toys',
    blurb: 'Sorting and counting objects, showing the counts in a picture chart and with tally marks, and answering questions from the chart.',
    revise: {
      oneLine: 'Sort things into groups, count each group, and show the counts as a picture chart (one picture for each thing) or as tally marks (||||). Then we can see which group has the most or the fewest.',
      sections: [
        { h: 'Sort and count', html: `<p>Put all 🚗 together, all 🧸 together, and so on. Count each group.</p>` },
        { h: 'Picture chart', html: `<p>Each row (or column) shows one kind of toy with one picture for each toy. The longest row has the most.</p>` },
        { h: 'Tally marks', html: `<p>One line for each thing; the fifth line crosses the first four: |||| with a cross = 5.</p>` },
        { h: 'Reading the chart', html: `<p>Most, fewest, how many more, how many altogether.</p>` }
      ],
      formulas: [['Sort', 'same kind together'], ['Picture chart', 'one picture for each'], ['Tally', 'groups of 5 with a cross line'], ['Most', 'longest row'], ['How many more', 'subtract']],
      terms: [['Data', 'information we collect'], ['Tally mark', 'a line for each thing'], ['Chart', 'a picture of the data'], ['Survey', 'asking people questions']],
      traps: ['Pictures of different sizes make a row look longer.', 'Forgetting to cross the fifth tally.', 'Counting a toy twice.'],
      bridge: '<p>Class 2 and 3 draw bar charts and pictographs with a key.</p>'
    },

    explore: [
      {
        title: 'Sort into a picture chart', intro: 'Press <kbd>S</kbd> to pick up the next toy from the heap and put it in its row.',
        build(el, K) {
          const R = G9.rng(G9.newSeed()); let heap = []; const rd = K.read(el); const an = new K.Anim(20, () => draw(), { ms: 350 });
          const fresh = () => { heap = Array.from({ length: 20 }, () => R.pick(TOYS)); an.reset(); draw(); };
          function draw() { const k = an.i; const counts = TOYS.map(t => heap.slice(0, k).filter(x => x === t).length);
            rd.innerHTML = `<div style="font-size:24px;margin-bottom:8px">heap: ${heap.slice(k).join('') || '(empty)'}</div><table class="t" style="width:auto">${TOYS.map((t, i) => `<tr><td style="font-size:22px">${t}</td><td style="font-size:22px;text-align:left;min-width:280px">${t.repeat(counts[i])}</td><td><b>${counts[i]}</b></td></tr>`).join('')}</table>` + (k === 20 ? (() => { const mx = Math.max(...counts), mn = Math.min(...counts); return `most: ${TOYS.filter((_, i) => counts[i] === mx).join(' ')} · fewest: ${TOYS.filter((_, i) => counts[i] === mn).join(' ')} · total 20`; })() : ''); }
          const row = K.row(el); K.button(row, 'New heap', fresh); K.anim(el, an); fresh(); return an;
        }
      },
      {
        title: 'Tally marks', intro: 'Slide the count; tally marks are drawn in fives.',
        build(el, K) {
          let n = 12; const row = K.row(el); K.slider(row, 'count', 0, 30, 1, n, v => { n = v; draw(); }); const rd = K.read(el);
          const five = '<span style="display:inline-block;position:relative;font:bold 26px monospace;margin-right:14px">||||<span style="position:absolute;left:-4px;top:13px;width:52px;border-top:3px solid var(--orange,#ea580c);transform:rotate(-20deg)"></span></span>';
          function draw() { rd.innerHTML = `<div>${five.repeat(Math.floor(n / 5))}<span style="font:bold 26px monospace">${'|'.repeat(n % 5)}</span></div>${n} = ${Math.floor(n / 5)} group${Math.floor(n / 5) === 1 ? '' : 's'} of 5 and ${n % 5} more · count by 5s: ${Array.from({ length: Math.floor(n / 5) }, (_, i) => 5 * (i + 1)).join(', ') || '—'}`; }
          draw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Count each kind', gen(R) {
          const heap = R.shuffle(Array.from({ length: R.int(8, 14) }, () => R.pick(TOYS))); const t = R.pick(TOYS); const c = heap.filter(x => x === t).length;
          return { q: `How many ${t} are there? ${heap.join(' ')}`, a: String(c), ans: c };
        } },
      { title: 'Read a picture chart', gen(R) {
          const counts = TOYS.map(() => R.int(1, 7)); const mx = Math.max(...counts); const t = R.int(0, 1);
          const chart = TOYS.map((x, i) => `${x}: ${x.repeat(counts[i])}`).join(' | ');
          return t === 0 ? { q: `Which toy is the most? ${chart}`, a: TOYS.filter((_, i) => counts[i] === mx).join(' or ') } : { q: `How many toys altogether? ${chart}`, a: String(counts.reduce((a, b) => a + b, 0)), ans: counts.reduce((a, b) => a + b, 0) };
        } },
      { title: 'How many more?', levels: [2, 3], gen(R) {
          const a = R.int(2, 9); let b; do { b = R.int(2, 9); } while (b === a); return { q: `There are ${a} 🚗 and ${b} 🧸. How many more ${a > b ? '🚗' : '🧸'} than ${a > b ? '🧸' : '🚗'}?`, a: String(Math.abs(a - b)), ans: Math.abs(a - b) };
        } },
      { title: 'Tally', gen(R) {
          const n = R.int(3, 20); return R.chance(.5) ? { q: `What number do these tally marks show? ${'𝍸 '.repeat(Math.floor(n / 5))}${'|'.repeat(n % 5)}`, a: String(n), ans: n } : { q: `Draw tally marks for ${n}.`, a: `${Math.floor(n / 5)} groups of five and ${n % 5} single line(s)` };
        } },
      { title: 'Class survey', levels: [3], gen(R) {
          const f = { '🍎': R.int(2, 9), '🍌': R.int(2, 9), '🥭': R.int(2, 9) }; const e = Object.entries(f); const mx = e.reduce((a, b) => b[1] > a[1] ? b : a);
          return { q: `Favourite fruit survey: ${e.map(([k, v]) => `${k} ${v}`).join(', ')}. How many children were asked, and which fruit is liked most?`, a: `${e.reduce((s, x) => s + x[1], 0)} children; ${mx[0]}`, ans: e.reduce((s, x) => s + x[1], 0) };
        } }
    ],

    quiz: [
      { q: '🚗🚗🚗 🧸🧸 — which has more?', o: ['🚗', '🧸', 'same', 'none'], a: 0, e: '3 > 2.' },
      { q: 'A tally group of 5 is drawn as', o: ['4 lines with a cross line', '5 dots', '5 circles', 'one line'], a: 0, e: 'Gate.' },
      { q: '𝍸 𝍸 || =', o: ['12', '7', '10', '22'], a: 0, e: '5 + 5 + 2.' },
      { q: 'In a picture chart, the longest row has the', o: ['most', 'fewest', 'same', 'nothing'], a: 0, e: 'Most pictures.' },
      { q: '5 balls and 3 kites: how many more balls?', o: ['2', '8', '3', '5'], a: 0, e: '5 − 3.' },
      { q: 'First step with a heap of toys', o: ['sort them', 'throw them', 'paint them', 'hide them'], a: 0, e: 'Sort.' },
      { q: '⚽⚽⚽⚽ 🪀🪀 🧸 — fewest?', o: ['🧸', '⚽', '🪀', 'same'], a: 0, e: 'Only 1.' },
      { q: 'Total of 🚗 3, 🧸 4, ⚽ 2', o: ['9', '7', '342', '6'], a: 0, e: 'Add.' },
      { q: 'Information we collect is called', o: ['data', 'a toy', 'a sum', 'a shape'], a: 0, e: 'Data.' },
      { q: 'Tally for 3', o: ['|||', '𝍸', '||||', '|'], a: 0, e: 'Three lines.' },
      { q: 'Each picture in our chart stands for', o: ['one toy', 'two toys', 'ten toys', 'no toy'], a: 0, e: 'One for one.' }
    ],

    teach: {
      outcomes: ['Sort and count objects', 'Make and read a picture chart', 'Use tally marks', 'Answer most/fewest/how many more questions'],
      periods: [
        { t: 'Sort and chart', flow: [['10 min', 'Toy heap from the class box.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Draw a picture chart.']] },
        { t: 'Tally and survey', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Class survey: favourite fruit with tallies.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Unequal picture sizes.', 'Fifth tally not crossed.'],
      activities: ['Toy sort on the floor.', 'Favourite colour survey with tallies.'],
      exit: ['Tally for 8.', 'Which toy is most in our chart?', 'How many more 🚗 than ⚽?'],
      homework: 'Count the toys (or utensils) at home by kind and make a picture chart.'
    },

    slides: [
      { t: 'So Many Toys', b: ['Sort and count', 'Picture chart', 'Tally marks', 'Reading data'] },
      { t: 'Tally', b: ['One line each', 'Fifth line crosses the four', 'Count by 5s'] },
      { t: 'Check yourself', b: ['Show 7 with tallies.', 'Which toy is fewest?'] }
    ],

    fs: { groups: [
        ['Collect', [['Sort', 'same kind together'], ['Count', 'each group'], ['Survey', 'ask and record']]],
        ['Show', [['Picture chart', 'one picture for each thing'], ['Tally', '|||| crossed = 5'], ['Same size pictures', 'fair comparison']]],
        ['Read', [['Most', 'longest row'], ['Fewest', 'shortest row'], ['How many more', 'subtract'], ['Altogether', 'add']]]],
      ex: [['🚗 4, 🧸 6, ⚽ 3', 'most 🧸, total 13'], ['𝍸 |||', '8']],
      rem: ['Sort before counting.', 'Cross every fifth tally.', 'Same-size pictures.'] }
  });
})();
