#!/usr/bin/env python3
"""
TOOL:    _scripts/make_og_images.py — link-preview (Open Graph) images, one per site section plus a site default
FAMILY:  SITE
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    Publicity - how people find the site on Google / GitHub; link previews and search tags site-wide
CHANGES: 1.0.0 - first release: 1200x630 PNGs in assets/img/og/ (<folder>.png and default.png) from _data/sections.json
STATUS:  working

Run from the repo root after adding a section to _data/sections.json (needs Pillow and the Inter font):
    python3 _scripts/make_og_images.py
The images are committed; _scripts/seo_tags.py points each page's og:image at its section image.
"""
__version__ = "1.0.0"

import json
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "img" / "og"
FONT_DIR = Path("/usr/share/fonts/opentype/inter")
BG, INK, SUB, ACC = (23, 37, 84), (255, 255, 255), (191, 219, 254), (251, 146, 60)   # navy, white, light blue, orange
W, H = 1200, 630


def font(weight: str, size: int):
    return ImageFont.truetype(str(FONT_DIR / f"Inter-{weight}.otf"), size)


def card(name: str, line: str, path: Path):
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)
    d.rectangle([0, H - 14, W, H], fill=ACC)
    y = 150
    for t in textwrap.wrap(name, 22)[:2]:
        d.text((80, y), t, font=font("Bold", 86), fill=INK)
        y += 104
    y += 16
    for t in textwrap.wrap(line, 46)[:3]:
        d.text((80, y), t, font=font("Regular", 40), fill=SUB)
        y += 54
    d.text((80, H - 92), "haivijayanand.github.io  ·  K Vijay Anand", font=font("SemiBold", 32), fill=ACC)
    im.save(path, optimize=True)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    card("K Vijay Anand", "Engineering papers, courses, tools, CBSE revision kits and essays", OUT / "default.png")
    n = 1
    for g in json.loads((ROOT / "_data" / "sections.json").read_text(encoding="utf-8"))["groups"]:
        for s in g.get("subgroups", [g]):
            for i in s["items"]:
                title = i.get("title", i["name"])
                sub = title.split("—", 1)[1].strip() if "—" in title else (i.get("meta") or title)
                card(title.split("—", 1)[0].strip(), sub, OUT / f"{i['folder']}.png")
                n += 1
    print(f"og images: {n} -> {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
