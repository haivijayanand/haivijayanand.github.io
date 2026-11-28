#!/usr/bin/env python3
"""
TOOL:    crisp.py
FAMILY:  papers-presentations
VERSION: 1.0.0
DATE:    2026-11-28
CHAT:    Technical papers - crisp and detailed teaching presentations
CHANGES: 1.0.0 - builds the 20-slide, 15-minute talk deck of a paper from specs/<slug>.txt (a small slide script)
                 using the paper's own figures, equations and tables from blocks.json
"""
__version__ = "1.0.0"
import json, re, sys
from pathlib import Path
from vadeck import Deck, best_table_size

PAPERS = Path('/home/claude/haivijayanand.github.io/papers')
WORK = Path('/home/claude/work')
SPECS = Path('/home/claude/decksrc/specs')
OUTDIR = PAPERS / 'ppt'
KINDS = ('B', 'F', 'E', 'T', 'K', '2', 'C', 'REF', 'V')


def parse(text):
    head, slides, cur, key = {}, [], None, None
    for raw in text.splitlines():
        ln = raw.rstrip()
        if not ln.strip() or ln.startswith('#'): continue
        if ln.startswith('@'):
            k, _, v = ln[1:].partition(' '); head[k] = v.strip(); continue
        m = re.match(r'^(B|F|E|T|K|2|C|REF|V):\s*(.*)$', ln)
        if m:
            cur = {'k': m.group(1), 'args': [a.strip() for a in m.group(2).split(' | ')], 'items': [],
                   'L': [], 'R': [], 'FW': [], 'N': '', 'W': ''}
            slides.append(cur); key = 'items'; continue
        m = re.match(r'^(N|W|L|R|FW):\s*(.*)$', ln)
        if m and cur is not None:
            k, v = m.groups()
            if k in ('N', 'W'): cur[k] = v; key = k
            else: key = k; cur[k + 'h'] = v
            continue
        m = re.match(r'^(-{1,2})\s+(.*)$', ln)
        if m and cur is not None:
            cur[key if key in ('items', 'L', 'R', 'FW') else 'items'].append((m.group(2), len(m.group(1)) - 1))
            continue
        if cur is not None and key in ('N', 'W'): cur[key] += ' ' + ln.strip()   # continuation line
    return head, slides


def build(slug, meta):
    head, slides = parse((SPECS / f'{slug}.txt').read_text())
    B = json.load(open(WORK / slug / 'blocks.json'))['blocks']
    figs = {f"fig{b['n']}": b for b in B if b['t'] == 'fig'}
    eqs = {f"eq{b['n']}": b for b in B if b['t'] == 'eq'}
    tabs = {f"tab{b['n']}": b for b in B if b['t'] == 'table'}
    refs = next((b['items'] for b in B if b['t'] == 'refs'), [])
    d = WORK / slug
    D = Deck()
    nfig = ntab = 0
    D.title_slide(head.get('title', meta['title']), head.get('sub', meta.get('summary', '')),
                  date=head.get('date', f"Paper published {meta.get('date', '')}"),
                  notes=head.get('tnotes', f"Introduce the paper and the plan for the next fifteen minutes."))
    D.outline('Outline of the talk', [x.strip() for x in head['outline'].split('|')],
              notes=head.get('onotes', 'Walk the audience through the plan of the talk.'))
    for s in slides:
        k, a = s['k'], s['args']
        if k == 'B':
            D.bullets(a[0], s['items'], notes=s['N'])
        elif k == 'F':
            f = figs[a[1]]; nfig += 1
            cap = a[2] if len(a) > 2 else f['caption']
            cr = f"  [{f['credit']}]" if f.get('credit') else ''
            room = 290 - len(cr)
            if len(cap) > room: cap = cap[:room].rsplit(' ', 1)[0] + ' …'
            cap = f"Fig. {nfig}: {cap}" + cr
            if s['items']:
                D.smart_fig(a[0], s['items'], str(d / f['img']), cap, notes=s['N'])
            else:
                D.full_fig(a[0], str(d / f['img']), cap, notes=s['N'])
        elif k == 'E':
            D.equations(a[0], [str(d / eqs[x.strip()]['img']) for x in a[1].split(',')], s['W'], notes=s['N'])
        elif k == 'T':
            t = tabs[a[1]]; ntab += 1
            opts = dict(o.split('=', 1) for o in a[2:] if '=' in o)
            rows, header = t['rows'], t['header']
            if 'rows' in opts:
                sel = []
                for part in opts['rows'].split(','):
                    if '-' in part:
                        x, y = part.split('-'); sel += list(range(int(x), int(y) + 1))
                    else: sel.append(int(part))
                rows = [rows[i] for i in sel if i < len(rows)]
            if 'cols' in opts:
                cs = [int(c) for c in opts['cols'].split(',')]
                rows = [[r[c] for c in cs if c < len(r)] for r in rows]
                header = [header[c] for c in cs] if header else None
            cap = opts.get('cap', t['caption'])
            D.table(a[0], f"Table {ntab}: {cap}" if cap else f"Table {ntab}", header, rows, notes=s['N'],
                    note=opts.get('note', ''), size=int(opts['size']) if 'size' in opts else best_table_size(header, rows))
        elif k == 'K':
            img = str(d / figs[a[2]]['img']) if len(a) > 2 and a[2] in figs else None
            D.key_result(a[0], a[1], s['items'], img=img, notes=s['N'])
        elif k == '2':
            D.two_col(a[0], s['L'], s['R'], notes=s['N'], lhead=s.get('Lh'), rhead=s.get('Rh'))
        elif k == 'C':
            D.conclusions(a[0] if a and a[0] else 'Conclusions', s['items'], s['FW'], notes=s['N'],
                          rhead=s.get('FWh') or 'Future work')
        elif k == 'V':
            kur = {re.match(r'Kural (\d+)', b['ref']).group(1): b for b in B if b['t'] == 'kural'}
            ks = [kur[x.strip()] for x in a[1].split(',')]
            kv = lambda b: (b['ta'], b.get('tl', ''), b['en'], b['ref'])
            if len(ks) > 1: D.verse(a[0], *kv(ks[0]), items=None, second=kv(ks[1]), notes=s['N'])
            else: D.verse(a[0], *kv(ks[0]), items=s['items'], notes=s['N'])
        elif k == 'REF':
            nums = [int(x) for x in a[0].split(',')]
            D.references('Key references', [f'[{n}] {refs[n - 1]}' for n in nums if n - 1 < len(refs)],
                         notes=s['N'] or 'The full list of references is in the paper.')
    D.thanks(notes=head.get('thanks', 'Thank the audience and invite questions. The paper and its PDF are on '
                                      'haivijayanand.github.io/papers.'))
    n = len(D.prs.slides._sldIdLst)
    out = OUTDIR / f'{slug}-talk.pptx'
    D.save(out)
    return out, n


if __name__ == '__main__':
    man = {p['slug']: p for p in json.load(open(PAPERS / '_papers.json'))['papers']}
    slugs = sys.argv[1:] or [p.stem for p in sorted(SPECS.glob('*.txt'))]
    for s in slugs:
        out, n = build(s, man[s])
        print(f'{n:3d} slides {"OK " if n == 20 else "!! "} {out.name}')
