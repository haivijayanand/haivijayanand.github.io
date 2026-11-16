"""
TOOL: add_progress_tag.py — add the site-progress script line to standalone HTML pages in the GitHub Pages repo
FAMILY: site-progress
VERSION: 1.0.0
DATE: 2026-11-16
CHAT: Login, progress & certificates on GitHub Pages with Firebase
CHANGES: 1.0.0 — first release: dry run by default, --apply to write, skips Jekyll pages and pages already tagged, optional --index markers

Usage (run from the repo root):
    python add_progress_tag.py book-review life-books            # dry run: lists what would change
    python add_progress_tag.py book-review life-books --apply    # writes the changes
    python add_progress_tag.py book-review --apply --index book-review/index.html
        --index also marks that page's main list for badges and adds a "x / y completed" line
"""
__version__ = "1.0.0"

import argparse
import re
import sys
from pathlib import Path

TAG = '<script type="module" src="/assets/js/site-progress.js"></script>'
MARK = "site-progress.js"


def has_front_matter(text: str) -> bool:
    """Pages starting with '---' go through a Chirpy layout, which already loads the script."""
    return text.lstrip("﻿").startswith("---")


def add_tag(text: str) -> str | None:
    if MARK in text or has_front_matter(text):
        return None
    for pat in (r"</head\s*>", r"</body\s*>"):
        m = re.search(pat, text, re.I)
        if m:
            return text[: m.start()] + "  " + TAG + "\n" + text[m.start():]
    return text + "\n" + TAG + "\n"


def add_index_markers(text: str, series: str) -> str:
    """Add data-sp-index to the first <main>/<article>/<body> and a counter line after the first <h1>."""
    if "data-sp-index" not in text:
        text, n = re.subn(r"<(main|article)(\s|>)", r"<\1 data-sp-index\2", text, count=1, flags=re.I)
        if n == 0:
            text = re.sub(r"<body(\s|>)", r"<body data-sp-index\1", text, count=1, flags=re.I)
    if "data-sp-count" not in text:
        line = (f'\n<p><span data-sp-count="{series}"></span> &nbsp; '
                f'<span data-sp-continue="{series}"></span></p>')
        text = re.sub(r"(</h1\s*>)", r"\1" + line, text, count=1, flags=re.I)
    return text


def main() -> int:
    ap = argparse.ArgumentParser(description="Add the site-progress script line to standalone HTML pages.")
    ap.add_argument("folders", nargs="+", help="folders (relative to repo root) to scan, e.g. book-review")
    ap.add_argument("--apply", action="store_true", help="write changes (default is a dry run)")
    ap.add_argument("--index", action="append", default=[], help="index page(s) to mark for badges and counts")
    a = ap.parse_args()

    changed = skipped = 0
    for folder in a.folders:
        root = Path(folder)
        if not root.is_dir():
            print(f"!! not a folder: {root}")
            continue
        for f in sorted(root.rglob("*.htm*")):
            text = f.read_text(encoding="utf-8", errors="surrogateescape")
            new = add_tag(text)
            if new is None:
                skipped += 1
                continue
            changed += 1
            print(("  write " if a.apply else "  would add ") + str(f))
            if a.apply:
                f.write_text(new, encoding="utf-8", errors="surrogateescape")

    for idx in a.index:
        f = Path(idx)
        if not f.is_file():
            print(f"!! index page not found: {f}")
            continue
        series = f.parts[0] if len(f.parts) > 1 else f.stem
        text = f.read_text(encoding="utf-8", errors="surrogateescape")
        new = add_index_markers(text, series)
        if new != text:
            print(("  mark index " if a.apply else "  would mark index ") + str(f))
            if a.apply:
                f.write_text(new, encoding="utf-8", errors="surrogateescape")

    print(f"\n{changed} page(s) {'updated' if a.apply else 'to update'}, {skipped} already tagged or Jekyll pages.")
    if not a.apply:
        print("Dry run only. Add --apply to write the changes.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
