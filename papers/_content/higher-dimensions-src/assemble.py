#!/usr/bin/env python3
"""
TOOL:    papers/_content/higher-dimensions-src/assemble.py
FAMILY:  papers
VERSION: 1.0.0
DATE:    2026-11-26
CHAT:    Higher dimensions technical paper
CHANGES: 1.0.0 - numbers [@key] citations in order of first use (IEEE), appends the References list and writes
                 _content/higher-dimensions-physics-review.md from paper.md
STATUS:  working

Run: python3 assemble.py && python3 gen_ieee.py
"""
__version__ = "1.0.0"

import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
SRC = HERE / "paper.md"
OUT = HERE.parent / "higher-dimensions-physics-review.md"


def ax(i):
    return f"[Online]. Available: <https://arxiv.org/abs/{i}>"


REFS = {
 'exosci': 'ExoSci, &ldquo;This is what your existence looks like in higher dimensions: 0D&ndash;8D explained in detail,&rdquo; YouTube video, 10 Feb. 2026. [Online]. Available: <https://www.youtube.com/watch?v=rVd5VH9SY1A>',
 'riemann': 'B. Riemann, &ldquo;&Uuml;ber die Hypothesen, welche der Geometrie zu Grunde liegen,&rdquo; <i>Abh. K&ouml;nigl. Ges. Wiss. G&ouml;ttingen</i>, vol. 13, pp. 133&ndash;150, 1868 (lecture delivered 1854).',
 'hinton': 'C. H. Hinton, &ldquo;What is the fourth dimension?&rdquo; <i>Dublin University Magazine</i>, 1880; reprinted in <i>Scientific Romances</i>. London, U.K.: Swan Sonnenschein, 1884.',
 'abbott': 'E. A. Abbott, <i>Flatland: A Romance of Many Dimensions</i>. London, U.K.: Seeley &amp; Co., 1884.',
 'ehrenfest': 'P. Ehrenfest, &ldquo;In what way does it become manifest in the fundamental laws of physics that space has three dimensions?&rdquo; <i>Proc. KNAW Amsterdam</i>, vol. 20, pp. 200&ndash;209, 1917.',
 'minkowski': 'H. Minkowski, &ldquo;Raum und Zeit,&rdquo; <i>Physikalische Zeitschrift</i>, vol. 10, pp. 104&ndash;111, 1909 (lecture delivered 1908).',
 'einstein': 'A. Einstein, &ldquo;Die Grundlage der allgemeinen Relativit&auml;tstheorie,&rdquo; <i>Annalen der Physik</i>, vol. 49, pp. 769&ndash;822, 1916.',
 'bars': 'I. Bars, &ldquo;Survey of two-time physics,&rdquo; <i>Class. Quantum Grav.</i>, vol. 18, pp. 3113&ndash;3130, 2001. ' + ax('hep-th/0008164'),
 'tegmark97': 'M. Tegmark, &ldquo;On the dimensionality of spacetime,&rdquo; <i>Class. Quantum Grav.</i>, vol. 14, no. 4, 1997, doi: 10.1088/0264-9381/14/4/002. ' + ax('gr-qc/9702052'),
 'nordstrom': 'G. Nordstr&ouml;m, &ldquo;&Uuml;ber die M&ouml;glichkeit, das elektromagnetische Feld und das Gravitationsfeld zu vereinigen,&rdquo; <i>Physikalische Zeitschrift</i>, vol. 15, pp. 504&ndash;506, 1914.',
 'kaluza': 'Th. Kaluza, &ldquo;Zum Unit&auml;tsproblem der Physik,&rdquo; <i>Sitzungsber. Preuss. Akad. Wiss. Berlin (Math. Phys.)</i>, pp. 966&ndash;972, 1921.',
 'klein1': 'O. Klein, &ldquo;Quantentheorie und f&uuml;nfdimensionale Relativit&auml;tstheorie,&rdquo; <i>Z. Phys.</i>, vol. 37, pp. 895&ndash;906, 1926.',
 'klein2': 'O. Klein, &ldquo;The atomicity of electricity as a quantum theory law,&rdquo; <i>Nature</i>, vol. 118, p. 516, 1926.',
 'einbergmann': 'A. Einstein and P. Bergmann, &ldquo;On a generalization of Kaluza&rsquo;s theory of electricity,&rdquo; <i>Ann. Math.</i>, vol. 39, pp. 683&ndash;701, 1938.',
 'everett': 'H. Everett III, &ldquo;&lsquo;Relative state&rsquo; formulation of quantum mechanics,&rdquo; <i>Rev. Mod. Phys.</i>, vol. 29, pp. 454&ndash;462, 1957.',
 'dewitt': 'B. S. DeWitt, &ldquo;Quantum mechanics and reality,&rdquo; <i>Physics Today</i>, vol. 23, no. 9, pp. 30&ndash;35, 1970.',
 'wallace': 'D. Wallace, <i>The Emergent Multiverse: Quantum Theory According to the Everett Interpretation</i>. Oxford, U.K.: Oxford Univ. Press, 2012.',
 'sebens': 'C. T. Sebens and S. M. Carroll, &ldquo;Self-locating uncertainty and the origin of probability in Everettian quantum mechanics,&rdquo; <i>Brit. J. Phil. Sci.</i>, vol. 69, pp. 25&ndash;74, 2018. ' + ax('1405.7577'),
 'zeh': 'H. D. Zeh, &ldquo;On the interpretation of measurement in quantum theory,&rdquo; <i>Found. Phys.</i>, vol. 1, pp. 69&ndash;76, 1970.',
 'zurek': 'W. H. Zurek, &ldquo;Decoherence, einselection, and the quantum origins of the classical,&rdquo; <i>Rev. Mod. Phys.</i>, vol. 75, pp. 715&ndash;775, 2003. ' + ax('quant-ph/0105127'),
 'lovelace': 'C. Lovelace, &ldquo;Pomeron form factors and dual Regge cuts,&rdquo; <i>Phys. Lett. B</i>, vol. 34, pp. 500&ndash;506, 1971.',
 'gso': 'F. Gliozzi, J. Scherk and D. Olive, &ldquo;Supersymmetry, supergravity theories and the dual spinor model,&rdquo; <i>Nucl. Phys. B</i>, vol. 122, pp. 253&ndash;290, 1977.',
 'nahm': 'W. Nahm, &ldquo;Supersymmetries and their representations,&rdquo; <i>Nucl. Phys. B</i>, vol. 135, pp. 149&ndash;166, 1978.',
 'cjs': 'E. Cremmer, B. Julia and J. Scherk, &ldquo;Supergravity theory in eleven dimensions,&rdquo; <i>Phys. Lett. B</i>, vol. 76, pp. 409&ndash;412, 1978.',
 'witten81': 'E. Witten, &ldquo;Search for a realistic Kaluza&ndash;Klein theory,&rdquo; <i>Nucl. Phys. B</i>, vol. 186, pp. 412&ndash;428, 1981.',
 'gs': 'M. B. Green and J. H. Schwarz, &ldquo;Anomaly cancellations in supersymmetric D = 10 gauge theory and superstring theory,&rdquo; <i>Phys. Lett. B</i>, vol. 149, pp. 117&ndash;122, 1984.',
 'ghmr': 'D. J. Gross, J. A. Harvey, E. Martinec and R. Rohm, &ldquo;Heterotic string,&rdquo; <i>Phys. Rev. Lett.</i>, vol. 54, pp. 502&ndash;505, 1985.',
 'chsw': 'P. Candelas, G. T. Horowitz, A. Strominger and E. Witten, &ldquo;Vacuum configurations for superstrings,&rdquo; <i>Nucl. Phys. B</i>, vol. 258, pp. 46&ndash;74, 1985.',
 'witten95': 'E. Witten, &ldquo;String theory dynamics in various dimensions,&rdquo; <i>Nucl. Phys. B</i>, vol. 443, pp. 85&ndash;126, 1995. ' + ax('hep-th/9503124'),
 'polchinski': 'J. Polchinski, &ldquo;Dirichlet branes and Ramond&ndash;Ramond charges,&rdquo; <i>Phys. Rev. Lett.</i>, vol. 75, pp. 4724&ndash;4727, 1995. ' + ax('hep-th/9510017'),
 'hw': 'P. Ho&#345;ava and E. Witten, &ldquo;Heterotic and type I string dynamics from eleven dimensions,&rdquo; <i>Nucl. Phys. B</i>, vol. 460, pp. 506&ndash;524, 1996. ' + ax('hep-th/9510209'),
 'thooft': 'G. &rsquo;t Hooft, &ldquo;Dimensional reduction in quantum gravity,&rdquo; 1993. ' + ax('gr-qc/9310026'),
 'susskind95': 'L. Susskind, &ldquo;The world as a hologram,&rdquo; <i>J. Math. Phys.</i>, vol. 36, pp. 6377&ndash;6396, 1995. ' + ax('hep-th/9409089'),
 'maldacena': 'J. Maldacena, &ldquo;The large N limit of superconformal field theories and supergravity,&rdquo; <i>Adv. Theor. Math. Phys.</i>, vol. 2, pp. 231&ndash;252, 1998. ' + ax('hep-th/9711200'),
 'add': 'N. Arkani-Hamed, S. Dimopoulos and G. Dvali, &ldquo;The hierarchy problem and new dimensions at a millimeter,&rdquo; <i>Phys. Lett. B</i>, vol. 429, pp. 263&ndash;272, 1998. ' + ax('hep-ph/9803315'),
 'aadd': 'I. Antoniadis, N. Arkani-Hamed, S. Dimopoulos and G. Dvali, &ldquo;New dimensions at a millimeter to a Fermi and superstrings at a TeV,&rdquo; <i>Phys. Lett. B</i>, vol. 436, pp. 257&ndash;263, 1998. ' + ax('hep-ph/9804398'),
 'hannestad': 'S. Hannestad and G. G. Raffelt, &ldquo;Supernova and neutron-star limits on large extra dimensions reexamined,&rdquo; <i>Phys. Rev. D</i>, vol. 67, 125008, 2003. ' + ax('hep-ph/0304029'),
 'rs1': 'L. Randall and R. Sundrum, &ldquo;A large mass hierarchy from a small extra dimension,&rdquo; <i>Phys. Rev. Lett.</i>, vol. 83, pp. 3370&ndash;3373, 1999. ' + ax('hep-ph/9905221'),
 'gw': 'W. D. Goldberger and M. B. Wise, &ldquo;Modulus stabilization with bulk fields,&rdquo; <i>Phys. Rev. Lett.</i>, vol. 83, pp. 4922&ndash;4925, 1999. ' + ax('hep-ph/9907447'),
 'rs2': 'L. Randall and R. Sundrum, &ldquo;An alternative to compactification,&rdquo; <i>Phys. Rev. Lett.</i>, vol. 83, pp. 4690&ndash;4693, 1999. ' + ax('hep-th/9906064'),
 'bp': 'R. Bousso and J. Polchinski, &ldquo;Quantization of four-form fluxes and dynamical neutralization of the cosmological constant,&rdquo; <i>JHEP</i>, vol. 2000, no. 06, 006, 2000. ' + ax('hep-th/0004134'),
 'kklt': 'S. Kachru, R. Kallosh, A. Linde and S. P. Trivedi, &ldquo;De Sitter vacua in string theory,&rdquo; <i>Phys. Rev. D</i>, vol. 68, 046005, 2003. ' + ax('hep-th/0301240'),
 'susskind03': 'L. Susskind, &ldquo;The anthropic landscape of string theory,&rdquo; 2003. ' + ax('hep-th/0302219'),
 'tegmark03': 'M. Tegmark, &ldquo;Parallel universes,&rdquo; <i>Scientific American</i>, vol. 288, no. 5, pp. 40&ndash;51, May 2003. ' + ax('astro-ph/0302131'),
 'smolin': 'L. Smolin, <i>The Trouble with Physics</i>. Boston, MA, USA: Houghton Mifflin, 2006.',
 'woit': 'P. Woit, <i>Not Even Wrong: The Failure of String Theory and the Continuing Challenge to Unify the Laws of Physics</i>. London, U.K.: Jonathan Cape, 2006.',
 'ellissilk': 'G. Ellis and J. Silk, &ldquo;Scientific method: defend the integrity of physics,&rdquo; <i>Nature</i>, vol. 516, pp. 321&ndash;323, 2014.',
 'vafa05': 'C. Vafa, &ldquo;The string landscape and the swampland,&rdquo; 2005. ' + ax('hep-th/0509212'),
 'ov07': 'H. Ooguri and C. Vafa, &ldquo;On the geometry of the string landscape and the swampland,&rdquo; <i>Nucl. Phys. B</i>, vol. 766, pp. 21&ndash;33, 2007. ' + ax('hep-th/0605264'),
 'oosv': 'G. Obied, H. Ooguri, L. Spodyneiko and C. Vafa, &ldquo;De Sitter space and the swampland,&rdquo; 2018. ' + ax('1806.08362'),
 'opsv': 'H. Ooguri, E. Palti, G. Shiu and C. Vafa, &ldquo;Distance and de Sitter conjectures on the swampland,&rdquo; <i>Phys. Lett. B</i>, vol. 788, pp. 180&ndash;184, 2019. ' + ax('1810.05506'),
 'akkv': 'Y. Akrami, R. Kallosh, A. Linde and V. Vardanyan, &ldquo;The landscape, the swampland and the era of precision cosmology,&rdquo; <i>Fortschr. Phys.</i>, vol. 67, 1800075, 2019. ' + ax('1808.09440'),
 'mvv': 'M. Montero, C. Vafa and I. Valenzuela, &ldquo;The dark dimension and the swampland,&rdquo; <i>JHEP</i>, vol. 2023, no. 02, 022, 2023. ' + ax('2205.12293'),
 'gmov': 'E. Gonzalo, M. Montero, G. Obied and C. Vafa, &ldquo;Dark dimension gravitons as dark matter,&rdquo; <i>JHEP</i>, vol. 2023, no. 11, 109, 2023. ' + ax('2209.09249'),
 'bovw': 'A. Bedroya, G. Obied, C. Vafa and D. H. Wu, &ldquo;Evolving dark sector and the dark dimension scenario,&rdquo; <i>Phys. Rev. D</i>, 2025. ' + ax('2507.03090'),
 'desi': 'DESI Collaboration (M. Abdul Karim <i>et al.</i>), &ldquo;DESI DR2 results II: measurements of baryon acoustic oscillations and cosmological constraints,&rdquo; <i>Phys. Rev. D</i>, vol. 112, 083515, 2025.',
 'anch25': 'L. A. Anchordoqui <i>et al.</i>, &ldquo;Two micron-size dark dimensions,&rdquo; 2025. ' + ax('2501.11690'),
 'rt': 'S. Ryu and T. Takayanagi, &ldquo;Holographic derivation of entanglement entropy from AdS/CFT,&rdquo; <i>Phys. Rev. Lett.</i>, vol. 96, 181602, 2006. ' + ax('hep-th/0603001'),
 'vr': 'M. Van Raamsdonk, &ldquo;Building up spacetime with quantum entanglement,&rdquo; <i>Gen. Relativ. Gravit.</i>, vol. 42, pp. 2323&ndash;2329, 2010. ' + ax('1005.3035'),
 'ms': 'J. Maldacena and L. Susskind, &ldquo;Cool horizons for entangled black holes,&rdquo; <i>Fortschr. Phys.</i>, vol. 61, pp. 781&ndash;811, 2013. ' + ax('1306.0533'),
 'ajl': 'J. Ambj&oslash;rn, J. Jurkiewicz and R. Loll, &ldquo;Spectral dimension of the universe is scale dependent,&rdquo; <i>Phys. Rev. Lett.</i>, vol. 95, 171301, 2005. ' + ax('hep-th/0505113'),
 'carlip': 'S. Carlip, &ldquo;Dimension and dimensional reduction in quantum gravity,&rdquo; <i>Class. Quantum Grav.</i>, vol. 34, 193001, 2017. ' + ax('1705.05417'),
 'zh': 'S.-C. Zhang and J. Hu, &ldquo;A four-dimensional generalization of the quantum Hall effect,&rdquo; <i>Science</i>, vol. 294, pp. 823&ndash;828, 2001.',
 'zil': 'O. Zilberberg, S. Huang, J. Guglielmon, M. Wang, K. P. Chen, Y. E. Kraus and M. C. Rechtsman, &ldquo;Photonic topological boundary pumping as a probe of 4D quantum Hall physics,&rdquo; <i>Nature</i>, vol. 553, pp. 59&ndash;62, 2018. [Online]. Available: <https://www.nature.com/articles/nature25011>',
 'lohse': 'M. Lohse, C. Schweizer, H. M. Price, O. Zilberberg and I. Bloch, &ldquo;Exploring 4D quantum Hall physics with a 2D topological charge pump,&rdquo; <i>Nature</i>, vol. 553, pp. 55&ndash;58, 2018.',
 'lee20': 'J. G. Lee, E. G. Adelberger, T. S. Cook, S. M. Fleischer and B. R. Heckel, &ldquo;New test of the gravitational 1/r<sup>2</sup> law at separations down to 52 &micro;m,&rdquo; <i>Phys. Rev. Lett.</i>, vol. 124, 101101, 2020. ' + ax('2002.11761'),
 'adel02': 'E. G. Adelberger <i>et al.</i>, &ldquo;Sub-mm tests of the gravitational inverse-square law,&rdquo; 2002. ' + ax('hep-ex/0202008'),
 'hoyle04': 'C. D. Hoyle, D. J. Kapner, B. R. Heckel, E. G. Adelberger, J. H. Gundlach, U. Schmidt and H. E. Swanson, &ldquo;Sub-millimeter tests of the gravitational inverse-square law,&rdquo; <i>Phys. Rev. D</i>, vol. 70, 042004, 2004. ' + ax('hep-ph/0405262'),
 'kapner07': 'D. J. Kapner <i>et al.</i>, &ldquo;Tests of the gravitational inverse-square law below the dark-energy length scale,&rdquo; <i>Phys. Rev. Lett.</i>, vol. 98, 021101, 2007. ' + ax('hep-ph/0611184'),
 'cms18': 'CMS Collaboration, &ldquo;Search for new physics in final states with an energetic jet or a hadronically decaying W or Z boson and transverse momentum imbalance at &radic;s = 13 TeV,&rdquo; <i>Phys. Rev. D</i>, vol. 97, 092005, 2018. ' + ax('1712.02345'),
 'cms24': 'CMS Collaboration, &ldquo;Search for new physics in high-mass diphoton events from proton-proton collisions at &radic;s = 13 TeV,&rdquo; 2024. ' + ax('2405.09320'),
 'pardo': 'K. Pardo, M. Fishbach, D. E. Holz and D. N. Spergel, &ldquo;Limits on the number of spacetime dimensions from GW170817,&rdquo; <i>JCAP</i>, vol. 2018, no. 07, 048, 2018. ' + ax('1801.08160'),
 'lvc': 'LIGO Scientific and Virgo Collaborations, &ldquo;Tests of general relativity with GW170817,&rdquo; <i>Phys. Rev. Lett.</i>, vol. 123, 011102, 2019. ' + ax('1811.00364'),
}


def main():
    text = SRC.read_text(encoding="utf-8")
    order = []
    for k in re.findall(r"\[@([a-z0-9]+)\]", text):
        if k not in REFS:
            raise SystemExit(f"missing reference: {k}")
        if k not in order:
            order.append(k)
    text = re.sub(r"\[@([a-z0-9]+)\]", lambda m: f"[{order.index(m.group(1)) + 1}]", text)
    unused = sorted(set(REFS) - set(order))
    if unused:
        print("unused references:", unused)
    refs = "\n".join(f"{i}. {REFS[k]}" for i, k in enumerate(order, 1))
    OUT.write_text(text.rstrip() + "\n\n## References\n\n" + refs + "\n", encoding="utf-8")
    print("wrote", OUT.name, len(order), "references")


if __name__ == "__main__":
    main()
