
## 7. Current Problems

### 7.1 Demand is growing again

<p>For about a decade before 2020, electricity demand in advanced economies was nearly flat. That has ended. The IEA expects global power demand to grow by more than 3.5&nbsp;% a year on average for the rest of this decade [@iea_elec2026], and the 2026 mid-year update raised the near-term forecast to 3.6&nbsp;% in 2026 and 3.8&nbsp;% in 2027 [@iea_mid2026]. The drivers are broad: industry, air conditioning in hot and increasingly prosperous countries, electric vehicles, heat pumps and data centres. Demand growth is welcome, because electricity is replacing less efficient fuels, but it arrives faster than grids are being built, and much of it is concentrated in hot afternoons and evenings when grids are already stressed.</p>

### 7.2 Grids have become the bottleneck

<p>The IEA's first global stocktake of grids found at least 3,000&nbsp;GW of renewable projects waiting in connection queues, 1,500&nbsp;GW of them at an advanced stage, about five times the solar and wind capacity added worldwide in 2022 [@iea_grids2023]. In the United States, the queue peaked at nearly 2,600&nbsp;GW at the end of 2023 before reforms and withdrawals reduced it [@pp_queue], and still stood at 2,061&nbsp;GW at the end of 2025, with a median of more than five years from request to operation [@lbnl_q2026]. A wind or solar farm can be built in one to five years, while a major transmission line commonly takes much longer to plan, permit and build [@dte_grids]. Investment is rising, from about $315&nbsp;billion in 2015 to about $450&nbsp;billion in 2025 [@greentech_elec] and an estimated $550&nbsp;billion in 2026 [@iwei2026], but the IEA estimates that annual grid investment must rise by about half by 2030 from roughly $400&nbsp;billion to keep pace with demand [@iea_elec2026g].</p>

