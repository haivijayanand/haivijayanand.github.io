/*
TOOL:    assets/js/reader.js — reading settings ("Aa") and mobile text wrapping for every article on haivijayanand.github.io
FAMILY:  SITE
VERSION: 1.0.0
DATE:    2026-11-07
CHAT:    Make all GitHub blog articles mobile friendly, with font size and font choice on the phone
CHANGES: 1.0.0 - first release: floating Aa button (bottom right) opens reading settings - theme (Auto / Light / Dark),
                 text size 80-200 %,
                 seven fonts (English + Tamil), line spacing, wrap long code lines; choices remembered for the whole
                 site on this device; always-on wrapping fixes so text, tables, code, maths and pictures never run
                 off the side of a phone screen
STATUS:  working

Add to a page with:   <script src="/assets/js/reader.js" defer></script>
What it acts on: the first of [data-read-aloud], "article .content"'s <article> (Chirpy posts), <article>, <main>.
Text size: each element's own size is measured once and scaled, so pages written in px and in em both grow evenly
and lines re-wrap to the screen (pinch-zoom on a phone does not re-wrap; this does).
Fonts come from Google Fonts and are only fetched when the reader picks one; "Original" and "Phone font" need no network.
*/
(function () {
  "use strict";
  var root = document.querySelector("[data-read-aloud]") || document.querySelector("article") ||
             document.querySelector("main");
  if (!root || document.getElementById("rd-btn")) return;
  root.setAttribute("data-rd-root", "");
  var html = document.documentElement;

  /* ---------- settings ---------- */
  var KEY = "rd-settings-v1";
  var FONTS = [
    { id: "orig",   name: "Original",     ff: "" },
    { id: "georgia", name: "Classic",     ff: "Georgia,'Noto Serif Tamil','Times New Roman',serif", gf: "Noto+Serif+Tamil:wght@400;700" },
    { id: "nserif", name: "Noto Serif",   ff: "'Noto Serif','Noto Serif Tamil',Georgia,serif", gf: "Noto+Serif:ital,wght@0,400;0,700;1,400&family=Noto+Serif+Tamil:wght@400;700" },
    { id: "nsans",  name: "Noto Sans",    ff: "'Noto Sans','Noto Sans Tamil',system-ui,sans-serif", gf: "Noto+Sans:ital,wght@0,400;0,700;1,400&family=Noto+Sans+Tamil:wght@400;700" },
    { id: "easy",   name: "Easy Read",    ff: "'Atkinson Hyperlegible','Noto Sans Tamil',Verdana,sans-serif", gf: "Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Noto+Sans+Tamil:wght@400;700" },
    { id: "mukta",  name: "Mukta Malar",  ff: "'Mukta Malar','Noto Sans Tamil',system-ui,sans-serif", gf: "Mukta+Malar:wght@400;700" },
    { id: "device", name: "Phone font",   ff: "system-ui,-apple-system,'Segoe UI',Roboto,sans-serif" }
  ];
  var SPACING = [{ v: 0, n: "Original" }, { v: 1.6, n: "Normal" }, { v: 1.9, n: "Relaxed" }, { v: 2.2, n: "Loose" }];
  var narrow = window.matchMedia && matchMedia("(max-width: 768px)").matches;
  var THEMES = [{ v: "auto", n: "Auto" }, { v: "light", n: "\u2600 Light" }, { v: "dark", n: "\u263E Dark" }];
  var DEF = { size: 100, font: "orig", lh: 0, wrap: narrow, theme: "auto" };
  var S = load();

  function load() {
    var s = {};
    try { s = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { s = {}; }
    var o = {};
    for (var k in DEF) o[k] = (s[k] === undefined) ? DEF[k] : s[k];
    o.size = Math.min(200, Math.max(80, +o.size || 100));
    return o;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function font(id) { for (var i = 0; i < FONTS.length; i++) if (FONTS[i].id === id) return FONTS[i]; return FONTS[0]; }

  /* ---------- styles: always-on wrapping + settings + panel ---------- */
  var R = "[data-rd-root]";
  var NOFONT = ":not(code):not(pre):not(pre *):not(kbd):not(samp):not(i[class*='fa']):not(svg):not(svg *)" +
               ":not(.katex):not(.katex *):not(mjx-container):not(mjx-container *):not(.MathJax):not(.MathJax *)";
  var css =
    /* wrapping that keeps every article inside a phone screen */
    R + "{overflow-wrap:break-word;min-width:0}" +
    R + " :is(p,li,h1,h2,h3,h4,h5,h6,blockquote,dd,dt,figcaption,a,td,th,span,em,strong){overflow-wrap:break-word;word-break:normal}" +
    R + " :is(img,video,canvas,picture){max-width:100%!important;height:auto}" +
    R + " :is(iframe,embed,object,svg,table){max-width:100%}" +
    R + " :is(.table-wrapper,.tbl){overflow-x:auto;-webkit-overflow-scrolling:touch;max-width:100%}" +
    R + " .table-wrapper :is(td,th){white-space:normal!important;min-width:5.5em}" +
    R + " :is(mjx-container[display='true'],.katex-display,.MathJax_Display){overflow-x:auto;overflow-y:hidden;max-width:100%}" +
    R + " pre{max-width:100%;overflow-x:auto}" +
    "html.rd-wrap " + R + " :is(pre,pre code){white-space:pre-wrap!important;word-break:break-word!important;overflow-wrap:anywhere!important}" +
    "html.rd-wrap " + R + " .highlight :is(.gutter,.lineno,.rouge-gutter){display:none!important}" +
    /* chosen font and line spacing */
    "html.rd-ff " + R + ",html.rd-ff " + R + " *" + NOFONT + "{font-family:var(--rd-ff)!important}" +
    "html.rd-lh " + R + " :is(p,li,blockquote,dd,dt,figcaption,td){line-height:var(--rd-lh)!important}" +
    /* the Aa button and panel */
    "#rd-btn,#rd-panel{--rd-bg:#fffdf8;--rd-ink:#1d2421;--rd-mut:#5d6763;--rd-rule:#d9d2c4;--rd-acc:#1f6f5c;--rd-acc-ink:#fff;--rd-chip:#f3efe6;" +
      "font:15px/1.4 system-ui,-apple-system,'Segoe UI',Roboto,'Noto Sans Tamil',sans-serif!important;color:var(--rd-ink)}" +
    "@media (prefers-color-scheme:dark){html:not([data-mode=light]):not([data-theme=light]) :is(#rd-btn,#rd-panel){--rd-bg:#1f2523;--rd-ink:#e8ece9;--rd-mut:#9aa7a2;--rd-rule:#3a4743;--rd-acc:#5cc3a6;--rd-acc-ink:#0f1f1a;--rd-chip:#28302d}}" +
    "html:is([data-mode=dark],[data-theme=dark]) :is(#rd-btn,#rd-panel){--rd-bg:#1f2523;--rd-ink:#e8ece9;--rd-mut:#9aa7a2;--rd-rule:#3a4743;--rd-acc:#5cc3a6;--rd-acc-ink:#0f1f1a;--rd-chip:#28302d}" +
    "#rd-btn{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:9999;width:48px;height:48px;border-radius:50%;" +
      "border:1px solid var(--rd-rule);background:var(--rd-bg);color:var(--rd-ink);box-shadow:0 4px 16px rgba(0,0,0,.18);cursor:pointer;" +
      "font-family:Georgia,serif!important;font-size:19px!important;font-weight:700;letter-spacing:-.02em;display:flex;align-items:center;justify-content:center;padding:0}" +
    "#rd-btn small{font-size:.7em}" +
    "#rd-btn[aria-expanded=true]{background:var(--rd-acc);color:var(--rd-acc-ink);border-color:var(--rd-acc)}" +
    "#rd-panel{position:fixed;right:16px;bottom:calc(76px + env(safe-area-inset-bottom,0px));z-index:10000;width:340px;max-width:calc(100vw - 32px);" +
      "max-height:calc(100vh - 110px);overflow:auto;background:var(--rd-bg);border:1px solid var(--rd-rule);border-radius:14px;" +
      "box-shadow:0 12px 40px rgba(0,0,0,.25);padding:14px 16px 16px;box-sizing:border-box}" +
    "#rd-panel[hidden]{display:none}" +
    "#rd-panel *{box-sizing:border-box;font-family:inherit;letter-spacing:normal;text-transform:none}" +
    "#rd-panel .rd-h{display:flex;justify-content:space-between;align-items:center;margin:0 0 10px}" +
    "#rd-panel .rd-h b{font-size:16px}" +
    "#rd-panel .rd-x{border:0;background:transparent;color:var(--rd-mut);font-size:22px;line-height:1;cursor:pointer;padding:4px 8px}" +
    "#rd-panel .rd-l{font-size:12px;font-weight:600;color:var(--rd-mut);text-transform:uppercase;letter-spacing:.08em;margin:14px 0 6px}" +
    "#rd-panel .rd-size{display:flex;align-items:center;gap:10px}" +
    "#rd-panel .rd-size button{flex:0 0 46px;height:42px;border:1px solid var(--rd-rule);border-radius:10px;background:var(--rd-chip);color:var(--rd-ink);cursor:pointer;font-family:Georgia,serif;font-weight:700}" +
    "#rd-panel .rd-size button:first-child{font-size:14px}#rd-panel .rd-size button:last-child{font-size:21px}" +
    "#rd-panel .rd-size output{flex:1;text-align:center;font-size:17px;font-weight:600;font-variant-numeric:tabular-nums}" +
    "#rd-panel input[type=range]{width:100%;margin:10px 0 0;accent-color:var(--rd-acc)}" +
    "#rd-panel .rd-fonts{display:grid;grid-template-columns:1fr 1fr;gap:6px}" +
    "#rd-panel .rd-chips{display:flex;flex-wrap:wrap;gap:6px}" +
    "#rd-panel .rd-theme .rd-c{flex:1;text-align:center}" +
    "#rd-panel .rd-c{border:1px solid var(--rd-rule);background:var(--rd-chip);color:var(--rd-ink);border-radius:10px;padding:8px 10px;cursor:pointer;text-align:left;font-size:14px;min-height:40px}" +
    "#rd-panel .rd-fonts .rd-c span{display:block;font-size:17px;line-height:1.2;margin-bottom:2px}" +
    "#rd-panel .rd-fonts .rd-c small{font-family:system-ui,sans-serif!important;font-size:11.5px;color:var(--rd-mut)}" +
    "#rd-panel .rd-c[aria-pressed=true]{border-color:var(--rd-acc);box-shadow:inset 0 0 0 1px var(--rd-acc);background:transparent}" +
    "#rd-panel .rd-row{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:14px}" +
    "#rd-panel .rd-row label{display:flex;align-items:center;gap:8px;cursor:pointer;font-size:14px}" +
    "#rd-panel .rd-row input{width:18px;height:18px;accent-color:var(--rd-acc)}" +
    "#rd-panel .rd-reset{border:1px solid var(--rd-rule);background:transparent;color:var(--rd-ink);border-radius:999px;padding:7px 14px;cursor:pointer;font-size:13px}" +
    "#rd-panel .rd-note{font-size:12px;color:var(--rd-mut);margin:10px 0 0}" +
    "@media (max-width:560px){#rd-panel{left:8px;right:8px;width:auto;max-width:none;bottom:calc(72px + env(safe-area-inset-bottom,0px));border-radius:16px}}" +
    "@media print{#rd-btn,#rd-panel{display:none!important}}";
  var st = document.createElement("style");
  st.id = "rd-style";
  st.textContent = css;
  document.head.appendChild(st);

  /* ---------- text size: measure each element once, then scale ---------- */
  var SKIPKIDS = "svg,.katex,mjx-container,.MathJax,math";   // scale these boxes, leave their insides alone (they use em)
  var measured = null, measuredW = 0;
  function els() {
    var out = [root], all = root.querySelectorAll("*");
    for (var i = 0; i < all.length; i++) {
      var e = all[i];
      var box = e.parentElement && e.parentElement.closest(SKIPKIDS);
      if (box && root.contains(box)) continue;
      if (/^(SCRIPT|STYLE|BR|WBR|SOURCE|TRACK|PATH|G|USE)$/i.test(e.tagName)) continue;
      out.push(e);
    }
    return out;
  }
  function restoreSizes() {
    if (!measured) return;
    for (var i = 0; i < measured.length; i++) {
      var m = measured[i];
      if (m.inl) m.el.style.setProperty("font-size", m.inl, m.pri); else m.el.style.removeProperty("font-size");
    }
  }
  function measure() {
    restoreSizes();
    measured = [];
    var list = els();
    for (var i = 0; i < list.length; i++) {
      var e = list[i], px = parseFloat(getComputedStyle(e).fontSize);
      if (!px) continue;
      measured.push({ el: e, px: px, inl: e.style.getPropertyValue("font-size"), pri: e.style.getPropertyPriority("font-size") });
    }
    measuredW = window.innerWidth;
  }
  function applySize() {
    var k = S.size / 100;
    if (k === 1) { restoreSizes(); return; }
    if (!measured) measure();
    for (var i = 0; i < measured.length; i++) {
      var m = measured[i];
      m.el.style.setProperty("font-size", (Math.round(m.px * k * 10) / 10) + "px", "important");
    }
  }

  /* ---------- font, spacing, wrap ---------- */
  var loadedGF = {};
  function applyFont() {
    var f = font(S.font);
    if (!f.ff) { html.classList.remove("rd-ff"); html.style.removeProperty("--rd-ff"); return; }
    if (f.gf && !loadedGF[f.gf]) {
      loadedGF[f.gf] = 1;
      var l = document.createElement("link");
      l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=" + f.gf + "&display=swap";
      document.head.appendChild(l);
    }
    html.style.setProperty("--rd-ff", f.ff);
    html.classList.add("rd-ff");
  }
  function applyLh() {
    if (!S.lh) { html.classList.remove("rd-lh"); html.style.removeProperty("--rd-lh"); return; }
    var lang = (root.closest("[lang]") || html).getAttribute("lang") || "";
    var extra = /^ta/i.test(lang) || root.querySelector(":lang(ta)") ? 0.15 : 0;   // Tamil script needs a little more room
    html.style.setProperty("--rd-lh", String(S.lh + extra));
    html.classList.add("rd-lh");
  }
  function applyWrap() { html.classList.toggle("rd-wrap", !!S.wrap); }

  /* theme: data-theme for the site's own pages, data-mode for Chirpy posts; the pages' own theme keys are kept in step
     so their early scripts pick the same theme on the next visit and their own toggle buttons agree */
  var PAGE_KEYS = ["zen-theme", "papers-theme", "mode"];
  function applyTheme(user) {
    if (S.theme === "light" || S.theme === "dark") {
      html.setAttribute("data-theme", S.theme);
      html.setAttribute("data-mode", S.theme);
      try { PAGE_KEYS.forEach(function (k) { localStorage.setItem(k, S.theme); }); } catch (e) {}
      try { sessionStorage.setItem("mode", S.theme); } catch (e) {}   // Chirpy keeps its mode here
    } else if (user) {                       // back to Auto: follow the phone's light / dark setting
      html.removeAttribute("data-theme");
      html.removeAttribute("data-mode");
      try { PAGE_KEYS.forEach(function (k) { localStorage.removeItem(k); }); } catch (e) {}
      try { sessionStorage.removeItem("mode"); } catch (e) {}
    }
    var dark = html.getAttribute("data-theme") === "dark" || html.getAttribute("data-mode") === "dark" ||
      (!html.getAttribute("data-theme") && !html.getAttribute("data-mode") && window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches);
    var mc = document.querySelector('meta[name="color-scheme"]');
    if (!mc) { mc = document.createElement("meta"); mc.name = "color-scheme"; document.head.appendChild(mc); }
    mc.content = dark ? "dark" : "light";
  }
  function applyAll() { applyTheme(true); applyFont(); applyLh(); applyWrap(); applySize(); }

  /* ---------- button and panel ---------- */
  function h(tag, attrs, kids) {
    var e = document.createElement(tag);
    for (var a in attrs || {}) { if (a === "text") e.textContent = attrs[a]; else e.setAttribute(a, attrs[a]); }
    (kids || []).forEach(function (k) { e.appendChild(k); });
    return e;
  }
  var btn = h("button", { id: "rd-btn", type: "button", "aria-label": "Reading settings: text size and font", "aria-expanded": "false",
                          "aria-controls": "rd-panel", title: "Text size and font", "data-noread": "" });
  btn.innerHTML = "<small>A</small>A";
  var panel = h("div", { id: "rd-panel", role: "dialog", "aria-label": "Reading settings", hidden: "", "data-noread": "" });

  var minus = h("button", { type: "button", "aria-label": "Smaller text", text: "A\u2212" });
  var plus = h("button", { type: "button", "aria-label": "Bigger text", text: "A+" });
  var out = h("output", { "aria-live": "polite" });
  var range = h("input", { type: "range", min: "80", max: "200", step: "10", "aria-label": "Text size" });
  var fontsBox = h("div", { class: "rd-fonts", role: "group", "aria-label": "Font" });
  FONTS.forEach(function (f) {
    var b = h("button", { type: "button", class: "rd-c", "data-font": f.id, "aria-pressed": "false" });
    var sample = h("span", { text: "Aa \u0B85" });
    if (f.ff) sample.style.fontFamily = f.ff;
    b.appendChild(sample);
    b.appendChild(h("small", { text: f.name }));
    b.addEventListener("click", function () { S.font = f.id; save(); applyFont(); sync(); });
    fontsBox.appendChild(b);
  });
  var themeBox = h("div", { class: "rd-chips rd-theme", role: "group", "aria-label": "Theme" });
  THEMES.forEach(function (o) {
    var b = h("button", { type: "button", class: "rd-c", "data-theme-v": o.v, "aria-pressed": "false", text: o.n });
    b.addEventListener("click", function () { S.theme = o.v; save(); applyTheme(true); sync(); });
    themeBox.appendChild(b);
  });
  var lhBox = h("div", { class: "rd-chips", role: "group", "aria-label": "Line spacing" });
  SPACING.forEach(function (o) {
    var b = h("button", { type: "button", class: "rd-c", "data-lh": String(o.v), "aria-pressed": "false", text: o.n });
    b.addEventListener("click", function () { S.lh = o.v; save(); applyLh(); sync(); });
    lhBox.appendChild(b);
  });
  var wrapIn = h("input", { type: "checkbox", id: "rd-wrap" });
  var reset = h("button", { type: "button", class: "rd-reset", text: "Reset" });
  var close = h("button", { type: "button", class: "rd-x", "aria-label": "Close", text: "\u00D7" });

  panel.appendChild(h("div", { class: "rd-h" }, [h("b", { text: "Reading settings" }), close]));
  panel.appendChild(h("div", { class: "rd-l", text: "Theme" }));
  panel.appendChild(themeBox);
  panel.appendChild(h("div", { class: "rd-l", text: "Text size" }));
  panel.appendChild(h("div", { class: "rd-size" }, [minus, out, plus]));
  panel.appendChild(range);
  panel.appendChild(h("div", { class: "rd-l", text: "Font" }));
  panel.appendChild(fontsBox);
  panel.appendChild(h("div", { class: "rd-l", text: "Line spacing" }));
  panel.appendChild(lhBox);
  panel.appendChild(h("div", { class: "rd-row" }, [h("label", { for: "rd-wrap" }, [wrapIn, document.createTextNode("Wrap long code lines")]), reset]));
  panel.appendChild(h("p", { class: "rd-note", text: "Saved on this device for every article on this site." }));

  function setSize(v) { S.size = Math.min(200, Math.max(80, Math.round(v / 10) * 10)); save(); applySize(); sync(); }
  minus.addEventListener("click", function () { setSize(S.size - 10); });
  plus.addEventListener("click", function () { setSize(S.size + 10); });
  range.addEventListener("input", function () { setSize(+range.value); });
  wrapIn.addEventListener("change", function () { S.wrap = wrapIn.checked; save(); applyWrap(); });
  reset.addEventListener("click", function () { S = { size: 100, font: "orig", lh: 0, wrap: DEF.wrap, theme: "auto" }; save(); applyAll(); sync(); });

  function sync() {
    out.textContent = S.size + "%";
    range.value = S.size;
    minus.disabled = S.size <= 80; plus.disabled = S.size >= 200;
    wrapIn.checked = !!S.wrap;
    fontsBox.querySelectorAll(".rd-c").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-font") === S.font)); });
    themeBox.querySelectorAll(".rd-c").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-theme-v") === S.theme)); });
    lhBox.querySelectorAll(".rd-c").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.getAttribute("data-lh") === +S.lh)); });
  }
  function open(on) {
    panel.hidden = !on;
    btn.setAttribute("aria-expanded", String(on));
    if (on) { sync(); plus.focus({ preventScroll: true }); }
  }
  btn.addEventListener("click", function () { open(panel.hidden); });
  close.addEventListener("click", function () { open(false); btn.focus(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) { open(false); btn.focus(); } });
  document.addEventListener("click", function (e) {
    if (!panel.hidden && !panel.contains(e.target) && !btn.contains(e.target)) open(false);
  }, true);

  document.body.appendChild(panel);
  document.body.appendChild(btn);

  /* page sizes can change at a breakpoint (phone turned sideways) - measure again then */
  var rt;
  window.addEventListener("resize", function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      if (Math.abs(window.innerWidth - measuredW) < 40 || S.size === 100) return;
      measure(); applySize();
    }, 250);
  });

  applyTheme(false); applyFont(); applyLh(); applyWrap();
  if (S.size !== 100) {
    // wait for web fonts and layout so the first measurement is the page's real design size
    var go = function () { measure(); applySize(); };
    if (document.readyState === "complete") go(); else window.addEventListener("load", go, { once: true });
  }
  sync();
})();
