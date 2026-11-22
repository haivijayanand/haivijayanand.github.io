/*
TOOL:    class4_science_ch04
FAMILY:  CBSE_REVISION / Class 4 EVS (Our Wondrous World)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 4 Growing up with Nature (seeds to plants, what plants need, life cycles of a butterfly and frog, growing up like nature) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 4, part: 'Unit 2 · Life Around Us', short: 'Growing up', title: 'Growing up with Nature',
    blurb: 'How living things grow and change: a seed sprouting into a plant and what it needs (water, air, sunlight, soil), the life cycles of a butterfly and a frog, young ones of animals, and how we grow too.',
    revise: {
      oneLine: 'A seed needs water, air and warmth to sprout (germinate); the young plant then needs sunlight and soil to grow. Animals grow and change too: a butterfly goes egg → caterpillar → pupa → butterfly; a frog goes egg → tadpole → froglet → frog. We also grow — in height, weight and skills.',
      sections: [
        { h: 'Seed to plant', html: `<p>Soak seeds → root comes out first → shoot rises → first leaves → plant grows taller with sunlight.</p>` },
        { h: 'Life cycles', html: `<p>Butterfly: egg, caterpillar (eats leaves), pupa (rests), adult. Frog: eggs in water, tadpole with tail and gills, froglet with legs, frog.</p>` },
        { h: 'Young ones', html: `<p>calf (cow), kid (goat), cub (lion), puppy (dog), chick (hen), foal (horse).</p>` }
      ],
      formulas: [['Seed needs', 'water, air, warmth'], ['Plant needs', 'sunlight, water, air, soil'], ['Butterfly', 'egg → caterpillar → pupa → adult'], ['Frog', 'egg → tadpole → froglet → frog']],
      terms: [['Germinate', 'seed starts to grow'], ['Life cycle', 'stages from birth to adult and again'], ['Pupa', 'resting stage of a butterfly']],
      traps: ['A caterpillar is a young butterfly, not a worm.', 'The root comes out before the shoot.', 'A tadpole lives in water, breathing with gills.'],
      bridge: '<p>Ch 5 and 6 are about our own health and growth.</p>'
    },
    explore: [
      { title: 'Grow a bean', intro: 'Choose what the seed gets; press <kbd>S</kbd> to move day by day.',
        build(el, K) { let w = 1, l = 1; const row = K.row(el); K.select(row, 'water', ['none', 'some', 'flooded'], i => { w = i; an.reset(); }); K.select(row, 'light', ['dark cupboard', 'sunny window'], i => { l = i; an.reset(); }); row.querySelectorAll('select')[0].value = 1; row.querySelectorAll('select')[1].value = 1;
          const b = new K.Board(el, { xmin: -3, xmax: 3, ymin: -1.5, ymax: 4, axes: false, grid: 0, aspect: 0.55 }); const rd = K.read(el); const an = new K.Anim(10, () => b.redraw(), { ms: 600 });
          b.onDraw = () => { b.clear(); b.rect(-2, -1.5, 4, 1.2, { fill: 'rgba(161,98,7,.35)', color: '#92400e', w: 2 }); const d = an.i; const ok = w === 1; const g = ok ? Math.min(d, 9) : (w === 2 ? Math.min(d, 2) * 0.3 : 0);
            b.circle(0, -0.8, 0.22, { fill: '#d6a26b', color: '#92400e' }); if (g > 1) b.line(0, -0.8, 0, -1.3, { color: '#a16207', w: 3 }); if (g > 2) { const hgt = Math.min(3.6, (g - 2) * 0.55); b.line(0, -0.6, 0, -0.6 + hgt, { color: l ? '#15803d' : '#e5e7a0', w: 5 }); if (g > 4) { b.poly([[0, hgt - 0.6], [0.7, hgt - 0.3], [0.9, hgt - 0.6]], { fill: l ? '#4ade80' : '#fef9c3', color: '#15803d' }); b.poly([[0, hgt - 0.6], [-0.7, hgt - 0.3], [-0.9, hgt - 0.6]], { fill: l ? '#4ade80' : '#fef9c3', color: '#15803d' }); } }
            rd.innerHTML = `day ${d + 1}: ${!ok ? (w === 0 ? 'no water — the seed stays dry and does not sprout' : 'flooded — no air in the soil; the seed rots') : g <= 1 ? 'seed swells with water' : g <= 2 ? 'root comes out first, grows down' : g <= 4 ? 'shoot rises up' : l ? 'green leaves open; the plant makes food in sunlight' : 'tall, thin and pale — it needs sunlight to make food'}`; };
          K.anim(el, an); b.redraw(); return an; } },
      { title: 'Life cycle', intro: 'Choose an animal; press <kbd>S</kbd> or Play to go round its life cycle.',
        build(el, K) { const LC = { butterfly: [['🥚 egg', 'laid on a leaf'], ['🐛 caterpillar', 'eats leaves and grows fast'], ['🫘 pupa', 'rests in a case; body changes'], ['🦋 butterfly', 'flies, drinks nectar, lays eggs']], frog: [['🥚 eggs', 'jelly-like eggs in water'], ['〰️ tadpole', 'swims with a tail, breathes with gills'], ['🐸 froglet', 'grows legs, tail shrinks'], ['🐸 frog', 'lives on land and in water, lays eggs']] }; let k = 'butterfly'; const row = K.row(el); K.select(row, 'animal', ['butterfly', 'frog'], i => { k = ['butterfly', 'frog'][i]; an.reset(); }); const rd = K.read(el); const an = new K.Anim(4, i => draw(i), { ms: 1400, loop: true });
          function draw(i) { rd.innerHTML = `<div style="display:flex;gap:16px;align-items:center;font-size:20px">${LC[k].map((s, j) => `<span style="padding:6px 10px;border-radius:10px;${j === i ? 'background:var(--orange,#ea580c);color:#fff' : 'background:var(--line,#e2e8f0)'}">${s[0]}</span>${j < 3 ? '→' : '↺'}`).join('')}</div><b>${LC[k][i][0]}</b>: ${LC[k][i][1]}`; } K.anim(el, an); draw(0); return an; } }
    ],
    gens: [
      { title: 'Life cycle order', gen(R) { return G9.S9.pickQ(R, [['Order: pupa, egg, butterfly, caterpillar', 'egg → caterpillar → pupa → butterfly'], ['Order: frog, tadpole, eggs, froglet', 'eggs → tadpole → froglet → frog'], ['What comes after the caterpillar?', 'pupa'], ['What comes before the froglet?', 'tadpole']]); } },
      { title: 'Seed needs', gen(R) { return G9.S9.pickQ(R, [['What does a seed need to sprout?', 'water, air and warmth'], ['What comes out of a seed first?', 'the root'], ['Why does a plant in the dark turn pale?', 'it cannot make food without sunlight'], ['What happens to seeds in waterlogged soil?', 'no air; they rot']]); } },
      { title: 'Young ones', gen(R) { return G9.S9.pickQ(R, [['Young one of a cow?', 'calf'], ['Young one of a goat?', 'kid'], ['Young one of a lion?', 'cub'], ['Young one of a horse?', 'foal'], ['Young one of a hen?', 'chick'], ['Young one of a frog?', 'tadpole']]); } },
      { title: 'Plant growth', levels: [2, 3], gen(R) { const h = R.int(2, 6), d = R.int(3, 8); return { q: `A bean plant grows ${h} cm every 2 days. How tall after ${2 * d} days (starting at 0)?`, a: `${h * d} cm`, ans: h * d }; } },
      { title: 'We grow', levels: [2, 3], gen(R) { const a = R.int(95, 115), g = R.int(4, 7); return { q: `A child is ${a} cm tall and grows about ${g} cm a year. Height after 2 years?`, a: `${a + 2 * g} cm`, ans: a + 2 * g }; } }
    ],
    quiz: [
      { q: 'A seed needs to sprout', o: ['water, air, warmth', 'only sunlight', 'only soil', 'nothing'], a: 0, e: 'Germination.' }, { q: 'Comes out first from a seed', o: ['root', 'leaf', 'flower', 'fruit'], a: 0, e: 'Root.' },
      { q: 'Caterpillar is a young', o: ['butterfly', 'worm', 'snake', 'frog'], a: 0, e: 'Larva.' }, { q: 'Tadpoles breathe with', o: ['gills', 'lungs only', 'leaves', 'skin only'], a: 0, e: 'In water.' },
      { q: 'Young one of a horse', o: ['foal', 'calf', 'cub', 'kid'], a: 0, e: 'Foal.' }, { q: 'Resting stage of a butterfly', o: ['pupa', 'egg', 'adult', 'tadpole'], a: 0, e: 'Pupa.' },
      { q: 'Plant kept in the dark becomes', o: ['pale and thin', 'dark green', 'very strong', 'flowering'], a: 0, e: 'No light.' }, { q: 'Frog eggs are laid', o: ['in water', 'on trees', 'in nests', 'in sand'], a: 0, e: 'Water.' },
      { q: 'Germinate means', o: ['start to grow', 'die', 'flower', 'dry'], a: 0, e: 'Sprout.' }, { q: 'Young one of a lion', o: ['cub', 'puppy', 'kid', 'chick'], a: 0, e: 'Cub.' },
      { q: 'Plants make food using', o: ['sunlight', 'darkness', 'stones', 'plastic'], a: 0, e: 'Light.' }
    ],
    teach: {
      outcomes: ['Explain what seeds and plants need', 'Order life cycles of butterfly and frog', 'Match animals and young ones'],
      periods: [{ t: 'Seeds', flow: [['10 min', 'Set up bean jars (dry, wet, flooded, dark).'], ['15 min', 'Explore panel 1.'], ['15 min', 'Daily growth chart.']] }, { t: 'Life cycles', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Life-cycle wheel craft.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Seeds need light to sprout.', 'Caterpillars are worms.'], activities: ['Bean jar experiment.', 'Life-cycle wheel.'],
      exit: ['What a seed needs.', 'Butterfly stages.', 'Two animals and young ones.'], homework: 'Grow moong seeds on wet cotton; measure the shoot every day for a week.'
    },
    slides: [{ t: 'Growing up with Nature', b: ['Seed to plant', 'What plants need', 'Butterfly and frog life cycles', 'Young ones'] }, { t: 'Think and share', b: ['What comes out first from a seed?', 'Stages of a frog?'] }],
    fs: { groups: [['Seeds and plants', [['Sprout', 'water, air, warmth'], ['Grow', 'sunlight, water, air, soil'], ['First out', 'root']]], ['Life cycles', [['Butterfly', 'egg → caterpillar → pupa → adult'], ['Frog', 'egg → tadpole → froglet → frog']]], ['Young ones', [['Cow', 'calf'], ['Goat', 'kid'], ['Lion', 'cub'], ['Horse', 'foal']]]],
      ex: [['4 cm every 2 days, 10 days', '20 cm'], ['Tadpole', 'gills, tail, water']], rem: ['Root first, then shoot.', 'Caterpillar ≠ worm.', 'Life cycles repeat.'] }
  });
})();
