/*
TOOL:    class12_physics_ch13
FAMILY:  CBSE_REVISION / Class 12 Physics (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 13 Nuclei (composition and size, isotopes, mass-energy, mass defect, binding energy per nucleon curve, nuclear force, radioactivity basics, fission and fusion, reactors) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  const BE = A => A < 4 ? 1.1 * A : A < 56 ? 8.8 - 3.5 * Math.exp(-(A - 4) / 9) : 8.8 - (A - 56) * 0.0065;
  G9.register({
    no: 13, part: 'Part II', short: 'Nuclei', title: 'Nuclei',
    blurb: 'Atomic masses and composition of the nucleus (protons and neutrons; isotopes, isobars, isotones); size of the nucleus R = R₀A^(1/3) and constant nuclear density; mass–energy equivalence; mass defect and binding energy; binding energy per nucleon curve; properties of the nuclear force; radioactivity (α, β, γ basics); nuclear fission and fusion; nuclear reactors and energy in stars.',
    revise: {
      oneLine: 'Nucleus of mass number A has Z protons and N = A − Z neutrons; radius R = 1.2 A^(1/3) fm, so density is about 2.3 × 10¹⁷ kg/m³ for all nuclei. Mass defect Δm = [Zm_p + Nm_n] − M; binding energy E_b = Δm c² (1 u = 931.5 MeV). BE/A peaks near 8.75 MeV for iron-56: heavy nuclei release energy by fission, light ones by fusion. Nuclear force is strong, short range (a few fm), charge-independent and attractive (repulsive below ~0.8 fm). Fission: ²³⁵U + n → fragments + 2–3 n + ~200 MeV (chain reaction, controlled by moderators and control rods). Fusion powers the Sun (hydrogen → helium).',
      sections: [
        { h: 'Nuclide families', html: '<p>Isotopes: same Z (¹²C, ¹⁴C). Isobars: same A (³H, ³He). Isotones: same N.</p>' },
        { h: 'Reactor parts', html: '<p>Fuel (enriched U), moderator (heavy water/graphite slows neutrons), control rods (cadmium/boron absorb neutrons), coolant, shielding.</p>' },
        { h: 'Radioactivity', html: '<p>α: ⁴He nucleus (A −4, Z −2). β⁻: n → p + e⁻ + ν̄ (Z +1). γ: photon from excited nucleus (no change in A, Z).</p>' }
      ],
      formulas: [['Radius', 'R = R₀A^(1/3), R₀ ≈ 1.2 fm'], ['Mass defect', 'Δm = Zm_p + Nm_n − M'], ['Binding energy', 'Δm c²'], ['1 u', '931.5 MeV'], ['BE/A max', '≈ 8.75 MeV (Fe-56)']],
      terms: [['Mass defect', 'missing mass when nucleons bind'], ['Chain reaction', 'self-sustaining fission by released neutrons'], ['Moderator', 'slows fast neutrons']],
      traps: ['Nuclear density is independent of A.', 'Greater BE/A means more stable.', 'Fusion needs very high temperature to overcome repulsion.'],
      bridge: '<p>Ch 14 returns to electrons — in semiconductors.</p>'
    },
    explore: [
      { title: 'Binding energy curve', intro: 'Move along A; see BE per nucleon and which process releases energy.',
        build(el, K) { let A = 56; const row = K.row(el); K.slider(row, 'mass number A', 2, 240, 1, A, v => { A = v; b.redraw(); }); const b = new K.Board(el, { xmin: -10, xmax: 250, ymin: -10, ymax: 105, axes: false, grid: 0, aspect: 0.4 }); const rd = K.read(el);
          b.onDraw = () => { b.clear(); b.line(0, 0, 245, 0, { color: C.ink, w: 1 }); b.line(0, 0, 0, 100, { color: C.ink, w: 1 }); let p = null; for (let a = 2; a <= 240; a += 1) { const y = BE(a) * 10; if (p) b.line(p[0], p[1], a, y, { color: C.blue, w: 2.5 }); p = [a, y]; } b.dot(A, BE(A) * 10, { color: C.orange, r: 6 }); b.text(40, 98, 'BE/A (MeV) vs A', { font: '12px' }); b.text(56, 80, 'Fe-56', { font: '11px' });
            rd.innerHTML = `A = ${A} · BE/A ≈ <b>${f(BE(A))} MeV</b> · ${A < 40 ? 'light: <b>fusion</b> releases energy' : A > 100 ? 'heavy: <b>fission</b> releases energy' : 'middle: most stable region'} · nuclear radius ≈ ${f(1.2 * Math.cbrt(A))} fm`; };
          b.redraw(); return null; } },
      { title: 'Binding energy calculator', intro: 'Z, N and measured nuclear mass.',
        build(el, K) { const Nn = [['²H', 1, 1, 2.014102], ['⁴He', 2, 2, 4.002603], ['¹²C', 6, 6, 12.0], ['¹⁶O', 8, 8, 15.994915], ['⁵⁶Fe', 26, 30, 55.934939]]; let k = 1; const row = K.row(el); K.select(row, 'nucleus (atomic mass)', Nn.map(x => x[0]), i => { k = i; draw(); }).value = 1; const rd = K.read(el);
          function draw() { const [nm, Z, N, M] = Nn[k], dm = Z * 1.007825 + N * 1.008665 - M, Eb = dm * 931.5; rd.innerHTML = `${nm}: Z = ${Z}, N = ${N} · Δm = ${Z}(1.007825) + ${N}(1.008665) − ${M} = <b>${f(dm)} u</b> · E_b = <b>${f(Eb)} MeV</b> · per nucleon <b>${f(Eb / (Z + N))} MeV</b>`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Radius', gen(R) { const A = R.pick([8, 27, 64, 125, 216]); return { q: `Radius of nucleus with A = ${A} (R₀ = 1.2 fm)?`, a: `${f(1.2 * Math.cbrt(A))} fm`, ans: 1.2 * Math.cbrt(A), tol: 1e-3 }; } },
      { title: 'Energy from mass', gen(R) { const dm = R.pick([0.001, 0.0304, 0.1, 0.5]); return { q: `Energy equivalent of ${dm} u?`, a: `${f(dm * 931.5)} MeV`, ans: dm * 931.5, tol: 1e-3 }; } },
      { title: 'Composition', gen(R) { const n = R.pick([['uranium-235', 92, 235], ['iron-56', 26, 56], ['carbon-14', 6, 14], ['gold-197', 79, 197]]); return { q: `Protons and neutrons in ${n[0]} (Z = ${n[1]})?`, a: `${n[1]} p, ${n[2] - n[1]} n`, ans: n[2] - n[1] }; } },
      { title: 'Family', gen(R) { return G9.S9.groupQ(R, [['¹²C and ¹⁴C', 0], ['³H and ³He', 1], ['¹H and ²H', 0], ['⁴⁰Ar and ⁴⁰Ca', 1], ['¹⁴C and ¹⁶O (N = 8)', 2]], ['isotopes', 'isobars', 'isotones'], 'Pair '); } },
      { title: 'Concepts', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Role of moderator?', 'slows down fast neutrons'], ['Role of control rods?', 'absorb neutrons to control chain reaction'], ['Source of the Sun’s energy?', 'fusion of hydrogen into helium'], ['Which nucleus is most stable?', 'iron-56 (highest BE/A)']]); } }
    ],
    quiz: [
      { q: 'R ∝', o: ['A^(1/3)', 'A', 'A²', '1/A'], a: 0, e: 'Size.' }, { q: '1 u =', o: ['931.5 MeV', '1 MeV', '13.6 eV', '200 MeV'], a: 0, e: 'Mass-energy.' },
      { q: 'Highest BE/A', o: ['Fe-56', 'U-235', 'He-4', 'H-2'], a: 0, e: 'Peak.' }, { q: 'Isotopes have same', o: ['Z', 'A', 'N', 'mass'], a: 0, e: 'Protons.' },
      { q: 'Nuclear force range', o: ['few fm', 'infinite', '1 m', 'atom size'], a: 0, e: 'Short.' }, { q: 'Fission energy per U-235', o: ['~200 MeV', '~2 MeV', '~13.6 eV', '~1 GeV'], a: 0, e: 'Large.' },
      { q: 'Moderator', o: ['heavy water', 'cadmium', 'lead', 'uranium'], a: 0, e: 'Slows.' }, { q: 'Control rods', o: ['cadmium/boron', 'graphite', 'water', 'steel only'], a: 0, e: 'Absorb.' },
      { q: 'Sun’s energy', o: ['fusion', 'fission', 'chemical', 'radioactive decay'], a: 0, e: 'H → He.' }, { q: 'Nuclear density', o: ['same for all nuclei', '∝ A', '∝ 1/A', 'zero'], a: 0, e: 'Constant.' },
      { q: 'α decay changes A by', o: ['−4', '−2', '+1', '0'], a: 0, e: 'He nucleus.' }
    ],
    teach: {
      outcomes: ['Describe nuclear composition and size', 'Compute mass defect and binding energy', 'Explain fission and fusion'],
      periods: [{ t: 'Nucleus and BE', flow: [['10 min', 'Density comparison.'], ['15 min', 'Explore panel 2.'], ['15 min', 'BE problems.']] }, { t: 'Fission and fusion', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Reactor diagram.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Mass is always conserved.', 'Bigger nuclei are more stable.'], activities: ['Domino chain reaction.', 'BE/A graph plotting.'],
      exit: ['R formula.', 'Δm c².', 'Fission vs fusion.'], homework: 'Calculate BE/A of He-4 and compare with H-2.'
    },
    slides: [{ t: 'Nuclei', b: ['Composition and size', 'Mass defect, binding energy', 'BE/A curve', 'Fission, fusion, reactors'] }, { t: 'Think and share', b: ['Why do both fission and fusion release energy?', 'Why is the nuclear force short range?'] }],
    fs: { groups: [['Nucleus', [['R', '1.2 A^(1/3) fm'], ['N', 'A − Z'], ['Density', '≈ 2.3 × 10¹⁷ kg/m³']]], ['Energy', [['Δm', 'Zm_p + Nm_n − M'], ['E_b', 'Δm × 931.5 MeV'], ['Peak', 'Fe-56, 8.75 MeV']]], ['Reactions', [['Fission', 'heavy splits, ~200 MeV'], ['Fusion', 'light joins (Sun)'], ['Reactor', 'moderator, control rods']]]],
      ex: [['A 64', 'R 4.8 fm'], ['He-4', 'E_b ≈ 28.3 MeV']], rem: ['Density constant.', 'BE/A peak.', 'u = 931.5 MeV.'] }
  });
})();
