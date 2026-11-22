#!/usr/bin/env python3
"""
TOOL:    _scripts/fix_cbse_meta.py — search descriptions for the CBSE class hubs and revision kits
FAMILY:  SITE
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    Publicity - how people find the site on Google / GitHub; link previews and search tags site-wide
CHANGES: 1.0.0 - first release: class hubs I–XII get their own description (eight of them carried the Class IX text),
                 every kit index page gets a description (they had none); each changed file's header is bumped
STATUS:  working

Run from the repo root (dry run by default):
    python3 _scripts/fix_cbse_meta.py [--apply]
Safe to run again: a page whose description already matches is left alone.
"""
__version__ = "1.0.0"

import argparse
import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "_firebase"))
from add_progress_tag import bump_header  # noqa: E402

NOTE = "search description rewritten for Google and link previews"
DESC = re.compile(r'<meta\s+name="description"\s+content="[^"]*"\s*/?>', re.I)


def set_desc(text: str, desc: str) -> str | None:
    tag = f'<meta name="description" content="{html.escape(desc, quote=True)}">'
    if tag in text:
        return None
    if DESC.search(text):
        return DESC.sub(lambda _: tag, text, count=1)
    t = re.search(r"</title\s*>", text, re.I)
    return text[: t.end()] + "\n" + tag + text[t.end():] if t else None


def hubs():
    for g in json.loads((ROOT / "_data" / "sections.json").read_text(encoding="utf-8"))["groups"]:
        for s in g.get("subgroups", [g]):
            for i in s["items"]:
                if re.fullmatch(r"class\d+", i["folder"]):
                    subj = i["title"].split("—", 1)[1].strip() if "—" in i["title"] else i["name"]
                    yield ROOT / i["folder"] / "index.html", (
                        f"Free CBSE {i['name'].replace(' Study', '')} revision and teaching kits — {subj}: chapter notes, "
                        f"interactive figures, practice worksheets with answers, quizzes, lesson plans, slides and offline zips.")


def kits():
    for cfg in sorted(ROOT.glob("class*/*/chapters/config.js")):
        kit = cfg.parent.parent
        c = cfg.read_text(encoding="utf-8")
        short = re.search(r"short:\s*'([^']+)'", c).group(1)
        brand = re.search(r"brandSmall:\s*'([^']+)'", c).group(1).split(" · ")
        book = ", ".join(b for b in brand if "Kit" not in b) or "NCERT"
        n = len(list((kit / "chapters").glob("ch[0-9][0-9].js")))
        yield kit / "index.html", (
            f"{short} ({book}) for CBSE: revision notes for all {n} chapters, interactive figures, practice worksheets "
            f"with answers, quizzes, lesson plans and slides for teachers. Free, works offline.")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true")
    a = ap.parse_args()
    n = 0
    for page, desc in list(hubs()) + list(kits()):
        if not page.exists():
            continue
        text = page.read_text(encoding="utf-8")
        new = set_desc(text, desc)
        if new is None:
            continue
        new, _ = bump_header(new, NOTE)
        n += 1
        print(f"{page.relative_to(ROOT)}: {desc}")
        if a.apply:
            page.write_text(new, encoding="utf-8")
    print(f"{n} pages {'updated' if a.apply else 'to update'}")


if __name__ == "__main__":
    main()
