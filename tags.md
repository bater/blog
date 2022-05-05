---
layout: default
title: tags
permalink: /tags/
---
<div class="tags-expo">
  <div class="tags-expo-list">
    {% for tag in site.tags %}
    <a href="#{{ tag[0] | slugify }}" class="post-tag">{{ tag[0] }}</a>
    {% endfor %}
  </div>
  <br/>
  <div class="tags-expo-section">
    {% for tag in site.tags %}
    <h2 id="{{ tag[0] | slugify }}">{{ tag[0] }}</h2>
    <ul class="tags-expo-posts">
      {% for post in tag[1] %}
        <a href="{{ site.baseurl }}{{ post.url }}">
      <li>
        {{ post.title }}
      </li>
      </a>
      {% endfor %}
    </ul>
    {% endfor %}
  </div>
</div>
