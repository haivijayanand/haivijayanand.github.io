/*
TOOL:    ba-soc2/content.js — Sociology II: Research Methods in Social Sciences (B.A. LL.B. Semester II), assembled by build.py
FAMILY:  law-explorers
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    Kaavya Study Materials – TNNLU B.A. LL.B. Semester I and II explorers (claude.ai, 2026-11-22)
CHANGES: 1.0.0 - first version
*/
const UNITS = [
 {id:"u1", n:1, title:"Social Research and the Scientific Method", short:"What research is; positivism and interpretivism; objectivity and values; types of research; doctrinal and empirical legal research."},
 {id:"u2", n:2, title:"Research Problem, Hypothesis and Design", short:"Choosing a problem; literature review; concepts, variables and hypotheses; research designs."},
 {id:"u3", n:3, title:"Sampling", short:"Population and sample; probability and non-probability sampling; sample size and sampling error."},
 {id:"u4", n:4, title:"Methods of Data Collection", short:"Observation, interviews, questionnaires and schedules, case studies, focus groups, secondary data, content analysis."},
 {id:"u5", n:5, title:"Measurement and Analysis", short:"Levels of measurement; scales; reliability and validity; coding and tabulation; simple statistics; qualitative analysis."},
 {id:"u6", n:6, title:"Ethics and the Research Report", short:"Informed consent, confidentiality and harm; plagiarism; structure of a research report; empirical legal studies in India."}
];
const EXTRAS = [
 {id:"flash", ic:"🃏", title:"Flashcards"},
 {id:"quiz", ic:"✅", title:"Quiz"},
 {id:"refs", ic:"📚", title:"References"}
];
const CASES = [], MAXIMS = [];
const HOME = {
 title:"Sociology II – Research Methods in Social Sciences",
 intro:["Every project you write at TNNLU is a piece of research. This course shows how social scientists ask good questions, choose people to study, collect evidence, measure it, analyse it and report it honestly – and how the same methods are now used in empirical legal research, from studies of undertrial prisoners to the working of family courts.",
  "The labs let you draw samples, fix bad survey questions, classify variables and check whether a study is ethical."],
 tips:["Pick a small question from your own project and walk it through each unit: problem, hypothesis, sample, method, analysis, report.","For every method, learn one strength, one weakness and one Indian example.","Read one empirical report from Project 39A, NCRB or a law school centre and identify its method and sample.","Practise writing hypotheses with a clear independent and dependent variable.","Use the flashcards and quiz to revise definitions."],
 about:"TNNLU lists this paper as 'Sociology – II (Research Methods in Social Sciences)'. The units follow the standard social research methodology syllabus of Indian universities, with legal examples added. It builds on <a href=\"/tools/llb-sociology.html?prog=ba\">Sociology I</a>. Compare with TNNLU's own course outline when it is issued."
};
const FOOT = "Sociology II explorer · v1.0.0 · Reference material for second-semester B.A. LL.B. students, based on the usual social research methods syllabus. Always check against your own course outline.";

const FLASH = [
 ["Social research","Systematic inquiry to discover, verify or extend knowledge about social life."],
 ["Positivism","Comte, Durkheim: study society like natural science – observable facts, measurement, laws."],
 ["Interpretivism","Weber's verstehen: understand the meanings people give to their actions."],
 ["Value neutrality","Weber: researchers should keep personal values out of analysis, though values guide the choice of topic."],
 ["Induction","Moving from specific observations to a general theory."],
 ["Deduction","Moving from a theory to a hypothesis tested against observations."],
 ["Doctrinal research","Library-based study of statutes, cases and legal principles."],
 ["Non-doctrinal (empirical) research","Study of how law actually works in society, using fieldwork and data."],
 ["Exploratory research","Investigates a little-known problem to gain insight and form hypotheses."],
 ["Descriptive research","Describes the characteristics of a group or situation accurately."],
 ["Explanatory research","Explains why something happens – tests cause and effect."],
 ["Hypothesis","A testable statement about the relationship between two or more variables."],
 ["Null hypothesis","States that there is no relationship or difference."],
 ["Independent variable","The presumed cause."],
 ["Dependent variable","The presumed effect."],
 ["Operationalisation","Turning a concept into something measurable – e.g. 'access to justice' as distance to the nearest court."],
 ["Cross-sectional design","Data collected at one point in time from a cross-section of people."],
 ["Longitudinal design","The same subjects studied over a long time (panel study)."],
 ["Population (universe)","All units the research is about."],
 ["Sampling frame","The list from which a sample is drawn – e.g. the electoral roll."],
 ["Simple random sample","Every unit has an equal chance of selection."],
 ["Stratified sample","Population divided into strata (e.g. by caste or gender); random samples from each."],
 ["Cluster sample","Random selection of groups (villages, schools) and then units within them."],
 ["Snowball sample","Respondents refer other respondents – used for hidden groups."],
 ["Sampling error","Difference between a sample result and the true population value due to chance."],
 ["Participant observation","Researcher joins the group's life to observe from within (Malinowski; M.N. Srinivas in Rampura)."],
 ["Questionnaire vs schedule","A questionnaire is filled in by the respondent; a schedule is filled in by the interviewer."],
 ["Leading question","A question that suggests the answer – 'Don't you agree that…?'"],
 ["Double-barrelled question","Asks two things at once – 'Are the police fair and efficient?'"],
 ["Focus group","A guided group discussion of 6–10 people on a topic."],
 ["Content analysis","Systematic counting and coding of content in documents, judgments or media."],
 ["Levels of measurement","Nominal, ordinal, interval, ratio."],
 ["Likert scale","Agreement scale, typically 5 points from strongly disagree to strongly agree."],
 ["Reliability","Consistency – the same result on repeated measurement."],
 ["Validity","Accuracy – measuring what it claims to measure."],
 ["Triangulation","Using several methods or sources to check findings."],
 ["Informed consent","Participants agree freely after being told the purpose, risks and their right to withdraw."],
 ["Hawthorne effect","People change their behaviour because they know they are being observed."]
];

