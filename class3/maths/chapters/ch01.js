/*
TOOL:    class3_maths_ch01
FAMILY:  CBSE_REVISION / Class 3 Maths (Maths Mela)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Classes I to VII maths kits
CHANGES: 1.0.0 - Ch 1 What's in a Name? (counting, tallies, patterns) - revise, 2 explore panels (tally the names, letter counts), 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 1, part: 'All chapters', short: 'Counting and tallies', title: 'What\'s in a Name?',
    blurb: 'Keeping count with tally marks and objects, counting letters in names, comparing counts and spotting number patterns.',
    revise: {
      oneLine: 'Long ago people kept count with pebbles, knots and marks. Tally marks in groups of five make counting quick and checkable. Counting letters in names gives data we can compare.',
      sections: [
        { h: 'Keeping count', html: `<p>A shepherd drops one pebble for each goat leaving and picks one up for each goat returning. One-to-one matching shows whether any goat is missing.</p>` },
        { h: 'Tally marks', html: `<p>Draw | for each thing; the fifth mark crosses the four: 𝍸. Count in fives then add the rest.</p>` },
        { h: 'Names and numbers', html: `<p>"MEENA" has 5 letters. Who has the longest name? How many names have 4 letters?</p>` }
      ],
      formulas: [['Tally of 5', '𝍸'], ['Count tallies', 'fives first, then ones'], ['One-to-one', 'one mark for each thing'], ['Compare', 'more, fewer, same']],
      terms: [['Tally mark', 'a line for each thing'], ['Count', 'how many'], ['Data', 'information we collect']],
      traps: ['Forgetting to cross the fifth mark.', 'Counting one thing twice.', 'Spaces are not letters.'],
      bridge: '<p>Counting to hundreds comes in Ch 3 and Ch 6.</p>'
    },
    explore: [
      { title: 'Tally the goats', intro: 'Press <kbd>S</kbd> each time a goat comes home. Watch the tally grow in fives.',
        build(el, K) { let n = 0; const rd = K.read(el); const an = new K.Anim(30, () => { n = an.i; draw(); }, { ms: 350 });
          const five = '<span style="display:inline-block;position:relative;font:bold 24px monospace;margin-right:12px">||||<span style="position:absolute;left:-4px;top:12px;width:48px;border-top:3px solid var(--orange,#ea580c);transform:rotate(-20deg)"></span></span>';
          function draw() { rd.innerHTML = `<div style="font-size:24px">${'🐐'.repeat(n)}</div><div>${five.repeat(Math.floor(n / 5))}<span style="font:bold 24px monospace">${'|'.repeat(n % 5)}</span></div>${Math.floor(n / 5)} fives and ${n % 5} → <b>${n}</b>`; }
          K.anim(el, an); draw(); return an; } },
      { title: 'Letters in a name', intro: 'Type names separated by commas. The letters are counted and the longest name found.',
        build(el, K) { const row = K.row(el); row.innerHTML = '<label>names <input type="text" value="Meena, Arjun, Shabnam, Jo, Kavya" size="40"></label>'; const rd = K.read(el);
          const go = () => { const ns = row.querySelector('input').value.split(',').map(s => s.trim()).filter(Boolean); const c = ns.map(n => n.replace(/[^A-Za-zऀ-ॿ]/g, '').length); const mx = Math.max(0, ...c);
            rd.innerHTML = `<table class="t" style="width:auto">${ns.map((n, i) => `<tr><td>${n}</td><td style="text-align:left;font-family:monospace">${'■'.repeat(c[i])}</td><td><b>${c[i]}</b></td></tr>`).join('')}</table>longest: ${ns.filter((_, i) => c[i] === mx).join(', ')} (${mx} letters) · total letters ${c.reduce((a, b) => a + b, 0)}`; };
          row.querySelector('input').addEventListener('input', go); go(); return null; } }
    ],
    gens: [
      { title: 'Read tallies', gen(R) { const n = R.int(4, 33); return { q: `What number is this? ${'𝍸 '.repeat(Math.floor(n / 5))}${'|'.repeat(n % 5)}`, a: String(n), ans: n }; } },
      { title: 'Letters in a name', gen(R) { const n = R.pick(['RAVI', 'MEENAKSHI', 'ARJUN', 'FATIMA', 'JOSEPH', 'PRIYANKA', 'GURPREET', 'ANU']); return { q: `How many letters in the name ${n}?`, a: String(n.length), ans: n.length }; } },
      { title: 'Longest name', levels: [2, 3], gen(R) { const ns = R.shuffle(['ASHA', 'BHARATI', 'CHANDU', 'DEV', 'ELIZABETH', 'FARHAN']).slice(0, 3); const L = ns.map(s => s.length); const mx = Math.max(...L); return { q: `Whose name is longest: ${ns.join(', ')}? By how many letters is it longer than the shortest?`, a: `${ns[L.indexOf(mx)]}, by ${mx - Math.min(...L)}` }; } },
      { title: 'Pebble count', gen(R) { const out = R.int(10, 30), back = R.int(out - 5, out); return { q: `${out} goats went out (${out} pebbles). ${back} pebbles were picked up as goats came back. How many goats are still out?`, a: String(out - back), ans: out - back }; } },
      { title: 'Count in fives', levels: [1, 2], gen(R) { const k = R.int(2, 8), r = R.int(0, 4); return { q: `${k} full tally groups and ${r} extra marks. How many?`, a: String(5 * k + r), ans: 5 * k + r }; } }
    ],
    quiz: [
      { q: '𝍸 𝍸 || =', o: ['12', '10', '7', '22'], a: 0, e: '5 + 5 + 2.' }, { q: 'Letters in "ANITA"', o: ['5', '4', '6', '3'], a: 0, e: 'A-N-I-T-A.' },
      { q: 'The fifth tally mark is drawn', o: ['across the four', 'next to them', 'below', 'not at all'], a: 0, e: 'Gate.' }, { q: '20 goats out, 17 back. Still out?', o: ['3', '37', '17', '20'], a: 0, e: '20 − 17.' },
      { q: 'Why group tallies in fives?', o: ['to count quickly', 'to look nice', 'to hide them', 'no reason'], a: 0, e: 'Count by 5s.' }, { q: 'Longest: RAM, SITA, LAKSHMAN', o: ['LAKSHMAN', 'SITA', 'RAM', 'same'], a: 0, e: '8 letters.' },
      { q: '4 groups of 5 tallies', o: ['20', '9', '45', '15'], a: 0, e: '5 × 4.' }, { q: 'One pebble for each goat is', o: ['one-to-one matching', 'adding', 'sharing', 'guessing'], a: 0, e: 'Matching.' },
      { q: 'Letters in "JO"', o: ['2', '1', '3', '0'], a: 0, e: 'Two.' }, { q: '𝍸 𝍸 𝍸 =', o: ['15', '3', '12', '18'], a: 0, e: 'Three fives.' },
      { q: 'Information we collect is', o: ['data', 'a tally', 'a pebble', 'a name'], a: 0, e: 'Data.' }
    ],
    teach: {
      outcomes: ['Keep count with one-to-one matching and tallies', 'Count and compare letters in names', 'Read and make tally charts'],
      periods: [{ t: 'Keeping count', flow: [['10 min', 'Shepherd and pebbles story.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Tally class attendance.']] }, { t: 'Names', flow: [['15 min', 'Explore panel 2 with class names.'], ['15 min', 'Tally chart of name lengths.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Fifth mark not crossed.', 'Spaces counted.'], activities: ['Name-length line-up.', 'Pebble matching game.'],
      exit: ['Tally for 17.', 'Letters in your name.', 'Who has the longest name in your row?'], homework: 'Write the names of your family members and count the letters. Make a tally chart.'
    },
    slides: [{ t: 'What\'s in a Name?', b: ['Keeping count', 'Tally marks', 'Counting letters'] }, { t: 'Check yourself', b: ['Tally for 13?', 'Letters in INDIA?'] }],
    fs: { groups: [['Counting', [['One-to-one', 'one mark or pebble each'], ['Tally', '| for each, 𝍸 for five'], ['Read', 'count fives, then ones']]], ['Names', [['Letters', 'count, no spaces'], ['Compare', 'longest, shortest, same']]]],
      ex: [['𝍸 𝍸 𝍸 |', '16'], ['SUNITA', '6 letters']], rem: ['Cross every fifth mark.', 'Count each once.', 'Compare with more/fewer.'] }
  });
})();
