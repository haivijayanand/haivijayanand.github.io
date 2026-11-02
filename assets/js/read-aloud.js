/*
TOOL:    assets/js/read-aloud.js — "Listen" (read aloud) player for every article on haivijayanand.github.io
FAMILY:  SITE
VERSION: 1.0.0
DATE:    2026-11-02
CHAT:    Read aloud button for all articles on the GitHub site
CHANGES: 1.0.0 - first release: floating Listen button, play/pause, previous/next paragraph, speed, voice choice,
                 current paragraph highlighted and kept on screen, English/Tamil voice from the page language,
                 starts from the paragraph at the top of the screen when the reader has scrolled into the article
STATUS:  working

Uses the browser's own speech engine (Web Speech API) - no server, no cost, works offline once the page has loaded.
Add to a page with:   <script src="/assets/js/read-aloud.js" defer></script>
What it reads: the first of [data-read-aloud], "article .content" (Chirpy posts), <article>, <main>.
Inside that it reads headings, paragraphs, list items and quotes. It skips tables, code, figures, maths, buttons,
code blocks, anything marked data-noread, and the whole section under a heading marked data-noread or with id
"references" / "figure-credits".
*/
(function () {
  "use strict";
  var synth = window.speechSynthesis;
  if (!synth || !window.SpeechSynthesisUtterance) return;          // browser cannot speak: show nothing

  var root = document.querySelector("[data-read-aloud]") || document.querySelector("article .content") ||
             document.querySelector("article") || document.querySelector("main");
  if (!root) return;

  var BLOCKS = "h1,h2,h3,h4,h5,p,li,blockquote,dt,dd";
  var SKIP = "[data-noread],table,pre,figure,.highlighter-rouge,.highlight,.code-header,svg,math,mjx-container,.katex,.MathJax,button,input,select,textarea,nav,script,style,.ra-bar";
  var SKIP_SECTION_IDS = { "references": 1, "figure-credits": 1 };
  var RATES = [0.8, 0.9, 1, 1.15, 1.3, 1.5];
  var lang = (root.closest("[lang]") || document.documentElement).getAttribute("lang") || "en";
  var base = lang.slice(0, 2).toLowerCase();

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  /* ---------- collect what to read ---------- */
  function isHeading(el) { return /^H[1-6]$/.test(el.tagName); }
  var BLOCK_TAGS = /^(P|DIV|UL|OL|LI|H[1-6]|BLOCKQUOTE|TABLE|FIGURE|PRE|SECTION|ARTICLE|HEADER|FOOTER|NAV|ASIDE|HR|DL|DT|DD|FORM|DETAILS|FIGCAPTION|MAIN|SCRIPT|STYLE)$/;
  // text that sits loose in the article or in a <div> (old Blogger posts) gets a span so it can be read and highlighted
  function wrapLoose(box) {
    var run = [];
    function flush() {
      if (run.length && run.some(function (n) { return /[\p{L}\p{N}]/u.test(n.textContent || ""); })) {
        var s = document.createElement("span"); s.className = "ra-loose";
        run[0].parentNode.insertBefore(s, run[0]);
        run.forEach(function (n) { s.appendChild(n); });
      }
      run = [];
    }
    [].slice.call(box.childNodes).forEach(function (n) {
      if (n.nodeType === 3 || (n.nodeType === 1 && !BLOCK_TAGS.test(n.tagName))) run.push(n); else flush();
    });
    flush();
  }
  function collect() {
    var out = [], skipLevel = 0;
    [root].concat([].slice.call(root.querySelectorAll("div"))).forEach(function (d) { if (d === root || !d.closest(SKIP)) wrapLoose(d); });
    root.querySelectorAll(BLOCKS + ",.ra-loose").forEach(function (el) {
      if (isHeading(el)) {
        var lvl = +el.tagName[1];
        if (skipLevel && lvl <= skipLevel) skipLevel = 0;
        if (!skipLevel && (el.hasAttribute("data-noread") || SKIP_SECTION_IDS[el.id])) { skipLevel = lvl; return; }
      }
      if (skipLevel) return;
      if (el.closest(SKIP)) return;
      if (el.parentElement && el.parentElement.closest(BLOCKS)) return;   // nested (p inside li/blockquote): parent reads it
      var clone = el.cloneNode(true);
      clone.querySelectorAll(SKIP + ",sup,.footnote-ref").forEach(function (n) { n.remove(); });
      var text = (clone.textContent || "").replace(/\s+/g, " ").trim();
      if (!/[\p{L}\p{N}]/u.test(text)) return;
      out.push({ el: el, text: text });
    });
    return out;
  }

  // long blocks go to the engine sentence by sentence: Chrome drops utterances that run past ~15 s
  function chunks(text) {
    var parts = text.match(/[^.!?।]+[.!?।]+["'”’)\]]*\s*|[^.!?।]+$/g) || [text], out = [], cur = "";
    parts.forEach(function (p) {
      while (p.length > 240) {                                  // one very long sentence: break at a comma or space
        var cut = p.lastIndexOf(", ", 220); if (cut < 80) cut = p.lastIndexOf(" ", 220); if (cut < 80) cut = 220;
        if (cur) { out.push(cur); cur = ""; }
        out.push(p.slice(0, cut + 1)); p = p.slice(cut + 1);
      }
      if ((cur + p).length > 240) { out.push(cur); cur = p; } else cur += p;
    });
    if (cur.trim()) out.push(cur);
    return out.map(function (s) { return s.trim(); }).filter(Boolean);
  }

  /* ---------- voices ---------- */
  var voices = [];
  function loadVoices() {
    voices = synth.getVoices().filter(function (v) { return v.lang.toLowerCase().slice(0, 2) === base; });
    voices.sort(function (a, b) { return score(b) - score(a); });
    fillVoiceList();
  }
  function score(v) {
    var l = v.lang.toLowerCase().replace("_", "-");
    return (l.slice(-2) === "in" ? 4 : 0) + (/google|natural|neural|online/i.test(v.name) ? 2 : 0) + (v.localService ? 1 : 0);
  }
  function currentVoice() {
    var want = store("ra-voice-" + base);
    for (var i = 0; i < voices.length; i++) if (voices[i].name === want) return voices[i];
    return voices[0] || null;
  }

  /* ---------- player state ---------- */
  var items = null, idx = 0, part = 0, parts = [], playing = false, token = 0;
  var rate = parseFloat(store("ra-rate")) || 1;
  if (RATES.indexOf(rate) < 0) rate = 1;

  function mark(on) {
    root.querySelectorAll(".ra-now").forEach(function (n) { n.classList.remove("ra-now"); });
    if (!on || !items[idx]) return;
    var el = items[idx].el, r = el.getBoundingClientRect();
    el.classList.add("ra-now");
    if (r.top < 70 || r.bottom > innerHeight - 90) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function speak() {
    var my = ++token;
    synth.cancel();
    if (idx >= items.length) { stop(); return; }
    parts = chunks(items[idx].text);
    if (part >= parts.length) part = 0;
    mark(true); show();
    var u = new SpeechSynthesisUtterance(parts[part]);
    var v = currentVoice();
    if (v) u.voice = v;
    u.lang = v ? v.lang : lang;
    u.rate = rate;
    u.onend = function () {
      if (my !== token || !playing) return;
      part++;
      if (part >= parts.length) { part = 0; idx++; }
      speak();
    };
    u.onerror = function (e) {
      if (my !== token) return;
      if (e.error === "interrupted" || e.error === "canceled") return;
      playing = false; show(); note("The browser's voice stopped (" + e.error + "). Press play to try again.");
    };
    // Chrome sometimes needs a moment after cancel() before it accepts new speech
    setTimeout(function () { if (my === token && playing) synth.speak(u); }, 60);
  }

  function startIndex() {                         // reader scrolled into the article: begin where they are
    if (scrollY < 200) return 0;
    for (var i = 0; i < items.length; i++) if (items[i].el.getBoundingClientRect().bottom > 80) return i;
    return 0;
  }

  function play() {
    if (!items) { items = collect(); if (!items.length) { note("Nothing to read on this page."); return; } idx = startIndex(); part = 0; }
    if (idx >= items.length) { idx = 0; part = 0; }
    playing = true; open(true); speak();
  }
  function pause() { playing = false; token++; synth.cancel(); show(); }   // cancel + resume from the sentence is steadier than synth.pause()
  function stop() { playing = false; token++; synth.cancel(); if (items) mark(false); idx = 0; part = 0; open(false); }
  function jump(d) {
    if (!items) return;
    idx = Math.max(0, Math.min(items.length - 1, idx + d)); part = 0;
    if (playing) speak(); else { mark(true); show(); }
  }

  /* ---------- UI ---------- */
  var css = document.createElement("style");
  css.textContent =
    ".ra-bar{position:fixed;left:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:9999;display:flex;align-items:center;gap:4px;" +
    "background:#1f2933;color:#f5f5f0;border-radius:999px;padding:5px;box-shadow:0 4px 18px rgba(0,0,0,.28);" +
    "font:500 14px/1 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;max-width:calc(100vw - 32px)}" +
    ".ra-bar button,.ra-bar select{background:transparent;color:inherit;border:0;border-radius:999px;font:inherit;cursor:pointer;" +
    "height:36px;min-width:36px;padding:0 10px;display:inline-flex;align-items:center;justify-content:center;gap:6px}" +
    ".ra-bar button:hover,.ra-bar select:hover{background:rgba(255,255,255,.12)}" +
    ".ra-bar button:focus-visible,.ra-bar select:focus-visible{outline:2px solid #f2c14e;outline-offset:1px}" +
    ".ra-bar .ra-main{background:#f2c14e;color:#1f2933;font-weight:600}.ra-bar .ra-main:hover{background:#f6d27a}" +
    ".ra-bar .ra-x,.ra-bar .ra-prog,.ra-bar select{display:none}.ra-bar.open .ra-x,.ra-bar.open .ra-prog,.ra-bar.open select{display:inline-flex}" +
    ".ra-bar .ra-prog{font-size:12px;opacity:.75;padding:0 4px;min-width:auto;white-space:nowrap}" +
    ".ra-bar select.ra-one{display:none!important}.ra-bar select{max-width:150px;padding:0 6px;text-overflow:ellipsis}.ra-bar select option{color:#111;background:#fff}" +
    ".ra-note{position:fixed;left:16px;bottom:calc(64px + env(safe-area-inset-bottom,0px));z-index:9999;background:#1f2933;color:#f5f5f0;" +
    "font:13px/1.4 system-ui,sans-serif;padding:8px 12px;border-radius:8px;max-width:min(360px,calc(100vw - 32px));box-shadow:0 4px 18px rgba(0,0,0,.28)}" +
    ".ra-now{background:rgba(242,193,78,.22)!important;box-shadow:0 0 0 6px rgba(242,193,78,.22);border-radius:4px;transition:background .3s}" +
    "@media (max-width:560px){.ra-bar.open select{display:none}.ra-bar button{padding:0 8px}}" +
    "@media print{.ra-bar,.ra-note{display:none!important}.ra-now{background:none!important;box-shadow:none!important}}";
  document.head.appendChild(css);

  var bar = document.createElement("div");
  bar.className = "ra-bar";
  bar.setAttribute("role", "region");
  bar.setAttribute("aria-label", "Read this article aloud");
  bar.innerHTML =
    '<button type="button" class="ra-x ra-prev" title="Previous paragraph" aria-label="Previous paragraph">⏮</button>' +
    '<button type="button" class="ra-main" title="Listen to this article"><span class="ra-ico">🔊</span><span class="ra-lbl">Listen</span></button>' +
    '<button type="button" class="ra-x ra-next" title="Next paragraph" aria-label="Next paragraph">⏭</button>' +
    '<button type="button" class="ra-x ra-rate" title="Reading speed"></button>' +
    '<select class="ra-voice" title="Voice" aria-label="Voice"></select>' +
    '<span class="ra-prog" aria-live="off"></span>' +
    '<button type="button" class="ra-x ra-stop" title="Stop and close" aria-label="Stop">✕</button>';
  document.body.appendChild(bar);

  var $ = function (s) { return bar.querySelector(s); };
  var mainBtn = $(".ra-main"), voiceSel = $(".ra-voice"), noteEl = null, noteTimer = 0;

  function open(on) { bar.classList.toggle("open", on); show(); }
  function show() {
    $(".ra-ico").textContent = playing ? "⏸" : "▶";
    if (!bar.classList.contains("open")) $(".ra-ico").textContent = "🔊";
    $(".ra-lbl").textContent = playing ? "Pause" : (bar.classList.contains("open") ? "Resume" : "Listen");
    mainBtn.title = playing ? "Pause" : "Listen to this article";
    $(".ra-rate").textContent = rate + "×";
    $(".ra-prog").textContent = items ? Math.min(idx + 1, items.length) + " / " + items.length : "";
  }
  function note(msg) {
    if (!noteEl) { noteEl = document.createElement("div"); noteEl.className = "ra-note"; noteEl.setAttribute("role", "status"); document.body.appendChild(noteEl); }
    noteEl.textContent = msg; noteEl.hidden = false;
    clearTimeout(noteTimer); noteTimer = setTimeout(function () { noteEl.hidden = true; }, 6000);
  }
  function fillVoiceList() {
    var cur = currentVoice();
    voiceSel.innerHTML = "";
    voices.forEach(function (v) {
      var o = document.createElement("option");
      o.value = v.name; o.textContent = v.name.replace(/^(Microsoft|Google)\s+/, "") + " (" + v.lang + ")";
      if (cur && v.name === cur.name) o.selected = true;
      voiceSel.appendChild(o);
    });
    voiceSel.classList.toggle("ra-one", voices.length < 2);
  }

  mainBtn.onclick = function () {
    if (playing) { pause(); return; }
    if (!voices.length && synth.getVoices().length) note(base === "ta"
      ? "No Tamil voice is installed on this device, so the default voice is used. Android: Settings → Text-to-speech → install Tamil."
      : "No " + lang + " voice found; using the default voice.");
    play();
  };
  $(".ra-prev").onclick = function () { jump(-1); };
  $(".ra-next").onclick = function () { jump(1); };
  $(".ra-stop").onclick = stop;
  $(".ra-rate").onclick = function () {
    rate = RATES[(RATES.indexOf(rate) + 1) % RATES.length]; store("ra-rate", String(rate)); show();
    if (playing) speak();
  };
  voiceSel.onchange = function () { store("ra-voice-" + base, voiceSel.value); if (playing) speak(); };

  loadVoices();
  if (synth.addEventListener) synth.addEventListener("voiceschanged", loadVoices); else synth.onvoiceschanged = loadVoices;
  addEventListener("pagehide", function () { token++; synth.cancel(); });
  show();
})();
