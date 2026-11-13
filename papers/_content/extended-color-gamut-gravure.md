## Abstract

Extended Color Gamut (ECG) printing replaces job-specific spot inks with one fixed set of seven process inks — cyan, magenta, yellow, black, orange, green and violet (CMYKOGV). For gravure, where every colour needs an engraved cylinder and an ink-station washup, ECG can turn an 8–10 colour job into a 7-colour job and keep the same seven inks on press from job to job. This paper traces how printing colour sets evolved from three-colour process to today's fixed-palette ECG. It explains how ECG works, what it gains for gravure converters, how it reduces colour count, and where it falls short. It compares ECG with CMYK plus spots, Hexachrome, Opaltone and other schemes, and closes with an adoption roadmap and the trends visible in 2024–2026.

**Index Terms:** extended color gamut, ECG, CMYKOGV, gravure printing, flexible packaging, spot colour, colour management, fixed ink palette, FOGRA55, ISO 20654

## 1. Introduction

In gravure, colour count is cost. Each colour needs its own engraved cylinder, ink station, doctor blade, ink tank and drying zone. A typical flexible-packaging job runs CMYK plus 3–6 brand spot colours, so 8–10 stations are common. The cost of spot colours shows up at every changeover:

- **Washup and ink change** on each station whose spot colour differs from the last job.
- **Colour matching on press** — a spot ink is mixed, proofed and adjusted against a standard before the run.
- **Leftover ink** — partly used spot inks pile up in the ink kitchen, often hundreds of different shades.
- **Cylinder count** — each extra spot adds a cylinder per job version.

