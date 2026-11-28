# -*- coding: utf-8 -*-
"""
TOOL:    build.py - builds the XROTOR review paper as HTML (MathML, light/dark, full screen) and IEEE-style two-column PDF
FAMILY:  technical-papers / xrotor-propeller-code-review
VERSION: 1.1.0
DATE:    2026-11-28
CHAT:    XROTOR code review technical paper (2026-11-28)
CHANGES: 1.1.0 - reference for the 26 MW Dongfang turbine (worked wind-turbine design)
         1.0.0 - adapted from the XFOIL paper build: citation numbering, reference list, pandoc to LaTeX (ieee.lua)
         and HTML, pdflatex run
"""
__version__ = "1.1.0"
import glob, os, re, subprocess, sys

SLUG = "xrotor-propeller-code-review"
TITLE = "Inside XROTOR"
SUBTITLE = "A Code Review of the Propeller Lifting-Line Program"
AUTHOR = "K Vijay Anand"
DATE = "November 2026"

REFS = {
 "betz19": "A. Betz, \"Schraubenpropeller mit geringstem Energieverlust,\" with an appendix by L. Prandtl, *Nachr. Ges. Wiss. Göttingen, Math.-Phys. Kl.*, pp. 193–217, 1919.",
 "goldstein29": "S. Goldstein, \"On the vortex theory of screw propellers,\" *Proc. R. Soc. Lond. A*, vol. 123, no. 792, pp. 440–465, 1929.",
 "glauert35": "H. Glauert, \"Airplane propellers,\" in *Aerodynamic Theory*, vol. IV, W. F. Durand, Ed. Berlin, Germany: Springer, 1935, div. L.",
 "theodorsen48": "T. Theodorsen, *Theory of Propellers*. New York, NY, USA: McGraw-Hill, 1948.",
 "larrabee79": "E. E. Larrabee, \"Design of propellers for motorsoarers,\" in *Science and Technology of Low Speed and Motorless Flight*, NASA CP-2085, 1979 (NTRS 19790015732).",
 "adkins94": "C. N. Adkins and R. H. Liebeck, \"Design of optimum propellers,\" *J. Propuls. Power*, vol. 10, no. 5, pp. 676–682, 1994.",
 "wald06": "Q. R. Wald, \"The aerodynamics of propellers,\" *Prog. Aerosp. Sci.*, vol. 42, no. 2, pp. 85–128, 2006.",
 "kerwin07": "J. E. Kerwin, *Hydrofoils and Propellers*, lecture notes for MIT course 2.23. Cambridge, MA, USA: MIT OpenCourseWare, 2007.",
 "epps10": "B. P. Epps, *OpenProp v2.4 Theory Document*. Cambridge, MA, USA: MIT, 2010. [Online]. Available: https://openprop.engineering.dartmouth.edu/",
 "xrotorweb": "M. Drela and H. Youngren, \"XROTOR download page,\" MIT. [Online]. Available: https://web.mit.edu/drela/Public/web/xrotor/ (accessed Nov. 2026).",
 "xrotordoc": "M. Drela and H. Youngren, *XROTOR User Guide* (xrotor_doc.txt, last update 13 Nov. 2003) and *Version Notes* (version_notes.txt, 1998–2009), distributed with XROTOR 7.55. Cambridge, MA, USA: MIT.",
 "ilp02": "MIT Industrial Liaison Program, \"XROTOR: Propeller and windmill design/analysis software,\" research entry, principal investigator M. Drela, 10 May 2002. [Online]. Available: https://ilp.mit.edu/node/37058",
 "qprop": "M. Drela, \"QPROP and QMIL: propeller and windmill analysis and design,\" MIT, 2007, with the documents *QPROP Formulation* (2006) and *DC Motor / Propeller Matching*. [Online]. Available: https://web.mit.edu/drela/Public/web/qprop/",
 "dfdc05": "M. Drela and H. Youngren, \"Axisymmetric analysis and design of ducted rotors,\" DFDC theory document, draft, 8 Dec. 2005.",
 "dfdcweb": "M. Drela, H. Youngren et al., \"DFDC: Ducted Fan Design Code,\" MIT (GPL; developed under DARPA sponsorship). [Online]. Available: https://web.mit.edu/drela/Public/web/dfdc/",
 "mehr25": "J. Mehr, N. Lehnhof, and A. Ning, \"DuctAPE: A steady-state, axisymmetric ducted fan analysis code designed for gradient-based optimization,\" preprint, BYU FLOW Lab, 2025. [Online]. Available: https://flowlab.groups.et.byu.net/preprints/Mehr2025.pdf",
 "crotor": "\"Aerodynamic optimization of the Donut drone with oriented thrust rotor,\" Overleaf preprint (study with XROTOR and CROTOR). [Online]. Available: https://www.overleaf.com/articles/aerodynamic-optimization-of-the-donut-dron-with-oriented-thrust-rotor/xxkqpgbkvtwh",
 "xrotorpy": "D. de Vries, *xrotor-python*: stripped-down XROTOR as a compiled Python module (PyPI package \"xrotor\"), DARcorporation, 2018–. [Online]. Available: https://github.com/DARcorporation/xrotor-python",
 "xrotorc": "D. de Vries, *xrotor-c*: translation of XROTOR into C++. [Online]. Available: https://github.com/daniel-de-vries/xrotor-c",
 "pyxrotor": "*pyxrotor*: unofficial port of MIT XROTOR to Python/NumPy, and XROTOR 7.55 source mirror. [Online]. Available: https://github.com/mparadkar225/pyxrotor",
 "xrotormatlab": "D. Mangoni, *XRotorMatlab*: Drela's XROTOR modified to operate with MATLAB. [Online]. Available: https://github.com/dariomangoni/XRotorMatlab",
 "pdt": "*propeller_design_tools*: Python package automating XFOIL and XROTOR (PyPI). [Online]. Available: https://github.com/Charly-28/propeller_design_tools",
 "lowe15": "T. E. Lowe, \"Development of a Microsoft Excel based UAV propeller design and analysis tool,\" M.S. thesis, Oklahoma State Univ., Stillwater, OK, USA, 2015.",
 "klein17": "P. C. Klein, \"Parametric modeling and optimization of advanced propellers for next-generation aircraft,\" M.Sc. thesis, Delft Univ. Technol., Delft, The Netherlands, 2017.",
 "koning23": "W. J. F. Koning, B. G. Allan, E. A. Romander, and W. Johnson, \"Comparing 3D and 2D CFD for Mars helicopter Ingenuity rotor performance prediction,\" NASA Ames Research Center, 2023 (NTRS 20230012866).",
 "ning14": "S. A. Ning, \"A simple solution method for the blade element momentum equations with guaranteed convergence,\" *Wind Energy*, vol. 17, no. 9, pp. 1327–1345, 2014.",
 "duselig": "Z. Du and M. S. Selig, \"A 3-D stall-delay model for horizontal axis wind turbine performance prediction,\" AIAA Paper 98-0021, 1998.",
 "dongfang": "\"Dongfang installs 'world's largest single-capacity' offshore wind turbine for testing,\" *offshoreWIND.biz*, 3 Sep. 2025, and \"Offshore wind turbines in 2025,\" 1 Jan. 2026 (26 MW, 310 m rotor, 153 m blades). [Online]. Available: https://www.offshorewind.biz/2025/09/03/dongfang-installs-worlds-largest-single-capacity-offshore-wind-turbine-for-testing",
 "anandxfoil": "K. V. Anand, \"Making XFOIL converge: Accuracy, optimisation and the multi-element limit,\" Technical paper, Nov. 2026. [Online]. Available: https://haivijayanand.github.io/papers/xfoil-improvements-convergence-multielement.html",
 "anandavl": "K. V. Anand, \"AVL in practice: Strengths, limits and extensions of the Athena Vortex Lattice code,\" Technical paper, Nov. 2026. [Online]. Available: https://haivijayanand.github.io/papers/avl-athena-vortex-lattice-review.html",
}

