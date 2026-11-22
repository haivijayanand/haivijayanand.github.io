/*
TOOL:    ba-polsci2/content.js — Political Science II: Political Obligations (B.A. LL.B. Semester II), assembled by build.py
FAMILY:  law-explorers
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    Kaavya Study Materials – TNNLU B.A. LL.B. Semester I and II explorers (claude.ai, 2026-11-22)
CHANGES: 1.0.0 - first version
*/
const UNITS = [
 {id:"u1", n:1, title:"Why Obey? The Problem of Political Obligation", short:"Obligation, coercion and legitimacy; the main grounds – consent, gratitude, fair play, natural duty, utility."},
 {id:"u2", n:2, title:"Consent and the Social Contract", short:"Hobbes, Locke and Rousseau on obligation; express and tacit consent; Hume's critique; modern contractarians."},
 {id:"u3", n:3, title:"Idealist, Utilitarian and Radical Theories", short:"Divine and prescriptive theories; Hegel and T.H. Green; Bentham and Mill; Marxist and anarchist rejections."},
 {id:"u4", n:4, title:"Limits: Resistance and Civil Disobedience", short:"Right of resistance; Thoreau, Gandhi's satyagraha, King and Rawls; conscientious objection; Indian cases."},
 {id:"u5", n:5, title:"Rights, Duties and Citizenship", short:"Theories of rights; correlation of rights and duties; Fundamental Duties (Article 51A); T.H. Marshall on citizenship."},
 {id:"u6", n:6, title:"Obligation in Constitutional India", short:"Constitutional morality; Ambedkar's warning; the Emergency; sedition and free speech; the right to protest."}
];
const EXTRAS = [
 {id:"thinkers", ic:"🧠", title:"Thinkers"},
 {id:"flash", ic:"🃏", title:"Flashcards"},
 {id:"quiz", ic:"✅", title:"Quiz"},
 {id:"refs", ic:"📚", title:"References"}
];
const CASES = [], MAXIMS = [];
const HOME = {
 title:"Political Science II – Political Obligations",
 intro:["Why should anyone obey the law – especially a law they think is unjust? This question sits beneath every course you will take: criminal law assumes a duty to obey, constitutional law sets limits on what the State may demand, and jurisprudence asks what makes law binding at all.",
  "This course works through the classic answers – consent, gratitude, fair play, utility, the common good – the thinkers who rejected them, and the Indian experience from satyagraha to today's right to protest."],
 tips:["For each theory, ask three questions: what grounds the obligation, how far does it extend, and when does it end?","Keep a two-column table of thinkers: 'why obey' and 'when resist'.","Read Gandhi's Hind Swaraj chapter on passive resistance and Thoreau's essay – both are short.","Follow the right-to-protest cases in the news and connect them to Unit 6.","Revise with the Thinkers page and flashcards."],
 about:"TNNLU's course list names this paper 'Political Science – II (Political Obligations)'. The units follow standard political theory syllabi on obligation, rights and disobedience used in Indian universities, with Indian constitutional material added for law students. Compare with TNNLU's own course outline when it is issued."
};
const FOOT = "Political Science II explorer · v1.0.0 · Reference material for second-semester B.A. LL.B. students, based on standard syllabi on political obligation. Always check against your own course outline.";

const THINKERS = [
 ["Socrates (in Plato's Crito)","c. 399 BCE","Refused to escape prison after an unjust death sentence: by living in Athens he had agreed to its laws – an early argument from consent and gratitude."],
 ["Thomas Hobbes","1588–1679","Obligation comes from the contract made out of fear; obey the sovereign absolutely – except that no one can be bound to give up the right to save their own life."],
 ["John Locke","1632–1704","Obligation rests on consent, express or tacit (enjoying property under a government); a government that breaks its trust may be resisted."],
 ["David Hume","1711–1776","'Of the Original Contract' (1748): few ever consented; we obey from habit and because government is useful."],
 ["Jean-Jacques Rousseau","1712–1778","Obeying the general will is obeying oneself; whoever refuses 'shall be forced to be free'."],
 ["Edmund Burke","1729–1797","Prescription: institutions tested by time deserve allegiance; society is a partnership of the dead, the living and the unborn."],
 ["Jeremy Bentham","1748–1832","Obey while the probable harms of obedience are less than the harms of resistance – a utilitarian calculation."],
 ["G.W.F. Hegel","1770–1831","The State is the realisation of ethical life; true freedom lies in rational membership of the State."],
 ["Henry David Thoreau","1817–1862","Civil Disobedience (1849): refused a tax that supported slavery and war; 'that government is best which governs least'."],
 ["T.H. Green","1836–1882","'Will, not force, is the basis of the State.' We obey because the State secures conditions for the common good; resistance may be a duty when it fails."],
 ["Peter Kropotkin","1842–1921","Anarchist: mutual aid, not coercion, holds society together; the State is unnecessary."],
 ["Leo Tolstoy","1828–1910","Christian anarchist and pacifist; his correspondence influenced Gandhi."],
 ["M.K. Gandhi","1869–1948","Satyagraha: non-violent, open, truthful disobedience of unjust laws, accepting the penalty; Salt March, 1930."],
 ["B.R. Ambedkar","1891–1956","Once constitutional methods exist, civil disobedience and satyagraha are 'the grammar of anarchy' and should be abandoned."],
 ["H.L.A. Hart","1907–1992","Principle of fairness (1955): those who benefit from a cooperative scheme must accept its burdens."],
 ["Martin Luther King Jr.","1929–1968","Letter from Birmingham Jail (1963): one has a moral duty to disobey unjust laws, openly, lovingly and with willingness to accept the penalty."],
 ["John Rawls","1921–2002","Natural duty of justice to support just institutions; civil disobedience as a public, non-violent, conscientious act within fidelity to law."],
 ["Robert Paul Wolff","1933–","In Defense of Anarchism (1970): personal autonomy is incompatible with any duty to obey the State simply because it commands."],
 ["A. John Simmons","b. 1950","Philosophical anarchism: no general theory succeeds in showing that citizens have a general obligation to obey."]
];

