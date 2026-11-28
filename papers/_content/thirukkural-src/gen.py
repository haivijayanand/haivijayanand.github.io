#!/usr/bin/env python3
"""
TOOL:    gen.py — builds the Thirukkural (Ulaga Pothu Marai) paper: site Markdown + IEEE two-column HTML
FAMILY:  papers
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    Thirukkural Ulaga Pothu Marai technical paper
CHANGES: 1.0.0 - !K kural blocks from the open dataset, !TABLE/!FIG/!CHAPTERTABLE markers, arabic numbering for
                 the site and roman (IEEE) numbering for the PDF source
"""
__version__ = "1.0.0"
import html, json, re, sys
from pathlib import Path
import tiers

SLUG = "thirukkural-ulaga-pothu-marai"
TITLE = "Is the Thirukkural Timeless? Testing the Ulaga Pothu Marai Against Past, Present and Future"
DATE_NICE = "22 November 2026"
HERE = Path(__file__).resolve().parent
HERE = Path(__file__).resolve().parent
K = {k["Number"]: k for k in json.load(open(str(HERE / "tk.json")))["kural"]}
CH = {r[0]: r for r in json.load(open(str(HERE / "chapters.json")))}
EN = {2: "The excellence of rain", 3: "The greatness of renunciants", 6: "The worth of a wife", 10: "Pleasant speech",
      14: "Good conduct", 15: "Not coveting another’s wife", 16: "Patience and forbearance", 20: "Avoiding empty talk",
      22: "Duty to society", 26: "Abstaining from meat", 29: "Not stealing", 32: "Not doing harm", 33: "Not killing",
      34: "Impermanence", 36: "Knowledge of truth", 39: "The greatness of a ruler", 42: "Listening",
      43: "Possessing knowledge", 44: "Correcting faults", 45: "Seeking wise counsel", 46: "Avoiding bad company",
      47: "Acting after deliberation", 48: "Knowing strength", 49: "Knowing the right time", 50: "Knowing the right place",
      51: "Testing before trusting", 52: "Testing and employing", 53: "Caring for kin", 54: "Vigilance",
      57: "Not ruling by terror", 58: "Kindly regard", 59: "Spies", 60: "Energy", 61: "Freedom from sloth",
      62: "Effort", 63: "Courage in adversity", 64: "The minister", 65: "Power of speech", 70: "Conduct before rulers",
      71: "Reading intentions", 72: "Knowing the assembly", 73: "Fearlessness before the assembly", 74: "The country",
      75: "The fortress", 76: "Ways of making wealth", 77: "The army", 78: "Military spirit", 80: "Testing friendship",
      81: "Old friendship", 82: "Bad friendship", 83: "False friendship", 85: "Conceit of ignorance", 87: "Strength of enmity",
      88: "Knowing the nature of enmity", 89: "Enmity within", 90: "Not offending the great", 91: "Being led by women",
      92: "Women of no fixed attachment", 93: "Not drinking", 96: "Nobility of family", 99: "Perfect goodness",
      101: "Wealth that does no good", 102: "Sense of shame", 103: "Raising one’s community", 104: "Farming",
      106: "Begging", 107: "Dread of begging", 108: "Meanness", 109: "The beauty that troubles",
      110: "Reading the signs", 111: "Joy of union", 112: "Praise of her beauty", 113: "Love’s excellence",
      114: "Casting off reserve", 115: "The rumour", 116: "Separation unbearable", 117: "Pining", 118: "Eyes that grieve",
      119: "Pallor", 120: "Lonely anguish", 121: "Memories", 122: "Dreams", 123: "Evening sorrow", 124: "Wasting away",
      125: "Talking to one’s heart", 126: "Reserve broken", 127: "Longing", 128: "Revealing the signs",
      129: "Longing for reunion", 130: "Quarrel with one’s heart", 131: "Sulking", 132: "Subtleties of sulking",
      133: "The joy of lovers’ quarrels", 38: "Fate", 1: "In praise of the first cause"}
