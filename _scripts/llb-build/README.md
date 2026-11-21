# llb-build — B.Com. LL.B. explorer builder

Builds the Semester II course pages in `tools/` from one content file per course.

- `build.py` — copies the shared engine, CSS and revision views (flashcards, quiz, cases, brief builder) from `tools/llb-law-of-torts.html`, adds the course content, and writes `tools/llb-<slug>.html`.
- `<course>/course.json` — title, slug, storage key, version, CHANGES lines.
- `<course>/content.js` — UNITS, EXTRAS, FLASH, CASES, QUIZ …, then `//@@VIEWS`, then the home, unit, extra and reference views.
- `common.css`, `econ.css` — extra styles (SVG labels, graphs).
- `syllabus2.py` — makes `tools/llb-sem2-syllabus.pdf` (needs Playwright + Chromium).
- Progress bar and certificate come from `assets/js/llb-progress.js`, loaded by every explorer.

To revise a course: edit its content.js, bump `version` and add a line to `changes` in course.json, then run
`python3 _scripts/llb-build/build.py _scripts/llb-build/<course>/course.json`.
Jekyll ignores folders starting with "_", so nothing here is published.
