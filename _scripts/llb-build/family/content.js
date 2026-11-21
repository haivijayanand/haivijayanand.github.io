/*
TOOL:    family/content.js — course data and unit pages, assembled by build.py
FAMILY:  law-explorers
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    Kaavya Study Materials – TNNLU B.Com. LL.B. Semester II explorers (claude.ai, 2026-11-22)
CHANGES: 1.0.0 - first version
*/
const UNITS = [
 {id:"u1", n:1, title:"Sources, Schools and Application", short:"Who is a Hindu; shruti, smriti, custom; Mitakshara and Dayabhaga; the Hindu Code."},
 {id:"u2", n:2, title:"Hindu Marriage", short:"Conditions, ceremonies, registration; void and voidable marriages; sapinda and prohibited degrees."},
 {id:"u3", n:3, title:"Matrimonial Remedies", short:"Restitution, judicial separation, divorce grounds, mutual consent, irretrievable breakdown."},
 {id:"u4", n:4, title:"Maintenance", short:"HAMA, HMA ss.24–25, BNSS s.144 (old CrPC s.125), domestic violence relief."},
 {id:"u5", n:5, title:"Adoption", short:"HAMA ss.6–17: who may adopt, give and be adopted; effects; JJ Act adoption."},
 {id:"u6", n:6, title:"Minority and Guardianship", short:"Natural, testamentary and court guardians; powers over property; welfare of the child."},
 {id:"u7", n:7, title:"Special Marriage Act and Choice", short:"Civil marriage across religions, notice and objection, right to choose a partner."}
];

const EXTRAS = [
 {id:"flash", ic:"🃏", title:"Flashcards"},
 {id:"maxims", ic:"📜", title:"Terms and maxims"},
 {id:"cases", ic:"🏛️", title:"Leading cases"},
 {id:"quiz", ic:"✅", title:"Quiz"},
 {id:"brief", ic:"📝", title:"Case brief builder"},
 {id:"refs", ic:"📚", title:"References"}
];

const FLASH = [
 ["Hindu Code","The four Acts of 1955–56: Hindu Marriage Act, Hindu Succession Act, Hindu Minority and Guardianship Act, Hindu Adoptions and Maintenance Act."],
 ["Who is a Hindu (s.2 HMA)","Hindus by religion in any form, Buddhists, Jains and Sikhs, and anyone else domiciled in India who is not a Muslim, Christian, Parsi or Jew – unless shown not to be governed by Hindu law."],
 ["Shruti","'That which is heard' – the Vedas and Upanishads; the primary ancient source."],
 ["Smriti","'That which is remembered' – Manu, Yajnavalkya, Narada and other Dharmashastras."],
 ["Custom (s.3(a) HMA)","A rule continuously and uniformly observed for a long time, certain, not unreasonable and not opposed to public policy."],
 ["Mitakshara","Vijnaneshwara's commentary on the Yajnavalkya Smriti; followed in most of India. Son gets an interest in ancestral property by birth."],
 ["Dayabhaga","Jimutavahana's digest, followed in Bengal and Assam. No right by birth; the son gets property only on the father's death."],
 ["Sapinda relationship (s.3(f))","Up to 3 generations through the mother and 5 through the father, counting the person as the first generation."],
 ["Prohibited degrees (s.3(g))","Lineal ascendants, spouses of ascendants or descendants, brother's wife, uncles' wives, siblings, uncle–niece, aunt–nephew, children of siblings."],
 ["Conditions of marriage (s.5)","No living spouse; capable of valid consent; groom 21, bride 18; not within prohibited degrees or sapindas unless custom permits."],
 ["Saptapadi (s.7)","Taking seven steps together before the sacred fire; where it is part of the rites, the marriage is complete at the seventh step."],
 ["Void marriage (s.11)","Bigamy, prohibited degrees or sapinda relationship (unless custom) – a nullity from the start."],
 ["Voidable marriage (s.12)","Non-consummation due to impotence, mental incapacity, consent by force or fraud, bride pregnant by another man."],
 ["Legitimacy (s.16)","Children of void and voidable marriages are legitimate; they share in their parents' property, including the parent's share in coparcenary property (Revanasiddappa, 2023)."],
 ["Restitution of conjugal rights (s.9)","A decree directing a spouse who withdrew from the society of the other without reasonable excuse to return."],
 ["Judicial separation (s.10)","Spouses no longer bound to live together; the marriage continues."],
 ["Cruelty","Conduct making it unsafe or unreasonable to live together – physical or mental (Samar Ghosh v Jaya Ghosh, 2007)."],
 ["Desertion","Leaving the other spouse permanently without reasonable cause or consent, for at least two years before the petition (animus deserendi + factum)."],
 ["Divorce by mutual consent (s.13B)","Joint petition after one year's separation; second motion after 6 months (waivable) and within 18 months."],
 ["Irretrievable breakdown","Not a ground in the HMA; the Supreme Court can dissolve the marriage under Article 142 (Shilpa Sailesh, 2023)."],
 ["Section 14 HMA","No divorce petition within one year of marriage, except in exceptional hardship or depravity."],
 ["Permanent alimony (s.25)","Lump sum or periodic payment at the time of the decree or later, to either spouse."],
 ["BNSS section 144","The secular maintenance remedy (formerly CrPC s.125) for wives, children and parents unable to maintain themselves; magistrate's order."],
 ["HAMA s.18","A Hindu wife is entitled to maintenance by her husband during her lifetime, and to live separately on grounds such as cruelty or desertion."],
 ["Requisites of adoption (s.6)","Capacity and right to adopt, capacity to give, capacity to be adopted, and compliance with s.11."],
 ["Age gap (s.11)","An adopter of the opposite sex must be at least 21 years older than the child."],
 ["Giving and taking","Actual handing over of the child by the parent or guardian with intent to transfer – essential (s.11(vi))."],
 ["Effect of adoption (s.12)","The child becomes the child of the adoptive family for all purposes, from the date of adoption."],
 ["Natural guardian (s.6 HMGA)","Of a boy or unmarried girl: the father, and after him the mother; the mother has custody of a child under five."],
 ["Gita Hariharan (1999)","'After' in s.6 means 'in the absence of' – the mother can act as natural guardian even while the father is alive."],
 ["Paramount consideration (s.13 HMGA)","The welfare of the minor overrides any personal law right to guardianship."],
 ["Special Marriage Act, 1954","Civil marriage for any two persons regardless of religion, after 30 days' notice and objection period."],
 ["Section 21A SMA","When two Hindus marry under the SMA, Hindu succession law still applies to them."]
];

const MAXIMS = [
 ["Factum valet quod fieri non debuit","What ought not to be done becomes valid when done","A ceremony done irregularly may still be valid if the essential conditions are met – but not to override mandatory provisions."],
 ["Sapinda","Sharing particles of the same body (pinda)","The relationship within which marriage is barred (s.3(f))."],
 ["Sagotra","Of the same gotra (clan)","No longer a bar to Hindu marriage after the HMA."],
 ["Kanyadaan","Gift of the daughter","A traditional rite; not one of the essential ceremonies in law."],
 ["Saptapadi","Seven steps","Completion of the marriage where it is part of the rites (s.7)."],
 ["Karta","The manager","Senior member who manages a Hindu joint family's property."],
 ["Coparcenary","Joint heirship","Members who acquire an interest in joint family property by birth; daughters are coparceners since 2005."],
 ["Stridhan","A woman's property","Property a woman holds absolutely – gifts at marriage and other gifts."],
 ["Dattaka homam","Adoption fire-offering","A traditional ceremony; not essential under HAMA – giving and taking is."],
 ["Animus deserendi","Intention to desert","The mental element of desertion, alongside the fact of separation."],
 ["Pendente lite","While the case is pending","Maintenance and expenses during proceedings (HMA s.24)."],
 ["Consortium","Partnership of life","Companionship, help and society spouses owe each other; withdrawal is the basis of s.9."],
 ["Parens patriae","Parent of the nation","The court's power to protect children and others who cannot protect themselves."],
 ["Ubi jus ibi remedium","Where there is a right there is a remedy","Matrimonial remedies give effect to marital rights."],
 ["Achara","Usage, custom","One of the three sources named by Yajnavalkya, with shruti and smriti."]
];

