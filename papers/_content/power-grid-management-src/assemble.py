#!/usr/bin/env python3
"""
TOOL:    papers/_content/power-grid-management-src/assemble.py
FAMILY:  papers
VERSION: 1.2.0
DATE:    2026-11-24
CHAT:    Power and grid management technical paper
CHANGES: 1.2.0 - equations numbered from {#e:key}; summary-table rows sorted by example number
         1.1.0 - figures numbered automatically from {#f:key}; references for added sections
         1.0.0 - joins part1-4.md, numbers worked examples, tables and [@key] citations (IEEE order) and writes
                 _content/power-grid-management-worldwide.md with the References list
STATUS:  working

Run: python3 assemble.py
"""
__version__ = "1.2.0"

import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
OUT = HERE.parent / "power-grid-management-worldwide.md"

REFS = {
 'nrel_uri': 'National Renewable Energy Laboratory, &ldquo;Electricity reliability and the February 2021 Texas event,&rdquo; presentation, NREL/PR-80071, 2021. [Online]. Available: https://www.nrel.gov/docs/fy21osti/80071.pdf',
 'energetica_256': 'Energetica India, &ldquo;India meets record 256.1 GW peak power demand without shortage, solar contributes 21.5 percent,&rdquo; Apr. 2026. [Online]. Available: https://energetica-india.net/news/india-meets-record-256-gw-peak-power-demand-without-shortage-solar-contributes-21-5-percent',
 'en_sa': 'Engineering News, &ldquo;Invest in grids today or face gridlock tomorrow, IEA warns,&rdquo; 17 Oct. 2023. [Online]. Available: https://www.engineeringnews.co.za/print-version/invest-in-grids-today-or-face-gridlock-tomorrow-iea-warns-2023-10-17',
 'gi_as': 'R. K. Porwal, Grid Controller of India, &ldquo;Evolution and emerging landscape for ancillary services,&rdquo; presentation, 25 Jul. 2025. [Online]. Available: https://cer.iitk.ac.in/assets/downloads/CBP/presentation/Day2/DSO_Evolution_and_Emerging_Landscape_for_Ancillary_Services2025.pdf',
 'nerc_load': 'NERC, &ldquo;Incident review: considering simultaneous voltage-sensitive load reductions,&rdquo; Jan. 2025. [Online]. Available: https://nerc.com/pa/rrm/ea/Documents/Incident_Review_Large_Load_Loss.pdf',
 'wc_nerc': 'White &amp; Case, &ldquo;NERC on emerging large loads&rdquo; (summary of the 2024 Long-Term Reliability Assessment), 2025. [Online]. Available: https://www.whitecase.com/node/134326',
 'pjm_load': 'PJM Inside Lines, &ldquo;PJM, Dominion review large load transfer event,&rdquo; 2026. [Online]. Available: https://insidelines.pjm.com/pjm-dominion-review-large-load-transfer-event/',
 'ns_nerc': 'NS Energy, &ldquo;NERC on data centres and grid voltage disturbances,&rdquo; 2025. [Online]. Available: https://www.nsenergybusiness.com/analysis/nerc-on-data-centres-and-grid-voltage-disturbances/',
 'pl_hf': 'Power Line, &ldquo;Maintaining stability: GRID-India&rsquo;s report on high frequency system operation,&rdquo; Nov. 2024. [Online]. Available: https://powerline.net.in/2024/11/04/299977/',
 'pl_mc': 'Power Line, &ldquo;Implementing market coupling: India could learn from the European Union experience,&rdquo; Nov. 2025. [Online]. Available: https://powerline.net.in/2025/11/06/implementing-market-coupling-india-could-learn-from-the-european-union-experience/',
 'mercom_mc': 'Mercom India, &ldquo;CERC directs phased rollout of power market coupling from January 2026,&rdquo; Jul. 2025. [Online]. Available: https://mercomindia.com/cerc-directs-phased-rollout-of-power-market-coupling-from-january-2026',
 'en_mco': 'Energetica India, &ldquo;CERC proposes market coupling, Grid India to act as market coupling operator,&rdquo; Apr. 2026. [Online]. Available: https://energetica-india.net/news/cerc-proposes-market-coupling-grid-india-to-act-as-market-coupling-operator',
 'iea_mid2026': 'International Energy Agency, &ldquo;Global electricity demand growth set to accelerate as power systems adjust to recent shocks&rdquo; (<i>Electricity Mid-Year Update 2026</i>), Jul. 2026. [Online]. Available: https://www.iea.org/news/global-electricity-demand-growth-set-to-accelerate-as-power-systems-adjust-to-recent-shocks',
 'dte_mid2026': 'Down To Earth, &ldquo;Global power demand to grow 3.6% in 2026 as renewables overtake coal: IEA,&rdquo; 2026. [Online]. Available: https://www.downtoearth.org.in/amp/story/energy/global-power-demand-to-grow-36-in-2026-as-renewables-overtake-coal-iea',
 'iea_elec2026': 'International Energy Agency, &ldquo;Global electricity demand is set to grow strongly to 2030, underscoring need for investments in grids and flexibility&rdquo; (<i>Electricity 2026</i>), Feb. 2026. [Online]. Available: https://www.iea.org/news/global-electricity-demand-is-set-to-grow-strongly-to-2030-underscoring-need-for-investments-in-grids-and-flexibility',
 'iea_elec2026g': 'International Energy Agency, &ldquo;Grids,&rdquo; in <i>Electricity 2026</i>. Paris, France: IEA, 2026. [Online]. Available: https://www.iea.org/reports/electricity-2026/grids',
 'iea_grids2023': 'International Energy Agency, <i>Electricity Grids and Secure Energy Transitions</i>, Executive summary. Paris, France: IEA, Oct. 2023. [Online]. Available: https://www.iea.org/reports/electricity-grids-and-secure-energy-transitions/executive-summary',
 'dte_grids': 'Down To Earth, &ldquo;Improving utilities&rsquo; finances, workforce investment could better grid establishment to integrate renewables: IEA,&rdquo; Oct. 2023. [Online]. Available: https://www.downtoearth.org.in/energy/improving-utilities-finances-workforce-investment-could-better-grid-establishment-to-integrate-renewables-iea-92347',
 'greentech_elec': 'GreenTech Lead, &ldquo;Global electrification investment to hit $2 trillion in 2026&rdquo; (IEA Special Report on Electrification), 2026. [Online]. Available: https://greentechlead.com/?p=55516',
 'iwei2026': 'Industrial Info Resources, &ldquo;IEA: global energy capex to grow 5% to US$3.4 trillion in 2026&rdquo; (<i>World Energy Investment 2026</i>), 2026. [Online]. Available: https://www.industrialinfo.com/news/article/iea-global-energy-capex-to-grow-5-to-us34-trillion-in-2026--358576',
 'iea_supply': 'International Energy Agency, <i>Building the Future Transmission Grid: Strategies to Navigate Supply Chain Challenges</i>, Executive summary. Paris, France: IEA, 2025. [Online]. Available: https://www.iea.org/reports/building-the-future-transmission-grid/executive-summary',
 'lbnl_q2026': 'Lawrence Berkeley National Laboratory, &ldquo;Backlog of power plants seeking transmission grid connection eased somewhat in 2025 amidst high withdrawals&rdquo; and <i>Queued Up: 2026 Edition</i>, 2026. [Online]. Available: https://emp.lbl.gov/news/backlog-power-plants-seeking-transmission-grid-connection-eased-somewhat-2025-amidst',
 'pp_queue': 'American Public Power Association, &ldquo;Backlog of power plants seeking transmission grid connection eased somewhat in 2025: LBNL,&rdquo; 2026. [Online]. Available: https://www.publicpower.org/periodical/article/backlog-power-plants-seeking-transmission-grid-connection-eased-somewhat-2025-lbnl',
 'pp_queue_ai': 'American Public Power Association, report on LBNL <i>Queued Up 2026</i> (interconnection reforms and automation), 2026. [Online]. Available: https://www.publicpower.org/node/30574',
 'bnef_2026': 'BloombergNEF, &ldquo;Energy storage enters the 100-gigawatt era: three things to know,&rdquo; 2026. [Online]. Available: https://about.bnef.com/insights/clean-energy/energy-storage-enters-the-100-gigawatt-era-three-things-to-know/',
 'ess_bnef26': 'Energy-Storage.news, &ldquo;BloombergNEF forecasts 158GW of global energy storage deployments in 2026,&rdquo; 2026. [Online]. Available: https://www.energy-storage.news/bloombergnef-forecasts-158gw-of-global-energy-storage-deployments-in-2026/',
 'ess_bnef25': 'Energy-Storage.news, &ldquo;Global energy storage deployments on track for record year in 2025, BNEF says,&rdquo; Oct. 2025. [Online]. Available: https://www.energy-storage.news/global-energy-storage-deployments-on-track-for-record-year-in-2025-bnef-says/',
 'pvusa_iea': 'pv magazine USA, &ldquo;Global battery additions reached 108 GW in 2025, according to IEA,&rdquo; 3 Jun. 2026. [Online]. Available: https://pv-magazine-usa.com/2026/06/03/global-battery-additions-reached-108-gw-in-2025-according-to-iea/',
 'energetica_q1': 'Energetica India, &ldquo;India&rsquo;s peak power demand climbs 12 percent in April&ndash;June 2026,&rdquo; 24 Jul. 2026. [Online]. Available: https://www.energetica-india.net/news/indias-peak-power-demand-climbs-12-percent-in-april-june-2026',
 'sdac2025': 'European Commission, Directorate-General for Energy, &ldquo;EU electricity trading in the day-ahead markets becomes more dynamic,&rdquo; 1 Oct. 2025. [Online]. Available: https://energy.ec.europa.eu/news/eu-electricity-trading-day-ahead-markets-becomes-more-dynamic-2025-10-01_en',
 'entsoe_gfm': 'ESS News, &ldquo;Europe moves to mandate grid-forming capability for new storage over 1 MW,&rdquo; 12 Nov. 2025. [Online]. Available: https://www.ess-news.com/2025/11/12/europe-moves-to-mandate-grid-forming-capability-for-new-storage-over-1-mw/',
 'gmk_sg': 'GMK Center, &ldquo;China&rsquo;s state grid operator plans $89 billion in investments for 2025,&rdquo; Jan. 2025. [Online]. Available: https://gmk.center/en/news/chinas-state-grid-operator-plans-89-billion-in-investments-for-2025/',
 'gt_uhv': 'Global Transmission Report, &ldquo;China completes 46 UHV projects with 62,000-plus km lines by 2025, plans more in 2026&ndash;30,&rdquo; 2026. [Online]. Available: https://globaltransmission.info/china-completes-46-uhv-projects-with-62000-plus-km-lines-by-2025-plans-more-in-2026-30/',
 'cd_2026': 'China Daily, report on west-to-east transmission and State Grid investment in 2025, 7 Jan. 2026. [Online]. Available: https://www.chinadaily.com.cn/a/202601/07/WS695db8bfa310d6866eb3266d.html',
 'enerdata_uhv': 'Enerdata, &ldquo;China plans 15 new ultra-high voltage transmission lines by 2030,&rdquo; 2026. [Online]. Available: https://www.enerdata.net/publications/daily-energy-news/china-plans-15-new-ultra-high-voltage-transmission-lines-2030.html',
 'aemo_2025rec': 'Australian Energy Market Operator, &ldquo;Australia&rsquo;s east-coast break new records in 2025.&rdquo; [Online]. Available: https://www.aemo.com.au/Newsroom/Insight-Posts/Australia-east-coast-break-new-records-in-2025',
 'aemo_q4': 'Australian Energy Market Operator, &ldquo;Renewables supply more than half of quarterly energy supply,&rdquo; media release, Jan. 2026. [Online]. Available: https://www.aemo.com.au/Newsroom/Media-Release/Renewables-supply-more-than-half-of-quarterly-energy-supply',
 'pvtech_min': 'PV Tech, &ldquo;Australia&rsquo;s NEM sets minimum demand record as rooftop solar reaches 15GW,&rdquo; 8 Oct. 2025. [Online]. Available: https://www.pv-tech.org/australias-nem-sets-minimum-demand-record-as-rooftop-solar-reaches-15gw/',
 'ess_gfm': 'Energy-Storage.news, &ldquo;Australia&rsquo;s grid-forming battery storage pipeline extends to nearly a hundred projects, says AEMO,&rdquo; 5 Dec. 2025. [Online]. Available: https://www.energy-storage.news/australias-grid-forming-battery-storage-pipeline-extends-to-nearly-a-hundred-projects-says-aemo/',
 'pvtech_aemo42': 'PV Tech, &ldquo;AEMO charts Australia&rsquo;s rooftop solar boom to 42.5GW by 2036,&rdquo; 2 Dec. 2025. [Online]. Available: https://www.pv-tech.org/aemo-charts-australias-rooftop-solar-boom-to-42-5gw-by-2036/',
 'csiro_gfm': 'CSIRO, &ldquo;AR-PST Stage 5 Topic 1-2: Grid forming converter standard development,&rdquo; interim report, Dec. 2025. [Online]. Available: https://www.csiro.au/-/media/EF/Files/GPST-Roadmap/Stage-5-Interim/Stage-5-Interim-report---AR-PST-Topic-1-2.pdf',
 'ferc_2003': 'U.S.-Canada Power System Outage Task Force, &ldquo;Interim report: causes of the August 14th blackout in the United States and Canada,&rdquo; presentation, FERC. [Online]. Available: https://ferc.gov/sites/default/files/2020-08/blackout-presentation.pdf',
 'ntis_2003': 'U.S.-Canada Power System Outage Task Force, <i>Final Report on the August 14, 2003 Blackout in the United States and Canada: Causes and Recommendations</i>, Apr. 2004 (NTIS PB2004104472). [Online]. Available: https://ntrl.ntis.gov/NTRL/dashboard/searchResults/titleDetail/PB2004104472.xhtml',
 'wiki_2012': 'Wikipedia, &ldquo;2012 India blackouts.&rdquo; [Online]. Available: https://www.wikipedia.org/wiki/2012_India_blackouts',
 'powerline_2012': 'Power Line, &ldquo;Grid shock of 2012,&rdquo; Aug. 2012. [Online]. Available: https://powerline.net.in/2012/08/22/grid-shock-of-2012/',
 'sa_hansard': 'Parliament of South Australia, House of Assembly, ministerial statement on AEMO&rsquo;s final report into the black system event, 28 Mar. 2017. [Online]. Available: https://hansardsearch.parliament.sa.gov.au/daily/lh/2017-03-28/10',
 'sa_newdaily': 'The New Daily, &ldquo;AEMO blames wind farm settings for SA blackout: report,&rdquo; 28 Mar. 2017. [Online]. Available: https://www.thenewdaily.com.au/news/state/sa/2017/03/28/aemo-blames-wind-farm-settings-sa-blackout-report',
 'apo_sa': 'Australian Energy Market Operator, &ldquo;Update report &ndash; black system event in South Australia on 28 September 2016,&rdquo; Oct. 2016. [Online]. Available: https://apo.org.au/node/68445',
 'eso_2019': 'National Grid ESO, &ldquo;Technical report on the events of 9 August 2019,&rdquo; 6 Sep. 2019. [Online]. Available: https://www.ofgem.gov.uk/sites/default/files/docs/eso_technical_report_-_final.pdf',
 'ofgem_2019': 'Ofgem, &ldquo;Investigation into 9 August 2019 power outage.&rdquo; [Online]. Available: https://www.ofgem.gov.uk/publications/investigation-9-august-2019-power-outage',
 'e3c_2019': 'Energy Emergencies Executive Committee, &ldquo;GB power system disruption &ndash; 9 August 2019: interim report,&rdquo; Sep. 2019. [Online]. Available: https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/836626/20191003_E3C_Interim_Report_into_GB_Power_Disruption.pdf',
 'ercot_2021': 'ERCOT, &ldquo;Review of February 2021 extreme cold weather event,&rdquo; presentation, 24 Feb. 2021. [Online]. Available: https://www.ercot.com/files/docs/2021/02/24/2.2_REVISED_ERCOT_Presentation.pdf',
 'spg_uri': 'S&amp;P Global, &ldquo;ERCOT lost almost half of generation capacity in storm, causing 20-GW load shed,&rdquo; 24 Feb. 2021. [Online]. Available: https://www.spglobal.com/commodity-insights/en/news-research/latest-news/electric-power/022421-ercot-lost-almost-half-of-generation-capacity-in-storm-causing-20-gw-load-shed',
 'ferc_uri': 'FERC, &ldquo;Final report on February 2021 freeze underscores winterization recommendations,&rdquo; Nov. 2021. [Online]. Available: https://ferc.gov/news-events/news/final-report-february-2021-freeze-underscores-winterization-recommendations',
 'ferc_uri_p': 'FERC, NERC and Regional Entity Joint Staff Inquiry, &ldquo;February 2021 cold weather grid operations: preliminary findings and recommendations,&rdquo; Sep. 2021. [Online]. Available: https://www.ferc.gov/sites/default/files/2021-09/2021%20Cold%20Weather%20Inquiry%20Open%20Meeting%20Presentation%20_PPT%20Version.pdf',
 'ds_iberia': 'Digital Substation, &ldquo;How a 90-second cascade blacked out the Iberian Peninsula: lessons from the ENTSO-E final report,&rdquo; 2026. [Online]. Available: https://digitalsubstation.com/article/n25-iberian-blackout-entso-e',
 'heise_iberia': 'heise online, &ldquo;Blackout on the Iberian Peninsula: ENTSO-E presents final report,&rdquo; Mar. 2026. [Online]. Available: https://heise.de/-11224775',
 'pvmag_iberia': 'pv magazine, &ldquo;Entso-E report finds systemic failures behind 2025 Iberian blackout,&rdquo; 23 Mar. 2026. [Online]. Available: https://www.pv-magazine.com/2026/03/23/entso-e-report-finds-systemic-failures-behind-2025-iberian-blackout/',
 'euronews_iberia': 'Euronews, &ldquo;&lsquo;Perfect storm of multiple factors&rsquo; behind 2025 Iberia power blackout, experts say,&rdquo; 20 Mar. 2026. [Online]. Available: https://www.euronews.com/2026/03/20/perfect-storm-of-multiple-factors-behind-2025-iberia-power-blackout-experts-say',
 'cw_curtail': 'Construction World, &ldquo;Renewable curtailment reaches 23 GW amid coal flexibility limits,&rdquo; 2025. [Online]. Available: https://www.constructionworld.in/energy-infrastructure/power-and-renewable-energy/renewable-curtailment-reaches-23-gw-amid-coal-flexibility-limits/87201',
 'tribune_peak': 'The Tribune, &ldquo;India&rsquo;s power demand soars amid record heatwave, nears all-time high,&rdquo; 2026. [Online]. Available: https://www.tribuneindia.com/news/weather-report/indias-power-demand-soars-amid-record-heatwave-nears-all-time-high/',
 'rw_peak': 'Renewable Watch, &ldquo;India meets its all-time peak electricity demand of 256 GW: MoP,&rdquo; 29 Apr. 2026. [Online]. Available: https://renewablewatch.in/2026/04/29/india-meets-its-all-time-peak-electricity-demand-of-256-gw-mop/',
 'dte_256': 'Down To Earth, &ldquo;Decoding India&rsquo;s record 256 GW power peak: demand, dispatch and dilemmas,&rdquo; 2026. [Online]. Available: https://www.downtoearth.org.in/energy/decoding-indias-record-256-gw-power-peak-demand-dispatch-and-dilemmas',
 'mercom_300': 'Mercom India, &ldquo;India&rsquo;s non-fossil power capacity crosses 300 GW,&rdquo; Aug. 2026. [Online]. Available: https://mercomindia.com/indias-non-fossil-power-capacity-crosses-300-gw',
 'outlook_300': 'Outlook Business, &ldquo;India achieves 300 GW RE capacity, 60% of 500 GW target by 2030,&rdquo; Aug. 2026. [Online]. Available: https://www.outlookbusiness.com/news/india-achieves-300-gw-re-capacity-60-of-500-gw-target-by-2030',
 'posoco_mou': 'Grid Controller of India Ltd., &ldquo;MoU for FY 2024-25&rdquo; (target for frequency within the IEGC band). [Online]. Available: https://posoco.in/wp-content/uploads/2024/10/MoU-for-FY-2024-25.pdf',
 'ppd_jan': 'Power Peak Digest, &ldquo;India peak power demand reaches 245,416 MW in January 2026&rdquo; (Grid-India monthly operational report), 2026. [Online]. Available: https://powerpeakdigest.com/?p=51947',
 'mercom_freq': 'Mercom India, &ldquo;Operators struggle to balance solar with thermal power as grid woes rise,&rdquo; 2025. [Online]. Available: https://mercomindia.com/operators-struggle-to-balance-solar-with-thermal-power-as-grid-woes-rise',
 'dh_nep': 'Deccan Herald, &ldquo;Centre to unveil National Electricity Plan in next 15 days: Manohar Lal Khattar,&rdquo; Sep. 2024. [Online]. Available: https://www.deccanherald.com/india/centre-to-unveil-national-electricity-plan-in-next-15-days-manohar-lal-khattar-3203169',
 'bt_nep': 'Business Today, &ldquo;Centre targets Rs 9.15 lakh crore investment opportunity in transmission sector by 2032,&rdquo; 15 Oct. 2024. [Online]. Available: https://www.businesstoday.in/latest/economy/story/centre-targets-rs-915-lakh-crore-investment-opportunity-in-transmission-sector-by-2032-450046-2024-10-15',
 'sq_trans': 'SolarQuarter, &ldquo;India targets 6.48 lakh cKm transmission network by 2032 under national grid expansion plan,&rdquo; 30 Jul. 2026. [Online]. Available: https://solarquarter.com/2026/07/30/india-targets-6-48-lakh-ckm-transmission-network-by-2032-under-national-grid-expansion-plan/',
 'ieefa_jun': 'IEEFA and JMK Research, &ldquo;EnergyWatts: monthly update on India&rsquo;s energy storage market,&rdquo; Jul. 2026. [Online]. Available: https://ieefa.org/sites/default/files/2026-08/ESSjmk-0626.pdf',
 'pvmag_h1': 'pv magazine, &ldquo;India adds 8.2 GWh of new BESS capacity in H1,&rdquo; 14 Sep. 2026. [Online]. Available: https://www.pv-magazine.com/2026/09/14/india-adds-8-2-gwh-of-new-bess-capacity-in-h1/',
 'energiaest': 'Energ&iacute;a Estrat&eacute;gica, &ldquo;India tiene 103 GW de storage en carrera pero apenas operan 10,3 GW,&rdquo; 2026. [Online]. Available: https://energiaestrategica.com/energiaestrategica/en/notes/india-tiene-103-gw-de-storage-en-carrera-pero-apenas-operan-10-3-gw',
 'pvmag_sesi': 'pv magazine, report on BESS tenders in India from the SESI 2026 white paper, 2026. [Online]. Available: https://www.pv-magazine.com/?p=336624',
 'bs_atc': 'Business Standard, &ldquo;Rewiring power reforms: discom profitability is an encouraging start,&rdquo; editorial, 2026. [Online]. Available: https://www.business-standard.com/opinion/editorial/rewiring-power-reforms-discom-profitability-is-an-encouraging-start-126012701494_1.html',
 'saur_atc': 'Saur Energy, &ldquo;India reduces AT&amp;C losses to 16.16% in FY25: Power Ministry,&rdquo; 2025. [Online]. Available: https://www.saurenergy.com/solar-energy-news/india-reduces-atc-losses-to-1616-in-fy25-power-ministry-10894965',
 'fpj_discom': 'Free Press Journal, &ldquo;India&rsquo;s power discoms turn profitable, &#8377;2,701 crore profit in FY25 after years of losses,&rdquo; 2026. [Online]. Available: https://www.freepressjournal.in/amp/business/indias-power-discoms-turn-profitable-2701-crore-profit-in-fy25-after-years-of-losses',
 'sq_rdss': 'SolarQuarter, &ldquo;India&rsquo;s RDSS transforms power distribution landscape,&rdquo; 31 Mar. 2026. [Online]. Available: https://solarquarter.com/2026/03/31/indias-rdss-transforms-power-distribution-landscape-%e2%82%b92-83-lakh-crore-investments-drive-smart-meter-rollout-and-strengthen-discom-financial-viability-by-fy25/',
 'dtnext_peak': 'DT Next, &ldquo;Heat pushes power demand in Tamil Nadu to record July high,&rdquo; Jul. 2026. [Online]. Available: https://www.dtnext.in/news/tamilnadu/heat-pushes-power-demand-in-tamil-nadu-to-record-july-high',
 'dtnext_wind': 'DT Next, &ldquo;TN wind power hits record 6,578 MW, renewables meet over 42% of State&rsquo;s demand,&rdquo; Jul. 2026. [Online]. Available: https://www.dtnext.in/news/tamilnadu/tn-wind-power-hits-record-6578-mw-renewables-meet-over-42-of-states-demand',
}


