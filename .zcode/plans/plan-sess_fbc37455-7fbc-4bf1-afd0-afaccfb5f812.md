# 首页新增「设计系统 / DESIGN DNA」Section

## 目标

在首页 `#courses` 之后，新增一个收尾 section `#design-system`，把站点自己的设计 DNA（**cyberpunk + zine + retroui** 三层语法、配色 token、字体、motif 库）作为「自我指涉的样本档案 / FIELD KIT」呈现。承担首页**视觉签名 / 自我盖章**的收尾作用，像独立刊物的封底 spec sheet。

完全复用现有 dossier 浅色皮肤 + 现成 class，不新增任何全局样式体系。

---

## 改动范围

只动 **1 个文件**：`src/pages/index.astro`

- 在 `#courses` section 之后追加新 `<section id="design-system">`
- 在同文件已有的 `<style is:global>` 末尾、`.home-page` scope 内追加该 section 专属样式
- 在 `<script>` 的 IntersectionObserver 自动纳入（新 section 自带 `data-reveal-section`，无需改 JS）

**不改**：`global.css`、`tokens.css`、`brand.css`、任何组件文件、子模块。

---

## Section 结构（从上到下）

复用 `shell-wide dossier-section home-section` + `dossier-wrap` + `dossier-section-head` 外壳，让节奏与 02/03/04/05 一致。内部用一个 `dossier-panel` 主样本卡承载拼贴。

### 1. section header
```
DESIGN DNA / FIELD KIT          // §6 · 自我盖章
设计 DNA                         // h2
三层语法、六个 token、一套 motif——这页本身就是它的样本。
```

### 2. 主样本卡 `dossier-panel`（编号 LXM-DS）

内部用 grid 分 4 个拼贴小区块，全部带 zine 边注 / 编号 / 印章：

#### A · 三层语法条带
横向 3 格「模块装载状态」卡，复用 `dossier-proto` 结构：
- `MOD-01 · CYBERPUNK` — 扫描 · 荧光 · 系统警示 · `● LOADED`
- `MOD-02 · ZINE` — 撞版 · 编号 · 边注 · 拼贴 · `● LOADED`
- `MOD-03 · RETROUI` — 硬边 panel · 硬阴影 · 窗口栏 · `● LOADED`

#### B · 配色 swatch 网格
6 个色块，每块带 token 名 / hex / 语义小字（来自 `tokens.css` 实际值）：
- `INK #171717` — 页面主底
- `PAPER #f6ead6` — 正文纸面
- `ACID #ffd43b` — CTA / 编号
- `LIME #00d26a` — 在线 / 数据
- `CYAN #00d4ff` — 链接 / 悬停
- `REDACT #ff4d4d` — 印章 / 警示

#### C · 字体 specimen
左侧大号 specimen「Aa 人类大模型」（`--font-display` / Space Grotesk），右侧 mono 小字「SYS://specimen」，底部一行 `--font-mono` 示例（`luke@human-llm:~$`）。一黄底 marker slogan：「外层像系统，内层像杂志，交互像旧机器」。

#### D · motif 装备清单
4 个小 chip，每个 inline 演示一种 motif（不靠描述，靠实物）：
- `硬阴影` — chip 自身就带 `4px 4px 0 var(--acid)` 硬阴影
- `角标对位` — chip 四角带 `.dossier-corner` L 形
- `状态灯` — chip 带 `● ONLINE` 闪烁点
- `印章` — chip 右上角贴 `.dossier-stamp` 小章

### 3. 收尾印章行
一行 zine 脚注 + 大编号 `// 03` + `ISSUE 03 · CLASSIFIED · LUKE`，呼应 dossier 世界观，作为整页签名收束。

---

## 复用的现成 class / token（不新增全局样式）

| 用途 | 复用 |
|---|---|
| section 外壳 | `.shell-wide` `.dossier-section` `.home-section` `.dossier-wrap` `.dossier-section-head` |
| 样本卡容器 | `.dossier-panel` `.dossier-panel-head` `.tag` |
| 三层语法条带 | `.dossier-protos` `.dossier-proto` (`.pid`/`strong`/`.st`) |
| 配色 token | `--bg` `--text` `--accent`/`--yellow` `--green` `--cyan` `--red` |
| 字体 token | `--font-display` `--font-mono` |
| motif 实物 | `.dossier-corner.tl/.tr/.bl/.br` `.dossier-stamp.s1` `.dossier-dot`(状态灯) |
| 动效 | `data-reveal-section` + 现有 stagger 机制 |
| 减动效 | 现有 `prefers-reduced-motion` 块统一覆盖 |

**新增的样式全部 scope 在 `.home-page #design-system ...` 下**（沿用 `index.astro` 内 `<style is:global>` 的现有约定），主要解决：swatch 网格布局、字体 specimen 布局、motif chip 的 inline 演示样式、收尾印章行排版、移动端响应式。不与既有 class 冲突。

---

## class 命名（遵循 AGENTS.md 语义约定）

- 容器：`design-kit`、`design-kit-grid`
- 子区：`design-grammar`、`design-swatches`、`design-specimen`、`design-motifs`、`design-signature`
- swatch：`design-swatch`（内含 `.design-swatch-chip`、`.design-swatch-name`、`.design-swatch-hex`、`.design-swatch-role`）
- chip：`design-motif-chip` + 修饰符 `.with-shadow` `.with-corners` `.with-blink` `.with-stamp`

**不出现** `xxx-copy` / `xxx-2` 等违规命名。

---

## 验证

1. `npm run dev` → 打开 `http://127.0.0.1:4321/`，滚动到课程之后查看新 section
2. 浏览器开「reduce motion」模拟，确认无动画也能完整展示
3. 移动端（≤640px）确认 swatch 网格降级为 2 列、specimen 堆叠
4. `npm run build` 验证产物

---

## 不做（避免范围蔓延）

- 不动其他 5 个 section 的样式
- 不把 `design-dossier.md` 内容长篇搬进页面（只取最核心的 token / 三层语法 / motif 作为视觉样本）
- 不新增图片资产（印章直接用 `.dossier-stamp` CSS 版，不用 `public/images/brand/stamps/*.svg`，保持零新增依赖）
- 不引入 `luke-design-system` 子模块内容到构建（它只是给 AI 看的参考文档，不参与路由）