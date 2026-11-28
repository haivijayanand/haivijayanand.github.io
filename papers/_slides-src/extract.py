#!/usr/bin/env python3
"""
TOOL:    extract.py
FAMILY:  papers-presentations
VERSION: 1.3.1
DATE:    2026-11-28
CHAT:    Technical papers - crisp and detailed teaching presentations
CHANGES: 1.3.1 - figure credit text kept (was dropped), so CC/PD image credits appear on slides
         1.3.0 - table captions given as a separate div.tcap are attached to their table; kural transliteration kept
         1.2.0 - inline maths and sub/superscripts kept readable in slide text (TeX to Unicode)
         1.1.0 - also reads content the parser left outside <article>; text equations ending in (n) snapped
         1.0.0 - parses papers/<slug>.html into ordered blocks (headings, paragraphs, lists, figures,
                 equations, tables, worked examples, kurals, references) and snaps equations/SVG figures to PNG
"""
__version__ = "1.3.1"
import json, re, sys, os, shutil, asyncio
from pathlib import Path
from bs4 import BeautifulSoup, NavigableString, Tag
from playwright.async_api import async_playwright

PAPERS = Path('/home/claude/haivijayanand.github.io/papers')
OUT = Path('/home/claude/work')

def clean(t):
    return re.sub(r'\s+', ' ', t).strip()

SUB = dict(zip('0123456789+-=()aehijklmnoprstuvxβγρφχ', '₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓᵦᵧᵨᵩᵪ'))
SUP = dict(zip('0123456789+-=()in', '⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁱⁿ'))
GREEK = {'alpha': 'α', 'beta': 'β', 'gamma': 'γ', 'delta': 'δ', 'epsilon': 'ε', 'varepsilon': 'ε', 'zeta': 'ζ',
         'eta': 'η', 'theta': 'θ', 'vartheta': 'ϑ', 'kappa': 'κ', 'lambda': 'λ', 'mu': 'μ', 'nu': 'ν', 'xi': 'ξ',
         'pi': 'π', 'rho': 'ρ', 'sigma': 'σ', 'tau': 'τ', 'phi': 'φ', 'varphi': 'φ', 'chi': 'χ', 'psi': 'ψ',
         'omega': 'ω', 'Gamma': 'Γ', 'Delta': 'Δ', 'Theta': 'Θ', 'Lambda': 'Λ', 'Xi': 'Ξ', 'Pi': 'Π',
         'Sigma': 'Σ', 'Phi': 'Φ', 'Psi': 'Ψ', 'Omega': 'Ω', 'infty': '∞', 'partial': '∂', 'nabla': '∇',
         'cdot': '·', 'times': '×', 'approx': '≈', 'le': '≤', 'leq': '≤', 'ge': '≥', 'geq': '≥', 'neq': '≠',
         'ne': '≠', 'pm': '±', 'sum': 'Σ', 'int': '∫', 'to': '→', 'rightarrow': '→', 'propto': '∝', 'sim': '~',
         'ldots': '…', 'dots': '…', 'cdots': '…', 'sqrt': '√', 'circ': '°', 'ell': 'ℓ', 'quad': ' ', 'qquad': ' '}


def script(txt, table, mark):
    t = txt.strip()
    if t and all(c in table for c in t): return ''.join(table[c] for c in t)
    return mark + (t if len(t) == 1 or t.isalnum() else '(' + t + ')')


def tex2text(tex):
    t = tex
    t = re.sub(r'\\(mathrm|mathit|mathbf|text|operatorname|boldsymbol|mathcal|bar|hat|tilde|overline)\s*\{([^{}]*)\}', r'\2', t)
    t = re.sub(r'\\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}', r'(\1)/(\2)', t)
    t = re.sub(r'\\([A-Za-z]+)', lambda m: GREEK.get(m.group(1), m.group(1)), t)
    t = re.sub(r'_\{([^{}]*)\}', lambda m: script(m.group(1), SUB, '\x01'), t)
    t = re.sub(r'\^\{([^{}]*)\}', lambda m: script(m.group(1), SUP, '\x02'), t)
    t = re.sub(r'_(\S)', lambda m: script(m.group(1), SUB, '_'), t)
    t = re.sub(r'\^(\S)', lambda m: script(m.group(1), SUP, '^'), t)
    t = t.replace('\x01', '_').replace('\x02', '^')
    t = t.replace('{', '').replace('}', '').replace(r'\,', ' ').replace(r'\;', ' ').replace('\\!', '')
    t = re.sub(r'\\left|\\right', '', t)
    t = re.sub(r'\((\w)\)/\((\w)\)', r'\1/\2', t)
    return re.sub(r'\s+', ' ', t).strip()


