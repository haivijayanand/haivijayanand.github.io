/*
TOOL:    class10_maths_ch08
FAMILY:  CBSE_REVISION / Class 10 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 8 Introduction to Trigonometry - revise, board focus, 2 explore panels (ratios in a right triangle, standard-angle table), 8 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { F, Q, num, C, surdH, gcd } = G9;
  const STD = { 0: ['0', '1', '0'], 30: [F(1, 2), F('√3', 2), F(1, '√3')], 45: [F(1, '√2'), F(1, '√2'), '1'], 60: [F('√3', 2), F(1, 2), '√3'], 90: ['1', '0', 'not defined'] };
  const SV = { 0: [0, 1, 0], 30: [0.5, Math.sqrt(3) / 2, 1 / Math.sqrt(3)], 45: [Math.SQRT1_2, Math.SQRT1_2, 1], 60: [Math.sqrt(3) / 2, 0.5, Math.sqrt(3)], 90: [1, 0, Infinity] };

  G9.register({
    no: 8, part: 'Unit V · Trigonometry (12 marks)', short: 'Trigonometry', title: 'Introduction to Trigonometry',
    blurb: 'Trigonometric ratios of an acute angle, values at 0°, 30°, 45°, 60°, 90°, and the three identities.',
    revise: {
      oneLine: 'In a right triangle, the ratios of sides depend only on the acute angle (all such triangles are similar). sin, cos, tan and their reciprocals, the standard values and sin²A + cos²A = 1 are the whole toolkit.',
      sections: [
        { h: 'The six ratios', html: `<p>In right △ABC with ∠B = 90°, for angle A: opposite side BC, adjacent side AB, hypotenuse AC.</p>
          <div class="box m">sin A = ${F('opp', 'hyp')}, cos A = ${F('adj', 'hyp')}, tan A = ${F('opp', 'adj')} = ${F('sin A', 'cos A')}<br>cosec A = ${F(1, 'sin A')}, sec A = ${F(1, 'cos A')}, cot A = ${F(1, 'tan A')}</div>
          <p>Memory aid: "<b>S</b>ome <b>O</b>ld <b>H</b>orses <b>C</b>an <b>A</b>lways <b>H</b>ear <b>T</b>heir <b>O</b>wner's <b>A</b>pproach" (SOH CAH TOA).</p>` },
        { h: 'Given one ratio, find the others', html: `<p>If sin A = 3/5, draw a right triangle with opposite 3, hypotenuse 5; the third side is √(25 − 9) = 4. So cos A = 4/5, tan A = 3/4, etc. (Any multiple k works — the ratios do not change.)</p>` },
        { h: 'Standard values', html: `<table class="t" style="text-align:center"><tr><th>∠A</th><th>0°</th><th>30°</th><th>45°</th><th>60°</th><th>90°</th></tr>
          <tr><th>sin</th>${[0, 30, 45, 60, 90].map(d => `<td>${STD[d][0]}</td>`).join('')}</tr><tr><th>cos</th>${[0, 30, 45, 60, 90].map(d => `<td>${STD[d][1]}</td>`).join('')}</tr><tr><th>tan</th>${[0, 30, 45, 60, 90].map(d => `<td>${STD[d][2]}</td>`).join('')}</tr></table>
          <p>Trick: sin of 0°, 30°, 45°, 60°, 90° is √0/2, √1/2, √2/2, √3/2, √4/2; cos is the same list backwards. As A increases from 0° to 90°, sin increases and cos decreases.</p>` },
        { h: 'Identities', html: `<div class="box m">sin²A + cos²A = 1 &nbsp;·&nbsp; 1 + tan²A = sec²A &nbsp;·&nbsp; 1 + cot²A = cosec²A</div>
          <p>To prove an identity: start from the more complicated side, write everything in sin and cos, use the identities, and arrive at the other side. Never move terms across the "=" while proving.</p>` }
      ],
      formulas: [['sin, cos, tan', 'opp/hyp, adj/hyp, opp/adj'], ['tan A', 'sin A / cos A'], ['Reciprocals', 'cosec = 1/sin, sec = 1/cos, cot = 1/tan'], ['Identity 1', 'sin²A + cos²A = 1'], ['Identity 2', '1 + tan²A = sec²A'], ['Identity 3', '1 + cot²A = cosec²A']],
      terms: [['Hypotenuse', 'side opposite the right angle'], ['Opposite / adjacent', 'relative to the chosen acute angle'], ['Identity', 'true for every angle where defined'], ['sin²A', '(sin A)², not sin(A²)']],
      traps: ['sin A is one symbol — not "sin × A".', 'tan 90° is not defined (cos 90° = 0).', 'sin(A + B) ≠ sin A + sin B; check with A = B = 30°.', 'Opposite and adjacent swap when you change the angle.'],
      board: '<p><b>Unit V (Trigonometry) — 12 marks</b> with Ch 9. Expect: 1-mark values and simple evaluations; 2–3 marks on finding all ratios from one, evaluating expressions with standard angles; a 3-mark identity proof. Show every step of a proof.</p>',
      bridge: '<p>Ch 9 uses tan 30°, 45°, 60° for heights and distances. The ratios exist because right triangles with the same angle are similar (Ch 6).</p>'
    },

    explore: [
      {
        title: 'Ratios depend only on the angle', intro: 'Change angle A and the size of the triangle. The sides change; the ratios do not.',
        build(el, K) {
          let A = 35, s = 6; const row = K.row(el);
          K.slider(row, 'angle A (°)', 5, 85, 1, A, v => { A = v; b.redraw(); }); K.slider(row, 'size (hypotenuse)', 2, 10, 0.5, s, v => { s = v; b.redraw(); });
          const b = new K.Board(el, { xmin: -1, xmax: 12, ymin: -1, ymax: 10, axes: false }); const rd = K.read(el);
          b.onDraw = () => {
            b.base(); const r = A * Math.PI / 180, adj = s * Math.cos(r), opp = s * Math.sin(r);
            b.poly([[0, 0], [adj, 0], [adj, opp]], { fill: C.blueL, color: C.blue }); b.rect(adj - 0.35, 0, 0.35, 0.35, { color: C.ink, w: 1.5 });
            b.arc(0, 0, 0.9, 0, r, { color: C.orange, w: 3 }); b.text(1.5, 0.35, 'A', { font: 'bold 15px', color: C.orange });
            b.text(adj / 2, -0.45, `adj ${num(adj)}`, { font: 'bold 13px' }); b.text(adj + 0.9, opp / 2, `opp ${num(opp)}`, { font: 'bold 13px' }); b.text(adj / 2 - 0.6, opp / 2 + 0.5, `hyp ${num(s)}`, { font: 'bold 13px', color: C.purple });
            rd.innerHTML = `sin ${A}° = ${num(opp)}/${num(s)} = <b>${num(Math.sin(r), 4)}</b> · cos ${A}° = <b>${num(Math.cos(r), 4)}</b> · tan ${A}° = <b>${num(Math.tan(r), 4)}</b> · sin² + cos² = ${num(Math.sin(r) ** 2 + Math.cos(r) ** 2, 4)}`;
          };
          b.redraw(); return null;
        }
      },
      {
        title: 'Build the standard-value table', intro: 'Press <kbd>S</kbd> to fill the table one step at a time: sin as √0/2 … √4/2, cos in reverse, tan = sin/cos.',
        build(el, K) {
          const rd = K.read(el); rd.style.fontFamily = 'Segoe UI'; const D = [0, 30, 45, 60, 90];
          const an = new K.Anim(4, () => draw(), { ms: 1300 }); an.i = 0;
          function draw() { const i = an.i;
            const row = (lab, f) => `<tr><th>${lab}</th>${D.map((d, k) => `<td>${f(d, k)}</td>`).join('')}</tr>`;
            rd.innerHTML = `<table class="t" style="width:auto;text-align:center;font-size:17px"><tr><th>A</th>${D.map(d => `<th>${d}°</th>`).join('')}</tr>` +
              row('√k / 2', (d, k) => i >= 0 ? `√${k}/2` : '') + row('sin', (d) => i >= 1 ? STD[d][0] : '') + row('cos', (d) => i >= 2 ? STD[d][1] : '') + row('tan = sin/cos', (d) => i >= 3 ? STD[d][2] : '') + '</table>' +
              ['Write √0/2, √1/2, √2/2, √3/2, √4/2.', 'Simplify: that row is sin.', 'cos is the sin row read backwards.', 'tan = sin ÷ cos (90°: division by 0, not defined).'][i];
          }
          K.anim(el, an); draw(); return an;
        }
      }
    ],

    gens: [
      { title: 'Given one ratio, find the others', gen(R, L) {
          const T = R.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]]); const [o, a, h] = R.chance(.5) ? T : [T[1], T[0], T[2]];
          const given = R.pick(['sin', 'cos', 'tan']); const gv = given === 'sin' ? `${o}/${h}` : given === 'cos' ? `${a}/${h}` : `${o}/${a}`;
          return { q: `If ${given} A = ${gv} (A acute), find the other five trigonometric ratios.`, a: `sin ${o}/${h}, cos ${a}/${h}, tan ${o}/${a}, cosec ${h}/${o}, sec ${h}/${a}, cot ${a}/${o}`.replace(`${given} ${gv}, `, ''), s: `Sides ${o}, ${a}, ${h} (${o}² + ${a}² = ${h}²)` };
        } },
      { title: 'Evaluate with standard angles', gen(R, L) {
          const exprs = [['sin 60° cos 30° + sin 30° cos 60°', '1'], ['2 tan²45° + cos²30° − sin²60°', '2'], ['cos 45° / (sec 30° + cosec 30°)', '(3√2 − √6)/8'], ['sin 30° + cos 60°', '1'], ['tan 45° × tan 60° × tan 30°', '1'], ['(1 − tan²45°)/(1 + tan²45°)', '0'], ['4(sin⁴30° + cos⁴60°) − 3(cos²45° − sin²90°)', '2'], ['2 sin 30° cos 30°', '√3/2 (= sin 60°)'], ['cos²45° + sin²45° + tan 45°', '2'], ['(sin 30° + tan 45° − cosec 60°)/(sec 30° + cos 60° + cot 45°)', '(43 − 24√3)/11']];
          const [q, a] = R.pick(L === 1 ? exprs.slice(0, 6) : exprs); return { q: `Evaluate: ${q}`, a, s: 'Substitute the standard values, then simplify.' };
        } },
      { title: 'Find the angle', levels: [1, 2], gen(R) {
          const items = [['2 sin 2θ = √3', 'θ = 30°'], ['tan(A + B) = √3 and tan(A − B) = 1/√3 (0° < A + B ≤ 90°, A > B)', 'A = 45°, B = 15°'], ['√3 tan θ = 1', 'θ = 30°'], ['2 cos θ = 1', 'θ = 60°'], ['sin θ = cos θ', 'θ = 45°'], ['sin(A − B) = 1/2, cos(A + B) = 1/2', 'A = 45°, B = 15°']];
          const [q, a] = R.pick(items); return { q: `Find the acute angle(s): ${q}`, a };
        } },
      { title: 'Prove the identity', levels: [2, 3], gen(R) {
          const items = [['(1 + tan²A) cos²A = 1', 'LHS = sec²A × cos²A = 1 = RHS'], ['(1 − cos²A) cosec²A = 1', 'LHS = sin²A × 1/sin²A = 1'], ['(sec A + tan A)(1 − sin A) = cos A', 'LHS = (1 + sin A)/cos A × (1 − sin A) = (1 − sin²A)/cos A = cos²A/cos A = cos A'], ['cos A/(1 + sin A) + (1 + sin A)/cos A = 2 sec A', 'LHS = [cos²A + (1 + sin A)²]/[cos A(1 + sin A)] = (2 + 2 sin A)/[cos A(1 + sin A)] = 2/cos A'], ['sin A/(1 − cos A) = (1 + cos A)/sin A', 'Cross-multiply idea: sin²A = 1 − cos²A = (1 − cos A)(1 + cos A); divide both by sin A(1 − cos A)'], ['(sin θ − cos θ)² + (sin θ + cos θ)² = 2', 'Expand: 2(sin²θ + cos²θ) = 2'], ['tan θ + cot θ = sec θ cosec θ', 'LHS = (sin²θ + cos²θ)/(sin θ cos θ) = 1/(sin θ cos θ)']];
          const [q, a] = R.pick(items); return { q: `Prove: ${q}`, a, s: 'Start with the more complicated side; use sin, cos and the identities.' };
        } },
      { title: 'Use an identity to find a value', gen(R) {
          const T = R.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17]]); const t = R.int(0, 2);
          if (t === 0) return { q: `If sin A = ${T[0]}/${T[2]}, find cos A using sin²A + cos²A = 1 (A acute).`, a: `${T[1]}/${T[2]}`, ans: T[1] / T[2], s: `cos A = √(1 − ${T[0] * T[0]}/${T[2] * T[2]}) = √(${T[1] * T[1]}/${T[2] * T[2]})` };
          if (t === 1) return { q: `If tan A = ${T[0]}/${T[1]}, find sec A using 1 + tan²A = sec²A (A acute).`, a: `${T[2]}/${T[1]}`, ans: T[2] / T[1], s: `sec²A = 1 + ${T[0] * T[0]}/${T[1] * T[1]} = ${T[2] * T[2]}/${T[1] * T[1]}` };
          return { q: `If sec θ + tan θ = ${T[2] + T[0]}/${T[1]}, find sec θ − tan θ.`, a: `${T[1]}/${T[2] + T[0]}`, ans: T[1] / (T[2] + T[0]), s: '(sec θ + tan θ)(sec θ − tan θ) = sec²θ − tan²θ = 1' };
        } },
      { title: 'True or false', levels: [1], gen(R) {
          const items = [['sin(A + B) = sin A + sin B', 'False: with A = B = 30°, sin 60° = √3/2 but sin 30° + sin 30° = 1'], ['The value of sin θ increases as θ increases from 0° to 90°', 'True'], ['cos θ increases as θ increases', 'False — it decreases'], ['sin θ = cos θ for all θ', 'False — only at 45°'], ['cot A is not defined for A = 0°', 'True'], ['tan A is always less than 1', 'False — tan 60° = √3']];
          const [q, a] = R.pick(items); return { q: `True or false? ${q}`, a };
        } },
      { title: 'Express in terms of one ratio', levels: [3], gen(R) {
          const items = [['sin A, sec A, tan A in terms of cot A', 'sin A = 1/√(1 + cot²A), sec A = √(1 + cot²A)/cot A, tan A = 1/cot A'], ['cos A and tan A in terms of sin A', 'cos A = √(1 − sin²A), tan A = sin A/√(1 − sin²A)'], ['sin A and cos A in terms of tan A', 'sin A = tan A/√(1 + tan²A), cos A = 1/√(1 + tan²A)']];
          const [q, a] = R.pick(items); return { q: `Express ${q}.`, a, s: 'Use the identities with A acute (positive roots).' };
        } },
      { title: 'Ratios in a given triangle', levels: [1, 2], gen(R) {
          const T = R.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]);
          return { q: `In △ABC right-angled at B, AB = ${T[1]} cm and BC = ${T[0]} cm. Find sin A, cos A, sin C and cos C.`, a: `AC = ${T[2]}; sin A = ${T[0]}/${T[2]}, cos A = ${T[1]}/${T[2]}, sin C = ${T[1]}/${T[2]}, cos C = ${T[0]}/${T[2]}`, s: 'For A: opposite BC, adjacent AB. For C they swap.' };
        } }
    ],

    quiz: [
      { q: 'sin 30° =', o: ['1/2', '√3/2', '1/√2', '1'], a: 0, e: 'Standard value.' },
      { q: 'tan 60° =', o: ['1/√3', '√3', '1', '√3/2'], a: 1, e: 'sin 60°/cos 60°.' },
      { q: 'If sin A = 3/5, cos A =', o: ['4/5', '3/4', '5/4', '5/3'], a: 0, e: '3-4-5 triangle.' },
      { q: 'sin²A + cos²A =', o: ['0', '1', '2', 'tan²A'], a: 1, e: 'Identity.' },
      { q: '1 + tan²A =', o: ['sec²A', 'cosec²A', 'cos²A', 'cot²A'], a: 0, e: 'Divide identity 1 by cos²A.' },
      { q: 'Which is not defined?', o: ['sin 90°', 'tan 90°', 'cos 0°', 'tan 0°'], a: 1, e: 'cos 90° = 0.' },
      { q: '2 tan 30° / (1 + tan²30°) =', o: ['sin 60°', 'cos 60°', 'tan 60°', 'sin 30°'], a: 0, e: '(2/√3)/(4/3) = √3/2.' },
      { q: '(sec A + tan A)(sec A − tan A) =', o: ['0', '1', '2', 'sec²A'], a: 1, e: 'sec² − tan² = 1.' },
      { q: 'If tan A = 1 (A acute), then A =', o: ['30°', '45°', '60°', '90°'], a: 1, e: 'tan 45° = 1.' },
      { q: 'As A increases from 0° to 90°, cos A', o: ['increases', 'decreases', 'stays 1', 'becomes infinite'], a: 1, e: '1 → 0.' },
      { q: 'In △ABC (∠B = 90°), tan A × tan C =', o: ['0', '1', 'tan 90°', '2'], a: 1, e: '(BC/AB)(AB/BC).' }
    ],

    teach: {
      outcomes: ['Define the six trigonometric ratios of an acute angle', 'Find all ratios from one', 'Recall and use standard values', 'Prove identities using sin²A + cos²A = 1 and its forms'],
      periods: [
        { t: 'Ratios', flow: [['10 min', 'Ladder against a wall: same angle, different sizes — same ratios.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Find all ratios from one (Practice).']] },
        { t: 'Standard values', flow: [['15 min', 'Explore panel 2: build the table.'], ['15 min', 'Evaluate expressions.'], ['10 min', 'Find the angle problems.']] },
        { t: 'Identities', flow: [['10 min', 'Derive the three identities from Pythagoras.'], ['20 min', 'Proof strategy; group proofs.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['sin A as sin × A.', 'sin(A + B) = sin A + sin B.', 'Moving terms across "=" in a proof.'],
      activities: ['Clinometer from a protractor and straw; measure ratios.', 'Hand trick for standard values.', 'Identity proof relay.'],
      exit: ['sin 60° cos 30° + cos 60° sin 30°.', 'If tan A = 4/3, find sin A.', 'Prove (1 − sin²A) sec²A = 1.'],
      homework: 'If 3 cot A = 4, check whether (1 − tan²A)/(1 + tan²A) = cos²A − sin²A.'
    },

    slides: [
      { t: 'Introduction to Trigonometry', b: ['Ratios of an acute angle', 'Standard values', 'Identities'] },
      { t: 'The ratios', b: ['sin = opp/hyp, cos = adj/hyp, tan = opp/adj', 'cosec, sec, cot are reciprocals', 'Depend only on the angle'] },
      { t: 'Standard values', b: ['sin: √0/2, √1/2, √2/2, √3/2, √4/2', 'cos: same list reversed', 'tan = sin/cos; tan 90° not defined'] },
      { t: 'Identities', b: ['sin²A + cos²A = 1', '1 + tan²A = sec²A', '1 + cot²A = cosec²A'] },
      { t: 'Proving identities', b: ['Start from the complicated side', 'Convert to sin and cos', 'Use the identities; never cross "="'] },
      { t: 'Check yourself', b: ['tan 30° × tan 60°?', 'If cos A = 5/13, tan A?', 'Answers: 1 · 12/5'] }
    ],

    fs: { groups: [
        ['Ratios (right angle at B, angle A)', [['sin A', 'BC/AC (opp/hyp)'], ['cos A', 'AB/AC (adj/hyp)'], ['tan A', 'BC/AB = sin A/cos A'], ['cosec, sec, cot', '1/sin, 1/cos, 1/tan']]],
        ['Standard values', [['sin 0°, 30°, 45°, 60°, 90°', '0, 1/2, 1/√2, √3/2, 1'], ['cos 0°, 30°, 45°, 60°, 90°', '1, √3/2, 1/√2, 1/2, 0'], ['tan 0°, 30°, 45°, 60°, 90°', '0, 1/√3, 1, √3, not defined']]],
        ['Identities', [['', 'sin²A + cos²A = 1'], ['', '1 + tan²A = sec²A'], ['', '1 + cot²A = cosec²A'], ['Useful', '(sec A − tan A)(sec A + tan A) = 1']]],
        ['Behaviour (0° → 90°)', [['sin, tan', 'increase'], ['cos', 'decreases'], ['0 ≤ sin A, cos A ≤ 1', 'sec A, cosec A ≥ 1']]]],
      ex: [['sin A = 3/5', 'cos A = 4/5, tan A = 3/4'], ['sin 60° cos 30° + sin 30° cos 60°', '3/4 + 1/4 = 1']],
      rem: ['sin(A + B) ≠ sin A + sin B.', 'tan 90° is not defined.', 'Prove identities by working on one side only.'] }
  });
})();