<div class="figrow one"><figure id="fig-{#f:invest}"><a class="zoom" href="img/power-grid-management-worldwide/fig6_investment_storage.svg" target="_blank" rel="noopener"><img src="img/power-grid-management-worldwide/fig6_investment_storage.svg" alt="Bar charts of global grid investment 2015 to 2026 and battery storage additions 2023 to 2026" loading="lazy" style="background:#fff;width:100%;max-width:820px"></a><figcaption><b>Figure {#f:invest}.</b> Left: global grid investment [@greentech_elec; @iwei2026]. Right: global energy-storage additions excluding pumped hydro, as reported by BloombergNEF; the 2024 value is derived from the reported 48&nbsp;% growth to 112&nbsp;GW in 2025, and 2026 is BNEF's forecast [@bnef_2026; @ess_bnef25].<span class="credit">Chart by the author</span></figcaption></figure></div>

### 7.3 Equipment and supply chains

<p>Even when a project is approved, the equipment may not be available. An IEA survey found that it now takes two to three years to procure cables and up to four years to secure large power transformers, that average lead times for both have almost doubled since 2021, and that waiting times for HVDC cables exceed five years; prices have risen substantially as well [@iea_supply]. Permitting remains the main cause of delay in advanced economies, but supply is now a constraint in its own right. Transformers, switchgear and cables are built in a limited number of factories with specialised skills, and capacity cannot be expanded overnight.</p>

### 7.4 Falling inertia and system strength

<p>Wind turbines, solar inverters and batteries are connected through power electronics. In their common "grid-following" form, they measure the grid voltage and inject current in step with it; they contribute no stored rotating energy and little fault current. As they displace synchronous machines during sunny or windy hours, system inertia falls, RoCoF after a loss rises, and the short-circuit strength that protection relays and inverter controls depend on weakens.</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#inertia} &mdash; Inertia as the synchronous share falls</p>
<p>Take the 250&nbsp;GW system of Example&nbsp;{#rocof}, with synchronous machines of <i>H</i> = 5&nbsp;s and grid-following converters contributing none (assumed).</p>
<p>With 80&nbsp;% of load served by synchronous machines, effective <i>H</i> = 4.0&nbsp;s and the RoCoF for a 4&nbsp;GW loss is 0.10&nbsp;Hz/s. At 50&nbsp;%, <i>H</i> = 2.5&nbsp;s and RoCoF = 0.16&nbsp;Hz/s. At 30&nbsp;%, <i>H</i> = 1.5&nbsp;s and RoCoF = <span class="ans">0.27&nbsp;Hz/s</span>, enough to trip older RoCoF-based protection and to push the nadir below the first stage of load shedding unless faster response is available (Figure&nbsp;{#f:inertia}).</p></div>

<div class="figrow one"><figure id="fig-{#f:inertia}"><a class="zoom" href="img/power-grid-management-worldwide/fig3_inertia_rocof.svg" target="_blank" rel="noopener"><img src="img/power-grid-management-worldwide/fig3_inertia_rocof.svg" alt="Bars of initial RoCoF for a 4 GW loss at 80, 50 and 30 percent synchronous share" loading="lazy" style="background:#fff;width:100%;max-width:640px"></a><figcaption><b>Figure {#f:inertia}.</b> Initial rate of change of frequency for a 4&nbsp;GW loss in a 250&nbsp;GW system as the share of load served by synchronous machines falls (Example&nbsp;{#inertia}).<span class="credit">Chart by the author</span></figcaption></figure></div>

<p>Low system strength brings a further, less familiar problem: control interactions. Inverters, HVDC converters and their control loops can interact with each other and with series-compensated lines, producing oscillations at frequencies from a few hertz to several hundred hertz that conventional models and protection do not capture. Such sub-synchronous and control-interaction oscillations have been observed in several renewable-rich regions around the world. Detecting them requires high-resolution measurements, such as PMUs and disturbance recorders, and studying them requires detailed electromagnetic-transient models of each plant, which operators increasingly demand as a condition of connection.</p>

### 7.5 Variability, ramps and the duck curve

<p>Solar output rises in the morning, peaks at midday and disappears in the evening just as household demand rises. The demand that conventional plants must meet, the "net demand", therefore sags at midday and climbs steeply in the evening, the shape known as the duck curve (Figure&nbsp;{#f:duck}). India's operator has reported an evening ramp of nearly 60&nbsp;GW [@cw_curtail]. At midday the opposite problem appears: too much generation, high frequency and curtailment, because coal units cannot reduce output below a technical minimum without risk.</p>

<div class="figrow one"><figure id="fig-{#f:duck}"><a class="zoom" href="img/power-grid-management-worldwide/fig9_duck_curve.svg" target="_blank" rel="noopener"><img src="img/power-grid-management-worldwide/fig9_duck_curve.svg" alt="Daily demand and net demand curves showing a midday dip and a steep evening ramp" loading="lazy" style="background:#fff;width:100%;max-width:740px"></a><figcaption><b>Figure {#f:duck}.</b> An illustrative daily profile for a large solar-rich system, shaped to India's reported conditions (daytime peak in summer, evening ramp of about 60&nbsp;GW). Demand and solar profiles are synthetic and for illustration only.<span class="credit">Chart by the author</span></figcaption></figure></div>

<div class="worked"><p class="wt">WORKED EXAMPLE {#ramp} &mdash; How steep is a 60 GW evening ramp?</p>
<p>If net demand rises 60&nbsp;GW over about three hours, the average ramp is 20&nbsp;GW/h, or <span class="ans">333&nbsp;MW per minute</span>, sustained for three hours, with steeper stretches within it.</p>
<p>A coal fleet of 180&nbsp;GW online that can ramp at 1&nbsp;% of capacity per minute (assumed) could in principle deliver 1,800&nbsp;MW per minute. The binding constraint is therefore not ramp rate but headroom: the fleet must be running, below its maximum, at the moment solar fades. Every gigawatt held back at midday for this purpose displaces cheaper solar, which is why storage that charges at noon and discharges at dusk is so valuable.</p></div>

<div class="worked"><p class="wt">WORKED EXAMPLE {#curtail} &mdash; The cost of curtailment</p>
<p>On 25 May 2025, India's operator curtailed nearly 10&nbsp;GW of solar through emergency down-regulation while backing the thermal fleet down to about 58&nbsp;% [@cw_curtail]. If 10&nbsp;GW is curtailed for three hours, <span class="ans">30&nbsp;GWh</span> of zero-fuel-cost energy is lost, enough for about six million households at 5&nbsp;kWh per day (assumed). Storage, flexible demand and lower thermal minimum loads all turn this waste into supply.</p></div>

### 7.6 Voltage control and visibility of distributed resources

<p>Iberia showed that voltage control can fail quietly. Large rotating generators regulate voltage automatically; inverter-based plants can do so too, often better, but only if their grid codes require it, their settings are correct and the operator can see and dispatch them. Rooftop solar and small batteries on distribution networks add another layer: they are numerous, mostly invisible to the transmission operator, and they respond to disturbances according to settings in millions of devices. The Iberian report and AEMO's work both emphasise visibility and control of distributed resources as a reliability priority [@pvmag_iberia; @pvtech_aemo42].</p>

### 7.7 Extreme weather and resilience

<p>Uri in Texas, heatwaves in India and wildfires in California and Australia show that weather beyond historical design ranges is now a planning case, not a remote possibility. Heat raises demand and lowers the capacity of lines, transformers and thermal plants at the same time; cold freezes fuel supplies; storms destroy towers. Reliability planning based on average or historical weather underestimates these common-mode risks.</p>

### 7.8 Distribution: losses and finances

<p>In many developing countries the weakest link is not the transmission grid but the distribution utility: high technical and commercial losses, tariffs below cost, delayed subsidy payments and under-investment in local networks. India's case is described in Section&nbsp;9.7. Without financially viable distribution companies, the money to pay for generation, storage and transmission does not flow.</p>

### 7.9 Cyber security and digital risk

<p>Grid control has become digital, networked and, in places, cloud-connected. That brings better visibility but also a larger attack surface, as attacks on distribution networks in Ukraine in 2015 and 2016 demonstrated. Cyber security now ranks alongside physical security in reliability standards.</p>

### 7.10 Large new loads

<p>Grids were designed with loads that are many, small and diverse. Large data centres, crypto-mining facilities and electrolysers break that assumption: a single campus can draw hundreds of megawatts, and its power electronics may disconnect it from the grid within milliseconds of a voltage dip. In July 2024 a 230&nbsp;kV line fault in northern Virginia caused about 1,500&nbsp;MW of data-centre load, spread over 60 load points and 25 substations, to switch simultaneously to backup supplies; operators had not anticipated it, and system voltage rose beyond normal levels [@nerc_load; @wc_nerc]. Similar events followed in February 2025 (about 1,800&nbsp;MW) and on 22 July 2026, when nearly 4,000&nbsp;MW of data-centre load in Virginia tripped in two waves, the largest such event in PJM's history [@pjm_load]. ERCOT has recorded 25 load-loss events of 100 to 400&nbsp;MW from crypto-mining facilities [@wc_nerc]. Grid codes are now being extended to require large loads to ride through disturbances, as generators have long been required to do.</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#loadloss} &mdash; When 1.5 GW of load vanishes</p>
<p>Consider a 60&nbsp;Hz interconnection with 600&nbsp;GW online and <i>H</i> = 4&nbsp;s (assumed). A sudden 1.5&nbsp;GW load loss gives, by ({#e:rocof}), an initial RoCoF of 1.5 &times; 60 / (2 &times; 4 &times; 600) = <span class="ans">19&nbsp;mHz/s</span>, upwards. With half the fleet on 5&nbsp;% droop and 1&nbsp;% load damping, &beta; &asymp; 110&nbsp;GW/Hz and the frequency settles only about <span class="ans">14&nbsp;mHz</span> high.</p>
<p>The frequency effect in a large interconnection is small, which is why the 2024 event did not cause concern on frequency [@ns_nerc]. The real problem is local: the sudden loss of 1.5 to 4&nbsp;GW in a small area raises voltage sharply, as Iberia showed is dangerous, and the load then returns as abruptly when the backup systems hand back. Ride-through requirements and models of large-load behaviour are the remedy.</p></div>

<p><span class="kw">Data and transparency.</span> Many of the problems above are made worse by poor data: queues full of speculative projects, unknown inverter settings, unmetered distribution feeders and load forecasts that miss heatwaves. Publishing operational data, as Grid-India, AEMO and European operators increasingly do, allows researchers, developers and regulators to see where the system is stressed and to propose solutions. Good data is a public good for grid reliability.</p>

### 7.11 Affordability

<p>Every remedy in this paper costs money, and in the end consumers pay. Network charges are a growing share of electricity bills in many countries because grids are being expanded and renewed at the same time, while equipment prices have risen [@iea_supply]. In India, cross-subsidies from industry to agriculture and households, and delays in state subsidy payments, have historically weakened distribution companies and raised industrial tariffs. Affordable grids therefore depend on choosing the cheapest adequate solution, often a grid-enhancing technology, storage or demand response rather than a new line, and on spreading costs fairly between those who cause them and those who benefit.</p>

### 7.12 Market signals and investment

<p>Markets designed for fuel-burning plants pay mainly for energy. As more energy comes from sources with near-zero running cost, prices fall at midday and spike at scarcity, and revenues for the flexibility, inertia, voltage support and firm capacity that the system needs may not be enough to finance them. Many countries are adding capacity mechanisms, ancillary-service markets and storage obligations. Table&nbsp;{#t:problems} summarises the problems of this section.</p>

<div class="tcap"><b>Table {#t:problems}.</b> Current Problems in Grid Management</div>

| Problem | Symptom | Where it is most acute | Main remedies |
|---|---|---|---|
| Demand growth | Rising peaks, tight reserve margins | India, China, US (data centres), Middle East | Generation, storage, efficiency, demand response |
| Connection queues | Years of delay for new plants | US, Europe, Australia | Transmission build-out; connection reform; GETs |
| Supply chains | Transformer and cable lead times doubled | Worldwide | Standardised designs; long-term orders; local manufacturing |
| Low inertia and system strength | High RoCoF; weak fault levels | Australia, Ireland, GB, Iberia, increasingly India | Grid-forming inverters; synchronous condensers |
| Ramps and minimum load | Evening ramps; midday high frequency; curtailment | India, California, Australia | Storage; flexible thermal; demand shifting |
| Voltage control | Over- and under-voltage events | Iberia; long lines in India | Reactive-power procurement; STATCOMs; inverter voltage control |
| Extreme weather | Common-mode outages | Texas, Indian heatwaves, Australia | Weatherisation; resilience planning; diversity |
| Distribution weakness | Losses; unpaid bills | India, Africa, parts of Latin America | Metering; tariff reform; network investment |
| Cyber risk | Attacks on control systems | Worldwide | Segmentation; monitoring; standards |

## 8. Tools Available Now

### 8.1 Grid-enhancing technologies

<p>Grid-enhancing technologies (GETs) increase the capacity of existing lines quickly and cheaply: dynamic line rating, advanced high-capacity conductors for reconductoring, power-flow controllers and topology optimisation. The IEA notes that most of them can be deployed with relatively short lead times, either replacing conventional investment or bridging the years until new lines are built [@iea_elec2026g].</p>

<p>Dynamic line rating is a good example of instrumentation solving a capacity problem. A line's limit is set by the temperature its conductor may reach before sagging too close to the ground. Static ratings assume conservative weather: high ambient temperature, full sun and a low wind speed. Real wind is usually stronger, and wind cools the conductor powerfully.</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#dlr} &mdash; Ampacity against wind speed</p>
<p>Take a 28&nbsp;mm ACSR conductor (similar to "Drake", AC resistance 8.7 &times; 10<sup>&minus;5</sup>&nbsp;&Omega;/m at 75&nbsp;&deg;C), ambient 40&nbsp;&deg;C, full sun, emissivity and absorptivity 0.5 (all assumed). A steady-state heat balance, <i>I</i><sup>2</sup><i>R</i> + solar gain = convective + radiative loss, with a standard forced-convection correlation gives:</p>
<p>Wind 0.6&nbsp;m/s (a typical static-rating assumption): <span class="ans">784&nbsp;A</span>. 1&nbsp;m/s: 906&nbsp;A. 2&nbsp;m/s: 1,106&nbsp;A (+41&nbsp;%). 4&nbsp;m/s: 1,353&nbsp;A (+73&nbsp;%).</p>
<p>Measuring conductor temperature, sag or local weather on critical spans lets the operator use this hidden capacity on most days, and fall back to the static rating when conditions are unfavourable (Figure&nbsp;{#f:dlr}).</p></div>

<div class="figrow one"><figure id="fig-{#f:dlr}"><a class="zoom" href="img/power-grid-management-worldwide/fig11_dlr.svg" target="_blank" rel="noopener"><img src="img/power-grid-management-worldwide/fig11_dlr.svg" alt="Conductor ampacity against perpendicular wind speed" loading="lazy" style="background:#fff;width:100%;max-width:640px"></a><figcaption><b>Figure {#f:dlr}.</b> Simplified ampacity of the conductor of Example&nbsp;{#dlr} against perpendicular wind speed. Real dynamic-rating systems follow IEEE&nbsp;738 or CIGRE methods and use measured conditions.<span class="credit">Chart by the author</span></figcaption></figure></div>

### 8.2 Battery storage

<p>Batteries have become the fastest-growing grid resource. BloombergNEF reports 112&nbsp;GW and 307&nbsp;GWh of energy storage added worldwide in 2025, 48&nbsp;% more than in 2024, with annual additions rising from 10&nbsp;GW to over 100&nbsp;GW in only four years [@bnef_2026], and forecasts 158&nbsp;GW in 2026 [@ess_bnef26]. China installed 61.1&nbsp;GW in 2025 and the United States about 18&nbsp;GW [@ess_bnef26]. The IEA attributes the growth to a fall in battery costs of more than 90&nbsp;% between 2010 and 2025 [@pvusa_iea]. Batteries shift solar energy into the evening, provide frequency response within a fraction of a second, relieve congested lines and defer network upgrades.</p>

### 8.3 Grid-forming inverters and synchronous condensers

<p>A grid-forming inverter sets its own voltage waveform, like a synchronous generator, rather than following the grid's. It can therefore provide synthetic inertia, system strength and voltage control, and can operate in a weak grid or even start one. Australia leads in deployment, and Europe is moving to require the capability for new storage [@ess_gfm; @entsoe_gfm]. Where fault current and inertia from real rotating mass are needed, synchronous condensers, large motors spinning without a prime mover, are being installed, sometimes by converting retired generators.</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#gfm} &mdash; Synthetic inertia from a grid-forming battery</p>
<p>A 1,000&nbsp;MW grid-forming battery fleet configured to emulate an inertia constant of 4&nbsp;s on its rating (assumed) provides 1,000 &times; 4 = <span class="ans">4,000&nbsp;MW&middot;s</span> of equivalent stored energy, the same as about 1&nbsp;GW of synchronous plant with <i>H</i> = 4&nbsp;s. Because the battery's power can change within milliseconds, it can also deliver fast frequency response far quicker than any governor, so in practice its stabilising value exceeds its nominal inertia. The constraint is that the inverter must have headroom in current and energy to respond, so it cannot be run flat out.</p></div>

<div class="worked"><p class="wt">WORKED EXAMPLE {#techmin} &mdash; Lowering the technical minimum of coal units</p>
<p>Suppose 200&nbsp;GW of coal capacity must stay synchronised through the day to be available for the evening ramp (assumed). At a technical minimum of 55&nbsp;% it cannot go below 110&nbsp;GW; at 40&nbsp;% it can go down to 80&nbsp;GW. The difference, <span class="ans">30&nbsp;GW</span>, is room for midday solar that would otherwise be curtailed or would push frequency up. Achieving it needs boiler and mill modifications, operator training and, crucially, compensation for the higher heat rate and wear at low load, which is why commercial and regulatory reform must accompany the technical work [@cw_curtail].</p></div>

### 8.4 Flexible AC transmission and reactive-power devices

<p>Static var compensators, STATCOMs and series compensation (collectively FACTS devices) control voltage and power flow on AC networks within cycles. They raise the stable transfer limit of long lines, damp oscillations and provide the dynamic voltage support whose absence was felt in Iberia.</p>

### 8.5 HVDC

<p>High-voltage direct current links have no reactive-power or synchronous-stability limit, so they can carry very large power over very long distances or under the sea, and their converters control the flow precisely. Their converter stations are expensive, so AC is cheaper over short distances and DC over long ones.</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#hvdc} &mdash; Moving 3 GW over 1,500 km</p>
<p>HVDC: a &plusmn;800&nbsp;kV bipole carries <i>I</i> = 3,000/(2 &times; 0.8) = 1,875&nbsp;A per pole. With 0.0075&nbsp;&Omega;/km per pole (assumed bundle), line loss = 2<i>I</i><sup>2</sup><i>R</i> = 79&nbsp;MW; adding 0.7&nbsp;% at each converter station (assumed) gives a total of <span class="ans">4.0&nbsp;%</span>.</p>
<p>AC: two 765&nbsp;kV circuits each carry 1,155&nbsp;A; with 0.0125&nbsp;&Omega;/km per phase (assumed), loss = <span class="ans">5.0&nbsp;%</span>, before the series compensation and intermediate substations that a 1,500&nbsp;km AC corridor would need for stability.</p>
<p>The loss difference is modest; the decisive advantages of DC at this distance are controllability, fewer lines and freedom from AC stability limits. That is why China's west-to-east corridors and India's long inter-regional links use HVDC (Figure&nbsp;{#f:losses}).</p></div>

<div class="figrow one"><figure id="fig-{#f:losses}"><a class="zoom" href="img/power-grid-management-worldwide/fig5_losses.svg" target="_blank" rel="noopener"><img src="img/power-grid-management-worldwide/fig5_losses.svg" alt="Bar charts of transmission losses at three AC voltages and for AC against HVDC over 1500 km" loading="lazy" style="background:#fff;width:100%;max-width:820px"></a><figcaption><b>Figure {#f:losses}.</b> Left: losses for 500&nbsp;MW over 300&nbsp;km at three voltages (Example&nbsp;{#volt}). Right: 3&nbsp;GW over 1,500&nbsp;km by 765&nbsp;kV AC and by &plusmn;800&nbsp;kV HVDC including converter losses (Example&nbsp;{#hvdc}). All conductor values assumed.<span class="credit">Chart by the author</span></figcaption></figure></div>

<p><span class="kw">Protection for inverter-rich grids.</span> Conventional distance and overcurrent protection relies on the large fault currents that synchronous machines supply, typically several times rated current. Inverters limit their fault current to little more than their rating, so faults in areas dominated by inverter-based resources may be harder to detect and locate. Protection engineers are responding with differential and communication-assisted schemes, adaptive settings that change with the generation mix, and grid-forming inverters designed to supply controlled fault current. Every new class of resource connected to the grid needs its protection behaviour modelled and tested, the lesson of South Australia in 2016 and Iberia in 2025.</p>

### 8.6 Demand response and flexible load

<p>Many loads can shift in time without loss of service: water pumping, cold storage, electric-vehicle charging, industrial processes, heating and cooling with thermal storage, and, increasingly, data-centre computing. Time-of-day tariffs, direct load control and aggregators that combine many small loads into a "virtual power plant" turn this flexibility into a grid resource. Demand response is usually the cheapest flexibility available, but it needs metering, communication and tariffs that reward it.</p>

### 8.7 Microgrids and islanding

<p>Not every part of the grid needs to fall when the bulk system does. Microgrids, local networks with their own generation and storage that can disconnect from the main grid and keep running, protect hospitals, military bases, data centres, campuses and remote communities. Utilities are also planning "intentional islanding", in which parts of the distribution network continue to operate on local solar and batteries during a wide-area outage. Islanding requires grid-forming sources, protection that works in both connected and islanded modes, and careful resynchronisation, but it turns distributed resources from a source of risk into a source of resilience.</p>

### 8.8 Wide-area monitoring and digital operations

<p>Phasor measurement units, sampling voltage and current many times a second with precise GPS time stamps, let operators see oscillations and stress across the whole network in real time. Combined with better weather forecasts, machine-learning forecasts of load and renewable output, and network models that are kept continuously up to date (digital twins), they move control rooms from reacting to anticipating. Table&nbsp;{#t:tools} summarises the tools.</p>

<div class="tcap"><b>Table {#t:tools}.</b> Tools for Today's Grid Problems</div>

| Tool | What it does | Lead time | Addresses |
|---|---|---|---|
| Dynamic line rating | Uses real conductor conditions to raise ratings | Months | Congestion; connection delays |
| Reconductoring | Replaces conductors with high-capacity types on existing towers | 1&ndash;3 years | Congestion; right-of-way limits |
| Battery storage | Shifts energy; fast frequency response; congestion relief | 1&ndash;2 years | Ramps; curtailment; reserves |
| Grid-forming inverters | Synthetic inertia, voltage and system strength | With new plant | Low inertia; weak grids |
| Synchronous condensers | Real inertia and fault current | 2&ndash;3 years | System strength |
| STATCOM, SVC, series compensation | Dynamic voltage and flow control | 2&ndash;3 years | Voltage control; transfer limits |
| HVDC | Long-distance, controllable transfer | 5&ndash;8 years | Bulk transfer; interconnection |
| Demand response, VPPs | Shifts and curtails load | Months | Peaks; ramps; reserves |
| PMUs, forecasting, digital twins | Visibility and prediction | Months to years | Situational awareness |
