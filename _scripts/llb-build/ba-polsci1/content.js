/*
TOOL:    ba-polsci1/content.js — Political Science I: Political Theory and Organisation (B.A. LL.B. Semester I), assembled by build.py
FAMILY:  law-explorers
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    Kaavya Study Materials – TNNLU B.A. LL.B. Semester I and II explorers (claude.ai, 2026-11-22)
CHANGES: 1.0.0 - first version
*/
const UNITS = [
 {id:"u1", n:1, title:"Political Science and Its Approaches", short:"Meaning, nature and scope; traditional, behavioural, Marxist and feminist approaches; links with law."},
 {id:"u2", n:2, title:"The State", short:"Elements of the State; State, nation, government and society; theories of the origin of the State."},
 {id:"u3", n:3, title:"Sovereignty", short:"Bodin, Hobbes and Austin's monistic theory; pluralism; legal, political and popular sovereignty; sovereignty today."},
 {id:"u4", n:4, title:"Liberty, Equality, Justice, Rights", short:"Negative and positive liberty; kinds of equality; Rawls and theories of justice; rights; power, authority and legitimacy."},
 {id:"u5", n:5, title:"Forms and Organs of Government", short:"Democracy and its types; unitary and federal; parliamentary and presidential; separation of powers; the three organs."},
 {id:"u6", n:6, title:"Parties, Groups and Elections", short:"Political parties and party systems; pressure groups; public opinion; representation and electoral systems."}
];
const EXTRAS = [
 {id:"thinkers", ic:"🧠", title:"Thinkers"},
 {id:"flash", ic:"🃏", title:"Flashcards"},
 {id:"quiz", ic:"✅", title:"Quiz"},
 {id:"refs", ic:"📚", title:"References"}
];
const CASES = [], MAXIMS = [];
const HOME = {
 title:"Political Science I – Political Theory and Organisation",
 intro:["Law is made, applied and judged inside a political order. This course gives you the vocabulary of that order: what a State is, where sovereignty lies, what we mean by liberty, equality and justice, and how governments are organised and chosen.",
  "Everything here connects to your law courses – Constitutional Law in Semester III leans on almost every unit."],
 tips:["For each concept, learn one definition, one thinker and one Indian example.","Draw the diagrams yourself – the separation of powers and the social contract stick better on paper.","Read the Preamble and Articles 12–14, 19, 21, 52–78 and 245–246 of the Constitution alongside Units 4 and 5.","Follow one election in the news and look for parties, pressure groups and public opinion at work.","Use the Thinkers page to revise before the exam – who said what, and why it matters."],
 about:"TNNLU's course list names this paper 'Political Science – I (Political Theory and Organisation)'. The units follow the standard first-semester political theory syllabus of Indian law universities. Compare with TNNLU's own course outline when it is issued."
};
const FOOT = "Political Science I explorer · v1.0.0 · Reference material for first-semester B.A. LL.B. students, based on the usual 'Political Theory and Organisation' syllabus. Always check against your own course outline.";

const THINKERS = [
 ["Aristotle","384–322 BCE","Called man a political animal; classified constitutions by who rules (one, few, many) and whether in the common interest; father of political science."],
 ["Kautilya","c. 4th century BCE","Arthashastra: the saptanga (seven-limb) theory of the State – swami, amatya, janapada, durga, kosha, danda, mitra."],
 ["Jean Bodin","1530–1596","First systematic theory of sovereignty: supreme power over citizens and subjects, unrestrained by law."],
 ["Thomas Hobbes","1588–1679","Leviathan (1651): life in the state of nature is 'solitary, poor, nasty, brutish and short'; people surrender all rights to an absolute sovereign."],
 ["John Locke","1632–1704","Two Treatises (1689): natural rights to life, liberty and property; limited government by consent; right to resist a government that breaks trust."],
 ["Montesquieu","1689–1755","The Spirit of the Laws (1748): liberty needs legislative, executive and judicial power to be kept separate."],
 ["Jean-Jacques Rousseau","1712–1778","The Social Contract (1762): the general will; popular sovereignty; 'Man is born free, and everywhere he is in chains.'"],
 ["Jeremy Bentham","1748–1832","Utilitarianism – the greatest happiness of the greatest number; rights as creations of law."],
 ["John Austin","1790–1859","Law is the command of a sovereign backed by sanction; sovereignty is determinate, absolute, indivisible."],
 ["J.S. Mill","1806–1873","On Liberty (1859): the harm principle – power may be used against a person only to prevent harm to others."],
 ["Karl Marx","1818–1883","The State is an instrument of class domination; it will wither away in a classless society."],
 ["Max Weber","1864–1920","The State claims a monopoly of legitimate force; traditional, charismatic and legal-rational authority."],
 ["Harold Laski","1893–1950","Pluralist critic of monistic sovereignty; 'every State is known by the rights it maintains'."],
 ["B.R. Ambedkar","1891–1956","Chief architect of the Constitution; social democracy – liberty, equality and fraternity together; warned against hero-worship."],
 ["Isaiah Berlin","1909–1997","Two Concepts of Liberty (1958): negative liberty (freedom from interference) and positive liberty (self-mastery)."],
 ["David Easton","1917–2014","Political system as authoritative allocation of values; inputs, outputs and feedback (systems approach)."],
 ["John Rawls","1921–2002","A Theory of Justice (1971): justice as fairness, the veil of ignorance, the difference principle."],
 ["Robert Nozick","1938–2002","Anarchy, State and Utopia (1974): minimal State; justice in holdings (entitlement theory)."],
 ["Amartya Sen","b. 1933","The Idea of Justice (2009): capabilities; compare real lives rather than design perfect institutions (niti and nyaya)."]
];

