/*
TOOL:    class9_science_ch10
FAMILY:  CBSE_REVISION / Class 9 Science (Exploration)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 10 Sound Waves: Characteristics and Applications (vibrations, longitudinal waves, compressions and rarefactions, frequency, wavelength, amplitude, v = fλ, pitch, loudness, echo, ultrasound, SONAR, human ear) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toFixed(3)).toString();
  G9.register({
    no: 10, part: 'All chapters', short: 'Sound', title: 'Sound Waves: Characteristics and Applications',
    blurb: 'Sound produced by vibrations and carried as longitudinal waves (compressions and rarefactions) through a medium; wavelength, frequency, time period, amplitude and speed (v = fλ); pitch, loudness and quality; speed in different media; reflection — echo and reverberation; audible range, infrasound and ultrasound; SONAR; and the human ear.',
    revise: {
      oneLine: 'Sound is a mechanical, longitudinal wave needing a medium. v = f λ; T = 1/f. Frequency sets pitch; amplitude sets loudness. Sound travels faster in solids than liquids than gases (≈ 343 m/s in air at 20 °C, ≈ 1500 m/s in water, ≈ 5000 m/s in steel). An echo is heard if the reflecting surface is at least ≈ 17 m away (0.1 s persistence). Humans hear 20 Hz – 20 kHz; ultrasound (> 20 kHz) is used in SONAR and medical scans: depth d = v t / 2.',
      sections: [
        { h: 'Wave terms', html: `<p>Wavelength λ: distance between two compressions. Frequency f: oscillations per second (Hz). Amplitude: maximum disturbance. Speed v = distance per second.</p>` },
        { h: 'Reflection', html: `<p>Echo needs ≥ 0.1 s delay → 2d ≥ 343 × 0.1 → d ≥ 17.2 m. Reverberation (multiple reflections) is reduced in halls by soft panels and curtains.</p>` },
        { h: 'Uses of ultrasound', html: `<p>SONAR for ocean depth and submarines, ultrasonography of foetus and organs, cleaning delicate parts, detecting cracks in metal. Bats and dolphins use echolocation.</p>` }
      ],
      formulas: [['Speed', 'v = f λ'], ['Period', 'T = 1 / f'], ['Echo distance', 'd = v t / 2'], ['Audible', '20 Hz – 20 kHz'], ['Air (20 °C)', '≈ 343 m/s']],
      terms: [['Longitudinal wave', 'particles vibrate along the direction of travel'], ['Pitch', 'how high or low a sound is — depends on frequency'], ['Ultrasound', 'frequency above 20 kHz']],
      traps: ['Sound cannot travel through vacuum.', 'In echo problems, the sound travels to and fro — divide by 2.', 'Loudness depends on amplitude, not frequency.'],
      bridge: '<p>Class 11 Physics: waves in depth.</p>'
    },
    explore: [
      { title: 'Wave maker', intro: 'Change frequency and amplitude; see the wave and its wavelength in air (343 m/s).',
        build(el, K) { let fr = 440, A = 1; const row = K.row(el); K.slider(row, 'frequency (Hz)', 100, 2000, 10, fr, v => { fr = v; }); K.slider(row, 'amplitude', 0.2, 1.5, 0.1, A, v => { A = v; }); const b = new K.Board(el, { xmin: 0, xmax: 10, ymin: -2, ymax: 2, axes: false, grid: 0, aspect: 0.4 }); const rd = K.read(el); const an = new K.Anim(Infinity, () => b.redraw(), { ms: 40 });
          b.onDraw = () => { b.clear(); b.line(0, 0, 10, 0, { color: C.grey, w: 1, dash: [4, 4] }); const k = fr / 200; const ph = an.i * 0.2; let px = 0, py = A * Math.sin(-ph); for (let x = 0.05; x <= 10; x += 0.05) { const y = A * Math.sin(k * x * Math.PI / 2 * 2 - ph); b.line(px, py, x, y, { color: C.blue, w: 2.5 }); px = x; py = y; }
            const lam = 343 / fr; rd.innerHTML = `f = ${fr} Hz → λ = v/f = 343/${fr} = <b>${f(lam)} m</b> · T = 1/f = <b>${f(1000 / fr)} ms</b> · higher f → higher pitch; bigger amplitude → louder`; };
          K.anim(el, an); an.play(); return an; } },
      { title: 'SONAR depth finder', intro: 'Set the echo time; find the depth of the sea bed (v in sea water ≈ 1500 m/s).',
        build(el, K) { let t = 2; const row = K.row(el); K.slider(row, 'echo time (s)', 0.2, 8, 0.1, t, v => { t = v; b.redraw(); }); const b = new K.Board(el, { xmin: -1, xmax: 9, ymin: -6.5, ymax: 1, axes: false, grid: 0, aspect: 0.5 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const d = 1500 * t / 2; const yb = -Math.min(6, d / 1000); b.rect(-1, yb, 10, -yb, { fill: 'rgba(59,130,246,.2)', color: 'none' }); b.rect(-1, yb - 0.5, 10, 0.5, { fill: '#d6a46b', color: 'none' }); b.rect(3, 0, 2, 0.5, { fill: C.ink, color: C.ink }); b.arrow(3.6, 0, 3.6, yb, { color: C.orange, w: 2 }); b.arrow(4.4, yb, 4.4, 0, { color: C.purple, w: 2 });
            rd.innerHTML = `depth = v × t ÷ 2 = 1500 × ${t.toFixed(1)} ÷ 2 = <b>${f(d)} m</b> (divide by 2: down and back)`; };
          b.redraw(); return null; } }
    ],
    gens: [
      { title: 'v = fλ', gen(R) { const fr = R.pick([170, 340, 500, 680, 1000]), v = 340; return R.chance(.5) ? { q: `Sound at ${fr} Hz in air (340 m/s). Wavelength?`, a: `${f(v / fr)} m`, ans: v / fr, tol: 1e-4 } : { q: `A wave has wavelength ${f(v / fr)} m and speed 340 m/s. Frequency?`, a: `${fr} Hz`, ans: fr, tol: 0.5 }; } },
      { title: 'Echo', gen(R) { const t = R.int(2, 10) / 2; return { q: `An echo is heard ${t} s after a shout (v = 340 m/s). Distance to the cliff?`, a: `${340 * t / 2} m`, ans: 340 * t / 2 }; } },
      { title: 'SONAR', gen(R) { const t = R.int(1, 8); return { q: `SONAR echo returns in ${t} s (v = 1500 m/s). Depth?`, a: `${1500 * t / 2} m`, ans: 1500 * t / 2 }; } },
      { title: 'Period', levels: [2, 3], gen(R) { const fr = R.pick([50, 100, 200, 250, 500, 1000]); return { q: `Time period of a ${fr} Hz sound (in ms)?`, a: `${1000 / fr} ms`, ans: 1000 / fr }; } },
      { title: 'Concepts', gen(R) { return G9.S9.pickQ(R, [['Why can’t sound travel in space?', 'no medium (vacuum)'], ['What decides pitch?', 'frequency'], ['What decides loudness?', 'amplitude'], ['Minimum distance for an echo in air?', 'about 17 m']]); } }
    ],
    quiz: [
      { q: 'Sound waves in air are', o: ['longitudinal', 'transverse', 'electromagnetic', 'still'], a: 0, e: 'Compressions.' }, { q: 'v =', o: ['f λ', 'f/λ', 'λ/f', 'f + λ'], a: 0, e: 'Wave equation.' },
      { q: 'Pitch depends on', o: ['frequency', 'amplitude', 'speed', 'medium only'], a: 0, e: 'High/low.' }, { q: 'Fastest in', o: ['steel', 'air', 'water', 'vacuum'], a: 0, e: 'Solids.' },
      { q: 'Human audible range', o: ['20 Hz – 20 kHz', '0–20 Hz', '20–200 kHz', 'all'], a: 0, e: 'Range.' }, { q: 'Ultrasound is', o: ['> 20 kHz', '< 20 Hz', '1 kHz', 'light'], a: 0, e: 'Above.' },
      { q: 'Sound in vacuum', o: ['cannot travel', 'fastest', 'slow', 'echoes'], a: 0, e: 'Medium needed.' }, { q: 'Echo time 2 s, v 340', o: ['340 m', '680 m', '170 m', '1360 m'], a: 0, e: '340 × 2 / 2.' },
      { q: 'Loudness depends on', o: ['amplitude', 'frequency', 'wavelength only', 'colour'], a: 0, e: 'Energy.' }, { q: 'T for 100 Hz', o: ['0.01 s', '100 s', '0.1 s', '1 s'], a: 0, e: '1/100.' },
      { q: 'Bats use', o: ['echolocation', 'light', 'magnetism', 'smell only'], a: 0, e: 'Ultrasound.' }
    ],
    teach: {
      outcomes: ['Describe sound as a longitudinal wave', 'Use v = fλ and echo formula', 'List uses of ultrasound'],
      periods: [{ t: 'Waves', flow: [['10 min', 'Slinky compressions.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Tuning fork in water.']] }, { t: 'Reflection', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Measure speed of sound by echo (clap method).'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Sound travels in vacuum.', 'Echo distance = v t.'], activities: ['Slinky wave.', 'Clap-echo speed estimate.'],
      exit: ['v = fλ problem.', 'Echo problem.', 'Two ultrasound uses.'], homework: 'Find frequencies of three musical notes and their wavelengths in air.'
    },
    slides: [{ t: 'Sound Waves', b: ['Longitudinal waves', 'f, λ, A, v', 'Echo and reverberation', 'Ultrasound and SONAR'] }, { t: 'Think and share', b: ['Why can’t astronauts talk directly in space?', 'Why divide by 2 in SONAR?'] }],
    fs: { groups: [['Wave', [['v', 'f λ'], ['T', '1/f'], ['Pitch', 'frequency'], ['Loudness', 'amplitude']]], ['Speed', [['Air', '≈ 343 m/s'], ['Water', '≈ 1500 m/s'], ['Steel', '≈ 5000 m/s']]], ['Reflection', [['Echo', 'd = vt/2, ≥ 17 m'], ['SONAR', 'ultrasound depth'], ['Range', '20 Hz – 20 kHz']]]],
      ex: [['340 Hz, 340 m/s', 'λ = 1 m'], ['SONAR 4 s', '3000 m']], rem: ['Medium needed.', 'Halve the echo path.', 'Pitch ≠ loudness.'] }
  });
})();
