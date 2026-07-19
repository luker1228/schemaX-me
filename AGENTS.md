---
---
# AGENTS.md — Luke's Blog

## 这是什么

基于 Astro 5 + GitHub Pages 的个人博客。最小化依赖：仅 Astro + TypeScript。内容为中文。

## 命令

```sh
npm install     # 安装依赖（仅 astro + typescript）
npm run dev     # 本地开发，localhost:4321
npm run build   # 静态构建，输出到 dist/（会先跑 tokens:check，再 astro build）
npm run preview # 本地预览构建产物
npm run tokens            # 从 DESIGN.json 重新生成 src/styles/tokens.css
npm run tokens:check      # 扫描 src/ 里未经设计的颜色字面量；失败 exit 1
npm run tokens:check -- --fix  # 把当前所有违规写进 baseline（仅清理时用）
```

无 lint、typecheck 或 test 脚本。`npm run build` 内置 `tokens:check` 作为前置门禁，颜色字面量违规会直接中断构建。

## 架构

```
src/content/
  posts/    — 已发布文章；当前包含 ai、cs、life、english，以及独立的 modelcraft 系列目录
  drafts/   — 空占位目录；写作草稿已迁到主仓库 `../sources/drafts/`
  config.ts — Zod schema 定义 frontmatter，posts 和 drafts 共用同一 schema
src/lib/content.ts — 辅助函数：getAllPosts, getPostsByCategory, getPostsBySeries
src/howto/
  components/frontend/legacy-content/ — 前端手册的静态 HTML 正文产物
  components/deploy/legacy-content/   — 部署手册的静态 HTML 正文产物
  components/deploy/deploy-legacy-page.jsx — 部署手册 HTML 正文容器
src/pages/
  index.astro          — 首页
  posts/[...slug].astro — 文章详情页（catch-all 路由）
  ai/, cs/, life/, english/ — 分类归档页
  modelcraft.astro      — ModelCraft 系列聚合页
  series/[slug].astro   — 系列页
```

关键细节：
- **Frontmatter 字段**: `title`, `description`, `pubDate`, `updatedDate`, `tags`, `draft`, `slug`, `series`, `cover`
- 实际分类不从 frontmatter 读；运行时按 `posts` 中文件路径首段推断。当前有效顶层目录为 `ai`、`cs`、`life`、`english`、`modelcraft`
- 所有内部链接必须使用 `import.meta.env.BASE_URL`，开发环境根路径为 `/`，生产环境保留 GitHub Pages 所需前缀
- `src/content/drafts/` 仍保留为 Astro collection 和目录占位，但当前应视为不承载写作内容
- 当前的草稿工作区在主仓库 `../sources/drafts/`；这里的 `drafts/` 只用于避免旧路径断裂
- `howto` 下的长正文手册页，优先使用 `legacy-content/*.html + *LegacyPage` 渲染静态 HTML 产物；尤其是从外部仓库迁入原文时，默认先整理成 HTML 产物，不要继续手写大段 JSX 正文
- 即使是部署手册的 HTML 正文产物，样式也优先复用 `src/howto/components/frontend` 现有这套页面结构和 CSS 约定；不要为正文内容再单独发明一套平行的长期样式体系，除非明确需要独立视觉语言
- 新增任何 howto 手册（包括博客写作、前端、部署等）必须复用 `/howto/frontend/` 已验证的统一 UI 骨架与 CSS class（如 `frontend-manual-page`、`hero`、`lesson-card-grid`、`faq-grid`）；仅替换标题、课程内容和导航数据，不得另起一套总览页面样式。

## CI/CD

推送 `main` → GitHub Actions → `npm ci && npm run build` → 部署到 GitHub Pages。单一 workflow，位于 `.github/workflows/deploy.yml`。无预览或暂存环境。

## 站点信息

- 博客名称：**Luke's AI Hub**
- GitHub：https://github.com/luker1228
- GitHub Pages：https://luker1228.github.io/aritcles-hub
- 掘金：https://juejin.cn/user/2929553730971224/posts
- 博客园：https://www.cnblogs.com/patientcat
- 微信公众号：Luke's AI Hub

## 写作流程

1. 在主仓库 `../sources/drafts/...` 中编写草稿、提纲、配图、脚本和实验稿。
2. 发布时，把最终正文整理为 `src/content/posts/.../*.md`。
3. 已发布文章若有改动，默认直接更新 `src/content/posts/` 对应文件；不要只改主仓库草稿而漏掉正式稿。
4. 补充/检查 frontmatter，至少确认 `title`、`description`、`pubDate`，系列文章补 `series`，更新稿补 `updatedDate`。
5. 运行 `npm run build` 验证。
6. 提交并推送 main → 自动部署。

