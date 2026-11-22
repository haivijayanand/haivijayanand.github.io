/*
TOOL:    class11_biology_ch13
FAMILY:  CBSE_REVISION / Class 11 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 13 Plant Growth and Development (growth phases and rates, arithmetic and geometric growth, differentiation, plasticity, plant growth regulators: auxins, gibberellins, cytokinins, ethylene, abscisic acid) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  const PGR = [['auxins (IAA, NAA, 2,4-D)', 'apical dominance, rooting of cuttings, parthenocarpy, prevent fruit drop, 2,4-D kills dicot weeds'], ['gibberellins (GA₃)', 'stem elongation (bolting), increase sugarcane yield, malting, delay senescence, grape stalk length'], ['cytokinins (kinetin, zeatin)', 'cell division, new leaves, overcome apical dominance, delay leaf senescence'], ['ethylene', 'fruit ripening, abscission, breaks dormancy, flowering in pineapple, ethephon use'], ['abscisic acid (ABA)', 'stress hormone: stomatal closure, seed dormancy, inhibits growth']];
  G9.register({
    no: 13, part: 'Unit IV · Plant physiology', short: 'Plant growth', title: 'Plant Growth and Development',
    blurb: 'Growth as irreversible increase; phases (meristematic, elongation, maturation); arithmetic and geometric growth and the sigmoid curve; absolute and relative growth rates; conditions for growth; differentiation, dedifferentiation, redifferentiation; plasticity (heterophylly); plant growth regulators — discovery and physiological effects of auxins, gibberellins, cytokinins, ethylene and abscisic acid.',
    revise: {
      oneLine: 'Arithmetic growth: Lt = L₀ + rt (linear). Geometric growth: Wt = W₀eʳᵗ (exponential), giving a sigmoid curve when resources limit (lag, log, stationary phases). Absolute growth rate = total growth per unit time; relative growth rate = growth per unit time per unit initial size. PGRs: auxins (Darwins’ coleoptile, Went), gibberellins (Gibberella fujikuroi — foolish seedling of rice), cytokinins (kinetin from herring sperm DNA; zeatin from corn), ethylene (gas, ripening), ABA (stress, dormancy). Promoters: auxin, GA, cytokinin; inhibitors: ABA, ethylene (mostly).',
      sections: [
        { h: 'Differentiation', html: '<p>Cells mature into specialised types (differentiation); living differentiated cells can regain division (dedifferentiation — interfascicular cambium, cork cambium) and then form new specialised cells (redifferentiation).</p>' },
        { h: 'Plasticity', html: '<p>Heterophylly: different leaf shapes in juvenile and mature cotton or coriander, or in buttercup in water vs air.</p>' },
        { h: 'Applications', html: '<p>Rooting hormones for cuttings, ethephon for even ripening, GA₃ for larger grapes, 2,4-D as weedicide in lawns, ABA for stress tolerance.</p>' }
      ],
      formulas: [['Arithmetic', 'Lt = L₀ + rt'], ['Geometric', 'Wt = W₀ e^(rt)'], ['Relative rate', 'ΔW / (W₀ Δt)'], ['Promoters', 'auxin, GA, cytokinin'], ['Inhibitors', 'ABA, ethylene']],
      terms: [['Apical dominance', 'terminal bud suppresses lateral buds (auxin)'], ['Bolting', 'rapid internode elongation before flowering (GA)'], ['Senescence', 'ageing of plant parts']],
      traps: ['Ethylene is a gaseous hormone.', 'ABA is the stress hormone, not a promoter.', 'Relative growth rate compares growth per size, not total growth.'],
      bridge: '<p>Class 12 reproduction and ecology chapters build on plant development.</p>'
    },
    explore: [
      { title: 'Arithmetic vs geometric growth', intro: 'Compare linear and exponential growth over time.',
        build(el, K) { let r = 0.3, t = 8; const row = K.row(el); K.slider(row, 'rate r', 0.05, 0.6, 0.05, r, v => { r = v; b.redraw(); }); K.slider(row, 'time', 2, 15, 1, t, v => { t = v; b.redraw(); }); const b = new K.Board(el, { xmin: -1, xmax: 16, ymin: -2, ymax: 22, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.line(0, 0, 15.5, 0, { color: C.ink, w: 1.5 }); b.line(0, 0, 0, 21, { color: C.ink, w: 1.5 }); const W = x => Math.min(20, Math.exp(r * x)), L = x => 1 + r * x * 2; let p = [0, W(0)], q = [0, L(0)]; for (let x = 0.1; x <= t; x += 0.1) { b.line(p[0], p[1], x, W(x), { color: C.orange, w: 2.5 }); b.line(q[0], q[1], x, L(x), { color: C.blue, w: 2.5 }); p = [x, W(x)]; q = [x, L(x)]; }
            rd.innerHTML = `<span style="color:${C.blue}">arithmetic</span> Lt = L₀ + rt → ${f(L(t))} · <span style="color:${C.orange}">geometric</span> Wt = W₀e^(rt) → ${f(Math.exp(r * t))}${Math.exp(r * t) > 20 ? ' (clipped; real plants slow down → sigmoid curve)' : ''}`; };
          b.redraw(); return null; } },
      { title: 'Growth regulators', intro: 'Choose a PGR. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'regulator', PGR.map(p => p[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { rd.innerHTML = `<b>${PGR[k][0]}</b>: ${PGR[k][1]}`; } const step = () => { k = (k + 1) % PGR.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } }
    ],
    gens: [
      { title: 'PGR use', gen(R) { return G9.S9.groupQ(R, [['rooting stem cuttings', 0], ['bolting in cabbage', 1], ['delaying leaf senescence', 2], ['ripening bananas', 3], ['closing stomata in drought', 4], ['killing dicot weeds', 0], ['malting barley', 1]], ['auxin', 'gibberellin', 'cytokinin', 'ethylene', 'abscisic acid'], 'Hormone used for '); } },
      { title: 'Relative growth', levels: [2, 3], gen(R) { const a0 = R.pick([5, 10, 20]), g = R.pick([5, 10]); return { q: `Leaf A grows from ${a0} to ${a0 + g} cm²; leaf B from ${a0 * 10} to ${a0 * 10 + g} cm² in the same time. Relative growth rates?`, a: `A ${f(100 * g / a0)}%, B ${f(100 * g / (a0 * 10))}% — same absolute growth, A higher relative`, ans: 100 * g / a0, tol: 0.01 }; } },
      { title: 'Exponential', gen(R) { const r = R.pick([0.1, 0.2, 0.3]), t = R.pick([5, 10]), W0 = R.pick([1, 2, 5]); return { q: `W₀ = ${W0} g, r = ${r} per day, t = ${t} days. Wt = W₀e^(rt)?`, a: `${f(W0 * Math.exp(r * t))} g`, ans: W0 * Math.exp(r * t), tol: 0.01 }; } },
      { title: 'Discovery', gen(R) { return G9.S9.pickQ(R, [['Gibberellins discovered from?', 'Gibberella fujikuroi (foolish seedling of rice)'], ['Kinetin first isolated from?', 'autoclaved herring sperm DNA'], ['Auxin isolated by?', 'F. W. Went (oat coleoptile tips)'], ['Which hormone is a gas?', 'ethylene']]); } },
      { title: 'Concepts', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['What is apical dominance?', 'terminal bud suppresses lateral buds (auxin)'], ['Example of dedifferentiation?', 'formation of interfascicular/cork cambium'], ['What is heterophylly?', 'different leaf shapes on the same plant at different stages/conditions'], ['Phases of the sigmoid curve?', 'lag, log (exponential), stationary']]); } }
    ],
    quiz: [
      { q: 'Fruit ripening hormone', o: ['ethylene', 'auxin', 'cytokinin', 'GA'], a: 0, e: 'Gas.' }, { q: 'Stress hormone', o: ['ABA', 'IAA', 'GA', 'kinetin'], a: 0, e: 'Stomata.' },
      { q: 'Bolting', o: ['gibberellin', 'ethylene', 'ABA', 'auxin'], a: 0, e: 'Elongation.' }, { q: 'Apical dominance', o: ['auxin', 'cytokinin', 'ABA', 'ethylene'], a: 0, e: 'Terminal bud.' },
      { q: 'Delays senescence', o: ['cytokinin', 'ABA', 'ethylene', 'none'], a: 0, e: 'Richmond–Lang.' }, { q: 'Geometric growth', o: ['Wt = W₀e^(rt)', 'Lt = L₀ + rt', 'linear', 'zero'], a: 0, e: 'Exponential.' },
      { q: 'Weedicide', o: ['2,4-D', 'GA₃', 'kinetin', 'ABA'], a: 0, e: 'Auxin.' }, { q: 'Foolish seedling of rice', o: ['gibberellin', 'auxin', 'ethylene', 'ABA'], a: 0, e: 'Fungus.' },
      { q: 'Heterophylly is', o: ['plasticity', 'senescence', 'dormancy', 'abscission'], a: 0, e: 'Leaf forms.' }, { q: 'Sigmoid curve phases', o: ['lag, log, stationary', 'one', 'two', 'none'], a: 0, e: 'S-shape.' },
      { q: 'Seed dormancy', o: ['ABA', 'GA', 'cytokinin', 'auxin'], a: 0, e: 'Inhibitor.' }
    ],
    teach: {
      outcomes: ['Describe growth patterns and rates', 'Explain differentiation and plasticity', 'Match PGRs to effects and uses'],
      periods: [{ t: 'Growth', flow: [['10 min', 'Seedling growth data.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Absolute vs relative rate.']] }, { t: 'PGRs', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Ripening banana with ethylene source.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['All hormones promote growth.', 'Growth is always exponential.'], activities: ['Seedling height graph.', 'Banana ripening in a bag.'],
      exit: ['Five PGRs and uses.', 'Growth equations.', 'Relative rate.'], homework: 'Measure a seedling daily for 10 days and plot the growth curve.'
    },
    slides: [{ t: 'Plant Growth and Development', b: ['Growth phases and rates', 'Differentiation and plasticity', 'Promoters', 'Inhibitors'] }, { t: 'Think and share', b: ['Why do bananas ripen in a closed bag?', 'Why prune the terminal bud?'] }],
    fs: { groups: [['Growth', [['Arithmetic', 'L₀ + rt'], ['Geometric', 'W₀e^(rt)'], ['Curve', 'sigmoid']]], ['Promoters', [['Auxin', 'apical dominance, rooting'], ['GA', 'bolting, grapes'], ['Cytokinin', 'cell division, delay senescence']]], ['Inhibitors', [['Ethylene', 'ripening, abscission'], ['ABA', 'stomata, dormancy']]]],
      ex: [['W₀ 2, r 0.2, t 10', '≈ 14.8 g'], ['5→10 vs 50→55', 'RGR 100% vs 10%']], rem: ['Gas hormone = ethylene.', 'ABA = stress.', 'Relative vs absolute.'] }
  });
})();
