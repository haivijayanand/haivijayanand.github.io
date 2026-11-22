/*
TOOL:    class3_science_ch07
FAMILY:  CBSE_REVISION / Class 3 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 7 Water - A Precious Gift (sources of water, uses, saving water, storing rainwater, clean water) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const USE = [['brushing with tap open', 10, 1], ['bath with shower', 60, 20], ['washing a car with a hose', 150, 20]];
  G9.register({
    no: 7, part: 'All chapters', short: 'Water', title: 'Water - A Precious Gift',
    blurb: 'Where water comes from (rain, rivers, lakes, wells, taps), how we use it, how much we waste, ways to save and store water (rainwater harvesting), and keeping water clean and safe to drink.',
    revise: {
      oneLine: 'Rain fills rivers, lakes, ponds and the ground; we get water from wells, handpumps and taps. We use it for drinking, cooking, washing, farming and animals. Water is limited, so close taps, reuse water for plants, collect rainwater and keep water sources clean.',
      sections: [
        { h: 'Sources', html: `<p>Rain → rivers, lakes, ponds, wells, groundwater → pipes and taps.</p>` },
        { h: 'Saving water', html: `<p>Turn off the tap while brushing (saves about 10 L), use a bucket instead of a hose, fix leaks, water plants with leftover water.</p>` },
        { h: 'Clean water', html: `<p>Drink only clean water — boiled, filtered or from a safe tap. Cover stored water.</p>` }
      ],
      formulas: [['Sources', 'rain, river, lake, pond, well, tap'], ['Save', 'close taps, bucket not hose, fix leaks'], ['Store', 'collect rainwater'], ['Safe drinking', 'boiled or filtered']],
      terms: [['Source', 'place we get water from'], ['Rainwater harvesting', 'collecting and storing rain'], ['Leak', 'water dripping out']],
      traps: ['Clear-looking water may not be safe.', 'A dripping tap wastes a lot over a day.', 'Ponds are not dustbins.'],
      bridge: '<p>Ch 8 looks at food — and food needs water to grow.</p>'
    },
    explore: [
      { title: 'Save water at home', intro: 'Choose an activity and the way you do it; see the litres used.',
        build(el, K) { let k = 0, wise = 0; const row = K.row(el); K.select(row, 'activity', USE.map(u => u[0].split(' with ')[0]), i => { k = i; draw(); }); K.select(row, 'way', ['wasteful', 'wise'], i => { wise = i; draw(); }); const rd = K.read(el);
          function draw() { const u = USE[k], L = wise ? u[2] : u[1]; const wiseText = ['tap closed, use a mug', 'bucket bath', 'bucket and cloth'][k]; rd.innerHTML = `<div style="font-size:22px">${'💧'.repeat(Math.ceil(L / 5))}</div>${wise ? wiseText : u[0]}: about <b>${L} litres</b>${wise ? ` · saves ${u[1] - u[2]} L each time, ${(u[1] - u[2]) * 30} L in a month` : ''}`; } draw(); return null; } },
      { title: 'From rain to tap', intro: 'Press <kbd>S</kbd> to follow water.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Rain', 'clouds bring rain to hills, fields and roofs.'], ['Rivers and lakes', 'rain water flows into streams, rivers, lakes and ponds.'], ['Under the ground', 'some water soaks into the soil and becomes groundwater.'], ['Wells and pumps', 'we draw groundwater with wells, handpumps and borewells.'], ['Tanks and pipes', 'water is cleaned, stored in tanks and sent through pipes to taps.'], ['Rainwater harvesting', 'roof rain is collected in tanks or sent into the ground to fill it again.']] }); } }
    ],
    gens: [
      { title: 'Sources', gen(R) { return G9.S9.pickQ(R, [['Name two sources of water.', 'any: rain, river, lake, pond, well, tap'], ['Where does all water first come from?', 'rain'], ['What do we call water under the ground?', 'groundwater'], ['How do we bring groundwater up?', 'wells, handpumps, borewells']]); } },
      { title: 'Litres saved', gen(R) { const s = R.pick([5, 8, 10]), d = R.pick([7, 30]); return { q: `Closing the tap while brushing saves ${s} L each day. How much in ${d} days?`, a: `${s * d} L`, ans: s * d }; } },
      { title: 'Save water', gen(R) { return G9.S9.pickQ(R, [['Give two ways to save water at home.', 'close taps, use a bucket, fix leaks, reuse water for plants'], ['Why use a bucket and not a hose to wash a car?', 'the hose wastes much more water'], ['What is rainwater harvesting?', 'collecting rain water to store or refill the ground']]); } },
      { title: 'Safe water', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['How can we make water safe to drink?', 'boil or filter it'], ['Why cover stored water?', 'keeps out dust, insects and mosquitoes'], ['Is clear water always safe?', 'no — it can have germs']]); } },
      { title: 'Family water', levels: [2, 3], gen(R) { const p = R.int(3, 6), l = R.pick([2, 3]); return { q: `${p} people each drink ${l} L of water a day. How much drinking water does the family need in a day?`, a: `${p * l} L`, ans: p * l }; } }
    ],
    quiz: [
      { q: 'All water first comes from', o: ['rain', 'taps', 'tanks', 'bottles'], a: 0, e: 'Rain.' }, { q: 'Save water while brushing by', o: ['closing the tap', 'keeping tap open', 'using a hose', 'nothing'], a: 0, e: 'Close.' },
      { q: 'Water under the ground', o: ['groundwater', 'rainwater', 'sea water', 'steam'], a: 0, e: 'Underground.' }, { q: 'Rainwater harvesting', o: ['collecting rain', 'wasting rain', 'buying water', 'boiling water'], a: 0, e: 'Store.' },
      { q: 'Safe drinking water', o: ['boiled or filtered', 'pond water', 'any clear water', 'drain water'], a: 0, e: 'Germs.' }, { q: 'A leaking tap', o: ['wastes water', 'saves water', 'cleans water', 'makes rain'], a: 0, e: 'Fix it.' },
      { q: '10 L a day for 7 days', o: ['70 L', '17 L', '10 L', '700 L'], a: 0, e: 'Multiply.' }, { q: 'Stored water should be', o: ['covered', 'open', 'shaken', 'heated always'], a: 0, e: 'Clean.' },
      { q: 'Better for car washing', o: ['bucket', 'running hose', 'shower', 'sprinkler'], a: 0, e: 'Less water.' }, { q: 'Ponds should not be used as', o: ['dustbins', 'water sources', 'homes for fish', 'drinking for cattle'], a: 0, e: 'Keep clean.' },
      { q: 'Leftover water can', o: ['water plants', 'be thrown on the road', 'go down the drain always', 'be wasted'], a: 0, e: 'Reuse.' }
    ],
    teach: {
      outcomes: ['Name sources of water', 'Suggest ways to save and store water', 'Explain safe drinking water'],
      periods: [{ t: 'Where water comes from', flow: [['10 min', 'Where does our school water come from?'], ['15 min', 'Explore panel 2.'], ['15 min', 'Draw the path of water.']] }, { t: 'Save it', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Water audit of school taps.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Clear water is safe.', 'Water never runs out.'], activities: ['Measure a dripping tap in a mug for 10 min.', 'Rain gauge from a bottle.'],
      exit: ['Two sources.', 'Two ways to save.', 'One way to make water safe.'], homework: 'Count buckets/mugs of water your family uses in a day. Suggest one way to save.'
    },
    slides: [{ t: 'Water - A Precious Gift', b: ['Sources', 'Uses', 'Saving water', 'Safe drinking water'] }, { t: 'Think and share', b: ['Litres saved by closing the tap?', 'How do we make water safe?'] }],
    fs: { groups: [['Sources', [['Rain', 'first source'], ['Surface', 'rivers, lakes, ponds'], ['Ground', 'wells, handpumps']]], ['Save', [['Brushing', 'close tap: ≈ 10 L saved'], ['Bath', 'bucket, not shower'], ['Leaks', 'fix them'], ['Rain', 'harvest it']]], ['Safe', [['Drink', 'boiled or filtered'], ['Store', 'covered']]]],
      ex: [['10 L × 30 days', '300 L saved'], ['Shower 60 L vs bucket 20 L', '40 L saved']], rem: ['Every drop counts.', 'Keep sources clean.', 'Cover stored water.'] }
  });
})();
