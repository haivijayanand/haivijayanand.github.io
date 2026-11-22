/*
TOOL:    ba-econ1/content.js — Economics I: Principles of Economics (B.A. LL.B. Semester I), assembled by build.py
FAMILY:  law-explorers
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    Kaavya Study Materials – TNNLU B.A. LL.B. Semester I and II explorers (claude.ai, 2026-11-22)
CHANGES: 1.0.0 - first version
*/
const UNITS = [
 {id:"u1", n:1, title:"The Economic Problem", short:"Definitions of economics; scarcity and choice; production possibility curve; economic systems; micro and macro."},
 {id:"u2", n:2, title:"Demand, Supply and Elasticity", short:"Laws of demand and supply; equilibrium; price ceilings and floors; price, income and cross elasticity."},
 {id:"u3", n:3, title:"Consumers, Production and Costs", short:"Utility and consumer surplus; law of variable proportions; returns to scale; short-run costs."},
 {id:"u4", n:4, title:"Markets and Competition", short:"Perfect competition, monopoly, monopolistic competition, oligopoly; market failure; Competition Act, 2002."},
 {id:"u5", n:5, title:"National Income", short:"Circular flow; GDP, GNP, NNP and national income; three methods; real and nominal; limits of GDP."},
 {id:"u6", n:6, title:"Money, Banking, Inflation and Public Finance", short:"Functions of money; RBI and monetary policy; credit creation; inflation; taxes, budget and deficits."}
];
const EXTRAS = [
 {id:"formulas", ic:"🧮", title:"Formula sheet"},
 {id:"flash", ic:"🃏", title:"Flashcards"},
 {id:"quiz", ic:"✅", title:"Quiz"},
 {id:"refs", ic:"📚", title:"References"}
];
const CASES = [], MAXIMS = [];
const HOME = {
 title:"Economics I – Principles of Economics",
 intro:["Lawyers meet economics everywhere: in contract damages, competition cases, taxation, labour law, environmental regulation and the Budget. This course gives you the core ideas – scarcity and choice, markets and prices, national income, money and the role of the State.",
  "Each unit has a lab you can play with: shift the demand curve, set a price ceiling, build a cost table, compute GDP, or watch a bank deposit multiply."],
 tips:["Draw every diagram yourself and label axes, curves and equilibrium.","For each concept ask: what law or policy uses this? (MSP is a price floor; rent control is a ceiling.)","Learn the formulas from the formula sheet and do one numerical a day.","Read the RBI's monetary policy statement and one Budget speech summary.","Revise with the flashcards before the quiz."],
 about:"TNNLU lists this paper as 'Economics – I (Principles of Economics)'. The units follow the standard first-semester economics syllabus of Indian law universities – micro foundations plus an introduction to macroeconomics. The <a href=\"/tools/llb-business-economics.html\">Business Economics explorer</a> covers the micro units in more depth. Compare with TNNLU's own course outline when it is issued."
};
const FOOT = "Economics I explorer · v1.0.0 · Reference material for first-semester B.A. LL.B. students, based on the usual 'Principles of Economics' syllabus. Always check against your own course outline.";

const FLASH = [
 ["Scarcity","Wants are unlimited but resources are limited – so we must choose."],
 ["Opportunity cost","The value of the next best alternative given up."],
 ["Robbins' definition","Economics studies human behaviour as a relationship between ends and scarce means which have alternative uses (1932)."],
 ["Marshall's definition","Economics is a study of mankind in the ordinary business of life – the welfare definition (1890)."],
 ["Production possibility curve","All combinations of two goods an economy can produce with given resources and technology; its slope shows opportunity cost."],
 ["Mixed economy","Private and public sectors coexist, with the State regulating – India since 1950, liberalised from 1991."],
 ["Law of demand","Other things equal, quantity demanded falls as price rises."],
 ["Giffen good","An inferior staple whose demand rises with price because of a strong income effect – an exception to the law of demand."],
 ["Change in demand","A shift of the whole curve caused by income, tastes, prices of related goods, expectations or population."],
 ["Equilibrium","The price where quantity demanded equals quantity supplied."],
 ["Price ceiling","A legal maximum price below equilibrium – causes shortage (rent control, drug price control)."],
 ["Price floor","A legal minimum price above equilibrium – causes surplus (MSP, minimum wages)."],
 ["Price elasticity of demand","% change in quantity demanded ÷ % change in price. Elastic if more than 1."],
 ["Income elasticity","% change in quantity ÷ % change in income. Negative for inferior goods."],
 ["Cross elasticity","% change in quantity of X ÷ % change in price of Y. Positive for substitutes, negative for complements."],
 ["Diminishing marginal utility","Each extra unit of a good gives less additional satisfaction."],
 ["Consumer surplus","What a buyer is willing to pay minus what she actually pays."],
 ["Law of variable proportions","As more of a variable input is added to a fixed input, marginal product eventually falls."],
 ["Returns to scale","How output changes when all inputs change in the same proportion – increasing, constant or decreasing."],
 ["Fixed cost","A cost that does not change with output in the short run (rent)."],
 ["Marginal cost","The extra cost of producing one more unit."],
 ["Perfect competition","Many sellers, identical product, free entry, perfect information – firms are price takers."],
 ["Monopoly","A single seller with no close substitutes and barriers to entry – a price maker."],
 ["Oligopoly","A few interdependent sellers (telecom, cement); risk of cartels."],
 ["Cartel","An agreement among competitors to fix prices or share markets – void under s.3 of the Competition Act, 2002."],
 ["Externality","A cost or benefit to third parties not reflected in price – pollution is a negative externality."],
 ["Public good","Non-rival and non-excludable (street lighting, national defence) – markets under-supply it."],
 ["GDP","Market value of all final goods and services produced within a country in a year."],
 ["GNP","GDP plus net factor income from abroad."],
 ["National income (NNP at factor cost)","GNP minus depreciation minus net indirect taxes."],
 ["GDP deflator","Nominal GDP ÷ real GDP × 100."],
 ["Repo rate","The rate at which the RBI lends to banks overnight – its main policy rate."],
 ["Money multiplier","1 ÷ reserve ratio – how far bank deposits can expand from a new deposit."],
 ["Inflation","A sustained rise in the general price level; India targets 4% CPI inflation (±2%) under the RBI Act, s.45ZA."],
 ["Fiscal deficit","Total expenditure minus total receipts other than borrowing – the government's borrowing need."],
 ["Direct and indirect tax","Direct: borne by the person taxed (income tax). Indirect: can be passed on (GST)."]
];

