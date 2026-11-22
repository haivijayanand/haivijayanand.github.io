/*
TOOL:    ba-english1/content.js — English I (B.A. LL.B. Semester I) course data and unit pages, assembled by build.py
FAMILY:  law-explorers
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    Kaavya Study Materials – TNNLU B.A. LL.B. Semester I and II explorers (claude.ai, 2026-11-22)
CHANGES: 1.0.0 - first version
*/
const UNITS = [
 {id:"u1", n:1, title:"Grammar for Precise Writing", short:"Sentences, tenses, agreement, articles, prepositions, active and passive voice, reported speech."},
 {id:"u2", n:2, title:"Vocabulary and Legal Terms", short:"Word building, one-word substitutes, Latin and French legal terms, words with a special legal meaning."},
 {id:"u3", n:3, title:"Reading, Comprehension and Précis", short:"Skimming and scanning, reading closely, answering comprehension questions, writing a précis."},
 {id:"u4", n:4, title:"Composition: Paragraphs, Essays, Letters", short:"Topic sentences and coherence, essay plans, formal letters, applications and email."},
 {id:"u5", n:5, title:"Legal Language and Plain English", short:"Features of legal English, the plain-language movement, reading a statute, translation and glossaries."}
];
const EXTRAS = [
 {id:"drill", ic:"🔁", title:"Grammar drill"},
 {id:"flash", ic:"🃏", title:"Flashcards"},
 {id:"quiz", ic:"✅", title:"Quiz"},
 {id:"refs", ic:"📚", title:"References"}
];
const CASES = [], MAXIMS = [];
const HOME = {
 title:"English I – General English and Legal Language",
 intro:["Every law course is taught, argued and examined in English. This course makes sure the tools are sharp: grammar that says exactly what you mean, a lawyer's vocabulary, careful reading, clear composition and an understanding of how legal English works.",
  "Each unit has short labs that check your answers at once, and the grammar drill gives a fresh set of ten sentences every time."],
 tips:["Learn five new words a week from your law readings – write each in a sentence of your own.","Read one editorial or short judgment a day and summarise it in three lines.","Write something every day: a paragraph, a letter, a case note.","Read your writing aloud – you will hear the errors your eye skips.","Use the drill until you score 9 or 10 out of 10 three times running."],
 about:"TNNLU lists English I as the language course of the B.A. LL.B. (Hons.) first semester. The units here follow the usual first-semester 'General English and Legal Language' course of Indian law universities. Compare with TNNLU's own course outline when it is issued."
};
const FOOT = "English I explorer · v1.0.0 · Reference material for first-semester B.A. LL.B. students, based on the usual first-semester General English and Legal Language syllabus. Always check against your own course outline.";

const FLASH = [
 ["Subject–verb agreement","A singular subject takes a singular verb: 'The list of witnesses is long.' The verb agrees with 'list', not 'witnesses'."],
 ["Either/neither … or/nor","The verb agrees with the nearer subject: 'Neither the judge nor the lawyers were present.'"],
 ["Collective nouns","'The jury has retired' (as one body) – 'The jury were divided' (as individuals). Indian usage usually prefers singular."],
 ["Active voice","The doer comes first: 'The court dismissed the appeal.'"],
 ["Passive voice","The receiver comes first: 'The appeal was dismissed (by the court).' Useful when the doer is unknown or unimportant."],
 ["Reported speech","Backshift tenses and change pronouns: He said, 'I am ready' → He said that he was ready."],
 ["Present perfect","For past actions linked to the present: 'The court has reserved its judgment.'"],
 ["Article 'an'","Used before a vowel sound: an hour, an FIR, an MLA – but a university, a one-day strike."],
 ["Modal 'shall'","In law, imposes a duty. In ordinary English, a formal future (I shall attend)."],
 ["Prefix","Added before a root: un-, il-, ir-, mis-, pre-, re-, counter-. Illegal, irrelevant, misconduct."],
 ["Suffix","Added after a root: -ee, -or, -ment, -ity. Lessee, lessor, judgment, liability."],
 ["-or / -ee pairs","The -or does, the -ee receives: lessor/lessee, mortgagor/mortgagee, donor/donee, employer/employee."],
 ["Bona fide","In good faith; genuine."],
 ["Mala fide","In bad faith; with dishonest intention."],
 ["Ab initio","From the beginning – a void agreement is void ab initio."],
 ["Ad interim","For the meantime; temporary (an ad interim injunction)."],
 ["Inter alia","Among other things."],
 ["Per se","By itself; in itself."],
 ["Pro bono","For the public good; legal work done free of charge."],
 ["Sub judice","Under judicial consideration; not yet decided."],
 ["Suo motu","On its own motion – a court acting without a petition."],
 ["Ultra vires","Beyond the powers – an act done without legal authority."],
 ["Status quo","The existing state of affairs."],
 ["Force majeure","(French) superior force – an event beyond control that excuses performance."],
 ["Skimming","Reading quickly for the general idea – headings, first and last sentences."],
 ["Scanning","Searching a text quickly for a specific fact, date or name."],
 ["Précis","A clear, connected summary in your own words, about one-third of the original, with a title."],
 ["Topic sentence","The sentence, usually first, that states what a paragraph is about."],
 ["Coherence","Ideas that follow logically, joined by transitions: however, therefore, moreover, in contrast."],
 ["Block format letter","All lines start at the left margin – the usual modern format for formal letters."],
 ["Plain English","Writing that the intended reader can understand on first reading – short sentences, common words, active voice."],
 ["Legalese","Unnecessarily complex legal language: 'hereinafter', 'aforesaid', 'the said', doublets like 'null and void'."],
 ["Doublet","Two words for one idea, a relic of English and French law: 'null and void', 'terms and conditions', 'will and testament'."],
 ["Official Languages Act, 1963","Allows the use of English with Hindi for official purposes of the Union. Article 348 makes English the language of the Supreme Court and High Courts unless Parliament provides otherwise."]
];

