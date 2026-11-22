/*
TOOL:    class3_science_ch09
FAMILY:  CBSE_REVISION / Class 3 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 9 Staying Healthy and Happy (cleanliness, exercise and play, sleep, good food, feelings, sense organs, safety) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 9, part: 'All chapters', short: 'Health', title: 'Staying Healthy and Happy',
    blurb: 'Habits that keep us healthy — clean hands, teeth, nails and body, good food and water, play and exercise, enough sleep — caring for our sense organs, sharing feelings, and staying safe.',
    revise: {
      oneLine: 'A healthy child eats good food, drinks clean water, keeps clean (hands, teeth, nails, bath), plays and exercises, sleeps about 9–11 hours, and talks about feelings with family and friends. Our five sense organs — eyes, ears, nose, tongue and skin — need gentle care.',
      sections: [
        { h: 'Clean habits', html: `<p>Wash hands with soap before eating and after the toilet (about 20 seconds), brush twice a day, cut nails, bathe daily.</p>` },
        { h: 'Body and mind', html: `<p>Play outdoors, do yoga or sports, sleep early; share feelings — happy, sad, angry or scared — with someone you trust.</p>` },
        { h: 'Sense organs', html: `<p>Eyes see, ears hear, nose smells, tongue tastes, skin feels. Read in good light, do not put things in ears or nose.</p>` }
      ],
      formulas: [['Hand wash', 'soap, about 20 seconds'], ['Brush', 'twice a day'], ['Sleep', 'about 9–11 hours'], ['Sense organs', 'eyes, ears, nose, tongue, skin']],
      terms: [['Hygiene', 'keeping clean to stay healthy'], ['Exercise', 'body movement that makes us strong'], ['Feelings', 'happy, sad, angry, scared…']],
      traps: ['Water alone does not remove germs well — use soap.', 'Screens late at night spoil sleep.', 'All feelings are okay; how we act on them matters.'],
      bridge: '<p>Ch 10 explores the things around us.</p>'
    },
    explore: [
      { title: 'My healthy day', intro: 'Set your day; see whether it is a healthy balance.',
        build(el, K) { const T = [['😴 sleep', 10], ['🏃 play/exercise', 1], ['📚 school and study', 7], ['📺 screens', 1]]; const v = T.map(t => t[1]); const row = K.row(el); T.forEach((t, i) => K.slider(row, t[0] + ' (h)', 0, 12, 1, v[i], x => { v[i] = x; draw(); })); const rd = K.read(el);
          function draw() { const tot = v.reduce((a, b) => a + b, 0), tips = []; if (v[0] < 9) tips.push('sleep more (9–11 h)'); if (v[1] < 1) tips.push('play at least 1 hour'); if (v[3] > 2) tips.push('cut screen time'); if (tot > 24) tips.push('that is more than 24 hours!'); rd.innerHTML = `<div style="display:flex;height:28px;border-radius:6px;overflow:hidden;margin:6px 0">${T.map((t, i) => `<div title="${t[0]}" style="flex:${v[i]};background:${['#1d4ed8', '#ea580c', '#7c3aed', '#64748b'][i]}"></div>`).join('')}<div style="flex:${Math.max(0, 24 - tot)};background:var(--line,#e2e8f0)"></div></div>${tot} of 24 hours planned · ${tips.length ? tips.join('; ') : '<b>a healthy, happy day!</b>'}`; } draw(); return null; } },
      { title: 'Hand-washing steps', intro: 'Press <kbd>S</kbd> or Play — about 20 seconds in all.',
        build(el, K) { return G9.S9.stages(el, K, { ms: 2500, stages: [['Wet', 'wet your hands with clean water.'], ['Soap', 'rub soap to make a lather.'], ['Palms and backs', 'rub palm to palm, then the backs of the hands.'], ['Between fingers', 'interlock fingers and rub.'], ['Thumbs and nails', 'rub thumbs and scrub nails on the palm.'], ['Rinse and dry', 'rinse well and dry with a clean cloth.']] }); } }
    ],
    gens: [
      { title: 'Healthy habits', gen(R) { return G9.S9.pickQ(R, [['When should you wash your hands?', 'before eating and after using the toilet'], ['How many times should you brush?', 'twice a day'], ['How long should children sleep?', 'about 9–11 hours'], ['Why cut nails?', 'dirt and germs collect under long nails']]); } },
      { title: 'Sense organs', gen(R) { return G9.S9.pickQ(R, [['Which organ helps us smell?', 'nose'], ['Which organ helps us taste?', 'tongue'], ['Which organ feels hot and cold?', 'skin'], ['How do you care for your eyes?', 'read in good light, do not rub, limit screens'], ['Why not put pencils in the ear?', 'it can hurt the ear']]); } },
      { title: 'Feelings', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['What can you do when you feel angry?', 'take deep breaths, count to 10, talk to someone'], ['Whom can you tell if you feel scared?', 'parent, teacher or a trusted adult'], ['How can you help a sad friend?', 'listen, play together, be kind']]); } },
      { title: 'Count the hours', gen(R) { const s = R.int(8, 11), p = R.int(1, 3); return { q: `You sleep ${s} hours and play ${p} hours. How many hours is that together? How many are left in a day?`, a: `${s + p} hours; ${24 - s - p} left`, ans: s + p }; } },
      { title: 'Safety', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['What should you do before crossing a road?', 'stop, look right and left, cross with an adult at a zebra crossing'], ['Should you touch a wire switch with wet hands?', 'no — you can get a shock'], ['What do you do if a stranger offers sweets?', 'say no and tell a trusted adult']]); } }
    ],
    quiz: [
      { q: 'Wash hands with', o: ['soap and water', 'only water', 'only a cloth', 'mud'], a: 0, e: 'Removes germs.' }, { q: 'Brush teeth', o: ['twice a day', 'once a week', 'never', 'once a month'], a: 0, e: 'Morning and night.' },
      { q: 'Organ for smelling', o: ['nose', 'ear', 'eye', 'skin'], a: 0, e: 'Nose.' }, { q: 'Children need about', o: ['9–11 hours of sleep', '3 hours', '20 hours', '1 hour'], a: 0, e: 'Growth.' },
      { q: 'When angry', o: ['take deep breaths and talk', 'hit someone', 'break things', 'shout at pets'], a: 0, e: 'Calm.' }, { q: 'Skin helps us', o: ['feel', 'see', 'hear', 'smell'], a: 0, e: 'Touch.' },
      { q: 'Too much screen time', o: ['spoils sleep and eyes', 'is healthy', 'replaces play', 'helps growth'], a: 0, e: 'Limit.' }, { q: 'Hand-wash time', o: ['about 20 seconds', '1 second', '5 minutes', 'an hour'], a: 0, e: 'Thorough.' },
      { q: 'Play and exercise make us', o: ['strong and happy', 'weak', 'sleepy all day', 'ill'], a: 0, e: 'Fitness.' }, { q: 'Long dirty nails', o: ['carry germs', 'are healthy', 'help eating', 'are needed'], a: 0, e: 'Cut them.' },
      { q: 'Number of sense organs', o: ['five', 'three', 'ten', 'two'], a: 0, e: 'Eyes, ears, nose, tongue, skin.' }
    ],
    teach: {
      outcomes: ['Practise hygiene habits', 'Name sense organs and their care', 'Talk about feelings and safety'],
      periods: [{ t: 'Clean and fit', flow: [['10 min', 'Glitter-germ hand-wash demo.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Explore panel 1: healthy day.']] }, { t: 'Senses and feelings', flow: [['15 min', 'Blindfold sense games.'], ['15 min', 'Feelings faces chart.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Water alone cleans.', 'Feeling sad is bad.'], activities: ['Hand-wash song.', 'Mystery box for touch.'],
      exit: ['Steps of hand-washing.', 'Five sense organs.', 'One thing to do when angry.'], homework: 'Keep a one-week chart: brushed twice, washed hands, played, slept early — tick each day.'
    },
    slides: [{ t: 'Staying Healthy and Happy', b: ['Clean habits', 'Food, play, sleep', 'Sense organs', 'Feelings and safety'] }, { t: 'Think and share', b: ['When do you wash hands?', 'Who do you talk to when sad?'] }],
    fs: { groups: [['Clean', [['Hands', 'soap, 20 s'], ['Teeth', 'twice a day'], ['Nails', 'cut short'], ['Body', 'daily bath']]], ['Fit and happy', [['Play', '1 hour or more'], ['Sleep', '9–11 hours'], ['Feelings', 'talk to someone you trust']]], ['Senses', [['Eyes', 'see'], ['Ears', 'hear'], ['Nose', 'smell'], ['Tongue', 'taste'], ['Skin', 'feel']]]],
      ex: [['Sleep 10 h + play 2 h', '12 h; 12 h left'], ['Smell', 'nose']], rem: ['Soap beats germs.', 'Less screen, more play.', 'All feelings are okay.'] }
  });
})();
