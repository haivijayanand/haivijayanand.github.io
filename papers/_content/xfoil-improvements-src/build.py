# -*- coding: utf-8 -*-
"""
TOOL:    build.py - builds the XFOIL-improvements paper as HTML (MathML, light/dark, full screen) and IEEE-style two-column PDF
FAMILY:  technical-papers / xfoil-improvements-convergence-multielement
VERSION: 1.0.0
DATE:    2026-11-28
CHAT:    XFOIL improvements, history, branches and multi-element airfoils (2026-11-28)
CHANGES: 1.0.0 - first version: citation numbering, reference list, pandoc to LaTeX (ieee.lua) and HTML, pdflatex run
"""
__version__ = "1.0.0"
import glob, os, re, subprocess, sys

SLUG = "xfoil-improvements-convergence-multielement"
TITLE = "Making XFOIL Converge"
SUBTITLE = "Accuracy, Optimisation and the Multi-Element Limit"
AUTHOR = "K Vijay Anand"
DATE = "November 2026"

REFS = {
 "drela89": "M. Drela, \"XFOIL: An analysis and design system for low Reynolds number airfoils,\" in *Low Reynolds Number Aerodynamics*, T. J. Mueller, Ed., Lecture Notes in Engineering, vol. 54. Berlin, Germany: Springer, 1989, pp. 1–12.",
 "drela87": "M. Drela and M. B. Giles, \"Viscous-inviscid analysis of transonic and low Reynolds number airfoils,\" *AIAA J.*, vol. 25, no. 10, pp. 1347–1355, 1987.",
 "drelaphd": "M. Drela, \"Two-dimensional transonic aerodynamic design and analysis using the Euler equations,\" Ph.D. dissertation, Dept. Aeronaut. Astronaut., Massachusetts Inst. Technol., Cambridge, MA, USA, 1985.",
 "drela88": "M. Drela, \"Low-Reynolds-number airfoil design for the M.I.T. Daedalus prototype: A case study,\" *J. Aircraft*, vol. 25, no. 8, pp. 724–732, 1988.",
 "drela89te": "M. Drela, \"Integral boundary layer formulation for blunt trailing edges,\" AIAA Paper 89-2166, 1989.",
 "drela98": "M. Drela, \"Pros and cons of airfoil optimization,\" in *Frontiers of Computational Fluid Dynamics 1998*, D. A. Caughey and M. M. Hafez, Eds. Singapore: World Scientific, 1998.",
 "xfoildoc": "M. Drela and H. Youngren, *XFOIL 6.9 User Primer* (xfoil_doc.txt) and *XFOIL Version Notes* (version_notes.txt), distributed with XFOIL 6.99. Cambridge, MA, USA: MIT, 2001–2013.",
 "xfoilweb": "M. Drela, \"XFOIL: Subsonic airfoil development system,\" MIT. [Online]. Available: https://web.mit.edu/drela/Public/web/xfoil/ (accessed Nov. 2026).",
 "mses": "M. Drela, \"MSES: Multi-element airfoil design/analysis software,\" MIT. [Online]. Available: https://web.mit.edu/drela/Public/web/mses/ (accessed Nov. 2026).",
 "fidkowski22": "K. J. Fidkowski, \"A coupled inviscid–viscous airfoil analysis solver, revisited,\" *AIAA J.*, vol. 60, no. 5, pp. 2961–2971, 2022.",
 "fidkowski23": "K. J. Fidkowski, \"An interactive airfoil analysis and design tool in Matlab,\" AIAA paper, 2023; software *mfoil* (Matlab and Python, MIT licence), Univ. Michigan. [Online]. Available: https://websites.umich.edu/~kfid/codes.html",
 "sharpe25": "P. Sharpe and R. J. Hansman, \"NeuralFoil: An airfoil aerodynamics analysis tool using physics-informed machine learning,\" arXiv:2503.16323, 2025.",
 "aerosandbox": "P. D. Sharpe, \"AeroSandbox: A differentiable framework for aircraft design optimization,\" S.M. thesis, Massachusetts Inst. Technol., Cambridge, MA, USA, 2021.",
 "vanrooij96": "R. P. J. O. M. van Rooij, \"Modification of the boundary layer calculation in RFOIL for improved airfoil stall prediction,\" Delft Univ. Technol., Delft, The Netherlands, Rep. IW-96087R, 1996.",
 "timmer03": "W. A. Timmer and R. P. J. O. M. van Rooij, \"Summary of the Delft University wind turbine dedicated airfoils,\" AIAA Paper 2003-0352, 2003.",
 "sahoo26": "A. Sahoo, A. K. Ravishankara, W. Yu, D. Ragni, and C. Simão Ferreira, \"Modelling vortex generator effects on turbulent boundary layers with integral boundary layer equations,\" *Wind Energy Sci.*, vol. 11, pp. 127ff., 2026.",
 "qfoil": "QBlade documentation, \"QFoil airfoil analysis code\" (QFoil 0.9, modified XFoil 6.99). [Online]. Available: https://docs.qblade.org/src/theory/aerodynamics/qfoil/qfoil.html (accessed Nov. 2026).",
 "tnowake": "G. Ramanujam and H. Özdemir, \"Improving airfoil lift prediction,\" in *Proc. 35th Wind Energy Symp., AIAA SciTech Forum*, Grapevine, TX, USA, 2017, AIAA 2017-1999.",
 "xflr5": "A. Deperrois, *XFLR5: Analysis of Foils and Wings Operating at Low Reynolds Numbers*, software (GPL-3). [Online]. Available: https://sourceforge.net/projects/xflr5/",
 "flow5": "A. Deperrois, *flow5* (version 7 of XFLR5), open source since 1 Jan. 2026. [Online]. Available: https://github.com/techwinder/flow5",
 "libxfoil": "montagdude, *libxfoil*: re-entrant XFOIL library with C, Fortran and Python bindings. [Online]. Available: https://github.com/montagdude/libxfoil",
 "xfoilpy": "*xfoil-python*: XFOIL as a compiled Python module (PyPI package \"xfoil\"). [Online]. Available: https://github.com/DARcorporation/xfoil-python",
 "flexfoil": "H. R. Smith, \"Why I built a browser-based XFOIL (and why we're investing in open source),\" Flexcompute blog, 17 Mar. 2026. [Online]. Available: https://hs.flexcompute.com/blog/flexfoil",
 "ranneberg": "M. Ranneberg, \"Viiflow—A new inverse viscous–inviscid interaction method,\" *AIAA J.*, 2019.",
 "xoptfoil": "D. Prosser, *Xoptfoil: Airfoil Optimization with Xfoil*, software (GPL-3), 2014–. [Online]. Available: https://sourceforge.net/projects/xoptfoil/",
 "xoptfoil2": "J. Guenzel, *Xoptfoil2: The Airfoil Optimizer*, software. [Online]. Available: https://github.com/jxjo/Xoptfoil2",
 "hess": "J. L. Hess and A. M. O. Smith, \"Calculation of potential flow about arbitrary bodies,\" *Prog. Aerosp. Sci.*, vol. 8, pp. 1–138, 1967.",
 "katz": "J. Katz and A. Plotkin, *Low-Speed Aerodynamics*, 2nd ed. Cambridge, U.K.: Cambridge Univ. Press, 2001.",
 "eppler80": "R. Eppler and D. M. Somers, \"A computer program for the design and analysis of low-speed airfoils,\" NASA TM-80210, 1980.",
 "veldman": "A. E. P. Veldman, \"New, quasi-simultaneous method to calculate interacting boundary layers,\" *AIAA J.*, vol. 19, no. 1, pp. 79–85, 1981.",
 "tsien": "H. S. Tsien, \"Two-dimensional subsonic flow of compressible fluids,\" *J. Aeronaut. Sci.*, vol. 6, no. 10, pp. 399–407, 1939.",
 "green": "J. E. Green, D. J. Weeks, and J. W. F. Brooman, \"Prediction of turbulent boundary layers and wakes in compressible flow by a lag-entrainment method,\" Aeronaut. Res. Council, R&M 3791, 1977.",
 "squire": "H. B. Squire and A. D. Young, \"The calculation of the profile drag of aerofoils,\" Aeronaut. Res. Council, R&M 1838, 1937.",
 "mack": "L. M. Mack, \"Transition prediction and linear stability theory,\" in *Laminar-Turbulent Transition*, AGARD CP-224, 1977.",
 "smith75": "A. M. O. Smith, \"High-lift aerodynamics,\" *J. Aircraft*, vol. 12, no. 6, pp. 501–530, 1975.",
 "vandam02": "C. P. van Dam, \"The aerodynamic design of multi-element high-lift systems for transport airplanes,\" *Prog. Aerosp. Sci.*, vol. 38, no. 2, pp. 101–144, 2002.",
 "thomas97": "F. O. Thomas and R. C. Nelson, \"An experimental investigation of the confluent boundary layer on a high-lift system,\" Final Rep., NASA Grant NAG2-905, Univ. Notre Dame, 1997 (NTRS 19980002796).",
 "pomeroy14": "B. W. Pomeroy, J. M. Diebold, P. J. Ansell, and M. S. Selig, \"Study of burst wakes in a multi-element airfoil flowfield,\" *AIAA J.*, 2014, doi: 10.2514/1.J052680.",
 "pomeroy17": "B. W. Pomeroy and M. S. Selig, \"Design of airfoils to mitigate wake bursting,\" AIAA Paper 2017-1210, 2017.",
 "olson76": "L. E. Olson, \"Viscous/potential flow about multi-element two-dimensional and infinite-span swept wings: Theory and experiment,\" NASA TM X-62,513, 1976.",
 "dvorak77": "F. A. Dvorak, F. A. Woodward, and B. Maskew, \"A three-dimensional viscous/potential flow interaction analysis method for multi-element wings,\" NASA CR-152012, 1977.",
 "cebeci93": "T. Cebeci, \"An interactive boundary-layer approach to multielement airfoils at high lift,\" NASA Technical Reports Server, doc. 19930018256, 1993.",
 "olson15": "E. D. Olson, \"Semi-empirical prediction of aircraft low-speed aerodynamic characteristics,\" in *Proc. AIAA SciTech Forum*, 2015 (NTRS 20150006019).",
 "martinez22": "G. Martinez-Rodriguez and T. T. Takahashi, \"Reflections on using potential flow codes to design high-lift systems,\" in *Proc. AIAA SciTech Forum*, San Diego, CA, USA, 2022, AIAA 2022-1155.",
 "langtry": "R. B. Langtry and F. R. Menter, \"Correlation-based transition modeling for unstructured parallelized computational fluid dynamics codes,\" *AIAA J.*, vol. 47, no. 12, pp. 2894–2906, 2009.",
 "allgower": "E. L. Allgower and K. Georg, *Introduction to Numerical Continuation Methods*. Philadelphia, PA, USA: SIAM, 2003.",
 "nocedal": "J. Nocedal and S. J. Wright, *Numerical Optimization*, 2nd ed. New York, NY, USA: Springer, 2006.",
 "kelley": "C. T. Kelley and D. E. Keyes, \"Convergence analysis of pseudo-transient continuation,\" *SIAM J. Numer. Anal.*, vol. 35, no. 2, pp. 508–523, 1998.",
 "jameson": "A. Jameson, \"Aerodynamic design via control theory,\" *J. Sci. Comput.*, vol. 3, no. 3, pp. 233–260, 1988.",
 "kulfan": "B. M. Kulfan, \"Universal parametric geometry representation method,\" *J. Aircraft*, vol. 45, no. 1, pp. 142–158, 2008.",
 "hicks": "R. M. Hicks and P. A. Henne, \"Wing design by numerical optimization,\" *J. Aircraft*, vol. 15, no. 7, pp. 407–412, 1978.",
 "lighthill": "M. J. Lighthill, \"A new method of two-dimensional aerodynamic design,\" Aeronaut. Res. Council, R&M 2112, 1945.",
 "drela90": "M. Drela, \"Elements of airfoil design methodology,\" in *Applied Computational Aerodynamics*, P. A. Henne, Ed., Progress in Astronautics and Aeronautics, vol. 125. Washington, DC, USA: AIAA, 1990.",
 "ags": "M. Abu-Ghannam and R. Shaw, \"Natural transition of boundary layers—The effects of turbulence, pressure gradient, and flow history,\" *J. Mech. Eng. Sci.*, vol. 22, no. 5, pp. 213–228, 1980.",
 "duselig": "Z. Du and M. S. Selig, \"A 3-D stall-delay model for horizontal axis wind turbine performance prediction,\" AIAA Paper 98-0021, 1998.",
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
