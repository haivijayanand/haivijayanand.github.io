# llb-build — Law Study explorer builder (B.A. LL.B. and B.Com. LL.B.)

Builds the course pages in `tools/` from one content file per course.

- `build.py` — copies the shared engine, CSS and revision views (flashcards, quiz, cases, brief builder) from `tools/llb-law-of-torts.html`, adds the course content, and writes `tools/llb-<slug>.html`.
- `<course>/course.json` — title, slug, storage key, version, CHANGES lines; optional `prog` ("ba" or "bcom", default bcom), `shared` (course common to both programmes), `chat`, `pre` (helper files placed before the content), `css`, `css2`.
- `<course>/content.js` — UNITS, EXTRAS, FLASH, CASES, QUIZ …, then `//@@VIEWS`, then the home, unit, extra and reference views.
- `ba-helpers.js` — shared helpers for the B.A. LL.B. pages: home page from `HOME`, footer from `FOOT`, ordering lab, flow and ring animations.
- `common.css`, `econ.css` — extra styles (SVG labels, graphs).
- `syllabus2.py` — makes `tools/llb-sem2-syllabus.pdf` (B.Com. LL.B. Semester II).
- `syllabus_ba.py` — makes `tools/llb-ba-sem1-syllabus.pdf` and `tools/llb-ba-sem2-syllabus.pdf`, reading unit lists from the pages themselves.
- Progress bar and certificate come from `assets/js/llb-progress.js`, loaded by every explorer. Shared courses (Legal Methods, Torts, Sociology I, Contracts I, Family Law I) carry `data-shared="1"` and take the programme from `?prog=ba|bcom` or the reader's last choice.

B.A. LL.B. folders: `ba-english1`, `ba-polsci1`, `ba-econ1` (Semester I); `ba-english2`, `ba-polsci2`, `ba-soc2`, `ba-history1` (Semester II).
B.Com. LL.B. Semester II folders: `contracts`, `family`, `economics`, `research`, `marketing`, `english`.

To revise a course: edit its content.js, bump `version` and add a line to `changes` in course.json, then run
`python3 _scripts/llb-build/build.py _scripts/llb-build/<course>/course.json`.
Jekyll ignores folders starting with "_", so nothing here is published.
