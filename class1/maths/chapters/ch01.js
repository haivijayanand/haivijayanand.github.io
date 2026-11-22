/*
TOOL:    class1_maths_ch01
FAMILY:  CBSE_REVISION / Class 1 Maths (Joyful Mathematics)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 1 Finding the Furry Cat! (pre-number concepts) - revise, 2 explore panels (where is the cat?, big and small sort), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const SPOTS = [['on the table', 4, 3.2], ['under the table', 4, 0.7], ['near the door', 8.8, 1.2], ['far from the door, by the window', 0.8, 3.6], ['inside the box', 6.7, 0.9], ['outside the box', 7.9, 0.6], ['above the shelf', 1.5, 5.4], ['between the two plants', 3.9, 5.4]];

  G9.register({
    no: 1, part: 'All chapters', short: 'Finding the furry cat', title: 'Finding the Furry Cat!',
    blurb: 'Pre-number ideas: top and bottom, near and far, inside and outside, above and below, big and small, more and less, sorting and matching.',
    revise: {
      oneLine: 'Before counting, children learn to say where things are (on, under, near, far, inside, outside) and to compare (big–small, tall–short, more–less). These words are the first steps in mathematics.',
      sections: [
        { h: 'Where is it?', html: `<p>On / under · above / below · inside / outside · near / far · top / bottom · left / right · in front of / behind · between.</p><p>"The cat is <b>under</b> the table, <b>near</b> the door."</p>` },
        { h: 'Comparing', html: `<p>Big – small · tall – short · long – short · heavy – light · more – fewer (less) · thick – thin. 🐘 is bigger than 🐭.</p>` },
        { h: 'Sorting and matching', html: `<p>Put things together that are alike (all red, all round, all fruits). Match one-to-one: one spoon for each plate. If spoons are left over, there are <b>more</b> spoons.</p>` }
      ],
      formulas: [['Position words', 'on, under, near, far, inside, outside, between'], ['Size words', 'big, small, tall, short'], ['Amount words', 'more, fewer, same'], ['Matching', 'one for one']],
      terms: [['Near', 'close by'], ['Far', 'a long way away'], ['Same', 'equal, no more and no less'], ['Sort', 'put alike things together']],
      traps: ['Left and right depend on which way you face.', 'A bigger thing is not always more things (1 big ball vs 3 small balls).', 'Spread-out objects look like more — match them to check.'],
      bridge: '<p>These words are used in every chapter: shapes (Ch 2), counting (Ch 3), comparing numbers (Ch 5) and data (Ch 13).</p>'
    },

    explore: [
      {
        title: 'Where is the cat?', intro: 'Press <kbd>S</kbd>. The cat hides somewhere new each time. Say where it is, then read the answer.',
        build(el, K) {
          const b = new K.Board(el, { xmin: 0, xmax: 10, ymin: 0, ymax: 6.5, axes: false, grid: 0 }); const rd = K.read(el); let k = 0;
          b.onDraw = () => { b.clear(); b.rect(2.6, 2.4, 2.8, 0.3, { fill: '#b45309', color: '#78350f' }); b.line(2.8, 2.4, 2.8, 0.2, { color: '#78350f', w: 4 }); b.line(5.2, 2.4, 5.2, 0.2, { color: '#78350f', w: 4 }); b.line(0, 0.2, 10, 0.2, { color: C.ink, w: 2 });
            b.rect(8.3, 0.2, 1.4, 3.4, { fill: C.blueL, color: C.blue, w: 2 }); b.text(9, 3.9, 'door', { font: '13px' }); b.rect(6.1, 0.2, 1.3, 1.2, { fill: 'rgba(234,88,12,.2)', color: C.orange, w: 2 }); b.text(6.75, 1.65, 'box', { font: '13px' });
            b.rect(0.3, 2.8, 1.6, 1.6, { color: C.purple, w: 2 }); b.text(1.1, 2.5, 'window', { font: '13px' }); b.rect(1, 4.6, 6, 0.2, { fill: '#a16207', color: '#713f12' }); b.text(3.4, 4.95, '🪴', { font: '26px' }); b.text(4.4, 4.95, '🪴', { font: '26px' });
            const s = SPOTS[k]; b.text(s[1], s[2], '🐱', { font: '34px' }); rd.innerHTML = `The cat is <b>${s[0]}</b>.`; };
          const step = () => { k = (k + 1) % SPOTS.length; b.redraw(); }; const row = K.row(el); K.button(row, 'Hide the cat (S)', step);
          b.redraw(); return { step, play() {}, pause() {} };
        }
      },
      {
        title: 'More or fewer? Match them', intro: 'Press <kbd>S</kbd> for new groups. Lines match one cup to one saucer; the left-overs show which group has more.',
        build(el, K) {
          const R = G9.rng(G9.newSeed()); let a = 4, c = 6; const b = new K.Board(el, { xmin: 0, xmax: 11, ymin: 0, ymax: 4, axes: false, grid: 0, aspect: 0.35 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); for (let i = 0; i < a; i++) b.text(i + 0.8, 3.1, '☕', { font: '28px' }); for (let i = 0; i < c; i++) b.text(i + 0.8, 0.9, '🍽️', { font: '28px' }); for (let i = 0; i < Math.min(a, c); i++) b.line(i + 0.8, 2.6, i + 0.8, 1.4, { color: C.purple, w: 2 });
            rd.innerHTML = a === c ? 'Every cup has a saucer: the groups are the <b>same</b>.' : a > c ? `${a - c} cup(s) have no saucer: there are <b>more cups</b> and <b>fewer saucers</b>.` : `${c - a} saucer(s) have no cup: there are <b>more saucers</b> and <b>fewer cups</b>.`; };
          const step = () => { a = R.int(2, 9); c = R.int(2, 9); b.redraw(); }; const row = K.row(el); K.button(row, 'New groups (S)', step); b.redraw(); return { step, play() {}, pause() {} };
        }
      }
    ],

    gens: [
      { title: 'Position words', gen(R) {
          const items = [['The ball is in the box. Is it inside or outside?', 'inside'], ['The bird sits on the roof. Is it above or below the house?', 'above'], ['The shoes are under the bed. Are they on top of or below the bed?', 'below (under)'], ['You can touch the wall. Is it near or far?', 'near'], ['The Moon is in the sky. Is it near or far?', 'far'], ['Ravi sits in the middle of Asha and Meena. Where is Ravi?', 'between Asha and Meena'], ['The fish swims in the bowl. Is it inside or outside the bowl?', 'inside']];
          const [q, a] = R.pick(items); return { q, a };
        } },
      { title: 'Bigger or smaller', gen(R) {
          const items = [['🐘 or 🐭 — which is bigger?', '🐘 elephant'], ['🏠 or 🏢 — which is taller?', '🏢 building'], ['✏️ or 🖍️ — think: a new pencil or a small crayon — which is longer?', 'the pencil'], ['🍉 or 🍒 — which is heavier?', '🍉 watermelon'], ['🦒 or 🐕 — which is taller?', '🦒 giraffe'], ['🐜 or 🐄 — which is smaller?', '🐜 ant']];
          const [q, a] = R.pick(items); return { q, a };
        } },
      { title: 'More or fewer', gen(R, L) {
          const a = R.int(2, L === 1 ? 5 : 9); let b; do { b = R.int(2, L === 1 ? 5 : 9); } while (b === a); const e1 = R.pick(['🍎', '⭐', '🐟', '🌸']), e2 = R.pick(['🍌', '🔵', '🐥', '🍃']);
          return { q: `Which group has more? ${e1.repeat(a)}  or  ${e2.repeat(b)}`, a: a > b ? `the ${e1} group` : `the ${e2} group`, s: 'match one to one' };
        } },
      { title: 'Odd one out', levels: [2, 3], gen(R) {
          const items = [['🍎 🍌 🍇 🚗', '🚗 (not a fruit)'], ['🔴 🔴 🔵 🔴', '🔵 (not red)'], ['🐶 🐱 🐭 🌳', '🌳 (not an animal)'], ['⚽ 🏀 📦 🎾', '📦 (not round)'], ['🥄 🍴 🔪 🧸', '🧸 (not for eating)']];
          const [q, a] = R.pick(items); return { q: `Which one does not belong? ${q}`, a };
        } },
      { title: 'Sort into groups', levels: [3], gen(R) {
          const n1 = R.int(2, 5), n2 = R.int(2, 5); const s = R.shuffle([...Array(n1).fill('🍎'), ...Array(n2).fill('🥕')]).join(' ');
          return { q: `Sort into fruits and vegetables: ${s}. How many in each group?`, a: `fruits ${n1}, vegetables ${n2}`, ans: n1 };
        } }
    ],

    quiz: [
      { q: '🐱 is under the table. Where is the cat?', o: ['below the table', 'on the table', 'far away', 'inside a box'], a: 0, e: 'Under means below.' },
      { q: 'Which is bigger?', o: ['🐘', '🐭', '🐜', '🐝'], a: 0, e: 'The elephant.' },
      { q: 'Which is taller?', o: ['🦒', '🐕', '🐈', '🐇'], a: 0, e: 'The giraffe.' },
      { q: '☕☕☕ and 🍽️🍽️ — which are more?', o: ['cups', 'saucers', 'same', 'none'], a: 0, e: 'One cup has no saucer.' },
      { q: 'The opposite of near is', o: ['far', 'under', 'big', 'inside'], a: 0, e: 'Near – far.' },
      { q: 'The opposite of inside is', o: ['outside', 'on', 'above', 'between'], a: 0, e: 'In – out.' },
      { q: 'Which is heavier?', o: ['🍉', '🪶', '🍃', '🎈'], a: 0, e: 'Watermelon.' },
      { q: 'Which does not belong: 🍎 🍌 🍇 🚗', o: ['🚗', '🍎', '🍌', '🍇'], a: 0, e: 'Not a fruit.' },
      { q: 'A bird flying over a house is', o: ['above it', 'below it', 'inside it', 'under it'], a: 0, e: 'Over = above.' },
      { q: '⭐⭐⭐ and ⭐⭐⭐ are', o: ['the same', 'more', 'fewer', 'bigger'], a: 0, e: 'Equal groups.' },
      { q: 'To check which group has more, we can', o: ['match one to one', 'look at the colours', 'count only one group', 'guess'], a: 0, e: 'Matching.' }
    ],

    teach: {
      outcomes: ['Use position words correctly', 'Compare size, height, length and weight', 'Compare groups by one-to-one matching', 'Sort objects by a property'],
      periods: [
        { t: 'Where is it?', flow: [['10 min', 'Hide a toy in class; children describe where it is.'], ['15 min', 'Explore panel 1: find the cat.'], ['15 min', 'Simon says: on, under, near, far.']] },
        { t: 'Comparing and sorting', flow: [['15 min', 'Explore panel 2: cups and saucers.'], ['15 min', 'Sort classroom objects by colour/shape.'], ['10 min', 'Check quiz together.']] }
      ],
      misconceptions: ['Spread-out group seems bigger.', 'Left/right confusion.', 'Big object = more objects.'],
      activities: ['Treasure hunt with position clues.', 'Shoe line-up: tallest to shortest child.'],
      exit: ['Put the pencil under the book.', 'Who is taller: you or your bag?', 'Which group has more: 3 buttons or 5 buttons?'],
      homework: 'At home, find 3 things that are on a table and 3 things that are under it. Draw them.'
    },

    slides: [
      { t: 'Finding the Furry Cat!', b: ['Where is it?', 'Big and small', 'More and fewer', 'Sorting'] },
      { t: 'Position words', b: ['on – under', 'near – far', 'inside – outside', 'between'] },
      { t: 'Comparing', b: ['big – small', 'tall – short', 'heavy – light', 'more – fewer – same'] },
      { t: 'Check yourself', b: ['Where is your bag?', 'Which is bigger: 🐘 or 🐭?'] }
    ],

    fs: { groups: [
        ['Where?', [['on – under', '📕 on the desk, 👟 under the desk'], ['near – far', 'near: can touch; far: across the field'], ['inside – outside', '🐟 inside the bowl'], ['above – below', '🐦 above the house'], ['between', 'in the middle of two things']]],
        ['Compare', [['big – small', '🐘 – 🐭'], ['tall – short', '🦒 – 🐕'], ['heavy – light', '🍉 – 🪶'], ['long – short', 'train – car']]],
        ['How many?', [['more', 'has extra after matching'], ['fewer', 'runs out first'], ['same', 'every one has a partner']]]],
      ex: [['☕☕☕☕ and 🍽️🍽️🍽️', 'one cup left: more cups'], ['🍎 🍌 🚗', '🚗 is the odd one out']],
      rem: ['Match one to one to compare.', 'Say a full sentence: "The cat is under the table."', 'Look from the same side for left and right.'] }
  });
})();