const QUIZ = [
 [1,"Choose the correct verb: 'The bundle of documents ____ on the table.'",["are","is","were","have been"],1,"The subject is 'bundle' (singular)."],
 [1,"Choose the correct verb: 'Neither the petitioner nor his lawyers ____ present.'",["was","were","is","has"],1,"Agrees with the nearer subject, 'lawyers'."],
 [1,"'The judgment was delivered by Justice Nagarathna' is in the…",["Active voice","Passive voice","Imperative mood","Future tense"],1,"Receiver first, 'by' + doer."],
 [1,"Reported speech of: She said, 'I will file the appeal tomorrow.'",["She said that she will file the appeal tomorrow.","She said that she would file the appeal the next day.","She said that I would file the appeal tomorrow.","She says she filed the appeal."],1,"will → would, tomorrow → the next day."],
 [1,"Which uses the article correctly?",["a FIR","an FIR","the a FIR","an university"],1,"'FIR' begins with the vowel sound 'eff'."],
 [1,"'The court has reserved its judgment' uses the…",["Simple past","Present perfect","Past perfect","Future continuous"],1,"has + past participle."],
 [2,"The person who gives a gift is the…",["Donee","Donor","Lessee","Mortgagee"],1,"-or gives, -ee receives."],
 [2,"'Sub judice' means…",["Beyond the powers","Under judicial consideration","In good faith","From the beginning"],1,"Matter pending before a court."],
 [2,"A court acting on its own, without anyone filing a case, acts…",["Ultra vires","Suo motu","Ex parte","Pro bono"],1,"On its own motion."],
 [2,"One word for 'a person who is present at an event and sees it': ",["Witness","Plaintiff","Juror","Bailiff"],0,"Eye-witness."],
 [2,"The opposite of 'legal' formed with a prefix is…",["unlegal","illegal","inlegal","dislegal"],1,"il- before l."],
 [2,"'Force majeure' is a term from…",["Latin","French","Greek","Sanskrit"],1,"Law French – 'superior force'."],
 [3,"Reading a page quickly to find the date of a judgment is…",["Skimming","Scanning","Close reading","Précis"],1,"Looking for one fact."],
 [3,"A précis should normally be about…",["The same length","One-third of the original","Two lines","Twice as long"],1,"About a third, in your own words, with a title."],
 [3,"Which does NOT belong in a précis?",["The main argument","Your own opinion","A title","Connected sentences"],1,"A précis reports the author's ideas, not yours."],
 [3,"A comprehension question asks what the author 'implies'. You should look for…",["Words quoted exactly","Meaning suggested but not stated","The title","Spelling errors"],1,"Inference."],
 [4,"The sentence that states the main idea of a paragraph is the…",["Concluding sentence","Topic sentence","Transition","Footnote"],1,"Usually the first sentence."],
 [4,"Which transition shows contrast?",["Moreover","However","Therefore","Similarly"],1,"However introduces a contrast."],
 [4,"In a formal letter to a person whose name you know, the close is…",["Yours faithfully","Yours sincerely","Love","Cheers"],1,"Sincerely with a name; faithfully with Sir/Madam."],
 [4,"An essay's thesis statement appears…",["In the conclusion only","At the end of the introduction","In the title only","Nowhere"],1,"It tells the reader what you will argue."],
 [5,"Which is an example of a legal doublet?",["Null and void","Bona fide","Plaintiff","Ultra vires"],0,"Two words for one idea."],
 [5,"The plain-English rewrite of 'in the event that' is…",["if","whereas","notwithstanding","provided"],0,"One word does the work."],
 [5,"Under Article 348, the language of proceedings in the Supreme Court is…",["Hindi","English, until Parliament provides otherwise","Any Eighth Schedule language","Sanskrit"],1,"Article 348(1)."],
 [5,"'The lessee shall not sublet' – 'shall not' expresses…",["Permission","Prohibition","A future fact","A wish"],1,"A prohibition."],
 [5,"Which feature is typical of traditional legal English?",["Very short sentences","Long sentences with many qualifications","Slang","Emojis"],1,"Plain English tries to cure this."]
];

