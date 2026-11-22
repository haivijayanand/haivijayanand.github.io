/*
TOOL:    ba-helpers.js — shared helpers for the B.A. LL.B. explorers (home page, footer, ordering lab, flow and ring animations)
FAMILY:  law-explorers
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    Kaavya Study Materials – TNNLU B.A. LL.B. Semester I and II explorers (claude.ai, 2026-11-22)
CHANGES: 1.0.0 - first version
*/
/* Each course content file defines HOME = {title, intro:[...], tips:[...], about:"..."} and FOOT = "footer text". */
function footer(){ return `<div class="foot">${FOOT}</div>`; }
function homeView(){
  const done=S.d.done;
  return `<div class="hero"><h2>${HOME.title}</h2>${HOME.intro.map(p=>`<p>${p}</p>`).join("")}</div>
  <div class="ucards">${UNITS.map(u=>`<a class="ucard" data-go="${u.id}"><span class="k">Unit ${u.n}</span><b>${u.title}</b><span>${u.short}</span>${done[u.id]?'<span class="st">✓ Done</span>':""}</a>`).join("")}
  ${EXTRAS.map(x=>`<a class="ucard" data-go="${x.id}" style="border-top-color:var(--gold)"><span class="k" style="color:var(--gold)">${x.ic} Revise</span><b>${x.title}</b></a>`).join("")}</div>
  <div class="two" style="margin-top:18px">
   <div class="card"><h3>How to study this course</h3><ol>${HOME.tips.map(t=>`<li>${t}</li>`).join("")}</ol></div>
   <div class="card"><h3>Keyboard</h3><table class="t">
   <tr><td><span class="kbd">M</span></td><td>Show or hide the unit list</td></tr>
   <tr><td><span class="kbd">P</span> / <span class="kbd">S</span> / <span class="kbd">X</span></td><td>Play, step, pause the animation on the page</td></tr>
   <tr><td><span class="kbd">F</span></td><td>Full screen</td></tr>
   <tr><td><span class="kbd">←</span> <span class="kbd">→</span> <span class="kbd">Space</span></td><td>Flashcards: previous, next, flip</td></tr>
   <tr><td><span class="kbd">[</span> <span class="kbd">]</span></td><td>Previous or next unit</td></tr></table>
   <p style="font-size:13.5px;color:var(--muted)">Works offline once opened. Sign in (top right) to keep progress and certificates on every device. The 🎓 button shows progress and the certificate.</p></div></div>
  <div class="card"><h3>About this syllabus</h3><p>${HOME.about}</p></div>
  ${footer()}`;
}

/* ---------------- ordering lab: put items in the right order ---------------- */
function orderLab(sel, items, note){
  const box=$(sel); let cur=shuffle(items.map((t,i)=>i));
  const draw=(checked)=>{
    const all=cur.every((k,i)=>k===i);
    box.innerHTML=`<ol class="order">${cur.map((k,pos)=>`<li class="${checked?(k===pos?"ok":"bad"):""}"><span>${checked?(k===pos?"✔ ":"✖ "):""}${esc(items[k])}</span><button class="btn sm sec" data-up="${pos}" ${pos===0?"disabled":""}>↑</button><button class="btn sm sec" data-dn="${pos}" ${pos===cur.length-1?"disabled":""}>↓</button></li>`).join("")}</ol>
    <div class="row"><button class="btn" data-chk>Check order</button><button class="btn sec sm" data-shuf>Shuffle</button></div>${checked?`<div class="fb ${all?"ok":"info"}">${all?"✔ Correct order.":"Not quite – ✔ marks items in the right place."} ${note||""}</div>`:""}`;
    $$("[data-up]",box).forEach(b=>b.onclick=()=>{ const i=+b.dataset.up; [cur[i-1],cur[i]]=[cur[i],cur[i-1]]; draw(false); });
    $$("[data-dn]",box).forEach(b=>b.onclick=()=>{ const i=+b.dataset.dn; [cur[i+1],cur[i]]=[cur[i],cur[i+1]]; draw(false); });
    $("[data-chk]",box).onclick=()=>draw(true);
    $("[data-shuf]",box).onclick=()=>{ cur=shuffle(cur); draw(false); };
  };
  draw(false);
}