const QUIZ = [
 [1,"'Economics is the science of choice under scarcity' reflects the definition of…",["Adam Smith","Marshall","Robbins","Keynes"],2,"Ends and scarce means with alternative uses."],
 [1,"A point outside the production possibility curve is…",["Efficient","Inefficient","Unattainable with present resources","The equilibrium"],2,"Needs more resources or better technology."],
 [1,"'The government should raise the minimum wage' is a…",["Positive statement","Normative statement","Law of demand","Identity"],1,"It says what ought to be."],
 [1,"The study of the price of tea in a market is…",["Microeconomics","Macroeconomics","Econometrics","Public finance"],0,"A single market."],
 [1,"India's economic system is best described as…",["Pure capitalist","Pure socialist","Mixed","Barter"],2,"Public and private sectors together."],
 [2,"A rise in consumers' income shifts the demand for a normal good…",["Left","Right","Not at all","Along the curve"],1,"More demanded at every price."],
 [2,"A price ceiling below equilibrium causes…",["Surplus","Shortage","No effect","Lower demand"],1,"Quantity demanded exceeds supply."],
 [2,"Minimum support price for wheat above equilibrium is a…",["Price ceiling","Price floor","Tax","Subsidy on consumers"],1,"It leads to surplus stocks with FCI."],
 [2,"If price rises 10% and quantity demanded falls 20%, demand is…",["Inelastic","Unit elastic","Elastic","Perfectly inelastic"],2,"Elasticity = 2."],
 [2,"Tea and coffee have cross elasticity that is…",["Positive","Negative","Zero","Infinite"],0,"Substitutes."],
 [3,"The third rasgulla gives less satisfaction than the second. This is…",["Law of demand","Diminishing marginal utility","Returns to scale","Inflation"],1,"Marginal utility falls."],
 [3,"Consumer surplus is the area…",["Below the supply curve","Below the demand curve and above the price","Above the supply curve","Under the cost curve"],1,"Willingness to pay minus price paid."],
 [3,"Which is a fixed cost in the short run?",["Raw materials","Factory rent","Electricity for machines","Piece-rate wages"],1,"Does not vary with output."],
 [3,"Marginal cost is…",["TC ÷ Q","Change in TC from one more unit","FC + VC","TR − TC"],1,"Extra cost of the next unit."],
 [3,"When all inputs double and output triples, there are…",["Constant returns","Increasing returns to scale","Decreasing returns","Diminishing marginal utility"],1,"Output rises more than proportionately."],
 [4,"Firms in perfect competition are…",["Price makers","Price takers","Cartels","Monopolies"],1,"Price set by the market."],
 [4,"Indian Railways' passenger services are close to…",["Perfect competition","Monopoly","Monopolistic competition","Oligopoly"],1,"Single supplier."],
 [4,"Restaurants and salons in a city are examples of…",["Perfect competition","Monopolistic competition","Monopoly","Oligopoly"],1,"Many sellers, differentiated products."],
 [4,"Cement companies agreeing on prices is a…",["Merger","Cartel","Public good","Externality"],1,"Penalised by the CCI (Builders Association v Cement Manufacturers, 2016)."],
 [4,"Pollution from a factory is a…",["Public good","Negative externality","Price floor","Normal good"],1,"Cost borne by others."],
 [5,"GDP measures output produced…",["By Indians anywhere","Within India's borders","Only by the government","Only in agriculture"],1,"Domestic."],
 [5,"GNP = GDP + …",["Depreciation","Net factor income from abroad","Indirect taxes","Subsidies"],1,"Income earned abroad by residents minus income of foreigners here."],
 [5,"Which is NOT counted in GDP?",["A new car","A haircut","Buying a second-hand bike","Government teachers' salaries"],2,"Second-hand sales are not new production."],
 [5,"Real GDP removes the effect of…",["Population","Price changes","Exports","Taxes"],1,"Measured at constant prices."],
 [6,"When the RBI cuts the repo rate, it usually wants to…",["Reduce lending","Encourage borrowing and spending","Raise taxes","Print stamps"],1,"Cheaper credit."],
 [6,"With a reserve ratio of 10%, the simple money multiplier is…",["1","5","10","100"],2,"1 ÷ 0.10."],
 [6,"India's inflation target under the RBI Act is…",["2% CPI","4% CPI ± 2%","6% WPI","Zero"],1,"Flexible inflation targeting since 2016."],
 [6,"GST is a…",["Direct tax","Indirect tax","Wealth tax","Fee"],1,"Can be passed on to buyers."],
 [6,"Fiscal deficit is best defined as…",["Exports minus imports","Total expenditure minus receipts excluding borrowing","Revenue minus capital receipts","Money supply growth"],1,"The borrowing requirement."]
];

//@@VIEWS
VIEWS.home = { html: homeView };

