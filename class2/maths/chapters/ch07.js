/*
TOOL:    class2_maths_ch07
FAMILY:  CBSE_REVISION / Class 2 Maths (Joyful Mathematics)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 7 Rani's Gift (measurement) - revise, 2 explore panels (ruler in centimetres, balance scale), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 7, part: 'All chapters', short: 'Measurement', title: 'Rani\'s Gift',
    blurb: 'Measuring length with hand spans and with a ruler in centimetres; comparing weights with a balance; comparing how much containers hold.',
    revise: {
      oneLine: 'Hand spans differ from person to person, so we use a standard unit: the centimetre (cm) on a ruler. A balance compares weights; the heavier side goes down. Containers are compared by how much they hold.',
      sections: [
        { h: 'Length', html: `<p>Measure from the 0 mark of the ruler. A pencil from 0 to 12 is 12 cm long. Long things are measured in metres (m): 1 m = 100 cm.</p>` },
        { h: 'Weight', html: `<p>On a balance the heavier side goes down; if level, the weights are equal. We can say "the bag weighs as much as 8 books".</p>` },
        { h: 'Capacity', html: `<p>A bucket holds more water than a mug. Count how many glasses fill a jug.</p>` }
      ],
      formulas: [['Length unit', 'centimetre (cm)'], ['Long things', 'metre (m)'], ['1 m', '100 cm'], ['Balance', 'heavier side goes down'], ['Start', 'measure from 0']],
      terms: [['Ruler', 'scale marked in cm'], ['Balance', 'compares weights'], ['Capacity', 'how much a container holds']],
      traps: ['Starting at 1 instead of 0 on the ruler.', 'A bigger thing is not always heavier (balloon vs stone).', 'Hand spans give different answers for different people.'],
      bridge: '<p>Class 3 measures in metres, kilograms and litres.</p>'
    },
    explore: [
      { title: 'Ruler in centimetres', intro: 'Slide the ribbon. Read its length from the 0 mark.',
        build(el, K) { let L = 9, s = 0; const row = K.row(el); K.slider(row, 'ribbon length', 1, 14, 1, L, v => { L = v; b.redraw(); }); K.slider(row, 'start mark', 0, 4, 1, s, v => { s = v; b.redraw(); });
          const b = new K.Board(el, { xmin: -0.5, xmax: 15.5, ymin: -1.5, ymax: 2, axes: false, grid: 0, equal: false, aspect: 0.22 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.rect(0, -1, 15, 1, { fill: '#fef3c7', color: '#a16207', w: 2 }); for (let i = 0; i <= 15; i++) { b.line(i, 0, i, -0.5, { color: C.ink, w: 1.5 }); b.text(i, -0.75, String(i), { font: '11px' }); }
            b.rect(s, 0.3, Math.min(L, 15 - s), 0.6, { fill: 'rgba(234,88,12,.6)', color: C.orange, w: 2 }); rd.innerHTML = `ribbon from ${s} to ${s + L}: length = ${s + L} − ${s} = <b>${L} cm</b>${s ? ' (it did not start at 0, so subtract)' : ''}`; };
          b.redraw(); return null; } },
      { title: 'Balance scale', intro: 'Put things in the two pans. The heavier side goes down.',
        build(el, K) { const W = [['🍎 apple', 2], ['📕 book', 4], ['🎈 balloon', 0.2], ['🪨 stone', 5], ['🍉 watermelon', 9], ['✏️ pencil', 0.5]]; let l = 1, r = 2;
          const row = K.row(el); K.select(row, 'left pan', W.map(w => w[0]), i => { l = i; b.redraw(); }); const s2 = K.select(row, 'right pan', W.map(w => w[0]), i => { r = i; b.redraw(); }); const sel = row.querySelectorAll('select')[1]; if (sel) sel.value = 2;
          const b = new K.Board(el, { xmin: -5, xmax: 5, ymin: -3, ymax: 3, axes: false, grid: 0 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const d = W[l][1] - W[r][1], t = Math.max(-0.35, Math.min(0.35, -d * 0.08)); b.line(0, -2.5, 0, 0, { color: C.ink, w: 4 }); const lx = -3 * Math.cos(t), ly = -3 * Math.sin(t) * -1;
            b.line(-3 * Math.cos(t), 3 * Math.sin(t), 3 * Math.cos(t), -3 * Math.sin(t), { color: C.ink, w: 4 }); b.text(-3 * Math.cos(t), 3 * Math.sin(t) + 0.6, W[l][0].split(' ')[0], { font: '30px' }); b.text(3 * Math.cos(t), -3 * Math.sin(t) + 0.6, W[r][0].split(' ')[0], { font: '30px' });
            rd.innerHTML = d === 0 ? 'Level: they weigh the same.' : `<b>${(d > 0 ? W[l] : W[r])[0].split(' ')[1]}</b> is heavier — its side goes down.`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Read the ruler', gen(R) { const s = R.int(0, 3), L = R.int(2, 12); return { q: `A pencil lies from the ${s} mark to the ${s + L} mark on a ruler. How long is it?`, a: `${L} cm`, ans: L }; } },
      { title: 'Which is longer?', gen(R) { const a = R.int(5, 30); let b; do { b = R.int(5, 30); } while (b === a); return { q: `Ribbon A is ${a} cm, ribbon B is ${b} cm. Which is longer and by how much?`, a: `${a > b ? 'A' : 'B'}, by ${Math.abs(a - b)} cm`, ans: Math.abs(a - b) }; } },
      { title: 'Heavier or lighter', gen(R) { const items = [['an elephant or a goat', 'elephant'], ['a feather or a stone', 'stone'], ['a school bag or a pencil', 'school bag'], ['a pumpkin or a lemon', 'pumpkin']]; const [q, a] = R.pick(items); return { q: `Which is heavier: ${q}?`, a }; } },
      { title: 'How many fill it?', levels: [2, 3], gen(R) { const g = R.int(3, 10), j = R.int(2, 4); return { q: `A jug fills ${g} glasses. How many glasses do ${j} jugs fill?`, a: String(g * j), ans: g * j }; } },
      { title: 'Metres and centimetres', levels: [3], gen(R) { const m = R.int(1, 5); return { q: `How many centimetres are in ${m} m?`, a: `${m * 100} cm`, ans: m * 100 }; } }
    ],
    quiz: [
      { q: 'We measure a pencil in', o: ['cm', 'kg', 'litres', 'hours'], a: 0, e: 'Length.' }, { q: 'Start measuring from', o: ['0', '1', '10', 'anywhere'], a: 0, e: 'Zero mark.' },
      { q: 'Heavier side of a balance', o: ['goes down', 'goes up', 'stays level', 'falls off'], a: 0, e: 'Down.' }, { q: '1 m =', o: ['100 cm', '10 cm', '1000 cm', '50 cm'], a: 0, e: 'Hundred.' },
      { q: 'From 2 to 9 on a ruler', o: ['7 cm', '9 cm', '11 cm', '2 cm'], a: 0, e: '9 − 2.' }, { q: 'Which holds more?', o: ['bucket', 'cup', 'spoon', 'bottle cap'], a: 0, e: 'Capacity.' },
      { q: 'Why use cm, not hand spans?', o: ['spans differ person to person', 'cm is longer', 'spans are wrong', 'no reason'], a: 0, e: 'Standard unit.' }, { q: 'Which is lighter?', o: ['🎈', '🪨', '🍉', '📕'], a: 0, e: 'Balloon.' },
      { q: 'Ribbon 15 cm and 9 cm: difference', o: ['6 cm', '24 cm', '15 cm', '9 cm'], a: 0, e: '15 − 9.' }, { q: 'A level balance means', o: ['same weight', 'left heavier', 'right heavier', 'broken'], a: 0, e: 'Equal.' },
      { q: 'A classroom is best measured in', o: ['metres', 'cm', 'grams', 'cups'], a: 0, e: 'Long length.' }
    ],
    teach: {
      outcomes: ['Measure length in cm with a ruler', 'Compare weights with a balance', 'Compare capacities'],
      periods: [{ t: 'Length', flow: [['10 min', 'Rani measures a ribbon with spans — different answers!'], ['15 min', 'Explore panel 1.'], ['15 min', 'Measure classroom objects.']] }, { t: 'Weight and capacity', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Fill jugs with cups.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Starting at 1.', 'Big = heavy.'], activities: ['Hanger balance.', 'Measure your hand span in cm.'],
      exit: ['Measure your eraser.', 'Heavier: book or pencil?', 'How many cups fill a bottle?'], homework: 'Measure 3 things at home with a ruler and write the lengths in cm.'
    },
    slides: [{ t: 'Rani\'s Gift', b: ['Length in cm', 'Weight with a balance', 'Capacity'] }, { t: 'Check yourself', b: ['Measure your pencil.', 'Which is heavier?'] }],
    fs: { groups: [['Length', [['Unit', 'cm'], ['Long things', 'm, 1 m = 100 cm'], ['Ruler', 'start at 0']]], ['Weight', [['Balance', 'heavier goes down'], ['Level', 'equal weight']]], ['Capacity', [['More', 'holds more water'], ['Measure', 'count cups or glasses']]]],
      ex: [['Pencil 3 to 11', '8 cm'], ['Jug = 6 glasses', '2 jugs = 12 glasses']], rem: ['Start at 0.', 'Same unit to compare.', 'Big is not always heavy.'] }
  });
})();
