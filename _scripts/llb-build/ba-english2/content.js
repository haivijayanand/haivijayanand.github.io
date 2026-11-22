/*
TOOL:    ba-english2/content.js — English II (B.A. LL.B. Semester II) course data and unit pages, assembled by build.py
FAMILY:  law-explorers
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    Kaavya Study Materials – TNNLU B.A. LL.B. Semester I and II explorers (claude.ai, 2026-11-22)
CHANGES: 1.0.0 - first version
*/
const UNITS = [
 {id:"u1", n:1, title:"Reading Judgments and Arguments", short:"Structure of a judgment; finding issues and reasoning; arguments, assumptions and fallacies."},
 {id:"u2", n:2, title:"Academic and Legal Writing", short:"IRAC answers, case comments, research papers, OSCOLA citation, avoiding plagiarism."},
 {id:"u3", n:3, title:"Advocacy: Moots, Debates and Presentations", short:"Moot court structure and etiquette, oral submissions, debating, group discussion, presentations."},
 {id:"u4", n:4, title:"Drafting Fundamentals", short:"Words of obligation, definitions and provisos, legal notices, affidavits and petitions, gender-neutral drafting."},
 {id:"u5", n:5, title:"Law and Literature", short:"Why lawyers read literature; the trial scene in The Merchant of Venice; rhetoric and persuasion."}
];
const EXTRAS = [
 {id:"drill", ic:"🔁", title:"Usage drill"},
 {id:"flash", ic:"🃏", title:"Flashcards"},
 {id:"quiz", ic:"✅", title:"Quiz"},
 {id:"refs", ic:"📚", title:"References"}
];
const CASES = [], MAXIMS = [];
const HOME = {
 title:"English II – Legal Reading, Writing and Advocacy",
 intro:["English I sharpened the tools – grammar, vocabulary, précis and letters. English II puts them to a lawyer's work: reading judgments, writing exam answers and research papers, speaking in moots and debates, drafting simple legal documents, and learning persuasion from literature.",
  "Every unit has practice labs. The usage drill gives ten fresh sentences on words lawyers often confuse."],
 tips:["Read one short Supreme Court judgment a week and write a one-page brief using the IRAC pattern.","Write every project in OSCOLA from the first draft – fixing citations at the end takes longer.","Join the moot and debating societies early; volunteer as a researcher before you speak.","Keep a 'phrases' notebook of useful openings and transitions from judgments.","Read The Merchant of Venice Act IV aloud with friends – it is the most famous trial in English literature."],
 about:"TNNLU lists English II as the second-semester language course of the B.A. LL.B. (Hons.). The units follow the usual second-semester legal English course of Indian law universities and build on the <a href=\"/tools/llb-ba-english-1.html\">English I explorer</a>. Compare with TNNLU's own course outline when it is issued."
};
const FOOT = "English II explorer · v1.0.0 · Reference material for second-semester B.A. LL.B. students, based on the usual second-semester legal English syllabus. Always check against your own course outline.";