const FLASH = [
 ["Political science","The study of the State, government, power and the political behaviour of people."],
 ["Behaviouralism","An approach (1950s–60s) that studies observable political behaviour with scientific, quantitative methods."],
 ["Post-behaviouralism","David Easton's 1969 call for relevance and values in research – 'relevance and action'."],
 ["Elements of the State","Population, territory, government and sovereignty (Montevideo Convention, 1933 adds capacity to enter relations with other States)."],
 ["State vs government","The State is permanent and abstract; the government is its temporary machinery – governments change, the State continues."],
 ["Nation","A people bound by a sense of common identity – history, culture, language or shared destiny."],
 ["Social contract theory","The State arises from an agreement among individuals in a state of nature (Hobbes, Locke, Rousseau)."],
 ["Divine right theory","Kings rule by God's will and answer only to God – used to justify absolute monarchy."],
 ["Evolutionary theory","The State grew gradually out of kinship, religion, property and war – the most accepted theory of origin."],
 ["Sovereignty","Supreme authority within a territory (internal) and independence from outside control (external)."],
 ["Austin's sovereign","A determinate human superior, habitually obeyed by the bulk of society and not habitually obeying anyone else."],
 ["Pluralism","Sovereignty is shared among many associations – churches, unions, guilds – not monopolised by the State (Laski, Figgis, MacIver)."],
 ["Legal sovereignty","The authority that makes law (e.g. Parliament in Britain)."],
 ["Popular sovereignty","Ultimate authority rests with the people – 'We, the People of India…'."],
 ["Negative liberty","Freedom from interference by others (Berlin)."],
 ["Positive liberty","Freedom to be one's own master; often requires enabling conditions such as education."],
 ["Formal equality","Equal treatment by law – Article 14, equality before law."],
 ["Substantive equality","Equality of real outcomes or opportunities, which may need special measures – Articles 15(4), 16(4)."],
 ["Veil of ignorance","Rawls: choose principles of justice without knowing your place in society."],
 ["Difference principle","Rawls: inequalities are just only if they benefit the least advantaged."],
 ["Power vs authority","Power is the ability to make others act; authority is power accepted as rightful."],
 ["Legitimacy","The belief that a ruler or rule has the right to be obeyed."],
 ["Weber's authority types","Traditional (custom), charismatic (personal qualities), legal-rational (rules and office)."],
 ["Unitary government","All power with the central government; local units derive power from it (UK, France)."],
 ["Federal government","Power divided by a written constitution between the centre and units, with courts as umpire (USA; India with a strong centre)."],
 ["Parliamentary system","The executive comes from and is responsible to the legislature (India, UK)."],
 ["Presidential system","A separately elected executive with a fixed term, not responsible to the legislature (USA)."],
 ["Separation of powers","Montesquieu: legislative, executive and judicial powers in separate hands to protect liberty."],
 ["Checks and balances","Each organ limits the others – veto, impeachment, judicial review."],
 ["Pressure group","An organised group that tries to influence policy without contesting elections (FICCI, trade unions)."],
 ["First-past-the-post","The candidate with the most votes in a constituency wins – used for Lok Sabha elections."],
 ["Proportional representation","Seats are shared in proportion to votes – used in India for Rajya Sabha and Presidential elections (single transferable vote)."]
];