const CASES = [
 {n:"Shastri Yagnapurushdasji v Muldas Bhudardas Vaishya", c:"AIR 1966 SC 1119", u:1, in:1, p:"Hinduism is difficult to define; the Swaminarayan sect is Hindu. The Court described Hinduism as a way of life rather than a single creed."},
 {n:"Collector of Madura v Moottoo Ramalinga Sathupathy", c:"(1868) 12 MIA 397", u:1, in:1, p:"Under Hindu law, clear proof of usage will outweigh the written text of the law – custom prevails over smriti."},
 {n:"Perumal Nadar v Ponnuswami Nadar", c:"AIR 1971 SC 2352", u:1, in:1, p:"A person may become a Hindu by bona fide declaration and conduct, without a formal conversion ceremony."},
 {n:"Sarla Mudgal v Union of India", c:"(1995) 3 SCC 635", u:2, in:1, p:"A Hindu husband who converts to Islam to marry again commits bigamy; the first marriage continues under the HMA."},
 {n:"Lily Thomas v Union of India", c:"(2000) 6 SCC 224", u:2, in:1, p:"Affirmed Sarla Mudgal: conversion does not dissolve a Hindu marriage; the second marriage is void."},
 {n:"Bhaurao Shankar Lokhande v State of Maharashtra", c:"AIR 1965 SC 1564", u:2, in:1, p:"For the offence of bigamy, the second marriage must be performed with its essential ceremonies."},
 {n:"Seema v Ashwani Kumar", c:"(2006) 2 SCC 578", u:2, in:1, p:"Directed States to make registration of all marriages compulsory."},
 {n:"Dolly Rani v Manish Kumar Chanchal", c:"Supreme Court, 19 April 2024", u:2, in:1, p:"A Hindu marriage needs the essential ceremonies; a registration certificate without a ceremony does not make a valid marriage."},
 {n:"Revanasiddappa v Mallikarjun", c:"Supreme Court, 1 September 2023 (three judges)", u:2, in:1, p:"Children of void and voidable marriages are legitimate and take their parent's share, including a notional share in coparcenary property."},
 {n:"Saroj Rani v Sudarshan Kumar Chadha", c:"AIR 1984 SC 1562", u:3, in:1, p:"Upheld s.9 restitution of conjugal rights against an Article 21 challenge, overruling the Andhra Pradesh High Court in T. Sareetha."},
 {n:"T. Sareetha v T. Venkata Subbaiah", c:"AIR 1983 AP 356", u:3, in:1, p:"Struck down s.9 as violating privacy and dignity – later overruled, but still cited for its reasoning."},
 {n:"N.G. Dastane v S. Dastane", c:"(1975) 2 SCC 326", u:3, in:1, p:"Cruelty must be proved on a preponderance of probabilities; the test is whether it is unsafe or harmful to live together."},
 {n:"Samar Ghosh v Jaya Ghosh", c:"(2007) 4 SCC 511", u:3, in:1, p:"Gave illustrative instances of mental cruelty, including a long period of separation and refusal of sexual relations without reason."},
 {n:"Bipinchandra Jaisinghbhai Shah v Prabhavati", c:"AIR 1957 SC 176", u:3, in:1, p:"Desertion requires the fact of separation and the intention to end cohabitation permanently, for the statutory period."},
 {n:"Naveen Kohli v Neelu Kohli", c:"(2006) 4 SCC 558", u:3, in:1, p:"Recommended that irretrievable breakdown be made a ground of divorce."},
 {n:"Amardeep Singh v Harveen Kaur", c:"(2017) 8 SCC 746", u:3, in:1, p:"The six-month waiting period under s.13B(2) is directory and can be waived in suitable cases."},
 {n:"Shilpa Sailesh v Varun Sreenivasan", c:"2023 SCC OnLine SC 544", u:3, in:1, p:"The Supreme Court can dissolve a marriage on irretrievable breakdown under Article 142 and can dispense with the waiting period."},
 {n:"Chaturbhuj v Sita Bai", c:"(2008) 2 SCC 316", u:4, in:1, p:"'Unable to maintain herself' does not mean the wife must be destitute; she is entitled to live as she lived in the husband's house."},
 {n:"Mohd. Ahmed Khan v Shah Bano Begum", c:"(1985) 2 SCC 556", u:4, in:1, p:"Section 125 CrPC applies to all, including Muslims; a divorced Muslim woman unable to maintain herself can claim maintenance."},
 {n:"Danial Latifi v Union of India", c:"(2001) 7 SCC 740", u:4, in:1, p:"Upheld the 1986 Act but read it to require a reasonable and fair provision for the divorced wife's future."},
 {n:"Rajnesh v Neha", c:"(2021) 2 SCC 324", u:4, in:1, p:"Laid down guidelines for maintenance in all proceedings: affidavit of assets, overlapping claims, date from which payable."},
 {n:"Kalyan Dey Chowdhury v Rita Dey Chowdhury", c:"(2017) 14 SCC 200", u:4, in:1, p:"25% of the husband's net salary was described as a just and proper amount of maintenance for the wife."},
 {n:"Lakshman Singh Kothari v Rup Kanwar", c:"AIR 1961 SC 1378", u:5, in:1, p:"Actual giving and taking of the child is an essential ceremony of a valid adoption."},
 {n:"Shabnam Hashmi v Union of India", c:"(2014) 4 SCC 1", u:5, in:1, p:"Any person, of any religion, may adopt under the Juvenile Justice Act; it is an enabling secular law."},
 {n:"Gita Hariharan v Reserve Bank of India", c:"(1999) 2 SCC 228", u:6, in:1, p:"'After' in s.6(a) HMGA means 'in the absence of'; the mother can be the natural guardian when the father is not looking after the child."},
 {n:"Rosy Jacob v Jacob A. Chakramakkal", c:"(1973) 1 SCC 840", u:6, in:1, p:"In custody matters, the welfare of the children is the paramount consideration, not the rights of the parents."},
 {n:"Nil Ratan Kundu v Abhijit Kundu", c:"(2008) 9 SCC 413", u:6, in:1, p:"Custody is decided on the child's welfare; the court must consider the child's wishes and the circumstances, not legal rights alone."},
 {n:"ABC v State (NCT of Delhi)", c:"(2015) 10 SCC 1", u:6, in:1, p:"An unwed mother can apply to be guardian of her child without notice to the father."},
 {n:"Lata Singh v State of U.P.", c:"(2006) 5 SCC 475", u:7, in:1, p:"An adult is free to marry anyone; inter-caste marriages must be protected from harassment and violence."},
 {n:"Shakti Vahini v Union of India", c:"(2018) 7 SCC 192", u:7, in:1, p:"Guidelines to prevent honour crimes and khap interference with the right of adults to marry by choice."},
 {n:"Shafin Jahan v Asokan K.M.", c:"(2018) 16 SCC 368", u:7, in:1, p:"The right to choose a life partner is part of Article 21; the High Court could not annul an adult's marriage."},
 {n:"Supriyo Chakraborty v Union of India", c:"2023 INSC 920", u:7, in:1, p:"No fundamental right to marry; the Court declined to read the Special Marriage Act to include same-sex couples, leaving it to Parliament."}
];

