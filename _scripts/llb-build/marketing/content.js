/*
TOOL:    marketing/content.js — course data and unit pages, assembled by build.py
FAMILY:  law-explorers
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    Kaavya Study Materials – TNNLU B.Com. LL.B. Semester II explorers (claude.ai, 2026-11-22)
CHANGES: 1.0.0 - first version
*/
const UNITS = [
 {id:"u1", n:1, title:"Marketing and its Environment", short:"Needs, wants, exchange; marketing concepts; marketing mix; PESTEL and SWOT."},
 {id:"u2", n:2, title:"Consumers, Segmentation and Positioning", short:"Buying process and influences; segmentation, targeting and positioning (STP)."},
 {id:"u3", n:3, title:"Product and Branding", short:"Product levels and mix, product life cycle, BCG matrix, branding, packaging and labelling."},
 {id:"u4", n:4, title:"Pricing", short:"Pricing objectives, methods and strategies; markup and margin; pricing and the law."},
 {id:"u5", n:5, title:"Distribution and Retail", short:"Channels and intermediaries, retail formats, logistics, e-commerce rules."},
 {id:"u6", n:6, title:"Promotion, Digital Marketing and the Law", short:"Promotion mix, AIDA, digital and influencer marketing, misleading ads and the CCPA."}
];
const EXTRAS = [
 {id:"flash", ic:"🃏", title:"Flashcards"},
 {id:"cases", ic:"🏛️", title:"Cases and rulings"},
 {id:"quiz", ic:"✅", title:"Quiz"},
 {id:"refs", ic:"📚", title:"References"}
];
const MAXIMS = [];
const CASES = [
 {n:"Tata Press Ltd v Mahanagar Telephone Nigam Ltd", c:"(1995) 5 SCC 139", u:6, in:1, p:"Commercial speech – advertising – is part of freedom of speech under Article 19(1)(a), subject to reasonable restrictions."},
 {n:"Pepsi Co Inc v Hindustan Coca Cola Ltd", c:"2003 (27) PTC 305 (Del) (DB)", u:6, in:1, p:"Comparative advertising may puff one's own product, but must not disparage or denigrate the rival's product."},
 {n:"Reckitt & Colman of India v M.P. Ramachandran", c:"1999 (19) PTC 741 (Cal)", u:6, in:1, p:"Set out principles of comparative advertising: you may claim to be the best, but may not call a competitor's goods bad."},
 {n:"Indian Medical Association v Union of India (Patanjali ads)", c:"Supreme Court, 2024", u:6, in:1, p:"Misleading health advertisements; the Court required advertisers to file self-declarations and stressed that endorsers share responsibility."},
 {n:"Cadila Health Care Ltd v Cadila Pharmaceuticals Ltd", c:"(2001) 5 SCC 73", u:3, in:1, p:"Set out the test for deceptive similarity of trade marks, with stricter care for medicines."},
 {n:"Yahoo! Inc v Akash Arora", c:"1999 PTC (19) 201 (Del)", u:3, in:1, p:"Domain names are protected like trade marks; 'yahooindia.com' was restrained as passing off."},
 {n:"Competition Commission of India v Bharti Airtel", c:"(2019) 2 SCC 521", u:4, in:1, p:"Telecom pricing and interconnection disputes: the CCI's jurisdiction where a sector regulator (TRAI) exists."},
 {n:"Google LLC v Competition Commission of India (Android)", c:"NCLAT, 2023", u:5, in:1, p:"Upheld most findings that Google abused its dominant position through pre-installation conditions on Android phones."}
];

const FLASH = [
 ["Marketing (Kotler)","Satisfying needs and wants through exchange processes – creating, communicating and delivering value to customers."],
 ["Needs, wants, demand","Need: basic deprivation (hunger). Want: a need shaped by culture (biryani). Demand: a want backed by ability to pay."],
 ["Production concept","Customers want cheap, available products – focus on efficient production."],
 ["Product concept","Customers want the best quality and features – risk of 'marketing myopia'."],
 ["Selling concept","Customers will not buy enough unless pushed by aggressive selling."],
 ["Marketing concept","Find out what customers want and deliver it better than competitors."],
 ["Societal marketing concept","Satisfy customers while preserving society's and the environment's long-term well-being."],
 ["Marketing myopia","Defining a business by its product rather than by the customer need (Levitt, 1960)."],
 ["4 Ps","Product, Price, Place, Promotion. Services add People, Process, Physical evidence (7 Ps)."],
 ["PESTEL","Political, Economic, Social, Technological, Environmental, Legal – the macro-environment."],
 ["SWOT","Strengths and Weaknesses (internal); Opportunities and Threats (external)."],
 ["Buyer decision process","Need recognition → information search → evaluation of alternatives → purchase → post-purchase behaviour."],
 ["Cognitive dissonance","Post-purchase doubt – 'did I buy the right phone?' Reduced by reassurance and good service."],
 ["Segmentation bases","Geographic, demographic, psychographic (lifestyle, values), behavioural (usage, benefits, loyalty)."],
 ["Targeting strategies","Undifferentiated (mass), differentiated (several segments), concentrated (niche), micro (local or individual)."],
 ["Positioning","The place a brand occupies in customers' minds relative to competitors."],
 ["USP","Unique selling proposition – the one benefit that sets the brand apart."],
 ["Product levels","Core benefit, actual product (features, brand, design), augmented product (warranty, delivery, service)."],
 ["Product mix","Width (number of lines), length (total items), depth (variants per item)."],
 ["Product life cycle","Introduction, growth, maturity, decline – strategies change at each stage."],
 ["BCG matrix","Stars (high growth, high share), cash cows (low growth, high share), question marks, dogs."],
 ["Brand equity","The extra value a brand name adds – awareness, associations, perceived quality, loyalty."],
 ["Price skimming","High launch price for early adopters, lowered later – new smartphones."],
 ["Penetration pricing","Low launch price to win share fast – new telecom or food-delivery entrants."],
 ["Markup vs margin","Markup is profit ÷ cost; margin is profit ÷ selling price."],
 ["Psychological pricing","Rs 999 instead of Rs 1,000; prestige pricing for luxury."],
 ["Predatory pricing","Pricing below cost to drive out rivals – an abuse of dominance under s.4 of the Competition Act."],
 ["Channel levels","Zero level (direct), one level (retailer), two level (wholesaler + retailer), three level (agent + wholesaler + retailer)."],
 ["Marketplace model","An e-commerce platform connecting buyers and sellers – the only model open to foreign investment in India's e-commerce."],
 ["Promotion mix","Advertising, sales promotion, personal selling, public relations, direct and digital marketing."],
 ["AIDA","Attention, Interest, Desire, Action – how communication moves a buyer."],
 ["Misleading advertisement","Falsely describes a product, gives a false guarantee, or deliberately conceals important information (CPA 2019, s.2(28))."],
 ["CCPA","Central Consumer Protection Authority – can order withdrawal of misleading ads and impose penalties on makers and endorsers."],
 ["Dark patterns","Deceptive design tricks in apps and websites – false urgency, basket sneaking, drip pricing – banned by CCPA guidelines, 2023."]
];

