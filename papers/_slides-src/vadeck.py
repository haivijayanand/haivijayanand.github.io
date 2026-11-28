#!/usr/bin/env python3
"""
TOOL:    vadeck.py
FAMILY:  papers-presentations
VERSION: 1.3.0
DATE:    2026-11-28
CHAT:    Technical papers - crisp and detailed teaching presentations
CHANGES: 1.3.0 - per-equation scaling inside a group; eq_group_ok and best_table_size helpers
         1.2.0 - wide figures go across the top with the bullets below (smart_fig)
         1.1.0 - equations drawn in dark ink on a transparent ground inside the equation panel; 'where' text >= 14 pt
         1.0.0 - slide helpers on the VA A4 landscape template v2: title, outline, section, bullets, two-column,
                 text+figure, full figure, equations, native tables (auto-split), key result, conclusions,
                 references, code, thank you; font sizes chosen to fit (body >= 14 pt)
"""
__version__ = "1.3.0"
import io, math, re
from pathlib import Path
from PIL import Image, ImageChops
from pptx import Presentation
from pptx.util import Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN

TPL = '/home/claude/va_tpl/VA_A4_Landscape_Template_v2.pptx'
MM = 36000
NAVY = RGBColor(0x0A, 0x1F, 0x4E)
GREY = RGBColor(0x55, 0x5F, 0x6B)


def trim(path, pad=12, transparent=False):
    """Crop white margins from an image; returns PNG bytes (white made transparent if asked)."""
    im = Image.open(path).convert('RGB')
    bg = Image.new('RGB', im.size, (255, 255, 255))
    diff = ImageChops.difference(im, bg).convert('L').point(lambda v: 255 if v > 18 else 0)
    box = diff.getbbox()
    if box:
        l, t, r, b = box
        im = im.crop((max(0, l - pad), max(0, t - pad), min(im.width, r + pad), min(im.height, b + pad)))
    if transparent:
        g = im.convert('L'); a = g.point(lambda v: 0 if v > 245 else 255 if v < 150 else int((245 - v) * 255 / 95))
        im = _ink(g, a)
    if max(im.size) > 2000 and not transparent:
        k = 2000 / max(im.size); im = im.resize((int(im.width * k), int(im.height * k)), Image.LANCZOS)
    buf = io.BytesIO()
    if str(path).lower().endswith(('.jpg', '.jpeg')) and not transparent: im.save(buf, 'JPEG', quality=88)
    else: im.save(buf, 'PNG')
    buf.seek(0)
    return buf, im.size


def _ink(g, a):
    rgb = Image.merge('RGB', (g, g, g)).point(lambda v: min(v, 60))
    r, gg, b = rgb.split()
    return Image.merge('RGBA', (r, gg, b, a))


def est_lines(text, width_mm, size_pt, indent_mm=0):
    cw = 0.50 * size_pt * 0.3528
    cpl = max(8, int((width_mm - indent_mm) / cw))
    lines = 0
    for para in text.split('\n'):
        lines += max(1, math.ceil(len(para) / cpl))
    return lines


def fits(items, width_mm, height_mm, size):
    lh = 1.22 * size * 0.3528
    tot = 0
    for t, lv in items:
        tot += est_lines(t, width_mm, size, 7 + 6 * lv) * lh + 0.45 * size * 0.3528
    return tot <= height_mm * 0.92


def pick_size(items, width_mm, height_mm, sizes=(22, 20, 18, 17, 16, 15, 14)):
    for s in sizes:
        if fits(items, width_mm, height_mm, s):
            return s, True
    return sizes[-1], False


def norm(items):
    out = []
    for it in ([items] if isinstance(items, str) else items):
        out.append((it, 0) if isinstance(it, str) else (it[0], it[1]))
    return out


