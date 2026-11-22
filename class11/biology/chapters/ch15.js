/*
TOOL:    class11_biology_ch15
FAMILY:  CBSE_REVISION / Class 11 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 15 Body Fluids and Circulation (blood composition, plasma, formed elements, blood groups ABO and Rh, coagulation, lymph, circulatory pathways, human heart, cardiac cycle, ECG, double circulation, regulation, disorders) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const BG = { A: ['A', 'anti-B', 'A, O', 'A, AB'], B: ['B', 'anti-A', 'B, O', 'B, AB'], AB: ['A and B', 'none', 'A, B, AB, O (universal recipient)', 'AB'], O: ['none', 'anti-A and anti-B', 'O', 'A, B, AB, O (universal donor)'] };
  G9.register({
    no: 15, part: 'Unit V · Human physiology', short: 'Circulation', title: 'Body Fluids and Circulation',
    blurb: 'Blood — plasma and formed elements (RBCs, WBCs, platelets); ABO and Rh blood groups and erythroblastosis foetalis; coagulation; lymph; open and closed circulation; the human heart; cardiac cycle (systole, diastole, heart sounds), cardiac output; ECG (P, QRS, T); double circulation, hepatic portal and coronary circulation; regulation by SAN, AVN and nervous/hormonal control; disorders — hypertension, coronary artery disease, angina, heart failure.',
    revise: {
      oneLine: 'Plasma ≈ 55% of blood (90–92% water, proteins: fibrinogen, globulins, albumins). RBCs ≈ 5–5.5 million/mm³, life ~120 days; WBCs 6000–8000/mm³ (neutrophils most, basophils least); platelets 1.5–3.5 lakh/mm³. ABO: antigens on RBCs, antibodies in plasma (O universal donor, AB universal recipient). Cardiac cycle ≈ 0.8 s at 72 beats/min; stroke volume ≈ 70 mL; cardiac output = stroke volume × heart rate ≈ 5 L/min. SAN is the pacemaker (70–75 impulses/min); impulse → AVN → bundle of His → Purkinje fibres. ECG: P (atrial depolarisation), QRS (ventricular depolarisation), T (ventricular repolarisation).',
      sections: [
        { h: 'Coagulation', html: '<p>Injury → thrombokinase → prothrombin → thrombin (Ca²⁺ needed) → fibrinogen → fibrin threads trap cells (clot).</p>' },
        { h: 'Rh factor', html: '<p>Rh⁻ mother with Rh⁺ foetus: anti-Rh antibodies in a later pregnancy can destroy foetal RBCs (erythroblastosis foetalis); prevented by anti-Rh injection after first delivery.</p>' },
        { h: 'Heart sounds', html: '<p>“Lub” — AV valves close (start of ventricular systole). “Dub” — semilunar valves close (end of ventricular systole).</p>' }
      ],
      formulas: [['Cardiac output', 'SV × HR ≈ 70 × 72 ≈ 5 L/min'], ['Cardiac cycle', '≈ 0.8 s'], ['RBC count', '5–5.5 million/mm³'], ['Normal BP', '120/80 mmHg'], ['ECG', 'P, QRS, T']],
      terms: [['Pacemaker', 'SA node'], ['Lymph', 'tissue fluid in lymphatic vessels'], ['Double circulation', 'pulmonary + systemic loops']],
      traps: ['O group has no A/B antigens; AB has no antibodies.', 'Pulmonary vein carries oxygenated blood.', 'Hypertension is ≥ 140/90.'],
      bridge: '<p>Ch 16 covers kidneys that filter this blood.</p>'
    },
    explore: [
      { title: 'Blood group matcher', intro: 'Choose a blood group.',
        build(el, K) { let k = 'A'; const row = K.row(el); K.select(row, 'group', Object.keys(BG), i => { k = Object.keys(BG)[i]; draw(); }); const rd = K.read(el); function draw() { const g = BG[k]; rd.innerHTML = `<b>${k}</b> · antigen on RBC: ${g[0]} · antibodies in plasma: ${g[1]} · can receive from: <b>${g[2]}</b> · can donate to: <b>${g[3]}</b>`; } draw(); return null; } },
      { title: 'Cardiac output', intro: 'Set stroke volume and heart rate.',
        build(el, K) { let sv = 70, hr = 72; const row = K.row(el); K.slider(row, 'stroke volume (mL)', 40, 150, 5, sv, v => { sv = v; draw(); }); K.slider(row, 'heart rate (/min)', 40, 200, 1, hr, v => { hr = v; draw(); }); const rd = K.read(el); function draw() { rd.innerHTML = `cardiac output = ${sv} × ${hr} = <b>${(sv * hr / 1000).toFixed(2)} L/min</b> · cycle length = 60/${hr} = <b>${(60 / hr).toFixed(2)} s</b>${hr > 100 ? ' (tachycardia range)' : hr < 60 ? ' (bradycardia range)' : ''}`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Cardiac output', gen(R) { const sv = R.pick([60, 70, 80, 90]), hr = R.int(60, 100); return { q: `Stroke volume ${sv} mL, heart rate ${hr}/min. Cardiac output?`, a: `${sv * hr / 1000} L/min`, ans: sv * hr / 1000 }; } },
      { title: 'Blood group', gen(R) { const k = R.pick(Object.keys(BG)); return { q: `Antigens and antibodies of blood group ${k}?`, a: `antigens ${BG[k][0]}; antibodies ${BG[k][1]}` }; } },
      { title: 'ECG', gen(R) { return G9.S9.groupQ(R, [['P wave', 0], ['QRS complex', 1], ['T wave', 2]], ['atrial depolarisation', 'ventricular depolarisation', 'ventricular repolarisation'], 'ECG part '); } },
      { title: 'Cycle time', levels: [2, 3], gen(R) { const hr = R.pick([60, 72, 75, 80, 100, 120]); return { q: `Heart rate ${hr}/min. Duration of one cardiac cycle?`, a: `${+(60 / hr).toFixed(3)} s`, ans: 60 / hr, tol: 0.001 }; } },
      { title: 'Concepts', gen(R) { return G9.S9.pickQ(R, [['Pacemaker of the heart?', 'SA node'], ['Cause of “lub” sound?', 'closure of AV (tricuspid, bicuspid) valves'], ['Universal donor?', 'O (Rh⁻ for full safety)'], ['Ion needed for clotting?', 'Ca²⁺'], ['Life span of RBC?', 'about 120 days']]); } }
    ],
    quiz: [
      { q: 'Pacemaker', o: ['SA node', 'AV node', 'bundle of His', 'Purkinje'], a: 0, e: 'Initiates.' }, { q: 'Universal recipient', o: ['AB', 'O', 'A', 'B'], a: 0, e: 'No antibodies.' },
      { q: 'Cardiac output ≈', o: ['5 L/min', '70 mL/min', '120 L/min', '0.8 L/min'], a: 0, e: 'SV × HR.' }, { q: 'QRS represents', o: ['ventricular depolarisation', 'atrial depolarisation', 'repolarisation of atria', 'rest'], a: 0, e: 'ECG.' },
      { q: 'Most abundant WBC', o: ['neutrophils', 'basophils', 'eosinophils', 'monocytes'], a: 0, e: '60–65%.' }, { q: 'Clot fibres', o: ['fibrin', 'fibrinogen', 'albumin', 'globulin'], a: 0, e: 'Threads.' },
      { q: 'Normal BP', o: ['120/80', '140/90', '100/40', '180/120'], a: 0, e: 'mmHg.' }, { q: 'Lub sound', o: ['AV valves close', 'semilunar close', 'atria contract', 'blood flows'], a: 0, e: 'First.' },
      { q: 'Erythroblastosis foetalis due to', o: ['Rh incompatibility', 'ABO', 'anaemia', 'virus'], a: 0, e: 'Rh⁻ mother.' }, { q: 'Cardiac cycle duration', o: ['0.8 s', '8 s', '0.08 s', '1 min'], a: 0, e: '72/min.' },
      { q: 'Plasma protein for clotting', o: ['fibrinogen', 'albumin', 'globulin', 'haemoglobin'], a: 0, e: 'Clot.' }
    ],
    teach: {
      outcomes: ['Describe blood and blood groups', 'Explain the cardiac cycle and ECG', 'Calculate cardiac output'],
      periods: [{ t: 'Blood', flow: [['10 min', 'Blood smear (or images).'], ['15 min', 'Explore panel 1.'], ['15 min', 'Clotting cascade.']] }, { t: 'Heart', flow: [['15 min', 'Pulse and stethoscope.'], ['15 min', 'Explore panel 2.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['O has anti-O antibodies.', 'Veins always carry deoxygenated blood.'], activities: ['Pulse rate before/after exercise.', 'ECG trace reading.'],
      exit: ['ABO rules.', 'Cardiac output.', 'ECG waves.'], homework: 'Find your family’s blood groups and check donor–recipient matches.'
    },
    slides: [{ t: 'Body Fluids and Circulation', b: ['Blood composition', 'Blood groups and clotting', 'Heart and cardiac cycle', 'ECG and regulation'] }, { t: 'Think and share', b: ['Why is O a universal donor?', 'What makes the lub-dub?'] }],
    fs: { groups: [['Blood', [['Plasma', '55%'], ['RBC', '5–5.5 million/mm³'], ['Clotting', 'fibrinogen → fibrin (Ca²⁺)']]], ['Groups', [['O', 'universal donor'], ['AB', 'universal recipient'], ['Rh', 'erythroblastosis risk']]], ['Heart', [['Pacemaker', 'SAN'], ['CO', 'SV × HR'], ['ECG', 'P, QRS, T']]]],
      ex: [['70 mL × 72', '5.04 L/min'], ['HR 75', 'cycle 0.8 s']], rem: ['Antigens on cells, antibodies in plasma.', 'SAN starts beats.', 'BP 120/80.'] }
  });
})();
