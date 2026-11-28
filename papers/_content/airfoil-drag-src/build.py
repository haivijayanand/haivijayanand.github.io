# -*- coding: utf-8 -*-
"""
TOOL:    build.py - builds the airfoil-drag paper as HTML (MathML, light/dark, full screen) and IEEE-style two-column PDF
FAMILY:  technical-papers / airfoil-drag-aircraft-performance
VERSION: 1.0.0
DATE:    2026-11-28
CHAT:    Airfoil drag characteristics and aircraft/rotorcraft performance (Aerodynamics Related project)
CHANGES: 1.0.0 - first version: citation numbering, reference list, pandoc to LaTeX (ieee.lua) and HTML, pdflatex run
"""
__version__ = "1.0.0"
import glob, os, re, subprocess, sys

SLUG = "airfoil-drag-aircraft-performance"
TITLE = "From Section Drag to Mission Performance"
SUBTITLE = "Airfoil Choice Across Fixed-Wing and Rotary Aircraft"
AUTHOR = "K Vijay Anand"
DATE = "November 2026"

REFS = {
 "anderson": "J. D. Anderson, Jr., *Fundamentals of Aerodynamics*, 6th ed. New York, NY, USA: McGraw-Hill, 2017.",
 "raymer": "D. P. Raymer, *Aircraft Design: A Conceptual Approach*, 6th ed. Reston, VA, USA: AIAA, 2018.",
 "leishman": "J. G. Leishman, *Principles of Helicopter Aerodynamics*, 2nd ed. Cambridge, U.K.: Cambridge Univ. Press, 2006.",
 "johnson": "W. Johnson, *Rotorcraft Aeromechanics*. Cambridge, U.K.: Cambridge Univ. Press, 2013.",
 "abbott": "I. H. Abbott and A. E. von Doenhoff, *Theory of Wing Sections*. New York, NY, USA: Dover, 1959.",
 "hoerner": "S. F. Hoerner, *Fluid-Dynamic Drag*. Brick Town, NJ, USA: Hoerner Fluid Dynamics, 1965.",
 "drela89": "M. Drela, \"XFOIL: An analysis and design system for low Reynolds number airfoils,\" in *Low Reynolds Number Aerodynamics*, T. J. Mueller, Ed., Lecture Notes in Engineering, vol. 54. Berlin, Germany: Springer, 1989, pp. 1–12.",
 "drela87": "M. Drela and M. B. Giles, \"Viscous-inviscid analysis of transonic and low Reynolds number airfoils,\" *AIAA J.*, vol. 25, no. 10, pp. 1347–1355, 1987.",
 "schlichting": "H. Schlichting and K. Gersten, *Boundary-Layer Theory*, 9th ed. Berlin, Germany: Springer, 2017.",
 "torenbeek": "E. Torenbeek, *Advanced Aircraft Design*. Chichester, U.K.: Wiley, 2013.",
 "whitcomb": "R. T. Whitcomb and L. R. Clark, \"An airfoil shape for efficient flight at supercritical Mach numbers,\" NASA TM X-1109, 1965.",
 "harris": "C. D. Harris, \"NASA supercritical airfoils: A matrix of family-related airfoils,\" NASA TP-2969, 1990.",
 "joslin": "R. D. Joslin, \"Aircraft laminar flow control,\" *Annu. Rev. Fluid Mech.*, vol. 30, pp. 1–29, 1998.",
 "bushnell": "D. M. Bushnell, \"Aircraft drag reduction—A review,\" *Proc. Inst. Mech. Eng. G, J. Aerosp. Eng.*, vol. 217, no. 1, pp. 1–18, 2003.",
 "lissaman": "P. B. S. Lissaman, \"Low-Reynolds-number airfoils,\" *Annu. Rev. Fluid Mech.*, vol. 15, pp. 223–239, 1983.",
 "selig": "M. S. Selig, J. F. Donovan, and D. B. Fraser, *Airfoils at Low Speeds* (Soartech 8). Virginia Beach, VA, USA: H. A. Stokely, 1989.",
 "mueller": "T. J. Mueller and J. D. DeLaurier, \"Aerodynamics of small vehicles,\" *Annu. Rev. Fluid Mech.*, vol. 35, pp. 89–111, 2003.",
 "thomas": "F. Thomas, *Fundamentals of Sailplane Design*. College Park, MD, USA: College Park Press, 1999.",
 "mccormick": "B. W. McCormick, *Aerodynamics, Aeronautics, and Flight Mechanics*, 2nd ed. New York, NY, USA: Wiley, 1995.",
 "prouty": "R. W. Prouty, *Helicopter Performance, Stability, and Control*. Malabar, FL, USA: Krieger, 1995.",
 "bousman": "W. G. Bousman, \"Airfoil design and rotorcraft performance,\" in *Proc. American Helicopter Society 58th Annual Forum*, Montréal, QC, Canada, Jun. 2002, pp. 208–232.",
 "bailey": "F. J. Bailey, Jr., \"A simplified theoretical method of determining the characteristics of a lifting rotor in forward flight,\" NACA Rep. 716, 1941.",
 "gur": "O. Gur, W. H. Mason, and J. A. Schetz, \"Full-configuration drag estimation,\" *J. Aircraft*, vol. 47, no. 4, pp. 1356–1367, 2010.",
 "mason": "W. H. Mason, *Configuration Aerodynamics*, course notes, ch. 7 (Transonic aerodynamics of airfoils and wings). Blacksburg, VA, USA: Virginia Polytechnic Inst. and State Univ.",
 "somers": "D. M. Somers, \"Design and experimental results for a natural-laminar-flow airfoil for general aviation applications,\" NASA TP-1861, 1981.",
 "bragg": "M. B. Bragg, A. P. Broeren, and L. A. Blumenthal, \"Iced-airfoil aerodynamics,\" *Prog. Aerosp. Sci.*, vol. 41, no. 5, pp. 323–362, 2005.",
 "langtry": "R. B. Langtry and F. R. Menter, \"Correlation-based transition modeling for unstructured parallelized computational fluid dynamics codes,\" *AIAA J.*, vol. 47, no. 12, pp. 2894–2906, 2009.",
 "maisel": "M. D. Maisel, D. J. Giulianetti, and D. C. Dugan, *The History of the XV-15 Tilt Rotor Research Aircraft: From Concept to Flight*, NASA SP-2000-4517, 2000.",
 "blade": "Airbus, \"Airbus' BLADE laminar flow wing demonstrator makes first flight,\" press release, Toulouse, France, 26 Sep. 2017.",
 "icao": "International Civil Aviation Organization, *ICAO Carbon Emissions Calculator Methodology*. Montréal, QC, Canada: ICAO.",
 "loftin": "L. K. Loftin, Jr., *Quest for Performance: The Evolution of Modern Aircraft*, NASA SP-468, 1985.",
 "eppler": "R. Eppler, *Airfoil Design and Data*. Berlin, Germany: Springer, 1990.",
 "fujino": "M. Fujino, \"Design and development of the HondaJet,\" *J. Aircraft*, vol. 42, no. 3, pp. 755–764, 2005.",
 "balaram": "J. Balaram *et al.*, \"Mars Helicopter technology demonstrator,\" in *Proc. AIAA Atmospheric Flight Mechanics Conf.* (SciTech Forum), Kissimmee, FL, USA, Jan. 2018, AIAA 2018-0023.",
 "koning": "W. J. F. Koning, E. A. Romander, and W. Johnson, \"Low Reynolds number airfoil evaluation for the Mars Helicopter rotor,\" in *Proc. AHS International 74th Annual Forum*, Phoenix, AZ, USA, May 2018.",
 "vandam": "C. P. van Dam, \"The aerodynamic design of multi-element high-lift systems for transport airplanes,\" *Prog. Aerosp. Sci.*, vol. 38, no. 2, pp. 101–144, 2002.",
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