const FLASH = [
 ["Ratio decidendi","The legal principle necessary for the decision – binding on lower courts."],
 ["Obiter dictum","A remark made in passing, not necessary for the decision – persuasive only."],
 ["Headnote","A publisher's summary at the top of a reported case – useful, but not part of the judgment."],
 ["Bench strength","The number of judges hearing the case – a larger bench's ratio binds a smaller one."],
 ["Dissent","A judgment disagreeing with the majority – not binding, but may become law later."],
 ["IRAC","Issue, Rule, Application, Conclusion – a plan for problem answers."],
 ["Case comment","A short critical article on one judgment: facts, issues, holding, analysis, your view."],
 ["Abstract","A 150–250 word summary of a research paper's question, method and findings."],
 ["Research question","The precise question a paper answers; it should be narrow enough to answer in the word limit."],
 ["OSCOLA","Oxford standard for citing legal authorities in footnotes."],
 ["Ibid","'In the same place' – used for a citation identical to the one immediately before (OSCOLA allows it)."],
 ["Plagiarism","Using another's words or ideas without credit; UGC Regulations, 2018 punish it in academic work."],
 ["Memorial","The written submission in a moot court competition."],
 ["Prayer","The relief asked for at the end of a petition or memorial."],
 ["Rebuttal","The applicant's short reply to points raised by the respondent."],
 ["May it please the Court","A traditional opening of oral submissions."],
 ["My learned friend","How counsel refers to opposing counsel in court."],
 ["Signposting","Telling the listener the structure: 'I will make three submissions…'"],
 ["Shall","Imposes a duty."],
 ["May","Gives a discretion or permission."],
 ["Proviso","An exception introduced by 'Provided that…'."],
 ["Non-obstante clause","'Notwithstanding anything contained in…' – gives overriding effect."],
 ["Legal notice","A formal letter stating facts, the claim and the demand before legal action."],
 ["Affidavit","A sworn written statement of facts, ending with a verification."],
 ["Ethos, pathos, logos","Aristotle's three modes of persuasion: the speaker's credibility, the audience's emotions, and logical argument."],
 ["Rhetorical question","A question asked for effect, not for an answer."],
 ["Shylock's bond","In The Merchant of Venice, a pound of flesh as security for a loan – defeated by strict reading of the bond."],
 ["Equity","Fairness that softens the strict letter of law – Portia's appeal to mercy is often read as equity's voice."],
 ["Ad hominem","Attacking the person instead of the argument."],
 ["Straw man","Misrepresenting an argument to attack it more easily."]
];

const QUIZ = [
 [1,"The binding part of a judgment is the…",["Headnote","Obiter dictum","Ratio decidendi","Dissent"],2,"The principle necessary to decide the case."],
 [1,"A judge's comment on what the law would be in a different situation is…",["Ratio","Obiter dictum","Prayer","Holding"],1,"Said by the way."],
 [1,"Which is NOT part of the judgment itself?",["Facts","Issues","Headnote by the law reporter","Reasoning"],2,"Added by the publisher."],
 [1,"'Everyone in my class supports the bill, so the country supports it' is…",["Hasty generalisation","Ad hominem","Valid deduction","Straw man"],0,"Too small a sample."],
 [1,"A Constitution Bench of five judges binds…",["Only itself","A larger bench","Benches of fewer judges","No one"],2,"Bench strength matters (Central Board of Dawoodi Bohra Community, 2005)."],
 [2,"In IRAC, the 'R' stands for…",["Reason","Rule","Result","Remedy"],1,"The legal rule that applies."],
 [2,"A case comment should mainly…",["Retell the facts in full","Critically analyse the judgment","Copy the headnote","List all statutes"],1,"Analysis is the point."],
 [2,"In OSCOLA, a case name is written in…",["Bold","Italics","Capitals","Quotation marks"],1,"Italics."],
 [2,"'Ibid' is used when…",["Citing a new source","The source is the same as the previous footnote","The author is unknown","Quoting a statute"],1,"Same place."],
 [2,"A good research question is…",["Very broad","Narrow and answerable","A statement","Copied from the title"],1,"Focused."],
 [3,"In a moot, the written submission is the…",["Brief","Memorial","Affidavit","Plaint"],1,"Memorial."],
 [3,"Counsel refers to opposing counsel as…",["My opponent","My learned friend","That lawyer","Sir"],1,"Courtroom courtesy."],
 [3,"When a judge asks a question in the middle of your submission, you should…",["Ignore it and continue","Answer directly, then return to your outline","Ask the judge to wait","Change the topic"],1,"Answer the bench first."],
 [3,"'I will make three submissions: first…' is an example of…",["Rebuttal","Signposting","Prayer","Obiter"],1,"Guides the listener."],
 [3,"The applicant's reply to the respondent's points is the…",["Prayer","Rebuttal","Memorial","Headnote"],1,"Usually short."],
 [4,"'The tenant shall not sublet the premises' expresses…",["Discretion","Duty","Prohibition","Definition"],2,"Shall not = prohibition."],
 [4,"'Provided that…' introduces a…",["Definition","Proviso","Preamble","Schedule"],1,"An exception."],
 [4,"An affidavit ends with a…",["Prayer","Verification","Rebuttal","Headnote"],1,"Stating which paragraphs are true."],
 [4,"A legal notice usually gives the other party…",["No time","A fixed time to comply before legal action","A court date","A judgment"],1,"Often 15 or 30 days."],
 [4,"Gender-neutral drafting prefers…",["Chairman","Chairperson","Chairwoman always","Chair-man"],1,"Or 'the Chair'."],
 [5,"Shylock's claim fails because…",["The bond was oral","The bond gave flesh but no blood","Antonio paid","The Duke pardoned him"],1,"Strict construction of the bond."],
 [5,"Portia's speech on mercy appeals mainly to…",["Logos","Pathos and moral sense","Statute","Precedent"],1,"Mercy 'is twice blest'."],
 [5,"Appealing to your own experience and credibility is…",["Logos","Ethos","Pathos","Kairos"],1,"Character of the speaker."],
 [5,"'Law in literature' studies…",["How novels and plays depict law and justice","How to cite novels","Copyright only","Statutes about books"],0,"As distinct from 'law as literature' (reading law as text)."],
 [5,"A rhetorical question is asked…",["To get information","For effect","By the judge only","In writing only"],1,"No answer expected."]
];

