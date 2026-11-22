/*
TOOL:    class9_science_ch07
FAMILY:  CBSE_REVISION / Class 9 Science (Exploration)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 7 Work, Energy, and Simple Machines (work W = Fs, kinetic and potential energy, conservation of energy, power, levers, pulleys, inclined plane, MA, VR, efficiency) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toFixed(2)).toString();
  G9.register({
    no: 7, part: 'All chapters', short: 'Work and energy', title: 'Work, Energy, and Simple Machines',
    blurb: 'Work done by a force (W = F s), positive, negative and zero work; kinetic energy ½mv² and gravitational potential energy mgh; conservation and transformation of energy; power and the kilowatt-hour; simple machines — levers (three classes), pulleys, inclined planes — mechanical advantage, velocity ratio and efficiency.',
    revise: {
      oneLine: 'Work W = F × s (in the direction of force), unit joule. Kinetic energy KE = ½mv²; potential energy PE = mgh. Energy changes form but total energy is conserved (falling ball: PE → KE). Power P = W/t (watt); 1 kWh = 3.6 × 10⁶ J. A simple machine makes work easier: MA = load ÷ effort, VR = effort distance ÷ load distance, efficiency = MA/VR × 100% (always < 100% due to friction).',
      sections: [
        { h: 'Zero work', html: `<p>Carrying a bag while walking horizontally (force up, motion sideways) — no work by the lifting force. Pushing a wall that does not move — no work.</p>` },
        { h: 'Levers', html: `<p>Class 1: fulcrum in the middle (see-saw, scissors). Class 2: load in the middle (nutcracker, wheelbarrow) — MA > 1. Class 3: effort in the middle (tongs, forearm) — MA < 1 but more speed. Law of lever: load × load arm = effort × effort arm.</p>` },
        { h: 'Pulleys and ramps', html: `<p>Single fixed pulley: changes direction, MA ≈ 1. Inclined plane: VR = length ÷ height.</p>` }
      ],
      formulas: [['Work', 'W = F s'], ['KE', '½ m v²'], ['PE', 'm g h'], ['Power', 'P = W / t'], ['Lever', 'L × l = E × e'], ['Efficiency', 'MA / VR × 100%'], ['1 kWh', '3.6 × 10⁶ J']],
      terms: [['Joule', 'work when 1 N moves 1 m'], ['Mechanical advantage', 'load ÷ effort'], ['Velocity ratio', 'effort distance ÷ load distance']],
      traps: ['Doubling speed quadruples KE.', 'Machines do not reduce work; they reduce force or change direction.', 'kWh is energy, not power.'],
      bridge: '<p>Class 10 links energy to electricity and sources; Class 11 Physics generalises work and energy.</p>'
    },
    explore: [
      { title: 'Falling ball energy', intro: 'Drop a ball; watch PE turn into KE (air resistance ignored). <kbd>P</kbd> play.',
        build(el, K) { let m = 2, H = 20; const row = K.row(el); K.slider(row, 'mass (kg)', 0.5, 10, 0.5, m, v => { m = v; an.reset(); }); K.slider(row, 'height (m)', 5, 50, 1, H, v => { H = v; an.reset(); }); const b = new K.Board(el, { xmin: -4, xmax: 8, ymin: -1, ymax: 6, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el); const g = 9.8; const an = new K.Anim(60, () => b.redraw(), { ms: 50 });
          b.onDraw = () => { b.clear(); const T = Math.sqrt(2 * H / g); const t = Math.min(an.i / 60 * T, T); const fall = 0.5 * g * t * t, h = H - fall, v = g * t; const PE = m * g * h, KE = 0.5 * m * v * v, E = m * g * H; b.line(-3.5, 0, -0.5, 0, { color: C.ink, w: 2 }); b.dot(-2, 5 * h / H, { r: 10, color: C.purple });
            b.rect(1, 0, 1.6, 5 * PE / E, { fill: C.blue, color: C.ink }); b.rect(3.4, 0, 1.6, 5 * KE / E, { fill: C.orange, color: C.ink }); b.rect(5.8, 0, 1.6, 5, { fill: '#cbd5e1', color: C.ink }); b.text(1.8, -0.5, 'PE', { font: 'bold 12px' }); b.text(4.2, -0.5, 'KE', { font: 'bold 12px' }); b.text(6.6, -0.5, 'total', { font: 'bold 12px' });
            rd.innerHTML = `h = ${f(h)} m · v = ${f(v)} m/s · PE = mgh = <b>${f(PE)} J</b> · KE = ½mv² = <b>${f(KE)} J</b> · total = <b>${f(PE + KE)} J</b> (constant)`; };
          K.anim(el, an); b.redraw(); return an; } },
      { title: 'Lever balance', intro: 'Place the load and effort; find the effort needed to balance (law of lever).',
        build(el, K) { let L = 300, l = 0.5, e = 1.5; const row = K.row(el); K.slider(row, 'load (N)', 50, 600, 10, L, v => { L = v; b.redraw(); }); K.slider(row, 'load arm (m)', 0.1, 2, 0.1, l, v => { l = v; b.redraw(); }); K.slider(row, 'effort arm (m)', 0.1, 2, 0.1, e, v => { e = v; b.redraw(); }); const b = new K.Board(el, { xmin: -2.6, xmax: 2.6, ymin: -0.8, ymax: 1.2, axes: false, grid: 0, aspect: 0.35 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.poly([[0, 0], [-0.15, -0.4], [0.15, -0.4]], { fill: C.ink, color: C.ink }); b.line(-2.2, 0, 2.2, 0, { color: '#a16207', w: 6 }); b.arrow(-l, 0.9, -l, 0.08, { color: C.purple, w: 3 }); b.text(-l, 1.05, `load ${L} N`, { font: '11px' }); const E = L * l / e; b.arrow(e, 0.9, e, 0.08, { color: C.orange, w: 3 }); b.text(e, 1.05, `effort ${f(E)} N`, { font: '11px' });
            rd.innerHTML = `effort = load × load arm ÷ effort arm = ${L} × ${f(l)} ÷ ${f(e)} = <b>${f(E)} N</b> · MA = load/effort = <b>${f(L / E)}</b> ${L / E > 1 ? '(force saved)' : L / E < 1 ? '(speed/distance gained)' : ''}`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Work', gen(R) { const F = R.int(5, 100), s = R.int(2, 20); return { q: `A force of ${F} N moves an object ${s} m in its direction. Work done?`, a: `${F * s} J`, ans: F * s }; } },
      { title: 'Kinetic energy', gen(R) { const m = R.int(1, 60), v = R.int(2, 20); return { q: `KE of a ${m} kg body at ${v} m/s?`, a: `${0.5 * m * v * v} J`, ans: 0.5 * m * v * v }; } },
      { title: 'Potential energy', gen(R) { const m = R.int(1, 50), h = R.int(2, 30); return { q: `PE of ${m} kg raised ${h} m? (g = 9.8)`, a: `${f(m * 9.8 * h)} J`, ans: m * 9.8 * h, tol: 0.01 }; } },
      { title: 'Power', levels: [2, 3], gen(R) { const m = R.int(30, 70), h = R.int(3, 15), t = R.int(5, 30); return { q: `A ${m} kg student climbs ${h} m in ${t} s. Power? (g = 10)`, a: `${f(m * 10 * h / t)} W`, ans: m * 10 * h / t, tol: 0.01 }; } },
      { title: 'Efficiency', levels: [2, 3], gen(R) { const L = R.int(20, 80) * 10, E = R.int(5, 30) * 10, VR = R.pick([4, 5, 6, 8]); const MA = L / E; if (MA >= VR) return { q: `Lever: load ${L} N, load arm 0.2 m, effort arm 1 m. Effort?`, a: `${L / 5} N`, ans: L / 5 }; return { q: `A machine lifts ${L} N with ${E} N effort. VR = ${VR}. Efficiency?`, a: `${f(MA / VR * 100)}% (MA = ${f(MA)})`, ans: MA / VR * 100, tol: 0.01 }; } }
    ],
    quiz: [
      { q: 'Unit of work', o: ['joule', 'watt', 'newton', 'pascal'], a: 0, e: 'J.' }, { q: 'KE =', o: ['½mv²', 'mgh', 'mv', 'Fs'], a: 0, e: 'Kinetic.' },
      { q: 'Double speed, KE', o: ['×4', '×2', 'same', '÷2'], a: 0, e: 'v².' }, { q: 'Power unit', o: ['watt', 'joule', 'kWh', 'newton'], a: 0, e: 'J/s.' },
      { q: '1 kWh =', o: ['3.6 × 10⁶ J', '1000 J', '3600 J', '36 J'], a: 0, e: 'Energy.' }, { q: 'Nutcracker', o: ['class 2 lever', 'class 1', 'class 3', 'pulley'], a: 0, e: 'Load middle.' },
      { q: 'Tongs', o: ['class 3 lever', 'class 1', 'class 2', 'wedge'], a: 0, e: 'Effort middle.' }, { q: 'Efficiency is', o: ['< 100%', '= 100%', '> 100%', 'any'], a: 0, e: 'Friction.' },
      { q: 'Walking with a bag horizontally: work by lifting force', o: ['zero', 'positive', 'negative', 'infinite'], a: 0, e: '90°.' }, { q: '10 N over 5 m', o: ['50 J', '2 J', '15 J', '0.5 J'], a: 0, e: 'F × s.' },
      { q: 'Falling ball', o: ['PE → KE', 'KE → PE', 'no change', 'mass lost'], a: 0, e: 'Conversion.' }
    ],
    teach: {
      outcomes: ['Calculate work, KE, PE and power', 'Apply conservation of energy', 'Analyse simple machines'],
      periods: [{ t: 'Work and energy', flow: [['10 min', 'Is it work? scenarios.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Stair-climb power test.']] }, { t: 'Machines', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Lever classes hunt.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Machines reduce work.', 'Holding a heavy box still is work.'], activities: ['Stair power measurement.', 'Metre-rule lever.'],
      exit: ['W, KE, PE formulas.', 'Lever classes.', 'Efficiency meaning.'], homework: 'Find one example of each lever class at home and sketch it.'
    },
    slides: [{ t: 'Work, Energy, Simple Machines', b: ['Work', 'KE and PE', 'Conservation and power', 'Levers, pulleys, ramps'] }, { t: 'Think and share', b: ['Is holding a box work?', 'Why is efficiency below 100%?'] }],
    fs: { groups: [['Work and energy', [['W', 'F s'], ['KE', '½mv²'], ['PE', 'mgh']]], ['Power', [['P', 'W/t'], ['kWh', '3.6 MJ']]], ['Machines', [['MA', 'load/effort'], ['VR', 'effort d / load d'], ['η', 'MA/VR × 100%'], ['Lever', 'L l = E e']]]],
      ex: [['2 kg at 10 m/s', 'KE 100 J'], ['50 kg up 6 m in 12 s', '250 W']], rem: ['Force along motion.', 'Energy conserved.', 'Machines trade force for distance.'] }
  });
})();
