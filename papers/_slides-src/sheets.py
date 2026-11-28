#!/usr/bin/env python3
"""
TOOL:    sheets.py
FAMILY:  papers-presentations
VERSION: 1.0.0
DATE:    2026-11-28
CHAT:    Technical papers - crisp and detailed teaching presentations
CHANGES: 1.0.0 - contact sheets (48 slides each) of rendered decks for visual QA
"""
__version__ = "1.0.0"
from PIL import Image
import glob, sys
for d in sys.argv[1:]:
    fs = sorted(glob.glob(f'/tmp/qa/{d}/s-*.jpg'))
    for g in range(0, len(fs), 48):
        ims = [Image.open(f) for f in fs[g:g + 48]]
        w, h = 360, int(360 * ims[0].height / ims[0].width); cols = 8
        rows = (len(ims) + cols - 1) // cols; c = Image.new('RGB', (cols * w, rows * h), 'white')
        for i, im in enumerate(ims): c.paste(im.resize((w, h)), ((i % cols) * w, (i // cols) * h))
        c.save(f'/tmp/qa/{d}/sheet{g // 48}.png')