def text_of(el):
    el = BeautifulSoup(str(el), 'html.parser')
    for m in el.find_all('math'):
        ann = m.find('annotation')
        if ann is not None: m.replace_with(tex2text(ann.get_text()))
    for a in el.find_all('annotation'): a.decompose()
    for sb in el.find_all('sub'): sb.replace_with(script(sb.get_text(), SUB, '_'))
    for sp in el.find_all('sup'): sp.replace_with(script(sp.get_text(), SUP, '^'))
    for c in el.find_all(class_='credit'): c.decompose()
    for br in el.find_all('br'): br.replace_with(' / ')
    return clean(el.get_text(' ')).replace(' ,', ',').replace(' .', '.').replace('( ', '(').replace(' )', ')')

def extract(slug):
    od = OUT / slug; od.mkdir(parents=True, exist_ok=True)
    soup = BeautifulSoup(open(PAPERS / f'{slug}.html'), 'html.parser')
    art = soup.find('article')
    blocks, snaps = [], []
    counters = {'fig': 0, 'eq': 0, 'tab': 0, 'snap': 0}

    def snap(el, kind):
        counters['snap'] += 1
        sid = f'{kind}{counters["snap"]:03d}'
        el['data-snap'] = sid
        snaps.append(sid)
        return f'{sid}.png'

    def walk(node, ctx=None):
        for el in node.children:
            if not isinstance(el, Tag): continue
            n, cls = el.name, el.get('class') or []
            if n in ('style', 'script'): continue
            if n in ('h2', 'h3', 'h4'):
                blocks.append({'t': n, 'text': text_of(el)})
            elif n == 'figure' or (n == 'div' and 'figrow' in cls):
                figs = [el] if n == 'figure' else el.find_all('figure')
                for f in figs:
                    counters['fig'] += 1
                    cap = f.find('figcaption')
                    credit = cap.find(class_='credit') if cap else None
                    credit_t = clean(credit.get_text(' ')) if credit else ''
                    capt = text_of(cap) if cap else ''
                    capt = re.sub(r'^(Figure|Fig\.)\s*\d+\.?\s*', '', capt)
                    img = f.find('img')
                    src = img['src'] if img else None
                    if img is None or src.endswith('.svg'):
                        path = snap(img if img is not None else f.find('svg') or f, 'fig')
                    else:
                        p = PAPERS / src
                        path = f'fig{counters["fig"]:02d}{p.suffix}'
                        shutil.copy(p, od / path)
                    blocks.append({'t': 'fig', 'n': counters['fig'], 'caption': capt, 'credit': credit_t, 'img': path})
            elif n == 'div' and 'tcap' in cls:
                capt = re.sub(r'^Table\s*[IVXLC\d]+\.?\s*', '', text_of(el))
                last = blocks[-1] if blocks else None
                if last and last['t'] == 'table' and not last['caption']: last['caption'] = capt
                else: counters['tcap'] = capt
            elif n == 'div' and 'tbl' in cls:
                tb = el.find('table')
                cap = el.find(class_='tcap')
                counters['tab'] += 1
                rows, header = [], None
                for tr in tb.find_all('tr'):
                    cells = [text_of(c) for c in tr.find_all(['th', 'td'])]
                    if header is None and tr.find('th') and not tr.find('td'): header = cells
                    else: rows.append(cells)
                capt = text_of(cap) if cap else ''
                capt = re.sub(r'^Table\s*[IVXLC\d]+\.?\s*', '', capt) or counters.pop('tcap', '')
                blocks.append({'t': 'table', 'n': counters['tab'], 'caption': capt, 'header': header, 'rows': rows})
            elif n == 'table':
                counters['tab'] += 1
                rows, header = [], None
                for tr in el.find_all('tr'):
                    cells = [text_of(c) for c in tr.find_all(['th', 'td'])]
                    if header is None and tr.find('th') and not tr.find('td'): header = cells
                    else: rows.append(cells)
                blocks.append({'t': 'table', 'n': counters['tab'], 'caption': '', 'header': header, 'rows': rows})
            elif n == 'p' and ({'eq', 'eqn'} & set(cls)):
                counters['eq'] += 1
                blocks.append({'t': 'eq', 'n': counters['eq'], 'img': snap(el, 'eq'), 'text': text_of(el)})
            elif n == 'p':
                bm = el.find_all('math', attrs={'display': 'block'})
                if bm:
                    # split paragraph: text before/after each display maths
                    buf = []
                    for ch in list(el.children):
                        if isinstance(ch, Tag) and ch.name == 'math' and ch.get('display') == 'block':
                            t = text_of(BeautifulSoup(''.join(map(str, buf)), 'html.parser'))
                            if t: blocks.append({'t': 'p', 'text': t, 'ctx': ctx})
                            buf = []
                            counters['eq'] += 1
                            ann = ch.find('annotation')
                            blocks.append({'t': 'eq', 'n': counters['eq'], 'img': snap(ch, 'eq'),
                                           'text': text_of(ch), 'tex': ann.get_text() if ann else ''})
                        else: buf.append(ch)
                    t = text_of(BeautifulSoup(''.join(map(str, buf)), 'html.parser'))
                    if t: blocks.append({'t': 'p', 'text': t, 'ctx': ctx})
                else:
                    t = text_of(el)
                    if t and re.search(r'\(\d{1,2}[a-z]?\)$', t) and len(t) < 260 and re.search(r'[=∝≈<>≤≥]', t):
                        counters['eq'] += 1
                        blocks.append({'t': 'eq', 'n': counters['eq'], 'img': snap(el, 'eq'), 'text': t})
                    elif t: blocks.append({'t': 'p', 'text': t, 'ctx': ctx, 'wt': 'wt' in cls})
            elif n in ('ul', 'ol'):
                if 'refs' in cls:
                    blocks.append({'t': 'refs', 'items': [text_of(li) for li in el.find_all('li', recursive=False)]})
                elif 'figcredits' in cls: continue
                else:
                    blocks.append({'t': 'list', 'items': [text_of(li) for li in el.find_all('li', recursive=False)], 'ctx': ctx})
            elif n == 'div' and 'worked' in cls:
                blocks.append({'t': 'worked_start'})
                walk(el, 'worked'); blocks.append({'t': 'worked_end'})
            elif n == 'div' and 'kural' in cls:
                blocks.append({'t': 'kural', 'img': snap(el, 'kur'),
                               'ta': text_of(el.find(class_='kta')), 'tl': text_of(el.find(class_='ktl')) if el.find(class_='ktl') else '', 'en': text_of(el.find(class_='ken')),
                               'ref': text_of(el.find(class_='kref'))})
            elif n == 'pre':
                blocks.append({'t': 'code', 'text': el.get_text()})
            elif n in ('blockquote',):
                blocks.append({'t': 'p', 'text': text_of(el), 'ctx': 'quote'})
            elif n == 'div' or n == 'section':
                walk(el, ctx)
            else:
                t = text_of(el)
                if t: blocks.append({'t': 'p', 'text': t, 'ctx': ctx})
    walk(art)
    top = art
    while top.parent is not None and top.parent.name not in ('body', '[document]'): top = top.parent
    for sib in top.find_next_siblings():
        if sib.name in ('footer', 'script', 'nav', 'style') or 'endnav' in (sib.get('class') or []): continue
        if sib.find('h2') or sib.name in ('h2', 'h3', 'p', 'div', 'table', 'ol', 'ul', 'figure'):
            wrap = BeautifulSoup('', 'html.parser').new_tag('div'); sib.wrap(wrap); walk(wrap)
    tmp = PAPERS / f'_snap_{slug}.html'
    tmp.write_text(str(soup))
    json.dump({'slug': slug, 'blocks': blocks}, open(od / 'blocks.json', 'w'), indent=1, ensure_ascii=False)
    return tmp, snaps, od

