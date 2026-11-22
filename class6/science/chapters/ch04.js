/*
TOOL:    class6_science_ch04
FAMILY:  CBSE_REVISION / Class 6 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 4 Exploring Magnets (magnetic and non-magnetic materials, poles, compass, attraction and repulsion, making magnets, care) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 4, part: 'All chapters', short: 'Magnets', title: 'Exploring Magnets',
    blurb: 'Magnetic and non-magnetic materials, the poles of a magnet, freely suspended magnets pointing north–south, the compass, like poles repelling and unlike attracting, making a magnet, and keeping magnets safe.',
    revise: {
      oneLine: 'Magnets attract iron, nickel and cobalt (magnetic materials), not wood, plastic, glass or aluminium. Every magnet has a north and a south pole; the pull is strongest at the poles. A freely hanging magnet points north–south — the basis of the compass. Like poles repel, unlike poles attract.',
      sections: [
        { h: 'Poles', html: `<p>Iron filings cluster at the ends (poles). Breaking a magnet gives two smaller magnets, each with N and S.</p>` },
        { h: 'Compass', html: `<p>A tiny magnetic needle that turns freely; its north pole points to geographic north. Used by sailors and travellers.</p>` },
        { h: 'Making and caring', html: `<p>Stroke an iron nail many times in one direction with one pole of a magnet. Store magnets with keepers; heating, hammering and dropping weaken them.</p>` }
      ],
      formulas: [['Magnetic', 'iron, nickel, cobalt'], ['Like poles', 'repel'], ['Unlike poles', 'attract'], ['Free magnet', 'points N–S'], ['Strongest', 'at the poles']],
      terms: [['Pole', 'end where magnetism is strongest'], ['Compass', 'instrument with a magnetic needle'], ['Repel', 'push away']],
      traps: ['Not all metals are magnetic (aluminium, copper, gold are not).', 'Repulsion, not attraction, is the sure test of a magnet.', 'There is no magnet with only one pole.'],
      bridge: '<p>Class 7 links magnets and electric current.</p>'
    },
    explore: [
      { title: 'Two bar magnets', intro: 'Flip either magnet; see attraction or repulsion.',
        build(el, K) { let a = 0, c = 0; const row = K.row(el); K.button(row, 'flip left magnet', () => { a ^= 1; b.redraw(); }); K.button(row, 'flip right magnet', () => { c ^= 1; b.redraw(); }); const b = new K.Board(el, { xmin: -6, xmax: 6, ymin: -1.5, ymax: 1.5, axes: false, grid: 0, aspect: 0.25 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const L = a ? ['N', 'S'] : ['S', 'N'], R = c ? ['N', 'S'] : ['S', 'N']; const face = [L[1], R[0]]; const att = face[0] !== face[1]; const gap = att ? 0.3 : 2.2;
            const bar = (x0, lab) => { b.rect(x0, -0.5, 2, 1, { fill: lab[0] === 'N' ? '#93c5fd' : '#fdba74', color: C.ink, w: 2 }); b.rect(x0 + 2, -0.5, 2, 1, { fill: lab[1] === 'N' ? '#93c5fd' : '#fdba74', color: C.ink, w: 2 }); b.text(x0 + 1, 0, lab[0], { font: 'bold 18px' }); b.text(x0 + 3, 0, lab[1], { font: 'bold 18px' }); };
            bar(-4 - gap / 2, L); bar(gap / 2, R); rd.innerHTML = `facing poles: ${face[0]} and ${face[1]} → <b>${att ? 'ATTRACT (unlike poles)' : 'REPEL (like poles)'}</b>`; };
          b.redraw(); return null; } },
      { title: 'Magnetic or not?', intro: 'Sort the objects.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Attracted by a magnet', 'Not attracted'], items: [['iron nail', 0], ['steel pin', 0, 'steel is mostly iron'], ['aluminium foil', 1, 'not all metals are magnetic'], ['copper wire', 1], ['plastic scale', 1], ['nickel coin (old)', 0], ['rubber eraser', 1], ['iron filings', 0], ['gold ring', 1]] }); } }
    ],
    gens: [
      { title: 'Attract or repel', gen(R) { const P = ['N', 'S']; const a = R.pick(P), b = R.pick(P); return { q: `The ${a} pole of one magnet is brought near the ${b} pole of another. What happens?`, a: a === b ? 'they repel (like poles)' : 'they attract (unlike poles)' }; } },
      { title: 'Magnetic?', gen(R) { return G9.S9.groupQ(R, [['iron key', 0], ['glass bottle', 1], ['steel spoon', 0], ['aluminium can', 1], ['cobalt', 0], ['wooden pencil', 1]], ['magnetic', 'non-magnetic'], 'Magnetic or non-magnetic: '); } },
      { title: 'Compass', gen(R) { return G9.S9.pickQ(R, [['Which way does a freely hanging magnet point?', 'north–south'], ['What is inside a compass?', 'a small magnetic needle'], ['Why should a compass be kept away from magnets?', 'their pull makes it point wrongly'], ['Where is the force of a magnet strongest?', 'at its poles']]); } },
      { title: 'Broken magnet', levels: [2, 3], gen(R) { const n = R.int(2, 5); return { q: `A bar magnet is cut into ${n} pieces. How many poles in all?`, a: `${2 * n} (each piece has N and S)`, ans: 2 * n }; } },
      { title: 'Care and making', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['How can you make a magnet from a nail?', 'stroke it many times in one direction with one pole of a magnet'], ['Name two things that weaken a magnet.', 'heating, hammering, dropping'], ['How should bar magnets be stored?', 'in pairs, unlike poles together, with keepers'], ['Which is the sure test for a magnet: attraction or repulsion?', 'repulsion']]); } }
    ],
    quiz: [
      { q: 'Like poles', o: ['repel', 'attract', 'do nothing', 'melt'], a: 0, e: 'Push.' }, { q: 'Free magnet points', o: ['north–south', 'east–west', 'up–down', 'anywhere'], a: 0, e: 'Compass.' },
      { q: 'Magnetic material', o: ['iron', 'aluminium', 'copper', 'plastic'], a: 0, e: 'Iron.' }, { q: 'Strongest part of a magnet', o: ['poles', 'middle', 'edges equally', 'none'], a: 0, e: 'Poles.' },
      { q: 'Broken magnet piece has', o: ['N and S', 'only N', 'only S', 'no poles'], a: 0, e: 'Two poles.' }, { q: 'Sure test of a magnet', o: ['repulsion', 'attraction', 'colour', 'weight'], a: 0, e: 'Only magnets repel.' },
      { q: 'Weakens a magnet', o: ['heating', 'storing with keepers', 'keeping dry', 'painting'], a: 0, e: 'Heat.' }, { q: 'Aluminium is', o: ['non-magnetic', 'magnetic', 'a magnet', 'iron'], a: 0, e: 'Metal but not magnetic.' },
      { q: 'Compass needle is a', o: ['small magnet', 'pin', 'wire', 'arrow of wood'], a: 0, e: 'Magnet.' }, { q: '3 pieces of magnet: poles', o: ['6', '3', '2', '1'], a: 0, e: '2 × 3.' },
      { q: 'Unlike poles', o: ['attract', 'repel', 'cancel', 'spin'], a: 0, e: 'Pull.' }
    ],
    teach: {
      outcomes: ['Classify magnetic materials', 'Show poles, attraction and repulsion', 'Use a compass and make a magnet'],
      periods: [{ t: 'Materials and poles', flow: [['10 min', 'Magnet treasure hunt.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Iron filings at poles.']] }, { t: 'Poles and compass', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Make a floating compass.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['All metals are magnetic.', 'Attraction proves a magnet.'], activities: ['Floating needle compass.', 'Magnet strength by paper clips.'],
      exit: ['Two magnetic, two non-magnetic.', 'Like/unlike poles.', 'How to make a magnet.'], homework: 'Test 10 objects at home with a fridge magnet and record results.'
    },
    slides: [{ t: 'Exploring Magnets', b: ['Magnetic materials', 'Poles', 'Attraction and repulsion', 'Compass and care'] }, { t: 'Think and share', b: ['Is aluminium magnetic?', 'Why is repulsion the sure test?'] }],
    fs: { groups: [['Materials', [['Magnetic', 'iron, nickel, cobalt, steel'], ['Non-magnetic', 'aluminium, copper, wood, plastic']]], ['Poles', [['Like', 'repel'], ['Unlike', 'attract'], ['Free magnet', 'N–S'], ['Broken magnet', 'each piece N and S']]], ['Use and care', [['Compass', 'magnetic needle'], ['Make', 'stroke one way'], ['Weaken', 'heat, hammer, drop']]]],
      ex: [['4 pieces', '8 poles'], ['N near N', 'repel']], rem: ['Not all metals are magnetic.', 'Repulsion proves a magnet.', 'Store with keepers.'] }
  });
})();
