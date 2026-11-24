<style>
.tcap{font-family:Inter,system-ui,sans-serif;font-size:13.5px;color:var(--ink-soft);margin:22px auto 6px}
.eqn{text-align:center;font-size:1.02em;margin:14px 0;overflow-x:auto}
.worked{margin:20px 0 24px;padding:12px 18px 10px;border-left:4px solid var(--accent);background:var(--tint);border-radius:0 10px 10px 0}
.worked p{margin:6px 0}
.worked .wt{font-family:Inter,system-ui,sans-serif;font-weight:600;font-size:.86em;letter-spacing:.02em;color:var(--accent)}
.worked .ans{font-weight:600}
.kw{font-style:italic}
@media print{.worked{padding:5pt 8pt;margin:7pt 0;break-inside:avoid}.eqn{margin:6pt 0}}
</style>

## Abstract

<p>Electricity use by data centres was about 415&nbsp;TWh in 2024, roughly 1.5&nbsp;% of world demand. The International Energy Agency (IEA) expects it to more than double to about 945&nbsp;TWh by 2030, with demand from AI-focused facilities roughly tripling [@iea2025; @iea2026]. Demand grew by 17&nbsp;% in 2025 alone, against 3&nbsp;% for electricity as a whole [@iet2026]. Power plants, transmission lines and grid connections take far longer to build than data halls, so the surge arrives as a local crunch: connection queues, delayed projects and strained city grids. This paper asks a practical question: how much of the surge can be absorbed by running existing and new data centres better, and by upgrading them, before new supply is needed? The facility is treated as a chain of five layers, namely software and models, IT hardware, cooling, power delivery and the grid connection, and the main levers in each are quantified with worked calculations. These cover power usage effectiveness (PUE), fan and pump affinity laws, chiller performance against chilled-water temperature, losses in each power-conversion stage, 800&nbsp;V DC distribution, idle servers, server consolidation, demand flexibility, heat reuse and water use. A separate section applies the same arithmetic to India, where capacity has grown from 375&nbsp;MW in 2020 to about 1.8&nbsp;GW and is heading above 4&nbsp;GW by 2030, with Chennai as the second hub. The global average PUE has been almost flat at about 1.54 for six years [@uptime2025], so a large part of the fleet runs well below what is already proven. Lifting the fleet to a PUE of 1.30 alone would cut total consumption by 15.6&nbsp;%. Combining the levers, the author's indicative estimate is that a determined efficiency push could take 170 to 345&nbsp;TWh out of the 2030 projection, which is one-third to two-thirds of the expected growth. Efficiency cannot replace new clean supply, but it buys time, frees grid capacity and lowers cost. The paper ends with a retrofit road map, recommendations for operators and policy makers, and the caveat that cheaper computation also invites more of it.</p>

<p><b>Index Terms</b>&mdash;Data centres, electricity demand, artificial intelligence, power usage effectiveness, liquid cooling, chiller efficiency, affinity laws, 800 V DC, UPS, server utilisation, demand flexibility, waste-heat reuse, water usage effectiveness, India, Chennai.</p>

## 1. Introduction

<p>Every search, video call, payment and AI answer runs on a server in a data centre. Each such building is a large, steady electrical load: it draws power around the clock, converts nearly all of it into heat, and then spends more electricity removing that heat. For a decade this load grew slowly. Efficiency gains in servers, virtualisation and the move to large cloud facilities kept total consumption almost flat while computing output rose many times over. That balance has now broken. Training and serving large AI models needs racks of accelerators that draw many times the power of a conventional server rack, and investment in such capacity has risen faster than at any time in the industry's history [@iea2026; @ecobiz2026].</p>

<p>The public discussion of this surge usually turns to the supply side: new gas turbines, nuclear restarts, small modular reactors, renewable power purchase agreements. These matter, but they are slow. A data hall can be built in two to three years, whereas generation and transmission take longer to plan, approve and build [@iea2025ch2]. The IEA estimates that about one-fifth of planned data-centre projects could face delays unless grid constraints are addressed [@iea2025; @nsenergy]. In the meantime, the fastest and cheapest source of "new" capacity is the electricity that data centres already draw but do not turn into useful computation.</p>