def en(n): return EN.get(n, CH[n][4].replace('"', "’"))
def chap_of(k): return next(n for n, r in CH.items() if r[6] <= k <= r[7])
ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV"]
LET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

def smart(s):
    s = re.sub(r'"([^"<>]*?)"', "\u201c\\1\u201d", s)
    return s.replace("'", "\u2019")

def inline(s):
    s = html.escape(smart(s), quote=False)
    s = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", s)
    s = re.sub(r"(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?!\w)", r"<i>\1</i>", s)
    return s

def kural_html(n, tr, ieee=False):
    k = K[n]; c = chap_of(n)
    l1, l2 = k["Line1"].strip(), k["Line2"].strip()
    t1, t2 = k["transliteration1"].strip(), k["transliteration2"].strip()
    ref = f"Kural {n} · Ch. {c}, <span lang=\"ta\">{CH[c][3]}</span> ({en(c)})"
    return (f'<div class="kural" id="k{n}"><div class="kta" lang="ta">{l1}<br>{l2}</div>'
            f'<div class="ktl">{html.escape(t1)}<br>{html.escape(t2)}</div>'
            f'<div class="ken">{inline(tr)}</div><div class="kref">{ref}</div></div>')

def table_html(rows, ieee):
    head, body = rows[0], rows[1:]
    h = "<table><thead><tr>" + "".join(f"<th>{inline(c)}</th>" for c in head) + "</tr></thead><tbody>"
    for r in body:
        h += "<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>"
    return h + "</tbody></table>"

def chapter_table(ieee):
    rows = ""
    for n in range(1, 134):
        t, note = tiers.T[n]
        part = "Aram" if n <= 38 else ("Porul" if n <= 108 else "Inbam")
        rows += (f'<tr><td>{n}</td><td>{part}</td><td lang="ta">{CH[n][3]}</td><td>{html.escape(en(n))}</td>'
                 f'<td><span class="tier t{t}">{t}</span></td><td>{html.escape(note)}</td></tr>')
    return ('<table class="chap"><thead><tr><th>No.</th><th>Book</th><th>Chapter (Tamil)</th><th>Chapter (English)</th>'
            '<th>Tier</th><th>For B and C: dated element; surviving principle</th></tr></thead><tbody>' + rows + "</tbody></table>")

def parse(text):
    lines = text.split("\n"); i = 0; blocks = []
    while i < len(lines):
        L = lines[i]
        if not L.strip(): i += 1; continue
        if L.startswith("## "): blocks.append(("h2", L[3:].strip())); i += 1; continue
        if L.startswith("### "): blocks.append(("h3", L[4:].strip())); i += 1; continue
        if L.startswith("!K "):
            n, tr = L[3:].split("|", 1); blocks.append(("k", int(n), tr.strip())); i += 1; continue
        if L.startswith("!FIG "):
            f, cap = L[5:].split("|", 1); blocks.append(("fig", f.strip(), cap.strip())); i += 1; continue
        if L.startswith("!CHAPTERTABLE"): blocks.append(("ctab",)); i += 1; continue
        if L.startswith("!KINDEX"): blocks.append(("kidx",)); i += 1; continue
        if L.startswith("!TABLE"):
            cap = L.split("|", 1)[1].strip(); i += 1; rows = []
            while not lines[i].startswith("!END"):
                r = [c.strip() for c in lines[i].strip().strip("|").split("|")]
                if not all(re.fullmatch(r"-+", c) for c in r): rows.append(r)
                i += 1
            blocks.append(("tab", cap, rows)); i += 1; continue
        if re.match(r"^(- |\d+\. )", L):
            ordered = bool(re.match(r"^\d+\. ", L)); items = []
            while i < len(lines) and re.match(r"^(- |\d+\. )", lines[i]):
                items.append(re.sub(r"^(- |\d+\. )", "", lines[i])); i += 1
            blocks.append(("ol" if ordered else "ul", items)); continue
        para = [L]; i += 1
        while i < len(lines) and lines[i].strip() and not re.match(r"^(##|!|- |\d+\. )", lines[i]):
            para.append(lines[i]); i += 1
        blocks.append(("p", " ".join(para)))
    return blocks

