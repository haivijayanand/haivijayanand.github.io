/*
TOOL:    class8_science_ch04
FAMILY:  CBSE_REVISION / Class 8 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 4 Electricity: Magnetic and Heating Effects (current, heating effect, fuse and MCB, electric appliances, magnetic effect, electromagnets, uses, safety) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 4, part: 'All chapters', short: 'Effects of current', title: 'Electricity: Magnetic and Heating Effects',
    blurb: 'Electric current and circuits revisited, the heating effect (heaters, irons, bulbs, fuses and MCBs), the magnetic effect (deflection of a compass near a current-carrying wire, Ørsted), electromagnets and their uses (cranes, bells, motors), and electrical safety.',
    revise: {
      oneLine: 'A current-carrying wire gets hot — the heating effect, used in heaters, irons, kettles and fuses (a thin wire that melts when current is too large; MCBs switch off automatically). A current-carrying wire also behaves like a magnet — the magnetic effect; a coil wound on an iron core becomes an electromagnet whose strength grows with more turns and more current, and which stops being a magnet when switched off.',
      sections: [
        { h: 'Heating effect', html: `<p>Heater elements use nichrome (high resistance, high melting point). Filament bulbs waste much energy as heat; LEDs are efficient. Too many appliances on one socket can overheat wires.</p>` },
        { h: 'Magnetic effect', html: `<p>Ørsted (1820) saw a compass needle deflect near a wire carrying current. Reversing the current reverses the deflection.</p>` },
        { h: 'Electromagnets', html: `<p>Used in cranes lifting scrap iron, electric bells, loudspeakers, motors, MRI machines and maglev trains. Can be switched on/off and made stronger.</p>` }
      ],
      formulas: [['Heating effect', 'current → heat'], ['Fuse', 'melts on overload'], ['Electromagnet strength', '↑ turns, ↑ current, iron core'], ['Magnetic effect', 'current → magnetism'], ['Energy (kWh)', 'power (kW) × time (h)']],
      terms: [['Fuse', 'safety wire that melts on excess current'], ['MCB', 'miniature circuit breaker — switch that trips'], ['Electromagnet', 'temporary magnet made by current']],
      traps: ['A fuse is joined in series in the live wire.', 'An electromagnet loses most magnetism when current stops.', 'Never replace a fuse with a thick copper wire.'],
      bridge: '<p>Class 10 covers Ohm’s law, power and electromagnetism.</p>'
    },
    explore: [
      { title: 'Electromagnet strength', intro: 'Change the turns and the number of cells; see roughly how many pins it lifts (illustrative).',
        build(el, K) { let n = 20, c = 1, core = 1; const row = K.row(el); K.slider(row, 'turns', 10, 60, 10, n, v => { n = v; draw(); }); K.slider(row, 'cells', 1, 4, 1, c, v => { c = v; draw(); }); const s = K.select(row, 'core', ['none (air)', 'iron nail'], i => { core = i; draw(); }); s.value = 1; const rd = K.read(el);
          function draw() { const pins = Math.round((core ? 1 : 0.08) * n * c / 4); rd.innerHTML = `${n} turns × ${c} cell${c > 1 ? 's' : ''} ${core ? 'on an iron nail' : 'with no core'} → lifts about <b>${pins}</b> pin${pins === 1 ? '' : 's'} <span style="font-size:22px">${'📌'.repeat(Math.min(pins, 30))}</span><br>more turns, more current and an iron core → stronger`; } draw(); return null; } },
      { title: 'Electricity bill', intro: 'Set appliance power and hours of use per day; see units (kWh) used in 30 days.',
        build(el, K) { const A = [['LED bulb', 9], ['ceiling fan', 75], ['television', 100], ['electric iron', 1000], ['room heater', 2000], ['geyser', 2000]]; let k = 1, h = 8; const row = K.row(el); K.select(row, 'appliance', A.map(a => `${a[0]} (${a[1]} W)`), i => { k = i; draw(); }); K.slider(row, 'hours/day', 0.5, 12, 0.5, h, v => { h = v; draw(); }); const rd = K.read(el);
          function draw() { const kwh = A[k][1] / 1000 * h * 30; rd.innerHTML = `${A[k][1]} W × ${h} h × 30 days = <b>${(+kwh.toFixed(1))} kWh (units)</b> per month · heating appliances use the most`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Units used', gen(R) { const p = R.pick([60, 100, 500, 1000, 1500, 2000]), h = R.int(1, 6), d = R.pick([1, 10, 30]); const u = p / 1000 * h * d; return { q: `A ${p} W appliance runs ${h} h a day for ${d} day${d > 1 ? 's' : ''}. Energy in kWh?`, a: `${+u.toFixed(2)} kWh`, ans: u, tol: 0.01 }; } },
      { title: 'Bill', levels: [2, 3], gen(R) { const u = R.int(50, 300), r = R.int(4, 8); return { q: `A home uses ${u} units in a month at ₹${r} per unit. Bill?`, a: `₹${u * r}`, ans: u * r }; } },
      { title: 'Effect used', gen(R) { return G9.S9.groupQ(R, [['electric iron', 0], ['electric bell', 1], ['fuse', 0], ['crane lifting scrap', 1], ['toaster', 0], ['loudspeaker', 1]], ['heating effect', 'magnetic effect'], 'Mainly uses: '); } },
      { title: 'Electromagnet', gen(R) { return G9.S9.pickQ(R, [['Two ways to make an electromagnet stronger?', 'more turns, more current (cells), iron core'], ['What happens when current stops?', 'it loses its magnetism'], ['Who discovered the magnetic effect of current?', 'Hans Christian Ørsted'], ['Why is iron used as a core?', 'it is easily magnetised and demagnetised']]); } },
      { title: 'Safety', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why is a fuse wire thin?', 'so it melts quickly when current is too high'], ['What is an MCB?', 'a switch that trips on overload; reset instead of replacing'], ['Why not plug many heaters into one socket?', 'too much current overheats wires'], ['Material of heater element?', 'nichrome']]); } }
    ],
    quiz: [
      { q: 'Fuse works on', o: ['heating effect', 'magnetic effect', 'chemical effect', 'light'], a: 0, e: 'Melts.' }, { q: 'Ørsted discovered', o: ['magnetic effect of current', 'gravity', 'electrons', 'light'], a: 0, e: '1820.' },
      { q: 'Electromagnet core', o: ['soft iron', 'copper', 'plastic', 'wood'], a: 0, e: 'Iron.' }, { q: 'More turns', o: ['stronger electromagnet', 'weaker', 'no change', 'reverse'], a: 0, e: 'Stronger.' },
      { q: 'Heater element', o: ['nichrome', 'copper', 'aluminium', 'glass'], a: 0, e: 'Alloy.' }, { q: '1000 W for 2 h', o: ['2 kWh', '2000 kWh', '0.5 kWh', '1 kWh'], a: 0, e: '1 × 2.' },
      { q: 'Electric bell uses', o: ['electromagnet', 'fuse', 'heater', 'LED'], a: 0, e: 'Magnet.' }, { q: 'MCB', o: ['trips on overload', 'melts', 'lights', 'stores'], a: 0, e: 'Switch.' },
      { q: 'Switched off electromagnet', o: ['loses magnetism', 'stays strong', 'heats', 'explodes'], a: 0, e: 'Temporary.' }, { q: 'Efficient lighting', o: ['LED', 'filament bulb', 'heater', 'candle'], a: 0, e: 'Less heat.' },
      { q: 'Compass near current wire', o: ['deflects', 'stays still always', 'melts', 'glows'], a: 0, e: 'Magnetic.' }
    ],
    teach: {
      outcomes: ['Explain heating and magnetic effects', 'Build an electromagnet', 'Calculate energy in kWh'],
      periods: [{ t: 'Heating effect', flow: [['10 min', 'Appliance hunt.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Fuse demo (teacher).']] }, { t: 'Magnetic effect', flow: [['15 min', 'Compass near wire.'], ['15 min', 'Explore panel 1 / make electromagnet.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Thicker fuse is safer.', 'Electromagnets are permanent.'], activities: ['Nail electromagnet.', 'Home bill analysis.'],
      exit: ['Two uses of each effect.', 'Strengthen an electromagnet.', 'kWh calculation.'], homework: 'Read your electricity bill: units used and cost per unit.'
    },
    slides: [{ t: 'Magnetic and Heating Effects', b: ['Heating effect', 'Fuse and MCB', 'Magnetic effect', 'Electromagnets'] }, { t: 'Think and share', b: ['Why a thin fuse wire?', 'Make an electromagnet stronger?'] }],
    fs: { groups: [['Heating', [['Uses', 'iron, heater, kettle'], ['Element', 'nichrome'], ['Fuse', 'melts on overload']]], ['Magnetic', [['Ørsted', '1820'], ['Electromagnet', 'coil + iron'], ['Stronger', 'turns, current']]], ['Energy', [['kWh', 'kW × h'], ['Bill', 'units × rate']]]],
      ex: [['1500 W × 2 h × 30', '90 kWh'], ['120 units × ₹6', '₹720']], rem: ['Never bypass a fuse.', 'Iron core helps.', 'Save energy.'] }
  });
})();
