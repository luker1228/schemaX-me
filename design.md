# Luke Lab Design System

> Luke Lab 是一个个人技术实验室：收集技术写作、前端教学和可运行 Demo。视觉方向参考复古开发者工具站点：黑色背景、硬边框、彩色强调色、终端感、像素感、作品陈列感。

---

## 1. 设计关键词

```txt
Retro Developer / Indie Hacker / Personal Lab / Engineering Playground
```

Luke Lab 不需要像传统 SaaS 官网那样干净、圆润、商业化，而应该更像一个“工程师的实验室”。整体气质是：

- 黑底高对比
- 复古像素感
- 无圆角或极小圆角
- 终端 / Dashboard / Code Window 氛围
- 彩色标签与错位阴影
- 作品集陈列，而不是产品营销页

---

## 2. 配色解读

参考图的核心配色不是“多彩”，而是：

> 大面积黑灰背景 + 米白文字 + 少量高饱和彩色强调。

这种配色的好处是：

1. 黑色背景让页面有开发者工具感。
2. 米白文字比纯白更复古，也更柔和。
3. 彩色强调色用于标签、按钮、边框、阴影和分类识别。
4. 每个模块只使用一种强调色，避免页面变花。

---

## 3. 色彩 Token

### 3.1 基础色

| Token | Hex | 用途 |
|---|---:|---|
| `--bg` | `#171717` | 页面主背景 |
| `--bg-deep` | `#0f0f0f` | 更深的区块背景、Footer |
| `--panel` | `#111111` | 卡片、代码窗口、内容面板 |
| `--panel-2` | `#1d1d1d` | 次级面板、hover 背景 |
| `--border` | `#333333` | 边框、分割线 |
| `--border-soft` | `#262626` | 弱边框 |

### 3.2 文字色

| Token | Hex | 用途 |
|---|---:|---|
| `--text` | `#f6ead6` | 主标题、正文高亮文字 |
| `--text-strong` | `#fffaf0` | 特别强调文字 |
| `--muted` | `#9c9384` | 副标题、说明文字 |
| `--muted-2` | `#6f6a60` | 时间、辅助信息、脚注 |

### 3.3 强调色

| Token | Hex | 用途 |
|---|---:|---|
| `--yellow` | `#ffd43b` | 主按钮、技术博客、重点 CTA |
| `--cyan` | `#00d4ff` | 前端教学、链接、科技感强调 |
| `--green` | `#00d26a` | Demo、成功状态、运行中状态 |
| `--purple` | `#b678ff` | AI、实验性内容、特殊模块 |
| `--red` | `#ff4d4d` | 警示、错误、强调标签 |
| `--orange` | `#e5a425` | 次级强调、步骤编号 |
| `--blue` | `#1ab2de` | 信息提示、数据图表 |

---

## 4. 推荐 CSS 变量

```css
:root {
  color-scheme: dark;

  --bg: #171717;
  --bg-deep: #0f0f0f;
  --panel: #111111;
  --panel-2: #1d1d1d;

  --text: #f6ead6;
  --text-strong: #fffaf0;
  --muted: #9c9384;
  --muted-2: #6f6a60;

  --border: #333333;
  --border-soft: #262626;

  --yellow: #ffd43b;
  --cyan: #00d4ff;
  --green: #00d26a;
  --purple: #b678ff;
  --red: #ff4d4d;
  --orange: #e5a425;
  --blue: #1ab2de;

  --shadow-size: 6px;
  --radius: 0px;
}
```

---

## 5. 色彩使用规则

### 5.1 页面背景

页面主体使用 `--bg`，不要使用纯黑 `#000000`。

```css
body {
  background: var(--bg);
  color: var(--text);
}
```

原因：纯黑容易显得廉价和刺眼，`#171717` 更接近参考图中的暗灰背景。

---

### 5.2 卡片背景

卡片、代码窗口、展示面板使用 `--panel`。