Gravure has kept its place in long-run, high-quality flexible packaging because its colour is stable once set. But shorter runs, more SKUs and pressure from flexo and digital printing have made changeovers the weak point. Weichmann argues that gravure must cut colour waste and set-up times to stay competitive, and that moving to ECG is one way to do it. [\[1\]](https://library-files.taga.org/2024-proceedings/T20240124.pdf) ECG attacks exactly that problem: it standardises the ink set so stations stop changing ink between jobs.

## 2. History of Colour Combinations in Printing

Printing has moved from three inks, to four, to "four plus spots", and is now moving to a fixed set of seven. Each step tried to print more of what designers specify with fewer ink changes on press. Table I summarises the sequence.

**Table I.** Evolution of process and fixed-palette colour schemes

| Period | Scheme | What changed |
| --- | --- | --- |
| 1860s–1890s | Three-colour subtractive (CMY) | Maxwell and Ducos du Hauron establish three-primary colour reproduction; halftone screens make tones printable. |
| Early 1900s | Four-colour process (CMYK) | Black added for shadow density and neutral greys; four-colour wet process inks reach commercial use. |
| 1963 | Pantone Matching System | Spot colours become a numbered, mixed-in-the-can standard; packaging settles on CMYK + spots. |
| 1970s–1990s | Hi-Fi colour theory | Six- and seven-primary sets proposed; FM (stochastic) screening developed partly to avoid moiré from extra separations. [\[2\]](https://printweek.com/content/features/has-fixed-palette-come-of-age-at-last) |
| 1994–2008 | Pantone Hexachrome (CMYKOG) | Modified CMYK plus orange and green; licensed and patented, so adoption stayed limited; discontinued 2008 when Adobe dropped its HexWare plug-in. [\[3\]](https://en.wikipedia.org/wiki/Hexachrome) |
| 1996–2015 | Opaltone (CMYK + RGB) | Red over M+Y, green over C+Y, blue over C+M on an unchanged CMYK base; claimed 2,800+ colours from seven inks; usable in gravure and flexo. [\[4\]](https://www.nspackaging.com/?p=44554) |
| 2000s–2010s | Software-driven ECG | Separation engines (e.g. Esko Equinox) convert spots to CMYK + OGV builds without a licensed ink system. |
| 2015 | Pantone Extended Gamut Guide | CMYKOGV recipes for the Pantone library give ECG a common designer reference. [\[5\]](https://print-us.fujifilm.com/news-updates/cmyk-history/) |
| 2017–2022 | Standards | ISO 20654:2017 defines Spot Colour Tone Value [\[6\]](https://www.iso.org/standard/68668.html); FOGRA55 (beta 2018, final 2021) gives a CMYKOGV exchange space [\[7\]](https://fogra.org/en/research/prepress-technology/multiprimary-printing-13003); ISO/TS 21328:2022 sets characterisation guidelines. [\[8\]](https://standards.iteh.ai/catalog/standards/iso/f0a240c0-0df9-4d8f-af2c-5f1c6c37dc1d/iso-ts-21328-2022) |
| 2019–2025 | ECG enters gravure | BOBST launches oneECG for gravure in 2019 and extends it to metallic shades from process inks in 2025. [\[9\]](https://www.packaging-gateway.com/newsletters/bobst-gravure-innovation) |

The lesson from Hexachrome and Opaltone is that the ink set was never the obstacle. Both worked technically. They stalled on licensing, proprietary profiles, weak software support and press stability. Modern ECG succeeds because it is open (any ink maker can supply OGV), standardised (FOGRA55, ISO 20654, ISO/TS 21328) and driven by software found in every packaging prepress house.

## 3. What Extended Color Gamut Is

ECG prints every colour on a job — images and brand colours alike — as halftone builds of seven fixed process inks: C, M, Y, K, orange, green and violet. The three extra inks fill the regions of colour space where CMYK is weakest: saturated oranges and reds, bright greens, and blues and violets.

### 3.1 How a spot colour becomes a build

The separation engine looks up the target colour (a Pantone number, a brand L\*a\*b\* value or a CxF file) in the press's 7-colour profile and finds the build that matches it with the fewest inks. Builds follow a complementary substitution rule:

- **Orange** replaces magenta + yellow in reds, oranges and warm browns.
- **Green** replaces cyan + yellow in greens and teals.
- **Violet** replaces cyan + magenta in blues and purples.
- A complementary pair never overprints (O with C, G with M, V with Y), so any single colour uses at most three chromatic inks plus black.

Keeping builds to two or three inks makes them less sensitive to register and dot-gain drift than a four-ink CMYK build of the same colour.

### 3.2 Gamut

CMYK alone reproduces roughly half to 60% of the Pantone library within a tight tolerance; a well-run CMYKOGV set reaches about 90%. These are approximate, industry-quoted figures; the real number depends on substrate, ink and press. Colours outside the ECG gamut are mainly very bright fluorescent tones, pastels that need a light-density ink, metallics (partly) and opaque whites.

### 3.3 Standards and tools

**Table II.** Standards and tools for ECG

| Item | Role |
| --- | --- |
| ISO 20654:2017 [\[6\]](https://www.iso.org/standard/68668.html) | Spot Colour Tone Value (SCTV): a perceptually even tone scale for O, G, V and spot inks. |
| FOGRA55 [\[7\]](https://fogra.org/en/research/prepress-technology/multiprimary-printing-13003) [\[10\]](https://www.printing.org/publication/t210113) | CMYKOGV exchange space; CMYK as FOGRA51, OGV SCTV-linearised (orange aim L\*a\*b\* 65/58/88, green 60/−75/0). |
| ISO/TS 21328:2022 [\[8\]](https://standards.iteh.ai/catalog/standards/iso/f0a240c0-0df9-4d8f-af2c-5f1c6c37dc1d/iso-ts-21328-2022) | CMYKOGV characterisation procedure and OGV pigment choice; also CMYK + any subset of O, G, V. |
| Separation software | Spot-to-ECG conversion, 7C profiling and proofing. |
| Spectral data (CxF/X-4) | Brand colours exchanged as measured spectra, not ink recipes. |
| Press-maker systems | e.g. BOBST oneECG: press, register, inks, cylinders and workflow as one package. |

### 3.4 Why gravure suits ECG

Gravure cylinders are engraved by a closed digital process and wear very little over a run, so tone reproduction is highly repeatable. A Flexo+Tiefdruck review notes that this makes gravure well suited to standardised 7-colour printing. [\[11\]](https://www.flexotiefdruck.de/?p=21574) The weak points are register and ink stability, covered in Section 7.

## 4. Advantages of ECG in Gravure

The main gain is that ink stations stop changing between jobs; most other benefits follow from that, as Table III shows.

**Table III.** Advantages of ECG for gravure converters

| Area | Benefit | Gravure-specific effect |
| --- | --- | --- |
| Changeover | No ink change or washup on the seven fixed stations; only cylinders change. | Shorter make-ready; fewer doctor-blade and ink-pump cleanings. |
| Colour count | Most spot colours become 2–3 ink builds of the fixed set. | 8–10 colour jobs fit on 7 stations, plus 1–2 for white, varnish or a true special. |
| Ink inventory | Seven process inks replace a kitchen of hundreds of spot shades. | Less expired and leftover solvent ink; simpler ink recovery. |
| Ganging, short runs | Different SKUs can be printed in one run because they share inks. | Several flavours or languages on one web; multi-SKU, shorter-run gravure. |
| Consistency | Colour set by engraved tone, not by hand-mixed ink. | Same build on every reprint and across sites using one profile. |
| Prepress | One 7C profile per substrate; spots converted digitally. | Fewer cylinder remakes for colour; digital proofs replace most press proofs. |
| Image quality | Wider gamut for skin tones, fruit and greenery. | Brighter food and product imagery than CMYK alone. |
| Metallics | Gold, silver and bronze simulated with process inks over metallised film. | Fewer specialised metallic inks and washups. [\[9\]](https://www.packaging-gateway.com/newsletters/bobst-gravure-innovation) |
| Sustainability | Fewer washups; less solvent, VOC and ink waste; fewer cylinders. | Less copper and chrome plating and engraving chemistry per job. |

For a converter competing with flexo on mid-length runs, the changeover and ganging benefits matter most. Wipak, which adopted oneECG, framed the move as a way to make gravure efficient enough to compete with flexo. [\[12\]](https://www.packaging-gateway.com/?p=91840)

## 5. Using ECG to Reduce the Number of Colours

ECG cuts colours in two ways: it caps the stations a job needs at seven process inks, and it removes ink changes between jobs because every job uses the same seven.

### 5.1 Conversion rules

1. **List every colour** in the job: CMYK images, each spot, whites, varnishes and metallics.
2. **Separate the non-convertible items** — opaque white, lacquers, true metallic ink, fluorescents, and any brand colour whose owner insists on a solid spot. These keep their own stations.
3. **Convert each remaining spot** to a CMYKOGV build and check the predicted ΔE00 against the brand tolerance (typically ≤ 2–3).
4. **Prefer simple builds:** two inks where possible, three at most, plus K only for depth.
5. **Watch large flat areas:** a halftone build on a big solid can show mottle; such areas may justify a spot or a heavier engraving.
6. **Proof digitally** against the 7C profile, then confirm on press with a control strip.

### 5.2 Worked example

Table IV applies these rules to an illustrative snack pouch.

**Table IV.** Snack pouch separations (illustrative)

| Element | CMYK + spots | ECG (CMYKOGV) |
| --- | --- | --- |
| Food photo | C, M, Y, K | C, M, Y, K + O/G |
| Brand red | Spot red | M + O (+ Y) |
| Leaf green | Spot green | G + Y |
| Royal blue panel | Spot blue | C + V |
| Gold accent | Spot gold | Y + O + K over metallised film, or keep spot |
| Base white | White | White |
| **Stations used** | **9** (CMYK, 4 spots, white) | **8** (7 process, white) |
| **Ink changes, next flavour** | 2–4 stations washed | 0 (cylinders only) |

The station saving on one job is modest — one or two units. The bigger saving is across a job sequence: with CMYK + spots every flavour change needs fresh spot inks; with ECG, ten flavours run back to back with only cylinder changes, or can be ganged across one web.

### 5.3 Reduced-ink variants

Not every job needs all three extra inks; ISO/TS 21328 covers CMYK plus any subset of O, G or V: [\[8\]](https://standards.iteh.ai/catalog/standards/iso/f0a240c0-0df9-4d8f-af2c-5f1c6c37dc1d/iso-ts-21328-2022)

- **CMYK + O** — warm categories (snacks, biscuits, confectionery).
- **CMYK + OV** — reds plus blue or purple brand colours.
- **CMYK + OG** — close to Hexachrome; produce, herbal and beverage packs.

A 5- or 6-colour subset keeps more stations free for whites and coatings on 8-colour presses, at the cost of a smaller gamut.

## 6. Alternative Colour Schemes Compared

CMYK + spots still gives the best match on any single brand colour; ECG gives the best economics across many jobs. Table V compares the schemes.

**Table V.** Comparison of colour schemes for gravure

| Scheme | Inks | Gamut vs CMYK | Changeover | Status | Best fit in gravure |
| --- | --- | --- | --- | --- | --- |
| CMYK only | 4 | Baseline | Very low | Universal | Price-driven work, few brand colours |
| CMYK + spots | 4 + 2–6 | Exact for each spot | High | Dominant | Long runs, strict brand solids, few SKUs |
| Spot-only line work | 2–6 | Exact, no images | High | Common | Simple graphics, no photography |
| Hexachrome (CMYKOG) | 6 | Large in orange/green | Low | Discontinued 2008 | Historical |
| Opaltone (CMYK + RGB) | 7 | Large in red/green/blue | Low | Inactive | Historical |
| ECG (CMYKOGV) | 7 | Largest fixed set; ~90% of Pantone (approx.) | Lowest | Growing; standardised | Multi-SKU, short/medium runs, ganging |
| ECG subset | 5–6 | Partial extension | Low | In use | Category-specific packs; 8-colour presses |
| Hybrid ECG + 1–2 spots | 8–9 | ECG plus exact key solids | Low–medium | Common transition | Brands with one non-negotiable solid |
| Digital inkjet multi-primary | 6–8 | Similar to ECG | None | Growing (labels, cartons) | Not gravure; competes for short runs |

The hybrid route is the practical one for most converters: run the seven ECG inks as the fixed base, and keep one or two open stations for white, varnish or a single brand solid that cannot be built.

## 7. Disadvantages and Limitations

ECG trades ink-room flexibility for process discipline: it pays only when register, ink and cylinder making are tightly controlled. Table VI lists the limitations and their mitigations.

**Table VI.** Limitations of ECG in gravure and mitigations

| Limitation | Why it matters | Mitigation |
| --- | --- | --- |
| Tight register | A colour built from 2–3 halftones shifts in hue on mis-register; a solid spot does not. Process colours need tighter register than spots. [\[1\]](https://library-files.taga.org/2024-proceedings/T20240124.pdf) | Automatic register control, stable web tension. |
| Ink stability | Viscosity and temperature drift change density and hue of every build at once. | Inline viscosity control, thermostatted ink units, batch QC. |
| Cylinder consistency | Every colour depends on engraved tone values; cell variation becomes colour variation. | Calibrated engraving, SCTV-based tone curves, chrome-wear checks. |
| Large flat tints | Halftone builds on big solids can show mottle, grain or visible screen. | Finer screens, heavier engraving, or a spot. |
| Out-of-gamut colours | Fluorescents, some pastels, deep metallics, opaque whites, some dark blues. | Hybrid ECG + 1–2 spots. |
| Metamerism | A build and the spot it replaces have different spectra; they may match under D50 and differ under store lighting. | Spectral matching; multi-illuminant checks. |
| Brand approval | Some brands mandate spot inks and physical drawdowns. | Spectral targets and printed ECG proofs. |
| Up-front cost | Profiling per substrate, separation software, training, possible press upgrades. | Pilot on one press and substrate first. |
| Free stations | On an 8-colour press, ECG + white leaves no room for varnish or a special. | 9–10 colour press, or an ECG subset. |
| Cylinders per job | A converted spot may need 2–3 cylinders where it used one. | Count savings across the job sequence. |
| Skills | Operators must hold process to target rather than adjust spot strength. | Training; measurement-based control. |

The most common failure is not technical: converters move the artwork to ECG but leave the press uncontrolled, so the builds drift and the brand owner reverts to spots.

## 8. Implementation Roadmap

A gravure converter should adopt ECG in four gated phases (Fig. 1), and should not convert live jobs until the press is proven stable. Each gate is a go/no-go check. Skipping Gate 1 is the usual trap: profile adjustments cannot compensate for an unstable press.

<figure class="roadmap" id="fig-1">
<svg viewBox="0 0 760 540" role="img" aria-label="ECG adoption roadmap: four phases separated by three gates" xmlns="http://www.w3.org/2000/svg" font-family="Inter, Arial, sans-serif" font-size="12" style="display:block;width:100%;max-width:820px;height:auto;margin:0 auto">
<defs><marker id="rm-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>
<g style="color:var(--ink-faint)" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M120 96V151" marker-end="url(#rm-arrow)"/><path d="M120 236V291" marker-end="url(#rm-arrow)"/><path d="M120 376V431" marker-end="url(#rm-arrow)"/></g>
<g style="fill:var(--bg);stroke:var(--ink-faint)" stroke-width="1.2"><polygon points="120,114 130,124 120,134 110,124"/><polygon points="120,254 130,264 120,274 110,264"/><polygon points="120,394 130,404 120,414 110,404"/></g>
<g font-size="11.5" font-style="italic" style="fill:var(--ink-soft)"><text x="146" y="128">Gate 1: register, viscosity and temperature hold within limits over a full run</text><text x="146" y="268">Gate 2: 7C profile verified; digital proof matches press within agreed ΔE00</text><text x="146" y="408">Gate 3: brand-owner approval and measured savings against CMYK + spots</text></g>
<rect x="24" y="12" width="712" height="84" rx="8" style="fill:var(--tint);stroke:var(--accent)" stroke-width="2"/>
<g style="fill:none;stroke:var(--ink-faint)" stroke-width="1.2"><rect x="24" y="152" width="712" height="84" rx="8"/><rect x="24" y="292" width="712" height="84" rx="8"/><rect x="24" y="432" width="712" height="84" rx="8"/></g>
<g style="stroke:var(--rule)"><line x1="212" y1="24" x2="212" y2="84"/><line x1="212" y1="164" x2="212" y2="224"/><line x1="212" y1="304" x2="212" y2="364"/><line x1="212" y1="444" x2="212" y2="504"/></g>
<g font-size="11.5" style="fill:var(--ink-faint)"><text x="40" y="44">Phase 1</text><text x="40" y="184">Phase 2</text><text x="40" y="324">Phase 3</text><text x="40" y="464">Phase 4</text></g>
<g font-size="13" font-weight="600" style="fill:var(--ink)"><text x="40" y="64">Assess and stabilise</text><text x="40" y="204">Characterise</text><text x="40" y="344">Pilot</text><text x="40" y="484">Scale</text></g>
<g style="fill:var(--ink)"><text x="228" y="38">Audit register, ink viscosity/temperature control and engraving</text><text x="228" y="58">Choose one press and one substrate family for the trial</text><text x="228" y="78">Fix the CMYKOGV ink supplier; train operators to run by measurement</text><text x="228" y="178">Engrave and print a 7-colour test form (ISO/TS 21328, Fogra ECG-7C)</text><text x="228" y="198">Build the 7C profile; linearise O, G and V with SCTV (ISO 20654)</text><text x="228" y="218">Set up spot-to-ECG conversion and digital proofing</text><text x="228" y="318">Convert 3 to 5 live multi-SKU jobs with the brand owner's consent</text><text x="228" y="338">Run them back to back with no ink change; log ΔE, waste, make-ready</text><text x="228" y="358">Compare against the same jobs printed CMYK + spots</text><text x="228" y="458">Extend to more presses and substrates, one profile each</text><text x="228" y="478">Offer ganged multi-SKU runs and ECG + 1 to 2 spot hybrids</text><text x="228" y="498">Shrink the spot-ink kitchen; track solvent and waste savings</text></g>
</svg>
<figcaption style="text-align:center"><b>Figure 1.</b> ECG adoption roadmap for a gravure converter: four phases separated by three go/no-go gates.</figcaption>
</figure>

## 9. Current Trends (2024–2026)

ECG in gravure has moved from trials to production in Europe, and its scope is widening from brand colours to metallic effects.

- **Press makers selling ECG as a system.** BOBST's oneECG for gravure bundles press, register control, inks, cylinders and workflow. In late 2025 BOBST reported considerable traction among European gravure printers and positioned ECG at the core of its smartGRAVURE concept. [\[9\]](https://www.packaging-gateway.com/newsletters/bobst-gravure-innovation)
- **Metallics from process inks.** The 2025 extension simulates gold, silver and bronze shades with the fixed set over metallised film; Italian converter Poplast was the first commercial user, with a 7+1 offering. [\[13\]](https://thepackman.in/bobst-oneecg-brings-cost-effective-metallic-printing-to-gravure/)
- **Ink makers supporting ECG.** Sun Chemical markets ECG ink sets and colour-management services for gravure. [\[14\]](https://www.sunchemical.com/ecg-for-gravure-printing/)
- **Standards maturing.** FOGRA55 and ISO/TS 21328:2022 give a common reference for 7-colour data and profiling, ending the era of proprietary, generic profiles. [\[7\]](https://fogra.org/en/research/prepress-technology/multiprimary-printing-13003) [\[8\]](https://standards.iteh.ai/catalog/standards/iso/f0a240c0-0df9-4d8f-af2c-5f1c6c37dc1d/iso-ts-21328-2022)
- **Same seven inks across processes.** Heidelberg's Multicolor offset workflow and its Primefire and Gallus Labelfire inkjet presses use CMYK + OGV, so brands can hold one ECG target across gravure, flexo, offset and digital. [\[2\]](https://printweek.com/content/features/has-fixed-palette-come-of-age-at-last)
- **Spectral, data-driven brand colour.** Colour is increasingly exchanged as measured spectra (CxF) and approved against tolerances, which suits ECG better than physical drawdowns.
- **Competition from flexo and digital.** ECG has spread fastest in flexo and labels; gravure adopts it to defend mid-length, multi-SKU work, with thermostatted ink units and register optimisation as preconditions. [\[1\]](https://library-files.taga.org/2024-proceedings/T20240124.pdf)
- **Sustainability reporting.** Fewer washups, less solvent and less leftover ink are now quoted as carbon and VOC savings.
- **India.** Adoption has been led by labels and flexo, e.g. FlexoKite ECG demonstrations in Nashik [\[15\]](https://www.labelsandlabeling.com/labels/features/conventional-printing/flexokite-demonstrates-extended-gamut-color-printing) and Esko Equinox at Pragati Offset. [\[16\]](https://www.finat.com/news/pragati-pioneers-expanded-gamut-printing-eskos-award-winning) India's large base of 8–10 colour gravure presses is well placed for ECG, though published gravure case studies are still few.

## 10. Conclusion

ECG is the first fixed-palette scheme with open inks, international standards and mainstream software behind it, so it has a better chance than Hexachrome or Opaltone did. For gravure, its value lies less in the station count of a single job than in eliminating ink changes across a sequence of jobs, which enables ganging, shorter runs and lower solvent and ink waste.

It is not a universal replacement for spot colours. Register, ink and cylinder control must be held tightly, some colours stay outside the gamut, and brand owners must accept data-based approval. A hybrid of ECG plus one or two open stations is the realistic target for most converters.

## Acknowledgment

This paper was drafted with the assistance of Claude, a large language model by Anthropic, used for literature search, structuring and drafting. The author reviewed and edited the content.

## References

All links accessed November 2026.

1. A. Weichmann, "Gravure printing: Developments to increase competitiveness," in *Proc. TAGA Annu. Tech. Conf.*, 2024. [Online]. Available: [https://library-files.taga.org/2024-proceedings/T20240124.pdf](https://library-files.taga.org/2024-proceedings/T20240124.pdf)
2. PrintWeek, "Has fixed-palette come of age at last?" [Online]. Available: [https://printweek.com/content/features/has-fixed-palette-come-of-age-at-last](https://printweek.com/content/features/has-fixed-palette-come-of-age-at-last)
3. "Hexachrome," Wikipedia. [Online]. Available: [https://en.wikipedia.org/wiki/Hexachrome](https://en.wikipedia.org/wiki/Hexachrome)
4. R. Meade, "Opaltone seven colour process," *Packaging News*. [Online]. Available: [https://www.nspackaging.com/?p=44554](https://www.nspackaging.com/?p=44554)
5. Fujifilm, "The history of CMYK printing." [Online]. Available: [https://print-us.fujifilm.com/news-updates/cmyk-history/](https://print-us.fujifilm.com/news-updates/cmyk-history/)
6. *Graphic Technology — Measurement and Calculation of Spot Colour Tone Value*, ISO 20654:2017, 2017. [Online]. Available: [https://www.iso.org/standard/68668.html](https://www.iso.org/standard/68668.html)
7. Fogra, "Multiprimary printing (FOGRA55 CMYKOGV exchange colour space)." [Online]. Available: [https://fogra.org/en/research/prepress-technology/multiprimary-printing-13003](https://fogra.org/en/research/prepress-technology/multiprimary-printing-13003)
8. *Graphic Technology — Guidelines and Recommendations for Multicolour (CMYKOGV) Print Characterization*, ISO/TS 21328:2022, 2022. [Online]. Available: [https://standards.iteh.ai/catalog/standards/iso/f0a240c0-0df9-4d8f-af2c-5f1c6c37dc1d/iso-ts-21328-2022](https://standards.iteh.ai/catalog/standards/iso/f0a240c0-0df9-4d8f-af2c-5f1c6c37dc1d/iso-ts-21328-2022)
9. R. Saha, "BOBST's gravure innovation reproduces metallics with standard inks," *Packaging Gateway*, Oct. 22, 2025. [Online]. Available: [https://www.packaging-gateway.com/newsletters/bobst-gravure-innovation](https://www.packaging-gateway.com/newsletters/bobst-gravure-innovation)
10. Y. Li and A. Kraushaar, "Identification of aim values for a CMYK-OGV based process agnostic ECG characterization dataset: FOGRA55," in *Proc. TAGA Annu. Tech. Conf.*, 2021. [Online]. Available: [https://www.printing.org/publication/t210113](https://www.printing.org/publication/t210113)
11. Flexo+Tiefdruck, "Colour management: Extended colour gamut in gravure." [Online]. Available: [https://www.flexotiefdruck.de/?p=21574](https://www.flexotiefdruck.de/?p=21574)
12. Packaging Gateway, "Wipak selects BOBST oneECG for gravure printing." [Online]. Available: [https://www.packaging-gateway.com/?p=91840](https://www.packaging-gateway.com/?p=91840)
13. The Packman, "Bobst oneECG brings cost-effective metallic printing to gravure," Jan. 2026. [Online]. Available: [https://thepackman.in/bobst-oneecg-brings-cost-effective-metallic-printing-to-gravure/](https://thepackman.in/bobst-oneecg-brings-cost-effective-metallic-printing-to-gravure/)
14. Sun Chemical, "ECG technology can transform gravure printing." [Online]. Available: [https://www.sunchemical.com/ecg-for-gravure-printing/](https://www.sunchemical.com/ecg-for-gravure-printing/)
15. Labels & Labeling, "FlexoKite demonstrates extended gamut color printing," Oct. 11, 2022. [Online]. Available: [https://www.labelsandlabeling.com/labels/features/conventional-printing/flexokite-demonstrates-extended-gamut-color-printing](https://www.labelsandlabeling.com/labels/features/conventional-printing/flexokite-demonstrates-extended-gamut-color-printing)
16. FINAT, "Pragati pioneers expanded gamut printing with Esko's award-winning Equinox solution," Sep. 2014. [Online]. Available: [https://www.finat.com/news/pragati-pioneers-expanded-gamut-printing-eskos-award-winning](https://www.finat.com/news/pragati-pioneers-expanded-gamut-printing-eskos-award-winning)