const QUIZ = [
 [1,"Who is called the father of political science?",["Plato","Aristotle","Machiavelli","Hobbes"],1,"For his empirical study of 158 constitutions."],
 [1,"The behavioural approach stresses…",["Historical documents only","Observable behaviour and scientific method","Divine law","Ethics alone"],1,"Measurement and testing."],
 [1,"Post-behaviouralism is associated with…",["David Easton","Bodin","Austin","Locke"],0,"His 1969 APSA address."],
 [1,"A feminist approach would ask about…",["Only voting figures","How power works within families and how 'private' matters are political","The divine right of kings","Sovereign immunity"],1,"'The personal is political.'"],
 [2,"Which is NOT an essential element of the State?",["Population","Territory","Sovereignty","A written constitution"],3,"The UK has no single written constitution yet is a State."],
 [2,"Which statement is correct?",["The government is permanent; the State changes","The State is permanent; governments change","They are the same","The nation is always the State"],1,"Governments come and go."],
 [2,"'Life in the state of nature is solitary, poor, nasty, brutish and short' – who?",["Locke","Rousseau","Hobbes","Mill"],2,"Leviathan, 1651."],
 [2,"Locke's social contract creates a government that is…",["Absolute","Limited and based on consent","Divine","Hereditary"],1,"With a right to resist breach of trust."],
 [2,"Kautilya's saptanga theory lists how many elements of the State?",["Four","Five","Seven","Nine"],2,"Seven limbs."],
 [3,"Austin's theory of sovereignty is called…",["Pluralist","Monistic","Marxist","Anarchist"],1,"One determinate sovereign."],
 [3,"Which thinker criticised monistic sovereignty?",["Austin","Hobbes","Laski","Bodin"],2,"Pluralist."],
 [3,"'We, the People of India' expresses…",["Legal sovereignty of Parliament","Popular sovereignty","Divine right","De facto sovereignty"],1,"Authority rests with the people."],
 [3,"A government that controls territory in fact but has no legal title has…",["De jure sovereignty","De facto sovereignty","Popular sovereignty","Titular sovereignty"],1,"Sovereignty in fact."],
 [4,"Isaiah Berlin distinguished…",["Legal and political sovereignty","Negative and positive liberty","Unitary and federal","Traditional and charismatic authority"],1,"Two Concepts of Liberty."],
 [4,"Reservations under Article 15(4) and 16(4) aim at…",["Formal equality","Substantive equality","Liberty","Sovereignty"],1,"Equality in fact."],
 [4,"The 'veil of ignorance' is a device of…",["Nozick","Rawls","Bentham","Marx"],1,"A Theory of Justice."],
 [4,"Mill's harm principle says power may be used against a person to…",["Make them happier","Prevent harm to others","Punish bad thoughts","Collect taxes"],1,"On Liberty."],
 [4,"Authority based on rules and office is, in Weber's terms…",["Traditional","Charismatic","Legal-rational","Divine"],2,"Bureaucratic authority."],
 [5,"Separation of powers was systematised by…",["Montesquieu","Rousseau","Austin","Kautilya"],0,"The Spirit of the Laws."],
 [5,"In a parliamentary system the executive is…",["Elected separately for a fixed term","Responsible to the legislature","Appointed by judges","Hereditary"],1,"Collective responsibility – Article 75(3)."],
 [5,"India's federation is often described as…",["Purely unitary","Quasi-federal, with a strong centre","Confederal","Presidential"],1,"K.C. Wheare's phrase."],
 [5,"Judicial review is an example of…",["Delegated legislation","Checks and balances","Divine right","Proportional representation"],1,"Courts check the other organs."],
 [5,"Which country has a presidential system?",["India","United Kingdom","United States","Japan"],2,"Fixed-term president not responsible to Congress."],
 [6,"Which is a pressure group, not a party?",["BJP","Indian National Congress","FICCI","DMK"],2,"It does not contest elections."],
 [6,"Lok Sabha elections use…",["Proportional representation","First-past-the-post","Single transferable vote","List system"],1,"Most votes wins the seat."],
 [6,"The Rajya Sabha is elected by…",["Direct vote","State legislators by single transferable vote","Nomination only","Lottery"],1,"Article 80(4)."],
 [6,"A criticism of first-past-the-post is that…",["It always gives coalitions","Seat shares can differ widely from vote shares","It is too complicated","It needs no constituencies"],1,"Try the seat calculator."],
 [6,"India's party system today is best described as…",["One-party","Two-party","Multi-party","No-party"],2,"Many national and State parties."]
];

//@@VIEWS
VIEWS.home = { html: homeView };

