"""
TOOL:    figs.py — figures for the Thirukkural (Ulaga Pothu Marai) technical paper
FAMILY:  papers
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    Thirukkural Ulaga Pothu Marai technical paper
CHANGES: 1.0.0 - structure, word-family and tier-distribution charts (deutan-safe blue/orange/grey + hatching)
"""
__version__ = "1.0.0"
import json, collections, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager as fm
import tiers
for f in ["/root/.fonts/use/NotoSansTamil-Regular.ttf"]: fm.fontManager.addfont(f)
plt.rcParams.update({"font.family":["DejaVu Sans","Noto Sans Tamil"],"font.size":10,"svg.fonttype":"path",
                     "axes.spines.top":False,"axes.spines.right":False})
BLUE,ORANGE,GREY,INK="#1f5a99","#e08a1e","#8f969e","#222"

# Fig 1: structure
books=[("Aram\n(Virtue)",[("Prologue",4),("Domestic virtue",20),("Ascetic virtue",13),("Fate",1)]),
       ("Porul\n(Wealth & polity)",[("Royalty",25),("Limbs of the state",32),("Miscellaneous",13)]),
       ("Inbam\n(Love)",[("Pre-marital",7),("Married love",18)])]
fig,ax=plt.subplots(figsize=(8.2,3.0))
shades=[BLUE,"#5b8fc9","#9dbde3","#cfe0f3"]
for i,(b,secs) in enumerate(books):
    left=0
    for j,(n,c) in enumerate(secs):
        ax.barh(i,c,left=left,color=shades[j],edgecolor="white",height=0.62)
        if c>=4: ax.text(left+c/2,i,f"{n}\n{c}",ha="center",va="center",fontsize=8,color="white" if j<2 else INK)
        else: ax.annotate(f"{n} ({c})",(left+c/2,i+0.31),xytext=(left+c/2+4,i+0.52),fontsize=8,arrowprops=dict(arrowstyle="-",lw=.6))
        left+=c
    tot=sum(c for _,c in secs)
    ax.text(left+0.8,i,f"{tot} chapters ({tot/133*100:.1f} %)",va="center",fontsize=9,color=INK)
ax.set_yticks(range(3)); ax.set_yticklabels([b for b,_ in books]); ax.invert_yaxis()
ax.set_xlim(0,92); ax.set_xlabel("Number of chapters (10 couplets each)")
fig.tight_layout(); fig.savefig("img/fig1_structure.svg"); plt.close(fig)

# Fig 2: word families
fam=[("world (ulagu, gnālam, vaiyam)",57),("life, living beings (uyir)",48),("learning (kalvi, kaṟṟal)",48),
     ("king (mannan, vēndhan)",47),("knowledge (aṟivu)",46),("virtue (aṟam)",38),("love (anbu)",24),
     ("effort (muyaṟci, ūkkam, āḷvinai)",23),("god (theyvam, iṟaivan)",9),("fate (ūḻ)",2),("Tamil (tamiḻ)",0)]
fig,ax=plt.subplots(figsize=(8.2,3.6))
cols=[BLUE]*8+[GREY,GREY,ORANGE]
y=range(len(fam))
ax.barh(y,[v for _,v in fam],color=cols,height=0.65)
for i,(n,v) in enumerate(fam): ax.text(v+0.6,i,str(v),va="center",fontsize=8.5)
ax.set_yticks(list(y)); ax.set_yticklabels([n for n,_ in fam],fontsize=8.5); ax.invert_yaxis()
ax.set_xlabel("Couplets containing a word of the family (of 1330)"); ax.set_xlim(0,66)
ax.text(2,10,"never occurs",va="center",fontsize=8.5,color=ORANGE,style="italic")
fig.tight_layout(); fig.savefig("img/fig2_words.svg"); plt.close(fig)

# Fig 3: tiers by book
T=tiers.T; bk=lambda n:0 if n<=38 else (1 if n<=108 else 2)
c=collections.Counter((bk(n),T[n][0]) for n in T)
names=["Aram (38)","Porul (70)","Inbam (25)","All (133)"]
data={t:[c[(i,t)] for i in range(3)] for t in "ABC"}
for t in "ABC": data[t].append(sum(data[t]))
fig,ax=plt.subplots(figsize=(8.2,2.9))
left=[0]*4
sty={"A":(BLUE,"","A  holds as stated"),"B":(ORANGE,"///","B  principle holds, setting dated"),"C":(GREY,"xx","C  era-bound or contested")}
for t in "ABC":
    col,h,lab=sty[t]
    tot=[sum(data[x][i] for x in "ABC") for i in range(4)]
    pct=[data[t][i]/tot[i]*100 for i in range(4)]
    ax.barh(range(4),pct,left=left,color=col,hatch=h,edgecolor="white",height=0.6,label=lab)
    for i in range(4):
        if pct[i]>4: ax.text(left[i]+pct[i]/2,i,f"{data[t][i]}",ha="center",va="center",color="white" if t!="C" else INK,fontsize=9,fontweight="bold")
        elif data[t][i]: ax.text(left[i]+pct[i]+0.6,i-0.42,f"C: {data[t][i]}",fontsize=8)
    left=[left[i]+pct[i] for i in range(4)]
ax.set_yticks(range(4)); ax.set_yticklabels(names); ax.invert_yaxis(); ax.set_xlim(0,100)
ax.set_xlabel("Share of chapters in the book (%) — numbers in bars are chapter counts")
ax.legend(loc="upper center",bbox_to_anchor=(0.5,1.2),ncol=3,frameon=False,fontsize=8.5)
fig.tight_layout(); fig.savefig("img/fig3_tiers.svg"); plt.close(fig)
print("ok")
