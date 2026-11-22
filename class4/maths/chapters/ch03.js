/*
TOOL:    class4_maths_ch03
FAMILY:  CBSE_REVISION / Class 4 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 3 Pattern Around Us (number patterns, odd and even, shape and turning patterns) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 3, part: 'All chapters', short: 'Patterns', title: 'Pattern Around Us',
    blurb: 'Number patterns with a rule, odd and even numbers, patterns in tiles and rangoli that turn, grow and repeat.',
    revise: {
      oneLine: 'A pattern follows a rule. 5, 10, 15, 20 adds 5 each time. Even numbers end in 0, 2, 4, 6, 8; odd numbers end in 1, 3, 5, 7, 9. Shapes can repeat, grow or turn (quarter turn, half turn).',
      sections: [
        { h: 'Number patterns', html: `<p>Find the rule: 3, 7, 11, 15 → +4. 64, 32, 16 → half each time.</p>` },
        { h: 'Odd and even', html: `<p>even + even = even; odd + odd = even; odd + even = odd.</p>` },
        { h: 'Turning patterns', html: `<p>A tile turned by a quarter turn four times comes back to the start.</p>` }
      ],
      formulas: [['Rule', 'what changes each step'], ['Even', 'ends 0, 2, 4, 6, 8'], ['odd + odd', 'even'], ['4 quarter turns', '1 full turn']],
      terms: [['Pattern', 'follows a rule'], ['Odd / even', 'cannot / can be paired'], ['Quarter turn', '90°']],
      traps: ['Looking at only two numbers to guess a rule.', '0 is even.', 'Half turn = 2 quarter turns.'],
      bridge: '<p>Class 5 patterns grow into rules with letters later.</p>'
    },
    explore: [
      { title: 'Number pattern machine', intro: 'Choose a start and a step. Even numbers are blue, odd orange.',
        build(el, K) { let s = 3, d = 4; const row = K.row(el); K.slider(row, 'start', 0, 20, 1, s, v => { s = v; draw(); }); K.slider(row, 'add each time', 1, 12, 1, d, v => { d = v; draw(); }); const rd = K.read(el);
          function draw() { const a = Array.from({ length: 12 }, (_, i) => s + d * i); rd.innerHTML = `<div style="font-size:20px">${a.map(x => `<span style="display:inline-block;min-width:44px;margin:2px;padding:4px;border-radius:6px;text-align:center;color:#fff;background:${x % 2 ? 'var(--orange,#ea580c)' : 'var(--blue,#1d4ed8)'}">${x}</span>`).join('')}</div>rule: +${d} · ${d % 2 ? 'odd step: odd and even take turns' : s % 2 ? 'even step from an odd start: all odd' : 'even step from an even start: all even'}`; } draw(); return null; } },
      { title: 'Turning tile', intro: 'Press <kbd>S</kbd> to give the tile a quarter turn; four tiles make a rangoli.',
        build(el, K) { const b = new K.Board(el, { xmin: -4, xmax: 4, ymin: -4, ymax: 4, axes: false, grid: 0, equal: true }); const rd = K.read(el); const an = new K.Anim(8, () => b.redraw(), { ms: 600 });
          const tile = [[0, 0], [3, 0], [3, 1], [1, 1], [1, 3], [0, 3]];
          b.onDraw = () => { b.clear(); const n = Math.min(an.i, 4); for (let k = 0; k < Math.max(1, n); k++) { const t = k * Math.PI / 2, P = tile.map(([x, y]) => [x * Math.cos(t) - y * Math.sin(t), x * Math.sin(t) + y * Math.cos(t)]); b.poly(P, { fill: [C.blueL, C.orangeL, C.purpleL, 'rgba(202,138,4,.2)'][k], color: [C.blue, C.orange, C.purple, C.yellow][k], w: 3 }); }
            rd.innerHTML = `${n} quarter turn${n === 1 ? '' : 's'} = ${n * 90}° ${n === 4 ? '· back to the start: a full turn' : ''}`; };
          K.anim(el, an); b.redraw(); return an; } }
    ],
    gens: [
      { title: 'Next number', gen(R) { const s = R.int(1, 30), d = R.int(2, 15); const a = [0, 1, 2, 3].map(i => s + d * i); return { q: `${a.join(', ')}, __`, a: String(s + 4 * d), ans: s + 4 * d }; } },
      { title: 'Find the rule', gen(R) { const s = R.int(50, 99), d = R.int(2, 9); const a = [0, 1, 2, 3].map(i => s - d * i); return { q: `What is the rule? ${a.join(', ')}`, a: `subtract ${d}` }; } },
      { title: 'Odd or even', gen(R) { const n = R.int(10, 999); return { q: `Is ${n} odd or even?`, a: n % 2 ? 'odd' : 'even' }; } },
      { title: 'Odd + even', levels: [2, 3], gen(R) { const a = R.int(11, 99), b = R.int(11, 99); return { q: `Without adding, is ${a} + ${b} odd or even?`, a: (a + b) % 2 ? 'odd' : 'even', s: `${a % 2 ? 'odd' : 'even'} + ${b % 2 ? 'odd' : 'even'}` }; } },
      { title: 'Doubling and halving', levels: [3], gen(R) { const s = R.pick([2, 3, 5]); return R.chance(.5) ? { q: `${s}, ${2 * s}, ${4 * s}, ${8 * s}, __`, a: String(16 * s), ans: 16 * s } : { q: `${64 * s}, ${32 * s}, ${16 * s}, __`, a: String(8 * s), ans: 8 * s }; } }
    ],
    quiz: [
      { q: 'Next: 5, 10, 15, __', o: ['20', '25', '16', '30'], a: 0, e: '+5.' }, { q: '0 is', o: ['even', 'odd', 'neither', 'both'], a: 0, e: 'Pairs exactly.' },
      { q: 'odd + odd =', o: ['even', 'odd', 'zero', 'depends'], a: 0, e: 'Leftovers pair.' }, { q: 'Rule: 3, 7, 11, 15', o: ['+4', '+3', '×2', '+5'], a: 0, e: 'Difference 4.' },
      { q: '2 quarter turns =', o: ['half turn', 'full turn', 'quarter turn', 'no turn'], a: 0, e: '180°.' }, { q: 'Next: 64, 32, 16, __', o: ['8', '12', '4', '0'], a: 0, e: 'Half.' },
      { q: 'Odd number', o: ['357', '246', '480', '1000'], a: 0, e: 'Ends 7.' }, { q: 'Quarter turn is', o: ['90°', '45°', '180°', '360°'], a: 0, e: 'Right angle.' },
      { q: 'even + odd =', o: ['odd', 'even', 'zero', 'even always'], a: 0, e: 'One left over.' }, { q: 'Next: 2, 4, 8, 16, __', o: ['32', '18', '24', '20'], a: 0, e: 'Double.' },
      { q: 'Odd step from an even start gives', o: ['even, odd, even…', 'all even', 'all odd', 'zeros'], a: 0, e: 'Alternates.' }
    ],
    teach: {
      outcomes: ['Continue and describe number patterns', 'Use odd and even rules', 'Make turning patterns'],
      periods: [{ t: 'Number patterns', flow: [['10 min', 'Clap patterns.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Odd-even sums.']] }, { t: 'Shape patterns', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Rangoli with turned tiles.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['0 is odd.', 'Rule from two terms.'], activities: ['Pair counters to test odd/even.', 'Tile designs.'],
      exit: ['Next: 9, 16, 23, __', 'Is 47 + 38 odd?', '3 quarter turns = ?'], homework: 'Find two patterns at home (tiles, cloth, gates) and draw them with their rule.'
    },
    slides: [{ t: 'Pattern Around Us', b: ['Number rules', 'Odd and even', 'Turning tiles'] }, { t: 'Check yourself', b: ['Next: 12, 20, 28?', '75 + 26 odd or even?'] }],
    fs: { groups: [['Number patterns', [['+d', '3, 7, 11, 15'], ['× 2', '3, 6, 12, 24'], ['÷ 2', '64, 32, 16']]], ['Odd / even', [['e + e', 'even'], ['o + o', 'even'], ['o + e', 'odd']]], ['Turns', [['Quarter', '90°'], ['Half', '180°'], ['Full', '360°']]]],
      ex: [['Next: 4, 9, 14', '19'], ['63 + 25', 'even']], rem: ['Check the rule on every step.', 'Look at the last digit for odd/even.', '4 quarter turns = full turn.'] }
  });
})();
