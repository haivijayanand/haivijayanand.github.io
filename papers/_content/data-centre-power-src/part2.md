
## 6. Cooling: The Largest Overhead

<p>Cooling is the largest share of the overhead in almost every data centre. The IEA estimates it at about 7&nbsp;% of consumption in efficient hyperscale facilities and more than 30&nbsp;% in less efficient ones [@iea2025ch2]. A cooling plant is a collection of rotating machines (fans, pumps, compressors and cooling-tower drives) joined by heat exchangers. Its efficiency is governed by well-known laws, and its waste is the familiar waste of any industrial utility plant. This section works through the plant from the server inlet outward.</p>

### 6.1 Airflow and set points

<p>The first savings come before any machine is changed. In an air-cooled room, hot exhaust air that recirculates to server inlets forces the cooling units to supply colder air than the servers need. Blanking panels in empty rack slots, sealed cable cut-outs, and containment of hot or cold aisles separate the two streams, so the supply temperature can be raised. ASHRAE Technical Committee 9.9 recommends server inlet temperatures between 18 and 27&nbsp;&deg;C for normal operation [@ashrae; @greencalc]. Many rooms still run at 20&nbsp;&deg;C or below out of habit. ENERGY STAR estimates that each degree of increase in inlet temperature can save up to about 4&nbsp;% of cooling energy, and vendors quote 4 to 5&nbsp;% per degree of return-air temperature, chiefly because chillers run at higher evaporating temperatures and economisers can run for more hours [@energystar; @vertiv_rat]. There is a limit: above the recommended range server fans speed up and IT power rises, especially in high-density rooms, so the optimum is near the top of the recommended range rather than beyond it [@energystar].</p>

### 6.2 Fans, pumps and the affinity laws

<p>Fans and pumps in data centres are usually selected for the design peak plus redundancy, and spend most of their lives at part load. For a centrifugal fan or pump at constant efficiency, flow <i>Q</i>, pressure (or head) <i>H</i> and shaft power <i>P</i> scale with speed <i>N</i> as</p>

<p class="eqn"><i>Q</i> &prop; <i>N</i>, &nbsp;&nbsp; <i>H</i> &prop; <i>N</i><sup>2</sup>, &nbsp;&nbsp; <i>P</i> &prop; <i>N</i><sup>3</sup> &nbsp;&nbsp;&nbsp;(5)</p>

<p>The cube law is what makes variable-speed drives so effective: 80&nbsp;% of design speed needs only 0.8<sup>3</sup> = 51&nbsp;% of design power. When flow is controlled instead by throttling valves or dampers at full speed, most of that saving is thrown away. For pumps working against a fixed static head <i>H</i><sub>s</sub> (for example, lifting water to the top of a cooling tower), the system curve is <i>H</i> = <i>H</i><sub>s</sub> + <i>kQ</i><sup>2</sup>, and the saving is smaller, as Figure&nbsp;6 shows.</p>

<div class="figrow one"><figure id="fig-6"><a class="zoom" href="img/data-centre-power-demand-efficiency/fig5_affinity.svg" target="_blank" rel="noopener"><img src="img/data-centre-power-demand-efficiency/fig5_affinity.svg" alt="Shaft power against speed for the cube law and for a pump with static head" loading="lazy" style="background:#fff;width:100%;max-width:740px"></a><figcaption><b>Figure 6.</b> Affinity laws (5). Solid: fan or pump with no static head. Dashed: pump whose static head is 30&nbsp;% of the design head (assumed), at constant efficiency. Marked points: 80&nbsp;% speed, and six N+1 fans sharing the duty of five.<span class="credit">Chart by the author</span></figcaption></figure></div>