def numbering(blocks):
    """attach section numbers; returns list with ('h2', title, num) etc."""
    out = []; s = 0; ss = 0; tabn = 0; fign = 0
    for b in blocks:
        if b[0] == "h2":
            if b[1] in ("Abstract", "Acknowledgement", "References") or b[1].startswith("Appendix"): out.append(("h2", b[1], None)); continue
            s += 1; ss = 0; out.append(("h2", b[1], s))
        elif b[0] == "h3":
            ss += 1; out.append(("h3", b[1], (s, ss)))
        elif b[0] in ("tab", "ctab", "kidx"):
            tabn += 1; out.append(b + (tabn,))
        elif b[0] == "fig":
            fign += 1; out.append(b + (fign,))
        else: out.append(b)
    return out

def to_roman_refs(s):
    def sec(m):
        a, b = m.group(1), m.group(2)
        return f"{ROMAN[int(a)]}-{LET[int(b)-1]}" if b else ROMAN[int(a)]
    s = re.sub(r"(?<=Section )(\d+)(?:\.(\d+))?", sec, s)
    s = re.sub(r"(?<=Sections )(\d+)(?:\.(\d+))?", sec, s)
    s = re.sub(r"(Sections [IVX]+ (?:and|to) )(\d+)", lambda m: m.group(1) + ROMAN[int(m.group(2))], s)
    s = s.replace("Figure ", "Fig. ")
    return s

def to_arabic_tables(s):
    rv = {v: i for i, v in enumerate(ROMAN) if v}
    return re.sub(r"Table ([IVX]+)\b", lambda m: f"Table {rv[m.group(1)]}", s)

def refs_html(items, ieee):
    out = []
    for it in items:
        t = inline(it)
        t = re.sub(r"(https?://[^\s;<]+)", r'<a href="\1">\1</a>', t)
        out.append(f"<li>{t}</li>")
    return out

# ------------------------------------------------------------------ site markdown
SITE_CSS = """<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Tamil:wght@400;600&display=swap');
.kural{margin:18px auto 22px;padding:14px 18px 12px;border-left:4px solid var(--accent);background:var(--tint);border-radius:0 10px 10px 0;max-width:880px}
.kural .kta{font-family:"Noto Serif Tamil","Latha","Nirmala UI",serif;font-size:1.08em;line-height:1.75;font-weight:600;color:var(--ink)}
.kural .ktl{font-family:Inter,system-ui,sans-serif;font-size:.78em;font-style:italic;color:var(--ink-faint);margin:4px 0 6px;line-height:1.45}
.kural .ken{font-size:1em;line-height:1.55;color:var(--ink)}
.kural .kref{font-family:Inter,system-ui,sans-serif;font-size:.72em;color:var(--ink-soft);margin-top:6px;letter-spacing:.02em}
.kural .kref span{font-family:"Noto Serif Tamil","Latha","Nirmala UI",serif}
[lang="ta"]{font-family:"Noto Serif Tamil","Latha","Nirmala UI",serif}
.tier{display:inline-block;min-width:22px;text-align:center;font-family:Inter,sans-serif;font-weight:700;font-size:12px;border-radius:5px;padding:1px 6px}
.tier.tA{background:#1f5a99;color:#fff}.tier.tB{background:#e08a1e;color:#1d1d1d}.tier.tC{background:#8f969e;color:#fff}
table.chap td,table.chap th{font-size:13px;padding:6px 8px}
.tcap{font-family:Inter,system-ui,sans-serif;font-size:13.5px;color:var(--ink-soft);margin:22px auto 6px}
@media print{.kural{padding:6pt 9pt;margin:7pt 0;break-inside:avoid}.kural .kta{font-size:10pt}.kural .ktl{font-size:7.5pt}.kural .ken{font-size:9.5pt}.kural .kref{font-size:7pt}table.chap td,table.chap th{font-size:7.3pt;padding:2pt 4pt}}
</style>"""

