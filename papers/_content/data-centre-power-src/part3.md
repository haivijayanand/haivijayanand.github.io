
## 10. India and Chennai

### 10.1 Growth

<p>India's data-centre industry is small by world standards but among the fastest-growing. Live capacity was about 296&nbsp;MW in 2016 [@bt_kf]. The Ministry of Electronics and Information Technology reports growth from 375&nbsp;MW in 2020 to more than 1,500&nbsp;MW in 2025 [@crn2026]; CBRE puts the end-2025 figure at about 1,700&nbsp;MW after a record 440&nbsp;MW was added in that year [@bt_cbre]. By mid-2026 the seven main markets had 1,789&nbsp;MW in operation, 509&nbsp;MW under construction and 3,351&nbsp;MW at the planning stage, with about 3,860&nbsp;MW of new capacity expected by 2030 [@ibef2026]. Savills expects total capacity to exceed 4&nbsp;GW by 2030 [@tribune2026]. These capacities are IT power ratings; the electricity actually drawn depends on how fully the halls are loaded and on their PUE. S&amp;P Global expects India's data-centre electricity demand to grow nearly fivefold to about 57&nbsp;TWh by 2030, rising from 0.8&nbsp;% of national demand in 2024 to about 2.6&nbsp;%, and the Ministry of Power has estimated that data-centre demand could reach 13.6&nbsp;GW by 2031&ndash;32 [@aim2026].</p>

<div class="figrow one"><figure id="fig-9"><a class="zoom" href="img/data-centre-power-demand-efficiency/fig9_india.svg" target="_blank" rel="noopener"><img src="img/data-centre-power-demand-efficiency/fig9_india.svg" alt="India data-centre capacity growth from 2016 to 2030 and capacity by city in 2025" loading="lazy" style="background:#fff;width:100%;max-width:820px"></a><figcaption><b>Figure 9.</b> Left: India's operational data-centre IT capacity, 2016 to 2026, and the projection for 2030 [@bt_kf; @crn2026; @ibef2026; @tribune2026]. Right: capacity by city in 2025 as reported by the Ministry of Electronics and IT [@crn2026]. Sources differ in definitions, so city figures from other reports vary.<span class="credit">Chart by the author</span></figcaption></figure></div>

### 10.2 Chennai: the second hub

<p>Mumbai holds about half of India's capacity, with about 790&nbsp;MW in 2025; Chennai is second with about 305&nbsp;MW [@crn2026], and Mumbai and Chennai together account for about 70&nbsp;% of the market's annual absorption [@tribune2026]. Chennai's advantage is connectivity: Tamil Nadu hosts more than 30&nbsp;% of India's submarine cable landings [@hans2021]. Its constraints are water and, increasingly, power. Chennai has a long history of water scarcity, and local reporting has questioned whether the city can afford the water and power demands of a data-centre boom [@dte_chennai]. In 2026 the state's industries minister said that Tamil Nadu would not allocate scarce urban land, water and power to large conventional data centres, and that the state was "happy to say no to water-guzzling data centres" [@dtnext2026]. The state's new Sustainable Data Centre Policy 2026&ndash;2031 emphasises renewable energy, efficient electricity use, reimbursement of wheeling charges and resource mapping [@commtoday2026]. Nationally, India still has no data-centre policy with uniform efficiency and water benchmarks [@mongabay2026]. Power is also the largest operating cost: about 55 to 60&nbsp;% of a typical Indian data centre's operating expenditure [@gri2026]. Efficiency is therefore both a public-interest issue and a direct business case.</p>

### 10.3 Engineering for a hot, humid, water-stressed coast

