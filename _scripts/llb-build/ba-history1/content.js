/*
TOOL:    ba-history1/content.js — History I: Indian History (B.A. LL.B. Semester II), assembled by build.py
FAMILY:  law-explorers
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    Kaavya Study Materials – TNNLU B.A. LL.B. Semester I and II explorers (claude.ai, 2026-11-22)
CHANGES: 1.0.0 - first version
*/
const UNITS = [
 {id:"u1", n:1, title:"Sources and the Harappan Civilisation", short:"How historians know the past; archaeological, literary and foreign sources; the Indus cities."},
 {id:"u2", n:2, title:"Vedic Age to the Mauryan Empire", short:"Vedic society and assemblies; Mahajanapadas; Buddhism and Jainism; Mauryan administration, Arthashastra, Ashoka's dhamma."},
 {id:"u3", n:3, title:"Classical Age and the South", short:"Guptas and the Dharmashastras; Sangam Tamilakam; Pallavas and Cholas – village assemblies of Uttaramerur."},
 {id:"u4", n:4, title:"Medieval India", short:"Delhi Sultanate; Vijayanagara; the Mughals – mansabdari, revenue and justice; Bhakti and Sufi movements."},
 {id:"u5", n:5, title:"Company Rule and the Revolt of 1857", short:"Europeans in India; Plassey and Buxar; revenue settlements; reforms; the Revolt of 1857 and Crown rule."},
 {id:"u6", n:6, title:"The National Movement and Independence", short:"Congress, moderates and extremists; Gandhian mass movements; constitutional reforms; Tamil Nadu's movements; Partition and 1947."}
];
const EXTRAS = [
 {id:"timeline", ic:"🕰️", title:"Timeline"},
 {id:"flash", ic:"🃏", title:"Flashcards"},
 {id:"quiz", ic:"✅", title:"Quiz"},
 {id:"refs", ic:"📚", title:"References"}
];
const CASES = [], MAXIMS = [];
const HOME = {
 title:"History I – Indian History",
 intro:["Indian law did not begin in 1950. Ideas of dharma and danda, village assemblies, royal courts and qazis, Company courts and revenue settlements, and the freedom struggle all shaped the institutions you will study. This course surveys Indian history from the Indus cities to Independence, with an eye on governance, law and society.",
  "Each unit has a timeline-ordering lab, and the Timeline page lets you filter about seventy key dates by era."],
 tips:["Learn history as a chain of causes: ask 'why then?' and 'what changed after?' for every event.","For each period note three things: how the State was organised, how revenue was raised, how disputes were settled.","Visit the Timeline page weekly – order is half the battle in history.","Read one primary source per unit: an Ashokan edict, a Thirukkural chapter, Babur's memoirs, Gandhi's Dandi speech.","Connect with Legal History (Semester IV), which takes up the courts and codes in detail."],
 about:"TNNLU's course list names this paper 'History – I (Indian History)'. The units follow the standard first-year Indian history paper of law universities – ancient to modern – with extra attention to Tamil Nadu and to law and administration. Compare with TNNLU's own course outline when it is issued."
};
const FOOT = "History I explorer · v1.0.0 · Reference material for second-semester B.A. LL.B. students, based on the usual Indian history syllabus of law universities. Dates follow standard textbooks; some ancient dates are approximate. Always check against your own course outline.";

/* timeline: [year (negative = BCE), label, unit] */
const TL = [
 [-2600,"Mature Harappan cities – Mohenjo-daro, Harappa, Dholavira, Lothal",1],[-1900,"Decline of Harappan cities",1],[-1500,"Early Vedic period begins (Rig Veda)",2],[-1000,"Later Vedic period; iron; varna hardens",2],
 [-600,"Sixteen Mahajanapadas",2],[-563,"Traditional date of the Buddha's birth (c.)",2],[-540,"Mahavira (c.)",2],[-326,"Alexander reaches the Indus",2],[-321,"Chandragupta Maurya founds the Mauryan empire",2],[-268,"Ashoka becomes emperor (c.)",2],[-261,"Kalinga war (c.)",2],
 [-185,"End of the Mauryas (c.)",2],[-300,"Sangam age begins in Tamilakam (c. 3rd c. BCE – 3rd c. CE)",3],[100,"Kushanas; Satavahanas; Roman trade with Muziris and Arikamedu",3],[200,"Manusmriti takes final form (c. 200 BCE – 200 CE)",3],[320,"Gupta empire founded (Chandragupta I)",3],
 [400,"Narada and Brihaspati smritis (c.)",3],[405,"Fa-Hien in India (c. 399–412)",3],[600,"Pallavas of Kanchi; Bhakti of the Alvars and Nayanmars",3],[630,"Hiuen Tsang in India (c. 630–645)",3],[920,"Uttaramerur inscriptions of Parantaka Chola – village elections (919/921)",3],[985,"Rajaraja Chola I",3],[1010,"Brihadeeswarar temple, Thanjavur",3],[1025,"Rajendra Chola's northern and maritime campaigns",3],
 [1192,"Second battle of Tarain",4],[1206,"Delhi Sultanate begins (Qutbuddin Aibak)",4],[1316,"Alauddin Khalji's market control ends with his death",4],[1336,"Vijayanagara founded",4],[1398,"Timur sacks Delhi",4],[1498,"Vasco da Gama reaches Calicut",5],[1526,"First battle of Panipat – Babur founds the Mughal empire",4],[1540,"Sher Shah Suri defeats Humayun",4],[1556,"Akbar becomes emperor",4],[1565,"Battle of Talikota",4],[1600,"English East India Company chartered",5],[1639,"Madras (Fort St George) founded",5],[1707,"Death of Aurangzeb",4],
 [1757,"Battle of Plassey",5],[1764,"Battle of Buxar",5],[1765,"Company gets the Diwani of Bengal",5],[1773,"Regulating Act",5],[1793,"Permanent Settlement (Cornwallis)",5],[1799,"Fall of Tipu Sultan",5],[1801,"Execution of Maruthu brothers; Carnatic annexed",5],[1806,"Vellore mutiny",5],[1820,"Ryotwari in Madras (Munro, Governor 1820)",5],[1829,"Sati abolished (Bentinck)",5],[1835,"Macaulay's Minute on education",5],[1856,"Hindu Widows' Remarriage Act",5],[1857,"Revolt of 1857",5],[1858,"Government of India Act – Crown rule",5],[1860,"Indian Penal Code",5],
 [1885,"Indian National Congress founded",6],[1905,"Partition of Bengal; Swadeshi movement",6],[1907,"Surat split – moderates and extremists",6],[1909,"Morley–Minto reforms",6],[1915,"Gandhi returns from South Africa",6],[1917,"Champaran satyagraha",6],[1919,"Jallianwala Bagh; Montagu–Chelmsford reforms",6],[1920,"Non-Cooperation movement",6],[1925,"Self-Respect Movement (Periyar)",6],[1930,"Salt March; Vedaranyam salt satyagraha (Rajaji)",6],[1932,"Poona Pact",6],[1935,"Government of India Act",6],[1942,"Quit India movement",6],[1946,"Constituent Assembly meets (9 December)",6],[1947,"Independence and Partition (15 August)",6],[1950,"Constitution comes into force (26 January)",6]
];