/* sentences for the grammar drill: [sentence with ____, options, answer index] */
const DRILL = [
 ["The report of the two committees ____ been submitted.",["has","have"],0],
 ["Each of the accused ____ a lawyer.",["has","have"],0],
 ["The police ____ registered the complaint.",["has","have"],1],
 ["Ten thousand rupees ____ a large fine for a student.",["is","are"],0],
 ["Either the tenant or the landlord ____ to pay the tax.",["has","have"],0],
 ["She is ____ honest witness.",["a","an"],1],
 ["He joined ____ university in Tiruchirappalli.",["a","an"],0],
 ["The case was adjourned ____ Monday.",["to","till on"],0],
 ["The accused was charged ____ theft.",["with","for"],0],
 ["She is good ____ drafting.",["at","in"],0],
 ["The parties agreed ____ the terms.",["to","with"],0],
 ["I agree ____ you on this point.",["with","to"],0],
 ["The judge insisted ____ a written reply.",["on","for"],0],
 ["The appeal ____ yesterday.",["was heard","has been heard"],0],
 ["The court ____ its order since morning.",["has been dictating","dictates"],0],
 ["If I ____ the judge, I would grant bail.",["were","was being"],0],
 ["By the time the police arrived, the thief ____.",["had escaped","has escaped"],0],
 ["The witness, along with her parents, ____ in court.",["was","were"],0],
 ["Hardly ____ the hearing begun when the lights failed.",["had","has"],0],
 ["No sooner did he sign ____ he regretted it.",["than","then"],0],
 ["The lawyer, ____ I met yesterday, is my cousin.",["whom","who's"],0],
 ["This is the judgment ____ changed the law.",["that","whom"],0],
 ["Between you and ____, the case is weak.",["me","I"],0],
 ["The number of pending cases ____ rising.",["is","are"],0],
 ["A number of students ____ attending the moot.",["are","is"],0]
];

//@@VIEWS
VIEWS.home = { html: homeView };