<p>The question this paper addresses is therefore one of engineering accounting. Of each kilowatt-hour a data centre takes from the grid, how much does useful work, how much is lost on the way, and how much of that loss can be recovered by better operation and by upgrades? And when the answers are added up across the world's fleet, how much of the projected growth do they offset? The approach is that of a mechanical and instrumentation engineer rather than a computer scientist. Cooling plants, pumps, fans, chillers, transformers and converters are machines with known performance laws, and much of the waste in data centres is the familiar waste of any industrial plant: oversized equipment run at part load, fixed-speed drives, poor set points, fouled heat exchangers and machines left running with nothing to do.</p>

<p>The paper is organised as follows. Section&nbsp;2 sets out the size and shape of the surge. Section&nbsp;3 explains the metrics, chiefly PUE, and why the global average has stalled. Sections&nbsp;4 to 8 work through the five layers of Figure&nbsp;1, from software down to the grid connection, each with worked calculations. Section&nbsp;9 deals with heat reuse and water. Section&nbsp;10 applies the analysis to India and Chennai. Section&nbsp;11 describes the metering and monitoring on which all of this depends. Section&nbsp;12 gives a retrofit road map for existing sites, with a worked case for a Chennai colocation hall. Section&nbsp;13 combines the levers into an estimate of how much growth efficiency can absorb, and sets out what efficiency cannot do. Section&nbsp;14 gives recommendations and Section&nbsp;15 concludes. All calculation inputs are stated; values marked as assumed are typical engineering figures rather than measurements of any particular site, and the scripts that produce every number and chart are kept with the paper's sources.</p>

<div class="figrow one"><figure id="fig-1"><a class="zoom" href="img/data-centre-power-demand-efficiency/fig1_layers.svg" target="_blank" rel="noopener"><img src="img/data-centre-power-demand-efficiency/fig1_layers.svg" alt="Five stacked layers of a data centre from grid connection to software, each with its efficiency levers" loading="lazy" style="background:#fff;width:100%;max-width:820px"></a><figcaption><b>Figure 1.</b> The data centre as a chain of five layers between the grid and useful work. Each layer loses energy, and each has its own levers for recovering it. Savings in the lower layers (software and hardware) are multiplied by every layer above them, because each watt not used by a server is also a watt that need not be converted, distributed or cooled.<span class="credit">Diagram by the author</span></figcaption></figure></div>

## 2. The Size and Shape of the Surge

### 2.1 Global numbers

<p>The IEA's 2025 special report <i>Energy and AI</i> put data-centre electricity use at about 415&nbsp;TWh in 2024, roughly 1.5&nbsp;% of global consumption, having grown at about 12&nbsp;% a year over the previous five years [@iea2025ch2]. In its Base Case, consumption rises to about 945&nbsp;TWh by 2030, a little more than Japan's present total use and just under 3&nbsp;% of world electricity, and to about 1,200&nbsp;TWh by 2035 [@iea2025]. The agency's April 2026 update, <i>Key Questions on Energy and AI</i>, kept the central projection close to that path but recorded that consumption rose by 17&nbsp;% in 2025 and that consumption in AI-focused data centres rose by about half in that one year [@iea2026; @iet2026; @ecobiz2026]. Its <i>World Energy Outlook</i> of November 2026 puts 2030 consumption at up to about 1,000&nbsp;TWh under stated policies [@euronews2026]. Figure&nbsp;2 shows the path.</p>

<div class="figrow one"><figure id="fig-2"><a class="zoom" href="img/data-centre-power-demand-efficiency/fig2_demand.svg" target="_blank" rel="noopener"><img src="img/data-centre-power-demand-efficiency/fig2_demand.svg" alt="Bar chart of global data-centre electricity in 2024, 2025, 2030 and 2035 with IEA sensitivity cases" loading="lazy" style="background:#fff;width:100%;max-width:760px"></a><figcaption><b>Figure 2.</b> Global data-centre electricity consumption. 2024 from the IEA [@iea2025]; 2025 estimated by applying the reported 17&nbsp;% growth [@iet2026]; 2030 and 2035 from the IEA Base Case. Markers show the 2035 High Efficiency case (about 970&nbsp;TWh) and Lift-Off case (more than 1,700&nbsp;TWh) [@iea2025ch2].<span class="credit">Chart by the author</span></figcaption></figure></div>