def main():
    text = "".join((HERE / f"part{i}.md").read_text(encoding="utf-8") for i in (1, 2, 3, 4))
    # worked examples {#key} and tables {#t:key}: numbered by order of definition
    ex = re.findall(r"WORKED EXAMPLE \{#([a-z0-9]+)\}", text)
    tb = re.findall(r"<b>Table \{#t:([a-z0-9]+)\}\.</b>", text)
    assert len(ex) == len(set(ex)) and len(tb) == len(set(tb)), "duplicate example or table key"
    eq = re.findall(r"\(\{#e:([a-z0-9]+)\}\)</p>", text)
    assert len(eq) == len(set(eq)), "duplicate equation key"
    text = re.sub(r"\{#e:([a-z0-9]+)\}", lambda m: str(eq.index(m.group(1)) + 1), text)
    fg = re.findall(r"<b>Figure \{#f:([a-z0-9]+)\}\.</b>", text)
    assert len(fg) == len(set(fg)), "duplicate figure key"
    text = re.sub(r"\{#f:([a-z0-9]+)\}", lambda m: str(fg.index(m.group(1)) + 1), text)
    text = re.sub(r"\{#t:([a-z0-9]+)\}", lambda m: str(tb.index(m.group(1)) + 1), text)
    text = re.sub(r"\{#([a-z0-9]+)\}", lambda m: str(ex.index(m.group(1)) + 1), text)
    # summary table rows in numeric order
    def sort_rows(m):
        rows = m.group(0).strip("\n").split("\n")
        rows.sort(key=lambda r: int(r.split("|")[1]))  # rows of the worked-example summary only
        return "\n".join(rows) + "\n"
    text = re.sub(r"(?:^\| \d{1,2} \| [^\n]*\n)+", sort_rows, text, flags=re.M)
    print(f"{len(eq)} equations, ", end="")
    print(f"{len(ex)} worked examples, {len(tb)} tables, {len(fg)} figures")
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