```css
.card {
  background: var(--panel);
  border: 1px solid var(--border);
}
```

卡片 hover 可以使用 `--panel-2`。

```css
.card:hover {
  background: var(--panel-2);
}
```

---

### 5.3 文字层级

```css
.title {
  color: var(--text-strong);
}

.body {
  color: var(--text);
}

.desc {
  color: var(--muted);
}

.meta {
  color: var(--muted-2);
}
```

不要大面积使用纯白。纯白只用于极少数强强调位置。

---

## 6. 三类作品的颜色绑定

Luke Lab 有三个核心入口，建议固定颜色绑定，形成长期识别。

| 模块 | 颜色 | 说明 |
|---|---|---|
| 技术博客 / Writing | Yellow | 代表沉淀、笔记、知识输出 |
| 前端教学 / Frontend Guide | Cyan | 代表前端、界面、学习路径 |
| Demo 项目 / Product Demo | Green 或 Purple | 代表运行、实验、可交付产品 |

推荐：

```txt
TECH WRITING      -> Yellow
FRONTEND GUIDE    -> Cyan
PRODUCT DEMO      -> Green
AI / EXPERIMENT   -> Purple
WARNING / BUG     -> Red
```

---

## 7. 核心组件风格

### 7.1 卡片

卡片是 Luke Lab 的核心组件。采用硬边框、无圆角、彩色错位阴影。

```css
.work-card {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  position: relative;
}

.work-card.yellow {
  box-shadow: var(--shadow-size) var(--shadow-size) 0 var(--yellow);
}

.work-card.cyan {
  box-shadow: var(--shadow-size) var(--shadow-size) 0 var(--cyan);
}

.work-card.green {
  box-shadow: var(--shadow-size) var(--shadow-size) 0 var(--green);
}

.work-card.purple {
  box-shadow: var(--shadow-size) var(--shadow-size) 0 var(--purple);
}
```

设计要点：

- 不使用大圆角。
- 不使用玻璃拟态。
- 不使用柔和大阴影。
- 阴影是“色块错位”，不是模糊阴影。

---

### 7.2 标签 Badge

标签用于区分模块和强化复古感。

```css
.badge {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 8px;
  border: 1px solid currentColor;
  background: var(--panel);
  color: var(--yellow);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.badge.cyan {
  color: var(--cyan);
}

.badge.green {
  color: var(--green);
}

.badge.purple {
  color: var(--purple);
}
```

---

### 7.3 按钮

主按钮使用黄色，保持硬朗和复古。

```css
.button-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 16px;
  border: 1px solid var(--text-strong);
  border-radius: 0;
  background: var(--yellow);
  color: #111111;
  font-weight: 800;
  box-shadow: 4px 4px 0 var(--text-strong);
}

.button-primary:hover {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 var(--text-strong);
}
```

次级按钮使用黑底描边。

```css
.button-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 16px;
  border: 1px solid var(--border);
  border-radius: 0;
  background: var(--panel);
  color: var(--text);
}

.button-secondary:hover {
  border-color: var(--cyan);
  color: var(--cyan);
}
```

---

### 7.4 代码窗口 / Demo 截图容器

参考图中的 Dashboard 区块，可以抽象为代码窗口组件。

```css
.code-window {
  background: var(--panel);
  border: 1px solid var(--border);
  box-shadow:
    6px 6px 0 var(--cyan),
    12px 12px 0 var(--yellow),
    18px 18px 0 var(--red);
}

.code-window-header {
  height: 32px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
}

.window-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--red);
}

.window-dot.yellow {
  background: var(--yellow);
}

.window-dot.green {
  background: var(--green);
}
```

这个组件适合展示：

- Demo 项目截图
- 代码片段
- 架构图
- 终端命令
- 项目运行状态

---

## 8. 首页配色分布

建议按比例使用颜色：

```txt
黑灰背景：75%
米白文字：15%
彩色强调：10%
```

彩色不要大面积铺满，而是用于：

