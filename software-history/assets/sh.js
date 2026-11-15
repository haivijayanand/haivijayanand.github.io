/*
TOOL:    software-history/assets/sh.js — shared behaviour for Software Through the Ages
FAMILY:  software-history
VERSION: 1.0.0
DATE:    2026-11-15
CHAT:    Software history series — start with MS-DOS, publish all episodes
CHANGES: 1.0.0 — width toggle, full screen (F), version explorer builder, bar chart helper
*/
(function(){
  const bw=document.getElementById('btnWidth');
  if(bw)bw.onclick=()=>{document.body.classList.toggle('narrow');bw.textContent=document.body.classList.contains('narrow')?'Wide view':'Reading width';};
  const fs=()=>{if(!document.fullscreenElement){const d=document.documentElement;d.requestFullscreen&&d.requestFullscreen();}else document.exitFullscreen();};
  const bf=document.getElementById('btnFs');if(bf)bf.onclick=fs;
  document.addEventListener('keydown',e=>{const t=document.activeElement.tagName;if((e.key==='f'||e.key==='F')&&t!=='INPUT'&&t!=='TEXTAREA')fs();});
})();
window.SH={
  // data: [{v,d,hw,e(1|2),n:[..]}], prefix e.g. "Windows "; eraNames: ['label for 1','label for 2']
  explorer(data,prefix,eraNames,barId='vbar',panelId='vpanel'){
    const bar=document.getElementById(barId),vp=document.getElementById(panelId);
    const show=i=>{const x=data[i];[...bar.children].forEach((b,j)=>b.classList.toggle('on',i===j));
      vp.innerHTML='<h3>'+prefix+x.v+' <span style="color:var(--muted);font-weight:400">· '+x.d+'</span></h3>'+
      '<div class="meta"><span class="tag hw">Driver: '+x.hw+'</span><span class="tag">'+eraNames[(x.e||1)-1]+'</span></div>'+
      '<ul>'+x.n.map(t=>'<li>'+t+'</li>').join('')+'</ul>';};
    data.forEach((x,i)=>{const b=document.createElement('button');b.className='vbtn'+(x.e===2?' era2':'');b.textContent=x.v;b.onclick=()=>show(i);bar.appendChild(b);});
    show(0);
  },
  // rows: [[label,value,alt?]], max
  bars(el,rows,max,unit){
    el.innerHTML=rows.map(r=>'<div class="brow"><span>'+r[0]+'</span><div class="btrack"><div class="bfill'+(r[2]?' alt':'')+'" style="width:'+(100*r[1]/max)+'%"></div></div><b>'+r[1]+(unit||'')+'</b></div>').join('');
  }
};
