/*
TOOL:    class7_science_ch02
FAMILY:  CBSE_REVISION / Class 7 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 2 Exploring Substances: Acidic, Basic, and Neutral (taste and touch cautions, natural indicators litmus turmeric china rose, neutralisation, uses) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const SUB = [['lemon juice', 0], ['vinegar', 0], ['tamarind water', 0], ['soap solution', 1], ['baking soda solution', 1], ['lime water', 1], ['sugar solution', 2], ['salt solution', 2], ['tap water (pure)', 2], ['curd', 0], ['washing soda solution', 1], ['amla juice', 0]];
  const IND = [['blue litmus', ['red', 'blue', 'blue']], ['red litmus', ['red', 'blue', 'red']], ['turmeric', ['yellow', 'red-brown', 'yellow']], ['china rose', ['dark pink (magenta)', 'green', 'no change']]];
  G9.register({
    no: 2, part: 'All chapters', short: 'Acids and bases', title: 'Exploring Substances: Acidic, Basic, and Neutral',
    blurb: 'Acidic, basic and neutral substances; why we never taste or touch unknown chemicals; natural indicators — litmus, turmeric, china rose — and their colours; neutralisation and its everyday uses (indigestion, ant bites, soil treatment).',
    revise: {
      oneLine: 'Acids taste sour (lemon, vinegar, curd); bases feel soapy and taste bitter (soap, baking soda, lime water); neutral substances are neither (sugar, salt water). Indicators change colour: acids turn blue litmus red; bases turn red litmus blue and turmeric red-brown; china rose turns acids dark pink and bases green. Acid + base → salt + water + heat (neutralisation).',
      sections: [
        { h: 'Safety', html: `<p>Never taste or touch unknown substances; use indicators instead. Strong acids and bases burn.</p>` },
        { h: 'Indicators', html: `<p>Litmus comes from lichens; turmeric and china rose are home indicators. Neutral solutions do not change litmus.</p>` },
        { h: 'Neutralisation in life', html: `<p>Antacid (base) for acidity; baking soda or calamine on an ant bite (acid); vinegar on a wasp sting (base); slaked lime on acidic soil; factory waste neutralised before release.</p>` }
      ],
      formulas: [['Acid + blue litmus', 'red'], ['Base + red litmus', 'blue'], ['Base + turmeric', 'red-brown'], ['China rose', 'acid pink, base green'], ['Acid + base', 'salt + water + heat']],
      terms: [['Indicator', 'shows acid or base by colour'], ['Neutralisation', 'acid and base cancel each other'], ['Neutral', 'neither acidic nor basic']],
      traps: ['Red litmus stays red in acids — use blue litmus to spot acids.', 'Turmeric does not change in acids.', 'Neutralisation gives off heat.'],
      bridge: '<p>Class 10 introduces the pH scale and more reactions of acids and bases.</p>'
    },
    explore: [
      { title: 'Indicator lab', intro: 'Choose a substance and an indicator; see the colour.',
        build(el, K) { let s = 0, i = 0; const row = K.row(el); K.select(row, 'substance', SUB.map(x => x[0]), v => { s = v; draw(); }); K.select(row, 'indicator', IND.map(x => x[0]), v => { i = v; draw(); }); const rd = K.read(el); const CC = { 'red': '#dc2626', 'blue': '#2563eb', 'yellow': '#facc15', 'red-brown': '#9a3412', 'dark pink (magenta)': '#db2777', 'green': '#16a34a', 'no change': '#f9a8d4' };
          function draw() { const t = SUB[s][1], col = IND[i][1][t]; rd.innerHTML = `<div style="display:flex;align-items:center;gap:14px"><span style="width:56px;height:56px;border-radius:8px;border:2px solid #0f172a;background:${CC[col]};display:inline-block"></span><span><b>${SUB[s][0]}</b> + ${IND[i][0]} → <b>${col}</b> · the substance is <b>${['acidic', 'basic', 'neutral'][t]}</b></span></div>`; } draw(); return null; } },
      { title: 'Acid, base or neutral?', intro: 'Sort.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Acidic', 'Basic', 'Neutral'], items: SUB.slice(0, 9).map(x => [x[0], x[1]]) }); } }
    ],
    gens: [
      { title: 'Indicator colour', gen(R) { const s = R.pick(SUB), i = R.pick(IND); return { q: `${i[0]} is added to ${s[0]}. Colour?`, a: `${i[1][s[1]]} (${['acidic', 'basic', 'neutral'][s[1]]})` }; } },
      { title: 'Classify', gen(R) { return G9.S9.groupQ(R, SUB, ['acidic', 'basic', 'neutral'], 'Acidic, basic or neutral: '); } },
      { title: 'Neutralisation use', gen(R) { return G9.S9.pickQ(R, [['What do we take for acidity (indigestion)?', 'an antacid — a mild base like milk of magnesia'], ['What helps an ant bite?', 'baking soda or calamine (base) neutralises the acid'], ['How is acidic soil treated?', 'add slaked lime or quicklime (base)'], ['Why treat factory waste before release?', 'to neutralise acids/bases that harm water life']]); } },
      { title: 'Neutralise by drops', levels: [2, 3], gen(R) { const a = R.int(10, 30), r = R.pick([1, 2]); return { q: `${a} drops of an acid are neutralised by ${a * r} drops of a base solution. How many drops of base for ${a * 2} drops of the acid?`, a: String(a * r * 2), ans: a * r * 2 }; } },
      { title: 'Products', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Acid + base gives?', 'salt + water (and heat)'], ['Is heat given out or taken in?', 'given out'], ['Why not taste to test for acid?', 'it may be harmful; use an indicator'], ['Where does litmus come from?', 'lichens']]); } }
    ],
    quiz: [
      { q: 'Acid turns blue litmus', o: ['red', 'blue', 'green', 'yellow'], a: 0, e: 'Red.' }, { q: 'Base turns red litmus', o: ['blue', 'red', 'pink', 'brown'], a: 0, e: 'Blue.' },
      { q: 'Base turns turmeric', o: ['red-brown', 'yellow', 'green', 'blue'], a: 0, e: 'Turmeric.' }, { q: 'China rose in base', o: ['green', 'pink', 'red', 'yellow'], a: 0, e: 'Green.' },
      { q: 'Lemon juice is', o: ['acidic', 'basic', 'neutral', 'salt'], a: 0, e: 'Sour.' }, { q: 'Soap solution is', o: ['basic', 'acidic', 'neutral', 'water'], a: 0, e: 'Soapy.' },
      { q: 'Sugar solution is', o: ['neutral', 'acidic', 'basic', 'indicator'], a: 0, e: 'No change.' }, { q: 'Acid + base →', o: ['salt + water', 'more acid', 'gas only', 'nothing'], a: 0, e: 'Neutralisation.' },
      { q: 'Ant bite treated with', o: ['baking soda', 'vinegar', 'lemon', 'curd'], a: 0, e: 'Base.' }, { q: 'Litmus comes from', o: ['lichens', 'turmeric', 'roses', 'rocks'], a: 0, e: 'Lichen.' },
      { q: 'Unknown substances', o: ['never taste', 'taste a little', 'touch', 'smell closely'], a: 0, e: 'Safety.' }
    ],
    teach: {
      outcomes: ['Classify substances using indicators', 'Explain neutralisation', 'Apply to daily life'],
      periods: [{ t: 'Indicators', flow: [['10 min', 'Safety rules.'], ['15 min', 'Explore panel 1 / real litmus.'], ['15 min', 'Home indicator: turmeric paper.']] }, { t: 'Neutralisation', flow: [['15 min', 'Acid + base with indicator (teacher).'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Taste to test.', 'All acids are dangerous.'], activities: ['Turmeric paper strips.', 'China rose indicator.'],
      exit: ['Litmus colours.', 'Two neutralisation uses.', 'Three neutral substances.'], homework: 'Make turmeric paper and test 5 kitchen substances.'
    },
    slides: [{ t: 'Acidic, Basic and Neutral', b: ['Safety first', 'Natural indicators', 'Neutralisation', 'Daily uses'] }, { t: 'Think and share', b: ['Why use baking soda on an ant bite?', 'Turmeric in vinegar?'] }],
    fs: { groups: [['Indicators', [['Blue litmus', 'acid → red'], ['Red litmus', 'base → blue'], ['Turmeric', 'base → red-brown'], ['China rose', 'acid pink, base green']]], ['Examples', [['Acidic', 'lemon, vinegar, curd'], ['Basic', 'soap, baking soda, lime water'], ['Neutral', 'sugar, salt water']]], ['Neutralisation', [['Equation', 'acid + base → salt + water + heat'], ['Uses', 'antacid, ant bite, soil']]]],
      ex: [['Vinegar + blue litmus', 'red'], ['Soap + turmeric', 'red-brown']], rem: ['Never taste.', 'Use indicators.', 'Neutralise wisely.'] }
  });
})();
