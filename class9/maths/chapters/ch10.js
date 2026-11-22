/*
TOOL:    class9_maths_ch10
FAMILY:  CBSE_REVISION / Class 9 Maths (Ganita Manjari)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class 9 Maths full build
CHANGES: 1.0.0 - Ch 10 How Quantities Combine: Understanding Data - revise, 3 explore panels (combined average balance, mixtures, stacked vs 100% stacked bars), 9 generators, quiz, lesson plan, slides
*/
(function () {
  const { F, Q, num, C } = G9;

  G9.register({
    no: 10, part: 'Part II', short: 'Understanding data', title: 'How Quantities Combine: Understanding Data',
    blurb: 'Weighted and combined averages, mixtures, custom weights, stacked and 100% stacked bar charts.',
    revise: {
      oneLine: 'When groups of different sizes (or importance) are combined, the overall average is a weighted average — it leans towards the bigger (or more important) group. Stacked bar charts show how a whole is made of parts.',
      sections: [
        { h: 'Average (mean) — recap', html: `<p>Mean = ${F('sum of values', 'number of values')}. Sum = mean × number of values — the most useful rearrangement in this chapter.</p>
          <p>Also recall: <b>median</b> = middle value of sorted data, <b>mode</b> = most frequent value.</p>` },
        { h: 'Combining two groups', html: `<p>Group 1: n₁ items with mean m₁; group 2: n₂ items with mean m₂.</p>
          <div class="box m">combined mean = ${F('n₁m₁ + n₂m₂', 'n₁ + n₂')}</div>
          <p>It is <b>not</b> (m₁ + m₂)/2 unless n₁ = n₂. It always lies between m₁ and m₂, closer to the larger group.</p>` },
        { h: 'Weighted average and custom weights', html: `<div class="box m">weighted mean = ${F('w₁x₁ + w₂x₂ + … + wₖxₖ', 'w₁ + w₂ + … + wₖ')}</div>
          <p>Example: a school counts Term 1 as 40% and Term 2 as 60%. Marks 70 and 85 → 0.4 × 70 + 0.6 × 85 = 79. Weights can be counts, percentages or any importance numbers.</p>` },
        { h: 'Mixtures', html: `<p>Concentration = ${F('amount of substance', 'total quantity')}. Mixing 500 mL of 10% juice with 200 mL of 20% juice:</p>
          <p class="m">${F('500 × 0.10 + 200 × 0.20', '500 + 200')} = ${F(90, 700)} ≈ 12.9%</p>
          <p>Adding plain water keeps the amount of substance fixed but increases the total, so the concentration falls.</p>` },
        { h: 'Stacked and 100% stacked bar charts', html: `<ul><li><b>Stacked bar</b>: each bar is split into parts; the bar height is the total. Good for comparing totals <i>and</i> parts.</li>
          <li><b>100% stacked bar</b>: every bar is scaled to 100%; parts show proportions. Good for comparing shares across groups of different sizes.</li></ul>
          <p>A group can have a larger <i>number</i> but a smaller <i>share</i> — always ask "out of how many?"</p>` }
      ],
      formulas: [['Mean', 'sum ÷ count'], ['Sum', 'mean × count'], ['Combined mean', '(n₁m₁ + n₂m₂) / (n₁ + n₂)'], ['Weighted mean', 'Σwx / Σw'], ['Concentration', 'substance ÷ total'], ['Share (%)', 'part ÷ whole × 100']],
      terms: [['Weight', 'how much a value counts in the average'], ['Mixture', 'combination of quantities with different concentrations'], ['Stacked bar', 'bar split into parts that add to the total'], ['100% stacked bar', 'each bar shows parts as percentages of its own total']],
      traps: ['Averaging the averages: (m₁ + m₂)/2 is wrong when the group sizes differ.', 'Adding percentages of different wholes directly.', 'Forgetting that water added has 0% concentration but still counts in the total.', 'Reading a 100% stacked chart as if it showed actual numbers.'],
      bridge: '<p>Probability (Ch 7) is a share of outcomes. Linear equations (Ch 13) solve "how much water must be added" problems.</p>'
    },

    explore: [
      {
        title: 'Combined average: the balance', intro: 'Two groups sit on a number line like weights on a see-saw. The combined average is the balance point.',
        build(el, K) {
          let n1 = 20, m1 = 60, n2 = 30, m2 = 80; const r1 = K.row(el), r2 = K.row(el);
          const b = new K.Board(el, { xmin: 25, xmax: 105, ymin: -2, ymax: 8, axes: false, grid: 0, equal: false, aspect: 0.3 });
          const rd = K.read(el);
          K.slider(r1, 'Group A size', 1, 60, 1, n1, v => { n1 = v; b.redraw(); }); K.slider(r1, 'A average', 30, 100, 1, m1, v => { m1 = v; b.redraw(); });
          K.slider(r2, 'Group B size', 1, 60, 1, n2, v => { n2 = v; b.redraw(); }); K.slider(r2, 'B average', 30, 100, 1, m2, v => { m2 = v; b.redraw(); });
          b.onDraw = () => {
            b.clear(); const cm = (n1 * m1 + n2 * m2) / (n1 + n2), sm = (m1 + m2) / 2;
            b.line(30, 0, 100, 0, { color: C.axis, w: 2 }); for (let x = 30; x <= 100; x += 10) { b.line(x, -0.3, x, 0.3, { color: C.axis, w: 2 }); b.text(x, -1, String(x), { font: '12px' }); }
            b.rect(m1 - 1.5, 0, 3, n1 / 10, { fill: C.blueL, color: C.blue }); b.text(m1, n1 / 10 + 0.6, `A: ${n1}`, { font: 'bold 13px', color: C.blue });
            b.rect(m2 - 1.5, 0, 3, n2 / 10, { fill: C.orangeL, color: C.orange }); b.text(m2, n2 / 10 + 0.6, `B: ${n2}`, { font: 'bold 13px', color: C.orange });
            b.poly([[cm, 0], [cm - 1.2, -1.6], [cm + 1.2, -1.6]], { fill: C.purple, color: C.purple });
            b.line(sm, -0.2, sm, 7, { color: C.grey, w: 1.5, dash: [4, 4] }); b.text(sm, 7.4, 'simple average of averages', { font: '11px', color: C.grey });
            rd.innerHTML = `Combined mean = ${F(`${n1} × ${m1} + ${n2} × ${m2}`, `${n1} + ${n2}`)} = ${F(n1 * m1 + n2 * m2, n1 + n2)} = <b>${num(cm)}</b> &nbsp;·&nbsp; (m₁ + m₂)/2 = ${num(sm)} ${n1 === n2 ? '(same, because the groups are equal)' : '(different — it ignores group sizes)'}`;
          };
          b.redraw(); return null;
        }
      },
      {
        title: 'Mixtures', intro: 'Mix two solutions. The mixture strength lies between the two strengths — nearer the one with more volume. Try 0% for plain water.',
        build(el, K) {
          let v1 = 500, c1 = 10, v2 = 200, c2 = 20; const r1 = K.row(el), r2 = K.row(el);
          const b = new K.Board(el, { xmin: 0, xmax: 30, ymin: -1, ymax: 11, axes: false, grid: 0, equal: false, aspect: 0.35 });
          const rd = K.read(el);
          K.slider(r1, 'Jug 1 volume mL', 0, 1000, 50, v1, v => { v1 = v; b.redraw(); }); K.slider(r1, 'strength %', 0, 50, 1, c1, v => { c1 = v; b.redraw(); });
          K.slider(r2, 'Jug 2 volume mL', 0, 1000, 50, v2, v => { v2 = v; b.redraw(); }); K.slider(r2, 'strength %', 0, 50, 1, c2, v => { c2 = v; b.redraw(); });
          b.onDraw = () => {
            b.clear(); const tot = v1 + v2, sub = v1 * c1 / 100 + v2 * c2 / 100, cm = tot ? sub / tot * 100 : 0;
            const jar = (x, v, c, lab, col) => { b.rect(x, 0, 6, 10, { color: C.ink, w: 2 }); const h = v / 2000 * 10; b.rect(x, 0, 6, h, { fill: `rgba(234,88,12,${0.08 + c / 60})`, color: col, w: 2 }); b.text(x + 3, -0.6, `${lab}: ${v} mL @ ${num(c)}%`, { font: 'bold 12px' }); };
            jar(1, v1, c1, 'Jug 1', C.blue); jar(11, v2, c2, 'Jug 2', C.blue); jar(22, tot, cm, 'Mix', C.purple);
            b.text(8.5, 5, '+', { font: 'bold 28px' }); b.text(19, 5, '=', { font: 'bold 28px' });
            rd.innerHTML = tot ? `Substance = ${v1} × ${num(c1 / 100)} + ${v2} × ${num(c2 / 100)} = ${num(sub)} mL; total = ${tot} mL; mixture strength = ${num(sub)} ÷ ${tot} = <b>${num(cm)}%</b>` : 'Add some liquid!';
          };
          b.redraw(); return null;
        }
      },
      {
        title: 'Stacked vs 100% stacked bars', intro: 'Activity hours for three people. Toggle the chart type: totals vs shares.',
        build(el, K) {
          const cats = ['Sitting', 'Standing', 'Moving'], ppl = ['Asha', 'Bilal', 'Chitra'];
          const data = [[6, 2, 1], [3, 4, 3], [2, 2, 6]]; let pct = false; const cols = [C.blue, C.orange, C.purple];
          const row = K.row(el); K.check(row, '100% stacked', false, v => { pct = v; b.redraw(); });
          ppl.forEach((p, i) => cats.forEach((c, j) => K.slider(row, `${p} ${c.toLowerCase()}`, 0, 10, 1, data[i][j], v => { data[i][j] = v; b.redraw(); })));
          const b = new K.Board(el, { xmin: -2, xmax: 20, ymin: -1.5, ymax: 12, axes: false, grid: 0, equal: false, aspect: 0.42 });
          const rd = K.read(el);
          b.onDraw = () => {
            b.clear(); const top = pct ? 100 : Math.max(10, ...data.map(r => r[0] + r[1] + r[2])); const sc = 10 / top;
            for (let t = 0; t <= top + 1e-9; t += pct ? 25 : Math.ceil(top / 5)) { b.line(0, t * sc, 19, t * sc, { color: C.grid, w: 1 }); b.text(-0.8, t * sc, pct ? t + '%' : String(t), { font: '11px' }); }
            data.forEach((r, i) => { const tot = r[0] + r[1] + r[2] || 1; let y = 0; r.forEach((v, j) => { const hgt = (pct ? v / tot * 100 : v) * sc; b.rect(1.5 + i * 5, y, 3, hgt, { fill: cols[j], color: '#fff', w: 1.5 }); if (hgt > 0.6) b.text(3 + i * 5, y + hgt / 2, pct ? num(v / tot * 100, 0) + '%' : String(v), { font: 'bold 12px', color: '#fff' }); y += hgt; }); b.text(3 + i * 5, -0.7, ppl[i], { font: 'bold 13px' }); });
            cats.forEach((c, j) => { b.rect(16.3, 9 - j * 1.3, 0.7, 0.7, { fill: cols[j], color: cols[j], w: 1 }); b.text(17.3, 9.35 - j * 1.3, c, { font: '12px', align: 'left' }); });
            const sh = data.map(r => r[2] / ((r[0] + r[1] + r[2]) || 1) * 100);
            rd.innerHTML = `${pct ? 'Shares: each bar is 100%.' : 'Totals: bar height = total hours.'} Moving share — ${ppl.map((p, i) => `${p} ${num(sh[i], 0)}%`).join(', ')}.`;
          };
          b.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Mean, median, mode', levels: [1, 2], gen(R, L) {
          const n = L === 1 ? 5 : R.pick([6, 7]); const xs = Array.from({ length: n }, () => R.int(10, 60)); if (L === 2) xs[n - 1] = xs[R.int(0, n - 2)];
          const s = [...xs].sort((a, b) => a - b), sum = xs.reduce((a, b) => a + b, 0), med = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
          const f = {}; xs.forEach(x => f[x] = (f[x] || 0) + 1); const mx = Math.max(...Object.values(f)); const mode = mx > 1 ? Object.keys(f).filter(k => f[k] === mx).join(', ') : 'none (no repeats)';
          return { q: `For the data ${xs.join(', ')}: find the mean${L === 2 ? ', median and mode' : ''}.`, a: `mean = ${num(sum / n)}${L === 2 ? `, median = ${num(med)}, mode = ${mode}` : ''}`, ans: L === 1 ? sum / n : undefined, s: `sum = ${sum}, n = ${n}; sorted: ${s.join(', ')}` };
        } },
      { title: 'Combined average of two groups', gen(R, L) {
          const n1 = R.int(10, 40), n2 = R.int(10, 40), m1 = R.int(40, 90), m2 = R.int(40, 90);
          const what = R.pick([['students', 'marks'], ['workers', 'daily wage ₹'], ['players', 'height (cm)']]);
          return { q: `The average ${what[1]} of ${n1} ${what[0]} in group A is ${m1}, and of ${n2} ${what[0]} in group B is ${m2}. Find the average for all ${n1 + n2} ${what[0]} together.`, a: num((n1 * m1 + n2 * m2) / (n1 + n2)), ans: (n1 * m1 + n2 * m2) / (n1 + n2), tol: 0.01, s: `(${n1}×${m1} + ${n2}×${m2}) ÷ ${n1 + n2} = ${n1 * m1 + n2 * m2} ÷ ${n1 + n2}` };
        } },
      { title: 'Weighted average (custom weights)', gen(R) {
          const w = R.pick([[40, 60], [30, 70], [25, 25, 50], [20, 30, 50]]), m = w.map(() => R.int(50, 98));
          const v = w.reduce((s, x, i) => s + x * m[i], 0) / w.reduce((a, b) => a + b, 0);
          return { q: `A school gives weights ${w.map(x => x + '%').join(', ')} to ${w.length} exams. A student scored ${m.join(', ')} (out of 100). Find the final score.`, a: num(v), ans: v, tol: 0.01, s: w.map((x, i) => `${num(x / 100)}×${m[i]}`).join(' + ') };
        } },
      { title: 'Mixture concentration', gen(R) {
          const v1 = R.int(1, 10) * 100, c1 = R.int(2, 30), v2 = R.int(1, 10) * 100, c2 = R.int(2, 30);
          const c = (v1 * c1 + v2 * c2) / (v1 + v2);
          return { q: `${v1} mL of a ${c1}% sugar solution is mixed with ${v2} mL of a ${c2}% sugar solution. Find the concentration of the mixture.`, a: `${num(c)}%`, ans: c, tol: 0.01, s: `sugar = ${v1}×${c1}/100 + ${v2}×${c2}/100 = ${num((v1 * c1 + v2 * c2) / 100)} mL in ${v1 + v2} mL` };
        } },
      { title: 'Dilute to a target strength', levels: [2, 3], gen(R) {
          const v = R.int(2, 10) * 100, c = R.pick([8, 10, 12, 15, 20, 25]), t = R.pick([2, 4, 5, 6].filter(x => x < c && (v * c) % x === 0));
          if (!t) return this.gen(R); const w = v * c / t - v;
          return { q: `${v} mL of juice contains ${c}% pulp. How much water must be added to make it ${t}% pulp?`, a: `${num(w)} mL`, ans: w, s: `pulp = ${num(v * c / 100)} mL stays fixed; ${num(v * c / 100)} ÷ (${v} + x) = ${t}/100 ⇒ x = ${num(w)}` };
        } },
      { title: 'Missing value from the mean', levels: [1, 2], gen(R) {
          const n = R.int(4, 6), xs = Array.from({ length: n }, () => R.int(5, 50)), m = R.int(15, 45), last = m * (n + 1) - xs.reduce((a, b) => a + b, 0);
          if (last < 0) return this.gen(R);
          return { q: `The mean of ${xs.join(', ')} and x is ${m}. Find x.`, a: String(last), ans: last, s: `sum = ${m} × ${n + 1} = ${m * (n + 1)}; x = ${m * (n + 1)} − ${xs.reduce((a, b) => a + b, 0)}` };
        } },
      { title: 'How much of each? (reverse mixture)', levels: [3], gen(R) {
          const p1 = R.int(20, 30), p2 = p1 + R.int(5, 15), q1 = R.int(2, 8) * 10, q2 = R.int(2, 8) * 10, avg = (p1 * q1 + p2 * q2) / (q1 + q2);
          if (!Number.isInteger(avg)) return this.gen(R);
          return { q: `A trader mixes ${q1} kg of rice at ₹${p1}/kg with some rice at ₹${p2}/kg. The mixture costs ₹${avg}/kg. How many kg of the second kind did he use?`, a: `${q2} kg`, ans: q2, s: `${p1}×${q1} + ${p2}x = ${avg}(${q1} + x) ⇒ ${p2 - avg}x = ${(avg - p1) * q1}` };
        } },
      { title: 'Read a stacked bar chart', levels: [2, 3], gen(R) {
          const g = ['Class A', 'Class B'], cats = ['walk', 'bus', 'cycle'], d = g.map(() => cats.map(() => R.int(4, 20)));
          const tA = d[0].reduce((a, b) => a + b), tB = d[1].reduce((a, b) => a + b);
          return { q: `A stacked bar chart shows how students come to school.<br><table class="t" style="width:auto"><tr><th></th>${cats.map(c => `<th>${c}</th>`).join('')}<th>total</th></tr>${g.map((x, i) => `<tr><td>${x}</td>${d[i].map(v => `<td>${v}</td>`).join('')}<td>${i ? tB : tA}</td></tr>`).join('')}</table>Which class has the larger <b>share</b> of cyclists? Give both percentages.`,
            a: `A: ${num(d[0][2] / tA * 100, 1)}%, B: ${num(d[1][2] / tB * 100, 1)}% ⇒ ${d[0][2] / tA > d[1][2] / tB ? 'Class A' : d[0][2] / tA < d[1][2] / tB ? 'Class B' : 'equal'}`, s: 'Share = part ÷ that class\'s total × 100 (a 100% stacked bar shows exactly this).' };
        } },
      { title: 'Average after adding or removing', levels: [2, 3], gen(R) {
          const n = R.int(10, 30), m = R.int(30, 60), x = R.int(10, 90), add = R.chance(.5);
          const nm = add ? (n * m + x) / (n + 1) : (n * m - x) / (n - 1);
          return { q: `The average age of ${n} members of a club is ${m} years. ${add ? `A new member aged ${x} joins.` : `A member aged ${x} leaves.`} Find the new average.`, a: `${num(nm)} years`, ans: nm, tol: 0.01, s: `total = ${n * m}; new total = ${add ? n * m + x : n * m - x}; ÷ ${add ? n + 1 : n - 1}` };
        } }
    ],

    quiz: [
      { q: '20 students average 60 and 30 students average 70. Combined average?', o: ['65', '66', '64', '67'], a: 1, e: '(1200 + 2100)/50 = 66.' },
      { q: 'When is the combined mean equal to (m₁ + m₂)/2?', o: ['always', 'when the groups have equal size', 'never', 'when m₁ = 0'], a: 1, e: 'Equal weights.' },
      { q: 'Weights 40% and 60% on scores 50 and 100 give', o: ['75', '80', '70', '60'], a: 1, e: '20 + 60.' },
      { q: '1 L of 10% juice + 1 L of water gives', o: ['10%', '5%', '20%', '0%'], a: 1, e: '0.1 L in 2 L.' },
      { q: 'The mean of 5 numbers is 12. Their sum is', o: ['12', '17', '60', '2.4'], a: 2, e: 'Sum = mean × count.' },
      { q: 'A 100% stacked bar chart is best for comparing', o: ['totals', 'shares (proportions)', 'single values', 'time'], a: 1, e: 'Every bar is scaled to 100%.' },
      { q: 'Combined mean of groups with means 40 and 80 must lie', o: ['below 40', 'between 40 and 80', 'above 80', 'exactly 60'], a: 1, e: 'Weighted means lie between.' },
      { q: 'Median of 3, 9, 4, 7, 5 is', o: ['4', '5', '7', '5.6'], a: 1, e: 'Sorted: 3, 4, 5, 7, 9.' },
      { q: 'Group A (10 people) averages 50; group B averages 80; combined average 70. Size of B?', o: ['10', '15', '20', '25'], a: 2, e: '500 + 80x = 70(10 + x) ⇒ x = 20.' },
      { q: 'Adding water to a salt solution', o: ['raises concentration', 'lowers concentration', 'keeps it the same', 'removes salt'], a: 1, e: 'Same salt, bigger total.' },
      { q: 'Class A: 12 of 40 cycle. Class B: 10 of 25 cycle. Larger share?', o: ['A (30%)', 'B (40%)', 'equal', 'cannot tell'], a: 1, e: '12/40 = 30%, 10/25 = 40%.' }
    ],

    teach: {
      outcomes: ['Compute and interpret mean, median and mode', 'Combine averages of groups of different sizes and compute weighted averages', 'Solve mixture and dilution problems', 'Read and choose between stacked and 100% stacked bar charts'],
      periods: [
        { t: 'Combining averages', flow: [['10 min', 'Puzzle: two sections\' averages are 70 and 80 — is the school average 75?'], ['15 min', 'Explore panel 1: the balance; formula.'], ['15 min', 'Practice — combined and weighted averages.']] },
        { t: 'Mixtures', flow: [['10 min', 'Demonstration with coloured water / lemon juice in measuring cups.'], ['15 min', 'Explore panel 2; dilution problems.'], ['15 min', 'Reverse mixture problem (HOTS).']] },
        { t: 'Stacked bar charts', flow: [['15 min', 'Class survey (how you travel to school); draw stacked and 100% stacked bars.'], ['15 min', 'Explore panel 3; numbers vs shares.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Averaging averages.', 'Treating % of different wholes as comparable numbers.', 'Assuming water has no effect because it has 0% substance.'],
      activities: ['Class height survey by rows: combine row averages correctly.', 'Make lemonade at two strengths and mix.', 'Collect data on time use (sleep, school, play) and draw 100% stacked bars.'],
      exit: ['Groups of 10 and 40 with means 50 and 60: combined mean?', '200 mL of 15% + 300 mL of 5%: strength?', 'Which chart compares shares across groups of different sizes?'],
      homework: 'Find out how your school calculates the final term score (weights) and compute yours.'
    },

    slides: [
      { t: 'How Quantities Combine', b: ['Mean recap', 'Combined and weighted averages', 'Mixtures', 'Stacked bar charts'] },
      { t: 'Combining groups', b: ['Combined mean = (n₁m₁ + n₂m₂)/(n₁ + n₂)', 'Lies between m₁ and m₂', 'Leans towards the larger group', 'Not the average of averages!'] },
      { t: 'Weighted average', b: ['Σ(weight × value) ÷ Σweights', 'Term 1 40%, Term 2 60%: 0.4 × 70 + 0.6 × 85 = 79'] },
      { t: 'Mixtures', b: ['Concentration = substance ÷ total', 'Mix: add substances, add totals, divide', 'Water: 0% but adds to the total'] },
      { t: 'Stacked bars', b: ['Stacked: heights show totals and parts', '100% stacked: each bar = 100%, shows shares', 'Bigger number ≠ bigger share'] },
      { t: 'Check yourself', b: ['10 students avg 40, 30 students avg 60 → ?', '1 L of 20% + 1 L of 0% → ?', 'Answers: 55 · 10%'] }
    ]
  });
})();
