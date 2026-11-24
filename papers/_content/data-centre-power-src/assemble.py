#!/usr/bin/env python3
"""
TOOL:    papers/_content/data-centre-power-src/assemble.py
FAMILY:  papers
VERSION: 1.2.0
DATE:    2026-11-24
CHAT:    Data centre power surge and efficiency technical paper
CHANGES: 1.2.0 - worked examples and tables numbered automatically from {#key} / {#t:key} markers
         1.1.0 - two references added (CEA emission factor, IEA emissions outlook)
         1.0.0 - joins part1-3.md, numbers [@key] citations by first appearance (IEEE order) and writes
                 _content/data-centre-power-demand-efficiency.md with the References list
STATUS:  working

Run: python3 assemble.py
"""
__version__ = "1.2.0"

import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
OUT = HERE.parent / "data-centre-power-demand-efficiency.md"

REFS = {
 "iea2025": 'International Energy Agency, <i>Energy and AI</i>, World Energy Outlook Special Report. Paris, France: IEA, Apr. 2025. [Online]. Available: https://www.iea.org/reports/energy-and-ai',
 "iea2025ch2": 'International Energy Agency, &ldquo;Energy demand from AI,&rdquo; in <i>Energy and AI</i>. Paris, France: IEA, 2025. [Online]. Available: https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai',
 "iea2026": 'International Energy Agency, <i>Key Questions on Energy and AI</i>, World Energy Outlook Special Report. Paris, France: IEA, Apr. 2026. [Online]. Available: https://www.iea.org/reports/key-questions-on-energy-and-ai',
 "iet2026": 'IET Engineering Exchange, &ldquo;IEA warns AI data centre electricity use will triple by 2030,&rdquo; 2026. [Online]. Available: https://engx.theiet.org/b/articles/posts/iea-warns-ai-data-centre-electricity-use-will-triple-by-2030',
 "ecobiz2026": 'Eco-Business, &ldquo;AI&rsquo;s energy appetite is outpacing deployment of AI-based climate solutions: IEA,&rdquo; 2026. [Online]. Available: https://www.eco-business.com/news/ais-energy-appetite-is-outpacing-deployment-of-ai-based-climate-solutions-iea/',
 "euronews2026": 'Euronews, &ldquo;Data centre energy consumption could double by 2030, straining grids, IEA warns,&rdquo; 19 Nov. 2026. [Online]. Available: https://www.euronews.com/2026/11/19/data-centre-energy-consumption-could-double-by-2030-straining-grids-iea-warns',
 "nsenergy": 'NS Energy, &ldquo;Energy and AI: key findings from the IEA,&rdquo; 2025. [Online]. Available: https://www.nsenergybusiness.com/analysis/energy-and-ai-key-findings-from-the-iea/',
 "uptime2025": 'D. Donnellan <i>et al.</i>, &ldquo;Uptime Institute Global Data Center Survey 2025,&rdquo; Uptime Institute, Keynote Rep. 180, Jul. 2025. [Online]. Available: https://intelligence.uptimeinstitute.com/resource/uptime-institute-global-data-center-survey-2025',
 "uptime2026": 'Uptime Institute, &ldquo;The growing PUE advantage of larger data centers,&rdquo; UII Update 518, 6 Aug. 2026. [Online]. Available: https://intelligence.uptimeinstitute.com/resource/growing-pue-advantage-larger-data-centers',
 "credence": 'Credence Research, &ldquo;What is PUE in data centers,&rdquo; 2026 (summary of Uptime Institute survey series 2007&ndash;2025). [Online]. Available: https://www.credenceresearch.com/blog/what-is-pue-in-data-centers',
 "mgrid2025": 'mGrid, &ldquo;Global data center PUE stalls at 1.54,&rdquo; Oct. 2025. [Online]. Available: https://mgrid.org/2025/10/01/uptime-institute-data-center-pue-stagnation-2025-liquid-cooling/',
 "femp": 'U.S. Department of Energy, Federal Energy Management Program, &ldquo;Cooling water efficiency opportunities for federal data centers.&rdquo; [Online]. Available: https://www.energy.gov/cmei/femp/cooling-water-efficiency-opportunities-federal-data-centers',
 "femp_water": 'U.S. Department of Energy, Federal Energy Management Program, &ldquo;Cooling water efficiency opportunities for federal data centers&rdquo; (WUE definition). [Online]. Available: https://www.energy.gov/cmei/femp/cooling-water-efficiency-opportunities-federal-data-centers',
 "iso30134": 'Information technology &ndash; Data centres &ndash; Key performance indicators &ndash; Part 2: Power usage effectiveness (PUE), ISO/IEC 30134-2:2016, 2016.',
 "dcd2025": 'DatacenterDynamics, &ldquo;IEA: Data center energy consumption set to double by 2030 to 945 TWh,&rdquo; Apr. 2025. [Online]. Available: https://datacenterdynamics.com/en/news/iea-data-center-energy-consumption-set-to-double-by-2030-to-945twh',
 "nv800": 'NVIDIA, &ldquo;NVIDIA 800 VDC architecture will power the next generation of AI factories,&rdquo; NVIDIA Technical Blog, 2025. [Online]. Available: https://developer.nvidia.com/blog/nvidia-800-v-hvdc-architecture-will-power-the-next-generation-of-ai-factories/',
 "nv800eco": 'NVIDIA, &ldquo;Building the 800 VDC ecosystem for efficient, scalable AI factories,&rdquo; NVIDIA Technical Blog, 2025. [Online]. Available: https://developer.nvidia.com/blog/building-the-800-vdc-ecosystem-for-efficient-scalable-ai-factories',
 "gri2026": 'GRI Institute, &ldquo;India data centres: powering the 9 GW ambition amid grid constraints,&rdquo; 2026. [Online]. Available: https://news.griinstitute.org/en/real-estate/india-data-centres-powering-the-9-gw-ambition-amid-grid-constraints',
 "thestar2026": 'The Star, &ldquo;India&rsquo;s data centre boom is straining its power grid,&rdquo; 8 May 2026. [Online]. Available: https://www.thestar.com.my/aseanplus/aseanplus-news/2026/05/08/indias-data-centre-boom-is-straining-its-power-grid',
 "vertiv_liquid": 'Vertiv, &ldquo;Quantifying data center PUE when introducing liquid cooling&rdquo; (summary of the NVIDIA&ndash;Vertiv ASME paper &ldquo;Power usage effectiveness analysis of a high-density air-liquid hybrid cooled data center&rdquo;). [Online]. Available: https://www.vertiv.com/en-us/about/news-and-events/articles/blog-posts/quantifying-data-center-pue-when-introducing-liquid-cooling/',
 "owid2026": 'H. Ritchie, &ldquo;How much energy do data centers and artificial intelligence use?&rdquo; Our World in Data, 20 Jul. 2026. [Online]. Available: https://ourworldindata.org/how-much-energy-do-data-centers-and-artificial-intelligence-use',
 "brookings": 'Brookings Institution, &ldquo;Global energy demands within the AI regulatory landscape,&rdquo; 2026. [Online]. Available: https://www.brookings.edu/global-energy-demands-within-the-ai-regulatory-landscape/',
 "msr2026": 'F. Oviedo <i>et al.</i>, &ldquo;Energy use of AI inference: efficiency pathways and test-time compute,&rdquo; Microsoft Research. [Online]. Available: https://www.microsoft.com/en-us/research/?p=1150769',
 "koomey2015": 'J. Burt, &ldquo;30 percent of servers worldwide sit idle, report says&rdquo; (on J. Koomey and J. Taylor, Anthesis Group, with TSO Logic data), eWeek, 15 Jun. 2015; see also Computerworld, &ldquo;1 in 3 data center servers is a zombie.&rdquo; [Online]. Available: https://www.computerworld.com/article/2937408/1-in-3-data-center-servers-is-a-zombie.html',
 "koomey2017": 'Computerworld, &ldquo;A third of virtual servers are zombies&rdquo; (on J. Koomey and J. Taylor, 16,000-server study), 2017. [Online]. Available: https://www.computerworld.com/article/3196355/a-third-of-virtual-servers-are-zombies.html',
 "ashrae": 'ASHRAE Technical Committee 9.9, <i>Thermal Guidelines for Data Processing Environments</i>, 5th ed. Atlanta, GA, USA: ASHRAE, 2021.',
 "greencalc": 'GreenCalculus, &ldquo;ASHRAE TC 9.9 thermal guidelines for data centers&rdquo; (summary of air and liquid classes, 5th ed.), 2026. [Online]. Available: https://greencalculus.com/standards/ashrae-tc-9-9-thermal-guidelines/',
 "energystar": 'ENERGY STAR, &ldquo;How to balance ambient data center setpoints with IT equipment energy use.&rdquo; [Online]. Available: https://energystar.gov/products/ask-the-experts/how-balance-ambient-data-center-setpoints-it-equipment-energy-use',
 "vertiv_rat": 'Vertiv, &ldquo;Elevated return air temperature&rdquo; (application note, Asia). [Online]. Available: https://prep.vertiv.com/499702/globalassets/products/thermal-management/in-row-cooling/vertiv_ap__elevated_return_air_temperature__-_en_-_asia_302442_0.pdf',
 "arxiv_water": '&ldquo;AI data centers and the water use feedback loop,&rdquo; arXiv:2606.21760, 2026. [Online]. Available: https://arxiv.org/pdf/2606.21760',
 "deepmind2016": 'R. Evans and J. Gao, &ldquo;DeepMind AI reduces Google data centre cooling bill by 40%,&rdquo; Google DeepMind blog, 20 Jul. 2016. [Online]. Available: https://deepmind.google/blog/deepmind-ai-reduces-google-data-centre-cooling-bill-by-40/',
 "duke2025": 'T. H. Norris, T. Profeta, D. Patino-Echeverri and A. Cowie-Haskell, &ldquo;Rethinking load growth: assessing the potential for integration of large flexible loads in US power systems,&rdquo; Nicholas Institute for Energy, Environment &amp; Sustainability, Duke Univ., Durham, NC, USA, Rep. NI R 25-01, Feb. 2025. [Online]. Available: https://nicholasinstitute.duke.edu/publications/rethinking-load-growth',
 "dcd_duke": 'DatacenterDynamics, &ldquo;Data centers could unlock 76 GW of US grid capacity through optional curtailment &ndash; report,&rdquo; Feb. 2025. [Online]. Available: https://datacenterdynamics.com/en/news/data-centers-could-unlock-76gw-of-us-grid-capacity-through-optional-curtailment-report',
 "spglobal2025": 'S&amp;P Global Commodity Insights, &ldquo;Global data center power demand to double by 2030 on AI surge: IEA,&rdquo; 10 Apr. 2025. [Online]. Available: https://www.spglobal.com/commodity-insights/en/news-research/latest-news/electric-power/041025-global-data-center-power-demand-to-double-by-2030-on-ai-surge-iea',
 "handshy": 'B. Handshy, &ldquo;Duke&rsquo;s &lsquo;Rethinking Load Growth&rsquo; study is being misused in the large load interconnection debate,&rdquo; Medium, 2026. [Online]. Available: https://medium.com/@brianwhandshy/dukes-rethinking-load-growth-study-is-being-misused-in-the-interconnection-debate-b7d3d981e8ca',
 "meta2018": 'Meta (Facebook) Engineering, &ldquo;This data center will warm their hearts, or at least heat their homes,&rdquo; 26 Apr. 2018. [Online]. Available: https://tech.facebook.com/engineering/2018/4/odense-dc',
 "ramboll": 'Ramboll, &ldquo;Meta: surplus heat to district heating&rdquo; (Tietgenbyen Energy Center, Odense). [Online]. Available: https://www.ramboll.com/en-us/technology/projects/energy/meta-surplus-heat-to-district-heating',
 "scienceblog": 'ScienceBlog, &ldquo;A data center in Denmark gives away heat that data centers often waste,&rdquo; 2026. [Online]. Available: https://scienceblog.com/data-center-denmark-gives-away-heat-data-centers/',
 "arxiv_compute": '&ldquo;Compute at scale: a broad investigation into the data center industry,&rdquo; arXiv:2311.02651, 2023. [Online]. Available: https://arxiv.org/pdf/2311.02651',
 "wiki_wue": 'Wikipedia, &ldquo;Water usage effectiveness&rdquo; (citing Equinix sustainability report 2025). [Online]. Available: https://en.wikipedia.org/wiki/Water_usage_effectiveness',
 "lbnl2024": 'A. Shehabi <i>et al.</i>, &ldquo;2024 United States data center energy usage report,&rdquo; Lawrence Berkeley National Laboratory, Berkeley, CA, USA, Rep. LBNL-2001637, Dec. 2024; WUE projection as summarised by Vertiv, &ldquo;Optimizing water usage effectiveness for data centers.&rdquo; [Online]. Available: https://www.vertiv.com/en-asia/insights/articles/educational-articles/optimizing-water-usage-effectiveness-for-data-centers/',
 "cndcp": 'Climate Neutral Data Centre Pact, &ldquo;White paper on data centre responsible use of water,&rdquo; 2024 rev. [Online]. Available: https://www.climateneutraldatacentre.net/wp-content/uploads/2025/01/White-paper-on-DC-responsible-use-of-water-2024-Revision.pdf',
 "cpheeo": 'Central Public Health and Environmental Engineering Organisation, <i>Manual on Water Supply and Treatment</i>, 3rd ed. New Delhi, India: Ministry of Urban Development, 1999.',
 "bt_kf": 'Business Today, &ldquo;From Mumbai to Jamnagar: India&rsquo;s data centre map is rapidly expanding, shows report&rdquo; (Knight Frank India Data Centre Market Update 2025), 23 Jun. 2026. [Online]. Available: https://www.businesstoday.in/technology/news/story/from-mumbai-to-jamnagar-indias-data-centre-map-is-rapidly-expanding-shows-report-538760-2026-06-23',
 "crn2026": 'CRN Asia, &ldquo;India&rsquo;s data centre capacity crosses 1.5 GW as metro hubs drive growth&rdquo; (Ministry of Electronics &amp; IT statement), 2026. [Online]. Available: https://www.crnasia.com/india/news/2026/india-s-data-centre-capacity-crosses-1-5-gw-as-metro-hubs-drive-growth',
 "bt_cbre": 'Business Today, &ldquo;India data centre capacity to jump 30% in 2026; 500 MW supply boost expected: CBRE report,&rdquo; 1 Apr. 2026. [Online]. Available: https://www.businesstoday.in/technology/story/india-data-centre-capacity-to-jump-30-in-2026-500-mw-supply-boost-expected-cbre-report-523529-2026-04-01',
 "ibef2026": 'IBEF, &ldquo;India data centre pipeline: 3,860 MW of new capacity expected by 2030&rdquo; (Cushman &amp; Wakefield India Data Centre H1 2026 Update), 17 Sep. 2026. [Online]. Available: https://www.ibef.org/news/india-data-centre-pipeline-3-860-mw-of-new-capacity-expected-by-2030',
 "tribune2026": 'Asianet Newsable, &ldquo;India&rsquo;s data centre market doubles capacity, eyes 4 GW IT by 2030&rdquo; (Savills India), Jan. 2026. [Online]. Available: https://newsable.asianetnews.com/business/indias-data-centre-market-doubles-capacity-eyes-4-gw-it-by-2030-articleshow-waiwaep',
 "aim2026": 'Analytics India Magazine, &ldquo;India&rsquo;s data centre boom outpaces power planning&rdquo; (Ministry of Power and S&amp;P Global estimates), 2026. [Online]. Available: https://analyticsindiamag.com/ai-features/indias-data-centre-boom-outpaces-power-planning',
 "hans2021": 'The Hans India, &ldquo;MK Stalin announces plan to make Tamil Nadu the number one data centre destination in India,&rdquo; Nov. 2021. [Online]. Available: https://www.thehansindia.com/tamilnadu/mk-stalin-announces-plan-to-make-tamil-nadu-the-number-one-data-centre-destination-in-india-717168',
 "dte_chennai": 'Down To Earth, &ldquo;The hidden cost of Chennai&rsquo;s data centre boom: can the city afford AI&rsquo;s water and power hunger?&rdquo; 2026. [Online]. Available: https://www.downtoearth.org.in/science-technology/the-hidden-cost-of-chennais-data-centre-boom-can-the-city-afford-ais-water-and-power-hunger',
 "dtnext2026": 'DT Next, &ldquo;Happy to say no to water-guzzling data centres, Rajaa shares alternate vision,&rdquo; 2026. [Online]. Available: https://www.dtnext.in/news/tamilnadu/happy-to-say-no-to-water-guzzling-data-centres-rajaa-shares-alternate-vision',
 "commtoday2026": 'Communications Today, &ldquo;Headlines of the day&rdquo; (Tamil Nadu Sustainable Data Centre Policy 2026&ndash;2031), 2026. [Online]. Available: https://www.communicationstoday.co.in/?p=426149',
 "mongabay2026": 'Mongabay India, &ldquo;India bets on data centres even as water, energy use concerns mount,&rdquo; May 2026. [Online]. Available: https://india.mongabay.com/2026/05/india-bets-on-data-centres-even-as-water-energy-use-concerns-mount/',
 "cea2024": 'Saur Energy, &ldquo;CEA&rsquo;s CO2 baseline database: impact of RE on Indian grid emissions intensity&rdquo; (Central Electricity Authority, <i>CO2 Baseline Database for the Indian Power Sector</i>, Ver. 20.0, Dec. 2024). [Online]. Available: https://www.saurenergy.com/solar-energy-news/ceas-co2-baseline-database-impact-of-re-on-indian-grid-emissions-intensity',
 "brussels2025": 'The Brussels Times, &ldquo;Data centres will double global electricity demand by 2030 &ndash; IEA,&rdquo; Apr. 2025. [Online]. Available: https://www.brusselstimes.com/business/1528980/data-centres-will-double-global-electricity-demand-by-2030-iea',
 "dtnext_peak": 'DT Next, &ldquo;Heat pushes power demand in Tamil Nadu to record July high,&rdquo; Jul. 2026. [Online]. Available: https://www.dtnext.in/news/tamilnadu/heat-pushes-power-demand-in-tamil-nadu-to-record-july-high',
 "statesman2026": 'The Statesman, &ldquo;Early summer heat sharply pushes Tamil Nadu&rsquo;s power demand,&rdquo; Mar. 2026. [Online]. Available: https://www.thestatesman.com/india/early-summer-heat-sharply-pushes-tamil-nadus-power-demand-1503567503.html',
 "dtnext_wind": 'DT Next, &ldquo;TN wind power hits record 6,578 MW, renewables meet over 42% of State&rsquo;s demand,&rdquo; Jul. 2026. [Online]. Available: https://www.dtnext.in/news/tamilnadu/tn-wind-power-hits-record-6578-mw-renewables-meet-over-42-of-states-demand',
 "dtnext_solar": 'DT Next, &ldquo;Tamil Nadu&rsquo;s wind power tops 100 MU for eighth straight day, solar output hits record high,&rdquo; Jul. 2026. [Online]. Available: https://www.dtnext.in/news/tamilnadu/tamil-nadus-wind-power-tops-100-mu-for-eighth-straight-day-solar-output-hits-record-high',
 "eu_eed": 'Directive (EU) 2023/1791 of the European Parliament and of the Council on energy efficiency (recast), Art. 12, <i>Official Journal of the European Union</i>, L 231, 20 Sep. 2023.',
}


