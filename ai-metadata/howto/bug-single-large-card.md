# Bug: 多个练习卡片被包在同一个大卡片里

## 现象
lesson-css.html 页面上，所有 playground 练习（CSS-02 到 CSS-08）显示为一个超长的单卡片，而不是独立的多张卡片。

## 根本原因
`<section class="html2-body-section">` 内部只有一个 `step-card`，而所有 6 个 `playground-section` 都嵌套在这个 `step-card-body` 里面：

```html
<!-- 错误结构 -->
<section class="html2-body-section" id="pg-font">
  <div class="wrap">
    <div class="step-card">           ← 一张卡片包住了所有内容
      <div class="step-card-body">
        <section class="lesson-section playground-section" id="pg-font">...</section>
        <section class="lesson-section playground-section" id="pg-padding">...</section>
        <section class="lesson-section playground-section" id="pg-flex">...</section>
        <!-- ... 其他练习 -->
      </div>
    </div>
  </div>
</section>
```

## 正确结构
每个练习应有自己独立的 `html2-body-section` + `step-card`：

```html
<section class="html2-body-section" id="pg-font">
  <div class="wrap">
    <div class="step-card">
      <div class="step-card-head">...</div>
      <div class="step-card-body">
        <!-- 只有这一个练习的内容 -->
      </div>
    </div>
  </div>
</section>

<section class="html2-body-section" id="pg-padding">
  <div class="wrap">
    <div class="step-card">
      ...
    </div>
  </div>
</section>
```

## 参考文件
- `src/howto/components/frontend/legacy-content/lesson-css.html` — 修复后的文件
- `src/howto/components/frontend/legacy-content/lesson-html.html` — 正确多卡片结构的参考
