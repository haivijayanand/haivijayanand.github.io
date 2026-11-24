
## 9. India: Managing One of the World's Fastest-Growing Grids

### 9.1 From five regional grids to one

<p>India's grid grew as five regional systems, Northern, Eastern, Western, North-Eastern and Southern, each with its own frequency and only asynchronous or limited links between them. The regions were progressively synchronised over the 2000s, and the connection of the Southern grid at the end of 2013 created a single national synchronous grid operating at one frequency, a programme known as "One Nation, One Grid, One Frequency". The national system operator, formerly POSOCO and now Grid Controller of India (Grid-India), runs the national and regional load despatch centres, while state load despatch centres manage intra-state networks. The 2012 blackouts (Section&nbsp;6.2) were a turning point: since then, scheduling discipline, protection audits, a strong system operator and a rapidly growing transmission network have kept India free of a grid collapse of that scale.</p>

### 9.2 Demand and supply in 2026

<p>India's peak demand keeps setting records. It reached 243.27&nbsp;GW in September 2023 and 250&nbsp;GW in May 2024 [@tribune_peak], 256.1&nbsp;GW on 25 April 2026 [@rw_peak] and 270.8&nbsp;GW in May 2026 [@energetica_q1]. In the April 2026 heatwave actual peak demand ran 16&nbsp;GW above the operator's weekly projection, and in non-solar hours there were shortages of 5.4 and 4.2&nbsp;GW on two consecutive days even though the daytime peak was fully met [@dte_256]. Installed capacity was about 552&nbsp;GW at the end of July 2026, of which 300.5&nbsp;GW, more than 54&nbsp;%, was non-fossil: 164.59&nbsp;GW solar, 58.14&nbsp;GW wind, 57.24&nbsp;GW hydro, 11.75&nbsp;GW bio-power and 8.78&nbsp;GW nuclear [@mercom_300; @outlook_300]. A record 55.29&nbsp;GW of non-fossil capacity, including 44.6&nbsp;GW of solar, was added in 2025&ndash;26 [@mercom_300], and variable renewable generation reached an all-time high of 103.7&nbsp;GW in July 2026, 75&nbsp;GW of it solar [@energetica_q1].</p>