const QUIZ = [
 [1,"Weber's method of understanding the meaning behind actions is called…",["Positivism","Verstehen","Induction","Sampling"],1,"Interpretive understanding."],
 [1,"Studying how many dowry cases end in conviction in three districts is…",["Doctrinal research","Empirical (non-doctrinal) research","Pure philosophy","Literature review"],1,"Uses field or statistical data."],
 [1,"Moving from observations to a general theory is…",["Deduction","Induction","Operationalisation","Coding"],1,"Specific → general."],
 [1,"Research to understand a little-known problem and form hypotheses is…",["Explanatory","Exploratory","Descriptive","Experimental"],1,"First look."],
 [2,"In 'Legal aid availability reduces the time undertrials spend in jail', the dependent variable is…",["Legal aid availability","Time spent in jail","Undertrials","Jail"],1,"The effect."],
 [2,"'There is no difference in conviction rates between men and women' is a…",["Research question","Null hypothesis","Sampling frame","Variable"],1,"No difference."],
 [2,"Studying the same 500 families every five years is a…",["Cross-sectional design","Longitudinal design","Case study","Content analysis"],1,"Over time."],
 [2,"A literature review mainly helps to…",["Fill pages","Find what is known and the gap your study fills","Avoid citing","Collect primary data"],1,"Locates your study."],
 [3,"Choosing every 10th name from a list after a random start is…",["Simple random","Systematic sampling","Quota","Snowball"],1,"Fixed interval."],
 [3,"To study sex workers' access to justice, the most practical method is often…",["Simple random sampling","Snowball sampling","Census","Cluster sampling of courts"],1,"Hidden population."],
 [3,"Dividing the population by gender and sampling randomly within each group is…",["Cluster","Stratified","Convenience","Purposive"],1,"Strata."],
 [3,"Larger samples generally…",["Increase sampling error","Reduce sampling error","Remove all bias","Need no frame"],1,"But cannot fix a biased method."],
 [4,"A schedule differs from a questionnaire because it is…",["Longer","Filled in by the interviewer","Only for children","Unstructured"],1,"Useful where respondents cannot read."],
 [4,"M.N. Srinivas's study of Rampura village used…",["Laboratory experiment","Participant observation","Online survey","Content analysis"],1,"Living in the village."],
 [4,"'Do you agree that the brave police deserve higher pay?' is a…",["Neutral question","Leading question","Open question","Filter question"],1,"Suggests the answer."],
 [4,"Counting how often the Supreme Court cites foreign judgments is…",["Focus group","Content analysis","Ethnography","Interview"],1,"Coding documents."],
 [4,"NCRB's Crime in India report is an example of…",["Primary data","Secondary data","Experimental data","Qualitative data"],1,"Collected by someone else."],
 [5,"Religion recorded as Hindu, Muslim, Christian… is measured at the…",["Nominal level","Ordinal level","Interval level","Ratio level"],0,"Categories without order."],
 [5,"A test that gives the same result each time is…",["Valid","Reliable","Random","Biased"],1,"Consistency."],
 [5,"Using surveys, interviews and court records together to check findings is…",["Triangulation","Sampling","Coding","Plagiarism"],0,"Several sources."],
 [5,"Monthly income in rupees is measured at the…",["Nominal level","Ordinal level","Interval level","Ratio level"],3,"True zero, equal intervals."],
 [6,"Before interviewing survivors of violence, the most important ethical step is…",["Paying them","Informed consent and protection from harm","Recording secretly","Publishing names"],1,"Consent, confidentiality, support."],
 [6,"Which section of a report states how data were collected?",["Abstract","Methodology","Bibliography","Appendix only"],1,"Method."],
 [6,"Project 39A's Death Penalty India Report (2016) was based on…",["Only judgments","Interviews with prisoners sentenced to death and their families","A laboratory experiment","Newspaper polls"],1,"Empirical research."],
 [6,"Changing data to support your hypothesis is…",["Triangulation","Fabrication/falsification – research misconduct","Coding","Sampling"],1,"Serious misconduct."]
];

