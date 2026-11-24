
## 4. How Grids Are Organised Today

### 4.1 Roles and models

<p>Every grid has the same functions, though different countries assign them to different bodies. Generators produce power. Transmission owners build and maintain the high-voltage network. A system operator, called a transmission system operator (TSO) in Europe, an independent system operator (ISO) or regional transmission organisation (RTO) in North America, and a load despatch centre in India, schedules and dispatches the system and keeps it secure in real time. Distribution companies own the low-voltage networks and, in many countries, sell to consumers. Regulators set tariffs and rules, and reliability bodies set technical standards. Two broad models exist. In the <span class="kw">vertically integrated</span> model, one utility, often state-owned, does most of these jobs in its territory. In the <span class="kw">unbundled market</span> model, generation competes, the network is a regulated monopoly, and an independent operator runs both the market and the grid. Most countries sit somewhere between the two.</p>

### 4.2 United States

<p>The contiguous United States has three largely separate AC interconnections, Eastern, Western and Texas (ERCOT), joined only by small DC ties. Within them, seven ISOs and RTOs run wholesale markets covering most of the country's load, while the Southeast and much of the West are still operated by vertically integrated utilities. The Federal Energy Regulatory Commission (FERC) regulates interstate transmission and wholesale markets, and NERC sets and enforces mandatory reliability standards. US markets are mostly "nodal": prices are calculated at thousands of points, so that transmission congestion appears directly in the price. The country's most visible grid problem is connection. Lawrence Berkeley National Laboratory counted 2,061&nbsp;GW of generation and storage actively seeking interconnection at the end of 2025, down 10&nbsp;% from a year earlier as many projects withdrew, and found that the median time from connection request to commercial operation exceeded five years for projects built in 2025 [@lbnl_q2026]. Figure&nbsp;{#f:queue} shows the composition of the queue.</p>

<div class="figrow one"><figure id="fig-{#f:queue}"><a class="zoom" href="img/power-grid-management-worldwide/fig7_us_queue.svg" target="_blank" rel="noopener"><img src="img/power-grid-management-worldwide/fig7_us_queue.svg" alt="Horizontal bars of US interconnection queue capacity by technology at the end of 2025" loading="lazy" style="background:#fff;width:100%;max-width:720px"></a><figcaption><b>Figure {#f:queue}.</b> Capacity actively seeking connection to the US transmission grid at the end of 2025, by technology [@lbnl_q2026]. "Other" is the remainder of the 2,061&nbsp;GW total. Gas capacity in the queue rose by 86&nbsp;% in a year, while solar, storage and wind fell.<span class="credit">Chart by the author</span></figcaption></figure></div>

### 4.3 Europe

<p>Continental Europe operates the largest synchronous AC area in the world by number of countries, coordinated through the European Network of Transmission System Operators for Electricity (ENTSO-E). Each country's TSO is responsible for its own control area, but network codes harmonise connection requirements, operation and balancing. Markets are "zonal", usually one price zone per country, and are coupled across borders by a common algorithm, the Single Day-Ahead Coupling, which allocates cross-border capacity and sets prices for all zones together. On 30 September 2025 the coupled day-ahead market moved from hourly to 15-minute trading intervals, so that prices and schedules follow the fast changes of solar and wind output more closely [@sdac2025]. Europe has also moved first on requiring new storage to behave like a synchronous machine: an ENTSO-E technical report proposes making grid-forming capability mandatory for new storage above 1&nbsp;MW under the revised generator connection code [@entsoe_gfm].</p>

### 4.4 China

<p>China's grids are run by two large state-owned companies, State Grid, which covers about 80&nbsp;% of the country's territory, and China Southern Power Grid [@gmk_sg]. The defining feature is a backbone of ultra-high-voltage (UHV) lines, &plusmn;800&nbsp;kV and above for DC and 1,000&nbsp;kV for AC, carrying power from the coal, hydro, wind and solar resources of the west and north to the load centres of the east. By the end of 2025 China had completed 46 UHV projects, 22 AC and 24 DC, with more than 62,000&nbsp;km of lines [@gt_uhv]. West-to-east transmission capacity reached 340&nbsp;GW in 2025, meeting about 23&nbsp;% of national peak demand, and State Grid's fixed-asset investment rose to a record of more than 650&nbsp;billion yuan [@cd_2026]. A further 15 UHV lines are planned for 2026&ndash;2030, raising cross-provincial transmission capacity by about 35&nbsp;% [@enerdata_uhv]. China's model shows what centralised planning and finance can build quickly; its challenges include provincial market barriers and curtailment of renewables in resource-rich regions.</p>

### 4.5 Australia

<p>Australia's National Electricity Market (NEM), operated by the Australian Energy Market Operator (AEMO), is a long, thin network along the east coast with an energy-only market settled every five minutes. It has become a world laboratory for high renewable shares. Renewables supplied a record 78.6&nbsp;% of NEM demand in a half-hour on 11 October 2025, with rooftop solar alone providing 51.3&nbsp;% [@aemo_2025rec], and more than half of total energy in the December 2025 quarter, with an instantaneous peak of 91.1&nbsp;% [@aemo_q4]. The flip side is "minimum system load": on sunny spring weekends rooftop solar drives grid demand so low that too few synchronous machines remain online to provide system strength and inertia. NEM operational demand fell to a record low of 9,666&nbsp;MW on 4 October 2025 [@pvtech_min]. AEMO has responded with emergency backstop powers to curtail rooftop solar, synchronous condensers and grid-forming batteries: ten grid-forming battery sites totalling 1,070&nbsp;MW were in operation in late 2025, with 94 more in the pipeline [@ess_gfm].</p>

### 4.6 Other systems

<p>Other large systems illustrate further variations. Brazil, dominated by hydropower spread over a continent, is run by a national system operator that optimises water use across reservoirs years ahead; it expanded its transmission system by more than 92,000&nbsp;km in a decade, growing by more than 50&nbsp;% [@dte_grids]. South Africa shows the consequences of under-investment: years of rotating load shedding, which the IEA links in part to the lack of grid capacity to connect new renewable projects [@en_sa]. Japan operates two frequencies, 50&nbsp;Hz in the east and 60&nbsp;Hz in the west, a legacy of equipment bought from different countries in the 1890s, joined only by frequency-converter stations of limited capacity, a constraint felt sharply after the 2011 earthquake. Each case confirms that the institutional and physical structure inherited from the past shapes what operators can do today.</p>

### 4.7 India in outline

<p>India operates one of the world's largest synchronous grids, managed by Grid Controller of India Limited (Grid-India) through a national load despatch centre, five regional centres and state centres. Inter-state transmission is built mainly by POWERGRID and private developers under tariff-based competitive bidding, while distribution is largely in the hands of state-owned companies. India is treated in detail in Section&nbsp;9. Table&nbsp;{#t:countries} compares the five systems.</p>

<div class="tcap"><b>Table {#t:countries}.</b> How Five Major Systems Are Organised</div>

| Feature | United States | Europe | China | Australia (NEM) | India |
|---|---|---|---|---|---|
| Frequency | 60 Hz | 50 Hz | 50 Hz | 50 Hz | 50 Hz |
| Structure | 3 interconnections; 7 ISOs/RTOs plus integrated utilities | One large synchronous area; national TSOs | Two state grid companies | One market, one operator | One national grid; national, regional and state despatch centres |
| Market design | Mostly nodal pricing; capacity markets in some ISOs | Zonal pricing; coupled day-ahead at 15-minute resolution | Provincial markets, largely planned dispatch | Energy-only, 5-minute settlement | Exchanges for day-ahead and real-time; long-term contracts dominate |
| Reliability body | NERC (mandatory standards) | ENTSO-E network codes | State Grid, China Southern, regulators | AEMO, AEMC, AER | CEA, CERC, Grid-India |
| Signature challenge | Connection queues; load growth from data centres | Voltage control; cross-border coordination | Long-distance transfer; curtailment | Minimum system load; system strength | Evening ramp; high frequency at midday; distribution finances |

## 5. Operating the Grid Day to Day

### 5.1 Forecasting and scheduling

<p>Operation begins with forecasts: demand for each 15-minute block of the next day, wind and solar output from weather models, and the availability of each plant and line. From these, operators or markets produce a <span class="kw">unit commitment</span>, deciding which plants will be running and when, because large thermal units take hours to start. The schedule must leave enough reserve to cover forecast errors and the largest contingency (Example&nbsp;{#reserve}). As the share of weather-dependent generation grows, forecasting accuracy has become as important to reliability as the plants themselves.</p>

### 5.2 Economic dispatch

<p>Among the committed units, load is shared so that total cost is minimised. If each unit's cost <i>C</i><sub><i>i</i></sub> is a smooth function of its output <i>P</i><sub><i>i</i></sub>, the classical solution is that every unit not at a limit runs at the same incremental (marginal) cost &lambda;:</p>

<p class="eqn">d<i>C</i><sub><i>i</i></sub>/d<i>P</i><sub><i>i</i></sub> = &lambda; &nbsp; for all units within limits, &nbsp; &Sigma;<i>P</i><sub><i>i</i></sub> = <i>P</i><sub>D</sub> &nbsp;&nbsp;&nbsp;({#e:ed})</p>

<p>In a market, &lambda; is the clearing price; in a cost-based system, it is computed by the despatch centre. India's merit-order despatch and its market-based economic despatch pilots are applications of the same principle.</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#ed} &mdash; Equal incremental cost dispatch</p>
<p>Three units must supply 900&nbsp;MW. Their marginal costs, in ₹/kWh with <i>P</i> in MW (assumed), are Coal&nbsp;A: 2.0 + 0.0020<i>P</i> (150&ndash;600&nbsp;MW); Coal&nbsp;B: 2.4 + 0.0016<i>P</i> (100&ndash;500&nbsp;MW); Gas&nbsp;C: 4.0 + 0.0030<i>P</i> (50&ndash;300&nbsp;MW).</p>
<p>Solving ({#e:ed}): &lambda; = <span class="ans">₹2.98/kWh</span>, with Coal&nbsp;A at 488.9&nbsp;MW and Coal&nbsp;B at 361.1&nbsp;MW. Gas&nbsp;C stays at its 50&nbsp;MW minimum because even its cheapest output costs more than &lambda;.</p>
<p>Total variable cost is about ₹23.9&nbsp;lakh per hour, against ₹28.2&nbsp;lakh for an equal 300&nbsp;MW split, a saving of <span class="ans">about ₹4.3&nbsp;lakh per hour</span>. Across a national fleet, the same logic is worth thousands of crores a year, and is the reason operators want to schedule plants on a common, transparent merit order.</p></div>

<div class="figrow one"><figure id="fig-{#f:dispatch}"><a class="zoom" href="img/power-grid-management-worldwide/fig4_dispatch.svg" target="_blank" rel="noopener"><img src="img/power-grid-management-worldwide/fig4_dispatch.svg" alt="Marginal cost lines of three units with the system marginal cost line and operating points" loading="lazy" style="background:#fff;width:100%;max-width:720px"></a><figcaption><b>Figure {#f:dispatch}.</b> Economic dispatch of Example&nbsp;{#ed}. The two coal units run where their marginal cost equals the system marginal cost &lambda;; the gas unit is held at its minimum.<span class="credit">Chart by the author</span></figcaption></figure></div>

### 5.3 Balancing between areas

<p>A large grid is divided into control areas, each responsible for its own balance. Secondary control acts on an area control error (ACE), which combines the deviation of the area's net exchange from schedule with its share of the frequency deviation. In the North American convention:</p>

<p class="eqn">ACE = (<i>NI</i><sub>A</sub> &minus; <i>NI</i><sub>S</sub>) &minus; 10<i>B</i>(<i>f</i><sub>A</sub> &minus; <i>f</i><sub>S</sub>) &nbsp;&nbsp;&nbsp;({#e:ace})</p>

<p>where <i>NI</i> is net interchange (actual and scheduled), <i>B</i> the frequency bias in MW per 0.1&nbsp;Hz (negative by convention) and <i>f</i> the frequency. A positive ACE means the area is over-generating and should reduce output.</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#ace} &mdash; Reading the area control error</p>
<p>An area is scheduled to export 1,000&nbsp;MW but is exporting 1,300&nbsp;MW, while frequency is 59.98&nbsp;Hz against 60.00&nbsp;Hz. Its bias is &minus;150&nbsp;MW per 0.1&nbsp;Hz (assumed).</p>
<p>ACE = (1,300 &minus; 1,000) &minus; 10 &times; (&minus;150) &times; (&minus;0.02) = 300 &minus; 30 = <span class="ans">+270&nbsp;MW</span>. The area should cut generation by about 270&nbsp;MW. It keeps 30&nbsp;MW of its excess, because that is its fair share of supporting the low interconnection frequency.</p></div>

### 5.4 Why transmission voltage matters

<p>Transmission losses are proportional to the square of current. Since current falls in proportion to voltage for the same power, losses fall with the square of voltage. This is why long-distance lines run at 400, 765&nbsp;kV or higher, and why the ultra-high-voltage networks of China and India exist.</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#volt} &mdash; Losses at 220, 400 and 765 kV</p>
<p>Transmit 500&nbsp;MW over 300&nbsp;km at power factor 0.95 with a resistance of 0.03&nbsp;&Omega;/km per phase (assumed, the same conductor in each case for simplicity).</p>
<p>At 220&nbsp;kV: <i>I</i> = 500 &times; 10<sup>6</sup> / (&radic;3 &times; 220 &times; 10<sup>3</sup> &times; 0.95) = 1,381&nbsp;A; loss = 3<i>I</i><sup>2</sup><i>R</i> = 51.5&nbsp;MW, <span class="ans">10.3&nbsp;%</span>.</p>
<p>At 400&nbsp;kV: 760&nbsp;A, 15.6&nbsp;MW, <span class="ans">3.1&nbsp;%</span>. At 765&nbsp;kV: 397&nbsp;A, 4.3&nbsp;MW, <span class="ans">0.85&nbsp;%</span>.</p>
<p>In practice, higher-voltage lines also use larger conductor bundles, so the real advantage is even greater. The limit at long distances is not loss but stability and reactive power, which is where HVDC takes over (Section&nbsp;8.5).</p></div>

### 5.5 The control room

<p>A modern control room combines SCADA telemetry every few seconds, synchrophasor measurements many times a second, a state estimator that reconciles them into a consistent picture, contingency analysis that tests the effect of each credible outage, and tools for scheduling, outage coordination and restoration. The operators' discipline, following procedures, keeping situational awareness and acting early, remains decisive. Several of the blackouts in the next section began with tools that failed silently or with operators who could not see what was happening.</p>

### 5.6 A contingency, minute by minute

<p>The layers described in Section&nbsp;2 come together in the first quarter of an hour after a major disturbance. Table&nbsp;{#t:timeline} follows a hypothetical but typical event in a large 50&nbsp;Hz system: the trip of a 4&nbsp;GW HVDC import link at the evening peak.</p>

<div class="tcap"><b>Table {#t:timeline}.</b> Anatomy of a Large Contingency (Illustrative)</div>

| Time after trip | What happens | Who or what acts |
|---|---|---|
| 0&ndash;100 ms | Converter protection blocks the link; 4 GW of infeed is lost | Protection |
| 0&ndash;2 s | Frequency falls at about 0.1 Hz/s; rotating machines release kinetic energy | Inertia (automatic) |
| 0.2&ndash;1 s | Batteries on fast frequency response inject power | Fast frequency response |
| 2&ndash;10 s | Governors open valves; hydro gates move; frequency reaches its nadir | Primary response |
| 10&ndash;30 s | Frequency settles about 0.06 Hz low; flows on AC lines near the lost link rise | Primary response; load damping |
| 30 s&ndash;5 min | Secondary control raises output in the deficit area; interchange restored | AGC / secondary reserve |
| 1&ndash;15 min | Operators check contingency analysis; dispatch tertiary reserve; re-dispatch to relieve overloaded lines | Control room |
| 15 min onwards | Reserves replaced; schedules revised; event logged for investigation | Control room; markets |

<p>If any layer fails, a cascade can begin: if too little primary reserve is available, frequency falls to the load-shedding thresholds; if the lost power reroutes onto lines that then overload and trip, the event spreads geographically; if voltage collapses in the receiving area, generators and loads disconnect. Operators' main job in this window is to keep the event from finding a second weakness.</p>

### 5.6 Ancillary services

<p>Besides energy, the system operator buys or mandates a set of "ancillary services" that keep the grid stable. Their names differ between countries, but the functions are common: fast frequency response, primary, secondary and tertiary reserves, voltage and reactive-power control, and black-start capability. India's framework has moved from regulated reserves dispatched by the operator to market-based procurement, with secondary and tertiary reserve ancillary services and voltage-control services recognised in the 2023 grid code [@gi_as]. Table&nbsp;{#t:ancillary} summarises the services.</p>

<div class="tcap"><b>Table {#t:ancillary}.</b> Ancillary Services and Their Time Frames</div>

| Service | Purpose | Activation | Typical providers |
|---|---|---|---|
| Inertia | Slow the initial rate of frequency change | Instant, passive | Synchronous machines; grid-forming inverters |
| Fast frequency response | Arrest frequency within about a second | &lt; 1&ndash;2 s | Batteries; some loads |
| Primary reserve | Governor or droop response | Seconds to 30 s | Thermal, hydro, batteries |
| Secondary reserve | Restore frequency and interchange (AGC) | 30 s to 15 min | Hydro, gas, batteries, flexible coal |
| Tertiary reserve | Replace used reserves; re-dispatch | 15 min to hours | Any dispatchable resource; demand response |
| Voltage control | Hold voltages within limits | Continuous | Generators, STATCOMs, capacitors, inverters |
| Black start | Restart the system after collapse | Hours after blackout | Hydro, gas turbines, batteries |

### 5.7 Asset management and condition monitoring

<p>A grid is also a fleet of ageing machines: power transformers, circuit breakers, cables, conductors and towers, many of them several decades old. Their failure, especially of a large transformer that may take up to four years to replace [@iea_supply], is a reliability risk in its own right. Utilities increasingly manage assets by condition rather than by age, using dissolved-gas analysis of transformer oil, online bushing and partial-discharge monitoring, infrared thermography, breaker timing tests and drone or satellite inspection of lines. The most important single quantity for a transformer is the temperature of the hottest spot in its windings, because the cellulose insulation ages exponentially with temperature. Under IEC&nbsp;60076-7, for ordinary paper insulation, the relative ageing rate is</p>

<p class="eqn"><i>V</i> = 2<sup>(&theta;<sub>h</sub> &minus; 98)/6</sup> &nbsp;&nbsp;&nbsp;({#e:ageing})</p>

<p>where &theta;<sub>h</sub> is the hot-spot temperature in &deg;C: the ageing rate doubles for every 6&nbsp;K above 98&nbsp;&deg;C (Figure&nbsp;{#f:ageing}).</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#ageing} &mdash; The cost of running a transformer hot</p>
<p>By ({#e:ageing}), a hot-spot temperature of 104&nbsp;&deg;C gives <i>V</i> = 2; 110&nbsp;&deg;C gives <i>V</i> = 4; 116&nbsp;&deg;C gives <i>V</i> = 8.</p>
<p>A transformer run at a 110&nbsp;&deg;C hot spot for a whole day consumes <span class="ans">four days of normal insulation life</span>. A summer of afternoon overloads during heatwaves can therefore use months of life, unseen unless the hot spot is measured or calculated continuously. Monitoring lets operators overload transformers safely when the grid needs it, by trading a known amount of life for capacity, instead of either refusing the load or ageing the unit blindly.</p></div>

<div class="figrow one"><figure id="fig-{#f:ageing}"><a class="zoom" href="img/power-grid-management-worldwide/fig12_transformer_ageing.svg" target="_blank" rel="noopener"><img src="img/power-grid-management-worldwide/fig12_transformer_ageing.svg" alt="Relative ageing rate of transformer insulation against hot-spot temperature on a log scale" loading="lazy" style="background:#fff;width:100%;max-width:660px"></a><figcaption><b>Figure {#f:ageing}.</b> Relative ageing rate of non-thermally-upgraded transformer insulation against winding hot-spot temperature, from ({#e:ageing}). Each 6&nbsp;K rise doubles the rate.<span class="credit">Chart by the author</span></figcaption></figure></div>

### 5.8 Planning for adequacy

<p>Operation keeps today's grid secure; planning makes sure there will be enough capacity tomorrow. Because generators fail at random, adequacy is a probability problem. Planners combine the forced-outage rates of all units into a probability distribution of available capacity, compare it with forecast load hour by hour, and compute the loss-of-load probability (LOLP), the loss-of-load expectation in hours per year, and the expected energy not served. Reliability standards then set the acceptable level. As wind and solar grow, the same method must also include their weather-driven variability and the energy limits of storage, which is why adequacy studies now simulate thousands of weather years rather than one peak hour.</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#lolp} &mdash; Why one extra unit matters so much</p>
<p>A small system has identical 100&nbsp;MW units, each with a forced-outage rate of 5&nbsp;% (assumed), and a constant load of 400&nbsp;MW. Load is lost whenever fewer than four units are available.</p>
<p>With five units, LOLP = P(two or more out) = 1 &minus; 0.95<sup>5</sup> &minus; 5 &times; 0.05 &times; 0.95<sup>4</sup> = 2.26&nbsp;%, about <span class="ans">198 hours a year</span>. With six units, LOLP = 0.22&nbsp;%, about 19.5 hours; with seven, 0.019&nbsp;%, about <span class="ans">1.7 hours</span> (Figure&nbsp;{#f:lolp}).</p>
<p>Each additional unit of reserve reduces the expected shortfall by roughly a factor of ten. This steep curve is why reliability standards are expressed as probabilities, and why the value of the last increment of firm capacity, or of storage and demand response that can stand in for it, is so high.</p></div>

<div class="figrow one"><figure id="fig-{#f:lolp}"><a class="zoom" href="img/power-grid-management-worldwide/fig13_lolp.svg" target="_blank" rel="noopener"><img src="img/power-grid-management-worldwide/fig13_lolp.svg" alt="Expected hours of shortfall per year for five, six and seven units on a log scale" loading="lazy" style="background:#fff;width:100%;max-width:620px"></a><figcaption><b>Figure {#f:lolp}.</b> Loss-of-load expectation of Example&nbsp;{#lolp}: a 400&nbsp;MW load served by 100&nbsp;MW units with a 5&nbsp;% forced-outage rate.<span class="credit">Chart by the author</span></figcaption></figure></div>

### 5.9 Distribution operation and reliability

<p>Most interruptions that customers experience start not on the transmission grid but on local distribution feeders: a tree on an 11&nbsp;kV line, a failed cable joint, a burnt distribution transformer. Utilities measure this with standard indices: the system average interruption frequency index (SAIFI), the average number of interruptions per customer per year; the system average interruption duration index (SAIDI), the average total minutes or hours without supply; and the customer average interruption duration (CAIDI = SAIDI/SAIFI). Feeder automation, with remotely controlled switches that isolate a faulted section and restore supply to the rest within minutes, is one of the most effective improvements.</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#saidi} &mdash; Reliability indices for a feeder</p>
<p>A feeder serves 2,000 customers. In a year it has three sustained outages: 1,200 customers for 2&nbsp;h, 800 for 1.5&nbsp;h, and all 2,000 for 4&nbsp;h.</p>
<p>SAIFI = (1,200 + 800 + 2,000)/2,000 = <span class="ans">2.0</span> interruptions per customer. SAIDI = (1,200 &times; 2 + 800 &times; 1.5 + 2,000 &times; 4)/2,000 = <span class="ans">5.8&nbsp;h</span>. CAIDI = 2.9&nbsp;h.</p>
<p>If sectionalising switches had halved the customers affected by the second and third outages (assumed), SAIDI would fall to 3.5&nbsp;h, a 40&nbsp;% improvement without any change in the number of faults.</p></div>

## 6. Lessons From Major Blackouts

<p>Large blackouts are rare, and each has a unique chain of causes. But their investigations, carried out with great care by operators and regulators, are the most valuable learning material the industry has. Six are summarised here and in Table&nbsp;{#t:blackouts}.</p>

### 6.1 North America, 14 August 2003

<p>On a hot August afternoon, a series of 345&nbsp;kV lines in northern Ohio sagged into trees and tripped. The alarm system in the responsible utility's control room had failed without the operators realising it, so they did not see the situation deteriorating, and the regional coordinators did not provide adequate support. The binational task force identified inadequate situational awareness and inadequate tree trimming among the causes [@ferc_2003]. Within about an hour the cascade had blacked out an area with about 50&nbsp;million people and 61,800&nbsp;MW of load in eight US states and Ontario [@ntis_2003]; some customers waited up to four days for power. The task force's recommendations led to mandatory, enforceable reliability standards in North America.</p>

### 6.2 India, 30&ndash;31 July 2012

<p>On 30 July 2012 the Northern grid collapsed, affecting more than 400&nbsp;million people for about 13.5 hours; the next day the Northern, Eastern and North-Eastern grids collapsed together, affecting more than 620&nbsp;million people across 22 states, about half of India's population [@wiki_2012]. The southern grid, then not synchronously connected to the rest, was unaffected [@powerline_2012]. The enquiry committees pointed to a stressed, weakened network with several lines out of service, heavy inter-regional flows from over-drawal by some states, and protection that operated on load encroachment rather than faults. The response reshaped Indian grid management: stricter enforcement of scheduling discipline, a stronger and more independent system operator, protection audits, and the synchronisation of the southern grid at the end of 2013 to create one national grid.</p>

### 6.3 South Australia, 28 September 2016

<p>Tornadoes with wind speeds of 190 to 260&nbsp;km/h destroyed transmission towers [@sa_hansard], causing a series of voltage disturbances. Nine wind farms reduced output because their control settings limited the number of ride-through events they would tolerate in a short period, settings that AEMO had not known about. The resulting loss of generation overloaded the interconnector to Victoria, which tripped, and the whole state went black, affecting 850,000 customers [@sa_newdaily; @apo_sa]. The lesson was that the hidden software settings of inverter-based plants matter as much as their nameplate ratings; Australia tightened its performance standards and verification accordingly.</p>

### 6.4 Great Britain, 9 August 2019

<p>A lightning strike on a transmission line was a routine event, but within seconds the Hornsea offshore wind farm and the Little Barford gas station both lost output, along with embedded generation on distribution networks. The total loss exceeded the reserve held, and frequency fell to 48.8&nbsp;Hz, triggering automatic low-frequency demand disconnection of about 1&nbsp;GW and leaving about 1.1&nbsp;million customers without power for a period [@eso_2019]. Rail services in south-east England were disrupted for hours. The two generators paid £4.5&nbsp;million each into the regulator's redress fund [@ofgem_2019].</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#gb} &mdash; What load shedding buys</p>
<p>About 973&nbsp;MW was disconnected to arrest the 2019 fall [@e3c_2019], affecting about 1.1&nbsp;million customers: 973,000&nbsp;kW / 1,100,000 = <span class="ans">about 0.9&nbsp;kW per customer</span>, roughly an average household's afternoon load. Load shedding is blunt: it cuts whole feeders, and on that day it also disrupted rail services. Faster frequency response from batteries, which can act in under a second, aims to make such cuts unnecessary.</p></div>

### 6.5 Texas, February 2021

<p>Winter Storm Uri brought extreme cold to a system planned mainly for summer peaks. Gas wells and pipelines froze, generators of all types failed, and on 15 February frequency in ERCOT fell to 59.302&nbsp;Hz [@ercot_2021], below 59.4&nbsp;Hz for 4 minutes 23 seconds, close to the point where automatic protection would have caused a full collapse [@spg_uri]. The operator ordered up to 20,000&nbsp;MW of rolling outages, the largest manually controlled load shed in US history [@ferc_uri]. For over two days ERCOT averaged about 34,000&nbsp;MW of generation outages, nearly half its all-time winter peak [@ferc_uri_p].</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#ercot} &mdash; The scale of Uri</p>
<p>At the worst point, 52,277&nbsp;MW of ERCOT's 107,514&nbsp;MW installed capacity was unavailable: <span class="ans">48.6&nbsp;%</span> [@ercot_2021]. ERCOT estimated that peak demand without load shed would have been about 76.8&nbsp;GW [@spg_uri]; the 20&nbsp;GW shed was therefore about <span class="ans">26&nbsp;%</span> of the demand customers wanted. No reserve margin chosen for normal weather could have covered a common-mode failure of that size; the remedies were winterisation, gas-electric coordination and planning for extreme weather.</p></div>

### 6.6 Spain and Portugal, 28 April 2025

<p>At 12:32 on a spring day with high solar output, voltage in the Spanish system began to rise uncontrollably. Within about 90 seconds, generators tripped on overvoltage, Iberia lost synchronism with the rest of Europe, and by 12:33:29 the peninsula was completely black [@ds_iberia]. Some areas waited up to 16 hours for supply [@heise_iberia]. ENTSO-E's expert panel found failures across operation, generation and regulation, chiefly in voltage control and reactive-power management, with some overvoltage protections set below regulatory limits, and made 22 recommendations [@pvmag_iberia]. It stressed that there was no single cause and that renewables as such were not the problem; among its recommendations is that solar plants should take part in voltage control [@heise_iberia; @euronews_iberia]. Iberia illustrates the main new risk of inverter-rich grids: the services that synchronous machines provided automatically, here voltage regulation, must be deliberately specified, procured and verified.</p>

<div class="tcap"><b>Table {#t:blackouts}.</b> Six Major Blackouts and Their Lessons</div>

| Event | Affected | Initiating events | Underlying causes | Main lessons |
|---|---|---|---|---|
| North America, Aug 2003 | ≈ 50 million people; 61.8 GW | Line contacts with trees in Ohio | Failed alarms; poor situational awareness; vegetation management | Mandatory reliability standards; operator tools and training |
| India, Jul 2012 | > 620 million people | Line trips on a weakened corridor | Over-drawal; stressed network; protection on load encroachment | Grid discipline; stronger system operator; one national grid |
| South Australia, Sep 2016 | 850,000 customers | Tornadoes destroyed towers | Undisclosed wind-farm ride-through settings; interconnector overload | Verify inverter settings; performance standards |
| Great Britain, Aug 2019 | ≈ 1.1 million customers | Lightning strike | Two near-simultaneous generator losses plus embedded generation | Fault ride-through compliance; faster reserves |
| Texas, Feb 2021 | 20 GW load shed over days | Extreme cold | Common-mode failures of gas and generation; no winterisation | Weatherisation; gas-electric coordination |
| Iberia, Apr 2025 | Mainland Spain and Portugal | Uncontrolled voltage rise | Weak voltage control; protection settings; regulatory gaps | Specify and procure voltage control from all plant |

<p><span class="kw">Restoration.</span> The events also show how much recovery depends on preparation. In India in 2012 supply was restored within about a day of each collapse, helped by hydro black-start units and support from the unaffected regions. Iberia in 2025 restored most supply within the day, using hydro black start and support from France and Morocco, though some areas waited up to 16 hours [@heise_iberia]. In Texas, by contrast, the problem was not restoring a collapsed grid but surviving days of insufficient supply. Restoration speed is a design choice: it depends on black-start capacity, practised plans and communication between operators, generators and distribution companies.</p>

### 6.7 Other notable events

<p>The six cases above are not the whole record. Table&nbsp;{#t:otherevents} lists other events that shaped practice, from the 1965 Northeast blackout that created NERC to the 2015&ndash;2016 cyber attacks on Ukrainian distribution networks and the 2024&ndash;2026 data-centre load losses in Virginia (Section&nbsp;7.10). The pattern of hidden weakness and layered failure recurs in almost every case.</p>

<div class="tcap"><b>Table {#t:otherevents}.</b> Other Events That Shaped Grid Management</div>

| Event | Scale | What it taught |
|---|---|---|
| Northeast US and Canada, Nov 1965 | ≈ 30 million people | Need for coordinated reliability rules; led to NERC (1968) |
| New York City, Jul 1977 | ≈ 9 million people | Lightning, protection failures and operator overload; social cost of long outages |
| Northern India, Jan 2001 | ≈ 230 million people | Weak inter-regional coordination before the 2003 reforms |
| Continental Europe, Nov 2006 | System split into three areas; ≈ 15 million households | Coordination of planned line switching across TSOs |
| Southwest US, Sep 2011 | ≈ 2.7 million people | Situational awareness across utility boundaries |
| Ukraine, Dec 2015 and 2016 | Hundreds of thousands of customers | Cyber attacks can switch off distribution networks |
| Argentina and Uruguay, Jun 2019 | Whole national systems | Defence schemes and protection coordination |
| Virginia, 2024&ndash;2026 | 1.5&ndash;4 GW of data-centre load lost in single events | Large loads need ride-through requirements |

<p>Three threads run through all six cases. First, cascades exploit hidden weaknesses: a failed alarm, an undisclosed setting, a protection relay set too sensitively. Second, the grid's defences are layered, and each blackout happened when several layers failed at once. Third, recovery depends on preparation: black-start capability, restoration plans and practised operators turned some of these events into hours rather than days.</p>