const QUIZ = [
 [1,"Which of these is NOT governed by the Hindu Marriage Act?",["A Sikh","A Jain","A Parsi","A Buddhist"],2,"Section 2: Muslims, Christians, Parsis and Jews are excluded."],
 [1,"The Mitakshara is a commentary on…",["Manu Smriti","Yajnavalkya Smriti","Narada Smriti","The Rig Veda"],1,"Written by Vijnaneshwara."],
 [1,"The Dayabhaga school prevails in…",["Tamil Nadu","Bengal and Assam","Punjab","Maharashtra"],1,"Written by Jimutavahana."],
 [1,"Collector of Madura v Moottoo Ramalinga held that…",["Smriti overrides custom","Clear proof of usage outweighs the written text","Custom is irrelevant","Only Vedas are binding"],1,"Custom is a strong source of Hindu law."],
 [1,"Which Act is NOT part of the Hindu Code?",["Hindu Marriage Act, 1955","Hindu Succession Act, 1956","Special Marriage Act, 1954","Hindu Adoptions and Maintenance Act, 1956"],2,"The SMA is a secular law for all."],
 [2,"Minimum age of the bridegroom under s.5(iii) HMA is…",["18","21","25","16"],1,"Bride 18, groom 21."],
 [2,"A marriage within the sapinda relationship, without a custom permitting it, is…",["Valid","Voidable","Void","Valid if registered"],2,"Section 11."],
 [2,"Under s.7, where saptapadi is part of the rites, the marriage is complete when…",["Registered","The seventh step is taken","The thali is tied","The guests leave"],1,"Section 7(2)."],
 [2,"Sarla Mudgal held that a Hindu husband who converts to Islam and remarries…",["Is validly remarried","Commits bigamy","Is automatically divorced","Need not maintain his first wife"],1,"The first marriage subsists."],
 [2,"Children of a void marriage are, under s.16 HMA…",["Illegitimate","Legitimate","Legitimate only if born before the decree","Entitled to nothing"],1,"And they take their parents' share (Revanasiddappa)."],
 [3,"Divorce by mutual consent is provided in…",["s.13(1)","s.13B","s.9","s.10"],1,"Added in 1976."],
 [3,"Desertion as a ground requires a continuous period of at least…",["One year","Two years","Three years","Seven years"],1,"Immediately preceding the petition."],
 [3,"Amardeep Singh v Harveen Kaur held that the six-month period in s.13B(2) is…",["Mandatory","Directory and can be waived","Unconstitutional","Extended to one year"],1,"Waivable in suitable cases."],
 [3,"Which ground was removed from s.13 in 2019?",["Cruelty","Leprosy","Desertion","Conversion"],1,"Personal Laws (Amendment) Act, 2019."],
 [3,"Saroj Rani v Sudarshan Kumar Chadha…",["Struck down s.9","Upheld s.9","Abolished judicial separation","Created irretrievable breakdown"],1,"Overruling T. Sareetha."],
 [4,"The secular maintenance provision formerly in CrPC s.125 is now in…",["BNS s.85","BNSS s.144","BSA s.144","HMA s.25"],1,"Bharatiya Nagarik Suraksha Sanhita, 2023."],
 [4,"Shah Bano held that s.125 CrPC…",["Does not apply to Muslims","Applies to all religions","Applies only to Hindus","Is unconstitutional"],1,"A secular provision."],
 [4,"Maintenance pending the proceedings under the HMA is in…",["s.24","s.25","s.26","s.27"],0,"Pendente lite."],
 [4,"Rajnesh v Neha is known for…",["Guidelines and an affidavit of assets in maintenance cases","The six-month waiting period","Adoption by single women","Sapinda rules"],0,"2021 guidelines."],
 [4,"Under HAMA, who among these can claim maintenance from her father-in-law?",["A widowed daughter-in-law unable to maintain herself","Any married daughter","A divorced wife","A sister"],0,"Section 19."],
 [5,"A Hindu male adopting a daughter must be older than her by at least…",["15 years","18 years","21 years","25 years"],2,"Section 11(iii)."],
 [5,"After the 2010 amendment, a married Hindu woman can adopt…",["Never","With her husband's consent","Only a daughter","Only after divorce"],1,"Section 8, as amended."],
 [5,"Under s.10, the child to be adopted must ordinarily be under…",["10","12","15","18"],2,"Unless a custom permits older children."],
 [5,"Lakshman Singh Kothari held that…",["Dattaka homam is essential","Giving and taking is essential","Registration is essential","No ceremony is needed"],1,"Actual giving and taking."],
 [5,"Shabnam Hashmi held that adoption under the JJ Act is…",["Only for Hindus","Open to persons of all religions","Unconstitutional","Only for orphans"],1,"An enabling secular law."],
 [6,"Under the HMGA, a 'minor' is a person who has not completed…",["16","18","21","14"],1,"Section 4(a)."],
 [6,"Custody of a child below five years ordinarily goes to…",["The father","The mother","The grandparents","The court"],1,"Proviso to s.6(a)."],
 [6,"A natural guardian can sell the minor's immovable property…",["Freely","Only with the court's prior permission","Never","Only to relatives"],1,"Section 8(2)."],
 [6,"In custody disputes, the paramount consideration is…",["The father's right","The welfare of the child","The mother's income","The child's religion"],1,"Section 13 HMGA."],
 [6,"Gita Hariharan v RBI interpreted the word…",["'Minor'","'After'","'Guardian'","'Welfare'"],1,"'After' means 'in the absence of'."],
 [7,"The notice period before a marriage under the SMA is…",["7 days","15 days","30 days","90 days"],2,"Sections 5–7."],
 [7,"Minimum ages under the SMA are…",["18 and 18","21 (male) and 18 (female)","21 and 21","25 and 21"],1,"Section 4(c)."],
 [7,"Supriyo Chakraborty v Union of India held that…",["Same-sex marriage is valid under the SMA","The SMA cannot be read to include same-sex couples","The SMA is void","Marriage is a fundamental right"],1,"Left to Parliament."],
 [7,"Shafin Jahan v Asokan is about…",["Maintenance","The right of an adult to choose a partner","Adoption","Guardianship"],1,"Article 21."],
 [7,"When two Hindus marry under the SMA, succession to their property is governed by…",["The Indian Succession Act","The Hindu Succession Act (s.21A)","Muslim law","No law"],1,"Section 21A."]
];

//@@VIEWS
VIEWS.home = { html(){
  const done=S.d.done;
  return `<div class="hero"><h2>Family Law I</h2>
  <p>Family law decides who is married, what each spouse owes the other, how a marriage ends, and who looks after a child. This course covers Hindu family law under the Hindu Code of 1955–56, and civil marriage under the Special Marriage Act, 1954.</p>
  <p>Work through the seven units, try the labs – including the sapinda calculator and the adoption checker – then revise with flashcards, leading cases and the quiz.</p></div>
  <div class="ucards">${UNITS.map(u=>`<a class="ucard" data-go="${u.id}"><span class="k">Unit ${u.n}</span><b>${u.title}</b><span>${u.short}</span>${done[u.id]?'<span class="st">✓ Done</span>':""}</a>`).join("")}
  ${EXTRAS.map(x=>`<a class="ucard" data-go="${x.id}" style="border-top-color:var(--gold)"><span class="k" style="color:var(--gold)">${x.ic} Revise</span><b>${x.title}</b></a>`).join("")}</div>
  <div class="two" style="margin-top:18px">
   <div class="card"><h3>How to study family law</h3>
   <ol><li>For every remedy learn: the <b>section</b>, who can apply, the <b>grounds</b>, the <b>bars</b> and time limits, and one leading case.</li><li>Keep the Bare Acts open – the HMA, HAMA and HMGA are short and precisely worded.</li><li>Notice the constitutional thread: equality (Art. 14, 15), life and dignity (Art. 21) and the Uniform Civil Code debate (Art. 44).</li><li>Problem answers: identify the personal law, then the Act and section, then apply the facts.</li></ol></div>
   <div class="card"><h3>Keyboard</h3><table class="t">
   <tr><td><span class="kbd">M</span></td><td>Show or hide the unit list</td></tr>
   <tr><td><span class="kbd">P</span> / <span class="kbd">S</span> / <span class="kbd">X</span></td><td>Play, step, pause the animation on the page</td></tr>
   <tr><td><span class="kbd">F</span></td><td>Full screen</td></tr>
   <tr><td><span class="kbd">←</span> <span class="kbd">→</span> <span class="kbd">Space</span></td><td>Flashcards: previous, next, flip</td></tr>
   <tr><td><span class="kbd">[</span> <span class="kbd">]</span></td><td>Previous or next unit</td></tr></table>
   <p style="font-size:13.5px;color:var(--muted)">Works offline once opened. Sign in (top right) to keep progress and certificates on every device.</p></div></div>
  <div class="card"><h3>About this syllabus</h3><p>Most Indian law universities teach Hindu law of marriage, matrimonial remedies, maintenance, adoption and guardianship in Family Law I, and Muslim law, Christian and Parsi law, Hindu joint family and succession in Family Law II (Semester III). Some teach Muslim marriage in Family Law I instead – compare with TNNLU's own course outline when it is issued. Criminal provisions now refer to the BNS and BNSS, 2023.</p></div>
  ${footer()}`;
}};