//@@VIEWS
VIEWS.home = { html: homeView };

/* ---------------- UNIT 1 ---------------- */
const RP_SVG=flowSVG("rp",[["Choose the problem","interest, gap, feasibility"],["Review the literature","what is known?"],["Hypothesis or questions","variables defined"],["Research design","plan: who, how, when"],["Sampling and data collection","field work"],["Analysis","code, tabulate, interpret"],["Report","findings, limits, suggestions"]],"The research process");
VIEWS.u1 = { html(){ return unitHead(1)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">Research is <b>systematic</b>, <b>empirical</b> and <b>self-correcting</b>: it follows a planned process, rests on evidence anyone can check, and stays open to being proved wrong.</div>
 <h4>Can society be studied scientifically?</h4><table class="t"><tr><th>Positivism</th><th>Interpretivism</th></tr>
 <tr><td>Comte, Durkheim</td><td>Weber, Schutz, symbolic interactionists</td></tr><tr><td>Social facts are 'things' – external, measurable</td><td>Action has meaning – understand it (verstehen)</td></tr>
 <tr><td>Surveys, statistics, hypothesis testing</td><td>Participant observation, in-depth interviews</td></tr><tr><td>Durkheim's <i>Suicide</i> (1897) using rates</td><td>Studies of how judges or litigants make sense of courts</td></tr></table>
 <h4>Objectivity and values</h4><p>Weber: values legitimately guide the <b>choice of topic</b>, but analysis should be <b>value-neutral</b>. Gunnar Myrdal: state your values openly so readers can judge. Reflexivity: be aware of how your caste, gender and class shape what you see.</p>
 <h4>Types of research</h4><ul><li><b>Pure</b> (builds theory) and <b>applied</b> (solves a practical problem).</li><li><b>Exploratory</b>, <b>descriptive</b>, <b>explanatory</b>.</li><li><b>Quantitative</b> (numbers) and <b>qualitative</b> (meanings); mixed methods combine them.</li></ul>
 <h4>Legal research</h4><p><b>Doctrinal</b> – what the law is (statutes, cases, commentary). <b>Non-doctrinal / socio-legal / empirical</b> – how law works in practice and its effects. Upendra Baxi and the Indian Law Institute encouraged socio-legal research from the 1970s; the Law Commission and Supreme Court increasingly rely on empirical data (e.g. on pendency and prisons).</p></div>
</div><div>
 ${animBox("rpAnim","The research process",RP_SVG)}
 <div class="card lab"><h3>Doctrinal or empirical?</h3><div id="lab1"></div></div>
</div></div>`+unitFoot(1)+footer(); },
 init(){
  anim=flowAnim("rpAnim","rp",7,[
   "<b>Choose the problem.</b> Start from curiosity or a policy gap, but check feasibility: time, access, money, ethics.",
   "<b>Review the literature.</b> Find what is already known, the theories used and the gap your work will fill.",
   "<b>State hypotheses or research questions</b>, with concepts defined and variables operationalised.",
   "<b>Design the research.</b> Decide the type of study, the population, sample, methods and tools.",
   "<b>Collect data</b> – pre-test (pilot) the tools first, then go to the field or the archive.",
   "<b>Analyse.</b> Edit and code data, tabulate, test hypotheses or find themes; interpret carefully.",
   "<b>Report.</b> Present findings honestly with limitations and suggestions for policy or further research."]);
  choiceLab("#lab1",[
   ["Analysing all Supreme Court judgments on Article 21 since 1978 to trace the meaning of 'life'.","D","Library-based study of legal texts."],
   ["Interviewing 200 litigants in Tiruchirappalli family court on delay.","E","Fieldwork on how law works."],
   ["Comparing the Hindu Marriage Act and the Special Marriage Act provisions on divorce.","D","Doctrinal comparison."],
   ["Using NCRB data to see whether conviction rates changed after a new law.","E","Empirical, quantitative."]
  ],{D:"Doctrinal",E:"Empirical / socio-legal"});
  miniQuiz(1);
 }};

/* ---------------- UNIT 2 ---------------- */
VIEWS.u2 = { html(){ return unitHead(2)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">A study is only as good as its <b>question</b>. Turn a broad interest into a narrow, researchable problem; define your <b>concepts</b>; state a testable <b>hypothesis</b> linking an <b>independent</b> and a <b>dependent</b> variable; then choose a <b>design</b> that can answer it.</div>
 <h4>Selecting a problem</h4><p>Criteria: interest, novelty, importance, feasibility (time, money, access), availability of data, ethical acceptability. From topic to problem: 'Legal aid' → 'Why do undertrials in Tiruchirappalli Central Prison not use free legal aid?'</p>
 <h4>Concepts and variables</h4><p>A <b>concept</b> is an abstract idea (poverty, access to justice); <b>operationalise</b> it into measurable <b>indicators</b> (household income below a line; distance to court). Variables: <b>independent</b> (cause), <b>dependent</b> (effect), <b>intervening</b> and <b>control</b> variables.</p>
 <h4>Hypothesis</h4><p>A tentative, testable statement about the relation between variables. Good hypotheses are clear, specific, testable, related to theory and value-free. Types: <b>descriptive</b>, <b>relational</b>, <b>causal</b>; <b>null</b> (H₀: no relationship) and <b>alternative</b> (H₁).</p>
 <h4>Research designs</h4><table class="t"><tr><th>Design</th><th>Use</th></tr>
 <tr><td>Experimental / quasi-experimental</td><td>Test causes with treatment and control groups</td></tr><tr><td>Cross-sectional survey</td><td>Snapshot of many cases at one time</td></tr>
 <tr><td>Longitudinal (panel, trend, cohort)</td><td>Change over time</td></tr><tr><td>Case study</td><td>In-depth study of one unit – a village, a court, a movement</td></tr>
 <tr><td>Comparative</td><td>Compare groups, regions or countries</td></tr></table></div>
</div><div>
 <div class="card lab"><h3>Find the variables</h3><p>Pick the <b>independent</b> variable (the cause) in each hypothesis.</p><div id="lab2"></div></div>
 <div class="card lab"><h3>Good hypothesis?</h3><div id="lab2b"></div></div>
</div></div>`+unitFoot(2)+footer(); },
 init(){
  const H=[["Women with more years of schooling are more likely to know about the Domestic Violence Act.",["Years of schooling","Knowledge of the Act","Women","Domestic violence"],0],
   ["Undertrials represented by private lawyers get bail faster than those with legal-aid lawyers.",["Type of lawyer","Time to get bail","Undertrials","Bail"],0],
   ["Villages with a nyaya panchayat file fewer civil suits in the district court.",["Presence of a nyaya panchayat","Number of civil suits filed","District court","Villages"],0],
   ["Law students who moot more score higher in oral examinations.",["Mooting experience","Oral examination scores","Law students","Examinations"],0]];
  $("#lab2").innerHTML=H.map((h,i)=>qHTML([2,h[0],h[1],h[2],`Independent: ${h[1][0]}; dependent: ${h[1][1]}.`],"hv"+i)).join(""); bindQ($("#lab2"));
  choiceLab("#lab2b",[
   ["'Justice is good.'","N","Not testable – a value statement."],
   ["'Literacy rates are positively related to voter turnout in Tamil Nadu districts.'","Y","Clear, specific, testable."],
   ["'Courts are sometimes slow and sometimes not.'","N","Vague – cannot be wrong."],
   ["'Fast-track courts reduce the average time to verdict in sexual-offence trials.'","Y","Causal and testable."]
  ],{Y:"Good hypothesis",N:"Not a good hypothesis"});
  miniQuiz(2);
 }};

