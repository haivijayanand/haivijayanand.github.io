#!/usr/bin/env python3
"""
TOOL:    speaks/_import_blogger.py
FAMILY:  SITE
VERSION: 1.0.0
DATE:    2026-10-05
CHAT:    Blogger to GitHub migration (Vijay Anand Speaks)
CHANGES: 1.0.0 - one-time import of a Google Takeout Blogger export into speaks/_content (JSON) and speaks/img (WebP)
STATUS:  working

Run:  python3 speaks/_import_blogger.py "<path to Takeout/Blogger>"
      then  python3 speaks/_build.py

What it does
  * reads Blogs/Vijay Anand Speaks . . ./feed.atom (posts only; Blogger comments are skipped)
  * matches each Blogger-hosted picture to the original upload in Albums/<blog>/ by upload time,
    so pages use the full-resolution originals rather than Blogger's 320/400 px copies
  * cleans the post HTML (Blogger/Google Docs styling, empty paragraphs, stray iframes)
  * marks posts that are mostly Tamil (lang "ta")
  * writes   speaks/_content/<yyyy>-<mm>-<slug>.json
             speaks/img/<yyyy>/<slug>-<n>.webp      full picture, long side at most 1600 px
             speaks/img/<yyyy>/<slug>-card.webp     1200 x 630 card: whole picture on a blurred copy of itself
             speaks/_import_report.txt               pictures that are small, missing or still remote
Needs:  pip install beautifulsoup4 pillow
Jekyll skips files that start with "_", so this script, the content folder and the report are not published.
"""
__version__ = "1.0.0"

import datetime as dt
import glob
import json
import os
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

from bs4 import BeautifulSoup, Comment, NavigableString
from PIL import Image, ImageFilter, ImageOps

BLOG = "Vijay Anand Speaks . . ."
HERE = Path(__file__).resolve().parent
CONTENT = HERE / "_content"
IMG = HERE / "img"
REPORT = HERE / "_import_report.txt"
IST = dt.timezone(dt.timedelta(hours=5, minutes=30))
NS = {"a": "http://www.w3.org/2005/Atom", "b": "http://schemas.google.com/blogger/2018"}

FULL_MAX = 1600            # long side of the in-page picture
CARD = (1200, 630)         # index card / social preview
SMALL = 800                # originals with a long side below this are listed in the report
MATCH_BEFORE = 3 * 3600    # an upload may precede the post's creation by up to 3 h ...
MATCH_AFTER = 15 * 60      # ... or follow its last update by up to 15 min

KEEP_ATTR = {"a": {"href"}, "td": {"colspan", "rowspan"}, "th": {"colspan", "rowspan"},
             "ol": {"start"}, "img": {"src", "alt"}}
DROP_TAGS = {"script", "style", "iframe", "noscript", "form", "input", "button", "meta", "link", "o:p"}
UNWRAP_TAGS = {"span", "font", "u", "center", "small", "big", "section", "article", "colgroup", "col",
               "header", "footer", "main", "aside", "nav"}


def ts(s):
    return dt.datetime.fromisoformat(s.replace("Z", "+00:00"))


def tamil_ratio(text):
    ta = sum(1 for ch in text if "஀" <= ch <= "௿")
    letters = sum(1 for ch in text if ch.isalpha())
    return ta / letters if letters else 0.0


def is_dead(url):
    # ChatGPT file links expire within hours; Blogger kept the dead link
    return "oaiusercontent.com" in url


# ---------------------------------------------------------------- album

def load_album(root):
    pics = []
    # every album: Blogger sometimes files an upload under another blog of the same account
    for j in glob.glob(str(root / "Albums" / "*" / "*.json")):
        if j.endswith("metadata.json"):
            continue
        f = j[:-5]
        if not os.path.exists(f):
            continue
        meta = json.load(open(j, encoding="utf-8"))
        try:
            with Image.open(f) as im:
                w, h = im.size
        except Exception:
            continue
        pics.append({"file": f, "t": int(meta["creationTimestampMs"]) / 1000, "w": w, "h": h, "used": None,
                     "own": Path(f).parent.name == BLOG})
    pics.sort(key=lambda p: p["t"])
    return pics