/* ---------------- UNIT 1 ---------------- */
const U1_ITEMS = [
 ["A Sikh couple marry with Anand Karaj ceremonies.","Y","Sikhs are Hindus for the HMA (s.2(1)(b)); the Anand Marriage Act also recognises the ceremony."],
 ["A Jain man marries a Hindu woman.","Y","Both are covered by s.2."],
 ["A Muslim couple marry by nikah.","N","Muslims are excluded – Muslim personal law applies."],
 ["A child of a Hindu father and Christian mother is brought up as a Hindu.","Y","A child brought up as a member of the tribe, community or family of a Hindu parent is a Hindu (s.2, Explanation)."],
 ["A Hindu who converted to Christianity five years ago now wants to marry.","N","He is a Christian now; the Indian Christian Marriage Act or the SMA applies."],
 ["Two members of a Scheduled Tribe, not notified by the Central Government, marry by tribal custom.","N","Section 2(2): the Act does not apply to Scheduled Tribes unless notified."],
 ["An atheist born to Hindu parents, who never converted to another religion, marries.","Y","Hindu by birth and not a Muslim, Christian, Parsi or Jew."]
];
const U1B_ITEMS = [
 ["A son gets an interest in ancestral property at birth.","MIT","Mitakshara – right by birth."],
 ["The father has absolute power to dispose of ancestral property during his lifetime.","DAY","Dayabhaga – sons get rights only on the father's death."],
 ["Joint family property passes by survivorship among coparceners.","MIT","Mitakshara (now largely replaced by succession after the 2005 amendment)."],
 ["Followed in West Bengal and Assam.","DAY","Jimutavahana's school."],
 ["Has sub-schools such as Banaras, Mithila, Bombay and Dravida (Madras).","MIT","The Dravida sub-school applies in Tamil Nadu."]
];
VIEWS.u1 = { html(){ return unitHead(1)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key"><b>Personal law</b> – the law of marriage, divorce, adoption, guardianship and succession – depends in India on a person's religion. Hindu law grew from ancient texts and custom, and was largely <b>codified in 1955–56</b>.</div>
 <h4>Who is a Hindu? (s.2 HMA; same in HSA, HAMA, HMGA)</h4><ol><li>Hindus by religion in any form, including Virashaivas, Lingayats, Brahmo, Prarthana and Arya Samaj followers.</li><li>Buddhists, Jains and Sikhs.</li><li>Any other person domiciled in India who is not a Muslim, Christian, Parsi or Jew – unless shown not governed by Hindu law.</li><li>A child with both Hindu parents, or one Hindu parent and brought up as a Hindu.</li><li>A convert or reconvert to these religions.</li></ol>
 <p>The Act does not apply to members of Scheduled Tribes unless the Central Government notifies otherwise (s.2(2)).</p>
 <h4>Sources of Hindu law</h4><table class="t"><tr><th>Ancient</th><th>Modern</th></tr>
 <tr><td><b>Shruti</b> – Vedas, Upanishads</td><td><b>Legislation</b> – the Hindu Code and later amendments</td></tr>
 <tr><td><b>Smriti</b> – Manu, Yajnavalkya, Narada</td><td><b>Judicial precedent</b></td></tr>
 <tr><td><b>Commentaries and digests</b> – Mitakshara, Dayabhaga</td><td><b>Justice, equity and good conscience</b></td></tr>
 <tr><td><b>Custom (achara)</b></td><td>–</td></tr></table>
 <h4>Custom</h4><p>A valid custom must be <b>ancient, certain, reasonable, continuous and not opposed to public policy or a statute</b> (s.3(a) HMA). Clear proof of usage can outweigh the written text (<i>Collector of Madura</i>, 1868). Custom still matters in marriage – for instance cross-cousin and uncle–niece marriages in parts of South India.</p>
 <h4>The Hindu Code, 1955–56</h4><ul><li>Hindu Marriage Act, 1955</li><li>Hindu Succession Act, 1956 (amended 2005 – daughters are coparceners)</li><li>Hindu Minority and Guardianship Act, 1956</li><li>Hindu Adoptions and Maintenance Act, 1956</li></ul>
 <p>Each overrides any text, rule or custom inconsistent with it, except where the Act itself saves custom.</p></div>
</div><div>
 <div class="card lab"><h3>Does the Hindu Marriage Act apply?</h3><div id="lab1"></div></div>
 <div class="card lab"><h3>Mitakshara or Dayabhaga?</h3><div id="lab1b"></div></div>
 <div class="card"><h3>The two schools</h3><table class="t"><tr><th></th><th>Mitakshara</th><th>Dayabhaga</th></tr>
 <tr><td>Author</td><td>Vijnaneshwara (11th c.)</td><td>Jimutavahana (12th c.)</td></tr>
 <tr><td>Where</td><td>Most of India</td><td>Bengal, Assam</td></tr>
 <tr><td>Right in joint property</td><td>By birth</td><td>On father's death</td></tr>
 <tr><td>Devolution</td><td>Survivorship (largely changed in 2005)</td><td>Succession</td></tr>
 <tr><td>Father's power</td><td>Limited over ancestral property</td><td>Absolute</td></tr></table></div>
</div></div>`+unitFoot(1)+footer(); },
 init(){ choiceLab("#lab1",U1_ITEMS,{Y:"HMA applies",N:"HMA does not apply"}); choiceLab("#lab1b",U1B_ITEMS,{MIT:"Mitakshara",DAY:"Dayabhaga"}); miniQuiz(1); }};

/* ---------------- UNIT 2 ---------------- */
const U2_ITEMS = [
 ["A man marries while his first wife is alive and their marriage is not dissolved.","VOID","Bigamy – void (s.11) and an offence (s.17 HMA; BNS s.82)."],
 ["Children of a brother and a sister marry; their community has a long-established custom of cross-cousin marriage.","OK","Prohibited degree, but saved by a valid custom (s.5(iv))."],
 ["Children of two brothers marry; there is no custom allowing it.","VOID","Prohibited degree and sapinda – void (s.11)."],
 ["The bride, unknown to the groom, was pregnant by another man at the time of marriage.","VBL","Voidable under s.12(1)(d), if the petition is filed within a year and there was no intercourse after discovery."],
 ["The marriage was never consummated owing to the husband's impotence.","VBL","Voidable – s.12(1)(a)."],
 ["The groom is 20 years old.","OK*","Not void or voidable under the HMA, but s.18 punishes the breach; under the Prohibition of Child Marriage Act, 2006, he may have it annulled."],
 ["The couple registered the marriage but performed no ceremony at all.","VOID","No valid Hindu marriage without the essential ceremonies (Dolly Rani, 2024)."]
];
VIEWS.u2 = { html(){ return unitHead(2)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">A Hindu marriage was traditionally a <b>sacrament</b> – holy, permanent, for life. The HMA keeps the ceremonies but adds features of a <b>contract</b>: consent, a minimum age and divorce. A marriage is valid if the <b>conditions of s.5</b> are met and the <b>ceremonies of s.7</b> are performed.</div>
 <h4>Conditions (s.5)</h4><table class="t"><tr><th>Clause</th><th>Condition</th><th>If broken</th></tr>
 <tr><td>(i)</td><td>Neither party has a living spouse</td><td>Void (s.11); offence (s.17)</td></tr>
 <tr><td>(ii)</td><td>Capable of valid consent; not suffering from mental disorder making them unfit for marriage</td><td>Voidable (s.12)</td></tr>
 <tr><td>(iii)</td><td>Groom 21, bride 18</td><td>Valid but punishable (s.18); voidable under the Prohibition of Child Marriage Act</td></tr>
 <tr><td>(iv)</td><td>Not within prohibited degrees, unless custom permits</td><td>Void (s.11)</td></tr>
 <tr><td>(v)</td><td>Not sapindas, unless custom permits</td><td>Void (s.11)</td></tr></table>
 <h4>Ceremonies and registration (ss.7–8)</h4><p>Solemnised by the customary rites of either party. Where saptapadi is part of the rites, the marriage is complete at the seventh step. Registration (s.8) is evidence of marriage; States must make it compulsory (<i>Seema v Ashwani Kumar</i>), but registration cannot replace the ceremony.</p>
 <h4>Void and voidable</h4><table class="t"><tr><th></th><th>Void (s.11)</th><th>Voidable (s.12)</th></tr>
 <tr><td>Grounds</td><td>Bigamy, prohibited degree, sapinda</td><td>Non-consummation (impotence), mental incapacity, force or fraud, pregnancy by another</td></tr>
 <tr><td>Status</td><td>Never a marriage</td><td>Valid until annulled</td></tr>
 <tr><td>Who can petition</td><td>Either party</td><td>Only the aggrieved party, within limits</td></tr>
 <tr><td>Maintenance</td><td>Can be claimed under ss.24–25</td><td>Can be claimed</td></tr>
 <tr><td>Children</td><td colspan="2">Legitimate under s.16; they share in their parents' property (<i>Revanasiddappa</i>, 2023)</td></tr></table></div>
 <div class="card lab"><h3>Valid, void or voidable?</h3><div id="lab2"></div></div>
</div><div>
 <div class="card lab"><h3>Sapinda calculator (s.3(f))</h3>
 <p>Find the nearest common ancestor of the two people. For each person, count how many generations up the ancestor is, and through which parent the line first goes.</p>
 <div class="row"><b style="min-width:70px">Bride</b><label>goes up through <select id="spBP"><option value="F">father</option><option value="M">mother</option></select></label><label>generations up <select id="spBG">${[1,2,3,4,5,6].map(n=>`<option value="${n}" ${n===2?"selected":""}>${n} – ${["parent","grandparent","great-grandparent","great-great-grandparent","5th ascendant","6th ascendant"][n-1]}</option>`).join("")}</select></label></div>
 <div class="row" style="margin-top:6px"><b style="min-width:70px">Groom</b><label>goes up through <select id="spGP"><option value="F">father</option><option value="M">mother</option></select></label><label>generations up <select id="spGG">${[0,1,2,3,4,5,6].map(n=>`<option value="${n}" ${n===2?"selected":""}>${n===0?"0 – he is the ancestor":n+" – "+["parent","grandparent","great-grandparent","great-great-grandparent","5th ascendant","6th ascendant"][n-1]}</option>`).join("")}</select></label></div>
 <div class="row" style="margin-top:8px"><button class="btn" id="spGo">Check</button><button class="btn sec sm" data-sp="1">Cousins via fathers</button><button class="btn sec sm" data-sp="2">Second cousins via mothers</button><button class="btn sec sm" data-sp="3">Second cousins via fathers</button></div>
 <div id="spOut"></div>
 <p style="font-size:13px;color:var(--muted);margin-top:8px">The person counts as the first generation. Limits: 3 generations through the mother, 5 through the father. This tool uses the usual textbook reading – the parent through whom the line first goes sets the limit. Prohibited degrees (s.3(g)) are a separate test.</p></div>
 <div class="card"><h3>Prohibited degrees (s.3(g)) – four groups</h3><ol><li>One is a <b>lineal ascendant</b> of the other.</li><li>One was the <b>wife or husband of a lineal ascendant or descendant</b> of the other.</li><li>One was the wife of the <b>brother</b>, or of the father's or mother's brother, or of the grandfather's or grandmother's brother, of the other.</li><li>They are <b>brother and sister, uncle and niece, aunt and nephew</b>, or children of a brother and sister, or of two brothers or two sisters.</li></ol><p>Relationships include half and uterine blood, adoption, and illegitimate as well as legitimate blood.</p></div>
</div></div>`+unitFoot(2)+footer(); },
 init(){
  choiceLab("#lab2",U2_ITEMS,{OK:"Valid",VOID:"Void",VBL:"Voidable","OK*":"Valid but punishable / voidable under child-marriage law"});
  const go=()=>{
    const bp=$("#spBP").value, bg=+$("#spBG").value, gp=$("#spGP").value, gg=+$("#spGG").value;
    const lim=p=>p==="M"?3:5, gen=n=>n+1;           // person = generation 1
    const bOk=gen(bg)<=lim(bp), gOk = gg===0 ? true : gen(gg)<=lim(gp);
    const lineal = gg===0;
    const sap = lineal ? bOk : (bOk && gOk);
    const desc = p=>p==="M"?"mother":"father";
    const line1 = `Bride: the ancestor is generation <b>${gen(bg)}</b> through her ${desc(bp)} – limit ${lim(bp)} → ${bOk?"<b>within</b>":"outside"}.`;
    const line2 = lineal ? `Groom: he is himself her lineal ascendant.` : `Groom: the ancestor is generation <b>${gen(gg)}</b> through his ${desc(gp)} – limit ${lim(gp)} → ${gOk?"<b>within</b>":"outside"}.`;
    $("#spOut").innerHTML = `<div class="fb ${sap?"bad":"ok"}">${line1}<br>${line2}<br><b>${sap?"✖ Sapindas – the marriage would be void (s.11) unless a custom permits it.":"✔ Not sapindas."}</b>${lineal||(bg===1&&gg===1)||(bg===2&&gg===2)||(bg===1&&gg===2)||(bg===2&&gg===1)?" They are also within the prohibited degrees of s.3(g) – check that test too.":""}</div>`;
  };
  $("#spGo").onclick=go;
  $$("[data-sp]").forEach(b=>b.onclick=()=>{ const k=b.dataset.sp;
    const set={1:["F",2,"F",2],2:["M",3,"M",3],3:["F",3,"F",3]}[k];
    $("#spBP").value=set[0]; $("#spBG").value=set[1]; $("#spGP").value=set[2]; $("#spGG").value=set[3]; go(); });
  miniQuiz(2);
 }};