/* ---------------- UNIT 3 ---------------- */
VIEWS.u3 = { html(){ return unitHead(3)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">We rarely study everyone. A <b>sample</b> lets us learn about a <b>population</b> – but only if it is chosen so that it represents that population. <b>Probability</b> samples allow us to estimate error; <b>non-probability</b> samples are quicker but riskier.</div>
 <h4>Probability sampling</h4><table class="t"><tr><th>Method</th><th>How</th><th>Example</th></tr>
 <tr><td>Simple random</td><td>Lottery or random numbers – equal chance</td><td>200 names from the voters' list by computer</td></tr>
 <tr><td>Systematic</td><td>Every k-th unit after a random start</td><td>Every 10th case file in the register</td></tr>
 <tr><td>Stratified</td><td>Random within strata</td><td>Equal numbers of urban and rural litigants</td></tr>
 <tr><td>Cluster / multi-stage</td><td>Randomly choose groups, then units</td><td>NFHS: districts → villages → households</td></tr></table>
 <h4>Non-probability sampling</h4><table class="t"><tr><th>Method</th><th>How</th><th>Risk</th></tr>
 <tr><td>Convenience</td><td>Whoever is easy to reach</td><td>Strong bias</td></tr><tr><td>Purposive (judgemental)</td><td>Chosen for expertise or typicality</td><td>Depends on judgement</td></tr>
 <tr><td>Quota</td><td>Fill set numbers of each type</td><td>Non-random within quotas</td></tr><tr><td>Snowball</td><td>Respondents refer others</td><td>Network bias; useful for hidden groups</td></tr></table>
 <h4>Sample size and error</h4><p>Sampling error falls as sample size rises (roughly with √n), but a large biased sample is still wrong – the 1936 <i>Literary Digest</i> poll of 2.4 million wrongly predicted Roosevelt's defeat because its frame (telephone and car owners) over-represented the rich.</p></div>
</div><div>
 <div class="card lab"><h3>Sampling simulator</h3><p>A town of 1,000 adults: <b>30%</b> have used legal aid. People near the court (the first 200 on the list) use it far more. Draw samples and compare the estimate with the truth.</p>
  <div class="row"><label>Sample size <input type="range" id="smN" min="20" max="400" step="20" value="100"></label><span id="smNv"></span></div>
  <div class="row"><button class="btn" id="smR">Random sample</button><button class="btn sec" id="smC">Convenience sample (near the court)</button><button class="btn sec sm" id="smClr">Clear</button></div>
  <div id="smG"></div><div id="smOut" class="fb info">Draw a few samples of each kind.</div></div>
 <div class="card lab"><h3>Name the sampling method</h3><div id="lab3"></div></div>
</div></div>`+unitFoot(3)+footer(); },
 init(){
  const POP=[]; for(let i=0;i<1000;i++){ const nearP=i<200?0.75:0.1875; POP.push(Math.random()<nearP?1:0); }
  const truth=POP.reduce((a,b)=>a+b)/10; let R=[],C=[];
  const draw=()=>{ $("#smNv").textContent=" "+$("#smN").value;
   const X=v=>40+v*5, s=`<svg viewBox="0 0 560 170" class="graph"><line class="axis" x1="40" y1="120" x2="540" y2="120"/>${[0,20,40,60,80,100].map(v=>`<text class="tick" x="${X(v)}" y="140" text-anchor="middle">${v}%</text>`).join("")}
    <line class="ctl" x1="${X(truth)}" y1="20" x2="${X(truth)}" y2="120"/><text class="ctlt" x="${X(truth)+5}" y="32">true ${truth.toFixed(1)}%</text>
    ${R.map(v=>`<circle class="dotp" cx="${X(v)}" cy="${70+(Math.random()*20-10)}" r="6"/>`).join("")}${C.map(v=>`<rect class="boxp" x="${X(v)-6}" y="${95+(Math.random()*14-7)}" width="12" height="12"/>`).join("")}
    <text class="tick" x="44" y="62">● random</text><text class="tick" x="44" y="160">■ convenience</text></svg>`;
   $("#smG").innerHTML=s; };
  const sample=conv=>{ const n=+$("#smN").value; let k=0; for(let j=0;j<n;j++){ const idx=conv?Math.floor(Math.random()*Math.min(250,1000)):Math.floor(Math.random()*1000); k+=POP[idx]; } return 100*k/n; };
  const report=()=>{ const avg=a=>a.length?(a.reduce((x,y)=>x+y)/a.length).toFixed(1)+"%":"–";
   $("#smOut").innerHTML=`Random samples average <b>${avg(R)}</b>; convenience samples average <b>${avg(C)}</b>; the truth is <b>${truth.toFixed(1)}%</b>. Random estimates scatter around the truth and tighten as the sample grows. Convenience estimates are biased – a bigger sample does not cure that.`; };
  $("#smR").onclick=()=>{ R.push(sample(false)); draw(); report(); };
  $("#smC").onclick=()=>{ C.push(sample(true)); draw(); report(); };
  $("#smClr").onclick=()=>{ R=[];C=[]; draw(); $("#smOut").textContent="Draw a few samples of each kind."; };
  $("#smN").oninput=draw; draw();
  choiceLab("#lab3",[
   ["Every 20th FIR from the station register after picking the first at random.","SY","Systematic."],
   ["Interviewing whoever comes out of the court building between 10 and 12.","CO","Convenience."],
   ["Randomly choosing 10 districts, then 5 villages in each, then 10 households per village.","CL","Multi-stage cluster."],
   ["Asking each bonded labourer interviewed to introduce others.","SN","Snowball."],
   ["Dividing lawyers by years of practice and drawing a random sample from each band.","ST","Stratified."]
  ],{SY:"Systematic",ST:"Stratified",CL:"Cluster",CO:"Convenience",SN:"Snowball"});
  miniQuiz(3);
 }};

/* ---------------- UNIT 4 ---------------- */
VIEWS.u4 = { html(){ return unitHead(4)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">Choose the method that fits the question: <b>surveys</b> for 'how many', <b>observation and interviews</b> for 'how and why', <b>documents</b> for what institutions record. Combine methods to check one against another (<b>triangulation</b>).</div>
 <table class="t"><tr><th>Method</th><th>Strength</th><th>Weakness</th><th>Example</th></tr>
 <tr><td>Participant observation</td><td>Rich, inside view</td><td>Time; observer effect; bias</td><td>M.N. Srinivas, <i>The Remembered Village</i></td></tr>
 <tr><td>Non-participant observation</td><td>Less intrusive</td><td>Misses meanings</td><td>Watching bail hearings from the gallery</td></tr>
 <tr><td>Structured interview / schedule</td><td>Comparable answers; works with non-literate respondents</td><td>Costly; interviewer bias</td><td>Census, NFHS</td></tr>
 <tr><td>Unstructured / in-depth interview</td><td>Depth, unexpected insights</td><td>Hard to compare</td><td>Life histories of prisoners</td></tr>
 <tr><td>Questionnaire (mailed/online)</td><td>Cheap, wide reach, anonymous</td><td>Low response; literate only</td><td>Student surveys</td></tr>
 <tr><td>Case study</td><td>Holistic depth</td><td>Hard to generalise</td><td>One village panchayat</td></tr>
 <tr><td>Focus group</td><td>Group views and interaction</td><td>Dominant voices</td><td>Women's views on a new law</td></tr>
 <tr><td>Secondary data</td><td>Quick, large</td><td>Not made for your question</td><td>Census, NCRB, NJDG, NSSO</td></tr>
 <tr><td>Content analysis</td><td>Systematic study of texts</td><td>Only what is written</td><td>Coding judgments or news reports</td></tr></table>
 <h4>Writing good questions</h4><ul><li>Simple words; one idea per question.</li><li>No leading, loaded or double-barrelled questions.</li><li>Clear time frames ('in the last 12 months').</li><li>Sensitive questions later, after rapport.</li><li>Always <b>pre-test</b> (pilot) the tool.</li></ul></div>
</div><div>
 <div class="card lab"><h3>Fix the survey question</h3><div id="lab4"></div></div>
 <div class="card lab"><h3>Which method fits?</h3><div id="lab4b"></div></div>
</div></div>`+unitFoot(4)+footer(); },
 init(){
  choiceLab("#lab4",[
   ["'Are the police in your area honest and efficient?'","DB","Two questions in one – ask separately."],
   ["'Don't you agree that corrupt judges should be jailed?'","LE","Suggests the answer."],
   ["'How many times have you visited the taluk court in the last 12 months?'","OK","Clear, single, with a time frame."],
   ["'What is your opinion on the jurisprudential underpinnings of the adversarial system?'","JA","Jargon – use simple words."],
   ["'Have you stopped bribing officials?'","LE","Loaded – assumes the respondent did."]
  ],{OK:"Good question",DB:"Double-barrelled",LE:"Leading / loaded",JA:"Jargon"});
  choiceLab("#lab4b",[
   ["How many households in Tamil Nadu own land titled in a woman's name?","SV","A large survey or secondary data."],
   ["How do transgender persons experience applying for identity certificates?","IN","In-depth interviews."],
   ["How do High Court judgments describe rape survivors over 20 years?","CA","Content analysis of judgments."],
   ["How does a village panchayat actually settle land disputes?","PO","Participant or non-participant observation and case study."]
  ],{SV:"Survey",IN:"In-depth interviews",CA:"Content analysis",PO:"Observation"});
  miniQuiz(4);
 }};

