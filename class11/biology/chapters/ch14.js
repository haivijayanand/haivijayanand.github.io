/*
TOOL:    class11_biology_ch14
FAMILY:  CBSE_REVISION / Class 11 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 14 Breathing and Exchange of Gases (respiratory organs, human respiratory system, mechanism of breathing, respiratory volumes and capacities, exchange of gases, transport of O2 and CO2, regulation, disorders) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const V = { TV: 500, IRV: 2750, ERV: 1050, RV: 1150 };
  G9.register({
    no: 14, part: 'Unit V · Human physiology', short: 'Breathing', title: 'Breathing and Exchange of Gases',
    blurb: 'Respiratory organs in animals; human respiratory system; mechanism of breathing (inspiration and expiration with diaphragm and intercostal muscles); respiratory volumes and capacities; exchange of gases at alveoli and tissues (partial pressures); transport of O₂ (oxyhaemoglobin, dissociation curve) and CO₂ (bicarbonate, carbamino-haemoglobin); regulation by respiratory rhythm centre (medulla) and pneumotaxic centre (pons); disorders — asthma, emphysema, occupational diseases.',
    revise: {
      oneLine: 'Inspiration: diaphragm contracts (flattens), external intercostals lift ribs → thoracic volume up → pressure down → air in. Volumes (adult): TV ≈ 500 mL, IRV 2500–3000, ERV 1000–1100, RV 1100–1200; VC = TV + IRV + ERV; TLC = VC + RV. Gases move by diffusion down partial-pressure gradients (alveolar pO₂ 104, pCO₂ 40 mmHg; deoxygenated blood pO₂ 40, pCO₂ 45). About 97% O₂ travels as oxyhaemoglobin; CO₂ ~70% as bicarbonate (carbonic anhydrase), 20–25% as carbamino-haemoglobin, ~7% dissolved. Each 100 mL of oxygenated blood delivers ~5 mL O₂ to tissues.',
      sections: [
        { h: 'Dissociation curve', html: '<p>Sigmoid. Shifted right (O₂ released more easily) by high pCO₂, H⁺ (low pH), temperature — conditions in tissues.</p>' },
        { h: 'Regulation', html: '<p>Respiratory rhythm centre in medulla; pneumotaxic centre in pons moderates it; chemosensitive area responds to CO₂ and H⁺; carotid and aortic bodies sense changes.</p>' },
        { h: 'Disorders', html: '<p>Asthma (bronchi inflammation, wheezing), emphysema (alveolar walls damaged, often from smoking), occupational lung disease from dust (silicosis, asbestosis).</p>' }
      ],
      formulas: [['VC', 'TV + IRV + ERV'], ['IC', 'TV + IRV'], ['FRC', 'ERV + RV'], ['TLC', 'VC + RV'], ['Minute volume', 'TV × rate (≈ 6–8 L/min)']],
      terms: [['Tidal volume', 'air per normal breath'], ['Residual volume', 'air left after forcible expiration'], ['Vital capacity', 'max air breathed out after max inspiration']],
      traps: ['RV cannot be measured with a simple spirometer.', 'O₂ binding is affected by pCO₂, pH, temperature.', 'Most CO₂ is carried as bicarbonate, not by haemoglobin.'],
      bridge: '<p>Ch 15 covers the blood that carries these gases.</p>'
    },
    explore: [
      { title: 'Lung volume calculator', intro: 'Adjust volumes (mL) and see capacities.',
        build(el, K) { const v = Object.assign({}, V); const row = K.row(el); ['TV', 'IRV', 'ERV', 'RV'].forEach(k => K.slider(row, k, k === 'TV' ? 300 : 500, k === 'IRV' ? 3500 : k === 'TV' ? 800 : 1600, 50, v[k], x => { v[k] = x; draw(); })); let rate = 12; K.slider(row, 'breaths/min', 8, 30, 1, rate, x => { rate = x; draw(); }); const rd = K.read(el);
          function draw() { const VC = v.TV + v.IRV + v.ERV; rd.innerHTML = `VC = TV + IRV + ERV = <b>${VC} mL</b> · IC = <b>${v.TV + v.IRV}</b> · FRC = <b>${v.ERV + v.RV}</b> · TLC = <b>${VC + v.RV} mL</b> · minute ventilation = ${v.TV} × ${rate} = <b>${(v.TV * rate / 1000).toFixed(1)} L/min</b>`; } draw(); return null; } },
      { title: 'Breathing mechanism', intro: '<kbd>P</kbd> play, <kbd>S</kbd> step.',
        build(el, K) { return G9.S9.stages(el, K, { stages: [['Inspiration starts', 'Diaphragm contracts and flattens; external intercostals lift ribs and sternum.'], ['Volume up', 'Thoracic and lung volume increase; intrapulmonary pressure falls below atmospheric.'], ['Air in', 'Air rushes in until pressures equal.'], ['Expiration', 'Diaphragm and intercostals relax; volume falls; pressure rises above atmospheric; air out.'], ['Forced breathing', 'Abdominal muscles and internal intercostals help push air out.']] }); } }
    ],
    gens: [
      { title: 'Capacities', gen(R) { const tv = R.pick([450, 500, 550]), irv = R.pick([2500, 2750, 3000]), erv = R.pick([1000, 1100]), rv = R.pick([1100, 1200]); const k = R.int(0, 2); const nm = ['vital capacity', 'inspiratory capacity', 'total lung capacity'][k]; const val = [tv + irv + erv, tv + irv, tv + irv + erv + rv][k]; return { q: `TV ${tv}, IRV ${irv}, ERV ${erv}, RV ${rv} mL. ${nm}?`, a: `${val} mL`, ans: val }; } },
      { title: 'Minute volume', gen(R) { const tv = R.pick([400, 500, 600]), r = R.int(12, 20); return { q: `TV ${tv} mL at ${r} breaths/min. Minute ventilation?`, a: `${tv * r / 1000} L/min`, ans: tv * r / 1000 }; } },
      { title: 'Transport', gen(R) { return G9.S9.pickQ(R, [['Main form of O₂ transport?', 'oxyhaemoglobin (~97%)'], ['Main form of CO₂ transport?', 'bicarbonate (~70%)'], ['Enzyme making bicarbonate?', 'carbonic anhydrase'], ['O₂ delivered by 100 mL oxygenated blood?', 'about 5 mL']]); } },
      { title: 'Curve shift', levels: [2, 3], gen(R) { return G9.S9.groupQ(R, [['high pCO₂', 0], ['low pH', 0], ['high temperature', 0], ['low pCO₂ (lungs)', 1], ['high pH', 1]], ['curve shifts right (O₂ released)', 'curve shifts left (O₂ bound)'], 'Effect of '); } },
      { title: 'Regulation & disorders', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Where is the respiratory rhythm centre?', 'medulla oblongata'], ['Role of pneumotaxic centre?', 'moderates rhythm (pons)'], ['What damages alveolar walls in emphysema?', 'mainly cigarette smoking'], ['Occupational lung disease example?', 'silicosis, asbestosis']]); } }
    ],
    quiz: [
      { q: 'Tidal volume ≈', o: ['500 mL', '50 mL', '3000 mL', '1200 mL'], a: 0, e: 'Normal breath.' }, { q: 'VC =', o: ['TV + IRV + ERV', 'TV + RV', 'IRV + RV', 'TLC + RV'], a: 0, e: 'Sum.' },
      { q: 'Inspiration: diaphragm', o: ['contracts', 'relaxes', 'domes up', 'no change'], a: 0, e: 'Flattens.' }, { q: 'Most CO₂ carried as', o: ['bicarbonate', 'carbamino-Hb', 'dissolved', 'CO gas'], a: 0, e: '70%.' },
      { q: 'Rhythm centre', o: ['medulla', 'cerebrum', 'cerebellum', 'hypothalamus'], a: 0, e: 'Brainstem.' }, { q: 'Alveolar pO₂', o: ['104 mmHg', '40', '159', '45'], a: 0, e: 'Gradient.' },
      { q: 'Right shift caused by', o: ['high pCO₂', 'low temperature', 'high pH', 'low H⁺'], a: 0, e: 'Tissues.' }, { q: 'Cannot be measured by spirometer', o: ['RV', 'TV', 'IRV', 'ERV'], a: 0, e: 'Stays in lungs.' },
      { q: 'Carbonic anhydrase in', o: ['RBCs', 'plasma only', 'lungs only', 'bones'], a: 0, e: 'Fast.' }, { q: 'Emphysema mainly due to', o: ['smoking', 'cold', 'exercise', 'water'], a: 0, e: 'Alveoli.' },
      { q: 'Gas exchange by', o: ['diffusion', 'active transport', 'osmosis', 'filtration'], a: 0, e: 'Partial pressures.' }
    ],
    teach: {
      outcomes: ['Explain the mechanism of breathing', 'Calculate lung volumes and capacities', 'Describe gas transport and regulation'],
      periods: [{ t: 'Mechanism and volumes', flow: [['10 min', 'Bell-jar lung model.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Explore panel 1.']] }, { t: 'Transport', flow: [['15 min', 'Partial pressure table.'], ['15 min', 'Dissociation curve sketching.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Lungs pull air in actively.', 'Hb carries most CO₂.'], activities: ['Bell-jar model.', 'Balloon vital capacity estimate.'],
      exit: ['Inspiration steps.', 'VC calculation.', 'CO₂ transport forms.'], homework: 'Estimate your vital capacity using a balloon and compare with classmates.'
    },
    slides: [{ t: 'Breathing and Exchange of Gases', b: ['Respiratory system', 'Mechanism', 'Volumes and capacities', 'Transport and regulation'] }, { t: 'Think and share', b: ['Why does the curve shift right in tissues?', 'Why can’t RV be measured simply?'] }],
    fs: { groups: [['Mechanism', [['Inspiration', 'diaphragm + external intercostals contract'], ['Expiration', 'relaxation (passive)']]], ['Volumes', [['TV', '500 mL'], ['VC', 'TV + IRV + ERV'], ['TLC', 'VC + RV']]], ['Transport', [['O₂', '97% oxyHb'], ['CO₂', '70% HCO₃⁻'], ['Control', 'medulla, pons']]]],
      ex: [['500 + 2750 + 1050', 'VC 4300 mL'], ['500 mL × 14', '7 L/min']], rem: ['Pressure drives airflow.', 'Diffusion by partial pressures.', 'Right shift = release.'] }
  });
})();
