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

<p>An electricity grid is the largest machine humanity has built, and the only one that must match production and consumption at every instant. This paper explains how that balance is managed around the world, how the task has changed over 140 years, what is going wrong today and what can be done about it. It begins with the physics: frequency, inertia, voltage and the layered control hierarchy that runs from protective relays acting in milliseconds to transmission plans spanning decades. It then traces the history of grid management from isolated DC stations through interconnection, control centres and liberalised markets, and compares the institutional models of the United States, Europe, China, Australia and India. Six major blackouts, from the 2003 North American cascade to the 2025 Iberian collapse, are examined for their common lessons. The current problems are set out with recent data: electricity demand growing at 3 to 4&nbsp;% a year, more than 2,000&nbsp;GW of projects waiting in US connection queues alone, lead times for transformers and cables that have roughly doubled since 2021, falling system inertia, steep evening ramps, high-frequency operation and curtailment as solar grows, voltage-control gaps, extreme weather and utility finances. India receives a detailed section: a 270.8&nbsp;GW peak in May 2026, non-fossil capacity above 300&nbsp;GW, frequency held within its normal band about 78&nbsp;% of the time in January 2026, a ₹9.15&nbsp;lakh crore transmission plan to 2032 and a battery-storage sector moving from tenders to construction. Twenty-seven worked calculations quantify the key mechanisms, including the rate of change of frequency, governor droop, economic dispatch, line losses against voltage, dynamic line rating, HVDC against AC transmission and storage sizing for the evening ramp. The paper closes with the most promising improvements: grid-forming inverters, storage, grid-enhancing technologies, HVDC, digital operations, active distribution networks and market reform, and with recommendations for India and other fast-growing systems.</p>

<p><b>Index Terms</b>&mdash;Power systems, grid management, frequency control, inertia, load dispatch, blackouts, transmission planning, HVDC, grid-forming inverters, battery energy storage, renewable integration, electricity markets, India, Grid-India.</p>

## 1. Introduction

<p>Electricity cannot be stored in the wires. Every watt drawn by a fan in Chennai, a steel furnace in Odisha or a data centre in Virginia must be produced, somewhere on the same synchronous network, at that same instant. If production falls short even briefly, the rotating generators slow down and the system frequency falls; if production exceeds demand, the frequency rises. Keep the mismatch small and the grid hums along at 50 or 60&nbsp;Hz; let it grow and protective devices begin to trip, often in a cascade that can black out a country in less than two minutes. Managing a power grid is the art and engineering of preventing that cascade, every second of every day, while also keeping electricity affordable and, increasingly, clean.</p>

<p>The task has never been harder. Global electricity demand is rising at its fastest sustained pace in over a decade, driven by industry, air conditioning, electric vehicles and data centres. The IEA expects demand to grow by 3.6&nbsp;% in 2026 and 3.8&nbsp;% in 2027, up from 3&nbsp;% in 2025, with renewables rising from 33&nbsp;% of world generation in 2025 to 37&nbsp;% by 2027 [@iea_mid2026]. At the same time, the machines that have kept grids stable for a century, large coal, gas, hydro and nuclear units with heavy spinning rotors, are being joined and partly replaced by solar panels, wind turbines and batteries connected through power electronics, which behave very differently during a disturbance. Grids must also be extended at unprecedented speed: the IEA estimates that 80&nbsp;million kilometres of lines must be added or replaced worldwide by 2040, equal to the entire existing global grid [@iea_grids2023].</p>

<p>This paper surveys how the world manages its grids today, how it got here, what problems it faces and where the improvements lie. It is written for engineers and informed readers who want the mechanisms as well as the headlines, so most sections include worked calculations with stated inputs. Values marked as assumed are typical engineering figures for illustration; the scripts that compute every number and plot every chart are kept with the paper's sources.</p>

<p>Section&nbsp;2 explains the physics of balance and the control hierarchy. Section&nbsp;3 traces the history of grid management. Section&nbsp;4 compares how grids are organised in the major regions. Section&nbsp;5 describes day-to-day operation. Section&nbsp;6 examines six major blackouts. Section&nbsp;7 sets out the current problems. Section&nbsp;8 describes the tools available now. Section&nbsp;9 is devoted to India. Section&nbsp;10 looks at the future scope for improvement, Section&nbsp;11 gives recommendations and Section&nbsp;12 concludes.</p>