CSS = """
html,body{background:#fff!important;color:#000!important}
[data-snap]{background:#fff!important;color:#000!important;padding:6px 10px!important;margin:0!important;max-width:1100px!important}
math{font-size:1.35em}
p.eq,p.eqn{font-size:1.3em;text-align:center}
"""

async def shoot(items):
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 1300, 'height': 900}, device_scale_factor=2.5)
        for tmp, snaps, od in items:
            await pg.goto(tmp.as_uri())
            await pg.add_style_tag(content=CSS)
            await pg.evaluate("document.documentElement.setAttribute('data-theme','light')")
            await pg.wait_for_timeout(400)
            for sid in snaps:
                loc = pg.locator(f'[data-snap="{sid}"]')
                try:
                    await loc.scroll_into_view_if_needed()
                    await loc.screenshot(path=str(od / f'{sid}.png'))
                except Exception as e:
                    print('snap fail', od.name, sid, e)
            tmp.unlink()
        await b.close()

if __name__ == '__main__':
    slugs = sys.argv[1:] or [x['slug'] for x in json.load(open(PAPERS / '_papers.json'))['papers']]
    items = [extract(s) for s in slugs]
    asyncio.run(shoot(items))
    for s in slugs:
        bl = json.load(open(OUT / s / 'blocks.json'))['blocks']
        from collections import Counter
        print(s, dict(Counter(b['t'] for b in bl)))
