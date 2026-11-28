#!/usr/bin/env python3
"""
TOOL:    detailed.py
FAMILY:  papers-presentations
VERSION: 1.2.0
DATE:    2026-11-28
CHAT:    Technical papers - crisp and detailed teaching presentations
CHANGES: 1.2.0 - references always included; long code listings split over slides; equations grouped only when readable; wide figures above bullets
         1.1.0 - bullets beside the figure when they fit (Text and Figure); an equation's lead-in and follow-on text go on its slide
         1.0.0 - builds the detailed teaching deck of a paper from blocks.json: section dividers, salient-point
                 slides, every figure, equation (with its "where" text), table (split if long), worked example
                 and reference; full paper text for each slide in the speaker notes
"""
__version__ = "1.2.0"
import json, math, re, sys
from pathlib import Path
from vadeck import Deck, table_chunks, pick_size, norm, best_table_size, eq_group_ok

PAPERS = Path('/home/claude/haivijayanand.github.io/papers')
WORK = Path('/home/claude/work')
OUTDIR = PAPERS / 'ppt'

ABBR = ['e.g.', 'i.e.', 'et al.', 'Fig.', 'Figs.', 'Eq.', 'Eqs.', 'No.', 'vs.', 'approx.', 'Ref.', 'Refs.', 'ca.',
        'Dr.', 'Mr.', 'St.', 'Inc.', 'Ltd.', 'Co.', 'Corp.', 'Jr.', 'U.S.', 'cf.', 'Ch.', 'Sec.', 'Vol.', 'pp.', 'resp.']
SKIP = re.compile(r'^(acknowledg|references|figure credits|bibliography)', re.I)


def sentences(t):
    p = t
    for a in ABBR: p = p.replace(a, a.replace('.', '§'))
    p = re.sub(r'(\b[A-Z])\.(?=\s?[A-Z]\.)', r'\1§', p)       # initials
    p = re.sub(r'(\d)\.(\d)', r'\1§\2', p)
    parts = re.split(r'(?<=[.!?])\s+(?=[A-Z“"(\[0-9])', p)
    return [x.replace('§', '.').strip() for x in parts if x.strip()]


def shorten(t, n=210):
    if len(t) <= n: return t
    cut = t[:n]
    for sep in ['; ', ' — ', ', ', ' ']:
        k = cut.rfind(sep)
        if k > n * 0.55: return cut[:k].rstrip(',;:— ') + ' …'
    return cut + ' …'


def salient(p):
    ss = sentences(p)
    if not ss: return ''
    b = ss[0]
    if len(b) < 70 and len(ss) > 1: b = b + ' ' + ss[1]
    return shorten(b)


def strip_num(h):
    return re.sub(r'^\s*(\d+(\.\d+)*|[IVX]+)\.?\s+', '', h).strip()


def short_title(t, n=60):
    t = strip_num(t)
    return t if len(t) <= n else t[:n].rsplit(' ', 1)[0] + ' …'


ROMAN = {1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X', 11: 'XI',
         12: 'XII', 13: 'XIII', 14: 'XIV', 15: 'XV', 16: 'XVI', 17: 'XVII', 18: 'XVIII', 19: 'XIX', 20: 'XX'}


def refs_to(all_ps, kind, n):
    if kind == 'fig':
        pat = re.compile(rf'\b(Fig\.|Figs\.|Figure|Figures)\s*{n}\b')
    else:
        pat = re.compile(rf'\bTables?\s*({n}|{ROMAN.get(n, "ZZ")})\b')
    return [p for p in all_ps if pat.search(p)]