<div class="tcap"><b>Table {#t:keyfig}.</b> Key Figures on Electricity Grids Worldwide</div>

| Quantity | Value | Source |
|---|---|---|
| Global electricity demand growth, 2025 / 2026 / 2027 | 3 % / 3.6 % / 3.8 % | [@iea_mid2026] |
| Global electricity consumption, 2025 &rarr; 2027 | 28,600 &rarr; 30,700 TWh | [@dte_mid2026] |
| Renewable share of global generation, 2025 &rarr; 2027 | 33 % &rarr; 37 % | [@iea_mid2026] |
| Grid length to add or replace by 2040 | 80 million km (equal to today's grid) | [@iea_grids2023] |
| Global grid investment, 2015 / 2025 / 2026 | ≈ $315 bn / $450 bn / ≈ $550 bn | [@greentech_elec; @iwei2026] |
| Renewable projects in connection queues (global, 2023) | ≥ 3,000 GW, of which 1,500 GW advanced | [@iea_grids2023] |
| Active US interconnection queue, end-2025 | 2,061 GW | [@lbnl_q2026] |
| Lead time, large power transformers / cables | up to 4 years / 2&ndash;3 years | [@iea_supply] |
| Battery storage added worldwide, 2025 | 112 GW / 307 GWh | [@bnef_2026] |
| India peak demand met, May 2026 | 270.8 GW | [@energetica_q1] |

## 2. The Physics of Balance

### 2.1 One machine, one frequency

<p>All the synchronous generators in an AC interconnection rotate in lock-step. Their common electrical speed is the system frequency: 50&nbsp;Hz in India, Europe, China and Australia, 60&nbsp;Hz in North America. Frequency is therefore a direct, system-wide measure of balance. When load exceeds generation, the deficit is supplied for the first few seconds from the kinetic energy stored in rotating masses, and every machine slows a little. The quantity that resists this change is <span class="kw">inertia</span>, conventionally expressed as the inertia constant <i>H</i>, the stored kinetic energy divided by the machine rating, in seconds. Typical values for thermal and hydro units are 2 to 9&nbsp;s. The aggregate behaviour of the whole system follows the swing equation:</p>

<p class="eqn">(2<i>H</i><i>S</i> / <i>f</i><sub>0</sub>) &middot; d<i>f</i>/d<i>t</i> = <i>P</i><sub>m</sub> &minus; <i>P</i><sub>e</sub> &nbsp;&nbsp;&nbsp;({#e:swing})</p>

<p>where <i>S</i> is the rating of the connected synchronous capacity, <i>f</i><sub>0</sub> the nominal frequency, <i>P</i><sub>m</sub> the mechanical power supplied by prime movers and <i>P</i><sub>e</sub> the electrical load. Immediately after a sudden loss of generation &Delta;<i>P</i>, before any controller acts, the rate of change of frequency (RoCoF) is</p>

<p class="eqn">RoCoF = &Delta;<i>P</i> &middot; <i>f</i><sub>0</sub> / (2<i>H</i><i>S</i>) &nbsp;&nbsp;&nbsp;({#e:rocof})</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#rocof} &mdash; How fast does frequency fall?</p>
<p>Consider a large 50&nbsp;Hz system with 250&nbsp;GW of synchronous machines online (assumed, of the order of India's daytime fleet) and an aggregate inertia constant <i>H</i> = 4&nbsp;s. Stored kinetic energy = <i>H</i><i>S</i> = 1,000&nbsp;GW&middot;s.</p>
<p>A 4&nbsp;GW loss (for example a large HVDC import link tripping) gives, by ({#e:rocof}), RoCoF = 4 &times; 50 / (2 &times; 4 &times; 250) = <span class="ans">0.10&nbsp;Hz/s</span>. With <i>H</i> = 5&nbsp;s the value is 0.08&nbsp;Hz/s; with <i>H</i> = 2.5&nbsp;s, 0.16&nbsp;Hz/s.</p>
<p>At 0.16&nbsp;Hz/s the frequency would reach 49.5&nbsp;Hz in about three seconds if nothing else happened. Everything that follows in the control hierarchy must act within that window.</p></div>

### 2.2 The control hierarchy

<p>Grid operators keep frequency and power flows in check with a hierarchy of controls separated by time scale (Figure&nbsp;{#f:timescales}). The fastest layers are automatic and local; the slowest are planning decisions taken years in advance.</p>

<div class="figrow one"><figure id="fig-{#f:timescales}"><a class="zoom" href="img/power-grid-management-worldwide/fig1_timescales.svg" target="_blank" rel="noopener"><img src="img/power-grid-management-worldwide/fig1_timescales.svg" alt="Bars on a logarithmic time axis showing grid control layers from protection to transmission planning" loading="lazy" style="background:#fff;width:100%;max-width:840px"></a><figcaption><b>Figure {#f:timescales}.</b> The layers of grid management and the time scales over which each acts, from protective relays clearing faults in tens of milliseconds to transmission and capacity planning over a decade or more. Ranges are typical and vary between systems.<span class="credit">Chart by the author</span></figcaption></figure></div>

<p><span class="kw">Inertia</span> acts instantly and passively, as described above. <span class="kw">Primary response</span> follows within a few seconds: the speed governor on each generator senses the frequency fall and opens its steam valve, gate or fuel valve in proportion. The proportionality is set by the droop <i>R</i>, the fractional frequency change that would drive the unit from zero to full output; 4 to 5&nbsp;% is typical. For a unit of rating <i>P</i><sub>r</sub>:</p>

<p class="eqn">&Delta;<i>P</i> = &minus;(&Delta;<i>f</i> / <i>f</i><sub>0</sub>) / <i>R</i> &middot; <i>P</i><sub>r</sub> &nbsp;&nbsp;&nbsp;({#e:droop})</p>

<p>Load also helps a little: motors slow and draw less power as frequency falls, an effect called load damping. Primary response arrests the fall but leaves a steady offset. <span class="kw">Secondary control</span>, known in North America as automatic generation control (AGC), then restores frequency to nominal and brings power exchanges between control areas back to schedule over several minutes. <span class="kw">Tertiary control</span> and re-dispatch replace the reserves used, so that the system is ready for the next event. Above these sit the market and scheduling layers, outage planning, and the long-term planning of generation and transmission.</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#droop} &mdash; Governor droop and the frequency offset</p>
<p>A 500&nbsp;MW unit with 5&nbsp;% droop sees frequency fall by 0.2&nbsp;Hz. By ({#e:droop}), &Delta;<i>P</i> = (0.2/50)/0.05 &times; 500 = <span class="ans">40&nbsp;MW</span> of extra output.</p>
<p>If 150&nbsp;GW of the fleet provides governor response (assumed), the same 0.2&nbsp;Hz fall mobilises (0.2/50)/0.05 &times; 150 = 12&nbsp;GW. The system's frequency response characteristic is &beta; = 150/(0.05 &times; 50) + <i>D</i><i>S</i>/<i>f</i><sub>0</sub> = 60 + 5 = <span class="ans">65&nbsp;GW/Hz</span>, taking load damping <i>D</i> = 1&nbsp;% per % of frequency on 250&nbsp;GW of load.</p>
<p>The 4&nbsp;GW loss of Example&nbsp;{#rocof} therefore settles, after primary response, at &Delta;<i>f</i> = 4/65 = <span class="ans">0.062&nbsp;Hz</span> below nominal, about 49.94&nbsp;Hz, until secondary control restores 50&nbsp;Hz.</p></div>

<p>Figure&nbsp;{#f:freq} shows these layers working together in a simple single-area simulation of the same 4&nbsp;GW loss. The steady offset is set by droop and damping and is the same for both cases; the depth of the initial dip, the nadir, depends on inertia. Halving inertia deepens the nadir and makes it arrive sooner, leaving the governors less time to respond.</p>

<div class="figrow one"><figure id="fig-{#f:freq}"><a class="zoom" href="img/power-grid-management-worldwide/fig2_frequency_response.svg" target="_blank" rel="noopener"><img src="img/power-grid-management-worldwide/fig2_frequency_response.svg" alt="Frequency against time after a 4 GW loss for two values of system inertia" loading="lazy" style="background:#fff;width:100%;max-width:740px"></a><figcaption><b>Figure {#f:freq}.</b> Simulated frequency after the loss of 4&nbsp;GW in a 250&nbsp;GW, 50&nbsp;Hz system: aggregated swing equation, 150&nbsp;GW of governor response at 5&nbsp;% droop with a 9&nbsp;s first-order lag, load damping 1.5&nbsp;% per % (all assumed). With <i>H</i> = 5&nbsp;s the nadir is 49.83&nbsp;Hz; with <i>H</i> = 2.5&nbsp;s it is 49.78&nbsp;Hz and arrives sooner. The simulation omits secondary control, so frequency settles below 50&nbsp;Hz.<span class="credit">Chart by the author</span></figcaption></figure></div>

### 2.3 Voltage and reactive power

<p>Frequency is a single system-wide quantity; voltage is local. It is governed mainly by reactive power, the oscillating component of power that magnetises transformers and motors and charges the capacitance of long lines. Reactive power does not travel far, so voltage must be controlled near where it is needed, by generator excitation systems, switched capacitors and reactors, on-load tap changers, static var compensators and STATCOMs. A lightly loaded long line generates reactive power and pushes voltage up; a heavily loaded line absorbs it and lets voltage sag. Voltage problems are less visible than frequency problems but just as dangerous: they were at the heart of the 2025 Iberian blackout (Section&nbsp;6.6). As synchronous generators retire, their voltage-control capability must be replaced by other means.</p>

<p>Each system defines bands within which frequency is normally held and thresholds at which emergency actions begin. Table&nbsp;{#t:freqbands} compares a few. The bands differ because system sizes, generation mixes and histories differ, but the logic is the same everywhere: a narrow normal band maintained by markets and secondary control, wider limits for disturbances, and automatic load shedding as the last defence.</p>

<div class="tcap"><b>Table {#t:freqbands}.</b> Frequency Bands and Thresholds in Four Systems</div>

| System | Nominal | Normal operating band or limits | Automatic load shedding begins |
|---|---|---|---|
| India | 50 Hz | 49.90&ndash;50.05 Hz (IEGC band) [@cw_curtail] | Staged under-frequency relays below the band |
| Great Britain | 50 Hz | 49.5&ndash;50.5 Hz statutory range [@eso_2019] | 48.8 Hz (first stage of LFDD) [@eso_2019] |
| Texas (ERCOT) | 60 Hz | Close to 60 Hz; 59.4 Hz is a critical level for generator trips [@ercot_2021] | 59.3 Hz [@nrel_uri] |
| Continental Europe | 50 Hz | Standard range of about &plusmn;50 mHz | Staged from about 49.0 Hz |

<div class="worked"><p class="wt">WORKED EXAMPLE {#ferranti} &mdash; Why light load pushes voltage up</p>
<p>A lossless 400&nbsp;kV line 400&nbsp;km long, energised from one end with the far end open, behaves like a resonant transmission line. At 50&nbsp;Hz the wavelength is about 6,000&nbsp;km, so the electrical length is &beta;<i>l</i> = 2&pi; &times; 400/6,000 = 0.42&nbsp;rad, and the receiving-end voltage rises by 1/cos(&beta;<i>l</i>) &minus; 1 = <span class="ans">about 9.5&nbsp;%</span> (the Ferranti effect).</p>
<p>The line also generates about 0.55&nbsp;Mvar/km of charging reactive power (assumed), some <span class="ans">220&nbsp;Mvar</span> in total, which must be absorbed by shunt reactors or generators. On a sunny, lightly loaded afternoon with few synchronous machines online, too little absorbing capability can let voltages climb across a whole region, the mechanism at the root of the 2025 Iberian collapse.</p></div>

### 2.4 Security: the N&minus;1 principle and protection

<p>Grids are operated so that the loss of any single element, a generator, line or transformer, does not cause any other element to exceed its limits. This is the N&minus;1 criterion. Operators run contingency analysis continuously, simulating each credible loss against the present state of the network estimated from telemetry, and re-dispatch generation pre-emptively if any contingency would cause an overload or voltage violation. Protection systems, relays and circuit breakers, isolate faulted equipment within tens of milliseconds. As a last line of defence, automatic under-frequency load shedding disconnects blocks of customers in stages if frequency falls below set thresholds, sacrificing part of the load to save the whole system.</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#reserve} &mdash; Sizing the reserve for the largest contingency</p>
<p>The reserve that can respond within seconds must at least cover the largest single credible loss. If that is a 6&nbsp;GW HVDC bipole (assumed) in a 250&nbsp;GW system, the requirement is <span class="ans">6&nbsp;GW, 2.4&nbsp;% of load</span>, held as headroom on running units or as storage and demand response, at every moment of the year. As individual plants and links grow larger, so does this standing cost, which is one reason operators limit the size of single infeeds.</p></div>

### 2.5 Power flow: electricity goes where physics sends it

<p>In a meshed AC network, operators cannot route power along a chosen path. Power divides among parallel paths according to their impedances, following Kirchhoff's laws. A sale from one region to another therefore flows partly through neighbouring networks ("loop flows"), and a single heavily loaded line can limit transfers across a whole region. For the high-voltage network, where reactance dominates, the power flow on a line between buses <i>i</i> and <i>j</i> is approximately</p>

<p class="eqn"><i>P</i><sub><i>ij</i></sub> = (<i>V</i><sub><i>i</i></sub><i>V</i><sub><i>j</i></sub> / <i>X</i><sub><i>ij</i></sub>) sin(&delta;<sub><i>i</i></sub> &minus; &delta;<sub><i>j</i></sub>) &nbsp;&nbsp;&nbsp;({#e:pflow})</p>

<p>where <i>V</i> are the voltage magnitudes, <i>X</i><sub><i>ij</i></sub> the line reactance and &delta; the voltage phase angles. Transfer rises with the angle difference until, near 90&deg;, the two ends lose synchronism; long lines are operated well below that limit. This is the physics behind stability limits, series compensation and the controllability advantage of HVDC.</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#pflow} &mdash; Sharing between parallel lines</p>
<p>1,000&nbsp;MW flows between two areas over two parallel lines with reactances of 0.1 and 0.2 per unit. Power divides in inverse proportion to reactance: line&nbsp;1 carries 1,000 &times; 0.2/0.3 = <span class="ans">667&nbsp;MW</span>, line&nbsp;2 carries 333&nbsp;MW.</p>
<p>If line&nbsp;1 is rated 600&nbsp;MW, the transfer is limited to 900&nbsp;MW even though the two lines together could carry far more. Installing 50&nbsp;% series compensation on line&nbsp;2 halves its reactance to 0.1; the flows become 500/500&nbsp;MW and the full 1,000&nbsp;MW, or up to 1,200&nbsp;MW, can be transferred. Power-flow control devices and HVDC links achieve the same effect by direct control.</p></div>

### 2.5 Restoration and black start

<p>When a blackout does happen, the grid must be rebuilt from nothing. Most large power stations cannot start without electricity from the grid to run their pumps, fans and controls. Operators therefore keep a few "black-start" units, usually hydro, gas turbines or diesel-backed plants, able to start on their own, energise a transmission path, and supply the auxiliaries of larger stations. Islands are built up around each black-start source, carefully picking up blocks of load so that frequency and voltage stay within limits, and then synchronised with one another. Restoration plans are rehearsed in drills, because a real blackout leaves no time to invent them. Batteries with grid-forming inverters are increasingly being qualified as black-start sources, since they can energise a network within seconds.</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#blackstart} &mdash; Starting a coal unit from a battery</p>
<p>A 500&nbsp;MW coal unit needs auxiliary power of about 7&nbsp;% of its rating while starting (assumed), mainly for feed pumps, fans and mills: 500 &times; 0.07 = <span class="ans">35&nbsp;MW</span>. A 50&nbsp;MW grid-forming battery can therefore energise the connecting line and start the unit, provided it can also supply the inrush current of transformers and large motors, which can be several times their running current. Sizing black-start batteries is therefore about current and voltage control during switching as much as about energy.</p></div>

## 3. A Brief History of Grid Management

### 3.1 Isolated stations and the battle of currents

<p>The first public supply systems of the 1880s, such as Edison's Pearl Street station in New York (1882), were small DC networks serving a few city blocks. Because DC could not easily be transformed to high voltage, each station could serve only a radius of about a kilometre. The AC system, built on the transformer and the induction motor, won the "battle of the currents" in the 1890s, symbolised by the Niagara Falls hydroelectric scheme of 1895&ndash;96, because it could transmit power economically over long distances at high voltage and step it down for use. Grid management in this era meant a station engineer watching a few meters and adjusting a few machines by hand.</p>

### 3.2 Interconnection and the first grids

<p>From the 1910s to the 1950s, utilities interconnected their systems to share reserves and use the cheapest plants. Britain built one of the first national grids in the late 1920s and 1930s, operating at 132&nbsp;kV under a central board. Interconnection brought the economics of scale but also the possibility of cascading failure across a wide area. The Northeast blackout of November 1965, which left about 30&nbsp;million people in the United States and Canada without power, led directly to the creation in 1968 of the North American Electric Reliability Council, the forerunner of today's NERC, and to the voluntary reliability standards that later became mandatory.</p>

### 3.3 Control centres and computers

<p>The 1960s to 1980s brought supervisory control and data acquisition (SCADA), automatic generation control and, later, energy management systems (EMS) with state estimation and contingency analysis. For the first time operators could see the whole network in near real time and simulate the consequences of a failure before it happened. Economic dispatch, the allocation of load among units to minimise cost (Section&nbsp;5.2), moved from slide rules to computers.</p>

<p>Transmission technology advanced alongside control. The first commercial HVDC link, to the Swedish island of Gotland, entered service in 1954 using mercury-arc valves; thyristor valves followed in the 1970s, and voltage-source converters in the late 1990s. AC transmission voltages rose to 765&nbsp;kV in North America from the late 1960s. In the late 1980s, researchers developed the phasor measurement unit, which time-stamps voltage and current phasors using satellite clocks and is now the basis of wide-area monitoring.</p>

### 3.4 Liberalisation and markets

<p>From the 1980s, many countries separated generation from transmission and introduced competitive markets: Chile in 1982, England and Wales in 1990, the Nordic countries in the 1990s, and in the United States the independent system operators and regional transmission organisations created from the late 1990s. India's Electricity Act of 2003 opened generation to competition, created open access to the transmission network and established the regulatory commissions. Markets changed the operator's job: the cheapest dispatch is now discovered through bids rather than computed from cost curves, and reliability must be secured through rules, reserves and ancillary-service products rather than by direct ownership of the plants.</p>

### 3.5 The digital and renewable era

<p>Since about 2010, three changes have reshaped grid management: the rapid growth of wind and solar, the spread of digital measurement and communication (smart meters, synchrophasors, cloud-based forecasting), and the arrival of large-scale batteries. Each has made the grid more capable and more complex at the same time. Table&nbsp;{#t:history} summarises the eras.</p>

<div class="tcap"><b>Table {#t:history}.</b> Eras of Grid Management</div>

| Era | Typical span | Defining features | What "management" meant |
|---|---|---|---|
| Isolated stations | 1880s&ndash;1910s | DC and early AC, city-scale | Manual control by station staff |
| Interconnection | 1910s&ndash;1960s | Regional and national grids, 132&ndash;400 kV | Pooling reserves; telephone coordination |
| Control centres | 1960s&ndash;1990s | SCADA, AGC, EMS, contingency analysis | Computer-aided central dispatch; reliability councils |
| Markets | 1980s&ndash;2010s | Unbundling, wholesale markets, independent operators | Market rules, ancillary services, congestion pricing |
| Digital and renewable | 2010s&ndash;now | Wind, solar, batteries, smart meters, PMUs | Forecast-led, inverter-rich, active distribution |

### 3.6 India's own path

<p>India's grid management developed along its own route. State electricity boards built and ran most of the system from the 1950s; regional electricity boards coordinated the states in each region from the 1960s. Central generation and transmission companies, NTPC (1975) and POWERGRID (1989), built the large plants and the inter-state network. A distinctive Indian innovation came in the early 2000s: Availability Based Tariff, with an "unscheduled interchange" charge that varied with frequency. A state that drew more than its schedule when frequency was low paid a high price, and one that helped the grid was paid, turning frequency into a price signal that improved discipline at a time of chronic shortage. The Electricity Act of 2003 introduced open access and competition, power exchanges began trading in 2008, and the regulatory framework has since added a deviation settlement mechanism, reserve ancillary services, a real-time market (2020), security-constrained economic despatch and, in 2023, a revised grid code. Table&nbsp;{#t:indiahist} lists the main milestones.</p>

<div class="tcap"><b>Table {#t:indiahist}.</b> Milestones in Indian Grid Management</div>

| Period | Milestone | Significance |
|---|---|---|
| 1948 onwards | State electricity boards | Integrated state utilities build most generation and networks |
| 1960s | Regional electricity boards | Coordination of states within five regions |
| 1975 / 1989 | NTPC / POWERGRID founded | Central generation and the inter-state transmission backbone |
| Early 2000s | Availability Based Tariff with frequency-linked unscheduled interchange | Frequency becomes a price signal; grid discipline improves |
| 2003 | Electricity Act | Open access, competition, independent regulators |
| 2008 onwards | Power exchanges; day-ahead market from 2009 | Short-term markets and price discovery |
| 2012 | July blackouts | Reforms in discipline, protection and system operation |
| Dec 2013 | Southern grid synchronised | One national grid at one frequency |
| 2020 | Real-time market | Half-hourly trading close to delivery |
| 2023 | Revised Indian Electricity Grid Code | Updated frequency band, reserves and connection rules |
| 2025&ndash;26 | Market coupling approved; storage moves to construction | Single clearing price; batteries enter operation at scale |

