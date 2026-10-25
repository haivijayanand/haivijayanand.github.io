## Abstract

Powered and passive exoskeletons have moved from a 1890 patent and a failed 1960s military prototype to a commercial industry with FDA-cleared medical devices, tens of thousands of industrial units in service, and fielded military load-carriage trials. This paper traces that history in four eras, explains the enabling technologies, and examines how the first products crossed the regulatory, reimbursement and standards barriers to market. It then maps the major manufacturers in 2026 across medical rehabilitation, personal mobility, industrial, military and consumer applications, with product links. Finally it reviews market estimates and the open technical problems of power density, human–machine interaction, fit and safety, and outlines the likely direction of each application segment over the next decade, including opportunities for Indian defence and industry.

**Keywords:** exoskeleton, exosuit, wearable robotics, rehabilitation robotics, human performance augmentation, load carriage, ISO 13482, ASTM F48

## 1. Introduction

An exoskeleton is a wearable mechanical structure that acts in parallel with the human body to support, assist or augment movement. Unlike a prosthesis, which replaces a missing limb, or a stand-alone robot, which works apart from the person, an exoskeleton shares load and motion with the wearer's own joints. Its output therefore depends on how well it reads and follows human intent.

Three needs drive the field:

- **Restoring mobility** to people with spinal cord injury (SCI), stroke, multiple sclerosis or age-related weakness, and giving therapists a way to deliver high-repetition gait training.
- **Preventing injury** in workers who lift, bend or hold tools overhead for long shifts. Work-related musculoskeletal disorders remain among the largest causes of lost workdays in manufacturing, logistics and construction.
- **Extending human endurance and strength** for soldiers, first responders and anyone who must carry heavy loads over distance.

This paper covers the classification of exoskeletons (Section 2), their history (Section 3), enabling technologies (Section 4), the path to commercialisation (Section 5), the major players in each application area as of October 2026 (Section 6), the market (Section 7), open challenges (Section 8) and the future outlook (Section 9).

## 2. Classification of exoskeletons

Exoskeletons are classified along four independent axes. Any one device sits at one point on each.