/* ---------------- UNIT 1 ---------------- */
VIEWS.u1 = { html(){ return unitHead(1)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">Wants are unlimited, resources are <b>scarce</b>, and resources have <b>alternative uses</b>. So every society must choose – and every choice has an <b>opportunity cost</b>.</div>
 <h4>Definitions</h4><table class="t"><tr><th>Writer</th><th>Definition</th></tr>
 <tr><td>Adam Smith (1776)</td><td>Science of wealth – <i>Wealth of Nations</i></td></tr><tr><td>Alfred Marshall (1890)</td><td>Study of mankind in the ordinary business of life – welfare</td></tr>
 <tr><td>Lionel Robbins (1932)</td><td>Human behaviour as a relationship between ends and scarce means with alternative uses – scarcity</td></tr>
 <tr><td>Paul Samuelson</td><td>How societies choose to use scarce resources to produce goods and distribute them – growth</td></tr></table>
 <h4>Central problems</h4><p><b>What</b> to produce, <b>how</b> to produce, <b>for whom</b> to produce – plus full use of resources and growth.</p>
 <h4>Micro and macro; positive and normative</h4><p><b>Micro</b> studies individual units – a consumer, a firm, a market. <b>Macro</b> studies the economy as a whole – national income, inflation, unemployment. <b>Positive</b> statements can be tested ('MSP raised wheat stocks'); <b>normative</b> ones state values ('MSP should be legally guaranteed').</p>
 <h4>Economic systems</h4><table class="t"><tr><th>System</th><th>Who decides</th><th>Example</th></tr>
 <tr><td>Capitalist (market)</td><td>Prices and private owners</td><td>USA</td></tr><tr><td>Socialist (command)</td><td>State planning, public ownership</td><td>former USSR</td></tr>
 <tr><td>Mixed</td><td>Market plus State regulation and public sector</td><td>India – Five-Year Plans (1951–2017), liberalisation from 1991, NITI Aayog since 2015</td></tr></table>
 <p>The Directive Principles (Articles 38, 39(b), 39(c)) direct the State to prevent concentration of wealth – an economic choice written into the Constitution.</p></div>
</div><div>
 <div class="card lab"><h3>Production possibility curve</h3><p>An economy splits its resources between <b>food</b> and <b>machines</b>. Move along the curve and watch the opportunity cost rise.</p>
  <div class="row"><label>Machines <input type="range" id="ppM" min="0" max="5" step="1" value="2" style="width:220px"></label><span id="ppV"></span></div>
  <div id="ppG"></div><div id="ppOut" class="fb info"></div>
  <div class="row"><button class="btn sm sec" id="ppIn">Point inside</button><button class="btn sm sec" id="ppOutBtn">Point outside</button><button class="btn sm sec" id="ppGrow">Technology improves</button></div></div>
 <div class="card lab"><h3>Micro or macro? Positive or normative?</h3><div id="lab1"></div></div>
</div></div>`+unitFoot(1)+footer(); },
 init(){
  const F=[100,95,85,70,45,0]; let grow=1, extra=null;
  const X=m=>70+m*90, Y=f=>320-f*2.6;
  const draw=()=>{ const m=+$("#ppM").value;
   const pts=F.map((f,i)=>`${X(i)},${Y(f*grow)}`).join(" ");
   let s=`<svg viewBox="0 0 560 360" class="graph"><rect class="plotbg" x="70" y="20" width="460" height="300"/><line class="axis" x1="70" y1="320" x2="540" y2="320"/><line class="axis" x1="70" y1="320" x2="70" y2="20"/>
    <text class="tick" x="300" y="350" text-anchor="middle">Machines (units)</text><text class="tick" x="20" y="170" transform="rotate(-90 20 170)" text-anchor="middle">Food (units)</text>
    ${F.map((f,i)=>`<text class="tick" x="${X(i)}" y="338" text-anchor="middle">${i}</text>`).join("")}
    <polyline class="cD" points="${pts}"/>${grow>1?`<polyline class="cS" points="${F.map((f,i)=>`${X(i)},${Y(f)}`).join(" ")}"/>`:""}
    <line class="guide" x1="${X(m)}" y1="320" x2="${X(m)}" y2="${Y(F[m]*grow)}"/><line class="guide" x1="70" y1="${Y(F[m]*grow)}" x2="${X(m)}" y2="${Y(F[m]*grow)}"/>
    <circle class="eq" cx="${X(m)}" cy="${Y(F[m]*grow)}" r="8"/>
    ${extra?`<circle cx="${X(extra[0])}" cy="${Y(extra[1])}" r="8" fill="var(--gold)"/><text class="ctlt" x="${X(extra[0])+12}" y="${Y(extra[1])-8}">${extra[2]}</text>`:""}</svg>`;
   $("#ppG").innerHTML=s; $("#ppV").textContent=` ${m} machines, ${Math.round(F[m]*grow)} food`;
   $("#ppOut").innerHTML= m>0?`Going from ${m-1} to ${m} machines costs <b>${Math.round((F[m-1]-F[m])*grow)} food</b> – the opportunity cost. It rises as you move right because resources good at farming are switched to factories: the curve bows outward.`:"All resources in food: 100 units, no machines.";
  };
  $("#ppM").oninput=()=>{ extra=null; draw(); };
  $("#ppIn").onclick=()=>{ extra=[2,50,"inside: unemployment or waste"]; draw(); };
  $("#ppOutBtn").onclick=()=>{ extra=[3,95,"outside: unattainable now"]; draw(); };
  $("#ppGrow").onclick=()=>{ grow=grow>1?1:1.2; extra=null; draw(); $("#ppOut").innerHTML+= grow>1?" <b>Growth</b>: better technology or more resources shift the whole curve outward (dashed line shows the old curve).":""; };
  draw();
  choiceLab("#lab1",[
   ["India's CPI inflation was about 5% last year.","MP","Macro, and a testable statement."],
   ["The price of onions in Tiruchirappalli market rose after heavy rain.","mP","Micro and positive."],
   ["The government ought to tax sugary drinks more.","MN","A value judgment about national policy."],
   ["A firm should cut its prices to win customers.","mN","Micro and normative."]
  ],{mP:"Micro · positive",mN:"Micro · normative",MP:"Macro · positive",MN:"Macro · normative"});
  miniQuiz(1);
 }};

/* ---------------- UNIT 2 ---------------- */
VIEWS.u2 = { html(){ return unitHead(2)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">Prices are set where <b>demand</b> meets <b>supply</b>. When the State fixes a price away from equilibrium, it creates a <b>shortage</b> (ceiling) or a <b>surplus</b> (floor). <b>Elasticity</b> tells us how strongly buyers and sellers respond.</div>
 <h4>Demand</h4><p>Law of demand: price ↑ → quantity demanded ↓ (substitution and income effects). Determinants that <b>shift</b> demand: income, tastes, prices of substitutes and complements, expectations, population. Exceptions: Giffen goods, Veblen (status) goods, expected price rises.</p>
 <h4>Supply</h4><p>Law of supply: price ↑ → quantity supplied ↑. Shifters: input costs, technology, taxes and subsidies, number of sellers, weather.</p>
 <h4>Government and prices in India</h4><ul><li><b>Ceilings</b>: Drugs (Prices Control) Order, 2013; rent control Acts; essential commodities under the Essential Commodities Act, 1955.</li><li><b>Floors</b>: minimum support prices; minimum wages under the Code on Wages, 2019.</li></ul>
 <h4>Elasticity</h4><table class="t"><tr><th>Type</th><th>Formula</th><th>Meaning</th></tr>
 <tr><td>Price</td><td>%ΔQd ÷ %ΔP</td><td>&gt;1 elastic; &lt;1 inelastic</td></tr><tr><td>Income</td><td>%ΔQd ÷ %ΔY</td><td>+ normal, − inferior, &gt;1 luxury</td></tr><tr><td>Cross</td><td>%ΔQx ÷ %ΔPy</td><td>+ substitutes, − complements</td></tr></table>
 <p>Why lawyers care: a tax on a good with <b>inelastic</b> demand (cigarettes, petrol) raises revenue but falls mainly on buyers; competition authorities use cross elasticity to define the 'relevant market'.</p></div>
</div><div>
 <div class="card lab"><h3>Supply and demand lab</h3><div class="row"><label>Demand shift <input type="range" id="ddS" min="-30" max="30" value="0"></label><label>Supply shift <input type="range" id="ssS" min="-30" max="30" value="0"></label></div>
  <div class="row"><label><input type="checkbox" id="ceil"> Price ceiling at</label><input type="range" id="ceilP" min="10" max="90" value="35"><label><input type="checkbox" id="floor"> Price floor at</label><input type="range" id="floorP" min="10" max="90" value="65"></div>
  <div id="sdG"></div><div id="sdOut" class="fb info"></div></div>
 <div class="card lab"><h3>Elasticity calculator (midpoint method)</h3>
  <div class="row"><label>Price from <input type="number" id="e1" value="100" style="width:80px"></label><label>to <input type="number" id="e2" value="120" style="width:80px"></label></div>
  <div class="row"><label>Quantity from <input type="number" id="q1" value="50" style="width:80px"></label><label>to <input type="number" id="q2" value="35" style="width:80px"></label><button class="btn" id="eGo">Calculate</button></div><div id="eOut"></div></div>
</div></div>`+unitFoot(2)+footer(); },
 init(){
  const X=q=>60+q*4.6, Y=p=>320-p*3;
  const draw=()=>{ const a=100+ +$("#ddS").value, c=0+ +$("#ssS").value;   /* Qd = a - P ; Qs = c + P */
   const P=(a-c)/2, Q=a-P;
   let s=`<svg viewBox="0 0 560 360" class="graph"><rect class="plotbg" x="60" y="20" width="460" height="300"/><line class="axis" x1="60" y1="320" x2="530" y2="320"/><line class="axis" x1="60" y1="320" x2="60" y2="20"/>
    <text class="tick" x="290" y="352" text-anchor="middle">Quantity</text><text class="tick" x="20" y="170" transform="rotate(-90 20 170)" text-anchor="middle">Price (Rs)</text>`;
   const seg=(f,cls,lab)=>{ const pts=[]; for(let p=0;p<=100;p+=2){ const q=f(p); if(q>=0&&q<=100) pts.push(`${X(q)},${Y(p)}`);} const last=pts[pts.length-1].split(","); return `<polyline class="${cls}" points="${pts.join(" ")}"/><text class="${cls}l" x="${+last[0]+8}" y="${+last[1]+6}">${lab}</text>`; };
   s+=seg(p=>a-p,"cD","D")+seg(p=>c+p,"cS","S");
   let msg=`Equilibrium: price <b>Rs ${P.toFixed(0)}</b>, quantity <b>${Q.toFixed(0)}</b>.`;
   const ctl=(on,pp,kind)=>{ if(!on) return ""; const qd=a-pp, qs=c+pp; const bind = kind==="c" ? pp<P : pp>P;
     msg += bind ? (kind==="c" ? ` Ceiling at Rs ${pp} binds: buyers want ${qd.toFixed(0)}, sellers offer ${qs.toFixed(0)} – a <b>shortage of ${(qd-qs).toFixed(0)}</b>. Expect queues, rationing and black markets.` : ` Floor at Rs ${pp} binds: sellers offer ${qs.toFixed(0)}, buyers want ${qd.toFixed(0)} – a <b>surplus of ${(qs-qd).toFixed(0)}</b>, which the State must buy or store (like FCI stocks).`) : ` The ${kind==="c"?"ceiling":"floor"} at Rs ${pp} is ${kind==="c"?"above":"below"} equilibrium, so it does not bind.`;
     return `<line class="ctl" x1="60" y1="${Y(pp)}" x2="520" y2="${Y(pp)}"/><text class="ctlt" x="66" y="${Y(pp)-6}">${kind==="c"?"ceiling":"floor"} Rs ${pp}</text>`+(bind?`<line class="gap" x1="${X(Math.max(0,Math.min(qd,qs)))}" y1="${Y(pp)}" x2="${X(Math.min(100,Math.max(qd,qs)))}" y2="${Y(pp)}"/>`:""); };
   s+=ctl($("#ceil").checked,+$("#ceilP").value,"c")+ctl($("#floor").checked,+$("#floorP").value,"f");
   s+=`<line class="guide" x1="60" y1="${Y(P)}" x2="${X(Q)}" y2="${Y(P)}"/><line class="guide" x1="${X(Q)}" y1="320" x2="${X(Q)}" y2="${Y(P)}"/><circle class="eq" cx="${X(Q)}" cy="${Y(P)}" r="8"/></svg>`;
   $("#sdG").innerHTML=s; $("#sdOut").innerHTML=msg+` <span style="color:var(--muted)">D is the solid line, S the dashed line.</span>`;
  };
  ["ddS","ssS","ceil","ceilP","floor","floorP"].forEach(id=>$("#"+id).oninput=draw); draw();
  $("#eGo").onclick=()=>{ const p1=+$("#e1").value,p2=+$("#e2").value,q1=+$("#q1").value,q2=+$("#q2").value;
   const e=Math.abs(((q2-q1)/((q1+q2)/2))/((p2-p1)/((p1+p2)/2)));
   const tr1=p1*q1, tr2=p2*q2;
   $("#eOut").innerHTML=`<div class="fb info">Elasticity = <b>${e.toFixed(2)}</b> – ${e>1?"elastic: quantity responds more than price":e<1?"inelastic: quantity responds less than price":"unit elastic"}. Total revenue goes from Rs ${tr1} to Rs ${tr2} (${tr2>tr1?"up":"down"}) – ${e>1?"when demand is elastic, a price rise lowers revenue":"when demand is inelastic, a price rise raises revenue"}.</div>`; };
  $("#eGo").click();
  miniQuiz(2);
 }};