const FLASH = [
 ["Primary source","Evidence from the period itself – inscriptions, coins, texts, monuments."],
 ["Epigraphy","Study of inscriptions – the most reliable source for early Indian dates and grants."],
 ["Numismatics","Study of coins."],
 ["Harappan town planning","Grid streets, covered drains, citadel and lower town, standard bricks (1:2:4), the Great Bath at Mohenjo-daro."],
 ["Sabha and Samiti","Vedic assemblies that advised and checked the king."],
 ["Mahajanapadas","Sixteen great states of the 6th century BCE – e.g. Magadha, Kosala, Vajji (a republic)."],
 ["Arthashastra","Kautilya's treatise on statecraft, economy and law; saptanga theory; dharmasthiya and kantakashodhana courts."],
 ["Dhamma","Ashoka's moral code – tolerance, non-violence, respect for elders, welfare – spread through rock and pillar edicts."],
 ["Dharmashastras","Sanskrit law texts – Manu, Yajnavalkya, Narada, Brihaspati – sources of classical Hindu law."],
 ["Sangam literature","Early Tamil poetry (Ettuthokai, Pathupattu) of the three crowned kings – Chera, Chola, Pandya."],
 ["Thirukkural","Thiruvalluvar's 1,330 couplets on virtue (aram), wealth (porul) and love (inbam)."],
 ["Uttaramerur inscriptions","Parantaka Chola I's records (919/921 CE) of election by lot (kudavolai) to village committees, with qualifications and disqualifications."],
 ["Ur and sabha","Chola village assemblies – ur of general villages, sabha of brahmadeya villages."],
 ["Iqta","Delhi Sultanate assignment of revenue from a territory to an officer (iqtadar) in return for service."],
 ["Qazi","Muslim judge applying Sharia in civil and religious matters under the Sultanate and Mughals."],
 ["Mansabdari","Akbar's system ranking officials by zat (personal rank) and sawar (cavalry)."],
 ["Zabt / dahsala","Todar Mal's revenue system based on measured land and average yields of ten years."],
 ["Sulh-i-kul","Akbar's policy of universal peace and religious tolerance."],
 ["Bhakti movement","Devotional movement – Alvars and Nayanmars in Tamil Nadu, later Kabir, Mirabai, Tulsidas."],
 ["Diwani","Right to collect revenue and decide civil cases – granted to the Company in Bengal in 1765."],
 ["Regulating Act, 1773","First parliamentary control of the Company; Governor-General of Bengal; Supreme Court at Calcutta (1774)."],
 ["Permanent Settlement","1793, Bengal: zamindars' revenue fixed for ever; zamindars made owners."],
 ["Ryotwari","Settlement directly with the cultivator (ryot) – Madras and Bombay; Thomas Munro."],
 ["Mahalwari","Settlement with the village community (mahal) – North-West Provinces and Punjab."],
 ["Doctrine of Lapse","Dalhousie's policy of annexing states whose rulers died without a natural heir."],
 ["Revolt of 1857","Began at Meerut on 10 May 1857; ended Company rule – Government of India Act, 1858."],
 ["Moderates","Early Congress leaders (Naoroji, Gokhale) – petitions, reform within the system; drain theory."],
 ["Extremists","Lal-Bal-Pal and Aurobindo – swadeshi, boycott, 'Swaraj is my birthright'."],
 ["Self-Respect Movement","Founded by E.V. Ramasamy (Periyar) in 1925 against caste and for rationalism and women's rights."],
 ["Government of India Act, 1935","Provincial autonomy, proposed federation, Federal Court (1937) – much of it reused in the Constitution."],
 ["Poona Pact","1932 agreement between Gandhi and Ambedkar: reserved seats for depressed classes in place of separate electorates."]
];