<p>The analysis of Sections&nbsp;4 to 9 points to a distinct set of choices for Chennai and similar coastal cities (Table&nbsp;{#t:india}). The common thread is to move heat out of the building at as high a temperature as possible, so that it can be rejected without compressors or evaporated water, and to align flexible load with the hours when the state's renewable generation is plentiful.</p>

<div class="tcap"><b>Table {#t:india}.</b> Efficiency Choices for Data Centres in Chennai and Similar Climates</div>

| Local condition | Consequence | Preferred engineering choice |
|---|---|---|
| High dry-bulb and wet-bulb temperatures all year | Few hours of air-side free cooling at conventional temperatures | Warm-water liquid cooling (W32&ndash;W45) with dry coolers; chilled water at 15&ndash;20 &deg;C for remaining air loads |
| Urban water stress | Evaporative cooling competes with drinking water | Closed-loop cooling; any evaporative trim on treated sewage water; WUE caps |
| Large solar and wind share in Tamil Nadu; evening peak | Midday surplus, evening shortage | Shift training and batch work to solar hours; batteries to cover the evening peak |
| Power is 55&ndash;60 % of operating cost | Every kWh saved is a direct saving | Condition monitoring and continuous performance tracking of the cooling plant |
| No district heating | Waste heat has no ready buyer | Adsorption cooling; co-location with industrial heat users in data-centre parks |
| Coastal salt air | Corrosion of outdoor coils and electronics | Coated coils; filtered or indirect air paths; liquid loops |

<div class="worked"><p class="wt">WORKED EXAMPLE {#india} &mdash; India's fleet in 2030</p>
<p>India's projected data-centre demand in 2030 is about 57&nbsp;TWh [@aim2026], an average load of 57,000/8,760 = 6.5&nbsp;GW. No national average PUE is published; assume 1.6 for illustration.</p>
<p>Lifting the fleet average to 1.3 saves, by (3), 1 &minus; 1.3/1.6 = 18.75&nbsp;% = <span class="ans">10.7&nbsp;TWh a year, an average of 1.22&nbsp;GW</span>. Supplied by coal at an 85&nbsp;% plant load factor, that is the output of about <span class="ans">1.4&nbsp;GW of coal capacity</span>. A more modest improvement to 1.4 saves 7.1&nbsp;TWh, equivalent to about 1&nbsp;GW of coal capacity.</p></div>

### 10.4 Chennai and the Tamil Nadu grid

<p>Tamil Nadu's grid set a record peak demand of 21,724&nbsp;MW on 14 July 2026, driven by heat and cooling demand [@dtnext_peak]. The state is also one of India's renewable leaders: about 9.6&nbsp;GW of solar and 12.3&nbsp;GW of wind capacity, with wind and solar together meeting close to 40&nbsp;% of daily demand on windy monsoon days and instantaneous solar output reaching about 7.9&nbsp;GW in April 2026 [@statesman2026; @dtnext_wind; @dtnext_solar]. The data-centre cluster around Chennai therefore sits on a grid that is short of capacity in the evening, rich in solar power at midday and rich in wind power in the monsoon months.</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#chennai} &mdash; The Chennai cluster against the state peak</p>
<p>Chennai's 305&nbsp;MW of IT capacity (2025), at an assumed 80&nbsp;% average loading and PUE 1.6, draws about 305 &times; 0.8 &times; 1.6 = <span class="ans">390&nbsp;MW, about 1.8&nbsp;% of the state's record peak</span>.</p>
<p>If the cluster grows to about 900&nbsp;MW of IT capacity (roughly tripling, in line with national projections), the same assumptions give 1,152&nbsp;MW, <span class="ans">about 5.3&nbsp;%</span> of today's peak. A fleet PUE of 1.3 instead of 1.6 would remove 900 &times; 0.8 &times; 0.3 = <span class="ans">216&nbsp;MW</span> from it, at every hour including the evening peak. If a further 15&nbsp;% of the load (about 170&nbsp;MW) were deferrable training or batch work moved into solar hours, the cluster's contribution to the evening peak would fall by roughly a third in total.</p></div>

### 10.5 What India can do

<p>Five measures would make a large difference at low cost. First, require metering and annual public reporting of PUE, WUE and renewable share for every data centre above a threshold size, as the European Union now requires of data centres of 500&nbsp;kW and above [@eu_eed]. Second, set efficiency and water limits for new facilities that vary with local water stress, so that Chennai and Bengaluru face stricter water limits than coastal sites with seawater or treated-sewage options. Third, bring large data centres under a mandatory energy-audit and target regime, similar to the Perform, Achieve and Trade scheme for energy-intensive industries. Fourth, offer flexible-connection agreements and time-of-day tariffs that reward shifting load into solar hours. Fifth, plan data-centre parks next to heat users and renewable generation, so that waste heat and wheeled green power are designed in rather than added later.</p>

## 11. Instrumentation: You Cannot Manage What You Do Not Measure

<p>Every lever in this paper depends on measurement. A surprising number of data centres know their total electricity bill and the load on each UPS, but not the power drawn by each chiller, pump and cooling tower, the flow and temperature difference in each chilled-water loop, or the utilisation of their servers. Without these, the operator cannot tell which machine is wasting energy, cannot verify that a retrofit worked, and cannot detect the slow drift described in Section&nbsp;6.7. Building the measurement system is an instrumentation and data-engineering task of the kind familiar from test facilities and process plants.</p>

### 11.1 A metering hierarchy

<p>Electrical metering should follow the power path of Figure&nbsp;1: the utility incomer; each medium-voltage feeder; the input and output of each UPS; each PDU or busway; and, through the server management controllers, each rack and server. ISO/IEC 30134-2 recognises PUE measured at different points along this path, from the UPS output to the IT equipment input, and the closer to the IT equipment, the more accurate the result [@iso30134]. On the mechanical side, each chiller, pump set, cooling-tower cell and air handler needs its own power meter, and each chilled-water and condenser-water loop needs flow meters and paired supply and return temperature sensors, so that the cooling actually delivered can be computed. Make-up and blow-down water meters on the cooling towers give WUE. Finally, temperature sensors at the inlets of a sample of racks show whether air management is working.</p>

<p>The thermal power carried by a water loop follows from the mass flow rate <i>&#7745;</i>, the specific heat <i>c</i><sub>p</sub> and the temperature difference &Delta;<i>T</i>:</p>

<p class="eqn"><i>Q</i> = <i>&#7745;</i> <i>c</i><sub>p</sub> &Delta;<i>T</i> &nbsp;&nbsp;&nbsp;(9)</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#meas} &mdash; Measuring a chiller in service, and the cost of a low &Delta;T</p>
<p>A chilled-water loop carries 120&nbsp;kg/s (about 120&nbsp;L/s) with supply at 12&nbsp;&deg;C and return at 18&nbsp;&deg;C. By (9), <i>Q</i> = 120 &times; 4.186 &times; 6 = 3,014&nbsp;kW of cooling. The chiller's meter reads 600&nbsp;kW, so its in-service COP is 3,014/600 = <span class="ans">5.0, or 0.70&nbsp;kW per tonne of refrigeration</span> (1&nbsp;TR = 3.517&nbsp;kW). Trending this number against load and condenser-water temperature reveals fouling or refrigerant problems long before an alarm.</p>
<p>If poor valve control or bypassing lets the return temperature fall so that &Delta;<i>T</i> drops from 6 to 4&nbsp;K at the same load, the flow must rise by 6/4 = 1.5 times. By (5), pump power rises by up to 1.5<sup>3</sup> = <span class="ans">3.4 times</span> (2.8 times with 30&nbsp;% static head), and more chillers may have to run at poor part-load efficiency. This "low &Delta;T syndrome" is invisible without flow and temperature measurement.</p></div>

### 11.2 Performance indices worth trending

<p>Raw readings become useful when converted into performance indices that can be compared with the design value and tracked over time. Table&nbsp;{#t:indices} lists the indices that, in the author's experience of monitoring rotating machinery and test rigs, give the earliest warning of lost efficiency.</p>

<div class="tcap"><b>Table {#t:indices}.</b> Performance Indices for Continuous Monitoring</div>

| Index | Computed from | What a worsening trend means |
|---|---|---|
| Chiller kW/TR (or COP) against load and condenser temperature | Chiller power; loop flow and &Delta;T | Fouling, refrigerant loss, control faults |
| Condenser and evaporator approach temperatures | Refrigerant and water temperatures | Tube fouling; low charge |
| Cooling-tower approach (leaving water minus wet-bulb) | Water temperature; ambient wet-bulb | Fill or nozzle fouling; fan or airflow fault |
| Loop &Delta;T at the plant | Supply and return temperatures | Bypassing, valve faults, over-pumping |
| Pump specific energy (kWh per m³ per metre of head) | Pump power, flow, differential pressure | Impeller wear; operation away from best-efficiency point |
| Fan power per unit airflow | Fan power; airflow or speed | Filter loading; blade or belt problems |
| Rack inlet temperature spread | Inlet sensors | Recirculation; missing blanking panels |
| UPS efficiency | UPS input and output power | Light loading; wrong operating mode |
| Server and accelerator utilisation | Management controllers; schedulers | Idle or comatose equipment |
| Energy per unit of work | Site energy; service metrics | The overall result of all of the above |
| Vibration levels and spectra of critical machines | Accelerometers | Unbalance, misalignment, bearing and gear wear (Table 4) |

### 11.3 Sampling, data quality and closure

<p>Electrical and thermal quantities change slowly and are well served by one-minute averages. Vibration is different: bearing and gear-mesh frequencies need short records sampled at several kilohertz or more, taken at regular intervals and reduced to spectra and condition indicators before storage, so that years of trend fit in a modest database. Two disciplines keep the data trustworthy. The first is calibration and periodic cross-checking of flow meters and temperature sensors, since a 0.3&nbsp;K error in a 6&nbsp;K &Delta;T is a 5&nbsp;% error in measured cooling. The second is energy-balance closure: the sum of the sub-meters should match the incomer to within a few per cent, and the heat rejected by the towers should match the electricity consumed plus any heat exported. When the balance does not close, a meter is wrong, and decisions based on it will be wrong too.</p>

## 12. A Retrofit Road Map for Existing Sites

### 12.1 A worked site case: a 4 MW colocation hall in Chennai

<p>To show how the measures combine on one site, consider an air-cooled colocation hall in Chennai with an average IT load of 4,000&nbsp;kW and a PUE of 1.75, typical of a facility built a decade ago. Its overhead of 0.75&nbsp;kW per kW of IT is assumed to split into 0.55 for cooling, 0.15 for power-chain losses and 0.05 for lighting and other loads. The effect assumed for each step, listed in Table&nbsp;{#t:case}, is a conservative figure from the earlier sections; for example, raising chilled water from 7 to 15&nbsp;&deg;C saves about a quarter of chiller power by Example&nbsp;{#chw}, and chillers are about 60&nbsp;% of the cooling load, so cooling power falls by about 15&nbsp;%. The steps are applied one after another, so each acts on what is left after the previous one.</p>

<div class="tcap"><b>Table {#t:case}.</b> Step-by-Step Retrofit of a 4 MW IT Colocation Hall (Assumed Step Effects)</div>

| Step | Assumed effect | IT (kW) | PUE | Site (kW) | Cumulative saving (kW) |
|---|---|---|---|---|---|
| Baseline | &mdash; | 4,000 | 1.750 | 7,000 | &mdash; |
| Remove comatose servers; consolidate | IT &minus;8 % | 3,680 | 1.750 | 6,440 | 560 |
| Containment, blanking, higher set points | Cooling &minus;15 % | 3,680 | 1.667 | 6,136 | 864 |
| Run N+1 fans slowly; VSDs; pump pressure reset | Cooling &minus;15 % | 3,680 | 1.597 | 5,878 | 1,122 |
| Chilled water 7 &rarr; 15 &deg;C; chiller sequencing | Cooling &minus;15 % | 3,680 | 1.538 | 5,659 | 1,341 |
| Modular UPS in eco-mode; Titanium PSUs | Losses 0.15 &rarr; 0.08; IT &minus;2 % | 3,606 | 1.468 | 5,293 | 1,707 |
| Condition monitoring; set-point analytics | Cooling &minus;5 % | 3,606 | 1.451 | 5,233 | 1,768 |
| LED lighting; controls | Other 0.05 &rarr; 0.04 | 3,606 | 1.441 | 5,196 | 1,804 |

<div class="figrow one"><figure id="fig-10"><a class="zoom" href="img/data-centre-power-demand-efficiency/fig11_site_case.svg" target="_blank" rel="noopener"><img src="img/data-centre-power-demand-efficiency/fig11_site_case.svg" alt="Waterfall chart of site power falling from 7000 kW to 5196 kW through seven retrofit steps" loading="lazy" style="background:#fff;width:100%;max-width:820px"></a><figcaption><b>Figure 10.</b> Site power of the Chennai case hall after each step of Table&nbsp;{#t:case}. Hatched bars are cooling measures. The vertical axis starts at 4,000&nbsp;kW to make the steps visible.<span class="credit">Chart by the author</span></figcaption></figure></div>

<div class="worked"><p class="wt">WORKED EXAMPLE {#case} &mdash; What the Chennai hall gains</p>
<p>Site power falls from 7,000 to 5,196&nbsp;kW, a saving of 1,804&nbsp;kW or <span class="ans">25.8&nbsp;%</span>, and PUE falls from 1.75 to 1.44.</p>
<p>Annual energy saved = 1,804 &times; 8,760 = <span class="ans">15,800&nbsp;MWh</span>. At an assumed &#8377;8/kWh that is <span class="ans">about &#8377;12.6&nbsp;crore a year</span>. At the Indian grid's weighted average emission factor of 0.727&nbsp;t&nbsp;CO&#8322;/MWh for 2023&ndash;24 [@cea2024], it avoids about <span class="ans">11,500&nbsp;t of CO&#8322; a year</span>.</p>
<p>Seen as capacity: the existing 7,000&nbsp;kW grid connection could now supply 7,000/1.441 = 4,858&nbsp;kW of IT load, that is <span class="ans">about 1,250&nbsp;kW more IT capacity</span> without a new connection. In a city where new connections take years, that headroom may be worth more than the energy saving.</p></div>

<p>About three-quarters of the saving in this case comes from the first four steps, which need little capital apart from variable-speed drives: removing idle servers, airflow management, set points, and running redundant equipment slowly. Most of the rest comes from power equipment replaced at its normal end of life. None of it requires liquid cooling or a new building.</p>

### 12.2 The road map

<p>Most of the world's data-centre floor space will still be in use in 2030, so retrofits matter as much as new designs. Table&nbsp;{#t:roadmap} groups the measures by cost and speed. Payback periods are the author's indicative estimates for a typical air-cooled enterprise or colocation site at Indian tariffs; actual values depend on the site.</p>

<div class="tcap"><b>Table {#t:roadmap}.</b> Retrofit Road Map (Indicative)</div>

| Phase | Measure | Layer | Typical effect | Capital cost | Indicative payback |
|---|---|---|---|---|---|
| 0&ndash;6 months | Inventory; remove comatose servers | IT | Up to 20&ndash;30 % of servers in older estates | Very low | Weeks |
| 0&ndash;6 months | Blanking panels, sealing, aisle containment | Cooling | Enables higher set points | Low | Months |
| 0&ndash;6 months | Raise supply air and chilled-water set points within ASHRAE range | Cooling | Up to about 4 % of cooling energy per &deg;C | None | Immediate |
| 0&ndash;6 months | Run N+1 fans at reduced speed; reset pump pressure | Cooling | About 30 % of fan energy (Example&nbsp;{#fans}) | None to low | Immediate |
| 0&ndash;6 months | Sequence chillers and towers by measured efficiency | Cooling | Several % of plant energy | Low | Months |
| 6&ndash;24 months | Variable-speed drives or EC fans on fixed-speed equipment | Cooling | 30&ndash;50 % of that equipment's energy | Medium | 1&ndash;3 years |
| 6&ndash;24 months | Virtualise and consolidate; enable power management | IT | Up to two-thirds of affected IT power (Example&nbsp;{#consol}) | Low to medium | Under 1 year |
| 6&ndash;24 months | Modular UPS, eco-mode, efficient PSUs at refresh | Power | Several % of total (Example&nbsp;{#chain}) | Medium | 2&ndash;4 years |
| 6&ndash;24 months | Condition monitoring and performance tracking of cooling plant | Cooling | Holds plant near design efficiency | Medium | 1&ndash;2 years |
| 6&ndash;24 months | Data-driven set-point optimisation | Cooling | Up to 40 % of cooling energy at best [@deepmind2016] | Medium | 1&ndash;2 years |
| 2&ndash;5 years | Direct-to-chip liquid cooling for dense rows; warm-water loop | Cooling | About 10 % of total power (Section&nbsp;6.4) | High | 3&ndash;6 years |
| 2&ndash;5 years | Replace old chillers and transformers | Cooling, power | Large where equipment is old | High | 4&ndash;8 years |
| 2&ndash;5 years | Batteries for peak shaving and flexibility contracts | Grid | Faster connection; lower demand charges | High | Depends on tariff |
| 2&ndash;5 years | Heat-reuse connection | Heat | Displaces other fuels | High | Depends on heat buyer |
| New builds | 800 V DC, closed-loop liquid cooling, siting near clean power and heat users | All | Design PUE near 1.1; low WUE | Part of project | &mdash; |

<p>The first phase deserves emphasis. Its measures cost almost nothing, need no new equipment and are reversible, yet together they commonly recover a large part of the gap between an average site and a good one. They are held back mainly by habit, by split responsibilities between IT and facilities teams, and by the fear of change in a facility whose first duty is never to stop. A data centre that does not measure the energy use of its own cooling plant cannot manage it.</p>

### 12.3 Common objections

<p>Efficiency measures in data centres often stall not because they fail technically but because of concerns about reliability. Table&nbsp;{#t:objections} summarises the common objections and the safeguards that answer them.</p>

<div class="tcap"><b>Table {#t:objections}.</b> Common Objections to Efficiency Measures and Their Safeguards</div>

| Objection | What the evidence and practice show | Safeguard |
|---|---|---|
| "Warmer rooms will cause failures." | ASHRAE's recommended range (18&ndash;27 &deg;C) was set with IT manufacturers; most rooms still run well below its top [@ashrae; @energystar] | Raise in steps of 1 &deg;C; watch rack inlet spread and server fan speeds |
| "Eco-mode UPS exposes the load to the grid." | Modern units transfer to the inverter within milliseconds when the supply deviates | Enable on well-conditioned feeds first; log every transfer |
| "We cannot switch off a server if we do not know what it does." | That uncertainty is the reason a quarter or more of servers do nothing [@koomey2017] | Disconnect from the network first; power off after a waiting period; then remove |
| "Running all N+1 fans or pumps wears them out." | At reduced speed, bearing loads and wear are lower, not higher | Rotate duty; monitor vibration (Table&nbsp;{#t:faults}) |
| "Liquid cooling will leak onto the servers." | Leaks are a design and maintenance issue, as in any hydronic system | Negative-pressure or leak-detecting loops; quick-disconnect couplings; commissioning tests |
| "PUE is already good enough." | PUE ignores idle IT, water and heat (Section&nbsp;3.3) | Track energy per unit of work and WUE as well |
| "Efficiency only invites more demand." | True in part (Section&nbsp;13.3); but it lowers cost and emissions per unit of service | Pair efficiency with disclosure and clean supply |

## 13. How Much of the Surge Can Efficiency Absorb?

### 13.1 Summary of the worked examples

<div class="tcap"><b>Table {#t:summary}.</b> Summary of the Worked Examples</div>

| No. | Lever | Case | Result |
|---|---|---|---|
| {#pue} | Facility PUE | Global fleet 2024, 1.54 &rarr; 1.30 | &minus;64.7 TWh/yr (15.6 %) |
| {#ai} | Model routing and mix | 1 billion queries/day at 0.3 Wh | Routing &minus;63 %; 10 % agentic at 100&times;: &times;10.9 |
| {#idle} | Idle servers | 4,000 servers, 25 % comatose, PUE 1.7 | 2,681 MWh/yr; &#8377;2.1 crore/yr |
| {#consol} | Consolidation | 100 servers at 12 % &rarr; 24 at 50 % | &minus;66 % IT power |
| {#fans} | Fan affinity | Six N+1 fans at 5/6 speed, 10 MW hall | &minus;30.6 % fan power; &minus;1,600 MWh/yr |
| {#chw} | Chilled-water temperature | 7 &rarr; 18 &deg;C, 40 &deg;C condensing | &minus;34 % compressor power (&asymp;3.7 %/K) |
| {#chain} | Conversion chain | 100 MW IT, 83.1 % &rarr; 93.6 % | &minus;13.6 MW; &minus;119 GWh/yr |
| {#dc800} | 800 V DC | 1 MW, vs 415 V AC; 200 kW rack vs 54 V | &minus;51 % conductor loss; 219&times; lower rack I²R |
| {#flex} | Flexibility | 0.25 % curtailment | 21.9 h/yr; 100 MWh battery for 100 MW campus |
| {#ramp} | Load smoothing | 30 MW swing, 10 MW/min ramp limit | 30 MW, 0.75 MWh storage |
| {#heat} | Heat reuse | 20 MW IT, heat pump COP 4 | 20 MW heat; 166 GWh/yr |
| {#water} | Water | 100 MW IT, WUE 1.8 &rarr; 0.1 | 4.3 &rarr; 0.24 million L/day |
| {#india} | India fleet | 57 TWh in 2030, PUE 1.6 &rarr; 1.3 | &minus;10.7 TWh/yr; &asymp;1.4 GW coal |
| {#chennai} | Chennai cluster | 305 &rarr; 900 MW IT, PUE 1.6, 80 % load | 1.8 % &rarr; 5.3 % of TN peak; PUE 1.3 saves 216 MW |
| {#meas} | Measurement | 120 kg/s, &Delta;T 6 K, 600 kW chiller | COP 5.0 (0.70 kW/TR); low &Delta;T 6 &rarr; 4 K: up to 3.4&times; pump power |
| {#case} | Site case, Chennai | 4 MW IT hall, PUE 1.75, seven steps | &minus;25.8 %; 15,800 MWh/yr; &#8377;12.6 crore/yr; +1,250 kW IT headroom |

### 13.2 An indicative estimate for 2030

<p>To see what the levers could add up to at global scale, they are applied to the IEA's 2030 Base Case of 945&nbsp;TWh. The following assumptions are the author's, chosen to be plausible rather than precise: the 2030 fleet would otherwise average a PUE of 1.45; IT energy is split equally between conventional and AI workloads; and the savings are additional to the efficiency gains already in the IEA projection. A "low" push lowers average PUE to 1.35, removes 2&nbsp;% of power-chain losses, and saves 10&nbsp;% of conventional and 10&nbsp;% of AI IT energy through idle-server removal, consolidation, better utilisation and model-serving efficiency. A "high" push lowers PUE to 1.25, removes 5&nbsp;% of chain losses, and saves 20&nbsp;% and 25&nbsp;% of conventional and AI IT energy. The savings are applied multiplicatively, so they do not double-count.</p>

<div class="figrow one"><figure id="fig-11"><a class="zoom" href="img/data-centre-power-demand-efficiency/fig10_wedges.svg" target="_blank" rel="noopener"><img src="img/data-centre-power-demand-efficiency/fig10_wedges.svg" alt="Stacked bars showing 2030 demand with low and high efficiency pushes, split into four wedges" loading="lazy" style="background:#fff;width:100%;max-width:800px"></a><figcaption><b>Figure 11.</b> Author's indicative estimate of what an efficiency push beyond the IEA Base Case could remove from 2030 consumption. The low push removes about 169&nbsp;TWh (32&nbsp;% of the 2024&ndash;2030 growth) and the high push about 345&nbsp;TWh (65&nbsp;%).<span class="credit">Chart by the author</span></figcaption></figure></div>

<div class="tcap"><b>Table {#t:wedges}.</b> Indicative 2030 Savings by Lever (TWh/yr)</div>

| Lever | Low push | High push |
|---|---|---|
| Conventional servers: idle removal, consolidation | 47 | 95 |
| AI serving: utilisation, smaller models, batching | 47 | 118 |
| Power chain: fewer conversions, better PSUs | 17 | 37 |
| Cooling and facility (PUE) | 58 | 96 |
| <b>Total saving</b> | <b>169</b> | <b>345</b> |
| 2030 consumption | 776 | 600 |
| Share of 2024&ndash;2030 growth (530 TWh) offset | 32 % | 65 % |

<p>The result is that efficiency could plausibly offset one-third to two-thirds of the projected growth. The high case would hold 2030 consumption to about 600&nbsp;TWh instead of 945&nbsp;TWh, roughly the level that continued growth at the 2025 rate would reach around 2027. Two features of the estimate deserve comment. The largest wedges are in the IT and software layers, not in the facility, which confirms the point of Figure&nbsp;1: savings at the bottom of the chain are multiplied by everything above. And the facility wedge, though smaller, is the most certain, because the technologies are mature and the physics is well understood.</p>

### 13.3 Three caveats

<p><span class="kw">Rebound.</span> When a service becomes cheaper to provide, more of it is used. Energy per AI query has fallen by an order of magnitude a year, yet total AI electricity use has risen fast, because cheaper computation has been spent on longer reasoning, video and agents [@iea2026]. Efficiency gains therefore lower the cost of meeting a given demand but do not, by themselves, cap total demand. Whether the saved energy is banked or spent on more computation is a choice for markets and policy, not a law of engineering.</p>

<p><span class="kw">Baseline overlap.</span> The IEA's projections already include continuing efficiency improvement. The savings in Table&nbsp;{#t:wedges} are meant to be additional, but the boundary is uncertain, and part of what is shown may already be in the baseline.</p>

<p><span class="kw">Energy is not capacity.</span> Annual energy savings do not automatically reduce the peak demand that a local grid must serve. For connecting new campuses, the flexibility and storage measures of Section&nbsp;8, which save little energy, may matter more than the efficiency measures that save a great deal.</p>

### 13.4 What efficiency cannot do

<p>Efficiency reduces the amount of new supply needed; it does not remove the need. The IEA expects about half of the growth in data-centre demand to 2030 to be met by renewables supported by storage and the wider grid, with natural gas adding about 175&nbsp;TWh, mainly in the United States, nuclear contributing a similar amount, and the first small modular reactors coming online around 2030 [@iea2025]. Emissions from the electricity used by data centres are expected to rise from about 180 to about 300 million tonnes of CO&#8322; by 2035 [@brussels2025]. The case for efficiency is therefore not that it replaces new generation, but that it lowers how much must be built, gives grids time to build it, and makes every unit of new clean supply go further.</p>

### 13.5 Looking towards 2035

<p>The direction of the technology is reasonably clear even where the volumes are not. Rack power will keep rising, with megawatt-class racks planned from 2027 [@nv800], which makes liquid cooling the default for new AI capacity and pushes power distribution towards 800&nbsp;V DC. Warm-water cooling will make chiller-free operation possible in most climates, including India's, and will make heat reuse cheaper wherever there is a buyer. Energy per AI task will probably keep falling quickly, while the mix of tasks shifts towards heavier uses. The IEA's 2035 range, from about 970&nbsp;TWh with high efficiency to more than 1,700&nbsp;TWh in its Lift-Off case [@iea2025ch2], is in effect a range of outcomes for how far efficiency keeps pace with the growth in use. Which end the world reaches depends less on any single breakthrough than on whether the proven measures described in this paper are applied across the whole fleet, old and new.</p>

## 14. Recommendations

<p><b>For data-centre operators.</b> Measure energy per unit of useful work, not only PUE, and publish it. Run an annual hunt for comatose servers. Raise temperatures to the top of the ASHRAE recommended range and run water as warm as the equipment allows. Put variable-speed drives on every fan, pump and tower, and run redundant units slowly rather than keeping them idle. Monitor the condition and performance of cooling-plant machinery continuously. Design every new hall to be liquid-ready, and every new campus with heat reuse and flexible operation in mind.</p>

<p><b>For AI developers and cloud providers.</b> Report energy per query and per training run. Route requests to the smallest model that can answer them well, set sensible defaults for reasoning length, and schedule deferrable training into hours of surplus clean power.</p>

<p><b>For utilities and regulators.</b> Offer flexible-connection agreements that trade bounded curtailment for faster connection. Deploy grid-enhancing technologies on congested corridors. Use time-of-day tariffs that reward load shifting. Plan transmission with the data-centre pipeline in view.</p>

<p><b>For governments.</b> Require metering and disclosure of PUE, WUE and renewable share. Set minimum efficiency standards for new facilities and water limits that vary with local water stress. Where a heat network or industrial heat user exists, require new data centres to offer their heat. In India, bring large data centres into the national energy-efficiency framework and plan data-centre parks around renewable supply and heat users.</p>

## 15. Conclusions

<p>1) The surge in data-centre electricity demand is real and fast: from about 415&nbsp;TWh in 2024 to about 945&nbsp;TWh by 2030 in the IEA Base Case, with 17&nbsp;% growth in 2025 alone. Its sharpest effect is local, on grid connections and city networks, rather than on world supply.</p>

<p>2) A large part of the existing fleet runs far below proven practice. The global average PUE has hardly moved from about 1.54 in six years, while the best facilities operate near 1.1. Raising the fleet to 1.30 would alone cut consumption by 15.6&nbsp;%.</p>

<p>3) The biggest savings lie in the IT and software layers, because each watt saved there is also saved in conversion and cooling. Comatose servers, low utilisation and inefficient model serving are management problems with inexpensive solutions.</p>

<p>4) In the facility, the classical laws of rotating machinery and refrigeration govern the savings: the cube law for fans and pumps, the dependence of chiller COP on temperature lift, and the multiplication of losses through the conversion chain. Variable speed, warmer water, liquid cooling, fewer conversions and higher distribution voltage each recover several per cent, and condition monitoring keeps them recovered.</p>

<p>5) Working with the grid, through flexibility, storage and better use of existing lines, can connect new load faster even where it saves little energy.</p>

<p>6) In India, where capacity is heading above 4&nbsp;GW by 2030 and Chennai is the second hub, the tropical climate and water stress make warm-water liquid cooling, closed-loop heat rejection and solar-hour load shifting the natural choices. A fleet PUE of 1.3 instead of 1.6 would save about 10.7&nbsp;TWh a year by 2030.</p>

<p>7) On the author's indicative estimate, a determined efficiency push could offset one-third to two-thirds of the growth expected to 2030. Efficiency does not remove the need for new clean generation and transmission, and cheaper computation invites more of it. But it is the fastest, cheapest and most certain resource available, and it buys the time that building new supply requires.</p>

## Appendix: Abbreviations and Symbols

<div class="tcap"><b>Table {#t:abbr}.</b> Abbreviations and Symbols</div>

| Term | Meaning | Term | Meaning |
|---|---|---|---|
| AC, DC | Alternating, direct current | PSU | Power supply unit (server) |
| CDU | Coolant distribution unit | PUE | Power usage effectiveness, (1) |
| COP | Coefficient of performance, (6) | SiC | Silicon carbide |
| CRAH | Computer-room air handler | TR | Tonne of refrigeration (3.517 kW) |
| CUE | Carbon usage effectiveness | UPS | Uninterruptible power supply |
| IT | Servers, storage and network | VSD | Variable-speed drive |
| MV, LV | Medium, low voltage | WUE | Water usage effectiveness (L/kWh) |
| N+1 | One unit beyond what the duty needs | <i>N</i>, <i>Q</i>, <i>H</i>, <i>P</i> | Speed, flow, head, power, (5) |
| PDU | Power distribution unit | <i>T</i><sub>e</sub>, <i>T</i><sub>c</sub> | Evaporating, condensing temperature (K) |
| PLF | Plant load factor | <i>u</i> | Server utilisation, 0&ndash;1, (4) |

## Acknowledgment

<p>The author acknowledges the use of Claude (Anthropic), a large language model, for literature and data search, drafting assistance and the scripts used for the worked calculations and figures. Facts and figures were checked against the cited sources, assumed values are marked as such, and the interpretations and conclusions are the author&rsquo;s own.</p>
