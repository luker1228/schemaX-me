# Bug: Astro 子组件里的代码展示退化成普通文字

## 现象
`/howto/guide/article-content` 的 HTML + CSS 组合展示中，Tab、代码容器和「复制 HTML + CSS」按钮变成连续普通文字：

```text
HTML CSS
<article class="lesson-article-preview-card">...
复制 HTML + CSS
```

预览卡片本身样式正常，只有新加入的 `HtmlCssTabs.astro` 内部 UI 没有边框、背景、Tab 状态或按钮布局。

## 根本原因
Astro 的组件 `<style>` 默认带作用域。页面文件 `src/pages/howto/guide/[slug].astro` 里的样式只会匹配该页面模板直接输出的节点，不会自动穿透到 `HtmlCssTabs.astro` 这个子组件内部。

因此，即使页面中写了：

```css
.guide-code-tabs { overflow: hidden; }
.guide-code-tablist { display: flex; }
.guide-code-combined-copy { display: flex; }
```

子组件渲染的同名 class 也不会获得这些规则，浏览器便以默认的块级/行内排版显示它们。

## 诊断方法

1. 页面结构与 class 正常出现在 DOM 中，但 UI 像未加样式的文本。
2. 浏览器检查计算样式：`.guide-code-tablist` 的 `display` 不是预期的 `flex`，代码区没有预期背景色和边框。
3. 对比样式定义位置与元素来源：样式在父页面，元素在独立 `.astro` 子组件，即可确认是作用域隔离问题。

## 修复方法

将这个 UI 所需的样式放进组件自身，让 Astro 为对应节点生成同一作用域标记：

```astro
<!-- src/howto/components/shared/HtmlCssTabs.astro -->
<div class="guide-code-tabs">...</div>

<style>
  .guide-code-tabs { overflow: hidden; border: 0; }
  .guide-code-tablist { display: flex; }
  .guide-code { background: #f0e7d6; }
  .guide-code-combined-copy { display: flex; }
</style>
```

如果规则确实应被多个不同组件共享，可改放在全局样式（例如 `src/howto/styles.css`）并谨慎使用稳定、专属的 class 命名；不要依赖父页面的 scoped CSS 覆盖子组件内部实现。

## 预防措施

- 新建 `.astro` 组件时，组件内部不可缺少的布局/交互样式优先与组件共置。
- 组件拆分后立刻在浏览器检查，而不只看源码或构建结果。
- 若要由页面控制子组件外观，使用 CSS variables、明确的 props/class API，或有意使用全局样式，不要假定 scoped selector 会跨组件生效。

## 参考文件

- `src/howto/components/shared/HtmlCssTabs.astro` — 修复后的组件与局部样式
- `src/pages/howto/guide/[slug].astro` — 组合展示的调用方
- `src/howto/styles.css` — 跨页面共享的手册样式
