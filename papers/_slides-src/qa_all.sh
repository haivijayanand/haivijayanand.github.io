#!/bin/bash
# TOOL:    qa_all.sh
# FAMILY:  papers-presentations
# VERSION: 1.0.0
# DATE:    2026-11-28
# CHAT:    Technical papers - crisp and detailed teaching presentations
# CHANGES: 1.0.0 - renders decks to PDF/JPG (LibreOffice + pdftoppm) and makes 20-slide grids for visual QA
# render every deck in papers/ppt to /tmp/qa/<name>/ grids
for f in /home/claude/haivijayanand.github.io/papers/ppt/*$1*.pptx; do
  n=$(basename $f .pptx); /home/claude/decksrc/qa.sh $f $n 45 >/dev/null 2>&1; echo "$n $(ls /tmp/qa/$n/s-*.jpg 2>/dev/null | wc -l)"
done
