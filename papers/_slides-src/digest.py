#!/usr/bin/env python3
"""
TOOL:    digest.py
FAMILY:  papers-presentations
VERSION: 1.0.0
DATE:    2026-11-28
CHAT:    Technical papers - crisp and detailed teaching presentations
CHANGES: 1.0.0 - compact digest of a paper (abstract, headings, figures, tables, equations, conclusions) for writing the crisp deck
"""
__version__ = "1.0.0"
import json, sys, re
W = '/home/claude/work'
for slug in sys.argv[1:]:
    B = json.load(open(f'{W}/{slug}/blocks.json'))['blocks']
    print('#####', slug)
    sec = ''
    for b in B:
        t = b['t']
        if t == 'h2':
            sec = b['text']; print('\n##', sec)
        elif t == 'h3': print(' ###', b['text'])
        elif t == 'fig': print(f"  [fig{b['n']}] {b['caption'][:150]}")
        elif t == 'table': print(f"  [tab{b['n']}] {b['caption'][:90]} | {' / '.join((b['header'] or [])[:6])[:120]} | {len(b['rows'])} rows")
        elif t == 'eq': print(f"  [eq{b['n']}] {b['text'][:110]}")
        elif t == 'p' and re.match(r'.*(abstract|conclusion)', sec, re.I): print('   ', b['text'][:900])
        elif t == 'list' and re.match(r'.*(abstract|conclusion)', sec, re.I): print('    *', ' | '.join(x[:160] for x in b['items']))
        elif t == 'refs': print(f"  [refs] {len(b['items'])}")
