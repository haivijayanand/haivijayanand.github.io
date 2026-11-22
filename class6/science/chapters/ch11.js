/*
TOOL:    class6_science_ch11
FAMILY:  CBSE_REVISION / Class 6 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 11 Nature's Treasures (air, water, sunlight, soil, forests, minerals, fossil fuels; renewable and non-renewable resources; conservation) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 11, part: 'All chapters', short: 'Natural resources', title: 'Nature’s Treasures',
    blurb: 'Natural resources — air (and its gases), water, sunlight, soil, forests, minerals, coal and petroleum; renewable versus non-renewable resources; and conserving them through reduce, reuse, recycle and traditional practices.',
    revise: {
      oneLine: 'Nature’s treasures are natural resources: air, water, sunlight, soil, plants, animals, minerals, coal and petroleum. Renewable resources (sunlight, wind, water, forests if used wisely) can be replaced; non-renewable ones (coal, petroleum, natural gas, minerals) take millions of years to form and can run out. We conserve by reducing, reusing, recycling and protecting.',
      sections: [
        { h: 'Air', html: `<p>A mixture: about 78% nitrogen, 21% oxygen, small amounts of argon, carbon dioxide and water vapour. Moving air (wind) turns windmills.</p>` },
        { h: 'Fuels from the past', html: `<p>Coal formed from buried ancient forests; petroleum and natural gas from tiny sea organisms — over millions of years. Burning them pollutes air.</p>` },
        { h: 'Conserve', html: `<p>Switch off lights, fix leaking taps, harvest rainwater, plant trees, use public transport; India’s sacred groves protect forests.</p>` }
      ],
      formulas: [['Nitrogen', '≈ 78% of air'], ['Oxygen', '≈ 21% of air'], ['Renewable', 'sun, wind, water'], ['Non-renewable', 'coal, petroleum, gas'], ['3R', 'reduce, reuse, recycle']],
      terms: [['Natural resource', 'useful thing from nature'], ['Renewable', 'replaced naturally in a short time'], ['Fossil fuel', 'fuel from remains of ancient life']],
      traps: ['Forests are renewable only if we do not cut faster than they grow.', 'Air is a mixture, not one gas.', 'Clean water is limited though Earth has much water.'],
      bridge: '<p>Class 8 studies coal, petroleum and conservation of plants and animals.</p>'
    },
    explore: [
      { title: 'What is in air?', intro: 'The composition of dry air (by volume).',
        build(el, K) { const b = new K.Board(el, { xmin: -2, xmax: 102, ymin: -3, ymax: 3, axes: false, grid: 0, aspect: 0.3 }); const rd = K.read(el); const P = [['nitrogen', 78, C.blue], ['oxygen', 21, C.orange], ['others', 1, C.purple]];
          b.onDraw = () => { b.clear(); let x = 0; P.forEach((p, i) => { b.rect(x, -1, p[1], 2, { fill: p[2], color: '#fff', w: 2 }); b.text(i < 2 ? x + p[1] / 2 : 99, i < 2 ? 0 : -1.8, `${p[0]} ${p[1]}%`, { font: 'bold 13px', color: i < 2 ? '#fff' : undefined }); x += p[1]; }); };
          rd.innerHTML = 'Air is a <b>mixture</b>: about 78% nitrogen, 21% oxygen and 1% other gases, plus varying water vapour.'; b.redraw(); return null; } },
      { title: 'Renewable or not?', intro: 'Sort the resources.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Renewable', 'Non-renewable'], items: [['sunlight', 0], ['coal', 1, 'took millions of years to form'], ['wind', 0], ['petroleum', 1], ['forests (used wisely)', 0, 'regrow if not over-cut'], ['natural gas', 1], ['flowing water', 0], ['iron ore', 1]] }); } }
    ],
    gens: [
      { title: 'Renewable?', gen(R) { return G9.S9.groupQ(R, [['solar energy', 0], ['coal', 1], ['wind energy', 0], ['diesel', 1], ['wood from managed forests', 0], ['LPG', 1]], ['renewable', 'non-renewable'], 'Renewable or non-renewable: '); } },
      { title: 'Air', gen(R) { const v = R.int(2, 20) * 100; return R.chance(.5) ? { q: `About how many litres of oxygen are in ${v} L of air? (21%)`, a: `${0.21 * v} L`, ans: 0.21 * v, tol: 0.01 } : { q: `About how many litres of nitrogen are in ${v} L of air? (78%)`, a: `${0.78 * v} L`, ans: 0.78 * v, tol: 0.01 }; } },
      { title: 'Conserve', gen(R) { return G9.S9.pickQ(R, [['Give two ways to save water.', 'fix leaks, close taps, harvest rainwater'], ['Give two ways to save electricity.', 'switch off lights and fans, use LED bulbs'], ['What are the 3Rs?', 'reduce, reuse, recycle'], ['How do sacred groves help?', 'they protect patches of forest and wildlife']]); } },
      { title: 'Saving count', levels: [2, 3], gen(R) { const d = R.int(5, 20), days = R.pick([7, 30, 365]); return { q: `A leaking tap wastes ${d} L a day. How much in ${days} days?`, a: `${d * days} L`, ans: d * days }; } },
      { title: 'Fossil fuels', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['How was coal formed?', 'from ancient forests buried and pressed over millions of years'], ['Why are fossil fuels non-renewable?', 'they take millions of years to form'], ['Name a problem with burning fossil fuels.', 'air pollution and greenhouse gases'], ['Name two alternatives to fossil fuels.', 'solar and wind energy']]); } }
    ],
    quiz: [
      { q: 'Most of air is', o: ['nitrogen', 'oxygen', 'carbon dioxide', 'argon'], a: 0, e: '78%.' }, { q: 'Oxygen in air', o: ['about 21%', '78%', '1%', '50%'], a: 0, e: '21%.' },
      { q: 'Renewable', o: ['sunlight', 'coal', 'petroleum', 'natural gas'], a: 0, e: 'Sun.' }, { q: 'Coal formed from', o: ['ancient plants', 'sea water', 'rocks melting', 'air'], a: 0, e: 'Forests.' },
      { q: 'Non-renewable', o: ['petroleum', 'wind', 'flowing water', 'sunlight'], a: 0, e: 'Fossil.' }, { q: '3Rs', o: ['reduce, reuse, recycle', 'read, run, rest', 'rain, river, rock', 'none'], a: 0, e: 'Conserve.' },
      { q: 'Air is a', o: ['mixture', 'single gas', 'solid', 'liquid'], a: 0, e: 'Mixture.' }, { q: 'Forests renewable only if', o: ['not over-cut', 'burnt', 'never planted', 'paved'], a: 0, e: 'Regrow.' },
      { q: 'Windmills use', o: ['moving air', 'coal', 'petrol', 'soil'], a: 0, e: 'Wind.' }, { q: 'Saving water', o: ['fix leaking taps', 'leave taps running', 'waste rainwater', 'wash cars daily'], a: 0, e: 'Leaks.' },
      { q: 'Sacred groves', o: ['protect forest patches', 'are mines', 'are dams', 'are cities'], a: 0, e: 'Tradition.' }
    ],
    teach: {
      outcomes: ['List natural resources', 'Classify renewable and non-renewable', 'Suggest conservation actions'],
      periods: [{ t: 'Resources', flow: [['10 min', 'Resource walk.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Explore panel 2.']] }, { t: 'Conserve', flow: [['15 min', 'Home water/electricity audit.'], ['15 min', 'Pledge poster.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Air is only oxygen.', 'Water never runs out.'], activities: ['Leaky tap measurement.', '3R poster.'],
      exit: ['Air composition.', 'Two renewable, two non-renewable.', 'Two conservation steps.'], homework: 'Measure water lost by a dripping tap in 10 minutes and estimate a day’s loss.'
    },
    slides: [{ t: 'Nature’s Treasures', b: ['Air, water, sunlight, soil', 'Forests and minerals', 'Renewable vs non-renewable', 'Conservation'] }, { t: 'Think and share', b: ['Why is coal non-renewable?', 'One way your class can save water?'] }],
    fs: { groups: [['Air', [['Nitrogen', '≈ 78%'], ['Oxygen', '≈ 21%'], ['Others', '≈ 1%']]], ['Resources', [['Renewable', 'sun, wind, water, forests'], ['Non-renewable', 'coal, petroleum, gas, minerals']]], ['Conserve', [['3R', 'reduce, reuse, recycle'], ['Water', 'fix leaks, harvest rain'], ['Energy', 'switch off']]]],
      ex: [['500 L air', '105 L oxygen'], ['10 L/day × 30', '300 L']], rem: ['Air is a mixture.', 'Fossil fuels run out.', 'Conserve daily.'] }
  });
})();
