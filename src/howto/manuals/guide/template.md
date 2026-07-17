---
title: "{{TITLE}}"
summary: "用一句话说明读者会学到什么。"
purpose: "说明这个页面场景解决的问题，以及它在整份手册中的位置。"
label: "GUIDE · 01"
order: 100
language: "html"
html: |
  <section class="example-section">
    <h1 class="example-title">{{TITLE}}</h1>
    <p class="example-summary">一句话说明读者会学到什么。</p>
  </section>
css: |
  .example-section {
    padding: 2rem;
  }

  .example-title {
    font-family: var(--font-display);
  }
---

# 写作备注

- 保持 `title`、`summary` 与 `html` 示例中的文字一致。
- 一篇组件文档只解释一个真实页面场景。
- `html` 和 `css` 会自动渲染为带行号、复制按钮和语法高亮的代码块。
- `order` 决定组件地图和上下张切换的顺序。
