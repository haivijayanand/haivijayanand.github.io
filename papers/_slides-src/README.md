# Slide decks for the Technical Papers

Two PowerPoint decks per paper, built on the VA A4 landscape template v2 (`/assets/templates/`), saved in `papers/ppt/`:

- `<slug>-talk.pptx` — 20 slides for a 15-minute talk (title, outline, 15 content slides, conclusions, key references, thank you). Content is written by hand in `specs/<slug>.txt`.
- `<slug>-detailed.pptx` — teaching deck generated from the paper: section dividers, salient points, every figure, equation and table (long tables split), worked examples, kurals, code listings and the full reference list. The paper's own text is in the speaker notes.

Rebuild (needs python-pptx, Pillow, beautifulsoup4, playwright + chromium; template at /home/claude/va_tpl/):

    python3 extract.py            # papers/<slug>.html -> /home/claude/work/<slug>/blocks.json + equation/figure snapshots
    python3 detailed.py           # teaching decks
    python3 crisp.py              # 20-slide talk decks from specs/*.txt
    ./qa_all.sh talk              # render for visual QA (LibreOffice)
    python3 ../_build.py --no-pdf # refresh paper pages so they link the decks

Spec format (`specs/<slug>.txt`): `@sub`, `@outline a | b`, `@tnotes`; slides start with
`B:` bullets, `F: heading | figN` (figure; with bullets it goes beside or above), `E: heading | eqN,eqM` + `W:` where-text,
`T: heading | tabN | rows=0-5 | cols=0,2 | note=...`, `K: heading | key number | figN`, `2:` two columns (`L:`/`R:`),
`V: heading | kural numbers`, `C:` conclusions + `FW:` future work, `REF: 1,3,5`. `N:` gives the speaker notes.
