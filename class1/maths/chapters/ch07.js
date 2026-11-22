/*
TOOL:    class1_maths_ch07
FAMILY:  CBSE_REVISION / Class 1 Maths (Joyful Mathematics)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 7 Lina's Family (measurement) - revise, 2 explore panels (measure with hand spans and paper clips, tallest to shortest), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;

  G9.register({
    no: 7, part: 'All chapters', short: 'Measuring', title: 'Lina\'s Family',
    blurb: 'Comparing lengths, heights and weights in a family; measuring with hand spans, footsteps and other non-standard units; ordering.',
    revise: {
      oneLine: 'We compare by placing things side by side from the same starting line. To say how long, we count how many equal units (spans, clips, footsteps) fit along it — the same unit must be used for a fair comparison.',
      sections: [
        { h: 'Comparing', html: `<p>Tall – taller – tallest; short – shorter – shortest. Line things up from the same starting line before comparing.</p>` },
        { h: 'Measuring with units', html: `<p>The table is 6 hand spans long. The pencil is 4 paper clips long. Units must touch end to end, with no gaps or overlaps.</p>` },
        { h: 'Different units', html: `<p>Lina's hand span is smaller than her father's, so the same table measures more of her spans. That is why we need the same unit to compare.</p>` },
        { h: 'Heavy and light', html: `<p>A see-saw or balance tips down on the heavier side. Things that hold more water have more capacity.</p>` }
      ],
      formulas: [['Compare', 'same starting line'], ['Measure', 'count equal units'], ['Smaller unit', 'more units needed'], ['Balance', 'heavier side goes down'], ['Order', 'tallest → shortest']],
      terms: [['Hand span', 'thumb tip to little finger tip, spread'], ['Unit', 'the thing we count to measure'], ['Taller', 'more height'], ['Heavier', 'weighs more']],
      traps: ['Not starting from the same line.', 'Gaps between units.', 'Comparing counts made with different units.'],
      bridge: '<p>Class 2 introduces centimetres and metres.</p>'
    },

    explore: [
      {
        title: 'Measure the pencil', intro: 'Choose the unit. Smaller units fit more times along the same pencil.',
        build(el, K) {
          let L = 12, u = 0; const units = [['paper clip', 3], ['eraser', 4], ['matchstick', 2], ['cube', 1]]; const row = K.row(el);
          K.slider(row, 'pencil length', 4, 16, 1, L, v => { L = v; b.redraw(); }); K.select(row, 'unit', units.map(x => x[0]), i => { u = i; b.redraw(); });
          const b = new K.Board(el, { xmin: -0.5, xmax: 17, ymin: -1, ymax: 3, axes: false, grid: 0, aspect: 0.25 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.rect(0, 1.6, L, 0.6, { fill: '#facc15', color: '#a16207', w: 2 }); const w = units[u][1]; const n = Math.floor(L / w); for (let i = 0; i < n; i++) b.rect(i * w, 0.4, w, 0.6, { fill: i % 2 ? C.blueL : 'rgba(234,88,12,.3)', color: C.ink, w: 1 });
            const extra = L - n * w; rd.innerHTML = `The pencil is <b>${n}${extra ? ' and a bit' : ''}</b> ${units[u][0]}${n === 1 ? '' : 's'} long. Units touch end to end with no gaps.`; };
          b.redraw(); return null;
        }
      },
      {
        title: 'Tallest to shortest', intro: 'Press <kbd>S</kbd> to line Lina\'s family up from tallest to shortest, standing on the same line.',
        build(el, K) {
          const fam = [['Grandpa', 7], ['Lina', 4.5], ['Father', 8.5], ['Baby', 2.5], ['Mother', 7.6], ['Brother', 5.5]]; let sorted = false;
          const b = new K.Board(el, { xmin: 0, xmax: 12.5, ymin: -1, ymax: 9.5, axes: false, grid: 0, equal: false, aspect: 0.45 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.line(0, 0, 12.5, 0, { color: C.ink, w: 3 }); const L = sorted ? [...fam].sort((x, y) => y[1] - x[1]) : fam; L.forEach(([n, h], i) => { b.rect(i * 2 + 0.6, 0, 1.2, h, { fill: i === 0 && sorted ? 'rgba(234,88,12,.4)' : C.blueL, color: C.blue, w: 2 }); b.text(i * 2 + 1.2, -0.5, n, { font: '12px' }); });
            rd.innerHTML = sorted ? `tallest: <b>Father</b> · shortest: <b>Baby</b> · Lina is taller than Baby and shorter than Brother` : 'Who is the tallest? Press S to line them up.'; };
          const step = () => { sorted = !sorted; b.redraw(); }; const row = K.row(el); K.button(row, 'Line up (S)', step); b.redraw(); return { step, play() {}, pause() {} };
        }
      }
    ],

    gens: [
      { title: 'Longer, taller, heavier', gen(R) {
          const items = [['a ladder or a stool — which is taller?', 'ladder'], ['an elephant or a dog — which is heavier?', 'elephant'], ['a bucket or a cup — which holds more water?', 'bucket'], ['a rope or a thread for a swing — which is thicker?', 'rope'], ['a bus or an auto — which is longer?', 'bus']];
          const [q, a] = R.pick(items); return { q: `Which is it: ${q}`, a };
        } },
      { title: 'Count the units', gen(R) {
          const n = R.int(2, 9), u = R.pick(['hand spans', 'paper clips', 'footsteps', 'erasers']); return { q: `A table is measured with ${u}: ${'▭'.repeat(n)}. How long is it?`, a: `${n} ${u}`, ans: n };
        } },
      { title: 'Different hand spans', levels: [2, 3], gen(R) {
          const a = R.int(5, 9), b = R.int(3, a - 1); return { q: `Lina measures a mat as ${a} spans. Her father measures the same mat as ${b} spans. Whose hand span is bigger?`, a: 'Father\'s (fewer spans for the same mat)' };
        } },
      { title: 'Order three things', levels: [2, 3], gen(R) {
          const ps = R.shuffle([['Asha', R.int(100, 110)], ['Bilal', R.int(111, 120)], ['Chitra', R.int(121, 130)]]); const s = [...ps].sort((x, y) => y[1] - x[1]);
          return { q: `Heights (in cubes): ${ps.map(p => `${p[0]} ${p[1]}`).join(', ')}. Who is tallest and who is shortest?`, a: `tallest ${s[0][0]}, shortest ${s[2][0]}` };
        } },
      { title: 'Balance', levels: [1, 2], gen(R) {
          const items = [['A balance tips down on the side with the mango. Which is heavier: the mango or the leaf?', 'the mango'], ['A see-saw is level. What do you know about the two children?', 'they weigh about the same'], ['A balance tips down on the side with the book. Which is lighter?', 'the other thing (not the book)']];
          const [q, a] = R.pick(items); return { q, a };
        } }
    ],

    quiz: [
      { q: 'To compare heights, children should stand', o: ['on the same line', 'anywhere', 'on chairs', 'far apart'], a: 0, e: 'Same start.' },
      { q: 'Which is heavier?', o: ['🐘', '🐁', '🪶', '🍃'], a: 0, e: 'Elephant.' },
      { q: 'The same table measures more spans with', o: ['a smaller hand', 'a bigger hand', 'any hand — same', 'no hand'], a: 0, e: 'Smaller unit.' },
      { q: 'A balance goes down on the', o: ['heavier side', 'lighter side', 'left side always', 'right side always'], a: 0, e: 'Heavier.' },
      { q: 'Which holds more water?', o: ['🪣 bucket', '☕ cup', '🥄 spoon', '🥛 glass'], a: 0, e: 'Bucket.' },
      { q: 'When measuring, units should', o: ['touch end to end', 'have gaps', 'overlap', 'be different sizes'], a: 0, e: 'No gaps.' },
      { q: 'Tall, taller, ___', o: ['tallest', 'tall', 'short', 'shorter'], a: 0, e: 'Most tall.' },
      { q: 'A pencil is 5 clips long and a pen 7 clips. Longer?', o: ['pen', 'pencil', 'same', 'cannot say'], a: 0, e: 'More clips.' },
      { q: 'Which is shorter?', o: ['🐜 ant', '🦒 giraffe', '🌳 tree', '🏠 house'], a: 0, e: 'Ant.' },
      { q: 'Who is usually tallest: baby, child or father?', o: ['father', 'baby', 'child', 'all same'], a: 0, e: 'Grown-up.' },
      { q: 'We need the same unit to', o: ['compare fairly', 'make it look nice', 'go faster', 'add colours'], a: 0, e: 'Fair comparison.' }
    ],

    teach: {
      outcomes: ['Compare and order lengths, heights and weights', 'Measure with non-standard units', 'Explain why the same unit is needed'],
      periods: [
        { t: 'Compare and order', flow: [['10 min', 'Line up children by height.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Balance with a hanger and bags.']] },
        { t: 'Measure', flow: [['15 min', 'Measure desks with spans and clips.'], ['15 min', 'Explore panel 1.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Different starting lines.', 'Gaps in units.', 'Comparing different units.'],
      activities: ['Measure the classroom door in footsteps.', 'Make a hanger balance.'],
      exit: ['Measure your book with clips.', 'Who is taller in your row?', 'Which is heavier: bag or pencil?'],
      homework: 'Measure your bed with your hand spans and with a grown-up\'s hand spans. Compare.'
    },

    slides: [
      { t: 'Lina\'s Family', b: ['Compare: tall, long, heavy', 'Measure with spans and clips', 'Same unit for fair comparing'] },
      { t: 'Measure well', b: ['Same starting line', 'No gaps, no overlaps', 'Count the units'] },
      { t: 'Check yourself', b: ['How many clips long is your pencil?', 'Who is tallest in your family?'] }
    ],

    fs: { groups: [
        ['Compare', [['tall – taller – tallest', 'height'], ['long – longer – longest', 'length'], ['heavy – heavier – heaviest', 'weight'], ['holds more', 'capacity']]],
        ['Measure', [['Units', 'spans, clips, footsteps, cubes'], ['Rules', 'same start, no gaps, no overlaps'], ['Smaller unit', 'more of them fit']]],
        ['Balance', [['Goes down', 'heavier side'], ['Level', 'same weight']]]],
      ex: [['Desk = 7 spans', 'measured with one child\'s hand'], ['Mother 6 spans, Lina 9 spans', 'Mother\'s span is bigger']],
      rem: ['Line up at the same start.', 'Use one kind of unit.', 'Say the unit with the number.'] }
  });
})();