/* ---------------- UNIT 1 ---------------- */
VIEWS.u1 = { html(){ return unitHead(1)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">Political science studies <b>the State, government and power</b> – who gets what, when and how (Lasswell). It asks both <b>what is</b> (empirical) and <b>what ought to be</b> (normative).</div>
 <h4>Nature: science or art?</h4><p>It is a science in that it studies facts systematically and looks for patterns; it is not an exact science because human behaviour cannot be controlled in a laboratory and values cannot be measured. Most writers call it a <b>social science</b>.</p>
 <h4>Scope</h4><ul><li>Political theory – concepts and ideas (liberty, justice, State).</li><li>Comparative politics and government.</li><li>Public administration.</li><li>International relations.</li><li>Political sociology and public law.</li></ul>
 <h4>Approaches</h4><table class="t"><tr><th>Approach</th><th>Focus</th><th>Weakness</th></tr>
 <tr><td>Traditional (philosophical, historical, legal-institutional)</td><td>Ideas, history, constitutions and institutions</td><td>Neglects actual behaviour</td></tr>
 <tr><td>Behavioural</td><td>Observable behaviour; surveys, statistics; value-free</td><td>Ignores values; 'scientism'</td></tr>
 <tr><td>Post-behavioural</td><td>Relevance and action; facts with values</td><td>Less a method than a mood</td></tr>
 <tr><td>Systems (Easton)</td><td>Inputs → political system → outputs → feedback</td><td>Abstract</td></tr>
 <tr><td>Marxist</td><td>Class and economic base</td><td>Economic determinism</td></tr>
 <tr><td>Feminist</td><td>Gender and power; the personal is political</td><td>—</td></tr></table>
 <h4>Political science and law</h4><p>Law is the language in which the State speaks. Constitutional law, administrative law and jurisprudence all assume political concepts – sovereignty, rights, legitimacy. Courts deciding the basic structure (Kesavananda Bharati, 1973) or federalism (S.R. Bommai, 1994) are answering political-theory questions in legal form.</p></div>
</div><div>
 ${animBox("esAnim","Easton's political system",ringSVG("es",[["Demands and supports","inputs from society"],["Political system","conversion"],["Decisions and policies","outputs"],["Feedback","reactions become new inputs"]],"Easton's systems model","Environment"))}
 <div class="card lab"><h3>Which approach is this?</h3><div id="lab1"></div></div>
</div></div>`+unitFoot(1)+footer(); },
 init(){
  anim=flowAnim("esAnim","es",4,[
   "<b>Inputs.</b> Society makes <b>demands</b> (lower fees, more jobs) and gives <b>supports</b> (voting, paying taxes, obeying laws).",
   "<b>Conversion.</b> The political system – legislature, executive, parties, courts – processes the demands.",
   "<b>Outputs.</b> It produces authoritative decisions: laws, policies, budgets, judgments.",
   "<b>Feedback.</b> People react to the outputs, which shapes new demands and supports. The system persists by adapting to its environment."],true);
  choiceLab("#lab1",[
   ["A study of 50,000 voter interviews to find how caste affects voting choice.","BE","Observable behaviour, measured."],
   ["A reading of the Constituent Assembly Debates to see what the framers meant by 'socialist'.","TR","Historical-philosophical."],
   ["An analysis of how landlords' economic power shaped land reform laws.","MA","Class and economic base."],
   ["A study of why unpaid domestic work is left out of national income and policy.","FE","Gender and the public/private divide."]
  ],{TR:"Traditional",BE:"Behavioural",MA:"Marxist",FE:"Feminist"});
  miniQuiz(1);
 }};

/* ---------------- UNIT 2 ---------------- */
const SC_SVG=flowSVG("sc",[["State of nature","no government"],["Problems","insecurity, no impartial judge"],["The contract","people agree to form society and government"],["The sovereign","Hobbes: absolute · Locke: limited · Rousseau: general will"],["Political society","law, order and rights"]],"Social contract");
VIEWS.u2 = { html(){ return unitHead(2)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">The <b>State</b> is a people organised for law within a definite territory, with a government and <b>sovereignty</b>. It is the most important political association – the only one that may lawfully use force on everyone within its territory.</div>
 <h4>Elements</h4><ol><li><b>Population</b> – no fixed size (Vatican to India).</li><li><b>Territory</b> – land, waters and air space.</li><li><b>Government</b> – the agency through which the State acts.</li><li><b>Sovereignty</b> – supreme internal authority and external independence.</li></ol><p>International recognition is important in practice but not an element in theory.</p>
 <h4>State and other ideas</h4><table class="t"><tr><th></th><th>Meaning</th><th>Example</th></tr>
 <tr><td>State</td><td>Legal-political unit with sovereignty</td><td>India</td></tr><tr><td>Government</td><td>Machinery of the State; changes</td><td>The Union Council of Ministers</td></tr>
 <tr><td>Nation</td><td>Community with shared identity</td><td>Can exist without a State (Kurds)</td></tr><tr><td>Society</td><td>All social relationships</td><td>Wider than the State; no coercion</td></tr></table>
 <h4>Theories of origin</h4><ul><li><b>Divine origin</b> – God created the State; the king answers only to God (James I). Rejected by democracy.</li><li><b>Force</b> – the State arose from conquest. Explains some States but not legitimacy.</li><li><b>Patriarchal / matriarchal</b> – grew out of the family (Maine).</li><li><b>Social contract</b> – Hobbes, Locke, Rousseau (see the animation).</li><li><b>Evolutionary (historical)</b> – the State evolved slowly through kinship, religion, property, war and political consciousness (Garner, Gettell). Most accepted.</li><li><b>Marxist</b> – the State arose with private property to protect the owning class.</li></ul>
 <h4>Indian thought</h4><p>Kautilya's <b>saptanga</b>: swami (ruler), amatya (ministers), janapada (territory and people), durga (fort), kosha (treasury), danda (army/justice), mitra (allies). The Mahabharata's Shanti Parva describes a contract to end <i>matsya nyaya</i> – the law of the fish, where the big eat the small.</p></div>
</div><div>
 ${animBox("scAnim","The social contract",SC_SVG)}
 <div class="card lab"><h3>Is it a State?</h3><div id="lab2"></div></div>
 <div class="card lab"><h3>Hobbes, Locke or Rousseau?</h3><div id="lab2b"></div></div>
</div></div>`+unitFoot(2)+footer(); },
 init(){
  anim=flowAnim("scAnim","sc",5,[
   "<b>State of nature.</b> Imagine people before government. Hobbes: war of all against all. Locke: peaceful but with natural rights to life, liberty and property. Rousseau: free and innocent 'noble savages'.",
   "<b>Problems.</b> Without a common power, life and property are insecure, and there is no impartial judge to settle disputes.",
   "<b>The contract.</b> Individuals agree with each other to form a political society and accept a common authority.",
   "<b>The sovereign.</b> Hobbes: rights surrendered to an absolute sovereign. Locke: limited government holding power in trust; people may resist breach. Rousseau: sovereignty stays with the people as the general will.",
   "<b>Political society.</b> Law and order replace insecurity. The theory's lasting gift: government rests on the <b>consent</b> of the governed – the idea behind every modern constitution."]);
  choiceLab("#lab2",[
   ["A people with territory and an elected government, but whose foreign policy and defence are controlled by another country.","N","Lacks external sovereignty – a protectorate."],
   ["Tamil Nadu – people, territory and an elected government.","N","A constituent unit; sovereignty lies with the Union of India."],
   ["Bhutan – small population, own territory, government and independence.","Y","All four elements."],
   ["The United Nations – members, headquarters and a Secretary-General.","N","An international organisation without sovereignty or territory of its own."],
   ["Vatican City – about 800 people, 44 hectares, a government and independence.","Y","Tiny but sovereign."]
  ],{Y:"Yes, a State",N:"Not a State"});
  choiceLab("#lab2b",[
   ["People give up all their rights to a sovereign whose power cannot be divided or resisted.","H","Leviathan."],
   ["Government holds power in trust to protect life, liberty and property; if it betrays the trust, people may replace it.","L","Inspired the American Declaration of Independence."],
   ["Sovereignty belongs to the people as the general will and cannot be represented.","R","The Social Contract."],
   ["The state of nature is a war of every man against every man.","H","Fear drives the contract."]
  ],{H:"Hobbes",L:"Locke",R:"Rousseau"});
  miniQuiz(2);
 }};

