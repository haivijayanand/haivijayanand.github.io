/*
TOOL:    class9_science_ch08
FAMILY:  CBSE_REVISION / Class 9 Science (Exploration)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 8 Journey Inside the Atom (electron, proton, neutron; Thomson, Rutherford, Bohr models; atomic number, mass number, electron configuration, valency, isotopes, isobars) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const EL = [['H', 1, 1], ['He', 2, 4], ['Li', 3, 7], ['Be', 4, 9], ['B', 5, 11], ['C', 6, 12], ['N', 7, 14], ['O', 8, 16], ['F', 9, 19], ['Ne', 10, 20], ['Na', 11, 23], ['Mg', 12, 24], ['Al', 13, 27], ['Si', 14, 28], ['P', 15, 31], ['S', 16, 32], ['Cl', 17, 35], ['Ar', 18, 40], ['K', 19, 39], ['Ca', 20, 40]];
  const shells = z => { const c = [2, 8, 8, 2]; const r = []; for (const cap of c) { if (z <= 0) break; r.push(Math.min(cap, z)); z -= cap; } return r; };
  const val = z => { const s = shells(z); const o = s[s.length - 1]; const full = s.length === 1 ? 2 : 8; return o === full ? 0 : o <= 4 ? o : full - o; };
  G9.register({
    no: 8, part: 'All chapters', short: 'Inside the atom', title: 'Journey Inside the Atom',
    blurb: 'Discovery of electrons (J.J. Thomson), protons (Goldstein) and neutrons (Chadwick); Thomson’s, Rutherford’s and Bohr’s models; atomic number and mass number; distribution of electrons in shells (2, 8, 8); valence electrons and valency; isotopes and isobars and their uses.',
    revise: {
      oneLine: 'An atom has a tiny, dense, positive nucleus (protons + neutrons) with electrons in shells around it. Atomic number Z = number of protons (= electrons in a neutral atom); mass number A = protons + neutrons. Shells K, L, M hold up to 2, 8, 8 (for the first 20 elements); the outermost electrons decide valency. Isotopes: same Z, different A (¹²C, ¹⁴C); isobars: same A, different Z (⁴⁰Ar, ⁴⁰Ca).',
      sections: [
        { h: 'Models', html: `<p>Thomson: plum pudding. Rutherford’s gold foil: most α-particles passed through, a few bounced back → small dense nucleus, mostly empty space. Bohr: electrons in fixed energy shells without radiating.</p>` },
        { h: 'Valency', html: `<p>Outer electrons 1–3 → valency = that number (tend to lose); 5–7 → 8 − number (tend to gain); full shell → 0 (noble gases).</p>` },
        { h: 'Isotope uses', html: `<p>Uranium-235 in nuclear reactors, cobalt-60 for cancer treatment, iodine-131 for goitre, carbon-14 for dating.</p>` }
      ],
      formulas: [['Z', 'protons'], ['A', 'protons + neutrons'], ['Neutrons', 'A − Z'], ['Shells', '2, 8, 8'], ['Valency', 'outer e⁻ or 8 − outer']],
      terms: [['Isotopes', 'same Z, different A'], ['Isobars', 'same A, different Z'], ['Valence electrons', 'electrons in the outermost shell']],
      traps: ['Electrons have negligible mass, so A counts only protons and neutrons.', 'Isotopes have the same chemical properties.', 'Hydrogen-1 has no neutron.'],
      bridge: '<p>Class 10 periodic classification; Class 11 structure of atom in depth.</p>'
    },
    explore: [
      { title: 'Bohr model builder', intro: 'Choose an element; see protons, neutrons, electron shells and valency.',
        build(el, K) { let k = 5; const row = K.row(el); const s = K.select(row, 'element', EL.map(e => `${e[0]} (Z = ${e[1]})`), i => { k = i; b.redraw(); }); s.value = 5; const b = new K.Board(el, { xmin: -5, xmax: 5, ymin: -4, ymax: 4, axes: false, grid: 0, aspect: 0.6 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); const [sym, Z, A] = EL[k]; const sh = shells(Z); b.circle(0, 0, 0.6, { fill: C.orange, color: C.ink }); b.text(0, 0.15, `${Z}p`, { font: 'bold 11px', color: '#fff' }); b.text(0, -0.2, `${A - Z}n`, { font: 'bold 11px', color: '#fff' }); sh.forEach((n, i) => { const r = 1.2 + i * 0.9; b.circle(0, 0, r, { color: C.grey, w: 1 }); for (let j = 0; j < n; j++) { const t = 2 * Math.PI * j / n + i * 0.3; b.dot(r * Math.cos(t), r * Math.sin(t), { r: 5, color: C.blue }); } });
            rd.innerHTML = `<b>${sym}</b>: Z = ${Z}, A = ${A} → ${Z} protons, ${A - Z} neutrons, ${Z} electrons · configuration <b>${sh.join(', ')}</b> · valence electrons ${sh[sh.length - 1]} · valency <b>${val(Z)}</b>`; };
          b.redraw(); return null; } },
      { title: 'Rutherford’s gold foil', intro: '<kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Set-up', 'Fast α-particles (positive) fired at very thin gold foil.'], ['Most pass straight', 'Most of the atom is empty space.'], ['Some deflect', 'Positive charge is concentrated — repels α-particles passing close.'], ['A few bounce back', 'The nucleus is tiny, dense and positive (about 1/100 000 of the atom’s size).'], ['Limitation', 'Orbiting electrons should lose energy and spiral in — Bohr’s fixed shells fixed this.']] }); } }
    ],
    gens: [
      { title: 'Particles', gen(R) { const e = R.pick(EL); return { q: `${e[0]} has Z = ${e[1]}, A = ${e[2]}. Protons, neutrons, electrons?`, a: `${e[1]} p, ${e[2] - e[1]} n, ${e[1]} e⁻`, ans: e[2] - e[1] }; } },
      { title: 'Configuration', gen(R) { const e = R.pick(EL); return { q: `Electron configuration of ${e[0]} (Z = ${e[1]})?`, a: shells(e[1]).join(', ') }; } },
      { title: 'Valency', gen(R) { const e = R.pick(EL); return { q: `Valency of ${e[0]} (Z = ${e[1]})?`, a: String(val(e[1])), ans: val(e[1]) }; } },
      { title: 'Isotope or isobar', levels: [2, 3], gen(R) { return G9.S9.groupQ(R, [['¹²C and ¹⁴C', 0], ['⁴⁰Ar and ⁴⁰Ca', 1], ['³⁵Cl and ³⁷Cl', 0], ['¹H and ²H', 0], ['⁴⁰K and ⁴⁰Ca', 1]], ['isotopes', 'isobars'], 'Isotopes or isobars: '); } },
      { title: 'Average mass', levels: [2, 3], gen(R) { const p = R.pick([75, 80, 90]); const m = (35 * p + 37 * (100 - p)) / 100; return { q: `Chlorine: ${p}% ³⁵Cl and ${100 - p}% ³⁷Cl. Average atomic mass?`, a: `${+m.toFixed(2)} u`, ans: m, tol: 0.01 }; } }
    ],
    quiz: [
      { q: 'Electron discovered by', o: ['J.J. Thomson', 'Chadwick', 'Rutherford', 'Bohr'], a: 0, e: 'Cathode rays.' }, { q: 'Neutron discovered by', o: ['Chadwick', 'Thomson', 'Goldstein', 'Dalton'], a: 0, e: '1932.' },
      { q: 'Atomic number =', o: ['protons', 'neutrons', 'p + n', 'shells'], a: 0, e: 'Z.' }, { q: 'Na (Z = 11) config', o: ['2, 8, 1', '2, 9', '2, 8, 2', '8, 2, 1'], a: 0, e: 'Shells.' },
      { q: 'Valency of O (2, 6)', o: ['2', '6', '8', '0'], a: 0, e: '8 − 6.' }, { q: 'Isotopes have same', o: ['atomic number', 'mass number', 'neutrons', 'nothing'], a: 0, e: 'Z.' },
      { q: 'Gold foil showed', o: ['tiny dense nucleus', 'plum pudding', 'no electrons', 'atom solid'], a: 0, e: 'Rutherford.' }, { q: 'Neutrons in ²³Na (Z 11)', o: ['12', '11', '23', '34'], a: 0, e: '23 − 11.' },
      { q: 'Noble gas valency', o: ['0', '8', '1', '2'], a: 0, e: 'Full shell.' }, { q: 'Iodine-131 used for', o: ['goitre treatment', 'fuel', 'dating', 'food'], a: 0, e: 'Thyroid.' },
      { q: 'L shell holds max', o: ['8', '2', '18', '32'], a: 0, e: '2n².' }
    ],
    teach: {
      outcomes: ['Describe atomic models', 'Find p, n, e and configuration', 'Work out valency; identify isotopes/isobars'],
      periods: [{ t: 'Models', flow: [['10 min', 'Timeline of discoveries.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Marble-and-hidden-object analogy.']] }, { t: 'Structure', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Configuration chart for Z 1–20.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Electrons add to mass number.', 'Isotopes react differently.'], activities: ['Bohr model with beads.', 'Rutherford analogy.'],
      exit: ['p, n, e for an element.', 'Valency rule.', 'Isotope vs isobar.'], homework: 'Draw Bohr models of the first 10 elements with valency.'
    },
    slides: [{ t: 'Journey Inside the Atom', b: ['Subatomic particles', 'Thomson, Rutherford, Bohr', 'Z, A and shells', 'Valency, isotopes, isobars'] }, { t: 'Think and share', b: ['Why did a few α bounce back?', 'Why is neon unreactive?'] }],
    fs: { groups: [['Particles', [['Proton', '+1, in nucleus'], ['Neutron', '0, in nucleus'], ['Electron', '−1, shells']]], ['Numbers', [['Z', 'protons'], ['A', 'p + n'], ['n', 'A − Z'], ['Shells', '2, 8, 8']]], ['Variants', [['Isotopes', 'same Z'], ['Isobars', 'same A'], ['Valency', 'outer e⁻ or 8 − outer']]]],
      ex: [['Cl (17): 2, 8, 7', 'valency 1'], ['75% ³⁵Cl', '35.5 u']], rem: ['Nucleus tiny, dense.', 'Count shells 2, 8, 8.', 'Isotopes: same chemistry.'] }
  });
})();
