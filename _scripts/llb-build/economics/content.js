/*
TOOL:    economics/content.js — course data and unit pages, assembled by build.py
FAMILY:  law-explorers
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    Kaavya Study Materials – TNNLU B.Com. LL.B. Semester II explorers (claude.ai, 2026-11-22)
CHANGES: 1.0.0 - first version
*/
const UNITS = [
 {id:"u1", n:1, title:"Demand, Supply and Markets", short:"Scarcity and choice; laws of demand and supply; equilibrium; price ceilings and floors."},
 {id:"u2", n:2, title:"Elasticity", short:"Price, income and cross elasticity; total revenue test; uses in pricing and tax."},
 {id:"u3", n:3, title:"Consumer Behaviour", short:"Utility, diminishing marginal utility, equi-marginal rule, indifference curves, consumer surplus."},
 {id:"u4", n:4, title:"Production and Costs", short:"Law of variable proportions, returns to scale, cost curves, revenue, break-even."},
 {id:"u5", n:5, title:"Market Structures", short:"Perfect competition, monopoly, monopolistic competition, oligopoly, competition law."},
 {id:"u6", n:6, title:"Factor Pricing and Macroeconomics", short:"Rent, wages, interest, profit; national income, inflation, monetary and fiscal policy."}
];

const EXTRAS = [
 {id:"formulas", ic:"🧮", title:"Formula sheet"},
 {id:"flash", ic:"🃏", title:"Flashcards"},
 {id:"quiz", ic:"✅", title:"Quiz"},
 {id:"refs", ic:"📚", title:"References"}
];
const CASES = [], MAXIMS = [];

const FLASH = [
 ["Economics","The study of how people choose to use scarce resources to satisfy unlimited wants."],
 ["Business economics","Applying economic theory and tools to business decisions – demand forecasting, pricing, costs, investment."],
 ["Opportunity cost","The value of the next best alternative given up when making a choice."],
 ["Production possibility curve","All combinations of two goods an economy can produce with its resources and technology fully used."],
 ["Positive vs normative","Positive: what is (testable). Normative: what ought to be (value judgment)."],
 ["Law of demand","Other things equal, quantity demanded falls as price rises, and rises as price falls."],
 ["Giffen good","An inferior staple where a price rise increases quantity demanded, because the income effect outweighs the substitution effect."],
 ["Veblen good","A status good demanded more at a higher price – an exception to the law of demand."],
 ["Change in quantity demanded","Movement along the demand curve, caused only by the good's own price."],
 ["Change in demand","Shift of the whole curve – income, tastes, prices of related goods, expectations, population."],
 ["Equilibrium","Price at which quantity demanded equals quantity supplied; no shortage or surplus."],
 ["Price ceiling","A legal maximum price below equilibrium – causes shortages (e.g. rent control)."],
 ["Price floor","A legal minimum price above equilibrium – causes surpluses (e.g. minimum support price)."],
 ["Price elasticity of demand","% change in quantity demanded ÷ % change in price."],
 ["Total revenue test","If demand is elastic, a price cut raises total revenue; if inelastic, a price cut lowers it."],
 ["Income elasticity","% change in demand ÷ % change in income. Negative: inferior; 0–1: necessity; above 1: luxury."],
 ["Cross elasticity","% change in demand for X ÷ % change in price of Y. Positive: substitutes; negative: complements."],
 ["Marginal utility","Extra satisfaction from one more unit. It diminishes as more is consumed."],
 ["Equi-marginal principle","Utility is maximised when MU per rupee is equal across goods: MUx/Px = MUy/Py."],
 ["Indifference curve","Combinations of two goods giving the same satisfaction; slope = marginal rate of substitution."],
 ["Consumer surplus","What a consumer is willing to pay minus what she actually pays (Marshall)."],
 ["Law of variable proportions","Adding more of one input to fixed inputs: output rises at an increasing, then diminishing, then negative rate."],
 ["Returns to scale","Change in output when all inputs change in the same proportion – increasing, constant or decreasing."],
 ["Fixed cost","Does not change with output in the short run – rent, salaries, interest."],
 ["Marginal cost","Extra cost of producing one more unit: change in TC ÷ change in Q."],
 ["Break-even point","Output where total revenue equals total cost: Fixed cost ÷ (Price − AVC)."],
 ["Profit maximisation","Produce where marginal revenue = marginal cost, and MC is rising."],
 ["Perfect competition","Many sellers, identical product, free entry, price takers. P = MR = AR."],
 ["Monopoly","One seller, no close substitutes, barriers to entry; price maker."],
 ["Oligopoly","A few interdependent sellers – cement, telecom, airlines. Risk of cartels."],
 ["Cartel","An agreement between competitors to fix prices or share markets – prohibited by s.3 of the Competition Act, 2002."],
 ["GDP","Market value of all final goods and services produced within a country in a year."],
 ["Inflation","A sustained rise in the general price level, measured in India mainly by CPI."],
 ["Repo rate","The rate at which the RBI lends to banks overnight – its main policy rate."],
 ["Fiscal deficit","Total government expenditure minus total receipts excluding borrowings."]
];

const QUIZ = [
 [1,"Opportunity cost is…",["The money price of a good","The next best alternative forgone","The cost of production","A sunk cost"],1,"The real cost of any choice."],
 [1,"A rise in consumers' income shifts the demand for a normal good…",["Left","Right","Along the curve","Not at all"],1,"More is demanded at every price."],
 [1,"A price ceiling set below equilibrium causes…",["Surplus","Shortage","No change","Higher prices"],1,"Quantity demanded exceeds quantity supplied."],
 [1,"Minimum support price for wheat is an example of…",["Price ceiling","Price floor","Tax","Subsidy to consumers"],1,"A legal minimum above the market price."],
 [1,"'The government should reduce income inequality' is…",["A positive statement","A normative statement","A law of economics","A demand function"],1,"It contains a value judgment."],
 [2,"If price elasticity of demand is 0.4, demand is…",["Elastic","Inelastic","Unit elastic","Perfectly elastic"],1,"Less than 1."],
 [2,"For a good with elastic demand, a price cut will…",["Reduce total revenue","Increase total revenue","Leave revenue unchanged","Reduce quantity sold"],1,"Quantity rises proportionally more than price falls."],
 [2,"Tea and coffee have a cross elasticity that is…",["Negative","Positive","Zero","Infinite"],1,"They are substitutes."],
 [2,"A good with negative income elasticity is…",["A luxury","An inferior good","A necessity","A complement"],1,"Demand falls as income rises."],
 [2,"Taxes fall mostly on consumers when demand is…",["Elastic","Inelastic","Unit elastic","Perfectly elastic"],1,"Consumers cannot easily switch away – e.g. fuel, tobacco."],
 [3,"The law of diminishing marginal utility says…",["Total utility always falls","Each extra unit gives less extra satisfaction","Utility cannot be measured","Price falls as utility rises"],1,"MU falls as consumption increases."],
 [3,"The consumer is in equilibrium when…",["MUx = MUy","MUx/Px = MUy/Py","Px = Py","TU is zero"],1,"Equi-marginal principle."],
 [3,"The slope of an indifference curve is the…",["Price ratio","Marginal rate of substitution","Marginal cost","Elasticity"],1,"MRS."],
 [3,"Consumer surplus is…",["Price paid minus cost","Willingness to pay minus price paid","Total utility","Producer's profit"],1,"Marshall's concept."],
 [3,"Indifference curves are normally…",["Concave to the origin","Convex to the origin","Vertical","Upward sloping"],1,"Because of diminishing MRS."],
 [4,"Stage II of the law of variable proportions begins where…",["MP is zero","AP is at its maximum","TP is zero","MP is negative"],1,"And ends where MP becomes zero – the rational stage."],
 [4,"Which cost does not change with output in the short run?",["Variable cost","Fixed cost","Marginal cost","Total cost"],1,"Rent, salaries, interest."],
 [4,"The MC curve cuts the AC curve…",["At its maximum","At its minimum","Never","Where AC is zero"],1,"When MC < AC, AC falls; when MC > AC, AC rises."],
 [4,"Fixed cost Rs 60,000, price Rs 50, AVC Rs 30. Break-even output is…",["1,200","2,000","3,000","6,000"],2,"60,000 ÷ (50 − 30) = 3,000 units."],
 [4,"Doubling all inputs more than doubles output. This is…",["Decreasing returns to scale","Constant returns","Increasing returns to scale","Diminishing returns"],2,"Often due to specialisation and indivisibilities."],
 [5,"Under perfect competition, the firm is a…",["Price maker","Price taker","Monopolist","Cartel member"],1,"It accepts the market price."],
 [5,"Profit is maximised where…",["TR is highest","MR = MC","AC is lowest","Price is highest"],1,"With MC rising."],
 [5,"Charging different prices to different buyers for the same good is…",["Price leadership","Price discrimination","Predatory pricing","Dumping"],1,"E.g. student fares, peak and off-peak tariffs."],
 [5,"Branded soaps and restaurants are examples of…",["Perfect competition","Monopolistic competition","Pure monopoly","Duopoly"],1,"Many sellers with differentiated products."],
 [5,"Which body enforces the Competition Act, 2002?",["SEBI","RBI","Competition Commission of India","TRAI"],2,"CCI, with appeals to the NCLAT."],
 [6,"GDP by the expenditure method is…",["C + I + G + (X − M)","Wages + rent","C + S + T","GNP − depreciation"],0,"Consumption, investment, government spending, net exports."],
 [6,"Which is NOT included in GDP?",["A new house","A haircut","Sale of a second-hand car","Government school teachers' services"],2,"Already counted when first produced."],
 [6,"Inflation caused by rising costs of inputs is…",["Demand-pull","Cost-push","Deflation","Stagflation only"],1,"E.g. oil price shocks."],
 [6,"To control inflation the RBI is likely to…",["Cut the repo rate","Raise the repo rate","Print more money","Reduce CRR"],1,"Tighter money reduces demand."],
 [6,"Rent in economics is a payment for…",["Any building","Land and other factors in fixed supply","Labour","Capital"],1,"Ricardian rent."]
];

