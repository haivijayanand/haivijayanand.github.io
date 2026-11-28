# -*- coding: utf-8 -*-
"""
TOOL:    to_site.py - converts the AVL review paper into the haivijayanand.github.io papers/_content format
FAMILY:  technical-papers / avl-athena-vortex-lattice-review
VERSION: 1.0.0
DATE:    2026-11-28
CHAT:    AVL (Athena Vortex Lattice) technical paper - history, usage, improvements, limitations
CHANGES: 1.0.0 - first version: arabic section/table numbers, site figure blocks (img/<slug>/), tcap table captions,
         markdown reference list, Section VIII-F -> Section 8.6 style cross references
"""
__version__ = "1.0.0"
import html as H
import re
import sys

SLUG = "avl-athena-vortex-lattice-review"
ROM = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI"]
R2A = {r: i + 1 for i, r in enumerate(ROM)}
RPAT = "|".join(sorted(ROM, key=len, reverse=True))
FIGS = {"f1": "fig1_lattice.png", "f2": "fig2_validation.png", "f3": "fig3_alpha_sweep.png",
        "f4": "fig4_spanload.png", "f5": "fig5_eigen.png", "f6": "fig6_flying_wing.png"}


def main(src_html, out_md):
    s = open(src_html, encoding="utf-8").read()
    body = re.search(r"<main>(.*)</main>", s, re.S).group(1)
    body = re.sub(r'<header class="paper-head">.*?</header>', "", body, flags=re.S)

    # cross references to sections: "Section VIII-F" -> "Section 8.6", "Sections II-III" -> "Sections 2-3"
    body = re.sub(rf"\b(Sections?)\s({RPAT})-([A-Z])\b",
                  lambda m: f"{m.group(1)}&nbsp;{R2A[m.group(2)]}.{ord(m.group(3)) - 64}", body)
    body = re.sub(rf"\(Sections ({RPAT})(&ndash;|–)({RPAT})\)",
                  lambda m: f"(Sections&nbsp;{R2A[m.group(1)]}&ndash;{R2A[m.group(3)]})", body)
    body = re.sub(rf"\b(Sections?)\s({RPAT})\b", lambda m: f"{m.group(1)}&nbsp;{R2A[m.group(2)]}", body)
    body = re.sub(rf"\bTable ({RPAT})\b", lambda m: f"Table&nbsp;{R2A[m.group(1)]}", body)
    body = re.sub(r"\bFig\. (\d)", r"Figure&nbsp;\1", body)

    # abstract
    def abstract(m):
        inner = m.group(1)
        inner = inner.replace("<p><b><i>Abstract</i></b>&mdash;", "<p>")
        inner = inner.replace("<b><i>Index Terms</i></b>", "<b>Index Terms</b>")
        return "\n## Abstract\n\n" + inner.strip() + "\n"
    body = re.sub(r'<section class="abstract">(.*?)</section>', abstract, body, flags=re.S)

    # headings
    out, sec, sub, numbered = [], 0, 0, False
    for tok in re.split(r"(<h2[^>]*>.*?</h2>|<h3>.*?</h3>)", body, flags=re.S):
        m2 = re.match(r"<h2([^>]*)>(.*?)</h2>", tok, re.S)
        m3 = re.match(r"<h3>(.*?)</h3>", tok, re.S)
        if m2:
            t = re.sub(r"<[^>]+>", "", m2.group(2)).strip()
            if "noroman" in m2.group(1):
                numbered = False
                t = t.replace("Acknowledgement", "Acknowledgment").replace(" &ndash; ", ": ")
                out.append(f"\n## {t}\n")
            else:
                sec += 1; sub = 0; numbered = True
                t = re.sub(rf"^({RPAT})\.\s*", "", t)
                out.append(f"\n## {sec}. {t}\n")
            continue
        if m3:
            t = re.sub(r"^[A-Z]\.\s*", "", m3.group(1).strip())
            if numbered:
                sub += 1; out.append(f"\n### {sec}.{sub} {t}\n")
            else:
                out.append(f"\n### {t}\n")
            continue
        out.append(tok)
    body = "".join(out)

    # figures
    def fig(m):
        fid = m.group(1)
        cap = re.search(r"<figcaption>(.*?)</figcaption>", m.group(0), re.S).group(1).strip()
        cm = re.match(r"(?:Fig\.|Figure&nbsp;)\s*(\d+)\.\s*(.*)", cap, re.S)
        n, text = cm.group(1), cm.group(2)
        alt = H.escape(re.sub(r"<[^>]+>|&[a-z]+;", "", text)[:160], quote=True)
        p = f"img/{SLUG}/{FIGS[fid]}"
        return (f'\n<div class="figrow one"><figure id="fig-{n}"><a class="zoom" href="{p}" target="_blank" rel="noopener">'
                f'<img src="{p}" alt="{alt}" loading="lazy" style="background:#fff;width:100%;max-width:640px"></a>'
                f'<figcaption><b>Figure {n}.</b> {text}<span class="credit">Chart by the author</span></figcaption></figure></div>\n')
    body = re.sub(r'<figure id="(f\d)">.*?</figure>', fig, body, flags=re.S)

    # tables
    def tab(m):
        t = m.group(0)
        cap = re.search(r"<caption>TABLE ([IVX]+)<br/>(.*?)</caption>", t, re.S)
        t = re.sub(r"<caption>.*?</caption>", "", t, flags=re.S)
        t = re.sub(r"<table[^>]*>", "<table>", t)
        t = re.sub(r"\n\s*\n", "\n", t)
        head = f'<div class="tcap"><b>Table {R2A[cap.group(1)]}.</b> {cap.group(2).strip()}</div>\n\n' if cap else ""
        return "\n" + head + t + "\n"
    body = re.sub(r"<table.*?</table>", tab, body, flags=re.S)

    # references -> markdown numbered list
    def refs(m):
        items = re.findall(r"<li>(.*?)</li>", m.group(1), re.S)
        return "\n" + "\n".join(f"{i + 1}. {re.sub(r'\\s+', ' ', x).strip()}" for i, x in enumerate(items)) + "\n"
    body = re.sub(r'<ol class="refs">(.*?)</ol>', refs, body, flags=re.S)

    # code blocks: no blank lines inside (raw HTML block must not be split)
    body = re.sub(r'<pre class="code">(.*?)</pre>',
                  lambda m: '<pre class="code">' + re.sub(r"\n\s*\n", "\n&#160;\n", m.group(1)) + "</pre>",
                  body, flags=re.S)
    body = re.sub(r"\n{3,}", "\n\n", body)

    style = ("<style>\n.tcap{font-family:Inter,system-ui,sans-serif;font-size:13.5px;color:var(--ink-soft);margin:22px auto 6px}\n"
             ".eq{text-align:center;font-size:1.05em;margin:14px 0;overflow-x:auto}\n"
             "pre.code{font-size:12px;line-height:1.35;overflow-x:auto;padding:10px;border:1px solid var(--line,#ccc);border-radius:6px}\n"
             "</style>\n")
    open(out_md, "w", encoding="utf-8").write(style + body.strip() + "\n")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