def build_site(blocks):
    out = [SITE_CSS, ""]
    for b in blocks:
        t = b[0]
        if t == "h2":
            out.append(f"## {smart(b[1])}" if b[2] is None else f"## {b[2]}. {smart(b[1])}"); out.append("")
        elif t == "h3":
            out.append(f"### {b[2][0]}.{b[2][1]} {smart(b[1])}"); out.append("")
        elif t == "p":
            out.append(f"<p>{to_arabic_tables(inline(b[1]))}</p>"); out.append("")
        elif t in ("ul", "ol"):
            tag = t
            out.append(f"<{tag}>" + "".join(f"<li>{to_arabic_tables(inline(x))}</li>" for x in b[1]) + f"</{tag}>"); out.append("")
        elif t == "k":
            out.append(kural_html(b[1], b[2])); out.append("")
        elif t == "tab":
            out.append(f'<div class="tcap"><b>Table {b[3]}.</b> {inline(b[1])}</div>')
            out.append('<div class="tbl wide">' + to_arabic_tables(table_html(b[2], False)) + "</div>"); out.append("")
        elif t == "ctab":
            out.append(f'<div class="tcap"><b>Table {b[1]}.</b> Tier classification of all 133 chapters (A: holds as stated; B: principle holds, setting dated; C: framing era-bound or contested).</div>')
            out.append('<div class="tbl wide">' + chapter_table(False) + "</div>"); out.append("")
        elif t == "kidx":
            out.append(f'<div class="tcap"><b>Table {b[1]}.</b> Index of the couplets quoted in this paper.</div>')
            out.append('<div class="tbl wide">' + kindex_html() + "</div>"); out.append("")
        elif t == "fig":
            f, cap, n = b[1], b[2], b[3]
            src = f"img/{SLUG}/{f}"
            out.append(f'<div class="figrow one"><figure id="fig-{n}"><a class="zoom" href="{src}" target="_blank" rel="noopener">'
                       f'<img src="{src}" alt="{html.escape(re.sub(r"[*]", "", cap.split(".")[0]))}" loading="lazy" style="background:#fff;width:100%;max-width:820px"></a>'
                       f'<figcaption><b>Figure {n}.</b> {to_arabic_tables(inline(cap))}<span class="credit">Chart by the author</span></figcaption></figure></div>')
            out.append("")
        elif t == "refs":
            for i, it in enumerate(b[1], 1):
                it2 = re.sub(r"(https?://[^\s;]+)", r"<\1>", it)
                out.append(f"{i}. {inline(it2).replace('&lt;', '<').replace('&gt;', '>')}")
            out.append("")
    return "\n".join(out)

