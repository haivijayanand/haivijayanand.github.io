/*
TOOL:    class11_biology_ch19
FAMILY:  CBSE_REVISION / Class 11 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 19 Chemical Coordination and Integration (endocrine glands and hormones: hypothalamus, pituitary, pineal, thyroid, parathyroid, thymus, adrenal, pancreas, gonads; hormones of heart, kidney, GI tract; mechanism of hormone action; disorders) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const GL = [['hypothalamus', 'releasing/inhibiting hormones (GnRH, somatostatin)', 'controls pituitary'], ['anterior pituitary', 'GH, PRL, TSH, ACTH, LH, FSH, MSH', 'growth (gigantism/dwarfism), milk, other glands'], ['posterior pituitary', 'oxytocin, vasopressin (ADH)', 'uterine contraction, milk ejection; water reabsorption (diabetes insipidus if lacking)'], ['pineal', 'melatonin', 'sleep–wake (diurnal) rhythm'], ['thyroid', 'T₄, T₃, thyrocalcitonin', 'metabolism; goitre, cretinism, myxoedema, Graves’ disease'], ['parathyroid', 'parathyroid hormone (PTH)', 'raises blood Ca²⁺'], ['thymus', 'thymosins', 'T-lymphocyte maturation, immunity'], ['adrenal cortex', 'cortisol, aldosterone, androgens', 'stress, Na⁺ balance; Addison’s disease'], ['adrenal medulla', 'adrenaline, noradrenaline', 'fight or flight (emergency hormones)'], ['pancreas (islets)', 'insulin (β), glucagon (α)', 'lowers / raises blood glucose; diabetes mellitus'], ['testis', 'testosterone', 'male sex characters, spermatogenesis'], ['ovary', 'oestrogen, progesterone', 'female sex characters, pregnancy support']];
  G9.register({
    no: 19, part: 'Unit V · Human physiology', short: 'Hormones', title: 'Chemical Coordination and Integration',
    blurb: 'Endocrine glands and hormones; human endocrine system — hypothalamus, pituitary, pineal, thyroid, parathyroid, thymus, adrenal, pancreas, testis, ovary; hormones of heart (ANF), kidney (erythropoietin) and GI tract (gastrin, secretin, CCK, GIP); mechanism of hormone action — membrane receptors with second messengers (cAMP) for proteins and peptides, intracellular receptors for steroids and iodothyronines; disorders.',
    revise: {
      oneLine: 'Hormones are non-nutrient chemicals acting as intercellular messengers in trace amounts. Hypothalamus controls the pituitary (portal system to anterior lobe; neurosecretion to posterior lobe). Insulin lowers blood glucose (glycogenesis), glucagon raises it (glycogenolysis, gluconeogenesis). Thyroid hormones need iodine; deficiency causes goitre, and in children cretinism. Adrenaline acts in emergencies. Protein/amine hormones bind membrane receptors and use second messengers (cAMP, Ca²⁺); steroid and thyroid hormones enter cells and bind intracellular receptors to regulate genes.',
      sections: [
        { h: 'Feedback', html: '<p>Hypothalamus → TRH → pituitary TSH → thyroid T₃/T₄; high T₄ inhibits TRH and TSH (negative feedback).</p>' },
        { h: 'GI hormones', html: '<p>Gastrin (gastric HCl, pepsinogen), secretin (water and bicarbonate from pancreas), CCK (bile and pancreatic enzymes), GIP (inhibits gastric secretion).</p>' },
        { h: 'Disorders', html: '<p>Gigantism/acromegaly (excess GH), dwarfism (low GH), diabetes insipidus (low ADH), diabetes mellitus (insulin), Graves’ disease (hyperthyroid exophthalmic goitre), Addison’s disease (low cortisol/aldosterone).</p>' }
      ],
      formulas: [['Insulin', 'β cells, lowers glucose'], ['Glucagon', 'α cells, raises glucose'], ['ADH', 'water reabsorption'], ['PTH vs calcitonin', 'raise vs lower Ca²⁺'], ['Second messenger', 'cAMP']],
      terms: [['Endocrine gland', 'ductless gland secreting into blood'], ['Second messenger', 'intracellular signal triggered by a hormone at the membrane'], ['Neurohormone', 'hormone made by neurons (hypothalamus)']],
      traps: ['Posterior pituitary stores, doesn’t make, oxytocin and ADH.', 'Diabetes insipidus is about ADH, not insulin.', 'Steroids act inside cells; peptides at the membrane.'],
      bridge: '<p>Class 12: reproductive hormones and human reproduction.</p>'
    },
    explore: [
      { title: 'Gland explorer', intro: 'Choose a gland. <kbd>S</kbd> steps.',
        build(el, K) { let k = 0; const row = K.row(el); const sel = K.select(row, 'gland', GL.map(g => g[0]), i => { k = i; draw(); }); const rd = K.read(el); function draw() { rd.innerHTML = `<b>${GL[k][0]}</b> → ${GL[k][1]} · role/disorders: ${GL[k][2]}`; } const step = () => { k = (k + 1) % GL.length; sel.value = k; draw(); }; K.button(row, 'Next (S)', step); draw(); return { step, play() {}, pause() {} }; } },
      { title: 'Blood glucose control', intro: 'Set blood glucose (mg/dL); see the response.',
        build(el, K) { let g = 90; const row = K.row(el); K.slider(row, 'blood glucose (mg/dL)', 40, 300, 5, g, v => { g = v; draw(); }); const rd = K.read(el); function draw() { rd.innerHTML = g > 140 ? `<b>high</b> → β cells release <b>insulin</b> → cells take up glucose, liver stores glycogen → glucose falls${g > 200 ? ' · persistently this high suggests diabetes mellitus' : ''}` : g < 70 ? `<b>low</b> → α cells release <b>glucagon</b> → liver breaks glycogen (glycogenolysis), makes glucose (gluconeogenesis) → glucose rises` : '<b>normal range</b> (fasting ~70–100) → hormones in balance'; } draw(); return null; } }
    ],
    gens: [
      { title: 'Hormone source', gen(R) { const g = R.pick(GL); return { q: `Hormones of the ${g[0]}?`, a: g[1] }; } },
      { title: 'Disorder', gen(R) { return G9.S9.groupQ(R, [['gigantism', 0], ['diabetes insipidus', 1], ['goitre', 2], ['diabetes mellitus', 3], ['Addison’s disease', 4], ['cretinism', 2]], ['growth hormone', 'ADH (vasopressin)', 'thyroid hormone / iodine', 'insulin', 'adrenal cortex hormones'], 'Disorder linked to '); } },
      { title: 'Action mechanism', levels: [2, 3], gen(R) { return G9.S9.groupQ(R, [['insulin', 0], ['testosterone', 1], ['adrenaline', 0], ['thyroxine', 1], ['glucagon', 0], ['cortisol', 1]], ['membrane receptor + second messenger', 'intracellular receptor (gene expression)'], 'Mechanism of '); } },
      { title: 'GI hormones', gen(R) { return G9.S9.pickQ(R, [['Hormone stimulating HCl secretion?', 'gastrin'], ['Hormone releasing pancreatic bicarbonate?', 'secretin'], ['Hormone releasing bile and pancreatic enzymes?', 'CCK (cholecystokinin)'], ['Hormone from heart?', 'ANF (atrial natriuretic factor)'], ['Hormone from kidney for RBC production?', 'erythropoietin']]); } },
      { title: 'Feedback', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['What happens to TSH when T₄ is high?', 'decreases (negative feedback)'], ['Why is the pituitary called master gland?', 'controls many other glands (but itself is controlled by hypothalamus)'], ['Calcium-raising hormone?', 'parathyroid hormone'], ['Sleep hormone?', 'melatonin (pineal)']]); } }
    ],
    quiz: [
      { q: 'Lowers blood glucose', o: ['insulin', 'glucagon', 'adrenaline', 'cortisol'], a: 0, e: 'β cells.' }, { q: 'ADH deficiency', o: ['diabetes insipidus', 'diabetes mellitus', 'goitre', 'dwarfism'], a: 0, e: 'Water loss.' },
      { q: 'Melatonin from', o: ['pineal', 'pituitary', 'thymus', 'thyroid'], a: 0, e: 'Rhythm.' }, { q: 'Emergency hormone', o: ['adrenaline', 'insulin', 'GH', 'oxytocin'], a: 0, e: 'Fight/flight.' },
      { q: 'Raises blood Ca²⁺', o: ['PTH', 'calcitonin', 'insulin', 'ADH'], a: 0, e: 'Parathyroid.' }, { q: 'Steroid hormones act via', o: ['intracellular receptors', 'cAMP only', 'ion channels only', 'none'], a: 0, e: 'Genes.' },
      { q: 'Oxytocin stored in', o: ['posterior pituitary', 'anterior pituitary', 'thyroid', 'ovary'], a: 0, e: 'Neurohypophysis.' }, { q: 'Iodine deficiency', o: ['goitre', 'diabetes', 'gigantism', 'Addison’s'], a: 0, e: 'Thyroid.' },
      { q: 'Secretin stimulates', o: ['pancreatic bicarbonate', 'HCl', 'bile only', 'insulin'], a: 0, e: 'Neutralise.' }, { q: 'T-cell maturation', o: ['thymus', 'pineal', 'adrenal', 'spleen'], a: 0, e: 'Thymosins.' },
      { q: 'Second messenger', o: ['cAMP', 'DNA', 'ATP synthase', 'haemoglobin'], a: 0, e: 'Signal.' }
    ],
    teach: {
      outcomes: ['Name glands, hormones and effects', 'Explain feedback and glucose control', 'Describe hormone action mechanisms'],
      periods: [{ t: 'Glands', flow: [['10 min', 'Body map of glands.'], ['15 min', 'Explore panel 1.'], ['15 min', 'Disorder matching.']] }, { t: 'Control', flow: [['15 min', 'Explore panel 2.'], ['15 min', 'Membrane vs intracellular receptors.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Pituitary acts independently.', 'Insipidus = sugar diabetes.'], activities: ['Hormone card game.', 'Feedback loop drawing.'],
      exit: ['Five glands + hormones.', 'Insulin vs glucagon.', 'Two action mechanisms.'], homework: 'Make a feedback loop diagram for thyroid hormone.'
    },
    slides: [{ t: 'Chemical Coordination', b: ['Endocrine glands', 'Hypothalamus–pituitary axis', 'Pancreas, adrenal, thyroid', 'Mechanism of action'] }, { t: 'Think and share', b: ['Why is ADH called vasopressin?', 'How do steroids act on genes?'] }],
    fs: { groups: [['Axis', [['Hypothalamus', 'releasing hormones'], ['Ant. pituitary', 'GH, TSH, ACTH, LH, FSH, PRL'], ['Post. pituitary', 'oxytocin, ADH']]], ['Glands', [['Thyroid', 'T₃, T₄, calcitonin'], ['Parathyroid', 'PTH'], ['Pancreas', 'insulin, glucagon'], ['Adrenal', 'cortisol, aldosterone, adrenaline']]], ['Action', [['Peptides', 'membrane, cAMP'], ['Steroids', 'intracellular, genes'], ['Feedback', 'negative']]]],
      ex: [['Glucose 220', 'insulin ↑'], ['Low ADH', 'diabetes insipidus']], rem: ['Hypothalamus controls pituitary.', 'Insulin ↓, glucagon ↑.', 'Steroids inside cells.'] }
  });
})();