<div class="worked"><p class="wt">WORKED EXAMPLE {#fans} &mdash; Run the redundant fans, slowly</p>
<p>A 10&nbsp;MW IT hall has air-handling fans rated at 6&nbsp;% of IT load (assumed), i.e. 600&nbsp;kW, arranged N+1: six units, of which five can carry the full airflow.</p>
<p>The common practice is to run five at full speed and keep one on standby. If instead all six run, each carries 5/6 of its design flow at 5/6 of its speed. By (5), total power = 6 &times; (5/6)<sup>3</sup> / 5 = (5/6)<sup>2</sup> = <span class="ans">0.694 of the original</span>, a 30.6&nbsp;% cut. Redundancy is kept, because if one unit fails the other five speed up.</p>
<p>Annual saving = 600 &times; 0.306 &times; 8,760 = <span class="ans">about 1,600&nbsp;MWh</span>, before counting the fan heat that no longer needs to be removed.</p>
<p>For a chilled-water pump with 30&nbsp;% static head, reducing flow to 70&nbsp;% gives <i>P</i>/<i>P</i><sub>0</sub> = 0.7 &times; (0.3 + 0.7 &times; 0.7<sup>2</sup>) = 0.45, compared with 0.34 from the pure cube law. The saving is still 55&nbsp;%, and resetting the differential-pressure set point to what the furthest load actually needs is what unlocks it.</p></div>

### 6.3 Chillers and the case for warmer water

<p>Mechanical chillers are the biggest single electrical load in a conventional cooling plant. The ideal (Carnot) coefficient of performance of a refrigeration cycle depends only on the evaporating and condensing temperatures <i>T</i><sub>e</sub> and <i>T</i><sub>c</sub> in kelvin:</p>

<p class="eqn"><i>COP</i><sub>Carnot</sub> = <i>T</i><sub>e</sub> / (<i>T</i><sub>c</sub> &minus; <i>T</i><sub>e</sub>) &nbsp;&nbsp;&nbsp;(6)</p>

<p>Real chillers reach a fraction of this, roughly half for a good centrifugal machine at its design point (assumed here). Equation (6) shows why warm chilled water saves so much: raising <i>T</i><sub>e</sub> narrows the temperature lift <i>T</i><sub>c</sub> &minus; <i>T</i><sub>e</sub>, which is in the denominator. The traditional chilled-water supply of 6 to 7&nbsp;&deg;C dates from comfort air conditioning, where the coil must also remove moisture. Servers need no dehumidification of that kind, and with good containment, water at 15 to 20&nbsp;&deg;C is enough (Figure&nbsp;7).</p>

<div class="figrow one"><figure id="fig-7"><a class="zoom" href="img/data-centre-power-demand-efficiency/fig6_chiller_cop.svg" target="_blank" rel="noopener"><img src="img/data-centre-power-demand-efficiency/fig6_chiller_cop.svg" alt="Chiller COP against chilled-water supply temperature for three condensing temperatures" loading="lazy" style="background:#fff;width:100%;max-width:740px"></a><figcaption><b>Figure 7.</b> Chiller COP from (6) at 50&nbsp;% of Carnot, with an evaporating temperature 2&nbsp;K below the chilled-water supply temperature (assumed), for condensing temperatures of 35, 40 and 45&nbsp;&deg;C. Raising the supply from 7 to 18&nbsp;&deg;C raises COP by about half.<span class="credit">Chart by the author</span></figcaption></figure></div>

<div class="worked"><p class="wt">WORKED EXAMPLE {#chw} &mdash; Raising chilled water from 7 to 18 &deg;C in Chennai</p>
<p>Condensing temperature 40&nbsp;&deg;C (313.15&nbsp;K), typical of a water-cooled chiller with a cooling tower in Chennai's humid summer. Evaporating temperature 5&nbsp;&deg;C for 7&nbsp;&deg;C water, 16&nbsp;&deg;C for 18&nbsp;&deg;C water.</p>
<p>By (6): <i>COP</i><sub>Carnot</sub> = 278.15/35 = 7.95 at 5&nbsp;&deg;C and 289.15/24 = 12.05 at 16&nbsp;&deg;C. At 50&nbsp;% of Carnot the real COP is 3.97 and 6.02.</p>
<p>To remove 10&nbsp;MW of heat: compressor power = 10,000/3.97 = 2,517&nbsp;kW at 7&nbsp;&deg;C water, and 10,000/6.02 = 1,660&nbsp;kW at 18&nbsp;&deg;C water. The saving is <span class="ans">857&nbsp;kW, or 34&nbsp;%, about 3.7&nbsp;% per kelvin</span>, consistent with the rule of thumb of a few per cent per degree. Warmer water also lets the plant run on free cooling for more hours of the year.</p></div>

<p>The condenser side matters as much as the evaporator side. Every kelvin by which the condensing temperature falls also raises COP. The condensing temperature is set by the cooling-tower approach (leaving-water temperature minus ambient wet-bulb), the condenser approach and the cleanliness of the tubes. Scale and biological fouling in condenser tubes, poorly maintained tower fill and nozzles, and fixed-speed tower fans all push it up. These are maintenance problems with energy consequences, which leads naturally to Section&nbsp;6.7.</p>

### 6.4 Liquid cooling

<p>Above about 40 to 50&nbsp;kW per rack, air cannot remove heat at reasonable fan power and noise, and at 100&nbsp;kW and above liquid cooling is no longer optional. Two forms dominate. In <span class="kw">direct-to-chip</span> cooling, cold plates on the processors and accelerators carry water or a water&ndash;glycol mixture from a coolant distribution unit (CDU); about 75&nbsp;% of a server's heat can be removed this way, the rest still by air [@vertiv_liquid]. In <span class="kw">immersion</span> cooling, whole servers sit in a dielectric fluid. Water and other liquids carry several thousand times more heat per unit volume than air, so pumps replace most fans, and the coolant can be returned much warmer.</p>

<p>The NVIDIA and Vertiv study cited in Section&nbsp;3.3 quantified the gain in a 1 to 2&nbsp;MW high-density facility. Moving from 100&nbsp;% air cooling to 74.9&nbsp;% direct-to-chip cooling, together with the warmer chilled-water, supply-air and secondary-loop temperatures that liquid cooling allows, cut facility power by 18.1&nbsp;% and total data-centre power by 10.2&nbsp;% [@vertiv_liquid]. The largest benefit of liquid cooling, however, is the temperature at which heat leaves the building. ASHRAE's liquid-cooling classes allow facility water supplied at up to 32, 40 or 45&nbsp;&deg;C and beyond (classes W32 to W45 and W+) [@greencalc]. At those temperatures heat can be rejected by dry coolers without any compressor for most or all of the year, even in a hot climate, and the return water is warm enough to be useful (Section&nbsp;9).</p>

### 6.5 Free cooling in a hot, humid climate

<p>"Free cooling" means rejecting heat directly to outdoor air or water without running a compressor. In Northern Europe air-side economisers can run for most of the year. In Chennai, where the annual mean temperature is close to 29&nbsp;&deg;C and the wet-bulb temperature is high for much of the year, air-side economisers for conventional 7&nbsp;&deg;C chilled water are of little use. This is where warm-water liquid cooling changes the picture. A dry cooler with an approach of about 5&nbsp;K can deliver 45&nbsp;&deg;C water whenever the air is below about 40&nbsp;&deg;C, which in Chennai covers nearly all hours of the year, leaving only small trim chillers for the hottest afternoons. For tropical sites, therefore, liquid cooling is not only a density solution but also the main route to chiller-free operation.</p>

<p>Evaporative cooling is the other tropical option. It lowers peak cooling power substantially, by 25 to 35&nbsp;% in summer compared with dry cooling in one recent analysis, but it does so by evaporating water on precisely the hottest days, when water and grid stress are highest [@arxiv_water]. In a water-stressed city this trade-off has to be made explicitly (Section&nbsp;9.3).</p>

### 6.6 Intelligent control

<p>A cooling plant has many interacting set points: supply temperatures, pump pressures, number of chillers and towers in service, fan speeds. Each is usually set conservatively and left alone. In 2016 Google reported that a machine-learning system trained on years of sensor data, recommending set points to operators, consistently reduced the energy used for cooling by 40&nbsp;%, equivalent to a 15&nbsp;% reduction in the PUE overhead [@deepmind2016]. The lesson for smaller operators is not that they need DeepMind, but that most plants run far from their optimum, and that systematic, data-driven tuning of set points recovers a large part of the gap. Even simple measures, such as sequencing chillers by measured efficiency, resetting supply temperatures with load and weather, and shutting surplus towers and pumps, capture much of it.</p>

### 6.7 Condition monitoring of the cooling plant

<p>A point often missed in data-centre efficiency studies is that machines lose efficiency long before they fail. A pump running with a worn impeller, a misaligned coupling or a failing bearing still delivers flow, so the building management system shows nothing wrong, but it draws more power for the same duty. The same is true of a cooling-tower fan with an unbalanced or eroded blade, a gearbox with worn teeth, or a centrifugal chiller compressor with a degraded bearing. Condition monitoring, long standard in process plants, power stations and aerospace test facilities, is therefore an efficiency tool as well as a reliability tool. Table&nbsp;{#t:faults} lists common faults, their energy symptoms and how to detect them.</p>

<div class="tcap"><b>Table {#t:faults}.</b> Cooling-Plant Faults That Waste Energy Before They Cause Failure</div>

| Machine | Fault | Energy symptom | Detection |
|---|---|---|---|
| Pumps | Impeller wear, recirculation, operation far from best-efficiency point | More kW for the same flow and head | Vibration at vane-pass frequency; kW per (m³/h · m) trend |
| Pumps, fans | Misalignment, unbalance, soft foot | Extra bearing and coupling losses; higher motor current | Vibration at 1&times; and 2&times; running speed; thermography |
| Rolling bearings | Wear, poor lubrication | Friction losses; heat | Bearing defect frequencies; envelope analysis; temperature |
| Cooling-tower fans and gearboxes | Blade erosion, wrong pitch, gear wear | Less airflow per kW; higher tower approach | Vibration at gear-mesh frequency; approach-temperature trend |
| Chillers | Condenser fouling, low refrigerant charge, non-condensable gases | Higher condensing temperature; higher kW per kW of cooling | Condenser approach trend; kW/TR against design curve |
| Heat exchangers and coils | Fouling, air locks | Larger approach; more pump or fan power | Temperature-difference and pressure-drop trends |
| Motors and drives | Insulation ageing, harmonic heating, wrong drive tuning | Higher losses; poor power factor | Current signature analysis; power-quality logging |

<p>The economic logic is simple. A cooling plant serving 10&nbsp;MW of IT load may draw 2 to 3&nbsp;MW. If neglected faults raise that by only 5&nbsp;%, the loss is 100 to 150&nbsp;kW, around a thousand megawatt-hours a year, far more than the cost of the monitoring that would reveal it. Permanently installed accelerometers on critical pumps, fans and compressors, together with trended performance indices such as kW per tonne of refrigeration, approach temperatures and pump specific energy, turn maintenance from calendar-based to condition-based and keep the plant near its design efficiency.</p>

## 7. Power Delivery: Fewer Conversions, Higher Voltage

### 7.1 The conversion chain

<p>Electricity from the grid passes through a chain of conversions before it reaches the processor: medium-voltage to low-voltage transformation, the uninterruptible power supply (UPS), often a further transformer in the power distribution unit (PDU), the server power supply (AC to DC), and finally the voltage regulators on the board. The efficiency of the chain is the product of the stage efficiencies:</p>

<p class="eqn"><i>&eta;</i><sub>chain</sub> = &prod;<sub><i>i</i></sub> <i>&eta;</i><sub><i>i</i></sub> &nbsp;&nbsp;&nbsp;(7)</p>

<p>Because the stages multiply, small losses at each step add up, and every watt lost becomes heat that the cooling plant must also remove.</p>

<div class="figrow one"><figure id="fig-8"><a class="zoom" href="img/data-centre-power-demand-efficiency/fig7_power_chain.svg" target="_blank" rel="noopener"><img src="img/data-centre-power-demand-efficiency/fig7_power_chain.svg" alt="Bar charts of power remaining after each conversion stage for a legacy and an upgraded chain" loading="lazy" style="background:#fff;width:100%;max-width:820px"></a><figcaption><b>Figure 8.</b> Power remaining after each stage, per 100 units drawn from the grid, for the stage efficiencies of Table&nbsp;{#t:chain}. The legacy chain delivers 83.1 units to the server boards and the upgraded chain 93.6.<span class="credit">Chart by the author</span></figcaption></figure></div>

<div class="tcap"><b>Table {#t:chain}.</b> Assumed Stage Efficiencies at Typical Operating Load</div>

| Legacy chain | <i>&eta;</i> | Upgraded chain | <i>&eta;</i> |
|---|---|---|---|
| MV/LV transformer (conventional core) | 98.5 % | MV/LV transformer (amorphous core, right-sized) | 99.0 % |
| Double-conversion UPS at part load | 94.0 % | Modern UPS in eco-mode or SiC double conversion | 98.5 % |
| PDU transformer | 97.5 % | LV busway (no PDU transformer) | 99.5 % |
| Server PSU, older class | 92.0 % | Server PSU, Titanium class | 96.5 % |
| <b>Chain</b> | <b>83.05 %</b> | <b>Chain</b> | <b>93.63 %</b> |

<div class="worked"><p class="wt">WORKED EXAMPLE {#chain} &mdash; The cost of conversion losses at 100 MW</p>
<p>To deliver 100&nbsp;MW to the server boards, the legacy chain must draw 100/0.8305 = 120.4&nbsp;MW from the grid; the upgraded chain draws 100/0.9363 = 106.8&nbsp;MW.</p>
<p>Difference = <span class="ans">13.6&nbsp;MW, or about 119&nbsp;GWh a year</span>. The losses also appear as heat; at a cooling overhead of 0.25&nbsp;kW per kW of heat (assumed), a further 3.4&nbsp;MW of cooling power is avoided.</p>
<p>The individual steps look small: 0.5&nbsp;% here, 4.5&nbsp;% there. Together, across the global fleet, they are worth tens of terawatt-hours a year.</p></div>

<p>Several upgrades are routine. Modern modular UPS systems keep each module near its efficient load point instead of running a large unit lightly loaded, and many can run in an eco-mode in which the inverter is bypassed while the grid is healthy, transferring within milliseconds when it is not. Silicon-carbide power semiconductors raise double-conversion efficiency. Amorphous-core transformers cut the no-load losses that a lightly loaded transformer incurs all day. Higher-efficiency server power supplies, now widely available, remove a few per cent at the very end of the chain where it is most valuable.</p>

### 7.2 800 V DC distribution

<p>The most radical change now under way is to abandon AC distribution inside the building. AI racks today typically distribute 54&nbsp;V DC from rack-mounted power shelves to the compute trays. As racks pass 200&nbsp;kW, the currents and the copper this needs become impractical [@nv800]. NVIDIA and its power partners therefore propose to convert 13.8&nbsp;kV AC directly to 800&nbsp;V DC at the edge of the building with industrial rectifiers, removing most intermediate stages. They state that, compared with 415&nbsp;V AC distribution, an 800&nbsp;V DC busway carries 85&nbsp;% more power through the same conductor size and needs 45&nbsp;% less copper, with full production planned to coincide with megawatt-class racks in 2027 [@nv800; @nv800eco]. The physics can be checked with a simple calculation.</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#dc800} &mdash; Why higher voltage cuts copper and losses</p>
<p>Deliver 1&nbsp;MW. With 415&nbsp;V three-phase AC at power factor 0.95: <i>I</i> = 10<sup>6</sup>/(&radic;3 &times; 415 &times; 0.95) = 1,464&nbsp;A in each of three conductors. With 800&nbsp;V DC: <i>I</i> = 10<sup>6</sup>/800 = 1,250&nbsp;A in each of two conductors.</p>
<p>With the same resistance <i>R</i> per conductor, the losses are 3<i>I</i><sup>2</sup><i>R</i> for AC and 2<i>I</i><sup>2</sup><i>R</i> for DC. Ratio = 2 &times; 1,250<sup>2</sup> / (3 &times; 1,464<sup>2</sup>) = <span class="ans">0.49: about half the conductor loss, using two-thirds of the conductors</span>.</p>
<p>Inside a 200&nbsp;kW rack, 54&nbsp;V DC means 3,704&nbsp;A; 800&nbsp;V DC means 250&nbsp;A. For the same busbar resistance, <i>I</i><sup>2</sup><i>R</i> losses fall by (800/54)<sup>2</sup> &asymp; <span class="ans">219 times</span>. This, rather than any exotic technology, is why the industry is moving to higher voltage.</p></div>

<p>DC distribution brings its own engineering challenges, chiefly protection (DC arcs do not self-extinguish at a current zero as AC arcs do), safety standards and a new supply chain. But it also integrates naturally with batteries and solar generation, both of which are DC sources, and with the fast power-smoothing that synchronous AI loads need.</p>

## 8. Working With the Grid

<p>The previous sections reduce the energy a data centre uses. This section concerns its peak demand on the grid and its timing, which is often the binding constraint on connecting new capacity.</p>

### 8.1 Flexible load

<p>Grids are sized for the few hours of peak demand each year. For the rest of the year much of their capacity is idle. A study by Duke University's Nicholas Institute examined the 22 largest balancing authorities in the United States, serving 95&nbsp;% of the grid. It estimated that 76&nbsp;GW of new large load could be connected without new generation or transmission if the new loads accepted curtailment for 0.25&nbsp;% of their annual operating hours, rising to about 98&nbsp;GW at 0.5&nbsp;% and 126&nbsp;GW at 1&nbsp;%, with an average curtailment event lasting about two hours [@duke2025; @dcd_duke]. For comparison, total global data-centre capacity is of the order of 100&nbsp;GW [@spglobal2025].</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#flex} &mdash; How much curtailment is that?</p>
<p>0.25&nbsp;% of 8,760&nbsp;h = <span class="ans">21.9 hours a year</span>; 0.5&nbsp;% = 43.8&nbsp;h; 1&nbsp;% = 87.6&nbsp;h. At an average of two hours per event, the 0.25&nbsp;% case is about eleven events a year, mostly on summer or winter peak days.</p>
<p>A 100&nbsp;MW campus that must cut 25&nbsp;MW for up to four hours without disturbing its computing needs a battery of 25 &times; 4 = <span class="ans">100&nbsp;MWh</span>, or can achieve the same by pausing deferrable training and batch jobs, or by a mix of the two.</p></div>

<p>The study is a first-order estimate, and critics point out that many data-centre contracts and workloads are not designed to be interrupted, so the full headroom will not be realised automatically [@handshy]. But the principle is sound. AI training jobs checkpoint their progress and can pause; batch analytics can wait; even inference can be shifted between regions. On-site batteries, already installed for backup, can cover short events. A connection agreement that trades a small, bounded curtailment for a much faster connection is often attractive to both sides.</p>

### 8.2 Storage and smoothing

<p>Batteries in data centres have traditionally been sized for a few minutes of UPS autonomy. Larger battery systems can do much more: shave peaks, ride through curtailment events, absorb the rapid power swings of synchronous AI training, and provide frequency services to the grid. Because the grid sees a smoother, more predictable load, less network capacity has to be reserved. Lithium-ion and other modern batteries also replace part of the role of diesel generators, which run only for testing in most years but must be maintained and fuelled.</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#ramp} &mdash; Smoothing a synchronous training load</p>
<p>A 100&nbsp;MW training cluster pauses all accelerators together at a checkpoint, and its load drops by 30&nbsp;MW within about a second (assumed). Suppose the grid operator limits the ramp of a large load to 10&nbsp;MW per minute (assumed). On-site storage must then absorb the difference and release the change gradually over 30/10 = 3 minutes.</p>
<p>Power rating needed = <span class="ans">30&nbsp;MW</span>. Energy shifted = &frac12; &times; 30&nbsp;MW &times; 3&nbsp;min = 45&nbsp;MW&middot;min = <span class="ans">0.75&nbsp;MWh</span>. The task needs high power for minutes, not energy for hours, which suits supercapacitors or batteries designed for high C-rates, and can share hardware with the UPS. Software can help too: staggering checkpoints across groups of accelerators, or briefly running dummy work to hold the load steady, reduces the swing at source.</p></div>

### 8.3 More from the existing network

<p>The IEA estimates that grid-enhancing technologies, which include dynamic line rating, advanced high-capacity conductors and power-flow control, could unlock up to 175&nbsp;GW of transmission capacity without building new lines, more than the increase in data-centre load to 2030 in its Base Case [@iea2025; @nsenergy]. Dynamic line rating is a good example of the instrumentation approach: a line's safe rating depends on its conductor temperature, which in turn depends on wind and ambient temperature. Measuring these instead of assuming worst-case conditions typically reveals spare capacity on most days.</p>

### 8.4 Siting

<p>Not every computation needs to be done near its users. Training of large models, and much batch processing, tolerates latency and can be placed where clean power is abundant, the climate is cool or water is plentiful. Inference that must answer within milliseconds needs to be closer to users. Separating the two in planning, and steering the flexible portion to regions with surplus generation, eases the pressure on congested urban grids.</p>

## 9. Heat and Water

### 9.1 Reusing the heat

<p>Almost all the electricity a data centre uses ends up as low-grade heat. In cold countries that heat can warm homes. Meta's data centre at Odense, Denmark, passes water from the city's district-heating network through its cooling coils; large ammonia heat pumps then raise it to 70 to 75&nbsp;&deg;C for the network [@meta2018; @ramboll]. The first phase was designed to recover 100,000&nbsp;MWh a year, enough for 6,900 homes [@meta2018]; the expanded heat-pump plant, about 45&nbsp;MW of heat, is designed to recover 215,000&nbsp;MWh a year, and the heating company reports supplying the equivalent of about 11,000 households [@ramboll; @scienceblog]. Warm-water liquid cooling makes such reuse easier, because heat leaving the servers at 45 to 60&nbsp;&deg;C needs a smaller temperature lift.</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#heat} &mdash; Heat from a 20 MW liquid-cooled campus</p>
<p>IT load 20&nbsp;MW; 75&nbsp;% captured in the liquid loop at about 45&nbsp;&deg;C, giving <i>Q</i><sub>src</sub> = 15&nbsp;MW. A heat pump lifting it to 70&nbsp;&deg;C with an assumed COP of 4 delivers</p>
<p class="eqn"><i>Q</i><sub>del</sub> = <i>Q</i><sub>src</sub> &times; <i>COP</i> / (<i>COP</i> &minus; 1) = 15 &times; 4/3 = 20&nbsp;MW &nbsp;&nbsp;&nbsp;(8)</p>
<p>for an electrical input of 5&nbsp;MW. At 95&nbsp;% availability that is <span class="ans">about 166&nbsp;GWh of heat a year</span>, comparable to the Odense scheme. In a cold city this heat displaces gas or coal boilers; the data centre's electricity is then used twice.</p></div>

### 9.2 Reusing heat in a hot country

<p>In India there is no district heating, so the Odense model does not transfer directly. The heat still has uses. Adsorption chillers can be driven by water at about 55 to 65&nbsp;&deg;C with a COP of roughly 0.5 to 0.6 (typical values); 15&nbsp;MW of recovered heat could then provide about 8&nbsp;MW of cooling for neighbouring offices or for the data centre's own air-cooled loads. Industrial users near data-centre parks, such as laundries, food processing, textile pre-heating and the pre-heating of feed water for thermal desalination, can use low-grade heat directly. These uses need planning at the scale of the industrial park, which is a reason for state data-centre policies to encourage siting next to suitable heat users.</p>

### 9.3 Water

<p>Water usage effectiveness (WUE) is the annual site water consumption divided by the IT energy, in litres per kilowatt-hour [@femp_water]. Evaporative cooling systems typically use about 1,800 to 2,900 litres per megawatt-hour, that is 1.8 to 2.9&nbsp;L/kWh [@arxiv_compute]. Reported company averages are lower: Equinix reported 0.91&nbsp;L/kWh across its sites in 2025 and 1.41&nbsp;L/kWh at sites using evaporative cooling [@wiki_wue]. Lawrence Berkeley National Laboratory expects the US average site WUE to be about 0.45 to 0.48&nbsp;L/kWh [@lbnl2024]. The European Climate Neutral Data Centre Pact sets maximum WUE values by climate and water stress, down to 0.4&nbsp;L/kWh for potable water in areas of high water stress [@cndcp]. Closed-loop dry cooling uses almost no water at the site, at the cost of more electricity on hot days.</p>

<div class="worked"><p class="wt">WORKED EXAMPLE {#water} &mdash; Water for a 100 MW campus</p>
<p>IT energy = 100&nbsp;MW &times; 8,760&nbsp;h = 876,000&nbsp;MWh a year.</p>
<p>At WUE 1.8&nbsp;L/kWh: water = 876 &times; 10<sup>6</sup> kWh &times; 1.8 = <span class="ans">1,577 million litres a year, or 4.3 million litres a day</span>. At the Indian urban supply norm of 135 litres per person per day [@cpheeo], that is the daily water of about 32,000 people.</p>
<p>At WUE 0.4: 0.96 million litres a day. With closed-loop liquid cooling and dry coolers (WUE about 0.1): 0.24 million litres a day.</p></div>

<p>Water and electricity therefore have to be optimised together. In a water-stressed city the right choice may be dry cooling with a slightly higher PUE, using treated sewage water for any evaporative trim, rather than the lowest possible PUE bought with drinking water.</p>
