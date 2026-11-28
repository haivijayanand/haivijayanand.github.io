/*
TOOL:    utilities/util.js — theme, full-screen and copy buttons for the Utilities pages
FAMILY:  utilities
VERSION: 1.0.0
DATE:    2026-11-28
CHAT:    Publish FocusGuard and TV lock under a Utilities section on GitHub
CHANGES: 1.0.0 — first release: ◐ Theme via site-theme.js, ⛶ Full screen (button or F), Copy button on every code block
STATUS:  public
*/
(function(){
  var t=document.getElementById("themeBtn");
  if(t)t.onclick=function(){if(window.SiteTheme)SiteTheme.toggle();else{var r=document.documentElement;r.setAttribute("data-theme",r.getAttribute("data-theme")==="dark"?"light":"dark");}};
  function full(){if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen().catch(function(){});}
  var f=document.getElementById("btnFull");if(f)f.onclick=full;
  document.addEventListener("keydown",function(e){if((e.key==="f"||e.key==="F")&&!e.ctrlKey&&!e.metaKey&&!/INPUT|TEXTAREA/.test(e.target.tagName))full();});
  document.querySelectorAll("pre").forEach(function(p){
    var b=document.createElement("button");b.className="copy";b.textContent="Copy";
    b.onclick=function(){var c=p.querySelector("code");navigator.clipboard.writeText((c||p).innerText).then(function(){b.textContent="Copied";setTimeout(function(){b.textContent="Copy";},1500);});};
    p.appendChild(b);
  });
})();