def match_album(posts, pics):
    """Give each Blogger-hosted <img> the album upload nearest the post's creation time."""
    order = sorted(posts, key=lambda p: p["created"])
    for p in order:
        urls = [u for u in p["img_urls"] if "googleusercontent.com" in u or "bp.blogspot.com" in u]
        lo, hi = p["created"] - MATCH_BEFORE, p["updated"] + MATCH_AFTER
        cands = [c for c in pics if c["used"] is None and lo <= c["t"] <= hi]
        cands.sort(key=lambda c: abs(c["t"] - p["created"]))
        chosen = sorted(cands[:len(urls)], key=lambda c: c["t"])   # upload order = order in the post
        for u, c in zip(urls, chosen):
            c["used"] = p["path"]
            p["matched"][u] = c


# ---------------------------------------------------------------- images

def save_full(src, dest):
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    im.thumbnail((FULL_MAX, FULL_MAX), Image.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "WEBP", quality=82, method=6)
    return im.size


def save_card(src, dest):
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    W, H = CARD
    bg = ImageOps.fit(im, CARD, Image.LANCZOS).filter(ImageFilter.GaussianBlur(28))
    bg = Image.blend(bg, Image.new("RGB", CARD, (18, 24, 22)), 0.35)
    fg = im.copy()
    fg.thumbnail(CARD, Image.LANCZOS)          # never enlarged
    bg.paste(fg, ((W - fg.width) // 2, (H - fg.height) // 2))
    bg.save(dest, "WEBP", quality=80, method=6)


# ---------------------------------------------------------------- HTML

def clean_html(raw, img_map):
    soup = BeautifulSoup(raw or "", "html.parser")
    for c in soup.find_all(string=lambda s: isinstance(s, Comment)):
        c.extract()
    for t in soup.find_all(DROP_TAGS):
        t.decompose()
    # Blogger's float-in "cap-" boxes and footers from copied pages
    for t in soup.find_all(class_=re.compile(r"^(cap-|blogger-post-footer|post-share|share-)")):
        t.decompose()

    # pictures: replace by <figure>, lift out of anchors / separators / headings
    for img in soup.find_all("img"):
        src = img.get("src", "")
        new = img_map.get(src)
        if new is None:          # dead link
            img.decompose()
            continue
        fig = soup.new_tag("figure")
        tag = soup.new_tag("img", src=new["src"], alt=img.get("alt", ""), loading="lazy")
        if new.get("w"):
            tag["width"], tag["height"] = str(new["w"]), str(new["h"])
        fig.append(tag)
        top = img
        while top.parent is not None and top.parent.name in ("a", "div", "span", "h1", "h2", "h3", "p", "b", "strong", "td", "tr", "tbody", "table") \
                and len(top.parent.get_text(strip=True)) == 0 and len(top.parent.find_all("img")) == 1:
            top = top.parent
        top.replace_with(fig)

    for t in soup.find_all(UNWRAP_TAGS):
        t.unwrap()
    # Google Docs pastes wrap everything in <b id="docs-internal-guid-...">
    for t in soup.find_all("b", id=re.compile("^docs-internal")):
        t.unwrap()
    # <div>: a container of blocks is unwrapped, a leaf <div> of text becomes a paragraph
    for t in reversed(soup.find_all("div")):
        if t.find(["p", "div", "h1", "h2", "h3", "h4", "ul", "ol", "table", "figure", "blockquote"]):
            t.unwrap()
        else:
            t.name = "p"
    for t in soup.find_all("h1"):
        t.name = "h2"
    for li in soup.find_all("li"):
        for p in li.find_all("p", recursive=False):
            p.unwrap()

    for t in soup.find_all(True):
        keep = KEEP_ATTR.get(t.name, set())
        if t.name == "img":
            keep = {"src", "alt", "loading", "width", "height"}
        t.attrs = {k: v for k, v in t.attrs.items() if k in keep}
        if t.name == "a" and t.get("href"):
            t["rel"] = "noopener"
            if not t["href"].startswith(("/", "#")):
                t["target"] = "_blank"

    for t in soup.find_all("table"):
        wrap = soup.new_tag("div", attrs={"class": "tbl"})
        t.wrap(wrap)

    # empty paragraphs/headings/inline bits left behind
    changed = True
    while changed:
        changed = False
        for t in soup.find_all(["p", "h2", "h3", "h4", "b", "strong", "i", "em", "a", "li", "blockquote"]):
            if not t.get_text(strip=True) and not t.find(["img", "br", "figure", "table"]):
                t.decompose()
                changed = True
    for p in soup.find_all("p"):
        if not p.get_text(strip=True) and not p.find(["img", "figure"]):
            p.decompose()

    out = str(soup)
    out = out.replace("\xa0", " ")
    out = re.sub(r"(<br/>\s*){3,}", "<br/><br/>", out)
    out = re.sub(r"^(\s*<br/>)+|(<br/>\s*)+$", "", out.strip())
    out = re.sub(r"\n{3,}", "\n\n", out)
    out = re.sub(r"</figure>\s*(<br/>\s*)+", "</figure>", out)
    # WhatsApp-style *bold* pasted as text
    out = re.sub(r"(?<![*\w])\*([^*<>\s][^*<>\n]{0,200}?)\*(?![*\w])", r"<strong>\1</strong>", out)
    # a post that is just text with <br> (2009-2016 posts): keep line breaks, wrap in a paragraph
    if not re.search(r"<(p|h2|h3|ul|ol|figure|div|blockquote)\b", out):
        out = "<p>" + out + "</p>"
    return out


def first_text(html_text, n):
    txt = re.sub(r"<[^>]+>", " ", html_text)
    txt = re.sub(r"\s+", " ", txt).strip()
    if len(txt) <= n:
        return txt
    cut = txt[:n].rsplit(" ", 1)[0]
    return cut + "…"


def pretty_tag(t):
    t = re.sub(r"(?<=[a-z])(?=[A-Z])", " ", t)
    return t.replace("Chat G P T", "ChatGPT").replace("Chat GPT", "ChatGPT").strip()


# ---------------------------------------------------------------- main

def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    root = Path(sys.argv[1])
    feed = root / "Blogs" / BLOG / "feed.atom"
    tree = ET.parse(feed).getroot()

    posts = []
    for e in tree.findall("a:entry", NS):
        if e.findtext("b:type", namespaces=NS) != "POST" or e.findtext("b:status", namespaces=NS) != "LIVE":
            continue
        raw = e.findtext("a:content", default="", namespaces=NS)
        path = e.findtext("b:filename", namespaces=NS).strip("/").removesuffix(".html")   # 2026/09/slug
        posts.append({
            "path": path,
            "title": (e.findtext("a:title", namespaces=NS) or "").strip(),
            "raw": raw,
            "published": ts(e.findtext("a:published", namespaces=NS)),
            "created": ts(e.findtext("b:created", namespaces=NS)).timestamp(),
            "updated": ts(e.findtext("a:updated", namespaces=NS)).timestamp(),
            "tags": [c.get("term") for c in e.findall("a:category", NS) if c.get("term")],
            "img_urls": [m for m in re.findall(r'<img[^>]+src="([^"]+)"', raw)],
            "matched": {},
        })

    pics = load_album(root)
    match_album(posts, pics)

    CONTENT.mkdir(exist_ok=True)
    for f in CONTENT.glob("*.json"):
        f.unlink()
    report = {"small": [], "remote": [], "dead": [], "unused": []}

    for p in posts:
        y, m, slug = p["path"].split("/")
        img_map, hero, n = {}, None, 0
        for u in dict.fromkeys(p["img_urls"]):
            if is_dead(u):
                report["dead"].append(f"{p['path']}  {u[:70]}…")
                img_map[u] = None
                continue
            c = p["matched"].get(u)
            if c is None:
                report["remote"].append(f"{p['path']}  {u[:90]}")
                img_map[u] = {"src": u.replace("&amp;", "&")}
                continue
            n += 1
            rel = f"img/{y}/{slug}-{n}.webp"
            w, h = save_full(c["file"], HERE / rel)
            img_map[u] = {"src": f"/speaks/{rel}", "w": w, "h": h}
            if hero is None:
                save_card(c["file"], HERE / f"img/{y}/{slug}-card.webp")
                hero = {"card": f"/speaks/img/{y}/{slug}-card.webp", "src": f"/speaks/{rel}", "w": w, "h": h}
            if max(c["w"], c["h"]) < SMALL:
                report["small"].append(f"{p['path']}  original {c['w']}x{c['h']}  ({os.path.basename(c['file'])})")
        # Blogger escapes & in src attributes; map both spellings
        for u in list(img_map):
            img_map[u.replace("&amp;", "&")] = img_map[u]

        body = clean_html(p["raw"], img_map)
        text = re.sub(r"<[^>]+>", " ", body)
        ratio = tamil_ratio(p["title"] + " " + text)
        title = p["title"]
        if not title:   # untitled post: a leading heading becomes the title, else its first line
            mh = re.match(r"\s*<(h[234])>(.*?)</\1>", body, re.S)
            if mh:
                title, body = re.sub(r"<[^>]+>", "", mh.group(2)).strip(), body[mh.end():].lstrip()
            else:
                title = first_text(body.split("<br/>")[0], 60)
        pub = p["published"].astimezone(IST)
        data = {
            "path": p["path"],
            "title": title,
            "date": pub.isoformat(timespec="minutes"),
            "lang": "ta" if ratio > 0.3 else "en",
            "tags": [pretty_tag(t) for t in p["tags"]],
            "description": first_text(re.sub(r"<figure>.*?</figure>", "", body, flags=re.S), 180),
            "hero": hero,
            "words": len(text.split()),
            "blogger_url": f"https://vijayanandspeaks.blogspot.com/{p['path']}.html",
            "body": body,
        }
        (CONTENT / f"{y}-{m}-{slug}.json").write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")

    for c in pics:
        if c["used"] is None and c["own"]:
            report["unused"].append(f"{dt.datetime.fromtimestamp(c['t'], IST):%Y-%m-%d %H:%M}  {os.path.basename(c['file'])}  {c['w']}x{c['h']}")

    lines = [f"Import report — {dt.datetime.now(IST):%Y-%m-%d %H:%M} — {len(posts)} posts",
             "", f"SMALL ORIGINALS (long side < {SMALL} px) — replace if you have a better copy: {len(report['small'])}",
             *report["small"],
             "", f"STILL ON BLOGGER / OTHER SITES (no matching upload in the takeout): {len(report['remote'])}", *report["remote"],
             "", f"DEAD LINKS DROPPED (expired ChatGPT image links, already broken on Blogger): {len(report['dead'])}", *report["dead"],
             "", f"ALBUM PICTURES NOT USED BY ANY POST: {len(report['unused'])}", *report["unused"]]
    REPORT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    ta = sum(1 for f in CONTENT.glob("*.json") if json.loads(f.read_text(encoding="utf-8"))["lang"] == "ta")
    print(f"{len(posts)} posts ({ta} Tamil), {sum(1 for c in pics if c['used'])} pictures matched; report: {REPORT}")


if __name__ == "__main__":
    main()
