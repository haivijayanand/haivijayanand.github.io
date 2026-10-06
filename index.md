---
# TOOL: index.md | FAMILY: SITE | VERSION: 2.1.0 | DATE: 2026-10-06
# CHAT: Offline HTML inventory and online links
# CHANGES: 2.1.0 - Zen Series card added; 2.0.0 - home page is now a short guide to the four sections (Speaks, Tools, Book Review, Engineering Articles); article list moved to /engineering/
layout: default
title: Home
---

<style>
.hm-intro{font-size:1.05rem;line-height:1.7;margin:0 0 22px}
.hm-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;margin:0 0 28px}
.hm-card{display:block;border:1px solid var(--c);border-left:5px solid var(--c);border-radius:8px;padding:14px 18px;
  background:color-mix(in srgb,var(--c) 7%,transparent);text-decoration:none!important;color:inherit!important;transition:transform .12s}
.hm-card:hover{transform:translateY(-2px)}
.hm-card b{display:block;font-size:1.15rem;color:var(--c);margin-bottom:4px}
.hm-card span{display:block;line-height:1.6}
.hm-card small{display:block;margin-top:8px;opacity:.75}
</style>

<p class="hm-intro">Welcome. This site collects my writing and the small browser tools I build: essays on life and work,
interactive engineering and learning tools, daily book reviews, short Zen stories and longer engineering articles. Pick a section below.</p>

<div class="hm-grid">
  <a class="hm-card" href="/speaks/" style="--c:#2c6a9e">
    <b>Vijay Anand Speaks →</b>
    <span>Short essays on life, family, relationships, work and leadership, in English and Tamil, written since 2009 and moved here from Blogger.</span>
    <small>200+ essays · 2009 to now</small>
  </a>
  <a class="hm-card" href="/tools/" style="--c:#1f6f5c">
    <b>Tools →</b>
    <span>Interactive pages that run in your browser and work offline: spring rate, PSD and bearing calculators, rotor balancing, business sim games, Class 8 Maths, Science and Social Science, piano, Sudoku, AstroExplorer and more.</span>
    <small>Engineering · School education · Games · Astrology</small>
  </a>
  <a class="hm-card" href="/book-review/" style="--c:#b5591b">
    <b>Book Review →</b>
    <span>One famous management book a day: a 300-word summary, the key ideas, and ten questions to test yourself, with a certificate at the end.</span>
    <small>New review every day</small>
  </a>
  <a class="hm-card" href="/zen-series/" style="--c:#9b3b2a">
    <b>Zen Series →</b>
    <span>Small stories, still minds: a short Zen tale each time, with a reflection and a thought to carry into the day.</span>
    <small>New stories added as they are written</small>
  </a>
  <a class="hm-card" href="/engineering/" style="--c:#6b4fa3">
    <b>Engineering Articles →</b>
    <span>Longer technical write-ups with worked analysis and plots: mechanical design, materials, orbital mechanics and Python visualisation.</span>
    <small>{{ site.posts | size }} articles so far</small>
  </a>
</div>
