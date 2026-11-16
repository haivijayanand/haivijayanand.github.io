#!/usr/bin/env python3
"""
TOOL:    _scripts/build_search_index.py — site search index for the standalone HTML pages
FAMILY:  SITE
VERSION: 1.0.0
DATE:    2026-11-16
CHAT:    Combine Engineering Articles with Technical Papers (home search not searching fully)
CHANGES: 1.0.0 - first version: walks every public .html page (tools, courses, series, papers, reviews),
                 writes _data/search_pages.json; assets/js/data/search.json merges it with the posts

The Chirpy search only knows Jekyll posts. Everything else on this site is a plain HTML page, so it is
invisible to the search box. Run this before `jekyll build` (the Pages workflow does it on every push):
    python3 _scripts/build_search_index.py
"""
__version__ = "1.0.0"

import json
import re
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "_data" / "search_pages.json"
SKIP_DIRS = {"assets", "node_modules", "vendor", ".git", ".github"}
SKIP_PAGES = {"my-progress", "verify"}          # account pages, nothing to find
BODY_CHARS = 900                                  # text kept per page, after headings


class Extract(HTMLParser):
    SKIP = {"script", "style", "noscript", "svg", "nav", "template", "head", "button", "select", "option"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title, self.desc, self.heads, self.body = "", "", [], []
        self.redirect = False
        self._skip, self._in_title, self._head = 0, False, None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "meta":
            if (a.get("name") or "").lower() == "description":
                self.desc = a.get("content") or ""
            if (a.get("http-equiv") or "").lower() == "refresh":
                self.redirect = True
        if tag == "title":
            self._in_title = True
        if tag in self.SKIP:
            self._skip += 1
        if tag in ("h1", "h2", "h3") and not self._skip:
            self._head = []

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False
        if tag in self.SKIP and self._skip:
            self._skip -= 1
        if tag in ("h1", "h2", "h3") and self._head is not None:
            h = " ".join(" ".join(self._head).split())
            if h:
                self.heads.append(h)
            self._head = None

    def handle_data(self, data):
        if self._in_title:
            self.title += data
            return
        if self._skip:
            return
        if self._head is not None:
            self._head.append(data)
        self.body.append(data)


def section_names():
    """folder -> sidebar tab title, from _tabs/<folder>.md"""
    names = {}
    for t in (ROOT / "_tabs").glob("*.md"):
        m = re.search(r"^title:\s*(.+)$", t.read_text(encoding="utf-8"), re.M)
        if m:
            names[t.stem] = m.group(1).strip().strip("'\"")
    return names


def main():
    names = section_names()
    pages = []
    for f in sorted(ROOT.rglob("*.html")):
        rel = f.relative_to(ROOT)
        parts = rel.parts
        if any(p.startswith(("_", ".")) for p in parts) or parts[0] in SKIP_DIRS or parts[0] in SKIP_PAGES:
            continue
        if len(parts) == 1:          # root-level html (none expected)
            continue
        text = f.read_text(encoding="utf-8", errors="replace")
        if text.lstrip().startswith("---"):   # Jekyll page with front matter: let Jekyll handle it
            continue
        p = Extract()
        try:
            p.feed(text)
        except Exception as e:          # malformed page: index what we got
            print(f"  warn {rel}: {e}")
        if p.redirect:
            continue
        title = " ".join(p.title.split())
        title = re.sub(r"\s+[—|–-]\s+K Vijay Anand$", "", title) or (p.heads[0] if p.heads else f.stem)
        body = " ".join(" ".join(p.body).split())
        heads = " · ".join(dict.fromkeys(p.heads))
        url = "/" + rel.as_posix()
        if url.endswith("/index.html"):
            url = url[: -len("index.html")]
        section = names.get(parts[0], parts[0].replace("-", " ").title())
        snippet = p.desc or body[:200]
        pages.append({
            "title": title,
            "url": url,
            "categories": section,
            "tags": "",
            "snippet": snippet[:200] + ("…" if len(snippet) > 200 else ""),
            "content": f"{p.desc} {heads} {body[:BODY_CHARS]}".strip(),
        })
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps(pages, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"search index: {len(pages)} pages, {OUT.stat().st_size // 1024} KB -> {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