/* ---------------- UNIT 1 ---------------- */
const VOICE_STEPS=[
 "Start with an <b>active</b> sentence: <b>The court</b> (doer) <b>dismissed</b> (verb) <b>the appeal</b> (receiver).",
 "Move the <b>receiver</b> to the front – it becomes the new subject: <b>The appeal</b> …",
 "Use the right form of <b>be</b> in the same tense (past → <b>was</b>) and the <b>past participle</b>: … was dismissed …",
 "Add the doer with <b>by</b> only if it matters: … <b>by the court</b>. Often it is dropped: 'The appeal was dismissed.'",
 "Choose deliberately: active is clearer and shows responsibility; passive suits statutes and findings where the doer is unknown or unimportant ('The deceased was found…')."
];
const VOICE_SVG=flowSVG("vo",[["The court dismissed the appeal.","active: doer – verb – receiver"],["The appeal …","receiver becomes the subject"],["The appeal was dismissed …","be (same tense) + past participle"],["… by the court.","doer added with 'by' – or dropped"],["Which one to use?","active for clarity; passive when the doer is unknown"]],"Changing active voice to passive");
VIEWS.u1 = { html(){ return unitHead(1)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">Grammar is not decoration in law. A misplaced comma or a wrong tense can change who must pay, when, and how much. Aim for sentences that can be read <b>only one way</b>.</div>
 <h4>The sentence</h4><p>Subject + verb (+ object/complement). Kinds: <b>simple</b> (one clause), <b>compound</b> (two main clauses joined by and/but/or), <b>complex</b> (a main clause plus a dependent clause – 'If the tenant defaults, the landlord may sue').</p>
 <h4>Tenses you will use most</h4><table class="t"><tr><th>Tense</th><th>Example</th><th>Use</th></tr>
 <tr><td>Simple present</td><td>The Act applies to all of India.</td><td>Facts, statutes, rules</td></tr>
 <tr><td>Simple past</td><td>The accused fled.</td><td>Facts of a case</td></tr>
 <tr><td>Present perfect</td><td>The court has held…</td><td>Past action, present relevance</td></tr>
 <tr><td>Past perfect</td><td>He had signed before he read it.</td><td>The earlier of two past events</td></tr>
 <tr><td>Future</td><td>The hearing will begin at 10.</td><td>Plans, predictions</td></tr></table>
 <h4>Agreement</h4><ul><li>The verb agrees with the head noun: 'The <b>list</b> of cases <b>is</b>…'.</li><li>Each, every, either, neither, everyone → singular.</li><li>'Police', 'people', 'cattle' → plural.</li><li>Sums of money and periods of time as one amount → singular: 'Five years is a long sentence.'</li></ul>
 <h4>Articles and prepositions</h4><p>'A' before a consonant <i>sound</i>, 'an' before a vowel <i>sound</i> (an hour, a European). Legal prepositions to learn as pairs: charged <b>with</b>, convicted <b>of</b>, acquitted <b>of</b>, liable <b>for</b>, liable <b>to</b> (a penalty), comply <b>with</b>, abide <b>by</b>, in accordance <b>with</b>, subject <b>to</b>.</p>
 <h4>Reported speech</h4><p>Change pronouns and person; shift tenses back (is → was, will → would, has → had); change time and place words (today → that day, here → there).</p></div>
</div><div>
 ${animBox("voAnim","Active to passive voice",VOICE_SVG)}
 <div class="card lab"><h3>Active or passive?</h3><div id="lab1"></div></div>
 <div class="card lab"><h3>Which tense?</h3><div id="lab1b"></div></div>
</div></div>`+unitFoot(1)+footer(); },
 init(){
  anim=flowAnim("voAnim","vo",5,VOICE_STEPS);
  choiceLab("#lab1",[
   ["The FIR was registered at 9 p.m.","P","be + past participle."],
   ["The magistrate granted bail.","A","Doer first."],
   ["The property shall be divided equally.","P","Typical statutory passive – the doer is not named."],
   ["Parliament enacted the Bharatiya Nyaya Sanhita in 2023.","A","Doer (Parliament) is the subject."],
   ["Mistakes were made.","P","A passive that hides who made them – avoid it when responsibility matters."]
  ],{A:"Active",P:"Passive"});
  choiceLab("#lab1b",[
   ["'The witness ____ (see) the accused before the police arrived.'","PP","had seen – the earlier of two past events."],
   ["'The Supreme Court ____ (hold) in many cases that bail is the rule.'","PR","has held – past decisions still relevant."],
   ["'The Constitution ____ (guarantee) equality before law.'","SP","guarantees – a standing fact."],
   ["'The hearing ____ (take) place next Monday.'","FU","will take place."]
  ],{SP:"Simple present",PR:"Present perfect",PP:"Past perfect",FU:"Future"});
  miniQuiz(1);
 }};

/* ---------------- UNIT 2 ---------------- */
const TERMS=[["Bona fide","in good faith"],["Mala fide","in bad faith"],["Ab initio","from the beginning"],["Ad interim","for the meantime"],["Inter alia","among other things"],["Per se","by itself"],["Pro bono","for the public good, free of charge"],["Sub judice","under judicial consideration"],["Suo motu","on its own motion"],["Ultra vires","beyond the powers"],["Status quo","the existing state of affairs"],["Ex parte","on behalf of one side only (the other side absent)"],["De facto","in fact"],["De jure","by law"],["Obiter dicta","things said by the way (not binding)"],["Ratio decidendi","the reason for the decision (binding)"],["Locus standi","the right to bring a case"],["Habeas corpus","produce the body – a writ against illegal detention"],["Res judicata","a matter already decided"],["Prima facie","at first sight"]];
VIEWS.u2 = { html(){ return unitHead(2)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">Legal English mixes ordinary words, <b>Latin</b> phrases and <b>Law French</b>, and gives some everyday words a special meaning ('consideration', 'tort', 'instrument'). Learn the roots and you can decode new words.</div>
 <h4>Building words</h4><table class="t"><tr><th>Part</th><th>Meaning</th><th>Examples</th></tr>
 <tr><td>il-, im-, in-, ir-, un-</td><td>not</td><td>illegal, improper, invalid, irrevocable, unlawful</td></tr>
 <tr><td>mis-</td><td>wrongly</td><td>misrepresentation, misconduct</td></tr>
 <tr><td>counter-</td><td>against</td><td>counter-claim, counterfeit</td></tr>
 <tr><td>-or / -ee</td><td>doer / receiver</td><td>lessor/lessee, donor/donee, assignor/assignee</td></tr>
 <tr><td>-cide</td><td>killing</td><td>homicide, genocide, infanticide</td></tr>
 <tr><td>-ment / -ity / -ance</td><td>noun endings</td><td>judgment, liability, maintenance</td></tr></table>
 <h4>Words with a legal meaning</h4><ul><li><b>Consideration</b> – something of value given in return for a promise (not 'thoughtfulness').</li><li><b>Instrument</b> – a formal legal document such as a deed or cheque.</li><li><b>Party</b> – a person bound by a contract or involved in a case.</li><li><b>Prayer</b> – the relief asked for at the end of a petition.</li><li><b>Hold</b> – what a court decides as law ('the court held that…').</li></ul>
 <h4>One-word substitutes</h4><p>A person who flees from justice – <b>fugitive</b>; a law passed by a legislature – <b>statute</b>; a person who makes a will – <b>testator</b>; dying without a will – <b>intestate</b>; a list of cases for hearing – <b>cause list</b>; a formal written statement on oath – <b>affidavit</b>.</p></div>
 <div class="card"><h3>Twenty phrases you will meet in week one</h3><table class="t">${TERMS.map(t=>`<tr><td><b><i>${t[0]}</i></b></td><td>${t[1]}</td></tr>`).join("")}</table></div>
</div><div>
 <div class="card lab"><h3>Latin term quick-check</h3><p>Pick the meaning. A fresh set of six each time.</p><div id="lab2"></div><div class="row"><button class="btn sm sec" id="lab2New">New set</button></div></div>
 <div class="card lab"><h3>Who is who? (-or and -ee)</h3><div id="lab2b"></div></div>
</div></div>`+unitFoot(2)+footer(); },
 init(){
  const run=()=>{ const set=shuffle(TERMS).slice(0,6);
    $("#lab2").innerHTML=set.map((t,i)=>{ const wrong=shuffle(TERMS.filter(x=>x!==t)).slice(0,3).map(x=>x[1]); const opts=[t[1],...wrong]; return qHTML([2,`${t[0]} means…`,opts,0,`${t[0]}: ${t[1]}.`],"lt"+i); }).join("");
    bindQ($("#lab2")); };
  $("#lab2New").onclick=run; run();
  choiceLab("#lab2b",[
   ["The owner who lets a flat on lease.","OR","Lessor."],
   ["The bank that receives a mortgage over a house.","EE","Mortgagee – the lender receives the security."],
   ["The person who receives a gift.","EE","Donee."],
   ["The worker hired by a company.","EE","Employee."],
   ["The person who transfers a right to another.","OR","Assignor."]
  ],{OR:"…-or (gives / does)",EE:"…-ee (receives)"});
  miniQuiz(2);
 }};