//@@VIEWS
VIEWS.home = { html(){
  const done=S.d.done;
  return `<div class="hero"><h2>Business Economics</h2>
  <p>Why do onion prices jump after a poor monsoon? Why do airlines charge different fares for the same seat? Why does the RBI raise interest rates? Economics explains how people and firms choose when resources are scarce – and law constantly regulates those choices.</p>
  <p>Work through the six units and play with the graphs, calculators and the pricing game; then revise with the formula sheet, flashcards and quiz.</p></div>
  <div class="ucards">${UNITS.map(u=>`<a class="ucard" data-go="${u.id}"><span class="k">Unit ${u.n}</span><b>${u.title}</b><span>${u.short}</span>${done[u.id]?'<span class="st">✓ Done</span>':""}</a>`).join("")}
  ${EXTRAS.map(x=>`<a class="ucard" data-go="${x.id}" style="border-top-color:var(--gold)"><span class="k" style="color:var(--gold)">${x.ic} Revise</span><b>${x.title}</b></a>`).join("")}</div>
  <div class="two" style="margin-top:18px">
   <div class="card"><h3>Why a law student needs economics</h3>
   <ol><li><b>Competition law</b> – market power, cartels, predatory pricing (Competition Act, 2002).</li><li><b>Tax law</b> – who really bears a tax depends on elasticity.</li><li><b>Contract and tort</b> – damages, efficiency, incentives.</li><li><b>Regulation</b> – price controls (Essential Commodities Act, drug price control), minimum wages, MSP.</li><li><b>Constitutional law</b> – Directive Principles on distribution of resources (Art. 39(b), (c)).</li></ol></div>
   <div class="card"><h3>Keyboard</h3><table class="t">
   <tr><td><span class="kbd">M</span></td><td>Show or hide the unit list</td></tr>
   <tr><td><span class="kbd">P</span> / <span class="kbd">S</span> / <span class="kbd">X</span></td><td>Play, step, pause the animation on the page</td></tr>
   <tr><td><span class="kbd">F</span></td><td>Full screen</td></tr>
   <tr><td><span class="kbd">←</span> <span class="kbd">→</span> <span class="kbd">Space</span></td><td>Flashcards: previous, next, flip</td></tr>
   <tr><td><span class="kbd">[</span> <span class="kbd">]</span></td><td>Previous or next unit</td></tr></table>
   <p style="font-size:13.5px;color:var(--muted)">Works offline once opened. Sign in (top right) to keep progress and certificates on every device.</p></div></div>
  <div class="card"><h3>About this syllabus</h3><p>The units follow the standard first-year Business Economics (micro with an introduction to macro) course in B.Com. and B.Com. LL.B. programmes. Compare with TNNLU's own course outline when it is issued. For more reading on the same ideas, see the <a href="/finance-economics/">Finance &amp; Economics series</a> on this site.</p></div>
  ${footer()}`;
}};

/* ---------------- shared graph helpers ---------------- */
const GX=60, GY=20, GW=520, GH=300;   // plot box inside a 640 x 380 svg
const px=q=>GX+q/100*GW, py=p=>GY+GH-p/100*GH;
function axes(xl,yl){ return `<rect x="${GX}" y="${GY}" width="${GW}" height="${GH}" class="plotbg"/>
 ${[0,20,40,60,80,100].map(v=>`<line x1="${px(v)}" y1="${GY+GH}" x2="${px(v)}" y2="${GY+GH+5}" class="axis"/><text x="${px(v)}" y="${GY+GH+20}" text-anchor="middle" class="tick">${v}</text><line x1="${GX-5}" y1="${py(v)}" x2="${GX}" y2="${py(v)}" class="axis"/><text x="${GX-9}" y="${py(v)+5}" text-anchor="end" class="tick">${v}</text>`).join("")}
 <line x1="${GX}" y1="${GY+GH}" x2="${GX+GW}" y2="${GY+GH}" class="axis"/><line x1="${GX}" y1="${GY}" x2="${GX}" y2="${GY+GH}" class="axis"/>
 <text x="${GX+GW/2}" y="${GY+GH+42}" text-anchor="middle" class="lbl">${xl}</text><text x="18" y="${GY+GH/2}" text-anchor="middle" class="lbl" transform="rotate(-90 18 ${GY+GH/2})">${yl}</text>`; }