## 仓库约定

- frontmatter 中 `draft: true` 被 schema 接收但**实际不使用**——真正的草稿机制是 content collection 分离
- `posts/` 才是线上内容源；任何“重新发布”“正式更新”“同步草稿到线上”都应以修改 `src/content/posts/` 为准
- 主仓库的 `sources/drafts/` 才是草稿、笔记、素材说明的工作区，不应直接发布
- `modelcraft` 是独立内容分组，已参与正式路由与聚合，不属于 `cs/essays`
- 文章配图托管在腾讯 COS（`luke-1307356219.cos.ap-chongqing.myqcloud.com`），不入库
- Markdown 转微信排版：使用 `md-cli`（https://github.com/doocs/md）
- 部署手册正文页若内容以“文章/讲义”为主，默认走 `src/howto/components/deploy/legacy-content/*.html` + `DeployLegacyPage`；只有确实需要复杂交互时才改用 JSX 页面组件
- 部署手册沿用 `frontend` 手册已经验证过的正文 CSS 体系时，优先复用现有 class 语义、布局骨架和样式规则；不要因为内容迁移就把同类正文拆成两套长期维护的视觉系统
- **class 命名必须有明确语义**，禁止无意义或弱语义后缀：
  - 禁止 `xxx-copy` 这类（`copy` 是营销文案行话，不直观）——容器用 `xxx-text`、`xxx-body`、`xxx-content`，标题用 `xxx-name`/`xxx-title`，副文案用 `xxx-tagline`/`xxx-subtitle`
  - 禁止 `xxx2` / `xxx-2` 这类数字编号后缀——出现第二份时用语义区分（`xxx-primary`/`xxx-secondary`、`xxx-nav`/`xxx-actions`、`xxx-large`/`xxx-compact`），不用数字
  - 命名应描述「它是什么 / 它的职责」，不描述「它长什么样」（避免 `red-box`、`big`）或「它是第几个」
  - 既有违规命名应顺手在改动相关代码时一并修正（如本次 `brand-copy`→`brand-text` 全站重命名），不要留待积累

## 文案铁律

不可妥协的内容约束。新增页面、写文案、改组件时都必须遵守；发现违规应顺手修正。

- **如无必要，不加 slop 档号**：禁止给页面/卡片/列表硬套「机密档案」皮肤，编造不承载信息的伪编号或伪系统状态。典型 slop：
  - 伪档号：`REC #LXM-0001`、`REC #LXM-DS`——给页面本身编一个假档号，没有可索引对象
  - 伪系统状态行（sysbar）：`SYS: SCHEMAX-HLM1`、`BUS: NEURAL-64`、`MODE: MIL-DEPLOY`、`REV: 2.6 · LVL: 9 · CLR: SIGNAL`——装成机甲驾驶舱/系统终端，但每条都不对应任何真实状态
  - 伪模块编号：给技术栈每行加 `MOD-01` `MOD-02`——Python 叫 MOD-01 没有任何意义
  - 伪状态前缀：给每个工具/卡片贴 `已激活`——装腔，不传递信息
- **section 副标题默认不加**：`.dossier-section-head` 默认只放 `<h2>`，不要画蛇添足补一句 `<p>` 副标（"几个维度,大致勾勒一下"这类纯属凑字）。**只有副标承载 h2 无法承担的真实信息时才加**（排序规则、范围说明、关键限定），且要短、说人话、不自我辩护。
- **禁止 AI slop 文案特征**：
  - 自我辩护/免责声明（"数值用于表达个人品质倾向"、"数据来自写作、协作与项目记录"）——数据就是数据,不需要找补
  - 中点分隔的装腔句式（"A · B · C"堆叠）
  - 重复信息（ID 卡写"人类大模型/硅基同类",首屏 Hello 段已经说过）
- **编号判定原则**：编号要么对应**真实可索引的对象**（课程 `CRS-01`、文章 `REC-0042`、设计语法章节 `MOD-01~03`），要么就是 slop。设计文档页（`design-dna.astro`）演示 dossier 设计语言时保留 motif 编号是合法的——那是页面本职，不是给自己加戏。
- **检查方法**：写完一个 section / 卡片，把每个 `tag`、`code`、`prefix`、`sysbar`、副标 `<p>` 单独拎出来问一遍「这串字符对应什么真实对象？删了读者会损失什么？」——答不上来就是 slop，删。

