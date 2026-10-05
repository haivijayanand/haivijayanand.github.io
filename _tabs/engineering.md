---
# TOOL: _tabs/engineering.md | FAMILY: SITE | VERSION: 1.0.0 | DATE: 2026-10-05
# CHAT: Offline HTML inventory and online links
# CHANGES: 1.0.0 - Engineering Articles page listing every post, moved off the home page
layout: page
title: Engineering Articles
icon: fas fa-cogs
order: 4
permalink: /engineering/
---

Longer technical write-ups with worked analysis, plots and code. Newest first.

{% for post in site.posts %}
<article style="margin:0 0 26px">
  <h3 style="margin:0 0 4px"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
  <small style="opacity:.75">{{ post.date | date: "%d %b %Y" }}{% if post.tags.size > 0 %} · {{ post.tags | join: ", " }}{% endif %}</small>
  <p style="margin:6px 0 0">{% if post.description %}{{ post.description }}{% else %}{{ post.excerpt | strip_html | truncatewords: 40 }}{% endif %}</p>
</article>
{% endfor %}