const FLASH = [
 ["Political obligation","A moral duty to obey the laws of one's State because they are its laws."],
 ["Obligation vs being obliged","Hart: a gunman obliges you to hand over money; an obligation is a duty you have even without force."],
 ["Legitimacy","The rightful authority of a State to rule – which grounds a duty to obey."],
 ["Consent theory","We are bound because we agreed – expressly (oath, naturalisation) or tacitly (residence, voting)."],
 ["Tacit consent","Locke: enjoying property or travelling on the highway within a State signals consent to its laws."],
 ["Hume's objection","Most people never consented; staying is not consent when leaving is practically impossible – like a sailor carried on board asleep."],
 ["Gratitude theory","We owe obedience to the State as we owe gratitude to a benefactor (Socrates in Crito)."],
 ["Fair-play theory","Hart and Rawls: those who accept the benefits of a just cooperative scheme must bear its burdens."],
 ["Natural duty theory","Rawls: a duty to support just institutions that apply to us, whether or not we consented."],
 ["Utilitarian theory","Obey because obedience produces the greatest happiness overall; disobey when it does not."],
 ["Idealist theory","Hegel and Green: the State expresses our rational will and the common good, so obedience is self-realisation."],
 ["Prescriptive theory","Burke: long-standing institutions have earned authority through time."],
 ["General will","Rousseau: the will of the community directed to the common good, distinct from the 'will of all'."],
 ["Philosophical anarchism","No general duty to obey exists, though there may be good reasons to obey many laws (Wolff, Simmons)."],
 ["Marxist view","The State serves the ruling class; obligation is ideology; the proletariat should overthrow it."],
 ["Right of resistance","Locke: when government breaks its trust, power returns to the people."],
 ["Civil disobedience","A public, non-violent, conscientious breach of law to change a law or policy, accepting the punishment."],
 ["Satyagraha","Gandhi: 'truth-force' – non-violent resistance to injustice through self-suffering, not hatred."],
 ["Conscientious objection","Refusing to obey a command on grounds of conscience, without seeking to change the law (e.g. refusing military service)."],
 ["Bijoe Emmanuel (1986)","Supreme Court protected Jehovah's Witness children who stood respectfully but did not sing the national anthem."],
 ["Hohfeld's correlatives","A right correlates with a duty; a privilege with a no-right; a power with a liability; an immunity with a disability."],
 ["Fundamental Duties","Article 51A, added by the 42nd Amendment, 1976 (Swaran Singh Committee); 11 duties after the 86th Amendment, 2002."],
 ["T.H. Marshall's citizenship","Civil rights (18th c.), political rights (19th c.), social rights (20th c.)."],
 ["Constitutional morality","Ambedkar: respect for constitutional forms and processes; the Supreme Court uses it to protect rights against majority morality."],
 ["Grammar of anarchy","Ambedkar's description (25 Nov 1949) of civil disobedience once constitutional methods are available."],
 ["Sedition","Former s.124A IPC – kept in abeyance in S.G. Vombatkere (2022); BNS, 2023 s.152 penalises acts endangering sovereignty, unity and integrity."],
 ["Right to protest","Peaceful assembly without arms – Article 19(1)(b), subject to reasonable restrictions under Article 19(3)."],
 ["Amit Sahni (2020)","Shaheen Bagh case: protest is a right, but public ways cannot be occupied indefinitely."]
];

