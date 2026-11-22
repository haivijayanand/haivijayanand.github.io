#!/usr/bin/env python3
"""
TOOL:    _scripts/seo_tags.py — search and link-preview tags for the standalone HTML pages of the built site
FAMILY:  SITE
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    Publicity - how people find the site on Google / GitHub; link previews and search tags site-wide
CHANGES: 1.0.0 - first release: adds description (when missing), canonical URL, Open Graph and Twitter card tags,
                 section preview image, and noindex for account pages, to every plain HTML page in _site
STATUS:  working

Chirpy pages (posts, tabs, home) get these tags from jekyll-seo-tag. The ~950 plain HTML pages (courses, tools,
papers, essays, CBSE kits) do not go through a layout, so they had no description for Google and no preview card
when shared on WhatsApp, Telegram, LinkedIn or X. This script fixes that in the BUILT site only:

    bundle exec jekyll build && python3 _scripts/seo_tags.py _site

The Pages workflow (.github/workflows/jekyll.yml) runs it after `jekyll build`, so source files and page builders
stay untouched and every rebuilt or newly added page is covered automatically. Running it twice changes nothing.
"""
__version__ = "1.0.0"

import html
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

SITE_URL = "https://haivijayanand.github.io"
SITE_NAME = "K Vijay Anand"
AUTHOR = "K Vijay Anand"
NOINDEX = {"my-progress", "verify"}             # sign-in and certificate-check pages: nothing for search engines
MARK = "<!-- seo_tags.py -->"
DESC_MAX = 160


class Meta(HTMLParser):
    """Reads <title>, an existing description / canonical / og:title, the first <h1> and the first real paragraph."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = self.h1 = self.para = self.desc = ""
        self.canonical = self.og = self.redirect = False
        self._in = None
        self._buf = []
        self._skip = 0

    def handle_starttag(self, tag, attrs):
        a = {k.lower(): (v or "") for k, v in attrs}
        if tag in ("script", "style", "nav", "header", "footer", "aside"):
            self._skip += 1
        elif tag == "meta":
            name = (a.get("name") or a.get("property") or "").lower()
            if name == "description":
                self.desc = a.get("content", "").strip()
            elif name == "og:title":
                self.og = True
            elif a.get("http-equiv", "").lower() == "refresh":
                self.redirect = True
        elif tag == "link" and a.get("rel", "").lower() == "canonical":
            self.canonical = True
        elif tag in ("title", "h1", "p") and not self._skip and self._in is None:
            if (tag == "title" and not self.title) or (tag == "h1" and not self.h1) or (tag == "p" and not self.para):
                self._in, self._buf = tag, []

    def handle_endtag(self, tag):
        if tag in ("script", "style", "nav", "header", "footer", "aside") and self._skip:
            self._skip -= 1
        elif tag == self._in:
            text = " ".join("".join(self._buf).split())
            if tag == "title":
                self.title = text
            elif tag == "h1":
                self.h1 = text
            elif len(text) >= 40:
                self.para = text
            self._in = None

    def handle_data(self, data):
        if self._in:
            self._buf.append(data)


def clip(text: str, n: int = DESC_MAX) -> str:
    text = " ".join(text.split())
    if len(text) <= n:
        return text
    cut = text[:n - 1].rsplit(" ", 1)[0].rstrip(",;:—-")
    return cut + "…"


def page_url(rel: Path) -> str:
    u = "/" + rel.as_posix()
    return SITE_URL + (u[: -len("index.html")] if u.endswith("/index.html") else u)


def tags_for(rel: Path, m: Meta, site: Path) -> str:
    title = re.sub(r"\s+[—|–-]\s+K Vijay Anand$", "", m.title) or m.h1 or rel.stem.replace("-", " ").title()
    desc = m.desc or clip(m.para or m.h1 or title)
    url = page_url(rel)
    folder = rel.parts[0] if len(rel.parts) > 1 else ""
    img = f"/assets/img/og/{folder}.png" if (site / "assets" / "img" / "og" / f"{folder}.png").exists() else "/assets/img/og/default.png"
    e = lambda s: html.escape(s, quote=True)
    out = [MARK]
    if folder in NOINDEX:
        out.append('<meta name="robots" content="noindex">')
    if not m.desc:
        out.append(f'<meta name="description" content="{e(desc)}">')
    out.append(f'<meta name="author" content="{e(AUTHOR)}">')
    if not m.canonical:
        out.append(f'<link rel="canonical" href="{e(url)}">')
    out += [
        f'<meta property="og:site_name" content="{e(SITE_NAME)}">',
        f'<meta property="og:type" content="{"website" if rel.name == "index.html" else "article"}">',
        f'<meta property="og:title" content="{e(title)}">',
        f'<meta property="og:description" content="{e(desc)}">',
        f'<meta property="og:url" content="{e(url)}">',
        f'<meta property="og:image" content="{SITE_URL}{img}">',
        '<meta property="og:image:width" content="1200">',
        '<meta property="og:image:height" content="630">',
        '<meta name="twitter:card" content="summary_large_image">',
        f'<meta name="twitter:title" content="{e(title)}">',
        f'<meta name="twitter:description" content="{e(desc)}">',
        f'<meta name="twitter:image" content="{SITE_URL}{img}">',
    ]
    return "\n".join(out) + "\n"


def main():
    site = Path(sys.argv[1] if len(sys.argv) > 1 else "_site").resolve()
    if not site.is_dir():
        sys.exit(f"no built site at {site} — run `jekyll build` first")
    done = skipped = 0
    for f in sorted(site.rglob("*.html")):
        rel = f.relative_to(site)
        if rel.parts[0] == "assets" or len(rel.parts) == 1:          # root pages come from Chirpy layouts
            continue
        text = f.read_text(encoding="utf-8", errors="surrogateescape")
        if MARK in text:
            continue
        m = Meta()
        try:
            m.feed(text)
        except Exception:
            skipped += 1
            continue
        if m.og or m.redirect:                                        # Chirpy / jekyll-seo-tag page, or a redirect stub
            continue
        block = tags_for(rel, m, site)
        pos = re.search(r"</head\s*>", text, re.I)
        if pos:
            text = text[: pos.start()] + block + text[pos.start():]
        else:
            h = re.search(r"<head(\s[^>]*)?>", text, re.I)
            if not h:
                skipped += 1
                continue
            text = text[: h.end()] + "\n" + block + text[h.end():]
        f.write_text(text, encoding="utf-8", errors="surrogateescape")
        done += 1
    print(f"seo tags: {done} pages tagged" + (f", {skipped} skipped (no <head>)" if skipped else ""))


if __name__ == "__main__":
    main()