/* ---------------- UNIT 1 ---------------- */
VIEWS.u1 = { html(){ return unitHead(1)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">Wants are unlimited, resources are <b>scarce</b>, so every choice has an <b>opportunity cost</b>. In a market, buyers' <b>demand</b> and sellers' <b>supply</b> together set the price.</div>
 <h4>Micro and macro</h4><table class="t"><tr><th>Microeconomics</th><th>Macroeconomics</th></tr><tr><td>Individual consumers, firms, markets</td><td>The whole economy – national income, inflation, unemployment</td></tr><tr><td>Price of onions, a firm's output</td><td>GDP growth, the repo rate, the Budget</td></tr></table>
 <h4>Demand</h4><p><b>Law of demand</b>: other things equal, when price rises, quantity demanded falls. Reasons: substitution effect, income effect, diminishing marginal utility, new buyers at lower prices.</p>
 <p><b>Determinants (shift the curve)</b>: income, tastes, prices of substitutes and complements, expectations of future prices, population, credit availability, advertising.</p>
 <p><b>Exceptions</b>: Giffen goods, Veblen (status) goods, expectations of further price rises, necessities in emergencies.</p>
 <h4>Supply</h4><p><b>Law of supply</b>: other things equal, when price rises, quantity supplied rises. <b>Determinants</b>: input costs, technology, taxes and subsidies, number of sellers, weather, prices of other goods the firm could produce, expectations.</p>
 <h4>Equilibrium and price controls</h4><p>At the equilibrium price, quantity demanded equals quantity supplied. A <b>ceiling</b> below it (rent control, drug price control) causes shortages and black markets; a <b>floor</b> above it (minimum support price, minimum wages) causes surpluses. The law often intervenes on equity grounds – the economist asks what it costs.</p>
 <p style="font-size:14px">More on this site: <a href="/finance-economics/10-supply-demand.html">Supply and demand at three levels</a>.</p></div>
</div><div>
 <div class="card lab"><h3>Market lab: move the curves</h3>
  <svg viewBox="0 0 640 380" class="lg graph" id="sdSvg"></svg>
  <div class="row"><label>Demand level <input type="range" id="sdA" min="60" max="160" value="100"></label><label>Supply level <input type="range" id="sdB" min="-50" max="50" value="0"></label></div>
  <div class="row"><label><input type="checkbox" id="sdCtl"> Legal price</label><input type="range" id="sdPc" min="5" max="95" value="35"><span id="sdPcV"></span></div>
  <div class="row"><button class="btn sec sm" data-sd="mon">Monsoon fails</button><button class="btn sec sm" data-sd="fest">Festival season</button><button class="btn sec sm" data-sd="ceil">Rent control (ceiling)</button><button class="btn sec sm" data-sd="msp">MSP (floor)</button><button class="btn sec sm" data-sd="reset">Reset</button></div>
  <div id="sdOut"></div></div>
 <div class="card lab"><h3>Shift or movement?</h3><div id="lab1"></div></div>
</div></div>`+unitFoot(1)+footer(); },
 init(){
  const draw=()=>{
    const A=+$("#sdA").value, B=+$("#sdB").value, ctl=$("#sdCtl").checked, pc=+$("#sdPc").value;
    // Qd = A - P ; Qs = B + P   (P and Q both 0..100)
    const Pe=(A-B)/2, Qe=A-Pe;
    const line=(f,cls)=>{ const pts=[]; for(let p=0;p<=100;p+=1){ const q=f(p); if(q>=0&&q<=100) pts.push(`${px(q).toFixed(1)},${py(p).toFixed(1)}`);} return pts.length>1?`<polyline points="${pts.join(" ")}" class="${cls}"/>`:""; };
    let h=axes("Quantity (tonnes)","Price (Rs/kg)")+line(p=>A-p,"cD")+line(p=>B+p,"cS");
    h+=`<text x="${px(Math.min(98,Math.max(2,A-98)))}" y="${py(96)}" class="cDl">D</text><text x="${px(Math.min(98,Math.max(2,B+96)))}" y="${py(96)}" class="cSl" text-anchor="end">S</text>`;
    let msg="";
    if(Pe>=0&&Pe<=100&&Qe>=0&&Qe<=100){
      h+=`<line x1="${GX}" y1="${py(Pe)}" x2="${px(Qe)}" y2="${py(Pe)}" class="guide"/><line x1="${px(Qe)}" y1="${py(Pe)}" x2="${px(Qe)}" y2="${GY+GH}" class="guide"/><circle cx="${px(Qe)}" cy="${py(Pe)}" r="7" class="eq"/>`;
      msg=`<b>Equilibrium:</b> price Rs ${Pe.toFixed(0)}/kg, quantity ${Qe.toFixed(0)} tonnes.`;
    } else msg="Equilibrium is off the chart – move the sliders back.";
    $("#sdPcV").textContent = ctl?`Rs ${pc}`:"";
    if(ctl){
      const qd=Math.max(0,A-pc), qs=Math.max(0,B+pc);
      h+=`<line x1="${GX}" y1="${py(pc)}" x2="${GX+GW}" y2="${py(pc)}" class="ctl"/><text x="${GX+GW-4}" y="${py(pc)-8}" text-anchor="end" class="ctlt">legal price Rs ${pc}</text>`;
      if(Math.abs(qd-qs)>0.5) h+=`<line x1="${px(Math.min(qd,qs,100))}" y1="${py(pc)}" x2="${px(Math.min(Math.max(qd,qs),100))}" y2="${py(pc)}" class="gap"/>`;
      msg+= pc<Pe ? `<br><b>Ceiling below equilibrium →</b> buyers want ${qd.toFixed(0)}, sellers offer ${qs.toFixed(0)}: a <b>shortage of ${(qd-qs).toFixed(0)} tonnes</b>. Expect queues, rationing, black markets.`
          : pc>Pe ? `<br><b>Floor above equilibrium →</b> sellers offer ${qs.toFixed(0)}, buyers want ${qd.toFixed(0)}: a <b>surplus of ${(qs-qd).toFixed(0)} tonnes</b> the government may have to buy and store (as with MSP procurement).`
          : "<br>The legal price equals equilibrium – no effect.";
    }
    $("#sdSvg").innerHTML=h; $("#sdOut").innerHTML=`<div class="fb info">${msg}</div>`;
  };
  ["sdA","sdB","sdCtl","sdPc"].forEach(id=>$("#"+id).addEventListener("input",draw));
  $$("[data-sd]").forEach(b=>b.onclick=()=>{ const k=b.dataset.sd;
    const set={mon:[100,-30,false,35],fest:[130,0,false,35],ceil:[100,0,true,35],msp:[100,0,true,65],reset:[100,0,false,35]}[k];
    $("#sdA").value=set[0]; $("#sdB").value=set[1]; $("#sdCtl").checked=set[2]; $("#sdPc").value=set[3]; draw(); });
  draw();
  choiceLab("#lab1",[
   ["The price of petrol rises; people buy less petrol.","MOVE","Change in the good's own price → movement along the demand curve."],
   ["Incomes rise after a pay commission; more cars are bought at every price.","SR","Income up → demand shifts right."],
   ["The price of tea rises; demand for coffee increases.","SR","Substitute's price up → demand for coffee shifts right."],
   ["The price of printers rises; demand for ink cartridges falls.","SL","Complement's price up → demand shifts left."],
   ["A health report links a snack to disease; sales fall at every price.","SL","Tastes change → demand shifts left."]
  ],{MOVE:"Movement along the curve",SR:"Demand shifts right",SL:"Demand shifts left"});
  miniQuiz(1);
 }};

/* ---------------- UNIT 2 ---------------- */
VIEWS.u2 = { html(){ return unitHead(2)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key"><b>Elasticity</b> measures how strongly quantity demanded responds to a change in price, income or the price of another good. Price elasticity = <b>% change in quantity ÷ % change in price</b> (ignore the minus sign).</div>
 <table class="t"><tr><th>Value</th><th>Name</th><th>Example</th></tr>
 <tr><td>0</td><td>Perfectly inelastic</td><td>Life-saving insulin (nearly)</td></tr>
 <tr><td>Less than 1</td><td>Inelastic</td><td>Salt, petrol, electricity</td></tr>
 <tr><td>1</td><td>Unit elastic</td><td>Spending stays the same</td></tr>
 <tr><td>More than 1</td><td>Elastic</td><td>Restaurant meals, a particular brand</td></tr>
 <tr><td>∞</td><td>Perfectly elastic</td><td>A single farmer's wheat in a large market</td></tr></table>
 <h4>What makes demand elastic?</h4><ul><li>Close substitutes available</li><li>Luxury rather than necessity</li><li>Large share of the budget</li><li>Longer time to adjust</li><li>Narrowly defined product (one brand rather than 'food')</li></ul>
 <h4>Total revenue test</h4><table class="t"><tr><th></th><th>Price cut</th><th>Price rise</th></tr><tr><td>Elastic</td><td>Revenue ↑</td><td>Revenue ↓</td></tr><tr><td>Inelastic</td><td>Revenue ↓</td><td>Revenue ↑</td></tr><tr><td>Unit</td><td>No change</td><td>No change</td></tr></table>
 <h4>Income and cross elasticity</h4><p><b>Income elasticity</b>: negative = inferior good; 0–1 = necessity; above 1 = luxury. <b>Cross elasticity</b>: positive = substitutes; negative = complements; zero = unrelated.</p>
 <h4>Uses</h4><p>Pricing decisions, forecasting, and <b>tax incidence</b>: the less elastic side of the market bears more of a tax. That is why governments tax fuel, tobacco and alcohol heavily – revenue is reliable because demand is inelastic.</p></div>
</div><div>
 <div class="card lab"><h3>Elasticity calculator (midpoint method)</h3>
  <div class="row"><label>Old price <input type="text" id="elP1" value="40" style="width:70px"></label><label>New price <input type="text" id="elP2" value="50" style="width:70px"></label></div>
  <div class="row" style="margin-top:6px"><label>Old quantity <input type="text" id="elQ1" value="1000" style="width:80px"></label><label>New quantity <input type="text" id="elQ2" value="700" style="width:80px"></label><button class="btn" id="elGo">Calculate</button></div>
  <div id="elOut"></div></div>
 <div class="card lab"><h3>Substitutes, complements or inferior?</h3><div id="lab2"></div></div>
</div></div>`+unitFoot(2)+footer(); },
 init(){
  const n=id=>+$("#"+id).value||0;
  $("#elGo").onclick=()=>{
    const P1=n("elP1"),P2=n("elP2"),Q1=n("elQ1"),Q2=n("elQ2");
    if(P1===P2||!(P1+P2)||!(Q1+Q2)){ $("#elOut").innerHTML=`<div class="fb bad">Enter two different prices.</div>`; return; }
    const dq=(Q2-Q1)/((Q1+Q2)/2), dp=(P2-P1)/((P1+P2)/2), e=Math.abs(dq/dp);
    const kind=e<0.01?"perfectly inelastic":e<0.97?"inelastic":e<=1.03?"unit elastic":"elastic";
    const tr1=P1*Q1, tr2=P2*Q2;
    $("#elOut").innerHTML=`<div class="fb info">% change in quantity = ${(dq*100).toFixed(1)}%; % change in price = ${(dp*100).toFixed(1)}%.<br><b>Elasticity = ${e.toFixed(2)} → ${kind}.</b><br>Total revenue: ${tr1.toLocaleString("en-IN")} → ${tr2.toLocaleString("en-IN")} (${tr2>tr1?"up":tr2<tr1?"down":"unchanged"}). ${e>1.03?"Elastic: price and revenue move in opposite directions.":e<0.97?"Inelastic: price and revenue move together.":"Unit elastic: revenue hardly changes."}</div>`;
  };
  $("#elGo").click();
  choiceLab("#lab2",[
   ["When the price of tea rises 10%, coffee sales rise 6%.","SUB","Positive cross elasticity (+0.6)."],
   ["When petrol prices rise, sales of large cars fall.","COM","Negative cross elasticity – used together."],
   ["As incomes rise, families buy less coarse grain and more rice and wheat.","INF","Negative income elasticity – inferior good."],
   ["As incomes rise 10%, spending on foreign holidays rises 25%.","LUX","Income elasticity 2.5 – a luxury."],
   ["Mobile phones and SIM cards.","COM","Complements."],
   ["Two brands of bathing soap.","SUB","Close substitutes – high cross elasticity."]
  ],{SUB:"Substitutes",COM:"Complements",INF:"Inferior good",LUX:"Luxury good"});
  miniQuiz(2);
 }};