class Deck:
    def __init__(self):
        self.prs = Presentation(TPL)
        # drop any sample slides in the template
        sl = self.prs.slides._sldIdLst
        for sid in list(sl):
            self.prs.part.drop_rel(sid.rId); sl.remove(sid)
        self.LAY = {l.name: l for l in self.prs.slide_layouts}

    # ---------- basics ----------
    def new(self, layout, notes=''):
        s = self.prs.slides.add_slide(self.LAY[layout])
        s.notes_slide.notes_text_frame.text = notes or ''
        return s

    def ph(self, s, idx):
        for p in s.placeholders:
            if p.placeholder_format.idx == idx: return p
        return None

    def drop(self, s, idx):
        p = self.ph(s, idx)
        if p is not None: p._element.getparent().remove(p._element)

    def title(self, s, text, size=None):
        p = self.ph(s, 0)
        tf = p.text_frame; tf.text = ''
        r = tf.paragraphs[0].add_run(); r.text = text
        n = len(text)
        if size is None and p.width > 200 * MM and p.top < 10 * MM:   # content-slide heading bar
            size = 26 if n <= 45 else 22 if n <= 60 else 19 if n <= 75 else 17
        if size: r.font.size = Pt(size)
        tf.word_wrap = True

    def text(self, s, idx, items, sizes=(22, 20, 18, 17, 16, 15, 14), bold_first=False, size=None, color=None,
             bullets=True):
        p = self.ph(s, idx)
        items = norm(items)
        w, h = p.width / MM, p.height / MM
        if size is None:
            size, ok = pick_size(items, w, h, sizes)
        tf = p.text_frame; tf.word_wrap = True
        for k, (t, lv) in enumerate(items):
            para = tf.paragraphs[0] if k == 0 else tf.add_paragraph()
            para.level = lv
            m = re.match(r'^\*\*(.+?)\*\*(.*)$', t, re.S)
            if m:
                r = para.add_run(); r.text = m.group(1); r.font.bold = True; r.font.size = Pt(size)
                if color: r.font.color.rgb = color
                r2 = para.add_run(); r2.text = m.group(2); r2.font.size = Pt(size)
                if color: r2.font.color.rgb = color
            else:
                r = para.add_run(); r.text = t; r.font.size = Pt(size - (1 if lv else 0))
                if color: r.font.color.rgb = color
                if bold_first and k == 0: r.font.bold = True
        return size

    def picture_in(self, s, rect, img_path, max_scale=None):
        """Place an image fitted (no crop) and centred in rect=(l,t,w,h) EMU."""
        buf, (iw, ih) = trim(img_path) if str(img_path).endswith('.png') or True else None
        l, t, w, h = rect
        k = min(w / iw, h / ih)
        if max_scale: k = min(k, max_scale)
        pw, ph_ = int(iw * k), int(ih * k)
        return s.shapes.add_picture(buf, l + (w - pw) // 2, t + (h - ph_) // 2, pw, ph_)

    def picture_ph(self, s, idx, img_path, max_scale=None):
        p = self.ph(s, idx)
        rect = (p.left, p.top, p.width, p.height)
        p._element.getparent().remove(p._element)
        return self.picture_in(s, rect, img_path, max_scale)

    # ---------- slide types ----------
    def title_slide(self, title, subtitle, author='K Vijay Anand',
                    series='Technical Paper Series · haivijayanand.github.io', date='', notes=''):
        s = self.new('VA Title Slide', notes)
        n = len(title)
        self.title(s, title, size=36 if n < 60 else 30 if n < 90 else 26)
        self.text(s, 1, subtitle, size=18 if len(subtitle) < 110 else 16, bullets=False)
        self.text(s, 10, author, size=16)
        self.text(s, 11, series, size=13)
        if date: self.text(s, 12, date, size=13)
        else: self.drop(s, 12)
        return s

    def outline(self, heading, items, notes=''):
        s = self.new('VA Outline', notes)
        self.title(s, heading)
        self.text(s, 1, items, sizes=(20, 18, 17, 16, 15, 14))
        return s

    def section(self, num, title, sub='', notes=''):
        s = self.new('VA Section Divider', notes)
        self.text(s, 10, f'{num:02d}' if isinstance(num, int) else str(num), size=54)
        self.title(s, title, size=32 if len(title) < 50 else 26)
        if sub: self.text(s, 11, sub, size=16 if len(sub) < 200 else 14)
        else: self.drop(s, 11)
        return s

    def bullets(self, heading, items, notes=''):
        s = self.new('VA Title and Content', notes)
        self.title(s, heading)
        self.text(s, 1, items)
        return s

    def two_col(self, heading, left, right, notes='', lhead=None, rhead=None):
        s = self.new('VA Two Content', notes)
        self.title(s, heading)
        L = ([f'**{lhead}**'] if lhead else []) + norm(left)
        R = ([f'**{rhead}**'] if rhead else []) + norm(right)
        sz = min(pick_size(norm(L), 132, 157)[0], pick_size(norm(R), 132, 157)[0])
        self.text(s, 1, L, size=sz); self.text(s, 2, R, size=sz)
        return s

    def text_fig(self, heading, items, img, caption, notes=''):
        s = self.new('VA Text and Figure', notes)
        self.title(s, heading)
        self.text(s, 1, items, sizes=(18, 17, 16, 15, 14))
        self.picture_ph(s, 2, img)
        self.text(s, 3, caption, size=11 if len(caption) < 240 else 10, color=GREY)
        return s

    def fig_top(self, heading, items, img, caption, notes=''):
        """Wide figure across the top, caption under it, bullets below."""
        s = self.new('VA Title and Content', notes)
        self.title(s, heading)
        items = norm(items)
        size = 16
        for sz in (18, 17, 16, 15, 14):
            size = sz
            need = sum(est_lines(t, 272, sz, 7 + 6 * lv) * 1.22 * sz * 0.3528 + 0.45 * sz * 0.3528 for t, lv in items) / 0.9
            if need <= 62: break
        need = min(max(need, 22), 70)
        body = self.ph(s, 1)
        top_txt = 193 - need
        body.left, body.width = body.left, body.width
        body.top = int(top_txt * MM); body.height = int(need * MM)
        self.text(s, 1, items, size=size)
        cap_h = 9 if len(caption) < 200 else 12
        pic_bottom = top_txt - cap_h - 1
        self.picture_in(s, (13 * MM, 36 * MM, 272 * MM, int((pic_bottom - 36) * MM)), img)
        tb = s.shapes.add_textbox(13 * MM, int((pic_bottom + 0.5) * MM), 272 * MM, int(cap_h * MM))
        tf = tb.text_frame; tf.word_wrap = True
        p = tf.paragraphs[0]; p.alignment = PP_ALIGN.CENTER
        r = p.add_run(); r.text = caption; r.font.size = Pt(11 if len(caption) < 200 else 10); r.font.italic = True
        r.font.color.rgb = GREY
        return s

    def smart_fig(self, heading, items, img, caption, notes=''):
        """Text-and-figure for upright figures, figure-on-top for wide ones."""
        iw, ih = trim(img)[1]
        if iw / ih > 1.55: return self.fig_top(heading, items, img, caption, notes)
        return self.text_fig(heading, items, img, caption, notes)

    def full_fig(self, heading, img, caption, notes=''):
        s = self.new('VA Full Figure', notes)
        self.title(s, heading)
        self.picture_ph(s, 1, img)
        if len(caption) > 330: caption = caption[:327].rsplit(' ', 1)[0] + '…'
        self.text(s, 2, caption, size=12 if len(caption) < 190 else 11 if len(caption) < 260 else 10, color=GREY)
        return s

    def equations(self, heading, imgs, where='', notes='', scale=None):
        s = self.new('VA Equations', notes)
        self.title(s, heading)
        p = self.ph(s, 1)
        l, t, w, h = p.left, p.top, p.width, p.height
        if not where:
            self.drop(s, 2)
        p._element.getparent().remove(p._element)
        n = len(imgs)
        gap = 3 * MM
        each = (h - gap * (n - 1)) // n
        # common scale so equations keep the same type size
        sizes = [trim(i, transparent=True)[1] for i in imgs]
        cap = scale or (0.32 * MM)             # cap: ~0.32 mm per snapshot pixel
        k = min(min(w / iw, each / ih) for iw, ih in sizes)
        y = t
        for img, (iw, ih) in zip(imgs, sizes):
            buf, _ = trim(img, transparent=True)
            kk = min(cap, w / iw, each / ih, max(k, 0.6 * min(w / iw, each / ih)))
            pw, phh = int(iw * kk), int(ih * kk)
            s.shapes.add_picture(buf, l + (w - pw) // 2, y + (each - phh) // 2, pw, phh)
            y += each + gap
        if where:
            self.text(s, 2, where, sizes=(18, 17, 16, 15, 14))
        return s

    def verse(self, heading, ta, tl, en, ref, items, notes='', second=None):
        """Couplet (Tamil, transliteration, meaning) on the left; discussion or a second couplet on the right."""
        s = self.new('VA Two Content', notes)
        self.title(s, heading)
        self._verse(self.ph(s, 1).text_frame, ta, tl, en, ref)
        if second:
            self._verse(self.ph(s, 2).text_frame, *second)
        elif items: self.text(s, 2, items, sizes=(18, 17, 16, 15, 14))
        else: self.drop(s, 2)
        return s

    def _verse(self, tf, ta, tl, en, ref):
        tf.word_wrap = True
        def para(text, size, bold=False, italic=False, color=None, first=False, space=6):
            p = tf.paragraphs[0] if first else tf.add_paragraph()
            p.space_after = Pt(space)
            r = p.add_run(); r.text = text; r.font.size = Pt(size); r.font.bold = bold; r.font.italic = italic
            if color: r.font.color.rgb = color
            pPr = p._p.get_or_add_pPr(); pPr.set('marL', '0'); pPr.set('indent', '0')
            from pptx.oxml.ns import qn
            for e in pPr.findall(qn('a:buNone')): pPr.remove(e)
            pPr.insert(0, pPr.makeelement(qn('a:buNone'), {}))
        lines = [x.strip() for x in ta.split(' / ') if x.strip()]
        for i, ln in enumerate(lines): para(ln, 20, bold=True, color=NAVY, first=(i == 0), space=2)
        for ln in [x.strip() for x in tl.split(' / ') if x.strip()]: para(ln, 14, italic=True, color=GREY, space=0)
        para(' ', 6)
        para(en, 18 if len(en) < 170 else 16)
        para(ref, 12, color=GREY)

    def table(self, heading, caption, header, rows, notes='', note='', size=None):
        s = self.new('VA Table', notes)
        self.title(s, heading)
        if caption: self.text(s, 2, caption, size=12 if len(caption) < 200 else 11, color=GREY)
        else: self.drop(s, 2)
        if note: self.text(s, 3, note, size=11, color=GREY)
        else: self.drop(s, 3)
        ncol = max(len(r) for r in ([header] if header else []) + rows)
        allrows = ([header] if header else []) + [r + [''] * (ncol - len(r)) for r in rows]
        gf = self.ph(s, 1).insert_table(len(allrows), ncol)
        tbl = gf.table
        W = 272 * MM
        lens = [max(6, max(min(len(r[c]), 90) for r in allrows)) for c in range(ncol)]
        wts = [math.sqrt(x) + 1.5 for x in lens]
        tot = sum(wts)
        for c in range(ncol): tbl.columns[c].width = int(W * wts[c] / tot)
        size = size or table_size(header, rows)
        for ri, r in enumerate(allrows):
            tbl.rows[ri].height = int(6 * MM)
            for ci, val in enumerate(r):
                cell = tbl.cell(ri, ci)
                cell.margin_left = cell.margin_right = int(1.5 * MM)
                cell.margin_top = cell.margin_bottom = int(0.8 * MM)
                tf = cell.text_frame; tf.word_wrap = True
                tf.paragraphs[0].text = ''
                run = tf.paragraphs[0].add_run(); run.text = val
                run.font.size = Pt(size)
                if ri == 0 and header: run.font.bold = True
        return s

    def code(self, heading, code, notes=''):
        s = self.new('VA Title Only', notes)
        self.title(s, heading)
        lines = code.rstrip('\n').split('\n')
        size = 14 if len(lines) <= 16 else 12 if len(lines) <= 20 else 11
        tb = s.shapes.add_textbox(13 * MM, 38 * MM, 272 * MM, 150 * MM)
        tf = tb.text_frame; tf.word_wrap = True
        for k, ln in enumerate(lines[:26]):
            p = tf.paragraphs[0] if k == 0 else tf.add_paragraph()
            r = p.add_run(); r.text = ln; r.font.size = Pt(size); r.font.name = 'Courier New'
        return s

    def key_result(self, heading, number, takeaway, img=None, notes=''):
        s = self.new('VA Key Result', notes)
        self.title(s, heading)
        if img: self.picture_ph(s, 1, img)
        else: self.drop(s, 1)
        self.text(s, 2, number, size=30 if len(number) < 10 else 22 if len(number) < 18 else 18)
        self.text(s, 3, takeaway, sizes=(16, 15, 14))
        return s

    def conclusions(self, heading, left, right, notes='', lhead='Conclusions', rhead='Future work'):
        s = self.new('VA Conclusions', notes)
        self.title(s, heading)
        self.text(s, 10, lhead, size=18); self.text(s, 11, rhead, size=18)
        L, R = norm(left), norm(right)
        sz = min(pick_size(L, 118, 133, (18, 17, 16, 15, 14))[0], pick_size(R, 118, 133, (18, 17, 16, 15, 14))[0])
        self.text(s, 1, L, size=sz); self.text(s, 2, R, size=sz)
        return s

    def references(self, heading, refs, notes=''):
        s = self.new('VA References', notes)
        self.title(s, heading)
        tot = sum(len(r) for r in refs)
        size = 12 if tot < 1500 else 11 if tot < 1900 else 10
        self.text(s, 1, refs, size=size)
        return s

    def thanks(self, title='Thank you', line='Questions and discussion',
               contact='haivijayanand.github.io · haivijayanand@gmail.com', notes=''):
        s = self.new('VA Thank You', notes)
        self.title(s, title); self.text(s, 1, line, size=20); self.text(s, 10, contact, size=14)
        return s

    def save(self, path):
        Path(path).parent.mkdir(parents=True, exist_ok=True)
        self.prs.save(path)


def table_size(header, rows):
    ncol = max(len(r) for r in ([header] if header else []) + rows)
    longest = max(len(c) for r in rows for c in r) if rows else 10
    return 13 if ncol <= 4 and longest < 120 else 12 if ncol <= 6 else 11 if ncol <= 8 else 10


def table_chunks(header, rows, size=None, avail_mm=128):
    """Split rows so each chunk fits the table area."""
    size = size or table_size(header, rows)
    ncol = max(len(r) for r in ([header] if header else []) + rows)
    allr = ([header] if header else []) + rows
    lens = [max(6, max(min(len(r[c]) if c < len(r) else 0, 90) for r in allr)) for c in range(ncol)]
    wts = [math.sqrt(x) + 1.5 for x in lens]; tot = sum(wts)
    colw = [272 * w / tot - 3 for w in wts]
    lh = 1.17 * size * 0.3528
    def rh(r):
        return max(est_lines(r[c] if c < len(r) else '', colw[c], size * 0.9) for c in range(ncol)) * lh + 1.7
    hh = rh(header) if header else 0
    chunks, cur, used = [], [], hh
    for r in rows:
        h = rh(r)
        if cur and used + h > avail_mm:
            chunks.append(cur); cur, used = [], hh
        cur.append(r); used += h
    if cur: chunks.append(cur)
    if len(chunks) > 1:                       # balance the parts
        n = len(chunks); per = math.ceil(len(rows) / n)
        bal = [rows[i:i + per] for i in range(0, len(rows), per)]
        if len(bal) == n and all(hh + sum(rh(r) for r in c) <= avail_mm for c in bal): chunks = bal
    return chunks, size


def best_table_size(header, rows, top=16):
    """Largest font size (<= top) at which the whole table fits one slide; None if it never does."""
    for sz in range(top, 9, -1):
        ch, _ = table_chunks(header, rows, size=sz)
        if len(ch) == 1: return sz
    return None


def eq_group_ok(imgs, where=True):
    """True if these equation snapshots can share one slide at a readable size (>= 0.17 mm per pixel)."""
    w, h = 248 * MM, (82 if where else 152) * MM
    n = len(imgs); each = (h - 3 * MM * (n - 1)) / n
    return all(min(w / iw, each / ih) >= 0.17 * MM for iw, ih in (trim(i)[1] for i in imgs))
