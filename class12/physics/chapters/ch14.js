/*
TOOL:    class12_physics_ch14
FAMILY:  CBSE_REVISION / Class 12 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 14 Semiconductor Electronics (energy bands, intrinsic and extrinsic semiconductors, p-n junction, diode, rectifiers, special diodes context) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 14, part: 'Part II', short: 'Semiconductors', title: 'Semiconductor Electronics: Materials, Devices and Simple Circuits',
    blurb: 'Classification of metals, semiconductors and insulators by conductivity and energy bands; intrinsic semiconductors (electrons and holes); extrinsic semiconductors — n-type (pentavalent dopant) and p-type (trivalent dopant); p-n junction formation (depletion layer, barrier potential); semiconductor diode in forward and reverse bias, I–V characteristics; diode as a rectifier — half-wave and full-wave, with filter capacitor.',
    revise: {
      oneLine: 'Band gap E_g: insulators > 3 eV, semiconductors < 3 eV (Si 1.1 eV, Ge 0.7 eV), metals overlap. Intrinsic: n_e = n_h = n_i. Doping with P/As/Sb (group 15) gives n-type (majority electrons); with B/Al/In (group 13) gives p-type (majority holes); n_e n_h = n_i². At a p-n junction, diffusion creates a depletion layer and barrier potential (Si ≈ 0.7 V, Ge ≈ 0.3 V). Forward bias narrows the barrier → large current after knee voltage; reverse bias widens it → tiny current until breakdown. Half-wave rectifier uses one diode (output frequency = input); full-wave (centre-tap or bridge) uses both halves (output frequency = 2 × input); a capacitor filter smooths the ripple.',
      sections: [
        { h: 'Charge neutrality', html: '<p>Doped semiconductor is still electrically neutral overall; donor ions are positive, acceptor ions negative.</p>' },
        { h: 'Temperature', html: '<p>Semiconductor resistance falls with temperature (more carriers); a metal’s rises.</p>' },
        { h: 'Ripple', html: '<p>Larger C or load resistance → smoother DC.</p>' }
      ],
      formulas: [['Mass action', 'n_e n_h = n_i²'], ['Si gap', '≈ 1.1 eV'], ['Barrier (Si)', '≈ 0.7 V'], ['Half-wave', 'f_out = f_in'], ['Full-wave', 'f_out = 2f_in']],
      terms: [['Hole', 'vacancy of electron behaving as + charge'], ['Depletion region', 'carrier-free zone at junction'], ['Knee voltage', 'forward voltage where current rises sharply']],
      traps: ['p-type is not positively charged.', 'Reverse current is due to minority carriers.', 'Full-wave ripple frequency is 100 Hz for 50 Hz mains.'],
      bridge: '<p>This completes the Class XII physics course.</p>'
    },
    explore: [
      { title: 'Rectifier', intro: 'Choose rectifier type and filter. <kbd>P</kbd> play.',
        build(el, K) { let k = 0, filt = 0; const row = K.row(el); K.select(row, 'type', ['half-wave', 'full-wave'], i => { k = i; }); K.select(row, 'filter capacitor', ['none', 'small', 'large'], i => { filt = i; }); const b = new K.Board(el, { xmin: -0.3, xmax: 12.3, ymin: -2.5, ymax: 2.5, axes: false, grid: 0, aspect: 0.33 }); const rd = K.read(el); const an = new K.Anim(Infinity, () => b.redraw(), { ms: 50 });
          b.onDraw = () => { b.clear(); b.line(0, 0, 12, 0, { color: C.grey, w: 1 }); const sh = an.i * 0.05; let pi = null, po = null, held = 0; const tau = [0, 1.2, 6][filt];
            for (let x = 0; x <= 12; x += 0.03) { const vin = 2 * Math.sin(x * 1.5 + sh); let raw = k === 0 ? Math.max(0, vin) : Math.abs(vin); let out = raw; if (filt) { held = Math.max(raw, held * Math.exp(-0.03 / tau)); out = held; } if (pi) { b.line(pi[0], pi[1], x, vin, { color: 'rgba(124,58,237,.35)', w: 1.5 }); b.line(po[0], po[1], x, out, { color: C.blue, w: 2.5 }); } pi = [x, vin]; po = [x, out]; }
            rd.innerHTML = `${k === 0 ? 'Half-wave: one diode, negative half blocked, ripple 50 Hz' : 'Full-wave (bridge/centre-tap): both halves used, ripple 100 Hz'} · filter: ${['none — pulsating DC', 'small C — some ripple', 'large C — nearly steady DC'][filt]} · purple: input, blue: output`; };
          K.anim(el, an); an.play(); return an; } },
      { title: 'Doping sorter', intro: 'Sort dopants and facts.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['n-type', 'p-type'], items: [['phosphorus', 0], ['arsenic', 0], ['antimony', 0], ['boron', 1], ['aluminium', 1], ['indium', 1], ['majority electrons', 0], ['majority holes', 1], ['pentavalent dopant', 0], ['trivalent dopant', 1]] }); } }
    ],
    gens: [
      { title: 'Carrier concentration', gen(R) { const ni = R.pick([1.5e16, 2.4e19]), ne = R.pick([1e21, 5e22, 4e20]); return { q: `n_i = ${ni.toExponential(1)} m⁻³; doped so n_e = ${ne.toExponential(0)} m⁻³. Hole concentration?`, a: `${(ni * ni / ne).toExponential(2)} m⁻³`, ans: ni * ni / ne, tol: ni * ni / ne * 1e-3 }; } },
      { title: 'Doping type', gen(R) { return G9.S9.groupQ(R, [['Si + phosphorus', 0], ['Si + boron', 1], ['Ge + arsenic', 0], ['Ge + indium', 1], ['Si + aluminium', 1]], ['n-type', 'p-type'], ''); } },
      { title: 'Rectifier frequency', gen(R) { const fq = R.pick([50, 60, 100]), k = R.pick([0, 1]); return { q: `Input ${fq} Hz to a ${k ? 'full' : 'half'}-wave rectifier. Output ripple frequency?`, a: `${k ? 2 * fq : fq} Hz`, ans: k ? 2 * fq : fq }; } },
      { title: 'Bias', gen(R) { return G9.S9.pickQ(R, [['Depletion layer in forward bias?', 'narrows'], ['Depletion layer in reverse bias?', 'widens'], ['Current in reverse bias is due to?', 'minority carriers'], ['Barrier potential of Si?', 'about 0.7 V']]); } },
      { title: 'Bands', levels: [2, 3], gen(R) { return G9.S9.groupQ(R, [['E_g = 6 eV (diamond)', 2], ['E_g = 1.1 eV', 1], ['bands overlap', 0], ['E_g = 0.7 eV', 1], ['copper', 0]], ['conductor', 'semiconductor', 'insulator'], ''); } }
    ],
    quiz: [
      { q: 'n-type dopant', o: ['phosphorus', 'boron', 'aluminium', 'indium'], a: 0, e: 'Pentavalent.' }, { q: 'Majority in p-type', o: ['holes', 'electrons', 'ions', 'protons'], a: 0, e: 'Acceptors.' },
      { q: 'n_e n_h =', o: ['n_i²', 'n_i', '1', '2n_i'], a: 0, e: 'Mass action.' }, { q: 'Si band gap', o: ['1.1 eV', '6 eV', '0 eV', '13.6 eV'], a: 0, e: 'Semiconductor.' },
      { q: 'Forward bias depletion', o: ['narrows', 'widens', 'same', 'vanishes always'], a: 0, e: 'Lower barrier.' }, { q: 'Full-wave ripple for 50 Hz', o: ['100 Hz', '50 Hz', '25 Hz', '0'], a: 0, e: 'Both halves.' },
      { q: 'Filter uses', o: ['capacitor', 'resistor only', 'transistor', 'fuse'], a: 0, e: 'Smoothing.' }, { q: 'p-type net charge', o: ['neutral', 'positive', 'negative', 'varies'], a: 0, e: 'Neutral.' },
      { q: 'Semiconductor R with T', o: ['decreases', 'increases', 'same', 'zero'], a: 0, e: 'More carriers.' }, { q: 'Barrier of Ge', o: ['≈ 0.3 V', '≈ 0.7 V', '≈ 5 V', '0'], a: 0, e: 'Smaller.' },
      { q: 'Reverse current due to', o: ['minority carriers', 'majority', 'ions', 'photons'], a: 0, e: 'Small.' }
    ],
    teach: {
      outcomes: ['Classify materials by band gap', 'Explain doping and p-n junction', 'Analyse rectifiers'],
      periods: [{ t: 'Materials', flow: [['10 min', 'Band diagrams.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Mass action problems.']] }, { t: 'Diode and rectifiers', flow: [['15 min', 'Diode I–V demo.'], ['15 min', 'Explore panel 1.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['p-type is positively charged.', 'Diode conducts at any forward voltage.'], activities: ['LED forward/reverse test.', 'Bridge rectifier on breadboard.'],
      exit: ['Dopant types.', 'Bias effects.', 'Rectifier frequency.'], homework: 'Draw half- and full-wave output waveforms with and without a filter.'
    },
    slides: [{ t: 'Semiconductor Electronics', b: ['Energy bands', 'Intrinsic and extrinsic', 'p-n junction diode', 'Rectifiers'] }, { t: 'Think and share', b: ['Why is silicon used in chips?', 'Why does a charger need a rectifier?'] }],
    fs: { groups: [['Materials', [['Insulator', 'E_g > 3 eV'], ['Semi', 'Si 1.1, Ge 0.7 eV'], ['Metal', 'overlap']]], ['Doping', [['n-type', 'P, As, Sb (electrons)'], ['p-type', 'B, Al, In (holes)'], ['Law', 'n_e n_h = n_i²']]], ['Diode', [['Forward', 'narrow, conducts'], ['Reverse', 'wide, tiny current'], ['Rectifier', 'HW f, FW 2f']]]],
      ex: [['n_i 1.5e16, n_e 1e21', 'n_h 2.25e11'], ['50 Hz FW', '100 Hz ripple']], rem: ['Neutral doped.', 'Si 0.7 V.', 'Filter C.'] }
  });
})();