const QUIZ = [
 [1,"Political obligation is best defined as…",["Fear of punishment","A moral duty to obey the law because it is the law","Any promise","Paying taxes only"],1,"A duty, not mere compulsion."],
 [1,"Hart's gunman example shows the difference between…",["Rights and duties","Being obliged and having an obligation","Consent and tacit consent","Law and morality"],1,"Force alone creates no obligation."],
 [1,"Which theory grounds obligation in benefits received from a cooperative scheme?",["Divine right","Fair play","Anarchism","Prescription"],1,"Hart, Rawls."],
 [1,"Socrates's refusal to escape in Plato's Crito relies mainly on…",["Utility","Consent and gratitude to the laws","Marxism","Natural duty of justice"],1,"He lived by Athens's laws for 70 years."],
 [2,"For Locke, using the highways of a country shows…",["Express consent","Tacit consent","Coercion","Gratitude"],1,"Tacit consent."],
 [2,"Hume compared a poor peasant's 'consent' by staying in his country to…",["A king's oath","A man carried on board a ship while asleep","A signed contract","A vote"],1,"No real choice to leave."],
 [2,"For Hobbes, a subject may refuse the sovereign when…",["Taxes are high","Ordered to kill himself","He dislikes a law","He moves house"],1,"The right of self-preservation cannot be given up."],
 [2,"'Forced to be free' is a phrase of…",["Locke","Rousseau","Bentham","Burke"],1,"The general will."],
 [3,"'Will, not force, is the basis of the State' – who?",["Hobbes","T.H. Green","Marx","Kropotkin"],1,"Lectures on the Principles of Political Obligation."],
 [3,"Bentham's test for resisting is whether…",["God permits","The harms of obedience exceed those of resistance","The king consents","Tradition allows"],1,"Utilitarian calculation."],
 [3,"Which thinker argued that institutions tested by time deserve allegiance?",["Burke","Thoreau","Wolff","Marx"],0,"Prescription."],
 [3,"Philosophical anarchists claim…",["Violence is always justified","There is no general duty to obey the State as such","The State is divine","Only kings can make law"],1,"Wolff, Simmons."],
 [4,"Which is NOT a feature of civil disobedience in Rawls's account?",["Public","Non-violent","Secret","Conscientious"],2,"It is done openly."],
 [4,"Gandhi's Salt March of 1930 broke…",["The Rowlatt Act","The salt tax laws","The Arms Act","The Press Act"],1,"Dandi."],
 [4,"Refusing to sing the national anthem on religious grounds while standing respectfully was protected in…",["Bijoe Emmanuel v State of Kerala","Kesavananda Bharati","ADM Jabalpur","Golaknath"],0,"1986."],
 [4,"Thoreau refused to pay a tax because it supported…",["Railways","Slavery and the Mexican War","Schools","The army of India"],1,"1846."],
 [4,"Accepting the legal penalty is important in civil disobedience because it shows…",["Fear","Fidelity to law while protesting a particular law","Guilt","Weakness"],1,"Distinguishes it from rebellion."],
 [5,"Fundamental Duties were added to the Constitution by the…",["1st Amendment","42nd Amendment","44th Amendment","73rd Amendment"],1,"1976."],
 [5,"The duty of parents to provide education to children aged 6–14 was added by the…",["86th Amendment","42nd Amendment","52nd Amendment","101st Amendment"],0,"Article 51A(k), 2002."],
 [5,"T.H. Marshall's third stage of citizenship rights is…",["Civil","Political","Social","Divine"],2,"Welfare, education, health."],
 [5,"In Hohfeld's scheme, the correlative of a right is a…",["Privilege","Duty","Power","Immunity"],1,"Right ↔ duty."],
 [6,"Ambedkar called civil disobedience under a working constitution…",["The heart of democracy","The grammar of anarchy","A fundamental duty","A directive principle"],1,"Speech of 25 November 1949."],
 [6,"The right to assemble peaceably and without arms is in…",["Article 14","Article 19(1)(b)","Article 21","Article 32"],1,"Subject to Article 19(3)."],
 [6,"In S.G. Vombatkere v Union of India (2022), the Supreme Court…",["Upheld sedition fully","Kept s.124A IPC in abeyance","Created the offence of sedition","Abolished Article 19"],1,"Pending review."],
 [6,"Amit Sahni (2020) held that…",["Protests are illegal","Protest is a right but public roads cannot be occupied indefinitely","Only parties may protest","Protest needs a court order"],1,"Balancing rights."],
 [6,"Constitutional morality, as used by the Supreme Court in Navtej Johar (2018), protects…",["Majority opinion","Constitutional rights even against popular morality","Religious law only","Police discretion"],1,"Rights over majoritarian morality."]
];

//@@VIEWS
VIEWS.home = { html: homeView };

