/*
TOOL:    class1_maths_ch11
FAMILY:  CBSE_REVISION / Class 1 Maths (Joyful Mathematics)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 11 How Many Times? (equal groups, skip counting) - revise, 2 explore panels (equal groups, skip-counting hops), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;

  G9.register({
    no: 11, part: 'All chapters', short: 'Equal groups', title: 'How Many Times?',
    blurb: 'Equal groups, adding the same number again and again, skip counting in 2s, 5s and 10s, and sharing equally.',
    revise: {
      oneLine: 'When groups are equal, we can count faster: 3 groups of 2 is 2 + 2 + 2 = 6, or skip count 2, 4, 6. Sharing equally means every child gets the same number.',
      sections: [
        { h: 'Equal groups', html: `<p>🍌🍌 🍌🍌 🍌🍌 → 3 groups of 2 = 6 bananas. Each group has the same number.</p>` },
        { h: 'Skip counting', html: `<p>By 2s: 2, 4, 6, 8, 10. By 5s: 5, 10, 15, 20. By 10s: 10, 20, 30. Count shoes in pairs, fingers in fives.</p>` },
        { h: 'Sharing', html: `<p>6 laddoos shared equally by 2 children: each gets 3. Give one at a time to each child until none are left.</p>` }
      ],
      formulas: [['Groups of 2', '2, 4, 6, 8, 10'], ['Groups of 5', '5, 10, 15, 20'], ['Groups of 10', '10, 20, 30, 40'], ['3 groups of 2', '2 + 2 + 2 = 6'], ['Share 6 by 2', '3 each']],
      terms: [['Equal groups', 'same number in each'], ['Skip count', 'count by jumping the same amount'], ['Share equally', 'everyone gets the same'], ['Pair', 'a group of 2']],
      traps: ['Groups that are not equal cannot be skip counted.', 'Counting the number of groups instead of all objects.', 'Sharing unequally.'],
      bridge: '<p>This is the start of multiplication and division (Class 2 and 3).</p>'
    },

    explore: [
      {
        title: 'Equal groups', intro: 'Choose how many groups and how many in each. Skip count to find the total.',
        build(el, K) {
          let g = 3, n = 2; const row = K.row(el); K.slider(row, 'groups', 1, 6, 1, g, v => { g = v; draw(); }); K.slider(row, 'in each', 1, 5, 1, n, v => { n = v; draw(); }); const rd = K.read(el);
          function draw() { rd.innerHTML = `<div style="font-size:30px">${Array.from({ length: g }, () => `<span style="display:inline-block;border:2px dashed var(--orange,#ea580c);border-radius:12px;padding:2px 6px;margin:3px">${'🍌'.repeat(n)}</span>`).join('')}</div>${g} groups of ${n} · ${Array(g).fill(n).join(' + ')} = <b>${g * n}</b> · skip count: ${Array.from({ length: g }, (_, i) => n * (i + 1)).join(', ')}`; }
          draw(); return null;
        }
      },
      {
        title: 'Skip-counting hops', intro: 'Choose the jump; press <kbd>S</kbd> for each hop of the kangaroo.',
        build(el, K) {
          let d = 2; const row = K.row(el); K.select(row, 'jump by', ['2', '5', '10'], i => { d = [2, 5, 10][i]; an.reset(); });
          const b = new K.Board(el, { xmin: -2, xmax: 52, ymin: -3, ymax: 5, axes: false, grid: 0, equal: false, aspect: 0.22 }); const rd = K.read(el); const an = new K.Anim(10, () => b.redraw(), { ms: 500 });
          b.onDraw = () => { b.clear(); b.line(0, 0, 50, 0, { color: C.ink, w: 2 }); for (let i = 0; i <= 50; i += 5) b.text(i, -2, String(i), { font: '12px' }); for (let i = 0; i <= 50; i++) b.line(i, -0.3, i, 0.3, { color: C.grey, w: 1 });
            const k = Math.min(an.i, Math.floor(50 / d)); for (let j = 1; j <= k; j++) b.arc(d * (j - 0.5), 0, d / 2, 0, Math.PI, { color: C.orange, w: 2 }); b.text(d * k, 3, '🦘', { font: '24px' });
            rd.innerHTML = `hops ${k}: ${Array.from({ length: k }, (_, j) => d * (j + 1)).join(', ') || '0'}`; };
          K.anim(el, an); b.redraw(); return an;
        }
      }
    ],

    gens: [
      { title: 'Equal groups', gen(R) {
          const g = R.int(2, 5), n = R.int(2, 5), e = R.pick(['🍎', '⭐', '🐞', '🍬']); return { q: `How many in all? ${Array.from({ length: g }, () => e.repeat(n)).join('  ')}`, a: `${g} groups of ${n} = ${g * n}`, ans: g * n };
        } },
      { title: 'Skip counting', gen(R) {
          const d = R.pick([2, 5, 10]), k = R.int(1, 3); const seq = Array.from({ length: 5 }, (_, i) => d * (i + 1)); return { q: `Fill in: ${seq.map((v, i) => i === k ? '__' : v).join(', ')}`, a: String(seq[k]), ans: seq[k] };
        } },
      { title: 'Repeated addition', gen(R) {
          const n = R.int(2, 5), g = R.int(2, 5); return { q: `${Array(g).fill(n).join(' + ')} = ?`, a: String(n * g), ans: n * g };
        } },
      { title: 'Share equally', levels: [2, 3], gen(R) {
          const c = R.int(2, 4), each = R.int(2, 5); return { q: `${c * each} laddoos are shared equally by ${c} children. How many does each get?`, a: String(each), ans: each };
        } },
      { title: 'Count in pairs', levels: [2, 3], gen(R) {
          const p = R.int(2, 9); return { q: `How many shoes are there in ${p} pairs?`, a: String(2 * p), ans: 2 * p, s: 'count by 2s' };
        } }
    ],

    quiz: [
      { q: '3 groups of 2', o: ['6', '5', '32', '9'], a: 0, e: '2 + 2 + 2.' },
      { q: '5, 10, 15, __', o: ['20', '16', '25', '30'], a: 0, e: 'By 5s.' },
      { q: '2, 4, 6, __', o: ['8', '7', '10', '12'], a: 0, e: 'By 2s.' },
      { q: '10 shared by 2 children: each gets', o: ['5', '2', '8', '10'], a: 0, e: 'Equal shares.' },
      { q: 'Shoes in 4 pairs', o: ['8', '4', '6', '10'], a: 0, e: '2 × 4.' },
      { q: '10, 20, 30, __', o: ['40', '31', '50', '35'], a: 0, e: 'By 10s.' },
      { q: '4 + 4 + 4 =', o: ['12', '8', '16', '444'], a: 0, e: 'Three 4s.' },
      { q: 'Fingers on 2 hands (count by 5s)', o: ['10', '5', '2', '20'], a: 0, e: '5, 10.' },
      { q: 'Equal groups means', o: ['same number in each group', 'different numbers', 'one big group', 'no groups'], a: 0, e: 'Definition.' },
      { q: '6 sweets for 3 children equally', o: ['2 each', '3 each', '6 each', '1 each'], a: 0, e: '6 ÷ 3.' },
      { q: '2 groups of 5', o: ['10', '7', '25', '3'], a: 0, e: '5 + 5.' }
    ],

    teach: {
      outcomes: ['Make and count equal groups', 'Skip count in 2s, 5s and 10s', 'Use repeated addition', 'Share equally'],
      periods: [
        { t: 'Equal groups', flow: [['10 min', 'Group children in twos and threes.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Repeated addition.']] },
        { t: 'Skip counting and sharing', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Share counters equally.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Unequal groups skip counted.', 'Counting groups not objects.'],
      activities: ['Count shoes at the class door in 2s.', 'Share biscuits fairly.'],
      exit: ['4 groups of 3.', 'Count by 5s to 30.', 'Share 8 pencils between 2.'],
      homework: 'Count spoons or socks at home in 2s. Share 12 beans equally among 3 family members.'
    },

    slides: [
      { t: 'How Many Times?', b: ['Equal groups', 'Skip counting', 'Sharing equally'] },
      { t: 'Skip counting', b: ['2, 4, 6, 8, 10', '5, 10, 15, 20', '10, 20, 30, 40'] },
      { t: 'Check yourself', b: ['3 groups of 5?', 'Share 12 by 4?'] }
    ],

    fs: { groups: [
        ['Equal groups', [['3 groups of 2', '2 + 2 + 2 = 6'], ['2 groups of 5', '5 + 5 = 10'], ['4 groups of 3', '3 + 3 + 3 + 3 = 12']]],
        ['Skip counting', [['by 2s', '2, 4, 6, 8, 10, 12'], ['by 5s', '5, 10, 15, 20, 25'], ['by 10s', '10, 20, 30, 40, 50']]],
        ['Sharing', [['Fair share', 'everyone gets the same'], ['6 by 2', '3 each'], ['12 by 3', '4 each']]]],
      ex: [['🍬🍬🍬 🍬🍬🍬 🍬🍬🍬', '3 groups of 3 = 9'], ['15 shared by 3', '5 each']],
      rem: ['Groups must be equal.', 'Count all the objects.', 'Share one at a time.'] }
  });
})();
