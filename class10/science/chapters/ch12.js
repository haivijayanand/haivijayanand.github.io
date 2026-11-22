/*
TOOL:    class10_science_ch12
FAMILY:  CBSE_REVISION / Class 10 Science (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 12 Magnetic Effects of Electric Current (magnetic field and field lines, straight wire, loop, solenoid, right-hand thumb rule, electromagnet, force on conductor, Fleming’s left-hand rule, motor idea, domestic circuits, earthing, fuse, MCB) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 12, part: 'All chapters', short: 'Magnetic effects', title: 'Magnetic Effects of Electric Current',
    blurb: 'Magnetic field and field lines; field of a straight conductor (right-hand thumb rule), circular loop and solenoid; electromagnets; force on a current-carrying conductor in a magnetic field and Fleming’s left-hand rule (basis of the motor); domestic electric circuits — live, neutral and earth wires, fuse, MCB, overloading and short circuit.',
    revise: {
      oneLine: 'A current-carrying wire produces a magnetic field of concentric circles; the right-hand thumb rule gives its direction (thumb along current, curled fingers along field). A solenoid’s field is like a bar magnet’s and nearly uniform inside; with a soft iron core it becomes an electromagnet. A conductor carrying current across a field feels a force: Fleming’s left-hand rule — First finger Field, seCond finger Current, thuMb Motion. Home circuits use live (red/brown), neutral (black/blue) and earth (green) wires, connected in parallel with fuses/MCBs for safety.',
      sections: [
        { h: 'Field lines', html: `<p>Outside a magnet from N to S; never cross; closer lines = stronger field.</p>` },
        { h: 'Force', html: `<p>Force is largest when current is perpendicular to the field and zero when parallel. Reversing current or field reverses the force.</p>` },
        { h: 'Safety', html: `<p>Earthing gives leakage current a low-resistance path to the ground. Overloading (too many appliances) and short circuit (live touches neutral) cause large currents — the fuse melts / MCB trips. India supply: 220 V, 50 Hz AC.</p>` }
      ],
      formulas: [['Thumb rule', 'thumb = current, fingers = field'], ['Fleming LHR', 'Field, Current, Motion'], ['Solenoid', 'like bar magnet'], ['Supply', '220 V, 50 Hz'], ['Fuse', 'in series with live wire']],
      terms: [['Solenoid', 'long coil of insulated wire'], ['Electromagnet', 'solenoid with a soft iron core'], ['Earthing', 'connecting metal bodies to the ground']],
      traps: ['Field lines never intersect.', 'Force is zero when current is parallel to the field.', 'Fuse goes in the live wire, not neutral.'],
      bridge: '<p>Class 12 Physics: moving charges and magnetism, electromagnetic induction.</p>'
    },
    explore: [
      { title: 'Fleming’s left-hand rule', intro: 'Choose field and current directions; see the force on the wire.',
        build(el, K) { const DIR = { '→ right': [1, 0, 0], '← left': [-1, 0, 0], '↑ up': [0, 1, 0], '↓ down': [0, -1, 0], '⊙ out of page': [0, 0, 1], '⊗ into page': [0, 0, -1] }; const N = Object.keys(DIR); let fi = 4, ci = 0; const row = K.row(el); const s1 = K.select(row, 'field B', N, i => { fi = i; draw(); }); s1.value = 4; K.select(row, 'current I', N, i => { ci = i; draw(); }); const rd = K.read(el);
          function draw() { const B = DIR[N[fi]], I = DIR[N[ci]]; const Fv = [I[1] * B[2] - I[2] * B[1], I[2] * B[0] - I[0] * B[2], I[0] * B[1] - I[1] * B[0]]; const nm = N.find(n => DIR[n].every((x, j) => x === Fv[j])); rd.innerHTML = nm ? `force F = I × B → <b>${nm}</b> (First finger Field, seCond finger Current, thuMb Motion)` : '<b>no force</b> — current is parallel to the field'; } draw(); return null; } },
      { title: 'Home circuit safety', intro: '<kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Supply', 'Live (red/brown, 220 V) and neutral (black/blue, 0 V) enter through the meter.'], ['Main fuse / MCB', 'Breaks the circuit if current is too large.'], ['Parallel circuits', 'Each room/appliance gets 220 V and has its own switch.'], ['Earth wire', 'Green wire connects metal bodies to a buried plate — leakage goes to earth, not through you.'], ['Overload', 'Too many appliances → large current → fuse melts / MCB trips.'], ['Short circuit', 'Live touches neutral → resistance tiny, current huge → protection acts.']] }); } }
    ],
    gens: [
      { title: 'Rules', gen(R) { return G9.S9.pickQ(R, [['Rule for direction of field around a straight wire?', 'right-hand thumb rule'], ['Rule for force on a conductor in a field?', 'Fleming’s left-hand rule'], ['In Fleming’s rule, what does the thumb show?', 'motion/force'], ['Field inside a long solenoid?', 'nearly uniform, parallel lines']]); } },
      { title: 'Wires', gen(R) { return G9.S9.groupQ(R, [['red or brown insulation', 0], ['black or blue insulation', 1], ['green insulation', 2]], ['live', 'neutral', 'earth'], 'Wire with '); } },
      { title: 'Current drawn', levels: [2, 3], gen(R) { const P = [R.pick([100, 200, 500]), R.pick([1000, 1500, 2000])]; const I = (P[0] + P[1]) / 220; return { q: `Appliances of ${P[0]} W and ${P[1]} W run together on 220 V. Total current? Is a 5 A fuse enough?`, a: `${(+I.toFixed(2))} A — ${I > 5 ? 'no, it will blow' : 'yes'}`, ans: I, tol: 0.01 }; } },
      { title: 'Electromagnet', gen(R) { return G9.S9.pickQ(R, [['Why soft iron core?', 'easily magnetised and demagnetised'], ['Two ways to strengthen a solenoid’s field?', 'more turns, more current (and iron core)'], ['How to reverse the poles of an electromagnet?', 'reverse the current'], ['Where is the field strongest near a bar magnet?', 'near the poles']]); } },
      { title: 'Safety', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['What is a short circuit?', 'live and neutral touch; current becomes very large'], ['What is overloading?', 'too many appliances drawing current from one circuit'], ['Why is earthing needed?', 'leakage current goes to earth, preventing shocks'], ['Frequency of AC in India?', '50 Hz']]); } }
    ],
    quiz: [
      { q: 'Thumb rule gives', o: ['field direction around wire', 'force', 'current value', 'voltage'], a: 0, e: 'Right hand.' }, { q: 'Fleming’s left-hand rule gives', o: ['force direction', 'field of wire', 'induced current', 'power'], a: 0, e: 'Motor.' },
      { q: 'Earth wire colour', o: ['green', 'red', 'black', 'blue'], a: 0, e: 'Earth.' }, { q: 'Fuse placed in', o: ['live wire', 'neutral', 'earth', 'any'], a: 0, e: 'Live.' },
      { q: 'Field lines', o: ['never cross', 'cross at poles', 'are straight always', 'start at S'], a: 0, e: 'Unique direction.' }, { q: 'Force zero when current', o: ['parallel to field', 'perpendicular', 'large', 'AC'], a: 0, e: 'Parallel.' },
      { q: 'AC frequency India', o: ['50 Hz', '60 Hz', '220 Hz', '100 Hz'], a: 0, e: '50.' }, { q: 'Solenoid behaves like', o: ['bar magnet', 'horseshoe always', 'no magnet', 'battery'], a: 0, e: 'Poles.' },
      { q: 'Electromagnet core', o: ['soft iron', 'steel', 'copper', 'plastic'], a: 0, e: 'Soft iron.' }, { q: 'Short circuit means', o: ['live touches neutral', 'too many bulbs', 'earth broken', 'low voltage'], a: 0, e: 'Huge current.' },
      { q: 'Field lines outside a magnet', o: ['N to S', 'S to N', 'none', 'random'], a: 0, e: 'Convention.' }
    ],
    teach: {
      outcomes: ['Apply the thumb and left-hand rules', 'Describe solenoids and electromagnets', 'Explain domestic circuit safety'],
      periods: [{ t: 'Fields', flow: [['10 min', 'Iron filings and compass around wire.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Solenoid and electromagnet.']] }, { t: 'Home circuits', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Fuse ratings calculation.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Fuse in neutral.', 'Field lines can cross.'], activities: ['Compass near wire (Ørsted).', 'Map a home circuit board (with adult).'],
      exit: ['Two rules.', 'Three wires.', 'Overload vs short circuit.'], homework: 'List appliances on one circuit at home and find the total current.'
    },
    slides: [{ t: 'Magnetic Effects of Current', b: ['Field lines', 'Wire, loop, solenoid', 'Force and Fleming’s rule', 'Domestic circuits'] }, { t: 'Think and share', b: ['Why earth metal bodies?', 'When is the force zero?'] }],
    fs: { groups: [['Fields', [['Straight wire', 'circles, thumb rule'], ['Solenoid', 'bar-magnet-like'], ['Lines', 'N → S, never cross']]], ['Force', [['Rule', 'Fleming LHR'], ['Max', 'I ⟂ B'], ['Zero', 'I ∥ B']]], ['Home', [['Live', 'red/brown'], ['Neutral', 'black/blue'], ['Earth', 'green'], ['Protection', 'fuse, MCB']]]],
      ex: [['1000 W + 100 W at 220 V', '5 A'], ['B out, I right', 'force down']], rem: ['Right hand for field.', 'Left hand for force.', 'Fuse in live.'] }
  });
})();
