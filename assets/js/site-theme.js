/*
TOOL:    assets/js/site-theme.js — one light / dark theme for the whole of haivijayanand.github.io
FAMILY:  SITE
VERSION: 1.0.0
DATE:    2026-11-21
CHAT:    Make light theme by default in home page also; give option to change light / dark theme in every individual page
CHANGES: 1.0.0 - first release: light by default everywhere; one choice remembered for the whole site (localStorage "theme",
                 the same key Chirpy uses); keeps every section's own theme key in step; floating ☀/☾ button on pages that
                 have no theme button of their own; pages with no dark styles are shown dark (or light) by colour inversion,
                 with photos and video kept true; page start-up code cannot switch the theme, only the reader can
STATUS:  working

Add to a page as early as possible in <head> (plain script, not defer / module, so the theme is set before first paint):
    <script src="/assets/js/site-theme.js"></script>
Other scripts can use window.SiteTheme.get() -> "light" | "dark", SiteTheme.set("dark"), SiteTheme.toggle().
*/
(function () {
  "use strict";
  var KEY = "theme";                                  // Chirpy 7.6 keeps its light / dark choice under this key
  var PLAIN = ["fe-theme", "mr-theme", "zen-theme", "papers-theme", "c8_theme", "llb_theme", "sn-theme", "mode"];
  var JSONK = ["sw28:theme", "cr28:theme", "md30:theme", "mf30:theme", "de15:theme", "de2a:theme"];
  var root = document.documentElement;
  var chirpy = !!window.SITE_THEME_CHIRPY;            // set by _includes/metadata-hook.html on the Jekyll pages
  var cur = read();

  function read() {
    try { return localStorage.getItem(KEY) === "dark" ? "dark" : "light"; } catch (e) { return "light"; }
  }
  function store(t) {
    try {
      localStorage.setItem(KEY, t);
      PLAIN.forEach(function (k) { localStorage.setItem(k, t); });
      JSONK.forEach(function (k) { localStorage.setItem(k, JSON.stringify(t)); });
      sessionStorage.setItem("mode", t);
    } catch (e) {}
  }
  var busy = false;
  function stamp(t) {
    busy = true;
    root.setAttribute("data-theme", t);
    root.setAttribute("data-bs-theme", t);
    root.setAttribute("data-mode", t);
    root.style.colorScheme = t;
    busy = false;
  }

  /* ---- pages that have no dark (or no light) styles: invert the colours, keep photos true ---- */
  var css =
    "html.st-inv{filter:invert(1) hue-rotate(180deg)}" +
    "html.st-inv :is(img,video,picture,iframe,object,embed){filter:invert(1) hue-rotate(180deg)}" +
    "html.st-measure,html.st-measure *{transition:none!important}" +
    "#st-btn{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:2147482000;width:42px;height:42px;" +
    "border-radius:50%;border:1px solid rgba(128,128,128,.6);background:#4a4f57;color:#fff;font:20px/1 system-ui,sans-serif;" +
    "cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;padding:0;opacity:.88}" +
    "#st-btn:hover{opacity:1}#st-btn:focus-visible{outline:3px solid #2f6fd0;outline-offset:2px}" +
    "@media print{#st-btn{display:none!important}html.st-inv{filter:none}html.st-inv :is(img,video,picture,iframe,object,embed){filter:none}}";
  var st = document.createElement("style");
  st.id = "st-css";
  st.textContent = css;
  (document.head || root).appendChild(st);

  function rgba(c) {
    var m = /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+%?))?/.exec(c || "");
    if (!m) return null;
    var a = m[4] === undefined ? 1 : (m[4].indexOf("%") > 0 ? parseFloat(m[4]) / 100 : +m[4]);
    return a < 0.5 ? null : [+m[1], +m[2], +m[3]];
  }
  function bgOf(el) { return el ? rgba(getComputedStyle(el).backgroundColor) : null; }
  function pageBg() {
    var b = document.body;
    var c = bgOf(b) || bgOf(root);
    if (c || !b) return c;
    var best = null, area = 0;                       // body is clear: take the biggest painted box near the top
    Array.prototype.forEach.call(b.children, function (el) {
      var r = el.getBoundingClientRect(), a = r.width * r.height, k = bgOf(el);
      if (k && a > area) { area = a; best = k; }
    });
    return best;
  }
  function isDark(c) {
    if (!c) return false;                            // nothing painted: the browser default, white
    return (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255 < 0.45;
  }
  function fix() {
    if (chirpy || !document.body) return;
    root.classList.remove("st-inv");
    root.classList.add("st-measure");
    void root.offsetHeight;
    var dark = isDark(pageBg());
    root.classList.remove("st-measure");
    if (dark !== (cur === "dark")) root.classList.add("st-inv");
  }

  /* ---- floating button, only where the page has no theme switch of its own ---- */
  var btn = null;
  function label() {
    if (!btn) return;
    btn.textContent = cur === "dark" ? "☀" : "☾";
    var t = cur === "dark" ? "Switch to light theme" : "Switch to dark theme";
    btn.title = t; btn.setAttribute("aria-label", t);
  }
  function addButton() {
    if (chirpy || btn || document.getElementById("st-btn")) return;
    if (document.querySelector("#themeBtn,[data-theme-toggle],#mode-toggle,.theme-toggle,#themeToggle,#theme-toggle")) return;
    btn = document.createElement("button");
    btn.id = "st-btn"; btn.type = "button";
    btn.setAttribute("data-noread", "");
    if (document.getElementById("rd-btn")) btn.style.bottom = "calc(74px + env(safe-area-inset-bottom,0px))";
    btn.addEventListener("click", function () { set(cur === "dark" ? "light" : "dark"); });
    label();
    document.body.appendChild(btn);
  }

  function set(t) {
    t = t === "dark" ? "dark" : "light";
    var changed = t !== cur;
    cur = t;
    stamp(t); store(t); fix(); label();
    if (changed) {
      try { window.postMessage({ id: "theme-updated" }, "*"); } catch (e) {}           // Chirpy: mermaid, giscus
      try { window.dispatchEvent(new CustomEvent("site-theme", { detail: t })); } catch (e) {}
    }
  }

  /* the pages' own buttons (and Chirpy's) change data-theme / data-bs-theme: follow them and remember. While the page
     is still loading, a change comes from the page's start-up code (often "follow the phone's setting"), not from the
     reader, so the site choice is put back instead */
  var settled = false;
  new MutationObserver(function (recs) {
    if (busy) return;
    for (var i = recs.length - 1; i >= 0; i--) {
      var v = root.getAttribute(recs[i].attributeName);
      if (v === cur) continue;
      if (!settled) { stamp(cur); return; }
      if (v === "light" || v === "dark") { set(v); return; }
    }
  }).observe(root, { attributes: true, attributeFilter: ["data-theme", "data-bs-theme"] });

  window.SiteTheme = {
    get: function () { return cur; },
    set: set,
    toggle: function () { set(cur === "dark" ? "light" : "dark"); }
  };

  stamp(cur);
  store(cur);                                         // so each page's own early script reads the same choice

  function ready() { fix(); addButton(); setTimeout(fix, 0); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready);
  else ready();
  window.addEventListener("load", function () { fix(); setTimeout(function () { settled = true; fix(); }, 300); });
})();
