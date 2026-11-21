#!/usr/bin/env python3
"""
TOOL:    _scripts/build_search_index.py — site search index + side-panel data for the standalone HTML pages
FAMILY:  SITE
VERSION: 1.2.0
DATE:    2026-11-21
CHAT:    GitHub home page layout change - classify into sections for better readability and browsing
CHANGES: 1.2.0 - section names now come from _data/sections.json (the sidebar shows five groups, not one tab per section)
         1.1.0 - also writes _data/site_panel.json: Recently Added (date each page first entered git, posts + pages, max 2
                 per section) and Trending Topics (sections ranked by pages added in the last 30 days); bulk
                 site-wide edits therefore do not reshuffle either list
         1.0.0 - first version: walks every public .html page (tools, courses, series, papers, reviews),
                 writes _data/search_pages.json; assets/js/data/search.json merges it with the posts

The Chirpy search only knows Jekyll posts. Everything else on this site is a plain HTML page, so it is
invisible to the search box. Run this before `jekyll build` (the Pages workflow does it on every push):
    python3 _scripts/build_search_index.py
"""
__version__ = "1.2.0"

import datetime as dt
import json
import re
import subprocess
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "_data" / "search_pages.json"
PANEL = ROOT / "_data" / "site_panel.json"
RECENT_MAX, RECENT_PER_SECTION, TRENDING_MAX, TRENDING_DAYS = 8, 2, 12, 30
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
    """folder -> short section name, from _data/sections.json (groups -> [subgroups ->] items)"""
    names = {}
    for g in json.loads((ROOT / "_data" / "sections.json").read_text(encoding="utf-8"))["groups"]:
        for s in g.get("subgroups", [g]):
            for i in s["items"]:
                names[i["folder"]] = i["name"]
    return names


def git_dates():
    """file -> date it was first committed (needs full history; the Pages workflow checks out with fetch-depth 0)"""
    out = subprocess.run(["git", "-C", str(ROOT), "log", "--format=@%cI", "--name-only", "--no-renames", "HEAD"],
                         capture_output=True, text=True).stdout
    dates, cur = {}, None
    for line in out.splitlines():
        if line.startswith("@"):
            cur = dt.datetime.fromisoformat(line[1:])
        elif line:
            dates[line] = cur          # log runs newest first, so the last write is the oldest commit
    return dates


def posts(dates):
    """Jekyll posts (default permalink /YYYY/MM/DD/slug.html)"""
    out = []
    for f in sorted((ROOT / "_posts").glob("*.md")):
        m = re.match(r"(\d{4})-(\d{2})-(\d{2})-(.+)\.md$", f.name)
        t = re.search(r"^title:\s*(.+)$", f.read_text(encoding="utf-8"), re.M)
        if m and t:
            y, mo, d, slug = m.groups()
            out.append({"title": t.group(1).strip().strip("'\""), "url": f"/{y}/{mo}/{d}/{slug}.html",
                        "section": "Papers & Articles", "folder": "papers",
                        "date": dates.get(f"_posts/{f.name}") or dt.datetime(int(y), int(mo), int(d), tzinfo=dt.timezone.utc)})
    return out


def short(title):
    """drop the trailing ' — Section name' part for the narrow side panel"""
    head, sep, _ = title.rpartition(" — ")
    return head if sep and len(head) > 8 else title


def panel(items, names):
    now = max(i["date"] for i in items)
    recent, per = [], {}
    for i in sorted(items, key=lambda i: (i["date"], i["url"]), reverse=True):
        if per.get(i["section"], 0) < RECENT_PER_SECTION:
            per[i["section"]] = per.get(i["section"], 0) + 1
            recent.append({"title": short(i["title"]), "url": i["url"], "section": i["section"], "date": i["date"].date().isoformat()})
        if len(recent) == RECENT_MAX:
            break
    hot, total = {}, {}
    for i in items:
        total[i["folder"]] = total.get(i["folder"], 0) + 1
        if (now - i["date"]).days <= TRENDING_DAYS:
            hot[i["folder"]] = hot.get(i["folder"], 0) + 1
    order = sorted(total, key=lambda f: (hot.get(f, 0), total[f]), reverse=True)[:TRENDING_MAX]
    trending = [{"name": names.get(f, f.replace("-", " ").title()), "url": f"/{f}/", "count": total[f]} for f in order]
    PANEL.write_text(json.dumps({"recent": recent, "trending": trending}, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"side panel: {len(recent)} recent, {len(trending)} topics -> {PANEL.relative_to(ROOT)}")


def main():
    names = section_names()
    dates = git_dates()
    pages, items = [], posts(dates)
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
        if not (len(parts) == 2 and parts[1] == "index.html"):      # section landing pages are not "updates"
            items.append({"title": title, "url": url, "section": section, "folder": parts[0],
                          "date": dates.get(rel.as_posix()) or dt.datetime.fromtimestamp(f.stat().st_mtime, dt.timezone.utc)})
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps(pages, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"search index: {len(pages)} pages, {OUT.stat().st_size // 1024} KB -> {OUT.relative_to(ROOT)}")
    panel(items, names)


if __name__ == "__main__":
    main()