<p>Two numbers help to make the scale tangible. Consumption of 945&nbsp;TWh a year is an average load of about 108&nbsp;GW, against about 47&nbsp;GW in 2024. The rise from 2024 to 2030 is therefore about 530&nbsp;TWh, equivalent to adding some 60&nbsp;GW of round-the-clock load in six years, a compound growth rate of 14.7&nbsp;% a year. The spread between the IEA's sensitivity cases is also instructive. In 2035 the High Efficiency case is about 970&nbsp;TWh and the Lift-Off case more than 1,700&nbsp;TWh [@iea2025ch2]. The difference between those two futures, more than 700&nbsp;TWh, is larger than total data-centre use today. Efficiency is therefore not a side issue in the projections; it is one of the main variables.</p>

<div class="tcap"><b>Table {#t:keyfig}.</b> Key Figures on Data-Centre Electricity Demand</div>

| Quantity | Value | Source |
|---|---|---|
| Global consumption, 2024 | ≈415 TWh (≈1.5 % of world electricity) | [@iea2025] |
| Growth in 2025 | +17 % (all electricity: +3 %) | [@iet2026] |
| IEA Base Case, 2030 | ≈945 TWh (just under 3 %) | [@iea2025] |
| IEA Base Case, 2035 | ≈1,200 TWh | [@iea2025] |
| Share of 2024 use: United States / China / Europe | 45 % / 25 % / 15 % | [@iea2025] |
| Servers' share of a modern data centre's use | ≈60 % on average | [@iea2025ch2] |
| Cooling share of a data centre's use | ≈7 % (efficient hyperscale) to over 30 % (less efficient) | [@iea2025ch2] |
| Global average PUE, 2025 / 2026 surveys | 1.54 / 1.52 | [@uptime2025; @uptime2026] |
| Data-centre share of global demand growth to 2030 | ≈10 % | [@iea2025] |

### 2.2 Why AI changes the character of the load

<p>The surge is not just more of the same. Three features of AI computing change the engineering problem. The first is <span class="kw">power density</span>. Conventional air-cooled racks were designed for kilowatts each. Racks of AI accelerators now exceed 200&nbsp;kW, and the power industry is preparing for racks of 1&nbsp;MW from 2027 [@nv800]. At such densities air cannot carry the heat away, and the low-voltage distribution inside the rack runs into the limits of copper. The second is <span class="kw">load shape</span>. An AI training cluster works as one synchronous machine, so thousands of accelerators ramp up and down together, unlike a conventional facility running thousands of unrelated tasks whose fluctuations average out [@nv800eco]. The grid then sees large, fast swings instead of a flat load. The third is <span class="kw">location</span>. Data centres cluster where fibre, land and power are available, so their impact on local grids is far larger than their global share suggests. The IEA notes that a typical AI-focused data centre uses as much electricity as 100,000 households, and that the largest under construction will use twenty times as much [@iea2025].</p>

### 2.3 Where the surge bites

<p>The constraint is rarely the world's total generating capacity; it is the local connection. A 300&nbsp;MW campus needs a high-voltage substation, a transmission path with spare capacity and enough firm generation in the region at peak hours. Each takes years to provide. In the United States, where data centres are expected to account for almost half of electricity demand growth to 2030 [@iea2025], grid operators have long queues of large-load connection requests. In Mumbai, data centres already draw about 250&nbsp;MW, around 5&nbsp;% of the city's peak demand [@gri2026]. India's main hubs, Chennai among them, are already reported to be straining under power and water limits [@thestar2026]. The surge is thus best seen as a race between the speed of digital construction and the speed of electrical construction. Every megawatt saved inside existing fences narrows that gap.</p>

### 2.4 A sense of proportion

<p>It is worth keeping perspective. The IEA expects data centres to account for only about one-tenth of global electricity demand growth to 2030, less than industrial motors, air conditioning or electric vehicles [@iea2025; @dcd2025]. The lessons in this paper therefore apply well beyond data centres; motors, fans, pumps and chillers dominate all of those other loads too. But data centres are unusual in three ways that make efficiency especially valuable: they run at high load factor all year, their growth is concentrated in a few places, and their owners are large, technically capable companies that can act quickly.</p>

## 3. Measuring What Matters: PUE and Beyond

### 3.1 Power usage effectiveness

<p>The standard measure of facility efficiency is power usage effectiveness, defined by The Green Grid and standardised as ISO/IEC 30134-2 [@iso30134]:</p>

<p class="eqn"><i>PUE</i> = <i>E</i><sub>facility</sub> / <i>E</i><sub>IT</sub> &nbsp;&nbsp;&nbsp;(1)</p>

<p>where <i>E</i><sub>facility</sub> is the total annual energy entering the site and <i>E</i><sub>IT</sub> is the energy delivered to IT equipment (servers, storage and network). A PUE of 1.0 would mean that every kilowatt-hour reaches the IT equipment; a PUE of 2.0 means that cooling, power conversion, lighting and other overheads use as much as the IT itself. The share of site energy lost to overhead is</p>

<p class="eqn"><i>f</i><sub>overhead</sub> = (<i>PUE</i> &minus; 1) / <i>PUE</i> &nbsp;&nbsp;&nbsp;(2)</p>

<p>and, for the same IT work, the fractional saving in total energy when PUE improves from <i>PUE</i><sub>1</sub> to <i>PUE</i><sub>2</sub> is</p>

<p class="eqn"><i>S</i> = 1 &minus; <i>PUE</i><sub>2</sub> / <i>PUE</i><sub>1</sub> &nbsp;&nbsp;&nbsp;(3)</p>

<div class="figrow one"><figure id="fig-3"><a class="zoom" href="img/data-centre-power-demand-efficiency/fig3_pue_trend.svg" target="_blank" rel="noopener"><img src="img/data-centre-power-demand-efficiency/fig3_pue_trend.svg" alt="Line chart of average annual PUE from Uptime Institute surveys, 2007 to 2026" loading="lazy" style="background:#fff;width:100%;max-width:760px"></a><figcaption><b>Figure 3.</b> Average annual PUE reported in the Uptime Institute's global surveys: 2.50 in 2007, 1.58 in 2018, 1.67 in 2019, between 1.54 and 1.59 from 2020 to 2025, and 1.52 in 2026 [@uptime2025; @uptime2026; @credence]. The dashed line marks about 1.1, implied by the IEA's estimate that cooling takes about 7&nbsp;% of consumption at efficient hyperscale sites [@iea2025ch2].<span class="credit">Chart by the author</span></figcaption></figure></div>

### 3.2 The stalled average

<p>Figure&nbsp;3 tells an uncomfortable story. Average PUE fell quickly in the decade to 2018 as operators adopted hot- and cold-aisle containment, raised temperatures and built large, purpose-designed facilities. It then stopped improving. The Uptime Institute's 2025 survey of more than 800 operators found a weighted average of 1.54 for the sixth year in a row [@uptime2025; @mgrid2025]; the 2026 survey reported 1.52, with larger facilities pulling ahead [@uptime2026]. The flat average hides a wide spread: new hyperscale campuses operate near 1.1 to 1.2, while many older enterprise and colocation rooms still run at 1.7 to 2.0; the US Federal Energy Management Program still treats 2.0 as the PUE of a data centre of average efficiency [@femp]. The average is held up by this long tail of older sites. Figure&nbsp;4 shows what the spread means for where each unit of electricity goes.</p>

<div class="figrow one"><figure id="fig-4"><a class="zoom" href="img/data-centre-power-demand-efficiency/fig4_energy_split.svg" target="_blank" rel="noopener"><img src="img/data-centre-power-demand-efficiency/fig4_energy_split.svg" alt="Stacked bars showing IT, cooling, power losses and other shares at PUE 1.8, 1.54, 1.25 and 1.10" loading="lazy" style="background:#fff;width:100%;max-width:780px"></a><figcaption><b>Figure 4.</b> Share of site electricity reaching IT equipment at four PUE levels, from (2). The overhead is split 70&nbsp;% cooling, 20&nbsp;% power-chain losses and 10&nbsp;% lighting and other loads; this split is an assumed typical value for illustration and varies from site to site.<span class="credit">Chart by the author</span></figcaption></figure></div>

<div class="worked"><p class="wt">WORKED EXAMPLE {#pue} &mdash; What the stalled average costs</p>
<p>At PUE 1.54, by (2) the overhead is 0.54/1.54 = 35.1&nbsp;% of site energy. At 1.30 it is 23.1&nbsp;%.</p>
<p>For the 2024 global fleet: <i>E</i><sub>IT</sub> = 415/1.54 = 269.5&nbsp;TWh. At PUE 1.30 the same IT work would need 269.5 &times; 1.30 = 350.3&nbsp;TWh. The saving is 415 &minus; 350.3 = <span class="ans">64.7&nbsp;TWh a year, or 15.6&nbsp;% by (3)</span>. Lifting the fleet to 1.20 would save 22.1&nbsp;%.</p>
<p>For a single 10&nbsp;MW IT hall, PUE 1.54 instead of 1.30 costs 10 &times; 0.24 &times; 8,760 = <span class="ans">21,000&nbsp;MWh a year</span>, enough to supply roughly 2.4&nbsp;MW of extra IT load at the better PUE without any new grid connection.</p></div>

### 3.3 The limits of PUE

<p>PUE is useful but easily misread. It is a ratio, so it says nothing about whether the IT equipment does useful work. A room of idle servers at PUE 1.2 is far more wasteful than a busy room at PUE 1.5. PUE also depends on where the boundary of "IT" is drawn. Server fans are counted as IT load, so when direct liquid cooling removes most of the server fans, IT power falls and PUE can rise even though total power falls. The joint Vertiv and NVIDIA study of a hybrid air-and-liquid-cooled facility found exactly this: moving 75&nbsp;% of the heat load to direct-to-chip cooling cut total site power by 10.2&nbsp;% while PUE changed by only 3&nbsp;% [@vertiv_liquid]. PUE also varies with climate and season, so comparisons between sites in Chennai and in Sweden are of limited meaning. It ignores water, which can be traded against electricity (Section&nbsp;9), and it ignores the carbon content of the electricity used.</p>

### 3.4 Metrics of useful work

<p>What society actually wants is computation delivered per unit of energy: queries answered, models trained, transactions processed, per kilowatt-hour. Such metrics are harder to standardise because workloads differ, but they are the ones that capture the largest savings. Table&nbsp;{#t:metrics} lists the main metrics in use and what each captures.</p>

<div class="tcap"><b>Table {#t:metrics}.</b> Efficiency Metrics for Data Centres</div>

| Metric | Definition | What it captures | What it misses |
|---|---|---|---|
| PUE | Site energy / IT energy | Cooling and power-chain overhead | Whether the IT does useful work; water; carbon |
| WUE | Site water (L) / IT energy (kWh) | Water drawn for cooling | Water used to generate the electricity |
| CUE | Site CO₂ / IT energy | Carbon intensity of supply | Embodied carbon in equipment |
| Server utilisation | Average busy fraction of CPUs or accelerators | Idle and over-provisioned capacity | Efficiency of the software running |
| Energy per task | Wh per query, per token or per training run | End-to-end efficiency of hardware and software | Hard to compare across different workloads |
| Heat reuse factor | Heat exported / site energy | Value recovered from waste heat | Temperature (quality) of the heat |

## 4. Software and Models: The Cheapest Watts

<p>The least visible layer offers the largest savings, because a watt not used by a processor is also a watt that need not be converted, distributed or cooled. Software efficiency is also the layer where progress has been fastest. The IEA found that, measured per AI task, energy use has dropped by at least an order of magnitude a year in recent years, a rate of improvement it describes as unprecedented in energy history [@iea2026]. Independent and company measurements now put the median energy of a simple text query to a large model at about 0.24 to 0.34&nbsp;Wh, about as much as a microwave oven uses in one second [@owid2026; @brookings]. A bottom-up study by Microsoft researchers estimated a median of 0.31&nbsp;Wh per query for optimised frontier-scale serving and found that recent improvements in model design, serving software and hardware could together reduce energy use by 8 to 20 times [@msr2026].</p>

<p>The difficulty is that demand is shifting to much heavier uses. Reasoning models, video generation and "agentic" systems that work through many steps can use hundreds or thousands of times more energy per request than simple text generation [@iea2026]. AI's energy demand is therefore the net of three fast and uncertain trends: efficiency per task, the number of users, and the energy intensity of the tasks they choose. Software efficiency is the lever operators control most directly. Table&nbsp;{#t:software} lists the main techniques.</p>

<div class="tcap"><b>Table {#t:software}.</b> Software and Model-Level Efficiency Levers</div>

| Lever | How it saves energy | Typical effect | Trade-off |
|---|---|---|---|
| Smaller or distilled models | Route easy requests to a small model; keep the large model for hard ones | Several-fold per routed request | Needs a good router; quality checks |
| Quantisation (8-bit, 4-bit) | Fewer bits moved and multiplied per operation | Large cut in memory traffic and energy per token | Small accuracy loss if done badly |
| Batching and continuous batching | Keeps accelerators busy; spreads fixed power over more requests | Large rise in tokens per joule | Slightly higher latency |
| Caching of prompts and results | Avoids recomputing repeated context | Proportional to repeat rate | Memory use |
| Limits on reasoning length | Stops unnecessary long chains of thought | Proportional to tokens avoided | Must not cut needed reasoning |
| Carbon- and grid-aware scheduling | Moves deferrable training and batch jobs to hours of surplus power | No energy saving; lowers peak and carbon | Needs flexible deadlines |
| Efficient code and data | Removes redundant jobs, copies, logging and retention | Varies; often large in older estates | Engineering time |

<p>For an operator, the practical message is that energy per useful output should be measured and reported alongside latency and accuracy. A service that answers the same questions with one-third of the tokens, or on a model one-tenth the size, saves energy at every layer below it.</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#ai} &mdash; Routing, and how a change in the mix can swamp it</p>
<p>Assume a service answers one billion text queries a day at 0.3&nbsp;Wh each [@msr2026]: 3 &times; 10<sup>8</sup>&nbsp;Wh = 300&nbsp;MWh a day, an average IT load of 12.5&nbsp;MW.</p>
<p>Routing: if 70&nbsp;% of queries can be answered by a small model using one-tenth of the energy (assumed), the average becomes 0.3 &times; 0.3 + 0.7 &times; 0.03 = 0.111&nbsp;Wh, a cut of <span class="ans">63&nbsp;%</span>, to 4.6&nbsp;MW.</p>
<p>Mix: if instead 10&nbsp;% of queries turn into agentic tasks using 100 times the energy of a simple query (the lower end of the range reported by the IEA [@iea2026]), the average becomes 0.9 &times; 0.3 + 0.1 &times; 30 = 3.27&nbsp;Wh, <span class="ans">almost eleven times</span> the original. A modest shift in what users ask for outweighs a large gain in how efficiently each request is served. This is why AI's total demand can grow fast even while energy per task falls fast.</p></div>

## 5. IT Hardware and Utilisation

### 5.1 Servers that do nothing

<p>A surprisingly large share of servers in conventional data centres do no useful work at all. A study by Koomey and Taylor using monitoring data from about 4,000 physical servers found that 30&nbsp;% were "comatose", meaning they had delivered no computing service for six months or more; a later study of 16,000 servers put the figure at 25&nbsp;% of physical and 30&nbsp;% of virtual servers [@koomey2015; @koomey2017]. Earlier work by McKinsey and the Uptime Institute had found similar shares [@koomey2015]. The cause is managerial, not technical: servers are installed for projects that end, nobody is sure what they do, and switching them off feels risky. Such servers still draw their idle power, typically about half of their full-load power, and still need cooling.</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#idle} &mdash; Idle servers in an enterprise data centre</p>
<p>Assume an enterprise site with 4,000 servers, of which 25&nbsp;% are comatose, each drawing an idle power of 180&nbsp;W, at a site PUE of 1.7 (typical of older rooms).</p>
<p>IT load of idle servers = 1,000 &times; 180&nbsp;W = 180&nbsp;kW. Site load = 180 &times; 1.7 = 306&nbsp;kW.</p>
<p>Annual energy = 306 &times; 8,760 = <span class="ans">2,681&nbsp;MWh</span>. At an assumed tariff of &#8377;8/kWh this is <span class="ans">about &#8377;2.1&nbsp;crore a year</span>, spent on computers that do nothing. Finding and removing them needs only an inventory, traffic monitoring and a decommissioning process.</p></div>

### 5.2 Utilisation and energy proportionality

<p>Servers that are in use are often lightly loaded. A server's power rises roughly linearly with utilisation from a substantial idle floor, so a server at low utilisation uses far more energy per unit of work than one at moderate load. A simple linear model is</p>

<p class="eqn"><i>P</i>(<i>u</i>) = <i>P</i><sub>idle</sub> + (<i>P</i><sub>max</sub> &minus; <i>P</i><sub>idle</sub>) <i>u</i> &nbsp;&nbsp;&nbsp;(4)</p>

<p>where <i>u</i> is utilisation between 0 and 1. The energy per unit of work is <i>P</i>(<i>u</i>)/<i>u</i>, which rises steeply as <i>u</i> falls (Figure&nbsp;5).</p>

<div class="figrow one"><figure id="fig-5"><a class="zoom" href="img/data-centre-power-demand-efficiency/fig8_server_model.svg" target="_blank" rel="noopener"><img src="img/data-centre-power-demand-efficiency/fig8_server_model.svg" alt="Server power and energy per unit of work against CPU utilisation" loading="lazy" style="background:#fff;width:100%;max-width:740px"></a><figcaption><b>Figure 5.</b> Linear server power model (4) with <i>P</i><sub>idle</sub> = 180&nbsp;W and <i>P</i><sub>max</sub> = 400&nbsp;W (assumed typical two-socket server). At 12&nbsp;% utilisation each unit of work costs about three times as much energy as at 50&nbsp;%.<span class="credit">Chart by the author</span></figcaption></figure></div>

<div class="worked"><p class="wt">WORKED EXAMPLE {#consol} &mdash; Consolidation by virtualisation</p>
<p>100 servers run at an average utilisation of 12&nbsp;%. By (4), each draws 180 + 220 &times; 0.12 = 206.4&nbsp;W, a total of 20.64&nbsp;kW.</p>
<p>The total work is 100 &times; 0.12 = 12 server-equivalents. Consolidated onto hosts running at 50&nbsp;%, it needs 12/0.5 = 24 servers, each drawing 180 + 220 &times; 0.5 = 290&nbsp;W, a total of 6.96&nbsp;kW.</p>
<p>The IT power falls by <span class="ans">66&nbsp;%</span>, before counting the cooling and conversion losses that also disappear. If the 24 hosts are also replaced by a newer generation with twice the work per watt, the saving exceeds 80&nbsp;%.</p></div>

### 5.3 Hardware refresh and power management

<p>Each new generation of processors and accelerators does more work per watt, so retiring old equipment is an efficiency measure in its own right. The decision balances operating energy saved against the embodied energy and cost of the new hardware; for servers that run continuously, a refresh cycle of four to six years is commonly judged to pay off. Other hardware-level measures are cheaper still: enabling processor power-saving states that many operators disable out of caution, capping the power of accelerators at a point slightly below their maximum (where performance per watt is usually best), and right-sizing storage tiers so that rarely used data sits on low-power media.</p>

<p>For AI clusters the equivalent of utilisation is keeping expensive accelerators busy. An idle accelerator still draws a large share of its rated power, and the cooling and power plant sized for its peak still runs. Good scheduling, sharing of clusters between teams and early detection of failed or stalled jobs therefore matter as much as the choice of chip.</p>
