/*
TOOL:    class12_biology_ch02
FAMILY:  CBSE_REVISION / Class 12 Biology (NCERT)
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Science kits Classes III to XII
CHANGES: 1.0.0 - Ch 2 Human Reproduction (male and female reproductive systems, gametogenesis, menstrual cycle, fertilisation, implantation, pregnancy, embryonic development, parturition, lactation) - revise, 2 explore panels, 5 generators, quiz, lesson plan, slides, key-ideas sheet
*/
(function () {
  const { C } = G9;
  G9.register({
    no: 2, part: 'Unit VI · Reproduction', short: 'Human reproduction', title: 'Human Reproduction',
    blurb: 'The male reproductive system (testes, seminiferous tubules, Sertoli and Leydig cells, accessory ducts and glands) and the female reproductive system (ovaries, oviducts, uterus, mammary glands); gametogenesis — spermatogenesis and oogenesis with hormonal control; the menstrual cycle; fertilisation and implantation; pregnancy, placenta and embryonic development; parturition and lactation.',
    revise: {
      oneLine: 'Spermatogenesis in seminiferous tubules from puberty: spermatogonia (2n) → primary spermatocyte → meiosis I → secondary spermatocytes (n) → meiosis II → spermatids → spermiogenesis → sperm; one primary spermatocyte gives 4 sperms. GnRH → LH (Leydig cells → androgens) and FSH (Sertoli cells → spermiogenesis). Oogenesis starts before birth: oogonia → primary oocytes arrested in prophase I; at puberty one completes meiosis I each cycle (secondary oocyte + first polar body) and is ovulated; meiosis II completes only on sperm entry; one oocyte gives one ovum. Menstrual cycle (~28 days): menstrual (1–5), follicular (FSH, LH, oestrogen rise), ovulation (~day 14, LH surge), luteal (corpus luteum → progesterone). Fertilisation in the ampullary region of the oviduct; the blastocyst implants in the endometrium; hCG, hPL, oestrogens and progesterone maintain pregnancy (~9 months).',
      sections: [
        { h: 'Development landmarks', html: '<p>Heart forms after 1 month; limbs and digits by end of 2nd month; major organs by end of 1st trimester; first movements and hair on head in 5th month; eyelids separate by end of 24 weeks.</p>' },
        { h: 'Parturition and lactation', html: '<p>Foetal ejection reflex → oxytocin → uterine contractions. Colostrum (first milk) contains IgA antibodies.</p>' },
        { h: 'Accessory glands', html: '<p>Seminal vesicles, prostate and bulbourethral glands secrete seminal plasma (fructose, calcium, enzymes).</p>' }
      ],
      formulas: [['Sperm per spermatocyte', '4'], ['Ova per oocyte', '1 (+ polar bodies)'], ['Ovulation', '≈ day 14 (LH surge)'], ['Gestation', '≈ 9 months']],
      terms: [['Corpus luteum', 'ruptured follicle secreting progesterone'], ['Blastocyst', 'trophoblast + inner cell mass'], ['Acrosome', 'sperm cap with enzymes for egg entry']],
      traps: ['Oogenesis begins in the foetus; spermatogenesis at puberty.', 'Meiosis II of oocyte completes after sperm entry.', 'Placenta is also an endocrine organ.'],
      bridge: '<p>Ch 3 deals with reproductive health.</p>'
    },
    explore: [
      { title: 'Menstrual cycle', intro: 'Move through the 28 days.',
        build(el, K) { let d = 14; const row = K.row(el); K.slider(row, 'day', 1, 28, 1, d, v => { d = v; b.redraw(); }); const b = new K.Board(el, { xmin: -1, xmax: 29, ymin: -1, ymax: 11, axes: false, grid: 0, aspect: 0.35 }); const rd = K.read(el);
          const LH = x => 1 + 8 * Math.exp(-((x - 14) ** 2) / 1.2), FSH = x => 2 + 3 * Math.exp(-((x - 13) ** 2) / 2) + 1 / (1 + Math.exp(2 * (x - 5))), E = x => 1 + 5 * Math.exp(-((x - 12.5) ** 2) / 6) + 2 * Math.exp(-((x - 21) ** 2) / 12), Pr = x => 0.5 + 6 * Math.exp(-((x - 21) ** 2) / 14);
          b.onDraw = () => { b.clear(); b.line(0, 0, 28, 0, { color: C.ink, w: 1 }); [[LH, C.orange, 'LH'], [FSH, C.purple, 'FSH'], [E, C.blue, 'oestrogen'], [Pr, '#0f766e', 'progesterone']].forEach(([fn, col, lab], j) => { let p = null; for (let x = 1; x <= 28; x += 0.2) { const y = fn(x); if (p) b.line(p[0], p[1], x, y, { color: col, w: 2.2 }); p = [x, y]; } b.text(3 + j * 6, 10.4, lab, { font: '12px', color: col }); }); b.line(d, 0, d, 9.8, { color: C.grey, w: 1, dash: [4, 4] });
            const ph = d <= 5 ? 'menstrual phase — endometrium breaks down' : d < 14 ? 'follicular (proliferative) phase — follicle grows, endometrium regenerates (oestrogen)' : d === 14 ? '<b>ovulation</b> — LH surge releases secondary oocyte' : 'luteal (secretory) phase — corpus luteum secretes progesterone; if no fertilisation it degenerates'; rd.innerHTML = `day ${d}: ${ph}`; };
          b.redraw(); return null; } },
      { title: 'Gametogenesis compare', intro: 'Step through the stages. <kbd>S</kbd> steps.',
        build(el, K) { const S = [['spermatogonium (2n)', 'oogonium (2n) — formed in foetal ovary'], ['primary spermatocyte (2n)', 'primary oocyte (2n) — arrested in prophase I until puberty'], ['meiosis I → 2 secondary spermatocytes (n)', 'meiosis I → 1 secondary oocyte (n) + 1st polar body (at ovulation)'], ['meiosis II → 4 spermatids (n)', 'meiosis II only after sperm entry → ovum + 2nd polar body'], ['spermiogenesis → 4 sperms', 'fertilised ovum → zygote (2n)']]; let k = 0; const row = K.row(el); const rd = K.read(el); function draw() { rd.innerHTML = `stage ${k + 1}/5 · <b>male:</b> ${S[k][0]} · <b>female:</b> ${S[k][1]}`; } const step = () => { k = (k + 1) % S.length; draw(); }; K.button(row, 'Next stage (S)', step); draw(); return { step, play() {}, pause() {} }; } }
    ],
    gens: [
      { title: 'Count', gen(R) { const n = R.pick([10, 25, 50, 100]); return R.chance(.5) ? { q: `Sperms from ${n} primary spermatocytes?`, a: `${4 * n}`, ans: 4 * n } : { q: `Ova from ${n} primary oocytes?`, a: `${n}`, ans: n }; } },
      { title: 'Hormone role', gen(R) { return G9.S9.pickQ(R, [['LH in males', 'Leydig cells → androgens'], ['FSH in males', 'Sertoli cells → spermiogenesis'], ['LH surge in females', 'ovulation'], ['progesterone', 'maintains endometrium'], ['oxytocin', 'uterine contractions; milk ejection'], ['hCG', 'maintains corpus luteum in pregnancy']], 'Role of '); } },
      { title: 'Ploidy', gen(R) { return G9.S9.groupQ(R, [['spermatogonium', 1], ['spermatid', 0], ['primary oocyte', 1], ['secondary oocyte', 0], ['zygote', 1], ['first polar body', 0]], ['n', '2n'], 'Ploidy of '); } },
      { title: 'Location', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['Site of fertilisation?', 'ampullary region of oviduct'], ['Site of implantation?', 'endometrium of uterus'], ['Site of spermatogenesis?', 'seminiferous tubules'], ['Site of sperm maturation/storage?', 'epididymis']]); } },
      { title: 'Development', levels: [2, 3], gen(R) { return G9.S9.pickQ(R, [['When does the heart form?', 'after one month'], ['When are limbs and digits formed?', 'end of second month'], ['When are most organs formed?', 'end of first trimester'], ['First movements of foetus?', 'fifth month']]); } }
    ],
    quiz: [
      { q: 'Androgens secreted by', o: ['Leydig cells', 'Sertoli cells', 'prostate', 'epididymis'], a: 0, e: 'Interstitial cells.' }, { q: 'Ovulation triggered by', o: ['LH surge', 'FSH fall', 'progesterone', 'oxytocin'], a: 0, e: 'Mid-cycle.' },
      { q: 'Fertilisation site', o: ['ampulla of oviduct', 'uterus', 'cervix', 'ovary'], a: 0, e: 'Ampullary region.' }, { q: 'Sperms per primary spermatocyte', o: ['4', '1', '2', '8'], a: 0, e: 'Meiosis.' },
      { q: 'Oocyte completes meiosis II', o: ['after sperm entry', 'at birth', 'at puberty', 'at ovulation'], a: 0, e: 'Fertilisation.' }, { q: 'Corpus luteum secretes', o: ['progesterone', 'LH', 'FSH', 'hCG'], a: 0, e: 'Luteal phase.' },
      { q: 'Colostrum rich in', o: ['IgA', 'IgE', 'IgM', 'glucose only'], a: 0, e: 'Passive immunity.' }, { q: 'Parturition hormone', o: ['oxytocin', 'prolactin', 'insulin', 'thyroxine'], a: 0, e: 'Contractions.' },
      { q: 'Blastocyst outer layer', o: ['trophoblast', 'inner cell mass', 'chorion only', 'amnion'], a: 0, e: 'Implantation.' }, { q: 'Fructose in semen from', o: ['seminal vesicles', 'testis', 'urethra', 'kidney'], a: 0, e: 'Energy.' },
      { q: 'Heart forms after', o: ['1 month', '3 months', '6 months', 'birth'], a: 0, e: 'Early.' }
    ],
    teach: {
      outcomes: ['Describe reproductive systems and gametogenesis', 'Explain the menstrual cycle hormonally', 'Outline fertilisation to birth'],
      periods: [{ t: 'Gametogenesis', flow: [['10 min', 'Labelled diagrams.'], ['15 min', 'Explore panel 2.'], ['15 min', 'Count problems.']] }, { t: 'Cycle and pregnancy', flow: [['15 min', 'Explore panel 1.'], ['15 min', 'Pregnancy timeline.'], ['10 min', 'Check quiz.']] }],
      misconceptions: ['Ovum is formed fully before birth.', 'Fertilisation occurs in uterus.'], activities: ['Hormone graph reading.', 'Timeline chart of foetal development.'],
      exit: ['Sperm vs ovum count.', 'LH surge.', 'Site of fertilisation.'], homework: 'Compare spermatogenesis and oogenesis in a table.'
    },
    slides: [{ t: 'Human Reproduction', b: ['Reproductive systems', 'Gametogenesis', 'Menstrual cycle', 'Fertilisation to birth'] }, { t: 'Think and share', b: ['Why do polar bodies form?', 'Why is colostrum important?'] }],
    fs: { groups: [['Gametogenesis', [['Male', '1 → 4 sperms, puberty on'], ['Female', '1 → 1 ovum, starts in foetus'], ['Control', 'GnRH → LH, FSH']]], ['Cycle', [['Days 1–5', 'menstruation'], ['Day 14', 'ovulation (LH)'], ['Luteal', 'progesterone']]], ['Pregnancy', [['Fertilisation', 'ampulla'], ['Implantation', 'endometrium'], ['Hormones', 'hCG, hPL, oxytocin']]]],
      ex: [['50 spermatocytes', '200 sperms'], ['50 oocytes', '50 ova']], rem: ['Meiosis II after entry.', 'LH surge day 14.', 'Colostrum IgA.'] }
  });
})();
