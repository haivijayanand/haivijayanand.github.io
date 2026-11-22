/*
TOOL:    class11_chemistry_ch03
FAMILY:  CBSE_REVISION / Class 11 Chemistry (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Unit 3 Classification of Elements and Periodicity in Properties (history, modern periodic law, IUPAC naming of new elements, s p d f blocks, periodic trends: atomic radius, ionic radius, ionisation enthalpy, electron gain enthalpy, electronegativity, valence, reactivity) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const ROOT = ['nil', 'un', 'bi', 'tri', 'quad', 'pent', 'hex', 'sept', 'oct', 'enn'];
  const SYMR = ['n', 'u', 'b', 't', 'q', 'p', 'h', 's', 'o', 'e'];
  const IE = [['Li', 520], ['Be', 899], ['B', 801], ['C', 1086], ['N', 1402], ['O', 1314], ['F', 1681], ['Ne', 2080], ['Na', 496]];
  G9.register({
    no: 3, part: 'Part I', short: 'Periodicity', title: 'Classification of Elements and Periodicity in Properties',
    blurb: 'Why classify; Döbereiner, Newlands, Mendeleev; modern periodic law (atomic number); the long form table; IUPAC names for elements with Z > 100; s, p, d, f blocks; metals, non-metals, metalloids; periodic trends in atomic and ionic radii, ionisation enthalpy, electron gain enthalpy, electronegativity, valence and chemical reactivity; diagonal relationship.',
    revise: {
      oneLine: 'Properties are periodic functions of atomic number. Across a period (left → right): atomic radius decreases, ionisation enthalpy and electronegativity generally increase, electron gain enthalpy becomes more negative. Down a group: radius increases, ionisation enthalpy and electronegativity decrease. Exceptions: IE of Be > B and N > O (stable filled/half-filled subshells); electron gain enthalpy of F is less negative than Cl (small, crowded 2p).',
      sections: [
        { h: 'Blocks', html: `<p>s-block (groups 1–2, reactive metals), p-block (13–18, includes non-metals and noble gases), d-block (3–12, transition metals), f-block (lanthanoids, actinoids).</p>` },
        { h: 'IUPAC names', html: `<p>Digits → roots: 0 nil, 1 un, 2 bi, 3 tri, 4 quad, 5 pent, 6 hex, 7 sept, 8 oct, 9 enn + “ium”. Z = 120: unbinilium (Ubn).</p>` },
        { h: 'Ions', html: `<p>Cations are smaller than parent atoms; anions larger. Isoelectronic species: more protons → smaller (O²⁻ > F⁻ > Na⁺ > Mg²⁺).</p>` }
      ],
      formulas: [['Period trend', 'radius ↓, IE ↑, EN ↑'], ['Group trend', 'radius ↑, IE ↓, EN ↓'], ['Anomalies', 'IE: Be > B, N > O'], ['EGE', 'Cl more negative than F'], ['Isoelectronic', 'more Z → smaller']],
      terms: [['Ionisation enthalpy', 'energy to remove an outer electron from a gaseous atom'], ['Electron gain enthalpy', 'enthalpy change when a gaseous atom gains an electron'], ['Electronegativity', 'tendency to attract shared electrons']],
      traps: ['Noble gases have positive electron gain enthalpy.', 'Electronegativity is not measured energy; it is a relative scale (Pauling).', 'Diagonal pairs: Li–Mg, Be–Al, B–Si.'],
      bridge: '<p>Unit 4 uses these trends to explain bonding.</p>'
    },
    explore: [
      { title: 'IUPAC name maker', intro: 'Choose an atomic number above 100.',
        build(el, K) { let z = 118; const row = K.row(el); K.slider(row, 'Z', 101, 130, 1, z, v => { z = v; draw(); }); const rd = K.read(el);
          function draw() { const d = String(z).split('').map(Number); let nm = d.map(x => ROOT[x]).join(''); nm = nm.replace('enni', 'eni').replace(/(bi|tri)ium$/, '$1um') ; nm = (nm.endsWith('i') ? nm + 'um' : nm + 'ium').replace('iium', 'ium'); const sym = d.map(x => SYMR[x]).join(''); rd.innerHTML = `Z = ${z} → <b>${nm}</b>, symbol <b>${sym[0].toUpperCase() + sym.slice(1)}</b>`; } draw(); return null; } },
      { title: 'Ionisation enthalpy across period 2', intro: 'First IE (kJ/mol) — note the dips at B and O.',
        build(el, K) { const b = new K.Board(el, { xmin: -0.5, xmax: 9, ymin: -0.4, ymax: 2.4, axes: false, grid: 0, aspect: 0.45 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.line(0, 0, 8.8, 0, { color: C.ink, w: 1 }); let p = null; IE.forEach((e, i) => { const y = e[1] / 1000; if (p) b.line(p[0], p[1], i, y, { color: C.blue, w: 2 }); b.dot(i, y, { r: 6, color: e[0] === 'B' || e[0] === 'O' ? C.orange : C.blue }); b.text(i, -0.2, e[0], { font: 'bold 12px' }); b.text(i, y + 0.15, String(e[1]), { font: '10px' }); p = [i, y]; }); };
          rd.innerHTML = 'IE rises across the period (more nuclear charge, same shell). <b>B &lt; Be</b>: 2p electron is easier to remove than 2s. <b>O &lt; N</b>: paired 2p electron repels. Na drops sharply — new shell.'; b.redraw(); return null; } }
    ],
    gens: [
      { title: 'Trend', gen(R) { return G9.S9.pickQ(R, [['Larger atom: Na or Cl?', 'Na (same period, left side)'], ['Higher IE: N or O?', 'N (half-filled 2p)'], ['More negative electron gain enthalpy: F or Cl?', 'Cl'], ['Most electronegative element?', 'fluorine'], ['Larger: Na⁺ or Na?', 'Na (cation is smaller)'], ['Higher IE: Be or B?', 'Be']]); } },
      { title: 'IUPAC', gen(R) { const z = R.pick([104, 106, 110, 113, 117, 118, 120]); const d = String(z).split('').map(Number); let nm = d.map(x => ROOT[x]).join(''); nm = nm.replace('enni', 'eni'); nm = nm.endsWith('i') ? nm + 'um' : nm + 'ium'; return { q: `IUPAC temporary name for Z = ${z}?`, a: nm.replace('iium', 'ium') }; } },
      { title: 'Block', gen(R) { const E = [['Na (11)', 's'], ['Fe (26)', 'd'], ['Cl (17)', 'p'], ['Ca (20)', 's'], ['Br (35)', 'p'], ['Cu (29)', 'd'], ['Ce (58)', 'f'], ['Ne (10)', 'p']]; const e = R.pick(E); return { q: `Which block is ${e[0]} in?`, a: `${e[1]}-block` }; } },
      { title: 'Isoelectronic order', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Order by size: Na⁺, F⁻, O²⁻, Mg²⁺', 'O²⁻ > F⁻ > Na⁺ > Mg²⁺'], ['Order by size: K⁺, Cl⁻, S²⁻, Ca²⁺', 'S²⁻ > Cl⁻ > K⁺ > Ca²⁺'], ['Why is Mg²⁺ smaller than Na⁺?', 'more protons for the same 10 electrons'], ['Isoelectronic species have the same?', 'number of electrons']]); } },
      { title: 'Position from Z', levels: [2, 3], gen(R) { const P = [[11, 3, 1], [17, 3, 17], [20, 4, 2], [26, 4, 8], [35, 4, 17], [8, 2, 16], [13, 3, 13]]; const p = R.pick(P); return { q: `Period and group of the element with Z = ${p[0]}?`, a: `period ${p[1]}, group ${p[2]}`, ans: p[1] }; } }
    ],
    quiz: [
      { q: 'Modern periodic law based on', o: ['atomic number', 'atomic mass', 'density', 'valency'], a: 0, e: 'Moseley.' }, { q: 'Across a period radius', o: ['decreases', 'increases', 'same', 'random'], a: 0, e: 'Zeff ↑.' },
      { q: 'Most electronegative', o: ['F', 'Cl', 'O', 'N'], a: 0, e: 'Pauling 4.0.' }, { q: 'Most negative EGE', o: ['Cl', 'F', 'O', 'Br'], a: 0, e: 'F crowded.' },
      { q: 'IE: N vs O', o: ['N > O', 'O > N', 'equal', 'none'], a: 0, e: 'Half-filled.' }, { q: 'Z = 118 name', o: ['ununoctium', 'unnilunium', 'ununennium', 'biunoctium'], a: 0, e: '1-1-8.' },
      { q: 'd-block groups', o: ['3–12', '1–2', '13–18', 'f'], a: 0, e: 'Transition.' }, { q: 'Diagonal pair', o: ['Li–Mg', 'Li–Na', 'Be–Mg', 'B–Al'], a: 0, e: 'Similar.' },
      { q: 'Largest ion', o: ['O²⁻', 'F⁻', 'Na⁺', 'Mg²⁺'], a: 0, e: 'Isoelectronic.' }, { q: 'Down a group IE', o: ['decreases', 'increases', 'same', 'zero'], a: 0, e: 'Shielding.' },
      { q: 'Noble gas EGE', o: ['positive', 'very negative', 'zero always', 'undefined'], a: 0, e: 'Full shell.' }
    ],
    teach: {
      outcomes: ['Explain the modern periodic law', 'Predict trends and exceptions', 'Name new elements'],
      periods: [{ t: 'Table', flow: [['10 min', 'History timeline.'], ['15 min', 'Block colouring.'], ['15 min', 'Explore panel 1.']] }, { t: 'Trends', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Trend arrows on blank table.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Mass decides position.', 'F has most negative EGE.'], activities: ['Periodic trend graphs.', 'Element cards.'],
      exit: ['Three trends.', 'Two exceptions.', 'Name Z = 115.'], homework: 'Plot atomic radius vs Z for Z = 1–20 and describe the pattern.'
    },
    slides: [{ t: 'Periodicity', b: ['Modern periodic law', 'Blocks', 'Trends', 'Exceptions and diagonal relationship'] }, { t: 'Think and share', b: ['Why is IE of B < Be?', 'Why is Cl’s EGE more negative than F’s?'] }],
    fs: { groups: [['Table', [['Law', 'atomic number'], ['Blocks', 's, p, d, f'], ['IUPAC', 'nil un bi tri…ium']]], ['Trends', [['Across', 'r ↓, IE ↑, EN ↑'], ['Down', 'r ↑, IE ↓, EN ↓'], ['Ions', 'cation smaller, anion larger']]], ['Exceptions', [['IE', 'Be > B, N > O'], ['EGE', 'Cl > F'], ['Diagonal', 'Li–Mg, Be–Al, B–Si']]]],
      ex: [['Z 114', 'ununquadium (Uuq)'], ['O²⁻ F⁻ Na⁺ Mg²⁺', 'decreasing size']], rem: ['Atomic number rules.', 'Know the exceptions.', 'Isoelectronic: Z decides.'] }
  });
})();