const QUIZ = [
 [1,"'Find wants and fill them' is the essence of the…",["Production concept","Selling concept","Marketing concept","Product concept"],2,"Customer-first."],
 [1,"A railway company that thinks it is in the 'train business' rather than 'transport' suffers from…",["Marketing myopia","Cognitive dissonance","Brand equity","Price skimming"],0,"Levitt's classic example."],
 [1,"The 7 Ps add which three to the 4 Ps?",["People, Process, Physical evidence","Profit, Packaging, Positioning","Planning, People, Price","Place, Power, Promotion"],0,"For services."],
 [1,"A new law banning single-use plastic packaging is which PESTEL factor?",["Social","Technological","Legal / Environmental","Economic"],2,"Both legal and environmental."],
 [1,"Strengths and weaknesses in SWOT are…",["External","Internal","Both","Neither"],1,"Opportunities and threats are external."],
 [2,"The first stage of the buyer decision process is…",["Information search","Need recognition","Purchase","Evaluation"],1,"Something triggers a need."],
 [2,"Segmenting by lifestyle and values is…",["Geographic","Demographic","Psychographic","Behavioural"],2,"Psychographic."],
 [2,"A brand serving only premium vegan athletes uses…",["Undifferentiated marketing","Concentrated (niche) marketing","Mass marketing","Differentiated marketing"],1,"One small segment."],
 [2,"Post-purchase doubt is called…",["Cognitive dissonance","Brand loyalty","Impulse buying","Positioning"],0,"Reassurance reduces it."],
 [2,"A perceptual map is used for…",["Pricing","Positioning","Distribution","Recruitment"],1,"Shows how consumers see brands."],
 [3,"The warranty and free installation are part of the…",["Core product","Actual product","Augmented product","Product line"],2,"Extra services."],
 [3,"In the maturity stage of the PLC, sales are…",["Rising fast","Peaking and levelling","Zero","Falling fast"],1,"Competition is intense."],
 [3,"A high-share product in a slow-growing market is a…",["Star","Cash cow","Question mark","Dog"],1,"It generates cash."],
 [3,"Label declarations such as MRP and net quantity on packages are required by the…",["Trade Marks Act","Legal Metrology (Packaged Commodities) Rules, 2011","Companies Act","Contract Act"],1,"Legal Metrology."],
 [3,"The number of product lines a company has is its product mix…",["Depth","Length","Width","Consistency"],2,"Width."],
 [4,"A launch at a high price, lowered over time, is…",["Penetration","Skimming","Bundling","Going-rate"],1,"For early adopters."],
 [4,"Cost Rs 80, selling price Rs 100. The markup on cost is…",["20%","25%","80%","100%"],1,"20 ÷ 80."],
 [4,"In the same example, the margin on price is…",["20%","25%","80%","120%"],0,"20 ÷ 100."],
 [4,"Pricing below cost by a dominant firm to eliminate rivals is called…",["Penetration pricing","Predatory pricing","Psychological pricing","Dynamic pricing"],1,"Abuse of dominance."],
 [4,"Rs 499 instead of Rs 500 is an example of…",["Psychological pricing","Cost-plus pricing","Skimming","Bid pricing"],0,"Odd pricing."],
 [5,"Manufacturer → wholesaler → retailer → consumer is a…",["Zero-level channel","One-level channel","Two-level channel","Three-level channel"],2,"Two intermediaries."],
 [5,"A company selling only through its own website uses a…",["Zero-level (direct) channel","One-level channel","Two-level channel","Agent channel"],0,"Direct to consumer."],
 [5,"Under India's FDI policy, foreign-owned e-commerce firms may operate only the…",["Inventory model","Marketplace model","Franchise model","Wholesale model"],1,"Marketplace."],
 [5,"E-commerce entities must display the seller's name, address and grievance officer under the…",["Consumer Protection (E-Commerce) Rules, 2020","Sale of Goods Act","Companies Act","Contract Act"],0,"2020 Rules."],
 [5,"Holding stock in many warehouses near customers mainly improves…",["Price","Delivery speed","Brand image","Product quality"],1,"Logistics."],
 [6,"AIDA stands for…",["Attention, Interest, Desire, Action","Advertising, Interest, Demand, Action","Awareness, Inquiry, Decision, Approval","Attention, Information, Demand, Adoption"],0,"The classic model."],
 [6,"Commercial speech is protected under which Article (Tata Press)?",["14","19(1)(a)","21","32"],1,"Subject to reasonable restrictions."],
 [6,"Who can be penalised for a misleading advertisement under the CPA 2019?",["Only the manufacturer","Manufacturer and endorser","Only the TV channel","No one"],1,"Endorsers too (s.21)."],
 [6,"'Only 2 left – buy in the next 5 minutes!' when it is false is a…",["Dark pattern (false urgency)","Loyalty programme","Positioning","Cash cow"],0,"Banned by the 2023 guidelines."],
 [6,"Comparative advertising in India is…",["Banned","Allowed if it does not disparage the rival","Allowed only on TV","Allowed only for medicines"],1,"Pepsi v Coca-Cola."]
];

