/*
TOOL:    class7_science_ch03
FAMILY:  CBSE_REVISION / Class 7 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 3 Electricity: Circuits and their Components (cell, battery, bulb, switch, symbols, closed and open circuits, conductors and insulators, series cells) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 3, part: 'All chapters', short: 'Circuits', title: 'Electricity: Circuits and their Components',
    blurb: 'Electric cells and batteries, the parts of a torch bulb, switches, circuit symbols and diagrams, closed and open circuits, conductors and insulators, and joining cells to make a battery; with electrical safety.',
    revise: {
      oneLine: 'A cell has a positive (+) and negative (−) terminal. Current flows only in a closed circuit — a complete path from + to − through wires, switch and bulb. An open switch breaks the path. Conductors (metals) let current pass; insulators (plastic, rubber, wood) do not. Cells joined + to − make a battery with a larger voltage (1.5 V each).',
      sections: [
        { h: 'Symbols', html: `<p>Cell: long line (+) and short line (−). Battery: several cells. Switch: open gap or closed. Bulb: circle with a cross or filament loop. Wires: straight lines.</p>` },
        { h: 'Bulb', html: `<p>A torch bulb has a thin filament joined to two terminals; if the filament breaks (fused bulb), the circuit is open.</p>` },
        { h: 'Safety', html: `<p>Never touch mains sockets or use wet hands; experiment only with cells. Electric wires are covered with insulating plastic.</p>` }
      ],
      formulas: [['One cell', '1.5 V'], ['n cells in series', 'n × 1.5 V'], ['Closed circuit', 'bulb glows'], ['Open circuit', 'no current'], ['Conductors', 'metals']],
      terms: [['Circuit', 'complete path for current'], ['Switch', 'opens or closes a circuit'], ['Insulator', 'does not let current pass']],
      traps: ['Cells must be joined + to −; reversed cells cancel.', 'A fused bulb will not glow even in a closed circuit.', 'Pure water conducts poorly, but tap water conducts — keep electricity away from water.'],
      bridge: '<p>Class 8 and 10 study electric current, resistance and its effects.</p>'
    },
    explore: [
      { title: 'Build a circuit', intro: 'Close the switch, add cells, and test materials in the gap.',
        build(el, K) { let sw = 1, n = 2, m = 0; const MAT = [['copper wire', 1], ['iron nail', 1], ['aluminium foil', 1], ['plastic scale', 0], ['rubber eraser', 0], ['wooden stick', 0], ['pencil lead (graphite)', 1], ['glass', 0]]; const row = K.row(el); K.button(row, 'toggle switch', () => { sw ^= 1; b.redraw(); }); K.slider(row, 'cells', 1, 4, 1, n, v => { n = v; b.redraw(); }); K.select(row, 'in the gap', MAT.map(x => x[0]), v => { m = v; b.redraw(); }); const b = new K.Board(el, { xmin: -5, xmax: 5, ymin: -2.6, ymax: 2.6, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const on = sw && MAT[m][1]; const wc = on ? C.orange : C.ink; b.line(-4, 2, -3.6, 2, { color: wc, w: 3 }); b.line(-3.35 + (n - 1) * 0.6, 2, 4, 2, { color: wc, w: 3 }); b.line(4, 2, 4, -2, { color: wc, w: 3 }); b.line(-4, -2, -4, 2, { color: wc, w: 3 });
            for (let i = 0; i < n; i++) { const x = -3.6 + i * 0.6; b.line(x, 2.5, x, 1.5, { color: C.ink, w: 3 }); b.line(x + 0.25, 2.25, x + 0.25, 1.75, { color: C.ink, w: 5 }); if (i < n - 1) b.line(x + 0.25, 2, x + 0.6, 2, { color: wc, w: 3 }); } b.text(-4.4, 2.4, '+', { font: 'bold 14px' });
            b.line(-4, -2, -2.4, -2, { color: wc, w: 3 }); b.dot(-2.4, -2, { r: 4, color: C.ink }); b.line(-2.4, -2, -1.2, sw ? -2 : -1.2, { color: C.ink, w: 3 }); b.dot(-1.2, -2, { r: 4, color: C.ink }); b.text(-1.8, -2.5, sw ? 'switch ON' : 'switch OFF', { font: '11px' });
            b.line(-1.2, -2, 0.2, -2, { color: wc, w: 3 }); b.rect(0.2, -2.25, 1.6, 0.5, { fill: MAT[m][1] ? '#cbd5e1' : '#fde68a', color: C.ink, w: 1.5 }); b.text(1, -1.5, MAT[m][0], { font: '11px' }); b.line(1.8, -2, 4, -2, { color: wc, w: 3 });
            b.circle(4, 0, 0.5, { fill: on ? `rgba(250,204,21,${0.3 + 0.17 * n})` : '#fff', color: C.ink, w: 2 }); b.line(3.65, -0.35, 4.35, 0.35, { color: C.ink, w: 1.5 }); b.line(3.65, 0.35, 4.35, -0.35, { color: C.ink, w: 1.5 });
            rd.innerHTML = `${n} cell${n > 1 ? 's' : ''} = <b>${(1.5 * n).toFixed(1)} V</b> · ${!sw ? 'switch open → <b>open circuit</b>, bulb off' : MAT[m][1] ? `${MAT[m][0]} is a <b>conductor</b> → bulb glows${n > 2 ? ' brightly' : ''}` : `${MAT[m][0]} is an <b>insulator</b> → open circuit, bulb off`}`; };
          b.redraw(); return null; } },
      { title: 'Conductor or insulator?', intro: 'Sort.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Conductor', 'Insulator'], items: [['steel spoon', 0], ['rubber glove', 1], ['copper wire', 0], ['plastic comb', 1], ['graphite (pencil lead)', 0, 'a non-metal that conducts'], ['dry wood', 1], ['aluminium foil', 0], ['glass rod', 1], ['cotton thread', 1]] }); } }
    ],
    gens: [
      { title: 'Battery voltage', gen(R) { const n = R.int(2, 6); return { q: `${n} cells of 1.5 V are joined + to −. Total voltage?`, a: `${+(1.5 * n).toFixed(1)} V`, ans: 1.5 * n, tol: 0.01 }; } },
      { title: 'Cells needed', levels: [2, 3], gen(R) { const v = R.pick([3, 4.5, 6, 9]); return { q: `How many 1.5 V cells make a ${v} V battery?`, a: String(v / 1.5), ans: v / 1.5 }; } },
      { title: 'Conductor?', gen(R) { return G9.S9.groupQ(R, [['iron key', 0], ['plastic bottle cap', 1], ['silver coin', 0], ['rubber band', 1], ['pencil lead', 0], ['paper', 1]], ['conductor', 'insulator'], 'Conductor or insulator: '); } },
      { title: 'Will it glow?', gen(R) { return G9.S9.pickQ(R, [['Switch open, new cell, good bulb. Glows?', 'no — open circuit'], ['Switch closed, filament broken. Glows?', 'no — fused bulb breaks the path'], ['Switch closed, rubber band in the gap. Glows?', 'no — rubber is an insulator'], ['Switch closed, iron nail in the gap. Glows?', 'yes — iron conducts']]); } },
      { title: 'Safety and symbols', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['In a cell symbol, which line is +?', 'the longer line'], ['Why are wires covered in plastic?', 'plastic is an insulator; prevents shocks'], ['Why never touch switches with wet hands?', 'water can conduct current to the body'], ['Why do electricians wear rubber gloves?', 'rubber is an insulator']]); } }
    ],
    quiz: [
      { q: 'One cell', o: ['1.5 V', '15 V', '220 V', '0.5 V'], a: 0, e: 'Dry cell.' }, { q: 'Bulb glows in', o: ['closed circuit', 'open circuit', 'no circuit', 'broken wire'], a: 0, e: 'Complete path.' },
      { q: 'Insulator', o: ['rubber', 'copper', 'iron', 'aluminium'], a: 0, e: 'Rubber.' }, { q: 'Long line in cell symbol', o: ['+', '−', 'switch', 'bulb'], a: 0, e: 'Positive.' },
      { q: '4 cells in series', o: ['6 V', '4 V', '1.5 V', '8 V'], a: 0, e: '4 × 1.5.' }, { q: 'Switch', o: ['opens/closes circuit', 'makes current', 'stores energy', 'is a bulb'], a: 0, e: 'Control.' },
      { q: 'Graphite is', o: ['a conductor', 'an insulator', 'a metal', 'a gas'], a: 0, e: 'Pencil lead.' }, { q: 'Fused bulb', o: ['filament broken', 'too bright', 'new', 'switch'], a: 0, e: 'Broken.' },
      { q: 'Experiments at school use', o: ['cells', 'mains socket', 'lightning', 'wet wires'], a: 0, e: 'Safe.' }, { q: 'Battery means', o: ['cells joined together', 'one bulb', 'a switch', 'a wire'], a: 0, e: 'Cells.' },
      { q: 'Plastic on wires', o: ['insulates', 'conducts', 'lights', 'heats'], a: 0, e: 'Safety.' }
    ],
    teach: {
      outcomes: ['Draw circuits with symbols', 'Identify conductors and insulators', 'Combine cells safely'],
      periods: [{ t: 'Circuits', flow: [['10 min', 'Torch dismantling.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Real circuit with bulb.']] }, { t: 'Materials', flow: [['15 min', 'Conductor tester.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Current used up in the bulb.', 'All non-metals insulate.'], activities: ['Conductor tester.', 'Draw circuit diagrams.'],
      exit: ['Symbols.', 'Open vs closed.', '3 cells voltage.'], homework: 'Draw the circuit of a torch using symbols.'
    },
    slides: [{ t: 'Electricity: Circuits', b: ['Cells and batteries', 'Symbols', 'Open and closed circuits', 'Conductors and insulators'] }, { t: 'Think and share', b: ['Why does a fused bulb not glow?', 'Is graphite a conductor?'] }],
    fs: { groups: [['Parts', [['Cell', '+ long, − short, 1.5 V'], ['Battery', 'cells + to −'], ['Switch', 'open/closed'], ['Bulb', 'filament']]], ['Circuit', [['Closed', 'current flows'], ['Open', 'no current']]], ['Materials', [['Conductors', 'metals, graphite'], ['Insulators', 'plastic, rubber, wood, glass']]]],
      ex: [['4 cells', '6 V'], ['9 V battery', '6 cells']], rem: ['Complete path.', 'Join + to −.', 'Stay safe from mains.'] }
  });
})();