/* ---------------- UNIT 5 ---------------- */
VIEWS.u5 = { html(){ return unitHead(5)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">Measurement turns observations into data. The <b>level of measurement</b> decides which statistics you may use; <b>reliability</b> and <b>validity</b> decide whether the data can be trusted.</div>
 <h4>Levels of measurement</h4><table class="t"><tr><th>Level</th><th>Property</th><th>Example</th><th>Average</th></tr>
 <tr><td>Nominal</td><td>Categories only</td><td>Religion, state of residence</td><td>Mode</td></tr>
 <tr><td>Ordinal</td><td>Ordered categories</td><td>Satisfaction: low / medium / high</td><td>Median</td></tr>
 <tr><td>Interval</td><td>Equal intervals, no true zero</td><td>Temperature in °C</td><td>Mean</td></tr>
 <tr><td>Ratio</td><td>Equal intervals and true zero</td><td>Income, age, days in jail</td><td>Mean</td></tr></table>
 <h4>Scales</h4><p><b>Likert</b> (agree–disagree, usually 5 points), <b>Bogardus social distance</b> scale (willingness to accept groups as neighbours, friends, relatives – used in caste studies), <b>Thurstone</b> and <b>Guttman</b> scales.</p>
 <h4>Reliability and validity</h4><p><b>Reliability</b>: consistency (test–retest, inter-coder agreement). <b>Validity</b>: accuracy – does it measure what it claims? A clock that is always 10 minutes fast is reliable but not valid.</p>
 <h4>Processing and analysis</h4><ol><li><b>Editing</b> – check completeness and consistency.</li><li><b>Coding</b> – give numbers or labels to answers.</li><li><b>Tabulation</b> – frequency tables and cross-tabulations.</li><li><b>Statistics</b> – percentages, mean, median, mode, correlation, tests of significance.</li><li><b>Qualitative analysis</b> – thematic coding of interviews, finding patterns and quotes.</li><li><b>Interpretation</b> – what the findings mean; correlation is not causation.</li></ol></div>
</div><div>
 <div class="card lab"><h3>Which level of measurement?</h3><div id="lab5"></div></div>
 <div class="card lab"><h3>Quick statistics</h3><p>Enter numbers (e.g. days each undertrial spent in jail before bail), separated by commas.</p><input type="text" id="stIn" value="12, 30, 45, 7, 90, 30, 365, 21, 30, 60" style="width:100%"><div class="row"><button class="btn" id="stGo">Compute</button></div><div id="stOut"></div></div>
</div></div>`+unitFoot(5)+footer(); },
 init(){
  choiceLab("#lab5",[
   ["Mother tongue of respondents.","NO","Categories only."],
   ["Ranking of satisfaction with legal aid: poor, fair, good, excellent.","OR","Ordered."],
   ["Number of hearings before judgment.","RA","Counts have a true zero."],
   ["Year of birth (calendar year).","IN","Equal intervals, but year 0 is not 'no time'."],
   ["Monthly household income in rupees.","RA","True zero."]
  ],{NO:"Nominal",OR:"Ordinal",IN:"Interval",RA:"Ratio"});
  $("#stGo").onclick=()=>{ const a=$("#stIn").value.split(/[ ,;]+/).map(Number).filter(x=>!isNaN(x)&&x!==""); if(!a.length){ $("#stOut").innerHTML=""; return; }
   const s=a.slice().sort((x,y)=>x-y), n=s.length, mean=a.reduce((x,y)=>x+y)/n, med=n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2;
   const f={}; a.forEach(x=>f[x]=(f[x]||0)+1); const mx=Math.max(...Object.values(f)); const mode=Object.keys(f).filter(k=>f[k]===mx);
   const sd=Math.sqrt(a.reduce((t,x)=>t+(x-mean)**2,0)/n);
   $("#stOut").innerHTML=`<table class="t"><tr><td>n</td><td>${n}</td></tr><tr><td>Mean</td><td>${mean.toFixed(1)}</td></tr><tr><td>Median</td><td>${med}</td></tr><tr><td>Mode</td><td>${mx>1?mode.join(", "):"none (all values different)"}</td></tr><tr><td>Range</td><td>${s[0]} – ${s[n-1]}</td></tr><tr><td>Standard deviation</td><td>${sd.toFixed(1)}</td></tr></table><div class="fb info">${mean>med*1.3?"The mean is well above the median – a few very large values (like 365 days) pull it up. For skewed data such as time in jail, report the <b>median</b>.":"Mean and median are close – the data are fairly symmetric."}</div>`; };
  $("#stGo").click();
  miniQuiz(5);
 }};

/* ---------------- UNIT 6 ---------------- */
VIEWS.u6 = { html(){ return unitHead(6)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">Research involves real people. Respect their <b>autonomy</b> (informed consent), protect them from <b>harm</b>, keep their <b>confidence</b>, and report <b>honestly</b> – including what did not work.</div>
 <h4>Ethical principles</h4><ul><li><b>Informed consent</b> – purpose, procedures, risks, the right to refuse or withdraw; special care with children, prisoners and people in distress.</li><li><b>Confidentiality and anonymity</b> – remove identifying details; secure the data. The Digital Personal Data Protection Act, 2023 governs personal data processing.</li><li><b>No harm</b> – avoid re-traumatising survivors; give referral information for support.</li><li><b>Deception</b> only when unavoidable and approved, with debriefing.</li><li><b>Integrity</b> – no fabrication, falsification or plagiarism (UGC Regulations, 2018).</li><li><b>Ethics review</b> – many universities require approval by an institutional ethics committee before fieldwork.</li></ul>
 <h4>Structure of a research report</h4><ol><li>Title, acknowledgements, abstract</li><li>Introduction – problem, objectives, research questions or hypotheses</li><li>Review of literature</li><li>Methodology – design, sample, tools, limitations</li><li>Findings and analysis (tables, quotes)</li><li>Conclusion and suggestions</li><li>Bibliography and appendices (questionnaire, consent form)</li></ol>
 <h4>Empirical legal research in India – examples</h4><ul><li><b>Project 39A</b> (NLU Delhi), <i>Death Penalty India Report</i> (2016) – interviews with prisoners sentenced to death.</li><li><b>India Justice Report</b> (Tata Trusts and partners, from 2019) – ranks States on police, prisons, judiciary and legal aid using official data.</li><li><b>DAKSH</b> studies of court delay using National Judicial Data Grid data.</li><li>Law Commission reports that use field data (e.g. on arrears and bail).</li></ul></div>
</div><div>
 <div class="card lab"><h3>Ethical or not?</h3><div id="lab6"></div></div>
 <div class="card lab"><h3>Put the report in order</h3><div id="lab6b"></div></div>
</div></div>`+unitFoot(6)+footer(); },
 init(){
  choiceLab("#lab6",[
   ["Recording interviews with undertrials secretly to get 'honest' answers.","U","No consent."],
   ["Replacing respondents' names with codes and storing the key separately.","E","Protects confidentiality."],
   ["Telling a survivor she cannot stop the interview once it has begun.","U","The right to withdraw must be respected."],
   ["Explaining the study in Tamil, answering questions, then taking written or recorded consent.","E","Informed consent in the respondent's language."],
   ["Dropping cases that do not fit the hypothesis from the analysis without mentioning it.","U","Falsification."]
  ],{E:"Ethical",U:"Unethical"});
  orderLab("#lab6b",["Abstract","Introduction and research questions","Review of literature","Methodology","Findings and analysis","Conclusion and suggestions","Bibliography and appendices"],"The standard order of a research report.");
  miniQuiz(6);
 }};