/* ---------------- UNIT 3 ---------------- */
const MU_T=[30,26,22,18,14,10,6,2], MU_S=[60,50,40,30,20,12,6,0], PT=10, PS=20, BUD=100;
VIEWS.u3 = { html(){ return unitHead(3)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">Consumers try to get the most <b>satisfaction (utility)</b> from a limited income. Because each extra unit gives less extra satisfaction (<b>diminishing marginal utility</b>), the best plan spends so that the <b>last rupee on each good gives the same utility</b>.</div>
 <h4>Cardinal approach (Marshall)</h4><ul><li><b>Total utility</b> rises while marginal utility is positive; is maximum where MU = 0.</li><li><b>Law of diminishing MU</b> – the fifth samosa is less enjoyable than the first.</li><li><b>Equi-marginal principle</b>: MUx/Px = MUy/Py = MU of money.</li><li>It explains the downward-sloping demand curve and the <b>diamond–water paradox</b>: water has high total but low marginal utility.</li></ul>
 <h4>Ordinal approach (Hicks and Allen)</h4><p>Utility need only be ranked. An <b>indifference curve</b> shows bundles giving equal satisfaction; higher curves are preferred; curves are convex because the <b>marginal rate of substitution</b> diminishes; they never cross.</p>
 <p>The <b>budget line</b> shows what the consumer can afford: Px·X + Py·Y = M. Equilibrium is where the budget line just touches the highest indifference curve: <b>MRS = Px/Py</b>.</p>
 <h4>Price effect = substitution effect + income effect</h4><p>When price falls, the good becomes relatively cheaper (substitution effect) and the consumer is effectively richer (income effect). For a Giffen good the income effect is negative and stronger.</p>
 <h4>Consumer surplus</h4><p>The difference between what you would be willing to pay and what you pay. Useful to judge the welfare effects of taxes, subsidies and price controls.</p></div>
</div><div>
 <div class="card lab"><h3>Spend Rs 100 wisely</h3><p>Tea costs Rs ${PT} a cup, samosas Rs ${PS} each. Choose how many of each to get the highest total utility within Rs ${BUD}.</p>
  <table class="t" id="muTab"></table>
  <div class="row" style="margin-top:8px"><b style="min-width:90px">☕ Tea</b><button class="btn sm sec" data-mu="t-">−</button><span id="muT" style="min-width:24px;text-align:center"></span><button class="btn sm sec" data-mu="t+">+</button>
  <b style="min-width:90px;margin-left:14px">🥟 Samosa</b><button class="btn sm sec" data-mu="s-">−</button><span id="muS" style="min-width:24px;text-align:center"></span><button class="btn sm sec" data-mu="s+">+</button></div>
  <div class="row" style="margin-top:6px"><button class="btn" id="muChk">Is this the best?</button></div><div id="muOut"></div></div>
 <div class="card lab"><h3>Which concept?</h3><div id="lab3"></div></div>
</div></div>`+unitFoot(3)+footer(); },
 init(){
  let t=2, s=1;
  const TU=(arr,n)=>arr.slice(0,n).reduce((a,b)=>a+b,0);
  const show=()=>{
    $("#muT").textContent=t; $("#muS").textContent=s;
    $("#muTab").innerHTML=`<tr><th>Unit</th>${MU_T.map((_,i)=>`<th>${i+1}</th>`).join("")}</tr>
     <tr><td>MU tea</td>${MU_T.map((m,i)=>`<td style="${i<t?"background:var(--hl);font-weight:700":""}">${m}</td>`).join("")}</tr>
     <tr><td>MU samosa</td>${MU_S.map((m,i)=>`<td style="${i<s?"background:var(--hl);font-weight:700":""}">${m}</td>`).join("")}</tr>`;
    const spent=t*PT+s*PS;
    $("#muOut").innerHTML=`<div class="fb ${spent>BUD?"bad":"info"}">Spent Rs ${spent} of ${BUD} · Total utility ${TU(MU_T,t)+TU(MU_S,s)} utils${t?` · last cup MU/P = ${(MU_T[t-1]/PT).toFixed(1)}`:""}${s?` · last samosa MU/P = ${(MU_S[s-1]/PS).toFixed(1)}`:""}${spent>BUD?"<br>✖ Over budget!":""}</div>`;
  };
  $$("[data-mu]").forEach(b=>b.onclick=()=>{ const k=b.dataset.mu; if(k==="t+"&&t<8)t++; if(k==="t-"&&t>0)t--; if(k==="s+"&&s<8)s++; if(k==="s-"&&s>0)s--; show(); });
  $("#muChk").onclick=()=>{
    let best={u:-1};
    for(let a=0;a<=8;a++) for(let b=0;b<=8;b++) if(a*PT+b*PS<=BUD){ const u=TU(MU_T,a)+TU(MU_S,b); if(u>best.u) best={u,a,b}; }
    const mine=t*PT+s*PS<=BUD ? TU(MU_T,t)+TU(MU_S,s) : -1;
    $("#muOut").innerHTML += mine===best.u ? `<div class="fb ok">✔ Best possible: ${best.u} utils. At the margin MU per rupee is about equal – ${(MU_T[t-1]/PT).toFixed(1)} for tea and ${(MU_S[s-1]/PS).toFixed(1)} for samosas. That is the equi-marginal principle.</div>`
      : `<div class="fb bad">✖ Not yet. The best is ${best.a} cups of tea and ${best.b} samosas, for ${best.u} utils. Hint: move a rupee from the good whose last unit gives less MU per rupee.</div>`;
  };
  show();
  choiceLab("#lab3",[
   ["The first glass of water on a hot day is wonderful; the fourth hardly matters.","DMU","Diminishing marginal utility."],
   ["You would have paid Rs 500 for a concert ticket but bought it for Rs 300.","CS","Consumer surplus of Rs 200."],
   ["You are equally happy with 2 pizzas and 4 burgers, or 3 pizzas and 2 burgers.","IC","Points on one indifference curve."],
   ["Water is essential but cheap; diamonds are inessential but costly.","PAR","The diamond–water paradox: price reflects marginal, not total, utility."]
  ],{DMU:"Diminishing MU",CS:"Consumer surplus",IC:"Indifference curve",PAR:"Value paradox"});
  miniQuiz(3);
 }};

/* ---------------- UNIT 4 ---------------- */
const TPv=[0,10,24,39,52,61,66,68,68,66,62];
const LVP_SVG=(()=>{ const X=l=>60+l*52, Y=v=>320-v*3.6;
  const ap=TPv.map((v,l)=>l?v/l:null), mp=TPv.map((v,l)=>l?v-TPv[l-1]:null);
  const poly=(arr,sc,cls,id)=>`<polyline id="${id}" class="${cls} fade" points="${arr.map((v,l)=>v==null?null:`${X(l)},${sc(v)}`).filter(Boolean).join(" ")}"/>`;
  const Ym=v=>200-v*8;   // MP/AP scale
  return `<svg viewBox="0 0 640 360" class="lg graph" role="img" aria-label="Law of variable proportions">
  <rect id="st1" x="${X(0)}" y="10" width="${X(4)-X(0)}" height="310" class="stg1 fade"/><rect id="st2" x="${X(4)}" y="10" width="${X(8)-X(4)}" height="310" class="stg2 fade"/><rect id="st3" x="${X(8)}" y="10" width="${X(10)-X(8)}" height="310" class="stg3 fade"/>
  <text id="st1t" x="${(X(0)+X(4))/2}" y="30" text-anchor="middle" class="wl fade">Stage I</text><text id="st2t" x="${(X(4)+X(8))/2}" y="30" text-anchor="middle" class="wl fade">Stage II – rational</text><text id="st3t" x="${(X(8)+X(10))/2}" y="30" text-anchor="middle" class="wl fade">Stage III</text>
  <line x1="60" y1="320" x2="590" y2="320" class="axis"/><line x1="60" y1="10" x2="60" y2="320" class="axis"/><line x1="60" y1="${Ym(0)}" x2="590" y2="${Ym(0)}" class="guide"/>
  ${TPv.map((_,l)=>`<text x="${X(l)}" y="340" text-anchor="middle" class="tick">${l}</text>`).join("")}<text x="330" y="358" text-anchor="middle" class="tick">workers on a fixed plot</text>
  ${poly(TPv,Y,"cTP","lTP")}${poly(ap,Ym,"cAP","lAP")}${poly(mp,Ym,"cMP","lMP")}
  <text id="tTP" x="${X(10)+4}" y="${Y(62)}" class="cTPl fade">TP</text><text id="tAP" x="${X(10)+4}" y="${Ym(6.2)}" class="cAPl fade">AP</text><text id="tMP" x="${X(10)+4}" y="${Ym(-4)+4}" class="cMPl fade">MP</text>
  </svg>`; })();
const LVP_STEPS=[
 "A farmer has a <b>fixed plot</b> of land and adds workers one at a time. The <b>total product (TP)</b> curve shows the harvest: it rises quickly, then slowly, then falls.",
 "<b>Marginal product (MP)</b> – the extra output from one more worker – rises at first (specialisation), then falls: <b>diminishing returns</b> set in after the 3rd worker.",
 "<b>Average product (AP)</b> = TP ÷ workers. MP pulls AP up while MP > AP, and down when MP < AP, so MP cuts AP at AP's maximum.",
 "<b>Stage I</b> (up to the AP maximum): each worker raises average output – the fixed land is under-used. No sensible farmer stops here.",
 "<b>Stage II</b> (AP max to MP = 0): MP is falling but positive. A rational producer operates here – exactly where depends on wages and the crop price.",
 "<b>Stage III</b> (MP negative): workers get in each other's way and TP falls. Never produce here – fewer workers would give more output."
];
VIEWS.u4 = { html(){ return unitHead(4)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">A <b>production function</b> links inputs (land, labour, capital, enterprise) to output. In the <b>short run</b> some inputs are fixed and diminishing returns appear; in the <b>long run</b> all inputs vary and we speak of <b>returns to scale</b>. Costs mirror production: when productivity falls, cost per unit rises.</div>
 <h4>Returns to scale (long run)</h4><table class="t"><tr><th>Type</th><th>Inputs ×2 → output</th><th>Why</th></tr><tr><td>Increasing</td><td>More than ×2</td><td>Specialisation, bulk buying, indivisible machines</td></tr><tr><td>Constant</td><td>×2</td><td>Economies balance diseconomies</td></tr><tr><td>Decreasing</td><td>Less than ×2</td><td>Management problems, coordination</td></tr></table>
 <p><b>Economies of scale</b>: internal (technical, managerial, marketing, financial, risk-bearing) and external (industry clusters – Tiruppur knitwear, Sivakasi printing).</p>
 <h4>Cost concepts</h4><table class="t"><tr><th>Concept</th><th>Formula</th></tr>
 <tr><td>Total cost</td><td>TC = TFC + TVC</td></tr><tr><td>Average cost</td><td>AC = TC ÷ Q = AFC + AVC</td></tr><tr><td>Marginal cost</td><td>MC = ΔTC ÷ ΔQ</td></tr>
 <tr><td>Opportunity / explicit / implicit</td><td>Economic cost includes implicit costs such as the owner's own time and capital</td></tr>
 <tr><td>Sunk cost</td><td>Already spent and unrecoverable – ignore it in decisions</td></tr></table>
 <p>Short-run AC, AVC and MC are <b>U-shaped</b>; MC cuts AVC and AC at their minimum points. AFC keeps falling. The long-run AC is an <b>envelope</b> of short-run curves.</p>
 <h4>Revenue and break-even</h4><p>TR = P × Q; AR = TR ÷ Q = price; MR = ΔTR ÷ ΔQ. <b>Break-even output = TFC ÷ (P − AVC)</b>; the gap P − AVC is the <b>contribution</b> per unit.</p>
 <p style="font-size:14px">More on this site: <a href="/business-admin/41-cost-concepts.html">Cost concepts</a> · <a href="/business-admin/42-break-even.html">Break-even</a>.</p></div>
</div><div>
 ${animBox("lvpAnim","The law of variable proportions",LVP_SVG)}
 <div class="card lab"><h3>Cost curves and best output</h3>
  <div class="row"><label>Fixed cost (Rs '000) <input type="text" id="ccF" value="100" style="width:70px"></label><label>Market price (Rs '000 per unit) <input type="text" id="ccP" value="40" style="width:70px"></label><button class="btn" id="ccGo">Draw</button></div>
  <svg viewBox="0 0 640 330" class="lg graph" id="ccSvg"></svg><div id="ccOut"></div>
  <p style="font-size:13px;color:var(--muted)">Variable cost follows TVC = 40Q − 6Q² + 0.5Q³ (Rs '000), a typical short-run shape.</p></div>
</div></div>`+unitFoot(4)+footer(); },
 init(){
  anim = makeAnim("#lvpAnim", LVP_STEPS, i=>{
    const on=(id,c)=>document.getElementById(id).classList.toggle("show",c);
    on("lTP",i>=0); on("tTP",i>=0); on("lMP",i>=1); on("tMP",i>=1); on("lAP",i>=2); on("tAP",i>=2);
    on("st1",i>=3); on("st1t",i>=3); on("st2",i>=4); on("st2t",i>=4); on("st3",i>=5); on("st3t",i>=5);
  });
  const draw=()=>{
    const F=+$("#ccF").value||0, P=+$("#ccP").value||0;
    const tvc=q=>40*q-6*q*q+0.5*q*q*q, rows=[];
    for(let q=1;q<=12;q++){ const v=tvc(q); rows.push({q, tc:F+v, ac:(F+v)/q, avc:v/q, mc:v-tvc(q-1)}); }
    const X=q=>60+q*43, Y=v=>290-v*2.6, cl=v=>Math.max(10,Y(Math.min(v,108)));
    const pl=(k,cls)=>`<polyline class="${cls}" points="${rows.map(r=>`${X(r.q)},${cl(r[k])}`).join(" ")}"/>`;
    // best q: P = MC rising, P >= AVC
    let best=null; rows.forEach(r=>{ if(r.q>=4 && r.mc<=P) best=r; });
    let h=`<line x1="60" y1="290" x2="610" y2="290" class="axis"/><line x1="60" y1="10" x2="60" y2="290" class="axis"/>${rows.map(r=>`<text x="${X(r.q)}" y="308" text-anchor="middle" class="tick">${r.q}</text>`).join("")}
     ${[0,25,50,75,100].map(v=>`<text x="52" y="${Y(v)+5}" text-anchor="end" class="tick">${v}</text>`).join("")}
     ${pl("ac","cAC")}${pl("avc","cAVC")}${pl("mc","cMC")}
     <line x1="60" y1="${Y(P)}" x2="610" y2="${Y(P)}" class="ctl"/><text x="66" y="${Y(P)-6}" class="ctlt">price = MR</text>
     <text x="${X(12)+4}" y="${cl(rows[11].ac)}" class="cACl">AC</text><text x="${X(12)+4}" y="${cl(rows[11].avc)+14}" class="cAVCl">AVC</text><text x="${X(9)}" y="20" class="cMCl">MC</text><text x="330" y="326" text-anchor="middle" class="tick">output (units)</text>`;
    $("#ccSvg").innerHTML=h;
    const minAVC=Math.min(...rows.map(r=>r.avc));
    let msg;
    if(!best || P<minAVC) msg=`Price Rs ${P}k is below the minimum AVC (about Rs ${minAVC.toFixed(1)}k): <b>shut down</b> in the short run – you would lose more than the fixed cost by producing.`;
    else { const pr=P*best.q-best.tc; msg=`Produce <b>${best.q} units</b>, where price meets the rising MC. Revenue ${(P*best.q).toFixed(0)}k, total cost ${best.tc.toFixed(0)}k → <b>${pr>=0?"profit":"loss"} of Rs ${Math.abs(pr).toFixed(0)}k</b>.${pr<0?" A loss, but smaller than the fixed cost – so keep producing in the short run.":""}`; }
    $("#ccOut").innerHTML=`<div class="fb info">${msg}</div>`;
  };
  $("#ccGo").onclick=draw; draw();
  miniQuiz(4);
 }};