# ------------------------------------------------------------------ IEEE html
IEEE_CSS = """
@page { size: A4; margin: 18mm 14mm 19mm 14mm; }

body { font-family: 'TeX Gyre Termes','Times New Roman','Liberation Serif',serif; font-size: 10pt; line-height: 1.22; color:#000; margin:0; }
[lang="ta"], .kta { font-family: 'Noto Serif Tamil', serif; }
.title { text-align:center; font-size: 22pt; line-height:1.15; margin: 0 0 10px; font-weight: normal; }
.authors { text-align:center; font-size: 11pt; margin: 0 0 2px; }
.series { text-align:center; font-size: 8.5pt; font-style: italic; margin: 0 0 14px; }
.cols { column-count: 2; column-gap: 4.5mm; text-align: justify; hyphens: auto; }
p { margin: 0; text-indent: 1em; orphans: 2; widows: 2; }
p.ni { text-indent: 0; }
.abstract, .index { font-weight: bold; font-size: 9pt; text-indent: 0; margin-bottom: 6px; }
.abstract i, .index i { font-weight: bold; }
h2 { font-size: 10pt; font-weight: normal; font-variant: small-caps; text-align: center; margin: 10px 0 4px; letter-spacing: .3px; break-after: avoid; }
h3 { font-size: 10pt; font-weight: normal; font-style: italic; margin: 6px 0 2px; break-after: avoid; }
ul, ol { margin: 2px 0 4px; padding-left: 14px; }
li { margin-bottom: 1px; }
.wide { column-span: all; margin: 8px 0 10px; }
.tcap { text-align:center; font-size: 8pt; margin-bottom: 3px; break-after: avoid; }
.tcap .tn { display:block; letter-spacing:.5px; }
.tcap .tt { font-variant: small-caps; font-size: 8.5pt; }
table { border-collapse: collapse; width: 100%; font-size: 8pt; text-align: left; hyphens: auto; }
th, td { padding: 2px 4px; vertical-align: top; text-align: left; }
thead { display: table-header-group; }
tr { break-inside: avoid; }
thead th { border-top: 1px solid #000; border-bottom: .6px solid #000; font-weight: normal; font-variant: small-caps; }
tbody tr:last-child td { border-bottom: 1px solid #000; }
table.chap { font-size: 7.2pt; line-height: 1.18; }
table.chap td { padding: 1.2px 3px; }
table.chap tbody tr:nth-child(even) td { background: #f3f3f3; }
.tier { display:inline-block; min-width: 11px; text-align:center; font-weight:bold; border-radius: 2px; padding: 0 2px; font-family: 'Liberation Sans', sans-serif; font-size: 6.8pt; }
.tier.tA { background:#1f5a99; color:#fff; } .tier.tB { background:#e08a1e; color:#000; } .tier.tC { background:#8f969e; color:#fff; }
.kural { margin: 5px 0 6px; padding: 3px 0 3px 7px; border-left: 1.6px solid #000; break-inside: avoid; text-align: left; hyphens: manual; }
.kta { font-size: 8.6pt; line-height: 1.42; font-weight: 600; }
.ktl { font-size: 7.6pt; font-style: italic; line-height: 1.2; margin: 1px 0 2px; color:#222; }
.ken { font-size: 9.2pt; line-height: 1.22; }
.kref { font-size: 7pt; margin-top: 1px; color:#333; }
.kref span { font-size: 6.8pt; }
figure { margin: 0; text-align: center; }
figure.col { margin: 6px 0 8px; break-inside: avoid; }
figure.col img { width: 100%; }
figure.wide img { width: 80%; }
figcaption { font-size: 8pt; text-align: justify; margin-top: 3px; }
.refs { font-size: 8pt; text-indent: 0; }
.refs ol { list-style: none; padding-left: 0; counter-reset: r; margin: 0; }
.refs li { counter-increment: r; position: relative; padding-left: 22px; margin-bottom: 2px; text-align: left; word-break: break-word; }
.refs li::before { content: "[" counter(r) "]"; position: absolute; left: 0; }
.refs a { color:#000; text-decoration:none; }
b { font-weight: bold; }
"""