/* ---------------- REFERENCES ---------------- */
VIEWS.refs = { html(){ return `<div class="unitban"><div class="k">Read further</div><h2>References</h2><p>Books are in the TNNLU library; online sources need internet.</p></div>
 <div class="two"><div class="card"><h3>Books</h3><table class="t"><tr><th>Book</th><th>Use it for</th></tr>
 <tr><td>Ram Ahuja, <i>Research Methods</i>, Rawat</td><td>Main Indian textbook for every unit</td></tr>
 <tr><td>C.R. Kothari and Gaurav Garg, <i>Research Methodology: Methods and Techniques</i>, New Age</td><td>Sampling, scales, statistics</td></tr>
 <tr><td>Goode and Hatt, <i>Methods in Social Research</i>, McGraw-Hill</td><td>Classic text – hypothesis, observation, interview</td></tr>
 <tr><td>Alan Bryman, <i>Social Research Methods</i>, OUP</td><td>Quantitative and qualitative methods</td></tr>
 <tr><td>Wilkinson and Bhandarkar, <i>Methodology and Techniques of Social Research</i>, Himalaya</td><td>Indian examples</td></tr>
 <tr><td>S.K. Verma and M. Afzal Wani (eds), <i>Legal Research and Methodology</i>, Indian Law Institute</td><td>Doctrinal and empirical legal research</td></tr>
 <tr><td>M.N. Srinivas, <i>The Remembered Village</i>, OUP</td><td>Participant observation in practice</td></tr></table></div>
 <div><div class="card"><h3>Online data and reports</h3><ul>
 <li><a href="https://censusindia.gov.in" target="_blank" rel="noopener">Census of India</a></li>
 <li><a href="https://ncrb.gov.in" target="_blank" rel="noopener">NCRB</a> – Crime in India, Prison Statistics India</li>
 <li><a href="https://njdg.ecourts.gov.in" target="_blank" rel="noopener">National Judicial Data Grid</a> – pendency data</li>
 <li><a href="https://indiajusticereport.org" target="_blank" rel="noopener">India Justice Report</a></li>
 <li><a href="https://www.project39a.com" target="_blank" rel="noopener">Project 39A</a> – empirical reports</li>
 <li><a href="https://egyankosh.ac.in" target="_blank" rel="noopener">eGyanKosh (IGNOU)</a> – research methods course material</li></ul></div>
 <div class="card"><h3>Related</h3><p><a href="/tools/llb-sociology.html?prog=ba">Sociology I</a> · <a href="/tools/llb-research-tools.html">Research Tools (B.Com. LL.B.)</a> – more statistics labs.</p></div></div></div>`+footer(); }};