/* ---------------- flow animation: a vertical chain of boxes ----------------
   items = [[title, subtitle], ...]; steps = one caption per box */
function flowSVG(p, items, label){
  const w=560, h=58, gap=20, x=40, H=items.length*(h+gap)-gap+12;
  let s=`<svg viewBox="0 0 640 ${H}" class="lg" role="img" aria-label="${esc(label||"")}"><defs><marker id="${p}mk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>`;
  items.forEach((t,i)=>{ const y=6+i*(h+gap);
    s+=`<g id="${p}${i}" class="node fade"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/><text x="${x+w/2}" y="${y+(t[1]?25:36)}" text-anchor="middle">${t[0]}</text>${t[1]?`<text class="sub" x="${x+w/2}" y="${y+47}" text-anchor="middle">${t[1]}</text>`:""}</g>`;
    if(i<items.length-1) s+=`<path id="${p}a${i}" class="edge fade" d="M320 ${y+h+1} V${y+h+gap-2}" marker-end="url(#${p}mk)" style="color:var(--muted)"/>`;
  });
  return s+`</svg>`;
}
/* ring animation: boxes round a circle with arrows from each to the next (a cycle) */
function ringSVG(p, items, label, centre){
  const n=items.length, cx=320, cy=232, R=n<=4?185:200, bw=n<=4?212:160, bh=54;
  const ang=i=>-Math.PI/2+2*Math.PI*i/n, at=a=>[cx+R*Math.cos(a), cy+R*Math.sin(a)];
  /* gap (radians) left at each box so the arc starts and ends just outside it */
  const gap=a=>{ const c=Math.abs(Math.cos(a)), s=Math.abs(Math.sin(a)); return Math.min(Math.PI/n*0.85, (bw/2*s+bh/2*c+14)/R); };
  let s=`<svg viewBox="0 0 640 470" class="lg" role="img" aria-label="${esc(label||"")}"><defs><marker id="${p}mk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>`;
  if(centre){ const L=centre.split("|"); s+=`<text x="${cx}" y="${cy+6-(L.length-1)*11}" text-anchor="middle" class="big">${L.map((l,i)=>`<tspan x="${cx}" dy="${i?22:0}">${l}</tspan>`).join("")}</text>`; }
  for(let i=0;i<n;i++){ const a1=ang(i)+gap(ang(i)), a2=ang(i+1)-gap(ang(i+1)); const [x1,y1]=at(a1), [x2,y2]=at(a2);
    s+=`<path id="${p}a${i}" class="edge fade" d="M${x1.toFixed(1)} ${y1.toFixed(1)} A${R} ${R} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}" marker-end="url(#${p}mk)" style="color:var(--muted)"/>`; }
  items.forEach((t,i)=>{ const [x,y]=at(ang(i));
    s+=`<g id="${p}${i}" class="node fade"><rect x="${(x-bw/2).toFixed(1)}" y="${(y-bh/2).toFixed(1)}" width="${bw}" height="${bh}" rx="10"/><text x="${x.toFixed(1)}" y="${(y+(t[1]?-3:7)).toFixed(1)}" text-anchor="middle">${t[0]}</text>${t[1]?`<text class="sub" x="${x.toFixed(1)}" y="${(y+18).toFixed(1)}" text-anchor="middle">${t[1]}</text>`:""}</g>`; });
  return s+`</svg>`;
}
/* drive a flow or ring: box k shows when step >= k; arrow k shows once box k+1 is shown (ring: last arrow closes the loop) */
function flowAnim(boxId, p, n, steps, ring){
  return makeAnim("#"+boxId, steps, i=>{
    for(let k=0;k<n;k++){ const g=document.getElementById(p+k); if(g){ g.classList.toggle("show",k<=i); g.classList.toggle("hi",k===i); } }
    for(let k=0;k<n;k++){ const e=document.getElementById(p+"a"+k); if(e) e.classList.toggle("show", ring ? (k<i || (k===n-1 && i===steps.length-1 && steps.length>n-1)) : k<i); }
  });
}