/* ---------------- UNIT 3 ---------------- */
VIEWS.u3 = { html(){ return unitHead(3)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key"><b>Sovereignty</b> is the supreme power of the State. <b>Internally</b>, it commands all persons and associations within the territory; <b>externally</b>, it is free from the control of other States.</div>
 <h4>Development</h4><p><b>Bodin</b> (1576) first defined it as supreme power over citizens unrestrained by law. <b>Hobbes</b> made the sovereign absolute. <b>Rousseau</b> placed it in the people's general will. <b>Austin</b> (1832) gave the legal theory.</p>
 <h4>Austin's monistic theory</h4><p>'If a determinate human superior, not in a habit of obedience to a like superior, receives habitual obedience from the bulk of a given society, that determinate superior is sovereign in that society.' Hence sovereignty is <b>determinate, absolute, indivisible, inalienable, permanent</b>, and law is the sovereign's command.</p>
 <h4>Criticism – pluralism</h4><ul><li>Society contains many associations (religious, economic, cultural) with their own authority; the State is one among them (Laski, Figgis, MacIver).</li><li>In a federation, power is divided; in a democracy, the 'determinate' sovereign is hard to find.</li><li>Custom and international law limit the State.</li><li>Austin ignores the people's will (Henry Maine pointed to Ranjit Singh, absolute yet bound by custom).</li></ul>
 <h4>Kinds of sovereignty</h4><table class="t"><tr><th>Kind</th><th>Meaning</th></tr>
 <tr><td>Legal</td><td>The authority that makes law that courts enforce</td></tr><tr><td>Political</td><td>The power behind the legal sovereign – the electorate</td></tr>
 <tr><td>Popular</td><td>Ultimate authority of the people</td></tr><tr><td>De jure / de facto</td><td>By law / in fact</td></tr><tr><td>Titular</td><td>In name only – a constitutional monarch</td></tr></table>
 <h4>India and sovereignty today</h4><p>The Preamble declares India a <b>sovereign</b> democratic republic and places ultimate authority in 'We, the People'. Within India, no organ is sovereign in Austin's sense: Parliament is limited by fundamental rights and the <b>basic structure</b> (Kesavananda Bharati, 1973), and power is divided with the States. Externally, treaties, the WTO, climate agreements and global markets limit what any State can do alone – yet each State consents to these limits.</p></div>
</div><div>
 <div class="card lab"><h3>Which kind of sovereignty?</h3><div id="lab3"></div></div>
 <div class="card lab"><h3>Austin or the pluralists?</h3><div id="lab3b"></div></div>
</div></div>`+unitFoot(3)+footer(); },
 init(){
  choiceLab("#lab3",[
   ["Parliament passes a law that the courts will apply.","LE","Legal sovereignty."],
   ["The electorate votes out a government at the general election.","PO","Political sovereignty."],
   ["A military group seizes the capital and actually controls the country, though no law recognises it.","DF","De facto."],
   ["The King of the United Kingdom signs bills but acts on ministers' advice.","TI","Titular."]
  ],{LE:"Legal",PO:"Political",DF:"De facto",TI:"Titular"});
  choiceLab("#lab3b",[
   ["Sovereignty cannot be divided – a divided sovereignty is a contradiction.","A","Austin's indivisibility."],
   ["A trade union and a church have authority over their members that the State must respect.","P","Associations share authority."],
   ["Law is the command of the sovereign backed by a sanction.","A","The command theory."],
   ["The State is one association among many, coordinating them rather than dominating them.","P","Laski and MacIver."]
  ],{A:"Austin (monistic)",P:"Pluralists"});
  miniQuiz(3);
 }};

/* ---------------- UNIT 4 ---------------- */
VIEWS.u4 = { html(){ return unitHead(4)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">The great political values – <b>liberty, equality, justice and rights</b> – often pull against each other. Constitutions are bargains among them; the Indian Preamble names justice, liberty, equality and fraternity together.</div>
 <h4>Liberty</h4><p><b>Negative</b> liberty: absence of interference – the State stays out (Hobbes, Locke, Mill, Berlin). <b>Positive</b> liberty: the capacity to make real choices – the State may need to act (T.H. Green, Laski). Mill's <b>harm principle</b> limits State power to preventing harm to others. Article 19 freedoms and Article 21 (as read after Maneka Gandhi) protect liberty, subject to reasonable restrictions.</p>
 <h4>Equality</h4><table class="t"><tr><th>Kind</th><th>Indian example</th></tr>
 <tr><td>Legal – equality before law, equal protection</td><td>Article 14</td></tr><tr><td>Social – no discrimination</td><td>Articles 15, 17 (untouchability abolished)</td></tr>
 <tr><td>Political – equal vote</td><td>Article 326, universal adult franchise</td></tr><tr><td>Economic – reduce inequality</td><td>Articles 38, 39 (Directive Principles)</td></tr>
 <tr><td>Equality of opportunity and protective discrimination</td><td>Articles 15(4), 16(4)</td></tr></table>
 <h4>Justice</h4><ul><li><b>Plato</b>: each doing the work suited to them.</li><li><b>Utilitarian</b> (Bentham, Mill): greatest happiness of the greatest number.</li><li><b>Rawls</b>: behind a <b>veil of ignorance</b> people would choose (1) equal basic liberties for all and (2) fair equality of opportunity, with inequalities allowed only if they benefit the least advantaged (the <b>difference principle</b>).</li><li><b>Nozick</b>: a distribution is just if holdings were acquired and transferred justly – no redistribution.</li><li><b>Sen</b>: focus on capabilities and on removing manifest injustice (<i>nyaya</i>), not only perfect institutions (<i>niti</i>).</li></ul>
 <h4>Rights, power, authority</h4><p>Rights are claims recognised by society and enforced by the State (Laski). Theories: natural, legal, historical, social-welfare, Marxist. <b>Power</b> is the capacity to secure compliance; <b>authority</b> is legitimate power; <b>legitimacy</b> is the belief that it is rightful. Weber: traditional, charismatic, legal-rational authority.</p></div>
</div><div>
 <div class="card lab"><h3>Behind the veil of ignorance</h3><p>Choose a society for yourself without knowing whether you will be born into the poorest or the richest fifth. Incomes are in thousands of rupees a month for each fifth of the population.</p><div id="veil"></div></div>
 <div class="card lab"><h3>Negative or positive liberty?</h3><div id="lab4"></div></div>
 <div class="card lab"><h3>Weber's types of authority</h3><div id="lab4b"></div></div>
</div></div>`+unitFoot(4)+footer(); },
 init(){
  const SOC=[["A",[4,8,15,40,180]],["B",[12,15,20,28,45]],["C",[10,14,22,35,90]],["D",[10,10,10,10,10]]];
  const box=$("#veil");
  box.innerHTML=`<table class="t"><tr><th>Society</th><th>Poorest</th><th>2nd</th><th>3rd</th><th>4th</th><th>Richest</th><th>Average</th><th></th></tr>${SOC.map(s=>`<tr><td><b>${s[0]}</b></td>${s[1].map(v=>`<td>${v}</td>`).join("")}<td>${(s[1].reduce((a,b)=>a+b)/5).toFixed(1)}</td><td><button class="btn sm sec" data-v="${s[0]}">Choose</button></td></tr>`).join("")}</table><div id="veilOut"></div>`;
  $$("[data-v]",box).forEach(b=>b.onclick=()=>{ const k=b.dataset.v; const msg={
   A:"Highest average (49.4) – a utilitarian might pick it – but if you are born into the poorest fifth you get only 4. Rawls says no rational person behind the veil would take that gamble.",
   B:"Rawls's choice. The poorest get 12 – more than in any other society. There is inequality, but it leaves the worst-off better off than strict equality (D) would. That is the difference principle.",
   C:"A middle path: average 34.2, but the poorest get only 10 – no better than strict equality, so the extra inequality does not help the least advantaged.",
   D:"Strict equality at 10 for everyone. The difference principle prefers B, where unequal rewards (perhaps incentives to work and invest) lift even the poorest to 12."}[k];
   $("#veilOut").innerHTML=`<div class="fb info">${msg}</div>`; });
  choiceLab("#lab4",[
   ["The State must not censor a newspaper's editorial.","N","Freedom from interference."],
   ["The State provides free schooling so that every child can actually choose a career.","P","Enabling conditions."],
   ["A law guarantees the right to free legal aid so the poor can actually defend themselves.","P","Capacity to use a right."],
   ["Police may not search your home without legal authority.","N","Non-interference."]
  ],{N:"Negative liberty",P:"Positive liberty"});
  choiceLab("#lab4b",[
   ["A village elder whose word is obeyed because elders have always settled disputes.","T","Custom."],
   ["A district collector obeyed because the law gives the office certain powers.","L","Rules and office."],
   ["A freedom fighter whose personal magnetism draws millions to follow.","C","Personal qualities."],
   ["A hereditary king.","T","Tradition and inheritance."]
  ],{T:"Traditional",C:"Charismatic",L:"Legal-rational"});
  miniQuiz(4);
 }};

