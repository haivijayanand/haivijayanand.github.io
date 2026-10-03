---
layout: default
title: Home
---

<div style="border:1px solid #1f6f5c;border-left:5px solid #1f6f5c;border-radius:8px;padding:14px 18px;margin:0 0 24px;background:rgba(31,111,92,.06)">
  <strong><a href="/tools/">Tools →</a></strong><br>
  Interactive engineering, music and astrology tools that run in your browser: spring rate calculator, PSD Explorer,
  bearing frequencies, rotor balancing, piano, Sudoku, AstroExplorer and more.
</div>

<div style="border:1px solid #7a3b1f;border-left:5px solid #7a3b1f;border-radius:8px;padding:14px 18px;margin:0 0 24px;background:rgba(122,59,31,.06)">
  <strong><a href="/book-review/">Book Review →</a></strong><br>
  One famous management book a day: a 300-word summary and ten questions to test yourself.
</div>

{% for post in site.posts %}
<article>
  <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
  <p>{{ post.date | date: "%B %d, %Y" }} · {{ post.description }}</p>
</article>
{% endfor %}