/* ---------------- UNIT 5 ---------------- */
VIEWS.u5 = { html(){ return unitHead(5)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">How a firm sets price and output depends on the <b>market structure</b>: how many sellers, how similar the products, and how easy it is to enter. Every firm maximises profit where <b>MR = MC</b>; what differs is the shape of the demand it faces.</div>
 <table class="t"><tr><th></th><th>Perfect competition</th><th>Monopolistic competition</th><th>Oligopoly</th><th>Monopoly</th></tr>
 <tr><td>Sellers</td><td>Very many</td><td>Many</td><td>Few</td><td>One</td></tr>
 <tr><td>Product</td><td>Identical</td><td>Differentiated</td><td>Same or differentiated</td><td>Unique</td></tr>
 <tr><td>Entry</td><td>Free</td><td>Fairly easy</td><td>Difficult</td><td>Blocked</td></tr>
 <tr><td>Price control</td><td>None – price taker</td><td>Some</td><td>Interdependent</td><td>Considerable</td></tr>
 <tr><td>Long-run profit</td><td>Normal only</td><td>Normal only</td><td>Can be supernormal</td><td>Supernormal</td></tr>
 <tr><td>Example</td><td>Vegetable mandi</td><td>Restaurants, soaps</td><td>Cement, telecom, airlines</td><td>Railways (largely), local water supply</td></tr></table>
 <h4>Price discrimination</h4><p>Charging different prices for the same product to different buyers – student fares, Tatkal tickets, peak power tariffs. Possible when markets can be separated, elasticities differ and resale is impossible.</p>
 <h4>Oligopoly and game theory</h4><p>Each firm must guess its rivals' reactions. The <b>kinked demand curve</b> explains sticky prices. Firms are tempted to form <b>cartels</b> – but each also gains by cheating, which is the <b>prisoner's dilemma</b>.</p>
 <h4>Competition Act, 2002</h4><ul><li><b>Section 3</b> – anti-competitive agreements; cartels presumed to harm competition.</li><li><b>Section 4</b> – abuse of dominant position.</li><li><b>Sections 5–6</b> – combinations (mergers) above thresholds need approval.</li><li>Enforced by the <b>Competition Commission of India</b>; appeals to the NCLAT. In 2016 the CCI fined cement companies over Rs 6,000 crore for cartelisation.</li></ul></div>
</div><div>
 <div class="card lab"><h3>Pricing game: you vs a rival cement firm</h3><p>Each round, both firms choose a high or low price at the same time. Profits (Rs crore):</p>
  <table class="t"><tr><th></th><th>Rival high</th><th>Rival low</th></tr><tr><td><b>You high</b></td><td>10, 10</td><td>2, 14</td></tr><tr><td><b>You low</b></td><td>14, 2</td><td>5, 5</td></tr></table>
  <div class="row"><button class="btn" data-pd="H">Price high</button><button class="btn" data-pd="L">Price low</button><button class="btn sec sm" id="pdNew">New game</button></div><div id="pdOut"></div></div>
 <div class="card lab"><h3>Which market structure?</h3><div id="lab5"></div></div>
</div></div>`+unitFoot(5)+footer(); },
 init(){
  const PAY={HH:[10,10],HL:[2,14],LH:[14,2],LL:[5,5]};
  let round=0, me=0, them=0, last="H", log=[];
  const render=(end)=>{ $("#pdOut").innerHTML=`<div class="fb info">${log.map(x=>`<div>${x}</div>`).join("")}<b>After ${round} of 6 rounds: you ${me}, rival ${them}.</b>${end?`<br>${me>=50?"You kept prices high together – the joint best, but that is exactly what a cartel does, and s.3 of the Competition Act forbids agreeing it.":"Cutting price wins one round, but the rival copies you (tit-for-tat) and both end up worse off – the prisoner's dilemma."} The rival simply repeated your last move.`:""}</div>`; };
  const play=m=>{ if(round>=6) return; const r=last; const p=PAY[m+r]; me+=p[0]; them+=p[1]; round++; log.push(`Round ${round}: you ${m==="H"?"high":"low"}, rival ${r==="H"?"high":"low"} → ${p[0]} : ${p[1]}`); last=m; render(round>=6); };
  $$("[data-pd]").forEach(b=>b.onclick=()=>play(b.dataset.pd));
  $("#pdNew").onclick=()=>{ round=0; me=0; them=0; last="H"; log=[]; render(false); };
  render(false);
  choiceLab("#lab5",[
   ["Hundreds of farmers sell identical tomatoes at the wholesale mandi.","PC","Perfect competition (close to it)."],
   ["Three telecom companies serve most mobile users and watch each other's tariffs.","OL","Oligopoly – interdependence."],
   ["A city has hundreds of restaurants, each with its own menu and style.","MC","Monopolistic competition."],
   ["A single company holds the only licence to supply piped water in a town.","MO","Monopoly – a legal barrier to entry."],
   ["Cement makers meet and agree on prices for the coming quarter.","CA","A cartel – anti-competitive under s.3 of the Competition Act."]
  ],{PC:"Perfect competition",MC:"Monopolistic competition",OL:"Oligopoly",MO:"Monopoly",CA:"Cartel (illegal)"});
  miniQuiz(5);
 }};

/* ---------------- UNIT 6 ---------------- */
const CF_SVG=`<svg viewBox="0 0 640 400" class="lg" role="img" aria-label="Circular flow of income">
<defs><marker id="cf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
<g class="node"><rect x="20" y="150" width="160" height="70" rx="12"/><text x="100" y="192" text-anchor="middle">Households</text></g>
<g class="node"><rect x="460" y="150" width="160" height="70" rx="12"/><text x="540" y="192" text-anchor="middle">Firms</text></g>
<g id="c0" class="fade"><path d="M110 148 C 160 60, 480 60, 530 148" class="edge hi" marker-end="url(#cf)" style="color:var(--accent)"/><text x="320" y="78" text-anchor="middle" class="lbl">land, labour, capital →</text></g>
<g id="c1" class="fade"><path d="M520 146 C 470 88, 170 88, 120 146" class="edge" marker-end="url(#cf)" style="color:var(--info);stroke:var(--info)"/><text x="320" y="112" text-anchor="middle" class="lbl">← rent, wages, interest, profit</text></g>
<g id="c2" class="fade"><path d="M530 222 C 480 310, 160 310, 110 222" class="edge hi" marker-end="url(#cf)" style="color:var(--accent)"/><text x="320" y="318" text-anchor="middle" class="lbl">← goods and services</text></g>
<g id="c3" class="fade"><path d="M120 224 C 170 280, 470 280, 520 224" class="edge" marker-end="url(#cf)" style="color:var(--info);stroke:var(--info)"/><text x="320" y="268" text-anchor="middle" class="lbl">consumer spending →</text></g>
<g id="c4" class="fade node"><rect x="230" y="160" width="180" height="50" rx="10"/><text x="320" y="190" text-anchor="middle" style="font-size:16px">Banks · Govt · Abroad</text></g>
<g id="c5" class="fade"><text x="320" y="360" text-anchor="middle" class="big">Leakages: S + T + M   ·   Injections: I + G + X</text></g>
<g id="c6" class="fade"><text x="320" y="390" text-anchor="middle" class="lbl">Income = output = spending → GDP three ways</text></g>
</svg>`;
const CF_STEPS=[
 "<b>Households</b> own the factors of production – land, labour, capital, enterprise – and sell their services to <b>firms</b>.",
 "Firms pay for them: <b>rent, wages, interest and profit</b>. This is the <b>income</b> of households – the income method of measuring GDP.",
 "Firms use the factors to produce <b>goods and services</b> – the output (product or value-added method).",
 "Households spend their income buying that output – the <b>expenditure</b> method. In this simple economy income = output = spending.",
 "Real economies have <b>banks</b> (saving and investment), the <b>government</b> (taxes and public spending) and the <b>rest of the world</b> (imports and exports).",
 "Saving, taxes and imports <b>leak</b> out of the flow; investment, government spending and exports are <b>injections</b>. If injections exceed leakages, national income grows.",
 "Hence GDP = C + I + G + (X − M). The NSO (MoSPI) publishes India's GDP estimates every quarter."
];
VIEWS.u6 = { html(){ return unitHead(6)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">Factors of production are paid <b>rent, wages, interest and profit</b>. Added up across the country, these payments are the <b>national income</b>. Macroeconomics studies its size, growth and stability – and how the RBI and the government steer it.</div>
 <h4>Factor pricing in brief</h4><table class="t"><tr><th>Factor</th><th>Reward</th><th>Theory</th></tr>
 <tr><td>Land</td><td>Rent</td><td>Ricardo: differential rent from fertility and location; quasi-rent for short-run fixed factors</td></tr>
 <tr><td>Labour</td><td>Wages</td><td>Marginal productivity theory; bargaining and minimum wage laws (Code on Wages, 2019)</td></tr>
 <tr><td>Capital</td><td>Interest</td><td>Loanable funds; Keynes's liquidity preference</td></tr>
 <tr><td>Enterprise</td><td>Profit</td><td>Reward for risk and uncertainty (Knight) and innovation (Schumpeter)</td></tr></table>
 <h4>National income</h4><ul><li><b>GDP</b> – market value of final goods and services produced within the country.</li><li><b>GNP</b> = GDP + net factor income from abroad.</li><li><b>NNP</b> = GNP − depreciation; <b>national income</b> = NNP at factor cost.</li><li>Real vs nominal: real GDP removes the effect of price changes.</li><li>Excluded: intermediate goods, second-hand sales, transfer payments, purely financial transactions, unpaid household work.</li></ul>
 <h4>Inflation</h4><p>A sustained rise in the general price level, measured by the <b>Consumer Price Index</b> (also WPI). Causes: demand-pull (too much spending) and cost-push (oil, wages, supply shocks). Effects: hurts fixed-income earners and savers, helps borrowers, creates uncertainty.</p>
 <h4>Monetary policy (RBI)</h4><p>Under s.45ZA of the RBI Act, 1934, the government sets an inflation target – <b>4% CPI with a band of 2–6%</b>, reviewed every five years. The six-member <b>Monetary Policy Committee</b> sets the <b>repo rate</b>. Other tools: CRR, SLR, open market operations. Higher rates cool demand and inflation.</p>
 <h4>Fiscal policy (Government)</h4><p>Taxes, spending and borrowing through the annual <b>Union Budget</b> (Art. 112). The <b>fiscal deficit</b> is total expenditure minus receipts other than borrowing; the FRBM Act, 2003 sets targets to keep it in check.</p>
 <p style="font-size:14px">More on this site: <a href="/finance-economics/01-inflation.html">Inflation</a> · <a href="/finance-economics/02-interest-rates.html">Interest rates</a> · <a href="/finance-economics/03-gdp.html">GDP</a> · <a href="/finance-economics/08-budgets-deficits.html">Budgets and deficits</a>.</p></div>
</div><div>
 ${animBox("cfAnim","The circular flow of income",CF_SVG)}
 <div class="card lab"><h3>Counted in GDP?</h3><div id="lab6"></div></div>
 <div class="card lab"><h3>Inflation or deflation tool?</h3><div id="lab6b"></div></div>
</div></div>`+unitFoot(6)+footer(); },
 init(){
  anim = makeAnim("#cfAnim", CF_STEPS, i=>{ for(let k=0;k<7;k++) document.getElementById("c"+k).classList.toggle("show",k<=i); });
  choiceLab("#lab6",[
   ["A new flat built and sold this year.","Y","Final good produced this year (investment)."],
   ["Your old scooter sold to a friend.","N","Second-hand sale – counted when first produced."],
   ["Old-age pension paid by the government.","N","A transfer payment – no goods or services produced in return."],
   ["Steel bought by a car maker to build cars.","N","Intermediate good – counted within the value of the cars."],
   ["A lawyer's fee for drafting a contract.","Y","A final service."],
   ["Buying shares of a company on the stock exchange.","N","A financial transaction, not production (the broker's commission is counted)."],
   ["Cars exported to Africa.","Y","Production within India – added as exports (X)."]
  ],{Y:"Counted",N:"Not counted"});
  choiceLab("#lab6b",[
   ["The RBI raises the repo rate.","TIGHT","Costlier loans reduce spending – used against inflation."],
   ["The government cuts income tax and raises spending on roads.","EASY","Expansionary fiscal policy – boosts demand."],
   ["The RBI raises the cash reserve ratio.","TIGHT","Banks have less to lend."],
   ["The RBI buys government bonds in the open market.","EASY","Injects money into the banking system."]
  ],{TIGHT:"Contractionary (fights inflation)",EASY:"Expansionary (boosts demand)"});
  miniQuiz(6);
 }};