const QUIZ = [
 [1,"Which is a primary source?",["A modern textbook","An Ashokan edict","A documentary film","An encyclopedia"],1,"Contemporary evidence."],
 [1,"The Great Bath was found at…",["Harappa","Mohenjo-daro","Lothal","Kalibangan"],1,"Mohenjo-daro."],
 [1,"Lothal is known for its…",["Dockyard","Great Bath","Iron pillar","Stupa"],0,"Gujarat, maritime trade."],
 [1,"The Harappan script…",["Was read by Prinsep","Remains undeciphered","Is Brahmi","Is Tamil-Brahmi"],1,"Not yet deciphered."],
 [2,"The Vedic assemblies that advised the king were…",["Sabha and Samiti","Ur and Nadu","Iqta and Mansab","Diwan and Nizam"],0,"Early Vedic."],
 [2,"Who wrote the Arthashastra?",["Megasthenes","Kautilya","Banabhatta","Kalidasa"],1,"Also called Chanakya."],
 [2,"Ashoka adopted dhamma after the…",["Battle of Plassey","Kalinga war","Battle of Tarain","Battle of Hydaspes"],1,"Rock Edict XIII describes his remorse."],
 [2,"Megasthenes, the Greek ambassador, wrote…",["Indica","Rajatarangini","Ain-i-Akbari","Si-yu-ki"],0,"At Chandragupta's court."],
 [2,"Vajji (Vrijji) among the Mahajanapadas was a…",["Monarchy","Republic (gana-sangha)","Empire","Colony"],1,"Lichchhavi confederacy."],
 [3,"The Uttaramerur inscriptions describe…",["Temple dance","Elections to village committees by lot","Mughal revenue","Buddhist councils"],1,"Kudavolai system."],
 [3,"Thirukkural is divided into…",["Two parts","Three parts – aram, porul, inbam","Four Vedas","Ten books"],1,"Virtue, wealth, love."],
 [3,"The Brihadeeswarar temple at Thanjavur was built by…",["Rajaraja Chola I","Narasimhavarman","Krishnadevaraya","Samudragupta"],0,"Completed c. 1010."],
 [3,"Which Chinese pilgrim visited during Harsha's reign?",["Fa-Hien","Hiuen Tsang","I-Tsing","Marco Polo"],1,"c. 630–645."],
 [3,"The Gupta period is often called the 'classical age' because of…",["Colonial rule","Achievements in art, literature, science and law texts","Mughal architecture","Railways"],1,"Kalidasa, Aryabhata, smritis."],
 [4,"The iqta system belongs to the…",["Mauryas","Delhi Sultanate","Cholas","Company"],1,"Revenue assignment."],
 [4,"Akbar's revenue minister who introduced the zabt system was…",["Birbal","Todar Mal","Abul Fazl","Bairam Khan"],1,"Dahsala."],
 [4,"Mansabdari ranks were expressed as…",["Zat and sawar","Ur and sabha","Diwan and nizamat","Varna and jati"],0,"Personal and cavalry rank."],
 [4,"Vijayanagara was defeated at the battle of…",["Panipat","Talikota","Haldighati","Plassey"],1,"1565."],
 [5,"The Company received the Diwani of Bengal in…",["1757","1765","1773","1793"],1,"Treaty of Allahabad after Buxar."],
 [5,"The Permanent Settlement was introduced by…",["Warren Hastings","Cornwallis","Wellesley","Dalhousie"],1,"1793."],
 [5,"Ryotwari settlement in Madras is associated with…",["Thomas Munro","Lord Clive","Macaulay","Curzon"],0,"Settlement with cultivators."],
 [5,"The Vellore mutiny took place in…",["1806","1857","1799","1919"],0,"A precursor of 1857, in Tamil Nadu."],
 [5,"After 1857, Company rule was ended by the…",["Regulating Act","Government of India Act, 1858","Charter Act, 1833","Indian Councils Act, 1909"],1,"Crown rule."],
 [6,"The Indian National Congress was founded in…",["1857","1885","1905","1920"],1,"Bombay, A.O. Hume."],
 [6,"'Swaraj is my birthright and I shall have it' – who?",["Gokhale","Tilak","Nehru","Gandhi"],1,"Bal Gangadhar Tilak."],
 [6,"The Vedaranyam salt satyagraha (1930) was led by…",["Periyar","C. Rajagopalachari","Kamaraj","V.O. Chidambaram"],1,"Tamil Nadu's Dandi."],
 [6,"The Poona Pact (1932) was between Gandhi and…",["Jinnah","Ambedkar","Nehru","Irwin"],1,"Reserved seats instead of separate electorates."],
 [6,"Which Act introduced provincial autonomy?",["1909","1919","1935","1947"],2,"Government of India Act, 1935."],
 [6,"The Self-Respect Movement was started by…",["E.V. Ramasamy (Periyar)","Subramania Bharati","Annadurai","Kamaraj"],0,"1925."]
];

//@@VIEWS
VIEWS.home = { html: homeView };
const yr=y=>y<0?`${-y} BCE`:`${y} CE`.replace(/ CE$/, y<1000?" CE":"");
function tlLab(sel, unit, k){ const ev=shuffle(TL.filter(t=>t[2]===unit)).slice(0,k||5).sort((a,b)=>a[0]-b[0]); orderLab(sel, ev.map(e=>e[1]), "Earliest first: "+ev.map(e=>yr(e[0])).join(" → ")+"."); }

