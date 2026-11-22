/*
TOOL: site-progress.js — Google sign-in, reading progress, resume, completed ticks and certificates for haivijayanand.github.io
FAMILY: site-progress
VERSION: 1.7.0
DATE: 2026-11-22
CHAT: Login, progress & certificates on GitHub Pages with Firebase
CHANGES: 1.7.0 — Eigenvalues & Eigenvectors course (/eigen/) added to the tracked series
         1.6.0 — Law Study Explorers (/llb/ hub and /tools/llb-*.html course pages) added to the tracked series
         1.5.0 — Differential Equations Part II added to the tracked series
         1.4.0 — Differential Equations Course added to the tracked series
         1.3.0 — Manufacturing, Machine Design and Stock Management courses added to the tracked series
         1.2.1 — account menu shows an Admin link (to /my-progress/admin/) only for the site owner's account
         1.2.0 — activity log for signed-in readers (page visits with time on page, sign-in, completed, steps, certificates) in users/{uid}/activity; visit/completed/certificate counters and first/last seen on users/{uid}; listActivity, clearActivity, logEvent API; <meta name="sp-log" content="off"> to skip a page; account button joins the page's own top toolbar (next to Full screen) when there is one; pages with their own "Mark ... complete" button keep it and it now feeds the account
         1.1.1 — Firebase project haivijayanand-site config filled in
         1.1.0 — account button sits in the page's top nav when there is one; resume bar clears the Aa/Listen buttons; badges go inside cover cards; done button refreshes on quiz completion; 'sp:loaded' event; certificates can be reprinted in the page's own design
         1.0.0 — first release: Google sign-in, per-page resume, Mark-as-completed, index badges and counts, continue widget, certificate store + PDF reprint, local fallback when signed out
STATUS: configured for Firebase project haivijayanand-site
*/
export const SP_VERSION = '1.7.0';

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut, onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {
  getFirestore, doc, getDoc, setDoc, getDocs, deleteDoc, collection, serverTimestamp, writeBatch,
  updateDoc, increment, query, orderBy, limit
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

/* ───────────── 1. YOUR SETTINGS ───────────── */

// Firebase console → Project settings → Your apps → Web app → SDK setup → "Config".
// This config is not secret; access is controlled by the Firestore rules.
const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyC4Wjkv-IDBzMU89aLBmb3l4w0-5FLVjVk',
  authDomain: 'haivijayanand-site.firebaseapp.com',
  projectId: 'haivijayanand-site',
  appId: '1:438153788657:web:a73815e732f97fd106fd50'
};

const SITE = {
  dashboard: '/my-progress/',
  admin: '/my-progress/admin/',
  // site owner's User UID(s): only these accounts see the Admin link (the Firestore rules are what actually protect the data)
  adminUids: ['pn7eEDgN9CYEc3kxZPKp3BmftcH2'],
  verify: '/verify/',
  certPrefix: 'HVA',                 // certificate IDs look like HVA-2026-7KQ3XM
  issuer: 'K Vijay Anand',
  siteName: 'haivijayanand.github.io',
  resumeMinPct: 5,                   // offer "resume" only past this much
  revisitGapMin: 10,                 // a reload of the same page within this many minutes is not logged again
  minVisitSecs: 3,                   // time-on-page shorter than this is not written back
  saveEveryMs: 15000,                // scroll position saved at most this often
  chip: { top: '10px', right: '12px' },   // where the account button floats when no host is found
  chipHosts: ['#sp-account', 'nav.top'],  // first match holds the account button inside the page
  // Folder name (first part of the URL) → series name. Pages under these folders are tracked.
  // A page elsewhere can opt in with <meta name="sp-series" content="book-review">.
  series: {
    'book-review': 'Book Review',
    'life-books': 'Life Books',
    'solidworks': 'SolidWorks Course',
    'creo': 'Creo Course',
    'machine-design': 'Machine Design Course',
    'manufacturing': 'Manufacturing Course',
    'stock-management': 'Stock Management Course',
    'differential-equations': 'Differential Equations Course',
    'differential-equations-2': 'Differential Equations Part II',
    'eigen': 'Eigenvalues & Eigenvectors Course',
    'finance-economics': 'Finance & Economics',
    'business-admin': 'Business Administration',
    'papers': 'Technical Papers',
    'llb': 'Law Study Explorers'
  }
};