/* ---------------- UNIT 3 ---------------- */
const MC_SVG = `<svg viewBox="0 0 640 360" class="lg" role="img" aria-label="Divorce by mutual consent timeline">
<defs><marker id="mc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
<line x1="30" y1="210" x2="610" y2="210" class="axis"/>
${[["Marriage",40],["1 yr",150],["Petition",260],["+6 m",380],["+18 m",560]].map(([t,x])=>`<g><line x1="${x}" y1="203" x2="${x}" y2="217" class="axis"/><text x="${x}" y="240" text-anchor="middle" class="lbl" style="font-size:15px">${t}</text></g>`).join("")}
<g id="m0" class="fade"><rect x="40" y="168" width="220" height="26" rx="13" class="win1"/><text x="150" y="186" text-anchor="middle" class="wl">living separately ≥ 1 year</text></g>
<g id="m1" class="fade node"><rect x="180" y="20" width="160" height="58" rx="12"/><text x="260" y="46" text-anchor="middle">First motion</text><text x="260" y="68" text-anchor="middle" class="sub">joint petition s.13B(1)</text><path class="edge" d="M260 80 V195" marker-end="url(#mc)" style="color:var(--muted)"/></g>
<g id="m2" class="fade"><rect x="260" y="168" width="120" height="26" rx="13" class="win2"/><text x="320" y="186" text-anchor="middle" class="wl">cooling off</text></g>
<g id="m3" class="fade"><rect x="380" y="168" width="180" height="26" rx="13" class="win1"/><text x="470" y="186" text-anchor="middle" class="wl">second motion window</text></g>
<g id="m4" class="fade node"><rect x="400" y="20" width="200" height="58" rx="12"/><text x="500" y="46" text-anchor="middle">Second motion</text><text x="500" y="68" text-anchor="middle" class="sub">both still consent</text><path class="edge" d="M470 80 V160" marker-end="url(#mc)" style="color:var(--muted)"/></g>
<g id="m5" class="fade"><text x="320" y="290" text-anchor="middle" class="big">Court satisfied → decree of divorce</text></g>
<g id="m6" class="fade"><text x="320" y="330" text-anchor="middle" class="lbl">6-month wait can be waived · Art. 142 route</text></g>
</svg>`;
const MC_STEPS = [
 "<b>Before filing.</b> The spouses must have been <b>living separately for at least one year</b> – not necessarily in different houses, but not living as husband and wife.",
 "<b>First motion.</b> Both file a joint petition in the family court saying they cannot live together and have mutually agreed to dissolve the marriage (s.13B(1)).",
 "<b>Cooling-off period.</b> The second motion may be made <b>not earlier than six months</b> after the petition – time to reconsider.",
 "<b>Window.</b> The second motion must come <b>not later than 18 months</b> after the petition, or the petition lapses.",
 "<b>Second motion.</b> Both confirm consent. Either spouse may withdraw consent before the decree – the court cannot then grant divorce under s.13B.",
 "<b>Decree.</b> After hearing the parties and making inquiry, the court passes a decree of divorce from the date of the decree.",
 "<b>Shortcuts.</b> The six-month wait is directory and can be waived (<i>Amardeep Singh</i>). The Supreme Court can also grant divorce on irretrievable breakdown under Article 142 (<i>Shilpa Sailesh</i>)."
];
const U3_ITEMS = [
 ["The husband repeatedly humiliates the wife in public and threatens to take away the children.","CR","Mental cruelty (s.13(1)(ia); Samar Ghosh)."],
 ["The wife left the matrimonial home three years ago intending never to return, without reasonable cause.","DE","Desertion for two years or more (s.13(1)(ib))."],
 ["After marriage the husband has voluntary sexual intercourse with another woman.","AD","Adultery (s.13(1)(i)) – a single act is enough since 1976."],
 ["The husband converts to another religion.","CO","Ceasing to be a Hindu by conversion (s.13(1)(ii))."],
 ["Nothing has been heard of the wife for eight years by those who would naturally have heard.","PD","Presumed dead – not heard of as alive for seven years (s.13(1)(vii))."],
 ["A decree of judicial separation was passed two years ago; the spouses have not lived together since.","NR","Non-resumption of cohabitation for one year after a decree (s.13(1A))."],
 ["Both spouses have lived apart for two years and agree to end the marriage.","MC","Mutual consent (s.13B)."]
];
VIEWS.u3 = { html(){ return unitHead(3)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">The HMA gives four remedies when a marriage is in trouble: <b>restitution of conjugal rights</b> (s.9) to bring a spouse back, <b>judicial separation</b> (s.10), <b>nullity</b> (ss.11–12) and <b>divorce</b> (ss.13, 13B). Courts must first try to <b>reconcile</b> the parties (s.23(2)).</div>
 <h4>Grounds of divorce (s.13(1)) – either spouse</h4><table class="t"><tr><th>Clause</th><th>Ground</th></tr>
 <tr><td>(i)</td><td>Voluntary sexual intercourse with another person after marriage (adultery)</td></tr>
 <tr><td>(ia)</td><td>Cruelty</td></tr>
 <tr><td>(ib)</td><td>Desertion for a continuous period of at least two years</td></tr>
 <tr><td>(ii)</td><td>Ceased to be a Hindu by conversion</td></tr>
 <tr><td>(iii)</td><td>Incurably of unsound mind, or mental disorder making living together unreasonable</td></tr>
 <tr><td>(v)</td><td>Venereal disease in a communicable form</td></tr>
 <tr><td>(vi)</td><td>Renounced the world by entering a religious order</td></tr>
 <tr><td>(vii)</td><td>Not heard of as alive for seven years</td></tr></table>
 <p>Clause (iv), leprosy, was deleted by the Personal Laws (Amendment) Act, 2019. Section 13(1A): no resumption of cohabitation for one year after a decree of judicial separation or restitution.</p>
 <h4>Wife's additional grounds (s.13(2))</h4><p>Husband's pre-1955 second marriage; husband guilty of certain sexual offences; no cohabitation for a year after a maintenance order; her marriage before 15 repudiated before 18.</p>
 <h4>Bars and timing</h4><ul><li>No petition within <b>one year of marriage</b> except for exceptional hardship (s.14).</li><li>The court must refuse relief where the petitioner takes advantage of his or her own wrong, or has condoned or connived at the act, or there is collusion or unnecessary delay (s.23).</li><li>Remarriage after the appeal period (s.15).</li></ul>
 <h4>Restitution of conjugal rights (s.9)</h4><p>Upheld in <i>Saroj Rani v Sudarshan Kumar Chadha</i> (1984). A decree cannot be enforced by force; non-compliance for a year becomes a ground of divorce. Its constitutionality has again been questioned before the Supreme Court.</p>
 <h4>Ancillary relief</h4><p>Maintenance pending the case (s.24), permanent alimony (s.25), custody of children (s.26), disposal of joint property (s.27). Family Courts Act, 1984 – these cases go to family courts.</p></div>
</div><div>
 ${animBox("mcAnim","Divorce by mutual consent – s.13B",MC_SVG)}
 <div class="card lab"><h3>Which ground?</h3><div id="lab3"></div></div>
</div></div>`+unitFoot(3)+footer(); },
 init(){
  anim = makeAnim("#mcAnim", MC_STEPS, i=>{ for(let k=0;k<7;k++) document.getElementById("m"+k).classList.toggle("show",k<=i); });
  choiceLab("#lab3",U3_ITEMS,{AD:"Adultery",CR:"Cruelty",DE:"Desertion",CO:"Conversion",PD:"Presumed dead",NR:"Non-resumption s.13(1A)",MC:"Mutual consent"});
  miniQuiz(3);
 }};

/* ---------------- UNIT 4 ---------------- */
const U4_ITEMS = [
 ["A wife who left her husband because of his cruelty claims maintenance; she has no income.","Y","Refusing to live with him for sufficient reason does not bar her claim."],
 ["A divorced wife who has not remarried and cannot maintain herself.","Y","'Wife' includes a divorced wife who has not remarried (Explanation to s.144)."],
 ["A wife living separately from her husband by mutual consent.","N","Living apart by mutual consent bars the claim (s.144(4))."],
 ["A 72-year-old mother with no income claims from her earning son.","Y","Parents unable to maintain themselves can claim."],
 ["A healthy married daughter, aged 25, claims from her father.","N","A major married daughter can claim only from her husband; s.144 covers a major child only with physical or mental abnormality."],
 ["An illegitimate minor child claims from his father.","Y","Legitimate or illegitimate minor children are covered."]
];
VIEWS.u4 = { html(){ return unitHead(4)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key"><b>Maintenance</b> is money for food, clothing, residence, education and medical care. A Hindu wife can claim under three routes: <b>HAMA</b> (personal law), the <b>HMA</b> during and after matrimonial proceedings, and <b>BNSS s.144</b> (the secular, quick magistrate's remedy). The Domestic Violence Act, 2005 adds monetary relief.</div>
 <table class="t"><tr><th>Law</th><th>Who can claim</th><th>Key points</th></tr>
 <tr><td><b>HAMA s.18</b></td><td>Wife, from husband</td><td>Right to live separately for desertion, cruelty, another wife, concubine, conversion or other justifiable cause. Lost if unchaste or converts.</td></tr>
 <tr><td><b>HAMA s.19</b></td><td>Widowed daughter-in-law, from father-in-law</td><td>If she cannot maintain herself from her own or her husband's estate.</td></tr>
 <tr><td><b>HAMA s.20</b></td><td>Children and aged or infirm parents</td><td>Includes an unmarried daughter who cannot maintain herself.</td></tr>
 <tr><td><b>HAMA ss.21–22</b></td><td>Dependants of a deceased Hindu</td><td>From those who inherit his estate.</td></tr>
 <tr><td><b>HMA s.24</b></td><td>Either spouse</td><td>Maintenance and litigation expenses pending the case.</td></tr>
 <tr><td><b>HMA s.25</b></td><td>Either spouse</td><td>Permanent alimony, at or after the decree; can be varied.</td></tr>
 <tr><td><b>BNSS s.144</b></td><td>Wife (incl. divorced, not remarried), children, parents</td><td>Any religion; no upper limit; interim maintenance; magistrate decides quickly.</td></tr>
 <tr><td><b>PWDVA s.20</b></td><td>Aggrieved woman in a domestic relationship</td><td>Monetary relief with protection and residence orders.</td></tr></table>
 <h4>Fixing the amount (HAMA s.23; Rajnesh v Neha)</h4><p>Position and status of the parties, reasonable wants, income and property of both, number of dependants, the claimant's own earning capacity. Both parties must file an <b>affidavit of assets and liabilities</b>. Amounts under different laws are adjusted against each other. Maintenance is usually payable from the date of application.</p>
 <h4>Not entitled under s.144</h4><p>A wife living in adultery, refusing without sufficient reason to live with her husband, or living separately by mutual consent.</p></div>
</div><div>
 <div class="card lab"><h3>Can they claim under BNSS s.144?</h3><div id="lab4"></div></div>
 <div class="card lab"><h3>Maintenance benchmark</h3><p>Courts look at all the factors above. One common starting point, from <i>Kalyan Dey Chowdhury</i> (2017), is about <b>25% of the husband's net income</b> for the wife. This is only a guide for discussion, not a rule.</p>
  <div class="row"><label>Husband's net monthly income (Rs) <input type="text" id="mbInc" value="60000" inputmode="numeric" style="width:120px"></label><label>Wife's own monthly income (Rs) <input type="text" id="mbOwn" value="0" inputmode="numeric" style="width:110px"></label></div>
  <div class="row" style="margin-top:6px"><label>Children living with her <select id="mbKids"><option>0</option><option selected>1</option><option>2</option><option>3</option></select></label><button class="btn" id="mbGo">Estimate</button></div>
  <div id="mbOut"></div></div>
</div></div>`+unitFoot(4)+footer(); },
 init(){
  choiceLab("#lab4",U4_ITEMS,{Y:"Can claim",N:"Cannot claim"});
  const num=v=>Math.max(0,+String(v).replace(/[^\d.]/g,"")||0), rs=n=>"Rs "+Math.round(n).toLocaleString("en-IN");
  $("#mbGo").onclick=()=>{
    const inc=num($("#mbInc").value), own=num($("#mbOwn").value), k=+$("#mbKids").value;
    const wife=Math.max(0,0.25*inc - own*0.5), kids=k*0.10*inc, tot=Math.min(wife+kids, 0.5*inc);
    $("#mbOut").innerHTML=`<div class="fb info"><b>Indicative range: ${rs(tot*0.8)} – ${rs(tot*1.1)} a month</b><br>Wife: about 25% of ${rs(inc)}${own?`, reduced because she earns ${rs(own)}`:""}. Children: about 10% each here for illustration. The total is kept under half the husband's net income so he can live too.<br><span style="font-size:13px">Real orders depend on status, needs, assets, debts and other dependants (Rajnesh v Neha).</span></div>`;
  };
  miniQuiz(4);
 }};