const DRILL = [
 ["The court will ____ the facts before deciding.",["ascertain","assert"],0],
 ["The parties reached a ____ agreement.",["mutual","common"],0],
 ["The judgment had an ____ effect on tenants.",["adverse","averse"],0],
 ["She is ____ to taking risks.",["averse","adverse"],0],
 ["Hearing of the appeal will ____ the final decision.",["precede","proceed"],0],
 ["Let us ____ with the next case.",["proceed","precede"],0],
 ["The witness gave ____ evidence.",["credible","creditable"],0],
 ["The team's performance in the moot was ____.",["creditable","credible"],0],
 ["The minister made an ____ visit to the flood zone.",["official","officious"],0],
 ["The clerk's ____ manner annoyed everyone.",["officious","official"],0],
 ["The tenant was ____ for non-payment.",["evicted","evinced"],0],
 ["The ____ of the case are not in dispute.",["facts","fact's"],0],
 ["The court gave its ____ on Monday.",["judgment","judgement's"],0],
 ["The accused was ____ of all charges.",["acquitted","acquainted"],0],
 ["The new rule will ____ from 1 April.",["apply","applies"],0],
 ["The lawyer tried to ____ sympathy from the jury.",["elicit","illicit"],0],
 ["This is a ____ point of law.",["moot","mute"],0],
 ["The defence will ____ the prosecution's evidence.",["rebut","rebuke"],0],
 ["The petitioner ____ that the order was illegal.",["contended","contented"],0],
 ["The property was held in ____ for the children.",["trust","truss"],0]
];

//@@VIEWS
VIEWS.home = { html: homeView };