/* ---------------- UNIT 1 ---------------- */
VIEWS.u1 = { html(){ return unitHead(1)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">History is an argument from <b>evidence</b>. Historians combine <b>archaeology</b>, <b>inscriptions and coins</b>, <b>literary texts</b> and <b>foreign accounts</b>, checking each against the others.</div>
 <h4>Kinds of sources</h4><table class="t"><tr><th>Kind</th><th>Examples</th><th>Care needed</th></tr>
 <tr><td>Archaeological</td><td>Harappan sites, Arikamedu, Keezhadi (Madurai, excavations from 2015)</td><td>Dating methods; interpretation</td></tr>
 <tr><td>Inscriptions (epigraphy)</td><td>Ashokan edicts, Uttaramerur, temple grants</td><td>Royal propaganda; need deciphering (James Prinsep read Brahmi in 1837)</td></tr>
 <tr><td>Coins (numismatics)</td><td>Punch-marked coins, Gupta gold coins, Roman coins in Tamil Nadu</td><td>Show trade and rulers, not daily life</td></tr>
 <tr><td>Literary – religious</td><td>Vedas, Buddhist Jatakas, Jain texts</td><td>Written for faith, often later than events</td></tr>
 <tr><td>Literary – secular</td><td>Arthashastra, Sangam poems, Kalhana's Rajatarangini</td><td>Authors' biases</td></tr>
 <tr><td>Foreign accounts</td><td>Megasthenes, Fa-Hien, Hiuen Tsang, Al-Biruni, Ibn Battuta</td><td>Outsiders may misunderstand</td></tr></table>
 <h4>The Harappan civilisation (c. 2600–1900 BCE, mature phase)</h4><ul><li>Sites: Harappa, Mohenjo-daro (Pakistan); Dholavira, Lothal (Gujarat); Kalibangan (Rajasthan); Rakhigarhi (Haryana).</li><li>Planned cities: grid streets, covered drains, standard burnt bricks, citadel and lower town, the Great Bath, granaries, Lothal dockyard.</li><li>Standard weights and seals point to organised trade, including with Mesopotamia.</li><li>Script still undeciphered – so we know little about its law or rulers.</li><li>Decline: climate change, shifting rivers, decline of trade – not a single 'Aryan invasion'.</li></ul></div>
</div><div>
 <div class="card lab"><h3>What kind of source?</h3><div id="lab1"></div></div>
 <div class="card lab"><h3>Harappan or not?</h3><div id="lab1b"></div></div>
</div></div>`+unitFoot(1)+footer(); },
 init(){
  choiceLab("#lab1",[
   ["Ashoka's Rock Edict XIII at Shahbazgarhi.","IN","Inscription."],
   ["Roman gold coins found near Coimbatore.","CO","Numismatic."],
   ["Hiuen Tsang's travel record, Si-yu-ki.","FO","Foreign account."],
   ["Pottery and a brick wall excavated at Keezhadi.","AR","Archaeological."],
   ["The Sangam poem collection Purananuru.","LI","Literary."]
  ],{AR:"Archaeological",IN:"Inscription",CO:"Coin",LI:"Literary",FO:"Foreign account"});
  choiceLab("#lab1b",[
   ["Covered drains and grid-pattern streets.","Y","Harappan town planning."],
   ["Iron ploughs and horse-drawn chariots in large numbers.","N","Iron and horses belong to later periods."],
   ["Standard bricks in the ratio 1:2:4.","Y","Uniform across sites."],
   ["Brahmi inscriptions of a king's victories.","N","Brahmi appears in Mauryan times; the Harappan script is undeciphered."]
  ],{Y:"Harappan",N:"Not Harappan"});
  miniQuiz(1);
 }};

/* ---------------- UNIT 2 ---------------- */
VIEWS.u2 = { html(){ return unitHead(2)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">From tribal chiefdoms to the first great empire: Vedic assemblies, the rise of kingdoms and republics, new religions that questioned ritual and hierarchy, and a Mauryan State with a theory of government (<b>Arthashastra</b>) and a public ethic (<b>Ashoka's dhamma</b>).</div>
 <h4>Vedic age</h4><p><b>Early Vedic</b> (c. 1500–1000 BCE): pastoral tribes (jana) led by a rajan; assemblies – <b>sabha</b>, <b>samiti</b>, vidatha; women attended some assemblies. <b>Later Vedic</b> (c. 1000–600 BCE): agriculture with iron, territorial kingdoms (janapada), elaborate sacrifices, a hardening <b>varna</b> order; Upanishads question ritual.</p>
 <h4>Mahajanapadas and new faiths (6th c. BCE)</h4><p>Sixteen states – monarchies like Magadha and Kosala, republics (gana-sanghas) like the Vajji confederacy. <b>Buddha</b> (Four Noble Truths, Eightfold Path, the sangha's democratic rules) and <b>Mahavira</b> (ahimsa, five vows) challenged Brahmanical ritual and caste.</p>
 <h4>The Mauryas (c. 321–185 BCE)</h4><ul><li><b>Chandragupta</b> with Kautilya's help; Megasthenes's <i>Indica</i> describes Pataliputra.</li><li><b>Arthashastra</b>: saptanga theory; departments under adhyakshas; spies; two kinds of courts – <b>dharmasthiya</b> (civil) and <b>kantakashodhana</b> ('removing thorns' – criminal/administrative); four sources of law: dharma, vyavahara (evidence), charitra (custom), rajasasana (royal edict) – with royal edict prevailing in conflict.</li><li><b>Ashoka</b> (c. 268–232 BCE): Kalinga war; <b>dhamma</b> – tolerance, non-violence, care for animals, respect for parents and teachers, welfare (wells, rest-houses, medical care); <b>dhamma-mahamattas</b>; edicts in Prakrit, Greek and Aramaic.</li></ul></div>
</div><div>
 <div class="card lab"><h3>Read an edict</h3><div class="act" style="white-space:normal">A paraphrase of Rock Edict XII: <i>The king honours all sects – ascetics and householders – with gifts and honours. But he values more the growth of their essentials. Its root is restraint of speech: one should not praise one's own sect and condemn another's without reason. By honouring other sects one strengthens one's own; by harming them one harms one's own. Concord is good: let all listen to and respect one another's teachings.</i></div><div id="edBox"></div></div>
 <div class="card lab"><h3>Put in order</h3><div id="lab2"></div><div class="row"><button class="btn sm sec" id="lab2New">New set</button></div></div>
</div></div>`+unitFoot(2)+footer(); },
 init(){
  const Q=[[2,"The main value of this edict is…",["Military conquest","Religious tolerance and restraint of speech","Tax collection","Caste duties"],1,"Concord among sects."],
   [2,"Which modern constitutional value does it echo?",["Article 25 and secularism – respect for all faiths","Article 356","Seventh Schedule","Article 368"],0,"Freedom of religion and mutual respect."],
   [2,"According to the edict, harming other sects…",["Strengthens your own","Harms your own","Is required","Is a duty of kings"],1,"A striking argument from self-interest for tolerance."]];
  $("#edBox").innerHTML=Q.map((q,i)=>qHTML(q,"ed"+i)).join(""); bindQ($("#edBox"));
  const run=()=>tlLab("#lab2",2,5); $("#lab2New").onclick=run; run();
  miniQuiz(2);
 }};