def build(slug, meta):
    data = json.load(open(WORK / slug / 'blocks.json'))
    B = data['blocks']; d = WORK / slug
    img = lambda f: str(d / f)
    all_ps = [b['text'] for b in B if b['t'] == 'p']
    D = Deck()
    date = meta.get('date', '')
    D.title_slide(meta['title'], 'Detailed teaching deck · every figure, equation and table explained, with the full '
                  'paper text in the speaker notes', date=f'Paper published {date}' if date else '',
                  notes=f"This deck teaches the paper '{meta['title']}'. {meta.get('summary', '')} Each section "
                        "starts with a divider. Figures, equations and tables each get their own slide, and the "
                        "speaker notes carry the paper's own explanation so the deck can be taught from the notes.")
    h2s = [b['text'] for b in B if b['t'] == 'h2' and not SKIP.match(strip_num(b['text']))
           and strip_num(b['text']).lower() != 'abstract']
    outline = [strip_num(h) for h in h2s]
    D.outline('Contents of this lecture', outline,
              notes='We will go through the paper section by section: ' + '; '.join(outline) + '.')

    # ---- abstract ----
    abst, i = [], 0
    for k, b in enumerate(B):
        if b['t'] == 'h2' and strip_num(b['text']).lower() == 'abstract':
            j = k + 1
            while j < len(B) and B[j]['t'] not in ('h2',):
                if B[j]['t'] == 'p': abst.append(B[j]['text'])
                j += 1
            break
    if abst:
        ss = [shorten(x, 240) for p in abst for x in sentences(p)]
        chunks = chunk_items([(x, 0) for x in ss], 6)
        for ci, ch in enumerate(chunks):
            D.bullets('Abstract' + (' (cont.)' if ci else ''), ch, notes=' '.join(abst) if ci == 0 else
                      'Continue the abstract: ' + ' '.join(x for x, _ in ch))

    # ---- body ----
    secno = 0
    h2 = h3 = ''
    pend, pend_notes = [], []
    in_skip = False
    in_worked = False
    worked_title, worked_items, worked_notes = '', [], []
    k = 0

    def cur_head():
        return short_title(h3 or h2, 60)

    def flush():
        nonlocal pend, pend_notes
        if pend and len(pend) <= 2 and len(pend_notes) == len(pend) and all(lv == 0 for _, lv in pend):
            # thin slide: show the whole paragraph(s), sentence by sentence
            rich = []
            for full in pend_notes:
                ss = sentences(full)
                rich.append((shorten(ss[0], 230), 0))
                rich += [(shorten(x, 200), 1) for x in ss[1:]]
            pend = rich
        if pend:
            chunks = chunk_items(pend, 6)
            for ci, ch in enumerate(chunks):
                D.bullets(cur_head() + (' (cont.)' if ci else ''), ch,
                          notes=' '.join(pend_notes) if ci == 0 else 'Continue: ' + ' '.join(x for x, _ in ch))
        pend, pend_notes = [], []

    while k < len(B):
        b = B[k]; t = b['t']
        if t == 'h2':
            flush()
            name = strip_num(b['text'])
            in_skip = bool(SKIP.match(name)) or name.lower() == 'abstract'
            h2, h3 = b['text'], ''
            if not in_skip:
                secno += 1
                first = next((x['text'] for x in B[k + 1:] if x['t'] == 'p'), '')
                subs = []
                for x in B[k + 1:]:
                    if x['t'] == 'h2': break
                    if x['t'] == 'h3': subs.append(strip_num(x['text']))
                sub = shorten(sentences(first)[0], 200) if first else ''
                D.section(secno, name, sub, notes=f'Section {secno}: {name}. ' +
                          (('It covers: ' + '; '.join(subs) + '. ') if subs else '') + (first[:600] if first else ''))
            k += 1; continue
        if in_skip and t != 'refs':
            k += 1; continue
        if t in ('h3', 'h4'):
            flush(); h3 = b['text']; k += 1; continue
        if t == 'worked_start':
            flush(); in_worked = True; worked_title, worked_items, worked_notes = '', [], []
            k += 1; continue
        if t == 'worked_end':
            in_worked = False
            if worked_items:
                chunks = chunk_items(worked_items, 7)
                for ci, ch in enumerate(chunks):
                    D.bullets(short_title(worked_title or 'Worked example', 62) + (' (cont.)' if ci else ''), ch,
                              notes='Work through this example on the board. ' + ' '.join(worked_notes))
            k += 1; continue
        if t == 'p':
            if in_worked:
                if b.get('wt'):
                    worked_title = re.sub(r'^WORKED EXAMPLE', 'Worked example', b['text'])
                    worked_title = worked_title[0] + worked_title[1:].lower() if worked_title.isupper() else worked_title
                else:
                    worked_items += [(shorten(s, 260), 0) for s in sentences(b['text'])]
                    worked_notes.append(b['text'])
            elif re.match(r'^(Table|Fig\.?|Figure)\s*[\dIVX]+\.?$', b['text']):
                pass
            else:
                s_ = salient(b['text'])
                if s_:
                    pend.append((s_, 0)); pend_notes.append(b['text'])
            k += 1; continue
        if t == 'list':
            lv = 1 if pend and pend[-1][1] == 0 and len(b['items']) <= 8 else 0
            for it in b['items']:
                (worked_items if in_worked else pend).append((shorten(it, 200), lv))
            (worked_notes if in_worked else pend_notes).append(' '.join(b['items']))
            k += 1; continue
        if t == 'fig':
            cap = b['caption']
            refs = refs_to(all_ps, 'fig', b['n'])
            notes = (f"Figure {b['n']}. {cap} " + ('How the paper uses this figure: ' + ' '.join(refs[:3]) if refs else '')
                     + (f" (Credit: {b['credit']})" if b.get('credit') else ''))
            cr = f"  [{b['credit']}]" if b.get('credit') else ''
            room = 290 - len(cr)
            capline = f"Fig. {b['n']}: " + (cap if len(cap) <= room else cap[:room].rsplit(' ', 1)[0] + ' …') + cr
            if pend and len(pend) <= 5 and pick_size(norm(pend), 100, 157, (18, 17, 16, 15, 14))[1]:
                D.smart_fig(f"Fig. {b['n']} · {cur_head()}", pend, img(b['img']),
                           capline,
                           notes=' '.join(pend_notes) + ' ' + notes)
                pend, pend_notes = [], []
                k += 1; continue
            flush()
            D.full_fig(f"Fig. {b['n']} · {cur_head()}", img(b['img']), capline, notes=notes)
            k += 1; continue
        if t == 'eq':
            # group consecutive equations
            grp = [b]; j = k + 1
            while j < len(B) and B[j]['t'] == 'eq' and len(grp) < 3 and \
                    eq_group_ok([img(g['img']) for g in grp + [B[j]]]):
                grp.append(B[j]); j += 1
            prev = pend_notes[-1] if pend_notes else ''
            lead = ''
            if pend and pend_notes and not re.search(r'[.?!]\)?$', pend_notes[-1].strip()):
                lead = pend_notes[-1]; pend.pop(); pend_notes.pop()
                ss = sentences(lead); lead = ss[-1] if ss else lead
            flush()
            nxt = B[j] if j < len(B) and B[j]['t'] == 'p' else None
            follow = ''
            if nxt and (re.match(r'^(where|with|here|in which|and where|in this|that is|so that|for|and)\b', nxt['text'], re.I)
                        or nxt['text'][:1].islower()):
                follow = nxt['text']; j += 1
            where = ' '.join(x for x in [shorten(lead, 160) if lead else '', shorten(follow, 300 if lead else 400) if follow else ''] if x)
            nums = ', '.join(f"({g['n']})" for g in grp)
            notes = ((prev + ' ') if prev and prev != lead else '') + ((lead + ' ') if lead else '') + 'Equation ' + nums + ': ' + ' | '.join(
                (g.get('tex') or g['text']) for g in grp) + '. ' + (follow or '')
            D.equations(f"{cur_head()} · Eq. {nums}", [img(g['img']) for g in grp], where, notes=notes)
            k = j; continue
        if t == 'table':
            flush()
            refs = refs_to(all_ps, 'tab', b['n'])
            bs = best_table_size(b['header'], b['rows'], 15)
            chunks, size = ([b['rows']], bs) if bs else table_chunks(b['header'], b['rows'])
            for ci, ch in enumerate(chunks):
                cap = f"Table {b['n']}: {b['caption']}" if b['caption'] else f"Table {b['n']}"
                notes = f"{cap}. " + ('Discussion in the paper: ' + ' '.join(refs[:3]) if refs else
                                      'Walk through the rows and point out the largest and smallest values.')
                D.table(short_title(h3 or h2, 52) + (f' (part {ci + 1} of {len(chunks)})' if len(chunks) > 1 else ''),
                        cap + (' (cont.)' if ci else ''), b['header'], ch, notes=notes, size=size)
            k += 1; continue
        if t == 'kural':
            lead = []
            if pend and pend_notes and pend_notes[-1].rstrip().endswith(':') and len(pend_notes[-1]) < 260:
                lead = [(pend_notes[-1], 0)]; pend.pop(); pend_notes.pop()
            flush()
            kv = (b['ta'], b.get('tl', ''), b['en'], b['ref'])
            j = k + 1; disc = []
            while j < len(B) and B[j]['t'] == 'p' and len(disc) < 2:
                disc.append(B[j]['text']); j += 1
            if not disc and j < len(B) and B[j]['t'] == 'kural':
                c = B[j]
                D.verse(cur_head(), *kv, items=None, second=(c['ta'], c.get('tl', ''), c['en'], c['ref']),
                        notes=' '.join(x for x, _ in lead) + f" {b['ref']}: {b['en']} {c['ref']}: {c['en']}")
                k = j + 1; continue
            items = list(lead)
            for p_ in disc:
                ss = sentences(p_)
                items.append((shorten(ss[0], 200), 0))
                items += [(shorten(x, 170), 1) for x in ss[1:3]]
            while items and not pick_size(norm(items), 132, 157, (18, 17, 16, 15, 14))[1]: items.pop()
            D.verse(cur_head(), *kv, items=items,
                    notes=' '.join(x for x, _ in lead) + f" {b['ref']}. Meaning: {b['en']} " + ' '.join(disc))
            k = j; continue
        if t == 'code':
            flush()
            lines = b['text'].rstrip('\n').split('\n')
            parts = [lines[i:i + 24] for i in range(0, len(lines), 24)]
            for pi, part in enumerate(parts):
                D.code(cur_head() + ' · listing' + (f' ({pi + 1}/{len(parts)})' if len(parts) > 1 else ''),
                       '\n'.join(part), notes='Read through the listing line by line. ' +
                       (pend_notes[-1] if pend_notes else ''))
            k += 1; continue
        if t == 'refs':
            flush()
            refs = [f'[{i + 1}] {r}' for i, r in enumerate(b['items'])]
            groups, cur, ln = [], [], 0
            for r in refs:
                if cur and (ln + len(r) > 1500 or len(cur) >= 10):
                    groups.append(cur); cur, ln = [], 0
                cur.append(r); ln += len(r)
            if cur: groups.append(cur)
            for gi, g in enumerate(groups):
                D.references('References' + (f' ({gi + 1}/{len(groups)})' if len(groups) > 1 else ''), g,
                             notes='Full reference list of the paper, in IEEE style.')
            k += 1; continue
        k += 1
    flush()
    D.thanks(notes='Thank the audience, take questions, and point them to the full paper and its PDF on '
                   'haivijayanand.github.io/papers.')
    out = OUTDIR / f'{slug}-detailed.pptx'
    D.save(out)
    return out, len(D.prs.slides._sldIdLst)


def chunk_items(items, maxn):
    out, cur = [], []
    for it in items:
        trial = cur + [it]
        if cur and (len(trial) > maxn or not pick_size(norm(trial), 272, 157, (22, 20, 18, 17, 16, 15))[1]):
            # do not leave a level-1 item orphaned at the top of a slide without context
            out.append(cur); cur = [it]
        else:
            cur = trial
    if cur: out.append(cur)
    if len(out) > 1:                          # balance so no slide is left with one or two lines
        n = len(out); per = math.ceil(len(items) / n)
        bal = [items[i:i + per] for i in range(0, len(items), per)]
        if len(bal) == n and all(pick_size(norm(c), 272, 157, (22, 20, 18, 17, 16, 15))[1] for c in bal): out = bal
    return out


if __name__ == '__main__':
    man = {p['slug']: p for p in json.load(open(PAPERS / '_papers.json'))['papers']}
    slugs = sys.argv[1:] or list(man)
    for s in slugs:
        out, n = build(s, man[s])
        print(f'{n:4d} slides  {out.name}')