/* ---------------- UNIT 1 ---------------- */
const WHY_SVG=ringSVG("wy",[["Consent","I agreed"],["Gratitude","I benefited"],["Fair play","I share the burdens"],["Natural duty","Justice requires it"],["Utility","It does most good"],["Common good","It realises my will"]],"Grounds of political obligation","Why|obey?");
VIEWS.u1 = { html(){ return unitHead(1)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">The State commands; the question is whether we have a <b>moral duty</b> to obey, not merely a prudent reason to avoid punishment. A theory of political obligation must explain its <b>ground</b>, its <b>scope</b> (whom it binds, for which laws) and its <b>limits</b>.</div>
 <h4>Features a good theory should explain</h4><ul><li><b>Generality</b> – it binds most citizens, not only those who signed something.</li><li><b>Particularity</b> – it binds us to <i>our own</i> State, not to every just State.</li><li><b>Content-independence</b> – we obey because it is the law, not only when we agree with its content.</li><li><b>Limits</b> – when the duty gives way to conscience or resistance.</li></ul>
 <h4>The main answers</h4><table class="t"><tr><th>Ground</th><th>Core idea</th><th>Main difficulty</th></tr>
 <tr><td>Consent</td><td>We promised or agreed</td><td>Few actually consented</td></tr>
 <tr><td>Gratitude</td><td>We benefited from the State</td><td>Gratitude rarely demands obedience</td></tr>
 <tr><td>Fair play</td><td>We accept benefits of a cooperative scheme</td><td>Benefits forced on us – did we 'accept'?</td></tr>
 <tr><td>Natural duty</td><td>Duty to support just institutions</td><td>Why <i>my</i> State in particular?</td></tr>
 <tr><td>Utility</td><td>Obedience maximises welfare</td><td>Allows disobedience whenever it pays</td></tr>
 <tr><td>Common good / idealist</td><td>The State realises our rational will</td><td>Can justify an oppressive State</td></tr></table>
 <p>Philosophical anarchists argue none of these succeeds fully; most people still have good reasons to obey most laws.</p></div>
</div><div>
 ${animBox("wyAnim","Six answers to 'Why obey?'",WHY_SVG)}
 <div class="card lab"><h3>Which ground of obligation?</h3><div id="lab1"></div></div>
</div></div>`+unitFoot(1)+footer(); },
 init(){
  anim=flowAnim("wyAnim","wy",6,[
   "<b>Consent</b> – 'I am bound because I agreed.' Strong where there is a real oath or naturalisation; weak for those born here.",
   "<b>Gratitude</b> – 'The State protected and educated me.' Socrates's argument in the Crito.",
   "<b>Fair play</b> – 'I enjoy roads, security and courts that others pay for by obeying; I must do my share.' Hart, Rawls.",
   "<b>Natural duty</b> – 'Justice requires me to support just institutions.' Rawls's later view.",
   "<b>Utility</b> – 'Obedience produces more good than harm.' Bentham, Mill.",
   "<b>Common good</b> – 'The State secures the conditions for a good life; obeying it expresses my own rational will.' Hegel, Green. The arrows close the circle: in practice, citizens mix several of these reasons."],true);
  choiceLab("#lab1",[
   ["'I took an oath of allegiance when I became a citizen.'","CO","Express consent."],
   ["'Everyone else pays tax so we have roads and courts; free-riding would be unfair.'","FP","Fair play."],
   ["'Breaking traffic laws would cause more accidents than it would save time.'","UT","Utility."],
   ["'The State raised and educated me; I owe it.'","GR","Gratitude."],
   ["'The law here is just, and we all have a duty to support just institutions.'","ND","Natural duty."]
  ],{CO:"Consent",GR:"Gratitude",FP:"Fair play",ND:"Natural duty",UT:"Utility"});
  miniQuiz(1);
 }};

/* ---------------- UNIT 2 ---------------- */
VIEWS.u2 = { html(){ return unitHead(2)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">Contract theorists ground obligation in <b>agreement</b>: legitimate authority arises from the consent of free and equal persons. They differ sharply on <b>what</b> was agreed and therefore on <b>when</b> obligation ends.</div>
 <table class="t"><tr><th></th><th>Hobbes</th><th>Locke</th><th>Rousseau</th></tr>
 <tr><td>State of nature</td><td>War of all against all</td><td>Peaceful but insecure; natural rights</td><td>Free, equal, innocent</td></tr>
 <tr><td>Contract</td><td>Each gives up rights to a sovereign</td><td>Society by consent; government as trustee</td><td>Each gives himself to all – the general will</td></tr>
 <tr><td>Obligation</td><td>Near-absolute obedience</td><td>Obey a government that protects rights</td><td>Obey the general will = obey oneself</td></tr>
 <tr><td>Limit</td><td>Self-preservation</td><td>Breach of trust → resistance</td><td>Sovereignty cannot be represented or alienated</td></tr></table>
 <h4>Express and tacit consent</h4><p>Locke accepts that most people never sign anything; living in and enjoying property under a government is <b>tacit consent</b>. But only express consent makes one a full member.</p>
 <h4>Hume's critique (1748)</h4><ul><li>History shows governments founded on conquest and usurpation, not contracts.</li><li>Ordinary people have no idea that they consented.</li><li>Staying is not free consent when leaving is impossible – the poor peasant is like a man carried on board a ship asleep who must leap into the ocean to leave.</li><li>We obey because government is <b>useful</b> and because of habit; a promise cannot ground obligation, because promise-keeping itself needs explaining.</li></ul>
 <h4>Modern contractarians</h4><p>Rawls uses a <b>hypothetical</b> contract (the original position) to choose principles of justice; obligation then comes from fair play or natural duty, not from an actual promise. Critics: a hypothetical agreement is not an agreement (Dworkin).</p></div>
</div><div>
 <div class="card lab"><h3>Hobbes, Locke or Rousseau?</h3><div id="lab2"></div></div>
 <div class="card lab"><h3>Is it real consent?</h3><p>Decide whether each act would count as consent to political authority – and see what the critics say.</p><div id="lab2b"></div></div>
</div></div>`+unitFoot(2)+footer(); },
 init(){
  choiceLab("#lab2",[
   ["Covenants without the sword are but words.","H","Leviathan – a sovereign is needed to enforce agreements."],
   ["The people may remove a legislature that acts contrary to the trust reposed in it.","L","Second Treatise."],
   ["Each of us puts his person and power under the supreme direction of the general will.","R","The Social Contract, Book I."],
   ["The sovereign's power is not limited by any contract with the subjects.","H","The sovereign is not a party to the covenant."],
   ["Property was the main reason people entered civil society.","L","Preservation of property (life, liberty and estates)."]
  ],{H:"Hobbes",L:"Locke",R:"Rousseau"});
  choiceLab("#lab2b",[
   ["A foreign national takes an oath of allegiance on naturalisation.","Y","Express consent – the clearest case."],
   ["Voting in a general election.","D","Some (Plamenatz) treat voting as consent; others note that non-voters are bound too."],
   ["Simply being born and living in India.","D","Locke's tacit consent; Hume says this is not free consent."],
   ["Signing a contract with a private company.","N","Consent to the contract, not to the State's authority."]
  ],{Y:"Consent",D:"Disputed",N:"Not political consent"});
  miniQuiz(2);
 }};