<div class="figrow one"><figure id="fig-{#f:india}"><a class="zoom" href="img/power-grid-management-worldwide/fig8_india_demand_capacity.svg" target="_blank" rel="noopener"><img src="img/power-grid-management-worldwide/fig8_india_demand_capacity.svg" alt="India peak demand records and installed capacity by source" loading="lazy" style="background:#fff;width:100%;max-width:840px"></a><figcaption><b>Figure {#f:india}.</b> Left: all-India peak demand met at successive records [@tribune_peak; @rw_peak; @energetica_q1]. Right: installed capacity by source at 31 July 2026 [@mercom_300; @outlook_300]; "Fossil" is the remainder of the approximately 552&nbsp;GW total.<span class="credit">Chart by the author</span></figcaption></figure></div>

<p>The structure of the problem is now clear. Capacity is ample by nameplate, but much of it is solar, so the daytime peak is relatively easy to meet and the evening, after sunset, is the hard part. India's grid must manage a steep evening ramp, high frequency and curtailment at midday, and adequate supply in the non-solar hours, all at once.</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#peak} &mdash; Who met the 256 GW peak?</p>
<p>At the record peak of 256.1&nbsp;GW at 15:38 on 25 April 2026, solar supplied 21.5&nbsp;% [@energetica_256]: 0.215 &times; 256.1 = <span class="ans">about 55&nbsp;GW</span>. Gas supplied only about 2&nbsp;% from 4.9&nbsp;GW online [@dte_256]. Most of the remaining 200&nbsp;GW came from coal, with hydro, wind and nuclear.</p>
<p>Four hours later, after sunset, that 55&nbsp;GW of solar was gone while demand stayed high. The shortages of 4 to 5&nbsp;GW in non-solar hours on those days [@dte_256] show exactly where India's reliability margin is thinnest: not at the headline peak, but in the evening.</p></div>

### 9.3 Frequency management

<p>The Indian Electricity Grid Code sets a normal operating band of 49.90 to 50.05&nbsp;Hz. Grid-India's target for 2024&ndash;25 was to keep frequency within this band 90&nbsp;% of the time [@posoco_mou]. Actual performance has been lower as solar has grown, mainly because of high frequency at midday. In January 2026, frequency was within the band 78.26&nbsp;% of the time, above 50.05&nbsp;Hz 17.16&nbsp;% and below 49.90&nbsp;Hz 4.58&nbsp;%, ranging from 49.58 to 50.35&nbsp;Hz (Figure&nbsp;{#f:indfreq}) [@ppd_jan]. On 39 days in the second half of 2024&ndash;25, frequency was above the band for more than 20&nbsp;% of the day, and instantaneous variable-renewable penetration had reached about 37&nbsp;% [@mercom_freq]. On 25 May 2025 the operator backed the thermal fleet down to about 58&nbsp;% and curtailed nearly 10&nbsp;GW of solar, yet frequency still rose to 50.48&nbsp;Hz; progress towards a 55&nbsp;% technical minimum for coal units is being held back by commercial and regulatory factors [@cw_curtail].</p>

<div class="figrow one"><figure id="fig-{#f:indfreq}"><a class="zoom" href="img/power-grid-management-worldwide/fig10_india_frequency.svg" target="_blank" rel="noopener"><img src="img/power-grid-management-worldwide/fig10_india_frequency.svg" alt="Share of time below, within and above India's frequency band in January 2026" loading="lazy" style="background:#fff;width:100%;max-width:620px"></a><figcaption><b>Figure {#f:indfreq}.</b> Share of time that all-India frequency was below, within and above the IEGC band of 49.90&ndash;50.05&nbsp;Hz in January 2026 [@ppd_jan].<span class="credit">Chart by the author</span></figcaption></figure></div>

<div class="worked"><p class="wt">WORKED EXAMPLE {#indfreq} &mdash; Hours outside the band</p>
<p>January has 744 hours. Outside the band 21.74&nbsp;% of the time means <span class="ans">about 162 hours</span>, of which 128 hours were above 50.05&nbsp;Hz and 34 hours below 49.90&nbsp;Hz. Meeting the 90&nbsp;% target would mean no more than 74 hours outside the band, so the excess is about 88 hours a month, mostly sunny middays when there is more generation than the system can absorb.</p></div>

<p>The problem is not new. On 4 August 2024 frequency stayed above the 50.05&nbsp;Hz limit for 26.27&nbsp;% of the day, with an average of 50.032&nbsp;Hz, prompting Grid-India to publish a report on high-frequency operation [@pl_hf]. High frequency is the visible symptom of a system that cannot reduce conventional output fast or far enough when solar is plentiful and demand is moderate.</p>

### 9.4 Markets and scheduling

<p>India's short-term electricity markets have grown steadily since the first power exchange opened in 2008: a day-ahead market from 2009, a real-time market in 2020 and a green term-ahead market in 2021 [@pl_mc]. One exchange has held most of the volume, so prices could differ between exchanges. In July 2025 the regulator approved the phased coupling of exchanges, beginning with the day-ahead market, so that bids from all exchanges are matched centrally to a single clearing price [@mercom_mc]; in April 2026 it issued draft regulations proposing Grid-India as the sole market coupling operator for the day-ahead and real-time markets [@en_mco]. Coupling is a step towards market-based economic despatch across the country, the Indian counterpart of the equal-incremental-cost principle of Section&nbsp;5.2.</p>

### 9.5 Transmission

<p>India's National Electricity Plan for transmission sets out an expansion of the network from 4.85&nbsp;lakh circuit-kilometres (ckm) in 2024 to 6.48&nbsp;lakh ckm by 2032, with inter-regional transfer capacity rising from 119 to 168&nbsp;GW, nine new HVDC links totalling 33.25&nbsp;GW in addition to 33.5&nbsp;GW in service, and an investment of ₹9.15&nbsp;lakh crore, to meet a projected peak of 458&nbsp;GW by 2032 [@dh_nep]. The plan provides for 47&nbsp;GW of battery storage and the evacuation of 280&nbsp;GW of variable renewable energy through the inter-state system by 2030 [@bt_nep; @dh_nep]. By June 2026 the network had reached about 5.09&nbsp;lakh ckm, after 35,172&nbsp;ckm were commissioned between 2023&ndash;24 and 2025&ndash;26 [@sq_trans].</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#pace} &mdash; Is the build rate fast enough?</p>
<p>Recent pace: 35,172&nbsp;ckm in three years = <span class="ans">about 11,700&nbsp;ckm per year</span>.</p>
<p>Required pace: from 5.09 to 6.48&nbsp;lakh ckm between mid-2026 and 2032, that is 1.39&nbsp;lakh ckm in about six years, or <span class="ans">about 23,200&nbsp;ckm per year</span>. The build rate must roughly double, at a time when transformers and cables are in short global supply (Section&nbsp;7.3). Right-of-way and forest clearances, traditionally the slowest steps, will decide whether it is achieved. Grid-enhancing technologies and storage can buy time on the most congested corridors.</p></div>

### 9.6 Storage

<p>India's storage sector is moving from tenders to commissioning. As of June 2026, commissioned storage was about 10.3&nbsp;GW: 7.4&nbsp;GW (36&nbsp;GWh) of pumped hydro and 2.9&nbsp;GW (8.3&nbsp;GWh) of batteries, with a pipeline of more than 100&nbsp;GW [@ieefa_jun]. About 8.2&nbsp;GWh of batteries were added in the first half of 2026 alone, compared with under 0.1&nbsp;GWh a year earlier [@pvmag_h1]. The targets for 2030 are about 41.65&nbsp;GW of batteries and 18.98&nbsp;GW of pumped hydro [@energiaest]. Policy support includes viability-gap funding, energy storage obligations and waivers of inter-state transmission charges [@pvmag_sesi].</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#bess} &mdash; Storage for a quarter of the evening ramp</p>
<p>If batteries are to cover 25&nbsp;% of a 60&nbsp;GW evening ramp for four hours: power = 15&nbsp;GW; energy = 15 &times; 4 = <span class="ans">60&nbsp;GWh</span>.</p>
<p>That is about 7.2 times India's battery energy commissioned by June 2026 (8.3&nbsp;GWh), but of the same order as the 2030 target of about 42&nbsp;GW. Each such battery charged from midday solar that would otherwise be curtailed (Example&nbsp;{#curtail}) also lowers frequency at midday and relieves the coal fleet of the need to hold back capacity for the evening.</p></div>

<p>India also has hydro and pumped-storage resources in the Himalayan and Western Ghats regions and growing cross-border links. Electricity trade with Bhutan, Nepal and Bangladesh continued even at the April 2026 peak [@energetica_256], and hydro from Bhutan and Nepal provides valuable evening and monsoon energy. Pumped-storage projects, which can run for six to ten hours, complement batteries that are economic for two to four.</p>

### 9.7 Distribution

<p>Distribution remains the financial weak point. Aggregate technical and commercial (AT&amp;C) losses fell from 22.6&nbsp;% in 2013&ndash;14 to about 15&nbsp;% in 2024&ndash;25 [@bs_atc]; the Ministry of Power reports 21.91&nbsp;% in 2020&ndash;21 falling to 16.16&nbsp;% in 2024&ndash;25, with little improvement since 2023, against a target of 12 to 15&nbsp;% under the Revamped Distribution Sector Scheme (RDSS) [@saur_atc]. Distribution companies together posted a profit of ₹2,701&nbsp;crore in 2024&ndash;25, against a loss of ₹25,553&nbsp;crore a year earlier [@fpj_discom]. About 6.13&nbsp;crore smart meters had been installed across all schemes, against 20.33&nbsp;crore sanctioned under RDSS [@sq_rdss].</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#atc} &mdash; What a point of AT&amp;C loss is worth</p>
<p>Assume 1,500&nbsp;TWh a year enters distribution networks and the average realisable tariff is ₹6/kWh (both assumed, for order of magnitude). One percentage point of AT&amp;C loss is then 15&nbsp;TWh, worth <span class="ans">about ₹9,000&nbsp;crore a year</span>. The 7.6-point fall since 2013&ndash;14 is worth of the order of ₹68,000&nbsp;crore a year at these assumptions, which explains much of the improvement in discom finances. Metering, billing discipline and feeder-level energy accounting remain the cheapest grid investment India can make.</p></div>

### 9.8 A state view: Tamil Nadu

<p>Tamil Nadu shows the national pattern in miniature. Its peak demand reached a record 21,724&nbsp;MW on 14 July 2026, driven by heat and cooling demand [@dtnext_peak]. With 12,273&nbsp;MW of wind capacity, the second largest in India, wind and solar together met more than 40&nbsp;% of the state's demand on some monsoon days [@dtnext_wind]. The state must therefore balance strong seasonal wind, a daily solar cycle and heat-driven evening peaks, which makes storage, flexible thermal plants and inter-state transmission central to its planning.</p>

### 9.9 Priorities for India

<p>Five priorities follow from this analysis. First, storage at scale, commissioned on time, sited where it relieves both the evening ramp and congestion. Second, flexibility from the existing coal fleet, with technical minimum loads lowered and compensated, so that midday solar is not curtailed. Third, transmission at double the recent build rate, supported by dynamic line rating and reconductoring on congested corridors. Fourth, voltage and inertia services specified and procured explicitly as the synchronous share falls, including grid-forming requirements for new inverter-based plants and storage. Fifth, continued distribution reform, because a financially healthy distribution sector is the foundation on which everything else is paid for.</p>

### 9.10 What India can learn from others, and teach

<p>India can borrow tested solutions. Australia's experience with minimum system load, emergency backstops for rooftop solar and grid-forming batteries is directly relevant as India's rooftop solar grows. Europe's 15-minute market resolution and cross-border market coupling offer a model for India's coupled exchanges. The United States' interconnection reforms and cluster studies are relevant to India's connection approvals for renewables and storage. Britain's 2019 event and Iberia's 2025 blackout both underline the importance of verifying the protection and control settings of every plant. In return, India offers lessons of its own: the frequency-linked pricing that disciplined a shortage-era grid, the rapid synchronisation of five regional grids into one, and the scale and speed of its renewable and transmission build-out.</p>

<div class="tcap"><b>Table {#t:indiaprio}.</b> Priority Actions for India's Grid</div>

| Action | Main owners | Effect | Time frame |
|---|---|---|---|
| Commission tendered batteries and pumped storage on schedule | Developers, state utilities, Grid-India | Evening adequacy; less curtailment; lower midday frequency | 2026&ndash;2030 |
| Lower and compensate coal technical minimum | Generators, CERC, state regulators | ≈ 30 GW more midday room (Example&nbsp;{#techmin}) | 2026&ndash;2028 |
| Double the transmission build rate; DLR and reconductoring on congested corridors | POWERGRID, private developers, states | Connection of renewables; inter-regional transfer | 2026&ndash;2032 |
| Grid-forming and voltage-control requirements for new inverter plant and storage | CEA, CERC, Grid-India | Stability as synchronous share falls | Standards by 2027 |
| Coupled markets, market-based despatch and priced ancillary services | CERC, exchanges, Grid-India | Lower cost; flexibility rewarded | 2026&ndash;2030 |
| Metering, billing and tariff reform in distribution | Discoms, states | Lower AT&amp;C losses; finances for investment | Ongoing |

<div class="tcap"><b>Table {#t:india}.</b> India's Grid in Numbers</div>

| Indicator | Value | Source |
|---|---|---|
| Peak demand met | 270.8 GW (May 2026) | [@energetica_q1] |
| Installed capacity / non-fossil share | ≈ 552 GW / 54 % (300.5 GW) | [@mercom_300] |
| Record variable-renewable generation | 103.7 GW, July 2026 | [@energetica_q1] |
| Frequency within 49.90&ndash;50.05 Hz | 78.26 % of time, Jan 2026 (target 90 %) | [@ppd_jan; @posoco_mou] |
| Evening ramp | ≈ 60 GW | [@cw_curtail] |
| Transmission network | 5.09 lakh ckm (Jun 2026) &rarr; 6.48 lakh ckm (2032) | [@sq_trans; @dh_nep] |
| Inter-regional capacity | 119 GW &rarr; 168 GW by 2032 | [@dh_nep] |
| Battery storage commissioned | 2.9 GW / 8.3 GWh (Jun 2026) | [@ieefa_jun] |
| AT&amp;C losses | ≈ 15&ndash;16 % (2024&ndash;25); target 12&ndash;15 % | [@bs_atc; @saur_atc] |
| Smart meters installed | ≈ 6.13 crore | [@sq_rdss] |

## 10. Future Scope for Improvement

### 10.1 Inverter-dominated grids

<p>The central technical question of the next decade is how to run grids in which most of the time most of the generation comes through power electronics. The answer is emerging: grid-forming inverters that provide inertia, voltage and system strength; clear standards that specify these services and test them before connection; and protection schemes designed for lower fault currents. Australia's pipeline of 94 grid-forming battery projects [@ess_gfm] and Europe's move to mandate the capability for new storage [@entsoe_gfm] point the way. Standards bodies and operators in several countries are now writing grid-forming specifications [@csiro_gfm].</p>

<p>Three practical questions remain open. How much grid-forming capacity is needed, and where, to keep a given system stable as the last synchronous units retire? How should grid-forming behaviour be tested and certified, given that much of it lives in proprietary software? And how should it be paid for, since grid-forming operation requires headroom in current and stored energy that a battery could otherwise sell? Operators that answer these early, as Australia is doing with its system-security transition plan, will be able to retire fossil units sooner without loss of stability.</p>

### 10.2 Storage of every duration

<p>Lithium-ion batteries of two to four hours will handle daily shifting and fast reserves. Longer durations, needed to cover multi-day wind lulls and seasonal patterns, will come from pumped hydro, newer battery chemistries, thermal storage and possibly hydrogen. BloombergNEF expects annual additions of storage with six hours or more to quadruple to 2&nbsp;GW in 2026, still small but growing [@bnef_2026].</p>

<p>The value of storage depends on where and how it is used. Batteries located at congested substations can defer network upgrades as well as shift energy; batteries co-located with solar can share a grid connection; and batteries contracted for fast frequency response can replace part of the synchronous inertia the grid is losing. Planning storage as part of the network, not only as a market participant, captures these stacked values. For India, where the evening is the critical period, the duration of storage matters as much as its power rating: two-hour batteries help with the steepest part of the ramp, four-hour batteries cover the evening peak, and pumped storage can carry energy through the night.</p>

### 10.3 Bigger and more interconnected grids

<p>Wider interconnection smooths variability, because the wind is usually blowing and the sun shining somewhere. China's UHV corridors, Europe's cross-border links and offshore grids, and India's inter-regional HVDC links and proposed cross-border connections in South Asia all follow this logic. The constraints are cost, permitting and the need to control flows across many owners and countries.</p>

<p>Interconnection also changes the planning question from "how much reserve does each area need?" to "how much can areas share?". Shared reserves reduce cost, but they also allow disturbances to propagate, as the 2006 European split and the 2012 Indian collapse showed. The future grid therefore combines wide interconnection with strong controllability: HVDC links whose flows can be set precisely, defence plans that can separate the system cleanly into stable islands, and coordinated operation across borders.</p>

### 10.4 Digital, data-driven operation

<p>Grid operators are adopting automation, advanced computing and AI to speed up connection studies [@pp_queue_ai]; machine-learning forecasting, digital twins of the network and probabilistic security assessment will follow into the control room. The prize is anticipation: seeing a voltage drift, an oscillation or a weather-driven shortfall before it becomes an event. The risks are model error, opacity and cyber exposure, so human oversight and robust fallback modes remain essential.</p>

<p>A practical near-term application is the connection study itself. Each new generator or large load must be studied for its effect on flows, voltages, stability and protection; when thousands of projects queue at once, the studies become the bottleneck. Automated study tools, standard plant models and cluster studies that assess many projects together can shorten this step from years to months. Another is predictive maintenance: the same condition-monitoring data that protects transformers and breakers (Section&nbsp;5.7) can, with machine-learning models, forecast failures and schedule replacements before they cause outages.</p>

### 10.5 Active distribution networks

<p>Distribution networks are turning into active systems with rooftop solar, batteries, electric vehicles and controllable loads. Distribution system operators will need visibility and control of these resources, and the transmission operator will need to coordinate with them. Aggregated as virtual power plants, they can provide reserves, ramping and congestion relief; uncoordinated, they can cause minimum-load and voltage problems, as Australia's experience shows [@pvtech_min].</p>

### 10.6 Market design

<p>Markets will increasingly pay for capabilities rather than only energy: fast frequency response, inertia, voltage support, ramping and firm capacity in critical hours. Finer time resolution, as in Europe's move to 15-minute day-ahead trading [@sdac2025], and locational signals that reflect congestion help put flexibility where and when it is needed. For India, deeper short-term markets, market-based economic despatch and properly priced ancillary services are the natural next steps.</p>

### 10.7 Resilience planning

<p>Planning standards will need to include extreme and compound weather, wildfire, flood and cyber scenarios, not just the loss of the largest single unit. Black-start capability from batteries and grid-forming plant, islanding of critical loads, and hardening of key substations are part of this.</p>

### 10.8 Sector coupling

<p>Electric vehicles, heat pumps, electric industrial heat and electrolysers for hydrogen will add large new demand, but much of it is flexible in time. Vehicles parked for twenty hours a day can charge when solar is abundant, and in time can feed power back (vehicle-to-grid); heat can be stored in water or buildings; electrolysers can run when power is cheap. If this flexibility is captured through smart charging, tariffs and aggregation, sector coupling becomes a grid asset rather than a burden. If it is not, it adds to the evening peak.</p>

### 10.9 Firm clean capacity

<p>Storage shifts energy by hours; it does not cover a windless, cloudy week or a failed monsoon. Systems with very high shares of wind and solar will still need firm capacity that can run for days: hydro, nuclear, geothermal, bioenergy, gas with carbon capture or with clean fuels, and long-distance interconnection to areas with different weather. The IEA's outlook includes growth in nuclear as well as renewables and gas to meet rising demand [@iea_elec2026]. For grid management, the point is that firm, dispatchable and synchronous resources remain valuable even as their energy share falls, and planning must value them for the reliability services they provide, not only for the energy they produce.</p>

### 10.10 People and supply chains

<p>None of this happens without skilled engineers, line crews and protection specialists, and without manufacturing capacity for transformers, switchgear and cables. Standardised equipment designs, long-term framework orders and investment in training are as important as any technology. Table&nbsp;{#t:roadmap} summarises the outlook.</p>

<div class="tcap"><b>Table {#t:roadmap}.</b> Improvement Road Map</div>

| Horizon | Operations | Networks | Resources and markets |
|---|---|---|---|
| Now to 2027 | Better forecasting; PMU-based monitoring; verified inverter settings | Dynamic line rating; reconductoring; STATCOMs | Batteries for evening peaks; time-of-day tariffs; demand response |
| 2027&ndash;2032 | Grid-forming standards in force; probabilistic security; digital twins | Planned HVDC and UHV corridors; doubled build rates | Ancillary-service markets; storage obligations; flexible coal |
| Beyond 2032 | Largely inverter-based operation; automated restoration | Continental and cross-border grids | Long-duration storage; active distribution; firm clean supply |

## 11. Summary of Results and Recommendations

### 11.1 The worked examples

<div class="tcap"><b>Table {#t:summary}.</b> Summary of the Worked Examples</div>

| No. | Topic | Case | Result |
|---|---|---|---|
| {#rocof} | RoCoF | 4 GW loss, 250 GW, <i>H</i> = 4 s | 0.10 Hz/s (0.16 at <i>H</i> = 2.5 s) |
| {#droop} | Droop | 500 MW unit, 5 %, &minus;0.2 Hz; 150 GW responsive | +40 MW; &beta; = 65 GW/Hz; offset 0.062 Hz |
| {#pflow} | Power flow | 1,000 MW on lines of 0.1 and 0.2 p.u. | 667 / 333 MW; series compensation equalises |
| {#reserve} | Reserve | Largest infeed 6 GW | 2.4 % of load held at all times |
| {#blackstart} | Black start | 500 MW unit, 7 % auxiliaries | 35 MW to start |
| {#lolp} | Adequacy | 400 MW load, 100 MW units, 5 % FOR | 198 &rarr; 19.5 &rarr; 1.7 h/yr for 5, 6, 7 units |
| {#saidi} | Feeder reliability | 2,000 customers, 3 outages | SAIFI 2.0; SAIDI 5.8 h (3.5 h with automation) |
| {#ferranti} | Ferranti effect | 400 kV, 400 km, open end | +9.5 % voltage; ≈ 220 Mvar charging |
| {#ed} | Economic dispatch | 900 MW, three units | &lambda; = ₹2.98/kWh; ≈ ₹4.3 lakh/h saved |
| {#ace} | Area control error | +300 MW export, &minus;0.02 Hz | ACE = +270 MW |
| {#volt} | Losses vs voltage | 500 MW, 300 km | 10.3 % / 3.1 % / 0.85 % at 220 / 400 / 765 kV |
| {#ageing} | Transformer ageing | Hot spot 110 &deg;C | 4 days of life per day |
| {#gb} | GB 2019 | 973 MW shed | ≈ 0.9 kW per customer |
| {#ercot} | Texas 2021 | Outages and load shed | 48.6 % of capacity out; 26 % of demand unserved |
| {#inertia} | Inertia | Synchronous share 80 &rarr; 30 % | RoCoF 0.10 &rarr; 0.27 Hz/s |
| {#ramp} | Evening ramp | 60 GW in 3 h | 333 MW/min sustained |
| {#curtail} | Curtailment | 10 GW for 3 h | 30 GWh lost |
| {#techmin} | Coal technical minimum | 200 GW at 55 % vs 40 % | 30 GW more room for solar |
| {#loadloss} | Large-load loss | 1.5 GW in 600 GW system | 19 mHz/s; +14 mHz; local overvoltage |
| {#dlr} | Dynamic line rating | Wind 0.6 &rarr; 2 m/s | +41 % ampacity |
| {#gfm} | Synthetic inertia | 1 GW GFM battery, <i>H</i> = 4 s | 4,000 MW&middot;s, as 1 GW synchronous |
| {#hvdc} | HVDC vs AC | 3 GW over 1,500 km | 4.0 % vs 5.0 % loss |
| {#peak} | India 2026 peak | 256.1 GW, solar 21.5 % | ≈ 55 GW solar at peak; evening is the critical period |
| {#indfreq} | India frequency | Jan 2026 | ≈ 162 h outside band |
| {#pace} | India transmission | 2026&ndash;2032 | 23,200 ckm/yr needed vs 11,700 recent |
| {#bess} | India storage | 25 % of ramp for 4 h | 15 GW / 60 GWh |
| {#atc} | AT&amp;C losses | 1 point on 1,500 TWh | ≈ ₹9,000 crore/yr |

### 11.2 A checklist for utility engineers

<div class="tcap"><b>Table {#t:checklist}.</b> Practical Checklist for Utility and Plant Engineers</div>

| Area | Check | Why it matters |
|---|---|---|
| Inverter-based plant | Ride-through, voltage-control and protection settings verified against the grid code, and re-verified after software updates | South Australia 2016; Iberia 2025 |
| Generators | Governor response enabled and tested; droop and deadband as specified | Primary reserve exists only if it responds |
| Protection | Zone settings reviewed for load encroachment and low fault currents | India 2012; inverter-rich grids |
| Large loads | Ride-through capability and models for data centres and other large loads | Virginia 2024&ndash;2026 |
| Transformers | Hot-spot temperature monitored; dissolved-gas analysis trended | Long replacement lead times |
| Lines | Vegetation managed; dynamic rating on critical spans | North America 2003; congestion |
| Control room | Alarm systems monitored for silent failure; restoration drills held | North America 2003 |
| Weather | Winterisation or heat-hardening plans for extreme conditions | Texas 2021; heatwaves |
| Data | PMU and SCADA quality checked; energy balances closed | Situational awareness |
| Cyber | Network segmentation, monitoring and incident response | Ukraine 2015&ndash;2016 |

### 11.3 Recommendations

<p><b>For system operators.</b> Treat inertia, system strength and voltage control as resources to be measured, forecast and procured, not as by-products of synchronous generation. Verify the protection and control settings of every inverter-based plant before and after connection. Invest in wide-area monitoring and forecasting, and practise restoration regularly.</p>

<p><b>For regulators.</b> Make grid-forming and voltage-control capability a connection requirement for new inverter-based plant and storage. Allow grid-enhancing technologies and storage to compete with conventional network investment. Reform connection processes so that queues reflect real projects. Pay for flexibility, ramping and ancillary services at prices that finance them.</p>

<p><b>For governments.</b> Plan and permit transmission years ahead of generation, back long-term orders for transformers and cables, and train the workforce. Include extreme weather and cyber threats in reliability standards.</p>

<p><b>For India.</b> Commission storage at scale, lower and compensate the technical minimum of coal units, double the transmission build rate with GETs on congested corridors, adopt grid-forming requirements, and complete the distribution reforms of metering, billing and cost-reflective tariffs.</p>

## 12. Conclusions

<p>1) Grid management is the continuous balancing of a single, continent-scale machine. Its physics, inertia, droop, secondary control and voltage regulation, has not changed in a century, but the resources available to manage it have changed completely.</p>

<p>2) The history of grid management is a history of learning from failure. Each major blackout, from 1965 to Iberia in 2025, has led to new standards, tools or institutions; the common causes are hidden weaknesses, failed situational awareness and the simultaneous failure of several layers of defence.</p>

<p>3) The world's main grid problem today is speed. Demand is growing at 3 to 4&nbsp;% a year, more than 2,000&nbsp;GW of projects wait in US queues alone, and transformers and cables take years to procure. Grids, not generation, have become the bottleneck.</p>

<p>4) Inverter-based resources change the operating problem. Inertia and system strength fall, ramps steepen and voltage control must be deliberately procured. Grid-forming inverters, synchronous condensers, storage and better standards are the established answers, and their deployment is accelerating.</p>

<p>5) India has built one of the world's largest synchronous grids and met a 270.8&nbsp;GW peak in 2026 without a major failure since 2012. Its immediate challenges are the evening ramp, midday high frequency and curtailment, a transmission build rate that must roughly double, storage that must move from tender to service, and distribution finances.</p>

<p>6) The improvements are known: grid-enhancing technologies for quick capacity, storage for flexibility, HVDC for distance, grid-forming technology for stability, digital operations for foresight, active distribution networks and markets that pay for the services the grid needs. What remains is to build them at the pace demand requires.</p>

## Appendix: Abbreviations and Symbols

<div class="tcap"><b>Table {#t:abbr}.</b> Abbreviations and Symbols</div>

| Term | Meaning | Term | Meaning |
|---|---|---|---|
| ACE | Area control error, ({#e:ace}) | NERC | North American Electric Reliability Corporation |
| AGC | Automatic generation control | N&minus;1 | Secure against loss of any one element |
| AT&amp;C | Aggregate technical and commercial (losses) | PMU | Phasor measurement unit |
| BESS | Battery energy storage system | RDSS | Revamped Distribution Sector Scheme |
| ckm | Circuit-kilometre | RoCoF | Rate of change of frequency, ({#e:rocof}) |
| EMS | Energy management system | SCADA | Supervisory control and data acquisition |
| ENTSO-E | European Network of TSOs for Electricity | STATCOM | Static synchronous compensator |
| FACTS | Flexible AC transmission systems | TSO, ISO | Transmission / independent system operator |
| GETs | Grid-enhancing technologies | UHV | Ultra-high voltage (&ge; 800 kV DC, 1,000 kV AC) |
| GFM | Grid-forming (inverter) | <i>H</i> | Inertia constant (s), ({#e:swing}) |
| HVDC | High-voltage direct current | <i>R</i> | Governor droop, ({#e:droop}) |
| IEGC | Indian Electricity Grid Code | &beta;, &lambda; | Frequency response (GW/Hz); marginal cost, ({#e:ed}) |

## Acknowledgment

<p>The author acknowledges the use of Claude (Anthropic), a large language model, for literature and data search, drafting assistance and the scripts used for the worked calculations, simulation and figures. Facts and figures were checked against the cited sources, assumed values are marked as such, and the interpretations and conclusions are the author&rsquo;s own.</p>
