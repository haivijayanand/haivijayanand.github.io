/*
TOOL:    assets/js/home-progress.js — reader progress on the home page and the section pages of haivijayanand.github.io
FAMILY:  SITE
VERSION: 1.0.0
DATE:    2026-11-21
CHAT:    Home page progress: section pages, certificates, start here, study streak
CHANGES: 1.0.0 - moved out of _includes/signin-box.html 1.2.0 and extended: course progress on the cards of every page
                 that shows section cards (home and the five section pages); in the home box, "Where you left off" by
                 course, certificates earned with the latest one, a study streak (days this week, days in a row), and
                 "Start here" suggestions for readers with no progress yet
STATUS:  working

Loaded (defer) by _includes/section-cards.html. Course facts come from the cards (data-folder, data-total, data-unit,
data-name); the home box is _includes/signin-box.html (#signin-box). Uses window.SiteProgress (assets/js/site-progress.js).
*/
(function () {
  "use strict";
  var HIDE_KEY = "sib-hidden";
  var box = document.getElementById("signin-box");
  var left = box && box.querySelector("[data-left]");

  /* course facts from the cards on this page */
  var COURSES = {};
  document.querySelectorAll(".sc-card[data-total]").forEach(function (a) {
    var f = a.getAttribute("data-folder");
    if (!f || COURSES[f]) return;
    COURSES[f] = { total: +a.getAttribute("data-total"), unit: a.getAttribute("data-unit") || "days",
      url: a.getAttribute("href"), name: a.getAttribute("data-name") || f };
  });

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return "&#" + c.charCodeAt(0) + ";"; }); }
  function ago(t) {
    var m = Math.round((Date.now() - (t || 0)) / 60000);
    if (m < 2) return "just now";
    if (m < 60) return m + " min ago";
    var h = Math.round(m / 60); if (h < 24) return h + (h === 1 ? " hour ago" : " hours ago");
    var d = Math.round(h / 24); if (d < 31) return d + (d === 1 ? " day ago" : " days ago");
    return new Date(t).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
  }
  function cleanTitle(t) { return String(t || "").split(/\s+[—|–]\s+/)[0] || "Untitled page"; }
  function readHidden() { try { return JSON.parse(localStorage.getItem(HIDE_KEY) || "{}"); } catch (e) { return {}; } }
  function hide(series, t) {
    var h = readHidden(); h[series] = t;
    try { localStorage.setItem(HIDE_KEY, JSON.stringify(h)); } catch (e) { }
  }
  function bar(pct) { return '<span class="sib-bar"><i style="width:' + Math.max(0, Math.min(100, Math.round(pct))) + '%"></i></span>'; }
  function isUnit(p) { return /\/(day|chapter)-/.test(p.path || ""); }
  function state(p) {
    if (p.step != null) return p.stepLabel ? "At " + p.stepLabel : "Step " + p.step;
    var pct = Math.round(p.scrollPct || 0);
    return pct > 0 ? pct + "% read" : "Opened";
  }

  function summarise(all, names) {
    var by = {}, totalDone = 0;
    Object.keys(all || {}).forEach(function (k) {
      var p = all[k]; if (!p || !p.series) return;
      var g = by[p.series] || (by[p.series] = { series: p.series, last: 0, done: 0, open: null });
      var c = COURSES[p.series];
      if (p.status === "completed") { totalDone++; if (!c || isUnit(p)) g.done++; }
      else if (!g.open || (p.updatedAt || 0) > (g.open.updatedAt || 0)) g.open = p;
      g.last = Math.max(g.last, p.updatedAt || 0);
    });
    var groups = Object.keys(by).map(function (k) {
      var g = by[k], c = COURSES[k];
      g.course = c || null;
      g.name = (c && c.name) || names[k] || k;
      g.url = (c && c.url) || "/" + k + "/";
      return g;
    }).sort(function (a, b) { return b.last - a.last; });
    return { groups: groups, totalDone: totalDone };
  }

  /* ---- cards: "You: 8 / 42 days done" ---- */
  function renderCards(sum) {
    document.querySelectorAll(".sc-card .sc-prog").forEach(function (e) { e.remove(); });
    sum.groups.forEach(function (g) {
      var c = g.course; if (!c || (!g.done && !g.open)) return;
      document.querySelectorAll('.sc-card[data-folder="' + g.series + '"]').forEach(function (card) {
        var e = document.createElement("em");
        e.className = "sc-prog";
        e.innerHTML = g.done ? "You: " + g.done + " / " + c.total + " " + c.unit + " done" + bar(100 * g.done / c.total) : "You: started";
        card.appendChild(e);
      });
    });
  }

  /* ---- home box ---- */
  function renderLeft(sum, u) {
    var hidden = readHidden();
    var shown = sum.groups.filter(function (g) { return !(hidden[g.series] >= g.last); }).slice(0, 4);
    var start = box.querySelector("[data-start]");
    if (!sum.groups.length) {                      /* nothing read yet: suggest where to begin */
      left.hidden = true;
      if (start) start.hidden = false;
      return;
    }
    if (start) start.hidden = true;
    if (!shown.length && !sum.totalDone) { left.hidden = true; return; }
    var h = "<h4>Where you left off" + (u ? "" : " (on this device)") + "</h4>";
    if (shown.length) {
      h += "<ol>";
      shown.forEach(function (g) {
        var c = g.course, line, meta, go = g.url, goText = "Open contents →";
        if (g.open) { go = g.open.path; goText = "Continue →"; }
        if (c) {
          var all = g.done >= c.total;
          line = g.open ? "Next: " + cleanTitle(g.open.title) : (all ? "All " + c.total + " " + c.unit + " done" : "Pick the next " + c.unit.replace(/s$/, ""));
          meta = g.done + " of " + c.total + " " + c.unit + " done" + (g.open ? " · " + state(g.open) : "") + " · " + ago(g.last) +
            bar(100 * g.done / c.total);
        } else {
          line = g.open ? cleanTitle(g.open.title) : "Nothing open right now";
          meta = (g.open ? state(g.open) + " · " : "") + (g.done ? g.done + " completed · " : "") + ago(g.last) +
            (g.open && g.open.step == null && g.open.scrollPct ? bar(g.open.scrollPct) : "");
        }
        h += '<li><button type="button" class="x" data-x="' + esc(g.series) + '" data-t="' + g.last + '" title="Hide until I open it again" aria-label="Hide ' + esc(g.name) + '">×</button>' +
          '<span class="s">' + esc(g.name) + '</span><span class="t">' + esc(line) + "</span>" +
          '<span class="m">' + meta + '</span><a class="go" href="' + esc(go) + '">' + goText + "</a></li>";
      });
      h += "</ol>";
    }
    if (sum.totalDone) h += '<p class="done">✓ ' + sum.totalDone + (sum.totalDone === 1 ? " page" : " pages") + " completed so far.</p>";
    left.innerHTML = h;
    left.hidden = false;
    if (!u) {
      box.querySelector("[data-pitch]").hidden = true;
      box.querySelector("[data-perks]").hidden = true;
      box.querySelector("[data-pitch2]").hidden = false;
    }
    left.querySelectorAll("[data-x]").forEach(function (b) {
      b.onclick = function () { hide(b.getAttribute("data-x"), +b.getAttribute("data-t")); renderLeft(sum, u); };
    });
  }

  /* ---- certificates and study streak (signed in; read once per browser session) ---- */
  function dayKey(t) { var d = new Date(t); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function streakOf(times) {
    var days = {};
    times.forEach(function (t) { if (t) days[dayKey(t)] = 1; });
    var today = new Date(); today.setHours(12, 0, 0, 0);
    var week = 0, i;
    for (i = 0; i < 7; i++) if (days[dayKey(today.getTime() - i * 864e5)]) week++;
    var run = 0, start = days[dayKey(today.getTime())] ? 0 : 1;      /* a streak still counts if today is not read yet */
    for (i = start; i < 400; i++) { if (days[dayKey(today.getTime() - i * 864e5)]) run++; else break; }
    return { week: week, run: run };
  }
  function extras(sp, u) {
    var k = "sib:extra:" + u.uid, cached = null;
    try { cached = JSON.parse(sessionStorage.getItem(k) || "null"); } catch (e) { }
    if (cached && Date.now() - cached.at < 10 * 60e3) return Promise.resolve(cached);
    return Promise.all([
      sp.listCertificates().catch(function () { return []; }),
      sp.listActivity(400).catch(function () { return []; })
    ]).then(function (r) {
      var certs = r[0] || [], acts = r[1] || [];
      var latest = certs[0] || null;
      var out = { at: Date.now(), certs: certs.length,
        latest: latest ? { title: latest.title || latest.course || "Certificate" } : null,
        streak: streakOf(acts.map(function (a) { return a.t; })) };
      try { sessionStorage.setItem(k, JSON.stringify(out)); } catch (e) { }
      return out;
    });
  }
  function renderExtras(x) {
    var el = box.querySelector("[data-extra]");
    if (!el) return;
    var parts = [];
    if (x.streak && x.streak.week) {
      parts.push('<span class="sib-chip" title="Days with reading on this site">📅 ' + x.streak.week + (x.streak.week === 1 ? " day" : " days") +
        " this week" + (x.streak.run > 1 ? " · " + x.streak.run + "-day streak" : "") + "</span>");
    }
    if (x.certs) {
      parts.push('<a class="sib-chip" href="' + box.getAttribute("data-dash") + '#certificates" title="My Certificates">🎓 ' + x.certs +
        (x.certs === 1 ? " certificate" : " certificates") + " earned" + (x.latest ? " · latest: " + esc(cleanTitle(x.latest.title)) : "") + "</a>");
    }
    el.innerHTML = parts.join("");
    el.hidden = !parts.length;
  }

  /* ---- start ---- */
  function show(u) {
    var sp = window.SiteProgress;
    if (box) {
      box.querySelectorAll("[data-out]").forEach(function (e) { e.hidden = !!u; });
      box.querySelectorAll("[data-in]").forEach(function (e) { e.hidden = !u; });
      if (u) {
        var n = (u.displayName || "").split(" ")[0];
        box.querySelector("[data-name]").textContent = n ? ", " + n : "";
      }
      box.classList.add("ready");
      var ex = box.querySelector("[data-extra]"); if (ex && !u) ex.hidden = true;
    }
    if (!sp) return;
    sp.loadAllProgress().then(function (all) {
      var sum = summarise(all, (sp.SITE && sp.SITE.series) || {});
      if (box) renderLeft(sum, u);
      renderCards(sum);
    }).catch(function () { if (left) left.hidden = true; });
    if (box && u && sp.listCertificates && sp.listActivity) extras(sp, u).then(renderExtras).catch(function () { });
  }
  function hook() {
    var sp = window.SiteProgress;
    if (!sp) return false;
    if (box) box.querySelector("[data-signin]").onclick = function () { sp.signIn(); };
    sp.onUser(show);
    return true;
  }
  if (box) box.querySelector("[data-signin]").onclick = function () { location.href = box.getAttribute("data-dash"); };
  if (!hook()) {
    window.addEventListener("sp:loaded", hook, { once: true });
    if (box) setTimeout(function () { if (!box.classList.contains("ready")) show(null); }, 4000);
  }
})();