/* ───────────── 2. HELPERS ───────────── */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const meta = n => { const m = document.querySelector(`meta[name="${n}"]`); return m ? m.content.trim() : ''; };
const now = () => Date.now();
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function normPath(p) {
  try { p = decodeURIComponent(p); } catch (e) { /* keep raw */ }
  p = p.split('#')[0].split('?')[0].replace(/\/index\.html?$/i, '/').replace(/\.html?$/i, '');
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p || '/';
}
const keyOf = path => (path.replace(/^\//, '').replace(/[\/#?.\s]+/g, '__') || 'home').slice(0, 300);
function seriesOf(path) {
  const forced = path === normPath(location.pathname) ? meta('sp-series') : '';
  if (forced) return forced;
  if (/^\/tools\/llb-/.test(path)) return 'llb';      // B.Com. LL.B. course explorers live in /tools/
  const first = path.split('/')[1] || '';
  return SITE.series[first] ? first : '';
}
const isSeriesRoot = path => path.split('/').length === 2 && !!SITE.series[path.split('/')[1]];
function pctScrolled() {
  const h = document.documentElement.scrollHeight - innerHeight;
  return h <= 0 ? 100 : Math.max(0, Math.min(100, Math.round(scrollY / h * 100)));
}
function randomId(n = 6) {
  const a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', b = new Uint8Array(n);
  crypto.getRandomValues(b);
  return Array.from(b, x => a[x % a.length]).join('');
}

/* local store (signed-out visitors, and an offline mirror) */
const LS_KEY = 'sp:v1';
function lsRead() { try { return JSON.parse(localStorage.getItem(LS_KEY)) || { progress: {} }; } catch (e) { return { progress: {} }; } }
function lsWrite(d) { try { localStorage.setItem(LS_KEY, JSON.stringify(d)); } catch (e) { /* storage full or blocked */ } }

/* ───────────── 3. FIREBASE ───────────── */

const configured = !FIREBASE_CONFIG.apiKey.startsWith('PASTE');
let app, auth, db;
if (configured) {
  app = initializeApp(FIREBASE_CONFIG);
  auth = getAuth(app);
  db = getFirestore(app);
} else {
  console.warn('[site-progress] FIREBASE_CONFIG not filled in — running in local-only mode.');
}

let user = null;
let cache = null;            // { key: progressDoc } for the signed-in user
const listeners = new Set();
let readyResolve; const ready = new Promise(r => (readyResolve = r));

const progCol = () => collection(db, 'users', user.uid, 'progress');
const progDoc = key => doc(db, 'users', user.uid, 'progress', key);
const certCol = () => collection(db, 'users', user.uid, 'certificates');

const SS_KEY = uid => `sp:cache:${uid}`;
function ssSave() { if (user && cache) try { sessionStorage.setItem(SS_KEY(user.uid), JSON.stringify({ t: now(), d: cache })); } catch (e) { } }
function ssLoad() { try { const o = JSON.parse(sessionStorage.getItem(SS_KEY(user.uid))); return o && now() - o.t < 5 * 60e3 ? o.d : null; } catch (e) { return null; } }

async function loadAllProgress(force = false) {
  if (!user) { cache = null; return lsRead().progress; }
  if (cache && !force) return cache;
  const s = !force && ssLoad();
  if (s) { cache = s; return cache; }
  const snap = await getDocs(progCol());
  cache = {};
  snap.forEach(d => { cache[d.id] = d.data(); });
  ssSave();
  return cache;
}

/* copy progress made while signed out into the account (newer wins) */
async function mergeLocalIntoCloud() {
  const local = lsRead().progress, keys = Object.keys(local);
  if (!keys.length) return;
  const cloud = await loadAllProgress(true);
  const batch = writeBatch(db); let n = 0;
  for (const k of keys) {
    const L = local[k], C = cloud[k];
    const better = !C || (L.updatedAt || 0) > (C.updatedAt || 0) || (L.status === 'completed' && C.status !== 'completed');
    if (better) { const v = { ...C, ...L, serverAt: serverTimestamp() }; batch.set(progDoc(k), v, { merge: true }); cache[k] = v; n++; }
  }
  if (n) { await batch.commit(); ssSave(); }
}

/* ───────────── 4. PUBLIC API ───────────── */

async function getProgress(path = location.pathname) {
  const k = keyOf(normPath(path));
  const all = await loadAllProgress();
  return all[k] || null;
}

async function saveProgress(fields, path = location.pathname) {
  const p = normPath(path), k = keyOf(p);
  const base = { path: p, series: seriesOf(p), title: fields.title || meta('sp-title') || document.title, updatedAt: now() };
  const v = { ...base, ...fields };
  // always mirror locally
  const L = lsRead(); L.progress[k] = { ...(L.progress[k] || {}), ...v }; lsWrite(L);
  if (!user) return v;
  if (cache) cache[k] = { ...(cache[k] || {}), ...v };
  ssSave();
  await setDoc(progDoc(k), { ...v, serverAt: serverTimestamp() }, { merge: true });
  return v;
}

async function markComplete(extra = {}, path = location.pathname) {
  const before = await getProgress(path).catch(() => null);
  const v = await saveProgress({ status: 'completed', completedAt: now(), scrollPct: 100, ...extra }, path);
  if (normPath(path) === normPath(location.pathname) && pageIsTracked()) { $('.sp-resume')?.remove(); renderDoneButton(v); }
  if (user) {
    logEvent('complete', { path, title: v.title, ...('score' in extra ? { score: extra.score } : {}), ...('total' in extra ? { total: extra.total } : {}) });
    if (before?.status !== 'completed') bumpUser({ completed: increment(1) });
  }
  emit(); return v;
}
async function markIncomplete(path = location.pathname) {
  const v = await saveProgress({ status: 'in-progress', completedAt: null }, path);
  if (normPath(path) === normPath(location.pathname) && pageIsTracked()) renderDoneButton(v);
  if (user) { logEvent('reopen', { path, title: v.title }); bumpUser({ completed: increment(-1) }); }
  emit(); return v;
}
/* for step-based pages (courses, tools): SiteProgress.saveStep(3, 'Day 3 — Sketch relations') */
async function saveStep(step, label = '') {
  const cur = await getProgress();
  if (user && cur?.step !== step) logEvent('step', { step, label });
  return saveProgress({ step, stepLabel: label, status: cur?.status === 'completed' ? 'completed' : 'in-progress' });
}
async function resetProgress(path) {
  const k = keyOf(normPath(path));
  const L = lsRead(); delete L.progress[k]; lsWrite(L);
  if (user) { await deleteDoc(progDoc(k)); if (cache) delete cache[k]; ssSave(); }
  emit();
}

async function signIn() {
  if (!configured) { toast('Sign-in is not set up yet (Firebase config missing).'); return; }
  try { await signInWithPopup(auth, new GoogleAuthProvider()); if (!user) user = auth.currentUser; logEvent('signin'); }
  catch (e) {
    if (e.code === 'auth/popup-blocked') toast('Your browser blocked the sign-in window. Allow pop-ups for this site and try again.');
    else if (e.code !== 'auth/popup-closed-by-user' && e.code !== 'auth/cancelled-popup-request') toast('Sign-in failed: ' + (e.code || e.message));
  }
}
async function signOut() {
  // clear this browser's copy so the next person to sign in here doesn't inherit it (it is safe in the account)
  lsWrite({ progress: {} });
  if (auth) await fbSignOut(auth);
}
const onUser = fn => { listeners.add(fn); if (userKnown) fn(user); return () => listeners.delete(fn); };
let userKnown = false;
function emit() { listeners.forEach(fn => { try { fn(user); } catch (e) { console.error(e); } }); }

/* ── activity log ── */
// users/{uid}/activity/{auto}: { type, path, title, series, t (ms), at (server time), device, ...details }
// types written by this script: visit (+secs on leaving), signin, complete, reopen, step, certificate.
// Pages and tools can add their own: SiteProgress.logEvent('quiz', { chapter: 3, score: 8, total: 10 })
const actCol = () => collection(db, 'users', user.uid, 'activity');
const userRef = () => doc(db, 'users', user.uid);
const device = () => /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
const logOff = () => meta('sp-log') === 'off';
function cleanDetails(d) {
  const o = {};
  Object.entries(d || {}).slice(0, 12).forEach(([k, v]) => {
    if (v == null) return;
    o[k] = typeof v === 'number' || typeof v === 'boolean' ? v : String(v).slice(0, 200);
  });
  return o;
}
async function logEvent(type, details = {}) {
  if (!user || !configured) return null;
  try {
    const p = normPath(details.path || location.pathname);
    const ref = doc(actCol());
    await setDoc(ref, {
      type: String(type).slice(0, 30), path: p,
      title: String(details.title || meta('sp-title') || document.title || p).slice(0, 200),
      series: seriesOf(p) || '', device: device(), t: now(), at: serverTimestamp(),
      ...cleanDetails(Object.fromEntries(Object.entries(details).filter(([k]) => !['path', 'title'].includes(k))))
    });
    return ref;
  } catch (e) { console.warn('[site-progress] log', e); return null; }
}
async function bumpUser(fields) {
  if (!user) return;
  try { await setDoc(userRef(), { ...fields, lastSeen: serverTimestamp() }, { merge: true }); } catch (e) { }
}
/* one 'visit' per page view; time actually spent on the page (tab visible) is added when the reader leaves */
let visitRef = null, visibleMs = 0, visibleSince = 0, visitClosed = false;
async function logVisit() {
  if (!user || logOff() || visitRef) return;
  const p = normPath(location.pathname), k = 'sp:lastVisit:' + p;
  try { const last = +sessionStorage.getItem(k) || 0; if (now() - last < SITE.revisitGapMin * 60e3) return; sessionStorage.setItem(k, String(now())); } catch (e) { }
  let from = '';
  try { const r = new URL(document.referrer); if (r.origin === location.origin) from = normPath(r.pathname); } catch (e) { }
  visibleSince = document.visibilityState === 'visible' ? now() : 0;
  visitRef = await logEvent('visit', from ? { from } : {});
  const t = document.title || p;
  bumpUser({ visits: increment(1), lastPath: p, lastTitle: t.slice(0, 200) });
}
function closeVisit() {
  if (!visitRef || visitClosed) return;
  if (visibleSince) { visibleMs += now() - visibleSince; visibleSince = 0; }
  const secs = Math.round(visibleMs / 1000);
  if (secs < SITE.minVisitSecs) return;
  visitClosed = true;
  updateDoc(visitRef, { secs }).catch(() => { });
}
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') { if (!visibleSince) visibleSince = now(); visitClosed = false; }
  else closeVisit();
});
addEventListener('pagehide', closeVisit);

