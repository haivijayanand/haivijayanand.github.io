/*
TOOL:    class12_maths_ch02
FAMILY:  CBSE_REVISION / Class 12 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 2 Inverse Trigonometric Functions - revise, board focus, 2 explore panels (restricted branch and mirror in y = x, principal value finder), 6 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { C, num } = G9;
  const PV = { // value -> [display, degrees] principal values
    sin: [['−1', -90], ['−√3/2', -60], ['−1/√2', -45], ['−1/2', -30], ['0', 0], ['1/2', 30], ['1/√2', 45], ['√3/2', 60], ['1', 90]],
    cos: [['−1', 180], ['−√3/2', 150], ['−1/√2', 135], ['−1/2', 120], ['0', 90], ['1/2', 60], ['1/√2', 45], ['√3/2', 30], ['1', 0]],
    tan: [['−√3', -60], ['−1', -45], ['−1/√3', -30], ['0', 0], ['1/√3', 30], ['1', 45], ['√3', 60]],
    cot: [['−√3', 150], ['−1', 135], ['−1/√3', 120], ['0', 90], ['1/√3', 60], ['1', 45], ['√3', 30]],
    sec: [['−2', 120], ['−√2', 135], ['−2/√3', 150], ['2/√3', 30], ['√2', 45], ['2', 60], ['1', 0], ['−1', 180]],
    cosec: [['−2', -30], ['−√2', -45], ['−2/√3', -60], ['2/√3', 60], ['√2', 45], ['2', 30], ['1', 90], ['−1', -90]]
  };
  const rad = (d) => { if (d === 0) return '0'; const g = G9.gcd(Math.abs(d), 180), n = d / g, den = 180 / g; const s = n < 0 ? '−' : ''; const m = Math.abs(n); return den === 1 ? `${s}${m === 1 ? '' : m}π` : `${s}${m === 1 ? '' : m}π/${den}`; };

  G9.register({
    no: 2, part: 'Unit I · Relations and Functions (8 marks)', short: 'Inverse trig functions', title: 'Inverse Trigonometric Functions',
    blurb: 'Restricting trig functions to make them bijective, principal value branches, domains, ranges and graphs.',
    revise: {
      oneLine: 'Trig functions are not one-one, so each is restricted to a principal branch where it is bijective; the inverse returns the angle in that branch. The graph of sin⁻¹ is the mirror image of the restricted sine graph in y = x.',
      sections: [
        { h: 'Domains and principal value ranges', html: `<table class="t"><tr><th>Function</th><th>Domain</th><th>Range (principal branch)</th></tr>
          <tr><td>sin⁻¹x</td><td>[−1, 1]</td><td>[−π/2, π/2]</td></tr><tr><td>cos⁻¹x</td><td>[−1, 1]</td><td>[0, π]</td></tr><tr><td>tan⁻¹x</td><td>R</td><td>(−π/2, π/2)</td></tr>
          <tr><td>cot⁻¹x</td><td>R</td><td>(0, π)</td></tr><tr><td>sec⁻¹x</td><td>R − (−1, 1)</td><td>[0, π] − {π/2}</td></tr><tr><td>cosec⁻¹x</td><td>R − (−1, 1)</td><td>[−π/2, π/2] − {0}</td></tr></table>` },
        { h: 'Principal values', html: `<p>sin⁻¹(1/2) = π/6; cos⁻¹(−1/2) = 2π/3 (not −π/3 — cos⁻¹ lies in [0, π]); tan⁻¹(−1) = −π/4.</p>
          <p>Negative arguments: sin⁻¹(−x) = −sin⁻¹x, tan⁻¹(−x) = −tan⁻¹x, cosec⁻¹(−x) = −cosec⁻¹x; but cos⁻¹(−x) = π − cos⁻¹x, cot⁻¹(−x) = π − cot⁻¹x, sec⁻¹(−x) = π − sec⁻¹x.</p>` },
        { h: 'Useful results', html: `<ul><li>sin(sin⁻¹x) = x for x ∈ [−1, 1]; sin⁻¹(sin x) = x only for x ∈ [−π/2, π/2].</li><li>sin⁻¹x + cos⁻¹x = π/2; tan⁻¹x + cot⁻¹x = π/2.</li>
          <li>sin⁻¹(1/x) = cosec⁻¹x, cos⁻¹(1/x) = sec⁻¹x, tan⁻¹(1/x) = cot⁻¹x (x &gt; 0).</li></ul>
          <p>Example: sin⁻¹(sin 3π/5) = π − 3π/5 = 2π/5, because 3π/5 is outside [−π/2, π/2].</p>` },
        { h: 'Graphs', html: `<p>Draw the restricted trig graph, then reflect in y = x. sin⁻¹ rises from (−1, −π/2) to (1, π/2); cos⁻¹ falls from (−1, π) to (1, 0); tan⁻¹ has horizontal asymptotes y = ±π/2.</p>` }
      ],
      formulas: [['sin⁻¹x range', '[−π/2, π/2]'], ['cos⁻¹x range', '[0, π]'], ['tan⁻¹x range', '(−π/2, π/2)'], ['cos⁻¹(−x)', 'π − cos⁻¹x'], ['sin⁻¹x + cos⁻¹x', 'π/2'], ['tan⁻¹x + cot⁻¹x', 'π/2']],
      terms: [['Principal value', 'the value in the principal branch'], ['Principal branch', 'interval on which the trig function is restricted'], ['sin⁻¹x', 'arcsin x — not 1/sin x']],
      traps: ['sin⁻¹x ≠ (sin x)⁻¹.', 'cos⁻¹ of a negative is obtuse, not negative.', 'sin⁻¹(sin x) = x only inside the principal branch.', 'Writing angles in degrees when the answer is expected in radians.'],
      board: '<p><b>Unit I — 8 marks</b> together with Ch 1. Expect principal values and expressions like tan⁻¹(1) + cos⁻¹(−1/2) + sin⁻¹(−1/2) (1–2 marks), domain/range MCQs, and simplifying sin⁻¹(sin x)-type expressions.</p>',
      bridge: '<p>Needs inverse functions (Ch 1) and trigonometry (Class 11 Ch 3). Derivatives of these functions come in Ch 5; integrals giving tan⁻¹ and sin⁻¹ in Ch 7.</p>'
    },

    explore: [
      {
        title: 'Restrict, then reflect in y = x', intro: 'Choose a function. The thin curve is the full trig graph, the thick part the principal branch, and the orange curve its inverse (mirror image in y = x).',
        build(el, K) {
          const F = [['sin', Math.sin, Math.asin, -Math.PI / 2, Math.PI / 2], ['cos', Math.cos, Math.acos, 0, Math.PI], ['tan', Math.tan, Math.atan, -Math.PI / 2 + 0.01, Math.PI / 2 - 0.01]];
          let k = 0; const row = K.row(el); K.select(row, 'function', ['sin x → sin⁻¹x', 'cos x → cos⁻¹x', 'tan x → tan⁻¹x'], i => { k = i; b.redraw(); });
          const b = new K.Board(el, { xmin: -4.5, xmax: 4.5, ymin: -3.5, ymax: 3.8 }); const rd = K.read(el);
          b.onDraw = () => { b.base(); const [n, f, g, lo, hi] = F[k];
            b.fn(x => Math.abs(f(x)) > 6 ? NaN : f(x), { color: C.grey, w: 1.5 }); b.fn(x => x < lo || x > hi ? NaN : f(x), { color: C.blue, w: 4 });
            b.fn(x => { const v = g(x); return isNaN(v) ? NaN : v; }, { color: C.orange, w: 4 }); b.line(-3.5, -3.5, 3.8, 3.8, { color: C.purple, w: 1.5, dash: [6, 4] });
            if (k === 2) { b.line(-4.5, Math.PI / 2, 4.5, Math.PI / 2, { color: C.orange, w: 1, dash: [3, 4] }); b.line(-4.5, -Math.PI / 2, 4.5, -Math.PI / 2, { color: C.orange, w: 1, dash: [3, 4] }); }
            rd.innerHTML = `<span style="color:var(--blue)">principal branch of ${n} x: x ∈ ${k === 0 ? '[−π/2, π/2]' : k === 1 ? '[0, π]' : '(−π/2, π/2)'}</span> · <span style="color:var(--orange)">${n}⁻¹x: domain ${k === 2 ? 'R' : '[−1, 1]'}, range ${k === 0 ? '[−π/2, π/2]' : k === 1 ? '[0, π]' : '(−π/2, π/2)'}</span> · purple: y = x`; };
          b.redraw(); return null;
        }
      },
      {
        title: 'Principal value on the unit circle', intro: 'Pick the function and value. The allowed arc (principal branch) is highlighted and the principal angle is drawn.',
        build(el, K) {
          const names = ['sin', 'cos', 'tan']; let f = 1, j = 3; const row = K.row(el); const rd = K.read(el);
          const sv = K.select(row, 'function', names.map(n => n + '⁻¹'), i => { f = i; j = Math.min(j, PV[names[f]].length - 1); vs(); b.redraw(); });
          const holder = document.createElement('span'); row.appendChild(holder);
          function vs() { holder.innerHTML = ''; K.select(holder, 'of', PV[names[f]].map(p => p[0]), i => { j = i; b.redraw(); }); const s = holder.querySelector('select'); if (s) s.value = j; }
          const b = new K.Board(el, { xmin: -1.8, xmax: 1.8, ymin: -1.4, ymax: 1.4 });
          b.onDraw = () => { b.base(); b.circle(0, 0, 1, { color: C.grey, w: 1.5 }); const n = names[f]; const ranges = { sin: [-Math.PI / 2, Math.PI / 2], cos: [0, Math.PI], tan: [-Math.PI / 2, Math.PI / 2] }; const [a1, a2] = ranges[n];
            b.arc(0, 0, 1, a1, a2, { color: C.blue, w: 6 }); const [disp, deg] = PV[n][j]; const t = deg * Math.PI / 180;
            b.arc(0, 0, 0.35, 0, t, { color: C.orange, w: 3 }); b.line(0, 0, Math.cos(t), Math.sin(t), { color: C.orange, w: 3 }); b.dot(Math.cos(t), Math.sin(t), { color: C.orange, r: 6 });
            if (n === 'sin') b.line(-1.6, Math.sin(t), 1.6, Math.sin(t), { color: C.purple, w: 1.5, dash: [5, 4] }); if (n === 'cos') b.line(Math.cos(t), -1.3, Math.cos(t), 1.3, { color: C.purple, w: 1.5, dash: [5, 4] });
            rd.innerHTML = `${n}⁻¹(${disp}) = <b>${rad(deg)}</b> (${deg}°) · blue arc: principal branch ${n === 'cos' ? '[0, π]' : n === 'sin' ? '[−π/2, π/2]' : '(−π/2, π/2)'} · the dashed line shows the other angle with the same ${n} value, which is rejected`; };
          vs(); b.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Principal value', gen(R) {
          const n = R.pick(Object.keys(PV)), [d, deg] = R.pick(PV[n]);
          return { q: `Find the principal value of ${n}⁻¹(${d}).`, a: rad(deg), ans: deg * Math.PI / 180, tol: 0.002, s: `${n}⁻¹ range: ${{ sin: '[−π/2, π/2]', cos: '[0, π]', tan: '(−π/2, π/2)', cot: '(0, π)', sec: '[0, π] − {π/2}', cosec: '[−π/2, π/2] − {0}' }[n]}` };
        } },
      { title: 'Sum of principal values', levels: [2, 3], gen(R) {
          const ns = R.shuffle(['sin', 'cos', 'tan']).slice(0, 2); const p1 = R.pick(PV[ns[0]]), p2 = R.pick(PV[ns[1]]); const sg = R.pick([1, -1, 2]);
          const tot = p1[1] + sg * p2[1];
          return { q: `Evaluate ${ns[0]}⁻¹(${p1[0]}) ${sg < 0 ? '−' : '+'} ${sg === 2 ? '2 ' : ''}${ns[1]}⁻¹(${p2[0]}).`, a: rad(tot), ans: tot * Math.PI / 180, tol: 0.002, s: `${rad(p1[1])} ${sg < 0 ? '−' : '+'} ${sg === 2 ? '2 × ' : ''}${rad(p2[1])}` };
        } },
      { title: 'Domain and range', levels: [1, 2], gen(R) {
          const items = [['sin⁻¹x', '[−1, 1]', '[−π/2, π/2]'], ['cos⁻¹x', '[−1, 1]', '[0, π]'], ['tan⁻¹x', 'R', '(−π/2, π/2)'], ['cot⁻¹x', 'R', '(0, π)'], ['sec⁻¹x', 'R − (−1, 1)', '[0, π] − {π/2}'], ['cosec⁻¹x', 'R − (−1, 1)', '[−π/2, π/2] − {0}']];
          const k = R.int(2, 4); if (R.chance(.4)) return { q: `Find the domain of sin⁻¹(${k}x − 1).`, a: `[0, ${G9.Q(2, k)}]`, s: `−1 ≤ ${k}x − 1 ≤ 1` };
          const [f, d, r] = R.pick(items); return { q: `State the domain and principal value range of ${f}.`, a: `domain ${d}, range ${r}` };
        } },
      { title: 'f⁻¹(f(x)) outside the branch', levels: [2, 3], gen(R) {
          const items = [['sin⁻¹(sin 2π/3)', 'π/3'], ['cos⁻¹(cos 7π/6)', '5π/6'], ['tan⁻¹(tan 3π/4)', '−π/4'], ['sin⁻¹(sin 3π/5)', '2π/5'], ['cos⁻¹(cos 13π/6)', 'π/6'], ['tan⁻¹(tan 7π/6)', 'π/6'], ['sin⁻¹(sin 5π/6)', 'π/6'], ['cos⁻¹(cos(−π/3))', 'π/3']];
          const [q, a] = R.pick(items); return { q: `Evaluate ${q}.`, a, s: 'Bring the angle into the principal branch with the same function value.' };
        } },
      { title: 'Using sin⁻¹x + cos⁻¹x = π/2', levels: [2, 3], gen(R) {
          const items = [['sin(π/3 − sin⁻¹(−1/2))', '1'], ['tan⁻¹√3 − sec⁻¹(−2)', '−π/3'], ['cos(sin⁻¹(3/5))', '4/5'], ['sin(cos⁻¹(5/13))', '12/13'], ['tan(sin⁻¹(3/5))', '3/4'], ['sin⁻¹(1/3) + cos⁻¹(1/3)', 'π/2'], ['cot(tan⁻¹ a + cot⁻¹ a)', '0']];
          const [q, a] = R.pick(items); return { q: `Find the value of ${q}.`, a };
        } },
      { title: 'Negative arguments', levels: [1, 2], gen(R) {
          const items = [['cos⁻¹(−x)', 'π − cos⁻¹x'], ['sin⁻¹(−x)', '−sin⁻¹x'], ['tan⁻¹(−x)', '−tan⁻¹x'], ['cot⁻¹(−x)', 'π − cot⁻¹x'], ['sec⁻¹(−x)', 'π − sec⁻¹x'], ['cosec⁻¹(−x)', '−cosec⁻¹x']];
          const [q, a] = R.pick(items); return { q: `Write ${q} in terms of the function of x.`, a };
        } }
    ],

    quiz: [
      { q: 'Principal value of sin⁻¹(−1/2)', o: ['−π/6', '7π/6', '5π/6', 'π/6'], a: 0, e: 'Range [−π/2, π/2].' },
      { q: 'Principal value of cos⁻¹(−1/2)', o: ['2π/3', '−π/3', '4π/3', 'π/3'], a: 0, e: 'Range [0, π].' },
      { q: 'Range of tan⁻¹x', o: ['(−π/2, π/2)', '[0, π]', '[−π/2, π/2]', 'R'], a: 0, e: 'Open interval.' },
      { q: 'Domain of sin⁻¹x', o: ['R', '[−1, 1]', '[0, π]', '(−1, 1)'], a: 1, e: 'Values of sine.' },
      { q: 'sin⁻¹x + cos⁻¹x =', o: ['π', 'π/2', '0', 'π/4'], a: 1, e: 'Standard.' },
      { q: 'tan⁻¹(1) + cos⁻¹(−1/2) + sin⁻¹(−1/2) =', o: ['3π/4', 'π/2', 'π', '5π/12'], a: 0, e: 'π/4 + 2π/3 − π/6.' },
      { q: 'sin⁻¹(sin 2π/3) =', o: ['2π/3', 'π/3', '−π/3', '4π/3'], a: 1, e: '2π/3 is outside the branch.' },
      { q: 'cos⁻¹(−x) =', o: ['−cos⁻¹x', 'π − cos⁻¹x', 'π + cos⁻¹x', 'cos⁻¹x'], a: 1, e: 'Standard.' },
      { q: 'Principal value of sec⁻¹(2)', o: ['π/3', 'π/6', '2π/3', '−π/3'], a: 0, e: 'cos⁻¹(1/2).' },
      { q: 'Range of cot⁻¹x', o: ['(0, π)', '(−π/2, π/2)', '[0, π]', 'R'], a: 0, e: 'Principal branch.' },
      { q: 'sin⁻¹x means', o: ['1/sin x', 'the angle whose sine is x', '(sin x)²', 'sin(1/x)'], a: 1, e: 'Inverse function.' }
    ],

    teach: {
      outcomes: ['Explain why trig functions are restricted before inverting', 'State domains and principal ranges of the six inverse functions', 'Find principal values and simplify expressions', 'Sketch the graphs of sin⁻¹, cos⁻¹ and tan⁻¹'],
      periods: [
        { t: 'Branches and graphs', flow: [['10 min', 'Why sin x has no inverse on R (horizontal line test).'], ['15 min', 'Explore panel 1: restrict and reflect.'], ['15 min', 'Domain–range table.']] },
        { t: 'Principal values', flow: [['15 min', 'Explore panel 2: unit circle.'], ['15 min', 'Negative arguments; f⁻¹(f(x)) problems.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['sin⁻¹x = 1/sin x.', 'cos⁻¹ of a negative given as a negative angle.', 'sin⁻¹(sin x) = x always.'],
      activities: ['Fold graph paper along y = x to see the mirror graphs.', 'Card match: value ↔ principal angle.'],
      exit: ['Principal value of tan⁻¹(−√3).', 'cos⁻¹(cos 7π/6).', 'Domain of cos⁻¹(2x).'],
      homework: 'Find the value of tan⁻¹(1) + cos⁻¹(−1/2) + sin⁻¹(−1/2) and of cos⁻¹(1/2) + 2 sin⁻¹(1/2).'
    },

    slides: [
      { t: 'Inverse Trigonometric Functions', b: ['Restrict to make bijective', 'Principal branches', 'Principal values', 'Graphs'] },
      { t: 'Principal ranges', b: ['sin⁻¹: [−π/2, π/2]', 'cos⁻¹: [0, π]', 'tan⁻¹: (−π/2, π/2)', 'cot⁻¹: (0, π)'] },
      { t: 'Negative arguments', b: ['sin⁻¹(−x) = −sin⁻¹x', 'cos⁻¹(−x) = π − cos⁻¹x', 'tan⁻¹(−x) = −tan⁻¹x'] },
      { t: 'Graphs', b: ['Reflect restricted graph in y = x', 'tan⁻¹ has asymptotes y = ±π/2'] },
      { t: 'Check yourself', b: ['cos⁻¹(−√3/2)?', 'sin⁻¹(sin 5π/6)?', 'Answers: 5π/6 · π/6'] }
    ],

    fs: { groups: [
        ['Domain → principal range', [['sin⁻¹x', '[−1, 1] → [−π/2, π/2]'], ['cos⁻¹x', '[−1, 1] → [0, π]'], ['tan⁻¹x', 'R → (−π/2, π/2)'], ['cot⁻¹x', 'R → (0, π)'], ['sec⁻¹x', 'R − (−1, 1) → [0, π] − {π/2}'], ['cosec⁻¹x', 'R − (−1, 1) → [−π/2, π/2] − {0}']]],
        ['Negative arguments', [['sin⁻¹, tan⁻¹, cosec⁻¹ of (−x)', '− f⁻¹(x)'], ['cos⁻¹, cot⁻¹, sec⁻¹ of (−x)', 'π − f⁻¹(x)']]],
        ['Identities', [['sin⁻¹x + cos⁻¹x', 'π/2'], ['tan⁻¹x + cot⁻¹x', 'π/2'], ['sec⁻¹x + cosec⁻¹x', 'π/2'], ['sin⁻¹(1/x)', 'cosec⁻¹x'], ['sin(sin⁻¹x)', 'x, x ∈ [−1, 1]'], ['sin⁻¹(sin x)', 'x only for x ∈ [−π/2, π/2]']]],
        ['Key values', [['sin⁻¹(1/2), cos⁻¹(1/2)', 'π/6, π/3'], ['tan⁻¹1, tan⁻¹√3', 'π/4, π/3'], ['cos⁻¹(−1/2)', '2π/3'], ['tan⁻¹(−1)', '−π/4']]]],
      ex: [['tan⁻¹1 + cos⁻¹(−1/2) + sin⁻¹(−1/2)', 'π/4 + 2π/3 − π/6 = 3π/4'], ['cos⁻¹(cos 7π/6)', '5π/6']],
      rem: ['Answer must lie in the principal range.', 'cos⁻¹ never gives a negative angle.', 'sin⁻¹x is not 1/sin x.'] }
  });
})();