/* ---------------- UNIT 5 ---------------- */
const SOP_SVG=ringSVG("sp",[["Legislature","makes law"],["Executive","enforces law"],["Judiciary","interprets law"]],"Separation of powers and checks","Constitution");
VIEWS.u5 = { html(){ return unitHead(5)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">Governments differ by <b>who rules</b> (democracy, monarchy, oligarchy), <b>how power is divided across territory</b> (unitary, federal) and <b>how the executive relates to the legislature</b> (parliamentary, presidential).</div>
 <h4>Democracy</h4><p>'Government of the people, by the people, for the people' (Lincoln). <b>Direct</b> (Swiss cantons, gram sabha) and <b>representative</b>. Conditions for success: education, free press, independent judiciary, tolerance, economic security. Theories: liberal, elitist (Pareto, Mosca), pluralist (Dahl), participatory, Marxist.</p>
 <h4>Unitary and federal</h4><table class="t"><tr><th>Feature</th><th>Unitary</th><th>Federal</th></tr>
 <tr><td>Division of power</td><td>None in the constitution</td><td>Constitution divides power</td></tr><tr><td>Constitution</td><td>May be unwritten, flexible</td><td>Written, rigid, supreme</td></tr>
 <tr><td>Courts</td><td>No umpire role</td><td>Court settles centre–state disputes</td></tr><tr><td>Example</td><td>UK, France, Sri Lanka</td><td>USA, Australia, India</td></tr></table>
 <p>India: 'Union of States' (Article 1); Seventh Schedule lists; but a strong centre – single citizenship, all-India services, emergency powers, governors, Article 3. Hence 'quasi-federal' (Wheare) or 'cooperative federalism'. <b>S.R. Bommai</b> (1994) held federalism to be part of the basic structure.</p>
 <h4>Parliamentary and presidential</h4><table class="t"><tr><th>Parliamentary (India, UK)</th><th>Presidential (USA)</th></tr>
 <tr><td>Nominal head (President) and real head (PM)</td><td>One head, the President</td></tr><tr><td>Ministers sit in the legislature</td><td>Secretaries are not in Congress</td></tr>
 <tr><td>Collectively responsible; can fall on a no-confidence vote</td><td>Fixed term; removed only by impeachment</td></tr><tr><td>Lower house can be dissolved early</td><td>Fixed elections</td></tr></table>
 <h4>Organs</h4><p><b>Legislature</b> – law-making, financial control, control of the executive (questions, motions), amending the constitution. <b>Executive</b> – implementing law, administration, foreign relations, ordinances (Article 123). <b>Judiciary</b> – deciding disputes, interpreting the constitution, judicial review (Articles 13, 32, 226). India does not follow rigid separation, but no organ may usurp another's essential function (Ram Jawaya Kapur, 1955; Indira Nehru Gandhi, 1975).</p></div>
</div><div>
 ${animBox("spAnim","Separation of powers – and checks",SOP_SVG)}
 <div class="card lab"><h3>Unitary or federal feature?</h3><div id="lab5"></div></div>
 <div class="card lab"><h3>Parliamentary or presidential?</h3><div id="lab5b"></div></div>
</div></div>`+unitFoot(5)+footer(); },
 init(){
  anim=flowAnim("spAnim","sp",3,[
   "<b>Legislature</b> makes law – and checks the executive through questions, no-confidence motions and control of money. It can impeach the President and remove judges (Articles 61, 124(4)).",
   "<b>Executive</b> enforces law – and checks the legislature by summoning and proroguing it, recommending money bills and, in a parliamentary system, advising dissolution. It appoints judges after collegium recommendations.",
   "<b>Judiciary</b> interprets law – and checks both through judicial review, striking down unconstitutional laws (Article 13) and executive action. The arrows complete the circle: each organ limits the next, so liberty is safe (Montesquieu)."],true);
  choiceLab("#lab5",[
   ["Single citizenship for all Indians.","U","A unitary feature of the Indian system."],
   ["A written constitution dividing subjects into Union, State and Concurrent Lists.","F","Federal."],
   ["Parliament can change a State's boundaries by ordinary law (Article 3).","U","Unitary tilt."],
   ["The Supreme Court decides disputes between the Centre and a State (Article 131).","F","Federal umpire."],
   ["Emergency under Article 352 lets the Centre direct the States.","U","Unitary in emergencies."]
  ],{U:"Unitary feature",F:"Federal feature"});
  choiceLab("#lab5b",[
   ["The head of government can be removed by a vote of no confidence.","PA","Responsible government."],
   ["The head of State and head of government are the same person.","PR","USA."],
   ["Ministers must be members of the legislature (or become one within six months).","PA","Article 75(5)."],
   ["The executive has a fixed term regardless of the legislature's support.","PR","Fixed four-year term."]
  ],{PA:"Parliamentary",PR:"Presidential"});
  miniQuiz(5);
 }};

/* ---------------- UNIT 6 ---------------- */
VIEWS.u6 = { html(){ return unitHead(6)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">Between the citizen and the State stand <b>parties</b>, <b>pressure groups</b> and <b>public opinion</b>; and the <b>electoral system</b> decides how votes become seats – which can change who governs.</div>
 <h4>Political parties</h4><p>An organised group seeking to win power through elections on shared principles (Burke). Functions: contest elections, form governments or opposition, aggregate interests, educate voters, recruit leaders. <b>Party systems</b>: one-party (China), two-party (USA), multi-party (India). The Tenth Schedule (anti-defection law, 1985) binds legislators to party; the Election Commission recognises national and State parties.</p>
 <h4>Pressure groups</h4><p>Organised interests that influence policy without contesting elections: business (FICCI, CII), labour (CITU, INTUC), farmers (Bharatiya Kisan Union), professional (Bar Council), cause groups (Narmada Bachao Andolan). Methods: lobbying, petitions, media, protests, public-interest litigation. Helpful for representation, but can serve narrow interests.</p>
 <h4>Public opinion</h4><p>The views of the public on public matters, shaped by family, education, media, social media, parties. Freedom of speech and press (Article 19(1)(a)) protects it; misinformation and paid news distort it.</p>
 <h4>Electoral systems</h4><table class="t"><tr><th>System</th><th>How it works</th><th>Used in India for</th></tr>
 <tr><td>First-past-the-post</td><td>Most votes in a single-member constituency wins</td><td>Lok Sabha, State Assemblies</td></tr>
 <tr><td>Proportional representation – single transferable vote</td><td>Ranked preferences; quota for election</td><td>Rajya Sabha, President, Vice-President</td></tr>
 <tr><td>List PR</td><td>Parties win seats in proportion to votes</td><td>Not used (Netherlands, Israel)</td></tr></table>
 <p>Article 324 creates the Election Commission; Article 326 guarantees universal adult suffrage.</p></div>
</div><div>
 <div class="card lab"><h3>Votes into seats: FPTP or proportional?</h3><p>Five constituencies of 100 voters each. Set each party's votes in every constituency and compare the seats under first-past-the-post with a proportional (D'Hondt) share of the same 5 seats.</p><div id="fp"></div></div>
 <div class="card lab"><h3>Party or pressure group?</h3><div id="lab6"></div></div>
</div></div>`+unitFoot(6)+footer(); },
 init(){
  const P=["Party A","Party B","Party C"]; let V=[[40,35,25],[38,32,30],[36,34,30],[41,30,29],[39,31,30]];
  const draw=()=>{
    const tot=[0,0,0], fp=[0,0,0];
    V.forEach(r=>{ r.forEach((v,i)=>tot[i]+=v); const m=Math.max(...r); fp[r.indexOf(m)]++; });
    const dh=[0,0,0]; for(let s=0;s<5;s++){ let best=0,bi=0; tot.forEach((t,i)=>{ const q=t/(dh[i]+1); if(q>best){best=q;bi=i;} }); dh[bi]++; }
    const all=tot.reduce((a,b)=>a+b);
    $("#fp").innerHTML=`<table class="t"><tr><th>Constituency</th>${P.map(p=>`<th>${p}</th>`).join("")}<th>Winner</th></tr>${V.map((r,ri)=>{ const m=Math.max(...r); return `<tr><td>${ri+1}</td>${r.map((v,i)=>`<td><input type="number" min="0" max="100" value="${v}" data-r="${ri}" data-i="${i}" style="width:62px"></td>`).join("")}<td>${P[r.indexOf(m)]}</td></tr>`; }).join("")}
     <tr><th>Total votes</th>${tot.map(t=>`<th>${t} (${(100*t/all).toFixed(0)}%)</th>`).join("")}<th></th></tr>
     <tr><th>Seats – FPTP</th>${fp.map(t=>`<th>${t}</th>`).join("")}<th></th></tr>
     <tr><th>Seats – proportional</th>${dh.map(t=>`<th>${t}</th>`).join("")}<th></th></tr></table>
     <div class="fb info">${fp[0]===5?"Party A wins every seat with about "+(100*tot[0]/all).toFixed(0)+"% of the votes – FPTP can magnify a narrow lead into a sweep and leave a third of voters unrepresented.":"Compare the rows: FPTP rewards the party that comes first in each constituency; proportional representation tracks the vote share."} FPTP gives stable majorities and a local MP; PR gives fairer shares but often coalitions.</div>`;
    $$("#fp input").forEach(inp=>inp.onchange=()=>{ V[+inp.dataset.r][+inp.dataset.i]=Math.max(0,Math.min(100,+inp.value||0)); draw(); });
  };
  draw();
  choiceLab("#lab6",[
   ["Contests Lok Sabha elections on a manifesto.","PA","A party seeks power."],
   ["The Confederation of Indian Industry meets ministers before the Budget.","PG","Influence without contesting."],
   ["A farmers' union organises a march to demand higher MSP.","PG","Pressure group."],
   ["Forms the government after winning a majority in the State Assembly.","PA","Party."]
  ],{PA:"Political party",PG:"Pressure group"});
  miniQuiz(6);
 }};