/* ---------------- FORMULA SHEET ---------------- */
VIEWS.formulas = { html(){ return `<div class="unitban"><div class="k">Revise</div><h2>Formula sheet</h2><p>Every formula in the course on one page. Print it (Ctrl+P) for exam revision.</p></div>
 <div class="two"><div class="card"><h3>Demand and elasticity</h3><table class="t">
 <tr><td>Price elasticity</td><td>Ep = (ΔQ/Q) ÷ (ΔP/P)</td></tr>
 <tr><td>Midpoint (arc) method</td><td>[(Q2−Q1)/((Q1+Q2)/2)] ÷ [(P2−P1)/((P1+P2)/2)]</td></tr>
 <tr><td>Point elasticity</td><td>(dQ/dP) × (P/Q)</td></tr>
 <tr><td>Income elasticity</td><td>%ΔQ ÷ %ΔIncome</td></tr>
 <tr><td>Cross elasticity</td><td>%ΔQx ÷ %ΔPy</td></tr>
 <tr><td>Linear demand</td><td>Qd = a − bP; Qs = c + dP; equilibrium P* = (a − c)/(b + d)</td></tr></table>
 <h3 style="margin-top:14px">Consumer</h3><table class="t">
 <tr><td>Marginal utility</td><td>MU = ΔTU / ΔQ</td></tr>
 <tr><td>Equi-marginal rule</td><td>MUx/Px = MUy/Py</td></tr>
 <tr><td>Budget line</td><td>Px·X + Py·Y = M</td></tr>
 <tr><td>Consumer equilibrium (IC)</td><td>MRSxy = Px/Py</td></tr></table></div>
 <div class="card"><h3>Production, cost and revenue</h3><table class="t">
 <tr><td>Average product</td><td>AP = TP / L</td></tr><tr><td>Marginal product</td><td>MP = ΔTP / ΔL</td></tr>
 <tr><td>Total cost</td><td>TC = TFC + TVC</td></tr><tr><td>Average cost</td><td>AC = TC/Q = AFC + AVC</td></tr>
 <tr><td>Marginal cost</td><td>MC = ΔTC / ΔQ</td></tr><tr><td>Total revenue</td><td>TR = P × Q</td></tr>
 <tr><td>Profit maximum</td><td>MR = MC, MC rising</td></tr><tr><td>Shut-down point</td><td>P &lt; minimum AVC</td></tr>
 <tr><td>Break-even output</td><td>TFC ÷ (P − AVC)</td></tr><tr><td>MR and elasticity</td><td>MR = P (1 − 1/Ep)</td></tr></table>
 <h3 style="margin-top:14px">Macro</h3><table class="t">
 <tr><td>GDP (expenditure)</td><td>C + I + G + (X − M)</td></tr><tr><td>GNP</td><td>GDP + net factor income from abroad</td></tr>
 <tr><td>NNP</td><td>GNP − depreciation</td></tr><tr><td>Real GDP</td><td>Nominal GDP ÷ price index × 100</td></tr>
 <tr><td>Inflation rate</td><td>(CPI now − CPI a year ago) ÷ CPI a year ago × 100</td></tr>
 <tr><td>Fiscal deficit</td><td>Total expenditure − (revenue receipts + non-debt capital receipts)</td></tr></table></div></div>`+footer(); }};