/* ---------------- UNIT 1 ---------------- */
const JUD_SVG=flowSVG("jd",[["Cause title and coram","parties, court, bench, date"],["Facts and procedural history","how the case reached this court"],["Issues","the questions the court must answer"],["Arguments","both sides' submissions"],["Analysis and reasoning","law applied to facts – find the ratio here"],["Holding and order","the answer and the relief"]],"Structure of a judgment");
VIEWS.u1 = { html(){ return unitHead(1)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">A judgment is an <b>argument</b>: facts, questions, reasons, answer. Read to find the <b>issues</b> and the <b>reasoning</b> that decides them – that is where the <b>ratio decidendi</b> lies.</div>
 <h4>How to read a judgment</h4><ol><li>Note the court, bench strength and date – it tells you how binding it is.</li><li>Skim the headnote (the publisher's summary) to orient yourself, but do not rely on it.</li><li>Write down the issues in your own words.</li><li>Mark the reasoning for each issue; separate what was necessary (ratio) from remarks in passing (obiter).</li><li>Note concurring and dissenting opinions – today's dissent can be tomorrow's law (Justice H.R. Khanna in ADM Jabalpur, 1976, vindicated in Puttaswamy, 2017).</li></ol>
 <h4>Arguments and assumptions</h4><p>An argument has a <b>conclusion</b> and <b>premises</b>. Ask: are the premises true? Do they support the conclusion? What is <b>assumed</b> but not said?</p>
 <h4>Fallacies to spot</h4><table class="t"><tr><td>Ad hominem</td><td>Attacks the person</td></tr><tr><td>Straw man</td><td>Distorts the opposing view</td></tr><tr><td>False dilemma</td><td>Only two options when there are more</td></tr><tr><td>Slippery slope</td><td>One step must lead to disaster</td></tr><tr><td>Hasty generalisation</td><td>Broad conclusion from few cases</td></tr><tr><td>Appeal to authority</td><td>'An expert said so' outside their field</td></tr><tr><td>Circular reasoning</td><td>The conclusion is in the premise</td></tr></table></div>
</div><div>
 ${animBox("jdAnim","Anatomy of a judgment",JUD_SVG)}
 <div class="card lab"><h3>Ratio or obiter?</h3><div id="lab1"></div></div>
 <div class="card lab"><h3>Name the fallacy</h3><div id="lab1b"></div></div>
</div></div>`+unitFoot(1)+footer(); },
 init(){
  anim=flowAnim("jdAnim","jd",6,[
   "<b>Cause title and coram.</b> Who v who, which court, which judges, what date. A larger bench binds smaller ones.",
   "<b>Facts and procedural history.</b> What happened, and how the case came up – trial, appeal, writ.",
   "<b>Issues.</b> The precise legal questions. Some judgments list them; often you must frame them yourself.",
   "<b>Arguments.</b> The court records each side's submissions – useful for moots and exam answers.",
   "<b>Analysis and reasoning.</b> The court applies law to facts. The principle necessary for the answer is the <b>ratio</b>; side remarks are <b>obiter</b>.",
   "<b>Holding and order.</b> The answer to each issue and the relief – appeal allowed or dismissed, costs, directions."]);
  choiceLab("#lab1",[
   ["In Donoghue v Stevenson, the principle that a manufacturer owes a duty of care to the ultimate consumer.","R","Necessary for the decision."],
   ["A judge's remark that the result might be different if the bottle had been clear glass.","O","A hypothetical – said by the way."],
   ["In Maneka Gandhi, the holding that a procedure depriving liberty must be fair, just and reasonable.","R","The core principle."],
   ["A judge's general observations on the history of passports in Britain.","O","Background, not necessary."]
  ],{R:"Ratio decidendi",O:"Obiter dictum"});
  choiceLab("#lab1b",[
   ["'My opponent is a first-year student, so his reading of Article 21 must be wrong.'","AH","Ad hominem."],
   ["'The law is just because it is the law.'","CR","Circular reasoning."],
   ["'Either we ban social media or misinformation will destroy democracy.'","FD","False dilemma."],
   ["'A famous cricketer says this new tax law is unconstitutional, so it is.'","AA","Appeal to authority outside the field."]
  ],{AH:"Ad hominem",FD:"False dilemma",AA:"Appeal to authority",CR:"Circular reasoning"});
  miniQuiz(1);
 }};

/* ---------------- UNIT 2 ---------------- */
VIEWS.u2 = { html(){ return unitHead(2)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">Law-school writing rewards <b>structure</b> and <b>support</b>: answer the question asked, follow a clear plan, and back every proposition with an authority – cited properly.</div>
 <h4>Problem answers – IRAC</h4><ol><li><b>Issue</b> – the legal question raised by the facts.</li><li><b>Rule</b> – the section, principle or leading case.</li><li><b>Application</b> – apply the rule to these facts; consider both sides.</li><li><b>Conclusion</b> – a clear answer, with any qualification.</li></ol>
 <h4>Case comment</h4><p>Title and citation → facts in brief → issues → holding → analysis (Is the reasoning sound? Is it consistent with earlier cases? What are its consequences?) → conclusion. Your own view is expected.</p>
 <h4>Research paper</h4><p>Title → abstract → introduction with research question, hypothesis and method → literature review → analysis in headed sections → conclusion and suggestions → bibliography. Choose a narrow question: not 'Privacy in India' but 'Does the DPDP Act, 2023 meet the Puttaswamy proportionality test for government exemptions?'</p>
 <h4>Citation (OSCOLA pattern)</h4><table class="t"><tr><td>Case</td><td><i>Maneka Gandhi v Union of India</i> (1978) 1 SCC 248</td></tr><tr><td>Statute</td><td>Indian Contract Act 1872, s 10</td></tr><tr><td>Book</td><td>M.P. Jain, <i>Indian Constitutional Law</i> (8th edn, LexisNexis 2018) 45</td></tr><tr><td>Article</td><td>Author, 'Title' (year) volume Journal first page</td></tr><tr><td>Website</td><td>Author, 'Title' (Site, date) &lt;URL&gt; accessed date</td></tr></table>
 <h4>Plagiarism</h4><p>Quote exact words in quotation marks with a footnote; paraphrase in your own words and still cite. Most universities run similarity checks; UGC's 2018 Regulations prescribe penalties.</p></div>
</div><div>
 <div class="card lab"><h3>Put the IRAC answer in order</h3><p><b>Problem</b>: A, aged 16, signs a contract to buy a motorbike on credit. The seller sues for the price.</p><div id="lab2"></div></div>
 <div class="card lab"><h3>Citation fixer</h3><p>Which citation follows the OSCOLA pattern?</p><div id="lab2b"></div></div>
 <div class="card lab"><h3>Is it a good research question?</h3><div id="lab2c"></div></div>
</div></div>`+unitFoot(2)+footer(); },
 init(){
  orderLab("#lab2",["Issue: is a contract with a 16-year-old enforceable against him?","Rule: under ss 10–11 of the Indian Contract Act a minor is not competent to contract; such an agreement is void (Mohori Bibee v Dharmodas Ghose, 1903).","Application: A is a minor; a motorbike is not a necessary supplied to him under s 68, so the seller cannot recover the price from A personally.","Conclusion: the seller's suit fails, though he may seek restitution of the bike in equity."],"Issue → Rule → Application → Conclusion.");
  choiceLab("#lab2b",[
   ["A: Kesavananda Bharati v State of Kerala (1973) 4 SCC 225   B: Kesavananda Bharati Vs. State Of Kerala, 4 SCC 225, 1973","A","'v' (not 'Vs.'), year in round brackets before the volume; in print the case name is italicised."],
   ["A: Indian Penal Code, Section 302   B: Indian Penal Code 1860, s 302","B","Year and 's' for section."],
   ["A: Granville Austin, <i>The Indian Constitution: Cornerstone of a Nation</i> (OUP 1966)   B: The Indian Constitution by Austin","A","Author, italic title, publisher and year in brackets."]
  ].map(x=>[x[0].replace(/<\/?i>/g,""),x[1],x[2]]),{A:"Version A",B:"Version B"});
  choiceLab("#lab2c",[
   ["'Environmental law in India.'","N","A topic, not a question – far too broad."],
   ["'Has the polluter-pays principle reduced tannery pollution in the Palar basin since Vellore Citizens (1996)?'","Y","Narrow, answerable, with place and time."],
   ["'Is law good?'","N","Vague and unanswerable."],
   ["'Do Tamil Nadu's family courts follow the six-month cooling-off waiver in Amardeep Singh v Harveen Kaur (2017)?'","Y","Specific and researchable."]
  ],{Y:"Good question",N:"Needs narrowing"});
  miniQuiz(2);
 }};

/* ---------------- UNIT 3 ---------------- */
VIEWS.u3 = { html(){ return unitHead(3)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">Advocacy is <b>structured persuasion</b>: a clear roadmap, the strongest point first, authority for every proposition, and complete respect for the bench and opponent.</div>
 <h4>A moot court round</h4><ol><li>Written <b>memorials</b> filed by each side.</li><li>Oral rounds: Applicant (Petitioner) speaks first, then Respondent – usually 15–20 minutes per speaker.</li><li>Applicant's short <b>rebuttal</b>; Respondent's <b>surrebuttal</b> if allowed.</li><li>Judges question throughout and score on law, application, answers to questions and style.</li></ol>
 <h4>Oral submissions – a plan</h4><p>'May it please the Court. I, ____, appear for the Petitioner along with my co-counsel ____. I will address issues one and two; my co-counsel will address issue three.' Then: roadmap → submission 1 (rule, authority, application) → submission 2 → prayer. Ask the bench before reading facts: 'Would Your Honours like a brief summary of the facts?'</p>
 <h4>Etiquette</h4><ul><li>Stand when addressing the bench; address as 'Your Honour' / 'Your Lordship' / 'Your Ladyship' as the court prefers.</li><li>Refer to the other side as 'my learned friend'; never interrupt.</li><li>If you do not know an answer, say so honestly and offer to return to it.</li><li>Dress: black and white; bands and gown where required.</li></ul>
 <h4>Debate, GD and presentations</h4><p>Debate: define the motion, state your case line, rebut the other side's best point. GD: build on others, invite quiet members, summarise. Presentation: hook, roadmap, three points, summary, questions.</p></div>
</div><div>
 <div class="card lab"><h3>Order the oral submission</h3><div id="lab3"></div></div>
 <div class="card lab"><h3>Courtroom manners</h3><div id="lab3b"></div></div>
</div></div>`+unitFoot(3)+footer(); },
 init(){
  orderLab("#lab3",["'May it please the Court. I appear for the Petitioner with my co-counsel.'","Roadmap: 'I will make two submissions on issue one…'","Submission 1: the rule, the leading authority and how it applies","Answer any question from the bench, then continue","Submission 2: the rule, authority and application","Prayer: 'In light of the submissions made, the Petitioner humbly prays that this Hon'ble Court may…'"],"Opening, roadmap, submissions with authority, prayer.");
  choiceLab("#lab3b",[
   ["Saying 'my learned friend is wrong' calmly and giving the authority.","G","Firm and respectful."],
   ["Interrupting the opposing counsel to correct a fact.","B","Wait for your turn or rebuttal."],
   ["Answering 'I am not certain, Your Honour; I will check and return to this.'","G","Honesty builds credibility."],
   ["Reading the whole memorial aloud without looking up.","B","Speak to the bench, not the paper."],
   ["Thanking the bench at the end and sitting only after the judges respond.","G","Courtesy."]
  ],{G:"Good practice",B:"Avoid"});
  miniQuiz(3);
 }};

/* ---------------- UNIT 4 ---------------- */
VIEWS.u4 = { html(){ return unitHead(4)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">A drafter writes for a reader who may want to <b>misunderstand</b>. Choose words for their exact legal effect, define terms once, and use the same word for the same thing throughout.</div>
 <h4>Words of obligation</h4><table class="t"><tr><th>Word</th><th>Effect</th></tr><tr><td>shall / must</td><td>duty</td></tr><tr><td>may</td><td>discretion or permission</td></tr><tr><td>shall not / must not</td><td>prohibition</td></tr><tr><td>is entitled to</td><td>right</td></tr></table>
 <h4>Devices</h4><ul><li><b>Definitions</b> – 'means' (exhaustive) and 'includes' (extends).</li><li><b>Proviso</b> – 'Provided that…', an exception.</li><li><b>Non-obstante clause</b> – 'Notwithstanding anything contained in…'.</li><li><b>Explanation</b> and <b>Illustration</b> – as in the Bharatiya Nyaya Sanhita, 2023.</li></ul>
 <h4>Three documents to know</h4><table class="t"><tr><th>Document</th><th>Parts</th></tr>
 <tr><td>Legal notice</td><td>Date, mode of delivery, addressee, facts in numbered paragraphs, legal basis, demand, time to comply, consequence</td></tr>
 <tr><td>Affidavit</td><td>Title, deponent's details, numbered statements of fact, verification, signature, attestation</td></tr>
 <tr><td>Writ petition (outline)</td><td>Cause title, synopsis and list of dates, facts, questions of law, grounds, prayer, affidavit</td></tr></table>
 <h4>Plain and fair language</h4><p>Short sentences, active voice, no archaic words ('hereinafter', 'witnesseth'). Gender-neutral terms: chairperson, they, the person. The Supreme Court's 2023 Handbook on Combating Gender Stereotypes lists stereotyping words and alternatives.</p></div>
</div><div>
 <div class="card lab"><h3>Shall, may or shall not?</h3><div id="lab4"></div></div>
 <div class="card lab"><h3>Affidavit builder (practice format)</h3>
  <div class="row"><label>Deponent <input type="text" id="afN" value="V Sakthi Kaavya, D/o K Vijay Anand, aged about 18 years" style="width:100%"></label></div>
  <div class="row" style="margin-top:6px"><label>Address <input type="text" id="afA" value="Avadi, Chennai 600071" style="width:100%"></label></div>
  <div class="row" style="margin-top:6px"><label>Facts (one per line)<br><textarea id="afF" rows="3" style="width:100%">I am a student of B.A. LL.B. (Hons.) at Tamil Nadu National Law University, Tiruchirappalli.
My original Class XII mark sheet was lost while travelling on 10 November 2026.
I have lodged a complaint about the loss with the police.</textarea></label></div>
  <div class="row"><button class="btn" id="afGo">Draft affidavit</button></div><div id="afOut"></div></div>
</div></div>`+unitFoot(4)+footer(); },
 init(){
  choiceLab("#lab4",[
   ["The Company ____ hold an annual general meeting every year.","SH","Duty."],
   ["The Board ____ appoint additional directors.","MA","Power or discretion."],
   ["No person ____ enter the premises without a pass.","SN","Prohibition."],
   ["The court ____ condone delay if sufficient cause is shown.","MA","Discretion."]
  ],{SH:"shall",MA:"may",SN:"shall not"});
  $("#afGo").onclick=()=>{ const v=id=>esc($("#"+id).value.trim()); const facts=$("#afF").value.split("\n").map(s=>s.trim()).filter(Boolean);
   $("#afOut").innerHTML=`<div class="act" style="white-space:normal;line-height:1.6;margin-top:10px"><p class="c"><b>AFFIDAVIT</b></p><p>I, ${v("afN")}, residing at ${v("afA")}, do hereby solemnly affirm and state as follows:</p><ol>${facts.map(f=>`<li>${esc(f)}</li>`).join("")}<li>This affidavit is made to obtain a duplicate copy of the said document and for no other purpose.</li></ol><p style="text-align:right">DEPONENT</p><p class="c"><b>VERIFICATION</b></p><p>Verified at ________ on this ____ day of ________, 20__, that the contents of paragraphs 1 to ${facts.length+1} above are true and correct to my knowledge and belief, and nothing material has been concealed.</p><p style="text-align:right">DEPONENT</p></div><p style="font-size:13px;color:var(--muted)">A practice format only. A real affidavit must be signed before a notary or oath commissioner, on stamp paper where required.</p>`; };
  $("#afGo").click();
  miniQuiz(4);
 }};

/* ---------------- UNIT 5 ---------------- */
VIEWS.u5 = { html(){ return unitHead(5)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">Literature shows law as people experience it – fear, hope, injustice, mercy. Reading it trains a lawyer's <b>imagination</b>, <b>empathy</b> and command of <b>persuasive language</b>.</div>
 <h4>Two approaches</h4><p><b>Law in literature</b>: how stories depict law and justice – Shakespeare's <i>The Merchant of Venice</i>, Dickens's <i>Bleak House</i> (the endless Jarndyce case), Kafka's <i>The Trial</i>, Premchand's stories of village justice. <b>Law as literature</b>: reading statutes and judgments as texts with style, narrative and rhetoric – Justice Krishna Iyer's prose, for example.</p>
 <h4>The trial in The Merchant of Venice (Act IV, Scene 1)</h4><p>Antonio borrowed 3,000 ducats from Shylock on a bond: if not repaid, Shylock may cut a pound of Antonio's flesh. Antonio defaults. In the Duke's court, Portia, disguised as a young lawyer, first appeals to mercy:</p>
 <div class="act">"The quality of mercy is not strain'd;<br>It droppeth as the gentle rain from heaven<br>Upon the place beneath: it is twice blest;<br>It blesseth him that gives and him that takes."</div>
 <p>When Shylock insists on his bond, she turns his own strict reading against him: the bond gives flesh but 'no jot of blood', and exactly one pound. Shylock cannot perform without breaking the law and loses everything.</p>
 <h4>Questions lawyers ask of the play</h4><ul><li>Should a court enforce an unconscionable bond? (Compare s.23 of the Contract Act – agreements opposed to public policy are void; and penalty clauses under s.74.)</li><li>Is Portia's literalism justice or a trick?</li><li>Was Shylock, an outsider, treated equally before the law?</li></ul>
 <h4>Rhetoric – Aristotle's three appeals</h4><p><b>Ethos</b> (credibility), <b>pathos</b> (emotion), <b>logos</b> (reason). Good advocacy uses all three – but in court, logos must lead.</p></div>
</div><div>
 <div class="card lab"><h3>Ethos, pathos or logos?</h3><div id="lab5"></div></div>
 <div class="card lab"><h3>Reading the trial scene</h3><div id="mvBox"></div><div class="row"><span class="score" id="mvScore" style="font-size:17px"></span></div></div>
</div></div>`+unitFoot(5)+footer(); },
 init(){
  choiceLab("#lab5",[
   ["'Having practised in this court for thirty years, I can assure Your Honours this procedure is settled.'","E","Credibility of the speaker."],
   ["'Section 10 requires free consent; the facts show coercion; therefore the contract is voidable.'","L","Logical argument."],
   ["'Think of the widow left with three children and no roof over their heads.'","P","Emotion."],
   ["'The statistics from the NCRB show a 40% fall after the law was passed.'","L","Evidence and reasoning."]
  ],{E:"Ethos",P:"Pathos",L:"Logos"});
  const Q=[
   [5,"Portia first tries to persuade Shylock by appealing to…",["The statute of Venice","Mercy","Money only","Precedent"],1,"'The quality of mercy is not strain'd.'"],
   [5,"Shylock's claim finally fails because…",["Antonio pays in time","The bond allows flesh but not blood","The Duke abolishes bonds","Portia is unmasked"],1,"Strict construction of the bond."],
   [5,"In Indian law, an agreement like Shylock's bond would most likely be…",["Valid and enforceable","Void as opposed to public policy (s.23)","A sale of goods","A tort"],1,"Its object is unlawful."],
   [5,"Mercy 'is twice blest' because it…",["Is given twice","Blesses both giver and receiver","Comes from two judges","Repeats the law"],1,"Portia's speech."]
  ];
  let got=0,n=0; $("#mvBox").innerHTML=Q.map((q,i)=>qHTML(q,"mv"+i)).join(""); bindQ($("#mvBox"),ok=>{ n++; if(ok) got++; $("#mvScore").textContent=`${got} / ${n} correct`; });
  miniQuiz(5);
 }};

/* ---------------- USAGE DRILL ---------------- */
VIEWS.drill = { html(){ return `<div class="unitban"><div class="k">Practise</div><h2>Usage drill</h2><p>Ten sentences from a bank of ${DRILL.length}; pick the right word. A fresh mix every time.</p></div>
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
 <tr><td>Glanville Williams, <i>Learning the Law</i>, Sweet &amp; Maxwell</td><td>Reading cases, exam technique</td></tr>
 <tr><td>S.C. Tripathi, <i>Legal Language, Legal Writing and General English</i>, Central Law Publications</td><td>Indian formats and legal terms</td></tr>
 <tr><td>Bryan Garner, <i>Legal Writing in Plain English</i>, Chicago</td><td>Drafting and clear prose</td></tr>
 <tr><td>Abhinav Chandrachud et al., moot court guides / <i>Mooting</i> handbooks (any recent edition)</td><td>Memorials and oral rounds</td></tr>
 <tr><td>William Shakespeare, <i>The Merchant of Venice</i> (any edition with notes)</td><td>Unit 5</td></tr>
 <tr><td>Anthony Weston, <i>A Rulebook for Arguments</i>, Hackett</td><td>Arguments and fallacies</td></tr>
 <tr><td><i>OSCOLA</i> (4th edn), University of Oxford</td><td>Citation – free PDF</td></tr></table></div>
 <div><div class="card"><h3>Online</h3><ul>
 <li><a href="https://www.law.ox.ac.uk/oscola" target="_blank" rel="noopener">OSCOLA</a> – guide and quick reference</li>
 <li><a href="https://indiankanoon.org" target="_blank" rel="noopener">Indian Kanoon</a> – free judgments to brief</li>
 <li><a href="https://www.sci.gov.in" target="_blank" rel="noopener">Supreme Court of India</a> – judgments, Handbook on Combating Gender Stereotypes</li>
 <li><a href="https://www.gutenberg.org" target="_blank" rel="noopener">Project Gutenberg</a> – free text of The Merchant of Venice</li>
 <li><a href="/tools/llb-ba-english-1.html">English I explorer</a> – grammar, précis and letters</li></ul></div></div></div>`+footer(); }};
