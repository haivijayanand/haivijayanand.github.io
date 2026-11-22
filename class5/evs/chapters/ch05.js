/*
TOOL:    class5_science_ch05
FAMILY:  CBSE_REVISION / Class 5 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 5 Our Vibrant Country (diversity of India: states, languages, food, dress, dances, festivals, unity in diversity, map reading) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const ST = [['Kerala', 'Malayalam', 'appam, sadya', 'Kathakali, Mohiniyattam', 'Onam'], ['Punjab', 'Punjabi', 'makki di roti, sarson da saag', 'Bhangra, Giddha', 'Baisakhi, Lohri'], ['Assam', 'Assamese', 'rice, fish, pitha', 'Bihu', 'Bihu'], ['Gujarat', 'Gujarati', 'dhokla, thepla', 'Garba', 'Navratri'], ['Tamil Nadu', 'Tamil', 'idli, dosa, pongal', 'Bharatanatyam', 'Pongal'], ['West Bengal', 'Bengali', 'fish curry, rasgulla', 'Chhau, Rabindra nritya', 'Durga Puja'], ['Rajasthan', 'Rajasthani, Hindi', 'dal-baati-churma', 'Ghoomar', 'Teej'], ['Manipur', 'Manipuri (Meitei)', 'eromba, rice', 'Manipuri dance', 'Yaoshang']];
  G9.register({
    no: 5, part: 'Unit 3 · Incredible India', short: 'Vibrant India', title: 'Our Vibrant Country',
    blurb: 'India’s rich variety — states and union territories, many languages, foods, clothes, dances, music and festivals — reading India on a map, and how this diversity is held together as one country.',
    revise: {
      oneLine: 'India has 28 states and 8 union territories, 22 scheduled languages and hundreds of others, and many kinds of food, clothes, dances and festivals. Different, yet one: we share a Constitution, the national flag and anthem, and respect each other’s ways — unity in diversity.',
      sections: [
        { h: 'Many languages', html: `<p>Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Odia, Punjabi, Assamese, Urdu and many more. Indian currency notes show amounts in many languages.</p>` },
        { h: 'Dances and festivals', html: `<p>Bharatanatyam (Tamil Nadu), Kathakali (Kerala), Bhangra (Punjab), Garba (Gujarat), Bihu (Assam), Ghoomar (Rajasthan).</p>` },
        { h: 'Reading the map', html: `<p>North at the top; the Himalayas in the north, the Thar desert in the west, the Deccan plateau in the south, seas on three sides: Arabian Sea, Bay of Bengal, Indian Ocean.</p>` }
      ],
      formulas: [['States / UTs', '28 / 8'], ['Scheduled languages', '22'], ['Seas', 'Arabian Sea (W), Bay of Bengal (E), Indian Ocean (S)'], ['Unity in diversity', 'many ways, one nation']],
      terms: [['Diversity', 'variety'], ['Union territory', 'area governed by the central government'], ['Folk dance', 'traditional dance of a region']],
      traps: ['Hindi is not the only Indian language.', 'Respect other customs — no making fun.', 'One state can have many languages.'],
      bridge: '<p>Ch 6 visits some unique places of India.</p>'
    },
    explore: [
      { title: 'Travel the states', intro: 'Choose a state; see its language, food, dance and festival.',
        build(el, K) { let k = 0; const row = K.row(el); K.select(row, 'state', ST.map(s => s[0]), i => { k = i; draw(); }); const rd = K.read(el);
          function draw() { const s = ST[k]; rd.innerHTML = `<b>${s[0]}</b><table style="margin-top:6px">${[['🗣️ language', s[1]], ['🍲 food', s[2]], ['💃 dance', s[3]], ['🎉 festival', s[4]]].map(r => `<tr><td style="padding:3px 10px">${r[0]}</td><td style="padding:3px 10px">${r[1]}</td></tr>`).join('')}</table>`; } draw(); return null; } },
      { title: 'Match the dance', intro: 'Sort the dances to their states.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Tamil Nadu', 'Punjab', 'Gujarat', 'Assam'], items: [['Bharatanatyam', 0], ['Bhangra', 1], ['Giddha', 1], ['Garba', 2], ['Dandiya Raas', 2], ['Bihu', 3]] }); } }
    ],
    gens: [
      { title: 'Dance and state', gen(R) { const s = R.pick(ST); return { q: `Which state is ${s[3].split(',')[0]} from?`, a: s[0] }; } },
      { title: 'Language', gen(R) { const s = R.pick(ST); return { q: `Main language of ${s[0]}?`, a: s[1] }; } },
      { title: 'Seas', gen(R) { return G9.S9.pickQ(R, [['Which sea lies to the west of India?', 'Arabian Sea'], ['Which sea lies to the east of India?', 'Bay of Bengal'], ['Which ocean lies to the south?', 'Indian Ocean'], ['Which mountains are in the north?', 'the Himalayas']]); } },
      { title: 'Numbers', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['How many states does India have?', '28'], ['How many union territories?', '8'], ['How many languages in the 8th Schedule?', '22']]); } },
      { title: 'Unity', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['What does "unity in diversity" mean?', 'many different ways of life, but one nation together'], ['Name two things all Indians share.', 'Constitution, national flag, national anthem'], ['How can you respect a classmate’s festival?', 'learn about it, greet them, join in if invited']]); } }
    ],
    quiz: [
      { q: 'Bharatanatyam is from', o: ['Tamil Nadu', 'Punjab', 'Assam', 'Gujarat'], a: 0, e: 'South.' }, { q: 'Bhangra is from', o: ['Punjab', 'Kerala', 'Odisha', 'Bihar'], a: 0, e: 'North.' },
      { q: 'Sea to India’s east', o: ['Bay of Bengal', 'Arabian Sea', 'Red Sea', 'Dead Sea'], a: 0, e: 'East.' }, { q: 'India has states', o: ['28', '20', '36', '50'], a: 0, e: '28.' },
      { q: 'Scheduled languages', o: ['22', '2', '100', '8'], a: 0, e: 'Eighth Schedule.' }, { q: 'Garba is from', o: ['Gujarat', 'Kerala', 'Assam', 'Punjab'], a: 0, e: 'Navratri.' },
      { q: 'Unity in diversity means', o: ['different, yet one nation', 'all the same', 'no differences', 'separate countries'], a: 0, e: 'Together.' }, { q: 'Kathakali is from', o: ['Kerala', 'Rajasthan', 'Assam', 'Bihar'], a: 0, e: 'Kerala.' },
      { q: 'Himalayas are in the', o: ['north', 'south', 'east coast', 'west coast'], a: 0, e: 'North.' }, { q: 'Language of Assam', o: ['Assamese', 'Tamil', 'Gujarati', 'Punjabi'], a: 0, e: 'Assamese.' },
      { q: 'Union territories', o: ['8', '28', '2', '12'], a: 0, e: 'Eight.' }
    ],
    teach: {
      outcomes: ['Describe India’s diversity', 'Read a map of India', 'Value unity in diversity'],
      periods: [{ t: 'Diversity', flow: [['10 min', 'Languages in our class.'], ['15 min', 'Explore panel 1.'], ['15 min', 'State fact cards.']] }, { t: 'Map and unity', flow: [['15 min', 'Map of India: seas, mountains.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['One language for all.', 'Other customs are "strange".'], activities: ['Greetings in many languages.', 'State fair project.'],
      exit: ['Three seas around India.', 'One dance and its state.', 'Meaning of unity in diversity.'], homework: 'Learn to say "thank you" in five Indian languages.'
    },
    slides: [{ t: 'Our Vibrant Country', b: ['States and languages', 'Food, dress, dances', 'Map of India', 'Unity in diversity'] }, { t: 'Think and share', b: ['Which sea is west of India?', 'A dance from your state?'] }],
    fs: { groups: [['India', [['States', '28'], ['Union territories', '8'], ['Scheduled languages', '22']]], ['Map', [['North', 'Himalayas'], ['West', 'Arabian Sea, Thar'], ['East', 'Bay of Bengal'], ['South', 'Indian Ocean']]], ['Dances', [['Bharatanatyam', 'Tamil Nadu'], ['Kathakali', 'Kerala'], ['Bhangra', 'Punjab'], ['Garba', 'Gujarat'], ['Bihu', 'Assam']]]],
      ex: [['Sea east of India', 'Bay of Bengal'], ['Garba', 'Gujarat']], rem: ['Many languages, one nation.', 'Respect every custom.', 'North is at the top of the map.'] }
  });
})();
