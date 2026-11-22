/*
TOOL:    class12_biology_ch03
FAMILY:  CBSE_REVISION / Class 12 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 3 Reproductive Health (problems and strategies, population stabilisation, contraception methods, MTP, sexually transmitted infections, infertility and ART) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  const f = x => (+x.toPrecision(4)).toString();
  G9.register({
    no: 3, part: 'Unit VI · Reproduction', short: 'Reproductive health', title: 'Reproductive Health',
    blurb: 'Reproductive health — problems and strategies (RCH programmes, awareness, amniocentesis ban for sex determination); population stabilisation and birth control; contraceptive methods — natural, barrier, IUDs, oral pills, injectables and implants, emergency contraception, surgical methods; medical termination of pregnancy (MTP); sexually transmitted infections and their prevention; infertility and assisted reproductive technologies (IVF, ZIFT, GIFT, ICSI, AI).',
    revise: {
      oneLine: 'Reproductive health means total well-being in physical, emotional, behavioural and social aspects of reproduction. India was among the first countries to start family planning (1951). Contraceptives: natural (periodic abstinence days 10–17, withdrawal, lactational amenorrhoea up to 6 months), barriers (condoms — also protect from STIs, diaphragms, cervical caps), IUDs (non-medicated Lippes loop; copper-releasing CuT, Cu7, Multiload 375; hormone-releasing Progestasert, LNG-20), oral pills (progestogen or progestogen–oestrogen; Saheli is a once-a-week non-steroidal pill), injectables/implants, emergency contraceptives within 72 hours, sterilisation (vasectomy, tubectomy). MTP is legal up to 24 weeks under specified conditions (2017 amendment). STIs: gonorrhoea, syphilis, genital herpes, chlamydiasis, genital warts, trichomoniasis, hepatitis B, HIV/AIDS. ART: IVF with embryo transfer (ZIFT up to 8 blastomeres into fallopian tube; IUT for more than 8), GIFT, ICSI, artificial insemination (IUI).',
      sections: [
        { h: 'Population growth', html: '<p>Reasons: fall in death rate, MMR and IMR, more people in reproductive age. Measures: raising marriage age (18 for females, 21 for males), incentives for small families, awareness.</p>' },
        { h: 'STI prevention', html: '<p>Avoid unknown partners, use condoms, consult a qualified doctor early; hepatitis B and HIV also spread by sharing needles and blood transfusion.</p>' },
        { h: 'Amniocentesis', html: '<p>Tests foetal chromosomes for disorders; banned in India for sex determination to prevent female foeticide.</p>' }
      ],
      formulas: [['Emergency pill', 'within 72 h'], ['LAM', 'up to 6 months after birth'], ['ZIFT', '≤ 8 blastomeres'], ['IUT', '> 8 blastomeres']],
      terms: [['IUD', 'intra-uterine device'], ['ICSI', 'sperm injected directly into ovum'], ['MTP', 'medical termination of pregnancy']],
      traps: ['Only condoms protect from STIs among contraceptives.', 'Copper ions suppress sperm motility and fertilising capacity.', 'Saheli was developed by CDRI Lucknow.'],
      bridge: '<p>Ch 4 begins genetics.</p>'
    },
    explore: [
      { title: 'Contraception sorter', intro: 'Sort by method type.',
        build(el, K) { return G9.S9.sorter(el, K, { groups: ['natural', 'barrier', 'IUD', 'hormonal', 'surgical'], items: [['periodic abstinence', 0], ['lactational amenorrhoea', 0], ['condom', 1], ['diaphragm', 1], ['CuT', 2], ['LNG-20', 2], ['Saheli pill', 3], ['implants under skin', 3], ['vasectomy', 4], ['tubectomy', 4]] }); } },
      { title: 'Population growth', intro: 'Compound growth from a starting population.',
        build(el, K) { let P0 = 140, r = 1.0, y = 20; const row = K.row(el); K.slider(row, 'start (crore)', 50, 150, 5, P0, v => { P0 = v; draw(); }); K.slider(row, 'growth rate (%/yr)', 0, 3, 0.1, r, v => { r = v; draw(); }); K.slider(row, 'years', 5, 50, 5, y, v => { y = v; draw(); }); const rd = K.read(el); function draw() { const P = P0 * (1 + r / 100) ** y, dbl = r > 0 ? 70 / r : Infinity; rd.innerHTML = `after ${y} years: <b>${f(P)} crore</b> · doubling time ≈ 70/r = <b>${r > 0 ? f(dbl) + ' years' : 'never'}</b>`; } draw(); return null; } }
    ],
    gens: [
      { title: 'Method type', gen(R) { return G9.S9.groupQ(R, [['Multiload 375', 0], ['Progestasert', 1], ['Lippes loop', 2], ['CuT', 0], ['LNG-20', 1]], ['copper-releasing IUD', 'hormone-releasing IUD', 'non-medicated IUD'], ''); } },
      { title: 'ART', gen(R) { return G9.S9.pickQ(R, [['Embryo with up to 8 blastomeres transferred to fallopian tube', 'ZIFT'], ['Embryo with more than 8 blastomeres transferred to uterus', 'IUT'], ['Ovum from donor transferred to fallopian tube', 'GIFT'], ['Sperm injected directly into ovum', 'ICSI'], ['Semen introduced into uterus', 'IUI (artificial insemination)']], 'Name the technique: '); } },
      { title: 'STI', gen(R) { return G9.S9.groupQ(R, [['gonorrhoea', 0], ['syphilis', 0], ['chlamydiasis', 0], ['genital herpes', 1], ['HIV/AIDS', 1], ['hepatitis B', 1], ['trichomoniasis', 2]], ['bacterial', 'viral', 'protozoan'], 'Cause of '); } },
      { title: 'Doubling time', levels: [2, 3], gen(R) { const r = R.pick([1, 1.4, 2, 3.5]); return { q: `Population growing at ${r}% per year. Approximate doubling time (rule of 70)?`, a: `${f(70 / r)} years`, ans: 70 / r, tol: 0.01 }; } },
      { title: 'Concepts', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['How does CuT prevent pregnancy?', 'Cu ions reduce sperm motility and fertilising capacity'], ['Why is amniocentesis banned for sex determination?', 'to stop female foeticide'], ['Legal limit for MTP (India, 2017 amendment)?', 'up to 24 weeks under specified conditions'], ['Which contraceptive also prevents STIs?', 'condom']]); } }
    ],
    quiz: [
      { q: 'Saheli is', o: ['weekly non-steroidal pill', 'IUD', 'condom', 'implant'], a: 0, e: 'CDRI.' }, { q: 'Copper IUD', o: ['Multiload 375', 'Lippes loop', 'LNG-20', 'Progestasert'], a: 0, e: 'Cu.' },
      { q: 'Emergency contraception within', o: ['72 hours', '1 week', '1 month', '24 days'], a: 0, e: 'Post-coital.' }, { q: 'Vasectomy cuts', o: ['vas deferens', 'fallopian tube', 'urethra', 'ureter'], a: 0, e: 'Male.' },
      { q: 'ZIFT transfers', o: ['≤ 8-celled embryo to tube', 'sperm to uterus', 'ovum to tube', '> 8 cells to uterus'], a: 0, e: 'Zygote IFT.' }, { q: 'Viral STI', o: ['genital herpes', 'syphilis', 'gonorrhoea', 'trichomoniasis'], a: 0, e: 'HSV.' },
      { q: 'LAM effective up to', o: ['6 months', '2 years', '1 month', '1 week'], a: 0, e: 'Breastfeeding.' }, { q: 'Protects against STIs', o: ['condom', 'CuT', 'pill', 'tubectomy'], a: 0, e: 'Barrier.' },
      { q: 'ICSI means', o: ['sperm injected into ovum', 'egg into tube', 'IUI', 'surrogacy'], a: 0, e: 'Intra-cytoplasmic.' }, { q: 'Family planning in India began', o: ['1951', '1971', '1991', '2001'], a: 0, e: 'Early.' },
      { q: 'Legal marriage age (female)', o: ['18', '16', '21', '25'], a: 0, e: 'Law.' }
    ],
    teach: {
      outcomes: ['Explain reproductive health goals', 'Classify contraceptives', 'Describe STIs and ART methods'],
      periods: [{ t: 'Contraception', flow: [['10 min', 'Population data discussion.'], ['15 min', 'Explore panels.'], ['15 min', 'Method comparison.']] }, { t: 'STIs and ART', flow: [['15 min', 'STI prevention.'], ['15 min', 'ART flowchart.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['All contraceptives prevent STIs.', 'IVF means baby grows in a tube.'], activities: ['Myth-busting quiz.', 'Population growth graph.'],
      exit: ['IUD types.', 'ZIFT vs IUT.', 'One viral STI.'], homework: 'Prepare an awareness poster on STI prevention.'
    },
    slides: [{ t: 'Reproductive Health', b: ['Goals and RCH', 'Contraception', 'MTP and STIs', 'Infertility and ART'] }, { t: 'Think and share', b: ['Why is sex education important?', 'How can ART help couples?'] }],
    fs: { groups: [['Contraception', [['Natural', 'abstinence, LAM'], ['Barrier', 'condom, diaphragm'], ['IUD', 'Lippes, CuT, LNG-20'], ['Surgical', 'vasectomy, tubectomy']]], ['Health', [['MTP', 'legal, ≤ 24 weeks with conditions'], ['STIs', 'condom, safe practices']]], ['ART', [['IVF-ET', 'ZIFT, IUT'], ['GIFT', 'ovum to tube'], ['ICSI, IUI', 'sperm methods']]]],
      ex: [['2% growth', 'doubles in 35 years'], ['CuT', 'copper IUD']], rem: ['Condom only STI barrier.', '72 h emergency pill.', 'ZIFT ≤ 8 cells.'] }
  });
})();