def main():
    text = "".join((HERE / f"part{i}.md").read_text(encoding="utf-8") for i in (1, 2, 3))
    # worked examples {#key} and tables {#t:key}: numbered by order of definition
    ex = re.findall(r"WORKED EXAMPLE \{#([a-z0-9]+)\}", text)
    tb = re.findall(r"<b>Table \{#t:([a-z0-9]+)\}\.</b>", text)
    assert len(ex) == len(set(ex)) and len(tb) == len(set(tb)), "duplicate example or table key"
    text = re.sub(r"\{#t:([a-z0-9]+)\}", lambda m: str(tb.index(m.group(1)) + 1), text)
    text = re.sub(r"\{#([a-z0-9]+)\}", lambda m: str(ex.index(m.group(1)) + 1), text)
    print(f"{len(ex)} worked examples, {len(tb)} tables")
    order = []

    def number(m):
        keys = [k.strip().lstrip("@") for k in m.group(1).split(";")]
        nums = []
        for k in keys:
            if k not in REFS:
                raise SystemExit(f"unknown reference key: {k}")
            if k not in order:
                order.append(k)
            nums.append(order.index(k) + 1)
        nums = sorted(set(nums))
        # compress runs: [3]-[5]
        out, i = [], 0
        while i < len(nums):
            j = i
            while j + 1 < len(nums) and nums[j + 1] == nums[j] + 1:
                j += 1
            out.append(f"[{nums[i]}]" if j - i < 2 else f"[{nums[i]}]&ndash;[{nums[j]}]")
            if 0 < j - i < 2:
                out[-1] = ", ".join(f"[{n}]" for n in nums[i:j + 1])
            i = j + 1
        return ", ".join(out)

    text = re.sub(r"\[(@[a-z0-9_]+(?:;\s*@[a-z0-9_]+)*)\]", number, text)
    unused = [k for k in REFS if k not in order]
    if unused:
        print("unused refs:", unused)
    refs = "\n".join(f"{i}. " + re.sub(r"Available: (https?://\S+)", r"Available: <\1>", REFS[k])
                     for i, k in enumerate(order, 1))
    text = text.rstrip() + "\n\n## References\n\n" + refs + "\n"
    OUT.write_text(text, encoding="utf-8")
    print(f"wrote {OUT.name}: {len(order)} references, {len(re.sub(r'<[^>]+>', ' ', text).split())} words")


if __name__ == "__main__":
    main()
