/*
TOOL:    class5_science_ch09
FAMILY:  CBSE_REVISION / Class 5 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 9 Rhythms of Nature (six seasons (ritus), day and night, phases of the moon, migration, flowering and harvest cycles) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const RITU = [['Vasanta (spring)', 'March–April', 'flowers bloom, mango blossom, koel sings'], ['Grishma (summer)', 'May–June', 'hot days, mangoes ripen, water is scarce'], ['Varsha (monsoon)', 'July–August', 'rain, green fields, frogs croak, sowing of rice'], ['Sharad (autumn)', 'September–October', 'clear skies, bright moon, harvest of kharif crops'], ['Hemant (pre-winter)', 'November–December', 'cool mornings, dew, sowing of rabi crops'], ['Shishir (winter)', 'January–February', 'cold, fog, trees shed leaves, migratory birds arrive']];
  G9.register({
    no: 9, part: 'Unit 5 · Our Amazing Planet', short: 'Rhythms of nature', title: 'Rhythms of Nature',
    blurb: 'Nature’s repeating patterns: day and night, the Moon’s phases, the six Indian seasons (ritus), flowering and fruiting times, sowing and harvest cycles (kharif and rabi), and birds that migrate with the seasons.',
    revise: {
      oneLine: 'Nature repeats in rhythms: day and night every 24 hours, the Moon’s phases about every 29.5 days, and seasons every year. The Indian calendar has six ritus — Vasanta, Grishma, Varsha, Sharad, Hemant, Shishir. Farmers sow kharif crops with the monsoon and rabi crops in winter; many birds migrate to India in winter.',
      sections: [
        { h: 'Six ritus', html: `<p>Vasanta (spring), Grishma (summer), Varsha (rains), Sharad (autumn), Hemant (pre-winter), Shishir (winter) — two months each.</p>` },
        { h: 'Crops follow seasons', html: `<p>Kharif (sown June–July, harvested Sept–Oct): rice, maize, cotton. Rabi (sown Oct–Dec, harvested Mar–Apr): wheat, mustard, gram.</p>` },
        { h: 'Animals follow seasons', html: `<p>Siberian cranes, flamingos and bar-headed geese come to Indian wetlands in winter; frogs croak in the rains; some animals hibernate.</p>` }
      ],
      formulas: [['Day + night', '24 hours'], ['Moon cycle', '≈ 29.5 days'], ['Ritus', '6 × 2 months'], ['Kharif', 'monsoon crops'], ['Rabi', 'winter crops']],
      terms: [['Ritu', 'season in the Indian calendar'], ['Migration', 'seasonal journey of animals'], ['Kharif / rabi', 'monsoon / winter crop seasons']],
      traps: ['Wheat is rabi, rice is kharif.', 'Migratory birds come to India in winter, not summer.', 'Six ritus, not four seasons, in the Indian calendar.'],
      bridge: '<p>Ch 10 looks at the Earth as a shared home for all life.</p>'
    },
    explore: [
      { title: 'Wheel of six seasons', intro: 'Press <kbd>S</kbd> or Play to turn the year.',
        build(el, K) { const b = new K.Board(el, { xmin: -1.6, xmax: 1.6, ymin: -1.3, ymax: 1.3, axes: false, grid: 0, equal: true }); const rd = K.read(el); let k = 0; const an = new K.Anim(6, i => { k = i; b.redraw(); }, { ms: 1500, loop: true }); const cols = ['#fde68a', '#fdba74', '#93c5fd', '#c4b5fd', '#a7f3d0', '#e2e8f0'];
          b.onDraw = () => { b.clear(); for (let i = 0; i < 6; i++) { const a0 = Math.PI / 2 - (i + 1) * Math.PI / 3, a1 = Math.PI / 2 - i * Math.PI / 3; b.arc(0, 0, 1.1, a0, a1, { sector: true, fill: cols[i], color: i === k ? C.orange : C.ink, w: i === k ? 5 : 1 }); const m = (a0 + a1) / 2; b.text(0.72 * Math.cos(m), 0.72 * Math.sin(m), RITU[i][0].split(' ')[0], { font: 'bold 12px' }); }
            const R = RITU[k]; rd.innerHTML = `<b>${R[0]}</b> · ${R[1]} · ${R[2]}`; };
          K.anim(el, an); b.redraw(); return an; } },
      { title: 'Kharif or rabi?', intro: 'Sort the crops.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Kharif (monsoon)', 'Rabi (winter)'], items: [['rice', 0], ['maize', 0], ['cotton', 0], ['soybean', 0], ['wheat', 1], ['mustard', 1], ['gram (chana)', 1], ['barley', 1]] }); } }
    ],
    gens: [
      { title: 'Ritu', gen(R) { const r = R.pick(RITU); return { q: `Which ritu: ${r[2]} (${r[1]})?`, a: r[0] }; } },
      { title: 'Crop season', gen(R) { return G9.S9.groupQ(R, [['rice', 0], ['wheat', 1], ['jowar', 0], ['peas', 1], ['groundnut', 0], ['mustard', 1]], ['kharif', 'rabi'], 'Kharif or rabi: '); } },
      { title: 'Cycles', gen(R) { return G9.S9.pickQ(R, [['How long is one day and night?', '24 hours'], ['About how long is the Moon’s cycle?', 'about 29.5 days'], ['How many ritus are there?', 'six'], ['When do migratory birds come to India?', 'winter']]); } },
      { title: 'Count', levels: [2, 3], gen(R) { const y = R.int(2, 5); return { q: `How many ritus pass in ${y} years? How many full moons, roughly?`, a: `${6 * y} ritus; about ${Math.round(12.4 * y)} full moons`, ans: 6 * y }; } },
      { title: 'Migration', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Why do birds migrate to India in winter?', 'their homes freeze; India is warmer with food'], ['Name a bird that migrates to India.', 'bar-headed goose, flamingo, Siberian crane, Amur falcon'], ['Name a wetland where migratory birds come.', 'Keoladeo (Bharatpur), Chilika lake']]); } }
    ],
    quiz: [
      { q: 'Number of ritus', o: ['6', '4', '12', '3'], a: 0, e: 'Six seasons.' }, { q: 'Varsha is', o: ['monsoon', 'winter', 'spring', 'summer'], a: 0, e: 'Rain.' },
      { q: 'Wheat is a', o: ['rabi crop', 'kharif crop', 'fruit', 'fibre'], a: 0, e: 'Winter.' }, { q: 'Rice is a', o: ['kharif crop', 'rabi crop', 'spice', 'tree'], a: 0, e: 'Monsoon.' },
      { q: 'Migratory birds come in', o: ['winter', 'summer', 'monsoon', 'never'], a: 0, e: 'Cold north.' }, { q: 'Vasanta is', o: ['spring', 'autumn', 'winter', 'rains'], a: 0, e: 'Blossom.' },
      { q: 'Moon cycle ≈', o: ['29.5 days', '7 days', '365 days', '24 hours'], a: 0, e: 'Month.' }, { q: 'Shishir is', o: ['winter', 'summer', 'spring', 'monsoon'], a: 0, e: 'Cold.' },
      { q: 'Kharif crops are sown in', o: ['June–July', 'December', 'March', 'never'], a: 0, e: 'Monsoon.' }, { q: 'Mangoes ripen in', o: ['Grishma', 'Shishir', 'Hemant', 'Sharad'], a: 0, e: 'Summer.' },
      { q: 'Day and night repeat every', o: ['24 hours', '12 days', 'month', 'year'], a: 0, e: 'Rotation.' }
    ],
    teach: {
      outcomes: ['Name the six ritus', 'Link crops and animals to seasons', 'Recognise natural cycles'],
      periods: [{ t: 'Seasons', flow: [['10 min', 'What season is it now?'], ['15 min', 'Explore panel 1.'], ['15 min', 'Season calendar.']] }, { t: 'Crops and birds', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Migratory bird map.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Only four seasons.', 'Wheat is kharif.'], activities: ['Season wheel craft.', 'Ask a farmer.'],
      exit: ['Name the 6 ritus.', 'Two kharif and two rabi crops.', 'Why birds migrate.'], homework: 'Note the trees flowering near your home this month; which ritu is it?'
    },
    slides: [{ t: 'Rhythms of Nature', b: ['Day, night and Moon', 'Six ritus', 'Kharif and rabi', 'Migration'] }, { t: 'Think and share', b: ['Which ritu is now?', 'Is mustard kharif or rabi?'] }],
    fs: { groups: [['Ritus', [['Vasanta', 'spring'], ['Grishma', 'summer'], ['Varsha', 'rains'], ['Sharad', 'autumn'], ['Hemant', 'pre-winter'], ['Shishir', 'winter']]], ['Crops', [['Kharif', 'rice, maize, cotton'], ['Rabi', 'wheat, mustard, gram']]], ['Cycles', [['Day', '24 h'], ['Moon', '≈ 29.5 days'], ['Migrants', 'come in winter']]]],
      ex: [['3 years', '18 ritus'], ['Wheat', 'rabi']], rem: ['Six ritus.', 'Kharif with rain, rabi with cold.', 'Nature repeats.'] }
  });
})();
