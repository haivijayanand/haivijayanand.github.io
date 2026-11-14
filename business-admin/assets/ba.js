/*
TOOL:    business-admin/assets/ba.js — shared engine for Business Administration in Three Levels
FAMILY:  business-admin
VERSION: 1.1.0
DATE:    2026-11-14
CHAT:    Business Administration series — 50 chapters, three levels (school, working, expert), interactive
CHANGES: 1.1.0 - waterfall chart helper; ticks rounded; negative bar labels; 1.0.0 - level switch, contents, theme, full screen, keys; stepper (P/S/X), quiz, sorter, flip cards,
                 calculators, T-accounts, bar / split / flow / line chart helpers
STATUS:  working
*/
(function(){
"use strict";
var root=document.documentElement, body=document.body, LV=["school","working","expert"];
function $(id){return document.getElementById(id);}
function cssv(n){return getComputedStyle(body).getPropertyValue(n).trim();}
function inr(x,d){if(x===null||x===undefined||isNaN(x))return "—";var neg=x<0;x=Math.abs(x);d=d===undefined?0:d;
  var s=x.toFixed(d),p=s.split("."),i=p[0],last=i.slice(-3),rest=i.slice(0,-3);
  if(rest)last=","+last; rest=rest.replace(/\B(?=(\d{2})+(?!\d))/g,",");
  return (neg?"−":"")+"₹"+rest+last+(p[1]?"."+p[1]:"");}
function num(x,d){if(x===null||x===undefined||!isFinite(x))return "—";return (+x).toLocaleString("en-IN",{minimumFractionDigits:d||0,maximumFractionDigits:d||0});}
function pct(x,d){return (!isFinite(x))?"—":(x*100).toFixed(d===undefined?1:d)+"%";}
function col(c){if(!c)return cssv("--lc")||cssv("--l2");return c.indexOf("--")===0?cssv(c):c;}
var PAL=["--l2","--l1","--l3","--gold","--acc"];
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");}

/* ---- charts ---- */
function bars(items,o){o=o||{};var W=o.w||900,rh=o.rh||34,lw=o.lw||230,H=items.length*rh+20,fmt=o.fmt||function(v){return num(v);};
  var mx=o.max||Math.max.apply(null,items.map(function(i){return Math.abs(i[1]);}).concat([1e-9]));
  var hasNeg=items.some(function(i){return i[1]<0;}),span=W-lw-110,z=hasNeg?lw+span/2:lw,sc=(hasNeg?span/2:span)/mx,ink=cssv("--ink"),s="";
  items.forEach(function(it,k){var y=10+k*rh,v=it[1],w=Math.abs(v)*sc,x=v<0?z-w:z,c=col(it[2]||PAL[k%PAL.length]);
    s+='<text x="'+(lw-8)+'" y="'+(y+rh/2+5)+'" font-size="14" text-anchor="end" style="fill:'+ink+'">'+esc(it[0])+'</text>';
    s+='<rect x="'+x+'" y="'+(y+4)+'" width="'+Math.max(w,1)+'" height="'+(rh-10)+'" rx="4" fill="'+c+'"'+(it[3]?' fill-opacity=".35" stroke="'+c+'" stroke-dasharray="5 3"':'')+'/>';
    s+='<text x="'+(v<0?z+6:x+w+6)+'" y="'+(y+rh/2+5)+'" font-size="14" text-anchor="start" style="fill:'+ink+';font-weight:600">'+fmt(v)+'</text>';});
  if(hasNeg)s+='<line x1="'+z+'" x2="'+z+'" y1="6" y2="'+(H-6)+'" stroke="'+cssv("--faint")+'"/>';
  return '<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;height:auto">'+s+'</svg>';}
function split(items,o){o=o||{};var W=900,H=o.h||70,tot=items.reduce(function(a,i){return a+Math.max(0,i[1]);},0)||1,x=0,s="";
  items.forEach(function(it,k){var w=W*Math.max(0,it[1])/tot,c=col(it[2]||PAL[k%PAL.length]);
    s+='<rect x="'+x+'" y="0" width="'+w+'" height="'+(H-26)+'" fill="'+c+'" stroke="'+cssv("--card")+'" stroke-width="2"/>';
    if(w>60)s+='<text x="'+(x+w/2)+'" y="'+(H-32)/2+'" dy="5" font-size="14" text-anchor="middle" style="fill:#fff;font-weight:700">'+Math.round(100*it[1]/tot)+'%</text>';
    if(w>40)s+='<text x="'+(x+w/2)+'" y="'+(H-6)+'" font-size="12.5" text-anchor="middle">'+esc(it[0])+'</text>';x+=w;});
  return '<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;height:auto">'+s+'</svg>';}
function flow(labels,on,o){o=o||{};var per=o.per||Math.min(labels.length,5),bw=o.bw||150,bh=o.bh||62,gx=36,gy=40,
  rows=Math.ceil(labels.length/per),W=per*bw+(per-1)*gx+20,H=rows*bh+(rows-1)*gy+20+(o.cycle?30:0),
  ons=[].concat(on===undefined||on===null?[]:on),c=col(o.c),ru=cssv("--rule"),ink=cssv("--ink"),card=cssv("--card"),s="";
  s+='<defs><marker id="ah'+(o.id||"")+'" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L10,5L0,10z" fill="'+cssv("--faint")+'"/></marker></defs>';
  function pos(i){var r=Math.floor(i/per),k=i%per;if(o.snake&&r%2)k=per-1-k;return [10+k*(bw+gx),10+r*(bh+gy)];}
  labels.forEach(function(l,i){var p=pos(i),hi=ons.indexOf(i)>=0;
    if(i>0){var q=pos(i-1);if(q[1]===p[1]){var dir=p[0]>q[0];s+='<line x1="'+(dir?q[0]+bw:q[0])+'" y1="'+(q[1]+bh/2)+'" x2="'+(dir?p[0]-2:p[0]+bw+2)+'" y2="'+(p[1]+bh/2)+'" stroke="'+cssv("--faint")+'" stroke-width="2" marker-end="url(#ah'+(o.id||"")+')"/>';}
      else s+='<line x1="'+(q[0]+bw/2)+'" y1="'+(q[1]+bh)+'" x2="'+(p[0]+bw/2)+'" y2="'+(p[1]-2)+'" stroke="'+cssv("--faint")+'" stroke-width="2" marker-end="url(#ah'+(o.id||"")+')"/>';}
    s+='<rect x="'+p[0]+'" y="'+p[1]+'" width="'+bw+'" height="'+bh+'" rx="10" fill="'+(hi?c:card)+'" stroke="'+(hi?c:ru)+'" stroke-width="2"/>';
    var lines=String(l).split("|");lines.forEach(function(t,j){s+='<text x="'+(p[0]+bw/2)+'" y="'+(p[1]+bh/2+5+(j-(lines.length-1)/2)*17)+'" font-size="'+(j?12.5:14.5)+'" text-anchor="middle" style="fill:'+(hi?"#fff":ink)+';font-weight:'+(j?400:600)+'">'+esc(t)+'</text>';});});
  if(o.cycle&&labels.length>1){var a=pos(labels.length-1),b=pos(0),yb=H-12;s+='<path d="M'+(a[0]+bw/2)+','+(a[1]+bh)+' L'+(a[0]+bw/2)+','+yb+' L'+(b[0]+bw/2)+','+yb+' L'+(b[0]+bw/2)+','+(b[1]+bh+2)+'" fill="none" stroke="'+cssv("--faint")+'" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#ah'+(o.id||"")+')"/>';}
  return '<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;max-width:'+(W*1.25)+'px;height:auto">'+s+'</svg>';}
function line(series,o){o=o||{};var W=900,H=o.h||340,L=70,R=20,T=20,B=48,xs=[],ys=[];
  series.forEach(function(se){se.pts.forEach(function(p){xs.push(p[0]);ys.push(p[1]);});});
  var x0=o.xmin!==undefined?o.xmin:Math.min.apply(null,xs),x1=o.xmax!==undefined?o.xmax:Math.max.apply(null,xs),
      y0=o.ymin!==undefined?o.ymin:Math.min(0,Math.min.apply(null,ys)),y1=o.ymax!==undefined?o.ymax:Math.max.apply(null,ys)*1.08||1;
  if(x1===x0)x1=x0+1;if(y1===y0)y1=y0+1;
  function nice(r){var e=Math.pow(10,Math.floor(Math.log10(r/5))),f=r/5/e;return (f<1.5?1:f<3?2:f<7?5:10)*e;}
  var ys=nice(y1-y0),xs2=o.xstep||nice(x1-x0);if(o.ymin===undefined)y0=Math.floor(y0/ys)*ys;if(o.ymax===undefined)y1=Math.ceil(y1/ys)*ys;
  var X=function(v){return L+(W-L-R)*(v-x0)/(x1-x0);},Y=function(v){return H-B-(H-T-B)*(v-y0)/(y1-y0);},ru=cssv("--rule"),ink=cssv("--ink"),s="",fy=o.fy||function(v){return num(v);},fx=o.fx||function(v){return num(v);};
  for(var yv=Math.ceil(y0/ys-1e-9)*ys;yv<=y1+1e-9;yv+=ys){s+='<line x1="'+L+'" x2="'+(W-R)+'" y1="'+Y(yv)+'" y2="'+Y(yv)+'" stroke="'+ru+'"/><text x="'+(L-6)+'" y="'+(Y(yv)+4)+'" font-size="12" text-anchor="end">'+fy(Math.abs(yv)<ys/1e6?0:yv)+'</text>';}
  for(var xv=Math.ceil(x0/xs2-1e-9)*xs2;xv<=x1+1e-9;xv+=xs2){s+='<text x="'+X(xv)+'" y="'+(H-B+18)+'" font-size="12" text-anchor="middle">'+fx(Math.abs(xv)<xs2/1e6?0:xv)+'</text>';}
  if(y0<0&&y1>0)s+='<line x1="'+L+'" x2="'+(W-R)+'" y1="'+Y(0)+'" y2="'+Y(0)+'" stroke="'+cssv("--faint")+'" stroke-width="1.5"/>';
  if(o.xl)s+='<text x="'+((L+W-R)/2)+'" y="'+(H-8)+'" font-size="13" text-anchor="middle">'+esc(o.xl)+'</text>';
  if(o.yl)s+='<text transform="translate(14,'+((T+H-B)/2)+') rotate(-90)" font-size="13" text-anchor="middle">'+esc(o.yl)+'</text>';
  (o.vlines||[]).forEach(function(v){s+='<line x1="'+X(v[0])+'" x2="'+X(v[0])+'" y1="'+T+'" y2="'+(H-B)+'" stroke="'+col(v[2]||"--gold")+'" stroke-width="2" stroke-dasharray="4 4"/><text x="'+(X(v[0])+6)+'" y="'+(T+14)+'" font-size="13" style="fill:'+col(v[2]||"--gold")+';font-weight:700">'+esc(v[1])+'</text>';});
  var ly=T+8;series.forEach(function(se,k){var c=col(se.c||PAL[k%PAL.length]);
    s+='<polyline fill="none" stroke="'+c+'" stroke-width="'+(se.w||3)+'"'+(se.dash?' stroke-dasharray="8 5"':'')+' points="'+se.pts.map(function(p){return X(p[0])+","+Y(p[1]);}).join(" ")+'"/>';
    if(se.dots)se.pts.forEach(function(p){s+='<circle cx="'+X(p[0])+'" cy="'+Y(p[1])+'" r="4" fill="'+c+'"/>';});
    if(se.n){s+='<line x1="'+(W-R-210)+'" x2="'+(W-R-180)+'" y1="'+ly+'" y2="'+ly+'" stroke="'+c+'" stroke-width="3"'+(se.dash?' stroke-dasharray="8 5"':'')+'/><text x="'+(W-R-172)+'" y="'+(ly+5)+'" font-size="13" style="fill:'+ink+'">'+esc(se.n)+'</text>';ly+=20;}});
  (o.marks||[]).forEach(function(m){s+='<circle cx="'+X(m[0])+'" cy="'+Y(m[1])+'" r="7" fill="'+col(m[3]||"--gold")+'"/><text x="'+(X(m[0])+10)+'" y="'+(Y(m[1])-10)+'" font-size="13.5" style="fill:'+ink+';font-weight:700">'+esc(m[2]||"")+'</text>';});
  return '<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;height:auto">'+s+'</svg>';}
function waterfall(items,o){o=o||{};var W=900,H=o.h||330,L=60,R=10,T=20,B=70,n=items.length,bw=(W-L-R)/n,run=0,pts=[],mn=0,mx=0,fmt=o.fmt||function(v){return num(v);};
  items.forEach(function(it){var a,b;if(it[2]==="t"){a=0;b=it[1];run=it[1];}else{a=run;b=run+it[1];run=b;}pts.push([a,b]);mn=Math.min(mn,a,b);mx=Math.max(mx,a,b);});
  if(mx===mn)mx=mn+1;var Y=function(v){return T+(H-T-B)*(mx-v)/(mx-mn);},ink=cssv("--ink"),s="";
  s+='<line x1="'+L+'" x2="'+(W-R)+'" y1="'+Y(0)+'" y2="'+Y(0)+'" stroke="'+cssv("--faint")+'"/>';
  items.forEach(function(it,i){var p=pts[i],x=L+i*bw+bw*0.15,w=bw*0.7,y1=Y(Math.max(p[0],p[1])),y2=Y(Math.min(p[0],p[1])),c=col(it[2]==="t"?"--l3":it[1]>=0?"--l2":"--l1");
    s+='<rect x="'+x+'" y="'+y1+'" width="'+w+'" height="'+Math.max(1,y2-y1)+'" fill="'+c+'" rx="3"/>';
    if(i<n-1&&items[i+1][2]!=="t")s+='<line x1="'+(x+w)+'" x2="'+(x+bw)+'" y1="'+Y(p[1])+'" y2="'+Y(p[1])+'" stroke="'+cssv("--faint")+'" stroke-dasharray="3 3"/>';
    s+='<text x="'+(x+w/2)+'" y="'+(y1-5)+'" font-size="12.5" text-anchor="middle" style="fill:'+ink+';font-weight:600">'+fmt(it[1])+'</text>';
    var lab=String(it[0]).split("|");lab.forEach(function(t,j){s+='<text x="'+(x+w/2)+'" y="'+(H-B+18+j*15)+'" font-size="12" text-anchor="middle">'+esc(t)+'</text>';});});
  return '<svg viewBox="0 0 '+W+' '+H+'" style="width:100%;height:auto">'+s+'</svg>';}
function taccs(accs,newTag){ /* accs: [{n:"Cash",dr:[[label,amt,isNew]],cr:[...]}] */
  return '<div class="taccs">'+accs.map(function(a){var sd=0,sc=0;
    function side(arr){return (arr||[]).map(function(e){return '<p'+(e[2]?' class="new"':'')+'><span>'+esc(e[0])+'</span><span>'+num(e[1])+'</span></p>';}).join("");}
    (a.dr||[]).forEach(function(e){sd+=e[1];});(a.cr||[]).forEach(function(e){sc+=e[1];});
    var bal=sd-sc;return '<div class="tacc"><div class="tn">'+esc(a.n)+'</div><div class="tb"><div><small>Dr</small>'+side(a.dr)+'</div><div><small>Cr</small>'+side(a.cr)+'</div></div><div class="tf">Balance: '+(bal===0?"nil":num(Math.abs(bal))+(bal>0?" Dr":" Cr"))+'</div></div>';}).join("")+'</div>';}

/* ---- level, contents, theme, full screen ---- */
var redraws=[];function onRedraw(f){redraws.push(f);}
function redraw(){redraws.forEach(function(f){try{f();}catch(e){console.log(e);}});}
function setLevel(l,noHash){if(LV.indexOf(l)<0)l="school";body.setAttribute("data-level",l);
  LV.forEach(function(x){var p=$("p-"+x);if(p)p.classList.toggle("on",x===l);});
  document.querySelectorAll(".levels button").forEach(function(b){b.classList.toggle("on",b.getAttribute("data-l")===l);});
  buildTOC(l);if(!noHash)history.replaceState(null,"","#"+l);redraw();}
function buildTOC(l){var names={school:"School",working:"Working people",expert:"Experts"},h='<div class="h">Contents · '+names[l]+'</div>';
  if($("snapshot"))h+='<a href="#snapshot">'+($("snapshot").querySelector("h2")||{textContent:"Snapshot"}).textContent+'</a>';
  $("p-"+l).querySelectorAll("section").forEach(function(s){var t=s.querySelector("h2");if(t&&s.id)h+='<a href="#'+s.id+'">'+t.textContent.replace(/^(\d+)/,"$1 · ")+'</a>';});
  if($("sources"))h+='<a href="#sources">Sources</a>';
  h+='<div class="keys"><kbd>1</kbd><kbd>2</kbd><kbd>3</kbd> level<br><kbd>M</kbd> hide contents<br><kbd>P</kbd> play · <kbd>S</kbd> step · <kbd>X</kbd> pause<br><kbd>T</kbd> theme · <kbd>F</kbd> full screen</div>';
  $("toc").innerHTML=h;}
function toggleSB(){body.classList.toggle("nosb");}
function toggleTheme(){var d=root.getAttribute("data-theme")==="dark"?"light":"dark";root.setAttribute("data-theme",d);try{localStorage.setItem("fe-theme",d);}catch(e){}redraw();}
function toggleFS(){if(!document.fullscreenElement){(root.requestFullscreen||function(){}).call(root);}else{document.exitFullscreen();}}

/* ---- stepper: steps [{t,m,v}] v = html string or function ---- */
var steppers=[],lastSt=null;
function stepper(id,steps){var el=$(id);if(!el)return;var st={el:el,steps:steps,i:-1,timer:null};
  el.innerHTML='<div class="ctl"><button class="btn" data-a="p">▶ Play (P)</button><button class="btn ghost" data-a="s">Next step (S)</button><button class="btn ghost" data-a="x">⏸ Pause (X)</button><button class="btn ghost" data-a="b">◀ Back</button><button class="btn ghost" data-a="r">↺ Reset</button></div><div class="stage"><div class="st"></div><div class="vis"></div><p class="sm"></p><div class="dots"></div></div>';
  st.show=function(i){st.i=Math.max(-1,Math.min(steps.length-1,i));var s=st.i<0?{t:el.getAttribute("data-title")||"Ready",m:"Press Play, or press S to go one step at a time.",v:el.getAttribute("data-start")||""}:steps[st.i];
    el.querySelector(".st").innerHTML=(st.i>=0?'<span>Step '+(st.i+1)+'/'+steps.length+'</span> · ':'')+s.t;
    el.querySelector(".vis").innerHTML=typeof s.v==="function"?s.v():(s.v||"");el.querySelector(".sm").innerHTML=s.m||"";
    el.querySelector(".dots").innerHTML=steps.map(function(_,k){return '<i class="'+(k<=st.i?"on":"")+'" data-k="'+k+'"></i>';}).join("");
    el.querySelectorAll(".dots i").forEach(function(d){d.onclick=function(){st.pause();st.show(+d.getAttribute("data-k"));};});};
  st.step=function(){if(st.i>=steps.length-1){st.pause();return false;}st.show(st.i+1);return true;};
  st.play=function(){st.pause();if(st.i>=steps.length-1)st.show(-1);st.step();st.timer=setInterval(function(){if(!st.step())st.pause();},+(el.getAttribute("data-ms")||3500));};
  st.pause=function(){if(st.timer){clearInterval(st.timer);st.timer=null;}};
  el.querySelectorAll("button").forEach(function(b){b.onclick=function(){lastSt=st;var a=b.getAttribute("data-a");
    if(a==="p")st.play();else if(a==="s"){st.pause();st.step();}else if(a==="x")st.pause();else if(a==="b"){st.pause();st.show(st.i-1);}else{st.pause();st.show(-1);}};});
  steppers.push(st);onRedraw(function(){st.show(st.i);});st.show(-1);return st;}
function activeStepper(){var p=$("p-"+body.getAttribute("data-level"));
  if(lastSt&&p.contains(lastSt.el))return lastSt;
  var vis=steppers.filter(function(s){return p.contains(s.el);});
  var best=null,bd=1e9;vis.forEach(function(s){var r=s.el.getBoundingClientRect(),d=Math.abs(r.top+r.height/2-innerHeight/2);if(d<bd){bd=d;best=s;}});return best;}

/* ---- sorter: {buckets:[..], items:[[text,correctIndex,why]]} ---- */
function sorter(id,cfg){var el=$(id);if(!el)return;el.classList.add("sorter");var sc=0,dn=0,h="";
  cfg.items.forEach(function(it,i){h+='<div class="row" data-i="'+i+'"><span class="it">'+it[0]+'</span>'+cfg.buckets.map(function(b,k){return '<button data-k="'+k+'">'+b+'</button>';}).join("")+'<span class="why">'+(it[2]||"")+'</span></div>';});
  h+='<div class="sc">Answer each row. Score: 0 / '+cfg.items.length+'</div><button class="btn ghost" style="margin-top:6px">↺ Try again</button>';el.innerHTML=h;
  el.querySelectorAll(".row").forEach(function(r){var it=cfg.items[+r.getAttribute("data-i")];r.querySelectorAll("button").forEach(function(b){b.onclick=function(){
    if(r.classList.contains("done"))return;r.classList.add("done");dn++;var k=+b.getAttribute("data-k");if(k===it[1])sc++;else b.classList.add("wrong");
    r.querySelectorAll("button")[it[1]].classList.add("right");el.querySelector(".sc").textContent="Score: "+sc+" / "+dn+(dn===cfg.items.length?" — all done"+(sc===dn?", perfect!":", read the notes on the ones you missed."):"");};});});
  el.querySelector(".btn.ghost").onclick=function(){sorter(id,cfg);};}

/* ---- flip cards [[front,back]] ---- */
function flips(id,cards){var el=$(id);if(!el)return;el.classList.add("flips");
  el.innerHTML=cards.map(function(c){return '<div class="flip" tabindex="0"><div class="in"><div class="fa">'+c[0]+'</div><div class="fb">'+c[1]+'</div></div></div>';}).join("");
  el.querySelectorAll(".flip").forEach(function(f){f.onclick=function(){f.classList.toggle("on");};});}

/* ---- calculator binding ---- */
function calc(ids,fn){function run(){var v={};ids.forEach(function(i){var e=$(i);if(!e)return;v[i]=e.type==="checkbox"?e.checked:(e.tagName==="SELECT"||e.type==="text"?e.value:(+e.value||0));
  var o=$(i+"V");if(o)o.textContent=e.value;});fn(v);}
  ids.forEach(function(i){var e=$(i);if(e){e.addEventListener("input",run);e.addEventListener("change",run);}});onRedraw(run);run();}

/* ---- quiz from window.QUIZ ---- */
function quizzes(){var Q=window.QUIZ||{};document.querySelectorAll(".quiz").forEach(function(box){var set=Q[box.getAttribute("data-quiz")];if(!set)return;var score=0,done=0,h="";
  set.forEach(function(q,qi){h+='<div class="q" data-i="'+qi+'"><p>'+(qi+1)+'. '+q[0]+'</p>';q[1].forEach(function(o,oi){h+='<button data-o="'+oi+'">'+o+'</button>';});h+='<div class="why">'+q[3]+'</div></div>';});
  h+='<p class="score"></p>';box.innerHTML=h;
  box.querySelectorAll(".q").forEach(function(qd){var q=set[+qd.getAttribute("data-i")];qd.querySelectorAll("button").forEach(function(b){b.onclick=function(){
    if(qd.classList.contains("done"))return;var o=+b.getAttribute("data-o");qd.classList.add("done");done++;if(o===q[2])score++;else b.classList.add("wrong");
    qd.querySelectorAll("button")[q[2]].classList.add("right");box.querySelector(".score").textContent="Score: "+score+" / "+done+(done===set.length?(score===set.length?" — perfect!":" — review the explanations above."):"");};});});});}

window.BA={$:$,cssv:cssv,inr:inr,num:num,pct:pct,col:col,bars:bars,split:split,flow:flow,line:line,waterfall:waterfall,taccs:taccs,stepper:stepper,sorter:sorter,flips:flips,calc:calc,onRedraw:onRedraw,redraw:redraw};

/* ---- init ---- */
try{var th=localStorage.getItem("fe-theme");if(th)root.setAttribute("data-theme",th);}catch(e){}
if($("sbBtn"))$("sbBtn").onclick=toggleSB;$("themeBtn").onclick=toggleTheme;$("fsBtn").onclick=toggleFS;
document.querySelectorAll(".levels button").forEach(function(b){b.onclick=function(){setLevel(b.getAttribute("data-l"));};});
if(window.CH&&window.CH.init)try{window.CH.init(window.BA);}catch(e){console.log(e);}
quizzes();
document.addEventListener("keydown",function(e){if(/INPUT|SELECT|TEXTAREA/.test(e.target.tagName)||e.ctrlKey||e.metaKey||e.altKey)return;var k=e.key.toLowerCase();
  if(body.classList.contains("hub")){if(k==="t")toggleTheme();else if(k==="f")toggleFS();return;}
  if(k==="1")setLevel("school");else if(k==="2")setLevel("working");else if(k==="3")setLevel("expert");
  else if(k==="m")toggleSB();else if(k==="t")toggleTheme();else if(k==="f")toggleFS();
  else if(k==="p"||k==="s"||k==="x"){var st=activeStepper();if(!st)return;lastSt=st;if(k==="p")st.play();else if(k==="s"){st.pause();st.step();}else st.pause();}});
if(body.classList.contains("hub"))return;
setLevel((location.hash||"#school").slice(1),true);
window.addEventListener("hashchange",function(){var h=location.hash.slice(1);if(LV.indexOf(h)>=0)setLevel(h,true);});
})();