/* ---------------- REFERENCES ---------------- */
VIEWS.refs = { html(){ return `<div class="unitban"><div class="k">Read further</div><h2>References</h2><p>Books are in the TNNLU library; online sources need internet.</p></div>
 <div class="two"><div class="card"><h3>Books</h3><table class="t"><tr><th>Book</th><th>Use it for</th></tr>
 <tr><td>H.L. Ahuja, <i>Business Economics</i>, S. Chand</td><td>The standard Indian B.Com. textbook</td></tr>
 <tr><td>D.N. Dwivedi, <i>Managerial Economics</i>, Vikas</td><td>Business applications, demand forecasting, pricing</td></tr>
 <tr><td>N. Gregory Mankiw, <i>Principles of Economics</i>, Cengage</td><td>Clear, example-led introduction</td></tr>
 <tr><td>Paul Samuelson and William Nordhaus, <i>Economics</i>, McGraw-Hill</td><td>Classic all-round text</td></tr>
 <tr><td>A. Koutsoyiannis, <i>Modern Microeconomics</i>, Macmillan</td><td>Market structures and theory in depth</td></tr>
 <tr><td>Richard Posner, <i>Economic Analysis of Law</i>, Wolters Kluwer</td><td>How economics is used in legal reasoning</td></tr></table></div>
 <div><div class="card"><h3>Indian law and policy links</h3><ul>
 <li>Competition Act, 2002 – ss.3, 4, 5–6</li><li>Reserve Bank of India Act, 1934 – s.45ZA–45ZO (Monetary Policy Committee)</li>
 <li>Fiscal Responsibility and Budget Management Act, 2003</li><li>Essential Commodities Act, 1955; Drugs (Prices Control) Order, 2013</li>
 <li>Code on Wages, 2019</li><li>Constitution: Articles 39(b), 39(c), 112, 265, 266</li></ul></div>
 <div class="card"><h3>Online sources</h3><ul>
 <li><a href="https://www.rbi.org.in" target="_blank" rel="noopener">Reserve Bank of India</a> – monetary policy statements, data</li>
 <li><a href="https://www.mospi.gov.in" target="_blank" rel="noopener">MoSPI / NSO</a> – GDP and CPI releases</li>
 <li><a href="https://www.indiabudget.gov.in" target="_blank" rel="noopener">Union Budget and Economic Survey</a></li>
 <li><a href="https://www.cci.gov.in" target="_blank" rel="noopener">Competition Commission of India</a> – orders</li>
 <li><a href="/finance-economics/">Finance &amp; Economics series</a> and <a href="/business-admin/">Business Administration series</a> on this site</li></ul></div></div></div>`+footer(); }};

function footer(){ return `<div class="foot">Business Economics explorer · v1.0.0 · Reference material for second-semester B.Com. LL.B. students, based on the standard Business Economics syllabus. Always check against your own course outline.</div>`; }
