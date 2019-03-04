---
to: src/components/<%= type %>s/<%= slug %>/<%= slug %>.twig
---
{#
 # <%= h.capitalize(slug) %> <%= type %>
 #
 # @param {string} <argumentName> <description>
 # @extends @atom
 #}
{%- if attrs is not defined -%}
  {%- set attrs = {} -%}
{%- endif -%}
{%- if attrs is not defined -%}
  {%- set attrs = {} -%}
{%- endif -%}
{%- if attrs is not defined -%}
  {%- set attrs = {} -%}
{%- endif -%}

{% set config = {} %}

{% for prop in ['attrs', 'data', 'classList', 'modifiers']  %}
  {% set config = config | merge({(prop): _context[prop] }) %}
{% endfor %}

{% embed '@atom' with config | merge({
    baseClass: '<%= slug %>',
    el: (el is defined) ? el : 'div',
    id: (id is defined) ? id,
    content: null,
  }) %}
  {% block content %}

  {% endblock %}
{% endembed %}

{# {% embed '@atom' with {
    baseClass: '<%= slug %>',
    el: 'div',
    id: (id is defined) ? id,
    data: {},
    classList: [],
    modifiers: [],
    attrs: {},
    content: null,
  } %} #}
