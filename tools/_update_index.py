#!/usr/bin/env python3
"""
TOOL:    _update_index.py
FAMILY:  SITE
VERSION: 1.0.0
DATE:    2026-10-01
CHAT:    Offline HTML inventory and online links
CHANGES: 1.0.0 - writes each tool's VERSION and DATE (read from its header block) into tools/index.html
STATUS:  working

Run from anywhere:  python3 tools/_update_index.py
Jekyll skips files that start with "_", so this script is not published.
"""
__version__ = "1.0.0"

import datetime as dt
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
INDEX = HERE / "index.html"
LINK = re.compile(r'(<a class="tool" href="([^"]+)"><b>[^<]*</b>)(<span class="meta">[^<]*</span>)?')


def header_field(path, key):
    head = path.read_text(encoding="utf-8", errors="replace")[:4000]
    m = re.search(r"^\s*" + key + r"\s*:\s*(.+?)\s*$", head, re.M)
    return m.group(1) if m else ""


def pretty(d):
    try:
        return dt.date.fromisoformat(d).strftime("%d %b %Y").lstrip("0")
    except ValueError:
        return d


def main():
    t = INDEX.read_text(encoding="utf-8")
    missing = []

    def repl(m):
        f = HERE / m.group(2)
        if not f.exists():
            missing.append(m.group(2))
            return m.group(1)
        v, d = header_field(f, "VERSION"), header_field(f, "DATE")
        meta = " · ".join(x for x in ("v" + v if v else "", "updated " + pretty(d) if d else "") if x)
        return m.group(1) + ('<span class="meta">' + meta + "</span>" if meta else "")

    t = LINK.sub(repl, t)
    INDEX.write_text(t, encoding="utf-8")
    print("index updated" + (" · missing: " + ", ".join(missing) if missing else ""))


if __name__ == "__main__":
    main()