/* ---------------- UNIT 3 ---------------- */
VIEWS.u3 = { html(){ return unitHead(3)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">Behind demand is <b>utility</b>: each extra unit satisfies less. Behind supply is <b>cost</b>: with some inputs fixed, each extra worker eventually adds less, so marginal cost rises.</div>
 <h4>Consumer behaviour</h4><ul><li><b>Law of diminishing marginal utility</b> (Gossen, Marshall).</li><li><b>Equi-marginal principle</b>: a consumer gets most satisfaction when the marginal utility per rupee is equal across goods: MUx/Px = MUy/Py.</li><li><b>Indifference curves</b> (Hicks and Allen): combinations giving equal satisfaction; the consumer's best point is where the budget line touches the highest indifference curve.</li><li><b>Consumer surplus</b> (Marshall): willingness to pay minus price paid.</li></ul>
 <h4>Production</h4><p>Production function Q = f(land, labour, capital, enterprise). <b>Short run</b>: some inputs fixed – the <b>law of variable proportions</b> has three stages: increasing, diminishing and negative returns to the variable input. <b>Long run</b>: all inputs variable – <b>returns to scale</b> may be increasing (specialisation, economies of scale), constant or decreasing (management problems).</p>
 <h4>Costs</h4><table class="t"><tr><th>Cost</th><th>Formula</th></tr>
 <tr><td>Total cost</td><td>TC = TFC + TVC</td></tr><tr><td>Average cost</td><td>AC = TC ÷ Q</td></tr><tr><td>Marginal cost</td><td>MC = ΔTC ÷ ΔQ</td></tr><tr><td>Accounting vs economic cost</td><td>Economic cost adds opportunity costs (the owner's own time and capital)</td></tr></table>
 <p>AC and MC are U-shaped; MC cuts AC at its lowest point.</p></div>
</div><div>
 <div class="card lab"><h3>Law of variable proportions</h3><p>One machine (fixed). Add workers one at a time.</p><div id="lvp"></div><div class="row"><button class="btn" id="lvpAdd">Add a worker</button><button class="btn sec sm" id="lvpReset">Reset</button></div></div>
 <div class="card lab"><h3>Cost table generator</h3><div class="row"><label>Fixed cost Rs <input type="number" id="fc" value="100" style="width:80px"></label><label>Variable cost per unit at start Rs <input type="number" id="vc" value="20" style="width:70px"></label><button class="btn" id="ctGo">Build table</button></div><div id="ctOut"></div></div>
</div></div>`+unitFoot(3)+footer(); },
 init(){
  const TP=[0,10,24,36,45,50,52,52,50]; let w=0;
  const show=()=>{ let rows=""; for(let i=1;i<=w;i++){ const mp=TP[i]-TP[i-1], ap=TP[i]/i; const st=mp>TP[i-1]-(TP[i-2]||0)&&i<=2?"I – increasing returns":mp>0?"II – diminishing returns":"III – negative returns"; rows+=`<tr><td>${i}</td><td>${TP[i]}</td><td>${mp}</td><td>${ap.toFixed(1)}</td><td>${st}</td></tr>`; }
   $("#lvp").innerHTML=`<table class="t"><tr><th>Workers</th><th>Total product</th><th>Marginal product</th><th>Average product</th><th>Stage</th></tr>${rows||'<tr><td colspan="5">Press "Add a worker".</td></tr>'}</table>`+(w>=3?`<div class="fb info">${w<=2?"":"Marginal product peaked with the 2nd worker and now falls – the machine is shared by more people. "}${w>=7?"With the 7th worker MP is zero, then negative: workers get in each other's way. A rational firm produces in Stage II.":""}</div>`:"");
   $("#lvpAdd").disabled=w>=8; };
  $("#lvpAdd").onclick=()=>{ w=Math.min(8,w+1); show(); }; $("#lvpReset").onclick=()=>{ w=0; show(); }; show();
  $("#ctGo").onclick=()=>{ const F=+$("#fc").value||0, v=+$("#vc").value||0; let tc0=F, rows="";
   for(let q=0;q<=8;q++){ const tvc=q===0?0:Math.round(v*q*(1-0.12*q+0.018*q*q)); const tc=F+tvc; const mc=q===0?"–":tc-tc0; tc0=tc;
     rows+=`<tr><td>${q}</td><td>${F}</td><td>${tvc}</td><td>${tc}</td><td>${q?(tc/q).toFixed(1):"–"}</td><td>${q?(tvc/q).toFixed(1):"–"}</td><td>${mc}</td></tr>`; }
   $("#ctOut").innerHTML=`<table class="t"><tr><th>Q</th><th>TFC</th><th>TVC</th><th>TC</th><th>AC</th><th>AVC</th><th>MC</th></tr>${rows}</table><div class="fb info">Fixed cost stays the same at every output. MC first falls then rises; AC falls while MC is below it and rises once MC is above it.</div>`; };
  $("#ctGo").click();
  miniQuiz(3);
 }};

/* ---------------- UNIT 4 ---------------- */
VIEWS.u4 = { html(){ return unitHead(4)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">How a market behaves depends on its <b>structure</b> – the number of sellers, the kind of product and how easy it is to enter. Where markets fail, the <b>law</b> steps in.</div>
 <table class="t"><tr><th>Feature</th><th>Perfect competition</th><th>Monopolistic competition</th><th>Oligopoly</th><th>Monopoly</th></tr>
 <tr><td>Sellers</td><td>Very many</td><td>Many</td><td>Few</td><td>One</td></tr><tr><td>Product</td><td>Identical</td><td>Differentiated</td><td>Identical or differentiated</td><td>Unique</td></tr>
 <tr><td>Entry</td><td>Free</td><td>Fairly easy</td><td>Barriers</td><td>Blocked</td></tr><tr><td>Price control</td><td>None (taker)</td><td>Some</td><td>Interdependent</td><td>Considerable (maker)</td></tr>
 <tr><td>Example</td><td>Vegetables in a mandi (approx.)</td><td>Restaurants, toothpaste</td><td>Telecom, cement, airlines</td><td>Railways, local water supply</td></tr></table>
 <h4>Monopoly and price discrimination</h4><p>A monopolist restricts output and charges more than a competitive market would. Price discrimination – charging different prices to different buyers for the same good – needs separable markets (student fares, peak electricity tariffs).</p>
 <h4>Market failure</h4><ul><li><b>Externalities</b> – pollution (polluter-pays principle in environmental law).</li><li><b>Public goods</b> – non-rival, non-excludable; free-rider problem.</li><li><b>Information asymmetry</b> – used cars, insurance; consumer protection law.</li><li><b>Market power</b> – monopolies and cartels.</li></ul>
 <h4>The Competition Act, 2002</h4><p>Section 3 – anti-competitive agreements (cartels presumed harmful); section 4 – abuse of dominant position; sections 5–6 – combinations (mergers). Enforced by the Competition Commission of India (CCI). Examples: cement cartel penalty (2016); CCI's orders against Google on Android (2022).</p></div>
</div><div>
 <div class="card lab"><h3>Name the market structure</h3><div id="lab4"></div></div>
 <div class="card lab"><h3>Which market failure?</h3><div id="lab4b"></div></div>
</div></div>`+unitFoot(4)+footer(); },
 init(){
  choiceLab("#lab4",[
   ["Thousands of farmers sell the same grade of wheat; no one can change the price.","PC","Price takers."],
   ["Three big companies supply almost all mobile phone connections and watch each other's tariffs.","OL","Few interdependent sellers."],
   ["Hundreds of tailors, each with a slightly different style and loyal customers.","MC","Differentiated products, easy entry."],
   ["The only company allowed to distribute electricity in a city.","MO","Legal monopoly."]
  ],{PC:"Perfect competition",MC:"Monopolistic competition",OL:"Oligopoly",MO:"Monopoly"});
  choiceLab("#lab4b",[
   ["A tannery discharges effluent into a river used by farmers downstream.","EX","Negative externality (Vellore Citizens' Welfare Forum, 1996)."],
   ["No private firm will build a lighthouse because ships cannot be made to pay.","PG","Public good."],
   ["A seller knows the second-hand car was in a flood, the buyer does not.","IA","Information asymmetry."],
   ["Tyre makers share price information and raise prices together.","MP","Market power – a cartel."]
  ],{EX:"Externality",PG:"Public good",IA:"Information asymmetry",MP:"Market power"});
  miniQuiz(4);
 }};

/* ---------------- UNIT 5 ---------------- */
const CF_SVG=ringSVG("cf",[["Households","own land, labour, capital"],["Factor market","rent, wages, interest, profit"],["Firms","produce goods and services"],["Goods market","consumption spending"]],"Circular flow of income","Income|= Output|= Spending");
VIEWS.u5 = { html(){ return unitHead(5)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">In the <b>circular flow</b>, one person's spending is another's income. So national output can be measured three ways – by <b>production</b>, by <b>income</b> or by <b>expenditure</b> – and should give the same total.</div>
 <h4>Aggregates</h4><table class="t"><tr><th>Measure</th><th>How</th></tr>
 <tr><td>GDP at market prices</td><td>Value of final goods and services produced within the country</td></tr>
 <tr><td>GNP</td><td>GDP + net factor income from abroad</td></tr>
 <tr><td>NNP</td><td>GNP − depreciation</td></tr>
 <tr><td>National income (NNP at factor cost)</td><td>NNP − indirect taxes + subsidies</td></tr>
 <tr><td>Per capita income</td><td>National income ÷ population</td></tr></table>
 <h4>Three methods</h4><ul><li><b>Product (value added)</b>: sum of value added at each stage – avoids double counting of intermediate goods.</li><li><b>Income</b>: rent + wages + interest + profit (+ mixed income of the self-employed).</li><li><b>Expenditure</b>: C + I + G + (X − M).</li></ul>
 <h4>Real and nominal</h4><p>Nominal GDP uses current prices; real GDP uses base-year prices (India's base year is 2011-12). <b>GDP deflator</b> = nominal ÷ real × 100. Estimates are published by the National Statistics Office (MoSPI).</p>
 <h4>What GDP misses</h4><p>Unpaid household work, the informal economy, environmental damage, inequality and well-being. Hence the Human Development Index (UNDP) and 'green GDP' ideas.</p></div>
</div><div>
 ${animBox("cfAnim","Circular flow of income",CF_SVG)}
 <div class="card lab"><h3>GDP calculator (expenditure method)</h3><p>Figures in lakh crore rupees.</p>
  <div class="row"><label>C <input type="number" id="gC" value="180" style="width:70px"></label><label>I <input type="number" id="gI" value="95" style="width:70px"></label><label>G <input type="number" id="gG" value="30" style="width:70px"></label><label>X <input type="number" id="gX" value="65" style="width:70px"></label><label>M <input type="number" id="gM" value="75" style="width:70px"></label></div>
  <div class="row"><label>Net factor income from abroad <input type="number" id="gN" value="-4" style="width:70px"></label><label>Depreciation <input type="number" id="gD" value="35" style="width:70px"></label><label>Net indirect taxes <input type="number" id="gT" value="25" style="width:70px"></label><button class="btn" id="gGo">Compute</button></div><div id="gOut"></div></div>
 <div class="card lab"><h3>Counted in GDP?</h3><div id="lab5"></div></div>
</div></div>`+unitFoot(5)+footer(); },
 init(){
  anim=flowAnim("cfAnim","cf",4,[
   "<b>Households</b> own the factors of production – land, labour, capital and enterprise.",
   "They sell factor services in the <b>factor market</b> and receive rent, wages, interest and profit – <b>income</b>.",
   "<b>Firms</b> use those factors to produce goods and services – <b>output</b>.",
   "Households spend their income buying that output in the <b>goods market</b>, and the money returns to firms – <b>expenditure</b>. Income = output = spending: the basis of the three methods."],true);
  $("#gGo").onclick=()=>{ const v=id=>+$("#"+id).value||0;
   const gdp=v("gC")+v("gI")+v("gG")+v("gX")-v("gM"), gnp=gdp+v("gN"), nnp=gnp-v("gD"), ni=nnp-v("gT");
   $("#gOut").innerHTML=`<table class="t"><tr><td>GDP at market prices = C + I + G + (X − M)</td><td><b>${gdp}</b></td></tr><tr><td>GNP = GDP + NFIA</td><td>${gnp}</td></tr><tr><td>NNP = GNP − depreciation</td><td>${nnp}</td></tr><tr><td>National income = NNP − net indirect taxes</td><td><b>${ni}</b></td></tr></table><div class="fb info">Net exports are ${v("gX")-v("gM")<0?"negative – India imports more than it exports, which reduces GDP":"positive"}. NFIA is ${v("gN")<0?"negative because foreigners earn more in India than Indians earn abroad":"positive"}.</div>`; };
  $("#gGo").click();
  choiceLab("#lab5",[
   ["A new flat built and sold this year.","Y","New final output."],
   ["Buying shares on the stock exchange.","N","A financial transfer, not production."],
   ["Old-age pension paid by the government.","N","A transfer payment – no service in return."],
   ["A lawyer's fee for drafting a contract.","Y","A final service."],
   ["Steel bought by a car maker (the car is counted).","N","Intermediate good – counting it would double-count."]
  ],{Y:"Counted",N:"Not counted"});
  miniQuiz(5);
 }};

/* ---------------- UNIT 6 ---------------- */
VIEWS.u6 = { html(){ return unitHead(6)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">The State manages the economy through two levers: <b>monetary policy</b> (the RBI – interest rates and money supply) and <b>fiscal policy</b> (the government – taxes and spending). Both aim at stable prices, growth and jobs.</div>
 <h4>Money</h4><p>Functions: medium of exchange, measure of value, store of value, standard of deferred payment. Evolved from barter → commodity money → coins → paper → bank and digital money (UPI). The RBI issues currency under the RBI Act, 1934.</p>
 <h4>Banks and credit creation</h4><p>Banks keep a fraction of deposits as reserves (CRR with the RBI, SLR in safe assets) and lend the rest; the loans are redeposited and lent again. Simple <b>money multiplier</b> = 1 ÷ reserve ratio.</p>
 <h4>Monetary policy</h4><p>The six-member <b>Monetary Policy Committee</b> (RBI Act, s.45ZB) sets the <b>repo rate</b> to keep CPI inflation at <b>4% ± 2%</b> (s.45ZA). Other tools: reverse repo / standing deposit facility, CRR, SLR, open market operations.</p>
 <h4>Inflation</h4><p><b>Demand-pull</b> (too much spending), <b>cost-push</b> (oil prices, wages). Effects: hurts fixed-income earners and savers, helps debtors, erodes competitiveness. Measured by the Consumer Price Index (CPI) and Wholesale Price Index (WPI).</p>
 <h4>Public finance</h4><ul><li><b>Taxes</b>: direct (income tax, corporate tax) and indirect (GST since 2017, customs). Canons of taxation (Adam Smith): equity, certainty, convenience, economy.</li><li><b>Budget</b> (Article 112, 'annual financial statement'): revenue and capital accounts.</li><li><b>Deficits</b>: revenue deficit, fiscal deficit (borrowing need), primary deficit (fiscal deficit minus interest). The FRBM Act, 2003 sets deficit targets.</li><li>Article 265: no tax without the authority of law.</li></ul></div>
</div><div>
 <div class="card lab"><h3>Credit creation</h3><div class="row"><label>New deposit Rs <input type="number" id="ccD" value="1000" style="width:90px"></label><label>Reserve ratio <input type="range" id="ccR" min="5" max="50" value="10"></label><span id="ccRv"></span></div><div id="ccG"></div><div id="ccOut" class="fb info"></div></div>
 <div class="card lab"><h3>Inflation and your money</h3><div class="row"><label>Amount today Rs <input type="number" id="inA" value="100000" style="width:110px"></label><label>Inflation % a year <input type="number" id="inR" value="6" style="width:60px"></label><label>Years <input type="number" id="inY" value="10" style="width:60px"></label><button class="btn" id="inGo">Show</button></div><div id="inOut"></div></div>
 <div class="card lab"><h3>Monetary or fiscal?</h3><div id="lab6"></div></div>
</div></div>`+unitFoot(6)+footer(); },
 init(){
  const cc=()=>{ const D=+$("#ccD").value||0, r=+$("#ccR").value/100; $("#ccRv").textContent=(r*100).toFixed(0)+"%";
   let dep=D, tot=0, bars=""; for(let i=0;i<8;i++){ tot+=dep; bars+=`<rect class="bar" x="${50+i*60}" y="${200-dep/D*170}" width="44" height="${dep/D*170}"/><text class="tick" x="${72+i*60}" y="${195-dep/D*170}" text-anchor="middle">${Math.round(dep)}</text>`; dep*= (1-r); }
   $("#ccG").innerHTML=`<svg viewBox="0 0 560 230" class="graph"><line class="axis" x1="40" y1="200" x2="540" y2="200"/>${bars}<text class="tick" x="290" y="222" text-anchor="middle">Round of lending 1 → 8</text></svg>`;
   $("#ccOut").innerHTML=`Each round, banks keep ${(r*100).toFixed(0)}% and lend the rest. After 8 rounds deposits total Rs ${Math.round(tot)}; in the limit they reach <b>Rs ${Math.round(D/r)}</b> – multiplier ${ (1/r).toFixed(1)}. Raising the reserve ratio (CRR) shrinks lending: a tool to fight inflation.`; };
  $("#ccD").oninput=cc; $("#ccR").oninput=cc; cc();
  $("#inGo").onclick=()=>{ const A=+$("#inA").value, r=+$("#inR").value/100, y=+$("#inY").value; const real=A/Math.pow(1+r,y), need=A*Math.pow(1+r,y);
   $("#inOut").innerHTML=`<div class="fb info">At ${(r*100).toFixed(1)}% inflation, Rs ${A.toLocaleString("en-IN")} kept in cash buys only what <b>Rs ${Math.round(real).toLocaleString("en-IN")}</b> buys today after ${y} years. To keep the same purchasing power you would need <b>Rs ${Math.round(need).toLocaleString("en-IN")}</b>. Rule of 70: prices double in about ${(70/(r*100)).toFixed(0)} years. This is why courts award interest on delayed payments and why compensation is sometimes indexed to prices.</div>`; };
  $("#inGo").click();
  choiceLab("#lab6",[
   ["The RBI raises the repo rate by 0.25%.","M","Monetary."],
   ["The Finance Minister cuts the income-tax rate in the Budget.","F","Fiscal."],
   ["The government increases spending on rural roads.","F","Fiscal."],
   ["The RBI raises the cash reserve ratio.","M","Monetary."]
  ],{M:"Monetary policy",F:"Fiscal policy"});
  miniQuiz(6);
 }};

/* ---------------- FORMULA SHEET ---------------- */
VIEWS.formulas = { html(){ return `<div class="unitban"><div class="k">Revise</div><h2>Formula sheet</h2><p>All the formulas of the course on one page.</p></div>
 <div class="two"><div class="card"><table class="t"><tr><th>Concept</th><th>Formula</th></tr>
 <tr><td>Opportunity cost (PPC)</td><td>Units of Y given up ÷ units of X gained</td></tr>
 <tr><td>Price elasticity (midpoint)</td><td>[ΔQ ÷ average Q] ÷ [ΔP ÷ average P]</td></tr>
 <tr><td>Income elasticity</td><td>%ΔQ ÷ %ΔY</td></tr><tr><td>Cross elasticity</td><td>%ΔQx ÷ %ΔPy</td></tr>
 <tr><td>Consumer equilibrium</td><td>MUx/Px = MUy/Py</td></tr><tr><td>Consumer surplus</td><td>Willingness to pay − price paid</td></tr>
 <tr><td>Marginal product</td><td>ΔTP ÷ ΔL</td></tr><tr><td>Average product</td><td>TP ÷ L</td></tr>
 <tr><td>Total cost</td><td>TFC + TVC</td></tr><tr><td>Average cost</td><td>TC ÷ Q</td></tr><tr><td>Marginal cost</td><td>ΔTC ÷ ΔQ</td></tr>
 <tr><td>Profit</td><td>TR − TC; profit-maximising output where MR = MC</td></tr></table></div>
 <div class="card"><table class="t"><tr><th>Concept</th><th>Formula</th></tr>
 <tr><td>GDP (expenditure)</td><td>C + I + G + (X − M)</td></tr><tr><td>GNP</td><td>GDP + NFIA</td></tr><tr><td>NNP</td><td>GNP − depreciation</td></tr>
 <tr><td>National income</td><td>NNP at market prices − indirect taxes + subsidies</td></tr><tr><td>GDP deflator</td><td>Nominal GDP ÷ real GDP × 100</td></tr>
 <tr><td>Inflation rate</td><td>(CPI this year − CPI last year) ÷ CPI last year × 100</td></tr><tr><td>Money multiplier</td><td>1 ÷ reserve ratio</td></tr>
 <tr><td>Fiscal deficit</td><td>Total expenditure − (revenue receipts + non-debt capital receipts)</td></tr><tr><td>Primary deficit</td><td>Fiscal deficit − interest payments</td></tr>
 <tr><td>Revenue deficit</td><td>Revenue expenditure − revenue receipts</td></tr><tr><td>Rule of 70</td><td>Years to double ≈ 70 ÷ growth (or inflation) rate %</td></tr></table></div></div>`+footer(); }};

/* ---------------- REFERENCES ---------------- */
VIEWS.refs = { html(){ return `<div class="unitban"><div class="k">Read further</div><h2>References</h2><p>Books are in the TNNLU library; online sources need internet.</p></div>
 <div class="two"><div class="card"><h3>Books</h3><table class="t"><tr><th>Book</th><th>Use it for</th></tr>
 <tr><td>N. Gregory Mankiw, <i>Principles of Economics</i>, Cengage</td><td>Clear main text for all units</td></tr>
 <tr><td>H.L. Ahuja, <i>Principles of Microeconomics</i>, S. Chand</td><td>Indian micro textbook</td></tr>
 <tr><td>K.K. Dewett and M.H. Navalur, <i>Modern Economic Theory</i>, S. Chand</td><td>Classic Indian text, micro and macro</td></tr>
 <tr><td>Paul Samuelson and William Nordhaus, <i>Economics</i>, McGraw-Hill</td><td>Reference</td></tr>
 <tr><td>Ramesh Singh, <i>Indian Economy</i>, McGraw-Hill</td><td>Indian institutions, RBI, budget, GST</td></tr>
 <tr><td>NCERT, <i>Introductory Microeconomics</i> and <i>Introductory Macroeconomics</i> (Class XII)</td><td>Quick, clear revision</td></tr></table></div>
 <div><div class="card"><h3>Online</h3><ul>
 <li><a href="https://www.rbi.org.in" target="_blank" rel="noopener">Reserve Bank of India</a> – monetary policy statements</li>
 <li><a href="https://www.indiabudget.gov.in" target="_blank" rel="noopener">Union Budget</a> – Budget at a Glance, Economic Survey</li>
 <li><a href="https://mospi.gov.in" target="_blank" rel="noopener">MoSPI</a> – GDP and CPI releases</li>
 <li><a href="https://www.cci.gov.in" target="_blank" rel="noopener">Competition Commission of India</a> – orders</li>
 <li><a href="/tools/llb-business-economics.html">Business Economics explorer</a> – more micro labs (cost curves, cartel game)</li></ul></div></div></div>`+footer(); }};