/* ---------------- UNIT 3 ---------------- */
const PASS1=`<p>The right to be heard is among the oldest rules of fair procedure. An authority that decides a person's rights must tell that person what is alleged and give a fair chance to answer. The Latin phrase <i>audi alteram partem</i> – hear the other side – captures the idea, but the rule is not merely a formality. A hearing improves decisions, because the person affected often knows facts the authority does not.</p>
<p>Courts in India have applied the rule to a wide range of decisions, from the cancellation of a passport to the dismissal of a government servant. In Maneka Gandhi's case in 1978, the Supreme Court held that a procedure which deprives a person of liberty must be fair, just and reasonable, and that a hearing is ordinarily part of fairness. Yet the rule is flexible. In an emergency, a hearing may come after the action rather than before it, and a statute may in some cases exclude it expressly.</p>
<p>The deeper point is about respect. A person who has been heard, even if the decision goes against them, is more likely to accept it. A system that decides without listening loses not only accuracy but also the trust on which its authority rests.</p>`;
const COMP1=[
 [3,"The main idea of the passage is that…",["Hearings waste time","The right to be heard improves decisions and earns trust, though it is flexible","Only courts must give hearings","Maneka Gandhi lost her passport case"],1,"The three paragraphs: the rule, its application and limits, and its deeper purpose."],
 [3,"According to the passage, a hearing may be postponed…",["Never","In an emergency","Whenever the officer is busy","Only for passports"],1,"Paragraph 2."],
 [3,"'Not merely a formality' suggests the hearing must be…",["Short","Real and meaningful","In Latin","Written"],1,"The opposite of a formality."],
 [3,"Which word could replace 'expressly' in paragraph 2?",["Quickly","Clearly in words","Secretly","Partly"],1,"Express = stated directly."],
 [3,"The author's attitude to the rule is…",["Hostile","Supportive but balanced","Indifferent","Sarcastic"],1,"Values the rule and admits its limits."]
];
VIEWS.u3 = { html(){ return unitHead(3)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">Lawyers read for a living. Match the <b>speed</b> to the purpose – skim, scan or read closely – and always separate what the text <b>says</b> from what it <b>implies</b> and from what <b>you</b> think.</div>
 <h4>Three speeds of reading</h4><table class="t"><tr><th>Mode</th><th>Purpose</th><th>Example</th></tr>
 <tr><td>Skim</td><td>General idea</td><td>Is this judgment about bail or about property?</td></tr>
 <tr><td>Scan</td><td>One fact</td><td>Find the date of the FIR</td></tr>
 <tr><td>Close reading</td><td>Argument, meaning, tone</td><td>Why did the court reject the defence?</td></tr></table>
 <h4>Answering comprehension questions</h4><ol><li>Read the questions first, then the passage.</li><li>Find the line that answers each question; answer in your own words.</li><li>For 'infer' or 'imply' questions, look for meaning that follows from the text but is not stated.</li><li>For vocabulary questions, test your word in the sentence.</li></ol>
 <h4>Writing a précis</h4><ol><li>Read twice; find the central idea and supporting points.</li><li>Note key points; drop examples, repetition and figures of speech.</li><li>Write a connected draft in your own words, in reported speech and the third person.</li><li>Cut to about <b>one-third</b> of the original; give it a <b>title</b>.</li><li>Check: no new ideas, no opinions of your own.</li></ol></div>
 <div class="card"><h3>Read the passage</h3><div class="act" style="white-space:normal">${PASS1}</div></div>
</div><div>
 <div class="card lab"><h3>Comprehension questions</h3><div id="compBox"></div><div class="row"><span class="score" id="compScore" style="font-size:17px"></span></div></div>
 <div class="card lab"><h3>Précis word counter</h3><p>The passage has <b id="pwOrig"></b> words. Write a précis of it below; the counter shows how close you are to one-third.</p>
  <textarea id="pwTxt" rows="7" style="width:100%;font:15px/1.5 Georgia,serif;padding:8px;border-radius:8px;border:1px solid var(--rule);background:var(--bg);color:var(--ink)" placeholder="Title: …&#10;&#10;Your précis…"></textarea>
  <div id="pwOut" class="fb info">Start writing.</div>
  <details style="margin-top:8px"><summary>See a model précis</summary><p style="font-family:Georgia,serif"><b>The Right to Be Heard</b><br>The right to be heard requires a decision-maker to tell a person the case against them and let them answer. It is valuable because the affected person often knows relevant facts. Indian courts apply it widely, and since Maneka Gandhi (1978) fairness of procedure includes a hearing, though in emergencies the hearing may follow the action and a statute may exclude it. Above all, being heard makes decisions acceptable and keeps public trust in the system.</p></details></div>
</div></div>`+unitFoot(3)+footer(); },
 init(){
  let got=0,n=0;
  $("#compBox").innerHTML=COMP1.map((q,i)=>qHTML(q,"c"+i)).join("");
  bindQ($("#compBox"),ok=>{ n++; if(ok) got++; $("#compScore").textContent=`${got} / ${n} correct`; });
  const wc=s=>(s.trim().match(/\S+/g)||[]).length;
  const orig=wc(PASS1.replace(/<[^>]+>/g," ")); $("#pwOrig").textContent=orig;
  $("#pwTxt").oninput=()=>{ const w=wc($("#pwTxt").value), t=Math.round(orig/3), r=w/t;
    $("#pwOut").className="fb "+(r>.8&&r<1.2?"ok":"info");
    $("#pwOut").textContent=`${w} words · target about ${t} (one-third). `+(w===0?"":r<.8?"A little short – have you left out a main point?":r<1.2?"Good length. Check for a title and no new ideas.":"Too long – cut examples and repetition."); };
  miniQuiz(3);
 }};

/* ---------------- UNIT 4 ---------------- */
VIEWS.u4 = { html(){ return unitHead(4)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">Good composition is <b>planned</b>: one idea per paragraph, a clear thesis for an essay, and the correct format for a letter. Readers – examiners, judges, clients – reward structure.</div>
 <h4>The paragraph</h4><p><b>Topic sentence</b> → supporting sentences (reasons, evidence, examples) → a concluding or linking sentence. Keep it to one idea. Join ideas with transitions: <i>moreover, furthermore</i> (addition); <i>however, on the other hand</i> (contrast); <i>therefore, consequently</i> (result); <i>for instance</i> (example); <i>in short</i> (summary).</p>
 <h4>The essay</h4><ol><li><b>Introduction</b> – context and a <b>thesis statement</b> (your answer in one sentence).</li><li><b>Body</b> – three or four paragraphs, each supporting the thesis; deal with the counter-argument.</li><li><b>Conclusion</b> – restate the thesis in new words and show why it matters. No new arguments.</li></ol>
 <h4>Formal letters</h4><table class="t"><tr><th>Part</th><th>Example</th></tr>
 <tr><td>Sender's address and date</td><td>Hostel Block C, TNNLU, Tiruchirappalli · 22 November 2026</td></tr>
 <tr><td>Receiver's designation and address</td><td>The Registrar, …</td></tr>
 <tr><td>Subject line</td><td>Sub: Request for library access during vacation</td></tr>
 <tr><td>Salutation</td><td>Sir / Madam, or Dear Ms Rao,</td></tr>
 <tr><td>Body</td><td>Purpose → details → request</td></tr>
 <tr><td>Close and signature</td><td>Yours faithfully (with Sir/Madam) · Yours sincerely (with a name)</td></tr></table>
 <h4>Email</h4><p>Specific subject line, formal greeting, short paragraphs, one request, a proper signature with name, year and roll number. Read before sending.</p></div>
</div><div>
 <div class="card lab"><h3>Build the essay in order</h3><p>Topic: <i>Should voting be compulsory in India?</i></p><div id="lab4"></div></div>
 <div class="card lab"><h3>Choose the transition</h3><div id="lab4b"></div></div>
 <div class="card lab"><h3>Formal letter builder</h3>
  <div class="row"><label>To <input type="text" id="flTo" value="The Registrar, Tamil Nadu National Law University, Tiruchirappalli" style="width:100%"></label></div>
  <div class="row" style="margin-top:6px"><label>Subject <input type="text" id="flSub" value="Request for library access during the winter vacation" style="width:100%"></label></div>
  <div class="row" style="margin-top:6px"><label>Purpose and reason <input type="text" id="flBody" value="I am preparing a research project on the right to privacy and need the library's journal collection" style="width:100%"></label></div>
  <div class="row" style="margin-top:6px"><label>Request <input type="text" id="flReq" value="permit me to use the reading room from 20 to 31 December 2026" style="width:100%"></label></div>
  <div class="row" style="margin-top:6px"><label>Your name <input type="text" id="flName" value="V Sakthi Kaavya" style="width:200px"></label><button class="btn" id="flGo">Draft letter</button></div>
  <div id="flOut"></div></div>
</div></div>`+unitFoot(4)+footer(); },
 init(){
  orderLab("#lab4",["Introduction: low turnout in some elections, and the thesis – compulsory voting would do more harm than good","Body 1: voting is a right, and a right includes the freedom not to use it","Body 2: enforcing fines on crores of voters would be costly and fall hardest on the poor","Body 3: counter-argument – Australia's high turnout – and why India's conditions differ","Conclusion: better to make voting easier (holidays, postal ballots) than to compel it"],"Introduction with thesis, three body paragraphs including the counter-argument, then a conclusion.");
  choiceLab("#lab4b",[
   ["The accused had an alibi. ____, the court acquitted him.","TH","Therefore – a result."],
   ["The rule is strict. ____, courts allow exceptions in emergencies.","HO","However – a contrast."],
   ["The tenant did not pay rent. ____, he damaged the property.","MO","Moreover – an addition."],
   ["Many writs protect liberty – habeas corpus, ____, against illegal detention.","FI","for instance – an example."]
  ],{TH:"Therefore",HO:"However",MO:"Moreover",FI:"for instance"});
  $("#flGo").onclick=()=>{ const v=id=>esc($("#"+id).value.trim()); const d=new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"});
   $("#flOut").innerHTML=`<div class="act" style="white-space:normal;line-height:1.6;margin-top:10px"><p>Hostel, TNNLU<br>Tiruchirappalli<br>${d}</p><p>To<br>${v("flTo")}</p><p><b>Sub: ${v("flSub")}</b></p><p>Sir / Madam,</p><p>${v("flBody")}. Most of the journals I need are available only in print in our library.</p><p>I therefore request you to kindly ${v("flReq")}. I will follow all library rules during this period.</p><p>Thanking you,</p><p>Yours faithfully,<br><br>${v("flName")}<br>B.A. LL.B. (Hons.), First Year</p></div><p style="font-size:13px;color:var(--muted)">'Yours faithfully' because the salutation is 'Sir / Madam'. With 'Dear Ms Rao' you would write 'Yours sincerely'.</p>`; };
  $("#flGo").click();
  miniQuiz(4);
 }};

