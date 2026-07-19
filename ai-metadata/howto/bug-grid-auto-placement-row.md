# Bug: 三栏目录的左右 rail 掉到正文底部

## 现象
`/howto/guide/article-content` 的三栏布局（左导航目录 / 中正文 / 右页内目录）里，两根侧栏没有和正文并排在顶部，而是被推到**正文下方的左右两侧**，看起来像「内容流末尾的两块」：

```text
┌─────────────────────────────┐
│         正文（很高）          │
└─────────────────────────────┘
┌──────┐                ┌──────┐
│ 左栏  │                │ 右栏  │   ← rail 掉到了这里
└──────┘                └──────┘
```

DOM 结构正确（两根 `<aside>` 是 `<main>` 的直接子项，在 `.guide-article-content` 之后），grid 的列模板和 `grid-column` 也都写对了，但视觉上 rail 始终不在正文同行的两侧。

## 根本原因
CSS Grid 的**自动放置（auto-placement）按 DOM 顺序逐个填格子**，且在「sparse」默认行为下不会回填更早的空位。

布局里三个直接子项只有显式的 `grid-column`、没有显式的 `grid-row`：

```css
main.guide-article-layout {
  display: grid;
  grid-template-columns: 12rem 1fr 12rem;   /* 三列 */
}

main.guide-article-layout > .guide-article-content   { grid-column: 2; }   /* 没写 grid-row */
main.guide-article-layout > .guide-article-nav-rail  { grid-column: 1; }   /* 没写 grid-row */
main.guide-article-layout > .guide-article-toc-rail  { grid-column: 3; }   /* 没写 grid-row */
```

DOM 顺序是 `content` → `nav-rail` → `toc-rail`。auto-placement 从第一个元素开始按行往后找位置：

1. `content` → 第 1 行第 2 列（第 2 列被它占住）。
2. `nav-rail`（`grid-column:1`）→ auto-placement 的游标**已经越过第 1 行**，默认 sparse 模式不会再回到第 1 行第 1 列这个空位，于是把它放进**第 2 行第 1 列**。
3. `toc-rail`（`grid-column:3`）→ 同理落到第 2 行（或第 3 行）第 3 列。

结果：content 独占第 1 行，两根 rail 被推到后续行的两侧，视觉上就是「正文下方的左右两边」。

> 注：`grid-row` 不写时，auto-placement 只保证「能放下」，不保证「和已放置元素同处一行」。显式 `grid-column` 锁住的是列，不是行。

## 诊断方法

1. **先确认 DOM 层级**：两根 `<aside>` 必须是 grid 容器（`<main>`）的**直接子项**，不能嵌在 `.guide-article-content` 里（嵌进去就完全退出 grid，会变成普通流内块，排在正文最末）。用 `curl` 抓页面或浏览器 Elements 面板核对 `<aside>` 前是否紧跟 `.guide-article-content` 的闭合 `</div>`。
2. **确认 grid 规则真的在服务出来的 CSS 里**（dev 模式下 Astro/Tailwind 可能包 layer、可能缓存）。`curl <css-url>` 后 `grep` 选择器，确认 `display: grid` 与 `grid-template-columns` 存在且没被 `@media` 折成单列。
3. **决定性实验**：给 rail 加 `grid-row: 1`。如果加了之后 rail 立刻跳到正文同行的两侧，就是 auto-placement 行分配问题；如果纹丝不动，则是 DOM 层级或选择器没命中（回到第 1、2 步）。
4. 临时给容器加 `outline`、给 rail 加半透明背景，能快速区分「grid 没生效（rail 完全在文档流末尾堆叠）」和「grid 生效但行错了（rail 在后续行的两侧）」两种不同现象。

## 修复方法

给所有参与同一行的 grid 子项**显式指定 `grid-row`**，不再依赖 auto-placement 的行分配：

```css
main.guide-article-layout {
  display: grid;
  grid-template-columns: minmax(0, 12rem) minmax(0, 1fr) minmax(0, 12rem);
  align-items: start;
  column-gap: clamp(1.25rem, 2.5vw, 2.5rem);
}

main.guide-article-layout > .guide-article-content  { grid-column: 2; grid-row: 1; }
main.guide-article-layout > .guide-article-nav-rail { grid-column: 1; grid-row: 1; }
main.guide-article-layout > .guide-article-toc-rail { grid-column: 3; grid-row: 1; }
```

三者都被钉在第 1 行，auto-placement 不再有自由度把它们推到新行。`position: sticky` + `align-self: start` 继续负责让 rail 在滚动时贴视口顶部。

## 预防措施

- **三栏/多栏布局里，只要子项用显式 `grid-column` 定位，就同时写 `grid-row`**，不要把行的分配交给 auto-placement。auto-placement 适合「让网格自己排」，一旦你手动指定了列，就应该把行也指定，避免两者语义打架。
- 设计时先想清楚 DOM 顺序与希望的视觉顺序是否一致。本例中 `content` 在 DOM 最前、rail 在后，是触发 sparse auto-placement 不回填的典型组合；即便不改 DOM 顺序，显式 `grid-row` 也能修正。
- Tailwind v4 + Astro dev 下，裸写的 CSS 规则不在任何 `@layer` 内，诊断时优先用 `curl` 取服务端真实 CSS 核对规则是否被保留、是否在预期的层，而不是只看源文件。
- 诊断样式（`outline` / 半透明背景 / `!important`）用完立即清掉，别留在仓库里。

## 参考文件

- `src/howto/styles.css` — `main.guide-article-layout` 三栏 grid 定义与 `grid-row` 修复
- `src/pages/howto/guide/[slug].astro` — `<main class="guide-article-layout">` 容器与两根 `<aside>` rail 的渲染
