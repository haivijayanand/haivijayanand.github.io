#!/bin/bash
# TOOL:    qa.sh
# FAMILY:  papers-presentations
# VERSION: 1.0.0
# DATE:    2026-11-28
# CHAT:    Technical papers - crisp and detailed teaching presentations
# CHANGES: 1.0.0 - renders decks to PDF/JPG (LibreOffice + pdftoppm) and makes 20-slide grids for visual QA
# qa.sh deck.pptx outprefix  -> renders and makes 20-slide grids
SK=/root/.claude/skills/synced/93458612-1491-46b7-9632-d8805778bd58_9d7b02a7-703a-4091-b552-102a84da4a40/pptx
D=/tmp/qa/$2; rm -rf $D; mkdir -p $D; cp "$1" $D/d.pptx; cd $D
timeout 600 python3 $SK/scripts/office/soffice.py --headless --convert-to pdf d.pptx >/dev/null 2>&1
pdftoppm -jpeg -r ${3:-50} d.pdf s
python3 - <<'P'
from PIL import Image
import glob
fs=sorted(glob.glob('s-*.jpg'))
for g in range(0,len(fs),20):
  ims=[Image.open(f) for f in fs[g:g+20]]; w,h=ims[0].size; cols=4
  rows=(len(ims)+cols-1)//cols; c=Image.new('RGB',(cols*w,rows*h),'white')
  for i,im in enumerate(ims): c.paste(im,((i%cols)*w,(i//cols)*h))
  c.save(f'g{g//20}.png')
print(len(fs),'slides')
P