def build_ieee(blocks, imgdir):
    o = []; first_after_head = True
    abstract_mode = False
    for b in blocks:
        t = b[0]
        if t == "h2":
            if b[1] == "Abstract": abstract_mode = True; continue
            abstract_mode = False
            o.append(f"<h2>{b[1]}</h2>" if b[2] is None else f"<h2>{ROMAN[b[2]]}. {inline(b[1])}</h2>")
            first_after_head = True; continue
        if t == "h3":
            o.append(f"<h3>{LET[b[2][1]-1]}. {inline(b[1])}</h3>"); first_after_head = True; continue
        if t == "p":
            txt = to_roman_refs(inline(b[1]))
            if abstract_mode:
                if txt.startswith("<b>Keywords:</b>"):
                    o.append('<p class="index"><i>Index Terms</i>—' + txt.replace("<b>Keywords:</b> ", "") + "</p>")
                else:
                    o.append('<p class="abstract"><i>Abstract</i>—' + txt + "</p>")
                continue
            cls = ' class="ni"' if first_after_head else ""
            o.append(f"<p{cls}>{txt}</p>"); first_after_head = False; continue
        if t in ("ul", "ol"):
            o.append(f"<{t}>" + "".join(f"<li>{to_roman_refs(inline(x))}</li>" for x in b[1]) + f"</{t}>"); continue
        if t == "k":
            o.append(kural_html(b[1], b[2], True)); first_after_head = True; continue
        if t == "tab":
            o.append(f'<div class="wide"><div class="tcap"><span class="tn">TABLE {ROMAN[b[3]]}</span><span class="tt">{inline(b[1])}</span></div>'
                     + to_roman_refs(table_html(b[2], True)) + "</div>"); continue
        if t == "ctab":
            o.append(f'<div class="wide"><div class="tcap"><span class="tn">TABLE {ROMAN[b[1]]}</span><span class="tt">Tier Classification of All 133 Chapters</span></div>'
                     + chapter_table(True) + '<p class="ni" style="font-size:7.5pt;margin-top:2px">A: holds as stated; B: principle holds, setting dated; C: framing era-bound or contested. Classification by the author (Section V).</p></div>'.replace("Section V", "Section V"))
            continue
        if t == "kidx":
            o.append(f'<div class="wide"><div class="tcap"><span class="tn">TABLE {ROMAN[b[1]]}</span><span class="tt">Index of the Couplets Quoted in This Paper</span></div>' + kindex_html() + "</div>"); continue
        if t == "fig":
            o.append(f'<div class="wide"><figure class="wide"><img src="{imgdir}/{b[1]}"><figcaption><i>Fig. {b[3]}.</i> {to_roman_refs(inline(b[2]))}</figcaption></figure></div>'); continue
        if t == "refs":
            o.append('<div class="refs"><ol>' + "".join(refs_html(b[1], True)) + "</ol></div>"); continue
    body = "\n".join(o)
    return f"""<!DOCTYPE html>
<!--
TOOL:    papers/_content/{SLUG}.ieee.html
FAMILY:  papers
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    Thirukkural Ulaga Pothu Marai technical paper
CHANGES: 1.0.0 - IEEE two-column A4 source; generated by gen.py; print to pdf/{SLUG}.pdf (supplied PDF)
STATUS:  working
-->
<html><head><meta charset="utf-8">
<title>{html.escape(TITLE)}</title>
<style>{IEEE_CSS}</style></head>
<body>
<h1 class="title">{html.escape(TITLE)}</h1>
<div class="authors">K Vijay Anand</div>
<div class="series">Technical Papers · {DATE_NICE} · haivijayanand.github.io/papers</div>
<div class="cols">
{body}
</div>
</body></html>"""

def load():
    src = "\n".join((HERE / f).read_text(encoding="utf-8") for f in ("src1.md", "src2.md", "src3.md"))
    pre, refs = src.split("## References", 1)
    blocks = numbering(parse(pre))
    items = [re.sub(r"^\d+\.\s*", "", l) for l in refs.strip().split("\n") if l.strip()]
    blocks.append(("h2", "References", None)); blocks.append(("refs", items))
    # chapter table gets its table number in slot 1
    blocks = [(b[0], b[1]) if b[0] in ("ctab", "kidx") else b for b in blocks]
    global KTR
    KTR = {}
    for b in blocks:
        if b[0] == "k" and b[1] not in KTR: KTR[b[1]] = b[2]
    return blocks

def kindex_html():
    rows = ""
    for n in sorted(KTR):
        c = chap_of(n); t = tiers.T[c][0]
        first = re.split(r"(?<=[.?!])\s", KTR[n])[0]
        rows += (f'<tr><td>{n}</td><td>{c}, {html.escape(en(c))}</td><td><span class="tier t{t}">{t}</span></td>'
                 f'<td>{inline(first)}</td></tr>')
    return ('<table class="chap kidx"><thead><tr><th>Kural</th><th>Chapter</th><th>Tier</th><th>Translation (first sentence)</th></tr></thead><tbody>'
            + rows + "</tbody></table>")

if __name__ == "__main__":
    blocks = load()
    out = Path(sys.argv[1]) if len(sys.argv) > 1 else HERE / "out"
    out.mkdir(exist_ok=True)
    (out / f"{SLUG}.md").write_text(build_site(blocks), encoding="utf-8")
    (out / f"{SLUG}.ieee.html").write_text(build_ieee(blocks, f"../img/{SLUG}"), encoding="utf-8")
    print("written", out)