/* ---------------- UNIT 3 ---------------- */
const UT_SVG=flowSVG("ut",[["The village is divided into 30 wards (kudumbu)","Uttaramerur, Parantaka Chola I, 919/921 CE"],["Qualified candidates nominated","owns land, own house, 35–70 years, learned in Vedas"],["Disqualified persons excluded","defaulters on accounts, offenders, their relatives"],["Names written on palm leaves, put in a pot (kudam)","kudavolai – election by lot"],["A young boy draws one leaf per ward","publicly, before the assembly"],["Committees formed for a year","garden, tank, justice, gold – accounts audited"]],"Uttaramerur kudavolai");
VIEWS.u3 = { html(){ return unitHead(3)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">The classical age produced the great law texts (<b>Dharmashastras</b>) in the north; the south produced <b>Sangam</b> literature, the ethical code of the <b>Thirukkural</b>, and the remarkably detailed <b>village self-government</b> of the Cholas.</div>
 <h4>The Guptas (c. 320–550 CE)</h4><p>Samudragupta's conquests (Allahabad pillar inscription by Harisena); Chandragupta II; Kalidasa, Aryabhata; Nalanda. The <b>smritis</b> of Yajnavalkya, Narada and Brihaspati developed <b>vyavahara</b> (procedure) – plaint, reply, evidence (documents, witnesses, possession), ordeals, and a hierarchy of courts from family and guild bodies (kula, shreni, puga) up to the king.</p>
 <h4>Sangam Tamilakam (c. 3rd c. BCE – 3rd c. CE)</h4><p>Three crowned kings – Chera, Chola, Pandya; poems of <b>akam</b> (love) and <b>puram</b> (war, ethics, kings); <b>Tolkappiyam</b> (grammar); trade with Rome through Muziris and Arikamedu. The <b>Thirukkural</b> (c. 4th–5th c. CE) of Thiruvalluvar – 133 chapters on aram (virtue), porul (wealth and polity) and inbam (love) – includes chapters on the just sceptre (sengonmai) and the cruel sceptre (kodungonmai).</p>
 <h4>Pallavas and Cholas</h4><ul><li><b>Pallavas</b> of Kanchi (c. 6th–9th c.): Mamallapuram's shore temple and rathas; Bhakti saints – Alvars (Vishnu) and Nayanmars (Shiva).</li><li><b>Imperial Cholas</b> (c. 850–1279): Rajaraja I and Rajendra I; Brihadeeswarar temple; naval expeditions to Sri Lanka and Southeast Asia.</li><li><b>Local government</b>: nadu (district assembly), <b>ur</b> (village assembly), <b>sabha</b> (brahmadeya village assembly), nagaram (merchants). Committees (variyam) handled tanks, gardens, justice and temple affairs.</li></ul></div>
</div><div>
 ${animBox("utAnim","Election by lot at Uttaramerur",UT_SVG)}
 <div class="card lab"><h3>Which dynasty or text?</h3><div id="lab3"></div></div>
 <div class="card lab"><h3>Put in order</h3><div id="lab3b"></div><div class="row"><button class="btn sm sec" id="lab3New">New set</button></div></div>
</div></div>`+unitFoot(3)+footer(); },
 init(){
  anim=flowAnim("utAnim","ut",6,[
   "<b>Wards.</b> The inscriptions of Parantaka Chola I at Uttaramerur (Kanchipuram district) divide the village into 30 wards.",
   "<b>Qualifications.</b> A candidate must own some land and a house, be between 35 and 70, and be learned and of good conduct.",
   "<b>Disqualifications.</b> Those who had not submitted accounts of earlier office, had committed offences, or were close relatives of such persons, were barred – an early idea of accountability.",
   "<b>Kudavolai.</b> Names of eligible persons from each ward were written on palm leaves and placed in a pot.",
   "<b>Drawing lots.</b> A young boy drew one leaf for each ward before the full assembly – chosen so that the draw was seen to be fair.",
   "<b>Committees.</b> Those chosen formed the annual committee, garden committee, tank committee and others; corrupt members could be removed. Indian Prime Ministers have cited Uttaramerur as an early example of local democracy."]);
  choiceLab("#lab3",[
   ["Built the Brihadeeswarar temple at Thanjavur.","CH","Rajaraja Chola I."],
   ["Built the shore temple at Mamallapuram.","PA","Pallavas."],
   ["Samudragupta's victories recorded on the Allahabad pillar.","GU","Guptas."],
   ["Divides life into aram, porul and inbam in 1,330 couplets.","TK","Thirukkural."],
   ["Ruled from Madurai in the Sangam age.","PD","Pandyas."]
  ],{GU:"Guptas",PA:"Pallavas",CH:"Cholas",PD:"Pandyas",TK:"Thirukkural"});
  const run=()=>tlLab("#lab3b",3,5); $("#lab3New").onclick=run; run();
  miniQuiz(3);
 }};

/* ---------------- UNIT 4 ---------------- */
VIEWS.u4 = { html(){ return unitHead(4)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">Medieval States built strong revenue and military systems – the <b>iqta</b> of the Sultanate, the <b>mansabdari</b> and <b>zabt</b> of the Mughals – and administered justice through <b>qazis</b>, royal courts and local bodies, while <b>Bhakti</b> and <b>Sufi</b> movements reshaped religious life.</div>
 <h4>Delhi Sultanate (1206–1526)</h4><p>Dynasties: Mamluk (Slave), Khalji, Tughlaq, Sayyid, Lodi. <b>Iqta</b> system; <b>Alauddin Khalji</b>'s market control and land measurement; <b>Muhammad bin Tughlaq</b>'s token currency and capital shift to Daulatabad. Justice: the Sultan as final court; <b>qazis</b> for Sharia matters; customary law for non-Muslims in personal matters.</p>
 <h4>Vijayanagara (1336–1565)</h4><p>Founded by Harihara and Bukka; <b>Krishnadevaraya</b> (1509–29), author of <i>Amuktamalyada</i>; <b>nayankara</b> system of military chiefs – the origin of the Nayaks of Madurai and Thanjavur; defeated at <b>Talikota</b> (1565).</p>
 <h4>The Mughals (1526–1857)</h4><ul><li><b>Babur</b> (Panipat, 1526); <b>Sher Shah Suri</b>'s interlude – rupiya coin, Grand Trunk Road, land survey.</li><li><b>Akbar</b> (1556–1605): <b>mansabdari</b> (zat and sawar ranks); <b>zabt / dahsala</b> revenue (Todar Mal); <b>sulh-i-kul</b>, abolition of jizya (1564), Ibadat Khana debates; Abul Fazl's <i>Ain-i-Akbari</i>.</li><li>Justice: emperor's court; <b>qazi-ul-quzat</b> and qazis; Jahangir's 'chain of justice'; <b>Fatawa-i-Alamgiri</b> compiled under Aurangzeb.</li><li>Decline after 1707: weak successors, jagirdari crisis, regional powers, Marathas, Nadir Shah's raid (1739).</li></ul>
 <h4>Bhakti and Sufi</h4><p>Personal devotion over ritual and caste: Alvars and Nayanmars, Ramanuja, Basava (Lingayats), Kabir, Guru Nanak, Mirabai, Chaitanya. Sufi orders – Chishti (Moinuddin, Nizamuddin Auliya), Suhrawardi – stressed love and service.</p></div>
</div><div>
 <div class="card lab"><h3>Sultanate, Vijayanagara or Mughal?</h3><div id="lab4"></div></div>
 <div class="card lab"><h3>Put in order</h3><div id="lab4b"></div><div class="row"><button class="btn sm sec" id="lab4New">New set</button></div></div>
</div></div>`+unitFoot(4)+footer(); },
 init(){
  choiceLab("#lab4",[
   ["Iqta assignments to military officers.","DS","Delhi Sultanate."],
   ["Ranks of zat and sawar.","MU","Mughal mansabdari."],
   ["Nayaka chiefs holding territory for military service.","VJ","Vijayanagara."],
   ["Token copper currency and shifting the capital to Daulatabad.","DS","Muhammad bin Tughlaq."],
   ["Ain-i-Akbari describing the empire's administration.","MU","Abul Fazl."]
  ],{DS:"Delhi Sultanate",VJ:"Vijayanagara",MU:"Mughal"});
  const run=()=>tlLab("#lab4b",4,5); $("#lab4New").onclick=run; run();
  miniQuiz(4);
 }};