/* ---------------- UNIT 3 ---------------- */
VIEWS.u3 = { html(){ return unitHead(3)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">Not every theory rests on consent. Some ground obligation in <b>God</b>, <b>tradition</b>, the <b>ethical life of the State</b> or <b>utility</b> – while Marxists and anarchists deny that any general obligation exists.</div>
 <h4>Divine and prescriptive theories</h4><p><b>Divine right</b>: rulers are God's agents; resistance is sin (Filmer, James I). <b>Prescription</b> (Burke): long-established institutions embody accumulated wisdom; society is a partnership across generations.</p>
 <h4>Idealist theory</h4><p><b>Hegel</b>: the State is 'the march of God in the world', the highest form of ethical life; real freedom is rational membership in it. <b>T.H. Green</b> softened this: the State exists to remove hindrances to the good life; 'will, not force, is the basis of the State'. Because its authority rests on the common good, citizens may have a <b>duty to resist</b> a State that clearly works against it – after exhausting lawful means.</p>
 <h4>Utilitarian theory</h4><p><b>Bentham</b>: obey while 'the probable mischiefs of obedience are less than the probable mischiefs of resistance'. <b>Mill</b> adds the value of liberty and individuality. Critics: it gives no stable duty – every law becomes a calculation; and it may sacrifice minorities.</p>
 <h4>Radical rejections</h4><ul><li><b>Marxist</b>: law and State are instruments of class rule; obligation is false consciousness; revolution, not obedience, is required. After revolution the State 'withers away' (Engels).</li><li><b>Anarchist</b>: Proudhon ('property is theft'), Bakunin, Kropotkin (mutual aid), Tolstoy (Christian non-resistance). Society can order itself without coercion.</li><li><b>Philosophical anarchism</b> (Wolff, Simmons): no general duty to obey, but no call to overthrow the State either.</li><li><b>Gandhi</b> described his ideal as an 'enlightened anarchy' in which each person rules herself; the State is 'violence in a concentrated and organised form'.</li></ul></div>
</div><div>
 <div class="card lab"><h3>Which theory speaks?</h3><div id="lab3"></div></div>
 <div class="card lab"><h3>Bentham's calculator</h3><p>Rate a proposed act of resistance. (A teaching device – not how anyone should decide in real life!)</p>
  <div class="row"><label>Harm of obeying the law <input type="range" id="bnO" min="0" max="10" value="6"></label><span id="bnOv"></span></div>
  <div class="row"><label>Harm caused by resisting <input type="range" id="bnR" min="0" max="10" value="4"></label><span id="bnRv"></span></div>
  <div class="row"><label>Chance resistance succeeds <input type="range" id="bnP" min="0" max="100" value="50"></label><span id="bnPv"></span></div><div id="bnOut" class="fb info"></div></div>
</div></div>`+unitFoot(3)+footer(); },
 init(){
  choiceLab("#lab3",[
   ["'Resisting the king is resisting God.'","DV","Divine right."],
   ["'The State removes obstacles to a good life; that is why I obey it.'","ID","Idealist (Green)."],
   ["'Law is the will of the ruling class made into statute.'","MX","Marxist."],
   ["'I obey only while obedience does more good than harm.'","UT","Utilitarian."],
   ["'People can organise schools, farms and courts by voluntary cooperation, without a State.'","AN","Anarchist (Kropotkin)."]
  ],{DV:"Divine right",ID:"Idealist",UT:"Utilitarian",MX:"Marxist",AN:"Anarchist"});
  const bn=()=>{ const o=+$("#bnO").value, r=+$("#bnR").value, p=+$("#bnP").value/100; $("#bnOv").textContent=o; $("#bnRv").textContent=r; $("#bnPv").textContent=(p*100)+"%";
   const gain=o*p, cost=r; $("#bnOut").innerHTML=`Expected harm avoided by resisting = ${o} × ${(p*100).toFixed(0)}% = <b>${gain.toFixed(1)}</b>; harm of resisting = <b>${cost}</b>. Bentham's answer: <b>${gain>cost?"resist":"obey"}</b>. Notice the problems: the numbers are guesses, the harm may fall on others, and the calculation changes with every law – which is why critics say utility gives no stable obligation.`; };
  ["bnO","bnR","bnP"].forEach(id=>$("#"+id).oninput=bn); bn();
  miniQuiz(3);
 }};