def assemble():
    md = "\n\n".join(open(f, encoding="utf-8").read() for f in sorted(glob.glob("src/*.md")))
    order = []
    for k in re.findall(r"\[#([a-z0-9]+)\]", md):
        if k not in order: order.append(k)
    missing = [k for k in order if k not in REFS]
    if missing: sys.exit(f"missing refs: {missing}")
    unused = [k for k in REFS if k not in order]
    if unused: print("unused refs:", unused)
    md = re.sub(r"\[#([a-z0-9]+)\]", lambda m: f"\\[{order.index(m.group(1))+1}\\]", md)
    md += "\n\n# References {.unnumbered}\n\n::: refs\n" + "\n\n".join(f"\\[{i+1}\\] {REFS[k]}" for i, k in enumerate(order)) + "\n:::\n"
    md = md.replace("₂", "~2~").replace("h⁻¹", "h^−1^")
    # figure and table numbering by order of definition
    def roman(n):
        vals = [(10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")]; out = ""
        for v, r in vals:
            while n >= v: out += r; n -= v
        return out
    figs = re.findall(r"!\[Fig\. \{f:(\w+)\}", md)
    tabs = re.findall(r"^: TABLE \{t:(\w+)\}", md, flags=re.M)
    for name in set(re.findall(r"\{f:(\w+)\}", md)) - set(figs): sys.exit(f"undefined figure {name}")
    for name in set(re.findall(r"\{t:(\w+)\}", md)) - set(tabs): sys.exit(f"undefined table {name}")
    md = re.sub(r"\{f:(\w+)\}", lambda m: str(figs.index(m.group(1)) + 1), md)
    md = re.sub(r"\{t:(\w+)\}", lambda m: roman(tabs.index(m.group(1)) + 1), md)
    eqs = re.findall(r"\\tag\{e:(\w+)\}", md)
    for name in set(re.findall(r"\{e:(\w+)\}", md)) - set(eqs): sys.exit(f"undefined equation {name}")
    md = re.sub(r"\\tag\{e:(\w+)\}", lambda m: "\\tag{%d}" % (eqs.index(m.group(1)) + 1), md)
    md = re.sub(r"\{e:(\w+)\}", lambda m: str(eqs.index(m.group(1)) + 1), md)
    print(f"{len(figs)} figures, {len(tabs)} tables, {len(eqs)} equations")
    return md

def build_pdf(md):
    md_tex = re.sub(r"\]\((fig/[A-Za-z0-9_]+)\)", r"](\1.pdf)", md)
    open("build/paper_tex.md", "w", encoding="utf-8").write(md_tex)
    subprocess.run(["pandoc", "build/paper_tex.md", "-f", "markdown", "-t", "latex", "--lua-filter=ieee.lua",
                    "-o", "build/body.tex"], check=True)
    body = open("build/body.tex", encoding="utf-8").read()
    tpl = open("template.tex", encoding="utf-8").read()
    tex = (tpl.replace("@@TITLE@@", TITLE).replace("@@SUBTITLE@@", SUBTITLE).replace("@@AUTHOR@@", AUTHOR)
              .replace("@@DATE@@", DATE).replace("@@BODY@@", body))
    open(f"build/{SLUG}.tex", "w", encoding="utf-8").write(tex)
    for _ in range(2):
        r = subprocess.run(["pdflatex", "-interaction=nonstopmode", "-halt-on-error", f"{SLUG}.tex"], cwd="build",
                           capture_output=True, text=True, errors="replace")
        if r.returncode:
            print(r.stdout[-3000:]); sys.exit("pdflatex failed")
    log = open(f"build/{SLUG}.log", encoding="latin-1").read()
    for pat in ["Overfull \\hbox", "Missing character", "LaTeX Warning: Float too large"]:
        print(pat, log.count(pat))

def build_html(md):
    md_h = re.sub(r"\]\((fig/[A-Za-z0-9_]+)\)", r"](\1.svg)", md)
    md_h = md_h.replace(" [wide]", "")
    md_h = re.sub(r"\\tag\{(\d+)\}", r"\\qquad\\text{(\1)}", md_h)
    md_h = re.sub(r"\n: Nomenclature \[nomen\]\n", "\n", md_h)
    open("build/paper_html.md", "w", encoding="utf-8").write(md_h)
    subprocess.run(["pandoc", "build/paper_html.md", "-f", "markdown", "-t", "html5", "--mathml", "--section-divs",
                    "--toc", "--toc-depth=2", "--standalone", "--embed-resources", "--template=template.html",
                    "--metadata", f"title={TITLE}", "--metadata", f"subtitle={SUBTITLE}",
                    "--metadata", f"author={AUTHOR}", "--metadata", f"date={DATE}", "--metadata", f"slug={SLUG}",
                    "-o", f"build/{SLUG}.html"], check=True)

if __name__ == "__main__":
    os.makedirs("build", exist_ok=True)
    if not os.path.exists("build/fig"): os.symlink(os.path.abspath("fig"), "build/fig")
    md = assemble()
    build_pdf(md)
    build_html(md)
    print("done")
