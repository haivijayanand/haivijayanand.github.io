/*
TOOL:    class11_maths_ch03
FAMILY:  CBSE_REVISION / Class 11 Maths (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class X, XI, XII maths kits
CHANGES: 1.0.0 - Ch 3 Trigonometric Functions - revise, exam focus, 2 explore panels (unit circle to graphs, radian arc), 7 generators, quiz, lesson plan, slides, formula sheet
*/
(function () {
  const { F, C, num, gcd } = G9;
  const radH = (d) => { const g = gcd(d, 180), n = d / g, den = 180 / g; return den === 1 ? (n === 1 ? 'π' : n + 'π') : `${n === 1 ? '' : n}π/${den}`; };

  G9.register({
    no: 3, part: 'Unit I · Sets and Functions (23 marks)', short: 'Trigonometric functions', title: 'Trigonometric Functions',
    blurb: 'Radian measure, trig functions of any angle via the unit circle, signs, graphs, sum and difference formulas.',
    revise: {
      oneLine: 'Wrap the number line around a unit circle: the point reached at angle x has coordinates (cos x, sin x). This defines the trig functions for every real x, makes them periodic, and leads to the sum and difference formulas.',
      sections: [
        { h: 'Angles and radians', html: `<p>1 radian is the angle subtended by an arc equal to the radius. <b>π rad = 180°</b>, so 1 rad ≈ 57°16′. Arc length <b>l = rθ</b> (θ in radians).</p>
          <p>Degree → radian: × π/180. Radian → degree: × 180/π.</p>` },
        { h: 'Trig functions of any angle', html: `<p>On the unit circle, P(x) = (cos x, sin x). So sin²x + cos²x = 1, sin and cos have period 2π, tan and cot have period π.</p>
          <p><b>Signs</b> (All–Sin–Tan–Cos): Quadrant I all +, II sin & cosec +, III tan & cot +, IV cos & sec +.</p>
          <p>Ranges: −1 ≤ sin x, cos x ≤ 1; tan and cot take all real values; |sec x|, |cosec x| ≥ 1.</p>` },
        { h: 'Allied angles', html: `<p>sin(−x) = −sin x, cos(−x) = cos x. sin(π/2 − x) = cos x, cos(π/2 − x) = sin x. sin(π − x) = sin x, cos(π − x) = −cos x. sin(π + x) = −sin x, cos(π + x) = −cos x. sin(2nπ + x) = sin x.</p>
          <p>Rule: for π ± x and 2π ± x the function stays the same; for π/2 ± x and 3π/2 ± x it changes (sin ↔ cos); the sign is that of the original function in the quadrant.</p>` },
        { h: 'Sum and difference formulas', html: `<div class="box m">cos(x ± y) = cos x cos y ∓ sin x sin y<br>sin(x ± y) = sin x cos y ± cos x sin y<br>tan(x ± y) = ${F('tan x ± tan y', '1 ∓ tan x tan y')}</div>
          <p>Double angle: sin 2x = 2 sin x cos x; cos 2x = cos²x − sin²x = 2cos²x − 1 = 1 − 2sin²x; tan 2x = 2tan x/(1 − tan²x). Triple: sin 3x = 3 sin x − 4 sin³x, cos 3x = 4cos³x − 3cos x.</p>
          <p>Sum to product: sin x + sin y = 2 sin((x + y)/2) cos((x − y)/2); cos x + cos y = 2 cos((x + y)/2) cos((x − y)/2); cos x − cos y = −2 sin((x + y)/2) sin((x − y)/2).</p>` }
      ],
      formulas: [['π rad', '180°'], ['Arc', 'l = rθ'], ['cos(x + y)', 'cos x cos y − sin x sin y'], ['sin(x + y)', 'sin x cos y + cos x sin y'], ['sin 2x', '2 sin x cos x'], ['cos 2x', '2cos²x − 1 = 1 − 2sin²x'], ['tan(x + y)', '(tan x + tan y)/(1 − tan x tan y)']],
      terms: [['Radian', 'angle whose arc equals the radius'], ['Period', 'smallest T with f(x + T) = f(x)'], ['Allied angles', '−x, π/2 ± x, π ± x, …'], ['Quadrant', 'one of four regions of the unit circle']],
      traps: ['Using degrees in l = rθ.', 'Sign errors in the second–fourth quadrants.', 'cos(x + y) ≠ cos x + cos y.', 'Forgetting tan has period π, not 2π.'],
      board: '<p><b>Unit I — 23 marks.</b> Expect: degree–radian conversion and arc length (1–2 marks), values of trig functions using quadrant signs and allied angles (2–3 marks), proofs with sum/difference and double-angle formulas (3–5 marks).</p>',
      bridge: '<p>Class 10 Ch 8 gave ratios of acute angles. Ch 12 (Derivatives) uses lim sin x/x = 1 and derivatives of sin and cos.</p>'
    },

    explore: [
      {
        title: 'Unit circle → sine and cosine graphs', intro: 'Press <kbd>P</kbd>. As the point goes round the circle, its height draws sin x and its horizontal position gives cos x.',
        build(el, K) {
          const b = new K.Board(el, { xmin: -1.6, xmax: 8.2, ymin: -1.4, ymax: 1.4, axes: false, aspect: 0.4 }); const rd = K.read(el);
          let t = Math.PI / 4; const an = new K.Anim(Infinity, () => { t = (t + 0.05) % (2 * Math.PI); b.redraw(); }, { ms: 40 });
          const row = K.row(el); K.slider(row, 'angle x (°)', 0, 359, 1, 45, v => { t = v * Math.PI / 180; an.pause(); b.redraw(); });
          b.onDraw = () => {
            b.clear(); const cx = 0, ox = 1.6, sc = 6.2 / (2 * Math.PI);
            b.line(-1.5, 0, 1.5, 0, { color: C.axis, w: 1.5 }); b.line(0, -1.3, 0, 1.3, { color: C.axis, w: 1.5 }); b.circle(cx, 0, 1, { color: C.grey, w: 2 });
            b.line(ox, 0, ox + 6.4, 0, { color: C.axis, w: 1.5 }); [0, 90, 180, 270, 360].forEach(d => b.text(ox + d / 360 * 6.2, -0.15, radH(d) === '0π' ? '0' : d === 0 ? '0' : radH(d), { font: '11px' }));
            b.fn(x => x < ox || x > ox + 6.2 ? NaN : Math.sin((x - ox) / sc), { color: C.blue, w: 2.5 }); b.fn(x => x < ox || x > ox + 6.2 ? NaN : Math.cos((x - ox) / sc), { color: C.orange, w: 2, dash: [6, 4] });
            const px = Math.cos(t), py = Math.sin(t); b.line(0, 0, px, py, { color: C.purple, w: 2 }); b.line(px, 0, px, py, { color: C.blue, w: 3 }); b.line(0, 0, px, 0, { color: C.orange, w: 3 });
            b.dot(px, py, { color: C.purple, r: 5 }); b.dot(ox + t * sc, py, { color: C.blue, r: 5 }); b.line(px, py, ox + t * sc, py, { color: C.grey, w: 1, dash: [3, 3] });
            const d = t * 180 / Math.PI, q = d < 90 ? 'I' : d < 180 ? 'II' : d < 270 ? 'III' : 'IV';
            rd.innerHTML = `x = ${num(d, 0)}° = ${num(t, 3)} rad · <span style="color:var(--blue)">sin x = ${num(py, 3)}</span> · <span style="color:var(--orange)">cos x = ${num(px, 3)}</span> · tan x = ${Math.abs(px) < 1e-3 ? 'not defined' : num(py / px, 3)} · Quadrant ${q}`;
          };
          K.anim(el, an); b.redraw(); return an;
        }
      },
      {
        title: 'Arc length and radians', intro: 'Change r and θ. The arc is r × θ (θ in radians). One radian: arc = radius.',
        build(el, K) {
          let r = 3, d = 60; const row = K.row(el);
          K.slider(row, 'radius r', 1, 5, 0.5, r, v => { r = v; b.redraw(); }); K.slider(row, 'θ (°)', 5, 360, 5, d, v => { d = v; b.redraw(); });
          const b = new K.Board(el, { xmin: -6, xmax: 6, ymin: -6, ymax: 6, axes: false }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const th = d * Math.PI / 180; b.circle(0, 0, r, { color: C.grey, w: 1.5 }); b.arc(0, 0, r, 0, th, { sector: true, fill: C.blueL, color: C.orange, w: 4 });
            b.line(0, 0, r, 0, { color: C.ink, w: 2 }); b.line(0, 0, r * Math.cos(th), r * Math.sin(th), { color: C.ink, w: 2 });
            rd.innerHTML = `θ = ${d}° = ${radH(d)} rad ≈ ${num(th, 4)} rad · arc l = rθ = ${num(r)} × ${num(th, 4)} = <b>${num(r * th, 3)}</b> · 1 rad ≈ 57.30°`; };
          b.redraw(); return null;
        }
      }
    ],

    gens: [
      { title: 'Degrees ↔ radians', gen(R) {
          const d = R.pick([15, 30, 40, 45, 60, 75, 120, 135, 150, 210, 240, 300, 330, 520, -47.5]);
          if (R.chance(.5) && Number.isInteger(d) && d > 0) return { q: `Convert ${d}° to radians.`, a: `${radH(d)} rad`, ans: d * Math.PI / 180, tol: 0.002, s: '× π/180' };
          const r = R.pick([[1, 6], [2, 3], [5, 12], [7, 6], [11, 18], [3, 4]]); const deg = 180 * r[0] / r[1];
          return { q: `Convert ${r[0] === 1 ? '' : r[0]}π/${r[1]} radians to degrees.`, a: `${num(deg)}°`, ans: deg, s: '× 180/π' };
        } },
      { title: 'Arc length', gen(R) {
          const r = R.int(5, 40), d = R.pick([30, 45, 60, 72, 90, 120, 150]); const l = r * d * Math.PI / 180;
          return R.chance(.5) ? { q: `Find the length of the arc of a circle of radius ${r} cm subtending ${d}° at the centre (π = 22/7).`, a: `${num(r * d * 22 / 7 / 180)} cm`, ans: r * d * 22 / 7 / 180, s: `l = rθ = ${r} × ${radH(d)}` }
            : { q: `An arc of length ${num(l, 2)} cm subtends an angle at the centre of a circle of radius ${r} cm. Find the angle in degrees.`, a: `${d}°`, ans: d, tol: 0.5, s: `θ = l/r rad` };
        } },
      { title: 'Values using quadrant and periodicity', gen(R) {
          const items = [['sin 765°', '1/√2'], ['cosec(−1410°)', '2'], ['tan(19π/3)', '√3'], ['sin(−11π/3)', '√3/2'], ['cot(−15π/4)', '1'], ['cos(−1710°)', '0'], ['sin 315°', '−1/√2'], ['cos 480°', '−1/2'], ['tan 120°', '−√3']];
          const [q, a] = R.pick(items); return { q: `Find the value of ${q}.`, a, s: 'Remove full turns (360° or 2π), then use the quadrant sign and the reference angle.' };
        } },
      { title: 'Other functions from one', levels: [2, 3], gen(R) {
          const T = R.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17]]); const q = R.pick(['II', 'III', 'IV']);
          const s = { II: [1, -1], III: [-1, -1], IV: [-1, 1] }[q]; const sinv = `${s[0] < 0 ? '−' : ''}${T[0]}/${T[2]}`, cosv = `${s[1] < 0 ? '−' : ''}${T[1]}/${T[2]}`, tanv = `${s[0] * s[1] < 0 ? '−' : ''}${T[0]}/${T[1]}`;
          return { q: `If cos x = ${cosv} and x lies in quadrant ${q}, find sin x and tan x.`, a: `sin x = ${sinv}, tan x = ${tanv}`, s: `sin²x = 1 − cos²x; sign from quadrant ${q}` };
        } },
      { title: 'Sum and difference formulas', gen(R) {
          const items = [['sin 15°', '(√6 − √2)/4', 'sin(45° − 30°)'], ['cos 15°', '(√6 + √2)/4', 'cos(45° − 30°)'], ['sin 75°', '(√6 + √2)/4', 'sin(45° + 30°)'], ['cos 75°', '(√6 − √2)/4', 'cos(45° + 30°)'], ['tan 15°', '2 − √3', 'tan(45° − 30°)'], ['tan 75°', '2 + √3', 'tan(45° + 30°)'], ['sin 105°', '(√6 + √2)/4', 'sin(60° + 45°)'], ['cos 105°', '(√2 − √6)/4', 'cos(60° + 45°)']];
          const [q, a, s] = R.pick(items); return { q: `Find the exact value of ${q}.`, a, s };
        } },
      { title: 'Double angle', levels: [2, 3], gen(R) {
          const T = R.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17]]); const [o, a, h] = T;
          return { q: `If sin x = ${o}/${h} and x is acute, find sin 2x, cos 2x and tan 2x.`, a: `sin 2x = ${2 * o * a}/${h * h}, cos 2x = ${a * a - o * o}/${h * h}, tan 2x = ${2 * o * a}/${a * a - o * o}`, s: `cos x = ${a}/${h}; sin 2x = 2 sin x cos x; cos 2x = cos²x − sin²x` };
        } },
      { title: 'Prove an identity', levels: [3], gen(R) {
          const items = [['sin²(π/6) + cos²(π/3) − tan²(π/4) = −1/2', '1/4 + 1/4 − 1 = −1/2'], ['cos(π/4 + x) + cos(π/4 − x) = √2 cos x', '2 cos(π/4) cos x = √2 cos x'], ['(sin 5x + sin 3x)/(cos 5x + cos 3x) = tan 4x', 'sum to product: 2 sin 4x cos x / 2 cos 4x cos x'], ['sin 2x + 2 sin 4x + sin 6x = 4 cos²x sin 4x', 'sin 2x + sin 6x = 2 sin 4x cos 2x; total 2 sin 4x(1 + cos 2x) = 4 cos²x sin 4x'], ['cos 4x = 1 − 8 sin²x cos²x', 'cos 4x = 1 − 2 sin²2x = 1 − 8 sin²x cos²x']];
          const [q, a] = R.pick(items); return { q: `Prove: ${q}`, a };
        } }
    ],

    quiz: [
      { q: 'π/3 radians in degrees', o: ['30°', '60°', '90°', '120°'], a: 1, e: '180/3.' },
      { q: 'Arc subtending 1 radian in a circle of radius 5 cm has length', o: ['5 cm', '1 cm', '5π cm', '10 cm'], a: 0, e: 'l = rθ.' },
      { q: 'In quadrant III, which is positive?', o: ['sin', 'cos', 'tan', 'sec'], a: 2, e: 'All-Sin-Tan-Cos.' },
      { q: 'sin(−x) =', o: ['sin x', '−sin x', 'cos x', '−cos x'], a: 1, e: 'sin is odd.' },
      { q: 'cos(π − x) =', o: ['cos x', '−cos x', 'sin x', '−sin x'], a: 1, e: 'Quadrant II.' },
      { q: 'sin 765° =', o: ['1/2', '1/√2', '√3/2', '1'], a: 1, e: '765 − 720 = 45.' },
      { q: 'cos 2x =', o: ['2 sin x cos x', '1 − 2sin²x', '2cos x', 'cos²x + sin²x'], a: 1, e: 'One of three forms.' },
      { q: 'Period of tan x', o: ['π', '2π', 'π/2', '4π'], a: 0, e: 'tan(x + π) = tan x.' },
      { q: 'sin 15° =', o: ['(√6 − √2)/4', '(√6 + √2)/4', '1/4', '√3/4'], a: 0, e: 'sin(45° − 30°).' },
      { q: 'Range of sin x', o: ['R', '[−1, 1]', '[0, 1]', '(−1, 1)'], a: 1, e: 'Unit circle.' },
      { q: 'tan(π/4 + x) =', o: ['(1 + tan x)/(1 − tan x)', '(1 − tan x)/(1 + tan x)', '1 + tan x', 'tan x'], a: 0, e: 'tan(x + y) with tan(π/4) = 1.' }
    ],

    teach: {
      outcomes: ['Convert between degrees and radians; use l = rθ', 'Define trig functions for any real number via the unit circle; use signs and periodicity', 'Use allied-angle relations', 'Prove and use sum, difference, double and triple angle formulas'],
      periods: [
        { t: 'Radian measure', flow: [['10 min', 'String around a lid: what is 1 radian?'], ['15 min', 'Explore panel 2; conversions.'], ['15 min', 'Arc problems.']] },
        { t: 'Trig functions of any angle', flow: [['15 min', 'Explore panel 1: unit circle and graphs.'], ['15 min', 'Signs, periodicity, allied angles.'], ['10 min', 'Value problems.']] },
        { t: 'Formulas', flow: [['20 min', 'cos(x − y) proof idea; derive others.'], ['10 min', 'Double/triple, sum-to-product.'], ['10 min', 'Check quiz.']] }
      ],
      misconceptions: ['Degrees in l = rθ.', 'Quadrant sign errors.', 'cos(x + y) = cos x + cos y.'],
      activities: ['Paper-plate unit circle with string.', 'Graph sine by plotting heights from a Ferris-wheel model.'],
      exit: ['240° in radians.', 'cos 690°.', 'sin 75°.'],
      homework: 'Prove: cos(π/2 + x) = −sin x and tan(3π/2 + x) = −cot x using the sum formulas.'
    },

    slides: [
      { t: 'Trigonometric Functions', b: ['Radian measure', 'Functions of any angle', 'Allied angles', 'Sum and difference formulas'] },
      { t: 'Radians', b: ['π rad = 180°', 'l = rθ', '1 rad ≈ 57.3°'] },
      { t: 'Unit circle', b: ['P = (cos x, sin x)', 'Signs: All, Sin, Tan, Cos', 'Period 2π (sin, cos), π (tan)'] },
      { t: 'Formulas', b: ['cos(x ± y) = cos x cos y ∓ sin x sin y', 'sin(x ± y) = sin x cos y ± cos x sin y', 'sin 2x = 2 sin x cos x', 'cos 2x = 1 − 2sin²x'] },
      { t: 'Check yourself', b: ['5π/6 in degrees?', 'cos 15°?', 'Answers: 150° · (√6 + √2)/4'] }
    ],

    fs: { groups: [
        ['Radians', [['π rad', '180°'], ['Arc length', 'l = rθ'], ['Deg → rad', '× π/180']]],
        ['Signs and periods', [['Quadrant I / II / III / IV', 'all / sin, cosec / tan, cot / cos, sec positive'], ['Period', 'sin, cos, sec, cosec: 2π; tan, cot: π'], ['Even / odd', 'cos(−x) = cos x; sin, tan odd']]],
        ['Allied angles', [['π/2 − x', 'sin → cos, cos → sin'], ['π − x', 'sin x, −cos x'], ['π + x', '−sin x, −cos x'], ['2π − x', '−sin x, cos x']]],
        ['Compound angles', [['sin(x ± y)', 'sin x cos y ± cos x sin y'], ['cos(x ± y)', 'cos x cos y ∓ sin x sin y'], ['tan(x ± y)', '(tan x ± tan y)/(1 ∓ tan x tan y)']]],
        ['Multiple angles', [['sin 2x', '2 sin x cos x = 2tan x/(1 + tan²x)'], ['cos 2x', 'cos²x − sin²x = 2cos²x − 1 = 1 − 2sin²x'], ['tan 2x', '2tan x/(1 − tan²x)'], ['sin 3x', '3 sin x − 4 sin³x'], ['cos 3x', '4 cos³x − 3 cos x']]],
        ['Sum to product', [['sin x + sin y', '2 sin((x + y)/2) cos((x − y)/2)'], ['cos x + cos y', '2 cos((x + y)/2) cos((x − y)/2)'], ['cos x − cos y', '−2 sin((x + y)/2) sin((x − y)/2)']]]],
      ex: [['sin 765°', 'sin 45° = 1/√2'], ['cos 15°', 'cos 45° cos 30° + sin 45° sin 30° = (√6 + √2)/4']],
      rem: ['θ must be in radians for l = rθ.', 'Find the quadrant first, then the sign.', 'Write which formula you use in proofs.'] }
  });
})();