| Axis | Categories | Typical examples |
| --- | --- | --- |
| Body region | Upper limb / shoulder; lower back (lumbar); lower limb (hip, knee, ankle); full body; hand / glove | Shoulder tool-support vests; lumbar lift-assist suits; gait-training legs; full-body heavy-lift suits |
| Actuation | **Passive** (springs, elastic bands, gas struts store and return energy); **Active / powered** (electric motors, hydraulics, pneumatics, with battery and controller); **Hybrid / quasi-passive** (passive elements with small actuators or clutches that lock, release or tune them) | Passive shoulder vests; powered hip-knee orthoses; clutch-switched knee braces |
| Structure | **Rigid** (links and joints aligned with the body's joints); **Soft exosuit** (textiles and cables that apply tension across joints with no rigid frame) | Rigid gait exoskeletons; cable-driven soft ankle and hip suits |
| Application | Medical rehabilitation (clinic); personal mobility (home and community); industrial / occupational; military and first responder; consumer and sport | — |

The actuation choice dominates cost, mass and regulation. Passive industrial devices weigh about 2–5 kg, need no battery and sell for a few thousand US dollars. Powered medical exoskeletons weigh 20–30 kg with battery, are regulated as medical devices and cost tens of thousands of dollars or more.

## 3. Historical development

The idea is 136 years old, but working products arrived only after 2010, when lithium-ion batteries, compact brushless motors and cheap embedded computing matured together. The history falls into four eras.

### 3.1 Mechanical concepts (1890–1960)

In 1890 the Russian engineer Nicholas Yagn received US patent [US420179](https://patents.google.com/patent/US420179) for an *Apparatus for Facilitating Walking, Running and Jumping*. It used long leaf springs running parallel to the legs to store energy at foot strike and release it at push-off; it was entirely passive. [\[1\]](https://encyclopedia.pub/entry/history/show/14861) Later passive designs in the early twentieth century followed the same principle with smaller, more limited mechanisms.

### 3.2 Powered amplifiers and the first failures (1960–1990)

In the 1960s the US Army and Navy funded General Electric, led by Ralph Mosher, to build **Hardiman I**, a full-body hydraulic "man amplifier" meant to let one operator lift about 680 kg (1,500 lb). The machine itself weighed about 680 kg and measured about 1.8 × 1.0 × 0.7 m. [\[2\]](https://bigenc.ru/c/promyshlennyi-ekzoskelet-d127ff) GE's final report of 30 August 1971 documented the programme. [\[3\]](https://www.uab.edu/inquiro/issues/past-issues/volume-9/exosuits-past-present-and-future) Only a single arm ever worked reliably; whole-body operation produced violent, uncontrolled motion. The lesson was that the hard problem is not force but **human–machine coordination**: without fast, precise control the suit was too bulky and dangerous to use. [\[4\]](https://eu.36kr.com/en/p/3846942086462088) GE reused the hydraulic master–slave work in its quadruped *Walking Truck*.

In parallel, Mihajlo Vukobratović's group at the Mihajlo Pupin Institute in Belgrade built pneumatically powered lower-limb exoskeletons for paraplegic patients in the late 1960s and early 1970s. Their balance work led to the zero-moment-point (ZMP) concept that still underpins biped and exoskeleton gait control.

### 3.3 Defence-funded renaissance (1990–2010)

In 1992 Yoshiyuki Sankai at the University of Tsukuba began the work that became **HAL (Hybrid Assistive Limb)**, among the first exoskeletons with real market potential. [\[3\]](https://www.uab.edu/inquiro/issues/past-issues/volume-9/exosuits-past-present-and-future) HAL reads bioelectric (surface EMG) signals at the skin to detect the wearer's intent before the joint moves.

In 2000 DARPA launched the **Exoskeletons for Human Performance Augmentation (EHPA)** programme, a US$50 million, five-year effort. [\[5\]](https://web.stanford.edu/group/resna/SIG-11/archive/exoskeleton.htm) From 23 proposals it selected UC Berkeley, Sarcos Research, Oak Ridge National Laboratory and Millennium Jet; Sarcos and Oak Ridge were to develop full-body suits. [\[5\]](https://web.stanford.edu/group/resna/SIG-11/archive/exoskeleton.htm) The target was a suit that let a soldier carry roughly double the 50 kg an unaided soldier is expected to carry, and march faster and longer. [\[6\]](https://spectrum.ieee.org/the-rise-of-the-body-bots)

Two results shaped the industry:

- **BLEEX** (Berkeley Lower Extremity Exoskeleton, H. Kazerooni) carried a substantial external load plus its own weight while walking, energetically autonomous, in 2005–2006. [\[3\]](https://www.uab.edu/inquiro/issues/past-issues/volume-9/exosuits-past-present-and-future) BLEEX became the base for **HULC** (Human Universal Load Carrier), licensed to Lockheed Martin, and the spin-out company that became **Ekso Bionics**. [\[7\]](https://www.mddionline.com/regulatory-quality/an-exoskeleton-first-fda-clears-rewalk)
- **Sarcos XOS / XOS 2** (later under Raytheon) demonstrated full-body powered strength augmentation, with the wearer lifting heavy loads repeatedly. It was tethered to an external power supply, which limited field use.

### 3.4 Commercial era (2010–present)

The focus shifted from soldiers to patients and workers, where the value case was clearer and the duty cycle shorter.

- ReWalk (Argo Medical Technologies, Israel) entered clinical trials at MossRehab, Philadelphia, in 2009; it was cleared for clinical use in 2011 and trialled for home use from 2012. [\[8\]](https://www.guinnessworldrecords.com/world-records/693750-first-powered-exoskeleton-approved-for-general-use) It reached the European market in 2012. [\[7\]](https://www.mddionline.com/regulatory-quality/an-exoskeleton-first-fda-clears-rewalk)
- On 26 June 2014 the US FDA granted ReWalk Personal a de novo classification, the first powered exoskeleton cleared for home and community use. [\[8\]](https://www.guinnessworldrecords.com/world-records/693750-first-powered-exoskeleton-approved-for-general-use)
- Ekso Bionics, Parker Hannifin (Indego) and Cyberdyne followed with FDA clearances (Section 5).
- From about 2015 automotive and aerospace plants (Ford, Toyota, BMW, Airbus, Boeing) began deploying passive shoulder and back exoskeletons at scale.
- The US SOCOM TALOS programme (2013–2019) tried to build a powered armoured suit for special forces and ended without fielding one, a second Hardiman-style lesson about power and integration. Military interest moved to lighter, task-specific devices.
- From about 2019 soft exosuits (Harvard Wyss Institute, ReWalk ReStore) and, from 2023, consumer hiking exoskeletons from Chinese and US firms opened new segments.

| Year | Milestone | Significance |
| --- | --- | --- |
| 1890 | Yagn walking-assist patent | First exoskeleton patent; passive springs |
| 1965–1971 | GE Hardiman I | First powered full-body suit; control failure |
| c. 1970 | Vukobratović, Pupin Institute | Powered gait assistance for paraplegia; ZMP |
| 1992 | HAL research begins, Tsukuba | EMG intent detection |
| 2000 | DARPA EHPA launched | US$50 M military push |
| 2004–2006 | BLEEX, Sarcos XOS | Load-carrying and full-body demos |
| 2009 | HULC licensed to Lockheed Martin | Untethered military load carrier |
| 2012 | ReWalk CE marked | First commercial medical walking exoskeleton |
| 2014 | ReWalk FDA de novo | First home-use clearance |
| 2015 onward | Industrial passive exos in auto plants | Volume market begins |
| 2013–2019 | SOCOM TALOS | Powered combat suit cancelled |
| 2019 onward | Soft exosuits, consumer exos | Lighter, cheaper, wider adoption |

## 4. Enabling technologies

A practical exoskeleton is a balance of six subsystems. Weakness in any one makes the device heavier, slower or less trusted than the user's own body.

| Subsystem | Current practice | Key engineering trade-off |
| --- | --- | --- |
| Actuation | Brushless DC motors with harmonic or planetary reduction (medical); series-elastic actuators for compliance; Bowden-cable drives (soft suits); hydraulics for very high force (heavy-lift, legacy military); springs, gas struts and elastic bands (passive) | Torque density vs back-drivability. High gear ratios give torque but resist natural motion; quasi-direct-drive motors are transparent but heavy |
| Sensing | Joint encoders, IMUs on thigh/shank/trunk, foot-pressure insoles, load cells; surface EMG (HAL); research use of EEG / brain–computer interfaces | Robust intent detection with few sensors and no skin preparation |
| Control | Finite-state gait machines triggered by trunk tilt (ReWalk); impedance / admittance control; EMG-proportional assist; human-in-the-loop optimisation that tunes assist profiles to minimise metabolic cost; machine-learning gait-phase estimators | Transparency (no resistance when not needed) vs stability and safety |
| Power | Li-ion packs of roughly 0.1–0.5 kWh; swappable batteries; passive devices need none | Run time vs added mass. Power density remains the main barrier for military full-body suits |
| Structure and materials | Aluminium and titanium frames, carbon-fibre composites, technical textiles; adjustable link lengths | Stiffness for load transfer vs mass and comfort |
| Human interface | Straps, cuffs, padded harnesses; self-aligning joint mechanisms to accommodate joint-axis misalignment | Load transfer to the body without pressure sores, chafing or joint misalignment forces |

Two developments since 2015 changed what was possible. Soft exosuits showed that useful assistance (reductions of the order of 10–20 % in metabolic cost of walking in laboratory studies) does not need a rigid frame. Human-in-the-loop optimisation showed that the right assist *profile* matters more than peak force, and that it differs between individuals.

## 5. Path to commercialisation

The products that reached market did so by narrowing the problem: one user group, one indication, one task, a defined payer. Four mechanisms made that possible.

### 5.1 Regulatory clearance (medical)

In the US, powered lower-limb exoskeletons are Class II devices under FDA product code PHL. ReWalk's 2014 de novo grant (K131798) created the category; later devices cleared through the 510(k) route with ReWalk as predicate. [\[9\]](https://www.southcarolinablues.com/web/public/brands/medicalpolicy/external/external-policies/powered-exoskeleton-for-ambulation-in-patients-with-lower-limb-disabilities)

| Year | Device (maker) | FDA route | Indication / setting |
| --- | --- | --- | --- |
| 2014 | ReWalk Personal (ReWalk Robotics, now Lifeward) | De novo, K131798 | SCI; home, community and clinic |
| 2016 | Ekso GT (Ekso Bionics) | 510(k) | SCI and stroke; rehabilitation clinic |
| 2016 | Indego (Parker Hannifin; now Ekso Bionics) | 510(k) | SCI T7–L5, with trained companion; clinic and personal |
| 2017 | HAL for Medical Use, Lower Limb (Cyberdyne) | 510(k), K171909 | Rehabilitation |
| 2020 | Keeogo (B-Temia) | 510(k), K201539 | Mobility assistance |

Indego is cleared for people with SCI at T7 to L5 to walk with supervision of a trained companion, and also for rehabilitation institutions. [\[9\]](https://www.southcarolinablues.com/web/public/brands/medicalpolicy/external/external-policies/powered-exoskeleton-for-ambulation-in-patients-with-lower-limb-disabilities) In Europe, CE marking under the Medical Device Regulation (EU 2017/745) is the equivalent gate; ReWalk was sold in Europe two years before its US home-use clearance. [\[7\]](https://www.mddionline.com/regulatory-quality/an-exoskeleton-first-fda-clears-rewalk)

### 5.2 Reimbursement

Clearance alone did not create a market; payment did. After CMS placed personal exoskeletons in the Medicare **brace** benefit category, it set a lump-sum purchase fee in April 2024, with a ceiling-to-floor range of US$109,238 to US$81,929 and a rate of US$91,032 in each state. [\[10\]](https://mobilitymgmt.com/rewalk-robotics-lauds-medicare-allowable-for-personal-exoskeletons/) The rate applies to claims from 1 April 2024 and covered the ReWalk Personal and the Ekso Indego Personal. [\[11\]](https://exoskeletonreport.com/2024/04/medicare-sets-reimbursement-rates-for-personal-exoskeletons-a-milestone-for-accessibility/) Before this, payment was case by case; only 35 ReWalk Personal systems had been delivered to Medicare beneficiaries by February 2024. [\[12\]](https://ir.rewalk.com/node/12141) Germany's statutory insurers and the US Veterans Affairs programme had earlier been the main payers.

### 5.3 Standards (industrial and general)

Industrial exoskeletons are not medical devices and, in most jurisdictions, are not formally personal protective equipment either, which left buyers without a benchmark. Two standards bodies filled the gap:

- **ISO 13482:2014** (*Robots and robotic devices — Safety requirements for personal care robots*) covers "physical assistant robots", including restraint-type wearable devices.
- **ASTM F48** (*Exoskeletons and Exosuits*), established in autumn 2017, develops standards for wearable devices that assist or enhance motion, posture or physical activity. [\[13\]](https://www.nist.gov/node/1557396) Its scope spans industrial, emergency response, medical, military and consumer uses, passive and active. [\[14\]](https://www.nist.gov/node/1566526) Its first two published standards were F3323 (terminology) and F3358 (labelling and information). [\[15\]](https://sn.astm.org/node/2460/printable/print)

The committee's view is that standards and certification would speed workplace adoption, because the lack of them has been a barrier for industry buyers. [\[16\]](https://stacks.cdc.gov/view/cdc/217664)

### 5.4 Business models

- **Capital sale to clinics** with training and service contracts (Ekso, Hocoma, Cyberdyne). Clinics justify the price by therapy throughput.
- **Rental and leasing**, including Cyberdyne's HAL rental model in Japan and exoskeleton-as-a-service offers for industrial pilots.
- **Volume sale of passive industrial units** at a few thousand dollars each, sold on reduced injury claims and fatigue rather than productivity.
- **Defence R&D contracts and trials**, usually with no production order; few military programmes have yet moved to fielding.
- **Direct-to-consumer** retail of low-cost hip-assist devices, the newest model (Section 6.4).

## 6. Major players today (October 2026)

The industry is fragmented: no company dominates all segments, and many firms are small, venture-funded and changing ownership. Revenue is concentrated in medical rehabilitation; unit volume is shifting fast to consumer devices, led by Chinese makers. Company status below was checked against news to October 2026; product lines change often, so readers should confirm current models on the linked sites.

### 6.1 Medical rehabilitation and personal mobility

| Company (country) | Key products | Type | Notes |
| --- | --- | --- | --- |
| [Lifeward](https://golifeward.com) (Israel/USA), formerly ReWalk Robotics | ReWalk Personal, ReStore soft exo-suit | Powered hip-knee; soft ankle exosuit | First FDA home-use exoskeleton (2014); Medicare-reimbursed. Portfolio also includes AlterG and MyoCycle [\[11\]](https://exoskeletonreport.com/2024/04/medicare-sets-reimbursement-rates-for-personal-exoskeletons-a-milestone-for-accessibility/) |
| [Wandercraft](https://www.wandercraft.eu) (France) | Atalante X (clinic), Eve (personal) | Powered, self-balancing, hands-free | Atalante X cleared for stroke (Dec 2022) and SCI T5–L5 [\[17\]](https://www.massdevice.com/?p=101793). Eve cleared by FDA for personal use, announced 11 Aug 2026 [\[18\]](https://www.wandercraft.eu/articles/wandercraft-receives-fda-clearance-for-eve-the-worlds-first-self-balancing-personal-exoskeleton-for-eligible-wheelchair-users-living-with-spinal-cord-injuries-at-any-level) |
| [Ekso Bionics](https://eksobionics.com) (USA) | EksoNR (clinic), Ekso Indego Personal, EVO (industrial) | Powered lower-limb; passive shoulder | Pioneer from Berkeley BLEEX. Parent company is now ChronoScale, which in 2026 classified the exoskeleton business as held for sale [\[19\]](https://exoskeletonreport.com/?p=12375) |
| [Cyberdyne](https://www.cyberdyne.jp/english/) (Japan) | HAL Lower Limb, HAL Lumbar | Powered, EMG-triggered | FDA 510(k) 2017 [\[9\]](https://www.southcarolinablues.com/web/public/brands/medicalpolicy/external/external-policies/powered-exoskeleton-for-ambulation-in-patients-with-lower-limb-disabilities); covered by Japanese national insurance for some neuromuscular diseases |
| [DIH / Hocoma](https://www.dih.com) (Switzerland) | Lokomat, Armeo | Treadmill-based robotic gait and arm trainers | Stationary rehabilitation robots; long-time clinical leader [\[20\]](https://www.marketsandmarkets.com/ResearchInsight/exoskeleton-market.asp) |
| [Fourier](https://www.fftai.com) (China) | ExoMotus series | Powered lower-limb rehab | Large Chinese rehab-robot maker |
| [Myomo](https://myomo.com) (USA) | MyoPro | Powered upper-limb orthosis, EMG | Arm and hand function after stroke or brachial plexus injury |
| [B-Temia](https://www.b-temia.com) (Canada) | Keeogo | Powered knee assist | FDA 510(k) 2020 [\[9\]](https://www.southcarolinablues.com/web/public/brands/medicalpolicy/external/external-policies/powered-exoskeleton-for-ambulation-in-patients-with-lower-limb-disabilities) |
| [Hyundai Motor Group Robotics Lab](https://www.hyundaimotorgroup.com) (S. Korea) | X-ble MEX | Powered lower-limb rehab | Launched June 2023 [\[20\]](https://www.marketsandmarkets.com/ResearchInsight/exoskeleton-market.asp) |

Wandercraft's Eve is the first self-balancing exoskeleton for personal use; users do not need crutches. Its clearance rested on a three-site trial, and Medicare already pays for personal exoskeletons under billing code K1007. [\[18\]](https://www.wandercraft.eu/articles/wandercraft-receives-fda-clearance-for-eve-the-worlds-first-self-balancing-personal-exoskeleton-for-eligible-wheelchair-users-living-with-spinal-cord-injuries-at-any-level)

### 6.2 Industrial and occupational

| Company (country) | Key products | Type | Notes |
| --- | --- | --- | --- |
| [Ottobock Bionic Exoskeletons / suitX](https://paexo.com) (Germany/USA) | Paexo Shoulder, Paexo Back, suitX range | Passive shoulder, back, wrist, neck | Paexo launched after a 30-worker Volkswagen Bratislava trial; priced at about €5,000 at launch [\[21\]](https://www.aol.com/news/focus-ottobock-reaches-growth-industrial-073000376.html). Ottobock bought suitX in 2021 [\[22\]](https://www.cbinsights.com/investor/suitx) |
| [Hilti](https://www.hilti.com) (Liechtenstein) | EXO-O1, EXO-S | Passive overhead-work shoulder | Developed with Ottobock for construction [\[23\]](https://electricalindustry.ca/changing-scenes/page/154/?start=1450) |
| [Comau](https://www.comau.com) (Italy) | MATE-XT | Passive shoulder | Automotive-plant origin [\[20\]](https://www.marketsandmarkets.com/ResearchInsight/exoskeleton-market.asp) |
| [Levitate Technologies](https://www.levitatetech.com) (USA) | AIRFRAME | Passive shoulder | Trialled at BMW Spartanburg [\[21\]](https://www.aol.com/news/focus-ottobock-reaches-growth-industrial-073000376.html); tunnel construction at Granite Construction [\[24\]](https://www.globenewswire.com/de/news-release/2025/06/12/3098454/28124/en/Exoskeleton-Market-Research-and-Global-Forecast-Report-2025-2030-Powered-Exoskeletons-Lead-Growth-with-Robust-Investment-Activities-Industrial-Adoption-Amplifies-Expansion.html) |
| [Laevo](https://www.laevo-exoskeletons.com) (Netherlands) | Laevo Flex | Passive back | Logistics and warehousing |
| [Hyundai Motor Group](https://www.hyundaimotorgroup.com) (S. Korea) | X-ble Shoulder | Passive shoulder | Used in Hyundai and Kia plants |
| [Verve Motion](https://www.vervemotion.com) (USA) | SafeLift | Powered soft back exosuit | Harvard soft-exosuit lineage; venture-backed [\[24\]](https://www.globenewswire.com/de/news-release/2025/06/12/3098454/28124/en/Exoskeleton-Market-Research-and-Global-Forecast-Report-2025-2030-Powered-Exoskeletons-Lead-Growth-with-Robust-Investment-Activities-Industrial-Adoption-Amplifies-Expansion.html) |
| [HeroWear](https://herowearexo.com) (USA) | Apex 2 | Passive soft back | Commercial version of the Army/Vanderbilt SABER exosuit [\[25\]](https://www.slashgear.com/1903335/military-us-developing-powered-exoskeletons) |
| [German Bionic](https://germanbionic.com) (Germany) | Apogee | Powered, AI-connected back assist | Filed for bankruptcy in November 2025 [\[26\]](https://www.cbinsights.com/company/german-bionic) |

Passive shoulder and back devices are the volume product. Powered industrial suits have struggled commercially: German Bionic's insolvency and Sarcos's exit from its Guardian XO heavy-lift suit (the company reorganised as Palladyne AI in 2024) show how hard it is to make a powered industrial suit pay back on the shop floor.

### 6.3 Military and defence

| Organisation (country) | Programme / product | Type | Status |
| --- | --- | --- | --- |
| [Lockheed Martin](https://www.lockheedmartin.com) (USA) | HULC (2009); ONYX knee exoskeleton with Dephy; FORTIS tool-arm exo | Powered knee; passive tool support | ONYX developed under a two-year sole-source agreement with US Army Natick [\[27\]](https://interaksyon.philstar.com/?p=139482); FORTIS used B-Temia technology [\[28\]](https://www.defenseindustrydaily.com/i-am-iron-man-04877/) |
| US Army DEVCOM / Futures Command | SABER (Pathfinder, with Vanderbilt); infantry exoskeleton requirement | Passive soft back; powered lower-limb | SABER reduced lift back strain by up to 40 % but was not adopted [\[25\]](https://www.slashgear.com/1903335/military-us-developing-powered-exoskeletons); Army formally pursued an infantry exoskeleton from 2020 [\[29\]](https://taskandpurpose.com/news/army-exoskeleton-futures-command/) |
| [Ottobock suitX](https://www.suitx.com) (USA) | Army evaluation contract | Powered | Commercial units tested at Fort Sill, late 2024 [\[25\]](https://www.slashgear.com/1903335/military-us-developing-powered-exoskeletons) |
| Russia | K-2 passive lower-body; Ratnik-3 concept | Passive; powered concept | K-2 shown 2017; Ratnik-3 shown 2018 [\[29\]](https://taskandpurpose.com/news/army-exoskeleton-futures-command/) |
| China (PLA) | Logistics and high-altitude load-carriage suits | Passive and powered | PLA observed using suits for supply, logistics and patrol [\[30\]](https://www.spsmai.com/experts-speak/?id=1523) |
| [Tata Advanced Systems](https://www.tataadvancedsystems.com) + DRDO (India) | Full-body gravity-redistribution exoskeleton for infantry | Passive | Unveiled 2025 [\[31\]](https://www.cbinsights.com/company/genelek-technologies); reported to transfer up to 75 % of carried weight to the ground [\[32\]](https://straitsresearch.com/es/report/military-exoskeleton-market) |
| [Svaya Robotics](https://www.svayarobotics.com) + DRDO R&DE Pune and DEBEL Bengaluru (India) | Active load-carriage exoskeleton | Powered | Technology demonstrator sized to Indian soldier anthropometry [\[33\]](https://vajiramandravi.com/current-affairs/indias-first-indigenous-quadruped-robot-and-exoskeleton/) |

Military interest has moved away from full "Iron Man" suits toward three narrower jobs: load carriage on the march (knee and hip assist), logistics lifting (back exosuits) and tool or weapon support (passive arm exos). DRDO is developing both passive and powered exoskeletons for logistics tasks, after capturing and analysing soldier biomechanics for those tasks. [\[30\]](https://www.spsmai.com/experts-speak/?id=1523)

### 6.4 Consumer and sport

| Company (country) | Key products | Price band | Notes |
| --- | --- | --- | --- |
| [Hypershell](https://hypershell.tech) (China/HK) | X Go, X Pro, X Carbon, X Ultra S; Halo | Entry to premium; Halo Origin €2,299 | Top-selling consumer brand, sold in over 70 countries; US$50 M Series B+ in May 2026 [\[34\]](https://equalocean.com/news/2026051821902-hypershell-secures-50-million-series-b-funding-co-led-ant-group-meituan/amp). Halo (hip + knee, 2.6 kg) debuted at IFA 2026 [\[35\]](https://allmind.ai/news/08ad798451bddbcefcf01fa6d7b6b8f58348cc35f3de707ba4cd77bec3c37ef4) |
| [Dnsys](https://dnsys.ai) (China) | X1 Lite, X1 Carbon, X1 Carbon Pro | Entry to mid | Powered hip [\[36\]](https://exoskeletonreport.com/?p=11176) |
| RoboCT (China) | GoGo series | Entry | Moved from hospital rehab to consumer; targets 60,000–100,000 units in 2026 [\[37\]](https://exoskeletonreport.com/2026/03/2026-exoskeleton-news-week-10-mining-rescue-roboct-funding-new-jobs-and-more/) |
| [Samsung](https://www.samsung.com) (S. Korea) | Bot Fit (formerly GEMS Hip) | Mid | Hip-assist for walking exercise |
| [Skip](https://www.skip.inc) with Arc'teryx (USA/Canada) | MO/GO | Premium | Powered knee for hiking, spun out of Google X |
| [Roam Robotics](https://www.roamrobotics.com) (USA) | Pneumatic knee exos | Premium | Ski and knee-assist; also military and medical variants |

China shipped about 26,000 exoskeletons in 2025 worth over RMB 1.6 billion. Consumer devices were about 73 % of units but only about 7 % of revenue; medical rehabilitation was about 13 % of units and 88 % of revenue. [\[38\]](https://eu.36kr.com/en/p/3997287673712516)

## 7. Market size and trends

The global exoskeleton market was worth roughly US$0.56–0.60 billion in 2025, and analysts expect it to reach about US$1.8–2.3 billion within eight to ten years. Estimates differ widely because firms define the market differently (some include stationary rehab robots or count consumer devices, some do not).

| Source (published) | Scope | Base value | Forecast | CAGR |
| --- | --- | --- | --- | --- |
| [Towards Healthcare](https://www.towardshealthcare.com/table-of-content/exoskeleton-market-sizing) (Mar 2026) | All exoskeletons | US$595 M (2025) | US$2,309 M (2035) | 14.5 % |
| [Research and Markets](https://www.researchandmarkets.com/reports/5010935/exoskeleton-market-size-share-and-trend) (Feb 2026) | All exoskeletons | US$590 M (2025) | US$1,790 M (2033) | 14.5 % |
| [MarketsandMarkets via GlobeNewswire](https://www.globenewswire.com/de/news-release/2025/06/12/3098454/28124/en/Exoskeleton-Market-Research-and-Global-Forecast-Report-2025-2030-Powered-Exoskeletons-Lead-Growth-with-Robust-Investment-Activities-Industrial-Adoption-Amplifies-Expansion.html) (Jun 2025) | All exoskeletons | US$560 M (2025) | US$2,030 M (2030) | 29.4 % |
| [Straits Research](https://straitsresearch.com/es/report/military-exoskeleton-market) (May 2026) | Military only | US$200.6 M (2025) | US$811.5 M (2034) | 16.8 % |

Five trends stand out:

- **Volume is moving to consumers.** Consumer hip-assist devices now ship in the tens of thousands per year and are sold in Prime Day-style retail promotions, a sign the category is maturing. [\[39\]](https://exoskeletonreport.com/2026/06/exoskeleton-news-archive-jun-20th-2026-week-25-prime-day-style-sales-and-so-much-more-in-just-one-week/)
- **China is the volume manufacturer.** Low-cost supply chains for motors, batteries and drives have let Chinese brands lead consumer sales and start price wars. [\[38\]](https://eu.36kr.com/en/p/3997287673712516)
- **Medical revenue depends on reimbursement.** The 2024 Medicare rate and the 2026 Eve clearance make home-use personal exoskeletons a reimbursable product in the US for the first time at scale.
- **Consolidation and failures are common.** Ekso's parent has put the exoskeleton business up for sale, and German Bionic went bankrupt; the field still has more companies than profitable niches.
- **AI-based control** is replacing rule-based gait state machines; Hypershell, for example, markets end-to-end learned motion control with independently verified gait-synchronisation figures. [\[40\]](https://www.aap.com.au/aapreleases/cision20260520ae63922/)

## 8. Challenges and limitations

The Hardiman lesson still holds: the limiting factors are power, control and the human interface, not raw force.

1. **Power density.** Batteries give hours of assist for a hip device but not for a full-body powered suit doing heavy work. Every kilogram of battery is carried by the user or must be supported by the frame. This is the main reason powered military suits (Hardiman, XOS, TALOS) never fielded.
2. **Human–machine interaction and intent.** The suit must know what the user wants to do before or as they do it. Misreading intent on stairs, slopes or a stumble can be dangerous; over-assistance can cause users to lose muscle strength.
3. **Fit and joint alignment.** Human joints are not simple hinges; the knee's axis moves as it bends. Misalignment causes chafing, pressure points and parasitic forces. Fitting one design to the full range of body sizes, including women and smaller-statured populations, remains difficult.
4. **Evidence of benefit.** Laboratory metabolic savings do not always carry over to real tasks. For industrial devices, long-term injury-reduction data are still limited, and some studies show load shifted to other body regions rather than removed.
5. **Safety and standards.** Industrial devices fall between medical-device and PPE rules. ASTM F48 and ISO 13482 help, but buyer-specific certification and testing frameworks are still forming. [\[16\]](https://stacks.cdc.gov/view/cdc/217664) Consumer devices raise new questions about falls, misuse and inflated specifications.
6. **Cost and business case.** Medical exoskeletons cost around US$80,000–110,000 (the 2024 Medicare range), [\[10\]](https://mobilitymgmt.com/rewalk-robotics-lauds-medicare-allowable-for-personal-exoskeletons/) limiting access outside reimbursed markets such as India. Industrial buyers want payback within one to two years.
7. **User acceptance.** Workers reject devices that are hot, slow to don, catch on structures or make them look different. Soldiers reject anything that adds noise, heat signature or a new failure point.
8. **Supply chain and data security.** Motors depend on rare-earth magnets, an identified risk for military exoskeletons. [\[39\]](https://exoskeletonreport.com/2026/06/exoskeleton-news-archive-jun-20th-2026-week-25-prime-day-style-sales-and-so-much-more-in-just-one-week/) Connected devices also collect biometric and motion data that need protection; ASTM F48 has sought cybersecurity expertise for this reason. [\[15\]](https://sn.astm.org/node/2460/printable/print)

## 9. Future outlook

Over the next decade exoskeletons are likely to become lighter, cheaper and more specialised rather than more powerful. The winners will be devices that do one job well, are donned in under a minute and have a clear payer. The outlook below is the authors' assessment, drawing on the trends in Sections 6–8.

| Application | Near term (2026–2030) | Longer term (2030–2036) | What must happen |
| --- | --- | --- | --- |
| Medical rehabilitation | Wider clinic use for stroke, SCI, MS; AI-tuned gait therapy; lower-cost Chinese and Korean devices enter Asian markets | Exoskeleton gait training becomes routine; combined with functional electrical stimulation and brain–computer interfaces | Stronger outcome evidence; reimbursement outside the US, Germany and Japan |
| Personal mobility (SCI, elderly) | Self-balancing home devices (Eve) scale through Medicare and distributors; hip and knee assist for frail elderly | Lightweight soft suits for ageing populations in Japan, Korea, China, Europe; partial replacement of wheelchairs for some users | Service networks, training, falls-safety standards, insurance coverage |
| Industrial | Passive shoulder and back devices become standard PPE-like equipment in auto, aerospace, construction, logistics; powered soft back suits for warehouses | Connected exos with ergonomic data feeding safety programmes; task-specific modular kits | Long-term injury data; ASTM / ISO certification accepted by safety regulators and insurers |
| Military and first responder | Knee and hip load-carriage aids, logistics lifting suits, passive tool-support arms; trials in high-altitude and mountain operations | Integrated soldier systems sharing power with radios and sensors; hybrid devices that are passive by default and powered on demand | Silent, rugged, low-heat designs; better batteries; doctrine and training that use the devices |
| Consumer and sport | Hip-assist for hiking, commuting and elderly walking sells in the hundreds of thousands of units; retail channels expand | Exos treated like e-bikes: mass-market, regulated as mobility products; integration with fitness apps | Independent safety and performance testing; truthful specifications |

### 9.1 Technology directions

- **Soft and hybrid architectures** that weigh 1–3 kg and switch between passive and powered modes.
- **Learned control** (on-device machine learning) that adapts the assist profile to each user and terrain within minutes.
- **Better actuators**: quasi-direct-drive motors, variable-stiffness and clutch-spring elements, and artificial-muscle materials.
- **Neural interfaces**, from improved surface EMG to non-invasive and implanted brain–computer interfaces for people with complete paralysis.
- **Digital twins and biomechanical simulation** to design and certify devices before human trials.

### 9.2 Relevance to India

India has a large rehabilitation need and a defence requirement for load carriage in high-altitude terrain, but imported medical exoskeletons at US$80,000 or more are out of reach for most users. Indian industry and DRDO laboratories have started building local capability: the TASL–DRDO passive infantry exoskeleton, the Svaya–DRDO active demonstrator, and work by start-ups such as Newndra. [\[31\]](https://www.cbinsights.com/company/genelek-technologies) The Bureau of Indian Standards held a workshop on exoskeleton safety and use, [\[31\]](https://www.cbinsights.com/company/genelek-technologies) a first step toward a national framework.

The main opportunities are:

- Low-cost passive exoskeletons for soldiers, porters and logistics troops in Ladakh, Sikkim and Arunachal sectors.
- Affordable rehabilitation exoskeletons for district hospitals, built on Indian supply chains.
- Industrial exos for automotive, aerospace MRO and shipbuilding.
- Reliability and endurance testing of drive trains, bearings and gearboxes for exoskeleton actuators.

## 10. Conclusions

- Exoskeletons took 124 years to go from Yagn's 1890 spring patent to the first home-use clearance in 2014. The delay was caused by control, power and interface problems, not by a lack of mechanical strength.
- Commercial success came from narrowing the problem: medical devices for defined patient groups with a payer, and passive industrial devices for specific tasks.
- In 2026 the market is about US$0.6 billion, led in revenue by medical rehabilitation and in units by Chinese consumer hip-assist devices. Many companies are small, and failures and ownership changes are frequent.
- Military use is converging on light, task-specific load-carriage and logistics aids rather than powered armour.
- The next decade will favour soft, hybrid, AI-controlled devices with credible standards and evidence. India has a clear opportunity in low-cost defence and rehabilitation devices built on domestic supply chains.

## Acknowledgement

This article was researched and drafted with the assistance of Claude, a large language model (LLM) developed by Anthropic. The AI tool was used for literature search, summarising sources and drafting text. The author reviewed, edited and verified the content and takes full responsibility for it.

## References

All links accessed October 2026.

1. [Exoskeletons: History](https://encyclopedia.pub/entry/history/show/14861), Encyclopedia.pub.
2. [Industrial exoskeleton](https://bigenc.ru/c/promyshlennyi-ekzoskelet-d127ff) (in Russian), Great Russian Encyclopedia.
3. [Exosuits: Past, Present and Future](https://www.uab.edu/inquiro/issues/past-issues/volume-9/exosuits-past-present-and-future), Inquiro, University of Alabama at Birmingham, Vol. 9, 2015.
4. [To gain the extreme strength of arthropods, humans created their own exoskeleton](https://eu.36kr.com/en/p/3846942086462088), 36Kr, June 2026.
5. [DARPA Selects Contractors for Soldier Exoskeleton Program](https://web.stanford.edu/group/resna/SIG-11/archive/exoskeleton.htm), Defense Daily, 14 March 2001 (RESNA archive).
6. [The Rise of the Body Bots](https://spectrum.ieee.org/the-rise-of-the-body-bots), IEEE Spectrum.
7. [An Exoskeleton First: FDA Clears ReWalk](https://www.mddionline.com/regulatory-quality/an-exoskeleton-first-fda-clears-rewalk), MD+DI, 27 June 2014.
8. [First powered exoskeleton approved for general use](https://www.guinnessworldrecords.com/world-records/693750-first-powered-exoskeleton-approved-for-general-use), Guinness World Records.
9. [Powered Exoskeleton for Ambulation in Patients With Lower-Limb Disabilities, CAM 10304](https://www.southcarolinablues.com/web/public/brands/medicalpolicy/external/external-policies/powered-exoskeleton-for-ambulation-in-patients-with-lower-limb-disabilities), BlueCross BlueShield of South Carolina medical policy.
10. [ReWalk Robotics Lauds Medicare Allowable for Personal Exoskeletons](https://mobilitymgmt.com/rewalk-robotics-lauds-medicare-allowable-for-personal-exoskeletons/), Mobility Management, April 2024.
11. [Medicare Sets Reimbursement Rates for Personal Exoskeletons](https://exoskeletonreport.com/2024/04/medicare-sets-reimbursement-rates-for-personal-exoskeletons-a-milestone-for-accessibility/), Exoskeleton Report, April 2024.
12. [CMS defers final payment decision for personal exoskeletons](https://ir.rewalk.com/node/12141), Lifeward investor release, 2024.
13. W. G. Billotte, B. D. Lowe, D. R. Peterson, [ASTM F48 Formation and Standards for Industrial Exoskeletons and Exosuits](https://www.nist.gov/node/1557396), IISE Trans. Occup. Ergon. Hum. Factors, 7(3–4), 2019, doi:10.1080/24725838.2019.1579769.
14. [Standards Related to Exoskeletons](https://www.nist.gov/node/1566526), NIST.
15. [ASTM Approves First Standards for Exoskeletons](https://sn.astm.org/node/2460/printable/print), ASTM Standardization News.
16. [ASTM F48 Formation and Standards for Industrial Exoskeletons and Exosuits](https://stacks.cdc.gov/view/cdc/217664), NIOSH / CDC Stacks record.
17. [Wandercraft wins FDA clearance for exoskeleton for people with spinal cord injuries](https://www.massdevice.com/?p=101793), MassDevice.
18. [Wandercraft Receives FDA Clearance for Eve](https://www.wandercraft.eu/articles/wandercraft-receives-fda-clearance-for-eve-the-worlds-first-self-balancing-personal-exoskeleton-for-eligible-wheelchair-users-living-with-spinal-cord-injuries-at-any-level), Wandercraft, August 2026.
19. [Exoskeleton Report Newsletter 2026 Week 34](https://exoskeletonreport.com/?p=12375), Exoskeleton Report, August 2026.
20. [Exoskeleton Companies](https://www.marketsandmarkets.com/ResearchInsight/exoskeleton-market.asp), MarketsandMarkets, 2026.
21. [Ottobock reaches for growth with industrial exoskeletons](https://www.aol.com/news/focus-ottobock-reaches-growth-industrial-073000376.html), Reuters.
22. [SuitX company profile](https://www.cbinsights.com/investor/suitx), CB Insights.
23. [Hilti and Ottobock Bring Exoskeleton Solutions to the Construction Industry](https://electricalindustry.ca/changing-scenes/page/154/?start=1450), Electrical Industry News.
24. [Exoskeleton Market Research and Global Forecast Report 2025–2030](https://www.globenewswire.com/de/news-release/2025/06/12/3098454/28124/en/Exoskeleton-Market-Research-and-Global-Forecast-Report-2025-2030-Powered-Exoskeletons-Lead-Growth-with-Robust-Investment-Activities-Industrial-Adoption-Amplifies-Expansion.html), GlobeNewswire, June 2025.
25. [Is the US Military Developing Powered Exoskeletons for American Troops?](https://www.slashgear.com/1903335/military-us-developing-powered-exoskeletons), SlashGear.
26. [German Bionic company profile](https://www.cbinsights.com/company/german-bionic), CB Insights.
27. [Pentagon looks to exoskeletons to build super-soldiers](https://interaksyon.philstar.com/?p=139482), AFP via Interaksyon, November 2018.
28. [I Am Iron Man…?](https://www.defenseindustrydaily.com/i-am-iron-man-04877/), Defense Industry Daily.
29. [The Army wants to build a brand new exoskeleton](https://taskandpurpose.com/news/army-exoskeleton-futures-command/), Task & Purpose, September 2020.
30. [Exoskeletons for Indian soldiers](https://www.spsmai.com/experts-speak/?id=1523), SP's MAI.
31. [India Is Hitting the Gas Pedal on Exoskeleton Technology](https://www.cbinsights.com/company/genelek-technologies), B. Marinov, Forbes, 30 April 2025 (summary via CB Insights).
32. [Military Exoskeleton Market](https://straitsresearch.com/es/report/military-exoskeleton-market), Straits Research, May 2026.
33. [India's first indigenous quadruped robot and exoskeleton](https://vajiramandravi.com/current-affairs/indias-first-indigenous-quadruped-robot-and-exoskeleton/), Vajiram & Ravi current affairs.
34. [Hypershell secures US$50 million Series B+](https://equalocean.com/news/2026051821902-hypershell-secures-50-million-series-b-funding-co-led-ant-group-meituan/amp), EqualOcean, May 2026.
35. [Hypershell at IFA 2026](https://allmind.ai/news/08ad798451bddbcefcf01fa6d7b6b8f58348cc35f3de707ba4cd77bec3c37ef4), PR Newswire via Allmind, 2026.
36. [Black Friday 2025 Exoskeleton Deals](https://exoskeletonreport.com/?p=11176), Exoskeleton Report.
37. [2026 Exoskeleton News Week 10](https://exoskeletonreport.com/2026/03/2026-exoskeleton-news-week-10-mining-rescue-roboct-funding-new-jobs-and-more/), Exoskeleton Report, March 2026.
38. [IDC China Exoskeleton Robot Market Share 2025](https://eu.36kr.com/en/p/3997287673712516), 36Kr, August 2026.
39. [Exoskeleton News Archive, Week 25, 2026](https://exoskeletonreport.com/2026/06/exoskeleton-news-archive-jun-20th-2026-week-25-prime-day-style-sales-and-so-much-more-in-just-one-week/), Exoskeleton Report, June 2026.
40. [Hypershell introduces the new Hypershell X Series](https://www.aap.com.au/aapreleases/cision20260520ae63922/), PR Newswire via AAP, 20 May 2026.

**Further reading:** N. Yagn, [US Patent 420,179](https://patents.google.com/patent/US420179) (1890); [ASTM Committee F48](https://www.astm.org/get-involved/technical-committees/committee-f48); ISO 13482:2014, *Robots and robotic devices — Safety requirements for personal care robots*; [Exoskeleton Report catalogue](https://exoskeletonreport.com).
