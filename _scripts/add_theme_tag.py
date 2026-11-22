#!/usr/bin/env python3
"""
TOOL:    _scripts/add_theme_tag.py — add the site-wide light / dark theme script to standalone HTML pages and page builders
FAMILY:  SITE
VERSION: 1.1.0
DATE:    2026-11-22
CHAT:    Make light theme by default in home page also; give option to change light / dark theme in every individual page
CHANGES: 1.1.0 - eigen/_src/build.py added to the page builders
         1.0.0 - first release: puts <script src="/assets/js/site-theme.js"></script> right after <head> of every standalone
                 page (and in the <head> templates of the page builders), bumping each file's own header; dry run by default
STATUS:  working

Usage (from the repo root):
    python3 _scripts/add_theme_tag.py            # dry run: lists what would change
    python3 _scripts/add_theme_tag.py --apply    # writes the changes
Skips Jekyll pages (front matter: the Chirpy layout loads the script), redirect stubs, files under _ folders, and pages
that already load it. Run again after adding a new section; pages made by a builder get the tag from the builder.
"""
__version__ = "1.1.0"

import argparse
import re
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "_firebase"))
from add_progress_tag import bump_header  # noqa: E402  (the site's header-bump rule, same style everywhere)

TAG = '<script src="/assets/js/site-theme.js"></script>'
MARK = "site-theme.js"
NOTE = "loads assets/js/site-theme.js (light by default, one light / dark choice for the whole site)"
HEAD = re.compile(r"<head(\s[^>]*)?>", re.I)
SKIP_TOP = {".git", ".github", "assets", "node_modules", "vendor"}
BUILDERS = ["book-review/_build.py", "life-books/_build.py", "papers/_build.py", "speaks/_build.py",
            "business-admin/_src/build.py", "software-history/_src/build.py", "solidworks/_src/build.py",
            "creo/_src/build.py", "machine-design/_src/build.py", "manufacturing/_src/build.py",
            "differential-equations/_src/build.py", "differential-equations-2/_src/build.py", "eigen/_src/build.py",
            "tools/_update_index.py"]


def add_after_head(text: str) -> str | None:
    if MARK in text:
        return None
    m = HEAD.search(text)
    if not m:
        return None
    return text[:m.end()] + "\n" + TAG + text[m.end():]


def bump_py(text: str) -> str:
    """Python builders: header in the module docstring + __version__ kept in step (minor bump)."""
    m = re.search(r"(VERSION\s*:\s*)(\d+)\.(\d+)\.(\d+)", text[:4000])
    if not m:
        return text
    new = f"{m.group(2)}.{int(m.group(3)) + 1}.0"
    text = text[:m.start()] + m.group(1) + new + text[m.end():]
    text = re.sub(r"(DATE\s*:\s*)\d{4}-\d{2}-\d{2}", lambda k: k.group(1) + date.today().isoformat(), text, count=1)
    cm = re.search(r"^([ \t]*CHANGES\s*:\s*)(v?)\d+\.\d+\.\d+(\s*(?:[-—:]\s*)?)", text, re.M)
    if cm:
        sep = cm.group(3) if cm.group(3).strip() else " - "
        text = text[:cm.end(1)] + f"{cm.group(2)}{new}{sep}every page loads assets/js/site-theme.js (site-wide light / dark)\n" \
            + " " * len(cm.group(1).expandtabs()) + text[cm.end(1):]
    text = re.sub(r'^__version__\s*=\s*"[^"]*"', f'__version__ = "{new}"', text, count=1, flags=re.M)
    return text


def pages():
    for f in sorted(ROOT.rglob("*.html")):
        rel = f.relative_to(ROOT)
        if rel.parts[0] in SKIP_TOP or any(p.startswith("_") for p in rel.parts):
            continue
        yield f, rel


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[1])
    ap.add_argument("--apply", action="store_true", help="write the changes (default: dry run)")
    a = ap.parse_args()
    n = skipped = 0
    for f, rel in pages():
        text = f.read_text(encoding="utf-8", errors="surrogateescape")
        if text.lstrip("﻿").startswith("---"):
            continue
        if re.search(r'http-equiv\s*=\s*["\']refresh', text, re.I):
            continue
        new = add_after_head(text)
        if new is None:
            skipped += MARK not in text
            continue
        new, _ = bump_header(new, NOTE)
        n += 1
        if a.apply:
            f.write_text(new, encoding="utf-8", errors="surrogateescape")
    print(f"pages: {n} {'tagged' if a.apply else 'to tag'}" + (f", {skipped} without a <head> (left alone)" if skipped else ""))

    for b in BUILDERS:
        p = ROOT / b
        if not p.exists():
            continue
        text = p.read_text(encoding="utf-8")
        if MARK in text or not HEAD.search(text):
            continue
        new = HEAD.sub(lambda m: m.group(0) + "\n" + TAG, text)
        new = bump_py(new)
        print(f"builder: {b} ({len(HEAD.findall(text))} <head> template(s))")
        if a.apply:
            p.write_text(new, encoding="utf-8")


if __name__ == "__main__":
    main()
