#!/usr/bin/env python3
"""
TOOL:    sec.py
FAMILY:  papers-presentations
VERSION: 1.0.0
DATE:    2026-11-28
CHAT:    Technical papers - crisp and detailed teaching presentations
CHANGES: 1.0.0 - prints the text of chosen sections (by heading prefix) of a paper, trimmed, for writing slides
"""
__version__ = "1.0.0"
import json, sys
slug, n, *heads = sys.argv[1:]
n = int(n)
B = json.load(open(f'/home/claude/work/{slug}/blocks.json'))['blocks']
on = False
for b in B:
    if b['t'] in ('h2', 'h3'):
        on = any(b['text'].startswith(h) for h in heads) or (on and b['t'] == 'h3' and any(h.count('.') == 0 for h in heads) and not b['text'][:1].isdigit())
        if b['t'] == 'h3' and any(b['text'].startswith(h) for h in heads): on = True
        if on: print('##', b['text'])
        continue
    if not on: continue
    if b['t'] == 'p': print('-', b['text'][:n])
    elif b['t'] == 'list': print('*', ' | '.join(x[:n // 2] for x in b['items']))
    elif b['t'] == 'table': print('[tab', b['n'], ']', b['header'], [r for r in b['rows'][:12]])
