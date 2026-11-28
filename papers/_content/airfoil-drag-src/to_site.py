# -*- coding: utf-8 -*-
"""
TOOL:    to_site.py - converts the airfoil-drag paper into the haivijayanand.github.io papers/_content format
FAMILY:  technical-papers / airfoil-drag-aircraft-performance
VERSION: 1.0.0
DATE:    2026-11-28
CHAT:    Airfoil drag characteristics and aircraft/rotorcraft performance (Aerodynamics Related project)
CHANGES: 1.0.0 - first version: pandoc HTML (MathML) to site Markdown, arabic section/table numbers, site figure blocks, references list
"""
__version__ = "1.0.0"
import re, subprocess, sys, html as H

SLUG = "airfoil-drag-aircraft-performance"
ROM = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX"]
R2A = {r: i + 1 for i, r in enumerate(ROM)}
RPAT = "|".join(sorted(ROM, key=len, reverse=True))

def main(src_md, out_md):
    frag = subprocess.run(["pandoc", src_md, "-f", "markdown", "-t", "html5", "--mathml", "--wrap=none"],
                          capture_output=True, text=True, check=True).stdout
    # Roman section and table numbers in running text -> arabic (site convention)
    frag = re.sub(rf"\b(Sections?)(&nbsp;|\s)({RPAT})\b", lambda m: f"{m.group(1)}&nbsp;{R2A[m.group(3)]}", frag)
    frag = re.sub(rf"(Sections&nbsp;\d+)(–|&ndash;)({RPAT})\b", lambda m: f"{m.group(1)}–{R2A[m.group(3)]}", frag)
    frag = re.sub(rf"(Sections&nbsp;\d+) and ({RPAT})\b", lambda m: f"{m.group(1)} and {R2A[m.group(2)]}", frag)
    frag = re.sub(rf"(Sections&nbsp;\d+), ({RPAT}) and ({RPAT})\b",
                  lambda m: f"{m.group(1)}, {R2A[m.group(2)]} and {R2A[m.group(3)]}", frag)
    frag = re.sub(rf"\bTable ({RPAT})\b", lambda m: f"Table&nbsp;{R2A[m.group(1)]}", frag)

    out = []
    sec = 0; sub = 0; numbered = False
    tokens = re.split(r"(<h1[^>]*>.*?</h1>|<h2[^>]*>.*?</h2>)", frag, flags=re.S)
    for tok in tokens:
        m1 = re.match(r'<h1([^>]*)>(.*?)</h1>', tok, re.S)
        m2 = re.match(r'<h2([^>]*)>(.*?)</h2>', tok, re.S)
        if m1:
            title = re.sub(r"<[^>]+>", "", m1.group(2)).strip()
            if "unnumbered" in m1.group(1):
                numbered = False
                if title == "Acknowledgement": title = "Acknowledgment"
                out.append(f"\n## {title}\n")
            else:
                sec += 1; sub = 0; numbered = True
                out.append(f"\n## {sec}. {title}\n")
            continue
        if m2:
            title = re.sub(r"<[^>]+>", "", m2.group(2)).strip()
            if numbered:
                sub += 1; out.append(f"\n### {sec}.{sub} {title}\n")
            else:
                out.append(f"\n### {title}\n")
            continue
        out.append(tok)
    body = "".join(out)

    # abstract and keywords
    def abstract(m):
        inner = m.group(1).strip()
        inner = re.sub(r"<strong>Abstract</strong>(—|&mdash;)", "", inner)
        return "## Abstract\n\n" + inner + "\n"
    body = re.sub(r'<div class="abstract">(.*?)</div>', abstract, body, flags=re.S)
    body = re.sub(r'<div class="keywords">\s*<p><strong><em>Index Terms</em></strong>(—|&mdash;)(.*?)</p>\s*</div>',
                  lambda m: f"<p><b>Index Terms</b>&mdash;{m.group(2)}</p>\n", body, flags=re.S)

    # figures
    def fig(m):
        src = re.search(r'src="fig/([^"]+)"', m.group(0)).group(1)
        cap = re.search(r"<figcaption[^>]*>(.*?)</figcaption>", m.group(0), re.S).group(1).strip()
        cm = re.match(r"Fig\. (\d+)\. (.*)", cap, re.S)
        n, text = cm.group(1), cm.group(2)
        alt = H.escape(re.sub(r"<[^>]+>", "", text)[:160], quote=True)
        p = f"img/{SLUG}/{src}"
        return (f'\n<div class="figrow one"><figure id="fig-{n}"><a class="zoom" href="{p}" target="_blank" rel="noopener">'
                f'<img src="{p}" alt="{alt}" loading="lazy" style="background:#fff;width:100%;max-width:640px"></a>'
                f'<figcaption><b>Figure {n}.</b> {text}<span class="credit">Chart by the author</span></figcaption></figure></div>\n')
    body = re.sub(r"<figure>.*?</figure>", fig, body, flags=re.S)

    # tables: caption -> tcap div above table
    def tab(m):
        t = m.group(0)
        cap = re.search(r"<caption>(.*?)</caption>", t, re.S)
        t = re.sub(r"<caption>.*?</caption>", "", t, flags=re.S)
        t = re.sub(r"<colgroup>.*?</colgroup>", "", t, flags=re.S)
        t = re.sub(r"<table[^>]*>", "<table>", t)
        t = re.sub(r"\n\s*\n", "\n", t)
        head = ""
        if cap:
            c = re.sub(r"</?p>", "", cap.group(1)).strip()
            cm = re.match(rf"TABLE (?:&nbsp;)?({RPAT}|\d+)\. (.*)", c, re.S)
            if cm:
                num = cm.group(1); num = R2A.get(num, num)
                head = f'<div class="tcap"><b>Table {num}.</b> {cm.group(2)}</div>\n\n'
            else:
                head = f'<div class="tcap">{c}</div>\n\n'
        return "\n" + head + t + "\n"
    body = re.sub(r"<table>.*?</table>", tab, body, flags=re.S)

    # display equations
    body = re.sub(r'<p><math display="block"', '<p class="eqn"><math display="block"', body)

    # references: refs div -> markdown numbered list
    def refs(m):
        items = re.findall(r"<p>\[(\d+)\]\s*(.*?)</p>", m.group(1), re.S)
        return "\n" + "\n".join(f"{n}. {re.sub(r'<em>(.*?)</em>', r'<i>\1</i>', t).strip()}" for n, t in items) + "\n"
    body = re.sub(r'<div class="refs">(.*?)</div>', refs, body, flags=re.S)
    body = re.sub(r"<em>(.*?)</em>", r"<i>\1</i>", body, flags=re.S)
    body = re.sub(r"<strong>(.*?)</strong>", r"<b>\1</b>", body, flags=re.S)

    # every HTML block separated by blank lines so Python-Markdown passes it through untouched
    body = re.sub(r"\n(<(p|ol|ul|div|h[1-6]|table)\b)", r"\n\n\1", body)
    body = re.sub(r"\n{3,}", "\n\n", body).strip() + "\n"
    if not body.startswith("## Abstract"):
        body = body[body.index("## Abstract"):]
    style = ('<style>\n.tcap{font-family:Inter,system-ui,sans-serif;font-size:13.5px;color:var(--ink-soft);margin:22px auto 6px}\n'
             '.eqn{text-align:center;font-size:1.05em;margin:14px 0;overflow-x:auto}\n'
             'math{font-size:1.02em}\n</style>\n\n')
    open(out_md, "w", encoding="utf-8").write(style + body)
    print("sections", sec, "->", out_md)

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