//@@VIEWS
VIEWS.home = { html(){
  const done=S.d.done;
  return `<div class="hero"><h2>Marketing Management</h2>
  <p>Marketing is how a business finds out what people need and delivers it profitably – from naming and pricing a product to getting it into shops and onto phone screens. For a lawyer it is also a field full of law: trade marks, advertising standards, consumer protection and competition.</p>
  <p>Work through the six units, try the PLC and BCG tools, the price build-up and the 'Is this ad legal?' labs, then revise with flashcards, cases and the quiz.</p></div>
  <div class="ucards">${UNITS.map(u=>`<a class="ucard" data-go="${u.id}"><span class="k">Unit ${u.n}</span><b>${u.title}</b><span>${u.short}</span>${done[u.id]?'<span class="st">✓ Done</span>':""}</a>`).join("")}
  ${EXTRAS.map(x=>`<a class="ucard" data-go="${x.id}" style="border-top-color:var(--gold)"><span class="k" style="color:var(--gold)">${x.ic} Revise</span><b>${x.title}</b></a>`).join("")}</div>
  <div class="two" style="margin-top:18px">
   <div class="card"><h3>Where marketing meets law</h3>
   <ol><li><b>Brands</b> – Trade Marks Act, 1999; passing off.</li><li><b>Packaging</b> – Legal Metrology (Packaged Commodities) Rules, 2011; FSSAI labelling.</li><li><b>Pricing</b> – Competition Act, 2002; drug price control; MRP rules.</li><li><b>Selling online</b> – Consumer Protection (E-Commerce) Rules, 2020; FDI policy.</li><li><b>Advertising</b> – Consumer Protection Act, 2019; CCPA guidelines; ASCI code; Article 19(1)(a).</li></ol></div>
   <div class="card"><h3>Keyboard</h3><table class="t">
   <tr><td><span class="kbd">M</span></td><td>Show or hide the unit list</td></tr>
   <tr><td><span class="kbd">P</span> / <span class="kbd">S</span> / <span class="kbd">X</span></td><td>Play, step, pause the animation on the page</td></tr>
   <tr><td><span class="kbd">F</span></td><td>Full screen</td></tr>
   <tr><td><span class="kbd">←</span> <span class="kbd">→</span> <span class="kbd">Space</span></td><td>Flashcards: previous, next, flip</td></tr>
   <tr><td><span class="kbd">[</span> <span class="kbd">]</span></td><td>Previous or next unit</td></tr></table>
   <p style="font-size:13.5px;color:var(--muted)">Works offline once opened. Sign in (top right) to keep progress and certificates on every device.</p></div></div>
  <div class="card"><h3>About this syllabus</h3><p>The units follow the standard Marketing Management course in B.Com. and BBA programmes, with the legal links a law student needs. Compare with TNNLU's own course outline when it is issued. See also the <a href="/business-admin/11-marketing.html">marketing chapter</a> of the Business Administration series on this site.</p></div>
  ${footer()}`;
}};