/* ---------------- UNIT 5 ---------------- */
const PLAIN=[
 ["in the event that","if"],["prior to","before"],["subsequent to","after"],["by virtue of","because of / under"],["in respect of","about / for"],["with effect from","from"],["the said agreement","the agreement / this agreement"],["it is hereby declared that","(delete – just state it)"],["null and void","void"],["give, devise and bequeath","give"],["for the purpose of","to / for"],["notwithstanding the fact that","although"]
];
VIEWS.u5 = { html(){ return unitHead(5)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">Legal English developed to be <b>precise</b> and to cover every case – which also made it long and hard to read. The <b>plain-language</b> movement keeps the precision and removes the clutter.</div>
 <h4>Features of traditional legal English</h4><ul><li>Very long sentences with many conditions and exceptions.</li><li>Latin and French terms; archaic words (hereinafter, aforesaid, witnesseth).</li><li>Doublets and triplets: null and void; give, devise and bequeath.</li><li>Heavy use of the passive and of nouns made from verbs ('make payment' for 'pay').</li><li>Few pronouns – the noun is repeated to avoid ambiguity.</li></ul>
 <h4>Plain English rules</h4><ol><li>Know your reader.</li><li>Short sentences – average 20 words.</li><li>Active voice; real verbs, not nominalisations.</li><li>Use 'must' or 'shall' consistently for duties.</li><li>Define a term once and use it the same way throughout.</li><li>Use headings, numbered lists and tables.</li></ol>
 <h4>Reading a statutory section</h4><p>A section may have: a <b>heading</b>; <b>sub-sections</b> (1), (2); <b>clauses</b> (a), (b); a <b>proviso</b> ('Provided that…'); an <b>Explanation</b> clarifying the meaning; and <b>Illustrations</b> with examples. Read the main rule first, then the exceptions.</p>
 <h4>Language and the courts</h4><p>Article 343 makes Hindi in Devanagari the official language of the Union, with English continued under the Official Languages Act, 1963. <b>Article 348</b> keeps English for Supreme Court and High Court proceedings and for authoritative texts of laws, unless Parliament provides otherwise. Lower courts in Tamil Nadu may use Tamil; the Supreme Court now publishes many judgments in Indian languages through its translation programme.</p></div>
</div><div>
 <div class="card lab"><h3>Plain English replacements</h3><p>Pick the plain version.</p><div id="lab5"></div></div>
 <div class="card lab"><h3>Rewrite it plainly</h3><p><b>Original</b>: 'In the event that the lessee shall fail to make payment of the rent on or before the due date, it is hereby agreed that the lessor shall be entitled to levy a penalty.'</p>
 <textarea id="rwTxt" rows="3" style="width:100%;font:15px Georgia,serif;padding:8px;border-radius:8px;border:1px solid var(--rule);background:var(--bg);color:var(--ink)" placeholder="Your plain version…"></textarea>
 <div class="row"><button class="btn" id="rwGo">Compare</button></div><div id="rwOut"></div></div>
</div></div>`+unitFoot(5)+footer(); },
 init(){
  $("#lab5").innerHTML=shuffle(PLAIN).slice(0,6).map((p,i)=>{ const wrong=shuffle(PLAIN.filter(x=>x!==p)).slice(0,2).map(x=>x[1]); return qHTML([5,`'${p[0]}' →`,[p[1],...wrong],0,`Plain: ${p[1]}.`],"pl"+i); }).join("");
  bindQ($("#lab5"));
  $("#rwGo").onclick=()=>{ const t=$("#rwTxt").value.trim(), w=(t.match(/\S+/g)||[]).length;
   $("#rwOut").innerHTML=`<div class="fb info">Yours: ${w} words. Original: 39 words.<br><b>One plain version (17 words):</b> 'If the tenant does not pay the rent by the due date, the landlord may charge a penalty.'<br>Check yours: did you replace 'in the event that', 'make payment' and 'it is hereby agreed', and use 'may' for the landlord's right?</div>`; };
  miniQuiz(5);
 }};