/* ---------------- UNIT 5 ---------------- */
VIEWS.u5 = { html(){ return unitHead(5)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key"><b>Adoption</b> transfers a child from the birth family to the adoptive family for all purposes. Under the <b>Hindu Adoptions and Maintenance Act, 1956</b> an adoption is valid only if it meets <b>s.6</b>: the adopter has capacity and the right to adopt, the giver has capacity to give, the child can be adopted, and the conditions in <b>s.11</b> are met.</div>
 <table class="t"><tr><th>Section</th><th>Rule</th></tr>
 <tr><td>7 – male adopter</td><td>Hindu male of sound mind, not a minor; needs his wife's consent unless she has renounced the world, ceased to be a Hindu, or been declared of unsound mind</td></tr>
 <tr><td>8 – female adopter</td><td>Hindu female of sound mind, not a minor; if married, needs her husband's consent (since 2010) unless the same exceptions apply</td></tr>
 <tr><td>9 – who may give</td><td>Father or mother (equal right since 2010), with the other's consent; a guardian with the court's permission</td></tr>
 <tr><td>10 – who may be adopted</td><td>A Hindu, not already adopted, not married and under 15 – unless custom permits otherwise</td></tr>
 <tr><td>11 – conditions</td><td>No living Hindu son, son's son or son's son's son when adopting a son; no living Hindu daughter or son's daughter when adopting a daughter; 21-year age gap for opposite sexes; one child cannot be adopted by two people; actual giving and taking</td></tr>
 <tr><td>12 – effects</td><td>Child of the adoptive family from the date of adoption; cannot marry within prohibited degrees of the birth family; property already vested is not divested</td></tr>
 <tr><td>15 – irrevocable</td><td>A valid adoption cannot be cancelled by anyone</td></tr>
 <tr><td>16 – presumption</td><td>A registered adoption deed raises a presumption of a valid adoption</td></tr>
 <tr><td>17 – no payment</td><td>Receiving payment for giving a child is an offence</td></tr></table>
 <h4>The secular route – Juvenile Justice Act, 2015</h4><p>Any person, of any religion, can adopt an orphaned, abandoned or surrendered child through the <b>Central Adoption Resource Authority (CARA)</b> under the Adoption Regulations, 2022; orders are now made by the District Magistrate. Single women may adopt a child of either sex; single men may adopt only a boy (<i>Shabnam Hashmi</i>, 2014).</p></div>
</div><div>
 <div class="card lab"><h3>Is this adoption valid under HAMA?</h3>
  <div class="row"><label>Adopter <select id="adSex"><option value="M">man</option><option value="F">woman</option></select></label><label>Marital status <select id="adMar"><option value="S">single / widowed / divorced</option><option value="C">married – spouse consents</option><option value="N">married – spouse does not consent</option></select></label></div>
  <div class="row" style="margin-top:6px"><label>Adopter's age <input type="text" id="adAge" value="35" style="width:60px"></label><label>Child <select id="adCh"><option value="M">boy</option><option value="F">girl</option></select></label><label>Child's age <input type="text" id="adCA" value="4" style="width:60px"></label></div>
  <div class="row" style="margin-top:6px"><label><input type="checkbox" id="adSame"> Adopter already has a living Hindu child of the same sex (son / son's son, or daughter / son's daughter)</label></div>
  <div class="row"><label><input type="checkbox" id="adMarried"> The child is married</label><label><input type="checkbox" id="adGive" checked> Child actually given and taken</label><label><input type="checkbox" id="adPay"> Money paid for the child</label></div>
  <div class="row" style="margin-top:8px"><button class="btn" id="adGo">Check</button></div><div id="adOut"></div></div>
 <div class="card"><h3>Before and after 2010</h3><p>The Personal Laws (Amendment) Act, 2010 gave a married woman the right to adopt with her husband's consent, and gave the mother an equal right with the father to give a child in adoption. Earlier, only the husband could adopt (with the wife's consent) and the mother could give only if the father was dead or incapable.</p></div>
</div></div>`+unitFoot(5)+footer(); },
 init(){
  $("#adGo").onclick=()=>{
    const sx=$("#adSex").value, mar=$("#adMar").value, age=+$("#adAge").value||0, ch=$("#adCh").value, ca=+$("#adCA").value||0;
    const bad=[];
    if(age<18) bad.push("The adopter is a minor – must be a major of sound mind (ss.7, 8).");
    if(mar==="N") bad.push(`A married ${sx==="M"?"man needs his wife's":"woman needs her husband's"} consent (${sx==="M"?"s.7":"s.8"}), unless the spouse has renounced the world, ceased to be a Hindu or been declared of unsound mind.`);
    if($("#adSame").checked) bad.push(`The adopter already has a living Hindu ${ch==="M"?"son, son's son or son's son's son":"daughter or son's daughter"} (s.11(i)/(ii)).`);
    if(sx!==ch && age-ca<21) bad.push(`An adopter of the opposite sex must be at least 21 years older than the child – the gap here is ${age-ca} years (s.11(iii)/(iv)).`);
    if(ca>=15) bad.push("The child has completed 15 years – not allowed unless a custom permits (s.10(iv)).");
    if($("#adMarried").checked) bad.push("The child is married – not allowed unless a custom permits (s.10(iii)).");
    if(!$("#adGive").checked) bad.push("No actual giving and taking – essential (s.11(vi); Lakshman Singh Kothari).");
    const pay=$("#adPay").checked ? "<br>Also: receiving any payment for giving a child is an offence under s.17." : "";
    $("#adOut").innerHTML = bad.length ? `<div class="fb bad">✖ <b>Not valid under HAMA.</b><ul>${bad.map(x=>`<li>${x}</li>`).join("")}</ul>${pay}</div>` : `<div class="fb ok">✔ <b>Valid</b> – the requisites of ss.6–11 are met. The child becomes the adoptive parents' child for all purposes from today (s.12), and the adoption cannot be cancelled (s.15).${pay}</div>`;
  };
  miniQuiz(5);
 }};