## 视觉铁律

不可妥协的设计约束。新增页面、改组件、写 demo 时都必须遵守；发现违规应顺手修正。

- **`.dossier-corner`（角标对位 / REGISTRATION）仅首页 §2 主体识别卡（`.dossier-id`）可用**，其它任何位置禁止现场渲染
  - 唯一合法使用点：`src/pages/index.astro` 的 `.dossier-id` panel（4 个 `<span class="dossier-corner tl/tr/bl/br">`）
  - 例外：专门讲解该 motif 的文档页可保留演示——`src/pages/ai-metadata/index.astro` 的 corner-brackets reference、`src/pages/design-dna.astro` §4 motif 装备里的 `with-corners` chip。这类页面必须在文案里明确标注「受限 motif / ID 卡专属」
  - `.dossier-photo .reg`（照片四角的小对位标）**不受此铁律约束**——它是照片扫描框的一部分，随 `.dossier-photo` 出现
  - 检查方法：`grep -rn "dossier-corner" src/` 应只命中 global.css 定义 + index.astro 的 ID 卡 + 上述文档页演示

### 颜色必须走 token 系统（禁止裸 hex / rgb / hsl）

**唯一入口**：`DESIGN.json` → `npm run tokens` → `src/styles/tokens.css`（auto-generated，不要手改）。任何颜色字面量（`#xxxxxx`、`rgb()`、`rgba()`、`hsl()`、`hsla()`）直接出现在 `src/**/*.{astro,jsx,tsx,ts,css,html,vue,svelte}` 都视为绕过设计系统。

**正确流程**：
1. 在 `DESIGN.json` 的 `tokens.colors` 里加一个语义命名的 token（如 `field-green`），同时在 `extensions.colorMeta` 里补 displayName / role / tonalRamp
2. 在 `scripts/generate-tokens.mjs` 的 `COLOR_VARS` 映射表里登记 token → CSS 变量名（这张表就是事实白名单）
3. 跑 `npm run tokens` 重新生成 `tokens.css`
4. 在组件里用 `var(--xxx)` 引用,不要写字面量

**约束机制**：`npm run build` 内置 `tokens:check` 作为前置门禁。脚本扫描 `src/`，发现未登记的颜色字面量就 exit 1、中断构建。白名单有两个来源:
- `DESIGN.json tokens.colors`（设计过的 token）
- `scripts/baseline.json`（历史遗留，按 (file, normalized-value) 粒度容忍）

**例外（允许字面量）**:
- `src/styles/tokens.css` 本身（生成产物）
- `src/styles/global.css` 的 `:root`、`body:has(.dossier)`、`body:has(.blog-page)` 等皮肤定义块——它们在「定义 `--var: #hex`」，是 token 的扩展定义点，不是使用点

**清理 baseline**：`baseline.json` 是技术债清单，不是永久许可。改动相关文件时顺手把对应颜色换成 `var()`，然后从 baseline 里删条目，目标清零。不要用 `npm run tokens:check -- --fix` 掩盖新违规——那个命令只用来初次建立基线或大清理后重置。

**命名约定**：浅色纸面（field-manual）下使用的深色变体用 `--<color>-ink`（如 `--green-ink` / `--yellow-ink`），区别于暗色主题的饱和原色（`--green`）。`*-ink` token 来自 `field-*` DESIGN.json 条目。

## 元信息目录 `ai-metadata/`

积累项目过程中的元信息：bug 根因分析、设计决策、踩坑记录等，作为长期可检索的经验沉淀。

- **不参与构建**：`ai-metadata/` 不被 Astro 当作内容 collection，不会进路由，也不入产物
- **当前结构**：`ai-metadata/howto/*.md` 收录 howto 手册开发中遇到的 bug 复盘（现象 / 根因 / 诊断 / 修复 / 预防 / 参考文件）
- **写作约定**：新增记录放对应子目录，文件名用 `bug-<主题>.md` 或 `decision-<主题>.md` 等稳定前缀；定位问题后**及时落档**，避免只在对话里解决而流失
- **与代码的关系**：这些文档是给人（和 agent）读的过程笔记，描述「为什么这样写」，不作为运行时依赖；代码本身的可读性仍应以注释和命名承担，不要把解释只留在这里