/* ---------------- UNIT 1 ---------------- */
VIEWS.u1 = { html(){ return unitHead(1)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key"><b>Marketing</b> is the process of creating, communicating and delivering <b>value</b> to customers, and managing customer relationships, in ways that benefit the organisation and society. It begins <b>before</b> production – by understanding needs – and continues after the sale.</div>
 <h4>Core concepts</h4><p>Needs → wants → demand; products and services; value and satisfaction; exchange and relationships; markets.</p>
 <h4>How marketing thinking evolved</h4><table class="t"><tr><th>Concept</th><th>Focus</th><th>Example</th></tr>
 <tr><td>Production</td><td>Make it cheap and widely available</td><td>Early mass-produced cars</td></tr>
 <tr><td>Product</td><td>Make the best product</td><td>Over-engineered gadgets nobody asked for</td></tr>
 <tr><td>Selling</td><td>Push hard to sell what we make</td><td>Insurance mis-selling, timeshares</td></tr>
 <tr><td>Marketing</td><td>Find needs, satisfy them better than rivals</td><td>Customer-led product design</td></tr>
 <tr><td>Societal / holistic</td><td>Customers + society + environment</td><td>Refill packs, fair-trade sourcing</td></tr></table>
 <h4>The marketing mix</h4><p><b>Product, Price, Place, Promotion</b> (McCarthy). For services add <b>People, Process, Physical evidence</b> (Booms and Bitner). From the customer's side: customer value, cost, convenience, communication (4 Cs).</p>
 <h4>The marketing environment</h4><p><b>Micro</b>: the company, suppliers, intermediaries, customers, competitors, publics. <b>Macro (PESTEL)</b>: political, economic, social, technological, environmental, legal. <b>SWOT</b> combines internal strengths and weaknesses with external opportunities and threats.</p>
 <h4>Marketing of services</h4><p>Services are intangible, inseparable from the provider, variable and perishable – which is why law firms market through reputation, publications and relationships (and why the Bar Council rules restrict lawyers' advertising).</p></div>
</div><div>
 <div class="card lab"><h3>Which marketing concept?</h3><div id="lab1"></div></div>
 <div class="card lab"><h3>Sort into PESTEL</h3><div id="lab1b"></div></div>
</div></div>`+unitFoot(1)+footer(); },
 init(){
  choiceLab("#lab1",[
   ["'Our factory can make 10,000 cycles a day – let's cut costs and price them low.'","PROD","Production concept."],
   ["'Our phone has 12 cameras; customers will surely want the most advanced model.'","PRDT","Product concept – may ignore what users need."],
   ["'Sales are down – hire more agents and offer bigger incentives to push stock.'","SELL","Selling concept."],
   ["'We surveyed students and designed a laptop bag around what they told us.'","MKT","Marketing concept."],
   ["'We will switch to refill pouches and take back old bottles, even though it costs more.'","SOC","Societal marketing concept."]
  ],{PROD:"Production",PRDT:"Product",SELL:"Selling",MKT:"Marketing",SOC:"Societal"});
  choiceLab("#lab1b",[
   ["GST rates on packaged food are revised.","P","Political / fiscal policy (also economic)."],
   ["Rising incomes in tier-2 cities.","E","Economic."],
   ["More young people choosing plant-based diets.","S","Social – lifestyle change."],
   ["UPI makes small online payments easy.","T","Technological."],
   ["Extended producer responsibility for plastic packaging.","EN","Environmental."],
   ["The Consumer Protection (E-Commerce) Rules, 2020.","L","Legal."]
  ],{P:"Political",E:"Economic",S:"Social",T:"Technological",EN:"Environmental",L:"Legal"});
  miniQuiz(1);
 }};

/* ---------------- UNIT 2 ---------------- */
const BDP_SVG=`<svg viewBox="0 0 640 400" class="lg" role="img" aria-label="Buyer decision process">
<defs><marker id="bd" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
${[["Need recognition","old phone keeps hanging"],["Information search","reviews, friends, YouTube"],["Evaluation of alternatives","camera, battery, price"],["Purchase decision","brand, seller, EMI"],["Post-purchase behaviour","satisfied? reviews, returns"]].map((t,i)=>`<g id="b${i}" class="node fade"><rect x="110" y="${8+i*76}" width="420" height="58" rx="12"/><text x="320" y="${34+i*76}" text-anchor="middle">${t[0]}</text><text x="320" y="${56+i*76}" text-anchor="middle" class="sub">${t[1]}</text></g>`).join("")}
${[0,1,2,3].map(i=>`<path id="ba${i}" class="edge fade" d="M320 ${67+i*76} V${82+i*76}" marker-end="url(#bd)" style="color:var(--muted)"/>`).join("")}
</svg>`;
const BDP_STEPS=[
 "<b>Need recognition.</b> Kaavya's old phone keeps hanging during online classes – an internal stimulus. Ads and friends' new phones are external stimuli.",
 "<b>Information search.</b> Personal sources (friends), commercial (ads, store staff), public (reviews, comparison sites) and experience. Marketers want to be in the 'consideration set'.",
 "<b>Evaluation of alternatives.</b> She weighs attributes – camera, battery, storage, price, after-sales service – and her beliefs about each brand.",
 "<b>Purchase decision.</b> Intention can be changed by others' opinions or surprises – a sudden price rise, a no-cost EMI offer, delivery time.",
 "<b>Post-purchase behaviour.</b> Satisfaction depends on expectations vs performance. Unhappy buyers return goods, complain or post reviews; consumer law gives remedies for defects and deficient service."
];
VIEWS.u2 = { html(){ return unitHead(2)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">To serve customers well, a firm must understand <b>how they decide</b>, then divide the market into groups (<b>segmentation</b>), choose whom to serve (<b>targeting</b>) and decide how it wants to be seen (<b>positioning</b>).</div>
 <h4>Factors influencing buyers</h4><table class="t"><tr><th>Factor</th><th>Examples</th></tr>
 <tr><td>Cultural</td><td>Culture, subculture (region, religion), social class</td></tr>
 <tr><td>Social</td><td>Family, reference groups, influencers, roles and status</td></tr>
 <tr><td>Personal</td><td>Age, life stage, occupation, income, lifestyle, personality</td></tr>
 <tr><td>Psychological</td><td>Motivation (Maslow), perception, learning, beliefs and attitudes</td></tr></table>
 <h4>Types of buying behaviour</h4><p>Complex (high involvement, big differences – a car), dissonance-reducing (high involvement, few differences – a refrigerator), habitual (low involvement – salt), variety-seeking (biscuits).</p>
 <h4>Segmentation bases</h4><table class="t"><tr><th>Base</th><th>Variables</th></tr><tr><td>Geographic</td><td>Region, city size, urban/rural, climate</td></tr><tr><td>Demographic</td><td>Age, gender, income, education, occupation, family size</td></tr><tr><td>Psychographic</td><td>Lifestyle, values, personality</td></tr><tr><td>Behavioural</td><td>Occasion, benefits sought, usage rate, loyalty</td></tr></table>
 <p>Good segments are measurable, substantial, accessible, differentiable and actionable.</p>
 <h4>Targeting</h4><p>Undifferentiated (one offer for all), differentiated (different offers for several segments), concentrated (one niche), micro-marketing (local or one-to-one).</p>
 <h4>Positioning</h4><p>Choose a clear, distinctive, credible place in customers' minds: by attribute, benefit, use, user, price–quality, or against a competitor. A <b>perceptual map</b> plots brands on two dimensions customers care about.</p></div>
</div><div>
 ${animBox("bdAnim","The buyer decision process",BDP_SVG)}
 <div class="card lab"><h3>Write a positioning statement</h3>
  <div class="row"><label>For (target) <input type="text" id="psT" value="first-year law students" style="width:220px"></label></div>
  <div class="row" style="margin-top:6px"><label>who need <input type="text" id="psN" value="quick revision before exams" style="width:240px"></label></div>
  <div class="row" style="margin-top:6px"><label>Brand <input type="text" id="psB" value="CaseCards" style="width:140px"></label><label>is the <input type="text" id="psC" value="flashcard app" style="width:150px"></label></div>
  <div class="row" style="margin-top:6px"><label>that <input type="text" id="psX" value="explains every leading case in two lines" style="width:300px"></label></div>
  <div class="row" style="margin-top:6px"><label>because <input type="text" id="psR" value="it is written by law teachers and works offline" style="width:300px"></label><button class="btn" id="psGo">Build</button></div><div id="psOut"></div></div>
 <div class="card lab"><h3>Which segmentation base?</h3><div id="lab2"></div></div>
</div></div>`+unitFoot(2)+footer(); },
 init(){
  anim = makeAnim("#bdAnim", BDP_STEPS, i=>{
    for(let k=0;k<5;k++){ const g=document.getElementById("b"+k); g.classList.toggle("show",k<=i); g.classList.toggle("hi",k===i); }
    for(let k=0;k<4;k++) document.getElementById("ba"+k).classList.toggle("show",k<i);
  });
  $("#psGo").onclick=()=>{ const v=id=>esc($("#"+id).value.trim()||"…");
    $("#psOut").innerHTML=`<div class="fb info" style="font-size:16px">For <b>${v("psT")}</b> who need <b>${v("psN")}</b>, <b>${v("psB")}</b> is the <b>${v("psC")}</b> that <b>${v("psX")}</b>, because <b>${v("psR")}</b>.</div><p style="font-size:13.5px;color:var(--muted)">Check it: is the target specific? Is the benefit something rivals do not offer? Is the reason believable – and can you prove it if challenged as a misleading claim?</p>`; };
  $("#psGo").click();
  choiceLab("#lab2",[
   ["A two-wheeler maker sells different models in hilly and coastal regions.","GEO","Geographic."],
   ["A bank offers a special account for senior citizens.","DEM","Demographic – age."],
   ["A clothing brand targets 'eco-conscious, adventurous' young professionals.","PSY","Psychographic – lifestyle and values."],
   ["An airline rewards frequent flyers with lounge access.","BEH","Behavioural – usage rate and loyalty."],
   ["A toothpaste is sold separately for sensitivity, whitening and cavity protection.","BEH","Behavioural – benefits sought."]
  ],{GEO:"Geographic",DEM:"Demographic",PSY:"Psychographic",BEH:"Behavioural"});
  miniQuiz(2);
 }};

/* ---------------- UNIT 3 ---------------- */
const PLC_SVG=`<svg viewBox="0 0 640 340" class="lg" role="img" aria-label="Product life cycle">
<line x1="50" y1="290" x2="610" y2="290" class="axis"/><line x1="50" y1="20" x2="50" y2="290" class="axis"/>
<text x="330" y="325" text-anchor="middle" class="tick">time</text><text x="22" y="155" text-anchor="middle" class="tick" transform="rotate(-90 22 155)">sales / profit</text>
${[["Introduction",50,160],["Growth",160,290],["Maturity",290,470],["Decline",470,610]].map((s,i)=>`<g id="p${i}" class="fade"><rect x="${s[1]}" y="20" width="${s[2]-s[1]}" height="270" class="${["stg1","stg2","stg1","stg3"][i]}"/><text x="${(s[1]+s[2])/2}" y="42" text-anchor="middle" class="wl">${s[0]}</text></g>`).join("")}
<path id="pS" class="cD fade" d="M50 285 C 110 282, 140 260, 180 220 S 260 90, 320 75 S 440 70, 480 95 S 560 200, 610 240"/>
<path id="pP" class="cS fade" d="M50 300 C 100 320, 140 300, 180 260 S 260 150, 330 140 S 430 160, 480 190 S 560 260, 610 290"/>
<text id="pSl" x="330" y="66" class="cDl fade">sales</text><text id="pPl" x="335" y="132" class="cSl fade">profit</text>
</svg>`;
const PLC_STEPS=[
 "<b>Introduction.</b> Sales grow slowly; heavy spending on awareness and distribution; profits negative. Strategy: build trial – skimming or penetration pricing, selective distribution.",
 "<b>Growth.</b> Sales rise fast, competitors enter, profits appear. Strategy: improve features, add variants, widen distribution, build brand preference.",
 "<b>Maturity.</b> Sales peak and level off; competition is fiercest; prices fall. Strategy: modify the market (new users, new uses), the product, or the mix – the longest stage for most products.",
 "<b>Decline.</b> Sales and profits fall as tastes and technology change. Strategy: harvest, reposition, or withdraw – think landline phones and DVD players.",
 "The <b>sales</b> curve (solid) and the <b>profit</b> curve (dashed) – profit peaks before sales do, because price competition squeezes margins in maturity."
];
VIEWS.u3 = { html(){ return unitHead(3)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">A <b>product</b> is anything offered to satisfy a need – goods, services, experiences, ideas. Customers buy the <b>benefit</b>, not the object: people do not want a drill, they want a hole.</div>
 <h4>Levels of a product</h4><p><b>Core</b> (the benefit – connectivity), <b>actual</b> (features, design, quality, brand, packaging – the phone), <b>augmented</b> (warranty, delivery, installation, service, credit).</p>
 <h4>Classification</h4><p>Consumer products: convenience, shopping, speciality, unsought. Industrial products: materials and parts, capital items, supplies and services.</p>
 <h4>Product mix</h4><p><b>Width</b> – number of product lines; <b>length</b> – total items; <b>depth</b> – variants of each item; <b>consistency</b> – how closely lines are related.</p>
 <h4>New product development</h4><p>Idea generation → screening → concept testing → business analysis → product development → test marketing → commercialisation.</p>
 <h4>Branding</h4><ul><li><b>Brand equity</b>: awareness, associations, perceived quality, loyalty.</li><li>Strategies: individual brands, family brand, co-branding, private labels, brand extension.</li><li>Protect it: register the trade mark under the <b>Trade Marks Act, 1999</b>; act against infringement and passing off (<i>Cadila</i>; <i>Yahoo v Akash Arora</i>).</li></ul>
 <h4>Packaging and labelling</h4><p>Packaging protects, promotes and informs. The <b>Legal Metrology (Packaged Commodities) Rules, 2011</b> require the maker's name and address, country of origin, common name, net quantity, MRP (inclusive of all taxes), date of manufacture and consumer-care details. Food labels must also follow FSSAI regulations.</p></div>
</div><div>
 ${animBox("plcAnim","The product life cycle",PLC_SVG)}
 <div class="card lab"><h3>BCG matrix</h3><p>Place a business unit using its market growth rate and relative market share (its share ÷ the largest rival's share).</p>
  <div class="row"><label>Market growth (% a year) <input type="range" id="bcgG" min="0" max="30" value="18"><span id="bcgGv"></span></label></div>
  <div class="row"><label>Relative market share <input type="range" id="bcgS" min="1" max="40" value="15"><span id="bcgSv"></span></label></div>
  <svg viewBox="0 0 640 340" class="lg" id="bcgSvg"></svg><div id="bcgOut"></div></div>
 <div class="card lab"><h3>Which stage of the PLC?</h3><div id="lab3"></div></div>
</div></div>`+unitFoot(3)+footer(); },
 init(){
  anim = makeAnim("#plcAnim", PLC_STEPS, i=>{
    for(let k=0;k<4;k++) document.getElementById("p"+k).classList.toggle("show",k<=i||i===4);
    ["pS","pSl","pP","pPl"].forEach(id=>document.getElementById(id).classList.toggle("show",i>=0));
  });
  const Q={star:["Star","High growth, high share. Invest to keep leading; it may still need cash."],cow:["Cash cow","Low growth, high share. Milk it – its cash funds stars and question marks."],qm:["Question mark","High growth, low share. Invest heavily to build share, or drop it."],dog:["Dog","Low growth, low share. Harvest or divest unless it serves a strategic purpose."]};
  const draw=()=>{
    const g=+$("#bcgG").value, s=+$("#bcgS").value/10;
    $("#bcgGv").textContent=` ${g}%`; $("#bcgSv").textContent=` ${s.toFixed(1)}×`;
    const hi=g>=10, big=s>=1, k=hi?(big?"star":"qm"):(big?"cow":"dog");
    const X=v=>{ const l=Math.log10(Math.max(0.1,Math.min(4,v))); return 330-l/Math.log10(40)*560+0; }; // high share on the left
    const xs=Math.max(70,Math.min(600,330 - Math.log10(s)/Math.log10(4)*260)), ys=300-g/30*270;
    const cell=(x,y,id,t)=>`<rect x="${x}" y="${y}" width="270" height="135" class="${k===id?"stg2":"stg1"}" stroke="var(--rule)"/><text x="${x+135}" y="${y+28}" text-anchor="middle" class="wl" style="font-size:18px">${t}</text>`;
    $("#bcgSvg").innerHTML=cell(60,30,"star","⭐ Star")+cell(330,30,"qm","❓ Question mark")+cell(60,165,"cow","🐄 Cash cow")+cell(330,165,"dog","🐕 Dog")
      +`<text x="330" y="325" text-anchor="middle" class="tick">relative market share (high ← → low)</text><text x="30" y="165" text-anchor="middle" class="tick" transform="rotate(-90 30 165)">market growth</text>
      <circle cx="${xs}" cy="${ys}" r="13" class="eq"/>`;
    $("#bcgOut").innerHTML=`<div class="fb info"><b>${Q[k][0]}.</b> ${Q[k][1]}</div>`;
  };
  ["bcgG","bcgS"].forEach(id=>$("#"+id).addEventListener("input",draw)); draw();
  choiceLab("#lab3",[
   ["Electric scooters: sales rising fast, many new brands entering.","GR","Growth."],
   ["Toothpaste: nearly every household buys it; brands fight on price and offers.","MA","Maturity."],
   ["DVD players: sales falling every year.","DE","Decline."],
   ["A brand-new kind of smart ring: few buyers, heavy ad spending, losses.","IN","Introduction."],
   ["Instant noodles adding new flavours and 'healthy' variants to keep sales up.","MA","Maturity – modifying the product."]
  ],{IN:"Introduction",GR:"Growth",MA:"Maturity",DE:"Decline"});
  miniQuiz(3);
 }};

/* ---------------- UNIT 4 ---------------- */
VIEWS.u4 = { html(){ return unitHead(4)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key"><b>Price</b> is the only element of the mix that brings in revenue; the others cost money. A price must cover <b>costs</b> (the floor), fit what customers think the product is <b>worth</b> (the ceiling), and take <b>competitors</b> and the <b>law</b> into account.</div>
 <h4>Pricing objectives</h4><p>Survival, maximum current profit, maximum market share, market skimming, product-quality leadership, social objectives (essential medicines).</p>
 <h4>Methods</h4><table class="t"><tr><th>Method</th><th>How</th></tr>
 <tr><td>Cost-plus / markup</td><td>Unit cost + a percentage</td></tr><tr><td>Target return</td><td>Price giving a target return on investment</td></tr>
 <tr><td>Perceived value</td><td>What buyers think it is worth</td></tr><tr><td>Going-rate</td><td>Follow the market leader</td></tr><tr><td>Sealed bid / tender</td><td>Expected rival bids – public procurement</td></tr></table>
 <h4>Strategies</h4><ul><li><b>New products</b>: skimming or penetration.</li><li><b>Product mix</b>: product-line, optional-product, captive-product (printer and ink), by-product, bundle pricing.</li><li><b>Adjustments</b>: discounts and allowances, segmented (student fares), psychological (Rs 999), promotional, geographical, dynamic (ride-hailing surge, airline fares).</li></ul>
 <h4>Pricing and the law</h4><ul><li><b>Competition Act, 2002</b>: price-fixing cartels (s.3) and predatory or unfair pricing by a dominant firm (s.4) are prohibited.</li><li><b>MRP</b> must be printed and is the maximum, inclusive of all taxes (Legal Metrology Rules); charging more is an offence and an unfair trade practice.</li><li><b>Drugs (Prices Control) Order, 2013</b>: ceiling prices for essential medicines, fixed by the NPPA.</li><li><b>Drip pricing</b> – hidden charges revealed at checkout – is a dark pattern under the 2023 CCPA guidelines.</li></ul></div>
</div><div>
 <div class="card lab"><h3>Markup, margin and break-even</h3>
  <div class="row"><label>Unit cost (Rs) <input type="text" id="prC" value="80" style="width:80px"></label><label>Markup on cost (%) <input type="text" id="prM" value="25" style="width:60px"></label></div>
  <div class="row" style="margin-top:6px"><label>Fixed costs per month (Rs) <input type="text" id="prF" value="60000" style="width:100px"></label><button class="btn" id="prGo">Calculate</button></div><div id="prOut"></div></div>
 <div class="card lab"><h3>Which pricing strategy?</h3><div id="lab4"></div></div>
</div></div>`+unitFoot(4)+footer(); },
 init(){
  const n=id=>Math.max(0,+$("#"+id).value||0);
  $("#prGo").onclick=()=>{
    const c=n("prC"), m=n("prM"), F=n("prF"), p=c*(1+m/100), unit=p-c, margin=p?unit/p*100:0, be=unit>0?Math.ceil(F/unit):Infinity;
    $("#prOut").innerHTML=`<div class="fb info">Selling price = ${c} × (1 + ${m}%) = <b>Rs ${p.toFixed(2)}</b><br>Profit per unit Rs ${unit.toFixed(2)} · markup on cost <b>${m}%</b> · margin on price <b>${margin.toFixed(1)}%</b> (always lower than the markup)<br>Break-even: Rs ${F.toLocaleString("en-IN")} ÷ Rs ${unit.toFixed(2)} = <b>${isFinite(be)?be.toLocaleString("en-IN"):"never"} units a month</b>.</div>`;
  };
  $("#prGo").click();
  choiceLab("#lab4",[
   ["A new phone launches at Rs 1,20,000 and drops to Rs 85,000 a year later.","SK","Skimming."],
   ["A new telecom operator offers free calls and data for six months.","PE","Penetration."],
   ["A shoe priced at Rs 1,999 rather than Rs 2,000.","PS","Psychological pricing."],
   ["A printer sold cheaply, with expensive branded cartridges.","CA","Captive-product pricing."],
   ["A ride fare doubles during heavy rain at peak hour.","DY","Dynamic (surge) pricing."],
   ["A burger, fries and drink sold together for less than separately.","BU","Bundle pricing."]
  ],{SK:"Skimming",PE:"Penetration",PS:"Psychological",CA:"Captive product",DY:"Dynamic",BU:"Bundle"});
  miniQuiz(4);
 }};

/* ---------------- UNIT 5 ---------------- */
VIEWS.u5 = { html(){ return unitHead(5)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key"><b>Place</b> is about getting the product to the customer at the right time, place and cost. A <b>marketing channel</b> is the set of intermediaries – agents, wholesalers, retailers, platforms – through which goods flow.</div>
 <h4>Why intermediaries?</h4><p>They cut the number of transactions, break bulk, hold stock, provide credit, carry risk, promote, and give market information. They cost money (margins), but usually less than doing it all yourself.</p>
 <h4>Channel levels</h4><table class="t"><tr><th>Level</th><th>Flow</th><th>Example</th></tr>
 <tr><td>Zero</td><td>Maker → consumer</td><td>D2C websites, Amul parlours, direct selling</td></tr>
 <tr><td>One</td><td>Maker → retailer → consumer</td><td>Cars through dealers</td></tr>
 <tr><td>Two</td><td>Maker → wholesaler → retailer → consumer</td><td>FMCG through kirana shops</td></tr>
 <tr><td>Three</td><td>Maker → agent → wholesaler → retailer → consumer</td><td>Imported goods, agricultural produce</td></tr></table>
 <p>Distribution intensity: <b>intensive</b> (soap, biscuits – everywhere), <b>selective</b> (appliances), <b>exclusive</b> (luxury cars, franchised outlets).</p>
 <h4>Retail formats in India</h4><p>Kirana stores, supermarkets and hypermarkets, speciality stores, malls, franchise outlets, quick-commerce dark stores, and e-commerce. FDI policy allows foreign investment in e-commerce only in the <b>marketplace model</b>; marketplaces may not own the inventory they sell.</p>
 <h4>Logistics and supply chain</h4><p>Order processing, warehousing, inventory, transportation; GST (2017) and the e-way bill reshaped warehousing into fewer, larger hubs.</p>
 <h4>Law for online selling</h4><p>The <b>Consumer Protection (E-Commerce) Rules, 2020</b> require platforms to show seller details, country of origin, return and refund policies and a grievance officer; to acknowledge complaints within 48 hours and resolve them within a month; and to avoid manipulating prices. Direct selling has its own rules (Consumer Protection (Direct Selling) Rules, 2021) that ban pyramid schemes.</p></div>
</div><div>
 <div class="card lab"><h3>Price build-up along the channel</h3><p>See how the consumer price is built from the factory price through the channel.</p>
  <div class="row"><label>Factory price (Rs) <input type="text" id="cbF" value="100" style="width:70px"></label><label>Distributor margin % <input type="text" id="cbD" value="8" style="width:50px"></label><label>Retailer margin % <input type="text" id="cbR" value="15" style="width:50px"></label><label>GST % <select id="cbG"><option>5</option><option selected>12</option><option>18</option></select></label><button class="btn" id="cbGo">Build</button></div>
  <svg viewBox="0 0 640 220" class="lg" id="cbSvg"></svg><div id="cbOut"></div>
  <p style="font-size:13px;color:var(--muted)">Margins are taken on the selling price of each level (simplified; GST is charged at each stage but credited, so only the final GST reaches the consumer).</p></div>
 <div class="card lab"><h3>How many levels?</h3><div id="lab5"></div></div>
</div></div>`+unitFoot(5)+footer(); },
 init(){
  const n=id=>Math.max(0,+$("#"+id).value||0);
  $("#cbGo").onclick=()=>{
    const f=n("cbF"), d=Math.min(90,n("cbD")), r=Math.min(90,n("cbR")), g=+$("#cbG").value;
    const dp=f/(1-d/100), rp=dp/(1-r/100), mrp=rp*(1+g/100);
    const parts=[["Factory",f],["Distributor margin",dp-f],["Retailer margin",rp-dp],["GST",mrp-rp]], W=560/mrp, cls=["stg1","stg2","boxp","stg3"];
    let x=40, h="";
    parts.forEach((p,i)=>{ const w=p[1]*W; h+=`<rect x="${x}" y="60" width="${w}" height="70" class="${cls[i]}" stroke="var(--rule)"/>${w>60?`<text x="${x+w/2}" y="92" text-anchor="middle" class="wl">${p[0]}</text><text x="${x+w/2}" y="114" text-anchor="middle" class="tick">Rs ${p[1].toFixed(1)}</text>`:""}`; x+=w; });
    h+=`<text x="600" y="40" text-anchor="end" class="big">MRP ≈ Rs ${Math.ceil(mrp)}</text><text x="40" y="170" class="tick">The maker gets ${(f/mrp*100).toFixed(0)}% of what the consumer pays.</text>`;
    $("#cbSvg").innerHTML=h;
    $("#cbOut").innerHTML=`<div class="fb info">Distributor sells at Rs ${dp.toFixed(2)} → retailer sells at Rs ${rp.toFixed(2)} before tax → with ${g}% GST, <b>MRP about Rs ${Math.ceil(mrp)}</b>. Cutting out the distributor (a one-level channel) would let the maker charge more or the consumer pay less – if the maker can do the distributor's work more cheaply.</div>`;
  };
  $("#cbGo").click();
  choiceLab("#lab5",[
   ["A farmer sells vegetables at the weekly uzhavar sandhai (farmers' market) directly to buyers.","Z","Zero level – direct."],
   ["A car maker sells through its authorised dealers.","O","One level."],
   ["A biscuit company sells to stockists, who supply neighbourhood shops.","T","Two levels."],
   ["A foreign wine reaches Indian shops via an importer-agent, a wholesaler and a retailer.","TH","Three levels."],
   ["A D2C skincare brand sells only through its own app.","Z","Zero level."]
  ],{Z:"Zero",O:"One",T:"Two",TH:"Three"});
  miniQuiz(5);
 }};

/* ---------------- UNIT 6 ---------------- */
VIEWS.u6 = { html(){ return unitHead(6)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key"><b>Promotion</b> communicates value and persuades. Firms combine tools into <b>integrated marketing communication</b> so every message says the same thing. Advertising is protected speech, but it must be <b>truthful</b> – and Indian law now holds makers, platforms and celebrity endorsers responsible.</div>
 <h4>The promotion mix</h4><table class="t"><tr><th>Tool</th><th>Strength</th></tr>
 <tr><td>Advertising</td><td>Reaches many people at low cost per contact; builds image</td></tr>
 <tr><td>Sales promotion</td><td>Short-term boost – coupons, contests, buy-one-get-one</td></tr>
 <tr><td>Personal selling</td><td>Two-way, persuasive – insurance, B2B</td></tr>
 <tr><td>Public relations</td><td>Credibility – news coverage, sponsorships, CSR</td></tr>
 <tr><td>Direct and digital</td><td>Targeted and measurable – email, search, social, apps</td></tr></table>
 <h4>Digital marketing</h4><p>SEO and search ads, social media, content marketing, influencer marketing, email, affiliate marketing, marketplace ads. Metrics: reach, click-through rate, conversion rate, cost per acquisition, customer lifetime value.</p>
 <h4>Advertising and the law</h4><ul><li><b>Article 19(1)(a)</b> protects commercial speech (<i>Tata Press</i>, 1995).</li><li><b>Consumer Protection Act, 2019</b>: 'misleading advertisement' (s.2(28)); the <b>CCPA</b> may order discontinuance or correction and impose penalties up to Rs 10 lakh (Rs 50 lakh for repeat offences) on makers <b>and endorsers</b>; endorsers can be barred for up to one year (s.21). Endorsers must exercise due diligence.</li><li><b>CCPA Guidelines for Prevention of Misleading Advertisements, 2022</b>: rules on bait ads, free claims, surrogate ads and children's ads.</li><li><b>Endorsement guidelines for influencers, 2023</b>: disclose paid partnerships clearly ('#ad', 'sponsored').</li><li><b>Dark patterns guidelines, 2023</b>: ban false urgency, basket sneaking, confirm-shaming, forced action, subscription traps, drip pricing and others.</li><li><b>ASCI Code</b> – industry self-regulation; comparative ads must not denigrate (<i>Pepsi v Coca-Cola</i>).</li><li>Sector laws: Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954; COTPA, 2003 (tobacco); Cable TV Rules.</li></ul></div>
</div><div>
 <div class="card lab"><h3>Is this ad legal?</h3><div id="lab6"></div></div>
 <div class="card lab"><h3>Which promotion tool?</h3><div id="lab6b"></div></div>
</div></div>`+unitFoot(6)+footer(); },
 init(){
  choiceLab("#lab6",[
   ["A cola ad says 'the most refreshing taste' – an obvious puff.","OK","Puffery that no one takes literally is generally allowed."],
   ["A hair oil claims it 'cures baldness in 7 days', with no evidence.","MIS","A misleading claim; also covered by the Drugs and Magic Remedies Act."],
   ["An influencer praises a skincare product without saying she was paid.","MIS","Undisclosed paid endorsement – breaks the 2023 influencer guidelines."],
   ["A soap ad shows a rival's bar, clearly identifiable, as useless and dirty.","DIS","Disparagement of a competitor (Pepsi v Coca-Cola; Reckitt & Colman v Ramachandran)."],
   ["A shopping app shows '3 people are viewing this – only 1 left!' when false.","DP","Dark pattern – false urgency."],
   ["An airline adds a 'convenience fee' only on the final payment page.","DP","Drip pricing – a dark pattern."],
   ["A toothpaste ad claims 'recommended by dentists' based on a genuine survey, with the source shown.","OK","A substantiated claim with disclosure is acceptable."]
  ],{OK:"Acceptable",MIS:"Misleading",DIS:"Disparaging",DP:"Dark pattern"});
  choiceLab("#lab6b",[
   ["'Buy 2 get 1 free' on shampoo this week.","SP","Sales promotion."],
   ["A TV commercial during the IPL.","AD","Advertising."],
   ["An insurance agent visits a family to explain a policy.","PS","Personal selling."],
   ["A company sponsors a moot-court competition and gets news coverage.","PR","Public relations and sponsorship."],
   ["A personalised email with a discount code for your birthday.","DD","Direct and digital marketing."]
  ],{AD:"Advertising",SP:"Sales promotion",PS:"Personal selling",PR:"Public relations",DD:"Direct / digital"});
  miniQuiz(6);
 }};

/* ---------------- REFERENCES ---------------- */
VIEWS.refs = { html(){ return `<div class="unitban"><div class="k">Read further</div><h2>References</h2><p>Books are in the TNNLU library; online sources need internet.</p></div>
 <div class="two"><div class="card"><h3>Books</h3><table class="t"><tr><th>Book</th><th>Use it for</th></tr>
 <tr><td>Philip Kotler, Kevin Lane Keller et al., <i>Marketing Management</i> (Indian edition), Pearson</td><td>The standard text, with Indian cases</td></tr>
 <tr><td>Philip Kotler and Gary Armstrong, <i>Principles of Marketing</i>, Pearson</td><td>Simpler first reading</td></tr>
 <tr><td>Rajan Saxena, <i>Marketing Management</i>, McGraw-Hill</td><td>Indian examples and markets</td></tr>
 <tr><td>V.S. Ramaswamy and S. Namakumari, <i>Marketing Management: Indian Context</i>, SAGE</td><td>Indian context throughout</td></tr>
 <tr><td>Theodore Levitt, 'Marketing Myopia', <i>Harvard Business Review</i> (1960)</td><td>Classic article</td></tr>
 <tr><td>Avtar Singh, <i>Law of Consumer Protection</i>, Eastern Book Company</td><td>The consumer law side</td></tr></table></div>
 <div><div class="card"><h3>Laws and guidelines</h3><ul>
 <li>Consumer Protection Act, 2019 – ss.2(28), 2(47), 10, 18–21</li><li>CCPA Guidelines for Prevention of Misleading Advertisements and Endorsements, 2022</li>
 <li>Guidelines for Prevention and Regulation of Dark Patterns, 2023</li><li>Consumer Protection (E-Commerce) Rules, 2020; (Direct Selling) Rules, 2021</li>
 <li>Legal Metrology Act, 2009 and (Packaged Commodities) Rules, 2011</li><li>Trade Marks Act, 1999</li><li>Competition Act, 2002 – ss.3, 4</li>
 <li>Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954; COTPA, 2003</li></ul></div>
 <div class="card"><h3>Online sources</h3><ul>
 <li><a href="https://consumeraffairs.nic.in" target="_blank" rel="noopener">Department of Consumer Affairs</a> – CCPA orders and guidelines</li>
 <li><a href="https://www.ascionline.in" target="_blank" rel="noopener">Advertising Standards Council of India</a> – code and complaint decisions</li>
 <li><a href="https://consumerhelpline.gov.in" target="_blank" rel="noopener">National Consumer Helpline</a></li>
 <li><a href="https://www.cci.gov.in" target="_blank" rel="noopener">Competition Commission of India</a></li>
 <li><a href="/business-admin/">Business Administration series</a> on this site – marketing, sales and customer experience chapters</li></ul></div></div></div>`+footer(); }};

function footer(){ return `<div class="foot">Marketing Management explorer · v1.0.0 · Reference material for second-semester B.Com. LL.B. students, based on the standard Marketing Management syllabus with Indian legal links. Always check against your own course outline and the current text of the law.</div>`; }