/* ---------------- THINKERS ---------------- */
VIEWS.thinkers = { html(){ return `<div class="unitban"><div class="k">Revise</div><h2>Thinkers</h2><p>${THINKERS.length} thinkers in time order. Search by name or idea.</p></div>
 <div class="card"><input type="text" id="thS" class="search" placeholder="Search…"></div><div class="casecards" id="thB"></div>`+footer(); },
 init(){ const draw=()=>{ const q=$("#thS").value.toLowerCase(); $("#thB").innerHTML=THINKERS.filter(t=>t.join(" ").toLowerCase().includes(q)).map(t=>`<div class="cc"><b>${esc(t[0])}</b><span class="cit">${esc(t[1])}</span><p>${esc(t[2])}</p></div>`).join(""); }; draw(); $("#thS").oninput=draw; }};

/* ---------------- REFERENCES ---------------- */
VIEWS.refs = { html(){ return `<div class="unitban"><div class="k">Read further</div><h2>References</h2><p>Books are in the TNNLU library; online sources need internet.</p></div>
 <div class="two"><div class="card"><h3>Books</h3><table class="t"><tr><th>Book</th><th>Use it for</th></tr>
 <tr><td>O.P. Gauba, <i>An Introduction to Political Theory</i>, National Paperbacks</td><td>Main text for every unit</td></tr>
 <tr><td>Rajeev Bhargava and Ashok Acharya (eds), <i>Political Theory: An Introduction</i>, Pearson</td><td>Liberty, equality, justice, rights</td></tr>
 <tr><td>A.C. Kapur, <i>Principles of Political Science</i>, S. Chand</td><td>State, sovereignty, forms of government</td></tr>
 <tr><td>Andrew Heywood, <i>Politics</i>, Palgrave</td><td>Clear modern overview</td></tr>
 <tr><td>Eddy Asirvatham and K.K. Misra, <i>Political Theory</i>, S. Chand</td><td>Classic Indian textbook</td></tr>
 <tr><td>Granville Austin, <i>The Indian Constitution: Cornerstone of a Nation</i>, OUP</td><td>Indian institutions</td></tr>
 <tr><td>Amartya Sen, <i>The Idea of Justice</i>, Penguin</td><td>Justice – Indian perspective</td></tr></table></div>
 <div><div class="card"><h3>Online</h3><ul>
 <li><a href="https://legislative.gov.in/constitution-of-india" target="_blank" rel="noopener">Constitution of India</a> – Legislative Department</li>
 <li><a href="https://eparlib.nic.in" target="_blank" rel="noopener">Parliament Digital Library</a> – Constituent Assembly Debates</li>
 <li><a href="https://www.eci.gov.in" target="_blank" rel="noopener">Election Commission of India</a> – parties and election results</li>
 <li><a href="https://plato.stanford.edu" target="_blank" rel="noopener">Stanford Encyclopedia of Philosophy</a> – sovereignty, liberty, justice</li>
 <li><a href="https://egyankosh.ac.in" target="_blank" rel="noopener">eGyanKosh (IGNOU)</a> – free political theory course material</li></ul></div>
 <div class="card"><h3>Next</h3><p><a href="/tools/llb-ba-political-science-2.html">Political Science II – Political Obligations</a>.</p></div></div></div>`+footer(); }};