async function listActivity(n = 300) {
  if (!user) return [];
  const snap = await getDocs(query(actCol(), orderBy('t', 'desc'), limit(n)));
  const out = []; snap.forEach(d => out.push({ id: d.id, ...d.data() })); return out;
}
async function clearActivity() {
  if (!user) return 0;
  let total = 0;
  for (;;) {
    const snap = await getDocs(query(actCol(), limit(400)));
    if (snap.empty) break;
    const b = writeBatch(db); snap.forEach(d => b.delete(d.ref)); await b.commit(); total += snap.size;
  }
  return total;
}

/* ── certificates ── */
// Call from any page after the reader earns it:
//   SiteProgress.saveCertificate({ course: 'book-review/the-goal', title: 'The Goal — Book Review Quiz', holderName: 'Priya R', score: '9 / 10' })
// Returns the stored certificate (with certId). One certificate per user per course; re-earning updates score and date.
async function saveCertificate(c) {
  if (!c || !c.course || !c.title) throw new Error('saveCertificate needs course and title');
  if (!user) {
    try { sessionStorage.setItem('sp:pendingCert', JSON.stringify(c)); } catch (e) { }
    toast('Sign in to keep this certificate in your account.', 'Sign in', signIn);
    return null;
  }
  const ck = keyOf(String(c.course));
  const ref = doc(db, 'users', user.uid, 'certificates', ck);
  const old = await getDoc(ref);
  const certId = old.exists() ? old.data().certId : `${SITE.certPrefix}-${new Date().getFullYear()}-${randomId()}`;
  const rec = {
    certId,
    uid: user.uid,
    holderName: String(c.holderName || user.displayName || 'Learner').slice(0, 80),
    course: String(c.course).slice(0, 200),
    title: String(c.title).slice(0, 200),
    score: String(c.score ?? '').slice(0, 40),
    path: normPath(c.path || location.pathname),
    issuedAt: serverTimestamp()
  };
  await setDoc(ref, { ...rec, reprint: !!c.reprint });     // reprint: the page can redraw it in its own design (?cert=ID)
  await setDoc(doc(db, 'certificates', certId), rec);      // public record for /verify/
  logEvent('certificate', { certId, score: rec.score, title: rec.title, path: rec.path });
  if (!old.exists()) bumpUser({ certificates: increment(1) });
  toast('Certificate saved to your account.', 'My Certificates', () => (location.href = SITE.dashboard + '#certificates'));
  return { ...rec, reprint: !!c.reprint, issuedAt: new Date() };
}
async function listCertificates() {
  if (!user) return [];
  const snap = await getDocs(certCol());
  const out = []; snap.forEach(d => out.push(d.data()));
  return out.sort((a, b) => (b.issuedAt?.seconds || 0) - (a.issuedAt?.seconds || 0));
}
async function verifyCertificate(certId) {
  if (!configured) return null;
  const s = await getDoc(doc(db, 'certificates', String(certId).trim().toUpperCase()));
  return s.exists() ? s.data() : null;
}
const certDate = c => {
  const d = c.issuedAt?.toDate ? c.issuedAt.toDate() : (c.issuedAt instanceof Date ? c.issuedAt : new Date());
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
};
function certificateHTML(c) {
  const verifyUrl = `https://${SITE.siteName}${SITE.verify}?id=${encodeURIComponent(c.certId)}`;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Certificate ${esc(c.certId)}</title>
<style>
@page{size:A4 landscape;margin:0}
*{box-sizing:border-box}html,body{margin:0;background:#fff}
.page{width:297mm;height:210mm;padding:12mm;font-family:Georgia,'Times New Roman',serif;color:#14213d}
.frame{height:100%;border:3mm double #14213d;padding:14mm 18mm;display:flex;flex-direction:column;align-items:center;text-align:center;position:relative}
.frame:before{content:"";position:absolute;inset:4mm;border:0.6mm solid #c98a1b}
.site{font:600 11pt system-ui,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#c98a1b;margin-top:2mm}
h1{font-size:34pt;margin:7mm 0 2mm;letter-spacing:.04em}
.sub{font-size:13pt;font-style:italic;margin:3mm 0}
.name{font-size:30pt;font-weight:bold;margin:4mm 0 2mm;padding:0 12mm 2mm;border-bottom:0.5mm solid #14213d}
.course{font-size:18pt;font-weight:bold;margin:3mm 0;max-width:220mm}
.score{font:12pt system-ui,Arial,sans-serif;margin-top:2mm}
.foot{margin-top:auto;width:100%;display:flex;justify-content:space-between;align-items:flex-end;font:10pt system-ui,Arial,sans-serif}
.sig{text-align:center;min-width:60mm}.sig .line{border-top:0.4mm solid #14213d;padding-top:1.5mm;margin-top:10mm}
.id{text-align:left;line-height:1.5}.id b{font-family:monospace;font-size:11pt}
</style></head><body><div class="page"><div class="frame">
<div class="site">${esc(SITE.siteName)}</div>
<h1>Certificate of Completion</h1>
<div class="sub">This is to certify that</div>
<div class="name">${esc(c.holderName)}</div>
<div class="sub">has successfully completed</div>
<div class="course">${esc(c.title)}</div>
${c.score ? `<div class="score">Score: ${esc(c.score)}</div>` : ''}
<div class="foot">
 <div class="id">Issued: ${esc(certDate(c))}<br>Certificate ID: <b>${esc(c.certId)}</b><br>Verify: ${esc(verifyUrl)}</div>
 <div class="sig"><div class="line">${esc(SITE.issuer)}</div></div>
</div></div></div></body></html>`;
}
/* opens the browser's print dialog → "Save as PDF" */
function printCertificate(c) {
  const f = document.createElement('iframe');
  f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0';
  document.body.appendChild(f);
  const d = f.contentWindow.document; d.open(); d.write(certificateHTML(c)); d.close();
  setTimeout(() => { f.contentWindow.focus(); f.contentWindow.print(); setTimeout(() => f.remove(), 60e3); }, 300);
}

/* ───────────── 5. PAGE UI ───────────── */

const CSS = `
.sp-chip{position:fixed;z-index:2147483000;display:flex;align-items:center;gap:6px;font:500 13px/1 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif}
.sp-btn{cursor:pointer;border:1px solid #1f5fbf;background:#fff;color:#1f5fbf;border-radius:999px;padding:7px 12px;font:inherit;box-shadow:0 1px 3px rgba(0,0,0,.15)}
.sp-btn:hover{background:#eef4ff}.sp-btn.solid{background:#1f5fbf;color:#fff}.sp-btn.solid:hover{background:#174a96}
.sp-av{width:30px;height:30px;border-radius:50%;cursor:pointer;border:2px solid #1f5fbf;background:#1f5fbf;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;overflow:hidden}
.sp-av img{width:100%;height:100%;object-fit:cover}
.sp-menu{position:absolute;top:38px;right:0;min-width:220px;background:#fff;color:#222;border:1px solid #ccd;border-radius:10px;box-shadow:0 6px 24px rgba(0,0,0,.18);padding:6px;display:none}
.sp-menu.open{display:block}.sp-menu .who{padding:8px 10px;font-size:12px;color:#555;border-bottom:1px solid #eee;margin-bottom:4px;line-height:1.4}
.sp-menu a,.sp-menu button{display:block;width:100%;text-align:left;padding:8px 10px;border:0;background:none;color:#222;font:inherit;border-radius:6px;cursor:pointer;text-decoration:none}
.sp-menu a:hover,.sp-menu button:hover{background:#eef4ff}
.sp-resume{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(80px + env(safe-area-inset-bottom,0px));z-index:2147483000;background:#14213d;color:#fff;border-radius:12px;padding:10px 12px 10px 16px;display:flex;gap:10px;align-items:center;font:14px system-ui,Arial,sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.3);max-width:92vw}
.sp-resume{width:max-content;max-width:min(560px,92vw)}.sp-resume span{flex:1;min-width:150px}.sp-resume .sp-btn{border-color:#fff}.sp-resume .x{background:none;border:0;color:#fff;font-size:18px;cursor:pointer;padding:0 4px}
.sp-done-wrap{margin:32px 0 16px;padding:16px;border:1px dashed #9aa7c0;border-radius:12px;text-align:center;font:15px system-ui,Arial,sans-serif}
.sp-done{cursor:pointer;border:2px solid #1f5fbf;background:#fff;color:#1f5fbf;border-radius:999px;padding:10px 20px;font:600 15px system-ui,Arial,sans-serif}
.sp-done.is-done{background:#1f5fbf;color:#fff}
.sp-done-note{display:block;margin-top:8px;font-size:12px;color:#667}
.sp-badge{display:inline-flex;align-items:center;justify-content:center;margin-left:6px;font:700 11px/1 system-ui,Arial,sans-serif;border-radius:999px;padding:3px 7px;vertical-align:middle;white-space:nowrap}
.sp-badge.in-card{position:absolute;top:8px;right:8px;margin:0;font-size:13px;padding:5px 9px;box-shadow:0 1px 4px rgba(0,0,0,.3);z-index:2}
.sp-chip.in-nav{position:static;margin-left:auto;z-index:auto}
.sp-badge.done{background:#1f5fbf;color:#fff}
.sp-badge.prog{background:#fff3e0;color:#9a4a00;border:1px solid #e08a00}
.sp-count{font:600 14px system-ui,Arial,sans-serif;color:#1f5fbf}
.sp-continue a{font-weight:600}
.sp-toast{position:fixed;left:50%;transform:translateX(-50%);top:18px;z-index:2147483001;background:#14213d;color:#fff;border-radius:10px;padding:10px 14px;font:14px system-ui,Arial,sans-serif;display:flex;gap:10px;align-items:center;box-shadow:0 6px 24px rgba(0,0,0,.3);max-width:92vw}
.sp-toast .sp-btn{border-color:#fff;padding:5px 10px}
html[data-mode=dark] .sp-btn,html[data-mode=dark] .sp-done:not(.is-done){background:#1b1f27;color:#8fb8ff;border-color:#8fb8ff}
html[data-mode=dark] .sp-menu{background:#1b1f27;color:#ddd;border-color:#333}
html[data-mode=dark] .sp-menu a,html[data-mode=dark] .sp-menu button{color:#ddd}
html[data-mode=dark] .sp-menu a:hover,html[data-mode=dark] .sp-menu button:hover{background:#26324a}
html[data-mode=dark] .sp-count{color:#8fb8ff}
@media print{.sp-chip,.sp-resume,.sp-toast,.sp-done-wrap{display:none!important}}
`;
function injectCSS() { if ($('#sp-css')) return; const s = document.createElement('style'); s.id = 'sp-css'; s.textContent = CSS; document.head.appendChild(s); }

let toastTimer;
function toast(msg, actLabel, act) {
  $('.sp-toast')?.remove(); clearTimeout(toastTimer);
  const t = document.createElement('div'); t.className = 'sp-toast'; t.setAttribute('role', 'status');
  t.innerHTML = `<span>${esc(msg)}</span>`;
  if (actLabel) { const b = document.createElement('button'); b.className = 'sp-btn'; b.textContent = actLabel; b.onclick = () => { t.remove(); act(); }; t.appendChild(b); }
  document.body.appendChild(t); toastTimer = setTimeout(() => t.remove(), 7000);
}

/* the page's own top toolbar: the row holding a "Full screen" / "Theme" / "Contents" button near the top */
function pageToolbar() {
  const btn = $$('button, a').find(b => {
    if (b.closest('.sp-chip')) return false;
    const t = (b.textContent || '').trim();
    if (!/full\s*screen|theme$|contents$|reading width/i.test(t)) return false;
    const r = b.getBoundingClientRect();
    return r.top >= 0 && r.top < 160 && r.height > 0;
  });
  return btn ? btn.parentElement : null;
}
/* a page that already has its own "Mark ... complete" button (courses) */
function ownDoneButton() {
  return $$('button').find(b => !b.closest('#sp-complete') &&
    /mark\b.*\bcomplete|completed\s*.?\s*click to undo|mark as done/i.test(b.textContent || ''));
}

/* account chip */
function renderChip() {
  let host = $('#sp-account-box');
  if (!host) {
    host = document.createElement('div'); host.id = 'sp-account-box'; host.className = 'sp-chip';
    const parent = SITE.chipHosts.map(s => $(s)).find(Boolean) || pageToolbar();
    if (parent) { host.classList.add('in-nav'); host.style.position = 'relative'; parent.appendChild(host); }
    else { Object.assign(host.style, SITE.chip); document.body.appendChild(host); }
  }
  if (!user) {
    host.innerHTML = `<button class="sp-btn solid" type="button" title="Sign in to save your progress and certificates">Sign in</button>`;
    host.firstChild.onclick = signIn; return;
  }
  const initial = (user.displayName || user.email || '?').trim()[0].toUpperCase();
  host.innerHTML = `<div class="sp-av" tabindex="0" title="${esc(user.displayName || user.email)}">${user.photoURL ? `<img src="${esc(user.photoURL)}" alt="" referrerpolicy="no-referrer">` : esc(initial)}</div>
  <div class="sp-menu" role="menu"><div class="who"><b>${esc(user.displayName || '')}</b><br>${esc(user.email || '')}</div>
  <a href="${SITE.dashboard}">My Progress</a><a href="${SITE.dashboard}#certificates">My Certificates</a>${SITE.adminUids.includes(user.uid) ? `<a href="${SITE.admin}">Admin</a>` : ''}<button type="button" data-out>Sign out</button></div>`;
  const av = $('.sp-av', host), menu = $('.sp-menu', host);
  const toggle = e => { e.stopPropagation(); menu.classList.toggle('open'); };
  av.onclick = toggle; av.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') toggle(e); };
  $('[data-out]', host).onclick = signOut;
  document.addEventListener('click', () => menu.classList.remove('open'));
}

/* tracked page: resume bar + scroll saving + Mark as completed */
let lastSaved = 0, lastPct = -1, saveTimer = null, pageSetUp = false;
function pageIsTracked() { const p = normPath(location.pathname); return !!seriesOf(p) && !isSeriesRoot(p) && meta('sp-track') !== 'off'; }

async function setupTrackedPage() {
  if (!pageIsTracked()) return;
  const prog = await getProgress();
  // resume bar (once per page view)
  if (!pageSetUp && prog && prog.status !== 'completed' && !location.hash) {
    const canScroll = (prog.scrollPct || 0) >= SITE.resumeMinPct && pctScrolled() < prog.scrollPct - 3;
    if (canScroll || prog.step != null) {
      const bar = document.createElement('div'); bar.className = 'sp-resume';
      const what = prog.step != null ? (prog.stepLabel || `step ${prog.step}`) : `${prog.scrollPct}% read`;
      bar.innerHTML = `<span>Continue where you left off — ${esc(what)}</span><button class="sp-btn solid" type="button">Resume</button><button class="x" type="button" aria-label="Dismiss">×</button>`;
      $('.sp-btn', bar).onclick = () => {
        bar.remove();
        if (prog.step != null) window.dispatchEvent(new CustomEvent('sp:resume', { detail: prog }));
        else { const h = document.documentElement.scrollHeight - innerHeight; scrollTo({ top: h * prog.scrollPct / 100, behavior: 'smooth' }); }
      };
      $('.x', bar).onclick = () => bar.remove();
      // reader got there on their own → bar no longer needed
      if (prog.step == null) {
        const passed = () => { if (pctScrolled() >= prog.scrollPct - 2) { bar.remove(); removeEventListener('scroll', passed); } };
        addEventListener('scroll', passed, { passive: true });
      }
      document.body.appendChild(bar);
      setTimeout(() => bar.remove(), 20000);
    }
  }
  renderDoneButton(prog);
  if (!pageSetUp) {
    pageSetUp = true;
    addEventListener('scroll', () => { if (!saveTimer) saveTimer = setTimeout(flushScroll, 1500); }, { passive: true });
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flushScroll(true); });
    addEventListener('pagehide', () => flushScroll(true));
  }
}
async function flushScroll(force = false) {
  clearTimeout(saveTimer); saveTimer = null;
  const pct = pctScrolled();
  if (pct === lastPct || pct < 2) return;
  if (!force && now() - lastSaved < SITE.saveEveryMs) { saveTimer = setTimeout(flushScroll, SITE.saveEveryMs); return; }
  lastSaved = now(); lastPct = pct;
  const cur = await getProgress();
  if (cur?.status === 'completed') return;          // finished pages don't need scroll saves
  saveProgress({ scrollPct: Math.max(pct, 0), status: 'in-progress' }).catch(e => console.warn('[site-progress]', e));
}

let ownHooked = false;
function renderDoneButton(prog) {
  if (meta('sp-done-button') === 'off') return;
  const own = ownDoneButton();
  if (own) {            // keep the page's own button; mirror its state into the account
    if (!ownHooked) {
      ownHooked = true;
      own.addEventListener('click', () => setTimeout(() => {
        const done = /completed|undo|✓/i.test(own.textContent || '') || own.getAttribute('aria-pressed') === 'true';
        (done ? markComplete() : markIncomplete()).catch(() => { });
      }, 80));
    }
    return;
  }
  let wrap = $('#sp-complete');
  if (!wrap) {
    wrap = document.createElement('div'); wrap.id = 'sp-complete';
    const host = $('article') || $('main') || document.body;
    host.appendChild(wrap);
  }
  wrap.className = 'sp-done-wrap';
  const done = prog?.status === 'completed';
  const when = done && prog.completedAt ? new Date(prog.completedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
  wrap.innerHTML = `<button type="button" class="sp-done ${done ? 'is-done' : ''}" aria-pressed="${done}">${done ? '✓ Completed' : 'Mark as completed'}</button>
  <span class="sp-done-note">${done ? `Completed on ${esc(when)} · click to undo` : (user ? 'Saved to your account' : 'Saved in this browser only — sign in to keep it on every device')}</span>`;
  $('.sp-done', wrap).onclick = async () => {
    $('.sp-resume')?.remove();
    const p = done ? await markIncomplete() : await markComplete();
    renderDoneButton(p);
  };
}

/* index pages: ✓ / % badges beside links, counts, continue link */
async function decorateIndexes() {
  const here = normPath(location.pathname);
  let boxes = $$('[data-sp-index]');
  if (!boxes.length && isSeriesRoot(here)) boxes = [$('article') || $('main') || document.body];
  const counters = $$('[data-sp-count]'), cont = $$('[data-sp-continue]');
  if (!boxes.length && !counters.length && !cont.length) return;
  const all = await loadAllProgress();
  const totals = {};
  boxes.forEach(box => {
    $$('.sp-badge', box).forEach(b => b.remove());
    const seen = new Set();
    $$('a[href]', box).forEach(a => {
      const u = new URL(a.getAttribute('href'), location.href);
      if (u.origin !== location.origin) return;
      const p = normPath(u.pathname), s = seriesOf(p);
      if (!s || isSeriesRoot(p) || p === here) return;
      if (!seen.has(p)) { seen.add(p); totals[s] = (totals[s] || 0) + 1; }
      const pr = all[keyOf(p)]; if (!pr) return;
      const b = document.createElement('span');
      if (pr.status === 'completed') { b.className = 'sp-badge done'; b.textContent = '✓'; b.title = 'Completed'; }
      else { b.className = 'sp-badge prog'; b.textContent = pr.step != null ? (pr.stepLabel || 'in progress') : `${pr.scrollPct || 0}%`; b.title = 'In progress'; }
      if (a.querySelector('svg,img,div,span')) {        // a cover card: badge goes inside, top-right
        b.classList.add('in-card');
        if (getComputedStyle(a).position === 'static') a.style.position = 'relative';
        a.appendChild(b);
      } else a.after(b);
    });
  });
  counters.forEach(el => {
    const s = el.getAttribute('data-sp-count');
    const total = +el.getAttribute('data-sp-total') || totals[s] || 0;
    const done = Object.values(all).filter(p => p.series === s && p.status === 'completed').length;
    el.classList.add('sp-count');
    el.textContent = total ? `${done} / ${total} completed` : `${done} completed`;
  });
  cont.forEach(el => {
    const s = el.getAttribute('data-sp-continue');
    const last = Object.values(all).filter(p => p.status !== 'completed' && (!s || p.series === s)).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))[0];
    el.classList.add('sp-continue');
    el.innerHTML = last ? `Continue reading: <a href="${esc(last.path)}">${esc(last.title || last.path)}</a>` : '';
  });
}

/* ───────────── 6. START ───────────── */

async function refreshAll() { renderChip(); await setupTrackedPage(); await decorateIndexes(); }

function start() {
  injectCSS();
  renderChip();
  if (!configured) { userKnown = true; readyResolve(null); refreshAll(); return; }
  onAuthStateChanged(auth, async u => {
    user = u; cache = null;
    try {
      if (u) {
        const fk = 'sp:seen:' + u.uid;
        let seen = false; try { seen = !!sessionStorage.getItem(fk); } catch (e) { }
        if (!seen) {
          const ud = await getDoc(userRef()).catch(() => null);
          await setDoc(userRef(), { name: u.displayName || '', email: u.email || '', photo: u.photoURL || '', lastSeen: serverTimestamp(),
            ...(ud && ud.exists() && ud.data().firstSeen ? {} : { firstSeen: serverTimestamp() }) }, { merge: true }).catch(() => { });
          try { sessionStorage.setItem(fk, '1'); } catch (e) { }
        }
        logVisit();
        await mergeLocalIntoCloud();
        const pending = sessionStorage.getItem('sp:pendingCert');
        if (pending) { sessionStorage.removeItem('sp:pendingCert'); await saveCertificate(JSON.parse(pending)); }
      }
      await refreshAll();
    } catch (e) { console.error('[site-progress]', e); }
    userKnown = true; readyResolve(user); emit();
  });
}

const SiteProgress = {
  version: SP_VERSION, ready, onUser, get user() { return user; }, signIn, signOut,
  getProgress, loadAllProgress, saveProgress, markComplete, markIncomplete, saveStep, resetProgress,
  saveCertificate, listCertificates, verifyCertificate, certificateHTML, printCertificate, certDate,
  logEvent, listActivity, clearActivity,
  normPath, keyOf, seriesOf, SITE, refresh: refreshAll
};
window.SiteProgress = SiteProgress;
window.dispatchEvent(new Event('sp:loaded'));   // classic (non-module) page scripts can wait for this
export default SiteProgress;

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
