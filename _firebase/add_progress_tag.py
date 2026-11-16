"""
TOOL: add_progress_tag.py — add the site-progress script line to standalone HTML pages in the GitHub Pages repo
FAMILY: site-progress
VERSION: 1.1.0
DATE: 2026-11-16
CHAT: Login, progress & certificates on GitHub Pages with Firebase
CHANGES: 1.1.0 — bumps each tagged page's own header (VERSION patch +1, DATE, new CHANGES line) when it has one; --note sets the CHANGES text; also skips files under _ folders
         1.0.0 — first release: dry run by default, --apply to write, skips Jekyll pages and pages already tagged, optional --index markers

Usage (run from the repo root):
    python add_progress_tag.py book-review life-books            # dry run: lists what would change
    python add_progress_tag.py book-review life-books --apply    # writes the changes
    python add_progress_tag.py book-review --apply --index book-review/index.html
        --index also marks that page's main list for badges and adds a "x / y completed" line
"""
__version__ = "1.1.0"

import argparse
from datetime import date
import re
import sys
from pathlib import Path

TAG = '<script type="module" src="/assets/js/site-progress.js"></script>'
MARK = "site-progress.js"


NOTE = "loads assets/js/site-progress.js (sign-in, reading progress, activity log)"


def bump_header(text: str, note: str, part: str = "patch") -> tuple[str, bool]:
    """Bump the standard header near the top: VERSION (patch or minor), DATE, and a new first CHANGES entry
    written in the same style as the existing one (v-prefix, separator, alignment). Returns (text, bumped?)."""
    head_end = text.find("-->") if "-->" in text[:4000] else text.find("endcomment")
    if head_end < 0 or head_end > 6000:
        return text, False
    head, rest = text[:head_end], text[head_end:]
    m = re.search(r"(VERSION\s*:\s*)(\d+)\.(\d+)\.(\d+)", head)
    if not m:
        return text, False
    a, b, c = int(m.group(2)), int(m.group(3)), int(m.group(4))
    new = f"{a}.{b + 1}.0" if part == "minor" else f"{a}.{b}.{c + 1}"
    head = head[:m.start()] + m.group(1) + new + head[m.end():]
    head = re.sub(r"(DATE\s*:\s*)\d{4}-\d{2}-\d{2}", lambda k: k.group(1) + date.today().isoformat(), head, count=1)
    cm = re.search(r"^([ \t]*CHANGES\s*:\s*)(v?)\d+\.\d+\.\d+(\s*(?:[-\u2014:]\s*)?)", head, re.M)
    if cm:
        sep = cm.group(3) if cm.group(3).strip() or len(cm.group(3)) > 1 else "  "
        entry = f"{cm.group(2)}{new}{sep}{note}\n{' ' * len(cm.group(1).expandtabs())}"
        head = head[:cm.end(1)] + entry + head[cm.end(1):]
    return head + rest, True


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
    ap.add_argument("--note", default=NOTE, help="CHANGES text for the header bump")
    ap.add_argument("--no-bump", action="store_true", help="do not touch page headers (e.g. pages a generator rebuilds)")
    a = ap.parse_args()

    changed = skipped = 0
    for folder in a.folders:
        root = Path(folder)
        if not root.is_dir():
            print(f"!! not a folder: {root}")
            continue
        for f in sorted(root.rglob("*.htm*")):
            if any(part.startswith("_") for part in f.parts):
                continue
            text = f.read_text(encoding="utf-8", errors="surrogateescape")
            new = add_tag(text)
            if new is None:
                skipped += 1
                continue
            bumped = False
            if not a.no_bump:
                new, bumped = bump_header(new, a.note)
            changed += 1
            print(("  write " if a.apply else "  would add ") + str(f) + ("  (header bumped)" if bumped else ""))
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
