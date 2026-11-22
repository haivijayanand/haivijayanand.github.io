/*
TOOL:    class8_science_ch07
FAMILY:  CBSE_REVISION / Class 8 Science (Curiosity)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 7 Particulate Nature of Matter (particles, spaces, motion, attraction, diffusion, states of matter, effect of heat, interparticle forces) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 7, part: 'All chapters', short: 'Particles', title: 'Particulate Nature of Matter',
    blurb: 'Matter is made of tiny particles with spaces between them, always moving and attracting each other; evidence from dissolving and diffusion; arrangement and motion of particles in solids, liquids and gases; and how heating changes motion and state.',
    revise: {
      oneLine: 'Matter is made of very small particles that have spaces between them, keep moving, and attract each other. In solids particles are closely packed and vibrate; in liquids they are close but slide past each other; in gases they are far apart and move freely. Heating makes particles move faster, weakening the hold between them — this explains melting, evaporation and faster diffusion.',
      sections: [
        { h: 'Evidence', html: `<p>Sugar dissolves without raising the water level much (spaces). Perfume smell spreads across a room; ink spreads in water (diffusion, faster when warm).</p>` },
        { h: 'States', html: `<p>Solid: fixed shape and volume. Liquid: fixed volume, takes container’s shape. Gas: no fixed shape or volume; easily compressed.</p>` },
        { h: 'Heat', html: `<p>Heat increases particle energy; interparticle attraction is overcome at melting and boiling points.</p>` }
      ],
      formulas: [['Spaces', 'solid < liquid < gas'], ['Attraction', 'solid > liquid > gas'], ['Motion', 'solid < liquid < gas'], ['Diffusion', 'faster when hotter'], ['Compressible', 'gases most']],
      terms: [['Particle', 'tiny unit of matter'], ['Diffusion', 'spreading of particles on their own'], ['Interparticle attraction', 'force holding particles together']],
      traps: ['Particles do not expand when heated — they move faster and spread out.', 'Particles in solids still vibrate.', 'Gases fill any container.'],
      bridge: '<p>Class 9: Matter in Our Surroundings and atoms and molecules.</p>'
    },
    explore: [
      { title: 'Heat the particles', intro: 'Raise the temperature; watch particles move faster and the state change (water, schematic).',
        build(el, K) { let T = 20; const row = K.row(el); K.slider(row, 'temperature (°C)', -20, 120, 1, T, v => { T = v; }); const b = new K.Board(el, { xmin: 0, xmax: 10, ymin: 0, ymax: 5, axes: false, grid: 0, aspect: 0.45 }); const rd = K.read(el); const N = 36; const P = []; for (let i = 0; i < N; i++) P.push({ gx: 3 + (i % 6) * 0.7, gy: 0.4 + Math.floor(i / 6) * 0.7, x: 0, y: 0, vx: Math.cos(i * 2.3), vy: Math.sin(i * 1.7) });
          const an = new K.Anim(Infinity, () => b.redraw(), { ms: 40 });
          b.onDraw = () => { b.clear(); b.rect(0, 0, 10, 5, { fill: '#fff', color: C.ink, w: 2 }); const st = T < 0 ? 0 : T < 100 ? 1 : 2; const sp = 0.02 + Math.max(0, T + 20) / 140 * 0.15;
            P.forEach((p, i) => { if (st === 0) { const j = 0.06 + sp * 0.3; p.x = p.gx + j * Math.sin(an.i * 0.9 + i); p.y = p.gy + j * Math.cos(an.i * 1.1 + i * 2); } else { if (!p.x) { p.x = p.gx; p.y = p.gy; } p.x += p.vx * sp; p.y += p.vy * sp; const top = st === 1 ? 2.2 : 4.8, lo = st === 1 ? 2.8 : 0.2, hi = st === 1 ? 7.2 : 9.8; if (p.x < lo || p.x > hi) p.vx *= -1; if (p.y < 0.2 || p.y > top) p.vy *= -1; p.x = Math.max(lo, Math.min(hi, p.x)); p.y = Math.max(0.2, Math.min(top, p.y)); } b.dot(p.x, p.y, { r: 8, color: [C.blue, C.purple, C.orange][st] }); });
            rd.innerHTML = `${T} °C → <b>${['solid (ice)', 'liquid (water)', 'gas (steam)'][st]}</b> · ${['particles vibrate in fixed places', 'particles slide past each other, stay close', 'particles move freely, far apart'][st]}`; };
          K.anim(el, an); an.play(); return an; } },
      { title: 'Compare the states', intro: 'Sort the properties.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['Solid', 'Liquid', 'Gas'], items: [['fixed shape and volume', 0], ['fixed volume, no fixed shape', 1], ['no fixed shape or volume', 2], ['particles vibrate in place', 0], ['easily compressed', 2], ['flows and takes container’s shape', 1], ['strongest interparticle attraction', 0], ['largest spaces between particles', 2]] }); } }
    ],
    gens: [
      { title: 'State property', gen(R) { return G9.S9.groupQ(R, [['fixed shape', 0], ['flows, fixed volume', 1], ['fills any container', 2], ['closely packed particles', 0], ['most compressible', 2], ['particles slide past', 1]], ['solid', 'liquid', 'gas'], 'Which state: '); } },
      { title: 'Evidence', gen(R) { return G9.S9.pickQ(R, [['Why does perfume smell spread?', 'diffusion — gas particles move and mix with air'], ['Why does sugar dissolve without much volume change?', 'particles fit into spaces between water particles'], ['Why does ink spread faster in hot water?', 'particles move faster when hot'], ['Why can a gas be compressed?', 'large spaces between particles']]); } },
      { title: 'Heat and motion', gen(R) { return G9.S9.pickQ(R, [['What happens to particles when heated?', 'they move faster'], ['Why does a solid melt?', 'heat overcomes interparticle attraction'], ['Do particles stop in a solid?', 'no — they vibrate'], ['Why do gases spread fastest?', 'weak attraction, fast-moving particles']]); } },
      { title: 'Diffusion time', levels: [2, 3], gen(R) { const t = R.int(20, 60), k = R.pick([2, 3]); return { q: `Ink spreads through cold water in ${t * k} s and ${k} times faster in hot water. Time in hot water?`, a: `${t} s`, ans: t }; } },
      { title: 'Spaces order', levels: [2, 3], gen(R) { return R.chance(.5) ? { q: 'Arrange by spaces between particles (least to most): gas, solid, liquid', a: 'solid < liquid < gas' } : { q: 'Arrange by attraction between particles (strongest first): liquid, gas, solid', a: 'solid > liquid > gas' }; } }
    ],
    quiz: [
      { q: 'Matter is made of', o: ['particles', 'continuous jelly', 'light', 'nothing'], a: 0, e: 'Particles.' }, { q: 'Diffusion is fastest in', o: ['gases', 'solids', 'liquids', 'ice'], a: 0, e: 'Gases.' },
      { q: 'Heating particles', o: ['move faster', 'grow bigger', 'stop', 'vanish'], a: 0, e: 'Energy.' }, { q: 'Most compressible', o: ['gas', 'solid', 'liquid', 'all same'], a: 0, e: 'Spaces.' },
      { q: 'Particles in a solid', o: ['vibrate in place', 'move freely', 'do not exist', 'are far apart'], a: 0, e: 'Vibrate.' }, { q: 'Liquid has', o: ['fixed volume', 'fixed shape', 'no volume', 'no particles'], a: 0, e: 'Volume.' },
      { q: 'Perfume spreading shows', o: ['diffusion', 'condensation', 'freezing', 'magnetism'], a: 0, e: 'Mixing.' }, { q: 'Strongest attraction', o: ['solid', 'liquid', 'gas', 'none'], a: 0, e: 'Solid.' },
      { q: 'Sugar dissolving shows', o: ['spaces between particles', 'no particles', 'magnetism', 'heat'], a: 0, e: 'Spaces.' }, { q: 'Melting happens when', o: ['attraction is overcome', 'particles stop', 'cooling', 'pressure only'], a: 0, e: 'Heat.' },
      { q: 'Gas has', o: ['no fixed shape or volume', 'fixed shape', 'fixed volume', 'no motion'], a: 0, e: 'Free.' }
    ],
    teach: {
      outcomes: ['State particle model ideas', 'Explain diffusion', 'Compare states'],
      periods: [{ t: 'Particles', flow: [['10 min', 'Sugar in a full glass.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Ink in hot and cold water.']] }, { t: 'States', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Syringe compression demo.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Particles expand on heating.', 'Solid particles are still.'], activities: ['Diffusion race.', 'Student role-play of states.'],
      exit: ['Three particle ideas.', 'Diffusion example.', 'State table.'], homework: 'Find three examples of diffusion at home and explain them.'
    },
    slides: [{ t: 'Particulate Nature of Matter', b: ['Particles and spaces', 'Motion and attraction', 'Diffusion', 'States of matter'] }, { t: 'Think and share', b: ['Why does perfume spread?', 'Why can gases be compressed?'] }],
    fs: { groups: [['Particle ideas', [['Spaces', 'between particles'], ['Motion', 'always moving'], ['Attraction', 'hold together']]], ['States', [['Solid', 'fixed shape, vibrate'], ['Liquid', 'fixed volume, slide'], ['Gas', 'fill container, free']]], ['Heat', [['Effect', 'faster particles'], ['Diffusion', 'faster when hot']]]],
      ex: [['Perfume', 'gas diffusion'], ['Ink 90 s → 3× faster', '30 s']], rem: ['Particles move.', 'Heat speeds them.', 'Spaces grow solid → gas.'] }
  });
})();