- 小标签
- 按钮
- 链接 hover
- 卡片阴影
- 模块标题中的关键词
- 状态点
- 图标

错误示例：

```txt
每个区块都用大面积彩色背景
每张卡片都同时出现 4 种强调色
标题、按钮、边框、图标全部不同颜色
```

正确示例：

```txt
一个模块只选一个强调色
大面积保持黑灰
用米白保证阅读
用彩色制造记忆点
```

---

## 9. 字体建议

整体建议使用两套字体：

```txt
标题：紧凑、粗重、有工程感
正文：清晰、易读
代码：等宽字体
```

CSS 示例：

```css
:root {
  --font-sans: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: "JetBrains Mono", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
}

body {
  font-family: var(--font-sans);
}

code,
pre,
.terminal {
  font-family: var(--font-mono);
}
```

标题可以使用更紧凑的 uppercase 风格：

```css
.hero-title {
  font-size: clamp(48px, 8vw, 96px);
  line-height: 0.95;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  font-weight: 900;
}
```

---

## 10. 布局原则

### 10.1 最大宽度

```css
.container {
  width: min(100% - 32px, 1120px);
  margin-inline: auto;
}
```

### 10.2 区块间距

```css
.section {
  padding: 96px 0;
}

@media (max-width: 768px) {
  .section {
    padding: 64px 0;
  }
}
```

### 10.3 网格

作品卡片使用三列，移动端一列。

```css
.works-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

@media (max-width: 900px) {
  .works-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## 11. 页面模块建议

Luke Lab 首页建议包含：

```txt
1. Header
2. Hero
3. Featured Works
4. Frontend Guide Roadmap
5. Product Demo Showcase
6. Latest Writing
7. About Luke
8. Footer
```

不建议包含：

```txt
Pricing
客户评价
商业 SaaS 指标
过重的营销转化模块
```

因为 Luke Lab 是个人技术实验室，不是商业产品官网。

---

## 12. Hero 示例文案

```txt
BUILD. WRITE. TEACH. SHIP.

Luke's personal lab for engineering notes, frontend learning, and runnable product demos.

这里是 Luke 的个人技术实验室，收集我的技术写作、前端教学和 Demo 项目。它们来自不同方向，但共同指向一件事：把复杂问题讲清楚，把想法做成可以体验的产品。
```

按钮：

```txt
Explore Works
View Demo
```

---

## 13. 三张作品卡片文案

### TECH WRITING

```txt
技术博客
记录后端工程、AI Agent、低代码平台、数据模型、部署与工程化实践。
```

颜色：`--yellow`

### FRONTEND GUIDE

```txt
前端教学
写给后端同学、设计同学和零基础学习者的前端速通手册，从 HTML、CSS 到 React 与组件思维。
```

颜色：`--cyan`

### PRODUCT DEMO

```txt
Demo 项目
展示独立完成的实验性项目和产品 Demo，用真实可运行的系统验证想法。
```

颜色：`--green` 或 `--purple`

---

## 14. 设计禁忌

Luke Lab 不建议使用：

```txt
大圆角卡片
玻璃拟态
大面积渐变背景
柔和商业 SaaS 风
浅色背景
过多动效
过多 emoji
太多不同字体
```

更推荐：

```txt
硬边框
黑灰背景
彩色错位阴影
小面积高饱和强调色
代码窗口
终端感
像素标签
清晰网格
```

---

## 15. 最终设计原则

Luke Lab 的视觉系统可以概括为一句话：

> 用黑灰背景承载工程感，用米白文字保证阅读，用高饱和彩色建立记忆点。

更具体地说：

```txt
黑色负责氛围
米白负责阅读
黄色负责主 CTA
青色负责前端与链接
绿色负责运行和 Demo
紫色负责实验与 AI
红色负责警示和 Bug
```

这个配色体系能够把博客、前端教学和 Demo 项目这些不完全相关的内容统一到一个“个人技术实验室”的视觉框架里。