/* ---------------- GRAMMAR DRILL ---------------- */
VIEWS.drill = { html(){ return `<div class="unitban"><div class="k">Practise</div><h2>Grammar drill</h2><p>Ten sentences from a bank of ${DRILL.length} on agreement, articles, prepositions and tenses. A fresh mix every time.</p></div>
 <div class="card"><div id="drBox"></div><div class="row" style="margin-top:10px"><span class="score" id="drScore"></span><button class="btn" id="drNew">New set</button></div></div>`+footer(); },
 init(){
  const run=()=>{ let got=0,n=0; const set=shuffle(DRILL).slice(0,10);
    $("#drBox").innerHTML=set.map((d,i)=>qHTML([0,d[0],d[1],d[2],`Correct: "${d[1][d[2]]}".`],"d"+i)).join("");
    $("#drScore").textContent="0 / 10";
    bindQ($("#drBox"),ok=>{ n++; if(ok) got++; $("#drScore").textContent=`${got} / 10`+(n===10?(got>=8?" – excellent!":" – try a new set"):""); }); };
  $("#drNew").onclick=run; run();
 }};

/* ---------------- REFERENCES ---------------- */
VIEWS.refs = { html(){ return `<div class="unitban"><div class="k">Read further</div><h2>References</h2><p>Books are in the TNNLU library; online sources need internet.</p></div>
 <div class="two"><div class="card"><h3>Books</h3><table class="t"><tr><th>Book</th><th>Use it for</th></tr>
 <tr><td>Wren and Martin, <i>High School English Grammar and Composition</i>, S. Chand</td><td>Grammar rules and exercises</td></tr>
 <tr><td>Raymond Murphy, <i>English Grammar in Use</i>, Cambridge</td><td>Self-study grammar with answers</td></tr>
 <tr><td>Norman Lewis, <i>Word Power Made Easy</i></td><td>Vocabulary through roots</td></tr>
 <tr><td>S.C. Tripathi, <i>Legal Language, Legal Writing and General English</i>, Central Law Publications</td><td>Legal terms, précis, letters</td></tr>
 <tr><td>Madabhushi Sridhar, <i>Legal Language</i>, Asia Law House</td><td>Legal English in India</td></tr>
 <tr><td>Glanville Williams, <i>Learning the Law</i>, Sweet &amp; Maxwell</td><td>Latin terms, reading cases, study skills</td></tr>
 <tr><td>Bryan Garner, <i>Legal Writing in Plain English</i>, Chicago</td><td>Plain-language drafting</td></tr>
 <tr><td><i>Black's Law Dictionary</i> / P. Ramanatha Aiyar, <i>The Law Lexicon</i></td><td>Meanings of legal words</td></tr></table></div>
 <div><div class="card"><h3>Online</h3><ul>
 <li><a href="https://www.indiacode.nic.in" target="_blank" rel="noopener">India Code</a> – read sections, provisos and illustrations</li>
 <li><a href="https://legislative.gov.in" target="_blank" rel="noopener">Legislative Department</a> – Official Languages Act and legal glossaries</li>
 <li><a href="https://www.sci.gov.in" target="_blank" rel="noopener">Supreme Court of India</a> – judgments, including translated judgments</li>
 <li><a href="https://learnenglish.britishcouncil.org" target="_blank" rel="noopener">British Council LearnEnglish</a> – grammar practice</li></ul></div>
 <div class="card"><h3>Next</h3><p><a href="/tools/llb-ba-english-2.html">English II explorer</a> – advanced writing, speaking and legal drafting.</p></div></div></div>`+footer(); }};
