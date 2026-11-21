/*
TOOL:    assets/js/llb-progress.js — progress bar and course certificate for the B.Com. LL.B. study explorers
FAMILY:  law-explorers
VERSION: 1.0.0
DATE:    2026-11-22
CHAT:    Kaavya Study Materials – TNNLU B.Com. LL.B. Semester II explorers (claude.ai, 2026-11-22)
CHANGES: 1.0.0 - first release: progress bar under the top bar (units read, labs tried, best quiz score), progress panel,
                 certificate when every unit is done and the mixed quiz best is 70% or more, A4 certificate print,
                 sync with site-progress.js (Google sign-in) so progress follows the reader across devices
STATUS:  working

Load at the very end of an explorer page, after the page's own script:
  <script src="/assets/js/llb-progress.js" data-course="Law of Torts" data-sem="Semester I" data-slug="law-of-torts"></script>
The page must use the explorer globals: UNITS, VIEWS, S (S.d.done, S.d.best), cur, go(), renderSide().
*/
(function () {
  "use strict";
  var me = document.currentScript, C = me.dataset;
  var COURSE = C.course || document.title, SEM = C.sem || "", SLUG = C.slug || location.pathname.replace(/.*\/|\.html?$/g, "");
  var PASS = 70, W = { units: 60, labs: 20, quiz: 20 };
  var LKEY = "llbp_" + SLUG;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  if (typeof UNITS === "undefined" || typeof S === "undefined") { console.warn("[llb-progress] explorer globals not found"); return; }

  /* ---------- own store: labs tried, holder name, certificate ---------- */
  var P = { labs: {}, name: "", cert: null };
  try { var o = JSON.parse(localStorage.getItem(LKEY)); if (o) for (var k in o) P[k] = o[k]; } catch (e) { }
  function saveP() { try { localStorage.setItem(LKEY, JSON.stringify(P)); } catch (e) { } }

  /* ---------- how many labs each unit has (counted from the unit pages themselves) ---------- */
  var LABS = {}, LAB_TOTAL = 0;
  UNITS.forEach(function (u) {
    var n = 0;
    try { var h = VIEWS[u.id] && VIEWS[u.id].html(); n = (String(h).match(/class="card lab/g) || []).length; } catch (e) { }
    LABS[u.id] = n; LAB_TOTAL += n;
  });

  /* ---------- numbers ---------- */
  function stats() {
    var done = S.d.done || {}, best = S.d.best || {};
    var nd = UNITS.filter(function (u) { return done[u.id]; }).length;
    var lt = Object.keys(P.labs).filter(function (k) { return P.labs[k] && LABS[k.split("#")[0]] > +k.split("#")[1]; }).length;
    var q = best["0"] != null ? +best["0"] : null;
    var pct = Math.round(W.units * nd / UNITS.length + (LAB_TOTAL ? W.labs * lt / LAB_TOTAL : W.labs * nd / UNITS.length) + W.quiz * Math.min(q || 0, 100) / 100);
    return { nd: nd, n: UNITS.length, lt: lt, ln: LAB_TOTAL, q: q, pct: pct, eligible: nd === UNITS.length && q != null && q >= PASS };
  }

  /* ---------- styles ---------- */
  var css = document.createElement("style");
  css.textContent =
    "#llbpStrip{position:absolute;left:0;right:0;bottom:0;height:4px;background:rgba(255,255,255,.18)}" +
    "#llbpStrip i{display:block;height:100%;width:0;background:#f2c14e;transition:width .5s}" +
    "#llbpBtn{white-space:nowrap}#prog{display:none!important}" +
    ".llbp-meter{margin:10px 0}.llbp-meter .l{display:flex;justify-content:space-between;font-size:14.5px;margin-bottom:3px}" +
    ".llbp-meter .b{height:12px;border-radius:999px;background:var(--chip);border:1px solid var(--rule);overflow:hidden}" +
    ".llbp-meter .b i{display:block;height:100%;background:var(--info);border-radius:999px;transition:width .5s}" +
    ".llbp-meter.tot .b{height:18px}.llbp-meter.tot .b i{background:linear-gradient(90deg,var(--info),var(--gold))}" +
    ".llbp-list{list-style:none;padding:0;margin:8px 0}.llbp-list li{padding:4px 0 4px 30px;position:relative;font-size:15px}" +
    ".llbp-list li:before{content:'○';position:absolute;left:4px;top:3px;font-size:17px;color:var(--muted)}" +
    ".llbp-list li.y:before{content:'✔';color:var(--info);font-weight:700}" +
    "#llbpModal{position:fixed;inset:0;z-index:60;background:rgba(0,0,0,.45);display:none;align-items:flex-start;justify-content:center;padding:70px 14px 14px;overflow:auto}" +
    "#llbpModal.on{display:flex}#llbpModal .box{background:var(--card);color:var(--ink);border-radius:14px;max-width:620px;width:100%;padding:18px 22px;box-shadow:0 10px 40px rgba(0,0,0,.35)}" +
    "#llbpModal h3{margin:0 0 4px;color:var(--accent);font-size:22px}#llbpModal .x{float:right;background:none;border:0;font-size:24px;color:var(--muted)}" +
    ".llbp-cert{border:2px dashed var(--gold);border-radius:12px;padding:12px 14px;margin-top:12px;background:var(--hl)}" +
    ".llbp-cert input{width:100%;margin:6px 0}" +
    ".llbp-home .row{margin-top:6px}" +
    "@media (max-width:900px){#llbpBtn .w{display:none}}" +
    "@media (max-width:600px){#fsBtn{display:none}#top{gap:6px;padding:8px 10px}#top .tbtn{padding:4px 8px;font-size:13px;white-space:nowrap}#top h1{font-size:16px;min-width:0}}" +
    "@media print{#llbpStrip,#llbpBtn,#llbpModal{display:none!important}}";
  document.head.appendChild(css);

  /* ---------- top bar pieces ---------- */
  var top = $("#top");
  var strip = document.createElement("div"); strip.id = "llbpStrip"; strip.innerHTML = "<i></i>"; strip.title = "Course progress";
  if (top) top.appendChild(strip);
  var btn = document.createElement("button"); btn.id = "llbpBtn"; btn.className = "tbtn"; btn.type = "button";
  btn.title = "Your progress and certificate";
  var home = top && $$("a.tbtn", top).filter(function (a) { return /Courses/.test(a.textContent); })[0];
  if (top) top.insertBefore(btn, home || $("#themeBtn") || null);
  btn.onclick = openPanel;

  var modal = document.createElement("div"); modal.id = "llbpModal"; modal.innerHTML = '<div class="box" role="dialog" aria-label="Progress and certificate"></div>';
  document.body.appendChild(modal);
  modal.addEventListener("click", function (e) { if (e.target === modal) closePanel(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && modal.classList.contains("on")) closePanel(); }, true);

  function meter(label, val, max, unit, cls) {
    var w = max ? Math.round(100 * val / max) : 0;
    return '<div class="llbp-meter ' + (cls || "") + '"><div class="l"><span>' + label + '</span><b>' + (unit === "%" ? (val == null ? "not taken" : val + "%") : val + " / " + max) + '</b></div><div class="b"><i style="width:' + Math.min(100, w) + '%"></i></div></div>';
  }
  function panelHTML() {
    var s = stats(), u = window.SiteProgress && window.SiteProgress.user;
    var name = P.name || (u && u.displayName) || "";
    return '<button class="x" type="button" aria-label="Close" data-llbp="close">×</button><h3>🎓 My progress</h3>' +
      '<div style="color:var(--muted);font-size:14px">' + esc(COURSE) + (SEM ? " · " + esc(SEM) : "") + '</div>' +
      meter("Overall", s.pct, 100, "", "tot").replace(s.pct + " / 100", s.pct + "%") +
      meter("Units marked as done", s.nd, s.n) +
      (s.ln ? meter("Labs tried", s.lt, s.ln) : "") +
      meter("Best score, mixed quiz of 10", s.q, 100, "%") +
      '<div class="llbp-cert"><b>Certificate of completion</b><ul class="llbp-list">' +
      '<li class="' + (s.nd === s.n ? "y" : "") + '">Mark all ' + s.n + ' units as done (' + s.nd + ' so far)</li>' +
      '<li class="' + (s.q != null && s.q >= PASS ? "y" : "") + '">Score ' + PASS + '% or more in the mixed quiz – "All units (10 random)" (' + (s.q == null ? "not taken yet" : "best " + s.q + "%") + ')</li></ul>' +
      (s.eligible
        ? '<label for="llbpName" style="font-size:14px">Name on the certificate</label><input type="text" id="llbpName" value="' + esc(name) + '" placeholder="Your full name">' +
          '<div class="row"><button class="btn" type="button" data-llbp="cert">🎓 Get my certificate</button>' + (P.cert ? '<span style="font-size:13px;color:var(--muted)">Issued ' + esc(P.cert.date) + (P.cert.id ? " · " + esc(P.cert.id) : "") + '</span>' : "") + '</div>' +
          '<p style="font-size:13px;color:var(--muted);margin:6px 0 0">' + (u ? "It is saved to your account under My Certificates and gets an ID anyone can verify." : "Sign in (top right) first to give it a verifiable ID and keep it under My Certificates; otherwise it prints without an ID.") + '</p>'
        : '<p style="font-size:14px;margin:6px 0 0">Finish both steps to unlock the certificate.</p><div class="row"><button class="btn sec sm" type="button" data-llbp="next">Go to the next unit to finish</button><button class="btn sec sm" type="button" data-llbp="quiz">Take the mixed quiz</button></div>') +
      '</div><p style="font-size:13px;color:var(--muted);margin:10px 0 0">' + (u ? "Progress is saved to your account and follows you to any device." : "Progress is saved in this browser. Sign in to keep it on every device.") + ' Labs count once you answer something in them.</p>';
  }
  function openPanel() { $(".box", modal).innerHTML = panelHTML(); modal.classList.add("on"); }
  function closePanel() { modal.classList.remove("on"); }
  modal.addEventListener("click", function (e) {
    var a = e.target.closest("[data-llbp]"); if (!a) return;
    var w = a.getAttribute("data-llbp");
    if (w === "close") closePanel();
    else if (w === "quiz") { closePanel(); go("quiz"); }
    else if (w === "next") { closePanel(); var nx = UNITS.filter(function (u) { return !S.d.done[u.id]; })[0]; go(nx ? nx.id : "quiz"); }
    else if (w === "cert") issue();
  });

  /* ---------- home page card ---------- */
  function homeCard() {
    if (cur !== "home") return;
    var v = $("#view"); if (!v) return;
    var old = $(".llbp-home", v), s = stats();
    var h = '<div class="card llbp-home"><h3>🎓 Your progress · ' + s.pct + '%</h3>' +
      '<div class="llbp-meter tot"><div class="b"><i style="width:' + s.pct + '%"></i></div></div>' +
      '<div style="font-size:14.5px">' + s.nd + ' of ' + s.n + ' units done' + (s.ln ? ' · ' + s.lt + ' of ' + s.ln + ' labs tried' : '') + ' · mixed quiz ' + (s.q == null ? 'not taken' : 'best ' + s.q + '%') + '</div>' +
      '<div class="row"><button class="btn sm" type="button" data-llbp-open>' + (s.eligible ? '🎓 Get your certificate' : 'Progress and certificate') + '</button>' +
      '<span style="font-size:13px;color:var(--muted)">Certificate: all units done and ' + PASS + '% or more in the mixed quiz.</span></div></div>';
    if (old) { old.outerHTML = h; return; }
    var hero = $(".hero", v);
    if (hero) hero.insertAdjacentHTML("afterend", h); else v.insertAdjacentHTML("afterbegin", h);
  }
  document.addEventListener("click", function (e) { if (e.target.closest("[data-llbp-open]")) openPanel(); });

  /* ---------- refresh everything ---------- */
  var lastSync = "";
  function refresh() {
    var s = stats();
    $("i", strip).style.width = s.pct + "%";
    btn.innerHTML = "🎓 " + s.pct + '%<span class="w"> · ' + s.nd + "/" + s.n + " units</span>";
    homeCard();
    if (modal.classList.contains("on")) $(".box", modal).innerHTML = panelHTML();
    sync(s);
  }
  // wrap the page's own renderSide (runs on every navigation and every "mark as done")
  var origRender = window.renderSide;
  if (typeof origRender === "function") window.renderSide = function () { var r = origRender.apply(this, arguments); try { refresh(); } catch (e) { console.warn(e); } return r; };
  // the page saves quiz bests through S.save – watch it too
  var origSave = S.save;
  S.save = function () { var r = origSave.apply(this, arguments); setTimeout(refresh, 0); return r; };

  /* labs: any answer, check or button press inside a lab card counts as tried */
  document.addEventListener("click", function (e) {
    var card = e.target.closest(".card.lab"); if (!card || !e.target.closest("button,input,select,label,.opt,.part")) return;
    if (!LABS[cur]) return;
    var i = $$("#view .card.lab").indexOf(card); if (i < 0) return;
    var k = cur + "#" + i; if (P.labs[k]) return;
    P.labs[k] = 1; saveP(); refresh();
  });
  document.addEventListener("change", function (e) {
    var card = e.target.closest && e.target.closest(".card.lab"); if (!card || !LABS[cur]) return;
    var i = $$("#view .card.lab").indexOf(card); if (i < 0) return;
    var k = cur + "#" + i; if (!P.labs[k]) { P.labs[k] = 1; saveP(); refresh(); }
  });

  /* ---------- sign-in sync (site-progress.js) ---------- */
  function SP() { return window.SiteProgress; }
  var syncTimer = null;
  function sync(s) {
    var sp = SP(); if (!sp) return;
    var data = { done: S.d.done || {}, best: S.d.best || {}, labs: P.labs };
    var sig = JSON.stringify(data) + s.pct;
    if (sig === lastSync) return;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(function () {
      lastSync = sig;
      sp.saveProgress({ title: COURSE + (SEM ? " – " + SEM : ""), scrollPct: s.pct, status: P.cert ? "completed" : "in-progress", llb: data }).catch(function (e) { console.warn("[llb-progress]", e); });
    }, 1200);
  }
  function mergeCloud() {
    var sp = SP(); if (!sp || !sp.user) return;
    sp.getProgress().then(function (p) {
      if (!p || !p.llb) return;
      var ch = false, c = p.llb;
      Object.keys(c.done || {}).forEach(function (k) { if (c.done[k] && !S.d.done[k]) { S.d.done[k] = true; ch = true; } });
      Object.keys(c.best || {}).forEach(function (k) { if (S.d.best[k] == null || c.best[k] > S.d.best[k]) { S.d.best[k] = c.best[k]; ch = true; } });
      Object.keys(c.labs || {}).forEach(function (k) { if (c.labs[k] && !P.labs[k]) { P.labs[k] = 1; ch = true; } });
      if (p.status === "completed" && !P.cert) { P.cert = { date: "", id: "" }; ch = true; }
      if (ch) { origSave.call(S); saveP(); go(cur, false); }
      else refresh();
    }).catch(function () { });
  }
  function hookSP() {
    var sp = SP(); if (!sp || hookSP.done) return; hookSP.done = true;
    sp.ready.then(function () { mergeCloud(); certFromURL(); });
    sp.onUser(function () { lastSync = ""; mergeCloud(); });
  }
  if (SP()) hookSP(); else window.addEventListener("sp:loaded", hookSP);

  /* ---------- certificate ---------- */
  function today() { return new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }); }
  function issue() {
    var s = stats(); if (!s.eligible) return;
    var inp = $("#llbpName"), name = (inp && inp.value || "").trim();
    if (!name) { if (inp) { inp.focus(); inp.style.outline = "2px solid var(--gold)"; } return; }
    P.name = name; saveP();
    var rec = { holderName: name, score: s.q + "%", date: today(), certId: "" };
    var sp = SP();
    var done = function (r) {
      if (r && r.certId) { rec.certId = r.certId; rec.date = r.issuedAt instanceof Date ? r.issuedAt.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : rec.date; }
      P.cert = { date: rec.date, id: rec.certId }; saveP();
      if (sp) sp.markComplete({ score: s.q, total: 100 }).catch(function () { });
      printCert(rec); refresh();
    };
    if (sp && sp.user) {
      sp.saveCertificate({ course: "llb/" + SLUG, title: COURSE + (SEM ? " – B.Com. LL.B. (Hons.) " + SEM : ""), holderName: name, score: "Quiz " + s.q + "%", reprint: true })
        .then(done).catch(function (e) { console.warn(e); done(null); });
    } else done(null);
  }
  function certHTML(c) {
    var verify = c.certId ? "https://haivijayanand.github.io/verify/?id=" + encodeURIComponent(c.certId) : "";
    return '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Certificate – ' + esc(COURSE) + '</title><style>' +
      '@page{size:A4 landscape;margin:0}*{box-sizing:border-box}html,body{margin:0;background:#fff}' +
      '.pg{width:297mm;height:210mm;padding:11mm;font-family:Georgia,"Times New Roman",serif;color:#2a1d1f}' +
      '.fr{height:100%;border:2.6mm solid #7a1f2b;padding:12mm 18mm;display:flex;flex-direction:column;align-items:center;text-align:center;position:relative}' +
      '.fr:before{content:"";position:absolute;inset:3.5mm;border:.6mm solid #9a7412}' +
      '.seal{font-size:30pt;line-height:1;margin-top:1mm}.site{font:600 10pt system-ui,Arial,sans-serif;letter-spacing:.25em;text-transform:uppercase;color:#9a7412;margin-top:2mm}' +
      'h1{font-size:32pt;margin:5mm 0 1mm;letter-spacing:.04em;color:#7a1f2b}.sub{font-size:13pt;font-style:italic;margin:2.5mm 0}' +
      '.nm{font-size:29pt;font-weight:bold;margin:3mm 0 1mm;padding:0 14mm 2mm;border-bottom:.5mm solid #2a1d1f}' +
      '.cr{font-size:20pt;font-weight:bold;margin:2mm 0 0;color:#7a1f2b}.pr{font-size:12.5pt;margin:1.5mm 0 0}' +
      '.sc{font:11.5pt system-ui,Arial,sans-serif;margin-top:4mm;color:#333}' +
      '.ft{margin-top:auto;width:100%;display:flex;justify-content:space-between;align-items:flex-end;font:9.5pt system-ui,Arial,sans-serif}' +
      '.id{text-align:left;line-height:1.55}.id b{font-family:monospace;font-size:10.5pt}.sg{text-align:center;min-width:62mm}.sg .ln{border-top:.4mm solid #2a1d1f;padding-top:1.5mm;margin-top:10mm}' +
      '</style></head><body><div class="pg"><div class="fr"><div class="seal">⚖️</div><div class="site">Law Study Explorers · haivijayanand.github.io</div>' +
      '<h1>Certificate of Completion</h1><div class="sub">This is to certify that</div><div class="nm">' + esc(c.holderName) + '</div>' +
      '<div class="sub">has worked through every unit of the interactive study explorer</div><div class="cr">' + esc(COURSE) + '</div>' +
      '<div class="pr">B.Com. LL.B. (Hons.)' + (SEM ? " · " + esc(SEM) : "") + '</div>' +
      '<div class="sc">All ' + UNITS.length + ' units completed · Best score in the mixed quiz: ' + esc(c.score) + '</div>' +
      '<div class="ft"><div class="id">Issued: ' + esc(c.date) + '<br>' + (c.certId ? 'Certificate ID: <b>' + esc(c.certId) + '</b><br>Verify: ' + esc(verify) : 'Not registered – sign in on the site to get a verifiable ID') + '</div>' +
      '<div class="sg"><div class="ln">K Vijay Anand</div></div></div></div></div></body></html>';
  }
  function printCert(c) {
    var f = document.createElement("iframe");
    f.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
    document.body.appendChild(f);
    var d = f.contentWindow.document; d.open(); d.write(certHTML(c)); d.close();
    setTimeout(function () { f.contentWindow.focus(); f.contentWindow.print(); setTimeout(function () { f.remove(); }, 60000); }, 350);
  }
  /* reprint from My Certificates: page.html?cert=ID#cert */
  function certFromURL() {
    var id = new URLSearchParams(location.search).get("cert"), sp = SP();
    if (!id || !sp || !sp.user) return;
    sp.listCertificates().then(function (list) {
      var c = list.filter(function (x) { return x.certId === id; })[0]; if (!c) return;
      printCert({ holderName: c.holderName, score: String(c.score || "").replace(/^Quiz\s*/, ""), certId: c.certId, date: sp.certDate(c) });
    }).catch(function () { });
  }

  refresh();
})();