/* ---------------- UNIT 4 ---------------- */
const SG_SVG=flowSVG("sg",[["Injustice identified","the salt tax, 1882 Salt Act"],["Appeal and negotiation","letter to the Viceroy, 2 March 1930"],["Open, announced disobedience","Dandi march, 12 March – 6 April 1930"],["Non-violence under provocation","Dharasana, May 1930"],["Accept the penalty","mass arrests, over 60,000 jailed"],["Change through conscience","Gandhi–Irwin Pact, March 1931"]],"Steps of satyagraha");
VIEWS.u4 = { html(){ return unitHead(4)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key"><b>Civil disobedience</b> is a public, non-violent, conscientious breach of law aimed at changing a law or policy, with willingness to accept the punishment. It sits between lawful protest and revolution – disobedience <b>within</b> fidelity to law.</div>
 <h4>Thinkers</h4><ul><li><b>Locke</b>: a right of resistance – even revolution – when government breaks its trust.</li><li><b>Thoreau</b> (1849): conscience above majority; refused the poll tax that supported slavery.</li><li><b>Gandhi</b>: <b>satyagraha</b> – truth-force; non-violence (ahimsa), self-suffering, openness, no hatred of the opponent, readiness to negotiate; Champaran (1917), Salt March (1930), Quit India (1942).</li><li><b>Martin Luther King Jr.</b> (1963): an unjust law degrades human personality; break it 'openly, lovingly' and accept the penalty.</li><li><b>Rawls</b>: justified in a nearly just society when (1) there is a substantial and clear injustice, (2) normal appeals have failed, (3) it would not cause disorder if others in the same position did the same.</li></ul>
 <h4>Related ideas</h4><table class="t"><tr><th>Act</th><th>Aim</th><th>Method</th></tr>
 <tr><td>Lawful protest</td><td>Persuade</td><td>Within the law</td></tr><tr><td>Civil disobedience</td><td>Change a law or policy</td><td>Public, non-violent breach, accept penalty</td></tr>
 <tr><td>Conscientious objection</td><td>Keep one's conscience clean</td><td>Refuse a command; may be private</td></tr><tr><td>Revolution</td><td>Replace the system</td><td>May use force</td></tr></table>
 <h4>Indian law</h4><p><b>Bijoe Emmanuel v State of Kerala</b> (1986): expelling children who stood respectfully but did not sing the anthem violated Articles 19(1)(a) and 25 – 'our tradition teaches tolerance'. Article 25 also allows Sikhs to carry the kirpan. India has no conscription, so military conscientious objection has not arisen.</p></div>
</div><div>
 ${animBox("sgAnim","Satyagraha in action – the Salt March",SG_SVG)}
 <div class="card lab"><h3>Is it civil disobedience? (Rawls's test)</h3><p>Tick the features present in the act described.</p>
  <select id="cdCase" style="width:100%;margin-bottom:8px"></select>
  <div id="cdBoxes"></div><div class="row"><button class="btn" id="cdGo">Check</button></div><div id="cdOut"></div></div>
</div></div>`+unitFoot(4)+footer(); },
 init(){
  anim=flowAnim("sgAnim","sg",6,[
   "<b>Identify a clear injustice.</b> The salt tax burdened the poorest Indians for a basic need.",
   "<b>Appeal first.</b> Gandhi wrote to Lord Irwin listing grievances and announcing his plan – openness, not surprise.",
   "<b>Disobey openly.</b> 78 satyagrahis walked 385 km from Sabarmati to Dandi and made salt from seawater.",
   "<b>Stay non-violent.</b> At Dharasana, volunteers walked forward and were beaten without raising a hand – the world press reported it.",
   "<b>Accept the penalty.</b> Gandhi and tens of thousands were jailed. Accepting punishment shows respect for law as a whole.",
   "<b>Change by conscience.</b> The Gandhi–Irwin Pact released prisoners and allowed salt-making for personal use. Satyagraha aims to convert the opponent, not destroy him."]);
  const CASES2=[
   ["A student group blocks a highway for a day, announced in advance, peacefully, to protest a fee hike; members wait for arrest.",[1,1,1,1,1],"Meets all of Rawls's features – though blocking roads may still be lawfully restricted (Amit Sahni, 2020)."],
   ["Someone secretly evades income tax because they dislike government spending.",[0,1,0,0,0],"Secret and self-interested – ordinary tax evasion, not civil disobedience."],
   ["Activists damage a factory at night and flee, to stop pollution.",[0,0,1,0,0],"Covert and violent – sabotage, not civil disobedience."],
   ["A Jehovah's Witness pupil quietly declines to sing the anthem but stands respectfully.",[1,1,1,0,0],"Conscientious objection – not aimed at changing the law, and in Bijoe Emmanuel held lawful."]];
  const F=["Public (open, announced)","Non-violent","Conscientious (on grounds of justice, not self-interest)","Aimed at changing a law or policy","Willing to accept the penalty"];
  $("#cdCase").innerHTML=CASES2.map((c,i)=>`<option value="${i}">Case ${i+1}: ${esc(c[0].slice(0,70))}…</option>`).join("");
  const show=()=>{ const c=CASES2[+$("#cdCase").value]; $("#cdBoxes").innerHTML=`<p>${esc(c[0])}</p>`+F.map((f,i)=>`<label style="display:block"><input type="checkbox" data-f="${i}"> ${f}</label>`).join(""); $("#cdOut").innerHTML=""; };
  $("#cdCase").onchange=show; show();
  $("#cdGo").onclick=()=>{ const c=CASES2[+$("#cdCase").value]; const mine=$$("[data-f]").map(b=>b.checked?1:0); const right=mine.filter((v,i)=>v===c[1][i]).length;
   $("#cdOut").innerHTML=`<div class="fb ${right===5?"ok":"info"}">${right} of 5 features judged correctly. Present: ${c[1].map((v,i)=>v?F[i]:null).filter(Boolean).join("; ")||"none"}. ${esc(c[2])}</div>`; };
  miniQuiz(4);
 }};

/* ---------------- UNIT 5 ---------------- */
const DUTIES=[["To abide by the Constitution and respect its ideals, the National Flag and the National Anthem","a"],["To cherish the noble ideals of the freedom struggle","b"],["To uphold the sovereignty, unity and integrity of India","c"],["To defend the country and render national service when called upon","d"],["To promote harmony and renounce practices derogatory to the dignity of women","e"],["To preserve the rich heritage of our composite culture","f"],["To protect and improve the natural environment and have compassion for living creatures","g"],["To develop the scientific temper, humanism and the spirit of inquiry and reform","h"],["To safeguard public property and abjure violence","i"],["To strive towards excellence in all spheres","j"],["Parent or guardian to provide opportunities for education to a child between 6 and 14 years","k"]];
VIEWS.u5 = { html(){ return unitHead(5)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">Rights and duties are two sides of political membership. A <b>right</b> is a justified claim that others must respect; it imposes <b>duties</b> on others – and, many argue, on the right-holder towards the community.</div>
 <h4>Theories of rights</h4><table class="t"><tr><th>Theory</th><th>Rights come from…</th></tr>
 <tr><td>Natural rights</td><td>Human nature or reason (Locke); exist before the State</td></tr><tr><td>Legal rights</td><td>The State's law (Bentham: natural rights are 'nonsense upon stilts')</td></tr>
 <tr><td>Historical</td><td>Long custom (Burke)</td></tr><tr><td>Social welfare</td><td>Conditions society needs for the common good (Laski, Green)</td></tr>
 <tr><td>Marxist</td><td>Class relations; bourgeois rights protect property</td></tr><tr><td>Will and interest theories</td><td>Control over another's duty (Hart) / protection of an important interest (Raz)</td></tr></table>
 <h4>Rights and duties</h4><p><b>Hohfeld</b>: right ↔ duty, privilege ↔ no-right, power ↔ liability, immunity ↔ disability. Gandhi: 'the true source of rights is duty' – rights flow from duties well performed.</p>
 <h4>Fundamental Duties – Article 51A</h4><p>Added by the <b>42nd Amendment, 1976</b> on the Swaran Singh Committee's advice, inspired partly by the USSR constitution; clause (k) added by the <b>86th Amendment, 2002</b>. Not directly enforceable, but courts use them to interpret laws and uphold reasonable restrictions (AIIMS Students' Union, 2002; M.C. Mehta cases on environment).</p>
 <h4>Citizenship</h4><p><b>T.H. Marshall</b> (1950): civil rights (property, speech, justice), political rights (vote, office), social rights (education, health, welfare). Indian citizenship: Articles 5–11 and the Citizenship Act, 1955.</p></div>
</div><div>
 <div class="card lab"><h3>Find the Fundamental Duty</h3><p>Which clause of Article 51A applies? A fresh set each time.</p><div id="lab5"></div><div class="row"><button class="btn sm sec" id="lab5New">New set</button></div></div>
 <div class="card lab"><h3>Which theory of rights?</h3><div id="lab5b"></div></div>
</div></div>`+unitFoot(5)+footer(); },
 init(){
  const SC=[["A citizen plants trees and reports illegal sand mining.","g"],["A student refuses to join a mob burning a bus.","i"],["A volunteer speaks out against dowry in her village.","e"],["A parent enrols a 7-year-old in school.","k"],["A scientist debunks a viral health hoax with evidence.","h"],["An athlete trains hard to represent the country.","j"],["Citizens stand for the National Anthem.","a"],["A family preserves an old temple mural and folk songs.","f"]];
  const run=()=>{ const set=shuffle(SC).slice(0,4);
   $("#lab5").innerHTML=set.map((s,i)=>{ const right=DUTIES.find(d=>d[1]===s[1]); const wrong=shuffle(DUTIES.filter(d=>d[1]!==s[1])).slice(0,2); const opts=[right,...wrong].map(d=>`51A(${d[1]}): ${d[0]}`); return qHTML([5,s[0],opts,0,`Article 51A(${s[1]}).`],"fd"+i); }).join(""); bindQ($("#lab5")); };
  $("#lab5New").onclick=run; run();
  choiceLab("#lab5b",[
   ["'All men are endowed by their Creator with certain unalienable rights.'","NA","Natural rights (US Declaration, 1776)."],
   ["'Rights are what the law of the land gives – nothing more.'","LE","Legal theory (Bentham, Austin)."],
   ["'Every State is known by the rights it maintains' – rights are conditions of social life.","SW","Social welfare theory (Laski)."],
   ["'Rights of property are rights of the owning class.'","MA","Marxist."]
  ],{NA:"Natural",LE:"Legal",SW:"Social welfare",MA:"Marxist"});
  miniQuiz(5);
 }};

/* ---------------- UNIT 6 ---------------- */
VIEWS.u6 = { html(){ return unitHead(6)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">In constitutional India, the duty to obey rests on a democratic Constitution made in the people's name – and is limited by <b>fundamental rights</b>, <b>judicial review</b> and the <b>right to protest peacefully</b>.</div>
 <h4>Ambedkar's warning (25 November 1949)</h4><p>Ambedkar told the Constituent Assembly that, with constitutional methods now available, citizens must give up revolutionary methods, civil disobedience, non-cooperation and satyagraha – which he called 'the grammar of anarchy'. He also warned against hero-worship ('bhakti') in politics and said political democracy must rest on social democracy – liberty, equality and fraternity together.</p>
 <h4>Constitutional morality</h4><p>Ambedkar borrowed the phrase from Grote: respect for constitutional forms. The Supreme Court has used it to protect rights against majoritarian or 'popular' morality – Naz Foundation (Delhi HC, 2009), <b>Navtej Singh Johar</b> (2018), <b>Indian Young Lawyers Association</b> (Sabarimala, 2018).</p>
 <h4>When the State demands too much</h4><ul><li><b>The Emergency</b> (1975–77): rights suspended; in <b>ADM Jabalpur</b> (1976) the majority held that detainees could not approach courts; Justice H.R. Khanna dissented. The 44th Amendment (1978) made Articles 20 and 21 non-suspendable; Puttaswamy (2017) overruled ADM Jabalpur.</li><li><b>Sedition</b>: s.124A IPC; <b>Kedar Nath Singh</b> (1962) read it down to incitement to violence or public disorder; <b>S.G. Vombatkere</b> (2022) kept it in abeyance; the Bharatiya Nyaya Sanhita, 2023 replaced it with s.152 (acts endangering sovereignty, unity and integrity).</li></ul>
 <h4>The right to protest</h4><p>Article 19(1)(a) speech and 19(1)(b) assembly 'peaceably and without arms', subject to reasonable restrictions (public order, sovereignty) under Article 19(2)–(3). <b>Ramlila Maidan Incident</b> (2012): a midnight police action against sleeping protesters was unreasonable. <b>Mazdoor Kisan Shakti Sangathan</b> (2018): a blanket ban on protests at Jantar Mantar was struck down. <b>Amit Sahni</b> (2020): public ways cannot be occupied indefinitely.</p></div>
</div><div>
 <div class="card lab"><h3>Protected protest or lawful restriction?</h3><div id="lab6"></div></div>
 <div class="card lab"><h3>Order the events</h3><div id="lab6b"></div></div>
</div></div>`+unitFoot(6)+footer(); },
 init(){
  choiceLab("#lab6",[
   ["A peaceful, unarmed candle-light march with prior intimation to the police.","P","Article 19(1)(b)."],
   ["A crowd armed with sticks gathers outside a minister's house.","R","Not 'without arms'; public order."],
   ["A permanent blanket ban on all protests in the city centre.","X","Struck down as disproportionate (MKSS, 2018)."],
   ["A sit-in that blocks a main road for months.","R","Restrictions allowed (Amit Sahni, 2020)."],
   ["A speech criticising the government's farm policy in strong words.","P","Criticism is not sedition (Kedar Nath, 1962)."]
  ],{P:"Protected",R:"May be restricted",X:"Unconstitutional restriction"});
  orderLab("#lab6b",["Kedar Nath Singh reads down sedition (1962)","Emergency declared (June 1975)","ADM Jabalpur (April 1976)","44th Amendment protects Articles 20 and 21 (1978)","Puttaswamy overrules ADM Jabalpur (2017)","Sedition kept in abeyance – S.G. Vombatkere (2022)","Bharatiya Nyaya Sanhita in force (1 July 2024)"],"Chronological order.");
  miniQuiz(6);
 }};

/* ---------------- THINKERS ---------------- */
VIEWS.thinkers = { html(){ return `<div class="unitban"><div class="k">Revise</div><h2>Thinkers</h2><p>${THINKERS.length} thinkers on obligation and disobedience, in time order. Search by name or idea.</p></div>
 <div class="card"><input type="text" id="thS" class="search" placeholder="Search…"></div><div class="casecards" id="thB"></div>`+footer(); },
 init(){ const draw=()=>{ const q=$("#thS").value.toLowerCase(); $("#thB").innerHTML=THINKERS.filter(t=>t.join(" ").toLowerCase().includes(q)).map(t=>`<div class="cc"><b>${esc(t[0])}</b><span class="cit">${esc(t[1])}</span><p>${esc(t[2])}</p></div>`).join(""); }; draw(); $("#thS").oninput=draw; }};

/* ---------------- REFERENCES ---------------- */
VIEWS.refs = { html(){ return `<div class="unitban"><div class="k">Read further</div><h2>References</h2><p>Books are in the TNNLU library; online sources need internet.</p></div>
 <div class="two"><div class="card"><h3>Books</h3><table class="t"><tr><th>Book</th><th>Use it for</th></tr>
 <tr><td>O.P. Gauba, <i>An Introduction to Political Theory</i>, National Paperbacks</td><td>Chapters on obligation, rights, resistance</td></tr>
 <tr><td>Rajeev Bhargava and Ashok Acharya (eds), <i>Political Theory: An Introduction</i>, Pearson</td><td>Rights, citizenship, obligation</td></tr>
 <tr><td>A. John Simmons, <i>Moral Principles and Political Obligations</i>, Princeton</td><td>The classic analysis of each theory</td></tr>
 <tr><td>T.H. Green, <i>Lectures on the Principles of Political Obligation</i></td><td>Idealist theory (public domain)</td></tr>
 <tr><td>Henry David Thoreau, <i>Civil Disobedience</i>; M.K. Gandhi, <i>Hind Swaraj</i></td><td>Short primary texts (public domain)</td></tr>
 <tr><td>John Rawls, <i>A Theory of Justice</i>, ch. 6</td><td>Civil disobedience and fair play</td></tr>
 <tr><td>Granville Austin, <i>Working a Democratic Constitution</i>, OUP</td><td>Emergency and Indian constitutional practice</td></tr></table></div>
 <div><div class="card"><h3>Online</h3><ul>
 <li><a href="https://plato.stanford.edu/entries/political-obligation/" target="_blank" rel="noopener">Stanford Encyclopedia: Political Obligation</a></li>
 <li><a href="https://plato.stanford.edu/entries/civil-disobedience/" target="_blank" rel="noopener">Stanford Encyclopedia: Civil Disobedience</a></li>
 <li><a href="https://eparlib.nic.in" target="_blank" rel="noopener">Constituent Assembly Debates</a> – Ambedkar's speech of 25 November 1949</li>
 <li><a href="https://indiankanoon.org" target="_blank" rel="noopener">Indian Kanoon</a> – Bijoe Emmanuel, Kedar Nath, Amit Sahni, MKSS</li>
 <li><a href="https://www.mkgandhi.org" target="_blank" rel="noopener">mkgandhi.org</a> – Gandhi's writings on satyagraha</li></ul></div>
 <div class="card"><h3>Earlier</h3><p><a href="/tools/llb-ba-political-science-1.html">Political Science I – Political Theory and Organisation</a>.</p></div></div></div>`+footer(); }};