/* ---------------- UNIT 5 ---------------- */
VIEWS.u5 = { html(){ return unitHead(5)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">A trading company became a ruling power. Victories at <b>Plassey</b> and <b>Buxar</b>, the <b>Diwani</b>, and new <b>revenue settlements</b> transformed land, law and society – until the <b>Revolt of 1857</b> ended Company rule.</div>
 <h4>From trade to territory</h4><p>Portuguese (1498), Dutch, English (1600), French. Madras (1639) was the first English presidency town. Carnatic wars (1746–63) against the French. <b>Plassey</b> (1757) and <b>Buxar</b> (1764) gave the Company control of Bengal; the <b>Diwani</b> (1765) made it a revenue power. Mysore wars ended with Tipu's fall (1799); in Tamil Nadu, Puli Thevar, <b>Veerapandiya Kattabomman</b> (hanged 1799) and the <b>Maruthu brothers</b> (1801) resisted.</p>
 <h4>Parliament steps in</h4><p><b>Regulating Act, 1773</b> (Governor-General, Supreme Court at Calcutta); Pitt's India Act, 1784 (Board of Control); Charter Acts of 1813 and 1833 (Governor-General of India, Law Commission under Macaulay).</p>
 <h4>Revenue settlements</h4><table class="t"><tr><th>System</th><th>With whom</th><th>Where</th></tr>
 <tr><td>Permanent Settlement (1793)</td><td>Zamindars; revenue fixed for ever</td><td>Bengal, Bihar, Odisha, parts of Madras</td></tr>
 <tr><td>Ryotwari (1792–1820s)</td><td>Individual cultivators (ryots)</td><td>Madras, Bombay – Read and Munro</td></tr>
 <tr><td>Mahalwari (1822, 1833)</td><td>Village communities</td><td>North-West Provinces, Punjab</td></tr></table>
 <h4>Reform and resistance</h4><p>Abolition of sati (1829), Widow Remarriage Act (1856), English education (Macaulay's Minute, 1835), railways and telegraph (1850s), Doctrine of Lapse. <b>Vellore mutiny</b> (1806). <b>Revolt of 1857</b>: began at Meerut (10 May); leaders included Bahadur Shah Zafar, Nana Sahib, Rani Lakshmibai, Tantia Tope, Kunwar Singh; causes – annexations, revenue burdens, greased cartridges, social interference. Result: <b>Government of India Act, 1858</b> – Crown rule, Secretary of State, Viceroy; Queen's Proclamation promised non-interference in religion. Codes followed: IPC 1860, CrPC 1861, Evidence Act 1872.</p></div>
</div><div>
 <div class="card lab"><h3>Which revenue settlement?</h3><div id="lab5"></div></div>
 <div class="card lab"><h3>Put in order</h3><div id="lab5b"></div><div class="row"><button class="btn sm sec" id="lab5New">New set</button></div></div>
</div></div>`+unitFoot(5)+footer(); },
 init(){
  choiceLab("#lab5",[
   ["A zamindar in Bengal pays a fixed sum that can never be raised.","PS","Permanent Settlement."],
   ["A farmer in Salem district pays revenue directly to the government and holds title.","RY","Ryotwari."],
   ["A village in Agra district is jointly responsible for its revenue.","MA","Mahalwari."],
   ["Introduced by Cornwallis in 1793.","PS","Permanent Settlement."]
  ],{PS:"Permanent Settlement",RY:"Ryotwari",MA:"Mahalwari"});
  const run=()=>tlLab("#lab5b",5,6); $("#lab5New").onclick=run; run();
  miniQuiz(5);
 }};

/* ---------------- UNIT 6 ---------------- */
const NM_SVG=flowSVG("nm",[["1885 – Indian National Congress","moderates: petitions, drain theory"],["1905 – Partition of Bengal","swadeshi, boycott, extremists"],["1920 – Non-Cooperation","Gandhi: mass non-violent protest"],["1930 – Civil Disobedience","Salt March; Vedaranyam"],["1942 – Quit India","'Do or die'"],["1947 – Independence and Partition","Constituent Assembly; Constitution 1950"]],"Phases of the national movement");
VIEWS.u6 = { html(){ return unitHead(6)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">The national movement moved from <b>petitions</b> to <b>mass non-violent struggle</b>, alongside a parallel series of <b>constitutional reforms</b> – 1909, 1919, 1935 – that the Constituent Assembly later built on. Social reform movements, including Tamil Nadu's, widened the meaning of freedom.</div>
 <h4>Phases</h4><ul><li><b>Moderates</b> (1885–1905): Dadabhai Naoroji (drain of wealth), Gokhale, Pherozeshah Mehta; G. Subramania Iyer (founder of <i>The Hindu</i>) from Madras.</li><li><b>Extremists</b> (1905–1919): Tilak, Lajpat Rai, Bipin Chandra Pal, Aurobindo; swadeshi and boycott; in Tamil Nadu, <b>V.O. Chidambaram</b>'s Swadeshi Steam Navigation Company and <b>Subramania Bharati</b>'s poetry.</li><li><b>Gandhian era</b> (1919–1947): Champaran (1917), Kheda, Ahmedabad; Rowlatt satyagraha and Jallianwala Bagh (1919); Non-Cooperation (1920–22); Civil Disobedience (1930–34) – Dandi and <b>Vedaranyam</b> (Rajaji); Quit India (1942); also the INA (Subhas Chandra Bose).</li></ul>
 <h4>Constitutional reforms</h4><table class="t"><tr><th>Act</th><th>Key change</th></tr>
 <tr><td>Indian Councils Act, 1909 (Morley–Minto)</td><td>Separate electorates for Muslims</td></tr>
 <tr><td>Government of India Act, 1919 (Montagu–Chelmsford)</td><td>Dyarchy in provinces; bicameral central legislature</td></tr>
 <tr><td>Government of India Act, 1935</td><td>Provincial autonomy; proposed federation; Federal Court (1937); RBI (1935)</td></tr>
 <tr><td>Indian Independence Act, 1947</td><td>Two dominions; Constituent Assemblies sovereign</td></tr></table>
 <h4>Social movements in Tamil Nadu</h4><p><b>Justice Party</b> (1916) – non-Brahmin representation; first communal G.O. on reservations in the Madras Presidency (1921). <b>Self-Respect Movement</b> (Periyar, 1925) – against caste and for women's rights and self-respect marriages; the Vaikom satyagraha (1924–25). Temple entry (Madras Temple Entry Authorisation Act, 1939). These shaped the First Amendment (1951) after <i>State of Madras v Champakam Dorairajan</i>.</p>
 <h4>Towards 1947</h4><p>Lahore resolution (1940), Cripps Mission (1942), Cabinet Mission (1946), Direct Action and riots, Mountbatten Plan (3 June 1947), Partition and Independence (15 August 1947). The Constituent Assembly met on 9 December 1946; the Constitution came into force on 26 January 1950.</p></div>
</div><div>
 ${animBox("nmAnim","Phases of the national movement",NM_SVG)}
 <div class="card lab"><h3>Moderate, extremist or Gandhian?</h3><div id="lab6"></div></div>
 <div class="card lab"><h3>Put in order</h3><div id="lab6b"></div><div class="row"><button class="btn sm sec" id="lab6New">New set</button></div></div>
</div></div>`+unitFoot(6)+footer(); },
 init(){
  anim=flowAnim("nmAnim","nm",6,[
   "<b>1885.</b> The Congress meets in Bombay. Early leaders petition for Indian representation and expose the 'drain of wealth' to Britain.",
   "<b>1905.</b> Curzon partitions Bengal. Swadeshi and boycott spread; extremist leaders demand swaraj. The partition is reversed in 1911.",
   "<b>1920.</b> After Jallianwala Bagh, Gandhi launches Non-Cooperation: boycott of courts, schools, councils and foreign cloth. Withdrawn after Chauri Chaura (1922).",
   "<b>1930.</b> Purna Swaraj declared (1929). The Salt March to Dandi and Rajaji's march from Tiruchirappalli to Vedaranyam break the salt law.",
   "<b>1942.</b> Quit India: 'Do or die'. Leaders jailed; underground and local resistance continues.",
   "<b>1947.</b> Independence with Partition. The Constituent Assembly frames the Constitution, in force from 26 January 1950."]);
  choiceLab("#lab6",[
   ["Petitions to Parliament and the drain-of-wealth argument.","MO","Moderates."],
   ["'Swaraj is my birthright and I shall have it.'","EX","Tilak – extremist."],
   ["A nationwide boycott of courts and councils without violence.","GA","Non-Cooperation."],
   ["Burning foreign cloth during the anti-partition agitation of 1905.","EX","Swadeshi under the extremists."],
   ["Breaking the salt law at Vedaranyam.","GA","Civil Disobedience."]
  ],{MO:"Moderate",EX:"Extremist",GA:"Gandhian"});
  const run=()=>tlLab("#lab6b",6,6); $("#lab6New").onclick=run; run();
  miniQuiz(6);
 }};

/* ---------------- TIMELINE ---------------- */
VIEWS.timeline = { html(){ return `<div class="unitban"><div class="k">Revise</div><h2>Timeline</h2><p>${TL.length} key dates from the Harappan cities to the Constitution. Filter by unit or search.</p></div>
 <div class="card"><div class="row"><input type="text" id="tlS" class="search" placeholder="Search…"><select id="tlU"><option value="0">All units</option>${UNITS.map(u=>`<option value="${u.n}">Unit ${u.n}: ${u.title}</option>`).join("")}</select></div></div>
 <div class="card"><table class="t" id="tlT"></table></div>`+footer(); },
 init(){ const draw=()=>{ const q=$("#tlS").value.toLowerCase(), u=+$("#tlU").value; $("#tlT").innerHTML=`<tr><th style="width:120px">Year</th><th>Event</th><th>Unit</th></tr>`+TL.slice().sort((a,b)=>a[0]-b[0]).filter(t=>(!u||t[2]===u)&&t[1].toLowerCase().includes(q)).map(t=>`<tr><td><b>${yr(t[0])}</b></td><td>${esc(t[1])}</td><td>${t[2]}</td></tr>`).join(""); }; draw(); $("#tlS").oninput=draw; $("#tlU").onchange=draw; }};

/* ---------------- REFERENCES ---------------- */
VIEWS.refs = { html(){ return `<div class="unitban"><div class="k">Read further</div><h2>References</h2><p>Books are in the TNNLU library; online sources need internet.</p></div>
 <div class="two"><div class="card"><h3>Books</h3><table class="t"><tr><th>Book</th><th>Use it for</th></tr>
 <tr><td>Upinder Singh, <i>A History of Ancient and Early Medieval India</i>, Pearson</td><td>Units 1–3 – sources, Harappa to the Cholas</td></tr>
 <tr><td>Romila Thapar, <i>Early India</i>, Penguin</td><td>Ancient India, readable</td></tr>
 <tr><td>Satish Chandra, <i>History of Medieval India</i>, Orient BlackSwan</td><td>Unit 4</td></tr>
 <tr><td>Sekhar Bandyopadhyay, <i>From Plassey to Partition</i>, Orient BlackSwan</td><td>Units 5–6</td></tr>
 <tr><td>Bipan Chandra et al., <i>India's Struggle for Independence</i>, Penguin</td><td>Unit 6</td></tr>
 <tr><td>K.A. Nilakanta Sastri, <i>A History of South India</i>, OUP</td><td>Sangam, Pallavas, Cholas, Vijayanagara</td></tr>
 <tr><td>N. Subrahmanian, <i>History of Tamil Nadu</i></td><td>Tamil Nadu focus</td></tr>
 <tr><td>NCERT, <i>Themes in Indian History</i> I–III (Class XII)</td><td>Sources-based revision</td></tr></table></div>
 <div><div class="card"><h3>Online</h3><ul>
 <li><a href="https://asi.nic.in" target="_blank" rel="noopener">Archaeological Survey of India</a> – sites and monuments</li>
 <li><a href="https://www.tnarch.gov.in" target="_blank" rel="noopener">Tamil Nadu State Department of Archaeology</a> – Keezhadi reports</li>
 <li><a href="https://egyankosh.ac.in" target="_blank" rel="noopener">eGyanKosh (IGNOU)</a> – free history course material</li>
 <li><a href="https://www.indianculture.gov.in" target="_blank" rel="noopener">Indian Culture portal</a> – manuscripts, archives, inscriptions</li>
 <li><a href="https://abhilekh-patal.in" target="_blank" rel="noopener">Abhilekh Patal</a> – National Archives documents</li></ul></div>
 <div class="card"><h3>Next</h3><p>History II (Legal History) in Semester IV takes up the courts, codes and constitutional history in depth.</p></div></div></div>`+footer(); }};
