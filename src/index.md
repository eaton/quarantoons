---
layout: "base"
permalink: "/"
---
## A little old place where we can get together

{% for item in collections.weeks  %}
  - [March {{ item.date | ofMarch | ordinal }}</a>: {{ item.data.title or item.data.fallbackTitle }}{% if item.data.curator %}, by {{ item.data.curator }}{% endif %}]({{ item.url }})
{%- endfor -%}