/* ---------------- UNIT 6 ---------------- */
const U6_ITEMS = [
 ["Who is the natural guardian of a legitimate 10-year-old boy whose parents live together?","F","The father, and after him the mother (s.6(a)); after Gita Hariharan the mother can act when the father is absent or indifferent."],
 ["Who usually has custody of a 3-year-old girl?","M","Custody of a child under five is ordinarily with the mother (proviso to s.6(a))."],
 ["Who is the natural guardian of an illegitimate child?","M","The mother, and after her the father (s.6(b))."],
 ["Who is the natural guardian of a married 17-year-old girl?","H","Her husband (s.6(c))."],
 ["Who is the natural guardian of an adopted son?","AD","The adoptive father, and after him the adoptive mother (s.7)."],
 ["The father of a 12-year-old has lived abroad for years with no interest in the child. Who can sign the child's bank forms?","M","The mother – 'after' means 'in the absence of' (Gita Hariharan, 1999)."]
];
VIEWS.u6 = { html(){ return unitHead(6)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">A <b>minor</b> is a person under 18 (s.4 HMGA). A <b>guardian</b> looks after the minor's person, property or both. Whatever the law says about who is guardian, the court's <b>paramount consideration is the welfare of the minor</b> (s.13).</div>
 <h4>Kinds of guardians</h4><table class="t"><tr><th>Kind</th><th>Source</th></tr>
 <tr><td><b>Natural</b></td><td>By law – s.6 (father, mother, husband) and s.7 (adoptive parents)</td></tr>
 <tr><td><b>Testamentary</b></td><td>Appointed by the father's or mother's will (s.9)</td></tr>
 <tr><td><b>Certificated</b></td><td>Appointed or declared by a court under the Guardians and Wards Act, 1890</td></tr>
 <tr><td><b>De facto</b></td><td>Someone who just looks after the child – cannot deal with the minor's property (s.11)</td></tr></table>
 <h4>Powers over the minor's property (s.8)</h4><ul><li>May do all acts necessary or reasonable for the minor's benefit or for protecting the estate.</li><li>Cannot, <b>without the court's prior permission</b>, mortgage, charge, sell, gift or exchange immovable property, or lease it for more than five years or beyond a year after the minor turns 18.</li><li>A transfer in breach is <b>voidable</b> at the minor's instance.</li><li>No guardian can be appointed for a minor's undivided interest in joint family property; the karta manages it (s.12).</li><li>A person ceases to be a natural guardian if he or she ceases to be a Hindu or renounces the world (s.6 proviso).</li></ul>
 <h4>Custody and welfare</h4><p>Welfare means more than money: moral, ethical and emotional well-being, education, stability, and the child's own preference if old enough (<i>Rosy Jacob</i>; <i>Nil Ratan Kundu</i>). Courts may give joint or shared custody and visitation rights.</p>
 <h4>Equality developments</h4><p><i>Gita Hariharan</i> (1999) read 'after' as 'in the absence of'. <i>ABC v State</i> (2015) let an unwed mother become guardian without notifying the father. Passports, school records and bank accounts now accept the mother as guardian.</p></div>
</div><div>
 <div class="card lab"><h3>Who is the guardian?</h3><div id="lab6"></div></div>
</div></div>`+unitFoot(6)+footer(); },
 init(){ choiceLab("#lab6",U6_ITEMS,{F:"Father",M:"Mother",H:"Husband",AD:"Adoptive father"}); miniQuiz(6); }};

/* ---------------- UNIT 7 ---------------- */
const SM_SVG = `<svg viewBox="0 0 640 380" class="lg" role="img" aria-label="Special Marriage Act procedure">
<defs><marker id="sm" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
${["Notice to Marriage Officer","Notice published","30 days for objections","Declarations and 3 witnesses","Solemnised and certificate"].map((t,i)=>`<g id="s${i}" class="node fade"><rect x="110" y="${8+i*70}" width="420" height="54" rx="12"/><text x="320" y="${33+i*70}" text-anchor="middle">${t}</text><text x="320" y="${54+i*70}" text-anchor="middle" class="sub">${["s.5 – one party resident 30 days in the district","s.6 – entered in the Marriage Notice Book","s.7 – any person may object on s.4 grounds","s.11 – signed before the officer","ss.12–13 – entered in the Marriage Certificate Book"][i]}</text></g>`).join("")}
${[0,1,2,3].map(i=>`<path id="sa${i}" class="edge fade" d="M320 ${63+i*70} V${76+i*70}" marker-end="url(#sm)" style="color:var(--muted)"/>`).join("")}
</svg>`;
const SM_STEPS = [
 "<b>Notice.</b> The couple give written notice to the Marriage Officer of the district where at least one of them has lived for <b>30 days</b> (s.5).",
 "<b>Publication.</b> The officer enters the notice in the Marriage Notice Book, open to inspection, and displays it in the office (s.6). This publicity has been criticised for exposing inter-faith couples to harassment.",
 "<b>Objection period.</b> Within 30 days anyone may object that a condition in s.4 is not met – a living spouse, unsound mind, age, prohibited degrees. The officer inquires and decides within 30 days (ss.7–8).",
 "<b>Declarations.</b> The parties and three witnesses sign declarations before the officer (s.11).",
 "<b>Solemnisation.</b> Any form, but each party says to the other in the presence of the officer and witnesses: 'I take thee… to be my lawful wife (or husband)'. The certificate is conclusive evidence of the marriage (s.13)."
];
const U7_ITEMS = [
 ["A Hindu woman and a Christian man want to marry without either converting.","SMA","Only the SMA allows a civil inter-faith marriage without conversion."],
 ["Two Hindus marry by saptapadi in a temple.","HMA","A Hindu marriage under the HMA (they could also choose the SMA)."],
 ["Two Hindus want a court marriage without religious rites.","BOTH","They may use the SMA; s.21A keeps Hindu succession law for them. The HMA also allows Arya Samaj or other customary rites."],
 ["A Hindu couple married by Hindu rites in 2015 now want their marriage registered under the SMA.","SMA","Section 15 lets an existing marriage be registered under the SMA."],
 ["A Muslim man and a Hindu woman want a marriage that bars a second marriage by either.","SMA","Under the SMA, monogamy applies to both; bigamy is an offence (s.43–44)."]
];
VIEWS.u7 = { html(){ return unitHead(7)+`
<div class="two"><div>
 <div class="card"><h3>Key idea</h3><div class="key">The <b>Special Marriage Act, 1954</b> provides a <b>civil marriage</b> open to any two persons in India, whatever their religion, without conversion and without religious ceremony. It is the main route for inter-faith couples and a step towards the <b>Uniform Civil Code</b> envisaged in Article 44.</div>
 <h4>Conditions (s.4)</h4><ul><li>Neither party has a living spouse.</li><li>Capable of valid consent; not suffering from mental disorder making them unfit for marriage.</li><li>Male 21, female 18.</li><li>Not within prohibited degrees (First Schedule), unless custom permits for at least one party.</li></ul>
 <h4>Consequences</h4><table class="t"><tr><th>Matter</th><th>Under the SMA</th></tr>
 <tr><td>Monogamy</td><td>Compulsory for both; bigamy punishable (ss.43–44)</td></tr>
 <tr><td>Family ties</td><td>Earlier, a member of an undivided Hindu family who married under the SMA was severed from it (s.19); s.21A (1976) protects Hindus marrying Hindus</td></tr>
 <tr><td>Succession</td><td>Indian Succession Act, 1925 (s.21); but Hindu Succession Act if both are Hindus (s.21A)</td></tr>
 <tr><td>Divorce</td><td>Grounds in s.27, similar to the HMA; mutual consent in s.28; no petition within one year (s.29)</td></tr>
 <tr><td>Registration of other marriages</td><td>Section 15 – existing marriages may be registered under the SMA</td></tr></table>
 <h4>The right to choose</h4><p>An adult's choice of partner is part of liberty and privacy under Article 21 (<i>Lata Singh</i>, 2006; <i>Shakti Vahini</i>, 2018; <i>Shafin Jahan</i>, 2018). In <i>Supriyo Chakraborty</i> (2023) the Supreme Court held there is no fundamental right to marry and declined to read the SMA to include same-sex couples, leaving the matter to Parliament.</p>
 <h4>Uniform Civil Code</h4><p>Article 44 directs the State to endeavour to secure a uniform civil code. Goa has had a common civil code since Portuguese times; Uttarakhand enacted a Uniform Civil Code in 2024. Debate continues on equality, diversity and federalism.</p></div>
</div><div>
 ${animBox("smAnim","Marriage under the SMA – step by step",SM_SVG)}
 <div class="card lab"><h3>Which Act?</h3><div id="lab7"></div></div>
</div></div>`+unitFoot(7)+footer(); },
 init(){
  anim = makeAnim("#smAnim", SM_STEPS, i=>{
    for(let k=0;k<5;k++){ const g=document.getElementById("s"+k); g.classList.toggle("show",k<=i); g.classList.toggle("hi",k===i); }
    for(let k=0;k<4;k++) document.getElementById("sa"+k).classList.toggle("show",k<i);
  });
  choiceLab("#lab7",U7_ITEMS,{HMA:"Hindu Marriage Act",SMA:"Special Marriage Act",BOTH:"Either – their choice"});
  miniQuiz(7);
 }};

/* ---------------- REFERENCES ---------------- */
VIEWS.refs = { html(){ return `<div class="unitban"><div class="k">Read further</div><h2>References</h2><p>Books are in the TNNLU library; online sources need internet.</p></div>
 <div class="two"><div class="card"><h3>Books</h3><table class="t"><tr><th>Book</th><th>Use it for</th></tr>
 <tr><td>Paras Diwan, <i>Modern Hindu Law</i>, Allahabad Law Agency</td><td>The standard student textbook</td></tr>
 <tr><td>Kusum, <i>Family Law Lectures: Family Law I</i>, LexisNexis</td><td>Clear lecture-style chapters, case-based</td></tr>
 <tr><td>Poonam Pradhan Saxena, <i>Family Law Lectures – Family Law II</i>, LexisNexis</td><td>Companion volume; joint family and succession</td></tr>
 <tr><td><i>Mulla, Principles of Hindu Law</i>, LexisNexis</td><td>The authoritative commentary</td></tr>
 <tr><td>Flavia Agnes, <i>Family Law</i> (Vols I and II), Oxford University Press</td><td>Critical, gender-focused analysis</td></tr>
 <tr><td>Werner Menski, <i>Hindu Law: Beyond Tradition and Modernity</i>, OUP</td><td>History and sources in depth</td></tr>
 <tr><td>B.M. Gandhi, <i>Family Law</i>, Eastern Book Company</td><td>Concise; good for revision</td></tr></table></div>
 <div><div class="card"><h3>Statutes</h3><ul>
 <li>Hindu Marriage Act, 1955</li><li>Hindu Adoptions and Maintenance Act, 1956</li><li>Hindu Minority and Guardianship Act, 1956</li><li>Hindu Succession Act, 1956 (for Family Law II)</li>
 <li>Special Marriage Act, 1954</li><li>Guardians and Wards Act, 1890</li><li>Family Courts Act, 1984</li>
 <li>Bharatiya Nagarik Suraksha Sanhita, 2023 – s.144 (maintenance)</li><li>Bharatiya Nyaya Sanhita, 2023 – ss.80–86 (offences relating to marriage)</li>
 <li>Protection of Women from Domestic Violence Act, 2005</li><li>Prohibition of Child Marriage Act, 2006; Dowry Prohibition Act, 1961</li>
 <li>Juvenile Justice (Care and Protection of Children) Act, 2015 and Adoption Regulations, 2022</li><li>Constitution: Articles 14, 15, 21, 25, 44</li></ul></div>
 <div class="card"><h3>Online sources</h3><ul>
 <li><a href="https://www.indiacode.nic.in" target="_blank" rel="noopener">India Code</a> – official text of the Acts</li>
 <li><a href="https://indiankanoon.org" target="_blank" rel="noopener">Indian Kanoon</a> – free search of judgments</li>
 <li><a href="https://cara.wcd.gov.in" target="_blank" rel="noopener">CARA</a> – adoption procedure under the JJ Act</li>
 <li><a href="https://lawcommissionofindia.nic.in" target="_blank" rel="noopener">Law Commission of India</a> – Consultation Paper on Reform of Family Law (2018)</li>
 <li><a href="https://www.sci.gov.in" target="_blank" rel="noopener">Supreme Court of India</a> – judgments</li>
 <li><a href="https://www.tnnlulibrary.net" target="_blank" rel="noopener">TNNLU Library</a> – SCC Online, Manupatra and other e-resources</li></ul></div></div></div>`+footer(); }};

function footer(){ return `<div class="foot">Family Law I explorer · v1.0.0 · Reference material for second-semester law students, based on the standard Family Law I (Hindu law) syllabus at Indian law universities. Always check against your own course outline and the current text of the law.</div>`; }
