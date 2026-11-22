/*
TOOL:    class4_science_ch07
FAMILY:  CBSE_REVISION / Class 4 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 7 How Things Work (simple machines: lever, wheel, pulley, inclined plane; how a bicycle, tap and hand pump work) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 7, part: 'Unit 4 · Things Around Us', short: 'How things work', title: 'How Things Work',
    blurb: 'Simple machines that make work easier — lever (see-saw, scissors), wheel and axle, pulley (well), inclined plane (ramp) — and how everyday things like a bicycle, a hand pump and a tap work.',
    revise: {
      oneLine: 'Simple machines help us lift, move or cut with less effort. A lever turns on a point (fulcrum) — a longer handle needs less push. Wheels roll easily; a pulley lets us pull down to lift up; a ramp lets us push a load up slowly instead of lifting it straight up.',
      sections: [
        { h: 'Lever', html: `<p>See-saw, scissors, bottle opener, crowbar. Push far from the fulcrum to lift a heavy load near it.</p>` },
        { h: 'Wheel, pulley, ramp', html: `<p>Wheels on carts and bicycles; a pulley on a well; ramps for wheelchairs and loading trucks.</p>` },
        { h: 'Everyday machines', html: `<p>Bicycle: pedals turn a gear, the chain turns the back wheel. Hand pump: the handle (a lever) pushes a piston that lifts water.</p>` }
      ],
      formulas: [['Lever', 'load, fulcrum, effort'], ['Longer arm', 'less effort'], ['Pulley', 'pull down to lift up'], ['Ramp', 'longer path, less push'], ['Wheel', 'less rubbing (friction)']],
      terms: [['Fulcrum', 'turning point of a lever'], ['Effort', 'push or pull we give'], ['Load', 'thing we lift or move']],
      traps: ['A ramp does not make the load lighter; it spreads the effort over a longer path.', 'Scissors are two levers joined at a fulcrum.', 'Keep fingers away from moving parts.'],
      bridge: '<p>Ch 8 shows how things are made in steps.</p>'
    },
    explore: [
      { title: 'See-saw lever', intro: 'Move the fulcrum; see how much effort lifts a 30 kg load.',
        build(el, K) { let f = 3; const row = K.row(el); K.slider(row, 'fulcrum position', 1, 7, 0.5, f, v => { f = v; b.redraw(); }); const b = new K.Board(el, { xmin: -0.5, xmax: 8.5, ymin: -1, ymax: 2.5, axes: false, grid: 0, aspect: 0.32 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.line(0, 0.8, 8, 0.8, { color: '#92400e', w: 8 }); b.poly([[f - 0.4, -0.6], [f + 0.4, -0.6], [f, 0.7]], { fill: C.orangeL, color: C.orange, w: 2 }); b.text(0.4, 1.5, '📦 30 kg', { font: '16px' }); b.text(7.6, 1.5, '✋', { font: '22px' });
            const eff = 30 * f / (8 - f); rd.innerHTML = `load arm ${f} · effort arm ${8 - f} · effort needed ≈ <b>${eff.toFixed(1)} kg</b> ${eff < 30 ? '(less than the load — easier!)' : eff > 30 ? '(more than the load — harder)' : '(same as the load)'}`; };
          b.redraw(); return null; } },
      { title: 'Which simple machine?', intro: 'Sort the tools.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Lever', 'Wheel and axle', 'Pulley', 'Inclined plane (ramp)'], items: [['scissors', 0], ['bottle opener', 0], ['see-saw', 0], ['bullock cart wheel', 1], ['steering wheel', 1], ['well rope over a wheel', 2], ['flag rope on a pole', 2], ['wheelchair ramp', 3], ['slide in a park', 3]] }); } }
    ],
    gens: [
      { title: 'Simple machine', gen(R) { return G9.S9.groupQ(R, [['crowbar', 0], ['nutcracker', 0], ['bicycle wheel', 1], ['well pulley', 2], ['ramp to a truck', 3], ['screwdriver handle', 1]], ['lever', 'wheel and axle', 'pulley', 'inclined plane'], 'Which simple machine: '); } },
      { title: 'Lever effort', levels: [2, 3], gen(R) { const L = R.pick([20, 30, 40, 60]), a = R.int(1, 3), b = R.pick([2, 3, 4, 6]) * a; return { q: `A load of ${L} kg is ${a} m from the fulcrum. You push ${b} m from the fulcrum on the other side. Effort needed?`, a: `${L * a / b} kg`, ans: L * a / b }; } },
      { title: 'How it works', gen(R) { return G9.S9.pickQ(R, [['What turns the back wheel of a bicycle?', 'the chain, turned by the pedals'], ['Which part of a hand pump is a lever?', 'the handle'], ['How does a pulley help at a well?', 'we pull down to lift the bucket up'], ['Why do carts have wheels?', 'wheels roll and reduce rubbing']]); } },
      { title: 'Parts of a lever', gen(R) { return G9.S9.pickQ(R, [['The turning point of a lever is the?', 'fulcrum'], ['The push we give is the?', 'effort'], ['The thing being lifted is the?', 'load'], ['Where should you push to need the least effort?', 'far from the fulcrum']]); } },
      { title: 'Safety', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why keep fingers away from a bicycle chain?', 'they can get caught and hurt'], ['How should you carry scissors?', 'closed, points down']]); } }
    ],
    quiz: [
      { q: 'Scissors are a', o: ['lever', 'pulley', 'ramp', 'wheel'], a: 0, e: 'Fulcrum.' }, { q: 'Turning point of a lever', o: ['fulcrum', 'load', 'effort', 'axle'], a: 0, e: 'Pivot.' },
      { q: 'Well bucket uses a', o: ['pulley', 'lever', 'ramp', 'screw'], a: 0, e: 'Pulley.' }, { q: 'Wheelchair ramp is an', o: ['inclined plane', 'lever', 'pulley', 'wheel'], a: 0, e: 'Slope.' },
      { q: 'Least effort when pushing', o: ['far from the fulcrum', 'at the fulcrum', 'near the load', 'anywhere'], a: 0, e: 'Long arm.' }, { q: 'Bicycle back wheel is turned by', o: ['the chain', 'the bell', 'the seat', 'the brake'], a: 0, e: 'Chain.' },
      { q: 'Hand pump handle is a', o: ['lever', 'pulley', 'ramp', 'wheel'], a: 0, e: 'Lever.' }, { q: 'Wheels help by', o: ['reducing rubbing', 'adding weight', 'stopping motion', 'nothing'], a: 0, e: 'Friction.' },
      { q: 'A ramp makes the load', o: ['easier to raise, not lighter', 'lighter', 'heavier', 'disappear'], a: 0, e: 'Longer path.' }, { q: 'Bottle opener is a', o: ['lever', 'pulley', 'wheel', 'ramp'], a: 0, e: 'Lever.' },
      { q: '30 kg load at 1 m, effort at 3 m', o: ['10 kg', '30 kg', '90 kg', '3 kg'], a: 0, e: '30 × 1 ÷ 3.' }
    ],
    teach: {
      outcomes: ['Identify simple machines', 'Explain how a lever reduces effort', 'Describe how a bicycle and hand pump work'],
      periods: [{ t: 'Levers', flow: [['10 min', 'Ruler-and-pencil lever.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Lever hunt at home items.']] }, { t: 'Other machines', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Look at a bicycle.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Ramps make loads lighter.', 'Machines do work by themselves.'], activities: ['Ruler lever with coins.', 'Toy car on a ramp.'],
      exit: ['Name the 3 parts of a lever.', 'One pulley example.', 'How a bicycle moves.'], homework: 'Find 5 simple machines at home and name each type.'
    },
    slides: [{ t: 'How Things Work', b: ['Levers', 'Wheels and pulleys', 'Ramps', 'Bicycle and hand pump'] }, { t: 'Think and share', b: ['Where is the fulcrum in scissors?', 'Why does a ramp help?'] }],
    fs: { groups: [['Lever', [['Parts', 'load, fulcrum, effort'], ['Long effort arm', 'less effort'], ['Examples', 'see-saw, scissors, opener']]], ['Others', [['Wheel', 'cart, bicycle'], ['Pulley', 'well, flagpole'], ['Ramp', 'wheelchair ramp, slide']]], ['Everyday', [['Bicycle', 'pedal → chain → wheel'], ['Hand pump', 'lever handle lifts water']]]],
      ex: [['30 kg at 1 m, push at 3 m', '10 kg effort'], ['Well', 'pulley']], rem: ['Push far from the fulcrum.', 'Machines make work easier, not less.', 'Mind moving parts.'] }
  });
})();
