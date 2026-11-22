/*
TOOL:    class1_maths_ch09
FAMILY:  CBSE_REVISION / Class 1 Maths (Joyful Mathematics)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 9 Utsav (patterns) - revise, 2 explore panels (bead pattern maker, number patterns), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const UNITS = [['🔴🔵', 'AB'], ['🔴🔴🔵', 'AAB'], ['🟡🟢🔵', 'ABC'], ['⭐🌙🌙', 'ABB'], ['🔺⚪', 'AB'], ['🌸🌸🍃🍃', 'AABB']];

  G9.register({
    no: 9, part: 'All chapters', short: 'Patterns', title: 'Utsav',
    blurb: 'Patterns at a festival: repeating patterns of colours, shapes and sounds, finding what comes next, and growing number patterns.',
    revise: {
      oneLine: 'A pattern repeats or grows by a rule. Find the part that repeats (the core), then keep going: 🔴🔵🔴🔵 → next is 🔴. Number patterns grow by adding the same amount each time.',
      sections: [
        { h: 'Repeating patterns', html: `<p>Rangoli borders, garlands and clapping games repeat. 🔴🔵🔴🔵 has core 🔴🔵 (AB). 🌸🌸🍃🌸🌸🍃 has core 🌸🌸🍃 (AAB).</p>` },
        { h: 'What comes next?', html: `<p>Say the pattern aloud, find the core, and continue it. You can also find a missing piece in the middle.</p>` },
        { h: 'Number patterns', html: `<p>2, 4, 6, 8 → add 2 each time → 10. 5, 10, 15 → add 5 → 20. 10, 9, 8 → take away 1 → 7.</p>` }
      ],
      formulas: [['AB', '🔴🔵🔴🔵'], ['AAB', '🔴🔴🔵🔴🔴🔵'], ['ABC', '🟡🟢🔵🟡🟢🔵'], ['Count by 2s', '2, 4, 6, 8, 10'], ['Count by 5s', '5, 10, 15, 20'], ['Count by 10s', '10, 20, 30']],
      terms: [['Pattern', 'something that repeats or grows by a rule'], ['Core', 'the part that repeats'], ['Rule', 'what to do each time']],
      traps: ['Looking at only the last two items.', 'Mixing up AAB with ABB.', 'Number patterns may go down too.'],
      bridge: '<p>Patterns help with skip counting in Ch 11 and with tables later.</p>'
    },

    explore: [
      {
        title: 'Pattern maker', intro: 'Choose a core. Press <kbd>S</kbd> to add the next bead.',
        build(el, K) {
          let k = 0; const row = K.row(el); K.select(row, 'core', UNITS.map(u => `${u[0]} (${u[1]})`), i => { k = i; an.reset(); }); const rd = K.read(el);
          const an = new K.Anim(16, () => draw(), { ms: 400 });
          function draw() { const core = [...UNITS[k][0]].filter(c => c.trim() && c !== '️'); const seq = Array.from({ length: an.i + 3 }, (_, i) => core[i % core.length]);
            rd.innerHTML = `<div style="font-size:34px;letter-spacing:4px">${seq.join('')}</div>core ${UNITS[k][0]} (${UNITS[k][1]}) · next: <b>${core[(an.i + 3) % core.length]}</b>`; }
          K.anim(el, an); draw(); return an;
        }
      },
      {
        title: 'Number patterns', intro: 'Choose a start and a step; the pattern grows on the number line.',
        build(el, K) {
          let s = 2, d = 2; const row = K.row(el); K.slider(row, 'start', 0, 10, 1, s, v => { s = v; b.redraw(); }); K.slider(row, 'step', 1, 10, 1, d, v => { d = v; b.redraw(); });
          const b = new K.Board(el, { xmin: -2, xmax: 102, ymin: -3, ymax: 4, axes: false, grid: 0, equal: false, aspect: 0.2 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.line(0, 0, 100, 0, { color: C.ink, w: 2 }); for (let i = 0; i <= 100; i += 10) { b.line(i, -0.5, i, 0.5, { color: C.ink }); b.text(i, -2, String(i), { font: '12px' }); }
            const seq = []; for (let v = s; v <= 100 && seq.length < 12; v += d) seq.push(v); seq.forEach((v, i) => { b.dot(v, 0, { color: C.orange, r: 5 }); if (i) b.arc(v - d / 2, 0, d / 2, 0, Math.PI, { color: C.orange, w: 1.5 }); });
            rd.innerHTML = `${seq.join(', ')}, … · rule: add ${d}`; };
          b.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'What comes next?', gen(R) {
          const u = R.pick(UNITS); const core = [...u[0]].filter(c => c.trim() && c !== '️'); const n = R.int(4, 8); const seq = Array.from({ length: n }, (_, i) => core[i % core.length]);
          return { q: `What comes next? ${seq.join(' ')} __`, a: core[n % core.length] };
        } },
      { title: 'Missing piece', levels: [2, 3], gen(R) {
          const u = R.pick(UNITS); const core = [...u[0]].filter(c => c.trim() && c !== '️'); const seq = Array.from({ length: 8 }, (_, i) => core[i % core.length]); const k = R.int(2, 6);
          return { q: `Find the missing one: ${seq.map((c, i) => i === k ? '__' : c).join(' ')}`, a: seq[k] };
        } },
      { title: 'Number pattern', gen(R, L) {
          const d = R.pick(L === 1 ? [1, 2] : [2, 5, 10, 3]), s = R.int(0, 10), down = L === 3 && R.chance(.4); const seq = Array.from({ length: 5 }, (_, i) => down ? s + 60 - d * i : s + d * i);
          return { q: `What comes next? ${seq.join(', ')}, __`, a: String(down ? seq[4] - d : seq[4] + d), ans: down ? seq[4] - d : seq[4] + d, s: down ? `take away ${d}` : `add ${d}` };
        } },
      { title: 'Find the core', levels: [2, 3], gen(R) {
          const u = R.pick(UNITS); const core = [...u[0]].filter(c => c.trim() && c !== '️'); return { q: `Which part repeats? ${Array.from({ length: 9 }, (_, i) => core[i % core.length]).join(' ')}`, a: core.join(' ') };
        } },
      { title: 'Sound patterns', levels: [1], gen(R) {
          const items = [['clap, stamp, clap, stamp, clap, __', 'stamp'], ['clap, clap, snap, clap, clap, __', 'snap'], ['up, down, up, down, __', 'up'], ['tap, tap, jump, tap, tap, __', 'jump']];
          const [q, a] = R.pick(items); return { q: `What comes next? ${q}`, a };
        } }
    ],

    quiz: [
      { q: '🔴🔵🔴🔵🔴 __', o: ['🔵', '🔴', '🟢', '⭐'], a: 0, e: 'AB.' },
      { q: '2, 4, 6, 8, __', o: ['10', '9', '12', '16'], a: 0, e: 'Add 2.' },
      { q: '5, 10, 15, __', o: ['20', '16', '25', '30'], a: 0, e: 'Add 5.' },
      { q: '10, 9, 8, __', o: ['7', '9', '6', '11'], a: 0, e: 'Take away 1.' },
      { q: '🌸🌸🍃🌸🌸🍃🌸 __', o: ['🌸', '🍃', '🌷', '⭐'], a: 0, e: 'AAB.' },
      { q: 'The part that repeats is called the', o: ['core', 'end', 'start', 'answer'], a: 0, e: 'Core.' },
      { q: '10, 20, 30, __', o: ['40', '31', '50', '35'], a: 0, e: 'Count in tens.' },
      { q: 'clap, stamp, clap, stamp, __', o: ['clap', 'stamp', 'jump', 'snap'], a: 0, e: 'AB.' },
      { q: '🟡🟢🔵🟡🟢 __', o: ['🔵', '🟡', '🟢', '🔴'], a: 0, e: 'ABC.' },
      { q: '1, 3, 5, 7, __', o: ['9', '8', '10', '11'], a: 0, e: 'Add 2.' },
      { q: 'Which is a pattern?', o: ['🔺⚪🔺⚪🔺⚪', '🔺⚪⚪🔺🔺🔺', '⚪🔺🔺⚪⭐', '🔺🔺⚪⚪⚪🔺'], a: 0, e: 'Repeats.' }
    ],

    teach: {
      outcomes: ['Recognise and extend repeating patterns', 'Find the core of a pattern', 'Continue simple number patterns', 'Make their own patterns'],
      periods: [
        { t: 'Festival patterns', flow: [['10 min', 'Look at rangoli and garlands (Utsav).'], ['15 min', 'Explore panel 1.'], ['15 min', 'Clap-stamp sound patterns.']] },
        { t: 'Number patterns', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Make bead patterns.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Only last item used.', 'AAB vs ABB.'],
      activities: ['Bead or leaf garlands.', 'Body patterns: stand, sit, stand, sit.'],
      exit: ['Continue 🔴🔴🔵 for 6 more.', '3, 6, 9, __.', 'Make your own clap pattern.'],
      homework: 'Find two patterns at home (on clothes, tiles or a rangoli) and draw them.'
    },

    slides: [
      { t: 'Utsav', b: ['Repeating patterns', 'The core', 'Number patterns'] },
      { t: 'Patterns', b: ['🔴🔵🔴🔵 (AB)', '🔴🔴🔵 (AAB)', '2, 4, 6, 8 (add 2)'] },
      { t: 'Check yourself', b: ['⭐🌙⭐🌙⭐ __?', '10, 20, 30, __?'] }
    ],

    fs: { groups: [
        ['Repeating', [['AB', '🔴🔵🔴🔵'], ['AAB', '🌸🌸🍃'], ['ABB', '⭐🌙🌙'], ['ABC', '🟡🟢🔵']]],
        ['Growing', [['Add 1', '1, 2, 3, 4'], ['Add 2', '2, 4, 6, 8'], ['Add 5', '5, 10, 15'], ['Add 10', '10, 20, 30']]],
        ['How to', [['Say it aloud', 'hear the repeat'], ['Find the core', 'circle it'], ['Continue', 'copy the core again']]]],
      ex: [['🔺⚪🔺⚪ __', '🔺'], ['3, 6, 9, __', '12 (add 3)']],
      rem: ['Find what repeats.', 'Check the whole pattern.', 'Numbers can go up or down.'] }
  });
})();
