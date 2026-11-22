/*
TOOL:    class6_maths_ch10
FAMILY:  CBSE_REVISION / Class 6 Maths (Ganita Prakash)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 10 The Other Side of Zero (negative numbers, integers on a number line, building-lift model, adding and subtracting integers, token model) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const sg = n => n < 0 ? `(−${-n})` : `(+${n})`;
  G9.register({
    no: 10, part: 'All chapters', short: 'Integers', title: 'The Other Side of Zero',
    blurb: 'Negative numbers and integers: floors above and below ground in a building lift, the number line, comparing integers, adding and subtracting integers with movements and with positive and negative tokens (zero pairs), credits and debits, temperatures.',
    revise: {
      oneLine: 'Integers are …, −3, −2, −1, 0, +1, +2, … On the number line, numbers increase to the right. Adding a positive moves up (right); adding a negative moves down. Subtracting a number is the same as adding its opposite: 3 − (−2) = 3 + 2 = 5. A +1 token and a −1 token make a zero pair.',
      sections: [
        { h: 'Lift model', html: `<p>Ground = 0, floors above +1, +2…, basements −1, −2… Start at +2, go down 5: (+2) + (−5) = −3.</p>` },
        { h: 'Comparing', html: `<p>−5 &lt; −2 because −5 is further left. Every positive is greater than every negative.</p>` },
        { h: 'Tokens', html: `<p>(−3) − (−5): add 2 zero pairs to have five −1s, take them away → +2.</p>` }
      ],
      formulas: [['a + (−b)', 'a − b'], ['a − (−b)', 'a + b'], ['n + (−n)', '0'], ['Opposite of −7', '+7']],
      terms: [['Integer', 'whole numbers and their negatives'], ['Additive inverse', 'opposite number'], ['Zero pair', '+1 and −1']],
      traps: ['−7 is less than −2.', 'Subtracting a negative increases the value.', 'Do not drop the sign in brackets.'],
      bridge: '<p>Class 7 multiplies and divides integers.</p>'
    },
    explore: [
      { title: 'Building lift', intro: 'Start on a floor and press the lift buttons (+ up, − down).',
        build(el, K) { let s = 2, m = -5; const row = K.row(el); K.slider(row, 'start floor', -5, 5, 1, s, v => { s = v; b.redraw(); }); K.slider(row, 'move', -8, 8, 1, m, v => { m = v; b.redraw(); }); const b = new K.Board(el, { xmin: -3, xmax: 6, ymin: -8.5, ymax: 8.5, axes: false, grid: 0, aspect: 1.1 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); for (let f = -8; f <= 8; f++) { b.rect(0, f - 0.5, 3, 1, { fill: f < 0 ? 'rgba(124,58,237,.10)' : f === 0 ? 'rgba(202,138,4,.2)' : 'rgba(29,78,216,.08)', color: C.grid, w: 1 }); b.text(-1, f, (f > 0 ? '+' : f < 0 ? '−' : '') + Math.abs(f), { font: '12px' }); } const e = Math.max(-8, Math.min(8, s + m)); b.text(1.5, s, '🧍', { font: '18px' }); b.arrow(4, s, 4, e, { color: m < 0 ? C.purple : C.blue, w: 4 }); b.dot(4, e, { r: 7 });
            rd.innerHTML = `${sg(s)} + ${sg(m)} = <b>${s + m === 0 ? 0 : sg(s + m)}</b>${Math.abs(s + m) > 8 ? ' (off this building)' : ''} · ${m < 0 ? 'down' : 'up'} ${Math.abs(m)} floor${Math.abs(m) === 1 ? '' : 's'}`; };
          b.redraw(); return null; } },
      { title: 'Token model', intro: 'Blue = +1, orange = −1. Zero pairs cancel. Choose the sum.',
        build(el, K) { let a = -3, c = 5, op = 1; const row = K.row(el); K.slider(row, 'first', -6, 6, 1, a, v => { a = v; draw(); }); K.select(row, 'op', ['+', '−'], i => { op = i; draw(); }); const s1 = row.querySelector('select'); if (s1) s1.value = 1; K.slider(row, 'second', -6, 6, 1, c, v => { c = v; draw(); }); const rd = K.read(el);
          const tok = (n) => (n > 0 ? '🔵' : '🟠').repeat(Math.abs(n)) || '∅';
          function draw() { const res = op ? a - c : a + c; let note = ''; if (op) { const need = c, have = a; const sameSign = (need > 0 && have >= need) || (need < 0 && have <= need); const add = sameSign ? 0 : Math.abs(need) - (Math.sign(have) === Math.sign(need) ? Math.abs(have) : 0); note = add ? `add ${add} zero pair${add > 1 ? 's' : ''} (🔵🟠) so there are enough to take away ${tok(need)} ` : `take away ${tok(need)} `; }
            rd.innerHTML = `<div style="font-size:22px">${tok(a)} ${op ? '−' : '+'} ${tok(c)}</div>${op ? note + '· ' : 'put together, cancel zero pairs · '}${sg(a)} ${op ? '−' : '+'} ${sg(c)} = <b>${res === 0 ? 0 : sg(res)}</b>${op ? ` = ${sg(a)} + ${sg(-c)}` : ''}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Add integers', gen(R) { const a = R.int(-15, 15), b = R.int(-15, 15); return { q: `${sg(a)} + ${sg(b)} = ?`, a: String(a + b).replace('-', '−'), ans: a + b }; } },
      { title: 'Subtract integers', gen(R) { const a = R.int(-15, 15), b = R.int(-15, 15); return { q: `${sg(a)} − ${sg(b)} = ?`, a: String(a - b).replace('-', '−'), ans: a - b, s: `${sg(a)} + ${sg(-b)}` }; } },
      { title: 'Compare', gen(R) { const a = R.int(-20, 20), b = R.int(-20, 20); return { q: `${String(a).replace('-', '−')} __ ${String(b).replace('-', '−')}`, a: a > b ? '>' : a < b ? '<' : '=' }; } },
      { title: 'Temperature', levels: [2, 3], gen(R) { const t = R.int(-10, 8), d = R.int(3, 15); return R.chance(.5) ? { q: `It is ${String(t).replace('-', '−')} °C and the temperature rises ${d} °C. New temperature?`, a: `${String(t + d).replace('-', '−')} °C`, ans: t + d } : { q: `It is ${String(t).replace('-', '−')} °C and it falls ${d} °C. New temperature?`, a: `${String(t - d).replace('-', '−')} °C`, ans: t - d }; } },
      { title: 'Bank balance', levels: [2, 3], gen(R) { const b = R.int(100, 900), w = R.int(200, 1500); return { q: `Balance ₹${b}. You spend ₹${w}. New balance (negative means you owe)?`, a: `₹${String(b - w).replace('-', '−')}`, ans: b - w }; } }
    ],
    quiz: [
      { q: '(+2) + (−5)', o: ['−3', '+3', '−7', '+7'], a: 0, e: 'Down 5 from 2.' }, { q: '3 − (−2)', o: ['5', '1', '−5', '−1'], a: 0, e: 'Add 2.' },
      { q: 'Greater: −7 or −2', o: ['−2', '−7', 'equal', 'cannot tell'], a: 0, e: 'Right on the line.' }, { q: '(−4) + (+4)', o: ['0', '8', '−8', '−4'], a: 0, e: 'Inverse.' },
      { q: '(−3) − (−5)', o: ['+2', '−8', '−2', '+8'], a: 0, e: '−3 + 5.' }, { q: 'Opposite of −9', o: ['+9', '−9', '0', '1/9'], a: 0, e: 'Inverse.' },
      { q: 'Basement 2 is', o: ['−2', '+2', '0', '2'], a: 0, e: 'Below ground.' }, { q: '−5 °C rises 8 °C', o: ['3 °C', '−13 °C', '13 °C', '−3 °C'], a: 0, e: '−5 + 8.' },
      { q: 'Zero pair', o: ['+1 and −1', '+1 and +1', '0 and 0', '−1 and −1'], a: 0, e: 'Cancel.' }, { q: '(−6) + (−3)', o: ['−9', '−3', '+9', '+3'], a: 0, e: 'Further down.' },
      { q: 'Smallest: −1, 0, −10, 5', o: ['−10', '−1', '0', '5'], a: 0, e: 'Leftmost.' }
    ],
    teach: {
      outcomes: ['Represent integers on a number line', 'Compare integers', 'Add and subtract integers with models'],
      periods: [{ t: 'Integers', flow: [['10 min', 'Lift and temperature stories.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Compare and order.']] }, { t: 'Operations', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Subtraction as adding the opposite.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['−7 > −2.', 'Subtracting a negative.'], activities: ['Floor number line walk.', 'Two-colour counters.'],
      exit: ['(−8) + (+3).', '(+4) − (−6).', 'Order −3, 2, −9, 0.'], homework: 'Record the minimum and maximum temperatures of a hill station for a week; find the daily differences.'
    },
    slides: [{ t: 'The Other Side of Zero', b: ['Integers and the lift', 'Number line', 'Adding and subtracting', 'Token model'] }, { t: 'Check yourself', b: ['(−7) + (+2)?', '(−1) − (−6)?'] }],
    fs: { groups: [['Integers', [['…, −2, −1, 0, 1, 2, …', 'number line'], ['Compare', 'right is bigger']]], ['Adding / subtracting', [['a + (−b)', 'a − b'], ['a − (−b)', 'a + b'], ['n + (−n)', '0']]], ['Models', [['Lift', 'up +, down −'], ['Tokens', 'zero pairs cancel']]]],
      ex: [['(+2) + (−5)', '−3'], ['3 − (−2)', '5']], rem: ['Subtract = add the opposite.', 'Keep signs in brackets.', 'Negatives: further left is smaller.'] }
  });
})();
