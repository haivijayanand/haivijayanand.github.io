/*
TOOL:    class3_maths_ch11
FAMILY:  CBSE_REVISION / Class 3 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 11 Filling and Lifting (capacity and weight) - revise, 2 explore panels (fill the jug with cups, kilogram balance), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 11, part: 'All chapters', short: 'Capacity and weight', title: 'Filling and Lifting',
    blurb: 'How much a container holds (capacity) in cups, glasses and litres; how heavy things are (weight) using a balance, grams and kilograms.',
    revise: {
      oneLine: 'Capacity is how much a container can hold — measured with cups or in litres (L) and millilitres (mL). Weight is how heavy something is — compared on a balance and measured in kilograms (kg) and grams (g).',
      sections: [
        { h: 'Capacity', html: `<p>A jug holds 4 glasses. A bucket holds 10 litres. 1 litre = 1000 mL; a water bottle is often 1 L.</p>` },
        { h: 'Weight', html: `<p>On a balance the heavier pan goes down. 1 kg = 1000 g. A bag of atta 5 kg, a pencil a few grams.</p>` },
        { h: 'Choose the unit', html: `<p>Small amounts: mL, g. Large amounts: L, kg.</p>` }
      ],
      formulas: [['1 L', '1000 mL'], ['1 kg', '1000 g'], ['Balance', 'heavier goes down'], ['Capacity', 'count cups to fill']],
      terms: [['Capacity', 'how much a container holds'], ['Weight', 'how heavy'], ['Litre, kilogram', 'standard units']],
      traps: ['Tall is not always more capacity.', 'Big is not always heavier.', 'Using the same cup to compare.'],
      bridge: '<p>Ch 14 uses measures at the fair; Class 4 converts units.</p>'
    },
    explore: [
      { title: 'Fill with cups', intro: 'Choose the container and the cup; press <kbd>S</kbd> to pour one cup.',
        build(el, K) { const CT = [['jug', 1000], ['bottle', 500], ['bucket', 5000], ['glass', 250]], CU = [['small cup', 100], ['glass', 250], ['mug', 500]]; let c = 0, u = 1;
          const row = K.row(el); K.select(row, 'container', CT.map(x => `${x[0]} (${x[1]} mL)`), i => { c = i; an.reset(); }); K.select(row, 'pour with', CU.map(x => `${x[0]} (${x[1]} mL)`), i => { u = i; an.reset(); }); const s2 = row.querySelectorAll('select')[1]; if (s2) s2.value = 1;
          const b = new K.Board(el, { xmin: -2, xmax: 2, ymin: -0.2, ymax: 3.2, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el); const an = new K.Anim(50, () => b.redraw(), { ms: 250 });
          b.onDraw = () => { b.clear(); const cap = CT[c][1], cup = CU[u][1], need = Math.ceil(cap / cup), k = Math.min(an.i, need), f = Math.min(1, k * cup / cap); b.rect(-1, 0, 2, 3, { color: C.ink, w: 3 }); b.rect(-1, 0, 2, 3 * f, { fill: 'rgba(29,78,216,.45)', color: C.blue, w: 1 });
            rd.innerHTML = `${k} ${CU[u][0]}${k === 1 ? '' : 's'} poured (${Math.min(k * cup, cap)} mL of ${cap} mL)${k >= need ? ` · <b>${need}</b> to fill${cap % cup ? ' (last one not full)' : ''}` : ''}`; };
          K.anim(el, an); b.redraw(); return an; } },
      { title: 'Kilogram balance', intro: 'Put weights on the right pan until it balances the bag of rice.',
        build(el, K) { let rice = 3500, w = 2000; const row = K.row(el); K.slider(row, 'rice (g)', 500, 5000, 500, rice, v => { rice = v; b.redraw(); }); K.slider(row, 'weights (g)', 0, 5000, 500, w, v => { w = v; b.redraw(); });
          const b = new K.Board(el, { xmin: -5, xmax: 5, ymin: -3, ymax: 3, axes: false, grid: 0 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const d = rice - w, t = Math.max(-0.3, Math.min(0.3, -d / 6000)); b.line(0, -2.5, 0, 0, { color: C.ink, w: 4 }); b.line(-3 * Math.cos(t), 3 * Math.sin(t), 3 * Math.cos(t), -3 * Math.sin(t), { color: C.ink, w: 4 }); b.text(-3 * Math.cos(t), 3 * Math.sin(t) + 0.6, '🌾', { font: '30px' }); b.text(3 * Math.cos(t), -3 * Math.sin(t) + 0.6, '⚖️', { font: '26px' });
            rd.innerHTML = `rice ${rice} g = ${rice / 1000} kg · weights ${w} g · ${d === 0 ? '<b>balanced</b>' : d > 0 ? `rice heavier by ${d} g` : `weights heavier by ${-d} g`}`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Cups to fill', gen(R) { const g = R.int(2, 10), j = R.int(2, 5); return { q: `A jug fills ${g} glasses. How many glasses do ${j} jugs fill?`, a: String(g * j), ans: g * j }; } },
      { title: 'Litres and millilitres', gen(R) { const L = R.int(1, 9); return R.chance(.5) ? { q: `${L} L = ? mL`, a: `${L * 1000} mL`, ans: L * 1000 } : { q: `${L * 1000} mL = ? L`, a: `${L} L`, ans: L }; } },
      { title: 'Kilograms and grams', gen(R) { const k = R.int(1, 9); return R.chance(.5) ? { q: `${k} kg = ? g`, a: `${k * 1000} g`, ans: k * 1000 } : { q: `${k * 1000} g = ? kg`, a: `${k} kg`, ans: k }; } },
      { title: 'Choose the unit', levels: [1, 2], gen(R) { const items = [['water in a bucket', 'litres'], ['a spoon of medicine', 'millilitres'], ['a sack of rice', 'kilograms'], ['a pencil', 'grams'], ['a watermelon', 'kilograms']]; const [q, a] = R.pick(items); return { q: `Which unit for ${q}?`, a }; } },
      { title: 'Balance problems', levels: [3], gen(R) { const a = R.int(1, 4) * 500, b = R.int(1, 4) * 250; return { q: `A bag weighs ${a + b} g. One weight of ${a} g is on the other pan. How much more is needed to balance?`, a: `${b} g`, ans: b }; } }
    ],
    quiz: [
      { q: '1 L =', o: ['1000 mL', '100 mL', '10 mL', '500 mL'], a: 0, e: 'Thousand.' }, { q: '1 kg =', o: ['1000 g', '100 g', '10 g', '1 g'], a: 0, e: 'Thousand.' },
      { q: 'Unit for a bucket of water', o: ['litres', 'grams', 'cm', 'hours'], a: 0, e: 'Capacity.' }, { q: 'Unit for a sack of rice', o: ['kg', 'mL', 'cm', 'L'], a: 0, e: 'Weight.' },
      { q: 'The heavier pan', o: ['goes down', 'goes up', 'stays level', 'tips over'], a: 0, e: 'Down.' }, { q: '3 kg =', o: ['3000 g', '300 g', '30 g', '3 g'], a: 0, e: '× 1000.' },
      { q: 'Jug = 4 glasses; 3 jugs', o: ['12 glasses', '7 glasses', '4 glasses', '34'], a: 0, e: '4 × 3.' }, { q: 'Taller container always holds more?', o: ['no', 'yes', 'only bottles', 'only cups'], a: 0, e: 'Width matters.' },
      { q: '500 g + 500 g =', o: ['1 kg', '1000 kg', '10 kg', '100 g'], a: 0, e: '1000 g.' }, { q: 'A spoon of syrup is measured in', o: ['mL', 'L', 'kg', 'm'], a: 0, e: 'Small amount.' },
      { q: '2000 mL =', o: ['2 L', '20 L', '200 L', '0.2 L'], a: 0, e: '÷ 1000.' }
    ],
    teach: {
      outcomes: ['Compare and measure capacity', 'Compare and measure weight', 'Use L, mL, kg, g'],
      periods: [{ t: 'Filling', flow: [['15 min', 'Water play: cups into bottles.'], ['15 min', 'Explore panel 1.'], ['10 min', 'Units.']] }, { t: 'Lifting', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Kitchen scale readings.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Tall = more.', 'Big = heavier.'], activities: ['Water station.', 'Hanger balance.'],
      exit: ['4 L in mL.', 'Unit for an apple?', 'Which pan goes down?'], homework: 'Read the weight or capacity printed on 5 packets at home.'
    },
    slides: [{ t: 'Filling and Lifting', b: ['Capacity: L, mL', 'Weight: kg, g', 'Balance'] }, { t: 'Check yourself', b: ['5 kg in g?', 'Unit for juice in a glass?'] }],
    fs: { groups: [['Capacity', [['1 L', '1000 mL'], ['Big', 'L'], ['Small', 'mL']]], ['Weight', [['1 kg', '1000 g'], ['Big', 'kg'], ['Small', 'g'], ['Balance', 'heavier goes down']]]],
      ex: [['2 L 500 mL', '2500 mL'], ['3500 g', '3 kg 500 g']], rem: ['Use the same cup to compare.', '1000 links small and big units.', 'Read the scale carefully.'] }
  });
})();
